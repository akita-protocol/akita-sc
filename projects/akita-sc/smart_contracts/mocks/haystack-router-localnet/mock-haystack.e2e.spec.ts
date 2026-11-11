import type { AddressInfo } from 'node:net'
import type { Server } from 'node:http'
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { addInitialLiquidity, bootstrapPool, deployTinymanV2 } from '../../../tests/fixtures/external/tinyman-v2'
import { compileRouter, finalizeArgs, MockHaystack, quoteResponse, type MockRoute, type SwapTxn } from '../../../scripts/lib/mock-haystack'
import { createMockHaystackServer } from '../../../scripts/mock-haystack-server'

// The LocalNet mock Haystack Router end to end: the HTTP API quotes routes over Tinyman v2 pools, returns the
// swap group in Haystack's response shape, and the mock router app executes it. Every swap is sent the way
// @txnlab/haystack-router does it (regroup, the user signs the input, the per-swap account's `secret_key` signs
// the rest), and the received amount must equal the quote.
//
// Three Tinyman pools (1 unit = 10^6): ALGO/TKA 1:1, ALGO/TKB 1:1 and TKA/TKB 1:1.05. So ALGO→TKB is best as
// ALGO→TKA then TKA→TKB, and a large ALGO→TKB splits that path with the direct ALGO/TKB pool.

const UNIT = 1_000_000n

type Quote = Awaited<ReturnType<typeof quoteResponse>>

describe('MOCK Haystack Router (LocalNet)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let user: TransactionSignerAccount
  let mock: MockHaystack
  let routerAppId: bigint
  let server: Server
  let api: string
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

    const tm = await deployTinymanV2(algorand, admin.addr)
    const algoTka = await bootstrapPool(tm, admin.addr, 0n, tka)
    await addInitialLiquidity(tm, algoTka, admin.addr, 0n, 1_000n * UNIT, 1_000n * UNIT)
    const algoTkb = await bootstrapPool(tm, admin.addr, 0n, tkb)
    await addInitialLiquidity(tm, algoTkb, admin.addr, 0n, 1_000n * UNIT, 1_000n * UNIT)
    const tkaTkb = await bootstrapPool(tm, admin.addr, tka, tkb)
    await addInitialLiquidity(tm, tkaTkb, admin.addr, tka, 1_000n * UNIT, 1_050n * UNIT)

    const { approval, clear } = await compileRouter(algorand)
    routerAppId = (await algorand.send.appCreate({ sender: admin.addr, approvalProgram: approval, clearStateProgram: clear })).appId
    await algorand.send.payment({ sender: admin.addr, receiver: algosdk.getApplicationAddress(routerAppId), amount: (2).algo() })

    mock = new MockHaystack(algorand, { routerAppId, tinymanAppId: tm.appId, assets: [0n, tka, tkb] })
    server = createMockHaystackServer(mock).listen(0)
    await new Promise((resolve) => server.once('listening', resolve))
    api = `http://localhost:${(server.address() as AddressInfo).port}/api`
  }, 300_000)

  afterAll(() => server?.close())

  test('a one-hop route: ALGO → TKA fills on the ALGO/TKA pool, received = quote', async () => {
    const quote = await swapAndCheck(0n, tka, 10n * UNIT, 1)
    expect(venuesOf(quote)).toEqual([['TinymanV2']])
    expect(quote.flattenedRoute).toEqual({ TinymanV2: 100 })
    expect(quote.route[0].path.map((hop) => BigInt(hop.out.id))).toEqual([tka])
  })

  test('maxDepth 1 keeps ALGO → TKB on the direct pool, received = quote', async () => {
    const quote = await swapAndCheck(0n, tkb, 10n * UNIT, 1)
    expect(venuesOf(quote)).toEqual([['TinymanV2']])
    expect(quote.route[0].path.map((hop) => BigInt(hop.out.id))).toEqual([tkb])
  })

  test('a multi-hop route: ALGO → TKA, then TKA → TKB, beats the direct pool', async () => {
    const direct = await fetchQuote(0n, tkb, 10n * UNIT, 1)
    const quote = await swapAndCheck(0n, tkb, 10n * UNIT)
    expect(venuesOf(quote)).toEqual([['TinymanV2', 'TinymanV2']])
    expect(quote.route[0].path.map((hop) => BigInt(hop.out.id))).toEqual([tka, tkb])
    expect(BigInt(quote.quote)).toBeGreaterThan(BigInt(direct.quote))
  })

  test('a split: a large ALGO → TKB order is split over two pool-disjoint paths, received = quote', async () => {
    const quote = await swapAndCheck(0n, tkb, 300n * UNIT)
    expect(quote.route).toHaveLength(2)
    expect(quote.route.reduce((sum, leg) => sum + leg.percentage, 0)).toBe(100)
    expect(venuesOf(quote).map((leg) => leg.length).sort()).toEqual([1, 2])
    expect(venuesOf(quote).flat()).toEqual(['TinymanV2', 'TinymanV2', 'TinymanV2'])
  })

  test('a venue other than Tinyman is refused by the router', async () => {
    const route = (await mock.route(0n, tka, UNIT, 1))!
    const other = { ...route, legs: [{ ...route.legs[0], hops: [{ ...route.legs[0].hops[0], venue: 0n }] }] }
    const group = algorand.newGroup()
    group.addPayment({ sender: user.addr, receiver: algosdk.getApplicationAddress(routerAppId), amount: microAlgo(UNIT) })
    group.addAppCall({
      sender: user.addr,
      appId: routerAppId,
      args: finalizeArgs(other, 0n, user.addr.toString(), user.addr.toString()),
      accountReferences: [user.addr],
      assetReferences: [tka],
      maxFee: microAlgo(100_000),
    })
    await expect(group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })).rejects.toThrow(/mockHsVenue/)
  })

  test('an ASA → ALGO route pays ALGO to the beneficiary, received = quote', async () => {
    const quote = await fetchQuote(tka, 0n, 5n * UNIT)
    const before = await holding(user.addr.toString(), 0n)
    const { txns } = await execute(quote)
    // the user's ALGO also paid the whole group's fees, all on its input
    const userTxns = txns.filter((t) => t.sender.toString() === user.addr.toString())
    const userSpent = userTxns.reduce((sum, t) => sum + t.fee + (t.payment?.amount ?? 0n), 0n)
    expect((await holding(user.addr.toString(), 0n)) - before + userSpent).toBe(BigInt(quote.quote))
  })

  test('the route has the live shape: per-swap prefix and finalize calls, the user input right before finalize', async () => {
    const quote = await fetchQuote(tka, 0n, UNIT)
    const txns = await fetchSwapTxns(quote, 1)
    const decoded = txns.map((t) => algosdk.decodeUnsignedTransaction(Buffer.from(t.data, 'base64')))
    const finalize = decoded.at(-1)!.applicationCall!
    const temp = decoded.at(-1)!.sender.toString()
    expect(Buffer.from(finalize.appArgs[0]).toString('hex')).toBe('871a0354')
    expect(finalize.appArgs).toHaveLength(7)
    const assets = finalize.appArgs[1]
    expect(Buffer.from(assets.slice(0, 2)).readUInt16BE()).toBe(2)
    expect([algosdk.decodeUint64(assets.slice(2, 10), 'bigint'), algosdk.decodeUint64(assets.slice(10, 18), 'bigint')]).toEqual([tka, 0n])
    const terms = finalize.appArgs[4]
    expect(terms).toHaveLength(93)
    expect(algosdk.decodeUint64(terms.slice(2, 10), 'bigint')).toBe((BigInt(quote.quote) * 9_900n) / 10_000n)
    expect(algosdk.encodeAddress(terms.slice(29, 61))).toBe(user.addr.toString())
    // the user signs only the input, which carries every fee; the per-swap account sends the rest with its own key
    expect(txns.map((t) => t.signature === false)).toEqual(decoded.map((_, i) => i === decoded.length - 2))
    const input = decoded.at(-2)!
    expect(input.assetTransfer?.amount).toBe(UNIT)
    expect(input.fee).toBe(decoded.reduce((sum, t) => sum + t.fee, 0n))
    expect(temp).not.toBe(user.addr.toString())
    for (const [i, t] of decoded.entries()) if (i !== decoded.length - 2) expect([t.sender.toString(), t.fee]).toEqual([temp, 0n])
    expect(Buffer.from(decoded[1].applicationCall!.appArgs[0]).toString('hex')).toBe('a83187ea')
    const sig = txns.at(-1)!.signature as { value: number[] }
    expect(algosdk.encodeAddress(Uint8Array.from(sig.value).slice(32))).toBe(temp)
  })

  test('the input may come from any sender, as with the per-swap account', async () => {
    const quote = await fetchQuote(0n, tka, UNIT)
    const txns = await fetchSwapTxns(quote, 1)
    const decoded = txns.map((t) => algosdk.decodeUnsignedTransaction(Buffer.from(t.data, 'base64')))
    const temp = decoded.at(-1)!.sender.toString()
    // re-send the input from the per-swap account, funded here as an Akita wallet's plugin would fund it
    const input = decoded.at(-2)!
    await algorand.send.payment({ sender: user.addr, receiver: temp, amount: microAlgo(UNIT + input.fee + 100_000n) })
    decoded[decoded.length - 2] = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: temp,
      receiver: input.payment!.receiver,
      amount: input.payment!.amount,
      suggestedParams: { ...(await algorand.getSuggestedParams()), fee: input.fee, flatFee: true },
    })
    const sk = Uint8Array.from((txns.at(-1)!.signature as { value: number[] }).value)
    const before = await holding(user.addr.toString(), tka)
    await sendSwapTxns(txns.map((t, i) => ({ ...t, data: Buffer.from(algosdk.encodeUnsignedTransaction(decoded[i])).toString('base64'), signature: { type: 'secret_key' as const, value: Array.from(sk) } })))
    expect((await holding(user.addr.toString(), tka)) - before).toBe(BigInt(quote.quote))
  })

  test('finalize reverts below minAmountOut, when the router does not hold the input, and on a route mismatch', async () => {
    const route = (await mock.route(0n, tka, UNIT, 1))!
    const build = async (r: MockRoute, minOut: bigint, inputAmount = r.amountIn) => {
      const group = algorand.newGroup()
      group.addPayment({ sender: user.addr, receiver: algosdk.getApplicationAddress(routerAppId), amount: microAlgo(inputAmount) })
      group.addAppCall({
        sender: user.addr,
        appId: routerAppId,
        args: finalizeArgs(r, minOut, user.addr.toString(), user.addr.toString()),
        accountReferences: [user.addr],
        assetReferences: [tka],
        maxFee: microAlgo(100_000),
      })
      return group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
    }
    await expect(build(route, route.amountOut + 1n)).rejects.toThrow(/mockHsSlippage/)
    // the input right before finalize must be there and match the route
    await expect(build(route, 0n, 0n)).rejects.toThrow(/mockHsInput/)
    const short = { ...route, legs: [{ ...route.legs[0], amountIn: route.amountIn - 1n }] }
    await expect(build(short, 0n)).rejects.toThrow(/mockHsRoute/)
  })
})
