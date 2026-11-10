import { Bytes, bytes, Contract, GlobalState, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * Test-only NFD for the Gate v2 specs: stores its name under `i.name` (like a real NFD) and returns a packed list
 * of verified addresses for `readField('v.caAlgo.0.as')`.
 */
export class MockGateNFD extends Contract {
  name = GlobalState<bytes>({ key: 'i.name' })
  verified = GlobalState<bytes>({ key: 'mock.verified' })

  @abimethod({ onCreate: 'require' })
  create(name: string, verified: bytes): void {
    this.name.value = Bytes(name)
    this.verified.value = verified
  }

  @abimethod({ readonly: true })
  readField(fieldName: bytes): bytes {
    return this.verified.value
  }
}

/**
 * Test-only NFD registry: an NFD app id is valid for `nfdName` when the app's `i.name`
 * equals it (every MockGateNFD is "registered").
 */
export class MockGateNFDRegistry extends Contract {
  @abimethod({ readonly: true })
  isValidNfdAppId(nfdName: string, nfdAppId: uint64): boolean {
    const [name, exists] = op.AppGlobal.getExBytes(nfdAppId, Bytes('i.name'))
    return exists && name === Bytes(nfdName)
  }
}
