# Quotes

## Getting a Quote

```typescript
import { RouterClient } from '@txnlab/haystack-router'

const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
})

const quote = await router.newQuote({
  fromASAID: 0, // ALGO
  toASAID: 31566704, // USDC
  amount: 1_000_000, // 1 ALGO in base units
  address: activeAddress,
})
```

## Parameters

| Parameter           | Type               | Required | Description                                     |
| ------------------- | ------------------ | -------- | ----------------------------------------------- |
| `fromASAID`         | `number \| bigint` | Yes      | Input asset ID (0 = ALGO)                       |
| `toASAID`           | `number \| bigint` | Yes      | Output asset ID                                 |
| `amount`            | `number \| bigint` | Yes      | Amount in base units                            |
| `type`              | `string`           | No       | `'fixed-input'` (default) or `'fixed-output'`   |
| `address`           | `string`           | No       | User address (needed for auto opt-in detection) |
| `maxGroupSize`      | `number`           | No       | Max transactions in group (default: 16)         |
| `maxDepth`          | `number`           | No       | Max routing hops (default: 4)                   |
| `optIn`             | `boolean`          | No       | Include opt-in transaction for output asset     |
| `disabledProtocols` | `Protocol[]`       | No       | Protocols to exclude from routing               |

## Quote Response (SwapQuote)

`newQuote()` returns a `SwapQuote` (extends `FetchQuoteResponse`):

```typescript
quote.quote // bigint — expected output amount in base units
quote.amount // bigint — original input amount
quote.usdIn // number — USD value of input
quote.usdOut // number — USD value of output
quote.userPriceImpact // number | undefined — price impact %
quote.marketPriceImpact // number | undefined — market price impact %
quote.route // Route[] — routing path details
quote.flattenedRoute // Record<string, number> — protocol split percentages
quote.quotes // DexQuote[] — individual DEX quotes
quote.requiredAppOptIns // number[] — app IDs needing opt-in
quote.createdAt // number — timestamp (ms)
quote.address // string | undefined — user address if provided
```

## Quote Types

**Fixed-input** (default): Specify exact input amount, receive variable output.

```typescript
const quote = await router.newQuote({
  fromASAID: 0,
  toASAID: 31566704,
  amount: 1_000_000, // Exact: send 1 ALGO
  type: 'fixed-input',
})
// quote.quote = expected USDC received
```

**Fixed-output**: Specify desired output, send variable input.

```typescript
const quote = await router.newQuote({
  fromASAID: 0,
  toASAID: 31566704,
  amount: 1_000_000, // Exact: receive 1 USDC
  type: 'fixed-output',
})
// quote.quote = ALGO required to send
```

## Displaying Quote Data

```typescript
const fromDecimals = 6 // ALGO
const toDecimals = 6 // USDC

const outputHuman = Number(quote.quote) / 10 ** toDecimals
const inputHuman = Number(quote.amount) / 10 ** fromDecimals
const rate = outputHuman / inputHuman

console.log(`${inputHuman} ALGO → ${outputHuman} USDC`)
console.log(`Rate: 1 ALGO = ${rate.toFixed(4)} USDC`)
console.log(`USD in: $${quote.usdIn.toFixed(2)}`)
console.log(`USD out: $${quote.usdOut.toFixed(2)}`)

if (quote.userPriceImpact !== undefined) {
  console.log(`Price impact: ${quote.userPriceImpact.toFixed(2)}%`)
}
```

## Route Details

Each quote includes routing information showing how the swap is split:

```typescript
// Flattened view: protocol → percentage
for (const [protocol, pct] of Object.entries(quote.flattenedRoute)) {
  console.log(`${protocol}: ${pct}%`)
}
// e.g., "TinymanV2: 60%", "Pact: 40%"

// Detailed route with hops
for (const route of quote.route) {
  console.log(`${route.percentage}% of swap:`)
  for (const hop of route.path) {
    console.log(`  ${hop.in.unit_name} → ${hop.out.unit_name} via ${hop.name}`)
  }
}
```

## Asset Opt-In Detection

Before quoting, check if the user needs to opt into the output asset:

```typescript
// Option 1: Set autoOptIn on the client
const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
  autoOptIn: true,
})
const quote = await router.newQuote({
  fromASAID: 0,
  toASAID: 31566704,
  amount: 1_000_000,
  address: activeAddress, // Required for auto opt-in
})

// Option 2: Check manually and pass optIn flag
const needsOptIn = await router.needsAssetOptIn(activeAddress, 31566704)
const quote = await router.newQuote({
  fromASAID: 0,
  toASAID: 31566704,
  amount: 1_000_000,
  optIn: needsOptIn,
})
```

## Lower-Level: fetchQuote()

`fetchQuote()` returns the raw `FetchQuoteResponse` without `SwapQuote` enhancements (no bigint coercion, no `createdAt`). Use `newQuote()` unless you need the raw response.

```typescript
const raw = await router.fetchQuote({
  fromASAID: 0,
  toASAID: 31566704,
  amount: 1_000_000,
})
// raw.quote is string | number (not bigint)
```
