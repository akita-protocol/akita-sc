import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { createHash } from 'node:crypto'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress, modelsv2 } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient } from '../../artifacts/plugin-dex/PluginDexClient'
import { BackrunArbHookClient, BackrunArbHookFactory } from '../../artifacts/plugin-dex/hooks/BackrunArbHookClient'
import { VolatilityFeeHookFactory } from '../../artifacts/plugin-dex/hooks/VolatilityFeeHookClient'
import {
  addInitialLiquidity,
  bootstrapPool,
  deployTinymanV2,
  readPoolState,
  swapDirect,
  tinymanFixedInputOut,
  TinymanPool,
  TinymanPoolState,
  TinymanV2,
} from '../../../tests/fixtures/external/tinyman-v2'
import { addLiquidity, assertEscrowIdentity, createPool, deployVault, hookInstall, holding, poolConfig, transferTxn } from '../../../tests/fixtures/plugin-dex'
import { expectContractError } from '../../../tests/utils/errors'

// FINAL-SPEC §5 WP3 BackrunArbHook; research/lvr.md §3.12 (cases 1-9) plus spec cases (10)-(13), against the
// real Tinyman v2 bytecode (tests/fixtures/external/tinyman-v2.ts).

const BEFORE_SWAP = 32n
const AFTER_SWAP = 64n
const QUOTE = 128n
const POKE = 256n
const CUSTODY = 1n
const DYNAMIC_FEE = 2n
const LAZY = 1n
const MIN_FEE = 1_000n
const BPS = 10_000n

/**
 * The hook doc comment's fee buffer (OPEN-DECISIONS #19): the most inner transactions a lazy backrun adds over
 * the no-gap skip path, i.e. what a caller should budget per backrun pool on top of a skip-path simulation.
 */
const MAX_EXTRA_INNERS = 11n

const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }
const callFee = { maxFee: microAlgo(200_000) }
const enc = (s: string) => new TextEncoder().encode(s)
const itob = (n: bigint) => {
  const out = new Uint8Array(8)
  new DataView(out.buffer).setBigUint64(0, n)
  return out
}

// REFERENCE MODEL (bigint mirror of BackrunArbHook.plan) -----------------------------------------

type Venue = { minSurplusA: bigint; minSurplusB: bigint; maxTradeBps: bigint }
type Plan = { execute: false } | {
  execute: true
  sellA: boolean
  a: bigint
  out: bigint
  need: bigint
  minOut: bigint
}

const isqrt = (n: bigint): bigint => {
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x
}
const ceilDiv = (a: bigint, b: bigint) => (a + b - 1n) / b

/**
 * Size: maximize the guard slack (x₁ − a)(y₁ + (1 − φ)·g(a)), i.e. the lvr §3.2 closed form with Tinyman's
 * output scaled by (1 − φ); then Tinyman's exact output, the k break-even, the guard fee on `out` and the
 * floor. No tip, tank or rebate (OPEN-DECISIONS #19): the whole surplus stays with LPs.
 */
const planModel = (args: {
  rA: bigint
  rB: bigint
  tm: TinymanPoolState
  assetA: bigint
  assetB: bigint
  custodyFeeBps: bigint
  venue: Venue
}): Plan => {
  const { rA, rB, tm, assetA, assetB, custodyFeeBps: phi, venue } = args
  if (tm.lock !== 0n) return { execute: false }
  const tA = tm.reserve2
  const tB = tm.reserve1
  const g = BPS - tm.feeShare
  const p = BPS - phi
  let sellA: boolean
  if (g * p * tB * rA > BPS * BPS * rB * tA) sellA = true
  else if (g * p * tA * rB > BPS * BPS * rA * tB) sellA = false
  else return { execute: false }
  const [x1, y1, x2, y2] = sellA ? [rA, rB, tA, tB] : [rB, rA, tB, tA]
  const u = isqrt((x2 * y2 * p * (g * x1 + BPS * x2)) / (BPS * (BPS * y1 + p * y2)))
  if (u <= x2) return { execute: false }
  const ideal = ((u - x2) * BPS) / g
  const cap = (x1 * venue.maxTradeBps) / BPS
  const a = ideal < cap ? ideal : cap
  const assetX = sellA ? assetA : assetB
  const out = tinymanFixedInputOut(tm, assetX, a)
  if (a === 0n || out === 0n) return { execute: false }
  const need = ceilDiv(x1 * y1, x1 - a) - y1
  if (out <= need) return { execute: false }
  const surplus = out - need
  const guardFee = ceilDiv(out * phi, BPS)
  if (surplus <= guardFee) return { execute: false }
  const minSurplus = sellA ? venue.minSurplusB : venue.minSurplusA
  const rest = surplus - guardFee - minSurplus
  if (rest < 0n) return { execute: false }
  return { execute: true, sellA, a, out, need, minOut: out - rest }
}

/** native CP output with no protocol fee: [out, new reserveIn, new reserveOut] */
const cpSwap = (amountIn: bigint, rIn: bigint, rOut: bigint, feeBps: bigint) => {
  const eff = amountIn - (amountIn * feeBps) / BPS
  const out = (eff * rOut) / (rIn + eff)
  return [out, rIn + amountIn, rOut - out] as const
}

type InnerTxn = {
  txn: { txn: { type?: string; fee?: bigint; sender?: { toString(): string }; applicationCall?: { appIndex?: bigint } } }
  logs?: Uint8Array[]
  innerTxns?: InnerTxn[]
}
const countInners = (txn: { innerTxns?: InnerTxn[] }): number => (txn.innerTxns ?? []).reduce((n, inner) => n + 1 + countInners(inner), 0)
/** op-up inners (app creations) sent by `sender` anywhere in the tree: [count, fees they paid themselves] */
const opUps = (txn: { innerTxns?: InnerTxn[] }, sender: string): [number, bigint] =>
  (txn.innerTxns ?? []).reduce<[number, bigint]>(
    ([n, fees], inner) => {
      const own = inner.txn.txn.type === 'appl' && !inner.txn.txn.applicationCall?.appIndex && inner.txn.txn.sender?.toString() === sender
      const [m, f] = opUps(inner, sender)
      return [n + m + (own ? 1 : 0), fees + f + (own ? (inner.txn.txn.fee ?? 0n) : 0n)]
    },
    [0, 0n],
  )
const appCalls = (txn: { innerTxns?: InnerTxn[] }, appId: bigint): InnerTxn[] =>
  (txn.innerTxns ?? []).flatMap((inner) => [...(inner.txn.txn.applicationCall?.appIndex === appId ? [inner] : []), ...appCalls(inner, appId)])

/** ARC-28 selector of BackrunEvent */
const BACKRUN_EVENT = createHash('sha512-256').update('BackrunEvent(uint64,uint64,bool,uint64,uint64)').digest().subarray(0, 4)
/** BackrunEvent logs (selector + (uint64,uint64,bool,uint64,uint64) = 37 B) anywhere in the tree */
type BackrunEvent = { poolId: bigint; point: bigint; sellA: boolean; amountIn: bigint; amountOut: bigint }
const backrunEvents = (txn: { logs?: Uint8Array[]; innerTxns?: InnerTxn[] }): BackrunEvent[] => {
  const own = (txn.logs ?? [])
    .filter((log) => log.length === 37 && Buffer.from(log.subarray(0, 4)).equals(BACKRUN_EVENT))
    .map((log) => {
      const b = Buffer.from(log)
      return {
        poolId: b.readBigUInt64BE(4),
        point: b.readBigUInt64BE(12),
        sellA: (b[20] & 0x80) !== 0,
        amountIn: b.readBigUInt64BE(21),
        amountOut: b.readBigUInt64BE(29),
      }
    })
  return [...own, ...(txn.innerTxns ?? []).flatMap((inner) => backrunEvents(inner))]
}
/** every inner transaction in the tree, depth first */
const allInners = (txn: { innerTxns?: InnerTxn[] }): InnerTxn[] => (txn.innerTxns ?? []).flatMap((inner) => [inner, ...allInners(inner)])

describe('BackrunArbHook', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let keeper: TransactionSignerAccount
  let dex: PluginDexClient
  let tm: TinymanV2
  let hook: BackrunArbHookClient
  let tka: bigint
  let tkb: bigint
  let tmAlgo: TinymanPool
  let tmAsa: TinymanPool

  const DEFAULT_VENUE: Venue = { minSurplusA: 0n, minSurplusB: 0n, maxTradeBps: 5_000n }
  const BACKRUN = (app: bigint) => hookInstall({ app, points: AFTER_SWAP | POKE, perms: CUSTODY, flags: LAZY })

  const tmFor = (assetA: bigint) => (assetA === 0n ? tmAlgo : tmAsa)
  const tmState = async (assetA: bigint) => (await readPoolState(tm, tmFor(assetA).address))!
  const authAddr = async (address: string) => (await algorand.account.getInformation(address)).authAddr?.toString()

  const register = (poolId: bigint, venue: Venue = DEFAULT_VENUE, h = hook) =>
    h.send.registerPool({ args: { poolId, ...venue }, ...send })

  /**
   * A native pool whose price is Tinyman's × (1 + gapBps/1e4) (B per A), depth `rA` of A, with `hooks`
   * (default: the backrun hook alone) and registered with `venue`.
   */
  const newPool = async ({
    assetA = 0n,
    assetB = tka,
    gapBps = 0n,
    rA = 5_000_000_000n,
    feeBps = 30n,
    custodyFeeBps,
    hooks,
    venue = DEFAULT_VENUE,
    h = hook,
  }: {
    assetA?: bigint
    assetB?: bigint
    gapBps?: bigint
    rA?: bigint
    feeBps?: bigint
    custodyFeeBps?: bigint
    hooks?: ReturnType<typeof hookInstall>[]
    venue?: Venue | null
    h?: BackrunArbHookClient
  } = {}) => {
    const s = await tmState(assetA)
    const rB = (rA * s.reserve1 * (BPS + gapBps)) / (s.reserve2 * BPS)
    const { poolId, escrow } = await createPool({
      algorand,
      dex,
      sender: admin,
      assetA,
      assetB,
      config: poolConfig(feeBps, custodyFeeBps === undefined ? {} : { custodyFeeBps }),
      hooks: hooks ?? [BACKRUN(h.appId)],
      optInLp: [admin],
    })
    await addLiquidity(algorand, dex, admin, poolId, rA, rB)
    if (venue) await register(poolId, venue, h)
    return { poolId, escrow }
  }

  /**
   * `PluginDex.opUp()` carriers placed before a Vault call (FINAL-SPEC §1: the inner transaction pool is 256
   * per group). The hook funds its own budget (ensureBudget after a gap is found and after the carrier), so
   * pokes need none. A hooked swap still needs ONE: on a pool whose only hooks are at AfterSwap/Poke, the
   * final Vault spends its whole 700 before its first checkpoint (it fails at the entry of
   * runHooks(AfterSwap), "local program cost was 700") — a core-side issue, reported as amendment L8. The
   * core's own swap helpers always add this carrier for references, which hides it. A second carrier holds
   * references: an ASA/ASA backrun touches ~16 group resources (escrow and Tinyman pool holdings of both
   * assets, Tinyman locals, three apps, three boxes) and algokit's greedy packing, whose order follows the
   * (random) escrow address, does not always fit them into the swap call plus one carrier.
   */
  const SWAP_CARRIERS = 2
  /** a poke needs one carrier for references only: algokit cannot fit the hook's resources into the poke */
  const POKE_CARRIERS = 1
  const withCarriers = (sender: TransactionSignerAccount, staticFee?: bigint, n = SWAP_CARRIERS) => {
    let group = dex.newGroup()
    for (let i = 0; i < n; i++) {
      group = group.opUp({
        args: [],
        sender: sender.addr,
        signer: sender.signer,
        note: `carrier ${i} ${Math.random()}`,
        ...(staticFee === undefined ? callFee : { staticFee: microAlgo(MIN_FEE) }),
      }) as unknown as typeof group
    }
    return group
  }

  /** swap on our pool (as `sender`), returning the result, the backrun events and the hook calls */
  const swap = async (poolId: bigint, assetIn: bigint, amountIn: bigint, { sender = trader, staticFee }: { sender?: TransactionSignerAccount; staticFee?: bigint } = {}) => {
    const pool = await dex.getPool({ args: { poolId } })
    const result = await withCarriers(sender, staticFee)
      .swap({
        sender: sender.addr,
        signer: sender.signer,
        args: {
          input: transferTxn(algorand, sender, getApplicationAddress(pool.escrow).toString(), assetIn, amountIn),
          poolId,
          minAmountOut: 0n,
          recipient: ALGORAND_ZERO_ADDRESS_STRING,
          data: new Uint8Array(),
          wallet: 0n,
        },
        ...(staticFee === undefined ? callFee : { staticFee: microAlgo(staticFee) }),
      })
      .send(staticFee === undefined ? send : { coverAppCallInnerTransactionFees: false, populateAppCallResources: true })
    const appl = result.confirmations[result.confirmations.length - 1] as unknown as InnerTxn
    return {
      out: result.returns[result.returns.length - 1] as bigint,
      appl,
      events: backrunEvents(appl),
      hookCalls: appCalls(appl, hook.appId),
      escrow: getApplicationAddress(pool.escrow).toString(),
      /** the fees of the group's outer transactions, how many there are and how many inners they ran */
      groupFee: result.transactions.reduce((n, t) => n + t.fee, 0n),
      outerCount: result.transactions.length,
      groupInners: result.confirmations.reduce((n, c) => n + countInners(c as unknown as InnerTxn), 0),
    }
  }

  const poke = async (poolId: bigint, sender = keeper, hookIndex = 0n) => {
    const result = await withCarriers(sender, undefined, POKE_CARRIERS)
      .poke({ ...callFee, sender: sender.addr, signer: sender.signer, args: { poolId, hookIndex, data: new Uint8Array() } })
      .send(send)
    const appl = result.confirmations[result.confirmations.length - 1] as unknown as InnerTxn
    return { appl, events: backrunEvents(appl) }
  }

  const quote = async (poolId: bigint, assetIn: bigint, amountIn: bigint) =>
    dex.quote({ args: { poolId, assetIn, amountIn, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n } })

  /**
   * Swap `amountIn` on our pool and check the backrun against the model to the micro-unit: our reserves,
   * Tinyman's reserves, the escrow handed back, the event and the escrow identity. Returns the plan.
   */
  const swapAndCheck = async (poolId: bigint, assetIn: bigint, amountIn: bigint, { venue = DEFAULT_VENUE, sender = trader } = {}) => {
    const pool = await dex.getPool({ args: { poolId } })
    const tmBefore = await tmState(pool.assetA)
    const inIsA = assetIn === pool.assetA
    const [userOut, rIn, rOut] = cpSwap(amountIn, inIsA ? pool.reserveA : pool.reserveB, inIsA ? pool.reserveB : pool.reserveA, pool.feeBps)
    const [rA, rB] = inIsA ? [rIn, rOut] : [rOut, rIn]
    const plan = planModel({ rA, rB, tm: tmBefore, assetA: pool.assetA, assetB: pool.assetB, custodyFeeBps: pool.custodyFeeBps, venue })
    const quoted = await quote(poolId, assetIn, amountIn)

    const r = await swap(poolId, assetIn, amountIn, { sender })
    expect(r.out).toBe(userOut)
    expect(r.out).toBe(quoted)
    await checkBackrun(poolId, plan, rA, rB, tmBefore, r)
    return { ...r, plan, rA, rB }
  }

  const checkBackrun = async (poolId: bigint, plan: Plan, rA: bigint, rB: bigint, tmBefore: TinymanPoolState, r: { events: BackrunEvent[] }) => {
    const pool = await dex.getPool({ args: { poolId } })
    const tmAfter = await tmState(pool.assetA)
    expect(await authAddr(getApplicationAddress(pool.escrow).toString())).toBe(dex.appAddress.toString())
    if (!plan.execute) {
      expect(r.events).toEqual([])
      expect([pool.reserveA, pool.reserveB]).toEqual([rA, rB])
      expect(tmAfter.reserve1).toBe(tmBefore.reserve1)
      expect(tmAfter.reserve2).toBe(tmBefore.reserve2)
    } else {
      expect(r.events).toHaveLength(1)
      expect(r.events[0]).toMatchObject({ poolId, sellA: plan.sellA, amountIn: plan.a, amountOut: plan.out })
      // LP gain equals the model to the micro-unit: the whole Tinyman output (no tip, no rebate)
      expect([pool.reserveA, pool.reserveB]).toEqual(plan.sellA ? [rA - plan.a, rB + plan.out] : [rA + plan.out, rB - plan.a])
      // k rises
      expect(pool.reserveA * pool.reserveB).toBeGreaterThan(rA * rB)
      // Tinyman moved by the same amounts: X in (minus its protocol fee), Y out
      const protocolFee = (plan.a * tmBefore.feeShare) / BPS / tmBefore.protocolFeeRatio
      const [inKey, outKey] = plan.sellA ? (['reserve2', 'reserve1'] as const) : (['reserve1', 'reserve2'] as const)
      expect(tmAfter[inKey]).toBe(tmBefore[inKey] + plan.a - protocolFee)
      expect(tmAfter[outKey]).toBe(tmBefore[outKey] - plan.out)
    }
    await assertEscrowIdentity(algorand, dex, poolId)
  }

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (400_000).algo())
    trader = await localnet.context.generateAccount({ initialFunds: (2_000).algo() })
    keeper = await localnet.context.generateAccount({ initialFunds: (200_000).algo() })

    for (const name of ['BRA', 'BRB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 17n, decimals: 6, unitName: name })
      for (const account of [trader, keeper]) {
        await algorand.send.assetOptIn({ sender: account.addr, assetId })
        await algorand.send.assetTransfer({ sender: admin.addr, receiver: account.addr, assetId, amount: 10n ** 14n })
      }
      if (name === 'BRA') tka = assetId
      else tkb = assetId
    }
    if (tka > tkb) [tka, tkb] = [tkb, tka]

    tm = await deployTinymanV2(algorand, admin.addr)
    tmAlgo = await bootstrapPool(tm, admin.addr, 0n, tka)
    await addInitialLiquidity(tm, tmAlgo, admin.addr, 0n, 50_000_000_000n, 250_000_000_000n) // 1 ALGO = 5 TKA
    tmAsa = await bootstrapPool(tm, admin.addr, tka, tkb)
    await addInitialLiquidity(tm, tmAsa, admin.addr, tka, 100_000_000_000n, 200_000_000_000n) // 1 TKA = 2 TKB

    dex = await deployVault({ algorand, sender: admin })
    hook = (
      await algorand.client
        .getTypedAppFactory(BackrunArbHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId, tinyman: tm.appId, admin: admin.addr.toString() } })
    ).appClient
    // account MBR + venue box MBRs only: there is no gas tank (OPEN-DECISIONS #19)
    await hook.appClient.fundAppAccount({ amount: (5).algo() })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms: CUSTODY }, ...send })
  })

  describe('registration and admin', () => {
    test('registerPool is admin-only, derives the Tinyman pool on chain and checks parameters', async () => {
      const { poolId } = await newPool({ venue: null })
      await expectContractError(
        hook.send.registerPool({ sender: trader.addr, signer: trader.signer, args: { poolId, ...DEFAULT_VENUE }, ...send }),
        'errBrao',
      )
      await expectContractError(register(poolId, { ...DEFAULT_VENUE, maxTradeBps: 0n }), 'errBrpm')
      await expectContractError(register(poolId, { ...DEFAULT_VENUE, maxTradeBps: 5_001n }), 'errBrpm')
      await register(poolId)
      const venue = await hook.getVenue({ args: { poolId } })
      expect(venue).toEqual({ pool: tmAlgo.address, assetA: 0n, assetB: tka, ...DEFAULT_VENUE, enabled: true })

      // a pair with no bootstrapped Tinyman pool cannot be registered
      const { assetId: tkc } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'BRC' })
      const { poolId: orphan } = await createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tkc, config: poolConfig(30n), hooks: [BACKRUN(hook.appId)] })
      await expectContractError(register(orphan), 'errBrtm')
      // the pool must run this hook with custody at AfterSwap/Poke
      const { poolId: noHook } = await newPool({ hooks: [], venue: null })
      await expectContractError(register(noHook), 'errBrpl')
      const { poolId: noCustody } = await newPool({ hooks: [hookInstall({ app: hook.appId, points: AFTER_SWAP, perms: 0n })], venue: null })
      await expectContractError(register(noCustody), 'errBrpl')
      // admin setters are admin-only
      await expectContractError(hook.send.setPaused({ sender: trader.addr, signer: trader.signer, args: { paused: true }, ...send }), 'errBrao')
      await expectContractError(hook.send.setPoolEnabled({ sender: trader.addr, signer: trader.signer, args: { poolId, enabled: false }, ...send }), 'errBrao')
      await expectContractError(hook.send.withdraw({ sender: trader.addr, signer: trader.signer, args: { amount: 1n }, ...send }), 'errBrao')
    })
  })

  describe('lvr §3.12', () => {
    test('(1)+(10) no gap: skip path, one hook call, escrow handed back, reserves unchanged by the hook', async () => {
      const { poolId } = await newPool()
      const r = await swapAndCheck(poolId, 0n, 1_000_000n)
      expect(r.plan.execute).toBe(false)
      // the Vault's inner txns: one hook call (lazy, no custody, no children) + the payout
      expect(r.hookCalls).toHaveLength(1)
      expect(r.hookCalls[0].innerTxns ?? []).toHaveLength(0)
      expect((r.appl.innerTxns ?? []).length).toBe(2)
      expect(countInners(r.appl)).toBe(2)
      console.log(`[backrun] skip path: ${(r.appl.innerTxns ?? []).length} Vault inners (hook call + payout), ${r.hookCalls.length} hook call`)
    })

    test('(2) a gap in each direction on ALGO/ASA and ASA/ASA pools: LP gain equals the model to the µunit', async () => {
      for (const [assetA, assetB] of [
        [0n, tka],
        [tka, tkb],
      ]) {
        for (const gapBps of [500n, -500n]) {
          const { poolId } = await newPool({ assetA, assetB, gapBps })
          // a small user trade triggers the AfterSwap backrun
          const r = await swapAndCheck(poolId, assetA, assetA === 0n ? 1_000_000n : 1_000_000n)
          expect(r.plan.execute).toBe(true)
          if (r.plan.execute) {
            // our A is dearer than Tinyman's (gap > 0): the pool sells B to Tinyman (buys A there), and vice versa
            expect(r.plan.sellA).toBe(gapBps < 0n)
            console.log(
              `[backrun] pair ${assetA}/${assetB} gap ${gapBps} bps: sold ${r.plan.a} ${r.plan.sellA ? 'A' : 'B'}, got ${r.plan.out}, ` +
                `break-even ${r.plan.need}, LP gain ${r.plan.out - r.plan.need} above k`,
            )
          }
          // after the backrun the pool sits inside the no-arbitrage band: the next swap skips
          // (a trade in the direction the pool just sold moves it deeper into the band)
          const again = await swapAndCheck(poolId, gapBps > 0n ? assetA : assetB, 1_000_000n)
          expect(again.plan.execute).toBe(false)
        }
      }
    })

    test('(3) lock = 1: a flash_swap open in the same group makes the backrun skip, not revert', async () => {
      const { poolId, escrow } = await newPool({ gapBps: 400n })
      const pool = await dex.getPool({ args: { poolId } })
      // fees are set by hand: algokit's fee cover needs maxFee on every app call, raw Tinyman calls included
      const flash = await algorand.createTransaction.appCall({
        sender: trader.addr,
        appId: tm.appId,
        args: [enc('flash_swap'), itob(4n), itob(1_000_000n), itob(0n)],
        accountReferences: [tmAlgo.address],
        assetReferences: [tka],
        staticFee: microAlgo(2_000),
      })
      const repay = await algorand.createTransaction.assetTransfer({ sender: trader.addr, receiver: tmAlgo.address, assetId: tka, amount: 1_100_000n })
      const verify = await algorand.createTransaction.appCall({
        sender: trader.addr,
        appId: tm.appId,
        args: [enc('verify_flash_swap'), itob(4n)],
        accountReferences: [tmAlgo.address],
        assetReferences: [tka],
        staticFee: microAlgo(1_000),
      })
      const result = await withCarriers(trader, MIN_FEE)
        .addTransaction(flash, trader.signer)
        .swap({
          staticFee: microAlgo(3n * MIN_FEE),
          sender: trader.addr,
          signer: trader.signer,
          args: { input: transferTxn(algorand, trader, escrow, 0n, 1_000_000n), poolId, minAmountOut: 0n, recipient: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n },
          accountReferences: [tmAlgo.address],
          appReferences: [tm.appId, hook.appId],
        })
        .addTransaction(repay, trader.signer)
        .addTransaction(verify, trader.signer)
        .send({ coverAppCallInnerTransactionFees: false, populateAppCallResources: true })
      const appl = result.confirmations[SWAP_CARRIERS + 2] as unknown as InnerTxn
      expect(backrunEvents(appl)).toEqual([])
      expect(appCalls(appl, hook.appId)).toHaveLength(1)
      const after = await dex.getPool({ args: { poolId } })
      const [, rIn, rOut] = cpSwap(1_000_000n, pool.reserveA, pool.reserveB, 30n)
      expect([after.reserveA, after.reserveB]).toEqual([rIn, rOut])
      expect((await tmState(0n)).lock).toBe(0n)
      await assertEscrowIdentity(algorand, dex, poolId)

      // with the lock released the same gap is captured
      const r = await swapAndCheck(poolId, 0n, 1_000_000n)
      expect(r.plan.execute).toBe(true)
    })

    test('(4) a dust gap or a gap whose surplus is below minSurplus skips', async () => {
      // dust: inside the fee band (Tinyman 30 bps + custody 30 bps)
      const { poolId: dust } = await newPool({ gapBps: 40n })
      expect((await swapAndCheck(dust, tka, 1_000n)).plan.execute).toBe(false)

      // a real gap, but the LP floor is set above the surplus: skip; lowered: executes
      const { poolId } = await newPool({ gapBps: 300n, venue: { ...DEFAULT_VENUE, minSurplusA: 10n ** 12n, minSurplusB: 10n ** 12n } })
      const high = { ...DEFAULT_VENUE, minSurplusA: 10n ** 12n, minSurplusB: 10n ** 12n }
      expect((await swapAndCheck(poolId, 0n, 1_000_000n, { venue: high })).plan.execute).toBe(false)
      const floor = { ...DEFAULT_VENUE, minSurplusA: 1_000n, minSurplusB: 1_000n }
      await register(poolId, floor)
      const r = await swapAndCheck(poolId, 0n, 1_000_000n, { venue: floor })
      expect(r.plan.execute).toBe(true)
    })

    test('(5) fees: every hook inner is fee 0; the swapper\'s group pays for the whole arbitrage path (simulate-based cover)', async () => {
      // ALGO surplus (gap > 0 on ALGO/TKA: the pool sells TKA for ALGO) and an ASA/ASA pool. Before #19 the
      // first refilled a gas tank with a rebate out of the LP surplus and the second drained it.
      for (const [assetA, assetB, assetIn] of [
        [0n, tka, tka],
        [tka, tkb, tka],
      ]) {
        const { poolId } = await newPool({ assetA, assetB, gapBps: 500n })
        const hookBalance = (await algorand.account.getInformation(hook.appAddress)).balance.microAlgo
        const r = await swapAndCheck(poolId, assetIn, 1_000_000n)
        expect(r.plan.execute).toBe(true)
        // the hook issued its inners (op-ups, Tinyman deposit + appl) and every one of them is fee 0
        const inners = allInners(r.appl)
        const hookSent = inners.filter((t) => [hook.appAddress.toString(), r.escrow].includes(t.txn.txn.sender?.toString() ?? ''))
        expect(hookSent.length).toBeGreaterThan(0)
        for (const t of inners) expect(t.txn.txn.fee ?? 0n).toBe(0n)
        // the group's outer fees pay for every transaction in it, inners included (fee pooling)
        expect(r.groupFee).toBe(MIN_FEE * BigInt(r.outerCount + r.groupInners))
        // the hook's account paid nothing (no carrier, no tank-funded op-up) and received nothing (no rebate)
        expect((await algorand.account.getInformation(hook.appAddress)).balance.microAlgo).toBe(hookBalance)
        // what the backrun adds over the no-gap skip path (hook call + payout) fits the documented fee buffer
        const extra = BigInt(countInners(r.appl) - 2)
        const [hookOpUps] = opUps(r.appl, hook.appAddress.toString())
        console.log(`[backrun] ${assetA}/${assetB} arbitrage: ${extra} inners beyond the skip path (${hookOpUps} hook op-ups), group fee ${r.groupFee} µALGO`)
        expect(extra).toBeLessThanOrEqual(MAX_EXTRA_INNERS)
      }
    })

    test('(5) fee buffer: a skip-path fee fails the group when the backrun fires; + MAX_EXTRA_INNERS × min fee succeeds', async () => {
      const { poolId } = await newPool({ assetA: tka, assetB: tkb, gapBps: 500n })
      const before = await dex.getPool({ args: { poolId } })
      // the skip path costs the swap call 3 fees (itself, the hook call, the payout). Before #19 the tank's
      // carrier made that enough; now the swapper's group pays for the arbitrage inners, so it is rejected
      const error = await swap(poolId, tka, 1_000_000n, { staticFee: 3n * MIN_FEE }).then(
        () => undefined,
        (e: Error) => e.message,
      )
      console.log(`[backrun] skip-path fee with a live gap: ${error?.slice(0, 160)}`)
      // algod's group-fee check, e.g. 'group fee 0.0A too small (needs 1mA more)'
      expect(error).toBeDefined()
      expect(error).toMatch(/group fee \S+ too small \(needs \S+ more\)/)
      const unchanged = await dex.getPool({ args: { poolId } })
      expect([unchanged.reserveA, unchanged.reserveB]).toEqual([before.reserveA, before.reserveB])

      // the documented buffer on top of the skip-path fee is enough
      const tmBefore = await tmState(tka)
      const [, rIn, rOut] = cpSwap(1_000_000n, before.reserveA, before.reserveB, 30n)
      const plan = planModel({ rA: rIn, rB: rOut, tm: tmBefore, assetA: tka, assetB: tkb, custodyFeeBps: 30n, venue: DEFAULT_VENUE })
      expect(plan.execute).toBe(true)
      const r = await swap(poolId, tka, 1_000_000n, { staticFee: (3n + MAX_EXTRA_INNERS) * MIN_FEE })
      // the backrun really fired on the buffered fee (not a silent skip)
      expect(r.events).toHaveLength(1)
      await checkBackrun(poolId, plan, rIn, rOut, tmBefore, r)
    })

    test('(6) a keeper poke executes the backrun; the keeper gets nothing from the pool (no tip)', async () => {
      // our ALGO is cheap vs Tinyman (gap < 0): sell ALGO, the surplus is TKA
      const { poolId } = await newPool({ gapBps: -600n })
      const pool = await dex.getPool({ args: { poolId } })
      const tmBefore = await tmState(0n)
      const plan = planModel({ rA: pool.reserveA, rB: pool.reserveB, tm: tmBefore, assetA: 0n, assetB: tka, custodyFeeBps: 30n, venue: DEFAULT_VENUE })
      expect(plan.execute).toBe(true)
      const keeperTka = await holding(algorand, keeper.addr.toString(), tka)
      const r = await poke(poolId, keeper)
      await checkBackrun(poolId, plan, pool.reserveA, pool.reserveB, tmBefore, r)
      expect(r.events[0].point).toBe(POKE)
      expect(await holding(algorand, keeper.addr.toString(), tka)).toBe(keeperTka)
    })

    test('(stabilize) an unfunded fee-pooled caller pokes an ALGO-surplus pool; the backrun runs and the poke does not revert', async () => {
      // our ALGO is dear vs Tinyman (gap > 0): the pool sells TKA for ALGO, so the surplus is ALGO
      const { poolId } = await newPool({ gapBps: 500n })
      const pool = await dex.getPool({ args: { poolId } })
      const tmBefore = await tmState(0n)
      const plan = planModel({ rA: pool.reserveA, rB: pool.reserveB, tm: tmBefore, assetA: 0n, assetB: tka, custodyFeeBps: 30n, venue: DEFAULT_VENUE })
      expect(plan.execute && !plan.sellA).toBe(true)
      // a never-funded account sends the poke at fee 0; the keeper's carrier pays the whole group
      const ghost = algorand.account.random()
      expect((await algorand.account.getInformation(ghost.addr)).balance.microAlgo).toBe(0n)
      const result = await dex
        .newGroup()
        .opUp({ args: [], sender: keeper.addr, signer: keeper.signer, note: `ghost carrier ${Math.random()}`, staticFee: microAlgo(60n * MIN_FEE) })
        .poke({ sender: ghost.addr, signer: ghost.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, staticFee: microAlgo(0) })
        .send({ coverAppCallInnerTransactionFees: false, populateAppCallResources: true })
      const appl = result.confirmations[result.confirmations.length - 1] as unknown as InnerTxn
      const r = { appl, events: backrunEvents(appl) }
      await checkBackrun(poolId, plan, pool.reserveA, pool.reserveB, tmBefore, r)
      expect((await algorand.account.getInformation(ghost.addr)).balance.microAlgo).toBe(0n)
    })

    test('(7) manipulation: push Tinyman, trigger, unwind — the attacker loses and LP k rises', async () => {
      const { poolId } = await newPool()
      const before = await dex.getPool({ args: { poolId } })
      const attacker = keeper
      const algo0 = (await algorand.account.getInformation(attacker.addr)).balance.microAlgo
      const tka0 = await holding(algorand, attacker.addr.toString(), tka)

      // 1. push Tinyman: sell 5,000 ALGO for TKA (Tinyman's ALGO price falls ~19%)
      const bought = await swapDirect(tm, tmAlgo, attacker.addr, 0n, 5_000_000_000n)
      // 2. trigger the backrun with a poke (no keeper tip: the attacker only pays fees)
      const pool = await dex.getPool({ args: { poolId } })
      const tmBefore = await tmState(0n)
      const plan = planModel({ rA: pool.reserveA, rB: pool.reserveB, tm: tmBefore, assetA: 0n, assetB: tka, custodyFeeBps: 30n, venue: DEFAULT_VENUE })
      expect(plan.execute).toBe(true)
      const r = await poke(poolId, attacker)
      await checkBackrun(poolId, plan, pool.reserveA, pool.reserveB, tmBefore, r)
      // 3. unwind on Tinyman: sell back exactly the TKA bought
      await swapDirect(tm, tmAlgo, attacker.addr, tka, bought)

      const algo1 = (await algorand.account.getInformation(attacker.addr)).balance.microAlgo
      const tka1 = await holding(algorand, attacker.addr.toString(), tka)
      const end = await dex.getPool({ args: { poolId } })
      // value the attacker's TKA change at our pool's final price (ALGO per TKA)
      const pnl = algo1 - algo0 + ((tka1 - tka0) * end.reserveA) / end.reserveB
      console.log(`[backrun] manipulation P&L ${pnl} µALGO; LP k ${before.reserveA * before.reserveB} → ${end.reserveA * end.reserveB}`)
      expect(pnl).toBeLessThan(0n)
      expect(end.reserveA * end.reserveB).toBeGreaterThan(before.reserveA * before.reserveB)
    })

    test('(8) swapRoute through two backrun pools', async () => {
      const { poolId: p1, escrow: e1 } = await newPool({ gapBps: 500n })
      const { poolId: p2 } = await newPool({ assetA: tka, assetB: tkb, gapBps: 500n })
      const route = [p1, p2]
      const quoted = await dex.quoteRoute({ args: { route, assetIn: 0n, amountIn: 1_000_000n, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n } })
      const pools = await Promise.all(route.map((poolId) => dex.getPool({ args: { poolId } })))
      // explicit references (populateAppCallResources mis-groups swapRoute): escrows, Tinyman pools, apps, boxes
      const boxRef = (appId: bigint, prefix: string, id: bigint) => ({ appId, name: Buffer.concat([Buffer.from(prefix), Buffer.from(itob(id))]) })
      const routeCall = (withCarriers: boolean) => {
        let group = dex.newGroup()
        if (withCarriers) {
          // reference carriers only: the Vault (HopBudget) and the hook (ensureBudget) fund their own budget
          group = (group
            .opUp({ args: [], ...callFee, sender: trader.addr, signer: trader.signer, accountReferences: [tmAlgo.address, tmAsa.address], appReferences: [tm.appId, hook.appId], assetReferences: [tka, tkb], note: 'carrier 1' })
            .opUp({
              args: [],
              ...callFee,
              sender: trader.addr,
              signer: trader.signer,
              appReferences: [hook.appId],
              boxReferences: [
                boxRef(hook.appId, 'b', p1),
                boxRef(hook.appId, 'b', p2),
                boxRef(dex.appId, 'h', p1),
                boxRef(dex.appId, 'h', p2),
                ...route.map((id) => boxRef(dex.appId, 'p', id)),
              ],
              note: 'carrier 2',
            })) as unknown as typeof group
        }
        return group.swapRoute({
          ...callFee,
          sender: trader.addr,
          signer: trader.signer,
          args: { input: transferTxn(algorand, trader, e1, 0n, 1_000_000n), route, minAmountOut: quoted!, recipient: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n },
          accountReferences: pools.map((p) => getApplicationAddress(p.escrow).toString()),
          // the (escrow, Tinyman) local-state pair of each backrun's inner appl must be in one transaction
          appReferences: [...pools.map((p) => p.escrow), tm.appId],
          assetReferences: [tka, tkb],
        })
      }
      // without carriers the hooks' references do not fit the route call, and the Vault spends its 700 before
      // its first checkpoint (amendment L8): the group fails cleanly in simulation, nothing is sent
      const bare = await routeCall(false)
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: false })
        .then(() => undefined, (error: Error) => error.message)
      console.log(`[backrun] swapRoute through 2 backrun pools without carriers: ${bare === undefined ? 'passed' : bare.slice(0, 160)}`)
      expect(bare).toMatch(/budget|unavailable|resource/i)

      const tmA = await tmState(0n)
      const tmB = await tmState(tka)
      const result = await routeCall(true).send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: false })
      const out = result.returns[result.returns.length - 1] as bigint
      expect(out).toBe(quoted)
      const appl = result.confirmations[result.confirmations.length - 1] as unknown as InnerTxn
      const events = backrunEvents(appl)
      expect(events.map((e) => e.poolId)).toEqual(route)
      console.log(`[backrun] swapRoute with 2 reference carriers: ${countInners(appl)} inner txns in the route call, ${opUps(appl, dex.appAddress.toString())[0]} Vault op-ups, ${opUps(appl, hook.appAddress.toString())[0]} hook op-ups`)
      for (const poolId of route) await assertEscrowIdentity(algorand, dex, poolId)
      expect((await tmState(0n)).reserve2).not.toBe(tmA.reserve2)
      expect((await tmState(tka)).reserve2).not.toBe(tmB.reserve2)
    })

    test('an eager install (no lazy flag) also executes', async () => {
      const { poolId } = await newPool({ gapBps: -500n, hooks: [hookInstall({ app: hook.appId, points: AFTER_SWAP | POKE, perms: CUSTODY })] })
      const pool = await dex.getPool({ args: { poolId } })
      const tmBefore = await tmState(0n)
      const plan = planModel({ rA: pool.reserveA, rB: pool.reserveB, tm: tmBefore, assetA: 0n, assetB: tka, custodyFeeBps: 30n, venue: DEFAULT_VENUE })
      expect(plan.execute).toBe(true)
      const r = await poke(poolId, keeper)
      await checkBackrun(poolId, plan, pool.reserveA, pool.reserveB, tmBefore, r)
      // eager: one custody call (rekey + call), no lazy call
      expect(appCalls(r.appl, hook.appId)).toHaveLength(1)
    })

    test('(9) kill switch: global pause and per-pool disable make the hook pass-through', async () => {
      const { poolId } = await newPool({ gapBps: 500n })
      await hook.send.setPaused({ args: { paused: true }, ...send })
      try {
        const r = await swap(poolId, 0n, 1_000_000n)
        expect(r.events).toEqual([])
        expect(r.hookCalls).toHaveLength(1)
      } finally {
        await hook.send.setPaused({ args: { paused: false }, ...send })
      }
      await hook.send.setPoolEnabled({ args: { poolId, enabled: false }, ...send })
      const r2 = await swap(poolId, 0n, 1_000_000n)
      expect(r2.events).toEqual([])
      await assertEscrowIdentity(algorand, dex, poolId)

      await hook.send.setPoolEnabled({ args: { poolId, enabled: true }, ...send })
      expect((await swapAndCheck(poolId, 0n, 1_000_000n)).plan.execute).toBe(true)
    })
  })

  describe('measurements', () => {
    type Trace = { approvalProgramTrace?: { pc: number }[]; innerTrace?: Trace[] }
    /** opcode count of every hook-app frame in a simulated group, in execution order */
    const hookFrames = (trace: Trace | undefined, txns: InnerTxn[] | undefined, out: { ops: number; pcs: number[] }[]) => {
      ;(txns ?? []).forEach((inner, i) => {
        const t = trace?.innerTrace?.[i]
        if (inner.txn.txn.applicationCall?.appIndex === hook.appId && t?.approvalProgramTrace) {
          out.push({ ops: t.approvalProgramTrace.length, pcs: t.approvalProgramTrace.map((x) => x.pc) })
        }
        hookFrames(t, inner.innerTxns, out)
      })
      return out
    }

    test('opcode budget of the skip and arbitrage paths (simulate, real budget, swap carriers only)', async () => {
      for (const gapBps of [0n, 500n]) {
        const { poolId, escrow } = await newPool({ gapBps })
        const sim = await withCarriers(trader)
          .swap({
            staticFee: microAlgo(20_000),
            sender: trader.addr,
            signer: trader.signer,
            args: { input: transferTxn(algorand, trader, escrow, 0n, 1_000_000n), poolId, minAmountOut: 0n, recipient: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n },
          })
          .simulate({ allowUnnamedResources: true, execTraceConfig: new modelsv2.SimulateTraceConfig({ enable: true }) })
        const group = sim.simulateResponse.txnGroups[0]
        expect(group.failureMessage).toBeUndefined()
        const swapResult = group.txnResults[SWAP_CARRIERS + 1]
        const inners = swapResult.txnResult.innerTxns as unknown as InnerTxn[]
        const frames = hookFrames(swapResult.execTrace as unknown as Trace, inners, [])
        const vaultOps = (swapResult.execTrace as unknown as Trace).approvalProgramTrace?.length
        const [vaultOpUps] = opUps({ innerTxns: inners }, dex.appAddress.toString())
        const [hookOpUps, hookOpUpFees] = opUps({ innerTxns: inners }, hook.appAddress.toString())
        console.log(
          `[backrun] gap ${gapBps} bps: group appBudgetConsumed ${group.appBudgetConsumed}; Vault frame ${vaultOps} ops, ${vaultOpUps} op-ups; ` +
            `hook frames ${frames.map((f) => f.ops).join(' + ')} ops, ${hookOpUps} op-ups`,
        )
        // the skip path stays at one hook call and no op-up; the arbitrage path's op-ups all come from the hook
        // (the Vault's checkpoints find enough budget): at most 2 for sizing + 2 for the custody path, all fee 0
        // (group credit, OPEN-DECISIONS #19)
        expect(hookOpUpFees).toBe(0n)
        if (gapBps === 0n) expect(vaultOpUps + hookOpUps).toBe(0)
        else {
          expect(vaultOpUps).toBe(0)
          expect(hookOpUps).toBeGreaterThan(0)
          expect(hookOpUps).toBeLessThanOrEqual(4)
        }
        if (process.env.BACKRUN_PROFILE) {
          const hist = new Map<number, number>()
          for (const f of frames) for (const pc of f.pcs) hist.set(pc, (hist.get(pc) ?? 0) + 1)
          console.log(JSON.stringify([...hist.entries()].sort((x, y) => x[0] - y[0])))
        }
      }
    })
  })

  describe('FINAL-SPEC WP3', () => {
    test('(11) custodyFeeBps = feeBps: a gap below the fees skips, a gap above executes; LP gain = model', async () => {
      // the band is γ(1−φ) ≈ 0.994 (Tinyman 30 bps, custody 30 bps): a 50 bps gap is inside it, 150 bps is
      // outside. Gaps are negative (our ALGO cheap) so the surplus is TKA.
      const { poolId: inside } = await newPool({ gapBps: -50n })
      expect((await swapAndCheck(inside, tka, 1_000n)).plan.execute).toBe(false)
      const { poolId: outside } = await newPool({ gapBps: -150n })
      const r = await swapAndCheck(outside, tka, 1_000n)
      expect(r.plan.execute).toBe(true)

      // the same 50 bps gap on a pool with custodyFeeBps = 0 is captured (the hook sizes for φ = 0)
      const { poolId: free } = await newPool({ gapBps: -50n, custodyFeeBps: 0n })
      expect((await swapAndCheck(free, tka, 1_000n)).plan.execute).toBe(true)
    })

    test('(12) stack [Backrun, VolFee]: the volatility hook records the post-arbitrage price', async () => {
      const vol = (
        await algorand.client
          .getTypedAppFactory(VolatilityFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId, filter: 30n, decay: 600n, reduction: 5_000n, control: 40_000n, maxVol: 1_000n, maxFee: 500n } })
      ).appClient
      await vol.appClient.fundAppAccount({ amount: microAlgo(200_000) })
      await dex.send.setHookApproval({ args: { hook: vol.appId, perms: DYNAMIC_FEE }, ...send })
      const VOL = hookInstall({ app: vol.appId, points: BEFORE_SWAP | AFTER_SWAP | QUOTE | POKE, perms: DYNAMIC_FEE })

      const initVol = async (poolId: bigint) => {
        await vol.send.initPool({
          args: { mbr: algorand.createTransaction.payment({ sender: admin.addr, receiver: vol.appAddress, amount: microAlgo(2_500 + 400 * 89) }), poolId },
          ...send,
        })
      }
      const stacked = await newPool({ hooks: [BACKRUN(hook.appId), VOL] })
      const control = await newPool({ hooks: [VOL], venue: null })
      for (const { poolId } of [stacked, control]) {
        await initVol(poolId)
        // seed the volatility reference at the current (Tinyman-aligned) price
        await poke(poolId, keeper, poolId === stacked.poolId ? 1n : 0n)
      }

      // an uninformed 2% trade: the backrun reverts it, so VolFee's accumulator stays near 0
      const r = await swap(stacked.poolId, 0n, 100_000_000n)
      expect(r.events).toHaveLength(1)
      await swap(control.poolId, 0n, 100_000_000n)
      const vStacked = (await vol.getState({ args: { poolId: stacked.poolId } })).vAcc
      const vControl = (await vol.getState({ args: { poolId: control.poolId } })).vAcc
      console.log(`[backrun] vAcc after an uninformed 2% trade: with backrun ${vStacked} bps, without ${vControl} bps`)
      expect(vControl).toBeGreaterThan(300n)
      expect(vStacked).toBeLessThan(100n)
      expect(vStacked * 4n).toBeLessThan(vControl)
      await assertEscrowIdentity(algorand, dex, stacked.poolId)
    })

    // (13) a swap through the router plugin on a backrun pool stays within depth: covered by
    // akita-router.e2e.spec.ts "WP3 (13) a router swap on a backrun pool runs the backrun within the call-depth limit"
  })
})
