import { Config, algo, encodeLease } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { sendPrepared } from 'akita-sdk'
import { CallerType, PayPluginSDK, WalletFactorySDK, WalletSDK, newWallet } from 'akita-sdk/wallet'
import algosdk, { ABIMethod, ALGORAND_ZERO_ADDRESS_STRING, modelsv2, Transaction } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../tests/fixtures/escrow'
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay'

type PendingTransactionResponse = modelsv2.PendingTransactionResponse

const TEST_TIMEOUT = 300_000
const QUOTED_AMOUNT = 1_234_567n
const SERVER_SUPPLIED_LEASE = 'agent-id-pay-v1:quote-0001'

const REKEY_SIGNATURE = 'arc58_rekeyToPlugin(uint64,uint64,string,uint64[],(uint64,uint64)[])void'
const PAY_SIGNATURE = 'pay(uint64,bool,(address,uint64,uint64)[])void'
const VERIFY_SIGNATURE = 'arc58_verifyAuthAddress()void'

const REKEY_SELECTOR_HEX = '5adf338f'
const PAY_SELECTOR_HEX = 'f9738492'
const VERIFY_SELECTOR_HEX = '6cc3f606'

const rekeyMethod = ABIMethod.fromSignature(REKEY_SIGNATURE)
const payMethod = ABIMethod.fromSignature(PAY_SIGNATURE)
const verifyMethod = ABIMethod.fromSignature(VERIFY_SIGNATURE)

type IdentityPaymentQuote = {
  walletAppId: bigint
  payPluginAppId: bigint
  authorizer: string
  controlledAddress: string
  receiver: string
  amount: bigint
  lease: Uint8Array
  minFee: bigint
}

type DecodedInnerPayment = {
  sender: string
  receiver: string
  amount: bigint
  rekeyTo?: string
  closeRemainderTo?: string
}

function bytesEqual(left: Uint8Array | undefined, right: Uint8Array | undefined): boolean {
  if (left === undefined || right === undefined) return left === right
  return Buffer.from(left).equals(Buffer.from(right))
}

function selectorHex(method: ABIMethod): string {
  return Buffer.from(method.getSelector()).toString('hex')
}

function asAddress(value: unknown): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'toString' in value) return String(value)
  throw new Error(`Expected an address, received ${String(value)}`)
}

function decodeArgs(transaction: Transaction, method: ABIMethod): unknown[] {
  const appArgs = transaction.applicationCall?.appArgs ?? []
  expect(appArgs).toHaveLength(method.args.length + 1)
  expect(bytesEqual(appArgs[0], method.getSelector())).toBe(true)
  return method.args.map((argument, index) => {
    try {
      if (!(argument.type instanceof algosdk.ABIType)) {
        throw new Error(`Transaction and reference ABI arguments are not allowed in this conformance path`)
      }
      // algosdk's dynamic ABI decoder reads from ArrayBuffer offset zero, while
      // decoded transaction app args can be non-zero-offset views.
      return argument.type.decode(Uint8Array.from(appArgs[index + 1]))
    } catch (error) {
      throw new Error(
        `Could not decode ${method.name} argument ${index} (${argument.type.toString()}) from ${Buffer.from(appArgs[index + 1]).toString('hex')}`,
        { cause: error },
      )
    }
  })
}

/**
 * Test-side equivalent of the backend's fail-closed quote validator. ARC-58
 * intentionally grants the Pay method, so the on-chain wallet does not know
 * the hosted-agent quote's receiver or amount; that binding must be verified
 * before the group is presented for authorization and again after confirmation.
 */
function assertHostedAgentIdentityPaymentShape(
  transactions: readonly Transaction[],
  quote: IdentityPaymentQuote,
): void {
  expect(transactions).toHaveLength(3)

  const [rekey, pay, verify] = transactions
  const expectedGroup = rekey.group
  expect(expectedGroup).toBeDefined()
  expect(transactions.every((transaction) => bytesEqual(transaction.group, expectedGroup))).toBe(true)
  const ungrouped = cloneTransactions(transactions)
  ungrouped.forEach((transaction) => {
    transaction.group = undefined
  })
  expect(bytesEqual(algosdk.computeGroupID(ungrouped), expectedGroup)).toBe(true)
  expect(transactions.every((transaction) => transaction.type === algosdk.TransactionType.appl)).toBe(true)
  expect(transactions.every((transaction) => transaction.sender.toString() === quote.authorizer)).toBe(true)
  expect(transactions.map((transaction) => transaction.fee)).toStrictEqual([quote.minFee * 5n, 0n, 0n])
  expect(transactions.every((transaction) => transaction.firstValid === rekey.firstValid)).toBe(true)
  expect(transactions.every((transaction) => transaction.lastValid === rekey.lastValid)).toBe(true)
  expect(transactions.every((transaction) => transaction.genesisID === rekey.genesisID)).toBe(true)
  expect(transactions.every((transaction) => bytesEqual(transaction.genesisHash, rekey.genesisHash))).toBe(true)
  expect(transactions.every((transaction) => transaction.note.length === 0)).toBe(true)

  expect(rekey.applicationCall?.appIndex).toBe(quote.walletAppId)
  expect(pay.applicationCall?.appIndex).toBe(quote.payPluginAppId)
  expect(verify.applicationCall?.appIndex).toBe(quote.walletAppId)

  expect(bytesEqual(rekey.lease, quote.lease)).toBe(true)
  expect(pay.lease).toBeUndefined()
  expect(verify.lease).toBeUndefined()

  for (const transaction of transactions) {
    expect(transaction.payment).toBeUndefined()
    expect(transaction.assetTransfer).toBeUndefined()
    expect(transaction.assetConfig).toBeUndefined()
    expect(transaction.assetFreeze).toBeUndefined()
    expect(transaction.rekeyTo).toBeUndefined()
  }

  const [plugin, callerType, escrow, methodOffsets, fundsRequest] = decodeArgs(rekey, rekeyMethod)
  expect(plugin).toBe(quote.payPluginAppId)
  expect(callerType).toBe(CallerType.Admin)
  expect(escrow).toBe('')
  expect(methodOffsets).toStrictEqual([0n])
  expect(fundsRequest).toStrictEqual([])

  const [wallet, rekeyBack, payments] = decodeArgs(pay, payMethod)
  expect(wallet).toBe(quote.walletAppId)
  expect(rekeyBack).toBe(true)
  expect(payments).toHaveLength(1)
  const [[receiver, asset, amount]] = payments as [[unknown, bigint, bigint]]
  expect(asAddress(receiver)).toBe(quote.receiver)
  expect(asset).toBe(0n)
  expect(amount).toBe(quote.amount)

  expect(decodeArgs(verify, verifyMethod)).toStrictEqual([])
}

function innerPayments(confirmation: PendingTransactionResponse): DecodedInnerPayment[] {
  const result: DecodedInnerPayment[] = []
  const walk = (node: PendingTransactionResponse): void => {
    for (const inner of node.innerTxns ?? []) {
      const transaction = inner.txn.txn
      expect(transaction.type).toBe('pay')
      expect(transaction.assetTransfer).toBeUndefined()
      expect(transaction.assetConfig).toBeUndefined()
      expect(transaction.assetFreeze).toBeUndefined()
      expect(transaction.payment).toBeDefined()
      result.push({
        sender: transaction.sender.toString(),
        receiver: transaction.payment!.receiver.toString(),
        amount: transaction.payment!.amount,
        rekeyTo: transaction.rekeyTo?.toString(),
        closeRemainderTo: transaction.payment!.closeRemainderTo?.toString(),
      })
      walk(inner)
    }
  }
  walk(confirmation)
  return result
}

function cloneTransactions(transactions: readonly Transaction[]): Transaction[] {
  return transactions.map((transaction) =>
    algosdk.decodeUnsignedTransaction(algosdk.encodeUnsignedTransaction(transaction)),
  )
}

describe('ARC-58 hosted-agent identity payment conformance', () => {
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

  test(
    'builds, validates, and executes the exact quoted Pay-plugin group',
    async () => {
      expect(selectorHex(rekeyMethod)).toBe(REKEY_SELECTOR_HEX)
      expect(selectorHex(payMethod)).toBe(PAY_SELECTOR_HEX)
      expect(selectorHex(verifyMethod)).toBe(VERIFY_SELECTOR_HEX)

      const { algorand } = localnet
      const passkeyAdmin = algorand.account.random()
      const passkeyAuthorizer = algorand.account.random()
      const controlledAccount = algorand.account.random()
      const receiver = algorand.account.random()
      const wrongReceiver = algorand.account.random()
      const dispenser = await algorand.account.dispenserFromEnvironment()
      for (const account of [passkeyAdmin, passkeyAuthorizer, controlledAccount, receiver, wrongReceiver]) {
        await algorand.account.ensureFunded(account.addr, dispenser.addr.toString(), algo(10))
      }

      // LocalNet cannot produce a WebAuthn assertion. Model the same ARC-58
      // authorization boundary by making the passkey-admin address the sender
      // while a distinct auth address supplies its transaction signature.
      await algorand.send.payment({
        sender: passkeyAdmin.addr,
        signer: passkeyAdmin.signer,
        receiver: passkeyAdmin.addr,
        amount: algo(0),
        rekeyTo: passkeyAuthorizer.addr,
      })
      expect((await algorand.account.getInformation(passkeyAdmin.addr)).authAddr?.toString()).toBe(
        passkeyAuthorizer.addr.toString(),
      )

      const wallet: WalletSDK = await newWallet({
        algorand,
        readerAccount: passkeyAdmin.addr.toString(),
        factoryParams: {
          appId: walletFactory.appId,
          defaultSender: passkeyAdmin.addr,
          defaultSigner: passkeyAuthorizer.signer,
        },
        controlledAddress: controlledAccount.addr.toString(),
        // SG-04: the SDK puts the controlled account's rekey to the factory into the creation group.
        controlledSigner: controlledAccount.signer,
        nickname: 'hosted-agent-identity-payment',
      })
      expect((await wallet.client.state.global.getAll()).controlledAddress).toBe(controlledAccount.addr.toString())
      expect((await wallet.client.state.global.getAll()).admin).toBe(passkeyAdmin.addr.toString())
      expect((await algorand.account.getInformation(controlledAccount.addr)).authAddr?.toString()).toBe(
        wallet.client.appAddress.toString(),
      )
      const grantSuggestedParams = await algorand.getSuggestedParams()
      await wallet.addPlugin({
        client: payPlugin,
        callerType: CallerType.Admin,
        sender: passkeyAdmin.addr,
        signer: passkeyAuthorizer.signer,
        escrow: '',
        cooldown: 0n,
        methods: [{ name: payPlugin.pay(), cooldown: 0n }],
        useRounds: true,
        lastValid: BigInt(grantSuggestedParams.firstValid) + 1_000n,
        useExecutionKey: false,
        coverFees: false,
      })

      const installed = await wallet.client.state.box.plugins.getMap()
      expect(installed.size).toBe(1)
      const [[pluginKey, pluginGrant]] = Array.from(installed.entries())
      expect(pluginKey).toStrictEqual({
        plugin: payPlugin.appId,
        caller: wallet.client.appAddress.toString(),
        escrow: '',
      })
      expect(pluginGrant.escrow).toBe(0n)
      expect(pluginGrant.delegationType).toBe(0)
      expect(pluginGrant.admin).toBe(false)
      expect(pluginGrant.canReclaim).toBe(false)
      expect(pluginGrant.cooldown).toBe(0n)
      expect(pluginGrant.methods).toHaveLength(1)
      expect(Buffer.from(pluginGrant.methods[0][0]).toString('hex')).toBe(PAY_SELECTOR_HEX)
      expect(pluginGrant.methods[0][1]).toBe(0n)
      expect(pluginGrant.useRounds).toBe(true)
      expect(pluginGrant.lastValid).toBeGreaterThanOrEqual(
        BigInt(grantSuggestedParams.firstValid) + 100n,
      )
      expect(pluginGrant.useExecutionKey).toBe(false)
      expect(pluginGrant.coverFees).toBe(false)

      const adminPreflight = await wallet.client.send.arc58CanCall({
        sender: passkeyAdmin.addr,
        signer: passkeyAuthorizer.signer,
        args: {
          plugin: payPlugin.appId,
          type: CallerType.Admin,
          address: passkeyAdmin.addr.toString(),
          escrow: '',
          method: payMethod.getSelector(),
        },
      })
      expect(adminPreflight.return).toBe(true)
      const convenienceOtherPreflight = await wallet.client.send.arc58CanCall({
        sender: passkeyAdmin.addr,
        signer: passkeyAuthorizer.signer,
        args: {
          plugin: payPlugin.appId,
          type: CallerType.Other,
          address: passkeyAdmin.addr.toString(),
          escrow: '',
          method: payMethod.getSelector(),
        },
      })
      expect(convenienceOtherPreflight.return).toBe(false)

      const identityQuoteFirstValid = BigInt((await algorand.getSuggestedParams()).firstValid)
      const build = await wallet.build.usePlugin({
        sender: passkeyAdmin.addr,
        signer: passkeyAuthorizer.signer,
        lease: SERVER_SUPPLIED_LEASE,
        firstValid: identityQuoteFirstValid,
        // The current SDK build boundary is exclusive: a size of 101 produces
        // the backend's inclusive 100-round quote window [first, first + 100].
        windowSize: 101n,
        callerType: CallerType.Admin,
        calls: [
          payPlugin.pay({
            sender: passkeyAdmin.addr,
            signer: passkeyAuthorizer.signer,
            payments: [{ receiver: receiver.addr, asset: 0n, amount: QUOTED_AMOUNT }],
          }),
        ],
      })

      expect(build.windows).toHaveLength(1)
      const window = build.windows[0]
      expect(build.firstValid).toBe(identityQuoteFirstValid)
      expect(build.lastValid).toBe(identityQuoteFirstValid + 101n)
      expect(window.transactions.every((transaction) => transaction.firstValid === identityQuoteFirstValid)).toBe(true)
      expect(window.transactions.every((transaction) => transaction.lastValid === identityQuoteFirstValid + 100n)).toBe(true)
      const suggestedParams = await algorand.getSuggestedParams()
      const quote: IdentityPaymentQuote = {
        walletAppId: wallet.appId,
        payPluginAppId: payPlugin.appId,
        authorizer: passkeyAdmin.addr.toString(),
        controlledAddress: controlledAccount.addr.toString(),
        receiver: receiver.addr.toString(),
        amount: QUOTED_AMOUNT,
        lease: encodeLease(SERVER_SUPPLIED_LEASE)!,
        minFee: BigInt(suggestedParams.minFee),
      }

      expect(bytesEqual(build.lease, quote.lease)).toBe(true)
      assertHostedAgentIdentityPaymentShape(window.transactions, quote)

      expect(() =>
        assertHostedAgentIdentityPaymentShape(window.transactions, {
          ...quote,
          receiver: wrongReceiver.addr.toString(),
        }),
      ).toThrow()
      expect(() =>
        assertHostedAgentIdentityPaymentShape(window.transactions, { ...quote, amount: QUOTED_AMOUNT + 1n }),
      ).toThrow()
      expect(() =>
        assertHostedAgentIdentityPaymentShape(window.transactions, { ...quote, payPluginAppId: payPlugin.appId + 1n }),
      ).toThrow()
      expect(() =>
        assertHostedAgentIdentityPaymentShape(window.transactions, { ...quote, walletAppId: wallet.appId + 1n }),
      ).toThrow()
      expect(() =>
        assertHostedAgentIdentityPaymentShape(
          [window.transactions[1], window.transactions[0], window.transactions[2]],
          quote,
        ),
      ).toThrow()

      const alteredGroup = cloneTransactions(window.transactions)
      alteredGroup[1].group = new Uint8Array(32).fill(0x58)
      expect(() => assertHostedAgentIdentityPaymentShape(alteredGroup, quote)).toThrow()

      const controlledBefore = await algorand.account.getInformation(controlledAccount.addr)
      const receiverBefore = await algorand.account.getInformation(receiver.addr)
      const controlledAssetsBefore = (controlledBefore.assets ?? []).map(({ assetId, amount }) => ({
        assetId,
        amount,
      }))
      const receiverAssetsBefore = (receiverBefore.assets ?? []).map(({ assetId, amount }) => ({ assetId, amount }))

      const result = await sendPrepared(window, algorand.client.algod)
      expect(result.txIds).toHaveLength(3)
      expect(result.confirmedRound).toBeGreaterThan(0n)

      const allInnerPayments = result.confirmations.flatMap(innerPayments)
      expect(allInnerPayments).toStrictEqual([
        {
          sender: quote.controlledAddress,
          receiver: quote.controlledAddress,
          amount: 0n,
          rekeyTo: algosdk.getApplicationAddress(payPlugin.appId).toString(),
          closeRemainderTo: undefined,
        },
        {
          sender: quote.controlledAddress,
          receiver: receiver.addr.toString(),
          amount: QUOTED_AMOUNT,
          rekeyTo: wallet.client.appAddress.toString(),
          closeRemainderTo: undefined,
        },
      ])
      expect(allInnerPayments.filter(({ amount }) => amount > 0n)).toHaveLength(1)

      const controlledAfter = await algorand.account.getInformation(controlledAccount.addr)
      const receiverAfter = await algorand.account.getInformation(receiver.addr)
      expect(controlledBefore.balance.microAlgos - controlledAfter.balance.microAlgos).toBe(QUOTED_AMOUNT)
      expect(receiverAfter.balance.microAlgos - receiverBefore.balance.microAlgos).toBe(QUOTED_AMOUNT)
      expect((controlledAfter.assets ?? []).map(({ assetId, amount }) => ({ assetId, amount }))).toStrictEqual(
        controlledAssetsBefore,
      )
      expect((receiverAfter.assets ?? []).map(({ assetId, amount }) => ({ assetId, amount }))).toStrictEqual(
        receiverAssetsBefore,
      )
      expect(controlledAfter.authAddr?.toString()).toBe(wallet.client.appAddress.toString())

      const global = await wallet.client.state.global.getAll()
      expect(global.spendingAddress).toBe(ALGORAND_ZERO_ADDRESS_STRING)
      expect(global.currentPlugin?.plugin ?? 0n).toBe(0n)
      expect(global.rekeyIndex).toBe(0n)
    },
    TEST_TIMEOUT,
  )
})
