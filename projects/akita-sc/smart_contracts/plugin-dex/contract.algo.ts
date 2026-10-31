import {
  Account,
  Application,
  Asset,
  BigUint,
  BoxMap,
  Bytes,
  bytes,
  clone,
  Contract,
  contract,
  emit,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  OpUpFeeSource,
  TransactionType,
  Txn,
  Uint64,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import {
  BpsDivisor,
  CurveFlagBonding,
  CurveFlagClose,
  CurveOpAdd,
  CurveOpInit,
  CurveOpQuote,
  CurveOpRemove,
  CurveOpSettle,
  CurveOpSwap,
  HookFlagLazyCustody,
  HookFlagsAll,
  HookPermAll,
  HookPermCustody,
  HookPermDynamicFee,
  HookPermExternal,
  HookPermHookFee,
  HookPermHookFeeOut,
  HookPointAfterAddLiquidity,
  HookPointAfterInitialize,
  HookPointAfterRemoveLiquidity,
  HookPointAfterSwap,
  HookPointAll,
  HookPointBeforeAddLiquidity,
  HookPointBeforeRemoveLiquidity,
  HookPointBeforeSwap,
  HookPointPoke,
  HookPointQuote,
  HookResultRequestCustody,
  HookResultSetFee,
  LPAssetDecimals,
  LPAssetName,
  LPAssetTotal,
  LPAssetUnitName,
  LpModeCurve,
  LpModeFungible,
  MaxExternalCapBps,
  MaxExternalSlots,
  MaxFeeBps,
  MaxHookFeeBps,
  MaxHooksPerPool,
  MaxPoolFeeCapBps,
  MaxPoolsPerPair,
  MaxProtocolFeeBps,
  MaxRouteHops,
  MinimumLiquidity,
  PluginDexBoxPrefixApprovedHooks,
  PluginDexBoxPrefixCurveApprovals,
  PluginDexBoxPrefixExternalSlots,
  PluginDexBoxPrefixPairPools,
  PluginDexBoxPrefixPoolHooks,
  PluginDexBoxPrefixPools,
  PluginDexBoxPrefixValuatorApprovals,
  PluginDexGlobalStateKeyAdmin,
  PluginDexGlobalStateKeyPoolCursor,
  PluginDexGlobalStateKeyProtocolFeeBps,
  PluginDexGlobalStateKeyTreasury,
  PluginDexGlobalStateKeyVersion,
  RateScale,
  SecondsPerDay,
} from './constants'
import {
  errAdminOnly,
  errAssetNotInPool,
  errCurveNotApproved,
  errCurveViolation,
  errCustodyInvariant,
  errExternalCap,
  errExternalConfig,
  errGraduation,
  errHookFeeTooHigh,
  errHookNotApproved,
  errHookPermission,
  errInsufficientLiquidity,
  errInvalidFee,
  errInvalidHookConfig,
  errInvalidInput,
  errInvalidPayment,
  errInvalidPool,
  errInvalidRoute,
  errLaunchState,
  errLpMode,
  errMissingRekeyBack,
  errPoolNotFound,
  errPoolNotPaused,
  errPoolPaused,
  errSlippage,
  errTooManyHooks,
  errValuatorUnavailable,
  errVersionMismatch,
} from './errors'
import {
  addSigned,
  applySigned,
  mulDiv,
  mulDivUp,
  priceX64,
  q64One,
  SignedDelta,
  signedDelta,
  sqrtProduct,
  zeroX64,
} from './math'
import {
  CurveApproval,
  CurveLiquidityResult,
  CurveSnapshot,
  CustodyEvent,
  ExternalExitEvent,
  ExternalMarkEvent,
  ExternalSlot,
  ExternalSlotConfig,
  GraduationEvent,
  HookApproval,
  HookConfig,
  HookContext,
  HookInstall,
  HookResult,
  LiquidityEvent,
  PairKey,
  PoolConfig,
  PoolInfo,
  RemoveResult,
  SwapEvent,
  SwapResult,
} from './types'

// CONTRACT IMPORTS
import { Escrow } from '../escrow/contract.algo'
import type { CurveRequest, CurveResult, PluginDexCurve } from './curve-interface'
import type { PluginDexHook } from './hook-interface'
import type { PluginDexValuator } from './valuator-interface'

/** opcode budget reserved for each additional hop of a route */
const HopBudget: uint64 = 500
/**
 * Opcode budget checkpoints around hook calls (WP1 budget fix). A hook call adds 700 to the group pool,
 * but the hook spends it on its own program, so the Vault tops its own frame up with GroupCredit
 * op-ups (fee 0, paid from the caller's fee credit) instead of relying on caller carriers. Each
 * checkpoint covers the Vault's work until the next one (measured in WP1, MockDexHook):
 * - HookPreBudget: one iteration up to the inner call (context, custody snapshot + flash rekey,
 *   ABI encoding): ~180 custody, ~100 plain.
 * - HookResultBudget / CustodyGuardBudget: after the call returns: result checks (~100), plus for
 *   custody the balance measurement, guard and booking (~375 with a mixed, k-checked delta).
 * - HookTailBudget: after the stack ran, the rest of the operation until the next checkpoint (swap
 *   math + AfterSwap context ~300, or an operation's tail: persist, event, payouts ~170-300).
 * A hookless operation never reaches a checkpoint: a native hookless swap stays at ~510 opcodes.
 */
const HookPreBudget: uint64 = 200
const HookResultBudget: uint64 = 150
const CustodyGuardBudget: uint64 = 450
const HookTailBudget: uint64 = 400
/**
 * opcode budget ensured right after every curve call (WP1-M2): the Vault's own work after the call
 * (§4.5 checks, booking, persist, event, payouts) measured at ≤ 334 opcodes with MockCurve. A curve that
 * spends its whole 700 (or more, with its own op-ups) must not starve the Vault's tail.
 */
const CurveResultBudget: uint64 = 400
/** opcode budget ensured when an inline sync books a surplus: the booking plus the rest of an add/remove */
const SyncBudget: uint64 = 500
/**
 * opcode budget ensured after every valuator call (M4): the clip, the booking of one slot and its event,
 * and the rest of the operation that triggered the mark (custody guard, add/remove tail).
 */
const MarkBudget: uint64 = 400
/** opcode budget for one slot's in-kind exit (pro-rata, receipt transfer, event) and the slot write-back */
const ExitBudget: uint64 = 300
/**
 * opcode budget ensured before an add refunds the unused part of a deposit: the LP mint, one or two ASA refunds,
 * the event and the return. An off-ratio add on a two-ASA hookless pool otherwise ends just past 700 (review M-1).
 */
const RefundBudget: uint64 = 300
/** opcode budget for validating one HookInstall in createPool */
const ValidateHookBudget: uint64 = 300
/**
 * §10 A27: the largest maxMarkupBpsPerDay / maxMarkdownBpsPerDay a slot may declare (10% of the booked
 * rate per day each way; OPEN-DECISIONS, decided 2026-10-31). A larger markdown clip would let a short
 * valuator dip be booked permissionlessly by `revalue`, which is the write-down-then-mint-cheap path the
 * clip exists to stop; at 10%/day an hour of dip books at most ~0.4%.
 */
const MaxClipBpsPerDay: uint64 = 1_000
const MaxUint64: uint64 = Uint64(18_446_744_073_709_551_615n)

type Deposit = {
  asset: uint64
  amount: uint64
}

/**
 * Valuator value of the marked external slots above their clipped book, per side (§10 A26). The book
 * stays clipped, but a mint must pay for this value: an LP leaves with the receipts in kind.
 */
type Unbooked = {
  a: uint64
  b: uint64
}

/** Pricing outcome of one hook stack run. Reserves changed by custody hooks are written to `pool` in place. */
type HookRun = {
  feeBps: uint64
  hookFees: uint64
  hookFeeOutBps: uint64
  hookFeeOutApp: uint64
}

/**
 * Placeholder context for hookless pools. It is never sent to a hook and never written to (every
 * ctx write is guarded by a hook-point check), so it only needs the right type: no per-field encoding.
 */
function emptyContext(): HookContext {
  return decodeArc4<HookContext>(op.bzero(1))
}

/**
 * §4.7 clip band floor(floor(rate·bps/1e4)·dt/day), saturated at 2^64 − 1 (§10 A27): dt grows without limit
 * while a slot is not marked, and a mark must never fail on the band's size.
 */
function clipBand(rate: uint64, bps: uint64, dt: uint64): uint64 {
  const [hi, lo] = op.mulw(mulDiv(rate, bps, BpsDivisor), dt)
  return hi < SecondsPerDay ? op.divw(hi, lo, SecondsPerDay) : MaxUint64
}

/**
 * PluginDex v2: the Vault (FINAL-SPEC §4).
 *
 * The Vault is the only app that moves pool funds. Every pool's reserves live in their own child
 * Escrow account, rekeyed to this app. Pools price with either the native constant-product curve
 * (optionally with virtual launch offsets) or an approved, version-pinned curve app. Each pool carries
 * an ordered, version-pinned hook stack. A custody hook gets the escrow flash-rekeyed to it for the
 * duration of its call; the Vault books the measured balance change through the custody guard (§4.6):
 * the change must be at least as good for LPs as a trade paying `custodyFeeBps`.
 *
 * STATUS (WP1 complete, M1-M5; ARCHITECTURE.md): the native constant-product core (v1 behaviour), hook stacks v2 (pinning, lazy
 * custody, HookFeeOut, F6 funding/initData), poke, sync (+ inline sync before add/remove), quotes with
 * swapper/data, tryQuoteRoute, repeated-pool rejection, the native custody guard (M1), the curve slot
 * (M2: fungible-curve add/remove, curve-managed positions, every §4.5 check, Settle under custody
 * behind the L2 floor, the Vault-side emergency exit of fungible curve pools) and launch pools (M3:
 * VCPMM offsets, initializeLaunch with locked LP, in-place graduation with exact price continuity, no LP
 * operations while bonding) and external positions (M4: slots declared at creation, receipt snapshots of
 * every slot around every custody call, clipped valuator marks, revalue, the paused-only write-down,
 * in-kind exits, the illiquid-reserve bound) are implemented and tested (plugin-dex.e2e.spec.ts,
 * core-v2.e2e.spec.ts, curve-slot.e2e.spec.ts, launch.e2e.spec.ts, external.e2e.spec.ts). The Vault tops
 * up its own opcode budget around hooks, after every curve call and after every valuator call
 * (GroupCredit op-ups, FINAL-SPEC §10 A12, A14, A21). M5 added no Vault code: ConsensusKeyregHook
 * (hooks/consensus-keyreg.algo.ts) runs on the existing Poke + lazy custody path.
 */
@contract({ avmVersion: 13 })
export class PluginDex extends Contract {
  version = GlobalState<string>({ key: PluginDexGlobalStateKeyVersion })
  admin = GlobalState<Account>({ key: PluginDexGlobalStateKeyAdmin })
  poolCursor = GlobalState<uint64>({ key: PluginDexGlobalStateKeyPoolCursor })
  /** share of the LP fee routed to the treasury, in bps of the LP fee */
  protocolFeeBps = GlobalState<uint64>({ key: PluginDexGlobalStateKeyProtocolFeeBps })
  treasury = GlobalState<Account>({ key: PluginDexGlobalStateKeyTreasury })

  pools = BoxMap<uint64, PoolInfo>({ keyPrefix: PluginDexBoxPrefixPools })
  /** ordered, version-pinned hook stack per pool, fixed at creation */
  poolHooks = BoxMap<uint64, HookConfig[]>({ keyPrefix: PluginDexBoxPrefixPoolHooks })
  /** external position slots per pool, declared at creation */
  externalSlots = BoxMap<uint64, ExternalSlot[]>({ keyPrefix: PluginDexBoxPrefixExternalSlots })
  /** pair -> pool ids, the on-chain index routers enumerate */
  pairPools = BoxMap<PairKey, uint64[]>({ keyPrefix: PluginDexBoxPrefixPairPools })
  /** hook app -> {max permissions, approved version} */
  approvedHooks = BoxMap<uint64, HookApproval>({ keyPrefix: PluginDexBoxPrefixApprovedHooks })
  /** curve app -> {approved version, lpMode} */
  approvedCurves = BoxMap<uint64, CurveApproval>({ keyPrefix: PluginDexBoxPrefixCurveApprovals })
  /** valuator app -> approved version */
  approvedValuators = BoxMap<uint64, uint64>({ keyPrefix: PluginDexBoxPrefixValuatorApprovals })

  // LIFECYCLE ------------------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, admin: Account): void {
    this.version.value = version
    this.admin.value = admin
    this.poolCursor.value = 0
    this.protocolFeeBps.value = 0
    this.treasury.value = admin
  }

  /** no-op carrier for extra opcode budget and resource references */
  opUp(): void {}

  // PRIVATE: ACCESS & STATE ----------------------------------------------------------------------

  private requireAdmin(): void {
    loggedAssert(Txn.sender === this.admin.value, errAdminOnly)
  }

  private loadPool(poolId: uint64): PoolInfo {
    loggedAssert(this.pools(poolId).exists, errPoolNotFound)
    return clone(this.pools(poolId).value)
  }

  private escrowOf(pool: PoolInfo): Account {
    return Application(pool.escrow).address
  }

  private bonding(pool: PoolInfo): boolean {
    return (pool.virtualA | pool.virtualB) !== 0
  }

  /** fungible pools: LP issued; curve-managed pools (no Vault LP): booked reserves */
  private hasLiquidity(pool: PoolInfo): boolean {
    return pool.lpSupply > 0 || (pool.reserveA | pool.reserveB) !== 0
  }

  // PRIVATE: TRANSFERS ---------------------------------------------------------------------------

  /** Spendable amount of `asset` held by `account`; ALGO excludes the minimum balance */
  private holding(account: Account, asset: uint64): uint64 {
    if (asset === 0) {
      return account.balance - account.minBalance
    }
    const [balance, optedIn] = op.AssetHolding.assetBalance(account, asset)
    return optedIn ? balance : 0
  }

  private send(sender: Account, receiver: Account, asset: uint64, amount: uint64): void {
    if (asset === 0) {
      itxn.payment({ sender, receiver, amount }).submit()
    } else {
      itxn.assetTransfer({ sender, assetReceiver: receiver, xferAsset: asset, assetAmount: amount }).submit()
    }
  }

  /**
   * Validate an ALGO or ASA transfer into `receiver`. ABI transaction arguments are
   * always the transactions immediately before this call, so a deposit can only be
   * consumed by one DEX call.
   */
  private readDeposit(txn: gtxn.Transaction, receiver: Account): Deposit {
    loggedAssert(txn.rekeyTo === Global.zeroAddress, errInvalidInput)

    if (txn.type === TransactionType.Payment) {
      loggedAssert(txn.receiver === receiver, errInvalidInput)
      loggedAssert(txn.closeRemainderTo === Global.zeroAddress, errInvalidInput)
      loggedAssert(txn.amount > 0, errInvalidInput)
      return { asset: 0, amount: txn.amount }
    }

    loggedAssert(txn.type === TransactionType.AssetTransfer, errInvalidInput)
    loggedAssert(txn.assetReceiver === receiver, errInvalidInput)
    loggedAssert(txn.assetCloseTo === Global.zeroAddress, errInvalidInput)
    loggedAssert(txn.assetSender === Global.zeroAddress, errInvalidInput)
    loggedAssert(txn.assetAmount > 0, errInvalidInput)
    return { asset: txn.xferAsset.id, amount: txn.assetAmount }
  }

  // PRIVATE: SNAPSHOTS & CONTEXT -----------------------------------------------------------------

  /**
   * Curve-agnostic snapshot. Native pools compute the spot from effective reserves (§4.10). Curve pools
   * return the cached price/activeId only: `liquidity` and `flags` are not cached in PoolInfo, so they
   * are 0 here (ctx.before); ctx.after carries the curve's full snapshot after a curve call (§10, A4).
   */
  private snapshot(pool: PoolInfo): CurveSnapshot {
    if (pool.curve !== 0) {
      return { priceX64: pool.priceX64, activeId: pool.activeId, liquidity: 0, flags: 0 }
    }
    return {
      priceX64: priceX64(pool.reserveA + pool.virtualA, pool.reserveB + pool.virtualB),
      activeId: 0,
      liquidity: 0,
      flags: this.bonding(pool) ? CurveFlagBonding : 0,
    }
  }

  private context(
    poolId: uint64,
    pool: PoolInfo,
    caller: Account,
    wallet: uint64,
    recipient: Account,
    assetIn: uint64,
    assetOut: uint64,
    amountIn: uint64,
    amountOut: uint64,
    lpAmount: uint64,
    data: bytes,
  ): HookContext {
    // hookless pools never build a context: keeps the plain swap/liquidity paths within 700 opcodes
    if (pool.hookPoints === 0) {
      return emptyContext()
    }
    const snap = this.snapshot(pool)
    return {
      point: 0,
      poolId,
      curve: pool.curve,
      escrow: this.escrowOf(pool),
      caller,
      callerApp: Global.callerApplicationId,
      wallet,
      recipient,
      assetIn,
      assetOut,
      exactIn: true,
      custody: false,
      amountIn,
      amountOut,
      reserveIn: 0,
      reserveOut: 0,
      lpAmount,
      lpSupply: pool.lpSupply,
      positionId: 0,
      feeBps: pool.feeBps,
      custodyFeeBps: pool.custodyFeeBps,
      before: clone(snap),
      after: clone(snap),
      curveData: Bytes(''),
      data,
    }
  }

  // PRIVATE: CURVE SLOT (§4.5) --------------------------------------------------------------------

  private curveRequest(curveOp: uint64, poolId: uint64, pool: PoolInfo): CurveRequest {
    return {
      op: curveOp,
      poolId,
      owner: Txn.sender,
      positionId: 0,
      inIsA: true,
      negA: false,
      negB: false,
      amountIn: 0,
      amountA: 0,
      amountB: 0,
      lpAmount: 0,
      lpSupply: pool.lpSupply,
      feeBps: pool.feeBps,
      maxFeeBps: pool.maxFeeBps,
      protocolFeeBps: this.protocolFeeBps.value,
      reserveA: pool.reserveA,
      reserveB: pool.reserveB,
      args: Bytes(''),
    }
  }

  /** pinned curve call (Swap, Quote, Remove, Settle); tops up the budget for the Vault's work after it */
  private callCurve(pool: PoolInfo, req: CurveRequest): CurveResult {
    const r = abiCall<typeof PluginDexCurve.prototype.akitaDexCurve>({
      appId: pool.curve,
      args: [req],
      rejectVersion: pool.curveVersion + 1,
    }).returnValue
    ensureBudget(CurveResultBudget, OpUpFeeSource.GroupCredit)
    return r
  }

  /** pinned funded call (Init, Add) grouped with a payment of `mbr` µALGO from the Vault to the curve */
  private callCurveFunded(pool: PoolInfo, req: CurveRequest, mbr: uint64): CurveResult {
    const r = abiCall<typeof PluginDexCurve.prototype.akitaDexCurveFunded>({
      appId: pool.curve,
      args: [itxn.payment({ receiver: Application(pool.curve).address, amount: mbr }), req],
      rejectVersion: pool.curveVersion + 1,
    }).returnValue
    ensureBudget(CurveResultBudget, OpUpFeeSource.GroupCredit)
    return r
  }

  /**
   * §4.5 Add: at most the deposits are used, the curve's aggregate grows by exactly the used amounts, the
   * price does not move and the curve kept no more MBR than forwarded. Fungible curves: the LP mint bound
   * (pro-rata of the scarcer side, or sqrt(usedA·usedB) − MinimumLiquidity on the first deposit).
   */
  private curveAdd(
    poolId: uint64,
    pool: PoolInfo,
    depA: uint64,
    depB: uint64,
    positionId: uint64,
    args: bytes,
    mbr: uint64,
  ): CurveResult {
    const req = this.curveRequest(CurveOpAdd, poolId, pool)
    req.positionId = positionId
    req.amountA = depA
    req.amountB = depB
    req.args = args
    const r = this.callCurveFunded(pool, req, mbr)
    loggedAssert(r.amountA <= depA && r.amountB <= depB && r.mbrUsed <= mbr, errCurveViolation)
    loggedAssert(
      r.reserveA === pool.reserveA + r.amountA &&
        r.reserveB === pool.reserveB + r.amountB &&
        r.snapshot.priceX64 === pool.priceX64,
      errCurveViolation,
    )
    if (pool.lpMode === LpModeFungible) {
      let bound: uint64
      if (pool.lpSupply === 0) {
        const liquidity = sqrtProduct(r.amountA, r.amountB)
        loggedAssert(liquidity > MinimumLiquidity, errInsufficientLiquidity)
        bound = liquidity - MinimumLiquidity
      } else {
        const fromA = mulDiv(r.amountA, pool.lpSupply, pool.reserveA)
        const fromB = mulDiv(r.amountB, pool.lpSupply, pool.reserveB)
        bound = fromA < fromB ? fromA : fromB
      }
      loggedAssert(r.shares <= bound, errCurveViolation)
    }
    return r
  }

  /**
   * §4.5 Remove: the payout comes out of booked reserves only, the curve's aggregate falls by exactly the
   * payout and the price does not move. Fungible curves: exactly the LP burned, at most pro-rata.
   */
  private curveRemove(poolId: uint64, pool: PoolInfo, lpAmount: uint64, positionId: uint64, args: bytes): CurveResult {
    const req = this.curveRequest(CurveOpRemove, poolId, pool)
    req.lpAmount = lpAmount
    req.positionId = positionId
    req.args = args
    const r = this.callCurve(pool, req)
    loggedAssert(r.amountA <= pool.reserveA && r.amountB <= pool.reserveB, errCurveViolation)
    loggedAssert(
      r.reserveA === pool.reserveA - r.amountA &&
        r.reserveB === pool.reserveB - r.amountB &&
        r.snapshot.priceX64 === pool.priceX64,
      errCurveViolation,
    )
    if (pool.lpMode === LpModeFungible) {
      loggedAssert(
        r.shares === lpAmount &&
          r.amountA <= mulDiv(lpAmount, pool.reserveA, pool.lpSupply) &&
          r.amountB <= mulDiv(lpAmount, pool.reserveB, pool.lpSupply),
        errCurveViolation,
      )
    }
    return r
  }

  /** §4.5 Swap/Quote checks: input consumed exactly, fee bounds, aggregate cross-check, price band */
  private checkSwapResult(pool: PoolInfo, req: CurveRequest, r: CurveResult, rIn: uint64, rOut: uint64): void {
    loggedAssert(r.amountIn === req.amountIn && r.amountOut < rOut, errCurveViolation)
    loggedAssert(r.lpFee <= mulDivUp(req.amountIn, pool.maxFeeBps, BpsDivisor), errCurveViolation)
    loggedAssert(
      mulDiv(r.lpFee, req.protocolFeeBps, BpsDivisor) <= r.protocolFee && r.protocolFee <= r.lpFee,
      errCurveViolation,
    )

    const newIn: uint64 = rIn + req.amountIn - r.protocolFee
    const newOut: uint64 = rOut - r.amountOut
    if (req.inIsA) {
      loggedAssert(r.reserveA === newIn && r.reserveB === newOut, errCurveViolation)
    } else {
      loggedAssert(r.reserveB === newIn && r.reserveA === newOut, errCurveViolation)
    }

    // price band (+1 unit tolerance for Q128 -> Q64 flooring)
    const p0 = BigUint(pool.priceX64)
    const p1 = BigUint(r.snapshot.priceX64)
    const one = q64One()
    const net = BigUint(req.amountIn - r.lpFee)
    if (req.inIsA) {
      loggedAssert(BigUint(r.amountOut) * one <= net * p0 + one && p1 <= p0, errCurveViolation)
    } else {
      loggedAssert(BigUint(r.amountOut) * p0 <= net * one + p0 && p1 >= p0, errCurveViolation)
    }
  }

  // PRIVATE: CUSTODY GUARD (§4.6) ----------------------------------------------------------------

  /**
   * Book a measured balance change of the pool's liquid reserves. Both ≥ 0 is a donation. Both ≤ 0
   * (non-zero) fails. A mixed change must be at least as good as a trade paying `custodyFeeBps`:
   * native pools check the fee-adjusted k on effective reserves; curve pools check the L2 value floor
   * at the cached spot and then `Settle` through the curve.
   */
  private bookDelta(poolId: uint64, pool: PoolInfo, dA: SignedDelta, dB: SignedDelta): void {
    if (dA.mag === 0 && dB.mag === 0) {
      return
    }
    // both ≤ 0 (≠ 0) is a pure loss: never bookable (`neg` is false for a zero magnitude)
    loggedAssert(!(dA.neg && dB.neg), errCustodyInvariant)
    // from here at most one side is negative
    const mixed = dA.neg || dB.neg
    const gainIsA = !dA.neg
    const gain: uint64 = gainIsA ? dA.mag : dB.mag
    const loss: uint64 = gainIsA ? dB.mag : dA.mag
    if (mixed) {
      // a loss needs a gain on the other side, and may only come out of LP-owned liquid funds
      const liquidLoss: uint64 = gainIsA ? pool.reserveB - pool.externalB : pool.reserveA - pool.externalA
      loggedAssert(gain > 0 && loss <= liquidLoss, errCustodyInvariant)
    }

    const newA = applySigned(pool.reserveA, dA)
    const newB = applySigned(pool.reserveB, dB)

    if (pool.curve === 0) {
      if (mixed) {
        const eGain: uint64 = gainIsA ? pool.reserveA + pool.virtualA : pool.reserveB + pool.virtualB
        const eLoss: uint64 = gainIsA ? pool.reserveB + pool.virtualB : pool.reserveA + pool.virtualA
        const fee = mulDivUp(gain, pool.custodyFeeBps, BpsDivisor)
        loggedAssert(eGain > 0 && eLoss > 0, errCustodyInvariant)
        loggedAssert(
          BigUint(eGain + gain - fee) * BigUint(eLoss - loss) >= BigUint(eGain) * BigUint(eLoss),
          errCustodyInvariant,
        )
      }
    } else {
      // L2 value floor at the pre-call spot, then Settle (feasible at custodyFeeBps) + the §4.5 checks
      const p0 = BigUint(pool.priceX64)
      const one = q64One()
      if (mixed) {
        loggedAssert(
          BigUint(newA) * p0 + BigUint(newB) * one >= BigUint(pool.reserveA) * p0 + BigUint(pool.reserveB) * one,
          errCustodyInvariant,
        )
      }
      const req = this.curveRequest(CurveOpSettle, poolId, pool)
      req.negA = dA.neg
      req.negB = dB.neg
      req.amountA = dA.mag
      req.amountB = dB.mag
      req.feeBps = pool.custodyFeeBps
      const r = this.callCurve(pool, req)
      loggedAssert(r.reserveA === newA && r.reserveB === newB, errCurveViolation)
      const p1 = BigUint(r.snapshot.priceX64)
      if (mixed) {
        loggedAssert(gainIsA ? p1 <= p0 : p1 >= p0, errCurveViolation)
      }
      pool.priceX64 = r.snapshot.priceX64
      pool.activeId = r.snapshot.activeId
    }

    pool.reserveA = newA
    pool.reserveB = newB
  }

  // PRIVATE: HOOKS -------------------------------------------------------------------------------

  /**
   * Validate installs and pin each hook's approved version. Order (v1 parity): points/perms/flags
   * shape → approval exists → perms ⊆ approval → current version == approved version → permission
   * dependencies → pricing needs Quote → duplicates.
   */
  private validateHooks(hooks: HookInstall[]): HookConfig[] {
    loggedAssert(hooks.length <= MaxHooksPerPool, errTooManyHooks)

    const configs: HookConfig[] = []
    let feeOutHooks: uint64 = 0
    for (let i: uint64 = 0; i < hooks.length; i += 1) {
      ensureBudget(ValidateHookBudget, OpUpFeeSource.GroupCredit)
      const hook = clone(hooks[i])
      loggedAssert(hook.points !== 0 && (hook.points | HookPointAll) === HookPointAll, errInvalidHookConfig)
      loggedAssert(
        (hook.perms | HookPermAll) === HookPermAll && (hook.flags | HookFlagsAll) === HookFlagsAll,
        errInvalidHookConfig,
      )

      loggedAssert(this.approvedHooks(hook.app).exists, errHookNotApproved)
      const approval = clone(this.approvedHooks(hook.app).value)
      loggedAssert((hook.perms | approval.perms) === approval.perms, errHookNotApproved)
      loggedAssert(Application(hook.app).version === approval.version, errVersionMismatch)

      const custody = (hook.perms & HookPermCustody) !== 0
      loggedAssert(
        custody || ((hook.flags & HookFlagLazyCustody) === 0 && (hook.perms & HookPermExternal) === 0),
        errInvalidHookConfig,
      )
      if ((hook.perms & HookPermHookFeeOut) !== 0) {
        feeOutHooks += 1
      }

      // a hook that can change what a swap pays must also answer quotes, so quotes stay honest
      const pricing: uint64 = HookPermDynamicFee | HookPermHookFee | HookPermHookFeeOut
      if ((hook.perms & pricing) !== 0 && (hook.points & HookPointBeforeSwap) !== 0) {
        loggedAssert((hook.points & HookPointQuote) !== 0, errInvalidHookConfig)
      }

      // compare against the static configs: reading hooks[j] (dynamic elements) is O(j) each
      for (let j: uint64 = 0; j < i; j += 1) {
        loggedAssert(configs[j].app !== hook.app, errInvalidHookConfig)
      }

      configs.push({
        app: hook.app,
        version: approval.version,
        points: hook.points,
        perms: hook.perms,
        flags: hook.flags,
      })
    }
    loggedAssert(feeOutHooks <= 1, errInvalidHookConfig)
    return clone(configs)
  }

  /** pinned hook call; `postBudget` is the opcode budget ensured for the Vault's work after it returns */
  private callHook(hook: HookConfig, index: uint64, ctx: HookContext, postBudget: uint64): HookResult {
    const result = abiCall<typeof PluginDexHook.prototype.akitaDexHook>({
      appId: hook.app,
      args: [Global.currentApplicationId, index, ctx],
      rejectVersion: hook.version + 1,
    }).returnValue
    ensureBudget(postBudget, OpUpFeeSource.GroupCredit)
    return result
  }

  /** One custody call: snapshot, flash rekey, call (pinned), require the rekey back, book the delta. */
  private custodyCall(
    poolId: uint64,
    pool: PoolInfo,
    hook: HookConfig,
    index: uint64,
    ctx: HookContext,
    point: uint64,
  ): HookResult {
    const escrow = this.escrowOf(pool)
    const liqA = this.holding(escrow, pool.assetA)
    const liqB = this.holding(escrow, pool.assetB)
    // §4.6: the receipt units of EVERY external slot (MaxExternalSlots = 2), whatever the hook's permissions
    let slots: ExternalSlot[] = []
    let held0: uint64 = 0
    let held1: uint64 = 0
    if (pool.externalSlots > 0) {
      slots = clone(this.externalSlots(poolId).value)
      held0 = this.holding(escrow, slots[0].receipt)
      if (slots.length > 1) held1 = this.holding(escrow, slots[1].receipt)
    }

    itxn.payment({ sender: escrow, receiver: escrow, amount: 0, rekeyTo: Application(hook.app).address }).submit()
    const result = this.callHook(hook, index, ctx, CustodyGuardBudget)
    loggedAssert(escrow.authAddress === Global.currentApplicationAddress, errMissingRekeyBack)

    let dA = signedDelta(liqA, this.holding(escrow, pool.assetA))
    let dB = signedDelta(liqB, this.holding(escrow, pool.assetB))
    // a changed receipt balance is re-marked (only by the slot's own External hook). §10 A25: the revaluation
    // of the units already held (unitsOld·(rateNew − rateOld)) is booked straight into the reserve as revalue
    // does (gain = donation, loss lowers it); only the value of the measured unit change is folded into the
    // side's delta, so the hook can neither take accrued yield nor be blocked by a pending markdown
    let grown: uint64 = 0
    let revA: SignedDelta = { mag: 0, neg: false }
    let revB: SignedDelta = { mag: 0, neg: false }
    for (let s: uint64 = 0; s < slots.length; s += 1) {
      const slot = clone(slots[s])
      const was: uint64 = s === 0 ? held0 : held1
      const now = this.holding(escrow, slot.receipt)
      if (now !== was) {
        loggedAssert(slot.hook === hook.app && (hook.perms & HookPermExternal) !== 0, errHookPermission)
        // §4.7 mark: the live valuator rate v (> 0, errPdva) clipped to the slot's band, r'
        const live = this.liveRate(pool, slot)
        const rate = this.clipRate(slot, live)
        const held = mulDiv(slot.units, rate, RateScale)
        let rev = signedDelta(slot.bookValue, held)
        slot.bookValue = held
        // units move by the measured change (receipts awaiting an in-kind payout are already unbooked)
        const moved = signedDelta(was, now)
        slot.units = applySigned(slot.units, moved)
        if (now > was) grown = grown | (s + 1)
        // conservative valuation (OPEN-DECISIONS #4): the guard values units leaving at max(v, r') and units
        // entering at min(v, r'). The gap floor(Δu·|v − r'|) when the clip binds against the hook is taken out
        // of the guard's delta and booked as a donation, so the book (units at r') is unchanged and the hook
        // cannot keep a recall's unbooked markup or a deposit's over-booking
        const gap: uint64 = moved.neg ? (live > rate ? live - rate : 0) : live < rate ? rate - live : 0
        const skim = mulDiv(moved.mag, gap, RateScale)
        rev = addSigned(rev, { mag: skim, neg: false })
        const d = addSigned(this.bookSlot(poolId, slot, s, rate), { mag: skim, neg: true })
        if (slot.side === 0) {
          revA = addSigned(revA, rev)
          dA = addSigned(dA, d)
        } else {
          revB = addSigned(revB, rev)
          dB = addSigned(dB, d)
        }
        slots[s] = clone(slot)
      }
    }
    if (pool.externalSlots > 0) {
      // the revaluation moves the reserve and its external part together: the liquid book is unchanged
      pool.reserveA = applySigned(pool.reserveA, revA)
      pool.externalA = applySigned(pool.externalA, revA)
      pool.reserveB = applySigned(pool.reserveB, revB)
      pool.externalB = applySigned(pool.externalB, revB)
    }
    this.bookDelta(poolId, pool, dA, dB)
    if (pool.externalSlots > 0) {
      this.storeSlots(poolId, pool, slots)
      // cap (§4.6): a slot whose units grew may hold at most capBps of its side's booked reserve
      for (let s: uint64 = 0; s < slots.length; s += 1) {
        if ((grown & (s + 1)) !== 0) {
          const reserve: uint64 = slots[s].side === 0 ? pool.reserveA : pool.reserveB
          loggedAssert(slots[s].bookValue <= mulDiv(slots[s].capBps, reserve, BpsDivisor), errExternalCap)
        }
      }
    }

    emit<CustodyEvent>({
      poolId,
      hook: hook.app,
      point,
      deltaA: dA.mag,
      negA: dA.neg,
      deltaB: dB.mag,
      negB: dB.neg,
      reserveA: pool.reserveA,
      reserveB: pool.reserveB,
    })
    return result
  }

  /**
   * Run the pool's hook stack (or only hook `only`; MaxHooksPerPool = all) for one point. Custody
   * hooks book their balance changes straight into `pool`. Hook fees are paid out of the escrow
   * immediately at BeforeSwap and only accumulated at Quote. Fee fields are ignored at Poke.
   */
  private runHooks(
    poolId: uint64,
    pool: PoolInfo,
    point: uint64,
    base: HookContext,
    inIsA: boolean,
    only: uint64,
  ): HookRun {
    // hookless pools pass a placeholder `base` (emptyContext): never read it before this check
    const run: HookRun = { feeBps: pool.feeBps, hookFees: 0, hookFeeOutBps: 0, hookFeeOutApp: 0 }
    if ((pool.hookPoints & point) === 0) {
      // a hooked pool that skips this point's stack still owes the post-stack checkpoint: the work up to
      // its next point (e.g. swap math into an AfterSwap-only stack) would otherwise run on whatever is
      // left of 700 (L8). Hookless pools never reach a checkpoint.
      if (pool.hookPoints !== 0) ensureBudget(HookTailBudget, OpUpFeeSource.GroupCredit)
      return run
    }
    run.feeBps = base.feeBps

    const hooks = clone(this.poolHooks(poolId).value)
    const pricingPoint = point === HookPointBeforeSwap || point === HookPointQuote

    for (let i: uint64 = 0; i < hooks.length; i += 1) {
      const hook = clone(hooks[i])
      if ((hook.points & point) === 0 || (only !== MaxHooksPerPool && only !== i)) {
        continue
      }

      ensureBudget(HookPreBudget, OpUpFeeSource.GroupCredit)
      const ctx = clone(base)
      ctx.point = point
      ctx.feeBps = run.feeBps
      const effA: uint64 = pool.reserveA + pool.virtualA
      const effB: uint64 = pool.reserveB + pool.virtualB
      ctx.reserveIn = inIsA ? effA : effB
      ctx.reserveOut = inIsA ? effB : effA

      const wantsCustody = (hook.perms & HookPermCustody) !== 0 && point !== HookPointQuote
      let custody = wantsCustody && (hook.flags & HookFlagLazyCustody) === 0
      let result: HookResult = { flags: 0, feeBps: 0, hookFee: 0, hookFeeOutBps: 0 }
      if (!custody) {
        // non-custody hooks, and the lazy first call (ctx.custody = false)
        result = this.callHook(hook, i, ctx, HookResultBudget)
        custody = wantsCustody && (result.flags & HookResultRequestCustody) !== 0
      }
      if (custody) {
        ctx.custody = true
        result = this.custodyCall(poolId, pool, hook, i, ctx, point)
      }

      if (point === HookPointPoke) {
        continue
      }

      if ((result.flags & HookResultSetFee) !== 0) {
        loggedAssert(pricingPoint && (hook.perms & HookPermDynamicFee) !== 0, errHookPermission)
        loggedAssert(result.feeBps <= pool.maxFeeBps, errInvalidFee)
        run.feeBps = result.feeBps
      }

      if (result.hookFee > 0 || result.hookFeeOutBps > 0) {
        loggedAssert(pricingPoint, errHookPermission)
        if (result.hookFee > 0) {
          loggedAssert((hook.perms & HookPermHookFee) !== 0, errHookPermission)
          run.hookFees += result.hookFee
        }
        if (result.hookFeeOutBps > 0) {
          loggedAssert((hook.perms & HookPermHookFeeOut) !== 0, errHookPermission)
          run.hookFeeOutBps = result.hookFeeOutBps
          run.hookFeeOutApp = hook.app
        }
        loggedAssert(
          mulDivUp(run.hookFees, BpsDivisor, base.amountIn) + run.hookFeeOutBps <= pool.maxHookFeeBps,
          errHookFeeTooHigh,
        )
        if (point === HookPointBeforeSwap && result.hookFee > 0) {
          this.send(this.escrowOf(pool), Application(hook.app).address, base.assetIn, result.hookFee)
        }
      }
    }

    ensureBudget(HookTailBudget, OpUpFeeSource.GroupCredit)
    return run
  }

  // PRIVATE: EXTERNAL POSITIONS (§4.7) -----------------------------------------------------------

  /** the slot's pinned valuator rate (underlying per receipt unit × RateScale; 0 = unavailable) */
  private valuatorRate(slot: ExternalSlot, underlying: uint64): uint64 {
    const v = abiCall<typeof PluginDexValuator.prototype.akitaDexRate>({
      appId: slot.valuator,
      args: [slot.receipt, underlying],
      rejectVersion: slot.valuatorVersion + 1,
    }).returnValue
    ensureBudget(MarkBudget, OpUpFeeSource.GroupCredit)
    return v
  }

  /** the slot's unclipped valuator rate, which must be > 0 (errPdva) */
  private liveRate(pool: PoolInfo, slot: ExternalSlot): uint64 {
    const v = this.valuatorRate(slot, slot.side === 0 ? pool.assetA : pool.assetB)
    loggedAssert(v > 0, errValuatorUnavailable)
    return v
  }

  /**
   * §4.7 mark: `v` clipped to [rate − down, rate + up] around the slot's booked rate, where up and down grow
   * linearly with the time since the last mark. dt == 0 freezes the rate within a block.
   */
  private clipRate(slot: ExternalSlot, v: uint64): uint64 {
    const dt: uint64 = Global.latestTimestamp - slot.lastMark
    const up = clipBand(slot.rate, slot.maxMarkupBpsPerDay, dt)
    const down = clipBand(slot.rate, slot.maxMarkdownBpsPerDay, dt)
    const low: uint64 = slot.rate - (down < slot.rate ? down : slot.rate)
    // saturating rate + up (§10 A27)
    const high: uint64 = up < MaxUint64 - slot.rate ? slot.rate + up : MaxUint64
    return v < low ? low : v > high ? high : v
  }

  /** Book `slot` at `rate` now (bookValue = floor(units·rate/RateScale)); returns the bookValue change */
  private bookSlot(poolId: uint64, slot: ExternalSlot, index: uint64, rate: uint64): SignedDelta {
    const value = mulDiv(slot.units, rate, RateScale)
    const d = signedDelta(slot.bookValue, value)
    slot.rate = rate
    slot.bookValue = value
    slot.lastMark = Global.latestTimestamp
    emit<ExternalMarkEvent>({ poolId, slot: index, units: slot.units, rate, bookValue: value })
    return d
  }

  /**
   * Write the slots back and recompute externalA/B = Σ bookValue per side. Booked liquid funds
   * (reserve − external) can never go negative: that would mean protocol fees or locked funds were spent.
   */
  private storeSlots(poolId: uint64, pool: PoolInfo, slots: ExternalSlot[]): void {
    let extA: uint64 = 0
    let extB: uint64 = 0
    for (let s: uint64 = 0; s < slots.length; s += 1) {
      if (slots[s].side === 0) {
        extA += slots[s].bookValue
      } else {
        extB += slots[s].bookValue
      }
    }
    loggedAssert(pool.reserveA >= extA && pool.reserveB >= extB, errCustodyInvariant)
    pool.externalA = extA
    pool.externalB = extB
    this.externalSlots(poolId).value = clone(slots)
  }

  /**
   * Re-mark every slot holding units (`revalue` and the inline revalue before add/remove). Gains are
   * donations, losses reduce reserves; both are bounded by the per-day clips. Empty slots are not marked
   * (no valuator call): their first mark under custody is clipped over the whole time since the last one.
   * Returns the valuator value the clip left unbooked, per side, which a mint prices in (§10 A26).
   */
  private revalueCore(poolId: uint64, pool: PoolInfo): Unbooked {
    let upA: uint64 = 0
    let upB: uint64 = 0
    if (pool.externalSlots === 0) {
      return { a: upA, b: upB }
    }
    const slots = clone(this.externalSlots(poolId).value)
    let dA: SignedDelta = { mag: 0, neg: false }
    let dB: SignedDelta = { mag: 0, neg: false }
    for (let s: uint64 = 0; s < slots.length; s += 1) {
      const slot = clone(slots[s])
      if (slot.units === 0) {
        continue
      }
      const v = this.liveRate(pool, slot)
      const d = this.bookSlot(poolId, slot, s, this.clipRate(slot, v))
      const live = mulDiv(slot.units, v, RateScale)
      const up: uint64 = live > slot.bookValue ? live - slot.bookValue : 0
      if (slot.side === 0) {
        dA = addSigned(dA, d)
        upA += up
      } else {
        dB = addSigned(dB, d)
        upB += up
      }
      slots[s] = clone(slot)
    }
    pool.reserveA = applySigned(pool.reserveA, dA)
    pool.reserveB = applySigned(pool.reserveB, dB)
    this.storeSlots(poolId, pool, slots)
    return { a: upA, b: upB }
  }

  /**
   * In-kind exit (§4.4): for every slot holding units, pay floor(lp·units/S) receipt units to the LP and
   * take the booked value of exactly those units, ceil(bookValue·paid/units), out of the slot and its side's
   * reserve (§10 A28): an exit paying 0 units takes 0 value, and the unpaid fraction of a unit stays with the
   * pool. Called before the LP supply is reduced. Emits one ExternalExitEvent per slot with units > 0 (§10 A6).
   */
  private exitInKind(poolId: uint64, pool: PoolInfo, lpAmount: uint64): void {
    const slots = clone(this.externalSlots(poolId).value)
    const escrow = this.escrowOf(pool)
    for (let s: uint64 = 0; s < slots.length; s += 1) {
      const slot = clone(slots[s])
      if (slot.units === 0) {
        continue
      }
      ensureBudget(ExitBudget, OpUpFeeSource.GroupCredit)
      const units = mulDiv(lpAmount, slot.units, pool.lpSupply)
      // §10 A28: rounded up, so the remaining book never exceeds the remaining units' share of it
      const value = mulDivUp(slot.bookValue, units, slot.units)
      slot.units -= units
      slot.bookValue -= value
      if (slot.side === 0) {
        pool.reserveA -= value
      } else {
        pool.reserveB -= value
      }
      slots[s] = clone(slot)
      if (units > 0) this.send(escrow, Txn.sender, slot.receipt, units)
      emit<ExternalExitEvent>({ poolId, slot: s, receipt: slot.receipt, recipient: Txn.sender, units, value })
    }
    this.storeSlots(poolId, pool, slots)
  }

  /**
   * createPool step 5 (§4.2): at most MaxExternalSlots slots, each with side ∈ {0,1}, a distinct receipt
   * that is neither pool asset and has no clawback or freeze address (an issuer could otherwise take or lock LP
   * value outside the custody guard), capBps ≤ MaxExternalCapBps, both clips ≤ MaxClipBpsPerDay (§10 A27), a
   * hook installed with External (which implies Custody), and an approved valuator at its approved version
   * that quotes a rate > 0 now.
   */
  private validateExternals(
    assetA: uint64,
    assetB: uint64,
    externals: ExternalSlotConfig[],
    configs: HookConfig[],
  ): ExternalSlot[] {
    loggedAssert(externals.length <= MaxExternalSlots, errExternalConfig)
    const slots: ExternalSlot[] = []
    for (let s: uint64 = 0; s < externals.length; s += 1) {
      const ext = clone(externals[s])
      loggedAssert(
        ext.side <= 1 &&
          ext.receipt !== 0 &&
          ext.receipt !== assetA &&
          ext.receipt !== assetB &&
          ext.capBps <= MaxExternalCapBps &&
          ext.maxMarkupBpsPerDay <= MaxClipBpsPerDay &&
          ext.maxMarkdownBpsPerDay <= MaxClipBpsPerDay,
        errExternalConfig,
      )
      const receipt = Asset(ext.receipt)
      loggedAssert(receipt.clawback === Global.zeroAddress && receipt.freeze === Global.zeroAddress, errExternalConfig)
      for (let j: uint64 = 0; j < s; j += 1) {
        loggedAssert(slots[j].receipt !== ext.receipt, errExternalConfig)
      }
      let external = false
      for (let i: uint64 = 0; i < configs.length; i += 1) {
        if (configs[i].app === ext.hook && (configs[i].perms & HookPermExternal) !== 0) {
          external = true
        }
      }
      loggedAssert(external && this.approvedValuators(ext.valuator).exists, errExternalConfig)
      const version = this.approvedValuators(ext.valuator).value
      loggedAssert(Application(ext.valuator).version === version, errVersionMismatch)

      const slot: ExternalSlot = {
        hook: ext.hook,
        valuator: ext.valuator,
        valuatorVersion: version,
        side: ext.side,
        receipt: ext.receipt,
        capBps: ext.capBps,
        maxMarkupBpsPerDay: ext.maxMarkupBpsPerDay,
        maxMarkdownBpsPerDay: ext.maxMarkdownBpsPerDay,
        units: 0,
        rate: 0,
        bookValue: 0,
        lastMark: Global.latestTimestamp,
      }
      slot.rate = this.valuatorRate(slot, ext.side === 0 ? assetA : assetB)
      loggedAssert(slot.rate > 0, errValuatorUnavailable)
      slots.push(clone(slot))
    }
    return clone(slots)
  }

  // PRIVATE: SYNC --------------------------------------------------------------------------------

  /**
   * Book unbooked escrow surplus (direct transfers, consensus rewards) as a donation, excluding
   * deposits of the current call that are not booked yet. Inline callers skip empty pools.
   */
  private syncCore(poolId: uint64, pool: PoolInfo, pendingA: uint64, pendingB: uint64): void {
    const escrow = this.escrowOf(pool)
    const bookedA: uint64 = pool.reserveA - pool.externalA + pool.protocolFeesA + pool.lockedA + pendingA
    const bookedB: uint64 = pool.reserveB - pool.externalB + pool.protocolFeesB + pool.lockedB + pendingB
    const holdA = this.holding(escrow, pool.assetA)
    const holdB = this.holding(escrow, pool.assetB)
    // a shortfall can only come from custody, which is guarded where it happens
    loggedAssert(holdA >= bookedA && holdB >= bookedB, errCustodyInvariant)
    if (holdA > bookedA || holdB > bookedB) {
      // booking a surplus pushes a hookless add/remove past one app call's 700: top up only then
      ensureBudget(SyncBudget, OpUpFeeSource.GroupCredit)
      this.bookDelta(poolId, pool, { mag: holdA - bookedA, neg: false }, { mag: holdB - bookedB, neg: false })
    }
  }

  // PRIVATE: SWAPS -------------------------------------------------------------------------------

  /**
   * Shared swap/quote body (§4.3). With `commit` it books state, runs AfterSwap and pays the
   * HookFeeOut; the output is left in the escrow (outside reserves) for the caller to deliver.
   * Without `commit` it runs Quote hooks and writes nothing. With `soft` (tryQuoteRoute) the
   * recoverable failures return amountOut = 0 instead of reverting.
   */
  private swapCore(
    poolId: uint64,
    assetIn: uint64,
    amountIn: uint64,
    caller: Account,
    wallet: uint64,
    recipient: Account,
    data: bytes,
    commit: boolean,
    soft: boolean,
  ): SwapResult {
    const fail: SwapResult = { assetOut: 0, amountOut: 0 }
    if (soft && !this.pools(poolId).exists) {
      return fail
    }
    const pool = this.loadPool(poolId)
    const inIsA = assetIn === pool.assetA
    const known = inIsA || assetIn === pool.assetB
    const uninitialized = this.bonding(pool) && pool.lpSupply === 0
    if (soft && (pool.paused || pool.closed || uninitialized || !known || amountIn === 0)) {
      return fail
    }
    loggedAssert(!pool.paused && !pool.closed, errPoolPaused)
    loggedAssert(!uninitialized, errLaunchState)
    loggedAssert(known, errAssetNotInPool)
    loggedAssert(amountIn > 0, errInvalidInput)
    const assetOut = inIsA ? pool.assetB : pool.assetA

    const ctx = this.context(poolId, pool, caller, wallet, recipient, assetIn, assetOut, amountIn, 0, 0, data)
    const pre = this.runHooks(poolId, pool, commit ? HookPointBeforeSwap : HookPointQuote, ctx, inIsA, MaxHooksPerPool)
    const net: uint64 = amountIn - pre.hookFees

    const rIn = inIsA ? pool.reserveA : pool.reserveB
    const rOut = inIsA ? pool.reserveB : pool.reserveA
    let out: uint64 = 0
    let protocolFee: uint64 = 0

    if (pool.curve === 0) {
      const eIn: uint64 = rIn + (inIsA ? pool.virtualA : pool.virtualB)
      const eOut: uint64 = rOut + (inIsA ? pool.virtualB : pool.virtualA)
      const liquidOut: uint64 = rOut - (inIsA ? pool.externalB : pool.externalA)
      const lpFee = mulDiv(net, pre.feeBps, BpsDivisor)
      protocolFee = mulDiv(lpFee, this.protocolFeeBps.value, BpsDivisor)
      const effectiveIn: uint64 = net - lpFee
      if (eIn > 0 && eOut > 0) {
        out = mulDiv(effectiveIn, eOut, eIn + effectiveIn)
      }
      // real liquid bound (F1): virtual and external value are never paid out by a swap
      if (soft && (out === 0 || out >= liquidOut)) {
        return fail
      }
      loggedAssert(out > 0 && out < liquidOut, errInsufficientLiquidity)
    } else {
      const req = this.curveRequest(commit ? CurveOpSwap : CurveOpQuote, poolId, pool)
      req.inIsA = inIsA
      req.amountIn = net
      req.feeBps = pre.feeBps
      const r = this.callCurve(pool, req)
      if (r.amountOut === 0) {
        if (soft) {
          return fail
        }
        loggedAssert(!commit, errCurveViolation)
        loggedAssert(false, errInsufficientLiquidity)
      }
      this.checkSwapResult(pool, req, r, rIn, rOut)
      out = r.amountOut
      protocolFee = r.protocolFee
      pool.priceX64 = r.snapshot.priceX64
      pool.activeId = r.snapshot.activeId
      if (pool.hookPoints !== 0) {
        ctx.curveData = r.hookData
        // the curve's full snapshot (incl. liquidity and flags, which PoolInfo does not cache)
        ctx.after = clone(r.snapshot)
      }
      if ((r.flags & CurveFlagClose) !== 0) {
        pool.closed = true
      }
    }

    if (inIsA) {
      pool.reserveA += net - protocolFee
      pool.reserveB -= out
      pool.protocolFeesA += protocolFee
    } else {
      pool.reserveB += net - protocolFee
      pool.reserveA -= out
      pool.protocolFeesB += protocolFee
    }

    const outFee = mulDiv(out, pre.hookFeeOutBps, BpsDivisor)

    if (commit) {
      if ((pool.hookPoints & HookPointAfterSwap) !== 0) {
        ctx.amountOut = out
        ctx.feeBps = pre.feeBps
        if (pool.curve === 0) {
          ctx.after = this.snapshot(pool)
        }
        this.runHooks(poolId, pool, HookPointAfterSwap, ctx, inIsA, MaxHooksPerPool)
      }
      pool.lastUpdate = Global.latestTimestamp
      this.pools(poolId).value = clone(pool)

      emit<SwapEvent>({
        poolId,
        caller,
        assetIn,
        amountIn,
        assetOut,
        amountOut: out - outFee,
        feeBps: pre.feeBps,
        hookFees: pre.hookFees,
        reserveA: pool.reserveA,
        reserveB: pool.reserveB,
      })

      if (outFee > 0) {
        this.send(this.escrowOf(pool), Application(pre.hookFeeOutApp).address, assetOut, outFee)
      }
    }

    return { assetOut, amountOut: out - outFee }
  }

  private resolveRecipient(recipient: Account): Account {
    return recipient === Global.zeroAddress ? Txn.sender : recipient
  }

  /** route shape: 1..MaxRouteHops pools, no pool twice (errPdrt) */
  private checkRoute(route: uint64[]): void {
    loggedAssert(route.length > 0 && route.length <= MaxRouteHops, errInvalidRoute)
    for (let i: uint64 = 1; i < route.length; i += 1) {
      for (let j: uint64 = 0; j < i; j += 1) {
        loggedAssert(route[i] !== route[j], errInvalidRoute)
      }
    }
  }

  private quoteRouteCore(
    route: uint64[],
    assetIn: uint64,
    amountIn: uint64,
    swapper: Account,
    data: bytes,
    wallet: uint64,
    soft: boolean,
  ): uint64 {
    this.checkRoute(route)
    const caller = swapper === Global.zeroAddress ? Txn.sender : swapper

    let asset = assetIn
    let amount = amountIn
    for (let i: uint64 = 0; i < route.length; i += 1) {
      if (i > 0) ensureBudget(HopBudget, OpUpFeeSource.GroupCredit)
      const result = this.swapCore(route[i], asset, amount, caller, wallet, caller, data, false, soft)
      if (result.amountOut === 0) {
        return 0
      }
      asset = result.assetOut
      amount = result.amountOut
    }
    return amount
  }

  // PRIVATE: LIQUIDITY ---------------------------------------------------------------------------

  /** fungible pools only: the LP burn transfer (the asset transfer to the Vault before the call) */
  private readLpTransfer(lpTransfer: gtxn.AssetTransferTxn, pool: PoolInfo): uint64 {
    loggedAssert(!this.bonding(pool), errLaunchState)
    loggedAssert(pool.lpMode === LpModeFungible, errLpMode)
    loggedAssert(lpTransfer.xferAsset.id === pool.lpAsset, errInvalidInput)
    loggedAssert(lpTransfer.assetReceiver === Global.currentApplicationAddress, errInvalidInput)
    loggedAssert(lpTransfer.assetCloseTo === Global.zeroAddress, errInvalidInput)
    loggedAssert(lpTransfer.assetSender === Global.zeroAddress, errInvalidInput)
    loggedAssert(lpTransfer.rekeyTo === Global.zeroAddress, errInvalidInput)
    loggedAssert(lpTransfer.assetAmount > 0, errInvalidInput)
    return lpTransfer.assetAmount
  }

  /**
   * Shared remove (§4.4). Native pools and the emergency exit of fungible curve pools pay the Vault-side
   * pro-rata of booked liquid reserves (no curve call). Fungible curve pools (normal path) and
   * curve-managed positions (always, paused or not) are paid what the curve's Remove returns, checked
   * by §4.5. `withHooks` = hooks run, plus sync and revalue on native pools (§10 A24).
   */
  private removeCore(
    poolId: uint64,
    pool: PoolInfo,
    lpAmount: uint64,
    positionId: uint64,
    curveArgs: bytes,
    minAmountA: uint64,
    minAmountB: uint64,
    data: bytes,
    withHooks: boolean,
  ): RemoveResult {
    const ctx = this.context(poolId, pool, Txn.sender, 0, Txn.sender, pool.assetA, pool.assetB, 0, 0, lpAmount, data)

    if (withHooks) {
      // native pools book surplus and external marks before the burn so JIT liquidity cannot capture them.
      // Curve pools skip it (§10 A24): an exit must never depend on the curve placing a donation (Settle),
      // and an unbooked surplus left behind by an exit only accrues to the remaining LPs
      if (pool.curve === 0) {
        this.syncCore(poolId, pool, 0, 0)
        this.revalueCore(poolId, pool)
      }
      if (pool.hookPoints !== 0) ctx.positionId = positionId
      this.runHooks(poolId, pool, HookPointBeforeRemoveLiquidity, ctx, true, MaxHooksPerPool)
    }

    let amountA: uint64
    let amountB: uint64
    let burned = lpAmount
    if (pool.curve !== 0 && (withHooks || pool.lpMode === LpModeCurve)) {
      const r = this.curveRemove(poolId, pool, lpAmount, positionId, curveArgs)
      amountA = r.amountA
      amountB = r.amountB
      burned = r.shares
      if (pool.hookPoints !== 0) {
        ctx.after = clone(r.snapshot)
        ctx.curveData = r.hookData
      }
    } else {
      // pro-rata of the booked LIQUID reserves; external positions leave in kind (receipt units)
      amountA = mulDiv(lpAmount, pool.reserveA - pool.externalA, pool.lpSupply)
      amountB = mulDiv(lpAmount, pool.reserveB - pool.externalB, pool.lpSupply)
      if (pool.externalSlots > 0) this.exitInKind(poolId, pool, lpAmount)
    }
    loggedAssert(amountA >= minAmountA && amountB >= minAmountB, errSlippage)

    pool.reserveA -= amountA
    pool.reserveB -= amountB
    if (pool.lpMode === LpModeFungible) {
      pool.lpSupply -= lpAmount
    }

    if (withHooks && (pool.hookPoints & HookPointAfterRemoveLiquidity) !== 0) {
      ctx.amountIn = amountA
      ctx.amountOut = amountB
      ctx.lpAmount = burned
      ctx.lpSupply = pool.lpSupply
      if (pool.curve === 0) ctx.after = this.snapshot(pool)
      this.runHooks(poolId, pool, HookPointAfterRemoveLiquidity, ctx, true, MaxHooksPerPool)
    }

    this.pools(poolId).value = clone(pool)

    const escrow = this.escrowOf(pool)
    if (amountA > 0) this.send(escrow, Txn.sender, pool.assetA, amountA)
    if (amountB > 0) this.send(escrow, Txn.sender, pool.assetB, amountB)

    emit<LiquidityEvent>({
      poolId,
      caller: Txn.sender,
      amountA,
      amountB,
      lpAmount: burned,
      reserveA: pool.reserveA,
      reserveB: pool.reserveB,
    })

    return { amountA, amountB }
  }

  /**
   * Shared add (§4.4). Fungible pools (native and fungible curves) mint Vault LP; curve-managed pools
   * write a curve position. The deposits are the two transactions before the call, A then B; the
   * unused part of each is refunded from the escrow. Returns the curve-liquidity view of the result.
   */
  private addCore(
    depositA: gtxn.Transaction,
    depositB: gtxn.Transaction,
    poolId: uint64,
    minOut: uint64,
    data: bytes,
    lpMode: uint64,
    mbr: uint64,
    positionId: uint64,
    curveArgs: bytes,
  ): CurveLiquidityResult {
    const pool = this.loadPool(poolId)
    loggedAssert(!pool.paused && !pool.closed, errPoolPaused)
    loggedAssert(!this.bonding(pool), errLaunchState)
    loggedAssert(pool.lpMode === lpMode, errLpMode)

    const escrow = this.escrowOf(pool)
    const a = this.readDeposit(depositA, escrow)
    const b = this.readDeposit(depositB, escrow)
    loggedAssert(a.asset === pool.assetA && b.asset === pool.assetB, errAssetNotInPool)

    // book surplus and external marks before the mint so JIT liquidity cannot capture them. On a curve pool
    // this Settles a donation: the curve must be able to place any donation while it has booked reserves
    // (§10 A24), otherwise adds wait for the next swap or `sync` (exits never Settle)
    let unbooked: Unbooked = { a: 0, b: 0 }
    if (this.hasLiquidity(pool)) {
      this.syncCore(poolId, pool, a.amount, b.amount)
      unbooked = this.revalueCore(poolId, pool)
    }

    const ctx = this.context(
      poolId,
      pool,
      Txn.sender,
      0,
      Txn.sender,
      pool.assetA,
      pool.assetB,
      a.amount,
      b.amount,
      0,
      data,
    )
    if (pool.hookPoints !== 0) ctx.positionId = positionId
    this.runHooks(poolId, pool, HookPointBeforeAddLiquidity, ctx, true, MaxHooksPerPool)

    let usedA = a.amount
    let usedB = b.amount
    let minted: uint64 = 0
    let position: uint64 = 0
    const first = pool.lpSupply === 0

    if (pool.curve !== 0) {
      const r = this.curveAdd(poolId, pool, a.amount, b.amount, positionId, curveArgs, mbr)
      usedA = r.amountA
      usedB = r.amountB
      minted = r.shares
      position = r.positionId
      if (pool.hookPoints !== 0) {
        ctx.after = clone(r.snapshot)
        ctx.curveData = r.hookData
      }
    } else if (first) {
      const liquidity = sqrtProduct(a.amount, b.amount)
      loggedAssert(liquidity > MinimumLiquidity, errInsufficientLiquidity)
      minted = liquidity - MinimumLiquidity
    } else {
      loggedAssert(pool.reserveA > 0 && pool.reserveB > 0, errInsufficientLiquidity)
      // §10 A26: each slot at max(book, valuator). The clip only slows what is booked; a mint at the clipped
      // book would buy receipts that the LP can take out in kind at once at the valuator's value
      const valueA: uint64 = pool.reserveA + unbooked.a
      const valueB: uint64 = pool.reserveB + unbooked.b
      const fromA = mulDiv(a.amount, pool.lpSupply, valueA)
      const fromB = mulDiv(b.amount, pool.lpSupply, valueB)
      if (fromA <= fromB) {
        minted = fromA
        const needB = mulDivUp(a.amount, valueB, valueA)
        usedB = needB < b.amount ? needB : b.amount
      } else {
        minted = fromB
        const needA = mulDivUp(b.amount, valueA, valueB)
        usedA = needA < a.amount ? needA : a.amount
      }
    }

    loggedAssert(minted > 0 && minted >= minOut, errSlippage)
    if (lpMode === LpModeFungible) {
      // the first deposit also counts the MinimumLiquidity that is never issued
      pool.lpSupply += first ? minted + MinimumLiquidity : minted
    }
    pool.reserveA += usedA
    pool.reserveB += usedB

    if ((pool.hookPoints & HookPointAfterAddLiquidity) !== 0) {
      ctx.amountIn = usedA
      ctx.amountOut = usedB
      ctx.lpAmount = minted
      ctx.lpSupply = pool.lpSupply
      ctx.positionId = position
      if (pool.curve === 0) ctx.after = this.snapshot(pool)
      this.runHooks(poolId, pool, HookPointAfterAddLiquidity, ctx, true, MaxHooksPerPool)
    }

    this.pools(poolId).value = clone(pool)

    if (a.amount > usedA || b.amount > usedB) ensureBudget(RefundBudget, OpUpFeeSource.GroupCredit)
    if (lpMode === LpModeFungible) {
      itxn.assetTransfer({ assetReceiver: Txn.sender, xferAsset: pool.lpAsset, assetAmount: minted }).submit()
    }
    if (a.amount > usedA) this.send(escrow, Txn.sender, pool.assetA, a.amount - usedA)
    if (b.amount > usedB) this.send(escrow, Txn.sender, pool.assetB, b.amount - usedB)

    emit<LiquidityEvent>({
      poolId,
      caller: Txn.sender,
      amountA: usedA,
      amountB: usedB,
      lpAmount: minted,
      reserveA: pool.reserveA,
      reserveB: pool.reserveB,
    })

    return { positionId: position, shares: minted, amountA: usedA, amountB: usedB }
  }

  // ADMIN ----------------------------------------------------------------------------------------

  setAdmin(admin: Account): void {
    this.requireAdmin()
    this.admin.value = admin
  }

  setProtocolFee(protocolFeeBps: uint64, treasury: Account): void {
    this.requireAdmin()
    loggedAssert(protocolFeeBps <= MaxProtocolFeeBps, errInvalidFee)
    this.protocolFeeBps.value = protocolFeeBps
    this.treasury.value = treasury
  }

  /**
   * Approve a hook app with the maximum permissions any pool may grant it, pinning its current
   * version, or revoke it with 0. Approval changes only affect pools created afterwards.
   * Box MBR comes from the DEX account, so the admin funds it beforehand.
   */
  setHookApproval(hook: uint64, perms: uint64): void {
    this.requireAdmin()
    loggedAssert((perms | HookPermAll) === HookPermAll, errInvalidHookConfig)
    if (perms === 0) {
      if (this.approvedHooks(hook).exists) this.approvedHooks(hook).delete()
      return
    }
    this.approvedHooks(hook).value = { perms, version: Application(hook).version }
  }

  /** Approve (pinning the current version) or revoke a curve app for future pools */
  setCurveApproval(curve: uint64, lpMode: uint64, approved: boolean): void {
    this.requireAdmin()
    if (!approved) {
      if (this.approvedCurves(curve).exists) this.approvedCurves(curve).delete()
      return
    }
    loggedAssert(lpMode === LpModeFungible || lpMode === LpModeCurve, errCurveNotApproved)
    this.approvedCurves(curve).value = { version: Application(curve).version, lpMode }
  }

  /** Approve (pinning the current version) or revoke a valuator for future external slots */
  setValuatorApproval(valuator: uint64, approved: boolean): void {
    this.requireAdmin()
    if (!approved) {
      if (this.approvedValuators(valuator).exists) this.approvedValuators(valuator).delete()
      return
    }
    this.approvedValuators(valuator).value = Application(valuator).version
  }

  /** Pausing stops swaps and deposits and unlocks `emergencyRemoveLiquidity`, which skips hooks */
  setPoolPaused(poolId: uint64, paused: boolean): void {
    this.requireAdmin()
    loggedAssert(this.pools(poolId).exists, errPoolNotFound)
    this.pools(poolId).value.paused = paused
  }

  /**
   * Paused pools only: recognize a real venue loss with rate := min(booked, valuator) (valuator > 0,
   * errPdva), no clip. It never writes the rate up; the loss leaves the side's reserve with the book value.
   */
  writeDownExternal(poolId: uint64, slot: uint64): void {
    this.requireAdmin()
    const pool = this.loadPool(poolId)
    loggedAssert(pool.paused, errPoolNotPaused)
    loggedAssert(slot < pool.externalSlots, errExternalConfig)
    const slots = clone(this.externalSlots(poolId).value)
    const target = clone(slots[slot])
    const v = this.valuatorRate(target, target.side === 0 ? pool.assetA : pool.assetB)
    loggedAssert(v > 0, errValuatorUnavailable)
    const d = this.bookSlot(poolId, target, slot, v < target.rate ? v : target.rate)
    if (target.side === 0) {
      pool.reserveA = applySigned(pool.reserveA, d)
    } else {
      pool.reserveB = applySigned(pool.reserveB, d)
    }
    slots[slot] = clone(target)
    this.storeSlots(poolId, pool, slots)
    this.pools(poolId).value = clone(pool)
  }

  // POOLS ----------------------------------------------------------------------------------------

  /**
   * Create a pool with an immutable, version-pinned hook stack (§4.2). Pay at least the creation
   * cost: the Vault's measured minimum balance change, the escrow funding, every hook's F6 funding
   * and the curve MBR. Any excess is refunded to the payer.
   */
  createPool(
    payment: gtxn.PaymentTxn,
    assetA: uint64,
    assetB: uint64,
    config: PoolConfig,
    hooks: HookInstall[],
    externals: ExternalSlotConfig[],
  ): uint64 {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(assetA < assetB, errInvalidPool)
    loggedAssert(config.feeBps <= config.maxFeeBps && config.feeBps <= MaxFeeBps, errInvalidFee)
    loggedAssert(config.maxFeeBps <= MaxPoolFeeCapBps && config.custodyFeeBps <= config.maxFeeBps, errInvalidFee)
    loggedAssert(config.maxHookFeeBps <= MaxHookFeeBps, errInvalidFee)

    let lpMode: uint64 = LpModeFungible
    let curveVersion: uint64 = 0
    let curveMbr: uint64 = 0
    if (config.curve !== 0) {
      loggedAssert(this.approvedCurves(config.curve).exists, errCurveNotApproved)
      const approval = clone(this.approvedCurves(config.curve).value)
      loggedAssert(Application(config.curve).version === approval.version, errVersionMismatch)
      loggedAssert((config.virtualA | config.virtualB) === 0, errCurveNotApproved)
      loggedAssert(externals.length === 0, errExternalConfig)
      lpMode = approval.lpMode
      curveVersion = approval.version
      curveMbr = config.curveMbr
    }
    // launch pools (native VCPMM, §4.2 step 3): any offset makes one. It needs a graduation threshold and a
    // quote-side offset (the real quote reserve starts at 0, so the first buy prices against it); other
    // pools carry no threshold. Externals are never allowed on a launch pool.
    const launch = (config.virtualA | config.virtualB) !== 0
    if (launch) {
      loggedAssert(externals.length === 0, errExternalConfig)
      loggedAssert(
        config.graduationThreshold > 0 && (config.quoteIsA ? config.virtualA : config.virtualB) > 0,
        errLaunchState,
      )
    } else {
      loggedAssert(config.graduationThreshold === 0, errLaunchState)
    }

    const dexMbrBefore = Global.currentApplicationAddress.minBalance

    const poolId = this.poolCursor.value
    this.poolCursor.value = poolId + 1

    // pool escrow: a child Escrow app whose account is rekeyed to the DEX
    const escrowContract = compileArc4(Escrow)
    const escrowApp = escrowContract.call.create({
      args: [Bytes(op.itob(Global.currentApplicationId.id))],
    }).itxn.createdApp
    const escrow = escrowApp.address

    // the escrow also holds every external slot's receipt ASA
    const optIns: uint64 = (assetA === 0 ? Uint64(1) : Uint64(2)) + externals.length
    const escrowFunding: uint64 = Global.minBalance + optIns * Global.assetOptInMinBalance
    itxn.payment({ receiver: escrow, amount: escrowFunding }).submit()
    escrowContract.call.rekey({ appId: escrowApp, args: [Global.currentApplicationAddress] })

    if (assetA !== 0) this.send(escrow, escrow, assetA, 0)
    this.send(escrow, escrow, assetB, 0)

    let lpAsset: uint64 = 0
    if (lpMode === LpModeFungible) {
      lpAsset = itxn
        .assetConfig({
          total: LPAssetTotal,
          decimals: LPAssetDecimals,
          unitName: LPAssetUnitName,
          assetName: LPAssetName,
          reserve: Global.currentApplicationAddress,
        })
        .submit().createdAsset.id
    }

    // validated after the escrow and LP creation, whose inner app calls add 1,400 to the budget
    const configs = this.validateHooks(hooks)
    let hookPoints: uint64 = 0
    for (let i: uint64 = 0; i < configs.length; i += 1) {
      hookPoints = hookPoints | configs[i].points
    }
    // external slots (§4.2 step 5; curve and launch pools were rejected above)
    const slots = this.validateExternals(assetA, assetB, externals, configs)
    for (let s: uint64 = 0; s < slots.length; s += 1) {
      this.send(escrow, escrow, slots[s].receipt, 0)
    }

    const pool: PoolInfo = {
      assetA,
      assetB,
      escrow: escrowApp.id,
      lpAsset,
      curve: config.curve,
      curveVersion,
      lpMode,
      reserveA: 0,
      reserveB: 0,
      externalA: 0,
      externalB: 0,
      externalSlots: slots.length,
      virtualA: config.virtualA,
      virtualB: config.virtualB,
      lockedA: 0,
      lockedB: 0,
      lpSupply: 0,
      lockedLp: 0,
      feeBps: config.feeBps,
      maxFeeBps: config.maxFeeBps,
      custodyFeeBps: config.custodyFeeBps,
      maxHookFeeBps: config.maxHookFeeBps,
      hookPoints,
      protocolFeesA: 0,
      protocolFeesB: 0,
      graduationThreshold: config.graduationThreshold,
      priceX64: zeroX64(),
      activeId: 0,
      lastUpdate: Global.latestTimestamp,
      createdAt: Global.latestTimestamp,
      creator: Txn.sender,
      quoteIsA: config.quoteIsA,
      closed: false,
      paused: false,
    }

    if (config.curve !== 0) {
      // §4.5 Init: the curve starts empty; its initial price is cached for the band and L2
      const req = this.curveRequest(CurveOpInit, poolId, pool)
      req.args = config.curveArgs
      const r = this.callCurveFunded(pool, req, curveMbr)
      loggedAssert(r.reserveA === 0 && r.reserveB === 0, errCurveViolation)
      pool.priceX64 = r.snapshot.priceX64
      pool.activeId = r.snapshot.activeId
    }

    this.pools(poolId).value = clone(pool)

    if (configs.length > 0) {
      this.poolHooks(poolId).value = clone(configs)
    }
    if (slots.length > 0) {
      this.externalSlots(poolId).value = clone(slots)
    }

    // pair index: the first MaxPoolsPerPair pools of a pair are indexed. Creation never fails on a full
    // index, so nobody can block a pair by filling it (§10, A9); later pools are found off-chain.
    const pairKey: PairKey = { assetA, assetB }
    if (this.pairPools(pairKey).exists) {
      const ids = clone(this.pairPools(pairKey).value)
      if (ids.length < MaxPoolsPerPair) {
        ids.push(poolId)
        this.pairPools(pairKey).value = clone(ids)
      }
    } else {
      this.pairPools(pairKey).value = [poolId]
    }

    // F6: fund each hook, then run its AfterInitialize with its own initData
    let funding: uint64 = 0
    for (let i: uint64 = 0; i < hooks.length; i += 1) {
      const install = clone(hooks[i])
      if (install.funding > 0) {
        itxn.payment({ receiver: Application(install.app).address, amount: install.funding }).submit()
        funding += install.funding
      }
      if ((install.points & HookPointAfterInitialize) !== 0) {
        const ctx = this.context(poolId, pool, Txn.sender, 0, Txn.sender, assetA, assetB, 0, 0, 0, install.initData)
        this.runHooks(poolId, pool, HookPointAfterInitialize, ctx, true, i)
      }
    }
    if (pool.reserveA !== 0 || pool.reserveB !== 0) {
      this.pools(poolId).value = clone(pool)
    }

    const required: uint64 =
      Global.currentApplicationAddress.minBalance - dexMbrBefore + escrowFunding + funding + curveMbr
    loggedAssert(payment.amount >= required, errInvalidPayment)
    if (payment.amount > required) {
      itxn.payment({ receiver: payment.sender, amount: payment.amount - required }).submit()
    }

    return poolId
  }

  /**
   * Launch pools (§4.4 F2), creator only, once: the token deposit becomes the token-side reserve and the
   * reserve deposit is the graduation reserve M, held in the escrow outside reserves (`locked`). Mints
   * L0 = sqrt(eA·eB) on effective reserves as locked LP: `lpSupply = lockedLp = L0`, no LP is transferred.
   * Runs the AfterAddLiquidity hooks with `lpAmount = L0` (anti-snipe FirstLiquidity starts here).
   */
  initializeLaunch(tokenDeposit: gtxn.Transaction, reserveDeposit: gtxn.Transaction, poolId: uint64): uint64 {
    const pool = this.loadPool(poolId)
    loggedAssert(!pool.paused, errPoolPaused)
    loggedAssert(Txn.sender === pool.creator && this.bonding(pool) && pool.lpSupply === 0, errLaunchState)

    const escrow = this.escrowOf(pool)
    const token: uint64 = pool.quoteIsA ? pool.assetB : pool.assetA
    const supply = this.readDeposit(tokenDeposit, escrow)
    const reserve = this.readDeposit(reserveDeposit, escrow)
    loggedAssert(supply.asset === token && reserve.asset === token, errAssetNotInPool)

    // ctx.before is the pool before the seed (§10, A3); hookless launches skip the snapshot
    const hooked = (pool.hookPoints & HookPointAfterAddLiquidity) !== 0
    let before: CurveSnapshot = { priceX64: zeroX64(), activeId: 0, liquidity: 0, flags: 0 }
    if (hooked) {
      before = this.snapshot(pool)
    }
    let usedA: uint64 = 0
    let usedB: uint64 = 0
    if (pool.quoteIsA) {
      usedB = supply.amount
      pool.reserveB += supply.amount
      pool.lockedB += reserve.amount
    } else {
      usedA = supply.amount
      pool.reserveA += supply.amount
      pool.lockedA += reserve.amount
    }
    const minted = sqrtProduct(pool.reserveA + pool.virtualA, pool.reserveB + pool.virtualB)
    loggedAssert(minted > 0, errInsufficientLiquidity)
    pool.lpSupply = minted
    pool.lockedLp = minted

    if (hooked) {
      // the deposits, the seed and the context fill one app call's 700: top up before the hook stack
      ensureBudget(HookTailBudget, OpUpFeeSource.GroupCredit)
      const ctx = this.context(poolId, pool, Txn.sender, 0, Txn.sender, pool.assetA, pool.assetB, usedA, usedB, minted, Bytes(''))
      ctx.before = clone(before)
      this.runHooks(poolId, pool, HookPointAfterAddLiquidity, ctx, true, MaxHooksPerPool)
    }

    pool.lastUpdate = Global.latestTimestamp
    this.pools(poolId).value = clone(pool)

    emit<LiquidityEvent>({
      poolId,
      caller: Txn.sender,
      amountA: usedA,
      amountB: usedB,
      lpAmount: minted,
      reserveA: pool.reserveA,
      reserveB: pool.reserveB,
    })
    return minted
  }

  /**
   * Permissionless, in-place graduation of an initialized bonding pool whose real quote reserve reached
   * `graduationThreshold` (§4.4 F4). With q the quote side and t the token side, the token reserve that
   * keeps the spot price exact is `target = ceil(r_q·e_t / e_q)` (= r_t + d with the spec's
   * d = ceil((r_q·v_t − r_t·v_q)/(r_q + v_q))):
   * - target ≤ r_t + M: r_t = target and the rest of M (or the curve's token excess, when d < 0) stays
   *   locked in the escrow forever (§10, A16);
   * - otherwise all of M joins the reserve and the quote surplus `r_q − ceil(r_t'·e_q/e_t)` leaves the
   *   reserves for the treasury, booked as protocol fees (§10, A17).
   * The offsets are zeroed; the pool is plain constant product from here on, and `lockedLp` stays locked.
   */
  graduate(poolId: uint64): void {
    const pool = this.loadPool(poolId)
    loggedAssert(!pool.paused, errPoolPaused)
    const quoteIsA = pool.quoteIsA
    const rQuote: uint64 = quoteIsA ? pool.reserveA : pool.reserveB
    const rToken: uint64 = quoteIsA ? pool.reserveB : pool.reserveA
    const locked: uint64 = quoteIsA ? pool.lockedB : pool.lockedA
    loggedAssert(
      this.bonding(pool) && pool.lpSupply > 0 && rQuote >= pool.graduationThreshold,
      errGraduation,
    )
    const eQuote: uint64 = rQuote + (quoteIsA ? pool.virtualA : pool.virtualB)
    const eToken: uint64 = rToken + (quoteIsA ? pool.virtualB : pool.virtualA)

    const available: uint64 = rToken + locked
    let newToken = mulDivUp(rQuote, eToken, eQuote)
    let newQuote = rQuote
    if (newToken > available) {
      newToken = available
      newQuote = mulDivUp(available, eQuote, eToken)
    }
    const surplus: uint64 = rQuote - newQuote
    const retained: uint64 = available - newToken

    if (quoteIsA) {
      pool.reserveA = newQuote
      pool.protocolFeesA += surplus
      pool.reserveB = newToken
      pool.lockedB = retained
    } else {
      pool.reserveB = newQuote
      pool.protocolFeesB += surplus
      pool.reserveA = newToken
      pool.lockedA = retained
    }
    pool.virtualA = 0
    pool.virtualB = 0
    pool.lastUpdate = Global.latestTimestamp
    this.pools(poolId).value = clone(pool)

    emit<GraduationEvent>({
      poolId,
      tokenIn: newToken > rToken ? newToken - rToken : 0,
      tokenRetained: retained,
      quoteToTreasury: surplus,
      priceX64: priceX64(pool.reserveA, pool.reserveB),
    })
  }

  // LIQUIDITY (fungible) -------------------------------------------------------------------------

  /**
   * Deposit both assets (the two transactions before this call, A then B). The
   * limiting side sets the LP minted; the excess of the other side is refunded.
   * Fungible curve pools: the curve's Add decides the amounts used and the LP minted (§4.5 bound).
   */
  addLiquidity(
    depositA: gtxn.Transaction,
    depositB: gtxn.Transaction,
    poolId: uint64,
    minLpOut: uint64,
    data: bytes,
  ): uint64 {
    return this.addCore(depositA, depositB, poolId, minLpOut, data, LpModeFungible, 0, 0, Bytes('')).shares
  }

  /** Burn LP (the asset transfer to the DEX before this call) for a pro-rata share of reserves */
  removeLiquidity(
    lpTransfer: gtxn.AssetTransferTxn,
    poolId: uint64,
    minAmountA: uint64,
    minAmountB: uint64,
    data: bytes,
  ): RemoveResult {
    const pool = this.loadPool(poolId)
    const lpAmount = this.readLpTransfer(lpTransfer, pool)
    return this.removeCore(poolId, pool, lpAmount, 0, Bytes(''), minAmountA, minAmountB, data, true)
  }

  /**
   * Withdraw from a paused pool without running hooks, sync, revalue, valuators or curves, so a
   * broken dependency cannot trap LPs. The guaranteed exit for fungible pools, curve pools included
   * (Vault-side pro-rata of booked reserves; the curve's own state is left stale).
   */
  emergencyRemoveLiquidity(
    lpTransfer: gtxn.AssetTransferTxn,
    poolId: uint64,
    minAmountA: uint64,
    minAmountB: uint64,
  ): RemoveResult {
    const pool = this.loadPool(poolId)
    loggedAssert(pool.paused, errPoolNotPaused)
    const lpAmount = this.readLpTransfer(lpTransfer, pool)
    return this.removeCore(poolId, pool, lpAmount, 0, Bytes(''), minAmountA, minAmountB, Bytes(''), false)
  }

  // LIQUIDITY (curve-managed positions) ----------------------------------------------------------

  /**
   * Add to a curve-managed position (`positionId` 0 = new), owned by Txn.sender. `mbr` (a payment to
   * the Vault before the deposits) is forwarded to the curve's funded Add; the curve refunds the excess.
   */
  addLiquidityCurve(
    mbr: gtxn.PaymentTxn,
    depositA: gtxn.Transaction,
    depositB: gtxn.Transaction,
    poolId: uint64,
    positionId: uint64,
    minShares: uint64,
    curveArgs: bytes,
    data: bytes,
  ): CurveLiquidityResult {
    loggedAssert(mbr.receiver === Global.currentApplicationAddress, errInvalidPayment)
    return this.addCore(depositA, depositB, poolId, minShares, data, LpModeCurve, mbr.amount, positionId, curveArgs)
  }

  /** Paused pools skip hooks (and sync) but still call the curve's Remove (§8 residual dependency) */
  removeLiquidityCurve(
    poolId: uint64,
    positionId: uint64,
    minAmountA: uint64,
    minAmountB: uint64,
    curveArgs: bytes,
    data: bytes,
  ): RemoveResult {
    const pool = this.loadPool(poolId)
    loggedAssert(pool.lpMode === LpModeCurve, errLpMode)
    return this.removeCore(poolId, pool, 0, positionId, curveArgs, minAmountA, minAmountB, data, !pool.paused)
  }

  // TRADING --------------------------------------------------------------------------------------

  /**
   * Swap the input transfer (the transaction before this call) through one pool. `wallet` is the caller's
   * ARC-58 wallet hint (0 = acting as itself; principal-resolution spec §6.12): the Vault passes it to every
   * hook as `ctx.wallet` without verifying it (hooks verify), so it never changes pool math by itself.
   */
  swap(input: gtxn.Transaction, poolId: uint64, minAmountOut: uint64, recipient: Account, data: bytes, wallet: uint64): uint64 {
    const escrow = this.escrowOf(this.loadPool(poolId))
    const deposit = this.readDeposit(input, escrow)
    const to = this.resolveRecipient(recipient)

    const result = this.swapCore(poolId, deposit.asset, deposit.amount, Txn.sender, wallet, to, data, true, false)
    loggedAssert(result.amountOut >= minAmountOut, errSlippage)

    this.send(escrow, to, result.assetOut, result.amountOut)
    return result.amountOut
  }

  /**
   * Internal multi-hop route. Intermediate amounts move escrow-to-escrow and never
   * leave the DEX; every hop runs its pool's full hook stack. A pool may appear once. `wallet`: as `swap`,
   * the same hint for every hop.
   */
  swapRoute(input: gtxn.Transaction, route: uint64[], minAmountOut: uint64, recipient: Account, data: bytes, wallet: uint64): uint64 {
    this.checkRoute(route)

    let escrow = this.escrowOf(this.loadPool(route[0]))
    const deposit = this.readDeposit(input, escrow)
    const to = this.resolveRecipient(recipient)

    let asset = deposit.asset
    let amount = deposit.amount

    for (let i: uint64 = 0; i < route.length; i += 1) {
      if (i > 0) ensureBudget(HopBudget, OpUpFeeSource.GroupCredit)
      const result = this.swapCore(route[i], asset, amount, Txn.sender, wallet, to, data, true, false)
      asset = result.assetOut
      amount = result.amountOut

      if (i + 1 < route.length) {
        const next = this.escrowOf(this.loadPool(route[i + 1]))
        this.send(escrow, next, asset, amount)
        escrow = next
      }
    }

    loggedAssert(amount >= minAmountOut, errSlippage)
    this.send(escrow, to, asset, amount)
    return amount
  }

  // MAINTENANCE (permissionless) -----------------------------------------------------------------

  /** Run one Poke-subscribed hook (custody allowed, fee fields ignored); access control is the hook's */
  poke(poolId: uint64, hookIndex: uint64, data: bytes): void {
    const pool = this.loadPool(poolId)
    loggedAssert(!pool.paused, errPoolPaused)
    loggedAssert(
      (pool.hookPoints & HookPointPoke) !== 0 &&
        hookIndex < this.poolHooks(poolId).value.length &&
        (this.poolHooks(poolId).value[hookIndex].points & HookPointPoke) !== 0,
      errInvalidHookConfig,
    )
    const ctx = this.context(poolId, pool, Txn.sender, 0, Txn.sender, pool.assetA, pool.assetB, 0, 0, 0, data)
    this.runHooks(poolId, pool, HookPointPoke, ctx, true, hookIndex)
    this.pools(poolId).value = clone(pool)
  }

  /** Book unbooked escrow surplus (direct transfers, consensus rewards) into reserves */
  sync(poolId: uint64): void {
    const pool = this.loadPool(poolId)
    loggedAssert(this.hasLiquidity(pool), errInsufficientLiquidity)
    this.syncCore(poolId, pool, 0, 0)
    this.pools(poolId).value = clone(pool)
  }

  /** Re-mark every external slot within the per-day clips */
  revalue(poolId: uint64): void {
    const pool = this.loadPool(poolId)
    this.revalueCore(poolId, pool)
    this.pools(poolId).value = clone(pool)
  }

  /** Anyone can sweep protocol fees to the treasury, which must be opted in */
  collectProtocolFees(poolId: uint64): void {
    const pool = this.loadPool(poolId)
    const escrow = this.escrowOf(pool)
    const feesA = pool.protocolFeesA
    const feesB = pool.protocolFeesB

    this.pools(poolId).value.protocolFeesA = 0
    this.pools(poolId).value.protocolFeesB = 0

    if (feesA > 0) this.send(escrow, this.treasury.value, pool.assetA, feesA)
    if (feesB > 0) this.send(escrow, this.treasury.value, pool.assetB, feesB)
  }

  // READ ONLY ------------------------------------------------------------------------------------

  /**
   * Hook-aware quote: runs Quote hooks (never with custody) and the pool math. Equals quoteRoute([poolId]).
   * `swapper` (zero ⇒ Txn.sender) and `wallet` are the identity to price for; both are caller-chosen, so
   * Quote hooks treat them as unauthenticated (spec §6.12: `thirdPartyPrincipal`, never the ctx resolver).
   */
  @abimethod({ readonly: true })
  quote(poolId: uint64, assetIn: uint64, amountIn: uint64, swapper: Account, data: bytes, wallet: uint64): uint64 {
    return this.quoteRouteCore([poolId], assetIn, amountIn, swapper, data, wallet, false)
  }

  @abimethod({ readonly: true })
  quoteRoute(route: uint64[], assetIn: uint64, amountIn: uint64, swapper: Account, data: bytes, wallet: uint64): uint64 {
    return this.quoteRouteCore(route, assetIn, amountIn, swapper, data, wallet, false)
  }

  /** Like quoteRoute, but returns 0 for recoverable failures (missing/paused/closed pool, no liquidity) */
  @abimethod({ readonly: true })
  tryQuoteRoute(route: uint64[], assetIn: uint64, amountIn: uint64, swapper: Account, data: bytes, wallet: uint64): uint64 {
    return this.quoteRouteCore(route, assetIn, amountIn, swapper, data, wallet, true)
  }

  @abimethod({ readonly: true })
  getPool(poolId: uint64): PoolInfo {
    return this.loadPool(poolId)
  }

  @abimethod({ readonly: true })
  getPoolHooks(poolId: uint64): HookConfig[] {
    if (!this.poolHooks(poolId).exists) {
      return []
    }
    return clone(this.poolHooks(poolId).value)
  }

  @abimethod({ readonly: true })
  getExternalSlots(poolId: uint64): ExternalSlot[] {
    if (!this.externalSlots(poolId).exists) {
      return []
    }
    return clone(this.externalSlots(poolId).value)
  }

  @abimethod({ readonly: true })
  getPairPools(assetA: uint64, assetB: uint64): uint64[] {
    const key: PairKey = { assetA, assetB }
    if (!this.pairPools(key).exists) {
      return []
    }
    return clone(this.pairPools(key).value)
  }

  @abimethod({ readonly: true })
  getHookApproval(hook: uint64): HookApproval {
    if (!this.approvedHooks(hook).exists) {
      return { perms: 0, version: 0 }
    }
    return clone(this.approvedHooks(hook).value)
  }
}
