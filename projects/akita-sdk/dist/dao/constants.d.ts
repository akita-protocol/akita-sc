export declare enum ProposalActionEnum {
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
    ChangeAdmin = 91
}
export declare const EMPTY_CID: Buffer<ArrayBuffer>;
/** Deposit for a vote receipt ('w' + proposal id + voter -> type, power, weight). */
export declare const DAOProposalVotesMBR: bigint;
/** Deposit of a legacy vote receipt ('v' box): refunded when it is deleted or replaced by a re-vote. */
export declare const DAOLegacyProposalVotesMBR: bigint;
/** Deposit for a voter's participation record ('r' + address), paid with the first vote and never refunded. */
export declare const DAOParticipationMBR: bigint;
export declare const DAOVoteReceiptBoxPrefix = "w";
export declare const DAOLegacyVoteReceiptBoxPrefix = "v";
export declare const DAOParticipationBoxPrefix = "r";
/** Proposal statuses as stored on-chain. `Invalid` is set by `cancelProposal`. */
export declare enum ProposalStatusEnum {
    Draft = 0,
    Invalid = 10,
    Voting = 20,
    Rejected = 30,
    Approved = 40,
    Executed = 50
}
/** Tally box (voting-rule and locked-stake snapshot, vote count, participating tokens) created when a proposal is submitted. Included in `proposalCost`. */
export declare const DAOProposalTallyMBR: bigint;
/** Bootstrap execution keys may stay valid at most this many rounds after execution. */
export declare const MaxBootstrapKeyRounds: bigint;
/** Box-name prefix of bootstrap execution keys tracked by the DAO ('b' + 32-byte lease). */
export declare const DAOBootstrapKeyBoxPrefix = "b";
