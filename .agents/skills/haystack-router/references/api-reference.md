# API Reference

## Table of Contents

- [RouterClient](#routerclient)
- [SwapComposer](#swapcomposer)
- [SwapMiddleware](#swapmiddleware)
- [Types](#types)

## RouterClient

### Constructor

```typescript
new RouterClient(config: ConfigParams & { middleware?: SwapMiddleware[] })
```

**ConfigParams:**

| Property          | Type               | Default        | Description                              |
| ----------------- | ------------------ | -------------- | ---------------------------------------- |
| `apiKey`          | `string`           | —              | **Required.** API key                    |
| `apiBaseUrl`      | `string`           | SDK default    | API endpoint override                    |
| `algodUri`        | `string`           | MainNet Nodely | Algod node URI                           |
| `algodToken`      | `string`           | `''`           | Algod node token                         |
| `algodPort`       | `string \| number` | `443`          | Algod node port                          |
| `referrerAddress` | `string`           | —              | Earn 25% of swap fees                    |
| `feeBps`          | `number`           | `10`           | Fee in basis points (10–300)             |
| `autoOptIn`       | `boolean`          | `false`        | Auto-detect asset opt-in                 |
| `debugLevel`      | `string`           | `'none'`       | `'none' \| 'info' \| 'debug' \| 'trace'` |

### newQuote()

```typescript
async newQuote(params: FetchQuoteParams): Promise<SwapQuote>
```

Get an optimized swap quote with enhanced types (bigint coercion, timestamps).

### fetchQuote()

```typescript
async fetchQuote(params: FetchQuoteParams): Promise<FetchQuoteResponse>
```

Get a raw swap quote without SwapQuote enhancements.

### newSwap()

```typescript
async newSwap(config: {
  quote: SwapQuote | FetchQuoteResponse
  address: string
  signer: TransactionSigner | SignerFunction
  slippage: number
  note?: Uint8Array
}): Promise<SwapComposer>
```

Create a swap composer for building and executing the swap transaction group.

### needsAssetOptIn()

```typescript
async needsAssetOptIn(address: string, assetId: number | bigint): Promise<boolean>
```

Check if an address needs to opt into an asset. Always returns `false` for ALGO (ASA 0).

### fetchSwapTransactions()

```typescript
async fetchSwapTransactions(params: FetchSwapTxnsParams): Promise<FetchSwapTxnsResponse>
```

Low-level: fetch executable swap transactions. Typically called internally by `newSwap()`.

---

## SwapComposer

Returned by `router.newSwap()`. Builder pattern for transaction groups.

### execute()

```typescript
async execute(waitRounds?: number): Promise<{
  confirmedRound: bigint
  txIds: string[]
  methodResults: ABIResult[]
}>
```

Sign, submit, and wait for confirmation. `waitRounds` defaults to 10.

### buildGroup()

```typescript
buildGroup(): TransactionWithSigner[]
```

Finalize the transaction group and assign group IDs.

### sign()

```typescript
async sign(): Promise<Uint8Array[]>
```

Sign all transactions. Auto-adds swap transactions if not already added.

### submit()

```typescript
async submit(): Promise<string[]>
```

Sign and submit without waiting for confirmation. Returns transaction IDs.

### addTransaction()

```typescript
addTransaction(transaction: Transaction, signer?: TransactionSigner): this
```

Add a custom transaction to the group. Chainable. Must be called before `buildGroup()`.

### addMethodCall()

```typescript
addMethodCall(methodCall: MethodCall, signer?: TransactionSigner): this
```

Add an ABI method call to the group. Chainable.

### addSwapTransactions()

```typescript
async addSwapTransactions(): Promise<this>
```

Manually add swap transactions (including middleware hooks and app opt-ins). Called automatically by `execute()` if not called explicitly.

### getSummary()

```typescript
getSummary(): SwapSummary | undefined
```

Get exact swap amounts after execution. Only available after `execute()`.

### getInputTransactionId()

```typescript
getInputTransactionId(): string | undefined
```

Get the user-signed input transaction ID. Available after `buildGroup()`.

### getStatus()

```typescript
getStatus(): SwapComposerStatus
```

Returns: `BUILDING` (0) → `BUILT` (1) → `SIGNED` (2) → `SUBMITTED` (3) → `COMMITTED` (4)

### count()

```typescript
count(): number
```

Number of transactions in the group.

---

## SwapMiddleware

Interface for plugins that hook into the quote and swap lifecycle.

```typescript
interface SwapMiddleware {
  readonly name: string
  readonly version: string

  shouldApply(context: QuoteContext): Promise<boolean>
  adjustQuoteParams?(params: FetchQuoteParams): Promise<FetchQuoteParams>
  beforeSwap?(context: SwapContext): Promise<TransactionWithSigner[]>
  afterSwap?(context: SwapContext): Promise<TransactionWithSigner[]>
}
```

### Built-in: AutoOptOutMiddleware

Automatically opts out of assets when swapping full balance.

```typescript
import { AutoOptOutMiddleware } from '@txnlab/haystack-router'

const middleware = new AutoOptOutMiddleware({
  excludedAssets?: readonly (number | bigint)[]  // Assets to never auto-opt-out
})
```

### QuoteContext

```typescript
interface QuoteContext {
  fromASAID: bigint
  toASAID: bigint
  amount: bigint
  type: QuoteType
  address?: string
  algodClient: Algodv2
}
```

### SwapContext

```typescript
interface SwapContext {
  quote: SwapQuote
  address: string
  algodClient: Algodv2
  suggestedParams: SuggestedParams
  fromASAID: bigint
  toASAID: bigint
  signer: TransactionSigner
}
```

---

## Types

### FetchQuoteParams

```typescript
interface FetchQuoteParams {
  fromASAID: bigint | number
  toASAID: bigint | number
  amount: bigint | number
  type?: 'fixed-input' | 'fixed-output' // Default: 'fixed-input'
  address?: string | null
  disabledProtocols?: readonly Protocol[]
  maxGroupSize?: number // Default: 16
  maxDepth?: number // Default: 4
  optIn?: boolean
}
```

### FetchQuoteResponse

```typescript
interface FetchQuoteResponse {
  quote: string | number
  profit: Profit // { amount: number, asa: Asset }
  priceBaseline: number
  userPriceImpact?: number
  marketPriceImpact?: number
  usdIn: number
  usdOut: number
  route: Route[]
  flattenedRoute: Record<string, number>
  quotes: DexQuote[]
  requiredAppOptIns: number[]
  txnPayload: TxnPayload | null
  protocolFees: Record<string, number>
  fromASAID: number
  toASAID: number
  type: string
}
```

### SwapQuote

```typescript
type SwapQuote = FetchQuoteResponse & {
  quote: bigint // Coerced to bigint
  amount: bigint // Original request amount
  address?: string
  createdAt: number // Timestamp (ms)
}
```

### SwapSummary

```typescript
interface SwapSummary {
  inputAssetId: bigint
  outputAssetId: bigint
  inputAmount: bigint
  outputAmount: bigint
  type: QuoteType
  totalFees: bigint // microAlgos
  transactionCount: number
  inputTxnId: string
  outputTxnId: string
  inputSender: string
  outputSender: string
}
```

### SwapTransaction

```typescript
interface SwapTransaction {
  data: string // Base64-encoded transaction
  group: string // Group ID
  logicSigBlob: unknown | false
  signature: Signature | false
}
```

### SignerFunction

```typescript
type SignerFunction = (
  txnGroup: Transaction[],
  indexesToSign: number[],
) => Promise<(Uint8Array | null)[]>
```

Supports two return patterns:

- `Uint8Array[]` matching `indexesToSign` length (Pera/Defly)
- `(Uint8Array | null)[]` matching full group length (Lute/ARC-1)

### Route and PathElement

```typescript
interface Route {
  percentage: number
  path: PathElement[]
}

interface PathElement {
  name: string // Protocol name + fee tier
  class: string[][]
  in: Asset
  out: Asset
}
```

### Asset

```typescript
interface Asset {
  id: number
  decimals: number
  unit_name: string
  name: string
  price_algo: number
  price_usd: number
}
```

### Protocol

```typescript
enum Protocol {
  TinymanV2 = 'TinymanV2'
  Algofi = 'Algofi'
  Algomint = 'Algomint'
  Pact = 'Pact'
  Folks = 'Folks'
  TAlgo = 'TAlgo'
}
```

### Constants

```typescript
const DEFAULT_FEE_BPS = 10 // 0.10%
const MAX_FEE_BPS = 300 // 3.00%
const DEFAULT_MAX_GROUP_SIZE = 16
const DEFAULT_MAX_DEPTH = 4
const DEFAULT_AUTO_OPT_IN = false
const DEFAULT_CONFIRMATION_ROUNDS = 10
```
