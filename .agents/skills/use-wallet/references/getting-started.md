# Getting Started

## Installation

Requires **algosdk v3** and a bundler supporting dynamic imports (Vite, Next.js, Webpack 5+).

Install the adapter for your framework:

```bash
# React
npm install @txnlab/use-wallet-react algosdk

# Vue
npm install @txnlab/use-wallet-vue algosdk

# SolidJS
npm install @txnlab/use-wallet-solid algosdk

# Svelte
npm install @txnlab/use-wallet-svelte algosdk

# Core only (no framework)
npm install @txnlab/use-wallet algosdk
```

Then install wallet provider packages for the wallets you want to support:

| Wallet        | WalletId        | Package(s)                                                     | Config                                        |
| ------------- | --------------- | -------------------------------------------------------------- | --------------------------------------------- |
| Pera          | `PERA`          | `@perawallet/connect`                                          | Optional: `shouldShowSignTxnToast`, `chainId` |
| Defly         | `DEFLY`         | `@blockshake/defly-connect`                                    | Optional: `shouldShowSignTxnToast`, `chainId` |
| Defly Web     | `DEFLY_WEB`     | `@agoralabs-sh/avm-web-provider`                               | Beta                                          |
| Exodus        | `EXODUS`        | —                                                              | Optional: `genesisID`, `genesisHash`          |
| Kibisis       | `KIBISIS`       | `@agoralabs-sh/avm-web-provider`                               | —                                             |
| Lute          | `LUTE`          | `lute-connect`                                                 | Optional: `siteName`                          |
| WalletConnect | `WALLETCONNECT` | `@walletconnect/sign-client`, `@walletconnect/modal`           | **Required**: `projectId`                     |
| Magic         | `MAGIC`         | `magic-sdk`, `@magic-ext/algorand`                             | **Required**: `apiKey`                        |
| Web3Auth      | `WEB3AUTH`      | `@web3auth/modal`, `@web3auth/base`, `@web3auth/base-provider` | **Required**: `clientId`                      |
| W3 Wallet     | `W3_WALLET`     | —                                                              | —                                             |
| KMD           | `KMD`           | —                                                              | Dev only. Optional: wallet, token, server     |
| Mnemonic      | `MNEMONIC`      | —                                                              | Test only, never MainNet                      |
| Custom        | `CUSTOM`        | —                                                              | Implement `CustomProvider`                    |

## WalletManager Configuration

```typescript
import { WalletManager, WalletId, NetworkId } from '@txnlab/use-wallet' // or framework adapter

const manager = new WalletManager({
  // Required: array of wallet providers
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.EXODUS,
    WalletId.KIBISIS,
    WalletId.LUTE,

    // Wallets requiring options use object form:
    {
      id: WalletId.WALLETCONNECT,
      options: { projectId: 'your-reown-project-id' },
    },
  ],

  // Optional: custom network configurations
  networks: {
    /* see network-configuration.md */
  },

  // Optional: default network (defaults to 'testnet')
  defaultNetwork: NetworkId.TESTNET,

  // Optional: manager options
  options: {
    resetNetwork: false, // Reset to defaultNetwork on page load (default: false)
    debug: false, // Enable debug logging
    logLevel: 'INFO', // Log level
  },
})
```

### Wallet-Specific Configuration

```typescript
// Custom name and icon
{
  id: WalletId.PERA,
  metadata: {
    name: 'My Pera',
    icon: '/custom-icon.svg',
  },
  options: {
    shouldShowSignTxnToast: false,
  },
}

// WalletConnect with Biatec skin
{
  id: WalletId.WALLETCONNECT,
  options: {
    projectId: 'your-project-id',
    skin: 'biatec',
  },
}

// WalletConnect with Voi Wallet skin
{
  id: WalletId.WALLETCONNECT,
  options: {
    projectId: 'your-project-id',
    skin: 'voiwallet',
  },
}
```

## Default Networks

use-wallet includes pre-configured networks using Nodely's free API:

| NetworkId  | Network           |
| ---------- | ----------------- |
| `mainnet`  | Algorand MainNet  |
| `testnet`  | Algorand TestNet  |
| `betanet`  | Algorand BetaNet  |
| `localnet` | Local development |

## Webpack Fallback (Next.js)

Wallet provider packages may import Node.js modules. For webpack-based projects (Next.js), use the `webpackFallback` export:

```javascript
// next.config.mjs
import { webpackFallback } from '@txnlab/use-wallet-react'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      ...webpackFallback,
    }
    return config
  },
}

export default nextConfig
```

## Next Steps

After configuration, wrap your app with the framework-specific provider:

- **React**: `<WalletProvider manager={manager}>` — see [react.md](react.md)
- **Vue**: `app.use(WalletManagerPlugin, config)` — see [vue.md](vue.md)
- **SolidJS**: `<WalletProvider manager={manager}>` — see [solid.md](solid.md)
- **Svelte**: `useWalletContext(manager)` — see [svelte.md](svelte.md)
