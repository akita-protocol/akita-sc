import { assert, contract, Global, Txn } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { PayPlugin } from '../../arc58/plugins/pay/contract.algo'

/** Test-only payment plugin whose program can be updated without changing its ABI. */
@contract({ avmVersion: 11 })
export class MockUpdatablePayPlugin extends PayPlugin {
  @abimethod({ allowActions: ['UpdateApplication'] })
  update(): void {
    assert(Txn.sender === Global.creatorAddress)
  }
}
