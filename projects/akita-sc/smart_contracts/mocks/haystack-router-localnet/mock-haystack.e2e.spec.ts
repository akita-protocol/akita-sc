import type { AddressInfo } from 'node:net'
import type { Server } from 'node:http'
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient } from '../../artifacts/plugin-dex/PluginDexClient'
import { addLiquidity, createPool, deployVault, poolConfig } from '../../../tests/fixtures/plugin-dex'
import { addInitialLiquidity, bootstrapPool, deployTinymanV2 } from '../../../tests/fixtures/external/tinyman-v2'
import { compileRouter, finalizeArgs, MockHaystack, quoteResponse, type MockRoute, type SwapTxn } from '../../../scripts/lib/mock-haystack'
import { createMockHaystackServer } from '../../../scripts/mock-haystack-server'

// The LocalNet mock Haystack Router end to end: the HTTP API quotes routes over Plugin DEX and Tinyman v2
// pools, returns the swap group in Haystack's response shape, and the mock router app executes it. Every swap
// is sent the way @txnlab/haystack-router does it (regroup, the user signs the input, the relay's
// `secret_key` signs the rest), and the received amount must equal the quote.
//
// Prices (1 unit = 10^6): Plugin DEX ALGO/TKA 1:1 and TKA/TKB 1:1; Tinyman ALGO/TKB 1:1 and TKA/TKB 1:1.05.
// So ALGO→TKA is best on Plugin DEX alone, ALGO→TKB is best as Plugin DEX ALGO→TKA then Tinyman TKA→TKB, and a
// large ALGO→TKB splits that path with Tinyman's direct pool.

const UNIT = 1_000_000n

type Quote = Awaited<ReturnType<typeof quoteResponse>>

describe('MOCK Haystack Router (LocalNet)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let user: TransactionSignerAccount
  let dex: PluginDexClient
  let mock: MockHaystack
  let routerAppId: bigint
  let server: Server
  let api: string
  let relay: algosdk.Account
  let tka: bigint
  let tkb: bigint

  const holding = async (address: string, asset: bigint) =>
    asset === 0n
      ? (await algorand.account.getInformation(address)).balance.microAlgos
      : (await algorand.asset.getAccountInformation(address, asset)).balance

  const fetchQuote = async (from: bigint, to: bigint, amount: bigint, maxDepth = 3) => {
    const res = await fetch(`${api}/fetchQuote?fromASAID=${from}&toASAID=${to}&amount=${amount}&type=fixed-input&maxDepth=${maxDepth}`)
    const body = await res.json()
    if (!res.ok) throw new Error((body as { error: string }).error)
    return body as Quote
  }

  const fetchSwapTxns = async (quote: { txnPayload: unknown }, slippage: number) => {
    const res = await fetch(`${api}/fetchExecuteSwapTxns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: 'mock', address: user.addr.toString(), txnPayloadJSON: quote.txnPayload, slippage }),
    })
    const body = (await res.json()) as { txns: SwapTxn[]; error?: string }
    if (!res.ok) throw new Error(body.error)
    return body.txns
  }

  /** @txnlab/haystack-router's send path: decode, drop the group, regroup, sign per `signature`, send */
  const execute = async (quote: { txnPayload: unknown }, slippage = 0) => sendSwapTxns(await fetchSwapTxns(quote, slippage))

  const sendSwapTxns = async (txns: SwapTxn[]) => {
    const decoded = txns.map((t) => {
      const txn = algosdk.decodeUnsignedTransaction(Buffer.from(t.data, 'base64'))
      txn.group = undefined
      return txn
    })
    algosdk.assignGroupID(decoded)
    const signed = await Promise.all(
      decoded.map(async (txn, i) => {
        const sig = txns[i].signature
        if (sig === false) return (await user.signer([txn], [0]))[0]
        return algosdk.signTransaction(txn, new Uint8Array(Object.values(sig.value))).blob
      }),
    )
    const { txid } = await algorand.client.algod.sendRawTransaction(signed).do()
    await algosdk.waitForConfirmation(algorand.client.algod, txid, 10)
    return { txns: decoded }
  }

  const swapAndCheck = async (from: bigint, to: bigint, amount: bigint, maxDepth = 3) => {
    const quote = await fetchQuote(from, to, amount, maxDepth)
    const before = await holding(user.addr.toString(), to)
    await execute(quote)
    const received = (await holding(user.addr.toString(), to)) - before
    expect(received).toBe(BigInt(quote.quote))
    return quote
  }

  const venuesOf = (quote: { route: { path: { name: string }[] }[] }) => quote.route.map((leg) => leg.path.map((hop) => hop.name))

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (20_000).algo())
    user = await localnet.context.generateAccount({ initialFunds: (2_000).algo() })

    for (const name of ['TKA', 'TKB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 18n, decimals: 6, unitName: name })
      await algorand.send.assetOptIn({ sender: user.addr, assetId })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: user.addr, assetId, amount: 100_000n * UNIT })
      if (name === 'TKA') tka = assetId
      else tkb = assetId
    }

    dex = await deployVault({ algorand, sender: admin })
    const algoTka = await createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(30n) })
    await addLiquidity(algorand, dex, admin, algoTka.poolId, 1_000n * UNIT, 1_000n * UNIT)
    const tkaTkb = await createPool({ algorand, dex, sender: admin, assetA: tka, assetB: tkb, config: poolConfig(30n) })
    await addLiquidity(algorand, dex, admin, tkaTkb.poolId, 1_000n * UNIT, 1_000n * UNIT)

    const tm = await deployTinymanV2(algorand, admin.addr)
    const algoTkb = await bootstrapPool(tm, admin.addr, 0n, tkb)
    await addInitialLiquidity(tm, algoTkb, admin.addr, 0n, 1_000n * UNIT, 1_000n * UNIT)
    const tmTkaTkb = await bootstrapPool(tm, admin.addr, tka, tkb)
    await addInitialLiquidity(tm, tmTkaTkb, admin.addr, tka, 1_000n * UNIT, 1_050n * UNIT)

    const { approval, clear } = await compileRouter(algorand)
    routerAppId = (await algorand.send.appCreate({ sender: admin.addr, approvalProgram: approval, clearStateProgram: clear })).appId
    await algorand.send.payment({ sender: admin.addr, receiver: algosdk.getApplicationAddress(routerAppId), amount: (2).algo() })
    relay = algosdk.generateAccount()
    await algorand.send.payment({ sender: admin.addr, receiver: relay.addr, amount: (1).algo() })

    mock = new MockHaystack(algorand, { routerAppId, vaultAppId: dex.appId, tinymanAppId: tm.appId, relay })
    server = createMockHaystackServer(mock).listen(0)
    await new Promise((resolve) => server.once('listening', resolve))
    api = `http://localhost:${(server.address() as AddressInfo).port}/api`
  }, 300_000)

  afterAll(() => server?.close())

  test('a Plugin DEX route: ALGO → TKA with one hop fills on the Vault pool, received = quote', async () => {
    const quote = await swapAndCheck(0n, tka, 10n * UNIT, 1)
    expect(venuesOf(quote)).toEqual([['PluginDex']])
    expect(quote.flattenedRoute).toEqual({ PluginDex: 100 })
  })

  test('a Tinyman route: ALGO → TKB with one hop fills on Tinyman, received = quote', async () => {
    const quote = await swapAndCheck(0n, tkb, 10n * UNIT, 1)
    expect(venuesOf(quote)).toEqual([['TinymanV2']])
  })

  test('a multi-hop route across venues: ALGO → TKA on Plugin DEX, then TKA → TKB on Tinyman', async () => {
    const quote = await swapAndCheck(0n, tkb, 10n * UNIT)
    expect(venuesOf(quote)).toEqual([['PluginDex', 'TinymanV2']])
    expect(quote.route[0].path.map((hop) => BigInt(hop.out.id))).toEqual([tka, tkb])
  })

  test('a split: a large ALGO → TKB order is split over two pool-disjoint paths, received = quote', async () => {
    const quote = await swapAndCheck(0n, tkb, 300n * UNIT)
    expect(quote.route).toHaveLength(2)
    expect(quote.route.reduce((sum, leg) => sum + leg.percentage, 0)).toBe(100)
    expect(venuesOf(quote).flat().sort()).toEqual(['PluginDex', 'TinymanV2', 'TinymanV2'])
  })

  test('an ASA → ALGO route pays ALGO to the beneficiary, received = quote', async () => {
    const quote = await fetchQuote(tka, 0n, 5n * UNIT)
    const before = await holding(user.addr.toString(), 0n)
    const { txns } = await execute(quote)
    const userFees = txns.filter((t) => t.sender.toString() === user.addr.toString()).reduce((sum, t) => sum + t.fee, 0n)
    expect((await holding(user.addr.toString(), 0n)) - before + userFees).toBe(BigInt(quote.quote))
  })

  test('the finalize call keeps the argument positions our wallet code reads', async () => {
    const quote = await fetchQuote(0n, tka, UNIT)
    const txns = await fetchSwapTxns(quote, 1)
    const decoded = txns.map((t) => algosdk.decodeUnsignedTransaction(Buffer.from(t.data, 'base64')))
    const finalize = decoded.at(-1)!.applicationCall!
    expect(Buffer.from(finalize.appArgs[0]).toString('hex')).toBe('c890dc20')
    expect(finalize.appArgs.length).toBeGreaterThan(8)
    expect(finalize.foreignAssets[Number(algosdk.decodeUint64(finalize.appArgs[2], 'bigint'))]).toBe(tka)
    expect(algosdk.decodeUint64(finalize.appArgs[4], 'bigint')).toBe((BigInt(quote.quote) * 9_900n) / 10_000n)
    expect(finalize.accounts[Number(algosdk.decodeUint64(finalize.appArgs[6], 'bigint')) - 1].toString()).toBe(user.addr.toString())
    // only the input is the user's to sign, and it is the transaction right before finalize
    expect(txns.map((t) => t.signature === false)).toEqual(decoded.map((_, i) => i === decoded.length - 2))
    expect(decoded.at(-2)!.sender.toString()).toBe(user.addr.toString())
  })

  test('finalize reverts below minAmountOut and when the input does not match', async () => {
    const route = (await mock.route(0n, tka, UNIT, 1))!
    const build = async (r: MockRoute, minOut: bigint, inputAmount = r.amountIn) => {
      const group = algorand.newGroup()
      group.addPayment({ sender: user.addr, receiver: algosdk.getApplicationAddress(routerAppId), amount: microAlgo(inputAmount) })
      group.addAppCall({
        sender: user.addr,
        appId: routerAppId,
        args: finalizeArgs(r, minOut),
        accountReferences: [user.addr, user.addr],
        assetReferences: [tka],
        maxFee: microAlgo(100_000),
      })
      return group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    }
    await expect(build(route, route.amountOut + 1n)).rejects.toThrow(/mockHsSlippage/)
    await expect(build(route, 0n, route.amountIn - 1n)).rejects.toThrow(/mockHsInput/)
    const short = { ...route, legs: [{ ...route.legs[0], amountIn: route.amountIn - 1n }] }
    await expect(build(short, 0n)).rejects.toThrow(/mockHsRoute/)
  })
})
