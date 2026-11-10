# Testing with Mnemonic Wallet

The Mnemonic wallet provider enables automated testing by allowing direct mnemonic entry, bypassing the UI-based wallet connection flow.

## Security Restrictions

- **Cannot operate on MainNet** — restricted to test networks only
- Mnemonics are stored in plaintext when persistence is enabled
- Test accounts must never contain real assets

## Configuration

```typescript
import { WalletManager, WalletId } from '@txnlab/use-wallet'

const manager = new WalletManager({
  wallets: [
    // Production wallets
    WalletId.PERA,
    WalletId.DEFLY,

    // Test wallet
    {
      id: WalletId.MNEMONIC,
      options: {
        persistToStorage: false, // Default: false
      },
    },
  ],
  defaultNetwork: 'testnet',
})
```

## Session Persistence

**Without persistence** (default, `persistToStorage: false`):

- Mnemonic must be re-entered after page reload
- Session disconnects on page close
- No automatic session resumption

**With persistence** (`persistToStorage: true`):

- Sessions persist until explicit disconnect
- Mnemonic stored in localStorage (security risk, test only)

## Playwright E2E Testing Example

```typescript
import { test, expect } from '@playwright/test'

test('wallet connection flow', async ({ page }) => {
  await page.goto('/')
  await mockAlgodResponses(page)

  // Handle mnemonic prompt dialog
  page.on('dialog', (dialog) =>
    dialog.accept(
      // WARNING: This account is compromised. Use for testing only!
      'sugar bronze century excuse animal jacket what rail biology symbol want craft annual soul increase question army win execute slim girl chief exhaust abstract wink',
    ),
  )

  // Verify Mnemonic wallet is available
  await expect(page.getByRole('heading', { name: 'Mnemonic' })).toBeVisible()

  // Connect to wallet
  await page
    .locator('.wallet-group', {
      has: page.locator('h4', { hasText: 'Mnemonic' }),
    })
    .getByRole('button', { name: 'Connect' })
    .click()

  // Verify connection succeeded
  await expect(
    page.getByRole('heading', { name: 'Mnemonic [active]' }),
  ).toBeVisible()

  // Verify correct account is connected
  await expect(page.getByRole('combobox')).toHaveValue(
    '3F3FPW6ZQQYD6JDC7FKKQHNGVVUIBIZOUI5WPSJEHBRABZDRN6LOTBMFEY',
  )
})
```

## Mocking Algod Responses

```typescript
async function mockAlgodResponses(page: Page) {
  // Mock transaction parameters
  await page.route('**/v2/transactions/params', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        'last-round': 1000,
        'consensus-version': 'test-1.0',
        'min-fee': 1000,
        'genesis-hash': 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
        'genesis-id': 'testnet-v1.0',
      }),
    })
  })

  // Mock transaction submission
  await page.route('**/v2/transactions', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ txId: 'TEST_TX_ID' }),
    })
  })
}
```

## Best Practices

- Create isolated test accounts never used in production
- Mock Algorand node responses to prevent rate-limiting and ensure predictability
- Secure test mnemonics via environment variables in CI/CD
- Test against LocalNet or private networks
- Cover connection flows, account switching, transaction signing, error handling, and network switching

See the use-wallet repository `examples/e2e-tests` for comprehensive test patterns.
