# Minting

Mint new NFDs using the SDK. Minting creates a new `.algo` name on-chain.

## Setup

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
const nfd = NfdClient.testNet() // or new NfdClient() for MainNet
```

## Get a Mint Quote

Check pricing before minting:

```typescript
const quote = await nfd.getMintQuote('example.algo', {
  buyer: 'ALGO_ADDRESS',
  years: 5,
})
```

### NfdMintQuoteParams

```typescript
interface NfdMintQuoteParams {
  buyer: string // Algorand address of the buyer
  years?: number // Years until expiration (default: 1, max: 20)
}
```

### NfdMintQuote

```typescript
interface NfdMintQuote {
  nfdName: string // Validated NFD name
  buyer: string // Buyer address
  years: number // Years quoted
  isSegment: boolean // Whether this is a segment mint
  basePrice: bigint // Base price for the years (microAlgos)
  carryCost: bigint // Fixed carry cost (~5 ALGO for contract funding)
  extraFee: bigint // Additional minting fee
  totalPrice: bigint // Total cost including all fees (microAlgos)
}
```

### Display pricing

```typescript
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'

const quote = await nfd.getMintQuote('example.algo', {
  buyer: activeAddress,
  years: 5,
})

console.log(
  'Base price:',
  AlgoAmount.MicroAlgos(Number(quote.basePrice)).algos,
  'ALGO',
)
console.log(
  'Carry cost:',
  AlgoAmount.MicroAlgos(Number(quote.carryCost)).algos,
  'ALGO',
)
console.log(
  'Extra fee:',
  AlgoAmount.MicroAlgos(Number(quote.extraFee)).algos,
  'ALGO',
)
console.log(
  'Total:',
  AlgoAmount.MicroAlgos(Number(quote.totalPrice)).algos,
  'ALGO',
)
```

## Mint an NFD

```typescript
const mintedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .mint('example.algo', {
    buyer: activeAddress,
    years: 5,
  })

console.log('Minted:', mintedNfd.name)
console.log('App ID:', mintedNfd.appID)
```

### NfdMintParams

```typescript
interface NfdMintParams {
  buyer: string // Algorand address of the buyer
  years: number // 1–20 years
  reservedFor?: string // Optional: reserve for a specific address
}
```

### With reservation

Mint an NFD and reserve it for someone else to claim:

```typescript
const mintedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .mint('gift.algo', {
    buyer: activeAddress,
    years: 1,
    reservedFor: 'RECIPIENT_ADDRESS',
  })
```

The recipient can then claim it (see [purchasing.md](purchasing.md)).

## Name Validation

The SDK validates names before minting:

- Must end in `.algo`
- Alphanumeric characters only (a-z, 0-9)
- Max 27 characters per segment
- Format: `name.algo` or `segment.name.algo`

```typescript
import { isValidName, isSegmentName } from '@txnlab/nfd-sdk'

isValidName('alice.algo') // true
isValidName('sub.alice.algo') // true (segment)
isValidName('Alice.algo') // false (uppercase)
isValidName('al ice.algo') // false (space)

isSegmentName('sub.alice.algo') // true
isSegmentName('alice.algo') // false (not a segment)
```

## Pricing Reference

Root NFD prices are in USD, paid in ALGO at current exchange rate:

| Characters | Common | Premium |
| ---------- | ------ | ------- |
| 3          | $375   | —       |
| 4          | $200   | $300    |
| 5          | $125   | $187.50 |
| 6          | $75    | $112.50 |
| 7          | $50    | $100    |
| 8          | $37.50 | $75     |
| 9          | $25    | $50     |
| 10+        | $20    | $40     |

All mints include a ~5 ALGO carry cost for contract funding.

## Complete Example

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'

async function mintNfd(
  activeAddress: string,
  transactionSigner: TransactionSigner,
) {
  const nfd = NfdClient.testNet()
  const name = 'mynewname.algo'

  // 1. Get quote
  const quote = await nfd.getMintQuote(name, {
    buyer: activeAddress,
    years: 1,
  })
  console.log(
    'Total cost:',
    AlgoAmount.MicroAlgos(Number(quote.totalPrice)).algos,
    'ALGO',
  )

  // 2. Mint
  const mintedNfd = await nfd
    .setSigner(activeAddress, transactionSigner)
    .mint(quote.nfdName, {
      buyer: quote.buyer,
      years: quote.years,
    })

  console.log('Minted:', mintedNfd.name, '- App ID:', mintedNfd.appID)
  return mintedNfd
}
```
