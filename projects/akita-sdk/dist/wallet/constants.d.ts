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
/**
 * Storage a wallet holds for its count of the plugins and allowances that name an escrow. A wallet makes
 * the count with a new escrow (since 2.0.0), and the MBR helper's `escrows` and `newEscrowMintCost` include it.
 */
export declare function escrowCountMbr(escrow: string): bigint;
/**
 * Extra storage of a plugin grant that uses `escrow` by default (`defaultToEscrow`), since 2.0.0. Such a
 * grant is stored under the escrow '' and the wallet stores the escrow's name beside it, so that removing
 * the grant can lower the escrow's count. The MBR helper does not quote it: add it to `getMbr().plugins`
 * as quoted for the escrow ''. The wallet returns it when the grant is removed.
 */
export declare function defaultEscrowGrantMbr(escrow: string): bigint;
/**
 * What the wallet factory adds to the price of a new wallet for the plugins installed with it, since 2.0.0.
 * It is what the wallet then spends on them: each grant's box, the name a grant on a default escrow stores
 * beside it, and, the first time an escrow is named, the escrow itself (its app, its account's minimum and
 * the wallet's two boxes for it). `newAccount` takes an exact payment, so this follows the factory's
 * `pluginInstallCost` term by term.
 */
export declare function pluginInstallCost(plugins: {
    escrow?: string;
    methods?: unknown[];
    defaultToEscrow?: boolean;
}[]): bigint;
/**
 * Deleting an escrow the factory made takes 6 extra transactions
 * 1 payment that closes the escrow account out to the controlled address
 * 1 'exists' app call that asks the escrow factory whether it has the escrow on record
 * 1 'delete' app call to the escrow factory
 * 1 delete application call from the escrow factory to the escrow
 * 1 payment from the escrow that closes its (now empty) account
 * 1 payment from the escrow factory that returns what it held for the escrow
 */
export declare const DeleteEscrowFeeAmount: bigint;
/**
 * An escrow the factory has no record of is registered by the delete itself, which takes 2 more
 * 1 payment to the escrow factory for its record
 * 1 'register' app call to the escrow factory
 */
export declare const RegisterEscrowFeeAmount: bigint;
/** How many allowances one `arc58_removeAllowances` call removes when an escrow is deleted: each is a box reference. */
export declare const RemoveAllowancesPerCall: number;
/** How many assets one `arc58_reclaim` call closes out when an escrow is deleted: each is an asset reference and an inner transfer. */
export declare const ReclaimsPerCall: number;
/** The most transactions one group holds. */
export declare const MaxGroupSize: number;
/**
 * Extra fee for `arc58_deleteEscrow`. An escrow the factory made (`mintedEscrow`) costs
 * `DeleteEscrowFeeAmount`, `RegisterEscrowFeeAmount` more when the factory has no record of it
 * (`registered` false), and two refunds to an external controlled address: what the factory held for
 * the app, and the wallet's own storage for the escrow. An adopted account is closed with one payment
 * and has one refund.
 */
export declare function deleteEscrowExtraFee(mintedEscrow: boolean, hasExternalControlledAddress: boolean, registered?: boolean): bigint;
