import { uint64 } from '@algorandfoundation/algorand-typescript'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.8; router.md §4.2). Tunables such as the native segment
// opcode budget are not frozen and belong to WP4.

export const MaxLegs: uint64 = 4
export const MaxSegments: uint64 = 3
export const MaxCandidates: uint64 = 4
export const MaxChunks: uint64 = 4

/** router `flags`: allow DIRECT custody. Reserved: reverts with errRtDirect in v1 (SANDBOX only) */
export const FlagAllowDirect: uint64 = 1

/** AdapterInfo.flags */
export const AdapterEnabled: uint64 = 1
/** reserved, unused in v1 */
export const AdapterDirectCustody: uint64 = 2
export const AdapterExactQuote: uint64 = 4
