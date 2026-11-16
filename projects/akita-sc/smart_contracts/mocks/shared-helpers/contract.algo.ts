import { Account, Application, Asset, bytes, Global, gtxn, itxn, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { releasedRefund } from '../../utils/base-contracts/factory'
import {
  assertBoundAssetTransfer, assertBoundPayment, assertExactPayment, assertPlainPayment, assertSafeAssetTransfer,
  assertSafePayment, getControlledSpendingAccount, payerOf, recordPayer, releaseDeposit, sponsorCost,
} from '../../utils/functions'
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

  checkPlainPayment(payment: gtxn.PaymentTxn): void {
    assertPlainPayment(payment)
  }

  checkExactPayment(payment: gtxn.PaymentTxn, receiver: Account, amount: uint64): void {
    assertExactPayment(payment, receiver, amount)
  }

  /**
   * Holds a deposit of `amount` for the caller's `record`. Anyone may pay it; a payer other than the
   * caller is remembered and also funds its payer record.
   */
  hold(payment: gtxn.PaymentTxn, record: bytes, amount: uint64): void {
    assertExactPayment(payment, Global.currentApplicationAddress, amount + sponsorCost(payment.sender, Txn.sender))
    recordPayer(record, payment.sender, Txn.sender)
  }

  heldBy(record: bytes, owner: Account): Account {
    return payerOf(record, owner)
  }

  /** Releases the deposit of `amount` held for `record` and pays it to whoever funded it. Returns that account. */
  release(record: bytes, owner: Account, amount: uint64): Account {
    const [receiver, total] = releaseDeposit(record, owner, amount)
    itxn.payment({ receiver, amount: total }).submit()
    return receiver
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
