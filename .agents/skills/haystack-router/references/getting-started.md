# Getting Started

## Prerequisites

- **Node.js** >= 20
- **algosdk** 3.x (peer dependency)

## Installation

```bash
npm install @txnlab/haystack-router algosdk
```

## RouterClient Initialization

```typescript
import { RouterClient } from '@txnlab/haystack-router'

const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
})
```

### With Options

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  autoOptIn: true, // Auto-detect asset opt-in needs
  referrerAddress: 'ABC...', // Earn 25% of swap fees
  feeBps: 15, // Fee in basis points (default: 10)
  debugLevel: 'info', // 'none' | 'info' | 'debug' | 'trace'
})
```

### TestNet

Override the algod connection and API base URL for TestNet:

```typescript
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  algodUri: 'https://testnet-api.4160.nodely.dev/',
  // Set apiBaseUrl if using a TestNet-specific API endpoint
})
```

## Quick Start

```typescript
import { RouterClient } from '@txnlab/haystack-router'

const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
})

// Get a quote: swap 1 ALGO → USDC
const quote = await router.newQuote({
  fromASAID: 0, // ALGO
  toASAID: 31566704, // USDC
  amount: 1_000_000, // 1 ALGO in microAlgos
  address: activeAddress,
})

console.log(`Expected output: ${quote.quote} microUSDC`)
console.log(`USD value: $${quote.usdOut}`)

// Execute the swap
const swap = await router.newSwap({
  quote,
  address: activeAddress,
  signer: transactionSigner, // From use-wallet or custom signer
  slippage: 1, // 1% slippage tolerance
})

const result = await swap.execute()
console.log(`Confirmed in round ${result.confirmedRound}`)
```

## Amounts and Units

All amounts are in **base units** (smallest denomination):

| Asset               | Decimals | 1 unit in base | Example              |
| ------------------- | -------- | -------------- | -------------------- |
| ALGO (ASA 0)        | 6        | 1,000,000      | `1_000_000` = 1 ALGO |
| USDC (ASA 31566704) | 6        | 1,000,000      | `5_000_000` = 5 USDC |

Convert human-readable amounts:

```typescript
const amount = BigInt(Math.floor(parseFloat(userInput) * 10 ** decimals))
```
