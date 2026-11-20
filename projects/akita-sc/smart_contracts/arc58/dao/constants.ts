import { uint64 } from '@algorandfoundation/algorand-typescript'
import { Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { DaoState, PayoutEscrowType, ProposalActionType, ProposalStatus, ProposalVoteType } from './types'

export const AkitaDAONumGlobalBytes = 59
export const AkitaDAONumGlobalUints = 5

export const AkitaDAOGlobalStateKeysInitialized = 'initialized'
export const AkitaDAOGlobalStateKeysContentPolicy = 'content_policy'
export const AkitaDAOGlobalStateKeysWallet = 'wallet'
export const AkitaDAOGlobalStateKeysProposalActionLimit = 'proposal_action_limit'
export const AkitaDAOGlobalStateKeysMinRewardsImpact = 'min_rewards_impact'
export const AkitaDAOGlobalStateKeysAkitaAppList = 'aal'
export const AkitaDAOGlobalStateKeysAkitaSocialAppList = 'sal'
export const AkitaDAOGlobalStateKeysPluginAppList = 'pal'
export const AkitaDAOGlobalStateKeysOtherAppList = 'oal'
export const AkitaDAOGlobalStateKeysWalletFees = 'wallet_fees'
export const AkitaDAOGlobalStateKeysGuildFees = 'guild_fees'
export const AkitaDAOGlobalStateKeysSocialFees = 'social_fees'
export const AkitaDAOGlobalStateKeysStakingFees = 'staking_fees'
export const AkitaDAOGlobalStateKeysSubscriptionFees = 'subscription_fees'
export const AkitaDAOGlobalStateKeysSwapFees = 'swap_fees'
export const AkitaDAOGlobalStateKeysNFTFees = 'nft_fees'

export const AkitaDAOGlobalStateKeysAkitaAssets = 'akita_assets'
export const AkitaDAOGlobalStateKeysRevenueSplits = 'revenue_splits'
export const AkitaDAOGlobalStateKeysUpgradeAppProposalSettings = 'upgrade_app_ps'
export const AkitaDAOGlobalStateKeysAddPluginProposalSettings = 'add_plugin_ps'
export const AkitaDAOGlobalStateKeysRemovePluginProposalSettings = 'remove_plugin_ps'
export const AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings = 'remove_execute_plugin_ps'
export const AkitaDAOGlobalStateKeysAddAllowancesProposalSettings = 'add_allowance_ps'
export const AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings = 'remove_allowance_ps'
export const AkitaDAOGlobalStateKeysNewEscrowProposalSettings = 'new_escrow_ps'
export const AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings = 'toggle_escrow_lock_ps'
export const AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings = 'update_fields_ps'

export const AkitaDAOGlobalStateKeysRevocationAddress = 'revocation_address'
export const AkitaDAOGlobalStateKeysProposalID = 'proposal_id'
/** number of bootstrap execution keys that are still tracked (must be 0 before `initialize`) */
export const AkitaDAOGlobalStateKeysBootstrapKeyCount = 'bootstrap_key_count'
export const AkitaDAOGlobalStateKeysDisbursementCursor = 'disbursement_cursor'

export const AkitaDAOBoxPrefixProposals = 'l'
/** legacy vote receipts (power only) */
export const AkitaDAOBoxPrefixProposalVotes = 'v'
/** vote receipts: power and weight */
export const AkitaDAOBoxPrefixVoteReceipts = 'w'
/** governance participation record per voter, kept after vote receipts are deleted */
export const AkitaDAOBoxPrefixParticipation = 'r'
export const AkitaDAOBoxPrefixExecutions = 'x'
/** per-proposal tally: settings snapshot + outstanding vote receipts (created at submit) */
export const AkitaDAOBoxPrefixTallies = 't'
/** execution keys registered by bootstrap (creator-approved) proposals: lease -> lastValid */
export const AkitaDAOBoxPrefixBootstrapKeys = 'b'
/** live UpgradeApp execution keys per target app: app id -> (lease, lastValid)[] (read by the Update plugin) */
export const AkitaDAOBoxPrefixUpgradeLeases = 'u'
/** caller-scoped plugin grants added by bootstrap proposals (a public record; they survive initialize): wallet plugin key -> round added */
export const AkitaDAOBoxPrefixBootstrapGrants = 'g'

// escrows - for payouts
export const AkitaDAOEscrowAccountKrby = 'krby'
export const AkitaDAOEscrowAccountModerators = 'moderators'
export const AkitaDAOEscrowAccountGovernors = 'governors'
// escrows - for receives
export const AkitaDAOEscrowAccountWallet = 'rev_wallet'
export const AkitaDAOEscrowAccountSocial = 'rev_social'
export const AkitaDAOEscrowAccountStakingPools = 'rev_pool'
export const AkitaDAOEscrowAccountSubscriptions = 'rev_subscriptions'
export const AkitaDAOEscrowAccountMarketplace = 'rev_marketplace'
export const AkitaDAOEscrowAccountAuctions = 'rev_auctions'
export const AkitaDAOEscrowAccountRaffles = 'rev_raffles'

export const MethodRestrictionByteLength: uint64 = 20

// export const MinDAOPluginMBR: uint64 = 50_500
// export const MinDAONamedPluginMBR: uint64 = 18_900
// export const MinDAOEscrowMBR: uint64 = 6_100
// export const DAOReceiveEscrowsMBR: uint64 = 32_900
// export const DAOReceiveAssetsMBR: uint64 = 9_300
// export const MinDAOPayoutEscrowsMBR: uint64 = 8_100
// export const DAOAllowanceMBR: uint64 = 29_300
// export const MinDAOProposalsMBR: uint64 = 42_100
export const MinDAOPluginMBR: uint64 = 23_700
export const MinDAOProposalMBR: uint64 = 54_500
export const MinDAOProposalActionMbr: uint64 = 7
/** 'w' + ProposalVoteKey (40 bytes) + ProposalVoteReceipt (17 bytes) */
export const DAOProposalVotesMBR: uint64 = 2_500 + (400 * (41 + 17))
/** 'v' + ProposalVoteKey (40 bytes) + ProposalVoteInfo (9 bytes): refunded when a legacy receipt goes */
export const DAOLegacyProposalVotesMBR: uint64 = 2_500 + (400 * (41 + 9))
/** 'r' + address (33 bytes) + GovernanceParticipation (24 bytes): paid with the voter's first vote */
export const DAOParticipationMBR: uint64 = 2_500 + (400 * (33 + 24))
export const DAOExecutionMBR: uint64 = 22_100
/** 't' + uint64 key (9 bytes) + ProposalTally (6 x uint64 = 48 bytes) */
export const DAOProposalTallyMBR: uint64 = 2_500 + (400 * (9 + 48))
/** 'b' + 32 byte lease key (33 bytes) + uint64 lastValid (8 bytes) */
export const DAOBootstrapKeyMBR: uint64 = 2_500 + (400 * (33 + 8))
/** 'u' + uint64 app id (9 bytes) + array header (2) + one (lease, lastValid) entry (40); charged per UpgradeApp */
export const DAOUpgradeLeaseMBR: uint64 = 2_500 + (400 * (9 + 2 + 40))
/** bootstrap execution keys may not stay valid longer than this many rounds after execution (~8h) */
export const MaxBootstrapKeyRounds: uint64 = 10_000
/** governance power counts at most this many days of remaining lock time (DAO-05) */
export const MaxGovernanceLockDays: uint64 = 365
/** upper bound on the proposal-creation power setting, in base units (power never exceeds the locked amount) */
export const MaxProposalPower: uint64 = 1_000_000_000_000_000

// export const DAOExecutionsMBR: uint64 = 0

export const DaoStateDraft: DaoState = new Uint8(0)
export const DaoStatePartiallyInitialized: DaoState = new Uint8(1)
export const DaoStateFullyInitialized: DaoState = new Uint8(2)

export const DAOPayoutEscrowIndividualByteLength: uint64 = 32
export const DAOPayoutEscrowGroupByteLength: uint64 = 8

export const PayoutEscrowTypeIndividual: PayoutEscrowType = new Uint8(10)
export const PayoutEscrowTypeGroup: PayoutEscrowType = new Uint8(20)

// proposal statuses
export const ProposalStatusDraft: ProposalStatus = new Uint8(0)
export const ProposalStatusInvalid: ProposalStatus = new Uint8(10)
export const ProposalStatusVoting: ProposalStatus = new Uint8(20)
export const ProposalStatusRejected: ProposalStatus = new Uint8(30)
export const ProposalStatusApproved: ProposalStatus = new Uint8(40)
export const ProposalStatusExecuted: ProposalStatus = new Uint8(50)

// proposal actions
export const ProposalActionTypeUpgradeApp: ProposalActionType = new Uint8(10)
export const ProposalActionTypeAddPlugin: ProposalActionType = new Uint8(20)
export const ProposalActionTypeAddNamedPlugin: ProposalActionType = new Uint8(21)
export const ProposalActionTypeExecutePlugin: ProposalActionType = new Uint8(30)
export const ProposalActionTypeRemoveExecutePlugin: ProposalActionType = new Uint8(31)
export const ProposalActionTypeRemovePlugin: ProposalActionType = new Uint8(40)
export const ProposalActionTypeRemoveNamedPlugin: ProposalActionType = new Uint8(41)
export const ProposalActionTypeAddAllowances: ProposalActionType = new Uint8(50)
export const ProposalActionTypeRemoveAllowances: ProposalActionType = new Uint8(60)
export const ProposalActionTypeNewEscrow: ProposalActionType = new Uint8(70)
export const ProposalActionTypeToggleEscrowLock: ProposalActionType = new Uint8(71)
export const ProposalActionTypeReclaim: ProposalActionType = new Uint8(72)
export const ProposalActionTypeDeleteEscrow: ProposalActionType = new Uint8(73)
export const ProposalActionTypeUpdateFields: ProposalActionType = new Uint8(80)
export const ProposalActionTypeUpdateWallet: ProposalActionType = new Uint8(90)
export const ProposalActionTypeChangeAdmin: ProposalActionType = new Uint8(91)

// proposal vote types
export const ProposalVoteTypeApprove: ProposalVoteType = new Uint8(10)
export const ProposalVoteTypeReject: ProposalVoteType = new Uint8(20)
export const ProposalVoteTypeAbstain: ProposalVoteType = new Uint8(30)
