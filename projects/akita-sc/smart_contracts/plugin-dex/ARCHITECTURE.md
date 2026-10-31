# PluginDex v2: architecture as built

PluginDex v2 is a hooked AMM **Vault** with pluggable pricing curves, version-pinned hook stacks, external
positions, launch pools, and an ARC-58 router on top. This file describes the system **as built** at the end of
the stabilize round (2026-10-02) and the deploy-blocking decisions (2026-10-03). If this file and the code disagree, the code is right.

- Design and reasons: `research/FINAL-SPEC.md`. Its §10 (A1-A40 and the track amendments) overrides the earlier
  sections and is the complete amendment index.
- Detailed track notes: `research/amendments-core.md`, `research/amendments-wp3-lvr.md`.
- Decisions: `research/OPEN-DECISIONS.md` (#1-#16 decided 2026-10-03; #14a and #17-#25 still open).

## 1. Components

Sizes are the approval program bytes from `smart_contracts/artifacts/**/*.arc56.json` (`byteCode.approval`);
every clear program is 4 B. The size gate (`size.test.ts`) holds the Vault to 15,000 B and every other
plugin-dex app to 14,000 B. The AVM limit is 16,384 B (approval + clear, `extraProgramPages` 7).

| Component | File | Approval B | Mutability / admin | Holds |
|---|---|---|---|---|
| **PluginDex (Vault)** | `contract.algo.ts` | 13,999 | immutable, AVM 13; admin = DAO wallet | unissued LP of every fungible pool, locked launch LP, box MBR; auth address of every pool escrow |
| Pool `Escrow` (1 per pool) | `../escrow/contract.algo.ts` | 185 | child app, rekeyed to the Vault at creation | reserves, protocol fees, locked launch funds, receipt ASAs, in-flight swap amounts |
| **BinEngine** (curve app) | `curves/bins/engine.algo.ts` | 7,196 | immutable, AVM 13; no admin | bin and position boxes (MBR only), never pool funds |
| ImpactFeeHook | `hooks/impact-fee.algo.ts` | 459 | immutable; params fixed at create | nothing |
| SwapTaxHook | `hooks/swap-tax.algo.ts` | 494 | immutable; owner withdraws | tax accruals |
| VolatilityFeeHook | `hooks/volatility-fee.algo.ts` | 1,908 | immutable; params fixed at create | per-pool state box MBR |
| BackrunArbHook | `hooks/backrun-arb.algo.ts` | 3,317 | immutable code; admin = DAO wallet (registration, kill switches) | registration box MBR (no gas tank: the caller pays, OPEN-DECISIONS #19) |
| GatedFeeHook | `hooks/gated-fee.algo.ts` (identity: `utils/principal.ts`) | 4,117 | immutable code; DAO sets gate slots, pass TTL, daily discounted-swap cap, default schedule | pass and schedule box MBR |
| AntiSnipeFeeHook | `hooks/anti-snipe-fee.algo.ts` | 939 | immutable; no admin | config box MBR |
| LaunchTaxHook | `hooks/launch-tax.algo.ts` | 1,134 | immutable; per-pool owner claims | tax accruals (quote asset) |
| ConsensusKeyregHook | `hooks/consensus-keyreg.algo.ts` | 841 | immutable code; admin = DAO wallet (keys, tank) | fee tank, key box MBR |
| LaunchManager | `launch/launch-manager.algo.ts` | 3,578 | immutable code; admin = DAO wallet (fees, bounty, hook ids, dev-buy policy) | escrowed graduation bounties, launch records |
| VenueRegistry | `venues/registry.algo.ts` | 217 | immutable code; admin = DAO wallet | adapter table (global state) |
| TinymanV2Adapter | `venues/tinyman-v2-adapter.algo.ts` | 1,247 | immutable, permissionless | nothing |
| **AkitaRouterPlugin** | `../arc58/plugins/akita-router/contract.algo.ts` | 3,790 | immutable, adminless ARC-58 plugin (version 0) | leg escrow `E`: MBR and opt-ins only |

Test-only apps live in `tests/` (MockDexHook modes 0-17, MockCurve modes 0-17, MockLender, MockValuator,
MockVenueAdapter, RecordingDexHook, MockUpdatableHook(V2), MockWallet(Factory), MockSocialImpact and others).

**Deploy order** (`scripts/lib/immutable-catalog.json`, enforced by `scripts/lib/immutable-deployment.ts`;
FINAL-SPEC §10 A40). v2 replaces v1 under the `PluginDex` key and is never deployed beside it:

1. PluginDex (`version`, `admin`)
2. BinEngine (`vault`) and the 8 production hooks (`dex` plus their parameters)
3. VenueRegistry
4. TinymanV2Adapter
5. AkitaRouterPlugin (`version`, `dex`, `registry`; `plugin: true`, while the Vault entry is `plugin: false`)
6. LaunchManager (`vault`, `admin`, `antiSnipeHook`, `launchTaxHook`)

Each dependency ID is checked against its compiled program hash before a receipt is written. The admin
approvals are printed, not sent (§12 "Deployment").

## 2. Accounts and custody model

**The Vault is the only app that moves pool funds.** Each pool's funds sit in its own child `Escrow` account,
rekeyed to the Vault. A custody hook gets that escrow flash-rekeyed to it for exactly one call. The Vault then
requires the rekey back and books the measured balance change through the custody guard (§6).

Global state: `version`, `admin`, `pool_cursor`, `protocol_fee_bps` (≤ 5,000 bps of the LP fee), `treasury`.

| Box | Map | Size |
|---|---|---|
| `p` | `poolId → PoolInfo` (booked reserves, external totals, virtual offsets, locked amounts, LP supply, fees and caps, cached curve price and active id, flags) | 281 B |
| `h` | `poolId → HookConfig[]` (app, pinned version, points, perms, flags); only for hooked pools | 2 + 40 B per hook |
| `e` | `poolId → ExternalSlot[]`; read only when `PoolInfo.externalSlots > 0`, never by swaps | 2 + 96 B per slot |
| `x` | `PairKey → uint64[]`: the first 64 pools of a pair (§10 A9); later pools are created but not indexed | |
| `a` / `t` / `v` | hook / curve / valuator approvals (version-pinned) | |

**Escrow identity.** At every rest point, for each side X:

```
holding(escrow, X) = reserveX − externalX + protocolFeesX + lockedX (+ unsynced surplus)
```

ALGO is measured as `balance − minBalance`, so an MBR increase counts as a loss. The specs assert this
identity (`assertEscrowIdentity` in `tests/fixtures/plugin-dex.ts`).

**Every trust decision is frozen at pool creation.** Hooks, the curve app and valuators are called with
`rejectVersion = pinnedVersion + 1`. An updated app can no longer be called by pools that pinned an older
version (the AVM fails with `app version (n) >= reject version (n)`). Fee ceilings (`maxFeeBps`,
`custodyFeeBps`, `maxHookFeeBps`), clips and caps are copied into the pool. Revoking an approval affects only
later pools.

## 3. Pools

`createPool(payment, assetA, assetB, config, hooks, externals)` checks fees, the curve, the hooks (approval,
permission subset, version, flags) and the external slots. It then:

1. creates and funds the escrow, opts it into A, B and every receipt, and rekeys it to the Vault;
2. creates the LP ASA (fungible modes);
3. writes the boxes and the pair index;
4. pays each hook its F6 `funding` and runs AfterInitialize with that hook's own `initData`.

The payer is charged the Vault's measured MBR change plus the escrow funding, Σ funding and `curveMbr`. Any
excess is refunded.

| Kind | Pricing | LP |
|---|---|---|
| Native CP | `out = (net − lpFee)·eOut / (eIn + net − lpFee)` on effective reserves (`e = booked + virtual`); output must stay below the liquid reserve `reserveOut − externalOut` (errPdil) | fungible LP ASA; `MinimumLiquidity` (1,000) never issued |
| Launch (native with virtual offsets) | same math on effective reserves until `graduate` | seed LP locked forever (`lockedLp`) |
| Curve slot | `akitaDexCurve` / `akitaDexCurveFunded` on the pinned curve app | `LpModeFungible` (Vault LP ASA) or `LpModeCurve` (positions live in the curve) |

**Fee rules.** `feeBps ≤ min(maxFeeBps, 1,000)`, `maxFeeBps ≤ 9,000`, `custodyFeeBps ≤ maxFeeBps`,
`maxHookFeeBps ≤ 1,000`. A DynamicFee hook may set the fee up to `pool.maxFeeBps`. HookFee (input side) plus
HookFeeOut (output side, at most one per pool) stay within `maxHookFeeBps`. `protocolFeeBps` of the LP fee is
held outside reserves until the permissionless `collectProtocolFees` sends it to the treasury.

**Swaps.** `swap` and `swapRoute` (1-4 hops, no repeated pool, errPdrt) run BeforeSwap hooks, the math,
AfterSwap hooks, then pay out (HookFeeOut first, to the hook).

**Quotes.** `quote`, `quoteRoute` and `tryQuoteRoute` run the same body without committing. They call Quote
hooks instead of BeforeSwap and take an unauthenticated `swapper` and `data`, so a hook prices a quote exactly
like the swap.

**Wallet hint (principal resolution, docs/principal-resolution/PHASE-0-SPEC.md §6.12, 2026-10-04).** `swap`,
`swapRoute`, `quote`, `quoteRoute` and `tryQuoteRoute` take a trailing `wallet: uint64` (0 = acting as itself).
The Vault stays DAO-agnostic: it copies the value into `HookContext.wallet` (right after `callerApp`) unverified
and every liquidity, initialize and poke point gets 0. Hooks that need identity verify it themselves:
`resolvePrincipalFromDexCtx` at BeforeSwap (after `requireDexCaller`), only the quote-only
`thirdPartyPrincipal` at Quote. The AkitaRouterPlugin forwards `windowHint(wallet)`; the LaunchManager's dev
buy passes 0. `tryQuoteRoute` returns 0 instead of reverting on an unusable route (missing, paused or closed
pool, unknown asset, no liquidity, uninitialized launch).

**Liquidity.**
- `addLiquidity` (and `addLiquidityCurve`) first syncs and revalues on every pool with liquidity, then mints.
  JIT liquidity therefore cannot capture a donation or a pending mark. A native mint prices each slot at
  `max(book, valuator)` (§10 A26).
- `removeLiquidity` syncs and revalues first only on **native** pools. Curve-pool exits never call `Settle`
  (§10 A24).
- `emergencyRemoveLiquidity` works only on paused pools. It runs no hooks, sync, revalue, valuator or curve
  call, so it is the guaranteed exit for every fungible pool (curve pools included, pro-rata of booked
  reserves).
- `removeLiquidityCurve` on a paused pool skips hooks but still calls the curve's `Remove`.

**Maintenance (permissionless).** `sync` books escrow surplus as a donation (an empty pool fails with
errPdil). `revalue` re-marks external slots. `poke(poolId, i, data)` runs one Poke hook on an unpaused pool.
`graduate` finishes a launch.

**Admin (DAO wallet).** `setAdmin`, `setProtocolFee`, `setHookApproval`, `setCurveApproval`,
`setValuatorApproval`, `setPoolPaused`, and `writeDownExternal` (paused pools only).

## 4. Curve slot and Vault checks

A curve app implements `akitaDexCurve(req: CurveRequest): CurveResult` and the funded variant
`akitaDexCurveFunded(pay, req)` for Init and Add. The ops are Init, Swap, Quote, Add, Remove and Settle. The
Vault sends the booked reserves, the running fee, `maxFeeBps` (§10 A5) and `protocolFeeBps`, and checks every
result. All failures are errPdcv unless noted.

| Op | Vault check |
|---|---|
| Init | reserves (0, 0); the snapshot price and active id are cached |
| Swap / Quote | input consumed exactly; `0 < out < reserveOut`; `lpFee ≤ ceil(in·maxFeeBps/1e4)`; `floor(lpFee·protocolFeeBps/1e4) ≤ protocolFee ≤ lpFee`; returned reserves equal the Vault's booking; output within the price band at the cached spot `P0` (+1 unit tolerance); new price on the trade's side. A committed Swap with `out = 0` fails; a Quote may return 0 |
| Add | `used ≤ deposits`, `mbrUsed ≤ mbr`, aggregate = reserves + used, `P1 == P0`; fungible: LP mint bound |
| Remove | `out ≤ reserves`, aggregate = reserves − out, `P1 == P0`; fungible: `shares == lpAmount`, `out ≤ lp·reserve/S` |
| Settle | aggregate matches the delta; for a mixed custody delta, the price moved in the delta's direction |

A curve can misprice only inside the band. The user's `minAmountOut`, the fee cap and the curve's audit,
immutability and pin cover that remaining range.

**Curve obligations.**
- Return with at least 100 opcodes of pooled budget left (§10 A14).
- Reject an infeasible Settle with errPdki (§10 A15).
- Be able to place any donation while it has booked reserves; otherwise adds (never exits) block (§10 A24).

**BinEngine** (Liquidity Book style, `research/bins.md` plus amendments B1-B4) meets these:
- B1: a donation goes to the active bin, or to the nearest occupied bin on its side.
- B2: an add into an occupied bin takes only that bin's composition.
- B3: `maxBinsPerSwap ≤ 128`.
- B4: reported shares round up per bin.
- Init rejects `maxFeeBps > MaxPoolFeeBps = 1,000` (errBnFc, §10 A38). Every per-bin fee and the custody Settle fee are capped at the
  engine's 10% (`min(MaxFee, maxFeeBps × 1e5)`), so a bins pool cannot declare a DynamicFee or
  `custodyFeeBps` cap that the engine would silently charge at 10% (OPEN-DECISIONS #13).
- Init rejects `minBinShares < MinBinSharesFloor = 2^32` (errBnMs, §10 A39). Shares are value × 2^32 in Y base units, so every new bin is
  worth at least one Y base unit and each dust bin placed to exhaust `maxBinsPerSwap` has a price. The SDK
  default is one whole Y token per new bin (OPEN-DECISIONS #14); for Y with ≥ 10 decimals that overflows
  uint64 and must be capped (§12.1).
- The floor holds per position-bin stake, not only at bin creation. An add into an occupied bin must leave
  the position a stake there worth ≥ `minBinShares` (else errBnZs). A partial Remove that would leave a
  stake worth less sweeps that bin's whole stake (it never reverts; a partial Remove reads the binStep
  table box for this). So every occupied bin stays worth ≥ the floor; a 100% Remove is always allowed.
  (Built as OPEN-DECISIONS #14a; awaiting team confirmation.)
- **Callers split trades into ≤ `maxBinsPerSwap`-move slices; a Quote of 0 means split.** A swap that needs
  more moves than `maxBinsPerSwap` reverts and its Quote returns 0 (crossed bins stay occupied). Routers and
  the SDK quote, and on 0 retry with smaller slices sent as consecutive calls, so dust bins cost liveness
  and fees, never funds.
- `closeChunk` requires every bin record in the chunk to be zero.
- Its hook data is the 40 B `BinHookState {startId, endId, binsCrossed, va, binStep}`; `binStep` is at byte
  offset 32.
- Foreign box reads are enabled, so routers, hooks and the SDK read bins without an inner call.

## 5. Hooks: interface

Every hook implements `akitaDexHook(dex, hookIndex, ctx: HookContext): HookResult` (`hook-interface.ts`) and
should start with `requireDexCaller`.

| Point | Bit | | Permission | Bit | Grants |
|---|---|---|---|---|---|
| AfterInitialize | 1 | | Custody | 1 | escrow flash-rekeyed to the hook for its call |
| BeforeAddLiquidity | 2 | | DynamicFee | 2 | `SetFee` at BeforeSwap/Quote, ≤ `pool.maxFeeBps` |
| AfterAddLiquidity | 4 | | HookFee | 4 | a fee on the swap input, paid to the hook at BeforeSwap |
| BeforeRemoveLiquidity | 8 | | HookFeeOut | 8 | bps of the swap output, paid to the hook (one per pool) |
| AfterRemoveLiquidity | 16 | | External | 16 | requires Custody; may change the receipts of slots naming it |
| BeforeSwap | 32 | | | | |
| AfterSwap | 64 | | | | |
| Quote (no custody, no writes) | 128 | | | | |
| Poke | 256 | | | | |

- **Install validation.** Up to 8 hooks per pool, no duplicates. Perms must be a subset of the approval. A
  hook with any pricing permission that subscribes to BeforeSwap must also subscribe to Quote. LazyCustody and
  External need Custody.
- **Fee fields** are honoured only at BeforeSwap and Quote (errPdhm elsewhere) and ignored at Poke.
- **Lazy custody** (`HookFlagLazyCustody`): the hook is first called without custody and is rekeyed and
  called again only if it returns `HookResultRequestCustody`. The skip path costs 1 inner transaction. A lazy
  hook that requests custody adds at least 2 inners (the escrow rekey and the custody call) plus whatever its
  custody call issues. BackrunArbHook issues them all at fee 0 and the caller's group pays (OPEN-DECISIONS
  #19), so callers budget a fee buffer for them (§12.1).
- **F6**: per-install `funding` (µALGO paid before AfterInitialize) and `initData` (`ctx.data` at
  AfterInitialize, for that hook only). Multi-tenant hooks configure each pool this way.
- **Context.** `ctx.reserveIn/Out` are effective reserves, recomputed for each hook. `ctx.after` is set once
  per point (after the math), **not** refreshed between hooks at the same point (amendment L1, decided as
  documented: OPEN-DECISIONS #8, `HookContext.after` in `types.ts`). On curve
  pools `ctx.before` has `liquidity = flags = 0` (§10 A4).
- **Hook-author obligations**: escrow-sent inners use `fee: 0` and the last one rekeys back to the Vault;
  Quote never writes or reverts; External hooks donate their floor-rounding dust; never revert the user's
  operation when a skip will do; do not rely on `ctx.after` after an earlier custody hook at the same point
  (read live reserves instead).

## 6. Custody guard, layer by layer

For each custody call (`custodyCall`, §4.6):

1. **Snapshot**: liquid A and B, plus the receipt units of **every** external slot.
2. **Flash rekey**: a zero payment from the escrow with `rekeyTo` = hook, then the pinned hook call. The
   Vault is on the call stack, so the hook cannot reenter it.
3. **Rekey-back**: `escrow.authAddress == Vault`, else errPdrb.
4. **Slot layer** (§10 A20, A25):
   - Only the slot's own External hook may change its receipt holding (errPdhm).
   - The slot is re-marked with one valuator call (clipped). The revaluation of the units already held,
     `floor(unitsOld·rate) − bookValue`, is booked straight into the reserve and its external part, like
     `revalue`.
   - Only the value of the measured unit change is folded into the side's delta.
   - **Conservative valuation** (§10 A37, OPEN-DECISIONS #4): the Vault reads the live rate `v` and the
     clipped rate `r'`. Units stay booked at `r'`, but when the clip binds against the hook (units leave while
     `v > r'`, or enter while `v < r'`) the guard's delta is reduced by `floor(Δu·|v − r'|)` and that amount is
     booked as a donation. Leaving units are valued at `max(v, r')`, entering units at `min(v, r')`, so a
     hook cannot keep the gap between the live and clipped rate.
5. **Classification** of the signed deltas `(dA, dB)`:
   - both zero: nothing;
   - both ≥ 0: a donation (native: reserves += d; curve: `Settle(donation)`);
   - both ≤ 0 and not zero: errPdki (§10 A1);
   - mixed, native pools: `(e_g + G − fee(G))·(e_l − L) ≥ e_g·e_l` on effective reserves with
     `fee = ceil(G·custodyFeeBps)`, else errPdki. The hook must do at least as well as a trader paying the
     custody fee;
   - mixed, curve pools: the L2 value floor `V(r') ≥ V(r)` at `P0` (errPdki), then the curve's Settle at
     `custodyFeeBps`, then the aggregate and direction checks (errPdcv).
   - A loss may only come out of the liquid reserve (`reserve − external`): protocol fees, locked launch
     funds and in-flight amounts are protected.
6. **Bounds after booking**: `reserveX ≥ externalX` on both sides (errPdki). A slot whose units grew must
   stay ≤ `capBps` of its side's reserve (errPdec).
7. **Result**: fee permissions apply exactly as for non-custody hooks. Then `CustodyEvent` is emitted.

Not covered (accepted, FINAL-SPEC §8): a custody BeforeSwap hook can trade ahead of the swapper (the user's
`minAmountOut` and admin approval are the protection); a hook can always revert (pause plus
`emergencyRemoveLiquidity` is the exit); non-value side effects such as keyreg timing.

## 7. External positions (§4.7, §10 A20, A25-A28)

Up to 2 slots per pool, on native non-launch pools only (curve and launch pools fail with errPdex). A slot
names its External hook, a pinned valuator, a side, a receipt ASA (not 0, A or B, no duplicates),
`capBps ≤ 5,000` and per-day markup and markdown clips **≤ 10,000 bps/day** (A27; kept, OPEN-DECISIONS #5;
the SDK defaults to 100 and should warn above 1,000). Book value
`floor(units·rate/1e12)` counts inside `reserveSide`.

**Valuator approval checklist** (`valuator-interface.ts`, OPEN-DECISIONS #6). An approved valuator must be
deterministic and read-only, and must **answer 0 for a receipt ASA with a non-zero clawback or freeze
address**, so `createPool` fails with errPdva. A zero clawback or freeze can never be set again, so the check
at creation holds for the pool's life. The Vault itself does not inspect receipts; this keeps in-kind exits,
including `emergencyRemoveLiquidity`, safe from a receipt that could be clawed back or frozen.

| Mechanism | Behaviour |
|---|---|
| Mark (`clipRate`) | the valuator rate (must be > 0, errPdva) clamped to `[rate − down, rate + up]`, with `band = floor(floor(rate·bps/1e4)·dt/day)`. The band and `rate + up` saturate at 2^64 − 1, so a mark never overflows after a long gap (A27). dt = 0 freezes the rate within a block |
| `revalue` (permissionless) | marks every slot holding units; a gain is a donation, a loss lowers the reserve. The cap does not apply. Empty slots make no valuator call |
| Custody re-mark | see §6 step 4 (A25, A37): the hook cannot take accrued yield, the unit change is valued at `max(v, r')` leaving and `min(v, r')` entering, and a pending markdown does not block a neutral recall while the clip band covers the valuator move |
| Mint (A26) | the inline revalue still books only the clipped mark, but the native mint values each slot at `max(book, valuator)`, so JIT add + remove cannot buy receipts at a stale book. A valuator below the book leaves the mint at the book |
| Exit in kind (A28) | a remove pays the liquid pro-rata plus `floor(lp·units/S)` receipt units per slot and takes `ceil(bookValue·unitsPaid/units)` off the book. An exit that pays 0 units takes 0 value. One `ExternalExitEvent` per slot with units. **The LP must be opted into every receipt with units > 0** |
| `writeDownExternal` | admin, paused pool only: `rate = min(book, valuator)`, no clip; valuator 0 fails errPdva |
| Swaps | never read `e:`; output must stay below `reserveOut − externalOut` |

## 8. Launch pools and LaunchManager

### 8.1 Vault side (§4.4, §10 A16-A18)

A launch pool is a native pool with virtual offsets. It needs `graduationThreshold > 0` and a non-zero
quote-side offset; a pool without offsets must have threshold 0 (errPdlb).

- `initializeLaunch(tokenDeposit, reserveDeposit, poolId)` (creator only, once, unpaused):
  - adds S tokens to the token reserve and locks the graduation reserve M (`locked_t`);
  - sets `lpSupply = lockedLp = sqrt(eA·eB)` and transfers no LP;
  - runs AfterAddLiquidity hooks.
- **While bonding**, swaps price on effective reserves; add, remove and emergency remove fail with errPdlb.
  Swaps before `initializeLaunch` fail with errPdlb.
- `graduate(poolId)` is permissionless once the real quote reserve reaches the threshold. It runs no hooks,
  no sync and no inner transactions, and keeps the price exact in every state:
  - `target = ceil(r_q·e_t/e_q)`;
  - if `target ≤ r_t + M`: the token reserve becomes `target` and the rest stays locked forever;
  - otherwise all of M joins the reserve and the quote surplus `r_q − ceil((r_t+M)·e_q/e_t)` moves to
    `protocolFees_q` (A17). It reaches the treasury only through `collectProtocolFees`.
  - The offsets are zeroed and the pool is plain CP from then on; `lockedLp` stays in `lpSupply`.

### 8.2 LaunchManager (`launch/launch-manager.algo.ts`)

An ordinary caller of the Vault (not a hook). A launch takes two groups, because the token's asset id must be
known before the group that references its pair-index box.

| Method | Who | What |
|---|---|---|
| `create(vault, admin, antiSnipeHook, launchTaxHook)` | deployer | treasury = admin, fee and bounty 0, dev buys off |
| `setAdmin`, `setFees(launchFee, bounty, treasury)`, `setHooks(antiSnipe, launchTax, gated, gatedFunding)` | admin | future launches only |
| `setDevBuy(rewards, maxBps, minVestSeconds, maxVestSeconds)` | admin | dev-buy policy for future launches: the Rewards app, the cap on tokens out in bps of S (≤ 1,000, immutable; 0 = off), the vesting bounds (errLmpr if `maxBps > 1,000` or `min > max`) |
| `createToken(payment, TokenParams) → launchId` | anyone | mints a fair-launch ASA (no manager, reserve, freeze or clawback; whole supply held by the manager) and records a pending launch |
| `launch(payment, launchId, LaunchParams, maxLaunchFee, maxBounty) → {launchId, asset, poolId}` | the token's creator, once | **fails errLmcp if the current launch fee or bounty exceeds the caller's caps**. Validates `0 < S < T`, offsets > 0, `M ≥ ceil(S·vB/(S+vB))`, `0 < G ≤ vA·S/vB`, `feeBps ≤ 1,000`, `startFeeBps ≤ 9,000`. Pays the fee to the treasury, creates the ALGO-quoted pool, `initializeLaunch`es it, runs the optional dev buy, escrows the bounty and refunds the rest |
| `graduate(launchId)` | anyone, once | calls `PluginDex.graduate` if still bonding and pays the bounty to the caller. If the pool was already graduated directly, it refunds the bounty to the creator, or to the caller when the creator's account cannot receive it. **Then, best effort, it calls `collectProtocolFees`** when there is something booked and the Vault treasury can receive every side |
| `getLaunch`, `opUp` | anyone | read; reference/budget carrier |

Pool config set by `launch`: `curve 0`, `quoteIsA = true` (ALGO), `maxFeeBps = max(startFeeBps, feeBps)`,
`custodyFeeBps = feeBps`, `maxHookFeeBps = max(buyTax, sellTax)`. The hook stack is
`[GatedFee?, AntiSnipe, LaunchTax?]`, each configured through F6. The AntiSnipe `exempt` is the
LaunchManager itself.

**Dev buy** (FINAL-SPEC §10 A36.1). With `LaunchParams.devBuy > 0`, `launch` swaps that many µALGO into the
pool through `PluginDex.swap` right after `initializeLaunch`, in the same app call: the caller is the exempt
LaunchManager at e == 0, so it pays the pool fee and the creator's buy tax but no anti-snipe fee. It fails
errLmdv when dev buys are off (`rewards` or `devBuyMaxBps` 0), when `devVestSeconds` is outside the DAO bounds,
or when the tokens out exceed `devBuyMaxBps·S/1e4`; errLmpy when the payment does not also cover the buy, the
Rewards opt-in (unless Rewards already holds the token) and the disbursement MBR. The tokens go to a
never-expiring Rewards `createInstantAsaDisbursement` for the creator that unlocks at
`latestTimestamp + devVestSeconds`; the creator claims with Rewards `claimRewards` after that. The LaunchManager
measures Rewards' minimum balance around the opt-in and disbursement and pays any growth beyond what those
methods took (3,200 µALGO today: Rewards' `MinDisbursementsMBR` understates its box; errLmpy if the payment
cannot cover it), so a dev buy never draws on Rewards' own ALGO (OPEN-DECISIONS #20, FINAL-SPEC §10 A43). `LaunchEvent` and the `Launch` record disclose `devBuy` (event only), `devTokens`,
`devUnlock`, `devRewards` (the Rewards app holding the tokens) and `devDisbursement`.

## 9. Hooks catalogue

| Hook | Points | Perms / flags | Configuration and behaviour |
|---|---|---|---|
| **ImpactFeeHook** | BeforeSwap, Quote | DynamicFee | `fee = min + slope·amountIn/reserveIn`, capped at its max; overflow-safe; other points pass. Returns **`max(running, fee)`** (OPEN-DECISIONS #21, FINAL-SPEC §10 A44): it never lowers the pool's base fee or a fee set by an earlier hook, so stack order does not matter against fee-raising hooks. A `minFeeBps` below the pool's base fee no longer discounts small trades (set the base fee to the floor you want); a later GatedFee can still lower the result. One deployment per parameter set |
| **SwapTaxHook** | BeforeSwap, Quote | HookFee | `taxBps` of every input (≤ the pool's `maxHookFeeBps`); single-tenant; owner `optIn`/`withdraw` |
| **VolatilityFeeHook** | BeforeSwap, AfterSwap, Quote, Poke | DynamicFee | LB v2.1 variable fee `A·v²` on realized volatility. Per-pool box via permissionless `initPool(mbr, poolId)`. Returns `max(running, min(running + varFee, max_fee))`: **max_fee clamps only its own contribution and never lowers a fee set earlier**. Only AfterSwap advances the accumulator; **Poke only seeds an unseeded box or refreshes `lastPrice`/`lastId`** (never `tLast`, the reference, `vRef` or `vAcc`), so pokes cannot suppress the fee. Bins pools use `|Δid|·binStep` from the curve's hook data. Pools need `maxFeeBps ≥ max_fee` |
| **BackrunArbHook** | AfterSwap, Poke | Custody, LazyCustody | Arbitrages the pool against the Tinyman v2 pool of its pair (inlined venue library). Admin `registerPool(poolId, minSurplusA, minSurplusB, maxTradeBps)` for native, non-launch, slotless pools. Trades only when `surplus ≥ guardFee + minSurplus`. **No keeper tip, no gas tank, no rebate** (OPEN-DECISIONS #19, A42): every inner it issues is fee 0, op-ups included (group credit), so the swapper's or poker's group pays for the whole arbitrage path and all of the surplus above the guard fee stays with LPs. Callers add a fee buffer of `BackrunMaxExtraInners` (11) × min fee per backrun pool (§12.1). Never reverts the user's swap |
| **GatedFeeHook** | AfterInitialize, BeforeSwap, Quote | DynamicFee | Per-pool immutable FeeSchedule from F6 `initData` (or the DAO default); funding = schedule box MBR. Hot path reads two boxes (`p‖ctx.caller`, `s‖poolId`) and only lowers the fee (floor, max discount ≤ 90%). FeePass (power, impact, gate bits, TTL 1 h-7 d, default 1 d) keyed by **principal** (§6.12): `ctx.caller` without a hint; with `ctx.wallet` the verified principal at BeforeSwap (`resolvePrincipalFromDexCtx`, strict: an invalid hint reverts the swap, except that inside an app call a hint that is not a wallet of the hook's factory is priced as hint 0, i.e. `ctx.caller`, so router swaps of non-Akita ARC-58 wallets pay the full fee instead of reverting) and the at-rest `thirdPartyPrincipal` at Quote. Wallet users manage their pass through **GatedFeePassPlugin** (`arc58/plugins/gated-fee-pass`, pinned to one hook; key = the window's principal; forwards `windowHint(wallet)`). Only the principal opens its pass (`openPass(mbr, key, measure, gateArgs, wallet)`, `key == principalOf(F, wallet).principal`, errGfau); refresh/close of a live pass by the key, the funder or the key's principal by hint; `refreshFromGate` asserts `Gate.mustCheckFor(gateCtx(p))` (`gateCheckCtx`). Gate bits are measured with `Gate.checkFor(ctx)`. No EscrowFactory registry read (`hooks/shared/origin.ts` deleted). **Daily cap** (OPEN-DECISIONS #18, A41): at most `maxDiscountedSwapsPerDay` (default 500, DAO-settable, 0 = unlimited) discounted swaps per pass per UTC day; past the cap it prices at the incoming fee (never reverts). Only a BeforeSwap that actually lowers the fee counts; Quote reads the same counter without writing (quote == swap). The count survives refresh, and `closePass` fails with errGfdy on a day the pass took a discount, so close-and-reopen cannot reset it. Per principal (one pass and one count across a wallet's escrows); a route counts once per gated hop, so `quoteRoute` can overstate the discount when the cap is hit mid-route. `PassMbr` 47,700 µALGO (80-byte pass); `getDiscountedSwapsToday(key)` |
| **AntiSnipeFeeHook** | AfterInitialize, BeforeSwap, Quote (+ AfterAddLiquidity for FirstLiquidity) | DynamicFee | Linear or halving decay from `startFeeBps` (≤ 9,000) to `endFeeBps` (≤ 1,000) over ≤ 100,000 rounds; returns `max(running, decay)`. An unstarted clock starts at the first BeforeSwap. `exempt` (the creator) pays the running fee at e = 0. Funding = config box MBR. Pools need `maxFeeBps ≥ startFeeBps` |
| **LaunchTaxHook** | AfterInitialize, BeforeSwap, Quote (+ AfterSwap when sell tax > 0) | HookFee (buy tax) and/or HookFeeOut (sell tax) | Multi-tenant; taxes ≤ 500 bps each, paid in the quote asset; `untilRound` sunset; owner `claim`, and `close` after the sunset. Funding = box MBR + quote opt-in. Pools need `maxHookFeeBps ≥ max(buy, sell)` |
| **ConsensusKeyregHook** | Poke | Custody, LazyCustody | Admin sets per-pool keys and an operator. The operator's `poke(poolId, i, [1])` / `[0]` takes the escrow online / offline; anyone else's poke is a no-op (1 inner). The 2 ALGO incentive fee is pre-donated from the hook's tank only when the escrow is not yet eligible. Rewards arrive as surplus and `sync` books them |

The approval must grant at least the perms listed. The SDK and LaunchManager build the installs.

## 10. Router and venues

### 10.1 AkitaRouterPlugin

The router is an immutable, adminless ARC-58 plugin. One outer plugin call does the whole swap in inner
transactions while it holds the flash-rekeyed spending account `S`.

- **ABI.** `create(version, dex, registry)`, `init(payment)` (creates the leg escrow `E` once),
  `optInLegEscrow(payment, assets)`, `opUp()`, `swap(wallet, rekeyBack, assetIn, assetOut, minAmountOut,
  flags, legs)`, `swapBest(wallet, rekeyBack, assetIn, assetOut, amountIn, minAmountOut, flags, chunks,
  toleranceBps, candidates)`. Limits: 4 legs, 3 segments per leg, 4 candidates, 4 chunks.
- **Entry checks.** `S = getSpendingAccount(wallet)`, `S ≠ E`, `auth(S) == router` (errRtcu), `flags == 0`.
  DIRECT custody (`FlagAllowDirect`) is reserved and reverts with errRtdi.
- **Native segments.** `PluginDex.swapRoute` is **sent as S**, so hooks see `ctx.caller == S`. The deposit
  comes from the current holder (S or E). Output goes to S on a leg's last segment, else to E. `swapBest`
  quotes native candidates with `tryQuoteRoute(swapper = S)`, also sent as S. Both pass `windowHint(wallet)` as
  the trailing wallet hint (§6.11/§6.12).
- **Adapter segments, SANDBOX custody only.** The input moves to E, E is flash-rekeyed to the pinned adapter,
  and then:

  | Check | Error |
  |---|---|
  | E rekeyed back to the router | errRtrb |
  | E's min balance unchanged (no opt-ins added or closed) | errRtal |
  | `in1 + amount ≥ in0` (spent ≤ amount) and `in1 ≤ in0` | errRtos |
  | `out1 ≥ out0` | errRtsl |
  | ALGO not lower on an ASA/ASA segment | errRtal |

- **Unspent input.** `unspent = in1 + amount − in0` is refunded from E to S. **Partial-fill rule:** the
  refund happens only when S can receive the input (ALGO, or S opted in). Otherwise the adapter must fill the
  whole input (errRtsl). In practice an intermediate segment must fill fully unless S holds that asset.
- **Finish.** The aggregate guard on S (input spent ≤ Σ amountIn, output ≥ `minAmountOut`, no ALGO leak on
  ASA/ASA routes), then `RouteEvent`. The handback asserts `getSpendingAccount(wallet) === S` (errRtcu) and
  rekeys the **cached** S, never a re-read (stabilize fix).
- **`swapBest`.** Per chunk it quotes every candidate, executes the best, and enforces the **quote promise**:
  the chunk must deliver `≥ quote − quote·toleranceBps/1e4` (errRtqt).
- **Opt-ins** happen before any snapshot. S is opted into `assetOut` (0.1 ALGO from S). E is opted into each
  adapter asset, paid inline from S once per asset globally, or pre-funded through `optInLegEscrow`.

### 10.2 VenueRegistry and adapters

- **VenueRegistry.** Entries live in global state under `itob(adapterId)` → `AdapterInfo {version, flags,
  innerTxns, opBudget}`, with up to 63 adapters. `readAdapter` reads one with no inner call and requires
  `AdapterEnabled` and the pinned version. Callers also pass `rejectVersion = version + 1`.
- **Adapter ABI** (`venues/venue-adapter.ts`): `akitaVenueSwap(account, assetIn, amountIn, assetOut,
  minAmountOut, venueData, returnTo)` and the readonly `akitaVenueQuote` (returns 0, never reverts).
  `requireVenueCustody` checks `auth(account) == adapter` and `returnTo == caller app`.
- **TinymanV2Adapter.** Derives the pool on chain from the pair (`venueData` is ignored). A swap is 3 fee-0
  inners (deposit; the Tinyman appl, which carries the handback rekey; the Tinyman payout). Tinyman enforces
  `minAmountOut`. Callers must make the pool account, the Tinyman app, the `(pool, Tinyman)` local, both
  assets and the `(account, assetOut)` holding available.

## 11. Measured costs (LocalNet, 2026-10-02/03)

### 11.1 Creation and read quota (§10 A11)

- **Vault program.** 13,999 + 4 = 14,003 B, which is 5,811 B above 8,192.
- **Create.** `extraProgramPages: 7`, `ceil(5,714/2,048) = 3` empty box refs of write budget, and a fee of at
  least `minFee·(1 + 5,811/10,000)` ≈ **1,582 µALGO** (1,572 measured at 13,902 B).
  `scripts/lib/immutable-deployment.ts` sends 2,000.
- **Every call to the Vault** needs read quota for those 5,811 program bytes plus every box it reads, at
  2,048 B per box ref, pooled across the group:

  | Call reads | Box refs needed |
  |---|---|
  | nothing | 3 |
  | `p:` (281 B; hookless swap) | 3 |
  | `p:` + `h:` with few hooks | 3 |
  | `p:` + `h:` with more hooks, or `p:` + `h:` + `e:` | 4 |

  The hook count at which a 4th ref is needed moves as the Vault grows: it was 4 hooks at 13,902 B, and the
  +14 B L8 fix already pushed one 3-hook swap over a 2 KB boundary. Use `readQuotaEmptyRefs` (or the SDK)
  rather than this table for exact counts.

  Explicit-reference callers add `ceil((len − 8192 + Σ box bytes read)/2048)` refs, empty ones included
  (`readQuotaEmptyRefs` in the fixture). The SDK's access-list builder does this automatically (§12).
- **Inner calls.** The router's inner call to the Vault is covered by the same group-pooled quota.

### 11.2 Opcodes (simulate, `appBudgetConsumed`)

The Vault tops itself up with `ensureBudget(n, GroupCredit)` (fee-0 op-ups paid from the caller's fee
credit) at fixed checkpoints:
- 200 before each hook;
- 150 after a plain hook, 450 after a custody hook;
- 400 after a hook stack, after every curve call and after every valuator call;
- 500 for a surplus-booking inline sync and for each extra route hop;
- 300 per HookInstall in createPool and per in-kind exit slot.

Callers need fee credit, not budget carriers. On a hooked pool that skips a point's stack, `runHooks` still
takes the post-stack `HookTailBudget` checkpoint (L8 fix, OPEN-DECISIONS #3).

| Path | Opcodes | Op-ups |
|---|---|---|
| hookless native swap / addLiquidity / removeLiquidity | 507 / 663 / 537 | 0 |
| hookless initializeLaunch / bonding swap / graduate | 369 / 511 / 283 | 0 |
| hookless curve swap / add / remove (Vault + MockCurve, pooled) | 1,199 / 1,193 / 876 | 0 |
| 2-slot external pool: poke deposit / revalue / removeLiquidity | 2,141 / 1,075 / 2,218 | 0 |
| hookless swap on a hooked 2-slot pool (reads `p:` only) | 672 | 0 |
| ConsensusKeyregHook go-online poke (lazy, incl. hook) | 1,221 | 0 |
| router route 1 (wallet group: ALGO→TKA, 1 native hop) | 2,406 | 0 |
| router route 3 (70% native + 30% Tinyman) | 4,320 | 1 |
| router route 5 (`swapBest`, 4 chunks × 3 candidates) | 11,713 | 0 |

### 11.3 Inner transactions (pooled: 256 per group, not 16 per call)

| Operation | Inner txns |
|---|---|
| hookless native swap | 1 (payout) |
| 3 eager custody hooks at Before/AfterSwap | 13 from the Vault's frame (+1 op-up), 20 with descendants |
| 4 eager custody hooks at Before/AfterSwap (P0 d) | 17 from the Vault's frame, 25 with descendants |
| keyreg go-online poke, lazy | 5 |
| router route 1 / 2 / 3 / 4 / 5 (`G1`, op-ups excluded) | 5 / 7 / 12 / 12 / 26 (3 outer txns each) |
| router route 6 (4 legs × 4 hooked native hops) | 90 inners, 5 outer txns (2 SDK carriers for refs/budget, 0 inners on carriers) |

### 11.4 Depth (inner app-call nesting; AVM limit 8)

| Path | Depth |
|---|---|
| user → Vault → External hook → lender as the escrow → receipt mint | 3 |
| router → Vault → BackrunArbHook → Tinyman → payout (measured, WP3 13) | 4 |

Hooks, curves, valuators and adapters can never call back into an app already on the stack (no reentry), so
the registry is read without a call.

## 12. SDK notes

- **Access lists (akita-sdk `src/simulate/access-list.ts`).** The SDK builds consensus-v41 access lists (16
  entries per txn) from simulate.
  - **Discovery runs at the group's real opcode budget first.** Contracts that op themselves up
    (`ensureBudget`) take a different branch under simulate's extra budget: their op-up inners never run, so
    their fees and resources would be missing. Only a group that really lacks pooled budget is rediscovered
    with extra budget, which sizes the opcode carriers it needs.
  - **Local State repair.** An inner app call that passes an account makes the callee's Local State for that
    account accessible, and the AVM checks it at `itxn_submit`. Simulate does not report this pair, and Access
    has no implicit account × app cross-product, so the SDK parses `unavailable Local State app+addr` (and
    Holding/Account/App/Asset) from the strict failure and adds it. BackrunArbHook's `(Tinyman, pool)` local
    is the motivating case.
  - Extra box refs for read quota are added as identical empty Access entries without double counting
    across validation passes. Carriers are tagged `akta-access-carrier-n` and issue no inner transactions.
- **algokit-utils 9.2.2 legacy references** allow at most 8 per call and do not dedupe asset holdings. The
  test helpers therefore add one `opUp()` reference carrier on hooked pools.
- **Fees.** Callers overpay the outer fee for op-ups and hook inners (`coverAppCallInnerTransactionFees` with
  a `maxFee`). A lazy custody path can add inners that a skip-path simulation never saw; add the buffer in
  §12.1.
- **Per-feature client duties.**
  - Opt the LP into every receipt with units > 0 before a remove on a slot pool.
  - Quote `addLiquidity` on slot pools with `max(book, valuator)` (A26).
  - Prepend `sync()` to curve-pool exits (A24, OPEN-DECISIONS #22; §12.1).
  - Add the chunk refs of the nearest occupied bins for a bins `sync`, add or donation.
  - Split bins trades into ≤ `maxBinsPerSwap`-move slices; a bins Quote of 0 means split (§4).
  - GatedFeeHook passes: EOAs call `openPass`/`refresh`/`closePass` directly with `wallet = 0`; ARC-58 wallet
    users call GatedFeePassPlugin inside their own window (a top-level hinted call reverts errHtop).
  - Do not trust `getPairPools` alone (junk pools can fill the 64-entry index).
  - Refuse AntiSnipe FirstLiquidity installs without AfterAddLiquidity (OPEN-DECISIONS #9).
  - Default external-slot clips to 100 bps/day and warn above 1,000 (OPEN-DECISIONS #5).
  - Bins pools: `minBinShares ≥ 2^32` (default one whole Y token per bin, capped for Y with ≥ 10 decimals;
    §12.1) and `maxFeeBps ≤ 1,000`.
- **Deployment** (`scripts/deploy-immutable.ts`; `--help` prints the order of §1 with each item's
  dependency arguments and approvals).
  - Per-deploy inputs with no catalog default: the Tinyman v2 validator app id (BackrunArbHook,
    TinymanV2Adapter, via `--config`), ImpactFeeHook min/max/slope, VolatilityFeeHook parameters and
    SwapTaxHook owner/taxBps.
  - On MainNet pass the DAO wallet as `admin` (Vault, VenueRegistry, BackrunArbHook, ConsensusKeyregHook,
    LaunchManager); the default admin is the sender.
  - The printed admin steps go through DAO proposals: `setHookApproval` (perms ImpactFee 2, SwapTax 4,
    Volatility 2, Backrun 1, Gated 2, AntiSnipe 2, LaunchTax 12, ConsensusKeyreg 1), `setCurveApproval
    (BinEngine, lpMode 1)`, registry `setAdapter(adapter, (0, Enabled|ExactQuote = 5, 3, 400))`, router
    `init(payment)`, LaunchManager `setFees`/`setHooks`/`setDevBuy`.
  - Leg-escrow opt-ins (OPEN-DECISIONS #23): after router `init`, the DAO pre-funds the popular adapter assets
    with `optInLegEscrow(payment, assets)` (§12.1). Also in the router's catalog notes.
  - Dependency verification compares on-chain programs with the current artifacts, so rebuild nothing
    mid-deploy (or pass `--allow-dependency-mismatch`, which only warns).

### 12.1 SDK and integrator guidance

No PluginDex SDK exists yet. These are the rules it (and any integrator building groups by hand) must follow;
each one comes from a decision in `research/OPEN-DECISIONS.md`.

**1. Fee buffer for backrun and other lazy-custody pools (#19, #25 proposed).** Simulate-based fee coverage
(`coverAppCallInnerTransactionFees`) prices only the path the simulation took. A lazy-custody hook that skipped
under simulate can run at submit (prices moved), and since #19 nobody but the caller's group pays for the extra
inners: an underfunded group fails as a whole, the user's swap included. Add, on top of the simulated fee:

| Pool on the route | Buffer per pool (min fee 1,000 µALGO) |
|---|---|
| BackrunArbHook, lazy install | `BackrunMaxExtraInners` = 11 inners = **11,000 µALGO**: up to 2 sizing op-ups + 2 custody-budget op-ups + the Vault's rekey + the custody call + the Tinyman deposit, appl and payout + 2 Vault checkpoint op-ups |
| BackrunArbHook, eager install | ≤ 11,000 µALGO (it adds fewer) |
| any other lazy-custody hook | ≥ 2 × min fee (the escrow rekey and the custody call) + the inners its custody call issues |
| ConsensusKeyregHook | none: only the operator's poke takes custody and that is deterministic, so simulate already prices it |

A route through two backrun pools adds 22,000 µALGO. The buffer is spent as fee credit, not refunded, so add it
only for pools whose stack has a lazy-custody hook. A backrun simulated as running that skips at submit only
overpays. Test: `hooks/backrun-arb.e2e` "(5) fee buffer" (a skip-path fee is rejected when the backrun fires;
+ 11 × min fee succeeds). #25 proposes this rule as the general lazy-custody guidance instead of an
interface comment (pending Kyle).

**2. `sync()` before curve-pool exits (#22, A24).** Curve-pool removes skip the inline sync, so an LP that exits
without one forfeits its share of unsynced LP-owned surplus (consensus rewards, donations). The SDK prepends
`PluginDex.sync(poolId)` to every remove on a pool with `curve != 0` (native pools sync inline; adds sync
inline everywhere).

**3. Router slicing for bins (#14, A39).** A bins swap that needs more than the pool's `maxBinsPerSwap`
(≤ 128) bin moves reverts, and its Quote returns 0. The SDK treats a Quote of 0 on a bins pool as "split": it
halves the amount until each slice quotes non-zero (each slice ≤ `maxBinsPerSwap` moves) and sends the slices
as consecutive calls in one group, or as separate router legs / `swapBest` chunks (≤ 4 each), with the
`minAmountOut` on the aggregate. Build each slice's resources from its own simulate (the bins it crosses
differ per slice).

**4. Leg-escrow opt-ins (#23, router.md §13.7).** The router's leg escrow E must hold every asset an adapter
segment trades. The first user to route an asset pays E's opt-in inline (0.1 ALGO from S, +2 inners); the SDK
must include that in the user's ALGO and fee estimate when `E` is not opted in. At deploy, after router
`init(payment)`, the DAO pre-funds the popular adapter assets with the permissionless
`optInLegEscrow(payment, assets)` (0.1 ALGO and 2 inners per new opt-in; held assets are skipped and the rest
of the payment is refunded). Recorded in the `AkitaRouterPlugin` catalog notes.

**5. `minBinShares` default (#14).** The SDK default `10^decimals(Y) · 2^32` (one whole Y token per new bin) is
a uint64 and overflows for Y with **≥ 10 decimals** (10^10 · 2^32 ≈ 4.3·10^19 > 2^64 ≈ 1.8·10^19; 9 decimals
gives ≈ 4.3·10^18 and fits). For such tokens the SDK must clamp: the largest floor is `2^64 − 1`, about
4.29·10^9 base units of Y (0.43 of a 10-decimal token, ~4·10^-9 of an 18-decimal token). That is a much weaker
dust defence, so on high-decimal Y pools router slicing (item 3) carries more of the load. Never compute the
default in a type that wraps silently.

## 13. Known limitations

- **L1 (by design, OPEN-DECISIONS #8):** `ctx.after` is not refreshed between hooks at the same point.
  VolatilityFeeHook reads live reserves instead.
- **Curve-managed emergency exit** still calls the curve's `Remove`; fungible pools have a Vault-only exit.
- **A25 under a binding clip:** deposits, and recalls after a binding markdown, can revert with errPdki
  while the clip binds unless the hook donates the gap. (The skim of `Δu·(v − r')` is closed by A37.)
- **Curve-pool exits forfeit unsynced surplus** unless `sync()` runs first (A24).
- **Bins: a donation that lands while one side of the book is empty is captured by the next depositor into
  the active bin** (B1 residual, OPEN-DECISIONS #15). Value that arrives without a deposit (a custody hook's
  donated profit, consensus rewards, a third-party gift) goes to the active bin, or to the nearest occupied
  bin on its side. When no bin on that side holds liquidity, it is parked in the empty active bin, which has
  no shares. The first LP to add into that bin owns all of it and can take it with a full remove in the same
  group; existing LPs do not share in it. It only happens while one side of the book is empty, so LPs who
  want their donations kept should keep liquidity on both sides of the active bin. `closeChunk` cannot
  delete a chunk holding such a parked bin.
- **Receipt ASAs with clawback or freeze** would break in-kind exits. The Vault does not check them; the
  valuator approval checklist does (§7, OPEN-DECISIONS #6), so a valuator that skips the rule must not be
  approved.
- **Bins dust bins** can push a swap past `maxBinsPerSwap` (128). Each one ties up at least `minBinShares`
  of value (≥ 2^32, one Y base unit) for as long as it stays occupied, plus refundable chunk MBR: no
  position can keep a stake below the floor through a partial Remove or a co-add. Callers split trades into
  slices (§4). This costs liveness, not funds.
- **Pair index** holds 64 pools per pair; later pools are unindexed and junk pools can fill it.
- **Router**: SANDBOX only (OPEN-DECISIONS #16). The wallet-side T7 escalation is judged not a concern for
  SANDBOX (#24); test E9 will not be written and its `test.todo` stays only as a marker. A DIRECT router would
  have to revisit it.
- **AntiSnipeFeeHook** cannot see its install's points. A FirstLiquidity install without AfterAddLiquidity
  starts its clock at the first BeforeSwap.
- **GatedFeeHook daily cap** counts once per gated hop, so `quoteRoute` can overstate the discount when a pass
  reaches its cap inside a route (#18); users rely on `minAmountOut`.
- **Lazy-custody fees**: a backrun that skips under simulate can run at submit; callers add the §12.1 buffer.
- **Quote vs swap across rounds** for time-dependent hooks (volatility, anti-snipe, bins variable fee):
  users rely on `minAmountOut`.

## 14. Tests

| Spec | Tests | Covers |
|---|---|---|
| `plugin-dex.e2e.spec.ts` | 23 | v1 behaviours on the v2 Vault |
| `core-v2.e2e.spec.ts` | 41 | P0 spikes, pinning, F6, custodyFeeBps, lazy custody, poke, sync, HookFeeOut, fee cap, quote identity, tryQuoteRoute, inner pool, custody guard, budget |
| `curve-slot.e2e.spec.ts` | 21 | every §4.5 check against MockCurve, Settle under custody, emergency exit, A24 |
| `launch.e2e.spec.ts` | 24 | launch pools, graduation, price continuity (A16-A18) |
| `external.e2e.spec.ts` | 30 | slots, custody re-marks, clips, cap, write-down, in-kind exits, A25, A27, A28, A37 conservative valuation, receipt rule (#6), clip default (#5) |
| `vault-guard.e2e.spec.ts` | 5 | A26 mint valuation, A24 exits |
| `curves/bins/*` | 36 e2e + 9 model | BinEngine through the Vault, B1-B4, fee cap (A38), value floor (A39), fuzz |
| `hooks/*.e2e.spec.ts` | 14 + 16 + 23 + 14 + 6 | volatility, backrun (no tip/tank, fee buffer: #19), gated (incl. ACC-01, daily cap T-16/T-17: #18), keyreg, legacy ImpactFee (`max(running, own)`: #21)/SwapTax |
| `launch/launch-hooks.e2e.spec.ts` | 33 | AntiSnipe, LaunchTax, LaunchManager lifecycle, dev buy (#20: Rewards MBR top-up, cap boundary, gated launch, `devRewards`) |
| `venues/tinyman-v2.e2e.spec.ts` | 16 | Tinyman v2 library and fixture |
| `../arc58/plugins/akita-router/akita-router.e2e.spec.ts` | 44 (+3 todo) | router A-H, G1/G2 measurements, E11 handback. The E9 todo will not be written (OPEN-DECISIONS #24) |
| `../../tests/migration-dry-run.test.ts`, `migration-scripts.e2e.spec.ts` | dry run + LocalNet | catalog, deploy order, dependency verification, postDeploy approvals (A40) |
| `size.test.ts` | 3 | size gates and the `errPdni` release gate |
