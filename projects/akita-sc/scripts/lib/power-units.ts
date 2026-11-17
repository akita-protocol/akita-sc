/**
 * The unit of a proposal `power` threshold. The deployed DAO compared a proposer's power with whole
 * token-years; the upgraded DAO (rollout B2) compares it with base units (six decimals), so a value
 * stored before the upgrade reads 1,000,000 times lower after it. See `proposal-power.ts`.
 */
import { daoBindingMode } from './principal-rollout'

export const POWER_SCALE = 1_000_000n
/** The deployed validator capped `power` at 1,000 whole tokens, so a stored value at or under it is in the old unit. */
export const LEGACY_POWER_MAX = 1_000n

export const isLegacyPower = (power: bigint) => power > 0n && power <= LEGACY_POWER_MAX
/** Above the old cap and below one whole token in base units: neither unit explains it. */
export const isUnclearPower = (power: bigint) => power > LEGACY_POWER_MAX && power < POWER_SCALE
/** A whole-token power in base units; a value already in base units is returned unchanged. */
export const toBaseUnitPower = (power: bigint) => (isLegacyPower(power) ? power * POWER_SCALE : power)

/** Whether a DAO program compares power with base units: the upgraded DAO, which is the one with `isUpgradeLease`. */
export const comparesPowerInBaseUnits = (daoProgram: Uint8Array) => daoBindingMode(daoProgram) === 'lease'
