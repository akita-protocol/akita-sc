/**
 * ARC-65 error codes emitted by the Collectible Variations registry. Keep in
 * sync with `akita-sc/smart_contracts/collectible-variations/errors.ts`.
 */

import { makeErrorTranslator } from '../errors';

export const COLLECTIBLE_VARIATIONS_ERROR_MESSAGES: Record<string, string> = {
  errCvAm: 'Asset does not exist',
  errCvAe: 'Asset still exists; only a destroyed asset can be purged',
  errCvBa: 'Invalid argument',
  errCvTl: 'Value too large (flat image over 768 bytes or box value over 4096 bytes)',
  errCvNa: 'Sender is not admitted by the writer rules that apply',
  errCvNh: 'Account does not hold one whole unit of the asset',
  errCvNc: 'Sender is not the creator of the asset',
  errCvLk: 'Entry or policy is locked',
  errCvPf: 'ifRevision precondition failed',
  errCvSm: 'Pin source variation does not exist',
  errCvSc: 'Pin source revision changed',
  errCvSn: 'Pin source not allowed',
  errCvSu: 'Holder pins need a single-unit asset',
  errCvDm: 'Deposit payment missing or wrong amount',
  errCvBs: 'Controlling app is not a valid ARC-20 Smart ASA for this asset',
  errCvBp: 'Invalid purge box name',
};

export const translateCollectibleVariationsError = makeErrorTranslator(COLLECTIBLE_VARIATIONS_ERROR_MESSAGES);
