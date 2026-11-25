/**
 * ARC-65 short error codes for the AbstractedAccount contracts.
 *
 * These values are the payload `loggedAssert`/`loggedErr` emits to the log
 * (format: `ERR:{code}`). They are intentionally short to minimize bytecode.
 *
 * The human-readable mapping lives in `akita-sdk/src/wallet/errors.ts` — keep
 * the two files in sync when adding or changing a code. Constant names and values use
 * camelCase. Logged values use an `err` prefix to avoid 8-byte ARC-65 messages.
 *
 * Codes that also appear in `arc58/dao/errors.ts` or `social/errors.ts`
 * (e.g. `errIpay`, `errForb`, `errIupg`, `errNexk`, `errEalw`, `errNalw`, `errEesc`, `errNesc`,
 * `errNplg`, `errEplg`, `errPexp`, `errWsup`) use the same short code intentionally so
 * cross-contract errors round-trip through any translator.
 */

// --- Admin / authorization --------------------------------------------------

export const errAdminOnly = 'errAdmn'
export const errForbidden = 'errForb'
export const errAdminCannotBeControlled = 'errAcbc'
export const errEscrowCannotBeRegularAccount = 'errEcra'
export const errCannotDefaultToEscrowWithRegularAccount = 'errCdes'
export const errSenderMustBeAdminOrControlledAddress = 'errSadm'
export const errSenderMustBeAdminPlugin = 'errSmap'
export const errOnlyCreatorCanRekey = 'errOccr'
export const errOnlyApps = 'errOapp'
export const errOnlyWalletOrPlugin = 'errOwop'
export const errOnlyFactoryCanDelete = 'errOfcd'
export const errFactoryUpdatesNotAllowed = 'errFuna'

// --- Admin-gated setters ----------------------------------------------------
// Setters that route through `_requireAdmin()` use the generic
// errAdminOnly ('errAdmn') code — no dedicated code here to save bytecode.
// That covers: setDomain, setRevocationApp, setAkitaDAO,
// setFactoryUpdateSettings, arc58_changeAdmin, and the profile setters
// (setNickname, setAvatar, setBanner, setBio).

export const errOnlyAdminCanUpdate = 'errOacu'
export const errOnlyAdminCanRekey = 'errOack'
export const errOnlyAdminCanAddPlugin = 'errOaap'
export const errOnlyAdminCanAddMethodRestriction = 'errOamr'
export const errOnlyAdminOrRevocationAppCanRemovePlugin = 'errOarp'
export const errOnlyAdminOrRevocationAppCanRemoveMethodRestriction = 'errOarm'
export const errOnlyAdminOrRevocationAppCanRemoveAllowance = 'errOara'

// --- Deployment / lifecycle -------------------------------------------------

export const errBadDeployer = 'errBdep'
export const errInvalidUpgrade = 'errIupg'
export const errWalletAlreadySetup = 'errWsup'

// --- Plugins ----------------------------------------------------------------

export const errPluginDoesNotExist = 'errNplg'
export const errPluginAlreadyExists = 'errEplg'
export const errNamedPluginAlreadyExists = 'errEnpl'
export const errPluginExpired = 'errPexp'
export const errPluginOnCooldown = 'errPcld'
export const errInvalidPluginCall = 'errIpcl'
export const errSenderNotAllowedToCallPlugin = 'errSnap'
export const errPluginDoesNotControlWallet = 'errPdcw'
export const errPluginDoesNotHaveAdminPrivileges = 'errPdap'
export const errAdminPluginsCannotUseEscrows = 'errApne'
export const errZeroAddressDelegationType = 'errZadt'
export const errUsingExecutionKeyRequiresGlobal = 'errUekg'

// --- Methods ----------------------------------------------------------------

export const errMethodDoesNotExist = 'errNmth'
export const errMethodAlreadyExists = 'errEmth'
export const errMethodOnCooldown = 'errMcld'
export const errInvalidMethodSignatureLength = 'errImsl'
export const errMalformedOffsets = 'errMoff'

// --- Rekey sandwich ---------------------------------------------------------

export const errMissingRekeyBack = 'errNrkb'
export const errCannotCallOtherAppsDuringRekey = 'errCcor'
export const errInvalidOncomplete = 'errIocn'
export const errInvalidPluginVersion = 'errIplv'
export const errInvalidSenderArg = 'errIsag'
export const errInvalidSenderValue = 'errIsvl'
export const errAuthAddrMismatch = 'errAuam'

// --- Execution keys ---------------------------------------------------------

export const errExecutionKeyNotFound = 'errNexk'
export const errExecutionNotReady = 'errExnr'
export const errExecutionExpired = 'errExxp'
export const errGroupNotFound = 'errNgrp'
export const errExecutionKeyUpdateMustMatchFirstValid = 'errEkfv'
export const errExecutionKeyUpdateMustMatchLastValid = 'errEklv'

// --- Escrows ----------------------------------------------------------------

export const errEscrowLocked = 'errEscl'
export const errEscrowInUse = 'errEuse'
export const errEscrowAlreadyExists = 'errEesc'
export const errEscrowNameRequired = 'errEnrq'
export const errEscrowDoesNotExist = 'errNesc'
export const errWrongEscrowForOperation = 'errWesc'
export const errEscrowRequiredToBeSetAsDefault = 'errErsd'
/** arc58_closeFrozenToCreator: the escrow's holding of the asset is not frozen, so arc58_reclaim returns it. */
export const errNotFrozen = 'errNfrz'

// --- Allowances -------------------------------------------------------------

export const errAllowanceAlreadyExists = 'errEalw'
export const errAllowanceDoesNotExist = 'errNalw'
export const errAllowanceExceeded = 'errAlex'
export const errInvalidAllowanceType = 'errIalt'
export const errInvalidAllowanceInterval = 'errIali'

// --- Domain keys ------------------------------------------------------------

export const errDomainMustBeLongerThanZero = 'errDml0'
export const errDomainKeyDoesNotExist = 'errNdmk'

// --- Payments ---------------------------------------------------------------

export const errInvalidPayment = 'errIpay'

// --- Fee coverage (ACC-02 / A-2) ---------------------------------------------

/** A grant anyone can call may not reimburse fees: callers choose their fee, so it would drain the wallet. */
export const errCoverFeesRequiresCaller = 'errCfgl'

// --- Wallet factory (SG-04 / ACC-08) ------------------------------------------

/** newAccount: an external controlled address did not rekey itself to the factory in this group. */
export const errControlledAddressNotProven = 'errCnap'
/** updateWallet: the target app was not created by this factory. */
export const errNotAWallet = 'errNwal'
