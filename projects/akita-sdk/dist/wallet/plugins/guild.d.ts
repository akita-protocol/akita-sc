import { microAlgo } from "@algorandfoundation/algokit-utils";
type ReadableAddress = string | import('algosdk').Address;
import { GuildPluginArgs, GuildPluginClient } from "../../generated/GuildPluginClient";
import { BaseSDK } from "../../base";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
import type { WalletSDK } from "../index";
type ContractArgs = GuildPluginArgs["obj"];
type ContractMethodArgs<Name extends string> = ContractArgs[Extract<keyof ContractArgs, `${Name}(${string}`>];
type WalletPluginArgs<T> = Omit<T, "wallet" | "rekeyBack"> & MaybeSigner & {
    rekeyBack?: boolean;
};
type WithOptionalEvidence<T extends {
    evidence: Uint8Array;
}> = Omit<T, "evidence"> & {
    evidence?: Uint8Array;
};
/**
 * `maxCost` is the most the wallet may pay the factory or the Guild in the call, in microAlgo. Left out,
 * it is the cost read from the chain when the call is built, so a price that rises afterwards (before the
 * group is sent, or before an approved group runs) fails the call instead of being paid.
 */
type WithOptionalMaxCost<T extends {
    maxCost: bigint | number;
}> = Omit<T, "maxCost"> & {
    maxCost?: bigint | number;
};
type NewGuildArgs = WalletPluginArgs<WithOptionalMaxCost<ContractMethodArgs<"newGuild">>>;
type ConfigureConsensusArgs = WalletPluginArgs<WithOptionalMaxCost<ContractMethodArgs<"configureConsensus">>>;
type SetupArgs = WalletPluginArgs<WithOptionalMaxCost<Omit<ContractMethodArgs<"setup">, "salt">> & {
    salt?: Uint8Array;
}>;
type CreateGuildCallArgs = WalletPluginArgs<WithOptionalMaxCost<Omit<ContractMethodArgs<"createGuild">, "salt">> & {
    salt?: Uint8Array;
}>;
type SetProposalSettingsArgs = WalletPluginArgs<ContractMethodArgs<"setProposalSettings">>;
type SetProposalActionLimitArgs = WalletPluginArgs<ContractMethodArgs<"setProposalActionLimit">>;
type SetConsensusActionSettingsArgs = WalletPluginArgs<ContractMethodArgs<"setConsensusActionSettings">>;
type GuildOnlyArgs = WalletPluginArgs<ContractMethodArgs<"initialize">>;
type NewProposalArgs = WalletPluginArgs<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"newProposal">>>>;
type EditProposalArgs = WalletPluginArgs<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"editProposal">>>>;
type DeleteProposalArgs = WalletPluginArgs<ContractMethodArgs<"deleteProposal">>;
type SubmitProposalArgs = WalletPluginArgs<WithOptionalEvidence<ContractMethodArgs<"submitProposal">>>;
type VoteProposalArgs = WalletPluginArgs<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"voteProposal">>>>;
type FinalizeProposalArgs = WalletPluginArgs<ContractMethodArgs<"finalizeProposal">>;
type CancelProposalArgs = WalletPluginArgs<ContractMethodArgs<"cancelProposal">>;
type CleanupProposalConsensusArgs = WalletPluginArgs<ContractMethodArgs<"cleanupProposalConsensus">>;
type ExecuteProposalArgs = WalletPluginArgs<ContractMethodArgs<"executeProposal">>;
type OpUpArgs = WalletPluginArgs<ContractMethodArgs<"opUp">>;
/** Wallet-facing hooks for the complete Guild factory and proposal lifecycle. */
export declare class GuildPluginSDK extends BaseSDK<GuildPluginClient> {
    constructor(params: NewContractSDKParams);
    private hook;
    /** A Guild client for simulated cost reads sent as `reader` (any funded account; nothing is signed) */
    private guildReader;
    private readFee;
    /** What the factory charges now to create a Guild with consensus program `consensusName`, in microAlgo. */
    guildCreationCost(consensusName: string, reader?: ReadableAddress): Promise<bigint>;
    /** What storing a draft consensus configuration costs now, in microAlgo. */
    consensusConfigurationCost(guild: bigint | number, config: Uint8Array, reader?: ReadableAddress): Promise<bigint>;
    /** What creating the Guild's treasury wallet costs now, in microAlgo. */
    setupCost(guild: bigint | number, reader?: ReadableAddress): Promise<bigint>;
    /**
     * What proposing `actions` costs a member now (storage plus the Guild's fees), in microAlgo. A draft
     * Guild charges its creator nothing, so for the creator this is an upper bound.
     */
    proposalCost(guild: bigint | number, actions: [number | bigint, Uint8Array][], reader?: ReadableAddress): Promise<bigint>;
    /** What replacing a draft proposal's actions with `actions` costs now on top of what it already paid. */
    proposalEditCost(guild: bigint | number, proposalId: bigint | number, actions: [number | bigint, Uint8Array][], reader?: ReadableAddress): Promise<bigint>;
    /** What `voter`'s next vote on a proposal costs now: its receipt's storage for a first vote, nothing after. */
    voteCost(guild: bigint | number, proposalId: bigint | number, voter?: ReadableAddress, reader?: ReadableAddress): Promise<bigint>;
    newGuild(): PluginSDKReturn;
    newGuild(args: NewGuildArgs): PluginSDKReturn;
    configureConsensus(): PluginSDKReturn;
    configureConsensus(args: ConfigureConsensusArgs): PluginSDKReturn;
    setup(): PluginSDKReturn;
    setup(args: SetupArgs): PluginSDKReturn;
    /**
     * Create a Guild and make it ready in one call (the shared plugin only): create it and its consensus,
     * configure the consensus, set up and fund the treasury, and run `actions` as an instant draft proposal.
     * Returns `{ guild, consensus, wallet }`.
     *
     * `maxCost` limits everything the call pays except `funding`. Part of that is storage in a Guild that
     * does not exist yet, so it cannot be read ahead of the call the way the other methods' costs are: pass
     * the figure from a simulated build of the group. Left out, the call has no limit.
     */
    createGuild(): PluginSDKReturn;
    createGuild(args: CreateGuildCallArgs): PluginSDKReturn;
    setProposalSettings(): PluginSDKReturn;
    setProposalSettings(args: SetProposalSettingsArgs): PluginSDKReturn;
    setProposalActionLimit(): PluginSDKReturn;
    setProposalActionLimit(args: SetProposalActionLimitArgs): PluginSDKReturn;
    setConsensusActionSettings(): PluginSDKReturn;
    setConsensusActionSettings(args: SetConsensusActionSettingsArgs): PluginSDKReturn;
    lockPluginSet(): PluginSDKReturn;
    lockPluginSet(args: GuildOnlyArgs): PluginSDKReturn;
    partiallyInitialize(): PluginSDKReturn;
    partiallyInitialize(args: GuildOnlyArgs): PluginSDKReturn;
    initialize(): PluginSDKReturn;
    initialize(args: GuildOnlyArgs): PluginSDKReturn;
    newProposal(): PluginSDKReturn;
    newProposal(args: NewProposalArgs): PluginSDKReturn;
    editProposal(): PluginSDKReturn;
    editProposal(args: EditProposalArgs): PluginSDKReturn;
    deleteProposal(): PluginSDKReturn;
    deleteProposal(args: DeleteProposalArgs): PluginSDKReturn;
    submitProposal(): PluginSDKReturn;
    submitProposal(args: SubmitProposalArgs): PluginSDKReturn;
    voteProposal(): PluginSDKReturn;
    voteProposal(args: VoteProposalArgs): PluginSDKReturn;
    finalizeProposal(): PluginSDKReturn;
    finalizeProposal(args: FinalizeProposalArgs): PluginSDKReturn;
    cleanupProposalConsensus(): PluginSDKReturn;
    cleanupProposalConsensus(args: CleanupProposalConsensusArgs): PluginSDKReturn;
    /** Abandon an approved, unexecuted proposal this wallet proposed and recover its execution reserve. */
    cancelProposal(): PluginSDKReturn;
    cancelProposal(args: CancelProposalArgs): PluginSDKReturn;
    executeProposal(): PluginSDKReturn;
    executeProposal(args: ExecuteProposalArgs): PluginSDKReturn;
    sweep(): PluginSDKReturn;
    sweep(args: GuildOnlyArgs): PluginSDKReturn;
    opUp(): PluginSDKReturn;
    opUp(args: OpUpArgs): PluginSDKReturn;
    /** Deploy a GuildPlugin bound to `guild` (same factory as this one); the creator installs it on their wallet */
    deployForGuild(guild: bigint, params?: MaybeSigner): Promise<GuildPluginSDK>;
}
/** Default ballot rules for a new Guild: 3-day votes, simple majority of voting power, one approval minimum. */
export declare const defaultGuildProposalSettings: (overrides?: Partial<GuildProposalSettingsConfigEntry>) => GuildProposalSettingsConfigEntry;
type GuildProposalSettingsConfigEntry = {
    fee: bigint;
    power: bigint;
    duration: bigint;
    participation: bigint;
    approval: bigint;
    minimumApprovals: bigint;
};
/** `GuildBaseConfig` with the same settings for every built-in action type */
export declare const defaultGuildBaseConfig: (settings?: GuildProposalSettingsConfigEntry, proposalActionLimit?: bigint) => {
    proposalActionLimit: bigint;
    proposalSettings: {
        upgradeApp: GuildProposalSettingsConfigEntry;
        addPlugin: GuildProposalSettingsConfigEntry;
        removeExecution: GuildProposalSettingsConfigEntry;
        removePlugin: GuildProposalSettingsConfigEntry;
        addAllowances: GuildProposalSettingsConfigEntry;
        removeAllowances: GuildProposalSettingsConfigEntry;
        newEscrow: GuildProposalSettingsConfigEntry;
        toggleEscrowLock: GuildProposalSettingsConfigEntry;
        updateGuild: GuildProposalSettingsConfigEntry;
    };
};
export type GuildCreationStep = 'newGuild' | 'installGuildPlugin' | 'configureConsensus' | 'setup' | 'initialize';
/** The structural slice of WalletSDK the creation flow needs (kept structural so src and dist builds interoperate) */
export type GuildCreationWallet = {
    usePlugin(params: {
        callerType?: bigint;
        calls: PluginSDKReturn[];
        consolidateFees?: boolean;
        preTransactions?: {
            txn: import('algosdk').Transaction;
            signer: import('algosdk').TransactionSigner;
        }[];
    } & MaybeSigner): Promise<{
        returns: unknown[];
    }>;
    addPlugin(params: {
        client: GuildPluginSDK;
        callerType: bigint;
    } & MaybeSigner): Promise<unknown>;
    getMbr(args: {
        escrow: string;
        methodCount: bigint;
        plugin: string;
        groups: bigint;
    }): Promise<{
        plugins: bigint;
    }>;
    client: {
        appId: bigint;
        appClient: {
            fundAppAccount(params: {
                amount: ReturnType<typeof microAlgo>;
            } & MaybeSigner): Promise<unknown>;
        };
    };
};
export type CreateGuildParams = MaybeSigner & {
    wallet: GuildCreationWallet;
    /** the network's creation-only GuildPlugin (guild = 0), already installed on `wallet` */
    creationPlugin: GuildPluginSDK;
    /** registered consensus program, e.g. 'fixed-signers' */
    consensusName: string;
    /** consensus policy bytes, e.g. `fixedSignerConsensusConfig(threshold)` */
    governanceConfig: Uint8Array;
    /** draft consensus configuration, e.g. `fixedSignerConfiguration(mode, members)` */
    consensusConfiguration: Uint8Array;
    baseConfig?: ReturnType<typeof defaultGuildBaseConfig>;
    /** nickname of the Guild's treasury wallet */
    nickname: string;
    salt?: Uint8Array;
    /** how the Guild-bound plugin is installed on `wallet`; defaults to admin-only */
    callerType?: bigint;
    /** how `creationPlugin` is installed on `wallet`; defaults to `callerType` */
    creationCallerType?: bigint;
    /** end creator control at once (default); false leaves the Guild a draft for `initializeGuild` later */
    initialize?: boolean;
    onStep?: (step: GuildCreationStep) => void;
};
export type CreatedGuild = {
    guild: bigint;
    consensus: bigint;
    guildWallet: bigint;
    guildPlugin: GuildPluginSDK;
};
export type GuildDraftParams = MaybeSigner & {
    wallet: Pick<GuildCreationWallet, 'usePlugin'>;
    /** the GuildPlugin bound to `guild` (`CreatedGuild.guildPlugin`) */
    guildPlugin: GuildPluginSDK;
    guild: bigint;
    /** how `guildPlugin` is installed on `wallet`; defaults to admin-only */
    callerType?: bigint;
};
/** End creator control of a draft Guild: from here on its members govern it through proposals. */
export declare function initializeGuild({ wallet, guildPlugin, guild, callerType, sender, signer }: GuildDraftParams): Promise<void>;
/** A payment to place ahead of a draft proposal in its group, e.g. storage for the Guild's wallet */
export type DraftProposalTopUp = {
    receiver: ReadableAddress;
    amount: bigint;
};
/**
 * While the Guild is a draft its creator's proposals are approved on creation: propose `actions` and execute
 * them at once (e.g. `addPluginAction` to configure the Guild's wallet), in one group under one signature.
 * The group also pays the Guild's proposal storage when it is short, and any `topUps`. Returns the
 * proposal id.
 */
export declare function runDraftProposal({ wallet, guildPlugin, guild, actions, cid, callerType, sender, signer, storagePayer, topUps, }: GuildDraftParams & {
    actions: [number | bigint, Uint8Array][];
    cid?: Uint8Array;
    /** pays the storage shortfall and `topUps`; defaults to `sender` */
    storagePayer?: MaybeSigner;
    topUps?: DraftProposalTopUp[];
}): Promise<bigint>;
/**
 * Propose `actions` to an active Guild from a member's wallet and submit them for a vote, in one group
 * under one signature. The new proposal takes the Guild's next id; if another member proposes first in the
 * same round the group fails and can simply be retried. Returns the proposal id.
 */
export declare function proposeToGuild({ wallet, guildPlugin, guild, actions, cid, evidence, callerType, sender, signer, }: GuildDraftParams & {
    actions: [number | bigint, Uint8Array][];
    cid?: Uint8Array;
    /** proof of the proposer's voting power, for consensus programs that need it */
    evidence?: Uint8Array;
}): Promise<bigint>;
/** Vote on a Guild proposal from a member's wallet: one group, one signature */
export declare function voteOnGuildProposal({ wallet, guildPlugin, guild, proposalId, vote, evidence, callerType, sender, signer, }: GuildDraftParams & {
    proposalId: bigint;
    vote: number;
    evidence?: Uint8Array;
}): Promise<void>;
/**
 * Close a proposal's vote once voting has ended (`finalize`) and run its actions when it passed (`execute`):
 * one group, one signature. Finalizing a rejected proposal returns the proposer's reserve; an approved one
 * finalized earlier only needs `execute`.
 */
export declare function finishGuildProposal({ wallet, guildPlugin, guild, proposalId, finalize, execute, callerType, sender, signer, }: GuildDraftParams & {
    proposalId: bigint;
    finalize?: boolean;
    execute: boolean;
}): Promise<void>;
/**
 * The round about `seconds` from now, from the network's recent block times. In dev mode, the current
 * round.
 */
export declare function estimateRoundAfter(algod: import('algosdk').Algodv2, seconds: bigint, sampleRounds?: bigint): Promise<bigint>;
/** Validity windows (1000 rounds each, about 47 minutes on MainNet) an approved group stays runnable for */
export declare const GUILD_EXECUTION_WINDOWS = 24n;
/**
 * Build the group a member proposes to run on the Guild's wallet (`treasury`) with `calls`, through the
 * wallet's any-caller execution grant for the plugin. It becomes runnable when voting ends, for about
 * `windows` × 1000 rounds. Only `sender` can sign it later, so keep it (see `guildExecutionRecord`).
 */
export declare function buildGuildExecution({ treasury, calls, lease, votingSeconds, escrow, windows, sender, signer, }: MaybeSigner & {
    treasury: WalletSDK;
    calls: PluginSDKReturn[];
    /** unique per proposal, at most 32 characters */
    lease: string;
    votingSeconds: bigint;
    escrow?: string;
    windows?: bigint;
}): Promise<import("../types").ExecutionBuildGroup>;
/** An approved group kept until it runs: each window's unsigned transactions, base64 msgpack */
export type GuildExecutionRecord = {
    lease: string;
    firstValid: string;
    lastValid: string;
    windows: {
        firstValid: string;
        lastValid: string;
        transactions: string[];
    }[];
};
export declare function guildExecutionRecord(execution: {
    lease: Uint8Array;
    firstValid: bigint;
    lastValid: bigint;
    windows: {
        transactions: import('algosdk').Transaction[];
    }[];
}): GuildExecutionRecord;
/** The 32-byte execution key of a kept group */
export declare const guildExecutionKey: (record: GuildExecutionRecord) => Uint8Array<ArrayBufferLike>;
/**
 * Sign and send the window of a kept, approved group that is valid now. `signer` must sign for the
 * account that built it. Returns the transaction ids.
 */
export declare function sendGuildExecution({ algod, record, signer, }: {
    algod: import('algosdk').Algodv2;
    record: GuildExecutionRecord;
    signer: import('algosdk').TransactionSigner;
}): Promise<string[]>;
/** One plugin grant: who may call the plugin, optionally only some methods and only until `lastValid` */
export type FundedPluginGrant = {
    caller: string;
    /** selectors the caller may use; all methods when empty */
    methods?: Uint8Array[];
    /** unix seconds after which the grant stops working */
    lastValid?: bigint;
    coverFees?: boolean;
};
/**
 * Install `plugin` on `wallet` with `grants` in one atomic group with the payment for their boxes, so the
 * admin approves a single signature.
 */
export declare function installFundedPlugin({ wallet, plugin, grants, sender, signer, }: {
    wallet: WalletSDK;
    plugin: bigint;
    grants: FundedPluginGrant[];
} & MaybeSigner): Promise<void>;
/** Selectors of the GuildPlugin methods named `names` */
export declare function guildPluginSelectors(names: string[]): Uint8Array[];
/**
 * Create, configure and initialize a Guild from an Akita wallet, in the order the Guild requires:
 * `newGuild` through the creation-only plugin, then a GuildPlugin bound to the new Guild is deployed and
 * installed on the wallet, which configures the consensus draft, sets up the Guild's treasury wallet and
 * initializes it. Each step is its own wallet window; `onStep` reports progress for a UI.
 */
export declare function createGuild({ wallet, creationPlugin, consensusName, governanceConfig, consensusConfiguration, baseConfig, nickname, salt, callerType, creationCallerType, initialize, onStep, sender, signer, }: CreateGuildParams): Promise<CreatedGuild>;
/** What `createGuildInOneCall` made */
export type CreatedGuildInOneCall = {
    guild: bigint;
    consensus: bigint;
    guildWallet: bigint;
};
/**
 * Create a Guild and make it ready in one group, so the wallet's admin approves once: through the shared
 * GuildPlugin (installed on `wallet`), create the Guild and its consensus, configure the consensus (e.g. a
 * member list), set up the treasury, fund it with `funding`, and run `actions` as the creator's instant
 * draft proposal (e.g. `addPluginAction` grants on the treasury). The Guild stays a draft.
 */
export declare function createGuildInOneCall({ wallet, plugin, consensusName, governanceConfig, consensusConfiguration, baseConfig, nickname, salt, funding, actions, maxCost, callerType, sender, signer, }: MaybeSigner & {
    wallet: Pick<GuildCreationWallet, 'usePlugin'>;
    /** the shared GuildPlugin (bound to no Guild) */
    plugin: GuildPluginSDK;
    consensusName: string;
    governanceConfig: Uint8Array;
    consensusConfiguration: Uint8Array;
    baseConfig?: ReturnType<typeof defaultGuildBaseConfig>;
    nickname: string;
    salt?: Uint8Array;
    funding?: bigint;
    actions?: [number | bigint, Uint8Array][];
    /** the most the wallet may pay besides `funding`, in microAlgo; no limit when left out (see `GuildPluginSDK.createGuild`) */
    maxCost?: bigint;
    callerType?: bigint;
}): Promise<CreatedGuildInOneCall>;
/**
 * The GuildPlugin bound to `guild` among a wallet's installed plugin apps (each bound plugin stores its
 * Guild in its `guild` global), or undefined. Lets an app reopen a draft Guild it created earlier.
 */
export declare function findGuildPlugin({ algorand, pluginAppIds, guild, sendParams, }: {
    algorand: NewContractSDKParams['algorand'];
    pluginAppIds: Iterable<bigint>;
    guild: bigint;
    sendParams?: MaybeSigner;
}): Promise<GuildPluginSDK | undefined>;
export {};
