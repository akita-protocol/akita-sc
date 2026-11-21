
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

/** Box storage costs 400 µALGO per byte. */
const BoxCostPerByte: bigint = 400n

const utf8Length = (text: string): bigint => BigInt(new TextEncoder().encode(text).length)

/**
 * Storage a wallet holds for its count of the plugins and allowances that name an escrow. A wallet makes
 * the count with a new escrow (since 2.0.0), and the MBR helper's `escrows` and `newEscrowMintCost` include it.
 */
export function escrowCountMbr(escrow: string): bigint {
  return 6_100n + BoxCostPerByte * utf8Length(escrow)
}

/**
 * Extra storage of a plugin grant that uses `escrow` by default (`defaultToEscrow`), since 2.0.0. Such a
 * grant is stored under the escrow '' and the wallet stores the escrow's name beside it, so that removing
 * the grant can lower the escrow's count. The MBR helper does not quote it: add it to `getMbr().plugins`
 * as quoted for the escrow ''. The wallet returns it when the grant is removed.
 */
export function defaultEscrowGrantMbr(escrow: string): bigint {
  return 20_500n + BoxCostPerByte * utf8Length(escrow)
}

/**
 * Deleting an escrow the factory made takes 6 extra transactions
 * 1 payment that closes the escrow account out to the controlled address
 * 1 'exists' app call that asks the escrow factory whether it has the escrow on record
 * 1 'delete' app call to the escrow factory
 * 1 delete application call from the escrow factory to the escrow
 * 1 payment from the escrow that closes its (now empty) account
 * 1 payment from the escrow factory that returns what it held for the escrow
 */
export const DeleteEscrowFeeAmount: bigint = 6_000n

/**
 * An escrow the factory has no record of is registered by the delete itself, which takes 2 more
 * 1 payment to the escrow factory for its record
 * 1 'register' app call to the escrow factory
 */
export const RegisterEscrowFeeAmount: bigint = 2_000n

/** How many allowances one `arc58_removeAllowances` call removes when an escrow is deleted: each is a box reference. */
export const RemoveAllowancesPerCall: number = 6

/** How many assets one `arc58_reclaim` call closes out when an escrow is deleted: each is an asset reference and an inner transfer. */
export const ReclaimsPerCall: number = 4

/** The most transactions one group holds. */
export const MaxGroupSize: number = 16

/**
 * Extra fee for `arc58_deleteEscrow`. An escrow the factory made (`mintedEscrow`) costs
 * `DeleteEscrowFeeAmount`, `RegisterEscrowFeeAmount` more when the factory has no record of it
 * (`registered` false), and two refunds to an external controlled address: what the factory held for
 * the app, and the wallet's own storage for the escrow. An adopted account is closed with one payment
 * and has one refund.
 */
export function deleteEscrowExtraFee(mintedEscrow: boolean, hasExternalControlledAddress: boolean, registered: boolean = true): bigint {
  if (!mintedEscrow) {
    return 1_000n + controlledMbrFee(hasExternalControlledAddress)
  }
  return DeleteEscrowFeeAmount + (registered ? 0n : RegisterEscrowFeeAmount) + controlledMbrFee(hasExternalControlledAddress, 2n)
}
