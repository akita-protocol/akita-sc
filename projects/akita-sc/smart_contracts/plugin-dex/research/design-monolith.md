# PluginDex v2, monolith angle: pool types compiled in

Status: research and design only. No existing source file was changed. The only new
files are this document and the inert prototype copies in
`research/monolith-prototype/*.txt`. The `.txt` suffix keeps them out of
`npm run build`, tsc and eslint.

Angle: keep the pricing curves inside PluginDex and branch on `pool.poolType`. Code
moves to another app only when the 8 KB program limit forces it. The goals, in
order: the fewest inner calls and lowest fees per swap, then the simplest trust
model.

Inputs read: `contract.algo.ts`, `types.ts`, `constants.ts`, `errors.ts`,
`hook-interface.ts`, `hooks/*`, `tests/mock-dex-hook.algo.ts`,
`plugin-dex.e2e.spec.ts`, `ARCHITECTURE.md`, `escrow/contract.algo.ts`,
`arc58/account` (`arc58_rekeyToPlugin`), `arc58/plugins/haystack-router`,
`utils/functions.ts` (`gateCall`, `getStakingPower`, `getSpendingAccount`,
`rekeyAddress`, `getWalletID`), `scripts/lib/immutable-catalog.json` and
`immutable-deployment.ts`. I checked every PuyaTs API used here against
`node_modules/@algorandfoundation/algorand-typescript` (1.3.1):

- `box.d.ts`: `Box.create({size})`, `extract`, `replace`, `splice`, `resize`
- `op.d.ts`: `AppGlobal.getExUint64`, `setBit`, `extractUint64`, `divmodw`, `bitLength`
- `itxn.d.ts`: `keyRegistration`, `submitGroup`
- `arc4/c2c.d.ts`: `abiCall` with gtxn arguments given as `itxn.*` params; `compileArc4`
- `compiled.d.ts`: `extraProgramPages`
- `util.d.ts`: `ensureBudget`, `OpUpFeeSource`

---

## 0. TL;DR

1. **A true monolith does not fit.** I compiled a realistic prototype of the
   all-in-one v2 contract with puya-ts 1.3.1 / puya 5.10.1. It has CP + bins +
   launch pool types, the generalized guard, external positions, forwarders, the
   revised hook context, and the current `loggedAssert` style. The approval
   program is **10,387 bytes**. The AVM cap is 8,192 bytes, including a clear
   program of about 4 bytes. Even with plain `assert` and pool creation moved out,
   it is **8,727 bytes**.
2. **Box ownership sets the split.** An app can only read and write its own boxes.
   So "a stateless BinMath helper" cannot work: bin state has to live in the app
   that runs the bin math. Pool creation, by contrast, can move out, because the
   escrow is rekeyed and then registered.
3. **Recommended layout: three immutable apps, deployed and wired as one set,
   plus a fourth (`PluginDexExternal`) for the reason given in item 6.**

   | App | Role | Measured approval |
   |---|---|---|
   | `PluginDex` (core) | Every fund path: per-pool escrows (rekeyed to core), CP and Launch curves compiled in, hooks, generalized custody guard, external-position ledger, forwarders, routes, quotes | **7,668 B** (`assert`); 8,258 B with `loggedAssert`, which is over the cap |
   | `PluginDexBins` (bins book) | Bin pages, LP positions, bin math. Holds no pool funds. | **2,305 B** |
   | `PluginDexFactory` | Hook and valuer approvals, pool creation (escrow create, fund, opt in, rekey to core), pair index | **1,566 B** (includes the 189 B embedded Escrow) |

4. **Cost per swap.**
   - CP and Launch swaps have zero overhead from the split: one inner payout, the
     same as v1.
   - A bins swap adds one inner app call (`PluginDexBins.swap`). That call adds
     700 to the pooled opcode budget, and a bins swap would have needed about one
     op-up anyway, so the call does useful work where an empty op-up would
     otherwise go. Net cost: about 0 to 1 extra min-fee.
5. **Generalized custody guard: "the custody delta must be a feasible zero-fee
   trade against the pool's own curve."** The core books a custody hook's net
   change as a swap through `curveSwap` with fee 0. It requires the curve output
   to be at least what the hook took, and donates any surplus to LPs. For CP this
   is exactly the v1 rule `k' >= k`. For bins it walks the bins. No pool type needs
   a separate invariant function. External positions join through
   *effective reserves* (liquid plus booked valuation), with a markup rate limit,
   a per-position cap, and in-kind exit.
6. **Size is the main risk, and it changes the final answer.** The measured core
   (7,668 B) does not yet have `init`, `seedLaunch`, the `quoteIsA` branches or the
   `getPoolHooks` view. Adding them projects to about 8.0 KB, which is over the
   cap. **Because external positions are in scope, plan a fourth immutable app
   from the start: `PluginDexExternal`.** It holds the external-position ledger
   and calls the valuers, and the core keeps only the `externalA`/`externalB`
   totals. Effects:
   - the core drops to about 7.35 KB, with about 840 B of headroom;
   - an extra inner call happens only on pools that declare external positions,
     so CP, Launch and bins swaps are unaffected.

   Section 1.4 lists the pressure valves. Section 12 lists what must be frozen
   now.

---

## 1. Program size, measured

### 1.1 Method

- Prototype sources are in `research/monolith-prototype/` (`*.algo.ts.txt`).
- Compile: `node node_modules/@algorandfoundation/puya-ts/bin/run-cli.mjs <dir> --output-bytecode`.
  This is the same compiler as `npm run build` (default `--optimization-level 1`;
  level 2 gave identical or larger output).
- Sizes are the byte length of `*.approval.bin`. The per-subroutine split comes
  from `pc_events` in `*.approval.puya.map`.
- Baseline check: the current `PluginDex` compiles to **5,697 B**, which matches
  `PluginDex.arc56.json`.
- The prototypes are not audited or tested. They are size probes that implement
  the real logic shapes (loops, box I/O, BigUint math, struct copies, abiCalls).

### 1.2 Results

| Variant | Approval bytes | Fits 8,188? |
|---|---|---|
| v1 today (`PluginDex`) | 5,697 | yes |
| **A**: one app, everything (`loggedAssert`) | 10,387 | **no** (+2.2 KB) |
| A with `assert` | 9,592 | no |
| **B**: core with bins compiled in + factory split (`assert`) | 8,727 | **no** |
| B without external positions (estimate: 8,727 − 830) | ~7,900 | barely, no headroom |
| **C**: core + bins book + factory (`assert`), core | **7,668** | **yes, ~520 B headroom** |
| C, bins book | 2,305 | yes |
| C, factory | 1,566 | yes |
| C with `loggedAssert` everywhere, core | 8,258 | **no** |
| C core without external positions (measured) | 6,837 | yes, ~1.35 KB headroom |
| **Projection: C core with the full section 4.1 ABI** (7,668 + `init` ~60 + `seedLaunch` ~120 + `getPoolHooks` ~35 + `quoteIsA` branches ~80 + v1 `quote` alias ~40 + `AfterGraduate` dispatch ~30) | **~8,030** | **no**; ~7,770 after valves 1 and 2 (no headroom) |
| **Projection: C + `PluginDexExternal` (valve 3), core** | **~7,350** (`assert`) / ~7,950 (`loggedAssert`) | **yes**, ~840 B headroom with `assert` |

Biggest subroutines in the C core:

| Bytes | Subroutine |
|---|---|
| 1,026 | `runHooks` (custody, guard, external re-mark, fee perms) |
| 621 | `registerPool` |
| 616 | `addLiquidity` (CP) |
| 614 | `addBinLiquidity` (core-side wrapper) |
| 592 | `removeCore` (includes in-kind external exit) |
| 484 | `revalueExternals` |
| 438 | `removeBinLiquidity` |
| 394 | `swapCore` (includes graduation) |
| 376 | `curveSwap` (CP math + bins dispatch) |
| 272 | router and constant blocks |
| 266 | `swapRoute` |
| 152 | `quoteRoute` |
| 138 | `sync` |
| 137 | `swap` |
| 130 | `context` |
| 125 | `quoteCore` |
| 103 | `collectProtocolFees` |
| 95 | `donate` |
| 90 | `readDeposit` |

Bins book: `addLiquidity` 623, `swap` 488, `removeLiquidity` 323,
`writeBin`/`readBin`/`binPrice` about 113 each, `initBinStep` 113.

### 1.3 Findings that drive the design

- **`loggedAssert` costs about 8 to 9 B per call site** (`bytec; log; err` plus a
  branch). `assert` costs 1 to 2 B. Across about 85 sites in the core that is
  **about 800 B**. With `assert`, the error code still ships: it is the assert
  message in ARC-56 `sourceInfo`, and algokit maps it for top-level failures. It
  is not in the logs of a failed *inner* call. That matters for router-to-core
  failures, so the router plugin should keep `loggedAssert`.
- **`compileArc4(Escrow)` embeds the Escrow program**, about 189 B, inside
  `createPool`. In v1, `createPool` alone is 1,081 B. Moving creation to the
  factory saves about 830 B net of the `registerPool` glue.
- **Bins are about 2.3 KB of code**, and their state has to live with that code.
  That is the reason for the bins book.
- **External positions cost about 830 B in the core** (ledger, re-marking,
  in-kind exit, `revalue`/`sync`).

### 1.4 Pressure valves, in order, if the real core grows past 7,800 B

1. Drop `quoteRoute` (152 B; the router composes `quote` calls). Merge
   `emergencyRemoveLiquidity` into `removeLiquidity` (when paused, it skips hooks;
   −66 B).
2. Compute `spotPrice` once per hook point rather than once per hook (about −40 B
   and fewer opcodes).
3. **Move the external ledger to a fourth immutable app, `PluginDexExternal`.**
   It holds the ledger and the valuer calls and returns `(externalA, externalB)`
   to the core. Savings: about −830 B, plus about 150 B of glue, so about −680 B
   net. It costs one inner call per custody invocation of an external hook and
   per `revalue`. This also brings `loggedAssert` back within budget (about
   7.6 KB).
4. As a last resort, move CP `addLiquidity` math into a pure helper. I do not
   recommend it: it adds an inner call on every LP operation.

**Decide now:** add a CI size gate (core ≤ 7,800 B, every app ≤ 8,000 B). It can
be a vitest test that reads `byteCode.approval` from each `arc56.json`. Once the
code is immutable, there is no later fix.

---

## 2. Contract decomposition

```
               ┌──────────────── PluginDexFactory (immutable) ────────────────┐
 creator ─pay─▶│ approvals: hooks 'a', valuers 'v' │ pair index 'x' │ createPool │
               └───────┬──────────────────────────────────────────────────────┘
                       │ creates Escrow child, funds, opts in, rekeys → core
                       │ inner group [pay → core, core.registerPool(...)]
                       ▼
 trader/LP/router ─▶ PluginDex core (immutable)  ──── abiCall (bins pools only) ───▶ PluginDexBins (immutable)
                    boxes: pools 'p', hooks 'h',                                   boxes: pages 'b', positions 'q',
                    externals 'e', forwarders 'f'                                  price tables 't'
                    owns: LP ASAs (unissued supply)                                funds: box MBR only
                    controls: every pool escrow (auth addr = core)
                       │ flash rekey (custody)          │ abiCall (readonly)
                       ▼                                ▼
                    hook apps (approved)             valuer apps (approved)
```

Section 12 item 1 adds a fourth app, `PluginDexExternal`. It holds the
external-position ledger (box `'e'`) and makes the valuer calls, and is callable
only by the core. The core keeps `externalA`/`externalB` inside `PoolInfo` and
moves every receipt-ASA transfer itself. Section 7 describes the ledger as if it
were in the core; the logic is the same in either app.

### 2.1 Which app holds what

| App | State | Funds | Authority |
|---|---|---|---|
| core | pools, hook stacks, externals ledger, forwarders, `factory`, `bins`, `admin`, `protocolFeeBps`, `treasury`, `poolCursor` | MBR for its boxes; unissued LP supply of every CP/Launch pool | auth address of every pool escrow |
| pool escrow (`Escrow` child of the factory, one per pool) | none (the creator global holds the core id) | reserves (liquid), protocol fees, in-flight swap amounts, receipt ASAs for external positions | rekeyed to core; flash-rekeyed to one custody hook at a time |
| bins book | bin pages, positions, price tables, `core` | box MBR (paid by LPs and initializers) | only the core may call mutating methods |
| factory | hook and valuer approvals, pair index, `core`, `bins`, `admin` | transient creation funds | creates and rekeys escrows; no residual power (below) |
| hooks, valuers, adapters | their own | their own (hook fees, the backrun hook's float) | admin-approved |

**Per-pool escrows stay** (Kyle's decision). The factory creates each one, so
`Escrow.creator` is the factory. Once `Escrow.rekey(core)` has run, the factory
cannot reach the escrow again:

- `Escrow.rekey` and `Escrow.delete` send from the escrow's own address, which is
  now authorized by the core.

The core does not trust the escrow because of where it came from. It checks
`escrowApp.address.authAddress === core` inside `registerPool`. `registerPool`
accepts calls only from the pinned factory.

### 2.2 Wiring and immutability

- `scripts/lib/immutable-deployment.ts` deploys through one create method with
  positive app-id args. The three apps point at each other, so wiring is a
  set-once `init` call:
  1. `core.create(version, admin)`
  2. `bins.create(core)`
  3. `factory.create(admin)`, then `factory.init(core, bins)` (admin, once)
  4. `core.init(factory, bins)` (admin, once). It checks the back-pointers with
     `op.AppGlobal.getExUint64(factory, 'core') === Global.currentApplicationId.id`,
     and the same for `bins`, so the core can never be wired to an impostor.
- No app has `UpdateApplication`. All three go in `immutable-catalog.json`:
  `PluginDex` (keep the key and class name), `PluginDexBins`, `PluginDexFactory`.
- A new pool type such as stable-swap or weighted means **a new core set**, with
  liquidity migrating by user choice (section 11.4). This is the honest cost of
  compiled-in pool types. The modular angle trades it for one inner call on every
  curve operation.

---

## 3. Data types (`types.ts` v2)

All are native PuyaTs object types, encoded as ARC-4 structs. Field order is part
of the frozen ABI.

```ts
export type PoolInfo = {
  poolType: uint64            // PoolTypeConstantProduct=0 | PoolTypeBins=1 | PoolTypeLaunch=2
  assetA: uint64              // lower asset id (0 = ALGO)
  assetB: uint64
  escrow: uint64              // child Escrow app, auth addr = core
  lpAsset: uint64             // CP / Launch; 0 for bins (bins LP = positions in the book)
  reserveA: uint64            // effective reserves = liquid + external booked (bins: sum of bins)
  reserveB: uint64
  lpSupply: uint64            // CP / graduated Launch; includes the burned MinimumLiquidity
  feeBps: uint64              // base LP fee, overridable per swap by DynamicFee hooks
  maxHookFeeBps: uint64
  hookPoints: uint64          // union of installed hooks' points
  protocolFeesA: uint64       // held by the escrow outside reserves
  protocolFeesB: uint64
  binStep: uint64             // bins: bps per bin
  activeId: uint64            // bins: active bin id in [0, MaxBinId]
  binPrice: bytes<16>         // bins: Q64.64 price (A in B) of the active bin, cached from the book
  virtualA: uint64            // launch: virtual reserves added for pricing only
  virtualB: uint64
  graduateAt: uint64          // launch: real quote-side reserve that triggers graduation
  quoteIsA: boolean           // launch: which side is the quote asset (ALGO is always A)
  externalA: uint64           // booked external valuation inside reserveA
  externalB: uint64
  createdAt: uint64           // Global.latestTimestamp at registration (anti-snipe, oracles)
  creator: Account
  paused: boolean
}
```

Note on `quoteIsA`: pairs are sorted by asset id, so an ALGO-quoted launch always
has the token on side B. The prototype assumed the quote was B. The production
version must branch on `quoteIsA`.

```ts
export type HookConfig = { app: uint64; points: uint64; perms: uint64 }   // unchanged

export type ExternalPosition = {
  hook: uint64               // custody hook (perms ⊇ Custody|External) that manages it
  valuer: uint64             // admin-approved ExternalValuer app
  side: uint64               // 0 = counts toward reserveA, 1 = reserveB
  receipt: uint64            // ASA the escrow holds for this position (required in v2)
  capBps: uint64             // booked <= capBps * effective reserve(side)
  maxMarkupBpsPerDay: uint64 // valuation-per-unit growth limit
  booked: uint64             // runtime: value currently counted in reserve(side)
  rate: uint64               // runtime: value per receipt unit * 1e12 at last mark
  lastValued: uint64         // runtime: timestamp of last mark
}

export type PageKey = { poolId: uint64; page: uint64 }                     // book
export type PositionKey = { poolId: uint64; owner: Account; lowerId: uint64 } // book
```

### 3.1 HookContext and HookResult v2

The same `akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult`
method, but the struct changes, so the method selector changes and every hook is
recompiled.

```ts
export type HookContext = {
  point: uint64
  poolId: uint64
  poolType: uint64            // NEW: hooks branch on curve (and see Launch -> CP after graduation)
  escrow: Account             // pool escrow (custody hooks send from it)
  sender: Account             // NEW: Txn.sender of the core call (wallet, router app, LP)
  trader: Account             // was `caller`: beneficial trader; == sender unless sender is an approved forwarder
  recipient: Account
  assetIn: uint64
  assetOut: uint64
  amountIn: uint64
  amountOut: uint64
  reserveIn: uint64           // effective: real + virtual (Launch) + external booked
  reserveOut: uint64
  lpAmount: uint64            // CP LP units; bins remove: bps burned
  lpSupply: uint64
  feeBps: uint64
  binStep: uint64             // NEW (bins, else 0)
  activeId: uint64            // NEW (bins, else 0) — current, i.e. after the swap at AfterSwap
  lowerId: uint64             // NEW (bins liquidity points: position lower bin)
  binCount: uint64            // NEW (bins liquidity points: bins touched)
  startPriceX64: bytes<16>    // NEW: spot price (A in B, Q64.64) when the core call started
  priceX64: bytes<16>         // NEW: spot price now (== start at Before*, post-trade at After*)
  data: bytes
}

export type HookResult = {
  flags: uint64               // HookResultSetFee = 1, HookResultGraduate = 2 (needs HookPermLifecycle)
  feeBps: uint64
  hookFee: uint64
}
```

Encoded size is about 290 B plus `data`. App args max out at 2 KB, so `data`
must stay under about 1.6 KB.

Spot price:
- CP and Launch: `divmodw(effOut, 0, 0, effIn)` gives a 128-bit Q64.64. That is
  one `divmodw`, about 20 opcodes, with no loop.
- Bins: the cached `pool.binPrice`.

The volatility hook reads `startPriceX64`, `priceX64` and `activeId` at
`AfterSwap`. It keeps its own accumulator and time decay in its own state. At
`BeforeSwap` and `Quote` it reads only its state and `Global.latestTimestamp`, so
quotes stay deterministic. The core does not need an oracle.

### 3.2 Constants v2 (additions)

```ts
// pool types (ids 3..15 reserved for future core sets)
PoolTypeConstantProduct = 0, PoolTypeBins = 1, PoolTypeLaunch = 2
// hook points: existing 1..128 unchanged; new
HookPointAfterGraduate = 256; HookPointAll = 511
// permissions: existing Custody 1, DynamicFee 2, HookFee 4; new
HookPermExternal = 8      // custody hook may move value into the pool's declared external positions
HookPermLifecycle = 16    // may return HookResultGraduate (Launch AfterSwap only)
HookPermAll = 31
// bins
BinsPerPage = 24; BinBytes = 40; PageHeaderBytes = 8   // page = 968 B <= one 1 KB box ref
BinCenterId = 32_768; MaxBinId = 65_535; PriceTableEntries = 16; MaxBinsPerSwap = 48
// externals
MaxExternalPositions = 2
```

`curveParams: uint64[]` layout per type:

| Type | Layout |
|---|---|
| CP | `[]` |
| Bins | `[binStep, initialActiveId]` |
| Launch | `[virtualA, virtualB, graduateAt, quoteIsA (0/1)]` |

---

## 4. ABI interfaces between components

### 4.1 Core (`PluginDex`) public ABI

```ts
// lifecycle
create(version: string, admin: Account): void                                  // onCreate
init(factory: Application, bins: Application): void                            // admin, once, back-pointer checked
opUp(): void                                                                   // budget / resource carrier

// factory-only
registerPool(payment: gtxn.PaymentTxn, poolType: uint64, assetA: uint64, assetB: uint64,
             escrowApp: Application, feeBps: uint64, maxHookFeeBps: uint64, hookPoints: uint64,
             curveParams: uint64[], creator: Account, hooks: HookConfig[],
             externals: ExternalPosition[], binPrice: bytes<16>): uint64       // refunds excess MBR to creator

// liquidity
addLiquidity(depositA: gtxn.Transaction, depositB: gtxn.Transaction, poolId: uint64,
             minLpOut: uint64, data: bytes): uint64                            // CP (and graduated Launch)
removeLiquidity(lpTransfer: gtxn.AssetTransferTxn, poolId: uint64, minA: uint64, minB: uint64,
                data: bytes): RemoveResult                                     // paused ⇒ skips hooks (absorbs emergency*)
addBinLiquidity(mbr: gtxn.PaymentTxn, depositA: gtxn.Transaction, depositB: gtxn.Transaction,
                poolId: uint64, lowerId: uint64, weightsA: uint64[], weightsB: uint64[],
                expectedActiveId: uint64, maxActiveDrift: uint64, data: bytes): RemoveResult
removeBinLiquidity(poolId: uint64, lowerId: uint64, bps: uint64, minA: uint64, minB: uint64,
                   data: bytes): RemoveResult
seedLaunch(deposit: gtxn.Transaction, poolId: uint64): void                    // creator, Launch, before first swap

// trading
swap(input: gtxn.Transaction, poolId: uint64, minAmountOut: uint64, recipient: Account,
     trader: Account, data: bytes): uint64
swapRoute(input: gtxn.Transaction, route: uint64[], minAmountOut: uint64, recipient: Account,
          trader: Account, data: bytes): uint64
@readonly quote(poolId: uint64, assetIn: uint64, amountIn: uint64, trader: Account, data: bytes): uint64
@readonly quoteRoute(route: uint64[], assetIn: uint64, amountIn: uint64, trader: Account, data: bytes): uint64

// permissionless maintenance
sync(poolId: uint64): void                 // book escrow surplus (donations, consensus rewards) to LPs
revalue(poolId: uint64): void              // re-mark external positions
collectProtocolFees(poolId: uint64): void

// admin (DAO wallet)
setAdmin(admin: Account): void
setProtocolFee(protocolFeeBps: uint64, treasury: Account): void
setPoolPaused(poolId: uint64, paused: boolean): void
setForwarder(app: uint64, approved: boolean): void

// views
@readonly getPool(poolId: uint64): PoolInfo
@readonly getPoolHooks(poolId: uint64): HookConfig[]
```

Changes from v1:

- **Removed from the core:** `createPool`, `setHookApproval`, `getHookApproval`
  and `getPairPools` move to the factory. `emergencyRemoveLiquidity` merges into
  `removeLiquidity`.
- **Signature changes:**
  - `swap`, `swapRoute`, `quote` and `quoteRoute` gain `trader` (and `data` on
    quotes), so gated and launch hooks quote the same fee they charge.
  - Recommended: the core still accepts `quote(poolId, assetIn, amountIn)`
    (`trader = Txn.sender`, `data = ''`) as a 40 B wrapper, to keep v1 callers
    working.

**Trader resolution (forwarders).**
- `trader == zero || trader == Txn.sender` → `Txn.sender`.
- Otherwise the core requires `approvedForwarders(Global.callerApplicationId)`.
  The ARC-58 router plugin is the forwarder.
- The router passes the wallet's controlled address. A hook that needs the EOA
  origin resolves it with `getWalletID(escrowFactory, trader)` /
  `getOriginAccount`.
- Blast radius of a compromised forwarder: fee tiers only (gates, launch
  allowlists). Funds always come from the actual deposit.

### 4.2 Factory (`PluginDexFactory`)

```ts
create(admin: Account): void
init(core: Application, bins: Application): void                 // admin, once
setAdmin(admin: Account): void
setHookApproval(hook: uint64, perms: uint64): void               // 0 revokes (new installs only)
setValuerApproval(valuer: uint64, approved: boolean): void
createPool(payment: gtxn.PaymentTxn, poolType: uint64, assetA: uint64, assetB: uint64,
           feeBps: uint64, maxHookFeeBps: uint64, curveParams: uint64[],
           hooks: HookConfig[], externals: ExternalPosition[], coreFunding: uint64): uint64
@readonly getPairPools(assetA: uint64, assetB: uint64): uint64[]
@readonly getHookApproval(hook: uint64): uint64
```

`createPool` runs these steps:

1. Validate the hooks: approval, subset permissions, a pricing hook must subscribe
   to `Quote`, no duplicates. `HookPermLifecycle` is allowed only on Launch.
   `HookPermExternal` requires `Custody`.
2. Validate externals:
   - `valuer` is approved.
   - The managing hook is in the stack with Custody and External.
   - The runtime fields are 0 and `capBps <= 10_000`.
   - The pool type is not Bins.
3. Bins only: read the initial price with `bins.price(binStep, activeId)` (readonly
   call, which also proves the bin-step table exists).
4. Set up the escrow (6 inner txns, 7 for each external receipt ASA):
   - Create the Escrow child.
   - Fund it with `minBalance + optIns * assetOptInMinBalance`, where `optIns`
     includes the receipt ASAs.
   - Opt in to A, B and the receipts.
   - `Escrow.rekey(core)`.
5. Run the inner group `[pay(coreFunding) → core, core.registerPool(...)]`. The
   core creates the LP ASA, writes its boxes, runs `AfterInitialize` hooks and
   refunds unused MBR to `creator`.
6. Append to the pair index and check that `payment` covers everything.

### 4.3 Core → bins book (`PluginDexBins`), callable only by the core

```ts
swap(poolId: uint64, binStep: uint64, activeId: uint64, activePrice: bytes<16>, inIsA: boolean,
     amountIn: uint64, feeBps: uint64, protocolFeeBps: uint64, commit: boolean): BinSwapResult
     // BinSwapResult = { amountOut, protocolFee, activeId, price: bytes<16> }
donate(poolId: uint64, activeId: uint64, amountA: uint64, amountB: uint64): void
addLiquidity(mbr: gtxn.PaymentTxn, poolId: uint64, binStep: uint64, activeId: uint64, owner: Account,
             lowerId: uint64, amountA: uint64, amountB: uint64,
             weightsA: uint64[], weightsB: uint64[]): BinLiquidityResult // { amountA, amountB, price }
removeLiquidity(poolId: uint64, owner: Account, lowerId: uint64, bps: uint64): BinLiquidityResult
transferPosition(poolId: uint64, owner: Account, lowerId: uint64, to: Account): void  // decide now (12)
// anyone
initBinStep(mbr: gtxn.PaymentTxn, binStep: uint64): void   // builds (1+s)^(2^k), k<16, by squaring
@readonly price(binStep: uint64, id: uint64): bytes<16>
@readonly getBins(poolId: uint64, id: uint64): bytes       // whole 968 B page (fits a 1 KB return log)
@readonly getPosition(poolId: uint64, owner: Account, lowerId: uint64): uint64[]
```

The core passes `activePrice` from `pool.binPrice`, so a swap never pays for the
`pow`. Pow costs about 90 opcodes per set exponent bit, up to about 1.4 K. Only
`addLiquidity` pays it, once per call, at `lowerId`. Then it steps by `(1+s)`.

**Bin storage format** (frozen with the book):

- Page box `'b' ‖ poolId ‖ page`. Header: an 8 B occupancy bitmask. Body: 24 bins
  of 40 B each: `x u64 ‖ y u64 ‖ shares u64 ‖ priceX64 16B`.
- 968 B fits one box reference.
- The price is cached when a bin first gets liquidity, which keeps it canonical.
- Bins above the active bin hold only A and bins below hold only B, as in
  Liquidity Book.
- Fees stay in the bin where they were paid.
- MBR per page is about 0.40 ALGO, paid once by the first LP to touch it and
  never refunded in v2.
- A position box (`'q' ‖ poolId ‖ owner ‖ lowerId` → `uint64[] ≤ 24`) costs about
  0.10 ALGO. It is refunded when the position is fully withdrawn.

### 4.4 Hooks and valuers

```ts
// every hook (unchanged name; new struct ⇒ new selector)
akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult
// valuer (readonly, deterministic; reads venue state via AppGlobal/AppLocal getEx)
valueOf(escrow: Account, receipt: uint64, receiptAmount: uint64, underlying: uint64): uint64
```

---

## 5. Pool types compiled into the core (the "curve interface")

Pool-type behavior is a set of private core functions. `curveSwap` is the only
place a swap branches on `poolType`.

| Operation | CP | Launch | Bins |
|---|---|---|---|
| `curveSwap(pool, inIsA, amountIn, fee, commit)` | x·y with `eff = real + virtual(=0)`; output ≤ liquid side | same math with virtual reserves | `bins.swap(...)` (1 inner); `applySwap` updates `activeId` and `binPrice` |
| spot price | `effOut/effIn` Q64.64 | same | `pool.binPrice` |
| add liquidity | `addLiquidity` (fungible LP ASA) | `seedLaunch` before graduation; `addLiquidity` after | `addBinLiquidity` → `bins.addLiquidity` (positions) |
| remove liquidity | pro-rata liquid + receipts in kind | n/a before graduation; CP after | `bins.removeLiquidity` |
| donate (guard surplus, `sync`) | `reserves +=` | `reserves +=` | `bins.donate` to the active bin |
| invariant / guard | zero-fee `curveSwap` (section 6) | same | same, through the book |
| external positions | allowed | allowed after graduation only | not in v2 |

**Launch → CP graduation.** It runs inside `swapCore` after `AfterSwap` when the
real quote reserve reaches `graduateAt`, or when a `Lifecycle` hook returns
`HookResultGraduate`. Pseudocode (quote on side B):

```
keepToken = rQuote * (rToken + vToken) / (rQuote + vQuote)   // keep the current price
excess    = rToken - keepToken  → sent to creator (or a sink fixed at creation; decide later)
virtual   = 0; poolType = CP; lpSupply = sqrt(keepToken * rQuote)   // no LP minted ⇒ permanently locked
run AfterGraduate hooks
```

The pool id, escrow and hook stack do not change. Hooks see `ctx.poolType === CP`
from then on. A tax hook keeps taxing after graduation unless its own code
checks `poolType`. An anti-snipe hook decays on its own.

---

## 6. Generalized custody guard

### 6.1 Algorithm (custody branch of `runHooks`)

```
before:  liqA = holding(escrow, A); liqB = holding(escrow, B)   // ALGO: balance - minBalance
         extA = pool.externalA;     extB = pool.externalB
         pay escrow→escrow 0, rekeyTo = hook                     // flash rekey
call:    result = hook.akitaDexHook(core, i, ctx)
after:   assert escrow.authAddress == core                       // errPdrb
         if hook has External: revalueExternals(pool, hook)      // §7, updates externalA/B
         effA' = holding(A) + pool.externalA;  effA = liqA + extA     (same for B)
         gainX = max(effX' - effX, 0); lossX = max(effX - effX', 0)
         reserves -= (external' - external)  // undo the re-mark, then book the whole delta once:
         bookCustody(gainA, lossA, gainB, lossB)

bookCustody:
  lossA == 0 && lossB == 0      → donate(gainA, gainB)                 // CP: reserves; bins: active bin
  lossA > 0 && lossB > 0        → revert errPdki
  else (say the hook took B, gave A):
      require gainA > 0
      m = curveSwap(pool, inIsA = true, gainA, fee = 0, commit = true)
      require m.amountOut >= lossB                                      // errPdki
      applySwap(pool, m)                                                // CP reserves / bins walk
      donate(surplus = m.amountOut - lossB) on side B
```

### 6.2 Why this generalizes the k-guard

- **CP.** For integers, `(x+a)(y−b) ≥ xy ⇔ b ≤ a·y/(x+a)`. The zero-fee curve
  output is exactly `floor(a·y/(x+a))`. So the set of allowed custody outcomes is
  identical to v1. The v1 tests "a trade at or better than the curve is allowed, a
  worse one is not", "taking pool funds breaks the k invariant", and "a donation
  is booked into reserves" keep their exact semantics and error codes.
- **Launch.** The same check, with virtual reserves in the effective x and y. A
  hook cannot take real tokens against virtual depth beyond what a trader could.
- **Bins.** The custody delta becomes a zero-fee walk through the bins. The bin
  composition stays valid (no negative bins), `activeId` moves exactly as a trade
  would move it, and surplus goes to the active bin. One trading rule covers
  every curve, so there is no per-type invariant function to get wrong.
- **Cost.** It reuses the swap path. In CP that is no extra calls. In bins it is
  one `bins.swap` inner call, and only when the hook took something.

### 6.3 What the guard does not cover (unchanged from v1)

- Sandwiching inside one swap: a custody `BeforeSwap` hook moves the price first.
  `minAmountOut` and admin approval are the protection.
- Liveness: a hook can always revert. Pausing makes `removeLiquidity` and
  `removeBinLiquidity` skip hooks.
- Valuer honesty (section 7): bounded by the cap and the markup limit, not by the
  curve.

---

## 7. External positions (lending deposits, LSTs, consensus staking)

Model: **effective reserves = liquid + booked external value.** Pricing and the
guard use effective reserves. Payouts can only come from liquid reserves.

1. **Declared at creation, immutable** (the `ExternalPosition[]`, at most 2). Each
   one names:
   - the managing custody hook,
   - the approved valuer,
   - the side it counts toward,
   - the **receipt ASA**, which the escrow is opted into at creation,
   - `capBps` and `maxMarkupBpsPerDay`.

   LPs can see exactly which venue their liquidity may go to.
2. **Deposit and withdraw happen inside custody.**
   - Example deposit: the hook sends `x` of A from the escrow to Folks and the
     escrow receives fA.
   - At return the core calls `valuer.valueOf(escrow, fA, units, A)`, which is a
     readonly inner call that reads the venue's global and local state.
   - The guard sees `Δliquid = −x` and `Δbooked ≈ +x`, so the net is about 0, and
     the net delta goes through `bookCustody`. A deposit fee shows up as a
     loss-only delta on one side. That is allowed only if the hook makes it up.
3. **Markup rate limit.**
   - `rate = value · 1e12 / units` may rise at most
     `rate_prev · maxMarkupBpsPerDay · elapsed / 86_400 / 10_000`.
   - A rate above that is clipped.
   - Markdowns apply immediately, so the ledger stays conservative.
   - A manipulated valuer read inside one group can therefore inflate the booked
     value by about 0, never by an arbitrary amount.
4. **Cap.** `booked ≤ capBps · effectiveReserve(side)` is checked on every mark.
   It bounds the worst-case loss from a bad venue.
5. **Exit is in kind.** `removeLiquidity` pays the pro-rata **liquid** amounts
   plus the pro-rata **receipt units** (`units · lp / lpSupply`), and reduces
   `booked` pro rata. No valuation is trusted at exit, and LPs never wait on a
   withdrawal queue.
6. **`revalue(poolId)`** (anyone) re-marks every position:
   - A gain is a donation to LPs, and the price moves slightly, as with any
     donation.
   - A loss reduces reserves. That is the real risk LPs took on by entering a pool
     with a declared position, bounded by the cap.
7. **Consensus staking is not an external position.**
   - A custody hook with the `Custody` permission may `itxn.keyRegistration` from
     the escrow, putting it online with its operator's participation keys. The
     ALGO stays liquid in the escrow.
   - The 2 ALGO incentive-eligibility fee is an ALGO loss, so the guard requires
     the hook to fund it.
   - Proposer payouts land in the escrow as unbooked surplus, and `sync(poolId)`
     books them to LPs.
   - Liquid staking tokens (xALGO, tALGO) are ordinary receipt-ASA external
     positions.
8. **Swaps against illiquid reserves.**
   - If `amountOut > liquidOut`, the swap reverts (`errPdil`).
   - A rehypothecation hook should also subscribe to custody `BeforeSwap` and
     unwind just enough first ("JIT unwind").
   - The route quote will show the revert, so routers skip the pool.

Attacks considered:

| Attack | Mitigation |
|---|---|
| Hook mints a fake receipt | The receipt id is fixed at creation and the valuer is admin-approved per venue |
| Valuer read manipulated within a group | Markup clip and cap |
| Hook parks funds forever | In-kind exit; pause plus hookless exit |
| Venue insolvency | Markdown, bounded by `capBps` |
| Hook opts the escrow into junk to raise its MBR | MBR rise = ALGO loss; the guard fails unless the hook pays |

---

## 8. Flows, inner transactions and call depth

Fees assume 1,000 µALGO per txn and `coverAppCallInnerTransactionFees`. Each
count is outer txns + inner txns. Depth is shown for a direct call (the core at
depth 0).

### 8.1 `swap` (CP or Launch)

```
readDeposit(input → escrow) → resolveTrader → swapCore:
  ctx (1 divmodw spot price) → BeforeSwap hooks → curveSwap(CP, commit) → applySwap
  → AfterSwap hooks → (Launch: graduate?) → write pool box → emit
→ payout escrow → recipient
```

| Configuration | Outer + inner | µALGO |
|---|---|---|
| No hooks | 2 + 1 | 3,000 (same as v1) |
| + DynamicFee hook | +1 call per point (BeforeSwap) | 4,000 |
| + HookFee hook | +1 call, +1 fee transfer | |
| + custody hook | per point: +rekey, +call, + the hook's own inners (≥ 1; the rekey back can ride the last action) | +3,000 or more |
| + external hook | + one valuer call per managed position | |

Backrun custody `AfterSwap` hook, with a Tinyman arb:
- rekey, call, then inside the hook: escrow axfer, Tinyman appl, Tinyman inner
  payout, and the rekey back folded into the last escrow txn. About +6 inner txns,
  so about 9,000 µALGO total.
- **Make it fee-neutral:** the hook reimburses the swapper's extra fee from arb
  profit, paid from the escrow to `ctx.sender`. That is a loss the guard nets
  against the profit, and it is allowed only if the profit covers it. Below a
  profit threshold the hook just hands the escrow back: +3 inners.
- The backrun hook **cannot call the router plugin** when the swap came through the
  router (no reentry). It calls venues, or the venue adapters, directly.

### 8.2 `swap` (bins)

The same as CP, except `curveSwap` becomes `bins.swap(poolId, binStep, activeId,
binPrice, inIsA, amt, fee, pfee, commit=true)`, which is +1 inner app call. Then
`applySwap` sets `activeId` and `binPrice` and books `protocolFee`.

| Configuration | Outer + inner | µALGO |
|---|---|---|
| No hooks | 2 + 2 | 4,000 |
| Every ~1.7 extra bins crossed | +1 op-up (`ensureBudget`) | +1,000 |

Opcode estimates, weighted from the prototype TEAL (`b*` and `b/` = 20 each,
`divmodw` = 20):
- about 400 opcodes per bin crossed with commit,
- about 150 fixed per book call,
- core side about 450.

The book call brings its own 700 budget.

### 8.3 `swapRoute` (≤ 4 hops, any mix of CP, Launch and bins in the **same core**)

- Escrow to escrow: n−1 transfers plus 1 payout. Each hop runs its own hooks.
- `ensureBudget(hopEstimate)`, where `hopEstimate = 450` for CP and
  `250 + 400·expectedBins` for bins. A fixed 1,400 per hop, as in v1, overpays
  for CP.
- The intermediate trader is the same resolved `trader` on every hop.

Inner txn pool: 16 × (app calls in the outer group), capped at 256. A 4-hop route
with a custody hook on every hop is about 4×(2 + 3 + 1) ≈ 24 inners. Add one or
two `core.opUp()` outer txns. Each adds 16 inner slots, 700 budget, and 8 more
resource references.

### 8.4 `quote` and `quoteRoute`

The same as the swap path with `commit = false` and the `Quote` point:
- hook calls are made (non-custody, pricing only),
- bins quotes make one `bins.swap(commit=false)` inner call.

On-chain quotes therefore cost inner fees when hooks or bins are involved. Off
chain, simulate with `allowUnnamedResources` and `extraOpcodeBudget`.

### 8.5 Liquidity

| Operation | Inners |
|---|---|
| CP `addLiquidity` | LP transfer, refunds (0 to 2), hooks |
| CP `removeLiquidity` | 2 payouts, + one in-kind receipt transfer per external position, hooks |
| `addBinLiquidity` | `[pay(mbr) → book, book.addLiquidity]` (2) + refunds (0 to 2) + the book's MBR refund (1) + hooks |
| `removeBinLiquidity` | book call (1) + the book's MBR refund when the position closes (1) + payouts (2) + hooks |

`addBinLiquidity` opcodes: about 1.4 K pow at `lowerId` (worst case) plus about
300 per bin, so a 24-bin add needs about 9 K, which is about 12 op-ups or outer
`opUp` txns. Ways to keep it cheaper:
- add in at most 8-bin chunks, or
- pass the cached price of an initialized neighbour bin (later optimization).

### 8.6 `createPool` (factory)

About 9 to 10 inner txns:
- escrow create, fund, opt-ins (2), rekey call (which itself makes 1 inner),
- `[pay, registerPool]`, where the core makes the LP ASA create, any
  `AfterInitialize` hooks and a refund,
- the bins price read (bins pools only).

### 8.7 Call depth through the ARC-58 router plugin

Outer group:

| Index | Txn |
|---|---|
| 0 | `wallet.arc58_rekeyToPlugin(router, …)` |
| 1 | `router.swap(...)` (depth 0) |
| 2 | `wallet.arc58_verifyAuthAddress()` |
| (+ optional) | `core.opUp()` carriers |

| Path | Depths |
|---|---|
| Native leg | router (0) → `[axfer spending→escrow, core.swapRoute]` (1) → bins book / hook / payout (2) → hook's gate/staking/venue call (3) → venue payout (4) |
| Venue leg | router (0) → adapter (1, with the spending account flash-rekeyed to it) → Tinyman (2) → Tinyman payout (3) |
| Backrun inside a native leg | router (0) → core (1) → backrun hook (2) → Tinyman, or adapter (3) → Tinyman (4) → payout (5) |

The maximum used is 5, under the limit of 8. The only rule that matters is no
reentry:
- inside a router call, hooks cannot call the router or the core;
- the bins book cannot call the core (it never needs to).

Resources: a router leg into a 4-hop route references about 4 escrows, 5 assets,
4 pool boxes, hook boxes, hook apps, the bins app and pages. That is far over 8
per txn, so it relies on group resource sharing through the `opUp()` carriers, or
on access lists where the network supports them.
`ARCHITECTURE.md` already notes that `populateAppCallResources` puts `swapRoute`
resources in the wrong place, so the SDK must place them explicitly.

### 8.8 Opcode budget strategy

- Each inner app call (hook, bins book, valuer) adds 700 to the pool, so hooks
  are close to budget-neutral.
- `ensureBudget(estimate, OpUpFeeSource.GroupCredit)` runs at:
  - every hop after the first,
  - before a bins swap whose expected crossings exceed the book's own 700,
  - before `bookCustody` on bins.
- Liquidity calls take budget from client-added `opUp()` outer txns. That is
  cheaper to reason about than inner op-ups.
- The pow stays off the swap path because of the cached `binPrice`.
- `MaxBinsPerSwap = 48` bounds a swap at about 20 K opcodes, about 28 op-ups.
  Routers should split large orders instead.

---

## 9. What features (2) to (5) need from this core

| Feature | Uses | Core support |
|---|---|---|
| (2) bins (LB/DLMM) | the bins pool type and book | Built in. Variable fee comes from a hook, set once per swap. Liquidity Book's per-bin-crossing fee step is not supported; the hook can price in expected crossings at Quote. |
| (3) volatility fee | non-custody `BeforeSwap` + `Quote` (DynamicFee) + `AfterSwap` (state update) | `startPriceX64`, `priceX64`, `activeId`, `binStep`, `poolType`; the hook keeps its own state |
| (3) backrun arb | custody `AfterSwap`, last in the stack | Guard: surplus goes to LPs, fee-neutral reimbursement; venues called directly (no router reentry) |
| (4) router plugin + adapters | the core as a venue | `trader` forwarding (`setForwarder`), hook-aware `quote`/`quoteRoute` with `trader` and `data`, `getPairPools` on the factory, `opUp()` carriers. Tinyman v2 adapter and router are separate apps with no core change. |
| (5) gated pools | DynamicFee hook reading `ctx.trader` | `gateCall`, or `getStakingPower` / `getUserImpact` from `utils/functions.ts` (depth +1). The quote includes `trader`, so discounts are quotable. |
| (5) creator launch | `PoolTypeLaunch`, `seedLaunch`, the `SwapTaxHook` (HookFee), an anti-snipe DynamicFee hook (uses `createdAt` and the timestamp) | In-core graduation, the `AfterGraduate` point, `HookPermLifecycle` |

---

## 10. Hook-facing guarantees, restated for v2

- Hook stacks stay fixed per pool, with approvals in the factory and subset
  permissions.
- A pricing hook must subscribe to `Quote`.
- The sum of hook fees is at most `maxHookFeeBps`.
- `DynamicFee` is at most `MaxFeeBps`.
- Custody is never granted at `Quote`.
- The escrow must come back to the core. The net custody delta must be a feasible
  zero-fee trade against the pool's own curve, with any surplus going to LPs.
- External value counts only for declared positions, rate-limited and capped,
  and exit is in kind.

---

## 11. Migration plan

### 11.1 Files

| File | Change |
|---|---|
| `contract.algo.ts` | **Becomes the v2 core; keep class `PluginDex`** so the catalog key and scripts stay. Remove `createPool`, the approvals, `pairPools`, `validateHooks` and the `compileArc4(Escrow)` import. Add `init`, `registerPool`, `seedLaunch`, `addBinLiquidity`, `removeBinLiquidity`, `sync`, `revalue`, `setForwarder`, `resolveTrader`, `curveSwap`/`cpSwap`/`applySwap`/`donate`/`bookCustody`/`revalueExternals`, `graduate`, and the trader/data arguments. Replace `assertKNotDecreased`/`applyDelta` with `bookCustody`. Switch the core to `assert` (section 1.3). |
| `bins.algo.ts` (new) | `PluginDexBins`: the prototype plus `activePrice` passed in, `transferPosition`, and an MBR payment on `initBinStep`. |
| `factory.algo.ts` (new) | `PluginDexFactory`: the prototype, opting the escrow into receipt ASAs, `setAdmin`. |
| `math.ts` (new, plain TS) | `mulDiv`, `mulDivUp`, Q64 helpers shared by core and book (module functions compile into each app). |
| `types.ts`, `constants.ts`, `errors.ts` | Section 3; new errors `errPdty` (pool type), `errPdbr` (bin range), `errPdec` (external cap), `errPdfw` (forwarder), `errPdgr` (graduate). |
| `hook-interface.ts` | New `HookContext`; `ExternalValuer` interface; helpers unchanged. |
| `hooks/impact-fee.algo.ts` | Recompile. For bins pools, aggregate `reserveIn` overstates depth, so compute impact from `startPriceX64` → quote price, or restrict the hook to CP. |
| `hooks/swap-tax.algo.ts` | Recompile only. |
| `tests/mock-dex-hook.algo.ts` | Recompile. Add modes: `ExternalDeposit` (opt in, deposit into a mock venue that mints a receipt), `Keyreg`, `Graduate`, `BinsTrade`. Add `MockValuer`. |
| `scripts/lib/immutable-catalog.json` | Add `PluginDexBins` and `PluginDexFactory` entries (`plugin: false`). |
| `ARCHITECTURE.md` | Update after implementation (not in this research step). |

### 11.2 The 23 existing tests

Most survive with fixture-level edits:
- A `deployDex()` fixture creates core, book and factory and wires them.
- `createPool` and `setHookApproval` move to `factory`.
- `swap`, `swapRoute`, `quote` and `quoteRoute` get `trader = ZERO` and `data`.

| Group | Tests | v2 behaviour |
|---|---|---|
| constant-product core | 8 tests: `createPool` cost/refund, first-deposit sqrt, unbalanced deposit, swap = quote, `minAmountOut`, escrow = reserves + fees, pro-rata remove, `swapRoute` = `quoteRoute` | Unchanged. "Measured cost": the factory pays the escrow funding and the core charges MBR, so the test sums both. |
| pricing hooks | 3 tests | Unchanged (recompiled hooks) |
| custody | 8 tests: well-behaved, steal → `errPdki`, keep rekey → `errPdrb`, rekey elsewhere → `errPdrb`, donation booked, trade at/better/worse than the curve, custody-only cannot change fees, paused exit | Same error codes. The paused-exit test calls `removeLiquidity` while paused instead of `emergencyRemoveLiquidity`, or keep a 40 B alias if the size budget allows. |
| installation | 4 tests: unapproved, perms beyond approval, pricing without `Quote`, duplicates | Same, against `factory.createPool` |

`expectContractError` matches the message text. Verify early that the `assert`
messages in the core surface through algokit's ARC-56 mapping on the outer call.
If they do not, use valve 3 (section 1.4) to fund `loggedAssert`.

New tests to add:
- **Bins:** add/remove/swap across pages, the bins custody guard, quote = swap.
- **Launch:** seed, graduate at threshold, `AfterGraduate`, side handling with
  ALGO.
- **Externals:** deposit booked net-zero, markup clip, cap breach, in-kind exit,
  `revalue` loss.
- **`sync`** after a donation and after a simulated consensus reward.
- **Forwarders:** spoofed trader reverts; an approved forwarder passes `trader`.
- **Size gate.**

### 11.3 Deployment

The order is in section 2.2. Then:
- run `bins.initBinStep` for the supported steps (for example 1, 5, 10, 25, 50, 100);
- set the factory approvals for the shipped hooks;
- set `core.setForwarder(routerPlugin)` once the router exists;
- point admin and treasury at the DAO wallet and revenue escrow (from
  `ARCHITECTURE.md` next steps).

### 11.4 Upgrades under immutability

- There is no in-place upgrade. A later core set (v3) is a new venue.
- Migration helper: no contract is needed. The SDK builds one group:
  `v2.removeLiquidity` → `v3.addLiquidity` (or bins equivalents), with slippage
  guards.
- The factory pair index is per set, so routers enumerate the known sets.
- Repo history and deployment summaries show no PluginDex deployment on TestNet
  or MainNet. If that is correct, v1 can be replaced outright now rather than run
  side by side. **Kyle to confirm.**

---

## 12. Decide now vs later

**Now.** These are frozen by immutable code or the ABI:

1. The app split, the set-once `init` wiring with back-pointer checks, and the CI
   size gate (core ≤ 7,800 B). **Recommendation: four apps (core, bins book,
   factory, `PluginDexExternal`)**, because with the external ledger in the core
   the full ABI projects to about 8.0 KB (section 1.2). The external app's
   interface:
   - `revalue(poolId, escrow, assetA, assetB, reserveA, reserveB, hook): (externalA, externalB)`,
     callable only by the core;
   - `exitInKind(poolId, escrow, lp, lpSupply, recipient)`, which returns the
     booked amounts released (the core sends the receipt units, because the escrow
     is the core's);
   - `register(poolId, ExternalPosition[])`, called from `registerPool`.

   The core keeps `externalA`/`externalB` and the guard arithmetic. The external
   app holds no funds.
2. The `PoolInfo` layout, the `HookContext`/`HookResult` structs (section 3.1),
   and the hook method name and args. The hook-point bit map, with 256 =
   `AfterGraduate` and 512 and up reserved. The permission bits, with 8 =
   External and 16 = Lifecycle.
3. The pool-type ids and `curveParams` layouts. Launch `quoteIsA`.
4. Guard semantics: a zero-fee curve trade, surplus donated to the active bin or
   to reserves.
5. Bins storage:
   - 24 bins per page, 40 B per bin with the cached Q64.64 price;
   - the id range `[0, 65535]` with center 32,768. That gives a ±26× price range
     at 1 bp and ±e^33 at 10 bps;
   - 16-entry pow tables;
   - `MaxBinsPerSwap = 48`.
6. The bins position model:
   - keyed by owner and `lowerId`, at most 24 bins;
   - transferable or not. Recommendation: include `transferPosition`, about
     100 B in the book;
   - **adds to the active bin:** charge a Liquidity Book-style composition fee, or
     require the bin's current ratio and refund the rest. Recommendation:
     require-and-refund. An imbalanced add to the active bin is otherwise a
     zero-fee swap.
7. A single fee per swap, including bins.
8. External ledger semantics: declared at creation, at most 2, a receipt ASA
   required, cap, markup limit, in-kind exit; consensus staking through keyreg and
   `sync`.
9. Forwarder semantics: `trader` is the ARC-58 controlled address, and forwarders
   affect fees only.
10. Quote signatures carry `trader` and `data`.
11. Error convention: `assert` in the core and bins book, `loggedAssert` in the
    factory, hooks and router.
12. Who receives the excess tokens at Launch graduation: a creator-chosen sink
    fixed at creation (a 4th curve param), or always the creator. Recommendation:
    a sink param, for example a burn or vesting address. Also whether
    `seedLaunch` allows a quote-side seed.

**Later.** Hooks, adapters and the SDK can change these without touching the core:

- Volatility fee formula and decay; backrun strategy, profit threshold and venues.
- Gate tiers (AKTA staking power, social impact), launch tax rates and anti-snipe
  curve.
- The router plugin, the Tinyman v2 adapter and later adapters, and the split
  solver.
- Valuers per venue (Folks, LSTs) and their admin approvals; which bin steps to
  initialize.
- SDK resource placement and op-up sizing; dropping `quoteRoute` or the v1 quote
  alias if bytes are needed.
- Refunding bin page MBR when a page empties (book v3).

---

## 13. Risks

1. **Size.** The measured core is about 7.7 KB of 8.19 KB with `assert`. With the
   full ABI and the ledger still in the core, it projects to about 8.0 KB, over
   the cap. Even with `PluginDexExternal` (about 7.35 KB) the headroom is only
   about 840 B, and the code is immutable. The projections are estimates added to
   a measured base. Re-measure at every implementation milestone, and keep the
   CI gate.
2. **The `assert` switch** loses error codes from logs when the core fails inside
   an inner call (the router path). Test harness messages must be checked.
   Fallback: valve 3 plus `loggedAssert`.
3. **Bins opcode cost.** About 400 opcodes per bin crossed means large orders need
   many op-ups. A 24-bin add costs about 9 K opcodes. Fees grow with
   fragmentation; routers must split orders.
4. **Box references.** Bins pages, hooks, escrows and assets exceed 8 refs per
   txn quickly. This depends on resource sharing through `opUp` carriers or on
   access lists, and on correct SDK placement, which `populateAppCallResources`
   currently gets wrong for routes.
5. **Valuer and external risk.** A bad venue or valuer can still cost LPs up to
   `capBps` of one side. The markup limit protects against inflation but not
   against a real markdown.
6. **Compiled-in pool types.** Every new curve means a new core set and a
   liquidity split across app ids. The router and SDK must handle several sets.
7. **Custody hooks run arbitrary transactions as the escrow** (keyreg, opt-ins,
   app calls). The balance-based guard catches value loss. It does not catch
   non-value side effects, such as local-state opt-ins or keyreg offline at a bad
   time, so admin approval is still the real gate.
8. **Graduation edge cases.** With ALGO-quoted launches the token is side B, and
   the prototype assumed B is the quote. LP minted at graduation is locked
   forever. Rounding in `keepToken` must favor the pool.
9. **Bins precision.** Price stepping inside one swap drifts from the canonical
   per-bin price by about 1 ulp of Q64 per crossing. That is harmless, but the
   book must use the cached bin price for share math, not the stepped one.
10. **Trust in the split.** The core trusts the bins book's returned amounts. Both
    apps are immutable, pinned and from the same audit scope. The book can never
    move funds: it only returns numbers, and the core pays from escrows. A bug in
    the book could still misprice bins pools.

---

## Appendix: re-measuring

```bash
# from a scratch dir with node_modules symlinked to the repo root node_modules
cp research/monolith-prototype/core.algo.ts.txt   v4/core.algo.ts
cp research/monolith-prototype/bins.algo.ts.txt   v4/bins.algo.ts
cp research/monolith-prototype/factory.algo.ts.txt v4/factory.algo.ts
# plus types.ts, hook-interface.ts, constants.ts (+ additions), errors.ts (+ additions), ../escrow/*
node node_modules/@algorandfoundation/puya-ts/bin/run-cli.mjs v4 --out-dir out --output-bytecode
wc -c out/*.approval.bin
```

The prototype files are size probes. They show the logic shapes and the exact API
usage, but they are not finished code. Known gaps: no `quoteIsA` branch, no
`seedLaunch`, `transferPosition` or `init`, the book's `swap` recomputes `pow`,
and factory refunds are simplified.
