import type { AddressInfo } from 'node:net'
import type { Server } from 'node:http'
import { AlgorandClient, Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk from 'algosdk'
import { prepareGroup, sendPrepared } from 'akita-sdk'
import { CallerType, HaystackRouterPluginSDK, newWallet, OptInPluginSDK, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../tests/fixtures/escrow'
import { deployHaystackRouterPlugin } from '../../../tests/fixtures/plugins/haystack-router'
import { deployOptInPlugin } from '../../../tests/fixtures/plugins/optin'
import { addInitialLiquidity, bootstrapPool, deployTinymanV2 } from '../../../tests/fixtures/external/tinyman-v2'
import { compileRouter, FINALIZE_SELECTOR, MockHaystack, quoteResponse, type SwapTxn } from '../../../scripts/lib/mock-haystack'
import { createMockHaystackServer } from '../../../scripts/mock-haystack-server'

// The mock Haystack Router through an Akita wallet's HaystackRouterPlugin, the group both apps build
// (akita-rn services/haystackPluginSwap.ts, akita-desktop services/swap/haystack-plugin.ts):
//
//   caller → temp (minimum balance + the route's fees + its other ALGO), temp opt-in (ASA input)
//   [rekeyToPlugin, plugin.swap (pays temp `amount` from the wallet), verify]          signed by the plugin's caller
//   Haystack's route, its user transactions re-sent from temp                         temp (Haystack's key)
//   temp closes the input asset to the wallet (ASA input), temp closes its ALGO to the caller
//
// temp is Haystack's per-swap account: the route's prefix and finalize calls come from it, with its key as a
// `secret_key` signature. The route is requested for the wallet, so its output goes to the wallet, and the router
// takes its input from the transaction right before finalize, whoever sent it. The wallet must receive exactly the
// quote, and temp must end empty.

const UNIT = 1_000_000n
type Quote = Awaited<ReturnType<typeof quoteResponse>>

describe('MOCK Haystack Router through the HaystackRouterPlugin (LocalNet)', () => {
  const fixture = algorandFixture()
  const previousMbr = process.env.WALLET_MBR_APP_ID
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let walletFactory: WalletFactorySDK
  let wallet: WalletSDK
  let plugin: HaystackRouterPluginSDK
  let optInPlugin: OptInPluginSDK
  let server: Server
  let api: string
  let tka: bigint
  let tkb: bigint
  const referrer = algosdk.generateAccount().addr.toString()

  const holding = async (address: string, asset: bigint) =>
    asset === 0n
      ? (await algorand.account.getInformation(address)).balance.microAlgos
      : (await algorand.asset.getAccountInformation(address, asset)).balance

  const quote = async (from: bigint, to: bigint, amount: bigint) => {
    const res = await fetch(`${api}/fetchQuote?fromASAID=${from}&toASAID=${to}&amount=${amount}&type=fixed-input&referrerAddress=${referrer}`)
    const body = await res.json()
    if (!res.ok) throw new Error((body as { error: string }).error)
    return body as Quote
  }

  const routeTxns = async (q: Quote, slippage: number) => {
    const res = await fetch(`${api}/fetchExecuteSwapTxns`, {
      method: 'POST',
      body: JSON.stringify({ address: wallet.client.appAddress.toString(), txnPayloadJSON: q.txnPayload, slippage }),
    })
    const body = (await res.json()) as { txns: SwapTxn[]; error?: string }
    if (!res.ok) throw new Error(body.error)
    return body.txns
  }

  /** The apps' send path (see the header): Haystack's per-swap account re-sends the route's user transactions */
  const sendWindowWithRoute = async (txns: SwapTxn[], call: { asset: bigint; amount: bigint; outputAsset: bigint; minOutputAmount: bigint }) => {
    const caller = admin.addr.toString()
    const walletAddress = wallet.client.appAddress.toString()
    const keyed = txns.find((t) => t.signature !== false)!
    const sk = Uint8Array.from((keyed.signature as { value: number[] }).value)
    const tempAddr = algosdk.encodeAddress(sk.slice(32))
    const tempSigner = algosdk.makeBasicAccountTransactionSigner({ addr: algosdk.Address.fromString(tempAddr), sk })
    const sp = { ...(await algorand.getSuggestedParams()), fee: 0n, flatFee: true }
    let extraAlgo = 0n
    let routeFees = 0n
    // temp holds only what the group gives it, so every route transaction is fee 0 and the caller's funding pays
    const route = txns.map((t) => {
      const txn = algosdk.decodeUnsignedTransaction(Buffer.from(t.data, 'base64'))
      routeFees += txn.fee
      if (t.signature !== false) {
        expect(txn.sender.toString()).toBe(tempAddr)
        txn.group = undefined
        txn.fee = 0n
        return { txn, signer: tempSigner }
      }
      const params = { sender: tempAddr, suggestedParams: { ...sp, firstValid: txn.firstValid, lastValid: txn.lastValid } }
      extraAlgo += txn.payment?.amount ?? 0n
      const rewritten = txn.payment
        ? algosdk.makePaymentTxnWithSuggestedParamsFromObject({ ...params, receiver: txn.payment.receiver, amount: txn.payment.amount })
        : algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({ ...params, receiver: txn.assetTransfer!.receiver, assetIndex: txn.assetTransfer!.assetIndex, amount: txn.assetTransfer!.amount })
      return { txn: rewritten, signer: tempSigner }
    })
    // the plugin funds the input; the caller funds temp's minimum balance, the route's fees and its other ALGO
    if (call.asset === 0n) extraAlgo -= call.amount
    const ownTxns = BigInt(call.asset === 0n ? 1 : 3)
    const fundingFee = { ...sp, fee: BigInt(sp.minFee) * (1n + ownTxns) + routeFees }
    const pre = [
      { txn: algosdk.makePaymentTxnWithSuggestedParamsFromObject({ sender: caller, receiver: tempAddr, amount: 100_000n * (call.asset === 0n ? 1n : 2n) + extraAlgo, suggestedParams: fundingFee }), signer: admin.signer },
      ...(call.asset === 0n ? [] : [{ txn: algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({ sender: tempAddr, receiver: tempAddr, assetIndex: call.asset, amount: 0n, suggestedParams: sp }), signer: tempSigner }]),
    ]
    const { group } = await wallet.prepareUsePlugin({ callerType: CallerType.Global, preTransactions: pre, calls: [plugin.swap(call)] })
    const composer = await group.composer()
    for (const { txn, signer } of route) composer.addTransaction(txn, signer)
    if (call.asset !== 0n) {
      composer.addTransaction(algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({ sender: tempAddr, receiver: walletAddress, closeRemainderTo: walletAddress, assetIndex: call.asset, amount: 0n, suggestedParams: sp }), tempSigner)
    }
    composer.addTransaction(algosdk.makePaymentTxnWithSuggestedParamsFromObject({ sender: tempAddr, receiver: caller, closeRemainderTo: caller, amount: 0n, suggestedParams: sp }), tempSigner)
    for (const entry of (composer as unknown as { txns: { type: string; maxFee?: unknown }[] }).txns) {
      if ((entry.type === 'methodCall' || entry.type === 'appCall') && entry.maxFee === undefined) entry.maxFee = microAlgo(100_000)
    }
    const result = await sendPrepared(await prepareGroup(composer, { consolidateFees: true }), algorand.client.algod)
    return { result, temp: tempAddr, extraAlgo }
  }

  const swapThroughPlugin = async (from: bigint, to: bigint, amount: bigint) => {
    const q = await quote(from, to, amount)
    const txns = await routeTxns(q, 1)
    const finalize = txns
      .map((t) => algosdk.decodeUnsignedTransaction(Buffer.from(t.data, 'base64')))
      .find((t) => Buffer.from(t.applicationCall?.appArgs[0] ?? []).equals(FINALIZE_SELECTOR))!
    const minOutputAmount = algosdk.decodeUint64(finalize.applicationCall!.appArgs[4].slice(2, 10), 'bigint')
    const before = await holding(wallet.client.appAddress.toString(), to)
    const { temp } = await sendWindowWithRoute(txns, { asset: from, amount, outputAsset: to, minOutputAmount })
    // temp ends closed: no ALGO, no assets
    const tempInfo = await algorand.account.getInformation(temp)
    expect(tempInfo.balance.microAlgos).toBe(0n)
    expect(tempInfo.assets ?? []).toHaveLength(0)
    return { quote: q, received: (await holding(wallet.client.appAddress.toString(), to)) - before }
  }

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    algorand = fixture.algorand
    admin = fixture.context.testAccount
    const sender = admin.addr.toString()
    const signer = admin.signer
    await algorand.account.ensureFunded(sender, await algorand.account.dispenserFromEnvironment(), (20_000).algo())

    const { appClient: mbr } = await algorand.client
      .getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: sender, defaultSigner: signer })
      .send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const escrowFactory = await deployEscrowFactory({ fixture, sender, signer })
    const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrowFactory.appId } })
    walletFactory = await deployAbstractedAccountFactory({ fixture, sender, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })

    for (const name of ['TKA', 'TKB']) {
      const { assetId } = await algorand.send.assetCreate({ sender, total: 10n ** 18n, decimals: 6, unitName: name })
      if (name === 'TKA') tka = assetId
      else tkb = assetId
    }
    // Tinyman ALGO/TKA 1:1, ALGO/TKB 1:1 and TKA/TKB 1:1.05 (as mock-haystack.e2e.spec.ts)
    const tm = await deployTinymanV2(algorand, admin.addr)
    await addInitialLiquidity(tm, await bootstrapPool(tm, admin.addr, 0n, tka), admin.addr, 0n, 1_000n * UNIT, 1_000n * UNIT)
    await addInitialLiquidity(tm, await bootstrapPool(tm, admin.addr, 0n, tkb), admin.addr, 0n, 1_000n * UNIT, 1_000n * UNIT)
    await addInitialLiquidity(tm, await bootstrapPool(tm, admin.addr, tka, tkb), admin.addr, tka, 1_000n * UNIT, 1_050n * UNIT)

    const { approval, clear } = await compileRouter(algorand)
    const routerAppId = (await algorand.send.appCreate({ sender, approvalProgram: approval, clearStateProgram: clear })).appId
    await algorand.send.payment({ sender, receiver: algosdk.getApplicationAddress(routerAppId), amount: (2).algo() })
    plugin = await deployHaystackRouterPlugin({ fixture, sender, signer, args: {
      router: routerAppId, routerMethod: FINALIZE_SELECTOR, referrer, referrerTreasury: routerAppId,
    } })
    optInPlugin = await deployOptInPlugin({ fixture, sender, signer })
    wallet = await newWallet({ algorand, factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: signer }, readerAccount: sender, nickname: 'mock haystack' })
    await wallet.client.appClient.fundAppAccount({ amount: (500).algo() })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })
    await wallet.addPlugin({ client: optInPlugin, callerType: CallerType.Global })
    await wallet.usePlugin({ callerType: CallerType.Global, calls: [optInPlugin.optIn({ assets: [tka, tkb] })] })
    await algorand.send.assetTransfer({ sender, receiver: wallet.client.appAddress, assetId: tka, amount: 10_000n * UNIT })

    const mock = new MockHaystack(algorand, { routerAppId, tinymanAppId: tm.appId, assets: [0n, tka, tkb] })
    server = createMockHaystackServer(mock).listen(0)
    await new Promise((resolve) => server.once('listening', resolve))
    api = `http://localhost:${(server.address() as AddressInfo).port}/api`
  }, 600_000)

  afterAll(() => {
    server?.close()
    if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbr
  })

  test('the route for a wallet pays the wallet; its only user transaction is the input, right before finalize', async () => {
    const txns = await routeTxns(await quote(0n, tkb, 10n * UNIT), 1)
    const decoded = txns.map((t) => algosdk.decodeUnsignedTransaction(Buffer.from(t.data, 'base64')))
    const user = decoded.filter((_, i) => txns[i].signature === false)
    expect(user).toEqual([decoded.at(-2)])
    expect([user[0].sender.toString(), user[0].payment?.amount]).toEqual([wallet.client.appAddress.toString(), 10n * UNIT])
    const terms = decoded.at(-1)!.applicationCall!.appArgs[4]
    expect(algosdk.encodeAddress(terms.slice(29, 61))).toBe(wallet.client.appAddress.toString())
    expect(algosdk.encodeAddress(terms.slice(61, 93))).toBe(referrer)
  })

  test('ALGO → TKB over two Tinyman pools: the wallet receives exactly the quote', async () => {
    const { quote: q, received } = await swapThroughPlugin(0n, tkb, 10n * UNIT)
    expect(q.route.map((leg) => leg.path.map((hop) => BigInt(hop.out.id)))).toEqual([[tka, tkb]])
    expect(q.flattenedRoute).toEqual({ TinymanV2: 100 })
    expect(received).toBe(BigInt(q.quote))
  })

  test('an ASA input (TKA → TKB, split): the plugin pays the router the ASA, received = quote', async () => {
    const { quote: q, received } = await swapThroughPlugin(tka, tkb, 300n * UNIT)
    expect(received).toBe(BigInt(q.quote))
  })

  test('an ALGO output (TKA → ALGO): finalize encodes asset 0, the plugin accepts it, received = quote', async () => {
    const before = await algorand.account.getInformation(wallet.client.appAddress)
    const { quote: q } = await swapThroughPlugin(tka, 0n, 50n * UNIT)
    const after = await algorand.account.getInformation(wallet.client.appAddress)
    // the wallet pays no fees (the caller does), so its ALGO rises by exactly the output
    expect(after.balance.microAlgos - before.balance.microAlgos).toBe(BigInt(q.quote))
  })

  test('the plugin rejects a route whose minimum differs from the plugin call', async () => {
    const txns = await routeTxns(await quote(0n, tka, UNIT), 1)
    await expect(sendWindowWithRoute(txns, { asset: 0n, amount: UNIT, outputAsset: tka, minOutputAmount: 1n })).rejects.toThrow(/errIhmo/)
  })
})
