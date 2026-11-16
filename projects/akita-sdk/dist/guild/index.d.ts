import { BaseSDK } from "../base";
import { type ABIValue } from 'algosdk';
import { GuildClient, GuildFactory as GuildContractFactory, type GuildBaseConfig, type GuildConsensusBallot, type GuildConsensusRequirements, type GuildExecutionMetadata, type GuildPluginKey, type GuildProposal, type GuildProposalCostInfo, type GuildProposalSettings, type GuildProposalSettingsConfig, type GuildVoteTotals } from "../generated/GuildClient";
import { GuildConsensusFactoryClient, GuildConsensusFactoryFactory } from "../generated/GuildConsensusFactoryClient";
import { GuildFactoryClient, GuildFactoryFactory, type EscrowConfig, type GuildDeployment } from "../generated/GuildFactoryClient";
import { LockedTokenGuildConsensusClient, LockedTokenGuildConsensusFactory } from "../generated/LockedTokenGuildConsensusClient";
import { FixedSignerGuildConsensusClient, FixedSignerGuildConsensusFactory } from "../generated/FixedSignerGuildConsensusClient";
import { SubscriptionGuildConsensusClient, SubscriptionGuildConsensusFactory } from "../generated/SubscriptionGuildConsensusClient";
import type { NewContractSDKParams } from "../types";
export type { EscrowConfig, GuildBaseConfig, GuildConsensusBallot, GuildConsensusRequirements, GuildDeployment, GuildExecutionMetadata, GuildPluginKey, GuildProposal, GuildProposalCostInfo, GuildProposalSettings, GuildProposalSettingsConfig, GuildVoteTotals, };
export { FixedSignerGuildConsensusClient, FixedSignerGuildConsensusFactory, GuildClient, GuildContractFactory, GuildConsensusFactoryClient, GuildConsensusFactoryFactory, GuildFactoryClient, GuildFactoryFactory, LockedTokenGuildConsensusClient, LockedTokenGuildConsensusFactory, SubscriptionGuildConsensusClient, SubscriptionGuildConsensusFactory, };
/** On-chain Guild proposal action discriminants. */
export declare enum GuildActionType {
    UpgradeApp = 10,
    AddPlugin = 20,
    AddNamedPlugin = 21,
    /** Replace an installed plugin's execution-proposal settings; allowed even once the plugin set is locked. */
    SetPluginSettings = 22,
    ExecutePlugin = 30,
    RemoveExecution = 31,
    RemovePlugin = 40,
    RemoveNamedPlugin = 41,
    AddAllowances = 50,
    RemoveAllowances = 60,
    NewEscrow = 70,
    ToggleEscrowLock = 71,
    Reclaim = 72,
    SetProposalSettings = 80,
    SetProposalActionLimit = 81,
    /** Create a fresh wallet through the DAO wallet factory; Guilds never adopt existing wallets. */
    NewWallet = 82,
    /** Opaque policy action: `uint8 code || ABI payload`; the Guild selects settings by code. */
    Consensus = 83,
    SetConsensusActionSettings = 84,
    /** Charge new proposals' fees in an asset (0 = ALGO); proposal storage stays in ALGO. */
    SetFeeAsset = 85,
    UpdateWallet = 90,
    ChangeAdmin = 91,
    FullyInitialize = 100,
    LockPluginSet = 110
}
export declare enum FixedSignerWeightMode {
    Equal = 1,
    Assigned = 2
}
/** Fixed-signer consensus action codes (first byte of a `Consensus` action). */
export declare enum FixedSignerConsensusAction {
    AddMembers = 1,
    RemoveMember = 2,
    SetMemberWeight = 3,
    SetThreshold = 4,
    SetWeightMode = 5,
    LockMembership = 6
}
/** Subscription consensus action codes (first byte of a `Consensus` action). */
export declare enum SubscriptionConsensusAction {
    AddOfferings = 1,
    SetOfferingWeight = 2,
    RemoveOffering = 3,
    SetMinimumApprovals = 4
}
/** Locked-token consensus action codes (first byte of a `Consensus` action). */
export declare enum LockedTokenConsensusAction {
    SetMinimumApprovals = 1
}
/** Stable names used to select factory-registered consensus implementations. */
export declare enum GuildConsensusName {
    FixedSigners = "fixed-signers",
    LockedToken = "locked-token",
    Subscription = "subscription"
}
export type GuildProposalAction = [type: GuildActionType, data: Uint8Array];
export type FixedSignerMemberInput = [account: string, weight: bigint];
/**
 * A subscription service the policy creates and owns. Services are ALGO-priced, ungated, and pay
 * out to the Guild application; `weight` is the voting weight each paid subscription carries.
 */
export type SubscriptionOfferingInput = {
    interval: bigint;
    amount: bigint;
    title: string;
    weight: bigint;
    bannerImage?: Uint8Array;
    highlightMessage?: number;
    highlightColor?: Uint8Array;
};
export type EscrowReclaimInput = {
    asset: bigint;
    amount: bigint;
    closeOut: boolean;
};
export type GuildProposalSettingsInput = {
    fee: bigint;
    power: bigint;
    duration: bigint;
    participation: bigint;
    approval: bigint;
    minimumApprovals: bigint;
};
export declare const FIXED_SIGNER_MEMBER_MBR = 25300n;
export declare const GUILD_VOTE_MBR = 22500n;
export declare const GUILD_CONSENSUS_ACTION_SETTINGS_MBR = 25300n;
export declare const SUBSCRIPTION_OFFERING_MBR = 12500n;
export declare const SUBSCRIPTION_OFFERING_HISTORY_MBR = 15700n;
/** Storage for one offering weight slot; quoted per new offering and refunded when a freed slot is reused. */
export declare const SUBSCRIPTION_WEIGHT_SLOT_MBR = 3200n;
/** One-time storage for the offering weight slot box, quoted with the first offering. */
export declare const SUBSCRIPTION_WEIGHTS_BOX_MBR = 2900n;
/** A subscription policy holds at most this many live offerings. */
export declare const MAX_SUBSCRIPTION_OFFERINGS = 64n;
/** Encode the membership interval start returned by the consensus member/history boxes. */
export declare const fixedSignerVoteEvidence: (since: bigint) => Uint8Array;
/** The payment history the subscriptions app records for a subscription (`getSubscription`). */
export type SubscriptionPaymentHistory = {
    startDate: bigint;
    lastPayment: bigint;
    streak: bigint;
    interval: bigint;
};
/**
 * The earliest ballot opening time a subscription can vote on under subscription consensus, or
 * `undefined` when its record grants nothing. Mirrors `SubscriptionGuildConsensus.seasoned`:
 * a subscription votes only on ballots that opened after it had been paid, without a gap, for one
 * full payment interval. A run of payments that began with the subscription is counted from
 * `startDate`; a run that began after a missed window is counted from the end of its first window.
 *
 * Show this to a new subscriber: they can propose at once, but can only vote on proposals opened
 * at or after this time. The subscription must also still be paid up when the vote is cast.
 */
export declare const subscriptionVotingOpensAt: ({ startDate, lastPayment, streak, interval }: SubscriptionPaymentHistory) => bigint | undefined;
/** Whether a subscription was seasoned for a ballot that opened at `openedAt` (chain seconds). */
export declare const isSubscriptionSeasoned: (history: SubscriptionPaymentHistory, openedAt: bigint) => boolean;
/**
 * Encode the subscription a subscriber votes with. The subscription grants power only while it is paid up
 * (`lastPayment + interval >= now`) at the moment of the vote or proposal, and votes only on ballots it
 * was seasoned for when they opened (see `subscriptionVotingOpensAt`).
 * Pass the offering's `since` epoch when its weight changed after the ballot opened (see `SubscriptionGuildConsensusSDK.voteEvidence`).
 */
export declare const subscriptionVoteEvidence: (subscriptionId: bigint, since?: bigint) => Uint8Array;
/** Build the opaque `uint8 code || payload` bytes every consensus policy accepts. */
export declare const encodeConsensusActionData: (code: number, abiType?: string, value?: ABIValue) => Uint8Array;
/** Wrap opaque consensus action bytes in a Guild action (type 83). */
export declare const consensusAction: (data: Uint8Array) => GuildProposalAction;
/** Fixed-signer consensus action builders. */
export declare const fixedSignerConsensusAction: {
    addMembers: (mode: FixedSignerWeightMode, members: FixedSignerMemberInput[]) => GuildProposalAction;
    removeMember: (member: string) => GuildProposalAction;
    setMemberWeight: (member: string, weight: bigint) => GuildProposalAction;
    setThreshold: (threshold: bigint) => GuildProposalAction;
    setWeightMode: (mode: FixedSignerWeightMode) => GuildProposalAction;
    lockMembership: () => GuildProposalAction;
};
/** Subscription consensus action builders. */
export declare const subscriptionConsensusAction: {
    /** Create new services owned by the policy, each granting `weight` per paid subscription. */
    addOfferings: (offerings: SubscriptionOfferingInput[]) => GuildProposalAction;
    setOfferingWeight: (serviceId: bigint, weight: bigint) => GuildProposalAction;
    /** Remove an offering and shut its service down; the last remaining offering can never be removed. */
    removeOffering: (serviceId: bigint) => GuildProposalAction;
    /** The new floor may not exceed the approvals of the proposal that sets it. */
    setMinimumApprovals: (minimumApprovals: bigint) => GuildProposalAction;
};
/** Locked-token consensus action builders. */
export declare const lockedTokenConsensusAction: {
    /** The new floor may not exceed the approvals of the proposal that sets it. */
    setMinimumApprovals: (minimumApprovals: bigint) => GuildProposalAction;
};
/** @deprecated Use `fixedSignerConsensusAction.addMembers`. */
export declare const addFixedSignerMembersAction: (mode: FixedSignerWeightMode, members: FixedSignerMemberInput[]) => GuildProposalAction;
/** @deprecated Use `fixedSignerConsensusAction.removeMember`. */
export declare const removeFixedSignerMemberAction: (member: string) => GuildProposalAction;
/** @deprecated Use `fixedSignerConsensusAction.setMemberWeight`. */
export declare const setFixedSignerMemberWeightAction: (member: string, weight: bigint) => GuildProposalAction;
/** Build action 84: attach proposal settings to one opaque consensus action code. */
export declare const setConsensusActionSettingsAction: (code: number, settings: GuildProposalSettingsInput) => GuildProposalAction;
/** Build action 80: change the proposal settings of one Guild action class. */
export declare const setProposalSettingsAction: (actionType: GuildActionType, settings: GuildProposalSettingsInput) => GuildProposalAction;
/** Build action 81. */
export declare const setProposalActionLimitAction: (limit: bigint) => GuildProposalAction;
/** Build action 85: charge new proposals' fees in `asset` (0 = ALGO). Drafts keep the asset they were created with. */
export declare const setFeeAssetAction: (asset: bigint) => GuildProposalAction;
/** Build action 82: create a fresh Guild wallet through the DAO wallet factory. */
export declare const newWalletAction: (nickname: string, salt?: Uint8Array) => GuildProposalAction;
/** Build action 22: replace the execution-proposal settings of an installed execution-key plugin. */
export declare const setPluginSettingsAction: (plugin: bigint, escrow: string, settings: GuildProposalSettingsInput) => GuildProposalAction;
/** Build action 70. Pass the zero address to have the wallet mint an escrow application. */
export declare const newEscrowAction: (escrow: string, address: string) => GuildProposalAction;
/** Build action 71. */
export declare const toggleEscrowLockAction: (escrow: string) => GuildProposalAction;
/** Build action 72: move escrowed funds back to the Guild wallet. */
export declare const reclaimAction: (escrow: string, reclaims: EscrowReclaimInput[]) => GuildProposalAction;
/** Build action 91: hand the Guild wallet to another administrator and free the wallet slot. */
export declare const changeAdminAction: (admin: string) => GuildProposalAction;
/**
 * Add `plugin` to the Guild's wallet for `caller`. A caller-scoped grant without an execution key lets
 * that account use the plugin on the Guild's wallet directly (e.g. the creator while the Guild is a draft);
 * proposal settings only apply to execution-key grants.
 */
export declare const addPluginAction: ({ plugin, caller, escrow, useExecutionKey, settings, }: {
    plugin: bigint;
    caller: string;
    escrow?: string;
    useExecutionKey?: boolean;
    settings?: GuildProposalSettingsInput;
}) => GuildProposalAction;
/**
 * Let members use `plugin` on the Guild's wallet by vote: a grant for any caller that only runs groups an
 * executed proposal approved (an execution key). `settings` govern those proposals.
 */
export declare const addVotedPluginAction: ({ plugin, escrow, settings, }: {
    plugin: bigint;
    escrow?: string;
    settings: GuildProposalSettingsInput;
}) => GuildProposalAction;
/**
 * Pre-approve groups that use `plugin` on the Guild's wallet: executing the proposal adds `executionKey`
 * for `groups`, valid from `firstValid` to `lastValid`.
 */
export declare const executePluginAction: ({ plugin, escrow, executionKey, groups, firstValid, lastValid, }: {
    plugin: bigint;
    escrow?: string;
    executionKey: Uint8Array;
    groups: Uint8Array[];
    firstValid: bigint;
    lastValid: bigint;
}) => GuildProposalAction;
/** Remove `plugin`'s grant for `caller` from the Guild's wallet. */
export declare const removePluginAction: ({ plugin, caller, escrow }: {
    plugin: bigint;
    caller: string;
    escrow?: string;
}) => GuildProposalAction;
/** Build action 31. */
export declare const removeExecutionAction: (executionKey: Uint8Array) => GuildProposalAction;
/** Build action 90 or 100 or 110 (actions without a payload). */
export declare const emptyAction: (type: GuildActionType.UpdateWallet | GuildActionType.FullyInitialize | GuildActionType.LockPluginSet) => GuildProposalAction;
/** Factory `governanceConfig` for a fixed-signer Guild. */
export declare const fixedSignerConsensusConfig: (threshold: bigint) => Uint8Array;
/** Factory `governanceConfig` for a locked-token Guild; the floor is an absolute approval-power minimum. */
export declare const lockedTokenConsensusConfig: (staking: bigint, asset: bigint, minimumApprovals: bigint) => Uint8Array;
/** Factory `governanceConfig` for a subscription Guild; the policy creates and owns its services. */
export declare const subscriptionConsensusConfig: (subscriptions: bigint, minimumApprovals: bigint) => Uint8Array;
/** Draft `configureConsensus` payload for a fixed-signer Guild. */
export declare const fixedSignerConfiguration: (mode: FixedSignerWeightMode, members: FixedSignerMemberInput[]) => Uint8Array;
/** Draft `configureConsensus` payload for a subscription Guild: the services the policy creates. */
export declare const subscriptionConfiguration: (offerings: SubscriptionOfferingInput[]) => Uint8Array;
/** Public SDK for an individual Guild application. */
export declare class GuildSDK extends BaseSDK<GuildClient> {
    constructor(params: NewContractSDKParams);
}
/** Public SDK for the boxed Guild deployment factory. */
export declare class GuildFactorySDK extends BaseSDK<GuildFactoryClient> {
    constructor(params: NewContractSDKParams);
}
/** Registry and deployment SDK for consensus implementations. */
export declare class GuildConsensusFactorySDK extends BaseSDK<GuildConsensusFactoryClient> {
    constructor(params: NewContractSDKParams);
}
/** SDK for locked-token Guild consensus. */
export declare class LockedTokenGuildConsensusSDK extends BaseSDK<LockedTokenGuildConsensusClient> {
    constructor(params: NewContractSDKParams);
}
/** SDK for fixed-signer Guild consensus. */
export declare class FixedSignerGuildConsensusSDK extends BaseSDK<FixedSignerGuildConsensusClient> {
    constructor(params: NewContractSDKParams);
    /** Find evidence for a signer changed after this ballot opened. */
    voteEvidence(account: string, proposalId: bigint): Promise<Uint8Array>;
}
/** SDK for subscription Guild consensus. */
export declare class SubscriptionGuildConsensusSDK extends BaseSDK<SubscriptionGuildConsensusClient> {
    constructor(params: NewContractSDKParams);
    /** Build vote evidence for a subscription to `serviceId`, adding `since` if the offering changed after the ballot opened. */
    voteEvidence(subscriptionId: bigint, serviceId: bigint, proposalId: bigint): Promise<Uint8Array>;
}
/** A Guild ballot as `getBallot` returns it (the fields early close needs) */
export type GuildBallotView = {
    resolved: boolean;
    votingEnd: bigint;
    eligiblePower: bigint;
    requirements: {
        participation: bigint;
        approval: bigint;
        minimumApprovals: bigint;
    };
    votes: {
        approvals: bigint;
        rejections: bigint;
        abstains: bigint;
    };
};
/**
 * How a Guild ballot resolves if it is finalized now (`now` in chain seconds), mirroring the consensus
 * contract: after `votingEnd` by the votes cast; before it only once the members who have not voted cannot
 * change the result (early close). `undefined` while voting is open and the result is still open.
 */
export declare function guildBallotOutcome(ballot: GuildBallotView, now: bigint): "approved" | "rejected" | undefined;
