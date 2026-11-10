# Search

Search uses the REST API under the hood via `nfd.api.search()`. This is expected — search requires off-chain indexing.

## Setup

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
const nfd = NfdClient.testNet() // or new NfdClient() for MainNet
```

## Basic Search

```typescript
// Search by substring (min 3 characters)
const results = await nfd.api.search({ substring: 'alice', limit: 10 })

console.log(results.total) // Total matching count
console.log(results.nfds) // Nfd[] — array of results
```

## SearchOptions

```typescript
interface SearchOptions {
  // Name filters
  name?: string               // Partial name match
  prefix?: string             // Name prefix match
  substring?: string          // Substring match (min 3 chars)

  // Category & state
  category?: Array<'curated' | 'premium' | 'common'>
  state?: Array<'reserved' | 'forSale' | 'owned' | 'expired'>
  saleType?: Array<'auction' | 'buyItNow'>

  // Owner filters
  owner?: string              // Filter by owner address
  reservedFor?: string        // Filter by reserved-for address

  // Segment filters
  parentAppId?: number        // Find segments of a specific parent
  segmentLocked?: boolean     // Filter by segment lock status
  segmentRoot?: boolean       // true = roots only, false = segments only

  // Property filters
  length?: Array<'1_letters' | '2_letters' | ... | '10+_letters'>
  traits?: Array<'emoji' | 'pristine' | 'segment'>

  // Verified property search
  verifiedProperty?: string   // e.g., 'twitter', 'discord', 'github', 'email', 'domain'
  verifiedValue?: string      // Value to match

  // Price filters (microAlgos)
  minPrice?: number
  maxPrice?: number
  minPriceUsd?: number        // USD cents
  maxPriceUsd?: number

  // Time filters
  changedAfter?: string       // ISO timestamp
  expiresBefore?: string      // ISO timestamp

  // Pagination & sorting
  limit?: number              // default: 100, max: 200
  offset?: number             // default: 0
  sort?: 'createdDesc' | 'timeChangedDesc' | 'soldDesc' | 'priceAsc' | 'priceDesc'
       | 'highestSaleDesc' | 'saleTypeAsc' | 'nameAsc' | 'expiresAsc' | 'expiresDesc'

  // View
  view?: 'tiny' | 'thumbnail' | 'brief' | 'full'  // default: 'brief'
  nocache?: boolean

  // Other
  excludeUserReserved?: boolean
}
```

## SearchResponse

```typescript
interface SearchResponse {
  total: number // Total matching results
  nfds: Nfd[] // Results for current page
}
```

## Convenience Methods

The client provides shortcut methods for common search patterns:

```typescript
// NFDs owned by an address
const owned = await nfd.searchByOwner('ALGO_ADDRESS')
// Equivalent to: nfd.api.search({ owner: 'ALGO_ADDRESS', state: ['owned'], limit: 20 })

// NFDs currently for sale
const forSale = await nfd.searchForSale({ limit: 50 })
// Equivalent to: nfd.api.search({ state: ['forSale'], limit: 50 })
```

## Examples

### Search with multiple filters

```typescript
const results = await nfd.api.search({
  category: ['premium'],
  state: ['owned'],
  limit: 20,
  offset: 0,
})
```

### Search for NFDs for sale in a price range

```typescript
const results = await nfd.api.search({
  state: ['forSale'],
  saleType: ['buyItNow'],
  minPrice: 1_000_000, // 1 ALGO in microAlgos
  maxPrice: 10_000_000, // 10 ALGO
  sort: 'priceAsc',
  limit: 50,
})
```

### Search by verified Twitter handle

```typescript
const results = await nfd.api.search({
  verifiedProperty: 'twitter',
  verifiedValue: 'algoraborobudur',
  limit: 1,
})
```

### Search segments of a root NFD

```typescript
const root = await nfd.resolve('root.algo')
const segments = await nfd.api.search({
  parentAppId: root.appID,
  limit: 100,
})
```

### Paginate through all results

```typescript
let offset = 0
const limit = 200
let allNfds: Nfd[] = []

while (true) {
  const results = await nfd.api.search({
    state: ['owned'],
    limit,
    offset,
  })
  allNfds.push(...results.nfds)
  if (results.nfds.length < limit) break
  offset += limit
}
```

### Interactive name search (autocomplete)

```typescript
const results = await nfd.api.search({
  prefix: 'ali',
  view: 'thumbnail',
  limit: 10,
})
// Returns names starting with 'ali' with avatar info
```

## NfdApiClient Direct Usage

You can also instantiate the API client independently:

```typescript
import { NfdApiClient } from '@txnlab/nfd-sdk'

const api = NfdApiClient.testNet()
const results = await api.search({ substring: 'alice', limit: 10 })
```
