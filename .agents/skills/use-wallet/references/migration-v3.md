# Migrating from v3.x to v4.0.0

Three main areas of change: dependency updates, algosdk v3 migration, and network configuration restructuring.

## 1. Dependency Updates

Update your framework adapter and algosdk:

```bash
# React
npm install @txnlab/use-wallet-react@latest algosdk@latest

# Vue
npm install @txnlab/use-wallet-vue@latest algosdk@latest

# SolidJS
npm install @txnlab/use-wallet-solid@latest algosdk@latest

# Svelte
npm install @txnlab/use-wallet-svelte@latest algosdk@latest
```

## 2. algosdk v3 Migration

v4 requires algosdk v3. The extent of changes depends on how your application uses the SDK. See the [official algosdk v3 migration guide](https://github.com/algorand/js-algorand-sdk/blob/develop/v2_TO_v3_MIGRATION_GUIDE.md) for details.

Key algosdk v3 changes:

- `algosdk.encodeAddress` / `algosdk.decodeAddress` replaced by `algosdk.Address` class
- Transaction construction API changes
- `waitForConfirmation` import changes

## 3. Network Configuration Changes

### Single Network Setup

**v3.x:**

```typescript
const manager = new WalletManager({
  wallets: [...],
  network: NetworkId.TESTNET,
  algod: {
    token: '',
    baseServer: 'https://testnet-api.algonode.cloud',
    port: '443',
  },
})
```

**v4.x:**

```typescript
const manager = new WalletManager({
  wallets: [...],
  defaultNetwork: NetworkId.TESTNET,
  networks: {
    testnet: {
      algod: {
        token: '',
        baseServer: 'https://testnet-api.4160.nodely.dev',
        port: '443',
      },
    },
  },
})
```

### Multiple Networks

**v3.x:**

```typescript
const manager = new WalletManager({
  wallets: [...],
  network: NetworkId.TESTNET,
  algod: {
    [NetworkId.TESTNET]: { token: '', baseServer: '...', port: '443' },
    [NetworkId.MAINNET]: { token: '', baseServer: '...', port: '443' },
  },
})
```

**v4.x (using NetworkConfigBuilder):**

```typescript
import { NetworkConfigBuilder } from '@txnlab/use-wallet'

const networks = new NetworkConfigBuilder()
  .testnet({
    algod: { token: '', baseServer: 'https://testnet-api.4160.nodely.dev', port: '443' },
  })
  .mainnet({
    algod: { token: '', baseServer: 'https://mainnet-api.4160.nodely.dev', port: '443' },
  })
  .build()

const manager = new WalletManager({
  wallets: [...],
  networks,
  defaultNetwork: NetworkId.TESTNET,
})
```

### Custom Networks

**v4.x only** — use `NetworkConfigBuilder.addNetwork()` for AVM-compatible chains:

```typescript
const networks = new NetworkConfigBuilder()
  .addNetwork('voi-testnet', {
    algod: {
      token: '',
      baseServer: 'https://testnet-api.voi.nodely.dev',
      port: '443',
    },
    genesisHash: 'IXnoWtviVVJW5LGivNFc0Dq14V3kqaXuK2u5OQrdVZo=',
    genesisId: 'voitest-v1',
    caipChainId: 'algorand:IXnoWtviVVJW5LGivNFc0Dq14V3k',
    isTestnet: true,
  })
  .build()
```

## 4. useNetwork Extraction

In v4.0.0, network-related features moved from `useWallet` to a dedicated `useNetwork` hook/composable/primitive.

**v3.x:**

```typescript
const { activeNetwork, setActiveNetwork } = useWallet()
```

**v4.x:**

```typescript
const {
  activeNetwork,
  setActiveNetwork,
  networkConfig,
  activeNetworkConfig,
  updateAlgodConfig,
  resetNetworkConfig,
} = useNetwork()
```

New capabilities in `useNetwork`:

- `networkConfig` — access all network configurations
- `activeNetworkConfig` — access active network metadata (isTestnet, genesisId)
- `updateAlgodConfig` — runtime node configuration changes
- `resetNetworkConfig` — reset a network to initial settings

## 5. Import Changes

Framework adapter packages re-export everything from the core package:

```typescript
// v3.x — might have imported from core separately
import { WalletManager } from '@txnlab/use-wallet'
import { useWallet } from '@txnlab/use-wallet-react'

// v4.x — import everything from framework adapter
import {
  WalletManager,
  WalletId,
  NetworkId,
  useWallet,
  useNetwork,
} from '@txnlab/use-wallet-react'
```

## Migration Checklist

1. Update `@txnlab/use-wallet-*` to v4.x and `algosdk` to v3.x
2. Replace `network` + `algod` config with `defaultNetwork` + `networks`
3. Move `activeNetwork` / `setActiveNetwork` from `useWallet` to `useNetwork`
4. Update algosdk API calls per the SDK migration guide
5. Update wallet provider packages to latest compatible versions
6. Test all wallet connections and transaction signing flows
