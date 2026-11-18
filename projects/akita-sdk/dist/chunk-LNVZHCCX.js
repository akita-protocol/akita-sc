"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } }// src/constants.ts
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);
var _algokitutils = require('@algorandfoundation/algokit-utils');
var DEFAULT_READER = "Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA";
var emptySigner = _algosdk.makeEmptyTransactionSigner.call(void 0, );
var DEFAULT_SEND_PARAMS = {
  /** Whether to use simulate to automatically populate app call resources in the txn objects. Defaults to `Config.populateAppCallResources`. */
  populateAppCallResources: true,
  /** Whether to use simulate to automatically calculate required app call inner transaction fees and cover them in the parent app call transaction fee */
  coverAppCallInnerTransactionFees: true,
  /** the maximum fee to pay */
  maxFee: _algokitutils.microAlgo.call(void 0, 257000n)
};
var PAYER_RECORD_MBR = 28500n;
var MAX_UINT64 = BigInt("18446744073709551615");

// src/networks.ts
var PLUGIN_APP_ID_KEYS = ["revenueManagerPlugin", "updatePlugin", "optinPlugin", "selfOptinPlugin", "asaManagerPlugin", "payPlugin", "haystackRouterPlugin", "hyperSwapPlugin", "subscriptionsPlugin", "auctionPlugin", "daoPlugin", "dualStakePlugin", "gatePlugin", "marketplacePlugin", "nfdPlugin", "paySiloPlugin", "paySiloFactoryPlugin", "pollPlugin", "rafflePlugin", "rewardsPlugin", "socialPlugin", "stakingPlugin", "stakingPoolPlugin"];
var PLUGIN_DEFINITIONS = {
  revenueManagerPlugin: { key: "revenueManagerPlugin", name: "Revenue Manager", description: "Revenue distribution" },
  updatePlugin: { key: "updatePlugin", name: "Update", description: "Contract updates" },
  optinPlugin: { key: "optinPlugin", name: "Opt-in", description: "ASA opt-in operations" },
  selfOptinPlugin: { key: "selfOptinPlugin", name: "Self opt-in", description: "Self-service ASA opt-in operations" },
  asaManagerPlugin: { key: "asaManagerPlugin", name: "ASA Manager", description: "ASA creation and minting" },
  payPlugin: { key: "payPlugin", name: "Pay", description: "Payment operations" },
  haystackRouterPlugin: { key: "haystackRouterPlugin", name: "Haystack Router", description: "Haystack Router swap integration" },
  hyperSwapPlugin: { key: "hyperSwapPlugin", name: "HyperSwap", description: "P2P multi-party swaps" },
  subscriptionsPlugin: { key: "subscriptionsPlugin", name: "Subscriptions", description: "Subscription management" },
  auctionPlugin: { key: "auctionPlugin", name: "Auction", description: "Auction interactions" },
  daoPlugin: { key: "daoPlugin", name: "DAO", description: "DAO interactions" },
  dualStakePlugin: { key: "dualStakePlugin", name: "Dual Stake", description: "Dual token staking" },
  gatePlugin: { key: "gatePlugin", name: "Gate", description: "Gate verification" },
  marketplacePlugin: { key: "marketplacePlugin", name: "Marketplace", description: "Marketplace operations" },
  nfdPlugin: { key: "nfdPlugin", name: "NFD", description: "NFD operations" },
  paySiloPlugin: { key: "paySiloPlugin", name: "Pay Silo", description: "Pay silo interactions" },
  paySiloFactoryPlugin: { key: "paySiloFactoryPlugin", name: "Pay Silo Factory", description: "Pay silo deployment" },
  pollPlugin: { key: "pollPlugin", name: "Poll", description: "Poll voting" },
  rafflePlugin: { key: "rafflePlugin", name: "Raffle", description: "Raffle participation" },
  rewardsPlugin: { key: "rewardsPlugin", name: "Rewards", description: "Reward claiming" },
  socialPlugin: { key: "socialPlugin", name: "Social", description: "Social interactions" },
  stakingPlugin: { key: "stakingPlugin", name: "Staking", description: "Staking operations" },
  stakingPoolPlugin: { key: "stakingPoolPlugin", name: "Staking Pool", description: "Staking pool interactions" }
};
var TESTNET_DECEMBER_DEPLOYED_AT = "2025-12-15T09:23:03.186Z";
var TESTNET_MAY_DEPLOYED_AT = "2026-05-23T07:07:40.361Z";
var MAINNET_DECEMBER_DEPLOYED_AT = "2025-12-15T10:26:30.400Z";
var MAINNET_MAY_DEPLOYED_AT = "2026-05-23T07:52:58.156Z";
var TESTNET_PLUGIN_DEPLOYMENTS = {
  revenueManagerPlugin: [
    { appId: 751972084n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128627n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 766094477n, version: "0.0.2", deployedAt: "2026-07-11T03:02:23.533Z" },
    { appId: 767111831n, version: "0.0.4", deployedAt: "2026-07-19T01:06:45.498Z" }
  ],
  updatePlugin: [
    { appId: 751972139n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128671n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  optinPlugin: [
    { appId: 751968346n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128795n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  selfOptinPlugin: [{ appId: 763128796n, deployedAt: TESTNET_MAY_DEPLOYED_AT }, { appId: 767318626n, deployedAt: "2026-07-20T15:37:41.090Z" }],
  asaManagerPlugin: [{ appId: 751968373n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT }, { appId: 763128820n, deployedAt: TESTNET_MAY_DEPLOYED_AT }, { appId: 764705920n }],
  payPlugin: [
    { appId: 751968379n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128821n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  haystackRouterPlugin: [{ appId: 763128851n, deployedAt: TESTNET_MAY_DEPLOYED_AT }],
  hyperSwapPlugin: [
    { appId: 751972295n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128858n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  subscriptionsPlugin: [
    { appId: 751968395n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128859n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  auctionPlugin: [
    { appId: 751972301n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128866n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  daoPlugin: [
    { appId: 751972311n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128876n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  dualStakePlugin: [
    { appId: 751972317n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128877n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  gatePlugin: [
    { appId: 751972318n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128884n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  marketplacePlugin: [
    { appId: 751968424n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128885n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  nfdPlugin: [
    { appId: 751972324n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128895n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  paySiloPlugin: [
    { appId: 751972334n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128904n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  paySiloFactoryPlugin: [
    { appId: 751968441n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128905n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  pollPlugin: [
    { appId: 751972340n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128906n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  rafflePlugin: [
    { appId: 751972341n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128922n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  rewardsPlugin: [
    { appId: 751972347n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128923n, deployedAt: TESTNET_MAY_DEPLOYED_AT }
  ],
  socialPlugin: [
    { appId: 751972357n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128930n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 766098156n, version: "0.0.2", deployedAt: "2026-07-11T03:28:28.988Z" },
    { appId: 767297986n, version: "0.0.3", deployedAt: "2026-07-20T05:13:21.978Z" },
    { appId: 767298319n, version: "0.0.3", deployedAt: "2026-07-20T05:24:01.357Z" }
  ],
  stakingPlugin: [
    { appId: 751972363n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128931n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 767116005n, version: "0.0.3", deployedAt: "2026-07-19T02:52:28.886Z" }
  ],
  stakingPoolPlugin: [
    { appId: 751972365n, deployedAt: TESTNET_DECEMBER_DEPLOYED_AT },
    { appId: 763128941n, deployedAt: TESTNET_MAY_DEPLOYED_AT },
    { appId: 767118261n, version: "0.0.2", deployedAt: "2026-07-19T03:49:46.516Z" }
  ]
};
var MAINNET_PLUGIN_DEPLOYMENTS = {
  revenueManagerPlugin: [
    { appId: 3368395771n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569559335n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3633281195n, version: "0.0.2", deployedAt: "2026-07-11T03:10:16.625Z" },
    { appId: 3642325118n, version: "0.0.4", deployedAt: "2026-07-19T01:27:57.837Z" }
  ],
  updatePlugin: [
    { appId: 3368396455n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569559689n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  optinPlugin: [
    { appId: 3368398585n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569560490n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  selfOptinPlugin: [{ appId: 3569560545n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3644027143n, deployedAt: "2026-07-20T15:38:03.447Z" }],
  asaManagerPlugin: [{ appId: 3368398964n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT }, { appId: 3569560791n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3605315701n }],
  payPlugin: [
    { appId: 3368399056n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569560828n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  haystackRouterPlugin: [{ appId: 3569561003n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3579545659n }],
  hyperSwapPlugin: [
    { appId: 3368399121n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561068n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  subscriptionsPlugin: [
    { appId: 3368399152n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561107n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  auctionPlugin: [
    { appId: 3368399217n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561141n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  daoPlugin: [
    { appId: 3368399317n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561215n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  dualStakePlugin: [
    { appId: 3368399386n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561317n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  gatePlugin: [
    { appId: 3368399411n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561367n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  marketplacePlugin: [
    { appId: 3368399474n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561455n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  nfdPlugin: [{ appId: 3368399559n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT }, { appId: 3570637728n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3572944055n }],
  paySiloPlugin: [
    { appId: 3368399670n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561570n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  paySiloFactoryPlugin: [
    { appId: 3368399704n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561636n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  pollPlugin: [
    { appId: 3368399770n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561749n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  rafflePlugin: [
    { appId: 3368399868n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561863n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  rewardsPlugin: [
    { appId: 3368399956n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569561963n, deployedAt: MAINNET_MAY_DEPLOYED_AT }
  ],
  socialPlugin: [
    { appId: 3368400007n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569562087n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3633295088n, version: "0.0.2", deployedAt: "2026-07-11T03:29:13.775Z" },
    { appId: 3643581007n, version: "0.0.3", deployedAt: "2026-07-20T05:28:54.584Z" }
  ],
  stakingPlugin: [{ appId: 3368400044n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT }, { appId: 3569562153n, deployedAt: MAINNET_MAY_DEPLOYED_AT }, { appId: 3572944799n }, { appId: 3642392585n, version: "0.0.3", deployedAt: "2026-07-19T02:57:54.499Z" }],
  stakingPoolPlugin: [
    { appId: 3368400148n, deployedAt: MAINNET_DECEMBER_DEPLOYED_AT },
    { appId: 3569562283n, deployedAt: MAINNET_MAY_DEPLOYED_AT },
    { appId: 3642438287n, version: "0.0.2", deployedAt: "2026-07-19T03:57:33.158Z" }
  ]
};
var NETWORK_PLUGIN_DEPLOYMENTS = {
  testnet: TESTNET_PLUGIN_DEPLOYMENTS,
  mainnet: MAINNET_PLUGIN_DEPLOYMENTS
};
function latestPluginAppId(deployments, key) {
  const versions = deployments[key];
  const latest = versions[versions.length - 1];
  if (!latest) throw new Error(`No deployments configured for ${key}`);
  return latest.appId;
}
var TESTNET_APP_IDS = {
  // Core Contracts
  dao: 763128236n,
  daoProposalValidator: 767109617n,
  wallet: 763128598n,
  walletMbr: 767110471n,
  escrowFactory: 763128227n,
  walletFactory: 763128255n,
  subscriptions: 763128278n,
  stakingPoolFactory: 763128285n,
  staking: 767114174n,
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
  revenueManagerPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "revenueManagerPlugin"),
  updatePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "updatePlugin"),
  optinPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "optinPlugin"),
  selfOptinPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "selfOptinPlugin"),
  asaManagerPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "asaManagerPlugin"),
  payPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "payPlugin"),
  haystackRouterPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "haystackRouterPlugin"),
  hyperSwapPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "hyperSwapPlugin"),
  subscriptionsPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "subscriptionsPlugin"),
  auctionPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "auctionPlugin"),
  daoPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "daoPlugin"),
  dualStakePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "dualStakePlugin"),
  gatePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "gatePlugin"),
  marketplacePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "marketplacePlugin"),
  nfdPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "nfdPlugin"),
  paySiloPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "paySiloPlugin"),
  paySiloFactoryPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "paySiloFactoryPlugin"),
  pollPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "pollPlugin"),
  rafflePlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "rafflePlugin"),
  rewardsPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "rewardsPlugin"),
  socialPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "socialPlugin"),
  stakingPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "stakingPlugin"),
  stakingPoolPlugin: latestPluginAppId(TESTNET_PLUGIN_DEPLOYMENTS, "stakingPoolPlugin"),
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
  stakingAmountGate: 767128670n,
  stakingPowerGate: 767241897n,
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
  // 2026-10 release: 0n until a receipt --register records the deployment
  meta: 0n,
  metaPlugin: 0n,
  guildFactory: 0n,
  guildConsensusFactory: 0n,
  guildPlugin: 0n,
  welcomePlugin: 0n,
  socialClaim: 0n,
  walletBalanceReader: 0n,
  rewardsV1: 763128244n,
  governanceParticipationGate: 0n,
  moderatorActivityGate: 0n
};
var MAINNET_APP_IDS = {
  // Core Contracts
  dao: 3569556034n,
  daoProposalValidator: 3642264629n,
  wallet: 3569559153n,
  walletMbr: 3642282698n,
  escrowFactory: 3569555755n,
  walletFactory: 3569556257n,
  subscriptions: 3569556497n,
  stakingPoolFactory: 3569556570n,
  staking: 3642366153n,
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
  revenueManagerPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "revenueManagerPlugin"),
  updatePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "updatePlugin"),
  optinPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "optinPlugin"),
  selfOptinPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "selfOptinPlugin"),
  asaManagerPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "asaManagerPlugin"),
  payPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "payPlugin"),
  haystackRouterPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "haystackRouterPlugin"),
  hyperSwapPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "hyperSwapPlugin"),
  subscriptionsPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "subscriptionsPlugin"),
  auctionPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "auctionPlugin"),
  daoPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "daoPlugin"),
  dualStakePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "dualStakePlugin"),
  gatePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "gatePlugin"),
  marketplacePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "marketplacePlugin"),
  nfdPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "nfdPlugin"),
  paySiloPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "paySiloPlugin"),
  paySiloFactoryPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "paySiloFactoryPlugin"),
  pollPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "pollPlugin"),
  rafflePlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "rafflePlugin"),
  rewardsPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "rewardsPlugin"),
  socialPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "socialPlugin"),
  stakingPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "stakingPlugin"),
  stakingPoolPlugin: latestPluginAppId(MAINNET_PLUGIN_DEPLOYMENTS, "stakingPoolPlugin"),
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
  stakingAmountGate: 3642526856n,
  stakingPowerGate: 3642975628n,
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
  // 2026-10 release: 0n until a receipt --register records the deployment
  meta: 0n,
  metaPlugin: 0n,
  guildFactory: 0n,
  guildConsensusFactory: 0n,
  guildPlugin: 0n,
  welcomePlugin: 0n,
  socialClaim: 0n,
  walletBalanceReader: 0n,
  rewardsV1: 3569556095n,
  governanceParticipationGate: 0n,
  moderatorActivityGate: 0n
};
var NETWORK_APP_IDS = {
  testnet: TESTNET_APP_IDS,
  mainnet: MAINNET_APP_IDS
};
var DAO_ESCROW_ACTION_V2_ROUNDS = {
  testnet: { round: 65453461n, timestamp: 1784419143n },
  mainnet: { round: 63229331n, timestamp: 1784419391n }
};
function getDaoEscrowActionV2Cutover(network) {
  const cutover = DAO_ESCROW_ACTION_V2_ROUNDS[network];
  return cutover && cutover.round > 0n && cutover.timestamp > 0n ? cutover : void 0;
}
var REGISTRY_WRITES_STOPPED = {
  localnet: true,
  testnet: false,
  mainnet: false
};
function registryWritesStopped(network) {
  return _nullishCoalesce(REGISTRY_WRITES_STOPPED[network], () => ( false));
}
function shouldWriteRegistry(network, explicit) {
  return _nullishCoalesce(explicit, () => ( !registryWritesStopped(network)));
}
var SOCIAL_HINTED_TARGETS = {
  localnet: true,
  testnet: false,
  mainnet: false
};
function socialHintedTargets(network, explicit) {
  return _nullishCoalesce(_nullishCoalesce(explicit, () => ( SOCIAL_HINTED_TARGETS[network])), () => ( false));
}
function createEmptyAppIds() {
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
  return _nullishCoalesce(NETWORK_APP_IDS[network], () => ( createEmptyAppIds()));
}
function getPluginDeployments(network, key) {
  var _a;
  return _nullishCoalesce(((_a = NETWORK_PLUGIN_DEPLOYMENTS[network]) == null ? void 0 : _a[key]), () => ( []));
}
function getLatestPluginDeployment(network, key) {
  const deployments = getPluginDeployments(network, key);
  return deployments[deployments.length - 1];
}
function resolvePluginDeployment(network, appId) {
  const requestedAppId = BigInt(appId);
  const deployments = NETWORK_PLUGIN_DEPLOYMENTS[network];
  if (!deployments) return void 0;
  for (const key of PLUGIN_APP_ID_KEYS) {
    const versions = deployments[key];
    const index = versions.findIndex((deployment2) => deployment2.appId === requestedAppId);
    if (index === -1) continue;
    const deployment = versions[index];
    const latest = versions[versions.length - 1];
    return {
      ...PLUGIN_DEFINITIONS[key],
      ...deployment,
      network,
      revision: index + 1,
      isLatest: deployment.appId === latest.appId,
      latest
    };
  }
  return void 0;
}
function getPluginUpdate(network, appId) {
  const current = resolvePluginDeployment(network, appId);
  if (!current || current.isLatest) return void 0;
  const latest = resolvePluginDeployment(network, current.latest.appId);
  if (!latest) return void 0;
  return { current, latest };
}
function getKnownPluginAppIds(network) {
  const deployments = NETWORK_PLUGIN_DEPLOYMENTS[network];
  if (!deployments) return [];
  return PLUGIN_APP_ID_KEYS.flatMap((key) => deployments[key].map(({ appId }) => appId));
}
var ENV_TO_NETWORK_KEY = {
  DAO_APP_ID: "dao",
  DAO_PROPOSAL_VALIDATOR_APP_ID: "daoProposalValidator",
  WALLET_APP_ID: "wallet",
  WALLET_MBR_APP_ID: "walletMbr",
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
  AKITA_NFD_APP_ID: "akitaNfd",
  // 2026-10 release
  META_APP_ID: "meta",
  META_PLUGIN_APP_ID: "metaPlugin",
  GUILD_FACTORY_APP_ID: "guildFactory",
  GUILD_CONSENSUS_FACTORY_APP_ID: "guildConsensusFactory",
  GUILD_PLUGIN_APP_ID: "guildPlugin",
  WELCOME_PLUGIN_APP_ID: "welcomePlugin",
  SOCIAL_CLAIM_APP_ID: "socialClaim",
  WALLET_BALANCE_READER_APP_ID: "walletBalanceReader",
  REWARDS_V1_APP_ID: "rewardsV1"
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
  return appId && appId > 0n ? appId : void 0;
}

// src/config.ts
var ENV_VAR_NAMES = {
  // Network
  NETWORK: "ALGORAND_NETWORK",
  // Core Contracts
  DAO_APP_ID: "DAO_APP_ID",
  DAO_PROPOSAL_VALIDATOR_APP_ID: "DAO_PROPOSAL_VALIDATOR_APP_ID",
  WALLET_APP_ID: "WALLET_APP_ID",
  WALLET_MBR_APP_ID: "WALLET_MBR_APP_ID",
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
  META_APP_ID: "META_APP_ID",
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
  throw new Error(`No valid network configured. Set one of these environment variables to 'localnet', 'testnet', or 'mainnet': ${envVarNames.join(", ")}`);
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
  } catch (e) {
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
    metaAppId: getAppIdFromEnv(ENV_VAR_NAMES.META_APP_ID),
    metaMerklesAppId: getAppIdFromEnv(ENV_VAR_NAMES.META_MERKLES_APP_ID),
    // Assets
    aktaAssetId: getAppIdFromEnv(ENV_VAR_NAMES.AKTA_ASSET_ID),
    bonesAssetId: getAppIdFromEnv(ENV_VAR_NAMES.BONES_ASSET_ID)
  };
}
var TESTNET_URL_PATTERNS = ["testnet", "testnet.algonode.cloud", "testnet-api.algonode.cloud", "testnet-algod.algonode.cloud"];
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
  } catch (e2) {
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
  } catch (e3) {
  }
  throw new Error("Could not detect network. Set ALGORAND_NETWORK, ALGOD_NETWORK, or NEXT_PUBLIC_ALGOD_NETWORK environment variable, or use an AlgorandClient configured with a recognizable network URL.");
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
  MetaMerklesSDK: ENV_VAR_NAMES.META_MERKLES_APP_ID,
  MetaSDK: ENV_VAR_NAMES.META_APP_ID
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
  const targetNetwork = _nullishCoalesce(network, () => ( getCurrentNetwork()));
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
  throw new Error(`No app ID provided for ${sdkName}. Either pass appId in constructor params, set ${envVarName} environment variable, or ensure network-specific app IDs are configured.${networkHint}`);
}
function resolveAppIdWithClient(algorand, providedAppId, envVarName, sdkName = "SDK") {
  const network = detectNetworkFromClient(algorand);
  setCurrentNetwork(network);
  return resolveAppId(providedAppId, envVarName, sdkName, network);
}

// src/simulate/access-list.ts

var _composer = require('@algorandfoundation/algokit-utils/types/composer');
var _algorandclienttransactionsender = require('@algorandfoundation/algokit-utils/types/algorand-client-transaction-sender');


// src/simulate/usage.ts
async function simulateWithUsage(client, request) {
  return client.simulateTransactions(request).do();
}
function usageFeeSurcharge(group, minFee) {
  if ((group == null ? void 0 : group.groupUsage) === void 0 || !group.txnResults) return 0n;
  const count = (transaction) => 1n + (_nullishCoalesce(transaction.innerTxns, () => ( []))).reduce((sum, child) => sum + count(child), 0n);
  const transactionCount = group.txnResults.reduce((sum, result) => sum + count(_nullishCoalesce(result.txnResult, () => ( {}))), 0n);
  const required = (BigInt(group.groupUsage) * minFee + 999999n) / 1000000n;
  const baseline = transactionCount * minFee;
  return required > baseline ? required - baseline : 0n;
}

// src/simulate/access-list.ts
var MAX_ACCESS_LIST_ENTRIES = 16;
var ACCESS_DISCOVERY_OPCODE_BUDGET = 32e4;
var OP_UP_SELECTOR = new Uint8Array([133, 77, 237, 224]);
var ARC58_GET_ADMIN_SELECTOR = new Uint8Array([19, 188, 68, 228]);
var DEFAULT_CARRIER_MAX_FEE = _algokitutils.microAlgo.call(void 0, 257000n);
var ACCESS_LIST_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-resource-populator");
var SINGLE_SEND_RESULT_PATCH = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-single-send-result");
var ACCESS_CARRIER_REGISTRY = /* @__PURE__ */ Symbol.for("@akta/sdk/access-list-carrier-registry");
var accessListRepairs = /* @__PURE__ */ new WeakMap();
var accessListRepairKeys = /* @__PURE__ */ new WeakMap();
function registeredAccessCarrierApps(algod) {
  return _nullishCoalesce(algod[ACCESS_CARRIER_REGISTRY], () => ( /* @__PURE__ */ new Map()));
}
function isAutomaticCarrierTransaction(transaction) {
  const note = transaction.note;
  return Boolean(
    transaction.type === _algosdk.TransactionType.appl && note && new TextDecoder().decode(note).startsWith("akta-access-carrier-")
  );
}
function installSingleSendResultCompatibility() {
  const prototype = _algorandclienttransactionsender.AlgorandClientTransactionSender.prototype;
  if (prototype[SINGLE_SEND_RESULT_PATCH]) return;
  const originalSend = prototype._send;
  prototype._send = function patchedSingleSend(composerCall, log) {
    const send = originalSend.call(this, composerCall, log);
    return async (params) => {
      const result = await send(params);
      let selectedIndex = -1;
      for (let index = result.transactions.length - 1; index >= 0; index -= 1) {
        if (!isAutomaticCarrierTransaction(result.transactions[index])) {
          selectedIndex = index;
          break;
        }
      }
      if (selectedIndex < 0 || selectedIndex === result.transactions.length - 1) return result;
      return {
        ...result,
        transaction: result.transactions[selectedIndex],
        confirmation: result.confirmations[selectedIndex],
        txId: result.txIds[selectedIndex]
      };
    };
  };
  prototype[SINGLE_SEND_RESULT_PATCH] = true;
}
var AccessListCapacityError = class extends Error {
  constructor(message, requiredCarrierCount) {
    super(message);
    this.requiredCarrierCount = requiredCarrierCount;
    this.name = "AccessListCapacityError";
  }
  
};
function registerAccessListResourceCarrier(appId, appSpec, algod) {
  if (appId <= 0n || !algod) return;
  const methods = _nullishCoalesce((appSpec == null ? void 0 : appSpec.methods), () => ( []));
  const selector = methods.some(
    (method) => {
      var _a, _b;
      return method.name === "opUp" && ((_a = method.args) == null ? void 0 : _a.length) === 0 && ((_b = method.returns) == null ? void 0 : _b.type) === "void";
    }
  ) ? OP_UP_SELECTOR : methods.some(
    (method) => {
      var _a, _b;
      return method.name === "arc58_getAdmin" && ((_a = method.args) == null ? void 0 : _a.length) === 0 && ((_b = method.returns) == null ? void 0 : _b.type) === "address" && method.readonly === true;
    }
  ) ? ARC58_GET_ADMIN_SELECTOR : void 0;
  if (!selector) return;
  const host = algod;
  host[ACCESS_CARRIER_REGISTRY] ??= /* @__PURE__ */ new Map();
  host[ACCESS_CARRIER_REGISTRY].set(appId.toString(), selector);
}
function bytesKey(value) {
  return Array.from(value, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function isZeroAddress(address) {
  return address.equals(_algosdk.Address.zeroAddress());
}
function isLiteralZeroAddressReference(reference) {
  return reference.address !== void 0 && isZeroAddress(reference.address);
}
function effectiveAddress(address, transaction) {
  return isZeroAddress(address) ? transaction.sender : address;
}
function effectiveAppId(appId, transaction) {
  return appId === 0n ? transaction.applicationCall.appIndex : appId;
}
function normalizeReference(reference, transaction) {
  const appCall = transaction.applicationCall;
  if (reference.address) {
    if (reference.address.equals(transaction.sender)) return void 0;
    return { address: reference.address };
  }
  if (reference.assetIndex !== void 0) return { assetIndex: reference.assetIndex };
  if (reference.appIndex !== void 0) {
    if (reference.appIndex === 0n || reference.appIndex === appCall.appIndex) return void 0;
    return { appIndex: reference.appIndex };
  }
  if (reference.holding) {
    return {
      holding: {
        address: reference.holding.address.equals(transaction.sender) ? _algosdk.Address.zeroAddress() : reference.holding.address,
        assetIndex: reference.holding.assetIndex
      }
    };
  }
  if (reference.locals) {
    const address = reference.locals.address.equals(transaction.sender) ? _algosdk.Address.zeroAddress() : reference.locals.address;
    const appId = reference.locals.appIndex === appCall.appIndex ? 0n : reference.locals.appIndex;
    if (isZeroAddress(address) && appId === 0n) return void 0;
    return { locals: { address, appIndex: appId } };
  }
  if (reference.box) {
    return {
      box: {
        appIndex: reference.box.appIndex === 0n || reference.box.appIndex === appCall.appIndex ? 0n : reference.box.appIndex,
        name: reference.box.name
      }
    };
  }
  return void 0;
}
function referenceKey(reference, transaction) {
  if (reference.address) return `d:${reference.address.toString()}`;
  if (reference.assetIndex !== void 0) return `s:${reference.assetIndex}`;
  if (reference.appIndex !== void 0) return `p:${effectiveAppId(reference.appIndex, transaction)}`;
  if (reference.holding) {
    return `h:${effectiveAddress(reference.holding.address, transaction).toString()}:${reference.holding.assetIndex}`;
  }
  if (reference.locals) {
    return `l:${effectiveAddress(reference.locals.address, transaction).toString()}:${effectiveAppId(reference.locals.appIndex, transaction)}`;
  }
  if (reference.box) {
    return `b:${effectiveAppId(reference.box.appIndex, transaction)}:${bytesKey(reference.box.name)}`;
  }
  return void 0;
}
function accessListEntryCount(transaction, references) {
  const primitiveEntries = /* @__PURE__ */ new Set();
  let compositeEntries = 0;
  const ensureLiteralAddress = (address) => {
    if (!address.equals(transaction.sender)) primitiveEntries.add(`d:${address.toString()}`);
  };
  const ensureCompositeAddress = (address) => {
    const actual = effectiveAddress(address, transaction);
    if (!actual.equals(transaction.sender)) primitiveEntries.add(`d:${actual.toString()}`);
  };
  const ensureAsset = (assetId) => primitiveEntries.add(`s:${assetId}`);
  const ensureApp = (appId) => {
    const actual = effectiveAppId(appId, transaction);
    if (actual !== transaction.applicationCall.appIndex) primitiveEntries.add(`p:${actual}`);
  };
  for (const rawReference of references) {
    const reference = normalizeReference(rawReference, transaction);
    if (!reference) continue;
    if (isLiteralZeroAddressReference(reference)) continue;
    if (reference.address) ensureLiteralAddress(reference.address);
    else if (reference.assetIndex !== void 0) ensureAsset(reference.assetIndex);
    else if (reference.appIndex !== void 0) ensureApp(reference.appIndex);
    else if (reference.holding) {
      ensureCompositeAddress(reference.holding.address);
      ensureAsset(reference.holding.assetIndex);
      compositeEntries += 1;
    } else if (reference.locals) {
      ensureCompositeAddress(reference.locals.address);
      ensureApp(reference.locals.appIndex);
      compositeEntries += 1;
    } else if (reference.box) {
      ensureApp(reference.box.appIndex);
      compositeEntries += 1;
    }
  }
  return primitiveEntries.size + compositeEntries;
}
function providedResourceKeys(plan) {
  const result = /* @__PURE__ */ new Set();
  for (const rawReference of plan.references) {
    const reference = normalizeReference(rawReference, plan.transaction);
    if (!reference) continue;
    if (isLiteralZeroAddressReference(reference)) continue;
    const key = referenceKey(reference, plan.transaction);
    if (key) result.add(key);
    if (reference.holding) {
      const address = effectiveAddress(reference.holding.address, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`s:${reference.holding.assetIndex}`);
    } else if (reference.locals) {
      const address = effectiveAddress(reference.locals.address, plan.transaction);
      const appId = effectiveAppId(reference.locals.appIndex, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`p:${appId}`);
    } else if (reference.box) {
      result.add(`p:${effectiveAppId(reference.box.appIndex, plan.transaction)}`);
    }
  }
  result.add(`d:${plan.transaction.sender.toString()}`);
  result.add(`p:${plan.transaction.applicationCall.appIndex}`);
  return result;
}
function hasResource(plans, reference) {
  for (const plan of plans) {
    const normalized = normalizeReference(reference, plan.transaction);
    if (!normalized) return true;
    const key = referenceKey(normalized, plan.transaction);
    if (key && providedResourceKeys(plan).has(key)) return true;
  }
  return false;
}
function addToTransaction(plan, reference, allowDuplicate = false) {
  const normalized = normalizeReference(reference, plan.transaction);
  if (!normalized) return true;
  if (normalized.locals && !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) && effectiveAppId(normalized.locals.appIndex, plan.transaction) === plan.transaction.applicationCall.appIndex) {
    return false;
  }
  const key = referenceKey(normalized, plan.transaction);
  if (!allowDuplicate && key && providedResourceKeys(plan).has(key)) return true;
  const proposed = [...plan.references, normalized];
  if (accessListEntryCount(plan.transaction, proposed) > MAX_ACCESS_LIST_ENTRIES) return false;
  plan.references = proposed;
  return true;
}
function hasLegacyIndexedReferences(transaction) {
  var _a, _b, _c;
  return transaction.type === _algosdk.TransactionType.appl && transaction.applicationCall !== void 0 && ((_nullishCoalesce(((_a = transaction.applicationCall.accounts) == null ? void 0 : _a.length), () => ( 0))) > 0 || (_nullishCoalesce(((_b = transaction.applicationCall.foreignAssets) == null ? void 0 : _b.length), () => ( 0))) > 0 || (_nullishCoalesce(((_c = transaction.applicationCall.foreignApps) == null ? void 0 : _c.length), () => ( 0))) > 0);
}
function legacyReferenceCount(transaction) {
  var _a, _b, _c, _d;
  const appCall = transaction.applicationCall;
  return (_nullishCoalesce(((_a = appCall.accounts) == null ? void 0 : _a.length), () => ( 0))) + (_nullishCoalesce(((_b = appCall.foreignAssets) == null ? void 0 : _b.length), () => ( 0))) + (_nullishCoalesce(((_c = appCall.foreignApps) == null ? void 0 : _c.length), () => ( 0))) + (_nullishCoalesce(((_d = appCall.boxes) == null ? void 0 : _d.length), () => ( 0)));
}
function provideLiteralZeroAddress(transactions) {
  var _a, _b;
  const zeroAddress = _algosdk.Address.zeroAddress();
  const appTransactions = transactions.filter(
    (transaction) => transaction.type === _algosdk.TransactionType.appl && transaction.applicationCall !== void 0
  );
  for (const transaction of appTransactions) {
    const appCall = transaction.applicationCall;
    appCall.access = (_a = appCall.access) == null ? void 0 : _a.filter(
      (reference) => !isLiteralZeroAddressReference(reference)
    );
    if (((_b = appCall.access) == null ? void 0 : _b.length) === 0) appCall.access = [];
  }
  if (appTransactions.some(
    (transaction) => {
      var _a2;
      return (_a2 = transaction.applicationCall.accounts) == null ? void 0 : _a2.some((address) => isZeroAddress(address));
    }
  )) {
    return;
  }
  const candidate = appTransactions.filter((transaction) => {
    var _a2, _b2;
    const appCall = transaction.applicationCall;
    return (_nullishCoalesce(((_a2 = appCall.access) == null ? void 0 : _a2.length), () => ( 0))) === 0 && (_nullishCoalesce(((_b2 = appCall.accounts) == null ? void 0 : _b2.length), () => ( 0))) < 4 && legacyReferenceCount(transaction) < 8;
  }).sort((first, second) => {
    const firstCarrier = isAutomaticCarrierTransaction(first) ? 0 : 1;
    const secondCarrier = isAutomaticCarrierTransaction(second) ? 0 : 1;
    const firstLegacy = hasLegacyIndexedReferences(first) ? 0 : 1;
    const secondLegacy = hasLegacyIndexedReferences(second) ? 0 : 1;
    return firstCarrier - secondCarrier || firstLegacy - secondLegacy;
  })[0];
  if (!candidate) {
    throw new AccessListCapacityError(
      "A literal zero-address account requires one legacy resource-carrier call.",
      1
    );
  }
  candidate.applicationCall.accounts = [
    ..._nullishCoalesce(candidate.applicationCall.accounts, () => ( [])),
    zeroAddress
  ];
}
function addToBestTransaction(plans, reference, allowDuplicate = false) {
  if (!allowDuplicate && hasResource(plans, reference)) return true;
  const candidates = plans.map((plan, index) => {
    const normalized = normalizeReference(reference, plan.transaction);
    if (!normalized) return { index, incremental: 0, total: accessListEntryCount(plan.transaction, plan.references) };
    if (normalized.locals && !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) && effectiveAppId(normalized.locals.appIndex, plan.transaction) === plan.transaction.applicationCall.appIndex) {
      return { index, incremental: Number.POSITIVE_INFINITY, total: Number.POSITIVE_INFINITY };
    }
    const before = accessListEntryCount(plan.transaction, plan.references);
    const after = accessListEntryCount(plan.transaction, [...plan.references, normalized]);
    return { index, incremental: after - before, total: after };
  }).filter(({ total }) => total <= MAX_ACCESS_LIST_ENTRIES).sort((a, b) => a.incremental - b.incremental || a.total - b.total || a.index - b.index);
  const candidate = candidates[0];
  return Boolean(candidate && addToTransaction(plans[candidate.index], reference, allowDuplicate));
}
function virtualCarrier(template) {
  const { transaction } = template;
  return {
    groupIndex: -1,
    references: [],
    transaction: new _algosdk2.default.Transaction({
      type: _algosdk2.default.TransactionType.appl,
      sender: transaction.sender,
      suggestedParams: { fee: 0, minFee: 1e3, firstValid: transaction.firstValid, lastValid: transaction.lastValid },
      appCallParams: { appIndex: transaction.applicationCall.appIndex, onComplete: transaction.applicationCall.onComplete }
    })
  };
}
function transactionResources(resources, createdAppIds = /* @__PURE__ */ new Set()) {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => _algosdk.getApplicationAddress.call(void 0, appId).toString())
  );
  return [
    ...(_nullishCoalesce(resources.accounts, () => ( []))).filter((address) => !isZeroAddress(address)).filter((address) => !createdAppAddresses.has(address.toString())).map((address) => ({ address })),
    ...(_nullishCoalesce(resources.assets, () => ( []))).map((assetId) => ({ assetIndex: assetId })),
    ...(_nullishCoalesce(resources.apps, () => ( []))).filter((appId) => !createdAppIds.has(appId)).map((appId) => ({ appIndex: appId })),
    ...(_nullishCoalesce(resources.assetHoldings, () => ( []))).map((holding) => ({ holding })),
    ...(_nullishCoalesce(resources.appLocals, () => ( []))).map((locals) => ({ locals })),
    ...(_nullishCoalesce(resources.boxes, () => ( []))).filter((box) => !createdAppIds.has(box.appIndex)).map((box) => ({ box }))
  ];
}
function groupResources(resources, createdAppIds = /* @__PURE__ */ new Set()) {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => _algosdk.getApplicationAddress.call(void 0, appId).toString())
  );
  return [
    ...(_nullishCoalesce(resources.appLocals, () => ( []))).map((locals) => ({ locals })),
    ...(_nullishCoalesce(resources.assetHoldings, () => ( []))).map((holding) => ({ holding })),
    ...(_nullishCoalesce(resources.boxes, () => ( []))).filter((box) => !createdAppIds.has(box.appIndex)).map((box) => ({ box })),
    ...(_nullishCoalesce(resources.accounts, () => ( []))).filter((address) => !isZeroAddress(address)).filter((address) => !createdAppAddresses.has(address.toString())).map((address) => ({ address })),
    ...(_nullishCoalesce(resources.assets, () => ( []))).map((assetId) => ({ assetIndex: assetId })),
    ...(_nullishCoalesce(resources.apps, () => ( []))).filter((appId) => !createdAppIds.has(appId)).map((appId) => ({ appIndex: appId }))
  ];
}
function hasUnnamedResources(resources) {
  var _a, _b, _c, _d, _e, _f;
  return Boolean(
    resources && ((_nullishCoalesce(((_a = resources.accounts) == null ? void 0 : _a.length), () => ( 0))) > 0 || (_nullishCoalesce(((_b = resources.assets) == null ? void 0 : _b.length), () => ( 0))) > 0 || (_nullishCoalesce(((_c = resources.apps) == null ? void 0 : _c.length), () => ( 0))) > 0 || (_nullishCoalesce(((_d = resources.assetHoldings) == null ? void 0 : _d.length), () => ( 0))) > 0 || (_nullishCoalesce(((_e = resources.appLocals) == null ? void 0 : _e.length), () => ( 0))) > 0 || (_nullishCoalesce(((_f = resources.boxes) == null ? void 0 : _f.length), () => ( 0))) > 0 || (_nullishCoalesce(resources.extraBoxRefs, () => ( 0))) > 0)
  );
}
function mergeUnnamedResources(first, second) {
  if (!hasUnnamedResources(first) && !hasUnnamedResources(second)) return void 0;
  const merged = {
    accounts: [..._nullishCoalesce((first == null ? void 0 : first.accounts), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.accounts), () => ( []))],
    assets: [..._nullishCoalesce((first == null ? void 0 : first.assets), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.assets), () => ( []))],
    apps: [..._nullishCoalesce((first == null ? void 0 : first.apps), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.apps), () => ( []))],
    assetHoldings: [..._nullishCoalesce((first == null ? void 0 : first.assetHoldings), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.assetHoldings), () => ( []))],
    appLocals: [..._nullishCoalesce((first == null ? void 0 : first.appLocals), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.appLocals), () => ( []))],
    boxes: [..._nullishCoalesce((first == null ? void 0 : first.boxes), () => ( [])), ..._nullishCoalesce((second == null ? void 0 : second.boxes), () => ( []))],
    extraBoxRefs: (_nullishCoalesce((first == null ? void 0 : first.extraBoxRefs), () => ( 0))) + (_nullishCoalesce((second == null ? void 0 : second.extraBoxRefs), () => ( 0)))
  };
  return merged;
}
function mergeGroupAnalysis(original, repairs, transactionCount) {
  if (!original && !repairs) return void 0;
  return {
    transactions: Array.from({ length: transactionCount }, (_, index) => {
      var _a, _b;
      return {
        ..._nullishCoalesce((original == null ? void 0 : original.transactions[index]), () => ( {})),
        unnamedResourcesAccessed: mergeUnnamedResources(
          (_a = original == null ? void 0 : original.transactions[index]) == null ? void 0 : _a.unnamedResourcesAccessed,
          (_b = repairs == null ? void 0 : repairs.transactions[index]) == null ? void 0 : _b.unnamedResourcesAccessed
        )
      };
    }),
    unnamedResourcesAccessed: mergeUnnamedResources(
      original == null ? void 0 : original.unnamedResourcesAccessed,
      repairs == null ? void 0 : repairs.unnamedResourcesAccessed
    ),
    requiredOpcodeCarriers: original == null ? void 0 : original.requiredOpcodeCarriers,
    accessListFeeParams: original == null ? void 0 : original.accessListFeeParams,
    createdAppIds: [
      .../* @__PURE__ */ new Set([..._nullishCoalesce((original == null ? void 0 : original.createdAppIds), () => ( [])), ..._nullishCoalesce((repairs == null ? void 0 : repairs.createdAppIds), () => ( []))])
    ]
  };
}
function filterNewRepairResources(composer, scope, resources) {
  if (!hasUnnamedResources(resources)) return void 0;
  let keys = accessListRepairKeys.get(composer);
  if (!keys) {
    keys = /* @__PURE__ */ new Set();
    accessListRepairKeys.set(composer, keys);
  }
  const filtered = {};
  const add = (field, key, value) => {
    const scopedKey = `${scope}:${key}`;
    if (keys.has(scopedKey)) return;
    keys.add(scopedKey);
    const values = _nullishCoalesce(filtered[field], () => ( []));
    values.push(value);
    filtered[field] = values;
  };
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.accounts), () => ( []))) add("accounts", `d:${value.toString()}`, value);
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.assets), () => ( []))) add("assets", `s:${value}`, value);
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.apps), () => ( []))) add("apps", `p:${value}`, value);
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.assetHoldings), () => ( []))) {
    add("assetHoldings", `h:${value.address.toString()}:${value.assetIndex}`, value);
  }
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.appLocals), () => ( []))) {
    add("appLocals", `l:${value.address.toString()}:${value.appIndex}`, value);
  }
  for (const value of _nullishCoalesce((resources == null ? void 0 : resources.boxes), () => ( []))) {
    add("boxes", `b:${value.appIndex}:${bytesKey(value.name)}`, value);
  }
  if ((_nullishCoalesce((resources == null ? void 0 : resources.extraBoxRefs), () => ( 0))) > 0) filtered.extraBoxRefs = resources.extraBoxRefs;
  return hasUnnamedResources(filtered) ? filtered : void 0;
}
function unavailableResourceFromFailure(message) {
  var _a, _b, _c;
  const locals = /unavailable Local State (\d+)\+([A-Z2-7]{58})/.exec(message);
  if (locals) return { appLocals: [{ appIndex: BigInt(locals[1]), address: _algosdk.Address.fromString(locals[2]) }] };
  const holding = /unavailable Holding (?:(\d+)\+([A-Z2-7]{58})|([A-Z2-7]{58})\+(\d+))/.exec(message);
  if (holding) {
    return {
      assetHoldings: [{
        assetIndex: BigInt(_nullishCoalesce(holding[1], () => ( holding[4]))),
        address: _algosdk.Address.fromString(_nullishCoalesce(holding[2], () => ( holding[3])))
      }]
    };
  }
  const account = (_a = /unavailable Account ([A-Z2-7]{58})/.exec(message)) == null ? void 0 : _a[1];
  if (account) return { accounts: [_algosdk.Address.fromString(account)] };
  const app = (_b = /unavailable App(?:lication)? (\d+)/i.exec(message)) == null ? void 0 : _b[1];
  if (app) return { apps: [BigInt(app)] };
  const asset = (_c = /unavailable Asset (\d+)/i.exec(message)) == null ? void 0 : _c[1];
  if (asset) return { assets: [BigInt(asset)] };
  return void 0;
}
function providedExtraBoxReferences(transactions) {
  const uniqueNamedBoxes = /* @__PURE__ */ new Set();
  let namedBoxReferenceCount = 0;
  let emptyBoxReferenceCount = 0;
  const count = (appId, name, transaction) => {
    if (appId === 0n && name.length === 0) {
      emptyBoxReferenceCount += 1;
      return;
    }
    namedBoxReferenceCount += 1;
    uniqueNamedBoxes.add(`b:${effectiveAppId(appId, transaction)}:${bytesKey(name)}`);
  };
  for (const transaction of transactions) {
    if (transaction.type !== _algosdk.TransactionType.appl || !transaction.applicationCall) continue;
    for (const reference of _nullishCoalesce(transaction.applicationCall.access, () => ( []))) {
      if (!reference.box) continue;
      count(reference.box.appIndex, reference.box.name, transaction);
    }
    for (const box of _nullishCoalesce(transaction.applicationCall.boxes, () => ( []))) {
      count(box.appIndex, box.name, transaction);
    }
  }
  return emptyBoxReferenceCount + Math.max(0, namedBoxReferenceCount - uniqueNamedBoxes.size);
}
function recordAccessListRepairs(composer, relaxedGroup, transactions, failureMessage) {
  const transactionCount = transactions.length;
  const previous = accessListRepairs.get(composer);
  const reportedGroupResources = relaxedGroup.unnamedResourcesAccessed;
  const incrementalGroupResources = reportedGroupResources ? {
    ...reportedGroupResources,
    extraBoxRefs: Math.max(
      0,
      (_nullishCoalesce(reportedGroupResources.extraBoxRefs, () => ( 0))) - providedExtraBoxReferences(transactions)
    )
  } : void 0;
  const groupRepair = filterNewRepairResources(composer, "group", incrementalGroupResources);
  const transactionRepairs = Array.from({ length: transactionCount }, (_, index) => {
    var _a, _b;
    return {
      unnamedResourcesAccessed: filterNewRepairResources(
        composer,
        `transaction:${index}`,
        (_b = (_a = relaxedGroup.txnResults) == null ? void 0 : _a[index]) == null ? void 0 : _b.unnamedResourcesAccessed
      )
    };
  });
  const fallbackRepair = filterNewRepairResources(
    composer,
    "group",
    unavailableResourceFromFailure(failureMessage)
  );
  const changed = hasUnnamedResources(groupRepair) || hasUnnamedResources(fallbackRepair) || transactionRepairs.some((repair) => hasUnnamedResources(repair.unnamedResourcesAccessed));
  if (!changed) return false;
  const additions = {
    transactions: transactionRepairs,
    unnamedResourcesAccessed: mergeUnnamedResources(groupRepair, fallbackRepair),
    createdAppIds: collectCreatedAppIds(relaxedGroup)
  };
  accessListRepairs.set(composer, mergeGroupAnalysis(previous, additions, transactionCount));
  return true;
}
function collectCreatedAppIds(group) {
  const result = /* @__PURE__ */ new Set();
  const visit = (pending) => {
    if (!pending) return;
    if (pending.appIndex && pending.appIndex > 0n) result.add(pending.appIndex);
    for (const inner of _nullishCoalesce(pending.innerTxns, () => ( []))) visit(inner);
  };
  for (const transaction of _nullishCoalesce((group == null ? void 0 : group.txnResults), () => ( []))) visit(transaction.txnResult);
  return [...result];
}
function populateAccessListResources(input, groupAnalysis, seeds = []) {
  var _a, _b, _c, _d;
  const transactions = input;
  const appTransactions = transactions.map((transaction, groupIndex) => ({ transaction, groupIndex })).filter(({ transaction }) => transaction.type === _algosdk.TransactionType.appl && transaction.applicationCall !== void 0);
  if (appTransactions.length === 0) return;
  const createdAppIds = new Set(_nullishCoalesce((groupAnalysis == null ? void 0 : groupAnalysis.createdAppIds), () => ( [])));
  const needsLiteralZeroAddress = Boolean(
    ((_b = (_a = groupAnalysis == null ? void 0 : groupAnalysis.unnamedResourcesAccessed) == null ? void 0 : _a.accounts) == null ? void 0 : _b.some(isZeroAddress)) || (groupAnalysis == null ? void 0 : groupAnalysis.transactions.some(
      (analysis) => {
        var _a2, _b2;
        return (_b2 = (_a2 = analysis.unnamedResourcesAccessed) == null ? void 0 : _a2.accounts) == null ? void 0 : _b2.some(isZeroAddress);
      }
    )) || appTransactions.some(
      ({ transaction }) => {
        var _a2;
        return (_a2 = transaction.applicationCall.access) == null ? void 0 : _a2.some(isLiteralZeroAddressReference);
      }
    )
  );
  if (needsLiteralZeroAddress) provideLiteralZeroAddress(transactions);
  const plans = appTransactions.filter(({ transaction }) => !hasLegacyIndexedReferences(transaction)).map(({ transaction, groupIndex }) => {
    const appCall = transaction.applicationCall;
    const references = [
      ..._nullishCoalesce(appCall.access, () => ( [])),
      ...(_nullishCoalesce(appCall.boxes, () => ( []))).map((box) => ({ box }))
    ].map((reference) => normalizeReference(reference, transaction)).filter((reference) => reference !== void 0);
    return { transaction, references, groupIndex };
  });
  const groupResourcesToAdd = groupResources(groupAnalysis == null ? void 0 : groupAnalysis.unnamedResourcesAccessed, createdAppIds);
  const extraBoxReferences = _nullishCoalesce(((_c = groupAnalysis == null ? void 0 : groupAnalysis.unnamedResourcesAccessed) == null ? void 0 : _c.extraBoxRefs), () => ( 0));
  const planningPlans = [...plans];
  let requiredResourceCarriers = 0;
  const carrierTemplate = _nullishCoalesce(plans[0], () => ( {
    groupIndex: appTransactions[0].groupIndex,
    references: [],
    transaction: appTransactions[0].transaction
  }));
  const addGroupReference = (reference, allowDuplicate = false) => {
    if (addToBestTransaction(planningPlans, reference, allowDuplicate)) return;
    const carrier = virtualCarrier(carrierTemplate);
    planningPlans.push(carrier);
    requiredResourceCarriers += 1;
    if (!addToBestTransaction(planningPlans, reference, allowDuplicate)) {
      throw new Error(
        `A single access resource cannot fit within the ${MAX_ACCESS_LIST_ENTRIES}-entry Access limit.`
      );
    }
  };
  for (const plan of plans) {
    const { groupIndex } = plan;
    for (const reference of transactionResources(
      (_d = groupAnalysis == null ? void 0 : groupAnalysis.transactions[groupIndex]) == null ? void 0 : _d.unnamedResourcesAccessed,
      createdAppIds
    )) {
      if (!addToTransaction(plan, reference)) {
        throw new Error(`Transaction ${groupIndex} requires more than ${MAX_ACCESS_LIST_ENTRIES} non-shareable access-list entries.`);
      }
    }
  }
  for (const reference of groupResourcesToAdd) {
    addGroupReference(reference);
  }
  for (const reference of seeds) {
    if (isLiteralZeroAddressReference(reference)) continue;
    if (reference.appIndex !== void 0 && createdAppIds.has(reference.appIndex)) continue;
    addGroupReference(reference);
  }
  for (let index = 0; index < extraBoxReferences; index += 1) {
    addGroupReference({ box: { appIndex: 0n, name: new Uint8Array(0) } }, true);
  }
  const requiredCarrierCount = Math.max(requiredResourceCarriers, _nullishCoalesce((groupAnalysis == null ? void 0 : groupAnalysis.requiredOpcodeCarriers), () => ( 0)));
  if (requiredCarrierCount > 0) {
    const used = plans.map((plan) => accessListEntryCount(plan.transaction, plan.references)).join(", ") || "none";
    const reason = requiredResourceCarriers > 0 ? "Access capacity" : "pooled opcode budget";
    throw new AccessListCapacityError(
      `${reason} requires ${requiredCarrierCount} additional safe resource-carrier call(s) (current encoded entries by eligible app call: ${used}; max ${MAX_ACCESS_LIST_ENTRIES} each).`,
      requiredCarrierCount
    );
  }
  for (const plan of plans) {
    const appCall = plan.transaction.applicationCall;
    const size = accessListEntryCount(plan.transaction, plan.references);
    if (size > MAX_ACCESS_LIST_ENTRIES) {
      throw new Error(`Access list contains ${size} entries; maximum is ${MAX_ACCESS_LIST_ENTRIES}.`);
    }
    appCall.access = plan.references;
    appCall.boxes = [];
  }
}
var configuredComposers = /* @__PURE__ */ new WeakMap();
var preparedComposers = /* @__PURE__ */ new WeakMap();
var seededComposers = /* @__PURE__ */ new WeakMap();
function seedAccessResources(composer, references) {
  if (references.length === 0) return composer;
  seededComposers.set(composer, [..._nullishCoalesce(seededComposers.get(composer), () => ( [])), ...references]);
  preparedComposers.delete(composer);
  return composer;
}
function seededAccessResources(composer) {
  return _nullishCoalesce(seededComposers.get(composer), () => ( []));
}
var nativeBuild = _composer.TransactionComposer.prototype.build;
function normalizedResources(resources) {
  var _a, _b, _c, _d;
  if (!resources) return void 0;
  return canonicalResources({
    accounts: (_a = resources.accounts) == null ? void 0 : _a.map((account) => account),
    apps: resources.apps,
    assets: resources.assets,
    boxes: (_b = resources.boxes) == null ? void 0 : _b.map(({ app, name }) => ({ appIndex: app, name })),
    appLocals: (_c = resources.appLocals) == null ? void 0 : _c.map(({ app, account }) => ({ appIndex: app, address: account })),
    assetHoldings: (_d = resources.assetHoldings) == null ? void 0 : _d.map(({ asset, account }) => ({ assetIndex: asset, address: account })),
    extraBoxRefs: resources.extraBoxRefs
  });
}
var compareIds = (a, b) => a < b ? -1 : a > b ? 1 : 0;
var compareBytes = (a, b) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] - b[i];
  return a.length - b.length;
};
var compareAddresses = (a, b) => compareBytes(a.publicKey, b.publicKey);
function canonicalResources(resources) {
  return {
    ...resources,
    accounts: resources.accounts && [...resources.accounts].sort(compareAddresses),
    apps: resources.apps && [...resources.apps].sort(compareIds),
    assets: resources.assets && [...resources.assets].sort(compareIds),
    boxes: resources.boxes && [...resources.boxes].sort((a, b) => compareIds(a.appIndex, b.appIndex) || compareBytes(a.name, b.name)),
    appLocals: resources.appLocals && [...resources.appLocals].sort((a, b) => compareAddresses(a.address, b.address) || compareIds(a.appIndex, b.appIndex)),
    assetHoldings: resources.assetHoldings && [...resources.assetHoldings].sort((a, b) => compareAddresses(a.address, b.address) || compareIds(a.assetIndex, b.assetIndex))
  };
}
function normalizedGroup(group) {
  const pending = (txn) => {
    var _a;
    return {
      appIndex: txn.applicationIndex,
      innerTxns: (_a = txn.innerTxns) == null ? void 0 : _a.map(pending)
    };
  };
  return {
    ...group,
    groupUsage: group.groupUsage === void 0 ? void 0 : BigInt(group.groupUsage),
    unnamedResourcesAccessed: normalizedResources(group.unnamedResourcesAccessed),
    txnResults: group.txnResults.map((txn) => ({ txnResult: pending(txn.txnResult), unnamedResourcesAccessed: normalizedResources(txn.unnamedResourcesAccessed) }))
  };
}
function compose(transactions, methods) {
  const atc = new _algosdk2.default.AtomicTransactionComposer();
  for (const { txn, signer } of transactions) {
    const copy = _algosdk2.default.decodeUnsignedTransaction(_algosdk2.default.encodeUnsignedTransaction(txn));
    copy.group = void 0;
    atc.addTransaction({ txn: copy, signer });
  }
  atc.methodCalls = methods;
  return atc;
}
async function discoverGroup(simulate) {
  var _a;
  const realBudget = await simulate(false);
  if (!((_a = realBudget.txnGroups[0]) == null ? void 0 : _a.failureMessage)) return { discovery: realBudget, extraBudget: false };
  return { discovery: await simulate(true), extraBudget: true };
}
function requiredOpcodeCarriers(group, appCount, extraBudget) {
  if (!extraBudget) return 0;
  const added = _nullishCoalesce(group.appBudgetAdded, () => ( 0));
  const available = Math.max(appCount * 700, added - ACCESS_DISCOVERY_OPCODE_BUDGET);
  return Math.max(0, Math.ceil(((_nullishCoalesce(group.appBudgetConsumed, () => ( 0))) - available) / 700));
}
async function buildAccessListGroup(composer, options = {}, transform) {
  var _a, _b;
  const context = composer;
  const raw = await nativeBuild.call(composer);
  const methods = raw.methodCalls;
  let original = raw.atc.clone().buildGroup();
  transform == null ? void 0 : transform(original);
  const coversFees = _nullishCoalesce(options.coverAppCallInnerTransactionFees, () => ( false));
  const populates = _nullishCoalesce(options.populateAppCallResources, () => ( false));
  const hasApps = original.some(({ txn }) => txn.type === _algosdk.TransactionType.appl);
  if (!hasApps || !coversFees && !populates) {
    const atc = compose(original, methods);
    return { atc, transactions: atc.buildGroup(), methodCalls: methods, simulateResponse: void 0 };
  }
  const suggestedParams = await context.getSuggestedParams();
  const maxFees = new Map(context.txnMaxFees);
  const minFee = BigInt(suggestedParams.minFee);
  const repairs = {};
  for (let pass = 0; pass < 32; pass++) {
    const discoveryTxns = compose(original, methods).buildGroup();
    for (const [i, { txn }] of discoveryTxns.entries()) {
      if (txn.type !== _algosdk.TransactionType.appl) continue;
      if (!maxFees.has(i)) maxFees.set(i, _algokitutils.microAlgo.call(void 0, txn.fee));
      if (coversFees) txn.fee = maxFees.get(i).microAlgo;
    }
    const simulate = async (txns2, strict, extraBudget2 = !strict) => {
      const grouped = compose(txns2, methods).buildGroup();
      return simulateWithUsage(context.algod, new _algosdk2.default.modelsv2.SimulateRequest({
        txnGroups: [new _algosdk2.default.modelsv2.SimulateRequestTransactionGroup({
          txns: grouped.map(({ txn }) => new _algosdk2.default.SignedTransaction({ txn }))
        })],
        allowEmptySignatures: true,
        fixSigners: true,
        allowMoreLogging: true,
        allowUnnamedResources: !strict,
        ...extraBudget2 ? { extraOpcodeBudget: ACCESS_DISCOVERY_OPCODE_BUDGET } : {}
      }));
    };
    const { discovery, extraBudget } = await discoverGroup(
      (budgeted) => simulate(discoveryTxns, false, budgeted)
    );
    const group = discovery.txnGroups[0];
    if (group.failureMessage) throw new Error(`Resource discovery failed: ${group.failureMessage}`);
    const normalized = normalizedGroup(group);
    const candidates = compose(original, methods).buildGroup();
    const txns = candidates.map(({ txn }) => txn);
    const appCount = txns.filter((txn) => txn.type === _algosdk.TransactionType.appl).length;
    const analysis = mergeGroupAnalysis({
      transactions: _nullishCoalesce(((_a = normalized.txnResults) == null ? void 0 : _a.map((txn) => ({ unnamedResourcesAccessed: txn.unnamedResourcesAccessed }))), () => ( [])),
      unnamedResourcesAccessed: normalized.unnamedResourcesAccessed,
      createdAppIds: collectCreatedAppIds(normalized),
      requiredOpcodeCarriers: requiredOpcodeCarriers(group, appCount, extraBudget)
    }, accessListRepairs.get(repairs), txns.length);
    try {
      const byteFee = (txn) => {
        const required = BigInt(txn.toByte().length + 75) * BigInt(suggestedParams.fee);
        return required > minFee ? required : minFee;
      };
      const beforeBytes = candidates.map(({ txn }) => byteFee(txn));
      if (populates) populateAccessListResources(candidates.map(({ txn }) => txn), analysis, seededComposers.get(composer));
      const grew = candidates.some(({ txn }, index) => byteFee(txn) > beforeBytes[index]);
      let atc = compose(candidates, methods);
      if (coversFees || grew) {
        atc.buildGroup();
        const { prepareGroupForSending } = await Promise.resolve().then(() => _interopRequireWildcard(require("@algorandfoundation/algokit-utils")));
        const cachedAlgod = new Proxy(context.algod, { get(target, property, receiver) {
          if (property === "simulateTransactions") return () => ({ do: async () => coversFees ? discovery : { ...discovery, txnGroups: discovery.txnGroups.map((group2) => ({ ...group2, txnResults: group2.txnResults.map((result) => ({ ...result, txnResult: { ...result.txnResult, innerTxns: [] } })) })) } });
          return Reflect.get(target, property, receiver);
        } });
        atc = await prepareGroupForSending(atc, cachedAlgod, { coverAppCallInnerTransactionFees: true, populateAppCallResources: false }, { maxFees, suggestedParams });
        const extra = coversFees ? usageFeeSurcharge(group, minFee) : 0n;
        if (extra > 0n) {
          const index = atc.buildGroup().findIndex(({ txn: txn2 }) => txn2.type === _algosdk.TransactionType.appl);
          const txn = atc.buildGroup()[index].txn;
          if (txn.fee + extra > maxFees.get(index).microAlgo) throw new Error("Protocol usage exceeds app-call maxFee");
          txn.fee += extra;
          atc = compose(atc.buildGroup(), methods);
        }
      }
      const transactions = atc.buildGroup();
      const validation = await simulate(transactions, true);
      const failure = (_b = validation.txnGroups[0]) == null ? void 0 : _b.failureMessage;
      if (failure) {
        if (/(?:dynamic cost|static cost|opcode) budget exceeded|group fee .* too small \(needs? [1-9]/i.test(failure)) {
          throw new AccessListCapacityError("Strict simulation requires another pooled opcode-budget carrier.", 1);
        }
        const { discovery: relaxed } = await discoverGroup((budgeted) => simulate(transactions, false, budgeted));
        if (recordAccessListRepairs(repairs, normalizedGroup(relaxed.txnGroups[0]), transactions.map(({ txn }) => txn), failure)) continue;
        throw new Error(`Strict resource validation failed: ${failure}`);
      }
      return { atc, transactions, methodCalls: methods, simulateResponse: validation };
    } catch (error) {
      if (!(error instanceof AccessListCapacityError) || !populates) throw error;
      if (original.length + error.requiredCarrierCount > 16) throw error;
      const registry = registeredAccessCarrierApps(context.algod);
      const deleted = new Set(original.filter(({ txn }) => {
        var _a2;
        return ((_a2 = txn.applicationCall) == null ? void 0 : _a2.onComplete) === _algosdk2.default.OnApplicationComplete.DeleteApplicationOC;
      }).map(({ txn }) => txn.applicationCall.appIndex.toString()));
      const anchor = _nullishCoalesce(original.find(({ txn }) => txn.applicationCall && !deleted.has(txn.applicationCall.appIndex.toString()) && registry.has(txn.applicationCall.appIndex.toString())), () => ( original.find(({ txn }) => txn.applicationCall)));
      const targetAppId = (anchor == null ? void 0 : anchor.txn.applicationCall) && !deleted.has(anchor.txn.applicationCall.appIndex.toString()) && registry.has(anchor.txn.applicationCall.appIndex.toString()) ? anchor.txn.applicationCall.appIndex : [...registry.keys()].filter((id) => !deleted.has(id)).map(BigInt)[0];
      if (!anchor || targetAppId === void 0) throw new Error(error.message + " None of its usable app IDs has a registered safe resource carrier.");
      const sender = _nullishCoalesce([...original].reverse().find(({ txn }) => !isAutomaticCarrierTransaction(txn)), () => ( anchor));
      for (let i = 0; i < error.requiredCarrierCount; i++) {
        const index = original.length;
        const txn = _algosdk2.default.makeApplicationNoOpTxnFromObject({
          sender: sender.txn.sender,
          appIndex: targetAppId,
          appArgs: [registry.get(targetAppId.toString())],
          note: new TextEncoder().encode(`akta-access-carrier-${index + 1}`),
          suggestedParams: { ...suggestedParams, flatFee: true, fee: minFee, firstValid: anchor.txn.firstValid, lastValid: anchor.txn.lastValid }
        });
        original.push({ txn, signer: sender.signer });
        maxFees.set(index, DEFAULT_CARRIER_MAX_FEE);
      }
    }
  }
  throw new Error("Access resource repair did not converge");
}
function installAccessListResourcePopulator() {
  const prototype = _composer.TransactionComposer.prototype;
  if (prototype[ACCESS_LIST_PATCH]) return;
  prototype[ACCESS_LIST_PATCH] = true;
  installSingleSendResultCompatibility();
  const nativeSend = prototype.send;
  prototype.build = async function() {
    const options = configuredComposers.get(this);
    if (!options) return nativeBuild.call(this);
    const cached = preparedComposers.get(this);
    if (cached) return cached;
    const result = await buildAccessListGroup(this, options);
    this.atc = result.atc;
    preparedComposers.set(this, result);
    return result;
  };
  prototype.send = async function(params = {}) {
    const options = { ...params, populateAppCallResources: _nullishCoalesce(params.populateAppCallResources, () => ( _algokitutils.Config.populateAppCallResources)) };
    if (options.populateAppCallResources || options.coverAppCallInnerTransactionFees) {
      const result = await _asyncNullishCoalesce(preparedComposers.get(this), async () => ( await buildAccessListGroup(this, options)));
      this.atc = result.atc;
      preparedComposers.set(this, result);
    }
    return nativeSend.call(this, { ...params, populateAppCallResources: false, coverAppCallInnerTransactionFees: false });
  };
  const nativeRebuild = prototype.rebuild;
  prototype.rebuild = async function() {
    preparedComposers.delete(this);
    return nativeRebuild.call(this);
  };
}















































exports.DEFAULT_READER = DEFAULT_READER; exports.emptySigner = emptySigner; exports.DEFAULT_SEND_PARAMS = DEFAULT_SEND_PARAMS; exports.PAYER_RECORD_MBR = PAYER_RECORD_MBR; exports.MAX_UINT64 = MAX_UINT64; exports.PLUGIN_APP_ID_KEYS = PLUGIN_APP_ID_KEYS; exports.PLUGIN_DEFINITIONS = PLUGIN_DEFINITIONS; exports.TESTNET_PLUGIN_DEPLOYMENTS = TESTNET_PLUGIN_DEPLOYMENTS; exports.MAINNET_PLUGIN_DEPLOYMENTS = MAINNET_PLUGIN_DEPLOYMENTS; exports.NETWORK_PLUGIN_DEPLOYMENTS = NETWORK_PLUGIN_DEPLOYMENTS; exports.TESTNET_APP_IDS = TESTNET_APP_IDS; exports.MAINNET_APP_IDS = MAINNET_APP_IDS; exports.NETWORK_APP_IDS = NETWORK_APP_IDS; exports.DAO_ESCROW_ACTION_V2_ROUNDS = DAO_ESCROW_ACTION_V2_ROUNDS; exports.getDaoEscrowActionV2Cutover = getDaoEscrowActionV2Cutover; exports.REGISTRY_WRITES_STOPPED = REGISTRY_WRITES_STOPPED; exports.registryWritesStopped = registryWritesStopped; exports.shouldWriteRegistry = shouldWriteRegistry; exports.SOCIAL_HINTED_TARGETS = SOCIAL_HINTED_TARGETS; exports.socialHintedTargets = socialHintedTargets; exports.createEmptyAppIds = createEmptyAppIds; exports.getNetworkAppIds = getNetworkAppIds; exports.getPluginDeployments = getPluginDeployments; exports.getLatestPluginDeployment = getLatestPluginDeployment; exports.resolvePluginDeployment = resolvePluginDeployment; exports.getPluginUpdate = getPluginUpdate; exports.getKnownPluginAppIds = getKnownPluginAppIds; exports.ENV_TO_NETWORK_KEY = ENV_TO_NETWORK_KEY; exports.buildAppIdsFromEnv = buildAppIdsFromEnv; exports.ENV_VAR_NAMES = ENV_VAR_NAMES; exports.getNetworkFromEnv = getNetworkFromEnv; exports.getEnvVar = getEnvVar; exports.getAppIdFromEnv = getAppIdFromEnv; exports.getConfigFromEnv = getConfigFromEnv; exports.detectNetworkFromClient = detectNetworkFromClient; exports.setCurrentNetwork = setCurrentNetwork; exports.getCurrentNetwork = getCurrentNetwork; exports.getAppIdForSDK = getAppIdForSDK; exports.resolveAppId = resolveAppId; exports.resolveAppIdWithClient = resolveAppIdWithClient; exports.registerAccessListResourceCarrier = registerAccessListResourceCarrier; exports.seedAccessResources = seedAccessResources; exports.seededAccessResources = seededAccessResources; exports.buildAccessListGroup = buildAccessListGroup; exports.installAccessListResourcePopulator = installAccessListResourcePopulator;
//# sourceMappingURL=chunk-LNVZHCCX.js.map