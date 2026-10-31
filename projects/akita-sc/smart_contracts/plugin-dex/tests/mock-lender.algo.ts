import {
  Contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  Uint64,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { RateScale } from '../constants'
import { mulDiv } from '../math'

/**
 * Test-only lending venue for external positions (FINAL-SPEC §4.12 external.e2e): deposits of the
 * underlying (ALGO or one ASA) mint receipt units to the depositor at `rate` (underlying per receipt unit
 * × RateScale, floor), and redemptions pay floor(units·rate/RateScale) of the underlying back. The rate is
 * set by anyone with `setRate` (tests move it to simulate interest or a loss). Fund the app with extra
 * underlying so redemptions after a rate increase can be paid.
 */
export class MockLender extends Contract {
  underlying = GlobalState<uint64>({ key: 'underlying' })
  receipt = GlobalState<uint64>({ key: 'receipt' })
  rate = GlobalState<uint64>({ key: 'rate' })

  @abimethod({ onCreate: 'require' })
  create(underlying: uint64, rate: uint64): void {
    this.underlying.value = underlying
    this.rate.value = rate
    this.receipt.value = 0
  }

  /** create the receipt ASA (and opt into an ASA underlying); fund the app's MBR first */
  bootstrap(): uint64 {
    loggedAssert(this.receipt.value === 0, 'errLnBt')
    this.receipt.value = itxn
      .assetConfig({
        total: Uint64(10_000_000_000_000_000n),
        decimals: 6,
        unitName: 'rTKN',
        assetName: 'Mock Lender Receipt',
        reserve: Global.currentApplicationAddress,
      })
      .submit().createdAsset.id
    if (this.underlying.value !== 0) {
      itxn
        .assetTransfer({
          assetReceiver: Global.currentApplicationAddress,
          xferAsset: this.underlying.value,
          assetAmount: 0,
        })
        .submit()
    }
    return this.receipt.value
  }

  setRate(rate: uint64): void {
    loggedAssert(rate > 0, 'errLnRt')
    this.rate.value = rate
  }

  /** deposit ALGO (underlying 0); receipts go to Txn.sender */
  depositAlgo(payment: gtxn.PaymentTxn): uint64 {
    loggedAssert(this.underlying.value === 0 && payment.receiver === Global.currentApplicationAddress, 'errLnDp')
    return this.mint(payment.amount)
  }

  /** deposit the ASA underlying; receipts go to Txn.sender */
  depositAsset(transfer: gtxn.AssetTransferTxn): uint64 {
    loggedAssert(
      transfer.xferAsset.id === this.underlying.value && transfer.assetReceiver === Global.currentApplicationAddress,
      'errLnDp',
    )
    return this.mint(transfer.assetAmount)
  }

  /** return receipt units; the underlying goes to Txn.sender */
  redeem(transfer: gtxn.AssetTransferTxn): uint64 {
    loggedAssert(
      transfer.xferAsset.id === this.receipt.value && transfer.assetReceiver === Global.currentApplicationAddress,
      'errLnRd',
    )
    const amount = mulDiv(transfer.assetAmount, this.rate.value, RateScale)
    if (amount > 0) {
      if (this.underlying.value === 0) {
        itxn.payment({ receiver: Txn.sender, amount }).submit()
      } else {
        itxn
          .assetTransfer({ assetReceiver: Txn.sender, xferAsset: this.underlying.value, assetAmount: amount })
          .submit()
      }
    }
    return amount
  }

  private mint(amount: uint64): uint64 {
    const units = mulDiv(amount, RateScale, this.rate.value)
    if (units > 0) {
      itxn
        .assetTransfer({ assetReceiver: Txn.sender, xferAsset: this.receipt.value, assetAmount: units })
        .submit()
    }
    return units
  }
}
