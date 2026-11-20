import { bytes, gtxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { Contract } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * The payer's side of the ZeroSignal escrow, as its published ARC-56 spec declares it. Only the
 * signatures matter: the ZeroSignal plugin calls these by selector. `open` is not here because the
 * serving node sends it, and the payer's part of an open is a plain payment.
 */
export class ZeroSignalEscrow extends Contract {
  depositMbr(payment: gtxn.PaymentTxn): void {}
  withdrawMbr(amount: uint64): void {}
  closeDeposit(): void {}
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
  ): void {}
  refundInactive(ticketId: bytes): void {}
  protest(
    ticketId: bytes,
    amountCharged: uint64,
    receiptDigest: bytes,
    receiptSig: bytes,
    disputeExcerpt: bytes,
    reasonCode: uint64,
  ): void {}
}
