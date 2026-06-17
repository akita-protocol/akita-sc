// src/networks.ts
var TESTNET_APP_IDS = {
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
  asaManagerPlugin: 764705920n,
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
  akitaNfd: 0n
};
var MAINNET_APP_IDS = {
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
  asaManagerPlugin: 3605315701n,
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
  akitaNfd: 765902356n
};
var NETWORK_APP_IDS = {
  testnet: TESTNET_APP_IDS,
  mainnet: MAINNET_APP_IDS
};
function createEmptyAppIds() {
  return {
    dao: 0n,
    daoProposalValidator: 0n,
    wallet: 0n,
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
    paySiloPlugin: 0n,
    paySiloFactoryPlugin: 0n,
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
    akitaNfd: 0n
  };
}
function getNetworkAppIds(network) {
  return NETWORK_APP_IDS[network] ?? createEmptyAppIds();
}
var ENV_TO_NETWORK_KEY = {
  DAO_APP_ID: "dao",
  DAO_PROPOSAL_VALIDATOR_APP_ID: "daoProposalValidator",
  WALLET_APP_ID: "wallet",
  ESCROW_FACTORY_APP_ID: "escrowFactory",
  WALLET_FACTORY_APP_ID: "walletFactory",
  SUBSCRIPTIONS_APP_ID: "subscriptions",
  STAKING_POOL_FACTORY_APP_ID: "stakingPoolFactory",
  STAKING_APP_ID: "staking",
  REWARDS_APP_ID: "rewards",
  // Social System
  SOCIAL_APP_ID: "social",
  SOCIAL_GRAPH_APP_ID: "socialGraph",
  SOCIAL_IMPACT_APP_ID: "socialImpact",
  SOCIAL_MODERATION_APP_ID: "socialModeration",
  // Factories
  AUCTION_FACTORY_APP_ID: "auctionFactory",
  MARKETPLACE_APP_ID: "marketplace",
  RAFFLE_FACTORY_APP_ID: "raffleFactory",
  POLL_FACTORY_APP_ID: "pollFactory",
  PRIZE_BOX_FACTORY_APP_ID: "prizeBoxFactory",
  // Plugins
  REVENUE_MANAGER_PLUGIN_APP_ID: "revenueManagerPlugin",
  UPDATE_PLUGIN_APP_ID: "updatePlugin",
  OPTIN_PLUGIN_APP_ID: "optinPlugin",
  SELF_OPTIN_PLUGIN_APP_ID: "selfOptinPlugin",
  ASA_MINT_PLUGIN_APP_ID: "asaManagerPlugin",
  PAY_PLUGIN_APP_ID: "payPlugin",
  HAYSTACK_ROUTER_PLUGIN_APP_ID: "haystackRouterPlugin",
  HYPER_SWAP_PLUGIN_APP_ID: "hyperSwapPlugin",
  SUBSCRIPTIONS_PLUGIN_APP_ID: "subscriptionsPlugin",
  AUCTION_PLUGIN_APP_ID: "auctionPlugin",
  DAO_PLUGIN_APP_ID: "daoPlugin",
  DUAL_STAKE_PLUGIN_APP_ID: "dualStakePlugin",
  GATE_PLUGIN_APP_ID: "gatePlugin",
  MARKETPLACE_PLUGIN_APP_ID: "marketplacePlugin",
  NFD_PLUGIN_APP_ID: "nfdPlugin",
  PAY_SILO_PLUGIN_APP_ID: "paySiloPlugin",
  PAY_SILO_FACTORY_PLUGIN_APP_ID: "paySiloFactoryPlugin",
  POLL_PLUGIN_APP_ID: "pollPlugin",
  RAFFLE_PLUGIN_APP_ID: "rafflePlugin",
  REWARDS_PLUGIN_APP_ID: "rewardsPlugin",
  SOCIAL_PLUGIN_APP_ID: "socialPlugin",
  STAKING_PLUGIN_APP_ID: "stakingPlugin",
  STAKING_POOL_PLUGIN_APP_ID: "stakingPoolPlugin",
  // Gate & Other
  GATE_APP_ID: "gate",
  HYPER_SWAP_APP_ID: "hyperSwap",
  META_MERKLES_APP_ID: "metaMerkles",
  // Subgates
  AKITA_REFERRER_GATE_APP_ID: "akitaReferrerGate",
  ASSET_GATE_APP_ID: "assetGate",
  MERKLE_ADDRESS_GATE_APP_ID: "merkleAddressGate",
  MERKLE_ASSET_GATE_APP_ID: "merkleAssetGate",
  NFD_GATE_APP_ID: "nfdGate",
  NFD_ROOT_GATE_APP_ID: "nfdRootGate",
  POLL_GATE_APP_ID: "pollGate",
  SOCIAL_ACTIVITY_GATE_APP_ID: "socialActivityGate",
  SOCIAL_FOLLOWER_COUNT_GATE_APP_ID: "socialFollowerCountGate",
  SOCIAL_FOLLOWER_INDEX_GATE_APP_ID: "socialFollowerIndexGate",
  SOCIAL_IMPACT_GATE_APP_ID: "socialImpactGate",
  SOCIAL_MODERATOR_GATE_APP_ID: "socialModeratorGate",
  STAKING_AMOUNT_GATE_APP_ID: "stakingAmountGate",
  STAKING_POWER_GATE_APP_ID: "stakingPowerGate",
  SUBSCRIPTION_GATE_APP_ID: "subscriptionGate",
  SUBSCRIPTION_STREAK_GATE_APP_ID: "subscriptionStreakGate",
  // Assets
  AKTA_ASSET_ID: "akta",
  BONES_ASSET_ID: "bones",
  USDC_ASSET_ID: "usdc",
  // External Apps
  VRF_BEACON_APP_ID: "vrfBeacon",
  NFD_REGISTRY_APP_ID: "nfdRegistry",
  ASSET_INBOX_APP_ID: "assetInbox",
  AKITA_NFD_APP_ID: "akitaNfd"
};
function buildAppIdsFromEnv(env) {
  const appIds = createEmptyAppIds();
  for (const [envVar, sdkKey] of Object.entries(ENV_TO_NETWORK_KEY)) {
    const val = env[envVar];
    if (val && val !== "0") {
      appIds[sdkKey] = BigInt(val);
    }
  }
  return appIds;
}
function getAppIdFromNetwork(network, envVarName) {
  const networkAppIds = getNetworkAppIds(network);
  const key = ENV_TO_NETWORK_KEY[envVarName];
  if (!key) return void 0;
  const appId = networkAppIds[key];
  return appId > 0n ? appId : void 0;
}

// src/config.ts
var ENV_VAR_NAMES = {
  // Network
  NETWORK: "ALGORAND_NETWORK",
  // Core Contracts
  DAO_APP_ID: "DAO_APP_ID",
  DAO_PROPOSAL_VALIDATOR_APP_ID: "DAO_PROPOSAL_VALIDATOR_APP_ID",
  WALLET_APP_ID: "WALLET_APP_ID",
  ESCROW_FACTORY_APP_ID: "ESCROW_FACTORY_APP_ID",
  WALLET_FACTORY_APP_ID: "WALLET_FACTORY_APP_ID",
  SUBSCRIPTIONS_APP_ID: "SUBSCRIPTIONS_APP_ID",
  STAKING_POOL_FACTORY_APP_ID: "STAKING_POOL_FACTORY_APP_ID",
  STAKING_APP_ID: "STAKING_APP_ID",
  REWARDS_APP_ID: "REWARDS_APP_ID",
  // Social System
  SOCIAL_APP_ID: "SOCIAL_APP_ID",
  SOCIAL_GRAPH_APP_ID: "SOCIAL_GRAPH_APP_ID",
  SOCIAL_IMPACT_APP_ID: "SOCIAL_IMPACT_APP_ID",
  SOCIAL_MODERATION_APP_ID: "SOCIAL_MODERATION_APP_ID",
  // Factories
  AUCTION_FACTORY_APP_ID: "AUCTION_FACTORY_APP_ID",
  MARKETPLACE_APP_ID: "MARKETPLACE_APP_ID",
  RAFFLE_FACTORY_APP_ID: "RAFFLE_FACTORY_APP_ID",
  POLL_FACTORY_APP_ID: "POLL_FACTORY_APP_ID",
  PRIZE_BOX_FACTORY_APP_ID: "PRIZE_BOX_FACTORY_APP_ID",
  // Plugins
  REVENUE_MANAGER_PLUGIN_APP_ID: "REVENUE_MANAGER_PLUGIN_APP_ID",
  UPDATE_PLUGIN_APP_ID: "UPDATE_PLUGIN_APP_ID",
  OPTIN_PLUGIN_APP_ID: "OPTIN_PLUGIN_APP_ID",
  ASA_MINT_PLUGIN_APP_ID: "ASA_MINT_PLUGIN_APP_ID",
  PAY_PLUGIN_APP_ID: "PAY_PLUGIN_APP_ID",
  HYPER_SWAP_PLUGIN_APP_ID: "HYPER_SWAP_PLUGIN_APP_ID",
  SUBSCRIPTIONS_PLUGIN_APP_ID: "SUBSCRIPTIONS_PLUGIN_APP_ID",
  AUCTION_PLUGIN_APP_ID: "AUCTION_PLUGIN_APP_ID",
  DAO_PLUGIN_APP_ID: "DAO_PLUGIN_APP_ID",
  DUAL_STAKE_PLUGIN_APP_ID: "DUAL_STAKE_PLUGIN_APP_ID",
  GATE_PLUGIN_APP_ID: "GATE_PLUGIN_APP_ID",
  MARKETPLACE_PLUGIN_APP_ID: "MARKETPLACE_PLUGIN_APP_ID",
  NFD_PLUGIN_APP_ID: "NFD_PLUGIN_APP_ID",
  PAY_SILO_PLUGIN_APP_ID: "PAY_SILO_PLUGIN_APP_ID",
  PAY_SILO_FACTORY_PLUGIN_APP_ID: "PAY_SILO_FACTORY_PLUGIN_APP_ID",
  POLL_PLUGIN_APP_ID: "POLL_PLUGIN_APP_ID",
  RAFFLE_PLUGIN_APP_ID: "RAFFLE_PLUGIN_APP_ID",
  REWARDS_PLUGIN_APP_ID: "REWARDS_PLUGIN_APP_ID",
  SOCIAL_PLUGIN_APP_ID: "SOCIAL_PLUGIN_APP_ID",
  STAKING_PLUGIN_APP_ID: "STAKING_PLUGIN_APP_ID",
  STAKING_POOL_PLUGIN_APP_ID: "STAKING_POOL_PLUGIN_APP_ID",
  // Gates & Other
  GATE_APP_ID: "GATE_APP_ID",
  HYPER_SWAP_APP_ID: "HYPER_SWAP_APP_ID",
  META_MERKLES_APP_ID: "META_MERKLES_APP_ID",
  // Subgates
  AKITA_REFERRER_GATE_APP_ID: "AKITA_REFERRER_GATE_APP_ID",
  ASSET_GATE_APP_ID: "ASSET_GATE_APP_ID",
  MERKLE_ADDRESS_GATE_APP_ID: "MERKLE_ADDRESS_GATE_APP_ID",
  MERKLE_ASSET_GATE_APP_ID: "MERKLE_ASSET_GATE_APP_ID",
  NFD_GATE_APP_ID: "NFD_GATE_APP_ID",
  NFD_ROOT_GATE_APP_ID: "NFD_ROOT_GATE_APP_ID",
  POLL_GATE_APP_ID: "POLL_GATE_APP_ID",
  SOCIAL_ACTIVITY_GATE_APP_ID: "SOCIAL_ACTIVITY_GATE_APP_ID",
  SOCIAL_FOLLOWER_COUNT_GATE_APP_ID: "SOCIAL_FOLLOWER_COUNT_GATE_APP_ID",
  SOCIAL_FOLLOWER_INDEX_GATE_APP_ID: "SOCIAL_FOLLOWER_INDEX_GATE_APP_ID",
  SOCIAL_IMPACT_GATE_APP_ID: "SOCIAL_IMPACT_GATE_APP_ID",
  SOCIAL_MODERATOR_GATE_APP_ID: "SOCIAL_MODERATOR_GATE_APP_ID",
  STAKING_AMOUNT_GATE_APP_ID: "STAKING_AMOUNT_GATE_APP_ID",
  STAKING_POWER_GATE_APP_ID: "STAKING_POWER_GATE_APP_ID",
  SUBSCRIPTION_GATE_APP_ID: "SUBSCRIPTION_GATE_APP_ID",
  SUBSCRIPTION_STREAK_GATE_APP_ID: "SUBSCRIPTION_STREAK_GATE_APP_ID",
  // Assets
  AKTA_ASSET_ID: "AKTA_ASSET_ID",
  BONES_ASSET_ID: "BONES_ASSET_ID",
  // External Apps
  VRF_BEACON_APP_ID: "VRF_BEACON_APP_ID",
  NFD_REGISTRY_APP_ID: "NFD_REGISTRY_APP_ID",
  ASSET_INBOX_APP_ID: "ASSET_INBOX_APP_ID",
  AKITA_NFD_APP_ID: "AKITA_NFD_APP_ID"
};
function getNetworkFromEnv() {
  const envVarNames = [
    ENV_VAR_NAMES.NETWORK,
    // ALGORAND_NETWORK
    "ALGOD_NETWORK",
    "NEXT_PUBLIC_ALGORAND_NETWORK",
    "NEXT_PUBLIC_ALGOD_NETWORK"
  ];
  for (const name of envVarNames) {
    const network = getEnvVar(name);
    if (network === "testnet" || network === "mainnet" || network === "localnet") {
      return network;
    }
  }
  throw new Error(
    `No valid network configured. Set one of these environment variables to 'localnet', 'testnet', or 'mainnet': ${envVarNames.join(", ")}`
  );
}
function getEnvVar(name) {
  if (typeof process !== "undefined" && process.env) {
    return process.env[name];
  }
  const g = globalThis;
  if (typeof g.window !== "undefined" && g.window.__AKITA_ENV__) {
    return g.window.__AKITA_ENV__[name];
  }
  return void 0;
}
function getAppIdFromEnv(envVarName) {
  const value = getEnvVar(envVarName);
  if (!value) return void 0;
  try {
    const parsed = BigInt(value);
    return parsed > 0n ? parsed : void 0;
  } catch {
    return void 0;
  }
}
function getConfigFromEnv() {
  return {
    network: getNetworkFromEnv(),
    // Core Contracts
    daoAppId: getAppIdFromEnv(ENV_VAR_NAMES.DAO_APP_ID),
    daoProposalValidatorAppId: getAppIdFromEnv(ENV_VAR_NAMES.DAO_PROPOSAL_VALIDATOR_APP_ID),
    walletAppId: getAppIdFromEnv(ENV_VAR_NAMES.WALLET_APP_ID),
    escrowFactoryAppId: getAppIdFromEnv(ENV_VAR_NAMES.ESCROW_FACTORY_APP_ID),
    walletFactoryAppId: getAppIdFromEnv(ENV_VAR_NAMES.WALLET_FACTORY_APP_ID),
    subscriptionsAppId: getAppIdFromEnv(ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID),
    stakingPoolFactoryAppId: getAppIdFromEnv(ENV_VAR_NAMES.STAKING_POOL_FACTORY_APP_ID),
    stakingAppId: getAppIdFromEnv(ENV_VAR_NAMES.STAKING_APP_ID),
    rewardsAppId: getAppIdFromEnv(ENV_VAR_NAMES.REWARDS_APP_ID),
    // Social System
    socialAppId: getAppIdFromEnv(ENV_VAR_NAMES.SOCIAL_APP_ID),
    socialGraphAppId: getAppIdFromEnv(ENV_VAR_NAMES.SOCIAL_GRAPH_APP_ID),
    socialImpactAppId: getAppIdFromEnv(ENV_VAR_NAMES.SOCIAL_IMPACT_APP_ID),
    socialModerationAppId: getAppIdFromEnv(ENV_VAR_NAMES.SOCIAL_MODERATION_APP_ID),
    // Factories
    auctionFactoryAppId: getAppIdFromEnv(ENV_VAR_NAMES.AUCTION_FACTORY_APP_ID),
    marketplaceAppId: getAppIdFromEnv(ENV_VAR_NAMES.MARKETPLACE_APP_ID),
    raffleFactoryAppId: getAppIdFromEnv(ENV_VAR_NAMES.RAFFLE_FACTORY_APP_ID),
    pollFactoryAppId: getAppIdFromEnv(ENV_VAR_NAMES.POLL_FACTORY_APP_ID),
    prizeBoxFactoryAppId: getAppIdFromEnv(ENV_VAR_NAMES.PRIZE_BOX_FACTORY_APP_ID),
    // Gates & Other
    gateAppId: getAppIdFromEnv(ENV_VAR_NAMES.GATE_APP_ID),
    hyperSwapAppId: getAppIdFromEnv(ENV_VAR_NAMES.HYPER_SWAP_APP_ID),
    metaMerklesAppId: getAppIdFromEnv(ENV_VAR_NAMES.META_MERKLES_APP_ID),
    // Assets
    aktaAssetId: getAppIdFromEnv(ENV_VAR_NAMES.AKTA_ASSET_ID),
    bonesAssetId: getAppIdFromEnv(ENV_VAR_NAMES.BONES_ASSET_ID)
  };
}
var TESTNET_URL_PATTERNS = [
  "testnet",
  "testnet.algonode.cloud",
  "testnet-api.algonode.cloud",
  "testnet-algod.algonode.cloud"
];
var MAINNET_URL_PATTERNS = [
  "mainnet",
  "mainnet.algonode.cloud",
  "mainnet-api.algonode.cloud",
  "mainnet-algod.algonode.cloud",
  "algonode.io"
  // mainnet uses .io
];
var LOCALNET_URL_PATTERNS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  ":4001"
  // Default algod port
];
function detectNetworkFromClient(algorand) {
  var _a, _b, _c;
  const explicitNetwork = getCurrentNetwork();
  if (explicitNetwork !== void 0) {
    return explicitNetwork;
  }
  try {
    return getNetworkFromEnv();
  } catch {
  }
  try {
    let url = "";
    const algodClient = (_a = algorand.client) == null ? void 0 : _a.algod;
    if (algodClient) {
      url = ((_b = algodClient.c) == null ? void 0 : _b.baseURL) || ((_c = algodClient.bc) == null ? void 0 : _c.baseURL) || "";
    }
    if (typeof url === "string" && url.length > 0) {
      const lowerUrl = url.toLowerCase();
      for (const pattern of MAINNET_URL_PATTERNS) {
        if (lowerUrl.includes(pattern)) {
          return "mainnet";
        }
      }
      for (const pattern of TESTNET_URL_PATTERNS) {
        if (lowerUrl.includes(pattern)) {
          return "testnet";
        }
      }
      for (const pattern of LOCALNET_URL_PATTERNS) {
        if (lowerUrl.includes(pattern)) {
          return "localnet";
        }
      }
    }
  } catch {
  }
  throw new Error(
    "Could not detect network. Set ALGORAND_NETWORK, ALGOD_NETWORK, or NEXT_PUBLIC_ALGOD_NETWORK environment variable, or use an AlgorandClient configured with a recognizable network URL."
  );
}
var _currentNetwork = void 0;
function setCurrentNetwork(network) {
  _currentNetwork = network;
}
function getCurrentNetwork() {
  return _currentNetwork;
}
var SDK_TO_ENV_VAR = {
  // Core SDKs
  AkitaDaoSDK: ENV_VAR_NAMES.DAO_APP_ID,
  WalletSDK: ENV_VAR_NAMES.WALLET_APP_ID,
  EscrowFactorySDK: ENV_VAR_NAMES.ESCROW_FACTORY_APP_ID,
  WalletFactorySDK: ENV_VAR_NAMES.WALLET_FACTORY_APP_ID,
  SubscriptionsSDK: ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID,
  StakingPoolFactorySDK: ENV_VAR_NAMES.STAKING_POOL_FACTORY_APP_ID,
  StakingSDK: ENV_VAR_NAMES.STAKING_APP_ID,
  RewardsSDK: ENV_VAR_NAMES.REWARDS_APP_ID,
  // Factories
  AuctionFactorySDK: ENV_VAR_NAMES.AUCTION_FACTORY_APP_ID,
  MarketplaceSDK: ENV_VAR_NAMES.MARKETPLACE_APP_ID,
  RaffleFactorySDK: ENV_VAR_NAMES.RAFFLE_FACTORY_APP_ID,
  PollFactorySDK: ENV_VAR_NAMES.POLL_FACTORY_APP_ID,
  PrizeBoxFactorySDK: ENV_VAR_NAMES.PRIZE_BOX_FACTORY_APP_ID,
  // Gates & Other
  GateSDK: ENV_VAR_NAMES.GATE_APP_ID,
  HyperSwapSDK: ENV_VAR_NAMES.HYPER_SWAP_APP_ID,
  MetaMerklesSDK: ENV_VAR_NAMES.META_MERKLES_APP_ID
};
function getAppIdForSDK(sdkName) {
  const envVarName = SDK_TO_ENV_VAR[sdkName];
  if (!envVarName) return void 0;
  return getAppIdFromEnv(envVarName);
}
function resolveAppId(providedAppId, envVarName, sdkName = "SDK", network) {
  if (providedAppId !== void 0 && providedAppId > 0n) {
    return providedAppId;
  }
  const envAppId = getAppIdFromEnv(envVarName);
  if (envAppId !== void 0) {
    return envAppId;
  }
  const targetNetwork = network ?? getCurrentNetwork();
  if (targetNetwork !== void 0) {
    const networkAppId = getAppIdFromNetwork(targetNetwork, envVarName);
    if (networkAppId !== void 0) {
      return networkAppId;
    }
  }
  let networkHint = "";
  if (targetNetwork === void 0) {
    networkHint = " Network could not be determined - call setCurrentNetwork() first.";
  } else if (targetNetwork === "localnet") {
    networkHint = " For localnet, you must provide app IDs explicitly or set environment variables.";
  } else {
    networkHint = ` The baked-in ${targetNetwork} app IDs may not be configured yet.`;
  }
  throw new Error(
    `No app ID provided for ${sdkName}. Either pass appId in constructor params, set ${envVarName} environment variable, or ensure network-specific app IDs are configured.${networkHint}`
  );
}
function resolveAppIdWithClient(algorand, providedAppId, envVarName, sdkName = "SDK") {
  const network = detectNetworkFromClient(algorand);
  setCurrentNetwork(network);
  return resolveAppId(providedAppId, envVarName, sdkName, network);
}

// src/constants.ts
import { makeEmptyTransactionSigner } from "@algorandfoundation/algokit-utils/transact";
import { microAlgo } from "@algorandfoundation/algokit-utils";
var DEFAULT_READER = "Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA";
var emptySigner = makeEmptyTransactionSigner();
var DEFAULT_SEND_PARAMS = {
  /** Whether to use simulate to automatically populate app call resources in the txn objects. Defaults to `Config.populateAppCallResources`. */
  populateAppCallResources: true,
  /** Whether to use simulate to automatically calculate required app call inner transaction fees and cover them in the parent app call transaction fee */
  coverAppCallInnerTransactionFees: true,
  /** the maximum fee to pay */
  maxFee: microAlgo(257000n)
};
var MAX_UINT64 = BigInt("18446744073709551615");

export {
  TESTNET_APP_IDS,
  MAINNET_APP_IDS,
  NETWORK_APP_IDS,
  createEmptyAppIds,
  getNetworkAppIds,
  ENV_TO_NETWORK_KEY,
  buildAppIdsFromEnv,
  ENV_VAR_NAMES,
  getNetworkFromEnv,
  getEnvVar,
  getAppIdFromEnv,
  getConfigFromEnv,
  detectNetworkFromClient,
  setCurrentNetwork,
  getCurrentNetwork,
  getAppIdForSDK,
  resolveAppId,
  resolveAppIdWithClient,
  DEFAULT_READER,
  emptySigner,
  DEFAULT_SEND_PARAMS,
  MAX_UINT64
};
//# sourceMappingURL=chunk-RSCXLEUQ.mjs.map