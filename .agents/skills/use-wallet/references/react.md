# React Adapter

Package: `@txnlab/use-wallet-react`

## Installation

```bash
npm install @txnlab/use-wallet-react algosdk
```

## Setup

Wrap your app with `WalletProvider`:

```tsx
import {
  WalletProvider,
  WalletManager,
  NetworkId,
  WalletId,
} from '@txnlab/use-wallet-react'

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

## useWallet Hook

```tsx
import { useWallet } from '@txnlab/use-wallet-react'

function WalletInfo() {
  const {
    wallets, // Wallet[] - available wallets
    activeWallet, // Wallet | null - currently active wallet
    activeAccount, // WalletAccount | null
    activeAddress, // string | null - active account address
    isReady, // boolean - providers initialized
    signTransactions, // sign transaction(s)
    transactionSigner, // algosdk.TransactionSigner for ATC
    signData, // ARC-60 data signing (Lute only)
    algodClient, // algosdk.Algodv2 for active network
  } = useWallet()

  if (!isReady) return <div>Loading...</div>

  return (
    <div>
      {activeAddress ? (
        <div>Connected: {activeAddress}</div>
      ) : (
        <div>Not connected</div>
      )}
    </div>
  )
}
```

**Important**: Check `isReady` before rendering wallet state, especially in SSR to prevent hydration errors.

### Wallet Object Properties

Each item in `wallets` has:

```typescript
interface Wallet {
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
}
```

## useNetwork Hook

Added in v4.0.0, separated from `useWallet` for better separation of concerns.

```tsx
import { useNetwork } from '@txnlab/use-wallet-react'

function NetworkSelector() {
  const {
    activeNetwork, // string - current network ID
    setActiveNetwork, // (networkId: string) => Promise<void>
    networkConfig, // Record<string, NetworkConfig>
    activeNetworkConfig, // NetworkConfig for active network
    updateAlgodConfig, // (networkId: string, config: Partial<AlgodConfig>) => void
    resetNetworkConfig, // (networkId: string) => void
  } = useNetwork()

  return (
    <select
      value={activeNetwork}
      onChange={(e) => setActiveNetwork(e.target.value)}
    >
      {Object.keys(networkConfig).map((networkId) => (
        <option key={networkId} value={networkId}>
          {networkId}
        </option>
      ))}
    </select>
  )
}
```

## Connect Wallet Menu Example

```tsx
import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'

function WalletMenu() {
  const { wallets, activeWallet, activeAddress } = useWallet()
  const [connecting, setConnecting] = useState<string | null>(null)

  if (activeWallet && activeAddress) {
    return (
      <div>
        <h3>{activeWallet.metadata.name} [active]</h3>
        <p>{activeAddress}</p>

        {/* Account selector (if multiple accounts) */}
        {activeWallet.accounts.length > 1 && (
          <select
            value={activeAddress}
            onChange={(e) => activeWallet.setActiveAccount(e.target.value)}
          >
            {activeWallet.accounts.map((account) => (
              <option key={account.address} value={account.address}>
                {account.address.slice(0, 8)}...
              </option>
            ))}
          </select>
        )}

        <button onClick={() => activeWallet.disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      <h3>Connect a Wallet</h3>
      {wallets.map((wallet) => (
        <button
          key={wallet.id}
          disabled={connecting !== null}
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
          <img src={wallet.metadata.icon} alt="" width={24} height={24} />
          {wallet.metadata.name}
          {connecting === wallet.id && ' (connecting...)'}
        </button>
      ))}
    </div>
  )
}
```

## Sign & Send Transaction

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

## Using with ATC (transactionSigner)

```tsx
import { useWallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'

function CallContract() {
  const { activeAddress, transactionSigner, algodClient } = useWallet()

  const handleCall = async () => {
    if (!activeAddress) return

    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()

    const method = algosdk.ABIMethod.fromSignature('hello(string)string')
    atc.addMethodCall({
      sender: activeAddress,
      signer: transactionSigner,
      appID: 123,
      method,
      methodArgs: ['World'],
      suggestedParams,
    })

    const result = await atc.execute(algodClient, 4)
    console.log('Return value:', result.methodResults[0].returnValue)
  }

  return <button onClick={handleCall}>Call Contract</button>
}
```

## Using with AlgoKit Utils

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
      .execute()

    console.log('Return value:', result.return)
  }

  return <button onClick={handleCall}>Call Contract</button>
}
```

## Next.js Considerations

- Check `isReady` to prevent hydration mismatches
- Use `webpackFallback` in next.config.mjs (see getting-started.md)
- Create the `WalletManager` outside of component render
