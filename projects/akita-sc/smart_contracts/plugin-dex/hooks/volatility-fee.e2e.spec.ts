import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient } from '../../artifacts/plugin-dex/PluginDexClient'
import { BinEngineFactory } from '../../artifacts/plugin-dex/curves/bins/BinEngineClient'
import { VolatilityFeeHookClient, VolatilityFeeHookFactory, VolState } from '../../artifacts/plugin-dex/hooks/VolatilityFeeHookClient'
import { addLiquidity, assertEscrowIdentity, createPool, deployVault, hookInstall, poolConfig, transferTxn } from '../../../tests/fixtures/plugin-dex'
import { expectContractError } from '../../../tests/utils/errors'
import { TimeWarp } from '../../../tests/utils/time'
import { BinsPerChunk, chunkBoxName, encodeAddArgs, encodeInitArgs, FS, IdCenter, poolBoxName, tableBoxName } from '../../../tests/models/bins-model'

// FINAL-SPEC §5 WP3 VolatilityFeeHook; research/lvr.md §2.12 (cases 1-8) plus spec cases (9) and (10).

const BEFORE_SWAP = 32n
const AFTER_SWAP = 64n
const QUOTE = 128n
const POKE = 256n
const VOL_POINTS = BEFORE_SWAP | AFTER_SWAP | QUOTE | POKE
const DYNAMIC_FEE = 2n

const Q64 = 1n << 64n
const FEE_SCALE = 100_000_000n
/** box `v‖poolId` (9 B key) + VolState (80 B) */
const STATE_MBR = 2_500n + 400n * (9n + 80n)

const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

type Inner = { txn: { txn: { sender?: { toString(): string }; applicationCall?: { appIndex?: bigint } } } }
/** op-up inners (app creates/calls of app 0) issued by `sender` */
const opUps = (inners: Inner[], sender: string) => inners.filter((t) => t.txn.txn.sender?.toString() === sender && !t.txn.txn.applicationCall?.appIndex).length

// REFERENCE MODEL (bigint mirror of hooks/volatility-fee.algo.ts) ------------------------------------

type Params = { filter: bigint; decay: bigint; reduction: bigint; control: bigint; maxVol: bigint; maxFee: bigint }
type State = { refPrice: bigint; lastPrice: bigint; vRef: bigint; vAcc: bigint; tLast: bigint }

const VOLATILE: Params = { filter: 30n, decay: 600n, reduction: 5_000n, control: 40_000n, maxVol: 1_000n, maxFee: 500n }
/** short periods so real LocalNet time can cross them in a test */
const FAST: Params = { filter: 3n, decay: 12n, reduction: 5_000n, control: 40_000n, maxVol: 1_000n, maxFee: 500n }
/** a large A so the cap binds */
const CAPPED: Params = { filter: 30n, decay: 600n, reduction: 5_000n, control: 500_000n, maxVol: 1_000n, maxFee: 1_000n }
/** max_fee above the default pool cap (1,000) */
const HIGH: Params = { filter: 30n, decay: 600n, reduction: 5_000n, control: 500_000n, maxVol: 2_000n, maxFee: 4_000n }

const x64 = (bytes: Uint8Array) => bytes.reduce((acc, b) => (acc << 8n) | BigInt(b), 0n)
const priceX64 = (a: bigint, b: bigint) => (a === 0n ? 0n : (b << 64n) / a)
const toState = (s: VolState): State => ({ refPrice: x64(s.refPrice), lastPrice: x64(s.lastPrice), vRef: s.vRef, vAcc: s.vAcc, tLast: s.tLast })
const min = (a: bigint, b: bigint) => (a < b ? a : b)

const devRatio = (n: bigint, d: bigint, p: Params) => {
  if (n === 0n || d === 0n) return 0n
  const [hi, lo] = n > d ? [n, d] : [d, n]
  return min(((hi - lo) * 10_000n) / lo, p.maxVol)
}

const refresh = (s: State, now: bigint, p: Params) => {
  const dt = now > s.tLast ? now - s.tLast : 0n
  if (dt < p.filter) return { refPrice: s.refPrice, vRef: s.vRef }
  return { refPrice: s.lastPrice, vRef: dt >= p.decay ? 0n : (s.vAcc * p.reduction) / 10_000n }
}

/** the hook only adds to the running fee: max(running, min(running + varFee, max_fee)) */
const addFee = (running: bigint, varFee: bigint, p: Params) => (running >= p.maxFee ? running : min(running + varFee, p.maxFee))

/** fee at BeforeSwap/Quote: v at the trade's midpoint on (rA, rB) */
const modelFee = (s: State | undefined, rA: bigint, rB: bigint, inIsA: boolean, amountIn: bigint, base: bigint, now: bigint, p: Params) => {
  const seeded = s !== undefined && s.tLast !== 0n
  const ref = seeded ? refresh(s, now, p) : { refPrice: priceX64(rA, rB), vRef: 0n }
  const half = amountIn / 2n
  const [mA, mB] = inIsA ? [rA + half, rB - (half * rB) / (rA + half)] : [rA - (half * rA) / (rB + half), rB + half]
  const dev = devRatio(mB * Q64, mA * ref.refPrice, p)
  const v = min(ref.vRef + dev, p.maxVol)
  const cvv = p.control * v * v
  const varFee = cvv / FEE_SCALE + (cvv % FEE_SCALE !== 0n ? 1n : 0n)
  return { fee: addFee(base, varFee, p), v }
}

/** state after AfterSwap at reserves (rA, rB) */
const modelRecord = (s: State, rA: bigint, rB: bigint, now: bigint, p: Params): State => {
  const price = priceX64(rA, rB)
  if (s.tLast === 0n) return { refPrice: price, lastPrice: price, vRef: 0n, vAcc: 0n, tLast: now }
  const ref = refresh(s, now, p)
  return { refPrice: ref.refPrice, lastPrice: price, vRef: ref.vRef, vAcc: min(ref.vRef + devRatio(price, ref.refPrice, p), p.maxVol), tLast: now }
}

/** state after a Poke at reserves (rA, rB): seeds an unseeded box, otherwise only `lastPrice` moves */
const modelPoke = (s: State, rA: bigint, rB: bigint, now: bigint): State => {
  const price = priceX64(rA, rB)
  if (s.tLast === 0n) return { refPrice: price, lastPrice: price, vRef: 0n, vAcc: 0n, tLast: now }
  return { ...s, lastPrice: price }
}

// activeId mode (curve pools that report an active bin): |Δid|·binStep instead of the price ratio
type IdState = State & { refId: bigint; lastId: bigint; binStep: bigint }
const toIdState = (s: VolState): IdState => ({ ...toState(s), refId: s.refId, lastId: s.lastId, binStep: s.binStep })
const devId = (id: bigint, refId: bigint, binStep: bigint, p: Params) => min((id > refId ? id - refId : refId - id) * binStep, p.maxVol)
const refreshId = (s: IdState, now: bigint, p: Params) => {
  const dt = now > s.tLast ? now - s.tLast : 0n
  if (dt < p.filter) return { refPrice: s.refPrice, refId: s.refId, vRef: s.vRef }
  return { refPrice: s.lastPrice, refId: s.lastId, vRef: dt >= p.decay ? 0n : (s.vAcc * p.reduction) / 10_000n }
}
/** fee at BeforeSwap/Quote on a curve pool: v from the pre-trade active bin (or the cached spot before binStep is known) */
const modelFeeId = (s: IdState, id: bigint, price: bigint, base: bigint, now: bigint, p: Params) => {
  const seeded = s.tLast !== 0n
  const ref = seeded ? refreshId(s, now, p) : { refPrice: price, refId: id, vRef: 0n }
  const dev = seeded && s.binStep !== 0n ? devId(id, ref.refId, s.binStep, p) : devRatio(price, ref.refPrice, p)
  const v = min(ref.vRef + dev, p.maxVol)
  const cvv = p.control * v * v
  return { fee: addFee(base, cvv / FEE_SCALE + (cvv % FEE_SCALE !== 0n ? 1n : 0n), p), v }
}
/** state after AfterSwap/Poke on a curve pool at (id, price); `binStep` = the curve's hook data (0 at Poke) */
const modelRecordId = (s: IdState, id: bigint, price: bigint, binStep: bigint, now: bigint, p: Params): IdState => {
  const step = binStep !== 0n ? binStep : s.binStep
  if (s.tLast === 0n) return { refPrice: price, lastPrice: price, refId: id, lastId: id, binStep: step, vRef: 0n, vAcc: 0n, tLast: now }
  const ref = refreshId(s, now, p)
  const dev = step !== 0n ? devId(id, ref.refId, step, p) : devRatio(price, ref.refPrice, p)
  return { refPrice: ref.refPrice, lastPrice: price, refId: ref.refId, lastId: id, binStep: step, vRef: ref.vRef, vAcc: min(ref.vRef + dev, p.maxVol), tLast: now }
}

/** native CP output with no protocol fee */
const cpOut = (amountIn: bigint, rIn: bigint, rOut: bigint, feeBps: bigint) => {
  const eff = amountIn - (amountIn * feeBps) / 10_000n
  return (eff * rOut) / (rIn + eff)
}

describe('VolatilityFeeHook', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let keeper: TransactionSignerAccount
  let dex: PluginDexClient
  let tka: bigint
  let tkb: bigint

  const deployHook = async (p: Params) => {
    const hook = (
      await algorand.client
        .getTypedAppFactory(VolatilityFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId, ...p } })
    ).appClient
    await hook.appClient.fundAppAccount({ amount: microAlgo(200_000) })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms: DYNAMIC_FEE }, ...send })
    return hook
  }

  const initPool = (hook: VolatilityFeeHookClient, poolId: bigint, amount = STATE_MBR) =>
    hook.send.initPool({
      sender: trader.addr,
      signer: trader.signer,
      args: { mbr: algorand.createTransaction.payment({ sender: trader.addr, receiver: hook.appAddress, amount: microAlgo(amount) }), poolId },
      ...send,
    })

  /** ASA/ASA pool 1e12/1e12 with the hook installed (plus its state box unless `init` is false) */
  const newPool = async (hook: VolatilityFeeHookClient, { feeBps = 30n, maxFeeBps = 1_000n, init = true, reserve = 10n ** 12n } = {}) => {
    const { poolId } = await createPool({
      algorand,
      dex,
      sender: admin,
      assetA: tka,
      assetB: tkb,
      config: poolConfig(feeBps, { maxFeeBps }),
      hooks: [hookInstall({ app: hook.appId, points: VOL_POINTS, perms: DYNAMIC_FEE })],
      optInLp: [trader],
    })
    await addLiquidity(algorand, dex, trader, poolId, reserve, reserve)
    if (init) await initPool(hook, poolId)
    return poolId
  }

  const latestTimestampAt = async (round: bigint) => (await algorand.client.algod.block(round - 1n).do()).block.header.timestamp

  const state = async (hook: VolatilityFeeHookClient, poolId: bigint) => toState(await hook.getState({ args: { poolId } }))

  /**
   * Advance chain time. LocalNet runs in dev mode, where a block's timestamp never goes backwards and the
   * shared chain clock can be far ahead of the wall clock (other suites warp it), so waiting does not move
   * Global.latestTimestamp: a one-block timestamp offset does.
   */
  const warp = (seconds: bigint) => new TimeWarp(algorand).timeWarp(seconds)

  /**
   * [quote, input, swap] in one group: returns both values and the fee the model predicts for that block,
   * after checking the output, the swap event's fee and the recorded state against the model.
   */
  const quoteAndSwap = async (hook: VolatilityFeeHookClient, p: Params, poolId: bigint, assetIn: bigint, amountIn: bigint, sender = trader) => {
    const pool = await dex.getPool({ args: { poolId } })
    const before = await state(hook, poolId)
    const escrow = getApplicationAddress(pool.escrow).toString()
    const inIsA = assetIn === pool.assetA
    const result = await dex
      .newGroup()
      .quote({ maxFee: microAlgo(200_000), sender: sender.addr, signer: sender.signer, args: { poolId, assetIn, amountIn, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n } })
      .swap({
        maxFee: microAlgo(200_000),
        sender: sender.addr,
        signer: sender.signer,
        args: {
          input: transferTxn(algorand, sender, escrow, assetIn, amountIn),
          poolId,
          minAmountOut: 0n,
          recipient: ALGORAND_ZERO_ADDRESS_STRING,
          data: new Uint8Array(),
          wallet: 0n,
        },
      })
      .send(send)
    const quoted = result.returns[0] as bigint
    const out = result.returns[1] as bigint
    const now = await latestTimestampAt(BigInt(result.confirmations[0].confirmedRound!))

    const { fee, v } = modelFee(before, pool.reserveA, pool.reserveB, inIsA, amountIn, pool.feeBps, now, p)
    expect(out).toBe(cpOut(amountIn, inIsA ? pool.reserveA : pool.reserveB, inIsA ? pool.reserveB : pool.reserveA, fee))
    expect(swapEventFee(result.confirmations[result.confirmations.length - 1].logs)).toBe(fee)

    const after = await dex.getPool({ args: { poolId } })
    const recorded = await state(hook, poolId)
    expect(recorded).toEqual(modelRecord(before, after.reserveA, after.reserveB, now, p))
    await assertEscrowIdentity(algorand, dex, poolId)
    return { quoted, out, fee, v, now, state: recorded }
  }

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    trader = await localnet.context.generateAccount({ initialFunds: (300).algo() })
    keeper = await localnet.context.generateAccount({ initialFunds: (10).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (1_000).algo())

    for (const name of ['VFA', 'VFB']) {
      const { assetId } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 17n, decimals: 6, unitName: name })
      await algorand.send.assetOptIn({ sender: trader.addr, assetId })
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId, amount: 10n ** 16n })
      if (name === 'VFA') tka = assetId
      else tkb = assetId
    }
    if (tka > tkb) [tka, tkb] = [tkb, tka]

    dex = await deployVault({ algorand, sender: admin })
  })

  test('(8) create rejects bad parameters', async () => {
    const factory = algorand.client.getTypedAppFactory(VolatilityFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
    const create = (p: Partial<Params>) => factory.send.create.create({ args: { dex: dex.appId, ...VOLATILE, ...p } })
    await expectContractError(create({ filter: 600n }), 'errVfpm') // filter ≥ decay
    await expectContractError(create({ reduction: 10_001n }), 'errVfpm')
    await expectContractError(create({ maxVol: 100_001n }), 'errVfpm')
    await expectContractError(create({ maxFee: 9_001n }), 'errVfpm') // ≤ MaxPoolFeeCapBps (spec override of lvr's 1,000)
    // A · maxVol² must fit in uint64
    await expectContractError(create({ control: 184_467_440_737_096n }), 'errVfpm')
    await expectContractError(create({ control: 2n ** 40n, maxVol: 5_000n }), 'errVfpm')
    // the largest admissible A for maxVol 1,000 is accepted
    const { appClient } = await create({ control: (2n ** 64n - 1n) / 1_000_000n })
    expect(await appClient.state.global.control()).toBe((2n ** 64n - 1n) / 1_000_000n)
  })

  test('initPool: permissionless, MBR-checked, once per pool; only the DEX may call the hook', async () => {
    const hook = await deployHook(VOLATILE)
    const poolId = await newPool(hook, { init: false })
    await expectContractError(initPool(hook, poolId, STATE_MBR - 1n), 'errVfmb')
    await initPool(hook, poolId)
    await expectContractError(initPool(hook, poolId), 'errVfex')
    expect((await hook.getState({ args: { poolId } })).tLast).toBe(0n)

    // a direct call (not from the DEX) is refused
    const pool = await dex.getPool({ args: { poolId } })
    const zero16 = new Uint8Array(16)
    await expectContractError(
      hook.send.akitaDexHook({
        args: {
          dex: dex.appId,
          hookIndex: 0n,
          ctx: {
            point: AFTER_SWAP,
            poolId,
            curve: 0n,
            escrow: getApplicationAddress(pool.escrow).toString(),
            caller: admin.addr.toString(),
            callerApp: 0n,
            wallet: 0n,
            recipient: admin.addr.toString(),
            assetIn: tka,
            assetOut: tkb,
            exactIn: true,
            custody: false,
            amountIn: 1n,
            amountOut: 1n,
            reserveIn: 5n,
            reserveOut: 1n,
            lpAmount: 0n,
            lpSupply: 0n,
            positionId: 0n,
            feeBps: 30n,
            custodyFeeBps: 30n,
            before: { priceX64: zero16, activeId: 0n, liquidity: 0n, flags: 0n },
            after: { priceX64: zero16, activeId: 0n, liquidity: 0n, flags: 0n },
            curveData: new Uint8Array(),
            data: new Uint8Array(),
          },
        },
        ...send,
      }),
      'errHookCaller',
    )
    expect((await hook.getState({ args: { poolId } })).tLast).toBe(0n)
  })

  describe('quote == swap', () => {
    let hook: VolatilityFeeHookClient

    beforeAll(async () => {
      hook = await deployHook(VOLATILE)
    })

    test('(1) unseeded and seeded, both directions, in the same group', async () => {
      const poolId = await newPool(hook)
      // unseeded box: base + A·dev(mid, pre)², then the AfterSwap seeds the state
      const first = await quoteAndSwap(hook, VOLATILE, poolId, tka, 10n ** 10n)
      expect(first.quoted).toBe(first.out)
      expect(first.fee).toBe(34n) // 1% of reserves moves the midpoint ~1%: v = 100 → 30 + 4
      expect(first.state.tLast).toBe(first.now)
      expect(first.state.vAcc).toBe(0n)

      // seeded, both directions
      for (const [asset, amount] of [
        [tkb, 2n * 10n ** 10n],
        [tka, 5n * 10n ** 9n],
        [tkb, 7n * 10n ** 9n],
      ] as [bigint, bigint][]) {
        const r = await quoteAndSwap(hook, VOLATILE, poolId, asset, amount)
        expect(r.quoted).toBe(r.out)
        expect(r.state.tLast).toBe(r.now)
      }
    })

    test('(1) a pool whose state box was never created: quote == swap, impact-only fee, no box written', async () => {
      const poolId = await newPool(hook, { init: false })
      for (const asset of [tka, tkb]) {
        const pool = await dex.getPool({ args: { poolId } })
        const escrow = getApplicationAddress(pool.escrow).toString()
        const result = await dex
          .newGroup()
          .quote({ maxFee: microAlgo(200_000), sender: trader.addr, args: { poolId, assetIn: asset, amountIn: 3n * 10n ** 10n, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n } })
          .swap({
            maxFee: microAlgo(200_000),
            sender: trader.addr,
            args: {
              input: transferTxn(algorand, trader, escrow, asset, 3n * 10n ** 10n),
              poolId,
              minAmountOut: 0n,
              recipient: ALGORAND_ZERO_ADDRESS_STRING,
              data: new Uint8Array(),
              wallet: 0n,
            },
          })
          .send(send)
        expect(result.returns[0]).toBe(result.returns[1])
        const inIsA = asset === pool.assetA
        const { fee } = modelFee(undefined, pool.reserveA, pool.reserveB, inIsA, 3n * 10n ** 10n, 30n, 0n, VOLATILE)
        expect(swapEventFee(result.confirmations[2].logs)).toBe(fee)
        expect(fee).toBeGreaterThan(30n)
      }
      const boxes = await algorand.app.getBoxNames(hook.appId)
      expect(boxes.some((b) => Buffer.from(b.nameRaw).equals(Buffer.concat([Buffer.from('v'), u64(poolId)])))).toBe(false)
    })

    test('(2) a quote sent on chain runs the Quote hook and leaves the state box unchanged', async () => {
      const poolId = await newPool(hook)
      await quoteAndSwap(hook, VOLATILE, poolId, tka, 10n ** 10n)
      const before = await hook.getState({ args: { poolId } })
      const result = await dex
        .newGroup()
        .quote({ maxFee: microAlgo(200_000), sender: trader.addr, args: { poolId, assetIn: tka, amountIn: 10n ** 10n, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n } })
        .quote({ maxFee: microAlgo(200_000), sender: trader.addr, args: { poolId, assetIn: tkb, amountIn: 4n * 10n ** 10n, swapper: trader.addr.toString(), data: new Uint8Array([1]), wallet: 0n }, note: 'second' })
        .send(send)
      // really executed on chain: confirmed in a block, and the hook was called (one inner appl each)
      expect(result.confirmations[0].confirmedRound).toBeGreaterThan(0n)
      for (const c of result.confirmations) {
        const calls = (c.innerTxns ?? []).filter((inner) => inner.txn.txn.applicationCall?.appIndex === hook.appId)
        expect(calls.length).toBe(1)
      }
      expect(await hook.getState({ args: { poolId } })).toEqual(before)
    })
  })

  test('(3)+(5) burst escalation matches lvr §2.7; a buy-back toward the reference pays less', async () => {
    const hook = await deployHook(VOLATILE)
    const poolId = await newPool(hook)
    // seed at the current price with a keeper poke (no trade): ref = last = 1.0, vAcc = 0
    await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
    const seeded = await state(hook, poolId)
    expect(seeded.refPrice).toBe(Q64)
    expect(seeded.tLast).toBeGreaterThan(0n)

    // the §2.7 table (volatile preset, reserves 1e12/1e12): [fee, v used, vAcc after]. The on-chain values equal
    // the bigint model exactly (checked in quoteAndSwap);
    // the fee within 1 bp, v and vAcc within ~1% of the table's Python model (it measured against reserve ratios,
    // the hook against floored Q64.64 prices)
    const rows: [bigint, bigint, bigint, bigint, bigint][] = [
      [tka, 10n ** 10n, 34n, 100n, 200n], // sell A 1%, start of burst
      [tka, 10n ** 10n, 67n, 302n, 404n], // sell A 1% again
      [tka, 10n ** 10n, 134n, 509n, 612n], // sell A 1%, still inside the filter period
    ]
    let last = 0n
    for (const [asset, amount, fee, v, vAcc] of rows) {
      const r = await quoteAndSwap(hook, VOLATILE, poolId, asset, amount)
      expect(r.now - (last || seeded.tLast)).toBeLessThan(VOLATILE.filter) // same burst: reference fixed
      last = r.now
      expect(r.quoted).toBe(r.out)
      expect(Number(r.fee - fee)).toBeLessThanOrEqual(1)
      expect(Number(fee - r.fee)).toBeLessThanOrEqual(1)
      expect(Number(r.v - v)).toBeLessThanOrEqual(6)
      expect(Number(v - r.v)).toBeLessThanOrEqual(6)
      expect(Number(r.state.vAcc - vAcc)).toBeLessThanOrEqual(8)
      expect(Number(vAcc - r.state.vAcc)).toBeLessThanOrEqual(8)
      console.log(`[vol §2.7] fee ${r.fee} (table ${fee}), v ${r.v} (table ${v}), vAcc ${r.state.vAcc} (table ${vAcc})`)
      expect(r.state.refPrice).toBe(Q64)
    }

    // continuing away would cost more than buying back toward the reference
    const pool = await dex.getPool({ args: { poolId } })
    const s = await state(hook, poolId)
    const away = modelFee(s, pool.reserveA, pool.reserveB, true, 10n ** 10n, 30n, last, VOLATILE).fee
    const back = await quoteAndSwap(hook, VOLATILE, poolId, tkb, 3n * 10n ** 10n) // buy A back 3%
    expect(back.now - last).toBeLessThan(VOLATILE.filter)
    console.log(`[vol §2.7] buy-back fee ${back.fee} (table 67), v ${back.v} (table 301), vAcc ${back.state.vAcc} (table 5); continuing away: ${away}`)
    // the table's buy-back is "3%" of the other side; here it is 3e10 of B in, so v is a little lower
    expect(Number(back.fee)).toBeGreaterThanOrEqual(62)
    expect(Number(back.fee)).toBeLessThanOrEqual(67)
    expect(Number(back.v)).toBeGreaterThanOrEqual(280)
    expect(Number(back.v)).toBeLessThanOrEqual(305)
    // the trade ends near the reference, so the accumulator collapses
    expect(back.state.vAcc).toBeLessThan(25n)
    expect(back.fee).toBeLessThan(away)
    expect(away).toBeGreaterThan(134n)
  })

  test('(4) reference reset after the filter period, decay to R·vAcc, and to 0 after the decay period', async () => {
    const hook = await deployHook(FAST)
    const poolId = await newPool(hook)
    await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
    // wait past the filter period (3 s) but inside the decay period (12 s). The chain clock is shared with
    // other suites that may warp it concurrently, so retry until the step really landed inside the window.
    let a = await quoteAndSwap(hook, FAST, poolId, tka, 3n * 10n ** 10n)
    let b = a
    for (let attempt = 0; attempt < 4; attempt++) {
      if (attempt > 0) a = await quoteAndSwap(hook, FAST, poolId, tka, 3n * 10n ** 10n)
      expect(a.state.vAcc).toBeGreaterThan(0n)
      await warp(5n)
      b = await quoteAndSwap(hook, FAST, poolId, tka, 10n ** 10n)
      if (b.now - a.now >= FAST.filter && b.now - a.now < FAST.decay) break
    }
    expect(b.now - a.now).toBeGreaterThanOrEqual(FAST.filter)
    expect(b.now - a.now).toBeLessThan(FAST.decay)
    // the reference moved to the price after the previous swap and v carried R · vAcc
    expect(b.state.refPrice).toBe(a.state.lastPrice)
    expect(b.state.vRef).toBe((a.state.vAcc * FAST.reduction) / 10_000n)
    expect(b.state.vRef).toBeGreaterThan(0n)
    expect(b.quoted).toBe(b.out)

    // wait past the decay period: the volatility reference resets to 0
    await warp(13n)
    const c = await quoteAndSwap(hook, FAST, poolId, tkb, 10n ** 10n)
    expect(c.now - b.now).toBeGreaterThanOrEqual(FAST.decay)
    expect(c.state.vRef).toBe(0n)
    expect(c.state.refPrice).toBe(b.state.lastPrice)
    expect(c.quoted).toBe(c.out)
  }, 60_000)

  test('(6) the fee is capped at max_fee and the DEX never sees more than the pool allows', async () => {
    const capped = await deployHook(CAPPED)
    const poolId = await newPool(capped)
    // a whale trade: v hits max_vol, 30 + A·v²/1e8 = 5,030 → clamped to 1,000
    const whale = await quoteAndSwap(capped, CAPPED, poolId, tka, 2n * 10n ** 11n)
    expect(whale.v).toBe(CAPPED.maxVol)
    expect(whale.fee).toBe(CAPPED.maxFee)
    expect(whale.quoted).toBe(whale.out)

    // a preset whose max_fee exceeds the pool's maxFeeBps makes the Vault refuse the fee (errPdfe):
    // the SDK must create such pools with maxFeeBps ≥ max_fee (FINAL-SPEC §5 WP3)
    const high = await deployHook(HIGH)
    const tooLow = await newPool(high, { maxFeeBps: 1_000n })
    const pool = await dex.getPool({ args: { poolId: tooLow } })
    await expectContractError(
      dex.send.swap({
        sender: trader.addr,
        args: {
          input: transferTxn(algorand, trader, getApplicationAddress(pool.escrow).toString(), tka, 2n * 10n ** 11n),
          poolId: tooLow,
          minAmountOut: 0n,
          recipient: ALGORAND_ZERO_ADDRESS_STRING,
          data: new Uint8Array(),
          wallet: 0n,
        },
        ...send,
      }),
      'errPdfe',
    )
    const ok = await newPool(high, { maxFeeBps: HIGH.maxFee })
    const r = await quoteAndSwap(high, HIGH, ok, tka, 2n * 10n ** 11n)
    expect(r.fee).toBe(HIGH.maxFee)
    expect(r.quoted).toBe(r.out)
  })

  test('(10) a keeper poke refreshes `last` to the current price; the next swap promotes it to the reference', async () => {
    const hook = await deployHook(FAST)
    const poolId = await newPool(hook)
    // no box: poke is a no-op that never reverts
    const unboxed = await newPool(hook, { init: false })
    await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId: unboxed, hookIndex: 0n, data: new Uint8Array() }, ...send })

    const a = await quoteAndSwap(hook, FAST, poolId, tka, 3n * 10n ** 10n)
    // a direct transfer to the escrow + sync moves the price without a swap
    const pool = await dex.getPool({ args: { poolId } })
    await algorand.send.assetTransfer({ sender: trader.addr, receiver: getApplicationAddress(pool.escrow).toString(), assetId: tka, amount: 2n * 10n ** 10n })
    await dex.send.sync({ sender: keeper.addr, signer: keeper.signer, args: { poolId }, ...send })
    await warp(4n)

    const before = await state(hook, poolId)
    const result = await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
    const now = await latestTimestampAt(BigInt(result.confirmation.confirmedRound!))
    const synced = await dex.getPool({ args: { poolId } })
    const after = await state(hook, poolId)
    expect(after).toEqual(modelPoke(before, synced.reserveA, synced.reserveB, now))
    expect(after.lastPrice).toBe(priceX64(synced.reserveA, synced.reserveB))
    expect(after.lastPrice).not.toBe(a.state.lastPrice)
    // the accumulator clock, the reference and the volatility state only move on swaps
    expect(after.tLast).toBe(a.now)
    expect(after.refPrice).toBe(a.state.refPrice)
    expect([after.vRef, after.vAcc]).toEqual([a.state.vRef, a.state.vAcc])
    expect(now - a.now).toBeGreaterThanOrEqual(FAST.filter)

    // the next quote and swap see the poked price as the new reference
    const b = await quoteAndSwap(hook, FAST, poolId, tkb, 10n ** 10n)
    expect(b.quoted).toBe(b.out)
    expect(b.state.refPrice).toBe(after.lastPrice)
  }, 30_000)

  test('(stabilize) repeated permissionless pokes cannot decay the accumulator or freeze the reference', async () => {
    const hook = await deployHook(VOLATILE)
    const poolId = await newPool(hook)
    await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
    // a whale moves the price: vAcc is large
    const whale = await quoteAndSwap(hook, VOLATILE, poolId, tka, 5n * 10n ** 10n)
    expect(whale.state.vAcc).toBeGreaterThan(400n)

    // an arbitrageur pokes 4 times, each after a filter period: before the fix each poke multiplied vRef by R
    for (let i = 0; i < 4; i++) {
      await warp(VOLATILE.filter + 1n)
      await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
      expect(await state(hook, poolId)).toEqual(whale.state)
    }

    // the next trade carries R·vAcc of the whale's move (one decay step from the last swap), as LB would
    const next = await quoteAndSwap(hook, VOLATILE, poolId, tka, 10n ** 9n)
    expect(next.now - whale.now).toBeGreaterThanOrEqual(VOLATILE.filter)
    if (next.now - whale.now < VOLATILE.decay) {
      expect(next.state.vRef).toBe((whale.state.vAcc * VOLATILE.reduction) / 10_000n)
      expect(next.v).toBeGreaterThanOrEqual(next.state.vRef)
      // 4 poke-driven decays would have left vRef = R⁴·vAcc
      expect(next.state.vRef).toBeGreaterThan((whale.state.vAcc * VOLATILE.reduction ** 4n) / 10_000n ** 4n)
    }
    expect(next.quoted).toBe(next.out)
  }, 60_000)

  test('(stabilize) never lowers a running fee above max_fee; clamps only its own contribution', async () => {
    const hook = await deployHook(VOLATILE)
    // base fee 800 > max_fee 500 (an earlier AntiSnipe/ImpactFee stand-in): a whale trade still pays 800
    const high = await newPool(hook, { feeBps: 800n })
    const whale = await quoteAndSwap(hook, VOLATILE, high, tka, 2n * 10n ** 11n)
    expect(whale.v).toBe(VOLATILE.maxVol)
    expect(whale.fee).toBe(800n)
    expect(whale.quoted).toBe(whale.out)
    // base 450 below max_fee: 450 + A·v² is clamped to max_fee
    const low = await newPool(hook, { feeBps: 450n })
    const capped = await quoteAndSwap(hook, VOLATILE, low, tka, 2n * 10n ** 11n)
    expect(capped.fee).toBe(VOLATILE.maxFee)
  })

  test('(9) a bins pool through the activeId path: |Δid|·binStep, the same v and fee as a native pool with the same move', async () => {
    const BIN_STEP = 25n
    const hook = await deployHook(VOLATILE)

    // the WP2 BinEngine as the pool's curve (LpModeCurve), through the real Vault
    const engine = (
      await algorand.client
        .getTypedAppFactory(BinEngineFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { vault: dex.appId }, extraProgramPages: 3 })
    ).appClient
    await engine.appClient.fundAppAccount({ amount: (0.5).algo() })
    await engine.send.initBinStep({
      args: { mbr: algorand.createTransaction.payment({ sender: admin.addr, receiver: engine.appAddress, amount: microAlgo(1_000_000) }), binStep: BIN_STEP },
      ...send,
    })
    await dex.send.setCurveApproval({ args: { curve: engine.appId, lpMode: 1n, approved: true }, ...send })
    const initArgs = encodeInitArgs({
      binStep: BIN_STEP,
      activeId: IdCenter,
      baseFactor: 10_000n,
      // no native variable fee: the hook's fee is the only one (req.feeBps overrides the base fee)
      varFeeControl: 0n,
      filterPeriod: 30n,
      decayPeriod: 600n,
      reductionFactor: 5_000n,
      maxVa: 350_000n,
      minBinShares: 1n << 32n, // the BinEngine floor (errBnMs below 2^32)
      maxBinsPerSwap: 64n,
    })
    const { poolId: bins } = await createPool({
      algorand,
      dex,
      sender: admin,
      assetA: tka,
      assetB: tkb,
      config: poolConfig(30n, { maxFeeBps: 1_000n, curve: engine.appId, curveMbr: 1_000_000n, curveArgs: initArgs }),
      hooks: [hookInstall({ app: hook.appId, points: VOL_POINTS, perms: DYNAMIC_FEE })],
      payment: 5_000_000n,
    })
    // 1e9 of Y in each bin −10..0 and 1e9 of X in each bin 0..10 (both sides on the active bin)
    const binsEscrow = getApplicationAddress((await dex.getPool({ args: { poolId: bins } })).escrow).toString()
    const dist = Array.from({ length: 21 }, (_, i) => BigInt(i) - 10n).map((delta) => ({
      delta,
      distX: delta >= 0n ? FS / 11n : 0n,
      distY: delta <= 0n ? FS / 11n : 0n,
    }))
    // The add needs 9 references on one app call: the Vault's pool box, the engine's pool, table, position and
    // two chunk boxes (bins −10..−1 sit in chunk IdCenter/32 − 1, 0..10 in IdCenter/32), the engine and escrow
    // apps, and the engine's account (reported once the engine's op-up path runs under simulate's real budget).
    // algokit only spreads references over app calls already in the group, so an engine.opUp() reference
    // carrier (below 8,192 B: no read quota of its own) holds the engine boxes explicitly, as in bins.e2e.spec.ts.
    const centerChunk = IdCenter / BinsPerChunk
    const addGroup = algorand.newGroup()
    addGroup.addAppCallMethodCall(
      await engine.params.opUp({
        sender: trader.addr,
        signer: trader.signer,
        args: [],
        note: 'reference carrier',
        boxReferences: [poolBoxName(bins), tableBoxName(BIN_STEP), chunkBoxName(bins, centerChunk - 1n), chunkBoxName(bins, centerChunk)].map((name) => ({
          appId: engine.appId,
          name,
        })),
        maxFee: send.maxFee,
      }),
    )
    addGroup.addAppCallMethodCall(
      await dex.params.addLiquidityCurve({
        sender: trader.addr,
        signer: trader.signer,
        args: {
          mbr: algorand.createTransaction.payment({ sender: trader.addr, receiver: dex.appAddress, amount: microAlgo(3_000_000) }),
          depositA: transferTxn(algorand, trader, binsEscrow, tka, 11n * 10n ** 9n),
          depositB: transferTxn(algorand, trader, binsEscrow, tkb, 11n * 10n ** 9n),
          poolId: bins,
          positionId: 0n,
          minShares: 0n,
          curveArgs: encodeAddArgs(IdCenter, 0n, dist),
          data: new Uint8Array(),
        },
        maxFee: send.maxFee,
      }),
    )
    await addGroup.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
    await initPool(hook, bins)
    const native = await newPool(hook)

    const idState = async (poolId: bigint) => toIdState(await hook.getState({ args: { poolId } }))
    const poke = async (poolId: bigint) => {
      const result = await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
      return latestTimestampAt(BigInt(result.confirmation.confirmedRound!))
    }
    /**
     * [carrier, quote, input, swap] on the bins pool, checked against the activeId model. The carrier is for
     * budget: the curve Quote drains the group's pool and the Vault's swap reaches runHooks before its first
     * checkpoint (amendment L8).
     */
    const binsQuoteAndSwap = async (assetIn: bigint, amountIn: bigint) => {
      const pool = await dex.getPool({ args: { poolId: bins } })
      const before = await idState(bins)
      const result = await dex
        .newGroup()
        .opUp({ args: [], maxFee: microAlgo(200_000), sender: trader.addr, signer: trader.signer, note: `carrier ${Math.random()}` })
        .quote({ maxFee: microAlgo(200_000), sender: trader.addr, signer: trader.signer, args: { poolId: bins, assetIn, amountIn, swapper: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n } })
        .swap({
          maxFee: microAlgo(200_000),
          sender: trader.addr,
          signer: trader.signer,
          args: { input: transferTxn(algorand, trader, binsEscrow, assetIn, amountIn), poolId: bins, minAmountOut: 0n, recipient: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n },
        })
        .send(send)
      const now = await latestTimestampAt(BigInt(result.confirmations[0].confirmedRound!))
      const { fee, v } = modelFeeId(before, pool.activeId, x64(pool.priceX64), pool.feeBps, now, VOLATILE)
      const appl = result.confirmations[result.confirmations.length - 1]
      expect(swapEventFee(appl.logs)).toBe(fee)
      const [quoted, out] = result.returns.slice(-2) as unknown as bigint[]
      expect(quoted).toBe(out)
      const after = await dex.getPool({ args: { poolId: bins } })
      const recorded = await idState(bins)
      expect(recorded).toEqual(modelRecordId(before, after.activeId, x64(after.priceX64), BIN_STEP, now, VOLATILE))
      await assertEscrowIdentity(algorand, dex, bins)
      return { fee, v, out, now, state: recorded, startId: pool.activeId, endId: after.activeId }
    }

    // seed both at the current price; on the bins pool the poke stores refId = activeId (binStep still unknown)
    for (const poolId of [bins, native]) {
      const s = await idState(poolId)
      const pool = await dex.getPool({ args: { poolId } })
      const now = await poke(poolId)
      const seeded = await idState(poolId)
      if (poolId === bins) {
        expect(seeded).toEqual(modelRecordId(s, IdCenter, x64(pool.priceX64), 0n, now, VOLATILE))
        expect(seeded.refId).toBe(IdCenter)
      } else {
        expect(toState(await hook.getState({ args: { poolId } }))).toEqual(modelRecord(s, pool.reserveA, pool.reserveB, now, VOLATILE))
      }
    }

    // a sell of X that crosses several bins: the record learns binStep from the hook data and v = |Δid|·binStep
    const move = await binsQuoteAndSwap(tka, 45n * 10n ** 8n)
    const crossed = move.startId - move.endId
    expect(crossed).toBeGreaterThanOrEqual(2n)
    expect(move.fee).toBe(30n) // pre-trade bin == reference: base fee only
    expect(move.state).toMatchObject({ binStep: BIN_STEP, refId: IdCenter, lastId: move.endId, vAcc: crossed * BIN_STEP })

    // the native pool, moved by the same number of bps: the smallest sell whose recorded deviation is crossed·binStep
    const target = crossed * BIN_STEP
    const np = await dex.getPool({ args: { poolId: native } })
    const ns = toState(await hook.getState({ args: { poolId: native } }))
    const recordedDev = (x: bigint) => {
      const { fee } = modelFee(ns, np.reserveA, np.reserveB, true, x, np.feeBps, ns.tLast, VOLATILE)
      return devRatio(priceX64(np.reserveA + x, np.reserveB - cpOut(x, np.reserveA, np.reserveB, fee)), ns.refPrice, VOLATILE)
    }
    let lo = 1n
    let hi = np.reserveA
    while (lo < hi) {
      const mid = (lo + hi) / 2n
      if (recordedDev(mid) >= target) hi = mid
      else lo = mid + 1n
    }
    expect(recordedDev(lo)).toBe(target)
    const nativeMove = await quoteAndSwap(hook, VOLATILE, native, tka, lo)
    expect(nativeMove.state.vAcc).toBe(move.state.vAcc)

    // the next small trade back toward the reference pays the same fee on both pools
    const binsNext = await binsQuoteAndSwap(tkb, 10n ** 6n)
    const nativeNext = await quoteAndSwap(hook, VOLATILE, native, tkb, 10n ** 6n)
    console.log(
      `[vol (9)] bins: crossed ${crossed} bins of ${BIN_STEP} bps → vAcc ${move.state.vAcc}; native: sell ${lo} → vAcc ${nativeMove.state.vAcc}; ` +
        `next fee bins ${binsNext.fee} (v ${binsNext.v}), native ${nativeNext.fee} (v ${nativeNext.v})`,
    )
    // both fees were checked exactly against the model for the block they landed in; the cross-pool equality
    // below needs both trades inside the filter period, which a concurrent suite's clock warp can break
    if (binsNext.now - move.now < VOLATILE.filter && nativeNext.now - nativeMove.now < VOLATILE.filter) {
      expect(binsNext.v).toBe(target)
      expect(nativeNext.fee).toBe(binsNext.fee)
      expect(binsNext.fee).toBe(30n + (VOLATILE.control * target * target + FEE_SCALE - 1n) / FEE_SCALE)
    } else {
      console.warn('[vol (9)] shared LocalNet clock moved past the filter period between trades: cross-pool check skipped')
    }
  }, 60_000)

  /**
   * Budget, not references: the simulated lone swap (allowUnnamedResources lifts only the reference limits)
   * proves the opcode budget and inner-transaction slots need no carrier. The sent swap mirrors core-v2
   * "(12) inner transaction pool": algokit 9.2.2 adds the asset again for every asset holding it places, so a
   * hooked swap can overflow the 8 references of one call once the Vault needs a third box ref for its read
   * quota (FINAL-SPEC §10 A11, box sizes vary). One opUp() reference carrier goes first; it issues no inner
   * transaction.
   */
  test('budget: a lone swap (no other app call in the group) and a lone poke need no carrier for budget or inner slots; the hook issues no op-up', async () => {
    const hook = await deployHook(VOLATILE)
    const poolId = await newPool(hook)
    const pool = await dex.getPool({ args: { poolId } })
    const escrow = getApplicationAddress(pool.escrow).toString()
    // seed, then a moved state so every branch of fee() and record() runs
    await dex.send.poke({ sender: keeper.addr, signer: keeper.signer, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
    for (const [assetIn, amountIn] of [
      [tka, 10n ** 10n],
      [tkb, 3n * 10n ** 9n],
    ] as const) {
      const sim = await dex
        .newGroup()
        .swap({
          staticFee: microAlgo(20_000),
          sender: trader.addr,
          signer: trader.signer,
          args: { input: transferTxn(algorand, trader, escrow, assetIn, amountIn), poolId, minAmountOut: 0n, recipient: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n },
        })
        .simulate({ allowUnnamedResources: true, allowMoreLogging: true })
      const group = sim.simulateResponse.txnGroups[0]
      expect(group.failureMessage).toBeUndefined()
      expect(group.txnResults).toHaveLength(2)
      const inners = (group.txnResults[1].txnResult.innerTxns ?? []) as unknown as Inner[]
      console.log(`[vol budget] lone swap: group appBudgetConsumed ${group.appBudgetConsumed}, Vault inners ${inners.length}, Vault op-ups ${opUps(inners, dex.appAddress.toString())}`)
      expect(opUps(inners, hook.appAddress.toString())).toBe(0)
      const result = await dex
        .newGroup()
        .opUp({ args: [], maxFee: send.maxFee, sender: trader.addr, signer: trader.signer, note: `reference carrier ${Math.random()}` })
        .swap({
          maxFee: send.maxFee,
          sender: trader.addr,
          signer: trader.signer,
          args: { input: transferTxn(algorand, trader, escrow, assetIn, amountIn), poolId, minAmountOut: 0n, recipient: ALGORAND_ZERO_ADDRESS_STRING, data: new Uint8Array(), wallet: 0n },
        })
        .send(send)
      // [reference carrier, input, swap]: the carrier holds references only and issues no inner transaction
      expect(result.transactions).toHaveLength(3)
      expect((result.confirmations[0] as unknown as { innerTxns?: unknown[] }).innerTxns ?? []).toHaveLength(0)
      expect(opUps((result.confirmations[2] as unknown as { innerTxns?: Inner[] }).innerTxns ?? [], hook.appAddress.toString())).toBe(0)
    }
    expect((await state(hook, poolId)).vAcc).toBeGreaterThan(0n)
  })

  test('(7) stack [Backrun, VolFee]: covered in backrun-arb.e2e.spec.ts "(12)"', () => {
    expect(true).toBe(true)
  })
})

const u64 = (n: bigint) => {
  const out = Buffer.alloc(8)
  out.writeBigUInt64BE(n)
  return out
}

/** feeBps of the SwapEvent (ARC-28: 4-byte selector + 104-byte tuple; feeBps at tuple offset 72) */
function swapEventFee(logs: Uint8Array[] | undefined): bigint {
  const swapLogs = (logs ?? []).filter((log) => log.length === 108)
  if (swapLogs.length !== 1) throw new Error(`expected one SwapEvent log, found ${swapLogs.length}`)
  return Buffer.from(swapLogs[0]).readBigUInt64BE(4 + 72)
}
