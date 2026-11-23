import { uint64 } from '@algorandfoundation/algorand-typescript'
import { Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import type { FixedSignerWeightMode, GuildActionType, GuildProposalStatus, GuildState, GuildVoteType } from './types'

// schema
// The Guild uses 12 byte-slice keys and 8 uint keys today; the remainder is headroom for governed upgrades.
export const GuildNumGlobalBytes = 24
export const GuildNumGlobalUints = 12
export const GuildConsensusNumGlobalBytes = 8
export const GuildConsensusNumGlobalUints = 12

// Guild global state
export const GuildGlobalStateKeyState = 'state'
export const GuildGlobalStateKeyConsensus = 'consensus'
export const GuildGlobalStateKeyCreator = 'creator'
export const GuildGlobalStateKeyWallet = 'wallet'
export const GuildGlobalStateKeyWalletFactory = 'wallet_factory'
export const GuildGlobalStateKeyProposalActionLimit = 'proposal_action_limit'
export const GuildGlobalStateKeyProposalID = 'proposal_id'
export const GuildGlobalStateKeyPluginSetLocked = 'plugins_locked'
export const GuildGlobalStateKeyReserved = 'reserved'
export const GuildGlobalStateKeyUpgradeAppProposalSettings = 'upgrade_app_ps'
export const GuildGlobalStateKeyAddPluginProposalSettings = 'add_plugin_ps'
export const GuildGlobalStateKeyRemoveExecutionProposalSettings = 'remove_execution_ps'
export const GuildGlobalStateKeyRemovePluginProposalSettings = 'remove_plugin_ps'
export const GuildGlobalStateKeyAddAllowancesProposalSettings = 'add_allowances_ps'
export const GuildGlobalStateKeyRemoveAllowancesProposalSettings = 'remove_allowances_ps'
export const GuildGlobalStateKeyNewEscrowProposalSettings = 'new_escrow_ps'
export const GuildGlobalStateKeyToggleEscrowLockProposalSettings = 'toggle_escrow_ps'
export const GuildGlobalStateKeyUpdateGuildProposalSettings = 'update_guild_ps'
export const GuildGlobalStateKeyFeeAsset = 'fee_asset'
export const GuildGlobalStateKeyChatLock = 'chat_lock'

// consensus global state
export const FixedSignerConsensusGlobalStateKeyThreshold = 'signer_threshold'
export const FixedSignerConsensusGlobalStateKeyMemberCount = 'member_count'
export const FixedSignerConsensusGlobalStateKeyEligiblePower = 'member_power'
export const FixedSignerConsensusGlobalStateKeyMembershipLocked = 'members_locked'
export const FixedSignerConsensusGlobalStateKeyWeightMode = 'weight_mode'
export const FixedSignerConsensusGlobalStateKeyMembershipEpoch = 'membership_epoch'
export const FixedSignerConsensusGlobalStateKeyMaximumMemberWeight = 'maximum_member_weight'
export const TokenConsensusGlobalStateKeyAsset = 'voting_asset'
export const LockedTokenConsensusGlobalStateKeyStaking = 'staking_app'
export const LockedTokenConsensusGlobalStateKeyMinimumApprovals = 'lock_approvals'
export const SubscriptionConsensusGlobalStateKeySubscriptions = 'subscriptions_app'
export const SubscriptionConsensusGlobalStateKeyOfferingCount = 'offering_count'
export const SubscriptionConsensusGlobalStateKeyMinimumApprovals = 'sub_approvals'
export const SubscriptionConsensusGlobalStateKeyOfferingEpoch = 'offering_epoch'
export const LockedTokenConsensusGlobalStateKeyUnit = 'voting_unit'
export const SubscriptionConsensusGlobalStateKeyMaximumWeight = 'max_offering_weight'

export const GuildConsensusGlobalStateKeyGuild = 'guild'
export const GuildConsensusGlobalStateKeyActiveBallots = 'active_ballots'
export const GuildConsensusGlobalStateKeyActivated = 'activated'

// boxes
export const GuildBoxPrefixPlugins = 'g'
export const GuildBoxPrefixProposals = 'l'
export const GuildBoxPrefixExecutions = 'x'
export const GuildBoxPrefixConsensusActions = 'c'
export const GuildBoxPrefixFeeTokenReserves = 'f'
export const GuildConsensusBoxPrefixMembers = 'm'
export const GuildConsensusBoxPrefixBallots = 'b'
export const GuildConsensusBoxPrefixVotes = 'v'
export const GuildConsensusBoxPrefixMemberHistory = 'h'
export const GuildConsensusBoxPrefixMemberSnapshots = 's'
/** `c || SHA-256(chat group ID)` holds the agent that acts for the Guild in that chat. */
export const GuildConsensusBoxPrefixChatStewards = 'c'
export const GuildConsensusBoxKeyMemberWeights = 'w'
export const SubscriptionConsensusBoxPrefixOfferings = 'o'
export const SubscriptionConsensusBoxPrefixOfferingHistory = 'h'
export const SubscriptionConsensusBoxPrefixSnapshots = 's'
/** Multiset of live offering weights, 8 bytes per slot (0 = free). */
export const SubscriptionConsensusBoxKeyOfferingWeights = 'w'

// limits
export const MAX_GUILD_VOTING_DURATION: uint64 = 31_536_000
export const MAX_GUILD_PROPOSAL_ACTIONS: uint64 = 12
/** Match AkitaDAO's proposer-power ceiling and prevent unreachable uint64 configuration mistakes. */
export const MAX_GUILD_PROPOSAL_POWER: uint64 = 1_000

// MBR
// Box MBR = 2_500 + 400 * (encoded key bytes + encoded value bytes).
export const GuildPluginMBR: uint64 = 26_900
// prefix + ID = 9 key bytes; status, CID, creator, payer, fee token payer, 5 uint64 values and the
// empty action list = 177 value bytes.
export const MinGuildProposalMBR: uint64 = 76_900
export const MinGuildProposalActionMbr: uint64 = 7
export const GuildVoteMBR: uint64 = 22_500
// 2 packed bools + 9 uint64 values = 73 value bytes; prefix + ID = 9 key bytes.
export const GuildConsensusBallotMBR: uint64 = 35_300
// prefix + 32-byte chat key = 33 key bytes; the steward's address = 32 value bytes.
export const GuildChatStewardMBR: uint64 = 28_500
export const GuildExecutionMBR: uint64 = 22_100
// prefix + uint64 code = 9 key bytes; 6 uint64 settings = 48 value bytes.
export const GuildConsensusActionSettingsMBR: uint64 = 25_300
// prefix + uint64 asset = 9 key bytes; uint64 reserved amount = 8 value bytes.
export const GuildFeeTokenReserveMBR: uint64 = 9_300
export const FixedSignerMemberMBR: uint64 = 25_300
export const FixedSignerHistoryMBR: uint64 = 25_300
export const FixedSignerSnapshotMBR: uint64 = 9_700
export const FixedSignerWeightSlotMBR: uint64 = 3_200
export const FixedSignerWeightsBoxMBR: uint64 = 2_900
export const MAX_FIXED_SIGNER_MEMBERS: uint64 = 256
// prefix + uint64 service ID = 9 key bytes; weight + since = 16 value bytes.
export const SubscriptionOfferingMBR: uint64 = 12_500
// prefix + (uint64 service ID, uint64 since) = 17 key bytes; weight + until = 16 value bytes.
export const SubscriptionOfferingHistoryMBR: uint64 = 15_700
// prefix + uint64 proposal ID = 9 key bytes; offering epoch + opening time = 16 value bytes.
export const SubscriptionSnapshotMBR: uint64 = 12_500
// one 8-byte offering weight slot; the slot box itself costs 2_500 + 400 * 1-byte key.
export const SubscriptionWeightSlotMBR: uint64 = 3_200
export const SubscriptionWeightsBoxMBR: uint64 = 2_900
/** Bounds the offering-weight scan and keeps the slot box within one box read. */
export const MAX_SUBSCRIPTION_OFFERINGS: uint64 = 64
/** Locked-token power is expressed in whole tokens; 10^19 is the largest power of ten in a uint64. */
export const MAX_LOCKED_TOKEN_DECIMALS: uint64 = 19

// fixed signer weight modes
export const FixedSignerWeightModeEqual: FixedSignerWeightMode = new Uint8(1)
export const FixedSignerWeightModeAssigned: FixedSignerWeightMode = new Uint8(2)

// lifecycle state
export const GuildStateDraft: GuildState = new Uint8(0)
export const GuildStatePartiallyInitialized: GuildState = new Uint8(1)
export const GuildStateFullyInitialized: GuildState = new Uint8(2)

// proposal statuses
export const GuildProposalStatusDraft: GuildProposalStatus = new Uint8(0)
/** An approved proposal its proposer cancelled before execution; its execution reserve was refunded. */
export const GuildProposalStatusInvalid: GuildProposalStatus = new Uint8(10)
export const GuildProposalStatusVoting: GuildProposalStatus = new Uint8(20)
export const GuildProposalStatusRejected: GuildProposalStatus = new Uint8(30)
export const GuildProposalStatusApproved: GuildProposalStatus = new Uint8(40)
export const GuildProposalStatusExecuted: GuildProposalStatus = new Uint8(50)

// proposal vote types
export const GuildVoteApprove: GuildVoteType = new Uint8(10)
export const GuildVoteReject: GuildVoteType = new Uint8(20)
export const GuildVoteAbstain: GuildVoteType = new Uint8(30)

// proposal actions
export const GuildActionUpgradeApp: GuildActionType = new Uint8(10)
export const GuildActionAddPlugin: GuildActionType = new Uint8(20)
export const GuildActionAddNamedPlugin: GuildActionType = new Uint8(21)
/** Replace the execution-proposal settings of an installed plugin; allowed even when the plugin set is locked. */
export const GuildActionSetPluginSettings: GuildActionType = new Uint8(22)
export const GuildActionExecutePlugin: GuildActionType = new Uint8(30)
export const GuildActionRemoveExecution: GuildActionType = new Uint8(31)
export const GuildActionRemovePlugin: GuildActionType = new Uint8(40)
export const GuildActionRemoveNamedPlugin: GuildActionType = new Uint8(41)
export const GuildActionAddAllowances: GuildActionType = new Uint8(50)
export const GuildActionRemoveAllowances: GuildActionType = new Uint8(60)
export const GuildActionNewEscrow: GuildActionType = new Uint8(70)
export const GuildActionToggleEscrowLock: GuildActionType = new Uint8(71)
export const GuildActionReclaim: GuildActionType = new Uint8(72)
export const GuildActionDeleteEscrow: GuildActionType = new Uint8(73)
export const GuildActionSetProposalSettings: GuildActionType = new Uint8(80)
export const GuildActionSetProposalActionLimit: GuildActionType = new Uint8(81)
/** Create a fresh ARC-58 wallet through the DAO wallet factory; the Guild never adopts an existing wallet. */
export const GuildActionNewWallet: GuildActionType = new Uint8(82)
/** Opaque policy action; the first data byte is a policy-defined code the Guild uses only to select settings. */
export const GuildActionConsensus: GuildActionType = new Uint8(83)
export const GuildActionSetConsensusActionSettings: GuildActionType = new Uint8(84)
export const GuildActionSetFeeAsset: GuildActionType = new Uint8(85)
/**
 * Name the agent that acts for the Guild in one chat, or revoke it with the zero address.
 * The first one a Guild sets seals its program: see `chatLock`.
 */
export const GuildActionSetChatSteward: GuildActionType = new Uint8(86)
export const GuildActionUpdateWallet: GuildActionType = new Uint8(90)
export const GuildActionChangeAdmin: GuildActionType = new Uint8(91)
export const GuildActionFullyInitialize: GuildActionType = new Uint8(100)
export const GuildActionLockPluginSet: GuildActionType = new Uint8(110)
