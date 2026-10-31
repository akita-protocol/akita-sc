# PluginDex v2, minimal-core angle: hooks as curves

Status: research and design only. No existing source file was changed. The
prototype sources referred to below are saved as `.ts.txt` under
`research/prototype-hooks-as-curves/`, so `npm run build`, which compiles every
`.algo.ts` under `smart_contracts/`, does not pick them up. They were compiled with
the repo's puya-ts 1.3.1 (puya 5.10.1, AVM 11 target, `-O1`) in a scratch copy.
Every byte count in this document comes from those compiles unless it is marked
"est.".

Angle: keep PluginDex's core small. A special, admin-approved permission
(`HookPermCurve`) lets one app own the pricing and the LP positions of a pool. That
app returns amounts, and the DEX moves the money, which is the Uniswap v4
NoOp/return-delta idea. The DEX enforces a generalized guard that does not depend
on the curve. Bins, launch curves, and possibly constant product itself are then
"just approved curve apps".

---

## 0. TL;DR

1. **This works on the AVM, with a clear trust boundary.** A curve app never holds
   funds and never gets custody. It is a pure pricing and bookkeeping oracle for its
   pool, called with an inner call. The pool escrow, rekeyed to the DEX, still holds
   every asset. The DEX enforces these checks itself, for any curve:
   - full fill
   - solvency against in-escrow reserves
   - the protocol-fee split
   - the curve's aggregate reserves must equal the DEX ledger (cross-check on every call)
   - price band: no fill better than the pre-trade marginal price, and the price
     moves against the taker
   - LP mark-to-market value at the pre-call spot price never falls under custody
   - rekey-back
   - caps on fees and external positions

   The curve app enforces its own invariant, for example k for constant product or
   constant-sum inside a bin. Bin-level fairness therefore rests on approved,
   immutable curve code, exactly as in Uniswap v4, where LPs trust custom-accounting
   hooks. The DEX bounds the damage a bad curve can do. It does not prove the curve
   correct.
2. **Measured program size.** The full hybrid prototype (native constant product
   plus a curve slot, external ledger, `sync`, curve-position methods, oracle
   fields, price band) is **8,083 B**. The cap is 8,188 B (8,192 minus the 4-byte
   clear program). That is too tight for an immutable contract. Making constant
   product a stateless curve app (`CpCurve`, 855 B) brings the core to **7,414 B**,
   or **7,144 B** after also dropping `quoteRoute` and two getters. The
   recommendation is this lean core, with every pool owning a curve app.
3. **Bins are feasible as a curve app.** A Liquidity Book swap loop over 512-byte
   bin pages compiles to 870 B for the swap path. It costs about 200 opcodes per
   bin crossed (est.), and the curve call itself adds 700 to the pooled budget. A
   full bin curve with positions is 3 to 4.5 KB (est.), so it fits.
4. **External positions** such as lending deposits or consensus staking are allowed
   only to custody hooks that also hold `HookPermExternal`, and only under these
   rules:
   - the receipt must be held by the escrow itself
   - the DEX keeps a ledger of principal per (pool, hook)
   - principal is capped at `extCapBps` of reserves, set by the admin per hook
   - the DEX books principal, never a reported valuation
   - consensus rewards come in through a permissionless `sync`

   The worst case under a buggy or compromised external hook is the cap.
5. **Must be decided before the immutable deploy:**
   - native constant product in core, or as a curve app
   - the ABI shapes of `HookContext`, `HookResult`, `CurveRequest` and `CurveResult`
     (their method selectors become immutable)
   - the permission bits
   - LP modes
   - the price encoding
   - external-position semantics, including emergency exit
   - how curves and hooks are pinned to a code version (AVM 11 has no `appVersion`)

---

## 1. Contract decomposition

```
                       admin (DAO wallet)
                              │ setHookApproval(app, perms, extCapBps)
                              ▼
 trader / LP / router ──▶ PluginDex (immutable core)
                          ledger: pools, hook stacks, approvals, external principal
                          fund path: every transfer is sent by the DEX from an escrow
                              │
        ┌─────────────────────┼───────────────────────┬─────────────────────────┐
        ▼                     ▼                       ▼                         ▼
  Pool escrow (child    Curve app (1 per pool,  Hook apps (stack)          External venue
  Escrow app per pool)  HookPermCurve)          DynamicFee/HookFee/        (Tinyman, Folks,
  holds reserves, fees, NEVER funds, never      Custody/External           consensus via
  in-flight amounts,    custody; stateless      custody hooks get the      escrow keyreg)
  receipts (fTokens),   (CP) or own state       escrow flash-rekeyed       reached only by
  online keyreg         (bins, launch)          (as today)                 custody hooks
  auth = DEX
```

| App | Holds | Mutability | Notes |
|---|---|---|---|
| `PluginDex` | LP ASA reserve (unissued fungible LP), box MBR, nothing else | **immutable** (immutable-catalog) | ledger and guard only; never prices except through its curve slot |
| Pool escrow (`Escrow` child) | all pool assets, protocol fees, in-flight swap amounts, external receipts | auth = DEX, flash-rekeyed to one custody hook at a time | unchanged from v1: per-pool isolation (PD-02) is kept |
| Curve app (`HookPermCurve`) | its own pricing state (bins, launch config, positions); **no funds** | must be immutable or version-pinned (§9) | one app can serve many pools (state keyed by `poolId`) |
| Hook apps | own state; hook fees paid to them | approved per app | as v1, plus new permission `External` |
| Venue adapters / router plugin | user funds only while flash-rekeyed (ARC-58) | upgradeable plugins | outside the DEX trust boundary |

Why the curve never holds funds: if the curve held reserves, every pool type would
need its own custody guard. Keeping funds in the escrow means one fund path and one
custody guard, and pool isolation is unchanged. The cost is one extra inner app
call per curve operation. That call is budget-positive, because an inner app call
adds 700 opcodes to the pooled budget, and it costs 0.001 ALGO in fees.

Why one curve per pool, set at creation: the pool's pricing must be fixed for the
same reason its hook stack is. LPs need to know exactly what they deposit into.
There is no curve migration inside a pool; graduation creates a new pool (§6.5).

---

## 2. ABI interfaces

All structs are native PuyaTs object types, so they are ARC-4 tuples on the wire.
Field order is chosen so the bools `paused` and `closed` sit next to each other and
pack into one byte. **Changing any of these structs changes the method selector**
(`akitaDexHook(uint64,uint64,(...))(...)`), so they freeze with the immutable core.

### 2.1 Pool ledger

```ts
export type PoolInfo = {
  assetA: uint64; assetB: uint64            // assetA < assetB, 0 = ALGO
  escrow: uint64                            // child Escrow app id
  lpAsset: uint64                           // 0 when lpMode == LpModeCurve
  reserveA: uint64; reserveB: uint64        // LP-owned, INCLUDING external principal
  lpSupply: uint64                          // fungible mode only
  feeBps: uint64; maxHookFeeBps: uint64; hookPoints: uint64
  protocolFeesA: uint64; protocolFeesB: uint64
  creator: Account
  paused: boolean; closed: boolean          // closed: curve-requested (launch graduated / drained)
  // v2
  curve: uint64                             // curve app (lean core: always != 0)
  lpMode: uint64                            // 0 fungible LP ASA, 1 curve-managed positions
  priceX64: bytes<16>                       // canonical spot price, B per A, unsigned Q64.64, big-endian
  activeId: uint64                          // curve's discrete state (bin id), 0 for continuous curves
  lastUpdate: uint64                        // Global.latestTimestamp of the last price-moving op
  externalA: uint64; externalB: uint64      // sum of external principal (subset of reserves)
}
```

The ledger identity that holds outside a call is:

```
holding(escrow, X) == reserveX - externalX + protocolFeesX + unsynced surplus
```

where `holding` is `balance - minBalance` for ALGO and the ASA balance otherwise.

### 2.2 Hook interface (revised)

```ts
// unchanged method name; struct shapes change
akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult

export type HookContext = {
  point: uint64; poolId: uint64
  escrow: Account; caller: Account; recipient: Account   // caller = Txn.sender of the DEX call
  assetIn: uint64; assetOut: uint64
  amountIn: uint64; amountOut: uint64
  reserveIn: uint64; reserveOut: uint64
  lpAmount: uint64; lpSupply: uint64
  feeBps: uint64
  data: bytes                                            // opaque, from the caller
  // v2
  curve: uint64                // pool type app: hooks branch on it (bins vs CP vs launch)
  priceX64: bytes<16>          // spot before this point (after earlier custody hooks)
  priceAfterX64: bytes<16>     // AfterSwap/AfterAdd/AfterRemove: post-op spot; else = priceX64
  activeId: uint64             // bin id before
  activeIdAfter: uint64        // bin id after (After* points)
  lastUpdate: uint64           // timestamp of the previous price-moving op (volatility decay)
  // recommended addition (not in prototype, ~+20 B): version: uint64, ext: bytes
}

export type HookResult = {
  flags: uint64          // HookResultSetFee=1 | HookResultExternal=2
  feeBps: uint64         // DynamicFee
  hookFee: uint64        // HookFee
  extOutA: uint64        // External: principal moved escrow -> position during this call
  extOutB: uint64
  extInA: uint64         // External: principal recalled position -> escrow during this call
  extInB: uint64
}
```

What each planned hook reads:

| Hook | Reads | Returns |
|---|---|---|
| Volatility fee (feature 3) | `priceX64`, `priceAfterX64`, `activeId(After)`, `lastUpdate`, `curve` | `SetFee` at BeforeSwap and Quote; updates its state at AfterSwap |
| Backrun arb (3) | `priceAfterX64`, `reserveIn/Out`, `escrow`, `assetIn/Out` | nothing; custody delta booked by the guard |
| Gated fee (5) | `caller` (spending address, resolved to origin), `data` (GateArgs) | `SetFee` |
| Anti-snipe (5) | `lastUpdate`, pool creation time (kept in its own state at AfterInitialize), `amountIn`, `caller` | `SetFee`; can revert oversize early buys |
| Swap tax (exists) | `amountIn` | `hookFee` |
| External yield (1) | `escrow`, `reserveIn/Out`, `point` | `ExtOut*`/`ExtIn*` with `HookResultExternal` |

### 2.3 Curve interface (the pool type)

```ts
// one method, one call site in the core (one encoder, smallest bytecode)
akitaDexCurve(dex: Application, req: CurveRequest): CurveResult

export type CurveRequest = {
  op: uint64             // CurveOpInit=1 Swap=2 Quote=3 Add=4 Remove=5 Settle=6
  poolId: uint64
  caller: Account        // DEX-attested Txn.sender: the position owner in curve-managed mode
  inIsA: boolean         // Swap/Quote direction
  amountA: uint64        // Swap/Quote: amountIn on the input side (net of hook fees)
  amountB: uint64        // Add: deposits. Settle: |delta| per side
  negA: boolean          // Settle: sign of the delta (true = left the pool)
  negB: boolean
  lpAmount: uint64       // Remove (fungible): LP burned
  lpSupply: uint64
  feeBps: uint64         // after DynamicFee hooks
  protocolFeeBps: uint64 // so the curve can keep the protocol share out of its bins
  reserveA: uint64       // DEX ledger before the op (stateless curves price from these)
  reserveB: uint64
  args: bytes            // Init: pool params. Add/Remove: position shape (bins, ids, shares)
}

export type CurveResult = {
  amountA: uint64        // Swap: in or out per side. Add: used. Remove: paid out
  amountB: uint64
  lpFee: uint64          // Swap: LP fee in input units (protocol share = lpFee * protocolFeeBps)
  shares: uint64         // Add: minted (fungible -> LP ASA). Remove: burned
  priceX64: bytes<16>    // post-op spot
  activeId: uint64
  reserveA: uint64       // curve's aggregate after the op: MUST equal the DEX ledger
  reserveB: uint64
  flags: uint64          // CurveFlagClose=1 (no more swaps or adds; removes allowed)
}
```

Curve obligations, which the approval review checks and tests enforce:

- `Quote` writes nothing and returns exactly what `Swap` would.
- It checks `Global.callerApplicationId === dex` and never calls the DEX. The AVM
  forbids reentry anyway.
- Rounding always favours the pool.
- `Settle` accepts a custody delta only if the curve invariant does not decrease
  (§4.3).

### 2.4 Approvals

```ts
approvedHooks = BoxMap<uint64, HookApproval>({ keyPrefix: 'a' })
export type HookApproval = { perms: uint64; extCapBps: uint64 }

setHookApproval(hook: uint64, perms: uint64, extCapBps: uint64): void  // admin
getHookApproval(hook: uint64): HookApproval

// Perm bits
HookPermCustody   = 1   // flash-rekeyed escrow, guarded (v1)
HookPermDynamicFee= 2   // v1
HookPermHookFee   = 4   // v1
HookPermCurve     = 8   // NEW: may be a pool's curve app. Never valid in a hook stack.
HookPermExternal  = 16  // NEW: custody hook may book external principal. Requires Custody.
```

### 2.5 Core methods (lean core)

```ts
create(version: string, admin: Account): void                       // unchanged
opUp(): void
setAdmin(admin), setProtocolFee(bps, treasury), setPoolPaused(poolId, paused)
setHookApproval(hook, perms, extCapBps)                              // + extCapBps
collectProtocolFees(poolId)
sync(poolId): void                                                   // NEW: book unaccounted escrow surplus

createPool(payment: gtxn.PaymentTxn, assetA, assetB, feeBps, maxHookFeeBps,
           hooks: HookConfig[], curve: uint64, lpMode: uint64, curveArgs: bytes): uint64   // + 3 args
addLiquidity(depositA, depositB, poolId, minLpOut, data): uint64     // fungible pools
addLiquidityCurve(depositA, depositB, poolId, minShares, curveArgs, data): uint64          // NEW
removeLiquidity(lpTransfer, poolId, minA, minB, data): RemoveResult  // fungible pools
removeLiquidityCurve(poolId, minA, minB, curveArgs, data): RemoveResult                    // NEW
emergencyRemoveLiquidity(lpTransfer, poolId, minA, minB): RemoveResult
swap(input, poolId, minOut, recipient, data): uint64
swapRoute(input, route: uint64[], minOut, recipient, data): uint64
quote(poolId, assetIn, amountIn): uint64                             // readonly
getPool, getPairPools                                               // readonly
// dropped to make room: quoteRoute (the router loops quote), getPoolHooks, and the
// old uint64 getHookApproval (all boxes are public off-chain)
```

---

## 3. Flows

Notation: `C()` = inner call to the pool's curve, `H()` = inner call to a hook,
`T()` = inner payment or asset transfer, `R()` = flash-rekey payment.

### 3.1 swap (constant product or bins: one code path)

```
swap(input, poolId, minOut, recipient, data)
  deposit = readDeposit(input, escrow)                 // as v1
  pool = load(poolId); assert !paused && !closed
  ctx  = context(pool, ...)                             // includes priceX64/activeId/lastUpdate
  before = runHooks(BeforeSwap)                         // fees, hook fees (T to hook), custody (+Settle)
  amountIn' = amount - before.hookFees
  r = C(Swap, inIsA, amountIn', feeBps=before.feeBps, protocolFeeBps, reserves)
  // DEX-side checks, whatever the curve:
  assert r.in == amountIn'                              // full fill (exact-in)
  assert r.lpFee <= amountIn'
  assert 0 < r.out < reserveOut - externalOut           // in-escrow solvency
  band: inIsA ? out*2^64 <= (in-lpFee)*P0 && P1 <= P0   // P0 = pool.priceX64 (pre), P1 = r.priceX64
              : out*P0   <= (in-lpFee)*2^64 && P1 >= P0
  protocolFee = lpFee * protocolFeeBps / 1e4
  reserveIn += in - protocolFee; reserveOut -= out; protocolFeesIn += protocolFee
  assert r.reserveA == reserveA && r.reserveB == reserveB   // aggregate cross-check
  pool.priceX64 = P1; pool.activeId = r.activeId; pool.lastUpdate = now
  if r.flags & Close: pool.closed = true
  after = runHooks(AfterSwap)  ctx.priceAfterX64 = P1   // backrun custody runs here (+Settle)
  save; emit SwapEvent; assert out >= minOut; T(escrow -> recipient)
```

The price band is the generic swap guard, and it costs about 100 opcodes
(4 BigUint ops). A curve cannot pay out above its own last published marginal
price. Because each operation's `priceBefore` is the previous operation's stored
`priceAfter`, a curve cannot quietly re-price between calls. The band cannot stop
a malicious curve that reports a far-off `priceAfter`. The next taker would trade
at that price and LPs would lose the difference. That is the residual trust (§8).

Constant-product correctness: for CP the average fill is strictly worse than
marginal, and the post price is `rB/rA`, so the band always passes. For bins, a
fill inside one bin is exactly at the bin price (constant sum), which equals `P0`,
so `<=` holds after rounding down.

### 3.2 quote (hook-aware, deterministic)

```
quote(poolId, assetIn, amountIn)
  run = runHooks(Quote)                  // never custody (as v1)
  r = C(Quote, ...)                      // same checks as swap except the commit
  return r.out
```

Determinism comes from different places by curve type:

- **Stateless curves** (constant product, and stable-swap later): quote equals swap
  by construction, because the curve prices only from `req.reserveA/B`, which come
  from the DEX ledger.
- **Stateful curves** (bins, launch): determinism is a code obligation, because
  `Quote` branches to the same loop with `commit = false`. The DEX cannot detect a
  curve that writes state in `Quote`. The approval review and tests enforce it.

An on-chain router runs `quote` as a real inner call. A curve that misbehaves on
`Quote` can only make that router's own transaction revert or misroute. The
aggregate `minOut` still protects the user.

### 3.3 swapRoute (escrow-to-escrow)

Unchanged in shape. Each hop runs the full `swapCore` (hooks, then `C(Swap)`, then
hooks). Per hop: `ensureBudget(HopBudget)` (1 op-up inner), then `C()`, then
`T(escrow_i -> escrow_{i+1})`. A hop can enter a pool of any type, so a constant
product pool can route straight into a bin pool.

### 3.4 Liquidity

| Mode | Add | Remove | Who keeps the shares |
|---|---|---|---|
| Fungible (`lpMode 0`): CP, launch | `addLiquidity`: `C(Add, amounts)` returns used amounts and `shares`. The DEX asserts used ≤ deposited, mints the LP ASA, and refunds the excess | `removeLiquidity`: LP ASA to the DEX. `C(Remove, lpAmount)`: the DEX asserts `shares == lpAmount` and pays out | DEX (LP ASA) |
| Curve-managed (`lpMode 1`): bins | `addLiquidityCurve(..., curveArgs)`, with args = distribution `{lowerId, n, weightsA[], weightsB[]}`. `C(Add)` writes the positions | `removeLiquidityCurve(poolId, ..., curveArgs)`, with args = `{ids[], shares[]}`. `C(Remove, caller)` checks ownership | curve app, keyed `(poolId, owner, page)` |

Both modes end with the aggregate cross-check, and removes also check
`reserveX >= externalX`: external principal must be recalled first by a
BeforeRemove External hook.

The owner is `CurveRequest.caller = Txn.sender` of the DEX call. A curve cannot be
told some other owner. For ARC-58 wallets that is the spending address (the router
sends as the rekeyed spending account), so positions belong to the wallet.

`MinimumLiquidity` for fungible curve pools is applied by the DEX: on the first
deposit it mints `shares - 1000` to the user and counts 1000 in `lpSupply` (as v1).
The prototype omits this; it adds about 30 B.

### 3.5 createPool

```
createPool(pay, A, B, feeBps, maxHookFeeBps, hooks, curve, lpMode, curveArgs)
  assert approval(curve).perms & Curve; assert lpMode in {0,1}
  validateHooks(hooks)          // also rejects HookPermCurve in stacks; External => Custody
  escrow create + fund + rekey + opt-ins (as v1)
  if lpMode == Fungible: create the LP ASA
  r = C(Init, args=curveArgs)   // curve allocates its boxes (MBR: see below), sets price/activeId
  bookCurve(r)                  // aggregate must be (0,0)
  write pool, hooks, pairPools; run AfterInitialize hooks; charge measured MBR, refund the rest
```

Curve box MBR: the curve's boxes belong to the curve app account. Two options:

- `curveArgs` names a payment the curve checks (group txn)
- the creator funds the curve app account in the same group, and the curve asserts
  its balance covers the new boxes

The DEX does not intermediate either way. The same applies to bin pages created by
`Add` (the depositor pays, in the same group).

---

## 4. The generalized custody guard

### 4.1 Layers

| Layer | Enforced by | Check | Always on |
|---|---|---|---|
| L0 | DEX | escrow `authAddress == DEX` after every custody call | yes |
| L1 | DEX | **conservation**: every escrow balance change during custody is booked. Declared external moves are netted; the remainder is a reserve delta | yes |
| L2 | DEX | **value at pre-call spot**: `V = rA*P0 + rB*2^64` must not fall, with `P0 = pool.priceX64` before the call | yes, curve-agnostic, est. +120 B |
| L3 | curve (`Settle`) | the curve's own invariant on the delta (k for CP, trade-through-bins for bins, launch curve) | yes |
| L4 | DEX | external principal per hook ≤ `extCapBps × reserve`, and only escrow-held receipts | `External` only |
| L5 | DEX | aggregate cross-check after `Settle` | yes |

L2 is what makes this angle safe enough. Even if a curve's `Settle` is wrong, a
custody hook cannot lower the LPs' mark-to-market value at the price that held
before it got custody. It can at most trade at mid-price and capture the
price-impact premium the curve would have charged. For CP, the curve's k check
(L3) closes that gap. In the hybrid variant, native CP keeps the hard k-check in
core.

### 4.2 Algorithm (in `runHooks` custody branch; prototype `settleCustody`)

```
balA,balB = holding(escrow)                              // before rekey
R(escrow -> hook); res = H(ctx); assert auth(escrow) == DEX
ext = res.flags & External ? res.ext* : 0                // non-External hook with ext flag -> revert
afterA = holding(escrow,A) + extOutA                     // principal sent out still belongs to LPs
beforeA = balA + extInA                                  // recalled principal is not a gain
if any ext: assert hook has External; ledger(pool,hook) += out - in (never < 0)
            assert ledger.principalX <= reserveX * extCapBps / 1e4
            (L4 also: the receipt-asset balance of the escrow must not fall, est. +40 B)
newA = reserveA + (afterA - beforeA)   // signed; assert >= 0
L2: assert newA*P0 + newB*2^64 >= reserveA*P0 + reserveB*2^64
if (newA,newB) != (reserveA,reserveB):
   r = C(Settle, |dA|,negA, |dB|,negB, reserves)          // L3
   assert !(negA && negB)                                // both sides out is never acceptable
   reserves = new; assert r.reserves == reserves         // L5
   pool.price = r.price                                  // custody trades move price legitimately
emit CustodyEvent
```

### 4.3 `Settle` semantics per curve

| Curve | Donation (both deltas ≥ 0) | One side out |
|---|---|---|
| CP (stateless) | accept | `(rA±dA)(rB±dB) ≥ rA·rB` (v1 k-guard, moved) |
| Bins | add to the active bin, as fees go to active-bin LPs | simulate `Swap(in = positive side)` through the bins with `fee = pool.feeBps`, and require `out ≥ |negative side|`. Commit that swap and donate the surplus to the active bin |
| Launch (virtual reserves) | accept | k over `(real + virtual)` reserves |

This is exactly the v1 rule restated per curve: "a custody hook must leave LPs at
least as well off as a swap against the curve."

### 4.4 External positions without silent drain

Rules (all DEX-enforced except where noted):

1. **The receipt lives in the escrow.** Lending deposits are made from the escrow,
   so the fToken lands in the escrow. Consensus staking is a keyreg of the escrow,
   and the ALGO never leaves it. A hook therefore never holds LP value in its own
   account. Emergency exit can pay receipts pro-rata. Not in the prototype: est.
   +150 to 250 B. `ExternalPosition.receipt` records the asset id.
2. **Principal accounting, never mark-to-market.** `reserves` include principal.
   Yield becomes reserves only when realized: recalled, or harvested into the
   escrow as the pool asset (booked as a donation by L1). A lying valuation
   function therefore cannot inflate LP minting or redemption.
3. **Caps.** `extCapBps` comes from the approval, per hook. Swaps can only pay from
   in-escrow liquidity (`out < reserveOut - externalOut`). Removes require
   `reserve >= external` after the payout, so an External hook must subscribe to
   BeforeRemove and recall enough. Max loss from a bad external hook is
   `extCapBps × reserves`.
4. **Realize before mint or burn.** An External hook must subscribe to
   `BeforeAddLiquidity` and `BeforeRemoveLiquidity` (validated at install, est.
   +20 B) and harvest there. That way a JIT depositor cannot capture accrued
   unrealized yield, and a leaver cannot be paid without it.
5. **Losses.** A recall that returns less than principal fails L1/L2 and reverts.
   To realize genuine bad debt, add an admin-only
   `writeDownExternal(poolId, hook, lossA, lossB)`, allowed only while paused. It
   lowers principal and reserves together and emits an event. That is admin power
   over LP accounting, so decide whether to include it (§10).
6. **Valuation (reporting only).** An approved External hook exposes
   `akitaDexValue(poolId): {valueA, valueB}` as readonly, computed from venue state
   (for example the Folks fToken exchange rate). The DEX never calls it on the fund
   path. Frontends, oracles and the hook's own recall logic use it.
7. **Consensus rewards** accrue as escrow balance and are booked by the
   permissionless `sync(poolId)`. Surplus = holding − (reserve − external + fees),
   added to reserves (CP) or passed through `C(Settle)` as a donation (bins).
   - **JIT risk.** Someone can add liquidity just before a large `sync` and capture
     part of it. Mitigation: the staking hook calls `sync`-equivalent booking at
     BeforeAdd/BeforeRemove (rule 4), so surplus is booked before any mint or burn.
   - **Online costs.** Taking the escrow online with `incentiveEligible` costs
     2 ALGO from the escrow. The hook must donate that first, or L1 fails.
     Opting into a receipt ASA raises the escrow MBR by 0.1 ALGO, so the hook must
     also donate the MBR first, because `holding` excludes MBR.

---

## 5. Inner transactions, call depth and opcode budget

### 5.1 Inner transactions per operation (DEX-side, lean core)

| Operation | v1 | v2 lean | Note |
|---|---|---|---|
| swap, no hooks | 1 (payout) | 2 | + `C(Swap)` |
| per DynamicFee/HookFee hook | 1 (+1 hook-fee transfer) | same | |
| per custody hook | 2 + hook's own (≥ 1 rekey back) | 2 + hook's + **1 `C(Settle)` if reserves changed** | |
| swapRoute, per extra hop | op-up 1 + transfer 1 | + `C(Swap)` 1 | |
| add/remove | 1 to 3 | + `C(Add/Remove)` 1 | |
| bins crossing > ~5 bins | n/a | + op-ups inside the curve | the curve calls `ensureBudget(…, GroupCredit)` |

The inner-transaction pool is 16 per top-level app call in the group, capped at
256. Inner app calls spend from it but do not add to it. A wallet-to-router group
has 3 top-level app calls (`arc58_rekeyToPlugin`, the router, `verifyAuthAddress`),
which gives 48 inners. That is enough for a 3-hop route with two hooks per pool.
Longer routes append `PluginDex.opUp()` top-level calls, each adding 16 inners
and 700 budget.

### 5.2 Call depth (max 8; no app may appear twice on the stack)

```
wallet group (top level):  arc58_rekeyToPlugin | RouterPlugin (depth 0) | arc58_verifyAuthAddress
RouterPlugin(0)
 ├─ native leg: [axfer spending->escrow, PluginDex.swapRoute](1)
 │     ├─ Curve(2)                                   // pricing, no inners (op-ups only)
 │     ├─ DynamicFee hook(2) ─▶ Staking.getInfo / Gate.check(3)   // gated pools
 │     └─ AfterSwap Backrun custody hook(2)
 │           ├─ R/T from escrow (3)
 │           └─ TinymanAdapter(3) ─▶ Tinyman v2 AMM(4) ─▶ AMM payout(5)   (or Tinyman directly at 3)
 └─ external leg: VenueAdapter(1) ─▶ Tinyman(2) ─▶ payout(3)
```

The worst case is depth 5. Reentrancy rules that follow from this angle:

- **A curve or hook can never call PluginDex**, because the DEX is on the stack.
  A backrun hook therefore cannot arbitrage against another PluginDex pool, only
  against external venues. A launch curve cannot migrate itself (§6.5).
- **A hook cannot call the router plugin** while the router is the outer frame.
  Venue adapters must be standalone apps, callable both by the router and by
  backrun hooks. An adapter used in an earlier leg has returned, so it is no
  longer on the stack.
- **The curve app is never in a hook stack.** `validateHooks` rejects
  `HookPermCurve` in stacks. `C(Settle)` runs after the custody hook has
  returned, so it would not be reentry, but keeping pricing and custody in
  separate apps keeps the custody guard independent of the curve.

### 5.3 Opcode budget

Every top-level app call adds 700, and every inner app call adds 700 to the pool.

DEX-side v2 overhead per swap, beyond v1 (est.):

- request encoding about 60
- result decoding about 40
- price band about 100
- cross-check and booking about 30

That is about 230 in total, more than covered by the curve call's own 700.

- **CpCurve:** about 150 ops (est.), so the CP path is budget-positive overall.
- **BinCurve:** swap loop (prototype `bin-curve.algo.ts.txt`):
  - about 130 TEAL instructions per iteration
  - 3 BigUint ops (`b*` and `b/`, about 20 each in budget terms, est.)
  - one `box_get`/`box_put` per 32-bin page

  That is about 200 per bin crossed, plus about 400 fixed. Crossing 10 bins costs
  about 2.4 K, which needs about 1 to 2 op-ups inside the curve.
- **Volatility hook:** about 200 (BigUint price delta). Gated hook: about 300 plus
  the gate or staking inner call (each brings its own 700).
- **Backrun hook:** reads Tinyman pool local state (`AppLocal.getExUint64` ×4),
  computes the optimal size (one `bsqrt`), and issues 2 inners plus 1 app call.
  About 600.

`swapRoute` keeps `ensureBudget(HopBudget = 1400, GroupCredit)` per hop. The
router overpays outer fees to fund op-ups.

### 5.4 Resources (8 refs per txn, group sharing)

- Bin pages are boxes of the curve app. A swap's pages are unknown until it runs,
  so the client simulates with `allowUnnamedResources` and attaches the box refs
  (at most 1 KB of I/O quota per ref, and a 512 B page = 1 ref).
- On-chain routers that pick pools dynamically must over-reference ±N pages per
  bin pool. Access lists help at the top level. PuyaTs 1.3.1's inner
  `ApplicationCallFields` has no access-list field (only
  `accounts`/`assets`/`apps`), so inner calls rely on group resource sharing.
- AVM 13 `AppBox` foreign reads (`appForeignBoxReads`) would let routers price
  bins without calling the curve. The repo targets AVM 11 today, so do not depend
  on it.

---

## 6. How features (2) to (5) map onto this core

### 6.1 Bins (feature 2): `BinCurve` (HookPermCurve, lpMode 1)

- State, all keyed by `poolId` in one curve app:
  - `pools(poolId) → { binStep, activeId, activePriceX64, reserveA, reserveB, baseFee, varFeeParams… }`
  - pages `g|poolId|page → 32 × (x u64, y u64)`, 512 B
  - liquidity supply per bin: `s|poolId|page → 32 × u64`
  - positions `o|poolId|owner|page → 32 × u64` shares
  - a non-empty-page bitmap `m|poolId`
- Price per bin is computed incrementally:
  `P(id±1) = P(id)·(1e4+binStep)/1e4` (Q64.64 BigUint). Init computes `P(activeId)`
  once by square-and-multiply (about 25 iterations, about 600 ops, Init only).
- The LB variable fee (volatility accumulator per bin crossed) is computed
  **inside** the curve, so the bin path is exact. The external volatility hook is
  for CP pools.
- The protocol fee must be taken per bin, not just from the aggregate, or the
  cross-check fails. The prototype sketch does not do this yet.
- Size (est.): swap 870 B (measured, swap only) + add/remove/positions/bitmap about
  2.5 KB, for a total of about 3.5 KB.

### 6.2 Volatility fee and backrun (feature 3)

- **`VolatilityFeeHook`** (DynamicFee; BeforeSwap, Quote, AfterSwap). Per-pool
  state `{vAcc, vRef, pRef, tLast}`.
  - At AfterSwap it adds `|priceAfter − pRef|·1e4/pRef` to `vAcc`, with LB-style
    filter and decay windows on `lastUpdate`.
  - At BeforeSwap and Quote it returns `fee = base + A·vAcc²` (capped by
    `MaxFeeBps`).
  - The fee reflects past volatility, not the current swap. That is the hook-model
    limitation, and why bins carry their own exact fee.
- **`BackrunHook`** (Custody; AfterSwap):
  1. Reads `priceAfterX64` and the Tinyman pool's reserves.
  2. Computes the size that equalizes prices net of both fees.
  3. If the profit exceeds a safety margin, runs the trade from the escrow: it sends
     A to Tinyman and receives B into the escrow, then rekeys back.
  4. L1, L2 and L3 book the result. The profit is a donation to LPs (k rises for CP,
     the active bin for bins).

  If the trade is unprofitable it does nothing, because a loss would revert the
  user's swap. It never targets PluginDex pools (reentrancy).

### 6.3 Router (feature 4)

The core changes nothing for the router beyond §3.2:

- curve-aware `quote`
- `pairPools` enumeration
- `quoteRoute` removed (the router loops `quote`)

Split execution is router-side with an aggregate `minOut`. Venue adapters are
standalone custody adapters. See the sibling `venues.md` for Tinyman v2 and Pact
details.

### 6.4 Gated pools (feature 5a): `AkitaGateFeeHook` (DynamicFee; BeforeSwap, Quote)

- `origin = getOrigin(escrowFactory, ctx.caller)` maps a wallet spending address to
  the user.
- Tier from `getStakingPower(staking, origin, AKTA)` or `getUserImpact(dao, origin)`,
  then `SetFee(base − discount)`. A hard gate variant reverts unless
  `gateCall(dao, origin, gateId, decode(ctx.data))`.
- Quote consistency: the router must send `quote` with `sender = spending account`,
  so the tier matches the swap.

### 6.5 Creator launch (feature 5b)

- **Pool 1 (launch):**
  - `LaunchCurve` (Curve, fungible). Config in curve state:
    `{virtualA, gradThresholdA, phase}`.
  - Prices k over `(realA+virtualA, tokens)`, the pump.fun style.
  - When `realA ≥ threshold` on a swap it returns `CurveFlagClose`. Swaps and adds
    stop; removes stay open.
  - Hooks: `SwapTaxHook` (exists) and `AntiSnipeFeeHook` (DynamicFee, decaying from
    AfterInitialize time, optional max buy per caller per round).
- **LP ownership.** The creator's LP is minted to a `LaunchVault` app, so it is
  locked by custody of the LP ASA. It is not locked by a hook. A hook in the
  BeforeRemove path would be reentered when the vault itself calls `remove`.
- **Graduation**, a top-level call by anyone: `LaunchVault.graduate(poolId)`
  1. `removeLiquidity` on pool 1. The path is Vault(0) → DEX(1) → LaunchCurve(2);
     the vault is not the curve, so there is no reentrancy.
  2. Burn the token excess above the final curve price.
  3. `createPool(CpCurve, hooks=[SwapTax, AntiSnipe?])` + `addLiquidity`.
  4. Keep the new LP locked in the vault.

  The router skips `closed` pools (in `getPool`).
- **Why not migrate inside one pool:** the pool's curve is fixed, and a curve
  cannot call the DEX to move its own liquidity.
- **Alternative:** a launch with virtual reserves could be native in a hybrid core
  (2 fields, est. +60 B). In the lean core it is just another stateless curve with
  per-pool config.

---

## 7. Program size (cap 8,192 = approval + clear, extraProgramPages 3)

Measured with puya-ts 1.3.1, AVM 11, `-O1`. `-O2` was 22 to 24 B *larger* on
both the v1 and v2 builds.

| Build | Approval bytes | Headroom vs 8,188 |
|---|---|---|
| v1 `PluginDex` (current) | 5,697 | 2,491 |
| v2 hybrid, full prototype (native CP + curve slot + external ledger + sync + curve liquidity methods + oracle fields + price band) | **8,083** | 105 |
| v2 hybrid − `quoteRoute`, `getPoolHooks`, `getHookApproval` | 7,812 | 376 |
| **v2 lean (CP as `CpCurve`), full** | **7,414** | 774 |
| v2 lean − the same three methods | 7,144 | 1,044 |
| `CpCurve` (stateless, separate app) | 855 | n/a |
| `BinCurve` swap path only (sketch) | 870 | n/a |

Measured marginal cost of each v2 feature (removed from the 8,083 B hybrid build):

| Feature | Bytes |
|---|---|
| native constant product (swap/add/remove/k/price) | 669 |
| `addLiquidityCurve` + `removeLiquidityCurve` | 373 |
| `sync` | 270 |
| external-principal ledger | 257 |
| `quoteRoute` | 168 |
| `getPoolHooks` + `getPairPools` + `getHookApproval` | 161 |
| price band | 113 |

Not yet in the prototype (est.):

- L2 value guard: +120
- emergency pro-rata of receipt assets: +150 to 250
- External-requires-BeforeAdd/Remove validation: +20
- `MinimumLiquidity` for fungible curve pools: +30
- `HookContext.version`/`ext`: +20
- receipt-balance check: +40

That is about +400 to 500 in total. The lean core lands at about **7.6 to 7.9 KB**
with `quoteRoute` and the two getters dropped, which leaves 300 to 600 B for audit
fixes. The hybrid would be about **8.2 to 8.6 KB**, which does not fit.

If more room is needed, the next levers are, in order:

1. Move `sync` into the External hook path (−270).
2. Drop `addLiquidityCurve`/`removeLiquidityCurve` and route curve-managed
   liquidity through `addLiquidity`/`removeLiquidity` with the curve args in a
   prefixed `data` (−373, but it conflates hook data).
3. Move the pair index out to a registry app.

---

## 8. Evaluation: how far "hooks as curves" goes on the AVM

| Question | Answer |
|---|---|
| Can an approved app fully replace pricing? | Yes. One inner call per operation. The DEX keeps funds, the ledger and all transfers. |
| Can the core enforce correctness of an arbitrary curve? | No, only bounds: conservation, solvency, aggregate equality, price monotonicity and band, value-at-spot under custody, and caps. Bin-level fairness and position ownership are curve code. Same as Uniswap v4 NoOp hooks. |
| Where does state live? | In the curve app, keyed by poolId. The DEX caches `priceX64`, `activeId` and `lastUpdate` for hooks and routers, and the aggregate reserves as its own ledger. |
| Quote determinism? | By construction for stateless curves (they price from DEX-supplied reserves). By code obligation for stateful curves. The DEX cannot detect writes in Quote (AVM 11 has no static-call). |
| Liveness? | A curve-managed pool's positions exist only in the curve. If the curve reverts, LPs are stuck, and pausing does not help, because `emergencyRemove` must still ask the curve for amounts. Mitigations: curves are dependency-free and immutable, and `Remove` must not depend on other apps. A fungible-mode pool *can* fall back to DEX-side pro-rata in `emergencyRemove` without calling the curve (est. +60 B). Recommend implementing that fallback. |
| Composability limits? | No curve or hook may call PluginDex (reentrancy), so the backrun only works against external venues. Launch graduation needs an external vault app. |
| Budget/inner pressure? | Modest: +1 inner per curve op, budget-positive. Bins need in-curve op-ups for long crossings. |

Compared with putting curves in the core, for example bins in core: this design
gives up DEX-proven bin math in exchange for about 2 to 4 KB of core room and the
ability to ship new pool types without redeploying an immutable core. Compared
with the sibling Vault design (`design-vault.md`, pool-type singletons): that
design also keeps pool-type apps off the fund path. The difference here is the
uniform "everything is a curve app" choice, the L2 value guard, and measured sizes
for both the hybrid and lean variants.

---

## 9. Immutability, version pinning, and migration

### 9.1 Immutability constraints

- `PluginDex` is in `scripts/lib/immutable-catalog.json`, and
  `prepareImmutable` refuses artifacts with an `UpdateApplication` path. Every
  change here therefore means a new app id. The extension points (the curve slot,
  the perm bits, the struct shapes) must be in the first mainnet deploy. Check
  that no mainnet receipt exists for `PluginDex`. If one does, v2 is a parallel
  deploy with LPs migrating by remove plus add, not an in-place upgrade.
- Curves and hooks hold LP value or pricing authority, so approval must bind to
  code. AVM 11 (the current target, `#pragma version 11`) has no `appVersion`.
  `AppParams.appVersion` and itxn `rejectVersion` need AVM 12, according to the
  1.3.1 typings. Options:
  - **Now:** the admin approves only curves or hooks whose ARC-56 spec has no
    `UpdateApplication` or `DeleteApplication` path. This is the same check as
    `prepareImmutable`, run off-chain. Record `sha512_256(appApprovalProgram)` in
    `HookApproval` and re-check it at `createPool` (est. +60 B; about 50 to 300
    opcodes once per pool).
    - Verify: whether `AppParams.appApprovalProgram` fails for programs over the
      4,096-byte stack limit. If it does, require curves and hooks under 4 KB or
      skip the hash.
  - **Later (AVM 12 target):** store `appVersion` at approval and pass
    `rejectVersion = approved + 1` on every `C()` and `H()`. An updated curve then
    halts its pools instead of silently changing behaviour.

### 9.2 Code migration (from today's `contract.algo.ts`)

1. **types.ts:**
   - `PoolInfo` gains `curve`, `lpMode`, `closed`, `priceX64`, `activeId`,
     `lastUpdate`, `externalA` and `externalB`. Put `closed` next to `paused`.
   - `HookContext` gains 6 fields, plus `version`/`ext` if adopted.
   - `HookResult` gains 4 fields.
   - New types: `CurveRequest`, `CurveResult`, `HookApproval`,
     `ExternalPosition`, `ExtKey`.
2. **constants.ts:**
   - `HookPermCurve=8`, `HookPermExternal=16`, `HookPermAll=31`
   - `HookResultExternal=2`
   - `CurveOp*`, `CurveFlagClose`, `LpMode*`
   - box prefix `'e'`
3. **hook-interface.ts:** `passResult()` gains the zero ext fields. Add the
   `PluginDexCurve` interface class and an `emptyCurveResult()` helper.
4. **contract.algo.ts:**
   - `swapMath` → `price(poolId, pool, inIsA, amountIn, feeBps, commit)`, which
     dispatches to `C()` (lean) or native CP plus `C()` (hybrid) and owns the band
     and the cross-check.
   - The inline custody block → `settleCustody` (L0 to L5).
   - `addLiquidity` → `addCore`.
   - `removeCore` takes `lpAmount` instead of the gtxn (`readLpTransfer` split out).
   - `createPool` gains `+curve, lpMode, curveArgs`, creates the LP ASA only for
     fungible pools, and calls `C(Init)`.
   - `setHookApproval` gains `+extCapBps`.
   - New: `sync`, `addLiquidityCurve`, `removeLiquidityCurve`.
   - Remove `quoteRoute`, `getPoolHooks`, and the uint64 `getHookApproval`.
5. **Hooks:** recompile `ImpactFeeHook`, `SwapTaxHook` and `MockDexHook`. Their
   method selectors change with the structs. Their logic is unchanged.
6. **New contracts:** `curves/cp-curve.algo.ts` (from the prototype),
   `tests/mock-dex-curve.algo.ts`. The mock curve lies on purpose: wrong
   aggregate, out-of-band fill, writes on Quote, Close flag, and a Settle accept
   or reject mode.
7. **The 23 existing tests:**
   - Behaviour is preserved by creating pools with `curve = CpCurve`, which gives
     identical math (same mulDiv order and rounding).
   - Call shapes change: `createPool(…, curve, 0, '')`,
     `setHookApproval(app, perms, 0)`, and `getHookApproval` returns a struct.
   - The custody k tests now fail with the curve's `errK` (or the DEX's L2 error)
     instead of `errPdki`. Update the expected error codes.
   - The measured-MBR test stays green, because cost is measured. `PoolInfo` grows
     by 64 B (with `closed` packed next to `paused`), so 25,600 µALGO more box MBR
     per pool.
   - `swapRoute matches quoteRoute` becomes "matches the sum of looped `quote`s",
     or keep `quoteRoute` in hybrid.
8. **New tests:**
   - CpCurve parity vs v1 numbers
   - band violation → `errPdcv`
   - aggregate mismatch → `errPdcv`
   - Settle donation and trade on CP
   - L2 blocks a mid-price drain when the curve's Settle is permissive (mock)
   - External: cap, recall, receipt-in-escrow, remove blocked until recall,
     `sync` books consensus surplus
   - curve-managed add/remove ownership (`caller` cannot be spoofed)
   - `closed` blocks swaps and adds but allows removes
9. **Docs:** update `ARCHITECTURE.md` §2 and §3. Add the new perms, the curve
   interface, and the guard layers.

---

## 10. Decide now vs later

**Now (these freeze with the immutable core):**

1. **Lean or hybrid.** Lean: constant product is the `CpCurve` app, there is one
   code path, 7.6 to 7.9 KB, and +0.001 ALGO per hop. Hybrid: native CP with a hard
   in-core k-guard, about 8.2 to 8.6 KB, which needs dropping `sync`/curve-liquidity
   methods to fit. **Recommendation: lean, plus L2.**
2. **The ABI structs** in §2. Add `HookContext.version: uint64` and
   `HookContext.ext: bytes` so future hooks get extra context without a new core.
   Also decide whether `CurveResult` needs an `ext: bytes`.
3. **Perm bits:** `Curve=8`, `External=16`. Reserve 32 and 64 (for example a
   future "ReturnDelta" stack hook that fills part of a swap from its own
   inventory, such as limit orders or JIT).
4. **Price encoding:** Q64.64 `bytes<16>`, B per A. Price band on: yes or no.
5. **LP modes:** fungible plus curve-managed. Who pays curve box MBR (§3.5).
   Whether curve-managed positions get transferability later (curve-side, so it
   can be decided later).
6. **External model:** escrow-held receipts only, principal accounting, the cap
   source (per approval), BeforeAdd/BeforeRemove subscription required, and
   whether `writeDownExternal` exists.
7. **Emergency semantics:** fungible pools use DEX-side pro-rata without the
   curve; curve-managed pools always need the curve.
8. **Version pinning:** an off-chain immutable check plus an on-chain code hash
   now, or retarget to AVM 12 for `rejectVersion`. Changing the build target
   affects every contract that compiles with the default, so scope it to the
   DEX family if chosen.
9. **What to drop for size:** `quoteRoute`, `getPoolHooks`, the uint64
   `getHookApproval`.

**Later (they ship as approved apps without touching the core):**

- `BinCurve` page layout, bin step set, variable-fee parameters, position
  transferability
- `LaunchCurve` parameters, `LaunchVault`, anti-snipe schedule
- volatility-hook formula and constants
- backrun sizing and safety margin
- venue adapters and router plugin
- gated-fee tiers
- TWAP oracle (a hook that records observations from `priceAfterX64`; it must be
  in the stack at pool creation)
- AVM 13 `AppBox` foreign-read quoting

---

## 11. Prototype files

`research/prototype-hooks-as-curves/` holds compile-checked sources, renamed
`.ts.txt` so they are not built:

| File | What |
|---|---|
| `contract.algo.ts.txt` | v2 hybrid core (8,083 B). Lean variant = delete the native-CP branches (7,414 B) |
| `types.ts.txt`, `constants.ts.txt`, `hook-interface.ts.txt` | v2 structs, perms, curve interface |
| `cp-curve.algo.ts.txt` | stateless constant-product curve (855 B) |
| `bin-curve.algo.ts.txt` | swap-only Liquidity Book sketch for sizing (870 B). Not production: protocol fee per bin, add/remove/positions/bitmap and op-ups missing |

These are sketches for sizing. They have not been run on LocalNet or tested.
