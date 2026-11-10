/**
 * New escrows require 6 extra transactions
 * 1 payment to the escrow factory
 * 1 'mint' app call to the escrow factory
 * 1 create application call from escrow factory
 * 1 payment to the new escrow to fund it
 * 1 'rekey' app call to the new escrow
 * 1 payment from the new escrow to rekey to the arc58 account
 */
export declare const NewEscrowFeeAmount: bigint;
/**
 * Fee for one MBR move between the wallet and an external controlled address.
 *
 * When the controlled address is external (not the wallet app address), the wallet pays every box MBR
 * with an inner payment from the controlled address (`_payMbrFromControlled`) and refunds it with an
 * inner payment to it (`_refundMbrToControlled`). Each such payment costs one min fee, which the outer
 * call must carry. When the controlled address is the wallet app address, no payment is sent.
 */
export declare const ControlledMbrMoveFee: bigint;
/** Extra fee for `moves` MBR payments/refunds to or from the controlled address (0 when it is the wallet app). */
export declare function controlledMbrFee(hasExternalControlledAddress: boolean, moves?: bigint): bigint;
/**
 * Extra fee for `arc58_addPlugin` / `arc58_addNamedPlugin`.
 *
 * One controlled-address MBR payment for the plugin boxes and, when a new escrow is created, one more
 * for the escrow box (`newEscrow`), plus `NewEscrowFeeAmount` for the escrow factory path.
 */
export declare function addPluginExtraFee(isNewEscrow: boolean, hasExternalControlledAddress: boolean): bigint;
/**
 * Extra fee for `arc58_newEscrow`: one controlled-address MBR payment for the escrow box, plus
 * `NewEscrowFeeAmount` when the wallet mints the escrow (address = zero address). Adopting an
 * existing account (address != zero) makes no factory call.
 */
export declare function newEscrowExtraFee(mintsEscrow: boolean, hasExternalControlledAddress: boolean): bigint;
