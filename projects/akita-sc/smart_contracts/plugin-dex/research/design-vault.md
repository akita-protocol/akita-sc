# PluginDex v2: Vault + pool-type apps (Balancer-v3 style)

Status: research and design only. No source file in this repo was changed.
Scope: the core architecture for feature (1), "the pricing curve is a module and
the custody guard follows the curve". Features (2) to (5) build on it: bins, the
volatility and backrun hooks, the router plugin with adapters, and the Akita-native
gated and launch pools. Each one is covered here only as far as the core
interfaces have to support it.

Sources read: `contract.algo.ts`, `types.ts`, `constants.ts`, `errors.ts`,
`hook-interface.ts`, `hooks/*`, `tests/mock-dex-hook.algo.ts`,
`plugin-dex.e2e.spec.ts`, `ARCHITECTURE.md`, `escrow/contract.algo.ts`,
`utils/functions.ts` (`getSpendingAccount`, `rekeyAddress`, `gateCheck`,
`getStakingPower`), the `haystack-router` plugin, `scripts/lib/immutable-catalog.json`,
and `node_modules/@algorandfoundation/algorand-typescript@1.3.1` (`op.d.ts`,
`itxn.d.ts`, `arc4/c2c.d.ts`, `util.d.ts`, `box.d.ts`, `arc4/encoded-types.d.ts`).

---

## 0. TL;DR

- **PluginDex becomes the Vault.** It is the only app that ever moves pool funds.
  It holds the per-pool escrows (unchanged), the booked balances, protocol fees,
  LP accounting (a fungible LP ASA, or position records), hook stacks, the
  external-position ledger, every approval, and all user and router entrypoints.
  **It contains no curve math.**
- **A pool type is a singleton app**, approved by the admin. Constant product,
  bins and the launch curve are each one pool type. A pool type owns its
  curve-state boxes, keyed by `poolId`. It computes swap, add, remove and settle
  results when the Vault calls it as an inner call, and it commits its own state.
  It never holds or moves pool funds, never has custody, and only accepts calls
  from the Vault.
- **The Vault checks every pool-type result for conservation of funds.** Balances
  move by exactly the tokens that moved, protocol fees are what the Vault expects,
  and output fits inside liquid escrow funds. A pool type decides the price; it
  can never create or destroy tokens.
- **The generalized custody guard is `ptSettle`.** After a custody hook returns,
  the Vault computes the escrow's net delta. That includes the valued change in
  any registered external position. The pool type must accept that delta as a
  fee-free trade that its curve can execute, and it updates its curve state to
  match. Any surplus is a donation to LPs. For constant product this is exactly
  today's k-guard. For bins it is the same rule with the bin-walking curve. A
  plain "invariant must not decrease" comparison does not work for bins.
- **External positions** live in per-pool slots that are fixed at pool creation.
  Each slot names a hook, a valuator app and version, a receipt asset held *inside
  the escrow*, a side, and a cap. Valuation comes from a separately approved
  read-only valuator app, with conservative rounding, a haircut and a growth
  limit. The emergency exit pays receipts out in kind, so a broken venue or hook
  cannot trap LPs.
- **Every trust decision is frozen when a pool is created.** That covers the
  pool-type app and version, each hook's app, version and permissions, the
  valuators, the caps and the fee ceilings. Version pinning uses the AVM v12
  `rejectVersion` field on every inner call, which needs `targetAvmVersion: 12`
  for the Vault. After creation, the admin can only pause a pool, set the
  protocol fee (bounded) and set the treasury. A bad approval can only affect
  pools created after it.
- **Cost and limits:** each swap hop gets one extra inner app call, to the pool
  type. That adds 1 inner transaction and 0.001 ALGO of pooled fee, and it
  *adds* 700 opcode budget. The deepest path is wallet → router plugin (0) →
  Vault (1) → hook (2) → venue adapter (3) → Tinyman (4) → Tinyman's inner
  transactions (5). That is under the depth limit of 8.
- **Program size is the main risk.** The estimate with every decide-now
  entrypoint is about 8.5 KB (range 7.9 to 9.0 KB), over the 8,192-byte cap. The
  cut list in §8 brings it to about 7.35 to 7.8 KB. Consensus v5
  allows 7 extra pages (16 KB) and AVM v13 adds foreign box reads. Both are
  upside only; the design does not depend on them.

---

## 1. Mapping to Balancer v3, and where the AVM differs

| Balancer v3 | PluginDex v2 | AVM-driven difference |
|---|---|---|
| `Vault`: holds every token, does per-pool balance accounting, transient "settle" | **Vault** (`PluginDex`): per-pool **escrow accounts** hold the funds, `PoolInfo.reserveA/B` are the booked balances | Funds stay split by pool across separate accounts, so the PD-02 isolation stays: one pool's escrow is never exposed to another pool's hook. Deposits arrive as group transactions *before* the call. That replaces Balancer's transient debt and credit. |
| Pool contract per pool (`onSwap`, `computeInvariant`, `computeBalance`) | **Pool-type singleton app** that serves many pools, with its state in boxes keyed by `poolId` | Creating an app costs MBR and an inner transaction, and each app needs its own approval. Approving one app per *type* matches the "permissioned" decision. |
| `computeInvariant` used by the Vault for liquidity ops and checks | `ptSettle(delta)`: the delta must be a fee-free trade on the curve | Bins (Liquidity Book or DLMM) have no single global invariant. Trade feasibility is the curve-agnostic form. |
| Hooks contracts with flags (`shouldCallBeforeSwap`, ...) | Hook apps with a point bitmask, as today, plus permissions | Hooks cannot call back into the Vault (no reentrancy), so they cannot use Vault pools for their own trades. |
| Router contracts (Permit2) | ARC-58 **router plugin** plus **venue adapters** | Allowances, escrows and agent keys come from ARC-58. |
| BPT (ERC-20 inside the Vault) | Fungible **LP ASA** minted by the Vault (constant product, launch after graduation). For bins, **position records** kept in Vault boxes, with shares kept in pool-type boxes. | A per-bin ERC-1155 is not practical on the AVM. |
| Yield-bearing buffers (ERC-4626) | **External-position slots**: a receipt ASA held in the escrow, valued by an approved valuator | There is no ERC-4626. Each venue gets a small valuator app. |

---

## 2. Contract decomposition

```
                         ┌──────────────────────────── admin = DAO wallet ───────────────────────────┐
                         │ approvals (frozen into each pool at creation), pause, protocol fee, treasury │
                         └──────────────────────────────────────┬───────────────────────────────────┘
user / router plugin ──▶ PluginDex Vault (immutable, AVM v12 target)
                          │ boxes: pools, hooks, pairs, positions, external slots, approvals
                          │ owns:  LP ASAs (unissued), position records
                          │ auth of: every pool Escrow account
                          │
          ┌───────────────┼──────────────────────────┬─────────────────────────┐
          ▼               ▼                          ▼                         ▼
   Pool Escrow (1/pool)  Pool-type apps (approved)   Hook apps (approved)       Valuator apps (approved)
   child Escrow app,     CP  (stateless, no boxes)   pinned version per pool    read-only valuation of a
   rekeyed to Vault,     Bins (bin pages, shares)    custody = flash rekey      receipt asset (Folks fALGO,
   holds reserves,       Launch (curve box)          of the pool escrow         xALGO, Tinyman LP, ...)
   protocol fees,        - no funds, MBR only
   receipt ASAs,         - only Vault may call
   may go online         mutating methods
   (keyreg via hook)
```

### 2.1 Which app holds what

| State or funds | Owner | Notes |
|---|---|---|
| Pool tokens: liquid reserves, protocol fees, in-flight swap amounts, receipt ASAs | **Pool escrow** (child `Escrow` app account, rekeyed to the Vault) | Unchanged from today. The escrow's `authAddress` is the Vault, except while it is flash-rekeyed to one custody hook. |
| `PoolInfo`: assets, escrow, pool type and its pinned version, LP mode, booked balances, LP supply, fees, caps, status, cached curve snapshot | **Vault** box `p` + poolId | The cached `CurveSnapshot` means a swap never spends an extra call just to give hooks the "before" state. |
| Hook stack with pinned versions | Vault box `h` + poolId | Fixed at creation. |
| Pair index | Vault box `x` + pair | Unchanged. |
| Approvals: hooks, pool types, valuators | Vault boxes `a`, `t`, `v` | Each approval records an `appVersion` when it is granted. |
| LP positions (non-fungible modes) | Vault box `o` + positionId → `{poolId, owner}` | The Vault decides **who** owns a claim. |
| Shares of a position | **Pool-type** boxes | The pool type decides **what** a claim is worth. |
| Curve state: bin reserves, active id, launch virtual reserves | **Pool-type** boxes, keyed by poolId | MBR is held by the pool-type app account and paid by the LP or creator through the Vault (§5.6). |
| External-position slots | Vault box `e` + poolId | Fixed slots are declared at creation. Running values are updated in place. |
| Hook-private state (volatility accumulators, anti-snipe start round, tax balances) | **Hook** app boxes or global state | The Vault never reads it. |

### 2.2 Why pool-type apps are singletons that are never on the fund path

- **Isolation:** a pool type gets no rekey and no assets, and no inner
  transaction from it can name an escrow as sender. Its worst failure is
  *mispricing*, and conservation checks plus per-pool `maxFeeBps` and slippage
  limits bound that. It can never take tokens without a matching trade.
- **Budget:** each inner app call adds 700 to the pooled opcode budget. A
  constant-product swap costs about 200 opcodes in the pool type, so splitting it
  out gains budget instead of losing it.
- **No new reentrancy edges:** a pool type never calls the Vault, a hook, or
  another pool type. Hooks *may* call a pool type's read-only methods, such as
  `ptQuote` or `ptAmountToPrice`. That is allowed because the pool type is not on
  the call stack while a hook runs.

---

## 3. Data types (types.ts v2)

PuyaTs 1.3.1 notes: `Uint128` comes from `@algorandfoundation/algorand-typescript/arc4`
(`encoded-types.d.ts`), and the repo already uses it in `auction`. `bytes<32>`
is a native fixed-length bytes type. Native object types that mix native fields
with ARC-4 encoded fields compile as ARC-4 tuples. **Verify early** that
`abiCall` round-trips a struct containing a `Uint128`. If it does not, use
`spotPriceHi`/`spotPriceLo` `uint64` pairs.

```ts
import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'
import { Uint128 } from '@algorandfoundation/algorand-typescript/arc4'

/** Pool lifecycle. Graduated pools reject swaps and adds; only migrate and remove are allowed. */
export const PoolStatusActive: uint64 = 0
export const PoolStatusPaused: uint64 = 1
export const PoolStatusGraduated: uint64 = 2   // pool type signalled the end of a launch curve
export const PoolStatusMigrated: uint64 = 3    // balances moved to the successor pool

/** How LP claims are represented. The pool type declares this at approval and the pool copies it. */
export const LpModeFungible: uint64 = 0        // Vault-minted LP ASA (CP)
export const LpModePosition: uint64 = 1        // Vault position record + pool-type shares (bins)
export const LpModeNone: uint64 = 2            // creator-seeded, no LP until migration (launch)

/**
 * Pool-type-agnostic view of a curve. The Vault caches it in PoolInfo after every pool-type
 * mutation, so hooks get "before" state with no extra call.
 */
export type CurveSnapshot = {
  /** price of assetA in units of assetB, UQ64.64 (B per A) */
  spotPriceX64: Uint128
  /** bins: active bin id (2^23 offset as in LB); CP and launch: 0 */
  activeId: uint64
  /** active liquidity: CP sqrt(k); bins the active bin's L = x*P + y in B units; launch: virtual B */
  liquidity: uint64
  /** pool-type flags: CurveFlagGraduated = 1, CurveFlagOneSided = 2, ... */
  flags: uint64
  /** opaque pool-type data (launch: sold supply and threshold; bins: binStep, ...) */
  extra: bytes<32>
}

export type PoolInfo = {
  assetA: uint64
  assetB: uint64
  escrow: uint64
  poolType: uint64            // pool-type app id (immutable binding)
  poolTypeVersion: uint64     // appVersion pinned at creation (rejectVersion = this + 1)
  lpMode: uint64
  lpAsset: uint64             // LpModeFungible only, else 0
  /** booked LP-owned balances = liquid in escrow + valued external positions (names kept for test parity) */
  reserveA: uint64
  reserveB: uint64
  /** valued external amount inside reserveA/B (liquid = reserve - external) */
  externalA: uint64
  externalB: uint64
  lpSupply: uint64            // fungible: LP units; position: open positions count
  feeBps: uint64              // base LP fee
  maxFeeBps: uint64           // ceiling for DynamicFee hooks on THIS pool (<= MaxDynamicFeeBps)
  maxHookFeeBps: uint64       // cap on in + out hook fees
  hookPoints: uint64
  protocolFeesA: uint64
  protocolFeesB: uint64
  status: uint64
  creator: Account
  curve: CurveSnapshot
}

export type HookConfig = {
  app: uint64
  version: uint64             // NEW: appVersion pinned at install
  points: uint64
  perms: uint64
}

/** NEW external-position slot, fixed at pool creation (except the running fields). */
export type ExternalSlot = {
  hook: uint64                // only this hook (with HookPermExternal) may change the receipt balance
  valuator: uint64
  valuatorVersion: uint64
  side: uint64                // 0 = underlying is assetA, 1 = assetB
  receipt: uint64             // ASA held BY THE ESCROW that represents the position (0 = none)
  capBps: uint64              // max share of reserveSide that may be external
  haircutBps: uint64          // value booked = valuator value * (1 - haircut)
  maxGrowthBpsPerDay: uint64  // limits upward revaluation per call
  // running
  receiptAmount: uint64
  bookValue: uint64           // underlying units currently booked in reserveSide
  lastValuedAt: uint64        // Global.latestTimestamp
}

export type Position = { poolId: uint64; owner: Account }
```

### 3.1 HookContext and HookResult v2

```ts
export type HookContext = {
  point: uint64
  poolId: uint64
  poolType: uint64            // NEW: hooks can refuse unsupported curves
  escrow: Account
  caller: Account             // Txn.sender at the Vault (spending account when called by a wallet plugin)
  callerApp: uint64           // NEW: Global.callerApplicationId at the Vault (router plugin id, 0 = top level)
  recipient: Account
  assetIn: uint64
  assetOut: uint64
  exactIn: boolean            // NEW: only true is implemented in v2; reserved so exact-out needs no new ABI
  amountIn: uint64
  amountOut: uint64
  reserveIn: uint64           // booked balances (kept name)
  reserveOut: uint64
  lpAmount: uint64
  lpSupply: uint64
  positionId: uint64          // NEW: position-mode liquidity ops
  feeBps: uint64
  curveBefore: CurveSnapshot  // NEW: cached snapshot before the operation
  curveAfter: CurveSnapshot   // NEW: After* points only (zeroed at Before*/Quote/Poke)
  data: bytes
}

export type HookResult = {
  flags: uint64               // HookResultSetFee = 1
  feeBps: uint64              // LP fee override (DynamicFee), <= pool.maxFeeBps
  hookFee: uint64             // taken from the swap input (HookFee)
  hookFeeOutBps: uint64       // NEW: share of amountOut withheld for this hook (HookFeeOut)
}
```

What each planned feature reads from it:

| Feature | Fields used |
|---|---|
| Volatility fee (LB-style accumulator, uniform fee per swap) | `curveBefore.activeId` or `spotPriceX64` at BeforeSwap/Quote. At AfterSwap it reads `curveAfter.activeId`/`spotPriceX64` and stores its accumulator, with `Global.latestTimestamp` for decay. Its state is a hook box keyed by poolId. |
| Backrun arb (custody, AfterSwap or Poke) | `escrow`, `poolType` (calls the read-only `ptAmountToPrice`), `curveAfter.spotPriceX64`, `reserveIn/Out`, `assetIn/Out`. The guard settles its net delta through `ptSettle`. |
| Gated discount (AKTA stake, social impact) | `caller`, `callerApp` (resolve the ARC-58 wallet, then its origin, with `originOr`), and `data` (gate args or a `gateCheck` txn index). Runs at BeforeSwap and Quote. |
| Launch tax | `assetIn`, `amountIn` → `hookFee` on buys. On sells, `hookFeeOutBps` collects the tax in ALGO. |
| Anti-snipe decaying fee | Stores the start round at `AfterInitialize`. At BeforeSwap and Quote it returns `feeBps` that decays. The pool's `maxFeeBps` must be high (up to 50%), and that ceiling is visible at creation. |
| Consensus staking / external positions | `Poke` point with custody: keyreg the escrow, or deposit into lending and leave the receipt in the escrow. |

### 3.2 Constants v2 (additions)

```ts
export const HookPointPoke: uint64 = 256         // keeper-triggered custody point, see poke()
export const HookPointAll: uint64 = 511
export const HookPermHookFeeOut: uint64 = 8      // at most one per pool
export const HookPermExternal: uint64 = 16       // may change receipt balances of slots naming this hook
export const HookPermAll: uint64 = 31
export const MaxDynamicFeeBps: uint64 = 5_000    // only pools that ask for it at creation (launch)
export const MaxExternalSlots: uint64 = 2
export const MaxExternalCapBps: uint64 = 5_000
export const MaxRouteHops: uint64 = 4
```

---

## 4. Pool-type interface (ABI)

Every pool type extends one static interface. This mirrors how `PluginDexHook`
is used with `abiCall<typeof X.prototype.m>`. Mutating methods start with
`requireVault()`, which checks `Global.callerApplicationId === vault`.
Read-only methods are open, because anyone may quote. Inside a pool type,
`commit` writes are the only writes.

```ts
export type PtInitRequest = {
  poolId: uint64; assetA: uint64; assetB: uint64; creator: Account
  feeBps: uint64; params: bytes            // CP: empty; bins: binStep(u64)|activeId(u64); launch: curve spec
}
export type PtInitResult = { lpMode: uint64; curve: CurveSnapshot; mbrUsed: uint64 }

export type PtSwapRequest = {
  poolId: uint64
  inIsA: boolean
  exactIn: boolean          // v2: must be true
  amount: uint64            // input net of hook input fees
  reserveA: uint64          // Vault-booked balances, the pool type's source of truth for CP
  reserveB: uint64
  feeBps: uint64            // final LP fee after DynamicFee hooks
  protocolFeeBps: uint64
  data: bytes               // bins: maxBinsCrossed; launch: nothing
}
export type PtSwapResult = {
  amountIn: uint64          // consumed; v2 requires == amount (full fill or revert)
  amountOut: uint64
  lpFee: uint64             // total fee charged on the input
  protocolFee: uint64       // portion of lpFee NOT credited to the curve
  reserveA: uint64          // new booked balances
  reserveB: uint64
  curve: CurveSnapshot      // after
}

export type PtLiquidityRequest = {
  poolId: uint64
  positionId: uint64        // 0 for fungible
  owner: Account
  amountA: uint64           // add: deposited; remove: 0
  amountB: uint64
  lpAmount: uint64          // remove (fungible): LP burned; add: 0
  reserveA: uint64
  reserveB: uint64
  lpSupply: uint64
  data: bytes               // bins add: lowerId|upperId|shape|weights; bins remove: lowerId|upperId|fractionBps
}
export type PtLiquidityResult = {
  amountA: uint64           // add: used (rest refunded); remove: owed to owner
  amountB: uint64
  lpDelta: uint64           // fungible: LP to mint or burn; position: informational
  reserveA: uint64
  reserveB: uint64
  lpSupply: uint64
  curve: CurveSnapshot
}

export type PtSettleRequest = {
  poolId: uint64
  reserveA: uint64          // BEFORE the custody call
  reserveB: uint64
  deltaA: uint64            // magnitude
  deltaANeg: boolean
  deltaB: uint64
  deltaBNeg: boolean
  lpSupply: uint64
  writeDown: boolean        // only set by revalue(): book a loss on one side without a matching gain
}
export type PtSettleResult = { surplusA: uint64; surplusB: uint64; curve: CurveSnapshot }

export type PtTrade = { inIsA: boolean; amountIn: uint64; amountOut: uint64 }
export type MigrationPlan = { poolType: uint64; feeBps: uint64; params: bytes; lpRecipient: Account }

export class PluginDexPoolType extends Contract {
  /** Create curve state. Grouped with an MBR payment from the Vault; must refund any unused MBR to `creator`. */
  ptInitialize(mbr: gtxn.PaymentTxn, req: PtInitRequest): PtInitResult

  ptSwap(req: PtSwapRequest): PtSwapResult                  // mutating
  @abimethod({ readonly: true })
  ptQuote(req: PtSwapRequest): PtSwapResult                 // same math, no writes

  /** Add. Grouped with an MBR payment (amount may be 0); pays leftover MBR to req.owner. */
  ptAdd(mbr: gtxn.PaymentTxn, req: PtLiquidityRequest): PtLiquidityResult
  /** Remove. May delete empty boxes; pays freed MBR to req.owner. */
  ptRemove(req: PtLiquidityRequest): PtLiquidityResult

  /** Generalized custody guard: accept the delta as a fee-free curve trade or donation, update curve state. */
  ptSettle(req: PtSettleRequest): PtSettleResult

  @abimethod({ readonly: true })
  ptSnapshot(poolId: uint64, reserveA: uint64, reserveB: uint64): CurveSnapshot
  /** Trade that moves spot to targetPriceX64 (for backrun hooks and solvers). */
  @abimethod({ readonly: true })
  ptAmountToPrice(poolId: uint64, reserveA: uint64, reserveB: uint64, targetPriceX64: Uint128): PtTrade
  /** Monitoring and off-chain checks. Not used by the guard. */
  @abimethod({ readonly: true })
  ptInvariant(poolId: uint64, reserveA: uint64, reserveB: uint64): Uint256
  /** Launch only: what the Vault must do when the pool graduates. Others: assert false. */
  @abimethod({ readonly: true })
  ptMigrationPlan(poolId: uint64): MigrationPlan
}
```

**Valuator interface** (one small app per venue):

```ts
export class PluginDexValuator extends Contract {
  /** underlying units of `slot.side` represented by `receiptAmount` of `slot.receipt` */
  @abimethod({ readonly: true })
  akitaDexValue(poolId: uint64, receipt: uint64, receiptAmount: uint64): uint64
}
```

### 4.1 Vault-enforced checks on every pool-type result (about 40 opcodes)

```
ptSwap (in = A shown):
  r.amountIn == req.amount
  r.reserveA == req.reserveA + req.amount - r.protocolFee
  r.reserveB == req.reserveB - r.amountOut
  r.protocolFee == mulDiv(r.lpFee, protocolFeeBps, 10_000)
  r.lpFee <= mulDivUp(req.amount, req.feeBps, 10_000) + 1   // a pool type cannot overcharge
  r.amountOut <= liquid(escrow, out) - protected(out)       // can actually be paid
ptAdd:   r.amountA <= req.amountA, r.amountB <= req.amountB,
         r.reserveX == req.reserveX + r.amountX, r.lpSupply == req.lpSupply + r.lpDelta (fungible)
ptRemove: r.amountX <= req.reserveX - externalX,  r.reserveX == req.reserveX - r.amountX,
         fungible: r.lpDelta == req.lpAmount and r.amountX <= mulDiv(req.lpAmount, req.reserveX, req.lpSupply)
ptSettle: no balances returned. The Vault books reserve' = reserve ± delta itself.
```

So for every pool type, booked balances always equal tokens actually present.
The pool type only chooses **how much out for how much in**, and slippage limits
plus fee caps bound that.

---

## 5. Flows

Notation for inner transactions: `pay` is an asset or ALGO transfer, `appl` is an
inner app call. Depth is counted with the user's top-level transaction at 0.

### 5.1 `swap(input, poolId, minAmountOut, recipient, data)`, CP or bins

```ts
private swapCore(poolId, assetIn, amountIn, recipient, data): SwapResult {
  const pool = this.loadPool(poolId)
  loggedAssert(pool.status === PoolStatusActive, errPoolPaused)
  const inIsA = assetIn === pool.assetA
  loggedAssert(inIsA || assetIn === pool.assetB, errAssetNotInPool)

  const ctx = this.context(poolId, pool, recipient, assetIn, inIsA ? pool.assetB : pool.assetA, amountIn, data)
  ctx.curveBefore = clone(pool.curve)

  // 1. BeforeSwap hooks: fee override, input hook fees (paid now), out-fee bps, custody (settled via ptSettle)
  const pre = this.runHooks(poolId, pool, HookPointBeforeSwap, ctx, inIsA)   // mutates pool.reserve*/curve on custody
  const netIn: uint64 = amountIn - pre.hookFees

  // 2. curve, pinned version
  const r = abiCall<typeof PluginDexPoolType.prototype.ptSwap>({
    appId: pool.poolType,
    rejectVersion: pool.poolTypeVersion + 1,
    args: [{ poolId, inIsA, exactIn: true, amount: netIn, reserveA: pool.reserveA, reserveB: pool.reserveB,
             feeBps: pre.feeBps, protocolFeeBps: this.protocolFeeBps.value, data: pre.ptData }],
  }).returnValue
  this.checkSwap(pool, inIsA, netIn, pre.feeBps, r)          // §4.1
  pool.reserveA = r.reserveA; pool.reserveB = r.reserveB; pool.curve = clone(r.curve)
  if (inIsA) pool.protocolFeesA += r.protocolFee; else pool.protocolFeesB += r.protocolFee
  if ((r.curve.flags & CurveFlagGraduated) !== 0) pool.status = PoolStatusGraduated

  // 3. out-fee (single HookFeeOut hook per pool, validated at install)
  const outFee = mulDiv(r.amountOut, pre.hookFeeOutBps, Bps)        // pre.* already capped vs maxHookFeeBps
  // 4. AfterSwap hooks (curveAfter = r.curve) - volatility update, backrun custody
  ctx.amountOut = r.amountOut; ctx.feeBps = pre.feeBps; ctx.curveAfter = clone(r.curve)
  this.runHooks(poolId, pool, HookPointAfterSwap, ctx, inIsA)
  this.pools(poolId).value = clone(pool)
  if (outFee > 0) this.send(escrow, Application(pre.outFeeHook).address, assetOut, outFee)
  return { assetOut, amountOut: r.amountOut - outFee }
}
```

Note: the `ptData` used by bins (`maxBinsCrossed`) is taken from the first 8
bytes of `data` when `data.length >= 8`. Hooks see the same `data`. Alternative:
split `data` into `poolData` and `hookData`. Decide that now (§10); the
recommendation is a split.

`rejectVersion` (from `itxn.d.ts`): the node rejects the inner call when the
app's version is ≥ the given value. The Vault must compile with
`targetAvmVersion: 12`. puya-ts defaults to 11 (see `options` in puya-ts), and
`rejectVersion` and `AppParams.appVersion` both need version 12.

**Inner transactions per swap:**

| Case | Today | v2 |
|---|---|---|
| CP, no hooks | 1 (payout) | 2 (ptSwap + payout) |
| + N non-custody hooks | 1 + N (+1 per hook-fee payment) | 2 + N (+1 per hook fee, +1 out-fee) |
| + 1 custody hook | +1 rekey + hook's own inners | +1 rekey + hook's inners + 1 `ptSettle` |
| backrun via a Tinyman adapter (AfterSwap custody) | n/a | about +8: rekey, hook, adapter appl, pay to venue, venue appl, venue payout, rekey back, ptSettle |

A single user call to the Vault gets 16 inner transactions. Hooked or backrun
pools need the SDK to add `vault.opUp()` top-level transactions. Each one adds
16 inner slots to the pool (up to 256 per group) and also carries resource
references.

### 5.2 `swapRoute(input, route[], minOut, recipient, data)`

This is the same as today: escrow-to-escrow hops, each running `swapCore`. Per
hop it costs 1 ptSwap call, its hooks, and 1 transfer to the next escrow. With 4
plain CP hops: 4 `appl` + 3 `pay` + 1 payout = **8 inner transactions**. Opcode
use: about 550 in the Vault per hop and about 200 in CP's `ptSwap`. The budget
is 700 for the top-level Vault call plus 700 for each `ptSwap`, so about 3,500
for 4 hops is covered. Keep `ensureBudget(HopBudget, GroupCredit)` as a safety
net for hooked hops. Bins hops pay for their own budget inside the pool type.

### 5.3 `quote(poolId, assetIn, amountIn, swapper)` and `quoteRoute(...)`

- **ABI change:** add `swapper: Account`, which goes into `ctx.caller` for Quote
  hooks. On-chain routers and simulate calls are not the user, so gated or
  discounted fees need to be quoted for an explicit identity.
- Flow: Quote hooks (never custody) → `ptQuote` (read-only, pinned) → subtract
  the out-fee → return. Per hop: 1 `appl` to the pool type plus 1 per Quote hook.
  It is deterministic and has no side effects, so the router can compare it
  on-chain.
- Depth when called by the router plugin: router (0) → Vault (1) → pool type or
  hook (2).

### 5.4 Liquidity: fungible mode (CP)

```
addLiquidity(depositA, depositB, poolId, minLpOut, data):
  readDeposit ×2 → BeforeAdd hooks → ptAdd(mbr: pay 0, req) → checks → mint LP ASA (Vault holds the unissued supply)
  → refund unused A/B from the escrow → AfterAdd hooks → persist
  inner: pay(0 MBR) + appl(ptAdd) + LP xfer + ≤2 refunds + hooks  = 3..5 + hooks
removeLiquidity(lpTransfer, poolId, minA, minB, data):
  BeforeRemove hooks → ptRemove → checks (pro-rata bound) → pay A, B from the escrow (liquid only) → AfterRemove hooks
emergencyRemoveLiquidity(lpTransfer, poolId, minA, minB)        // paused pools only
  VAULT-ONLY MATH: amountX = lp * reserveX / lpSupply, paid from liquid funds; external slots are paid IN KIND:
  receiptOut = lp * slot.receiptAmount / lpSupply  (the LP must be opted in; skip a slot whose receipt is 0)
  No pool-type, hook or valuator call, so no approved app can trap fungible LPs.
```

CP's `ptAdd` reproduces today's math exactly: `sqrt(a*b) - MinimumLiquidity` on
the first deposit, and the limiting side with `mulDivUp` for the other side. The
current tests then keep passing with the same numbers.

### 5.5 Liquidity: position mode (bins)

```
addLiquidityPosition(mbrPay, depositA, depositB, poolId, positionId /*0 = new*/, minShares, data):
  positionId == 0 → Vault creates box o:<cursor> = {poolId, owner: Txn.sender}  (MBR from mbrPay)
  else require positions(positionId).owner == Txn.sender && .poolId == poolId
  Hooks → ptAdd(mbr: pay(remaining mbrPay), req{positionId, data: lower|upper|shape|weights})
  The pool type writes per-bin shares in its own boxes (key = positionId|pageIndex) and creates bin pages as needed
  → Vault refunds unused tokens and any MBR left over
removePosition(poolId, positionId, minA, minB, data: lower|upper|fractionBps):
  owner check → hooks → ptRemove → pay from the escrow → if pt reports position empty: delete box o:, refund MBR
transferPosition(positionId, to)   // owner only; a separate wrapper app can tokenize positions later
```

Fees compound into bins, as in Liquidity Book. That avoids a separate
fee-claim flow, and the immutable Vault has no claim method.

**Bins swap** (pool-type internals, for completeness): walk from `activeId` in
the trade direction. Each bin is constant-sum, `L = P_i·x + y`. Charge
`feeBps` per bin on the input consumed in that bin and credit the LP part to the
bin's reserves. Stop when the input is used up, or revert after
`maxBinsCrossed`. The pool type returns aggregate reserves, and the Vault checks
them against its booked totals: `ptSwap` asserts its internal Σ equals
`req.reserve*` before trading, which catches any desync. Bin pages are 64 bins of
`{x u64, y u64, shares u64}` = 1,536 B, or about 0.62 ALGO of MBR per page.
Each page needs 2 box refs, since box I/O quota is 1 KB per ref.

Emergency exit for **position** pools still depends on `ptRemove`, because only
the pool type knows the shares. Mitigations: keep the bins pool type immutable
(catalog it), and keep `ptRemove` minimal with no hook dependency. With AVM v13
foreign box reads, the Vault could compute bin claims directly (§9).

### 5.6 MBR for pool-type boxes

The Vault never guesses MBR. Mutating pool-type methods that can create boxes
take a grouped `gtxn.PaymentTxn` from the Vault. The Vault forwards the user's
MBR payment, which may be 0. The pool type measures its own `minBalance` delta,
uses what it needs, and refunds the remainder to `owner` with an inner payment.
`createPool` keeps today's measured-cost model: the Vault's MBR delta, plus
escrow funding, plus `PtInitResult.mbrUsed`, with the excess refunded.

### 5.7 `createPool` v2

```ts
createPool(payment: gtxn.PaymentTxn, assetA: uint64, assetB: uint64, poolType: uint64,
           feeBps: uint64, maxFeeBps: uint64, maxHookFeeBps: uint64,
           hooks: HookConfig[], external: ExternalSlot[], params: bytes): uint64
```

1. `poolType` must be approved, and its current `appVersion`
   (`op.AppParams.appVersion`, AVM 12) must equal the approved version. That
   version is pinned in `PoolInfo`.
2. For each hook, copy `approvedHooks(app).version` into `HookConfig.version`.
   Allow at most one `HookFeeOut` hook. Hooks with pricing permissions must
   subscribe to Quote (as today).
3. External slots: there can be at most 2. Each needs an approved valuator with
   its pinned version, `slot.hook` must be in the stack with `External`, and
   `capBps <= MaxExternalCapBps`. The escrow opts into `slot.receipt`, and the
   creator pays that MBR.
4. Escrow creation, opt-ins, LP ASA (fungible mode only) and the pair index are
   unchanged.
5. `ptInitialize` is called with an MBR payment. `lpMode` comes from the result,
   and the Vault asserts it matches the pool type's approval record.
6. AfterInitialize hooks run.

### 5.8 Migration and graduation (launch pools, feature 5)

The Vault is immutable, so the generic entrypoint must exist from day one:

```
migratePool(fromPoolId, toPoolId):   // permissionless
  require from.status == Graduated
  plan = ptMigrationPlan(fromPoolId)          // read-only, pinned
  require to.poolType == plan.poolType && to.feeBps == plan.feeBps && to.assets == from.assets
          && to.creator == from.creator && to.lpSupply == 0
  move liquid A, B from escrow(from) to escrow(to)   (2 pay)
  ptRemove(from, all) → ptAdd(to, …) → mint LP to plan.lpRecipient (burn address = locked liquidity)
  from.status = Migrated
```

Launch fees: an anti-snipe decaying fee is a DynamicFee hook. The pool sets
`maxFeeBps` up to 5,000 at creation, and the launch pool type can require a high
ceiling. The creator tax is a `HookFee` / `HookFeeOut` hook that collects in
ALGO in both directions.

### 5.9 `poke(poolId, hookIndex, data)` (new, generic keeper entrypoint)

`poke` runs the single hook at `hookIndex` at `HookPointPoke`, with custody when
the hook has the permission. The full generalized guard applies. This covers,
with no further Vault changes: consensus keyreg of the escrow (online or
offline), lending deposit and withdraw, reward claims, periodic backruns,
oracle updates and rebalancing. The hook decides who may poke by checking
`ctx.caller`. Inner fees must come from the group credit (`fee: 0`). A fee paid
by the escrow is booked as a loss and fails the settle check. The Vault
deliberately has no keyreg method.

### 5.10 `sync(poolId)` and `revalue(poolId, slot)` (permissionless)

- `sync`: `surplus = liquid(escrow) - (reserve - external) - protocolFees`. When
  it is greater than 0, for example from consensus incentive payouts or stray
  sends, settle it as a donation through `ptSettle`. Requires `lpSupply > 0`, to
  block first-depositor donation games.
- `revalue`: call the valuator, apply the haircut and growth limit, then book the
  value delta as a custody-style delta through `ptSettle`. A downward
  revaluation also goes through `ptSettle` as a negative delta on one side. That
  delta is not a feasible trade, so it **reverts**. Losses therefore need special
  handling: `ptSettle` gets a `writeDown` flag, which the Vault sets *only* on
  this path. The pool type then scales its curve state down on that side (CP:
  plain reserve decrease; bins: pro-rata across bins holding that side).

---

## 6. Generalized custody guard

### 6.1 Algorithm (Vault `runHooks`, custody branch)

```ts
const snap = this.escrowSnapshot(pool)            // liquidA, liquidB, receipt balances of the pool's slots
itxn.payment({ sender: escrow, receiver: escrow, amount: 0, rekeyTo: hookApp.address }).submit()
const result = abiCall<typeof PluginDexHook.prototype.akitaDexHook>({
  appId: hookApp, rejectVersion: hook.version + 1, args: [Global.currentApplicationId, i, ctx],
}).returnValue
loggedAssert(escrow.authAddress === Global.currentApplicationAddress, errMissingRekeyBack)
const after = this.escrowSnapshot(pool)

// signed liquid deltas
let dA = signed(after.liquidA - snap.liquidA), dB = signed(after.liquidB - snap.liquidB)

// external slots: a receipt change is allowed only for slots naming this hook, and only with HookPermExternal
for each slot s (≤ 2):
  if (after.receipt[s] !== snap.receipt[s]):
    loggedAssert(s.hook === hook.app && (hook.perms & HookPermExternal) !== 0, errHookPermission)
    v = abiCall Valuator.akitaDexValue(rejectVersion: s.valuatorVersion + 1, poolId, s.receipt, after.receipt[s])
    booked = conservative(v, s)                         // haircut; growth ≤ maxGrowthBpsPerDay·elapsed; round down
    dSide(s.side) += signed(booked - s.bookValue)       // moving tokens liquid→external is ~neutral
    s.receiptAmount = after.receipt[s]; s.bookValue = booked; s.lastValuedAt = now
    externalSide(s.side) = Σ bookValue                  // must stay ≤ capBps · reserveSide'
// curve settlement
if (dA === 0 && dB === 0)            → nothing
else if (dA ≥ 0 && dB ≥ 0)            → ptSettle (donation: CP adds; bins adds to the active bin)
else if (dA < 0 && dB < 0)            → revert errCustodyInvariant
else                                   → ptSettle (pool type asserts: |gain| ≥ fee-free exact-out cost of |loss|)
pool.reserveA ±= dA; pool.reserveB ±= dB; pool.curve = settle.curve
```

`escrowSnapshot` reads balances only: about 30 opcodes per asset, with no inner
transactions.

### 6.2 Why "feasible fee-free trade" generalizes the k-guard

- **CP:** `(x - a)(y + b) ≥ x·y ⇔ b ≥ y·a / (x - a)`. That is exactly the
  fee-free exact-out cost. Today's tests ("a trade at or better than the curve is
  allowed, a worse one is not", steal, donate) then carry over unchanged in
  behavior.
- **Bins:** walk the bins as a swap would, with fee 0, and require the received
  side to cover the cost. Within one bin this is `x·P + y` not decreasing, the
  bin's constant-sum invariant. Across bins it is the path integral. A plain
  "global invariant" does not exist for bins.
- **Launch curve:** feasibility along the bonding curve. Most launch pools
  should simply not approve custody hooks.

Surplus (the backrun profit) is booked to LPs. CP adds it to reserves. Bins add
it to the active bin after settlement, which matches LB's "donation to the active
bin". A keeper tip can be a later per-pool parameter, `PtSettleResult.surplus*`
already reports it.

### 6.3 External positions: how drain is prevented

| Threat | Control |
|---|---|
| A hook moves tokens to an external account | The receipt must be an ASA **held by the escrow**. Tokens leaving with no receipt arriving show up as a negative liquid delta and fail the settle. |
| A hook swaps receipts for junk or burns them | The receipt balance change is valued by the *independent* valuator, and the loss is booked. A both-sides-negative delta reverts. |
| The valuator is manipulated within the group (e.g. a donation inflates the exchange rate) | The valuator is approved and pinned separately from the hook. Valuation rounds down and takes a haircut. Upward growth is capped per day. LP minting uses booked value (conservative), and removals pay from liquid funds or receipts in kind, never at reported value. |
| Too much of the pool goes external, so swaps cannot pay out | `capBps` per slot, enforced after every change. `ptSwap` and `ptRemove` checks require liquid funds. The External hook can subscribe to BeforeSwap or BeforeRemove to unwind just in time. |
| The venue freezes or loses funds | `revalue` writes down (LPs share the loss, bounded by the cap). The emergency exit pays receipts in kind. |
| Admin approves a bad valuator later | Slots are frozen at creation with a pinned valuator version, so existing pools are unaffected. |

Consensus staking needs **no slot**: the ALGO never leaves the escrow. Keyreg
through a `Poke` custody hook sets the escrow online. Incentive payouts arrive as
surplus and are booked by `sync`. Spendable ALGO is unaffected by online status.
Eligibility for incentive rewards needs the keyreg fee of 2 ALGO paid from the
group credit, not by the escrow.

The first version supports external slots only for pool types whose approval has
`supportsExternal` set (CP). For bins, write-downs across bins and liquid-only
swaps interact badly with the bin walk. Defer that.

---

## 7. Call depth, inner transactions and opcode budget

### 7.1 Depth (AVM max 8, no reentry into an app on the stack)

| Path | Depth used |
|---|---|
| user → Vault (0) → pool type (1); → hook (1) → hook's call (2) → its inners (3) | ≤ 3 |
| ARC-58: `[wallet.arc58_rekeyToPlugin, routerPlugin.swap, wallet.arc58_verifyAuthAddress]`. The router plugin is a **top-level** transaction (0). It sends an inner group `[pay spending→escrow, appl Vault.swapRoute]` with `sender = spending account` (rekeyed). Then Vault (1) → pool type (2) or op-up (3); Vault → backrun hook (2) → adapter (3) → Tinyman (4) → Tinyman inner payout (5) | ≤ 5 |
| router (0) → adapter (1, custody of the spending account) → Tinyman (2) → inner (3) | ≤ 3 |

Reentrancy consequences, by design:

- A hook can never trade on another PluginDex pool. Cross-pool internal arbitrage
  belongs to the router at the top level. A backrun hook only uses external
  adapters.
- Hooks *can* call pool-type read-only methods (`ptAmountToPrice`, `ptQuote`).
- A hook cannot call the router plugin, because the router is on the stack in the
  wallet path. Adapters are called directly by the backrun hook. An adapter is
  not on the stack unless the router is inside an adapter call, which never
  happens.

### 7.2 Inner-transaction pool

There are 16 slots per top-level app call, pooled across the group up to 256.
Inner app calls do not add slots. Typical counts:

| Operation | Inner txns |
|---|---|
| CP swap, no hooks | 2 |
| CP swap, impact fee + tax hook | 5 |
| 4-hop CP route | 8 (+ op-ups if hooked) |
| Bins swap, 10 bins crossed | 2 + pool-type op-ups (≈ 2) |
| Swap + AfterSwap backrun through a Tinyman adapter | ≈ 11 |
| Router plugin: Vault route leg + Tinyman leg + rekey-back | ≈ 3 + 8 + 6 = 17. The group has 3 top-level app calls, so the pool is 48. |

The SDK computes counts by simulate and appends `PluginDex.opUp()` transactions
for the pool and for resource references.

### 7.3 Opcode budget

- Each inner `appl` (pool type, hook, valuator) adds 700 to the pooled budget.
  The Vault spends about 450 to 600 opcodes per swap hop. CP `ptSwap` spends
  about 200.
- Bin walks are paid for **inside the pool type** with
  `ensureBudget(n * BinCost, OpUpFeeSource.GroupCredit)`. Those op-ups run at
  depth +1 relative to the pool type, which is still fine at 4 in the wallet
  path.
- Quotes: off-chain via simulate with `extraOpcodeBudget`. On-chain router
  quotes pay op-ups from the group credit.
- Every inner transaction uses `fee: 0`, which puya defaults to (pooled fee
  credit). The outer fee is set by simulate.

### 7.4 Resources

A CP swap references: escrow app, pool-type app, assets A and B, boxes `p:` and
`h:`, and the recipient. That is 7 of the 8 references. Bins add 2 box refs per
bin page. Recommendation: the SDK puts overflow references on `opUp()`
transactions (group resource sharing), and uses transaction access lists where
the network supports them. The existing note stands:
`populateAppCallResources` regroups `swapRoute` incorrectly, so tests must keep
passing explicit references.

---

## 8. Program size (8,192-byte cap, `extraProgramPages: 3`)

Baseline: the current `PluginDex` approval is **5,697 bytes**, about 4,345 TEAL
operations, so roughly 1.31 bytes per operation. It embeds the 185-byte
`Escrow` program. The largest subroutines today: `createPool` 771 ops,
`runHooks` 545, `addLiquidity` 519, `removeCore` 349, `swapCore` 339.

| Change | Δ bytes (est.) |
|---|---|
| Remove CP math (`swapMath`, `sqrtProduct`, `mulDivUp`, mint and burn math, `assertKNotDecreased`) | −650 |
| Pool-type calls: init, swap, quote, add, remove, settle (ABI encode and decode, pinned version) | +1,150 |
| §4.1 conservation checks | +250 |
| Larger `HookContext` (two snapshots) and `HookResult` (out-fee), single out-fee hook | +250 |
| Generalized custody (signed deltas, settle dispatch) | +200 |
| External slots (snapshot of receipts, valuator call, caps, `revalue`, in-kind emergency) | +650 |
| Positions (box, owner checks, `transferPosition`, add and remove position entrypoints) | +450 |
| Approvals for pool types and valuators (+ version reads) | +250 |
| `migratePool` | +350 |
| `poke`, `sync`, status | +250 |
| **Estimated total** | **≈ 8,550 (range 7,900 to 9,000)** |

This is **over the cap**. Cut list, in order of preference:

1. Drop the read-only getters `getPool`, `getPoolHooks` and `getHookApproval`
   (about 130 ops, −170 B). Clients read boxes directly. Keep `getPairPools` for
   on-chain routers, or let routers take pool ids as arguments.
2. Merge the add and remove entrypoints for fungible and position modes into one
   `addLiquidity(mbr, depA, depB, poolId, positionId, minOut, data)` and one
   `removeLiquidity(...)`, where the LP transfer is optional (a zero-amount
   transfer in position mode): −300 B.
3. Shorter error strings: they are already 7 bytes, so little to gain. Emit
   fewer events: keep `SwapEvent` and `LiquidityEvent`, and drop `CustodyEvent`
   because `poke` and settle data can be logged by the pool type: −150 B.
4. Move `migratePool` math into the pool types. The Vault only moves balances
   and calls `ptRemove` / `ptAdd`, which it already has: −150 B.
5. One shared `callPoolType(method selector, encoded req)` helper using
   `itxn.applicationCall` with raw `appArgs`, instead of six typed `abiCall`
   sites. That saves duplicated inner-transaction setup but loses type safety:
   −300 to −500 B.

With 1 to 4: **≈ 7,800 B**. With 5: **≈ 7,350 B**. Do a **size spike first**:
implement the Vault skeleton with stub pool-type calls and measure, before any
pool-type work.

Other apps (single-app budgets, no cap issue):

| App | Estimate |
|---|---|
| PoolTypeCP (stateless, no boxes) | 1.5 to 2.0 KB |
| PoolTypeBins (pages, positions, distributions, walk, settle, amountToPrice) | 5 to 7 KB (needs 2 to 3 extra pages) |
| PoolTypeLaunch | 2.5 to 3.5 KB |
| Valuator (per venue) | < 0.5 KB |

**Consensus v5 / AVM v13 upside.** Release notes for go-algorand v5.0.0 list "up
to 7 extra program pages", which gives 16 KB. If that is active on mainnet
before the Vault deploy, the cut list becomes optional. Do not depend on it.
Check the activation round before deciding.

---

## 9. AVM v13 options (do not depend on them; type definitions exist in 1.3.1)

`op.AppBox.*` (`app_box_get`/`extract`/...) and
`op.AppParamsSet.appForeignBoxReads(true)` / `appFamilyBoxAccess(true)` are
declared with "Min AVM version: 13".

- **Foreign box reads:** a pool type sets `appForeignBoxReads(true)`. The Vault,
  hooks and routers can then read bin pages directly. Uses: (a) the Vault's
  emergency exit for position pools without calling the pool type, which removes
  the last liveness dependency; (b) cheaper on-chain quoting by routers (still
  math in the reader). **Recommended later.**
- **Family box access** (same creator, read *and write*) would let the Vault
  write pool-type boxes. **Do not use it.** It breaks the isolation between pool
  types and the Vault, and any app the deployer creates later would join the
  family.

---

## 10. What must be decided now vs later

**Now**, because the Vault is immutable and each of these is baked into its ABI
or logic:

1. Vault + singleton pool-type split. No curve math in the Vault, including no
   built-in CP fast path. Cost: +1 inner call and +0.001 ALGO per hop.
2. `PtSwapRequest`, `PtLiquidityRequest`, `PtSettleRequest` and the result
   structs, `CurveSnapshot` including `extra: bytes<32>`, the
   `HookContext`/`HookResult` v2 fields (`exactIn`, `positionId`, `callerApp`,
   `curveBefore`/`curveAfter`, `hookFeeOutBps`), and `quote(..., swapper)`.
3. Version pinning with `rejectVersion` for pool types, hooks and valuators,
   which means compiling the Vault at `targetAvmVersion: 12`.
4. The settle-as-trade guard semantics and the `writeDown` path that only
   `revalue` may use.
5. External-slot model: receipt held in the escrow, slots frozen at creation,
   separate valuator, cap, haircut and growth limit, in-kind emergency exit.
6. LP modes: fungible ASA, Vault position box (with tokenization through a later
   wrapper), and none (launch). Fees compound into bins.
7. Generic entrypoints: `poke`, `sync`, `revalue`, `migratePool`,
   `transferPosition`.
8. Fee ceilings: a per-pool `maxFeeBps` (≤ 5,000) and in plus out hook fees
   ≤ `maxHookFeeBps`.
9. The `data` split into `poolData` and `hookData` (recommended), so bin
   parameters and gate proofs do not collide.
10. Full-fill-or-revert for `exactIn` (no partial fills).

**Later**, because it lives in pool types, hooks, valuators or the router, which
are new apps:

- Bin math details: bin step set, page size, distribution shapes,
  `maxBinsCrossed`, position limits, empty-page deletion.
- Volatility-fee parameters, and whether to update fees per bin inside the bins
  pool type, which would be a second, curve-native mechanism.
- Backrun strategy, keeper tips (the `surplus*` fields are already returned), and
  which venues to support.
- Valuators for Folks, xALGO and Tinyman LP, plus their haircuts and caps.
- Router plugin: split solver, adapter interface (`returnTo` + delta guard), the
  Tinyman v2 adapter.
- Gate integration: discount tiers in hook state, and `gateCheck` versus
  `gateCall`.
- Launch curve shape, graduation threshold, lock versus burn of migrated LP.
- Whether to support exact-out (the ABI already allows it).
- Adopting foreign box reads once AVM v13 is on mainnet.

---

## 11. Migration plan from the current code

PluginDex is in `immutable-catalog.json` with no update method. It does not
appear in a registry (`registryKey: null`) and it was built on Oct 2. Assuming no
mainnet deployment yet, **v2 replaces the code in place before the first
deploy**, keeping the class name and the catalog entry. If it is already
deployed, v2 is a new app id and liquidity moves over through user withdraw and
redeposit. No in-place upgrade is possible.

Changes to the files:

| File | Change |
|---|---|
| `contract.algo.ts` | Remove `swapMath`, `sqrtProduct`, `mulDivUp`, `assertKNotDecreased`, and the CP branches of `addLiquidity`/`removeCore`. `swapCore`/`quoteCore` call `ptSwap`/`ptQuote`. The `runHooks` custody branch becomes §6.1. Add pinning (`rejectVersion`), `checkSwap`/`checkAdd`/`checkRemove`, approvals for pool types and valuators, positions, `poke`/`sync`/`revalue`/`migratePool`. `createPool` gets the new signature. `emergencyRemoveLiquidity` stays Vault-only math, plus receipts in kind. |
| `types.ts` | v2 structs (§3). Keep the field names `reserveA`/`reserveB`/`reserveIn`/`reserveOut` to minimize churn. |
| `constants.ts` | New points and permissions, LP modes, statuses, caps. Box prefixes `t` (pool types), `v` (valuators), `o` (positions), `e` (external). |
| `hook-interface.ts` | Same method name. New structs, so the selector changes. `passResult()` returns 4 fields. |
| `hooks/impact-fee.algo.ts`, `hooks/swap-tax.algo.ts`, `tests/mock-dex-hook.algo.ts` | Recompile for the new structs. MockDexHook gains `ModeExternal` (deposit into a mock "lender" that mints a receipt to the escrow) and `ModePoke`. |
| new `pool-types/pool-type-interface.ts` | §4 interface and helpers (`requireVault`). |
| new `pool-types/constant-product.algo.ts` | Today's math, moved byte-for-byte in behavior. Stateless; `ptSettle` = k check. |
| new `tests/mock-valuator.algo.ts`, `tests/mock-lender.algo.ts` | For external-slot tests. |
| `build` config | The Vault needs `targetAvmVersion: 12`. Check how `scripts/build-contracts.mjs` passes puya options. `algokit compile` must not be used directly, per AGENTS.md. |

Keeping the 23 existing tests:

- Fixture: deploy `PoolTypeCP(vault)`, then `setPoolTypeApproval(cp, LpModeFungible, flags)`.
  `createPool` takes `poolType` plus `maxFeeBps`, `external: []` and
  `params: ''`. `quote` takes `swapper`. Use `extraProgramPages: 3`.
- Every numeric expectation (measured cost, `sqrt` mint, limiting side, swap
  output equal to quote, pro-rata removal, routes equal to `quoteRoute`, hook fee
  caps, the custody steal/keep/elsewhere/donate/trade cases, pause and emergency
  exit, install validations) stays the same, because CP math and the k-guard are
  preserved exactly. The `createPool` measured-cost test now includes CP's
  `mbrUsed = 0`.

New tests (P1):

- A pool type that violates conservation is rejected (mock pool type).
- An updated pool type or hook (version bump) makes calls revert, and the
  emergency exit still works.
- Revoking an approval does not affect existing pools.
- `poke` keyreg on the escrow (LocalNet), and `sync` books a donation.
- External slot: deposit into the mock lender is neutral, theft reverts, a
  write-down through `revalue`, the cap is enforced, receipts are paid in kind
  on emergency exit.
- `HookFeeOut`: tax on sells collected in ALGO, and the combined cap.
- Quote and swap parity with gated (swapper-specific) fees.

Phasing: **P0** size spike for the Vault skeleton (§8) → **P1** Vault v2 +
PoolTypeCP + ported tests → **P2** PoolTypeBins → **P3** volatility hook +
backrun hook + Tinyman adapter → **P4** router plugin → **P5** PoolTypeLaunch +
gated, tax and anti-snipe hooks + `migratePool` end to end.

---

## 12. Risks and open questions

1. **8 KB cap** (§8). The Vault might not fit with every decide-now entrypoint,
   so measure before committing. Fallbacks: the raw `appArgs` dispatcher, or
   waiting for consensus v5's 16 KB.
2. **Trust in pool types:** a buggy pool type can misprice swaps for every pool
   of that type. Conservation checks stop theft but not bad prices. Pool types
   must be immutable, audited and version-pinned. A per-pool slippage limit is
   the user's protection.
3. **Position-pool liveness:** the emergency exit for bins depends on
   `ptRemove` until AVM v13 foreign box reads are available.
4. **Valuator manipulation** within one group: mitigated with the haircut,
   growth cap, cap and conservative use, but never zero. Launch external slots
   only on CP pools.
5. **Pinned hooks** make an upgradable hook a liveness risk: an owner upgrade
   bricks swaps until the pool is paused and LPs exit. That is intended (safety
   over liveness), but document it for hook authors.
6. **Inner-transaction and resource limits** on composed routes (router plus
   backrun) need SDK automation for `opUp()` padding. One mistake there is
   enough to make whole routes fail.
7. **Uniform per-swap dynamic fee** for bins is not LB's per-bin variable fee.
   Volatility capture is weaker on large multi-bin swaps.
8. **`Uint128` inside ABI structs** through `abiCall`: verify that it compiles
   and round-trips in PuyaTs 1.3.1 before freezing `CurveSnapshot`.
9. **AVM 12 target** for the Vault: confirm that the build script can pass
   `targetAvmVersion`, and that LocalNet, TestNet and MainNet all run consensus
   v41 or later (`rejectVersion`).
