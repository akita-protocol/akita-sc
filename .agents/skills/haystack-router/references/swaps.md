# Swaps

## Executing a Swap

```typescript
import { RouterClient } from '@txnlab/haystack-router'

const router = new RouterClient({
  apiKey: '1b72df7e-1131-4449-8ce1-29b79dd3f51e', // Free tier (60 requests/min)
})

// 1. Get a quote
const quote = await router.newQuote({
  fromASAID: 0,
  toASAID: 31566704,
  amount: 1_000_000,
  address: activeAddress,
})

// 2. Create and execute swap
const swap = await router.newSwap({
  quote,
  address: activeAddress,
  signer: transactionSigner,
  slippage: 1, // 1%
})

const result = await swap.execute()
console.log(`Confirmed in round ${result.confirmedRound}`)
```

## newSwap() Parameters

| Parameter  | Type                                  | Required | Description                               |
| ---------- | ------------------------------------- | -------- | ----------------------------------------- |
| `quote`    | `SwapQuote \| FetchQuoteResponse`     | Yes      | Quote from `newQuote()` or `fetchQuote()` |
| `address`  | `string`                              | Yes      | Signer's Algorand address                 |
| `signer`   | `TransactionSigner \| SignerFunction` | Yes      | Transaction signing function              |
| `slippage` | `number`                              | Yes      | Slippage tolerance (e.g., `1` = 1%)       |
| `note`     | `Uint8Array`                          | No       | Note attached to input transaction        |

## Signer Patterns

### Browser: use-wallet

```typescript
import { useWallet } from '@txnlab/use-wallet-react'

const { activeAddress, transactionSigner } = useWallet()

const swap = await router.newSwap({
  quote,
  address: activeAddress,
  signer: transactionSigner,
  slippage: 1,
})
```

### Node.js: Custom Signer

```typescript
import algosdk from 'algosdk'

const account = algosdk.mnemonicToSecretKey(mnemonic)

const signer = async (
  txnGroup: algosdk.Transaction[],
  indexesToSign: number[],
): Promise<Uint8Array[]> => {
  return indexesToSign.map(
    (index) => algosdk.signTransaction(txnGroup[index], account.sk).blob,
  )
}

const swap = await router.newSwap({
  quote,
  address: account.addr.toString(),
  signer,
  slippage: 1,
})
```

The SDK supports two signer return patterns:

- **Pera/Defly style**: Returns `Uint8Array[]` matching `indexesToSign` length
- **Lute/ARC-1 style**: Returns `(Uint8Array | null)[]` matching full group length, `null` for unsigned

Both are detected and handled automatically.

## Execution Result

```typescript
const result = await swap.execute()

result.confirmedRound // bigint — block where swap confirmed
result.txIds // string[] — all transaction IDs
result.methodResults // ABIResult[] — ABI method call results
```

## Swap Summary

After execution, get exact amounts (may differ from quote due to slippage):

```typescript
const result = await swap.execute()
const summary = swap.getSummary()

if (summary) {
  summary.inputAssetId // bigint
  summary.outputAssetId // bigint
  summary.inputAmount // bigint — exact input sent
  summary.outputAmount // bigint — exact output received
  summary.totalFees // bigint — total ALGO fees (microAlgos)
  summary.transactionCount // number
  summary.inputTxnId // string — user-signed input txn ID
  summary.outputTxnId // string — app call containing output
}
```

## Tracking Transactions

Attach a note to the input transaction for tracking:

```typescript
const swap = await router.newSwap({
  quote,
  address: activeAddress,
  signer: transactionSigner,
  slippage: 1,
  note: new TextEncoder().encode('order-123'),
})

await swap.execute()
const inputTxId = swap.getInputTransactionId()
```

## Advanced: Custom Transaction Composition

Add custom transactions before/after the swap in the same atomic group:

```typescript
const swap = await router.newSwap({
  quote,
  address: activeAddress,
  signer: transactionSigner,
  slippage: 1,
})

const result = await swap
  .addTransaction(customTxn) // Add before swap
  .addSwapTransactions() // Add swap txns + middleware
  .addMethodCall(abiCall) // Add ABI call after swap
  .execute()
```

Constraints:

- Max 16 transactions per group
- Non-composable swaps (Tinyman v1) cannot add custom transactions
- Call `addSwapTransactions()` to manually control ordering

## Advanced: Step-by-Step Execution

For more control over the signing and submission flow:

```typescript
const swap = await router.newSwap({ quote, address, signer, slippage: 1 })

// Build (assigns group IDs)
const txnsWithSigners = swap.buildGroup()

// Sign
const signedTxns = await swap.sign()

// Submit (doesn't wait)
const txIds = await swap.submit()

// Check status
swap.getStatus() // BUILDING → BUILT → SIGNED → SUBMITTED → COMMITTED
```

## Error Handling

```typescript
try {
  const swap = await router.newSwap({ quote, address, signer, slippage: 1 })
  const result = await swap.execute()
} catch (error) {
  // Common errors:
  // - Slippage exceeded (price moved beyond tolerance)
  // - Insufficient balance
  // - Asset not opted in
  // - Transaction rejected by user
  // - Network timeout
  console.error('Swap failed:', error)
}
```

Quotes are time-sensitive. If a quote is stale (prices moved significantly), refetch before executing.
