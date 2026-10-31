# WP3-lvr: amendment requests and integration notes

Track WP3-lvr (VolatilityFeeHook, BackrunArbHook), develop stage, 2026-10-02. No frozen file was edited.
Each item says who it is for and what the hooks do in the meantime.

**L1. `ctx.after` is not refreshed between hooks at the same point (Vault, clarification request).**
`runHooks` recomputes `ctx.reserveIn/Out` for every hook, but `ctx.after` stays the value computed before
the point. After a custody hook books a delta (the backrun at AfterSwap), a later hook at the same point
sees a stale `ctx.after.priceX64`. FINAL-SPEC §5 WP3 says VolatilityFeeHook reads `ctx.after.priceX64` at
AfterSwap; for native pools it reads the live effective reserves of its own context instead (identical
when no custody hook ran before it). Request: refresh `ctx.after` per hook after a custody call (native:
one `priceX64` on effective reserves), or document that `ctx.after` is the state before the point's hooks.

**L2. BinHookState layout (WP2 dependency).** The volatility hook reads `binStep` as the uint64 at byte
offset 32 of `ctx.curveData`, per FINAL-SPEC §5 WP2 override 4 (`{startId, endId, binsCrossed, va,
binStep}`, ABI-encoded uint64s). WP2 must keep that field order and width. Spec case (9) (bins pool via the
activeId path) is a `test.todo` until the BinEngine runs through the Vault.

**L3. Opcode budget on hooked native swaps (core).** Measured by simulate on the current Vault:
skip path (lazy backrun, no gap) 1,598 opcodes in total, Vault frame 1,036 before/around the hook call;
arbitrage path 3,692 total (Vault frame 1,480, hook 767 + 383, plus Tinyman). The Vault spends more than
its own 700 before the first hook call, so today a backrun swap needs 1 `PluginDex.opUp()` carrier on the
skip path and 2 on the arbitrage path. The tests put 2 carriers in every swap/poke group (budget only).
A two-pool `swapRoute` needs 4 carriers, which also carry references. Once the core fix lands, the
carrier count should drop by one.

**L4. Lazy custody and fee credit (hook-author note for `hook-interface.ts`, frozen).** After a lazy hook
returns `HookResultRequestCustody`, the Vault issues two more inners (the rekey payment and the custody
re-call) before the hook runs again. A swapper whose fee was simulated on the skip path has no credit for
them, so the custody path would fail on fee credit. BackrunArbHook pays a fee-carrier payment from its
gas tank in the lazy call, before returning RequestCustody, sized for the whole arbitrage path
(`6 + tip + rebate` × minTxnFee). Suggested addition to the frozen doc comment: "a lazy custody hook that
requests custody must fund the extra inners itself (or its callers must budget them)". Verified by
backrun case (5): an ASA/ASA arbitrage succeeds with the skip-path fee (3,000 µALGO) and no simulation.

**L5. Resource rule for custody hooks that call apps from the escrow (SDK).** The AVM checks the sender's
local state for an app call, so the backrun's inner Tinyman appl (sender = pool escrow) needs the
`(escrow, Tinyman app)` pair in one top-level transaction; likewise `(tmPool, Tinyman app)` for the
hook's reads. Cross-transaction combination is not enough. `populateAppCallResources` handles a single
`swap`; the route planner must co-locate these pairs.

**L6. lvr §3.12 (8) premise superseded.** The "fails without padding" premise was the 16-inner limit.
With the 256-per-group pool (FINAL-SPEC §1), a route through two backrun pools issues 20 inners in one
call; it fails without carriers only for budget (and, after L3 is fixed, for references).

**L7. Tip definition (clarification of lvr §3.6).** The keeper tip is `keeperBps` of the surplus *above
the guard fee* (`surplus − ceil(out·custodyFeeBps/1e4)`), not of the raw surplus, so a tip never eats into
the margin that makes the Vault guard pass. The execute condition is unchanged:
`surplus ≥ guardFee + tip + rebate + minSurplus`.

## Integration stage on the final Vault (2026-10-02, after core M1-M5)

**L2 confirmed.** The WP2 BinEngine's `CurveResult.hookData` is the 40 B `BinHookState` with `binStep` at
byte offset 32. Volatility case (9) now runs through the real Vault with the real BinEngine (LpModeCurve,
`varFeeControl = 0`). Four bins of 25 bps give vAcc 100 on the bins pool and on a native pool moved by the
same 100 bps, and the next small trade pays 34 bps on both.

**L3 resolved on the hook side; budget carriers removed.** The hook now funds its own budget:
- once a gap is found, before sizing, it calls `ensureBudget(900, OpUpFeeSource.Any)`. The fee comes from
  group credit when the swapper simulated the gap path (algokit simulates app calls at maxFee), and from
  the tank otherwise, so a fee that was not simulated never reverts the swap;
- after paying the carrier, it calls `ensureBudget(1000, GroupCredit)`, funded by the carrier. The carrier
  now pays for 2 more inners (`CarrierOpUps`): lazy 8 + tip + rebate, eager 5 + tip + rebate.
Measured with one carrier and the real budget: on the skip path the Vault and the hook issue 0 op-ups. On
the arbitrage path the hook issues 2 op-ups and the Vault 0 (its checkpoints find enough budget). The
spec's 2 budget carriers per swap/poke are now 1 (see L8), and the route's 4 carriers are now 2
reference-only carriers.

**L8. The final Vault exhausts its own 700 before its first hook checkpoint (core, open).** On a pool
whose hooks are only at AfterSwap/Poke, a swap sent as `[input, swap]` with no other app call in the group
fails inside the Vault at the entry of `runHooks(AfterSwap)` with "dynamic cost budget exceeded … local
program cost was 700". That is pc 7871, after `const run = {…}`, before the loop's
`ensureBudget(HookPreBudget)`. The swap path up to that point costs more than 700, and nothing before it
tops up. The same happens on a curve pool when a `quote` earlier in the group has used up the pooled
budget: the swap fails at local cost 387, just before the loop. `swapRoute` without carriers also fails
first in the Vault (local cost 697). The core suites never see this, because their helpers always add an
`opUp()` reference carrier, which also brings 700. Suggested fix: call `ensureBudget(HookPreBudget,
GroupCredit)` once at the top of `runHooks` when the point is subscribed (before cloning `h:`), or in
`swapCore` before the BeforeSwap/AfterSwap runs when `pool.hookPoints != 0`. In practice every hooked call
needs one reference carrier anyway (algokit's 8-reference limit), so this affects only callers that set
references explicitly (router, SDK planners) and keep their groups minimal. My specs keep exactly 1 carrier
per hooked swap or poke, for references and this budget.

**L6 update.** A route through two backrun pools now passes with 2 reference carriers (22 inner txns:
0 Vault op-ups, 3 hook op-ups). Without carriers it still fails in simulation, first on the Vault budget
(L8), and its references would not fit the route call either.
