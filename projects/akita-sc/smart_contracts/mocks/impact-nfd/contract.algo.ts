import { Bytes, bytes, Contract, GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { itob } from '@algorandfoundation/algorand-typescript/op'

/**
 * Test-only v3 NFD for the impact specs: `i.name`, `i.ver` and a settable `i.timeChanged`,
 * with `readField` returning a packed verified-address list for every field.
 */
export class MockImpactNFD extends Contract {
  name = GlobalState<bytes>({ key: 'i.name' })
  ver = GlobalState<bytes>({ key: 'i.ver' })
  timeChanged = GlobalState<bytes>({ key: 'i.timeChanged' })
  verified = GlobalState<bytes>({ key: 'mock.verified' })

  @abimethod({ onCreate: 'require' })
  create(name: string, verified: bytes, timeChanged: uint64): void {
    this.name.value = Bytes(name)
    this.ver.value = Bytes('3.11')
    this.verified.value = verified
    this.timeChanged.value = itob(timeChanged)
  }

  change(verified: bytes, timeChanged: uint64): void {
    this.verified.value = verified
    this.timeChanged.value = itob(timeChanged)
  }

  @abimethod({ readonly: true })
  readField(fieldName: bytes): bytes {
    return this.verified.value
  }
}
