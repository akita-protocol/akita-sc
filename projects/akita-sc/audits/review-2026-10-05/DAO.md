# Slice DAO: production-readiness review (2026-10-05)

Reviewer: slice DAO. Read-only. Working tree = HEAD `e7f174ee` + uncommitted changes. Artifacts in
`smart_contracts/artifacts/arc58/{dao,plugins/dao,plugins/update-akita-dao}` are newer than the sources
(built 2026-10-05 00:44), so TEAL citations match the tree. MainNet facts are from read-only algod
queries on 2026-10-05 (round ≈ 65,701,037).

## Scope

| File | Lines | Depth |
|---|---|---|
| `arc58/dao/contract.algo.ts` | 1,473 | full |
| `arc58/dao/validator.algo.ts` | 346 | full |
| `arc58/dao/constants.ts` / `errors.ts` / `types.ts` / `types.algo.ts` | 132 / 97 / 579 / 79 | constants + types used by the DAO |
| `arc58/plugins/dao/contract.algo.ts` + `errors.ts` | 205 + 18 | full |
| `arc58/plugins/update-akita-dao/contract.algo.ts` + `errors.ts` + `stubs.ts` | 426 + 20 + 33 | full |
| `mocks/dao/mock.algo.ts` | 33 | full |
| `update-akita-dao/{rollout.e2e.spec.ts, rollout.test.ts, update-akita-dao.e2e.spec.ts}`, `dao/tests/**` | 372 / 641 / 743 / … | test names + targeted reads |
| Cross-read | `arc58/account/contract.algo.ts` (assertValidGroup 501-560, rekeyToPlugin 1052-1130, execution keys 1613-1652), `utils/base-contracts/{factory,upgradeable}.ts`, `utils/programs.ts`, `utils/functions.ts` (spending-account helpers), `staking/contract.algo.ts` (liveLockedStake, `checkpointExpiredLock`), `scripts/lib/principal-rollout-run.ts` (Phase 2a), deployed HEAD DAO/validator/plugins via `git show HEAD:` | targeted |

MainNet reads: DAO 3569556034 (state, 194 boxes, all 170 proposals), DAO wallet 3569559153 (globals, 52 boxes,
every plugin grant decoded), selector presence in the deployed DAO, wallet, wallet factory, staking and validator
programs, AKTA/BONES params, DAO and DAO-wallet balances. Scratch: `scratchpad/review/{selcheck.mjs,
scan-proposals.mjs, wallet-boxes.json, dao-live.json, wallet-live.json, dao-boxes.txt}`.

## Prior-finding verification (audit-dao.md / fix-dao.md)

| ID | Status | Evidence |
|---|---|---|
| DAO-01 | **Partially fixed** | Bootstrap ChangeAdmin banned (`contract.algo.ts:308-313`); bootstrap proposals unexecutable after init (`:1231-1235`); bootstrap UpgradeApp/ExecutePlugin keys bounded to 10,000 rounds and counted (`:194-205`, `:1246-1248`, `:1260-1262`); `initialize` requires the count to be 0 (`:926-933`); creator can delete leftovers (`:1034-1043`). Gaps: caller-scoped plugin grants and pre-upgrade keys survive `initialize` (DAO-R3), a non-execution-key Update grant survives it as permanent upgrade authority (DAO-R1), bootstrap execution is permissionless (DAO-R5). |
| DAO-02 | Fixed | Per-field class (`:249-286`) used by `getProposalSettings` (`:403-405`); new validator validates both new `*_ps` keys (`validator.algo.ts:221-233`). By design `update_fields_ps` and fee fields stay in the UpdateFields class. |
| DAO-03 | **Fixed for the execution-key route, bypassable otherwise** | Fresh-lease check (`:211-218`), ExecutePlugin may not target `pal.update` (`:376-380`, `:1258`), UpgradeApp `app`/lease recorded (`:1243-1253`), plugin binds lease→UpgradeApp→target (`update-akita-dao/contract.algo.ts:64-128`). The binding trusts the lease field of *any* `arc58_rekeyToPlugin` call, so a non-execution-key grant replays any historical UpgradeApp lease (DAO-R1). Cross-plugin reuse of ExecutePlugin keys (pay, revenue manager, subscriptions, social grants) remains, as accepted (3B later). |
| DAO-04 | Fixed (4A) | `lockedThrough` / `getGovernancePower` (`:154-184`), proposer through `now+1w` (`:335`), voter through `votingEnds` (`:1143`), denominator `/1e6` (`:1194-1196`). AKTA and BONES are both 6 decimals on MainNet. New issue in the same area: DAO-R2. |
| DAO-05 | Not in slice | Staking `updateSettings`; not re-verified here. |
| DAO-06 | Fixed | Plugin quotes `proposalCost` with no rekey, rekeys only on the final call (`plugins/dao/contract.algo.ts:48-75`); edit guard is `status === Draft` (`:86-87`); `deleteProposal` and `cancelProposal` wrappers added (`:183-204`); paying paths use `getControlledSpendingAccount`. |
| DAO-07 | Fixed (7A) | Payment `sender: Txn.sender` (`:1098-1108`); re-vote refunds the deposit (`:1168-1170`); plugin always deposits (`plugins/dao/contract.algo.ts:141-157`). |
| DAO-08 | Fixed, with residual | Rejected/Invalid deletable (`:1036-1043`); tally `voteCount` must be 0 (`:1050-1058`). Residual: one closed voter account blocks the count forever (DAO-R4). |
| DAO-09 | Fixed | Rules snapshot at submit (`:1076-1078`), used by vote/finalize (`:1114`, `:1211`); legacy fallback (`:289-295`); `cancelProposal` (`:1085-1091`). MainNet has no Voting proposals and no `v` boxes, so the legacy fallback is never hit there. |
| DAO-10 | Fixed (needs `oal` repoint) | DAO `updateField` cases (`:662-671`), new validator (`validator.algo.ts:228-229`). The deployed validator 3642264629 rejects both keys, Reclaim and ChangeAdmin until `oal` is repointed. |
| DAO-11 | Fixed | `setup` creator-only and pre-init (`:886-889`). |
| DAO-12 | Fixed / won't-fix as planned | Edit refund (`:1001-1004`); ChangeAdmin last / not wallet / not DAO (`validator.algo.ts:146-154`); plugin-box MBR per escrow (`:1385-1395`); `executions` boxes kept on purpose (they back the fresh-lease check); double vote closed by DAO-04. |

## New findings

### DAO-R1 — High — Update-plugin lease binding is bypassed by any non-execution-key grant (historical leases replay forever)

- **Location:** `arc58/plugins/update-akita-dao/contract.algo.ts:70-125` (lease taken from the last `arc58_rekeyToPlugin` txn; its `type`/escrow args and the grant's `useExecutionKey` are never checked); `arc58/dao/contract.algo.ts:1446-1458` (`isUpgradeLease` ignores `lastValid`), `:1466-1470` + `:1251` (`executions` never deleted, so the note path accepts every lease ever executed); `arc58/account/contract.algo.ts:505-521` (the wallet consumes an execution key only when the grant has `useExecutionKey`); `utils/base-contracts/factory.ts:118-135` and `upgradeable.ts:25-28` (`initBoxedContract` / `updateAkitaDAO` check only `Txn.sender == DAO wallet`, not the calling plugin).
- **Mechanism:** the binding is sound only if the wallet consumed an execution key equal to the rekey txn's lease. For a grant with `useExecutionKey = false` (caller-scoped, or global without a key) the wallet never reads `Txn.lease`, so the caller sets it to any value. MainNet DAO already holds 19 permanent `x` records (`dao_upg_78452`, `dao_upg_379400`, `staking_upg_464454`, `wallet_child_934996`, `acct_upg_844997`, …), and the tree DAO keeps every `u`/`x` entry until a later upgrade of the same app prunes `u` (never `x`).
- **Scenario A (vote route, class bypass):** an AddPlugin proposal (MainNet `add_plugin_ps` = power 300, 5 days, 70 % participation, 60 % approval; upgrade class is 600 / 7 days / 80 % / 70 %) installs `pal.update` with `caller = attacker`, `useExecutionKey = false`. The validator and `getProposalSettings` accept it (only ExecutePlugin is refused for `pal.update`). The attacker then sends `[wallet.arc58_rekeyToPlugin(pal.update, type=0, '', [], []) with lease = "dao_upg_78452\0…", U.initBoxedContract, U.loadBoxedContract…, U.updateApp(note="akita:upgrade-binding:proposal", appId=DAO), wallet.arc58_verifyAuthAddress]`. `requireUpgradeExecution` finds the rekey txn, `rekeySender != admin`, `mustGetExecution(lease)` → the old UpgradeApp action for the DAO → passes. `DAO.update` sees `sender == wallet`, `caller == pal.update` → attacker DAO code. The same works for Staking (custodies users' locked AKTA/BONES), the wallet factory child (`updateFactoryChildContract`, `wallet_child_*` leases), and `updateAkitaDaoAppIDForApp` (repoint any app to an attacker DAO). A second Update-plugin *instance* (not `pal.update`) installed the same way already suffices for the factory-child and `updateAkitaDAO` paths, because those targets check only the sender.
- **Scenario B (creator window):** while the DAO is in Draft, the creator executes a bootstrap `AddPlugin{plugin: pal.update, caller: creator, useExecutionKey: false}`. Nothing tracks it, `initialize()` succeeds, and the creator keeps permanent, vote-free upgrade authority over every app with a recorded lease. This is the DAO-01 backdoor in another form.
- **Today on MainNet:** not exploitable — the only Update grant (3569559689) is global + execution key (flags `0x20`), and Phase 2a copies that shape. The exposure starts with the first AddPlugin of Update-plugin code that is not global+key.
- **Suggested fix (plugin is undeployed, so cheap now):** in `requireUpgradeExecution`, for the non-admin branch also require `btoi(txn.appArgs(2)) == 1` (CallerType.Global) and `txn.appArgs(3) == 0x0000` (empty escrow), and read `arc58_getPlugins([{plugin: self, caller: zero, escrow: ''}])` to assert `useExecutionKey`; then the wallet provably consumed `lease`. Also reject expired windows: `isUpgradeLease` should require `lastValid >= Global.round`, and the note path should check `upgrade.lastValid >= Global.round`. In the DAO, class AddPlugin/AddNamedPlugin of `pal.update` as upgrade class and require `caller == zero && useExecutionKey`; refuse it in bootstrap proposals.

### DAO-R2 — High (conditional) — A proposal that misses quorum stays in Voting forever and can be finalized as Approved much later

- **Location:** `arc58/dao/contract.algo.ts:1176-1222` (`finalizeProposal` asserts participation at call time, `:1213-1215`, and reverts instead of rejecting; the denominator is the *live* `liveLockedStake`, `:1184-1197`); `:1117` (votes close at `votingEnds`); `:1224-1229` (Approved never expires); `staking/contract.algo.ts:549-565` (`checkpointExpiredLock` is permissionless and lowers `liveLockedStake`).
- **Scenario:** an account holding X whole locked tokens (min AKTA/BONES) submits `ChangeAdmin{admin: attacker}` (or AddPlugin pay-plugin grant to itself, `revenue_splits`, …) and votes Approve. Others ignore it, so total votes stay below `participation × L` and `finalizeProposal` reverts `errVprt`. Voting closes. The proposal stays Voting; nobody can vote, cancel (only Approved), or delete it. Months later, when live locked stake has fallen so that `X ≥ participation × L(t)` (locks expire, max lock is 1 year), the attacker sends one group: `checkpointExpiredLock(...)` for every expired lock, then `finalizeProposal(id)`. Approval is 100 % (no rejections), so status becomes Approved, and `executeProposal` (permissionless) runs ChangeAdmin: the attacker administers the DAO wallet (treasury, every upgrade route). The attacker's own lock may have expired too; recorded power is not re-checked. Meanwhile every voter's 22,500 µALGO deposit is locked (deleteProposalVotes needs Approved/Rejected/Executed/Invalid).
- **Precondition:** live locked stake must drop to ≤ X / participation at some instant. Upgrade-class actions with a round window (UpgradeApp) are mostly self-limiting; ChangeAdmin, AddPlugin, UpdateFields and Reclaim have no window.
- **Suggested fix:** when `Global.latestTimestamp > votingTs + duration` and participation is not met, set Rejected (terminal) instead of asserting. Optionally snapshot the denominator at submit (store it in the tally) and add an execution deadline for Approved proposals.

### DAO-R3 — Medium — `initialize()` proves only that tracked bootstrap keys are gone; creator/operator grants and pre-upgrade keys survive it

- **Location:** `arc58/dao/contract.algo.ts:926-933`, `:186-205` (only keys registered by *this* code are counted), `:412-488` (bootstrap AddPlugin with any `caller` is allowed and untracked).
- **Scenario / MainNet state:** the DAO wallet already carries 11 caller-scoped grants created by bootstrap proposals: creator `R2MOGXW7…` (asaManager 3605315701 on the main account, selfOptin 3569560545 on `stickers`); `YIIMG4OH…` (nfd plugin 3572944055 on main, `akta_creator`, `collections`, `rev_nfd`; asaManager 3605315701; selfOptin 3569560545; social 3569562087; revenue manager 3642325118 on `rev_nfd`); `E3H5NBMS…` (rewards plugin 3569561963 on `stickers`). The NFD plugin's `offerForSale`/`vaultSend` let `YIIMG4OH` sell DAO-owned NFDs (e.g. akita.algo) or move NFD-vault assets with no vote; all of these keep working after `initialize()`. Separately, execution keys registered by the *deployed* DAO during the rollout (Phase 2a/2 UpgradeApps executed before the DAO upgrade) are invisible to `bootstrapKeyCount`; the wallet has no `x` boxes today, so this is a procedure gap only.
- **Suggested fix:** make `initialize` part of a checklist enforced off-chain (wallet has zero `x` boxes, no caller-scoped grants except an approved allow-list), or on-chain: refuse bootstrap AddPlugin/AddNamedPlugin with `caller != zero` (or track them like keys and require their removal before `initialize`). Revoke the 11 grants (or record them as accepted operators) before initializing.

### DAO-R4 — Medium — One closed voter account blocks deletion of a proposal forever

- **Location:** `arc58/dao/contract.algo.ts:1343-1351` (refund is an unguarded `itxn.payment` of 22,500 µALGO), `:1050-1053` (`deleteProposal` needs `voteCount == 0`).
- **Scenario:** a voter votes, then closes their account (sends everything out with close-to; their stake record stays in Staking). Any `deleteProposalVotes(id, [voter])` now fails (22,500 < 100,000 min balance on an empty account), so the box stays, `voteCount` never reaches 0, and `deleteProposal` reverts `errVotesOutstanding` for good: the proposer's storage refund and the tally MBR are locked. Cost to the griefer: their own 22,500 µALGO.
- **Suggested fix:** the planned guarded refund: if `voters[i].balance == 0` (or below min balance after the payment), pay the treasury or keep it in the DAO, but still delete the box and decrement `voteCount`.

### DAO-R5 — Low — Bootstrap proposals are executable by anyone; MainNet #107 is still Approved

- **Location:** `arc58/dao/contract.algo.ts:1224-1235` (no sender check), `:194-205`.
- **Scenario:** after the DAO upgrade (DAO still Draft), anyone calls `executeProposal(107)` (UpgradeApp wallet factory, lease `acct_upg_265181`, window 61,455,057–61,455,798, long expired). It passes `trackBootstrapKey` (lastValid is in the past), writes `x`/`u`/`b` boxes from the DAO's 3.97 ALGO free balance, adds a dead key to the wallet, and raises `bootstrapKeyCount`, so `initialize` fails until someone calls `clearBootstrapKeys`. The Guild made bootstrap execution creator-only (G-6); the DAO did not.
- **Suggested fix:** require `Txn.sender == Global.creatorAddress` when `votingTs == 0`; operationally, `deleteProposal(107)` right after the upgrade.

### DAO-R6 — Low — Validator accepts UpgradeApp actions that can never execute

- **Location:** `validator.algo.ts:53-61` vs `contract.algo.ts:1244-1245`.
- **Scenario:** `app = 0`, a zero lease, or a lease already in `executions`/the wallet passes creation and the vote, then `executeProposal` reverts; the proposal is stuck Approved until its proposer cancels it and the class's full vote runs again. Same for an ExecutePlugin lease squatted by another proposal in the meantime.
- **Suggested fix:** check `app != 0`, non-zero lease in the validator; optionally check freshness at creation too.

### DAO-R7 — Info

- Governance can freeze itself with values the validator only decodes: `akita_assets` with a zero id (`getGovernancePower` returns 0, `:175-177`), `aal.staking` not a staking app, or `upgrade_app_ps.power` above every single holder's lock (no upgrade-class proposal can be created, including the one that would lower it). Bound these in the validator.
- `getProposal` returns the whole proposal in one log (≤ 1,024 B): the note-path binding and `AkitaDAOPlugin.editProposal` (`plugins/dao/contract.algo.ts:80-84`) revert for large proposals. The rollout already refuses such UpgradeApp proposals.
- `upgradeLeases(app)` is read into one stack value (`:224`, `:1451`); above ~101 live entries per app (4,096 B) recording and `isUpgradeLease` revert. Not realistic.
- MainNet DAO has no `guild_fees` global (all other struct values match tree sizes); any reader before an UpdateFields `guild_fees` panics. Guilds are not deployed.
- `executeProposal` of ExecutePlugin only refuses the *current* `pal.update`. An old Update plugin left installed keeps `updateFactoryChildContract`, `updateAkitaDaoAppIDForApp` and `updateRevocation` power (those targets check only the sender). Phase 2a removes it (`principal-rollout-run.ts:269-271`; e2e `rollout.e2e.spec.ts:305`); keep that removal mandatory.

## Suspicions

- None open beyond the above. Checked and dismissed: re-entrancy through `executeProposal` (AVM forbids re-entering an app on the call stack); stale `spending_address` letting outsiders call `loadBoxedContract`/`deleteBoxedContract` (every rekey-to-plugin group must end with `arc58_verifyAuthAddress`, which clears it; MainNet value is zero).

## Upgrade / rollout notes

1. **The "creator-admin route" (bootstrap ChangeAdmin → upgrade → hand back) does not exist and is not needed.** Verified: the deployed DAO program has no ChangeAdmin action (HEAD `executeProposal` has no case 91) and the deployed validator rejects type 91; the tree bans it in bootstrap (`:308-313`). The implemented route is K1: the Phase 2a plugin's note-selected read (`mustGetExecution` + `getProposal`). The deployed DAO has `mustGetExecution`, `getProposal`, `opUp`, `update(string)` and lacks `isUpgradeLease`; the deployed DAO wallet routes `arc58_rekeyToPlugin(uint64,uint64,string,uint64[],(uint64,uint64)[])void` and its admin is the DAO app address (`YLIMXW5E…`). So the creator can never become wallet admin, and nothing must be handed back.
2. **Order on MainNet (Draft):** Phase 2a bootstrap proposal `[UpdateFields pal.update = U2, AddPlugin U2 (global + execution key), RemovePlugin 3569559689]` → bootstrap `UpgradeApp{app: DAO}` executed by the deployed DAO → group through U2 with the proposal note. DAO grows 3 → 4 extra pages (9,738 B); schema 59 bytes / 5 uints is unchanged and `bootstrap_key_count` takes the free 5th uint. The DAO wallet becomes the DAO's size sponsor; it has 43.4 ALGO free.
3. **Validator:** `oal.daoProposalValidator` stays 3642264629 after the DAO upgrade. It rejects Reclaim, ChangeAdmin and the two new `*_ps` keys, and caps `power` at 1,000 tokens. Fail-safe, but deploy the new validator and repoint `oal` while still in Draft.
4. **Before `initialize()`** (each item is a gate): clear every tracked bootstrap key (`clearBootstrapKeys`, including consumed ones); confirm the DAO wallet has zero `x` boxes (pre-upgrade keys are not counted); `deleteProposal(107)`; revoke or explicitly accept the 11 caller-scoped grants (DAO-R3); confirm no Update-plugin instance has a grant other than global + execution key (DAO-R1); remember that `power` now means whole tokens (MainNet settings: 200/300/600 tokens).
5. **DAO app balance:** 3.97 ALGO free. Every bootstrap UpgradeApp is paid by the DAO (proposal box ≈ 90 k µALGO + `x` 22,100 + `u` 22,900 + `b` 18,900). Enough for about 20; top up before Phase 2.
6. **RemoveNamedPlugin** needs `arc58_getNamedPluginKey`, which the deployed DAO wallet does not route (verified). Both the validator and the DAO call it, so the proposal fails at creation, not at execution. It works after UpdateWallet.
7. **Live callers:** the deployed DAO plugin 3569561215 keeps working for vote/submit/finalize/execute (its vote payment comes from the same sender); create/edit were already broken (DAO-06). No Voting proposals and no vote boxes exist on MainNet, so no legacy tally/vote path is exercised.

## Test gaps (name only)

- Update plugin: a caller-scoped (non-key) grant of the Update plugin with a historical UpgradeApp lease, for both the lease read and the proposal-note read, must revert (DAO-R1).
- Update plugin: an expired (pruned/unpruned) UpgradeApp lease must not authorize (DAO-R1 fix).
- DAO voting: finalize after a quorum miss; then `checkpointExpiredLock` + finalize months later (DAO-R2).
- DAO voting: `deleteProposalVotes` with a closed voter account, then `deleteProposal` (DAO-R4).
- Setup: bootstrap AddPlugin with `caller != zero` followed by `initialize` (DAO-R3).
- Rollout: after the DAO upgrade on the deployed-DAO rehearsal, run `initialize` with a key registered by the deployed DAO still live; and a non-creator `executeProposal` of a leftover bootstrap proposal (#107 shape).
- Validator: UpgradeApp with `app = 0` or zero lease rejected at creation (DAO-R6).

## Checked and OK

- Lifecycle: Draft → Voting → Approved/Rejected → Executed, plus Approved → Invalid (proposer cancel); every transition creator/permission checked; voting window `<=` vs finalize `>` disjoint; Executed/Invalid terminal; `executeProposal` atomic (status set after the loop).
- Vote deposits: sender-bound; re-vote refunds exactly 22,500; `voteCount` counts first votes only and is decremented per deleted receipt; MBR constants exact (votes 22,500, tally 18,900, bootstrap key 18,900, upgrade lease 22,900 for one entry, execution 22,100). `upgradeLeases` rewrite compiles to `box_del` + `box_put` (TEAL), so resizing is safe.
- Refund solvency: Draft refunds `feesPaid` (nothing else was created); other states refund `min(feesPaid, proposal box + tally)`; edit refunds the difference; all inner payments `fee: 0`.
- Fresh-lease rule: UpgradeApp never re-uses a lease (DAO `x` box or live wallet key); ExecutePlugin cannot append to an UpgradeApp key or re-use an UpgradeApp lease; the 19 MainNet `x` records keep blocking re-use after the upgrade.
- Update plugin, execution-key path: the group hash commits every txn (senders, notes, leases), the wallet deletes the key on first use, the binding checks action type, `app == target` and `executionKey == lease`; staging calls need a terminal authenticated update in the same group; `loadBoxedContract` order check; escrow-scoped grants fail `sender == DAO wallet`; named/admin flash rekeys fail `found`. `pushUpdate` passes the current schema when pages grow and never shrinks it. Admin bypass only for the wallet's `admin` global (DAO app address on MainNet).
- `DAO.update`: wallet sender + `pal.update` caller; no other upgrade entry.
- Validator ↔ DAO codecs and plugin-key normalization agree; ChangeAdmin rules (non-zero, not wallet, not DAO, last) and A-2 fee-cover rule present in the new validator.
- DAO plugin: every DAO call is sent as the wallet's spending account; `daoAppID` fixed at create; only the last inner call rekeys back.
- MainNet compatibility of every outbound selector the tree DAO and new validator use (wallet, wallet factory, staking, validator): all present except `arc58_getNamedPluginKey` (note 6) and the 11-arg `newAccount` (used only by `setup`, unreachable on MainNet). MainNet global struct sizes match the tree types. No admin or canReclaim grants exist on the DAO wallet.
