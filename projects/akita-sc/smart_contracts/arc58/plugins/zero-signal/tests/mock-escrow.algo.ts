import { Account, assert, bytes, Bytes, Global, GlobalState, gtxn, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * Stand-in for the ZeroSignal escrow with the payer-side signatures of its published ARC-56 spec.
 * Each method records who called it and with what, so a test can show that the ZeroSignal plugin
 * reaches the escrow as the wallet's spending account and passes its arguments through unchanged.
 */
export class MockZeroSignalEscrow extends Contract {
  /** how many calls this app has taken */
  calls = GlobalState<uint64>({ key: 'calls', initialValue: 0 })
  /** the name of the last method called */
  last = GlobalState<bytes>({ key: 'last', initialValue: Bytes('') })
  /** the sender of the last call */
  caller = GlobalState<Account>({ key: 'caller', initialValue: Global.zeroAddress })
  /** the ticket id of the last call that took one */
  ticket = GlobalState<bytes>({ key: 'ticket', initialValue: Bytes('') })
  /** the amount of the last call that took one */
  amount = GlobalState<uint64>({ key: 'amount', initialValue: 0 })
  /** every other argument of the last call, concatenated in order */
  rest = GlobalState<bytes>({ key: 'rest', initialValue: Bytes('') })
  /** whether the last settle was sent as the operator */
  asOperator = GlobalState<boolean>({ key: 'as_operator', initialValue: false })

  @abimethod({ onCreate: 'require' })
  create(): void {}

  private record(name: bytes, ticketId: bytes, amount: uint64, rest: bytes): void {
    this.calls.value += 1
    this.last.value = name
    this.caller.value = Txn.sender
    this.ticket.value = ticketId
    this.amount.value = amount
    this.rest.value = rest
  }

  @abimethod({ allowActions: ['OptIn', 'NoOp'] })
  depositMbr(payment: gtxn.PaymentTxn): void {
    assert(payment.sender === Txn.sender, 'payment not from the caller')
    assert(payment.receiver === Global.currentApplicationAddress, 'payment not to the escrow')
    this.record(Bytes('depositMbr'), Bytes(''), payment.amount, Bytes(''))
  }

  withdrawMbr(amount: uint64): void {
    this.record(Bytes('withdrawMbr'), Bytes(''), amount, Bytes(''))
  }

  @abimethod({ allowActions: ['CloseOut'] })
  closeDeposit(): void {
    this.record(Bytes('closeDeposit'), Bytes(''), 0, Bytes(''))
  }

  settle(
    ticketId: bytes,
    amountCharged: uint64,
    receiptDigest: bytes,
    ttftMs: uint64,
    decodeMs: uint64,
    inputCount: uint64,
    outputCount: uint64,
    outputUsageType: uint64,
    auxOutputUsageType: uint64,
    auxOutputCount: uint64,
    asOperator: boolean,
  ): void {
    const counts: uint64 = ttftMs + decodeMs + inputCount + outputCount + outputUsageType + auxOutputUsageType + auxOutputCount
    this.record(Bytes('settle'), ticketId, amountCharged + counts, receiptDigest)
    this.asOperator.value = asOperator
  }

  refundInactive(ticketId: bytes): void {
    this.record(Bytes('refundInactive'), ticketId, 0, Bytes(''))
  }

  protest(
    ticketId: bytes,
    amountCharged: uint64,
    receiptDigest: bytes,
    receiptSig: bytes,
    disputeExcerpt: bytes,
    reasonCode: uint64,
  ): void {
    this.record(Bytes('protest'), ticketId, amountCharged + reasonCode, receiptDigest.concat(receiptSig).concat(disputeExcerpt))
  }
}
