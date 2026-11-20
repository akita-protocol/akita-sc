import { BaseSDK } from "../base";
import { ABIType, type ABIValue } from 'algosdk';
import {
  GuildClient,
  GuildFactory as GuildContractFactory,
  type GuildBaseConfig,
  type GuildConsensusBallot,
  type GuildConsensusRequirements,
  type GuildExecutionMetadata,
  type GuildPluginKey,
  type GuildProposal,
  type GuildProposalCostInfo,
  type GuildProposalSettings,
  type GuildProposalSettingsConfig,
  type GuildVoteTotals,
} from "../generated/GuildClient";
import { GuildConsensusFactoryClient, GuildConsensusFactoryFactory } from "../generated/GuildConsensusFactoryClient";
import { GuildFactoryClient, GuildFactoryFactory, type EscrowConfig, type GuildDeployment } from "../generated/GuildFactoryClient";
import { LockedTokenGuildConsensusClient, LockedTokenGuildConsensusFactory } from "../generated/LockedTokenGuildConsensusClient";
import { FixedSignerGuildConsensusClient, FixedSignerGuildConsensusFactory } from "../generated/FixedSignerGuildConsensusClient";
import { SubscriptionGuildConsensusClient, SubscriptionGuildConsensusFactory } from "../generated/SubscriptionGuildConsensusClient";
import type { NewContractSDKParams } from "../types";
import type { EscrowTeardown } from "../wallet/types";
import { assertEscrowCanBeDeleted } from "../wallet/utils";

export type {
  EscrowConfig,
  GuildBaseConfig,
  GuildConsensusBallot,
  GuildConsensusRequirements,
  GuildDeployment,
  GuildExecutionMetadata,
  GuildPluginKey,
  GuildProposal,
  GuildProposalCostInfo,
  GuildProposalSettings,
  GuildProposalSettingsConfig,
  GuildVoteTotals,
};

export {
  FixedSignerGuildConsensusClient,
  FixedSignerGuildConsensusFactory,
  GuildClient,
  GuildContractFactory,
  GuildConsensusFactoryClient,
  GuildConsensusFactoryFactory,
  GuildFactoryClient,
  GuildFactoryFactory,
  LockedTokenGuildConsensusClient,
  LockedTokenGuildConsensusFactory,
  SubscriptionGuildConsensusClient,
  SubscriptionGuildConsensusFactory,
};

/** On-chain Guild proposal action discriminants. */
export enum GuildActionType {
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
  DeleteEscrow = 73,
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
  LockPluginSet = 110,
}

export enum FixedSignerWeightMode {
  Equal = 1,
  Assigned = 2,
}

/** Fixed-signer consensus action codes (first byte of a `Consensus` action). */
export enum FixedSignerConsensusAction {
  AddMembers = 1,
  RemoveMember = 2,
  SetMemberWeight = 3,
  SetThreshold = 4,
  SetWeightMode = 5,
  LockMembership = 6,
}

/** Subscription consensus action codes (first byte of a `Consensus` action). */
export enum SubscriptionConsensusAction {
  AddOfferings = 1,
  SetOfferingWeight = 2,
  RemoveOffering = 3,
  SetMinimumApprovals = 4,
}

/** Locked-token consensus action codes (first byte of a `Consensus` action). */
export enum LockedTokenConsensusAction {
  SetMinimumApprovals = 1,
}

/** Stable names used to select factory-registered consensus implementations. */
export enum GuildConsensusName {
  FixedSigners = "fixed-signers",
  LockedToken = "locked-token",
  Subscription = "subscription",
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
export type EscrowReclaimInput = { asset: bigint; amount: bigint; closeOut: boolean };
export type GuildProposalSettingsInput = {
  fee: bigint;
  power: bigint;
  duration: bigint;
  participation: bigint;
  approval: bigint;
  minimumApprovals: bigint;
};

export const FIXED_SIGNER_MEMBER_MBR = 25_300n;
export const GUILD_VOTE_MBR = 22_500n;
export const GUILD_CONSENSUS_ACTION_SETTINGS_MBR = 25_300n;
export const SUBSCRIPTION_OFFERING_MBR = 12_500n;
export const SUBSCRIPTION_OFFERING_HISTORY_MBR = 15_700n;
/** Storage for one offering weight slot; quoted per new offering and refunded when a freed slot is reused. */
export const SUBSCRIPTION_WEIGHT_SLOT_MBR = 3_200n;
/** One-time storage for the offering weight slot box, quoted with the first offering. */
export const SUBSCRIPTION_WEIGHTS_BOX_MBR = 2_900n;
/** A subscription policy holds at most this many live offerings. */
export const MAX_SUBSCRIPTION_OFFERINGS = 64n;

const SUBSCRIPTION_OFFERINGS_ABI = "(uint64,uint64,string,byte[36],uint8,byte[3],uint64)[]";
const offeringTuples = (offerings: SubscriptionOfferingInput[]) => {
  if (offerings.length === 0) throw new Error("At least one offering is required");
  return offerings.map((offering) => {
    if (offering.weight <= 0n) throw new Error("Offering weight must be positive");
    const bannerImage = offering.bannerImage ?? new Uint8Array(36);
    const highlightColor = offering.highlightColor ?? new Uint8Array(3);
    if (bannerImage.length !== 36) throw new Error("Banner image CIDs are 36 bytes");
    if (highlightColor.length !== 3) throw new Error("Highlight colors are 3 bytes");
    return [
      offering.interval,
      offering.amount,
      offering.title,
      bannerImage,
      offering.highlightMessage ?? 0,
      highlightColor,
      offering.weight,
    ];
  });
};

const SETTINGS_ABI = "(uint64,uint64,uint64,uint64,uint64,uint64)";
const settingsTuple = (settings: GuildProposalSettingsInput): bigint[] => [
  settings.fee,
  settings.power,
  settings.duration,
  settings.participation,
  settings.approval,
  settings.minimumApprovals,
];

/** Encode the membership interval start returned by the consensus member/history boxes. */
export const fixedSignerVoteEvidence = (since: bigint): Uint8Array => ABIType.from("uint64").encode(since);

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
export const subscriptionVotingOpensAt = ({ startDate, lastPayment, streak, interval }: SubscriptionPaymentHistory): bigint | undefined => {
  if (interval <= 0n || streak <= 0n || lastPayment < startDate) return undefined;
  const lastWindow = (lastPayment - startDate) / interval;
  const firstWindow = streak > lastWindow ? 0n : lastWindow + 1n - streak;
  const runStart = firstWindow === 0n ? startDate : startDate + (firstWindow + 1n) * interval;
  return runStart + interval;
};

/** Whether a subscription was seasoned for a ballot that opened at `openedAt` (chain seconds). */
export const isSubscriptionSeasoned = (history: SubscriptionPaymentHistory, openedAt: bigint): boolean => {
  const opensAt = subscriptionVotingOpensAt(history);
  return opensAt !== undefined && opensAt <= openedAt;
};

/**
 * Encode the subscription a subscriber votes with. The subscription grants power only while it is paid up
 * (`lastPayment + interval >= now`) at the moment of the vote or proposal, and votes only on ballots it
 * was seasoned for when they opened (see `subscriptionVotingOpensAt`).
 * Pass the offering's `since` epoch when its weight changed after the ballot opened (see `SubscriptionGuildConsensusSDK.voteEvidence`).
 */
export const subscriptionVoteEvidence = (subscriptionId: bigint, since?: bigint): Uint8Array =>
  since === undefined
    ? ABIType.from("uint64").encode(subscriptionId)
    : ABIType.from("(uint64,uint64)").encode([subscriptionId, since]);

const encodeGuildAction = (type: GuildActionType, abiType: string, value: ABIValue): GuildProposalAction => [
  type,
  ABIType.from(abiType).encode(value),
];

// CONSENSUS ACTIONS --------------------------------------------------------------------------------

/** Build the opaque `uint8 code || payload` bytes every consensus policy accepts. */
export const encodeConsensusActionData = (code: number, abiType?: string, value?: ABIValue): Uint8Array => {
  if (!Number.isInteger(code) || code < 0 || code > 255) throw new Error("Consensus action code must fit in one byte");
  const payload = abiType === undefined ? new Uint8Array() : ABIType.from(abiType).encode(value as ABIValue);
  const data = new Uint8Array(1 + payload.length);
  data[0] = code;
  data.set(payload, 1);
  return data;
};

/** Wrap opaque consensus action bytes in a Guild action (type 83). */
export const consensusAction = (data: Uint8Array): GuildProposalAction => [GuildActionType.Consensus, data];

const assertMembers = (mode: FixedSignerWeightMode, members: FixedSignerMemberInput[]) => {
  if (members.length === 0) throw new Error("At least one fixed signer is required");
  for (const [, weight] of members) {
    if (weight <= 0n) throw new Error("Fixed-signer weight must be positive");
    if (mode === FixedSignerWeightMode.Equal && weight !== 1n) {
      throw new Error("Equal-weight fixed signers must have weight 1");
    }
  }
};

/** Fixed-signer consensus action builders. */
export const fixedSignerConsensusAction = {
  addMembers: (mode: FixedSignerWeightMode, members: FixedSignerMemberInput[]): GuildProposalAction => {
    assertMembers(mode, members);
    return consensusAction(encodeConsensusActionData(FixedSignerConsensusAction.AddMembers, "(uint8,(address,uint64)[])", [mode, members]));
  },
  removeMember: (member: string): GuildProposalAction =>
    consensusAction(encodeConsensusActionData(FixedSignerConsensusAction.RemoveMember, "(address)", [member])),
  setMemberWeight: (member: string, weight: bigint): GuildProposalAction => {
    if (weight <= 0n) throw new Error("Fixed-signer weight must be positive");
    return consensusAction(encodeConsensusActionData(FixedSignerConsensusAction.SetMemberWeight, "(address,uint64)", [member, weight]));
  },
  setThreshold: (threshold: bigint): GuildProposalAction => {
    if (threshold <= 0n) throw new Error("Fixed-signer threshold must be positive");
    return consensusAction(encodeConsensusActionData(FixedSignerConsensusAction.SetThreshold, "(uint64)", [threshold]));
  },
  setWeightMode: (mode: FixedSignerWeightMode): GuildProposalAction =>
    consensusAction(encodeConsensusActionData(FixedSignerConsensusAction.SetWeightMode, "(uint8)", [mode])),
  lockMembership: (): GuildProposalAction => consensusAction(encodeConsensusActionData(FixedSignerConsensusAction.LockMembership)),
};

/** Subscription consensus action builders. */
export const subscriptionConsensusAction = {
  /** Create new services owned by the policy, each granting `weight` per paid subscription. */
  addOfferings: (offerings: SubscriptionOfferingInput[]): GuildProposalAction =>
    consensusAction(encodeConsensusActionData(SubscriptionConsensusAction.AddOfferings, SUBSCRIPTION_OFFERINGS_ABI, offeringTuples(offerings))),
  setOfferingWeight: (serviceId: bigint, weight: bigint): GuildProposalAction => {
    if (weight <= 0n) throw new Error("Offering weight must be positive");
    return consensusAction(encodeConsensusActionData(SubscriptionConsensusAction.SetOfferingWeight, "(uint64,uint64)", [serviceId, weight]));
  },
  /** Remove an offering and shut its service down; the last remaining offering can never be removed. */
  removeOffering: (serviceId: bigint): GuildProposalAction =>
    consensusAction(encodeConsensusActionData(SubscriptionConsensusAction.RemoveOffering, "(uint64)", [serviceId])),
  /** The new floor may not exceed the approvals of the proposal that sets it. */
  setMinimumApprovals: (minimumApprovals: bigint): GuildProposalAction => {
    if (minimumApprovals <= 0n) throw new Error("Minimum approvals must be positive");
    return consensusAction(encodeConsensusActionData(SubscriptionConsensusAction.SetMinimumApprovals, "(uint64)", [minimumApprovals]));
  },
};

/** Locked-token consensus action builders. */
export const lockedTokenConsensusAction = {
  /** The new floor may not exceed the approvals of the proposal that sets it. */
  setMinimumApprovals: (minimumApprovals: bigint): GuildProposalAction => {
    if (minimumApprovals <= 0n) throw new Error("Minimum approvals must be positive");
    return consensusAction(encodeConsensusActionData(LockedTokenConsensusAction.SetMinimumApprovals, "(uint64)", [minimumApprovals]));
  },
};

/** @deprecated Use `fixedSignerConsensusAction.addMembers`. */
export const addFixedSignerMembersAction = fixedSignerConsensusAction.addMembers;
/** @deprecated Use `fixedSignerConsensusAction.removeMember`. */
export const removeFixedSignerMemberAction = fixedSignerConsensusAction.removeMember;
/** @deprecated Use `fixedSignerConsensusAction.setMemberWeight`. */
export const setFixedSignerMemberWeightAction = fixedSignerConsensusAction.setMemberWeight;

// GUILD ACTIONS ------------------------------------------------------------------------------------

/** Build action 84: attach proposal settings to one opaque consensus action code. */
export const setConsensusActionSettingsAction = (code: number, settings: GuildProposalSettingsInput): GuildProposalAction => {
  if (!Number.isInteger(code) || code < 0 || code > 255) throw new Error("Consensus action code must fit in one byte");
  return encodeGuildAction(GuildActionType.SetConsensusActionSettings, `(uint64,${SETTINGS_ABI})`, [BigInt(code), settingsTuple(settings)]);
};

/** Build action 80: change the proposal settings of one Guild action class. */
export const setProposalSettingsAction = (actionType: GuildActionType, settings: GuildProposalSettingsInput): GuildProposalAction =>
  encodeGuildAction(GuildActionType.SetProposalSettings, `(uint8,${SETTINGS_ABI})`, [actionType, settingsTuple(settings)]);

/** Build action 81. */
export const setProposalActionLimitAction = (limit: bigint): GuildProposalAction =>
  encodeGuildAction(GuildActionType.SetProposalActionLimit, "(uint64)", [limit]);

/** Build action 85: charge new proposals' fees in `asset` (0 = ALGO). Drafts keep the asset they were created with. */
export const setFeeAssetAction = (asset: bigint): GuildProposalAction =>
  encodeGuildAction(GuildActionType.SetFeeAsset, "(uint64)", [asset]);

/** Build action 82: create a fresh Guild wallet through the DAO wallet factory. */
export const newWalletAction = (nickname: string, salt: Uint8Array = new Uint8Array(32)): GuildProposalAction => {
  if (salt.length !== 32) throw new Error("Wallet salts are 32 bytes");
  return encodeGuildAction(GuildActionType.NewWallet, "(string,byte[32])", [nickname, salt]);
};

/** Build action 22: replace the execution-proposal settings of an installed execution-key plugin. */
export const setPluginSettingsAction = (plugin: bigint, escrow: string, settings: GuildProposalSettingsInput): GuildProposalAction =>
  encodeGuildAction(GuildActionType.SetPluginSettings, `(uint64,string,${SETTINGS_ABI})`, [plugin, escrow, settingsTuple(settings)]);

/** Build action 70. Pass the zero address to have the wallet mint an escrow application. */
export const newEscrowAction = (escrow: string, address: string): GuildProposalAction =>
  encodeGuildAction(GuildActionType.NewEscrow, "(string,address)", [escrow, address]);

/** Build action 71. */
export const toggleEscrowLockAction = (escrow: string): GuildProposalAction =>
  encodeGuildAction(GuildActionType.ToggleEscrowLock, "(string)", [escrow]);

/** Build action 72: move escrowed funds back to the Guild wallet. */
export const reclaimAction = (escrow: string, reclaims: EscrowReclaimInput[]): GuildProposalAction => {
  if (reclaims.length === 0) throw new Error("At least one reclaim is required");
  return encodeGuildAction(GuildActionType.Reclaim, "(string,(uint64,uint64,bool)[])", [
    escrow,
    reclaims.map(({ asset, amount, closeOut }) => [asset, amount, closeOut]),
  ]);
};

/**
 * Build action 73: delete an escrow of the Guild wallet by closing its account. Put the actions that
 * remove its plugins and allowances and close out its assets before this one in the same proposal.
 */
export const deleteEscrowAction = (escrow: string): GuildProposalAction =>
  encodeGuildAction(GuildActionType.DeleteEscrow, "(string)", [escrow]);

/** Build action 91: hand the Guild wallet to another administrator and free the wallet slot. */
export const changeAdminAction = (admin: string): GuildProposalAction =>
  encodeGuildAction(GuildActionType.ChangeAdmin, "(address)", [admin]);

const MAX_UINT64 = 18_446_744_073_709_551_615n;
const ZERO_ADDRESS = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ";

/**
 * Add `plugin` to the Guild's wallet for `caller`. A caller-scoped grant without an execution key lets
 * that account use the plugin on the Guild's wallet directly (e.g. the creator while the Guild is a draft);
 * proposal settings only apply to execution-key grants.
 */
export const addPluginAction = ({
  plugin,
  caller,
  escrow = "",
  useExecutionKey = false,
  settings = { fee: 0n, power: 0n, duration: 0n, participation: 0n, approval: 0n, minimumApprovals: 0n },
}: {
  plugin: bigint;
  caller: string;
  escrow?: string;
  useExecutionKey?: boolean;
  settings?: GuildProposalSettingsInput;
}): GuildProposalAction =>
  encodeGuildAction(
    GuildActionType.AddPlugin,
    "(uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,uint64,(uint64,uint8,uint64,uint64,uint64,bool)[])",
    [
      plugin, caller, escrow, 0, MAX_UINT64, 0n, [], false, useExecutionKey, false, false,
      settings.fee, settings.power, settings.duration, settings.participation, settings.approval, settings.minimumApprovals, [],
    ],
  );

/**
 * Let members use `plugin` on the Guild's wallet by vote: a grant for any caller that only runs groups an
 * executed proposal approved (an execution key). `settings` govern those proposals.
 */
export const addVotedPluginAction = ({
  plugin,
  escrow = "",
  settings,
}: {
  plugin: bigint;
  escrow?: string;
  settings: GuildProposalSettingsInput;
}): GuildProposalAction => addPluginAction({ plugin, caller: ZERO_ADDRESS, escrow, useExecutionKey: true, settings });

/**
 * Pre-approve groups that use `plugin` on the Guild's wallet: executing the proposal adds `executionKey`
 * for `groups`, valid from `firstValid` to `lastValid`.
 */
export const executePluginAction = ({
  plugin,
  escrow = "",
  executionKey,
  groups,
  firstValid,
  lastValid,
}: {
  plugin: bigint;
  escrow?: string;
  executionKey: Uint8Array;
  groups: Uint8Array[];
  firstValid: bigint;
  lastValid: bigint;
}): GuildProposalAction => {
  if (executionKey.length !== 32) throw new Error("Execution keys are 32 bytes");
  if (groups.length === 0 || groups.some((group) => group.length !== 32)) throw new Error("Groups are 32-byte IDs");
  return encodeGuildAction(GuildActionType.ExecutePlugin, "(uint64,string,byte[32],byte[32][],uint64,uint64)", [
    plugin, escrow, executionKey, groups, firstValid, lastValid,
  ]);
};

/** Remove `plugin`'s grant for `caller` from the Guild's wallet. */
export const removePluginAction = ({ plugin, caller, escrow = "" }: { plugin: bigint; caller: string; escrow?: string }): GuildProposalAction =>
  encodeGuildAction(GuildActionType.RemovePlugin, "(uint64,address,string)", [plugin, caller, escrow]);

/**
 * Build action 41: remove the alias `name` from the Guild's wallet, with the grant it points at. The
 * grant's key is part of what is voted on, and the action fails if the alias points elsewhere by then.
 */
export const removeNamedPluginAction = ({ name, plugin, caller, escrow = "" }: { name: string; plugin: bigint; caller: string; escrow?: string }): GuildProposalAction =>
  encodeGuildAction(GuildActionType.RemoveNamedPlugin, "(string,uint64,address,string)", [name, plugin, caller, escrow]);

/** Build action 60: remove an escrow's allowances for `assets`. */
export const removeAllowancesAction = (escrow: string, assets: bigint[]): GuildProposalAction => {
  if (assets.length === 0) throw new Error("At least one asset is required");
  return encodeGuildAction(GuildActionType.RemoveAllowances, "(string,uint64[])", [escrow, assets]);
};

/**
 * Build the actions that delete an escrow of a Guild's wallet, in the order the wallet needs them,
 * from what the chain lists for the escrow (`WalletSDK.getEscrowTeardown`): unlock it if asked,
 * remove every grant and alias that names it, remove its allowances, close its assets out to the
 * wallet, then delete it.
 *
 * Put them in one proposal so the whole removal runs in one transaction group. When they are more
 * than the Guild's action limit allows, split them over proposals in this order and execute those in
 * order: the wallet refuses the delete while a plugin or an allowance still names the escrow.
 *
 * An alias whose grant is already gone does not stand in the way and is left alone.
 */
export const deleteEscrowActions = (plan: EscrowTeardown, { unlock = false }: { unlock?: boolean } = {}): GuildProposalAction[] => {
  assertEscrowCanBeDeleted(plan, unlock);

  const actions: GuildProposalAction[] = [];
  if (plan.locked) actions.push(toggleEscrowLockAction(plan.escrow));
  for (const { plugin, caller, escrow, names } of plan.plugins) {
    if (names.length === 0) actions.push(removePluginAction({ plugin, caller, escrow }));
    for (const name of names) actions.push(removeNamedPluginAction({ name, plugin, caller, escrow }));
  }
  if (plan.allowances.length > 0) actions.push(removeAllowancesAction(plan.escrow, plan.allowances));
  if (plan.assets.length > 0) {
    actions.push(reclaimAction(plan.escrow, plan.assets.map((asset) => ({ asset, amount: 0n, closeOut: true }))));
  }
  actions.push(deleteEscrowAction(plan.escrow));
  return actions;
};

/** Build action 31. */
export const removeExecutionAction = (executionKey: Uint8Array): GuildProposalAction => {
  if (executionKey.length !== 32) throw new Error("Execution keys are 32 bytes");
  return encodeGuildAction(GuildActionType.RemoveExecution, "(byte[32])", [executionKey]);
};

/** Build action 90 or 100 or 110 (actions without a payload). */
export const emptyAction = (
  type: GuildActionType.UpdateWallet | GuildActionType.FullyInitialize | GuildActionType.LockPluginSet,
): GuildProposalAction => [type, new Uint8Array()];

// CONSENSUS CONFIGURATION --------------------------------------------------------------------------

/** Factory `governanceConfig` for a fixed-signer Guild. */
export const fixedSignerConsensusConfig = (threshold: bigint): Uint8Array => ABIType.from("(uint64)").encode([threshold]);
/** Factory `governanceConfig` for a locked-token Guild; the floor is an absolute approval-power minimum. */
export const lockedTokenConsensusConfig = (staking: bigint, asset: bigint, minimumApprovals: bigint): Uint8Array => {
  if (minimumApprovals <= 0n) throw new Error("Locked-token Guilds require a positive minimum approval floor");
  return ABIType.from("(uint64,uint64,uint64)").encode([staking, asset, minimumApprovals]);
};
/** Factory `governanceConfig` for a subscription Guild; the policy creates and owns its services. */
export const subscriptionConsensusConfig = (subscriptions: bigint, minimumApprovals: bigint): Uint8Array => {
  if (minimumApprovals <= 0n) throw new Error("Subscription Guilds require a positive minimum approval floor");
  return ABIType.from("(uint64,uint64)").encode([subscriptions, minimumApprovals]);
};
/** Draft `configureConsensus` payload for a fixed-signer Guild. */
export const fixedSignerConfiguration = (mode: FixedSignerWeightMode, members: FixedSignerMemberInput[]): Uint8Array => {
  assertMembers(mode, members);
  return ABIType.from("(uint8,(address,uint64)[])").encode([mode, members]);
};
/** Draft `configureConsensus` payload for a subscription Guild: the services the policy creates. */
export const subscriptionConfiguration = (offerings: SubscriptionOfferingInput[]): Uint8Array =>
  ABIType.from(SUBSCRIPTION_OFFERINGS_ABI).encode(offeringTuples(offerings));

// SDKS ---------------------------------------------------------------------------------------------

/** Public SDK for an individual Guild application. */
export class GuildSDK extends BaseSDK<GuildClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: GuildContractFactory, ...params });
  }
}

/** Public SDK for the boxed Guild deployment factory. */
export class GuildFactorySDK extends BaseSDK<GuildFactoryClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: GuildFactoryFactory, ...params });
  }
}

/** Registry and deployment SDK for consensus implementations. */
export class GuildConsensusFactorySDK extends BaseSDK<GuildConsensusFactoryClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: GuildConsensusFactoryFactory, ...params });
  }
}

/** SDK for locked-token Guild consensus. */
export class LockedTokenGuildConsensusSDK extends BaseSDK<LockedTokenGuildConsensusClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: LockedTokenGuildConsensusFactory, ...params });
  }
}

/** SDK for fixed-signer Guild consensus. */
export class FixedSignerGuildConsensusSDK extends BaseSDK<FixedSignerGuildConsensusClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: FixedSignerGuildConsensusFactory, ...params });
  }

  /** Find evidence for a signer changed after this ballot opened. */
  async voteEvidence(account: string, proposalId: bigint): Promise<Uint8Array> {
    const snapshot = await this.client.state.box.memberSnapshots.value(proposalId);
    if (!snapshot) throw new Error("Ballot snapshot does not exist");
    const member = await this.client.state.box.members.value(account).catch((error: unknown) => {
      if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) return undefined;
      throw error;
    });
    if (member && member.since <= snapshot.epoch) return new Uint8Array();
    for (const [key, history] of await this.client.state.box.memberHistory.getMap()) {
      if (key.account === account && key.since <= snapshot.epoch && snapshot.epoch < history.until) {
        return fixedSignerVoteEvidence(key.since);
      }
    }
    throw new Error("Account was not a member when this ballot opened");
  }
}

/** SDK for subscription Guild consensus. */
export class SubscriptionGuildConsensusSDK extends BaseSDK<SubscriptionGuildConsensusClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: SubscriptionGuildConsensusFactory, ...params });
  }

  /** Build vote evidence for a subscription to `serviceId`, adding `since` if the offering changed after the ballot opened. */
  async voteEvidence(subscriptionId: bigint, serviceId: bigint, proposalId: bigint): Promise<Uint8Array> {
    const snapshot = await this.client.state.box.snapshots.value(proposalId);
    if (snapshot === undefined) throw new Error("Ballot snapshot does not exist");
    const { epoch } = snapshot;
    const offering = await this.client.state.box.offerings.value(serviceId).catch((error: unknown) => {
      if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) return undefined;
      throw error;
    });
    if (offering && offering.since <= epoch) return subscriptionVoteEvidence(subscriptionId);
    for (const [key, history] of await this.client.state.box.offeringHistory.getMap()) {
      if (key.serviceId === serviceId && key.since <= epoch && epoch < history.until) {
        return subscriptionVoteEvidence(subscriptionId, key.since);
      }
    }
    throw new Error("Service did not grant voting weight when this ballot opened");
  }
}

/** A Guild ballot as `getBallot` returns it (the fields early close needs) */
export type GuildBallotView = {
  resolved: boolean;
  votingEnd: bigint;
  eligiblePower: bigint;
  requirements: { participation: bigint; approval: bigint; minimumApprovals: bigint };
  votes: { approvals: bigint; rejections: bigint; abstains: bigint };
};

const GUILD_ONE_HUNDRED_PERCENT = 100_000n;

const meetsGuildRequirements = (ballot: GuildBallotView, approvals: bigint, rejections: bigint, turnout: bigint) => {
  const { participation, approval, minimumApprovals } = ballot.requirements;
  const decisive = approvals + rejections;
  return (
    approvals > 0n &&
    (participation === 0n || turnout * GUILD_ONE_HUNDRED_PERCENT >= ballot.eligiblePower * participation) &&
    (minimumApprovals === 0n || approvals >= minimumApprovals) &&
    (approval === 0n || (decisive > 0n && approvals * GUILD_ONE_HUNDRED_PERCENT >= decisive * approval))
  );
};

/**
 * How a Guild ballot resolves if it is finalized now (`now` in chain seconds), mirroring the consensus
 * contract: after `votingEnd` by the votes cast; before it only once the members who have not voted cannot
 * change the result (early close). `undefined` while voting is open and the result is still open.
 */
export function guildBallotOutcome(ballot: GuildBallotView, now: bigint): "approved" | "rejected" | undefined {
  if (ballot.resolved) return undefined;
  const { approvals, rejections, abstains } = ballot.votes;
  const turnout = approvals + rejections + abstains;
  const passes = meetsGuildRequirements(ballot, approvals, rejections, turnout);
  if (now > ballot.votingEnd) return passes ? "approved" : "rejected";
  if (ballot.eligiblePower === 0n) return undefined;
  const remaining = ballot.eligiblePower > turnout ? ballot.eligiblePower - turnout : 0n;
  if (passes) return meetsGuildRequirements(ballot, approvals, rejections + remaining, turnout) ? "approved" : undefined;
  return meetsGuildRequirements(ballot, approvals + remaining, rejections, turnout + remaining) ? undefined : "rejected";
}
