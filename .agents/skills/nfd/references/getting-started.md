# Getting Started

## Installation

```bash
npm install @txnlab/nfd-sdk algosdk
```

The SDK is pre-1.0 — pin the version in `package.json` to avoid breaking changes:

```json
{
  "dependencies": {
    "@txnlab/nfd-sdk": "0.1.2"
  }
}
```

## NfdClient Initialization

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'

// MainNet (default)
const nfd = new NfdClient()

// Explicit network
const nfd = NfdClient.mainNet()
const nfd = NfdClient.testNet()
```

### Custom Configuration

Use when you have an existing `AlgorandClient` or need to specify a registry ID:

```typescript
import { NfdClient, NfdRegistryId } from '@txnlab/nfd-sdk'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'

const algorand = AlgorandClient.mainNet()
const nfd = new NfdClient({
  algorand,
  registryId: NfdRegistryId.MAINNET,
})
```

### Registry IDs

```typescript
import { NfdRegistryId } from '@txnlab/nfd-sdk'

NfdRegistryId.MAINNET // 760937186
NfdRegistryId.TESTNET // 84366825
```

### API Base URLs

- MainNet: `https://api.nf.domains`
- TestNet: `https://api.testnet.nf.domains`

## Setting a Signer

Write operations (mint, buy, claim, manage) require a transaction signer:

```typescript
const signedClient = nfd.setSigner(activeAddress, transactionSigner)
```

- `activeAddress`: `string` — the sender's Algorand address
- `transactionSigner`: `TransactionSigner` — from a wallet provider (e.g., `useWallet()`)

The signer is set on the client instance and used for all subsequent write operations. `setSigner` returns the client for chaining:

```typescript
const result = await nfd
  .setSigner(activeAddress, transactionSigner)
  .mint('example.algo', { buyer: activeAddress, years: 1 })
```

## Client Properties

```typescript
nfd.algorand // AlgorandClient instance
nfd.registryId // bigint — registry app ID
nfd.api // NfdApiClient — for search operations
nfd.signer // TransactionSignerAccount | null
```

## Error Handling

```typescript
import { parseTransactionError } from '@txnlab/nfd-sdk'

try {
  await nfd
    .setSigner(addr, signer)
    .mint('example.algo', { buyer: addr, years: 1 })
} catch (error) {
  const message = parseTransactionError(error)
  // User-friendly message for common errors:
  // - Insufficient balance
  // - Overspend
  // - Transaction timing errors
  // - Smart contract logic errors
}
```
