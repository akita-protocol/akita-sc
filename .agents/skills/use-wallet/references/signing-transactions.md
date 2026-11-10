# Signing Transactions

The `useWallet` hook/composable/primitive provides two methods for signing transactions:

1. **`signTransactions`** — Direct signing of transaction(s)
2. **`transactionSigner`** — Typed `algosdk.TransactionSigner` for use with ATC and AlgoKit Utils

**Important**: Some wallet providers require signature requests from **direct user interaction** (button click). Do not call sign methods from timers, effects, or non-interactive code.

## signTransactions

Accepts an array of `algosdk.Transaction` objects, encoded transactions (`Uint8Array`), or arrays of either (for groups). Returns `Promise<(Uint8Array | null)[]>` where `null` indicates an unsigned transaction.

### Vanilla JS/TS

```typescript
import { WalletManager } from '@txnlab/use-wallet'
import algosdk from 'algosdk'

async function sendTransaction(manager: WalletManager) {
  const activeAddress = manager.activeAddress
  if (!activeAddress) return

  const suggestedParams = await manager.algodClient.getTransactionParams().do()
  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: activeAddress,
    receiver: activeAddress,
    amount: 0,
    suggestedParams,
  })

  const signedTxns = await manager.signTransactions([transaction])
  const { txid } = await manager.algodClient.sendRawTransaction(signedTxns).do()
  const result = await algosdk.waitForConfirmation(manager.algodClient, txid, 4)
  console.log(`Confirmed at round ${result['confirmed-round']}`)
}
```

### React

```tsx
import { useWallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'

function SendTransaction() {
  const { activeAddress, signTransactions, algodClient } = useWallet()

  const handleSend = async () => {
    if (!activeAddress) return

    const suggestedParams = await algodClient.getTransactionParams().do()
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: activeAddress,
      receiver: activeAddress,
      amount: 0,
      suggestedParams,
    })

    const signedTxns = await signTransactions([transaction])
    const { txid } = await algodClient.sendRawTransaction(signedTxns).do()
    const result = await algosdk.waitForConfirmation(algodClient, txid, 4)
    console.log(`Confirmed at round ${result['confirmed-round']}`)
  }

  return <button onClick={handleSend}>Send Transaction</button>
}
```

### Vue

```typescript
<script setup lang="ts">
  import { useWallet } from '@txnlab/use-wallet-vue'
  import algosdk from 'algosdk'

  const { activeAddress, signTransactions, algodClient } = useWallet()

  const handleSend = async () => {
    if (!activeAddress.value) return
    const suggestedParams = await algodClient.value.getTransactionParams().do()
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: activeAddress.value, receiver: activeAddress.value,
      amount: 0, suggestedParams,
    })
    const signedTxns = await signTransactions([transaction])
    const { txid } = await algodClient.value.sendRawTransaction(signedTxns).do()
    const result = await algosdk.waitForConfirmation(algodClient.value, txid, 4)
    console.log(`Confirmed at round ${result['confirmed-round']}`)
  }
</script>
<template><button @click="handleSend">Send Transaction</button></template>
```

### SolidJS

```tsx
import { useWallet } from '@txnlab/use-wallet-solid'
import algosdk from 'algosdk'

function SendTransaction() {
  const { activeAddress, signTransactions, algodClient } = useWallet()
  const handleSend = async () => {
    if (!activeAddress()) return
    const suggestedParams = await algodClient().getTransactionParams().do()
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: activeAddress()!,
      receiver: activeAddress()!,
      amount: 0,
      suggestedParams,
    })
    const signedTxns = await signTransactions([transaction])
    const { txid } = await algodClient().sendRawTransaction(signedTxns).do()
    const result = await algosdk.waitForConfirmation(algodClient(), txid, 4)
    console.log(`Confirmed at round ${result['confirmed-round']}`)
  }
  return <button onClick={handleSend}>Send Transaction</button>
}
```

### Svelte

```typescript
<script lang="ts">
  import { useWallet } from '@txnlab/use-wallet-svelte'
  import algosdk from 'algosdk'
  const { activeAddress, signTransactions, algodClient } = useWallet()
  const handleSend = async () => {
    if (!activeAddress.current) return
    const suggestedParams = await algodClient.current.getTransactionParams().do()
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: activeAddress.current, receiver: activeAddress.current,
      amount: 0, suggestedParams,
    })
    const signedTxns = await signTransactions([transaction])
    const { txid } = await algodClient.current.sendRawTransaction(signedTxns).do()
    const result = await algosdk.waitForConfirmation(algodClient.current, txid, 4)
    console.log(`Confirmed at round ${result['confirmed-round']}`)
  }
</script>
<button onclick={handleSend}>Send Transaction</button>
```

## transactionSigner

A typed `algosdk.TransactionSigner` for use with `AtomicTransactionComposer` (ATC) and AlgoKit Utils. Useful for ABI method calls and composing multiple transactions.

### ATC Example (React)

```tsx
import { useWallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'

function CallContract() {
  const { activeAddress, transactionSigner, algodClient } = useWallet()

  const handleCall = async () => {
    if (!activeAddress) return

    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()

    // ABI method call
    const method = algosdk.ABIMethod.fromSignature('hello(string)string')
    atc.addMethodCall({
      sender: activeAddress,
      signer: transactionSigner,
      appID: 123,
      method,
      methodArgs: ['World'],
      suggestedParams,
    })

    // Additional payment transaction in same group
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: activeAddress,
      receiver: activeAddress,
      amount: 1000,
      suggestedParams,
    })
    atc.addTransaction({ txn: paymentTxn, signer: transactionSigner })

    const result = await atc.execute(algodClient, 4)
    console.log('Transaction ID:', result.txIDs[0])
    console.log('Return value:', result.methodResults[0].returnValue)
  }

  return <button onClick={handleCall}>Call Contract</button>
}
```

### AlgoKit Utils Example (React)

```tsx
import { useWallet } from '@txnlab/use-wallet-react'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { HelloWorldClient } from './artifacts/HelloWorld/client'

function CallWithAlgoKit() {
  const { activeAddress, transactionSigner, algodClient } = useWallet()

  const handleCall = async () => {
    if (!activeAddress) return

    const algorand = AlgorandClient.fromClients({
      algod: algodClient,
    }).setSigner(activeAddress, transactionSigner)

    const client = algorand.client.getTypedAppClientById(HelloWorldClient, {
      appId: 123n,
    })

    const result = await client
      .newGroup()
      .hello({ args: { name: 'World' } })
      .addTransaction(
        algorand.createTransaction.payment({
          sender: activeAddress,
          receiver: activeAddress,
          amount: (1000).microAlgo(),
        }),
      )
      .execute()

    console.log('Return value:', result.return)
  }

  return <button onClick={handleCall}>Call Contract</button>
}
```

## Framework Access Patterns Summary

| Framework | activeAddress           | algodClient           | transactionSigner            |
| --------- | ----------------------- | --------------------- | ---------------------------- |
| Vanilla   | `manager.activeAddress` | `manager.algodClient` | `manager.transactionSigner`  |
| React     | `activeAddress`         | `algodClient`         | `transactionSigner`          |
| Vue       | `activeAddress.value`   | `algodClient.value`   | `transactionSigner`          |
| SolidJS   | `activeAddress()`       | `algodClient()`       | `transactionSigner`          |
| Svelte    | `activeAddress.current` | `algodClient.current` | `transactionSigner`          |

`transactionSigner` is the same across all frameworks — not wrapped in reactive state.
