/**
 * Network-specific app ID configuration
 * 
 * This file contains the baked-in app IDs for each network.
 * These are used when the SDK auto-detects the network from the AlgorandClient.
 * 
 * To update after a deployment:
 * 1. Run deploy-universe.ts for the target network
 * 2. Copy the app IDs from the generated .env file to this file
 */

import { AkitaNetwork } from './config';

/**
 * App IDs for a specific network
 */
export interface NetworkAppIds {
  // Core Contracts
  dao: bigint;
  daoProposalValidator: bigint;
  wallet: bigint;
  escrowFactory: bigint;
  walletFactory: bigint;
  subscriptions: bigint;
  stakingPoolFactory: bigint;
  staking: bigint;
  rewards: bigint;
  
  // Social System
  social: bigint;
  socialGraph: bigint;
  socialImpact: bigint;
  socialModeration: bigint;
  
  // Factories
  auctionFactory: bigint;
  marketplace: bigint;
  raffleFactory: bigint;
  pollFactory: bigint;
  prizeBoxFactory: bigint;
  
  // Plugins
  revenueManagerPlugin: bigint;
  updatePlugin: bigint;
  optinPlugin: bigint;
  selfOptinPlugin: bigint;
  asaMintPlugin: bigint;
  payPlugin: bigint;
  haystackRouterPlugin: bigint;
  hyperSwapPlugin: bigint;
  subscriptionsPlugin: bigint;
  auctionPlugin: bigint;
  daoPlugin: bigint;
  dualStakePlugin: bigint;
  gatePlugin: bigint;
  marketplacePlugin: bigint;
  nfdPlugin: bigint;
  paySiloPlugin: bigint;
  paySiloFactoryPlugin: bigint;
  pollPlugin: bigint;
  rafflePlugin: bigint;
  rewardsPlugin: bigint;
  socialPlugin: bigint;
  stakingPlugin: bigint;
  stakingPoolPlugin: bigint;
  
  // Gate & Other
  gate: bigint;
  hyperSwap: bigint;
  metaMerkles: bigint;
  
  // Subgates
  akitaReferrerGate: bigint;
  assetGate: bigint;
  merkleAddressGate: bigint;
  merkleAssetGate: bigint;
  nfdGate: bigint;
  nfdRootGate: bigint;
  pollGate: bigint;
  socialActivityGate: bigint;
  socialFollowerCountGate: bigint;
  socialFollowerIndexGate: bigint;
  socialImpactGate: bigint;
  socialModeratorGate: bigint;
  stakingAmountGate: bigint;
  stakingPowerGate: bigint;
  subscriptionGate: bigint;
  subscriptionStreakGate: bigint;
  
  // Assets
  akta: bigint;
  bones: bigint;
  usdc: bigint;
  
  // External Apps (for reference)
  vrfBeacon: bigint;
  nfdRegistry: bigint;
  assetInbox: bigint;
  akitaNfd: bigint;
}

/**
 * Testnet app IDs
 * 
 * Last updated: 2026-05-23T07:07:40.259Z
 */
export const TESTNET_APP_IDS: NetworkAppIds = {
  // Core Contracts
  dao: 763128236n,
  daoProposalValidator: 763128235n,
  wallet: 763128598n,
  escrowFactory: 763128227n,
  walletFactory: 763128255n,
  subscriptions: 763128278n,
  stakingPoolFactory: 763128285n,
  staking: 763128307n,
  rewards: 763128244n,
  
  // Social System
  social: 763128333n,
  socialGraph: 763128326n,
  socialImpact: 763128316n,
  socialModeration: 763128334n,
  
  // Factories
  auctionFactory: 763128353n,
  marketplace: 763128381n,
  raffleFactory: 763128404n,
  pollFactory: 763128430n,
  prizeBoxFactory: 763128434n,
  
  // Plugins
  revenueManagerPlugin: 763128627n,
  updatePlugin: 763128671n,
  optinPlugin: 763128795n,
  selfOptinPlugin: 763128796n,
  asaMintPlugin: 763128820n,
  payPlugin: 763128821n,
  haystackRouterPlugin: 763128851n,
  hyperSwapPlugin: 763128858n,
  subscriptionsPlugin: 763128859n,
  auctionPlugin: 763128866n,
  daoPlugin: 763128876n,
  dualStakePlugin: 763128877n,
  gatePlugin: 763128884n,
  marketplacePlugin: 763128885n,
  nfdPlugin: 763128895n,
  paySiloPlugin: 763128904n,
  paySiloFactoryPlugin: 763128905n,
  pollPlugin: 763128906n,
  rafflePlugin: 763128922n,
  rewardsPlugin: 763128923n,
  socialPlugin: 763128930n,
  stakingPlugin: 763128931n,
  stakingPoolPlugin: 763128941n,
  
  // Gate & Other
  gate: 763128492n,
  hyperSwap: 763128499n,
  metaMerkles: 763128435n,
  
  // Subgates
  akitaReferrerGate: 763128503n,
  assetGate: 763128508n,
  merkleAddressGate: 763128509n,
  merkleAssetGate: 763128506n,
  nfdGate: 763128504n,
  nfdRootGate: 763128511n,
  pollGate: 763128514n,
  socialActivityGate: 763128517n,
  socialFollowerCountGate: 763128518n,
  socialFollowerIndexGate: 763128516n,
  socialImpactGate: 763128505n,
  socialModeratorGate: 763128512n,
  stakingAmountGate: 763128513n,
  stakingPowerGate: 763128510n,
  subscriptionGate: 763128507n,
  subscriptionStreakGate: 763128515n,
  
  // Assets
  akta: 752884771n,
  bones: 763129960n,
  usdc: 10458941n,
  
  // External Apps
  vrfBeacon: 600011887n,
  nfdRegistry: 84366825n,
  assetInbox: 643020148n,
  akitaNfd: 0n,
};

/**
 * Mainnet app IDs
 * 
 * Last updated: 2026-05-25T23:08:55Z
 */
export const MAINNET_APP_IDS: NetworkAppIds = {
  // Core Contracts
  dao: 3569556034n,
  daoProposalValidator: 3569555925n,
  wallet: 3569559153n,
  escrowFactory: 3569555755n,
  walletFactory: 3569556257n,
  subscriptions: 3569556497n,
  stakingPoolFactory: 3569556570n,
  staking: 3569556776n,
  rewards: 3569556095n,
  
  // Social System
  social: 3569557130n,
  socialGraph: 3569557033n,
  socialImpact: 3569556973n,
  socialModeration: 3569557176n,
  
  // Factories
  auctionFactory: 3569557408n,
  marketplace: 3569557584n,
  raffleFactory: 3569557743n,
  pollFactory: 3569557932n,
  prizeBoxFactory: 3569557972n,
  
  // Plugins
  revenueManagerPlugin: 3569559335n,
  updatePlugin: 3569559689n,
  optinPlugin: 3569560490n,
  selfOptinPlugin: 3569560545n,
  asaMintPlugin: 3569560791n,
  payPlugin: 3569560828n,
  haystackRouterPlugin: 3579545659n,
  hyperSwapPlugin: 3569561068n,
  subscriptionsPlugin: 3569561107n,
  auctionPlugin: 3569561141n,
  daoPlugin: 3569561215n,
  dualStakePlugin: 3569561317n,
  gatePlugin: 3569561367n,
  marketplacePlugin: 3569561455n,
  nfdPlugin: 3572944055n,
  paySiloPlugin: 3569561570n,
  paySiloFactoryPlugin: 3569561636n,
  pollPlugin: 3569561749n,
  rafflePlugin: 3569561863n,
  rewardsPlugin: 3569561963n,
  socialPlugin: 3569562087n,
  stakingPlugin: 3572944799n,
  stakingPoolPlugin: 3569562283n,
  
  // Gate & Other
  gate: 3569558504n,
  hyperSwap: 3569558555n,
  metaMerkles: 3569558010n,
  
  // Subgates
  akitaReferrerGate: 3569558604n,
  assetGate: 3569558602n,
  merkleAddressGate: 3569558615n,
  merkleAssetGate: 3569558603n,
  nfdGate: 3569558608n,
  nfdRootGate: 3569558606n,
  pollGate: 3569558607n,
  socialActivityGate: 3569558616n,
  socialFollowerCountGate: 3569558612n,
  socialFollowerIndexGate: 3569558605n,
  socialImpactGate: 3569558618n,
  socialModeratorGate: 3569558617n,
  stakingAmountGate: 3569558613n,
  stakingPowerGate: 3569558611n,
  subscriptionGate: 3569558609n,
  subscriptionStreakGate: 3569558614n,
  
  // Assets
  akta: 523683256n,
  bones: 3569570855n,
  usdc: 31566704n,
  
  // External Apps
  vrfBeacon: 1615566206n,
  nfdRegistry: 760937186n,
  assetInbox: 2449590623n,
  akitaNfd: 765902356n,
};

/**
 * Map of network to app IDs.
 * Localnet IDs are not included — they are ephemeral and must be provided
 * externally via .env.localnet after each deploy-universe run.
 */
export const NETWORK_APP_IDS: Partial<Record<AkitaNetwork, NetworkAppIds>> = {
  testnet: TESTNET_APP_IDS,
  mainnet: MAINNET_APP_IDS,
};

/**
 * Create an empty NetworkAppIds object (all 0n).
 * Used as the base for localnet — consumers must overlay with real IDs.
 */
export function createEmptyAppIds(): NetworkAppIds {
  return {
    dao: 0n, daoProposalValidator: 0n, wallet: 0n, escrowFactory: 0n, walletFactory: 0n,
    subscriptions: 0n, stakingPoolFactory: 0n, staking: 0n, rewards: 0n,
    social: 0n, socialGraph: 0n, socialImpact: 0n, socialModeration: 0n,
    auctionFactory: 0n, marketplace: 0n, raffleFactory: 0n, pollFactory: 0n, prizeBoxFactory: 0n,
    revenueManagerPlugin: 0n, updatePlugin: 0n, optinPlugin: 0n, selfOptinPlugin: 0n,
    asaMintPlugin: 0n, payPlugin: 0n, haystackRouterPlugin: 0n, hyperSwapPlugin: 0n, subscriptionsPlugin: 0n,
    auctionPlugin: 0n, daoPlugin: 0n, dualStakePlugin: 0n, gatePlugin: 0n,
    marketplacePlugin: 0n, nfdPlugin: 0n, paySiloPlugin: 0n, paySiloFactoryPlugin: 0n,
    pollPlugin: 0n, rafflePlugin: 0n, rewardsPlugin: 0n, socialPlugin: 0n,
    stakingPlugin: 0n, stakingPoolPlugin: 0n,
    gate: 0n, hyperSwap: 0n, metaMerkles: 0n,
    akitaReferrerGate: 0n, assetGate: 0n, merkleAddressGate: 0n, merkleAssetGate: 0n,
    nfdGate: 0n, nfdRootGate: 0n, pollGate: 0n, socialActivityGate: 0n,
    socialFollowerCountGate: 0n, socialFollowerIndexGate: 0n, socialImpactGate: 0n,
    socialModeratorGate: 0n, stakingAmountGate: 0n, stakingPowerGate: 0n,
    subscriptionGate: 0n, subscriptionStreakGate: 0n,
    akta: 0n, bones: 0n, usdc: 0n,
    vrfBeacon: 0n, nfdRegistry: 0n, assetInbox: 0n, akitaNfd: 0n,
  };
}

/**
 * Get app IDs for a specific network.
 * For localnet, returns all zeros — callers must merge in IDs from .env.localnet.
 */
export function getNetworkAppIds(network: AkitaNetwork): NetworkAppIds {
  return NETWORK_APP_IDS[network] ?? createEmptyAppIds();
}

/**
 * Mapping from SDK/env var names to NetworkAppIds keys
 */
export const ENV_TO_NETWORK_KEY: Record<string, keyof NetworkAppIds> = {
  DAO_APP_ID: 'dao',
  DAO_PROPOSAL_VALIDATOR_APP_ID: 'daoProposalValidator',
  WALLET_APP_ID: 'wallet',
  ESCROW_FACTORY_APP_ID: 'escrowFactory',
  WALLET_FACTORY_APP_ID: 'walletFactory',
  SUBSCRIPTIONS_APP_ID: 'subscriptions',
  STAKING_POOL_FACTORY_APP_ID: 'stakingPoolFactory',
  STAKING_APP_ID: 'staking',
  REWARDS_APP_ID: 'rewards',
  
  // Social System
  SOCIAL_APP_ID: 'social',
  SOCIAL_GRAPH_APP_ID: 'socialGraph',
  SOCIAL_IMPACT_APP_ID: 'socialImpact',
  SOCIAL_MODERATION_APP_ID: 'socialModeration',
  
  // Factories
  AUCTION_FACTORY_APP_ID: 'auctionFactory',
  MARKETPLACE_APP_ID: 'marketplace',
  RAFFLE_FACTORY_APP_ID: 'raffleFactory',
  POLL_FACTORY_APP_ID: 'pollFactory',
  PRIZE_BOX_FACTORY_APP_ID: 'prizeBoxFactory',
  
  // Plugins
  REVENUE_MANAGER_PLUGIN_APP_ID: 'revenueManagerPlugin',
  UPDATE_PLUGIN_APP_ID: 'updatePlugin',
  OPTIN_PLUGIN_APP_ID: 'optinPlugin',
  SELF_OPTIN_PLUGIN_APP_ID: 'selfOptinPlugin',
  ASA_MINT_PLUGIN_APP_ID: 'asaMintPlugin',
  PAY_PLUGIN_APP_ID: 'payPlugin',
  HAYSTACK_ROUTER_PLUGIN_APP_ID: 'haystackRouterPlugin',
  HYPER_SWAP_PLUGIN_APP_ID: 'hyperSwapPlugin',
  SUBSCRIPTIONS_PLUGIN_APP_ID: 'subscriptionsPlugin',
  AUCTION_PLUGIN_APP_ID: 'auctionPlugin',
  DAO_PLUGIN_APP_ID: 'daoPlugin',
  DUAL_STAKE_PLUGIN_APP_ID: 'dualStakePlugin',
  GATE_PLUGIN_APP_ID: 'gatePlugin',
  MARKETPLACE_PLUGIN_APP_ID: 'marketplacePlugin',
  NFD_PLUGIN_APP_ID: 'nfdPlugin',
  PAY_SILO_PLUGIN_APP_ID: 'paySiloPlugin',
  PAY_SILO_FACTORY_PLUGIN_APP_ID: 'paySiloFactoryPlugin',
  POLL_PLUGIN_APP_ID: 'pollPlugin',
  RAFFLE_PLUGIN_APP_ID: 'rafflePlugin',
  REWARDS_PLUGIN_APP_ID: 'rewardsPlugin',
  SOCIAL_PLUGIN_APP_ID: 'socialPlugin',
  STAKING_PLUGIN_APP_ID: 'stakingPlugin',
  STAKING_POOL_PLUGIN_APP_ID: 'stakingPoolPlugin',
  
  // Gate & Other
  GATE_APP_ID: 'gate',
  HYPER_SWAP_APP_ID: 'hyperSwap',
  META_MERKLES_APP_ID: 'metaMerkles',
  
  // Subgates
  AKITA_REFERRER_GATE_APP_ID: 'akitaReferrerGate',
  ASSET_GATE_APP_ID: 'assetGate',
  MERKLE_ADDRESS_GATE_APP_ID: 'merkleAddressGate',
  MERKLE_ASSET_GATE_APP_ID: 'merkleAssetGate',
  NFD_GATE_APP_ID: 'nfdGate',
  NFD_ROOT_GATE_APP_ID: 'nfdRootGate',
  POLL_GATE_APP_ID: 'pollGate',
  SOCIAL_ACTIVITY_GATE_APP_ID: 'socialActivityGate',
  SOCIAL_FOLLOWER_COUNT_GATE_APP_ID: 'socialFollowerCountGate',
  SOCIAL_FOLLOWER_INDEX_GATE_APP_ID: 'socialFollowerIndexGate',
  SOCIAL_IMPACT_GATE_APP_ID: 'socialImpactGate',
  SOCIAL_MODERATOR_GATE_APP_ID: 'socialModeratorGate',
  STAKING_AMOUNT_GATE_APP_ID: 'stakingAmountGate',
  STAKING_POWER_GATE_APP_ID: 'stakingPowerGate',
  SUBSCRIPTION_GATE_APP_ID: 'subscriptionGate',
  SUBSCRIPTION_STREAK_GATE_APP_ID: 'subscriptionStreakGate',
  
  // Assets
  AKTA_ASSET_ID: 'akta',
  BONES_ASSET_ID: 'bones',
  USDC_ASSET_ID: 'usdc',

  // External Apps
  VRF_BEACON_APP_ID: 'vrfBeacon',
  NFD_REGISTRY_APP_ID: 'nfdRegistry',
  ASSET_INBOX_APP_ID: 'assetInbox',
  AKITA_NFD_APP_ID: 'akitaNfd',
};

/**
 * Build a NetworkAppIds object from environment variables.
 * Starts from all zeros and overlays any env vars found in the provided record.
 * Works with any env source — process.env, parsed .env files, Expo extra config, etc.
 *
 * @param env - A record of env var names to string values (e.g., process.env or a parsed .env file)
 * @returns A complete NetworkAppIds with values populated from matching env vars
 *
 * @example
 * // From process.env (e.g., in mock-init after sourcing .env.localnet)
 * const appIds = buildAppIdsFromEnv(process.env)
 *
 * @example
 * // From a parsed .env file
 * const parsed = { DAO_APP_ID: '1006', WALLET_APP_ID: '1106' }
 * const appIds = buildAppIdsFromEnv(parsed)
 */
export function buildAppIdsFromEnv(env: Record<string, string | undefined>): NetworkAppIds {
  const appIds = createEmptyAppIds();

  for (const [envVar, sdkKey] of Object.entries(ENV_TO_NETWORK_KEY)) {
    const val = env[envVar];
    if (val && val !== '0') {
      appIds[sdkKey] = BigInt(val);
    }
  }

  return appIds;
}

/**
 * Get a specific app ID from the network config
 * @param network - The network
 * @param envVarName - The environment variable name (e.g., 'DAO_APP_ID')
 * @returns The app ID, or undefined if not found or is 0
 */
export function getAppIdFromNetwork(network: AkitaNetwork, envVarName: string): bigint | undefined {
  const networkAppIds = getNetworkAppIds(network);

  const key = ENV_TO_NETWORK_KEY[envVarName];
  if (!key) return undefined;

  const appId = networkAppIds[key];
  return appId > 0n ? appId : undefined;
}
