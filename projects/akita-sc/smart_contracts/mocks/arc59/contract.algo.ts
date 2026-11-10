import {
  Account,
  Asset,
  Global,
  GlobalState,
  itxn,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { Txn } from '@algorandfoundation/algorand-typescript/op'

/**
 * Focused ARC-59 test double. It preserves the ARC-59 claim signatures and
 * authenticates the receiver through Txn.sender, while using the router app
 * account itself as the test inbox.
 */
export class MockArc59Router extends Contract {
  lastCaller = GlobalState<Account>({ key: 'caller' })
  lastAction = GlobalState<uint64>({ key: 'action' })

  @abimethod({ onCreate: 'require' })
  create(): void { }

  optIn(asa: uint64): void {
    itxn
      .assetTransfer({
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: 0,
        xferAsset: asa,
      })
      .submit()
  }

  arc59_claim(asa: uint64): void {
    this.lastCaller.value = Txn.sender
    this.lastAction.value = 1

    itxn
      .assetTransfer({
        assetReceiver: Txn.sender,
        assetAmount: op.AssetHolding.assetBalance(Global.currentApplicationAddress, Asset(asa))[0],
        xferAsset: asa,
      })
      .submit()
  }

  arc59_reject(asa: uint64): void {
    this.lastCaller.value = Txn.sender
    this.lastAction.value = 2

    itxn
      .assetTransfer({
        assetReceiver: Asset(asa).creator,
        assetAmount: op.AssetHolding.assetBalance(Global.currentApplicationAddress, Asset(asa))[0],
        xferAsset: asa,
        assetCloseTo: Asset(asa).creator,
      })
      .submit()
  }

  arc59_claimAlgo(): void {
    this.lastCaller.value = Txn.sender
    this.lastAction.value = 3

    itxn
      .payment({
        receiver: Txn.sender,
        amount: Global.currentApplicationAddress.balance - Global.currentApplicationAddress.minBalance,
      })
      .submit()
  }
}
