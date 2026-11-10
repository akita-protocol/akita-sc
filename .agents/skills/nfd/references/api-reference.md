# API Reference

Complete API surface of `@txnlab/nfd-sdk`.

## Table of Contents

- [NfdClient](#nfdclient)
- [NfdApiClient](#nfdapiclient)
- [NfdManager](#nfdmanager)
- [Types](#types)
- [Utility Functions](#utility-functions)
- [Constants](#constants)

## NfdClient

Main client for all NFD operations.

### Constructor & Factory Methods

```typescript
new NfdClient(config?: NfdClientConfig)
NfdClient.mainNet(): NfdClient
NfdClient.testNet(): NfdClient
```

```typescript
interface NfdClientConfig {
  algorand?: AlgorandClient // Existing AlgorandClient instance
  registryId?: number | bigint // NFD registry app ID
}
```

### Properties

```typescript
nfd.algorand: AlgorandClient              // Underlying Algorand client
nfd.registryId: bigint                     // Registry app ID
nfd.api: NfdApiClient                      // API client for search operations
nfd.signer: TransactionSignerAccount | null // Current signer
```

### Transaction Setup

```typescript
nfd.setSigner(
  sender: string | Address,
  signer: TransactionSigner
): NfdClient
```

Returns the client for chaining.

### Resolution

```typescript
nfd.resolve(
  nameOrAppId: string | number | bigint,
  options?: ResolveOptions
): Promise<Nfd>

nfd.resolveAddress(
  address: string | Address,
  options?: ReverseLookupOptions
): Promise<Nfd | null>

nfd.resolveAddresses(
  addresses: Array<string | Address>,
  options?: ReverseLookupOptions
): Promise<Record<string, Nfd>>
```

### Images

```typescript
nfd.getAvatarImage(nameOrAppId: string | number | bigint): Promise<NfdImageResult>
nfd.getAvatarImage(nfd: Nfd): Promise<NfdImageResult>

nfd.getBannerImage(nameOrAppId: string | number | bigint): Promise<NfdImageResult>
nfd.getBannerImage(nfd: Nfd): Promise<NfdImageResult>
```

### Search

```typescript
nfd.searchByOwner(
  address: string | Address,
  options?: Omit<SearchOptions, 'owner' | 'state'>
): Promise<SearchResponse>

nfd.searchForSale(
  options?: Omit<SearchOptions, 'state'>
): Promise<SearchResponse>
```

### Minting

```typescript
nfd.getMintQuote(
  nfdName: string,
  params: NfdMintQuoteParams
): Promise<NfdMintQuote>

nfd.mint(
  nfdName: string,
  params: NfdMintParams
): Promise<Nfd>
// Requires setSigner()
```

### Purchasing

```typescript
nfd.getPurchaseQuote(
  nameOrAppId: string | number | bigint
): Promise<NfdPurchaseQuote>
// Requires setSigner()

nfd.claim(
  nameOrAppId: string | number | bigint
): Promise<Nfd>
// Requires setSigner()

nfd.buy(
  nameOrAppId: string | number | bigint
): Promise<Nfd>
// Requires setSigner()
```

### Management

```typescript
nfd.manage(
  nameOrAppId: string | number | bigint
): NfdManager
// Requires setSigner()
```

## NfdApiClient

API client for REST operations (search, reverse lookup).

### Constructor & Factory Methods

```typescript
new NfdApiClient(registryId?: number | bigint)
NfdApiClient.mainNet(): NfdApiClient
NfdApiClient.testNet(): NfdApiClient
```

### Methods

```typescript
api.resolve(
  nameOrId: string,
  options?: ResolveOptions
): Promise<Nfd>

api.reverseLookup(
  addresses: string[],
  options?: ReverseLookupOptions
): Promise<Record<string, Nfd>>
// Automatically chunks requests of 20+ addresses

api.search(
  options?: SearchOptions
): Promise<SearchResponse>

api.setBaseUrl(baseUrl: string): void
```

## NfdManager

Builder for NFD management operations. Obtained via `nfd.setSigner(...).manage(nameOrAppId)`.

```typescript
manager.linkAddress(address: string | Address): Promise<Nfd>
manager.unlinkAddress(address: string | Address): Promise<Nfd>
manager.setMetadata(metadata: Record<string, string>): Promise<Nfd>
manager.setPrimaryAddress(address: string | Address): Promise<Nfd>
manager.setPrimaryNfd(address: string | Address): Promise<Nfd>
```

## Types

### Nfd

The resolved NFD record. Key properties:

```typescript
interface Nfd {
  name: string
  appID: number
  asaID: number
  owner: string
  state: 'owned' | 'forSale' | 'reserved' | 'expired' | 'minting'
  category: 'curated' | 'premium' | 'common'
  depositAccount: string
  nfdAccount: string // Vault address
  caAlgo: string[] // Verified Algorand addresses
  unverifiedCaAlgo: string[] // Unverified Algorand addresses
  metaTags: string[] // e.g. ['3_letters', 'pristine', 'segment']
  saleType?: 'buyItNow' | 'auction'
  sellAmount?: number // microAlgos
  reservedFor?: string
  seller?: string
  timeCreated?: string // ISO timestamp (full view)
  timeChanged?: string // ISO timestamp (full view)
  timePurchased?: string // ISO timestamp (full view)
  properties?: {
    internal?: Record<string, string> // Contract state (full view)
    userDefined?: Record<string, string> // User metadata
    verified?: Record<string, string> // Verified properties (full view)
  }
}
```

### ResolveOptions

```typescript
interface ResolveOptions {
  view?: 'tiny' | 'brief' | 'full' // default: 'brief'
  poll?: boolean // default: false
  nocache?: boolean // default: false
}
```

### ReverseLookupOptions

```typescript
interface ReverseLookupOptions {
  view?: 'tiny' | 'thumbnail' | 'brief' | 'full' // default: 'tiny'
  allowUnverified?: boolean // default: false
  nocache?: boolean // default: false
}
```

### SearchOptions

```typescript
interface SearchOptions {
  name?: string
  prefix?: string
  substring?: string // min 3 chars
  category?: Array<'curated' | 'premium' | 'common'>
  state?: Array<'reserved' | 'forSale' | 'owned' | 'expired'>
  saleType?: Array<'auction' | 'buyItNow'>
  owner?: string
  reservedFor?: string
  parentAppId?: number
  segmentLocked?: boolean
  segmentRoot?: boolean
  length?: Array<
    | '1_letters'
    | '2_letters'
    | '3_letters'
    | '4_letters'
    | '5_letters'
    | '6_letters'
    | '7_letters'
    | '8_letters'
    | '9_letters'
    | '10+_letters'
  >
  traits?: Array<'emoji' | 'pristine' | 'segment'>
  verifiedProperty?: string // 'twitter', 'discord', 'telegram', etc.
  verifiedValue?: string
  minPrice?: number // microAlgos
  maxPrice?: number
  minPriceUsd?: number // USD cents
  maxPriceUsd?: number
  changedAfter?: string // ISO timestamp
  expiresBefore?: string // ISO timestamp
  excludeUserReserved?: boolean
  limit?: number // default: 100, max: 200
  offset?: number // default: 0
  sort?:
    | 'createdDesc'
    | 'timeChangedDesc'
    | 'soldDesc'
    | 'priceAsc'
    | 'priceDesc'
    | 'highestSaleDesc'
    | 'saleTypeAsc'
    | 'nameAsc'
    | 'expiresAsc'
    | 'expiresDesc'
  view?: 'tiny' | 'thumbnail' | 'brief' | 'full' // default: 'brief'
  nocache?: boolean
}
```

### SearchResponse

```typescript
interface SearchResponse {
  total: number
  nfds: Nfd[]
}
```

### NfdImageResult

```typescript
interface NfdImageResult {
  raw: string | null // Raw on-chain value
  url: string | null // HTTPS URL
  verified: boolean // From verified properties
  asaId: number | null // NFT ASA ID if verified
  isFallback?: boolean // Default image (avatars only)
}
```

### NfdMintQuoteParams

```typescript
interface NfdMintQuoteParams {
  buyer: string
  years?: number // default: 1
}
```

### NfdMintQuote

```typescript
interface NfdMintQuote {
  nfdName: string
  buyer: string
  years: number
  isSegment: boolean
  basePrice: bigint // microAlgos
  carryCost: bigint
  extraFee: bigint
  totalPrice: bigint
}
```

### NfdMintParams

```typescript
interface NfdMintParams {
  buyer: string
  years: number // 1–20
  reservedFor?: string
}
```

### NfdPurchaseQuote

```typescript
interface NfdPurchaseQuote {
  nfdName: string
  buyer: string
  canClaim: boolean
  canBuy: boolean
  price: bigint // microAlgos
  state: string
  authorized: boolean
  authorizationError?: string
  reservedFor?: string
  sellAmount?: bigint
}
```

## Utility Functions

### NFD Name Utilities

```typescript
import {
  isValidName,
  isSegmentName,
  extractParentName,
  getNfdBasename,
  isSegmentMintingUnlocked,
  canMintSegment,
} from '@txnlab/nfd-sdk'

isValidName('alice.algo') // true
isValidName('sub.alice.algo') // true
isSegmentName('sub.alice.algo') // true
isSegmentName('alice.algo') // false
extractParentName('sub.parent.algo') // 'parent.algo'
getNfdBasename('sub.parent.algo') // 'parent'
getNfdBasename('parent.algo') // 'parent'
isSegmentMintingUnlocked(nfd) // boolean
canMintSegment(nfd, callerAddress) // boolean
```

### IPFS Utilities

```typescript
import { checkIpfsAvailability, isIpfsUrl } from '@txnlab/nfd-sdk'

isIpfsUrl('ipfs://Qm...') // true
await checkIpfsAvailability('ipfs://Qm...') // Returns HTTPS URL
```

### Error Handling

```typescript
import { parseTransactionError, withErrorParsing } from '@txnlab/nfd-sdk'

parseTransactionError(error) // User-friendly error string
const wrappedFn = withErrorParsing(asyncFn) // Auto-parses errors
```

## Constants

```typescript
import { NfdRegistryId } from '@txnlab/nfd-sdk'

NfdRegistryId.MAINNET // 760937186
NfdRegistryId.TESTNET // 84366825
```

### API Base URLs

- MainNet: `https://api.nf.domains`
- TestNet: `https://api.testnet.nf.domains`

### Default Senders (read-only operations)

- MainNet: `Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA`
- TestNet: `A7NMWS3NT3IUDMLVO26ULGXGIIOUQ3ND2TXSER6EBGRZNOBOUIQXHIBGDE`

## Exports

Full list of public exports from `@txnlab/nfd-sdk`:

```typescript
// Classes
export { NfdClient } from './client'
export { NfdApiClient } from './api-client'
export { NfdManager } from './modules/manager'
export { PurchasingModule } from './modules/purchasing'

// Types
export type {
  Nfd,
  NfdImageResult,
  ResolveOptions,
  ReverseLookupOptions,
  SearchOptions,
  SearchResponse,
  NfdClientConfig,
  NfdMintQuote,
  NfdMintQuoteParams,
  NfdMintParams,
  NfdPurchaseQuote,
} from './types'

// Constants
export { NfdRegistryId } from './constants'

// Utilities
export {
  isValidName,
  isSegmentName,
  extractParentName,
  getNfdBasename,
  isSegmentMintingUnlocked,
  canMintSegment,
} from './utils/nfd'
export { checkIpfsAvailability, isIpfsUrl } from './utils/ipfs'
export { parseTransactionError, withErrorParsing } from './utils/error-parser'
```
