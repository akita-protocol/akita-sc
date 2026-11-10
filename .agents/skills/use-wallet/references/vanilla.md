# Vanilla JS/TS (No Framework)

Package: `@txnlab/use-wallet`

Use the core library directly when building without a framework (plain TypeScript, vanilla JS, or a non-supported framework). No provider wrapper is needed — you work with `WalletManager` and `BaseWallet` instances directly.

## Installation

```bash
npm install @txnlab/use-wallet algosdk
```

Then install wallet provider packages for the wallets you want to support (see [getting-started.md](getting-started.md)).

## Setup

Create a `WalletManager` instance and call `resumeSessions()` when the page loads to restore previously connected wallets:

```typescript
import { WalletManager, WalletId, NetworkId } from '@txnlab/use-wallet'

const walletManager = new WalletManager({
  wallets: [WalletId.PERA, WalletId.DEFLY, WalletId.LUTE],
  defaultNetwork: NetworkId.TESTNET,
})

// Restore previous wallet sessions
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await walletManager.resumeSessions()
  } catch (error) {
    console.error('Error resuming sessions:', error)
  }
})
```

## Accessing Wallets

`walletManager.wallets` returns a `BaseWallet[]` array of all configured wallet providers:

```typescript
interface BaseWallet {
  id: WalletId
  metadata: { name: string; icon: string }
  accounts: WalletAccount[]
  activeAccount: WalletAccount | null
  isConnected: boolean
  isActive: boolean
  canSignData: boolean
  connect(args?: Record<string, any>): Promise<WalletAccount[]>
  disconnect(): Promise<void>
  setActive(): void
  setActiveAccount(address: string): void
  transactionSigner: algosdk.TransactionSigner
  signTransactions<T>(txnGroup: T | T[], indexesToSign?: number[]): Promise<(Uint8Array | null)[]>
  subscribe(callback: (state: State) => void): () => void
}
```

Iterate wallets to build UI:

```typescript
for (const wallet of walletManager.wallets) {
  console.log(wallet.metadata.name, wallet.isConnected)
}
```

## Subscribing to State

Each wallet exposes a `subscribe()` method that calls your callback whenever the wallet's state changes. It returns an unsubscribe function for cleanup:

```typescript
const wallet = walletManager.wallets[0]

const unsubscribe = wallet.subscribe((state) => {
  console.log('State changed:', state)
  // Re-render your UI here
})

// Clean up when done
window.addEventListener('beforeunload', () => {
  unsubscribe()
})
```

You can also subscribe to the manager for global state changes (across all wallets):

```typescript
const unsubscribe = walletManager.subscribe((state) => {
  console.log('Active wallet:', state.activeWallet)
  console.log('Accounts:', state.wallets)
})
```

## Connecting and Disconnecting

```typescript
const wallet = walletManager.wallets[0]

// Connect
try {
  const accounts = await wallet.connect()
  console.log('Connected accounts:', accounts)
} catch (error) {
  console.error('Connection failed:', error)
}

// Disconnect
await wallet.disconnect()

// Set as active wallet (when multiple wallets are connected)
wallet.setActive()

// Switch active account (when wallet has multiple accounts)
wallet.setActiveAccount(someAddress)
```

## Network Switching

Access and change the active network directly on the manager:

```typescript
// Read current network
console.log(walletManager.activeNetwork) // 'testnet'

// Switch network
await walletManager.setActiveNetwork(NetworkId.MAINNET)

// Update algod config at runtime
walletManager.updateAlgodConfig('mainnet', {
  baseServer: 'https://my-node.example.com',
  token: 'my-token',
})

// Reset to initial config
walletManager.resetNetworkConfig('mainnet')
```

## Sign & Send Transaction

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

## Using with ATC (transactionSigner)

The `transactionSigner` on both `WalletManager` and individual `BaseWallet` instances is a typed `algosdk.TransactionSigner` for use with `AtomicTransactionComposer`:

```typescript
import { WalletManager } from '@txnlab/use-wallet'
import algosdk from 'algosdk'

async function callContract(manager: WalletManager) {
  const activeAddress = manager.activeAddress
  if (!activeAddress) return

  const atc = new algosdk.AtomicTransactionComposer()
  const suggestedParams = await manager.algodClient.getTransactionParams().do()

  const method = algosdk.ABIMethod.fromSignature('hello(string)string')
  atc.addMethodCall({
    sender: activeAddress,
    signer: manager.transactionSigner,
    appID: 123,
    method,
    methodArgs: ['World'],
    suggestedParams,
  })

  const result = await atc.execute(manager.algodClient, 4)
  console.log('Return value:', result.methodResults[0].returnValue)
}
```

## Using with AlgoKit Utils

```typescript
import { WalletManager } from '@txnlab/use-wallet'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { HelloWorldClient } from './artifacts/HelloWorld/client'

async function callWithAlgoKit(manager: WalletManager) {
  const activeAddress = manager.activeAddress
  if (!activeAddress) return

  const algorand = AlgorandClient.fromClients({
    algod: manager.algodClient,
  }).setSigner(activeAddress, manager.transactionSigner)

  const client = algorand.client.getTypedAppClientById(HelloWorldClient, {
    appId: 123n,
  })

  const result = await client
    .newGroup()
    .hello({ args: { name: 'World' } })
    .execute()

  console.log('Return value:', result.return)
}
```

## Connect Wallet Menu Example

A minimal vanilla TypeScript wallet menu with reactive state:

```typescript
import { WalletManager, WalletId, NetworkId, BaseWallet } from '@txnlab/use-wallet'

const manager = new WalletManager({
  wallets: [WalletId.PERA, WalletId.DEFLY, WalletId.LUTE],
  defaultNetwork: NetworkId.TESTNET,
})

const container = document.querySelector<HTMLDivElement>('#app')!
const unsubscribers: (() => void)[] = []

function render() {
  container.innerHTML = ''

  for (const wallet of manager.wallets) {
    const div = document.createElement('div')

    if (wallet.isActive && wallet.activeAccount) {
      div.innerHTML = `
        <h3>${wallet.metadata.name} [active]</h3>
        <p>${wallet.activeAccount.address}</p>
        <button data-action="disconnect" data-wallet="${wallet.id}">Disconnect</button>
      `
    } else if (wallet.isConnected) {
      div.innerHTML = `
        <h3>${wallet.metadata.name} [connected]</h3>
        <button data-action="set-active" data-wallet="${wallet.id}">Set Active</button>
        <button data-action="disconnect" data-wallet="${wallet.id}">Disconnect</button>
      `
    } else {
      div.innerHTML = `
        <h3>${wallet.metadata.name}</h3>
        <button data-action="connect" data-wallet="${wallet.id}">Connect</button>
      `
    }

    container.appendChild(div)
  }
}

// Subscribe to each wallet's state changes
for (const wallet of manager.wallets) {
  unsubscribers.push(wallet.subscribe(() => render()))
}

// Handle button clicks
container.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement
  const action = target.dataset.action
  const walletId = target.dataset.wallet
  if (!action || !walletId) return

  const wallet = manager.wallets.find((w) => w.id === walletId)
  if (!wallet) return

  try {
    if (action === 'connect') await wallet.connect()
    else if (action === 'disconnect') await wallet.disconnect()
    else if (action === 'set-active') wallet.setActive()
  } catch (error) {
    console.error(`${action} failed:`, error)
  }
})

// Initial render + restore sessions
render()
manager.resumeSessions()

// Cleanup
window.addEventListener('beforeunload', () => {
  unsubscribers.forEach((fn) => fn())
})
```
