# Managing NFDs

Manage NFD metadata and linked addresses using the `manage()` builder pattern.

## Setup

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'
const nfd = NfdClient.testNet() // or new NfdClient() for MainNet
```

## The Manage Builder

Call `manage()` with an NFD name or app ID, then chain an operation:

```typescript
const result = await nfd
  .setSigner(activeAddress, transactionSigner)
  .manage('example.algo')
  .linkAddress('ALGO_ADDRESS_TO_LINK')
```

Only the NFD **owner** can perform management operations.

## Link an Address

Link an Algorand address to an NFD. Linked addresses appear in `caAlgo` (verified):

```typescript
const updatedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .manage('example.algo')
  .linkAddress('ALGO_ADDRESS_TO_LINK')
```

## Unlink an Address

Remove a linked address:

```typescript
const updatedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .manage('example.algo')
  .unlinkAddress('ALGO_ADDRESS_TO_REMOVE')
```

## Set Primary Address

Set which linked address is the primary deposit address for this NFD:

```typescript
const updatedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .manage('example.algo')
  .setPrimaryAddress('ALGO_ADDRESS')
```

## Set Primary NFD

Set which NFD is the primary for a given address (used in reverse lookups):

```typescript
const updatedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .manage('example.algo')
  .setPrimaryNfd('ALGO_ADDRESS')
```

## Set Metadata

Set user-defined metadata fields on the NFD:

```typescript
const updatedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .manage('example.algo')
  .setMetadata({
    website: 'https://example.com',
    twitter: '@example',
    bio: 'Hello from my NFD!',
  })
```

### Common metadata fields

| Field      | Description                      |
| ---------- | -------------------------------- |
| `name`     | Display name                     |
| `bio`      | Short biography                  |
| `email`    | Email address                    |
| `website`  | Website URL                      |
| `domain`   | DNS domain                       |
| `url`      | Another URL field                |
| `twitter`  | Twitter handle                   |
| `discord`  | Discord username                 |
| `telegram` | Telegram handle                  |
| `github`   | GitHub username                  |
| `avatar`   | Avatar image URL (IPFS or HTTPS) |
| `banner`   | Banner image URL (IPFS or HTTPS) |
| `address`  | Physical address                 |

### Delete metadata

Set a field to empty string to remove it:

```typescript
const updatedNfd = await nfd
  .setSigner(activeAddress, transactionSigner)
  .manage('example.algo')
  .setMetadata({ twitter: '' })
```

## Reading Current Metadata

Resolve with `full` view to see all properties:

```typescript
const data = await nfd.resolve('example.algo', { view: 'full' })

// User-defined metadata
const userMetadata = data.properties?.userDefined
console.log(userMetadata?.website) // 'https://example.com'
console.log(userMetadata?.twitter) // '@example'

// Verified properties (set by NFDomains verification system)
const verified = data.properties?.verified
console.log(verified?.twitter) // Verified Twitter handle

// Linked addresses
console.log(data.caAlgo) // Verified linked addresses
console.log(data.unverifiedCaAlgo) // Unverified linked addresses
```

## Complete Example — Link Address

```typescript
import { NfdClient, parseTransactionError } from '@txnlab/nfd-sdk'

async function linkAddress(
  nfdName: string,
  addressToLink: string,
  activeAddress: string,
  transactionSigner: TransactionSigner,
) {
  const nfd = NfdClient.testNet()

  try {
    // Resolve to check current state
    const data = await nfd.resolve(nfdName, { view: 'full' })
    console.log('Current linked addresses:', data.caAlgo)

    // Link new address
    const updatedNfd = await nfd
      .setSigner(activeAddress, transactionSigner)
      .manage(nfdName)
      .linkAddress(addressToLink)

    console.log('Updated linked addresses:', updatedNfd.caAlgo)
  } catch (error) {
    console.error(parseTransactionError(error))
  }
}
```

## Complete Example — Set Metadata

```typescript
import { NfdClient, parseTransactionError } from '@txnlab/nfd-sdk'

async function updateProfile(
  nfdName: string,
  activeAddress: string,
  transactionSigner: TransactionSigner,
) {
  const nfd = NfdClient.testNet()

  try {
    const updatedNfd = await nfd
      .setSigner(activeAddress, transactionSigner)
      .manage(nfdName)
      .setMetadata({
        name: 'Alice',
        bio: 'Algorand developer',
        website: 'https://alice.dev',
        twitter: '@alice',
        github: 'alice-dev',
      })

    console.log('Updated metadata:', updatedNfd.properties?.userDefined)
  } catch (error) {
    console.error(parseTransactionError(error))
  }
}
```

## Notes

- All metadata is publicly visible on-chain.
- Metadata is wiped when an NFD is listed for sale or transferred.
- The SDK handles field splitting automatically for values exceeding 128 bytes.
- The SDK calculates MBR (minimum balance requirement) costs for state updates.
