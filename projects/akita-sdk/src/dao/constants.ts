export enum ProposalActionEnum {
  UpgradeApp = 10,
  AddPlugin = 20,
  AddNamedPlugin = 21,
  ExecutePlugin = 30,
  RemoveExecutePlugin = 31,
  RemovePlugin = 40,
  RemoveNamedPlugin = 41,
  AddAllowances = 50,
  RemoveAllowances = 60,
  NewEscrow = 70,
  ToggleEscrowLock = 71,
  Reclaim = 72,
  DeleteEscrow = 73,
  UpdateFields = 80,
  UpdateWallet = 90,
  ChangeAdmin = 91,
}

export const EMPTY_CID = Buffer.from('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

/** Deposit for a vote receipt ('w' + proposal id + voter -> type, power, weight). */
export const DAOProposalVotesMBR: bigint = 25_700n

/** Deposit of a legacy vote receipt ('v' box): refunded when it is deleted or replaced by a re-vote. */
export const DAOLegacyProposalVotesMBR: bigint = 22_500n

/** Deposit for a voter's participation record ('r' + address), paid with the first vote and never refunded. */
export const DAOParticipationMBR: bigint = 25_300n

export const DAOVoteReceiptBoxPrefix = 'w'
export const DAOLegacyVoteReceiptBoxPrefix = 'v'
export const DAOParticipationBoxPrefix = 'r'

/** Proposal statuses as stored on-chain. `Invalid` is set by `cancelProposal`. */
export enum ProposalStatusEnum {
  Draft = 0,
  Invalid = 10,
  Voting = 20,
  Rejected = 30,
  Approved = 40,
  Executed = 50,
}

/** Tally box (voting-rule and locked-stake snapshot, vote count, participating tokens) created when a proposal is submitted. Included in `proposalCost`. */
export const DAOProposalTallyMBR: bigint = 25_300n

/** Bootstrap execution keys may stay valid at most this many rounds after execution. */
export const MaxBootstrapKeyRounds: bigint = 10_000n

/** Box-name prefix of bootstrap execution keys tracked by the DAO ('b' + 32-byte lease). */
export const DAOBootstrapKeyBoxPrefix = 'b'
