import { uint64 } from '@algorandfoundation/algorand-typescript'
import { SchemaPart } from './types'

import { Uint8 } from '@algorandfoundation/algorand-typescript/arc4'

export const MetaGlobalStateKeyTypesID = 'types_id'
export const MetaGlobalStateKeyTypeFees = 'type_fees'

/** the fee for registering a tree type; the type's own storage is paid out of it */
export const MetaTypeFee: uint64 = 100_000_000

export const MetaBoxPrefixTypes = 't'
export const MetaBoxPrefixRoots = 'r'

export const MinTypesMBR: uint64 = 9_300

export const maxDataKeyLength: uint64 = 15
export const maxDataLength: uint64 = 1024

export const reservedDataKeyPrefix: string = 'l.'
export const treeTypeKey: string = 'l.type'

export const SchemaPartUint8: SchemaPart = new Uint8(10)
export const SchemaPartUint16: SchemaPart = new Uint8(11)
export const SchemaPartUint32: SchemaPart = new Uint8(12)
export const SchemaPartUint64: SchemaPart = new Uint8(13)
export const SchemaPartUint128: SchemaPart = new Uint8(14)
export const SchemaPartUint256: SchemaPart = new Uint8(15)
export const SchemaPartUint512: SchemaPart = new Uint8(16)
export const SchemaPartBytes4: SchemaPart = new Uint8(20)
export const SchemaPartBytes8: SchemaPart = new Uint8(21)
export const SchemaPartBytes16: SchemaPart = new Uint8(22)
export const SchemaPartBytes32: SchemaPart = new Uint8(23)
export const SchemaPartBytes64: SchemaPart = new Uint8(24)
export const SchemaPartBytes128: SchemaPart = new Uint8(25)
export const SchemaPartBytes256: SchemaPart = new Uint8(26)
export const SchemaPartBytes512: SchemaPart = new Uint8(27)
export const SchemaPartString: SchemaPart = new Uint8(30)
export const SchemaPartAddress: SchemaPart = new Uint8(40)

export const SchemaPartUint8String: string = 'uint8'
export const SchemaPartUint16String: string = 'uint16'
export const SchemaPartUint32String: string = 'uint32'
export const SchemaPartUint64String: string = 'uint64'
export const SchemaPartUint128String: string = 'uint128'
export const SchemaPartUint256String: string = 'uint256'
export const SchemaPartUint512String: string = 'uint512'
export const SchemaPartBytes4String: string = 'byte[4]'
export const SchemaPartBytes8String: string = 'byte[8]'
export const SchemaPartBytes16String: string = 'byte[16]'
export const SchemaPartBytes32String: string = 'byte[32]'
export const SchemaPartBytes64String: string = 'byte[64]'
export const SchemaPartBytes128String: string = 'byte[128]'
export const SchemaPartBytes256String: string = 'byte[256]'
export const SchemaPartBytes512String: string = 'byte[512]'
export const SchemaPartStringString: string = 'string'
export const SchemaPartAddressString: string = 'address'

export const MerkleTreeTypeUnspecified: uint64 = 0 // Unspecified
export const MerkleTreeTypeCollection: uint64 = 1 // Collection: uint64
export const MerkleTreeTypeTrait: uint64 = 2 // Trait: uint64
export const MerkleTreeTypeTrade: uint64 = 3 // Trade: address,address,uint64,uint64
export const MerkleTreeTypeWhitelist: uint64 = 4 // Whitelist: address
export const MerkleTreeTypeAddresses: uint64 = 5 // Addresses: address
export const MerkleTreeTypeHyperSwap: uint64 = 6 // HyperSwap: address,address,uint64,uint64,uint64

// A record box is m || owner[32] || key[1..31], containing ARC-4 (uint64,byte[]).

export const RecordPrefix = 'm'
export const MaxRecordKeyBytes: uint64 = 31
// uint64 revision + uint16 dynamic-field offset + uint16 byte-array length.
export const RecordHeaderBytes: uint64 = 12
// AVM 13's aggregate argument budget. Transaction arguments use no app-argument bytes.
export const MaxAppCallArgumentBytes: uint64 = 16384
// selector[4] + key length[2] + four byte-array lengths[8] + revision[8].
export const RecordArgumentBytes: uint64 = 22
// selector[4] + wallet[8] + bool[1] + two string lengths[4] + four array lengths[8] + revision[8].
export const PluginRecordArgumentBytes: uint64 = 33
// The final part is assigned with the typed header; earlier parts are prepended.
export const MaxFinalRecordPartBytes: uint64 = 4084
// Native bytes lengths exclude the two-byte ABI array prefix.
export const MaxRecordPartBytes: uint64 = 4094
export const MaxInlineRecordBytes: uint64 = 1024
export const MaxRecordChunkBytes: uint64 = 1024
