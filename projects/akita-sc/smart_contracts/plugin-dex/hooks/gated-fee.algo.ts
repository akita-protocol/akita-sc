import {
  Account,
  Application,
  Box,
  BoxMap,
  bytes,
  clone,
  Contract,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  OpUpFeeSource,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import type { Gate } from '../../gates/contract.algo'
import { gateCheckCtx, getAkitaAppList, getAkitaAssets, getDAOARC58Wallet, getStakingPowerThrough, getUserImpact } from '../../utils/functions'
import { GateCtx, gateCtx, isGenuineWallet, Principal, resolvePrincipal, resolvePrincipalFromDexCtx, thirdPartyPrincipal } from '../../utils/principal'
import { BpsDivisor, HookPointAfterInitialize, HookPointBeforeSwap, HookPointQuote, HookResultSetFee, MaxPoolFeeCapBps } from '../constants'
import { passResult, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

// GatedFeeHook (FINAL-SPEC §5 WP5a, akita-hooks Part A). Swap-fee discounts for AKTA lock stakers,
// high-impact social users and holders of DAO-defined gates, read from a cached FeePass on the hot path.

// TYPES ------------------------------------------------------------------------------------------

/**
 * A cached measurement of one principal (the pass key: an EOA, or the controlled address of the ARC-58 wallet
 * the owner hinted; principal-resolution spec §6.12). Unmeasured fields are 0.
 */
export type FeePass = {
  /** AKTA lock power of the key, 0 unless the lock outlives `validUntil` */
  power: uint64
  /** AkitaSocialImpact score of the key (1..1000) */
  impact: uint64
  /** bit i set ⇔ Gate.checkFor(ctx, gateSlots[i], args_i) passed (ctx: see `measure`) */
  gates: uint64
  /** unix seconds: Global.latestTimestamp + passTtl at measurement; the pass is live while now ≤ validUntil */
  validUntil: uint64
  /** paid the box MBR; refunded on close; may refresh or close a live pass */
  funder: Account
  /** UTC day (Global.latestTimestamp / SecondsPerDay) that `daySwaps` counts; kept across refreshes */
  swapDay: uint64
  /** discounted swaps on `swapDay` (BeforeSwap only, never Quote); kept across refreshes */
  daySwaps: uint64
}

export type FeeTier = {
  minPower: uint64
  minImpact: uint64
  /** every bit in the mask must be set in pass.gates */
  gateMask: uint64
  /** discount on the running fee, 0 < discountBps ≤ schedule.maxDiscountBps */
  discountBps: uint64
}

/** Per-pool discount schedule, written once at AfterInitialize and immutable afterwards */
export type FeeSchedule = {
  /** a discount never takes the fee below this (or below the incoming fee if that is lower) */
  floorFeeBps: uint64
  /** hard cap on any discount, ≤ MaxDiscountCapBps */
  maxDiscountBps: uint64
  /** optional continuous part: min(impact, 1000) · this / 1000, ≤ maxDiscountBps */
  impactMaxDiscountBps: uint64
  /** ≤ MaxTiers; first match wins */
  tiers: FeeTier[]
}

// CONSTANTS --------------------------------------------------------------------------------------

export const MeasurePower: uint64 = 1
export const MeasureImpact: uint64 = 2
export const MeasureGates: uint64 = 4
export const MeasureAll: uint64 = 7

export const MaxTiers: uint64 = 4
export const MaxGateSlots: uint64 = 8
/** every tier gateMask must fit the slot bitmap */
export const GateMaskAll: uint64 = 255
export const MaxDiscountCapBps: uint64 = 9_000
export const ImpactScale: uint64 = 1_000

export const DefaultPassTtl: uint64 = 86_400
export const MinPassTtl: uint64 = 3_600
export const MaxPassTtl: uint64 = 604_800

/** length of the discounted-swap counting window: one UTC day */
export const SecondsPerDay: uint64 = 86_400
/** default per-pass cap on discounted swaps per UTC day (OPEN-DECISIONS #18); 0 = unlimited */
export const DefaultMaxDiscountedSwapsPerDay: uint64 = 500

/** box MBR: 2,500 + 400 · (key 'p'‖address = 33 + FeePass 80) */
export const PassMbr: uint64 = 47_700
/** schedule box MBR = ScheduleMbrBase + ScheduleMbrPerTier · tiers ('s'‖poolId = 9; schedule = 28 + 32·tiers) */
export const ScheduleMbrBase: uint64 = 17_300
export const ScheduleMbrPerTier: uint64 = 12_800
/** ARC-4 FeeSchedule: 3 × uint64 + tail pointer + tiers length header */
export const ScheduleHeadBytes: uint64 = 28
export const ScheduleTierBytes: uint64 = 32
/** opcode budget requested before measuring gates (Gate.evaluate and sub-gates run in nested inners) */
export const GateMeasureBudget: uint64 = 2_100

// ERRORS (7-byte 'err' style) -------------------------------------------------------------------

/**
 * openPass / refreshFromGate: `key` is not the caller's own principal (`principalOf(F, wallet).principal`).
 * refresh / closePass of a live pass: the caller is neither `key`, nor the funder, nor `key`'s principal by hint.
 */
export const errGfAuth = 'errGfau'
/** only the DAO wallet */
export const errGfAdmin = 'errGfad'
/** a pass already exists for this key */
export const errGfExists = 'errGfex'
/** no (live) pass for this key */
export const errGfNoPass = 'errGfnp'
/** MBR payment wrong receiver or amount */
export const errGfMbr = 'errGfmb'
/** measure mask has unknown bits */
export const errGfMeasure = 'errGfms'
/** gateArgs length must equal the number of gate slots */
export const errGfArgs = 'errGfar'
/** gate slot index out of range or empty */
export const errGfSlot = 'errGfsl'
/** the gate txn is not a Gate.mustCheckFor of the owner's verified context for this slot */
export const errGfGateTxn = 'errGfgt'
/** malformed or out-of-bounds fee schedule */
export const errGfSchedule = 'errGfsc'
/** the pool already has a schedule (written once at AfterInitialize) */
export const errGfScheduleSet = 'errGfss'
/** pass TTL outside [MinPassTtl, MaxPassTtl] */
export const errGfTtl = 'errGftl'
/** too many gate slots */
export const errGfSlots = 'errGfgs'
/** the pass made discounted swaps today: it can be closed from the next UTC day (keeps the daily cap) */
export const errGfDay = 'errGfdy'

/** Validate a schedule's bounds. Its encoding must already be validated. */
export function checkSchedule(schedule: FeeSchedule): void {
  loggedAssert(
    schedule.tiers.length <= MaxTiers &&
      schedule.maxDiscountBps <= MaxDiscountCapBps &&
      schedule.impactMaxDiscountBps <= schedule.maxDiscountBps &&
      schedule.floorFeeBps <= MaxPoolFeeCapBps,
    errGfSchedule,
  )
  for (let i: uint64 = 0; i < schedule.tiers.length; i += 1) {
    const tier = clone(schedule.tiers[i])
    loggedAssert(
      tier.discountBps > 0 && tier.discountBps <= schedule.maxDiscountBps && (tier.gateMask | GateMaskAll) === GateMaskAll,
      errGfSchedule,
    )
  }
}

/** The discounted fee for a pass under a schedule; returns `feeBps` unchanged when no discount applies */
export function discountedFee(pass: FeePass, schedule: FeeSchedule, feeBps: uint64): uint64 {
  let discount: uint64 = 0
  for (let i: uint64 = 0; i < schedule.tiers.length; i += 1) {
    const tier = clone(schedule.tiers[i])
    if (pass.power >= tier.minPower && pass.impact >= tier.minImpact && (pass.gates & tier.gateMask) === tier.gateMask) {
      discount = tier.discountBps
      break
    }
  }
  if (schedule.impactMaxDiscountBps > 0) {
    const impact: uint64 = pass.impact > ImpactScale ? ImpactScale : pass.impact
    const continuous: uint64 = op.divw(...op.mulw(impact, schedule.impactMaxDiscountBps), ImpactScale)
    if (continuous > discount) {
      discount = continuous
    }
  }
  if (discount > schedule.maxDiscountBps) {
    discount = schedule.maxDiscountBps
  }
  if (discount === 0) {
    return feeBps
  }

  // fee ≤ feeBps by construction: the hook can only lower the running fee
  let fee: uint64 = feeBps - op.divw(...op.mulw(feeBps, discount), BpsDivisor)
  const floor: uint64 = schedule.floorFeeBps < feeBps ? schedule.floorFeeBps : feeBps
  if (fee < floor) {
    fee = floor
  }
  return fee
}

/**
 * DynamicFee hook (points: AfterInitialize | BeforeSwap | Quote; perms: DynamicFee). Multi-tenant: one
 * approved deployment serves every pool, each with its own immutable FeeSchedule delivered as F6
 * `initData` (or copied from the DAO's `defaultSchedule` when the initData is empty).
 *
 * Identity (principal-resolution spec §6.12; no EscrowFactory registry). Passes are keyed by PRINCIPAL. The
 * hot path derives the key from `ctx.caller` and the caller's wallet hint `ctx.wallet`:
 * - `ctx.wallet == 0`: the key is `ctx.caller` (an EOA, an app acting as itself, or a hint-less window).
 * - BeforeSwap: `resolvePrincipalFromDexCtx(F, ctx.wallet, ctx.caller, ctx.callerApp).principal`, strict (an
 *   invalid hint reverts the swap), except that inside an app call a hint that is not a wallet of `F` is
 *   priced as hint 0 (`passKey`). Sound only because `requireDexCaller` authenticated the Vault, and the
 *   Vault sets `ctx.caller` / `ctx.callerApp` to its own Txn.sender / Global.callerApplicationId there.
 * - Quote: `ctx.caller` is the caller-chosen swapper, so only the quote-only `thirdPartyPrincipal(F, swapper,
 *   wallet)` (at-rest ownership plus live control; never the ctx resolver, E27 / P2-DEX-03).
 * `F` is the DAO's wallet factory (`AkitaAppList.wallet` of this hook's own pinned DAO, never anything read
 * through the hint). Quote equals swap whenever both derive the same key, i.e. outside the hinted wallet's
 * window (quotes from a client) and for default-grant windows; inside an escrow window a quote sees the
 * escrow (E23) and can understate the discount.
 *
 * Hot path (BeforeSwap / Quote): two box reads (`'p'‖key`, `'s'‖poolId`), no inner txns, never reverts on
 * missing state, never raises the fee. With a hint it also reads `AkitaAppList` (P(DAO)), the wallet (P(W))
 * and one auth address (A(W.address) or A(C)). Clients attach these references to the swap txn.
 *
 * The protocol share follows automatically: the Vault takes protocolFeeBps of the (discounted) LP fee.
 *
 * Measurement (openPass / refresh / refreshFromGate) runs off the hot path against the key itself. Only the
 * key's owner can open a pass: `key == principalOf(F, wallet).principal` for the caller's own hint (EOAs pass
 * 0; ARC-58 wallets call through a plugin that forwards `windowHint(wallet)`). The MBR payment may come from
 * anyone (the funder). Gate bits are measured with `Gate.checkFor(ctx)`, `ctx` = the owner's verified
 * context, or `(key, 0, key)` when a funder or a third party re-measures.
 *
 * Daily cap (OPEN-DECISIONS #18, laundering mitigation): each pass may take at most
 * `maxDiscountedSwapsPerDay` discounted swaps per UTC day (`Global.latestTimestamp / SecondsPerDay`;
 * 0 = unlimited). BeforeSwap counts a swap only when it actually lowers the fee; once the count reaches
 * the cap the hook prices at the incoming fee for the rest of the day (it never reverts). Quote reads the
 * same counter without writing, so quote == swap for a single swap. A route that crosses gated pools
 * several times counts once per hop, so `quoteRoute` can overstate the discount when the pass reaches
 * the cap inside the route. The counter survives refresh, and a pass with discounted swaps today cannot be
 * closed until the next UTC day, so close-and-reopen cannot reset it. The count is per principal: every
 * escrow of one wallet that hints it shares the wallet's one pass and one daily count.
 *
 * DAO-mutable (DAO wallet only): gateSlots, passTtl, maxDiscountedSwapsPerDay, defaultSchedule (future
 * pools only). No pool schedule can be changed by anyone after creation. The code is immutable (no
 * update method).
 */
export class GatedFeeHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  akitaDAO = GlobalState<Application>({ key: 'akita_dao' })
  passTtl = GlobalState<uint64>({ key: 'pass_ttl' })
  /** discounted swaps per pass per UTC day; 0 = unlimited */
  maxDiscountedSwapsPerDay = GlobalState<uint64>({ key: 'max_day_swaps' })

  /** key = principal (see the class doc) */
  passes = BoxMap<Account, FeePass>({ keyPrefix: 'p' })
  /** key = PluginDex pool id */
  schedules = BoxMap<uint64, FeeSchedule>({ keyPrefix: 's' })
  /** ≤ MaxGateSlots gate ids; bit i of FeePass.gates refers to slot i (0 = empty slot) */
  gateSlots = Box<uint64[]>({ key: 'g' })
  /** copied into a pool at AfterInitialize when its initData is empty */
  defaultSchedule = Box<FeeSchedule>({ key: 'd' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application, akitaDAO: Application, passTtl: uint64): void {
    const ttl: uint64 = passTtl === 0 ? DefaultPassTtl : passTtl
    loggedAssert(ttl >= MinPassTtl && ttl <= MaxPassTtl, errGfTtl)
    this.dex.value = dex
    this.akitaDAO.value = akitaDAO
    this.passTtl.value = ttl
    this.maxDiscountedSwapsPerDay.value = DefaultMaxDiscountedSwapsPerDay
  }

  // HOOK -----------------------------------------------------------------------------------------

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)

    if (ctx.point === HookPointAfterInitialize) {
      this.initSchedule(ctx.poolId, ctx.data)
      return passResult()
    }
    if (ctx.point !== HookPointBeforeSwap && ctx.point !== HookPointQuote) {
      return passResult()
    }

    // only a real swap counts against the daily cap; Quote never writes
    const swap = ctx.point === HookPointBeforeSwap
    const fee = this.price(ctx.poolId, this.passKey(ctx, swap), ctx.feeBps, swap)
    if (fee === ctx.feeBps) {
      return passResult()
    }
    return { flags: HookResultSetFee, feeBps: fee, hookFee: 0, hookFeeOutBps: 0 }
  }

  // PASSES ---------------------------------------------------------------------------------------

  /**
   * Create the pass of `key` and measure it. Only the key's owner: `key` must be the caller's own principal
   * for its hint (`principalOf(F, wallet)`, strict: an invalid hint reverts). The MBR payment's sender is the
   * funder (refunded on close) and may be anyone.
   */
  openPass(mbr: gtxn.PaymentTxn, key: Account, measure: uint64, gateArgs: bytes[][], wallet: uint64): FeePass {
    const p = this.callerPrincipal(wallet)
    loggedAssert(p.principal === key, errGfAuth)
    loggedAssert(!this.passes(key).exists, errGfExists)
    loggedAssert(mbr.receiver === Global.currentApplicationAddress && mbr.amount === PassMbr, errGfMbr)
    const pass = this.measure(key, gateCtx(p), measure, gateArgs, mbr.sender, 0, 0)
    this.passes(key).value = clone(pass)
    return pass
  }

  /**
   * Re-measure a pass. A live pass only by its key, its funder, or the key's owner by hint
   * (`principalOf(F, wallet).principal == key`); an expired one by anyone.
   */
  refresh(key: Account, measure: uint64, gateArgs: bytes[][], wallet: uint64): FeePass {
    loggedAssert(this.passes(key).exists, errGfNoPass)
    const old = clone(this.passes(key).value)
    const ctx = this.authorize(key, old, wallet)
    // the daily counter carries over: re-measuring never resets the cap
    const pass = this.measure(key, ctx, measure, gateArgs, old.funder, old.swapDay, old.daySwaps)
    this.passes(key).value = clone(pass)
    return pass
  }

  /**
   * Set gate bit `slot` on a live pass from a `Gate.mustCheckFor(ctx, gateSlots[slot], args)` txn in the same
   * group, so the gate runs on its own budget. Only the key's owner: `p = principalOf(F, wallet)` must have
   * `p.principal == key`, and `ctx` must be exactly `gateCtx(p)` (`gateCheckCtx`). Does not extend `validUntil`.
   */
  refreshFromGate(gateTxn: gtxn.ApplicationCallTxn, key: Account, slot: uint64, wallet: uint64): FeePass {
    loggedAssert(this.passes(key).exists, errGfNoPass)
    const pass = clone(this.passes(key).value)
    loggedAssert(pass.validUntil >= Global.latestTimestamp, errGfNoPass)

    const [slots, hasSlots] = clone(this.gateSlots.maybe())
    loggedAssert(hasSlots && slot < slots.length && slots[slot] !== 0, errGfSlot)

    const p = this.callerPrincipal(wallet)
    loggedAssert(p.principal === key, errGfAuth)
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(p), slots[slot]), errGfGateTxn)

    pass.gates = pass.gates | op.shl(1, slot)
    this.passes(key).value = clone(pass)
    return pass
  }

  /**
   * Delete a pass and refund its MBR to the funder. A live pass only by its key, its funder, or the key's owner
   * by hint. Not on a UTC day on which the pass made a discounted swap, so closing and reopening cannot reset
   * the daily cap.
   */
  closePass(key: Account, wallet: uint64): void {
    loggedAssert(this.passes(key).exists, errGfNoPass)
    const pass = clone(this.passes(key).value)
    this.authorize(key, pass, wallet)
    loggedAssert(this.discountedSwapsToday(pass) === 0, errGfDay)
    this.passes(key).delete()
    itxn.payment({ receiver: pass.funder, amount: PassMbr }).submit()
  }

  // ADMIN (DAO wallet) ---------------------------------------------------------------------------

  /** Redefine which gate each pass bit means. Existing bits stay until their pass expires (≤ passTtl). */
  setGateSlots(slots: uint64[]): void {
    this.requireAdmin()
    loggedAssert(slots.length <= MaxGateSlots, errGfSlots)
    this.gateSlots.delete()
    this.gateSlots.value = clone(slots)
  }

  setPassTtl(ttl: uint64): void {
    this.requireAdmin()
    loggedAssert(ttl >= MinPassTtl && ttl <= MaxPassTtl, errGfTtl)
    this.passTtl.value = ttl
  }

  /** Per-pass cap on discounted swaps per UTC day (0 = unlimited). Applies at once, to today's counts. */
  setMaxDiscountedSwapsPerDay(cap: uint64): void {
    this.requireAdmin()
    this.maxDiscountedSwapsPerDay.value = cap
  }

  /** Schedule copied into pools created later with empty initData. Never changes existing pools. */
  setDefaultSchedule(schedule: FeeSchedule): void {
    this.requireAdmin()
    checkSchedule(schedule)
    this.defaultSchedule.delete()
    this.defaultSchedule.value = clone(schedule)
  }

  // READ-ONLY ------------------------------------------------------------------------------------

  @abimethod({ readonly: true })
  getPass(key: Account): FeePass {
    if (!this.passes(key).exists) {
      return { power: 0, impact: 0, gates: 0, validUntil: 0, funder: Global.zeroAddress, swapDay: 0, daySwaps: 0 }
    }
    return clone(this.passes(key).value)
  }

  @abimethod({ readonly: true })
  getSchedule(poolId: uint64): FeeSchedule {
    if (!this.schedules(poolId).exists) {
      return { floorFeeBps: 0, maxDiscountBps: 0, impactMaxDiscountBps: 0, tiers: [] }
    }
    return clone(this.schedules(poolId).value)
  }

  @abimethod({ readonly: true })
  getGateSlots(): uint64[] {
    const [slots, hasSlots] = clone(this.gateSlots.maybe())
    if (!hasSlots) {
      return []
    }
    return slots
  }

  /** The fee this hook would return for the pass `key` (a principal) on `poolId` given a running fee of `feeBps` */
  @abimethod({ readonly: true })
  previewFee(poolId: uint64, key: Account, feeBps: uint64): uint64 {
    return this.price(poolId, key, feeBps, false)
  }

  /** Discounted swaps the pass of `key` has made in the current UTC day (0 without a pass) */
  @abimethod({ readonly: true })
  getDiscountedSwapsToday(key: Account): uint64 {
    const [pass, hasPass] = clone(this.passes(key).maybe())
    return hasPass ? this.discountedSwapsToday(pass) : 0
  }

  @abimethod({ readonly: true })
  passCost(): uint64 {
    return PassMbr
  }

  /** HookInstall.funding a pool needs for a schedule of `tiers` tiers (also for the default schedule) */
  @abimethod({ readonly: true })
  scheduleCost(tiers: uint64): uint64 {
    return ScheduleMbrBase + ScheduleMbrPerTier * tiers
  }

  // PRIVATE --------------------------------------------------------------------------------------

  private requireAdmin(): void {
    loggedAssert(Txn.sender === getDAOARC58Wallet(this.akitaDAO.value).address, errGfAdmin)
  }

  /**
   * Who may refresh or close a pass (spec §6.12): while it is live, `Txn.sender == key`, the funder, or the
   * caller whose principal for `wallet` is `key`; once expired, anyone. The hint is always resolved (strict),
   * so an invalid hint reverts even where it is not needed. Returns the context gate bits are measured with:
   * the caller's verified context when it is the key's principal, else the subject-only `(key, 0, key)`.
   */
  private authorize(key: Account, pass: FeePass, wallet: uint64): GateCtx {
    const p = this.callerPrincipal(wallet)
    if (p.principal === key) {
      return gateCtx(p)
    }
    if (pass.validUntil >= Global.latestTimestamp) {
      loggedAssert(Txn.sender === key || Txn.sender === pass.funder, errGfAuth)
    }
    return { principal: key, wallet: 0, spender: key }
  }

  /**
   * `principalOf(dao, wallet)` (strict: an invalid hint reverts) for this call's Txn.sender. Hint 0 needs no DAO
   * read (P(DAO) only when a wallet is hinted): the resolver returns the plain sender before using the factory.
   */
  private callerPrincipal(wallet: uint64): Principal {
    return resolvePrincipal(wallet === 0 ? 0 : getAkitaAppList(this.akitaDAO.value).wallet, wallet)
  }

  /**
   * The pass key of a BeforeSwap / Quote context (class doc). No DAO read without a hint. BeforeSwap: the Vault
   * (authenticated by `requireDexCaller`) set `ctx.caller` = its Txn.sender and `ctx.callerApp` = its caller app,
   * which is exactly `resolvePrincipalFromDexCtx`'s precondition. Quote: `ctx.caller` is caller-chosen.
   *
   * BeforeSwap from inside an app call (`ctx.callerApp != 0`) with a hint that is not a wallet of `F` (a
   * third-party ARC-58 wallet, or a wallet of another deployment's factory) is priced as hint 0: the key is
   * the authenticated `ctx.caller`, never anything read through the hint. Such a hint can only ever resolve
   * to `ctx.caller`, and immutable plugins (PluginDexPlugin) forward their window hint unconditionally, so
   * a revert here would only block their swaps (IMPLEMENTATION-LOG, plugin-dex review fixes, deviation 1).
   * Quote agrees: `thirdPartyPrincipal` returns the swapper for such a hint. A top-level hint stays strict
   * (errHnwl / errHtop), and a genuine wallet's hint stays strict everywhere (errHnbd, errIwlt).
   */
  private passKey(ctx: HookContext, swap: boolean): Account {
    if (ctx.wallet === 0) {
      return ctx.caller
    }
    const walletFactory = getAkitaAppList(this.akitaDAO.value).wallet
    if (swap) {
      if (ctx.callerApp !== 0 && !isGenuineWallet(ctx.wallet, walletFactory)) {
        return ctx.caller
      }
      return resolvePrincipalFromDexCtx(walletFactory, ctx.wallet, ctx.caller, ctx.callerApp).principal
    }
    return thirdPartyPrincipal(walletFactory, ctx.caller, ctx.wallet)
  }

  /** Write the pool's schedule once: F6 initData, or the default schedule when initData is empty */
  private initSchedule(poolId: uint64, data: bytes): void {
    loggedAssert(!this.schedules(poolId).exists, errGfScheduleSet)
    if (data.length === 0) {
      const [fallback, hasDefault] = clone(this.defaultSchedule.maybe())
      if (hasDefault) {
        this.schedules(poolId).value = clone(fallback)
      }
      return
    }
    // exact ARC-4 shape: 3 × uint64, a tail pointer of 26, then a uint16 length and 32 B per tier
    loggedAssert(data.length >= ScheduleHeadBytes, errGfSchedule)
    loggedAssert(
      op.extractUint16(data, 24) === ScheduleHeadBytes - 2 && data.length === ScheduleHeadBytes + ScheduleTierBytes * op.extractUint16(data, 26),
      errGfSchedule,
    )
    const schedule = decodeArc4<FeeSchedule>(data)
    checkSchedule(schedule)
    this.schedules(poolId).value = clone(schedule)
  }

  /** Discounted swaps `pass` made in the current UTC day */
  private discountedSwapsToday(pass: FeePass): uint64 {
    return pass.swapDay === Global.latestTimestamp / SecondsPerDay ? pass.daySwaps : 0
  }

  /**
   * Hot path: never reverts on missing state; returns `feeBps` when no discount applies, including once
   * the pass has used today's cap. With `count` (BeforeSwap only) a discount is recorded on the pass.
   */
  private price(poolId: uint64, key: Account, feeBps: uint64, count: boolean): uint64 {
    const [pass, hasPass] = clone(this.passes(key).maybe())
    if (!hasPass || pass.validUntil < Global.latestTimestamp) {
      return feeBps
    }
    const [schedule, hasSchedule] = clone(this.schedules(poolId).maybe())
    if (!hasSchedule) {
      return feeBps
    }
    const used = this.discountedSwapsToday(pass)
    const cap = this.maxDiscountedSwapsPerDay.value
    if (cap !== 0 && used >= cap) {
      return feeBps
    }
    const fee = discountedFee(pass, schedule, feeBps)
    if (count && fee < feeBps) {
      const counted = clone(pass)
      counted.swapDay = Global.latestTimestamp / SecondsPerDay
      counted.daySwaps = used + 1
      this.passes(key).value = clone(counted)
    }
    return fee
  }

  /**
   * One consistent snapshot of `key`. Fields outside `measure` are 0; the counter is carried. Gate bits use
   * `Gate.checkFor(ctx, ...)`: context-aware sub-gates see the owner's verified context (e.g. a subscription
   * held by one of the owner's escrows), every other sub-gate sees `check(ctx.principal == key, ...)`.
   */
  private measure(
    key: Account,
    ctx: GateCtx,
    measure: uint64,
    gateArgs: bytes[][],
    funder: Account,
    swapDay: uint64,
    daySwaps: uint64,
  ): FeePass {
    loggedAssert((measure | MeasureAll) === MeasureAll, errGfMeasure)
    const validUntil: uint64 = Global.latestTimestamp + this.passTtl.value
    const pass: FeePass = { power: 0, impact: 0, gates: 0, validUntil, funder, swapDay, daySwaps }
    if (measure === 0) {
      return pass
    }

    const dao = this.akitaDAO.value

    if ((measure & MeasurePower) !== 0) {
      // 0 unless the lock outlives the pass: an unlockable stake can never ride a live pass
      pass.power = getStakingPowerThrough(getAkitaAppList(dao).staking, key, getAkitaAssets(dao).akta, validUntil)
    }

    if ((measure & MeasureImpact) !== 0) {
      pass.impact = getUserImpact(dao, key)
    }

    if ((measure & MeasureGates) !== 0) {
      const [slots, hasSlots] = clone(this.gateSlots.maybe())
      const count: uint64 = hasSlots ? slots.length : 0
      loggedAssert(gateArgs.length === count, errGfArgs)
      ensureBudget(GateMeasureBudget, OpUpFeeSource.GroupCredit)
      const gate = getAkitaAppList(dao).gate
      for (let i: uint64 = 0; i < count; i += 1) {
        if (
          slots[i] !== 0 &&
          abiCall<typeof Gate.prototype.checkFor>({ appId: gate, args: [clone(ctx), slots[i], clone(gateArgs[i])] }).returnValue
        ) {
          pass.gates = pass.gates | op.shl(1, i)
        }
      }
    }

    return pass
  }
}
