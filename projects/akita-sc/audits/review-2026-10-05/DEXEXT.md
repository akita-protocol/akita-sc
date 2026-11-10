# DEXEXT review: PluginDex hooks, LaunchManager, venues, AkitaRouterPlugin, GatedFeePassPlugin

Reviewer slice DEXEXT. Read-only. Base: HEAD e7f174ee plus the uncommitted tree (every file in scope is untracked = new, never deployed).
Verdict: **ISSUES** (1 Critical, 1 Medium, the rest Low/Info).

## Scope

All paths under `projects/akita-sc/smart_contracts/`.

| File | Lines | Notes |
|---|---|---|
| plugin-dex/hooks/anti-snipe-fee.algo.ts | 211 | full |
| plugin-dex/hooks/backrun-arb.algo.ts | 425 | full |
| plugin-dex/hooks/consensus-keyreg.algo.ts | 170 | full |
| plugin-dex/hooks/gated-fee.algo.ts | 597 | full |
| plugin-dex/hooks/impact-fee.algo.ts | 66 | full |
| plugin-dex/hooks/launch-tax.algo.ts | 190 | full |
| plugin-dex/hooks/swap-tax.algo.ts | 50 | full |
| plugin-dex/hooks/volatility-fee.algo.ts | 362 | full |
| plugin-dex/hooks/shared/* | — | does not exist any more (the origin helper moved to `utils/principal.ts`; read the parts the hooks use: `resolvePrincipalCtx`, `thirdPartyPrincipal`, `isGenuineWallet`) |
| plugin-dex/launch/launch-manager.algo.ts | 722 | full |
| plugin-dex/venues/registry.algo.ts | 67 | full |
| plugin-dex/venues/tinyman-v2-adapter.algo.ts | 50 | full |
| plugin-dex/venues/tinyman-v2.ts | 228 | full |
| plugin-dex/venues/venue-adapter.ts | 39 | full |
| arc58/plugins/akita-router/{contract.algo.ts,types.ts,errors.ts,constants.ts} | 538+71+32+18 | full |
| arc58/plugins/gated-fee-pass/{contract.algo.ts,errors.ts} | 111+4 | full |
| Context only (owned by the Vault reviewer) | | `plugin-dex/hook-interface.ts` (62), `plugin-dex/types.ts`, `plugin-dex/contract.algo.ts` (2,162: createPool, validateHooks, callHook, custodyCall, bookDelta, runHooks, swapCore, swap/swapRoute, poke, graduate, initializeLaunch), `escrow/contract.algo.ts`, `scripts/lib/immutable-catalog.json` (hook approvals), research/FINAL-SPEC.md, OPEN-DECISIONS.md |

Compiled TEAL checked for the 13 apps in scope: none accepts UpdateApplication or DeleteApplication on itself (the only `DeleteApplication` occurrences are the `ensureBudget` op-up inners). Tinyman v2 pool-address template re-verified against MainNet (app 1002541853): the derived USDC/ALGO, USDt/ALGO and USDC/USDt addresses are opted in and rekeyed to the AMM address (`review/tmpool.mjs`).

## Prior-finding verification

There were no prior findings filed against these new files. The prior PluginDex findings that constrain hooks:

| ID | Status | Evidence (hook side) |
|---|---|---|
| PD-01 (auth-address checks wrong) | Fixed (moot in v2) | Hooks never get the Vault account. Custody is the per-pool escrow only (`contract.algo.ts:739-741`), with the rekey-back check `escrow.authAddress === Global.currentApplicationAddress`. Custody hooks in scope hand back with `rekeyTo: dex.address` (`backrun-arb.algo.ts:277,415`, `consensus-keyreg.algo.ts:140,160,165`, `tinyman-v2.ts:196,209,222`). |
| PD-02 (hooks control shared DEX account) | Fixed for custody. **Residual for hooks that hold funds** (see DEXEXT-1/2) | Every hook pins its Vault at create and checks `requireDexCaller(this.dex.value)` (all 8 hooks, first line of `akitaDexHook`), and `callHook` pins `rejectVersion` (`contract.algo.ts:711-715`). But `createPool` is permissionless, so "only the Vault calls me" still means "any pool creator can drive me through the Vault with any points/perms subset and any initData". Hooks that keep money for several pools must not trust their own install shape. LaunchTaxHook does. |
| I-7 (disabled hook reverts the point) | Fixed (moot) | v2 has no per-hook disable; stacks are immutable. Backrun has its own pass-through kill switches (`backrun-arb.algo.ts:169-218`). |
| FIX-PLAN M-6 | Superseded (Kyle's decision) | — |

## New findings

### DEXEXT-1 — Critical — LaunchTaxHook books sell tax it was never paid; any pool creator can claim other launches' taxes

- **Location:** `plugin-dex/hooks/launch-tax.algo.ts:101-107` (AfterSwap accrual), `:112-130` (initialize accepts any pool), `:147-157` / `:163-175` (claim / close pay from the shared balance). Enabled by `plugin-dex/contract.algo.ts:658-705` (a `perms = 0` install is valid; the Quote requirement applies only to pricing perms at BeforeSwap) and `:887-907`, `:1226-1255` (the Vault pays HookFeeOut only if BeforeSwap returned `hookFeeOutBps > 0`).
- **Root cause:** the hook accrues `floor(amountOut · sellTaxBps / 1e4)` at AfterSwap unconditionally. The Vault pays that amount only when the same hook returned `hookFeeOutBps` at BeforeSwap with the HookFeeOut permission. Nothing ties the two together. The hook cannot see its own install (points/perms), and the class doc only *asks* installers to add BeforeSwap. LaunchTaxHook is one multi-tenant deployment (catalog approval `perms: 12`) whose ALGO/ASA balance is the sum of every pool's unclaimed tax.
- **Scenario:**
  1. Attacker calls `PluginDex.createPool(pay, 0, T, {feeBps: 0, ...}, [{app: LaunchTaxHook, points: AfterInitialize|AfterSwap (65), perms: 0, flags: 0, funding: launchTaxFunding(0), initData: TaxInit{owner: attacker, quoteAsset: 0, buyTaxBps: 0, sellTaxBps: 500, untilRound: 0}}], [])`. `validateHooks` accepts it (perms 0 ⊆ approval 12; no pricing perm, so no Quote requirement). The hook stores the config.
  2. `addLiquidity` 10,000 ALGO + T tokens (attacker is the only LP).
  3. Swap T → ALGO for ~9,000 ALGO out. BeforeSwap is not subscribed, so `pre.hookFeeOutBps = 0` and the Vault pays the hook nothing. AfterSwap runs LaunchTax: `buy == false`, so `accrued += 450 ALGO`.
  4. Swap the ALGO back for T (a "buy": no accrual, no fee since feeBps = 0). Repeat steps 3-4. Each round trip adds ~450 ALGO of unbacked `accrued` for a few inner-txn fees.
  5. `LaunchTaxHook.claim(attackerPoolId)` pays `accrued` from the hook's ALGO, i.e. every LaunchManager launch's unclaimed buy/sell tax. `removeLiquidity` returns the attacker's own capital.
  - ASA-quoted taxes are exposed the same way: set `quoteAsset` to that ASA (the hook opts in at initialize) and drain that ASA's balance.
- **Impact:** theft of all unclaimed LaunchTax revenue of every pool, in every quote asset, at negligible cost. Repeatable after each new accrual.
- **Suggested fix (hook-only, keeps the Vault frozen):**
  - Tie the accrual to the payment. At BeforeSwap, for a sell with `sellTaxBps > 0`, write a transient marker `pendingSell = poolId + 1` (global state, like Backrun's `pendingPool`). At any other BeforeSwap, clear it. At AfterSwap, accrue only if `pendingSell == poolId + 1`, then clear it. A BeforeSwap that returns `hookFeeOutBps > 0` either makes the Vault pay or reverts the swap (errHookPermission without HookFeeOut), so the marker proves payment. Quote never writes the marker.
  - Defense in depth: track `totalAccrued[asset]` and assert at initialize and at every accrual that the hook's spendable holding covers it.
  - Optionally pin the LaunchManager and accept AfterInitialize only from `ctx.caller == launchManager`. Deploy order then needs a settable-once field, because `LaunchManager.create` takes the LaunchTax id.
- **Test to add:** a pool created directly on the Vault with LaunchTax at `AfterInitialize|AfterSwap`, perms 0. A sell must accrue 0, and `claim` must not reach another pool's tax.

### DEXEXT-2 — Medium — LaunchTaxHook F6 underfunding is paid out of other owners' accrued ALGO

- **Location:** `plugin-dex/hooks/launch-tax.algo.ts:123-135` (box write and ASA opt-in use the hook's balance with no funding check), `:172-174` (close refunds the full box MBR to the pool's owner). The Vault pays the caller-chosen `install.funding`, which may be 0 (`contract.algo.ts:1775-1786`).
- **Scenario:** an attacker creates pools with LaunchTax, `funding = 0`, `quoteAsset` = a fresh ASA, and `untilRound = round + 1`. Per pool, the hook locks ~38,100 µALGO (box) plus 100,000 µALGO (opt-in) of its free ALGO as MBR. That free ALGO is other launches' accrued ALGO tax. Owners' `claim` then reverts: the payment would breach the hook's minimum balance. After the sunset, the attacker calls `close` and receives the full 38,100 µALGO box refund, which they never paid. The 100,000 µALGO opt-in MBR is lost to the owners for good. Each pool costs the attacker more than they take (Vault pool MBR), so this is griefing with a bounded leak, not profitable theft.
- **Fix:** at initialize, measure the min-balance growth and assert `balance − minBalance ≥ Σ accrued ALGO` (the DEXEXT-1 `totalAccrued[0]`). Equivalently, require the F6 funding to cover the growth. AntiSnipeFeeHook (`anti-snipe-fee.algo.ts:177`) and GatedFeeHook (`gated-fee.algo.ts:499,511`) have the same pattern. Their free balance is only other creators' overfunding, so Low there.

### DEXEXT-3 — Low — LaunchTax sell tax stranded when installed without AfterSwap

- `launch-tax.algo.ts:98` returns `hookFeeOutBps` at BeforeSwap, so the Vault pays (`contract.algo.ts:1253-1255`). Without the AfterSwap point, nothing accrues it, and the hook has no sweep. Traders' tax is locked in the hook forever, and it inflates the free balance that DEXEXT-1/2 drain. LaunchManager always installs AfterSwap (`launch-manager.algo.ts:414-417`), so only direct creators are affected. The DEXEXT-1 marker does not fix this. Fix: an owner-scoped sweep of `holding − totalAccrued` per asset, or document it and refuse such installs in the SDK.

### DEXEXT-4 — Low — LaunchManager accepts a graduation threshold that a zero-fee curve can never reach

- `launch-manager.algo.ts:314-316` allows `G == maxRaise = vA·S/vB`. When the LP fee and the anti-snipe fees are all 0, reaching `rA = vA·S/vB` needs `rB = 0`. But `swapCore` requires `out < liquidOut` (`contract.algo.ts:1180`), so `rB ≥ 1` and `rA < G` (only floor rounding creeps k up). The pool then bonds forever: no LP operations, M stays locked, the bounty is never paid. Only the creator is affected (their own parameters). Fix: require `G < maxRaise` with a margin (e.g. `G ≤ maxRaise·(1 − ε)`), or `G ≤ mulDiv(vA, S − 1, vB + 1)`.

### DEXEXT-5 — Low/Info — VolatilityFeeHook divides by zero on an empty input reserve with amountIn = 1

- `volatility-fee.algo.ts:246,249`: `divw(..., rA + half)` with `rA = 0` and `half = 0`. The Vault runs Quote hooks before its own liquidity check, so `tryQuoteRoute` (soft) on an empty pool reverts instead of returning 0. That makes a router `swapBest` with such a candidate revert. Fix: return `ctx.feeBps` when `rA == 0 || rB == 0`.

### DEXEXT-6 — Info — Pair-index squatting of LaunchManager tokens

- The token id is public after `createToken` and before `launch` (two groups by design, `launch-manager.algo.ts:191-207`). Anyone can then `createPool(0, token, ...)` with approved hooks, e.g. an attacker-owned LaunchTax at 5%. Those pools take the first `pairPools` slots ahead of the official pool (accepted in OPEN-DECISIONS #7/A9). Frontends and routers should take the pool id from `LaunchManager.getLaunch`, not from `getPairPools`.

### DEXEXT-7 — Info — F6 overfunding is unrecoverable in AntiSnipe/GatedFee

- Neither hook has a withdraw method. `LaunchParams.gatedFunding` is creator-supplied (`launch-manager.algo.ts:386`), so a creator who overpays loses the excess. With DEXEXT-2, a creator who underpays draws on that excess.

## Suspicions (not proven)

- **S1 ConsensusKeyregHook tank drain by the operator.** If go-algorand clears `IncentiveEligible` when an account goes offline, each offline/online toggle by the operator costs the tank 2 ALGO (`consensus-keyreg.algo.ts:111-115,146-149`). The e2e test only logs the post-offline eligibility instead of asserting it (`consensus-keyreg.e2e.spec.ts:234-240`). The operator is admin-appointed and the loss is bounded by the tank, so at most Low.
- **S2 Router opt-in spends outside the guard.** `ensureLegOptIn` / `ensureOptIn` (`akita-router/contract.algo.ts:165-173,230-233`) pay 0.1 ALGO per new asset from S into E's permanent MBR before the `in0/algo0` snapshot. A caller can spend up to ~24 × 0.1 ALGO of S per call with junk assets. This matters only if ARC-58 allowances are expected to bound a delegated agent's ALGO spend through this plugin. Confirm how the wallet books these.
- **S3 GatedFee identity.** Passes measure `key = controlled_address` (decision #18). AKTA locks or impact held by an escrow window's S are not counted. Design limit; no exploit.

## Upgrade / rollout notes

- Every app in scope is new and immutable. Fix DEXEXT-1 (and preferably DEXEXT-2/3) before the first LaunchTaxHook deployment. Redeploying later means a new app id: `LaunchManager.setHooks` can repoint future launches, but taxes accrued in the old hook stay exposed.
- If LaunchTax pins the LaunchManager, the catalog order must change (`LaunchManager.create(vault, admin, antiSnipe, launchTax)` takes the hook id today).
- Gate v2 allowlist ("gated-fee sub-gate not on the allowlist"): Gate v2 only registers allowlisted sub-gates (`gates/contract.algo.ts:230-249`). Before the DAO sets GatedFee `gateSlots` on MainNet, every sub-gate used by those slot gates (at least StakingPowerGate) must be allowlisted on the MainNet Gate, flagged ctx-aware iff it implements `checkFor`. The test fixture does this now (`gated-fee.e2e.spec.ts:375-376`). The rollout runbook must too (`scripts/allowlist-sub-gates.ts`).
- Tinyman: MainNet `total_fee_share` is 36 bps today, not 30. The hooks and the adapter read it live, so no change is needed. The adapter and BackrunArb take the Tinyman app id as a create arg. Use 1002541853 on MainNet; a wrong id gives a different (unbootstrapped) pool template, so every leg skips or reverts.
- Operational prerequisites: VolatilityFee pools need `initPool` (the hook prices from the trade only until seeded). BackrunArb pools need admin `registerPool`, and swappers need the fee buffer (OPEN-DECISIONS #25 still open). ConsensusKeyreg needs a funded tank and admin-set keys. The router needs `init` plus DAO pre-funded leg-escrow opt-ins (#23).

## Test gaps

1. LaunchTax install shapes that LaunchManager does not produce: AfterSwap without BeforeSwap (DEXEXT-1); `funding = 0` with an ASA quote (DEXEXT-2); HookFeeOut without AfterSwap (DEXEXT-3); a cross-pool solvency check (Σ accrued ≤ hook holding after every op).
2. AntiSnipe/GatedFee installs with underfunded F6.
3. LaunchManager with all fees 0 and `G = maxRaise` (DEXEXT-4).
4. VolatilityFee quote on an empty pool with amountIn 1 (DEXEXT-5).
5. ConsensusKeyreg: assert (not log) eligibility after going offline (S1).
6. Still `todo`: Backrun (13) router swap through a backrun pool; router E5/E9 (DIRECT, deferred).

## Checked and OK

- **Direct calls:** all 8 hooks gate `akitaDexHook` on the pinned Vault (`requireDexCaller(this.dex.value)`), so a fake "dex" argument is ignored. Admin methods: SwapTax owner, Backrun/Keyreg admin, GatedFee DAO wallet (`getDAOARC58Wallet`), VenueRegistry admin, LaunchManager admin. Router `init` / `optInLegEscrow` are permissionless but refund exact MBR deltas.
- **Attacker-created pools driving shared hooks:** AntiSnipe, GatedFee schedules, VolatilityFee and Keyreg keys are keyed by `ctx.poolId`. Backrun skips unregistered pools and its pending plan cannot go stale (the Vault always follows RequestCustody with the custody call). Keyreg is a no-op without admin keys. GatedFee daily counts are keyed by the authenticated caller's principal. SwapTax pays only its own owner. Only LaunchTax holds multi-pool money (DEXEXT-1/2).
- **Quote purity:** no hook writes at `HookPointQuote` (AntiSnipe `:147`, LaunchTax `:93`, GatedFee `:279-280`, Volatility read-only path), so a real-group `quote` call cannot move state.
- **Hook fee math:** LaunchTax buy fee floor ⇒ `mulDivUp(fee·1e4/amountIn) ≤ buyBps` passes the Vault cap. The sell accrual formula equals the Vault's `mulDiv(out, bps, 1e4)` when both run. AntiSnipe/Impact/Volatility return `max(running, own)`. GatedFee only lowers the fee, with a floor and a 90% cap. The Vault caps every SetFee at `pool.maxFeeBps`.
- **AntiSnipe:** the exemption is only `ctx.caller == exempt` at `e == 0`, and `exempt` must be the pool creator (`:175`). For LaunchManager pools that is the LM app, reachable only by its own in-call dev buy.
- **Backrun:** the Tinyman pool is derived on chain from the pinned AMM (`tmPoolAddress`, verified on MainNet). `minOut = need + guardFee + minSurplus` matches the Vault's native custody guard (`contract.algo.ts:609-618`). The trade is capped at ≤ 50% of the booked reserve (not the unbooked swap output). All inners are fee 0 with GroupCredit op-ups. There is no keeper tip and no gas tank (#19); the hook's own balance is only box MBR, withdrawable by the admin. The manipulation test (7) shows LP k rises.
- **VolatilityFee:** BeforeSwap/Quote are read-only. Within one block `dt = 0`, so the reference cannot be refreshed mid-group. Poke only moves `lastPrice` (never `tLast` or vRef), so it can neither suppress nor freeze the fee. Overflow-safe by the create bound. Same properties as LB v2.1.
- **ConsensusKeyreg:** only the admin-set operator (`ctx.caller` at Poke) gets custody. The keys are admin-set, so the operator cannot pick them. The go-online fee is pre-donated, so the escrow delta is 0. Every path rekeys back to the Vault, and non-operators get custody handed straight back.
- **LaunchManager:** creator-only `launch`, once. Payment accounting uses free-balance deltas, so other launches' bounties stay untouched (`:500-572`). The dev buy is capped, vested in Rewards via `createInstantAsaDisbursement` (not the C-1 `FromGroup` path), with an exact MBR top-up. `graduate` settles once; the bounty goes to the graduator, or to the creator if the pool was graduated directly; a closed creator falls back to the caller. The retained M stays locked by design (#10). The launch LP stays locked (#11). The fair-launch ASA has no manager, reserve, freeze or clawback.
- **Router (SANDBOX):** S must be rekeyed to the router and must not be E. Hooks/Vault never get S (the Vault call is merely *sent* as S). Adapter custody is only ever E. After each adapter call the router checks: rekeyed back, E's min balance unchanged, input spent ≤ amount and not grown, output not reduced, and no ALGO leak on ASA/ASA. Per-leg, aggregate (`in1 + totalIn ≥ in0`, `out ≥ minAmountOut`) and quote-promise floors hold. The handback rekeys the S checked in `enter` (TOCTOU closed) to `wallet.address`. `rekeyBack = false` leaves S on the router for the wallet's `arc58_verifyAuthAddress` to enforce. A wrong `seg.escrow` is rejected by the Vault's `readDeposit`. The adversarial adapter tests E1-E4 and E6-E14 exist.
- **Tinyman adapter:** pool derived from the pinned AMM (a fake pool is impossible). Tinyman enforces minOut and the lock. The payout goes to the appl sender E. `requireVenueCustody` pins `returnTo` to the calling app. The registry pins the adapter version and the router sets `rejectVersion`.
- **GatedFeePassPlugin:** derives the key itself (`pluginPrincipalOf`: genuine wallet + holds S), sends as S with `windowHint(wallet)`, and calls only the pinned hook and the DAO gate. The hook's `openPass` / `refreshFromGate` / `closePass` require `principal == key` for the same hint. The 1-day TTL and the daily cap are carried across refresh. Close is blocked on a day with discounted swaps.
- **Principal resolution in GatedFee:** at BeforeSwap the key comes from the Vault-authenticated `(Txn.sender, callerApplicationId)`. A top-level hint reverts. A non-genuine hint inside an app call falls back to the caller. Quote uses the at-rest `thirdPartyPrincipal`. A victim's pass can only be used inside the victim's own window.
