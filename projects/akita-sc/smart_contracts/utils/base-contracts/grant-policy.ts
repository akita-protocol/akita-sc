import {
  Account,
  Application,
  Bytes,
  bytes,
  Global,
  GlobalState,
  gtxn,
  loggedAssert,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { Contract, decodeArc4, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import {
  AbstractAccountBoxPrefixPlugins,
  AbstractAccountGlobalStateKeysControlledAddress,
  AbstractAccountGlobalStateKeysCurrentPlugin,
} from '../../arc58/account/constants'
import type { AbstractedAccount } from '../../arc58/account/contract.algo'
import { PluginInfo, PluginKey } from '../../arc58/account/types'
import { policyRecordKey, readMetaRecord } from '../../meta/functions'
import { errGrantContext, errPolicyMissing, errPolicyStale } from '../errors'
import { getRekeyIndex, getSpendingAccount } from '../functions'

/** Bytes in front of every policy body: the install epoch (`PluginInfo.start`) of the grant it configures. */
export const GrantPolicyHeaderBytes: uint64 = 8

/** The grant a plugin call is running under, and the epoch the wallet installed it at. */
export type GrantContext = { key: PluginKey; start: uint64 }

/**
 * `PluginInfo.start` of `plugin`'s grant for `(caller, escrow)` on `wallet`, or 0 if there is no such
 * grant. Read straight from the wallet's plugin box, so the call needs that box reference.
 */
export function grantStart(wallet: Application, plugin: uint64, caller: Account, escrow: string): uint64 {
  const name = Bytes(AbstractAccountBoxPrefixPlugins).concat(encodeArc4<PluginKey>({ plugin, caller, escrow }))
  const [info, exists] = op.AppBox.get(wallet, name)
  if (!exists) return 0
  return decodeArc4<PluginInfo>(info).start
}

/** The account that owns a wallet's grant policies in Meta: its controlled address. */
export function policyOwner(wallet: Application): Account {
  const [controlled] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysControlledAddress))
  return Account(controlled)
}

/**
 * Base for ARC-58 plugins whose behavior is configured per grant. Plugins built on it only read
 * their policies; the MetaPlugin registered as Meta's policy writer is the only app that writes them.
 *
 * Responsibilities stay split the same way for every such plugin:
 * - The wallet owns budget. Allowances and escrow balances cap what any grant can spend, and a
 *   policy never widens that.
 * - The plugin owns meaning. A policy only narrows what this plugin's code does with the account it
 *   is rekeyed to (which recipients, which assets, which metadata keys).
 *
 * A policy is a Meta record owned by the wallet's controlled address, keyed by `policyRecordKey`
 * for `(this plugin, caller, escrow)`. Meta accepts writes to those keys only from the registered
 * writer inside an admin window on that wallet. A delegated grant without a policy is denied.
 *
 * Every policy starts with the `start` epoch of the grant it was written for. The wallet stamps
 * `start` when a grant is installed, so removing and reinstalling a grant makes its old policy stale.
 * A stale policy is refused until an admin configures the grant again.
 *
 * A plugin built on this exposes a readonly `validatePolicy(byte[])void` that the writer calls before
 * every write, so a malformed policy is refused when it is written rather than when it is used.
 */
export abstract class GrantPolicyPlugin extends Contract {
  /** The Meta registry that stores grant policies. */
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
    const start = grantStart(wallet, key.plugin, key.caller, key.escrow)
    loggedAssert(start !== 0, errGrantContext)
    return { key, start }
  }

  /** True when the running grant is an admin execution: caller is the wallet itself, on no escrow. */
  protected isAdminGrant(wallet: Application, grant: GrantContext): boolean {
    return grant.key.caller === wallet.address && grant.key.escrow === ''
  }

  /**
   * The policy body for the running grant. Fails if there is none, or if it was written for an
   * earlier install of the grant.
   */
  protected policy(wallet: Application, grant: GrantContext): bytes {
    const record = readMetaRecord(
      this.registry.value,
      policyOwner(wallet),
      policyRecordKey(grant.key.plugin, grant.key.caller, grant.key.escrow),
    )
    loggedAssert(record.exists && record.data.length >= GrantPolicyHeaderBytes, errPolicyMissing)
    loggedAssert(op.extractUint64(record.data, 0) === grant.start, errPolicyStale)
    return record.data.slice(GrantPolicyHeaderBytes)
  }
}
