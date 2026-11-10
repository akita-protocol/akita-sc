import { uint64 } from "@algorandfoundation/algorand-typescript"

export const GateMustCheckAbiMethod = 'mustCheck(address,uint64,byte[][])void'

export const GateGlobalStateKeyCursor = 'gate_cursor'
export const GateGlobalStateKeyRegistryCursor = 'registry_cursor'

export const GateGlobalStateKeyRegistrationShape = 'registration_shape'
export const GateGlobalStateKeyCheckShape = 'check_shape'

export const GateBoxPrefixAppRegistry = 'a'
export const GateBoxPrefixGateRegistry = 'g'

export const OperatorAndValueByteLength: uint64 = 9

// AssetGateRegistryInfo: uint64 (asset) + uint8 (op) + uint64 (value) = 17 bytes
export const AssetGateRegistryInfoByteLength: uint64 = 17

export const OperatorAndValueRegistryMBR: uint64 = 9_300
export const UserOperatorValueRegistryMBR: uint64 = 22_100
export const MinMetaMerkleRegistryMBR: uint64 = 18_500
/** Gate v2 issues new gate ids from 2^32 so they never collide with legacy (v1) ids. */
export const FirstGateV2ID: uint64 = 4_294_967_296
/** Maximum filters per composite gate. */
export const MaxGateFilters: uint64 = 8
/** Maximum registration cost a single sub-gate may quote (1 ALGO). */
export const MaxSubGateCost: uint64 = 1_000_000

export const GateGlobalStateKeyLegacyCutoff = 'legacy_cutoff'
export const GateGlobalStateKeyImportsSealed = 'imports_sealed'
export const GateBoxPrefixSubGates = 's'
/** MBR of one allowlist box: 2_500 + 400 * (1 + 8) */
export const SubGateAllowlistMBR: uint64 = 6_100
/** AssetGateRegistryInfo box: 8-byte key + 17-byte value → 2_500 + 400 * 25 */
export const AssetGateRegistryMBR: uint64 = 12_500

/** Gate v2 context evaluation (principal-resolution spec §3.5, §6.9); = utils/functions.ts `GateMustCheckForAbiMethod`. */
export const GateMustCheckForAbiMethod = 'mustCheckFor((address,uint64,address),uint64,byte[][])void'
export const GateCheckForAbiMethod = 'checkFor((address,uint64,address),uint64,byte[][])bool'
/** The method a context-aware sub-gate implements. */
export const SubGateCheckForAbiMethod = 'checkFor((address,uint64,address),uint64,byte[])bool'
/** MBR of one context-aware allowlist box (1-byte flag value): 2_500 + 400 * (1 + 8 + 1) */
export const SubGateCtxAllowlistMBR: uint64 = 6_500
