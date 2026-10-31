# LVR mitigation hooks for PluginDex

**Covers:** feature (3): the `VolatilityFeeHook` (dynamic fee from realized
volatility) and the `BackrunArbHook` (AfterSwap custody arbitrage against
Tinyman v2). It also evaluates am-AMM (auction-managed AMM) as a hook.

**Status:** research and design only. No existing source file was changed.
Code below is a **sketch** and has not been compiled. Every PuyaTs API it uses
was checked in `node_modules/@algorandfoundation/algorand-typescript@1.3.1`:

- `Global.latestTimestamp`, `Global.round`, `Global.minTxnFee`, `Global.callerApplicationId` (`op.d.ts:1131-1196`)
- `op.AppLocal.getExUint64(account, app, key)` (`op.d.ts:300`)
- `op.mulw`, `op.divw`, `op.divmodw`, `op.bsqrt(biguint)`, `op.btoi` (`op.d.ts:583-617, 2296`)
- `BigUint(uint64)`, `Bytes(biguint)` (`primitives.d.ts:72, 239`)
- `Account.balance`, `.minBalance`, `.authAddress` (`reference.d.ts:15-27`)
- `itxn.submitGroup`; `itxn.payment` / `assetTransfer` / `applicationCall` with `fee`, `rekeyTo`, `accounts`, `assets` (`itxn.d.ts:586-980`)

Read with: `ARCHITECTURE.md`, `research/venues.md` (Tinyman v2 facts, verified
on LocalNet and mainnet), `research/design-vault.md` (the v2 Vault and
pool-type refactor), and `research/akita-hooks.md` (gated and launch hooks).

Marks:

- **[verified]**: checked against source, a fetched contract, or a script run in this session
- **[est.]**: an estimate that must be measured with `simulate` in the e2e tests

---

## 0. TL;DR

| Topic | Decision |
|---|---|
| Which leaks | **L1, informed flow:** the external price moves, then an arber trades our pool to it. **L2, reversion after uninformed flow:** a user trade pushes our price off Tinyman, and an arber backruns it. `VolatilityFeeHook` taxes L1. `BackrunArbHook` captures L2 atomically. |
| Volatility fee | The Trader Joe LB v2.1 variable fee, ported exactly (filter period, decay period, reduction factor, `A·v²`), with the bin distance replaced by a **symmetric ratio move** `max(p,q)/min(p,q) - 1` in bps. No logs: 4 `biguint` ops, about 100 opcodes. Per-pool state is a 56-byte box. **Writes happen only at AfterSwap.** BeforeSwap and Quote share one read-only code path, so **quote == swap holds** under the conditions in §2.6. |
| Backrun arbitrage | AfterSwap custody. The optimum is in closed form: `u = √(x₂y₂(γx₁+x₂)/(y₁+y₂))`, `Δx* = (u−x₂)/γ`. This maximizes the pool's post-trade `k` and matches a brute-force integer optimum **[verified]**. One `bsqrt`, about 200 opcodes. |
| Confirmations | (a) Tinyman v2 pays output to `Txn.Sender` of its appl. If the escrow sends the appl, the escrow receives the output **[verified, contract source]**. (b) The arbitrage needs **no capital and no flash loan**: the escrow already holds both assets. (c) Depth `DEX(0) → hook(1) → Tinyman(2) → payout`, or 1 more via the router plugin. All within 8. |
| Inner txns | Each swap on a `[Backrun, VolFee]` pool uses **6 inners when no arbitrage runs and 9 to 10 when one does**, against 1 for a plain pool. That fits the 16 that a single app call gets. Multi-hop routes need `opUp()` padding. |
| Who pays fees | The arbitrage path **pays its own inner fees** through a fee-carrier payment from the hook's "gas tank". Otherwise a swap simulated without the arbitrage, then executed with it, would fail on fee credit. The skip path is deterministic and the swapper pays it. |
| LP impact | Example (§3.1, **[verified]** by script): a 400k-USDC-equivalent pool 5% off Tinyman. An external arber takes **78.18** and LPs get **10.85** in fees. With the hook, LPs get **89.41**. |
| am-AMM | **Do not build now.** It is feasible as a hook (DynamicFee + HookFee + Custody), but it conflicts with both hooks above, needs a market of professional managers that Algorand does not yet have, and adds 500+ LOC of auction state. Revisit after measuring v1 (§4). |
| v2 asks | Lazy custody (saves 2 inners per swap that does not arbitrage), `Poke` with a keeper tip (already in design-vault), optional quote-time projected deltas for a BeforeSwap "sync" mode, and the `CurveSnapshot` price fields (already in design-vault). See §5. |

---

## 1. LVR in PluginDex terms

LVR (Milionis, Moallemi, Roughgarden, Zhang 2022) is the value a
constant-product pool loses to arbitrageurs, compared with a portfolio that
rebalances at market prices. Without fees it is about `σ²/8` of pool value per
unit time. Illustration only: at σ = 80% a year, that is about 8% of TVL a year.
Fees offset part of it.

A PluginDex pool leaks value in two ways:

| Leak | Sequence | Without hooks, LPs get | Mitigation |
|---|---|---|---|
| **L1, informed flow** | The Tinyman or CEX price moves first. An arber trades our pool to the new price. | our fee on the arber's volume | `VolatilityFeeHook`: the arber's trade moves our price far from the reference, so it pays `base + A·v²`. v2: a BeforeSwap or `Poke` sync (§3.11) |
| **L2, reversion** | A user's (uninformed) trade pushes our price off Tinyman. An arber backruns: buys from us, sells on Tinyman. | our fee on the arber's volume | `BackrunArbHook`: the pool does the backrun itself, atomically in AfterSwap, so the whole spread minus Tinyman's fee stays in reserves |

The two hooks are **complementary**. In AfterSwap, put the backrun **before**
the volatility hook. The volatility hook then records the post-arbitrage price.
Uninformed trades that get reverted do not raise future fees. Informed moves,
where Tinyman moved too, do.

---

## 2. `VolatilityFeeHook` (DynamicFee, no custody)

### 2.1 LB v2.1 reference **[verified]** (`joe-v2/src/libraries/PairParameterHelper.sol`)

```
updateReferences(now):                      // at the start of every swap
  dt = now - timeOfLastUpdate
  if dt >= filterPeriod:
    idReference = activeId
    volatilityReference = dt < decayPeriod ? volatilityAccumulator * reductionFactor / 10_000 : 0
  timeOfLastUpdate = now
updateVolatilityAccumulator(activeId):      // for each bin crossed
  volAcc = min(volRef + |activeId - idRef| * 10_000, maxVolatilityAccumulator)
baseFee     = baseFactor * binStep * 1e10                               // 1e18 precision
variableFee = ceil((volAcc * binStep)^2 * variableFeeControl / 100)     // 1e18 precision
```

In bps of price move, `variableFee = A · D² / 1e8` bps, where `D = |Δid|·binStep`
is the move in bps and `A = variableFeeControl`. So **LB's `A` values carry
over unchanged** if the distance is measured in bps of price move.

Properties to keep:

- Within a burst (consecutive swaps less than `filterPeriod` apart), the
  reference stays fixed. Splitting a large trade into fast small ones pays the
  same escalating fee.
- A trade that moves the price back toward the reference pays less.
- After a quiet period, the volatility reference decays by `R`, or to 0 after
  `decayPeriod`.

### 2.2 Mapping

| LB v2.1 | VolatilityFeeHook (PluginDex v1, reserves-based) | PluginDex v2 (design-vault `CurveSnapshot`) |
|---|---|---|
| `activeId` | the price `b/a` from the pool's reserves (in hook context) | CP: `spotPriceX64`; bins: `activeId` |
| `idReference` | `(refA, refB)`, a reserve snapshot | `refPriceX64` or `refId` |
| `\|Δid\|·binStep` (bps) | `devBps = max(p,q)/min(p,q) - 1` in bps | CP: same on X64 prices; bins: `\|Δid\|·binStep` exactly |
| `volatilityAccumulator` (bins × 1e4) | `vAcc` (bps of move) | same |
| `volatilityReference` | `vRef` | same |
| `timeOfLastUpdate` | `tLast` (`Global.latestTimestamp`) | same |
| per-bin fee while crossing bins | one fee per swap, from the move at the **trade's midpoint** (§2.5) | bins pool type could charge per bin natively (design-vault §12.7) |
| `baseFee` | `ctx.feeBps` (the pool's fee, or the fee from earlier hooks) | same |

### 2.3 Measuring a price move without logs

The price is `p = b/a` and the reference is `q = refB/refA`, so
`p/q = (b·refA)/(a·refB)`. Both products are up to 128 bits.

```
n = b·refA,  d = a·refB                    (biguint)
devBps = (max(n,d) − min(n,d)) · 10_000 / min(n,d),   capped at maxVolBps
```

`max/min − 1 = e^{|ln(p/q)|} − 1`. That is **symmetric** in log space: up ×1.1
and down ÷1.1 both give 1,000 bps. It also never understates `|ln|`:

| actual move | `\|ln\|` | devBps |
|---|---|---|
| +1% | 99.5 | 100 |
| −1% | 100.5 | 101 |
| +10% | 953 | 1,000 |
| −10% | 1,054 | 1,111 |

Cost: 2 `b*` (20 each), 1 `b-` (10), 1 `b*` (20), 1 `b/` (20), plus comparisons
and `btoi`. About **100 opcodes**. The costs are from the AVM opcode reference
**[verified]**.

A uint64-only fast path is possible when both products fit in 64 bits (`mulw`
high word = 0). Not worth it in v1.

### 2.4 State and parameters

Per-pool box, prefix `v`, key `poolId`. 7 × uint64 = 56 bytes. MBR =
2,500 + 400 × (9 + 56) = **28,500 µALGO**.

```ts
export type VolState = {
  refA: uint64   // reference reserves (LB idReference)
  refB: uint64
  lastA: uint64  // reserves after the last AfterSwap; become the reference once a filter period passes
  lastB: uint64
  vRef: uint64   // volatility reference, bps of price move (LB volatilityReference)
  vAcc: uint64   // volatility accumulator after the last swap (LB volatilityAccumulator)
  tLast: uint64  // Global.latestTimestamp of the last AfterSwap (LB timeOfLastUpdate), 0 = not seeded
}
```

`lastA/lastB` is the one deviation from LB. LB sets `idReference = activeId` at
the **start** of a swap, with the pre-swap price. Our AfterSwap does not know the
exact pre-swap reserves: `ctx.amountIn` is gross of the hook and protocol fees,
and earlier custody hooks may have moved reserves. Promoting `last` makes
`refresh` a pure function of **stored state and time only**. BeforeSwap, Quote
and AfterSwap then compute the identical refreshed reference.

`last` equals the pre-swap price unless something moved the price between swaps.
In v1, swaps and custody hooks run at swap points. Liquidity changes only shift
the price by rounding. In v2, `Poke` and `sync` can also move it, so the hook
should subscribe to `Poke` too (§2.11).

Parameters are **global state, immutable at `create`**: one deployment per
preset (§2.7), each approved by the admin. LPs see the parameters through the
hook app id in the immutable stack, and one app serves many pools.

| key | meaning | bound checked at create |
|---|---|---|
| `dex` | the PluginDex app | |
| `filter` | `filterPeriod`, seconds | `< decay` |
| `decay` | `decayPeriod`, seconds | |
| `reduction` | `R`, bps | `≤ 10_000` |
| `control` | `A` (LB `variableFeeControl`) | `A · maxVol² < 2^64` (`mulw` high word = 0) |
| `max_vol` | cap on `v`, bps of move | `≤ 100_000` |
| `max_fee` | total fee cap, bps | `≤ MaxFeeBps (1_000)`. The DEX **reverts** above that, so the hook must never return more |

### 2.5 Algorithm (sketch)

```ts
const FeeScale: uint64 = 100_000_000 // varFeeBps = A * v^2 / 1e8 (LB units)

type Refreshed = { refA: uint64; refB: uint64; vRef: uint64 }

export class VolatilityFeeHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  // GlobalState<uint64> properties filter, decay, reduction, control, maxVol ('max_vol'), maxFee ('max_fee'),
  // set once in create() with the bounds in §2.4
  states = BoxMap<uint64, VolState>({ keyPrefix: 'v' })

  /** Permissionless. The payment covers the box MBR. The first AfterSwap seeds the state. */
  initPool(mbr: gtxn.PaymentTxn, poolId: uint64): void {
    loggedAssert(!this.states(poolId).exists, 'errVfExists')
    const before = Global.currentApplicationAddress.minBalance
    this.states(poolId).value = { refA: 0, refB: 0, lastA: 0, lastB: 0, vRef: 0, vAcc: 0, tLast: 0 }
    loggedAssert(mbr.receiver === Global.currentApplicationAddress, 'errVfMbr')
    loggedAssert(mbr.amount >= Global.currentApplicationAddress.minBalance - before, 'errVfMbr')
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    const inIsA = ctx.assetIn < ctx.assetOut              // pool invariant: assetA < assetB
    const rA: uint64 = inIsA ? ctx.reserveIn : ctx.reserveOut
    const rB: uint64 = inIsA ? ctx.reserveOut : ctx.reserveIn
    if (ctx.point === HookPointAfterSwap) {
      this.record(ctx.poolId, rA, rB)                      // the ONLY write
      return passResult()
    }
    // BeforeSwap and Quote: one read-only path
    return { flags: HookResultSetFee, feeBps: this.fee(ctx.poolId, rA, rB, inIsA, ctx.amountIn, ctx.feeBps), hookFee: 0 }
  }

  private refresh(s: VolState): Refreshed {                // pure: stored state + time
    const now = Global.latestTimestamp
    const dt: uint64 = now > s.tLast ? now - s.tLast : 0   // never underflow
    if (dt < this.filter.value) return { refA: s.refA, refB: s.refB, vRef: s.vRef }
    const vRef: uint64 = dt >= this.decay.value ? 0 : (s.vAcc * this.reduction.value) / BpsDivisor
    return { refA: s.lastA, refB: s.lastB, vRef }
  }

  private fee(poolId: uint64, rA: uint64, rB: uint64, inIsA: boolean, amountIn: uint64, baseFee: uint64): uint64 {
    let ref: Refreshed = { refA: rA, refB: rB, vRef: 0 }   // not seeded: impact-only, still deterministic
    if (this.states(poolId).exists) {
      const s = clone(this.states(poolId).value)
      if (s.tLast !== 0) ref = this.refresh(s)
    }
    // reserves halfway through this trade (fee ignored). The same inputs reach Quote and BeforeSwap.
    const half: uint64 = amountIn / 2
    let mA = rA
    let mB = rB
    if (inIsA) {
      mA = rA + half
      mB = rB - op.divw(...op.mulw(half, rB), rA + half)
    } else {
      mB = rB + half
      mA = rA - op.divw(...op.mulw(half, rA), rB + half)
    }
    let v: uint64 = ref.vRef + this.devBps(mA, mB, ref.refA, ref.refB)
    if (v > this.maxVol.value) v = this.maxVol.value
    const varFee: uint64 = (this.control.value * v * v + FeeScale - 1) / FeeScale   // bounded at create
    const total: uint64 = baseFee + varFee
    return total > this.maxFee.value ? this.maxFee.value : total
  }

  private record(poolId: uint64, rA: uint64, rB: uint64): void {
    if (!this.states(poolId).exists) return               // pool never initialized: base fee + impact only
    const s = clone(this.states(poolId).value)
    const now = Global.latestTimestamp
    if (s.tLast === 0) {
      this.states(poolId).value = { refA: rA, refB: rB, lastA: rA, lastB: rB, vRef: 0, vAcc: 0, tLast: now }
      return
    }
    const ref = this.refresh(s)
    let vAcc: uint64 = ref.vRef + this.devBps(rA, rB, ref.refA, ref.refB)
    if (vAcc > this.maxVol.value) vAcc = this.maxVol.value
    this.states(poolId).value = { refA: ref.refA, refB: ref.refB, lastA: rA, lastB: rB, vRef: ref.vRef, vAcc, tLast: now }
  }

  private devBps(a: uint64, b: uint64, refA: uint64, refB: uint64): uint64 {
    if (refA === 0 || refB === 0) return 0
    const n = BigUint(b) * BigUint(refA)
    const d = BigUint(a) * BigUint(refB)
    let hi = n
    let lo = d
    if (d > n) {
      hi = d
      lo = n
    }
    const dev = ((hi - lo) * BigUint(BpsDivisor)) / lo
    return dev > BigUint(this.maxVol.value) ? this.maxVol.value : op.btoi(Bytes(dev))
  }
}
```

Notes:

- **The midpoint replaces LB's per-bin integration.** LB charges each crossed
  bin at that bin's accumulator. One fee per swap, taken at the move halfway
  through the trade, approximates the average over the path. Using the final
  move would overcharge large swaps. Ignoring the trade's own move would let a
  sandwich's first leg pay only the historical fee.
- **AfterSwap uses the actual post-swap reserves**, after earlier AfterSwap
  custody hooks, which is the backrun. That matches LB, where `vAcc` after a
  swap is the value at the final bin.
- **Uninitialized pools** (no box, or `tLast == 0`) return
  `base + A·dev(mid, pre)²`. That is history-free but still identical at Quote
  and BeforeSwap.

### 2.6 Quote == swap: confirmed, with conditions

The DEX gives the hook the same inputs at Quote (`quoteCore`) and BeforeSwap
(`swapCore`):

- `poolId`, `assetIn`, `assetOut`, `amountIn`
- the pre-swap reserves `reserveIn` and `reserveOut`
- `feeBps` from the earlier hooks in the stack

The two contexts differ only in `point`, `caller`, `recipient` and `data`, and
the hook reads none of those on its fee path. The fee depends only on those
inputs, the stored box, and `Global.latestTimestamp`. It writes nothing at
either point. So, for the same block and the same pool state,
**`quote(pool, in, amt)` returns exactly what `swap` pays**. That covers a
router that quotes and then swaps in one transaction.

Conditions:

1. **Same `latestTimestamp`.** A quote simulated at round N and landing at
   round N+k can cross a filter or decay boundary.
   - Decay alone only lowers the fee.
   - A reference reset can raise it. An example is a trade that reverses the
     last burst. LB behaves the same way.
   - Users rely on `minAmountOut`.
   - `simulate` evaluates with the latest block's timestamp, which is what the
     next block also sees, so the common case matches.
2. **No AfterSwap on the same pool between the quote and the swap.** A
   `swapRoute` that visits the same pool twice breaks this. That route already
   breaks `quoteRoute == swapRoute` for the core math (§6).
3. **No custody hook before it in the BeforeSwap stack.** Quote never grants
   custody, so a custody BeforeSwap hook can move reserves only on the real swap.
   This is a general rule for the DEX, not specific to this hook.
4. **Quote must not write state.** The AVM does not enforce this. `quote` is
   `readonly` in ABI terms only, and any contract can call `PluginDex.quote` on
   chain, which really runs `Quote` hooks. The hook enforces it itself: it
   writes only when `point == AfterSwap`, which only a real swap can trigger
   (`requireDexCaller`).

### 2.7 Presets and behavior

Starting points. Backtest against Tinyman swap history before choosing defaults.

| Preset | base (pool fee) | `A` | `max_vol` | `max_fee` | filter / decay / R |
|---|---|---|---|---|---|
| stable (USDC/USDT) | 1 to 5 | 500,000 | 200 | 100 | 10 s / 120 s / 5,000 |
| volatile (ALGO/USDC, majors) | 30 | 40,000 | 1,000 | 500 | 30 s / 600 s / 5,000 |
| exotic and creator tokens | 100 | 40,000 | 2,000 | 1,000 | 30 s / 900 s / 5,000 |

Variable fee `= A·v²/1e8` bps:

| v (bps of move) | 50 | 100 | 200 | 500 | 1,000 |
|---|---|---|---|---|---|
| A = 40,000 | 1 | 4 | 16 | 100 | 400 |
| A = 500,000 | 13 | 50 | 200 | n/a (capped) | n/a |

Run of the reference model in Python with exactly the integer math in §2.5,
volatile preset, reserves 1e12/1e12 **[verified]**. In a CP pool an input of 1%
of reserves moves the price about 2%.

| step | t (s) | fee bps | v used | vAcc after | vRef |
|---|---|---|---|---|---|
| sell A 1% (start of burst) | 1003 | 34 | 100 | 200 | 0 |
| sell A 1%, same block | 1003 | 67 | 302 | 404 | 0 |
| sell A 1%, +3 s | 1006 | 134 | 509 | 612 | 0 |
| buy A back 3% (toward the reference) | 1006 | 67 | 301 | 5 | 0 |
| sell A 1%, +44 s (new window) | 1050 | 35 | 102 | 202 | 2 |
| sell A 1%, +250 s | 1300 | 47 | 201 | 301 | 101 |
| sell A 1%, +700 s (decayed) | 2000 | 34 | 100 | 200 | 0 |
| sell A 10% (whale) | 2000 | 430 | 1,000 (capped) | 1,000 | 0 |

Granularity: the DEX fee unit is 1 bp. That is coarse for stable pools. Finer
fee units are a v2 question (§5).

### 2.8 Costs [est.]

| Item | Value |
|---|---|
| Points / permissions | `BeforeSwap \| AfterSwap \| Quote` (224) / `DynamicFee` (2). `validateHooks` requires Quote for pricing hooks |
| Inner txns per swap | 2: the hook appl at BeforeSwap and at AfterSwap. Quote costs 1 |
| Hook opcodes | BeforeSwap/Quote ≈ 250 to 300; AfterSwap ≈ 300 to 350 (box write). **Each inner appl adds 700 to the pool, so the hook pays for itself** |
| DEX-side opcodes per hook call | ≈ 150: clone and encode ctx, `abiCall`, decode result, permission checks |
| Resources | hook app, box `(hook, "v"‖itob(poolId))` |
| Fees | 2 × min fee per swap (from the swapper's credit; PuyaTs sets `Fee 0` on inner txns **[verified in `PluginDex.approval.teal`]**) |
| MBR | 28,500 µALGO per pool, paid by whoever calls `initPool` |

### 2.9 Stacking

- **Use instead of `ImpactFeeHook`, not together with it.** The midpoint term
  already prices the trade's own impact.
- **With `GatedFeeHook`** (akita-hooks.md A5): use `[GatedFee, VolFee]`. The
  staker discount applies to the base fee, and the volatility surcharge, which
  is LP protection against informed flow, always applies. A staker who
  arbitrages should not get a discount on it.
- **With `BackrunArbHook`:** use `[Backrun, VolFee]`, so that AfterSwap sees the
  post-arbitrage price (§1).
- **With `AntiSnipeFeeHook`** (launch pools): not needed during the launch
  window. After graduation a launch pool can carry `VolFee` like any other.

### 2.10 Security

- **Fee pumping.** Anyone can raise the fee by trading. That costs fees paid to
  LPs, so it is griefing that LPs profit from. The fee is capped at `max_fee`.
- **Fee suppression.** `v` falls only with time, or with trades back toward the
  reference, which reduce the deviation they correct. Splitting a trade within a
  burst does not help. Splitting across windows keeps `R·vAcc`.
- **State forgery.** Only the DEX can call `akitaDexHook` (`requireDexCaller`).
  `poolId` comes from the DEX, so one pool cannot write another pool's box.
  `initPool` only creates a zeroed box, so pre-creating a box for a future pool
  is harmless.
- **Liveness.** The hook never reverts on valid input:
  - the fee is capped below the DEX limit
  - every subtraction is guarded
  - `lo > 0`, because reserves are non-zero at swap points
  - a missing box degrades to pass-through behavior

### 2.11 Port to the v2 Vault

- CP pools: compute `devBps` on `curveBefore.spotPriceX64` (BeforeSwap/Quote)
  and `curveAfter.spotPriceX64` (AfterSwap) instead of reserves. The math is the
  same.
- Bins: `dev = |activeId − refId| · binStep`. That is pure uint64 and exactly LB.
- Subscribe to `Poke` as well, so a keeper-triggered backrun updates `last`.
- Optional extension: an **external divergence term** from Tinyman's on-chain
  TWAP (`asset_{1,2}_cumulative_price`, venues.md §1.4), which raises the fee
  when our spot price diverges from Tinyman's TWAP. That catches informed flow
  before it trades. Deferred until v1 data exists.

### 2.12 Tests (`plugin-dex/hooks/volatility-fee.e2e.spec.ts`)

1. `quote` equals `swap` in the same group, for both directions, seeded and unseeded.
2. Calling `quote` on chain (from a test caller app) leaves the box unchanged.
3. Burst escalation matches the §2.7 table (use `latestTimestamp` warps on LocalNet, or step rounds).
4. Reference reset after `filter`, decay to `R·vAcc`, and to 0 after `decay`.
5. A buy-back toward the reference pays less than continuing away from it.
6. The cap at `max_fee` holds and the DEX never sees a fee above 1,000.
7. Stack `[Backrun, VolFee]`: a reverted uninformed trade leaves `vAcc` near 0.
8. Create rejects bad parameters (`filter ≥ decay`, overflow bound, `max_fee > 1000`).

---

## 3. `BackrunArbHook` (Custody, AfterSwap)

### 3.1 What it does and why AfterSwap

After every swap on the pool, the hook holds the pool escrow. The DEX
flash-rekeys it to the hook. The hook then:

1. reads the Tinyman v2 pool for the same pair
2. computes the size that maximizes our pool's `k`
3. sells that amount from the escrow to Tinyman
4. hands the escrow back

The DEX books the deltas and enforces `k' ≥ k`. All profit stays in reserves.

**AfterSwap keeps quote == swap.** The swap's output is fixed before AfterSwap
runs, so the reserve change affects only later swaps, and later quotes see it.
A BeforeSwap "sync" mode would also catch L1. But Quote cannot run custody, so
quotes would diverge from swaps. That needs a v2 core change (§5, ask 3).

Counterfactual **[verified]** (script, Tinyman fee 30 bps):

- our pool: x₁ = 1e12 A, y₁ = 2e11 B (price 0.20)
- Tinyman: x₂ = 5e12, y₂ = 1.05e12 (price 0.21, 5% higher)

| Who arbitrages | Arber profit (B) | LP gain (B, surplus above k₀) | rel. k gain |
|---|---|---|---|
| external arber, our fee 30 bps | 78.18 | 10.85 | 5.3e-5 |
| external arber, our fee 100 bps | 54.74 | 30.36 | 1.5e-4 |
| **BackrunArbHook** | 0 | **89.41** | 4.39e-4 |

What it does **not** capture: L1, when the external price moves first and an
arber trades our pool before any other swap. The arber's own swap triggers the
backrun, which finds nothing left. `VolatilityFeeHook` taxes that trade. The
optional keeper tip (§3.6) and v2 `Poke` let anyone sync the pool first.

### 3.2 Optimal size: closed form

Notation: our pool `(x₁, y₁)` and Tinyman `(x₂, y₂)` of the same pair, oriented
so that we **sell X to Tinyman**. Tinyman's fee is on input, `γ = 1 − f/10⁴`.
Its output for input `a` is `g(a) = γa·y₂/(x₂ + γa)`.

The objective is to maximize `F(a) = (x₁ − a)(y₁ + g(a))`, our pool's `k` after
the trade. Setting `F'(a) = 0`, with `u = x₂ + γa`:

```
(γx₁ + x₂ − u)·y₂x₂ / u² = y₁ + y₂ − y₂x₂/u
⇒ (γx₁ + x₂)·x₂y₂ = (y₁ + y₂)·u²
⇒ u  = √( x₂y₂·(γx₁ + x₂) / (y₁ + y₂) )
   a* = (u − x₂) / γ
```

- **Arbitrage exists iff `u > x₂` ⇔ `γ·y₂/x₂ > y₁/x₁`**: Tinyman's post-fee
  price of X beats ours.
- **Mirror case (sell Y):** swap the roles of X and Y.
- **No-arbitrage band:** `γ ≤ (x₂y₁)/(x₁y₂) ≤ 1/γ`.
- At the optimum, `g'(a*) = (y₁ + g)/(x₁ − a*)`. Tinyman's marginal output
  equals our post-trade price. Since the escrow pays no fee to its own pool,
  that is marginal-price equalization.

Checks **[verified]**:

- The closed form matched a brute-force integer search over Tinyman's exact
  integer formula. The k gain agreed to 7 significant figures in both test
  cases (5% gap with deep Tinyman; 50% gap with thin Tinyman).
- Post-trade prices were 0.20781 (ours) and 0.20844 (Tinyman). The ratio is
  0.997 = γ, as expected.

**Relation to venues.md §4.6.** That formula maximizes the B-surplus measured
on the *original* curve (`y₁ + g − k₀/(x₁−a)`). That is the right objective
when the surplus is *extracted*, for example as a tip. Ours maximizes the final
`k`, which is right when the surplus **stays in reserves**. On both test cases
they differ by about 1e-4 of the profit (89,410,016 vs 89,418,219 µB of
surplus; k gain 4.38663e-4 vs 4.38623e-4). Use max-k: it needs one `bsqrt`
instead of two.

### 3.3 Integer implementation

With `G = 10_000 − f` (Tinyman `total_fee_share`, read live, because
`fee_setter` can change it):

```
u² = x₂·y₂·(G·x₁ + 10⁴·x₂) / (10⁴·(y₁ + y₂))      // biguint
u  = bsqrt(u²)
a  = (u − x₂)·10⁴ / G                               // floor; a < x₁ always
```

Overflow bound **[verified]**: the numerator was 138 bits on the deep example.
In the worst case it is `2^64·2^64·2^78 = 2^206`, inside `bsqrt`'s 512-bit
input.

Then mirror Tinyman's own `fixed-input` math **[verified, contract source and venues.md §1.6]**:

```
fee  = a·f/10⁴              → must be ≥ 1 (Tinyman asserts total_fee > 0)
s    = a − fee
out  = y₂ − (floor(x₂·y₂/(x₂ + s)) + 1)   → must be ≥ 1   (mulw/divw, quotient ≤ y₂)
need = ceil(x₁·y₁/(x₁ − a)) − y₁            // k break-even (mulw + divmodw)
surplus = out − need
```

Skip unless `surplus ≥ minSurplus[side] + tip`, where `tip` is the optional
keeper tip (§3.6).

**`minOut` passed to Tinyman = `need + tip + minSurplus`, not `out`.** This
choice follows venues.md §4.6:

- Tinyman's state is read in the same execution, so `out` is exact.
- An off-by-one in our mirror then reverts nothing.
- Any shortfall below the k break-even reverts **inside Tinyman with a clear
  error**, before the DEX's k-guard would.

Cost [est.]:

- direction test: 4 `b*` + 2 compares ≈ 90
- closed form: about 6 biguint ops + `bsqrt` ≈ 200
- output and break-even: ≈ 40

### 3.4 Executing as the escrow (no capital, no flash loan)

The escrow holds both pool assets and is opted into both. Selling `a` of X from
the escrow and receiving Y into it is an ordinary Tinyman swap **by the
escrow**:

```
hook (depth 1), escrow.authAddress == hook
 └─ itxn GROUP
     [0] pay   { snd: hook,   rcv: hook, amt: 0, fee: carrierFee }                       // gas tank (§3.5)
     [1] pay   { snd: escrow, rcv: tmPool, amt: a, fee: 0 }        (X = ALGO)
         axfer { snd: escrow, arcv: tmPool, xaid: X, aamt: a, fee: 0 }   (X = ASA)
     [2] appl  { snd: escrow, apid: TINYMAN, apaa: ["swap","fixed-input",itob(minOut)],
                 apat: [tmPool], apas: [nonzero pool assets], fee: 0,
                 rekeyTo: dex.address }                                                   // handback rides here
          Tinyman (depth 2) → itxn pay|axfer { snd: tmPool, rcv: Txn.Sender = escrow, amt: out, fee: 0 }
```

Confirmed from Tinyman v2 `amm_approval.tl` and venues.md §1.5 **[verified]**:

- `user_address = Txn.Sender`, and output goes `pool → user_address`. **The escrow receives the output.**
- The input txn must be at `GroupIndex − 1`, and its `Sender` must equal `Txn.Sender`. Both are the escrow.
- `Txn.Accounts[1]` must be the pool.
- The swap txns have no `RekeyTo` check, so the handback can ride on the appl. venues.md verified this on LocalNet.
- Tinyman's approval program is v7, so **no group resource sharing**. The inner appl carries its own `accounts` and `assets` arrays. Asset 0 must not be in `apas`.
- `lock` must be 0. Any `flash_swap` that is still open in the group makes Tinyman revert.

Capital: none beyond the pool's own inventory. `a* < x₁` always. The escrow's
min balance does not change.

If a keeper tip or gas rebate is paid (§3.5, §3.6), the appl carries no
`rekeyTo`. A final escrow txn carries the tip or rebate with `rekeyTo: dex`
instead.

The skip path (no arbitrage) still has to hand the escrow back, with
`rekeyBackToDex`: 1 inner txn.

### 3.5 Fees: who pays, and why the arbitrage pays its own

- PuyaTs sets `Fee = 0` on every inner txn **[verified]**. `PluginDex.approval.teal`
  emits `intc_0; itxn_field Fee` on each itxn. Escrow-sent txns therefore never
  spend escrow ALGO. In an ALGO pool that spend would be a booked reserve loss,
  and in an ASA pool it would fail at the min balance. Keep `fee: 0` explicit in
  the hook anyway.
- **The problem with caller-pays for the conditional path.** The SDK sets the
  outer fee from `simulate`. If the arbitrage does not trigger at simulate time
  but does trigger on chain, because Tinyman moved, the group lacks fee credit
  for about 3 more inners and the user's swap fails. That would be a
  non-deterministic revert.
- **Fix: a fee carrier.** The hook's arbitrage group starts with
  `pay hook→hook 0, fee = carrierFee`, paid from the hook's own ALGO (a "gas
  tank"). Fee credit is pooled across all depths, so it also covers Tinyman's
  payout (venues.md §1.5).
  - The caller always budgets the deterministic part: the DEX rekey, the hook
    appl and one handback.
  - The carrier pays for the deposit, the Tinyman payout, itself and any tip.
  - With no tip: `carrierFee = 3 × minTxnFee` (carrier, deposit, payout). The
    appl replaces the skip-path handback, which the caller already paid for.
- **Refill:** in ALGO pools, when the surplus is in ALGO (selling the ASA to
  Tinyman), the hook takes `rebate = min(carrierFee, surplus − minSurplus)` from
  the surplus to itself. The k-check includes it. Otherwise the DAO tops up the
  tank. That is a few thousand µALGO per arbitrage.
- If the tank is below `minBalance + carrierFee`, **skip**. Never revert.

### 3.6 Optional keeper tip

When the arbitrage executes, the hook can pay `tip = surplus·keeperBps/10⁴` from
the surplus side to `ctx.caller`.

- This turns a 1-unit swap into a permissionless **sync**. Keepers race to bring
  the pool back to Tinyman's price and keep `keeperBps`, and LPs get the rest.
- It works in v1 today. v2 `Poke` makes it clean, with no dust swap.
- **Delivery checks, else drop the tip (never revert):**
  - ASA: `AssetHolding.assetBalance(caller, asset)` must report opted in.
  - ALGO: `caller.balance > 0`. A payment below 0.1 ALGO to an empty account
    fails.

Manipulation: an attacker can push Tinyman, trigger the backrun, unwind on
Tinyman, then trade our pool back. Our pool only trades on terms that increase
`k`, and a CP pool that returns to its starting price with a higher `k` leaves
LPs strictly better off. The attacker loses at least
`(1 − keeperBps)·surplus + Tinyman fees`. **Keep `keeperBps` well below
10,000.** A default of 1,000 (10%) is suggested.

### 3.7 Skip rules (the hook must never revert a user's swap)

There is no try/catch in the AVM. Any revert in the hook reverts the user's
swap. Every condition below is a skip: hand the escrow back and pass.

1. No custody (`ctx.escrow.authAddress != this app`), the hook is paused, or no venue is registered for `poolId`.
2. Tinyman `lock != 0`.
3. Either Tinyman reserve is 0.
4. The pool is inside the no-arbitrage band, or `u ≤ x₂`.
5. `fee == 0` (dust size) or `out == 0`.
6. `surplus < minSurplus + tip + rebate`.
7. The tank cannot pay `carrierFee`.
8. Optional: `a` is clamped to `maxTradeBps·x₁`. Concavity means a clamped
   trade is still k-improving.

Remaining revert sources, and their controls:

| Source | Control |
|---|---|
| Missing resource refs | SDK and `populateAppCallResources`; explicit refs for routes (ARCHITECTURE.md §5) |
| Not enough inner txn slots in the group | `opUp()` padding |
| A Tinyman semantic change | impossible: the app is immutable **[venues.md]** |
| Any surprise | the admin kill switch: global `paused` and per-pool `enabled` make the hook pass-through without touching the DEX |

### 3.8 State, registration, admin

```ts
export type BackrunVenue = {
  pool: Account         // Tinyman v2 pool lsig for this pair (derived on chain at registration)
  minSurplusA: uint64   // LP-profit floor, units of assetA
  minSurplusB: uint64
  keeperBps: uint64     // 0 = no tip
  maxTradeBps: uint64   // clamp on a as a share of the sold reserve (10_000 = off)
  enabled: uint64
}
// box prefix "b", key poolId: 9 + 72 bytes → MBR 2,500 + 400·81 = 34,900 µALGO
```

- Global state: `dex`, `tinyman` (the validator app id; mainnet `1002541853`
  **[verified]**), `admin` (the DAO), `paused`.
- `registerPool(poolId, minSurplusA, minSurplusB, keeperBps, maxTradeBps)`,
  admin only. This is a top-level call, so the DEX is **not** on the stack and
  the hook may read it:
  1. `abiCall PluginDex.getPool(poolId)` to get the assets
  2. derive the Tinyman pool address on chain (`sha512_256("Program" ‖ template(app, a1, a2))`, venues.md §1.3, **[verified]** on LocalNet)
  3. assert `getExUint64(pool, tinyman, 'asset_1_id')` exists and equals `max(assetA, assetB)`. Tinyman sets local state only through `bootstrap`, which re-derives the lsig address
  4. store
- Asset mapping: Tinyman `asset_1` is the **larger** id, PluginDex `assetA` the
  smaller. So `x₂/y₂` for (A, B) = (`asset_2_reserves`, `asset_1_reserves`).
- Admin-only registration fits the permissioned model: enabling the backrun
  changes the pool's per-swap cost. The guard protects LP funds no matter who
  registers. Liveness is the reason registration stays admin-only.

### 3.9 Budget: inner txns, depth, opcodes, resources

Single `swap` on a pool with stack `[BackrunArb (AfterSwap, Custody), VolFee (Before|After|Quote, DynamicFee)]`, DEX v1:

| Inner txn | Skip path | Arbitrage path |
|---|---|---|
| VolFee BeforeSwap appl | 1 | 1 |
| DEX flash rekey → hook | 1 | 1 |
| Backrun hook appl | 1 | 1 |
| handback (0-pay) / carrier + deposit + Tinyman appl (handback) | 1 | 3 |
| Tinyman payout | 0 | 1 |
| keeper tip (+ moves the handback) | 0 | +1 |
| VolFee AfterSwap appl | 1 | 1 |
| DEX payout to user | 1 | 1 |
| **Total** | **6** | **9 (10 with tip)** |

- **Limit:** 16 inners per top-level app call, pooled up to 256. A single swap
  fits. A `swapRoute` with two backrun pools needs about 20, so the SDK adds a
  `PluginDex.opUp()` call to the group (+16 inners, +700 budget).
- **Depth:** user → DEX (top) → hook (1) → Tinyman (2) → payout. Through the
  router plugin it is router (top) → DEX (1) → hook (2) → Tinyman (3). Max 8.
  Use the **inlined venue library** (`venues/tinyman-v2.ts`, venues.md §4.2),
  not an adapter app. That saves 2 inners and a level.
- **Reentrancy:** Tinyman is not on the call stack. The hook must never call the
  DEX or the router; both are on the stack or need wallet context. That rules
  out arbitrage against a **sibling PluginDex pool** from a hook (§5, ask 6).
- **Opcodes** [est.]:
  - hook: ctx decode ≈ 40, box ≈ 20, Tinyman reads 5 × ≈ 4, math ≈ 330, itxn
    build ≈ 80. Total ≈ 500 to 650, inside the 700 its own appl adds.
  - Tinyman's swap fits its own 700.
  - DEX custody wrapper ≈ 150: 4 holding reads, the k check, the event.
- **Swapper's fee:** 1 outer + 6 inners, against 1 + 1 for a plain pool. That
  is about 0.005 ALGO more per swap. The arbitrage path costs the swapper
  nothing extra (§3.5).
- **Resources:**
  - Tinyman app
  - Tinyman pool account
  - the `(tmPool, tinyman)` local pair, in **one** top-level txn (venues.md §4.5)
  - both nonzero assets
  - the escrow
  - boxes: DEX pool and hooks boxes, `b‖poolId`, `v‖poolId`
  
  That is more than 8, so the SDK spreads them over the `opUp()` txn or uses
  access lists. Tinyman's own inner appl uses legacy arrays (v7).

### 3.10 Security analysis

| Threat | Analysis |
|---|---|
| Hook drains reserves | Impossible beyond the guard. The DEX books every escrow delta, and `k' ≥ k` must hold. Any in-flight funds the hook touches (user output, protocol fees) show up as a booked loss. The hook only sells `a ≤ reserve`. |
| Bad Tinyman pool or fake venue | The address is derived on chain from `(tinyman, a1, a2)`. Its local state exists only after bootstrap, and the pool's auth address is the Tinyman app. A fake venue cannot be registered. |
| Price manipulation through Tinyman in the same group | Tinyman is a counterparty, not an oracle. Every executed arbitrage is k-improving at real Tinyman prices. Attackers lose at least `(1 − tip)·surplus` (§3.6). |
| Hook makes swaps revert (liveness) | Skip rules (§3.7), a self-funded arbitrage path (§3.5), and the kill switch. `emergencyRemoveLiquidity` stays available when the admin pauses the pool. |
| Escrow ALGO spent on fees | `fee: 0` on every escrow-sent txn. The carrier pays from the hook. |
| Tank drain griefing | Each arbitrage needs a real price gap with `surplus ≥ minSurplus`. Creating gaps costs the attacker more than the tank spends. ALGO pools refill from surplus. |
| Stale Tinyman (CEX moved) | Our pool trades toward Tinyman's price only while that increases `k`. In the worst case it pre-sells inventory at about the price an external arber would have paid. It is never worse than the curve. |
| Sandwich of the user | AfterSwap runs after the user's price is fixed, so the user cannot be harmed. A BeforeSwap mode could do that. That is why it is excluded in v1. |

### 3.11 Limitations and future work

- **CP pools only.** v2 bins need `ptAmountToPrice` (design-vault §4) to size
  the trade, and the guard becomes `ptSettle`.
- **One venue.** Pact can follow through the same inlined library, with a
  handback pay because Pact checks `RekeyTo` (venues.md §4.4).
- **BeforeSwap sync**, which captures L1 before the trade, needs quote-time
  projected deltas (§5, ask 3).
- **Optional `AfterAddLiquidity`** subscription: arbitraging a mispriced first
  deposit protects naive pool creators. Cheap to add, since the hook already
  handles generic contexts.

### 3.12 Tests (`plugin-dex/hooks/backrun-arb.e2e.spec.ts`, using the Tinyman fixture from venues.md §2)

1. No gap: skip path. The escrow is handed back, there are 6 inners, and reserves are unchanged.
2. A gap in each direction (ALGO/ASA and ASA/ASA pools). LP gain equals the §3.3 math to the µunit. `k` rises, Tinyman reserves move by the same amounts, and the user's output equals `quote`.
3. `lock = 1`: a `flash_swap` that is still open in the same group leads to a skip, not a revert.
4. Dust gap (`fee == 0`) or a gap below `minSurplus` leads to a skip.
5. Empty tank leads to a skip. A funded tank pays `carrierFee`. The swapper's outer fee from `simulate` on the skip path is enough on the arbitrage path.
6. Keeper tip paid to an opted-in caller. Skipped (not reverted) for a caller that is not opted in.
7. Manipulation script: push Tinyman, trigger, unwind. The attacker's net P&L is below 0, and LP `k` rises.
8. `swapRoute` through two backrun pools with `opUp()` padding. Without the padding it fails cleanly (documents the SDK requirement).
9. Kill switch: `paused` makes the hook pass-through.

---

## 4. am-AMM (auction-managed AMM) as a hook: evaluation

The mechanism (Adams, Moallemi, Reynolds, Robinson 2024) runs a continuous
Harberger-style auction for a **pool manager**:

- The manager pays rent per block to LPs.
- The manager sets the swap fee (bounded) and receives all swap fees.
- The manager trades fee-free, so it captures the LVR arbitrage itself and
  bids up to its expected value.
- Bids must beat the current rent by a margin and take effect after a K-block
  delay.

Mapping onto today's hook interface:

| am-AMM component | PluginDex hook mechanism | Fit |
|---|---|---|
| Manager collects swap fees | `DynamicFee` sets the LP fee to 0. `HookFee` takes `managerFee·amountIn`, paid to the hook and credited to the manager | OK. Capped by `pool.maxHookFeeBps ≤ 10%` |
| Manager trades fee-free | Branch on `ctx.caller == manager`, which is visible at both Quote and BeforeSwap, so quote == swap holds | OK. Under the router plugin the caller is the spending account (design-vault §3.1) |
| Rent paid to LPs | A custody hook donates rent from the manager's deposit into the escrow, which is booked as a k increase. The rent must be in a pool asset | OK. Costs 3 inners per payment, so accrue it and pay at AfterSwap or `Poke` |
| Bids, deposits, K-delay, rent accrual over rounds | Hook boxes per pool. Accrual is lazy (`rounds × rent`), pure at Quote and written at Before/AfterSwap | OK. About 500 to 700 LOC [est.] |
| No manager | Fall back to the pool's base fee going to LPs | OK |

Why not now:

1. **It conflicts with both hooks in this document.** The manager sets fees, so
   `VolatilityFeeHook` is redundant. `BackrunArbHook` takes the arbitrage the
   manager bids for, so the bids fall. An am-AMM pool would be a separate pool
   flavor with no LVR hooks.
2. **Demand.** It only beats LVR hooks if professional arbitrageurs and market
   makers bid steadily. Algorand's arbitrage market is thin. Bunni v2 on
   Uniswap v4 is the only production reference. Without bids, the pool falls
   back to a plain fixed-fee pool.
3. **LP experience and complexity.** LP income becomes rent plus fallback fees,
   which is harder to explain. The auction adds 500+ LOC, an audit, and a
   permanent obligation to maintain the hook, because hooks are pinned in the
   immutable stack.
4. **Algorand specifics.** Blocks are about 2.8 s and there is no PBS or
   priority auction. A manager's edge comes mostly from fee-free trading. The
   backrun hook plus the keeper tip already gives LPs most of the reversion
   value with no auction.

**Recommendation:**

- Ship `VolatilityFeeHook` and `BackrunArbHook`, then measure: the share of
  volume that is arbitrage, LP P&L against HODL, and how often the backrun
  fires.
- Revisit am-AMM for a deep, CEX-referenced pair (ALGO/USDC), and only if:
  - L1 losses stay large after the volatility fee, and
  - a market maker commits to bidding.
- The v1 and v2 hook interfaces already support it: `ctx.caller`, DynamicFee,
  HookFee and Custody. No core change needs to be reserved.

---

## 5. Asks for the v2 Vault (input to design-vault.md)

| # | Ask | Why | Status in design-vault |
|---|---|---|---|
| 1 | **Lazy custody.** A permission or flag under which the Vault first calls a custody hook *without* rekeying. If the result has `RequestCustody`, the Vault rekeys and calls it again at the same point with `ctx.custody = 1`. | A backrun that skips (most swaps) costs 1 inner instead of 3. That saves 0.002 ALGO per swap and 2 encodes. The arbitrage path costs 1 more call. | new |
| 2 | `Poke` point + `poke(poolId, hookIndex)`, with a keeper tip from `PtSettleResult.surplus*` | A permissionless sync without a dust swap | present (§3.2, §5.9) |
| 3 | **Quote-time projected deltas.** `HookResult.quoteDeltaA/B` (signed) is honored at Quote. At BeforeSwap the Vault asserts that the custody deltas equal the projected ones. | Enables a BeforeSwap pre-sync that captures L1 while keeping quote == swap | new, optional, after v1 data |
| 4 | `curveBefore` / `curveAfter` `spotPriceX64` and `activeId` in ctx | The volatility hook is then curve-agnostic (§2.11) | present (§3.1) |
| 5 | `quoteRoute` threads reserve updates when a pool repeats, or both route methods reject repeated pools | §6 observation | new |
| 6 | Optional Vault-native `arbSiblings(poolA, poolB)` between same-pair pools | A hook cannot call back into the Vault, so the backrun cannot use sibling pools | new, low priority |
| 7 | Sub-bp fee units (e.g. 1e-6) for dynamic fees | Stable presets are coarse at 1 bp | new, low priority |

---

## 6. Observations on the current DEX (no change made)

1. **`quoteRoute` diverges from `swapRoute` when a route repeats a pool.**
   `quoteCore` reloads the pool box on every hop, so a second visit quotes stale
   reserves. `swapCore` writes the box between hops. An example is the cyclic
   route `[p1, p2, p1]` across two A/B pools. Severity: low, because `minOut`
   protects users, but on-chain routers comparing quotes are misled. Fix in v2
   (§5, ask 5).
2. **Custody overhead on every swap.** Every custody point costs 3 inners even
   when the hook does nothing. It is the main cost of `BackrunArbHook` in v1
   (§5, ask 1).
3. **A custody hook at BeforeSwap breaks quote == swap by design.** Document it
   for hook authors in `hook-interface.ts` in v2.
4. **Inner fees.** PuyaTs emits `Fee 0` on all DEX inners, so pool escrows never
   pay fees **[verified]**. Good. Callers must always overpay the outer fee,
   which `coverAppCallInnerTransactionFees` handles.

---

## 7. Open questions for Kyle

1. Keeper tip on or off by default (suggested: on, 10%)? It makes "anyone can
   sync the pool" a v1 feature.
2. Gas tank funding for ASA/ASA pools: a DAO top-up, or caller-pays plus an SDK
   fee buffer (the swap reverts if the buffer is wrong)?
3. Should the volatility hook have one deployment per preset (as proposed), or
   one app with per-pool parameters set by the pool creator before
   `lpSupply > 0` (as akita-hooks.md does for GatedFee)?
4. Should `BackrunArbHook` also subscribe to `AfterAddLiquidity`?
5. am-AMM: agree to defer?

---

## 8. Sources

- Tinyman v2 AMM approval (Tealish): <https://raw.githubusercontent.com/tinymanorg/tinyman-amm-contracts-v2/main/contracts/amm_approval.tl>. Read in this session for the swap branch, `calculate_fixed_input_swap`, `transfer` with `Fee: 0`, `lock`, and asset ordering.
- Tinyman contracts and app ids: <https://docs.tinyman.org/contracts>. Mainnet validator `1002541853`.
- Trader Joe LB v2.1 `PairParameterHelper.sol`: <https://raw.githubusercontent.com/traderjoe-xyz/joe-v2/main/src/libraries/PairParameterHelper.sol>.
- AVM opcode costs: <https://dev.algorand.co/reference/algorand-teal/opcodes/> (`b*`/`b/`/`b%` 20, `b+`/`b-` 10, `bsqrt` 40, `divmodw` 20, `mulw`/`divw` 1).
- Milionis, Moallemi, Roughgarden, Zhang, *Automated Market Making and Loss-Versus-Rebalancing* (arXiv:2208.06046).
- Adams, Moallemi, Reynolds, Robinson, *am-AMM: An Auction-Managed Automated Market Maker* (arXiv:2403.03367).
- In-repo: `research/venues.md` (Tinyman facts verified on LocalNet and mainnet), `research/design-vault.md`, `research/akita-hooks.md`, `artifacts/plugin-dex/PluginDex.approval.teal` (inner `Fee 0`).
- Verification scripts (scratchpad, not in the repo): the closed form against integer brute force, the external-arber counterfactual, and the volatility-fee reference model.
