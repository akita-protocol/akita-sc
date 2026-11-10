# Bin pool type (Liquidity Book / DLMM style) for PluginDex

Status: research and design only. No contract code has changed. This spec covers
suggestion (2) and the bin-specific parts of (1), (3) and (4).

Sources:
- Trader Joe Liquidity Book v2.1 (`joe-v2`: `BinHelper`, `FeeHelper`,
  `PairParameterHelper`, `LBPair`) and the LFJ fee docs.
- Meteora DLMM (bin arrays, positions).
- PuyaTs 1.3.1 typings in `node_modules/@algorandfoundation/algorand-typescript`
  (see Appendix A).
- dev.algorand.co resource and box docs (see Appendix B).
- A throwaway PuyaTs prototype of the swap loop, compiled with puya-ts 1.3.1 to
  measure opcode cost (Appendix C). It lives in the session scratchpad, not in
  the repo.

---

## 0. Decisions at a glance

| Topic | Decision |
|---|---|
| Price | `p(id) = (1 + binStep/10^4)^(id − 2^23)` as **Q128.128** `biguint`. The canonical value is an **anchor per 32-bin chunk** (computed once, stored in the chunk box) times a **per-binStep step table** `r^j`. Swaps pay **one `b*`** per bin and never call `pow`. |
| Valid price range | `p ∈ [2^-64, 2^64]` in base units. Amounts are uint64, so prices outside this range are meaningless. Chunk creation outside it reverts. |
| Within-bin curve | Constant sum `L = p·x + y`. Bins above the active bin hold only X, bins below hold only Y, and the active bin holds both. |
| Crossing | Three-level bitmap. The pool state holds a 32-bit summary and 32 words (2,048 chunk bits). Each chunk header holds a 32-bit bin occupancy word. Next non-empty bin is O(1) via `bitlen`. Pool window is **65,536 bins** around the initial price. |
| Bin storage | **Chunk box = 32 bins**: 72-byte header plus 32 × 32-byte records (`x u64, y u64, supply u128`) = 1,096 B. One box ref covers it (2 KB I/O budget per ref). |
| Shares | 128-bit per-bin supply. First deposit: `shares = L >> 96`, i.e. bin value in Y units with 32 fractional bits. Later deposits are pro-rata, LB-style, with the excess refunded. |
| Fees | LB v2.1: base fee plus a **native per-bin variable (volatility) fee**, in `1e9` units. Fees compound into the bin, apart from the protocol share. A composition fee applies on active-bin deposits. Hooks can override the base fee and take hook fees. |
| Positions | **Position box** per `(positionId)`: owner, pool, `lowerId`, `width ≤ 64`, then `u128` shares per bin. One box ref, about 0.44 ALGO MBR at 64 bins, refundable. No per-bin ASAs and no per-(bin, owner) boxes. |
| MBR | Measured-cost pattern, as in `createPool`. Pool state is paid by the pool creator. A chunk is paid by the LP that first touches it (refundable via `closeChunk`). A position is paid by its owner (refundable on close). Step tables are paid by the admin. |
| Budget | About **340 opcodes per bin crossed** (measured on compiled TEAL, including the variable fee) plus about 100 per chunk switch. A swap op-ups with `ensureBudget(..., GroupCredit)` per bin. Default `MaxBinsPerSwap = 64`. |
| Multi-call | Not needed for correctness. Constant-sum bins make a split swap path-independent, so N consecutive swaps in one group give the same result as one swap, up to rounding. An optional group-bound cursor is sketched. |
| Custody guard | **Swap equivalence.** A custody hook's net delta must be at least as good for LPs as an equivalent swap through the bins (with fees). The DEX books it as that swap and donates any surplus to the resulting active bin. In the single-bin case this is "active-bin `L` at the active price must not decrease". Reported-value external positions are **not supported** for bin pools in v1. |
| Quote | Same loop as the swap with writes disabled (`write = false`), after `Quote` hooks run. It is deterministic within a round. |
| Code location | A separate **BinEngine** app that owns all bin state and is called by the pool-type-aware core (track 1). PluginDex v1 is immutable and too large (about 5.7 KB) to host bins. |

---

## 1. How it plugs into PluginDex

Today `PluginDex` hard-codes x·y=k in `swapMath`, `addLiquidity`,
`removeCore` and `assertKNotDecreased`. Track (1) turns the curve into a
"pool type". For bins, the clean split is:

```
core (PluginDex v2)                         BinEngine (this spec)
─────────────────────────────────           ─────────────────────────────────────
escrow per pool (custody of tokens)         bin state boxes (pool, chunks, positions, tables)
hook stacks, approvals, permissions         price/fee/swap/liquidity math
deposit validation, payouts, protocol fees  custody delta booking (swap-equivalence)
routing (swapRoute), pairPools index        quote (same loop, no writes)
```

- The core calls the engine with an inner `abiCall`. The engine checks
  `Global.callerApplicationId === core` on every mutating method.
- The engine never moves tokens. It returns amounts, and the core moves them
  from or to the pool escrow, as today.
- Reserve totals: the engine returns `totalX` and `totalY` (the sum over all
  bins). The core mirrors them into `PoolInfo.reserveA/B`, so the existing
  accounting identity still holds:
  `escrow holding == reserves + protocolFees + in-flight`. The test
  "escrow balances always equal reserves plus protocol fees" carries over
  unchanged.
- Call depth: router(0) → core(1) → engine(2), with hooks at (2). This is
  well within 8.
- Budget: every inner app call adds 700 to the group pool, so the engine call
  pays for itself.
- Box refs: the engine's boxes are referenced against the engine app id. That
  costs one app slot plus one slot per box. Chunk boxes usually travel on
  `engine.opUp()` transactions in the same group (group resource sharing; §5).

If track (1) instead chooses one DEX app per pool type, this spec still
applies: the core logic moves into the bin DEX and the inner call disappears.

---

## 2. Math

### 2.1 Bin ids and price

- `id ∈ [0, 2^24)`. Price 1 (base unit to base unit) is at `id = 2^23`.
- X is `assetA` (the lower id) and Y is `assetB`, matching `PairKey`. `p` is
  the price of 1 base unit of X in base units of Y.
- `r = 1 + s/10^4`, where `s = binStep` in bps, `1 ≤ s ≤ 200`. The upper
  bound keeps `r^31 < 2`; see §2.2.
- Real price: `p(id) = r^(id − 2^23)`.
- Off-chain inverse: `id = 2^23 + round(ln p / ln r)`.
- Representation: `P = floor(p · 2^128)` as `biguint`, Q128.128. The valid range
  is `2^64 ≤ P ≤ 2^192` (that is, `2^-64 ≤ p ≤ 2^64`), so `P` is at most
  24 bytes. Every product used below stays within the AVM's 64-byte byte-math
  inputs: `P·amount` is at most 32 B, `P·P` at most 48 B, and `L·supply` at
  most 49 B.
- Maximum exponent: `|e| ≤ 64·ln2 / ln r`. That is 443,636 at `s = 1`
  (fewer than 2^19) and 4,458 at `s = 100`. **19 exponent bits are always
  enough.**

### 2.2 Canonical on-chain price (anchor × step table)

Each bin must have exactly one price, everywhere and forever. LP shares and the
custody guard depend on it. Incremental `p·r` stepping depends on the path, so
the canonical price is defined by these deterministic integer procedures, and
all rounding is floor:

```
R      = 2^128 + floor(s · 2^128 / 10^4)                       // r in Q128.128
T[0]   = R;  T[k] = floor(T[k−1]^2 / 2^128)   k = 1..19        // r^(2^k); 0 once > 2^192 (out of range)
G[0]   = 2^128; G[j] = floor(G[j−1] · R / 2^128)  j = 1..31    // r^j
F[j]   = G[j] − 2^128                                           // Q0.128, fits 16 bytes because r^31 < 2

pow(e ≥ 0) = fold over set bits k of e (ascending): acc = floor(acc · T[k] / 2^128), acc0 = 2^128
pow(e < 0) = floor(2^256 / pow(−e))

anchor(c) = pow(32c − 2^23)                     // c = absolute chunk index = id >> 5
P(id)     = A + floor(A · F[j] / 2^128)         // A = anchor(id >> 5), j = id & 31; P(32c) = A
```

- **When the work happens.** `T` and `F` are computed on-chain once per
  `binStep` by `initBinStep(s)`, which costs about 50 multiplications (about
  2.5k opcodes) using op-ups. The anchor is computed once when a chunk is
  created and stored in its header. Cost: at most 19 × (`b*` + shift) ≈
  1,300 opcodes worst case and about 700 typical, measured at about 65 per set
  bit and 15 per clear bit.
- **Cost per bin in a swap:** one `box_extract` of `F[j]`, then `b*` (20),
  `shr128` (about 17), `b+` (10). The prototype's `binPrice` measures 66 opcodes.
- **Monotonicity.** The accumulated relative error is at most about 20 × 2^-64
  at the low end of the range and far smaller elsewhere. That is far below a
  1 bp step, so `P(id+1) > P(id)` holds, including across chunk boundaries.
  This is tested exhaustively off-chain for every `s` in use (§11).
- **Shifts.** PuyaTs `biguint` has `+ - * / % | ^ &` and comparisons, but no
  shifts and no `~`. In compiler 1.3.1, `biguint` bit inversion is a compile
  error. So `>> 128` is `Bytes(x)` with the last 16 bytes dropped via
  `op.substring` (about 17 opcodes; the generic `bytes.slice` compiles to a
  bounds-guarded `select` sequence costing about 31), and `<< 128` is
  `itob(v).concat(bzero(16))`. A division by `2^128` would cost 20.

### 2.3 Liquidity and shares

- Bin value in Q128.128 Y units: `L(x, y) = P·x + y·2^128`. Exact, at most 33 bytes.
- Per-bin supply is a `u128` stored as 16 bytes.
- **Empty bin** (supply 0): `shares = L >> 96`. The unit is the bin's Y value
  with 32 fractional bits, so precision is 2^-32 of one Y base unit. That
  removes the granularity problem a uint64 Y-unit share would have when Y is a
  low-decimal, high-value token. Overflow (a bin worth more than 2^96 Y base
  units) reverts.
  - Why not uint64 shares in Y units? For an ALGO/meme pool (ALGO is always X
    because id 0 is lowest), a bin holding more ALGO than the meme's whole
    market cap overflows 2^64 meme units. Launch pools hit that case.
  - Why not LB v2.1's `sqrt(L)` scaling for first shares? A dust first deposit
    then makes later large deposits overflow 128 bits. Linear `L >> 96` only
    overflows on bin value, whoever deposited first.
- **Non-empty bin**, LB `getSharesAndEffectiveAmountsIn` semantics:
  ```
  binL   = L(xb, yb)
  userL  = L(x, y)
  shares = floor(userL · supply / binL)
  effL   = ceil(shares · binL / supply)                    // what those shares are worth
  excess = userL − effL                                    // refund it, taking Y first, then X
  dy = min(y, floor(excess / 2^128)); y −= dy; excess −= dy·2^128
  dx = min(x, floor(excess / P));    x −= dx
  ```
  The LP pays exactly for the shares they get, so rounding never moves value
  between LPs.
- **Withdraw:** `outX = floor(sh · xb / supply)` and
  `outY = floor(sh · yb / supply)`. When `sh == supply` the result is exact, so
  the last LP leaves no dust.
- Fees compound into bin reserves, as in LB v2.1. Positions therefore need **no
  fee checkpoints**, which keeps position boxes small.

### 2.4 In-bin swap (exact input)

`rem` is the input still to fill. `f` is the total fee for this bin, scaled
`FS = 1e9`.

```
X → Y (swapForY, price moves down):
  maxNet = ceil(yb · 2^128 / P)                 // X needed to take all Y
  maxFee = ceil(maxNet · f / (FS − f))          // fee charged on top
  if rem ≥ maxNet + maxFee:  in = maxNet + maxFee; fee = maxFee; out = yb
  else:                      in = rem; fee = ceil(rem · f / FS)
                             out = min(yb, floor((rem − fee) · P / 2^128))
Y → X (swapForX, price moves up):
  maxNet = ceil(xb · P / 2^128)
  …same pattern…;           out = min(xb, floor((rem − fee) · 2^128 / P))

protoFee   = ceil(fee · protocolFeeBps / 10^4)  // stays out of the bin, as the core's protocolFees today
bin.in    += in − protoFee
bin.out   −= out
```

- Rounding is always in the pool's favour: input and fee round up, output
  rounds down. So `L(P)` of the bin never decreases in a swap. Property tests
  check this (§11).
- **Exact output** (`getSwapIn`, for the router):
  - If `outLeft ≥ reserveOut`, take the whole reserve:
    `net = ceil(reserveOut · 2^128 / P)` for X→Y, or
    `ceil(reserveOut · P / 2^128)` for Y→X.
  - Otherwise `net = ceil(outLeft · 2^128 / P)` (or `· P`).
  - `fee = ceil(net · f / (FS − f))`.

### 2.5 Fees

All fees are in `FS = 1e9` (ppb). Basis points are too coarse: a 1-bp stable
pool with `baseFactor = 5000` has a 0.5 bp fee. A hook's `feeBps` converts as
`× 10^5`.

| Fee | Formula (`1e9` scale) | Notes |
|---|---|---|
| Base | `base = baseFactor · s · 10` | `baseFactor = 10,000` gives fee = binStep (s = 25 gives 0.25%). A `DynamicFee` hook may override it per swap. |
| Variable | `vfee = ceil((va · s)^2 · A / 10^11)` | LB v2.1 `variableFeeControl = A`. It is evaluated **for each bin swapped**. |
| Total | `f = min(base + vfee, MaxFee = 10^8)` | 10% cap, the same as `MaxFeeBps`. |
| Protocol | `ceil(fee · protocolFeeBps / 10^4)` | Reuses the core's global `protocolFeeBps`. |
| Hook fees | taken from the input before the loop | Same as the core today: summed, capped by `maxHookFeeBps`, and paid out of the escrow at `BeforeSwap`. |
| Composition | `cf(a) = floor(a · f · (f + FS) / FS^2)` | Applies only to active-bin deposits with a mismatched ratio (§4.5). |

Volatility state (LB v2.1, in the pool state; `now = Global.latestTimestamp`):

```
swap start (once):  dt = now − tLast
                    if dt ≥ filterPeriod: idRef = activeId; vr = dt < decayPeriod ? floor(va · R / 10^4) : 0
                    tLast = now
each bin swapped:   va = min(maxVa, vr + |idRef − id| · 10^4)         // then f = base + vfee(va)
swap end:           store va
```

**Native, not a hook.** The variable fee rises *per bin crossed within one
swap*. A hook is called once per swap, so it cannot express this. The engine
therefore runs it natively, at about 50 opcodes per bin as measured. Its
parameters (`A`, `filterPeriod`, `decayPeriod`, `R`, `maxVa`) live in the pool
state.

Track (3)'s volatility hook still has two roles:
- the CPMM equivalent;
- an optional `DynamicFee` controller over the bin pool's base fee, e.g.
  stake-gated discounts from track (5).

Setting `A = 0` gives a static-fee bin pool.

---

## 3. Storage layout (BinEngine app)

The MBR formula is `2,500 + 400·(len(key) + len(value))` µALGO.

| Box | Key | Value | Size | MBR (µALGO) | Paid by | Read by swap? |
|---|---|---|---|---|---|---|
| Pool state | `b`‖poolId u64 | `BinPoolState` | 408 B | 169,300 | pool creator | yes (1 ref) |
| Step table | `s`‖binStep u64 | `T[0..19]` 20×32 ‖ `F[0..31]` 32×16 | 1,152 B | 466,900 | admin, once per binStep | yes (1 ref, `F` only) |
| Chunk | `c`‖poolId u64‖chunk u64 | header 72 ‖ 32 × bin record 32 | 1,096 B | 447,700 | first LP to touch it | yes (1 ref per chunk) |
| Position | `q`‖positionId u64 | header 56 ‖ width × u128 | 56 + 16w | 28,500 + 6,400·w (w = 64: 438,100) | owner | no |

Each box is at most 2,048 B, so it fits the **I/O budget of one box ref**. The
budget is charged on the full box size, not on the bytes read. If a network is
still on the older 1 KB-per-ref budget, use 28 bins per chunk
(72 + 28·32 = 968 B). The id-to-chunk mapping uses `/` and `%`, which cost 1
opcode each, so a chunk size that is not a power of two costs nothing.

### 3.1 `BinPoolState` (fixed 408 B, raw offsets)

The header is read once per call with `box.extract(0, 152)`. Bitmap words are
read lazily with `box.extract(152 + 8w, 8)`.

| Off | Field | Type | Notes |
|---|---|---|---|
| 0 | assetX, assetY | u64 ×2 | mirrors core PoolInfo |
| 16 | binStep | u64 | |
| 24 | activeId | u64 | |
| 32 | minId | u64 | window start, chunk-aligned; window = 65,536 bins |
| 40 | baseFactor | u64 | |
| 48 | varFeeControl (A), filterPeriod, decayPeriod, reductionFactor (R), maxVa | u64 ×5 | |
| 88 | va, vr, idRef, tLast | u64 ×4 | volatility state |
| 120 | totalX, totalY | u64 ×2 | Σ bins; mirrored to the core |
| 136 | minBinShares | u64 | anti-dust (§10) |
| 144 | summary | u64 | bit w set ⇔ bitmap word w ≠ 0 (32 words) |
| 152 | bitmap | 32 × u64 | bit b of word w ⇔ window chunk `64w + b` has occupancy ≠ 0 |

### 3.2 Chunk box

```
[0..32)    anchor     Q128.128 P(32c), big-endian, zero-padded
[32..40)   occupancy  u64; bit j set ⇔ bin 32c+j has supply > 0 (low 32 bits used)
[40..72)   rentPayer  Account; MBR refund target for closeChunk
[72 + 32j ..)  bin j:  x u64 | y u64 | supply u128
```

Swaps only `box_extract` 16 bytes and `box_replace` 16 bytes per bin, never
the whole box. Occupancy changes only on add and remove, never on swaps: a
swapped bin always keeps the input token, so it cannot become empty.

### 3.3 Position box

```
[0..32)   owner     Account (an ARC-58 wallet's spending address works as-is)
[32..40)  poolId
[40..48)  lowerId
[48..56)  width     1..64
[56 + 16k ..) shares for bin lowerId + k (u128)
```

- `openPosition` creates the box at its exact size with `create({size})`.
  `extendPosition` can grow it later with `resize`.
- `closePosition` requires all shares to be zero. It deletes the box and
  refunds the MBR to the owner.
- `transferPosition(newOwner)` lets an app, such as a vault, lending market or
  launchpad, own positions.
- **Why not per-bin ASAs?** That would mean an asset create per bin (0.1 ALGO
  of MBR to the DEX), an opt-in per bin per LP, and an asset ref per bin per
  transaction.
- **Why not (pool, bin, owner) boxes?** That is 28,500 µALGO and **one box ref
  per bin**, so a 64-bin add would need 64 refs. A position box covers 64 bins
  in one ref for 438,100 µALGO.
- Fungible LP exposure can be built on top: a vault app owns positions and
  issues an ASA. This is the place for managed or auto-rebalancing strategies.

### 3.4 MBR flow

The core forwards the LP's MBR payment to the engine. The engine measures
`Global.currentApplicationAddress.minBalance` before and after creating boxes,
asserts `paid ≥ used`, and refunds the excess. This is the same measured-cost
pattern `createPool` uses today.

- `closeChunk(poolId, chunk)` can be called by anyone. It requires
  `occupancy == 0` and that the chunk is not the active chunk. It deletes the
  box, clears the bitmap bit, and refunds the rentPayer.
- The core's `createPool` funds the pool state box and the active chunk.

---

## 4. Algorithms (pseudocode)

### 4.1 initBinStep / createPool

```
initBinStep(s):                       // admin; idempotent; op-ups
  require 1 ≤ s ≤ 200 and !steps(s).exists
  compute T[0..19], F[0..31] (§2.2) → steps(s).create(1152); replace

createPool(core args…, binStep, activeId, baseFactor, varParams, minBinShares):   // core → engine
  require steps(binStep).exists, |activeId − 2^23| within range
  minId = alignDown(activeId − 32768, 32)
  write BinPoolState{…, va=vr=0, idRef=activeId, tLast=now}
  createChunk(activeId >> 5, payer)   // the active chunk always exists
```

### 4.2 Next non-empty bin (3-level bitmap)

```
nextBelow(id):                                  // swapForY direction
  c = id >> 5; j = id & 31
  occ = chunkOcc(c) & ((1 << j) − 1)            // occ is in hand while inside chunk c
  if occ ≠ 0: return 32c + bitlen(occ) − 1
  wc = c − (minId >> 5); w = wc >> 6; b = wc & 63
  word = bitmap[w] & ((1 << b) − 1)             // guard b = 0
  if word == 0:
     s = summary & ((1 << w) − 1); if s == 0: return NONE
     w = bitlen(s) − 1; word = bitmap[w]
  c' = (minId >> 5) + 64w + bitlen(word) − 1
  return 32c' + bitlen(chunkOcc(c')) − 1        // loads chunk c' (it must be in refs)

nextAbove(id): mirror image, using the lowest set bit:
  lsb(x) = x ^ (x & (x − 1)); index = bitlen(lsb) − 1
  mask "bits above b" = ~((2 << b) − 1); build it as (x >> (b+1)) << (b+1) with the b = 63 edge case guarded
```

All of these are uint64 ops: `&`, `^`, `-`, `<<` / `>>` (compiled to
`shl`/`shr`), and `op.bitLength`. Each level is O(1). The worst case is two
bitmap word reads plus the target chunk read.

### 4.3 swapExactIn (engine)

```
swapExactIn(poolId, xForY, amountIn, baseFeeOverride?, maxBins, write):
  st   = readHeader(poolId);  updateReferences(st, now)
  base = baseFeeOverride ?? st.baseFactor · s · 10
  id   = st.activeId; c = id >> 5; chunk = load(c)
  rem = amountIn; out = 0; proto = 0; crossed = 0
  loop:
    ensureBudget(BinBudget ≈ 450, GroupCredit)          // op-up only when Global.opcodeBudget is low
    (xb, yb) = chunk.extract(72 + 32·(id&31), 16)
    if (xForY ? yb : xb) > 0:
       st.va = min(st.maxVa, st.vr + |st.idRef − id|·10^4)
       f = min(base + vfee(st.va), MaxFee)
       P = chunk.anchor + shr128(chunk.anchor · F[id&31])
       (in, fee, o) = binSwap(§2.4)
       p = ceil(fee · protocolBps / 10^4)
       if write: chunk.replace(rec, x', y')
       rem −= in; out += o; proto += p
    if rem == 0: break
    nid = xForY ? nextBelow(id) : nextAbove(id)
    if nid == NONE or crossed == maxBins: break
    if nid >> 5 ≠ c: c = nid >> 5; chunk = load(c)    // +~100 opcodes; box must be referenced
    id = nid; crossed++
  if write: st.activeId = id; st.totals ±= …; writeHeader(st)
  return (amountInUsed = amountIn − rem, out, proto, endId = id, crossed)
```

- **Full fill by default.** The core reverts if `amountInUsed < amountIn`,
  matching LB's `OutOfLiquidity`. With `allowPartial` it refunds `rem` instead
  (§6).
- The end state matches LB: `activeId` is the last bin that traded.
- **Events: one per swap, not one per bin.** It carries
  `startId, endId, crossed, in, out, fee, proto, va`. AVM logs are capped at
  32 per transaction and 1 KB in total. Indexers rebuild per-bin state from
  boxes.

### 4.4 Quote

Quotes use the same function with `write = false`, so the code is shared and
quote and swap cannot drift apart. The core first runs the `Quote` hooks (fee
override and hook fees, never custody) exactly as `quoteCore` does today, then
calls `engine.quoteExactIn` / `quoteExactOut`.

The variable fee depends on `Global.latestTimestamp`, so a quote is exact for
the round it runs in. A router that quotes and swaps in one group therefore
gets identical numbers.

Off-chain, the SDK runs a bigint reference model (§11) over boxes it reads
directly, so quoting costs nothing. `simulate` is a cross-check.

### 4.5 addLiquidity across a range

Args (core → engine):
- `positionId` (0 opens a new position over the deposit range);
- `amountX`, `amountY` (already in escrow);
- `activeIdDesired`, `idSlippage`;
- `dist: bytes`: packed per bin `(deltaId i32-biased, distX u32, distY u32)`
  in `1e9` units, with `ΣdistX ≤ 1e9` and `ΣdistY ≤ 1e9`. That is 12 B per
  bin, or 768 B for 64 bins (app args are capped at 2 KB);
- `mbrBudget`.

```
a = st.activeId; require |a − activeIdDesired| ≤ idSlippage
for each (d, dx, dy):                        // ids ascending → chunk loads are monotone
  id = a + d; require id in window, inside the position range
  x = floor(amountX·dx/1e9); y = floor(amountY·dy/1e9)
  require (id < a ⇒ x == 0) and (id > a ⇒ y == 0)   // composition rule (LB verifyAmounts)
  chunk = loadOrCreate(id >> 5)                    // create: anchor via pow, MBR measured, link bitmap
  P = price(id); rec = chunk.bin(id)
  if rec.supply == 0: shares = L(x,y) >> 96; require shares ≥ st.minBinShares; set occupancy bit (and bitmap/summary)
  else: (shares, x, y) = sharesAndEffective(§2.3)
  if id == a and rec.supply > 0:                   // composition fee
     updateReferences; va at a; f = total fee
     (rx, ry) = (shares/(supply+shares)) · (xb + x, yb + y)
     if rx > x: feeY = cf(y − ry)  elif ry > y: feeX = cf(x − rx)
     if fee:  pf = protocol share of fee
              binL' = L(xb + fee − pf, …)          // existing LPs are credited first
              shares = floor(L(x − feeX, y − feeY) · supply / binL')
  require shares > 0
  rec += (x − pfX, y − pfY, shares); position.shares[id − lower] += shares
  usedX += x; usedY += y
st.totals += used; return (usedX, usedY, positionId, mbrUsed)   // core refunds amountX − usedX, amountY − usedY
```

Cost per bin (prototype, compiled):
- about 250 opcodes for a single-sided bin, including the share math;
- plus about 30 for the position write;
- plus about 400 to 600 for the active bin with a composition fee.

A 64-bin "spot" deposit is about 18k opcodes, roughly 26 op-ups. A 64-bin
position spans at most 3 chunks, so it needs 1 position ref, 3 chunk refs,
the pool state and the step table.

### 4.6 removeLiquidity across a range

```
removeLiquidity(positionId, fromId, toId, fracPpb, minX, minY): owner only
for id in [fromId, toId] ∩ position:
  sh = floor(position.shares[k] · fracPpb / 1e9)     // fracPpb = 1e9 removes everything exactly
  outX += floor(sh·xb/supply); outY += floor(sh·yb/supply)
  rec −= (…, sh); position.shares[k] −= sh
  if rec.supply == 0: clear occupancy bit; if chunk occupancy == 0: clear bitmap bit (+summary)
require outX ≥ minX and outY ≥ minY; st.totals −= out; core pays out from escrow
```

`emergencyRemoveLiquidity` uses the same body. The core skips hooks when the
pool is paused, as today.

### 4.7 Custody delta booking (swap equivalence)

The core snapshots escrow holdings, flash-rekeys the escrow to the hook, calls
it, checks the rekey back, and then passes the signed deltas to the engine:

```
bookCustody(poolId, dX, dY):             // signed; computed by the core from spendable holdings
  if dX == 0 and dY == 0: return
  if dX ≤ 0 and dY ≤ 0: revert errCustodyInvariant  // value left; covers fee, in-flight and protocol balances (§7)
  if dX ≥ 0 and dY ≥ 0:                  // donation
     require activeBin.supply > 0        // an empty bin would hand it to the next depositor
     activeBin += (dX, dY); totals += …; return
  // one side out, one side in: treat it as a swap the hook made against the bins
  (needIn, endId) = swapExactOut(out = |neg side|, dir, fee = pool fee, write = true)
  require pos side ≥ needIn               // at least as good as a trader
  bin(endId) += pos side − needIn         // surplus (e.g. backrun profit) goes to LPs in the new active bin
```

- With a single bin, this reduces to *active-bin `L` at `P(active)`, after the
  fee, must not decrease*. This is the direct analogue of the CPMM k-guard.
- It also works across bins: a backrun hook can take Y out of the escrow, sell
  it on Tinyman, and return X. The DEX books that exactly as a swap that moves
  the price and charges the pool fee. All profit beyond what a swap would have
  required stays with LPs. This is the bin-pool form of the
  "backrun profit to LPs" goal in track (3).
- Cost: one exact-out traversal. The bins it crosses must be referenced, and
  the hook's SDK computes them.

### 4.8 Exact-output swaps

These follow the same loop with `outLeft` in place of `rem` (§2.4). The router
uses them for `minOut` legs and the custody guard.

---

## 5. Limits: opcode budget, refs, inner transactions

Measured from the compiled TEAL of the prototype (Appendix C), summing opcode
costs along the loop path:

| Path | Opcodes |
|---|---|
| Bin fully drained, including the LB variable fee | **≈ 340** |
| Last (partial) bin | ≈ 450 |
| Switching chunk (key build, anchor and occupancy read, bitmap search) | ≈ 100 |
| Anchor `pow` on chunk creation | ≈ 700 typical, 1,300 worst |
| Fixed swap overhead (core: deposit check, pool load, engine call, payout, event; no hooks) | ≈ 1,000 to 1,500 (estimate) |

The production code adds direction handling and struct glue. Budget
**380 to 450 per bin**.

The outer call and the engine inner call each bring 700, so op-ups = budgets − 2.

| Bins crossed (dense) | Opcodes | 700-unit budgets | Op-up inner txns | Chunk refs |
|---|---|---|---|---|
| 1 | ≈ 1.9k | 3 | 1 | 1 |
| 10 | ≈ 5.0k | 8 | 6 | 1 to 2 |
| 64 | ≈ 26k | 38 | 36 | 2 to 3 |
| 256 | ≈ 100k | 143 | 141 | 8 to 9 |
| ceiling | ≈ 180k (256 inner txns + 16 outer per group) | | | about 400 bins |

- **Op-ups.** Call `ensureBudget(BinBudget, OpUpFeeSource.GroupCredit)` inside
  the loop. It only issues op-ups when `Global.opcodeBudget` is short. Each
  op-up costs 1,000 µALGO of pooled fee, so a 64-bin swap costs about
  0.036 ALGO extra.
- **Box refs, legacy foreign arrays** (8 slots per transaction, at most 4
  accounts). A core swap transaction already uses about 7 slots: engine app,
  escrow, X, Y, core pool box, core hook box, engine pool box. The step table
  and chunks therefore travel on `engine.opUp()` transactions in the same
  group. Each carries 8 engine box refs, which is 8 chunks or 256 dense bins
  with 2 KB each of I/O budget. Group resource sharing makes them visible to
  the engine's inner call, because each box ref sits in the same transaction
  as its app.
- **Access lists** (AVM v12, consensus v41; 16 entries, 2 KB budget per box or
  empty entry). Holdings must be listed explicitly: `h(escrow, X)`,
  `h(escrow, Y)`, `h(recipient, out)`. That is about 10 to 11 entries before
  any chunk, leaving 5 to 6 chunks in the swap transaction itself. A transaction
  cannot use both an access list and foreign arrays.
- **Sparse liquidity is the real limit.** In the worst case each bin is in its
  own chunk, so one ref per bin: 8 bins per extra legacy transaction, or 16
  with an access list. 16 outer transactions give a ceiling of about 120 sparse
  bins. Hence the `minBinShares` anti-dust floor and `MaxBinsPerSwap = 64`
  (per pool, admin-tunable).
- **Inner transactions.** The core needs 1 engine call, 1 payout, the hooks
  (1 each, or 3 for custody) and the op-ups. All of it comes out of the group's
  256.
- **Program size.** The prototype (pow, the one-direction loop and a one-bin
  deposit) compiles to 1.2 KB. The full engine has both directions, quote
  sharing the loop, range add and remove, positions, bitmaps, the variable fee,
  custody booking and admin. Estimate **6 to 8 KB**; see §9.

---

## 6. Continuing a swap across app calls

Mostly unnecessary. Budget, resource refs and box I/O are all group-pooled, so
one engine call can cross every bin its group references.

When a trade is too large for one call (more than `MaxBinsPerSwap`, or a
router splitting across venues), use **consecutive swaps in one group**:
`swap(slice₁)`, `swap(slice₂)`, …, then an aggregate `minOut` check in the
router plugin or a final assert.

Bins are constant sum, so the result does not depend on the path. Slice 2
starts exactly where slice 1 stopped, inside the same partially used bin, and
every bin trades at its own fixed price. The variable fee is also unaffected:
within a round `dt = 0`, so `idRef` and `vr` do not move, and
`va = vr + |idRef − id|` is a function of the bin, not of call boundaries.

Total output therefore equals a single swap minus at most about 2 base units of
rounding per extra call (per-call fee ceilings and output floors). Each call
does run the hook stack again, which adds per-call hook overhead and per-call
hook fee rounding.

Optional strict continuation, not recommended for v1:
- a `SwapCursor` box keyed by `Global.groupId ‖ poolId` holds `rem` and `out`;
- `swapBegin` asserts by gtxn introspection that a later transaction in the
  group calls `swapFinish` on the same pool;
- `swapFinish` deletes the cursor and pays out.

Atomicity guarantees the cursor can never outlive the group.

---

## 7. Custody guard invariant for bin pools

- **Invariant.** For any custody call, let `(dX, dY)` be the escrow's net
  spendable change. ALGO is measured as `balance − minBalance`, as today.
  There must exist a valid engine swap (exact-out, with the pool's current
  fees) whose input is at most what the hook added and whose output equals what
  the hook removed. A pure donation must go to a non-empty active bin, and a
  pure withdrawal is never allowed.
- **Booking.** The DEX applies that swap to the bins and credits the surplus to
  the final active bin. Every bin's `L` at its own price is unchanged or
  higher, and every bin keeps its composition rule. That is LPs being "at least
  as well off as a swap against the curve", with the curve now being the bin
  ladder.
- **Why not "total value at the active price must not decrease"?** Booking a
  delta pro-rata across N bins is O(N). It would also break the rule that bins
  above the active bin hold only X and bins below hold only Y.
- **Why not "per-asset reserves must not decrease"?** That would forbid every
  rebalance and backrun, so custody would be pointless.
- **Out of scope here:** sandwiching (the user's `minOut` protects them, and
  admin approval gates custody) and liveness (pause enables emergency removal
  that skips hooks). These are the same as the CPMM.
- **External positions** (track (1)'s lending or consensus stake with a
  reported valuation) are **not supported for bin pools in v1**. Bin reserves
  are per-bin liabilities that LPs withdraw on demand at fixed per-bin
  amounts. An external position would need per-bin claims plus a liquidity
  buffer and withdrawal queue. If it is wanted later, do it in a vault app
  that *owns positions* rather than inside the pool.
- **Fee choice.**
  - The CPMM k-guard is fee-free at the margin.
  - The bin guard above charges the full pool fee, which is stricter.
  - Alternative: `custodyFeeMode ∈ {full, base, zero}` per pool.
  - Recommendation: `full`. A backrun hook still profits whenever the external
    edge is larger than the fee, and that edge goes to LPs.

---

## 8. Hooks and quoting for bin pools

Until track (1) adds a curve-specific context, the core fills `HookContext` as
follows:

- `reserveIn` / `reserveOut` are the **active-bin** reserves at hook time,
  which is the depth at the current price.
- `feeBps` is the base fee rounded to bps.
- `lpAmount` is the `positionId` for liquidity points.
- `amountIn` / `amountOut` are the X and Y totals for liquidity points.
- The proposed new field `curveState: bytes` carries ABI-encoded `BinHookState`:
  `{ activeId, binStep, activePrice: bytes<32>, totalX, totalY, va, startId, endId, binsCrossed, fromId, toId }`.

How the existing hooks map onto bin pools:
- `ImpactFeeHook` takes `amountIn / reserveIn` and becomes "amount relative to
  active-bin depth". That is a reasonable proxy, but a bin-native impact hook
  should use `binsCrossed` from a quote.
- `SwapTaxHook` works unchanged, since it only uses `amountIn`.

Hook-aware quote: `Quote` hooks run first (fee override and hook fees), then
`engine.quote*(…, write = false)`. That is the same code path as the swap, so a
pricing hook is honest by construction, given the core's existing rule that
pricing hooks must subscribe to `Quote`.

Router notes for track (4):
- A bin's marginal price is piecewise constant, so a solver can split against
  CPMM legs exactly. It fills bins while `P(id)·(1 − f)` beats the CPMM
  marginal output.
- `getBins(poolId, fromId, n)` is unnecessary on-chain. The SDK reads chunk
  boxes directly.

Launches for track (5):
- A bin pool seeded with **single-sided creator-token deposits across bins
  above the launch price** is a native bonding curve (the Meteora launch-pool
  pattern).
- The migration target can be the same pool, with no move of liquidity.
- Anti-snipe decaying fees are a `DynamicFee` hook over the base fee.

---

## 9. Contract organisation

```
smart_contracts/plugin-dex/pool-types/bins/
  engine.algo.ts      BinEngine: state, swap/quote loop (one direction-generic loop, write flag),
                      add/remove, positions, bitmaps, custody booking, initBinStep, opUp()
  math.ts             pure fns: shr128/shl128/shr96, toU64 (bitlen-guarded), mulDivUp, binSwap, fees
  layout.ts           offsets, sizes, box prefixes, NONE, BinsPerChunk, WindowBins
  types.ts            BinPoolState header struct, BinHookState, results/events
tests/models/bins-model.ts   bigint reference model (same integer procedures) used by tests + SDK
```

Size control:
- one generic loop for both directions and for quote;
- raw `box.extract` / `box.replace` with constant offsets, rather than ABI
  struct decoding of 1 KB values;
- `op.substring`, not `bytes.slice`, for shifts.

Boxes are app-local, so bin state cannot be split across two apps. If the
engine is still above 8 KB, apply these in order:

1. Drop the on-chain getters. The SDK reads boxes directly.
2. Fold `initBinStep` into the same `pow` and `mul` helpers the anchor uses.
3. Last resort: move positions into a `BinPositions` app that owns the position
   boxes. The engine keeps the bin supply. The core calls the engine, the
   engine returns per-bin share deltas, and the core forwards them to
   `BinPositions`. This adds one inner call per add or remove.

`PluginDex` is immutable (`immutable-catalog.json`). The engine should be
immutable too, and registered with the core as a pool-type module.

---

## 10. Security notes

- **Rounding** is always in the pool's favour (§2.4, §2.3). Property:
  `L_bin(P)` is non-decreasing across any swap, and `Σ shares` paid out never
  exceeds reserves.
- **Donation and inflation attacks.** Reserves are booked, not read from
  balances. Only swap fees and the custody surplus raise a bin's share price.
  Effective-amount refunds remove rounding theft.
- **Dust griefing.**
  - Dust bins spread across many chunks force swaps to cross more bins and
    refs, and they never empty on their own.
  - Mitigations:
    - `minBinShares` on deposits into empty bins (e.g. ≥ 1 Y unit × 2^32);
    - chunk rent (0.45 ALGO per chunk) as a cost to the attacker;
    - `MaxBinsPerSwap`.
- **Variable-fee manipulation** follows LB's filter and decay design.
  Splitting a swap does not lower its fees (§6).
- **Window edges.** Deposits outside `[minId, minId + 65,536)` revert, and swaps
  stop at the edge (full-fill swaps revert there).
- **Position authorization.** Only the position owner may remove, so the
  ARC-58 wallet's spending account owns the position. Transfers are explicit.
- **The engine trusts only the core** (`callerApplicationId`). Hooks never call
  the engine directly.

---

## 11. Test plan

**Off-chain (vitest, no network): `bins-model.ts` against vectors**

1. `T`, `F` and the anchors for `s ∈ {1, 2, 5, 10, 15, 20, 25, 50, 100}` match
   the integer procedures in §2.2.
2. `P(2^23) = 2^128`.
3. `P(id+1) > P(id)` for **every** id in range, including across chunk edges
   and with negative exponents.
4. Price within 1e-12 relative of the real `(1 + s/1e4)^e`.
5. Range rejection at `2^±64`.

**E2E on LocalNet (`bins.e2e.spec.ts`)**

Setup and swaps:

1. `initBinStep` stores the model's table. A second call is a no-op or reverts.
2. `createPool`:
   - window and active chunk created;
   - measured MBR charged and the excess refunded;
   - the core's `pairPools` lists the pool.
3. Swap inside the active bin only: output equals the model exactly; the fee
   compounds into the bin; the protocol fee is held outside reserves.
4. Swap crossing many bins and **several chunks, skipping empty bins and an
   empty chunk**:
   - `activeId` ends where the model says;
   - per-bin reserves match the model.
5. Full-fill swap reverts when liquidity runs out. `allowPartial` refunds the
   rest. `MaxBinsPerSwap` is enforced.
6. Variable fee:
   - `va` grows per bin crossed;
   - the filter and decay periods behave as specified, using block-timestamp
     offsets on the dev-mode LocalNet;
   - quote == swap within a round.

Liquidity:

7. Add liquidity:
   - single-sided X above and Y below;
   - both sides on the active bin;
   - X below or Y above reverts;
   - `activeIdDesired` / `idSlippage` revert;
   - distribution sums above 1e9 revert;
   - the composition fee is charged only on a mismatched ratio, and credited to
     existing LPs;
   - position shares are written;
   - occupancy, bitmap and summary bits are set;
   - chunk and position MBR are measured and the excess refunded.
8. Remove liquidity:
   - pro-rata, including accrued fees;
   - removing 100% leaves no dust;
   - empty bins and chunks clear their bits;
   - `closePosition` and `closeChunk` refund the MBR;
   - the active chunk cannot be closed;
   - only the owner can remove;
   - `transferPosition` works.
9. Invariants after every operation:
   - escrow holding == `totalX/Y` + protocol fees;
   - `Σ bins == totals`;
   - `Σ position shares` per bin == bin supply.

Hooks and custody:

10. Hooks:
    - a `DynamicFee` override of the base fee;
    - hook fees capped by `maxHookFeeBps`;
    - `Quote` hooks keep quote == swap.
11. Custody (extend `MockDexHook`):
    - an in-bin trade at or better than the bin price plus fee passes;
    - a worse one reverts;
    - a cross-bin backrun (take Y, return X ≥ exact-out requirement) moves
      `activeId` and puts the surplus in the end bin;
    - a pure withdrawal reverts;
    - a donation to an empty active bin reverts;
    - keeping the rekey, or rekeying elsewhere, reverts.

Limits, attacks, emergency:

12. Budget and refs:
    - 64-bin swaps with chunk refs carried on `engine.opUp()` transactions;
    - an access-list variant;
    - record `appBudgetConsumed` per bin via simulate and fail if it exceeds
      450 per bin.
13. Split equivalence: one swap vs N consecutive swaps in the same group give
    the same output within N·2 base units.
14. Attack and rounding properties:
    - randomized fuzz of swaps, adds and removes against the model;
    - bin `L` never decreases;
    - dust-first-deposit then large deposit (no overflow, no theft);
    - `minBinShares` enforced;
    - a bin value above 2^96 reverts.
15. Paused pool: `emergencyRemoveLiquidity` skips hooks and returns pro-rata
    funds.

---

## 12. Open questions for Kyle

1. **Engine as a pool-type module app** called by core v2 (recommended), or a
   standalone bin DEX app? This depends on track (1)'s interface.
2. **128-bit shares** (recommended; chunk 1,096 B at 0.45 ALGO), or 64-bit
   shares with a per-pool shift (chunk 840 B at 0.35 ALGO, with precision and
   overflow trade-offs)?
3. **Window of 65,536 bins** (flat bitmap in pool state), or the full 2^24
   space with bitmap page boxes? The full space costs one more ref when
   searching far.
4. **Native variable fee** in the engine (recommended), or base-fee-only with
   volatility left entirely to hooks?
5. **Custody fee mode**: `full` (recommended), `base`, or `zero` (CPMM parity)?
6. **Chunk rent**: the first LP pays and is refunded on close (recommended), or
   the pool creator prefunds a band of chunks?
7. Position width cap: 64 (one 2 KB ref, about 1.1 KB)? Up to 120 also fits in
   2 KB.

---

## Appendix A. PuyaTs APIs relied on (algorand-typescript 1.3.1)

Paths are relative to `node_modules/@algorandfoundation/algorand-typescript/`.

| API | Where | Used for |
|---|---|---|
| `BoxMap<K,V>({keyPrefix})`, `(key)` → `Box<V>` | `box.d.ts:104-114, 145` | pool, chunk, position and step boxes |
| `Box.create({size})` | `box.d.ts:17-19` | chunk, position and table creation at exact size |
| `Box.extract(start, length)` | `box.d.ts:88` | 16 B bin record, 16 B step fraction, 8 B bitmap words, 152 B header |
| `Box.replace(start, value)` | `box.d.ts:78` | bin record, supply, position share, header field writes |
| `Box.resize(newSize)` | `box.d.ts:97` | `extendPosition` |
| `Box.delete()`, `.exists`, `.length`, `.maybe()` | `box.d.ts:31-57` | close chunk or position |
| `op.Box.*` (`create/extract/replace/splice/resize/length/delete`) | `op.d.ts:518-582` | raw-key fallback |
| `biguint`, `BigUint(uint64 \| bytes \| bigint \| string)` | `primitives.d.ts:55-88` | Q128.128 prices, `L`, `u128` shares |
| `biguint` operators `+ - * / % \| ^ &` and comparisons; no shifts, no `~` | puya-ts `contract-class-model-BC7K-QD5.js:3919-3926`; bit inversion is an error at `options-DfJ7pcG-.js:7515` | price and share math |
| `Bytes(biguint)` | `primitives.d.ts:239` | biguint → bytes for shifts and padding |
| `op.substring(a, b, c)`, `op.extract(a, b, c)` | `op.d.ts:2370, 2749-2753` | `>> 128` / `>> 96` by byte slicing |
| `bytes.concat`, `op.bzero(n)`, `op.itob`, `op.btoi` | `primitives.d.ts:125`, `op.d.ts:596, 1598, 590` | `<< 128`, 16 B padding, record encode |
| `op.extractUint64(bytes, off)` | `op.d.ts:736` | decode `x`, `y`, header fields and bitmap words |
| `op.mulw`, `op.divw`, `op.divmodw` | `op.d.ts:2296, 617, 610` | uint64 `mulDiv` and ceil-division (fees, distributions) |
| `op.bitLength(bytes \| uint64)` | `op.d.ts:498` | bitmap msb; `toU64` overflow guard |
| uint64 `<<`, `>>`, `&`, `^` (compile to `shl`, `shr`) | `op.d.ts:2352, 2358`; verified in the prototype | bitmap masks, `lsb` |
| `op.getBit` / `op.setBit` (uint64 overload) | `op.d.ts:757, 2765-2769` | occupancy and summary bit set/clear |
| `ensureBudget(n, OpUpFeeSource.GroupCredit)` | `util.d.ts:183-205` | per-bin op-up |
| `Global.latestTimestamp`, `Global.groupId`, `Global.opcodeBudget`, `Global.callerApplicationId` | `op.d.ts:1166, 1186, 1191, 1196` | volatility clock, optional cursor, budget check, core-only guard |
| `bytes<32>` in struct types | used in the repo: `meta/types.ts:18` | `activePrice` in `BinHookState` |

## Appendix B. AVM facts used

- Box MBR is `2,500 + 400·(len(name) + size)`; the maximum box size is
  32,768 B.
- Each box ref, or empty ref, grants **2,048 B of I/O budget**. The budget is
  charged on the full size of every box touched, not on the bytes read. The
  maximum is 16 KB with foreign arrays and 32 KB with an access list.
- Access lists: AVM v12, consensus v41, `MaxAppAccess = 16`. Holdings and
  locals are explicit entries. A transaction cannot combine an access list with
  foreign arrays. Resource sharing works the same way as with foreign arrays.
  A box is shareable when its app and its box ref are in the same transaction.
- Foreign arrays allow 8 refs per transaction, with at most 4 accounts.
- Opcode costs: `b*`, `b/`, `b%` 20; `b+`, `b-` 10; `b|`, `b&`, `b^` 6;
  `bsqrt` 40; `divmodw` 20; `expw` 10; `box_*`, `mulw`, `divw`, `bitlen`,
  `extract_uint64`, `replace3` and `concat` 1. Byte-math inputs are at most
  64 bytes.
- From the task brief: 700 opcode budget per app call, pooled across the group,
  and every inner app call (including op-ups) adds 700; 16 inner transactions
  per app call, pooled up to 256; inner call depth 8; no re-entry; logs capped
  at 32 per transaction and 1 KB.

## Appendix C. Prototype measurement

A throwaway PuyaTs prototype was compiled with puya-ts 1.3.1 / puya 5.10.1. It
contains `anchorPrice` (pow via the `T` table), a one-chunk `swapXForY` loop
with the LB per-bin variable fee and a fee-on-top in-bin swap, and a
single-sided `depositX`. It compiles to **1,195 B** of approval bytecode. It was
kept outside the repo, so the repo build is unchanged.

Opcode cost was summed per basic block of the emitted TEAL:

- One fully drained bin, from loop head to loop head:
  - `while_top` 33
  - variable fee 43
  - `binPrice` 49 + `shr128` 17
  - `maxIn` 60
  - `toU64` 12
  - `maxFee`: 20 + `mulDivUp` ≈ 40
  - record write and accumulators: 31 + 6
  - `nextBelow` 29

  Total **≈ 340**.
- The partial last bin adds the `else` branch: about 40 + `mulDivUp` 40 +
  `shr128` 17 + `toU64` 12, for **≈ 450** in total.
- `anchorPrice` costs about 65 per set exponent bit and about 15 per clear bit.
- `depositX` into an existing or empty bin costs about 250, including ABI
  routing.
