import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer'
import { PluginDexClient } from '../../../artifacts/plugin-dex/PluginDexClient'
import { BinEngineClient, BinEngineFactory } from '../../../artifacts/plugin-dex/curves/bins/BinEngineClient'
import {
  BinsTradeHookClient,
  BinsTradeHookFactory,
} from '../../../artifacts/plugin-dex/curves/bins/tests/BinsTradeHookClient'
import { MockDexHookClient, MockDexHookFactory } from '../../../artifacts/plugin-dex/tests/MockDexHookClient'
import { RecordingDexHookFactory } from '../../../artifacts/plugin-dex/tests/RecordingDexHookClient'
import { expectContractError } from '../../../../tests/utils/errors'
import {
  addLiquidity,
  BoxRef,
  createPool,
  deployVault,
  emptyBoxRef,
  holding,
  HookInstall,
  hookInstall,
  poolConfig,
  readQuotaEmptyRefs,
  transferTxn,
} from '../../../../tests/fixtures/plugin-dex'
import {
  binSwapExactOut,
  BinEngineModel,
  BinPoolModel,
  BinPoolParams,
  BinsPerChunk,
  binValue,
  ceilDiv,
  ChunkBoxMbr,
  chunkBoxName,
  decodeHookState,
  DistEntry,
  encodeAddArgs,
  encodeInitArgs,
  encodeRemoveArgs,
  encodeStepTable,
  FS,
  fromBytes,
  IdCenter,
  MaxBinsPerSwapCap,
  MaxPoolFeeBps,
  MinBinSharesFloor,
  PoolBoxMbr,
  poolBoxName,
  positionBoxMbr,
  positionBoxName,
  priceOf,
  reportedShares,
  stepTable,
  TableBoxMbr,
  tableBoxName,
  toBytes,
  toPriceX64,
  WindowHalf,
} from '../../../../tests/models/bins-model'

/**
 * BinEngine e2e through the real PluginDex Vault (FINAL-SPEC §5 WP2 acceptance; research/bins.md §11 e2e
 * 1-15 plus the WP2 extra cases 16-21). Pools are created with `config.curve = engine`, liquidity goes
 * through `addLiquidityCurve` / `removeLiquidityCurve`, trades through `swap` / `swapRoute` / `quote` /
 * `tryQuoteRoute`, and custody deltas through `poke` (BinsTradeHook) and `sync`, so every curve call
 * carries the Vault's request fields and is checked by the Vault's §4.5 rules. Every operation is
 * replayed on the bigint model with the block's timestamp; the engine's boxes, the Vault's booking
 * (reserves, protocol fees, cached price) and the escrow's holdings must equal the model exactly.
 */

const LP_CURVE = 1n
const POINT = { beforeRemove: 8n, beforeSwap: 32n, afterSwap: 64n, quote: 128n, poke: 256n }
const PERM = { custody: 1n, dynamicFee: 2n, hookFee: 4n }
const MOCK = { keepRekey: 2n, rekeyElsewhere: 4n, setFee: 5n, hookFee: 6n }
const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const NO_DATA = new Uint8Array()
const MAX_FEE = microAlgo(3_000_000)

const send = { maxFee: MAX_FEE, coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

const u64 = (b: Uint8Array, off: number) => new DataView(b.buffer, b.byteOffset, b.byteLength).getBigUint64(off)
const u64be = (n: bigint) => toBytes(n, 8)
const concat = (...parts: Uint8Array[]) => new Uint8Array(parts.flatMap((p) => [...p]))
const vaultPoolBox = (poolId: bigint) => concat(new TextEncoder().encode('p'), u64be(poolId))

const defaults = (overrides: Partial<BinPoolParams> = {}): BinPoolParams => ({
  binStep: 25n,
  activeId: IdCenter + 16n,
  baseFactor: 10_000n,
  varFeeControl: 0n,
  filterPeriod: 30n,
  decayPeriod: 600n,
  reductionFactor: 5_000n,
  maxVa: 350_000n,
  // the engine floor (OPEN-DECISIONS #14): every new bin is worth ≥ 1 Y base unit
  minBinShares: MinBinSharesFloor,
  maxBinsPerSwap: 64n,
  ...overrides,
})

type Fees = { feeBps: bigint; maxFeeBps: bigint; custodyFeeBps: bigint }
const defaultFees: Fees = { feeBps: 25n, maxFeeBps: 1_000n, custodyFeeBps: 25n }

/** uniform split of a side across `n` entries (sums to ≤ 1e9) */
const spread = (deltas: bigint[], side: 'x' | 'y' | 'both'): DistEntry[] => {
  const n = BigInt(deltas.length)
  return deltas.map((delta) => ({
    delta,
    distX: side === 'y' ? 0n : FS / n,
    distY: side === 'x' ? 0n : FS / n,
  }))
}
const range = (from: bigint, to: bigint): bigint[] => {
  const out: bigint[] = []
  for (let d = from; d <= to; d++) out.push(d)
  return out
}
/** the Vault's native constant-product output (contract.algo.ts swapCore, no virtual/external) */
const cpOut = (amountIn: bigint, rIn: bigint, rOut: bigint, feeBps: bigint) => {
  const lpFee = (amountIn * feeBps) / 10_000n
  const eff = amountIn - lpFee
  return (eff * rOut) / (rIn + eff)
}

type G = TransactionComposer

describe('BinEngine (bins curve) through the PluginDex Vault', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let lp2: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let dex: PluginDexClient
  let engine: BinEngineClient
  let tradeHook: BinsTradeHookClient
  let X: bigint
  let Y: bigint
  const model = new BinEngineModel()
  let protocolFeeBps = 0n
  const fees = new Map<bigint, Fees>()
  /** expected Vault protocol fees per pool (Σ model protocol shares) */
  const protoFees = new Map<bigint, { a: bigint; b: bigint }>()
  const escrows = new Map<bigint, string>()

  const blockTime = async (round: bigint | undefined): Promise<bigint> =>
    (await algorand.client.algod.block(round!).do()).block.header.timestamp

  const engineBalance = async () => (await algorand.account.getInformation(engine.appAddress)).balance.microAlgo
  const engineMinBalance = async () => (await algorand.account.getInformation(engine.appAddress)).minBalance.microAlgo
  const algoBalance = async (who: TransactionSignerAccount) =>
    (await algorand.account.getInformation(who.addr)).balance.microAlgo

  const setProtocolFee = async (bps: bigint) => {
    await dex.send.setProtocolFee({ args: { protocolFeeBps: bps, treasury: admin.addr.toString() }, ...send })
    protocolFeeBps = bps
  }

  const feeContext = (poolId: bigint, now: bigint, feeBps?: bigint) => {
    const f = fees.get(poolId)!
    return { feeBps: feeBps ?? f.feeBps, maxFeeBps: f.maxFeeBps, protocolFeeBps, now }
  }

  // ----------------------------------------------------------------------------------------------
  // group building: engine.opUp() reference carriers first (the engine is below 8,192 B, so its calls
  // cost no read quota), then the Vault call(s); algokit populates whatever is still missing
  // ----------------------------------------------------------------------------------------------

  /** the engine boxes a pool's ops may touch: state, step table, every chunk the model knows */
  const engineBoxes = (poolId: bigint): Uint8Array[] => {
    if (!model.pools.has(poolId)) return []
    const pool = model.pool(poolId)
    return [
      poolBoxName(poolId),
      tableBoxName(pool.binStep),
      ...[...pool.chunks.keys()].map((c) => chunkBoxName(poolId, c)),
    ]
  }

  /**
   * `build` adds the Vault call(s) to a group that starts with engine.opUp() reference carriers (enough
   * for `poolIds`' engine boxes plus `extra`, at least `carriers`). `values` are the decoded returns of the
   * calls `build` added, in order (structs as tuples).
   */
  const sendWith = async (
    poolIds: bigint[],
    build: (g: G) => Promise<unknown>,
    opts: { extra?: Uint8Array[]; carriers?: number } = {},
  ) => {
    const names = [...poolIds.flatMap(engineBoxes), ...(opts.extra ?? [])]
    const n = Math.max(opts.carriers ?? 2, Math.ceil(names.length / 8))
    const g = algorand.newGroup()
    for (let i = 0; i < n; i++) {
      g.addAppCallMethodCall(
        await engine.params.opUp({
          sender: admin.addr,
          signer: admin.signer,
          args: [],
          note: `carrier ${i}`,
          boxReferences: names.slice(8 * i, 8 * i + 8).map((name) => ({ appId: engine.appId, name })),
          maxFee: MAX_FEE,
        }),
      )
    }
    await build(g)
    const res = await g.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
    return { ...res, values: (res.returns ?? []).slice(n).map((r) => r.returnValue as unknown) }
  }

  const escrowOf = (poolId: bigint) => escrows.get(poolId)!

  // ----------------------------------------------------------------------------------------------
  // operations through the Vault, each checked against the model
  // ----------------------------------------------------------------------------------------------

  const createBinPool = async (
    params: BinPoolParams,
    f: Fees = defaultFees,
    opts: { curveMbr?: bigint; hooks?: HookInstall[]; maxHookFeeBps?: bigint } = {},
  ) => {
    const curveMbr = opts.curveMbr ?? 1_000_000n
    // test (1) stores the binStep-25 table first; a filtered run stores it here (errBnSt tests use other steps)
    const hasTable = await algorand.app.getBoxValue(engine.appId, tableBoxName(25n)).then(
      () => true,
      () => false,
    )
    if (params.binStep === 25n && !hasTable) {
      await engine.send.initBinStep({
        args: {
          mbr: algorand.createTransaction.payment({
            sender: admin.addr,
            receiver: engine.appAddress,
            amount: microAlgo(1_000_000),
          }),
          binStep: 25n,
        },
        ...send,
      })
    }
    const next = (await dex.state.global.poolCursor())!
    const config = poolConfig(f.feeBps, {
      curve: engine.appId,
      maxFeeBps: f.maxFeeBps,
      custodyFeeBps: f.custodyFeeBps,
      maxHookFeeBps: opts.maxHookFeeBps ?? 0n,
      curveMbr,
      curveArgs: encodeInitArgs(params),
    })
    const res = await sendWith(
      [],
      async (g) =>
        g.addAppCallMethodCall(
          await dex.params.createPool({
            sender: admin.addr,
            signer: admin.signer,
            args: {
              payment: algorand.createTransaction.payment({
                sender: admin.addr,
                signer: admin.signer,
                receiver: dex.appAddress,
                amount: microAlgo(3_000_000n + curveMbr),
              }),
              assetA: X,
              assetB: Y,
              config,
              hooks: opts.hooks ?? [],
              externals: [],
            },
            maxFee: MAX_FEE,
          }),
        ),
      {
        extra: [poolBoxName(next), tableBoxName(params.binStep), chunkBoxName(next, params.activeId / BinsPerChunk)],
        carriers: 3,
      },
    )
    const poolId = res.values.at(-1) as bigint
    expect(poolId).toBe(next)
    model.init(poolId, params, await blockTime(res.confirmations.at(-1)!.confirmedRound), f.maxFeeBps)
    fees.set(poolId, f)
    protoFees.set(poolId, { a: 0n, b: 0n })
    const info = await dex.getPool({ args: { poolId } })
    escrows.set(poolId, getApplicationAddress(info.escrow).toString())
    return poolId
  }

  /** a Vault addLiquidityCurve call on `g`: deposits are always > 0 (the Vault requires it); unused parts are refunded */
  const addCall = async (
    g: G,
    poolId: bigint,
    who: TransactionSignerAccount,
    positionId: bigint,
    depX: bigint,
    depY: bigint,
    curveArgs: Uint8Array,
    mbr: bigint,
  ) =>
    g.addAppCallMethodCall(
      await dex.params.addLiquidityCurve({
        sender: who.addr,
        signer: who.signer,
        args: {
          mbr: algorand.createTransaction.payment({
            sender: who.addr,
            signer: who.signer,
            receiver: dex.appAddress,
            amount: microAlgo(mbr),
          }),
          depositA: transferTxn(algorand, who, escrowOf(poolId), X, depX),
          depositB: transferTxn(algorand, who, escrowOf(poolId), Y, depY),
          poolId,
          positionId,
          minShares: 0n,
          curveArgs,
          data: NO_DATA,
        },
        maxFee: MAX_FEE,
      }),
    )

  const tryAdd = (
    poolId: bigint,
    who: TransactionSignerAccount,
    positionId: bigint,
    depX: bigint,
    depY: bigint,
    curveArgs: Uint8Array,
    mbr = 3_000_000n,
  ) => {
    const extra = positionId !== 0n ? [positionBoxName(positionId)] : [positionBoxName(model.nextPositionId)]
    return sendWith([poolId], async (g) => addCall(g, poolId, who, positionId, depX, depY, curveArgs, mbr), { extra })
  }

  const add = async (
    poolId: bigint,
    who: TransactionSignerAccount,
    positionId: bigint,
    amountX: bigint,
    amountY: bigint,
    dist: DistEntry[],
    opts: { desired?: bigint; slippage?: bigint; mbr?: bigint; check?: boolean } = {},
  ) => {
    const depX = amountX > 0n ? amountX : 1n
    const depY = amountY > 0n ? amountY : 1n
    const desired = opts.desired ?? model.pool(poolId).activeId
    const beforeX = await holding(algorand, who.addr.toString(), X)
    const beforeY = await holding(algorand, who.addr.toString(), Y)
    const res = await tryAdd(
      poolId,
      who,
      positionId,
      depX,
      depY,
      encodeAddArgs(desired, opts.slippage ?? 0n, dist),
      opts.mbr,
    )
    const now = await blockTime(res.confirmations.at(-1)!.confirmedRound)
    const m = model.add(
      poolId,
      who.addr.toString(),
      positionId,
      depX,
      depY,
      desired,
      opts.slippage ?? 0n,
      dist,
      feeContext(poolId, now),
    )
    const [rPos, rShares, rA, rB] = res.values.at(-1) as bigint[]
    const r = { positionId: rPos, shares: rShares, amountA: rA, amountB: rB }
    expect([r.amountA, r.amountB, r.positionId, r.shares]).toEqual([m.usedX, m.usedY, m.positionId, m.shares])
    // the unused deposit came back from the escrow
    expect(beforeX - (await holding(algorand, who.addr.toString(), X))).toBe(m.usedX)
    expect(beforeY - (await holding(algorand, who.addr.toString(), Y))).toBe(m.usedY)
    if (opts.check !== false) await expectState(poolId)
    return { r, m }
  }

  const tryRemove = (
    poolId: bigint,
    who: TransactionSignerAccount,
    positionId: bigint,
    fromId: bigint,
    toId: bigint,
    frac = FS,
  ) =>
    sendWith(
      [poolId],
      async (g) =>
        g.addAppCallMethodCall(
          await dex.params.removeLiquidityCurve({
            sender: who.addr,
            signer: who.signer,
            args: {
              poolId,
              positionId,
              minAmountA: 0n,
              minAmountB: 0n,
              curveArgs: encodeRemoveArgs(fromId, toId, frac),
              data: NO_DATA,
            },
            maxFee: MAX_FEE,
          }),
        ),
      { extra: [positionBoxName(positionId)] },
    )

  const remove = async (
    poolId: bigint,
    who: TransactionSignerAccount,
    positionId: bigint,
    fromId: bigint,
    toId: bigint,
    frac = FS,
    check = true,
  ) => {
    const beforeX = await holding(algorand, who.addr.toString(), X)
    const beforeY = await holding(algorand, who.addr.toString(), Y)
    const res = await tryRemove(poolId, who, positionId, fromId, toId, frac)
    const m = model.remove(poolId, who.addr.toString(), positionId, fromId, toId, frac)
    const [rA, rB] = res.values.at(-1) as bigint[]
    const r = { amountA: rA, amountB: rB }
    expect([r.amountA, r.amountB]).toEqual([m.outX, m.outY])
    expect((await holding(algorand, who.addr.toString(), X)) - beforeX).toBe(m.outX)
    expect((await holding(algorand, who.addr.toString(), Y)) - beforeY).toBe(m.outY)
    if (check) await expectState(poolId)
    return r
  }

  const swapCall = async (
    g: G,
    poolId: bigint,
    xForY: boolean,
    amountIn: bigint,
    who: TransactionSignerAccount,
    note?: string,
  ) =>
    g.addAppCallMethodCall(
      await dex.params.swap({
        sender: who.addr,
        signer: who.signer,
        args: {
          input: algorand.createTransaction.assetTransfer({
            sender: who.addr,
            signer: who.signer,
            receiver: escrowOf(poolId),
            assetId: xForY ? X : Y,
            amount: amountIn,
            note,
          }),
          poolId,
          minAmountOut: 0n,
          recipient: ZERO,
          data: NO_DATA,
          wallet: 0n,
        },
        maxFee: MAX_FEE,
        note,
      }),
    )

  const quoteCall = async (g: G, poolId: bigint, xForY: boolean, amountIn: bigint, note?: string) =>
    g.addAppCallMethodCall(
      await dex.params.quote({
        sender: admin.addr,
        signer: admin.signer,
        args: { poolId, assetIn: xForY ? X : Y, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n },
        maxFee: MAX_FEE,
        note,
      }),
    )

  const bookProtocolFee = (poolId: bigint, xForY: boolean, fee: bigint) => {
    const p = protoFees.get(poolId)!
    if (xForY) p.a += fee
    else p.b += fee
  }

  /**
   * One Vault swap (optionally grouped with a Vault quote of the same trade, same round). `feeBps` is
   * the running fee the hooks leave (DynamicFee); `hookFee` the input taken by HookFee hooks.
   */
  const swap = async (
    poolId: bigint,
    xForY: boolean,
    amountIn: bigint,
    opts: { feeBps?: bigint; hookFee?: bigint; quote?: boolean; who?: TransactionSignerAccount; check?: boolean } = {},
  ) => {
    const who = opts.who ?? trader
    const outAsset = xForY ? Y : X
    const before = await holding(algorand, who.addr.toString(), outAsset)
    const res = await sendWith([poolId], async (g) => {
      if (opts.quote) await quoteCall(g, poolId, xForY, amountIn)
      await swapCall(g, poolId, xForY, amountIn, who)
    })
    const now = await blockTime(res.confirmations.at(-1)!.confirmedRound)
    const m = model
      .pool(poolId)
      .swap(xForY, amountIn - (opts.hookFee ?? 0n), feeContext(poolId, now, opts.feeBps), true)
    expect(m.filled).toBe(true)
    const out = res.values.at(-1) as bigint
    expect(out).toBe(m.amountOut)
    if (opts.quote) expect(res.values.at(-2)).toBe(out)
    expect((await holding(algorand, who.addr.toString(), outAsset)) - before).toBe(out)
    bookProtocolFee(poolId, xForY, m.protocolFee)
    if (opts.check !== false) await expectState(poolId)
    return { out, m }
  }

  const tryQuote = async (poolId: bigint, xForY: boolean, amountIn: bigint) =>
    (
      await dex.send.tryQuoteRoute({
        args: { route: [poolId], assetIn: xForY ? X : Y, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n },
        ...send,
      })
    ).return!

  /** configure BinsTradeHook for a signed delta (dX, dY) on the escrow; `poke` books it through the custody guard */
  const configureTrade = (dX: bigint, negX: boolean, dY: bigint, negY: boolean) =>
    tradeHook.send.configure({
      args: {
        assetA: X,
        assetB: Y,
        giveA: negX ? 0n : dX,
        giveB: negY ? 0n : dY,
        takeA: negX ? dX : 0n,
        takeB: negY ? dY : 0n,
      },
      ...send,
    })

  const poke = (poolId: bigint, hookIndex = 0n) =>
    sendWith([poolId], async (g) =>
      g.addAppCallMethodCall(
        await dex.params.poke({
          sender: admin.addr,
          signer: admin.signer,
          args: { poolId, hookIndex, data: NO_DATA },
          maxFee: MAX_FEE,
        }),
      ),
    )

  const custody = async (poolId: bigint, dX: bigint, negX: boolean, dY: bigint, negY: boolean, check = true) => {
    await configureTrade(dX, negX, dY, negY)
    await poke(poolId)
    const f = fees.get(poolId)!
    const m = model.pool(poolId).settle(dX, negX, dY, negY, f.custodyFeeBps, f.maxFeeBps)
    if (check) await expectState(poolId)
    return m
  }

  const custodyFails = async (poolId: bigint, dX: bigint, negX: boolean, dY: bigint, negY: boolean, code: string) => {
    await configureTrade(dX, negX, dY, negY)
    await expectContractError(poke(poolId), code)
  }

  /**
   * chain == model: engine header, every chunk record, occupancy and bitmap bits, positions (Σ shares
   * per bin == supply); Vault booking == engine totals; Vault protocol fees and cached price; escrow
   * holdings == reserves + protocol fees (FINAL-SPEC §4.12 (14) with no externals or locked funds).
   */
  const expectState = async (poolId: bigint, opts: { positions?: boolean } = {}) => {
    const pool = model.pool(poolId)
    const chunkIds = [...pool.chunks.keys()]
    const [head, info, holdX, holdY, ...chunkBoxes] = await Promise.all([
      algorand.app.getBoxValue(engine.appId, poolBoxName(poolId)),
      dex.getPool({ args: { poolId } }),
      holding(algorand, escrowOf(poolId), X),
      holding(algorand, escrowOf(poolId), Y),
      ...chunkIds.map((c) => algorand.app.getBoxValue(engine.appId, chunkBoxName(poolId, c))),
    ])
    expect({
      activeId: u64(head, 8),
      va: u64(head, 72),
      vr: u64(head, 80),
      idRef: u64(head, 88),
      tLast: u64(head, 96),
      totalX: u64(head, 104),
      totalY: u64(head, 112),
    }).toEqual({
      activeId: pool.activeId,
      va: pool.va,
      vr: pool.vr,
      idRef: pool.idRef,
      tLast: pool.tLast,
      totalX: pool.totalX,
      totalY: pool.totalY,
    })

    // bins, occupancy and bitmap; Σ bins == totals
    const words = Array.from({ length: 32 }, () => 0n)
    let sumX = 0n
    let sumY = 0n
    chunkIds.forEach((chunk, i) => {
      const b = chunkBoxes[i] as Uint8Array
      expect(fromBytes(b.slice(0, 32))).toBe(pool.chunks.get(chunk))
      let occ = 0n
      for (let j = 0n; j < BinsPerChunk; j++) {
        const off = 72 + 32 * Number(j)
        const bin = pool.bin(chunk * BinsPerChunk + j)
        expect({ x: u64(b, off), y: u64(b, off + 8), supply: fromBytes(b.slice(off + 16, off + 32)) }).toEqual(bin)
        if (bin.supply > 0n) occ |= 1n << j
        sumX += bin.x
        sumY += bin.y
      }
      expect(u64(b, 32)).toBe(occ)
      if (occ !== 0n) {
        const wc = chunk - pool.minId / BinsPerChunk
        words[Number(wc >> 6n)] |= 1n << (wc & 63n)
      }
    })
    expect([sumX, sumY]).toEqual([pool.totalX, pool.totalY])
    expect(Array.from({ length: 32 }, (_, w) => u64(head, 144 + 8 * w))).toEqual(words)
    expect(u64(head, 136)).toBe(words.reduce((s, w, i) => (w !== 0n ? s | (1n << BigInt(i)) : s), 0n))

    // the Vault: booking == engine totals, protocol fees, cached spot; escrow identity
    const p = protoFees.get(poolId)!
    expect([info.reserveA, info.reserveB, info.protocolFeesA, info.protocolFeesB]).toEqual([
      pool.totalX,
      pool.totalY,
      p.a,
      p.b,
    ])
    expect([holdX, holdY]).toEqual([info.reserveA + info.protocolFeesA, info.reserveB + info.protocolFeesB])
    const snap = pool.snapshot()
    expect(info.activeId).toBe(snap.activeId)
    expect(fromBytes(info.priceX64)).toBe(snap.priceX64)

    if (opts.positions === false) return
    const mine = [...model.positions].filter(([, pos]) => pos.poolId === poolId)
    const boxes = await Promise.all(mine.map(([id]) => algorand.app.getBoxValue(engine.appId, positionBoxName(id))))
    const perBin = new Map<bigint, bigint>()
    mine.forEach(([, pos], i) => {
      const b = boxes[i]
      expect(u64(b, 40)).toBe(pos.lowerId)
      expect(u64(b, 48)).toBe(pos.width)
      pos.shares.forEach((s, k) => {
        expect(fromBytes(b.slice(56 + 16 * k, 72 + 16 * k))).toBe(s)
        const bin = pos.lowerId + BigInt(k)
        perBin.set(bin, (perBin.get(bin) ?? 0n) + s)
      })
    })
    for (const [id, bin] of pool.bins) expect(perBin.get(id) ?? 0n).toBe(bin.supply)
  }

  const deployMockHook = async (perms: bigint): Promise<MockDexHookClient> => {
    const hook = (
      await algorand.client
        .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await hook.appClient.fundAppAccount({ amount: (1).algo() })
    await hook.send.optIn({ args: { asset: X }, ...send })
    await hook.send.optIn({ args: { asset: Y }, ...send })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms }, ...send })
    return hook
  }

  const tradeInstall = () => hookInstall({ app: tradeHook.appId, points: POINT.poke, perms: PERM.custody })

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (2_000).algo())
    lp2 = await localnet.context.generateAccount({ initialFunds: (100).algo() })
    trader = await localnet.context.generateAccount({ initialFunds: (300).algo() })

    // X < Y (X is created first): asset A = X, asset B = Y
    const mint = async (name: string) =>
      (
        await algorand.send.assetCreate({
          sender: admin.addr,
          signer: admin.signer,
          total: 2n ** 64n - 1n,
          decimals: 0,
          assetName: name,
          unitName: name,
        })
      ).assetId
    X = await mint('BINX')
    Y = await mint('BINY')
    for (const who of [lp2, trader]) {
      for (const asset of [X, Y]) {
        await algorand.send.assetOptIn({ sender: who.addr, signer: who.signer, assetId: asset })
        await algorand.send.assetTransfer({
          sender: admin.addr,
          signer: admin.signer,
          receiver: who.addr,
          assetId: asset,
          amount: 10n ** 13n,
        })
      }
    }

    dex = await deployVault({ algorand, sender: admin, funding: 2_000_000n })
    engine = (
      await algorand.client
        .getTypedAppFactory(BinEngineFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { vault: dex.appId }, extraProgramPages: 3 })
    ).appClient
    await engine.appClient.fundAppAccount({ amount: (0.2).algo() })
    await dex.send.setCurveApproval({ args: { curve: engine.appId, lpMode: LP_CURVE, approved: true }, ...send })

    // the custody counterparty: holds X and Y, trades with the escrow while it is rekeyed to it
    tradeHook = (
      await algorand.client
        .getTypedAppFactory(BinsTradeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await tradeHook.appClient.fundAppAccount({ amount: (1).algo() })
    for (const asset of [X, Y]) {
      await tradeHook.send.optIn({ args: { asset }, ...send })
      await algorand.send.assetTransfer({
        sender: admin.addr,
        signer: admin.signer,
        receiver: tradeHook.appAddress,
        assetId: asset,
        amount: 10n ** 13n,
      })
    }
    await dex.send.setHookApproval({ args: { hook: tradeHook.appId, perms: PERM.custody }, ...send })
  })

  // ------------------------------------------------------------------------------------------------
  describe('setup (bins.md §11 e2e 1-2)', () => {
    test('(1) initBinStep stores the model table, keeps exactly its MBR, and is idempotent', async () => {
      const before = await engineBalance()
      const minBefore = await engineMinBalance()
      await engine.send.initBinStep({
        args: {
          mbr: algorand.createTransaction.payment({
            sender: admin.addr,
            receiver: engine.appAddress,
            amount: microAlgo(1_000_000),
          }),
          binStep: 25n,
        },
        ...send,
      })
      const table = await algorand.app.getBoxValue(engine.appId, tableBoxName(25n))
      expect(Buffer.from(table).equals(Buffer.from(encodeStepTable(stepTable(25n))))).toBe(true)
      expect((await engineMinBalance()) - minBefore).toBe(TableBoxMbr)
      expect((await engineBalance()) - before).toBe(TableBoxMbr)

      // second call: nothing stored, the whole payment refunded
      const again = await engineBalance()
      await engine.send.initBinStep({
        args: {
          mbr: algorand.createTransaction.payment({
            sender: admin.addr,
            receiver: engine.appAddress,
            amount: microAlgo(500_000),
          }),
          binStep: 25n,
        },
        ...send,
      })
      expect(await engineBalance()).toBe(again)
      // out-of-range binStep
      await expectContractError(
        engine.send.initBinStep({
          args: {
            mbr: algorand.createTransaction.payment({
              sender: admin.addr,
              receiver: engine.appAddress,
              amount: microAlgo(1),
            }),
            binStep: 201n,
          },
          ...send,
        }),
        'errBnAr',
      )
    })

    test('(2) createPool: the engine creates pool state and the active chunk, keeps the measured MBR, refunds the rest; pairPools lists it', async () => {
      const before = await engineBalance()
      const poolId = await createBinPool(defaults())
      expect((await engineBalance()) - before).toBe(PoolBoxMbr + ChunkBoxMbr)
      const head = await algorand.app.getBoxValue(engine.appId, poolBoxName(poolId))
      expect(u64(head, 0)).toBe(25n)
      expect(u64(head, 16)).toBe(((IdCenter + 16n - WindowHalf) / 32n) * 32n)
      const chunk = await algorand.app.getBoxValue(engine.appId, chunkBoxName(poolId, (IdCenter + 16n) / 32n))
      // the chunk rent payer is the pool creator (req.owner = the Vault's Txn.sender)
      expect(Buffer.from(chunk.slice(40, 72)).equals(Buffer.from(admin.addr.publicKey))).toBe(true)
      await expectState(poolId)
      const info = await dex.getPool({ args: { poolId } })
      expect([info.curve, info.lpMode, info.lpAsset, info.lpSupply]).toEqual([engine.appId, LP_CURVE, 0n, 0n])
      // the Vault caches the active bin's canonical price
      expect(fromBytes(info.priceX64)).toBe(toPriceX64(priceOf(stepTable(25n), IdCenter + 16n)))
      expect(await dex.getPairPools({ args: { assetA: X, assetB: Y } })).toContain(poolId)
    })

    test('(2) createPool rejects a missing step table, an out-of-range price, bad parameters and an MBR underpayment', async () => {
      await expectContractError(createBinPool(defaults({ binStep: 7n })), 'errBnSt')
      // s = 25 reaches 2^64 at |e| ≈ 17,767
      await expectContractError(createBinPool(defaults({ activeId: IdCenter + 20_000n })), 'errBnRg')
      await expectContractError(createBinPool(defaults({ reductionFactor: 10_001n })), 'errBnAr')
      await expectContractError(createBinPool(defaults({ maxBinsPerSwap: 0n })), 'errBnAr')
      await expectContractError(createBinPool(defaults(), defaultFees, { curveMbr: 100_000n }), 'errBnMb')
    })

    test('OPEN-DECISIONS #13: Init rejects maxFeeBps above the engine cap (1,000 bps, errBnFc); 1,000 passes', async () => {
      expect(MaxPoolFeeBps).toBe(1_000n)
      // a declared cap the engine would silently charge at 10% (DynamicFee, custodyFeeBps) is refused
      await expectContractError(createBinPool(defaults(), { feeBps: 25n, maxFeeBps: 1_001n, custodyFeeBps: 25n }), 'errBnFc')
      await expectContractError(createBinPool(defaults(), { feeBps: 25n, maxFeeBps: 9_000n, custodyFeeBps: 1_001n }), 'errBnFc')
      const p = await createBinPool(defaults(), { feeBps: 25n, maxFeeBps: 1_000n, custodyFeeBps: 1_000n })
      await expectState(p)
    })

    test('OPEN-DECISIONS #14: Init rejects minBinShares below 2^32 (errBnMs); a dust add below the floor is rejected', async () => {
      expect(MinBinSharesFloor).toBe(1n << 32n)
      await expectContractError(createBinPool(defaults({ minBinShares: 0n })), 'errBnMs')
      await expectContractError(createBinPool(defaults({ minBinShares: MinBinSharesFloor - 1n })), 'errBnMs')
      // the exact floor passes; below price 1 one X base unit is worth < 1 Y unit (shares < 2^32)
      const active = IdCenter - 16n
      const p = await createBinPool(defaults({ activeId: active }))
      expect(model.pool(p).price(active + 1n) < 1n << 128n).toBe(true)
      await expectContractError(
        tryAdd(p, admin, 0n, 1n, 1n, encodeAddArgs(active, 0n, [{ delta: 1n, distX: FS, distY: 0n }]), 1_000_000n),
        'errBnZs',
      )
      // two X units clear the floor; the dust attempt left no bin behind
      const ok = await add(p, admin, 0n, 2n, 0n, [{ delta: 1n, distX: FS, distY: 0n }])
      expect(ok.m.perBin[0].shares >= MinBinSharesFloor).toBe(true)
      await expectState(p)
    })

    test('OPEN-DECISIONS #14 (verifier bypass): a partial remove sweeps a sub-floor remainder; a sub-floor co-add is rejected', async () => {
      // floor = 1e6 Y units per position-bin (shares = value · 2^32)
      const floor = 1_000_000n
      const p = await createBinPool(defaults({ minBinShares: floor << 32n }))
      const pool = model.pool(p)
      const id = pool.activeId - 1n
      const yOnly = [{ delta: -1n, distX: 0n, distY: FS }]

      // the bypass: add at the floor, then remove all but one ppb. The remainder is swept, so no dust bin is left
      const a1 = await add(p, admin, 0n, 0n, floor, yOnly)
      expect(a1.m.perBin[0].shares).toBe(floor << 32n)
      const r1 = await remove(p, admin, a1.r.positionId, id, id, FS - 1n)
      expect(r1.amountB).toBe(floor)
      expect(pool.bin(id).supply).toBe(0n)
      expect(pool.occupied()).not.toContain(id)

      // the co-add bypass: a second position cannot hold a sub-floor stake in an occupied bin...
      const a2 = await add(p, admin, 0n, 0n, 3n * floor, yOnly)
      await expectContractError(
        tryAdd(p, admin, 0n, 1n, 1n, encodeAddArgs(pool.activeId, 0n, yOnly)),
        'errBnZs',
      )
      // ...nor top a sub-floor amount into it, while a floor-sized co-add passes
      await expectContractError(
        tryAdd(p, admin, 0n, 1n, floor - 1n, encodeAddArgs(pool.activeId, 0n, yOnly)),
        'errBnZs',
      )
      const a3 = await add(p, admin, 0n, 0n, floor, yOnly)
      // a remainder at or above the floor stays (a plain partial remove), a smaller one is swept
      expect((await remove(p, admin, a2.r.positionId, id, id, FS / 2n)).amountB).toBe((3n * floor) / 2n)
      expect((await remove(p, admin, a2.r.positionId, id, id, FS / 2n)).amountB).toBe((3n * floor) / 2n)
      expect(model.positions.get(a2.r.positionId)!.shares[0]).toBe(0n)
      // the floor-sized co-LP still exits in full (100% is always allowed)
      await remove(p, admin, a3.r.positionId, id, id, FS)
      expect(pool.bin(id).supply).toBe(0n)
      await expectState(p)
    })

    test('mutating ops are Vault-only; Quote is open', async () => {
      const poolId = await createBinPool(defaults())
      const req = {
        op: 2n,
        poolId,
        owner: admin.addr.toString(),
        positionId: 0n,
        inIsA: true,
        negA: false,
        negB: false,
        amountIn: 1n,
        amountA: 0n,
        amountB: 0n,
        lpAmount: 0n,
        lpSupply: 0n,
        feeBps: 25n,
        maxFeeBps: 1000n,
        protocolFeeBps: 0n,
        reserveA: 0n,
        reserveB: 0n,
        args: new Uint8Array(),
      }
      await expectContractError(engine.send.akitaDexCurve({ args: { req }, ...send }), 'errCurveCaller')
      await expectContractError(
        engine.send.akitaDexCurve({ args: { req: { ...req, op: 6n } }, ...send }),
        'errCurveCaller',
      )
      const quote = await engine.send.akitaDexCurve({ args: { req: { ...req, op: 3n } }, ...send })
      expect(quote.return!.amountOut).toBe(0n)
    })
  })

  // ------------------------------------------------------------------------------------------------
  describe('swaps (bins.md §11 e2e 3-6, 13; WP2 (17))', () => {
    let poolId: bigint
    const active = IdCenter + 16n

    beforeAll(async () => {
      poolId = await createBinPool(defaults())
      // active bin both sides, Y in 3 bins below, X in 3 bins above
      await add(poolId, admin, 0n, 3_000_000n, 3_000_000n, [
        { delta: -3n, distX: 0n, distY: 250_000_000n },
        { delta: -2n, distX: 0n, distY: 250_000_000n },
        { delta: -1n, distX: 0n, distY: 250_000_000n },
        { delta: 0n, distX: 250_000_000n, distY: 250_000_000n },
        { delta: 1n, distX: 250_000_000n, distY: 0n },
        { delta: 2n, distX: 250_000_000n, distY: 0n },
        { delta: 3n, distX: 250_000_000n, distY: 0n },
      ])
    })

    test('(3) a swap inside the active bin matches the model; the fee compounds; the protocol share stays out of reserves', async () => {
      await setProtocolFee(1_000n)
      const { m } = await swap(poolId, true, 10_000n, { quote: true })
      expect(m.endId).toBe(active)
      expect(m.protocolFee).toBeGreaterThan(0n)
      const info = await dex.getPool({ args: { poolId } })
      expect(info.protocolFeesA).toBe(m.protocolFee)
      // fee compounds into the bin: the active bin holds its X plus the input net of the protocol share
      expect(model.pool(poolId).bin(active).x).toBe(750_000n + 10_000n - m.protocolFee)
      await setProtocolFee(0n)
    })

    test('(13) N swaps in one group equal one swap within N·2 units (split equivalence)', async () => {
      const a = await createBinPool(defaults())
      const b = await createBinPool(defaults())
      const dist = spread(range(-40n, 0n), 'y')
      await add(a, admin, 0n, 0n, 41_000_000n, dist)
      await add(b, admin, 0n, 0n, 41_000_000n, dist)
      const total = 12_345_678n
      const parts = [total / 4n, total / 4n, total / 4n, total - (3n * total) / 4n]
      const res = await sendWith([a, b], async (g) => {
        await swapCall(g, a, true, total, trader, 'one')
        for (const [i, amt] of parts.entries()) await swapCall(g, b, true, amt, trader, `split ${i}`)
      })
      const now = await blockTime(res.confirmations.at(-1)!.confirmedRound)
      const one = model.pool(a).swap(true, total, feeContext(a, now), true)
      expect(res.values[0]).toBe(one.amountOut)
      let split = 0n
      parts.forEach((amt, i) => {
        const m = model.pool(b).swap(true, amt, feeContext(b, now), true)
        expect(res.values[i + 1]).toBe(m.amountOut)
        split += m.amountOut
      })
      expect(one.crossed).toBeGreaterThan(5n)
      const diff = one.amountOut > split ? one.amountOut - split : split - one.amountOut
      expect(diff <= 8n).toBe(true)
      await expectState(a)
      await expectState(b)
    })

    test('(4) a swap crossing many bins and several chunks skips empty bins and an empty chunk', async () => {
      const p = await createBinPool(defaults())
      // Y: two bins in the active chunk, one bin two chunks down (the chunk between stays empty), a
      // dense run further down; X: one bin one chunk up and one three chunks up
      await add(p, admin, 0n, 0n, 4_000_000n, [
        { delta: -5n, distX: 0n, distY: 250_000_000n },
        { delta: -2n, distX: 0n, distY: 250_000_000n },
      ])
      await add(p, admin, 0n, 0n, 6_000_000n, spread([-75n, -74n, -73n], 'y'))
      await add(p, admin, 0n, 0n, 2_000_000n, spread([-130n, -129n], 'y'))
      await add(p, admin, 0n, 3_000_000n, 0n, spread([20n, 23n], 'x'))
      await add(p, admin, 0n, 3_000_000n, 0n, spread([90n], 'x'))
      // X→Y down through 5 bins and 3 chunks into the dense run
      const { m } = await swap(p, true, 8_500_000n)
      expect(m.endId <= active - 73n).toBe(true)
      expect(m.crossed).toBeGreaterThanOrEqual(4n)
      // Y→X back up: the traded bins hold X now; it walks up through them, the empty chunks, into the X bins
      const amt = 9_500_000n
      expect(model.pool(p).swap(false, amt, feeContext(p, 0n), false).filled).toBe(true)
      const back = await swap(p, false, amt, { quote: true })
      expect(back.m.endId).toBeGreaterThan(active)
    })

    test('(5)/(17) a full-fill swap reverts when liquidity runs out; quote reverts errPdil and tryQuoteRoute returns 0; MaxBinsPerSwap is enforced', async () => {
      const p = await createBinPool(defaults({ maxBinsPerSwap: 3n }))
      await add(p, admin, 0n, 0n, 5_000_000n, spread(range(-4n, 0n), 'y'))
      // more than all the Y
      await expectContractError(
        sendWith([p], async (g) => swapCall(g, p, true, 10_000_000n, trader)),
        'errBnLq',
      )
      await expectContractError(
        sendWith([p], async (g) => quoteCall(g, p, true, 10_000_000n)),
        'errPdil',
      )
      expect(await tryQuote(p, true, 10_000_000n)).toBe(0n)
      // 4 moves needed but only 3 allowed
      const four = model.pool(p).swap(true, 4_500_000n, feeContext(p, 0n), false)
      expect(four.filled).toBe(false)
      await expectContractError(
        sendWith([p], async (g) => swapCall(g, p, true, 4_500_000n, trader)),
        'errBnLq',
      )
      expect(await tryQuote(p, true, 4_500_000n)).toBe(0n)
      // 3 moves pass, and tryQuoteRoute quotes them exactly
      const three = model.pool(p).swap(true, 3_500_000n, feeContext(p, 0n), false)
      expect(await tryQuote(p, true, 3_500_000n)).toBe(three.amountOut)
      const { m } = await swap(p, true, 3_500_000n)
      expect(m.crossed).toBe(3n)
      // nothing left in the X direction from here on but the end bin; an X quote of the rest is 0
      expect(await tryQuote(p, true, 10_000_000n)).toBe(0n)
      await expectState(p)
    })

    test('(6) the variable fee grows per bin crossed, follows the filter and decay periods, and quote == swap within a round', async () => {
      // Path selection is made time-independent (LocalNet's dev-mode clock may not advance):
      // filter 3,600 s keeps the reference; filter 0 resets it every swap, with vr = va·R/1e4 while
      // inside the decay period (7,200 s) and vr = 0 past it (decay 0).
      const mk = async (filterPeriod: bigint, decayPeriod: bigint) => {
        const p = await createBinPool(
          defaults({ varFeeControl: 40_000n, filterPeriod, decayPeriod, reductionFactor: 5_000n }),
        )
        await add(p, admin, 0n, 0n, 30_000_000n, spread(range(-29n, 0n), 'y'))
        await add(p, admin, 0n, 30_000_000n, 0n, spread(range(1n, 30n), 'x'))
        return p
      }
      const start = IdCenter + 16n

      // filter not elapsed: quote and swap in one group (same round) are identical; va = |idRef − id|·1e4
      const a = await mk(3_600n, 7_200n)
      const { m } = await swap(a, true, 5_000_000n, { quote: true })
      expect(m.crossed).toBeGreaterThan(3n)
      expect(m.va).toBe(m.crossed * 10_000n)
      // the variable fee makes the swap pay more than the base fee
      expect(m.lpFee * 10_000n > 5_000_000n * 25n).toBe(true)
      const again = await swap(a, true, 500_000n, { quote: true })
      expect(model.pool(a).idRef).toBe(start)
      expect(again.m.va).toBe((start - again.m.endId) * 10_000n)

      // filter elapsed, inside decay: the reference moves to the active bin and vr = va·R/1e4
      const b = await mk(0n, 7_200n)
      const b1 = await swap(b, true, 5_000_000n)
      const b2 = await swap(b, true, 1_500_000n, { quote: true })
      expect(model.pool(b).idRef).toBe(b1.m.endId)
      expect(model.pool(b).vr).toBe((b1.m.va * 5_000n) / 10_000n)
      expect(b2.m.va).toBe(model.pool(b).vr + (b1.m.endId - b2.m.endId) * 10_000n)

      // past the decay period: vr = 0
      const c = await mk(0n, 0n)
      const c1 = await swap(c, true, 5_000_000n)
      const c2 = await swap(c, true, 1_500_000n)
      expect(model.pool(c).vr).toBe(0n)
      expect(c2.m.va).toBe((c1.m.endId - c2.m.endId) * 10_000n)
      // the same trade pays more after a volatile swap while the accumulator decays slowly
      expect(b2.m.lpFee).toBeGreaterThan(c2.m.lpFee)
    }, 240_000)
  })

  // ------------------------------------------------------------------------------------------------
  describe('hooks (bins.md §11 e2e 10)', () => {
    test('(10) a DynamicFee hook replaces the base fee, hook fees are capped by maxHookFeeBps, Quote hooks keep quote == swap, hooks see the bins snapshot', async () => {
      const feeHook = await deployMockHook(PERM.dynamicFee)
      const feeTaker = await deployMockHook(PERM.hookFee)
      const recorder = (
        await algorand.client
          .getTypedAppFactory(RecordingDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId } })
      ).appClient
      await recorder.appClient.fundAppAccount({ amount: (2).algo() })
      await dex.send.setHookApproval({ args: { hook: recorder.appId, perms: PERM.custody }, ...send })
      await feeHook.send.configure({ args: { mode: MOCK.setFee, value: 50n, value2: 0n, target: ZERO }, ...send })
      await feeTaker.send.configure({ args: { mode: MOCK.hookFee, value: 0n, value2: 0n, target: ZERO }, ...send })

      const p = await createBinPool(
        defaults({ varFeeControl: 4_000_000n }),
        { feeBps: 30n, maxFeeBps: 60n, custodyFeeBps: 30n },
        {
          maxHookFeeBps: 100n,
          hooks: [
            hookInstall({ app: feeHook.appId, points: POINT.beforeSwap | POINT.quote, perms: PERM.dynamicFee }),
            hookInstall({ app: feeTaker.appId, points: POINT.beforeSwap | POINT.quote, perms: PERM.hookFee }),
            hookInstall({ app: recorder.appId, points: POINT.afterSwap, perms: 0n }),
          ],
        },
      )
      await add(p, admin, 0n, 0n, 20_000_000n, spread(range(-19n, 0n), 'y'))

      // the running fee is the hook's 50 bps, not the pool's 30; quote (Quote hooks) == swap
      const { m } = await swap(p, true, 1_000_000n, { feeBps: 50n, quote: true })
      expect(m.lpFee).toBeGreaterThanOrEqual((1_000_000n * 50n) / 10_000n)
      // the AfterSwap hook saw the curve, the running fee, the engine's snapshot and its BinHookState
      const rec = (await recorder.send.record({ args: { point: POINT.afterSwap }, ...send })).return!
      expect([rec.ctx.curve, rec.ctx.feeBps, rec.ctx.amountIn, rec.ctx.amountOut]).toEqual([
        engine.appId,
        50n,
        1_000_000n,
        m.amountOut,
      ])
      expect(decodeHookState(rec.ctx.curveData)).toEqual({
        startId: m.startId,
        endId: m.endId,
        binsCrossed: m.crossed,
        va: m.va,
        binStep: 25n,
      })
      const snap = model.pool(p).snapshot()
      expect({ ...rec.ctx.after, priceX64: fromBytes(rec.ctx.after.priceX64) }).toEqual(snap)

      // the huge variable fee is capped per bin at min(10%, maxFeeBps), so the Vault's fee bound holds
      const big = await swap(p, true, 8_000_000n, { feeBps: 50n, quote: true })
      expect(big.m.crossed).toBeGreaterThan(3n)
      expect(big.m.lpFee <= (8_000_000n * 60n + 9_999n) / 10_000n).toBe(true)

      // a hook fee of exactly 1% passes: the curve prices the input net of it; the hook receives it in X
      await feeTaker.send.configure({ args: { mode: MOCK.hookFee, value: 10_000n, value2: 0n, target: ZERO }, ...send })
      const takerBefore = await holding(algorand, feeTaker.appAddress.toString(), X)
      await swap(p, true, 1_000_000n, { feeBps: 50n, hookFee: 10_000n, quote: true })
      expect((await holding(algorand, feeTaker.appAddress.toString(), X)) - takerBefore).toBe(10_000n)
      // one unit more is above maxHookFeeBps (100)
      await feeTaker.send.configure({ args: { mode: MOCK.hookFee, value: 10_001n, value2: 0n, target: ZERO }, ...send })
      await expectContractError(
        sendWith([p], async (g) => swapCall(g, p, true, 1_000_000n, trader)),
        'errPdhf',
      )
      await expectContractError(
        sendWith([p], async (g) => quoteCall(g, p, true, 1_000_000n)),
        'errPdhf',
      )
      await feeTaker.send.configure({ args: { mode: MOCK.hookFee, value: 0n, value2: 0n, target: ZERO }, ...send })
      // a DynamicFee above the pool's maxFeeBps is refused by the Vault before the curve call
      await feeHook.send.configure({ args: { mode: MOCK.setFee, value: 61n, value2: 0n, target: ZERO }, ...send })
      await expectContractError(
        sendWith([p], async (g) => swapCall(g, p, true, 1_000n, trader)),
        'errPdfe',
      )
      await expectState(p)
    }, 240_000)
  })

  // ------------------------------------------------------------------------------------------------
  describe('liquidity (bins.md §11 e2e 7-9)', () => {
    let poolId: bigint
    let first: bigint
    const active = IdCenter + 16n

    beforeAll(async () => {
      poolId = await createBinPool(defaults({ varFeeControl: 40_000n }))
    })

    test('(7) single-sided X above and Y below, both sides on the active bin; bits, shares and measured MBR', async () => {
      const before = await engineBalance()
      const adminBefore = await algoBalance(admin)
      const { m } = await add(poolId, admin, 0n, 4_000_000n, 4_000_000n, [
        { delta: -40n, distX: 0n, distY: 500_000_000n },
        { delta: 0n, distX: 500_000_000n, distY: 500_000_000n },
        { delta: 20n, distX: 500_000_000n, distY: 0n },
      ])
      first = m.positionId
      // two new chunks: −40 is one chunk down, +20 (j = 36) one chunk up
      expect(m.createdChunks.length).toBe(2)
      const mbr = 2n * ChunkBoxMbr + positionBoxMbr(61n)
      expect((await engineBalance()) - before).toBe(mbr)
      // the 3 ALGO forwarded by the Vault came back except the MBR (and fees)
      const spent = adminBefore - (await algoBalance(admin))
      expect(spent >= mbr && spent < mbr + 100_000n).toBe(true)
    })

    test('(7) composition rule, slippage, distribution sums and position range revert', async () => {
      const call = (
        dist: DistEntry[],
        x = 1_000_000n,
        y = 1_000_000n,
        desired = active,
        slippage = 0n,
        positionId = 0n,
      ) => tryAdd(poolId, admin, positionId, x, y, encodeAddArgs(desired, slippage, dist), 2_000_000n)
      await expectContractError(call([{ delta: -1n, distX: 1_000_000_000n, distY: 0n }]), 'errBnCo')
      await expectContractError(call([{ delta: 1n, distX: 0n, distY: 1_000_000_000n }]), 'errBnCo')
      await expectContractError(
        call([{ delta: 1n, distX: 1_000_000_000n, distY: 0n }], 1_000_000n, 1n, active + 2n, 1n),
        'errBnSl',
      )
      await expectContractError(
        call([
          { delta: 1n, distX: 600_000_000n, distY: 0n },
          { delta: 2n, distX: 600_000_000n, distY: 0n },
        ]),
        'errBnDi',
      )
      await expectContractError(
        call([
          { delta: 2n, distX: 1n, distY: 0n },
          { delta: 1n, distX: 1n, distY: 0n },
        ]),
        'errBnAr',
      )
      await expectContractError(
        call([
          { delta: 1n, distX: 1n, distY: 0n },
          { delta: 70n, distX: 1n, distY: 0n },
        ]),
        'errBnPo',
      )
      // an existing position only takes bins inside its range, and only from its owner (req.owner = Txn.sender)
      await expectContractError(
        call([{ delta: 50n, distX: 1_000_000_000n, distY: 0n }], 1_000_000n, 1n, active, 0n, first),
        'errBnPo',
      )
      await expectContractError(
        tryAdd(
          poolId,
          lp2,
          first,
          1_000n,
          1n,
          encodeAddArgs(active, 0n, [{ delta: 1n, distX: FS, distY: 0n }]),
          1_000_000n,
        ),
        'errBnOw',
      )
      // the Vault's own add checks: minShares (errPdsl) and the lpMode entrypoint (errPdlm)
      await expectContractError(
        sendWith([poolId], async (g) =>
          g.addAppCallMethodCall(
            await dex.params.addLiquidityCurve({
              sender: admin.addr,
              signer: admin.signer,
              args: {
                mbr: algorand.createTransaction.payment({
                  sender: admin.addr,
                  signer: admin.signer,
                  receiver: dex.appAddress,
                  amount: microAlgo(1_000_000),
                }),
                depositA: transferTxn(algorand, admin, escrowOf(poolId), X, 1_000n),
                depositB: transferTxn(algorand, admin, escrowOf(poolId), Y, 1_000n),
                poolId,
                positionId: first,
                minShares: 10n ** 12n,
                curveArgs: encodeAddArgs(active, 0n, [{ delta: 0n, distX: FS, distY: FS }]),
                data: NO_DATA,
              },
              maxFee: MAX_FEE,
            }),
          ),
        ),
        'errPdsl',
      )
      await expectContractError(addLiquidity(algorand, dex, admin, poolId, 1_000n, 1_000n), 'errPdlm')
      await expectState(poolId)
    })

    test('(7) an occupied bin takes only its own composition (no composition fee); the rest is refunded', async () => {
      const b = model.pool(poolId).bin(active)
      expect(b.x > 0n && b.y > 0n).toBe(true)
      // matched ratio: exactly pro-rata
      const matched = await add(poolId, lp2, 0n, b.x / 10n, b.y / 10n, [{ delta: 0n, distX: FS, distY: FS }])
      const sx = ((b.x / 10n) * b.supply) / b.x
      const sy = ((b.y / 10n) * b.supply) / b.y
      expect(matched.m.perBin[0].shares).toBe(sx < sy ? sx : sy)
      // Y-heavy into the mixed active bin: the shares follow the scarce X side, the extra Y is refunded
      const before = model.pool(poolId).bin(active)
      const skewed = await add(poolId, lp2, 0n, 1_000n, 1_000_000n, [{ delta: 0n, distX: FS, distY: FS }])
      const s = (1_000n * before.supply) / before.x
      expect(skewed.m.perBin[0].shares).toBe(s)
      expect(skewed.m.usedX).toBe(ceilDiv(s * before.x, before.supply))
      expect(skewed.m.usedY).toBe(ceilDiv(s * before.y, before.supply))
      expect(skewed.m.usedY).toBeLessThan(1_000_000n)
      // all-Y into a mixed active bin gets no shares
      await expectContractError(
        tryAdd(poolId, lp2, 0n, 1n, 1_000_000n, encodeAddArgs(active, 0n, [{ delta: 0n, distX: 0n, distY: FS }]), 1_000_000n),
        'errBnZs',
      )
      await expectState(poolId)
    })

    test('(7) review fix: add + 100% remove on the active bin in one group is not a fee-free swap (hooks, hook fees and protocol fee cannot be bypassed)', async () => {
      // the finding's pool: base fee 30 bps, a DynamicFee hook at 500 bps, a HookFee hook, protocol share 15%
      const fee = await deployMockHook(PERM.dynamicFee)
      await fee.send.configure({ args: { mode: MOCK.setFee, value: 500n, value2: 0n, target: ZERO }, ...send })
      const tax = await deployMockHook(PERM.hookFee)
      await tax.send.configure({ args: { mode: MOCK.hookFee, value: 10_000n, value2: 0n, target: ZERO }, ...send })
      const p = await createBinPool(
        defaults(),
        { feeBps: 30n, maxFeeBps: 1_000n, custodyFeeBps: 30n },
        {
          hooks: [
            hookInstall({ app: fee.appId, points: POINT.beforeSwap | POINT.quote, perms: PERM.dynamicFee }),
            hookInstall({ app: tax.appId, points: POINT.beforeSwap | POINT.quote, perms: PERM.hookFee }),
          ],
          maxHookFeeBps: 100n,
        },
      )
      await setProtocolFee(1_500n)
      try {
        // the active bin holds X only
        await add(p, admin, 0n, 10_000_000n, 0n, [{ delta: 0n, distX: FS, distY: 0n }])
        const a = model.pool(p).activeId
        const positionId = model.nextPositionId
        const dist = [{ delta: 0n, distX: FS, distY: FS }]
        const x0 = await holding(algorand, trader.addr.toString(), X)
        const y0 = await holding(algorand, trader.addr.toString(), Y)
        // one group: deposit 5,000,000 Y (and 1 X) into the active bin, then remove 100% of that position
        const res = await sendWith(
          [p],
          async (g) => {
            await addCall(g, p, trader, 0n, 1n, 5_000_000n, encodeAddArgs(a, 0n, dist), 3_000_000n)
            g.addAppCallMethodCall(
              await dex.params.removeLiquidityCurve({
                sender: trader.addr,
                signer: trader.signer,
                args: {
                  poolId: p,
                  positionId,
                  minAmountA: 0n,
                  minAmountB: 0n,
                  curveArgs: encodeRemoveArgs(a, a, FS),
                  data: NO_DATA,
                },
                maxFee: MAX_FEE,
              }),
            )
          },
          { extra: [positionBoxName(positionId)] },
        )
        const now = await blockTime(res.confirmations.at(-1)!.confirmedRound)
        const m = model.add(p, trader.addr.toString(), 0n, 1n, 5_000_000n, a, 0n, dist, feeContext(p, now))
        const out = model.remove(p, trader.addr.toString(), positionId, a, a, FS)
        const dX = (await holding(algorand, trader.addr.toString(), X)) - x0
        const dY = (await holding(algorand, trader.addr.toString(), Y)) - y0
        expect([dX, dY]).toEqual([out.outX - m.usedX, out.outY - m.usedY])
        // no Y was taken (the bin holds no Y), so no X was bought: nothing was traded around the swap path
        expect(m.usedY).toBe(0n)
        expect(dY).toBe(0n)
        expect(dX <= 0n).toBe(true)
        await expectState(p)
      } finally {
        await setProtocolFee(0n)
      }
    })

    test('(8) remove: pro-rata with fees, 100% leaves no dust, bits clear, owner-only, transfer, close', async () => {
      // trade through the position's bins so it earns fees
      await swap(poolId, true, 1_500_000n)
      await swap(poolId, false, 1_500_000n)
      // only the owner removes
      await expectContractError(tryRemove(poolId, lp2, first, 0n, 2n ** 32n), 'errBnOw')
      // half of everything, then transfer the position and let the new owner remove the rest
      await remove(poolId, admin, first, 0n, 2n ** 32n, FS / 2n)
      await engine.send.transferPosition({ args: { positionId: first, to: lp2.addr.toString() }, ...send })
      model.positions.get(first)!.owner = lp2.addr.toString()
      await expectContractError(tryRemove(poolId, admin, first, 0n, 2n ** 32n), 'errBnOw')
      const pos = model.positions.get(first)!
      await remove(poolId, lp2, first, pos.lowerId, pos.lowerId + pos.width - 1n)
      // the −40 bin had only this position: it is empty now, its chunk has no occupancy
      expect(model.pool(poolId).bin(active - 40n)).toEqual({ x: 0n, y: 0n, supply: 0n })
      // close the empty position and the empty chunk; MBR goes back to the payers
      const lp2Before = await algoBalance(lp2)
      await expectContractError(engine.send.closePosition({ args: { positionId: first }, ...send }), 'errBnOw')
      await engine.send.closePosition({
        sender: lp2.addr,
        signer: lp2.signer,
        args: { positionId: first },
        ...send,
        maxFee: microAlgo(10_000),
      })
      model.positions.delete(first)
      expect((await algoBalance(lp2)) - lp2Before).toBe(positionBoxMbr(61n) - 2_000n)
      const emptyChunk = (active - 40n) / 32n
      const adminBefore = await algoBalance(admin)
      await engine.send.closeChunk({
        sender: lp2.addr,
        signer: lp2.signer,
        args: { poolId, chunk: emptyChunk },
        ...send,
      })
      model.pool(poolId).chunks.delete(emptyChunk)
      expect((await algoBalance(admin)) - adminBefore).toBe(ChunkBoxMbr)
      await expectState(poolId)
      // the active chunk cannot be closed even when its bins are empty, nor can an occupied one
      await expectContractError(engine.send.closeChunk({ args: { poolId, chunk: active / 32n }, ...send }), 'errBnCk')
    })

    test('(9) sync books a direct transfer to the escrow into the active bin (Settle donation); an empty active bin refuses it', async () => {
      await algorand.send.assetTransfer({
        sender: admin.addr,
        signer: admin.signer,
        receiver: escrowOf(poolId),
        assetId: X,
        amount: 1_234n,
      })
      await algorand.send.assetTransfer({
        sender: admin.addr,
        signer: admin.signer,
        receiver: escrowOf(poolId),
        assetId: Y,
        amount: 77n,
      })
      await sendWith([poolId], async (g) =>
        g.addAppCallMethodCall(
          await dex.params.sync({ sender: admin.addr, signer: admin.signer, args: { poolId }, maxFee: MAX_FEE }),
        ),
      )
      model.pool(poolId).settle(1_234n, false, 77n, false, 25n, 1_000n)
      await expectState(poolId)

      const p = await createBinPool(defaults())
      await add(p, admin, 0n, 0n, 1_000_000n, [{ delta: -3n, distX: 0n, distY: FS }])
      await algorand.send.assetTransfer({
        sender: admin.addr,
        signer: admin.signer,
        receiver: escrowOf(p),
        assetId: Y,
        amount: 500n,
      })
      // the active bin is empty: the Y donation books into the nearest occupied bin below it
      await sendWith([p], async (g) =>
        g.addAppCallMethodCall(
          await dex.params.sync({ sender: admin.addr, signer: admin.signer, args: { poolId: p }, maxFee: MAX_FEE }),
        ),
      )
      model.pool(p).settle(0n, false, 500n, false, 25n, 1_000n)
      expect(model.pool(p).bin(IdCenter + 16n - 3n).y).toBe(1_000_500n)
      await expectState(p)
      // swaps and adds work as usual
      await swap(p, true, 10n)
      expect(model.pool(p).activeId).toBe(IdCenter + 16n - 3n)
      await add(p, lp2, 0n, 1_000n, 1_000n, [{ delta: 0n, distX: FS, distY: FS }])
    })

    test('(9) review fix: a 1-unit transfer while the active bin is empty blocks no remove, sync or add; X books into the nearest occupied bin above, Y below, else it stays in the active bin', async () => {
      const syncPool = async (poolId: bigint) =>
        sendWith([poolId], async (g) =>
          g.addAppCallMethodCall(
            await dex.params.sync({ sender: admin.addr, signer: admin.signer, args: { poolId }, maxFee: MAX_FEE }),
          ),
        )
      const p = await createBinPool(defaults())
      // single-sided X over +1..+10: the active bin has no supply
      const { r } = await add(p, admin, 0n, 1_000_000n, 0n, spread(range(1n, 10n), 'x'))
      const a = model.pool(p).activeId
      expect(model.pool(p).bin(a).supply).toBe(0n)
      // anyone sends 1 X and 1 Y to the escrow
      for (const assetId of [X, Y]) {
        await algorand.send.assetTransfer({
          sender: trader.addr,
          signer: trader.signer,
          receiver: escrowOf(p),
          assetId,
          amount: 1n,
        })
      }
      // the owner still exits (curve-pool removes never Settle a donation, §10 A24)
      const pos = model.positions.get(r.positionId)!
      const half = await remove(p, admin, r.positionId, pos.lowerId, pos.lowerId + pos.width - 1n, FS / 2n, false)
      expect(half.amountA > 0n).toBe(true)
      const x1 = model.pool(p).bin(a + 1n).x
      // the permissionless sync books both: X into bin +1 (no occupied bin at or below may take X), Y stays in
      // the empty active bin (no occupied bin below it)
      await syncPool(p)
      model.pool(p).settle(1n, false, 1n, false, 25n, 1_000n)
      expect(model.pool(p).bin(a + 1n).x).toBe(x1 + 1n)
      expect(model.pool(p).bin(a)).toEqual({ x: 0n, y: 1n, supply: 0n })
      await expectState(p)
      // a second transfer books the same way, and adds work; the first depositor into the empty active bin
      // takes what sits there
      await algorand.send.assetTransfer({
        sender: trader.addr,
        signer: trader.signer,
        receiver: escrowOf(p),
        assetId: X,
        amount: 7n,
      })
      await syncPool(p)
      model.pool(p).settle(7n, false, 0n, false, 25n, 1_000n)
      expect(model.pool(p).bin(a + 1n).x).toBe(x1 + 8n)
      await expectState(p)
      const lp = await add(p, lp2, 0n, 1_000n, 1_000n, [{ delta: 0n, distX: FS, distY: FS }])
      expect(model.pool(p).bin(a)).toEqual({ x: 1_000n, y: 1_001n, supply: lp.m.perBin[0].shares })
      // every unit is paid out: the owner gets its deposit plus the 8 X donated to its bins
      const rest = await remove(p, admin, r.positionId, pos.lowerId, pos.lowerId + pos.width - 1n)
      expect(half.amountA + rest.amountA).toBe(1_000_008n)
      const out2 = await remove(p, lp2, lp.r.positionId, a, a)
      expect([out2.amountA, out2.amountB]).toEqual([1_000n, 1_001n])
      await expectState(p)
    })
    test('(9b) review fix: a chunk whose bin holds a parked donation (reserves, no supply) cannot be closed until the bin is emptied', async () => {
      // the active bin is the last bin of its chunk; X-only liquidity over +1..+5 sits in the next chunk
      const a = IdCenter + 31n
      const c0 = a / BinsPerChunk
      const p = await createBinPool(defaults({ activeId: a }))
      await add(p, admin, 0n, 1_000_000n, 0n, spread(range(1n, 5n), 'x'))
      // 5 Y sent to the escrow and synced: no occupied bin below, so it stays in the empty active bin
      await algorand.send.assetTransfer({ sender: trader.addr, signer: trader.signer, receiver: escrowOf(p), assetId: Y, amount: 5n })
      await sendWith([p], async (g) =>
        g.addAppCallMethodCall(await dex.params.sync({ sender: admin.addr, signer: admin.signer, args: { poolId: p }, maxFee: MAX_FEE })),
      )
      model.pool(p).settle(0n, false, 5n, false, 25n, 1_000n)
      expect(model.pool(p).bin(a)).toEqual({ x: 0n, y: 5n, supply: 0n })
      await expectState(p)
      // a Y→X swap moves the active bin into the next chunk; chunk c0 has no occupancy but bin `a` holds 5 Y
      await swap(p, false, 1_000n)
      expect(model.pool(p).activeId / BinsPerChunk).toBe(c0 + 1n)
      // before the fix this deleted the chunk: the engine totals kept 5 Y that no bin held
      await expectContractError(engine.send.closeChunk({ args: { poolId: p, chunk: c0 }, ...send }), 'errBnCk')
      await expectState(p)
      // the chunk's payer can empty the bin itself: deposit Y into it (taking the parked 5 Y), withdraw, close
      const dep = await add(p, admin, 0n, 0n, 1_000n, [{ delta: a - model.pool(p).activeId, distX: 0n, distY: FS }])
      expect(model.pool(p).bin(a).y).toBe(1_005n)
      const out = await remove(p, admin, dep.r.positionId, a, a)
      expect(out.amountB).toBe(1_005n)
      expect(model.pool(p).bin(a)).toEqual({ x: 0n, y: 0n, supply: 0n })
      const adminBefore = await algoBalance(admin)
      await engine.send.closeChunk({ sender: lp2.addr, signer: lp2.signer, args: { poolId: p, chunk: c0 }, ...send })
      model.pool(p).chunks.delete(c0)
      expect((await algoBalance(admin)) - adminBefore).toBe(ChunkBoxMbr)
      await expectState(p)
    })
  })

  // ------------------------------------------------------------------------------------------------
  describe('custody Settle through the Vault guard (bins.md §11 e2e 11)', () => {
    let poolId: bigint
    let mock: MockDexHookClient
    const active = IdCenter + 16n

    beforeAll(async () => {
      mock = await deployMockHook(PERM.custody)
      poolId = await createBinPool(defaults(), defaultFees, {
        hooks: [tradeInstall(), hookInstall({ app: mock.appId, points: POINT.poke, perms: PERM.custody })],
      })
      await add(poolId, admin, 0n, 2_000_000n, 2_000_000n, [
        ...spread(range(-12n, -1n), 'y').map((e) => ({ ...e, distY: FS / 24n })),
        { delta: 0n, distX: FS, distY: FS / 2n },
      ])
    })

    const exactOutIn = (xForY: boolean, take: bigint, id: bigint) => {
      const { net, fee } = binSwapExactOut(xForY, take, priceOf(stepTable(25n), id), 25n * 100_000n)
      return net + fee
    }

    test('an in-bin trade at the bin price plus the custody fee passes; one unit worse reverts', async () => {
      const take = 100_000n
      const need = exactOutIn(true, take, active)
      await custodyFails(poolId, need - 1n, false, take, true, 'errPdki')
      const m = await custody(poolId, need, false, take, true)
      expect(m.endId).toBe(active)
      // the other direction: take X, pay Y
      const takeX = 50_000n
      const needY = exactOutIn(false, takeX, active)
      await custodyFails(poolId, takeX, true, needY - 1n, false, 'errPdki')
      expect((await custody(poolId, takeX, true, needY, false)).endId).toBe(active)
    })

    test('a cross-bin backrun moves activeId and books the surplus in the end bin', async () => {
      const pool = model.pool(poolId)
      const take = pool.bin(active).y + pool.bin(active - 1n).y + 1_000n
      // what an exact-out swap of `take` needs: Σ(net + fee) over the bins it crosses
      let required = 0n
      let left = take
      for (const id of [active, active - 1n, active - 2n]) {
        const y = pool.bin(id).y
        const t = left < y ? left : y
        if (t > 0n) required += exactOutIn(true, t, id)
        left -= t
      }
      expect(left).toBe(0n)
      const endBefore = { ...pool.bin(active - 2n) }
      const m = await custody(poolId, required + 5_000n, false, take, true)
      expect(m.endId).toBe(active - 2n)
      const endAfter = model.pool(poolId).bin(active - 2n)
      expect(endAfter.x - endBefore.x).toBe(exactOutIn(true, 1_000n, active - 2n) + 5_000n)
      const info = await dex.getPool({ args: { poolId } })
      expect(info.activeId).toBe(active - 2n)
      // one unit less than required is refused
      const again = model.pool(poolId)
      const t2 = again.bin(again.activeId).y
      await custodyFails(poolId, exactOutIn(true, t2, again.activeId) - 1n, false, t2, true, 'errPdki')
    })

    test('a pure withdrawal and a two-sided theft revert; a donation to a non-empty active bin is booked', async () => {
      await custodyFails(poolId, 0n, false, 10n, true, 'errPdki')
      await custodyFails(poolId, 10n, true, 10n, true, 'errPdki')
      const m = await custody(poolId, 1_234n, false, 77n, false)
      expect(m.endId).toBe(model.pool(poolId).activeId)
    })

    test('keeping the rekey, or rekeying elsewhere, reverts', async () => {
      await mock.send.configure({ args: { mode: MOCK.keepRekey, value: 0n, value2: 0n, target: ZERO }, ...send })
      await expectContractError(poke(poolId, 1n), 'errPdrb')
      await mock.send.configure({
        args: { mode: MOCK.rekeyElsewhere, value: 0n, value2: 0n, target: lp2.addr.toString() },
        ...send,
      })
      await expectContractError(poke(poolId, 1n), 'errPdrb')
      await expectState(poolId)
    })

    test('a donation while the active bin is empty books into the nearest occupied bin on its side', async () => {
      const p = await createBinPool(defaults(), defaultFees, { hooks: [tradeInstall()] })
      await add(p, admin, 0n, 0n, 1_000_000n, [{ delta: -3n, distX: 0n, distY: FS }])
      const m = await custody(p, 0n, false, 500n, false)
      expect(m.endId).toBe(active)
      expect(model.pool(p).bin(active - 3n).y).toBe(1_000_500n)
    })
  })

  // ------------------------------------------------------------------------------------------------
  describe('limits, routes and emergency (bins.md §11 e2e 12, 14, 15; WP2 (16)-(21))', () => {
    test('(20) a 64-bin Vault swap with chunk refs on engine.opUp() carriers stays ≤ 450 opcodes per bin, both directions', async () => {
      const p = await createBinPool(defaults({ varFeeControl: 40_000n, maxVa: 10_000_000n, maxBinsPerSwap: 100n }))
      // 70 dense Y bins below the active bin and 70 dense X bins above it (two positions of 35 each)
      await add(p, admin, 0n, 0n, 35_000_000n, spread(range(-34n, 0n), 'y'))
      await add(p, admin, 0n, 0n, 35_000_000n, spread(range(-69n, -35n), 'y'))
      await add(p, admin, 0n, 35_000_000n, 0n, spread(range(1n, 35n), 'x'))
      await add(p, admin, 0n, 35_000_000n, 0n, spread(range(36n, 70n), 'x'), { mbr: 3_000_000n })
      const pool = model.pool(p)
      const amountFor = (xForY: boolean, bins: number) => {
        // the smallest input (200k steps) that drains `bins − 1` bins and reaches the next
        for (let amt = 50_000_000n; ; amt += 200_000n) {
          const m = pool.swap(xForY, amt, feeContext(p, 0n), false)
          if (m.crossed + 1n >= BigInt(bins)) {
            expect(m.filled).toBe(true)
            return { amt, m }
          }
        }
      }
      const chunks = [...new Set(range(-69n, 70n).map((d) => (IdCenter + 16n + d) / 32n))]
      const info = await dex.getPool({ args: { poolId: p } })
      const pRef: BoxRef = { appId: 0n, name: vaultPoolBox(p) }
      const empties = await readQuotaEmptyRefs(algorand, dex, [pRef])
      const measure = async (xForY: boolean, amt: bigint) => {
        const group = algorand.newGroup()
        // carriers: every chunk box plus the table and pool state, on engine.opUp() calls (explicit refs only)
        const names = [poolBoxName(p), tableBoxName(25n), ...chunks.map((c) => chunkBoxName(p, c))]
        for (let i = 0; i < names.length; i += 8) {
          group.addAppCallMethodCall(
            await engine.params.opUp({
              args: [],
              boxReferences: names.slice(i, i + 8).map((name) => ({ appId: engine.appId, name })),
              staticFee: microAlgo(1_000),
              note: `carrier ${i}`,
            }),
          )
        }
        group.addAppCallMethodCall(
          await dex.params.swap({
            sender: trader.addr,
            signer: trader.signer,
            args: {
              input: transferTxn(algorand, trader, escrowOf(p), xForY ? X : Y, amt),
              poolId: p,
              minAmountOut: 0n,
              recipient: ZERO,
              data: NO_DATA,
              wallet: 0n,
            },
            appReferences: [engine.appId, info.escrow],
            assetReferences: [X, Y],
            boxReferences: [
              { appId: dex.appId, name: vaultPoolBox(p) },
              ...Array.from({ length: empties }, emptyBoxRef),
            ],
            staticFee: microAlgo(300_000),
          }),
        )
        const sim = await group.simulate({ skipSignatures: true, allowUnnamedResources: false })
        const g = sim.simulateResponse.txnGroups[0]
        expect(g.failureMessage).toBeUndefined()
        return Number(g.appBudgetConsumed)
      }
      for (const xForY of [true, false]) {
        const base = await measure(xForY, 10_000n)
        // X→Y starts in the active bin; Y→X steps over it (it holds only Y) into the first X bin
        const baseBins = Number(pool.swap(xForY, 10_000n, feeContext(p, 0n), false).crossed) + 1
        const { amt, m } = amountFor(xForY, 64)
        const total = await measure(xForY, amt)
        const bins = Number(m.crossed) + 1
        const perBin = (total - base) / (bins - baseBins)
        console.log(
          `[bins budget, via Vault] ${xForY ? 'X→Y' : 'Y→X'}: ${baseBins} bin(s) ${base} opcodes; ${bins} bins (${chunks.length} chunk refs carried): ${total} opcodes; ` +
            `marginal ${perBin.toFixed(1)} per bin crossed; average ${(total / bins).toFixed(1)} per bin`,
        )
        expect(bins).toBeGreaterThanOrEqual(64)
        expect(perBin).toBeLessThanOrEqual(450)
        expect(total / bins).toBeLessThanOrEqual(450)
      }
      // and the real swaps through the Vault match the model
      await swap(p, true, amountFor(true, 64).amt)
      await swap(p, false, amountFor(false, 64).amt)
    }, 240_000)

    /** the smallest exact input whose model traversal makes at least `moves` moves (binary search) */
    const smallestInput = (pool: BinPoolModel, xForY: boolean, moves: bigint) => {
      let lo = 1n
      let hi = 10n ** 13n
      while (lo < hi) {
        const mid = (lo + hi) / 2n
        if (pool.swap(xForY, mid, { feeBps: 25n, maxFeeBps: 1_000n, protocolFeeBps, now: 0n }, false).crossed >= moves) hi = mid
        else lo = mid + 1n
      }
      return lo
    }

    test('(20b) review fix: the sparse worst case (one bin per chunk) sizes MaxBinsPerSwapCap inside the group inner-transaction budget', async () => {
      const p = await createBinPool(defaults({ maxBinsPerSwap: 100n }))
      const active = IdCenter + 16n
      // 64 Y bins, each in its own chunk (deltas −32, −64, …, −2,048), two per position
      const N = 64n
      for (let k = 1n; k <= N; k += 2n) {
        await add(p, admin, 0n, 0n, 2_000_000n, spread([-32n * (k + 1n), -32n * k], 'y'), { check: false })
      }
      await expectState(p, { positions: false })
      const pool = model.pool(p)
      const chunks = [...pool.chunks.keys()]
      expect(chunks.length).toBe(Number(N) + 1)
      const info = await dex.getPool({ args: { poolId: p } })
      const pRef: BoxRef = { appId: 0n, name: vaultPoolBox(p) }
      const empties = await readQuotaEmptyRefs(algorand, dex, [pRef])
      const measure = async (amt: bigint) => {
        const group = algorand.newGroup()
        const names = [poolBoxName(p), tableBoxName(25n), ...chunks.map((c) => chunkBoxName(p, c))]
        for (let i = 0; i < names.length; i += 8) {
          group.addAppCallMethodCall(
            await engine.params.opUp({
              args: [],
              boxReferences: names.slice(i, i + 8).map((name) => ({ appId: engine.appId, name })),
              staticFee: microAlgo(1_000),
              note: `carrier ${i}`,
            }),
          )
        }
        group.addAppCallMethodCall(
          await dex.params.swap({
            sender: trader.addr,
            signer: trader.signer,
            args: {
              input: transferTxn(algorand, trader, escrowOf(p), X, amt),
              poolId: p,
              minAmountOut: 0n,
              recipient: ZERO,
              data: NO_DATA,
              wallet: 0n,
            },
            appReferences: [engine.appId, info.escrow],
            assetReferences: [X, Y],
            boxReferences: [{ appId: dex.appId, name: vaultPoolBox(p) }, ...Array.from({ length: empties }, emptyBoxRef)],
            staticFee: microAlgo(600_000),
          }),
        )
        const sim = await group.simulate({ skipSignatures: true, allowUnnamedResources: false })
        const g = sim.simulateResponse.txnGroups[0]
        expect(g.failureMessage).toBeUndefined()
        return Number(g.appBudgetConsumed)
      }
      // the active bin is empty: a small X→Y swap moves once, into the first Y bin
      const small = pool.swap(true, 10_000n, feeContext(p, 0n), false)
      expect([small.filled, small.crossed]).toEqual([true, 1n])
      const base = await measure(10_000n)
      // drain 60 bins and stop in the 61st: 60 more moves, each a chunk switch
      const amt = smallestInput(pool, true, 61n)
      const m = pool.swap(true, amt, feeContext(p, 0n), false)
      expect([m.filled, m.crossed]).toEqual([true, 61n])
      const total = await measure(amt)
      const perBin = (total - base) / Number(m.crossed - small.crossed)
      // op-ups (700 each) a cap-length sparse traversal needs; 64 of the group's 256 inners stay for the
      // Vault's payout and hooks, a router's legs and its own op-ups
      const opUps = Math.ceil((Number(MaxBinsPerSwapCap) * perBin + base) / 700)
      console.log(
        `[bins budget, sparse] ${m.crossed} moves across ${m.crossed} chunks: ${total} opcodes; marginal ${perBin.toFixed(1)} per bin; ` +
          `cap ${MaxBinsPerSwapCap} ⇒ ~${opUps} op-ups`,
      )
      expect(perBin).toBeLessThanOrEqual(600)
      expect(opUps).toBeLessThanOrEqual(192)
      // and the real swap through the Vault matches the model
      const r = await swap(p, true, amt, { check: false })
      expect(r.m.crossed).toBe(m.crossed)
      expect(model.pool(p).activeId).toBe(active - 32n * 61n)
      await expectState(p, { positions: false })
    }, 600_000)

    test('(22) review fix: maxBinsPerSwap above MaxBinsPerSwapCap is rejected; at the cap a long Quote returns 0 and a cap-length swap fills', async () => {
      await expectContractError(createBinPool(defaults({ maxBinsPerSwap: MaxBinsPerSwapCap + 1n })), 'errBnAr')
      const p = await createBinPool(defaults({ maxBinsPerSwap: MaxBinsPerSwapCap }))
      // Y in the active bin and the cap + 8 bins below it (dense: one move per bin)
      const deltas = range(-(MaxBinsPerSwapCap + 8n), 0n)
      for (let i = 0; i < deltas.length; i += 64) {
        const part = deltas.slice(i, i + 64)
        await add(p, admin, 0n, 0n, 100_000n * BigInt(part.length), spread(part, 'y'), { check: false })
      }
      await expectState(p)
      const pool = model.pool(p)
      // 131 moves: the pool holds enough, but the traversal stops at the cap; the Quote reports 0
      pool.maxBinsPerSwap = 1_000n
      expect(pool.swap(true, 15_000_000n, feeContext(p, 0n), false).filled).toBe(true)
      pool.maxBinsPerSwap = MaxBinsPerSwapCap
      const long = pool.swap(true, 15_000_000n, feeContext(p, 0n), false)
      expect([long.filled, long.crossed]).toEqual([false, MaxBinsPerSwapCap])
      expect(await tryQuote(p, true, 15_000_000n)).toBe(0n)
      // exactly cap moves: quote == model == swap
      const amt = smallestInput(pool, true, MaxBinsPerSwapCap)
      const m = pool.swap(true, amt, feeContext(p, 0n), false)
      expect([m.filled, m.crossed]).toEqual([true, MaxBinsPerSwapCap])
      expect(await tryQuote(p, true, amt)).toBe(m.amountOut)
      const r = await swap(p, true, amt)
      expect(r.m.crossed).toBe(MaxBinsPerSwapCap)
    }, 600_000)

    test('(23) review fix: an add confined to an inflated active bin reports ≥ 1 share, so the Vault does not reject it as 0 minted', async () => {
      const p = await createBinPool(defaults())
      const a = IdCenter + 16n
      // the attacker owns the empty active bin with 1 Y (2^32 shares) and inflates it with a donation
      const attacker = await add(p, admin, 0n, 0n, 1n, [{ delta: 0n, distX: 0n, distY: FS }])
      expect(attacker.m.perBin[0].shares).toBe(1n << 32n)
      await algorand.send.assetTransfer({
        sender: admin.addr,
        signer: admin.signer,
        receiver: escrowOf(p),
        assetId: Y,
        amount: 10n ** 12n,
      })
      await sendWith([p], async (g) =>
        g.addAppCallMethodCall(
          await dex.params.sync({ sender: admin.addr, signer: admin.signer, args: { poolId: p }, maxFee: MAX_FEE }),
        ),
      )
      model.pool(p).settle(0n, false, 10n ** 12n, false, 25n, 1_000n)
      expect(model.pool(p).bin(a)).toEqual({ x: 0n, y: 10n ** 12n + 1n, supply: 1n << 32n })
      await expectState(p)
      // a fair 1e6 Y add mints 4,294 bin shares (< 2^32): reported as 1, not 0 (was errPdsl)
      const user = await add(p, lp2, 0n, 0n, 1_000_000n, [{ delta: 0n, distX: 0n, distY: FS }])
      expect(user.m.perBin[0].shares).toBe((1_000_000n << 32n) / (10n ** 12n + 1n))
      expect(user.m.perBin[0].shares < 1n << 32n).toBe(true)
      expect(user.r.shares).toBe(reportedShares(user.m.perBin[0].shares))
      expect(user.r.shares).toBe(1n)
      // both leave pro-rata; the user's rounding loss stays in the bin
      const out = await remove(p, lp2, user.r.positionId, a, a)
      expect(out.amountB <= user.m.usedY && out.amountB >= user.m.usedY - 233_000n).toBe(true)
      await remove(p, admin, attacker.r.positionId, a, a)
    })

    test('(14) dust first deposit then a large deposit: no overflow, no theft', async () => {
      const p = await createBinPool(defaults())
      const dust = await add(p, lp2, 0n, 1n, 0n, [{ delta: 5n, distX: FS, distY: 0n }])
      const big = await add(p, admin, 0n, 10n ** 15n, 0n, [{ delta: 5n, distX: FS, distY: 0n }])
      expect(big.m.perBin[0].shares).toBe(dust.m.perBin[0].shares * 10n ** 15n)
      const id = IdCenter + 16n + 5n
      const outBig = await remove(p, admin, big.r.positionId, id, id)
      expect(outBig.amountA).toBe(10n ** 15n)
      const outDust = await remove(p, lp2, dust.r.positionId, id, id)
      expect(outDust.amountA).toBe(1n)
    })

    test('(14) minBinShares is enforced; a bin worth more than 2^96 Y units reverts', async () => {
      const p = await createBinPool(defaults({ minBinShares: 1_000n << 32n }))
      await expectContractError(
        tryAdd(
          p,
          admin,
          0n,
          1n,
          999n,
          encodeAddArgs(IdCenter + 16n, 0n, [{ delta: -1n, distX: 0n, distY: FS }]),
          1_000_000n,
        ),
        'errBnZs',
      )
      await add(p, admin, 0n, 0n, 1_000n, [{ delta: -1n, distX: 0n, distY: FS }])
      // ~2^40 price, 2^62 X: value 2^102 Y units
      const high = IdCenter + 11_200n - (IdCenter + 16n)
      await expectContractError(
        tryAdd(
          p,
          admin,
          0n,
          2n ** 62n,
          1n,
          encodeAddArgs(IdCenter + 16n, 0n, [{ delta: high, distX: FS, distY: 0n }]),
          2_000_000n,
        ),
        'errBnOv',
      )
      await expectState(p)
    })

    test('(15)/(18) paused pool: removeLiquidityCurve skips hooks and still pays pro-rata; trading, adds and pokes are closed', async () => {
      const blocker = await deployMockHook(PERM.custody)
      await blocker.send.configure({ args: { mode: MOCK.keepRekey, value: 0n, value2: 0n, target: ZERO }, ...send })
      const p = await createBinPool(defaults(), defaultFees, {
        hooks: [tradeInstall(), hookInstall({ app: blocker.appId, points: POINT.beforeRemove, perms: PERM.custody })],
      })
      const a = await add(p, admin, 0n, 3_000_000n, 3_000_000n, [
        ...range(-3n, -1n).map((delta) => ({ delta, distX: 0n, distY: FS / 4n })),
        { delta: 0n, distX: FS / 4n, distY: FS / 4n },
        ...range(1n, 3n).map((delta) => ({ delta, distX: FS / 4n, distY: 0n })),
      ])
      // the active bin takes only its own composition (the unmatched part is refunded)
      const b = await add(p, lp2, 0n, 1_000_000n, 1_000_000n, [
        { delta: -1n, distX: 0n, distY: FS / 2n },
        { delta: 0n, distX: FS, distY: FS / 2n },
      ])
      await swap(p, true, 900_000n)
      // the BeforeRemoveLiquidity hook keeps the rekey: every normal remove fails
      const pos = model.positions.get(a.r.positionId)!
      await expectContractError(
        tryRemove(p, admin, a.r.positionId, pos.lowerId, pos.lowerId + pos.width - 1n),
        'errPdrb',
      )

      await dex.send.setPoolPaused({ args: { poolId: p, paused: true }, ...send })
      // paused: the remove skips the hook (and sync) but still calls the curve; payouts are the model's pro-rata
      await remove(p, admin, a.r.positionId, pos.lowerId, pos.lowerId + pos.width - 1n)
      const pos2 = model.positions.get(b.r.positionId)!
      await remove(p, lp2, b.r.positionId, pos2.lowerId, pos2.lowerId + pos2.width - 1n, FS / 3n)
      // trading, adds and pokes are closed; quotes revert and tryQuoteRoute returns 0
      await expectContractError(
        sendWith([p], async (g) => swapCall(g, p, false, 1_000n, trader)),
        'errPdpp',
      )
      await expectContractError(
        sendWith([p], async (g) => quoteCall(g, p, false, 1_000n)),
        'errPdpp',
      )
      expect(await tryQuote(p, false, 1_000n)).toBe(0n)
      await expectContractError(
        tryAdd(
          p,
          lp2,
          0n,
          1_000n,
          1_000n,
          encodeAddArgs(model.pool(p).activeId, 0n, [{ delta: 0n, distX: FS, distY: FS }]),
        ),
        'errPdpp',
      )
      await configureTrade(10n, false, 0n, false)
      await expectContractError(poke(p), 'errPdpp')
      // bins pools have no Vault LP: the fungible emergency exit is the wrong entrypoint
      const cp = await createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: X,
        config: poolConfig(30n),
        optInLp: [lp2],
      })
      await addLiquidity(algorand, dex, lp2, cp.poolId, 1_000_000n, 1_000_000n)
      await expectContractError(
        dex.send.emergencyRemoveLiquidity({
          sender: lp2.addr,
          signer: lp2.signer,
          args: {
            lpTransfer: algorand.createTransaction.assetTransfer({
              sender: lp2.addr,
              signer: lp2.signer,
              receiver: dex.appAddress,
              assetId: cp.lpAsset,
              amount: 1n,
            }),
            poolId: p,
            minAmountA: 0n,
            minAmountB: 0n,
          },
          ...send,
        }),
        'errPdlm',
      )
      await expectState(p)
    })

    test('(19) swapRoute CP → bins → CP equals quoteRoute and tryQuoteRoute', async () => {
      const cp1 = await createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: X, config: poolConfig(30n) })
      const cp2 = await createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: Y, config: poolConfig(30n) })
      await addLiquidity(algorand, dex, admin, cp1.poolId, 100_000_000n, 100_000_000n)
      await addLiquidity(algorand, dex, admin, cp2.poolId, 100_000_000n, 100_000_000n)
      const p = await createBinPool(defaults({ varFeeControl: 40_000n }))
      await add(p, admin, 0n, 20_000_000n, 20_000_000n, [
        ...spread(range(-20n, -1n), 'y'),
        ...spread(range(1n, 20n), 'x'),
      ])
      const route = [cp1.poolId, p, cp2.poolId]
      const amountIn = 3_000_000n
      const quoted = (
        await dex.send.tryQuoteRoute({ args: { route, assetIn: 0n, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send })
      ).return!
      const pool1 = await dex.getPool({ args: { poolId: cp1.poolId } })
      const pool2 = await dex.getPool({ args: { poolId: cp2.poolId } })
      const res = await sendWith([p], async (g) =>
        g
          .addAppCallMethodCall(
            await dex.params.quoteRoute({
              sender: admin.addr,
              signer: admin.signer,
              args: { route, assetIn: 0n, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n },
              maxFee: MAX_FEE,
            }),
          )
          .addAppCallMethodCall(
            await dex.params.swapRoute({
              sender: trader.addr,
              signer: trader.signer,
              args: {
                input: transferTxn(algorand, trader, cp1.escrow, 0n, amountIn),
                route,
                minAmountOut: 0n,
                recipient: ZERO,
                data: NO_DATA,
                wallet: 0n,
              },
              maxFee: MAX_FEE,
            }),
          ),
      )
      const now = await blockTime(res.confirmations.at(-1)!.confirmedRound)
      const out = res.values.at(-1) as bigint
      expect(res.values.at(-2)).toBe(out)
      expect(quoted).toBe(out)
      // hop by hop: native CP, then the bins model, then native CP
      const x = cpOut(amountIn, pool1.reserveA, pool1.reserveB, 30n)
      const m = model.pool(p).swap(true, x, feeContext(p, now), true)
      expect(m.filled).toBe(true)
      expect(m.crossed).toBeGreaterThan(0n)
      expect(out).toBe(cpOut(m.amountOut, pool2.reserveB, pool2.reserveA, 30n))
      await expectState(p)
    })

    test('(14)/(16)/(17) 500-step randomized fuzz through the Vault: swaps, adds, removes, custody trades, donations', async () => {
      const p = await createBinPool(
        defaults({ varFeeControl: 40_000n, filterPeriod: 1n, decayPeriod: 4n }),
        { feeBps: 20n, maxFeeBps: 300n, custodyFeeBps: 20n },
        { hooks: [tradeInstall()] },
      )
      await setProtocolFee(1_500n)
      await add(
        p,
        admin,
        0n,
        20_000_000n,
        20_000_000n,
        [...spread(range(-10n, -1n), 'y'), ...spread([0n], 'both'), ...spread(range(1n, 10n), 'x')].map((e) => ({
          ...e,
          distX: e.distX / 2n,
          distY: e.distY / 2n,
        })),
      )
      let seed = 0x5eedn
      const rand = (n: bigint) => {
        seed = (seed * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n)
        return (seed >> 11n) % n
      }
      const counts = {
        swaps: 0,
        adds: 0,
        addsRefused: 0,
        removes: 0,
        custody: 0,
        custodyRefused: 0,
        donations: 0,
        syncs: 0,
        skipped: 0,
      }
      const myPositions: bigint[] = []
      const Steps = 500
      for (let step = 0; step < Steps; step++) {
        const pool = model.pool(p)
        const kind = rand(20n)
        // positions are checked in full every 25 steps; the bins, the bitmap, Σ bins == totals == Vault
        // reserves and the escrow identity after every step
        const full = step % 25 === 24
        if (kind < 10n) {
          // swap, grouped with a Vault quote of the same trade: quote == swap within a round
          const xForY = rand(2n) === 0n
          const avail = xForY ? pool.totalY : pool.totalX
          const amt = rand(avail / 3n + 1n) + 1n
          if (!pool.swap(xForY, amt, feeContext(p, 0n), false).filled) {
            counts.skipped++
            continue
          }
          const before = new Map([...pool.bins].map(([id, bin]) => [id, binValue(pool.price(id), bin.x, bin.y)]))
          await swap(p, xForY, amt, { quote: true, check: false })
          // bin L never decreases across a swap
          for (const [id, v] of before) {
            const bin = pool.bin(id)
            expect(binValue(pool.price(id), bin.x, bin.y) >= v).toBe(true)
          }
          counts.swaps++
        } else if (kind < 14n || myPositions.length === 0) {
          const a = pool.activeId
          const deltas = range(-rand(6n), rand(6n))
          const dist = deltas.map((d) => ({
            delta: d,
            distX: d >= 0n ? FS / BigInt(deltas.length) : 0n,
            distY: d <= 0n ? FS / BigInt(deltas.length) : 0n,
          }))
          const amtX = rand(3_000_000n) + 100_000n
          const amtY = rand(3_000_000n) + 100_000n
          const who = rand(2n) === 0n ? admin : lp2
          let chainError: unknown
          try {
            const { m } = await add(p, who, 0n, amtX, amtY, dist, { check: false })
            myPositions.push(m.positionId)
            counts.adds++
          } catch (e) {
            chainError = e
          }
          if (chainError) {
            // the chain refused (e.g. zero shares from a dust split): the model refuses the same inputs
            expect(String(chainError)).toMatch(/errBn/)
            expect(() => model.add(p, who.addr.toString(), 0n, amtX, amtY, a, 0n, dist, feeContext(p, 0n))).toThrow()
            counts.addsRefused++
          }
        } else if (kind < 17n) {
          const id = myPositions[Number(rand(BigInt(myPositions.length)))]
          const pos = model.positions.get(id)!
          const owner = pos.owner === admin.addr.toString() ? admin : lp2
          await remove(p, owner, id, pos.lowerId, pos.lowerId + pos.width - 1n, rand(FS) + 1n, false)
          counts.removes++
        } else if (kind < 19n) {
          // custody trade (BinsTradeHook through poke) at or above the exact-out requirement (surplus to LPs)
          const xForY = rand(2n) === 0n
          const avail = xForY ? pool.totalY : pool.totalX
          const take = rand(avail / 4n + 1n) + 1n
          // a third of the trades pay exactly the requirement (and first try one unit less)
          const surplus = rand(3n) === 0n ? 0n : rand(1_000n)
          // the minimal gain Settle accepts, by bisection on a copy of the model (monotone in the gain)
          const big = 10n ** 15n
          let lo = 0n
          let hi = big
          while (lo < hi) {
            const mid = (lo + hi) / 2n
            const t = new BinPoolModel(defaults({ maxBinsPerSwap: pool.maxBinsPerSwap }), 0n)
            t.bins = new Map(pool.bins)
            t.chunks = new Map(pool.chunks)
            t.activeId = pool.activeId
            let ok = true
            try {
              if (xForY) t.settle(mid, false, take, true, 20n, 300n)
              else t.settle(take, true, mid, false, 20n, 300n)
            } catch {
              ok = false
            }
            if (ok) hi = mid
            else lo = mid + 1n
          }
          // not fillable within the bins (out of liquidity or MaxBinsPerSwap): skip
          if (lo === big) {
            counts.skipped++
            continue
          }
          // one unit under the requirement is refused (the engine's Settle, errPdki)
          if (surplus === 0n && lo > 0n) {
            if (xForY) await custodyFails(p, lo - 1n, false, take, true, 'errPdki')
            else await custodyFails(p, take, true, lo - 1n, false, 'errPdki')
            counts.custodyRefused++
          }
          const gain = lo + surplus
          if (xForY) await custody(p, gain, false, take, true, false)
          else await custody(p, take, true, gain, false, false)
          counts.custody++
        } else {
          // an empty active bin is fine: the donation books into the nearest occupied bin (or stays in the active bin)
          const dX = rand(5_000n)
          const dY = rand(5_000n)
          if (rand(2n) === 0n) {
            // a custody donation
            await custody(p, dX, false, dY, false, false)
            counts.donations++
          } else {
            // a direct transfer booked by the permissionless sync
            if (dX > 0n)
              await algorand.send.assetTransfer({
                sender: admin.addr,
                signer: admin.signer,
                receiver: escrowOf(p),
                assetId: X,
                amount: dX,
              })
            if (dY > 0n)
              await algorand.send.assetTransfer({
                sender: admin.addr,
                signer: admin.signer,
                receiver: escrowOf(p),
                assetId: Y,
                amount: dY,
              })
            await sendWith([p], async (g) =>
              g.addAppCallMethodCall(
                await dex.params.sync({
                  sender: admin.addr,
                  signer: admin.signer,
                  args: { poolId: p },
                  maxFee: MAX_FEE,
                }),
              ),
            )
            model.pool(p).settle(dX, false, dY, false, 20n, 300n)
            counts.syncs++
          }
        }
        await expectState(p, { positions: full })
      }
      await expectState(p)
      console.log(`[bins fuzz via Vault] ${Steps} steps: ${JSON.stringify(counts)}`)
      expect(counts.swaps).toBeGreaterThan(150)
      expect(counts.custody).toBeGreaterThan(20)
      expect(counts.custodyRefused).toBeGreaterThan(5)
      expect(counts.adds + counts.removes).toBeGreaterThan(100)
      await setProtocolFee(0n)
    }, 3_600_000)

    test('(21) engine program size ≤ 14,000 B', async () => {
      const info = await algorand.client.algod.getApplicationByID(engine.appId).do()
      console.log(`[bins size] BinEngine approval ${info.params!.approvalProgram.length} B`)
      expect(info.params!.approvalProgram.length).toBeLessThanOrEqual(14_000)
    })
  })
})
