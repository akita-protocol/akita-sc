# Lane report: rollout

Findings: ACCT-1, ACCT-2, ACCT-3 + ROLLOUT-3, ROLLOUT-1, ROLLOUT-2, MISC-6. All paths are under
`/Users/kylebreeding/akita/akita-sc/projects/akita-sc` unless they start with `docs/`.

## Per finding

| ID | Status | What changed |
|---|---|---|
| ACCT-1 (High) | done | `smart_contracts/sunset/contract.algo.ts` and `wallet-factory.algo.ts`: `@contract({ avmVersion: 13 })` on SunsetContract, WalletFactorySunsetContract and AbstractedAccountUpdateStub. All three compile (approval and clear `#pragma version 13`; 695 B and 1,111 B). Every Update-plugin push of SunsetContract now passes the AVM 13 clear program (`updateApp({ clearProgram })`): `execute-deployer-sunset.ts` (`updateAppViaDao`, the DAO update), `sunset-cleanup.ts`, and `sunset-integration.e2e.spec.ts`. In both scripts the DAO wallet is sunset and deleted BEFORE the DAO app. The whole DAO wallet sequence is simulated first: `execute-deployer-sunset.ts` simulates once after the factory swap while the DAO is still live, and once right before the push. `sunset-cleanup.ts` simulates once before the push. Shared code: `scripts/lib/sunset-steps.ts` (`daoWalletSunsetSteps`, `simulateDaoWalletSunset`, `sendDaoWalletSunset`, `walletAssetCloses`). |
| ACCT-2 (High) | done | `scripts/lib/sunset-steps.ts` `walletFactorySunsetCalls` stages SunsetContract as `bc` and swaps the factory approval (with its AVM 13 clear program) in ONE execution group (one rekey window, 11 txns). Both scripts use it. The 2-proposal flow is gone. The legacy builder `buildLegacyDaoWalletUsePlugin` (`execute-deployer-sunset.ts`) now merges consecutive calls to one plugin into one window, like `WalletSDK.build.usePlugin`. |
| ACCT-3 + ROLLOUT-3 (Medium) | done | See the next section. |
| ROLLOUT-1 (Medium) | done | `scripts/lib/principal-rollout.ts`: the StakingPoolFactory target declares `dependencies` on Staking (`aal.staking`) and Rewards (`aal.rewards`). `planTarget` (`scripts/lib/principal-rollout-run.ts`) scans the pushed programs (factory and child) for every selector of those artifacts (`dependencyGaps`) and records a blocker while the live program lacks one. `runPhase2` refuses on blockers (`Phase 2 refused:`). The dry run prints `WOULD REFUSE`. Against today's MainNet bytes it blocks on `releaseAppStake(uint64,address,uint64)void` and `closeDisbursement(uint64)void`. Runbook order is in `docs/principal-resolution/ROLLOUT-ORDER.md`. |
| ROLLOUT-2 (Medium) | done | HyperSwap is a Phase 2 ride-along target (`PHASE2_RIDE_ALONG_TARGETS`, `--target HyperSwap`, never default). It goes through the ABI guard. `scripts/lib/principal-accepted-abi-removals.json` has a new entry, decision `ROLLOUT-2`, 2026-10-05, "Kyle: fix all of them", for `accept(pay,uint64,byte[32][])void`, bound to deployed sha `ce5d5f4f…9a41`. The id regex now also accepts `[A-Z]+-[0-9]+`. `scripts/lib/principal-deployed-abi.json` gained the HyperSwap and PollFactory HEAD entries; both equal the MainNet sha256, read 2026-10-05. `update-hyper-swap.ts` delegates to the Phase 2 CLI. Lockstep: the run deploys the new HyperSwapPlugin (`--manifest-dir`, or `--lockstep-deployed HyperSwapPlugin=<id>`). Grants swap right after the upgrade, because the new plugin calls the new `accept`. On a voting DAO the runner prints the Phase 3 swap command. |
| MISC-6 (Medium) | done | PollFactory is a ride-along target with lockstep PollPluginContract (`update-poll.ts` delegates to Phase 2). The new plugin reads `newPollCost`, which the deployed factory routes, so its DAO grant swaps BEFORE the factory upgrade. The DAO never holds a broken poll grant. `splitLockstep` decides this from the live programs. SDK legacy list: it is the deployment history in `akita-sdk/src/networks.ts`. The deployed PollPlugin ids are already there and become legacy once the new id is recorded (`--register`). No SDK change was needed. |

### ACCT-3 + ROLLOUT-3 details

- `Phase2Target.child.optional`, `includeOptionalChild` and `--skip-wallet-child` are removed. The wallet child is
  `atomic: true`, so a split plan is a blocker (`--split-children` is refused for AbstractedAccountFactory).
- `childPushProblems` (`principal-rollout.ts`) checks that the receiving factory program embeds the child's create
  selector and the child's clear program. `planTarget` applies it to the factory that will be live at push time.
  The deployed MainNet factory has neither for the tree wallet.
- `runUpdate` (`scripts/script-base.ts`) refuses every app in `ALL_PHASE2_TARGETS`, matched by key or by id. The
  error names the Phase 2 command. It also refuses to stage a child into a factory that fails `childPushProblems`.
- The Phase 2 CLI moved to `scripts/lib/principal-phase2-cli.ts` (`runPhase2Cli`). These scripts now call it:
  `principal-phase2-upgrade-targets.ts`, `update-wallet-factory.ts` (child-only by default, refused on an old
  factory; `--update-factory` lands factory + wallet in one group), `update-account-factory.ts` (factory +
  child), `update-hyper-swap.ts` and `update-poll.ts`.
- `update-dao.ts` upgrades the DAO through `runPhase2([PHASE2_DAO_TARGET])`. It checks Phase 2a
  (`requirePhase2aDone`, now exported) before the validator steps.
- `update-dao-wallet.ts` prerequisite text is fixed. `plan-puyats-migration.mjs` routes are fixed.
- The ROLLOUT-5 canary suggestion is dropped, as recorded in ROLLOUT-ORDER.md and IMPLEMENTATION-LOG.
- Other generic scripts that target Phase 2 apps (`update-social`, `update-subscriptions`, `update-marketplace`,
  `update-staking-pool`, `update-auction(-factory)`, `update-raffle`) now stop with the redirect error. They were
  not rewritten as delegates.

## Found while fixing (not in scope, reported)

1. **The DAO wallet account can never be closed while it is the creator of ASAs with other holders** (AKTA etc. on
   MainNet: "manages 16 created ASAs"). `deleteWallet` (close remainder) then fails with "cannot close: N
   outstanding assets". The old scripts also closed only non-zero holdings, so zero-balance opt-ins blocked the
   close too. Fixed in `walletAssetCloses`: every opt-in is closed, zero balances go to the asset creator, and
   created assets are skipped. The created-asset limit is a design question (keep the wallet app with its
   created assets, or reconfigure them first). The new simulation refuses the sequence before the push. The e2e
   asserts this.
2. **ACCT-6 still blocks the full MainNet sunset.** `deleteWalletEscrows` cannot delete wallet escrows.
   `execute-deployer-sunset.ts` now stops at its first simulation. That is after the factory swap (wallet
   creation stops there) but before the DAO becomes SunsetContract and before the DAO wallet push. Earlier it
   aborted after deleting the DAO.
3. Universe-based e2e specs failed intermittently in this window, in `tests/fixtures/auction.ts`: the
   AuctionFactory account was 14,800 µA under its min balance while the trade lane was editing
   `auction/contract.algo.ts`. The later runs passed. Not my file.

## Regression tests

| Test | Where | Fails on old code? |
|---|---|---|
| `a stranger cannot convert an automatic-update wallet at any point of the factory sunset` (ACCT-2, LocalNet) | `smart_contracts/sunset/sunset-staging.e2e.spec.ts` | Yes. Run with the old two-execution flow (child staged alone), a stranger's `updateWallet` converted the user wallet (`expected true to be false`, demo run). It passes with the one-group flow. |
| `the sunset factory pushes SunsetContract into the AVM 13 DAO wallet; the sequence is simulated first` (ACCT-1) | same file | The push targets the real tree (AVM 13) DAO wallet. With the old AVM 11 SunsetContract this is the protocol downgrade refusal. That was not run separately: the pre-fix artifacts were `#pragma version 11`. The test also asserts that the full sequence is refused in simulation while the wallet holds created assets. |
| `review 2026-10-05: rollout guards` (11 tests: ACCT-3/ROLLOUT-3 ×5, ROLLOUT-1 ×2, ROLLOUT-2/MISC-6 ×4) | `smart_contracts/arc58/plugins/update-akita-dao/rollout.test.ts` | Uses MainNet bytes (compat snapshot plus the new `tests/compat/fixtures/ride-along-programs.json`). Mutation check: disabling `childPushProblems`, the StakingPool dependencies, the `runUpdate` refusal, the atomic-child rule, or the lockstep split each fails 1–3 of these tests. |
| Updated: snapshot/decision-list tests (`ROLLOUT-2` entry) | `rollout.test.ts`, `tests/compat/compat-static.test.ts` (CMP-S4) | n/a (data change) |

## Files changed

Contracts (sunset root, rebuilt):
- `smart_contracts/sunset/contract.algo.ts`
- `smart_contracts/sunset/wallet-factory.algo.ts`
- artifacts `smart_contracts/artifacts/sunset/*`, `smart_contracts/artifacts/arc58/plugins/sunset/*` (unchanged
  bytes), and the generated SDK clients the build script writes (`akita-sdk/src/generated/{SunsetContract,WalletFactorySunsetContract}Client.ts`).

Scripts:
- New: `scripts/lib/sunset-steps.ts`, `scripts/lib/principal-phase2-cli.ts`.
- Modified: `execute-deployer-sunset.ts`, `sunset-cleanup.ts`, `script-base.ts` (runUpdate only),
  `lib/principal-rollout.ts`, `lib/principal-rollout-run.ts`, `principal-phase2-upgrade-targets.ts`,
  `principal-phase3-plugins.ts`, `update-wallet-factory.ts`, `update-account-factory.ts`, `update-hyper-swap.ts`,
  `update-poll.ts`, `update-dao.ts`, `update-dao-wallet.ts`, `plan-puyats-migration.mjs`,
  `lib/principal-accepted-abi-removals.json`, `lib/principal-deployed-abi.json`.

Tests and fixtures:
- New: `smart_contracts/sunset/sunset-staging.e2e.spec.ts`, `tests/compat/fixtures/ride-along-programs.json`.
- Modified: `smart_contracts/arc58/plugins/update-akita-dao/rollout.test.ts`, `rollout.e2e.spec.ts` (call sites
  only), `smart_contracts/sunset/sunset-integration.e2e.spec.ts` (passes the AVM 13 clear program),
  `tests/compat/compat-static.test.ts` (CMP-S4 decision list).

Docs:
- New: `docs/principal-resolution/ROLLOUT-ORDER.md`.
- Appended: `docs/principal-resolution/IMPLEMENTATION-LOG.md`.

Shared files: none edited by hand. The sunset build regenerated its two SDK clients in `akita-sdk/src/generated/`.
I did not rebuild the SDK dist, because no test path imports those clients from the dist.

## Tests run

- `rollout.test.ts`: 53/53 passed (no LocalNet).
- `tests/compat/compat-static.test.ts`: 121/121 passed.
- `tests/update-execution-lease.test.ts`: 6/6 passed.
- `tests/migration-dry-run.test.ts` + `tests/update-execution-lease.test.ts`: 13/13 passed.
- LocalNet (under the lock):
  - `sunset-staging.e2e`: 2/2 passed.
  - `sunset.e2e`: 12/12 passed.
  - `wallet-factory-sunset.e2e`: 3/3 passed.
  - `sunset-integration.e2e`: 1/1 passed.
  - `arc58/plugins/sunset/sunset-plugin.e2e`: 6/6 passed.
  - `update-akita-dao/rollout.e2e`: 12/12 passed.
  - `tests/migration-scripts.e2e`: 60/60 passed. `tests/update-resume.e2e`: 2/2 passed.
- `tsc --noEmit -p projects/akita-sc`: no errors in the changed files (pre-existing errors in deploy-gates /
  deploy-rewards-* only).

## Size / schema / ABI for apps already on MainNet

- No contract on MainNet changes in this lane. Sunset contracts are not deployed. They are pushed as updates only
  at sunset: SunsetContract is 695 B (0 extra pages), WalletFactorySunsetContract 1,111 B, and their schema is not
  set.
- ABI: the HyperSwap upgrade's removal of `accept(pay,uint64,byte[32][])void` is now an accepted decision
  (ROLLOUT-2). Nothing else changes.

## Rollout steps added or changed

See `docs/principal-resolution/ROLLOUT-ORDER.md`:
1. Upgrade Staking, deploy Rewards v2 and repoint `aal.rewards` before Phase 2 StakingPoolFactory (enforced).
2. The wallet factory and wallet child always land in one group. `--skip-wallet-child` is gone, `--split-children`
   is refused for that target, and child-only pushes are refused on a factory that cannot create the child.
3. HyperSwap and PollFactory upgrade only through Phase 2 `--target`, with their plugin deploy and DAO grant swap in
   the same run (Poll: swap before the upgrade; HyperSwap: swap after it). Pass `--register` for `getPluginUpdate`.
4. Generic `update-*.ts` scripts refuse Phase 2 apps. `update:dao` runs through Phase 2.
5. Sunset: AVM 13 sunset programs, one-group factory sunset, simulate-then-push, DAO wallet before DAO. The full
   DAO wallet teardown stays blocked by ACCT-6 and by its created ASAs.
