# PluginDex v2: final implementation spec

Status: design only. No existing source file was changed by this step. This document supersedes
`design-vault.md`, `design-monolith.md` and `design-hooks-as-curves.md` wherever they disagree. The
feature research (`bins.md`, `lvr.md`, `router.md`, `venues.md`, `akita-hooks.md`) remains the
reference for algorithms, except where this spec overrides it. Section 9 lists every override.

Scope: all five features Kyle approved.
1. Pricing curves become modules, with a generalized custody guard and external positions.
2. A bin-based concentrated-liquidity pool type (Liquidity Book / DLMM).
3. A volatility dynamic-fee hook and an AfterSwap backrun-arbitrage custody hook.
4. An ARC-58 router plugin, venue adapters (Tinyman v2 first), hook-aware on-chain quoting and split
   execution.
5. Akita-native hooks: gated fee discounts, and creator-token launches (bonding curve, tax, anti-snipe,
   graduation).

Fixed inputs from Kyle: per-pool escrows stay, and hooks stay permissioned (admin-approved).

---

## 0. Decisions at a glance

| # | Decision | Source |
|---|---|---|
| D1 | **PluginDex becomes the Vault.** It is the only app that moves pool funds. It keeps per-pool escrows, booked balances, LP accounting, hook stacks, approvals and every user and router entrypoint. | Vault design (judges 2 and 3) |
| D2 | **Hybrid curve model.** The Vault has one *native* curve compiled in: constant product with optional virtual offsets. That covers both plain CP pools and launch (VCPMM) pools, and keeps zero extra inner calls plus a hard in-core k-guard. Every other curve is an **approved, version-pinned curve app** in a generic slot, called through `akitaDexCurve`. Bins is the first curve app. | Judge 1 graft, judge 3 grafts |
| D3 | **Program cap is 16 KB, not 8 KB.** Verified on MainNet by simulate on 2026-10-02 (§1). The Vault keeps `loggedAssert`, targets AVM 13, and gets a CI size gate of **13,000 B**. No factory split is needed; that stays a fallback valve. | Judge 3 fatal; verified here |
| D4 | **Every trust decision is frozen at pool creation and version-pinned.** Hooks, the curve app and valuators are pinned with `rejectVersion = approvedVersion + 1` on every inner call. Caps and fee ceilings are copied into the pool. Later approval changes affect only later pools. | Vault |
| D5 | **Custody guard = "at least as good as a trader paying `custodyFeeBps`".** Native pools use a fee-adjusted k check on effective reserves. Curve pools use three layers: the Vault's L2 value floor at the pre-call spot price, the curve's `Settle` with that fee, and the Vault's aggregate cross-check plus price-direction band. `custodyFeeBps` is frozen per pool; the SDK default is `feeBps`. | All three; judge 2 fatal on fee-free custody |
| D6 | **External positions:** at most 2 slots per pool, declared at creation, native fungible pools only. The receipt ASA must be held by the escrow. A per-unit rate comes from a pinned valuator and is clipped up *and* down per elapsed time. No haircut. The receipts of *every* slot are snapshotted around *every* custody call. Exits pay receipts in kind. Big markdowns go through the admin only while the pool is paused. | Monolith rate clip, Vault snapshots; judge 2 fixes |
| D7 | **Launch pools are native** (VCPMM). Graduation happens **in place**: the same pool id and escrow, the offsets are retired, and price continuity is exact. The launch LP stays locked forever. | akita-hooks B7.1, judge 3 graft |
| D8 | New generic entrypoints: `poke`, `sync`, `revalue`, `graduate`, `initializeLaunch`, `tryQuoteRoute`. `quote`/`quoteRoute` take `swapper` and `data`. Hook install gets `initData` and `funding` (F6). There is an output-side hook fee (F8), lazy custody, and routes reject repeated pools. | Vault, akita-hooks, router, lvr asks |
| D9 | **No forwarders.** Under the ARC-58 router, the Vault's `Txn.sender` already *is* the user's spending account. Quotes take an unauthenticated `swapper` (read-only, harmless). | Judge 2 graft |
| D10 | Router: an immutable adminless ARC-58 plugin, **SANDBOX custody only** in v1, a `VenueRegistry` with pinned adapter versions, a Tinyman v2 adapter, and `swap` (explicit legs) plus `swapBest` (on-chain best-of-N, greedy chunks, quote promise). | router.md |

---

## 1. Platform facts, verified (these correct earlier research)

Verified on 2026-10-02 with `simulate` against MainNet (algonode, algod 5.0.2). The scripts are in this
session's scratchpad, not in the repo. P0 repeats every check on LocalNet.

| Fact | Evidence | Consequence |
|---|---|---|
| **AVM 13 is active on MainNet.** | A `#pragma version 13` app create simulates OK. | The Vault targets `@contract({ avmVersion: 13 })`, following repo precedent: `AbstractedAccount`, `Guild` and `meta` are already at 13. `rejectVersion`, `Application.version` and `op.AppBox` / `appForeignBoxReads` are all available. |
| **Programs up to 16 KB are accepted with `extraPages ≤ 7`.** A 12,007-byte approval with 7 extra pages simulates OK. With 3 extra pages it fails: "approval program too long (12007 > 8192)". | MainNet simulate | The 8 KB premise of all three designs is false. Size is no longer the deciding factor. |
| Creating an app above 8,192 B costs **write budget**: bytes over 8,192 need empty box refs, each giving 2,048 B. It also needs a **higher fee**: the creating txn needs about `minFee × (1 + (len − 8192)/10_000)`. | 0 refs: "write budget exceeded (3818 > 0)". 2 refs: OK. Fee 1,000 µALGO: "less than 1.382mA". | `scripts/lib/immutable-deployment.ts` and the test fixture must add `ceil((len−8192)/2048)` empty box refs and a static fee for the Vault create. P0 verifies this on LocalNet. |
| **Inner transactions are pooled at 256 per group as soon as one app call is present, *not* 16 per app call.** | One top-level app call issued 16, 17, 40 and 256 inner payments: all OK. 257 failed: "too many inner transactions". | Every design and `router.md` got this wrong ("48 for a 3-call wallet group"). `opUp()` carriers are needed **only** for opcode budget and resource references, never for inner slots. Fix the SDK sizing logic. |
| Opcode budget is 700 per app call, pooled. Every inner app call adds 700. | Unchanged | As before |
| PuyaTs 1.3.1: `itxn.ApplicationCallFields.rejectVersion` (`itxn.d.ts:962`); `AbiCallOptions extends Omit<ApplicationCallFields,'appArgs'>` (`arc4/c2c.d.ts:75`), so `abiCall` accepts `rejectVersion`; `Application.version` (`reference.d.ts:242`); `op.AppParams.appVersion` (`op.d.ts:367`); `@contract({ avmVersion: 10..13 })` (`base-contract.d.ts:39`). Inner app calls have **no access-list field**, only `accounts`/`assets`/`apps`. | Typings | Pinning works with no workaround. Inner calls rely on group resource sharing. |
| Foreign box **reads** exist in AVM 13 (`op.AppBox.*`, `AppParamsSet.appForeignBoxReads`). Writes stay app-local; family access is not used. | Typings; `meta/functions.ts` already uses them | The bins engine enables foreign reads so routers, hooks and the SDK can read bin state without an inner call. Bin *writes* must still live in the engine. |

---

## 2. Decomposition

```
                     admin = DAO wallet: approvals (future pools only), pause, protocol fee, treasury,
                     paused-only external write-down
                                         │
user / LaunchManager / AkitaRouterPlugin ─▶ PluginDex (Vault, immutable, AVM 13, ≤ 13,000 B gate)
                                         │  boxes: p pools, h hooks, e external slots, x pair index,
                                         │         a hook approvals, t curve approvals, v valuator approvals
                                         │  owns: LP ASAs (unissued + locked launch LP)
                                         │  auth address of every pool Escrow
          ┌──────────────────┬───────────┼──────────────────────┬──────────────────────────┐
          ▼                  ▼           ▼                      ▼                          ▼
   Pool Escrow (1/pool)  Curve apps    Hook apps             Valuator apps            External venues
   child Escrow app;     (approved,    (approved, pinned)    (approved, pinned)       (Tinyman v2, lenders,
   holds reserves,       pinned):      DynamicFee, HookFee,  read-only rate of a      consensus via escrow
   protocol fees,        BinEngine     HookFeeOut, Custody,  receipt ASA              keyreg)
   locked launch funds,  (more later)  External, Poke
   receipt ASAs          no funds      custody = flash rekey
                         ever          of the pool escrow

AkitaRouterPlugin (immutable, adminless, ARC-58 plugin) ─▶ PluginDex.swapRoute / tryQuoteRoute (sent as S)
                                                       └▶ VenueAdapter (approved in VenueRegistry, pinned)
                                                            └▶ Tinyman v2 (immutable, real bytecode in tests)
```

### 2.1 Apps, mutability and trust

| App | File | Code | Approval / pinning | Holds funds |
|---|---|---|---|---|
| `PluginDex` (Vault) | `plugin-dex/contract.algo.ts` | **immutable** (catalog key `PluginDex`) | n/a | LP ASA reserve and MBR; controls every escrow |
| Pool `Escrow` | `escrow/contract.algo.ts` (unchanged) | existing | rekeyed to the Vault at creation | all pool tokens |
| `BinEngine` | `plugin-dex/curves/bins/engine.algo.ts` | **immutable** | `setCurveApproval`, pinned per pool | box MBR only |
| `ImpactFeeHook`, `SwapTaxHook` | `plugin-dex/hooks/*` | immutable | hook approval, pinned | hook fees |
| `VolatilityFeeHook`, `BackrunArbHook` | `plugin-dex/hooks/*` | immutable code; admin-configurable registration and kill switch (backrun) | hook approval, pinned | registration box MBR (no backrun tank since §10 A42) |
| `GatedFeeHook`, `AntiSnipeFeeHook`, `LaunchTaxHook` | `plugin-dex/hooks/*` | immutable code; DAO-configurable parts listed per WP | hook approval, pinned | tax accruals |
| `ConsensusKeyregHook` | `plugin-dex/hooks/consensus-keyreg.algo.ts` | immutable code; operator set by admin | hook approval (Custody), pinned | fee tank |
| `LaunchManager` | `plugin-dex/launch/launch-manager.algo.ts` | immutable | not a hook (an ordinary caller) | graduation bounties |
| `VenueRegistry` | `plugin-dex/venues/registry.algo.ts` | immutable code; admin = DAO wallet | n/a | MBR |
| `TinymanV2Adapter` | `plugin-dex/venues/tinyman-v2-adapter.algo.ts` | immutable | `VenueRegistry.setAdapter`, version-pinned | nothing |
| `AkitaRouterPlugin` | `arc58/plugins/akita-router/contract.algo.ts` | **immutable, adminless** (catalog `plugin: true`, version 0 is required by the ARC-58 wallet) | installed per wallet | leg escrow `E`: MBR and opt-ins only |
| Test-only mocks | `plugin-dex/tests/*.algo.ts` | n/a | n/a | n/a |

### 2.2 File plan

```
smart_contracts/plugin-dex/
  contract.algo.ts            MODIFY  Vault v2 (WP1)
  types.ts                    MODIFY  §3.1, frozen in WP0
  constants.ts                MODIFY  §3.2, frozen in WP0
  errors.ts                   MODIFY  §3.3, frozen in WP0
  hook-interface.ts           MODIFY  §3.4, frozen in WP0
  curve-interface.ts          NEW     §3.5, frozen in WP0
  valuator-interface.ts       NEW     §3.6, frozen in WP0
  math.ts                     NEW     mulDiv, mulDivUp, Q64 helpers, SignedDelta (WP0 stubs, WP1 impl)
  ARCHITECTURE.md             MODIFY  after WP1 lands
  hooks/impact-fee.algo.ts    MODIFY  recompile on v2 types; passResult() (WP1)
  hooks/swap-tax.algo.ts      MODIFY  same (WP1)
  hooks/consensus-keyreg.algo.ts   NEW (WP1-H)
  hooks/volatility-fee.algo.ts     NEW (WP3)
  hooks/backrun-arb.algo.ts        NEW (WP3)
  hooks/gated-fee.algo.ts          NEW (WP5)
  hooks/anti-snipe-fee.algo.ts     NEW (WP5)
  hooks/launch-tax.algo.ts         NEW (WP5)
  hooks/shared/origin.ts              NEW (WP5) genuine-wallet origin resolution with the ACC-01 check inlined
  curves/bins/engine.algo.ts       NEW (WP2)
  curves/bins/{math,layout,types}.ts NEW (WP2)
  launch/launch-manager.algo.ts    NEW (WP5)
  venues/venue-adapter.ts          NEW (WP0 freeze; interface + requireVenueCustody)
  venues/registry.algo.ts          NEW (WP4)
  venues/tinyman-v2.ts             NEW (WP-T) shared venue library: pool address, quote, swapAs
  venues/tinyman-v2-adapter.algo.ts NEW (WP4)
  tests/mock-dex-hook.algo.ts      MODIFY (WP1) v2 ctx plus new modes (§4.13)
  tests/mock-curve.algo.ts         NEW (WP1) honest CP plus evil modes
  tests/mock-valuator.algo.ts      NEW (WP1)
  tests/mock-lender.algo.ts        NEW (WP1)
  tests/mock-updatable-hook.algo.ts NEW (WP1) has an UpdateApplication path (pin tests)
  tests/recording-dex-hook.algo.ts NEW (WP1) records ctx.caller/recipient/data per point
  tests/mock-venue-adapter.algo.ts NEW (WP4)
  tests/mock-social-impact.algo.ts, tests/mock-wallet.algo.ts, tests/mock-wallet-factory.algo.ts NEW (WP5)
  plugin-dex.e2e.spec.ts      MODIFY helpers/fixture only (§4.14)
  core-v2.e2e.spec.ts         NEW (WP1)
  external.e2e.spec.ts        NEW (WP1)
  launch.e2e.spec.ts          NEW (WP1 core launch; WP5 adds LaunchManager cases)
  size.spec.ts                NEW (WP0) CI size gate
  curves/bins/bins.e2e.spec.ts, hooks/*.e2e.spec.ts, venues/*.e2e.spec.ts   NEW (owning WP)
smart_contracts/arc58/plugins/akita-router/
  contract.algo.ts, types.ts, constants.ts, errors.ts, akita-router.e2e.spec.ts   NEW (WP4)
tests/fixtures/plugin-dex.ts                NEW (WP0) deployVault, createPool, addLiquidity, holding, invariants
tests/fixtures/external/tinyman-v2.ts       NEW (WP-T) + tinyman-v2/amm_approval.teal.tok (sha256 dd63834d…691f56) + LICENSE
tests/fixtures/plugins/akita-router.ts      NEW (WP4)
tests/models/bins-model.ts                  NEW (WP2) bigint reference model
scripts/lib/immutable-catalog.json          MODIFY at deploy time: BinEngine, VenueRegistry, TinymanV2Adapter,
                                            AkitaRouterPlugin (plugin: true), hooks, LaunchManager
scripts/lib/immutable-deployment.ts         MODIFY (WP0) box refs and fee for apps > 8,192 B
```

Mocks under `plugin-dex/tests/` compile into artifacts, following the existing `MockDexHook` pattern.

---

## 3. Shared types and interfaces (frozen in WP0)

All types are native PuyaTs object types, encoded as ARC-4 tuples. **Field order is part of the
immutable ABI.** Prices are `bytes<16>`: an unsigned Q64.64 price of 1 base unit of A in base units of
B, big-endian. Do the arithmetic with `BigUint(bytes)`. `bytes<16>` is used instead of `Uint128` to
avoid the ARC-4 round-trip risk that design-vault §12.8 flagged.

### 3.1 `types.ts`

```ts
import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'

/** Curve-agnostic view the Vault caches/passes to hooks. Native pools: liquidity = 0, activeId = 0. */
export type CurveSnapshot = {
  priceX64: bytes<16>   // B per A, Q64.64, floor
  activeId: uint64      // bins: active bin id; native: 0
  liquidity: uint64     // curve-defined depth hint (bins: active-bin value in B base units); native: 0
  flags: uint64         // native: CurveFlagBonding while virtual offsets are active; curve apps: curve-defined
}

export type PoolInfo = {
  assetA: uint64                 // lower asset id (0 = ALGO)
  assetB: uint64
  escrow: uint64                 // child Escrow app id; auth address = Vault
  lpAsset: uint64                // LpModeFungible: Vault-created LP ASA; LpModeCurve: 0
  curve: uint64                  // 0 = native constant product (optionally with virtual offsets)
  curveVersion: uint64           // pinned Application.version of `curve` (0 for native)
  lpMode: uint64                 // LpModeFungible | LpModeCurve
  reserveA: uint64               // booked LP-owned balance = liquid + externalA (never includes virtual/locked/fees)
  reserveB: uint64
  externalA: uint64              // Σ bookValue of side-A external slots (always recomputed from slots)
  externalB: uint64
  externalSlots: uint64          // number of slots in box e (0..2); 0 ⇒ box e is never read
  virtualA: uint64               // launch offsets (native only); both 0 after graduation
  virtualB: uint64
  lockedA: uint64                // held by the escrow outside reserves forever-or-until-graduation
  lockedB: uint64                //   (launch graduation reserve, retained burn excess)
  lpSupply: uint64               // LP units incl. MinimumLiquidity and lockedLp (fungible modes)
  lockedLp: uint64               // launch LP that is never transferable
  feeBps: uint64                 // base LP fee (≤ MaxFeeBps)
  maxFeeBps: uint64              // ceiling for DynamicFee results on this pool (≤ MaxPoolFeeCapBps)
  custodyFeeBps: uint64          // fee a custody delta must pay (≤ maxFeeBps). SDK default = feeBps
  maxHookFeeBps: uint64          // cap on hook fee in + hook fee out (≤ MaxHookFeeBps)
  hookPoints: uint64             // union of installed hook points
  protocolFeesA: uint64
  protocolFeesB: uint64
  graduationThreshold: uint64    // launch: real quote-side reserve that unlocks graduate()
  priceX64: bytes<16>            // curve pools: cached canonical spot; native: zero (computed on demand)
  activeId: uint64               // curve pools: cached; native: 0
  lastUpdate: uint64             // Global.latestTimestamp of the last price-moving operation
  createdAt: uint64
  creator: Account
  quoteIsA: boolean              // launch: which side is the quote asset
  closed: boolean                // set when a curve result carries CurveFlagClose: no swaps/adds, removes open
  paused: boolean
}

/** createPool input (everything here is frozen into PoolInfo) */
export type PoolConfig = {
  curve: uint64
  feeBps: uint64
  maxFeeBps: uint64
  custodyFeeBps: uint64
  maxHookFeeBps: uint64
  virtualA: uint64               // native only; any non-zero offset makes a launch pool
  virtualB: uint64
  graduationThreshold: uint64    // launch only (> 0 iff offsets > 0)
  quoteIsA: boolean              // launch only
  curveMbr: uint64               // curve pools: µALGO forwarded to the curve's Init (excess refunded by the curve to the creator)
  curveArgs: bytes               // curve pools: Init args (bins: §5.2)
}

export type HookInstall = {
  app: uint64
  points: uint64                 // HookPoint* bitmask
  perms: uint64                  // HookPerm* bitmask (⊆ approval)
  flags: uint64                  // HookFlag* bitmask
  funding: uint64                // µALGO paid by the Vault to the hook app before AfterInitialize (F6)
  initData: bytes                // passed as ctx.data to THIS hook at AfterInitialize (F6)
}

export type HookConfig = {
  app: uint64
  version: uint64                // pinned Application.version (rejectVersion = version + 1)
  points: uint64
  perms: uint64
  flags: uint64
}

export type HookApproval = { perms: uint64; version: uint64 }
export type CurveApproval = { version: uint64; lpMode: uint64 }

export type ExternalSlotConfig = {
  hook: uint64                   // the only hook (with HookPermExternal) allowed to change this receipt balance
  valuator: uint64               // approved valuator; version pinned at creation
  side: uint64                   // 0 = underlying is assetA, 1 = assetB
  receipt: uint64                // ASA the escrow holds; the Vault opts the escrow in at creation
  capBps: uint64                 // bookValue ≤ capBps·reserveSide/1e4 whenever units increase (≤ MaxExternalCapBps)
  maxMarkupBpsPerDay: uint64     // per-unit rate may rise at most this much per day
  maxMarkdownBpsPerDay: uint64   // per-unit rate may fall at most this much per day (permissionless path)
}

export type ExternalSlot = {
  hook: uint64
  valuator: uint64
  valuatorVersion: uint64
  side: uint64
  receipt: uint64
  capBps: uint64
  maxMarkupBpsPerDay: uint64
  maxMarkdownBpsPerDay: uint64
  units: uint64                  // receipt units the escrow held at the last booking
  rate: uint64                   // booked underlying per receipt unit × RateScale
  bookValue: uint64              // floor(units · rate / RateScale), counted inside reserveSide
  lastMark: uint64               // Global.latestTimestamp of the last rate booking
}

export type PairKey = { assetA: uint64; assetB: uint64 }

/** Field order frozen. ~350 B + data + curveData; keep data ≤ 1,400 B (2 KB app-args cap). */
export type HookContext = {
  point: uint64
  poolId: uint64
  curve: uint64                  // 0 = native; hooks may refuse curves they do not understand
  escrow: Account
  caller: Account                // Txn.sender of the Vault call; at Quote: swapper (zero ⇒ Txn.sender)
  callerApp: uint64              // Global.callerApplicationId at the Vault (router plugin id, LaunchManager, 0)
  wallet: uint64                 // AMENDED 2026-10-04 (principal-resolution §6.12): caller's wallet hint, unverified; 0 outside swap/quote
  recipient: Account
  assetIn: uint64                // liquidity/initialize/poke points: assetA
  assetOut: uint64               // liquidity/initialize/poke points: assetB
  exactIn: boolean               // always true in v2; reserved
  custody: boolean               // true iff the escrow is rekeyed to this hook for this call
  amountIn: uint64
  amountOut: uint64              // AfterSwap: gross curve output (before hook fee out)
  reserveIn: uint64              // effective = booked + virtual
  reserveOut: uint64
  lpAmount: uint64
  lpSupply: uint64
  positionId: uint64             // curve-managed liquidity points
  feeBps: uint64                 // running LP fee (after earlier DynamicFee hooks)
  custodyFeeBps: uint64          // so custody hooks can size trades that pass the guard
  before: CurveSnapshot          // state at the start of this Vault operation
  after: CurveSnapshot           // After* points; equal to `before` at Before*/Quote/Poke/Initialize
  curveData: bytes               // curve-app hook data from the last curve call this op (bins: BinHookState); native: empty
  data: bytes                    // caller-supplied; AfterInitialize: this hook's HookInstall.initData
}

export type HookResult = {
  flags: uint64                  // HookResultSetFee | HookResultRequestCustody
  feeBps: uint64                 // DynamicFee (≤ pool.maxFeeBps)
  hookFee: uint64                // HookFee: units of assetIn taken at BeforeSwap/Quote
  hookFeeOutBps: uint64          // HookFeeOut: bps of amountOut paid to this hook in assetOut
}

export type SwapResult = { assetOut: uint64; amountOut: uint64 }
export type RemoveResult = { amountA: uint64; amountB: uint64 }        // unchanged (v1 parity)
export type CurveLiquidityResult = { positionId: uint64; shares: uint64; amountA: uint64; amountB: uint64 }

// events (ARC-28)
export type SwapEvent = { poolId: uint64; caller: Account; assetIn: uint64; amountIn: uint64; assetOut: uint64;
  amountOut: uint64; feeBps: uint64; hookFees: uint64; reserveA: uint64; reserveB: uint64 }          // unchanged
export type LiquidityEvent = { poolId: uint64; caller: Account; amountA: uint64; amountB: uint64; lpAmount: uint64;
  reserveA: uint64; reserveB: uint64 }                                                               // unchanged
export type CustodyEvent = { poolId: uint64; hook: uint64; point: uint64; deltaA: uint64; negA: boolean;
  deltaB: uint64; negB: boolean; reserveA: uint64; reserveB: uint64 }
export type ExternalMarkEvent = { poolId: uint64; slot: uint64; units: uint64; rate: uint64; bookValue: uint64 }
export type GraduationEvent = { poolId: uint64; tokenIn: uint64; tokenRetained: uint64; quoteToTreasury: uint64;
  priceX64: bytes<16> }
```

### 3.2 `constants.ts` (additions and changes; existing names kept)

```ts
// hook points: 1..128 unchanged
export const HookPointPoke: uint64 = 256              // keeper/admin-triggered; custody allowed
export const HookPointAll: uint64 = 511

// permissions: Custody 1, DynamicFee 2, HookFee 4 unchanged
export const HookPermHookFeeOut: uint64 = 8           // at most one per pool
export const HookPermExternal: uint64 = 16            // requires Custody; may change receipts of slots naming it
export const HookPermAll: uint64 = 31

export const HookFlagLazyCustody: uint64 = 1          // call first WITHOUT rekey; rekey + re-call only on RequestCustody
export const HookFlagsAll: uint64 = 1
export const HookResultSetFee: uint64 = 1             // unchanged
export const HookResultRequestCustody: uint64 = 2

export const CurveOpInit: uint64 = 1
export const CurveOpSwap: uint64 = 2
export const CurveOpQuote: uint64 = 3
export const CurveOpAdd: uint64 = 4
export const CurveOpRemove: uint64 = 5
export const CurveOpSettle: uint64 = 6
export const CurveFlagClose: uint64 = 1               // curve result: no more swaps/adds (removes stay open)
export const CurveFlagBonding: uint64 = 2             // native snapshot: launch offsets active

export const LpModeFungible: uint64 = 0
export const LpModeCurve: uint64 = 1

export const MaxFeeBps: uint64 = 1_000                // cap on base feeBps (name kept)
export const MaxPoolFeeCapBps: uint64 = 9_000         // cap on per-pool maxFeeBps (anti-snipe)
export const MaxHookFeeBps: uint64 = 1_000            // unchanged
export const MaxProtocolFeeBps: uint64 = 5_000        // unchanged
export const MaxExternalSlots: uint64 = 2
export const MaxExternalCapBps: uint64 = 5_000
export const RateScale: uint64 = 1_000_000_000_000    // valuator rate units
export const SecondsPerDay: uint64 = 86_400
export const MaxRouteHops: uint64 = 4                 // moved from contract.algo.ts

export const PluginDexBoxPrefixCurveApprovals = 't'
export const PluginDexBoxPrefixValuatorApprovals = 'v'
export const PluginDexBoxPrefixExternalSlots = 'e'
```

### 3.3 `errors.ts` (additions; every existing code is unchanged)

| Code | Meaning |
|---|---|
| `errPdcv` | curve result violates a Vault check (conservation, band, cross-check, fee bounds, LP mint bound) |
| `errPdty` | curve not approved, wrong lpMode, or not allowed with this config |
| `errPdvr` | the app's current version ≠ the approved version at createPool |
| `errPdex` | external slot config invalid or unsupported for this pool |
| `errPdec` | external cap exceeded |
| `errPdva` | valuator returned 0 (unavailable) where a mark is required |
| `errPdlb` | operation not allowed in the pool's launch state (bonding / not initialized) |
| `errPdgr` | graduation not allowed (threshold not reached, or not a bonding pool) |
| `errPdlm` | wrong entrypoint for the pool's lpMode |

Every custody guard failure, whether the k check, L2, both sides negative, or curve Settle rejection
propagated by the Vault, uses the existing **`errPdki`**. Repeated pools in a route use **`errPdrt`**.

### 3.4 `hook-interface.ts`

```ts
export class PluginDexHook extends Contract {
  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    return { flags: 0, feeBps: 0, hookFee: 0, hookFeeOutBps: 0 }
  }
}
export function passResult(): HookResult                       // 4 zero fields
export function requireDexCaller(dex: Application): void       // unchanged
export function dexRekeyAddress(dex: Application): Account     // unchanged
export function rekeyBackToDex(dex: Application, escrow: Account): void  // unchanged
```

These are the hook-author obligations. They go in the doc comment, and the approval checklist
enforces them:
- `Quote` must not write state and must not revert on valid input.
- A custody hook's last escrow inner txn must rekey the escrow to `dex.address`, and every
  escrow-sent inner txn must use `fee: 0`. A non-zero fee is booked as a loss. The only exception is the
  2-ALGO incentive keyreg fee, which the hook pre-donates.
- A custody hook at BeforeSwap breaks quote == swap by design. Pricing hooks must subscribe to `Quote`.
- With `HookFlagLazyCustody`, the first call has `ctx.custody = false`. Return
  `HookResultRequestCustody` to be called again at the same point with custody.

### 3.5 `curve-interface.ts` (pool-type apps)

```ts
export type CurveRequest = {
  op: uint64
  poolId: uint64
  owner: Account          // DEX-attested Txn.sender (position owner); Init: pool creator
  positionId: uint64      // Add (0 = new position) / Remove
  inIsA: boolean          // Swap/Quote direction
  negA: boolean           // Settle: true = side A left the pool
  negB: boolean
  amountIn: uint64        // Swap/Quote: input net of hook fees (exact-in, full fill)
  amountA: uint64         // Add: deposited; Settle: |delta A|
  amountB: uint64
  lpAmount: uint64        // Remove (fungible curves): LP burned
  lpSupply: uint64
  feeBps: uint64          // Swap/Quote: running fee after hooks; Settle: pool.custodyFeeBps
  protocolFeeBps: uint64
  reserveA: uint64        // Vault-booked aggregate before the op
  reserveB: uint64
  args: bytes             // Init: PoolConfig.curveArgs; Add/Remove: curve-defined shape
}

export type CurveResult = {
  amountIn: uint64        // Swap/Quote: consumed (must equal req.amountIn)
  amountOut: uint64       // Swap/Quote: output (0 from Quote = no liquidity, never revert)
  amountA: uint64         // Add: used; Remove: owed to owner
  amountB: uint64
  lpFee: uint64           // Swap/Quote: total fee charged on the input (incl. curve-native variable fee)
  protocolFee: uint64     // portion of lpFee kept OUT of the curve's reserves
  shares: uint64          // Add: minted; Remove: burned (fungible curves: LP units)
  positionId: uint64      // Add: position written
  reserveA: uint64        // curve aggregate after the op: MUST equal the Vault's booking
  reserveB: uint64
  snapshot: CurveSnapshot // after the op
  flags: uint64           // CurveFlagClose
  mbrUsed: uint64         // funded ops: µALGO kept for boxes (rest already refunded to owner)
  hookData: bytes         // forwarded to hooks as ctx.curveData
}

export class PluginDexCurve extends Contract {
  /** Swap, Quote, Remove, Settle. Mutating ops require Global.callerApplicationId == vault. */
  akitaDexCurve(req: CurveRequest): CurveResult { … }
  /** Init, Add: grouped with an MBR payment from the Vault (amount may be 0). The curve measures its
   *  minBalance delta, refunds the excess to req.owner with an inner payment, reports mbrUsed. */
  akitaDexCurveFunded(mbr: gtxn.PaymentTxn, req: CurveRequest): CurveResult { … }
}
export function requireVault(vault: Application): void   // Global.callerApplicationId === vault.id
```

Curve obligations, which the approval checklist and tests enforce:
- `Quote` writes nothing and returns exactly what `Swap` would.
- Rounding always favours the pool.
- Never call the Vault.
- `Remove` depends on no other app, because it is the emergency path for curve-managed pools.
- `Settle` accepts a delta only if it is a feasible trade at `req.feeBps` against the curve, books the
  surplus into the curve, and rejects a donation it cannot place.
- Freed MBR is refunded to `owner`.

### 3.6 `valuator-interface.ts`

```ts
export class PluginDexValuator extends Contract {
  /** underlying base units per 1 receipt base unit × RateScale; 0 = unavailable. Deterministic, read-only. */
  @abimethod({ readonly: true })
  akitaDexRate(receipt: uint64, underlying: uint64): uint64 { return 0 }
}
```

Approval checklist: the valuator must read a manipulation-resistant source, meaning a monotone exchange
rate such as a lending index or LST rate. It must not read an AMM spot price. Its code must be
immutable.

### 3.7 `venues/venue-adapter.ts` (router.md §4.3, names chosen)

```ts
export class VenueAdapter extends Contract {
  /** PRE: account.authAddress == this app; returnTo == Global.callerApplicationAddress.
   *  POST: last inner txn rekeys `account` to `returnTo`; only ≤ amountIn of assetIn leaves `account`;
   *  every inner txn fee 0; output ≥ minAmountOut else revert. Returns measured output (informational). */
  akitaVenueSwap(account: Account, assetIn: uint64, amountIn: uint64, assetOut: uint64,
                 minAmountOut: uint64, venueData: bytes, returnTo: Account): uint64 { return 0 }
  /** Deterministic exact-in quote from venue state; 0 = unavailable (never reverts). */
  @abimethod({ readonly: true })
  akitaVenueQuote(assetIn: uint64, assetOut: uint64, amountIn: uint64, venueData: bytes): uint64 { return 0 }
}
export function requireVenueCustody(account: Account, returnTo: Account): void
```

### 3.8 Router types (`arc58/plugins/akita-router/types.ts`), as router.md §4.2

`Segment {venue, assetOut, pools: uint64[], escrow: Account, data: bytes}`,
`Leg {amountIn, minAmountOut, segments: Segment[]}`,
`AdapterInfo {version, flags, innerTxns, opBudget}`, `RouteEvent`, `LegEvent`.
Constants: `MaxLegs 4`, `MaxSegments 3`, `MaxCandidates 4`, `MaxChunks 4`, `AdapterEnabled 1`,
`AdapterDirectCustody 2` (reserved, unused in v1), `AdapterExactQuote 4`.

---

## 4. Core: PluginDex Vault v2 (feature 1, WP1)

### 4.1 State and ABI

Global state: `version`, `admin`, `pool_cursor`, `protocol_fee_bps`, `treasury`. These are unchanged.

Boxes:

| Prefix | Map |
|---|---|
| `p` | `poolId → PoolInfo` |
| `h` | `poolId → HookConfig[]` |
| `e` | `poolId → ExternalSlot[]` |
| `x` | `PairKey → uint64[]` |
| `a` | `hook → HookApproval` |
| `t` | `curve → CurveApproval` |
| `v` | `valuator → uint64` (approved version) |

```ts
@contract({ avmVersion: 13 })
export class PluginDex extends Contract {
  // lifecycle
  @abimethod({ onCreate: 'require' }) create(version: string, admin: Account): void
  opUp(): void

  // admin (DAO wallet)
  setAdmin(admin: Account): void
  setProtocolFee(protocolFeeBps: uint64, treasury: Account): void
  setHookApproval(hook: uint64, perms: uint64): void            // stores {perms, version: Application(hook).version}; 0 revokes
  setCurveApproval(curve: uint64, lpMode: uint64, approved: boolean): void   // stores {version, lpMode}
  setValuatorApproval(valuator: uint64, approved: boolean): void             // stores current version
  setPoolPaused(poolId: uint64, paused: boolean): void
  writeDownExternal(poolId: uint64, slot: uint64): void        // paused pools only; rate := min(booked, valuator)

  // pools
  createPool(payment: gtxn.PaymentTxn, assetA: uint64, assetB: uint64, config: PoolConfig,
             hooks: HookInstall[], externals: ExternalSlotConfig[]): uint64
  initializeLaunch(tokenDeposit: gtxn.Transaction, reserveDeposit: gtxn.Transaction, poolId: uint64): uint64
  graduate(poolId: uint64): void                                // permissionless

  // liquidity (fungible: native + fungible curves)
  addLiquidity(depositA: gtxn.Transaction, depositB: gtxn.Transaction, poolId: uint64, minLpOut: uint64, data: bytes): uint64
  removeLiquidity(lpTransfer: gtxn.AssetTransferTxn, poolId: uint64, minAmountA: uint64, minAmountB: uint64, data: bytes): RemoveResult
  emergencyRemoveLiquidity(lpTransfer: gtxn.AssetTransferTxn, poolId: uint64, minAmountA: uint64, minAmountB: uint64): RemoveResult
  // liquidity (curve-managed positions)
  addLiquidityCurve(mbr: gtxn.PaymentTxn, depositA: gtxn.Transaction, depositB: gtxn.Transaction, poolId: uint64,
                    positionId: uint64, minShares: uint64, curveArgs: bytes, data: bytes): CurveLiquidityResult
  removeLiquidityCurve(poolId: uint64, positionId: uint64, minAmountA: uint64, minAmountB: uint64,
                       curveArgs: bytes, data: bytes): RemoveResult          // paused ⇒ skips hooks

  // trading
  swap(input: gtxn.Transaction, poolId: uint64, minAmountOut: uint64, recipient: Account, data: bytes): uint64
  swapRoute(input: gtxn.Transaction, route: uint64[], minAmountOut: uint64, recipient: Account, data: bytes): uint64

  // maintenance (permissionless)
  poke(poolId: uint64, hookIndex: uint64, data: bytes): void
  sync(poolId: uint64): void
  revalue(poolId: uint64): void
  collectProtocolFees(poolId: uint64): void

  // read-only
  @abimethod({ readonly: true }) quote(poolId: uint64, assetIn: uint64, amountIn: uint64, swapper: Account, data: bytes): uint64
  @abimethod({ readonly: true }) quoteRoute(route: uint64[], assetIn: uint64, amountIn: uint64, swapper: Account, data: bytes): uint64
  @abimethod({ readonly: true }) tryQuoteRoute(route: uint64[], assetIn: uint64, amountIn: uint64, swapper: Account, data: bytes): uint64
  @abimethod({ readonly: true }) getPool(poolId: uint64): PoolInfo
  @abimethod({ readonly: true }) getPoolHooks(poolId: uint64): HookConfig[]
  @abimethod({ readonly: true }) getExternalSlots(poolId: uint64): ExternalSlot[]
  @abimethod({ readonly: true }) getPairPools(assetA: uint64, assetB: uint64): uint64[]
  @abimethod({ readonly: true }) getHookApproval(hook: uint64): HookApproval
}
```

There is no UpdateApplication or DeleteApplication path, so the existing catalog entry stays valid.

### 4.2 `createPool`

1. Check that `payment.receiver == Vault` and `assetA < assetB`.
2. Fee bounds:
   - `feeBps ≤ min(maxFeeBps, MaxFeeBps)`
   - `maxFeeBps ≤ MaxPoolFeeCapBps`
   - `custodyFeeBps ≤ maxFeeBps`
   - `maxHookFeeBps ≤ MaxHookFeeBps`
3. **Curve:**
   - `config.curve == 0` means native. If `virtualA | virtualB ≠ 0`, it is a launch pool. That requires
     `graduationThreshold > 0` and `externals = []`. The bonding flag is derived from the offsets being
     non-zero.
   - Otherwise the pool is a curve pool. Require `approvedCurves(curve)` (errPdty) and
     `Application(curve).version == approval.version` (errPdvr). Pin the version. Virtual offsets must
     be 0 (errPdty) and `externals = []` (errPdex). `lpMode = approval.lpMode`.
4. **Hooks** (keep v1 `validateHooks`, plus):
   - Each install needs an approval (errPdha), with `perms ⊆ approval.perms` (errPdha) and a current
     version equal to the approved version (errPdvr). The version is pinned into the `HookConfig`.
   - `flags ⊆ HookFlagsAll`. `HookFlagLazyCustody` requires Custody.
   - At most one `HookPermHookFeeOut` install (errPdhc).
   - `HookPermExternal` requires Custody (errPdhc).
   - Any hook may subscribe to Poke. Fee fields returned at Poke are ignored.
   - Pricing permissions (DynamicFee, HookFee, HookFeeOut) together with BeforeSwap require Quote
     (errPdhc), as in v1.
   - No duplicates (errPdhc).
5. **Externals** (native, non-launch pools only; at most `MaxExternalSlots`):
   - `side ∈ {0,1}`.
   - `receipt ∉ {0, assetA, assetB}`, with no duplicate receipts.
   - `capBps ≤ MaxExternalCapBps`.
   - The valuator is approved and its current version equals the approved version.
   - The `hook` is installed with Custody|External.
   - Initial `rate = valuator.akitaDexRate(receipt, underlying)`, which must be > 0 (errPdva).
     `units = bookValue = 0`, `lastMark = now`.
6. **Escrow:** as in v1. Create the child `Escrow`, fund it with
   `minBalance + optIns·assetOptInMinBalance`, where `optIns` includes the receipts. Rekey it to the
   Vault. Opt it into A, B and the receipts.
7. **LP:**
   - In `LpModeFungible`, create the LP ASA as in v1.
   - Curve pools call `akitaDexCurveFunded(pay(curveMbr), {op: Init, owner: Txn.sender, args: curveArgs, …})`
     pinned. The result must have reserves `(0,0)` (errPdcv). Store `priceX64` and `activeId`.
8. Write the `p`, `h`, `e` boxes and the pair index, exactly as in v1.
9. **F6:**
   - For each install with `funding > 0`, pay `funding` to the hook app.
   - Run `AfterInitialize` per hook, with `ctx.data = install.initData` for that hook only.
   - Custody at AfterInitialize is allowed. Its delta is booked on an empty pool, so only additions are
     allowed (v1 rule).
10. `required = Vault MBR delta + escrowFunding + Σfunding + curveMbr`. Assert `payment.amount ≥ required`
    and refund the excess, as in v1.

### 4.3 Swaps and quotes

`swapCore(poolId, assetIn, amountIn, recipient, data)` (writes) and `quoteCore(…, swapper, data)`
(read-only) share one body with a `commit` flag:

```
pool = load; assert !paused (errPdpp)
if bonding(pool) and pool.lpSupply == 0: errPdlb                    // launch not initialized
if pool.closed: errPdpp                                             // curve returned CurveFlagClose earlier
inIsA = …; assetOut = …
ctx = context(…); ctx.before = ctx.after = snapshot(pool)
pre = runHooks(commit ? BeforeSwap : Quote)       // fee ≤ pool.maxFeeBps (errPdfe); hookFees paid at BeforeSwap;
                                                  // hookFeeOutBps from the single HookFeeOut hook;
                                                  // mulDivUp(hookFees,1e4,amountIn) + hookFeeOutBps ≤ maxHookFeeBps (errPdhf)
net = amountIn − pre.hookFees
NATIVE:
  eIn = rIn + vIn; eOut = rOut + vOut
  lpFee = mulDiv(net, fee, 1e4); protocolFee = mulDiv(lpFee, protocolFeeBps, 1e4)
  out = mulDiv(net − lpFee, eOut, eIn + net − lpFee)
  assert 0 < out < rOut − externalOut (errPdil)                     // real liquid bound (F1)
  rIn += net − protocolFee; rOut −= out
CURVE:
  r = akitaDexCurve({op: commit ? Swap : Quote, inIsA, amountIn: net, feeBps: fee, …}) rejectVersion pinned+1
  checkSwapResult(pool, r)                                           // §4.5
  book reserves exactly as for native; pool.priceX64/activeId = r.snapshot; ctx.curveData = r.hookData
  if r.flags & CurveFlagClose: pool.closed = true
protocolFeesIn += protocolFee
outFee = mulDiv(out, pre.hookFeeOutBps, 1e4)
if commit:
  ctx.amountOut = out; ctx.after = snapshot(pool)
  runHooks(AfterSwap)                                                // backrun custody runs here
  persist; emit SwapEvent; pay outFee in assetOut to the HookFeeOut hook
return out − outFee
```

- `swap`, `swapRoute` and `quote` keep their v1 flow. The payout is `out − outFee`, and quote returns
  the same value.
- **Routes:**
  - Every route method rejects a route that repeats a pool id (errPdrt). This fixes the
    quoteRoute/swapRoute divergence (lvr §6.1).
  - `ensureBudget(HopBudget, GroupCredit)` stays for hops after the first.
- **`tryQuoteRoute`:**
  - Returns 0 instead of reverting when a pool is missing, paused, bonding-uninitialized or closed;
    when the asset is not in the pool; when native `out` is 0 or ≥ liquid; or when a curve returns
    `amountOut = 0`. It still reverts on curve or Quote-hook misbehaviour, which is a contract bug.
  - `quote` and `quoteRoute` keep reverting semantics (v1 parity). `quote` is equivalent to
    `quoteRoute([poolId])`.
- **`ctx.caller`** is `Txn.sender` on writes. On quotes it is `swapper`, or `Txn.sender` when `swapper`
  is the zero address.

### 4.4 Liquidity

**Native fungible pools** (`addLiquidity`, `removeLiquidity`):
- Revert with errPdlb while bonding (F3).
- On entry, call `syncCore(pool, pendingDeposits)` and then `revalueCore(pool)` (§4.7). This books any
  surplus and external marks **before** mint or burn, so JIT liquidity cannot capture it.
- Mint and refund math is v1, byte-for-byte in behaviour, on booked reserves (which include external
  value).
- **Remove:**
  - `liquidX = mulDiv(lp, reserveX − externalX, S)`.
  - Plus, for each slot with `units > 0`: `unitsOut = mulDiv(lp, units, S)` is paid **in kind**, and
    `valueOut = mulDiv(lp, bookValue, S)`. Reduce `units`, `bookValue` and `reserveSide` by those
    amounts.
  - `RemoveResult` reports the liquid amounts only. In-kind receipts go in an event. The LP must be
    opted into any receipt with `units > 0`; the SDK handles this.
  - With no slots this is exactly v1.
- **`emergencyRemoveLiquidity`:**
  - Paused pools only. Same math as remove, but **no hooks, no sync, no revalue, no valuator or curve
    call**.
  - This is the guaranteed exit for fungible native pools.
  - A fungible *curve* pool's emergency exit uses the Vault-side pro-rata of booked reserves. The Vault
    does not call the curve. The curve's own state is left stale, which is acceptable for a paused,
    exiting pool. The curve must tolerate this, and its approval checklist says so.

**Fungible curve pools** use the same entrypoints. They call `akitaDexCurveFunded(Add)` and
`akitaDexCurve(Remove)` and are checked by §4.5. No v2 curve uses this mode yet; it is reserved for a
future stable-swap curve.

**Curve-managed pools** (`addLiquidityCurve`, `removeLiquidityCurve`):
- Reject a pool that is not in LpModeCurve (errPdlm).
- `owner = Txn.sender`. Positions live in the curve.
- `mbr.amount` is forwarded to the funded Add.
- Unused deposits are refunded from the escrow.
- When the pool is paused, `removeLiquidityCurve` skips hooks. It still calls the curve's `Remove`, the
  documented residual liveness dependency (§8).

**Launch** (native, F2):
- `initializeLaunch(tokenDeposit, reserveDeposit, poolId)`:
  - Requires the creator, a bonding pool and `lpSupply == 0`.
  - The token deposit goes to the token-side reserve. The reserve deposit goes to `lockedToken`; this is
    the graduation reserve M, held outside reserves.
  - `L0 = sqrt(eA·eB)` with effective reserves. `lpSupply = lockedLp = L0`. **No LP is transferred.**
  - Runs AfterAddLiquidity hooks with `lpAmount = L0`. Anti-snipe uses this in FirstLiquidity mode.
- **`graduate(poolId)`** is permissionless, unpaused and bonding-only (errPdgr).
  - Let `q` be the quote side and `t` the token side. Require `r_q ≥ graduationThreshold` (errPdgr).
  - `d = ceil((r_q·v_t − r_t·v_q) / (r_q + v_q))`, computed with `mulw`/`divmodw`. If the numerator is
    ≤ 0, `d = 0`.
  - If `d ≤ M`: `r_t += d` and `locked_t = M − d` (retained forever, never synced).
  - Otherwise: `r_t' = r_t + M`, `locked_t = 0`, and
    `surplus_q = r_q − ceil(r_t'·e_q / e_t)` goes to the treasury, where `e_q` and `e_t` are the
    effective reserves before the offsets are zeroed. The quote reserve becomes `r_q − surplus_q`.
  - Zero the offsets and emit GraduationEvent.
  - **Invariant test:** the price before equals the price after, within 1e-9 relative.
  - From then on the pool is a plain CP pool (F4).

### 4.5 Vault checks on every curve result (closes the "pool type can steal" gap)

Every check fails with errPdcv. `liquidOut` is the escrow's real liquid amount for the side.

| Op | Checks |
|---|---|
| Swap/Quote | `amountIn == req.amountIn`.<br>`0 < amountOut < reserveOut` (Quote may return 0, which yields `quote` errPdil / `tryQuote` 0).<br>`lpFee ≤ mulDivUp(req.amountIn, pool.maxFeeBps, 1e4)`. This allows the bins native variable fee.<br>`mulDiv(lpFee, pfBps, 1e4) ≤ protocolFee ≤ lpFee`. Per-bin protocol rounding may only favour the treasury.<br>**Aggregate cross-check:** `r.reserveIn == reserveIn + amountIn − protocolFee` and `r.reserveOut == reserveOut − amountOut`.<br>**Price band** with P0 = `pool.priceX64` (cached) and P1 = `r.snapshot.priceX64`: if inIsA, `out·2^64 ≤ (in − lpFee)·P0 + 2^64` and `P1 ≤ P0`; otherwise `out·P0 ≤ (in − lpFee)·2^64 + P0` and `P1 ≥ P0`. The `+1 unit` tolerance absorbs Q128→Q64 flooring (§5.4). |
| Add | `amountA ≤ depA`, `amountB ≤ depB`.<br>`r.reserves == reserves + used`.<br>`P1 == P0`.<br>Fungible curves: `shares ≤ min(mulDiv(usedA,S,rA), mulDiv(usedB,S,rB))`, or on the first deposit `shares ≤ sqrt(usedA·usedB) − MinimumLiquidity` (the LP mint bound).<br>`mbrUsed ≤ mbr`. |
| Remove | `amountX ≤ reserveX` (curve pools have no externals).<br>`r.reserves == reserves − out`.<br>`P1 == P0`.<br>Fungible: `shares == lpAmount` and `amountX ≤ mulDiv(lpAmount, reserveX, S)`. |
| Settle | `r.reserves ==` the Vault-computed post-delta booking.<br>Direction band: if the pool gained A and lost B, `P1 ≤ P0`; if it gained B, `P1 ≥ P0`; for a donation, no constraint. |
| Init | `r.reserves == (0,0)`. |

A curve can still misprice within the band. Bounding that is the job of the band, the user's
`minAmountOut`, `maxFeeBps`, and the requirement that the curve be immutable, audited and pinned.

### 4.6 Generalized custody guard

```
runHooks(point) for hook i with Custody (point ≠ Quote):
  if hook.flags & LazyCustody:
     res = callHook(ctx{custody:false}) ; if !(res.flags & RequestCustody): handle res as non-custody; continue
  snap = { liqA, liqB, units[s] for EVERY slot s }               // liq = holding(escrow,X) (ALGO: balance − minBalance)
  pay escrow→escrow 0 rekeyTo hook
  res = callHook(ctx{custody:true}) rejectVersion = hook.version+1
  assert escrow.authAddress == Vault (errPdrb)
  now = { liqA', liqB', units'[s] }
  dA = signed(liqA' − liqA); dB = signed(liqB' − liqB)            // SignedDelta {mag, neg}; never raw uint64 subtraction
  for each slot s with units'[s] ≠ units[s]:
     assert s.hook == hook.app && hook.perms & External (errPdhm)
     rate = markRate(s)                                           // §4.7 (valuator call, clipped)
     newValue = mulDiv(units'[s], rate, RateScale)
     d[s.side] += signed(newValue − s.bookValue)
     s.units = units'[s]; s.rate = rate; s.lastMark = now; s.bookValue = newValue
     if units'[s] > units[s]: assert s.bookValue ≤ mulDiv(capBps, reserveSide', 1e4) (errPdec)
  classify (dA, dB):
     both zero      → nothing
     both ≥ 0       → donation: NATIVE reserves += d ; CURVE Settle(donation)
     both ≤ 0 (≠0)  → errPdki
     mixed          → gain side g (amount G), loss side l (amount L):
        NATIVE: e = effective reserves (booked + virtual) before the call
                assert (e_g + G − mulDivUp(G, custodyFeeBps, 1e4)) · (e_l − L) ≥ e_g · e_l   (BigUint) else errPdki
                reserves_g += G; reserves_l −= L (assert no underflow: errPdki)
        CURVE:  L2: V(r') ≥ V(r) with V(x,y) = x·P0 + y·2^64 (P0 = pool.priceX64)  else errPdki
                r = Settle{negA,negB,|dA|,|dB|, feeBps: custodyFeeBps}  (curve reverts ⇒ whole call reverts)
                checkSettle (§4.5); pool.priceX64/activeId = r.snapshot
  recompute externalA/B = Σ slot.bookValue per side
  emit CustodyEvent
  then apply res (fee perms exactly as v1: SetFee/hookFee only at pricing points; errPdhm otherwise)
```

- **Native CP with `custodyFeeBps = 0`** is exactly the v1 k-guard. With the default (`= feeBps`), the
  hook must do at least as well as a trader paying the pool fee. The fee stays in reserves.
- **What it protects:** reserves, protocol fees, locked launch funds, in-flight swap input and output,
  and receipts. Any of them leaving shows up as a negative delta. MBR increases from junk opt-ins and
  keyreg fees paid by the escrow are ALGO losses.
- **Consensus staking:**
  - A Poke custody hook keyregs the escrow, with
    `itxn.keyRegistration({ sender: escrow, fee: 2_000_000, … })` for incentive eligibility.
  - The 2 ALGO fee is debited from the escrow, so the hook **pre-donates 2 ALGO in the same custody
    call**. The net delta is 0.
  - Rewards arrive as surplus and are booked by `sync`. No slot is needed.

### 4.7 External positions: marking, sync, revalue, write-down

`markRate(s)` (shared by custody, `revalue`, and the inline revalue at add/remove):

```
v = valuator.akitaDexRate(s.receipt, underlying) rejectVersion = s.valuatorVersion+1 ; assert v > 0 (errPdva)
dt = now − s.lastMark
up   = mulDiv(s.rate, s.maxMarkupBpsPerDay  · dt, 1e4 · SecondsPerDay)     // mulw-safe: compute in two steps
down = mulDiv(s.rate, s.maxMarkdownBpsPerDay · dt, 1e4 · SecondsPerDay)
return clamp(v, s.rate − min(down, s.rate), s.rate + up)                   // dt == 0 ⇒ rate frozen within a block
```

- **Deposits and recalls are value-neutral.** Within one timestamp the booked rate is frozen, so
  `Δliquid = −x` and `ΔbookValue = +units·rate`, which is about `+x`. The only difference is
  floor-rounding dust, and **the External hook donates ≤ 1 unit of dust** from its float. There is no
  haircut and no growth limit on the total, which is the Vault design's contradiction removed.
- **`revalue(poolId)`** is permissionless. For each slot it books `newValue − bookValue`: a gain is a
  donation and a loss is a reserve decrease. Both are bounded by the per-day clips, so a
  same-block-manipulated valuator moves the book by 0. That closes the
  write-down-then-mint-cheap attack.
- **`writeDownExternal(poolId, slot)`** is admin-only and requires a paused pool. It sets
  `rate = min(booked, valuator)` with no clip, to recognize a real venue loss. It can never write above
  the valuator or above the book. Pause also blocks deposits while the write-down is pending.
- **`sync(poolId)`** is permissionless and requires `lpSupply > 0`.
  - `surplus_X = holding(escrow,X) − (reserveX − externalX) − protocolFeesX − lockedX − pendingDepositX`.
  - Positive surplus is booked as a donation: native pools add it to reserves, and curve pools go
    through Settle(donation).
  - Negative surplus cannot happen outside custody; assert this.
  - A custody `BeforeSwap` hook that needs synced state calls nothing: the Vault's add and remove paths
    already sync inline.
- **Illiquid reserves:** a swap or remove that would pay more than `reserve − external` liquid reverts
  (errPdil). The External hook may subscribe to custody `BeforeSwap` or `BeforeRemove` and unwind just
  in time.

### 4.8 `poke(poolId, hookIndex, data)`

- Runs hook `hookIndex` at `HookPointPoke`; the hook must subscribe to Poke (errPdhc).
- Requires an unpaused pool (errPdpp).
- Custody and lazy custody work as at any other point, and the full guard applies. The result's fee
  fields are ignored.
- Uses: keyreg, lending rebalance, keeper-driven backrun without a dust swap, oracle updates.
- Access control is the hook's decision (`ctx.caller`).

### 4.9 Size, creation, budget and depth

- **Size:** the comparable measured build is the hooks-as-curves hybrid at 8,083 B with `loggedAssert`
  (native CP plus curve slot, ledger, sync, curve liquidity, band). The v2 additions are estimated at
  about 3.3 to 3.6 KB: L2, in-kind receipts, rate marking, pinning, poke, lazy custody, F6, F8, launch,
  `tryQuoteRoute`, write-down, approvals and snapshots. That projects to **about 11.4 to 11.7 KB**.
- **Gate:** `size.spec.ts` asserts Vault approval ≤ 13,000 B and every other app ≤ 14,000 B, reading
  `byteCode.approval` from the arc56 JSON.
- **Valves** if exceeded:
  1. Drop `getExternalSlots`, `getPoolHooks` and `getHookApproval` (clients read boxes): −200 B.
  2. Move `createPool`, approvals and the pair index into an immutable `PluginDexFactory` with
     set-once back-pointers: about −830 B, measured in the monolith prototype.
- **Creation:** `extraProgramPages: 7`, `ceil((len−8192)/2048)` empty box refs, and a static fee of at
  least `1000·(1 + ceil((len−8192)/10000))`. See §1.
- **Inner transactions** (group pool is 256):

| Operation | v1 | v2 |
|---|---|---|
| Native swap, no hooks | 1 | 1 |
| + DynamicFee hook | +1 | +1 |
| + HookFee hook | +2 | +2 |
| + HookFeeOut hook | n/a | +2 (call, payout) |
| + custody hook (eager) | +3 or more | +3 or more, plus 1 valuator call per changed slot |
| + lazy custody hook that skips | n/a | +1 |
| Curve swap | n/a | +1 (curve call, which adds 700 budget) plus the curve's op-ups |
| 4-hop native route | 3 hops + 1 payout + op-ups | same |

- **Depth:**
  - Direct: user → Vault (0) → hook or curve (1) → venue or op-up (2) → payout (3).
  - Via the router: router (0) → Vault (1) → hook (2) → Tinyman appl (3) → payout (4).
  - Maximum 5 of 8. Hooks and curves can never call the Vault (no reentry).

### 4.10 Hook context fill rules

- `reserveIn` and `reserveOut` are effective reserves (booked + virtual).
- `before` is the snapshot at op start. `after` is the snapshot after the curve math (After* points).
  Native `priceX64 = eB·2^64/eA`, computed with `divmodw`, once per point.
- `amountIn` and `amountOut` follow v1 per point. At liquidity points, `amountIn = usedA` and
  `amountOut = usedB`.
- `positionId` is set at curve liquidity points.
- `curveData` is the last curve result's `hookData` in this op.

### 4.11 Mapping the 23 existing tests

All 23 keep their assertions. Edits are confined to the fixture and helpers in
`plugin-dex.e2e.spec.ts`, plus one call site.

| Change | Where |
|---|---|
| Vault create: `extraProgramPages: 7`, empty box refs, static fee | `beforeAll` |
| `createPool(assetA, assetB, feeBps, hooks, maxHookFeeBps)` helper builds `config = {curve:0, feeBps, maxFeeBps:1000, custodyFeeBps:feeBps, maxHookFeeBps, virtualA:0, virtualB:0, graduationThreshold:0, quoteIsA:false, curveMbr:0, curveArgs:''}`, maps `Hook = [app, points, perms]` to `HookInstall {…, flags:0, funding:0, initData:''}`, and passes `externals: []` | `createPool` helper |
| `quote` helper passes `swapper: ZERO, data: NO_DATA` | `quote` helper |
| `quoteRoute` call gets `swapper, data` | test "swapRoute hops escrow to escrow…" (the only body edit) |
| `setHookApproval(hook, perms)` | unchanged signature |

Why each group still passes:
- **Constant-product core (8):** native math is v1. With no slots the identity
  `escrow = reserves + protocolFees` holds, and createPool cost stays < 1 ALGO. The explicit refs
  used by `swapRoute` (escrow apps, assets, `p:` boxes) must remain sufficient. **Acceptance
  criterion:** a hookless native swap reads only `p:` (plus `h:` iff `hookPoints ≠ 0`, `e:` iff
  `externalSlots ≠ 0`).
- **Pricing hooks (3):** ImpactFee and SwapTax are recompiled. Fees are ≤ `maxFeeBps` (1000), and the
  numbers are unchanged.
- **Custody (8):**
  - steal → both ≤ 0 → errPdki.
  - keepRekey and rekeyElsewhere → errPdrb.
  - donate → donation booking. Same numbers.
  - trade at `2×fairAlgo` passes the fee-adjusted k check with fee 30. `fairAlgo/2` gives errPdki.
  - setFee from a custody-only hook → errPdhm.
  - Paused pool: normal `removeLiquidity` still runs hooks (errPdki), and `emergencyRemoveLiquidity`
    skips them. v1 semantics are kept on purpose.
- **Installation (4):** errPdha, errPdha, errPdhc, errPdhc. The same validation order: approval
  exists → perms ⊆ approval → version → pricing needs Quote → duplicates.

### 4.12 New core tests (WP1 acceptance)

`core-v2.e2e.spec.ts`:
1. **Pinning:**
   - Install `MockUpdatableHook` at v0 and create a pool.
   - Update the hook → swap reverts (rejectVersion).
   - Pause → `emergencyRemoveLiquidity` succeeds.
   - createPool with a hook whose version ≠ approved → errPdvr.
   - Revoking an approval leaves existing pools working.
2. **F6:**
   - Each hook receives exactly `funding` and its own `initData` (RecordingDexHook stores the data hash
     and balance).
   - `required` includes Σfunding; an underpay gives errPdip.
   - A hook that rejects its initData reverts creation.
3. **custodyFeeBps:**
   - A MockDexHook `trade` exactly at the fee-free fair price reverts with fee 30 and passes on a pool
     created with `custodyFeeBps = 0`.
   - A trade at fair × (1 + fee) + 1 passes.
4. **Lazy custody:**
   - Pass mode issues 1 inner for the hook (count via simulate `txnGroups[0].txnResults` inner tree)
     and the escrow is never rekeyed.
   - RequestCustody plus steal → errPdki. RequestCustody plus donate → booked.
5. **Poke:**
   - A donation via poke is booked.
   - Poke on a hook not subscribed → errPdhc. Paused → errPdpp.
   - `ModeKeyreg` with pre-donation puts the escrow online (LocalNet `status: Online`).
   - The same without pre-donation → errPdki.
6. **sync:**
   - Direct ALGO and ASA transfers to the escrow, then `sync` books them.
   - `sync` with `lpSupply == 0` reverts.
   - A donation followed by `addLiquidity` mints LP against the post-donation reserves (JIT cannot
     capture).
7. **HookFeeOut:**
   - 100 bps out-fee: quote == swap, the hook receives `assetOut`.
   - in-fee + out-fee above `maxHookFeeBps` → errPdhf.
   - Two HookFeeOut installs → errPdhc.
8. **Per-pool fee cap:** `maxFeeBps 5000` accepts SetFee 4000; `maxFeeBps 1000` rejects it (errPdfe).
9. **Quote identity:** RecordingDexHook sees `ctx.caller == swapper` at Quote and `== Txn.sender` at
   swap, and `ctx.callerApp == 0` at top level.
10. **`tryQuoteRoute`:**
    - Returns 0 for a paused pool, a missing pool, a wrong asset, `out ≥ liquid`, and a curve
      Quote returning 0.
    - `quoteRoute` reverts in the same cases.
11. **Routes:** a repeated pool gives errPdrt in `swapRoute` and `quoteRoute`.
12. **Inner pool:**
    - A native swap on a pool with 3 eager custody MockDexHooks at Before and After (more than 16
      inners) passes **without** `opUp()` carriers.
    - It documents the 256 group pool.
13. **Curve slot** (MockCurve honest-CP mode, `LpModeFungible` and `LpModeCurve`):
    - quote == swap; add and remove parity with native numbers.
    - Evil modes, each expected to fail with errPdcv: wrong aggregate, fill better than the band, P1 on
      the wrong side, lpFee > maxFeeBps, protocolFee < floor, over-minted shares, price moved by Add,
      Init with non-zero reserves.
    - Permissive Settle plus a MockDexHook that takes 90% of B for 1 unit of A → **L2 gives errPdki**.
    - Unapproved curve → errPdty. Curve version bump → swap reverts. Fungible curve emergency exit
      works with the curve set to revert-all.
14. **Invariant helper**, called after every operation in every new spec:
    `holding(escrow,X) == reserveX − externalX + protocolFeesX + lockedX` (+ unsynced donations).

`external.e2e.spec.ts`:
- MockLender: deposit underlying and receive a receipt minted to the sender at `rate`.
- MockValuator: returns the lender rate and can be set to 0 or to revert.

Cases:
1. A deposit through the External hook is neutral: reserves unchanged, `externalA == value`.
2. A recall reduces units, increases liquid and is neutral. This is the underflow regression.
3. A non-External custody hook moves a receipt → errPdhm. The External hook of slot 0 moves slot 1's
   receipt → errPdhm.
4. A hook sends liquid A to an EOA with no receipt → errPdki.
5. Cap breach on deposit → errPdec. Appreciation above the cap is still bookable by revalue.
6. The lender rate +10% in one block → `revalue` books 0. After 1 day it books ≤ maxMarkup. The same
   holds for markdowns (maxMarkdown).
7. `writeDownExternal` reverts unless paused, and sets rate to `min(book, valuator)`.
8. A swap needing more than the liquid amount → errPdil.
9. `removeLiquidity` pays receipts in kind pro-rata, and `units`/`bookValue` fall pro-rata.
10. `emergencyRemoveLiquidity` works with the valuator in revert mode.
11. Externals on a curve pool or a launch pool → errPdex. Valuator rate 0 at creation → errPdva.

`launch.e2e.spec.ts` (core part, akita-hooks B9 1-4 and 7-9):
1. VCPMM: quote == swap on effective reserves. A buy is bounded by the real token reserve. Selling
   tokens never bought reverts on the real ALGO floor (errPdil).
2. `initializeLaunch`:
   - mints `sqrt(eA·eB)`; the creator's LP balance stays 0; `lockedLp` is recorded;
   - M is held in `lockedToken`, and the escrow identity holds.
3. `addLiquidity`, `removeLiquidity` and `emergencyRemoveLiquidity` during bonding → errPdlb. Swap
   before init → errPdlb.
4. Custody k on effective reserves: at-curve-plus-fee passes, worse fails.
5. Graduation:
   - below the threshold → errPdgr;
   - at the threshold, the price before equals the price after (1e-9);
   - the offsets are 0 and a second call gives errPdgr;
   - a wash-traded state takes the `d > M` branch and sends the surplus to the treasury.
6. After graduation: an outside LP adds and removes pro-rata, `lockedLp` is still counted, and swaps
   match plain CP `expectedOut`.

### 4.13 MockDexHook v2 modes (additions)

| Mode | Behaviour |
|---|---|
| `ModeKeyreg` | Optional pre-donation of 2 ALGO, then keyreg the escrow online with fee 2 ALGO and the rekey back |
| `ModeExternalDeposit(amount)` | Deposit escrow underlying into MockLender (receipt to the escrow) and donate 1 dust unit |
| `ModeExternalRecall(units)` | Redeem receipt units back to the escrow |
| `ModeMoveReceipt(slot)` | Send receipt units to the hook |
| `ModeRequestCustody` | Return RequestCustody on the lazy first call, then act per `value2` sub-mode |
| `ModeHookFeeOut(bps)` | Return `hookFeeOutBps` |
| `ModeSetFeeHigh(bps)` | Return SetFee above 1000 |

Existing modes 0 to 7 keep their numbers.

### 4.14 `ConsensusKeyregHook` (WP1-H, small; can slip after WP1)

- A Poke-only custody hook with lazy custody.
- Admin (the DAO wallet) sets the per-pool participation key material and the operator. The operator
  pokes to go online or offline.
- The hook pre-donates the 2 ALGO incentive fee from its tank.
- Tests: online and offline transitions; an operator check; a non-operator poke is a no-op that returns
  custody.

---

## 5. Work packages

Every WP finishes with `npm run build` and the full `npm test`, as AGENTS.md requires. Error codes use
the 7-byte `err` style. Hooks, curves and adapters use `loggedAssert`.

### WP0: Interface freeze and P0 spike (serial, first; about 2-3 days)

Deliverables:
- `types.ts`, `constants.ts`, `errors.ts`, `hook-interface.ts`, `curve-interface.ts`,
  `valuator-interface.ts`, `venues/venue-adapter.ts` and `math.ts` signatures, exactly as in §3.
- A **Vault skeleton** with every §4.1 method, the final signatures and representative bodies: native
  swap and k-guard, one curve call site, a valuator call, the custody block. It must compile at AVM 13.
- `tests/fixtures/plugin-dex.ts`: `deployVault` (create with pages, box refs and fee), `createPool`
  (with config defaults), `addLiquidity`, `holding`, `assertEscrowIdentity`.
- `size.spec.ts` (the gate).
- The `immutable-deployment.ts` change for >8 KB creates.

Spike checks, as LocalNet tests in `core-v2.e2e.spec.ts`, tagged `p0`:
- (a) Vault creation above 8,192 B with box refs and fee works on LocalNet.
- (b) A `rejectVersion` call to an updated app fails, and to an un-updated app passes.
- (c) An `abiCall` round-trips a struct with `bytes<16>` and nested structs (HookContext).
- (d) One app call issues more than 16 inners with no carriers.
- (e) Measure the skeleton size and extrapolate. If the projection exceeds 13,000 B, apply the valves
  (§4.9) **before** the freeze.

**Interface freeze:** after WP0 merges, any change to the files above needs sign-off from every WP
lead.

### WP-T: Tinyman v2 test fixture and venue library (parallel, starts with WP0)

- `tests/fixtures/external/tinyman-v2.ts`:
  - vendored `amm_approval.teal.tok` (7,731 B, sha256 asserted at load) and LICENSE;
  - create, fund, `deriveTinymanPool`, `bootstrapPool`, `addInitialLiquidity`, `setFee`, `swapDirect`,
    `readPoolState` (venues.md §2.2).
- `plugin-dex/venues/tinyman-v2.ts` (PuyaTs library):
  - `tmPoolAddress(app, a, b)`;
  - `tmReadPool(pool, app)`: reserves, fee share, lock, issued;
  - `tmQuoteFixedInput(...)`, which never reverts and returns 0 when unavailable;
  - `tmSwapAs(account, app, pool, assetIn, amountIn, assetOut, minOut, rekeyTo)`, which issues the
    two-txn inner group with ALGO and ASA branches, fee 0, the handback on the appl, and no asset 0 in
    `assets`.
- Tests:
  - the fixture bootstraps ALGO/ASA and ASA/ASA pools;
  - a direct swap equals the TS formula;
  - a `MockVenueProbe` (test app) using the library swaps as a rekeyed account and the output equals
    `tmQuoteFixedInput` (venues.md §2 verified flow).
- Consumers: WP3 (backrun), WP4 (adapter).

### WP1: Core Vault v2 (feature 1)

- **Depends on:** WP0.
- **Files:** `contract.algo.ts`, `math.ts`, the mocks in §2.2, `hooks/impact-fee.algo.ts`,
  `hooks/swap-tax.algo.ts`, `plugin-dex.e2e.spec.ts` (helpers only), and the new specs from §4.12.
- **Implement:** §4 in full.
- **Acceptance:**
  - the 23 existing tests pass with only the §4.11 edits;
  - every §4.12 test passes;
  - the size gate passes;
  - `ARCHITECTURE.md` is updated.
- **Milestones, so other WPs can integrate early:**
  - **M1:** native swap, liquidity, hooks v2, pinning, F6, F8, quotes/tryQuote, poke, sync. This
    unblocks WP3, WP4 and WP5a.
  - **M2:** the curve slot and §4.5 checks. Unblocks WP2 integration.
  - **M3:** launch (initializeLaunch, graduate). Unblocks WP5b integration.
  - **M4:** external slots and revalue/write-down.
  - **M5:** ConsensusKeyregHook.

### WP2: BinEngine curve app (feature 2)

- **Depends on:** WP0 interfaces. Develop against a test harness (`tests/mock-vault-caller.algo.ts`
  that calls `akitaDexCurve` the way the Vault does). Integration needs WP1-M2.
- **Algorithms:** bins.md §2–§4 and §7. All of it applies except these overrides:
  1. **Interface:** every operation goes through `akitaDexCurve` / `akitaDexCurveFunded`, mapped as
     follows:
     - Init → createPool state, the active chunk and the window. `args = binStep u64 ‖ activeId u64 ‖
       baseFactor u64 ‖ A, filterPeriod, decayPeriod, R, maxVa (5×u64) ‖ minBinShares u64 ‖
       maxBinsPerSwap u64`.
     - Swap/Quote → `swapExactIn(write)`.
     - Add → range add with `args = positionId-free dist encoding (bins.md §4.5)`, plus
       `activeIdDesired`, `idSlippage`.
     - Remove → `args = fromId, toId, fracPpb`, owner-checked.
     - Settle → bins.md §4.7, with fee = `req.feeBps` (`custodyFeeBps`), donations to the active bin
       (supply must be > 0).
  2. **Fee:** `req.feeBps` overrides the base fee (×1e5 to ppb). The native LB variable fee is added
     per bin. The per-bin total is capped at `min(MaxFee, pool.maxFeeBps×1e5)`. The engine stores
     `maxFeeBps` from Init args, and the Vault re-checks the aggregate.
  3. **Protocol fee** is per bin with `ceil` (§4.5 check).
  4. **Snapshot:**
     - `priceX64 = floor(P_Q128 / 2^64)`. The engine guarantees `P < 2^128` in Q128, which is a
       window restriction to p < 2^64.
     - `liquidity` = the active-bin value in Y base units.
     - `hookData = BinHookState {startId, endId, binsCrossed, va, binStep}`, ABI-encoded.
  5. **Positions** live in the engine (bins.md §3.3), with `owner = req.owner`.
     `transferPosition(positionId, to)` and `closePosition`/`closeChunk` are **direct** owner or
     permissionless calls on the engine. They never move pool funds.
  6. `@contract({ avmVersion: 13 })`. In `create(vault)`, call `op.AppParamsSet.appForeignBoxReads(true)`
     so routers, hooks and the SDK can read chunks with `op.AppBox`.
  7. `initBinStep(mbr, binStep)` is permissionless and idempotent. MBR is measured.
  8. External positions are not supported. The Vault already rejects them.
- **Files:** `curves/bins/{engine.algo.ts, math.ts, layout.ts, types.ts}`, `tests/models/bins-model.ts`,
  `curves/bins/bins.e2e.spec.ts`, and `tests/mock-vault-caller.algo.ts`.
- **Acceptance:**
  - bins.md §11, off-chain cases 1-5 and e2e cases 1-15, run **through the real Vault** once WP1-M2
    lands. The harness is used only before then.
  - **Plus:**
    - (16) 500-step randomized fuzz through the Vault: swaps, adds, removes and custody trades. No
      honest operation ever trips errPdcv (band, cross-check, fee bound). The escrow identity and
      `Σ bins == totals == Vault reserves` hold after every step.
    - (17) quote == swap within a round. `tryQuoteRoute` returns 0 when liquidity runs out.
    - (18) Paused pool: `removeLiquidityCurve` skips hooks and still pays pro-rata.
    - (19) A `swapRoute` CP → bins → CP matches `quoteRoute`.
    - (20) A 64-bin swap with chunk refs on `engine.opUp()` carriers; record `appBudgetConsumed` and
      fail above 450 per bin.
    - (21) Engine size ≤ 14,000 B.

### WP3: VolatilityFeeHook and BackrunArbHook (feature 3)

- **Depends on:** WP0 interfaces, WP-T. Integration needs WP1-M1.

**VolatilityFeeHook** (`hooks/volatility-fee.algo.ts`). lvr.md §2 applies with these changes:
- Points: `BeforeSwap | AfterSwap | Quote | Poke`. Perms: DynamicFee.
- The price comes from `ctx.before.priceX64` (Before/Quote) and `ctx.after.priceX64` (AfterSwap). The
  midpoint term uses effective reserves. For `ctx.curve ≠ 0` with an `activeId`, use
  `|activeId − refId|·binStep` from `curveData`.
- `max_fee` is checked at create to be `≤ 9_000`, and the hook clamps every fee it returns to
  `max_fee`. The Vault separately enforces `pool.maxFeeBps`, so a pool using this hook must be created
  with `maxFeeBps ≥ max_fee`; the SDK checks this before createPool.
- Presets are separate deployments (lvr §2.7). `initPool(mbr, poolId)` is permissionless. The state box
  is `v‖poolId`.
- **Acceptance:**
  - lvr §2.12 cases 1-8;
  - (9) the same results on a native CP pool and on a bins pool, via the `activeId` path;
  - (10) Poke from a keeper updates `last`.

**BackrunArbHook** (`hooks/backrun-arb.algo.ts`). lvr.md §3 applies with these changes:
- Perms: Custody. Points: `AfterSwap | Poke`. **Install flag `HookFlagLazyCustody`.**
  - The first call reads Tinyman via the WP-T library and decides.
  - It returns `RequestCustody` only when `surplus ≥ minSurplus + tip + rebate + guardFee`, where
    `guardFee = mulDivUp(in_received, ctx.custodyFeeBps, 1e4)` so the Vault guard is guaranteed to
    pass.
  - The skip path costs 1 inner, against 3 in lvr §3.9.
- Execution uses `tmSwapAs(escrow, …, rekeyTo: dex)` with the gas-tank carrier (lvr §3.5) and an
  optional keeper tip (lvr §3.6, default 1,000 bps). **Superseded by §10 A42:** no carrier, tank, tip or
  rebate; the caller's group pays every inner and the condition is `surplus ≥ minSurplus + guardFee`.
- Native pools only in v1 (`ctx.curve != 0` passes). It never reverts the user's swap (lvr §3.7 skip
  rules).
- `registerPool(poolId, …)` is admin-only and top-level, so it can call `Vault.getPool`. The kill switch
  applies.
- **Acceptance:**
  - lvr §3.12 cases 1-9 against the **real Tinyman v2 fixture**;
  - (10) inner count on the skip path = 1 hook call;
  - (11) with `custodyFeeBps = feeBps`, a gap smaller than about the fees skips and a gap above it
    executes; the LP gain equals the model to the µunit;
  - (12) stack `[Backrun, VolFee]` ordering per lvr §2.9;
  - (13) a swap through the router plugin (WP4) on a backrun pool stays within depth.

### WP4: Venue registry, Tinyman adapter, AkitaRouterPlugin (feature 4)

- **Depends on:** WP0 (`venue-adapter.ts`, Vault ABI), WP-T. Integration needs WP1-M1.
- **Contracts:**
  - `venues/registry.algo.ts`: `VenueRegistry`, router.md §4.4. Global-state adapter table, admin = DAO
    wallet, `readAdapter()` helper with version check.
  - `venues/tinyman-v2-adapter.algo.ts`: router.md §4.5, built on the WP-T library.
    `requireVenueCustody` is used and `returnTo == Global.callerApplicationAddress`.
  - `arc58/plugins/akita-router/*`: router.md §4–§5, **SANDBOX only**. DIRECT stays reserved:
    `FlagAllowDirect` reverts with `errRtDirect` in v1.
- **Overrides to router.md:**
  1. The inner pool is 256 per group. Carriers (`router.opUp()`, placed **after**
     `arc58_verifyAuthAddress`, rule R3) exist only for budget and refs. Fix the §8.2 inner-slot
     arithmetic and the SDK planner.
  2. Native candidates in `swapBest` are quoted with `PluginDex.tryQuoteRoute(pools, assetIn, amt,
     swapper = S, data)`, **sent as S**. A 0 skips the candidate. This replaces the SDK pre-filter.
  3. Native execution is `swapRoute` sent as S, with the deposit possibly sent from E.
  4. `abiCall` sets `rejectVersion: info.version + 1` on adapter calls.
  5. `@contract({ avmVersion: 13 })`.
- **Files:** as listed in §2.2, plus `tests/fixtures/plugins/akita-router.ts` and
  `tests/mock-venue-adapter.algo.ts` (router.md §11.1 evil modes plus `UpdateApplication`).
- **Acceptance:** router.md §11.2, all cases A1-A4, B1-B2, B4-B5, C1-C4, D1-D3, E1-E4, E6-E8, F1-F5
  and G1-G2, with these changes:
  - **D4** now *passes on-chain*: a paused native candidate is skipped through `tryQuoteRoute`.
  - **G2** asserts that route 6 needs **no** carriers for inner slots, only for budget/refs.
  - **B3 and E5/E9 (DIRECT)** are deferred to R4 and stay as `test.todo`.
  - **Plus:**
    - (H1) a native leg into a gated pool (WP5a mock schedule) quotes and swaps with the same fee;
    - (H2) a native leg through a bins pool (after WP2);
    - (H3) a router size ≤ 14,000 B.

### WP5a: GatedFeeHook (feature 5, part A)

- **Depends on:** WP0. Integration needs WP1-M1 (F6, swapper quotes).
- **Algorithm:** akita-hooks Part A in full: FeePass cache keyed by the spending account, FeeSchedule
  per pool from F6 `initData` at AfterInitialize, `openPass`/`refresh`/`refreshFromGate`/`closePass`,
  DAO-mutable `gateSlots`/`passTtl`/`defaultSchedule`. Points: `AfterInitialize | BeforeSwap | Quote`.
  Perms: DynamicFee. The hook can only lower the fee.
- **ACC-01:** `utils/functions.ts#getWalletIDUsingAkitaDAO` does **not** yet check the wallet creator.
  The hook must use `hooks/shared/origin.ts#genuineWalletOrZero(dao, spender)`, which inlines
  `op.AppParams.appCreator(wallet) == Application(getAkitaAppList(dao).wallet).address`. Do **not**
  edit `utils/functions.ts` in this WP; that fix is tracked separately.
- **Files:** `hooks/gated-fee.algo.ts`, `hooks/shared/origin.ts`, `tests/mock-social-impact.algo.ts`,
  `tests/mock-wallet.algo.ts`, `tests/mock-wallet-factory.algo.ts`, `hooks/gated-fee.e2e.spec.ts`.
- **Acceptance:**
  - akita-hooks A12 T-1 to T-12, with `quote(…, swapper)` used for T-2 and T-12;
  - (T-13) a schedule delivered through F6 is immutable afterwards;
  - (T-14) a malformed schedule reverts createPool;
  - (T-15) through the router plugin (after WP4), `ctx.caller == S` and the discount applies.

### WP5b: Launch hooks and LaunchManager (feature 5, part B)

- **Depends on:** WP0. Integration needs WP1-M3 (VCPMM, initializeLaunch, graduate, F5, F6, F8).
- **Contracts:**
  - `hooks/anti-snipe-fee.algo.ts` (akita-hooks B5.1):
    - multi-tenant, configured with F6 initData;
    - start modes Creation and FirstLiquidity (AfterAddLiquidity from `initializeLaunch`);
    - returns `max(ctx.feeBps, decay)`;
    - `startFeeBps ≤ 9_000`, `endFeeBps ≤ 1_000`, bounded decay;
    - the exempt caller is LaunchManager at `e == 0`.
  - `hooks/launch-tax.algo.ts` (B5.2):
    - HookFee for buys;
    - **HookFeeOut for sells, paid in the quote asset** (F8);
    - the token opt-in happens at AfterInitialize, paid by F6 funding;
    - per-pool accrual and owner `claim`;
    - `untilRound` sunset.
  - `launch/launch-manager.algo.ts` (B6, v1 scope):
    - mint a fair-launch ASA (zero manager, freeze, clawback and reserve);
    - validate params: `M ≥ S·vB/(S+vB)`, `G ≤ rA_max`;
    - `createPool(VCPMM config, hooks = [Gated?, AntiSnipe, LaunchTax], initData)`;
    - `initializeLaunch`;
    - the DAO launch fee;
    - a graduation bounty paid by `graduate(launchId)` after `PluginDex.graduate`.
    - The dev buy with vesting is **deferred** (P2 of this WP).
- **Files:** as listed in §2.2, plus `launch.e2e.spec.ts` (adds cases).
- **Acceptance:** akita-hooks B9 cases 5, 6 and 10 (minus the dev buy), plus:
  - (11) the full lifecycle: launch → anti-snipe decay at r0, r4, r8, r40 → tax accrues on buys and
    sells → the threshold is crossed → the frontend-appended `graduate` → an outside LP adds → swaps
    are plain CP;
  - (12) the stack `[GatedFee, AntiSnipe, LaunchTax]` order semantics;
  - (13) the LaunchManager size ≤ 14,000 B.

---

## 6. Ordering and interface freeze

```
Week 0-1   WP0 (freeze + spike) ──────────────┐        WP-T (Tinyman fixture + lib) ─────────┐
                                              ▼                                              │
Week 1-4   WP1 core (M1 → M2 → M3 → M4 → M5)  │ WP2 bins (harness)  WP3 hooks  WP4 venues+router  WP5a gated  WP5b launch
                                              │   └ needs M2          └ M1        └ M1             └ M1        └ M3
Week 4-6   integration: each WP switches its e2e from mocks/harness to the real Vault; full npm test green
```

**Must land in the core before parallel work starts:** WP0 only (the frozen interfaces plus a compiling
skeleton plus fixtures). Parallel WPs develop against frozen ABIs, mocks and harnesses. They need these
WP1 milestones only for integration tests:

| Consumer | Needs |
|---|---|
| WP3, WP4, WP5a | M1 |
| WP2 | M2 |
| WP5b | M3 |

**Interface freeze list:**
1. `types.ts`: every struct in §3.1, in field order.
2. `constants.ts`: hook points, permissions, flags, result flags, curve ops and flags, LP modes, caps,
   RateScale, box prefixes.
3. `errors.ts`: all codes.
4. `hook-interface.ts`: the `akitaDexHook` signature and the helpers.
5. `curve-interface.ts`: `akitaDexCurve` and `akitaDexCurveFunded`, `CurveRequest`, `CurveResult`, and
   per-op semantics (§3.5, §4.5).
6. `valuator-interface.ts`: `akitaDexRate`.
7. `venues/venue-adapter.ts`: `akitaVenueSwap`, `akitaVenueQuote`, `requireVenueCustody`.
8. The Vault ABI in §4.1: names, argument order, return types.
9. Router `Segment`, `Leg`, `AdapterInfo`, and the router method signatures (router.md §4.1).
10. Guard semantics:
    - custody fee;
    - L2;
    - the band including the +1 tolerance;
    - cross-check;
    - clip formulas;
    - in-kind exit;
    - the graduation formula.

---

## 7. Open questions for Kyle (each with the proposed default)

> Defaults are implemented; the decisions still open are consolidated in `OPEN-DECISIONS.md`.

1. **Replace v1 in place?** No PluginDex appears in the testnet or mainnet deployment summaries.
   **Default:** v2 replaces v1 under the same class and catalog key, and is never deployed side by side.
2. **`custodyFeeBps` default.**
   - **Default:** `= feeBps` for every pool (LPs get at least a trader's fee).
   - Option: backrun pools set 0, which captures more arbitrage but trusts the approved hook's code for
     the profit split.
   - **Decided 2026-10-03 (OPEN-DECISIONS #17):** the default.
3. **Launch graduation excess tokens.** **Default:** retained in the escrow as `lockedToken`. It is
   never synced or tradable, so it is economically burned. Alternative: an ARC-54 burn-address sink
   fixed at creation.
4. **Gated discount scope.** **Default:**
   - the discount also shrinks the protocol share proportionally (current behaviour);
   - the pass TTL is 1 day;
   - the identity is the wallet's `controlled_address`.
   - **Decided 2026-10-03 (OPEN-DECISIONS #12, #18):** as above, plus a per-pass daily cap on discounted
     swaps (§10 A41).
5. **Backrun economics.** **Default:** keeper tip 10%, and the DAO funds the gas tank for ASA/ASA pools.
   **Decided 2026-10-03 (OPEN-DECISIONS #19):** no keeper tip and no gas tank; the caller's group pays every
   inner (§10 A42).
6. **Launch extras.** **Default:** no F9 fee claim on the locked launch LP (the creator earns through
   LaunchTax), and the dev buy with vesting deferred to WP5b-P2. **Decided 2026-10-03 (OPEN-DECISIONS #11,
   #20):** no F9 claim; the dev buy is built into LaunchManager v1 (§10 A36.1, A43).
7. **Router DIRECT custody.** **Default:** SANDBOX only, until router.md T7 (admin-scoped plugin
   escalation via the wallet address) is resolved by test E9. **Decided 2026-10-03 (OPEN-DECISIONS #16,
   #24):** SANDBOX only; T7 is not a concern for v2 and E9 will not be written.

---

## 8. Residual risks, accepted and documented

- **Curve-managed pools (bins):** the emergency exit still calls the curve's `Remove`.
  - Mitigation: the engine is immutable and pinned, `Remove` has no dependencies, and foreign box reads
    let anyone audit state.
  - A Vault-side bin claim calculator was rejected because it couples the Vault to one curve's storage.
- **A curve app can misprice inside the band**, or misallocate shares among its own positions.
  - Bounds: the band, `maxFeeBps`, cross-checks, L2 under custody, `minAmountOut`.
  - Trust: approval of immutable, audited code.
- **Custody hooks run arbitrary transactions as the escrow.** The guard catches value loss. It does not
  catch non-value side effects, such as keyreg timing or app opt-ins that the hook pays for. Admin
  approval is the gate.
- **Discount laundering** through proxy contracts is inherent to identity-based fees (akita-hooks A10).
- **Quote vs swap across rounds** for time-dependent hooks (volatility, anti-snipe, bins variable fee):
  users rely on `minAmountOut`.

---

## 9. Traceability: fatal flaws and grafts

| Judge finding | Resolution | Section | Test |
|---|---|---|---|
| Inner-transaction pooling wrong in all designs | Verified 256 per group; carriers only for budget and refs; router.md and SDK planner fixed | §1, WP4 override 1 | core 12, router G2 |
| HaC self-reported external principal | Value measured from the escrow's receipt-balance delta × the pinned valuator rate; no hook-declared amounts | §4.6, §4.7 | external 1-4 |
| HaC mutable `extCapBps` | Caps frozen in per-pool slots | §3.1 | external 5 |
| Vault haircut and growth-limit contradiction | No haircut; per-unit rate clip with frozen within-block rate; deposits neutral; dust donated by the hook | §4.7 | external 1-2, 6 |
| Vault guard delegated to ptSettle | Native: in-core fee-adjusted k. Curve: L2 floor + Settle + cross-check + direction band | §4.6 | core 13 (L2) |
| Vault and HaC: LP over-mint and no band | LP mint bound for fungible curves; swap price band; `P1 == P0` on Add/Remove | §4.5 | core 13 |
| Vault size unmeasured; 8 KB premise | 16 KB verified on MainNet; P0 spike measures; 13,000 B gate; valves defined | §1, §4.9, WP0 | size.spec |
| Monolith fits only with `assert` | `loggedAssert` kept (16 KB) | §4.9 | size.spec |
| Monolith receipt re-mark bypass | Receipts of all slots snapshotted around every custody call; only the slot's External hook may change them | §4.6 | external 3 |
| Monolith `externalA − extA` underflow | SignedDelta helper; externals recomputed as Σ bookValue | §4.6 | external 2 |
| Vault keyreg fee claim | The fee is the keyreg's own Fee from the escrow; the hook pre-donates 2 ALGO | §4.6, §4.14 | core 5 |
| Permissionless markdown manipulation | Markdowns clipped per day; large write-downs admin-only while paused; valuator approval criteria | §4.7, §3.6 | external 6-7 |
| Fee-free custody trades | Frozen per-pool `custodyFeeBps` charged by every guard (native and curve) | §4.6 | core 3 |
| Monolith DynamicFee capped at 10% globally | Per-pool `maxFeeBps ≤ 9,000` | §4.2 | core 8 |
| Vault lpFee check forbids bins variable fee | `lpFee ≤ amount·maxFeeBps` | §4.5 | bins 16 |
| HaC AVM-version and code-hash pinning | AVM 13 target with `rejectVersion` everywhere | §1, D4 | core 1 |
| Graft: hybrid CP/Launch in core + curve slot | D2 | §4 | n/a |
| Graft: single curve method | `akitaDexCurve` plus `akitaDexCurveFunded` for MBR-carrying ops | §3.5 | n/a |
| Graft: poke, swapper quotes, tryQuote, lazy custody, F6, F8, repeated-pool rejection, in-place graduation, inline sync before mint/burn, Vault-only fungible emergency exit, CI size gate, cached bin price | All adopted | §4 | core 2, 4-11; launch 5 |
| Graft not adopted: forwarders (judge 3) | Rejected per judge 2. The router already sends as S; quotes take `swapper` | D9 | core 9 |
| Graft not adopted: factory split | Not needed under 16 KB; kept as valve 2 | §4.9 | n/a |

---

## 10. Amendments during WP0

Dated 2026-10-02, from the review of WP0 (interfaces, Vault skeleton, fixtures) and WP-T, before the
interface freeze. Each item says whether it changes the spec or only clarifies it. The code comments
cite these as `§10, An`.

**A1. Both-negative custody deltas (clarification; code fix).** §4.6 already says both ≤ 0 (≠ 0) →
errPdki. The skeleton classified a both-negative delta as "mixed" with the loss on B read as a gain, so
the native k check could pass while both reserves were booked down. The guard now rejects
`dA.neg && dB.neg` before any classification, for native and curve pools alike. This check is part of
the frozen guard semantics (§6 item 10). Test: `core-v2` "custody guard" (MockDexHook `ModeStealBoth = 8`,
which takes `value` of `ctx.assetIn` and `value2` of `ctx.assetOut`). The curve-pool case joins core
test 13 once MockCurve exists (WP1-M2).

**A2. Settle carries the pool id (clarification; code fix).** The `CurveRequest` of every `Settle`
(custody deltas, `sync`, and the inline sync before add/remove) has `poolId` = the pool being booked.
The skeleton sent 0. WP1-M2 must cover it with two curve pools on one curve app.

**A3. `ctx.after` at every After* point (clarification).** §4.10 applies to every After* point, not only
AfterSwap: the Vault refreshes `ctx.after` after the math and before running AfterAddLiquidity,
AfterRemoveLiquidity, and the AfterAddLiquidity hooks of `initializeLaunch`. (On a pool's first
deposit `before.priceX64` is 0 and `after.priceX64` is the new price.)

**A4. Curve snapshots in hook contexts (spec change, §3.1/§4.10).** PoolInfo caches only `priceX64` and
`activeId` for curve pools. So `ctx.before` (and `ctx.after` at an After* point with no curve call in
the op) has `liquidity = 0` and `flags = 0` on curve pools. At AfterSwap, `ctx.after` is the curve's own
`r.snapshot` (all four fields). PoolInfo is unchanged. Hooks that need the depth hint at a Before*
point read the curve's state directly (bins: foreign box reads).

**A5. `CurveRequest.maxFeeBps` (spec change, §3.5; WP2 override 2).** New field after `feeBps`:
`maxFeeBps: uint64`, filled by the Vault from `pool.maxFeeBps` on every op. A curve's native variable
fee is capped with this value (bins: per-bin total ≤ `min(MaxFee, req.maxFeeBps × 1e5)`). The engine
no longer stores `maxFeeBps` from Init args, and the WP2 Init args layout is unchanged (no
`maxFeeBps`). Reason: the Vault cannot validate opaque curve args, and a creator-supplied cap that
disagrees with `pool.maxFeeBps` would make every swap fail the §4.5 fee bound.

**A6. `ExternalExitEvent` (spec change, §3.1/§4.4).** New event
`ExternalExitEvent { poolId, slot, receipt, recipient: Account, units, value }`. `removeLiquidity` and
`emergencyRemoveLiquidity` emit one per slot with `units > 0`: `units` = receipt units paid in kind,
`value` = `mulDiv(lp, bookValue, S)` taken out of the slot's side.

**A7. `errPdni` is not a frozen code (spec change, §3.3).** The skeleton's temporary not-implemented
code lives as a private constant in `contract.algo.ts`, not in `errors.ts`. WP1 deletes it and every
use without touching a frozen file. `size.test.ts` has a release gate that fails if `errPdni` is in
`PluginDex.approval.teal`. It is skipped unless `PLUGIN_DEX_RELEASE=1`; WP1 acceptance runs it with
the flag and then removes the skip.

**A8. Router types are created in WP0 (spec change, §2.2/§3.8/§6 item 9).** WP0 adds
`arc58/plugins/akita-router/types.ts` (`Segment`, `Leg`, `AdapterInfo`, `RouteEvent`, `LegEvent`,
field order as router.md §4.2) and `constants.ts` (`MaxLegs 4`, `MaxSegments 3`, `MaxCandidates 4`,
`MaxChunks 4`, `FlagAllowDirect 1`, `AdapterEnabled 1`, `AdapterDirectCustody 2`, `AdapterExactQuote 4`).
`FlagAllowDirect` was missing from §3.8; router.md and the WP4 overrides use it. The router method
signatures of router.md §4.1 are recorded in the `types.ts` header and are frozen. `contract.algo.ts`,
`errors.ts` and tunables such as the native segment budget stay with WP4.

**A9. Pair index cap does not block creation (spec change, §4.2 step 8).** v1 reverted createPool with
errPdtp once a pair had `MaxPoolsPerPair` (64) pools, so anyone could block a pair forever for about
64 pool-creation costs. Now the first 64 pools of a pair are indexed and later pools are created
unindexed; createPool never fails on a full index. `errPdtp` stays defined (v1 codes are unchanged)
but is unused. Residual risk: junk pools can still fill the on-chain index, so routers and the SDK
must not trust `getPairPools` alone (they filter by liquidity and can discover pools from createPool
logs). **Open for Kyle:** whether to add an admin `delistPool` / index curation method (an ABI addition)
before the freeze.

**A10. P0 spike definitions (clarification, WP0).** (b): the updated hook must still be a working hook
(test: `MockUpdatableHookV2`, the same logic plus one read-only method). The pinned pool's swap must
fail with the AVM's `app version (1) >= reject version (1)`. After re-approval, a new pool swaps
through the same updated program. (d): the claim is about the Vault's own frame. With 4 eager custody
hooks at Before/AfterSwap, the swap app call issues 17 direct inners (4 × 2 × (rekey + call) + payout)
and 25 including the hooks' own rekey-backs, with no carriers.

**A11. Calling an app above 8,192 B costs box read budget (platform fact, WP1-M1, LocalNet).** A
transaction that calls the Vault must carry box quota for the program bytes above 8,192 plus the box
bytes it reads; each box ref gives 2,048 B and the quota is pooled across the group. Measured: a
hookless `swap` with only its `p:` ref fails with `read budget exceeded (2318 > 2048)` (2,037 program
bytes + 281 B pool box) and passes with one extra empty ref. algokit's resource population adds the
refs; explicit-reference callers (router, SDK planners) must add
`ceil((len − 8192 + Σ box bytes read) / 2048)` refs. Details: `research/amendments-core.md`.

**A12. The Vault tops up its own opcode budget (behaviour, WP1-M1; no ABI change).** Around every
hook call, after each hook stack, per HookInstall in createPool, for an inline sync that books a
surplus, and per extra route hop, the Vault calls `ensureBudget(n, OpUpFeeSource.GroupCredit)`, so
callers need no `opUp()` carriers for budget but must leave fee credit (op-up inners have fee 0).
Carriers remain only for references (algokit's 8-reference limit, e.g. createPool with ≥ 3 hooks).
A hookless native swap uses 507 opcodes (no op-up). Checkpoint sizes: `research/amendments-core.md`.

**A13. Liquidity predicate for curve-managed pools (clarification, §4.4/§4.7; WP1-M2).** LpModeCurve pools
have no Vault LP (`lpSupply` stays 0), so "the pool has liquidity" means `lpSupply > 0` **or** booked
reserves ≠ 0. The inline sync before an add and the public `sync` use this predicate (an empty pool still
fails `sync` with errPdil). `removeLiquidityCurve` on a paused pool skips sync and hooks but still calls
the curve's Remove. For curve-managed pools `LiquidityEvent.lpAmount` and `ctx.lpAmount` carry the
position shares. A Swap (commit) whose curve returns `amountOut = 0` fails with errPdcv; only Quote may
return 0 (`quote` errPdil, `tryQuoteRoute` 0).

**A14. Opcode budget after curve calls (behaviour, WP1-M2; no ABI change).** The Vault calls
`ensureBudget(400, GroupCredit)` right after every curve call (Init, Swap, Quote, Add, Remove, Settle), so
a curve that spends its whole allotment cannot starve the Vault's tail (§4.5 checks, booking, persist,
event, payouts: ≤ 346 opcodes measured). Measured Vault frame with MockCurve: curve swap 727 opcodes
(381 before the call), fungible-curve add 827, remove 747, new curve position 717; with an honest
MockCurve the group stays inside the pooled 1,400 with no op-up. **Curve obligation:** return with at
least 100 opcodes of pooled budget left, so the Vault can decode the result and issue its op-up (a
MockCurve that burns the pool down to 100 before encoding its return passes; down to 60 fails). Curves
that may spend more should end each op with `ensureBudget(100)`.

**A15. Curve Settle rejections use errPdki (clarification, §3.3).** The Vault cannot relabel a revert
inside a curve call, so a curve that rejects a Settle (an infeasible custody trade, or a donation it
cannot place) should fail with `errPdki` itself, keeping "every custody guard failure is errPdki" true
end to end. MockCurve does this; the bins engine (WP2) should too. The Vault's own Settle checks
(aggregate, direction band) stay errPdcv.

**A16. Graduation keeps the price exact in every state (spec change, §4.4 F4; WP1-M3).** §4.4 sets `d = 0`
when the numerator `r_q·v_t − r_t·v_q` is ≤ 0. That happens whenever a launch graduates below the
d = 0 point (`r_q < v_q·(sqrt((S+v_t)/v_t) − 1)`, about a third of `rA_max` for the pump.fun shape), which a
creator can choose with a low `graduationThreshold`; with `d = 0` the token price would fall at graduation
(`r_q/r_t < e_q/e_t`), so a sell-before / buy-after sandwich around `graduate` would profit at the locked
LP's expense. The Vault therefore uses the unified form `target = ceil(r_q·e_t/e_q)` (identical to
`r_t + d` with the spec's ceil when the numerator is positive): if `target ≤ r_t + M`, `r_t' = target` and
`locked_t = r_t + M − target`, which also locks the curve's own token excess when `target < r_t`; otherwise
the spec's `d > M` branch applies unchanged (`r_t' = r_t + M`, `locked_t = 0`, quote surplus
`r_q − ceil(r_t'·e_q/e_t)`). `GraduationEvent.tokenIn` is `max(r_t' − r_t, 0)` and `tokenRetained` is the
new `locked_t`. Test: `launch.e2e.spec.ts` "§10 A16".

**A17. The graduation quote surplus is booked as protocol fees (behaviour, §4.4 F4; WP1-M3).** Instead of an
inner payment to the treasury inside `graduate`, the surplus moves from the quote reserve into
`protocolFees_q`, and `collectProtocolFees` (permissionless) sends it to the treasury. Same destination, but
a permissionless `graduate` can never be blocked by the treasury's state (an ASA quote the treasury has not
opted into, or an ALGO payment below a fresh account's minimum balance). `GraduationEvent.quoteToTreasury`
reports the amount.

**A18. Launch-pool validation details (clarification, §4.2/§4.4; WP1-M3).** createPool: any non-zero offset
makes a launch pool, which needs `graduationThreshold > 0` **and a non-zero quote-side offset** (the real
quote reserve starts at 0, so the first buy prices against `v_q`); a pool without offsets must have
`graduationThreshold = 0`. Both fail with errPdlb; externals on a launch pool fail with errPdex (checked
before the M4 externals stub). `initializeLaunch` requires an unpaused pool (errPdpp), then creator, bonding
and `lpSupply == 0` (errPdlb); both deposits must be the token asset (errPdan) and non-zero (errPdin);
`L0 = sqrt(eA·eB)` after the seed must be > 0 (errPdil). `graduate` requires an unpaused pool (errPdpp), then
bonding, an **initialized** pool (`lpSupply > 0`) and `r_q ≥ graduationThreshold` (errPdgr). Graduation
runs no hooks and does not sync.

**A19. Reference carriers in the P0 (d) and v1 swap helpers (test change, A10/A11; WP1-M3).** At 12,145 B
the Vault needs three box refs of read quota for a `p:` + `h:` call. P0 (d) (4 eager custody hooks, which
already fill 8 references) now carries the extra empty box ref on one `opUp()` reference carrier that
issues no inner transactions; the claim is unchanged (the Vault's swap call itself issues 17 direct
inners). algokit-utils 9.2.2's resource population appends the asset once per asset holding, so the v1 and
core-v2 `swap` helpers add one reference carrier on hooked pools. Explicit-reference callers size their
box refs with `readQuotaEmptyRefs` (tests/fixtures/plugin-dex.ts). Details: `research/amendments-core.md`.

**A20. External-slot booking details (clarification, §4.2 step 5, §4.4, §4.6, §4.7; WP1-M4).**
- *Custody re-mark by measured delta.* Around every custody call the Vault measures the escrow's holding of
  every slot's receipt. A slot whose holding changed must name the calling hook, and that hook must hold
  External (errPdhm). Its units then move by the measured change (`units += now − before`, errPdki below 0),
  not to the absolute holding, so receipts sent to the escrow outside a custody call stay unbooked (`sync`
  books only A and B). The slot is re-marked with `markRate`, and the bookValue change is folded into its
  side's delta before the guard classifies it.
- *Liquid floor.* After any booking on a pool with slots, `reserveX ≥ externalX` must hold for both sides
  (errPdki). Without this, a hook could lend out protocol fees and the pool's liquid book would underflow.
- *Cap.* The cap is checked after the booking, and only for slots whose units grew in that call (errPdec).
- *Empty slots are not marked.* `revalue` and the inline revalue before add/remove skip slots with
  `units == 0`, so they make no valuator call. The first mark under custody is clipped over the whole time
  since the last mark, which allows the same total move as daily marking without compounding.
- *Order of payouts on remove.* In-kind receipt payouts happen inside the remove, after BeforeRemoveLiquidity
  and before AfterRemoveLiquidity hooks. Liquid payouts stay after the hooks, as in v1. Units and value are
  both floored.
- *`writeDownExternal` validation.* A slot index ≥ `externalSlots` fails with errPdex, and a valuator rate of
  0 fails with errPdva. The new book is `floor(units·min(rate, v)/RateScale)`, which can exceed a book that
  in-kind floor rounding left slightly low by that rounding dust. A `revalue` at dt = 0 would book the same
  dust.
- *createPool order and codes.* First the count, then the shape (side, receipt ∉ {0, A, B}, capBps),
  duplicates, the hook installed with External, and valuator approval; all of these fail with errPdex. Then
  the valuator version (errPdvr) and the initial rate > 0 (errPdva). Approved valuators must return 0 for a
  receipt/underlying pair they do not know, because the pool creator picks the receipt.

**A21. Opcode budget around valuator calls (behaviour, WP1-M4; no ABI change).** The Vault calls
`ensureBudget(400, GroupCredit)` after every valuator call, and `ensureBudget(300)` per slot of an in-kind exit,
so emergency removes on pools with slots need no carriers for budget. Measured with MockValuator and MockLender
on a 2-slot pool:

| Operation | Opcodes | Op-ups |
|---|---|---|
| poke deposit | 1,937 | 0 |
| revalue (2 marks) | 950 | 0 |
| removeLiquidity (2 marks + 2 in-kind exits) | 2,029 | 0 |
| hookless swap (reads `p:` only, never `e:`) | 672 | 0 |

The inner app calls bring their own 700 each. The Vault is 13,597 B, so a call carries 5,409 program bytes of
read quota, which takes 3 box refs before any box is read. Details: `research/amendments-core.md`.

**A22. Clip tests use short time warps (test change, §4.12 external case 6; WP1-M4).** LocalNet's chain time
is shared by every agent and suite, and it is currently frozen ahead of the wall clock. The clip tests
therefore warp 864 s (1% of a day) on a slot with 10,000 bps/day clips, instead of 1 day at the default clips.
Expectations are computed from the slot's own `lastMark` change. The same-block case runs
`[revalue, lender.setRate, revalue]` in one group, so dt = 0.

**A23. ConsensusKeyregHook details (clarification, §4.14; WP1-M5; no Vault change).** The hook is installed with
points = Poke, perms = Custody and flags = LazyCustody. The admin (the DAO wallet) stores one box per pool,
`k` + poolId → `PoolKeys { operator, voteKey, selectionKey, stateProofKey, voteFirst, voteLast, voteKeyDilution }`
(`voteFirst ≤ voteLast`, errCkkw; admin-only methods fail with errCkad). The operator pokes with `data = [1]`
(online) or `[0]` (offline); any other data from the operator fails with errCkda. A poke by anyone else, on a pool
with no keys, or at another point is a no-op: lazily the hook returns a pass result and is never rekeyed; installed
eagerly it hands custody straight back. The go-online keyreg's own fee is `Global.payoutsGoOnlineFee` (2 ALGO)
only when payouts are enabled **and the escrow is not yet incentive-eligible**; otherwise it is 0. The hook
pre-donates exactly that fee from its tank in the same call, so the guard's net delta is 0. Going offline is a
fee-0 keyreg. Measured on LocalNet: eligibility survives going offline, so the tank pays the 2 ALGO once per
escrow; a lazy go-online poke uses 1,213 opcodes (Vault plus hook) with no op-up and 5 inner transactions.
Test: `hooks/consensus-keyreg.e2e.spec.ts`.

**A24. Curve-pool removes run no inline sync (spec change, §4.4/§4.7; vault-flows fix).** `removeLiquidity` and
`removeLiquidityCurve` run `sync` + `revalue` before the burn only on native pools. A curve-pool exit never calls
the curve's `Settle`, so a donation the curve cannot place (a 1-unit transfer to the escrow) can no longer block
LP exits; the only curve dependency of an exit stays `Remove` (§8). An exit that leaves surplus unbooked only
benefits the remaining LPs. Adds keep the inline sync before the mint (JIT protection), so **curve obligation:** a
curve must be able to place any donation while it has booked reserves; one that refuses blocks adds (never exits)
until it can (bins: B1 in `research/amendments-core.md`). Test: `curve-slot.e2e.spec.ts` "§10 A24".

**A25. A custody re-mark books the revaluation of held units like `revalue` (spec change, §4.6/§4.7; overrides
the A20 sentence "the bookValue change is folded into its side's delta").** For each slot whose receipt holding
changed in a custody call: `rate = markRate(slot)`; the revaluation of the units already held,
`floor(unitsOld·rate/RateScale) − bookValue`, is booked straight into the side's reserve and external value (gain =
donation, loss lowers the reserve, the liquid book is unchanged); only `floor(unitsNew·rate/RateScale) −
floor(unitsOld·rate/RateScale)`, the value of the measured unit change, is folded into the delta the guard
classifies. So the External hook cannot take accrued yield against a pending markup, and a pending markdown does
not make a neutral just-in-time recall revert. At dt = 0 nothing changes. Test: `external.e2e.spec.ts` "§10 A25". Refined by A37 (conservative valuation of the unit change when the clip binds).

### Amendments after WP1 (vault fixes, track integration and the stabilize round)

The items below were first recorded in `research/amendments-core.md` or `research/amendments-wp3-lvr.md`, or
exist only in code. They are summarized here so that §10 is the complete index; the source notes keep the
findings, measurements and test names. A26-A28 are Vault behaviour and are cited in `contract.algo.ts`. A29
onwards number the router, curve, hook and launch changes made after WP1. B1-B5 are BinEngine amendments and
L1-L8 are the WP3-lvr notes, kept under their own letters.

**A26. A mint prices every external slot at max(book, valuator) (spec change, §4.4/§4.7; vault-guard fix).**
The inline `revalue` before a mint still books only the clipped mark, and it also returns, per side,
`Σ max(0, floor(units·v/RateScale) − bookValue)` for the same valuator answer `v` (no extra valuator call). The
native mint uses `reserveX + unbookedX` for both the LP amount and the counter-side need. Booked reserves, the
clip and the swap price are unchanged. A valuator below the book leaves the mint at the book, so "write down, then
mint cheap" stays closed. Reason: JIT add + remove bought the slot at the clipped book and took it out in kind at
the valuator's value (+360,000 TKA in the refuter's run). Test: `vault-guard.e2e.spec.ts` "§10 A26". SDK:
`addLiquidity` quotes on slot pools must apply the same `max`.

**A27. Per-day clips are bounded and the clip band saturates (spec change, §4.2 step 5/§4.7; vault-lows fix).**
`createPool` requires `maxMarkupBpsPerDay` and `maxMarkdownBpsPerDay` ≤ `MaxClipBpsPerDay = 10,000` (a
Vault-local constant), else errPdex. `clipBand(rate, bps, dt) = floor(floor(rate·bps/1e4)·dt/day)` is computed
with `mulw`/`divw` and saturates at 2^64 − 1; `rate + up` saturates too. The result is still `clamp(v, low,
high)`, so saturation never books more than the valuator. Reason: unbounded clips overflowed `markRate` after a
long gap (bricking `revalue`, custody re-marks and add/remove) and a huge markdown clip removed the clip. Test:
`external.e2e.spec.ts` "§10 A27, A28". The ceiling is kept at 10,000 (OPEN-DECISIONS #5, decided 2026-10-03).

**A28. An in-kind exit takes the booked value of the units it pays (spec change, §4.4; overrides A6's `value`
definition).** `exitInKind` pays `units = floor(lp·slot.units/S)` and takes `value = ceil(bookValue·units/
slot.units)` off the slot and its side's reserve. An exit paying 0 units takes 0 value; a full exit takes the
whole book. `ExternalExitEvent.value` reports this value. Reason: with a coarse receipt a small exit paid 0 units
but took up to a unit's value off the book. Test: `external.e2e.spec.ts` "§10 A27, A28".

**A29. The router's handback rekeys the S checked at entry (router change, router.md §5.5; stabilize).**
`finish()` asserts `getSpendingAccount(wallet) === spender` (errRtCustody) and rekeys the cached `spender`,
instead of `rekeyBackIfNecessary` re-reading the wallet. Reason: a fake wallet could flip its published spending
address to the leg escrow E during the swap and have E rekeyed away. Test: `akita-router.e2e` E11.

**A30. Router entry and SANDBOX segment rules as built (router clarification, router.md §5.1/§5.4).**
- `enter()` requires `S ≠ E`, `auth(S) == router` (errRtCustody, read with `acct_params_get` so a closed window
  fails cleanly) and `flags == 0`; `FlagAllowDirect` reverts with errRtDirect (SANDBOX only, D10).
- After an adapter segment: E's min balance is unchanged (errRtAlgoLeak: the adapter may neither add nor close
  opt-ins), `in1 + amount ≥ in0` and `in1 ≤ in0` (errRtOverspend), and `out1 ≥ out0`.
- **Partial fills:** `unspent = in1 + amount − in0` is refunded from E to S only when S can receive the input
  asset (ALGO or opted in); otherwise the adapter must fill the whole input (errRtSlippage).
- Native candidates in `swapBest` are quoted with `tryQuoteRoute(swapper = S)` sent as S (WP4 override 2).

**A31. BinEngine amendments B1-B5 (curve change; bins.md §4.5, §7).** Details in `amendments-core.md` ("Bins fix",
"Bins lows", "Verifier follow-ups").
- B1: a Settle donation never reverts. With an empty active bin, X goes to the nearest occupied bin above and Y to
  the nearest occupied bin below; with none on that side it stays in the empty active bin (supply 0).
- B2: an add into a bin with supply takes only that bin's composition (`shares = min over non-empty sides`); the
  LB composition fee is removed. A deposit giving none of a side the bin holds fails with errBnZs.
- B3: `MaxBinsPerSwapCap` is 128 (was 512); Init rejects more with errBnAr.
- B4: `CurveResult.shares` for Add and Remove is `Σ ceil(binShares/2^32)`.
- B5: `closeChunk` requires every bin record of the chunk to be zero (errBnCk), so a parked B1 donation cannot be
  deleted with its chunk.

**A32. GatedFeeHook trusts `controlled_address` only under real control (hook change, akita-hooks A3; ACC-01).**
`hooks/shared/origin.ts#resolveOrigin` uses the wallet's `controlled_address` only when it is the wallet's own
address, or its auth address is the wallet's address and the wallet's address has a zero auth address
(`walletControls`); otherwise the origin is the spender. A creator check alone is not enough: a factory wallet's
admin can `UpdateApplication` it to publish any `controlled_address`. Clients must call `openPass`/`refresh`
outside a plugin group. Test: `hooks/gated-fee.e2e.spec.ts` T-8, T-8b, "ACC-01 UpdateApplication".

**A33. BackrunArbHook: keeper tip definition and unfunded callers (hook change, lvr §3.6; L7 + stabilize).** The
tip is `keeperBps` of the surplus above the guard fee, and the execute condition is `surplus ≥ guardFee + tip +
rebate + minSurplus`. The caller's balance is read without an assert; an unfunded (fee-pooled, zero-balance)
caller, or one that is not opted in or is frozen, gets no tip instead of reverting the swap or poke. The hook
funds its own budget (`ensureBudget(900, Any)` once a gap is found, then 1,000 on the carrier's credit) and pays a
gas-tank carrier for every inner the arbitrage path adds (L3, L4). **The tip, rebate and gas tank are removed by
A42** (OPEN-DECISIONS #19); the tolerance of unfunded callers and the self-funded budget remain.

**A34. VolatilityFeeHook clamp and Poke (hook change, lvr §2; stabilize).** BeforeSwap/Quote return
`max(running, min(running + varFee, max_fee))`: `max_fee` (≤ 9,000) clamps only the hook's own contribution and
never lowers a fee set earlier in the stack. Only AfterSwap advances the accumulator (`tLast`, reference, `vRef`,
`vAcc`). Poke is permissionless, so it only seeds an unseeded box or refreshes `lastPrice`/`lastId`; repeated pokes
cannot freeze the reference or decay the accumulator. Native pools measure positions on the live effective
reserves of the hook's own context (L1 workaround).

**A35. AntiSnipeFeeHook clock and legacy hook hardening (hook change, akita-hooks B5.1; stabilize).** An unstarted
clock (FirstLiquidity before any add, or an install without AfterAddLiquidity) starts at the pool's first
BeforeSwap, so the start fee and the creator exemption last at most one trading round; Quote prices that round as
e = 0. `ImpactFeeHook` and `SwapTaxHook` pass at every point other than BeforeSwap/Quote, and ImpactFeeHook never
panics (an impact that overflows is charged its max fee). ImpactFeeHook set the fee absolutely here; A44
changed it to `max(running, own)` (OPEN-DECISIONS #21).

**A36. LaunchManager as built (launch change, akita-hooks B6; stabilize).**
- Two phases: `createToken(payment, TokenParams)` mints the fair-launch ASA and records a pending launch, then
  `launch(payment, launchId, LaunchParams, maxLaunchFee, maxBounty)` by the same creator creates and seeds the
  pool. The asset id must be known before the group that references its pair-index box.
- `launch` fails with errLmcp when the current `launchFee` or `bounty` exceeds the caller's caps, so a `setFees`
  landing first cannot take more of the payment than intended.
- `graduate(launchId)` graduates through the Vault if still bonding and pays the bounty to the caller; if the pool
  was graduated directly, it refunds the creator (or the caller when the creator cannot receive it). It then calls
  `PluginDex.collectProtocolFees` best effort, only when something is booked and the treasury can receive every
  side, so the A17 surplus reaches the treasury without a separate call and a bad treasury never blocks
  settlement.
- The dev buy with vesting is built as A36.1 (§7 item 6, OPEN-DECISIONS #20). Pools: `maxFeeBps =
  max(startFeeBps, feeBps)`, `custodyFeeBps = feeBps`, `maxHookFeeBps = max(buyTax, sellTax)`.

**A36.1. LaunchManager dev buy, disclosed and vested (launch change, akita-hooks B6 step 5; OPEN-DECISIONS #20,
decided 2026-10-03).** LaunchManager only; no Vault, hook or Rewards change.
- `LaunchParams` gains `devBuy` (µALGO, 0 = none) and `devVestSeconds`. With `devBuy > 0`, `launch` swaps it
  into the pool through `PluginDex.swap` right after `initializeLaunch`, in the same app call. The caller is the
  LaunchManager, which is the AntiSnipe `exempt`, and the round is the clock's start round (Creation: createPool;
  FirstLiquidity: initializeLaunch's AfterAddLiquidity), so e == 0 and the anti-snipe fee is skipped. The pool
  fee, the protocol share and the creator's own buy tax still apply. No one can trade before it: the pool is
  created in the same call.
- DAO policy (`setDevBuy(rewards, maxBps, minVestSeconds, maxVestSeconds)`, admin only; all 0 at create = dev
  buys unavailable): the tokens out must be `≤ maxBps·S/1e4` (errLmdv), with an immutable ceiling
  `maxBps ≤ MaxDevBuyBps = 1,000` (10% of S); `devVestSeconds` must lie in `[min, max]` (errLmdv).
- Vesting: the tokens go to a Rewards `createInstantAsaDisbursement` with one allocation (the creator),
  `timeToUnlock = Global.latestTimestamp + devVestSeconds` and `expiration = 2^64 − 1`. Rewards `claimRewards`
  pays only the creator, only from the unlock (errDblk before); the never-expiring disbursement means no one
  (the LaunchManager has no reclaim path) can take the tokens back. Rewards' opt-in to the token (skipped when
  it already holds it; `optIn` is permissionless) and the disbursement MBR (`MinDisbursementsMBR +
  UserAllocationMBR`) come out of the creator's payment, which must cover them up front (errLmpy).
- Disclosure: `LaunchEvent` gains `devBuy, devTokens, devUnlock, devRewards, devDisbursement` (all 0 without a
  dev buy), and the `Launch` record stores `devTokens, devUnlock, devRewards, devDisbursement`. `devRewards` is
  the Rewards app id at launch time, since `setDevBuy` can repoint `rewards` for later launches.
- Rewards MBR gap: `MinDisbursementsMBR` (41,700) is 3,200 µALGO below the actual `DisbursementDetails` box MBR
  (44,900), and `createInstantAsaDisbursement` requires the constant exactly. Rewards is not changed; instead
  the LaunchManager reads Rewards' minimum balance before the opt-in and after the disbursement and pays the
  growth beyond what it already paid (the MBR is checked at the end of the outer transaction), so the
  creator's payment covers Rewards' true cost and the dev buy never consumes ALGO Rewards holds for its ALGO
  claimants (errLmpy if the payment cannot cover the top-up). The top-up becomes 0 once Rewards is fixed.
- Tests: `launch/launch-hooks.e2e.spec.ts` › LaunchManager › dev buy.

### Amendments from the deploy-blocking decisions (2026-10-03)

Kyle approved the recommended default for every deploy-blocking item in `research/OPEN-DECISIONS.md` (#1-#16).
A37-A40 are the ones that change code or the deploy path; the others are kept as built or documented there.

**A37. Conservative custody valuation under a binding clip (Vault change, §4.6/§4.7; refines A25;
OPEN-DECISIONS #4).** In `custodyCall`, each slot whose receipt holding changed reads the live valuator rate `v`
(`liveRate`) and the clipped rate `r'` (`clipRate`) separately; the `markRate` wrapper named in §4.6, §4.7 and
A25 no longer exists in code. The book is unchanged: units stay booked at `r'` and A25's revaluation of held
units still applies. When the clip binds against the hook, i.e. units leave while `v > r'` or enter while
`v < r'`, the delta the guard classifies is reduced by `skim = floor(Δu·|v − r'|/RateScale)` and the same `skim`
is booked as a donation in the pre-guard revaluation, so net reserve accounting is as before. Effect: leaving
units are valued at `max(v, r')`, entering units at `min(v, r')`, which closes the A25 skim (an approved
External hook keeping `Δu·(v − r')` of liquid on a recall). Liveness under a binding clip is unchanged
(recalls after a binding markdown still need the hook to donate the gap). Rounding lets the guard value a
deposit up to 1 base unit above `min(v, r')`, judged negligible. Vault: 13,999 B. Test: `external.e2e.spec.ts`
"conservative custody valuation under a binding clip (§10 A25, OPEN-DECISIONS #4)" (MockDexHook modes 16
`ExternalRecallTake` and 17 `ExternalDepositTake`; fails on the pre-change Vault with no errPdki).

**A38. BinEngine Init caps the pool's fee ceiling at the engine's (curve change; OPEN-DECISIONS #13).** Init
asserts `req.maxFeeBps ≤ MaxPoolFeeBps = 1,000` (`curves/bins/layout.ts`), else **errBnFc** (new code). Every
per-bin fee and the custody Settle fee were already capped at the engine's 10%; because `custodyFeeBps ≤
maxFeeBps`, a bins pool can no longer declare a DynamicFee or custody fee cap that the engine would silently
charge at 10% (so AntiSnipe at 50% cannot be installed on a bins pool). The model (`BinEngineModel.init`)
mirrors it. Tests: `bins.e2e.spec.ts` and `bins-model.test.ts` "OPEN-DECISIONS #13".

**A39. Bins value floor per position-bin stake (curve change; OPEN-DECISIONS #14 and follow-up #14a).**
- Init asserts `minBinShares ≥ MinBinSharesFloor = 2^32` (one Y base unit, since shares are value × 2^32), else
  **errBnMs** (new code). The SDK default is one whole Y token per new bin.
- The floor applies to every position-bin stake, valued as `value·2^32` at the bin's price, not only at bin
  creation. An add into an occupied bin must leave the position a stake worth ≥ `minBinShares`
  (`mine·shr96(P·(xb+x) + (yb+y)<<128) ≥ minShares·(supply+shares)`), else errBnZs. A partial Remove that
  would leave a stake worth less removes the whole stake in that bin instead (never reverts); a 100% or
  emergency Remove is unchanged. A partial Remove reads the binStep table box. Valuing by price rather than raw
  shares means a donation-inflated share price does not raise the floor for co-adds.
- Callers split trades into ≤ `maxBinsPerSwap`-move slices; a Quote of 0 means split.
- BinEngine: 7,196 B. Tests: `bins.e2e.spec.ts` and `bins-model.test.ts` "OPEN-DECISIONS #14" and
  "OPEN-DECISIONS #14 (verifier bypass)" (the latter fails on the Init-only engine). The per-stake rule is
  built but awaiting team confirmation (OPEN-DECISIONS #14a).

**A40. Deployment catalog and deploy order (tooling; §7 Q1; OPEN-DECISIONS #1, #2).** v2 replaces v1 under the
`PluginDex` catalog key (`plugin: false`; the router is the ARC-58 plugin); the two are never deployed side by
side. `scripts/lib/immutable-catalog.json` lists the whole stack with `dependencies` (constructor arg → catalog
app), `after`, `params`, `defaults`, `postDeploy` and `notes`, and `scripts/lib/immutable-deployment.ts` enforces
the order:

1. PluginDex (`version`, `admin`)
2. BinEngine (`vault`) and the 8 production hooks (`dex` plus their parameters)
3. VenueRegistry
4. TinymanV2Adapter
5. AkitaRouterPlugin (`version`, `dex`, `registry`)
6. LaunchManager (`vault`, `admin`, `antiSnipeHook`, `launchTaxHook`)

Before any receipt is written, each dependency ID must be a live app whose approval hash matches its compiled
artifact (`--allow-dependency-mismatch` only warns). The admin steps (`setHookApproval` perms, `setCurveApproval
(BinEngine, lpMode 1)`, registry `setAdapter`, router `init`, LaunchManager `setFees`/`setHooks`) are printed,
not sent; on MainNet they go through DAO proposals. The repo-root `.gitignore` rule is now `/lib/`, so
`scripts/lib/*` can be tracked. Tests: `tests/migration-dry-run.test.ts`, `tests/migration-scripts.e2e.spec.ts`.

**Amendments from the non-blocking decisions (2026-10-03).** Kyle decided OPEN-DECISIONS #17-#24 later the same
day. #17 (`custodyFeeBps = feeBps`), #22 (the SDK prepends `sync()` to curve-pool exits) and #23 (inline leg-escrow
opt-ins, DAO pre-funding at deploy) keep the defaults and need no code; #24 is closed without code (E9 will not
be written). #25 stays open. A41-A44 change hooks or LaunchManager; the Vault, BinEngine and the router are
unchanged.

**A41. GatedFeeHook daily cap on discounted swaps (hook change, akita-hooks A11.4; OPEN-DECISIONS #18).**
- Global `maxDiscountedSwapsPerDay` (key `max_day_swaps`), set to `DefaultMaxDiscountedSwapsPerDay = 500` in
  `create` (signature unchanged); 0 = unlimited. DAO-only `setMaxDiscountedSwapsPerDay(cap)` (errGfad otherwise)
  takes effect at once, against today's counts.
- `FeePass` gains `swapDay` (UTC day = `Global.latestTimestamp / 86,400`) and `daySwaps`: the box value grows
  from 64 to 80 bytes and `PassMbr` from 41,300 to **47,700** µALGO (2,500 + 400·(33 + 80)); `passCost()`
  returns it. Nothing is deployed, so no migration.
- `price(poolId, caller, feeBps, count)`: today's count is `swapDay == today ? daySwaps : 0`. With `cap ≠ 0` and
  count ≥ cap the hook returns `feeBps` (no discount, no revert). Only BeforeSwap passes `count = true`, and it
  writes the pass back (`swapDay = today`, `daySwaps = count + 1`) only when the fee was actually lowered. Quote
  and `previewFee` never write and return exactly what BeforeSwap would, so quote == swap for a single swap.
- `refresh` and `refreshFromGate` keep the counter (`measure()` takes it as parameters); `openPass` starts it
  at 0.
- `closePass` fails with **errGfdy** on any UTC day on which the pass made a discounted swap, for live passes and
  for expired passes closed by anyone; it can be closed from the next UTC day. Without this, close-and-reopen
  (MBR refunded) would reset the count.
- New readonly `getDiscountedSwapsToday(spender)`; `getPass` returns the two new fields (zeros without a pass).
- Scope: per spending account (separate escrows of one wallet hold separate passes). A route crossing gated
  pools counts once per hop, so `quoteRoute` can overstate the discount when the cap is reached inside the route.
- Tests: `hooks/gated-fee.e2e.spec.ts` T-16 (default 500, DAO-only setter, 80-byte box and MBR, quotes do not
  count, cap 2 with quote == swap at every step, other passes unaffected, refresh keeps the count, errGfdy,
  raising/lowering the cap, cap 0) and T-17 (next UTC day by time warp: count resets, the capped pass closes and
  refunds `PassMbr`; kept last). Both fail on the old hook.

**A42. BackrunArbHook without keeper tip or gas tank (hook change, lvr §3.5-§3.6; OPEN-DECISIONS #19; supersedes
the tip, rebate and tank parts of A33 and §5 WP3).**
- No keeper tip, no gas tank, no carrier, no fee rebate. Every inner the hook issues is fee 0, op-ups included
  (`OpUpFeeSource.GroupCredit`), so the swapper's or poker's group pays the whole arbitrage path through fee
  pooling, and the whole surplus above the guard fee stays with LPs.
- `registerPool(poolId, minSurplusA, minSurplusB, maxTradeBps)`; execute iff `surplus ≥ guardFee + minSurplus`,
  `guardFee = ceil(out·custodyFeeBps/1e4)`. The skip path still costs one inner.
- Fee buffer: a backrun simulated as skipped may run at submit, and an underfunded group fails as a whole (the
  user's swap included). Callers add `BackrunMaxExtraInners = 11` × min fee per backrun pool on the route (lazy:
  up to 2 sizing op-ups + 2 custody-budget op-ups + the Vault's rekey + the custody call + the Tinyman deposit,
  appl and payout + 2 Vault checkpoint op-ups). A backrun simulated as running that skips at submit only
  overpays.
- Tests: `hooks/backrun-arb.e2e.spec.ts` "(5) fees" (all inners fee 0, group fee = min fee × all txns, hook
  balance unchanged, extra inners ≤ 11 on ALGO/ASA and ASA/ASA), "(5) fee buffer" (a skip-path fee fails the
  group when the backrun fires; + 11 × min fee succeeds), "(6) … no tip".

**A43. LaunchManager dev buy decided and hardened (launch change; OPEN-DECISIONS #20).** The dev buy is A36.1
(option b, built before LaunchManager's first deploy). The review round added:
- **Rewards MBR top-up.** `createInstantAsaDisbursement` accepts exactly `MinDisbursementsMBR +
  UserAllocationMBR` (67,000), but Rewards' minimum balance rises by 70,200 per disbursement (the
  `DisbursementDetails` box costs 44,900, not 41,700). Rewards is unchanged. `devBuy()` records
  `rewards.address.minBalance` before the opt-in, tracks what it paid (the opt-in amount if it opted Rewards in,
  plus `DevBuyDisbursementMbr`), and after the disbursement pays the shortfall (growth − paid) if any, after
  asserting `free() ≥ reserved + shortfall` (`reserved = freeBefore + bounty`), so an underpayment fails with
  errLmpy rather than an AVM min-balance error. The top-up is 3,200 µALGO today and 0 once Rewards is fixed.
- **Disclosure.** `devRewards` (the Rewards app id at launch time; 0 without a dev buy) is in the `Launch` record
  and `LaunchEvent`, between `devUnlock` and `devDisbursement`. The record grows by 8 bytes; `createToken`
  charges its MBR dynamically.
- Tests (`launch/launch-hooks.e2e.spec.ts` › LaunchManager › dev buy): the Rewards fixture holds exactly its
  100,000 account minimum; manager→Rewards payments are exactly `[100,000, 67,000, 3,200]` (`[67,000, 3,200]`
  when Rewards already holds the token); Rewards' balance and minBalance both grow by 170,200 and its spare is
  unchanged; exact − 1 fails the top-up check and exact − 3,201 the up-front check (both errLmpy); cap boundary
  at the smallest `edge` with `floor(S·edge/1e4) ≥ tokens` (`edge − 1` errLmdv, `edge` passes); gated launch
  `[GatedFee, AntiSnipe, LaunchTax]` + dev buy at the pool fee; repointing Rewards A → B with `setDevBuy`
  (new record/event name B, the old record still names A). On the old code each dev-buy launch left Rewards
  3,200 µALGO below its minimum balance and the outer transaction was rejected.

**A44. ImpactFeeHook returns `max(running, own)` (hook change; OPEN-DECISIONS #21, option b; amends A35).**
BeforeSwap/Quote return `SetFee` with `max(ctx.feeBps, fee)`. The hook never lowers the pool's base fee or a fee
set by an earlier hook (e.g. AntiSnipe), so its stack position no longer matters against fee-raising hooks. A
`minFeeBps` below the pool's base fee no longer discounts small trades (set the base fee to the wanted floor); a
later discount hook (GatedFee) can still lower the result. Tests: `hooks/legacy-hooks.e2e.spec.ts` "#21" (two
tests; the old hook lowered 800 → 260 after a fee-raising hook and 300 → 15 under a 300 bps base fee).

**L1-L8. WP3-lvr integration notes (`research/amendments-wp3-lvr.md`).**

| Note | Status |
|---|---|
| L1 `ctx.after` is not refreshed between hooks at one point | decided: documented, no refresh (OPEN-DECISIONS #8; `types.ts`, `hook-interface.ts`); VolatilityFeeHook works around it |
| L2 `BinHookState.binStep` at byte offset 32 | confirmed by the BinEngine |
| L3 opcode budget on hooked native swaps | resolved on the hook side (A33) |
| L4 lazy custody must fund its extra inners | since A42 the caller's group pays; SDK fee buffer per lazy-custody pool (ARCHITECTURE §12.1; OPEN-DECISIONS #25 open) |
| L5 co-locate `(escrow, Tinyman)` locals for escrow-sent app calls | handled by the SDK's Local State repair |
| L6 lvr §3.12 (8) premise superseded by the 256-inner pool | closed |
| L7 keeper tip definition | adopted (A33), then removed with the tip (A42) |
| L8 the Vault can exhaust its 700 before the first hook checkpoint | fixed: `runHooks` takes the `HookTailBudget` checkpoint on the skip path of a hooked pool (OPEN-DECISIONS #3; core-v2 `budget > (L8)`) |

**Index of §10 amendments.**

| IDs | Area | Where |
|---|---|---|
| A1-A10 | WP0 interfaces, guard, pinning, pair index, P0 | above |
| A11-A23 | WP1 core M1-M5 (read quota, budget, curve slot, launch, externals, keyreg) | above; details in `amendments-core.md` |
| A24-A28 | Vault fixes (curve exits, custody re-mark, mint valuation, clips, in-kind exit) | above |
| A29-A30 | AkitaRouterPlugin | above |
| A31 (B1-B5) | BinEngine | above |
| A32-A35 | hooks (GatedFee, BackrunArb, VolatilityFee, AntiSnipe, legacy) | above |
| A36, A36.1 | LaunchManager; dev buy (OPEN-DECISIONS #20) | above |
| A37-A40 | deploy-blocking decisions: custody valuation, bins fee cap and value floor, catalog and deploy order | above; `OPEN-DECISIONS.md` (Decided) |
| A41-A44 | non-blocking decisions: GatedFee daily cap, backrun without tip/tank, dev buy hardening, ImpactFee max | above; `OPEN-DECISIONS.md` #17-#24 |
| L1-L8 | WP3-lvr notes | above; `amendments-wp3-lvr.md` |
| — | Decisions still open | `research/OPEN-DECISIONS.md` |
