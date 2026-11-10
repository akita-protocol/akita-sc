import { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Subscription consensus action codes.
 *
 * A Guild consensus action is `uint8 code || ABI payload`. The Guild selects proposal
 * settings by code and forwards the action; the policy validates and applies it.
 */
export const SubscriptionActionAddOfferings: uint64 = 1 // (uint64,uint64)[]
export const SubscriptionActionSetOfferingWeight: uint64 = 2 // (uint64,uint64)
export const SubscriptionActionRemoveOffering: uint64 = 3 // (uint64)
export const SubscriptionActionSetMinimumApprovals: uint64 = 4 // (uint64)
