import { Account, Bytes, bytes, Contract, GlobalState, gtxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * Test-only sub-gate with a fixed answer and a fixed registration cost. Used to exercise
 * Gate v2 composite semantics, the allowlist and the per-filter cost cap.
 */
export class MockSubGate extends Contract {
  result = GlobalState<boolean>({ key: 'result' })
  registrationCost = GlobalState<uint64>({ key: 'cost' })

  @abimethod({ onCreate: 'require' })
  create(result: boolean, registrationCost: uint64): void {
    this.result.value = result
    this.registrationCost.value = registrationCost
  }

  cost(args: bytes): uint64 {
    return this.registrationCost.value
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    return 0
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    return this.result.value
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return Bytes('')
  }
}
