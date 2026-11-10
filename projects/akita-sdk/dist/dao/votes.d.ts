import type { GovernanceParticipation, ProposalVoteReceipt } from '../generated/AkitaDAOClient';
/** A vote receipt read from either box format. Legacy ('v') receipts predate `weight` and report 0. */
export type DecodedVoteReceipt = ProposalVoteReceipt & {
    legacy: boolean;
};
/** Box name of a vote receipt: prefix + uint64 proposal id + 32-byte voter. */
export declare function voteReceiptBoxName(proposalId: bigint, voter: string, legacy?: boolean): Uint8Array;
/** Box name of a voter's participation record: 'r' + 32-byte address. */
export declare function participationBoxName(voter: string): Uint8Array;
/** Decode a 'w' receipt (type u8, power u64, weight u64) or a legacy 'v' receipt (type u8, power u64). */
export declare function decodeVoteReceipt(value: Uint8Array, legacy: boolean): DecodedVoteReceipt;
/** Decode a participation record (lastVotedTs, lastProposalID, votes: three uint64). */
export declare function decodeGovernanceParticipation(value: Uint8Array): GovernanceParticipation;
/**
 * What `voteProposal` costs given the voter's current boxes: `payment` is the exact deposit the DAO
 * requires, `refund` what it pays back in the same call (a replaced legacy receipt's deposit).
 */
export declare function voteCost({ receipt, legacyReceipt, participation }: {
    receipt: boolean;
    legacyReceipt: boolean;
    participation: boolean;
}): {
    payment: bigint;
    refund: bigint;
};
