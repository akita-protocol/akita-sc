# Integration Patterns

Patterns for integrating NFD into applications — replacing addresses with human-readable names, displaying avatars, and handling address resolution.

## Setup

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
const nfd = NfdClient.mainNet() // or NfdClient.testNet()
```

## Replace Addresses with Names

Use reverse lookup to display NFD names instead of raw Algorand addresses:

```typescript
const result = await nfd.resolveAddress('ALGO_ADDRESS')
const displayName = result ? result.name : truncateAddress(address)
```

### Batch Reverse Lookup

For lists of addresses (e.g., transaction history, leaderboard):

```typescript
const addresses = ['ADDR_1', 'ADDR_2', 'ADDR_3' /* ... */]

// resolveAddresses handles batching internally
const results = await nfd.resolveAddresses(addresses, {
  view: 'tiny',
  allowUnverified: false,
})

// Map addresses to display names
const displayNames = addresses.map((addr) => {
  const nfdData = results[addr]
  return nfdData ? nfdData.name : truncateAddress(addr)
})
```

For 20+ addresses, use the API client which handles chunking automatically:

```typescript
const results = await nfd.api.reverseLookup(addresses, {
  view: 'thumbnail', // includes avatar info
  allowUnverified: false,
})
```

## Display NFD Avatars

```typescript
const avatar = await nfd.getAvatarImage('alice.algo')

// avatar.url is always provided (fallback if none set)
// avatar.verified indicates if from verified NFT properties
// avatar.isFallback indicates if using default image
```

### Avatar with Reverse Lookup

Show avatar + name for an address:

```typescript
async function resolveDisplay(address: string) {
  const result = await nfd.resolveAddress(address, { view: 'brief' })
  if (!result) return { name: truncateAddress(address), avatarUrl: null }

  const avatar = await nfd.getAvatarImage(result)
  return { name: result.name, avatarUrl: avatar.url }
}
```

## Safe Asset Sending

Use `depositAccount` — it resolves the best address to send assets to:

```typescript
const data = await nfd.resolve('alice.algo')

// IMPORTANT: Check state first
if (data.state !== 'owned') {
  throw new Error('NFD is not active — do not send assets')
}

const sendTo = data.depositAccount
// depositAccount priority: caAlgo[0] → unverifiedCaAlgo[0] → owner
```

### Verified vs Unverified Addresses

Understanding the trust levels:

```typescript
const data = await nfd.resolve('alice.algo', { view: 'full' })

// Verified addresses (caAlgo) — cryptographically proven ownership
// The owner signed a transaction proving they control these addresses
data.caAlgo // string[]

// Unverified addresses (unverifiedCaAlgo) — owner-entered, not proven
// Useful for custodial wallets or smart contracts
data.unverifiedCaAlgo // string[]

// depositAccount combines the logic:
// 1. caAlgo[0] if any verified addresses exist
// 2. unverifiedCaAlgo[0] if any unverified addresses exist
// 3. owner address as fallback
data.depositAccount // string
```

**For high-value transfers**, prefer `caAlgo[0]` (verified) over `unverifiedCaAlgo[0]`.

## Interactive Name Search (Autocomplete)

Build a "send to NFD" input with autocomplete:

```typescript
async function searchNfds(prefix: string) {
  if (prefix.length < 2) return []

  const results = await nfd.api.search({
    prefix,
    view: 'thumbnail', // includes avatar
    limit: 10,
  })

  return results.nfds.map((nfdData) => ({
    name: nfdData.name,
    depositAccount: nfdData.depositAccount,
    avatar:
      nfdData.properties?.verified?.avatar ||
      nfdData.properties?.userDefined?.avatar ||
      null,
  }))
}
```

## Fetch All NFDs Owned by an Address

```typescript
async function getAllOwnedNfds(address: string) {
  const allNfds: Nfd[] = []
  let offset = 0
  const limit = 200

  while (true) {
    const results = await nfd.api.search({
      owner: address,
      state: ['owned'],
      limit,
      offset,
    })
    allNfds.push(...results.nfds)
    if (results.nfds.length < limit) break
    offset += limit
  }

  return allNfds
}
```

## Discord / Telegram Bot Integration

Look up NFDs by verified social handle:

```typescript
// Find NFD by Discord user ID (snowflake)
const results = await nfd.api.search({
  verifiedProperty: 'discord',
  verifiedValue: '123456789012345678',
  limit: 1,
})

if (results.nfds.length > 0) {
  const nfdData = results.nfds[0]
  console.log(`Discord user owns: ${nfdData.name}`)
  // Check membership: nfdData.owner, nfdData.nfdAccount, nfdData.caAlgo
}

// Find NFD by Telegram handle
const results = await nfd.api.search({
  verifiedProperty: 'telegram',
  verifiedValue: 'alice_tg',
  limit: 1,
})
```

## Non-Algorand Chain Addresses

NFDs can store addresses for other chains:

```typescript
const data = await nfd.resolve('alice.algo', { view: 'full' })

// User-defined cross-chain addresses (unverified)
const ethAddress = data.properties?.userDefined?.['ca.eth']
const btcAddress = data.properties?.userDefined?.['ca.btc']
```

## Caching Considerations

- Reverse lookup results are CDN-cached up to 2 minutes
- Use `nocache: true` to force fresh results when needed
- For real-time state (e.g., confirming before a transaction), always use `nocache: true`
- For display purposes (showing names in a list), cached results are fine

```typescript
// Display context — cache is fine
const result = await nfd.resolveAddress(address)

// Transaction context — need fresh data
const result = await nfd.resolve('alice.algo', { nocache: true })
```
