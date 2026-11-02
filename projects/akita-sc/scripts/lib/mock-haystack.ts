/**
 * MOCK Haystack Router for LocalNet: the routing engine and transaction builder behind
 * `scripts/mock-haystack-server.ts`. This is not Haystack's code. It answers the same two endpoints as the
 * Haystack Router API (`GET /fetchQuote`, `POST /fetchExecuteSwapTxns`) in the response shapes of
 * `@txnlab/haystack-router` v2 (MIT), so the apps' Haystack swap path runs unchanged against LocalNet.
 *
 * Venues: every live Plugin DEX pool (quoted with the Vault's read-only `tryQuoteRoute`, swapper = the router
 * app, as INTEGRATION.md tells aggregators) and every Tinyman v2 pool on the vendored fixture between the
 * assets those pools use (exact off-chain Tinyman math). Routes have up to 3 hops and at most 2 split legs
 * that share no pool, so each leg's quote is independent and the quote equals the execution within a block.
 *
 * Execution: [reference carriers…, input (user), route fee (user), finalize (relay)], like Haystack's MainNet
 * routes; the finalize call goes to the mock router app (`smart_contracts/mocks/haystack-router-localnet`), which,
 * like Haystack's router, swaps from its own balance whoever funded it. An Akita wallet's app re-sends the user
 * transactions from a temporary account its HaystackRouterPlugin funds.
 */
import fs from 'node:fs'
import path from 'node:path'
import { AlgorandClient, microAlgo, prepareGroupForSending } from '@algorandfoundation/algokit-utils'
import type { Arc56Contract } from '@algorandfoundation/algokit-utils/types/app-arc56'
import algosdk from 'algosdk'
import { deriveTinymanPool, readPoolState, tinymanFixedInputOut, type TinymanPoolState } from '../../tests/fixtures/external/tinyman-v2'

export const FINALIZE_SELECTOR = Uint8Array.from([0xc8, 0x90, 0xdc, 0x20])
export const VENUE_PLUGIN_DEX = 0n
export const VENUE_TINYMAN = 1n
export const PROTOCOL_NAME = { [VENUE_PLUGIN_DEX.toString()]: 'PluginDex', [VENUE_TINYMAN.toString()]: 'TinymanV2' } as Record<string, string>
const MAX_HOPS = 3
const MAX_PATHS_FOR_SPLIT = 4
const SPLIT_STEPS = [10n, 20n, 30n, 40n, 50n, 60n, 70n, 80n, 90n]
/** reference carriers before the input; each holds 8 references for the legs' inner calls */
const CARRIERS = 4
/** the small ALGO payment Haystack's MainNet routes take from the user next to the input (10,000 µALGO) */
const ROUTE_FEE = 10_000n

const ARTIFACTS = path.resolve(__dirname, '../../smart_contracts/artifacts')
const vaultSpec = () =>
  JSON.parse(fs.readFileSync(path.join(ARTIFACTS, 'plugin-dex/PluginDex.arc56.json'), 'utf8')) as Arc56Contract

export type MockHaystackConfig = {
  routerAppId: bigint
  vaultAppId: bigint
  /** 0 = no Tinyman venue */
  tinymanAppId: bigint
  /** the relay account that sends the carriers and finalize; its key goes out as a `secret_key` signature */
  relay: algosdk.Account
}

export type Hop = {
  venue: bigint
  app: bigint
  /** Plugin DEX pool id; 0 for Tinyman */
  pool: bigint
  /** Plugin DEX pool escrow app; 0 for Tinyman */
  escrow: bigint
  assetIn: bigint
  assetOut: bigint
  /** unique per venue pool, so split legs can be checked for overlap */
  key: string
}
export type Leg = { amountIn: bigint; hops: Hop[]; amountOut: bigint }
export type MockRoute = { assetIn: bigint; assetOut: bigint; amountIn: bigint; amountOut: bigint; legs: Leg[] }

type Edge = Omit<Hop, 'assetIn' | 'assetOut'> & { assets: [bigint, bigint]; tinyman?: TinymanPoolState }

export class MockHaystack {
  private readonly routerAddress: string
  constructor(
    readonly algorand: AlgorandClient,
    readonly config: MockHaystackConfig,
  ) {
    this.routerAddress = algosdk.getApplicationAddress(config.routerAppId).toString()
  }

  /** Every live venue pool as an undirected edge */
  async venues(): Promise<Edge[]> {
    const edges: Edge[] = []
    const spec = vaultSpec()
    const poolType = algosdk.ABIType.from(`(${spec.structs.PoolInfo.map((f) => f.type).join(',')})`)
    const state = await this.algorand.app.getGlobalState(this.config.vaultAppId)
    const cursor = BigInt(state.pool_cursor?.value ?? 0)
    const assets = new Set<bigint>()
    for (let id = 0n; id < cursor; id++) {
      const name = new Uint8Array([...Buffer.from('p'), ...algosdk.encodeUint64(id)])
      const box = await this.algorand.app.getBoxValue(this.config.vaultAppId, name).catch(() => undefined)
      if (!box) continue
      const values = poolType.decode(box) as unknown[]
      const pool = Object.fromEntries(spec.structs.PoolInfo.map((f, i) => [f.name, values[i]])) as Record<string, unknown>
      if (pool.paused || pool.closed) continue
      const pair: [bigint, bigint] = [BigInt(pool.assetA as bigint), BigInt(pool.assetB as bigint)]
      pair.forEach((a) => assets.add(a))
      edges.push({ venue: VENUE_PLUGIN_DEX, app: this.config.vaultAppId, pool: id, escrow: BigInt(pool.escrow as bigint), assets: pair, key: `pd:${id}` })
    }
    if (this.config.tinymanAppId !== 0n) {
      const list = [...assets].sort((a, b) => (a < b ? -1 : 1))
      const tm = { algorand: this.algorand, appId: this.config.tinymanAppId, appAddress: '', admin: '' }
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const pool = deriveTinymanPool(this.config.tinymanAppId, list[i], list[j])
          const tinyman = await readPoolState(tm, pool.address)
          if (!tinyman || tinyman.issued === 0n) continue
          edges.push({ venue: VENUE_TINYMAN, app: this.config.tinymanAppId, pool: 0n, escrow: 0n, assets: [list[i], list[j]], key: `tm:${pool.address}`, tinyman })
        }
      }
    }
    return edges
  }

  /** Output of one hop for `amountIn`; 0 when the venue cannot fill it */
  async quoteHop(edge: Edge, assetIn: bigint, amountIn: bigint): Promise<bigint> {
    if (amountIn <= 0n) return 0n
    if (edge.venue === VENUE_TINYMAN) return tinymanFixedInputOut(edge.tinyman, assetIn, amountIn)
    const client = this.algorand.client.getAppClientById({ appSpec: vaultSpec(), appId: this.config.vaultAppId, defaultSender: this.config.relay.addr })
    const result = await client.send.call({
      method: 'tryQuoteRoute',
      args: [[edge.pool], assetIn, amountIn, this.routerAddress, new Uint8Array(), 0n],
      coverAppCallInnerTransactionFees: true,
      maxFee: microAlgo(200_000),
      populateAppCallResources: true,
    })
    return result.return as bigint
  }

  /** Chain the hops of one path; 0 when any hop cannot fill */
  async quotePath(path: Hop[], edges: Map<string, Edge>, amountIn: bigint): Promise<bigint> {
    let amount = amountIn
    for (const hop of path) {
      amount = await this.quoteHop(edges.get(hop.key)!, hop.assetIn, amount)
      if (amount === 0n) return 0n
    }
    return amount
  }

  /** Best fixed-input route: the best single path, or a two-leg split over pool-disjoint paths when it pays more */
  async route(assetIn: bigint, assetOut: bigint, amountIn: bigint, maxDepth = MAX_HOPS): Promise<MockRoute | undefined> {
    if (assetIn === assetOut || amountIn <= 0n) return undefined
    const edges = await this.venues()
    const byKey = new Map(edges.map((e) => [e.key, e]))
    const paths: Hop[][] = []
    const walk = (asset: bigint, hops: Hop[], seen: Set<bigint>) => {
      if (asset === assetOut) return void paths.push(hops)
      if (hops.length >= Math.min(maxDepth, MAX_HOPS)) return
      for (const e of edges) {
        if (!e.assets.includes(asset) || hops.some((h) => h.key === e.key)) continue
        const next = e.assets[0] === asset ? e.assets[1] : e.assets[0]
        if (seen.has(next)) continue
        const hop: Hop = { venue: e.venue, app: e.app, pool: e.pool, escrow: e.escrow, key: e.key, assetIn: asset, assetOut: next }
        walk(next, [...hops, hop], new Set([...seen, next]))
      }
    }
    walk(assetIn, [], new Set([assetIn]))

    const scored = (await Promise.all(paths.map(async (p) => ({ path: p, out: await this.quotePath(p, byKey, amountIn) }))))
      .filter((s) => s.out > 0n)
      .sort((a, b) => (b.out > a.out ? 1 : b.out < a.out ? -1 : a.path.length - b.path.length))
    if (scored.length === 0) return undefined

    let best: MockRoute = { assetIn, assetOut, amountIn, amountOut: scored[0].out, legs: [{ amountIn, hops: scored[0].path, amountOut: scored[0].out }] }
    const top = scored.slice(0, MAX_PATHS_FOR_SPLIT)
    for (let i = 0; i < top.length; i++) {
      for (let j = i + 1; j < top.length; j++) {
        const a = top[i].path
        const b = top[j].path
        if (a.some((h) => b.some((k) => k.key === h.key))) continue
        for (const pct of SPLIT_STEPS) {
          const inA = (amountIn * pct) / 100n
          const inB = amountIn - inA
          const [outA, outB] = await Promise.all([this.quotePath(a, byKey, inA), this.quotePath(b, byKey, inB)])
          if (outA === 0n || outB === 0n || outA + outB <= best.amountOut) continue
          best = {
            assetIn,
            assetOut,
            amountIn,
            amountOut: outA + outB,
            legs: [
              { amountIn: inA, hops: a, amountOut: outA },
              { amountIn: inB, hops: b, amountOut: outB },
            ],
          }
        }
      }
    }
    return best
  }

  /**
   * The swap group in Haystack's `fetchExecuteSwapTxns` shape: [carriers…, input, route fee, finalize], output to
   * `address`. As in Haystack's MainNet routes, `address` sends the router the input and a small ALGO payment, both
   * unsigned (`signature: false`, the user signs them); the relay's txns carry its key as a `secret_key` signature,
   * which the SDK re-signs with after the caller regroups. Fees cover every inner transaction.
   */
  async executeTxns(route: MockRoute, address: string, minAmountOut: bigint, referrer: string): Promise<{ txns: SwapTxn[] }> {
    const relay = this.config.relay.addr.toString()
    this.algorand.setSigner(relay, algosdk.makeBasicAccountTransactionSigner(this.config.relay))
    const user = algosdk.makeEmptyTransactionSigner()
    const group = this.algorand.newGroup()
    // carrier 0 opts the router into the input asset; every carrier also holds references for the legs
    for (let i = 0; i < CARRIERS; i++) {
      const args = i === 0 && route.assetIn !== 0n ? ['opt_in', route.assetIn] : ['ref', BigInt(i)]
      group.addAppCall({ sender: relay, appId: this.config.routerAppId, args: [new TextEncoder().encode(args[0] as string), algosdk.encodeUint64(args[1] as bigint)] })
    }
    group.addTransaction(
      route.assetIn === 0n
        ? await this.algorand.createTransaction.payment({ sender: address, receiver: this.routerAddress, amount: microAlgo(route.amountIn) })
        : await this.algorand.createTransaction.assetTransfer({ sender: address, receiver: this.routerAddress, assetId: route.assetIn, amount: route.amountIn }),
      user,
    )
    group.addTransaction(await this.algorand.createTransaction.payment({ sender: address, receiver: this.routerAddress, amount: microAlgo(ROUTE_FEE) }), user)
    group.addAppCall({
      sender: relay,
      appId: this.config.routerAppId,
      args: finalizeArgs(route, minAmountOut),
      accountReferences: [address, referrer],
      assetReferences: route.assetOut === 0n ? [] : [route.assetOut],
      maxFee: microAlgo(500_000),
    })
    const { atc } = await group.build()
    const finalizeIndex = CARRIERS + 2
    const prepared = await prepareGroupForSending(
      atc,
      this.algorand.client.algod,
      { populateAppCallResources: true, coverAppCallInnerTransactionFees: true },
      { maxFees: new Map([...Array.from({ length: CARRIERS }, (_, i) => [i, microAlgo(10_000)] as const), [finalizeIndex, microAlgo(500_000)]]), suggestedParams: await this.algorand.getSuggestedParams() },
    )
    const txns = prepared.buildGroup().map(({ txn }) => ({
      data: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
      group: Buffer.from(txn.group ?? new Uint8Array()).toString('base64'),
      logicSigBlob: false as const,
      signature: txn.sender.toString() === address ? (false as const) : { type: 'secret_key' as const, value: Array.from(this.config.relay.sk) },
    }))
    return { txns }
  }
}

export type SwapTxn = {
  data: string
  group: string
  logicSigBlob: false
  signature: false | { type: 'secret_key'; value: number[] }
}

/** finalize args: the selector, the route at 1, and the positions our code reads at 2/4/6/8 (see the contract) */
export function finalizeArgs(route: MockRoute, minAmountOut: bigint): Uint8Array[] {
  const words: bigint[] = []
  for (const leg of route.legs) {
    words.push(leg.amountIn, BigInt(leg.hops.length))
    for (const h of leg.hops) words.push(h.venue, h.app, h.pool, h.escrow, h.assetOut)
  }
  const routeBytes = new Uint8Array(words.length * 8)
  words.forEach((w, i) => routeBytes.set(algosdk.encodeUint64(w), i * 8))
  return [
    FINALIZE_SELECTOR,
    routeBytes,
    algosdk.encodeUint64(0), // assets[0] = assetOut (an ALGO output has no asset reference; the index is unused)
    algosdk.encodeUint64(route.assetIn),
    algosdk.encodeUint64(minAmountOut),
    algosdk.encodeUint64(route.amountIn),
    algosdk.encodeUint64(1), // accounts[1] = beneficiary
    algosdk.encodeUint64(route.assetOut),
    algosdk.encodeUint64(2), // accounts[2] = referrer
  ]
}

/** `txnPayload`: Haystack's is encrypted; the mock's is the route in plain base64 JSON, marked by iv "mock" */
export function encodePayload(route: MockRoute, referrer: string): { iv: string; data: string } {
  const json = JSON.stringify({ route, referrer }, (_, v) => (typeof v === 'bigint' ? `${v}n` : v))
  return { iv: 'mock', data: Buffer.from(json).toString('base64') }
}

export function decodePayload(payload: { iv: string; data: string }): { route: MockRoute; referrer: string } {
  if (payload?.iv !== 'mock') throw new Error('not a mock Haystack payload')
  return JSON.parse(Buffer.from(payload.data, 'base64').toString(), (_, v) =>
    typeof v === 'string' && /^\d+n$/.test(v) ? BigInt(v.slice(0, -1)) : v,
  )
}

/** minAmountOut for a slippage in percent (the SDK's `slippage`), rounded down */
export function minOutForSlippage(quote: bigint, slippagePercent: number): bigint {
  const bps = BigInt(Math.round(slippagePercent * 100))
  return (quote * (10_000n - bps)) / 10_000n
}

type AssetInfo = { id: number; decimals: number; unit_name: string; name: string; price_algo: number; price_usd: number }

/** The `fetchQuote` response for a route (USD figures are 0: LocalNet has no prices) */
export async function quoteResponse(algorand: AlgorandClient, route: MockRoute, referrer: string, type: string) {
  const assetInfo = new Map<bigint, AssetInfo>()
  const info = async (id: bigint): Promise<AssetInfo> => {
    if (!assetInfo.has(id)) {
      if (id === 0n) assetInfo.set(id, { id: 0, decimals: 6, unit_name: 'ALGO', name: 'Algorand', price_algo: 1, price_usd: 0 })
      else {
        const a = await algorand.asset.getById(id)
        assetInfo.set(id, { id: Number(id), decimals: a.decimals, unit_name: a.unitName ?? '', name: a.assetName ?? '', price_algo: 0, price_usd: 0 })
      }
    }
    return assetInfo.get(id)!
  }
  const flattenedRoute: Record<string, number> = {}
  const routes = []
  for (const leg of route.legs) {
    const percentage = Number((leg.amountIn * 10_000n) / route.amountIn) / 100
    const pathOut = []
    for (const h of leg.hops) {
      const name = PROTOCOL_NAME[h.venue.toString()]
      pathOut.push({ name, class: [[name]], in: await info(h.assetIn), out: await info(h.assetOut) })
    }
    // the share of the input each protocol touches, counted once per leg
    for (const name of new Set(pathOut.map((p) => p.name))) flattenedRoute[name] = (flattenedRoute[name] ?? 0) + percentage
    routes.push({ percentage, path: pathOut })
  }
  return {
    quote: route.amountOut.toString(),
    profit: { amount: 0, asa: await info(route.assetOut) },
    priceBaseline: 0,
    usdIn: 0,
    usdOut: 0,
    route: routes,
    flattenedRoute,
    quotes: route.legs.map((leg) => ({ name: leg.hops.map((h) => PROTOCOL_NAME[h.venue.toString()]).join('>'), class: [], value: Number(leg.amountOut) })),
    requiredAppOptIns: [],
    txnPayload: encodePayload(route, referrer),
    protocolFees: {},
    fromASAID: Number(route.assetIn),
    toASAID: Number(route.assetOut),
    type,
    timing: { mock: true },
  }
}

/** Mock router app approval/clear programs, compiled by algod from the PuyaTs TEAL */
export async function compileRouter(algorand: AlgorandClient) {
  const dir = path.join(ARTIFACTS, 'mocks/haystack-router-localnet')
  const approval = await algorand.app.compileTeal(fs.readFileSync(path.join(dir, 'MockHaystackRouterLocalNet.approval.teal'), 'utf8'))
  const clear = await algorand.app.compileTeal(fs.readFileSync(path.join(dir, 'MockHaystackRouterLocalNet.clear.teal'), 'utf8'))
  return { approval: approval.compiledBase64ToBytes, clear: clear.compiledBase64ToBytes }
}
