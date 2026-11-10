# React Integration

## Setup

Install dependencies:

```bash
npm install @txnlab/haystack-router @txnlab/use-wallet-react algosdk
```

Wrap your app with `WalletProvider`:

```tsx
import { WalletProvider, WalletId } from '@txnlab/use-wallet-react'

const walletProviders = [
  { id: WalletId.PERA },
  { id: WalletId.DEFLY },
  { id: WalletId.LUTE },
]

function App() {
  return (
    <WalletProvider wallets={walletProviders}>
      <SwapInterface />
    </WalletProvider>
  )
}
```

## Basic Swap Component

```tsx
import { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { RouterClient, type SwapQuote } from '@txnlab/haystack-router'

function SwapInterface() {
  const { activeAddress, transactionSigner } = useWallet()
  const [amount, setAmount] = useState('')
  const [fromAsset, setFromAsset] = useState(0) // ALGO
  const [toAsset, setToAsset] = useState(31566704) // USDC
  const [slippage, setSlippage] = useState('1')
  const [quote, setQuote] = useState<SwapQuote | null>(null)

  const getQuote = async () => {
    const router = new RouterClient({
      apiKey: import.meta.env.VITE_HAYSTACK_API_KEY,
      autoOptIn: true,
    })

    const amountInBaseUnits = BigInt(Math.floor(parseFloat(amount) * 1_000_000))

    const result = await router.newQuote({
      fromASAID: fromAsset,
      toASAID: toAsset,
      amount: amountInBaseUnits,
      address: activeAddress!,
    })

    setQuote(result)
  }

  const executeSwap = async () => {
    if (!quote || !activeAddress) return

    const router = new RouterClient({
      apiKey: import.meta.env.VITE_HAYSTACK_API_KEY,
      autoOptIn: true,
    })

    const swap = await router.newSwap({
      quote,
      address: activeAddress,
      signer: transactionSigner,
      slippage: parseFloat(slippage),
    })

    const result = await swap.execute()
    console.log(`Confirmed in round ${result.confirmedRound}`)

    setQuote(null) // Clear stale quote
  }

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={getQuote} disabled={!activeAddress || !amount}>
        Get Quote
      </button>

      {quote && (
        <div>
          <p>Output: {(Number(quote.quote) / 1e6).toFixed(4)} USDC</p>
          <p>USD value: ${quote.usdOut.toFixed(2)}</p>
          <p>
            Route:{' '}
            {Object.entries(quote.flattenedRoute)
              .map(([protocol, pct]) => `${protocol}: ${pct}%`)
              .join(', ')}
          </p>
          <button onClick={executeSwap}>Execute Swap</button>
        </div>
      )}
    </div>
  )
}
```

## TanStack Query Integration

For production UIs, use TanStack Query for auto-refreshing quotes and better state management.

```bash
npm install @tanstack/react-query
```

```tsx
import { useState, useEffect, useMemo } from 'react'
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useWallet } from '@txnlab/use-wallet-react'
import { RouterClient, type SwapQuote } from '@txnlab/haystack-router'

const queryClient = new QueryClient()

function SwapWithAutoRefresh() {
  const { activeAddress, transactionSigner } = useWallet()
  const [amount, setAmount] = useState('')
  const [debouncedAmount, setDebouncedAmount] = useState('')
  const [fromAsset] = useState(0)
  const [toAsset] = useState(31566704)
  const [slippage] = useState(1)

  // Debounce amount input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedAmount(amount), 500)
    return () => clearTimeout(timer)
  }, [amount])

  const router = useMemo(
    () =>
      new RouterClient({
        apiKey: import.meta.env.VITE_HAYSTACK_API_KEY,
        autoOptIn: true,
      }),
    [],
  )

  const isValidRequest =
    activeAddress && debouncedAmount && parseFloat(debouncedAmount) > 0

  // Auto-fetch and refresh quotes
  const {
    data: quote,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['quote', fromAsset, toAsset, debouncedAmount, activeAddress],
    queryFn: () =>
      router.newQuote({
        fromASAID: fromAsset,
        toASAID: toAsset,
        amount: BigInt(Math.floor(parseFloat(debouncedAmount) * 1_000_000)),
        address: activeAddress!,
      }),
    enabled: !!isValidRequest,
    refetchInterval: 15_000, // Refresh every 15 seconds
    retry: 1,
  })

  // Swap mutation
  const swapMutation = useMutation({
    mutationFn: async () => {
      if (!quote || !activeAddress) throw new Error('Missing quote or address')

      const swap = await router.newSwap({
        quote,
        address: activeAddress,
        signer: transactionSigner,
        slippage,
      })
      return swap.execute()
    },
    onSuccess: (result) => {
      console.log(`Confirmed in round ${result.confirmedRound}`)
      queryClient.invalidateQueries({ queryKey: ['quote'] })
    },
  })

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      {isLoading && <p>Fetching quote...</p>}
      {error && <p>Error: {(error as Error).message}</p>}

      {quote && (
        <div>
          <p>Output: {(Number(quote.quote) / 1e6).toFixed(4)} USDC</p>
          <p>USD: ${quote.usdOut.toFixed(2)}</p>
          <button
            onClick={() => swapMutation.mutate()}
            disabled={swapMutation.isPending}
          >
            {swapMutation.isPending ? 'Swapping...' : 'Swap'}
          </button>
        </div>
      )}
    </div>
  )
}
```

Key patterns:

- **Debounced input**: Prevent quote requests on every keystroke
- **Auto-refresh**: `refetchInterval: 15_000` keeps quotes current
- **Invalidation**: Clear stale quotes after a successful swap
- **Loading/error states**: TanStack Query manages all async state

## Displaying Route Details

```tsx
function RouteDisplay({ quote }: { quote: SwapQuote }) {
  return (
    <div>
      <h4>Route</h4>
      {quote.route.map((route, i) => (
        <div key={i}>
          <strong>{route.percentage}%</strong>
          {route.path.map((hop, j) => (
            <span key={j}>
              {j > 0 && ' → '}
              {hop.in.unit_name} → {hop.out.unit_name} ({hop.name})
            </span>
          ))}
        </div>
      ))}
      {quote.userPriceImpact !== undefined && (
        <p>Price impact: {quote.userPriceImpact.toFixed(2)}%</p>
      )}
    </div>
  )
}
```
