export * from './types';
export * from './errors';
export { PAYER_RECORD_MBR } from './constants';

// Configuration utilities for environment and network-based app ID resolution
export {
  type AkitaNetwork,
  type AkitaConfig,
  type EnvVarName,
  type NetworkAppIds,
  type PluginAppIdKey,
  type PluginDefinition,
  type PluginDeployment,
  type NetworkPluginDeployments,
  type ResolvedPluginDeployment,
  type DaoEscrowActionV2Cutover,
  ENV_VAR_NAMES,
  getNetworkFromEnv,
  getEnvVar,
  getAppIdFromEnv,
  getConfigFromEnv,
  detectNetworkFromClient,
  getAppIdForSDK,
  resolveAppId,
  resolveAppIdWithClient,
  getCurrentNetwork,
  setCurrentNetwork,
  // Network-specific app IDs
  TESTNET_APP_IDS,
  MAINNET_APP_IDS,
  NETWORK_APP_IDS,
  PLUGIN_APP_ID_KEYS,
  PLUGIN_DEFINITIONS,
  TESTNET_PLUGIN_DEPLOYMENTS,
  MAINNET_PLUGIN_DEPLOYMENTS,
  NETWORK_PLUGIN_DEPLOYMENTS,
  DAO_ESCROW_ACTION_V2_ROUNDS,
  getDaoEscrowActionV2Cutover,
  getPluginDeployments,
  getLatestPluginDeployment,
  resolvePluginDeployment,
  getPluginUpdate,
  getKnownPluginAppIds,
  getNetworkAppIds,
  // Build app IDs from environment variables (for localnet / custom networks)
  ENV_TO_NETWORK_KEY,
  buildAppIdsFromEnv,
  createEmptyAppIds,
  // Principal resolution Phase 3 switch (registry writes)
  REGISTRY_WRITES_STOPPED,
  registryWritesStopped,
  shouldWriteRegistry,
  // Principal resolution Phase 2 switch (social targets)
  SOCIAL_HINTED_TARGETS,
  socialHintedTargets,
} from './config';

export { AuctionSDK, AuctionFactorySDK } from './auction';
export { AkitaDaoSDK } from './dao';
export { EscrowSDK, EscrowFactorySDK } from './escrow';
export { GateSDK } from './gates';
export {
  addFixedSignerMembersAction,
  FixedSignerWeightMode,
  FixedSignerGuildConsensusSDK,
  FIXED_SIGNER_MEMBER_MBR,
  GuildActionType,
  GuildSDK,
  GuildFactorySDK,
  LockedTokenGuildConsensusSDK,
  removeFixedSignerMemberAction,
  setFixedSignerMemberWeightAction,
  SubscriptionGuildConsensusSDK,
  subscriptionVotingOpensAt,
  isSubscriptionSeasoned,
  type FixedSignerMemberInput,
  type GuildProposalAction,
  type SubscriptionPaymentHistory,
} from './guild';
export { HyperSwapSDK, hyperSwapRootName, hyperSwapRootBoxName, computeOfferTerms, validateOffer, offerTermsFromLists, hyperSwapTradeTree, hyperSwapParticipantTree, HYPER_SWAP_MAX_OFFER_DURATION } from './hyper-swap';
export { MarketplaceSDK, ListingSDK } from './marketplace';
export { MetaMerklesSDK } from './meta-merkles';
export { MetaSDK, MetaFactory } from './meta';
export type { SetMetadataArgs, RemoveMetadataArgs } from './meta';
export * from './meta/records';
export * from './meta/schemas';
export * from './meta/preferences';
export { PollSDK, PollFactorySDK } from './poll';
export { PrizeBoxSDK, PrizeBoxFactorySDK } from './prize-box';
export { RaffleSDK, RaffleFactorySDK } from './raffle';
export { RewardsSDK } from './rewards';
export { SocialSDK } from './social';
export { StakingSDK } from './staking';
export { StakingPoolSDK, StakingPoolFactorySDK } from './staking-pool';
export { SubscriptionsSDK, bytesToHexColor, hexColorToBytes, ServicesKey, type Service, type NewServiceArgs, type SubscribeArgs, type SubscriptionInfoWithDetails, ServiceStatus, HighlightMessage } from './subscriptions';
export { WalletSDK, WalletFactorySDK } from './wallet';

// Connect protocol types and URI helpers
export * from './connect';

// Helpers for the arc58 execution-handoff path, where `wallet.build.usePlugin`
// returns `{ windows }` — pre-populated, pre-grouped `PreparedGroup`s that
// can be submitted later by a different actor via `sendPrepared(window, algod)`.
export { sendPrepared, prepareGroup, type PreparedGroup, type SendGroupResult, type ForceOptions } from './simulate/prepare';
export { boxReadHeadroom, BYTES_PER_BOX_REFERENCE, installAccessListResourcePopulator, registerAccessListResourceCarrier, seedAccessResources, seededAccessResources } from './simulate/access-list';

// Off-chain mirror of the principal-resolution standard (also importable as `@akta/sdk/principal`).
export * as principal from './principal';
