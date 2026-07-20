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
    social: bigint;
    socialGraph: bigint;
    socialImpact: bigint;
    socialModeration: bigint;
    auctionFactory: bigint;
    marketplace: bigint;
    raffleFactory: bigint;
    pollFactory: bigint;
    prizeBoxFactory: bigint;
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
    paySiloPlugin: bigint;
    paySiloFactoryPlugin: bigint;
    pollPlugin: bigint;
    rafflePlugin: bigint;
    rewardsPlugin: bigint;
    socialPlugin: bigint;
    stakingPlugin: bigint;
    stakingPoolPlugin: bigint;
    gate: bigint;
    hyperSwap: bigint;
    metaMerkles: bigint;
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
    akta: bigint;
    bones: bigint;
    usdc: bigint;
    vrfBeacon: bigint;
    nfdRegistry: bigint;
    assetInbox: bigint;
    akitaNfd: bigint;
}
export declare const PLUGIN_APP_ID_KEYS: readonly ["revenueManagerPlugin", "updatePlugin", "optinPlugin", "selfOptinPlugin", "asaManagerPlugin", "payPlugin", "haystackRouterPlugin", "hyperSwapPlugin", "subscriptionsPlugin", "auctionPlugin", "daoPlugin", "dualStakePlugin", "gatePlugin", "marketplacePlugin", "nfdPlugin", "paySiloPlugin", "paySiloFactoryPlugin", "pollPlugin", "rafflePlugin", "rewardsPlugin", "socialPlugin", "stakingPlugin", "stakingPoolPlugin"];
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
export declare const PLUGIN_DEFINITIONS: Record<PluginAppIdKey, PluginDefinition>;
/** Ordered oldest to newest. Append replacements; never remove deployed app IDs. */
export declare const TESTNET_PLUGIN_DEPLOYMENTS: NetworkPluginDeployments;
/** Ordered oldest to newest. Append replacements; never remove deployed app IDs. */
export declare const MAINNET_PLUGIN_DEPLOYMENTS: NetworkPluginDeployments;
export declare const NETWORK_PLUGIN_DEPLOYMENTS: Partial<Record<AkitaNetwork, NetworkPluginDeployments>>;
/**
 * Testnet app IDs
 *
 * Last updated: 2026-05-23T07:07:40.259Z
 */
export declare const TESTNET_APP_IDS: NetworkAppIds;
/**
 * Mainnet app IDs
 *
 * Last updated: 2026-05-25T23:08:55Z
 */
export declare const MAINNET_APP_IDS: NetworkAppIds;
/**
 * Map of network to app IDs.
 * Localnet IDs are not included — they are ephemeral and must be provided
 * externally via .env.localnet after each deploy-universe run.
 */
export declare const NETWORK_APP_IDS: Partial<Record<AkitaNetwork, NetworkAppIds>>;
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
export declare const DAO_ESCROW_ACTION_V2_ROUNDS: Partial<Record<AkitaNetwork, DaoEscrowActionV2Cutover>>;
export declare function getDaoEscrowActionV2Cutover(network: AkitaNetwork): DaoEscrowActionV2Cutover | undefined;
/**
 * Create an empty NetworkAppIds object (all 0n).
 * Used as the base for localnet — consumers must overlay with real IDs.
 */
export declare function createEmptyAppIds(): NetworkAppIds;
/**
 * Get app IDs for a specific network.
 * For localnet, returns all zeros — callers must merge in IDs from .env.localnet.
 */
export declare function getNetworkAppIds(network: AkitaNetwork): NetworkAppIds;
/** Return every known deployment for a plugin, ordered oldest to newest. */
export declare function getPluginDeployments(network: AkitaNetwork, key: PluginAppIdKey): readonly PluginDeployment[];
/** Return the canonical deployment new installations should use. */
export declare function getLatestPluginDeployment(network: AkitaNetwork, key: PluginAppIdKey): PluginDeployment | undefined;
/**
 * Resolve any historical plugin app ID to its stable product identity.
 * Revision numbers are one-based and follow deployment order, independent of
 * the contract's own semantic version string.
 */
export declare function resolvePluginDeployment(network: AkitaNetwork, appId: bigint | number): ResolvedPluginDeployment | undefined;
export declare function getPluginUpdate(network: AkitaNetwork, appId: bigint | number): {
    current: ResolvedPluginDeployment;
    latest: ResolvedPluginDeployment;
} | undefined;
export declare function getKnownPluginAppIds(network: AkitaNetwork): readonly bigint[];
/**
 * Mapping from SDK/env var names to NetworkAppIds keys
 */
export declare const ENV_TO_NETWORK_KEY: Record<string, keyof NetworkAppIds>;
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
export declare function buildAppIdsFromEnv(env: Record<string, string | undefined>): NetworkAppIds;
/**
 * Get a specific app ID from the network config
 * @param network - The network
 * @param envVarName - The environment variable name (e.g., 'DAO_APP_ID')
 * @returns The app ID, or undefined if not found or is 0
 */
export declare function getAppIdFromNetwork(network: AkitaNetwork, envVarName: string): bigint | undefined;
