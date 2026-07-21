# Akita Smart Contracts

A comprehensive suite of Algorand smart contracts powering the Akita ecosystem — built with [Puya Ts](https://github.com/algorandfoundation/puya-ts) and [AlgoKit](https://github.com/algorandfoundation/algokit-cli).

## Overview

Akita is a modular smart contract platform featuring ARC-58 abstracted accounts, a plugin architecture for extensible wallet functionality, and a rich ecosystem of DeFi, social, and community engagement primitives.

For the contract-by-contract lifecycle, trust boundaries, interaction map,
verification strategy, and migration notes, see
[CONTRACT_AUDIT.md](./CONTRACT_AUDIT.md).

---

## Architecture

### Core Components

| Component | Description |
|-----------|-------------|
| **ARC-58 Abstracted Accounts** | Smart contract wallets with plugin-based extensibility |
| **DAO** | Decentralized governance and administrative control |
| **Plugin System** | Modular functionality that can be attached to abstracted accounts |
| **Gate System** | Composable access control with pluggable sub-gates |

---

## System Modules

### ARC-58 Abstracted Accounts

Smart contract wallets implementing ARC-58 standard with support for:
- Multi-key authentication (Ed25519, secp256r1 passkeys)
- Plugin-based extensibility
- Factory pattern for wallet deployment

### DAO

Decentralized autonomous organization contract for:
- Governance and voting
- Administrative operations
- Protocol parameter management

### Staking

Flexible staking system with:
- **Staking Contract** — Core staking logic with time-weighted rewards
- **Staking Pool Factory** — Deploy isolated staking pools with custom parameters

### Subscriptions

Recurring payment and membership system:
- Subscription tiers and streaks
- Service declaration & parameter locking
- Subscription-gated access control

### Rewards

Free public good for token distribution:
- Group distributions
- Claimable rewards w/ expirations

### Social

Decentralized social primitives:
- **Social Contract** — Core social interactions
- **Social Graph** — On-chain follow/follower relationships
- **Social Impact** — Reputation and engagement scoring
- **Social Moderation** — Community moderation tools

### Marketplace

NFT and ASA marketplace:
- Listing creation and management
- Buy/sell operations
- Double-sided marketplace incentivizing site integration

### Auctions

Auction system with factory pattern:
- Bid fees for weighted raffle mechanics
- Double-sided marketplace incentivizing site integration
- Multi-dapp participation support

### Raffles

Verifiable random raffles:

- Tickets in any ASA
- VRF-based winner selection
- Double-sided marketplace incentivizing site integration

### Polls

On-chain voting and polling:
- Multiple choice polls
- Time-bounded voting
- Gate-restricted participation

### Prize Boxes

Bundle assets for sale, auction, or raffle as a single package.

### Gates

Composable access control system with 16 sub-gates:

| Sub-Gate | Purpose |
|----------|---------|
| `akitaReferrerGate` | Akita referrer verification |
| `assetGate` | ASA holding requirements |
| `merkleAddressGate` | Merkle proof address allowlist |
| `merkleAssetGate` | Merkle proof asset allowlist |
| `nfdGate` | NFD ownership verification |
| `nfdRootGate` | NFD root ownership verification |
| `pollGate` | Poll participation requirements |
| `socialActivityGate` | Social activity thresholds |
| `socialFollowerCountGate` | Follower count requirements |
| `socialFollowerIndexGate` | Follower index verification |
| `socialImpactGate` | Social impact score thresholds |
| `socialModeratorGate` | Moderator role verification |
| `stakingAmountGate` | Staking amount requirements |
| `stakingPowerGate` | Staking power thresholds |
| `subscriptionGate` | Active subscription verification |
| `subscriptionStreakGate` | Subscription streak requirements |

### HyperSwap

Peer-to-peer swap engine supporting practically limitless unique assets and parties in a simulated atomic transaction group.

### Meta Merkles

On-chain metadata contract using merkle roots as namespaces for efficient metadata about sets of assets, addresses, apps, and more. Ingestible by other contracts for composable data verification.

---

## Plugins

Wallet plugins extend abstracted account functionality:

| Plugin | Description |
|--------|-------------|
| `optInPlugin` | ASA opt-in operations |
| `payPlugin` | Payment operations |
| `asaManagerPlugin` | ASA creation and minting |
| `auctionPlugin` | Auction interactions |
| `daoPlugin` | DAO interactions |
| `dualStakePlugin` | Dual token staking |
| `gatePlugin` | Gate verification |
| `haystackRouterPlugin` | Haystack Router swap integration |
| `hyperSwapPlugin` | P2P multi-party swaps |
| `marketplacePlugin` | Marketplace operations |
| `nfdPlugin` | NFD operations |
| `paySiloPlugin` | Pay silo interactions |
| `paySiloFactoryPlugin` | Pay silo deployment |
| `pollPlugin` | Poll voting |
| `rafflePlugin` | Raffle participation |
| `revenueManagerPlugin` | Revenue distribution |
| `rewardsPlugin` | Reward claiming |
| `socialPlugin` | Social interactions |
| `stakingPlugin` | Staking operations |
| `stakingPoolPlugin` | Staking pool interactions |
| `subscriptionsPlugin` | Subscription management |
| `updatePlugin` | Contract updates |

---

## Deployment

Testnet last updated from `deployment-summary-testnet-1779520060364.json` on 2026-05-23.
Mainnet last updated from manual NFD/staking plugin deployment on 2026-05-25.

### Core Contracts

| Contract | Testnet | Mainnet |
|----------|---------|---------|
| `dao` | [`763128236`](https://lora.algokit.io/testnet/application/763128236) | [`3569556034`](https://lora.algokit.io/mainnet/application/3569556034) |
| `daoProposalValidator` | [`767109617`](https://lora.algokit.io/testnet/application/767109617) | [`3642264629`](https://lora.algokit.io/mainnet/application/3642264629) |
| `wallet` | [`763128598`](https://lora.algokit.io/testnet/application/763128598) | [`3569559153`](https://lora.algokit.io/mainnet/application/3569559153) |
| `walletMbr` | [`767110471`](https://lora.algokit.io/testnet/application/767110471) | [`3642282698`](https://lora.algokit.io/mainnet/application/3642282698) |
| `walletFactory` | [`763128255`](https://lora.algokit.io/testnet/application/763128255) | [`3569556257`](https://lora.algokit.io/mainnet/application/3569556257) |
| `escrowFactory` | [`763128227`](https://lora.algokit.io/testnet/application/763128227) | [`3569555755`](https://lora.algokit.io/mainnet/application/3569555755) |

### DeFi Contracts

| Contract | Testnet | Mainnet |
|----------|---------|---------|
| `staking` | [`767114174`](https://lora.algokit.io/testnet/application/767114174) | [`3642366153`](https://lora.algokit.io/mainnet/application/3642366153) |
| `stakingPoolFactory` | [`763128285`](https://lora.algokit.io/testnet/application/763128285) | [`3569556570`](https://lora.algokit.io/mainnet/application/3569556570) |
| `subscriptions` | [`763128278`](https://lora.algokit.io/testnet/application/763128278) | [`3569556497`](https://lora.algokit.io/mainnet/application/3569556497) |
| `rewards` | [`763128244`](https://lora.algokit.io/testnet/application/763128244) | [`3569556095`](https://lora.algokit.io/mainnet/application/3569556095) |
| `hyperSwap` | [`763128499`](https://lora.algokit.io/testnet/application/763128499) | [`3569558555`](https://lora.algokit.io/mainnet/application/3569558555) |
| `marketplace` | [`763128381`](https://lora.algokit.io/testnet/application/763128381) | [`3569557584`](https://lora.algokit.io/mainnet/application/3569557584) |
| `auctionFactory` | [`763128353`](https://lora.algokit.io/testnet/application/763128353) | [`3569557408`](https://lora.algokit.io/mainnet/application/3569557408) |

### Community Contracts

| Contract | Testnet | Mainnet |
|----------|---------|---------|
| `social` | [`763128333`](https://lora.algokit.io/testnet/application/763128333) | [`3569557130`](https://lora.algokit.io/mainnet/application/3569557130) |
| `socialGraph` | [`763128326`](https://lora.algokit.io/testnet/application/763128326) | [`3569557033`](https://lora.algokit.io/mainnet/application/3569557033) |
| `socialImpact` | [`763128316`](https://lora.algokit.io/testnet/application/763128316) | [`3569556973`](https://lora.algokit.io/mainnet/application/3569556973) |
| `socialModeration` | [`763128334`](https://lora.algokit.io/testnet/application/763128334) | [`3569557176`](https://lora.algokit.io/mainnet/application/3569557176) |
| `pollFactory` | [`763128430`](https://lora.algokit.io/testnet/application/763128430) | [`3569557932`](https://lora.algokit.io/mainnet/application/3569557932) |
| `raffleFactory` | [`763128404`](https://lora.algokit.io/testnet/application/763128404) | [`3569557743`](https://lora.algokit.io/mainnet/application/3569557743) |
| `prizeBoxFactory` | [`763128434`](https://lora.algokit.io/testnet/application/763128434) | [`3569557972`](https://lora.algokit.io/mainnet/application/3569557972) |

### Infrastructure Contracts

| Contract | Testnet | Mainnet |
|----------|---------|---------|
| `gate` | [`763128492`](https://lora.algokit.io/testnet/application/763128492) | [`3569558504`](https://lora.algokit.io/mainnet/application/3569558504) |
| `metaMerkles` | [`763128435`](https://lora.algokit.io/testnet/application/763128435) | [`3569558010`](https://lora.algokit.io/mainnet/application/3569558010) |

### Plugins (Latest Deployments)

The IDs below are the newest deployments used for new installations. Historical
plugin IDs remain in `TESTNET_PLUGIN_DEPLOYMENTS` and
`MAINNET_PLUGIN_DEPLOYMENTS`. Individual plugin deployment scripts append their
new ID automatically and update this table; older entries are never replaced.

| Plugin | Testnet | Mainnet |
|--------|---------|---------|
| `optInPlugin` | [`763128795`](https://lora.algokit.io/testnet/application/763128795) | [`3569560490`](https://lora.algokit.io/mainnet/application/3569560490) |
| `selfOptInPlugin` | [`767318626`](https://lora.algokit.io/testnet/application/767318626) | [`3644027143`](https://lora.algokit.io/mainnet/application/3644027143) |
| `payPlugin` | [`763128821`](https://lora.algokit.io/testnet/application/763128821) | [`3569560828`](https://lora.algokit.io/mainnet/application/3569560828) |
| `asaManagerPlugin` | [`764705920`](https://lora.algokit.io/testnet/application/764705920) | [`3605315701`](https://lora.algokit.io/mainnet/application/3605315701) |
| `auctionPlugin` | [`763128866`](https://lora.algokit.io/testnet/application/763128866) | [`3569561141`](https://lora.algokit.io/mainnet/application/3569561141) |
| `daoPlugin` | [`763128876`](https://lora.algokit.io/testnet/application/763128876) | [`3569561215`](https://lora.algokit.io/mainnet/application/3569561215) |
| `dualStakePlugin` | [`763128877`](https://lora.algokit.io/testnet/application/763128877) | [`3569561317`](https://lora.algokit.io/mainnet/application/3569561317) |
| `gatePlugin` | [`763128884`](https://lora.algokit.io/testnet/application/763128884) | [`3569561367`](https://lora.algokit.io/mainnet/application/3569561367) |
| `haystackRouterPlugin` | [`763128851`](https://lora.algokit.io/testnet/application/763128851) | [`3579545659`](https://lora.algokit.io/mainnet/application/3579545659) |
| `hyperSwapPlugin` | [`763128858`](https://lora.algokit.io/testnet/application/763128858) | [`3569561068`](https://lora.algokit.io/mainnet/application/3569561068) |
| `marketplacePlugin` | [`763128885`](https://lora.algokit.io/testnet/application/763128885) | [`3569561455`](https://lora.algokit.io/mainnet/application/3569561455) |
| `nfdPlugin` | [`763128895`](https://lora.algokit.io/testnet/application/763128895) | [`3572944055`](https://lora.algokit.io/mainnet/application/3572944055) |
| `paySiloPlugin` | [`763128904`](https://lora.algokit.io/testnet/application/763128904) | [`3569561570`](https://lora.algokit.io/mainnet/application/3569561570) |
| `paySiloFactoryPlugin` | [`763128905`](https://lora.algokit.io/testnet/application/763128905) | [`3569561636`](https://lora.algokit.io/mainnet/application/3569561636) |
| `pollPlugin` | [`763128906`](https://lora.algokit.io/testnet/application/763128906) | [`3569561749`](https://lora.algokit.io/mainnet/application/3569561749) |
| `rafflePlugin` | [`763128922`](https://lora.algokit.io/testnet/application/763128922) | [`3569561863`](https://lora.algokit.io/mainnet/application/3569561863) |
| `revenueManagerPlugin` | [`767111831`](https://lora.algokit.io/testnet/application/767111831) | [`3642325118`](https://lora.algokit.io/mainnet/application/3642325118) |
| `rewardsPlugin` | [`763128923`](https://lora.algokit.io/testnet/application/763128923) | [`3569561963`](https://lora.algokit.io/mainnet/application/3569561963) |
| `socialPlugin` | [`767298319`](https://lora.algokit.io/testnet/application/767298319) | [`3643581007`](https://lora.algokit.io/mainnet/application/3643581007) |
| `stakingPlugin` | [`767116005`](https://lora.algokit.io/testnet/application/767116005) | [`3642392585`](https://lora.algokit.io/mainnet/application/3642392585) |
| `stakingPoolPlugin` | [`767118261`](https://lora.algokit.io/testnet/application/767118261) | [`3642438287`](https://lora.algokit.io/mainnet/application/3642438287) |
| `subscriptionsPlugin` | [`763128859`](https://lora.algokit.io/testnet/application/763128859) | [`3569561107`](https://lora.algokit.io/mainnet/application/3569561107) |
| `updatePlugin` | [`763128671`](https://lora.algokit.io/testnet/application/763128671) | [`3569559689`](https://lora.algokit.io/mainnet/application/3569559689) |

Applications can identify an installed historical plugin and offer its newest
replacement through the SDK:

```ts
import { resolvePluginDeployment, getPluginUpdate } from '@akta/sdk'

const plugin = resolvePluginDeployment('mainnet', installedPluginAppId)
const update = getPluginUpdate('mainnet', installedPluginAppId)

// plugin.name identifies old and current deployments consistently.
// update?.latest.appId is the app ID offered for replacement.
```

Each plugin deployment list is ordered oldest to newest. The one-based
`revision` returned by `resolvePluginDeployment` describes that ordering even
when an on-chain semantic version was not recorded.

### Sub-Gates

| Sub-Gate | Testnet | Mainnet |
|----------|---------|---------|
| `akitaReferrerGate` | [`763128503`](https://lora.algokit.io/testnet/application/763128503) | [`3569558604`](https://lora.algokit.io/mainnet/application/3569558604) |
| `assetGate` | [`763128508`](https://lora.algokit.io/testnet/application/763128508) | [`3569558602`](https://lora.algokit.io/mainnet/application/3569558602) |
| `merkleAddressGate` | [`763128509`](https://lora.algokit.io/testnet/application/763128509) | [`3569558615`](https://lora.algokit.io/mainnet/application/3569558615) |
| `merkleAssetGate` | [`763128506`](https://lora.algokit.io/testnet/application/763128506) | [`3569558603`](https://lora.algokit.io/mainnet/application/3569558603) |
| `nfdGate` | [`763128504`](https://lora.algokit.io/testnet/application/763128504) | [`3569558608`](https://lora.algokit.io/mainnet/application/3569558608) |
| `nfdRootGate` | [`763128511`](https://lora.algokit.io/testnet/application/763128511) | [`3569558606`](https://lora.algokit.io/mainnet/application/3569558606) |
| `pollGate` | [`763128514`](https://lora.algokit.io/testnet/application/763128514) | [`3569558607`](https://lora.algokit.io/mainnet/application/3569558607) |
| `socialActivityGate` | [`763128517`](https://lora.algokit.io/testnet/application/763128517) | [`3569558616`](https://lora.algokit.io/mainnet/application/3569558616) |
| `socialFollowerCountGate` | [`763128518`](https://lora.algokit.io/testnet/application/763128518) | [`3569558612`](https://lora.algokit.io/mainnet/application/3569558612) |
| `socialFollowerIndexGate` | [`763128516`](https://lora.algokit.io/testnet/application/763128516) | [`3569558605`](https://lora.algokit.io/mainnet/application/3569558605) |
| `socialImpactGate` | [`763128505`](https://lora.algokit.io/testnet/application/763128505) | [`3569558618`](https://lora.algokit.io/mainnet/application/3569558618) |
| `socialModeratorGate` | [`763128512`](https://lora.algokit.io/testnet/application/763128512) | [`3569558617`](https://lora.algokit.io/mainnet/application/3569558617) |
| `stakingAmountGate` | [`767128670`](https://lora.algokit.io/testnet/application/767128670) | [`3642526856`](https://lora.algokit.io/mainnet/application/3642526856) |
| `stakingPowerGate` | [`767241897`](https://lora.algokit.io/testnet/application/767241897) | [`3642975628`](https://lora.algokit.io/mainnet/application/3642975628) |
| `subscriptionGate` | [`763128507`](https://lora.algokit.io/testnet/application/763128507) | [`3569558609`](https://lora.algokit.io/mainnet/application/3569558609) |
| `subscriptionStreakGate` | [`763128515`](https://lora.algokit.io/testnet/application/763128515) | [`3569558614`](https://lora.algokit.io/mainnet/application/3569558614) |

### Assets

| Asset | Testnet | Mainnet |
|-------|---------|---------|
| `AKTA` | `752884771` | `523683256` |
| `BONES` | `763129960` | `3569570855` |
| `USDC` | `10458941` | `31566704` |

### External Dependencies

| Contract | Testnet | Mainnet |
|----------|---------|---------|
| VRF Beacon | [`600011887`](https://lora.algokit.io/testnet/application/600011887) | [`1615566206`](https://lora.algokit.io/mainnet/application/1615566206) |
| NFD Registry | [`84366825`](https://lora.algokit.io/testnet/application/84366825) | [`760937186`](https://lora.algokit.io/mainnet/application/760937186) |
| Asset Inbox | [`643020148`](https://lora.algokit.io/testnet/application/643020148) | [`2449590623`](https://lora.algokit.io/mainnet/application/2449590623) |
| Akita NFD | `0` | [`765902356`](https://lora.algokit.io/mainnet/application/765902356) |

---

## SDK

The `akita-sdk` package provides modular TypeScript bindings — import only what you need:

| Package | Import |
|---------|--------|
| Auction | `akita-sdk/auction` |
| DAO | `akita-sdk/dao` |
| Escrow | `akita-sdk/escrow` |
| Gates | `akita-sdk/gates` |
| HyperSwap | `akita-sdk/hyper-swap` |
| Marketplace | `akita-sdk/marketplace` |
| Meta Merkles | `akita-sdk/meta-merkles` |
| Poll | `akita-sdk/poll` |
| Prize Box | `akita-sdk/prize-box` |
| Raffle | `akita-sdk/raffle` |
| Rewards | `akita-sdk/rewards` |
| Social | `akita-sdk/social` |
| Staking | `akita-sdk/staking` |
| Staking Pool | `akita-sdk/staking-pool` |
| Subscriptions | `akita-sdk/subscriptions` |
| Wallet | `akita-sdk/wallet` |

```typescript
// Import specific modules
import { WalletSDK } from 'akita-sdk/wallet';
import { StakingSDK } from 'akita-sdk/staking';
import { SubscriptionsSDK } from 'akita-sdk/subscriptions';
```

See [`projects/akita-sdk`](./projects/akita-sdk) for full documentation.

---

## Plugin Development Kit

The `@akta/plugin` package (`akita-plugin`) provides a utility library for building ARC-58 abstract account plugins with PuyaTs. It includes the base contract, types, constants, and helper functions needed to develop custom plugins that extend abstracted account functionality.

See [`projects/akita-plugin`](./projects/akita-plugin) for details.

---

## License

This project is licensed under the **Akita Business Source License**.

**Before January 1, 2029:** You may use, copy, modify, and redistribute the code for any purpose, including production use, **except** you may not use it to provide a competing commercial service. Internal use and building applications that interact with the official Akita protocol are permitted.

**On and after January 1, 2029:** The code becomes available under the **GNU General Public License v2** (or later).

See the [LICENSE](./LICENSE) file for full details.
