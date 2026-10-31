import {
  Account,
  Application,
  Asset,
  Bytes,
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
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { Escrow } from '../../../escrow/contract.algo'
import type { PluginDex } from '../../../plugin-dex/contract.algo'
import { readAdapter } from '../../../plugin-dex/venues/registry.algo'
import type { VenueAdapter } from '../../../plugin-dex/venues/venue-adapter'
import { getSpendingAccount } from '../../../utils/functions'
import { windowHint } from '../../../utils/principal'
import { FlagAllowDirect, MaxCandidates, MaxChunks, MaxLegs, MaxSegments } from './constants'
import {
  errRtAlgoLeak,
  errRtCustody,
  errRtDirect,
  errRtFunds,
  errRtInit,
  errRtNoLiq,
  errRtOverspend,
  errRtPayment,
  errRtQuote,
  errRtRekeyBack,
  errRtRoute,
  errRtSlippage,
} from './errors'
import { AdapterInfo, Leg, LegEvent, RouteEvent, Segment } from './types'

/** PluginDex MaxRouteHops */
const MaxPools: uint64 = 4
const BpsDivisor: uint64 = 10_000
/**
 * Opcode budget ensured before a native segment. The Vault call itself adds 700 to the pool, which
 * covers its first hop; this only covers the router's own work after the call (measured in G1).
 */
const NativeSegmentBudget: uint64 = 400

/**
 * AkitaRouterPlugin (router.md §4-§5, FINAL-SPEC WP4): an immutable, adminless ARC-58 plugin that
 * executes a whole swap in inner transactions while it holds the flash-rekeyed spending account S.
 *
 * - Native legs call `PluginDex.swapRoute` **sent as S**, so hooks see `ctx.caller == S`; native
 *   quotes in `swapBest` use `PluginDex.tryQuoteRoute(swapper = S)`, also sent as S. Both pass the wallet
 *   hint `windowHint(wallet)` (= `wallet.id`, never a caller-chosen value; principal-resolution spec §3.8
 *   rule 6, §6.11), so hooks see `ctx.wallet == W` and can resolve the principal (GatedFeeHook).
 * - External legs go through version-pinned adapters approved in the VenueRegistry, always in
 *   SANDBOX custody: the router's own leg escrow E (a child Escrow app rekeyed to this app) is
 *   flash-rekeyed to the adapter, never S. DIRECT custody (`FlagAllowDirect`) is reserved and
 *   reverts with errRtDirect in v1.
 * - Guards: per adapter segment (handback, input spent <= amount, no ALGO leak), per leg and
 *   aggregate minimums on S, and the swapBest quote promise.
 *
 * Inner transactions are pooled at 256 per group (FINAL-SPEC §1); `opUp` carriers placed after
 * `arc58_verifyAuthAddress` are only needed for opcode budget and resource references.
 * Never updated: the ARC-58 wallet requires the plugin's Application.version == 0.
 */
@contract({ avmVersion: 13 })
export class AkitaRouterPlugin extends Contract {
  version = GlobalState<string>({ key: 'version' })
  /** PluginDex (immutable) */
  dex = GlobalState<Application>({ key: 'dex' })
  /** VenueRegistry */
  registry = GlobalState<Application>({ key: 'registry' })
  /** leg escrow E: child Escrow app rekeyed to this app; 0 until `init` */
  legEscrow = GlobalState<Application>({ key: 'leg_escrow' })

  @abimethod({ onCreate: 'require' })
  create(version: string, dex: Application, registry: Application): void {
    this.version.value = version
    this.dex.value = dex
    this.registry.value = registry
    this.legEscrow.value = Application(0)
  }

  /**
   * Once, permissionless: create the leg escrow E, fund its min balance and rekey it to this app.
   * The payment (to this app) must cover this app's MBR increase plus E's funding; the excess is
   * refunded. This app's own base min balance must already be funded.
   */
  init(payment: gtxn.PaymentTxn): uint64 {
    loggedAssert(this.legEscrow.value.id === 0, errRtInit)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errRtPayment)
    const mbrBefore = Global.currentApplicationAddress.minBalance

    const escrowContract = compileArc4(Escrow)
    const escrowApp = escrowContract.call.create({
      args: [Bytes(op.itob(Global.currentApplicationId.id))],
    }).itxn.createdApp
    itxn.payment({ receiver: escrowApp.address, amount: Global.minBalance }).submit()
    escrowContract.call.rekey({ appId: escrowApp, args: [Global.currentApplicationAddress] })
    this.legEscrow.value = escrowApp

    const cost: uint64 = Global.currentApplicationAddress.minBalance - mbrBefore + Global.minBalance
    this.refund(payment, cost)
    return escrowApp.id
  }

  /** Permissionless: opt E into `assets`; the payment (to this app) covers 0.1 ALGO per new opt-in */
  optInLegEscrow(payment: gtxn.PaymentTxn, assets: uint64[]): void {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errRtPayment)
    const legEscrow = this.legEscrowAccount()
    let cost: uint64 = 0
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      const asset = assets[i]
      if (asset !== 0 && !legEscrow.isOptedIn(Asset(asset))) {
        itxn.payment({ receiver: legEscrow, amount: Global.assetOptInMinBalance }).submit()
        this.send(legEscrow, legEscrow, asset, 0)
        cost += Global.assetOptInMinBalance
      }
    }
    this.refund(payment, cost)
  }

  /** No-op carrier for opcode budget and resource references; place it AFTER arc58_verifyAuthAddress */
  opUp(): void {}

  // PLUGIN METHODS -------------------------------------------------------------------------------

  /**
   * Execute explicit legs. Each leg's segments run in order; segment k's input is segment k-1's
   * measured output. Intermediate values live in E, the last segment of a leg delivers to S.
   * Returns the output received by S.
   */
  swap(
    wallet: Application,
    rekeyBack: boolean,
    assetIn: uint64,
    assetOut: uint64,
    minAmountOut: uint64,
    flags: uint64,
    legs: Leg[],
  ): uint64 {
    const spender = this.enter(wallet, flags)
    const hint = windowHint(wallet)
    loggedAssert(assetIn !== assetOut && legs.length > 0 && legs.length <= MaxLegs, errRtRoute)

    // pre-pass: shape, adapter approvals, and every opt-in before the snapshot
    let totalIn: uint64 = 0
    for (let i: uint64 = 0; i < legs.length; i += 1) {
      const leg = clone(legs[i])
      const count: uint64 = leg.segments.length
      loggedAssert(count > 0 && count <= MaxSegments && leg.amountIn > 0, errRtRoute)
      loggedAssert(leg.segments[count - 1].assetOut === assetOut, errRtRoute)
      totalIn += leg.amountIn
      let asset = assetIn
      for (let k: uint64 = 0; k < count; k += 1) {
        const seg = clone(leg.segments[k])
        this.checkSegment(seg, asset)
        if (seg.venue !== 0) {
          this.ensureLegOptIn(spender, asset)
          this.ensureLegOptIn(spender, seg.assetOut)
        } else if (k + 1 < count) {
          this.ensureLegOptIn(spender, seg.assetOut)
        }
        asset = seg.assetOut
      }
    }
    this.ensureOptIn(spender, assetOut)

    const in0 = this.holding(spender, assetIn)
    const out0 = this.holding(spender, assetOut)
    const algo0 = this.holding(spender, 0)
    loggedAssert(totalIn <= in0, errRtFunds)

    for (let i: uint64 = 0; i < legs.length; i += 1) {
      const leg = clone(legs[i])
      const count: uint64 = leg.segments.length
      let holder = spender
      let asset = assetIn
      let amount = leg.amountIn
      for (let k: uint64 = 0; k < count; k += 1) {
        const seg = clone(leg.segments[k])
        const last = k + 1 === count
        amount = this.runSegment(spender, hint, i, holder, asset, amount, seg, last, last ? leg.minAmountOut : 0)
        holder = last ? spender : this.legEscrowAccount()
        asset = seg.assetOut
      }
      loggedAssert(amount >= leg.minAmountOut, errRtSlippage)
    }

    return this.finish(wallet, rekeyBack, spender, assetIn, assetOut, totalIn, minAmountOut, legs.length, in0, out0, algo0)
  }

  /**
   * On-chain best-of-N with greedy chunks: `amountIn` is split into `chunks` equal parts (the last
   * takes the remainder). Each chunk is quoted on every candidate (native: tryQuoteRoute sent as S;
   * adapters: akitaVenueQuote) and executed on the best one, which must deliver at least its own
   * quote minus `toleranceBps` (errRtQuote). Candidates are single segments assetIn -> assetOut.
   */
  swapBest(
    wallet: Application,
    rekeyBack: boolean,
    assetIn: uint64,
    assetOut: uint64,
    amountIn: uint64,
    minAmountOut: uint64,
    flags: uint64,
    chunks: uint64,
    toleranceBps: uint64,
    candidates: Segment[],
  ): uint64 {
    const spender = this.enter(wallet, flags)
    const hint = windowHint(wallet)
    loggedAssert(assetIn !== assetOut && candidates.length > 0 && candidates.length <= MaxCandidates, errRtRoute)
    loggedAssert(chunks > 0 && chunks <= MaxChunks && amountIn >= chunks && toleranceBps <= BpsDivisor, errRtRoute)

    let external = false
    for (let i: uint64 = 0; i < candidates.length; i += 1) {
      const candidate = clone(candidates[i])
      loggedAssert(candidate.assetOut === assetOut, errRtRoute)
      this.checkSegment(candidate, assetIn)
      if (candidate.venue !== 0) external = true
    }
    if (external) {
      this.ensureLegOptIn(spender, assetIn)
      this.ensureLegOptIn(spender, assetOut)
    }
    this.ensureOptIn(spender, assetOut)

    const in0 = this.holding(spender, assetIn)
    const out0 = this.holding(spender, assetOut)
    const algo0 = this.holding(spender, 0)
    loggedAssert(amountIn <= in0, errRtFunds)

    const base: uint64 = amountIn / chunks
    for (let c: uint64 = 0; c < chunks; c += 1) {
      const amount: uint64 = c + 1 === chunks ? amountIn - base * (chunks - 1) : base

      let best: uint64 = 0
      let bestQuote: uint64 = 0
      for (let i: uint64 = 0; i < candidates.length; i += 1) {
        const q = this.quoteCandidate(spender, hint, clone(candidates[i]), assetIn, assetOut, amount)
        if (q > bestQuote) {
          bestQuote = q
          best = i
        }
      }
      loggedAssert(bestQuote > 0, errRtNoLiq)

      // the quote promise: what a deterministic venue just quoted is what it must deliver
      const promise: uint64 = bestQuote - op.divw(...op.mulw(bestQuote, toleranceBps), BpsDivisor)
      const got = this.runSegment(spender, hint, c, spender, assetIn, amount, clone(candidates[best]), true, promise)
      loggedAssert(got >= promise, errRtQuote)
    }

    return this.finish(wallet, rekeyBack, spender, assetIn, assetOut, amountIn, minAmountOut, chunks, in0, out0, algo0)
  }

  // PRIVATE ---------------------------------------------------------------------------------------

  /**
   * S must be rekeyed to this app (a wallet window is open); DIRECT custody is reserved in v1.
   * S must never be the leg escrow E: E stays rekeyed to this app permanently, so an app publishing
   * `spending_address = E` would otherwise pass the custody check and have E rekeyed to it by the
   * handback. Any other account rekeyed to this app is a genuine wallet's S inside that wallet's own
   * group, which only the wallet's caller can assemble.
   */
  private enter(wallet: Application, flags: uint64): Account {
    const spender = getSpendingAccount(wallet)
    loggedAssert(spender !== this.legEscrowAccount(), errRtCustody)
    // acct_params_get (not .authAddress) so a closed window (no spending account) fails with errRtCustody
    const [auth] = op.AcctParams.acctAuthAddr(spender)
    loggedAssert(auth === Global.currentApplicationAddress, errRtCustody)
    loggedAssert((flags & FlagAllowDirect) === 0, errRtDirect)
    loggedAssert(flags === 0, errRtRoute)
    return spender
  }

  private legEscrowAccount(): Account {
    loggedAssert(this.legEscrow.value.id !== 0, errRtInit)
    return this.legEscrow.value.address
  }

  /** native: 1..4 pools and a pool escrow; adapter: approved, enabled and version-pinned */
  private checkSegment(seg: Segment, assetIn: uint64): void {
    loggedAssert(seg.assetOut !== assetIn, errRtRoute)
    if (seg.venue === 0) {
      loggedAssert(seg.pools.length > 0 && seg.pools.length <= MaxPools && seg.escrow !== Global.zeroAddress, errRtRoute)
    } else {
      readAdapter(this.registry.value, seg.venue)
    }
  }

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

  private refund(payment: gtxn.PaymentTxn, cost: uint64): void {
    loggedAssert(payment.amount >= cost, errRtPayment)
    if (payment.amount > cost) {
      itxn.payment({ receiver: payment.sender, amount: payment.amount - cost }).submit()
    }
  }

  /** opt S into an ASA (0.1 ALGO MBR from S) */
  private ensureOptIn(spender: Account, asset: uint64): void {
    if (asset !== 0 && !spender.isOptedIn(Asset(asset))) {
      this.send(spender, spender, asset, 0)
    }
  }

  /** opt E into an ASA, paying its 0.1 ALGO MBR from S (once per asset, shared by every user) */
  private ensureLegOptIn(spender: Account, asset: uint64): void {
    const legEscrow = this.legEscrowAccount()
    if (asset !== 0 && !legEscrow.isOptedIn(Asset(asset))) {
      itxn.payment({ sender: spender, receiver: legEscrow, amount: Global.assetOptInMinBalance }).submit()
      this.send(legEscrow, legEscrow, asset, 0)
    }
  }

  /**
   * Native: `tryQuoteRoute(swapper = S, wallet = hint)`. A Quote hook resolves the hint only with the quote-only
   * at-rest helper (spec §6.12), and inside this window S is rekeyed to this app: a pass keyed by the wallet's
   * principal is priced for S here only when S is that principal (default grants: S == W.address == C). In an
   * escrow window the quote prices S (usually no pass), so it can understate, never overstate, the swap's
   * discount unless S itself holds a pass (IMPLEMENTATION-LOG, plugin-dex track).
   */
  private quoteCandidate(spender: Account, hint: uint64, candidate: Segment, assetIn: uint64, assetOut: uint64, amount: uint64): uint64 {
    if (candidate.venue === 0) {
      return abiCall<typeof PluginDex.prototype.tryQuoteRoute>({
        appId: this.dex.value,
        sender: spender,
        args: [candidate.pools, assetIn, amount, spender, candidate.data, hint],
      }).returnValue
    }
    const info = readAdapter(this.registry.value, candidate.venue)
    return abiCall<typeof VenueAdapter.prototype.akitaVenueQuote>({
      appId: candidate.venue,
      rejectVersion: info.version + 1,
      args: [assetIn, assetOut, amount, candidate.data],
    }).returnValue
  }

  /**
   * Run one segment from `holder`. Native output goes to S when `last`, else to E; adapter output
   * always lands in E and is swept to S when `last`. `minOut` is passed to the venue as its own floor.
   * Returns the measured output (> 0).
   */
  private runSegment(
    spender: Account,
    hint: uint64,
    legIndex: uint64,
    holder: Account,
    asset: uint64,
    amount: uint64,
    seg: Segment,
    last: boolean,
    minOut: uint64,
  ): uint64 {
    loggedAssert(amount > 0, errRtSlippage)
    // native: deliver to S on the last segment, else to E; adapters always execute in E
    const target = seg.venue === 0 && last ? spender : this.legEscrowAccount()
    let got: uint64 = 0
    let executor = holder
    if (seg.venue === 0) {
      got = this.runNative(spender, hint, holder, asset, amount, seg, minOut, target)
    } else {
      executor = target
      got = this.runAdapter(spender, holder, asset, amount, seg, minOut, target)
      if (last) {
        this.send(target, spender, seg.assetOut, got)
      }
    }
    // minOut was enforced by the venue; callers check their own floors (leg min, quote promise)
    loggedAssert(got > 0, errRtSlippage)
    emit<LegEvent>({
      leg: legIndex,
      venue: seg.venue,
      holder: executor,
      assetIn: asset,
      amountIn: amount,
      assetOut: seg.assetOut,
      amountOut: got,
    })
    return got
  }

  /** PluginDex.swapRoute sent as S with the window's wallet hint; the deposit comes from `holder` (S or E) */
  private runNative(
    spender: Account,
    hint: uint64,
    holder: Account,
    asset: uint64,
    amount: uint64,
    seg: Segment,
    minOut: uint64,
    recipient: Account,
  ): uint64 {
    ensureBudget(NativeSegmentBudget, OpUpFeeSource.GroupCredit)
    const before = this.holding(recipient, seg.assetOut)
    if (asset === 0) {
      abiCall<typeof PluginDex.prototype.swapRoute>({
        appId: this.dex.value,
        sender: spender,
        args: [itxn.payment({ sender: holder, receiver: seg.escrow, amount }), seg.pools, minOut, recipient, seg.data, hint],
      })
    } else {
      abiCall<typeof PluginDex.prototype.swapRoute>({
        appId: this.dex.value,
        sender: spender,
        args: [
          itxn.assetTransfer({ sender: holder, assetReceiver: seg.escrow, xferAsset: asset, assetAmount: amount }),
          seg.pools,
          minOut,
          recipient,
          seg.data,
          hint,
        ],
      })
    }
    const after = this.holding(recipient, seg.assetOut)
    loggedAssert(after >= before, errRtSlippage)
    return after - before
  }

  /** SANDBOX adapter segment: E is flash-rekeyed to the pinned adapter, then checked */
  private runAdapter(
    spender: Account,
    holder: Account,
    asset: uint64,
    amount: uint64,
    seg: Segment,
    minOut: uint64,
    legEscrow: Account,
  ): uint64 {
    const info: AdapterInfo = readAdapter(this.registry.value, seg.venue)
    const venue = Application(seg.venue)
    if (holder !== legEscrow) {
      this.send(holder, legEscrow, asset, amount)
    }
    ensureBudget(info.opBudget, OpUpFeeSource.GroupCredit)

    const in0 = this.holding(legEscrow, asset)
    const out0 = this.holding(legEscrow, seg.assetOut)
    const algo0 = this.holding(legEscrow, 0)
    const mbr0 = legEscrow.minBalance

    itxn.payment({ sender: legEscrow, receiver: legEscrow, amount: 0, rekeyTo: venue.address }).submit()
    abiCall<typeof VenueAdapter.prototype.akitaVenueSwap>({
      appId: venue,
      rejectVersion: info.version + 1,
      args: [legEscrow, asset, amount, seg.assetOut, minOut, seg.data, Global.currentApplicationAddress],
    })
    loggedAssert(legEscrow.authAddress === Global.currentApplicationAddress, errRtRekeyBack)

    // E's min balance is shared state (opt-ins every user paid for): an adapter may neither close nor add
    // opt-ins. Closing one would free 0.1 ALGO that the unspent refund below would otherwise hand to S.
    loggedAssert(legEscrow.minBalance === mbr0, errRtAlgoLeak)
    const in1 = this.holding(legEscrow, asset)
    const out1 = this.holding(legEscrow, seg.assetOut)
    // spent <= amount, so E's baseline (dust, other users' nothing) is never touched; and E's input
    // balance may not grow (in1 <= in0), so the refund below is bounded by the input handed over
    loggedAssert(in1 + amount >= in0 && in1 <= in0, errRtOverspend)
    loggedAssert(out1 >= out0, errRtSlippage)
    if (asset !== 0 && seg.assetOut !== 0) {
      loggedAssert(this.holding(legEscrow, 0) >= algo0, errRtAlgoLeak)
    }
    // partial-fill venues: hand the unspent input (≤ amount) back to S. On an intermediate segment the
    // input is a route asset S may not hold: refund it only when S can receive it (ALGO or opted in),
    // otherwise the adapter must fill the whole input (errRtSlippage), as nothing else may keep it.
    const unspent: uint64 = in1 + amount - in0
    if (unspent > 0) {
      loggedAssert(asset === 0 || spender.isOptedIn(Asset(asset)), errRtSlippage)
      this.send(legEscrow, spender, asset, unspent)
    }
    return out1 - out0
  }

  /** aggregate guard on S, RouteEvent, then the handback (the last inner txn) */
  private finish(
    wallet: Application,
    rekeyBack: boolean,
    spender: Account,
    assetIn: uint64,
    assetOut: uint64,
    totalIn: uint64,
    minAmountOut: uint64,
    legs: uint64,
    in0: uint64,
    out0: uint64,
    algo0: uint64,
  ): uint64 {
    const in1 = this.holding(spender, assetIn)
    const out1 = this.holding(spender, assetOut)
    loggedAssert(in1 + totalIn >= in0, errRtOverspend)
    loggedAssert(out1 >= out0, errRtSlippage)
    const out: uint64 = out1 - out0
    loggedAssert(out >= minAmountOut, errRtSlippage)
    if (assetIn !== 0 && assetOut !== 0) {
      loggedAssert(this.holding(spender, 0) >= algo0, errRtAlgoLeak)
    }
    emit<RouteEvent>({
      wallet: wallet.id,
      account: spender,
      assetIn,
      amountIn: totalIn,
      assetOut,
      amountOut: out,
      legs,
    })
    if (rekeyBack) {
      // hand back the S checked in enter(), never a re-read: an app reachable during the swap (an approved
      // hook, curve, valuator or adapter making an outside call) could flip a fake wallet's spending_address
      // to E mid-call, and a re-read would then rekey E away from this app (time-of-check/time-of-use)
      loggedAssert(getSpendingAccount(wallet) === spender, errRtCustody)
      itxn.payment({ sender: spender, receiver: spender, amount: 0, rekeyTo: wallet.address }).submit()
    }
    return out
  }
}
