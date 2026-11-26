/**
 * Network-specific app ID configuration
 *
 * This file contains the baked-in app IDs for each network.
 * These are used when the SDK auto-detects the network from the AlgorandClient.
 *
 * To update after a deployment:
 * 1. Run the deployment script for the target network.
 * 2. Plugin scripts append their deployment below; deploy-universe updates the
 *    complete network and appends every plugin deployment.
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
  walletMbr: bigint;
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
  asaManagerPlugin: bigint;
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

  // 2026-10 release. Optional: 0n (or absent) until a receipt `--register` records the deployment.
  /** Meta (replaces the immutable MetaMerkles; aal.metaMerkles moves only after the roots migrate) */
  meta?: bigint;
  metaPlugin?: bigint;
  guildFactory?: bigint;
  guildConsensusFactory?: bigint;
  /** shared GuildPlugin (guild = 0): creates Guilds and can act in any Guild of the factory */
  guildPlugin?: bigint;
  welcomePlugin?: bigint;
  /** SocialClaim: admin for send-to-anyone wallets until a platform identity claims them */
  socialClaim?: bigint;
  /** Collectible Variations registry (immutable singleton; its writer lists live in Meta) */
  collectibleVariations?: bigint;
  /** AbstractedAccountBalanceReader */
  walletBalanceReader?: bigint;
  /** Rewards v1, kept after aal.rewards moves to v2 so v1 allocations and MBR credits stay reachable */
  rewardsV1?: bigint;
  /** ModeratorActivityGate (context-aware sub-gate over AkitaSocialModeration.moderatorActivity) */
  moderatorActivityGate?: bigint;
  /** GovernanceParticipationGate (context-aware sub-gate over AkitaDAO.getGovernanceParticipation) */
  governanceParticipationGate?: bigint;
}

export const PLUGIN_APP_ID_KEYS = ['revenueManagerPlugin', 'updatePlugin', 'optinPlugin', 'selfOptinPlugin', 'asaManagerPlugin', 'payPlugin', 'haystackRouterPlugin', 'hyperSwapPlugin', 'subscriptionsPlugin', 'auctionPlugin', 'daoPlugin', 'dualStakePlugin', 'gatePlugin', 'marketplacePlugin', 'nfdPlugin', 'pollPlugin', 'rafflePlugin', 'rewardsPlugin', 'socialPlugin', 'stakingPlugin', 'stakingPoolPlugin'] as const satisfies readonly (keyof NetworkAppIds)[];

export type PluginAppIdKey = (typeof PLUGIN_APP_ID_KEYS)[number];

export interface PluginDefinition {
  key: PluginAppIdKey;
  name: string;
  description: string;
}

export interface PluginDeployment {
  appId: bigint;
  /** Contract-reported version, when it has been recorded during deployment. */
  version?: string;
  /** ISO timestamp for traceability; ordering in the deployment list is authoritative. */
  deployedAt?: string;
}

export type NetworkPluginDeployments = Record<PluginAppIdKey, readonly PluginDeployment[]>;

export interface ResolvedPluginDeployment extends PluginDefinition, PluginDeployment {
  network: AkitaNetwork;
  revision: number;
  isLatest: boolean;
  latest: PluginDeployment;
}

export const PLUGIN_DEFINITIONS: Record<PluginAppIdKey, PluginDefinition> = {
  revenueManagerPlugin: { key: 'revenueManagerPlugin', name: 'Revenue Manager', description: 'Revenue distribution' },
  updatePlugin: { key: 'updatePlugin', name: 'Update', description: 'Contract updates' },
  optinPlugin: { key: 'optinPlugin', name: 'Opt-in', description: 'ASA opt-in operations' },
  selfOptinPlugin: { key: 'selfOptinPlugin', name: 'Self opt-in', description: 'Self-service ASA opt-in operations' },
  asaManagerPlugin: { key: 'asaManagerPlugin', name: 'ASA Manager', description: 'ASA creation and minting' },
  payPlugin: { key: 'payPlugin', name: 'Pay', description: 'Payment operations' },
  haystackRouterPlugin: { key: 'haystackRouterPlugin', name: 'Haystack Router', description: 'Haystack Router swap integration' },
  hyperSwapPlugin: { key: 'hyperSwapPlugin', name: 'HyperSwap', description: 'P2P multi-party swaps' },
  subscriptionsPlugin: { key: 'subscriptionsPlugin', name: 'Subscriptions', description: 'Subscription management' },
  auctionPlugin: { key: 'auctionPlugin', name: 'Auction', description: 'Auction interactions' },
  daoPlugin: { key: 'daoPlugin', name: 'DAO', description: 'DAO interactions' },
  dualStakePlugin: { key: 'dualStakePlugin', name: 'Dual Stake', description: 'Dual token staking' },
  gatePlugin: { key: 'gatePlugin', name: 'Gate', description: 'Gate verification' },
  marketplacePlugin: { key: 'marketplacePlugin', name: 'Marketplace', description: 'Marketplace operations' },
  nfdPlugin: { key: 'nfdPlugin', name: 'NFD', description: 'NFD operations' },
  pollPlugin: { key: 'pollPlugin', name: 'Poll', description: 'Poll voting' },
  rafflePlugin: { key: 'rafflePlugin', name: 'Raffle', description: 'Raffle participation' },
  rewardsPlugin: { key: 'rewardsPlugin', name: 'Rewards', description: 'Reward claiming' },
  socialPlugin: { key: 'socialPlugin', name: 'Social', description: 'Social interactions' },
  stakingPlugin: { key: 'stakingPlugin', name: 'Staking', description: 'Staking operations' },
  stakingPoolPlugin: { key: 'stakingPoolPlugin', name: 'Staking Pool', description: 'Staking pool interactions' },
};

const TESTNET_DECEMBER_DEPLOYED_AT = '2025-12-15T09:23:03.186Z';
const TESTNET_MAY_DEPLOYED_AT = '2026-05-23T07:07:40.361Z';
const MAINNET_DECEMBER_DEPLOYED_AT = '2025-12-15T10:26:30.400Z';
const MAINNET_MAY_DEPLOYED_AT = '2026-05-23T07:52:58.156Z';

/** Ordered oldest to newest. Append replacements; never remove deployed app IDs. */
export const TESTNET_PLUGIN_DEPLOYMENTS: NetworkPluginDeployments = {
  revenueManagerPlugin: [
    { appId: 751972084n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128627n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 766094477n, version: '0.0.2', deployedAt: '2026-07-11T03:02:23.533Z' },
    { appId: 767111831n, version: '0.0.4', deployedAt: '2026-07-19T01:06:45.498Z' },
    { appId: 777361196n, version: '2.0.0', deployedAt: '2026-11-25T23:02:50.181Z' },
  ],
  updatePlugin: [
    { appId: 751972139n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128671n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777354566n, version: '2.0.0', deployedAt: '2026-11-25T20:41:18.924Z' },
  ],
  optinPlugin: [
    { appId: 751968346n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128795n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358640n, deployedAt: '2026-11-25T21:38:09.125Z' },
  ],
  selfOptinPlugin: [{ appId: 763128796n, deployedAt: TESTNET_MAY_DEPLOYED_AT }, { appId: 767318626n, deployedAt: '2026-07-20T15:37:41.090Z' }, { appId: 777358644n, deployedAt: '2026-11-25T21:38:22.677Z' }],
  asaManagerPlugin: [{ appId: 751968373n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT }, { appId: 763128820n, deployedAt: TESTNET_MAY_DEPLOYED_AT }, { appId: 764705920n }, { appId: 777358657n, deployedAt: '2026-11-25T21:38:36.309Z' }],
  payPlugin: [
    { appId: 751968379n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128821n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777361642n, version: '2.0.0', deployedAt: '2026-11-25T23:05:58.488Z' },
  ],
  haystackRouterPlugin: [{ appId: 763128851n, deployedAt: TESTNET_MAY_DEPLOYED_AT }],
  hyperSwapPlugin: [
    { appId: 751972295n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128858n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358238n, version: '2.0.0', deployedAt: '2026-11-25T21:31:52.744Z' },
  ],
  subscriptionsPlugin: [
    { appId: 751968395n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128859n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358494n, version: '2.0.0', deployedAt: '2026-11-25T21:35:42.624Z' },
  ],
  auctionPlugin: [
    { appId: 751972301n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128866n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358513n, version: '2.0.0', deployedAt: '2026-11-25T21:36:04.344Z' },
  ],
  daoPlugin: [
    { appId: 751972311n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128876n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777356844n, version: '2.0.0', deployedAt: '2026-11-25T21:15:24.906Z' },
  ],
  dualStakePlugin: [
    { appId: 751972317n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128877n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
  ],
  gatePlugin: [
    { appId: 751972318n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128884n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358603n, version: '2.0.0', deployedAt: '2026-11-25T21:37:36.557Z' },
  ],
  marketplacePlugin: [
    { appId: 751968424n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128885n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358517n, version: '2.0.0', deployedAt: '2026-11-25T21:36:15.356Z' },
  ],
  nfdPlugin: [
    { appId: 751972324n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128895n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358660n, deployedAt: '2026-11-25T21:38:41.734Z' },
  ],
  pollPlugin: [
    { appId: 751972340n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128906n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358184n, version: '2.0.0', deployedAt: '2026-11-25T21:31:20.740Z' },
  ],
  rafflePlugin: [
    { appId: 751972341n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128922n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358531n, version: '2.0.0', deployedAt: '2026-11-25T21:36:25.947Z' },
  ],
  rewardsPlugin: [
    { appId: 751972347n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128923n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 777358621n, version: '2.0.0', deployedAt: '2026-11-25T21:37:47.386Z' },
  ],
  socialPlugin: [
    { appId: 751972357n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128930n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 766098156n, version: '0.0.2', deployedAt: '2026-07-11T03:28:28.988Z' },
    { appId: 767297986n, version: '0.0.3', deployedAt: '2026-07-20T05:13:21.978Z' },
    { appId: 767298319n, version: '0.0.3', deployedAt: '2026-07-20T05:24:01.357Z' },
    { appId: 777358481n, version: '2.0.0', deployedAt: '2026-11-25T21:35:32.049Z' },
  ],
  stakingPlugin: [
    { appId: 751972363n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128931n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 767116005n, version: '0.0.3', deployedAt: '2026-07-19T02:52:28.886Z' },
    { appId: 777358609n, version: '2.0.0', deployedAt: '2026-11-25T21:37:42.048Z' },
  ],
  stakingPoolPlugin: [
    { appId: 751972365n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128941n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 767118261n, version: '0.0.2', deployedAt: '2026-07-19T03:49:46.516Z' },
    { appId: 777358499n, version: '2.0.0', deployedAt: '2026-11-25T21:35:53.440Z' },
  ],
};

/** Ordered oldest to newest. Append replacements; never remove deployed app IDs. */
export const MAINNET_PLUGIN_DEPLOYMENTS: NetworkPluginDeployments = {
  revenueManagerPlugin: [
    { appId: 3368395771n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569559335n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3633281195n, version: '0.0.2', deployedAt: '2026-07-11T03:10:16.625Z' },
    { appId: 3642325118n, version: '0.0.4', deployedAt: '2026-07-19T01:27:57.837Z' },
    { appId: 3783372465n, version: '2.0.0', deployedAt: '2026-11-26T02:19:25.568Z' },
  ],
  updatePlugin: [
    { appId: 3368396455n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569559689n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783316013n, version: '2.0.0', deployedAt: '2026-11-26T00:36:04.052Z' },
  ],
  optinPlugin: [
    { appId: 3368398585n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569560490n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783368803n, deployedAt: '2026-11-26T02:10:34.892Z' },
  ],
  selfOptinPlugin: [{ appId: 3569560545n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3644027143n, deployedAt: '2026-07-20T15:38:03.447Z' }, { appId: 3783368862n, deployedAt: '2026-11-26T02:10:40.432Z' }],
  asaManagerPlugin: [{ appId: 3368398964n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT }, { appId: 3569560791n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3605315701n }, { appId: 3783368908n, deployedAt: '2026-11-26T02:10:46.043Z' }],
  payPlugin: [
    { appId: 3368399056n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569560828n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783377516n, version: '2.0.0', deployedAt: '2026-11-26T02:22:00.103Z' },
  ],
  haystackRouterPlugin: [{ appId: 3569561003n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3579545659n }, { appId: 3783369023n, version: '2.0.0', deployedAt: '2026-11-26T02:10:51.550Z' }],
  hyperSwapPlugin: [
    { appId: 3368399121n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561068n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783361853n, version: '2.0.0', deployedAt: '2026-11-26T01:58:36.768Z' },
  ],
  subscriptionsPlugin: [
    { appId: 3368399152n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561107n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783367783n, version: '2.0.0', deployedAt: '2026-11-26T02:08:31.668Z' },
  ],
  auctionPlugin: [
    { appId: 3368399217n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561141n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783367996n, version: '2.0.0', deployedAt: '2026-11-26T02:08:53.393Z' },
  ],
  daoPlugin: [
    { appId: 3368399317n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561215n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783316919n, version: '2.0.0', deployedAt: '2026-11-26T00:37:27.051Z' },
  ],
  dualStakePlugin: [
    { appId: 3368399386n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561317n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
  ],
  gatePlugin: [
    { appId: 3368399411n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561367n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783368632n, version: '2.0.0', deployedAt: '2026-11-26T02:10:15.460Z' },
  ],
  marketplacePlugin: [
    { appId: 3368399474n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561455n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783368085n, version: '2.0.0', deployedAt: '2026-11-26T02:09:04.254Z' },
  ],
  nfdPlugin: [{ appId: 3368399559n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT }, { appId: 3570637728n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3572944055n }, { appId: 3783369090n, deployedAt: '2026-11-26T02:10:57.170Z' }],
  pollPlugin: [
    { appId: 3368399770n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561749n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783361614n, version: '2.0.0', deployedAt: '2026-11-26T01:58:06.412Z' },
  ],
  rafflePlugin: [
    { appId: 3368399868n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561863n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783368172n, version: '2.0.0', deployedAt: '2026-11-26T02:09:15.144Z' },
  ],
  rewardsPlugin: [
    { appId: 3368399956n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561963n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3783368772n, version: '2.0.0', deployedAt: '2026-11-26T02:10:26.532Z' },
  ],
  socialPlugin: [
    { appId: 3368400007n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569562087n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3633295088n, version: '0.0.2', deployedAt: '2026-07-11T03:29:13.775Z' },
    { appId: 3643581007n, version: '0.0.3', deployedAt: '2026-07-20T05:28:54.584Z' },
    { appId: 3783367682n, version: '2.0.0', deployedAt: '2026-11-26T02:08:20.963Z' },
  ],
  stakingPlugin: [{ appId: 3368400044n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT }, { appId: 3569562153n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3572944799n }, { appId: 3642392585n, version: '0.0.3', deployedAt: '2026-07-19T02:57:54.499Z' }, { appId: 3783368727n, version: '2.0.0', deployedAt: '2026-11-26T02:10:20.981Z' }],
  stakingPoolPlugin: [
    { appId: 3368400148n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569562283n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3642438287n, version: '0.0.2', deployedAt: '2026-07-19T03:57:33.158Z' },
    { appId: 3783367889n, version: '2.0.0', deployedAt: '2026-11-26T02:08:42.553Z' },
  ],
};

export const NETWORK_PLUGIN_DEPLOYMENTS: Partial<Record<AkitaNetwork, NetworkPluginDeployments>> = {
  testnet: TESTNET_PLUGIN_DEPLOYMENTS,
  mainnet: MAINNET_PLUGIN_DEPLOYMENTS,
};

function latestPluginAppId(deployments: NetworkPluginDeployments, key: PluginAppIdKey): bigint {
  const versions = deployments[key];
  const latest = versions[versions.length - 1];
  if (!latest) throw new Error(`No deployments configured for ${key}`);
  return latest.appId;
}

/**
 * Testnet app IDs
 *
 * Last updated: 2026-05-23T07:07:40.259Z
 */
export const TESTNET_APP_IDS: NetworkAppIds = {
  // Core Contracts
  dao: 763128236n,
  daoProposalValidator: 777354623n,
  wallet: 763128598n,
  walletMbr: 777358423n,
  escrowFactory: 763128227n,
  walletFactory: 763128255n,
  subscriptions: 763128278n,
  stakingPoolFactory: 763128285n,
  staking: 767114174n,
  rewards: 777357495n,

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
  revenueManagerPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'revenueManagerPlugin'),
  updatePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'updatePlugin'),
  optinPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'optinPlugin'),
  selfOptinPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'selfOptinPlugin'),
  asaManagerPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'asaManagerPlugin'),
  payPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'payPlugin'),
  haystackRouterPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'haystackRouterPlugin'),
  hyperSwapPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'hyperSwapPlugin'),
  subscriptionsPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'subscriptionsPlugin'),
  auctionPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'auctionPlugin'),
  daoPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'daoPlugin'),
  dualStakePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'dualStakePlugin'),
  gatePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'gatePlugin'),
  marketplacePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'marketplacePlugin'),
  nfdPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'nfdPlugin'),
  pollPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'pollPlugin'),
  rafflePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'rafflePlugin'),
  rewardsPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'rewardsPlugin'),
  socialPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'socialPlugin'),
  stakingPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'stakingPlugin'),
  stakingPoolPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, 'stakingPoolPlugin'),

  // Gate & Other
  gate: 777356970n,
  hyperSwap: 763128499n,
  metaMerkles: 763128435n,

  // Subgates
  akitaReferrerGate: 777356990n,
  assetGate: 777356996n,
  merkleAddressGate: 777357012n,
  merkleAssetGate: 777357020n,
  nfdGate: 777357035n,
  nfdRootGate: 777357044n,
  pollGate: 777357065n,
  socialActivityGate: 777357077n,
  socialFollowerCountGate: 777357096n,
  socialFollowerIndexGate: 777357102n,
  socialImpactGate: 777357117n,
  socialModeratorGate: 777357126n,
  stakingAmountGate: 777357165n,
  stakingPowerGate: 777357173n,
  subscriptionGate: 777357191n,
  subscriptionStreakGate: 777357200n,

  // Assets
  akta: 752884771n,
  bones: 763129960n,
  usdc: 10458941n,

  // External Apps
  vrfBeacon: 600011887n,
  nfdRegistry: 84366825n,
  assetInbox: 643020148n,
  akitaNfd: 0n,

  // 2026-10 release: 0n until a receipt --register records the deployment
  meta: 777361599n,
  metaPlugin: 777361610n,
  guildFactory: 777361835n,
  guildConsensusFactory: 777361808n,
  guildPlugin: 777361866n,
  welcomePlugin: 777358536n,
  socialClaim: 0n,
  collectibleVariations: 777361775n,
  walletBalanceReader: 777361926n,
  rewardsV1: 763128244n,
  governanceParticipationGate: 777357149n,
  moderatorActivityGate: 777357141n,
};

/**
 * Mainnet app IDs
 *
 * Last updated: 2026-05-25T23:08:55Z
 */
export const MAINNET_APP_IDS: NetworkAppIds = {
  // Core Contracts
  dao: 3569556034n,
  daoProposalValidator: 3783316415n,
  wallet: 3569559153n,
  walletMbr: 3783363221n,
  escrowFactory: 3569555755n,
  walletFactory: 3569556257n,
  subscriptions: 3569556497n,
  stakingPoolFactory: 3569556570n,
  staking: 3642366153n,
  rewards: 3783355325n,

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
  revenueManagerPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'revenueManagerPlugin'),
  updatePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'updatePlugin'),
  optinPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'optinPlugin'),
  selfOptinPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'selfOptinPlugin'),
  asaManagerPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'asaManagerPlugin'),
  payPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'payPlugin'),
  haystackRouterPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'haystackRouterPlugin'),
  hyperSwapPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'hyperSwapPlugin'),
  subscriptionsPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'subscriptionsPlugin'),
  auctionPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'auctionPlugin'),
  daoPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'daoPlugin'),
  dualStakePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'dualStakePlugin'),
  gatePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'gatePlugin'),
  marketplacePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'marketplacePlugin'),
  nfdPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'nfdPlugin'),
  pollPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'pollPlugin'),
  rafflePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'rafflePlugin'),
  rewardsPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'rewardsPlugin'),
  socialPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'socialPlugin'),
  stakingPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'stakingPlugin'),
  stakingPoolPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, 'stakingPoolPlugin'),

  // Gate & Other
  gate: 3783317627n,
  hyperSwap: 3569558555n,
  metaMerkles: 3569558010n,

  // Subgates
  akitaReferrerGate: 3783317698n,
  assetGate: 3783317850n,
  merkleAddressGate: 3783317913n,
  merkleAssetGate: 3783318002n,
  nfdGate: 3783318085n,
  nfdRootGate: 3783318161n,
  pollGate: 3783318261n,
  socialActivityGate: 3783318333n,
  socialFollowerCountGate: 3783318428n,
  socialFollowerIndexGate: 3783318519n,
  socialImpactGate: 3783318597n,
  socialModeratorGate: 3783318742n,
  stakingAmountGate: 3783319031n,
  stakingPowerGate: 3783319125n,
  subscriptionGate: 3783319272n,
  subscriptionStreakGate: 3783319383n,

  // Assets
  akta: 523683256n,
  bones: 3569570855n,
  usdc: 31566704n,

  // External Apps
  vrfBeacon: 1615566206n,
  nfdRegistry: 760937186n,
  assetInbox: 2449590623n,
  akitaNfd: 765902356n,

  // 2026-10 release: 0n until a receipt --register records the deployment
  meta: 3783375524n,
  metaPlugin: 3783376389n,
  guildFactory: 3783381069n,
  guildConsensusFactory: 3783380842n,
  guildPlugin: 3783381241n,
  welcomePlugin: 3783368260n,
  socialClaim: 0n,
  collectibleVariations: 3783380494n,
  walletBalanceReader: 3783381916n,
  rewardsV1: 3569556095n,
  governanceParticipationGate: 3783318970n,
  moderatorActivityGate: 3783318837n,
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
 * First round where the deployed DAO encodes NewEscrow actions as
 * `(string,address)`. Proposals created before this round use the historical
 * `(string)` shape. A zero value means the cutover has not been recorded yet.
 *
 * `update-dao.ts` replaces the appropriate zero with the exact confirmation
 * round after a successful DAO update.
 */
export interface DaoEscrowActionV2Cutover {
  round: bigint;
  /** Block timestamp; proposal.created is a timestamp rather than a round. */
  timestamp: bigint;
}

export const DAO_ESCROW_ACTION_V2_ROUNDS: Partial<Record<AkitaNetwork, DaoEscrowActionV2Cutover>> = {
  testnet: { round: 69612758n, timestamp: 1795641311n },
  mainnet: { round: 67304551n, timestamp: 1795653432n },
};

export function getDaoEscrowActionV2Cutover(network: AkitaNetwork): DaoEscrowActionV2Cutover | undefined {
  const cutover = DAO_ESCROW_ACTION_V2_ROUNDS[network];
  return cutover && cutover.round > 0n && cutover.timestamp > 0n ? cutover : undefined;
}

/**
 * Principal resolution Phase 3 switch (docs/principal-resolution/PHASE-0-SPEC.md §6.10, §7.1).
 *
 * `true` means the SDK stops writing the EscrowFactory reverse registry by default on that network:
 * `newWallet` skips `register('')` and `addPlugin` skips registering a new escrow. Callers can still
 * force either behaviour with `register` / `registerEscrow`.
 *
 * Rollout order (§7.1): registry writes stop only after the Phase 2 singleton/child upgrades and the
 * Phase 3 plugin proposal have EXECUTED on that network. Before then every deployed consumer
 * (legacy plugin referrals, legacy sub-gates such as AkitaReferrerGate, deployed children) still reads
 * the registry, so a wallet or escrow missing from it silently loses referral payouts and gate eligibility.
 * Flip testnet/mainnet to `true` in the same release that records the executed Phase 3 proposal.
 *
 * LocalNet is `true`: every LocalNet universe is deployed from the current tree (Phases 0-3 applied).
 * TestNet and MainNet are `true` since release 2.0.0: the Phase 2 upgrades and the Phase 3 plugin
 * proposal executed on TestNet on 2026-11-25 and on MainNet on 2026-11-26.
 */
export const REGISTRY_WRITES_STOPPED: Record<AkitaNetwork, boolean> = {
  localnet: true,
  testnet: true,
  mainnet: true,
};

/** Whether the SDK's default is to skip EscrowFactory registry writes on `network` (see REGISTRY_WRITES_STOPPED). */
export function registryWritesStopped(network: AkitaNetwork): boolean {
  return REGISTRY_WRITES_STOPPED[network] ?? false;
}

/**
 * Resolve the effective registry-write choice: an explicit `register` / `registerEscrow` flag wins,
 * otherwise write the registry until Phase 3 has executed on `network`.
 */
export function shouldWriteRegistry(network: AkitaNetwork, explicit?: boolean): boolean {
  return explicit ?? !registryWritesStopped(network);
}

/**
 * Principal resolution Phase 2 switch for the social targets (docs/principal-resolution/PHASE-0-SPEC.md
 * §6.2, §6.3, §7.1).
 *
 * `true` means AkitaSocial and AkitaSocialGraph on that network run the principal-resolution upgrade:
 * `SocialSDK` writes call the hinted overloads (trailing `wallet` hint), quote the corrected box MBR,
 * and gated writes expect a `Gate.mustCheckFor` txn (Gate v2). `false` means the deployed programs:
 * `SocialSDK` calls the legacy selectors with the deployed MBR terms, gated writes expect a
 * `Gate.mustCheck` txn, a non-zero `wallet` hint is refused locally, and `setMetaWallet` is unavailable.
 *
 * Rollout order (§7.1): flip testnet/mainnet to `true` in the release that records the EXECUTED Phase 2
 * AkitaSocial/AkitaSocialGraph upgrade on that network. Until then the deployed programs have no hinted
 * selectors, and after it a top-level call of an old selector must pay the corrected MBR.
 *
 * LocalNet is `true`: every LocalNet universe is deployed from the current tree.
 * TestNet and MainNet are `true` since release 2.0.0: the Phase 2 AkitaSocial and AkitaSocialGraph
 * upgrade executed on TestNet on 2026-11-25 and on MainNet on 2026-11-26.
 */
export const SOCIAL_HINTED_TARGETS: Record<AkitaNetwork, boolean> = {
  localnet: true,
  testnet: true,
  mainnet: true,
};

/** Whether `SocialSDK` targets the upgraded (hinted) social programs on `network`; an explicit choice wins. */
export function socialHintedTargets(network: AkitaNetwork, explicit?: boolean): boolean {
  return explicit ?? SOCIAL_HINTED_TARGETS[network] ?? false;
}

/**
 * Create an empty NetworkAppIds object (all 0n).
 * Used as the base for localnet — consumers must overlay with real IDs.
 */
export function createEmptyAppIds(): NetworkAppIds {
  return {
    dao: 0n,
    daoProposalValidator: 0n,
    wallet: 0n,
    walletMbr: 0n,
    escrowFactory: 0n,
    walletFactory: 0n,
    subscriptions: 0n,
    stakingPoolFactory: 0n,
    staking: 0n,
    rewards: 0n,
    social: 0n,
    socialGraph: 0n,
    socialImpact: 0n,
    socialModeration: 0n,
    auctionFactory: 0n,
    marketplace: 0n,
    raffleFactory: 0n,
    pollFactory: 0n,
    prizeBoxFactory: 0n,
    revenueManagerPlugin: 0n,
    updatePlugin: 0n,
    optinPlugin: 0n,
    selfOptinPlugin: 0n,
    asaManagerPlugin: 0n,
    payPlugin: 0n,
    haystackRouterPlugin: 0n,
    hyperSwapPlugin: 0n,
    subscriptionsPlugin: 0n,
    auctionPlugin: 0n,
    daoPlugin: 0n,
    dualStakePlugin: 0n,
    gatePlugin: 0n,
    marketplacePlugin: 0n,
    nfdPlugin: 0n,
    pollPlugin: 0n,
    rafflePlugin: 0n,
    rewardsPlugin: 0n,
    socialPlugin: 0n,
    stakingPlugin: 0n,
    stakingPoolPlugin: 0n,
    gate: 0n,
    hyperSwap: 0n,
    metaMerkles: 0n,
    akitaReferrerGate: 0n,
    assetGate: 0n,
    merkleAddressGate: 0n,
    merkleAssetGate: 0n,
    nfdGate: 0n,
    nfdRootGate: 0n,
    pollGate: 0n,
    socialActivityGate: 0n,
    socialFollowerCountGate: 0n,
    socialFollowerIndexGate: 0n,
    socialImpactGate: 0n,
    socialModeratorGate: 0n,
    stakingAmountGate: 0n,
    stakingPowerGate: 0n,
    subscriptionGate: 0n,
    subscriptionStreakGate: 0n,
    akta: 0n,
    bones: 0n,
    usdc: 0n,
    vrfBeacon: 0n,
    nfdRegistry: 0n,
    assetInbox: 0n,
    akitaNfd: 0n,
  };
}

/**
 * Get app IDs for a specific network.
 * For localnet, returns all zeros — callers must merge in IDs from .env.localnet.
 */
export function getNetworkAppIds(network: AkitaNetwork): NetworkAppIds {
  return NETWORK_APP_IDS[network] ?? createEmptyAppIds();
}

/** Return every known deployment for a plugin, ordered oldest to newest. */
export function getPluginDeployments(network: AkitaNetwork, key: PluginAppIdKey): readonly PluginDeployment[] {
  return NETWORK_PLUGIN_DEPLOYMENTS[network]?.[key] ?? [];
}

/** Return the canonical deployment new installations should use. */
export function getLatestPluginDeployment(network: AkitaNetwork, key: PluginAppIdKey): PluginDeployment | undefined {
  const deployments = getPluginDeployments(network, key);
  return deployments[deployments.length - 1];
}

/**
 * Resolve any historical plugin app ID to its stable product identity.
 * Revision numbers are one-based and follow deployment order, independent of
 * the contract's own semantic version string.
 */
export function resolvePluginDeployment(network: AkitaNetwork, appId: bigint | number): ResolvedPluginDeployment | undefined {
  const requestedAppId = BigInt(appId);
  const deployments = NETWORK_PLUGIN_DEPLOYMENTS[network];
  if (!deployments) return undefined;

  for (const key of PLUGIN_APP_ID_KEYS) {
    const versions = deployments[key];
    const index = versions.findIndex((deployment) => deployment.appId === requestedAppId);
    if (index === -1) continue;

    const deployment = versions[index];
    const latest = versions[versions.length - 1]!;
    return {
      ...PLUGIN_DEFINITIONS[key],
      ...deployment,
      network,
      revision: index + 1,
      isLatest: deployment.appId === latest.appId,
      latest,
    };
  }

  return undefined;
}

export function getPluginUpdate(network: AkitaNetwork, appId: bigint | number): { current: ResolvedPluginDeployment; latest: ResolvedPluginDeployment } | undefined {
  const current = resolvePluginDeployment(network, appId);
  if (!current || current.isLatest) return undefined;

  const latest = resolvePluginDeployment(network, current.latest.appId);
  if (!latest) return undefined;
  return { current, latest };
}

export function getKnownPluginAppIds(network: AkitaNetwork): readonly bigint[] {
  const deployments = NETWORK_PLUGIN_DEPLOYMENTS[network];
  if (!deployments) return [];
  return PLUGIN_APP_ID_KEYS.flatMap((key) => deployments[key].map(({ appId }) => appId));
}

/**
 * Mapping from SDK/env var names to NetworkAppIds keys
 */
export const ENV_TO_NETWORK_KEY: Record<string, keyof NetworkAppIds> = {
  DAO_APP_ID: 'dao',
  DAO_PROPOSAL_VALIDATOR_APP_ID: 'daoProposalValidator',
  WALLET_APP_ID: 'wallet',
  WALLET_MBR_APP_ID: 'walletMbr',
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
  ASA_MINT_PLUGIN_APP_ID: 'asaManagerPlugin',
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

  // 2026-10 release
  META_APP_ID: 'meta',
  META_PLUGIN_APP_ID: 'metaPlugin',
  GUILD_FACTORY_APP_ID: 'guildFactory',
  GUILD_CONSENSUS_FACTORY_APP_ID: 'guildConsensusFactory',
  GUILD_PLUGIN_APP_ID: 'guildPlugin',
  WELCOME_PLUGIN_APP_ID: 'welcomePlugin',
  SOCIAL_CLAIM_APP_ID: 'socialClaim',
  COLLECTIBLE_VARIATIONS_APP_ID: 'collectibleVariations',
  WALLET_BALANCE_READER_APP_ID: 'walletBalanceReader',
  REWARDS_V1_APP_ID: 'rewardsV1',
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
  return appId && appId > 0n ? appId : undefined;
}
