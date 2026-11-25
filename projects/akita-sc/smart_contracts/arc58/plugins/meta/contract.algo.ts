import {
  Account,
  BigUint,
  Application,
  contract,
  Bytes,
  bytes,
  clone,
  ensureBudget,
  itxn,
  loggedAssert,
  op,
  OpUpFeeSource,
  arc4,
  Contract,
  Global,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import type { Meta } from '../../../meta/contract.algo'
import { MaxAppCallArgumentBytes, PluginRecordArgumentBytes, MaxRecordKeyBytes } from '../../../meta/constants'
import { SchemaList } from '../../../meta/types'
import { getSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions"
import {
  errRecordNamesTooLong,
  errInvalidNamespace,
  errInvalidKey,
  errRecordValueTooLarge,
  errInvalidRegistry,
  errKeysRequireNamespace,
  errScopeTooLarge,
  errDuplicateScopeKey,
  errNamespaceScope,
  errKeyScope,
  errRootScope,
  errTypeScope,
} from '../../../meta/errors'

import { grantStart, GrantPolicyPlugin } from '../../../utils/base-contracts/grant-policy'
import { policyRecordKey } from '../../../meta/functions'
import { errScopeAdmin, errScopeEncoding, errScopeGrantMissing } from './errors'

/** The readonly method every GrantPolicyPlugin exposes for its policy writer. */
abstract class GrantPolicyValidator extends Contract {
  @abimethod({ readonly: true })
  validatePolicy(_body: bytes): void {}
}

type Scope = { namespace: string; keys: string[] }
const MaxScopeNameBytes: uint64 = 31

/** Reusable adapter. Each wallet's delegated grant has a plugin-owned policy in Meta (see GrantPolicyPlugin). */
@contract({ avmVersion: 13 })
export class MetaPlugin extends GrantPolicyPlugin {

  public approvalProgram(): boolean {
    // Fund decoding and validating the largest supported scope before dispatch.
    if (Txn.applicationId.id !== 0) {
      const selector = Txn.numAppArgs > 0 ? Txn.applicationArgs(0) : Bytes('')
      const body = selector === methodSelector<typeof MetaPlugin.prototype.validatePolicy>() && Txn.numAppArgs === 2
        ? Txn.applicationArgs(1)
        : selector === methodSelector<typeof MetaPlugin.prototype.configurePolicy>() && Txn.numAppArgs === 8
          ? Txn.applicationArgs(6)
          : Bytes('')
      if (body.length > 48) ensureBudget(1800, OpUpFeeSource.GroupCredit)
    }
    return super.approvalProgram()
  }

  @abimethod({ onCreate: 'require' })
  public create(registry: Application): void {
    loggedAssert(registry.id > 0, errInvalidRegistry)
    this.registry.value = registry
  }

  private scope(wallet: Application): Scope {
    const grant = this.grant(wallet)
    if (this.isAdminGrant(wallet, grant)) return { namespace: '', keys: [] }
    return decodeArc4<Scope>(this.policy(wallet, grant))
  }

  private validateScope(namespace: string, keys: string[]): void {
    loggedAssert(Bytes(namespace).length <= MaxScopeNameBytes, errInvalidNamespace)
    loggedAssert(keys.length === 0 || namespace !== '', errKeysRequireNamespace)
    loggedAssert(encodeArc4(keys).length <= 124, errScopeTooLarge)
    let previous = Bytes('')
    for (const key of clone(keys)) {
      ensureBudget(300, OpUpFeeSource.GroupCredit)
      const current = Bytes(key)
      loggedAssert(current.length > 0 && current.length <= MaxScopeNameBytes, errInvalidKey)
      // Canonical byte-length/byte order makes uniqueness validation linear.
      loggedAssert(current.length > previous.length ||
        (current.length === previous.length && BigUint(current) > BigUint(previous)), errDuplicateScopeKey)
      previous = current
    }
    ensureBudget(1400, OpUpFeeSource.GroupCredit)
  }

  /** Policy body format for MetaPlugin grants: an ARC-4 `(string,string[])` scope, canonically encoded. */
  @abimethod({ readonly: true })
  public validatePolicy(body: bytes): void {
    const scope = decodeArc4<Scope>(body)
    loggedAssert(encodeArc4(scope) === body, errScopeEncoding)
    this.validateScope(scope.namespace, scope.keys)
  }

  // POLICY WRITER METHODS (only on the MetaPlugin registered as Meta's policy writer) -------------

  private requireAdmin(wallet: Application): void {
    const grant = this.grant(wallet)
    loggedAssert(this.isAdminWindow(wallet, grant), errScopeAdmin)
  }

  /**
   * Create or replace the policy of `plugin`'s grant `(caller, escrow)` on `wallet`. Only an
   * admin-approved execution of this plugin can do it (see isAdminApproved), and Meta accepts it only from its registered policy writer.
   * The grant must be installed: its current `start` is written in front of `body`, so the policy
   * lapses if the grant is removed and installed again. `plugin` checks `body` first through its
   * `validatePolicy`. Install a grant and call this in the same group to leave no unconfigured gap.
   */
  public configurePolicy(
    wallet: Application, rekeyBack: boolean, plugin: uint64, caller: Account, escrow: string,
    body: bytes, expectedRevision: uint64,
  ): uint64 {
    this.requireAdmin(wallet)
    const start = grantStart(wallet, plugin, caller, escrow)
    loggedAssert(start !== 0, errScopeGrantMissing)
    if (plugin === Global.currentApplicationId.id) {
      this.validatePolicy(body)
    } else {
      abiCall<typeof GrantPolicyValidator.prototype.validatePolicy>({ appId: plugin, args: [body], fee: 0 })
    }

    const key = policyRecordKey(plugin, caller, escrow)
    const data = op.itob(start).concat(body)
    const sender = getSpendingAccount(wallet)
    const cost = abiCall<typeof Meta.prototype.recordCost>({
      appId: this.registry.value,
      args: [sender, key, data.length],
      fee: 0,
    }).returnValue
    return abiCall<typeof Meta.prototype.setPolicy>({
      sender,
      appId: this.registry.value,
      args: [itxn.payment({ sender, receiver: this.registry.value.address, amount: cost, fee: 0 }), wallet, key, data, expectedRevision],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
      fee: 0,
    }).returnValue
  }

  /**
   * Remove the policy of `plugin`'s grant `(caller, escrow)` on `wallet`, which disables that grant
   * until an admin configures it again. Admin only. The grant need not exist any more, so a removed
   * grant's policy can always be cleaned up; Meta refunds its storage to whoever paid for it.
   */
  public clearPolicy(
    wallet: Application, rekeyBack: boolean, plugin: uint64, caller: Account, escrow: string, expectedRevision: uint64,
  ): void {
    this.requireAdmin(wallet)
    abiCall<typeof Meta.prototype.removePolicy>({
      sender: getSpendingAccount(wallet),
      appId: this.registry.value,
      args: [wallet, policyRecordKey(plugin, caller, escrow), expectedRevision],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
      fee: 0,
    })
  }

  /**
   * Point Meta at a new policy writer. Meta accepts it only from the DAO wallet, so this is the DAO's
   * route after launch: an ExecutePlugin proposal through its execution-key grant of this plugin.
   */
  public setPolicyWriter(wallet: Application, rekeyBack: boolean, writer: Application): void {
    this.requireAdmin(wallet)
    abiCall<typeof Meta.prototype.setPolicyWriter>({
      sender: getSpendingAccount(wallet),
      appId: this.registry.value,
      args: [writer],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
      fee: 0,
    })
  }

  private requireScope(wallet: Application, namespace: string, key: string): void {
    const scope = this.scope(wallet)
    loggedAssert(scope.namespace === '' || namespace === scope.namespace, errNamespaceScope)
    if (scope.keys.length === 0) return
    const field = Bytes(key)
    let lower: uint64 = 0
    let upper: uint64 = scope.keys.length
    // Configuration stores unique keys in byte-length/byte order. Search in at
    // most five comparisons for 24 keys, for each write.
    while (lower < upper) {
      ensureBudget(300, OpUpFeeSource.GroupCredit)
      const middle: uint64 = lower + (upper - lower) / 2
      const candidate = Bytes(scope.keys[middle])
      if (candidate === field) return
      if (candidate.length < field.length ||
          (candidate.length === field.length && BigUint(candidate) < BigUint(field))) lower = middle + 1
      else upper = middle
    }
    loggedAssert(false, errKeyScope)
  }

  /** The namespace is an adapter convention; Meta sees one opaque record key. */
  private recordKey(namespace: string, key: string): bytes {
    loggedAssert(namespace !== '' && Bytes(namespace).length <= MaxScopeNameBytes, errInvalidNamespace)
    loggedAssert(key !== '' && Bytes(key).length <= MaxScopeNameBytes, errInvalidKey)
    loggedAssert(Bytes(namespace).length + Bytes(key).length < MaxRecordKeyBytes, errRecordNamesTooLong)
    return new arc4.Uint8(Bytes(namespace).length).bytes.concat(Bytes(namespace)).concat(Bytes(key))
  }

  public set(
    wallet: Application,
    rekeyBack: boolean,
    namespace: string,
    key: string,
    data0: bytes,
    data1: bytes,
    data2: bytes,
    data3: bytes,
    expectedRevision: uint64,
  ): uint64 {
    const size: uint64 = data0.length + data1.length + data2.length + data3.length
    loggedAssert(size + PluginRecordArgumentBytes + Bytes(namespace).length + Bytes(key).length <= MaxAppCallArgumentBytes, errRecordValueTooLarge)
    this.requireScope(wallet, namespace, key)
    const sender = getSpendingAccount(wallet)
    const cost = abiCall<typeof Meta.prototype.recordCost>({
      sender,
      appId: this.registry.value,
      args: [sender, this.recordKey(namespace, key), size],
    }).returnValue
    return abiCall<typeof Meta.prototype.setRecord>({
      sender,
      appId: this.registry.value,
      args: [
        itxn.payment({ sender, receiver: this.registry.value.address, amount: cost, fee: 0 }),
        this.recordKey(namespace, key),
        data0, data1, data2, data3,
        expectedRevision,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  public remove(
    wallet: Application,
    rekeyBack: boolean,
    namespace: string,
    key: string,
    expectedRevision: uint64,
  ): uint64 {
    this.requireScope(wallet, namespace, key)
    const sender = getSpendingAccount(wallet)
    return abiCall<typeof Meta.prototype.removeRecord>({
      sender,
      appId: this.registry.value,
      args: [this.recordKey(namespace, key), expectedRevision],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  private requireRootScope(wallet: Application, namespace: string): void {
    loggedAssert(namespace !== '', errInvalidNamespace)
    const scope = this.scope(wallet)
    loggedAssert(scope.namespace === '' || scope.namespace === namespace, errNamespaceScope)
    // A root affects a whole namespace. A grant to selected metadata keys cannot change it.
    loggedAssert(scope.keys.length === 0, errRootScope)
  }

  public addRoot(wallet: Application, rekeyBack: boolean, namespace: string, root: bytes<32>, type: uint64): void {
    this.requireRootScope(wallet, namespace)
    const sender = getSpendingAccount(wallet)
    const cost = abiCall<typeof Meta.prototype.rootCosts>({ appId: this.registry.value, args: [namespace] }).returnValue
    abiCall<typeof Meta.prototype.addRoot>({
      sender,
      appId: this.registry.value,
      args: [
        itxn.payment({ sender, receiver: this.registry.value.address, amount: cost, fee: 0 }),
        namespace,
        root,
        type,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  public updateRoot(wallet: Application, rekeyBack: boolean, namespace: string, root: bytes<32>): void {
    this.requireRootScope(wallet, namespace)
    abiCall<typeof Meta.prototype.updateRoot>({
      sender: getSpendingAccount(wallet),
      appId: this.registry.value,
      args: [namespace, root],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  public deleteRoot(wallet: Application, rekeyBack: boolean, namespace: string): void {
    this.requireRootScope(wallet, namespace)
    abiCall<typeof Meta.prototype.deleteRoot>({
      sender: getSpendingAccount(wallet),
      appId: this.registry.value,
      args: [namespace],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  public addData(wallet: Application, rekeyBack: boolean, namespace: string, key: string, value: string): void {
    this.requireScope(wallet, namespace, key)
    const sender = getSpendingAccount(wallet)
    const cost = abiCall<typeof Meta.prototype.dataCosts>({
      appId: this.registry.value,
      args: [namespace, key, value],
    }).returnValue
    abiCall<typeof Meta.prototype.addData>({
      sender,
      appId: this.registry.value,
      args: [
        itxn.payment({ sender, receiver: this.registry.value.address, amount: cost, fee: 0 }),
        namespace,
        key,
        value,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  public deleteData(wallet: Application, rekeyBack: boolean, namespace: string, key: string): void {
    this.requireScope(wallet, namespace, key)
    abiCall<typeof Meta.prototype.deleteData>({
      sender: getSpendingAccount(wallet),
      appId: this.registry.value,
      args: [namespace, key],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  public addType(wallet: Application, rekeyBack: boolean, description: string, schemaList: SchemaList): void {
    // Type registration is registry-wide, has no namespace to constrain and costs a 100 ALGO fee that
    // is not refundable: only an admin-approved execution may spend it.
    const grant = this.grant(wallet)
    loggedAssert(this.isAdminWindow(wallet, grant), errTypeScope)
    const sender = getSpendingAccount(wallet)
    abiCall<typeof Meta.prototype.addType>({
      sender,
      appId: this.registry.value,
      args: [
        itxn.payment({ sender, receiver: this.registry.value.address, amount: 100_000_000, fee: 0 }),
        description,
        schemaList,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }
}
