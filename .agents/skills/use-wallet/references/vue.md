# Vue Adapter

Package: `@txnlab/use-wallet-vue`

## Installation

```bash
npm install @txnlab/use-wallet-vue algosdk
```

## Setup

Register the `WalletManagerPlugin` in your main entry file:

```typescript
import { createApp } from 'vue'
import {
  WalletManagerPlugin,
  NetworkId,
  WalletId,
} from '@txnlab/use-wallet-vue'
import App from './App.vue'

const app = createApp(App)

app.use(WalletManagerPlugin, {
  wallets: [WalletId.PERA, WalletId.DEFLY, WalletId.LUTE],
  defaultNetwork: NetworkId.TESTNET,
})

app.mount('#app')
```

## useWallet Composable

Returns Vue reactive refs. Access values via `.value` in scripts, or directly in templates.

```typescript
<script setup lang="ts">
  import { useWallet } from '@txnlab/use-wallet-vue'

  const {
    wallets,              // Ref<Wallet[]>
    activeWallet,         // Ref<Wallet | null>
    activeAccount,        // Ref<WalletAccount | null>
    activeAddress,        // Ref<string | null>
    isReady,              // Ref<boolean>
    signTransactions,     // sign function
    transactionSigner,    // algosdk.TransactionSigner
    signData,             // ARC-60 (Lute only)
    algodClient,          // Ref<algosdk.Algodv2>
  } = useWallet()
</script>

<template>
  <div v-if="!isReady">Loading...</div>
  <div v-else>
    <div v-if="activeAddress">Connected: {{ activeAddress }}</div>
    <div v-else>Not connected</div>
  </div>
</template>
```

## useNetwork Composable

```typescript
<script setup lang="ts">
  import { useNetwork } from '@txnlab/use-wallet-vue'

  const {
    activeNetwork,        // Ref<string>
    setActiveNetwork,     // (networkId: string) => Promise<void>
    networkConfig,        // Ref<Record<string, NetworkConfig>>
    activeNetworkConfig,  // Ref<NetworkConfig>
    updateAlgodConfig,    // (networkId, config) => void
    resetNetworkConfig,   // (networkId) => void
  } = useNetwork()
</script>

<template>
  <select
    :value="activeNetwork"
    @change="(e) => setActiveNetwork((e.target as HTMLSelectElement).value)"
  >
    <option
      v-for="[id] in Object.entries(networkConfig)"
      :key="id"
      :value="id"
    >
      {{ id }}
    </option>
  </select>
</template>
```

## Connect Wallet Menu Example

```typescript
<script setup lang="ts">
  import { ref } from 'vue'
  import { useWallet } from '@txnlab/use-wallet-vue'

  const { wallets, activeWallet, activeAddress } = useWallet()
  const connecting = ref<string | null>(null)

  const connectWallet = async (wallet: any) => {
    connecting.value = wallet.id
    try {
      await wallet.connect()
    } catch (error) {
      console.error('Failed to connect:', error)
    } finally {
      connecting.value = null
    }
  }
</script>

<template>
  <div v-if="activeWallet && activeAddress">
    <h3>{{ activeWallet.metadata.name }} [active]</h3>
    <p>{{ activeAddress }}</p>

    <select
      v-if="activeWallet.accounts.length > 1"
      :value="activeAddress"
      @change="(e) => activeWallet!.setActiveAccount((e.target as HTMLSelectElement).value)"
    >
      <option
        v-for="account in activeWallet.accounts"
        :key="account.address"
        :value="account.address"
      >
        {{ account.address.slice(0, 8) }}...
      </option>
    </select>

    <button @click="activeWallet!.disconnect()">Disconnect</button>
  </div>

  <div v-else>
    <h3>Connect a Wallet</h3>
    <button
      v-for="wallet in wallets"
      :key="wallet.id"
      :disabled="connecting !== null"
      @click="connectWallet(wallet)"
    >
      {{ wallet.metadata.name }}
      <span v-if="connecting === wallet.id"> (connecting...)</span>
    </button>
  </div>
</template>
```

## Sign & Send Transaction

```typescript
<script setup lang="ts">
  import { useWallet } from '@txnlab/use-wallet-vue'
  import algosdk from 'algosdk'

  const { activeAddress, signTransactions, algodClient } = useWallet()

  const handleSend = async () => {
    if (!activeAddress.value) return

    const suggestedParams = await algodClient.value.getTransactionParams().do()
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: activeAddress.value,
      receiver: activeAddress.value,
      amount: 0,
      suggestedParams,
    })

    const signedTxns = await signTransactions([transaction])
    const { txid } = await algodClient.value.sendRawTransaction(signedTxns).do()
    const result = await algosdk.waitForConfirmation(algodClient.value, txid, 4)
    console.log(`Confirmed at round ${result['confirmed-round']}`)
  }
</script>

<template>
  <button @click="handleSend">Send Transaction</button>
</template>
```

## Using with ATC (transactionSigner)

```typescript
<script setup lang="ts">
  import { useWallet } from '@txnlab/use-wallet-vue'
  import algosdk from 'algosdk'

  const { activeAddress, transactionSigner, algodClient } = useWallet()

  const handleCall = async () => {
    if (!activeAddress.value) return

    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.value.getTransactionParams().do()

    const method = algosdk.ABIMethod.fromSignature('hello(string)string')
    atc.addMethodCall({
      sender: activeAddress.value,
      signer: transactionSigner,
      appID: 123,
      method,
      methodArgs: ['World'],
      suggestedParams,
    })

    const result = await atc.execute(algodClient.value, 4)
    console.log('Return value:', result.methodResults[0].returnValue)
  }
</script>

<template>
  <button @click="handleCall">Call Contract</button>
</template>
```

## Key Difference from React

In Vue, reactive state is accessed via `.value` in `<script>` blocks. In `<template>`, Vue automatically unwraps refs, so you use `activeAddress` directly (not `activeAddress.value`). The `transactionSigner` is not a ref and can be passed directly.

## Nuxt

For Nuxt SSR apps, an example project is available in the use-wallet repository at `examples/nuxt`.
