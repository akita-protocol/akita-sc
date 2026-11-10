import { createHash, webcrypto } from 'node:crypto'

import { Config, algo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { sendPrepared } from 'akita-sdk'
import { CallerType, PayPluginSDK, WalletFactorySDK, WalletSDK, newWallet } from 'akita-sdk/wallet'
import algosdk, { TransactionSigner } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../tests/fixtures/escrow'
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay'

const TEST_TIMEOUT = 480_000
const BACKEND_AMOUNT = 1_234_567n
const EXPECTED_QUOTE_ROUND_DISTANCE = 100n
const SDK_EXCLUSIVE_WINDOW_SIZE = EXPECTED_QUOTE_ROUND_DISTANCE + 1n

type BrokerProgram = {
  programBase64: string
  authorizer: string
}

type BrokerSetup = {
  challenge: string
  origin: string
  rpId: string
}

type BackendQuote = {
  quoteId: string
  executionKind: 'arc58-pay-plugin-v1'
  payerAddress: string
  receiverAddress: string
  amountMicroAlgos: string
  genesisId: string
  genesisHashBase64: string
  arc58: {
    walletAppId: string
    walletAppAddress: string
    authorizerAddress: string
    payPluginAppId: string
    lease: string
    leaseBase64: string
    firstValidRound: string
    lastValidRound: string
    expectedFeesMicroAlgos: [string, string, string]
    expectedGroupSize: number
  }
}

type BrokerQuote = {
  jobId: string
  quote: BackendQuote
}

type BrokerSubmission = {
  status: 'confirmed'
  confirmedRound: number
  replayed: boolean
  freshSession: boolean
}

function sha256(value: Uint8Array): Uint8Array {
  return createHash('sha256').update(value).digest()
}

function base64(value: Uint8Array): string {
  return Buffer.from(value).toString('base64')
}

function base64Url(value: Uint8Array): string {
  return Buffer.from(value).toString('base64url')
}

function concat(...values: Uint8Array[]): Uint8Array {
  return Uint8Array.from(values.flatMap((value) => Array.from(value)))
}

function authenticatorData(rpId: string): Uint8Array {
  const result = new Uint8Array(37)
  result.set(sha256(new TextEncoder().encode(rpId)), 0)
  result[32] = 0x01 | 0x04
  return result
}

function trimUnsignedInteger(value: Uint8Array): Uint8Array {
  let offset = 0
  while (offset < value.length - 1 && value[offset] === 0) offset += 1
  const trimmed = value.slice(offset)
  return trimmed[0] & 0x80 ? Uint8Array.from([0, ...trimmed]) : trimmed
}

function p1363ToDer(signature: Uint8Array): Uint8Array {
  if (signature.length !== 64) throw new Error(`Expected a 64-byte P-256 signature, received ${signature.length}`)
  const r = trimUnsignedInteger(signature.slice(0, 32))
  const s = trimUnsignedInteger(signature.slice(32))
  const body = Uint8Array.from([0x02, r.length, ...r, 0x02, s.length, ...s])
  return Uint8Array.from([0x30, body.length, ...body])
}

async function signWebAuthnData(privateKey: webcrypto.CryptoKey, authData: Uint8Array, clientDataJSON: Uint8Array): Promise<Uint8Array> {
  const signedData = concat(authData, sha256(clientDataJSON))
  const signature = new Uint8Array(await webcrypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    privateKey,
    signedData,
  ))
  if (signature.length !== 64) throw new Error(`Node returned an unexpected P-256 signature shape: ${signature.length}`)
  return signature
}

async function brokerPost<T>(path: string, body: unknown): Promise<T> {
  const baseURL = process.env.AKITA_BACKEND_ARC58_GOLDEN_BROKER_URL
  if (!baseURL) throw new Error('AKITA_BACKEND_ARC58_GOLDEN_BROKER_URL is required')
  const response = await fetch(`${baseURL}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const payload = await response.json() as T | { error?: string }
  if (!response.ok) {
    const message = (payload as { error?: string }).error ?? JSON.stringify(payload)
    throw new Error(`Backend golden-path broker ${path} failed (${response.status}): ${message}`)
  }
  return payload as T
}

function passkeyTransactionSigner(
  privateKey: webcrypto.CryptoKey,
  program: Uint8Array,
  rpId: string,
  origin: string,
): TransactionSigner {
  return async (transactionGroup, indexesToSign) => {
    const group = transactionGroup[0]?.group
    if (!group || !transactionGroup.every((transaction) => transaction.group && Buffer.from(transaction.group).equals(Buffer.from(group)))) {
      throw new Error('Passkey signer requires one complete grouped transaction set')
    }
    const challenge = base64Url(group)
    const clientDataPrefix = new TextEncoder().encode('{"type":"webauthn.get","challenge":"')
    const challengeBytes = new TextEncoder().encode(challenge)
    const clientDataSuffix = new TextEncoder().encode(`","origin":"${origin}","crossOrigin":false}`)
    const clientDataJSON = concat(clientDataPrefix, challengeBytes, clientDataSuffix)
    const authData = authenticatorData(rpId)
    const signature = await signWebAuthnData(privateKey, authData, clientDataJSON)
    const r = signature.slice(0, 32)
    const s = signature.slice(32)
    const logicSig = new algosdk.LogicSigAccount(program, [
      authData,
      clientDataPrefix,
      challengeBytes,
      clientDataSuffix,
      r,
      s,
    ])
    return indexesToSign.map((index) => algosdk.signLogicSigTransactionObject(transactionGroup[index], logicSig).blob)
  }
}

const enabled = process.env.AKITA_BACKEND_ARC58_GOLDEN === '1'

describe.skipIf(!enabled)('backend-issued ARC-58 hosted-agent identity payment', () => {
  const localnet = algorandFixture()
  let walletFactory: WalletFactorySDK
  let payPlugin: PayPluginSDK
  let previousWalletMbrAppId: string | undefined

  beforeAll(async () => {
    Config.configure({ debug: true, populateAppCallResources: true })
    await localnet.newScope()
    const {
      algorand,
      context: { testAccount },
    } = localnet
    const sender = testAccount.addr.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr.toString(), algo(500))

    previousWalletMbrAppId = process.env.WALLET_MBR_APP_ID
    const walletMbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: sender,
      defaultSigner: signer,
    })
    const { appClient: walletMbrClient } = await walletMbrFactory.send.create.bare()
    process.env.WALLET_MBR_APP_ID = walletMbrClient.appId.toString()

    const escrowFactory = await deployEscrowFactory({ fixture: localnet, sender, signer })
    const dao = await deployAkitaDAO({ fixture: localnet, sender, signer, apps: { escrow: escrowFactory.appId } })
    walletFactory = await deployAbstractedAccountFactory({
      fixture: localnet,
      sender,
      signer,
      args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId },
    })
    payPlugin = await deployPayPlugin({ fixture: localnet, sender, signer })
  }, TEST_TIMEOUT)

  afterAll(() => {
    if (previousWalletMbrAppId === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousWalletMbrAppId
  })

  test('executes and submits the exact backend quote with a group-bound P-256 LogicSig', async () => {
    const { algorand } = localnet
    const keyPair = await webcrypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['sign', 'verify'],
    )
    const rawPublicKey = new Uint8Array(await webcrypto.subtle.exportKey('raw', keyPair.publicKey))
    expect(rawPublicKey).toHaveLength(65)
    expect(rawPublicKey[0]).toBe(0x04)
    const publicKeyX = Buffer.from(rawPublicKey.slice(1, 33)).toString('hex')
    const publicKeyY = Buffer.from(rawPublicKey.slice(33, 65)).toString('hex')
    const programResponse = await brokerPost<BrokerProgram>('/v1/passkey-program', { publicKeyX, publicKeyY })
    const program = Buffer.from(programResponse.programBase64, 'base64')
    expect(new algosdk.LogicSigAccount(program).address().toString()).toBe(programResponse.authorizer)

    const setupAdmin = algorand.account.random()
    const controlledAccount = algorand.account.random()
    const receiver = algorand.account.random()
    const dispenser = await algorand.account.dispenserFromEnvironment()
    for (const address of [setupAdmin.addr, controlledAccount.addr, receiver.addr, programResponse.authorizer]) {
      await algorand.account.ensureFunded(address, dispenser.addr.toString(), algo(10))
    }

    const wallet: WalletSDK = await newWallet({
      algorand,
      readerAccount: setupAdmin.addr.toString(),
      factoryParams: {
        appId: walletFactory.appId,
        defaultSender: setupAdmin.addr,
        defaultSigner: setupAdmin.signer,
      },
      controlledAddress: controlledAccount.addr.toString(),
      // SG-04: the SDK puts the controlled account's rekey to the factory into the creation group.
      controlledSigner: controlledAccount.signer,
      nickname: 'backend-arc58-hosted-agent-golden',
    })
    const grantParams = await algorand.getSuggestedParams()
    await wallet.addPlugin({
      client: payPlugin,
      callerType: CallerType.Admin,
      sender: setupAdmin.addr,
      signer: setupAdmin.signer,
      escrow: '',
      cooldown: 0n,
      methods: [{ name: payPlugin.pay(), cooldown: 0n }],
      useRounds: true,
      lastValid: BigInt(grantParams.firstValid) + 1_000n,
      useExecutionKey: false,
      coverFees: false,
    })
    await wallet.changeAdmin({
      sender: setupAdmin.addr,
      signer: setupAdmin.signer,
      newAdmin: programResponse.authorizer,
    })
    expect((await wallet.client.state.global.getAll()).admin).toBe(programResponse.authorizer)
    expect((await algorand.account.getInformation(controlledAccount.addr)).authAddr?.toString()).toBe(
      wallet.client.appAddress.toString(),
    )

    const setup = await brokerPost<BrokerSetup>('/v1/setup', {
      publicKeyX,
      publicKeyY,
      authorizer: programResponse.authorizer,
      controlledAddress: controlledAccount.addr.toString(),
      receiverAddress: receiver.addr.toString(),
      walletAppId: wallet.appId.toString(),
      walletFactoryAppId: walletFactory.appId.toString(),
      payPluginAppId: payPlugin.appId.toString(),
    })
    const identityClientData = new TextEncoder().encode(JSON.stringify({
      type: 'webauthn.get',
      challenge: setup.challenge,
      origin: setup.origin,
      crossOrigin: false,
    }))
    const identityAuthenticatorData = authenticatorData(setup.rpId)
    const identityRawSignature = await signWebAuthnData(keyPair.privateKey, identityAuthenticatorData, identityClientData)
    const quoteResponse = await brokerPost<BrokerQuote>('/v1/quote', {
      authenticatorData: base64(identityAuthenticatorData),
      clientDataJSON: base64(identityClientData),
      signature: base64(p1363ToDer(identityRawSignature)),
    })
    const quote = quoteResponse.quote
    expect(quote.executionKind).toBe('arc58-pay-plugin-v1')
    expect(quote.payerAddress).toBe(controlledAccount.addr.toString())
    expect(quote.receiverAddress).toBe(receiver.addr.toString())
    expect(quote.amountMicroAlgos).toBe(BACKEND_AMOUNT.toString())
    expect(quote.arc58.walletAppId).toBe(wallet.appId.toString())
    expect(quote.arc58.payPluginAppId).toBe(payPlugin.appId.toString())
    expect(quote.arc58.authorizerAddress).toBe(programResponse.authorizer)

    const firstValid = BigInt(quote.arc58.firstValidRound)
    const lastValid = BigInt(quote.arc58.lastValidRound)
    expect(lastValid - firstValid).toBe(EXPECTED_QUOTE_ROUND_DISTANCE)
    const build = await wallet.build.usePlugin({
      sender: programResponse.authorizer,
      signer: setupAdmin.signer,
      lease: quote.arc58.lease,
      firstValid,
      // @akta/sdk's endTarget is exclusive: 101 produces inclusive
      // transaction rounds firstValid..firstValid+100. Do not post-mutate.
      windowSize: SDK_EXCLUSIVE_WINDOW_SIZE,
      skipSignatures: true,
      callerType: CallerType.Admin,
      calls: [
        payPlugin.pay({
          sender: programResponse.authorizer,
          signer: setupAdmin.signer,
          payments: [{ receiver: receiver.addr, asset: 0n, amount: BACKEND_AMOUNT }],
        }),
      ],
    })
    expect(build.windows).toHaveLength(1)
    const window = build.windows[0]
    expect(window.transactions).toHaveLength(quote.arc58.expectedGroupSize)
    expect(window.transactions.every((transaction) => transaction.firstValid === firstValid)).toBe(true)
    expect(window.transactions.every((transaction) => transaction.lastValid === lastValid)).toBe(true)
    expect(window.transactions.map((transaction) => transaction.fee.toString())).toStrictEqual(
      quote.arc58.expectedFeesMicroAlgos,
    )
    expect(Buffer.from(window.transactions[0].lease ?? []).toString('base64')).toBe(quote.arc58.leaseBase64)
    expect(window.transactions.slice(1).every((transaction) => transaction.lease === undefined)).toBe(true)

    const signer = passkeyTransactionSigner(keyPair.privateKey, program, setup.rpId, setup.origin)
    const result = await sendPrepared(
      { ...window, signers: window.transactions.map(() => signer) },
      algorand.client.algod,
    )
    expect(result.txIds).toHaveLength(3)
    expect(result.confirmedRound).toBeGreaterThan(0n)

    const accepted = await brokerPost<BrokerSubmission>('/v1/submit', { transactionIds: result.txIds })
    expect(accepted.status).toBe('confirmed')
    expect(accepted.confirmedRound).toBe(Number(result.confirmedRound))
    expect(accepted.replayed).toBe(true)
    expect(accepted.freshSession).toBe(true)
  }, TEST_TIMEOUT)
})
