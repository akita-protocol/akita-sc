# Plugin DEX: integration guide for aggregators

For routers that want to list Plugin DEX pools as a venue: Haystack Router first, and equally Deflex,
Vestige and others. It covers how to find pools, quote them, and swap through them, from an off-chain
engine or from an on-chain router app.

A runnable example that does all three with only `algosdk`, `algokit-utils` and the ARC-56 spec is in
`examples/aggregator-quote-swap.ts`. It was checked on LocalNet against a hooked pool and a bins pool: the
quoted output equalled the received output.

## 1. Contracts and IDs

| Item | Value |
|---|---|
| Vault app (one per network) | MainNet: not deployed yet. TestNet: not deployed yet. IDs are published in `@akta/sdk` `getNetworkAppIds(network).pluginDex`. |
| ABI | `artifacts/plugin-dex/PluginDex.arc56.json` (ARC-56, structs and events included) |
| Upgradability | The Vault is immutable: no update or delete. Its ABI does not change after deployment. |
| Assets | `0` = ALGO. A pool's assets are ordered: `assetA < assetB`, so ALGO is always `assetA`. |

Each pool has its own escrow account: the address of a small child app (`pool.escrow` is its app id),
rekeyed to the Vault. Swap inputs are paid to that escrow address. The Vault is the only app that moves
pool funds.

## 2. Pool discovery

- **All pools.** Pool ids run from `0` to the global state key `pool_cursor` (exclusive).
- **One pool.** Box `"p" ‖ uint64(poolId)` on the Vault holds `PoolInfo`. Decode it with the
  `PoolInfo` struct in the ARC-56 spec (an ARC-4 tuple). The read-only method `getPool(uint64)` returns
  the same tuple.
- **One pair.** The read-only method `getPairPools(assetA, assetB) → uint64[]` lists the first 64 pools
  of a pair. Later pools of the same pair are not indexed, so enumerate by `pool_cursor` for completeness.
- **Hooks.** `getPoolHooks(poolId) → (app, version, points, perms, flags)[]`. A pool's hook stack is fixed
  at creation and pinned to app versions. Box `"h" ‖ uint64(poolId)`.

`PoolInfo` fields an aggregator needs:

| Field | Meaning |
|---|---|
| `assetA`, `assetB` | the pair (`assetA < assetB`) |
| `escrow` | app id whose address holds the reserves and receives swap inputs |
| `curve` | `0` = the Vault's constant product; otherwise a curve app (bins / Liquidity Book) |
| `reserveA`, `reserveB` | booked reserves |
| `externalA`, `externalB` | part of the reserves deployed elsewhere; never paid out by swaps |
| `virtualA`, `virtualB` | launch-curve offsets (non-zero only while a launch pool is bonding) |
| `feeBps` | base LP fee in basis points (hooks may change the fee per swap) |
| `hookPoints` | bitmask of hook points: `32` BeforeSwap, `64` AfterSwap, `128` Quote |
| `paused`, `closed` | skip the pool when either is true |

## 3. Quoting

### 3.1 Exact off-chain math (native pools without pricing hooks)

When `curve == 0` and `hookPoints & (32 | 128) == 0`, the Vault's swap is plain integer constant product.
With `x` the input asset:

```
eIn       = reserveIn  + virtualIn
eOut      = reserveOut + virtualOut
lpFee     = floor(amountIn · feeBps / 10,000)
effective = amountIn − lpFee
amountOut = floor(effective · eOut / (eIn + effective))
valid when 0 < amountOut < reserveOut − externalOut
```

The protocol fee is a share of `lpFee`, so it does not change `amountOut`. This math matched the Vault
exactly over 300 randomized on-chain swaps (`invariants.e2e.spec.ts`).

### 3.2 Simulated quotes (all other pools)

For curve pools (`curve != 0`) and pools with BeforeSwap or Quote hooks, the price can depend on hook state
(dynamic fees, taxes, discounts) or on bin state. Quote them with the read-only methods through `simulate`:

| Method | Use |
|---|---|
| `quote(poolId, assetIn, amountIn, swapper, data, wallet) → uint64` | one pool; reverts `errPdil` when it cannot fill |
| `quoteRoute(uint64[] route, assetIn, amountIn, swapper, data, wallet) → uint64` | a Vault-internal route of up to 4 pools |
| `tryQuoteRoute(...)` | same as `quoteRoute`, but returns `0` instead of reverting. Use it to probe |

- `swapper` is the account that will swap (an address; the zero address means the caller). Some hooks
  price by the swapper (for example a fee discount for pass holders). Pass the account that will actually
  call `swap`, which for an on-chain router is the router's app account. `data = ""` and `wallet = 0`.
- Quote hooks and curves run as inner app calls, so **a simulated quote needs fee credit**. Give the call a
  fee (or let simulate cover inner fees), or it fails with "fee too small".
- Quotes equal swaps for the same state within a block. Time-dependent hooks (volatility fee, anti-snipe,
  bins variable fee) can move between blocks; rely on `minAmountOut`.
- Bins pools cap the bins one swap may cross. A larger trade quotes `0` (`tryQuoteRoute`); split it.

## 4. Swapping

### 4.1 One pool: `swap`

```
[i]   deposit   pay  { receiver: escrowAddress(pool), amount: amountIn }            (ALGO in)
                axfer{ assetReceiver: escrowAddress(pool), xferAsset: assetIn, assetAmount: amountIn }
[i+1] appl      Vault.swap(txn input, uint64 poolId, uint64 minAmountOut, address recipient,
                           byte[] data, uint64 wallet) → uint64 amountOut
```

- The deposit must be the transaction **immediately before** the `swap` call in the same group. This works
  the same inside an inner group sent by a router app.
- The deposit may come from any sender. It must not rekey or close out, and must not be a clawback
  transfer (`errPdin`).
- `recipient` receives the output. The zero address means the `swap` caller (`Txn.sender`). An on-chain
  router can pay its own account or the end user directly.
- `minAmountOut` is checked on the final output (`errPdsl`). There is no deadline argument: the
  transaction's validity window is the deadline.
- `data = ""`, `wallet = 0` for aggregators. `wallet` is an Akita-wallet hint for hooks that discount Akita
  users; it never changes pool math by itself.

### 4.2 Several Plugin DEX pools: `swapRoute`

`swapRoute(txn input, uint64[] route, uint64 minAmountOut, address recipient, byte[] data, uint64 wallet)`
runs up to 4 Plugin DEX pools inside the Vault (no pool twice, `errPdrt`). The deposit goes to the escrow
of `route[0]`. Intermediate amounts move escrow to escrow and never leave the Vault. One `minAmountOut`
applies to the final output.

### 4.3 Fees, opcode budget and references

- **Fees.** Every inner transaction the Vault sends (the payout, hook and curve calls, op-ups) has fee 0.
  The caller's outer fees must cover them (fee pooling). A hookless native swap sends 1 inner transaction,
  so a `swap` fee of 2,000 µALGO is enough. Hooked and curve pools send more: size the fee by simulate.
- **Opcode budget.** The Vault tops up its own budget with fee-0 op-ups paid from the group's fee credit.
  Callers add fee, not budget carrier calls.
- **References.** A hookless native swap needs: the Vault app, the pool box `"p" ‖ id`, the escrow
  account, and both assets. Hooked and curve pools also read their hook or curve apps and boxes, which can
  exceed one call's 8 references. Then place a bare `opUp()` call to the Vault before `swap` as a reference
  carrier (it does nothing), or use access lists. Simulate with "allow unnamed resources" to list exactly
  what a pool needs.
- **Call depth.** Router app → Vault → hook → venue → payout stays within the AVM limit of 8.
- **Backrun pools.** A pool with the BackrunArbHook can run an arbitrage after a swap, which adds up to 11
  inner transactions. Give swaps on such pools that much extra fee credit. The hook appears in
  `getPoolHooks`.

### 4.4 Events

`SwapEvent(uint64 poolId, address caller, uint64 assetIn, uint64 amountIn, uint64 assetOut,
uint64 amountOut, uint64 feeBps, uint64 hookFees, uint64 reserveA, uint64 reserveB)` is logged on every swap
(ARC-28). It carries the post-swap reserves, so an indexer can track pool state from logs. `LiquidityEvent`
does the same for adds and removes.

## 5. Errors an aggregator can hit

| Code | Meaning |
|---|---|
| `errPdsl` | output below `minAmountOut` |
| `errPdil` | not enough liquidity for this amount (or a bins swap past its bin limit) |
| `errPdpp` | the pool is paused |
| `errPdpn` | no such pool |
| `errPdan` | the input asset is not in the pool |
| `errPdin` | bad deposit (wrong receiver, rekey, close-out, clawback, zero amount) |
| `errPdrt` | bad route (empty, more than 4 pools, a repeated pool) |
| `errPdlb` | a launch pool that has not been seeded yet |
| `errPdhf` | hook fees above the pool's cap (a misbehaving hook) |

## 6. Pool risks to surface

- **Issuer powers.** A pool asset with a clawback or freeze address can be clawed out of or frozen in the
  escrow by its issuer. After a clawback the pool's adds and normal removes revert until the pool is paused;
  swaps keep running on the booked reserves. Consider deprioritizing such pools.
- **Hooks.** Hooks are approved by the Akita DAO and pinned by version. A hook can charge a capped fee
  (at most 10% of the input) or change the LP fee within the pool's `maxFeeBps`. Always quote hooked pools
  by simulate.
