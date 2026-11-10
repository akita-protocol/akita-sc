# DEXCORE: PluginDex v2 Vault and BinEngine review

Slice: PluginDex v2 core (new code, never deployed, immutable by design). This is a read-only review. I built and edited nothing.
Pure unit tests run: `bins-model.test.ts` and `size.test.ts` (12/12 passed). No LocalNet tests were run.

Verdict: **PASS for Critical, High and Medium.** I found no path that loses, locks or misroutes funds, and no auth bypass.
The findings below are Low or Info. Most are hardening steps or items for the approval checklist.

## Scope

| File | Lines |
|---|---|
| `plugin-dex/contract.algo.ts` (Vault) | 2,162 |
| `plugin-dex/math.ts` | 89 |
| `plugin-dex/types.ts` | 308 |
| `plugin-dex/constants.ts` | 94 |
| `plugin-dex/errors.ts` | 44 |
| `plugin-dex/hook-interface.ts` | 62 |
| `plugin-dex/curve-interface.ts` | 119 |
| `plugin-dex/valuator-interface.ts` | 26 |
| `plugin-dex/curves/bins/engine.algo.ts` | 1,147 |
| `plugin-dex/curves/bins/math.ts` | 113 |
| `plugin-dex/curves/bins/layout.ts` | 123 |
| `plugin-dex/curves/bins/types.ts` | 35 |
| `escrow/contract.algo.ts` (the per-pool child app; read for custody) | 38 |

I also checked these against the code: FINAL-SPEC §4.5-§4.7, OPEN-DECISIONS #14/#14a/#15/#22/#25, ARCHITECTURE §1, and the
arc56 files for PluginDex, BinEngine and Escrow (OnComplete actions).

## Prior-finding verification

| ID | Status | Evidence |
|---|---|---|
| PD-01 (wrong auth-address check) | **Fixed (moot)** | The Vault's own account is never rekeyed. A custody call rekeys only the pool escrow, which is permanently rekeyed to the Vault at creation (`contract.algo.ts:1675`). Its `authAddress` is therefore non-zero and equals the Vault, so the check at `:744` is correct. |
| PD-02 (hooks control the shared DEX account) | **Fixed** | Each pool has its own child Escrow (`:1665-1678`). A flash rekey goes only to that escrow, and the rekey back is required (`:742-744`). The guard books every measured change: both sides negative fails (`:595`), a loss must come out of liquid LP funds (`:603-604`), and the k check or the L2 floor + Settle applies (`:610-645`). Hooks are admin-approved with a permission ceiling and a pinned version (`:672-675`, `:714`). `createPool` measures its cost and refunds any overpayment (`:1791-1796`). The "pool deletion path" part was not built: pools are permanent by decision. |
| I-7 (a disabled hook reverts the whole point) | **Fixed** | Hook stacks are frozen at creation. `setPoolPaused` plus `emergencyRemoveLiquidity` run no hooks (`:1958-1968`). `setAdmin` exists (`:1532`); see DEXCORE-3. |

## New findings

### DEXCORE-1 (Low): the native swap LP fee rounds down, toward the trader
- **Location:** `contract.algo.ts:1177-1178`
- **Scenario:** `lpFee = mulDiv(net, feeBps, 1e4)`. With `feeBps = 30`, any `net ≤ 333` pays an LP fee of 0. The protocol share `mulDiv(lpFee, protocolFeeBps, 1e4)` also floors.
  - A trader can split a trade into fee-free slices. The leak is under 1 base unit of input per swap, so it pays only for assets with few decimals and a high unit value.
  - The output is still floored, so k never falls. This is the one place where rounding is not in the pool's favor.
  - The curve path is already bounded with `mulDivUp` (`:556`), and BinEngine rounds its fees up on the aggregate.
- **Fix:** `lpFee = mulDivUp(net, pre.feeBps, BpsDivisor)`. `feeBps ≤ 9,000`, so `lpFee ≤ net` still holds.

### DEXCORE-2 (Low): a shortfall from outside custody (an ASA clawback) bricks every inline sync
- **Location:** `contract.algo.ts:1120` (assert), reached from `removeCore` `:1340`, `addCore` `:1432` and `sync` `:2077`.
- **Scenario:**
  1. Anyone creates a pool for an ASA that has a clawback address.
  2. The clawback takes 1 unit from the escrow.
  3. From then on, `holdA < bookedA`. Every `removeLiquidity` and `addLiquidity` on a native pool, and every `addLiquidity` and `sync` on a curve pool, reverts with errPdki until the admin pauses the pool.
  4. After the pause, `emergencyRemoveLiquidity` pays pro-rata of a book that is larger than the holdings. The last LPs' exits fail on the inner transfer.
- The clawback holder can steal LP funds anyway. What this adds is a 1-unit freeze of the normal exit path, which only the admin can undo. Pools are permissionless, so any clawback ASA can get a pool.
- **Fix:** do one of the following:
  - (a) In `createPool`, reject pool assets whose `AssetParams.clawback` is not the zero address, as the valuator rule already does for receipts (OPEN-DECISIONS #6).
  - (b) Book a negative surplus as a pro-rata loss instead of asserting.
  - (c) At minimum, document clawback assets as unsupported in the SDK and UI.

### DEXCORE-3 (Low): `setAdmin` is single-step and accepts any account, but pause is the only way out of a broken pinned dependency
- **Location:** `contract.algo.ts:1532-1535`; pause at `:1581-1585`; emergency exits need a paused pool (`:1965`, and `:2001` for curve-managed pools).
- **Scenario:**
  1. The admin is set to a mistyped address or the zero address.
  2. Later, a pinned dependency stops working. Examples: an updatable third-party hook that the admin approved, or a valuator version bump.
  3. Swaps and hooked add/remove on that pool revert because of `rejectVersion`.
  4. Nobody can pause the pool, so LP funds stay locked permanently.
- **Fix:** add a two-step handover (`proposeAdmin` / `acceptAdmin`), or at least `admin !== Global.zeroAddress`.

### DEXCORE-4 (Low, latent: no production External hook exists yet): receipt units sent to the escrow outside custody are never booked
- **Location:** `contract.algo.ts:755-787` (units move only by the delta measured in a custody call); `applySigned` underflow at `:769` (`math.ts:85-89`).
- **Scenario:**
  1. Anyone transfers 1 receipt unit to the escrow.
  2. `slot.units` does not change. The unit is stranded: it is not in reserves and not paid out in kind.
  3. An External hook later recalls "everything the escrow holds" (`now = 0`, `was = units + 1`). Then `moved.mag > slot.units`, `applySigned` fails with errPdki, and the recall reverts until the hook recalls by `slot.units`.
- **Fix:** add a hook-author rule ("recall by `getExternalSlots().units`, never by balance"). Alternatively, let `sync` or `revalue` book surplus receipt units into `slot.units` at the clipped rate as a donation.

### DEXCORE-5 (Info): a custody trade can opt the escrow out of a pool asset for good
- **Location:** `contract.algo.ts:330-336` (`holding` returns 0 when the account is not opted in); the guard is at `:590-649`. No code path re-opts the escrow.
- **Scenario:**
  1. On a curve pool with no protocol fees or locked funds on side A, an approved custody hook sends all of A out with `assetCloseTo`.
  2. It pays enough B to pass L2 and Settle.
  3. After that, deposits of A into the pool revert forever, and the pool works in one direction only. No funds are lost.
- On native non-bonding pools, k blocks this (`eLoss − loss = 0`). On bonding pools, the locked M on the token side blocks it.
- **Fix:** optional. After a custody call, assert that the escrow is still opted into both pool assets and every receipt.

### DEXCORE-6 (Info): hook approval does not require an immutable hook, and revoking an approval does not stop existing pools
- **Location:** `contract.algo.ts:1549-1557`
- **Scenario:**
  1. The admin approves a hook whose owner can update it.
  2. The owner updates the hook.
  3. Every pool pinned to it reverts on its hook points until the admin pauses each pool, one by one.
- The tests cover this behavior ("§4.12 (1)"). Every catalog hook is immutable (ARCHITECTURE §1), so this is only about third-party hooks.
- **Fix:** add "no UpdateApplication path" to the hook approval checklist, as for valuators.

### DEXCORE-7 (Info): after an emergency exit, a fungible-curve pool cannot be unpaused safely
- **Location:** the Vault-side pro-rata exit (`contract.algo.ts:1350-1364`) leaves the curve's own aggregate unchanged. The `curveRemove` and `checkSwapResult` cross-checks (`:536-541`, `:562-568`) then fail on every normal operation, unless the curve derives its totals from `req.reserveA/B`.
- BinEngine is LpModeCurve and keeps its own totals, so this applies only to a future fungible curve.
- **Fix:** document "an emergency-exited fungible curve pool stays paused". Alternatively, require fungible curves to read `req.reserveA/B`.

### DEXCORE-8 (Info): confirming OPEN-DECISIONS #14a
- The per-stake floor holds in the engine. An add into an occupied bin enforces it (`engine.algo.ts:825-829`), a partial remove sweeps a remainder below the floor (`:909-917`), and a bin's value at its own price never falls (constant sum, fees added, and Settle gross-up).
- What remains: the pool creator can set `minBinShares` at the 2^32 floor (1 base unit of Y per bin). A ladder of up to 128 dust bins then costs only refundable box MBR. Router slicing (#14) still clears it, because one small slice drains the ladder.
- Recommend keeping the SDK default of one whole Y token.

### DEXCORE-9 (Info): ALGO above MBR in an ASA/ASA pool's escrow is not tracked
- Custody measures only the two pool assets and the receipts (`:730-740`). A custody hook can spend stray ALGO or consensus rewards held by an ASA/ASA escrow, for example as inner fees.
- The amounts are negligible: the escrow is funded at exactly its MBR (`:1672-1674`).

## Suspicions (not confirmed)

- None that reach Medium.
- I traced the bins aggregate fee bound (`lpFee ≤ mulDivUp(amountIn, maxFeeBps, 1e4)`) through the slack carry. The carry keeps `F·FS − Σ in·f ∈ [0, FS)`, so the bound holds. A differential fuzz against the TEAL is still worthwhile (see Test gaps).

## Upgrade and rollout notes

- The Vault, BinEngine and the Escrow child are immutable: NoOp methods only, no Update and no bare actions (checked in the arc56 files). The Vault's state schema is 2 ints and 3 bytes.
- A bug found after deployment therefore means a new Vault plus an LP migration, through pause and emergency exits. DEXCORE-2 and DEXCORE-3 are cheap to fix now and impossible to fix later.
- The admin is the DAO wallet, and pause is the only liveness lever. Make sure the DAO can run `setPoolPaused` quickly; a DAO proposal cycle is the time LPs are frozen when a dependency breaks.
- BinEngine `create(vault)` binds the Vault. Confirm that the approved engine's `vault` global equals the deployed Vault id before `setCurveApproval`.

## Test gaps (named, not written)

1. Custody hook takes the in-flight swap input (BeforeSwap) or the undelivered output (AfterSwap) and pays the other side. Assert the user's payout and the escrow-vs-book equality afterwards.
2. Custody hook takes uncollected protocol fees or `locked` funds (loss > `reserve − external`) → errPdki. A test exists for locked M on launch pools; none exists for protocol fees.
3. Custody hook opts an ALGO-pool escrow into a junk ASA (MBR loss) → errPdki unless paid; custody `assetCloseTo` of a pool asset (DEXCORE-5).
4. Clawback of a pool asset from the escrow → behavior of `sync` / add / remove (DEXCORE-2).
5. A receipt unit donated to the escrow, then an External recall (DEXCORE-4).
6. Native dust swap where `lpFee == 0` (DEXCORE-1).
7. `swapRoute` where hop 2 has an eager BeforeSwap custody hook, with the hop-1 delivery unbooked in its escrow.
8. BinEngine differential fuzz (TEAL vs `tests/models/bins-model.ts`) over random add/swap/settle/remove sequences. Invariants: Σ bin reserves == totals, no payout above pro-rata, and the lpFee aggregate bound.
9. `setAdmin(zeroAddress)` (DEXCORE-3).

## Checked and OK

- **Flash rekey:** only the pool escrow is rekeyed, only for one pinned hook call, and the rekey back to the Vault is asserted (`:742-744`).
  - A hook cannot re-enter the Vault (AVM call stack).
  - It cannot sign for the escrow after rekeying back.
  - It cannot call `Escrow.rekey` or `Escrow.delete`: both need `Txn.sender == Vault` (`escrow/contract.algo.ts:15-34`).
  - It cannot mutate BinEngine: `requireVault` checks `callerApplicationId` (`engine.algo.ts:251, 264`).
  - Keeping the rekey or rekeying elsewhere fails (tests exist).
- **Custody guard conservation:** the liquid book tracks liquid holdings exactly through revaluation, skim and moved-unit booking: `reserve' − external' = reserve − external + ΔH`. `storeSlots` asserts liquid ≥ 0 (`:971`). Every loss case is covered:
  - both sides negative
  - a loss with zero gain
  - a loss above liquid
  - a k check failure (native)
  - an L2 or Settle infeasibility (curve)
  - the price-direction band
- **External slots:** only the slot's own External hook may change receipts (`:760`). Units leave at max(v, r′) and enter at min(v, r′). The cap applies on growth. Clips saturate. In-kind exits take value rounded up (A28). Mints price at max(book, valuator) (A26). `writeDownExternal` is admin-only and needs a paused pool.
- **Deposits:** they must be the positional ABI transaction arguments, sent to the pool's escrow, with amount > 0 and no rekey, close-to or clawback sender (`:351-367`). The LP burn is checked the same way (`:1304-1314`). No deposit can be reused.
- **Swap path:**
  - Hook fees come out of the deposit, bounded by `maxHookFeeBps`.
  - Only pricing points may set fees, and only with the matching permissions.
  - At most one HookFeeOut hook per pool.
  - Output is bounded by liquid reserves (`out < liquidOut`).
  - Curve results are cross-checked for aggregate, fee bounds, protocol-share bounds and the price band.
  - Route hops move escrow to escrow after each commit, and a route cannot repeat a pool.
- **LP math:**
  - The first deposit locks `MinimumLiquidity`: an inflation attack costs the attacker about 1000/1001 of the donation.
  - Pro-rata mint (floor) and refund (ceil of need).
  - Remove pays floor pro-rata of the liquid book.
  - The fungible-curve mint bound is enforced.
  - Bins adds into an occupied bin charge only ceil(shares·reserve/supply) and refund the rest, so bin share inflation gains at most 1 base unit.
- **Launch pools:**
  - Bonding blocks LP operations and swaps until `initializeLaunch` (creator only).
  - Graduation keeps price continuity with ceil rounding, and `surplus` and `retained` cannot underflow.
  - Locked M and `lockedLp` are excluded from sync and from payouts.
- **Fees:** protocol fees stay outside reserves and inside sync's booked set. `collectProtocolFees` zeroes the counters before sending and pays only the treasury. `MaxProtocolFeeBps` is 50% of the LP fee.
- **MBR:** `createPool` charges the measured Vault MBR plus escrow funding, Σ hook funding and the curve MBR, and refunds the excess to the payer.
  - BinEngine refunds unused MBR to `req.owner`.
  - `closePosition` refunds the current owner.
  - `closeChunk` refunds the rent payer. It refuses non-empty records and the active chunk.
- **BinEngine math:**
  - Every path uses the same canonical price, `anchor·(2^128+F)>>128`.
  - Shifts in traversal and the bitmap are guarded (`b === 63`, `j = 31`).
  - The u64 conversions (`btoi`) in the non-drained branch stay in range: `net < maxNet` there.
  - `va·binStep < 2^32` is enforced at Init.
  - Overflow cases revert at extreme prices; they only affect availability.
  - Quote writes nothing.
  - Remove depends on no other app.
  - Positions are bound to (owner, pool).
- **Admin surface:** `setAdmin`, `setProtocolFee`, the hook, curve and valuator approvals, pause and write-down are all `requireAdmin`. Nothing the admin can call moves LP funds to the admin.
- **No flash-loan entrypoint in the Vault.** "Lender" appears only as the test venue `MockLender` for external slots. Custody hooks are the only flash-style borrowers, and the guard bounds them.
