import { uint64 } from '@algorandfoundation/algorand-typescript'

export const RewardsGlobalStateKeyDisbursementID = 'disbursement_id'

export const RewardsBoxPrefixDisbursements = 'd'
export const RewardsBoxPrefixUserAllocations = 'u'

/**
 * Exact MBR of a disbursement box with an empty title and note: key `'d'` + uint64 (9 B) plus the
 * 121 B `DisbursementDetails` encoding (85 B head + 32 B `reclaimTo` + two 2 B string lengths)
 * = 2_500 + 400 * 130. Deployed callers that quote the v1 constant (41,700) underpay by 12,800 and
 * revert here (accepted for Rewards v2).
 */
export const MinDisbursementsMBR: uint64 = 54_500
export const UserAllocationMBR: uint64 = 25_300
