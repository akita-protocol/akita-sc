# Svelte Adapter

Package: `@txnlab/use-wallet-svelte`

Built on TanStack Store for cross-framework consistency.

## Installation

```bash
npm install @txnlab/use-wallet-svelte algosdk
```

## Setup

Initialize in your root layout (`+layout.svelte`):

```typescript
<script lang="ts">
  import { useWalletContext, WalletManager, NetworkId, WalletId } from '@txnlab/use-wallet-svelte'

  const manager = new WalletManager({
    wallets: [WalletId.PERA, WalletId.DEFLY, WalletId.LUTE],
    defaultNetwork: NetworkId.TESTNET,
  })

  useWalletContext(manager)
</script>

<slot />
```

**Note**: No wrapper component needed — `useWalletContext` sets up Svelte context directly.

## useWallet Primitive

**Important**: Svelte primitives return objects with a `.current` property for reactive values.

```typescript
<script lang="ts">
  import { useWallet } from '@txnlab/use-wallet-svelte'

  const {
    wallets,              // Map of wallet instances
    activeWallet,         // { current: Wallet | null }
    activeAccount,        // { current: WalletAccount | null }
    activeAddress,        // { current: string | null }
    isReady,              // () => boolean
    signTransactions,     // sign function
    transactionSigner,    // algosdk.TransactionSigner
    signData,             // ARC-60 (Lute only)
    algodClient,          // { current: algosdk.Algodv2 }
  } = useWallet()
</script>

{#if isReady()}
  {#if activeAddress.current}
    <div>Connected: {activeAddress.current}</div>
  {:else}
    <div>Not connected</div>
  {/if}
{:else}
  <div>Loading...</div>
{/if}
```

## useNetwork Primitive

```typescript
<script lang="ts">
  import { useNetwork } from '@txnlab/use-wallet-svelte'

  const {
    activeNetwork,        // { current: string }
    setActiveNetwork,     // (networkId: string) => Promise<void>
    networkConfig,        // () => Record<string, NetworkConfig>
    activeNetworkConfig,  // { current: NetworkConfig }
    updateAlgodConfig,    // (networkId, config) => void
    resetNetworkConfig,   // (networkId) => void
  } = useNetwork()
</script>

<select
  value={activeNetwork.current}
  onchange={(e) => setActiveNetwork((e.target as HTMLSelectElement).value)}
>
  {#each Object.keys(networkConfig()) as networkId}
    <option value={networkId}>{networkId}</option>
  {/each}
</select>
```

## Connect Wallet Menu Example

```typescript
<script lang="ts">
  import { useWallet } from '@txnlab/use-wallet-svelte'

  const { wallets, activeWallet, activeAddress } = useWallet()
  let connecting = $state<string | null>(null)

  const connectWallet = async (wallet: any) => {
    connecting = wallet.id
    try {
      await wallet.connect()
    } catch (error) {
      console.error('Failed to connect:', error)
    } finally {
      connecting = null
    }
  }
</script>

{#if activeWallet.current && activeAddress.current}
  <div>
    <h3>{activeWallet.current.metadata.name} [active]</h3>
    <p>{activeAddress.current}</p>
    <button onclick={() => activeWallet.current!.disconnect()}>Disconnect</button>
  </div>
{:else}
  <div>
    <h3>Connect a Wallet</h3>
    {#each [...wallets.values()] as wallet}
      <button
        disabled={connecting !== null}
        onclick={() => connectWallet(wallet)}
      >
        {wallet.metadata.name}
        {#if connecting === wallet.id} (connecting...){/if}
      </button>
    {/each}
  </div>
{/if}
```

## Sign & Send Transaction

```typescript
<script lang="ts">
  import { useWallet } from '@txnlab/use-wallet-svelte'
  import algosdk from 'algosdk'

  const { activeAddress, signTransactions, algodClient } = useWallet()

  const handleSend = async () => {
    if (!activeAddress.current) return

    const suggestedParams = await algodClient.current.getTransactionParams().do()
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: activeAddress.current,
      receiver: activeAddress.current,
      amount: 0,
      suggestedParams,
    })

    const signedTxns = await signTransactions([transaction])
    const { txid } = await algodClient.current.sendRawTransaction(signedTxns).do()
    const result = await algosdk.waitForConfirmation(algodClient.current, txid, 4)
    console.log(`Confirmed at round ${result['confirmed-round']}`)
  }
</script>

<button onclick={handleSend}>Send Transaction</button>
```

## Using with ATC (transactionSigner)

```typescript
<script lang="ts">
  import { useWallet } from '@txnlab/use-wallet-svelte'
  import algosdk from 'algosdk'

  const { activeAddress, transactionSigner, algodClient } = useWallet()

  const handleCall = async () => {
    if (!activeAddress.current) return

    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.current.getTransactionParams().do()

    const method = algosdk.ABIMethod.fromSignature('hello(string)string')
    atc.addMethodCall({
      sender: activeAddress.current,
      signer: transactionSigner,
      appID: 123,
      method,
      methodArgs: ['World'],
      suggestedParams,
    })

    const result = await atc.execute(algodClient.current, 4)
    console.log('Return value:', result.methodResults[0].returnValue)
  }
</script>

<button onclick={handleCall}>Call Contract</button>
```

## Key Differences from React

- No wrapper component — use `useWalletContext(manager)` in root layout
- Access reactive values via `.current` property: `activeAddress.current` not `activeAddress`
- Some values like `isReady` and `networkConfig` are functions: call as `isReady()`
- Uses Svelte 5 runes syntax (`$state`, `$derived`) for local reactivity
- Event handlers use lowercase: `onclick`, `onchange` (not `onClick`, `onChange`)
