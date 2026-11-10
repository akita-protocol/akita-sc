# Segments (Subdomains)

Segments are sovereign NFDs minted from a root NFD, forming a subdomain hierarchy (e.g., `sub.root.algo`).

## Concepts

- A **root NFD** is a standard `.algo` name like `root.algo`
- A **segment** is `sub.root.algo` — a separate NFD minted from the root
- Segments are fully independent NFDs with their own metadata, linked addresses, and vault
- Segments **cannot** mint further segments (one level only)
- A root can have unlimited segments

### Locking

Root NFDs control who can mint segments:

- **Locked** (default): Only the root owner can mint segments
- **Unlocked**: Anyone can mint segments (root owner sets the price)

## SDK Utilities

```typescript
import {
  isValidName,
  isSegmentName,
  extractParentName,
  getNfdBasename,
  isSegmentMintingUnlocked,
  canMintSegment,
} from '@txnlab/nfd-sdk'

// Name validation
isValidName('sub.root.algo') // true
isSegmentName('sub.root.algo') // true
isSegmentName('root.algo') // false (not a segment)

// Name parsing
extractParentName('sub.root.algo') // 'root.algo'
getNfdBasename('sub.root.algo') // 'root'
getNfdBasename('root.algo') // 'root'

// Segment minting permissions
const rootNfd = await nfd.resolve('root.algo', { view: 'full' })
isSegmentMintingUnlocked(rootNfd) // true if anyone can mint segments
canMintSegment(rootNfd, callerAddress) // true if caller can mint (owner always can)
```

## Minting Segments

Segment minting uses the same `mint()` method. The SDK detects segment names automatically:

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'

const nfd = NfdClient.testNet()

// Check if segment minting is allowed
const rootNfd = await nfd.resolve('root.algo', { view: 'full' })

// Get quote (isSegment will be true)
const quote = await nfd.getMintQuote('sub.root.algo', {
  buyer: activeAddress,
  years: 1,
})
console.log('Is segment:', quote.isSegment) // true

// Mint the segment
const segment = await nfd
  .setSigner(activeAddress, transactionSigner)
  .mint('sub.root.algo', {
    buyer: activeAddress,
    years: 1,
  })

console.log('Minted segment:', segment.name)
```

The SDK validates:

- The parent root NFD exists
- The caller has permission to mint (owner, or anyone if unlocked)
- The segment name is valid

## Searching for Segments

Find all segments of a root NFD:

```typescript
const root = await nfd.resolve('root.algo')
const segments = await nfd.api.search({
  parentAppId: root.appID,
  limit: 200,
})

for (const segment of segments.nfds) {
  console.log(segment.name) // e.g., 'sub1.root.algo', 'sub2.root.algo'
}
```

Filter search to only roots or only segments:

```typescript
// Only root NFDs (no segments)
const roots = await nfd.api.search({
  segmentRoot: true,
  state: ['owned'],
  limit: 50,
})

// Only segments
const segments = await nfd.api.search({
  segmentRoot: false,
  state: ['owned'],
  limit: 50,
})

// Roots with unlocked segment minting
const unlocked = await nfd.api.search({
  segmentRoot: true,
  segmentLocked: false,
  limit: 50,
})
```

## Segment Pricing

Segment costs include:

| Component          | Description                                     |
| ------------------ | ----------------------------------------------- |
| Platform fee       | $4 or 25% of sale price (whichever is greater)  |
| Carry cost         | ~2.5 ALGO (paid by minter for contract funding) |
| Root owner premium | Set by root owner for unlocked segments         |

Self-minted segments (by root owner) get volume discounts:

| Segments Minted | Discount    |
| --------------- | ----------- |
| 0–9             | None ($4)   |
| 10+             | 20% ($3.20) |
| 100+            | 30% ($2.80) |
| 1,000+          | 40% ($2.40) |
| 10,000+         | 50% ($2.00) |

## Notes

- Segments are fully sovereign — the root owner has no control over segments minted by others
- Root owner can always mint segments regardless of lock status
- When a root NFD is sold, its segments are unaffected (they remain owned by their respective owners)
- Segments have the same capabilities as root NFDs: metadata, linked addresses, vaults
- 5% resale commission applies to segment secondary sales
