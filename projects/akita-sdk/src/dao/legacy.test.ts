import { describe, expect, test } from 'vitest';
import { encodeABIValue } from '../utils';
import {
  decodeLegacyProposalNewEscrow,
  LEGACY_DAO_ACTION_STRUCTS,
  usesLegacyEscrowActionShape,
} from './legacy';

describe('legacy DAO escrow action decoding', () => {
  test('decodes the retained (string) NewEscrow shape', () => {
    const encoded = encodeABIValue(
      { escrow: 'operations' },
      'ProposalNewEscrow',
      LEGACY_DAO_ACTION_STRUCTS,
    );

    expect(decodeLegacyProposalNewEscrow(encoded)).toEqual({ escrow: 'operations' });
  });

  test('uses the historical shape only before the cutover block timestamp', () => {
    expect(usesLegacyEscrowActionShape(99n, 100n)).toBe(true);
    expect(usesLegacyEscrowActionShape(100n, 100n)).toBe(false);
    expect(usesLegacyEscrowActionShape(101n, 100n)).toBe(false);
    expect(usesLegacyEscrowActionShape(99n)).toBe(false);
  });
});
