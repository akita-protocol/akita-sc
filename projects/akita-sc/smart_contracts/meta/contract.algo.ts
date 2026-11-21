import {
  Account,
  BigUint,
  BoxMap,
  bytes,
  Bytes,
  clone,
  contract,
  Application,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4, Uint16, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { itob, sha256, Txn } from '@algorandfoundation/algorand-typescript/op'
import { errEscrowDoesNotExist } from '../arc58/account/errors'
import {
  AbstractAccountGlobalStateKeysControlledAddress,
  AbstractAccountGlobalStateKeysCurrentPlugin,
  AbstractAccountGlobalStateKeysSpendingAddress,
} from '../arc58/account/constants'
import { PluginKey } from '../arc58/account/types'
import { errNotAkitaDao } from '../errors'
import { errInvalidPaymentAmount, errInvalidPaymentReceiver, errPayerOnly } from '../utils/errors'
import { canReceiveAlgo, payerOf, recordPayer, releaseDeposit, sponsorCost } from '../utils/functions'
import { AkitaBaseFeeGeneratorContractWithoutAkitaOptIn } from '../utils/base-contracts/base'
import { Leaf, Proof } from '../utils/types/merkles'
import {
  maxDataKeyLength,
  maxDataLength,
  MerkleTreeTypeUnspecified,
  MetaBoxPrefixRoots,
  MetaBoxPrefixTypes,
  MetaGlobalStateKeyTypeFees,
  MetaGlobalStateKeyTypesID,
  MetaTypeFee,
  reservedDataKeyPrefix,
  SchemaPartAddress,
  SchemaPartAddressString,
  SchemaPartBytes128,
  SchemaPartBytes128String,
  SchemaPartBytes16,
  SchemaPartBytes16String,
  SchemaPartBytes256,
  SchemaPartBytes256String,
  SchemaPartBytes32,
  SchemaPartBytes32String,
  SchemaPartBytes4,
  SchemaPartBytes4String,
  SchemaPartBytes512,
  SchemaPartBytes512String,
  SchemaPartBytes64,
  SchemaPartBytes64String,
  SchemaPartBytes8,
  SchemaPartBytes8String,
  SchemaPartString,
  SchemaPartStringString,
  SchemaPartUint128,
  SchemaPartUint128String,
  SchemaPartUint16,
  SchemaPartUint16String,
  SchemaPartUint256,
  SchemaPartUint256String,
  SchemaPartUint32,
  SchemaPartUint32String,
  SchemaPartUint512,
  SchemaPartUint512String,
  SchemaPartUint64,
  SchemaPartUint64String,
  SchemaPartUint8,
  SchemaPartUint8String,
  treeTypeKey,
  RecordPrefix,
  RecordHeaderBytes,
  MaxRecordKeyBytes,
  MaxAppCallArgumentBytes,
  RecordArgumentBytes,
  MaxFinalRecordPartBytes,
  MaxRecordPartBytes,
  MaxInlineRecordBytes,
  MaxRecordChunkBytes,
  MetaGlobalStateKeyPolicyWriter,
  PolicyRecordKeyPrefix,
} from './constants'
import {
  errDataTooLong,
  errFailedToVerifyInclusion,
  errKeyTooLong,
  errNameTaken,
  errNameTooLong,
  errNoData,
  errNoName,
  errNoRootForData,
  errNoTreeType,
  errReservedKeyPrefix,
  errInvalidName,
  errInvalidKey,
  errInvalidRecordPayment,
  errRecordNotFound,
  errRecordRevisionMismatch,
  errRecordRange,
  errRecordValueTooLarge,
  errRecordPartTooLarge,
  errRecordRequiresSlice,
  errInvalidSchemaPart,
  errPolicyKey,
  errNotPolicyKey,
  errPolicyWriter,
  errPolicyWindow,
} from './errors'
import {
  RootValue,
  SchemaList,
  TypesValue,
  MetaRecordRead,
  MetaRecordInfo,
  MetaRecordValue,
} from './types'

@contract({ avmVersion: 13 })
export class Meta extends AkitaBaseFeeGeneratorContractWithoutAkitaOptIn {
  // GLOBAL STATE ---------------------------------------------------------------------------------

  // 0: Unspecified
  // 1: Collection
  // 2: Trait
  // 3: Trade
  typesID = GlobalState<uint64>({ initialValue: 0, key: MetaGlobalStateKeyTypesID })
  /**
   * Type fees collected and not yet sent to the DAO's revenue escrow (AUD-C7). Each fee is counted
   * less the storage its type occupies, so this is never more than what the app can spare.
   */
  typeFees = GlobalState<uint64>({ initialValue: 0, key: MetaGlobalStateKeyTypeFees })
  /**
   * The one MetaPlugin allowed to write grant policies, set by the DAO wallet. Policies are owned by
   * each wallet's controlled address, so rotating the writer keeps them readable and editable.
   */
  policyWriter = GlobalState<Application>({ key: MetaGlobalStateKeyPolicyWriter })

  // BOXES ----------------------------------------------------------------------------------------

  /** the types (intents) of merkle trees that exist */
  types = BoxMap<uint64, TypesValue>({ keyPrefix: MetaBoxPrefixTypes })
  /** the merkle roots we want to attach data to */
  roots = BoxMap<bytes, RootValue>({ keyPrefix: MetaBoxPrefixRoots })
  /** One value store for arbitrary keys and Merkle-attached metadata. */
  records = BoxMap<bytes, MetaRecordValue>({ keyPrefix: RecordPrefix })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newTypesID(): uint64 {
    const id = this.typesID.value
    this.typesID.value += 1
    return id
  }

  private hash(a: Leaf, b: Leaf): Leaf {
    if (BigUint(a) > BigUint(b)) {
      return sha256(b.concat(a))
    }
    return sha256(a.concat(b))
  }

  /** The complete owner address is retained in every physical box name. */
  private recordKey(account: Account, key: bytes): bytes {
    loggedAssert(key.length > 0 && key.length <= MaxRecordKeyBytes, errInvalidKey)
    return account.bytes.concat(key)
  }

  /** One length byte keeps legacy (name,key) pairs unambiguous. */
  private dataKey(name: string, key: string): bytes {
    loggedAssert(Bytes(name).length + Bytes(key).length < MaxRecordKeyBytes, errKeyTooLong)
    return new Uint8(Bytes(name).length).bytes.concat(Bytes(name)).concat(Bytes(key))
  }

  private recordStorageCost(key: bytes, size: uint64): uint64 {
    return 2500 + 400 * (33 + key.length + RecordHeaderBytes + size)
  }

  // A root or record has one payer: whoever funded it first, the caller unless someone else did. That
  // account tops it up and gets every refund (see "SPONSORED STORAGE" in utils/functions.ts).

  /** Return part of a kept box's storage to whoever paid for it. */
  private refundRecord(box: bytes, amount: uint64): void {
    if (amount === 0) return
    const payer = payerOf(box, Txn.sender)
    // a payer whose account has closed gives way to the owner, so a write is never blocked
    itxn.payment({ receiver: canReceiveAlgo(payer, amount) ? payer : Txn.sender, amount, fee: 0 }).submit()
  }

  /** Return a deleted box's whole storage to whoever paid for it, and forget them. */
  private releaseRecord(box: bytes, amount: uint64): void {
    const [receiver, total] = releaseDeposit(box, Txn.sender, amount)
    if (total > 0) itxn.payment({ receiver, amount: total, fee: 0 }).submit()
  }

  private requireRecordPayment(payment: gtxn.PaymentTxn, amount: uint64): void {
    loggedAssert(
      payment.groupIndex + 1 === Txn.groupIndex &&
        payment.receiver === Global.currentApplicationAddress &&
        payment.amount === amount &&
        payment.closeRemainderTo === Global.zeroAddress &&
        payment.rekeyTo === Global.zeroAddress,
      errInvalidRecordPayment,
    )
  }

  private currentRecordRevision(id: bytes): uint64 {
    return this.records(id).exists ? this.records(id).value.revision : 0
  }

  private writeRecord(key: bytes, data: bytes): uint64 {
    const id = this.recordKey(Txn.sender, key)
    const revision: uint64 = this.currentRecordRevision(id) + 1
    this.records(id).value = { revision, data }
    return revision
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    op.AppParamsSet.appForeignBoxReads(true)
  }

  /** Read-only resource carrier for box access. */
  @abimethod({ readonly: true })
  override opUp(): void {}

  // META MERKLE METHODS --------------------------------------------------------------------------

  /**
   * Stores a Merkle root and its schema type together. Attached values
   * use the shared record store and may exist before or after the root.
   *
   * @param pmt the fee to cover box storage allocation
   * @param name the name alias of the root being added
   * @param root a merkle tree root
   * @param type an index of the tree type enum from box storage
   */
  addRoot(payment: gtxn.PaymentTxn, name: string, root: bytes<32>, type: uint64): void {
    loggedAssert(name !== '', errInvalidName)
    loggedAssert(Bytes(name).length <= MaxRecordKeyBytes, errNameTooLong)
    loggedAssert(this.types(type).exists, errNoTreeType)

    const rootKey = this.recordKey(Txn.sender, Bytes(name))
    loggedAssert(!this.roots(rootKey).exists, errNameTaken)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
    // a payer other than the caller funds the record that remembers them
    loggedAssert(payment.amount === this.rootCosts(name) + sponsorCost(payment.sender, Txn.sender), errInvalidPaymentAmount)
    this.roots(rootKey).value = { root, type }
    recordPayer(this.roots(rootKey).key, payment.sender, Txn.sender)
  }

  /**
   * Deletes the merkle root from the root box map
   *
   * @param name the name of the merkle tree root
   */
  deleteRoot(name: string): void {
    const rootKey = this.recordKey(Txn.sender, Bytes(name))
    loggedAssert(this.roots(rootKey).exists, errNoName)
    this.roots(rootKey).delete()
    this.releaseRecord(this.roots(rootKey).key, this.rootCosts(name))
  }

  /**
   * Replaces the merkle root with another
   *
   * @param name the name of the merkle group data
   * @param newRoot the new 32 byte merkle tree root
   */
  updateRoot(name: string, newRoot: bytes<32>): void {
    const key = this.recordKey(Txn.sender, Bytes(name))
    loggedAssert(this.roots(key).exists, errNoName)
    this.roots(key).value.root = newRoot
  }

  /**
   * Publishes a value in the shared record store for an existing Merkle root.
   *
   * @param pmt the payment to cover the increased mbr of adding to box storage
   * @param name the name of the merkle tree root
   * @param key the metadata key eg. `Royalty`
   * @param value the metadata value eg. `5` encoded as a bytestring for 5%
   */
  addData(payment: gtxn.PaymentTxn, name: string, key: string, value: string): void {
    loggedAssert(name !== '', errInvalidName)
    loggedAssert(key !== '', errInvalidKey)
    const rootKey = this.recordKey(Txn.sender, Bytes(name))

    const keyBytes = Bytes(key)
    loggedAssert(keyBytes.length <= maxDataKeyLength, errKeyTooLong)
    loggedAssert(Bytes(name).length + keyBytes.length < MaxRecordKeyBytes, errKeyTooLong)
    loggedAssert(Bytes(value).length <= maxDataLength, errDataTooLong)
    loggedAssert(
      keyBytes.length < 2 || !(keyBytes.slice(0, 2) === Bytes(reservedDataKeyPrefix)),
      errReservedKeyPrefix,
    )
    loggedAssert(this.roots(rootKey).exists, errNoRootForData)

    const recordKey = this.dataKey(name, key)
    // Keep the legacy full-deposit quote; return any replaced record's deposit to whoever paid it. This
    // payment funds the whole new record, so its sender becomes the record's payer.
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
    loggedAssert(
      payment.amount === this.recordStorageCost(recordKey, Bytes(value).length) + sponsorCost(payment.sender, Txn.sender),
      errInvalidPaymentAmount,
    )
    const id = this.recordKey(Txn.sender, recordKey)
    let previousPayer = Txn.sender
    let previousCost: uint64 = 0
    if (this.records(id).exists) {
      const [receiver, total] = releaseDeposit(
        this.records(id).key,
        Txn.sender,
        this.recordStorageCost(recordKey, this.records(id).length - RecordHeaderBytes),
      )
      previousPayer = receiver
      previousCost = total
    }
    this.writeRecord(recordKey, Bytes(value))
    recordPayer(this.records(id).key, payment.sender, Txn.sender)
    // paid out last, once the new record's storage is in place
    if (previousCost > 0) itxn.payment({ receiver: previousPayer, amount: previousCost, fee: 0 }).submit()
  }

  /**
   * Removes the shared record for a Merkle data key.
   *
   * @param name the name of the merkle tree root
   * @param key the metadata key you want to remove
   */
  deleteData(name: string, key: string): void {
    const keyBytes = Bytes(key)
    loggedAssert(keyBytes.length < 2 || keyBytes.slice(0, 2) !== Bytes(reservedDataKeyPrefix), errReservedKeyPrefix)
    const recordKey = this.dataKey(name, key)
    const id = this.recordKey(Txn.sender, recordKey)
    loggedAssert(this.records(id).exists, errNoData)
    this.removeRecord(recordKey, this.currentRecordRevision(id))
  }

  /**
   * verify an inclusion in a double sha256 based merkle tree
   *
   * @param address the address of the merkle tree root creator
   * @param name The name alias of the root
   * @param leaf The hashed leaf to verify
   * @param proof The merkle proof
   * @param type The type check for the lists purpose
   *
   * @returns a boolean indicating whether the proof is valid
   */
  verify(address: Account, name: string, leaf: Leaf, proof: Proof, type: uint64): boolean {
    const rootKey = this.recordKey(address, Bytes(name))
    if (!this.roots(rootKey).exists) return false
    const treeType = this.roots(rootKey).value.type
    if (type !== MerkleTreeTypeUnspecified && treeType !== type) return false

    ensureBudget(proof.length * 50)

    let hash = leaf
    for (let i: uint64 = 0; i < proof.length; i += 1) {
      hash = this.hash(proof[i], hash)
    }

    return hash === this.roots(rootKey).value.root
  }

  /**
   * Fetch a metadata properties
   *
   * @param address the address of the merkle tree root creator
   * @param name the name of the merkle tree root
   * @param key the metadata key eg. `Royalty`
   * @returns the value set eg. `5` encoded as a bytestring for 5%
   */
  @abimethod({ readonly: true })
  read(address: Account, name: string, key: string): string {
    if (key === treeTypeKey) return String(itob(this.roots(this.recordKey(address, Bytes(name))).value.type))
    const record = this.readRecord(address, this.dataKey(name, key))
    loggedAssert(record.exists, errNoData)
    return String(record.data)
  }

  /**
   * Read metadata from box storage and verify the data provided is included
   * in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
   * thats pre-computed off chain.
   *
   * verify an inclusion in a merkle tree
   * & read an associated key value pair
   * & check against the underlying data's schema
   * & check against the underlying data's list type or purpose
   *
   * @param address the address of the merkle tree root creator
   * @param name the name of the root
   * @param leaf the leaf node to be verified
   * @param proof the proof the hash is included
   * @param key the metadata key eg. `Royalty`
   * @param type the list type that helps contracts ensure
   * the lists purpose isn't being misused ( 0 if the caller doesnt care )
   * @returns a string of metadata
   */
  verifiedRead(address: Account, name: string, leaf: Leaf, proof: Proof, type: uint64, key: string): string {
    const verified = this.verify(address, name, leaf, proof, type)
    if (!verified) {
      return ''
    }
    return this.read(address, name, key)
  }

  /**
   * Read metadata from box storage and verify the data provided is included
   * in the merkle tree given a sha256'd 32 byte merkle tree root & a proof
   * thats pre-computed off chain.
   *
   * verify an inclusion in a merkle tree
   * & read an associated key value pair
   * & check against the underlying data's schema
   * & check against the underlying data's list type or purpose
   *
   * @param address the address of the merkle tree root creator
   * @param name the name of the root
   * @param leaf the leaf node to be verified
   * @param proof the proof the hash is included
   * @param key the metadata key eg. `Royalty`
   * @param type the list type that helps contracts ensure
   * the lists purpose isn't being misused ( 0 if the caller doesnt care )
   * @returns a string of metadata
   */
  verifiedMustRead(address: Account, name: string, leaf: Leaf, proof: Proof, type: uint64, key: string): string {
    loggedAssert(this.verify(address, name, leaf, proof, type), errFailedToVerifyInclusion)
    return this.read(address, name, key)
  }

  addType(payment: gtxn.PaymentTxn, description: string, schemaList: SchemaList): void {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
    loggedAssert(payment.amount === MetaTypeFee, errInvalidPaymentAmount)
    loggedAssert(Bytes(description).length <= 800, errDataTooLong)

    let schema: string = '('
    for (let i: uint64 = 0; i < schemaList.length; i += 1) {
      switch (schemaList[i]) {
        case SchemaPartUint8:
          schema += SchemaPartUint8String
          break
        case SchemaPartUint16:
          schema += SchemaPartUint16String
          break
        case SchemaPartUint32:
          schema += SchemaPartUint32String
          break
        case SchemaPartUint64:
          schema += SchemaPartUint64String
          break
        case SchemaPartUint128:
          schema += SchemaPartUint128String
          break
        case SchemaPartUint256:
          schema += SchemaPartUint256String
          break
        case SchemaPartUint512:
          schema += SchemaPartUint512String
          break
        case SchemaPartBytes4:
          schema += SchemaPartBytes4String
          break
        case SchemaPartBytes8:
          schema += SchemaPartBytes8String
          break
        case SchemaPartBytes16:
          schema += SchemaPartBytes16String
          break
        case SchemaPartBytes32:
          schema += SchemaPartBytes32String
          break
        case SchemaPartBytes64:
          schema += SchemaPartBytes64String
          break
        case SchemaPartBytes128:
          schema += SchemaPartBytes128String
          break
        case SchemaPartBytes256:
          schema += SchemaPartBytes256String
          break
        case SchemaPartBytes512:
          schema += SchemaPartBytes512String
          break
        case SchemaPartString:
          schema += SchemaPartStringString
          break
        case SchemaPartAddress:
          schema += SchemaPartAddressString
          break
        default:
          loggedAssert(false, errInvalidSchemaPart)
      }

      if (schemaList.length > 0 && i !== schemaList.length - 1) {
        schema += ','
      }
    }

    const id = this.newTypesID()

    const minBalanceBefore: uint64 = Global.currentApplicationAddress.minBalance
    this.types(id).value = {
      description: description,
      schema: schema + ')',
    }
    // The fee pays for the type's storage; the rest is owed to the DAO (see `collectTypeFees`).
    const storage: uint64 = Global.currentApplicationAddress.minBalance - minBalanceBefore
    this.typeFees.value += MetaTypeFee - storage
  }

  /**
   * Sends the type fees collected so far to the DAO's revenue escrow and returns the amount sent.
   * Anyone may call it: the receiver and the amount both come from this app's state. It fails until
   * the DAO has named the escrow with `updateAkitaDAOEscrow`. The payment never takes the app below
   * its minimum balance; whatever cannot be sent yet stays owed for a later call.
   */
  collectTypeFees(): uint64 {
    loggedAssert(this.akitaDAOEscrow.hasValue && this.akitaDAOEscrow.value.app.id !== 0, errEscrowDoesNotExist)

    const app = Global.currentApplicationAddress
    const spare: uint64 = app.balance > app.minBalance ? app.balance - app.minBalance : 0
    const amount: uint64 = this.typeFees.value < spare ? this.typeFees.value : spare
    if (amount === 0) {
      return 0
    }

    this.typeFees.value -= amount
    itxn.payment({ receiver: this.akitaDAOEscrow.value.app.address, amount, fee: 0 }).submit()
    return amount
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  rootCosts(name: string): uint64 {
    // Prefix + raw owner/name key + (root,type) value.
    return 31_700 + 400 * Bytes(name).length
  }

  @abimethod({ readonly: true })
  dataCosts(name: string, key: string, value: string): uint64 {
    return this.recordStorageCost(this.dataKey(name, key), Bytes(value).length)
  }

  @abimethod({ readonly: true })
  recordInfo(account: Account, key: bytes): MetaRecordInfo {
    const id = this.recordKey(account, key)
    if (!this.records(id).exists) return { exists: false, revision: 0, size: 0 }
    return { exists: true, revision: this.currentRecordRevision(id), size: this.records(id).length - RecordHeaderBytes }
  }

  @abimethod({ readonly: true })
  readRecord(account: Account, key: bytes): MetaRecordRead {
    const info = this.recordInfo(account, key)
    if (!info.exists) return { exists: false, revision: 0, data: Bytes('') }
    loggedAssert(info.size <= MaxInlineRecordBytes, errRecordRequiresSlice)
    const record = clone(this.records(this.recordKey(account, key)).value)
    return { exists: true, revision: record.revision, data: record.data }
  }

  @abimethod({ readonly: true })
  readRecordSlice(account: Account, key: bytes, offset: uint64, length: uint64, expectedRevision: uint64): bytes {
    const info = this.recordInfo(account, key)
    loggedAssert(info.exists, errRecordNotFound)
    loggedAssert(info.revision === expectedRevision, errRecordRevisionMismatch)
    loggedAssert(length <= MaxRecordChunkBytes && offset <= info.size && length <= info.size - offset, errRecordRange)
    return this.records(this.recordKey(account, key)).extract(RecordHeaderBytes + offset, length)
  }

  @abimethod({ readonly: true })
  recordCost(account: Account, key: bytes, size: uint64): uint64 {
    loggedAssert(size + RecordArgumentBytes + key.length <= MaxAppCallArgumentBytes, errRecordValueTooLarge)
    const id = this.recordKey(account, key)
    const next = this.recordStorageCost(key, size)
    let previous: uint64 = 0
    if (this.records(id).exists) previous = this.recordStorageCost(key, this.records(id).length - RecordHeaderBytes)
    return next > previous ? next - previous : 0
  }

  /** All four parts are published in this call; no intermediate record is observable. */
  setRecord(
    payment: gtxn.PaymentTxn, key: bytes,
    data0: bytes, data1: bytes, data2: bytes, data3: bytes,
    expectedRevision: uint64,
  ): uint64 {
    loggedAssert(!this.isPolicyKey(key), errPolicyKey)
    return this.storeRecord(payment, key, data0, data1, data2, data3, expectedRevision)
  }

  private storeRecord(
    payment: gtxn.PaymentTxn, key: bytes,
    data0: bytes, data1: bytes, data2: bytes, data3: bytes,
    expectedRevision: uint64,
  ): uint64 {
    const id = this.recordKey(Txn.sender, key)
    loggedAssert(data0.length <= MaxRecordPartBytes && data1.length <= MaxRecordPartBytes &&
      data2.length <= MaxRecordPartBytes && data3.length <= MaxFinalRecordPartBytes, errRecordPartTooLarge)
    const size: uint64 = data0.length + data1.length + data2.length + data3.length
    loggedAssert(size + RecordArgumentBytes + key.length <= MaxAppCallArgumentBytes, errRecordValueTooLarge)
    loggedAssert(expectedRevision === this.currentRecordRevision(id), errRecordRevisionMismatch)
    const exists = this.records(id).exists
    let previousCost: uint64 = 0
    if (exists) previousCost = this.recordStorageCost(key, this.records(id).length - RecordHeaderBytes)
    const nextCost = this.recordStorageCost(key, size)
    const due: uint64 = nextCost > previousCost ? nextCost - previousCost : 0
    // A new record takes the payment's sender as its payer; someone other than the caller funds the
    // record that remembers them. A record that grows is topped up by the account that paid for it.
    let sponsor: uint64 = 0
    if (!exists) {
      sponsor = sponsorCost(payment.sender, Txn.sender)
    } else if (due > 0) {
      loggedAssert(payment.sender === payerOf(this.records(id).key, Txn.sender), errPayerOnly)
    }
    this.requireRecordPayment(payment, due + sponsor)
    const revision = this.writeRecord(key, data3)
    if (sponsor > 0) recordPayer(this.records(id).key, payment.sender, Txn.sender)
    if (size > data3.length) {
      this.records(id).resize(RecordHeaderBytes + size)
      // The typed assignment writes revision and the final data part. Prepend
      // earlier parts in reverse order, trimming only the resize's zero padding.
      this.records(id).replace(RecordHeaderBytes - 2, new Uint16(size).bytes)
      if (data2.length > 0) this.records(id).splice(RecordHeaderBytes, 0, data2)
      if (data1.length > 0) this.records(id).splice(RecordHeaderBytes, 0, data1)
      if (data0.length > 0) this.records(id).splice(RecordHeaderBytes, 0, data0)
    }
    this.refundRecord(this.records(id).key, previousCost > nextCost ? previousCost - nextCost : 0)
    return revision
  }

  removeRecord(key: bytes, expectedRevision: uint64): uint64 {
    loggedAssert(!this.isPolicyKey(key), errPolicyKey)
    this.dropRecord(key, expectedRevision)
    return 0
  }

  private dropRecord(key: bytes, expectedRevision: uint64): void {
    const id = this.recordKey(Txn.sender, key)
    loggedAssert(this.records(id).exists, errRecordNotFound)
    loggedAssert(expectedRevision === this.currentRecordRevision(id), errRecordRevisionMismatch)
    const refund = this.recordStorageCost(key, this.records(id).length - RecordHeaderBytes)
    this.records(id).delete()
    this.releaseRecord(this.records(id).key, refund)
  }

  // GRANT POLICY METHODS -------------------------------------------------------------------------

  private isPolicyKey(key: bytes): boolean {
    return key.length > 0 && op.getByte(key, 0) === PolicyRecordKeyPrefix
  }

  /**
   * A policy write must come from the registered writer, sent as the wallet's controlled address,
   * while the wallet has an admin window open on the writer: its current grant is the writer's admin
   * grant (caller = the wallet's own address, no escrow). The wallet opens such a window only for an
   * admin or co-admin, so this holds whatever the writer's own code does.
   */
  private requirePolicyWindow(wallet: Application, key: bytes): void {
    loggedAssert(this.isPolicyKey(key), errNotPolicyKey)
    const writer = this.policyWriter.value
    loggedAssert(writer.id !== 0 && Global.callerApplicationId === writer.id, errPolicyWriter)
    const [controlled] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysControlledAddress))
    const [spending] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysSpendingAddress))
    const [current, exists] = op.AppGlobal.getExBytes(wallet, Bytes(AbstractAccountGlobalStateKeysCurrentPlugin))
    loggedAssert(exists && Txn.sender.bytes === controlled && Txn.sender.bytes === spending, errPolicyWindow)
    const grant = decodeArc4<PluginKey>(current)
    loggedAssert(grant.plugin === writer.id && grant.caller === wallet.address && grant.escrow === '', errPolicyWindow)
  }

  /**
   * Set the MetaPlugin allowed to write grant policies. The DAO wallet sets it; before the DAO has a
   * wallet (initial deployment), the creator may.
   */
  setPolicyWriter(writer: Application): void {
    const dao = this.getAkitaDAOWallet()
    loggedAssert(
      dao.id === 0 ? Txn.sender === Global.creatorAddress : Txn.sender === dao.address,
      errNotAkitaDao,
    )
    this.policyWriter.value = writer
  }

  /**
   * Create or replace a grant policy owned by `wallet`'s controlled address. Only the registered
   * writer may call it, inside an admin window on `wallet` (see requirePolicyWindow).
   */
  setPolicy(payment: gtxn.PaymentTxn, wallet: Application, key: bytes, data: bytes, expectedRevision: uint64): uint64 {
    this.requirePolicyWindow(wallet, key)
    return this.storeRecord(payment, key, Bytes(''), Bytes(''), Bytes(''), data, expectedRevision)
  }

  /** Remove a grant policy owned by `wallet`'s controlled address; its storage goes back to its payer. */
  removePolicy(wallet: Application, key: bytes, expectedRevision: uint64): uint64 {
    this.requirePolicyWindow(wallet, key)
    this.dropRecord(key, expectedRevision)
    return 0
  }
}
