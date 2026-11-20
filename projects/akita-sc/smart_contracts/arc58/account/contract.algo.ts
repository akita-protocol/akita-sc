import {
  abimethod,
  Account,
  Application,
  assert,
  Asset,
  BoxMap,
  Bytes,
  bytes,
  clone,
  contract,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  match,
  OnCompleteAction,
  TransactionType,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract, decodeArc4, methodSelector, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi, Global, len, Txn } from '@algorandfoundation/algorand-typescript/op'
import {
  AbstractAccountBoxPrefixAllowances,
  AbstractAccountBoxPrefixDomainKeys,
  AbstractAccountBoxPrefixDefaultEscrows,
  AbstractAccountBoxPrefixEscrowRefs,
  AbstractAccountBoxPrefixEscrows,
  AbstractAccountBoxPrefixExecutions,
  AbstractAccountBoxPrefixNamedPlugins,
  AbstractAccountBoxPrefixPlugins,
  AbstractAccountGlobalStateKeysAdmin,
  AbstractAccountGlobalStateKeysAvatar,
  AbstractAccountGlobalStateKeysBanner,
  AbstractAccountGlobalStateKeysBio,
  AbstractAccountGlobalStateKeysControlledAddress,
  AbstractAccountGlobalStateKeysCurrentPlugin,
  AbstractAccountGlobalStateKeysDomain,
  AbstractAccountGlobalStateKeysEscrowFactory,
  AbstractAccountGlobalStateKeysFactoryApp,
  AbstractAccountGlobalStateKeysLastChange,
  AbstractAccountGlobalStateKeysLastUserInteraction,
  AbstractAccountGlobalStateKeysNickname,
  AbstractAccountGlobalStateKeysSalt,
  AbstractAccountGlobalStateKeysReferrer,
  AbstractAccountGlobalStateKeysRekeyIndex,
  AbstractAccountGlobalStateKeysSpendingAddress,
  AbstractAccountGlobalStateKeysUpdateSettings,
  AbstractAccountNumGlobalBytes,
  AbstractAccountNumGlobalUints,
  MAX_INNER_TXN_COUNT,
  MAX_OUTER_TXN_COUNT,
  MethodRestrictionByteLength,
  MinAllowanceMBR,
  MinDomainKeysMBR,
  MinDefaultEscrowMBR,
  MinEscrowRefsMBR,
  MinEscrowsMBR,
  MinExecutionsMBR,
  MinNamedPluginMBR,
  MinPluginMBR
} from './constants'
import {
  errAdminCannotBeControlled,
  errAdminOnly,
  errAdminPluginsCannotUseEscrows,
  errAllowanceAlreadyExists,
  errAllowanceDoesNotExist,
  errAllowanceExceeded,
  errAuthAddrMismatch,
  errBadDeployer,
  errCannotCallOtherAppsDuringRekey,
  errEscrowAlreadyExists,
  errEscrowDoesNotExist,
  errEscrowInUse,
  errEscrowLocked,
  errEscrowNameRequired,
  errEscrowRequiredToBeSetAsDefault,
  errExecutionExpired,
  errExecutionKeyNotFound,
  errExecutionKeyUpdateMustMatchFirstValid,
  errExecutionKeyUpdateMustMatchLastValid,
  errExecutionNotReady,
  errForbidden,
  errGroupNotFound,
  errInvalidMethodSignatureLength,
  errInvalidOncomplete,
  errInvalidPayment,
  errInvalidSenderArg,
  errInvalidSenderValue,
  errMalformedOffsets,
  errMethodOnCooldown,
  errMissingRekeyBack,
  errOnlyAdminCanAddPlugin,
  errOnlyAdminCanUpdate,
  errOnlyAdminOrRevocationAppCanRemoveMethodRestriction,
  errOnlyAdminOrRevocationAppCanRemovePlugin,
  errPluginAlreadyExists,
  errPluginDoesNotExist,
  errPluginDoesNotControlWallet,
  errPluginDoesNotHaveAdminPrivileges,
  errPluginExpired,
  errPluginOnCooldown,
  errSenderMustBeAdminPlugin,
  errUsingExecutionKeyRequiresGlobal,
  errCoverFeesRequiresCaller,
  errZeroAddressDelegationType,
  errInvalidPluginVersion,
} from './errors'

import { GlobalStateKeyAkitaDAO, GlobalStateKeyRevocation, GlobalStateKeyVersion } from '../../constants'
import { ARC58WalletIDsByAccountsMbr, NewCostForARC58 } from '../../escrow/constants'
import { BoxCostPerByte } from '../../utils/constants'
import { AddAllowanceInfo, AllowanceInfo, AllowanceKey, CallerTypeAdmin, CallerTypeGlobal, DelegationTypeSelf, EscrowInfo, EscrowReclaim, ExecutionInfo, FactoryUpdateSettings, FundsRequest, MethodInfo, MethodRestriction, MethodValidation, PluginInfo, PluginKey, PluginValidation, SpendAllowanceTypeDrip, SpendAllowanceTypeFlat, SpendAllowanceTypeWindow } from './types'
import { emptyAllowanceInfo, emptyEscrowInfo, emptyExecutionInfo, emptyPluginInfo } from './utils'

// CONTRACT IMPORTS
import type { EscrowFactory } from '../../escrow/factory.algo'

// A-7 / ACC-10e: reserve 30 bytes + 12 uints of global state (as on mainnet wallets) so future
// wallet upgrades can add state without a schema change.
@contract({
  avmVersion: 13,
  stateTotals: {
    globalBytes: AbstractAccountNumGlobalBytes,
    globalUints: AbstractAccountNumGlobalUints
  }
})
export class AbstractedAccount extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the version of the wallet contract */
  version = GlobalState<string>({ key: GlobalStateKeyVersion })
  /** the app id of the akita DAO */
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })
  /** The admin of the abstracted account. This address can add plugins and initiate rekeys */
  admin = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysAdmin })
  /** The domain associated with the admin account of the abstracted account */
  domain = GlobalState<string>({ key: AbstractAccountGlobalStateKeysDomain });
  /** The address this app controls */
  controlledAddress = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysControlledAddress });
  /** A user defined nickname for their wallet */
  nickname = GlobalState<string>({ key: AbstractAccountGlobalStateKeysNickname })
  /** A user defined NFT to display as their avatar that the user owns */
  avatar = GlobalState<Asset>({ key: AbstractAccountGlobalStateKeysAvatar })
  /** A user defined NFT to display as their banner that the user owns */
  banner = GlobalState<Asset>({ key: AbstractAccountGlobalStateKeysBanner })
  /** A user defined description */
  bio = GlobalState<string>({ key: AbstractAccountGlobalStateKeysBio })
  /** The last time the contract was interacted with in unix time */
  lastUserInteraction = GlobalState<uint64>({ key: AbstractAccountGlobalStateKeysLastUserInteraction })
  /** The last time state has changed on the abstracted account (not including lastCalled for cooldowns) in unix time */
  lastChange = GlobalState<uint64>({ key: AbstractAccountGlobalStateKeysLastChange })
  /** [TEMPORARY STATE FIELD] The spending address for the currently active plugin */
  spendingAddress = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysSpendingAddress })
  /** [TEMPORARY STATE FIELD] The current plugin key being used */
  currentPlugin = GlobalState<PluginKey>({ key: AbstractAccountGlobalStateKeysCurrentPlugin })
  /** [TEMPORARY STATE FIELD] The index of the transaction that created the rekey sandwich */
  rekeyIndex = GlobalState<uint64>({ initialValue: 0, key: AbstractAccountGlobalStateKeysRekeyIndex })
  /** the spending account factory to use for allowances */
  escrowFactory = GlobalState<Application>({ key: AbstractAccountGlobalStateKeysEscrowFactory })
  /** the application ID for the contract that deployed this wallet */
  factoryApp = GlobalState<Application>({ key: AbstractAccountGlobalStateKeysFactoryApp })
  /** The app that can revoke plugins */
  revocation = GlobalState<Application>({ key: GlobalStateKeyRevocation })
  /** The address that created the wallet */
  referrer = GlobalState<Account>({ key: AbstractAccountGlobalStateKeysReferrer })
  /** Factory Update Settings */
  factoryUpdateSettings = GlobalState<FactoryUpdateSettings>({ key: AbstractAccountGlobalStateKeysUpdateSettings })
  /** Pseudo Random Function extension salt */
  salt = GlobalState<bytes<32>>({ key: AbstractAccountGlobalStateKeysSalt })

  // BOXES ----------------------------------------------------------------------------------------

  /** Plugins that add functionality to the controlledAddress and the account that has permission to use it. */
  plugins = BoxMap<PluginKey, PluginInfo>({ keyPrefix: AbstractAccountBoxPrefixPlugins });
  /** Plugins that have been given a name for discoverability */
  namedPlugins = BoxMap<string, PluginKey>({ keyPrefix: AbstractAccountBoxPrefixNamedPlugins });
  /** the escrows that this wallet has created for specific callers with allowances */
  escrows = BoxMap<string, EscrowInfo>({ keyPrefix: AbstractAccountBoxPrefixEscrows })
  /**
   * How many plugins and allowances still name an escrow, kept from the moment the escrow is made.
   * An escrow made before this count existed has no box here, and nothing is counted for it.
   *
   * The count is kept under the escrow's name, never its app id: the id of an app made in a
   * transaction is not known when that transaction is built, so a box named after it could not be
   * referenced by the call that makes the escrow.
   */
  escrowRefs = BoxMap<string, uint64>({ keyPrefix: AbstractAccountBoxPrefixEscrowRefs })
  /**
   * The name of the escrow a plugin uses by default. Such a plugin is stored under the empty escrow
   * name with only the escrow's app id, so this is what leads from the plugin back to the escrow's count.
   */
  defaultEscrows = BoxMap<PluginKey, string>({ keyPrefix: AbstractAccountBoxPrefixDefaultEscrows })
  /** The Allowances for plugins installed on the smart contract with useAllowance set to true */
  allowances = BoxMap<AllowanceKey, AllowanceInfo>({ keyPrefix: AbstractAccountBoxPrefixAllowances }) // 38_500
  /** execution keys */
  executions = BoxMap<bytes<32>, ExecutionInfo>({ keyPrefix: AbstractAccountBoxPrefixExecutions })

  /**
   * Passkeys on the account and their corresponding domain names
   * address : domain
   * IMPORTANT: a passkey attached to the akita domain is a co-admin passkey
   * we explicitly have this feature so that the wallet can be used on multiple devices
   * where the admin passkey may be incompatible
   * we track this onchain so we can assist with 'sign-in from another device' functionality
   * as well as uses like DAO based domain revocation
  */
  domainKeys = BoxMap<Account, string>({ keyPrefix: AbstractAccountBoxPrefixDomainKeys })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private updateLastUserInteraction() {
    this.lastUserInteraction.value = Global.latestTimestamp
  }

  private updateLastChange() {
    this.lastChange.value = Global.latestTimestamp
  }

  /** Touch both interaction + change timestamps in one call. Factored out because this
   * pair appears at ~11 call sites; keeping it in a helper trims bytecode. */
  private _touchState(): void {
    this.updateLastUserInteraction()
    this.updateLastChange()
  }

  // --- Assertion helpers -------------------------------------------------------------------------
  // These exist purely to shrink bytecode by hoisting repeated `loggedAssert(...)` call patterns
  // into subroutines. The ARC-65 error code semantics are unchanged — every call site still
  // surfaces the same `ERR:<code>` on failure.

  /** Admin-only gate used at ~6 call sites. */
  private _requireAdmin(): void {
    loggedAssert(this.isAdmin(), errAdminOnly)
  }

  /** Gate used by the plugin and named-plugin remove paths. */
  private _requireAdminOrRevoke(): void {
    loggedAssert(this.isAdmin() || this.canRevoke(), errOnlyAdminOrRevocationAppCanRemovePlugin)
  }

  /** Box existence check for an escrow, used at ~8 call sites. */
  private _requireEscrow(escrow: string): void {
    loggedAssert(this.escrows(escrow).exists, errEscrowDoesNotExist)
  }

  /** "Not locked" guard on an escrow, used at 4 call sites. */
  private _requireUnlockedEscrow(escrow: string): void {
    loggedAssert(!this.escrows(escrow).value.locked, errEscrowLocked)
  }

  /** Plugin-box existence check, used at ~5 call sites. */
  private _requirePlugin(key: PluginKey): void {
    loggedAssert(this.plugins(key).exists, errPluginDoesNotExist)
  }

  private _requireExecution(lease: bytes<32>): void {
    loggedAssert(this.executions(lease).exists, errExecutionKeyNotFound)
  }

  private _requireAllowance(key: AllowanceKey): void {
    loggedAssert(this.allowances(key).exists, errAllowanceDoesNotExist)
  }

  private _requireAllowanceAmount(available: uint64, requested: uint64): void {
    loggedAssert(available >= requested, errAllowanceExceeded)
  }

  private _requirePluginReady(expired: boolean, onCooldown: boolean): void {
    loggedAssert(!expired, errPluginExpired)
    loggedAssert(!onCooldown, errPluginOnCooldown)
  }

  private _requireForbiddenAdmin(): void {
    loggedAssert(this.isAdmin(), errForbidden)
  }

  /**
   * ACC-04: plugin-scoped escrow operations outside a rekey window.
   * Allowed for the plugin app itself or the grant's specific caller. A global (zero-caller)
   * grant is usable by any sender only when `allowGlobal` (sponsored opt-ins); reclaims never.
   * Expired grants are rejected.
   */
  private _requirePluginCaller(key: PluginKey, allowGlobal: boolean): void {
    loggedAssert(
      Txn.sender === Application(key.plugin).address ||
      (key.caller !== Global.zeroAddress && Txn.sender === key.caller) ||
      (allowGlobal && key.caller === Global.zeroAddress),
      errForbidden
    )
    loggedAssert(!this.pluginCheck(key).expired, errPluginExpired)
  }

  /** MBR payment from the controlled address to the contract (plugin/allowance/escrow/domain adds). */
  private _payMbrFromControlled(amount: uint64): void {
    if (this.controlledAddress.value !== Global.currentApplicationAddress) {
      itxn
        .payment({
          sender: this.controlledAddress.value,
          receiver: Global.currentApplicationAddress,
          amount
        })
        .submit()
    }
  }

  /** Refund MBR back to the controlled address (plugin/allowance removes). */
  private _refundMbrToControlled(amount: uint64): void {
    if (this.controlledAddress.value !== Global.currentApplicationAddress) {
      itxn
        .payment({
          receiver: this.controlledAddress.value,
          amount
        })
        .submit()
    }
  }

  private _calcBCPB(len: uint64): uint64 {
    return BoxCostPerByte * len
  }

  private pluginsMbr(escrow: string, methodCount: uint64): uint64 {
    return MinPluginMBR + this._calcBCPB((MethodRestrictionByteLength * methodCount) + Bytes(escrow).length)
  }

  private namedPluginsMbr(name: string): uint64 {
    return MinNamedPluginMBR + this._calcBCPB(Bytes(name).length)
  }

  private escrowsMbr(escrow: string): uint64 {
    return MinEscrowsMBR + this._calcBCPB(Bytes(escrow).length)
  }

  private escrowRefsMbr(escrow: string): uint64 {
    return MinEscrowRefsMBR + this._calcBCPB(Bytes(escrow).length)
  }

  private defaultEscrowMbr(escrow: string): uint64 {
    return MinDefaultEscrowMBR + this._calcBCPB(Bytes(escrow).length)
  }

  /** Count plugins or allowances added to or removed from an escrow, where the escrow has a count. */
  private countEscrowRefs(escrow: string, added: uint64, removed: uint64): void {
    if (escrow === '' || !this.escrowRefs(escrow).exists) {
      return
    }
    const refs: uint64 = this.escrowRefs(escrow).value + added
    this.escrowRefs(escrow).value = refs > removed ? refs - removed : 0
  }

  /**
   * A plugin is going: take it off the count of the escrow it named.
   *
   * @param key the plugin's key
   * @param id the escrow app id the plugin recorded
   * @returns the storage to refund beyond the plugin's own box
   */
  private uncountPlugin(key: PluginKey, id: uint64): uint64 {
    let escrow: string = key.escrow
    let refund: uint64 = 0
    if (escrow === '') {
      // no escrow at all, or a default one recorded before the wallet kept its name
      if (id === 0 || !this.defaultEscrows(key).exists) {
        return 0
      }
      escrow = this.defaultEscrows(key).value
      refund = this.defaultEscrowMbr(escrow)
      this.defaultEscrows(key).delete()
    }
    // a plugin left over from an earlier escrow of the same name was never counted for this one
    if (this.escrows(escrow).exists && this.escrows(escrow).value.id === id) {
      this.countEscrowRefs(escrow, 0, 1)
    }
    return refund
  }

  private allowancesMbr(escrow: string): uint64 {
    return MinAllowanceMBR + this._calcBCPB(Bytes(escrow).length)
  }

  private executionsMbr(groups: uint64): uint64 {
    return MinExecutionsMBR + this._calcBCPB(groups * 32)
  }

  private validateAllowance(type: Uint8, interval: uint64): void {
    const value = type.asUint64()
    assert(value >= 1 && value <= 3)
    assert(value === 1 || interval > 0)
  }

  private deleteExecution(lease: bytes<32>, groups: uint64): void {
    this.executions(lease).delete()
    this._refundMbrToControlled(this.executionsMbr(groups))
  }

  private domainKeysMbr(domain: string): uint64 {
    return MinDomainKeysMBR + this._calcBCPB(Bytes(domain).length)
  }

  private maybeNewEscrow(escrow: string): uint64 {
    if (escrow === '') {
      return 0
    }

    return this.escrows(escrow).exists
      ? this.escrows(escrow).value.id
      : this.newEscrow(escrow, Global.zeroAddress)
  }

  private newEscrow(escrow: string, address: Account): uint64 {
    this._payMbrFromControlled(this.escrowsMbr(escrow) + this.escrowRefsMbr(escrow))

    let id: uint64 = 0;
    if (address === Global.zeroAddress) {
      id = abiCall<typeof EscrowFactory.prototype.new>({
        sender: this.controlledAddress.value,
        appId: this.escrowFactory.value,
        args: [
          itxn.payment({
            sender: this.controlledAddress.value,
            amount: NewCostForARC58 + Global.minBalance,
            receiver: this.escrowFactory.value.address
          }),
        ]
      }).returnValue
      address = Application(id).address
    } else {
      loggedAssert(address.authAddress === Global.currentApplicationAddress, errAuthAddrMismatch)
      id = 0
    }

    this.escrows(escrow).value = { id, address, locked: false }

    this.escrowRefs(escrow).value = 0

    return id;
  }

  /** @returns whether or not the caller is an admin on the wallet */
  private isAdmin(): boolean {
    if (Txn.sender === this.admin.value) {
      return true
    }
    // ACC-06: an empty wallet domain disables every co-admin key (set by admin-plugin recovery).
    const domain = this.domain.value
    return domain !== '' && this.domainKeys(Txn.sender).exists && this.domainKeys(Txn.sender).value === domain
  }

  /**
   * @returns whether the revocation app is the app calling this wallet.
   * The calling app is compared, not the sender. With no revocation app, id 0 resolves to this
   * wallet itself, and a plugin can send as the wallet's address inside its window. No app can
   * call itself, so with id 0 nobody passes.
   */
  private canRevoke(): boolean {
    return Global.callerApplicationAddress === this.revocation.value.address
  }

  /** Resolve the plugin caller address from a CallerType enum value */
  private resolveCallerType(type: uint64, address: Account): Account {
    assert(type <= CallerTypeAdmin)
    if (type === CallerTypeGlobal) return Global.zeroAddress
    if (type === CallerTypeAdmin) {
      this._requireAdmin()
      return Global.currentApplicationAddress
    }
    return address
  }

  private pluginCallAllowed(plugin: uint64, caller: Account, escrow: string, method: bytes<4>): boolean {
    const key: PluginKey = { plugin, caller, escrow }
    const { exists, expired, onCooldown } = this.pluginCheck(key)

    if (!exists || expired || onCooldown) {
      return false
    }

    const { methods, useRounds, useExecutionKey } = this.plugins(key).value as Readonly<PluginInfo>

    const epochRef = useRounds ? Global.round : Global.latestTimestamp
    let methodAllowed = methods.length === 0
    for (let i: uint64 = 0; i < methods.length; i += 1) {
      if (methods[i].selector === method) {
        methodAllowed = !this.isOnCooldown(epochRef, methods[i].lastCalled, methods[i].cooldown)
        break
      }
    }

    return !useExecutionKey && methodAllowed
  }

  /** whether `txn` is this wallet's own `arc58_verifyAuthAddress()` call */
  private isVerifyAuthCall(txn: gtxn.Transaction): boolean {
    return (
      txn.type === TransactionType.ApplicationCall
      && txn.appId === Global.currentApplicationId
      && txn.numAppArgs === 1
      && txn.onCompletion === OnCompleteAction.NoOp
      && txn.appArgs(0) === methodSelector('arc58_verifyAuthAddress()void')
    )
  }

  /**
   * Flash `arc58_rekeyTo` return (Q2 / R-STALE). Accepted: the controlled address rekeying itself
   * back to this app, or `arc58_verifyAuthAddress` while it verifies the controlled address
   * (spending == controlled). A verifyAuthAddress that closes an escrow window leaves the controlled
   * address with the flash target, so it no longer counts as a flash return.
   */
  private assertRekeysBack(): void {
    let rekeysBack = false;
    for (let i: uint64 = (Txn.groupIndex + 1); i < Global.groupSize; i += 1) {
      const txn = gtxn.Transaction(i)

      if (
        (txn.sender === this.controlledAddress.value && txn.rekeyTo === Global.currentApplicationAddress)
        || (this.spendingAddress.value === this.controlledAddress.value && this.isVerifyAuthCall(txn))
      ) {
        rekeysBack = true;
        break;
      }
    }

    loggedAssert(rekeysBack, errMissingRekeyBack);
  }

  private isOnCooldown(epochRef: uint64, lastCalled: uint64, cooldown: uint64): boolean {
    if (cooldown === 0 || lastCalled === 0) {
      return false
    }

    if (epochRef < lastCalled) {
      return true
    }

    return (epochRef - lastCalled) < cooldown
  }

  private pluginCheck(key: PluginKey): PluginValidation {

    const exists = this.plugins(key).exists;
    if (!exists) {
      return {
        exists: false,
        expired: true,
        onCooldown: true,
        hasMethodRestrictions: false,
      }
    }

    const { useRounds, lastValid, cooldown, lastCalled, methods } = this.plugins(key).value as Readonly<PluginInfo>
    const epochRef = useRounds ? Global.round : Global.latestTimestamp;

    return {
      exists,
      expired: epochRef > lastValid,
      onCooldown: this.isOnCooldown(epochRef, lastCalled, cooldown),
      hasMethodRestrictions: methods.length > 0,
    }
  }

  /**
   * Guarantee that our txn group is valid in a single loop over all txns in the group
   * 
   * @param key the box key for the plugin were checking
   * @param methodOffsets the indices of the methods being used in the group
  */
  private assertValidGroup(key: PluginKey, methodOffsets: uint64[]): void {

    const { useRounds, useExecutionKey } = this.plugins(key).value

    if (useExecutionKey && !this.isAdmin()) {
      this._requireExecution(Txn.lease)
      const execution = clone(this.executions(Txn.lease).value)
      loggedAssert(execution.firstValid <= Global.round, errExecutionNotReady);
      loggedAssert(execution.lastValid >= Global.round, errExecutionExpired);

      const groups = clone(execution.groups) as Readonly<bytes<32>[]>;

      let foundGroup = false;
      for (let i: uint64 = 0; i < groups.length; i += 1) {
        if (groups[i] === Global.groupId) {
          foundGroup = true;
        }
      }

      loggedAssert(foundGroup, errGroupNotFound);
      this.deleteExecution(Txn.lease, groups.length)
    }

    const initialCheck = this.pluginCheck(key);

    this._requirePlugin(key)
    this._requirePluginReady(initialCheck.expired, initialCheck.onCooldown)

    const epochRef = useRounds
      ? Global.round
      : Global.latestTimestamp;

    let rekeysBack = false;
    let methodIndex: uint64 = 0;

    for (let i: uint64 = (Txn.groupIndex + 1); i < Global.groupSize; i += 1) {
      const txn = gtxn.Transaction(i)

      // Q2 (R-STALE): only arc58_verifyAuthAddress closes a window. It clears spending_address and
      // current_plugin; the old controlled-address shortcut (an outer txn from the controlled address
      // rekeying it back) left both stale, so the plugin kept passing as the window holder later.
      if (this.isVerifyAuthCall(txn)) {
        rekeysBack = true;
        break;
      }

      if (txn.type !== TransactionType.ApplicationCall) {
        continue;
      }

      loggedAssert(txn.appId.id === key.plugin, errCannotCallOtherAppsDuringRekey);
      // AppVersion counts updates: a newly created plugin has version 0.
      loggedAssert(txn.appId.version === 0, errInvalidPluginVersion);
      loggedAssert(txn.onCompletion === OnCompleteAction.NoOp, errInvalidOncomplete);
      // ensure the first arg to a method call is the app id itself
      // index 1 is used because arg[0] is the method selector
      loggedAssert(txn.numAppArgs > 1, errInvalidSenderArg);
      loggedAssert(Application(btoi(txn.appArgs(1))) === Global.currentApplicationId, errInvalidSenderValue);

      const { expired, onCooldown, hasMethodRestrictions } = this.pluginCheck(key);

      this._requirePluginReady(expired, onCooldown)

      if (hasMethodRestrictions) {
        loggedAssert(methodIndex < methodOffsets.length, errMalformedOffsets);
        const { methodAllowed, methodOnCooldown } = this.methodCheck(key, txn, methodOffsets[methodIndex]);
        loggedAssert(methodAllowed && !methodOnCooldown, errMethodOnCooldown);
      }

      this.plugins(key).value.lastCalled = epochRef
      methodIndex += 1;
    }

    loggedAssert(rekeysBack, errMissingRekeyBack);
  }

  /**
   * Checks if the method call is allowed
   * 
   * @param key the box key for the plugin were checking
   * @param caller the address that triggered the plugin or global address
   * @param offset the index of the method being used
   * @returns whether the method call is allowed
  */
  private methodCheck(key: PluginKey, txn: gtxn.ApplicationCallTxn, offset: uint64): MethodValidation {

    loggedAssert(len(txn.appArgs(0)) === 4, errInvalidMethodSignatureLength)
    const selectorArg = txn.appArgs(0).toFixed({ length: 4 })

    const { useRounds } = this.plugins(key).value
    const { selector, cooldown, lastCalled } = this.plugins(key).value.methods[offset]

    const epochRef = useRounds ? Global.round : Global.latestTimestamp
    const methodOnCooldown = this.isOnCooldown(epochRef, lastCalled, cooldown)

    if (selector === selectorArg && !methodOnCooldown) {
      // update the last called round for the method
      if (cooldown > 0) {
        const lastCalled = useRounds ? Global.round : Global.latestTimestamp;
        this.plugins(key).value.methods[offset].lastCalled = lastCalled
      }

      return {
        methodAllowed: true,
        methodOnCooldown
      }
    }

    return {
      methodAllowed: false,
      methodOnCooldown: true
    }
  }

  private optInEscrow(escrow: string, assets: uint64[]): void {
    const escrowAddress = this.escrows(escrow).value.address

    itxn
      .payment({
        sender: this.controlledAddress.value,
        receiver: escrowAddress,
        amount: Global.assetOptInMinBalance * assets.length
      })
      .submit();

    for (let i: uint64 = 0; i < assets.length; i += 1) {
      itxn
        .assetTransfer({
          sender: escrowAddress,
          assetReceiver: escrowAddress,
          assetAmount: 0,
          xferAsset: assets[i]
        })
        .submit();
    }
  }

  private reclaim(escrow: string, reclaims: EscrowReclaim[], allowCloseOut: boolean): void {
    const sender = this.escrows(escrow).value.address

    for (let i: uint64 = 0; i < reclaims.length; i += 1) {
      if (reclaims[i].asset === 0) {
        itxn.payment({
          sender,
          receiver: this.controlledAddress.value,
          amount: reclaims[i].amount
        }).submit();
      } else {
        const xfer = itxn.assetTransfer({
          sender,
          assetReceiver: this.controlledAddress.value,
          assetAmount: reclaims[i].amount,
          xferAsset: reclaims[i].asset
        })

        if (allowCloseOut && reclaims[i].closeOut) {
          xfer.set({ assetCloseTo: this.controlledAddress.value });
        }

        xfer.submit();
      }
    }
  }

  private transferFunds(escrow: string, escrowAddress: Account, fundsRequests: FundsRequest[]): void {
    for (let i: uint64 = 0; i < fundsRequests.length; i += 1) {

      const allowanceKey: AllowanceKey = {
        escrow,
        asset: fundsRequests[i].asset
      }

      this.verifyAllowance(allowanceKey, fundsRequests[i]);

      if (fundsRequests[i].asset !== 0) {
        itxn
          .assetTransfer({
            sender: this.controlledAddress.value,
            assetReceiver: escrowAddress,
            assetAmount: fundsRequests[i].amount,
            xferAsset: fundsRequests[i].asset
          })
          .submit();
      } else {
        itxn
          .payment({
            sender: this.controlledAddress.value,
            receiver: escrowAddress,
            amount: fundsRequests[i].amount
          })
          .submit();
      }
    }
  }

  private verifyAllowance(key: AllowanceKey, fundRequest: FundsRequest): void {
    this._requireAllowance(key)
    const { type, spent, amount, last, max, interval, start, useRounds } = this.allowances(key).value
    this.validateAllowance(type, interval)
    const newLast = useRounds ? Global.round : Global.latestTimestamp;

    if (type === SpendAllowanceTypeFlat) {
      const leftover: uint64 = amount - spent;
      this._requireAllowanceAmount(leftover, fundRequest.amount)
      this.allowances(key).value.spent += fundRequest.amount
    } else if (type === SpendAllowanceTypeWindow) {
      const currentWindowStart = this.getLatestWindowStart(useRounds, start, interval)

      if (currentWindowStart > last) {
        this._requireAllowanceAmount(amount, fundRequest.amount)
        this.allowances(key).value.spent = fundRequest.amount
      } else {
        // calc the remaining amount available in the current window
        const leftover: uint64 = amount - spent;
        this._requireAllowanceAmount(leftover, fundRequest.amount)
        this.allowances(key).value.spent += fundRequest.amount
      }
    } else if (type === SpendAllowanceTypeDrip) {
      // Legacy allowance boxes used `last = 0`. Anchor those at their recorded
      // creation epoch instead of treating the chain epoch as accrued time.
      const accrualStart: uint64 = last === 0 ? start : last
      // in this context:
      // amount represents our accrual rate (per interval)
      // spent represents the leftover bucket at `last`
      const intervals: uint64 = (newLast - accrualStart) / interval
      let available: uint64 = spent < max ? spent : max
      if (amount > 0 && intervals > 0) {
        // ACC-03: saturate at `max` without computing intervals * amount when it would exceed
        // the headroom (intervals * amount > headroom  <=>  intervals > headroom / amount).
        const headroom: uint64 = max - available
        if (intervals > headroom / amount) {
          available = max
        } else {
          available += intervals * amount
        }
      }

      this._requireAllowanceAmount(available, fundRequest.amount)
      this.allowances(key).value.spent = (available - fundRequest.amount)
      // ACC-03: advance only by whole intervals so the partial interval keeps accruing;
      // frequent (or zero-amount) requests can no longer erase accrual.
      this.allowances(key).value.last = accrualStart + (intervals * interval)
      return
    }
    this.allowances(key).value.last = newLast
  }

  private getLatestWindowStart(useRounds: boolean, start: uint64, interval: uint64): uint64 {
    if (useRounds) {
      return Global.round - ((Global.round - start) % interval)
    }
    return Global.latestTimestamp - ((Global.latestTimestamp - start) % interval)
  }

  /**
   * What the value of this.address.value.authAddr should be when this.controlledAddress
   * is able to be controlled by this app. It will either be this.app.address or zeroAddress
  */
  private getAuthAddress(): Account {
    return (
      this.spendingAddress.value === this.controlledAddress.value
      && this.controlledAddress.value === Global.currentApplicationAddress
    ) ? Global.zeroAddress : Global.currentApplicationAddress
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  /**
   * Create an abstracted account application.
   * This is not part of ARC58 and implementation specific.
   *
   * @param version The version of the abstracted account application
   * @param controlledAddress The address of the abstracted account. If zeroAddress, then the address of the contract account will be used
   * @param admin The address of the admin for this application
   * @param domain The domain associated with the admin account
   * @param escrowFactory The app ID of the escrow factory to use for creating escrows
   * @param revocationApp The app ID of the revocation app associated with this abstracted account
   * @param nickname A user-friendly name for this abstracted account
   * @param referrer The address that referred the creation of this wallet
   * @param salt Pseudo random function extension salt
   * @param automaticUpdates Whether anyone may trigger factory-pushed updates (else only the admin)
  */
  @abimethod({ onCreate: 'require' })
  create(
    version: string,
    akitaDAO: uint64,
    controlledAddress: Account,
    admin: Account,
    domain: string,
    escrowFactory: uint64,
    revocationApp: uint64,
    nickname: string,
    referrer: Account,
    salt: bytes<32>,
    automaticUpdates: boolean
  ): void {
    loggedAssert(Global.callerApplicationId !== 0, errBadDeployer)
    loggedAssert(admin !== controlledAddress, errAdminCannotBeControlled)

    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
    this.admin.value = admin
    this.domain.value = domain
    this.controlledAddress.value =
      controlledAddress === Global.zeroAddress
        ? Global.currentApplicationAddress
        : controlledAddress
    this.escrowFactory.value = Application(escrowFactory)
    this.spendingAddress.value = Global.zeroAddress;
    this.revocation.value = Application(revocationApp)
    this.nickname.value = nickname
    this.factoryApp.value = Application(Global.callerApplicationId)
    this.referrer.value = referrer
    this.factoryUpdateSettings.value = { allowed: true, automatic: automaticUpdates }
    this.salt.value = salt

    this._touchState()
  }

  /**
   * Register the abstracted account with the escrow factory.
   * This allows apps to correlate the account with the app without needing
   * it to be explicitly provided.
   *
   * @param escrow The name of the escrow to register, or empty string for the main account
   */
  register(escrow: string): void {
    let app: uint64 = 0
    if (escrow !== '') {
      this._requireEscrow(escrow)
      app = this.escrows(escrow).value.id
      assert(app !== 0)
    }

    abiCall<typeof EscrowFactory.prototype.register>({
      appId: this.escrowFactory.value,
      args: [
        itxn.payment({
          receiver: this.escrowFactory.value.address,
          amount: ARC58WalletIDsByAccountsMbr
        }),
        app
      ]
    })
  }

  /** @param version the version of the wallet */
  @abimethod({ allowActions: ['UpdateApplication'] })
  update(version: string): void {
    loggedAssert(
      (
        this.isAdmin() ||
        (this.factoryUpdateSettings.value.allowed && Txn.sender === this.factoryApp.value.address)
      ),
      errOnlyAdminCanUpdate
    )
    this.version.value = version
  }

  // ABSTRACTED ACCOUNT METHODS -------------------------------------------------------------------

  /**
   * Set the domain associated with the admin account
   *
   * @param domain The domain to associate with the admin account
   */
  setDomain(domain: string): void {
    this._requireAdmin()
    this.domain.value = domain
  }

  /**
   * Changes the revocation app associated with the contract
   *
   * @param app The app ID of the new revocation app
  */
  setRevocationApp(app: uint64): void {
    this._requireAdmin()
    this.revocation.value = Application(app)
  }

  /**
   * Changes the Akita DAO associated with the contract
   *
   * @param akitaDAO The app ID of the new Akita DAO
  */
  setAkitaDAO(akitaDAO: Application): void {
    this._requireAdmin()
    this.akitaDAO.value = akitaDAO
  }

  /**
   * Changes the nickname of the wallet
   *
   * @param nickname the new nickname of the wallet
  */
  setNickname(nickname: string): void {
    this._requireAdmin()
    this.nickname.value = nickname
  }

  /**
   * Changes the avatar of the wallet
   *
   * @param avatar the new avatar of the wallet
  */
  setAvatar(avatar: uint64): void {
    this._requireAdmin()
    this.avatar.value = Asset(avatar)
  }

  /**
   * Changes the banner of the wallet
   *
   * @param banner the new banner of the wallet
  */
  setBanner(banner: uint64): void {
    this._requireAdmin()
    this.banner.value = Asset(banner)
  }

  /**
   * Changes the bio of the wallet
   *
   * @param bio the new bio of the wallet
  */
  setBio(bio: string): void {
    this._requireAdmin()
    this.bio.value = bio
  }

  /**
   * Changes permissions on factory pushed contract wallet updates
   *
   * @param allowed whether the admin can update the wallet from the factory
   * @param automatic whether the wallet updates from the factory can be triggered automatically
   */
  setFactoryUpdateSettings(allowed: boolean, automatic: boolean): void {
    this._requireAdmin()
    this.factoryUpdateSettings.value = { allowed, automatic }
  }

  /**
   * Attempt to change the admin for this app. Some implementations MAY not support this.
   *
   * @param newAdmin The new admin
  */
  arc58_changeAdmin(newAdmin: Account): void {
    this._requireAdmin();
    // ACC-10a: the controlled address is rekeyed to this app and can never sign as admin
    loggedAssert(newAdmin !== this.controlledAddress.value, errAdminCannotBeControlled)
    this.admin.value = newAdmin;
    this._touchState()
  }

  /**
   * Attempt to change the admin via plugin.
   *
   * @param newAdmin The new admin
   *
  */
  arc58_pluginChangeAdmin(newAdmin: Account): void {
    const key = clone(this.currentPlugin.value)
    const { plugin, escrow } = key

    loggedAssert(escrow === '', errAdminPluginsCannotUseEscrows);
    loggedAssert(Txn.sender === Application(plugin).address, errSenderMustBeAdminPlugin);
    loggedAssert(
      this.controlledAddress.value.authAddress === Application(plugin).address,
      errPluginDoesNotControlWallet
    );

    loggedAssert(
      this.plugins(key).exists && this.plugins(key).value.admin,
      errPluginDoesNotHaveAdminPrivileges
    );

    loggedAssert(newAdmin !== this.controlledAddress.value, errAdminCannotBeControlled)
    this.admin.value = newAdmin;
    // ACC-06 / A-4: an admin-plugin admin change is a recovery path; invalidate every co-admin
    // passkey. The new admin re-enables trusted keys with setDomain (+ assignDomain).
    this.domain.value = ''
    if (this.plugins(key).value.delegationType === DelegationTypeSelf) {
      this.updateLastUserInteraction();
    }
    this.updateLastChange()
  }

  /**
   * Verify the abstracted account is rekeyed to this app
  */
  arc58_verifyAuthAddress(): void {
    loggedAssert(this.spendingAddress.value.authAddress === this.getAuthAddress(), errAuthAddrMismatch);
    this.spendingAddress.value = Global.zeroAddress
    this.currentPlugin.value = { plugin: 0, caller: Global.currentApplicationAddress, escrow: '' }
    this.rekeyIndex.value = 0
  }

  /**
   * Rekey the abstracted account to another address. Primarily useful for rekeying to an EOA.
   *
   * @param address The address to rekey to
   * @param flash Whether or not this should be a flash rekey. If true, the rekey back to the app address must done in the same txn group as this call
  */
  arc58_rekeyTo(address: Account, flash: boolean): void {
    this._requireAdmin();

    itxn
      .payment({
        sender: this.controlledAddress.value,
        receiver: address,
        rekeyTo: address
      })
      .submit();

    if (flash) this.assertRekeysBack();

    this.updateLastUserInteraction();
  }

  /**
   * Check whether the plugin can be used
   *
   * @param plugin The app ID of the plugin to check
   * @param type 0 = Other (specific address), 1 = Global (anyone), 2 = Admin (current admin)
   * @param address The address that will trigger the plugin (used when type = Other)
   * @param escrow The escrow associated with the plugin
   * @param method The method selector being called on the plugin
   * @returns Whether the plugin can be called with these parameters
  */
  @abimethod({ readonly: true })
  arc58_canCall(
    plugin: uint64,
    type: uint64,
    address: Account,
    escrow: string,
    method: bytes<4>
  ): boolean {
    const caller = this.resolveCallerType(type, address)
    return this.pluginCallAllowed(plugin, caller, escrow, method);
  }

  /**
   * Temporarily rekey to an approved plugin app address
   *
   * @param plugin The app ID of the plugin to rekey to
   * @param type 0 = Other (Txn.sender), 1 = Global (anyone), 2 = Admin (current admin)
   * @param escrow The escrow associated with the plugin
   * @param methodOffsets The indices of the methods being used in the group. If the plugin has method restrictions, these indices must match the methods used on each subsequent call to the plugin within the group
   * @param fundsRequest If the plugin is using an escrow, this is the list of funds to transfer to the escrow for the plugin to use during execution
  */
  arc58_rekeyToPlugin(
    plugin: uint64,
    type: uint64,
    escrow: string,
    methodOffsets: uint64[],
    fundsRequest: FundsRequest[]
  ): void {
    const pluginApp = Application(plugin)
    const caller = this.resolveCallerType(type, Txn.sender)
    const key: PluginKey = { plugin, caller, escrow }

    this._requirePlugin(key)
    this.currentPlugin.value = clone(key)
    const { escrow: escrowID } = this.plugins(key).value

    if (escrow !== '' || escrowID !== 0) {
      const spendingAddress = (escrowID !== 0)
        ? Application(escrowID).address
        : this.escrows(escrow).value.address
      this.spendingAddress.value = spendingAddress
      this.transferFunds(escrow, spendingAddress, fundsRequest)
    } else {
      this.spendingAddress.value = this.controlledAddress.value
    }

    this.assertValidGroup(key, methodOffsets)

    // Reimburse caller for fees if plugin has coverFees enabled.
    // ACC-02: Txn.fee is caller-chosen, so only reimburse a top-level call (no inner-group
    // amplification).
    if (this.plugins(key).value.coverFees && Global.callerApplicationId === 0) {
      // Cap at protocol max inner + outer transactions
      const maxFee: uint64 = (MAX_INNER_TXN_COUNT + MAX_OUTER_TXN_COUNT) * Global.minTxnFee
      const reimbursement = Txn.fee < maxFee ? Txn.fee : maxFee

      itxn
        .payment({
          sender: this.spendingAddress.value,
          receiver: Txn.sender,
          amount: reimbursement,
          rekeyTo: pluginApp.address
        })
        .submit()
    } else {
      itxn
        .payment({
          sender: this.spendingAddress.value,
          receiver: this.spendingAddress.value,
          rekeyTo: pluginApp.address
        })
        .submit();
    }

    /** track the index of the transaction that triggered the rekey */
    this.rekeyIndex.value = Txn.groupIndex

    if (this.plugins(key).value.delegationType === DelegationTypeSelf) {
      this.updateLastUserInteraction();
    }
  }

  /**
   * Temporarily rekey to a named plugin app address
   *
   * @param name The name of the plugin to rekey to
   * @param global Whether the plugin is callable globally
   * @param escrow The escrow associated with the plugin
   * @param methodOffsets The indices of the methods being used in the group. If the plugin has method restrictions, these indices must match the methods used on each subsequent call to the plugin within the group
   * @param fundsRequest If the plugin is using an escrow, this is the list of funds to transfer to the escrow for the plugin to use during execution
  */
  arc58_rekeyToNamedPlugin(
    name: string,
    type: uint64,
    escrow: string,
    methodOffsets: uint64[],
    fundsRequest: FundsRequest[]): void {
    this.arc58_rekeyToPlugin(
      this.namedPlugins(name).value.plugin,
      type,
      escrow,
      methodOffsets,
      fundsRequest
    );
  }

  /**
   * Shared implementation for adding a plugin, with an optional named alias.
   *
   * @param name Empty string for an unnamed plugin; non-empty to also register a named alias
   * @param plugin The app ID of the plugin to add
   * @param caller The address allowed to call the plugin, or the global zero address for any address
   * @param escrow The escrow account to use for the plugin, if any
   * @param admin Whether the plugin has permissions to change the admin account
   * @param delegationType The ownership of the delegation for last_interval updates
   * @param lastValid The timestamp or round when the permission expires
   * @param cooldown The number of seconds or rounds that must pass before the plugin can be called again
   * @param methods The methods that are allowed to be called for the plugin by the address
   * @param useRounds Whether the plugin uses rounds for cooldowns and lastValid
   * @param useExecutionKey Whether the plugin requires an execution key to be used
   * @param coverFees Whether the plugin reimburses the caller for transaction fees
   * @param canReclaim Whether the plugin is allowed to reclaim funds from escrows via arc58_pluginReclaim
   * @param defaultToEscrow Whether to use the named escrow as the default escrow (plugin key uses empty string)
  */
  private _addPlugin(
    name: string,
    plugin: uint64,
    caller: Account,
    escrow: string,
    admin: boolean,
    delegationType: Uint8,
    lastValid: uint64,
    cooldown: uint64,
    methods: MethodRestriction[],
    useRounds: boolean,
    useExecutionKey: boolean,
    coverFees: boolean,
    canReclaim: boolean,
    defaultToEscrow: boolean
  ): void {
    this._requireAdmin();

    const isNamed = name !== ''
    if (isNamed) {
      loggedAssert(!this.namedPlugins(name).exists, errPluginAlreadyExists)
    }

    loggedAssert(
      !(
        delegationType === DelegationTypeSelf &&
        caller === Global.zeroAddress
      ),
      errZeroAddressDelegationType
    )
    loggedAssert(
      !(
        useExecutionKey &&
        caller !== Global.zeroAddress
      ),
      errUsingExecutionKeyRequiresGlobal
    )
    // ACC-02: a grant anyone can call may not reimburse fees. The caller sets its own fee, so an open
    // grant would let anyone drain the spending account (and grants never change caller or coverFees).
    loggedAssert(!(coverFees && caller === Global.zeroAddress), errCoverFeesRequiresCaller)

    let escrowKey: string = escrow
    if (defaultToEscrow) {
      loggedAssert(escrow !== '', errEscrowRequiredToBeSetAsDefault)
      escrowKey = ''
    }

    const key: PluginKey = { plugin, caller, escrow: escrowKey }

    loggedAssert(!this.plugins(key).exists, errPluginAlreadyExists)

    let methodInfos: MethodInfo[] = []
    for (let i: uint64 = 0; i < methods.length; i += 1) {
      methodInfos.push({ ...methods[i], lastCalled: 0 })
    }

    let totalMbr: uint64 = this.pluginsMbr(escrowKey, methodInfos.length)
    if (isNamed) {
      totalMbr += this.namedPluginsMbr(name)
    }
    if (defaultToEscrow) {
      totalMbr += this.defaultEscrowMbr(escrow)
    }
    this._payMbrFromControlled(totalMbr)

    const escrowID = this.maybeNewEscrow(escrow);
    if (defaultToEscrow) {
      assert(escrowID !== 0)
      this.defaultEscrows(key).value = escrow
    }
    this.countEscrowRefs(escrow, 1, 0)
    const epochRef = useRounds ? Global.round : Global.latestTimestamp;

    this.plugins(key).value = {
      escrow: escrowID,
      admin,
      delegationType,
      lastValid,
      cooldown,
      methods: clone(methodInfos),
      useRounds,
      useExecutionKey,
      coverFees,
      canReclaim: escrow !== '' ? canReclaim : false,
      lastCalled: 0,
      start: epochRef,
    }

    if (isNamed) {
      this.namedPlugins(name).value = clone(key)
    }

    this._touchState();
  }

  /**
   * Add an app to the list of approved plugins
   *
   * @param plugin The app ID of the plugin to add
   * @param caller The address allowed to call the plugin, or the global zero address for any address
   * @param escrow The escrow account to use for the plugin, if any. If empty, no escrow will be used, if the named escrow does not exist, it will be created
   * @param admin Whether the plugin has permissions to change the admin account
   * @param delegationType The ownership of the delegation for last_interval updates
   * @param lastValid The timestamp or round when the permission expires
   * @param cooldown The number of seconds or rounds that must pass before the plugin can be called again
   * @param methods The methods that are allowed to be called for the plugin by the address
   * @param useRounds Whether the plugin uses rounds for cooldowns and lastValid, defaults to timestamp
   * @param useExecutionKey Whether the plugin requires an execution key to be used
   * @param coverFees Whether the plugin reimburses the caller for transaction fees
   * @param canReclaim Whether the plugin is allowed to reclaim funds from escrows via arc58_pluginReclaim
   * @param defaultToEscrow Whether to use the named escrow as the default escrow (plugin key uses empty string)
  */
  arc58_addPlugin(
    plugin: uint64,
    caller: Account,
    escrow: string,
    admin: boolean,
    delegationType: Uint8,
    lastValid: uint64,
    cooldown: uint64,
    methods: MethodRestriction[],
    useRounds: boolean,
    useExecutionKey: boolean,
    coverFees: boolean,
    canReclaim: boolean,
    defaultToEscrow: boolean
  ): void {
    this._addPlugin(
      '',
      plugin,
      caller,
      escrow,
      admin,
      delegationType,
      lastValid,
      cooldown,
      methods,
      useRounds,
      useExecutionKey,
      coverFees,
      canReclaim,
      defaultToEscrow
    )
  }

  /**
   * Assign a domain to a passkey
   *
   * @param caller The address of the passkey
   * @param domain The domain to assign to the passkey
  */
  assignDomain(caller: Account, domain: string): void {
    loggedAssert(this.isAdmin(), errOnlyAdminCanAddPlugin)

    // ACC-06: overwriting or revoking refunds the existing key's MBR; an empty domain revokes.
    if (this.domainKeys(caller).exists) {
      this._refundMbrToControlled(this.domainKeysMbr(this.domainKeys(caller).value))
      this.domainKeys(caller).delete()
    }

    if (domain !== '') {
      this._payMbrFromControlled(this.domainKeysMbr(domain))
      this.domainKeys(caller).value = domain
    }
  }

  /**
   * Remove an app from the list of approved plugins
   *
   * @param plugin The app ID of the plugin to remove
   * @param caller The address that was allowed to call the plugin
   * @param escrow The escrow associated with the plugin
  */
  arc58_removePlugin(plugin: uint64, caller: Account, escrow: string): void {
    // A named caller may give up its own grant (an agent that shuts down frees the wallet's MBR).
    // The app address marks an admin-type grant, and a plugin can send as that address inside its
    // window, so it never counts as the grant's caller. The zero address (a global grant) cannot send.
    if (Txn.sender === caller && caller !== Global.currentApplicationAddress) {
      // The caller leaving is a change to the wallet, but not something its user did.
      this.updateLastChange()
    } else {
      this._requireAdminOrRevoke();
      this._touchState();
    }

    const key: PluginKey = { plugin, caller: caller, escrow }
    this._requirePlugin(key)

    // ACC-05: refund exactly what _addPlugin charged (pluginsMbr(key.escrow, methods)).
    const methodsLength: uint64 = this.plugins(key).value.methods.length
    const uncounted = this.uncountPlugin(key, this.plugins(key).value.escrow)
    this.plugins(key).delete();
    this._refundMbrToControlled(this.pluginsMbr(escrow, methodsLength) + uncounted)
  }

  /**
   * Add a named plugin
   *
   * @param name The plugin name
   * @param plugin The app ID of the plugin to add
   * @param caller The address allowed to call the plugin, or the global zero address for any address
   * @param escrow The escrow account to use for the plugin, if any. If empty, no escrow will be used, if the named escrow does not exist, it will be created
   * @param admin Whether the plugin has permissions to change the admin account
   * @param delegationType The ownership of the delegation for last_interval updates
   * @param lastValid The timestamp or round when the permission expires
   * @param cooldown The number of seconds or rounds that must pass before the plugin can be called again
   * @param methods The methods that are allowed to be called for the plugin by the address
   * @param useRounds Whether the plugin uses rounds for cooldowns and lastValid, defaults to timestamp
   * @param useExecutionKey Whether the plugin requires an execution key to be used
   * @param coverFees Whether the plugin reimburses the caller for transaction fees
   * @param canReclaim Whether the plugin is allowed to reclaim funds from escrows via arc58_pluginReclaim
   * @param defaultToEscrow Whether to use the named escrow as the default escrow (plugin key uses empty string)
  */
  arc58_addNamedPlugin(
    name: string,
    plugin: uint64,
    caller: Account,
    escrow: string,
    admin: boolean,
    delegationType: Uint8,
    lastValid: uint64,
    cooldown: uint64,
    methods: MethodRestriction[],
    useRounds: boolean,
    useExecutionKey: boolean,
    coverFees: boolean,
    canReclaim: boolean,
    defaultToEscrow: boolean
  ): void {
    this._addPlugin(
      name,
      plugin,
      caller,
      escrow,
      admin,
      delegationType,
      lastValid,
      cooldown,
      methods,
      useRounds,
      useExecutionKey,
      coverFees,
      canReclaim,
      defaultToEscrow
    )
  }

  /**
     * Remove a named plugin
     *
     * @param name The plugin name
    */
  arc58_removeNamedPlugin(name: string): void {
    this._requireAdminOrRevoke();
    loggedAssert(this.namedPlugins(name).exists, errPluginDoesNotExist);
    const app = clone(this.namedPlugins(name).value)

    // ACC-05: tolerate an alias whose grant was already removed with arc58_removePlugin
    // (which refunded the grant's MBR); then only the alias MBR is refunded.
    let refund: uint64 = this.namedPluginsMbr(name)
    if (this.plugins(app).exists) {
      refund += this.pluginsMbr(app.escrow, this.plugins(app).value.methods.length)
      refund += this.uncountPlugin(app, this.plugins(app).value.escrow)
      this.plugins(app).delete();
    }

    this.namedPlugins(name).delete();

    this._refundMbrToControlled(refund)

    this._touchState();
  }

  /**
   * Create a new escrow for the controlled address
   *
   * @param escrow The name of the escrow to create
  */
  arc58_newEscrow(escrow: string, address: Account): uint64 {
    this._requireAdmin();
    loggedAssert(!this.escrows(escrow).exists, errEscrowAlreadyExists);
    loggedAssert(escrow !== '', errEscrowNameRequired);
    return this.newEscrow(escrow, address);
  }

  /**
   * Lock or Unlock an escrow account
   *
   * @param escrow The escrow to lock or unlock
  */
  arc58_toggleEscrowLock(escrow: string): EscrowInfo {
    this._requireForbiddenAdmin()
    this._requireEscrow(escrow);

    this.escrows(escrow).value.locked = !this.escrows(escrow).value.locked;

    this._touchState();

    return this.escrows(escrow).value;
  }

  /**
   * Transfer funds from an escrow back to the controlled address.
   * 
   * @param escrow The escrow to reclaim funds from
   * @param reclaims The list of reclaims to make from the escrow
  */
  arc58_reclaim(escrow: string, reclaims: EscrowReclaim[]): void {
    this._requireForbiddenAdmin()
    this._requireEscrow(escrow);
    this.reclaim(escrow, reclaims, true);
  }

  /**
   * Delete an escrow by closing its account out to the controlled address.
   *
   * The escrow must be unlocked, hold no asset and be opted in to no app: close assets out with
   * arc58_reclaim first. No plugin and no allowance may still name it. Calls earlier in the same
   * group may do all of that. An escrow made before plugins and allowances were counted has no
   * count to check: remove its plugins and allowances first, because one left behind stays stored,
   * and an allowance applies again to a new escrow of the same name. The address of a deleted
   * escrow is under nobody's control: never pay it again.
   *
   * @param escrow The escrow to delete
  */
  arc58_deleteEscrow(escrow: string): void {
    this._requireForbiddenAdmin()
    this._requireEscrow(escrow)
    this._requireUnlockedEscrow(escrow)

    const { id, address } = this.escrows(escrow).value

    let boxRefund: uint64 = this.escrowsMbr(escrow)
    if (this.escrowRefs(escrow).exists) {
      loggedAssert(this.escrowRefs(escrow).value === 0, errEscrowInUse)
      this.escrowRefs(escrow).delete()
      boxRefund += this.escrowRefsMbr(escrow)
    }

    // Close the account from here, where it is authorised: the escrow's account is rekeyed to
    // this wallet, so its own app cannot spend from it until it is closed.
    itxn
      .payment({
        sender: address,
        receiver: this.controlledAddress.value,
        closeRemainderTo: this.controlledAddress.value
      })
      .submit()

    if (id !== 0) {
      const factory = this.escrowFactory.value
      // The factory pays this app what it held for the escrow app and for its record of it. The
      // controlled address paid for the app (newEscrow).
      let factoryRefund: uint64 = NewCostForARC58

      // The factory deletes only an escrow it has on record. Put this one on record if it is not:
      // the controlled address pays for the record and gets that back below. For an escrow already
      // on record this app paid (register), and keeps what the factory returns for it.
      const onRecord = abiCall<typeof EscrowFactory.prototype.exists>({ appId: factory, args: [address] }).returnValue
      if (!onRecord) {
        abiCall<typeof EscrowFactory.prototype.register>({
          appId: factory,
          args: [
            itxn.payment({
              sender: this.controlledAddress.value,
              receiver: factory.address,
              amount: ARC58WalletIDsByAccountsMbr
            }),
            id
          ]
        })
        factoryRefund += ARC58WalletIDsByAccountsMbr
      }

      abiCall<typeof EscrowFactory.prototype.delete>({ appId: factory, args: [id] })
      this._refundMbrToControlled(factoryRefund)
    }

    this.escrows(escrow).delete()
    this._refundMbrToControlled(boxRefund)
    this._touchState()
  }

  /**
   * Transfer funds from an escrow back to the controlled address via a plugin / allowed caller.
   * The plugin must have canReclaim set to true. CloseOut on asset transfers is blocked when the escrow is locked.
   *
   * @param plugin The plugin app ID
   * @param caller The address allowed to call the plugin
   * @param escrow The escrow to reclaim funds from
   * @param reclaims The list of reclaims to make from the escrow
  */
  arc58_pluginReclaim(
    plugin: uint64,
    caller: Account,
    escrow: string,
    reclaims: EscrowReclaim[]
  ): void {
    const key: PluginKey = { plugin, caller: caller, escrow }

    this._requirePlugin(key)
    loggedAssert(this.plugins(key).value.canReclaim, errForbidden)
    this._requireEscrow(escrow)

    // ACC-04 / A-3: never open to arbitrary senders, even on a global grant
    this._requirePluginCaller(key, false)

    this.reclaim(escrow, reclaims, !this.escrows(escrow).value.locked);
  }

  /**
   * Opt-in an escrow account to assets
   *
   * @param escrow The escrow to opt-in to
   * @param assets The list of assets to opt-in to
  */
  arc58_optInEscrow(escrow: string, assets: uint64[]): void {
    this._requireForbiddenAdmin()
    this._requireEscrow(escrow)
    this._requireUnlockedEscrow(escrow)
    this.optInEscrow(escrow, assets);
  }

  /**
   * Opt-in an escrow account to assets via a plugin / allowed caller
   *
   * @param plugin The plugin app ID
   * @param caller The address allowed to call the plugin
   * @param escrow The escrow to opt-in assets for
   * @param assets The list of assets to opt-in to
   * @param mbrPayment The payment txn that is used to pay for the asset opt-in
  */
  arc58_pluginOptInEscrow(
    plugin: uint64,
    caller: Account,
    escrow: string,
    assets: uint64[],
    mbrPayment: gtxn.PaymentTxn
  ): void {
    const key: PluginKey = { plugin, caller: caller, escrow }

    this._requirePlugin(key)
    this._requireEscrow(escrow)
    this._requireUnlockedEscrow(escrow)

    // ACC-04: sponsored opt-ins stay open on global grants (the payment nets to zero for the
    // wallet), but expired grants are rejected
    this._requirePluginCaller(key, true)

    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: this.controlledAddress.value,
          amount: Global.assetOptInMinBalance * assets.length
        }
      ),
      errInvalidPayment
    )

    this.optInEscrow(escrow, assets);
  }

  /**
   * Add an allowance for an escrow account
   *
   * @param escrow The escrow to add the allowance for
   * @param allowances The list of allowances to add
  */
  arc58_addAllowances(escrow: string, allowances: AddAllowanceInfo[]): void {
    this._requireAdmin();
    this._requireEscrow(escrow);
    this._requireUnlockedEscrow(escrow);

    this._payMbrFromControlled(this.allowancesMbr(escrow) * allowances.length)
    this.countEscrowRefs(escrow, allowances.length, 0)

    for (let i: uint64 = 0; i < allowances.length; i += 1) {
      const { asset, type, amount, max, interval, useRounds } = allowances[i];
      this.validateAllowance(type, interval)
      const key: AllowanceKey = { escrow, asset }
      loggedAssert(!this.allowances(key).exists, errAllowanceAlreadyExists);
      const start = useRounds ? Global.round : Global.latestTimestamp;
      const initialAvailable: uint64 = type === SpendAllowanceTypeDrip ? max : 0

      this.allowances(key).value = {
        type,
        spent: initialAvailable,
        amount,
        last: start,
        max,
        interval,
        start,
        useRounds
      }
    }

    this._touchState();
  }

  /**
   * Remove an allowances for an escrow account
   *
   * @param escrow The escrow to remove the allowance for
   * @param assets The list of assets to remove the allowance for
  */
  arc58_removeAllowances(escrow: string, assets: uint64[]): void {
    loggedAssert(this.isAdmin() || this.canRevoke(), errOnlyAdminOrRevocationAppCanRemoveMethodRestriction);
    // An escrow made before allowances were counted can be deleted with allowances left behind, and
    // their storage must stay recoverable, so only an escrow that still exists has to be unlocked.
    if (this.escrows(escrow).exists) {
      this._requireUnlockedEscrow(escrow);
      this.countEscrowRefs(escrow, 0, assets.length)
    }

    this._refundMbrToControlled(this.allowancesMbr(escrow) * assets.length)

    for (let i: uint64 = 0; i < assets.length; i += 1) {
      const key: AllowanceKey = {
        escrow,
        asset: assets[i]
      }
      this._requireAllowance(key)
      this.allowances(key).delete()
    }

    this._touchState()
  }

  /**
   * Add or extend an execution key for pre-authorized plugin usage
   *
   * @param lease The 32-byte lease key that uniquely identifies this execution
   * @param groups The list of 32-byte group IDs that are authorized under this key
   * @param firstValid The first round when this key becomes valid
   * @param lastValid The last round when this key expires
  */
  arc58_addExecutionKey(
    lease: bytes<32>,
    groups: bytes<32>[],
    firstValid: uint64,
    lastValid: uint64,
  ): void {
    this._requireAdmin()
    loggedAssert(groups.length > 0 && firstValid <= lastValid, errExecutionNotReady)
    if (!this.executions(lease).exists) {
      this._payMbrFromControlled(this.executionsMbr(groups.length))
      this.executions(lease).value = {
        groups: clone(groups),
        firstValid,
        lastValid
      }
    } else {
      loggedAssert(this.executions(lease).value.firstValid === firstValid, errExecutionKeyUpdateMustMatchFirstValid)
      loggedAssert(this.executions(lease).value.lastValid === lastValid, errExecutionKeyUpdateMustMatchLastValid)

      this._payMbrFromControlled(this.executionsMbr(groups.length) - MinExecutionsMBR)
      this.executions(lease).value.groups = [...clone(this.executions(lease).value.groups), ...clone(groups)]
    }

    this._touchState()
  }

  /**
   * Remove an execution key. Can be called by admin at any time, or by anyone after the key has expired.
   *
   * @param lease The 32-byte lease key identifying the execution to remove
  */
  arc58_removeExecutionKey(lease: bytes<32>): void {
    this._requireExecution(lease)
    const execution = clone(this.executions(lease).value)
    loggedAssert(this.isAdmin() || execution.lastValid < Global.round, errAdminOnly)

    this.deleteExecution(lease, execution.groups.length)

    this._touchState()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /**
   * Get the admin of this app. This method SHOULD always be used rather than reading directly from state
   * because different implementations may have different ways of determining the admin.
  */
  @abimethod({ readonly: true })
  arc58_getAdmin(): Account {
    return this.admin.value
  }

  /**
   * Get plugin info for a list of plugin keys
   *
   * @param keys The plugin keys to look up
   * @returns The plugin info for each key, or empty plugin info if the key does not exist
  */
  @abimethod({ readonly: true })
  arc58_getPlugins(keys: PluginKey[]): PluginInfo[] {
    let plugins: PluginInfo[] = []
    for (let i: uint64 = 0; i < keys.length; i += 1) {
      if (this.plugins(keys[i]).exists) {
        plugins.push(this.plugins(keys[i]).value)
        continue
      }
      plugins.push(emptyPluginInfo())
    }
    return plugins
  }

  /**
   * Get plugin info for a list of named plugins
   *
   * @param names The plugin names to look up
   * @returns The plugin info for each name, or empty plugin info if the name does not exist
  */
  @abimethod({ readonly: true })
  arc58_getNamedPlugins(names: string[]): PluginInfo[] {
    let plugins: PluginInfo[] = []
    for (let i: uint64 = 0; i < names.length; i += 1) {
      if (this.namedPlugins(names[i]).exists) {
        const nameKey = clone(this.namedPlugins(names[i]).value)
        if (this.plugins(nameKey).exists) {
          plugins.push(this.plugins(nameKey).value)
          continue
        }
      }
      plugins.push(emptyPluginInfo())
    }
    return plugins
  }

  /** Resolve an alias to the exact registration key used by plugin authorization. */
  @abimethod({ readonly: true })
  arc58_getNamedPluginKey(name: string): PluginKey {
    loggedAssert(this.namedPlugins(name).exists, errPluginDoesNotExist)
    return this.namedPlugins(name).value
  }

  /**
   * Get escrow info for a list of escrow names
   *
   * @param escrows The escrow names to look up
   * @returns The escrow info for each name, or empty escrow info if the name does not exist
  */
  @abimethod({ readonly: true })
  arc58_getEscrows(escrows: string[]): EscrowInfo[] {
    let result: EscrowInfo[] = []
    for (let i: uint64 = 0; i < escrows.length; i += 1) {
      if (this.escrows(escrows[i]).exists) {
        result.push(this.escrows(escrows[i]).value)
        continue
      }
      result.push(emptyEscrowInfo())
    }
    return result
  }

  /**
   * Get allowance info for a list of assets on a given escrow
   *
   * @param escrow The escrow to look up allowances for
   * @param assets The asset IDs to look up allowances for
   * @returns The allowance info for each asset, or empty allowance info if no allowance exists
  */
  @abimethod({ readonly: true })
  arc58_getAllowances(escrow: string, assets: uint64[]): AllowanceInfo[] {
    let result: AllowanceInfo[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      const key: AllowanceKey = { escrow, asset: assets[i] }
      if (this.allowances(key).exists) {
        result.push(this.allowances(key).value)
        continue
      }
      result.push(emptyAllowanceInfo())
    }
    return result
  }

  /**
   * Get execution key info for a list of leases
   *
   * @param leases The 32-byte lease keys to look up
   * @returns The execution info for each lease, or empty execution info if the lease does not exist
  */
  @abimethod({ readonly: true })
  arc58_getExecutions(leases: bytes<32>[]): ExecutionInfo[] {
    let result: ExecutionInfo[] = []
    for (let i: uint64 = 0; i < leases.length; i += 1) {
      if (this.executions(leases[i]).exists) {
        result.push(this.executions(leases[i]).value)
        continue
      }
      result.push(emptyExecutionInfo())
    }
    return result
  }

  /**
   * Get domain key assignments for a list of addresses
   *
   * @param addresses The addresses to look up domain keys for
   * @returns The domain string for each address, or empty string if no domain is assigned
  */
  @abimethod({ readonly: true })
  arc58_getDomainKeys(addresses: Account[]): string[] {
    let result: string[] = []
    for (let i: uint64 = 0; i < addresses.length; i += 1) {
      if (this.domainKeys(addresses[i]).exists) {
        result.push(this.domainKeys(addresses[i]).value)
        continue
      }
      result.push("")
    }
    return result
  }

}
