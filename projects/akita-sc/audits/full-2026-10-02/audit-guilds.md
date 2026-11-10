# Guilds security review (2026-10-02)

Reviewer scope (current working tree, read-only):

- `projects/akita-sc/smart_contracts/arc58/guilds/core/{contract.algo.ts,constants.ts,types.ts}`
- `guilds/factory/{contract.algo.ts,registry.algo.ts,stubs.ts,constants.ts}`, `guilds/consensus/factory.algo.ts`, `guilds/interfaces.ts`
- `guilds/consensus/base.ts`, `consensus/fixed-signers`, `consensus/locked-token`, `consensus/subscriptions`
- `arc58/plugins/guild/contract.algo.ts`
- Cross-checked dependencies: `arc58/account/{contract,factory}.algo.ts` (admin, MBR and refund flows), `subscriptions/contract.algo.ts` (service/subscription lifecycle), `staking/contract.algo.ts` (lock rules), `utils/functions.ts` (`sendReferralPayment`).

Settled design items from the 2026-08 and 2026-09-29 audits were not re-reported.

**Result: no Critical, High, or Medium issues found.** The 2026-09-29 remediation code holds up: NewWallet, subscription-owned services with epoch snapshots, demonstratedApprovals floors, votingUnit, SetPluginSettings, cancelProposal/Invalid, and the execute reserve limit. The findings below are Low or Info. They cover liveness and lockout hazards and small MBR attribution mismatches. None lets an outsider drain funds or manipulate a vote.

---

## Findings

### L-1: Subscription and locked-token policies never check that proposal settings can be met. A guild can be bricked permanently, treasury included.

- **Severity:** Low (permanent governance freeze; needs creator misconfiguration or an approved proposal; no attacker profit)
- **Confidence:** Confirmed
- **Locations:**
  - `guilds/core/contract.algo.ts:859-861`, `876`, `903`, `942-945`: proposer power is evaluated with `requiredThrough = Global.latestTimestamp + cost.duration`.
  - `guilds/consensus/subscriptions/contract.algo.ts:193-207`: `paidService` returns 0 when `sub.lastPayment + sub.interval < requiredThrough`.
  - `subscriptions/contract.algo.ts:321-325`: `validateSettings` only enforces `participation === 0`.
  - `subscriptions/contract.algo.ts:228-231`: `validateConfiguration` at activation.
  - `guilds/consensus/locked-token/contract.algo.ts:84-95` (`expiration <= requiredThrough` gives 0) and `159-163` (`validateSettings`).
  - `guilds/consensus/base.ts:123-132`: no upper bound on `minimumApprovals`.
  - For contrast, fixed signers do bound settings by attainable power: `fixed-signers/contract.algo.ts:442-449`.

**Description.** In the subscription policy, a proposer needs a subscription paid through `now + duration`. `lastPayment` is never later than `now`, and a subscription is only "paid" for one `interval` after its last payment. So any action class whose `duration` is longer than the longest offering `interval` can never be proposed. That holds even if the proposer subscribes in the same group, because `lastPayment = now` and `now + interval < now + duration`.

Several other settings can also make a class unreachable:

- `power` above the largest offering weight.
- `minimumApprovals` far above what subscribers can supply. The `demonstratedApprovals` cap only limits the policy floor (`SetMinimumApprovals`), not per-class `minimumApprovals`.

Neither activation (`validateGuildSettings`) nor governed `SetProposalSettings`, `SetConsensusActionSettings` or `SetPluginSettings` checks any of this. Offering intervals are immutable, and `AddOfferings`, `SetProposalSettings` and `SetConsensusActionSettings` all default to the updateGuild class. If updateGuild is the class affected, nothing can repair it, and wallet administration is frozen with it.

The locked-token policy has the same gap. `MAX_GUILD_VOTING_DURATION` (31,536,000) equals staking `ONE_YEAR`, so a class with the maximum duration needs `expiration > now + 1y`. Staking rejects that (`staking/contract.algo.ts:376-384`). Per-class `power` and `minimumApprovals` are also unbounded. The approval floor was given lockout protection in the remediation; per-class settings were not.

**Scenario.** A creator configures weekly offerings (`interval = 604,800`) and a 14-day `updateGuild.duration`. Activation passes. From then on no one can create an updateGuild-class proposal, so settings, offerings and `SetConsensusActionSettings` can never change. Other classes stay usable only if their own durations happen to be shorter.

A governance variant: an approved `RemoveOffering` removes the only long-interval offering, or `SetProposalSettings` sets `updateGuild.minimumApprovals` to 2^63. Either locks the guild out for good.

**Suggested fix.** Mirror the fixed-signer attainability check:

- Subscription `validateSettings` (and the AddOfferings, SetOfferingWeight and RemoveOffering paths, which should re-validate the Guild settings as fixed-signer removal does): require `settings.duration <= max offering interval` and `settings.power <= max offering weight`.
- Locked-token `validateSettings`: require `settings.duration < max lockup - ONE_WEEK`.
- Optionally cap `settings.minimumApprovals`. For locked-token and subscription, cap it at the policy floor plus the approvals the applying ballot demonstrated, the same way the floor is capped. At minimum, document the constraint and check it in the SDK before activation.

---

### L-2: Refund payments to a closed (zero-balance) account revert. One of the affected paths, `update()`, cannot be worked around.

- **Severity:** Low (liveness)
- **Confidence:** Confirmed (AVM rejects a payment that leaves the receiver between 0 and its minimum balance)
- **Locations:** `guilds/core/contract.algo.ts`:
  - `316-325` (`releaseReserve`, called from `finalizeProposal:1023` on rejection and from `cancelProposal:1073`)
  - `1052` (cleanup: `pay(voters[i], GuildVoteMBR)`)
  - `1056` (cleanup remainder to the creator)
  - `1117` (RemoveExecution: `pay(funder, GuildExecutionMBR)`)
  - `1253` (execute refund to the creator)
  - `1279` (`update()`: `pay(proposal.creator, GuildExecutionMBR)`)

**Description.** Every refund is a push payment to an account that may since have closed (balance 0, for example via `closeRemainderTo`). Several of these amounts are below the 100,000 µALGO minimum balance: 22,500 for a vote, 22,100 for an execution box, and small execution reserves. A payment like that to a zero-balance account fails, and the whole call fails with it.

Effects:

- **(a)** `finalizeProposal` on a rejected proposal with `0 < held < 0.1 ALGO` reverts. The proposal stays in Voting and its ballot can never be cleaned up, so every voter's 22,500 receipt is stuck.
- **(b)** `executeProposal` with a non-zero refund reverts.
- **(c)** `cleanupProposalConsensus` reverts for any closed voter. Leaving that voter off the list keeps the ballot alive forever.
- **(d)** A RemoveExecution that revokes a Guild-local upgrade key reverts once the upgrade proposer's account is closed.
- **(e)** `update()` runs inside the voted, hash-committed group, which cannot gain a top-up transaction. If the UpgradeApp proposer's account is closed, the approved self-upgrade can never be applied.

Paths (a) to (d) can be unblocked by any caller who pays the closed account at least 0.1 ALGO earlier in the same group. Path (e) cannot.

**Scenario.** A voter votes, then closes their account to an exchange. Every cleanup that includes them reverts. Separately, an UpgradeApp proposer closes their account after approval: the committed upgrade group then always fails.

**Suggested fix.** Before each sub-minimum push refund, check `receiver.balance === 0 && amount < Global.minBalance`. In that case send the amount to the treasury instead (or keep it as sweepable), so the call never reverts. Alternatively, switch these refunds to a pull model.

---

### L-3: A locked-token guild's liveness depends on the voting ASA's creator

- **Severity:** Low (external trust dependency; permanent freeze)
- **Confidence:** Confirmed
- **Locations:**
  - `staking/contract.algo.ts:376-384` (max lockup taken from `settings(asset)`) and `707-716` (`updateSettings`, sender must be `Asset(asset).creator`)
  - `guilds/consensus/locked-token/contract.algo.ts:84-95`
  - `staking`/`asset` cannot change after activation (`configure` is reachable only through `configureConsensus`, which is draft-only)

**Description.** The creator of the voting asset can lower that asset's maximum lock duration in universal staking at any time. Once it is below `ONE_WEEK`, or below a class's duration, new or extended locks earn 0 power (`remainingTime < ONE_WEEK`, or `expiration <= requiredThrough`). When existing locks run out (within a year at most), the guild can never pass another proposal. The staking app and asset cannot be re-pointed after activation.

**Scenario.** A community guild governed by a third-party ASA. The ASA creator, or whoever holds a rekey of the creator account, calls `updateSettings(asset, 1)`. Within at most a year all power has decayed and the treasury is frozen.

**Suggested fix.** At minimum, document this dependency. Options:

- Add a governed locked-token consensus action that re-points `staking`/`asset`, protected by `demonstratedApprovals`.
- Or require at configuration time that the asset's staking setting is absent or at least `MAX_GUILD_VOTING_DURATION + ONE_WEEK`, and warn in the SDK.

---

### I-1: A RemovePlugin proposer receives plugin-box MBR that an earlier proposer paid

- **Severity:** Info
- **Confidence:** Confirmed
- **Locations:** `guilds/core/contract.algo.ts:722-724` (box delete) and `1242-1253` (refund = `freeAfter - baseline`)

The execute settlement refunds every free-balance increase to the executing proposer. RemovePlugin frees the 26,900 µALGO + 400 × len(escrow) plugin-settings box. The AddPlugin proposer funded that box (or the creator did, during bootstrap). This contrasts with RemoveExecution, which explicitly pays the original funder. The amounts are small and the attacker cannot profit, because proposal fees and ballot MBR cost more.

**Suggested fix.** Exclude released plugin-box MBR from the refund, so it becomes sweepable to the treasury, or record and pay the original funder.

### I-2: SetPluginSettings after RemovePlugin in the same proposal re-creates an orphan plugin-settings box

- **Severity:** Info (per-plugin ExecutePlugin settings are advisory: settled design)
- **Locations:** `guilds/core/contract.algo.ts:502-505` (existence checked only in the pre-execution `validateEachAction`) and `1138-1141` (unconditional write)

In a proposal `[RemovePlugin(P,''), SetPluginSettings(P,'',s)]`, both actions are validated before either executes. The removal then deletes the box and the settings write re-creates it. The MBR nets to zero, so the reserve check passes. The result is a settings box for a plugin that is no longer installed, so ExecutePlugin proposals naming it stay valid.

**Suggested fix.** In the `SetPluginSettings` execute branch, assert `this.plugins(key).exists` again.

### I-3: Anyone can execute a creator's pending bootstrap proposals during draft

- **Severity:** Info
- **Locations:** `guilds/core/contract.algo.ts:1077-1085`

`executeProposal` has no sender check, and bootstrap proposals are Approved the moment they are created. Anyone can therefore force-execute a bootstrap proposal the creator meant to delete (`deleteProposal`). The only cost is creator-funded balance, and the creator can reverse the effect while still in draft.

**Suggested fix.** Require `Txn.sender === creator` when `votingTs === 0`.

### I-4: NewWallet does not check `!wallet.hasValue` at validation time, and ChangeAdmin can leave a FullyInitialized guild without a wallet

- **Severity:** Info
- **Locations:** `guilds/core/contract.algo.ts:456-507` (no check), `742-743` (checked only at execution), `1217-1225`

A NewWallet proposal can be approved while a wallet already exists. It then cannot be executed, and the proposer must cancel it. Separately, after ChangeAdmin the state remains `FullyInitialized` with no wallet, so `sweep` and wallet actions fail until a NewWallet passes. Both are recoverable.

---

## Checked and OK

- **Proposal lifecycle:**
  - Draft edits and submission are proposer-only; status gates hold on submit, vote, finalize, execute, cancel and cleanup.
  - Bootstrap proposals expire on activation and cannot carry UpgradeApp or ExecutePlugin.
  - Proposal IDs are never reused, and ballots cannot be re-opened (`!ballots.exists`).
- **Double voting:**
  - The vote key `{proposalID, voter = Txn.sender}` is enforced in the consensus app.
  - A resolved or partly cleaned ballot rejects new votes.
  - A cleanup voter list with duplicates fails on the missing box.
- **Fixed signers:**
  - Epoch snapshot plus member history gives non-overlapping per-account intervals.
  - Removal and re-add cannot raise power on an old ballot.
  - Mode is snapshotted, and threshold and settings are re-validated on removal, reweight and mode change.
  - Slot scanning and max recalculation are bounded at 256 (2 KiB, `ensureBudget`).
  - MBR quotes match box sizes: member and history 25,300; snapshot 9,700; slot 3,200; base 2,900. The slot refund is computed from the `minBalance` delta.
- **Locked-token:**
  - Each voter's lock must outlive `votingEnd`, and locks cannot be withdrawn early (`staking:524`).
  - `votingUnit = 10^decimals` with decimals ≤ 19.
  - 128-bit math (`mulw`/`divmodw`); the floor is capped by `demonstratedApprovals` after activation.
- **Subscription:**
  - Recipient must be the policy app, and only it can create services under its address.
  - Donation subscriptions (serviceID 0) carry zero weight.
  - Services are ungated, have no passes, and are never paused or blocked.
  - Weights are epoch-versioned with history, and each ballot keeps a snapshot.
  - The last offering cannot be removed.
  - `refundUnused` math is correct, including the serviceslist overpayment on the first service.
  - MBR quotes match: offering 12,500; history 15,700; snapshot 9,300.
- **demonstratedApprovals:** the ballot must exist and be resolved and approved. Cleanup cannot run before execution or cancellation, so the ballot is still there when it is read.
- **Reserve accounting:**
  - `reserved` stays at or below free balance on every path checked: new, edit, editWithPayment, delete (draft and bootstrap), submit, finalize, cancel, execute, configureConsensus, vote pass-through, cleanup and sweep.
  - `proposalMbr` equals the real box MBR (44,900 + 400 × Σ(7 + len), with CID = 36 bytes).
  - Execution box 22,100, plugin box 26,900 + 400 × len, and consensus-action box 25,300 all match.
  - A voted execution cannot spend beyond `held` (`freeAfter + held >= freeBefore`). Its refund equals `held - spent`, independent of other balance.
  - No path receives outside funds during execute.
- **Fees:** every Guild and policy inner txn uses `fee: 0`; unspecified fees default to 0 in Puya. The guild account never pays fees.
- **Grouped payment validation:** `match` checks sender, receiver and amount. Close and rekey fields on the caller's own payment only affect the caller.
- **Reentrancy:** AVM blocks re-entry. Cross-app reads during execute see the updated Guild state, and each policy re-validates its actions inside `applyConsensusAction`.
- **Wallet flows:** the wallet pays and refunds MBR only to its controlled address, never to the Guild. Reclaim goes to the controlled address. `validateWallet` requires the Guild as admin. NewWallet uses the DAO app-list factory, and `cost()` and `newAccount` agree because the Guild has no referrer.
- **Upgrade:**
  - Draft `update` is allowed only from the creator factory; the factory checks the draft creator.
  - Active `update` requires the lease, an Executed proposal, the action index, the app ID, the round window and the group ID; it consumes the key.
  - Consensus apps cannot be updated.
- **Factories and registry:**
  - Consensus binding happens atomically inside `newGuild`.
  - The `bindGuild` alternate branch only affects orphan or attacker-owned pairs.
  - Upload ordering (init + contiguous loads) cannot overwrite an existing program.
  - Permissionless consensus names are documented design.
- **Guild plugin:** the guild is bound and its factory provenance re-checked on every call. Spending goes through `getSpendingAccount`, and the rekey is on the last inner txn.
- **Integer overflow:** vote totals are guarded (`power <= MAX - turnout`) and ratios use `mulw`. Other additions panic rather than wrap; only governance-supplied extremes reach them.
- **Loops:** none are unbounded. Action counts are capped at 12, member slots at 256, and cleanup and voter lists are chosen by the caller.
