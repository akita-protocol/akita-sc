# Images (Avatar & Banner)

## Setup

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
const nfd = NfdClient.testNet() // or new NfdClient() for MainNet
```

## Avatar Image

```typescript
const result = await nfd.getAvatarImage('alice.algo')
```

Returns an `NfdImageResult`:

```typescript
interface NfdImageResult {
  raw: string | null // Raw on-chain value
  url: string | null // HTTPS URL (always provided for avatars via fallback)
  verified: boolean // true if from verified NFT properties
  asaId: number | null // ASA ID if verified image
  isFallback?: boolean // true if using default placeholder
}
```

**Avatar always returns a URL.** If no avatar is set, it returns a built-in fallback image with `isFallback: true`.

Resolution order:

1. Verified properties (NFT-based avatar via `v.avatar` / `v.avatarasaid`)
2. User-defined properties (`u.avatar`)
3. Built-in fallback image

## Banner Image

```typescript
const result = await nfd.getBannerImage('alice.algo')
```

Returns the same `NfdImageResult` shape, but `url` **may be null** — there is no fallback for banners.

## Input Overloads

Both methods accept a name, app ID, or a pre-resolved `Nfd` object:

```typescript
// By name (resolves internally)
const avatar = await nfd.getAvatarImage('alice.algo')

// By app ID (resolves internally)
const avatar = await nfd.getAvatarImage(123456789)

// Pre-resolved NFD (no additional resolve needed — faster)
const data = await nfd.resolve('alice.algo', { view: 'full' })
const avatar = await nfd.getAvatarImage(data)
const banner = await nfd.getBannerImage(data)
```

When passing a name or app ID, the SDK resolves the NFD internally with `view: 'full'`. Pass a pre-resolved `Nfd` object to avoid the extra network call.

## IPFS Handling

The SDK automatically converts IPFS URLs to HTTPS. It checks `images.nf.domains` first, then falls back to a public IPFS gateway. Only image content types are returned.

For JSON metadata (e.g., ARC-19 NFTs), the SDK recursively follows the `image` field in the JSON to find the actual image URL.

## Complete Example

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'

async function main() {
  const nfd = NfdClient.mainNet()

  // Load both images in parallel (using pre-resolved data)
  const data = await nfd.resolve('alice.algo', { view: 'full' })
  const [avatar, banner] = await Promise.all([
    nfd.getAvatarImage(data),
    nfd.getBannerImage(data),
  ])

  console.log('Avatar URL:', avatar.url)
  console.log('Avatar verified:', avatar.verified)
  console.log('Avatar ASA ID:', avatar.asaId)
  console.log('Is fallback:', avatar.isFallback)

  if (banner.url) {
    console.log('Banner URL:', banner.url)
    console.log('Banner verified:', banner.verified)
  } else {
    console.log('No banner set')
  }
}

main()
```
