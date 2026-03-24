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
    dao: bigint;
    wallet: bigint;
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
    asaMintPlugin: bigint;
    payPlugin: bigint;
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
/**
 * Testnet app IDs
 *
 * Last updated: 2025-12-15T09:23:03.089Z
 */
export declare const TESTNET_APP_IDS: NetworkAppIds;
/**
 * Mainnet app IDs
 *
 * Last updated: 2025-12-15T10:26:30.297Z
 */
export declare const MAINNET_APP_IDS: NetworkAppIds;
/**
 * Map of network to app IDs.
 * Localnet IDs are not included — they are ephemeral and must be provided
 * externally via .env.localnet after each deploy-universe run.
 */
export declare const NETWORK_APP_IDS: Partial<Record<AkitaNetwork, NetworkAppIds>>;
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
