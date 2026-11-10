# Signing Data (ARC-60 / SIWA)

ARC-60 enables Sign In With Algorand (SIWA), based on the CAIP-122 chain-agnostic sign-in standard.

**Important**: Currently, only the **Lute** wallet provider supports ARC-60 data signing. Calling `signData` with any other wallet will throw an error. Check `activeWallet.canSignData` before attempting.

## Dependencies

```bash
npm install @noble/ed25519 canonify
```

## SIWA Request Object

```typescript
const siwaRequest = {
  domain: location.host, // Current host
  chain_id: '283', // Algorand MainNet chain ID
  account_address: activeAddress, // User's wallet address
  type: 'ed25519', // Signature type
  uri: location.origin, // Origin URL
  version: '1', // SIWA version
  'issued-at': new Date().toISOString(), // Timestamp

  // Optional fields:
  // statement: 'Sign in to MyApp',
  // nonce: crypto.randomUUID(),
  // 'expiration-time': new Date(Date.now() + 3600000).toISOString(),
  // 'not-before': new Date().toISOString(),
  // 'request-id': crypto.randomUUID(),
  // resources: ['https://myapp.com/api'],
}
```

## React Implementation

```tsx
import { useWallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'
import { ed } from '@noble/ed25519'
import { canonify } from 'canonify'

function Authenticate() {
  const { activeAddress, activeWallet, signData } = useWallet()

  const handleAuth = async () => {
    try {
      if (!activeAddress) throw new Error('No active account')
      if (!activeWallet?.canSignData)
        throw new Error('Wallet does not support data signing')

      const siwaRequest = {
        domain: location.host,
        chain_id: '283',
        account_address: activeAddress,
        type: 'ed25519',
        uri: location.origin,
        version: '1',
        'issued-at': new Date().toISOString(),
      }

      const dataString = canonify(siwaRequest)
      if (!dataString) throw Error('Invalid JSON')
      const data = btoa(dataString)

      const metadata = { scope: 'auth', encoding: 'base64' }
      const resp = await signData(data, metadata)

      // Verify signature
      const enc = new TextEncoder()
      const clientDataJsonHash = await crypto.subtle.digest(
        'SHA-256',
        enc.encode(dataString),
      )
      const authenticatorDataHash = await crypto.subtle.digest(
        'SHA-256',
        resp.authenticatorData,
      )

      const toSign = new Uint8Array(64)
      toSign.set(new Uint8Array(clientDataJsonHash), 0)
      toSign.set(new Uint8Array(authenticatorDataHash), 32)

      const pubKey = algosdk.Address.fromString(activeAddress).publicKey
      const isValid = await ed.verifyAsync(resp.signature, toSign, pubKey)

      if (!isValid) throw new Error('Verification Failed')
      console.info('Successfully authenticated!')
    } catch (error) {
      console.error('Error signing data:', error)
    }
  }

  return <button onClick={handleAuth}>Sign In with Algorand</button>
}
```

## Vue Implementation

```typescript
<script setup lang="ts">
  import { useWallet } from '@txnlab/use-wallet-vue'
  import algosdk from 'algosdk'
  import { ed } from '@noble/ed25519'
  import { canonify } from 'canonify'

  const { activeAddress, activeWallet, signData } = useWallet()

  const handleAuth = async () => {
    try {
      if (!activeAddress.value) throw new Error('No active account')
      if (!activeWallet?.canSignData) throw new Error('Wallet does not support data signing')

      const siwaRequest = {
        domain: location.host,
        chain_id: '283',
        account_address: activeAddress.value,
        type: 'ed25519',
        uri: location.origin,
        version: '1',
        'issued-at': new Date().toISOString(),
      }

      const dataString = canonify(siwaRequest)
      if (!dataString) throw Error('Invalid JSON')
      const data = btoa(dataString)

      const metadata = { scope: 'auth', encoding: 'base64' }
      const resp = await signData(data, metadata)

      const enc = new TextEncoder()
      const clientDataJsonHash = await crypto.subtle.digest('SHA-256', enc.encode(dataString))
      const authenticatorDataHash = await crypto.subtle.digest('SHA-256', resp.authenticatorData)
      const toSign = new Uint8Array(64)
      toSign.set(new Uint8Array(clientDataJsonHash), 0)
      toSign.set(new Uint8Array(authenticatorDataHash), 32)

      const pubKey = algosdk.Address.fromString(activeAddress.value).publicKey
      const isValid = await ed.verifyAsync(resp.signature, toSign, pubKey)
      if (!isValid) throw new Error('Verification Failed')
      console.info('Successfully authenticated!')
    } catch (error) {
      console.error('Error signing data:', error)
    }
  }
</script>
<template><button @click="handleAuth">Sign In with Algorand</button></template>
```

## SolidJS Implementation

```tsx
import { useWallet } from '@txnlab/use-wallet-solid'
import algosdk from 'algosdk'
import { ed } from '@noble/ed25519'
import { canonify } from 'canonify'

function Authenticate() {
  const { activeAddress, activeWallet, signData } = useWallet()

  const handleAuth = async () => {
    try {
      if (!activeAddress()) throw new Error('No active account')
      if (!activeWallet()?.canSignData)
        throw new Error('Wallet does not support data signing')

      const address = activeAddress()!
      const siwaRequest = {
        domain: location.host,
        chain_id: '283',
        account_address: address,
        type: 'ed25519',
        uri: location.origin,
        version: '1',
        'issued-at': new Date().toISOString(),
      }

      const dataString = canonify(siwaRequest)
      if (!dataString) throw Error('Invalid JSON')
      const data = btoa(dataString)
      const resp = await signData(data, { scope: 'auth', encoding: 'base64' })

      const enc = new TextEncoder()
      const clientDataJsonHash = await crypto.subtle.digest(
        'SHA-256',
        enc.encode(dataString),
      )
      const authenticatorDataHash = await crypto.subtle.digest(
        'SHA-256',
        resp.authenticatorData,
      )
      const toSign = new Uint8Array(64)
      toSign.set(new Uint8Array(clientDataJsonHash), 0)
      toSign.set(new Uint8Array(authenticatorDataHash), 32)

      const pubKey = algosdk.Address.fromString(address).publicKey
      const isValid = await ed.verifyAsync(resp.signature, toSign, pubKey)
      if (!isValid) throw new Error('Verification Failed')
      console.info('Successfully authenticated!')
    } catch (error) {
      console.error('Error signing data:', error)
    }
  }

  return <button onClick={handleAuth}>Sign In with Algorand</button>
}
```

## Svelte Implementation

```typescript
<script lang="ts">
  import { useWallet } from '@txnlab/use-wallet-svelte'
  import algosdk from 'algosdk'
  import { ed } from '@noble/ed25519'
  import { canonify } from 'canonify'

  const { activeAddress, activeWallet, signData } = useWallet()

  const handleAuth = async () => {
    try {
      if (!activeAddress.current) throw new Error('No active account')
      if (!activeWallet()?.canSignData) throw new Error('Wallet does not support data signing')

      const siwaRequest = {
        domain: location.host, chain_id: '283', account_address: activeAddress.current,
        type: 'ed25519', uri: location.origin, version: '1',
        'issued-at': new Date().toISOString(),
      }

      const dataString = canonify(siwaRequest)
      if (!dataString) throw Error('Invalid JSON')
      const data = btoa(dataString)
      const resp = await signData(data, { scope: 'auth', encoding: 'base64' })

      const enc = new TextEncoder()
      const clientDataJsonHash = await crypto.subtle.digest('SHA-256', enc.encode(dataString))
      const authenticatorDataHash = await crypto.subtle.digest('SHA-256', resp.authenticatorData)
      const toSign = new Uint8Array(64)
      toSign.set(new Uint8Array(clientDataJsonHash), 0)
      toSign.set(new Uint8Array(authenticatorDataHash), 32)

      const pubKey = algosdk.Address.fromString(activeAddress.current).publicKey
      const isValid = await ed.verifyAsync(resp.signature, toSign, pubKey)
      if (!isValid) throw new Error('Verification Failed')
      console.info('Successfully authenticated!')
    } catch (error) {
      console.error('Error signing data:', error)
    }
  }
</script>
<button onclick={handleAuth}>Sign In with Algorand</button>
```

## Verification Process

1. Create SIWA request object with required fields
2. Canonify to deterministic JSON, then base64-encode
3. Call `signData(data, { scope: 'auth', encoding: 'base64' })`
4. Hash client data (the canonical JSON) with SHA-256
5. Hash `resp.authenticatorData` with SHA-256
6. Concatenate both hashes into a 64-byte buffer
7. Verify the signature against the user's ed25519 public key

## Best Practices

- Always verify signatures server-side in production
- Use nonces to prevent replay attacks
- Set expiration times on requests
- Use HTTPS exclusively
- Ensure sign requests come from direct user interaction (button click)
