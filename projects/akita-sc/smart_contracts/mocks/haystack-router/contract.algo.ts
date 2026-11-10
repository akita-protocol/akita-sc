import {
  Account,
  bytes,
  Contract,
  Global,
  gtxn,
  itxn,
  loggedAssert,
  TransactionType,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { extract, extractUint64, Txn } from '@algorandfoundation/algorand-typescript/op'

/** LocalNet route double; does not emulate Haystack's signed route payload. */
export class MockHaystackRouter extends Contract {
  @abimethod({ onCreate: 'require' })
  create(): void { }

  optIn(asset: uint64): void {
    itxn.assetTransfer({ xferAsset: asset, assetReceiver: Global.currentApplicationAddress, assetAmount: 0 }).submit()
  }

  prefix(): void { }

  /**
   * Haystack's ORDER_ROUTER v4 route call layout (MainNet app 3757715482): arg 1 = asset ids ([0] in, [1] out),
   * arg 4 = 93-byte terms (minAmountOut at 2, beneficiary at 29, referrer at 61). Like the real router it reads
   * the input right before it (a pay/axfer to this app, no close-out or clawback) and does not care who sent it.
   * It pays the beneficiary exactly minAmountOut of the output asset.
   */
  finalize(assets: uint64[], addresses: bytes, legs: bytes, terms: bytes<93>, flags: bytes<39>, tag: string): void {
    const inputIndex: uint64 = Txn.groupIndex - 1
    const input = gtxn.Transaction(inputIndex)
    if (input.type === TransactionType.Payment) {
      const pay = gtxn.PaymentTxn(inputIndex)
      loggedAssert(pay.receiver === Global.currentApplicationAddress && pay.closeRemainderTo === Global.zeroAddress, 'mockInputReceiver')
    } else {
      const axfer = gtxn.AssetTransferTxn(inputIndex)
      loggedAssert(axfer.assetReceiver === Global.currentApplicationAddress && axfer.assetCloseTo === Global.zeroAddress, 'mockInputReceiver')
      loggedAssert(axfer.assetSender === Global.zeroAddress, 'mockInputClawback')
    }
    const assetOut = assets[1]
    const minAmountOut = extractUint64(terms, 2)
    const beneficiary = Account(extract(terms, 29, 32))
    if (assetOut === 0) itxn.payment({ receiver: beneficiary, amount: minAmountOut }).submit()
    else itxn.assetTransfer({ xferAsset: assetOut, assetReceiver: beneficiary, assetAmount: minAmountOut }).submit()
  }
}
