# PluginDex v2: open decisions for Kyle

Consolidated on 2026-10-03 from:
- the "Open for Kyle" sections of `amendments-core.md` (M4 and stabilize);
- `amendments-wp3-lvr.md`;
- FINAL-SPEC §7 and §10 A9;
- the open questions in `akita-hooks.md` A11 and `router.md` §13;
- the repository's `.gitignore`.

Questions already settled in code are not repeated here (see FINAL-SPEC §10 A29-A44).

**Status (2026-10-03).** Kyle approved the recommended default for every deploy-blocking item (#1-#16), and later
the same day decided #17-#24. All of them are listed under [Decided](#decided-2026-10-03) at the end. Two items
stay open: #14a, a follow-up built to make #14 hold, which needs the team's confirmation, and #25, where a
revised proposal is waiting for Kyle.

**Blocking rule.** PluginDex (the Vault), BinEngine and AkitaRouterPlugin are immutable. Anything that would
change their bytecode must be decided before the MainNet deploy, even when the decision is "keep as built".
Hooks, LaunchManager and venue adapters are immutable too, but a new version can be deployed and approved for
future pools later, so their items do not block the core deploy. Every recommended default below is what the
code does today unless it says otherwise.

## Still open

| # | Decision | Recommended default | Blocks deploy |
|---|---|---|---|
| 14a | Bins floor per position-bin stake (follow-up to #14) | keep as built (already in BinEngine) | confirm before deploy (BinEngine) |
| 25 | Lazy-custody fee guidance (L4) | SDK fee buffer on lazy-custody pools, no interface comment (revised proposal) | no |

---

### 14a. Bins: floor per position-bin stake (follow-up to #14, built, confirm)

**Context.** A verifier showed on LocalNet that the Init floor approved in #14 gives almost no defence on its
own. It was checked only when a bin was created, so an attacker could add at the floor and then Remove with
`fracPpb = 1e9 − 1`, leaving an occupied dust bin for about 1 base unit each. A co-add into a floor-sized bin
followed by a 100% Remove of the first position did the same. To make the approved option hold, BinEngine now
applies the floor to every position-bin stake (value·2^32 at the bin's price):
- Add into an occupied bin: the position's stake after the add must be worth ≥ `minBinShares`, else errBnZs.
- Remove: if a partial remove would leave a stake worth < `minBinShares`, the whole stake in that bin is
  removed instead. It never reverts, a 100% (emergency) Remove is unchanged, and no co-LP can trap another.
  A partial Remove now reads the binStep table box, so callers must reference it (the SDK's resource
  population does).

**Points to confirm.**
1. A co-add into an existing bin now has a minimum (one Y token per bin under the SDK default), the same as a
   new bin.
2. A partial Remove can pay more than the requested fraction on bins near the floor (minimum-out checks are
   unaffected).

**Options.**
- (a) Keep as built.
- (b) Revert to the Init-only floor (#14 as first written) and rely on router slicing alone.

**Recommended:** (a). Regression tests: bins.e2e and bins-model `OPEN-DECISIONS #14 (verifier bypass)`; both
failed on the old engine. **Blocks deploy:** confirm before deploy (BinEngine bytecode; the default is built).

### 25. Lazy-custody fee guidance (L4) — pending Kyle's confirmation

**Context.** After a lazy hook returns `HookResultRequestCustody`, the Vault issues two more inners (the escrow
rekey and the custody call), plus whatever the hook's custody call issues, that a skip-path fee simulation never
saw. Since #19, BackrunArbHook no longer pays for them: every inner is fee 0 and the caller's group pays. So
"the hook funds its extra inners" is no longer the pattern, and an interface comment saying so would be wrong.

**Options.**
- (a) Add one sentence to the `hook-interface.ts` doc comment (the original proposal; no bytecode change).
- (b) **Revised proposal:** no interface comment. Make it SDK guidance instead: when a route touches a pool with
  a lazy-custody hook, add a fee buffer on top of the simulated fee, the same rule as #19's buffer
  (BackrunArbHook: `BackrunMaxExtraInners` = 11 × min fee = 11,000 µALGO per backrun pool; any other lazy hook:
  at least 2 × min fee for the rekey and custody call plus the inners its custody call issues). The guidance is
  in ARCHITECTURE §12.1 ("SDK and integrator guidance", item 1).

**Recommended:** (b). **Blocks deploy: no** (SDK). **Status:** proposed, waiting for Kyle's confirmation.


---

## Decided (2026-10-03)

Kyle approved the recommended default for every deploy-blocking item (#1-#16), then decided #17-#24 the same
day. "Kept as built" means no code change.

| # | Decision | Outcome |
|---|---|---|
| 1 | Untracked `scripts/lib/` sources | `.gitignore` rule anchored to `/lib/`; files still to be committed |
| 2 | Deployment catalog and v1 replacement | v2 replaces v1 under `PluginDex`; full stack catalogued with deploy order |
| 3 | Vault budget before the first hook checkpoint (L8) | Vault fix (resolved earlier the same day) |
| 4 | Custody re-mark under a binding clip (A25) | Vault change: conservative valuation (FINAL-SPEC §10 A37) |
| 5 | Clip ceiling (A27) | kept as built (10,000 bps/day; fixture/SDK default 100) |
| 6 | Receipt ASAs with clawback/freeze | valuator approval rule; no Vault check |
| 7 | Pair-index curation (A9) | kept as built (no `delistPool`) |
| 8 | `ctx.after` between hooks (L1) | documented, no refresh |
| 9 | AntiSnipe install-point validation | kept as built (hook-side fix; SDK refuses bad installs) |
| 10 | Graduation token excess (§7 Q3) | kept as built (stays locked) |
| 11 | Fee claim on the locked launch LP (F9) | kept as built (no claim) |
| 12 | Gated discount and the protocol share (A11.3) | kept as built |
| 13 | Bins 10% per-bin fee cap vs pool fee caps | BinEngine change: Init rejects `maxFeeBps > 1,000` (errBnFc) |
| 14 | Bins dust bins vs `maxBinsPerSwap` | BinEngine change: `minBinShares ≥ 2^32` (errBnMs) plus router/SDK slicing; follow-up open as #14a |
| 15 | Bins donation parked in an empty active bin (B1) | accepted and documented |
| 16 | Router v1 scope: SANDBOX only, no router fee | kept as built |
| 17 | `custodyFeeBps` default (§7 Q2) | default: `custodyFeeBps = feeBps` (LaunchManager as built; SDK default) |
| 18 | GatedFeeHook origin, TTL, laundering cap (A11.1, .2, .4) | `controlled_address`, 1 day; **daily cap on discounted swaps built** (default 500, DAO-settable; FINAL-SPEC §10 A41) |
| 19 | Backrun economics (§7 Q5) | **no keeper tip, no gas tank, no rebate**: the caller's group pays every inner (built; A42) |
| 20 | Launch dev buy with vesting (§7 Q6) | **built into LaunchManager** before its first deploy (A36.1, A43) |
| 21 | Legacy ImpactFeeHook sets the fee absolutely | **option (b) built:** returns `max(running, own)` (A44) |
| 22 | Unsynced surplus on curve-pool exits (A24) | default: the SDK prepends `sync()` (SDK guidance; no DEX SDK yet) |
| 23 | Who pays leg-escrow opt-ins (router §13.7) | default: the first user pays inline; the DAO pre-funds popular assets at deploy (runbook + catalog note) |
| 24 | ARC-58 wallet T7 escalation (router test E9) | ignored: not a concern; E9 will not be written |

### 1. Untracked `lib/` sources — DECIDED: (a) anchor the rule

**Done.** The repo-root `.gitignore` rule `lib/` is now `/lib/` (with a comment); `git check-ignore` no longer
matches `projects/akita-sc/scripts/lib/*`, and no other `lib` directory outside `node_modules` exists. The
GatedFeeHook origin helper had already moved to `hooks/shared/origin.ts`. Test: `git check-ignore -v` on each
file. **Still to do (not a decision):** commit `scripts/lib/*`, `scripts/deploy-immutable.ts`,
`tests/migration*.ts` and `hooks/shared/origin.ts` so the immutable deploy is reproducible from git.

### 2. Deployment catalog and v1 replacement — DECIDED: (a) replace v1 in place

**Done.** `scripts/lib/immutable-catalog.json`: `PluginDex` now points at the v2 Vault with `plugin: false`
(v1 is replaced, never deployed alongside). Added BinEngine, the 8 production hooks, VenueRegistry,
TinymanV2Adapter, AkitaRouterPlugin (`plugin: true`) and LaunchManager, with `dependencies`, `params`,
`defaults`, `postDeploy` and `notes`. `immutable-deployment.ts` enforces the order PluginDex → BinEngine + hooks
→ VenueRegistry → TinymanV2Adapter → AkitaRouterPlugin → LaunchManager, and checks each dependency ID against
its compiled program hash (`--allow-dependency-mismatch` only warns). The admin approvals are printed, not sent.
Tests: `tests/migration-dry-run.test.ts` and `tests/migration-scripts.e2e.spec.ts` (all 14 stack entries
deployed in order on LocalNet; bad dependencies rejected; printed postDeploy steps verified). Per-deploy inputs
(Tinyman app id, hook economics, DAO wallet as admin) are listed in ARCHITECTURE §12.

### 3. Vault opcode budget before the first hook checkpoint (L8) — DECIDED and fixed

**Done (earlier, 2026-10-03).** On an AfterSwap-only pool the budget ran out at the *entry* of
`runHooks(AfterSwap)`, because the skipped BeforeSwap stack never reached its post-stack checkpoint. `runHooks`
now calls `ensureBudget(HookTailBudget, GroupCredit)` on the early-return path whenever the pool has any hooks
(hookless pools unchanged at ~510 opcodes). Test: `core-v2 › budget › (L8)` (fails on the old Vault).

### 4. Custody re-mark under a binding clip (A25) — DECIDED: (b) conservative valuation

**Context.** With live v > r', a recall booked at r' let a malicious approved External hook keep Δu·(v − r')
of liquid.
**Done.** `custodyCall` reads the live rate v and the clipped rate r' per changed slot. Units stay booked at r',
but the guard's delta is reduced by `floor(Δu·|v − r'|/RateScale)` when the clip binds against the hook (units
leaving while v > r', or entering while v < r'), and the same amount is booked as a donation. Leaving units
are thus valued at max(v, r'), entering units at min(v, r'); liveness is unchanged. Vault 13,999 B.
FINAL-SPEC §10 A37. Test: `external.e2e` "conservative custody valuation under a binding clip (§10 A25,
OPEN-DECISIONS #4)" (MockDexHook modes 16/17; fails on the old Vault).

### 5. Clip ceiling `MaxClipBpsPerDay` (A27) — DECIDED: (a) keep 10,000 bps/day

**Done.** Kept as built. Test: `external.e2e` "(OPEN-DECISIONS #5)" pins the fixture default at 100 bps/day
each way. The SDK/UI should default to 100 and warn above 1,000.

### 6. Receipt ASAs with a clawback or freeze address — DECIDED: (a) valuator approval rule

**Done.** No Vault change. The approval checklist in `valuator-interface.ts` requires a valuator to answer 0 for
a receipt with a non-zero clawback or freeze, so `createPool` fails with errPdva (a zero address can never be set
again, so the check holds for the pool's life). MockValuator applies the rule. Test: `external.e2e`
"(OPEN-DECISIONS #6)" (fails without the rule).

### 7. Pair-index curation (A9) — DECIDED: (a) keep as built

**Done.** No `delistPool`. Routers and the SDK filter `getPairPools` by liquidity and discover pools from
`createPool` logs.

### 8. `ctx.after` is not refreshed between hooks at one point (L1) — DECIDED: (a) document

**Done.** Documented on `HookContext.after` (`types.ts`) and in the hook-author obligations in
`hook-interface.ts`: `ctx.after` is the state before this point's hooks; only `reserveIn/Out` are recomputed
per hook. No bytecode change.

### 9. AntiSnipe FirstLiquidity installs without AfterAddLiquidity — DECIDED: (a) keep the hook-side fix

**Done.** Kept as built (an unstarted clock starts at the first BeforeSwap; LaunchManager always adds the
point). The SDK should refuse FirstLiquidity installs without AfterAddLiquidity.

### 10. Graduation token excess (FINAL-SPEC §7 Q3) — DECIDED: (a) keep it locked

**Done.** Kept as built; the excess stays in the escrow as `locked_t` (A16).

### 11. Fee claim on the locked launch LP (F9) — DECIDED: (a) no claim

**Done.** Kept as built; the creator earns through LaunchTaxHook.

### 12. Gated discount and the protocol share (A11.3) — DECIDED: (a) as built

**Done.** Kept as built; the discount shrinks LP income and the protocol share proportionally.

### 13. Bins: the 10% per-bin fee cap vs the pool's fee caps — DECIDED: (a) engine Init check

**Done.** BinEngine Init asserts `maxFeeBps ≤ MaxPoolFeeBps = 1,000` (errBnFc). Since `custodyFeeBps ≤
maxFeeBps`, no bins pool can declare a fee the engine would silently charge at 10%. The bigint model mirrors it.
FINAL-SPEC §10 A38. Tests: bins.e2e and bins-model "OPEN-DECISIONS #13".

### 14. Bins: dust bins vs `maxBinsPerSwap` — DECIDED: (a) floor plus (c) slicing

**Done.** BinEngine Init asserts `minBinShares ≥ MinBinSharesFloor = 2^32` (errBnMs); every bins fixture uses
the floor. Callers split trades into ≤ `maxBinsPerSwap`-move slices and treat a Quote of 0 as "split"
(ARCHITECTURE §4, §12). FINAL-SPEC §10 A39. Tests: bins.e2e and bins-model "OPEN-DECISIONS #14". The per-stake
follow-up that makes the floor hold is open as **#14a**.

### 15. Bins: a donation parked in an empty active bin (B1 residual) — DECIDED: (a) accept and document

**Done.** Documented as an LP-facing limitation in ARCHITECTURE §13: keep liquidity on both sides of the active
bin. No code change.

### 16. Router v1 scope: SANDBOX only, no router fee — DECIDED: (a) ship as built

**Done.** Kept as built. DIRECT custody or a fee later means a new router app (and #24 first).

### 17. `custodyFeeBps` default (FINAL-SPEC §7 Q2) — DECIDED: (a) `= feeBps`

**Done.** No code change. LaunchManager already sets `custodyFeeBps = feeBps`; the SDK should default to the same
for every pool, so LPs always get at least a trader's fee from a custody trade. Option (b), 0 on backrun pools,
was not taken. Test: `hooks/backrun-arb.e2e` "(11) custodyFeeBps = feeBps".

### 18. GatedFeeHook origin, pass TTL and laundering cap (A11.1, A11.2, A11.4) — DECIDED: `controlled_address`, 1 day, cap built

**Done.**
- Origin and TTL: kept as built (`controlled_address` under real control, A32; TTL default 1 day, DAO-settable
  between 1 hour and 7 days).
- Laundering: a per-pass daily cap on discounted swaps is built into GatedFeeHook (nothing is deployed yet, so no
  migration):
  - global `maxDiscountedSwapsPerDay` (key `max_day_swaps`), set to `DefaultMaxDiscountedSwapsPerDay = 500` in
    `create` (signature unchanged); 0 = unlimited. DAO-only setter `setMaxDiscountedSwapsPerDay(cap)` (errGfad
    otherwise), effective at once against today's counts;
  - `FeePass` gains `swapDay` (UTC day = `latestTimestamp / 86,400`) and `daySwaps`: 64 → 80 bytes, `PassMbr`
    41,300 → **47,700** µALGO (2,500 + 400·(33 + 80)); `passCost()` returns it;
  - pricing: today's count is `swapDay == today ? daySwaps : 0`; at or above a non-zero cap the hook returns the
    incoming fee (no discount, no revert). BeforeSwap writes the pass back (count + 1) only when it actually
    lowered the fee. Quote and `previewFee` never write and return exactly what BeforeSwap would;
  - `refresh` and `refreshFromGate` keep the counter; `openPass` starts it at 0;
  - `closePass` fails with **errGfdy** on any UTC day on which the pass made a discounted swap (live passes and
    expired passes closed by anyone), so close-and-reopen cannot reset the count. It can be closed from the next
    UTC day;
  - new readonly `getDiscountedSwapsToday(spender)`; `getPass` returns the new fields.
- Scope and caveat: the count is per spending account (separate escrows hold separate passes), and a route that
  crosses gated pools counts once per hop, so `quoteRoute` can overstate the discount when the cap is reached
  inside the route.

FINAL-SPEC §10 A41. Tests: `hooks/gated-fee.e2e` T-16 and T-17 (#18) (T-17 time-warps, so it runs last). Both
fail on the old hook: the setter, the reader and the pass fields do not exist, swaps after the cap would still be
discounted, and `closePass` would succeed the same day.

### 19. Backrun economics (FINAL-SPEC §7 Q5) — DECIDED: no keeper tip, no gas tank; the caller pays

**Done.** BackrunArbHook has no keeper tip, no gas tank, no carrier and no fee rebate. Every inner it issues is
fee 0, op-ups included (`OpUpFeeSource.GroupCredit`), so the swapper's (or poker's) group pays the whole
arbitrage path through fee pooling, and the whole surplus above the guard fee stays with LPs. `registerPool`
takes `(poolId, minSurplusA, minSurplusB, maxTradeBps)`; the execute condition is `surplus ≥ guardFee +
minSurplus`. Because a backrun simulated as skipped can run at submit, callers add a fee buffer of
`BackrunMaxExtraInners` (11) × min fee per backrun pool (ARCHITECTURE §12.1). FINAL-SPEC §10 A42 (supersedes the
tip and tank parts of A33). Tests: `hooks/backrun-arb.e2e` "(5) fees", "(5) fee buffer", "(6) a keeper poke …
no tip".

### 20. Launch dev buy with vesting (FINAL-SPEC §7 Q6) — DECIDED: (b), built into LaunchManager

**Done** before LaunchManager's first deploy (FINAL-SPEC §10 A36.1, A43). `launch` takes `devBuy`/`devVestSeconds`,
swaps AntiSnipe-exempt at e = 0 in the launch call, caps the tokens out at the DAO's `devBuyMaxBps` of S
(immutable ceiling 10%), locks them in a never-expiring Rewards disbursement for the creator that unlocks after a
DAO-bounded vesting time, and discloses buy, tokens, unlock, Rewards app (`devRewards`) and disbursement in
`LaunchEvent` and the launch record. The creator's payment covers the Rewards opt-in and the disbursement MBR,
plus a measured top-up: Rewards' `MinDisbursementsMBR` understates its box by 3,200 µALGO, so LaunchManager
measures Rewards' minimum-balance growth and pays the shortfall (errLmpy if the payment cannot); Rewards itself is
unchanged. DAO post-deploy step: `setDevBuy(rewards, maxBps, minVest, maxVest)` (dev buys stay off until then).
Tests: `launch/launch-hooks.e2e` › LaunchManager › dev buy (exact payments `[100,000, 67,000, 3,200]`, Rewards'
spare unchanged, cap boundary, gated launch, Rewards repointing).

### 21. Legacy ImpactFeeHook sets the fee absolutely — DECIDED: (b) `max(running, own)`

**Done.** ImpactFeeHook returns `SetFee` with `max(ctx.feeBps, fee)`: it never lowers the pool's base fee or a fee
set by an earlier hook (e.g. AntiSnipe), so stack order no longer matters against fee-raising hooks. A `minFeeBps`
below the pool's base fee no longer discounts small trades; set the base fee to the floor you want. A later
discount hook (GatedFee) can still lower the result. FINAL-SPEC §10 A44. Tests: `hooks/legacy-hooks.e2e` "#21"
(two tests; both fail on the old hook, which lowered 800 → 260 and 300 → 15).

### 22. Unsynced surplus on curve-pool exits (A24 residual) — DECIDED: (a) the SDK prepends `sync()`

**Done** as SDK guidance (no DEX SDK exists yet): the SDK prepends `sync(poolId)` to curve-pool removes so the
exiting LP gets its share of unsynced surplus. ARCHITECTURE §12.1 item 2. No contract change.

### 23. Who pays leg-escrow opt-ins (router.md §13.7) — DECIDED: (b) inline plus DAO pre-funding

**Done** as operations: the first user to route an asset through an adapter pays E's 0.1 ALGO opt-in inline
(+2 inners); at deploy the DAO pre-funds the popular adapter assets with `optInLegEscrow(payment, assets)`.
Recorded in the deploy runbook (ARCHITECTURE §12, §12.1 item 4) and the `AkitaRouterPlugin` notes in
`scripts/lib/immutable-catalog.json`. No contract change.

### 24. ARC-58 wallet: plugin escalation through the wallet address (router.md T7, test E9) — DECIDED: ignore

**Done.** Not a concern for PluginDex v2: the router is SANDBOX only and never gives the wallet address to an
adapter. E9 will not be written; the router's `test.todo('E9 …')` stays as a marker only (docs-only decision, the
spec file is unchanged). Revisit only if a DIRECT-custody router is ever built.

---

## Tracked elsewhere (no decision needed here)

- **ACC-01 in `utils/functions.ts`.** A creator-only wallet check has the same hole that A32 closed in
  `hooks/shared/origin.ts`. Whoever does that fix should apply the same control check, or pin the wallet program.
