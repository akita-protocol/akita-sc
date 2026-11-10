# GUILD slice: production-readiness review (2026-10-05)

Verdict: **ISSUES** (no Critical or High; 1 Medium, 3 Low, plus rollout blockers on MainNet dependencies).

All paths are relative to `projects/akita-sc/smart_contracts/` unless stated otherwise.

## Scope

Read in full (current working tree, read-only):

| File | Lines |
|---|---|
| `arc58/guilds/core/contract.algo.ts` | 1,518 |
| `arc58/guilds/core/types.ts`, `constants.ts`, `errors.ts` | 269 / 158 / 64 |
| `arc58/guilds/consensus/base.ts` | 351 |
| `arc58/guilds/consensus/fixed-signers/contract.algo.ts` + `constants.ts` | 578 / 14 |
| `arc58/guilds/consensus/locked-token/contract.algo.ts` + `constants.ts` | 278 / 9 |
| `arc58/guilds/consensus/subscriptions/contract.algo.ts` + `constants.ts` | 549 / 12 |
| `arc58/guilds/consensus/factory.algo.ts` | 70 |
| `arc58/guilds/factory/contract.algo.ts`, `registry.algo.ts`, `stubs.ts`, `constants.ts`, `errors.ts` | 168 / 117 / 72 / 16 / 16 |
| `arc58/guilds/interfaces.ts` | 49 |
| `arc58/plugins/guild/contract.algo.ts`, `errors.ts` | 418 / 1 |
| `arc58/guilds/tests/mock-subscriptions.algo.ts` (to judge test realism) | 157 |

Cross-checked: `arc58/account/contract.algo.ts` (MBR helpers, admin guards, `arc58_*` methods the Guild calls, `newEscrow`, execution keys), `arc58/account/factory.algo.ts` (`newAccount`, `cost`, `updateWallet`), `subscriptions/contract.algo.ts` (`createSubscription`, `newService*`, `shutdownService`, `getSubscription`), `staking/contract.algo.ts` (lock keying, `updateSettings` G-5), `utils/base-contracts/upgradeable.ts`, compiled TEAL for Guild / consensus / factories, `scripts/deploy-guild-factory.ts`, `scripts/lib/guild-programs.ts`.

MainNet reads (public algod, read-only): wallet factory 3569556257, DAO 3569556034, staking 3642366153, subscriptions 3569556497.

Pure unit test run: `npx vitest run smart_contracts/subscriptions/guild-consensus-abi.test.ts`: 5/5 passed. No e2e was run (LocalNet is shared).

## Prior-finding verification (audit-guilds.md / fix-guilds.md, 2026-10-02)

| ID | Status | Evidence |
|---|---|---|
| L-1a: voted raise of `minimumApprovals` capped by the ballot's approvals | Fixed | `core/contract.algo.ts:513-518` (`requireAttainableMinimum`), called at `:684` (SetProposalSettings and the draft setter with id 0) and `:1288-1292` (SetConsensusActionSettings). The ballot still exists at execute, because cleanup requires Executed/Rejected/Invalid (`:1116-1121`). |
| L-1b: subscription power = paid up now; proposer power ≤ max offering weight; 64-offering cap | Fixed (class settings only) | `consensus/subscriptions/contract.algo.ts:253-267` (`paidService` uses `latestTimestamp`), `:389-397` (power ≤ `maximumWeight`), `:300-308` (cap of 64), weight multiset at `:141-182`, re-validation on SetOfferingWeight and RemoveOffering at `:365` and `:384`. **Gap:** re-validation covers only the 9 class settings, not per-code or per-plugin settings. See GUILD-2. |
| L-1c: locked-token duration < max lockup; activation needs lockup > 1 week | Fixed | `consensus/locked-token/contract.algo.ts:112-119`, `:171-176`, `:133` |
| L-2: refunds to closed accounts | Fixed | `core/contract.algo.ts:302-325` (`canReceive`/`refund`). Used at every refund site: `:349`, `:877`, `:1011`, `:1053`, `:1131`, `:1135`, `:1196`, `:1339`, `:1365`. `pay` is kept only for `forwardFee`/`sweep`. |
| L-3: locked-token liveness depends on the ASA creator | Fixed in code, **not live** | `staking/contract.algo.ts:725-747`: the max lockup is non-decreasing within [2w, 4y], and AKTA/BONES are DAO-only. MainNet staking 3642366153 does **not** contain `errLkdc`, so G-5 is not deployed. See Rollout. |
| I-1: RemovePlugin proposer refunded plugin MBR funded by others | Fixed | `core/contract.algo.ts:798-802` forwards the released MBR to the treasury. |
| I-2: SetPluginSettings after RemovePlugin re-creates an orphan box | Fixed | `core/contract.algo.ts:1219-1220` |
| I-3: anyone executes bootstrap proposals | Fixed | `core/contract.algo.ts:1162-1164` |
| I-4: NewWallet vs an existing wallet; FullyInitialized without a wallet | Won't fix (unchanged, documented) | `cancelProposal` (`:1146-1153`) still recovers. |

## New findings

### GUILD-1 (Medium): the Guild treasury wallet is created with `automaticUpdates = true`, so anyone can push DAO-registered wallet code into it and the Guild can never opt out

- **Location:** `arc58/guilds/core/contract.algo.ts:826-841` (the `true` argument at `:836`) and `:1296-1302` (the UpdateWallet action). Related: `arc58/account/factory.algo.ts:337-350` (`if (!automatic)` admin check at `:347`) and `arc58/account/contract.algo.ts:853` (wallet update accepts the factory) and `:938` (`setFactoryUpdateSettings`, admin-only).
- **Scenario:**
  1. `createWallet` calls `newAccount(..., automaticUpdates = true, ...)`, which sets `update_settings = {allowed: true, automatic: true}`.
  2. `AbstractedAccountFactory.updateWallet` checks the admin only when `!automatic`. So **any account** can call `walletFactory.updateWallet(guildTreasury)` and install whatever wallet program the AkitaDAO has registered in the factory.
  3. Updates are therefore controlled by AKTA governance, not by the Guild's members. The Guild's `UpdateWallet` action, gated by the strongest class (`upgradeAppProposalSettings`), is effectively bypassed.
  4. The Guild has no action that reaches `setFactoryUpdateSettings`, so it can never switch to `automatic = false`.
  5. Consequences:
     - Every Guild treasury is in scope of any future DAO-pushed wallet program, including the sunset flow in audit C-2 ("push sunset code to any auto-update wallet").
     - A wallet ABI change (as happened with `arc58_addPlugin`'s `MethodRestriction` shape) can be forced onto a Guild treasury at any time. It then breaks the Guild's admin calls until the Guild passes an UpgradeApp proposal.
- **Why it matters:** a Guild is a DAO-like treasury whose members may not hold AKTA. A trust escalation it cannot refuse defeats the purpose of guild-governed `UpdateWallet`.
- **Suggested fix:**
  - Pass `false` for `automaticUpdates` in `createWallet`. `updateWallet` then requires `Txn.sender == admin == Guild`, which only the UpdateWallet action satisfies.
  - Optionally add a governed action (upgradeApp class) that calls `setFactoryUpdateSettings`.
  - Test: a stranger calling `factory.updateWallet(guildWallet)` reverts with `errAdminOnly`, and the UpdateWallet action still succeeds (`real-wallet.e2e.spec.ts:365`).

### GUILD-2 (Low): shrinking the electorate re-validates only the 9 class settings; per-code consensus-action settings and per-plugin settings can be pushed out of reach

- **Location:**
  - Re-validation reads only the 9 class keys: `arc58/guilds/consensus/base.ts:102-114`. It is called from `fixed-signers/contract.algo.ts:398, 410, 421` and `subscriptions/contract.algo.ts:365, 384`.
  - Not covered: `consensusActions(code)` boxes (`core/contract.algo.ts:215`, `:893-897`, `:1285-1294`), which are used by `getProposalSettings` at `:477-479`.
  - Not covered: `plugins(key)` boxes (`:209`, `:730-737`, `:1217-1222`). SetPluginSettings is also not re-validated at execution (`:1217-1222`), unlike SetProposalSettings (`:683`) and SetConsensusActionSettings (`:1287`).
- **Scenario (fixed signers, Equal mode):**
  1. The guild has 5 members, threshold 3.
  2. The creator sets code 1 (AddMembers) to `minimumApprovals = 5` (unanimity to add members).
  3. A RemoveMember action (code 2, default settings) passes 3-of-5. `validateMemberRemoval` checks only the threshold, and `validateGuildSettings` checks only the 9 classes.
  4. Now only 4 members exist. Every AddMembers proposal needs 5 approvals and fails.
  5. SetConsensusActionSettings for code 1 needs `strongerSettings(updateGuild, code1)` (`:493-496`), which is also 5 approvals, so it also fails.
- **Recovery:** possible only through other codes, for example SetWeightMode → Assigned and then SetMemberWeight to raise total power. That is impossible if those codes are also out of reach.
- **Subscription variant:** a code's `power` above the new `maximumWeight` after RemoveOffering or SetOfferingWeight.
- **Plugin variant:** a plugin's ExecutePlugin settings become unattainable. That plugin is then dead if the plugin set is locked.
- **Suggested fix:**
  - In each policy's `validateGuildSettings`, also validate settings for the policy's own codes. The Guild can expose `getConsensusActionSettings(code)`, and the policy knows its code range.
  - Re-validate SetPluginSettings at execution.
  - Alternatively, apply the same rule as `requireAttainableMinimum` to these boxes.
- **Test:** a fixed-signers guild with code-1 `minimumApprovals = memberCount`. An approved RemoveMember should either fail or leave code 1 attainable.

### GUILD-3 (Low): anyone can squat the official consensus program names before the deploy script uploads them

- **Location:**
  - `arc58/guilds/consensus/factory.algo.ts:27-33`: permissionless `initProgram`, with immutable names (`!this.programs(name).exists`).
  - `scripts/deploy-guild-factory.ts:101-107`: the factory is created and funded first, then `fixed-signers`, `locked-token` and `subscription` are uploaded in three later, separate groups.
- **Scenario:**
  1. An observer watches for the deployer's app creation.
  2. Before the deployer's upload lands, the observer calls `initProgram(pay, "fixed-signers", n)` with a valid program and its loads.
  3. The deployer's `uploadGuildProgram` then reverts (`errGuildFactoryProgramExists`). The name is permanently taken in that factory, and the factory must be redeployed.
  4. The attacker can repeat this on every redeploy, which is a deployment DoS. The same applies to any future `-v2` name.
  5. If a deploy run ever ignored the error and published the factory ID, SDK users who pick the official name would get the attacker's consensus program. The consensus has full control of the paired Guild's treasury.
- **Suggested fix:**
  - Restrict `initProgram` to the creator or DAO wallet for a reserved name list (or require `Txn.sender === Global.creatorAddress` until a one-time `openRegistry()`).
  - Alternatively, have the SDK verify each consensus program's hash before minting.

### GUILD-4 (Low): an approved proposal that becomes unexecutable can be cleared only by its proposer, which locks every voter's receipt

- **Location:** `arc58/guilds/core/contract.algo.ts:1146-1153` (cancel is proposer-only) and `:1113-1121` (cleanup only for Rejected/Executed/Invalid).
- **Scenario:**
  1. A proposal passes, then becomes unexecutable. Ordinary examples:
     - NewWallet while a wallet exists.
     - A RemoveMember for a member already removed.
     - An AddOfferings whose `serviceCost` rose above `held`, so the reserve assert at `:1331` fails.
     - A plugin removed before ExecutePlugin.
  2. Only the proposer can move it to Invalid.
  3. A hostile, absent or key-lost proposer never cancels.
  4. Every voter's 22,500 µALGO receipt and the ballot and snapshot MBR stay in the consensus app forever. The proposer's own reserve also stays in `reserved`.
  5. This is bounded griefing, about 0.0225 ALGO per voter. It is not theft.
- **Suggested fix:** allow anyone to invalidate an Approved, voted proposal whose `validateEachAction` currently fails, or one whose approval is older than N seconds. Refund the reserve to the proposer as `cancelProposal` does.

## Suspicions / Info (not exploitable as built, or settled design)

- **Approved proposals target "the current wallet", never a specific one.** After `ChangeAdmin` and then `NewWallet`, any old Approved-but-unexecuted wallet action (AddPlugin, AddAllowances, ExecutePlugin, Reclaim) runs against the successor treasury. There is no veto, because approved proposals never expire. This was settled by Kyle (no expiry). It is noted because a treasury migration does not escape a captured-vote proposal.
- **`validateOfferings` does not mirror the Subscriptions constraints.** `subscriptions/contract.algo.ts:300-308` does not check `amount ≥ 3`, `interval ≥ 60` or `title ≤ MAX_TITLE_LENGTH`, so such offerings pass the vote and revert at execution. Cancel recovers the reserve.
- **The DAO's revocation app can call `arc58_removePlugin`, `removeNamedPlugin` and `removeAllowances` on Guild treasuries.** This follows from the wallet's `_requireAdminOrRevoke`; the Guild-local plugin box is left orphaned (harmless). It is wallet-wide design.
- **No Guild actions exist for `arc58_optInEscrow` (escrow asset opt-ins), `setBio` or `setFactoryUpdateSettings`.** This is a feature gap.
- **The Guild treasury wallet is created via `newAccount` with no legacy EscrowFactory registration.** Until the Phase 2/3 principal-resolution proposals run on MainNet, any legacy plugin that resolves origin through the registry treats the treasury as unregistered.
- **The Guild plugin trusts any consensus program the factory accepted.** `requireGuild` checks only factory provenance (`plugins/guild/contract.algo.ts:49-52`). A Guild minted from the official factory with an attacker-registered consensus name looks official. The SDK should allowlist consensus program hashes (this is part of the GUILD-3 fix).
- **`approval = 0` with `minimumApprovals = N` passes regardless of rejections, and `approval = 100%` gives any single voter a veto.** These are configuration hazards to document in the SDK.

## Upgrade / rollout notes (MainNet, checked 2026-10-05)

1. **Wallet factory first.** The Guild calls `newAccount(...,bool,...)` (selector `0xe0d189b8`, `Guild.approval.teal:9363`). MainNet factory 3569556257 does **not** contain it. Every NewWallet or `setup` would revert.
   - The factory's boxed wallet program must also be the tree version. The Guild calls `arc58_addPlugin` with `MethodRestriction = (byte[4],uint64)`, but MainNet wallets expose `(byte[4],uint64,uint64)`.
   - Follow K2 lockstep: factory upgrade and new wallet program, then Guild factories.
2. **Subscriptions upgrade first for subscription-policy guilds.** MainNet subscriptions 3569556497 lacks hinted `newService(...,uint64)` and `newServiceCost(uint64,uint64)`. Only the legacy selectors are present. `configurationMbr` and `configure` would revert.
3. **Staking G-5 first for locked-token guilds.** MainNet staking 3642366153 lacks `errLkdc` (non-decreasing max lockup). Until it is upgraded, L-3 (the ASA creator can freeze a locked-token guild) is still live. The `getInfo`, `getTotals` and `getSettings` selectors are already present.
4. **DAO `guild_fees`.** MainNet DAO 3569556034 has no `guild_fees` key, so `GuildFactory.newGuild` reverts with `errGuildFactoryGuildFeesUnset` until the upgraded DAO sets it. Schema room exists (59 bytes). The DAO validator must accept the field.
5. **Consensus programs and consensus apps are immutable** (no update route in the TEAL). Fix GUILD-2 and GUILD-3 before the first MainNet consensus upload, or plan `-v2` names.
6. **Deploy script.** Close the squatting window (GUILD-3) and verify the uploaded program hashes after upload.

## Test gaps

- **No test with the real Subscriptions contract.** All subscription-policy specs use `MockGuildSubscriptions`, which charges a flat 20,000 and skips `assertBoundPayment`, `verifyServiceActivation`, the DAO `serviceCreationFee`, title limits and the first-service `serviceslist` MBR. Only a static selector and arg-count unit test exists. Missing: one e2e that configures, subscribes, votes and runs AddOfferings/RemoveOffering against the real `Subscriptions`.
- **No locked-token test with the real Staking contract** (mock only). Missing: an e2e that locks via `stakeAsa`, votes, and fails `updateSettings` decrease against the policy.
- **No test that a non-admin cannot push a wallet update into a Guild treasury** (GUILD-1).
- **No test of per-code consensus-action settings or plugin settings after RemoveMember, SetWeightMode or RemoveOffering** (GUILD-2).
- **No test of an unexecutable Approved proposal whose proposer never cancels** (GUILD-4). It should assert that cleanup is blocked, so that the behaviour is a documented choice.
- **No test of consensus-factory name squatting**, nor of a deploy script that tolerates or detects it (GUILD-3).

## Checked and OK

- **Reserve and treasury invariants:**
  - `reserved` is 0 throughout draft, because every draft proposal is bootstrap.
  - Each path keeps `reserved` ≤ free balance: newProposal, edit, editWithPayment, delete (draft and bootstrap), submit (`held = cost.total − (proposalMbr + ballotMbr + fee)`, `reserved −= ballotMbr + fee + surplus`), finalize-reject, cancel, execute, cleanup and sweep.
  - `sweep()` takes only `free − reserved` (`:1377-1384`).
- **Execute refunds:** a voted execution cannot spend beyond `held` (`:1329-1332`). The refund is the free-balance increase during execution. The only inflows during execution are:
  - policy refunds of the Guild's own MBR payment (`refundUnused` and fixed-signer slot reuse, both computed by balance delta);
  - the RemoveExecution box (re-paid to its funder);
  - the RemovePlugin box (forwarded to the treasury).
  - Every wallet MBR refund goes to the wallet's controlled address (`account/contract.algo.ts:290-300`), never to the Guild. No third party can inject funds during the call. A proposer cannot drain via refunds.
- **MBR constants match box layouts:**

  | Box | MBR (µALGO) |
  |---|---|
  | proposal | 44,900 + 400 × Σ(7 + len) |
  | ballot | 35,300 |
  | vote | 22,500 |
  | execution | 22,100 |
  | plugin | 26,900 + 400 × len |
  | consensus-action settings | 25,300 |
  | member / history | 25,300 |
  | fixed-signer snapshot | 9,700 |
  | subscription snapshot | 9,300 |
  | offering | 12,500 |
  | offering history | 15,700 |
  | weight slots | 2,900 + 3,200 per slot |

- **Factory sizing:** `guildMbr()` equals the creator-side app MBR (8 pages, 12 uint, 24 bytes) plus the 0.1 ALGO seed. The consensus `cost()` matches `newConsensus`. The wallet factory `cost()` equals the `newAccount` payment (zero referrer).
- **Auth:**
  - Every consensus state change requires `callerApplicationId == guild` (`base.ts:98-100`); `vote` passes `Txn.sender` as voter.
  - `bindGuild` can bind only a guild whose `consensus` global names this app.
  - Draft setters and `configureConsensus` require creator plus Draft.
  - Draft `update` is factory-only. `GuildFactory.updateGuild` requires the draft creator.
  - Active `update` requires an Executed UpgradeApp, the lease, the app, the round window and the group ID, and consumes the key.
  - Guild program uploads after the first go through the DAO wallet. Registry uploads are atomic with contiguous offsets.
  - Factories are upgradeable only by the DAO wallet via the update plugin.
- **Vote weight:**
  - Locked-token power reads the voter's own LOCK stake, keyed by `Txn.sender` in staking. It requires `expiration > votingEnd` and ≥ 1 week remaining, and locks cannot be withdrawn early, so there is no flash power or double counting.
  - Subscription power requires a subscription keyed by the voter, `recipient == policy app` (only the policy can own those services), a non-zero service ID, and paid-up-now. Weights are epoch-snapshotted with closed-interval history.
  - Fixed-signer snapshots carry the mode. Member history intervals do not overlap, so remove/re-add, reweight and mode switches cannot raise power on an open ballot.
  - One vote per proposal per account.
- **Settings classes:** the "stronger of both" rule holds for SetProposalSettings, SetConsensusActionSettings and SetPluginSettings. `isUpdateGuildAction` covers 80–84, so NewWallet and Consensus need no wallet.
- **Consensus actions:** the code is `data[0]`. Each policy re-validates against current state at quote and at apply. `demonstratedApprovals` caps the locked-token and subscription floors after activation.
- **NewWallet:** uses the DAO-listed factory with `controlledAddress = zero`, `admin = Guild`, zero referrer and `extraFunding = 0`. The wallet is verified as Guild-administered on every wallet action (`validateWallet`).
- **Guild plugin:** bound to one Guild with factory provenance re-checked. Funds come from `getSpendingAccount`, and the rekey is on the last inner call.
- **Inner txn fees:** all are 0. Inner call depth is ≤ 5 on the deepest path (plugin → factory → Guild create → consensus → staking).
- **Principal resolution:** the Guild and policies use no registry or origin lookups. Subscriptions services are created with hint 0 (the policy acts as itself). The static ABI test confirms the hinted selectors and arg counts.
