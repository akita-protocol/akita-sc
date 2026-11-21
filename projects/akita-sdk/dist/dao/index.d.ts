import { AkitaDaoArgs, AkitaDaoClient, ProposalCostInfo } from '../generated/AkitaDAOClient';
import { AkitaDaoTypesClient } from '../generated/AkitaDAOTypesClient';
import { BaseSDK } from "../base";
import { GroupReturn, MaybeSigner, NewContractSDKParams, SDKClient, TxnReturn } from "../types";
import { WalletSDK } from "../wallet";
import { AkitaDaoGlobalState, DecodedProposal, EditProposalParams, NewProposalParams, ProposalAction } from "./types";
import { DecodedVoteReceipt } from "./votes";
import { AppReturn } from "@algorandfoundation/algokit-utils/types/app";
export * from './constants';
export * from "./errors";
export * from "./types";
export * from './legacy';
export * from './votes';
type ContractArgs = AkitaDaoArgs["obj"];
type SetupArgs = (Omit<ContractArgs['setup(string,byte[32])uint64'], 'nickname' | 'salt'> & Partial<Pick<ContractArgs['setup(string,byte[32])uint64'], 'nickname' | 'salt'>> & MaybeSigner);
export declare class AkitaDaoSDK extends BaseSDK<AkitaDaoClient> {
    typeClient: AkitaDaoTypesClient;
    private _wallet;
    private _walletInitPromise;
    private _constructorParams;
    constructor(params: NewContractSDKParams);
    /**
     * Get the wallet SDK associated with this DAO.
     * Lazily fetches the wallet app ID from the DAO's global state on first access.
     */
    getWallet(): Promise<WalletSDK>;
    private _initializeWallet;
    /**
     * @deprecated Use getWallet() instead for proper async initialization.
     * This getter exists for backwards compatibility but will throw if the wallet
     * hasn't been initialized yet via getWallet() or setup().
     */
    get wallet(): WalletSDK;
    /**
     * Allows setting the wallet directly (used by setup() and for testing)
     */
    set wallet(wallet: WalletSDK);
    private prepProposalActions;
    initialize(params?: MaybeSigner): Promise<TxnReturn<void>>;
    setup(params?: SetupArgs): Promise<GroupReturn>;
    newProposal<TClient extends SDKClient>({ sender, signer, cid, actions, consolidateFees }: NewProposalParams<TClient>): Promise<{
        groupId: string;
        confirmedRound: bigint;
        txIDs: string[];
    } & AppReturn<bigint | undefined>>;
    editProposal<TClient extends SDKClient>({ sender, signer, id, cid, actions }: EditProposalParams<TClient>): Promise<TxnReturn<void>>;
    submitProposal({ sender, signer, proposalId }: ContractArgs['submitProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    voteProposal({ proposalId, vote, sender, signer }: ContractArgs['voteProposal(pay,uint64,uint8)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    finalizeProposal({ sender, signer, proposalId }: ContractArgs['finalizeProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    executeProposal({ proposalId, sender, signer }: ContractArgs['executeProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    /**
     * Build the actions that delete an escrow of the DAO wallet, in the order the wallet needs them,
     * from what the chain lists for the escrow: unlock it if asked, remove every grant and alias that
     * names it, remove its allowances, close its assets out to the wallet, then delete it.
     *
     * Put them in one proposal so the whole removal runs in one transaction group. When they are more
     * than the DAO's action limit allows, split them over proposals in this order and execute those in
     * order: the wallet refuses the delete while a plugin or an allowance still names the escrow.
     *
     * It throws when something stands in the way that no action can undo: the escrow is opted in to
     * an app, or holds an asset the wallet's account cannot receive. An alias whose grant is already
     * gone does not stand in the way and is left alone.
     *
     * What becomes of the escrow's address afterwards cannot be undone, and differs with the kind of
     * escrow. Before an app lets a person create this proposal, it shows the `warnings` of
     * `(await dao.getWallet()).getEscrowTeardown(escrow)` prominently.
     */
    deleteEscrowActions({ escrow, unlock }: {
        escrow: string;
        unlock?: boolean;
    }): Promise<ProposalAction<SDKClient>[]>;
    /**
     * Delete one of your proposals (draft, rejected, executed, cancelled, or a leftover bootstrap proposal).
     * Voted proposals require every vote receipt to be cleared first (`deleteProposalVotes`).
     */
    deleteProposal({ sender, signer, proposalId }: ContractArgs['deleteProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    /** Delete vote receipts of a finished proposal; each voter is refunded their receipt deposit. */
    deleteProposalVotes({ sender, signer, proposalId, voters }: ContractArgs['deleteProposalVotes(uint64,address[])void'] & MaybeSigner): Promise<TxnReturn<void>>;
    /** Proposer-only: abandon an approved proposal that has not executed. */
    cancelProposal({ sender, signer, proposalId }: ContractArgs['cancelProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    /**
     * Voting-rule snapshot of a submitted proposal: duration, participation, approval, outstanding vote
     * receipts, base units locked at submit (the quorum denominator) and locked base units that voted.
     */
    getProposalTally(proposalId: bigint): Promise<import("../generated/AkitaDAOClient").ProposalTally>;
    /** `account`'s governance participation (last vote time and proposal, distinct proposals voted on); zeros if it never voted. */
    getGovernanceParticipation(account: string): Promise<import("../generated/AkitaDAOClient").GovernanceParticipation>;
    /** `voter`'s receipt on a proposal ('w', or a legacy 'v' receipt with weight 0), or undefined. */
    getVoteReceipt({ proposalId, voter }: {
        proposalId: bigint;
        voter: string;
    }): Promise<DecodedVoteReceipt | undefined>;
    /** The exact deposit `voteProposal` requires from `voter`, and what the DAO refunds in the same call. */
    voteCost({ proposalId, voter }: {
        proposalId: bigint;
        voter: string;
    }): Promise<{
        payment: bigint;
        refund: bigint;
    }>;
    private readBox;
    /** Leases of bootstrap execution keys the DAO still tracks (must be cleared before `initialize`). */
    getBootstrapKeys(): Promise<Uint8Array[]>;
    /**
     * Caller-scoped plugin grants added by bootstrap proposals that are still installed: the pre-launch
     * automation the DAO starts with. They survive `initialize`; a RemovePlugin proposal removes one.
     */
    getBootstrapGrants(): Promise<{
        plugin: bigint;
        caller: string;
        escrow: string;
    }[]>;
    /**
     * Stop tracking bootstrap execution keys, revoking any that are still live in the DAO wallet.
     * Anyone may clear used or expired keys; only the creator may revoke an unexpired one.
     * Defaults to every tracked key.
     */
    clearBootstrapKeys({ sender, signer, leases }?: {
        leases?: Uint8Array[];
    } & MaybeSigner): Promise<TxnReturn<void> | undefined>;
    getGlobalState(): Promise<AkitaDaoGlobalState>;
    setupCost(params?: MaybeSigner): Promise<bigint>;
    proposalCost<TClient extends SDKClient>({ sender, signer, actions }: {
        actions: ProposalAction<TClient>[];
    } & MaybeSigner): Promise<ProposalCostInfo>;
    /**
     * Maps proposal action type enum to its corresponding struct type name
     */
    private getActionStructType;
    /**
     * Decodes the raw action bytes into their typed struct representation
     */
    private decodeProposalAction;
    /**
     * Fetches a proposal by ID and decodes all action data into typed structs
     */
    getProposal(proposalId: bigint): Promise<DecodedProposal>;
}
