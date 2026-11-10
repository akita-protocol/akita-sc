# SolidJS Adapter

Package: `@txnlab/use-wallet-solid`

## Installation

```bash
npm install @txnlab/use-wallet-solid algosdk
```

## Setup

Wrap your app with `WalletProvider`:

```tsx
import {
  WalletProvider,
  WalletManager,
  NetworkId,
  WalletId,
} from '@txnlab/use-wallet-solid'

const manager = new WalletManager({
  wallets: [WalletId.PERA, WalletId.DEFLY, WalletId.LUTE],
  defaultNetwork: NetworkId.TESTNET,
})

function App() {
  return (
    <WalletProvider manager={manager}>
      <YourApp />
    </WalletProvider>
  )
}
```

## useWallet Primitive

**Important**: Solid's primitives return **signals (functions)** that must be called to access their current value.

```tsx
import { useWallet } from '@txnlab/use-wallet-solid'
import { Show } from 'solid-js'

function WalletInfo() {
  const {
    wallets, // Map of wallet instances
    activeWallet, // () => Wallet | null — call as activeWallet()
    activeAccount, // () => WalletAccount | null
    activeAddress, // () => string | null
    isReady, // () => boolean
    signTransactions, // sign function
    transactionSigner, // algosdk.TransactionSigner (not a signal)
    signData, // ARC-60 (Lute only)
    algodClient, // () => algosdk.Algodv2
  } = useWallet()

  return (
    <Show when={isReady()} fallback={<div>Loading...</div>}>
      <Show when={activeAddress()} fallback={<div>Not connected</div>}>
        <div>Connected: {activeAddress()}</div>
      </Show>
    </Show>
  )
}
```

## useNetwork Primitive

```tsx
import { useNetwork } from '@txnlab/use-wallet-solid'
import { For } from 'solid-js'

function NetworkSelector() {
  const {
    activeNetwork, // () => string
    setActiveNetwork, // (networkId: string) => Promise<void>
    networkConfig, // () => Record<string, NetworkConfig>
    activeNetworkConfig, // () => NetworkConfig
    updateAlgodConfig, // (networkId, config) => void
    resetNetworkConfig, // (networkId) => void
  } = useNetwork()

  return (
    <select
      value={activeNetwork()}
      onChange={(e) => setActiveNetwork(e.currentTarget.value)}
    >
      <For each={Object.keys(networkConfig())}>
        {(networkId) => <option value={networkId}>{networkId}</option>}
      </For>
    </select>
  )
}
```

## Connect Wallet Menu Example

```tsx
import { useWallet } from '@txnlab/use-wallet-solid'
import { createSignal, Show, For } from 'solid-js'

function WalletMenu() {
  const { wallets, activeWallet, activeAddress } = useWallet()
  const [connecting, setConnecting] = createSignal<string | null>(null)

  return (
    <Show
      when={activeWallet() && activeAddress()}
      fallback={
        <div>
          <h3>Connect a Wallet</h3>
          <For each={[...wallets.values()]}>
            {(wallet) => (
              <button
                disabled={connecting() !== null}
                onClick={async () => {
                  setConnecting(wallet.id)
                  try {
                    await wallet.connect()
                  } catch (error) {
                    console.error('Failed to connect:', error)
                  } finally {
                    setConnecting(null)
                  }
                }}
              >
                {wallet.metadata.name}
                {connecting() === wallet.id && ' (connecting...)'}
              </button>
            )}
          </For>
        </div>
      }
    >
      <div>
        <h3>{activeWallet()!.metadata.name} [active]</h3>
        <p>{activeAddress()}</p>
        <button onClick={() => activeWallet()!.disconnect()}>Disconnect</button>
      </div>
    </Show>
  )
}
```

## Sign & Send Transaction

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

## Using with ATC (transactionSigner)

```tsx
import { useWallet } from '@txnlab/use-wallet-solid'
import algosdk from 'algosdk'

function CallContract() {
  const { activeAddress, transactionSigner, algodClient } = useWallet()

  const handleCall = async () => {
    if (!activeAddress()) return

    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient().getTransactionParams().do()

    const method = algosdk.ABIMethod.fromSignature('hello(string)string')
    atc.addMethodCall({
      sender: activeAddress()!,
      signer: transactionSigner,
      appID: 123,
      method,
      methodArgs: ['World'],
      suggestedParams,
    })

    const result = await atc.execute(algodClient(), 4)
    console.log('Return value:', result.methodResults[0].returnValue)
  }

  return <button onClick={handleCall}>Call Contract</button>
}
```

## Key Difference from React

In Solid, reactive values are **signals** — functions that must be called: `activeAddress()` not `activeAddress`. The `transactionSigner` is not a signal and can be passed directly to ATC. Solid uses `Show` and `For` components for conditional/list rendering.
