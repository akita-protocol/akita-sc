import { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Locked-token consensus action codes.
 *
 * A Guild consensus action is `uint8 code || ABI payload`. The Guild selects proposal
 * settings by code and forwards the action; the policy validates and applies it.
 */
export const LockedTokenActionSetMinimumApprovals: uint64 = 1 // (uint64)
