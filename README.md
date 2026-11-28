# Akita Smart Contracts

A comprehensive suite of Algorand smart contracts powering the Akita ecosystem — built with [Puya Ts](https://github.com/algorandfoundation/puya-ts) and [AlgoKit](https://github.com/algorandfoundation/algokit-cli).

## Overview

Akita is a modular smart contract platform featuring ARC-58 abstracted accounts, a plugin architecture for extensible wallet functionality, and a rich ecosystem of DeFi, social, and community engagement primitives.

For the contract-by-contract lifecycle, trust boundaries, interaction map,
verification strategy, and migration notes, see
[CONTRACT_AUDIT.md](./CONTRACT_AUDIT.md).

## Toolchain and checks

Use Node.js 24 or newer (`nvm use` reads `.nvmrc`) and npm; the lockfile is
`package-lock.json`. PuyaTs and Algorand TypeScript are pinned together to
`1.3.1` (puya 5.10.1) for the AVM 13 contracts in this project. The application SDK
uses AlgoKit Utils 9.2.2 and algosdk 3.7.0; PuyaTs retains its own nested
AlgoKit Utils 10 dependency. `@akita-protocol/plugin` depends on the contract type
definitions directly; it does not install its own compiler.

```bash
npm ci
vibekit localnet start
npm run build --workspace smart_contracts
npm run build --workspace @akita-protocol/sdk
npm run release:manifest:check --workspace smart_contracts
npm run check-types --workspace smart_contracts
npm test --workspaces --if-present
```

The build output is committed. `projects/akita-sc/release/manifest.json` pins the
hash and size of every program under `smart_contracts/artifacts`; after an intended
rebuild run `npm run release:manifest --workspace smart_contracts` and commit the
manifest with the artifacts. CI rebuilds from the lockfile on every push and fails
when the committed output or the manifest differs.

The contract workspace type check includes deployment scripts and test helpers.
The legacy escrow migration script uses the wallet's admin-only `migrateEscrow`
method to expand old escrow records while preserving their app ID and lock state.
It calculates the required box funding and leaves current records unchanged.

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

Composable access control system with 18 sub-gates:

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
| `governanceParticipationGate` | Recent DAO voting participation |
| `moderatorActivityGate` | Counted moderation actions per 7-day epoch |
| `stakingPowerGate` | Staking power thresholds |
| `subscriptionGate` | Active subscription verification |
| `subscriptionStreakGate` | Subscription streak requirements |

### HyperSwap

Peer-to-peer swap engine supporting practically limitless unique assets and parties in a simulated atomic transaction group.

### Meta

Merkle roots and proof verification with one shared store for arbitrary and Merkle-attached records. A reusable ARC-58 Meta plugin keeps per-wallet, per-caller namespace policies in plugin-owned Meta records. Includes public QR-style/account-image schemas. See [Meta documentation](projects/akita-sdk/docs/meta.md). New Meta deployments use a new app ID; existing MetaMerkles deployments remain accessible through the legacy SDK.

---

## Plugins

Wallet plugins extend abstracted account functionality:

| Plugin | Description |
|--------|-------------|
| `optInPlugin` | ASA opt-in operations |
| `payPlugin` | Payment operations; a grant's policy (written through the Meta plugin) can limit it to listed receivers and assets |
| `asaManagerPlugin` | ASA creation and minting |
| `auctionPlugin` | Auction interactions |
| `daoPlugin` | DAO interactions |
| `dualStakePlugin` | Dual token staking |
| `gatePlugin` | Gate verification |
| `haystackRouterPlugin` | Haystack Router swap integration |
| `hyperSwapPlugin` | P2P multi-party swaps |
| `marketplacePlugin` | Marketplace operations |
| `nfdPlugin` | NFD operations |
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
| `daoProposalValidator` | [`777354623`](https://lora.algokit.io/testnet/application/777354623) | [`3783316415`](https://lora.algokit.io/mainnet/application/3783316415) |
| `wallet` | [`763128598`](https://lora.algokit.io/testnet/application/763128598) | [`3569559153`](https://lora.algokit.io/mainnet/application/3569559153) |
| `walletMbr` | [`777358423`](https://lora.algokit.io/testnet/application/777358423) | [`3783363221`](https://lora.algokit.io/mainnet/application/3783363221) |
| `walletFactory` | [`763128255`](https://lora.algokit.io/testnet/application/763128255) | [`3569556257`](https://lora.algokit.io/mainnet/application/3569556257) |
| `escrowFactory` | [`763128227`](https://lora.algokit.io/testnet/application/763128227) | [`3569555755`](https://lora.algokit.io/mainnet/application/3569555755) |

### DeFi Contracts

| Contract | Testnet | Mainnet |
|----------|---------|---------|
| `staking` | [`767114174`](https://lora.algokit.io/testnet/application/767114174) | [`3642366153`](https://lora.algokit.io/mainnet/application/3642366153) |
| `stakingPoolFactory` | [`763128285`](https://lora.algokit.io/testnet/application/763128285) | [`3569556570`](https://lora.algokit.io/mainnet/application/3569556570) |
| `subscriptions` | [`763128278`](https://lora.algokit.io/testnet/application/763128278) | [`3569556497`](https://lora.algokit.io/mainnet/application/3569556497) |
| `rewards` | [`777357495`](https://lora.algokit.io/testnet/application/777357495) | [`3783355325`](https://lora.algokit.io/mainnet/application/3783355325) |
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
| `gate` | [`777356970`](https://lora.algokit.io/testnet/application/777356970) | [`3783317627`](https://lora.algokit.io/mainnet/application/3783317627) |
| `metaMerkles` | [`763128435`](https://lora.algokit.io/testnet/application/763128435) | [`3569558010`](https://lora.algokit.io/mainnet/application/3569558010) |

### 2026-10 Release Contracts

A dash means not deployed on that network yet. Each deployment script's receipt
`--register` step fills its row and the matching optional key in `networks.ts`.

| Contract | Testnet | Mainnet |
|----------|---------|---------|
| `meta` | [`777361599`](https://lora.algokit.io/testnet/application/777361599) | [`3783375524`](https://lora.algokit.io/mainnet/application/3783375524) |
| `metaPlugin` | [`777361610`](https://lora.algokit.io/testnet/application/777361610) | [`3783376389`](https://lora.algokit.io/mainnet/application/3783376389) |
| `collectibleVariations` | [`777361775`](https://lora.algokit.io/testnet/application/777361775) | [`3783380494`](https://lora.algokit.io/mainnet/application/3783380494) |
| `guildFactory` | [`777361835`](https://lora.algokit.io/testnet/application/777361835) | [`3783381069`](https://lora.algokit.io/mainnet/application/3783381069) |
| `guildConsensusFactory` | [`777361808`](https://lora.algokit.io/testnet/application/777361808) | [`3783380842`](https://lora.algokit.io/mainnet/application/3783380842) |
| `guildPlugin` | [`777361866`](https://lora.algokit.io/testnet/application/777361866) | [`3783381241`](https://lora.algokit.io/mainnet/application/3783381241) |
| `welcomePlugin` | [`777358536`](https://lora.algokit.io/testnet/application/777358536) | [`3783368260`](https://lora.algokit.io/mainnet/application/3783368260) |
| `socialClaim` | — | — |
| `assetInboxPlugin` | — | — |
| `walletBalanceReader` | [`777361926`](https://lora.algokit.io/testnet/application/777361926) | [`3783381916`](https://lora.algokit.io/mainnet/application/3783381916) |
| `governanceParticipationGate` | [`777357149`](https://lora.algokit.io/testnet/application/777357149) | [`3783318970`](https://lora.algokit.io/mainnet/application/3783318970) |
| `moderatorActivityGate` | [`777357141`](https://lora.algokit.io/testnet/application/777357141) | [`3783318837`](https://lora.algokit.io/mainnet/application/3783318837) |
| `rewardsV1` | [`763128244`](https://lora.algokit.io/testnet/application/763128244) | [`3569556095`](https://lora.algokit.io/mainnet/application/3569556095) |
| `inferenceNetwork` | [`777489805`](https://lora.algokit.io/testnet/application/777489805) | [`3784962089`](https://lora.algokit.io/mainnet/application/3784962089) |
| `inferencePlugin` | [`777489958`](https://lora.algokit.io/testnet/application/777489958) | [`3784962543`](https://lora.algokit.io/mainnet/application/3784962543) |

### Plugins (Latest Deployments)

The IDs below are the newest deployments used for new installations. Historical
plugin IDs remain in `TESTNET_PLUGIN_DEPLOYMENTS` and
`MAINNET_PLUGIN_DEPLOYMENTS`. Individual plugin deployment scripts append their
new ID automatically and update this table; older entries are never replaced.

| Plugin | Testnet | Mainnet |
|--------|---------|---------|
| `optInPlugin` | [`777358640`](https://lora.algokit.io/testnet/application/777358640) | [`3783368803`](https://lora.algokit.io/mainnet/application/3783368803) |
| `selfOptInPlugin` | [`777358644`](https://lora.algokit.io/testnet/application/777358644) | [`3783368862`](https://lora.algokit.io/mainnet/application/3783368862) |
| `payPlugin` | [`777361642`](https://lora.algokit.io/testnet/application/777361642) | [`3783377516`](https://lora.algokit.io/mainnet/application/3783377516) |
| `asaManagerPlugin` | [`777358657`](https://lora.algokit.io/testnet/application/777358657) | [`3783368908`](https://lora.algokit.io/mainnet/application/3783368908) |
| `auctionPlugin` | [`777358513`](https://lora.algokit.io/testnet/application/777358513) | [`3783367996`](https://lora.algokit.io/mainnet/application/3783367996) |
| `daoPlugin` | [`777356844`](https://lora.algokit.io/testnet/application/777356844) | [`3783316919`](https://lora.algokit.io/mainnet/application/3783316919) |
| `dualStakePlugin` | [`763128877`](https://lora.algokit.io/testnet/application/763128877) | [`3569561317`](https://lora.algokit.io/mainnet/application/3569561317) |
| `gatePlugin` | [`777358603`](https://lora.algokit.io/testnet/application/777358603) | [`3783368632`](https://lora.algokit.io/mainnet/application/3783368632) |
| `haystackRouterPlugin` | [`763128851`](https://lora.algokit.io/testnet/application/763128851) | [`3783369023`](https://lora.algokit.io/mainnet/application/3783369023) |
| `hyperSwapPlugin` | [`777358238`](https://lora.algokit.io/testnet/application/777358238) | [`3783361853`](https://lora.algokit.io/mainnet/application/3783361853) |
| `marketplacePlugin` | [`777358517`](https://lora.algokit.io/testnet/application/777358517) | [`3783368085`](https://lora.algokit.io/mainnet/application/3783368085) |
| `nfdPlugin` | [`777358660`](https://lora.algokit.io/testnet/application/777358660) | [`3783369090`](https://lora.algokit.io/mainnet/application/3783369090) |
| `pollPlugin` | [`777358184`](https://lora.algokit.io/testnet/application/777358184) | [`3783361614`](https://lora.algokit.io/mainnet/application/3783361614) |
| `rafflePlugin` | [`777358531`](https://lora.algokit.io/testnet/application/777358531) | [`3783368172`](https://lora.algokit.io/mainnet/application/3783368172) |
| `revenueManagerPlugin` | [`777361196`](https://lora.algokit.io/testnet/application/777361196) | [`3783372465`](https://lora.algokit.io/mainnet/application/3783372465) |
| `rewardsPlugin` | [`777358621`](https://lora.algokit.io/testnet/application/777358621) | [`3783368772`](https://lora.algokit.io/mainnet/application/3783368772) |
| `socialPlugin` | [`777358481`](https://lora.algokit.io/testnet/application/777358481) | [`3783367682`](https://lora.algokit.io/mainnet/application/3783367682) |
| `stakingPlugin` | [`777358609`](https://lora.algokit.io/testnet/application/777358609) | [`3783368727`](https://lora.algokit.io/mainnet/application/3783368727) |
| `stakingPoolPlugin` | [`777358499`](https://lora.algokit.io/testnet/application/777358499) | [`3783367889`](https://lora.algokit.io/mainnet/application/3783367889) |
| `subscriptionsPlugin` | [`777358494`](https://lora.algokit.io/testnet/application/777358494) | [`3783367783`](https://lora.algokit.io/mainnet/application/3783367783) |
| `updatePlugin` | [`777354566`](https://lora.algokit.io/testnet/application/777354566) | [`3783316013`](https://lora.algokit.io/mainnet/application/3783316013) |

Applications can identify an installed historical plugin and offer its newest
replacement through the SDK:

```ts
import { resolvePluginDeployment, getPluginUpdate } from '@akita-protocol/sdk'

const plugin = resolvePluginDeployment('mainnet', installedPluginAppId)
const update = getPluginUpdate('mainnet', installedPluginAppId)

// plugin.name identifies old and current deployments consistently.
// update?.latest.appId is the app ID offered for replacement.
```

### Deprecated plugins

PaySiloPlugin and PaySiloFactoryPlugin are deprecated (2026-11-21) and their code is
removed. A pay silo fixed its receiver in its own program; a PayPlugin grant with a
policy does the same job: the wallet writes the allowed receivers and assets through
the Meta plugin, and PayPlugin refuses any other payment. The deployed apps stay on
chain, unused, and are no longer in the SDK network maps:

| Plugin | Testnet | Mainnet |
|--------|---------|---------|
| `paySiloPlugin` (deprecated) | [`763128904`](https://lora.algokit.io/testnet/application/763128904), earlier `751972334` | [`3569561570`](https://lora.algokit.io/mainnet/application/3569561570), earlier `3368399670` |
| `paySiloFactoryPlugin` (deprecated) | [`763128905`](https://lora.algokit.io/testnet/application/763128905), earlier `751968441` | [`3569561636`](https://lora.algokit.io/mainnet/application/3569561636), earlier `3368399704` |

Each plugin deployment list is ordered oldest to newest. The one-based
`revision` returned by `resolvePluginDeployment` describes that ordering even
when an on-chain semantic version was not recorded.

### Sub-Gates

| Sub-Gate | Testnet | Mainnet |
|----------|---------|---------|
| `akitaReferrerGate` | [`777356990`](https://lora.algokit.io/testnet/application/777356990) | [`3783317698`](https://lora.algokit.io/mainnet/application/3783317698) |
| `assetGate` | [`777356996`](https://lora.algokit.io/testnet/application/777356996) | [`3783317850`](https://lora.algokit.io/mainnet/application/3783317850) |
| `merkleAddressGate` | [`777357012`](https://lora.algokit.io/testnet/application/777357012) | [`3783317913`](https://lora.algokit.io/mainnet/application/3783317913) |
| `merkleAssetGate` | [`777357020`](https://lora.algokit.io/testnet/application/777357020) | [`3783318002`](https://lora.algokit.io/mainnet/application/3783318002) |
| `nfdGate` | [`777357035`](https://lora.algokit.io/testnet/application/777357035) | [`3783318085`](https://lora.algokit.io/mainnet/application/3783318085) |
| `nfdRootGate` | [`777357044`](https://lora.algokit.io/testnet/application/777357044) | [`3783318161`](https://lora.algokit.io/mainnet/application/3783318161) |
| `pollGate` | [`777357065`](https://lora.algokit.io/testnet/application/777357065) | [`3783318261`](https://lora.algokit.io/mainnet/application/3783318261) |
| `socialActivityGate` | [`777357077`](https://lora.algokit.io/testnet/application/777357077) | [`3783318333`](https://lora.algokit.io/mainnet/application/3783318333) |
| `socialFollowerCountGate` | [`777357096`](https://lora.algokit.io/testnet/application/777357096) | [`3783318428`](https://lora.algokit.io/mainnet/application/3783318428) |
| `socialFollowerIndexGate` | [`777357102`](https://lora.algokit.io/testnet/application/777357102) | [`3783318519`](https://lora.algokit.io/mainnet/application/3783318519) |
| `socialImpactGate` | [`777357117`](https://lora.algokit.io/testnet/application/777357117) | [`3783318597`](https://lora.algokit.io/mainnet/application/3783318597) |
| `socialModeratorGate` | [`777357126`](https://lora.algokit.io/testnet/application/777357126) | [`3783318742`](https://lora.algokit.io/mainnet/application/3783318742) |
| `stakingAmountGate` | [`777357165`](https://lora.algokit.io/testnet/application/777357165) | [`3783319031`](https://lora.algokit.io/mainnet/application/3783319031) |
| `stakingPowerGate` | [`777357173`](https://lora.algokit.io/testnet/application/777357173) | [`3783319125`](https://lora.algokit.io/mainnet/application/3783319125) |
| `subscriptionGate` | [`777357191`](https://lora.algokit.io/testnet/application/777357191) | [`3783319272`](https://lora.algokit.io/mainnet/application/3783319272) |
| `subscriptionStreakGate` | [`777357200`](https://lora.algokit.io/testnet/application/777357200) | [`3783319383`](https://lora.algokit.io/mainnet/application/3783319383) |

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
| Auction | `@akita-protocol/sdk/auction` |
| DAO | `@akita-protocol/sdk/dao` |
| Escrow | `@akita-protocol/sdk/escrow` |
| Gates | `@akita-protocol/sdk/gates` |
| HyperSwap | `@akita-protocol/sdk/hyper-swap` |
| Marketplace | `@akita-protocol/sdk/marketplace` |
| Meta | `@akita-protocol/sdk/meta` |
| MetaMerkles (legacy deployments) | `@akita-protocol/sdk/meta-merkles` |
| Poll | `@akita-protocol/sdk/poll` |
| Prize Box | `@akita-protocol/sdk/prize-box` |
| Raffle | `@akita-protocol/sdk/raffle` |
| Rewards | `@akita-protocol/sdk/rewards` |
| Social | `@akita-protocol/sdk/social` |
| Staking | `@akita-protocol/sdk/staking` |
| Staking Pool | `@akita-protocol/sdk/staking-pool` |
| Subscriptions | `@akita-protocol/sdk/subscriptions` |
| Wallet | `@akita-protocol/sdk/wallet` |

```typescript
// Import specific modules
import { WalletSDK } from '@akita-protocol/sdk/wallet';
import { StakingSDK } from '@akita-protocol/sdk/staking';
import { SubscriptionsSDK } from '@akita-protocol/sdk/subscriptions';
```

See [`projects/akita-sdk`](./projects/akita-sdk) for full documentation.

---

## Plugin Development Kit

The `@akita-protocol/plugin` package (`akita-plugin`) provides a utility library for building ARC-58 abstract account plugins with PuyaTs. It includes the base contract, types, constants, and helper functions needed to develop custom plugins that extend abstracted account functionality. The plugins in this repository import their wallet helpers from it.

See [`projects/akita-plugin`](./projects/akita-plugin) for details.

---

## License

This project is licensed under the **Akita Business Source License**.

**Before January 1, 2029:** You may use, copy, modify, and redistribute the code for any purpose, including production use, **except** you may not use it to provide a competing commercial service. Internal use and building applications that interact with the official Akita protocol are permitted.

**On and after January 1, 2029:** The code becomes available under the **GNU General Public License v2** (or later).

See the [LICENSE](./LICENSE) file for full details.
