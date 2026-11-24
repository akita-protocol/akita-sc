/**
 * InferencePlugin on LocalNet: a wallet's `inference` escrow opens and funds a channel on
 * InferenceNetwork as the payer, a delegated key does so only inside its policy, and the refund on
 * close comes back to the escrow.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk, { ABIType } from 'algosdk'
import { generateKeyPairSync, sign } from 'node:crypto'
import { beforeAll, describe, expect, test } from 'vitest'
import { CallerType, newWallet, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { MetaFactory, MetaSDK, SchemaPart } from '../../../../../akita-sdk/src/meta'
import { MetaPluginSDK, newMetaPlugin } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import {
  decodeInferencePolicy, encodeInferencePolicy, inferenceReceiptMessage, InferencePluginSDK,
} from '../../../../../akita-sdk/src/wallet/plugins/inference'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { InferencePluginFactory } from '../../../artifacts/arc58/plugins/inference/InferencePluginClient'
import { InferenceNetworkClient, InferenceNetworkFactory } from '../../../artifacts/inference/InferenceNetworkClient'
import { errPolicyMissing } from '../../../utils/errors'
import {
  errInferenceNotOwnChannel, errInferencePolicyCap, errInferencePolicyDenied, errInferencePolicyFields,
} from './errors'

const ESCROW = 'inference'
const CHANNEL_MBR = 2_500n + 400n * (9n + 32n + 32n + 8n * 6n)
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)

function sessionKey() {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519')
  return { publicKey: new Uint8Array(Buffer.from(publicKey.export({ format: 'jwk' }).x!, 'base64url')), privateKey }
}

describe('InferencePlugin (LocalNet)', () => {
  const fixture = algorandFixture()
  let owner: string
  let factory: WalletFactorySDK
  let writer: MetaPluginSDK
  let plugin: InferencePluginSDK
  let network: InferenceNetworkClient
  let wallet: WalletSDK
  let escrow: string
  let akita: bigint
  let other: bigint
  let agent: { addr: algosdk.Address; signer: algosdk.TransactionSigner }
  let claimer: { addr: algosdk.Address; signer: algosdk.TransactionSigner }
  const previousMbrApp = process.env.WALLET_MBR_APP_ID

  const balance = async (address: string) => (await fixture.algorand.account.getInformation(address)).balance.microAlgos
  const asAgent = (call: ReturnType<InferencePluginSDK['open']>) => wallet.usePlugin({
    sender: agent.addr.toString(), signer: agent.signer, escrow: ESCROW, calls: [call],
  })
  const configure = (body: Uint8Array, expectedRevision = 0n) => wallet.usePlugin({
    callerType: CallerType.Admin,
    calls: [writer.configurePolicy({ plugin: plugin.appId, caller: agent.addr.toString(), escrow: ESCROW, body, expectedRevision })],
  })
  const lastChannel = async () => (await network.state.global.channelCount())!

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(1_000_000_000))

    const { appClient: mbr } = await algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: owner, defaultSigner: signer }).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const dao = await deployAkitaDAO({ fixture, sender: owner, signer, apps: {} })
    const escrowFactory = await deployEscrowFactory({ fixture, sender: owner, signer })
    factory = await deployAbstractedAccountFactory({ fixture, sender: owner, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })
    const { appClient: metaClient } = await algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: owner, defaultSigner: signer }).deploy({
      onUpdate: 'append', onSchemaBreak: 'append', createParams: { method: 'create', args: ['inference-plugin-test', dao.appId] },
    })
    await metaClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    const meta = new MetaSDK({ algorand, readerAccount: owner, factoryParams: { appId: metaClient.appId, defaultSender: owner, defaultSigner: signer } })
    await meta.addType({ description: 'Inference plugin tests', schemaList: [SchemaPart.Uint64] })
    writer = await newMetaPlugin({ algorand, sender: owner, signer, registry: meta.appId })
    await meta.client.send.setPolicyWriter({ args: { writer: writer.appId } })

    const { appClient: pluginClient } = await algorand.client.getTypedAppFactory(InferencePluginFactory, { defaultSender: owner, defaultSigner: signer })
      .send.create.create({ args: { registry: meta.appId } })
    plugin = new InferencePluginSDK({ algorand, factoryParams: { appId: pluginClient.appId, defaultSender: owner, defaultSigner: signer } })

    // The network, with Akita as provider 1 and a second provider the policy leaves out.
    const { appClient } = await algorand.client.getTypedAppFactory(InferenceNetworkFactory, { defaultSender: owner, defaultSigner: signer })
      .send.create.create({ args: { version: 'test', akitaDao: 0n, admin: owner, treasury: owner } })
    network = appClient
    await network.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    await network.send.setSettings({ args: { settings: { feeBps: 1_000n, bondAsset: 0n, minBond: 0n, unbondDelay: 30n * 86_400n, closeWindow: 3_600n, openRegistration: true } } })
    const pay = (amount: bigint) => algorand.createTransaction.payment({ sender: owner, receiver: network.appAddress, amount: microAlgo(amount) })
    await network.send.setPaymentAsset({ args: { payment: pay(ASSET_MBR), asset: 0n, allowed: true } })
    claimer = algorand.account.random()
    await algorand.account.ensureFunded(claimer.addr, owner, microAlgo(5_000_000))
    const register = async (uri: string) => (await network.send.registerProvider({
      args: {
        payment: pay(PROVIDER_MBR + 2_500n + 400n * (9n + BigInt(uri.length))), bond: pay(0n),
        claimer: claimer.addr.toString(), payout: claimer.addr.toString(), metadata: uri,
      },
    })).return!
    akita = await register('ipfs://akita')
    other = await register('ipfs://other')

    agent = algorand.account.random()
    await algorand.account.ensureFunded(agent.addr, owner, microAlgo(5_000_000))
    wallet = await newWallet({ algorand, readerAccount: owner, factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: signer }, nickname: 'Inference' })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(20_000_000) })
    await wallet.addPlugin({ client: writer, callerType: CallerType.Admin })
    await wallet.addPlugin({
      client: plugin, callerType: CallerType.Other, caller: agent.addr.toString(), escrow: ESCROW,
      allowances: [{ asset: 0n, type: 'flat', amount: 10_000_000n }],
    })
    const { id } = await wallet.getEscrow(ESCROW)
    escrow = algosdk.getApplicationAddress(id).toString()
    await algorand.send.payment({ sender: owner, signer, receiver: escrow, amount: microAlgo(5_000_000) })
    return () => {
      if (previousMbrApp === undefined) delete process.env.WALLET_MBR_APP_ID
      else process.env.WALLET_MBR_APP_ID = previousMbrApp
    }
  })

  test('a delegated grant without a policy opens nothing', async () => {
    await expect(asAgent(plugin.open({
      sender: agent.addr.toString(), signer: agent.signer, network: network.appId, provider: akita, asset: 0n, amount: 100_000n, sessionKey: sessionKey().publicKey,
    }))).rejects.toThrow(errPolicyMissing)
  })

  test('the writer refuses a malformed policy', async () => {
    const raw = ABIType.from('(uint64,uint64[],uint64[],uint64)')
    await expect(configure(raw.encode([network.appId, [], [0n], 1n]))).rejects.toThrow(errInferencePolicyFields)
    await expect(configure(raw.encode([network.appId, [2n, 1n], [0n], 1n]))).rejects.toThrow(errInferencePolicyFields)
    await expect(configure(raw.encode([network.appId, [1n], [0n], 0n]))).rejects.toThrow(errInferencePolicyFields)
    await expect(configure(raw.encode([0n, [1n], [0n], 1n]))).rejects.toThrow(errInferencePolicyFields)
  })

  test('the escrow opens, tops up and closes a channel within its policy, and the refund comes back', async () => {
    const body = encodeInferencePolicy({ network: network.appId, providers: [akita], assets: [0n], maxDeposit: 1_000_000n })
    await configure(body)
    expect(decodeInferencePolicy(body)).toEqual({ network: network.appId, providers: [akita], assets: [0n], maxDeposit: 1_000_000n })
    const key = sessionKey()
    const open = (provider: bigint, amount: bigint) => asAgent(plugin.open({
      sender: agent.addr.toString(), signer: agent.signer, network: network.appId, provider, asset: 0n, amount, sessionKey: key.publicKey,
    }))

    await expect(open(other, 100_000n)).rejects.toThrow(errInferencePolicyDenied)
    await expect(open(akita, 1_000_001n)).rejects.toThrow(errInferencePolicyCap)

    const before = await balance(escrow)
    await open(akita, 600_000n)
    const channel = await lastChannel()
    expect(await balance(escrow)).toBe(before - 600_000n - CHANNEL_MBR)
    const info = (await network.send.getChannel({ args: { channel } })).return!
    expect(info).toMatchObject({ payer: escrow, provider: akita, deposit: 600_000n })

    const topUp = (amount: bigint, id = channel) => asAgent(plugin.topUp({ sender: agent.addr.toString(), signer: agent.signer, network: network.appId, channel: id, amount }))
    await expect(topUp(400_001n)).rejects.toThrow(errInferencePolicyCap)
    await topUp(400_000n)
    expect((await network.send.getChannel({ args: { channel } })).return!.deposit).toBe(1_000_000n)

    // The provider claims a receipt the session key signed.
    const signature = new Uint8Array(sign(null, inferenceReceiptMessage(network.appId, channel, 250_000n), key.privateKey))
    await network.send.claim({ sender: claimer.addr, signer: claimer.signer, args: { channel, total: 250_000n, signature }, extraFee: microAlgo(6_000) })

    // A channel some other account opened cannot be funded from this escrow.
    const outsider = await network.send.open({
      args: {
        payment: fixture.algorand.createTransaction.payment({ sender: owner, receiver: network.appAddress, amount: microAlgo(CHANNEL_MBR) }),
        deposit: fixture.algorand.createTransaction.payment({ sender: owner, receiver: network.appAddress, amount: microAlgo(1_000n) }),
        provider: akita, asset: 0n, sessionKey: key.publicKey,
      },
    })
    await expect(topUp(1_000n, outsider.return!)).rejects.toThrow(errInferenceNotOwnChannel)

    await asAgent(plugin.requestClose({ sender: agent.addr.toString(), signer: agent.signer, network: network.appId, channel }))
    const beforeClose = await balance(escrow)
    await network.send.settleAndClose({ sender: claimer.addr, signer: claimer.signer, args: { channel, total: 250_000n, signature: new Uint8Array(64) }, extraFee: microAlgo(2_000) })
    expect(await balance(escrow)).toBe(beforeClose + 750_000n + CHANNEL_MBR)
  })

  test('an admin execution is not limited by the policy', async () => {
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000) })
    await wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [plugin.open({ network: network.appId, provider: other, asset: 0n, amount: 2_000_000n, sessionKey: sessionKey().publicKey })],
    })
    expect((await network.send.getChannel({ args: { channel: await lastChannel() } })).return).toMatchObject({ provider: other, deposit: 2_000_000n })
  })
})
