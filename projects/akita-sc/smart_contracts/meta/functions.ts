import { Account, Application, Bytes, bytes, Global, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import type { Meta } from './contract.algo'
import { MaxInlineRecordBytes, MaxRecordPartBytes, MaxRecordChunkBytes, MaxRecordKeyBytes, RecordPrefix, RecordHeaderBytes } from './constants'
import { errInvalidKey, errRecordNotFound, errRecordRange, errRecordRequiresSlice, errRecordRevisionMismatch } from './errors'
import { MetaRecordInfo, MetaRecordRead, MetaRecordValue } from './types'
import { Leaf, Proof } from '../utils/types/merkles'

/** Unprefixed record key; Meta's BoxMaps add their one-byte prefix. */
export function metaRecordKey(account: Account, key: bytes): bytes {
  loggedAssert(key.length > 0 && key.length <= MaxRecordKeyBytes, errInvalidKey)
  return account.bytes.concat(key)
}

/**
 * Record key of the grant policy for one install of `plugin`: the reserved 0x00 byte, then the
 * hashed `(plugin, caller, escrow)` grant identity. The record is owned by the wallet's controlled
 * address and only Meta's setPolicy / removePolicy write it.
 */
export function policyRecordKey(plugin: uint64, caller: Account, escrow: string): bytes {
  const id = op.sha256(encodeArc4<[uint64, Account, string]>([plugin, caller, escrow]))
  return Bytes.fromHex('00').concat(id.slice(0, MaxRecordKeyBytes - 1))
}

/** Direct foreign-box read. The calling contract must target AVM 13 and supply box resources. */
export function readMetaRecordInfo(registry: Application, account: Account, key: bytes): MetaRecordInfo {
  const id = metaRecordKey(account, key)
  const name = Bytes(RecordPrefix).concat(id)
  const [length, exists] = op.AppBox.length(registry, name)
  if (!exists) return { exists: false, revision: 0, size: 0 }
  return { exists: true, revision: decodeArc4<uint64>(op.AppBox.extract(registry, name, 0, 8)), size: length - RecordHeaderBytes }
}

/** Read up to 1024 published bytes, rejecting stale revisions and out-of-range slices. */
export function readMetaRecordSlice(
  registry: Application, account: Account, key: bytes,
  offset: uint64, length: uint64, expectedRevision: uint64,
): bytes {
  const info = readMetaRecordInfo(registry, account, key)
  loggedAssert(info.exists, errRecordNotFound)
  loggedAssert(info.revision === expectedRevision, errRecordRevisionMismatch)
  loggedAssert(length <= MaxRecordChunkBytes && offset <= info.size && length <= info.size - offset, errRecordRange)
  return op.AppBox.extract(registry, Bytes(RecordPrefix).concat(metaRecordKey(account, key)), RecordHeaderBytes + offset, length)
}

/** Read a complete inline record without an inner transaction; use info/slice for larger records. */
export function readMetaRecord(registry: Application, account: Account, key: bytes): MetaRecordRead {
  const info = readMetaRecordInfo(registry, account, key)
  if (!info.exists) return { exists: false, revision: 0, data: Bytes('') }
  loggedAssert(info.size <= MaxInlineRecordBytes, errRecordRequiresSlice)
  const [value] = op.AppBox.get(registry, Bytes(RecordPrefix).concat(metaRecordKey(account, key)))
  const record = decodeArc4<MetaRecordValue>(value)
  return { exists: true, revision: record.revision, data: record.data }
}

/** ABI alternative to direct box reads, including for consumers targeting an older AVM. */
export function callMetaReadRecord(registry: Application, account: Account, key: bytes): MetaRecordRead {
  return abiCall<typeof Meta.prototype.readRecord>({ appId: registry, args: [account, key], fee: 0 }).returnValue
}

/** Write a complete record owned and funded by the calling application. Caller must enforce authorization. */
export function setMetaRecord(registry: Application, key: bytes, data: bytes, expectedRevision: uint64): uint64 {
  const first: uint64 = data.length < MaxRecordPartBytes ? data.length : MaxRecordPartBytes
  return setMetaRecordParts(registry, key, data.slice(0, first), data.slice(first), Bytes(''), Bytes(''), expectedRevision)
}

/** Write up to the registry's complete call budget using four byte arguments. */
export function setMetaRecordParts(
  registry: Application, key: bytes, data0: bytes, data1: bytes, data2: bytes, data3: bytes, expectedRevision: uint64,
): uint64 {
  const size: uint64 = data0.length + data1.length + data2.length + data3.length
  const cost = abiCall<typeof Meta.prototype.recordCost>({
    appId: registry, args: [Global.currentApplicationAddress, key, size], fee: 0,
  }).returnValue
  return abiCall<typeof Meta.prototype.setRecord>({
    appId: registry,
    args: [itxn.payment({ receiver: registry.address, amount: cost, fee: 0 }), key, data0, data1, data2, data3, expectedRevision],
    fee: 0,
  }).returnValue
}

/** Delete the calling application's record; Meta refunds its storage deposit to that application. */
export function removeMetaRecord(registry: Application, key: bytes, expectedRevision: uint64): uint64 {
  return abiCall<typeof Meta.prototype.removeRecord>({ appId: registry, args: [key, expectedRevision], fee: 0 }).returnValue
}

/** Legacy-compatible proof verification. The leaf must use the tree's existing hashing/encoding. */
export function verifyMetaProof(registry: Application, address: Account, name: string, leaf: Leaf, proof: Proof, type: uint64): boolean {
  return abiCall<typeof Meta.prototype.verify>({ appId: registry, args: [address, name, leaf, proof, type], fee: 0 }).returnValue
}

/** Legacy-compatible rooted-data read; invalid proofs return an empty string as before. */
export function readVerifiedMetaData(registry: Application, address: Account, name: string, leaf: Leaf, proof: Proof, type: uint64, key: string): string {
  return abiCall<typeof Meta.prototype.verifiedRead>({ appId: registry, args: [address, name, leaf, proof, type, key], fee: 0 }).returnValue
}
