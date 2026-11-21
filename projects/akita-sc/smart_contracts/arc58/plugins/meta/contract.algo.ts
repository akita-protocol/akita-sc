import {
  Account,
  BigUint,
  Application,
  contract,
  Global,
  gtxn,
  Bytes,
  bytes,
  clone,
  Contract,
  ensureBudget,
  GlobalState,
  itxn,
  loggedAssert,
  op,
  OpUpFeeSource,
  arc4,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import type { Meta } from '../../../meta/contract.algo'
import { RecordHeaderBytes, MaxAppCallArgumentBytes, PluginRecordArgumentBytes, MaxRecordKeyBytes } from '../../../meta/constants'
import { SchemaList } from '../../../meta/types'
import { getSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions"
import { getRekeyIndex } from '../../../utils/functions'
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

import { AbstractAccountGlobalStateKeysCurrentPlugin } from '../../account/constants'
import { PluginKey } from '../../account/types'
import type { AbstractedAccount } from '../../account/contract.algo'
import { readMetaRecord, setMetaRecord, removeMetaRecord } from '../../../meta/functions'
import { errScopeMissing, errScopeAdmin, errWalletContext } from './errors'

type Scope = { namespace: string; keys: string[] }
const MaxScopeNameBytes: uint64 = 31

/** Reusable adapter. Each wallet's delegated grant has a plugin-owned policy in Meta. */
@contract({ avmVersion: 13 })
export class MetaPlugin extends Contract {
  public registry = GlobalState<Application>({ key: 'registry' })

  public approvalProgram(): boolean {
    // Fund ABI array validation before dispatch for the largest supported policy.
    if (Txn.applicationId.id !== 0 && Txn.numAppArgs === 8 &&
        Txn.applicationArgs(0) === methodSelector<typeof MetaPlugin.prototype.configureScope>()) {
      const keys = Txn.applicationArgs(6)
      if (keys.length >= 2 && keys.length <= 124 && op.extractUint16(keys, 0) > 8)
        ensureBudget(1800, OpUpFeeSource.GroupCredit)
    }
    return super.approvalProgram()
  }

  @abimethod({ onCreate: 'require' })
  public create(registry: Application): void {
    loggedAssert(registry.id > 0, errInvalidRegistry)
    this.registry.value = registry
  }

  private grant(wallet: Application): PluginKey {
    const index = getRekeyIndex(wallet)
    loggedAssert(index < Txn.groupIndex, errWalletContext)
    const rekey = gtxn.ApplicationCallTxn(index)
    loggedAssert(
      rekey.appId === wallet &&
      rekey.appArgs(0) === methodSelector<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>() &&
      op.btoi(rekey.appArgs(1)) === Global.currentApplicationId.id,
      errWalletContext,
    )
    const [value, exists] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysCurrentPlugin))
    loggedAssert(exists, errWalletContext)
    const grant = decodeArc4<PluginKey>(value)
    loggedAssert(grant.plugin === Global.currentApplicationId.id, errWalletContext)
    loggedAssert(getSpendingAccount(wallet).authAddress === Global.currentApplicationAddress, errWalletContext)
    // The wallet validates every plugin call's first argument against its own ID.
    return grant
  }

  private policyKey(wallet: Application, caller: Account, escrow: string): bytes {
    // A policy has a composite identity longer than a record key; only this adapter hashes it.
    return op.sha256(encodeArc4<[uint64, Account, string]>([wallet.id, caller, escrow])).slice(0, MaxRecordKeyBytes)
  }

  private scope(wallet: Application): Scope {
    const grant = this.grant(wallet)
    if (grant.caller === wallet.address) return { namespace: '', keys: [] }
    const policy = readMetaRecord(this.registry.value, Global.currentApplicationAddress, this.policyKey(wallet, grant.caller, grant.escrow))
    loggedAssert(policy.exists, errScopeMissing)
    return decodeArc4<Scope>(policy.data)
  }

  private requireAdmin(wallet: Application): void {
    const grant = this.grant(wallet)
    loggedAssert(grant.caller === wallet.address && grant.escrow === '', errScopeAdmin)
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

  /** Only an administrator execution can create or replace a delegated grant's policy. */
  public configureScope(
    wallet: Application, rekeyBack: boolean, caller: Account, escrow: string,
    namespace: string, keys: string[], expectedRevision: uint64,
  ): uint64 {
    this.requireAdmin(wallet)
    this.validateScope(namespace, keys)
    const key = this.policyKey(wallet, caller, escrow)
    const data = encodeArc4<Scope>({ namespace, keys: clone(keys) })
    const old = readMetaRecord(this.registry.value, Global.currentApplicationAddress, key)
    const cost = abiCall<typeof Meta.prototype.recordCost>({ appId: this.registry.value, args: [Global.currentApplicationAddress, key, data.length] }).returnValue
    const sender = getSpendingAccount(wallet)
    if (cost > 0) itxn.payment({ sender, receiver: Global.currentApplicationAddress, amount: cost, fee: 0 }).submit()
    const revision = setMetaRecord(this.registry.value, key, data, expectedRevision)
    const refund: uint64 = old.exists && old.data.length > data.length ? 400 * (old.data.length - data.length) : 0
    itxn.payment({ sender: Global.currentApplicationAddress, receiver: sender, amount: refund, fee: 0 }).submit()
    itxn.payment({ sender, receiver: sender, amount: 0, fee: 0, rekeyTo: rekeyAddress(rekeyBack, wallet) }).submit()
    return revision
  }

  /** Removing a policy disables the delegated grant until an administrator configures it again. */
  public clearScope(wallet: Application, rekeyBack: boolean, caller: Account, escrow: string, expectedRevision: uint64): void {
    this.requireAdmin(wallet)
    const key = this.policyKey(wallet, caller, escrow)
    const old = readMetaRecord(this.registry.value, Global.currentApplicationAddress, key)
    removeMetaRecord(this.registry.value, key, expectedRevision)
    const sender = getSpendingAccount(wallet)
    const refund: uint64 = 2500 + 400 * (33 + key.length + RecordHeaderBytes + old.data.length)
    itxn.payment({ receiver: sender, amount: refund, fee: 0 }).submit()
    itxn.payment({ sender, receiver: sender, amount: 0, fee: 0, rekeyTo: rekeyAddress(rekeyBack, wallet) }).submit()
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
    // Type registration is registry-wide and has no namespace to constrain.
    const scope = this.scope(wallet)
    loggedAssert(scope.namespace === '' && scope.keys.length === 0, errTypeScope)
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
