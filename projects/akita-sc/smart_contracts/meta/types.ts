import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'
import { Uint8 } from '@algorandfoundation/algorand-typescript/arc4'

export type TypesValue = {
  // Canonical ARC-4 tuple declaration, e.g. (address,address,uint64,uint64).
  schema: string
  description: string
}

export type SchemaList = SchemaPart[]
export type SchemaPart = Uint8

export type RootKey = {
  address: Account
  name: string
}

export type RootValue = { root: bytes<32>; type: uint64 }
/** Stored as the ARC-4 tuple (uint64,byte[]). */
export type MetaRecordValue = { revision: uint64; data: bytes }
export type MetaRecordRead = { exists: boolean; revision: uint64; data: bytes }
export type MetaRecordInfo = { exists: boolean; revision: uint64; size: uint64 }
