# API Reference

## Table of Contents

- [WalletManager](#walletmanager)
- [useWallet](#usewallet)
- [useNetwork](#usenetwork)
- [WalletId Enum](#walletid-enum)
- [NetworkId Enum](#networkid-enum)
- [Key Types](#key-types)

## WalletManager

Central configuration and management class.

### Constructor

```typescript
new WalletManager(config: WalletManagerConfig)
```

```typescript
interface WalletManagerConfig {
  wallets: Array<WalletId | WalletConfigMap[keyof WalletConfigMap]>
  networks?: Record<string, NetworkConfig>
  defaultNetwork?: NetworkId | string // Default: 'testnet'
  options?: {
    resetNetwork?: boolean // Reset to defaultNetwork on page load (default: false)
    debug?: boolean // Enable debug logging
    logLevel?: string // Log level (e.g., 'INFO')
  }
}
```

### Properties

| Property                | Type                            | Description                               |
| ----------------------- | ------------------------------- | ----------------------------------------- |
| `algodClient`           | `algosdk.Algodv2`               | Algod client for active network           |
| `activeNetwork`         | `string`                        | Current network ID                        |
| `networkConfig`         | `Record<string, NetworkConfig>` | All network configs                       |
| `activeNetworkConfig`   | `NetworkConfig`                 | Active network config                     |
| `wallets`               | `Map<WalletKey, BaseWallet>`    | Initialized wallet providers              |
| `activeWallet`          | `BaseWallet \| null`            | Currently active wallet                   |
| `activeWalletAccounts`  | `WalletAccount[] \| null`       | Active wallet's accounts                  |
| `activeWalletAddresses` | `string[] \| null`              | Active wallet's addresses                 |
| `activeAccount`         | `WalletAccount \| null`         | Currently active account                  |
| `activeAddress`         | `string \| null`                | Active account address                    |
| `store`                 | `Store<State>`                  | TanStack Store instance                   |
| `isReady`               | `boolean`                       | Whether providers finished initialization |

### Methods

| Method               | Signature                                                                            | Description                |
| -------------------- | ------------------------------------------------------------------------------------ | -------------------------- |
| `getWallet`          | `(walletId: WalletId): BaseWallet \| undefined`                                      | Get wallet by ID           |
| `resumeSessions`     | `(): Promise<void>`                                                                  | Resume all wallet sessions |
| `disconnect`         | `(): Promise<void>`                                                                  | Disconnect active wallet   |
| `setActiveNetwork`   | `(networkId: NetworkId \| string): Promise<void>`                                    | Switch network             |
| `updateAlgodConfig`  | `(networkId: string, config: Partial<AlgodConfig>): void`                            | Update node config         |
| `resetNetworkConfig` | `(networkId: string): void`                                                          | Reset to initial config    |
| `signTransactions`   | `<T>(txnGroup: T \| T[], indexesToSign?: number[]): Promise<(Uint8Array \| null)[]>` | Sign transactions          |
| `transactionSigner`  | `algosdk.TransactionSigner`                                                          | ATC-compatible signer      |

### Events

```typescript
// Subscribe to state changes
const unsubscribe = manager.store.subscribe((state) => {
  console.log('State changed:', state)
})

// Unsubscribe
unsubscribe()
```

## useWallet

Reactive adapter providing wallet state and methods. Import from the framework-specific package.

### Return Values

**State:**

| Property                | Type                      | Description                     |
| ----------------------- | ------------------------- | ------------------------------- |
| `wallets`               | `Wallet[]`                | Available wallet providers      |
| `activeWallet`          | `Wallet \| null`          | Currently active wallet         |
| `activeAccount`         | `WalletAccount \| null`   | Active account                  |
| `activeAddress`         | `string \| null`          | Active account address          |
| `activeWalletAccounts`  | `WalletAccount[] \| null` | All accounts in active wallet   |
| `activeWalletAddresses` | `string[] \| null`        | All addresses in active wallet  |
| `isReady`               | `boolean`                 | Providers initialized           |
| `algodClient`           | `algosdk.Algodv2`         | Algod client for active network |

**Methods:**

| Method              | Signature                                                                            | Description                     |
| ------------------- | ------------------------------------------------------------------------------------ | ------------------------------- |
| `signTransactions`  | `<T>(txnGroup: T \| T[], indexesToSign?: number[]): Promise<(Uint8Array \| null)[]>` | Sign transactions               |
| `transactionSigner` | `algosdk.TransactionSigner`                                                          | ATC-compatible signer           |
| `signData`          | `(data: string, metadata: SignMetadata): Promise<SignDataResponse>`                  | ARC-60 data signing (Lute only) |

### Wallet Object

Each item in the `wallets` array:

```typescript
interface Wallet {
  id: WalletId
  walletKey: WalletKey
  metadata: { name: string; icon: string }
  accounts: WalletAccount[]
  activeAccount: WalletAccount | null
  isConnected: boolean
  isActive: boolean
  canSignData: boolean
  connect(args?: Record<string, any>): Promise<WalletAccount[]>
  disconnect(): Promise<void>
  setActive(): void
  setActiveAccount(address: string): void
}
```

### Framework Access Patterns

| Framework | State access                                                      | Import                      |
| --------- | ----------------------------------------------------------------- | --------------------------- |
| React     | Direct values: `activeAddress`                                    | `@txnlab/use-wallet-react`  |
| Vue       | Refs: `activeAddress.value` (script) / `activeAddress` (template) | `@txnlab/use-wallet-vue`    |
| SolidJS   | Signals: `activeAddress()`                                        | `@txnlab/use-wallet-solid`  |
| Svelte    | Store: `activeAddress.current`                                    | `@txnlab/use-wallet-svelte` |

### Error Handling

Wallet operations propagate errors to the consuming application. Wrap async operations in try/catch:

```typescript
try {
  await wallet.connect()
} catch (error) {
  console.error('Connection failed:', error)
}
```

## useNetwork

Network management hook/composable/primitive. Added in v4.0.0 (previously part of `useWallet`).

### Return Values

**State:**

| Property              | Type                            | Description           |
| --------------------- | ------------------------------- | --------------------- |
| `activeNetwork`       | `string`                        | Current network ID    |
| `networkConfig`       | `Record<string, NetworkConfig>` | All network configs   |
| `activeNetworkConfig` | `NetworkConfig`                 | Active network config |

**Methods:**

| Method               | Signature                                                 | Description             |
| -------------------- | --------------------------------------------------------- | ----------------------- |
| `setActiveNetwork`   | `(networkId: NetworkId \| string): Promise<void>`         | Switch network          |
| `updateAlgodConfig`  | `(networkId: string, config: Partial<AlgodConfig>): void` | Update node config      |
| `resetNetworkConfig` | `(networkId: string): void`                               | Reset to initial config |

### NetworkConfig

```typescript
interface NetworkConfig {
  algod: AlgodConfig
  genesisHash?: string
  genesisId?: string
  isTestnet?: boolean
  caipChainId?: string
}

interface AlgodConfig {
  token: string | algosdk.AlgodTokenHeader | algosdk.CustomTokenHeader
  baseServer: string
  port?: string | number
  headers?: Record<string, string>
}
```

## WalletId Enum

```typescript
enum WalletId {
  PERA = 'pera',
  DEFLY = 'defly',
  DEFLY_WEB = 'defly-web',
  EXODUS = 'exodus',
  KIBISIS = 'kibisis',
  LUTE = 'lute',
  WALLETCONNECT = 'walletconnect',
  MAGIC = 'magic',
  WEB3AUTH = 'web3auth',
  W3_WALLET = 'w3wallet',
  KMD = 'kmd',
  MNEMONIC = 'mnemonic',
  CUSTOM = 'custom',
  BIATEC = 'biatec', // Deprecated: use WalletConnect with 'biatec' skin
  LIQUID = 'liquid', // Experimental
}
```

## NetworkId Enum

```typescript
enum NetworkId {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  BETANET = 'betanet',
  FNET = 'fnet',
  LOCALNET = 'localnet',
}
```

## Key Types

```typescript
interface WalletAccount {
  name: string
  address: string
}

interface SignMetadata {
  scope: string
  encoding: string
}

interface SignDataResponse {
  signature: Uint8Array
  authenticatorData: Uint8Array
}
```
