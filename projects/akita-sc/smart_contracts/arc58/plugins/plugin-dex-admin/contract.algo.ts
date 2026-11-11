import { Account, Application, Bytes, contract, Contract, GlobalState, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import type { PluginDex } from '../../../plugin-dex/contract.algo'
import type { BackrunArbHook } from '../../../plugin-dex/hooks/backrun-arb.algo'
import type { ConsensusKeyregHook } from '../../../plugin-dex/hooks/consensus-keyreg.algo'
import { PoolKeys } from '../../../plugin-dex/hooks/consensus-keyreg.algo'
import type { GatedFeeHook } from '../../../plugin-dex/hooks/gated-fee.algo'
import { FeeSchedule } from '../../../plugin-dex/hooks/gated-fee.algo'
import type { LaunchManager } from '../../../plugin-dex/launch/launch-manager.algo'
import { getControlledSpendingAccount, rekeyAddress } from '../../../utils/functions'
import { errDaCreate, errDaTarget } from './errors'

/**
 * PluginDexAdminPlugin: the ARC-58 plugin a wallet uses to hold the admin role of a Plugin DEX deployment.
 *
 * Five DEX apps have an admin. Four store one and hand it over in two steps: the Vault (PluginDex),
 * LaunchManager, BackrunArbHook and ConsensusKeyregHook. GatedFeeHook stores none: its admin is always the
 * ARC-58 wallet of its DAO. Each checks `Txn.sender`, and a wallet's address is only ever a sender inside a
 * plugin window. Without this plugin a wallet that is named admin could not accept the role (readiness
 * audit 2026-11-09, C10) or use it afterwards: pause a pool, change an approval or a fee, set the gates
 * behind a fee pass.
 *
 * - The plugin has no authority of its own. Every call is one inner transaction sent as the wallet's
 *   spending account S, and the target app decides whether S is its admin. A wallet that is not the admin
 *   gets the target's own "not the admin" error. Use it from the wallet's main account: an escrow is a
 *   different address and is not the admin.
 * - S comes from `getControlledSpendingAccount`, which asserts that S is rekeyed to this app right now
 *   (errNath). An app posing as a wallet cannot make this plugin send from its own account.
 * - It calls only the five apps pinned at create, never a caller-chosen app.
 * - One method per admin action, so a wallet can grant a subset: for example only `vaultSetPoolPaused` to
 *   a guardian key, with everything else left to proposals. The two handover methods end in `Of` so
 *   that nothing mistakes this plugin for an app that has an admin of its own.
 *
 * One plugin per Plugin DEX deployment. Immutable and adminless (no update method): the ARC-58 wallet
 * only accepts plugins whose Application.version is 0.
 */
@contract({ avmVersion: 13 })
export class PluginDexAdminPlugin extends Contract {
  version = GlobalState<string>({ key: 'version' })
  /** PluginDex Vault (immutable) */
  vault = GlobalState<Application>({ key: 'vault' })
  /** LaunchManager (immutable) */
  launchManager = GlobalState<Application>({ key: 'launch_manager' })
  /** BackrunArbHook (immutable) */
  backrunArbHook = GlobalState<Application>({ key: 'backrun_hook' })
  /** ConsensusKeyregHook (immutable) */
  consensusKeyregHook = GlobalState<Application>({ key: 'keyreg_hook' })
  /** GatedFeeHook (immutable) */
  gatedFeeHook = GlobalState<Application>({ key: 'gated_hook' })

  @abimethod({ onCreate: 'require' })
  create(
    version: string,
    vault: Application,
    launchManager: Application,
    backrunArbHook: Application,
    consensusKeyregHook: Application,
    gatedFeeHook: Application,
  ): void {
    // a typo guard, not an identity check: each id must be a live app with the admin state its contract has
    // (deploy-immutable checks each app's program before this is ever sent)
    loggedAssert(
      this.hasAdmin(vault) &&
        this.hasAdmin(launchManager) &&
        this.hasAdmin(backrunArbHook) &&
        this.hasAdmin(consensusKeyregHook) &&
        this.hasDao(gatedFeeHook),
      errDaCreate,
    )
    this.version.value = version
    this.vault.value = vault
    this.launchManager.value = launchManager
    this.backrunArbHook.value = backrunArbHook
    this.consensusKeyregHook.value = consensusKeyregHook
    this.gatedFeeHook.value = gatedFeeHook
  }

  /** No-op carrier for opcode budget and resource references */
  opUp(): void {}

  // HANDOVER (the four apps that store an admin) --------------------------------------------------

  /**
   * Step 2 of an admin handover: the wallet takes the admin role of `app`, which must have named the
   * wallet with `proposeAdmin` first. `app` is one of the four apps with a stored admin (errDaTg).
   */
  acceptAdminOf(wallet: Application, rekeyBack: boolean, app: Application): void {
    const sender = getControlledSpendingAccount(wallet)
    this.requireTarget(app)

    // the four apps share this signature
    abiCall<typeof PluginDex.prototype.acceptAdmin>({
      sender,
      appId: app,
      args: [],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * Step 1 of an admin handover, as the current admin: name the account that may take over `app`.
   * Nothing changes until that account accepts; the zero address cancels a pending handover.
   */
  proposeAdminOf(wallet: Application, rekeyBack: boolean, app: Application, admin: Account): void {
    const sender = getControlledSpendingAccount(wallet)
    this.requireTarget(app)

    // the four apps share this signature
    abiCall<typeof PluginDex.prototype.proposeAdmin>({
      sender,
      appId: app,
      args: [admin],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // VAULT ----------------------------------------------------------------------------------------

  /** Protocol fee (bps of the swap fee, capped by the Vault) and the account that receives it */
  vaultSetProtocolFee(wallet: Application, rekeyBack: boolean, protocolFeeBps: uint64, treasury: Account): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof PluginDex.prototype.setProtocolFee>({
      sender,
      appId: this.vault.value,
      args: [protocolFeeBps, treasury],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Approve a hook app with the most permissions a pool may grant it, or revoke it with 0. The Vault pays the box MBR. */
  vaultSetHookApproval(wallet: Application, rekeyBack: boolean, hook: uint64, perms: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof PluginDex.prototype.setHookApproval>({
      sender,
      appId: this.vault.value,
      args: [hook, perms],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Approve or revoke a curve app for future pools */
  vaultSetCurveApproval(wallet: Application, rekeyBack: boolean, curve: uint64, lpMode: uint64, approved: boolean): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof PluginDex.prototype.setCurveApproval>({
      sender,
      appId: this.vault.value,
      args: [curve, lpMode, approved],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Approve or revoke a valuator for future external slots */
  vaultSetValuatorApproval(wallet: Application, rekeyBack: boolean, valuator: uint64, approved: boolean): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof PluginDex.prototype.setValuatorApproval>({
      sender,
      appId: this.vault.value,
      args: [valuator, approved],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Pause or unpause a pool. Pausing stops swaps and deposits and opens `emergencyRemoveLiquidity`. */
  vaultSetPoolPaused(wallet: Application, rekeyBack: boolean, poolId: uint64, paused: boolean): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof PluginDex.prototype.setPoolPaused>({
      sender,
      appId: this.vault.value,
      args: [poolId, paused],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Paused pools only: recognize a real venue loss on an external slot */
  vaultWriteDownExternal(wallet: Application, rekeyBack: boolean, poolId: uint64, slot: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof PluginDex.prototype.writeDownExternal>({
      sender,
      appId: this.vault.value,
      args: [poolId, slot],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // LAUNCH MANAGER -------------------------------------------------------------------------------

  /** Launch fee, bounty and treasury for future launches */
  launchSetFees(wallet: Application, rekeyBack: boolean, launchFee: uint64, bounty: uint64, treasury: Account): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof LaunchManager.prototype.setFees>({
      sender,
      appId: this.launchManager.value,
      args: [launchFee, bounty, treasury],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Hook apps for future launches (each must be approved in the Vault) */
  launchSetHooks(
    wallet: Application,
    rekeyBack: boolean,
    antiSnipeHook: uint64,
    launchTaxHook: uint64,
    gatedHook: uint64,
    gatedFunding: uint64,
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof LaunchManager.prototype.setHooks>({
      sender,
      appId: this.launchManager.value,
      args: [antiSnipeHook, launchTaxHook, gatedHook, gatedFunding],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Dev-buy policy for future launches (maxBps 0 disables dev buys) */
  launchSetDevBuy(
    wallet: Application,
    rekeyBack: boolean,
    rewards: uint64,
    maxBps: uint64,
    minVestSeconds: uint64,
    maxVestSeconds: uint64,
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof LaunchManager.prototype.setDevBuy>({
      sender,
      appId: this.launchManager.value,
      args: [rewards, maxBps, minVestSeconds, maxVestSeconds],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // BACKRUN ARB HOOK -----------------------------------------------------------------------------

  /** Global kill switch of the backrun hook */
  backrunSetPaused(wallet: Application, rekeyBack: boolean, paused: boolean): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof BackrunArbHook.prototype.setPaused>({
      sender,
      appId: this.backrunArbHook.value,
      args: [paused],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Register (or re-register) a native pool with the backrun hook. The hook pays the box MBR. */
  backrunRegisterPool(
    wallet: Application,
    rekeyBack: boolean,
    poolId: uint64,
    minSurplusA: uint64,
    minSurplusB: uint64,
    maxTradeBps: uint64,
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof BackrunArbHook.prototype.registerPool>({
      sender,
      appId: this.backrunArbHook.value,
      args: [poolId, minSurplusA, minSurplusB, maxTradeBps],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Per-pool kill switch of the backrun hook */
  backrunSetPoolEnabled(wallet: Application, rekeyBack: boolean, poolId: uint64, enabled: boolean): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof BackrunArbHook.prototype.setPoolEnabled>({
      sender,
      appId: this.backrunArbHook.value,
      args: [poolId, enabled],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Withdraw ALGO above the backrun hook's box MBR to its admin, which is the wallet */
  backrunWithdraw(wallet: Application, rekeyBack: boolean, amount: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof BackrunArbHook.prototype.withdraw>({
      sender,
      appId: this.backrunArbHook.value,
      args: [amount],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // CONSENSUS KEYREG HOOK ------------------------------------------------------------------------

  /** Set (or rotate) a pool's operator and participation keys */
  keyregSetPoolKeys(wallet: Application, rekeyBack: boolean, poolId: uint64, keys: PoolKeys): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ConsensusKeyregHook.prototype.setPoolKeys>({
      sender,
      appId: this.consensusKeyregHook.value,
      args: [poolId, keys],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Stop managing a pool's consensus keys */
  keyregDeletePoolKeys(wallet: Application, rekeyBack: boolean, poolId: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ConsensusKeyregHook.prototype.deletePoolKeys>({
      sender,
      appId: this.consensusKeyregHook.value,
      args: [poolId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Send ALGO from the keyreg hook's tank to its admin, which is the wallet */
  keyregWithdraw(wallet: Application, rekeyBack: boolean, amount: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof ConsensusKeyregHook.prototype.withdraw>({
      sender,
      appId: this.consensusKeyregHook.value,
      args: [amount],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // GATED FEE HOOK -------------------------------------------------------------------------------
  // No handover here: the hook's admin is the ARC-58 wallet of its DAO, read from the DAO on every call.

  /** Redefine which gate each pass bit means (at most 8 slots). The hook pays the box MBR. */
  gatedSetGateSlots(wallet: Application, rekeyBack: boolean, slots: uint64[]): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof GatedFeeHook.prototype.setGateSlots>({
      sender,
      appId: this.gatedFeeHook.value,
      args: [slots],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Lifetime of a fee pass in seconds, within the hook's bounds */
  gatedSetPassTtl(wallet: Application, rekeyBack: boolean, ttl: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof GatedFeeHook.prototype.setPassTtl>({
      sender,
      appId: this.gatedFeeHook.value,
      args: [ttl],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Cap on discounted swaps per pass per UTC day (0 = unlimited) */
  gatedSetMaxDiscountedSwapsPerDay(wallet: Application, rekeyBack: boolean, cap: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof GatedFeeHook.prototype.setMaxDiscountedSwapsPerDay>({
      sender,
      appId: this.gatedFeeHook.value,
      args: [cap],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Schedule copied into pools created later with empty initData. The hook pays the box MBR. */
  gatedSetDefaultSchedule(wallet: Application, rekeyBack: boolean, schedule: FeeSchedule): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof GatedFeeHook.prototype.setDefaultSchedule>({
      sender,
      appId: this.gatedFeeHook.value,
      args: [schedule],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // PRIVATE --------------------------------------------------------------------------------------

  /** `app` exists and stores an `admin` global, as the four apps with a stored admin do */
  private hasAdmin(app: Application): boolean {
    if (app.id === 0) {
      return false
    }
    const [, exists] = op.AppGlobal.getExBytes(app, Bytes('admin'))
    return exists
  }

  /** `app` exists and stores the `akita_dao` whose wallet is its admin, as GatedFeeHook does */
  private hasDao(app: Application): boolean {
    if (app.id === 0) {
      return false
    }
    const [, exists] = op.AppGlobal.getExUint64(app, Bytes('akita_dao'))
    return exists
  }

  /** `app` is one of the four apps with a stored admin pinned at create */
  private requireTarget(app: Application): void {
    loggedAssert(
      app === this.vault.value ||
        app === this.launchManager.value ||
        app === this.backrunArbHook.value ||
        app === this.consensusKeyregHook.value,
      errDaTarget,
    )
  }
}
