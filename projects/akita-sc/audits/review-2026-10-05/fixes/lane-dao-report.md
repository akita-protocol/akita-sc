# Lane dao report (DAO-R1, DAO-R2, DAO-R3, DAO-R4)

All paths below are under `projects/akita-sc/smart_contracts` unless stated.

## Findings

### DAO-R1 (High): done

Update plugin `arc58/plugins/update-akita-dao/contract.algo.ts`:
- `requireUpgradeExecution` now records the rekey call's `type` and `escrow` arguments (:76-92). On the non-admin path the rekey must use `type == CallerTypeGlobal` with an empty escrow, and the plugin reads its own global grant with `arc58_getPlugins([{self, zero, ''}])` and requires `useExecutionKey` (:113-120). Only then has the wallet checked and consumed `Txn.lease` as an execution key. A caller-scoped grant, or a global grant without keys, can no longer pick an old UpgradeApp lease.
- The proposal-note read also requires `upgrade.lastValid >= Global.round` (:133-136).
- The admin path makes one more `opUp` (:105-106), so the admin-simulated fee budget still matches the checked path (2 inner calls, or 3 with the note read).

DAO `arc58/dao/contract.algo.ts`:
- `isUpgradeLease` accepts a lease only while its window is open (`lastValid >= Global.round`, :1487). A lease is now bounded by its UpgradeApp window and, through the plugin check, consumed once by the wallet.
- `getProposalSettings`: AddPlugin / AddNamedPlugin of `pal.update` takes `max(addPlugin, upgradeApp)` settings (:389-399).
- `addPlugin`: a grant of `pal.update` must be global with execution keys, or execution reverts `errIact` (:458-461).

### DAO-R2 (High): done

- `ProposalTally` gains `locked` (whole tokens locked when voting starts) (`arc58/dao/types.ts`). `submitProposal` stores `lockedStake()` (:1120). The tally box grows 41 to 49 bytes, so `DAOProposalTallyMBR` is 22,100 µA (was 18,900). No tally boxes exist on MainNet, and `getProposalTally` is not in the deployed ABI.
- `finalizeProposal` (:1218-1246): after the voting window, a quorum miss sets Rejected (terminal) instead of reverting. Quorum uses the snapshot. A proposal with no tally box (pre-upgrade) keeps the live total. New helper `lockedStake()` (:189).
- Execution deadline: not added. The snapshot plus the terminal Rejected state removes the "finalize months later" attack. A deadline is a policy choice and costs DAO bytes.

### DAO-R3 (Medium, decision revoke): done (tracking variant), with an off-chain gap that is not checkable on chain

- I chose "track" over "refuse". Refusing bootstrap caller grants breaks the shared universe fixture (`tests/fixtures/dao.ts` mints BONES through a creator asa-manager grant and installs the sticker rewards backend grant) and the MainNet-like `deploy-universe` flow. Tracking keeps those Draft-time operations and still lets `initialize` prove the grants are gone.
- New box map `bootstrapGrants` (prefix `'g'`, wallet `PluginKey` -> round added) (:115). `addPlugin(data, bootstrap)` tracks every non-zero-caller grant added by a bootstrap proposal and raises `bootstrap_key_count` (:463-469). `removePlugin` untracks and decrements (:553-556). `initialize` already requires the count to be 0. `clearBootstrapKeys` cannot clear grants because they live under a different prefix.
- Pre-upgrade execution keys and the 11 MainNet caller-scoped grants were created by the deployed DAO. Nothing on chain lists them (no box enumeration), so `initialize` cannot refuse on them. The new script handles them off-chain.
- Edge case: if a tracked grant is removed outside the DAO, the creator re-adds it and removes it by proposal to untrack it.
- Script `projects/akita-sc/scripts/revoke-dao-bootstrap-grants.ts` (new). It plans by default. It lists caller-scoped grants, `pal.update` grants that are not global + key, and wallet execution keys the DAO does not track. It builds RemovePlugin / RemoveNamedPlugin / RemoveExecutePlugin proposals, split by `proposal_action_limit`, and shows `proposalCost` for each. Tracked bootstrap keys are left to `clearBootstrapKeys`. `--keep plugin:caller[:escrow]` accepts an operator grant. `--confirm-revoke` creates the proposals, executes them while Draft (creator key required), then clears tracked keys.
- The script ran only on LocalNet, as a dry run, against universe DAO 1062556. Output: 2 caller grants (sticker rewards on `stickers`, asa manager) in 1 proposal, plus 33 tracked keys, so `bootstrap_key_count` is 35. The confirm path was not run: on LocalNet `setupContext` signs with a fresh account, not the DAO creator.

### DAO-R4 (Medium): done

- `deleteProposalVotes` reads `op.AcctParams.acctBalance(voter)`. It pays the 22,500 µA refund only to a funded account (:1374-1377). For a closed account the DAO app keeps the deposit, and the box is still deleted and `voteCount` decremented.
- I used `acctBalance` and not `Account.balance` on purpose: `.balance` asserts that the account exists, and the first fix attempt failed on a closed account.

## Regression tests (all failed on the pre-fix code, all pass now)

`arc58/plugins/update-akita-dao/update-akita-dao.e2e.spec.ts`, describe "DAO-R1: only an execution-key grant can carry an UpgradeApp lease":
- "a caller-scoped grant cannot replay a used lease, even when the plugin also holds an execution-key grant". Old code: the replay group succeeded.
- "a global grant without execution keys cannot replay a used lease". Old code: the replay succeeded.
- "isUpgradeLease stops accepting a lease once its window has passed". Old code: still true.
- "granting pal.update is upgrade class and only as a global execution-key grant". Old code: participation 70,000 instead of 80,000.

Same file, describe DAO-01:
- "DAO-R3: a caller-scoped bootstrap grant blocks initialize until a proposal removes it". Old code: count stayed 0.

`arc58/dao/tests/voting/dao.voting.e2e.spec.ts`, describe "Audit remediation":
- "DAO-R4: a voter who closed their account does not block deleting the proposal". Old code: "balance 22500 below min 100000".
- "DAO-R2: a quorum miss finalizes as Rejected against the stake locked at submit". Old code: status 40 (Approved) after the whale's lock was checkpointed, expected 30.

No existing test asserted the insecure behaviour, so none was weakened. The DAO-R3 test removes the fixture's two tracked grants first, which is the rollout procedure.

## Files changed

Contracts and tests (owned):
- `arc58/dao/contract.algo.ts`, `arc58/dao/types.ts`, `arc58/dao/constants.ts` (`AkitaDAOBoxPrefixBootstrapGrants`, `DAOProposalTallyMBR`).
- `arc58/plugins/update-akita-dao/contract.algo.ts`.
- `arc58/plugins/update-akita-dao/update-akita-dao.e2e.spec.ts`.
- `arc58/dao/tests/voting/dao.voting.e2e.spec.ts`.
- Artifacts and generated clients rebuilt for `arc58/dao`, `arc58/plugins/update-akita-dao` and `arc58/plugins/dao`. The `arc58/plugins/dao` source is unchanged.

SDK (owned dao module):
- `projects/akita-sdk/src/dao/constants.ts`: `DAOProposalTallyMBR` is 22_100n.
- `projects/akita-sdk/src/dao/index.ts`: new `getBootstrapGrants()`.

New script:
- `projects/akita-sc/scripts/revoke-dao-bootstrap-grants.ts`.

Shared files: none changed. Reused unchanged: `scripts/lib/dao-wallet-plugin-migration.ts` (`pluginKeyId`, `splitMigrations`, `DAO_STATE_FULLY_INITIALIZED`) and `scripts/script-base.ts`.

## Tests run (final code, LocalNet lock)

- `arc58/plugins/update-akita-dao` (e2e 25, rollout.e2e 12, rollout.test 53), `arc58/dao/tests/{plugins 11, proposals 18, upgrade 14}`, `arc58/plugins/dao` 1: **134 passed / 134**.
- `arc58/dao/tests/voting`: **22 passed / 22**.
- `arc58/dao/tests/setup`: **24 passed** (same run as rollout.test, before the last R4 test-only fix).
- Distinct total: 180 tests passed, 0 failed.
- Typecheck: `tsc --noEmit -p projects/akita-sc/tsconfig.json` reports no errors in the changed files.

Notes for the coordinator:
- `projects/akita-sdk` `npm run build`: tsup (JS) succeeds. The declaration step fails on another lane's in-progress `src/wallet/plugins/nfd.ts`, which does not match its regenerated client (`purchase`, `renew`, `autoRenew`, `appId`). Tests use the JS, so they are unaffected.
- One earlier run failed in `tests/fixtures/auction.ts` `deployAuctionFactory` (factory account 14,800 µA under minimum). That is another lane's auction change, and it passed on the retry.
- An SDK `dist` rebuild by another lane once removed chunks mid-run. The retry passed.

## Size, schema and ABI (MainNet apps)

| App | Approval before -> after | Extra pages | Global schema | ABI |
|---|---|---|---|---|
| AkitaDAO 3569556034 | 9,738 -> 10,009 B | 4 -> 4 (cap 10,240 B) | 5u/59b, unchanged | every HEAD (deployed) selector kept; changes only vs tree: `getProposalTally` returns a 5-tuple (not deployed) |
| UpdateAkitaDAOPlugin (new immutable app) | 2,559 -> 2,809 B | 1 -> 1 | 1u/3b, unchanged | unchanged |
| AkitaDAOProposalValidator | 3,724 (unchanged) | - | - | unchanged |
| AkitaDAOPlugin | 1,500 (unchanged) | - | - | unchanged |

Boxes: new DAO prefix `'g'` (bootstrap grants). The tally box is 49 bytes (was 41).

## Rollout steps added or changed

1. Phase 2a deploys this Update plugin. Its grant must stay global + execution key (it already is). Execution groups pay one more inner-call fee (simulation picks it up). A rekey through any other grant of the plugin now fails `errNupx`.
2. After the DAO upgrade, any AddPlugin / AddNamedPlugin of `pal.update` is upgrade class and must be global + execution key. Phase 2a runs on the deployed DAO, so this does not affect it.
3. Before `initialize()` (in addition to the existing gates):
   - Run `revoke-dao-bootstrap-grants.ts --network mainnet --dry-run`.
   - Revoke the 11 caller-scoped grants, or pass `--keep` for accepted operators.
   - Remove untracked wallet execution keys.
   - Then run `clearBootstrapKeys`.
   - `bootstrap_key_count` must read 0.
   - The deployed DAO wallet does not route `arc58_getNamedPluginKey`, so RemoveNamedPlugin actions wait until the wallet upgrade.
4. Bootstrap caller-scoped grants made by the upgraded DAO (creator operations in Draft, e.g. `deploy-universe`, `dao-social-caller` style scripts) now count toward `bootstrap_key_count`. They must be removed by proposal before `initialize`.
5. Proposal cost after initialization rises by 3,200 µA (tally box). Closed-account vote deposits stay in the DAO app.
