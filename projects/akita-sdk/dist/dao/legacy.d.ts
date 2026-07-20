import type { StructField } from '@algorandfoundation/algokit-utils/abi';
/** Historical NewEscrow payload used before the DAO added an address field. */
export type LegacyProposalNewEscrow = {
    escrow: string;
    address?: undefined;
};
/**
 * Manually retained ARC-4 shapes. Keep these outside generated clients so a
 * client regeneration cannot remove the ability to decode historical boxes.
 */
export declare const LEGACY_DAO_ACTION_STRUCTS: Record<string, StructField[]>;
export declare function decodeLegacyProposalNewEscrow(actionData: Uint8Array): LegacyProposalNewEscrow;
/** The cutover block timestamp itself is treated as v2. */
export declare function usesLegacyEscrowActionShape(proposalTimestamp: bigint, cutoverTimestamp?: bigint): boolean;
