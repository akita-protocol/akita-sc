import type { StructField } from '@algorandfoundation/algokit-utils/abi';
import { decodeABIValue } from '../utils';

/** Historical NewEscrow payload used before the DAO added an address field. */
export type LegacyProposalNewEscrow = {
  escrow: string;
  address?: undefined;
};

/**
 * Manually retained ARC-4 shapes. Keep these outside generated clients so a
 * client regeneration cannot remove the ability to decode historical boxes.
 */
export const LEGACY_DAO_ACTION_STRUCTS: Record<string, StructField[]> = {
  ProposalNewEscrow: [{ name: 'escrow', type: 'string' }],
};

export function decodeLegacyProposalNewEscrow(actionData: Uint8Array): LegacyProposalNewEscrow {
  return decodeABIValue(
    actionData,
    'ProposalNewEscrow',
    LEGACY_DAO_ACTION_STRUCTS,
  ) as unknown as LegacyProposalNewEscrow;
}

/** The cutover block timestamp itself is treated as v2. */
export function usesLegacyEscrowActionShape(proposalTimestamp: bigint, cutoverTimestamp?: bigint): boolean {
  return cutoverTimestamp !== undefined && proposalTimestamp < cutoverTimestamp;
}
