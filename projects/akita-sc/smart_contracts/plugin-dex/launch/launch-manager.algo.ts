import {
  Account,
  Application,
  Asset,
  BoxMap,
  Bytes,
  bytes,
  clone,
  Contract,
  emit,
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
  Uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, encodeArc4, sizeOf } from '@algorandfoundation/algorand-typescript/arc4'
import {
  BpsDivisor,
  HookPermDynamicFee,
  HookPermHookFee,
  HookPermHookFeeOut,
  HookPointAfterAddLiquidity,
  HookPointAfterInitialize,
  HookPointAfterSwap,
  HookPointBeforeSwap,
  HookPointQuote,
  MaxFeeBps,
  MaxPoolFeeCapBps,
  PluginDexGlobalStateKeyTreasury,
} from '../constants'
import { mulDiv, mulDivUp } from '../math'
import { ExternalSlotConfig, HookInstall, PoolConfig } from '../types'
import { MinDisbursementsMBR, UserAllocationMBR } from '../../rewards/constants'
import { UserAllocation } from '../../rewards/types'

// CONTRACT IMPORTS (types only: nothing from these files is compiled into this app)
import type { PluginDex } from '../contract.algo'
import type { SnipeConfig, SnipeInit } from '../hooks/anti-snipe-fee.algo'
import type { TaxConfig, TaxInit } from '../hooks/launch-tax.algo'
import type { Rewards } from '../../rewards/contract.algo'

// LAUNCH MANAGER (FINAL-SPEC §5 WP5b, akita-hooks B6; §10 A36, A36.1 dev buy) ------------------------

/** AntiSnipeFeeHook start mode (mirrors SnipeStartFirstLiquidity in the hook) */
const SnipeStartFirstLiquidity: uint64 = 1

export const LaunchManagerBoxPrefixLaunches = 'l'

/** opcode budget `launch` needs before its first inner app call (params decode, validation, hook stack) */
const LaunchBudget: uint64 = 2_100

/**
 * Immutable ceiling on the DAO's dev-buy cap: a dev buy may never receive more than 10% of the curve
 * supply S, whatever `setDevBuy` configures.
 */
export const MaxDevBuyBps: uint64 = 1_000
/** Rewards disbursement expiration for a vested dev buy: never, so the creator can always claim after unlock */
const DevBuyNeverExpires: uint64 = Uint64.MAX_VALUE
/**
 * µALGO Rewards v2 createInstantAsaDisbursement takes (exactly) for one single-allocation disbursement
 * (79,800). `devBuy` still measures Rewards' minimum balance and tops up any gap (0 with Rewards v2,
 * whose MinDisbursementsMBR is the exact box cost). The v1 app takes exactly 67,000, so it reverts.
 */
export const DevBuyDisbursementMbr: uint64 = MinDisbursementsMBR + UserAllocationMBR

/** `createToken` input: the fair-launch ASA */
export type TokenParams = {
  assetName: string
  unitName: string
  url: string
  decimals: uint64
  /** T: every unit is minted to this app and later moved into the pool's escrow */
  totalSupply: uint64
}

/**
 * `launch` input. The quote asset is ALGO. The token always has a higher id than ALGO, so the pool is
 * (A = ALGO, B = token) with `quoteIsA = true`, `virtualA = virtualQuote`, `virtualB = virtualToken`.
 * T is the token's total supply.
 */
export type LaunchParams = {
  /** S: the bonding-curve allocation (initial real token reserve); M = T − S is the graduation reserve */
  curveSupply: uint64
  /** vA: virtual ALGO offset (µALGO) */
  virtualQuote: uint64
  /** vB: virtual token offset */
  virtualToken: uint64
  /** G: real ALGO reserve that unlocks graduation (≤ rA_max = vA·S/vB) */
  graduationThreshold: uint64
  /** pool LP fee (≤ MaxFeeBps) */
  feeBps: uint64
  /** AntiSnipeFeeHook config; `exempt` is replaced with this app's address */
  snipe: SnipeInit
  /** LaunchTaxHook taxes (owner = the launcher); both 0 installs no tax hook */
  buyTaxBps: uint64
  sellTaxBps: uint64
  taxUntilRound: uint64
  /** install the DAO's GatedFeeHook first in the stack */
  gated: boolean
  /** GatedFeeHook initData (empty = the hook's DAO default schedule) */
  gatedInitData: bytes
  /** GatedFeeHook F6 funding; 0 = the admin-configured default */
  gatedFunding: uint64
  /**
   * µALGO of the disclosed dev buy (0 = none): swapped in the launch call right after initializeLaunch,
   * AntiSnipe-exempt (e == 0, caller = this app); the tokens are locked in Rewards for the creator
   */
  devBuy: uint64
  /** seconds until the dev-buy tokens unlock, within the DAO's [devVestMin, devVestMax] */
  devVestSeconds: uint64
}

export type LaunchResult = { launchId: uint64; asset: uint64; poolId: uint64 }

type DevBuyResult = { tokens: uint64; unlock: uint64; rewards: uint64; disbursement: uint64 }

export type Launch = {
  creator: Account
  asset: uint64
  /** valid once `launched` */
  poolId: uint64
  /** µALGO held for whoever triggers graduation through `graduate` */
  bounty: uint64
  /** set by `launch` (phase 2) */
  launched: boolean
  /** set once `graduate` has run (bounty paid or refunded) */
  settled: boolean
  /** dev-buy tokens locked in Rewards for the creator (0 = no dev buy) */
  devTokens: uint64
  /** unix time from which the creator can claim the dev-buy tokens */
  devUnlock: uint64
  /** the Rewards app holding them (`setDevBuy` can repoint `rewards` for later launches) */
  devRewards: uint64
  /** the disbursement in that Rewards app */
  devDisbursement: uint64
}

export type LaunchEvent = {
  launchId: uint64
  creator: Account
  asset: uint64
  poolId: uint64
  totalSupply: uint64
  curveSupply: uint64
  virtualQuote: uint64
  virtualToken: uint64
  graduationThreshold: uint64
  launchFee: uint64
  bounty: uint64
  /** dev-buy disclosure: µALGO in, tokens out (locked), unlock time, Rewards app and disbursement; all 0 without one */
  devBuy: uint64
  devTokens: uint64
  devUnlock: uint64
  devRewards: uint64
  devDisbursement: uint64
}

export type LaunchSettledEvent = {
  launchId: uint64
  poolId: uint64
  /** receives the bounty: Txn.sender if this call graduated the pool, else the launch creator */
  recipient: Account
  bounty: uint64
  /** true when this call triggered PluginDex.graduate */
  graduated: boolean
}

const errAdmin = 'errLmad'
const errPayment = 'errLmpy'
const errParams = 'errLmpr'
const errNotFound = 'errLmnf'
const errSettled = 'errLmst'
const errHooks = 'errLmhk'
const errCreator = 'errLmcr'
const errLaunched = 'errLmln'
/** the current launch fee or bounty exceeds the caller's cap (maxLaunchFee / maxBounty) */
const errFeeCap = 'errLmcp'
/** dev buy unavailable, vesting outside the DAO's bounds, or the tokens out exceed the DAO's cap */
const errDevBuy = 'errLmdv'

/**
 * Creator-token launches on PluginDex (akita-hooks B6). Immutable code; the admin (the DAO wallet) sets
 * the launch fee, the graduation bounty, the treasury and the hook apps for future launches.
 *
 * A launch takes two transactions (groups), because the token's asset id must be known before the
 * group that creates the pool can reference the pool-index box keyed by it (`x ‖ (0, asset)`); asset
 * ids advance with every transaction on the network, so they cannot be predicted at simulate time.
 *
 * 1. `createToken` mints a fair-launch ASA (no manager, reserve, freeze or clawback; the whole supply
 *    is held here) and records a pending launch for the caller.
 * 2. `launch` (the same creator) creates the launch (VCPMM) pool with the hook stack
 *    `[GatedFee?, AntiSnipe, LaunchTax?]` configured through F6 and seeds it with `initializeLaunch`:
 *    S tokens on the curve, M = T − S locked as the graduation reserve, and the launch LP locked in the
 *    Vault forever. Leftover tokens at graduation stay locked in the escrow (FINAL-SPEC §7.3). It
 *    collects the DAO launch fee and escrows the graduation bounty.
 * 3. Optionally (`LaunchParams.devBuy > 0`), in the same `launch` call, the disclosed dev buy (§10 A36.1):
 *    an AntiSnipe-exempt swap at the launch price, capped by the DAO at `devBuyMaxBps` of S, whose tokens
 *    are locked in Akita Rewards for the creator until `now + devVestSeconds` (DAO-bounded) and disclosed
 *    in the LaunchEvent and the launch record.
 *
 * Safety of a launch does not depend on this app (B6 "Trust"): the Vault locks the LP, blocks LP
 * operations while bonding and lets anyone graduate. This app adds the fair-launch ASA, parameter
 * validation, the DAO launch fee and the graduation bounty.
 */
export class LaunchManager extends Contract {
  vault = GlobalState<Application>({ key: 'vault' })
  admin = GlobalState<Account>({ key: 'admin' })
  treasury = GlobalState<Account>({ key: 'treasury' })
  /** µALGO paid to the treasury per launch */
  launchFee = GlobalState<uint64>({ key: 'launch_fee' })
  /** µALGO escrowed per launch and paid to the caller of `graduate` */
  bounty = GlobalState<uint64>({ key: 'bounty' })
  antiSnipeHook = GlobalState<uint64>({ key: 'anti_snipe' })
  launchTaxHook = GlobalState<uint64>({ key: 'launch_tax' })
  /** 0 = gated launches unavailable */
  gatedHook = GlobalState<uint64>({ key: 'gated' })
  gatedFunding = GlobalState<uint64>({ key: 'gated_funding' })
  launchCursor = GlobalState<uint64>({ key: 'launch_cursor' })
  /** Akita Rewards app that vests dev buys; 0 = dev buys unavailable */
  rewards = GlobalState<uint64>({ key: 'rewards' })
  /** cap on a dev buy's tokens out, in bps of the curve supply S (≤ MaxDevBuyBps); 0 = dev buys unavailable */
  devBuyMaxBps = GlobalState<uint64>({ key: 'dev_max_bps' })
  /** bounds on `LaunchParams.devVestSeconds` */
  devVestMin = GlobalState<uint64>({ key: 'dev_vest_min' })
  devVestMax = GlobalState<uint64>({ key: 'dev_vest_max' })

  launches = BoxMap<uint64, Launch>({ keyPrefix: LaunchManagerBoxPrefixLaunches })

  @abimethod({ onCreate: 'require' })
  create(vault: Application, admin: Account, antiSnipeHook: uint64, launchTaxHook: uint64): void {
    this.vault.value = vault
    this.admin.value = admin
    this.treasury.value = admin
    this.launchFee.value = 0
    this.bounty.value = 0
    this.antiSnipeHook.value = antiSnipeHook
    this.launchTaxHook.value = launchTaxHook
    this.gatedHook.value = 0
    this.gatedFunding.value = 0
    this.launchCursor.value = 0
    this.rewards.value = 0
    this.devBuyMaxBps.value = 0
    this.devVestMin.value = 0
    this.devVestMax.value = 0
  }

  /**
   * No-op carrier for resource references and opcode budget: `launch` touches more resources (Vault
   * boxes, hook apps and their config boxes, the treasury) than one app call can reference.
   */
  opUp(): void {}

  // ADMIN (DAO wallet) -----------------------------------------------------------------------------

  private requireAdmin(): void {
    loggedAssert(Txn.sender === this.admin.value, errAdmin)
  }

  setAdmin(admin: Account): void {
    this.requireAdmin()
    this.admin.value = admin
  }

  /** Fees for future launches. Existing launches keep the bounty they escrowed. */
  setFees(launchFee: uint64, bounty: uint64, treasury: Account): void {
    this.requireAdmin()
    this.launchFee.value = launchFee
    this.bounty.value = bounty
    this.treasury.value = treasury
  }

  /** Hook apps for future launches (each must be approved in the Vault with the needed permissions) */
  setHooks(antiSnipeHook: uint64, launchTaxHook: uint64, gatedHook: uint64, gatedFunding: uint64): void {
    this.requireAdmin()
    this.antiSnipeHook.value = antiSnipeHook
    this.launchTaxHook.value = launchTaxHook
    this.gatedHook.value = gatedHook
    this.gatedFunding.value = gatedFunding
  }

  /**
   * Dev-buy policy for future launches: the Rewards app that vests the tokens, the cap on the tokens out
   * (bps of S, ≤ MaxDevBuyBps; 0 disables dev buys) and the vesting bounds in seconds.
   */
  setDevBuy(rewards: uint64, maxBps: uint64, minVestSeconds: uint64, maxVestSeconds: uint64): void {
    this.requireAdmin()
    loggedAssert(maxBps <= MaxDevBuyBps && minVestSeconds <= maxVestSeconds, errParams)
    this.rewards.value = rewards
    this.devBuyMaxBps.value = maxBps
    this.devVestMin.value = minVestSeconds
    this.devVestMax.value = maxVestSeconds
  }

  // PRIVATE ----------------------------------------------------------------------------------------

  /** ALGO this app can spend (balance above its minimum balance) */
  private free(): uint64 {
    return Global.currentApplicationAddress.balance - Global.currentApplicationAddress.minBalance
  }

  /** B6 step 2: M ≥ S·vB/(S+vB) (the reserve covers price continuity at rB = 0) and 0 < G ≤ rA_max */
  private validate(p: LaunchParams, totalSupply: uint64): void {
    loggedAssert(p.curveSupply > 0 && p.curveSupply < totalSupply, errParams)
    loggedAssert(p.virtualQuote > 0 && p.virtualToken > 0, errParams)
    const reserve: uint64 = totalSupply - p.curveSupply
    loggedAssert(reserve >= mulDivUp(p.curveSupply, p.virtualToken, p.curveSupply + p.virtualToken), errParams)
    const maxRaise = mulDiv(p.virtualQuote, p.curveSupply, p.virtualToken)
    loggedAssert(p.graduationThreshold > 0 && p.graduationThreshold <= maxRaise, errParams)
    loggedAssert(p.feeBps <= MaxFeeBps && p.snipe.startFeeBps <= MaxPoolFeeCapBps, errParams)
    if (p.devBuy > 0) {
      loggedAssert(this.rewards.value !== 0 && this.devBuyMaxBps.value > 0, errDevBuy)
      loggedAssert(p.devVestSeconds >= this.devVestMin.value && p.devVestSeconds <= this.devVestMax.value, errDevBuy)
    }
  }

  /**
   * The disclosed dev buy (akita-hooks B6 step 5): swap `p.devBuy` µALGO into the freshly seeded pool in
   * the launch call. The AntiSnipe hook exempts its `exempt` (this app) at e == 0, so the buy pays the
   * pool fee (and the creator's own buy tax) but not the anti-snipe fee. The tokens out are capped at
   * `devBuyMaxBps` of S and locked for the creator in a never-expiring Rewards disbursement that unlocks
   * `devVestSeconds` from now; only the creator can claim it, and only after the unlock. The Rewards
   * opt-in and box MBR come out of the launch payment: what Rewards' minimum balance actually grew by,
   * not just what its methods take, so the dev buy never eats into Rewards' other claimants' ALGO.
   * `reserved` is this app's spendable ALGO that must stay untouched (other bounties plus this one's).
   */
  private devBuy(p: LaunchParams, creator: Account, asset: uint64, poolId: uint64, escrow: Account, reserved: uint64): DevBuyResult {
    const tokens = abiCall<typeof PluginDex.prototype.swap>({
      appId: this.vault.value,
      // wallet hint 0: the LaunchManager acts as itself (principal-resolution spec §6.12, P2-DEX-04)
      args: [itxn.payment({ receiver: escrow, amount: p.devBuy }), poolId, 0, Global.currentApplicationAddress, Bytes(''), 0],
    }).returnValue
    loggedAssert(tokens > 0 && tokens <= mulDiv(p.curveSupply, this.devBuyMaxBps.value, BpsDivisor), errDevBuy)

    const rewards = Application(this.rewards.value)
    const rewardsMbrBefore = rewards.address.minBalance
    let paid: uint64 = DevBuyDisbursementMbr
    // Rewards.optIn is permissionless: someone may have opted it in already
    if (!rewards.address.isOptedIn(Asset(asset))) {
      paid += Global.assetOptInMinBalance
      abiCall<typeof Rewards.prototype.optIn>({
        appId: rewards,
        args: [itxn.payment({ receiver: rewards.address, amount: Global.assetOptInMinBalance }), Asset(asset)],
      })
    }
    const unlock: uint64 = Global.latestTimestamp + p.devVestSeconds
    const allocations: UserAllocation[] = [{ address: creator, amount: tokens }]
    const disbursement = abiCall<typeof Rewards.prototype.legacyCreateInstantAsaDisbursement>({
      appId: rewards,
      args: [
        itxn.payment({ receiver: rewards.address, amount: DevBuyDisbursementMbr }),
        itxn.assetTransfer({ assetReceiver: rewards.address, xferAsset: asset, assetAmount: tokens }),
        unlock,
        DevBuyNeverExpires,
        allocations,
      ],
    }).returnValue

    // top up whatever Rewards' minimum balance grew by beyond what its methods took (checked at the end
    // of this transaction, so paying after the calls is enough)
    const grew: uint64 = rewards.address.minBalance - rewardsMbrBefore
    if (grew > paid) {
      const shortfall: uint64 = grew - paid
      loggedAssert(this.free() >= reserved + shortfall, errPayment)
      itxn.payment({ receiver: rewards.address, amount: shortfall }).submit()
    }
    return { tokens, unlock, rewards: rewards.id, disbursement }
  }

  /** `[GatedFee?, AntiSnipe, LaunchTax?]`, each configured through F6 funding and initData */
  private hookStack(p: LaunchParams): HookInstall[] {
    const hooks: HookInstall[] = []
    if (p.gated) {
      loggedAssert(this.gatedHook.value !== 0, errHooks)
      hooks.push({
        app: this.gatedHook.value,
        points: HookPointAfterInitialize | HookPointBeforeSwap | HookPointQuote,
        perms: HookPermDynamicFee,
        flags: 0,
        funding: p.gatedFunding !== 0 ? p.gatedFunding : this.gatedFunding.value,
        initData: p.gatedInitData,
      })
    }

    loggedAssert(this.antiSnipeHook.value !== 0, errHooks)
    const snipe = clone(p.snipe)
    snipe.exempt = Global.currentApplicationAddress
    let snipePoints: uint64 = HookPointAfterInitialize | HookPointBeforeSwap | HookPointQuote
    if (snipe.startMode === SnipeStartFirstLiquidity) {
      snipePoints = snipePoints | HookPointAfterAddLiquidity
    }
    hooks.push({
      app: this.antiSnipeHook.value,
      points: snipePoints,
      perms: HookPermDynamicFee,
      flags: 0,
      funding: boxMbr(sizeOf<SnipeConfig>()),
      initData: encodeArc4(snipe),
    })

    if (p.buyTaxBps > 0 || p.sellTaxBps > 0) {
      loggedAssert(this.launchTaxHook.value !== 0, errHooks)
      let points: uint64 = HookPointAfterInitialize | HookPointBeforeSwap | HookPointQuote
      let perms: uint64 = 0
      if (p.buyTaxBps > 0) {
        perms = perms | HookPermHookFee
      }
      if (p.sellTaxBps > 0) {
        perms = perms | HookPermHookFeeOut
        points = points | HookPointAfterSwap
      }
      const tax: TaxInit = {
        owner: Txn.sender,
        quoteAsset: 0,
        buyTaxBps: p.buyTaxBps,
        sellTaxBps: p.sellTaxBps,
        untilRound: p.taxUntilRound,
      }
      hooks.push({
        app: this.launchTaxHook.value,
        points,
        perms,
        flags: 0,
        funding: boxMbr(sizeOf<TaxConfig>()),
        initData: encodeArc4(tax),
      })
    }
    return clone(hooks)
  }

  // LAUNCH -----------------------------------------------------------------------------------------

  /**
   * Phase 1: mint the fair-launch ASA and record a pending launch for the caller. `payment` (to this
   * app, the transaction before this call) covers this app's ASA holding MBR and the launch record box;
   * the excess is refunded. Returns the launchId.
   */
  createToken(payment: gtxn.PaymentTxn, t: TokenParams): uint64 {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errPayment)
    loggedAssert(t.totalSupply > 0 && t.decimals <= 19, errParams)
    const mbrBefore = Global.currentApplicationAddress.minBalance

    // no manager, reserve, freeze or clawback: the ASA can never be reconfigured, frozen or clawed back
    const asset = itxn
      .assetConfig({ total: t.totalSupply, decimals: t.decimals, assetName: t.assetName, unitName: t.unitName, url: t.url })
      .submit().createdAsset.id

    const launchId = this.launchCursor.value
    this.launchCursor.value = launchId + 1
    this.launches(launchId).value = {
      creator: Txn.sender,
      asset,
      poolId: 0,
      bounty: 0,
      launched: false,
      settled: false,
      devTokens: 0,
      devUnlock: 0,
      devRewards: 0,
      devDisbursement: 0,
    }

    const cost: uint64 = Global.currentApplicationAddress.minBalance - mbrBefore
    loggedAssert(payment.amount >= cost, errPayment)
    if (payment.amount > cost) {
      itxn.payment({ receiver: payment.sender, amount: payment.amount - cost }).submit()
    }
    return launchId
  }

  /**
   * Phase 2 (the token's creator only, once): create and seed the launch pool. `payment` (to this app,
   * the transaction before this call) must cover the launch fee, the bounty and the Vault's createPool
   * cost (pool boxes, escrow funding, hook F6 funding). The excess is refunded to the payer. The caller
   * needs fee credit for about 20 inner transactions and resource carriers (`opUp`); a dev buy adds the
   * swap, the Rewards opt-in and disbursement (about 12 more), and its µALGO plus the Rewards costs
   * (`Global.assetOptInMinBalance` unless Rewards already holds the token, and the growth of Rewards'
   * minimum balance from the disbursement: `DevBuyDisbursementMbr` plus any top-up) must also be covered
   * by `payment`.
   * `maxLaunchFee` and `maxBounty` cap what the creator agrees to pay: the fee and bounty are read at
   * execution time, so a `setFees` landing first can never take more of the payment than intended.
   */
  launch(payment: gtxn.PaymentTxn, launchId: uint64, p: LaunchParams, maxLaunchFee: uint64, maxBounty: uint64): LaunchResult {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errPayment)
    loggedAssert(this.launchFee.value <= maxLaunchFee && this.bounty.value <= maxBounty, errFeeCap)
    ensureBudget(LaunchBudget, OpUpFeeSource.GroupCredit)
    loggedAssert(this.launches(launchId).exists, errNotFound)
    const record = clone(this.launches(launchId).value)
    loggedAssert(Txn.sender === record.creator, errCreator)
    loggedAssert(!record.launched, errLaunched)
    const asset = record.asset
    const totalSupply = Asset(asset).total
    // the payment is already in the balance: what this app could spend before the launch
    const freeBefore: uint64 = this.free() - payment.amount
    this.validate(p, totalSupply)

    // 1. DAO launch fee
    const launchFee = this.launchFee.value
    if (launchFee > 0) {
      itxn.payment({ receiver: this.treasury.value, amount: launchFee }).submit()
    }

    // 2. the launch pool; everything spendable except the bounty is forwarded, the Vault refunds the excess
    const bounty = this.bounty.value
    const available = this.free()
    loggedAssert(available >= freeBefore + bounty, errPayment)
    const startFee = p.snipe.startFeeBps
    const config: PoolConfig = {
      curve: 0,
      feeBps: p.feeBps,
      maxFeeBps: startFee > p.feeBps ? startFee : p.feeBps,
      custodyFeeBps: p.feeBps,
      maxHookFeeBps: p.buyTaxBps > p.sellTaxBps ? p.buyTaxBps : p.sellTaxBps,
      virtualA: p.virtualQuote,
      virtualB: p.virtualToken,
      graduationThreshold: p.graduationThreshold,
      quoteIsA: true,
      curveMbr: 0,
      curveArgs: Bytes(''),
    }
    const externals: ExternalSlotConfig[] = []
    const vault = this.vault.value
    const poolId = abiCall<typeof PluginDex.prototype.createPool>({
      appId: vault,
      args: [itxn.payment({ receiver: vault.address, amount: available - freeBefore - bounty }), 0, asset, config, this.hookStack(p), externals],
    }).returnValue

    // 3. seed: S on the curve, M locked as the graduation reserve; the launch LP stays in the Vault
    const pool = abiCall<typeof PluginDex.prototype.getPool>({ appId: vault, args: [poolId] }).returnValue
    const escrow = Application(pool.escrow).address
    abiCall<typeof PluginDex.prototype.initializeLaunch>({
      appId: vault,
      args: [
        itxn.assetTransfer({ assetReceiver: escrow, xferAsset: asset, assetAmount: p.curveSupply }),
        itxn.assetTransfer({ assetReceiver: escrow, xferAsset: asset, assetAmount: totalSupply - p.curveSupply }),
        poolId,
      ],
    })

    // 4. the disclosed, vested dev buy (optional); the payment must still cover the bounty
    let dev: DevBuyResult = { tokens: 0, unlock: 0, rewards: 0, disbursement: 0 }
    if (p.devBuy > 0) {
      loggedAssert(this.free() >= freeBefore + bounty + p.devBuy + Global.assetOptInMinBalance + DevBuyDisbursementMbr, errPayment)
      dev = this.devBuy(p, record.creator, asset, poolId, escrow, freeBefore + bounty)
    }

    // 5. record, keep the bounty, refund the rest
    this.launches(launchId).value = {
      creator: record.creator,
      asset,
      poolId,
      bounty,
      launched: true,
      settled: false,
      devTokens: dev.tokens,
      devUnlock: dev.unlock,
      devRewards: dev.rewards,
      devDisbursement: dev.disbursement,
    }

    const freeAfter = this.free()
    loggedAssert(freeAfter >= freeBefore + bounty, errPayment)
    const refund: uint64 = freeAfter - freeBefore - bounty
    if (refund > 0) {
      itxn.payment({ receiver: payment.sender, amount: refund }).submit()
    }

    emit<LaunchEvent>({
      launchId,
      creator: Txn.sender,
      asset,
      poolId,
      totalSupply,
      curveSupply: p.curveSupply,
      virtualQuote: p.virtualQuote,
      virtualToken: p.virtualToken,
      graduationThreshold: p.graduationThreshold,
      launchFee,
      bounty,
      devBuy: p.devBuy,
      devTokens: dev.tokens,
      devUnlock: dev.unlock,
      devRewards: dev.rewards,
      devDisbursement: dev.disbursement,
    })
    return { launchId, asset, poolId }
  }

  /**
   * Graduate a launch through `PluginDex.graduate` and pay its bounty to the caller. If the pool was
   * already graduated directly on the Vault (for example appended by a frontend), the bounty is
   * refunded to the launch creator instead; when the creator's account cannot receive it (closed, and
   * the bounty is below the minimum balance) it goes to the caller, so settlement can never be blocked.
   * Either way the launch is settled once. The graduation quote surplus (booked as protocol fees, §10
   * A17) is then swept to the Vault treasury when the treasury can receive it; otherwise it stays booked
   * for a later permissionless `PluginDex.collectProtocolFees`.
   */
  graduate(launchId: uint64): void {
    loggedAssert(this.launches(launchId).exists, errNotFound)
    const launch = clone(this.launches(launchId).value)
    loggedAssert(launch.launched, errNotFound)
    loggedAssert(!launch.settled, errSettled)

    const vault = this.vault.value
    const pool = abiCall<typeof PluginDex.prototype.getPool>({ appId: vault, args: [launch.poolId] }).returnValue
    const bonding = (pool.virtualA | pool.virtualB) !== 0
    if (bonding) {
      abiCall<typeof PluginDex.prototype.graduate>({ appId: vault, args: [launch.poolId] })
    }
    let recipient = bonding ? Txn.sender : launch.creator
    if (launch.bounty > 0 && launch.bounty < Global.minBalance && balanceOf(recipient) === 0) {
      recipient = Txn.sender
    }

    this.launches(launchId).value.settled = true
    this.launches(launchId).value.bounty = 0
    if (launch.bounty > 0) {
      itxn.payment({ receiver: recipient, amount: launch.bounty }).submit()
    }
    this.collectSurplus(vault, launch.poolId)
    emit<LaunchSettledEvent>({ launchId, poolId: launch.poolId, recipient, bounty: launch.bounty, graduated: bonding })
  }

  /**
   * Return the dev-buy allocation MBR to the creator who paid it (permissionless). When the creator
   * claims the vested tokens, Rewards.claimRewards deletes the allocation box and releases its MBR
   * (UserAllocationMBR) as `mbrCredits` on the disbursement, which only the disbursement's creator (this
   * app) can withdraw. This withdraws exactly those credits from the Rewards app recorded in the launch
   * (`devRewards`, not the current `rewards` setting) and pays them to the launch creator. Returns the
   * µALGO paid: 0 (no revert) before the claim, and on any later call, since the withdrawal itself
   * zeroes the credits in Rewards; reverts errLmdv for a launch without a dev buy and errLmpy when the
   * creator's account cannot receive the amount (closed, amount below the minimum balance), in which
   * case the credits stay in Rewards until it can.
   *
   * The credits are read through Rewards' `allocationMbrCreditShortfall(id, 1)`, which is
   * UserAllocationMBR − mbrCredits: this app never funds or reclaims these disbursements, so their only
   * credits are the one allocation's released MBR (0 or UserAllocationMBR). Rewards' other balances are
   * untouched: the withdrawal is bounded by this disbursement's own credits. The disbursement box itself
   * stays (Rewards has no method to delete a disbursement), so its MBR remains locked in Rewards.
   * The caller covers the inner transactions' fees (3).
   */
  reclaimDevBuyMbr(launchId: uint64): uint64 {
    loggedAssert(this.launches(launchId).exists, errNotFound)
    const launch = clone(this.launches(launchId).value)
    loggedAssert(launch.devRewards !== 0, errDevBuy)

    const rewards = Application(launch.devRewards)
    const shortfall = abiCall<typeof Rewards.prototype.allocationMbrCreditShortfall>({
      appId: rewards,
      args: [launch.devDisbursement, 1],
    }).returnValue
    const credits: uint64 = UserAllocationMBR - shortfall
    if (credits === 0) {
      return 0
    }
    loggedAssert(canReceive(launch.creator, 0, credits), errPayment)

    abiCall<typeof Rewards.prototype.withdrawMbrCredits>({
      appId: rewards,
      args: [launch.devDisbursement, credits],
    })
    itxn.payment({ receiver: launch.creator, amount: credits }).submit()
    return credits
  }

  /**
   * Best-effort `PluginDex.collectProtocolFees` after graduation: only when there is something booked and
   * the Vault treasury can receive every side (ALGO: an existing account or at least the min balance;
   * ASA: opted in), so a treasury in a bad state can never block `graduate`.
   */
  private collectSurplus(vault: Application, poolId: uint64): void {
    const pool = abiCall<typeof PluginDex.prototype.getPool>({ appId: vault, args: [poolId] }).returnValue
    if (pool.protocolFeesA === 0 && pool.protocolFeesB === 0) {
      return
    }
    const [treasuryBytes, exists] = op.AppGlobal.getExBytes(vault, Bytes(PluginDexGlobalStateKeyTreasury))
    if (!exists) {
      return
    }
    const treasury = Account(treasuryBytes)
    if (!canReceive(treasury, pool.assetA, pool.protocolFeesA) || !canReceive(treasury, pool.assetB, pool.protocolFeesB)) {
      return
    }
    abiCall<typeof PluginDex.prototype.collectProtocolFees>({ appId: vault, args: [poolId] })
  }

  // READ ONLY --------------------------------------------------------------------------------------

  @abimethod({ readonly: true })
  getLaunch(launchId: uint64): Launch {
    loggedAssert(this.launches(launchId).exists, errNotFound)
    return clone(this.launches(launchId).value)
  }
}

/** µALGO balance; 0 for a closed (unfunded) account, where `Account.balance` would fail */
function balanceOf(account: Account): uint64 {
  const [balance] = op.AcctParams.acctBalance(account)
  return balance
}

/** whether a transfer of `amount` of `asset` to `account` cannot fail on the receiver's side */
function canReceive(account: Account, asset: uint64, amount: uint64): boolean {
  if (amount === 0) {
    return true
  }
  if (asset === 0) {
    return balanceOf(account) > 0 || amount >= Global.minBalance
  }
  return account.isOptedIn(Asset(asset))
}

/** MBR of a hook config box keyed `prefix (1 B) ‖ poolId (8 B)` holding `size` bytes */
function boxMbr(size: uint64): uint64 {
  return 2_500 + 400 * (1 + 8 + size)
}
