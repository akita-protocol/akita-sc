import { Account, BoxMap, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { GateArgs } from '../../gates/types'

/** Stands in for the Akita gate: `mustCheck` passes for accounts the test allows on a gate id. */
export class MockInferenceGate extends Contract {
  allowed = BoxMap<Account, uint64>({ keyPrefix: '' })

  allow(account: Account, gateID: uint64): void {
    this.allowed(account).value = gateID
  }

  mustCheck(caller: Account, gateID: uint64, args: GateArgs): void {
    loggedAssert(this.allowed(caller).exists && this.allowed(caller).value === gateID, 'errMgat')
  }
}
