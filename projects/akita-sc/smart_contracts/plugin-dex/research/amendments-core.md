# Core track (WP1) amendments and notes for other tracks

No frozen interface file (`types.ts`, `constants.ts`, `errors.ts`, `hook-interface.ts`,
`curve-interface.ts`, `valuator-interface.ts`, `venues/venue-adapter.ts`, `math.ts`, router
`types.ts`/`constants.ts`) was changed in M1. The items below are behaviour, platform facts and
test-helper changes that other tracks integrate against. A11 and A12 are also recorded in
FINAL-SPEC §10.

## M1 (2026-10-02)

### A11. Calling an app above 8,192 B costs box read budget (platform fact, measured on LocalNet)

A transaction that calls the Vault (approval + clear = 10,254 B at M1) must carry box quota for the
program bytes above 8,192 **plus** the box bytes it reads. Measured with a hookless `swap`:

| box refs on the swap | result |
|---|---|
| 0 | `read budget exceeded (2037 > 0)` |
| 1 (`p:`) | `read budget exceeded (2318 > 2048)` (2,037 program bytes + 281 B PoolInfo box) |
| 2 (`p:` + 1 empty) | ok |
| `[swap(p:), opUp(1 empty)]` | ok (quota is pooled across the group) |

So each box ref gives 2,048 B and the quota is group-pooled. algokit's `populateAppCallResources`
adds the refs automatically. **Callers that pass explicit references** (routers, SDK planners, tests
with `populateAppCallResources: false`) must add `ceil((len − 8192 + Σ box bytes read) / 2048)` box
refs, empty ones included. At the 15,000 B gate that is up to 4 refs for the program alone, so WP4
must budget references for it (and verify whether an *inner* call from the router plugin is charged
the same way).

### A12. The Vault tops up its own opcode budget around hooks (behaviour, no ABI change)

Callers no longer need `opUp()` carriers for opcode budget. The Vault calls
`ensureBudget(n, OpUpFeeSource.GroupCredit)` at fixed checkpoints, so op-ups are inner app creates
with fee 0 **paid from the caller's fee credit**. Callers must therefore overpay the outer fee (algokit
`coverAppCallInnerTransactionFees: true` with a `maxFee`, or a generous `staticFee`).

| Checkpoint | Budget | Covers (measured, MockDexHook) |
|---|---|---|
| start of each hook iteration | 200 | context, custody snapshot + flash rekey, ABI encoding (~180 custody, ~100 plain) |
| after a plain hook call | 150 | result checks |
| after a custody hook call | 450 | balance measurement, guard, booking, result checks (~375 mixed delta) |
| after a hook stack ran | 400 | rest of the op until the next checkpoint (swap math + AfterSwap ctx, or the op tail) |
| each HookInstall in createPool | 300 | validation (now run after the escrow/LP inner calls, which add 1,400) |
| inline sync that books a surplus | 500 | the booking plus the rest of add/remove |
| each route hop after the first | 500 | one hookless hop (was 1,400) |

Measured at M1 (no op-ups): hookless native swap **507** opcodes, addLiquidity 604, removeLiquidity
497 (all < 700, asserted in `core-v2` "budget"). A hook that spends ≤ ~350 of its own 700 never
triggers an op-up by itself; a 1-custody-hook swap costs one op-up (the BeforeSwap → AfterSwap
stretch), a 4-custody-hook swap none. Hooks that spend more than their 700 must top themselves up
(GroupCredit works for them too).

### Resource carriers are still needed for references

Inner slots and budget no longer need carriers, but algokit cannot fit more than 8 references in one
app call (no access-list population in algokit-utils 9.2.2). `createPool` with ≥ 3 hooks needs an
`opUp()` carrier for references (each hook adds its app and its `a:` box). The fixture does this
(`createPoolCarriers(n)`); hooks that touch their own boxes (e.g. RecordingDexHook) can push a call
over the limit, so add a carrier in that case.

### Test helpers (`tests/fixtures/plugin-dex.ts`, core-owned, backwards compatible)

- `createPool` now sends through a composer and adds `createPoolCarriers(hooks.length)` opUp()
  carriers; same arguments and return shape.
- `addLiquidity` opts the depositor into the LP asset if needed (`ensureOptedIn`, exported).
- `createPoolCarriers(hooks)` exported.

### MockDexHook modes (`tests/mock-dex-hook.algo.ts`)

Modes 0-8 unchanged. New: `ModeKeyreg = 9` (optional pre-donation of `value` µALGO, then keyreg the
escrow online with the 2 ALGO incentive fee and rekey back in the same txn), `ModeRequestCustody = 10`
(return RequestCustody on the lazy first call; with custody act as sub-mode `value2` with amount
`value`), `ModeHookFeeOut = 11` (return `hookFeeOutBps = value`, `hookFee = value2`). M4 will add the
external-position modes after 11. `ModeSetFeeHigh` was not added: `ModeSetFee` (5) already returns any
`value`.

### RecordingDexHook (`tests/recording-dex-hook.algo.ts`)

Records `{ balance, ctx }` per hook point in box `r` + point; read with `record(point)`. Rejects
`initData == 'reject'` at AfterInitialize (`errRecInit`); hands custody straight back if installed with
custody. Box MBR comes from its F6 funding or a top-up.

### Open for later milestones

- §4.12 test 10's "out ≥ liquid" case is unreachable on a plain native pool (CP output is always
  < reserveOut); it is covered once externals (M4) or virtual offsets (M3) exist. The curve
  "Quote returns 0" case lands with MockCurve (M2).
- `errPdni` stubs remain for M2-M4 (curve liquidity, launch, externals, write-down); the release gate
  in `size.test.ts` stays skipped until they are gone.

## M2 (2026-10-02): the curve slot

No frozen interface file was changed in M2. FINAL-SPEC §10 gains A13 (liquidity predicate for
curve-managed pools), A14 (opcode budget after curve calls, with a curve obligation) and A15 (curve
Settle rejections use errPdki).

### What the Vault now does with a curve app (for WP2 integration)

- `createPool` with `config.curve ≠ 0`: approval (errPdty), version pin (errPdvr), virtual offsets
  rejected (errPdty), externals rejected (errPdex), then `akitaDexCurveFunded(pay(curveMbr), Init)`;
  the result must report reserves (0,0) (errPdcv) and its snapshot price/activeId are cached.
- Swap/Quote: `akitaDexCurve` with `amountIn` = net of hook fees, `feeBps` = running fee,
  `maxFeeBps` = pool cap, `protocolFeeBps`, `reserveA/B` = booked reserves. Checks: §4.5 (input
  consumed, `0 < out < reserveOut`, lpFee ≤ ceil(in·maxFeeBps), floor ≤ protocolFee ≤ lpFee, aggregate
  cross-check, band with +1 tolerance and P1 direction).
- Fungible curve pools: `addLiquidity` → `akitaDexCurveFunded(pay(0), Add)` with `lpSupply`;
  `removeLiquidity` → `akitaDexCurve(Remove)` with `lpAmount`/`lpSupply`. `emergencyRemoveLiquidity`
  never calls the curve (Vault-side pro-rata; the curve's state is left stale).
- Curve-managed pools: `addLiquidityCurve(mbr, depA, depB, poolId, positionId, minShares, curveArgs,
  data)` forwards `mbr.amount` to the funded Add (`owner` = Txn.sender, `positionId` 0 = new);
  `removeLiquidityCurve(poolId, positionId, minA, minB, curveArgs, data)` calls Remove even when paused
  (hooks and sync skipped). Unused deposits are refunded from the escrow.
- Add checks: `used ≤ deposits`, `mbrUsed ≤ mbr`, aggregate = reserves + used, `P1 == P0`; fungible
  LP mint bound. Remove checks: `out ≤ reserves`, aggregate = reserves − out, `P1 == P0`; fungible:
  `shares == lpAmount` and `out ≤ mulDiv(lp, reserve, S)`. All errPdcv.
- Custody on a curve pool: both-negative → errPdki (before any curve call); mixed → L2 floor
  `V(r') ≥ V(r)` at the cached P0 (errPdki), then `Settle` with `feeBps = custodyFeeBps` and the real
  `poolId` (§10 A2), then aggregate + direction band (errPdcv). Donations (custody, `sync`, inline sync)
  go through `Settle` with `negA = negB = false`.
- Hook contexts: `ctx.curve` = curve app; after a curve call in the op, `ctx.after` = the curve's own
  snapshot and `ctx.curveData` = its `hookData`; `ctx.positionId` at liquidity points of curve-managed
  pools.
- Budget: `ensureBudget(400)` after every curve call (A14). **Curves must return with ≥ 100 opcodes of
  pooled budget left.**

### MockCurve (`tests/mock-curve.algo.ts`, core-owned)

Honest constant product in either LP mode (fixed at `create(vault, lpMode)`); Init args
`initA u64 ‖ initB u64` set the starting price. Reserves are taken from the request (the Vault's
booking is the truth), so it tolerates a stale state after an emergency exit. Per-pool state
`{priceX64, totalShares, swaps, settles}` (`getPoolState`), positions `{poolId, owner, shares}`
(`getPosition`), and `lastOp`/`lastPoolId` globals. `update()` (UpdateApplication) + `MockCurveV2` for
pinning tests. Modes (`setMode`): 0 honest, 1 wrong aggregate, 2 better than band, 3 P1 wrong side,
4 lpFee > max, 5 protocolFee < floor, 6 over-mint, 7 Add moves price, 8 Init non-zero, 9 permissive
Settle, 10 revert all, 11 Quote returns 0, 12 Swap closes the pool, 13 burn the pooled budget to 100,
14 Remove overpays, 15 Remove moves price, 16 Settle price on the wrong side, 17 Settle wrong aggregate.

### Fixture and reference notes

- `createPoolCarriers(hooks, curve = false)`: a curve pool adds the curve app, its `t:` approval box and
  its own pool box, so a curve pool with ≥ 1 hook gets one opUp() carrier (`createPool` passes
  `config.curve !== 0n`).
- A poke whose custody hook reaches a curve Settle, a curve swap with a box-writing hook, and a
  curve-managed full remove in budget-burning mode each needed one opUp() carrier for references in
  `curve-slot.e2e.spec.ts`.

## M3 (2026-10-02): launch pools

No frozen interface file was changed in M3. FINAL-SPEC §10 gains A16 (graduation keeps the price exact in
every state), A17 (the graduation quote surplus is booked as protocol fees) and A18 (launch validation
details).

### What the Vault now does with launch pools (for WP5b integration)

- `createPool` with `virtualA | virtualB ≠ 0` (native only) makes a launch pool. It needs
  `graduationThreshold > 0` and a non-zero quote-side offset (`quoteIsA ? virtualA : virtualB`), else
  errPdlb; a pool without offsets must have `graduationThreshold == 0` (errPdlb); externals → errPdex.
  `maxFeeBps ≤ 9,000` (F5) and `feeBps ≤ min(maxFeeBps, 1,000)` as before. Offsets, threshold and
  `quoteIsA` are stored in PoolInfo.
- `initializeLaunch(tokenDeposit, reserveDeposit, poolId)`: unpaused (errPdpp); creator, bonding,
  `lpSupply == 0` (errPdlb); both deposits are token-side transfers into the escrow (errPdan / errPdin).
  `reserve_t += S`, `locked_t += M`, `lpSupply = lockedLp = sqrt(eA·eB)` (no MinimumLiquidity is subtracted,
  nothing is transferred). AfterAddLiquidity hooks get `amountIn/amountOut` = the seed on A/B,
  `lpAmount = lpSupply = L0`, `before` = the pool before the seed (flags = CurveFlagBonding) and `after`
  = the seeded pool. Returns L0. A hooked init tops up its budget (400) before the stack; hookless it uses
  369 opcodes.
- Bonding (`virtualA | virtualB ≠ 0`): swaps price on effective reserves, output strictly below the real
  reserve (errPdil; `tryQuoteRoute` 0). Swaps/quotes before `initializeLaunch` fail errPdlb
  (`tryQuoteRoute` 0). `addLiquidity`, `removeLiquidity` and `emergencyRemoveLiquidity` fail errPdlb (F3).
  Custody uses the fee-adjusted k on effective reserves; a loss may only come out of the real reserve
  (locked M and protocol fees are protected). `ctx.reserveIn/Out` are effective reserves; native snapshots
  carry `flags = CurveFlagBonding`.
- `graduate(poolId)`: permissionless; unpaused (errPdpp); bonding, initialized and `r_q ≥ threshold`
  (errPdgr). `target = ceil(r_q·e_t/e_q)`: if `target ≤ r_t + M` the token reserve becomes `target` and the
  rest stays locked forever; otherwise all of M joins and `r_q − ceil((r_t+M)·e_q/e_t)` moves to
  `protocolFees_q` (collected to the treasury by `collectProtocolFees`). Offsets are zeroed; `lockedLp` stays
  in `lpSupply`. Emits `GraduationEvent`. 283 opcodes, no inner transactions, no hooks. **LaunchManager
  note:** after graduation the treasury receives the surplus only when someone calls
  `collectProtocolFees`.
- After graduation the pool is plain CP: outside LPs add/remove pro-rata against `lpSupply` (which
  includes `lockedLp`), swaps are `cpOut` on real reserves.

### Tests

`smart_contracts/plugin-dex/launch.e2e.spec.ts`, block `describe('core launch')` (24 tests) inside
`describe('PluginDex launch pools')`. WP5b should add its cases in a sibling `describe` block; the
`beforeAll` deploys its own Vault, sets a 10% protocol share with a separate treasury account, and creates
TKN (lower id) and QTA (higher id).

### Size and references (A11 follow-up)

The Vault is now 12,145 B approval + 4 B clear (M2: 11,344 B). Program bytes above 8,192 = 3,957, so a
call reading `p:` and `h:` now needs **3** box refs of read quota (one of them empty), not 2.

- algokit-utils 9.2.2 `populateAppCallResources` does not dedupe: for every asset holding it places
  (escrow, hook, recipient) it appends the asset to `foreignAssets` again. A swap through one custody or
  HookFeeOut hook therefore overflows the 8 references of a single call at this size ("No more transactions
  below reference limit"). The v1 and core-v2 `swap` helpers now put one `opUp()` **reference carrier**
  first in the group on hooked pools (the swap stays last). SDK planners (WP4) should dedupe references
  rather than rely on algokit, and budget `ceil((len − 8192 + Σ box bytes)/2048)` box refs.
- New fixture helper `readQuotaEmptyRefs(algorand, dex, boxes)` (tests/fixtures/plugin-dex.ts) returns the
  number of empty box refs an explicit-reference call needs next to its named boxes; `emptyBoxRef()`
  builds one. The explicit-reference tests use it: `swapRoute` in plugin-dex.e2e (one extra empty ref) and
  core-v2 `swapExplicit`, which puts overflow refs on an `opUp()` carrier placed first in the group. P0 (d)
  (4 custody hooks: 5 apps + 1 asset + 2 boxes already fill the call) now runs with one reference carrier
  that issues no inner transactions; the Vault's swap call still issues 17 direct inners (25 with
  descendants). §4.12 (12) (3 hooks) still fits in one call with no carrier.
- `curve-slot.e2e.spec.ts`: `removeLp(poolId, lpAsset, amount, carrier = false)` can put the same reference
  carrier first; the budget test's burn-mode fungible-curve remove uses it (without it the call hit
  algokit's reference limit in about half of the runs).

## M4 (2026-10-02): external positions

No frozen interface file was changed in M4. FINAL-SPEC §10 gains A20 (external-slot booking details), A21
(budget around valuator calls) and A22 (clip tests use short time warps). Every `errPdni` stub is gone, so the
A7 release gate in `size.test.ts` now always runs.

### What the Vault now does with external slots (for WP4/SDK and hook authors)

- **`createPool(…, externals)`**
  - Native, non-launch pools only. A curve or launch pool fails with errPdex. At most 2 slots.
  - Each slot needs: side 0/1; a receipt that is not 0, assetA or assetB, and no duplicates; `capBps ≤ 5,000`;
    a hook installed with External; an approved valuator. Any of these failing gives errPdex.
  - The valuator must be at its approved version (errPdvr) and must quote a rate > 0 now (errPdva).
  - The escrow is funded for, and opted into, every receipt. Box `e:` is written, and
    `PoolInfo.externalSlots` holds the number of slots.
- **Custody, on any pool with slots**
  - Every custody hook call, External or not, snapshots every slot's receipt holding.
  - A change to a slot's receipt holding by any hook other than that slot's own External hook fails with
    errPdhm.
  - A change by the slot's own hook moves the slot's units by the measured delta. The slot is re-marked
    (one valuator call), and the value change is folded into the side's delta.
  - At a frozen rate (same timestamp) a deposit or recall is value-neutral except for floor dust. The hook
    must donate that dust (`MockDexHook` value2), or the guard sees a 1-unit loss and fails with errPdki.
  - Then: units that grew must stay ≤ capBps of the side reserve (errPdec), and `reserve ≥ external` must
    hold on both sides (errPdki).
- **`revalue(poolId)`** is permissionless. It marks every slot that holds units within the per-day clips.
  - A gain is a donation and a loss lowers the reserve.
  - The cap does not apply, so appreciation past the cap is booked.
  - `addLiquidity` and `removeLiquidity` run the same marks inline, after sync. A reverting valuator
    therefore blocks them; `emergencyRemoveLiquidity` does not call it.
- **`writeDownExternal(poolId, slot)`**
  - Admin only (errPdao), on a paused pool (errPdnp), with a valid slot index (errPdex).
  - Sets `rate = min(booked, valuator)` with no clip; a valuator rate of 0 fails with errPdva.
  - Liquid booked funds are unchanged; only the book falls.
- **Removes (normal and emergency)**
  - Liquid payouts are `lp·(reserve − external)/S`.
  - Each slot holding units also pays `floor(lp·units/S)` receipt units in kind to the LP, and
    `floor(lp·bookValue/S)` leaves the slot and its side's reserve.
  - One `ExternalExitEvent` is emitted per such slot.
  - **The LP must be opted into every receipt with units > 0**, or the remove fails. The SDK should add the
    opt-ins.
- **Swaps** never read `e:`. Output must stay below `reserveOut − externalOut` (errPdil); `tryQuoteRoute`
  returns 0 instead.

### Size and references

- The Vault is 13,597 B approval + 4 B clear (M3: 12,145 B; +1,452 B), which is under the 15,000 B gate.
- Program bytes above 8,192 are now 5,409, so every Vault call needs 3 box refs of read quota before it
  reads any box. A call that reads `p:` + `h:` + `e:` needs 4.
- Explicit-reference callers should keep using `readQuotaEmptyRefs`.
- In `external.e2e.spec.ts`, every poke, revalue and remove on a slot pool runs behind 2 `opUp()`
  reference carriers, and every swap behind 1. These calls add the hook, venue, valuator, receipts and
  `e:` to the references.

### Mocks and fixture (core-owned)

- **`tests/mock-lender.algo.ts`, `MockLender(underlying, rate)`**
  - `bootstrap()` creates the receipt ASA. Fund the MBR first.
  - `depositAlgo(pay)` / `depositAsset(axfer)` mint `floor(amount·RateScale/rate)` receipts to Txn.sender.
  - `redeem(axfer)` pays `floor(units·rate/RateScale)`.
  - `setRate(rate)` is open to anyone.
- **`tests/mock-valuator.algo.ts`, `MockValuator(lender)`**
  - Lender mode (0) reads the lender's `rate` global, and returns 0 for any receipt/underlying pair that is
    not the lender's own.
  - Fixed mode (1) returns `value`; revert mode (2) fails with errVlRv.
  - `update()` (UpdateApplication) exists for pinning tests.
- **`MockDexHook`** modes 0-11 are unchanged. New:
  - `configureExternal(lender, underlying, receipt)` configures the external modes.
  - `ModeExternalDeposit = 12`: deposit `value` from the escrow and donate `value2` dust.
  - `ModeExternalRecall = 13`: redeem `value` units and donate `value2` dust.
  - `ModeMoveReceipt = 14`: move `value` of asset `value2` from the escrow to the hook.
  - `ModeSendTo = 15`: send `value` of asset `value2` from the escrow to `target`.
- **`tests/fixtures/plugin-dex.ts`**
  - `createPool` takes `externals` (default `[]`).
  - New `externalSlot({...})` builder, with a default cap of 5,000 and default clips of 100 bps/day.
  - `createPoolCarriers(hooks, curve, externals)` adds the slot references.
  - All changes are backwards compatible.

### Open for Kyle

- A receipt ASA with a **clawback or freeze** address can break the in-kind exit, including
  `emergencyRemoveLiquidity`. A clawback could take receipts from the escrow, leaving it holding less than
  `slot.units`; a freeze makes the payout fail. The Vault does not check this, because the creator picks
  the receipt.
- Options:
  - make "the valuator answers only for receipts without freeze/clawback" part of the valuator approval
    checklist; or
  - add a createPool check that the receipt's freeze and clawback addresses are zero (errPdex, about 40 B).
    This would rule out venues whose receipts carry a clawback.

## M5 (2026-10-02): ConsensusKeyregHook and the end of WP1

No frozen interface file and no Vault code changed in M5 (the Vault is still 13,597 B; only its status comment
changed). FINAL-SPEC §10 gains A23 (ConsensusKeyregHook details). `ARCHITECTURE.md` now describes v2 as built.

- **`hooks/consensus-keyreg.algo.ts`, `ConsensusKeyregHook(dex, admin)`** (841 B):
  - Install with points = Poke, perms = Custody, flags = LazyCustody; approve with Custody.
  - Admin: `setAdmin`, `setPoolKeys(poolId, PoolKeys)`, `deletePoolKeys`, `withdraw(amount)`; read `getPoolKeys`.
    Errors: errCkad (not admin), errCkkw (voteFirst > voteLast), errCkda (operator data not `[0]`/`[1]`).
  - Operator `poke(poolId, i, [1])` goes online, `[0]` offline. Everyone else's poke is a no-op.
  - Fee tank: the hook's ALGO balance; it also pays the MBR of the `k` boxes. The 2 ALGO incentive fee is paid
    only when the escrow is not yet eligible (once per escrow on LocalNet).
  - Emits `KeyregEvent { poolId, escrow, online, fee }`.
- **SDK note:** a go-online poke needs fee credit for 4 fee-0 inners (the escrow's keyreg pays its own 2 ALGO);
  algokit's `coverAppCallInnerTransactionFees` handles it.
- WP1 acceptance run (2026-10-02): plugin-dex.e2e 23, core-v2 41, size 3, curve-slot 20, launch 24, external 19,
  consensus-keyreg 14 and tests/migration-scripts.e2e 36: 180 of 180 passed.

## Hooks fix (2026-10-02): ACC-01 origin bound to real control

No frozen interface changed. `hooks/shared/origin.ts` (used only by `GatedFeeHook`) now checks control as well as
the creator:

- A finding was confirmed on LocalNet: a factory-created wallet passes the creator check even after its admin
  `UpdateApplication`s it to a program that writes `controlled_address = <whale>` (`AbstractedAccount.update`
  is admin-only but accepts any program, and the creator never changes). GatedFeeHook then measured the
  whale's power, impact and gates for the attacker's spender.
- `resolveOrigin` now trusts `controlled_address` only when the wallet really controls it. That means it is the
  wallet's own address, or its auth address is the wallet's address and the wallet's address has a zero
  auth address. Otherwise the origin is `spender`. A wallet created by `AbstractedAccountFactory.newAccount`
  always meets this rule, because the factory rekeys an external controlled address to the wallet. The new
  helper is `walletControls(wallet, controlled)`.
- **Behaviour note for SDK/UI:** inside an ARC-58 plugin group, the controlled address (or the wallet
  address) is temporarily rekeyed to the plugin app. A pass opened or refreshed in that window therefore
  measures `spender`. Clients must call `openPass`/`refresh` outside a plugin group. The hot path reads
  only the cached pass, so swaps through a plugin are unaffected.
- **For whoever does the planned `utils/functions.ts` ACC-01 fix:** a creator-only check has the same hole.
  Apply this control check, or pin the wallet program (version/approval hash), there too. `origin.ts`
  inlines the fix so that it does not touch the shared util (AGENTS.md rule).
- Tests (`hooks/gated-fee.e2e.spec.ts`): T-8 now uses a staker that is really rekeyed to the wallet and
  covers the "wallet address rekeyed elsewhere" case. T-8b covers a factory-created wallet that claims a
  staker it does not control. "ACC-01 UpdateApplication" covers a real `AbstractedAccountFactory` wallet
  updated to a TEAL program that writes `controlled_address = whale`, with a genuine external-controlled
  wallet as the positive control. All three failed before the fix (power 9) and pass after it (21/21).

## Bins fix (2026-10-02): donations with an empty active bin, and active-bin adds that act as swaps

No frozen interface changed and no Vault code was changed by this fix. Files: `curves/bins/engine.algo.ts`,
`tests/models/bins-model.ts`, `curves/bins/bins.e2e.spec.ts`. These two items override bins.md §4.5 (composition
fee) and the "a pure donation must go to a non-empty active bin" sentence of bins.md §7.

### B1. A Settle donation never reverts (was: errPdki when the active bin has no supply)

- **Before:** `settleOp` rejected every donation while the active bin's supply was 0. An empty active bin is a
  normal state: a fresh pool, a one-sided range, or the active bin's last LP leaving. In that state a 1-unit
  transfer (or 1 µALGO on an ALGO pool) to the escrow made every inline sync revert. That blocked
  `removeLiquidityCurve` and `addLiquidityCurve` (confirmed on LocalNet), and it also blocked `sync()`.
- **Now:** if the active bin has supply, the donation goes to it, as before. If it does not, X goes to the
  nearest occupied bin above the active bin and Y to the nearest occupied bin below it. That respects the
  composition rule: bins above hold only X and bins below hold only Y. If that side has no occupied bin, the
  amount stays in the empty active bin with supply 0. The next depositor into that bin then receives it.
  The active id and price never move. New module helpers: `nearestOccupied` and `creditBin`.
- **Interplay with the core track's §10 A24** (the Vault change made at the same time): curve-pool removes no
  longer run the inline sync, so exits never call Settle. The two changes are complementary. A24 protects
  exits even with a curve that rejects donations. B1 makes the bins engine meet A24's obligation that "the
  curve must be able to place any donation while it has booked reserves", which keeps `sync()`, adds and
  custody donations working.
- **SDK note:** a `sync`, an add, or a custody donation on a pool whose active bin is empty touches the chunk
  of the nearest occupied bin on each side. Add those chunk box refs.

### B2. An add to an occupied bin takes only that bin's composition (replaces the LB composition fee)

- **Before:** an add to the active bin was priced by value, using the LB composition fee at the static
  `req.feeBps` (`pool.feeBps`). An imbalanced add followed by a 100% remove in the same group was therefore a
  swap at the bin price. It paid about f·(1+f) to LPs and skipped BeforeSwap/AfterSwap, DynamicFee, HookFee,
  HookFeeOut, taxes and the protocol fee. On LocalNet, 3,380,721 Y bought 3,238,558 X at about 0.30%; the same
  trade as a real swap cost about 5.3%.
- **Now:** for any bin with supply > 0,
  `shares = min over its non-empty sides of floor(amount · supply / reserve)`, and each side is charged
  `ceil(shares · reserve / supply)`. The Vault refunds the unused part of the deposit.
  - No value moves between X and Y, so an add followed by a remove cannot be a swap.
  - For the single-sided bins away from the active bin, this is the same as before.
  - The composition fee, `activeBinFee` and `compositionFee` are removed. An add no longer updates the
    volatility accumulator. `req.feeBps` and `req.maxFeeBps` are unused on Add.
  - An empty bin (supply 0) still mints `L(x, y) >> 96`, so the first depositor sets the composition.
- **Behaviour change for LPs and the SDK:**
  - A deposit into the active bin that does not match its ratio is partly refunded.
  - A deposit that gives none of a side the active bin holds gets 0 shares and fails with errBnZs. Example: Y
    only into a mixed or all-X active bin. Such Y belongs in the bins below the active bin.
  - An all-zero bin with supply > 0 fails with errBnLq (defensive; not reachable).
- **Tests:**
  - `(7) review fix` reproduces the finding's pool: base 30 bps, DynamicFee 500 bps, HookFee, 15% protocol
    share. It runs add + 100% remove in one group and asserts the trader gains no X and no Y is taken.
  - `(9) review fix` covers a 1-unit X and Y transfer on an X-only range. The remove succeeds; `sync` books X
    into bin +1 and leaves Y in the empty active bin. A second transfer is synced the same way, adds still work,
    and every unit is paid out.
  - Both tests failed on the old engine: the trader received 3,238,558 X, and the remove failed with errPdki.
  - Test (9), the custody "empty active bin" test and the composition test were updated to the new rules. The
    fuzz no longer skips donations when the active bin is empty.

## Vault-guard fixes (2026-10-02): mint valuation of external slots, and tests for curve-pool exits

No frozen interface changed. Files: `contract.algo.ts` (`revalueCore`, `markRate` split into `liveRate` and
`clipRate`, the native mint branch of `addCore`, a private `Unbooked` type) and a new spec,
`vault-guard.e2e.spec.ts`. The number A26 is used because the concurrent core change already uses A24 (curve-pool
removes skip the inline sync) and A25 (custody revaluation) in `contract.algo.ts` comments; FINAL-SPEC §10 should
get A24-A26 together when they are consolidated.

### A26. A mint prices every external slot at max(book, valuator) (behaviour, §4.4/§4.7)

- **Finding (confirmed on LocalNet):** `addCore` minted against booked reserves, whose external part is booked at
  the clipped rate (`markRate` allows at most `rate·maxMarkupBpsPerDay·dt/day` up). `removeCore` pays the
  external part in kind, and the receipts are worth the valuator's rate. While the valuator was above the book,
  a JIT add + remove bought the slot at the book and took it out at the real value. The refuter's run: 3.2M
  units booked at 1.25, lender rate +10%, add 9× the pool and remove it, +360,000 TKA to the attacker (90% of
  the 400,000 gap), taken from the existing LP.
- **Now:** the inline `revalueCore` before a mint still books only the clipped mark, and also returns, per side,
  `Σ max(0, floor(units·v/RateScale) − bookValue)` with `v` the same valuator answer (no extra valuator call).
  The native mint uses `reserveX + unbookedX` for `fromA/fromB` and `needA/needB`. Booked reserves, the clip and
  the swap price are unchanged; only the depositor pays for the unbooked value. When the valuator is **below**
  the book (a pending markdown), the mint still uses the book, so the §4.7 "write down, then mint cheap"
  protection is unchanged. Removes need nothing: they pay liquid pro-rata plus receipts in kind.
- Side effects: a depositor on a pool with an unbooked gain gets fewer LP (or uses less of the other asset) than
  a book-only quote suggests. SDK quotes for `addLiquidity` on pools with slots must read the valuator rate
  (`akitaDexRate`) and apply the same `max`. The booked price moves toward the real ratio by the depositor's
  own extra payment.
- Residual: BeforeAddLiquidity custody hooks run after the valuation. A recall there realizes value that was
  already counted (the depositor overpays, which is safe). A deposit at a rate below the valuator's books a loss
  that the guard rejects unless the hook donates it. The clip still shapes the swap price: a markup clip far
  below the venue's yield keeps the external side underbooked for swaps. That issue belongs with the separate
  finding about clip parameter bounds.
- Tests (`vault-guard.e2e.spec.ts`, "§10 A26"): the refuter's scenario with `maxMarkupBpsPerDay = 0`. The clip
  never books the +10%, which makes the test deterministic under LocalNet's shared clock. The attacker's
  profit at the pool's real price is ≤ 2 base units, the minted LP equals `amount·S/(reserveB + unbooked)`, and
  the existing LP's real value per LP does not fall. Before the fix the mint was 90,000,000 LP and failed the
  assertion. A second test checks that a valuator below the book leaves the mint at the book.

### Regression tests for §10 A24 (curve-pool removes skip the inline sync)

The finding "a 1-unit donation blocks every unpaused removeLiquidityCurve" is fixed by the concurrent core change
(§10 A24 in `removeCore`) together with the bins engine's B1. `vault-guard.e2e.spec.ts` adds Vault-level tests that
do not depend on the engine. They use MockCurve mode 17 (`SettleWrongAggregate`) as a curve that refuses every
donation:
- curve-managed: `sync` fails with errPdcv, but `removeLiquidityCurve` pays exactly pro-rata of the booked
  reserves and leaves the unit unbooked (escrow identity + 1). Once the curve accepts again, `sync` books it.
- fungible curve: `removeLiquidity` pays `lp·reserve/S`. An add still syncs first (no JIT capture), so it stays
  refused until the curve accepts the donation.
- bins: an X-free, Y-at-−3 position with 1 Y sent to the escrow removes in two halves with the donation
  unbooked.

Both MockCurve tests failed before A24 (errPdcv from the inline Settle). The bins test also failed on the
pre-B1 engine (errPdki).

**Residual (adds):** with a curve that refuses a donation, adds on that pool stay blocked until the curve can
place the donation. A Vault-side soft Settle would need a `CurveRequest`/`CurveResult` flag, which would be a
frozen interface change, so it is **not** made. The obligation stays with the curve (bins: B1).

## Vault-flows fixes (2026-10-02): A24 (curve-pool exits never Settle) and A25 (custody re-mark split)

No frozen interface file changed. Vault code: `removeCore`, `addCore` (comment only) and `custodyCall` in
`contract.algo.ts`. FINAL-SPEC §10 gains A24 and A25; A25 overrides the "folded into its side's delta" sentence of
A20 and the re-mark lines of the §4.6 pseudocode.

### A24. Curve-pool removes run no inline sync (behaviour, §4.4)

- **Finding:** `removeCore` ran `syncCore` on every unpaused remove, and on a curve pool a surplus goes through
  the curve's `Settle` as a donation. A curve that cannot place a donation (bins before B1: an empty active bin)
  turned a 1-unit transfer to the escrow into a revert of every unpaused `removeLiquidityCurve`.
- **Now:** `removeCore` runs `syncCore` + `revalueCore` only when `pool.curve == 0`. Curve-pool exits
  (`removeLiquidity` on fungible curve pools, `removeLiquidityCurve` paused or not) never call `Settle`; their only
  curve dependency is `Remove` (§8). An unbooked surplus left behind by an exit accrues to the remaining LPs at the
  next `sync`, so skipping it cannot be used for JIT capture. Native pools are unchanged.
- **Adds keep the inline sync** (all pools with liquidity), so a newcomer cannot mint against unbooked surplus.
  On a curve pool that is a `Settle(donation)`, so the curve must be able to place any donation while it has
  booked reserves; the bins engine meets this since B1. A curve that refuses one blocks adds (not exits) until it
  can place it. A soft Settle would need a frozen-interface flag, so it is not made.
- **Tests:** `curve-slot.e2e.spec.ts` "§10 A24" (MockCurve mode 17 refuses every Settle; one curve-managed and one
  fungible curve pool, 1 µALGO + 1 TKA sent to each escrow: `sync` and the add fail with errPdcv, both removes
  succeed with 0 Settles and the escrow identity off by exactly the unbooked unit, then an honest `sync` books it).
  It failed before the fix with errPdcv from the remove. `vault-guard.e2e.spec.ts` and bins test (9) also cover A24.

### A25. A custody re-mark books the revaluation of units already held like `revalue` (behaviour, §4.6/§4.7)

- **Finding:** when a slot's receipt holding changed, `custodyCall` re-marked the whole slot and folded the full
  bookValue change into dA/dB. That change includes `unitsOld·(rateNew − rateOld)`, the accrued markup or markdown
  that `revalue` books into the reserve. Folded into the guard, a markup let the slot's External hook take value
  up to the markup (receipts or liquid funds) with a delta that still classified as zero or a donation, and a
  pending markdown made a neutral just-in-time recall fail with errPdki unless someone ran `revalue` in the same
  block.
- **Now**, per changed slot: `rate = markRate(slot)` (one valuator call, clipped as before);
  `held = floor(unitsOld·rate/RateScale)`; `rev = held − bookValue` is booked straight into the side's reserve
  **and** its `external` (a gain is a donation, a loss lowers the reserve; the liquid book is unchanged); then the
  units move by the measured change and only `floor(unitsNew·rate) − held` is folded into the guard's delta. At
  dt = 0 (rate frozen) `rev` is 0 or the in-kind floor dust, so in-block deposits and recalls behave as before.
- Slotless pools only pay two zero-initialised deltas and one branch per custody call.
- **Tests:** `external.e2e.spec.ts` "§10 A25" (clip 10,000 bps/day, 1,000 s warps): with a +1% markup pending, the
  External hook taking 30,000 receipt units (worth less than the markup) fails with errPdki, and a neutral
  deposit books the markup as a donation; with a −1% markdown pending, a neutral recall succeeds and the loss
  lowers the reserve. Both failed before the fix (the take succeeded; the recall failed with errPdki).
- **Size:** the Vault is 13,839 B (with the concurrent A26 change), under the 15,000 B gate.


## Vault-lows fixes (2026-10-02): A27 (clip bounds, saturating band) and A28 (in-kind exit book value)

No frozen interface file changed (`MaxClipBpsPerDay` is a Vault-local constant, not in `constants.ts`; `math.ts`
unchanged). Vault code: `clipRate` (+ module helper `clipBand`), `validateExternals` and `exitInKind` in
`contract.algo.ts`. FINAL-SPEC §10 should gain A27 and A28 (not edited here: FINAL-SPEC is outside this pass).

### A27. Per-day clips are bounded at createPool, and the clip band saturates (behaviour, §4.2/§4.7)

- **Finding (vault-guard low):** `maxMarkupBpsPerDay` / `maxMarkdownBpsPerDay` were unbounded. `markRate`'s
  `mulDiv(rate·bps/1e4, dt, day)` and `rate + up` panic on overflow, and dt grows while nothing marks the slot, so a
  large clip (or a rate close to 2^64) bricked `revalue`, every custody re-mark and the inline revalue of
  add/remove until an admin pause. A huge markdown clip also removed the clip, so any valuator dip could be booked
  permissionlessly by `revalue` (write-down, then mint cheap).
- **Now:** `validateExternals` requires both clips `≤ MaxClipBpsPerDay = 10,000` bps/day (100% of the booked rate
  per day each way), else errPdex. The band is `clipBand(rate, bps, dt) = floor(floor(rate·bps/1e4)·dt/day)`
  computed with `mulw`/`divw` and saturated at 2^64 − 1 when the quotient would overflow (high word ≥ 86,400), and
  `high = rate + up` saturates at 2^64 − 1. Saturation never books more than the valuator: the result is still
  `clamp(v, low, high)`, so a saturated band only means "unclipped" in that direction after a very long gap.
- **Choice of cap:** 10,000 bps/day is the reviewer's suggested ceiling and what the A25 tests already use. With
  it a markdown of x% needs at least x/100 of a day of persistence (e.g. 1% → ~14 min). Pools wanting stronger
  protection set lower clips (the fixture default is 100 bps/day). See the stabilize note below.
- **Tests:** `external.e2e.spec.ts` "§10 A27, A28": createPool with markup 10,001, markdown 10,001 or markup 10^10
  fails errPdex (all three succeeded before); a slot booked at rate 1.84·10^19 (1 receipt = 18.4 TKA) survives
  2,000 s warps: `revalue` books an unchanged rate, then a −1% markdown, and an exit still works (before: `+
  overflowed` in `clipRate`). The `divw` saturation branch needs dt ≥ 1 day at any rate and is not warped on the
  shared LocalNet.

### A28. An in-kind exit takes the booked value of the units it pays (behaviour, §4.4)

- **Finding (vault-flows low):** `exitInKind` paid `floor(lp·units/S)` receipt units but removed
  `floor(lp·bookValue/S)` from the slot and the side's reserve. With a coarse receipt (one unit worth many
  underlying units) a small exit paid 0 units yet took up to a unit's value off the book, under-booking the
  reserve (swaps priced on a too-low reserve) until the next revalue booked the gap back as a donation.
- **Now:** `value = ceil(bookValue·unitsPaid/units)` (`mulDivUp`). An exit paying 0 units takes 0 value and the
  slot is unchanged; a full exit still takes the whole bookValue. Rounding up keeps the remaining book at or below
  the remaining units' share (the escrow holds at least what is booked). Units stay floored, so the LP forfeits
  the fraction of a unit they are owed: it stays with the pool (remaining LPs). The liquid payout is unchanged
  (computed from `reserve − external` before the exit).
- **Tests:** `external.e2e.spec.ts` "§10 A27, A28": 2 units booked at 36.8 M; removing S/4 pays 0 receipts and
  leaves the slot at 2 units / 36.8 M with reserveB down by the liquid share only (before: 27.6 M booked); then
  removing 3/4 of S pays 1 unit and takes exactly 18.4 M (the old rule took `floor(lp·bookValue/S)`, 27.6 M for
  that unit). Both failed before the fix. Cases (9) and (10) now compute the exit value with the same rule.
- **Size:** the Vault is 13,902 B, under the 15,000 B gate.

### Vault-guard low "custody re-mark folds the pending revaluation into the hook's delta"

Already fixed by A25 above (same finding); no further change. Covered by `external.e2e.spec.ts` "§10 A25".

## Bins lows (stabilize, 2026-10-02): traversal cap and reported shares

No frozen interface changed and no Vault code changed. Files: `curves/bins/{engine.algo.ts, layout.ts, math.ts,
bins.e2e.spec.ts, bins-model.test.ts}`, `tests/models/bins-model.ts`. The engine is 6,973 B.

- **B3. `MaxBinsPerSwapCap` 512 → 128.** At ~435-450 opcodes per bin, 512 bins needed ~330 op-ups, more than a
  group's 256 inners, so a long Quote (and `tryQuoteRoute`) failed on the inner limit instead of returning 0.
  Measured: dense ≤ 450/bin with the variable fee (e2e (20)); sparse worst case, one bin per chunk with a chunk
  switch and bitmap lookup per bin, 433.6/bin (new e2e (20b), 61 chunks). A cap-length traversal therefore needs
  ~85 op-ups, leaving room for the Vault, hooks and a router. Its 128 chunk refs fit one group only with access
  lists (16 per transaction), which is the caller's job. Init rejects `maxBinsPerSwap` > 128 with errBnAr. Within
  the cap the Quote returns 0 when liquidity or moves run out (e2e (22): 137 dense bins, cap 128, a 131-move trade
  quotes 0 through `tryQuoteRoute`, a 128-move trade quotes and swaps exactly the model).
- **B4. Reported shares round up per bin.** `CurveResult.shares` for Add and Remove is now
  `Σ ceil(binShares / 2^32)` (was `Σ floor`). A sole LP could inflate a bin's share price with a donation plus
  `sync`, so a fair later add confined to that bin minted < 2^32 bin shares. That was reported as 0 and failed the
  Vault's `minted > 0` (errPdsl). The Vault's `minShares` slippage is in this unit. The model has
  `reportedShares()`. Tests: e2e (23) (1 Y + 10^12 Y donation, then a 10^6 Y add mints 4,294 bin shares and
  reports 1), plus a model unit test.

## Verifier follow-ups (stabilize, 2026-10-02): router handback, closeChunk, keeper tip

No frozen interface changed and no Vault code changed.

- **Router handback rekeys the S checked in `enter()`** (`arc58/plugins/akita-router/contract.algo.ts`
  `finish()`). `rekeyBackIfNecessary` re-read `wallet.spending_address` after the swap. A fake wallet could
  publish an allowed S at `enter()` and have an app reachable during the swap flip it to the leg escrow E, and
  `finish()` then rekeyed E to the fake wallet (reproduced with an admin-approved fee-only hook). `finish()` now
  asserts `getSpendingAccount(wallet) === spender` (errRtCustody) and rekeys the cached `spender` directly.
  Test: `akita-router.e2e` E11 (a raw-TEAL fake wallet + BeforeSwap hook; the flip to E reverts with
  errRtCustody and E stays rekeyed to the router; a no-op flip confirms, so the revert is the handback check).
  It fails on the old code. Router approval: 3,790 B.
- **`closeChunk` requires the chunk's bin records to be all zero** (`curves/bins/engine.algo.ts`). Occupancy 0
  was not enough: a Settle donation parked in an empty active bin (B1) holds reserves with no supply. Once the
  active id moved to another chunk, the permissionless `closeChunk` deleted that chunk and the engine totals kept
  reserves no bin held. Now errBnCk. The payer can empty the bin itself (deposit into it, taking the parked
  amount, then withdraw) and close. Test: bins.e2e (9b). It fails on the old code. Engine: 6,991 B.
- **BackrunArbHook: an unfunded caller gets no ALGO tip instead of reverting** (`hooks/backrun-arb.algo.ts`).
  `ctx.caller.balance` compiled to `acct_params_get AcctBalance; assert`, so a fee-pooled zero-balance poker or
  swapper on a pool whose surplus is ALGO reverted the call. It now reads `op.AcctParams.acctBalance` without the
  assert; only a funded account (balance > 0, so a tip cannot fail the min balance) counts as deliverable.
  Test: backrun-arb.e2e "(stabilize) keeper tip: an unfunded fee-pooled caller ...". It fails on the old code.

## Open for Kyle (stabilize)

- **Clip ceiling (A27):** the Vault now caps both per-day clips at 10,000 bps/day. That still lets a markdown of
  ~4% be booked permissionlessly after one hour of valuator dip. If you want the clip to protect more by default,
  lower `MaxClipBpsPerDay` (e.g. 1,000) or require markdown ≤ markup; both are one-line Vault changes.
- **Receipt ASAs with clawback/freeze** (vault-guard low): still pending your decision (see "Open for Kyle" in M4);
  not implemented.
- **Bins dust bins vs `maxBinsPerSwap`** (bins low, not implemented; needs a policy decision). Every occupied bin
  costs one move however small it is. An attacker can fill the gaps of a sparse distribution with 1-unit bins
  (Y below, X above) at the cost of `minBinShares` per bin plus refundable chunk MBR. A swap that needs more than
  `maxBinsPerSwap` moves then reverts (Quote returns 0). Crossed dust bins stay occupied. Swaps split across
  consecutive calls in one group (bins.md §6) still pass, so the attack costs liveness and gas, not funds.
  Counting only "material" bins does not help, because the opcode bound then becomes the limit and dust is
  equally cheap against it. The real defence is a per-bin value floor, and its size depends on token decimals.
  Options:
  - (a) make `minBinShares` mandatory and meaningful at createPool. For example the SDK defaults it to
    `10^decimals(Y) · 2^32` (one whole Y token per new bin), and the engine requires `minBinShares ≥ 2^32` at
    Init. That breaks the existing specs that pass 0 (volatility-fee, vault-guard, akita-router).
  - (b) an engine-relative floor: a new bin must be worth ≥ pool value / 2^k. This raises the attack cost to
    about `maxBins · TVL / 2^k`, but it also sets a minimum deposit for small LPs in large pools.
  - (c) leave as is and have routers/SDK split a trade into ≤ `maxBinsPerSwap`-move slices in one group.
  - **Recommendation:** (a) with an SDK default, plus (c) in the router.
- **Bins 10% per-bin fee cap vs custodyFeeBps / hook fees** (bins low): still pending your decision; not
  implemented.
- **AntiSnipe FirstLiquidity without AfterAddLiquidity** (hooks low, fixed without an interface change). A hook
  cannot see its install's points (HookContext has no `points`, and adding one changes frozen `types.ts`), so it
  cannot reject the config at AfterInitialize. Instead, an unstarted clock now starts at the pool's first
  BeforeSwap: the start fee and the creator exemption last at most one trading round. If you prefer a hard
  reject, the Vault (or the SDK) would have to refuse `startMode = FirstLiquidity` installs that lack
  `HookPointAfterAddLiquidity`, which needs a `HookContext.points` field or a Vault-side per-hook rule.
- **Legacy ImpactFeeHook still sets the fee absolutely** (hooks low, optional part not implemented). It now
  prices only at BeforeSwap/Quote and never panics, but placed after a fee-raising hook (AntiSnipe) it can still
  lower that fee, as the "place before fee-raising hooks" doc says. Making it `max(ctx.feeBps, fee)` would change
  its v1 semantics (a minFee below the pool base fee would stop discounting small trades); your call.
- **A25 under a binding clip** (verifier, not implemented; a valuation-policy decision). `custodyCall` values a
  custody hook's receipt-unit change at the clipped rate r'. When the clip binds, two gaps remain:
  - (1) Skim (from reading the code, not reproduced on chain; needs a malicious approved External hook). With a
    binding markup clip (live v > r'), a recall of Δu units returns Δu·v of underlying but is booked at Δu·r'. A
    hook that recalls and takes Δu·(v − r') of liquid in the same call ends with dB = 0 and passes. It keeps the
    not-yet-booked appreciation of those units, which A26 treats as LP value.
  - (2) Liveness (confirmed on chain by the verifier with the 100 bps/day fixture clip). A recall after a binding
    markdown still reverts with errPdki unless the hook donates the gap. A deposit while the markup clip binds
    also reverts. Before A25 small deposits passed by netting against the booked markup. So the amendment's
    "makes recalls neutral after a markdown" holds only while the clip band covers the valuator move.
  - Options: (a) keep as is; approval of External hooks is the only defence for (1). (b) Conservative valuation:
    value units leaving the pool at max(v, r') and units entering at min(v, r'). This closes (1) and leaves (2)
    as it is now. (c) Value unit changes at the live rate v. This fixes (2) but lets a valuator moved within the
    call set the booked value, which is what the clip exists to stop.
  - **Recommendation:** (b). It is a Vault change in `custodyCall` only, with no interface change.
- **A24 residual: curve-pool exits do not book an existing surplus** (verifier, behaviour as designed). A curve
  pool's remove no longer runs the inline sync, so an exiting LP forfeits its share of unsynced LP-owned surplus
  (e.g. consensus rewards on an ALGO curve pool) unless it calls `sync()` first in the same group. Adds still
  Settle first, so a custom curve that cannot place a donation blocks adds (not exits) until it can; the bins
  engine always places one now (B1). Suggest: the SDK prepends `sync()` to curve-pool exits. No contract change.
- **B1 residual: a donation parked in an empty active bin goes to the next depositor into that bin** (verifier,
  confirmed on chain; not implemented). When no occupied bin exists on the donation's side, Settle leaves it in the
  empty active bin (supply 0). The first add into that bin, followed by a 100% remove, takes all of it in one
  group. That is harmless for a griefer's gift, but LP-owned donations can land there too: a custody hook's
  donated profit, or consensus rewards. `closeChunk` can no longer delete such a bin (see above). Options: (a)
  accept it, since it only happens when one side of the book is empty. (b) Book a parked donation to the pool's
  protocol fees instead (an engine + Vault result-shape question). (c) Place it in the nearest occupied bin on
  the other side, which breaks the composition rule (Y above or X below the active bin). Recommendation: (a),
  documented in the LP-facing docs.
