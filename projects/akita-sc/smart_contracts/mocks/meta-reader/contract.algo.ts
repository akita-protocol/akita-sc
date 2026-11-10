import { Account, Application, Asset, bytes, contract, Contract, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { MetaRecordRead, MetaRecordInfo } from '../../meta/types'
import { callMetaReadRecord, readMetaRecord, readMetaRecordInfo, readMetaRecordSlice, readVerifiedMetaData, removeMetaRecord, setMetaRecord, setMetaRecordParts, verifyMetaProof } from '../../meta/functions'
import { Leaf, Proof } from '../../utils/types/merkles'
import { royalties } from '../../utils/functions'

/** LocalNet consumer/attacker for testing the registry's cross-application boundary. */
@contract({ avmVersion: 13 })
export class MockMetaReader extends Contract {
  @abimethod({ readonly: true })
  public read(registry: Application, account: Account, key: bytes): MetaRecordRead {
    return readMetaRecord(registry, account, key)
  }

  @abimethod({ readonly: true })
  public info(registry: Application, account: Account, key: bytes): MetaRecordInfo {
    return readMetaRecordInfo(registry, account, key)
  }

  @abimethod({ readonly: true })
  public slice(
    registry: Application,
    account: Account,
    key: bytes,
    offset: uint64,
    length: uint64,
    expectedRevision: uint64,
  ): bytes {
    return readMetaRecordSlice(registry, account, key, offset, length, expectedRevision)
  }

  public readViaCall(registry: Application, account: Account, key: bytes): MetaRecordRead {
    return callMetaReadRecord(registry, account, key)
  }

  // Deliberately unrestricted LocalNet mock; production consumers must authorize writes.
  public setOwned(registry: Application, key: bytes, data: bytes, expectedRevision: uint64): uint64 {
    return setMetaRecord(registry, key, data, expectedRevision)
  }

  public setOwnedParts(registry: Application, key: bytes, data0: bytes, data1: bytes, data2: bytes, data3: bytes, expectedRevision: uint64): uint64 {
    return setMetaRecordParts(registry, key, data0, data1, data2, data3, expectedRevision)
  }

  public removeOwned(registry: Application, key: bytes, expectedRevision: uint64): uint64 {
    return removeMetaRecord(registry, key, expectedRevision)
  }

  public verify(registry: Application, address: Account, name: string, leaf: Leaf, proof: Proof, type: uint64): boolean {
    return verifyMetaProof(registry, address, name, leaf, proof, type)
  }

  public verifiedRead(registry: Application, address: Account, name: string, leaf: Leaf, proof: Proof, type: uint64, key: string): string {
    return readVerifiedMetaData(registry, address, name, leaf, proof, type, key)
  }

  public royalty(akitaDAO: Application, asset: Asset, name: string, proof: Proof): uint64 {
    return royalties(akitaDAO, asset, name, proof)
  }

  @abimethod({ readonly: true })
  public permissions(registry: Application): { publicReads: boolean; familyAccess: boolean } {
    const [publicReads] = op.AppParams.appForeignBoxReads(registry)
    const [familyAccess] = op.AppParams.appFamilyBoxAccess(registry)
    return { publicReads, familyAccess }
  }

  public write(registry: Application, name: bytes, data: bytes): void {
    op.AppBox.put(registry, name, data)
  }

  public remove(registry: Application, name: bytes): boolean {
    return op.AppBox.delete(registry, name)
  }
}
