# @akta/sdk

TypeScript SDK for the Akita protocol on Algorand. Provides high-level interfaces for ARC58 abstracted account wallets, social features, rewards, auctions, staking, subscriptions, and more.

## Installation

```bash
npm install @akta/sdk
# or
pnpm add @akta/sdk
```

**Peer dependencies:**

```bash
npm install algosdk @algorandfoundation/algokit-utils
```

## Modules

The SDK is organized into sub-path exports. Import only what you need:

```typescript
import { WalletSDK, WalletFactorySDK, PayPluginSDK } from '@akta/sdk/wallet'
import { SocialSDK } from '@akta/sdk/social'
import { RewardsSDK } from '@akta/sdk/rewards'
import { AuctionSDK, AuctionFactorySDK } from '@akta/sdk/auction'
import { AkitaDaoSDK } from '@akta/sdk/dao'
import { StakingSDK } from '@akta/sdk/staking'
import { StakingPoolSDK, StakingPoolFactorySDK } from '@akta/sdk/staking-pool'
import { SubscriptionsSDK } from '@akta/sdk/subscriptions'
import { MarketplaceSDK } from '@akta/sdk/marketplace'
import { EscrowSDK, EscrowFactorySDK } from '@akta/sdk/escrow'
import { PollSDK, PollFactorySDK } from '@akta/sdk/poll'
import { RaffleSDK, RaffleFactorySDK } from '@akta/sdk/raffle'
import { PrizeBoxSDK, PrizeBoxFactorySDK } from '@akta/sdk/prize-box'
import { GateSDK } from '@akta/sdk/gates'
import { HyperSwapSDK } from '@akta/sdk/hyper-swap'
import { MetaMerklesSDK } from '@akta/sdk/meta-merkles'
```

Or import everything from the root:

```typescript
import { WalletSDK, SocialSDK, RewardsSDK, getNetworkAppIds } from '@akta/sdk'
```

## Quick Start

```typescript
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { newWallet, PayPluginSDK } from '@akta/sdk/wallet'

const algorand = AlgorandClient.fromEnvironment()

// Create a wallet
const wallet = await newWallet({
  algorand,
  factoryParams: { appId: WALLET_FACTORY_APP_ID, defaultSender: myAddress, defaultSigner: mySigner },
  sender: myAddress,
  signer: mySigner,
  nickname: 'my_wallet',
})

// Install a plugin
const payPlugin = new PayPluginSDK({ factoryParams: { appId: PAY_PLUGIN_APP_ID }, algorand })
await wallet.addPlugin({ client: payPlugin, global: true })

// Send a payment
await wallet.usePlugin({
  global: true,
  consolidateFees: true,
  calls: [
    payPlugin.pay({
      payments: [{ receiver: recipientAddress, amount: 1_000_000n, asset: 0n }],
    }),
  ],
})
```

## Configuration

### Network Detection

The SDK automatically detects the network from the AlgorandClient URL, environment variables, or explicit configuration:

```typescript
import { setCurrentNetwork, getCurrentNetwork, getNetworkAppIds } from '@akta/sdk'

setCurrentNetwork('mainnet')
const network = getCurrentNetwork() // 'mainnet' | 'testnet' | 'localnet'

// Get all app IDs for the current network
const appIds = getNetworkAppIds()
```

### Environment Variables

```bash
ALGORAND_NETWORK=mainnet
WALLET_FACTORY_APP_ID=123456789
PAY_PLUGIN_APP_ID=123456791
# ... etc
```

### SDK Construction Pattern

All SDKs follow the same construction pattern:

```typescript
const sdk = new SomeSDK({
  algorand,                              // AlgorandClient instance
  factoryParams: { appId: APP_ID },      // App ID (or resolved from env/network)
  readerAccount: readOnlyAddress,        // Optional: for read-only queries
})
```

App IDs resolve in order: explicit param > environment variable > network config.

---

## Wallet (ARC58 Abstracted Accounts)

The wallet module is the core of the SDK. ARC58 wallets are smart contract accounts with a plugin system, escrow management, and spending allowances.

### Creating Wallets

```typescript
import { newWallet, WalletFactorySDK } from '@akta/sdk/wallet'

// Recommended: newWallet helper (creates + registers in one call)
const wallet = await newWallet({
  algorand,
  factoryParams: { appId: WALLET_FACTORY_APP_ID, defaultSender: sender, defaultSigner: signer },
  sender, signer,
  nickname: 'my_wallet',
  admin: customAdmin,       // Optional: defaults to sender
  referrer: referrerAddr,   // Optional: referral tracking
})

// Or use the factory directly
const factory = new WalletFactorySDK({ factoryParams: { appId: WALLET_FACTORY_APP_ID }, algorand })
const wallet = await factory.new({ sender, signer, nickname: 'my_wallet' })
await wallet.register({ escrow: '' })

// Get an existing wallet
const existing = await factory.get({ appId: existingWalletAppId })
```

### Managing Plugins

```typescript
import { PayPluginSDK, OptInPluginSDK, AsaMintPluginSDK } from '@akta/sdk/wallet'

const payPlugin = new PayPluginSDK({ factoryParams: { appId: PAY_PLUGIN_APP_ID }, algorand })

// Calculate and fund MBR
const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) })

// Add a global plugin (anyone can use)
await wallet.addPlugin({ client: payPlugin, global: true })

// Add a caller-specific plugin with cooldown
await wallet.addPlugin({
  client: payPlugin,
  caller: userAddress,
  useRounds: true,
  methods: [{ name: payPlugin.pay(), cooldown: 100n }],
})

// Remove a plugin
await wallet.removePlugin({
  plugin: payPlugin.appId,
  caller: ALGORAND_ZERO_ADDRESS_STRING,
  escrow: '',
})
```

**Plugin options:**

| Option | Type | Description |
|--------|------|-------------|
| `client` | SDK instance | The plugin SDK to install |
| `global` | `boolean` | If true, anyone can use the plugin |
| `caller` | `string` | Specific address allowed to use (if not global) |
| `name` | `string` | Optional name for easier reference |
| `methods` | `Array` | Allowed methods with cooldowns |
| `escrow` | `string` | Escrow name for spending limits |
| `allowances` | `Array` | Spending allowances (requires escrow) |
| `useRounds` | `boolean` | Use round numbers instead of timestamps |
| `useExecutionKey` | `boolean` | Require execution keys for calls |
| `coverFees` | `boolean` | Wallet covers transaction fees |
| `cooldown` | `bigint` | Plugin-level cooldown |
| `lastValid` | `bigint` | Plugin expiration round |
| `admin` | `boolean` | Grant admin privileges |

### Using Plugins

```typescript
// ALGO payment
await wallet.usePlugin({
  global: true,
  consolidateFees: true,
  calls: [
    payPlugin.pay({
      payments: [{ receiver: recipientAddress, asset: 0n, amount: 1_000_000n }],
    }),
  ],
})

// Multiple payments in one call
await wallet.usePlugin({
  global: true,
  consolidateFees: true,
  calls: [
    payPlugin.pay({
      payments: [
        { receiver: receiver1, asset: 0n, amount: 500_000n },
        { receiver: receiver2, asset: assetId, amount: 100_000_000n },
      ],
    }),
  ],
})

// Mint an asset
await wallet.usePlugin({
  global: true,
  consolidateFees: true,
  calls: [
    asaMintPlugin.mint({
      assets: [{
        assetName: 'Token', unitName: 'TKN', total: 1_000_000_000_000n, decimals: 6n,
        manager: wallet.client.appAddress.toString(),
        reserve: wallet.client.appAddress.toString(),
        freeze: ALGORAND_ZERO_ADDRESS_STRING,
        clawback: ALGORAND_ZERO_ADDRESS_STRING,
        defaultFrozen: false, url: 'https://example.com',
      }],
    }),
  ],
})

// Opt into assets
await wallet.usePlugin({
  global: true,
  calls: [optInPlugin.optIn({ assets: [assetId] })],
})
```

### Available Wallet Plugins

| Plugin | Import | Description |
|--------|--------|-------------|
| `PayPluginSDK` | `@akta/sdk/wallet` | ALGO and ASA payments |
| `OptInPluginSDK` | `@akta/sdk/wallet` | Asset opt-ins |
| `AsaMintPluginSDK` | `@akta/sdk/wallet` | ASA creation and configuration |
| `DAOPluginSDK` | `@akta/sdk/wallet` | DAO governance operations |
| `SocialPluginSDK` | `@akta/sdk/wallet` | Social features (posts, follows, votes) |
| `StakingPluginSDK` | `@akta/sdk/wallet` | Staking operations |
| `StakingPoolPluginSDK` | `@akta/sdk/wallet` | Staking pool interactions |
| `MarketplacePluginSDK` | `@akta/sdk/wallet` | NFT marketplace operations |
| `AuctionPluginSDK` | `@akta/sdk/wallet` | Auction operations |
| `RafflePluginSDK` | `@akta/sdk/wallet` | Raffle participation |
| `PollPluginSDK` | `@akta/sdk/wallet` | Voting and polls |
| `RewardsPluginSDK` | `@akta/sdk/wallet` | Rewards distribution and claiming |
| `SubscriptionsPluginSDK` | `@akta/sdk/wallet` | Subscription management |
| `HyperSwapPluginSDK` | `@akta/sdk/wallet` | Token swaps |
| `GatePluginSDK` | `@akta/sdk/wallet` | Access control gates |
| `NFDPluginSDK` | `@akta/sdk/wallet` | NFD (NFDomains) integration |

### Escrow Management

Escrows are isolated spending pools within a wallet:

```typescript
// Create escrow by adding a plugin with an escrow name
await wallet.addPlugin({ client: asaMintPlugin, global: true, escrow: 'mint_account' })

// Query escrows
const escrows = await wallet.getEscrows()
const escrowInfo = await wallet.getEscrow('mint_account')

// Lock/unlock, opt-in, and reclaim funds
await wallet.toggleEscrowLock({ name: 'savings' })
await wallet.optinEscrow({ name: 'savings', assets: [assetId] })
await wallet.reclaimFunds({ name: 'savings', funds: [[0n, 1_000_000n, false]] })
```

### Allowances

Fine-grained spending limits for escrow-based plugins:

```typescript
import { isFlatAllowance, isWindowAllowance, isDripAllowance } from '@akta/sdk/wallet'

// Flat: one-time spending limit
await wallet.addPlugin({
  client: payPlugin, global: true, escrow: 'budget',
  allowances: [{ type: 'flat', asset: 0n, amount: 10_000_000n }],
})

// Window: resets periodically
await wallet.addPlugin({
  client: payPlugin, global: true, escrow: 'monthly',
  allowances: [{ type: 'window', asset: 0n, amount: 10_000_000n, interval: 100n, useRounds: true }],
})

// Drip: continuous accrual
await wallet.addPlugin({
  client: payPlugin, global: true, escrow: 'salary',
  allowances: [{ type: 'drip', asset: 0n, rate: 1_000_000n, interval: 10n, max: 10_000_000n, useRounds: true }],
})

// Use with funds request
await wallet.usePlugin({
  escrow: 'budget', global: true,
  calls: [payPlugin.pay({ payments: [{ receiver, amount: 5_000_000n, asset: 0n }] })],
  fundsRequest: [{ amount: 5_000_000n, asset: 0n }],
})
```

### Cost Estimation

Preview transaction costs before sending:

```typescript
const prepared = await wallet.prepare.usePlugin({
  global: true,
  calls: [payPlugin.pay({ payments: [{ receiver, amount: 1_000_000n, asset: 0n }] })],
})

console.log('Network fees:', prepared.expectedCost.networkFees)
console.log('Total cost:', prepared.expectedCost.totalAlgo)

const result = await prepared.send()
```

### Execution Keys

Pre-authorize transaction batches for future execution:

```typescript
const { lease, firstValid, lastValid, ids: groups, atcs } = await wallet.build.usePlugin({
  sender: executorAddress, signer: executorSigner,
  lease: 'my_lease', windowSize: 2000n,
  global: true,
  calls: [payPlugin.pay({ payments: [{ receiver, amount: 1_000_000n, asset: 0n }] })],
})

await wallet.addExecutionKey({ lease, groups, firstValid, lastValid })

// Third party executes later
await atcs[0].submit(algorand.client.algod)
```

### Profile and Admin

```typescript
await wallet.setNickname({ nickname: 'alice' })
await wallet.setAvatar({ avatar: avatarAssetId })
await wallet.setBanner({ banner: bannerAssetId })
await wallet.setBio({ bio: 'Hello world' })
await wallet.changeAdmin({ newAdmin: newAdminAddress })
```

---

## Social

On-chain social features including posts, votes, follows, reactions, and user profiles.

```typescript
import { SocialSDK } from '@akta/sdk/social'

const social = new SocialSDK({ factoryParams: { appId: SOCIAL_APP_ID }, algorand })

// Read state
const fees = await social.getSocialFees()
const meta = await social.getMeta(userAddress)
const post = await social.getPost(postRef)
const isFollowing = await social.isFollowing(follower, user)
const impact = await social.getUserImpact(address)
const isBanned = await social.isBanned(account)

// Write (typically called through wallet.usePlugin with SocialPluginSDK)
// Direct calls for admin operations:
await social.ban({ address: spammer })
await social.unban({ address: spammer })
await social.flagPost({ ref: postRef })
```

Social actions (post, vote, follow, react) are typically performed through the wallet's plugin system using `SocialPluginSDK`.

---

## Rewards

Create and manage reward disbursements with on-chain allocation tracking.

```typescript
import { RewardsSDK } from '@akta/sdk/rewards'

const rewards = new RewardsSDK({ factoryParams: { appId: REWARDS_APP_ID }, algorand })

// Read state
const state = await rewards.getState()
const disbursement = await rewards.getDisbursement(disbursementId)
const disbursements = await rewards.getDisbursements()
const allocation = await rewards.getUserAllocation(address, disbursementId, assetId)
const hasAlloc = await rewards.hasAllocation(address, disbursementId, assetId)

// Admin: create and manage disbursements
const id = await rewards.createDisbursement({ title: 'Q1 Rewards', note: '...' })
await rewards.createUserAllocations({ disbursementId: id, allocations: [...] })
await rewards.createAsaUserAllocations({ disbursementId: id, asset: assetId, allocations: [...] })
await rewards.finalizeDisbursement({ disbursementId: id })

// Claiming (typically done through wallet.usePlugin with RewardsPluginSDK)
```

---

## Auctions

Create and manage auctions with bidding, raffle, and prize claiming.

```typescript
import { AuctionSDK, AuctionFactorySDK } from '@akta/sdk/auction'

const factory = new AuctionFactorySDK({ factoryParams: { appId: AUCTION_FACTORY_APP_ID }, algorand })

// Create an auction
const auction = await factory.new({ ...auctionParams })

// Read state
const state = await auction.state()
const isLive = await auction.isLive()
const bid = await auction.getBid(bidId)
const minBid = await auction.getMinimumBidAmount()

// Participate (typically through wallet plugin)
await auction.bid({ amount: 5_000_000n })
await auction.claimPrize()
```

---

## DAO

Governance proposals with voting and execution.

```typescript
import { AkitaDaoSDK } from '@akta/sdk/dao'

const dao = new AkitaDaoSDK({ factoryParams: { appId: DAO_APP_ID }, algorand })

const state = await dao.getGlobalState()
const proposal = await dao.getProposal(proposalId)
const cost = await dao.proposalCost({ actions: [...] })

await dao.newProposal({ title: '...', actions: [...] })
await dao.voteProposal({ proposalId, vote: true })
await dao.finalizeProposal(proposalId)
await dao.executeProposal(proposalId)
```

---

## Staking

Asset staking with escrow-based reward tracking.

```typescript
import { StakingSDK } from '@akta/sdk/staking'
import { StakingPoolSDK, StakingPoolFactorySDK } from '@akta/sdk/staking-pool'

const staking = new StakingSDK({ factoryParams: { appId: STAKING_APP_ID }, algorand })

const check = await staking.softCheck({ address, asset: assetId })
const timeLeft = await staking.getTimeLeft({ address, asset: assetId })
const stakeInfo = await staking.getInfo({ address, stake: stakeId })
```

---

## Subscriptions

On-chain subscription services with recurring payment support.

```typescript
import { SubscriptionsSDK } from '@akta/sdk/subscriptions'

const subs = new SubscriptionsSDK({ factoryParams: { appId: SUBS_APP_ID }, algorand })

const serviceCost = await subs.newServiceCost()
const subCost = await subs.newSubscriptionCost({ asset: 0n, amount: 1_000_000n })
const isBlocked = await subs.isBlocked(address, blockedAddress)
```

---

## Other Modules

### Marketplace

NFT marketplace listings and sales.

```typescript
import { MarketplaceSDK } from '@akta/sdk/marketplace'
```

### Polls

On-chain voting polls.

```typescript
import { PollSDK, PollFactorySDK } from '@akta/sdk/poll'
```

### Raffles

Weighted raffle drawings.

```typescript
import { RaffleSDK, RaffleFactorySDK } from '@akta/sdk/raffle'
```

### Prize Boxes

Prize storage and distribution containers.

```typescript
import { PrizeBoxSDK, PrizeBoxFactorySDK } from '@akta/sdk/prize-box'
```

### Gates

Access control and token gating.

```typescript
import { GateSDK } from '@akta/sdk/gates'
```

### HyperSwap

Atomic asset swaps.

```typescript
import { HyperSwapSDK } from '@akta/sdk/hyper-swap'
```

### Meta Merkles

Merkle proof verification for airdrops and allowlists.

```typescript
import { MetaMerklesSDK } from '@akta/sdk/meta-merkles'
```

---

## Akita Connect

Protocol for cross-device agent installation and wallet connection.

```typescript
import { encodeConnectUri, decodeConnectUri } from '@akta/sdk/connect'
import type { AkitaConnectUri, AgentInstallRequest, ConnectRequest, ConnectResponse } from '@akta/sdk/connect'

// Encode a connect URI for QR codes
const uri = encodeConnectUri({ origin: 'https://signal.akita.community', requestId: 'uuid-here' })

// Decode a scanned URI
const { origin, requestId } = decodeConnectUri(uri)
```

### Agent Install Request

```typescript
const request: AgentInstallRequest = {
  type: 'agent-install',
  v: 2,
  agent: { name: 'My Agent', address: agentAddress },
  network: 'mainnet',
  escrowName: 'agent_escrow',
  newAgentAccount: true,
  plugins: [{ appId: '123', methods: ['pay'], global: true }],
  allowances: [{ asset: '0', type: 'drip', amount: '1000000', interval: '100', useRounds: true }],
}
```

---

## WalletSDK API Reference

### Core

| Method | Description |
|--------|-------------|
| `register({ escrow })` | Register wallet with escrow factory |
| `verifyAuthAddress()` | Verify wallet auth address |
| `changeAdmin({ newAdmin })` | Change wallet admin |
| `getMbr(params)` | Calculate MBR requirements |
| `getGlobalState()` | Get all global state |
| `getAdmin()` | Get admin address |
| `balance(assets)` | Get asset balances |

### Plugins

| Method | Description |
|--------|-------------|
| `addPlugin(params)` | Install a plugin |
| `usePlugin(params)` | Execute plugin operations |
| `removePlugin(params)` | Remove a plugin |
| `getPlugins()` | Get all installed plugins |
| `getPluginByKey(key)` | Get plugin by key |
| `getNamedPlugins()` | Get named plugins map |
| `canCall(params)` | Check if methods are callable |

### Escrows

| Method | Description |
|--------|-------------|
| `newEscrow({ name })` | Create new escrow |
| `getEscrows()` | Get all escrows |
| `getEscrow(name)` | Get escrow by name |
| `toggleEscrowLock({ name })` | Lock/unlock escrow |
| `optinEscrow({ name, assets })` | Opt escrow into assets |
| `reclaimFunds({ name, funds })` | Reclaim funds from escrow |

### Allowances

| Method | Description |
|--------|-------------|
| `addAllowances({ escrow, allowances })` | Add spending allowances |
| `removeAllowances({ escrow, assets })` | Remove allowances |
| `getAllowances()` | Get all allowances |
| `getAllowance(key)` | Get specific allowance |

### Profile

| Method | Description |
|--------|-------------|
| `setNickname({ nickname })` | Set wallet nickname |
| `setAvatar({ avatar })` | Set avatar asset ID |
| `setBanner({ banner })` | Set banner asset ID |
| `setBio({ bio })` | Set bio text |

### Execution Keys

| Method | Description |
|--------|-------------|
| `addExecutionKey(params)` | Register pre-authorized transactions |
| `removeExecutionKey({ lease })` | Remove execution key |
| `getExecutions()` | Get all executions |
| `getExecution(lease)` | Get execution by lease |

### Advanced

| Method | Description |
|--------|-------------|
| `prepare.usePlugin(params)` | Simulate and estimate costs |
| `build.usePlugin(params)` | Build execution groups for deferred execution |
| `group()` | Get a `WalletGroupComposer` for manual group building |

## License

MIT
