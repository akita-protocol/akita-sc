import { Account, Application, bytes, uint64 } from '@algorandfoundation/algorand-typescript'
import { Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import type { CID } from '../../../utils/types/base'
import type { AddAllowanceInfo, EscrowReclaim, MethodRestriction } from '../../account/types'

export type GuildState = Uint8
export type GuildActionType = Uint8
export type GuildProposalStatus = Uint8
export type GuildVoteType = Uint8
export type FixedSignerWeightMode = Uint8

/** Consensus requirements attached to one class of Guild action. */
export type GuildProposalSettings = {
  fee: uint64
  power: uint64
  duration: uint64
  participation: uint64
  approval: uint64
  minimumApprovals: uint64
}

/** Settings for each generic action supported by the Guild proposal engine. */
export type GuildProposalSettingsConfig = {
  upgradeApp: GuildProposalSettings
  addPlugin: GuildProposalSettings
  removeExecution: GuildProposalSettings
  removePlugin: GuildProposalSettings
  addAllowances: GuildProposalSettings
  removeAllowances: GuildProposalSettings
  newEscrow: GuildProposalSettings
  toggleEscrowLock: GuildProposalSettings
  updateGuild: GuildProposalSettings
}

/** Configuration shared by every Guild regardless of its consensus mechanism. */
export type GuildBaseConfig = {
  proposalActionLimit: uint64
  proposalSettings: GuildProposalSettingsConfig
}

export type GuildProposalAction = {
  type: GuildActionType
  data: bytes
}

export type GuildVoteTotals = {
  approvals: uint64
  rejections: uint64
  abstains: uint64
}

/**
 * A Guild proposal follows the AkitaDAO draft/submit/vote/finalize lifecycle.
 *
 * `feesPaid` tracks the proposer funds the Guild still holds for this proposal:
 * the full prepayment while in draft, only the execution reserve once voting
 * begins, and zero after the proposal is rejected or executed.
 *
 * `feeAsset` is the Guild's fee asset when the proposal was drafted (0 = ALGO). When it is not ALGO,
 * `feesPaid` holds only microALGO and `feeTokensPaid` holds the fee paid in that asset while in draft.
 *
 * `creator` owns the proposal: only they edit, submit, delete or cancel it. `payer` is whoever paid the
 * microALGO in `feesPaid`, and `feeTokenPayer` whoever paid `feeTokensPaid`; each is the creator unless
 * someone else funded the proposal for them. Every refund goes back to the account that paid it.
 */
export type GuildProposal = {
  status: GuildProposalStatus
  cid: CID
  creator: Account
  payer: Account
  feeTokenPayer: Account
  votingTs: uint64
  created: uint64
  feesPaid: uint64
  feeAsset: uint64
  feeTokensPaid: uint64
  actions: GuildProposalAction[]
}

export type GuildVoteKey = {
  proposalID: uint64
  voter: Account
}

export type GuildVote = {
  type: GuildVoteType
  power: uint64
}

/** Consensus parameters frozen when a proposal enters voting. */
export type GuildConsensusRequirements = {
  participation: uint64
  approval: uint64
  minimumApprovals: uint64
}

/** Ballot state is owned by the Guild's dedicated consensus application. */
export type GuildConsensusBallot = {
  resolved: boolean
  approved: boolean
  votingEnd: uint64
  eligiblePower: uint64
  voteCount: uint64
  requirements: GuildConsensusRequirements
  votes: GuildVoteTotals
}

export type GuildConsensusResult = {
  approved: boolean
  approvals: uint64
  rejections: uint64
  abstains: uint64
  eligiblePower: uint64
}

export type GuildExecutionMetadata = {
  proposalID: uint64
  index: uint64
}

export type GuildPluginKey = {
  plugin: uint64
  escrow: string
}

export type GuildProposalCostInfo = {
  total: uint64
  mbr: uint64
  fee: uint64
  power: uint64
  duration: uint64
  participation: uint64
  approval: uint64
  minimumApprovals: uint64
  /** asset `fee` is paid in; 0 = ALGO, when `total` includes `fee`. Otherwise `total` is ALGO only. */
  feeAsset: uint64
}

// CONSENSUS CONFIGURATION ------------------------------------------------------------------------

export type FixedSignerConsensusConfig = { threshold: uint64 }
export type FixedSignerMember = { account: Account; weight: uint64 }
export type FixedSignerConsensusConfiguration = { mode: FixedSignerWeightMode; members: FixedSignerMember[] }
export type LockedTokenConsensusConfig = { staking: uint64; asset: uint64; minimumApprovals: uint64 }
export type SubscriptionConsensusConfig = {
  subscriptions: uint64
  minimumApprovals: uint64
}
/**
 * A subscription service the consensus app creates and owns. Services are ALGO-priced, ungated, and
 * pay out to the Guild application, whose free balance `sweep()` forwards to the treasury.
 */
export type SubscriptionOffering = {
  interval: uint64
  amount: uint64
  title: string
  bannerImage: CID
  highlightMessage: Uint8
  highlightColor: bytes<3>
  weight: uint64
}
export type SubscriptionConsensusConfiguration = SubscriptionOffering[]

// CONSENSUS ACTION PAYLOADS ----------------------------------------------------------------------
// A Guild consensus action is `uint8 code || ABI payload`. Codes and payloads are owned by each
// policy; the Guild treats them as opaque and only uses the code to select proposal settings.

export type FixedSignerActionAddMembers = { mode: FixedSignerWeightMode; members: FixedSignerMember[] }
export type FixedSignerActionRemoveMember = { member: Account }
export type FixedSignerActionSetMemberWeight = { member: Account; weight: uint64 }
export type FixedSignerActionSetThreshold = { threshold: uint64 }
export type FixedSignerActionSetWeightMode = { mode: FixedSignerWeightMode }
export type SubscriptionActionSetOfferingWeight = { serviceID: uint64; weight: uint64 }
export type SubscriptionActionRemoveOffering = { serviceID: uint64 }
export type ConsensusActionSetMinimumApprovals = { minimumApprovals: uint64 }

/** Immutable Guild/consensus pair returned by the permissionless factory. */
export type GuildDeployment = {
  guild: Application
  consensus: Application
}

// GUILD ACTION PAYLOADS --------------------------------------------------------------------------

export type GuildProposalUpgradeApp = {
  app: uint64
  executionKey: bytes<32>
  groups: bytes<32>[]
  firstValid: uint64
  lastValid: uint64
}

export type GuildProposalAddPlugin = {
  plugin: uint64
  caller: Account
  escrow: string
  delegationType: Uint8
  lastValid: uint64
  cooldown: uint64
  methods: MethodRestriction[]
  useRounds: boolean
  useExecutionKey: boolean
  coverFees: boolean
  defaultToEscrow: boolean
  fee: uint64
  power: uint64
  duration: uint64
  participation: uint64
  approval: uint64
  minimumApprovals: uint64
  allowances: AddAllowanceInfo[]
}

export type GuildProposalAddNamedPlugin = {
  name: string
  plugin: uint64
  caller: Account
  escrow: string
  delegationType: Uint8
  lastValid: uint64
  cooldown: uint64
  methods: MethodRestriction[]
  useRounds: boolean
  useExecutionKey: boolean
  coverFees: boolean
  defaultToEscrow: boolean
  fee: uint64
  power: uint64
  duration: uint64
  participation: uint64
  approval: uint64
  minimumApprovals: uint64
  allowances: AddAllowanceInfo[]
}

export type GuildProposalExecution = {
  plugin: uint64
  escrow: string
  executionKey: bytes<32>
  groups: bytes<32>[]
  firstValid: uint64
  lastValid: uint64
}

export type GuildProposalRemoveExecution = { executionKey: bytes<32> }

export type GuildProposalRemovePlugin = {
  plugin: uint64
  caller: Account
  escrow: string
}

export type GuildProposalRemoveNamedPlugin = {
  name: string
  plugin: uint64
  caller: Account
  escrow: string
}

export type GuildProposalAddAllowances = {
  escrow: string
  allowances: AddAllowanceInfo[]
}

export type GuildProposalRemoveAllowances = {
  escrow: string
  assets: uint64[]
}

export type GuildProposalNewEscrow = {
  escrow: string
  address: Account
}

export type GuildProposalToggleEscrowLock = { escrow: string }
export type GuildProposalReclaim = { escrow: string; reclaims: EscrowReclaim[] }
export type GuildProposalSetSettings = { actionType: GuildActionType; settings: GuildProposalSettings }
export type GuildProposalSetActionLimit = { limit: uint64 }
export type GuildProposalNewWallet = { nickname: string; salt: bytes<32> }
export type GuildProposalSetPluginSettings = { plugin: uint64; escrow: string; settings: GuildProposalSettings }
export type GuildProposalConsensusActionSettings = { code: uint64; settings: GuildProposalSettings }
export type GuildProposalChangeAdmin = { admin: Account }
export type GuildProposalSetFeeAsset = { asset: uint64 }
