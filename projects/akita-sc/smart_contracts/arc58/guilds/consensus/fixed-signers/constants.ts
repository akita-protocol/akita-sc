import { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Fixed-signer consensus action codes.
 *
 * A Guild consensus action is `uint8 code || ABI payload`. The Guild selects proposal
 * settings by code and forwards the action; the policy validates and applies it.
 */
export const FixedSignerActionAddMembers: uint64 = 1 // (uint8,(address,uint64)[])
export const FixedSignerActionRemoveMember: uint64 = 2 // (address)
export const FixedSignerActionSetMemberWeight: uint64 = 3 // (address,uint64)
export const FixedSignerActionSetThreshold: uint64 = 4 // (uint64)
export const FixedSignerActionSetWeightMode: uint64 = 5 // (uint8)
export const FixedSignerActionLockMembership: uint64 = 6 // no payload
