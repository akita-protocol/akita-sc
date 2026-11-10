import { Account, Application, Asset, Global, gtxn, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { releasedRefund } from '../../utils/base-contracts/factory'
import { assertBoundAssetTransfer, assertBoundPayment, assertSafeAssetTransfer, assertSafePayment, getControlledSpendingAccount } from '../../utils/functions'
import { programExtraPages } from '../../utils/programs'

/** TEST-ONLY child that closes its whole balance back to its creator when deleted. */
export class MockReapableChild extends Contract {
  @abimethod({ allowActions: 'DeleteApplication' })
  reap(): void {
    itxn.payment({ closeRemainderTo: Global.creatorAddress }).submit()
  }
}

/**
 * TEST-ONLY harness exposing the Wave 0 shared helpers so they can be exercised directly
 * on LocalNet. Never deploy outside tests.
 */
export class MockSharedHelpers extends Contract {
  opUp(): void { }

  checkPayment(payment: gtxn.PaymentTxn, sender: Account, receiver: Account, amount: uint64): void {
    assertBoundPayment(payment, sender, receiver, amount)
  }

  checkSafePayment(payment: gtxn.PaymentTxn, sender: Account): void {
    assertSafePayment(payment, sender)
  }

  checkAssetTransfer(xfer: gtxn.AssetTransferTxn, sender: Account, receiver: Account, asset: Asset, amount: uint64): void {
    assertBoundAssetTransfer(xfer, sender, receiver, asset, amount)
  }

  checkSafeAssetTransfer(xfer: gtxn.AssetTransferTxn, sender: Account): void {
    assertSafeAssetTransfer(xfer, sender)
  }

  controlledSpending(wallet: Application): Account {
    return getControlledSpendingAccount(wallet)
  }

  extraPages(approvalSize: uint64, clearSize: uint64, minExtraPages: uint64): uint64 {
    return programExtraPages(approvalSize, clearSize, minExtraPages)
  }

  /** Create a child app and fund it with `funding` µALGO on top of nothing (caller pays via app balance). */
  spawn(funding: uint64): uint64 {
    const child = compileArc4(MockReapableChild).bareCreate().createdApp
    itxn.payment({ receiver: child.address, amount: funding }).submit()
    return child.id
  }

  /**
   * Delete `child` (it closes its balance back here) and pay `receiver` the released refund,
   * capped at `recorded`. Returns the refund.
   */
  reap(child: Application, recorded: uint64, receiver: Account): uint64 {
    const balanceBefore = Global.currentApplicationAddress.balance
    const minBefore = Global.currentApplicationAddress.minBalance
    compileArc4(MockReapableChild).call.reap({ appId: child })
    const refund = releasedRefund(recorded, balanceBefore, minBefore, 0)
    if (refund > 0) {
      itxn.payment({ receiver, amount: refund }).submit()
    }
    return refund
  }
}
