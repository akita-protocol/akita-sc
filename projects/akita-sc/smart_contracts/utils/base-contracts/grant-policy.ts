import {
  Account,
  Application,
  Bytes,
  bytes,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract, decodeArc4, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { AbstractAccountBoxPrefixPlugins, AbstractAccountGlobalStateKeysCurrentPlugin } from '../../arc58/account/constants'
import type { AbstractedAccount } from '../../arc58/account/contract.algo'
import { PluginInfo, PluginKey } from '../../arc58/account/types'
import { MaxRecordKeyBytes, RecordHeaderBytes } from '../../meta/constants'
import type { Meta } from '../../meta/contract.algo'
import { readMetaRecord, removeMetaRecord, setMetaRecord } from '../../meta/functions'
import { errGrantContext, errGrantMissing, errPolicyAdmin, errPolicyMissing, errPolicyStale } from '../errors'
import { getRekeyIndex, getSpendingAccount, rekeyAddress } from '../functions'

/** Bytes in front of every policy body: the install epoch (`PluginInfo.start`) of the grant it configures. */
export const GrantPolicyHeaderBytes: uint64 = 8

/** The grant this plugin is running under, and the epoch the wallet installed it at. */
export type GrantContext = { key: PluginKey; start: uint64 }

/**
 * Base for ARC-58 plugins whose behavior is configured per grant.
 *
 * Responsibilities stay split the same way for every plugin built on this:
 * - The wallet owns budget. Allowances and escrow balances cap what any grant can spend, and a
 *   policy never widens that.
 * - The plugin owns meaning. A policy only narrows what this plugin's code does with the account it
 *   is rekeyed to (which recipients, which assets, which metadata keys).
 *
 * A policy is a Meta record owned by this plugin's app account, so no other app can write it. It is
 * keyed by the grant's `(wallet, caller, escrow)` and only an admin execution of the wallet (the
 * grant whose caller is the wallet's own address, on no escrow) can set or clear it. A delegated
 * grant without a policy is denied.
 *
 * Every policy starts with the `start` epoch of the grant it was written for. The wallet stamps
 * `start` when a grant is installed, so removing and reinstalling a grant makes its old policy stale.
 * A stale policy is refused until an admin configures the grant again.
 */
export abstract class GrantPolicyPlugin extends Contract {
  /** The Meta registry that stores this plugin's policies. */
  public registry = GlobalState<Application>({ key: 'registry' })

  /**
   * The grant this call runs under. The call must follow the wallet's `arc58_rekeyToPlugin` for this
   * app in the same group, and the wallet's spending account must be rekeyed to this app.
   */
  protected grant(wallet: Application): GrantContext {
    const index = getRekeyIndex(wallet)
    loggedAssert(index < Txn.groupIndex, errGrantContext)
    const rekey = gtxn.ApplicationCallTxn(index)
    loggedAssert(
      rekey.appId === wallet &&
      rekey.appArgs(0) === methodSelector<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>() &&
      op.btoi(rekey.appArgs(1)) === Global.currentApplicationId.id,
      errGrantContext,
    )
    const [value, exists] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysCurrentPlugin))
    loggedAssert(exists, errGrantContext)
    const key = decodeArc4<PluginKey>(value)
    loggedAssert(key.plugin === Global.currentApplicationId.id, errGrantContext)
    loggedAssert(getSpendingAccount(wallet).authAddress === Global.currentApplicationAddress, errGrantContext)
    // The wallet validates every plugin call's first argument against its own ID.
    const start = this.grantStart(wallet, key.caller, key.escrow)
    loggedAssert(start !== 0, errGrantContext)
    return { key, start }
  }

  /** True when the running grant is an admin execution: caller is the wallet itself, on no escrow. */
  protected isAdminGrant(wallet: Application, grant: GrantContext): boolean {
    return grant.key.caller === wallet.address && grant.key.escrow === ''
  }

  protected requireAdmin(wallet: Application): GrantContext {
    const grant = this.grant(wallet)
    loggedAssert(this.isAdminGrant(wallet, grant), errPolicyAdmin)
    return grant
  }

  /**
   * `PluginInfo.start` of this plugin's grant for `(caller, escrow)` on `wallet`, or 0 if there is no
   * such grant. Read straight from the wallet's plugin box, so the call needs that box reference.
   */
  protected grantStart(wallet: Application, caller: Account, escrow: string): uint64 {
    const name = Bytes(AbstractAccountBoxPrefixPlugins).concat(
      encodeArc4<PluginKey>({ plugin: Global.currentApplicationId.id, caller, escrow }),
    )
    const [info, exists] = op.AppBox.get(wallet, name)
    if (!exists) return 0
    return decodeArc4<PluginInfo>(info).start
  }

  /** Meta record key of the policy for one grant. The composite identity is hashed to fit a record key. */
  protected policyKey(wallet: Application, caller: Account, escrow: string): bytes {
    return op.sha256(encodeArc4<[uint64, Account, string]>([wallet.id, caller, escrow])).slice(0, MaxRecordKeyBytes)
  }

  /**
   * The policy body for the running grant. Fails if there is none, or if it was written for an
   * earlier install of the grant. Admin executions have no policy: callers decide what they may do.
   */
  protected policy(wallet: Application, grant: GrantContext): bytes {
    const record = readMetaRecord(
      this.registry.value,
      Global.currentApplicationAddress,
      this.policyKey(wallet, grant.key.caller, grant.key.escrow),
    )
    loggedAssert(record.exists && record.data.length >= GrantPolicyHeaderBytes, errPolicyMissing)
    loggedAssert(op.extractUint64(record.data, 0) === grant.start, errPolicyStale)
    return record.data.slice(GrantPolicyHeaderBytes)
  }

  /**
   * Create or replace the policy for this plugin's grant `(caller, escrow)` on `wallet`. Admin only.
   * The grant must be installed; its current `start` is written in front of `body`. The spending
   * account pays the record's storage, and is refunded when the record shrinks.
   */
  protected writePolicy(
    wallet: Application,
    rekeyBack: boolean,
    caller: Account,
    escrow: string,
    body: bytes,
    expectedRevision: uint64,
  ): uint64 {
    this.requireAdmin(wallet)
    const start = this.grantStart(wallet, caller, escrow)
    loggedAssert(start !== 0, errGrantMissing)

    const key = this.policyKey(wallet, caller, escrow)
    const data = op.itob(start).concat(body)
    const old = readMetaRecord(this.registry.value, Global.currentApplicationAddress, key)
    const cost = abiCall<typeof Meta.prototype.recordCost>({
      appId: this.registry.value,
      args: [Global.currentApplicationAddress, key, data.length],
    }).returnValue
    const sender = getSpendingAccount(wallet)
    if (cost > 0) itxn.payment({ sender, receiver: Global.currentApplicationAddress, amount: cost, fee: 0 }).submit()
    const revision = setMetaRecord(this.registry.value, key, data, expectedRevision)
    const refund: uint64 = old.exists && old.data.length > data.length ? 400 * (old.data.length - data.length) : 0
    itxn.payment({ sender: Global.currentApplicationAddress, receiver: sender, amount: refund, fee: 0 }).submit()
    itxn.payment({ sender, receiver: sender, amount: 0, fee: 0, rekeyTo: rekeyAddress(rekeyBack, wallet) }).submit()
    return revision
  }

  /**
   * Remove the policy for `(caller, escrow)` and refund its storage to the spending account. Admin
   * only. The grant need not exist any more, so a removed grant's policy can always be cleaned up.
   */
  protected removePolicy(wallet: Application, rekeyBack: boolean, caller: Account, escrow: string, expectedRevision: uint64): void {
    this.requireAdmin(wallet)
    const key = this.policyKey(wallet, caller, escrow)
    const old = readMetaRecord(this.registry.value, Global.currentApplicationAddress, key)
    removeMetaRecord(this.registry.value, key, expectedRevision)
    const sender = getSpendingAccount(wallet)
    const refund: uint64 = 2500 + 400 * (33 + key.length + RecordHeaderBytes + old.data.length)
    itxn.payment({ receiver: sender, amount: refund, fee: 0 }).submit()
    itxn.payment({ sender, receiver: sender, amount: 0, fee: 0, rekeyTo: rekeyAddress(rekeyBack, wallet) }).submit()
  }
}
