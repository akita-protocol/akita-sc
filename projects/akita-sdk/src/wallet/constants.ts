
/**
 * New escrows require 6 extra transactions
 * 1 payment to the escrow factory
 * 1 'mint' app call to the escrow factory
 * 1 create application call from escrow factory
 * 1 payment to the new escrow to fund it
 * 1 'rekey' app call to the new escrow
 * 1 payment from the new escrow to rekey to the arc58 account
 */
export const NewEscrowFeeAmount: bigint = 6_000n

/**
 * Fee for one MBR move between the wallet and an external controlled address.
 *
 * When the controlled address is external (not the wallet app address), the wallet pays every box MBR
 * with an inner payment from the controlled address (`_payMbrFromControlled`) and refunds it with an
 * inner payment to it (`_refundMbrToControlled`). Each such payment costs one min fee, which the outer
 * call must carry. When the controlled address is the wallet app address, no payment is sent.
 */
export const ControlledMbrMoveFee: bigint = 1_000n

/** Extra fee for `moves` MBR payments/refunds to or from the controlled address (0 when it is the wallet app). */
export function controlledMbrFee(hasExternalControlledAddress: boolean, moves: bigint = 1n): bigint {
  return hasExternalControlledAddress ? moves * ControlledMbrMoveFee : 0n
}

/**
 * Extra fee for `arc58_addPlugin` / `arc58_addNamedPlugin`.
 *
 * One controlled-address MBR payment for the plugin boxes and, when a new escrow is created, one more
 * for the escrow box (`newEscrow`), plus `NewEscrowFeeAmount` for the escrow factory path.
 */
export function addPluginExtraFee(isNewEscrow: boolean, hasExternalControlledAddress: boolean): bigint {
  return (isNewEscrow ? NewEscrowFeeAmount : 0n) + controlledMbrFee(hasExternalControlledAddress, isNewEscrow ? 2n : 1n)
}

/**
 * Extra fee for `arc58_newEscrow`: one controlled-address MBR payment for the escrow box, plus
 * `NewEscrowFeeAmount` when the wallet mints the escrow (address = zero address). Adopting an
 * existing account (address != zero) makes no factory call.
 */
export function newEscrowExtraFee(mintsEscrow: boolean, hasExternalControlledAddress: boolean): bigint {
  return (mintsEscrow ? NewEscrowFeeAmount : 0n) + controlledMbrFee(hasExternalControlledAddress)
}
