# Node.js Automation

Automate swaps from Node.js scripts and backend services without a wallet UI.

## Setup

```bash
npm install @txnlab/haystack-router algosdk
```

## Environment Variables

```bash
# .env
HAYSTACK_API_KEY=1b72df7e-1131-4449-8ce1-29b79dd3f51e  # Free tier (60 requests/min)
MNEMONIC=your-25-word-mnemonic
```

## Custom Signer

Node.js scripts sign transactions directly with a secret key instead of a wallet provider:

```typescript
import algosdk from 'algosdk'

function createAccountSigner(mnemonic: string) {
  const account = algosdk.mnemonicToSecretKey(mnemonic)

  const signer = async (
    txnGroup: algosdk.Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> => {
    return indexesToSign.map(
      (index) => algosdk.signTransaction(txnGroup[index], account.sk).blob,
    )
  }

  return { account, signer }
}
```

## Complete Example

```typescript
import algosdk from 'algosdk'
import { RouterClient } from '@txnlab/haystack-router'

async function main() {
  const apiKey = process.env.HAYSTACK_API_KEY!
  const mnemonic = process.env.MNEMONIC!

  // Create account and signer from mnemonic
  const account = algosdk.mnemonicToSecretKey(mnemonic)
  const address = account.addr.toString()

  const signer = async (
    txnGroup: algosdk.Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> => {
    return indexesToSign.map(
      (index) => algosdk.signTransaction(txnGroup[index], account.sk).blob,
    )
  }

  // Initialize router
  const router = new RouterClient({
    apiKey,
    autoOptIn: true,
  })

  // Get quote: 1 ALGO → USDC
  console.log('Fetching quote...')
  const quote = await router.newQuote({
    fromASAID: 0,
    toASAID: 31566704,
    amount: 1_000_000,
    address,
  })

  console.log(`Expected output: ${Number(quote.quote) / 1e6} USDC`)
  console.log(`USD value: $${quote.usdOut.toFixed(2)}`)
  console.log(
    `Route: ${Object.entries(quote.flattenedRoute)
      .map(([p, pct]) => `${p}: ${pct}%`)
      .join(', ')}`,
  )

  // Execute swap
  console.log('Executing swap...')
  const swap = await router.newSwap({
    quote,
    address,
    signer,
    slippage: 1,
  })

  const result = await swap.execute()
  console.log(`Confirmed in round ${result.confirmedRound}`)
  console.log(`Transaction IDs: ${result.txIds.join(', ')}`)

  // Get exact amounts
  const summary = swap.getSummary()
  if (summary) {
    console.log(`Input: ${summary.inputAmount} microunits`)
    console.log(`Output: ${summary.outputAmount} microunits`)
    console.log(`Fees: ${summary.totalFees} microAlgos`)
  }
}

main().catch(console.error)
```

## Batch Swaps

Execute multiple swaps sequentially:

```typescript
const pairs = [
  { from: 0, to: 31566704, amount: 1_000_000 }, // ALGO → USDC
  { from: 0, to: 31566704, amount: 2_000_000 }, // ALGO → USDC (larger)
]

for (const { from, to, amount } of pairs) {
  const quote = await router.newQuote({
    fromASAID: from,
    toASAID: to,
    amount,
    address,
  })

  const swap = await router.newSwap({
    quote,
    address,
    signer,
    slippage: 1,
  })

  const result = await swap.execute()
  console.log(`Swap confirmed in round ${result.confirmedRound}`)
}
```

## Tracking with Notes

Attach identifiers to transactions for backend tracking:

```typescript
const swap = await router.newSwap({
  quote,
  address,
  signer,
  slippage: 1,
  note: new TextEncoder().encode(
    JSON.stringify({
      orderId: 'order-123',
      timestamp: Date.now(),
    }),
  ),
})

await swap.execute()
const txId = swap.getInputTransactionId()
console.log(`Tracked: order-123 → ${txId}`)
```

## Debug Logging

Enable verbose logging for troubleshooting:

```typescript
const router = new RouterClient({
  apiKey,
  debugLevel: 'debug', // 'none' | 'info' | 'debug' | 'trace'
})
```
