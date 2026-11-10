# Custom Provider

Build your own wallet provider by implementing the `CustomProvider` interface.

## CustomProvider Interface

```typescript
interface CustomProvider {
  // Required: connect and return accounts
  connect(args?: Record<string, any>): Promise<WalletAccount[]>

  // Optional: clean up resources on disconnect
  disconnect?(): Promise<void>

  // Optional: restore existing session, return accounts or void
  resumeSession?(): Promise<WalletAccount[] | void>

  // Optional: sign transactions (implement at least one signer)
  signTransactions?(
    txnGroup:
      | algosdk.Transaction[]
      | Uint8Array[]
      | (algosdk.Transaction[] | Uint8Array[])[],
    indexesToSign?: number[],
  ): Promise<(Uint8Array | null)[]>

  // Optional: ATC-compatible signer (returns only signed txns)
  transactionSigner?(
    txnGroup: algosdk.Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]>
}

interface WalletAccount {
  name: string // Display name
  address: string // Algorand address
}
```

## Implementation Example

```typescript
import { CustomProvider, WalletAccount } from '@txnlab/use-wallet'
import algosdk from 'algosdk'

class MyWalletProvider implements CustomProvider {
  private accounts: WalletAccount[] = []

  async connect(): Promise<WalletAccount[]> {
    // Your connection logic (e.g., browser extension API, WebSocket, etc.)
    this.accounts = [{ name: 'Account 1', address: 'ALGO_ADDRESS_HERE' }]
    localStorage.setItem('wallet-connected', 'true')
    return this.accounts
  }

  async disconnect(): Promise<void> {
    this.accounts = []
    localStorage.removeItem('wallet-connected')
  }

  async resumeSession(): Promise<WalletAccount[] | void> {
    if (localStorage.getItem('wallet-connected')) {
      return this.connect()
    }
  }

  async signTransactions(
    txnGroup: algosdk.Transaction[] | Uint8Array[],
    indexesToSign?: number[],
  ): Promise<(Uint8Array | null)[]> {
    const txns = txnGroup.map((txn) =>
      txn instanceof Uint8Array
        ? algosdk.decodeSignedTransaction(txn).txn
        : txn,
    )

    const idxs = indexesToSign ?? txns.map((_, i) => i)

    return txns.map((txn, i) => {
      if (!idxs.includes(i)) return null
      // Sign the transaction with your wallet's signing mechanism
      return /* signed transaction Uint8Array */
    })
  }

  async transactionSigner(
    txnGroup: algosdk.Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> {
    const signed = await this.signTransactions(txnGroup, indexesToSign)
    return signed.filter((s): s is Uint8Array => s !== null)
  }
}
```

## WalletManager Configuration

```typescript
import { WalletManager, WalletId } from '@txnlab/use-wallet'

const manager = new WalletManager({
  wallets: [
    {
      id: WalletId.CUSTOM,
      options: {
        provider: new MyWalletProvider(),
      },
      metadata: {
        name: 'My Wallet',
        icon: '/path/to/icon.svg',
      },
    },
  ],
  defaultNetwork: 'testnet',
})
```

## Required vs Optional Methods

| Method                | Required | Notes                                              |
| --------------------- | -------- | -------------------------------------------------- |
| `connect()`           | Yes      | Must return `WalletAccount[]`                      |
| `disconnect()`        | No       | Clean up resources, remove listeners               |
| `resumeSession()`     | No       | Restore existing session on page load              |
| `signTransactions()`  | No\*     | Direct signing, returns `(Uint8Array \| null)[]`   |
| `transactionSigner()` | No\*     | ATC-compatible, returns only signed `Uint8Array[]` |

\*Implement at least one signing method for transaction support.

## Usage in Components

Once configured, the custom wallet appears in the `wallets` array like any other wallet:

```tsx
import { useWallet } from '@txnlab/use-wallet-react'

function App() {
  const { wallets, activeAddress } = useWallet()

  // Custom wallet is available alongside built-in wallets
  return (
    <div>
      {wallets.map((wallet) => (
        <button key={wallet.id} onClick={() => wallet.connect()}>
          <img src={wallet.metadata.icon} alt="" />
          {wallet.metadata.name}
        </button>
      ))}
    </div>
  )
}
```
