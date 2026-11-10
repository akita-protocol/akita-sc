# Vaults

Each NFD has a **vault** — a contract-controlled Algorand account that can hold assets. The vault address is the `nfdAccount` property on a resolved NFD.

## Concepts

- The vault IS the NFD's on-chain account — assets in the vault travel with ownership
- Vaults auto-opt-in to ASAs sent to them and auto-opt-out when balance reaches zero
- Vault lock state controls who can send assets:
  - **Unlocked** (default): Anyone can send assets (sender pays 0.1 ALGO MBR for opt-in)
  - **Locked**: Only the owner can send assets to the vault
- When an NFD transfers to a new owner, all vaulted assets transfer too

## Reading Vault Info

```typescript
import { NfdClient } from '@txnlab/nfd-sdk'

const nfd = NfdClient.testNet()
const data = await nfd.resolve('alice.algo', { view: 'brief' })

console.log('Vault address:', data.nfdAccount)
```

## Vault Operations via REST API

The SDK does not yet support vault send-to/send-from operations directly. Use the REST API:

### Send Assets TO a Vault

```
POST https://api.nf.domains/nfd/vault/sendTo/{name}
```

Request body:

```json
{
  "sender": "SENDER_ALGO_ADDRESS",
  "assets": [12345],
  "amount": 1000000,
  "optInOnly": false,
  "note": "optional note"
}
```

- If vault is **unlocked**, anyone can send (sender pays 0.1 ALGO MBR per opt-in)
- If vault is **locked**, only the owner can send
- Max 13 assets if transferring, 64 if opt-in only
- Returns a transaction group to sign and submit

### Send Assets FROM a Vault

```
POST https://api.nf.domains/nfd/vault/sendFrom/{name}
```

Request body:

```json
{
  "sender": "OWNER_ALGO_ADDRESS",
  "receiver": "RECEIVER_ADDRESS",
  "receiverType": "account",
  "assets": [12345],
  "amount": 1000000,
  "receiverCanSign": true,
  "note": "optional note"
}
```

- **Owner only** operation
- `receiverType`: `"account"` or `"nfdVault"` (send to another NFD's vault)
- Max 40 assets if receiver needs opt-in, 112 if already opted-in
- Returns a transaction group to sign and submit

### Lock/Unlock a Vault

```
POST https://api.nf.domains/nfd/vault/lock/{name}
```

## Vault Address in Integrations

Use the vault address (`nfdAccount`) for receiving assets programmatically:

```typescript
const data = await nfd.resolve('alice.algo', { view: 'brief' })
const vaultAddress = data.nfdAccount

// Send ALGO or ASA to vault address
// The vault will auto-opt-in if unlocked
```

**Important**: Always check `data.state === 'owned'` before sending assets to a vault. Do not send to expired or for-sale NFDs.

## Vault Transfers with Ownership

When an NFD changes hands (sale or transfer):

- All assets in the vault transfer to the new owner
- The new owner gains full control of the vault
- This enables trading entire asset collections by selling the NFD

**Warning**: When selling an NFD with vault contents, all vaulted assets are included in the sale.

## Monitoring Vault Activity

Add the vault address (`nfdAccount`) as a "Watch Account" in Pera or Defly wallet to receive notifications about vault transactions.

## Requirements

- Vault functionality requires NFD contract version 2.6+
- Older NFDs may need a contract upgrade to enable vaults
- Contract upgrade: `POST /nfd/contract/upgrade/{name}`

## Notes

- The sender pays MBR (0.1 ALGO) for each new ASA opt-in in the vault
- Auto-opt-out cleans up zero-balance ASAs, recovering MBR
- `depositAccount` is the recommended address for receiving assets — it resolves to the best available address (verified linked address > unverified > owner), **not** the vault
- Send to `nfdAccount` specifically when you want assets held in the vault
