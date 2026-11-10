# Configuration

## API Key Tiers

| Tier           | Key                                    | Rate Limit      | Use Case                                      |
| -------------- | -------------------------------------- | --------------- | --------------------------------------------- |
| **Free**       | `1b72df7e-1131-4449-8ce1-29b79dd3f51e` | 60 requests/min | Development, testing, low-volume integrations |
| **Production** | Request from support@txnlab.dev        | Higher limits   | Production applications                       |

The free tier key requires no registration and works immediately. The rate limit applies to all API calls (both `fetchQuote` and `fetchExecuteSwapTxns`), not just quotes.

For production integrations with higher rate limits, contact support@txnlab.dev for a dedicated key.

## RouterClient Options

```typescript
import { RouterClient } from '@txnlab/haystack-router'

const router = new RouterClient({
  // Required
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)

  // Optional
  apiBaseUrl: undefined, // Override API endpoint (SDK manages defaults)
  algodUri: undefined, // Algod node URI (default: MainNet via Nodely)
  algodToken: undefined, // Algod node token
  algodPort: undefined, // Algod node port (default: 443)
  referrerAddress: undefined, // Earn 25% of swap fees
  feeBps: undefined, // Fee in basis points (default: 10, max: 300)
  autoOptIn: false, // Auto-detect asset opt-in needs
  debugLevel: 'none', // Logging: 'none' | 'info' | 'debug' | 'trace'
  middleware: [], // SwapMiddleware plugins
})
```

## Network Configuration

### MainNet (Default)

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e',
})
```

Uses default Nodely MainNet algod endpoint.

### TestNet

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  algodUri: 'https://testnet-api.4160.nodely.dev/',
})
```

### Custom Algod Node

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  algodUri: 'http://localhost:4001',
  algodToken:
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  algodPort: 4001,
})
```

## Slippage

Slippage is a percentage tolerance on the output amount. Set per-swap, not on the client.

```typescript
const swap = await router.newSwap({
  quote,
  address,
  signer,
  slippage: 1, // 1% — receive at least 99% of quoted output
})
```

**Recommendations:**

- **Stable pairs** (ALGO/USDC): 0.5–1%
- **Volatile pairs**: 1–3%
- **Low liquidity**: 3–5%

Slippage is verified on the **final output** of the swap, not on individual hops. This means intermediate steps can have higher variance as long as the final result is within tolerance.

## Fee Configuration

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  feeBps: 15, // 0.15% output fee
})
```

- **Default**: 10 bps (0.10%)
- **Range**: 10–300 bps (0.10%–3.00%)
- Fee is applied to the **output amount**
- Additional network transaction fees apply (paid by swapper)

## Referrer Address

Earn 25% of swap fees by setting a referrer address:

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  referrerAddress: 'YOUR_ALGORAND_ADDRESS',
})
```

See [fees-and-referrals.md](fees-and-referrals.md) for details on the referral program.

## Auto Opt-In

When `autoOptIn: true`, the SDK automatically checks if the user needs to opt into the output asset and includes the opt-in transaction in the swap group.

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  autoOptIn: true,
})

// Address is required for auto opt-in detection
const quote = await router.newQuote({
  fromASAID: 0,
  toASAID: 31566704,
  amount: 1_000_000,
  address: activeAddress,
})
```

## Middleware

Plugins that hook into the quote and swap lifecycle:

```typescript
import { RouterClient, AutoOptOutMiddleware } from '@txnlab/haystack-router'

// Built-in: auto opt-out when swapping full balance
const autoOptOut = new AutoOptOutMiddleware({
  excludedAssets: [31566704], // Never auto-opt-out of USDC
})

const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  middleware: [autoOptOut],
})
```

See [api-reference.md](api-reference.md) for the `SwapMiddleware` interface.

## Debug Logging

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  debugLevel: 'info',
})
```

| Level   | Output                                                             |
| ------- | ------------------------------------------------------------------ |
| `none`  | No logging (default)                                               |
| `info`  | High-level operations (quote fetched, swap submitted)              |
| `debug` | Detailed flow (middleware applied, validation, status transitions) |
| `trace` | Everything including request/response payloads                     |

## Finding ASA IDs

Common Algorand Standard Asset IDs:

| Asset | ASA ID    |
| ----- | --------- |
| ALGO  | 0         |
| USDC  | 31566704  |
| USDt  | 312769    |
| goBTC | 386192725 |
| goETH | 386195940 |

Look up ASA IDs on [Allo.info](https://allo.info) or [Pera Explorer](https://explorer.perawallet.app/).
