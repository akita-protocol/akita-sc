import {
  Account,
  Application,
  Asset,
  bytes,
  Bytes,
  Contract,
  contract,
  emit,
  Global,
  GlobalState,
  gtxn,
  itxn,
  log,
  loggedAssert,
  loggedErr,
  op,
  TransactionType,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, methodSelector, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi, extractUint16, getByte, itob, sha256 } from '@algorandfoundation/algorand-typescript/op'
import type { Meta } from '../meta/contract.algo'
import {
  Arc20GetAssetConfig,
  Arc20ManagerOffset,
  Arc4ReturnPrefix,
  AssetNameLength,
  Base64UrlAlphabet,
  DelegateAdmit,
  DepositLogPrefix,
  FlagHolderScope,
  FlagLocked,
  FormatV1,
  GlobalStateKeyMetaApp,
  GlobalStateKeyMetaTreeType,
  GlobalStateKeyRevision,
  GRevision,
  GSet,
  HolderSectionPrefix,
  IfAbsent,
  IfAny,
  KindImage,
  KindRenderBundle,
  MainCreatorLocked,
  MaxAllowWriters,
  MaxFlatBytes,
  MaxProofLevels,
  MaxSlotBytes,
  MaxValueBytes,
  MbrNegative,
  MbrNull,
  MbrPositive,
  MCreatorDeposit,
  MCreatorLen,
  MDecimals,
  MetaNameHashBytes,
  MetaTagCollectible,
  MetaTagGrant,
  MetaTagHolder,
  MFlags,
  MHolderDeposit,
  MHolderLen,
  MRevision,
  MSections,
  NameSlot,
  NameWriter,
  PFlags,
  PinFlat,
  PinSourceKind,
  PinSourceRevision,
  PinSourceSlot,
  PinSourceSlotLen,
  PinSourceSub,
  PlainAsa,
  PolicyHolderPinsCollectibleOnly,
  PolicyLocked,
  PolicyManagerWrites,
  PrefixAssetPolicy,
  PrefixGrant,
  PrefixMain,
  PrefixManagerPolicy,
  PrefixVariation,
  PRevision,
  PSets,
  RemovedByAssetCreator,
  RemovedByCreator,
  RemovedByHolder,
  RemovedByWriter,
  RemovedNone,
  RemovedPurged,
  RemovedVoid,
  RoleCreator,
  RoleHolder,
  RoleNone,
  VDecimals,
  VFlags,
  VFlatCollectible,
  VFlatHolder,
  VFlatLen,
  VHolder,
  VKind,
  VRevision,
  VSub,
  WriterSetAllow,
  WriterSetDelegate,
  WriterSetMeta,
  WriterSetOpen,
} from './constants'
import {
  errAssetExists,
  errAssetMissing,
  errBadArgument,
  errBadPurge,
  errBadSmartAsa,
  errDepositMismatch,
  errLocked,
  errNotAuthorized,
  errNotCreator,
  errNotHolder,
  errNotSingleUnit,
  errPreconditionFailed,
  errSourceChanged,
  errSourceMissing,
  errSourceNotAllowed,
  errTooLarge,
} from './errors'
import {
  GrantChanged,
  MainChanged,
  MainView,
  MbrDelta,
  PolicyChanged,
  RemoveResult,
  VariationDeleted,
  VariationWritten,
  WriteResult,
} from './types'

/** Facts about an asset from asset_params_get. Never crosses the ABI. */
type AssetFacts = {
  exists: boolean
  creator: Account
  manager: Account
  clawback: Account
  total: uint64
  decimals: uint64
}

/** The policy that applies to an asset: its value and the name of the box it came from (empty for the default). */
type Policy = {
  value: bytes
  name: bytes
}

/** Algo that crossed to or from Meta during a call, settled together with the registry's own MBR change. */
type MetaFlow = {
  paid: uint64
  refunded: uint64
}

/**
 * Collectible Variations registry. A singleton that can never be updated or deleted: no method
 * accepts UpdateApplication or DeleteApplication.
 *
 * Invariants, each enforced in one place:
 *  I1  Every box deposit has one owner who gets its refund (`refund` sends every Algo out). The
 *      owner is a role, not the payer: the sender of the write (a separate payer is never
 *      refunded); for a `p` box and the creator section of `m`, whoever is creator when it is
 *      removed (the purger after destroy, the AssetCreator under I12); the `m` base goes to the
 *      section cleared last. A refund to a closed account below the minimum balance goes to the
 *      sender instead.
 *  I2  Deposits are measured from the registry's own minimum balance, never computed from a rate
 *      (`settle`). A positive deposit is a payment to the registry immediately before the call; a
 *      zero deposit allows no such payment.
 *  I3  A locked entry cannot be changed by its writer. The creator can still evict a locked
 *      collectible-scope entry while the effective policy is unlocked.
 *  I5  The writer in a `v` name is always the sender of the write.
 *  I6  Holder pins exist only for single-unit assets (total == 10^decimals).
 *  I7  Revisions come from one global counter, never 0, never repeating (`nextRevision`).
 *  I8  A write whose bytes equal the stored bytes is a no-op, decided before the lock check.
 *  I9  The creator is `resolveCreator` and nothing else.
 *  I10 The `m` box exists while it has a section; its two recorded deposits sum to its MBR.
 *  I11 After an asset is destroyed, only `purge` touches its boxes.
 *  I12 With no creator, the original AssetCreator may delete unlocked creator-side boxes.
 *  I13 Admission: local rules, then meta sets, then delegates (`admitsCollectible`, `admitsHolder`).
 *  I14 The registry is the only owner of every Meta root it checks (`syncMetaRoot`).
 *
 * Pins are snapshots: a pin keeps its copy of the source's flat image after the source changes or
 * is evicted, and policy flags are not retroactive (holderPinsCollectibleOnly does not void an
 * existing holder pin). The creator cannot clear a holder pin. Clients that care compare the
 * PinCore source with the live variation.
 *
 * Meta dependency: changing or leaving a `meta` writer set, deleting such a policy or grant, and
 * purging a `p` box call Meta's addRoot, updateRoot, deleteRoot, rootCosts and verify. Meta is
 * DAO-upgradable while this app is not, so those five methods must keep their ABI and behaviour;
 * the registry's LocalNet suite is the guard.
 *
 * Size: a variation value is at most MaxValueBytes (4096) including its header, and the whole
 * value is sent in one call.
 */
@contract({ avmVersion: 13 })
export class CollectibleVariations extends Contract {
  revision = GlobalState<uint64>({ key: GlobalStateKeyRevision, initialValue: 0 })
  /** The Meta app that stores and verifies `meta` writer-set roots. Fixed at create. */
  metaApp = GlobalState<uint64>({ key: GlobalStateKeyMetaApp })
  /** The "collectible writer list" Meta tree type every `meta` root uses. Fixed at create. */
  metaTreeType = GlobalState<uint64>({ key: GlobalStateKeyMetaTreeType })

  // LIFECYCLE ------------------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(metaApp: uint64, metaTreeType: uint64): void {
    // Meta treats type 0 as "any type", which would let a writer list be any root.
    loggedAssert(metaApp !== 0 && metaTreeType !== 0, errBadArgument)
    this.metaApp.value = metaApp
    this.metaTreeType.value = metaTreeType
    op.AppParamsSet.appForeignBoxReads(true)
  }

  // VARIATIONS -----------------------------------------------------------------------------------

  /**
   * Create or replace the sender's variation (asset, sender, slot). `holder` zero means
   * collectible scope, otherwise holder scope bound to `holder`. `proof` is used only by meta
   * writer sets.
   */
  @abimethod({ name: 'arcTBD_write_variation' })
  writeVariation(
    asset: uint64,
    controllingApp: uint64,
    slot: bytes,
    holder: Account,
    kind: Uint8,
    sub: Uint8,
    lock: boolean,
    flat: bytes,
    body: bytes,
    ifRevision: uint64,
    proof: bytes<32>[],
  ): WriteResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    const holderScope = holder !== Global.zeroAddress
    const header: uint64 = holderScope ? VFlatHolder : VFlatCollectible
    const needsFlat = kind.asUint64() === KindImage || kind.asUint64() === KindRenderBundle
    loggedAssert(
      kind.asUint64() !== 0 &&
        slot.length >= 1 &&
        slot.length <= MaxSlotBytes &&
        proof.length <= MaxProofLevels &&
        (!needsFlat || flat.length > 0),
      errBadArgument,
    )
    loggedAssert(flat.length <= MaxFlatBytes && header + flat.length + body.length <= MaxValueBytes, errTooLarge)

    let flags: uint64 = holderScope ? FlagHolderScope : 0
    if (lock) flags = flags | FlagLocked
    const name = this.variationName(asset, Txn.sender, slot)
    const [stored, exists] = op.Box.get(name)
    const storedRevision: uint64 = exists ? btoi(stored.slice(VRevision, VRevision + 8)) : 0

    // I8: the no-op is decided first, so a retry converges even under a lock.
    const candidate = this.variationValue(flags, kind, sub, storedRevision, holder, facts.decimals, flat, body)
    if (exists && candidate === stored) {
      this.expectNoPayment()
      return { revision: storedRevision, changed: false, mbr: { sign: new Uint8(MbrNull), amount: 0 } }
    }

    // I3: a locked entry changes only when it is holder-scoped and void.
    if (exists && (getByte(stored, VFlags) & FlagLocked) !== 0) {
      loggedAssert(
        (getByte(stored, VFlags) & FlagHolderScope) !== 0 &&
          !this.holds(this.storedHolder(stored), asset, getByte(stored, VDecimals)),
        errLocked,
      )
    }

    // I13
    if (holderScope) {
      loggedAssert(this.isUnitAsset(facts) && this.holds(holder, asset, facts.decimals), errNotHolder)
      loggedAssert(this.admitsHolder(asset, facts, slot, holder, proof), errNotAuthorized)
    } else {
      loggedAssert(this.admitsCollectible(asset, controllingApp, facts, slot, proof), errNotAuthorized)
    }

    loggedAssert(
      ifRevision === IfAny || (ifRevision === IfAbsent ? !exists : exists && storedRevision === ifRevision),
      errPreconditionFailed,
    )

    const revision = this.nextRevision()
    const value = this.variationValue(flags, kind, sub, revision, holder, facts.decimals, flat, body)
    const before = this.appMinBalance()
    this.putBox(name, value)
    const mbr = this.settle(before, { paid: 0, refunded: 0 }, Txn.sender)

    emit<VariationWritten>({
      asset,
      writer: Txn.sender,
      slot,
      revision,
      flags: new Uint8(flags),
      kind,
      round: Global.round,
      timestamp: Global.latestTimestamp,
    })
    return { revision, changed: true, mbr }
  }

  /**
   * Delete variation (asset, writer, slot) of an existing asset. The first authority that applies
   * is used and reported: writer (unlocked), void, holder, creator (unlocked policy).
   * The refund goes to the writer.
   */
  @abimethod({ name: 'arcTBD_delete_variation' })
  deleteVariation(asset: uint64, controllingApp: uint64, writer: Account, slot: bytes): RemoveResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    const name = this.variationName(asset, writer, slot)
    const [stored, exists] = op.Box.get(name)
    if (!exists) {
      this.expectNoPayment()
      return { removed: false, reason: new Uint8(RemovedNone), refund: 0 }
    }

    const flags = getByte(stored, VFlags)
    const locked = (flags & FlagLocked) !== 0
    const holderScope = (flags & FlagHolderScope) !== 0
    let reason: uint64 = RemovedNone
    if (Txn.sender === writer && !locked) {
      reason = RemovedByWriter
    } else if (holderScope) {
      const bound = this.storedHolder(stored)
      if (!this.holds(bound, asset, getByte(stored, VDecimals))) {
        reason = RemovedVoid
      } else if (Txn.sender === bound) {
        reason = RemovedByHolder
      }
    } else if ((getByte(this.effectivePolicy(asset, facts.manager).value, PFlags) & PolicyLocked) === 0) {
      const creator = this.resolveCreator(asset, controllingApp, facts)
      if (creator !== Global.zeroAddress && Txn.sender === creator) {
        reason = RemovedByCreator
      }
    }
    loggedAssert(reason !== RemovedNone, errNotAuthorized)

    const before = this.appMinBalance()
    op.Box.delete(name)
    const refund: uint64 = before - this.appMinBalance()
    this.expectNoPayment()
    this.refund(writer, refund)

    this.emitDeleted(asset, writer, slot, stored, reason)
    return { removed: true, reason: new Uint8(reason), refund }
  }

  // MAIN IMAGE -----------------------------------------------------------------------------------

  /** Pin a collectible-scope variation as the creator's main image. The pin is a snapshot of its flat image. */
  @abimethod({ name: 'arcTBD_pin_main_creator' })
  pinMainCreator(
    asset: uint64,
    controllingApp: uint64,
    writer: Account,
    slot: bytes,
    sourceRevision: uint64,
    lock: boolean,
  ): WriteResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    const creator = this.resolveCreator(asset, controllingApp, facts)
    loggedAssert(creator !== Global.zeroAddress && Txn.sender === creator, errNotCreator)

    const source = this.pinSource(asset, writer, slot, sourceRevision)
    loggedAssert((getByte(source, VFlags) & FlagHolderScope) === 0, errSourceNotAllowed)
    const section = this.pinCore(writer, slot, source).concat(this.sourceFlat(source))

    const [main, exists] = op.Box.get(this.mainName(asset))
    const storedFlags: uint64 = exists ? getByte(main, MFlags) : 0
    const flags: uint64 = lock ? storedFlags | MainCreatorLocked : storedFlags
    if (exists && flags === storedFlags && this.section(main, RoleCreator) === section) {
      this.expectNoPayment()
      return { revision: btoi(main.slice(MRevision, MRevision + 8)), changed: false, mbr: this.mbrNone() }
    }
    loggedAssert((storedFlags & MainCreatorLocked) === 0, errLocked)

    return this.writeSection(asset, RoleCreator, section, flags, facts.decimals, Txn.sender)
  }

  /** Pin a variation as the holder's main image. Only single-unit assets. The next transfer voids it. */
  @abimethod({ name: 'arcTBD_pin_main_holder' })
  pinMainHolder(asset: uint64, writer: Account, slot: bytes, sourceRevision: uint64): WriteResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    loggedAssert(this.isUnitAsset(facts) && facts.total === this.unit(facts.decimals), errNotSingleUnit)
    loggedAssert(this.holds(Txn.sender, asset, facts.decimals), errNotHolder)

    const source = this.pinSource(asset, writer, slot, sourceRevision)
    if ((getByte(source, VFlags) & FlagHolderScope) !== 0) {
      loggedAssert(this.storedHolder(source) === Txn.sender, errSourceNotAllowed)
      const flags = getByte(this.effectivePolicy(asset, facts.manager).value, PFlags)
      loggedAssert((flags & PolicyHolderPinsCollectibleOnly) === 0, errSourceNotAllowed)
    }
    const section = Txn.sender.bytes.concat(this.pinCore(writer, slot, source)).concat(this.sourceFlat(source))

    const [main, exists] = op.Box.get(this.mainName(asset))
    if (exists && this.section(main, RoleHolder) === section) {
      this.expectNoPayment()
      return { revision: btoi(main.slice(MRevision, MRevision + 8)), changed: false, mbr: this.mbrNone() }
    }
    const flags: uint64 = exists ? getByte(main, MFlags) : 0
    return this.writeSection(asset, RoleHolder, section, flags, facts.decimals, Txn.sender)
  }

  /** Clear the creator section. The resolved creator, or the AssetCreator when none resolves (I12). */
  @abimethod({ name: 'arcTBD_unpin_main_creator' })
  unpinMainCreator(asset: uint64, controllingApp: uint64): RemoveResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    const reason = this.creatorSideRemover(asset, controllingApp, facts)
    const [main, exists] = op.Box.get(this.mainName(asset))
    if (!exists || extractUint16(main, MCreatorLen) === 0) {
      this.expectNoPayment()
      return { removed: false, reason: new Uint8(RemovedNone), refund: 0 }
    }
    loggedAssert((getByte(main, MFlags) & MainCreatorLocked) === 0, errLocked)
    const refund = this.clearSection(asset, main, RoleCreator, Txn.sender)
    return { removed: true, reason: new Uint8(reason), refund }
  }

  /** Clear the holder section. Its holder, or anyone once it is void. Refunded to the holder in it. */
  @abimethod({ name: 'arcTBD_unpin_main_holder' })
  unpinMainHolder(asset: uint64): RemoveResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    const [main, exists] = op.Box.get(this.mainName(asset))
    if (!exists || extractUint16(main, MHolderLen) === 0) {
      this.expectNoPayment()
      return { removed: false, reason: new Uint8(RemovedNone), refund: 0 }
    }
    const pinned = Account(this.section(main, RoleHolder).slice(0, 32))
    let reason: uint64 = RemovedByHolder
    if (!this.holds(pinned, asset, getByte(main, MDecimals))) {
      reason = RemovedVoid
    } else {
      loggedAssert(Txn.sender === pinned, errNotAuthorized)
    }
    const refund = this.clearSection(asset, main, RoleHolder, pinned)
    return { removed: true, reason: new Uint8(reason), refund }
  }

  // CREATOR POLICY -------------------------------------------------------------------------------

  /** Set the policy of one asset. It overrides the manager policy. `lock` is one way. */
  @abimethod({ name: 'arcTBD_set_asset_policy' })
  setAssetPolicy(
    asset: uint64,
    controllingApp: uint64,
    collectible: bytes,
    holder: bytes,
    managerWrites: boolean,
    holderPinsCollectibleOnly: boolean,
    lock: boolean,
  ): WriteResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    const creator = this.resolveCreator(asset, controllingApp, facts)
    loggedAssert(creator !== Global.zeroAddress && Txn.sender === creator, errNotCreator)
    let flags = this.policyFlags(managerWrites, holderPinsCollectibleOnly)
    if (lock) flags = flags | PolicyLocked
    const result = this.setPolicy(PrefixAssetPolicy.concat(itob(asset)), collectible, holder, flags)
    if (result.changed) this.emitPolicy(asset, Global.zeroAddress, result.revision, flags, false)
    return result
  }

  /** Set the policy of every asset whose ASA manager field is the sender. It has no lock. */
  @abimethod({ name: 'arcTBD_set_manager_policy' })
  setManagerPolicy(
    collectible: bytes,
    holder: bytes,
    managerWrites: boolean,
    holderPinsCollectibleOnly: boolean,
  ): WriteResult {
    const flags = this.policyFlags(managerWrites, holderPinsCollectibleOnly)
    const result = this.setPolicy(PrefixManagerPolicy.concat(Txn.sender.bytes), collectible, holder, flags)
    if (result.changed) this.emitPolicy(0, Txn.sender, result.revision, flags, false)
    return result
  }

  /** Delete an unlocked asset policy. The resolved creator, or the AssetCreator when none resolves (I12). */
  @abimethod({ name: 'arcTBD_delete_asset_policy' })
  deleteAssetPolicy(asset: uint64, controllingApp: uint64): RemoveResult {
    const facts = this.assetFacts(asset)
    loggedAssert(facts.exists, errAssetMissing)
    const reason = this.creatorSideRemover(asset, controllingApp, facts)
    const result = this.deletePolicy(PrefixAssetPolicy.concat(itob(asset)), Txn.sender, reason, true)
    if (result.removed) this.emitPolicy(asset, Global.zeroAddress, 0, 0, true)
    return result
  }

  /** Delete the sender's manager policy. */
  @abimethod({ name: 'arcTBD_delete_manager_policy' })
  deleteManagerPolicy(): RemoveResult {
    const result = this.deletePolicy(PrefixManagerPolicy.concat(Txn.sender.bytes), Txn.sender, RemovedByCreator, true)
    if (result.removed) this.emitPolicy(0, Txn.sender, 0, 0, true)
    return result
  }

  // HOLDER GRANT ---------------------------------------------------------------------------------

  /** Writers the sender admits for holder-scope entries bound to the sender, on anything the sender holds. */
  @abimethod({ name: 'arcTBD_set_grant' })
  setGrant(writers: bytes): WriteResult {
    const name = PrefixGrant.concat(Txn.sender.bytes)
    const set = this.checkWriterSet(writers)
    const [stored, exists] = op.Box.get(name)
    if (exists && stored.slice(GSet) === set) {
      this.expectNoPayment()
      return { revision: btoi(stored.slice(GRevision, GRevision + 8)), changed: false, mbr: this.mbrNone() }
    }
    const before = this.appMinBalance()
    const flow = this.syncMetaRoot(MetaTagGrant, name, exists ? stored.slice(GSet) : Bytes.fromHex('00'), set)
    const revision = this.nextRevision()
    this.putBox(name, Bytes.fromHex('01').concat(itob(revision)).concat(set))
    const mbr = this.settle(before, flow, Txn.sender)
    emit<GrantChanged>({ holder: Txn.sender, revision, deleted: false, round: Global.round, timestamp: Global.latestTimestamp })
    return { revision, changed: true, mbr }
  }

  /** Delete the sender's grant. Entries it admitted stay; the holder removes them separately. */
  @abimethod({ name: 'arcTBD_delete_grant' })
  deleteGrant(): RemoveResult {
    const name = PrefixGrant.concat(Txn.sender.bytes)
    const [stored, exists] = op.Box.get(name)
    if (!exists) {
      this.expectNoPayment()
      return { removed: false, reason: new Uint8(RemovedNone), refund: 0 }
    }
    const before = this.appMinBalance()
    const flow = this.syncMetaRoot(MetaTagGrant, name, stored.slice(GSet), Bytes.fromHex('00'))
    op.Box.delete(name)
    const mbr = this.settle(before, flow, Txn.sender)
    emit<GrantChanged>({ holder: Txn.sender, revision: 0, deleted: true, round: Global.round, timestamp: Global.latestTimestamp })
    return { removed: true, reason: new Uint8(RemovedByHolder), refund: mbr.amount }
  }

  // CLEANUP AFTER DESTROY ------------------------------------------------------------------------

  /**
   * Delete one `v`, `m` or `p` box of a destroyed asset (I11). Anyone may call. `v` refunds the
   * writer in the name; `m` refunds the holder section's deposit to its holder and the rest to the
   * caller; `p` refunds the caller (no creator resolves after destroy, as in ARC-89).
   */
  @abimethod({ name: 'arcTBD_purge' })
  purge(name: bytes): RemoveResult {
    loggedAssert(name.length >= AssetNameLength, errBadPurge)
    const family = name.slice(0, 1)
    const asset = btoi(name.slice(1, 9))
    if (family === PrefixVariation) {
      loggedAssert(name.length > NameSlot && name.length <= NameSlot + MaxSlotBytes, errBadPurge)
    } else {
      loggedAssert((family === PrefixMain || family === PrefixAssetPolicy) && name.length === AssetNameLength, errBadPurge)
    }
    loggedAssert(!this.assetFacts(asset).exists, errAssetExists)
    this.expectNoPayment()

    const [stored, exists] = op.Box.get(name)
    if (!exists) {
      return { removed: false, reason: new Uint8(RemovedNone), refund: 0 }
    }

    const before = this.appMinBalance()
    let total: uint64 = 0
    if (family === PrefixVariation) {
      op.Box.delete(name)
      total = before - this.appMinBalance()
      const writer = Account(name.slice(NameWriter, NameSlot))
      this.refund(writer, total)
      this.emitDeleted(asset, writer, name.slice(NameSlot), stored, RemovedPurged)
    } else if (family === PrefixMain) {
      const holderDeposit = btoi(stored.slice(MHolderDeposit, MHolderDeposit + 8))
      op.Box.delete(name)
      total = before - this.appMinBalance()
      if (extractUint16(stored, MHolderLen) > 0) {
        this.refund(Account(this.section(stored, RoleHolder).slice(0, 32)), holderDeposit)
        this.refund(Txn.sender, total - holderDeposit)
      } else {
        this.refund(Txn.sender, total)
      }
      this.emitMain(asset, 0, RoleNone, true)
    } else {
      const flow = this.dropPolicyRoots(name, stored)
      op.Box.delete(name)
      total = before - this.appMinBalance() + flow.refunded
      this.refund(Txn.sender, total)
      this.emitPolicy(asset, Global.zeroAddress, 0, 0, true)
    }
    return { removed: true, reason: new Uint8(RemovedPurged), refund: total }
  }

  // READ ONLY ------------------------------------------------------------------------------------

  /**
   * The pin that applies: a valid holder pin, else the creator pin, else role 0. `pin` is the
   * section's PinCore followed by its flat image (the holder's address is dropped).
   */
  @abimethod({ name: 'arcTBD_get_main', readonly: true })
  getMain(asset: uint64): MainView {
    const [main, exists] = op.Box.get(this.mainName(asset))
    if (exists) {
      if (extractUint16(main, MHolderLen) > 0) {
        const holderSection = this.section(main, RoleHolder)
        if (this.holds(Account(holderSection.slice(0, 32)), asset, getByte(main, MDecimals))) {
          return { role: new Uint8(RoleHolder), pin: holderSection.slice(HolderSectionPrefix) }
        }
      }
      if (extractUint16(main, MCreatorLen) > 0) {
        return { role: new Uint8(RoleCreator), pin: this.section(main, RoleCreator) }
      }
    }
    return { role: new Uint8(RoleNone), pin: Bytes('') }
  }

  // PRIVATE: ASSETS AND CREATORS -----------------------------------------------------------------

  private assetFacts(asset: uint64): AssetFacts {
    const a = Asset(asset)
    const [total, exists] = op.AssetParams.assetTotal(a)
    if (!exists) {
      return {
        exists: false,
        creator: Global.zeroAddress,
        manager: Global.zeroAddress,
        clawback: Global.zeroAddress,
        total: 0,
        decimals: 0,
      }
    }
    const [decimals] = op.AssetParams.assetDecimals(a)
    const [manager] = op.AssetParams.assetManager(a)
    const [clawback] = op.AssetParams.assetClawback(a)
    const [creator] = op.AssetParams.assetCreator(a)
    return { exists: true, creator, manager, clawback, total, decimals }
  }

  private unit(decimals: uint64): uint64 {
    return 10 ** decimals
  }

  /** An asset with total < 10^decimals has no holder (I6). */
  private isUnitAsset(facts: AssetFacts): boolean {
    return facts.decimals <= 19 && facts.total >= this.unit(facts.decimals)
  }

  /** holding(account).amount >= 10^decimals. False when not opted in. */
  private holds(account: Account, asset: uint64, decimals: uint64): boolean {
    if (account === Global.zeroAddress || decimals > 19) return false
    const [amount, optedIn] = op.AssetHolding.assetBalance(account, Asset(asset))
    return optedIn && amount >= this.unit(decimals)
  }

  /**
   * The creator of an asset (I9). A plain ASA: its manager field. An ARC-20 Smart ASA: the app
   * must be the clawback and the manager, and the app's get_asset_config
   * names the creator (manager_addr). Never cached. Zero means the asset has no creator.
   */
  private resolveCreator(asset: uint64, controllingApp: uint64, facts: AssetFacts): Account {
    if (controllingApp === PlainAsa) return facts.manager
    const appAddress = Application(controllingApp).address
    loggedAssert(facts.clawback === appAddress, errBadSmartAsa)
    // ARC-20: the underlying ASA's manager is the app. Allowing zero here would give an asset two
    // creators, one through the app and none through the plain path (I9).
    loggedAssert(facts.manager === appAddress, errBadSmartAsa)
    const call = itxn
      .applicationCall({
        appId: controllingApp,
        appArgs: [methodSelector(Arc20GetAssetConfig), Bytes.fromHex('00')],
        assets: [Asset(asset)],
        fee: 0,
      })
      .submit()
    const result = call.lastLog
    loggedAssert(result.length >= Arc20ManagerOffset + 32 && result.slice(0, 4) === Arc4ReturnPrefix, errBadSmartAsa)
    return Account(result.slice(Arc20ManagerOffset, Arc20ManagerOffset + 32))
  }

  /** Who may delete unlocked creator-side boxes: the resolved creator, or the AssetCreator when none resolves (I12). */
  private creatorSideRemover(asset: uint64, controllingApp: uint64, facts: AssetFacts): uint64 {
    const creator = this.resolveCreator(asset, controllingApp, facts)
    if (creator !== Global.zeroAddress) {
      loggedAssert(Txn.sender === creator, errNotCreator)
      return RemovedByCreator
    }
    loggedAssert(Txn.sender === facts.creator, errNotCreator)
    return RemovedByAssetCreator
  }

  // PRIVATE: POLICY AND ADMISSION ----------------------------------------------------------------

  /** `p` if present, else `P` of the ASA manager field if present, else the default. */
  private effectivePolicy(asset: uint64, manager: Account): Policy {
    const assetName = PrefixAssetPolicy.concat(itob(asset))
    const [assetValue, assetExists] = op.Box.get(assetName)
    if (assetExists) return { value: assetValue, name: assetName }
    if (manager !== Global.zeroAddress) {
      const managerName = PrefixManagerPolicy.concat(manager.bytes)
      const [managerValue, managerExists] = op.Box.get(managerName)
      if (managerExists) return { value: managerValue, name: managerName }
    }
    // format, flags, revision 0, closed, closed
    return { value: Bytes.fromHex('0101').concat(itob(0)).concat(Bytes.fromHex('0000')), name: Bytes('') }
  }

  /** The two writer sets of a policy value: [collectible, holder]. */
  private policySets(value: bytes): [bytes, bytes] {
    const rest = value.slice(PSets)
    const first = rest.slice(0, this.writerSetLength(rest))
    return [first, rest.slice(first.length)]
  }

  private writerSetLength(set: bytes): uint64 {
    const mode = getByte(set, 0)
    if (mode === WriterSetAllow) return 2 + 32 * getByte(set, 1)
    if (mode === WriterSetDelegate) return 9
    if (mode === WriterSetMeta) return 33
    return 1
  }

  /** Open and allow sets answer locally. Meta and delegate sets are not local. */
  private admitsLocally(set: bytes, writer: Account): boolean {
    const mode = getByte(set, 0)
    if (mode === WriterSetOpen) return true
    if (mode === WriterSetAllow) {
      const n = getByte(set, 1)
      for (let i: uint64 = 0; i < n; i += 1) {
        if (set.slice(2 + 32 * i, 34 + 32 * i) === writer.bytes) return true
      }
    }
    return false
  }

  private admitsByMeta(set: bytes, tag: string, boxName: bytes, writer: Account, proof: bytes<32>[]): boolean {
    if (getByte(set, 0) !== WriterSetMeta || boxName.length === 0) return false
    return abiCall<typeof Meta.prototype.verify>({
      appId: this.metaApp.value,
      args: [Global.currentApplicationAddress, this.metaRootName(tag, boxName), sha256(sha256(writer.bytes)), proof, this.metaTreeType.value],
      fee: 0,
    }).returnValue
  }

  /** A delegate answers arcTBD_admit(asset, writer, slot, holder). It must return false rather than fail. */
  private admitsByDelegate(set: bytes, asset: uint64, writer: Account, slot: bytes, holder: Account): boolean {
    if (getByte(set, 0) !== WriterSetDelegate) return false
    const call = itxn
      .applicationCall({
        appId: btoi(set.slice(1, 9)),
        appArgs: [
          methodSelector(DelegateAdmit),
          itob(asset),
          writer.bytes,
          itob(slot.length).slice(6, 8).concat(slot),
          holder.bytes,
        ],
        fee: 0,
      })
      .submit()
    const result = call.lastLog
    return result.length === 5 && result.slice(0, 4) === Arc4ReturnPrefix && getByte(result, 4) === 0x80
  }

  /** I13 for collectible scope: the collectible set locally, managerWrites, the meta set, the delegate. */
  private admitsCollectible(asset: uint64, controllingApp: uint64, facts: AssetFacts, slot: bytes, proof: bytes<32>[]): boolean {
    const policy = this.effectivePolicy(asset, facts.manager)
    const [collectible] = this.policySets(policy.value)
    if (this.admitsLocally(collectible, Txn.sender)) return true
    if ((getByte(policy.value, PFlags) & PolicyManagerWrites) !== 0) {
      const creator = this.resolveCreator(asset, controllingApp, facts)
      if (creator !== Global.zeroAddress && creator === Txn.sender) return true
    }
    if (this.admitsByMeta(collectible, MetaTagCollectible, policy.name, Txn.sender, proof)) return true
    return this.admitsByDelegate(collectible, asset, Txn.sender, slot, Global.zeroAddress)
  }

  /** I13 for holder scope: the holder itself, the grant and the policy locally, then their meta sets, then their delegates. */
  private admitsHolder(asset: uint64, facts: AssetFacts, slot: bytes, holder: Account, proof: bytes<32>[]): boolean {
    if (Txn.sender === holder) return true
    const grantName = PrefixGrant.concat(holder.bytes)
    const [grantValue, grantExists] = op.Box.get(grantName)
    const grant = grantExists ? grantValue.slice(GSet) : Bytes.fromHex('00')
    const policy = this.effectivePolicy(asset, facts.manager)
    const [, holderSet] = this.policySets(policy.value)
    if (this.admitsLocally(grant, Txn.sender)) return true
    if (this.admitsLocally(holderSet, Txn.sender)) return true
    if (grantExists && this.admitsByMeta(grant, MetaTagGrant, grantName, Txn.sender, proof)) return true
    if (this.admitsByMeta(holderSet, MetaTagHolder, policy.name, Txn.sender, proof)) return true
    if (this.admitsByDelegate(grant, asset, Txn.sender, slot, holder)) return true
    return this.admitsByDelegate(holderSet, asset, Txn.sender, slot, holder)
  }

  private policyFlags(managerWrites: boolean, holderPinsCollectibleOnly: boolean): uint64 {
    let flags: uint64 = 0
    if (managerWrites) flags = flags | PolicyManagerWrites
    if (holderPinsCollectibleOnly) flags = flags | PolicyHolderPinsCollectibleOnly
    return flags
  }

  /** Write a `p` or `P` box: no-op check, lock check, Meta roots, write, settle. The owner is the sender. */
  private setPolicy(name: bytes, collectible: bytes, holder: bytes, flags: uint64): WriteResult {
    const sets = this.checkWriterSet(collectible).concat(this.checkWriterSet(holder))
    const [stored, exists] = op.Box.get(name)
    if (exists && getByte(stored, PFlags) === flags && stored.slice(PSets) === sets) {
      this.expectNoPayment()
      return { revision: btoi(stored.slice(PRevision, PRevision + 8)), changed: false, mbr: this.mbrNone() }
    }
    loggedAssert(!exists || (getByte(stored, PFlags) & PolicyLocked) === 0, errLocked)

    const before = this.appMinBalance()
    const old = exists ? this.policySets(stored) : ([Bytes.fromHex('00'), Bytes.fromHex('00')] as [bytes, bytes])
    const next = this.policySets(Bytes.fromHex('01').concat(Bytes.fromHex('00')).concat(itob(0)).concat(sets))
    const first = this.syncMetaRoot(MetaTagCollectible, name, old[0], next[0])
    const second = this.syncMetaRoot(MetaTagHolder, name, old[1], next[1])
    const revision = this.nextRevision()
    const value = Bytes.fromHex('01').concat(itob(flags).slice(7, 8)).concat(itob(revision)).concat(sets)
    this.putBox(name, value)
    const mbr = this.settle(before, { paid: first.paid + second.paid, refunded: first.refunded + second.refunded }, Txn.sender)
    return { revision, changed: true, mbr }
  }

  /** Delete a `p` or `P` box and its Meta roots, refunding `owner`. */
  private deletePolicy(name: bytes, owner: Account, reason: uint64, requireUnlocked: boolean): RemoveResult {
    const [stored, exists] = op.Box.get(name)
    if (!exists) {
      this.expectNoPayment()
      return { removed: false, reason: new Uint8(RemovedNone), refund: 0 }
    }
    if (requireUnlocked) loggedAssert((getByte(stored, PFlags) & PolicyLocked) === 0, errLocked)
    const before = this.appMinBalance()
    const flow = this.dropPolicyRoots(name, stored)
    op.Box.delete(name)
    const mbr = this.settle(before, flow, owner)
    return { removed: true, reason: new Uint8(reason), refund: mbr.amount }
  }

  private dropPolicyRoots(name: bytes, stored: bytes): MetaFlow {
    const [collectible, holder] = this.policySets(stored)
    const first = this.syncMetaRoot(MetaTagCollectible, name, collectible, Bytes.fromHex('00'))
    const second = this.syncMetaRoot(MetaTagHolder, name, holder, Bytes.fromHex('00'))
    return { paid: first.paid + second.paid, refunded: first.refunded + second.refunded }
  }

  /**
   * A writer set arrives in its stored encoding. It must be exactly one well-formed set:
   * 00, 01, 02 n(1..8) writers, 03 app(nonzero), 04 root(nonzero).
   */
  private checkWriterSet(set: bytes): bytes {
    loggedAssert(set.length >= 1, errBadArgument)
    const mode = getByte(set, 0)
    loggedAssert(mode <= WriterSetMeta, errBadArgument)
    if (mode === WriterSetAllow) {
      loggedAssert(set.length >= 2 && getByte(set, 1) >= 1 && getByte(set, 1) <= MaxAllowWriters, errBadArgument)
    }
    loggedAssert(set.length === this.writerSetLength(set), errBadArgument)
    if (mode === WriterSetDelegate) loggedAssert(btoi(set.slice(1, 9)) !== 0, errBadArgument)
    if (mode === WriterSetMeta) loggedAssert(set.slice(1, 33) !== op.bzero(32), errBadArgument)
    return set
  }

  // PRIVATE: META ROOTS --------------------------------------------------------------------------

  /** tag + base64url(sha256(boxName)[0..18)): 25 ASCII bytes. */
  private metaRootName(tag: string, boxName: bytes): string {
    const hash = sha256(boxName).slice(0, MetaNameHashBytes)
    let out = Bytes(tag)
    for (let i: uint64 = 0; i < MetaNameHashBytes; i += 3) {
      const n = btoi(hash.slice(i, i + 3))
      for (let shift: uint64 = 24; shift > 0; shift -= 6) {
        const index: uint64 = (n >> (shift - 6)) & 63
        out = out.concat(Base64UrlAlphabet.slice(index, index + 1))
      }
    }
    return String(out)
  }

  /**
   * Bring Meta in line with a writer set about to be stored (I14). Only the registry ever owns
   * these roots, so only the policy or grant that names a root can change it.
   */
  private syncMetaRoot(tag: string, boxName: bytes, before: bytes, after: bytes): MetaFlow {
    const wasMeta = getByte(before, 0) === WriterSetMeta
    const isMeta = getByte(after, 0) === WriterSetMeta
    if (!wasMeta && !isMeta) return { paid: 0, refunded: 0 }
    const name = this.metaRootName(tag, boxName)
    const meta = Application(this.metaApp.value)

    if (wasMeta && isMeta) {
      if (before !== after) {
        abiCall<typeof Meta.prototype.updateRoot>({
          appId: meta,
          args: [name, after.slice(1, 33).toFixed({ length: 32 })],
          fee: 0,
        })
      }
      return { paid: 0, refunded: 0 }
    }
    if (isMeta) {
      const cost = abiCall<typeof Meta.prototype.rootCosts>({ appId: meta, args: [name], fee: 0 }).returnValue
      abiCall<typeof Meta.prototype.addRoot>({
        appId: meta,
        args: [
          itxn.payment({ receiver: meta.address, amount: cost, fee: 0 }),
          name,
          after.slice(1, 33).toFixed({ length: 32 }),
          this.metaTreeType.value,
        ],
        fee: 0,
      })
      return { paid: cost, refunded: 0 }
    }
    const balanceBefore = Global.currentApplicationAddress.balance
    abiCall<typeof Meta.prototype.deleteRoot>({ appId: meta, args: [name], fee: 0 })
    return { paid: 0, refunded: Global.currentApplicationAddress.balance - balanceBefore }
  }

  // PRIVATE: MAIN BOX ----------------------------------------------------------------------------

  private pinSource(asset: uint64, writer: Account, slot: bytes, sourceRevision: uint64): bytes {
    const [source, exists] = op.Box.get(this.variationName(asset, writer, slot))
    loggedAssert(exists, errSourceMissing)
    loggedAssert(btoi(source.slice(VRevision, VRevision + 8)) === sourceRevision, errSourceChanged)
    loggedAssert(extractUint16(source, VFlatLen) > 0, errSourceNotAllowed)
    return source
  }

  private sourceFlat(source: bytes): bytes {
    const start: uint64 = (getByte(source, VFlags) & FlagHolderScope) !== 0 ? VFlatHolder : VFlatCollectible
    return source.slice(start, start + extractUint16(source, VFlatLen))
  }

  /** writer(32) slotLen(1) slot padded to 23 sourceRevision(8) kind(1) sub(1) */
  private pinCore(writer: Account, slot: bytes, source: bytes): bytes {
    return writer.bytes
      .concat(itob(slot.length).slice(7, 8))
      .concat(slot.concat(op.bzero(MaxSlotBytes - slot.length)))
      .concat(source.slice(VRevision, VRevision + 8))
      .concat(source.slice(VKind, VKind + 1))
      .concat(source.slice(VSub, VSub + 1))
  }

  private section(main: bytes, role: uint64): bytes {
    const creatorLen = extractUint16(main, MCreatorLen)
    if (role === RoleCreator) return main.slice(MSections, MSections + creatorLen)
    return main.slice(MSections + creatorLen, MSections + creatorLen + extractUint16(main, MHolderLen))
  }

  private mainValue(flags: uint64, decimals: uint64, revision: uint64, creator: bytes, holder: bytes, creatorDeposit: uint64, holderDeposit: uint64): bytes {
    return Bytes.fromHex('01')
      .concat(itob(flags).slice(7, 8))
      .concat(itob(decimals).slice(7, 8))
      .concat(itob(revision))
      .concat(itob(creator.length).slice(6, 8))
      .concat(itob(holder.length).slice(6, 8))
      .concat(itob(creatorDeposit))
      .concat(itob(holderDeposit))
      .concat(creator)
      .concat(holder)
  }

  /**
   * Write or replace one section of the `m` box (I10). The section's new deposit is its old deposit
   * plus the measured change. A holder section owned by another account is a replacement: that
   * account gets its whole stored deposit back and the sender pays the new deposit in full.
   */
  private writeSection(asset: uint64, role: uint64, section: bytes, flags: uint64, decimals: uint64, owner: Account): WriteResult {
    const name = this.mainName(asset)
    const [main, exists] = op.Box.get(name)
    let creatorSection = Bytes('')
    let holderSection = Bytes('')
    let creatorDeposit: uint64 = 0
    let holderDeposit: uint64 = 0
    if (exists) {
      creatorSection = this.section(main, RoleCreator)
      holderSection = this.section(main, RoleHolder)
      creatorDeposit = btoi(main.slice(MCreatorDeposit, MCreatorDeposit + 8))
      holderDeposit = btoi(main.slice(MHolderDeposit, MHolderDeposit + 8))
    }
    const stored: uint64 = role === RoleCreator ? creatorDeposit : holderDeposit
    let previousOwner = owner
    if (role === RoleHolder && holderSection.length > 0) previousOwner = Account(holderSection.slice(0, 32))
    if (role === RoleCreator) {
      creatorSection = section
    } else {
      holderSection = section
    }

    const revision = this.nextRevision()
    const before = this.appMinBalance()
    this.putBox(name, this.mainValue(flags, decimals, revision, creatorSection, holderSection, creatorDeposit, holderDeposit))
    const after = this.appMinBalance()
    const deposit: uint64 = stored + after - before
    op.Box.replace(name, role === RoleCreator ? MCreatorDeposit : MHolderDeposit, itob(deposit))

    let mbr: MbrDelta = this.mbrNone()
    if (previousOwner !== owner) {
      this.refund(previousOwner, stored)
      this.expectPayment(deposit)
      mbr = { sign: new Uint8(MbrPositive), amount: deposit }
    } else if (after > before) {
      this.expectPayment(after - before)
      mbr = { sign: new Uint8(MbrPositive), amount: after - before }
    } else {
      this.expectNoPayment()
      if (before > after) {
        this.refund(owner, before - after)
        mbr = { sign: new Uint8(MbrNegative), amount: before - after }
      }
    }
    this.emitMain(asset, revision, role, false)
    return { revision, changed: true, mbr }
  }

  /**
   * Clear one section (I10). If it was the last, delete the box and refund its whole deposit.
   * Otherwise shrink the box, refund the measured decrease, and give the other section the rest.
   */
  private clearSection(asset: uint64, main: bytes, role: uint64, owner: Account): uint64 {
    const name = this.mainName(asset)
    const otherRole: uint64 = role === RoleCreator ? RoleHolder : RoleCreator
    const other = this.section(main, otherRole)
    this.expectNoPayment()
    const before = this.appMinBalance()
    if (other.length === 0) {
      op.Box.delete(name)
      const refund: uint64 = before - this.appMinBalance()
      this.refund(owner, refund)
      this.emitMain(asset, 0, RoleNone, true)
      return refund
    }
    const total: uint64 =
      btoi(main.slice(MCreatorDeposit, MCreatorDeposit + 8)) + btoi(main.slice(MHolderDeposit, MHolderDeposit + 8))
    const revision = this.nextRevision()
    const flags: uint64 = role === RoleCreator ? 0 : getByte(main, MFlags)
    const value =
      role === RoleCreator
        ? this.mainValue(flags, getByte(main, MDecimals), revision, Bytes(''), other, 0, 0)
        : this.mainValue(flags, getByte(main, MDecimals), revision, other, Bytes(''), 0, 0)
    this.putBox(name, value)
    const refund: uint64 = before - this.appMinBalance()
    op.Box.replace(name, otherRole === RoleCreator ? MCreatorDeposit : MHolderDeposit, itob(total - refund))
    this.refund(owner, refund)
    this.emitMain(asset, revision, role, true)
    return refund
  }

  // PRIVATE: BYTES -------------------------------------------------------------------------------

  private variationName(asset: uint64, writer: Account, slot: bytes): bytes {
    return PrefixVariation.concat(itob(asset)).concat(writer.bytes).concat(slot)
  }

  private mainName(asset: uint64): bytes {
    return PrefixMain.concat(itob(asset))
  }

  private variationValue(
    flags: uint64,
    kind: Uint8,
    sub: Uint8,
    revision: uint64,
    holder: Account,
    decimals: uint64,
    flat: bytes,
    body: bytes,
  ): bytes {
    let value = Bytes.fromHex('01')
      .concat(itob(flags).slice(7, 8))
      .concat(kind.bytes)
      .concat(sub.bytes)
      .concat(itob(revision))
      .concat(itob(flat.length).slice(6, 8))
    if ((flags & FlagHolderScope) !== 0) {
      value = value.concat(holder.bytes).concat(itob(decimals).slice(7, 8))
    }
    return value.concat(flat).concat(body)
  }

  private storedHolder(value: bytes): Account {
    return Account(value.slice(VHolder, VHolder + 32))
  }

  /** Create or replace a box with a value of any size. */
  private putBox(name: bytes, value: bytes): void {
    const [length, exists] = op.Box.length(name)
    if (exists && length !== value.length) op.Box.delete(name)
    op.Box.put(name, value)
  }

  // PRIVATE: REVISIONS, DEPOSITS AND REFUNDS -----------------------------------------------------

  private nextRevision(): uint64 {
    this.revision.value = this.revision.value + 1
    return this.revision.value
  }

  private appMinBalance(): uint64 {
    return Global.currentApplicationAddress.minBalance
  }

  private mbrNone(): MbrDelta {
    return { sign: new Uint8(MbrNull), amount: 0 }
  }

  /**
   * Settle a call (I2): the registry's measured MBR change plus Algo paid to Meta, less Algo Meta
   * refunded. A positive net is a payment immediately before the call; a negative net is refunded
   * to `owner`; zero allows no payment.
   */
  private settle(before: uint64, flow: MetaFlow, owner: Account): MbrDelta {
    const after = this.appMinBalance()
    const inflow: uint64 = after + flow.paid
    const outflow: uint64 = before + flow.refunded
    if (inflow > outflow) {
      this.expectPayment(inflow - outflow)
      return { sign: new Uint8(MbrPositive), amount: inflow - outflow }
    }
    this.expectNoPayment()
    if (outflow > inflow) {
      this.refund(owner, outflow - inflow)
      return { sign: new Uint8(MbrNegative), amount: outflow - inflow }
    }
    return this.mbrNone()
  }

  /**
   * The transaction immediately before the call pays the registry exactly `amount`. On a mismatch
   * the required amount is logged (DepositLogPrefix || amount) before the call fails, so a client
   * learns the deposit by simulating the call once without it.
   */
  private expectPayment(amount: uint64): void {
    let ok = Txn.groupIndex > 0
    if (ok) {
      const index: uint64 = Txn.groupIndex - 1
      ok = gtxn.Transaction(index).type === TransactionType.Payment
      if (ok) {
        const payment = gtxn.PaymentTxn(index)
        ok =
          payment.receiver === Global.currentApplicationAddress &&
          payment.amount === amount &&
          payment.closeRemainderTo === Global.zeroAddress &&
          payment.rekeyTo === Global.zeroAddress
      }
    }
    if (!ok) {
      log(DepositLogPrefix.concat(itob(amount)))
      loggedErr(errDepositMismatch)
    }
  }

  private expectNoPayment(): void {
    if (Txn.groupIndex === 0) return
    const index: uint64 = Txn.groupIndex - 1
    if (gtxn.Transaction(index).type !== TransactionType.Payment) return
    loggedAssert(gtxn.PaymentTxn(index).receiver !== Global.currentApplicationAddress, errDepositMismatch)
  }

  /**
   * The one place Algo leaves the registry (I1). A closed account (balance 0) cannot receive less
   * than the minimum balance, so that refund goes to the caller and cleanup is never blocked.
   */
  private refund(to: Account, amount: uint64): void {
    if (amount === 0) return
    let receiver = to
    const [balance] = op.AcctParams.acctBalance(to)
    if (balance === 0 && amount < Global.minBalance) receiver = Txn.sender
    itxn.payment({ receiver, amount, fee: 0 }).submit()
  }

  // PRIVATE: EVENTS ------------------------------------------------------------------------------

  private emitDeleted(asset: uint64, writer: Account, slot: bytes, stored: bytes, reason: uint64): void {
    emit<VariationDeleted>({
      asset,
      writer,
      slot,
      lastRevision: btoi(stored.slice(VRevision, VRevision + 8)),
      reason: new Uint8(reason),
      round: Global.round,
      timestamp: Global.latestTimestamp,
    })
  }

  private emitMain(asset: uint64, revision: uint64, role: uint64, cleared: boolean): void {
    emit<MainChanged>({
      asset,
      revision,
      role: new Uint8(role),
      cleared,
      round: Global.round,
      timestamp: Global.latestTimestamp,
    })
  }

  private emitPolicy(asset: uint64, manager: Account, revision: uint64, flags: uint64, deleted: boolean): void {
    emit<PolicyChanged>({
      asset,
      manager,
      revision,
      flags: new Uint8(flags),
      deleted,
      round: Global.round,
      timestamp: Global.latestTimestamp,
    })
  }
}
