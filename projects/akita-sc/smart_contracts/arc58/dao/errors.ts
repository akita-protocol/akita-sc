/**
 * ARC-65 short error codes for the DAO contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/dao/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 *
 * Duplicates of account/top-level errors are intentionally re-declared here
 * (rather than imported) so the DAO can own short codes without forcing a
 * migration of the shared `account/errors.ts` or top-level `errors.ts`.
 */

// --- Top-level aliases (DAO-scoped copies of shared errors) ------------------

export const errNotAkitaDao = 'errNdao'
export const errInvalidPayment = 'errIpay'

// --- Account-scoped aliases (DAO-scoped copies of account errors) ------------

export const errForbidden = 'errForb'
export const errInvalidUpgrade = 'errIupg'
export const errWalletAlreadySetup = 'errWsup'
export const errExecutionKeyNotFound = 'errNexk'
export const errAllowanceAlreadyExists = 'errEalw'
export const errAllowanceDoesNotExist = 'errNalw'
export const errEscrowAlreadyExists = 'errEesc'
export const errEscrowDoesNotExist = 'errNesc'

// --- DAO errors --------------------------------------------------------------

export const errDaoNotInitialized = 'errNinit'
export const errEmptyActionList = 'errNact'
export const errIncorrectSender = 'errIsnd'
export const errInsufficientProposalThreshold = 'errLpow'
export const errInvalidProposalAction = 'errIact'
export const errInvalidProposalState = 'errIpst'
export const errPaymentNotRequired = 'errNpay'
export const errPaymentRequired = 'errRpay'
export const errProposalDoesNotExist = 'errNprp'
export const errProposalVoteNotFound = 'errNpvt'
export const errTooManyActions = 'errMxac'
export const errVotingDurationNotMet = 'errVdur'
export const errVotingParticipationNotMet = 'errVprt'
export const errAlreadyInitialized = 'errInit'
export const errVersionCannotBeEmpty = 'errIver'

// --- Validator errors --------------------------------------------------------

export const errActionLimitMustBeGreaterThanZero = 'errAlz0'
export const errAllowanceListEmpty = 'errLemp'
export const errInvalidCid = 'errIcid'
export const errInvalidDuration = 'errIdur'
export const errInvalidMaxApproval = 'errImxa'
export const errInvalidMaxParticipation = 'errImxp'
export const errInvalidMinParticipation = 'errImnp'
export const errInvalidMaxPower = 'errImxw'
export const errInvalidMinApproval = 'errImna'
export const errInvalidMinPower = 'errImnw'
export const errInvalidMinimumRewardsImpact = 'errImri'
export const errInvalidProposalActionLimit = 'errIpal'
export const errMinRewardsImpactMustBeGreaterThanZero = 'errMri0'
export const errMinRewardsImpactMustBeLessThanOrEqualTo1000s = 'errMri1k'
export const errNotExecutablePlugin = 'errNexe'
export const errPluginAlreadyExists = 'errEplg'
export const errPluginDoesNotExist = 'errNplg'
export const errPluginExpired = 'errPexp'

// --- Validator inline-string constants (previously inline literals) ---------

export const errUpgradeNoGroups = 'errNgrp'
export const errInvalidFirstValid = 'errIfv'
export const errInvalidLastValid = 'errIlv'
export const errUnknownField = 'errUfld'
export const errReclaimListEmpty = 'errRemp'
export const errInvalidAdmin = 'errIadm'

// --- Audit 2026-10 remediation (DAO-01 .. DAO-12) ----------------------------

/** bootstrap (creator-approved) proposals may not contain this action / window */
export const errBootstrapForbidden = 'errBsfb'
/** bootstrap proposals cannot execute once the DAO is fully initialized */
export const errBootstrapExpired = 'errBsex'
/** bootstrap execution keys are still tracked; clear them before `initialize` */
export const errBootstrapKeysOutstanding = 'errBsko'
/** only the creator may revoke a bootstrap key that is still live and unexpired */
export const errBootstrapKeyActive = 'errBska'
/** an execution key (lease) may only be registered once */
export const errExecutionKeyReused = 'errExkr'
/** vote receipts are still outstanding for this proposal */
export const errVotesOutstanding = 'errVout'
/** ChangeAdmin must be the last action of a proposal */
export const errChangeAdminNotLast = 'errCanl'
/** a vote needs time-weighted power: a lock that outlasts the vote with at least a week of it left */
export const errNoVotingPower = 'errNpow'
