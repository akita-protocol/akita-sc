# Wallet UI Components

Package: `@txnlab/use-wallet-ui-react` — drop-in React components for wallet connectivity, built as a companion to `@txnlab/use-wallet-react`.

## Installation

```bash
npm install @txnlab/use-wallet-ui-react
```

**Requirements**: `@txnlab/use-wallet-react` v4+, `algosdk` v3+, React 18 or 19.

## Quick Start

```jsx
import {
  NetworkId,
  WalletId,
  WalletManager,
  WalletProvider,
} from '@txnlab/use-wallet-react'
import { WalletUIProvider, WalletButton } from '@txnlab/use-wallet-ui-react'

// Import styles if NOT using Tailwind CSS
import '@txnlab/use-wallet-ui-react/dist/style.css'

const walletManager = new WalletManager({
  wallets: [WalletId.PERA, WalletId.DEFLY, WalletId.LUTE],
  defaultNetwork: NetworkId.TESTNET,
})

function App() {
  return (
    <WalletProvider manager={walletManager}>
      <WalletUIProvider>
        <WalletButton />
      </WalletUIProvider>
    </WalletProvider>
  )
}
```

`WalletButton` handles everything: shows "Connect Wallet" when disconnected, opens wallet selection, displays address/NFD name and avatar when connected, provides account switching and disconnect.

## Styling

### With Tailwind CSS

**Tailwind v4:**

```css
@import 'tailwindcss';
@source "../node_modules/@txnlab/use-wallet-ui-react";
```

**Tailwind v3:**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@txnlab/use-wallet-ui-react/dist/**/*.{js,ts,jsx,tsx}',
  ],
}
```

### Without Tailwind CSS (Standalone)

```jsx
import '@txnlab/use-wallet-ui-react/dist/style.css'
```

## Components

### WalletUIProvider

Required wrapper enabling theming, NFD lookups, and data prefetching.

```jsx
<WalletUIProvider
  theme="system" // 'light' | 'dark' | 'system' (default: 'system')
  enablePrefetching={true} // Prefetch data for all wallet accounts
  prefetchNfdView="thumbnail" // NFD view: 'tiny' | 'thumbnail' | 'brief' | 'full'
  queryClient={queryClient} // Optional: existing Tanstack Query client
>
  {children}
</WalletUIProvider>
```

### WalletButton

All-in-one wallet connection component.

```jsx
<WalletButton
  size="md"              // 'sm' | 'md' | 'lg'
  className="..."        // Additional CSS classes
  style={{...}}          // Inline styles (supports CSS variable overrides)
/>
```

### ConnectWalletMenu

Dropdown menu for wallet selection (disconnected state). Accepts a custom trigger as child.

```jsx
// Default button
<ConnectWalletMenu />

// Custom trigger
<ConnectWalletMenu>
  <button className="my-button">Connect Wallet</button>
</ConnectWalletMenu>
```

### ConnectedWalletMenu

Dropdown menu for account management (connected state). Accepts a custom trigger as child.

```jsx
// Default button
<ConnectedWalletMenu />

// Custom trigger
<ConnectedWalletMenu>
  <button>{activeAddress.slice(0, 8)}...</button>
</ConnectedWalletMenu>
```

### ConnectWalletButton / ConnectedWalletButton

Styled buttons for the connect/connected states.

```jsx
<ConnectWalletButton size="md" className="..." style={{...}}>
  Connect Wallet
</ConnectWalletButton>

<ConnectedWalletButton size="md" className="..." style={{...}} />
```

### NfdAvatar

Renders NFD avatar images with IPFS gateway handling.

```jsx
import { useNfd, NfdAvatar } from '@txnlab/use-wallet-ui-react'

function Profile() {
  const nfdQuery = useNfd()
  return (
    <NfdAvatar
      nfd={nfdQuery.data}
      size={48}
      className="rounded-full"
      alt="Profile"
    />
  )
}
```

### WalletList

Renders available wallets list (used internally by ConnectWalletMenu).

```jsx
<WalletList onWalletSelected={() => closeMenu()} />
```

## Custom Trigger Pattern

For complete control over the trigger button:

```jsx
import { useWallet } from '@txnlab/use-wallet-react'
import {
  ConnectWalletMenu,
  ConnectedWalletMenu,
} from '@txnlab/use-wallet-ui-react'

function CustomWalletButton() {
  const { activeAddress } = useWallet()

  if (activeAddress) {
    return (
      <ConnectedWalletMenu>
        <button className="my-connected-button">
          {activeAddress.slice(0, 8)}...
        </button>
      </ConnectedWalletMenu>
    )
  }

  return (
    <ConnectWalletMenu>
      <button className="my-connect-button">Connect Wallet</button>
    </ConnectWalletMenu>
  )
}
```

## Size Variants

```jsx
<WalletButton size="sm" />  {/* Small */}
<WalletButton size="md" />  {/* Medium (default) */}
<WalletButton size="lg" />  {/* Large */}
```

## CSS Variable Theming

### Available Variables

| Variable                      | Description                   |
| ----------------------------- | ----------------------------- |
| `--wui-color-primary`         | Primary button background     |
| `--wui-color-primary-hover`   | Primary button hover state    |
| `--wui-color-primary-text`    | Primary button text           |
| `--wui-color-bg`              | Panel/dialog background       |
| `--wui-color-bg-secondary`    | Secondary background          |
| `--wui-color-bg-tertiary`     | Tertiary background           |
| `--wui-color-bg-hover`        | Hover background              |
| `--wui-color-text`            | Primary text color            |
| `--wui-color-text-secondary`  | Secondary text color          |
| `--wui-color-text-tertiary`   | Tertiary text color           |
| `--wui-color-border`          | Border color                  |
| `--wui-color-link`            | Link color                    |
| `--wui-color-link-hover`      | Link hover color              |
| `--wui-color-overlay`         | Modal overlay color           |
| `--wui-color-danger-bg`       | Danger button background      |
| `--wui-color-danger-bg-hover` | Danger button hover           |
| `--wui-color-danger-text`     | Danger button text            |
| `--wui-color-avatar-bg`       | Avatar placeholder background |
| `--wui-color-avatar-icon`     | Avatar placeholder icon       |

### Global Override

```css
[data-wallet-theme] {
  --wui-color-primary: #8b5cf6;
  --wui-color-primary-hover: #7c3aed;
  --wui-color-primary-text: #ffffff;
}
```

### Inline Override

```jsx
<WalletButton
  style={{
    '--wui-color-primary': '#10b981',
    '--wui-color-primary-hover': '#059669',
  } as React.CSSProperties}
/>
```

## Dark Mode

Theme detection order (first match wins):

1. `data-theme` attribute set by `WalletUIProvider` `theme` prop
2. `.dark` class on any ancestor (Tailwind convention)
3. `prefers-color-scheme` media query (when `theme="system"`)

### Theme-Aware Customization

```css
.amber-theme {
  --wui-color-primary: #f59e0b;
  --wui-color-primary-hover: #d97706;
}

.dark .amber-theme {
  --wui-color-primary: rgba(245, 179, 71, 0.15);
  --wui-color-primary-hover: rgba(245, 179, 71, 0.25);
}
```

### Accessing Theme State

```jsx
import { useWalletUI } from '@txnlab/use-wallet-ui-react'

function MyComponent() {
  const { theme, resolvedTheme } = useWalletUI()
  // theme: 'light' | 'dark' | 'system' (the prop value)
  // resolvedTheme: 'light' | 'dark' (the actual theme)
}
```

## Hooks

### useNfd

```jsx
import { useNfd } from '@txnlab/use-wallet-ui-react'

const nfdQuery = useNfd({ enabled: true, view: 'thumbnail' })
// nfdQuery.data?.name, nfdQuery.isLoading, etc.
```

### useAccountInfo

```jsx
import { useAccountInfo } from '@txnlab/use-wallet-ui-react'

const accountQuery = useAccountInfo()
const algoBalance = Number(accountQuery.data?.amount) / 1_000_000
```

## Tanstack Query Integration

Share an existing `QueryClient` to avoid duplicate caches:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider manager={walletManager}>
        <WalletUIProvider queryClient={queryClient}>
          {/* Your app */}
        </WalletUIProvider>
      </WalletProvider>
    </QueryClientProvider>
  )
}
```
