# Purchasing (Claiming & Buying)

Purchase NFDs that are reserved for you or listed for sale on the marketplace.

## Setup

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
const nfd = NfdClient.testNet() // or new NfdClient() for MainNet
```

## Get a Purchase Quote

Check eligibility and pricing before purchasing:

```typescript
const quote = await nfd
  .setSigner(activeAddress, transactionSigner)
  .getPurchaseQuote('reserved-nfd.algo')
```

### NfdPurchaseQuote

```typescript
interface NfdPurchaseQuote {
  nfdName: string // NFD name
  buyer: string // Buyer address (from signer)
  canClaim: boolean // Reserved for this buyer
  canBuy: boolean // Listed for sale and not reserved for someone else
  price: bigint // Price in microAlgos
  state: string // NFD state
  authorized: boolean // Whether buyer is authorized
  authorizationError?: string // Reason if not authorized
  reservedFor?: string // Reserved-for address (if any)
  sellAmount?: bigint // Current sell price (if for sale)
}
```

## Claim a Reserved NFD

When an NFD is reserved for your address (e.g., someone minted it with `reservedFor`):

```typescript
const quote = await nfd
  .setSigner(activeAddress, transactionSigner)
  .getPurchaseQuote('reserved-nfd.algo')

if (quote.canClaim) {
  const claimedNfd = await nfd
    .setSigner(activeAddress, transactionSigner)
    .claim('reserved-nfd.algo')

  console.log('Claimed:', claimedNfd.name)
}
```

## Buy from the Marketplace

When an NFD is listed for sale:

```typescript
const quote = await nfd
  .setSigner(activeAddress, transactionSigner)
  .getPurchaseQuote('forsale-nfd.algo')

if (quote.canBuy) {
  const purchasedNfd = await nfd
    .setSigner(activeAddress, transactionSigner)
    .buy('forsale-nfd.algo')

  console.log('Purchased:', purchasedNfd.name)
}
```

## Finding Purchasable NFDs

### Find NFDs reserved for you

```typescript
const results = await nfd.api.search({
  reservedFor: activeAddress,
  limit: 20,
})

for (const reserved of results.nfds) {
  console.log(`${reserved.name} is reserved for you`)
}
```

### Find NFDs for sale

```typescript
const results = await nfd.searchForSale({ limit: 50 })

for (const nfdForSale of results.nfds) {
  console.log(`${nfdForSale.name} — ${nfdForSale.sellAmount} microAlgos`)
}
```

## Complete Example

```typescript
import { NfdClient, parseTransactionError } from '@txnlab/nfd-sdk'

async function purchaseNfd(
  nfdName: string,
  activeAddress: string,
  transactionSigner: TransactionSigner,
) {
  const nfd = NfdClient.testNet()

  // 1. Check eligibility
  const quote = await nfd
    .setSigner(activeAddress, transactionSigner)
    .getPurchaseQuote(nfdName)

  if (!quote.authorized) {
    console.error('Not authorized:', quote.authorizationError)
    return
  }

  try {
    if (quote.canClaim) {
      // 2a. Claim reserved NFD
      const claimed = await nfd
        .setSigner(activeAddress, transactionSigner)
        .claim(nfdName)
      console.log('Claimed:', claimed.name)
      return claimed
    }

    if (quote.canBuy) {
      // 2b. Buy from marketplace
      const purchased = await nfd
        .setSigner(activeAddress, transactionSigner)
        .buy(nfdName)
      console.log('Purchased:', purchased.name)
      return purchased
    }

    console.log('NFD is not available for purchase')
  } catch (error) {
    console.error(parseTransactionError(error))
  }
}
```

## Notes

- **Claiming** is for NFDs reserved for your address (state: `reserved`). The price is the claim amount (sell amount minus minting kickoff).
- **Buying** is for NFDs listed on the marketplace (state: `forSale`). A 5% commission is paid to TxnLab.
- When an NFD is sold or transferred, all metadata is wiped.
- The `getPurchaseQuote` method requires a signer because it needs the buyer address to check authorization.
