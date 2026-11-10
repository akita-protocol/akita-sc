/**
 * ARC-65 short error codes for Guild contracts.
 *
 * These values are emitted by `loggedAssert` and `loggedErr` as
 * `ERR:{code}` payloads.
 */

// --- Authorization and lifecycle -------------------------------------------

export const errGuildFactoryOnly = 'errGfac'
export const errGuildCreatorOnly = 'errGcrt'
export const errGuildDraftOnly = 'errGdrf'
export const errGuildNotActive = 'errGact'
export const errGuildAlreadyInitialized = 'errGini'

// --- Wallet and plugin configuration ---------------------------------------

export const errGuildWalletRequired = 'errGwlr'
export const errGuildWalletAlreadySet = 'errGwst'
export const errGuildInvalidWallet = 'errGwlk'
export const errGuildInvalidWalletFactory = 'errGwlf'
export const errGuildPluginSetLocked = 'errGplk'

// --- Configuration and payments --------------------------------------------

export const errGuildInvalidSettings = 'errGset'
export const errGuildInvalidVersion = 'errGver'
export const errGuildInvalidType = 'errGtyp'
export const errGuildInvalidPayment = 'errGpay'
export const errGuildInvalidAction = 'errGacn'
export const errGuildTooManyActions = 'errGmax'
export const errGuildInvalidConsensus = 'errGcns'
export const errGuildInvalidConsensusAction = 'errGcac'
export const errGuildInvalidAdmin = 'errGadm'

// --- Proposals and voting ---------------------------------------------------

export const errGuildInvalidProposal = 'errGprp'
export const errGuildInvalidProposalState = 'errGpst'
export const errGuildInvalidVote = 'errGvot'
export const errGuildAlreadyVoted = 'errGavt'
export const errGuildVoteMissing = 'errGvmg'
export const errGuildNoGovernancePower = 'errGpwr'
export const errGuildVotingOpen = 'errGopn'
export const errGuildUnsafeSnapshot = 'errGsnp'

// --- Fixed signer consensus -------------------------------------------------

export const errGuildInvalidMember = 'errGmem'
export const errGuildInvalidThreshold = 'errGthr'
export const errGuildMemberExists = 'errGmex'
export const errGuildMemberMissing = 'errGmmi'
export const errGuildTooManyMembers = 'errGmlm'
export const errGuildMembershipLocked = 'errGmlk'
export const errGuildInvalidWeight = 'errGwgt'
export const errGuildLockout = 'errGlko'

// --- External consensus dependencies ---------------------------------------

export const errGuildInvalidAsset = 'errGast'
export const errGuildInvalidStaking = 'errGstk'
export const errGuildInvalidSubscription = 'errGsub'
export const errGuildOfferingExists = 'errGoex'
export const errGuildOfferingMissing = 'errGomi'
