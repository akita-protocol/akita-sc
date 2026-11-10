import { uint64 } from '@algorandfoundation/algorand-typescript'

export const StakingGlobalStateKeyHeartbeatManagerAddress = 'heartbeat_manager_address'

export const StakingBoxPrefixStakes = 's'
export const StakingBoxPrefixAppStakes = 'a'
export const StakingBoxPrefixHeartbeats = 'h'
export const StakingBoxPrefixTotals = 't'
export const StakingBoxPrefixSettings = 'e'

export const StakesMBR: uint64 = 32_100
export const AppStakesMBR: uint64 = 34_900
export const HeartbeatsMBR: uint64 = 70_100
export const SettingsMBR: uint64 = 9_300
export const totalsMBR: uint64 = 15_700

export const ONE_YEAR: uint64 = 31_536_000 // 365 days * 24 hours * 60 minutes * 60 seconds

/** Bounds for an asset's max-lockup setting (DAO-05). */
export const MIN_MAX_LOCKUP: uint64 = 1_209_600 // 2 weeks
export const MAX_MAX_LOCKUP: uint64 = 126_144_000 // 4 * 365 days
