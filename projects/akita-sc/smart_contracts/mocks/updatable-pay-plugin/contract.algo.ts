import { assert, contract, Global, Txn } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { MockUnlimitedPayPlugin } from '../unlimited-pay-plugin/contract.algo'

/** Test-only payment plugin whose program can be updated without changing its ABI. */
@contract({ avmVersion: 11 })
export class MockUpdatablePayPlugin extends MockUnlimitedPayPlugin {
  @abimethod({ allowActions: ['UpdateApplication'] })
  update(): void {
    assert(Txn.sender === Global.creatorAddress)
  }
}
