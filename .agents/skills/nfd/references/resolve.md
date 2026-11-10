# Resolution & Reverse Lookup

## Setup

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
const nfd = NfdClient.testNet() // or new NfdClient() for MainNet
```

## Forward Resolution

Resolve an NFD name or app ID to get its data:

```typescript
// By name
const data = await nfd.resolve('alice.algo')

// By application ID
const data = await nfd.resolve('123456789')
const data = await nfd.resolve(123456789)

// With view option
const data = await nfd.resolve('alice.algo', { view: 'full' })
```

### ResolveOptions

```typescript
interface ResolveOptions {
  view?: 'tiny' | 'brief' | 'full' // default: 'brief'
  poll?: boolean // Return 204 instead of 404 when not found
  nocache?: boolean
}
```

### Views

- **tiny**: `name`, `owner`, `depositAccount`, `caAlgo`, `unverifiedCaAlgo`
- **brief**: Adds `appID`, `asaID`, `category`, `metaTags`, `nfdAccount`, `state`, `saleType`, `properties.userDefined`
- **full**: Adds `properties.internal`, `properties.verified`, timestamps (`timeCreated`, `timeChanged`, `timePurchased`)

### Key Properties on Resolved NFD

```typescript
const data = await nfd.resolve('alice.algo', { view: 'full' })

data.name // 'alice.algo'
data.appID // number — NFD application ID
data.asaID // number — ARC-19 NFT ASA ID
data.owner // string — owner Algorand address
data.state // 'owned' | 'forSale' | 'reserved' | 'expired' | 'minting'
data.depositAccount // string — safe address for sending assets
data.nfdAccount // string — vault address (contract-controlled)
data.category // 'curated' | 'premium' | 'common'
data.caAlgo // string[] — verified linked Algorand addresses
data.unverifiedCaAlgo // string[] — unverified linked addresses
data.metaTags // string[] — e.g. ['3_letters', 'pristine']
data.saleType // 'buyItNow' | 'auction' | undefined
data.sellAmount // number | undefined — sale price in microAlgos

// Timestamps (full view only)
data.timeCreated // string — ISO timestamp
data.timeChanged // string
data.timePurchased // string

// Properties (full view)
data.properties.userDefined // Record<string, string> — user metadata
data.properties.verified // Record<string, string> — verified properties
data.properties.internal // Record<string, string> — contract state
```

## Reverse Lookup

Find the NFD associated with an Algorand address:

```typescript
// Single address — returns primary NFD or null
const data = await nfd.resolveAddress('ALGO_ADDRESS')
if (data) {
  console.log(data.name) // e.g. 'alice.algo'
}

// Multiple addresses — returns Record<string, Nfd>
const results = await nfd.resolveAddresses([
  'ADDRESS_1',
  'ADDRESS_2',
  'ADDRESS_3',
])
// results['ADDRESS_1'] => Nfd | undefined
```

### ReverseLookupOptions

```typescript
interface ReverseLookupOptions {
  view?: 'tiny' | 'thumbnail' | 'brief' | 'full' // default: 'tiny'
  allowUnverified?: boolean // match unverified addresses (default: false)
  nocache?: boolean
}
```

By default, reverse lookup only matches **verified** addresses (`caAlgo`). Set `allowUnverified: true` to also match `unverifiedCaAlgo`.

### Batch Reverse Lookup via API

For large batches (20+ addresses), use the API client directly:

```typescript
const results = await nfd.api.reverseLookup(['ADDR_1', 'ADDR_2' /* ... */], {
  view: 'thumbnail',
  allowUnverified: false,
})
// Automatically chunks into batches of 20
```

## Complete Example

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'

async function main() {
  const nfd = NfdClient.testNet()

  // Forward resolve
  const data = await nfd.resolve('alice.algo', { view: 'brief' })
  console.log(`Name: ${data.name}`)
  console.log(`Owner: ${data.owner}`)
  console.log(`Deposit to: ${data.depositAccount}`)
  console.log(`State: ${data.state}`)
  console.log(`Verified addresses: ${data.caAlgo?.join(', ')}`)

  // Reverse lookup
  const reverseResult = await nfd.resolveAddress(data.owner)
  if (reverseResult) {
    console.log(`${data.owner} => ${reverseResult.name}`)
  }
}

main()
```
