# Guilds: fix proposals (2026-10-02)

These proposals follow from `audit-guilds.md` and are ordered by severity. Everything here is a read-only proposal: no repo file was changed.

All paths are relative to `projects/akita-sc/smart_contracts/arc58/guilds/` unless stated otherwise.

**How the code sketches were checked.** Every API in the sketches was checked against `node_modules/@algorandfoundation/algorand-typescript/*.d.ts` or against existing repo code:

| API | Where it was confirmed |
|---|---|
| `Box<bytes>` `.create({size})`, `.length`, `.extract`, `.replace`, `.resize` | `fixed-signers/contract.algo.ts:154-172` |
| `ensureBudget(…, OpUpFeeSource.GroupCredit)` | `util.d.ts:205` and fixed-signers |
| `op.AcctParams.acctBalance(a)` returning `readonly [uint64, boolean]` | `op.d.ts:65` |
| `abiCall<typeof Staking.prototype.getSettings>` | `staking/contract.algo.ts:1060-1072` (returns `SettingsCheck{value, exists}[]`) |
| `Bytes('')` | used throughout the repo |
| Tuple destructuring with a skipped element (`const [, x] = …`) | `subscriptions/contract.algo.ts:131` |

**Deployment, common to every fix.** Guilds are not on mainnet, so this is a code-only change. The steps after the code changes:

1. `npm run build` to recompile and regenerate the clients in `projects/akita-sdk/src/generated/*Guild*Client.ts`.
2. Rebuild `projects/akita-sdk` dist; the akita-sc tests resolve the SDK from dist.
3. On any testnet or localnet deployment, re-upload the programs:
   - The DAO wallet can replace the **Guild kernel** program, because `initProgram` allows replacing an existing `guild` box.
   - **Consensus program names are immutable** (`GuildConsensusFactory.initProgram` requires `!programs(name).exists`). Changed `subscription` or `locked-token` programs therefore need either a fresh consensus factory or new names (for example `subscription-v2`). The SDK `GuildConsensusName` enum and the deploy scripts must follow whichever is chosen. The simplest route before mainnet is to redeploy both factories.

---

## L-1: Subscription and locked-token proposal settings can be unattainable, permanently bricking a guild (Low · size L)

This fix has three independent parts.

### L-1a. The guild caps voted raises of `minimumApprovals` at the approvals the proposal demonstrated

**File:** `core/contract.algo.ts`, functions `setSettingsForAction` and `executeProposal`.

```ts
// new private helper
/** A voted change may keep or lower an approval minimum, or raise it only to approvals its own ballot demonstrated. */
private requireAttainableMinimum(proposalID: uint64, current: uint64, next: uint64): void {
  if (next <= current || !this.proposals(proposalID).exists || this.proposals(proposalID).value.votingTs === 0) {
    return // keep/lower, draft direct setter (id 0), or bootstrap proposal
  }
  loggedAssert(next <= this.getBallot(proposalID).votes.approvals, errGuildLockout)
}

// setSettingsForAction gains a proposalID parameter
private setSettingsForAction(type: GuildActionType, settings: GuildProposalSettings, proposalID: uint64): void {
  this.validateSettings(settings)
  const current = this.isUpdateGuildAction(type)
    ? clone(this.updateGuildProposalSettings.value)
    : this.getProposalSettings(type, Bytes(''))      // every non-update configurable type ignores `data`
  this.requireAttainableMinimum(proposalID, current.minimumApprovals, settings.minimumApprovals)
  // ...existing body unchanged...
}

// callers
setProposalSettings(actionType, settings) { this.requireCreatorDraft(); this.setSettingsForAction(actionType, settings, 0) }
// executeProposal, case GuildActionSetProposalSettings:
this.setSettingsForAction(action.actionType, action.settings, proposalID)
// executeProposal, case GuildActionSetConsensusActionSettings (before the write):
this.requireAttainableMinimum(proposalID, this.getConsensusActionSettings(action.code).minimumApprovals, action.settings.minimumApprovals)
```

Import `errGuildLockout` from `./errors`; it already exists as `'errGlko'`.

Why the reads are safe:

- The ballot is still present at execution, because cleanup is blocked until the proposal reaches Executed or Invalid.
- `getBallot` and `getConsensusActionSettings` are existing readonly ABI methods, and the Guild already calls its own ABI methods internally (for example `this.proposalCost` and `this.setupCost`).

### L-1b. Subscription policy: tie voting power to being paid up now, and bound proposer power by the largest offering weight

**File:** `consensus/subscriptions/contract.algo.ts`. New constants go in `core/constants.ts`:

```ts
export const SubscriptionConsensusGlobalStateKeyMaximumWeight = 'max_offering_weight'
export const SubscriptionConsensusBoxKeyOfferingWeights = 'w'          // no clash with o/h/s/b/v
export const SubscriptionWeightSlotMBR: uint64 = 3_200                  // 400 * 8
export const SubscriptionWeightsBoxMBR: uint64 = 2_900                  // 2_500 + 400 * 1-byte key
export const MAX_SUBSCRIPTION_OFFERINGS: uint64 = 64                    // 512-byte slot box, one box read
```

```ts
// state
maximumWeight = GlobalState<uint64>({ initialValue: 0, key: SubscriptionConsensusGlobalStateKeyMaximumWeight })
/** Multiset of live offering weights (8 bytes per slot, 0 = free); bounds the max-weight recalculation. */
offeringWeights = Box<bytes>({ key: SubscriptionConsensusBoxKeyOfferingWeights })

// (Option B, recommended) power needs a subscription paid up *now*, independent of ballot duration
private paidService(account: Account, subscriptionID: uint64): uint64 {
  const sub = abiCall<typeof Subscriptions.prototype.getSubscription>({ /* unchanged */ }).returnValue
  if (!sub.exists || sub.recipient !== Global.currentApplicationAddress || sub.lastPayment === 0 ||
      sub.lastPayment + sub.interval < Global.latestTimestamp) {
    return 0
  }
  return sub.serviceID
}
// subscriberPowerAt: keep the ballot+snapshot existence assert, drop the votingEnd read
const serviceID = this.paidService(account, this.evidenceSubscription(evidence))
// proposalPower(account, evidence, requiredThrough): requiredThrough is now intentionally unused (eslint-disable as in fixed-signers)

// quotes reserve one weight slot per new offering (unused slots are refunded by the existing refundUnused)
private offeringsMbr(count: uint64): uint64 {
  return (this.serviceCost() + SubscriptionOfferingMBR + SubscriptionWeightSlotMBR) * count +
    (this.offeringWeights.exists ? 0 : SubscriptionWeightsBoxMBR)
}

private validateOfferings(offerings: SubscriptionOffering[]): void {
  loggedAssert(
    offerings.length > 0 && this.offeringCount.value + offerings.length <= MAX_SUBSCRIPTION_OFFERINGS,
    errGuildInvalidSubscription,
  )
  // ...existing weight > 0 loop...
}

/** First slot holding `weight`, or the slot count when none does. */
private weightSlot(weight: uint64): uint64 {
  const slots: uint64 = this.offeringWeights.length / 8
  for (let slot: uint64 = 0; slot < slots; slot += 1) {
    ensureBudget(300, OpUpFeeSource.GroupCredit)
    if (op.btoi(this.offeringWeights.extract(slot * 8, 8)) === weight) {
      return slot
    }
  }
  return slots
}

private insertWeight(weight: uint64): void {
  if (!this.offeringWeights.exists) {
    this.offeringWeights.create({ size: 8 })               // zero-filled: slot 0 is free
  }
  const slot = this.weightSlot(0)
  if (slot === this.offeringWeights.length / 8) {
    this.offeringWeights.resize(this.offeringWeights.length + 8)
  }
  this.offeringWeights.replace(slot * 8, op.itob(weight))
  if (weight > this.maximumWeight.value) {
    this.maximumWeight.value = weight
  }
}

private replaceWeight(previous: uint64, next: uint64): void {
  const slot = this.weightSlot(previous)
  loggedAssert(slot < this.offeringWeights.length / 8, errGuildOfferingMissing)
  this.offeringWeights.replace(slot * 8, op.itob(next))
  let maximum: uint64 = 0
  const size = this.offeringWeights.length
  for (let offset: uint64 = 0; offset < size; offset += 8) {
    ensureBudget(300, OpUpFeeSource.GroupCredit)
    const weight = op.btoi(this.offeringWeights.extract(offset, 8))
    if (weight > maximum) maximum = weight
  }
  this.maximumWeight.value = maximum
}

// addOfferings: after the offerings box write
this.insertWeight(offering.weight)
// setOfferingWeight: first line, then re-check settings
this.replaceWeight(this.offerings(serviceID).value.weight, weight)
/* ...existing... */
if (this.activated.value) this.validateGuildSettings()
// removeOffering: before the offerings delete, then re-check settings
this.replaceWeight(offering.weight, 0)
/* ...existing... */
if (this.activated.value) this.validateGuildSettings()

@abimethod({ readonly: true })
validateSettings(settings: GuildProposalSettings): void {
  super.validateSettings(settings)
  loggedAssert(settings.participation === 0, errGuildInvalidSettings)
  if (this.offeringCount.value > 0) {
    loggedAssert(settings.power <= this.maximumWeight.value, errGuildInvalidSettings)
  }
}
```

Notes:

- Weights are tracked as a multiset (slot matched by value). That is enough to compute the maximum, so the offerings box layout does not change.
- `Guild.create` validates the settings while `offeringCount = 0`, so the weight check is skipped there. Activation then re-validates through the existing `validateConfiguration` call to `validateGuildSettings`.
- The RemoveOffering quote (3,200) and the SetOfferingWeight quote (15,700) are unchanged, because they reuse the existing slot.

### L-1c. Locked-token: duration must be shorter than the asset's maximum lockup

**File:** `consensus/locked-token/contract.algo.ts`.

```ts
import { ONE_YEAR } from '../../../../staking/constants'

/** Longest lock universal staking accepts for the voting asset. */
private maximumLockup(): uint64 {
  const settings = abiCall<typeof Staking.prototype.getSettings>({
    appId: this.staking.value,
    args: [[this.votingAsset.value.id]],
  }).returnValue
  return settings[0].exists ? settings[0].value : ONE_YEAR
}

@abimethod({ readonly: true })
validateSettings(settings: GuildProposalSettings): void {
  super.validateSettings(settings)
  // A proposer needs a lock outliving now + duration, and no lock can outlive now + maximumLockup.
  loggedAssert(settings.participation === 0 && settings.duration < this.maximumLockup(), errGuildInvalidSettings)
}

// validateConfiguration (activation): require a usable lockup at all
loggedAssert(this.maximumLockup() > ONE_WEEK, errGuildInvalidStaking)
```

Residual risk, accepted:

- Locked-token per-class `power` (at most 1,000 token-years) is not proven attainable, because a single lock is not enumerable. This should be documented.
- With Option B, subscription per-class `duration` needs no bound.

### ABI, schema and box changes

- **Guild:** no ABI change. `setSettingsForAction` is private.
- **Subscription policy:**
  - No ABI method change.
  - New global uint `max_offering_weight`. The schema stays 8 bytes / 12 uints; the policy uses 7 uints today, 8 after this change.
  - New box `w`.
  - Higher quotes from `configurationMbr` and `consensusActionMbr`: +3,200 per offering, plus 2,900 for the first offering.
  - New cap of 64 offerings.
- **Locked-token:** no ABI change. `validateSettings` now makes an inner call to staking.
- **Mock `tests/mock-staking.algo.ts`:** must add `getSettings(assets: uint64[]): SettingsCheck[]` and `setSettings(asset, value)`. Without them, every locked-token test fails at `Guild.create`, because it calls `validateSettings`.
- **SDK (`projects/akita-sdk/src/guild/index.ts`):**
  - Add `SUBSCRIPTION_WEIGHT_SLOT_MBR = 3_200n`, `SUBSCRIPTION_WEIGHTS_BOX_MBR = 2_900n` and `MAX_SUBSCRIPTION_OFFERINGS = 64n`.
  - Update the docs on `subscriptionVoteEvidence` and `SubscriptionGuildConsensusSDK`: power now means "paid up when proposing or voting".
  - Optionally add a client-side `assertAttainable(settings)` check before `initialize`.
  - The generated clients regenerate. `wallet/plugins/guild.ts` needs no change.
- **Docs:** update `GUILD_ARCHITECTURE.md`: subscription voting window, offering costs, the attainability rules, and the 64-offering cap.

### Regression tests

| Spec | Scenario |
|---|---|
| `tests/subscriptions.e2e.spec.ts` | A 100 s interval offering with a 300 s ballot duration: the proposer subscribes and proposes, voters vote late in the ballot, and the proposal passes. Today this is unproposable. |
| `tests/subscriptions.e2e.spec.ts` | A subscription that lapsed before the vote gives 0 power. |
| `tests/subscriptions.e2e.spec.ts` | Activation rejects `updateGuild.power` above the largest offering weight. |
| `tests/subscriptions.e2e.spec.ts` | `SetOfferingWeight` or `RemoveOffering` that would lower the maximum below an existing class `power` fails execution with `errGuildInvalidSettings`. |
| `tests/subscriptions.e2e.spec.ts` | The 65th offering is rejected. A freed weight slot is reused and the unused slot MBR is refunded, with the treasury balance delta asserted. |
| `tests/locked-token.e2e.spec.ts` | `duration = MAX_GUILD_VOTING_DURATION` is rejected at `newGuild` and through `SetProposalSettings`. |
| `tests/locked-token.e2e.spec.ts` | With mock `setSettings(asset, 30 days)`, a 31-day class duration is rejected. Activation fails when the lockup is at most one week. |
| `tests/consensus-actions.e2e.spec.ts` | A voted `SetProposalSettings` that raises `minimumApprovals` above the ballot's approvals fails with `errGlko`. The same proposal keeping or lowering the value succeeds. Same check for `SetConsensusActionSettings`. Draft setters and bootstrap proposals are unaffected. |

### Decisions for Kyle

1. **Subscription power window.**
   - **B, recommended:** paid up at the moment of proposing or voting. This removes the duration-to-interval coupling, needs the smallest change, and lets members in good standing vote even when their next charge falls inside the ballot. The cost to vote is unchanged: one interval. Unsubscribing early was always possible.
   - **A′:** keep "paid through the ballot end". Store `(weight, interval)` per slot (16 bytes), track the minimum interval, and enforce `settings.duration <= minimumOfferingInterval`. This is stricter, adds more code, and still blocks voters whose payment window ends during the ballot.
2. **Approval-minimum cap scope.**
   - **Recommended:** a generic cap in the Guild (L-1a) for **all** policies. It is consistent with the existing floor rule and needs no consensus ABI change.
   - It does change fixed-signer behaviour. For example, 3 approvals can no longer raise a class minimum to 4.
   - The alternative is a new consensus ABI hook, `validateSettingsChange(proposalID, settings)`, applied only by locked-token and subscription. That means an M-size change across four contracts plus the stub.
3. **Offering cap value:** 64 is recommended. 256 would match fixed signers, but means a 2 KiB box and more opcode budget.

---

## L-2: Push refunds to a closed account revert, and `update()` can be permanently blocked (Low · size S)

**File:** `core/contract.algo.ts`.

```ts
/** A zero-balance account cannot receive less than the base minimum balance. */
private canReceive(receiver: Account, amount: uint64): boolean {
  const [, funded] = op.AcctParams.acctBalance(receiver)
  return funded || amount >= Global.minBalance
}

/**
 * Refund a payer. An account that has since closed and cannot be re-opened by `amount` forfeits it to the
 * treasury; without a wallet it stays in free balance, where sweep() later forwards it.
 */
private refund(receiver: Account, amount: uint64): void {
  if (amount === 0) {
    return
  }
  if (this.canReceive(receiver, amount)) {
    itxn.payment({ receiver, amount, fee: 0 }).submit()
  } else if (this.wallet.hasValue) {
    const treasury = this.treasury()
    if (this.canReceive(treasury, amount)) {
      itxn.payment({ receiver: treasury, amount, fee: 0 }).submit()
    }
  }
}
```

Use `op.AcctParams.acctBalance`, not `Account.balance`. The `funded` flag reads cleanly for a zero-balance account; I am not certain `.balance` compiles without a funded-account assert, and the explicit form avoids the question.

Replace `this.pay(...)` with `this.refund(...)` at every refund site:

| Line | Site |
|---|---|
| 323 | `releaseReserve` (finalize-rejected and cancel) |
| 932 | `deleteProposal` |
| 974 | submit surplus |
| 1052 | cleanup voters |
| 1056 | cleanup remainder |
| 1117 | RemoveExecution funder |
| 1253 | execute refund |
| 1279 | `update()` |

Keep `pay` for `forwardFee` and `sweep`.

Accounting stays consistent:

- Forfeits leave from `reserved` exactly as a refund would.
- Inside `executeProposal`, a forfeited RemoveExecution refund still leaves the Guild, so the `freeAfter + held >= freeBefore` check is unchanged.
- Cleanup pays out the same total as before.

**ABI, schema and SDK:** none. `GUILD_ARCHITECTURE.md` gains a sentence: "refunds owed to a closed account go to the treasury".

### Regression tests

All in `tests/treasury-accounting.e2e.spec.ts` unless noted:

1. A voter votes, then closes their account (payment with `closeRemainderTo`). `cleanupProposal` including that voter succeeds; the other voters are refunded and the treasury grows by 22,500.
2. A proposer with a non-zero execution reserve closes their account, and the proposal is rejected. `finalizeProposal` succeeds and the reserve goes to the treasury.
3. In `tests/guild-actions.e2e.spec.ts`, using the existing UpgradeApp and `mock-guild-update` flow: after the upgrade is approved and executed, the proposer closes their account. The committed `update()` group still succeeds and the 22,100 goes to the treasury.
4. With no wallet (partially initialized guild), a forfeited refund stays in `sweepable()`.

### Decision for Kyle

- **Guarded push with forfeit to the treasury (recommended).** Size S, no new storage. Refunds are each below 0.1 ALGO, and only owners who closed their account forfeit.
- **Pull model.** A per-account claim box and a `claim()` method: no forfeit, but new MBR, a new ABI, SDK and plugin methods, and more state. Size L, not worth it for these amounts.

---

## L-3: A locked-token guild's liveness depends on the voting ASA's creator (Low · size S, staking side / M for an escape hatch)

The root cause is in staking: `staking/contract.algo.ts:707-716`, where `updateSettings` lets the asset creator lower the maximum lockup at any time. L-1c's activation check covers the configuration-time half of the problem. The runtime half needs one of the following.

**Option 1 (recommended): make the maximum lockup non-decreasing in staking.** This is cross-family; coordinate with **DAO-05**, which shares this staking issue.

```ts
// staking/contract.algo.ts, updateSettings
const current: uint64 = this.settings(asset).exists ? this.settings(asset).value : ONE_YEAR
loggedAssert(value >= current, errBadExpirationUpdate)   // or a new errMaxLockupDecrease
this.settings(asset).value = value
```

- Staking is a mainnet contract, so this needs a DAO-governed staking upgrade (see the akita-deploy-scripts `runUpdate` flow). It also changes the rules for every ASA creator, not only guilds.
- With this in place, L-1c's `duration < maximumLockup()` check stays valid for the life of the guild.

**Option 2: a governed locked-token escape hatch.** Add consensus action code 2, `SetVotingSource(staking, asset)`, through `configureLockedToken`, protected by updateGuild-class settings.

- It must also reset `minimumApprovals`, because power units change with the asset. Cap the new floor with `demonstratedApprovals`.
- It only helps while some power remains, at most the remaining lifetime of existing locks.
- Size M. It also adds a powerful electorate-swap action.

**Option 3: documentation only.** State in `GUILD_ARCHITECTURE.md` and the SDK that a locked-token guild trusts the voting ASA's creator. The SDK could warn when the creator is not the DAO or a known-locked address.

**Tests:**

- Option 1: `staking` spec. `updateSettings` that lowers the value reverts; raising it succeeds.
- Option 2: `tests/locked-token.e2e.spec.ts`. After the mock lowers the lockup, a passing `SetVotingSource` proposal restores proposer power.

**Decision for Kyle:** Option 1 plus Option 3 is recommended. Option 2 is optional and I would skip it unless community-token guilds are a priority.

---

## I-1: The RemovePlugin proposer is refunded plugin-box MBR that an earlier proposer funded (Info · size S · fix)

**File:** `core/contract.algo.ts`, function `removePlugin`.

```ts
if (data.caller === Global.zeroAddress && this.plugins({ plugin: data.plugin, escrow: data.escrow }).exists) {
  this.plugins({ plugin: data.plugin, escrow: data.escrow }).delete()
  // The released storage was funded when the plugin was installed, not by this proposal.
  this.forwardFee(this.pluginMbr(data.escrow))
}
```

- `data.escrow` is the canonical box key, so `pluginMbr(data.escrow)` exactly equals the freed MBR.
- RemovePlugin requires a wallet, so `forwardFee` always pays.
- The net free balance during execution is 0, so the reserve check is unaffected.
- No ABI change.

**Depends on:** L-2 only if `forwardFee` is changed to the guarded `refund`. It does not need to be, because the treasury is always fundable.

**Test:** `tests/real-wallet.e2e.spec.ts`, in the existing plugin-removal scenario. Assert that the RemovePlugin proposer's refund excludes the 26,900 + 400×len(escrow), and that the treasury balance grows by that amount.

## I-2: SetPluginSettings after RemovePlugin re-creates an orphan settings box (Info · size S · fix)

**File:** `core/contract.algo.ts`, `executeProposal`, case `GuildActionSetPluginSettings`.

```ts
case GuildActionSetPluginSettings: {
  const action = decodeArc4<GuildProposalSetPluginSettings>(data)
  loggedAssert(this.plugins({ plugin: action.plugin, escrow: action.escrow }).exists, errGuildInvalidAction)
  this.plugins({ plugin: action.plugin, escrow: action.escrow }).value = clone(action.settings)
  break
}
```

No ABI change.

**Test:** `tests/guild-actions.e2e.spec.ts`. A proposal `[RemovePlugin(P, ''), SetPluginSettings(P, '', s)]` is approved; `executeProposal` reverts with `errGacn` and the plugin box stays absent. The reverse order succeeds.

## I-3: Anyone can execute a creator's bootstrap proposals during draft (Info · size S · fix)

**File:** `core/contract.algo.ts`, `executeProposal`.

```ts
// Creator-approved bootstrap proposals expire the moment creator control ends, and only the creator runs them.
if (proposal.votingTs === 0) {
  this.requireCreatorDraft()   // asserts state === Draft (errGuildDraftOnly) and Txn.sender === creator (errGuildCreatorOnly)
}
```

- No ABI change.
- The test helper `executeProposal` uses the guild client's default sender, which is the creator in `mintGuild`, so existing tests should stay green.
- The plugin route sends as the creator's spending account, which matches when the creator minted through the plugin.

**Test:** `tests/guild-invariants.e2e.spec.ts`. A non-creator executing a bootstrap proposal reverts with `errGcrt`; the creator succeeds.

**Decision for Kyle:** confirm that bootstrap execution should be creator-only. Recommended, since only the creator can create and delete those proposals anyway.

## I-4: NewWallet is not checked against an existing wallet before execution, and ChangeAdmin can leave a FullyInitialized guild without a wallet (Info · won't fix)

**Reason:**

- A correct validation-time check has to allow `[ChangeAdmin, NewWallet]` in one proposal. That means ordering-aware state across `validateEachAction`, and it still cannot rule out a race with another NewWallet that executes first.
- `cancelProposal` already recovers the reserve of an unexecutable NewWallet proposal.
- FullyInitialized without a wallet is a documented consequence of ChangeAdmin and is repaired by a NewWallet proposal.

**Action:** add one sentence to `GUILD_ARCHITECTURE.md` (Treasury wallet section) and to the SDK `newWalletAction` docstring.

---

## Dependencies and cross-family notes

- **The L-1c mock is a prerequisite.** `MockGuildStaking.getSettings` must land with L-1c, or every locked-token test breaks at `Guild.create`.
- **L-1c and L-3 are linked, and L-3 is linked to DAO-05.** L-1c reads staking's maximum lockup at validation time. Only L-3 Option 1, the staking change shared with DAO-05, keeps that reading true afterwards. Ship L-3 Option 1 together with DAO-05's staking change, in one DAO-governed staking upgrade.
- **L-1a must reach the ballot.** It relies on the approving ballot surviving until execution, which today's cleanup gating already guarantees. Do not relax that gating.
- **L-2 is shared with the DAO family.** The DAO's vote-receipt and deleted-proposal refunds use the same push pattern. If the DAO reviewer reports the closed-account revert, reuse the same `canReceive`/`refund` helper shape there for consistency.
- **L-1b changes are consensus-program changes, so new programs must be registered.** Consensus names are immutable: plan a fresh consensus factory, or `-v2` names, for testnet. Mainnet is not deployed, so the fresh factory is simplest.
- **Suggested implementation order:**
  1. L-2 (S)
  2. I-2 and I-3 (S)
  3. I-1 (S)
  4. L-1a (S/M)
  5. L-1c with the mock (S)
  6. L-1b (M)
  7. L-3 Option 1 together with DAO-05
  8. Docs, SDK constants, `npm run build`, SDK dist rebuild, then the full `npm test`.
