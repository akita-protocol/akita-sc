# Governance root: fix proposals (DAO, validator, DAO plugin, Update plugin)

Companion to `audit-dao.md`. This is a read-only proposal: nothing has been edited, built or deployed. Every finding is treated as an open bug. Proposals are ordered by severity.

**PuyaTs APIs used in the sketches.** Each one was checked against `node_modules/@algorandfoundation/algorand-typescript` 1.3.1 or code already in the repo:

| API | Where checked |
|---|---|
| `match(subject, {sender, receiver, amount})` | `util.d.ts:170`, Guild `voteProposal` |
| `gtxn.Transaction(i).lease` | `gtxn.d.ts:40` |
| `methodSelector<typeof X.prototype.m>()` | `arc4/index.d.ts:191`, `utils/functions.ts:227` |
| `Uint8.asUint64()` | `arc4/encoded-types.d.ts:72`, Guild `isUpdateGuildAction` |
| `op.getByte` | `op.d.ts:763` |
| `Global.groupId` | `op.d.ts:1186` |
| `BoxMap` (`exists`, `value`, `delete`) | `box.d.ts` |
| `abiCall<typeof Staking.prototype.getInfo>` with `{asset, type: STAKING_TYPE_LOCK}` | `utils/functions.ts:482-491` |
| `abiCall<typeof AbstractedAccount.prototype.arc58_getExecutions>` | `validator.algo.ts:318-325` |
| `itxn.payment({... fee: 0}).submit()` | `dao/contract.algo.ts:862` |

**Mainnet facts** (from `reports/mainnet-app-versions-2026-09-11.md`):

| Contract | App ID | Update counter | Version | How a fix ships |
|---|---|---|---|---|
| `dao` | 3569556034 | 2 | 0.0.3 | Upgrade via an UpgradeApp proposal through the Update plugin |
| `daoProposalValidator` | 3642264629 | 0 | — | Immutable. Redeploy, then repoint with UpdateFields `oal` |
| `updatePlugin` | 3569559689 | 0 | — | Redeploy (see note below) |
| `daoPlugin` | 3569561215 | 0 | — | Redeploy (see note below) |
| `staking` | 3642366153 | 1 | — | Upgradeable via the DAO |

**Plugins cannot be upgraded in place.** `AbstractedAccount.assertValidGroup` asserts `txn.appId.version === 0` for every plugin call (`account/contract.algo.ts:533`). An updated plugin is unusable, so a plugin fix always means deploying a new plugin and reinstalling it.

**Box-layout strategy.** None of these proposals change the layout of the existing `ProposalDetails` box (prefix `l`) or `ProposalVoteInfo` box (prefix `v`). All new per-proposal data goes in a new box map, `tallies` (prefix `t`), which is created at submit. Every new rule falls back to the legacy behavior when a proposal has no tally. As a result, old proposals and votes stay decodable after the DAO upgrade, and the SDK's `getProposal` decoder is unchanged.

DAO box prefixes already in use are `p`, `l`, `v` and `x`, so `t` is free.

---

## DAO-01 (High): creator can stage pre-approved proposals before launch

Approved proposals created before initialization outlive it and act as a creator backdoor.

### Design decision for Kyle

The test fixtures depend on bootstrap proposals. `tests/fixtures/dao.ts` runs the whole universe with the DAO in Draft and uses bootstrap `ExecutePlugin` and `UpgradeApp` heavily (lines 564, 1525, 1937, 2045, 2270). A straight copy of the Guild rule ("no UpgradeApp or ExecutePlugin in bootstrap") would break the fixture pattern and probably the deploy pipeline.

- **Option 1A, mirror the Guild exactly.**
  - Ban UpgradeApp, ExecutePlugin, ChangeAdmin and Reclaim in bootstrap.
  - Bootstrap proposals expire when the DAO is fully initialized.
  - Cost: large test churn. Fixtures would have to initialize the DAO and vote, or use a test-only DAO.
- **Option 1B, recommended.**
  - Bootstrap proposals expire when the DAO is fully initialized. This is the Guild's `votingTs === 0` rule.
  - Ban `ChangeAdmin` in bootstrap.
  - Keep bootstrap execution-key actions, but make them short-lived and enforce on-chain that `initialize()` cannot run until every bootstrap key has expired.
  - Fixtures keep working. They never call `initialize()`, apart from two specs that do.

### Change (Option 1B)

File: `arc58/dao/contract.algo.ts`.

- Add a global `bootstrapKeysUntil: GlobalState<uint64>`. The uint schema allows 5 and 4 are in use (`wallet`, `proposalActionLimit`, `minRewardsImpact`, `proposalID`), so this fits with no schema change. Use the key `'bootstrap_keys_until'`.
- Add a constant `MaxBootstrapKeyRounds: uint64 = 10_000` (about 8 hours) and new error codes `errBootstrapForbidden` and `errBootstrapExpired`.

```ts
// createOrUpdateProposal, non-fully-initialized branch, before writing the box:
for (let i: uint64 = 0; i < actions.length; i++) {
  loggedAssert(actions[i].type !== ProposalActionTypeChangeAdmin, errBootstrapForbidden)
}

// executeProposal, after the status check:
const { status, actions, votingTs } = clone(this.proposals(proposalID).value)
loggedAssert(status === ProposalStatusApproved, errInvalidProposalState)
const bootstrap = votingTs === 0
if (bootstrap) {
  // Creator-approved bootstrap proposals expire the moment creator control ends.
  loggedAssert(this.state.value !== DaoStateFullyInitialized, errBootstrapExpired)
}
// in the UpgradeApp and ExecutePlugin cases, after decoding lastValid:
if (bootstrap) {
  loggedAssert(lastValid <= Global.round + MaxBootstrapKeyRounds, errBootstrapForbidden)
  if (lastValid > this.bootstrapKeysUntil.value) this.bootstrapKeysUntil.value = lastValid
}

// initialize():
loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
loggedAssert(this.state.value !== DaoStateFullyInitialized, errAlreadyInitialized)
loggedAssert(Global.round > this.bootstrapKeysUntil.value, errBootstrapExpired) // keys must be dead
this.state.value = DaoStateFullyInitialized

// deleteProposal: also let the creator delete expired bootstrap proposals (as in the Guild).
const bootstrapLeftover = votingTs === 0 && status === ProposalStatusApproved
loggedAssert(status === ProposalStatusDraft || status === ProposalStatusExecuted || bootstrapLeftover /* || DAO-08 states */, errInvalidProposalState)
// refund = min(feesPaid, storage). Bootstrap proposals have feesPaid 0, so storage returns to the DAO.
```

`bootstrapKeysUntil` must be declared with `initialValue: 0`. A plain `GlobalState` read of an unset key panics.

**ABI, schema, boxes.** No ABI change. One new global uint, within the existing schema. No box changes.

**SDK.**
- `dao/index.ts`: `initialize()` may now fail with `errBootstrapExpired`. Surface it in `errors.ts` for both new codes.
- Deploy scripts that call `initialize()` must wait out `MaxBootstrapKeyRounds` after the last bootstrap UpgradeApp or ExecutePlugin.

**Mainnet migration.** Ships in the DAO upgrade. Before that upgrade, check mainnet. The check is read-only, uses algod only, and Kyle runs it:

```bash
APP=3569556034; API=https://mainnet-api.4160.nodely.dev
# 1) DAO state: bytes value 0x00 = Draft, 0x01 = Partial, 0x02 = FullyInitialized
curl -s $API/v2/applications/$APP | jq '.params["global-state"][] | select(.key=="aW5pdGlhbGl6ZWQ=")'
# 2) Every proposal box (prefix 'l' = base64 'bA')
curl -s "$API/v2/applications/$APP/boxes?max=10000" | jq -r '.boxes[].name' | grep '^bA' > props.txt
# 3) For each box: byte 0 = status (0x28 = Approved), bytes 93..100 = votingTs (big-endian uint64).
#    Approved && votingTs == 0  =>  an outstanding pre-init bootstrap proposal (the backdoor).
while read n; do
  v=$(curl -s "$API/v2/applications/$APP/box?name=b64:$n" | jq -r .value | base64 -d | xxd -p -c 1000)
  echo "$n status=${v:0:2} votingTs=${v:186:16}"
done < props.txt | grep 'status=28 votingTs=0000000000000000'
```

The SDK route works too: loop `AkitaDaoSDK.getProposal(id)` for `id` in `1 .. proposal_id-1` and filter `status === 40 && votingTs === 0n`.

- If the DAO is already FullyInitialized: the upgrade makes any such proposal permanently unexecutable, and the creator can delete it afterwards.
- If the DAO is still in Draft or Partial: the creator legitimately holds control today. The fix takes effect when the DAO is initialized. Before initializing, delete or execute every bootstrap proposal and wait for bootstrap keys to expire.

**Regression tests.** File: `dao/tests/setup/dao.setup.e2e.spec.ts`.
- In Draft, create `[ChangeAdmin]` and expect `errBootstrapForbidden`.
- In Draft, create an UpdateFields bootstrap proposal and leave it unexecuted. `initialize()`, then `executeProposal` fails with `errBootstrapExpired`. The creator `deleteProposal` succeeds.
- A bootstrap ExecutePlugin with `lastValid = round + 20_000` fails.
- A bootstrap ExecutePlugin with `lastValid = round + 50` is executed. `initialize()` fails until that round has passed, then succeeds.

**Dependencies.** Share the `executeProposal` edit with DAO-03 and the `deleteProposal` edit with DAO-08. Ships in the same DAO upgrade.

**Size:** M.

---

## DAO-02 (Medium): an UpdateFields vote can do anything an UpgradeApp/ChangeAdmin vote can

UpdateFields can rewrite the upgrade settings, app lists, assets and validator.

### Design decision for Kyle

The Guild does **not** solve this. `GuildActionSetProposalSettings` is gated by `updateGuildProposalSettings` whatever its target class (`guilds/core/contract.algo.ts:392-401, 607-618`), so the same fix should be applied there as well.

- **Option 2A, recommended.**
  - Pick the class per field.
  - Writes to `aal`, `sal`, `oal`, `pal`, `akita_assets` and `upgrade_app_ps` require `max(updateFields, upgradeApp)`.
  - A write to any other `*_ps` requires `max(updateFields, <that class>)`.
  - Fees, content policy, rewards impact, action limit and revenue splits keep the UpdateFields class.
- **Option 2B.** Split UpdateFields into a new action type "UpdateRegistry" with its own settings. This changes the ABI and validator and needs SDK enum work. No advantage over 2A.

Open question for Kyle: should `revenue_splits` (where protocol revenue goes) also be upgrade-class? Recommendation: yes.

### Change (Option 2A)

File: `arc58/dao/contract.algo.ts`, `getProposalSettings`.

```ts
private maxSettings(a: ProposalSettings, b: ProposalSettings): ProposalSettings {
  return {
    fee: a.fee > b.fee ? a.fee : b.fee,
    power: a.power > b.power ? a.power : b.power,
    duration: a.duration > b.duration ? a.duration : b.duration,
    participation: a.participation > b.participation ? a.participation : b.participation,
    approval: a.approval > b.approval ? a.approval : b.approval,
  }
}

case ProposalActionTypeUpdateFields: {
  const { field } = decodeArc4<ProposalUpdateField>(data)
  const base = clone(this.updateFieldsProposalSettings.value)
  switch (field) {
    case AkitaDAOGlobalStateKeysAkitaAppList:
    case AkitaDAOGlobalStateKeysAkitaSocialAppList:
    case AkitaDAOGlobalStateKeysOtherAppList:
    case AkitaDAOGlobalStateKeysPluginAppList:
    case AkitaDAOGlobalStateKeysAkitaAssets:
    case AkitaDAOGlobalStateKeysRevenueSplits:            // if Kyle agrees
    case AkitaDAOGlobalStateKeysUpgradeAppProposalSettings:
      return this.maxSettings(base, this.upgradeAppProposalSettings.value)
    case AkitaDAOGlobalStateKeysAddPluginProposalSettings:
      return this.maxSettings(base, this.addPluginProposalSettings.value)
    case AkitaDAOGlobalStateKeysRemovePluginProposalSettings:
      return this.maxSettings(base, this.removePluginProposalSettings.value)
    case AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings: // DAO-10
      return this.maxSettings(base, this.removeExecutePluginProposalSettings.value)
    case AkitaDAOGlobalStateKeysAddAllowancesProposalSettings:
      return this.maxSettings(base, this.addAllowancesProposalSettings.value)
    case AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings:
      return this.maxSettings(base, this.removeAllowancesProposalSettings.value)
    case AkitaDAOGlobalStateKeysNewEscrowProposalSettings:
      return this.maxSettings(base, this.newEscrowProposalSettings.value)
    case AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings:   // DAO-10
      return this.maxSettings(base, this.toggleEscrowLockProposalSettings.value)
    default:
      return base   // update_fields_ps and plain parameters
  }
}
```

PuyaTs already compiles a `switch` over a `string` field in `updateField`, so this pattern is supported. Because `proposalCost` takes the max over all actions, mixing in one sensitive field raises the whole proposal to the upgrade class.

**ABI, schema, boxes.** None. `proposalCost` returns higher values for sensitive fields, and the SDK reads it from chain.

**SDK.** Nothing mandatory. If the UI shows class labels, update `dao/index.ts` to label sensitive UpdateFields proposals as upgrade-class.

**Mainnet migration.** Ships in the DAO upgrade. Proposals already Voting re-evaluate with the new class at vote and finalize time unless DAO-09's snapshot exists. Legacy proposals have no snapshot, so an in-flight sensitive UpdateFields proposal would suddenly need the upgrade thresholds. Check for Voting UpdateFields proposals before upgrading.

**Regression tests.** File: `dao/tests/proposals/dao.proposals.e2e.spec.ts`.
- `proposalCost([UpdateFields aal])` equals the upgradeApp settings.
- `proposalCost([UpdateFields content_policy])` equals the UpdateFields settings.
- A proposal setting `upgrade_app_ps` that gets 60% approval at 70% participation is Rejected. Configure the test so upgradeApp needs 70%.

**Dependencies.** DAO-10 adds the two missing `*_ps` keys. Guild family: apply the same rule to `GuildActionSetProposalSettings`.

**Size:** S.

---

## DAO-03 (Medium): the UpgradeApp class is only advisory

Execution keys are not bound to a plugin, and the `app` field in UpgradeApp is never enforced.

### Design decision for Kyle

Kyle previously accepted "per-plugin ExecutePlugin settings are advisory" for the Guild. In the DAO, that acceptance means the UpgradeApp class is advisory too.

- **Option 3A, recommended now.** Bind upgrades in the DAO and the Update plugin.
  - Execution leases must be fresh, so no reuse or appending.
  - ExecutePlugin may not target the Update plugin.
  - The redeployed Update plugin checks that the lease authorizing its group came from an UpgradeApp action whose `app` equals the target.
  - This closes the upgrade path. Cross-plugin reuse among other execution-key plugins (pay, revenue manager) remains.
- **Option 3B, recommended as a follow-up.** Bind keys in the wallet.
  - Add a wallet method `arc58_addPluginExecutionKey(plugin, lease, groups, firstValid, lastValid)` and a new `executionPlugins` box (prefix `X`, mapping lease to plugin).
  - `assertValidGroup` asserts `executionPlugins(Txn.lease)`, when present, equals `key.plugin`.
  - The DAO and Guild switch to the new method.
  - This fixes every plugin, but it is an `AbstractedAccount` change: a factory child, shipped to the DAO wallet via UpdateWallet and to user wallets by opt-in. It also needs Guild changes.

### Change (3A)

**DAO,** in `executeProposal`:

```ts
private assertFreshLease(key: bytes<32>): void {
  loggedAssert(!this.executions(key).exists, errExecutionKeyReused)
  const info = abiCall<typeof AbstractedAccount.prototype.arc58_getExecutions>({
    appId: this.wallet.value, args: [[key]]
  }).returnValue[0]
  loggedAssert(info.groups.length === 0, errExecutionKeyReused)
}

case ProposalActionTypeUpgradeApp: {
  const { app, executionKey, groups, firstValid, lastValid } = decodeArc4<ProposalUpgradeApp>(data)
  loggedAssert(app !== 0, errInvalidProposalAction)
  this.assertFreshLease(executionKey)
  this.executions(executionKey).value = { proposalID, index: i }
  this.newExecution(executionKey, groups, firstValid, lastValid)
  break
}
case ProposalActionTypeExecutePlugin: {
  const { plugin, executionKey, groups, firstValid, lastValid } = decodeArc4<ProposalExecutePlugin>(data)
  loggedAssert(plugin !== this.pluginAppList.value.update, errInvalidProposalAction) // upgrades only via UpgradeApp
  this.assertFreshLease(executionKey)
  this.newExecution(executionKey, groups, firstValid, lastValid)
  break
}
```

Add the same `plugin !== pal.update` check in `getProposalSettings` for ExecutePlugin, so such a proposal is refused at creation.

**New Update plugin** (`arc58/plugins/update-akita-dao/contract.algo.ts`). Add a guard and call it first in every method:
- `setClearProgram`, `initBoxedContract`, `loadBoxedContract` and `deleteBoxedContract`: use `appId = 0`, which means "any UpgradeApp lease".
- `updateApp`, `updateAkitaDaoAppIDForApp` and `updateAkitaDaoEscrowForApp`: use `appId`.
- `updateRevocation`: use the wallet factory.
- `updateFactoryChildContract`: use `factoryAppId`.

```ts
private requireUpgradeLease(daoWallet: Application, target: uint64): void {
  let found = false
  let lease = Txn.lease  // placeholder; overwritten below
  for (let i: uint64 = 0; i < Txn.groupIndex; i++) {
    const t = gtxn.Transaction(i)
    if (
      t.type === TransactionType.ApplicationCall &&
      t.appId === daoWallet &&
      t.numAppArgs > 1 &&
      t.appArgs(0) === methodSelector<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>() &&
      btoi(t.appArgs(1)) === Global.currentApplicationId.id
    ) {
      lease = t.lease
      found = true
    }
  }
  loggedAssert(found, errNotUpgradeExecution)
  const meta = abiCall<typeof AkitaDAO.prototype.mustGetExecution>({ appId: this.akitaDAO.value, args: [lease] }).returnValue
  const proposal = abiCall<typeof AkitaDAO.prototype.getProposal>({ appId: this.akitaDAO.value, args: [meta.proposalID] }).returnValue
  const action = clone(proposal.actions[meta.index])
  loggedAssert(action.type === ProposalActionTypeUpgradeApp, errNotUpgradeExecution)
  if (target !== 0) {
    loggedAssert(decodeArc4<ProposalUpgradeApp>(action.data).app === target, errNotUpgradeExecution)
  }
}
```

Notes on the guard:
- The wallet has already consumed the key, so replay is impossible. The DAO `executions` metadata persists, and `assertFreshLease` blocks a later ExecutePlugin from reusing it.
- The guard reads only `arc58_rekeyToPlugin`, because the DAO installs the Update plugin unnamed and global.
- After a ChangeAdmin to an external admin, that admin can no longer drive the Update plugin without an UpgradeApp lease. That is acceptable, since the admin can use `arc58_rekeyTo` directly.
- One UpgradeApp action can only target one `app`. A multi-app upgrade needs one UpgradeApp action per app, each with its own lease and group. The SDK's `proposeAndExecute`/`runUpdate` helpers must emit them that way.

**ABI, schema, boxes.**
- DAO: none. The `executions` box layout is unchanged.
- New Update plugin app ID. Its ABI is unchanged, but it gains new error codes.

**SDK and scripts.**
- `networks.ts` / `config.ts`: new `updatePlugin` ID.
- `scripts/script-base.ts` `runUpdate`/`proposeAndExecute`: build one UpgradeApp action per target app, set `app` correctly, and never send upgrades through ExecutePlugin.
- `scripts/deploy-update-plugin.ts` already handles reinstalling the plugin.
- `dao/index.ts` `ExecutePlugin` builder: reject the Update plugin client-side.

**Mainnet migration.** Order matters:
1. Deploy the new Update plugin (creator: `create(version, dao, clearProgram)`).
2. P1, under the current rules: `UpgradeApp{app: DAO}`, executed through the **old** Update plugin.
3. P2, under the new rules and upgrade class: `[AddPlugin newUpdate (useExecutionKey, global, upgrade-class settings), UpdateFields pal {update: newUpdate}, RemovePlugin oldUpdate]`. `DAO.update()` trusts `pal.update`, so later upgrades go through the new plugin.

Until P2 executes, the old plugin remains a weak-class route. Keep the window short. Existing wallet execution keys are unaffected.

**Regression tests.** File: `arc58/plugins/update-akita-dao/update-akita-dao.e2e.spec.ts`.
- An ExecutePlugin proposal for the pay plugin whose group contains Update plugin `updateApp` fails at proposal creation, or with `errNotUpgradeExecution` at execution.
- An UpgradeApp with `app = X` whose group upgrades Y fails.
- Reusing an executed UpgradeApp lease in a new ExecutePlugin fails with `errExecutionKeyReused`.
- The existing upgrade happy path still passes.

**Dependencies.**
- DAO-02: `pal` becomes upgrade-class, so P2 is upgrade-class.
- DAO-01: shares the `executeProposal` edit.
- Option 3B touches the account family (`AbstractedAccount`) and the Guild family (`GuildActionExecutePlugin`).

**Size:** M for 3A, L for 3B.

---

## DAO-04 (Medium): quorum compares time-weighted power with raw locked tokens

### Design decision for Kyle

- **Option 4A, recommended.** One unit everywhere: whole locked tokens.
  - Vote weight is `min(lockedAKTA, lockedBONES) / 1e6`, counting only locks whose expiration is after the vote ends.
  - The denominator stays `min(liveLockedAKTA, liveLockedBONES) / 1e6`.
  - Pros: smallest change, no box layout change, the old DAO plugin keeps working for votes. It also fixes DAO-05's power inflation and the double-vote Info item.
  - Con: lock length no longer multiplies voting power.
- **Option 4B.** Keep time-weighted approve/reject weight, but count participation in raw tokens.
  - Each vote stores its raw weight in a v2 vote box (new prefix `w`, value `{type, power, weight}`, MBR 25,700). The proposal tally sums the weights.
  - Cons: `DAOProposalVotesMBR` changes, so the old DAO plugin's votes break and SDK and plugin must ship together. Legacy and v2 vote paths must coexist. Size L.
- **Option 4C.** Have Staking maintain a time-weighted live total (Σ amount·expiration).
  - Needs 128-bit accumulators and an upgrade-coordinated Staking change. Size L. Not recommended.

Under every option, holders who lock only one asset still count in the denominator. Document this as intended, since governance requires both tokens. With 4A, the proposer threshold `power` is also measured in tokens. The current validator caps it at 1,000, which is trivial for AKTA supply, so that cap needs a decision as well (see the validator bundle below).

### Change (4A)

File: `arc58/dao/contract.algo.ts`. Import `STAKING_TYPE_LOCK` from `../../staking/types`.

```ts
private lockedThrough(account: Account, asset: uint64, through: uint64): uint64 {
  const info = abiCall<typeof Staking.prototype.getInfo>({
    appId: this.akitaAppList.value.staking,
    args: [account, { asset, type: STAKING_TYPE_LOCK }],
  }).returnValue
  if (info.expiration <= through) return 0
  return info.amount / 1_000_000
}

private getGovernancePower(account: Account, through: uint64): uint64 {
  const { akta, bones } = this.akitaAssets.value
  if (akta === 0 || bones === 0) return 0
  const a = this.lockedThrough(account, akta, through)
  const b = this.lockedThrough(account, bones, through)
  return a < b ? a : b
}
```

Call sites:
- `createOrUpdateProposal`: `getGovernancePower(Txn.sender, Global.latestTimestamp + ONE_WEEK)`.
- `voteProposal`: `getGovernancePower(Txn.sender, proposal.votingTs + duration)`. The lock must outlive the vote, which kills same-lock double voting.
- `finalizeProposal`: unchanged. It already divides `liveLockedStake` by 1e6.

**ABI, schema, boxes.** None.

**SDK.**
- Any UI that shows "voting power" via `getStakingPower` should switch to locked-token weight. Look in `dao/index.ts` and `staking/`.
- The default `power` thresholds in `utils/defaults.ts` (200/300/600) change meaning: they become tokens instead of token-years.

**Mainnet migration.** Ships in the DAO upgrade. Votes already cast keep their recorded weight, and re-votes use the new weight. Finalize in-flight proposals before the upgrade, or accept mixed units for them.

**Regression tests.** File: `dao/tests/voting/dao.voting.e2e.spec.ts`.
- With 100% turnout and 6-month locks, finalize meets 80% participation. This fails today.
- A voter whose lock expires before `votingTs + duration` is rejected with `errForbidden`.
- A holder who locks only AKTA in one account and only BONES in another gets weight 0.
- Remove the time-warp workarounds noted in memory ("vote with every staked account").

**Dependencies.**
- DAO-05: 4A neutralizes its power multiplier. The Staking `updateSettings` bound is still needed so locking cannot be frozen.
- Validator bundle: `power` cap.
- DAO-09: the tally can snapshot the denominator if Kyle wants it frozen at submit.

**Size:** S for 4A, L for 4B or 4C.

---

## DAO-05 (Medium): the AKTA/BONES creator controls voting power through Staking's max-lockup setting

### Change

File: `staking/contract.algo.ts`, `updateSettings`. Bound the value so the setting can neither freeze locking nor allow multi-decade locks:

```ts
loggedAssert(value >= ONE_WEEK * 2 && value <= MAX_LOCKUP, errInvalidLockupSetting) // MAX_LOCKUP e.g. 4 * ONE_YEAR
```

With 4A, lockup length no longer affects governance. If Kyle picks 4B, also cap `remainingDays` at 365 in a **DAO-local** helper. Do not edit the shared `utils/functions.ts getStakingPowerThrough`: the staking power gate and others use it, and changing it would leave deployed apps with different semantics.

### Design decision for Kyle

Who should own the governance assets' lockup setting?
- Keep the asset creator, bounded as above. Recommended if the creator is a Kyle- or DAO-controlled multisig.
- Make it DAO-only: `Txn.sender === DAO wallet address` for `akta` and `bones`.

**ABI, schema, boxes.** None. A new error code.

**SDK.** `staking/` `updateSettings` callers: surface the new error.

**Mainnet migration.** Staking (3642366153) is upgradeable through the DAO, with update counter 1. Before upgrading, check the current values. Kyle runs this:
- `getSettings([akta, bones])`, read-only.
- `curl $API/v2/assets/<AKTA_ID> | jq .params.creator`, and the same for BONES, to see who holds the lever.

Existing long locks keep their expiration. Under 4A that no longer matters.

**Regression tests.** File: `staking/staking.e2e.spec.ts`.
- `updateSettings(0)` fails.
- `updateSettings(50 years)` fails.
- `updateSettings(2 years)` succeeds.

**Dependencies.** DAO-04. Staking family owns the change.

**Size:** S.

---

## DAO-06 (Low): the DAO plugin's governance path is broken

`newProposal` and `editProposal` always revert, the rekey ordering regressed, and there is no delete wrapper.

### Change

Write a new `AkitaDAOPlugin` (`arc58/plugins/dao/contract.algo.ts`):

```ts
newProposal(wallet: Application, rekeyBack: boolean, cid: CID, actions: ProposalAction[]): uint64 {
  const sender = getSpendingAccount(wallet)
  // proposalCost already returns 0 for the pre-init creator; no state decode, no rekey on the quote.
  const { total } = abiCall<typeof AkitaDAO.prototype.proposalCost>({
    sender, appId: this.daoAppID.value, args: [actions],
  }).returnValue
  const actionsPayment = itxn.payment({ sender, receiver: this.daoAppID.value.address, amount: total })
  return abiCall<typeof AkitaDAO.prototype.newProposal>({
    sender, appId: this.daoAppID.value, args: [actionsPayment, cid, actions],
    rekeyTo: rekeyAddress(rekeyBack, wallet),
  }).returnValue
}

// editProposal: replace `status !== uint8(0)` with
loggedAssert(status === ProposalStatusDraft, errProposalNotDraft)

deleteProposal(wallet: Application, rekeyBack: boolean, proposalID: uint64): void {
  const sender = getSpendingAccount(wallet)
  abiCall<typeof AkitaDAO.prototype.deleteProposal>({
    sender, appId: this.daoAppID.value, args: [proposalID], rekeyTo: rekeyAddress(rekeyBack, wallet),
  })
}
// + cancelProposal(wallet, rekeyBack, id) if DAO-09's cancel is adopted
// - remove setup(): DAO-11 makes DAO.setup creator-only
```

Delete the `AkitaDAOGlobalStateKeysInitialized`/`op` import.

**ABI, schema, boxes.**
- New app ID.
- New methods: `deleteProposal`, and `cancelProposal` if adopted.
- `setup` is removed.
- `newProposal` and `editProposal` keep their signatures.

**SDK.**
- `wallet/plugins/dao.ts`: add `deleteProposal` and `cancelProposal` hooks and drop `setup`.
- `networks.ts` / `config.ts`: new `daoPlugin` ID.
- `tests/fixtures/plugins/dao.ts`: update.
- The plugin-SDK parity test (CONTRACT_AUDIT "Plugin SDK parity") will force the new hooks.
- Rebuild the SDK `dist` (memory: tests resolve `dist`).

**Mainnet migration.**
- Deploy the new plugin with `create(3569556034)`.
- Users install the new plugin and remove the old one. Add a migration helper in `wallet/` or the app UI.
- The old plugin (3569561215) still works for submit, vote, finalize and execute. Only create and edit were broken. Under Option 4B the old plugin's votes would break too.

**Regression tests.** File: `arc58/plugins/dao/dao.e2e.spec.ts`. With a fully initialized DAO (`buildAkitaUniverse` plus `initialize`), drive a whole proposal through the plugin with `rekeyBack=true`:
- create (pays exactly `proposalCost.total`)
- edit (with and without payment)
- submit, vote, re-vote, finalize, execute
- delete (refund lands in the wallet's spending account)

**Dependencies.** Ships with or after the DAO upgrade, which adds the `deleteProposal` states and cancel (DAO-08, DAO-09). DAO-11 makes the plugin's `setup` useless.

**Size:** S for the contract, M including SDK and migration.

---

## DAO-07 (Low): vote deposits don't match the documented fix

Re-votes pay the deposit again, and the payment sender is not bound.

### Design decision for Kyle

- **Option 7A, recommended.** Keep the payment on every call, but refund it immediately when the vote box already exists, and require `payment.sender === Txn.sender`. The ABI stays the same, the old plugin keeps working, and the refund always goes to whoever paid.
- **Option 7B.** Store a `funder` in the vote box to allow sponsored votes. This changes the vote layout (MBR 22,500 → 35,300) and needs a v2 prefix. Only worth it if sponsored voting is a product need.

### Change (7A)

File: `arc58/dao/contract.algo.ts`, `voteProposal`.

```ts
loggedAssert(
  match(mbrPayment, { sender: Txn.sender, receiver: Global.currentApplicationAddress, amount: DAOProposalVotesMBR }),
  errInvalidPayment
)
...
const isRevote = this.proposalVotes({ proposalID, voter: Txn.sender }).exists
if (isRevote) {
  // existing subtract-previous-power switch ...
  itxn.payment({ receiver: Txn.sender, amount: DAOProposalVotesMBR, fee: 0 }).submit() // storage already paid
}
```

**ABI, schema, boxes.** None.

**SDK.**
- `dao/index.ts` `voteProposal`: on a re-vote, add one inner-transaction fee to the outer call. Use `coverAppCallInnerTransactionFees` or a static fee. Memory pitfall: `setSendParams` drops fee flags, so pass the fee on the call itself.
- `wallet/plugins/dao.ts` `voteProposal`: set the extra fee on the plugin's outer txn.

**Mainnet migration.** Ships in the DAO upgrade. Existing vote boxes are compatible. Extra payments made before the upgrade are not recoverable on-chain. To quantify them, count `voteProposal` calls against `v` boxes in the indexer.

**Regression tests.** File: `dao/tests/voting/dao.voting.e2e.spec.ts`.
- Re-vote: the voter's net balance changes only by fees, and the DAO balance is unchanged.
- A vote whose payment comes from a different sender fails with `errInvalidPayment`.

**Dependencies.** DAO-08's vote counter is incremented only when the vote is not a re-vote.

**Size:** S.

---

## DAO-08 (Low): terminal states strand funds

Rejected proposals cannot be deleted, and deleting an executed proposal orphans the vote deposits.

### Change

Add one per-proposal tally box, shared with DAO-09 (and DAO-04's denominator snapshot if wanted). Files: `arc58/dao/types.ts`, `constants.ts`, `contract.algo.ts`.

```ts
// types.ts
export type ProposalTally = {
  duration: uint64; participation: uint64; approval: uint64  // DAO-09 snapshot
  voteCount: uint64                                          // DAO-08
}
// constants.ts
export const AkitaDAOBoxPrefixTallies = 't'
export const DAOProposalTallyMBR: uint64 = 2_500 + 400 * (1 + 8 + 32)   // = 18_900; recompute exactly at build
// contract.algo.ts
tallies = BoxMap<uint64, ProposalTally>({ keyPrefix: AkitaDAOBoxPrefixTallies })
```

- **`proposalCost`:** add `DAOProposalTallyMBR` to `mbr` when `state === FullyInitialized`. The proposer funds the tally.
- **`submitProposal`:** `this.tallies(id).value = { ...snapshot (DAO-09), voteCount: 0 }`.
- **`voteProposal`:** if the vote is not a re-vote and the tally exists, `this.tallies(id).value.voteCount += 1`.
- **`deleteProposalVotes`:** if the tally exists, `this.tallies(id).value.voteCount -= 1` for each voter. Also accept `ProposalStatusInvalid`, so cancelled proposals can be cleaned up.
- **`deleteProposal`:**

```ts
loggedAssert(
  status === ProposalStatusDraft || status === ProposalStatusExecuted ||
  status === ProposalStatusRejected || status === ProposalStatusInvalid || bootstrapLeftover /* DAO-01 */,
  errInvalidProposalState)
loggedAssert(Txn.sender === creator, errIncorrectSender)
let storage: uint64 = this.proposalsMbr(actions)
if (this.tallies(proposalID).exists) {
  loggedAssert(this.tallies(proposalID).value.voteCount === 0, errVotesOutstanding)
  this.tallies(proposalID).delete()
  storage += DAOProposalTallyMBR
} else {
  // legacy (pre-upgrade) voted proposals cannot prove their votes are cleared
  loggedAssert(votingTs === 0, errVotesOutstanding)
}
let refund: uint64 = status === ProposalStatusDraft ? feesPaid : (feesPaid < storage ? feesPaid : storage)
```

**ABI, schema, boxes.**
- New `t` box map.
- New readonly method `getProposalTally(id): ProposalTally`, so the regenerated client exposes it.
- `proposalCost` values increase by 18,900.
- No change to existing boxes.

**SDK.**
- `dao/index.ts`: add `deleteProposal` and `deleteProposalVotes` wrappers (neither exists in the SDK today), plus `getProposalTally`.
- Cleanup flow: list voters from `v` boxes for an id (box names are `v` + id + address), call `deleteProposalVotes` in batches, then `deleteProposal`.
- Regenerate `generated/AkitaDAOClient.ts`.

**Mainnet migration.**
- Legacy voted Executed proposals without a tally become non-deletable. This protects voters, and it is a design call.
- To find voted legacy proposals that still have vote boxes, list the `v` boxes.
- Legacy Rejected proposals become deletable only if they have no votes, which in practice is none. Their boxes stay. Accept this, or add a one-off `deleteLegacyProposal(id, voters[])` that refunds the listed voters first. That function cannot prove completeness, so this proposal does not recommend it.

**Regression tests.** File: `dao/tests/proposals/dao.proposals.e2e.spec.ts`.
- A Rejected proposal is deleted with the exact storage refund.
- `deleteProposal` on an Executed proposal with outstanding votes fails with `errVotesOutstanding`. After `deleteProposalVotes` for all voters, it succeeds.
- The refund equals proposal box MBR plus tally MBR.

**Dependencies.** DAO-09 (shared box), DAO-07 (counter increments only on a first vote), DAO-01 (bootstrap delete), DAO-06 (plugin `deleteProposal`).

**Size:** M.

---

## DAO-09 (Low): a Voting proposal can be bricked when the settings it depends on change or disappear

### Change

- **`submitProposal`:** compute `proposalCost(actions)` once and store `{duration, participation, approval}` in the tally (see DAO-08).
- **`voteProposal` and `finalizeProposal`:**

```ts
let duration: uint64; let participation: uint64; let approval: uint64
if (this.tallies(proposalID).exists) {
  ({ duration, participation, approval } = this.tallies(proposalID).value)
} else {
  ({ duration, participation, approval } = this.proposalCost(proposal.actions))  // legacy
}
```

PuyaTs destructuring assignment `({...} = expr)` is already used in `plugins/dao/contract.algo.ts:53`.

- **New `cancelProposal`,** mirroring Guild `cancelProposal` (`guilds/core/contract.algo.ts:1067-1074`). It recovers proposals that became unexecutable after approval.

```ts
cancelProposal(proposalID: uint64): void {
  loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)
  const { status, creator, votingTs } = this.proposals(proposalID).value
  loggedAssert(status === ProposalStatusApproved && votingTs !== 0, errInvalidProposalState)
  loggedAssert(Txn.sender === creator, errIncorrectSender)
  this.proposals(proposalID).value.status = ProposalStatusInvalid   // constant already exists (10)
}
```

### Design decision for Kyle

Should a proposer be able to cancel a community-approved proposal? The Guild says yes. Alternatives:
- (a) Recommended: proposer-only, as in the Guild.
- (b) Also permissionless after N days unexecuted. This is the "approved-proposal expiry" Kyle skipped before.

Legacy Voting proposals whose ExecutePlugin settings box is already gone remain stuck. Check mainnet before upgrading: list `l` boxes with status `0x14` (Voting) that contain action type `0x1e` (ExecutePlugin), and confirm each `p` settings box still exists. If any are stuck, add a narrow `abandonLegacyProposal` that sets them to Invalid when `!tallies(id).exists && !plugins(key).exists`.

**ABI, schema, boxes.**
- New `cancelProposal`.
- `ProposalStatusInvalid` becomes a reachable state. The SDK enum in `dao/constants.ts` / `types.ts` must decode 10.
- Tally box as in DAO-08.

**SDK.** `dao/index.ts` `cancelProposal`; plugin hook (DAO-06); status label.

**Mainnet migration.** DAO upgrade only. Legacy in-flight proposals use the live-settings fallback.

**Regression tests.**
- `dao/tests/voting/dao.voting.e2e.spec.ts`: submit an ExecutePlugin proposal, execute a RemovePlugin for that plugin, and the first proposal can still be voted on and finalized.
- `dao/tests/voting/dao.voting.e2e.spec.ts`: change `update_fields_ps.duration` mid-vote, and the in-flight proposal keeps its snapshot.
- `dao/tests/proposals/dao.proposals.e2e.spec.ts`: an Approved proposal is cancelled by its creator, after which `deleteProposalVotes` and `deleteProposal` succeed. A non-creator cancel fails.

**Dependencies.** DAO-08 (tally), DAO-06 (plugin hook), DAO-04 (the tally can hold the denominator snapshot).

**Size:** M (shared with DAO-08).

---

## DAO-10 (Info, fix it): `toggle_escrow_lock_ps` and `remove_execute_plugin_ps` can never be changed

**Change.** This is cheap and gives governance control over the Reclaim class.
- DAO `updateField`: add two cases.

```ts
case AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings: {
  this.removeExecutePluginProposalSettings.value = clone(decodeArc4<ProposalSettings>(value)); break
}
case AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings: {
  this.toggleEscrowLockProposalSettings.value = clone(decodeArc4<ProposalSettings>(value)); break
}
```

- Validator (`validator.algo.ts:215-225`): add both keys to the `validateSettings` case list. The validator is immutable, so this is part of the redeploy bundle.

**SDK.** `dao/index.ts` UpdateFields helpers and field enum: add both keys.

**Migration.**
1. Redeploy the validator.
2. UpdateFields `oal` with the new validator ID. This is upgrade-class after DAO-02.
3. Then use the new fields.

**Regression test.** `dao/tests/proposals/dao.proposals.e2e.spec.ts`: an UpdateFields `toggle_escrow_lock_ps` proposal executes and the state changes.

**Dependencies.** DAO-02 (classes for these keys), validator bundle.

**Size:** S.

---

## DAO-11 (Low/Info, fix it): `setup()` is open to anyone

**Change.** In `setup()`:

```ts
loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
loggedAssert(this.state.value !== DaoStateFullyInitialized, errAlreadyInitialized)
```

Remove `setup` from the new DAO plugin (DAO-06).

**ABI, schema, boxes.** None.

**SDK.** `dao/index.ts` `setup`: document creator-only. `wallet/plugins/dao.ts`: drop the `setup` hook.

**Mainnet migration.** Moot on mainnet: the wallet is already set, so `setup` reverts with `errWalletAlreadySetup`. The fix protects fresh testnet and localnet deployments.

**Regression test.** `dao/tests/setup/dao.setup.e2e.spec.ts`: a non-creator `setup` fails.

**Size:** S.

---

## DAO-12 (Info): miscellaneous items

| Item | Proposal | Size |
|---|---|---|
| Cheaper edit silently keeps the fee difference | **Fix.** In `editProposal`, when `total < feesPaid`, pay `feesPaid - total` back to the creator (`itxn.payment({receiver: creator, amount, fee: 0})`). SDK edit call needs +1 inner fee. Test: edit to fewer actions, the creator's balance increases by the difference. | S |
| `executions` metadata boxes never deleted | **Won't fix.** DAO-03A uses them as the permanent lease→UpgradeApp record and freshness guard. The MBR is paid by the proposer's fee. | — |
| ChangeAdmin to the wallet's own app address, or ChangeAdmin not last | **Fix in the validator bundle.** `validateActions`: `admin !== wallet.address`, `admin !== Global.callerApplicationAddress` (the DAO itself, a no-op), and ChangeAdmin must be the last action (`i === actions.length - 1`). Test in `dao.proposals.e2e.spec.ts`. | S |
| Plugin-box MBR quoted for a fixed 24-byte escrow name | **Fix.** In `proposalCost`, for AddPlugin and AddNamedPlugin, decode the escrow and `defaultToEscrow`, and charge `pluginsMbr(defaultToEscrow ? '' : escrow)` only when `useExecutionKey`. Matches `addPlugin`'s write condition. Test: `proposalCost` with a 40-byte escrow name. | S |
| Double vote with the same lock when duration exceeds 1 week | **Fixed by DAO-04** (`through = votingTs + duration`). Under 4B, add the same `requiredThrough` to `getStakingPowerThrough` calls. | — |

---

## Release bundle and ordering

1. **Validator redeploy** (immutable, new app ID). Contents:
   - DAO-10's two keys
   - DAO-12 ChangeAdmin checks
   - DAO-04 `power` cap decision: raise or remove the `<= 1_000` cap if power becomes tokens
   - Optional: reject ExecutePlugin whose plugin equals the DAO's `pal.update`. This needs the validator to read the DAO, so keep that check in the DAO instead, as proposed in DAO-03.
2. **New Update plugin** (DAO-03A) and **new DAO plugin** (DAO-06). Deploy both.
3. **Staking upgrade** (DAO-05), as an UpgradeApp proposal through the old Update plugin.
4. **DAO upgrade.** Contents: DAO-01, 02, 03 (DAO side), 04, 07, 08, 09, 10, 11, 12. Run as P1 = `UpgradeApp{DAO}` through the old Update plugin.
5. **Follow-up proposal P2,** now under upgrade class: UpdateFields `oal` (new validator) and `pal` (new Update plugin), AddPlugin new Update plugin, RemovePlugin old Update plugin.
6. **SDK release:**
   - regenerate clients
   - `networks.ts` IDs (validator, updatePlugin, daoPlugin)
   - new `dao/index.ts` wrappers (cancel, delete, deleteVotes, getProposalTally)
   - plugin hooks
   - error codes
   - rebuild `dist`
   - Then the wallet migration helper for the DAO plugin.

Before step 4, run the mainnet checks and settle what they find:
- DAO-01: DAO state and bootstrap-Approved proposals.
- DAO-09: stuck Voting ExecutePlugin proposals.
- DAO-02 and DAO-04: in-flight Voting proposals. Ideally finalize them before the upgrade.

Run `npm test` (full suite with the VibeKit indexer) before each mainnet step.

## Cross-family dependencies

| Family | What it needs |
|---|---|
| **Guild** | Apply the DAO-02 per-class rule to `GuildActionSetProposalSettings`. Adopt DAO-03B wallet binding if chosen. The Guild already has DAO-01, cancel and snapshots, which the DAO now mirrors. |
| **Account / wallet** | DAO-03B (`arc58_addPluginExecutionKey`, `executionPlugins` box, `assertValidGroup` check). The DAO wallet then needs an UpdateWallet. |
| **Staking** | DAO-05 `updateSettings` bounds. Leave the shared `utils/functions.ts getStakingPowerThrough` unchanged (staking power gate, Guild locked-token policy). |
| **Plugins / SDK** | DAO plugin and Update plugin redeploys, registry update, plugin-SDK parity test. |

## Decisions needed from Kyle (summary)

1. **DAO-01:** 1B (short-lived bootstrap keys, expire on init, initialize waits) or a strict Guild mirror (1A, fixture rewrite). Recommendation: **1B**.
2. **DAO-02:** per-field class mapping (2A). Should `revenue_splits` be upgrade-class (recommended yes)? Apply the same rule to the Guild's SetProposalSettings? Recommendation: **2A, yes, yes**.
3. **DAO-03:** 3A now (DAO plus Update plugin binding) and 3B later (wallet-level plugin binding)? Recommendation: **3A now, schedule 3B**.
4. **DAO-04:** 4A (raw locked tokens for weight and quorum, losing lock-length weighting), 4B (keep weighting, separate participation tally, L) or 4C. Also the proposer `power` units and the validator cap. Recommendation: **4A**.
5. **DAO-05:** asset creator with bounds, or DAO-only setter for the governance assets' lockup. Recommendation: **bounded, DAO-only if the creator is an individual key**.
6. **DAO-07:** 7A (no sponsored votes) or 7B (funder stored). Recommendation: **7A**.
7. **DAO-08/09:** legacy voted proposals non-deletable (recommended). Proposer-only cancel (recommended) or also time-based expiry.
