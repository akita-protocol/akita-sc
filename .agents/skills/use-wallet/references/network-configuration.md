# Network Configuration

## Default Networks

use-wallet includes pre-configured networks using Nodely's free API:

| NetworkId  | Description                        |
| ---------- | ---------------------------------- |
| `mainnet`  | Algorand MainNet                   |
| `testnet`  | Algorand TestNet                   |
| `betanet`  | Algorand BetaNet                   |
| `localnet` | Local development (localhost:4001) |

## Setting Default Network

```typescript
import { WalletManager, NetworkId } from '@txnlab/use-wallet'

const manager = new WalletManager({
  defaultNetwork: NetworkId.TESTNET,
  options: {
    resetNetwork: true, // Reset to defaultNetwork on every page load (default: false)
  },
})
```

When `resetNetwork` is `false` (default), the library restores the last active network from local storage.

## Custom Network Configuration

### Direct Configuration

For single-network apps with custom node settings:

```typescript
const manager = new WalletManager({
  wallets: [WalletId.PERA],
  networks: {
    testnet: {
      algod: {
        token: process.env.ALGOD_TOKEN || '',
        baseServer:
          process.env.ALGOD_SERVER || 'https://testnet-api.4160.nodely.dev',
        port: process.env.ALGOD_PORT || '443',
      },
    },
  },
  defaultNetwork: NetworkId.TESTNET,
})
```

### NetworkConfigBuilder

Fluent API for multi-network configuration:

```typescript
import {
  WalletManager,
  NetworkConfigBuilder,
  WalletId,
  NetworkId,
} from '@txnlab/use-wallet'

const networks = new NetworkConfigBuilder()
  .testnet({
    algod: {
      token: '',
      baseServer: 'https://testnet-api.4160.nodely.dev',
      port: '443',
    },
  })
  .mainnet({
    algod: {
      token: '',
      baseServer: 'https://mainnet-api.4160.nodely.dev',
      port: '443',
    },
  })
  .build()

const manager = new WalletManager({
  wallets: [WalletId.PERA, WalletId.DEFLY],
  networks,
  defaultNetwork: NetworkId.TESTNET,
})
```

### Custom AVM Networks (e.g., Voi)

Add non-Algorand AVM-compatible chains:

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

const manager = new WalletManager({
  wallets: [WalletId.KIBISIS],
  networks,
  defaultNetwork: 'voi-testnet',
})
```

Each network configuration accepts:

- `algod` (required): `{ token, baseServer, port?, headers? }`
- `genesisHash` (optional): Network genesis hash
- `genesisId` (optional): Network genesis ID
- `isTestnet` (optional): Boolean flag
- `caipChainId` (optional): CAIP chain identifier (for wallet compatibility)

## Switching Networks at Runtime

Use the `useNetwork` hook/composable/primitive:

### React

```tsx
import { useNetwork } from '@txnlab/use-wallet-react'

function NetworkSwitch() {
  const { activeNetwork, setActiveNetwork, networkConfig } = useNetwork()

  return (
    <select
      value={activeNetwork}
      onChange={(e) => setActiveNetwork(e.target.value)}
    >
      {Object.entries(networkConfig).map(([id]) => (
        <option key={id} value={id}>
          {id}
        </option>
      ))}
    </select>
  )
}
```

### Network Status

```tsx
const { activeNetworkConfig } = useNetwork()
const isTestnet = activeNetworkConfig.isTestnet
const genesisId = activeNetworkConfig.genesisId
```

## Runtime Node Configuration

Users can override node settings without redeploying. Added in v4.0.0.

### updateAlgodConfig

```tsx
import { useNetwork } from '@txnlab/use-wallet-react'

function NodeConfig() {
  const { updateAlgodConfig, resetNetworkConfig } = useNetwork()

  const handleNodeChange = () => {
    updateAlgodConfig('mainnet', {
      baseServer: 'https://my-private-node.com',
      port: '443',
      token: 'my-api-token',
    })
  }

  const handleReset = () => {
    resetNetworkConfig('mainnet')
  }

  return (
    <div>
      <button onClick={handleNodeChange}>Use Custom Node</button>
      <button onClick={handleReset}>Reset to Default</button>
    </div>
  )
}
```

### AlgodConfig Interface

```typescript
interface AlgodConfig {
  token: string | algosdk.AlgodTokenHeader | algosdk.CustomTokenHeader
  baseServer: string
  port?: string | number
  headers?: Record<string, string>
}
```

### Behavior

- Custom configurations persist across page reloads (stored in local storage)
- Updating the active network's config automatically creates a new Algod client
- Each network is independently configurable
- Resetting affects only the targeted network

## Wallet Network Compatibility

Not all wallets support all networks:

- **Exodus**: MainNet only
- **Defly, Pera**: MainNet and TestNet
- **Mnemonic**: Test networks only
- **Kibisis**: Supports custom AVM networks
- Custom networks may have limited wallet support
