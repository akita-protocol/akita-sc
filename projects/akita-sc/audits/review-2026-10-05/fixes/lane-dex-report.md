# Lane dex report (slice DEXEXT)

All paths are under `projects/akita-sc/smart_contracts/`. The full hook diff against the pre-fix snapshot is in
`scratchpad/fix/dex-launch-tax.diff`.

## Findings

### DEXEXT-1 (Critical): done

The root cause was re-confirmed in code. `validateHooks` (`plugin-dex/contract.algo.ts:658-705`) accepts perms 0
with points AfterInitialize|AfterSwap. The Vault pays HookFeeOut only when a BeforeSwap result carried
`hookFeeOutBps` (`contract.algo.ts:887-899`, `:1226-1255`). The old hook booked the sell tax at AfterSwap without
checking that.

The fix lives in the hook only (`plugin-dex/hooks/launch-tax.algo.ts`). The Vault is unchanged.

- New global `pendingSell` (key `pending`) holds `poolId + 1`. A BeforeSwap on a sell sets it when `sellTaxBps > 0`.
  Any BeforeSwap on a buy clears it (`:106-123`). Quote never writes it.
- AfterSwap books the sell tax only when `pendingSell == poolId + 1`, then always clears the marker (`:126-136`).
  The marker is proof of payment. A BeforeSwap that returns `hookFeeOutBps > 0` either makes the Vault pay
  `mulDiv(out, bps, 1e4)` after AfterSwap, or the Vault reverts the swap with `errPdhm` (no HookFeeOut). Only one
  fee-out hook is allowed per pool. A stale marker from a pool that has no AfterSwap point can only match that
  pool's AfterSwap, and that point never runs.
- Buy path: there is no trust gap. A `hookFee` returned at BeforeSwap is paid by the Vault in the same call
  (`contract.algo.ts:902-904`). Without HookFee the swap reverts (`errPdhm`). The new test proves the revert.
- Totals per quote asset: new global `algoAccrued` (key `algo`) and new box map `asaAccrued` (prefix `q`, asset id
  → uint64, created at initialize next to the ASA opt-in). `book()` (`:140-147`) updates the pool and the total
  together.
- `claim` and `close` now pay through `payAccrued()` (`:187-198`). It asserts that the hook's holding covers every
  booking for that asset (ALGO: `balance ≥ minBalance + algoAccrued`; ASA: `holding ≥ asaAccrued[asset]`), new
  error `errLxsv`. Then it subtracts and pays. Per-pool accrued equals per-pool receipts by construction, so a
  claim cannot reach another pool's tax. The guard turns any future accounting gap (for example an ASA clawback
  from the hook) into a revert instead of a first-come drain.
- The same pattern does not exist in the other hooks. AntiSnipe, GatedFee, ImpactFee and VolatilityFee only
  return `feeBps` and hold no tax. SwapTax takes its HookFee at BeforeSwap (paid in the same call) and has one
  owner with no per-pool books. Nothing changed there.

### DEXEXT-2 (Medium): done

At the end of `initialize` (`:180-183`), the hook asserts `balance ≥ minBalance + algoAccrued`, new error
`errLxfd`. The F6 funding is paid before AfterInitialize runs (`contract.algo.ts:1775-1786`). An install whose
funding does not cover the MBR it adds (config box, ASA opt-in, ASA total box) therefore reverts, unless unowned
surplus ALGO (overfunding) covers it.

`launchTaxFunding(asa)` now also includes the total box: `2,500 + 400·17 = 9,300` µALGO (`:end of file`). The ALGO
case is unchanged. LaunchManager's `boxMbr(sizeOf<TaxConfig>())` stays sufficient because LaunchManager only
installs ALGO-quoted taxes.

There is a residual, as the finding already accepts. An attacker who installs with funding drawn from unowned
overfunding surplus can later `close` and collect the box MBR refund. That surplus belongs to no tax owner.

## Regression tests

All tests are in `plugin-dex/launch/launch-hooks.e2e.spec.ts`, `describe('LaunchTaxHook')`.

1. `DEXEXT-1 a direct install at AfterInitialize|AfterSwap with perms 0 accrues no unpaid sell tax and cannot drain
   another pool`. A victim pool holds 300,000 µALGO of unclaimed buy tax. The attacker pool is created directly on
   the Vault with LaunchTax at AfterInitialize|AfterSwap, perms 0, sell 5%. The test runs two sell/buy round
   trips. Then it asserts that the hook balance is unchanged, the attacker accrued 0, the attacker's `claim` returns
   0 and moves nothing, and the victim's accrual is intact. It also asserts the buy side: perms 0 with a buy tax
   reverts the swap (`errPdhm`) and books nothing. **Failed before the fix**: the attacker accrued 1,428,570 µALGO
   unbacked.
2. `DEXEXT-2 an underfunded install cannot lock accrued ALGO tax as MBR`. A fresh-ASA quote with funding 0, and with
   `TAX_FUNDING` only, both revert `errLxfd`. The hook's min balance is unchanged. Funding equal to
   `launchTaxFunding(asa)` succeeds and grows the min balance by exactly that amount. **Failed before the fix**: the
   funding-0 install succeeded and was paid from the victim's accrued ALGO.
3. `DEXEXT-1 a claim never pays more than the hook holds for every booking of that asset (errLxsv)`. An ASA quote
   with clawback books 10,000 units of buy tax. A clawback of 1 unit from the hook makes `claim` revert `errLxsv`.
   After the 1 unit is restored, the claim pays 10,000. This test is new for the guard, so it was not run on the old
   code (the old code had no guard).

One existing test was updated, and it did not assert insecure behaviour. `ASA quote asset: ...` now funds and
expects `TAX_FUNDING + OPT_IN_MBR + QUOTE_TOTAL_FUNDING` (the new per-ASA total box). A constant
`QUOTE_TOTAL_FUNDING = boxMbr(8n)` was added to the spec.

## Files changed

- `plugin-dex/hooks/launch-tax.algo.ts` (owned).
- `plugin-dex/launch/launch-hooks.e2e.spec.ts` (owned: the LaunchTax spec).
- Generated by the plugin-dex build: `artifacts/plugin-dex/**` and the generated clients, including
  `projects/akita-sdk/src/generated/LaunchTaxHookClient.ts` if the build script copies it.
- Shared files: none. The Vault (`plugin-dex/contract.algo.ts`) was not edited.

## Tests run

- Before the fix (old artifact), `-t DEXEXT`: 2 failed (tests 1 and 2), as expected.
- After the fix, `launch-hooks.e2e.spec.ts` (LocalNet, under the lock): **38 passed / 38**. That is the 35 existing
  tests plus 3 new.
- `plugin-dex/principal-abi.test.ts`, `tests/migration-dry-run.test.ts`, `plugin-dex/size.test.ts` (unit, these
  reference the LaunchTax artifact): **18 passed / 18**.
- The build `node scripts/build-contracts.mjs plugin-dex` passed under the build lock.

## Size, schema and ABI

LaunchTaxHook is new and never deployed (DEXEXT.md: every file in scope is untracked and new), so there is no
MainNet compatibility constraint.

- Approval program: 1,405 bytes (1 page).
- Global schema: 3 uints (was 1). Local schema: 0.
- ABI: unchanged (`create`, `akitaDexHook`, `claim`, `close`, `getConfig`).
- New error codes: `errLxfd` (underfunded install) and `errLxsv` (holding below bookings).

## Rollout

- Deploy the fixed LaunchTaxHook before the first LaunchManager launch. The catalog order and the post-deploy step
  are unchanged: `setHookApproval(perms 12)`.
- SDK and frontends that build direct LaunchTax installs with an ASA quote must pass `launchTaxFunding(asa)`, which
  now includes 9,300 µALGO more for the per-ASA total box. Without it, `createPool` reverts `errLxfd`.
- Docs not owned by this lane (`plugin-dex/ARCHITECTURE.md`, `research/FINAL-SPEC.md`) describe the LaunchTax
  install. Their text is still accurate. They do not mention the per-ASA total box or the BeforeSwap marker.
- Out of scope and unchanged: DEXEXT-3 (stranded tax without AfterSwap; the new totals make a later
  `holding − total` owner-scoped sweep straightforward), and the Low funding pattern in AntiSnipe and GatedFee.
