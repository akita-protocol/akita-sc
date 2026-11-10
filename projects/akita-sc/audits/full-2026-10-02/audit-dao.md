# Akita governance root: security audit (DAO, validator, DAO plugin, Update plugin)

Reviewer: parallel reviewer #5 (governance root). Read-only review of the current working tree (2026-10-02), not git HEAD.

## Scope covered

- `projects/akita-sc/smart_contracts/arc58/dao/contract.algo.ts` (AkitaDAO)
- `projects/akita-sc/smart_contracts/arc58/dao/validator.algo.ts` (AkitaDAOProposalValidator)
- `projects/akita-sc/smart_contracts/arc58/dao/types.algo.ts`, `types.ts`, `constants.ts`, `errors.ts`
- `projects/akita-sc/smart_contracts/arc58/plugins/dao/contract.algo.ts` (AkitaDAOPlugin)
- `projects/akita-sc/smart_contracts/arc58/plugins/update-akita-dao/contract.algo.ts` (UpdateAkitaDAOPlugin)
- Cross-read to confirm or refute: `arc58/account/contract.algo.ts` (admin, execution keys, assertValidGroup, reclaim, changeAdmin, addPlugin), `staking/contract.algo.ts` (lock and totals, withdraw, updateSettings, checkpoint), `utils/functions.ts` (getStakingPowerThrough, calcPercent, percentageOf), `utils/defaults.ts` (default proposal settings), the compiled `AkitaDAOPlugin.approval.teal`.

Context used: the "Protocol-wide invariants" section and the governance rows of CONTRACT_AUDIT.md, plus the Sep 2026 remediation notes.

---

## Findings

### DAO-01: Approved proposals created before initialization survive activation and act as a creator backdoor (ChangeAdmin, UpgradeApp, Reclaim)
- **Severity:** High (centralization / governance bypass)
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:171-192` (createOrUpdateProposal, the not-fully-initialized branch), `:994-1081` (executeProposal), `:839-847` (deleteProposal state gate), `validator.algo.ts:53-61,144-148`
- **Description:** While `state !== FullyInitialized`, `newProposal` from `Global.creatorAddress` writes the proposal straight to `ProposalStatusApproved`, with no vote and no fee. Several things combine here:
  - The validator accepts every action type during draft, including `ChangeAdmin` (it only needs `admin != zero`), `UpgradeApp` (it only needs `groups` and a valid round window), `ExecutePlugin` and `Reclaim`.
  - Approved proposals never expire.
  - Approved proposals cannot be deleted. `deleteProposal` only allows Draft and Executed.
  - No governance action can cancel or invalidate an existing proposal.
  - `executeProposal` is permissionless, and `initialize()` does nothing to proposals that already exist.
  
  The Guild had the same backdoor and fixed it in Sep 2026: bootstrap proposals may not contain UpgradeApp or ExecutePlugin. The DAO did not get that fix. The new `ChangeAdmin` (91) action makes the risk worse.
- **Exploit scenario:** During Draft or PartiallyInitialized, the deployer key calls `newProposal(pay(0), cid, [ChangeAdmin{admin: deployer}])`. The proposal is stored as Approved with id N, and the deployer leaves it unexecuted. The DAO is then fully initialized and handed to token holders. Months later, anyone calls `executeProposal(N)`. The DAO calls `arc58_changeAdmin(deployer)` on the DAO wallet, and the DAO app is admin, so the call succeeds. The deployer is now admin of the DAO wallet. It can `arc58_rekeyTo`, add plugins and execution keys, and bypass `useExecutionKey` (`assertValidGroup` skips the key check when `isAdmin()`). That gives it the treasury and every upgrade route. A staged `UpgradeApp` or `ExecutePlugin` with a far-future `lastValid` gives a similar result. Token holders cannot neutralize either one, short of upgrading the DAO, and the upgrade route itself depends on the DAO wallet.
- **Suggested fix:** Port the Guild fix and go further:
  - Reject `UpgradeApp`, `ExecutePlugin`, `ChangeAdmin` and `Reclaim` in the not-fully-initialized branch.
  - Make `initialize()` require that no Approved bootstrap proposals remain unexecuted. A counter of pending bootstrap proposals would work. Alternatively, mark bootstrap proposals with a flag and refuse to execute them after `FullyInitialized`.
  - Consider adding a governance-level "cancel/invalidate proposal" action.

### DAO-02: An UpdateFields proposal can do everything UpgradeApp/ChangeAdmin can, because the class is chosen by action type and not by field
- **Severity:** Medium
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:260-262` (getProposalSettings maps every UpdateFields to `updateFieldsProposalSettings`), `:416-530` (updateField), `validator.algo.ts:149-235`
- **Description:** UpdateFields can rewrite these fields:
  - `upgrade_app_ps`: the settings that gate UpgradeApp, UpdateWallet and ChangeAdmin
  - `update_fields_ps`: its own settings
  - `aal`: includes the `staking` app that `getGovernancePower` and `finalizeProposal` trust, and the wallet factory used by UpdateWallet
  - `akita_assets`: the AKTA/BONES IDs that define voting power
  - `oal`: includes `daoProposalValidator`
  - `pal`: includes `update`, the app that `AkitaDAO.update()` trusts
  
  The validator only bounds the new settings: approval and participation above 1%, duration above 0, power in 1..1000. The default UpdateFields class is power 200, 4 days, 70% participation, 60% approval. UpgradeApp is power 600, 7 days, 80% participation, 70% approval (`utils/defaults.ts:17-58`). The stronger UpgradeApp/ChangeAdmin class can therefore always be reached through the weaker UpdateFields class.
- **Exploit scenario:** A coalition with 60% approval at 70% participation passes UpdateFields `upgrade_app_ps = {fee:0, power:1, duration:1, participation:1001, approval:1001}`. It then passes ChangeAdmin(self) with about 1% participation and a 1-second vote. A shorter path: UpdateFields `aal` replaces `staking` with an attacker contract whose `getInfo` and `getTotals` return any values. The attacker then controls every later vote and the quorum denominator.
- **Suggested fix:** In `getProposalSettings`, for `ProposalActionTypeUpdateFields`, decode `field` and use `upgradeAppProposalSettings` for these keys: `upgrade_app_ps`, `update_fields_ps`, the other `*_ps` keys, `aal`, `pal`, `oal` and `akita_assets`. A stricter option is to take the max of both classes. Optionally, require new settings to never fall below a hard floor relative to the update class.

### DAO-03: UpgradeApp is only advisory. Any execution-key proposal, including a weaker per-plugin ExecutePlugin, can carry an upgrade group, and the `app` field is never enforced
- **Severity:** Medium (design weakness; note that "per-plugin ExecutePlugin settings stay advisory" was accepted for the Guild)
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:1006-1016` (UpgradeApp and ExecutePlugin both just call `newExecution`; `ProposalUpgradeApp.app` is never read), `:1009` (the `executions` metadata box is written but never read on-chain; `mustGetExecution` has no consumer), `arc58/account/contract.algo.ts:484-504` (an execution key is not bound to a plugin), `:1544-1566` (`arc58_addExecutionKey` appends groups to an existing lease if first/last valid match)
- **Description:** A wallet execution key authorizes any group hash for any `useExecutionKey` plugin, including the globally installed UpdateAkitaDAO plugin. So a proposal approved under the per-plugin settings of some low-threshold execution-key plugin P can commit a group hash for an UpdateAkitaDAO `updateApp` (DAO self-upgrade, any app upgrade, `updateRevocation`, factory child bytecode). The only per-plugin floor is validator `validateSettings`: participation and approval above 1%, duration of at least 1 second. Reusing an existing UpgradeApp lease with the same `firstValid`/`lastValid` appends extra groups to an already-approved upgrade key. Voters see only 32-byte group IDs, so on-chain nothing distinguishes "execute P" from "upgrade the DAO".
- **Exploit scenario:** The DAO governs a revenue/pay plugin installed with `useExecutionKey`, with settings of 2% participation, 2% approval and a 1-day duration. An attacker with about 2% of locked governance power submits `ExecutePlugin{plugin: P, groups:[H]}`, where H is the hash of a group that rekeys the DAO wallet to the UpdateAkitaDAO plugin and upgrades the DAO to attacker code. The proposal passes under P's thresholds, and the attacker submits the group.
- **Suggested fix:** Bind execution keys to the plugin. Store `plugin` in the wallet `executions` value, or key the box by (plugin, lease), and assert it in `assertValidGroup`. Alternatively, have the DAO record (lease → plugin) and have the Update plugin assert, via `mustGetExecution(Txn.lease)`, that the lease came from an UpgradeApp action whose `app` equals the target `appId`. In both cases, reject ExecutePlugin and UpgradeApp actions that reuse an existing lease.

### DAO-04: Quorum compares time-weighted voting power with raw locked token counts, which risks a governance freeze or minority quorum
- **Severity:** Medium (governance liveness/integrity)
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:953-985` (finalizeProposal), `:137-158` (getGovernancePower), `utils/functions.ts:476-505` (getStakingPowerThrough)
- **Description:** A voter's power is `min(aktaPower, bonesPower)`, where each side is `amount * remainingDays / 365 / 1e6` (token-years). Power is 0 when less than 1 week of lock remains. The denominator is `min(liveLockedAkta, liveLockedBones) / 1e6`, which counts raw tokens and ignores remaining lock time, whether the same holder locks both assets, and locks with less than 1 week left that are not yet checkpointed. This has three effects:
  1. With the default 1-year max lock, the highest participation 100% turnout can reach equals the average remaining lock fraction. Once locks age past about 0.2-0.3 years, the default 70% (UpdateFields, AddPlugin) and 80% (UpgradeApp) thresholds cannot be met. The fix (lower the thresholds) needs UpdateFields at 70% itself, so governance deadlocks. Recovery needs about 80% of locked supply to re-extend to near the max just before a vote. The test suite notes already observe this ("70% participation is tight… time warps decay lock power").
  2. Holders who lock only AKTA, or only BONES, raise the denominator but add 0 power. A large holder can split locks across two accounts to block quorum while looking like a participant.
  3. If an asset's max lockup is raised above 1 year (see DAO-05), power exceeds token count and a minority of long lockers can meet quorum on its own.
- **Suggested fix:** Measure quorum in the same units as votes. One option is a time-weighted live total maintained by Staking. Another is to compute participation on unweighted `min(lockedAkta, lockedBones)` per voter, and keep time weighting only for vote weight. Snapshot the denominator at `submitProposal`.

### DAO-05: The AKTA/BONES creator account can unilaterally inflate or freeze governance power through the Staking max-lockup setting
- **Severity:** Medium (privileged key outside governance)
- **Confidence:** Likely. It depends on who holds the AKTA/BONES creator keys. If that is the DAO wallet, this drops to Info.
- **Location:** `staking/contract.algo.ts:707-716` (`updateSettings`: `Txn.sender === Asset(asset).creator`, no bound), `:375-379` (lock max uses `settings(asset)`), `utils/functions.ts:497-504` (`remainingDays` is uncapped in the power formula)
- **Description:** Governance power grows linearly with remaining lock days and has no cap. The per-asset max lockup is set by the ASA creator, not by the DAO.
- **Exploit scenario:** The creator sets the max lockup for both AKTA and BONES to 50 years, locks its own holdings for 50 years (about 50 times the power per token), then resets the max to 1 year. Existing locks keep their expiration, so no one else can match. Alternatively, the creator sets max lockup to 0. New locks become impossible (`expiration` must be greater than now and at most now+0), so all power decays to 0 and governance freezes.
- **Suggested fix:** Cap `remainingDays` in `getStakingPowerThrough` at a protocol constant, such as 365. Make the governance assets' max-lockup setting DAO-controlled, or bound it to a constant range.

### DAO-06: The DAO plugin's `newProposal` and `editProposal` cannot succeed, and `newProposal` reintroduces the early-rekey bug that was previously fixed
- **Severity:** Low (functional DoS of the ARC-58 governance path; no fund loss)
- **Confidence:** Confirmed (TEAL inspected)
- **Location:** `arc58/plugins/dao/contract.algo.ts:43-59`, `:82-88`
- **Description:**
  - **(a)** `decodeArc4<boolean>(getExBytes(dao, 'initialized'))` compiles to `getbit 0`, which reads the most significant bit of the state byte (see `AkitaDAOPlugin.approval.teal:331-332`). DAO state is `Uint8` 0, 1 or 2, so the MSB is always 0. `initialized` is therefore always false, `total = 0`, and the 0-ALGO payment fails `DAO.newProposal` (`match(... amount: fee)` with `fee = total >= 54_500` once fully initialized). Wallet users cannot create proposals through the plugin.
  - **(b)** The `proposalCost` call inside that branch passes `rekeyTo: rekeyAddress(rekeyBack, wallet)`. This is the regression that CONTRACT_AUDIT.md:352 marks as fixed. If (a) is fixed, `rekeyBack=true` rekeys the spending account back before the payment and the `newProposal` call, so the call reverts.
  - **(c)** `editProposal` asserts `status !== 0`. Only Draft (0) proposals are editable, so the plugin's edit path always reverts.
  - **(d)** The plugin has no `deleteProposal` wrapper. A wallet-created draft or executed proposal (creator = spending account) cannot recover its refund through the plugin.
- **Suggested fix:**
  - Read the state as `Uint8` and compare it with `DaoStateFullyInitialized`. Simpler still, always call the readonly `proposalCost`, which already returns 0 for the creator before init.
  - Remove `rekeyTo` from the `proposalCost` call.
  - Change the edit guard to `status === 0`, using the `ProposalStatusDraft` constant.
  - Add a `deleteProposal` wrapper.
  - Add plugin e2e coverage for create, edit, vote and delete. Today `plugins/dao/dao.e2e.spec.ts` only checks installation.

### DAO-07: Vote-MBR accounting does not match the documented fix: re-votes pay again and refunds go to the voter, not the funder
- **Severity:** Low
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:877-886` (voteProposal requires a `DAOProposalVotesMBR` payment on every call, sender unchecked), `:943` (ProposalVoteInfo `{type, power}` has no funder), `:1093-1097` (refund to `voters[i]`), `types.ts:175-178`
- **Description:** CONTRACT_AUDIT.md:351 says to "charge only the first vote, persist its funder, refund that sponsor". The code charges 22,500 µALGO on every re-vote, although the box already exists and the deposit is never refunded. It also refunds the voter even when a third party funded the payment. The DAO plugin (`plugins/dao/contract.algo.ts:142-146`) always pays, so wallet re-votes also lose 22,500 each time.
- **Exploit scenario:** This is not a theft. Each re-vote silently moves 22,500 µALGO to the DAO. A sponsor who funded a voter's MBR loses the refund to the voter.
- **Suggested fix:** Require a payment of `exists ? 0 : DAOProposalVotesMBR` and bind `payment.sender`. Store `funder` in `ProposalVoteInfo` and refund it. Mirror these changes in the plugin.

### DAO-08: Proposal terminal states can strand funds: rejected proposals cannot be deleted, and deleting an executed proposal orphans every vote deposit
- **Severity:** Low
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:843-847` (only Draft and Executed are deletable), `:1083-1090` (deleteProposalVotes requires the proposal box to exist)
- **Description:** CONTRACT_AUDIT.md (row AkitaDAO and line 351) states that rejected proposals are creator-deletable. In the code they are not, so the proposal box MBR and the proposer's fee stay locked forever. Separately, the creator can call `deleteProposal` on an Executed proposal before voters call `deleteProposalVotes`. After that, `deleteProposalVotes` fails `errProposalDoesNotExist` for that id, and every outstanding vote box (22,500 each) is permanently unrefundable. The ids are never reused.
- **Exploit scenario:** A proposer executes, then immediately deletes the proposal to reclaim storage. All N voters lose N × 22,500 µALGO, which stays locked as box MBR forever.
- **Suggested fix:** Allow deleting Rejected proposals, with a storage refund as for Executed. Keep a per-proposal `voteCount` and require it to be 0 before `deleteProposal` succeeds for a voted proposal. Alternatively, let `deleteProposalVotes` work from a tombstone and not require the proposal box.

### DAO-09: A Voting proposal can be permanently bricked when the settings it depends on disappear, locking the proposer fee and all voter deposits
- **Severity:** Low
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:235-238` (ExecutePlugin settings come from the DAO `plugins` box), `:370-372` (RemovePlugin deletes that box), `:892` and `:981` (vote and finalize recompute `proposalCost` on every call)
- **Description:** `voteProposal` and `finalizeProposal` re-derive duration and thresholds from current state. If a RemovePlugin or RemoveNamedPlugin proposal deletes the DAO `plugins` box while an ExecutePlugin proposal for that plugin is Voting, both calls assert `errProposalDoesNotExist` forever. The proposal can never leave Voting. It cannot be deleted (Draft and Executed only), and its votes cannot be cleaned (Approved, Rejected and Executed only). More generally, any UpdateFields change to a class's settings retroactively changes the duration and thresholds of proposals already in Voting.
- **Suggested fix:** Snapshot `{duration, participation, approval}` into `ProposalDetails` at `submitProposal`, and use the snapshot in vote and finalize.

### DAO-10: UpdateFields can never change `toggle_escrow_lock_ps` or `remove_execute_plugin_ps`, so Reclaim has a permanently frozen class
- **Severity:** Info
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:416-530` (no case for these keys), `validator.algo.ts:215-232` (unknown fields are rejected), `contract.algo.ts:256-259` (Reclaim uses the toggleEscrowLock class)
- **Description:** These settings, including the class that gates the new Reclaim action, are fixed at `create()` and can only be changed by a DAO upgrade.
- **Suggested fix:** Add both keys to `updateField` and to the validator, with `validateSettings`.

### DAO-11: `setup()` is unauthenticated and spends DAO funds
- **Severity:** Low/Info
- **Confidence:** Confirmed
- **Location:** `arc58/dao/contract.algo.ts:733-762`, `plugins/dao/contract.algo.ts:29-38`
- **Description:** While `wallet` is unset, any account can call `setup(nickname, salt)`. The DAO pays `setupCost()` from its own balance, and the caller chooses the DAO wallet's nickname and salt. The admin is still the DAO app, so this is griefing or front-running, not a takeover. `initialize()` also does not require the wallet to exist.
- **Suggested fix:** Require `Txn.sender === Global.creatorAddress` and `state !== FullyInitialized`. Alternatively, require a wallet in `initialize()`.

### DAO-12: Miscellaneous (Info)
- `editProposal` (`contract.algo.ts:804-814`) lowers `feesPaid` to the new, smaller total. The difference is silently kept by the DAO, and a later draft delete refunds only the reduced amount.
- `executions` boxes (`:1009`) and their `DAOExecutionMBR` are never deleted (`update()` has the delete commented out at `:730`). The metadata is dead state.
- `ChangeAdmin` only rejects the zero address (`validator.algo.ts:144-148`). An admin equal to the DAO wallet's own app address bricks DAO wallet administration. A ChangeAdmin that is not the last action in a proposal makes later wallet-admin actions revert, so the proposal is stuck Approved forever.
- `proposalCost` charges DAO plugin-box MBR as if the escrow name were 24 bytes (`:1131`). Longer escrow names are subsidized from the DAO balance, in tiny amounts.
- A double vote with the same lock across two accounts is impossible while `duration <= ONE_WEEK`, because a lock withdraw needs `expiration < now` and voting power needs at least 1 week remaining. It becomes possible, for a small extra power fraction, if UpdateFields sets a duration above 1 week. The validator has no maximum duration.

---

## Checked and OK

- **Lifecycle ordering.**
  - Edits and submits are creator-only and Draft-only.
  - Status moves forward only: Draft → Voting → Approved/Rejected → Executed.
  - `executeProposal` is atomic: status is set after the loop, and an AVM revert discards partial actions.
  - Re-execution is blocked by `Executed`.
  - Actions run in stored order and cannot be edited after submit.
  - The voting window (`<=`) and the finalize window (`>`) are disjoint.
- **Double vote on the same account.** A re-vote subtracts the previous power from the previous bucket before adding the new power. The vote key is (proposalID, Txn.sender).
- **Approval math.** Abstain-only votes give 0% approval. `percentageOf` is guarded (a < b when rejections > 0). `calcPercent` and `percentageOf` use wide math and do not overflow.
- **AKTA/BONES decimal scaling.** The `/1e6` scaling is consistent between voter power and the `liveLockedStake` denominator (the earlier finding stays fixed). DAO-04 covers the time-weighting mismatch.
- **Proposal-box MBR quote.** `MinDAOProposalMBR + 400·Σ(7+len)` matches the exact box layout: 9-byte key, 119-byte head, 2-byte array length, 7 bytes of overhead per action.
- **Vote-box MBR quote.** 22,500 = 2,500 + 400·(41+9), which is exact.
- **Refund solvency.** Draft refunds `feesPaid`, executed proposals refund `min(feesPaid, storage)`, and vote refunds are exactly 22,500. Every refund frees at least the MBR it pays or returns funds received for that proposal. The DAO app balance is spent nowhere else except `setup()`. Refund inner transactions use `fee: 0`, so the caller pays the fee. I found no route to drain the DAO app balance.
- **DAO.update.** It requires `Txn.sender == wallet.address` and `callerApplicationId == pal.update`, and validator and DAO decode with the same codec. DAO-02 covers the case where `pal` is replaced by an UpdateFields proposal.
- **Validator vs DAO codecs.** Both use the same `decodeArc4<T>` on the same bytes, so they agree. Plugin-key normalization (`defaultToEscrow ? '' : escrow`, `caller = zero` for execution-key plugins) is consistent across the validator's AddPlugin and ExecutePlugin checks, `DAO.addPlugin`, `DAO.removePlugin` and the wallet's `_addPlugin`. `RemoveNamedPlugin` re-checks the name→key mapping both in the validator and at execution.
- **DAO-installed plugins.** They always get `admin = false` and `canReclaim = false`, so no admin plugin can be installed through governance.
- **UpdateAkitaDAO plugin.**
  - Every method requires `wallet == DAO wallet` and that the spending account is the DAO wallet address (so the DAO wallet must be rekeyed to it).
  - `updateApp` and `updateFactoryChildContract` require a preceding `loadBoxedContract` from the same sender.
  - The rekey back is applied only on the final inner transaction.
  - An empty-bytecode batch cannot leave the wallet rekeyed, because the wallet's `assertValidGroup` needs a later rekey-back or `arc58_verifyAuthAddress` in the group.
- **DAO plugin authority.** Each call goes through `getSpendingAccount(wallet)`, so the DAO sees the wallet's spending address as `Txn.sender` and voter. `daoAppID` is fixed at create, and caller-supplied DAO IDs are never trusted.
- **Execution-key replay.** The wallet deletes the key on first use. A key can only run committed group IDs inside its round window.
- **Reclaim.** It moves funds only escrow → DAO wallet controlled address (`account/contract.algo.ts:618-643`). It cannot pay to third parties.
- **Inner transactions and loops.** Inner transactions use the default fee of 0, so no fee draining. Loop bounds are the proposal's action count (capped by `proposalActionLimit`, validator > 0) or caller-supplied arrays in `deleteProposalVotes`. Nothing permissionless can freeze governance through budget.
