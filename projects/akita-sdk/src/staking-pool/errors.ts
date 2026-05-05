/**
 * ARC-65 error codes emitted by the StakingPool contracts.
 *
 * The contract logs `ERR:{code}` via `loggedAssert` / `loggedErr` before
 * failing, where `code` is one of the short alphanumeric tags in this file.
 * Keep this in sync with `akita-sc/smart_contracts/staking-pool/errors.ts` —
 * the short codes are the shared wire format between contract and SDK.
 *
 * Use `translateStakingPoolError(code)` to turn a code back into a
 * human-readable message for display in a UI or log.
 */

import { makeErrorTranslator } from '../errors'

/**
 * Short code → human-readable message for every error the StakingPool
 * contracts can emit. Ordered roughly the same way as the contract-side file.
 */
export const STAKING_POOL_ERROR_MESSAGES: Record<string, string> = {
  // --- Reward validation --------------------------------------------------
  SKYR: 'Stake key required',
  RMGZ: 'Rate must be greater than zero',
  RMGW: 'Rate must be greater than winner count',
  MEGR: 'Max entries cannot be greater than rate',

  // --- Disbursement state -------------------------------------------------
  NEFD: 'Not enough funds',
  NRTD: 'Not ready to disburse',
  IDPH: 'Invalid disbursement phase',
  WTAE: 'Winning tickets already exist',
  IPTC: 'Invalid pool type for check',
  DNRF: 'Disbursement not ready for finalization',
  RNFD: 'Reward does not exist',
  RAID: 'Reward is already in a disbursement phase',
  DWNO: 'Distribution window is not open',
  URRT: 'Unknown reward rate type',

  // --- Pool lifecycle -----------------------------------------------------
  PMBD: 'Pool must be in draft state',
  PNDE: 'Pool must be in draft or ended',
  PNLV: 'Pool is not live',
  SUNO: 'Pool signups are not open',
  PMER: 'Pool has reached maximum entries',
  FOIN: 'Only the factory can init the pool',
  FODE: 'Only the factory can delete the pool',
  CODE: 'Only the creator can delete the pool',
  COFZ: 'Only the creator can finalize the pool',

  // --- Finalize timestamps ------------------------------------------------
  ISUT: 'Signup timestamp must be zero (with late signups) or in the future',
  ISTT: 'Start timestamp must be zero or in the future',
  ISZL: 'If the start timestamp is zero, signup must be zero and allowLateSignups must be true',
  IETT: 'End timestamp must be zero or after the start timestamp + 10',

  // --- Asset / opt-in -----------------------------------------------------
  NALG: 'Must be an Algo asset',
  MBAS: 'Must be an ASA',
  DNOI: 'DAO is not opted in to the asset',

  // --- Entry validation ---------------------------------------------------
  QBMS: 'Quantity is less than minimum stake amount',
  FSVF: 'Failed to verify stake requirements',
  UBLO: 'User does not have minimum balance',
  USLO: 'User does not have enough staked',

  // --- Gate ---------------------------------------------------------------
  GINS: 'Gate id is not set',
  GIST: 'Gate id is set',

  // --- Staking-pool plugin ------------------------------------------------
  NVPL: 'Not a valid staking pool',
}

/**
 * Translates a short StakingPool error code (or raw ARC-65 log entry) into a
 * human-readable message. Falls back to the common error table when the code
 * isn't domain-specific. Unknown codes pass through as-is.
 */
export const translateStakingPoolError = makeErrorTranslator(STAKING_POOL_ERROR_MESSAGES)
