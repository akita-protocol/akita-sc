# Akita MainNet Rollout: runbook

Generated 2026-10-10 from the rollout report data. Every contract change in the frozen 2026-10-05 tree, ordered so no live caller ever hits a callee that cannot serve it. The DAO is still in Draft, so each creator proposal executes at once; the whole rollout runs before initialize().

Check progress at any point (read-only):

```bash
npm run rollout:status -- --network mainnet
```

Every MainNet write needs explicit approval of network, sender and action. Run each command with `--dry-run` first.

## Update 2026-11-10

The tree is no longer the frozen 2026-10-05 tree. Since this runbook was generated:

- The readiness audit fixes C1 to C7 and C10 to C17 are in, each batch as its own commit. AkitaRouterPlugin, VenueRegistry and TinymanV2Adapter are removed; swap and swapRoute are back on PluginDexPlugin.
- The build uses stock puya-ts 1.3.1 (puya 5.10.1) from the lockfile. A clean install and whole-tree build on Linux reproduces every committed artifact and generated client byte for byte (A1).
- `projects/akita-sc/release/manifest.json` pins all 185 programs. It replaces the spec §9.8 table and `manifest.py` (A1, A2).
- The work is committed locally on `feat/plugin-dex-v2`. It is not pushed and not tagged (DEC-5).
- Steps the fixes changed: G2 (the seven plugins once listed as compiler-only), H1 (Meta revenue escrow), H4 (two-step admin handover, now with PluginDexAdminPlugin as the 14th contract) and H7 (SocialClaim, new).
- Program sizes below were updated from the manifest where they changed. No sponsorship amount changed (B1 dry run on MainNet, 2026-11-10).
- `deploy:immutable --config` takes the path of a JSON file. Where H1, H2 and H6 show the JSON inline, write it to a file and pass the path; an inline value fails before anything is sent.

## Update 2026-11-11: this branch is parked

Kyle put the Plugin DEX on hold on 2026-11-11. The rollout continues from branch `release/mainnet-rollout`, which is this tree without the Plugin DEX, and that branch's copy of this runbook is the current one. The DEX steps here (H4, DEC-2, DEC-6, gap G15) wait until the DEX is taken up again.

State of this branch when it was parked: whole-tree build reproduced, `release/manifest.json` pins 185 programs, and the full suite passed on LocalNet in six shards (167 files, 2,627 tests: 2,620 passed, none failed, 2 skipped, 5 todo). PluginDexAdminPlugin is built and tested but has had no review.

## Live state (read 2026-10-10)

- MainNet DAO 3569556034 is in Draft (initialized = 0, version 0.0.3). Only the creator proposes; proposals store as Approved and execute immediately.
- No live program changed since the Oct 4–5 fixtures (last change: proposal 170, Staking, 2026-08-22). The compat suite and ABI guard are current.
- Every aal / sal / pal / oal pointer equals networks.ts. TestNet programs match MainNet for every rollout target, so a TestNet rehearsal is valid.
- DAO wallet 3569559153 has 43.37 ALGO free; page-growth sponsorship needs 10.55 ALGO (DAO 3.59, Subscriptions 3.43, AkitaSocial 3.53).
- 73 live wallets (incl. the DAO wallet), all on program f59520de, all automatic-update. 2 Listings, 6 Polls, 37 escrows. 0 Auctions, Raffles, Pools, PrizeBoxes.

Re-read 2026-11-10 at round 66,834,699 (read-only):

- The DAO is still in Draft (version 0.0.3). `rollout:status` shows no step done on MainNet or on TestNet.
- All 40 programs in `tests/compat/fixtures` are unchanged on MainNet: 35 apps and the 5 child programs held in factory boxes.
- MainNet, TestNet and LocalNet run the same consensus protocol on go-algorand 5.0.5, so a program that can be created on LocalNet (PluginDex: 14,467 B, 7 extra pages) can be created on MainNet.
- DAO wallet 3569559153 still has 43.37 ALGO free. The B1 dry run reports 6,956,000 µA of Phase 2 sponsorship (AkitaSocial 3,528,000 and Subscriptions 3,428,000) and no shortfall.
- AkitaSocial has 7.54 ALGO free (K4). AkitaSocialModeration, PrizeBoxFactory and HyperSwap still hold 0 µA.
- Not re-read: the wallet, Listing, Poll and escrow counts, and whether TestNet programs still match MainNet.

## Decisions to close first

### DEC-1. How do wallets claim Rewards v1 allocations after aal.rewards moves to v2?

**Resolved 2026-10-11 (Kyle approved the contract change).** The tree RewardsPlugin adds `claimLegacyRewards` and `reclaimLegacyRewards`. They mirror `claimRewards` and `reclaimRewards` but call the `legacyRewards` app pinned at create, and refuse when it is 0 (errRwap). The existing methods keep their ABI and still call aal.rewards. v1 and v2 have the same claim/reclaim signatures. The SDK routes v1 claims through the legacy methods (`getDisbursementsAcrossDeployments(..., { currentAppId })` marks each deployment `legacy`; `RewardsPluginSDK.claimRewardsFrom`). Test: `arc58/plugins/rewards/rewards.e2e.spec.ts` DEC-1, against the deployed v1 bytes.

Background: v1 holds 22 open disbursements and 179 allocations (16,000 AKTA + 171 sticker units). EOAs can still claim directly from v1. Rejected options were a rewardsApp argument on the existing methods, delaying the repoint, and leaving wallet-held v1 allocations unclaimable.

### DEC-2. PluginDex #14a (bins per-position floor)

Blocks: H4. Still open in plugin-dex/research/OPEN-DECISIONS.md. It fixes BinEngine bytecode, and BinEngine is immutable. The built default holds; DEXCORE-8 (Oct 5 review) recommends keeping it. #25 is open but only SDK guidance; #18a does not exist.

- Keep the built default (recommended).
- Change the floor before deploy (rebuild + rerun the PluginDex suites).

### DEC-3. Meta data and the aal.metaMerkles pointer

Blocks: H1. MetaMerkles 3569558010 has no update route, so Meta is a new app. Merkle sub-gates, HyperSwap, StakingPool and royalties() read aal.metaMerkles at call time. Repointing before the roots move into Meta drops every stored root.

- Deploy Meta now; repoint only after a root migration (recommended).
- Keep MetaMerkles as the pointer indefinitely and use Meta only for the new record store.

### DEC-4. Which sub-gates get new app ids

Blocks: C1. 8 sub-gates changed behavior (AkitaReferrer, Asset, NFD, NFDRoot, SocialFollowerCount, StakingAmount, Subscription, SubscriptionStreak). 8 changed only error codes (MerkleAddress, MerkleAsset, Poll, SocialActivity, SocialFollowerIndex, SocialImpact, SocialModerator, StakingPower). The live compiler-only ones route every method Gate v2 calls (check, cost, register, getEntry).

- Redeploy the 8 changed, allowlist the 8 live ones on Gate v2 (recommended, matches the plugin policy).
- Redeploy all 16 for uniform versions.

### DEC-5. Commit and tag the release tree

Blocks: A2 (the tag). Every MainNet push must come from one pinned, whole-tree build.

**Committed locally 2026-11-10 (Kyle chose local commits first).** 22 commits on `feat/plugin-dex-v2`: sources by area, then the two audit-fix batches, then build output. Nothing is pushed or tagged. The repo is public, so a push also publishes `audits/`, including findings accepted as risks; decide that before pushing.

- Push and tag the release before stage B (recommended).
- Deploy from a local tarball with recorded hashes (weaker audit trail).

### DEC-6. Independent audit of the immutable new contracts

Blocks: none. PluginDex v2 (Vault, BinEngine, hooks, the wallet plugins), Gate v2, Rewards v2 and the Phase 2a Update plugin cannot be patched after deploy. Upgradeable apps can be fixed later through the DAO.

- Audit PluginDex v2 before H4; ship B–G on the internal reviews (recommended).
- Audit everything before stage B.

## Sequence

### Stage A: Release gate

Off-chain. Nothing is sent.

#### A1. Re-verify the release tree (done on the local commits; repeat on the tag)

- **What:** Install from the lockfile, rebuild the whole tree, check that the build output and the release manifest did not change, and run the full suite on LocalNet.
- **Why here:** Every later step pushes these exact bytes. A single-file build changes router order, so only a whole-tree build counts (spec §9.3).
- **Requires:** none. **Script:** ready: `release:manifest:check` compares every program under `smart_contracts/artifacts` with `release/manifest.json`. The CI workflow (`.github/workflows/akita-sc-ci.yaml`) runs the same steps on every push.
- Done 2026-11-10 on a clean clone of the committed tree (Linux, Node 24): after `npm ci` and both builds, every artifact, generated client and SDK bundle was unchanged. The full suite then passed on LocalNet in six shards: 163 files, 2,596 tests, 2,589 passed, none failed (2 skipped, 5 todo), and it left the tree unchanged.
- Use Node 24 (`nvm use` reads `.nvmrc`). A shell that defaults to an older Node fails the engine check.
- Only `projects/akita-sdk/dist/*.map` may differ after a rebuild: tsup writes the absolute build path into each source map.

```bash
nvm use && npm ci
npm run build (projects/akita-sc), then npm run build (projects/akita-sdk)
git status --short
npm run release:manifest:check (projects/akita-sc)
npm test (projects/akita-sc)
```

#### A2. Commit, tag, and pin hashes

- **What:** Commit the tree, tag the release, and record approval hashes for every app the rollout touches, including the ride-along apps (Staking, HyperSwap, PollFactory, PrizeBoxFactory, Impact, Moderation, validator, Rewards v2, Meta).
- **Why here:** A tag makes a later diff against MainNet meaningful.
- **Requires:** A1. **Script:** ready: `npm run release:manifest` writes `release/manifest.json`; `tests/release-manifest.test.ts` fails when the artifacts drift from it. The push and the tag are manual (DEC-5).
- Committed locally 2026-11-10. The manifest pins the approval and clear hash, the size and the extra pages of all 185 programs (100 deployable, 85 test-only), so the ride-along apps are pinned too.
- After an intended rebuild, regenerate the manifest and commit it with the artifacts. Its diff is the list of programs whose bytes changed.
- Still to do: push, tag, then repeat A1 on a clean checkout of the tag.

```bash
npm run release:manifest (projects/akita-sc)
git tag -s <release tag>
```

#### A3. Close the blocking decisions

- **What:** Answer DEC-1 (v1 Rewards claims) and DEC-4 (sub-gate set) before their stages. DEC-2, DEC-3 and DEC-6 gate only stage H.
- **Why here:** DEC-1 blocks the aal.rewards repoint, and that blocks the StakingPoolFactory upgrade (ROLLOUT-1).
- **Requires:** none. **Script:** manual.

#### A4. Rehearse B → I on TestNet

- **What:** Run every stage on TestNet with the same scripts, checking progress with rollout:status --network testnet after each step.
- **Why here:** TestNet runs the same programs as MainNet for every target, so the ABI guard and the K1 binding run against real deployed bytes. LocalNet runs the tree, so its ABI diff is empty.
- **Requires:** A2. **Script:** new: rollout-status.ts written today.
- TestNet has only the DAO wallet, so it cannot rehearse the 72-wallet sweep or live-child compat.
- TestNet PollFactory is unfunded; fund it before the Poll step.
- MainNet haystackRouter #2 and nfd #3 have no TestNet twin.

```bash
npm run rollout:status -- --network testnet
```

#### A5. Fund the accounts the steps draw on

- **What:** Top up the deployer, and confirm the DAO wallet holds the page-growth sponsorship.
- **Why here:** A step that runs short mid-group wastes a proposal window.
- **Requires:** none. **Script:** manual.
- DAO wallet: 10.55 ALGO sponsorship (has 43.37 free).
- StakingPoolFactory box growth +1.842 ALGO and AuctionFactory +14,800 µA; the Phase 2 runner pays both.
- AkitaSocialModeration, PrizeBoxFactory and HyperSwap hold 0 µA today.

### Stage B: Upgrade path and DAO

The new Update plugin first; then the DAO upgrades itself through it.

#### B1. Phase 2a: install the new UpdateAkitaDAOPlugin

- **What:** Deploy the page-growing Update plugin and run ONE proposal: UpdateFields pal (update = new; optin and revenueManager unchanged), AddPlugin new (global, execution key), RemovePlugin old 3569559689. Then record the id and rebuild the SDK.
- **Why here:** The live plugin pushes at most 3 chunks and never grows pages, so it can push neither the DAO (10,421 B) nor AkitaSocial or Subscriptions. Every target accepts updates only from pal.update, so role and grant move together.
- **Requires:** A2. **Script:** ready.
- **Tracked by rollout:status as** `phase2a`.
- The pal write replaces the whole struct: it must carry optin 3569560490 and revenueManager 3642325118.
- The live validator caps proposal settings power at 1,000; the AddPlugin settings must fit.
- Until B2 lands, every Update-plugin group carries the K1 proposal note. runUpdate now adds it automatically (fixed today).

```bash
npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet --dry-run --sender <creator>
… -n mainnet -m $M --manifest receipts/phase2a.json --fund-sponsor --register --confirm
npm run build (projects/akita-sdk)
```

#### B2. Deploy the validator and upgrade the DAO

- **What:** update:dao deploys the tree AkitaDAOProposalValidator, repoints oal.daoProposalValidator, then upgrades the DAO through the Phase 2 runner (pages 4 → 6, schema kept).
- **Why here:** Reclaim, ChangeAdmin, guild_fees, cancelProposal and the bootstrap-key guard exist only in the tree DAO and validator. Doing it first also closes the DAO-01/02/03 weaknesses before anything else rides on the DAO.
- **Requires:** B1. **Script:** ready.
- **Tracked by rollout:status as** `dao`.
- Keep the DAO in Draft (ROLLOUT-8): while Draft only the creator proposes, which keeps the K1 read safe.
- The DAO wallet sponsors 3,592,500 µA of page growth (5 extra pages since the 2026-10-12 time-weighted votes; was 3,492,500 at 4).
- Time-weighted votes (2026-10-12, audit DAO-04 option 4B): approve / reject / abstain tally power in base units (2026-10-13), amount x min(days left, 365) / 365 (0 with under a week left; a lock must outlast the vote). A voter with 0 power cannot vote (errNpow), and a re-vote after power fell to 0 is refused, so the cast vote stands. Quorum counts the locked amount (base units) that voted against the amount locked at submit, so aged locks with full turnout reach quorum. Proposals voted before the upgrade (no tally box) still compare their recorded power with live locked stake.
- Vote box v2: new receipts are `'w'` + proposal id + voter → (type, power, weight), 25,700 µA. Legacy `'v'` receipts are replaced on a re-vote and refunded at 22,500 by deleteProposalVotes.
- Participation record: `'r'` + voter → (lastVotedTs, lastProposalID, votes), 25,300 µA paid with the first vote, never deleted. Read through `getGovernanceParticipation` (GovernanceParticipationGate, revenue payouts).
- Lockstep: the deployed AkitaDAOPlugin pays 22,500 per vote and reverts on the upgraded DAO. Deploy the tree AkitaDAOPlugin and rebuild the SDK (`akita-sdk/dao` quotes the exact deposit) in the same window as this upgrade; F-stage plugin rotation must not lag for the DAO plugin.
- Proposal power thresholds are base units from B2 on (2026-10-13; `utils/defaults.ts` is 600/300/200 tokens x 1e6). Every `power` the live DAO already stores (the 10 `*_proposal_settings` and each global execution-key plugin's DAO settings) is in whole token-years and reads 1e6 times lower after B2. Thresholds are not enforced while the DAO is in Draft, so rescale them in I1. The new validator caps `power` at 1e15.
- From here on, each bootstrap UpgradeApp/ExecutePlugin window must end within 10,000 rounds of executeProposal.

```bash
npm run update:dao -- -n mainnet --dry-run
npm run update:dao -- -n mainnet -m $M -v 1.0.0
```

#### B3. Set guild_fees

- **What:** UpdateFields guild_fees with the guild creation fee.
- **Why here:** Code upgrades do not create missing globals. GuildFactory reverts errGuildFactoryGuildFeesUnset without it, and only the tree validator accepts the field.
- **Requires:** B2. **Script:** ready.
- **Tracked by rollout:status as** `guild-fees`.
- Can wait until just before H2.

```bash
npx ts-node --transpile-only scripts/update-guild-creation-cost.ts -n mainnet -m $M --cost <µA>
```

### Stage C: Gate v2

Six Phase 2 targets call Gate.checkFor / mustCheckFor, which Gate v1 does not route.

#### C1. Deploy Gate v2 and the changed sub-gates

- **What:** Deploy Gate v2 (legacyCutoff 1: v1 never registered a gate) and the sub-gates chosen in DEC-4, each with a receipt.
- **Why here:** Gate v1 and every sub-gate are immutable, so the fixes ship as new apps. Nothing needs importing (v1 gate_cursor = 1).
- **Requires:** A3. **Script:** fixed: Type error fixed today.

```bash
npm run deploy:gates -- -n mainnet -m $M --contracts gate,akitaReferrer,asset,nfd,nfdRoot,socialFollowerCount,stakingAmount,subscription,subscriptionStreak,moderatorActivity,governanceParticipation --legacy-cutoff 1 --manifest-dir receipts/gates
```

- ModeratorActivityGate (new, 2026-10-12, Kyle approved): "at least N counted moderation actions in the current 7-day epoch (plus the previous one)". Deploy it here: after C3 only a DAO proposal can allowlist it. Its checks fail until E1 upgrades AkitaSocialModeration (`moderatorActivity`).
- GovernanceParticipationGate (new, 2026-10-12, Kyle approved): "at least minVotes distinct DAO proposals voted on, the last within withinSeconds (0: any time)". Deploy it here, before C3 sealImports, for the same reason. It reads `AkitaDAO.getGovernanceParticipation`, so its checks fail until B2.

#### C2. Allowlist every sub-gate

- **What:** As the Gate creator, allowlist the new sub-gates (context-aware flag for AkitaReferrer, Subscription, SubscriptionStreak, ModeratorActivityGate, GovernanceParticipationGate) and the kept live ones.
- **Why here:** After the seal only the DAO wallet can change the allowlist, and no DAO action calls setSubGate directly.
- **Requires:** C1. **Script:** ready.
- Never flag a live (old) sub-gate as context-aware: Gate v2 would fail every context check that uses it (C15).

```bash
npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n mainnet -m $M --gate <id> --manifest-dir receipts/gates --sub-gates MerkleAddressGate=3569558615,…
```

#### C3. Seal Gate imports

- **What:** Call sealImports, which hands allowlist control to the DAO wallet.
- **Why here:** Ends the creator's migration window. The script refuses while any expected sub-gate is not allowlisted.
- **Requires:** C2. **Script:** new: seal-gate-imports.ts written today (gap G5).

```bash
npm run seal:gate-imports -- -n mainnet -m $M --gate <id> --manifest-dir receipts/gates --sub-gates …
```

#### C4. Point aal.gate at Gate v2

- **What:** Guarded UpdateFields aal (gate = v2; every other field unchanged).
- **Why here:** Phase 2 now refuses AkitaSocial, Subscriptions, Marketplace, StakingPoolFactory, AuctionFactory and RaffleFactory until aal.gate routes checkFor/mustCheckFor (encoded today).
- **Requires:** C3, B2. **Script:** ready.
- **Tracked by rollout:status as** `gate`.
- The live GatePlugin is pinned to Gate v1 and keeps registering there silently; rotate it in G2.

```bash
npm run deploy:gates -- -n mainnet -m $M --contracts gate --manifest-dir receipts/gates --register
```

### Stage D: Staking and Rewards v2

The new StakingPool child calls Staking.releaseAppStake and Rewards.closeDisbursement.

#### D1. Upgrade Staking in place

- **What:** UpgradeApp on Staking 3642366153 (7,010 B, fits its pages, schema unchanged).
- **Why here:** Hard prerequisite of the StakingPool child (ROLLOUT-1) and of the new StakingPlugin. The tree Staking still routes all 36 live selectors.
- **Requires:** B1. **Script:** fixed: runUpdate now binds groups to the proposal (gap G2); without that fix it reverts between B1 and B2.
- **Tracked by rollout:status as** `staking`.
- The live Staking program matches no commit; its routes were read from the deployed bytes.
- Afterwards the DAO wallet must call setHeartbeatManager before heartbeats work.

```bash
npm run update:staking -- -n mainnet --dry-run -v 0.0.3
npm run update:staking -- -n mainnet -m $M -v 0.0.3
```

**D1 follow-up: set the heartbeat manager.** Script: `staking:set-heartbeat-manager` (`scripts/set-heartbeat-manager.ts`). Run it after D1 and after the tree StakingPlugin is deployed (G2).

1. It refuses unless Staking (`aal.staking`) routes `setHeartbeatManager`, and the StakingPlugin (`--staking-plugin`, default: SDK `stakingPlugin`) runs the tree artifact for this DAO.
2. AddPlugin: a StakingPlugin grant on the DAO wallet. Global caller, execution key, methods `[setHeartbeatManager]` only, with the DAO's upgrade-class proposal settings.
3. ExecutePlugin: one group that calls `setHeartbeatManager(manager)`. The script sends it, reads `heartbeat_manager_address` back from Staking, and clears the used bootstrap key.
4. RemovePlugin removes the grant. `--keep-grant` keeps it for later manager changes; each change still needs its own ExecutePlugin proposal.

It needs the DAO creator's key and a DAO that is not initialized. A re-run with the same manager does nothing. Tracked by rollout:status as `heartbeat`; `initialize` requires it.

```bash
npm run staking:set-heartbeat-manager -- -n mainnet --manager <ADDR> --dry-run
npm run staking:set-heartbeat-manager -- -n mainnet --manager <ADDR> -m $M
```

#### D1a. Ask the 2 live Listing sellers to settle or delist

- **What:** The 2 live Listings (3643990817, 3691743616) cannot settle a sale that needs a Rewards disbursement after D2: they pay Rewards v1's 67,000 µA per disbursement and Rewards v2 takes exactly 79,800. Ask their sellers to settle or delist before D2, or accept that those sales revert.
- **Why here:** It must happen before aal.rewards moves to v2.
- **Requires:** none. **Script:** manual.
- These rev-absent children never pay a seller referral; their only Rewards call is the prize disbursement to a buyer who is not opted in to the prize. A buyer who opts in first can still buy, and a delist still works (compat test "Rewards v2: an old child disbursing the prize…").

#### D2. Deploy Rewards v2 and repoint aal.rewards

- **What:** Create Rewards v2 with a receipt, opt it into the distributed ASAs, then a guarded UpdateFields aal (rewards = v2).
- **Why here:** Rewards v1 has no update route and carries audit C-1. Every service resolves Rewards through aal.rewards at call time.
- **Requires:** A3, B2, D1a. **Script:** ready: deploy-rewards-v2.ts crash fixed too; prefer deploy:rewards (receipt + guarded cutover).
- **Tracked by rollout:status as** `rewards`.
- DEC-1 is resolved; rotate the RewardsPlugin in G2 right after this step.
- Rewards v2 stores the reclaim target as a `reclaimTo` field of each disbursement record (zero address = not sweepable) and adds the permissionless `sweepExpired`. After expiration, anyone can send the unclaimed allocations, their box MBR and the emptied disbursement's MBR to the reclaim target.
- The field makes every disbursement box 32 B larger: the disbursement MBR is 54,500 µA (v1: 41,700), so one single-allocation disbursement costs 79,800 (v1: 67,000). The old `createInstantDisbursement` / `createInstantAsaDisbursement` selectors and `createAsaDisbursementFromGroup` record `reclaimTo` = zero but charge the new MBR.
- The multi-step `createDisbursement` also takes `reclaimTo` (Kyle, 2026-10-11): `createDisbursement(pay,string,uint64,uint64,string,address)uint64` (0x65e49643) records it, so a batched disbursement (create, `createUserAllocations` / `createAsaUserAllocations`, `finalizeDisbursement`) is sweepable after expiration. The old 5-arg selector (0x1c9ebbdb) stays and records zero at the same MBR. `editDisbursement` never changes `reclaimTo`.
- Accepted break (Kyle, 2026-10-11): a deployed caller that pays the v1 amount reverts at Rewards v2 (errIpma). That covers the 2 live Listings (D1a) and every deployed service until its stage-E upgrade: AkitaSocial, Subscriptions and Marketplace referrals, plus AuctionFactory, RaffleFactory, StakingPoolFactory and wallet-factory payouts until E4, E5 and E7.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- From E1 on, upgraded services pay referrals through the new overloads: the referrer has 30 days to claim, then the cut can be swept to the service's DAO escrow. The Phase 2 runner refuses those targets until aal.rewards routes the overloads.
- Finish or abort open pool rounds while aal.rewards is still v1 (none exist on MainNet).
- networks.ts keeps v1 as `rewardsV1` (3569556095) so v1 allocations stay readable; `--register` fills that key from the receipt only where it is still 0n.

```bash
npm run deploy:rewards -- -n mainnet -m $M --manifest receipts/rewards.json
Rewards.optIn for AKTA and each payout ASA
npm run deploy:rewards -- -n mainnet -m $M --manifest receipts/rewards.json --register
```

### Stage E: Service upgrades

Phase 2 singletons with their children, plus the ride-along upgrades.

#### E1. Social family

- **What:** Phase 2 AkitaSocial (pages 4 → 6) and AkitaSocialGraph; ride-along AkitaSocialImpact and AkitaSocialModeration through update:social.
- **Why here:** Hinted social methods back the Phase 3 social plugin. The four live social plugins keep working through pinned legacy terms (K4).
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:AkitaSocial`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- K4: from this moment until Phase 4, monitor AkitaSocial's free balance (7.64 ALGO today) and top it up.
- Do not rerun register-social-extensions.ts; it is not idempotent and arc53_collection is already registered.
- DAO wallet sponsors 3,528,000 µA.
- Moderator activity fix (Kyle approved 2026-10-12): the upgraded AkitaSocialModeration writes `lastActive` on every successful moderation action (the live app never wrote it, so every SocialModeratorGate "active since" check saw 0). It also counts state-changing actions per moderator per 7-day epoch in a new `'k'` box (25,300 µA) and adds the readonly `moderatorActivity` (read by ModeratorActivityGate, C1). `addModerator` now creates `'d'` and `'k'` together and `removeModerator` deletes both, so each moderator holds 44,200 µA of the Moderation app's own balance, released back to that balance on removal; flag, unflag and content-flag actions allocate nothing. The ABI is additive, the `'d'` box layout is unchanged, and the deployed SocialModeratorGate keeps working. The live app has 0 moderators and 0 µA: before the first addModerator proposal, fund it with 100,000 µA (account minimum) + 44,200 µA per moderator + 18,900 µA per concurrent ban.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -m $M --target AkitaSocial --target AkitaSocialGraph --confirm
npm run update:social -- -n mainnet -m $M --contracts socialImpact,socialModeration
```

#### E2. Subscriptions

- **What:** Phase 2 Subscriptions (pages 4 → 5).
- **Why here:** Hinted subscribe paths back the new SubscriptionsPlugin and the subscription guild consensus.
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:Subscriptions`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- DAO wallet sponsors 3,428,000 µA. 19 B of headroom left in 4 extra pages (57 B before the 2026-10-11 referral reclaim change; 3 B with its first, separate-box design); any further Subscriptions change needs a size cut first.

```bash
… principal-phase2-upgrade-targets.ts -n mainnet -m $M --target Subscriptions --confirm
```

#### E3. Marketplace + Listing

- **What:** Phase 2 Marketplace with the rev-3 Listing child in one group.
- **Why here:** The 2 live Listings route every method the new Marketplace calls; new listings get seller referrals.
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:Marketplace`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- K8: keep ≥ 500,000 µA + 189,600 µA per open legacy-paid listing free in the Marketplace (176,800 for a prize box; 1,905,400 free covers 7). The float is the 164,000 creator MBR plus 12,800 for each disbursement the deployed plugin quotes at the v1 MBR (prize + referral; referral only for a prize box).

```bash
… --target Marketplace --confirm
```

#### E4. Auction and Raffle factories

- **What:** Phase 2 AuctionFactory + Auction child and RaffleFactory + Raffle child.
- **Why here:** Both children call Gate.mustCheckFor. RaffleFactory drops the deployed newRaffle / newPrizeBoxRaffle (K6, accepted).
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:AuctionFactory`.
- K6 lockstep: ship the SDK release the same day; the HEAD SDK cannot create raffles on the new factory.
- The old AuctionPlugin underpays bids on new children by 800 µA; rotate it in G1 soon after.
- Auction child is 8,354 B: +0.1 ALGO MBR per auction.
- Raffle child is 8,106 B, one upload chunk more than before the audit fixes, so the RaffleFactory group is 14 transactions (the limit is 16).

```bash
… --target AuctionFactory --target RaffleFactory --confirm
```

#### E5. StakingPoolFactory + StakingPool

- **What:** Phase 2 StakingPoolFactory with the 12,969 B child (exactly 16 txns).
- **Why here:** The runner refuses this target until Staking, Rewards v2 and Gate v2 are live; all three are hard callee dependencies.
- **Requires:** D1, D2, C4, B1. **Script:** fixed: Gate dependency added today; the Rewards dependency now also covers the referral reclaim overloads.
- **Tracked by rollout:status as** `p2:StakingPoolFactory`.
- New pools cost 3 more pages (+300,000 µA) and ~447 µA fee surcharge; static quotes in other frontends go stale.

```bash
… --target StakingPoolFactory --confirm
```

#### E6. Poll, PrizeBox, HyperSwap

- **What:** PollFactory and HyperSwap through Phase 2 --target with their plugin lockstep; PrizeBoxFactory through update:prize-box.
- **Why here:** PollFactory now charges every Poll page: the new PollPlugin quotes newPollCost, so its grant swaps BEFORE the upgrade. HyperSwap removes the old accept: its plugin swaps right AFTER.
- **Requires:** B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:PollFactory`.
- HyperSwap has never had an offer, so the accept removal strands nothing.
- PrizeBoxFactory holds 0 µA today; mint may never have worked on MainNet.

```bash
… --target PollFactory --manifest-dir receipts/phase2 --register --confirm
… --target HyperSwap --manifest-dir receipts/phase2 --register --confirm
npm run update:prize-box -- -n mainnet -m $M
```

#### E7. Wallet factory + wallet child (atomic) (one-way)

- **What:** Phase 2 AbstractedAccountFactory and the AVM 13 AbstractedAccount child in ONE group.
- **Why here:** The tree factory creates only the 11-argument AVM 13 wallet; the live factory cannot create it. Splitting them stops all wallet creation (ACCT-3).
- **Requires:** D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:AbstractedAccountFactory`.
- K2 lockstep: ship the SDK release and every wallet-creating frontend/backend in the same hour.
- From this moment anyone can push the AVM 13 wallet into any automatic wallet, the DAO wallet included. Run F right after.
- Never change aal.wallet: every principal check pins wallet genuineness to it.

```bash
… --target AbstractedAccountFactory --confirm
```

### Stage F: Wallets

AVM 13 is one-way; do it deliberately right after E7.

#### F1. Upgrade the DAO wallet (one-way)

- **What:** UpdateWallet proposal: the factory pushes the staged wallet into the DAO wallet.
- **Why here:** The tree DAO and validator call arc58_getNamedPluginKey for RemoveNamedPlugin; the live wallet does not route it.
- **Requires:** E7. **Script:** ready.
- **Tracked by rollout:status as** `dao-wallet`.
- Spec §9.5 step 4 puts this before Phase 2; that cannot run (ROLLOUT-5). This order is the executable one.

```bash
npm run update:dao-wallet -- -n mainnet -m $M
```

#### F2. Sweep the 72 user wallets

- **What:** Push the tree wallet into every automatic-update wallet.
- **Why here:** R-STALE (the stale escrow registry) closes per wallet only when it runs the new program.
- **Requires:** E7. **Script:** ready.
- Resumable with --skip-current. Wallet stays at 4 pages (approval 8,139 B, 49 B of headroom), so no growth cost.

```bash
npm run update:automatic-wallets -- -n mainnet -m $M --skip-current
```

### Stage G: Plugin rotation

Each new plugin waits for the service version it calls.

#### G1. Phase 3 plugins

- **What:** Deploy AkitaSocialPlugin, SubscriptionsPlugin, StakingPoolPlugin, AuctionPlugin v3, RafflePlugin v3, MarketplacePlugin (and WelcomePlugin), swap the DAO wallet grants with policy kept, add setMetaWallet to restricted social grants, register the ids.
- **Why here:** assertPhase3Ready refuses any plugin whose service, child or Gate cannot serve it yet.
- **Requires:** E1, E2, E3, E4, E5, C4. **Script:** ready.
- **Tracked by rollout:status as** `plugin:socialPlugin`.
- Method-restricted raffle/auction grants need extra --add-method entries (gap G9).

```bash
npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet --dry-run
… -n mainnet -m $M -v 2.0.0 --manifest-dir receipts/phase3 --swap --add-method socialPlugin:setMetaWallet --register --confirm
```

#### G2. Other behavior-changed plugins

- **What:** Rotate StakingPlugin (after D1), RewardsPlugin (after D2; pins legacyRewards), GatePlugin (after C4), AkitaDAOPlugin (after B2), NFDPlugin (MISC-1 price caps), HaystackRouterPlugin (MISC-2).
- **Why here:** Each fixes a live issue or calls a method only the new service has.
- **Requires:** D1, D2, C4, B2. **Script:** ready: Legacy deploy-*-plugin scripts lack receipts (G11); prefer deploy:immutable.
- **Tracked by rollout:status as** `plugin:stakingPlugin`.
- RewardsPlugin: create it with `legacyRewards` = v1 (3569556095). It adds `claimLegacyRewards` and `reclaimLegacyRewards` (DEC-1). When its DAO and backend grants on the `stickers` escrow move to the new plugin, add `reclaimRewards`, `claimLegacyRewards` and `reclaimLegacyRewards` to their method lists; method-restricted grants do not pick up new methods on their own.
- RewardsPlugin grants on the `stickers`, `rec_mod` and `rec_gov` escrows must list the new 8-arg `createDisbursement(uint64,bool,string,uint64,uint64,string,uint64,address)uint64` (0x2946dd1d), which passes `reclaimTo` (2026-10-11). The 7-arg selector (0x3aae182b) records no reclaim target. `RewardsPluginSDK.createDisbursement()` with no args, and the plugin migration of the old 0x08c25eff grant, list both.
- OptIn (pal.optin, 67 wallets), Pay, PaySilo, PaySiloFactory, SelfOptIn, AsaManager and DualStake were compiler-only changes when this runbook was written. The audit fix for C1 and C2 (2026-11-09) changes their behavior: each now refuses a wallet whose spending account it does not control. The live versions keep C2: what is exposed is the plugin account's spare ALGO and a reclaim nuisance.
- Open decision (audit R9): deploy the fixed copies for new grants and move wallets over time, or accept the live ones. Either way, leave pal.optin where it is until the 67 wallets that grant it have moved.

```bash
npm run deploy:immutable -- -n mainnet -m $M --contract <Name> --manifest receipts/<name>.json --register
npm run update:dao-wallet-plugins -- -n mainnet -m $M
```

#### G3. RevenueManagerPlugin

- **What:** One proposal: repoint pal.revenueManager, swap all 11 DAO wallet grants (optIn kept at method index 0), migrate the plugin's escrow/split/asset state.
- **Why here:** Every fee generator rekeys a DAO escrow to pal.revenueManager with method offset 0; a split move breaks fee collection everywhere. The live version lacks the P-1 fix.
- **Requires:** B2. **Script:** ready.
- **Tracked by rollout:status as** `plugin:revenueManagerPlugin`.
- **Then enable the split keeper** (akita-backend `server/revenue_split.go`). Before G3 the escrow grants stop at processEscrowAllocation, so the keeper refuses every escrow; a read-only dry run on 2026-10-12 found all 9 blocked on the missing finalize grant. After G3, make sure pal.revenueManager is listed in `RevenueManagerPluginAppIDs` (`server/contract_networks.go`), confirm a dry run logs `would_start`, then set `REVENUE_SPLIT_ENABLED=true`. It runs at 23:30, 23:40 and 23:50 UTC, before the 00:10 revenue distribution.

```bash
npm run deploy:revenue-manager-plugin -- -n mainnet -m $M -v 0.0.4
```

#### G3a. Register the unsplit revenue escrows with the RevenueManager

- **What:** Register each revenue escrow the RevenueManager does not know yet as a receive escrow whose splits reference the DAO's `revenue_splits` (`newReceiveEscrowWithRef`, through the RevenueManager's execution-key grant, one DAO proposal each). Then give each escrow the same global grant as the other 9 (optIn, start, process, finalize, with optIn at method offset 0).
  - `rev_nfd`: holds 553.40 ALGO of NFD sale proceeds (read 2026-10-11). Register right after G3, so the split keeper splits it.
  - `rev_guilds`: created in H2 (renamed from `guild_revenue`, Kyle 2026-10-12). Register right after H2.
  - Akita Dexchange (PluginDex) revenue escrow `rev_dexchange` (named 2026-10-12). Create it, point the PluginDex and LaunchManager `treasury` at it (H4), then register it.
- **Why here:** An escrow that is not registered is never split, so its fees never reach the buckets. The keeper only cycles registered escrows.
- **Requires:** G3 (the new RevenueManager and its grants). **Script:** gap: no script registers a receive escrow on MainNet yet (the SDK's `revenue-manager.ts` supports the call).

#### G4. SDK release with the network switches on

- **What:** Set REGISTRY_WRITES_STOPPED.mainnet and SOCIAL_HINTED_TARGETS.mainnet to true, record every new id, publish the SDK.
- **Why here:** K4 asks for the social flip right after Phase 2; registry writes stop once every consumer resolves principals by hint.
- **Requires:** E1, G1. **Script:** manual.
- **Tracked by rollout:status as** `sdk-flags`.
- Inventory off-chain registry readers first.

```bash
edit projects/akita-sdk/src/networks.ts; npm run build; publish
```

### Stage H: New products

Independent of each other; each after its prerequisites.

#### H1. Meta (+ MetaPlugin)

- **What:** Deploy Meta and MetaPlugin with receipts. Leave aal.metaMerkles alone until the roots are migrated (DEC-3).
- **Why here:** MetaMerkles has no update route; repointing early drops every stored root.
- **Requires:** B2. **Script:** ready: deploy:meta writes a resumable receipt and `--register` records the `meta` SDK key (G6 closed); deploy:meta-plugin records `metaPlugin`. Neither touches aal.metaMerkles. update:meta requires --meta-app-id and refuses MetaMerkles (ROLLOUT-6).
- **Revenue escrow (audit C7):** Meta keeps each type fee, less the storage it pays for, as owed to the DAO. `collectTypeFees()` sends what is owed to the DAO escrow Meta is pointed at; anyone can call it, and it fails with errEscrowDoesNotExist until the escrow is set. After the deploy:
  1. Create the escrow `rev_meta` on the DAO wallet.
  2. One DAO proposal: the Update plugin's `updateAkitaDaoEscrowForApp(meta, { name: rev_meta, app: <escrow app id> })`. No script sends it on a public network yet (gap G14); the SDK call is `updatePlugin.updateAkitaDaoEscrowForApp` and `smart_contracts/meta/type-fees.e2e.spec.ts` runs the whole path.
  3. Register `rev_meta` with the RevenueManager like the other unsplit escrows (G3a).
- Until step 2, type fees wait in the Meta app. Nothing is lost, and nothing else in Meta depends on the escrow.

```bash
npm run deploy:meta -- -n mainnet -m $M --manifest receipts/meta.json --register
npm run deploy:meta-plugin -- -n mainnet -m $M --config '{"registry":"<metaId>",…}' --manifest receipts/meta-plugin.json --register
npm run create:dao-escrow -- -n mainnet -m $M --escrow rev_meta --execute
```

#### H2. Guilds

- **What:** Create the DAO guild-fee escrow, deploy GuildConsensusFactory, register the three consensus programs, deploy GuildFactory, upload the Guild kernel, then a creation-only GuildPlugin.
- **Why here:** Guild calls the 11-argument newAccount (K2) and the factory needs guild_fees. Consensus names are first-come and permissionless; verify each before publishing ids.
- **Requires:** E7, B3. **Script:** ready (G7 closed): deploy:guild-factory refuses before any write unless aal.wallet routes the 11-argument newAccount and the DAO has guild_fees. It keeps a resumable receipt (a rerun skips created apps and uploaded programs), reads every consensus name back and refuses a name holding another program, then `--register` records `guildConsensusFactory` and `guildFactory`. deploy:guild-plugin `--register` records `guildPlugin` only for the creation-only plugin (guild = 0).
- A refused consensus name cannot be fixed on that factory: abandon its receipt and deploy a new one.
- GUILD_DEPLOYMENT.md §'Existing wallet and DAO migration' describes a removed dynamic-page factory; ignore that part.

```bash
npm run create:dao-escrow -- -n mainnet -m $M --escrow rev_guilds --execute
npm run deploy:guild-factory -- -n mainnet -m $M --revenue-escrow-app <id> --revenue-escrow-name rev_guilds --dry-run
… --manifest receipts/guild-factory.json --register --confirm-mainnet
npm run deploy:guild-plugin -- -n mainnet -m $M --config '{"factory":"<guildFactoryId>","guild":"0"}' --manifest receipts/guild-plugin.json --register
```

#### H3. WelcomePlugin

- **What:** Deploy WelcomePlugin (Phase 3 catalog).
- **Why here:** It calls the 11-argument newAccount; before E7 every wallet it creates reverts.
- **Requires:** E7. **Script:** ready.

```bash
part of G1, or npm run deploy:immutable -- --contract WelcomePlugin
```

#### H4. PluginDex v2 stack

- **What:** Deploy in order: PluginDex → BinEngine → 8 hooks → PluginDexPlugin → LaunchManager → GatedFeePassPlugin → PluginDexAdminPlugin (14 contracts), with admin = deployer; approve hooks and the curve, set LaunchManager fees/hooks and setDevBuy to Rewards v2, then hand the admin role to the DAO wallet in two steps: the deployer calls proposeAdmin(DAO wallet), and the DAO wallet calls acceptAdmin itself through PluginDexAdminPlugin.
- **Why here:** Hook gate slots need Gate v2; LaunchManager pays into Rewards v2. Deploy GatedFeePassPlugin before approving GatedFeeHook so no pool installs the hook first.
- **Requires:** C4, D2. **Script:** ready: activation sends the admin calls (G4 closed); each deploy:immutable `--register` records the contract's SDK key (G8 closed).
- **Activate:** `npm run activate:plugin-dex` reads the 14 receipts and sends the admin calls as the deployer, the proposeAdmin calls last. It skips calls already on chain, verifies each call, and refuses (printing the DAO-proposal calls) once the admin is the DAO wallet.
- **Handover (audit C10):** setAdmin is gone. Four apps have an admin: PluginDex, LaunchManager, BackrunArbHook and ConsensusKeyregHook. The script proposes the DAO wallet on each and lists each acceptAdmin as awaiting the DAO wallet. The deployer stays admin until the DAO wallet accepts, so a wrong address can never end up as admin.
- **Accept (gap G15, built 2026-11-10):** `npm run accept:plugin-dex-admin -- -n <network> --receipts <dir>` finishes the handover from the DAO wallet. It runs three creator-approved proposals before initialize(): AddPlugin (a PluginDexAdminPlugin grant limited to acceptAdminOf, with an execution key), ExecutePlugin (one group that accepts on all four apps) and RemovePlugin. It reads each admin back, clears the used bootstrap key, and refuses with nothing sent if an app has not proposed the DAO wallet or the plugin does not run the tree artifact. Rerun activate afterwards: it must report every call done.
- **PluginDexAdminPlugin is new and unreviewed.** It was written on 2026-11-10 to close G15 and has had no review besides its own tests (`plugin-dex-admin.e2e.spec.ts`, `tests/plugin-dex-admin-handover.e2e.spec.ts`). It has no authority of its own: every call is sent as the wallet and the target app checks its admin; it reaches only the five apps pinned at create (the four above and GatedFeeHook); it has no update method. Put it in the scope of the audit (DEC-6) and review the design before H4.
- **GatedFeeHook has no handover.** Its admin is the DAO wallet from creation (read from the DAO on every call), so its four settings (gate slots, pass lifetime, daily discounted-swap cap, default schedule) were never the deployer's and cannot be set before the DAO wallet can act. They go through the same plugin (`gatedSet…`). The gate-slot and default-schedule boxes are paid from the hook's own balance: send the hook account ALGO first (about 0.1 on top of its minimum balance covers both at their largest). SwapTaxHook's `owner` is not a DAO role: it is the address in the deploy config and cannot be changed, so check that value before H4.
- **After the handover** every admin action (pause a pool, approvals, fees, pool keys, gated-hook settings) is one plugin method, so the DAO grants one action at a time: AddPlugin limited to that method, ExecutePlugin for the group, RemovePlugin. Decide before H4 whether pausing a pool should need a proposal each time or whether a guardian key gets a standing grant limited to vaultSetPoolPaused. No script drives the per-action proposals yet; the handover test shows the sequence.
- Until the DAO wallet has accepted on all four apps the deployer key is the DEX admin: keep it offline. The LaunchManager policy (launch fee, bounty, treasury, gated funding, dev-buy bounds) has no decided values yet. Run `--dry-run` first.
- Blocked by DEC-2 (#14a); audit first per DEC-6, with PluginDexAdminPlugin in scope.
- PluginDex is 14,467 B and needs 7 extra pages, the most a program can have (it was 14,092 B and 6 before the audit fixes). `smart_contracts/plugin-dex/size.test.ts` holds it under 15,000 B.

```bash
npm run deploy:plugin-dex -- -n mainnet -m $M --manifest receipts/dex/PluginDex.json
npm run deploy:immutable -- --contract <each> --manifest receipts/dex/<each>.json
npm run activate:plugin-dex -- -n mainnet -m $M --receipts receipts/dex --policy dex-policy.json --dry-run
npm run activate:plugin-dex -- -n mainnet -m $M --receipts receipts/dex --policy dex-policy.json
```

#### H5. AssetInboxPlugin and BalanceReader

- **What:** Deploy with receipts and configure consumers by id.
- **Why here:** No dependencies: the ARC-59 router 2449590623 is live.
- **Requires:** none. **Script:** ready.

```bash
npm run deploy:asset-inbox-plugin -- -n mainnet -m $M --manifest …
npm run deploy:wallet-balance-reader -- -n mainnet -m $M --manifest …
```

#### H6. Labs revenue pay silo (`rec_krby`)

- **What:** Deploy a PaySiloPlugin pinned to the Akita Labs LLC address, then install it on the DAO wallet scoped to the `rec_krby` escrow with only the `pay` method.
- **Why here:** `rec_krby` is a DAO-wallet escrow that receives the 40% Labs bucket. The pay silo's recipient is fixed at creation, so the grant can be callable by anyone (or by a backend keeper): every payment can only reach Labs.
- **Requires:** B2 (AddPlugin on the upgraded DAO). **Script:** deploy ready (`deploy:pay-silo-plugin`); the AddPlugin proposal is manual (one DAO proposal: AddPlugin, escrow `rec_krby`, methods `[pay]`).
- The live PaySiloPlugin 3569561570 (no grants) pays the deployer R2MOGXW7…OP6BLE (read 2026-10-11). Reuse it only if that is the address Akita Labs LLC should receive long-term; otherwise deploy a new instance.

```bash
npm run deploy:pay-silo-plugin -- -n mainnet -m $M --config '{"recipient":"<Akita Labs LLC address>"}' --manifest receipts/pay-silo-labs.json
```

#### H7. SocialClaim (held)

- **What:** Deploy SocialClaim, the admin of send-to-anyone wallets until a platform identity claims them. Constructor: the WelcomePlugin app id, the PayPlugin app id, the attestor public key (32 bytes) and the manager address.
- **Why here:** It creates wallets through WelcomePlugin, so it needs E7 and H3. It is immutable: the two plugin ids are fixed at create.
- **Requires:** H3. **Script:** ready since 2026-11-10: SocialClaim is in the immutable catalog, `--register` records the `socialClaim` SDK key and fills its README row (audit R7). Test: `tests/release-deployments.test.ts`.
- **Held until two things are decided:**
  - Audit C5, open part: whether binding a handle first should make the binder the referrer of the recipient's wallet. The answer can change the program, and the program cannot be changed after deploy.
  - Who holds the attestor key and who the manager is. The attestor can bind any handle to any wallet, and the manager can replace the attestor. The manager should not be a hot key.
- The deploy tooling does not verify the two plugin ids on chain. Check each against its receipt first.

```bash
social-claim.json: {"welcome":"<welcomePluginId>","pay":"<payPluginId>","attestor":[<32 numbers>],"manager":"<address>"}
npm run deploy:immutable -- -n mainnet -m $M --contract SocialClaim --config social-claim.json --dry-run
… --manifest receipts/social-claim.json --register
```

### Stage I: Launch the DAO

No script supports a voting DAO end to end, so everything above runs first.

#### I1. Review grants, clear bootstrap keys, initialize

- **What:** List and keep the pre-launch grants (they are a feature), revoke weak pal.update grants and leftover execution keys, clearBootstrapKeys, then initialize().
- **Why here:** initialize() refuses while any bootstrap execution key is tracked. After it, ChangeAdmin works and every later change needs a vote.
- **Requires:** B2, F1, G4. **Script:** ready.
- **Tracked by rollout:status as** `initialize`.
- Expired proposal #107 stays inert; 19 expired execution boxes hold ~420k µA.
- Before initialize(), rescale every stored proposal `power` to base units (x 1e6; see B2): UpdateFields each `*_proposal_settings`, and re-grant each global execution-key plugin whose DAO settings still hold a whole-token power (grants copied by the migration scripts carry the old value). No script does this yet.

```bash
npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --dry-run
… --confirm-revoke
DAO.initialize()
```

### Stage J: After launch

Monitoring until Phase 4.

#### J1. Monitor and plan Phase 4

- **What:** Watch AkitaSocial free balance (K4), Marketplace float (K8) and legacy-selector traffic. Delete the legacy shims (Phase 4) after 30 days without legacy traffic and at least 60 days after Phase 3.
- **Why here:** The shims keep old plugins and SDKs working during the transition; each is a small standing cost.
- **Requires:** I1. **Script:** gap: K4/K8 monitors are manual (G13).

**Operational: sweep expired referrals.** From E1 on, every referral cut is an instant disbursement that expires after 30 days with the paying service's DAO escrow as its reclaim target. Nothing sweeps it automatically. Run a keeper or backend job, for example daily:

1. List sweepable disbursements with `RewardsSDK.getSweepableDisbursementIds()` (reclaim target set and expiration passed).
2. For each, call `RewardsSDK.sweepExpired({ id })`. Any funded account can send it; it pays one inner-transaction fee per ASA allocation plus one.
3. If a sweep reverts with errRcoi, opt that DAO escrow into the asset, then sweep again.

Also sweep a disbursement whose referrer already claimed: the sweep closes it and returns its MBR (79,800 µA per ALGO referral) to the escrow.

## Script changes made 2026-10-10

- `scripts/script-base.ts` (fixed): runUpdate binds every Update-plugin group to the proposal it will get when the DAO lacks isUpgradeLease (gap G2). A resume rebuilds in the DAO's current binding first, then the other, so proposals made before Phase 2a or before the DAO upgrade still resume (ROLLOUT-4).
- `scripts/utils.ts` (fixed): proposeAndExecute refuses to execute a proposal whose id differs from the one the groups were bound to.
- `scripts/lib/principal-rollout.ts` (fixed): The six Phase 2 targets with hinted gated paths declare Gate v2 at aal.gate as a dependency (ROLLOUT-7, spec §9.5 step 5).
- `scripts/deploy-rewards-v2.ts` (fixed): Funded through algorand.send.payment instead of a fundAppAccount the typed client lacks (it crashed after creating the app).
- `scripts/update-meta.ts` (fixed): Requires --meta-app-id and refuses the immutable MetaMerkles id (ROLLOUT-6).
- `scripts/deploy-gates.ts` (fixed): Type error on the constructor config.
- `scripts/seal-gate-imports.ts` (new): Seals Gate v2 imports only after every expected sub-gate is allowlisted; idempotent; verifies on chain (gap G5).
- `scripts/rollout-status.ts` (new): Read-only tracker: checks every step against live chain state and prints done / ready / blocked (npm run rollout:status).
- `package.json` (fixed): Added rollout:status and seal:gate-imports; removed install:dao-haystack-claim-plugin (pointed at a missing file).
- `scripts/deploy-guild-factory.ts`, `scripts/deploy-meta.ts` (fixed): resumable receipts through `scripts/lib/deployment-receipt.ts`; Guild pre-flight guards and consensus read-back in `scripts/lib/guild-deployment.ts` (G6, G7).
- `akita-sdk/src/networks.ts`, `README.md`, `scripts/lib/immutable-catalog.json`, `scripts/lib/immutable-deployment.ts` (fixed): optional SDK keys for the release contracts; deploy:immutable `--register` records them, keeps Rewards v1 as `rewardsV1`, and records GuildPlugin only for guild = 0 (G8). Tests: `tests/release-deployments.test.ts`, `tests/release-deployments.e2e.spec.ts`.
- `tests` (fixed): rollout.test, update-execution-lease and update-resume assert the new behavior; a vitest globalSetup funds the LocalNet zero address.

## Script changes made 2026-10-11

- `scripts/lib/principal-rollout.ts` (fixed): every Phase 2 target that pays referrals (AkitaSocial, Subscriptions, Marketplace, StakingPoolFactory, AuctionFactory, RaffleFactory, AbstractedAccountFactory) declares Rewards v2 at aal.rewards as a dependency, so the runner refuses to push it before D2. Test: rollout.test "every Phase 2 target that pays referrals waits for Rewards v2".

## Open script gaps

- **G3.** No script drives a voting DAO end to end (no finalizeProposal). Moot if every stage finishes before initialize().
- **G4.** Closed: `activate:plugin-dex` sends the PluginDex v2 admin calls; SDK keys closed with G8.
- **G6.** Closed: deploy:meta writes a resumable receipt and records `meta` on `--register`.
- **G7.** Closed: deploy:guild-factory has a resumable receipt, the K2 and guild_fees pre-flight refusals, and a read-back of every consensus name before the ids are recorded.
- **G8.** Closed: networks.ts has 25 optional keys (0n until `--register` records them; LocalNet ids come from .env.localnet), including `rewardsV1`. The new plugins are plain app keys, not plugin-history entries, so getPluginUpdate does not track them until a second version ships.
- **G9.** Phase 3 --add-new-methods covers only socialPlugin:setMetaWallet; restricted raffle/auction grants need manual --add-method.
- **G13.** K4/K8 balance monitors and the SDK flag flips are manual.
- **HB.** Closed: `staking:set-heartbeat-manager` (see D1).
- **G14.** No script sends `updateAkitaDaoEscrowForApp` on a public network, so pointing Meta at `rev_meta` (H1) is a hand-built proposal today. The same call serves any fee generator whose escrow changes.
- **G15.** Built, not yet reviewed: PluginDexAdminPlugin and `accept:plugin-dex-admin` let the DAO wallet finish the two-step handover in H4 and act as admin afterwards. Open: an independent review of the plugin, the choice between per-proposal pausing and a guardian grant, and a script for the per-action proposals after the handover.
- **G16.** `npm run check-types` reports 13 errors, all in test files and one example script; CI does not gate on it yet. The contract CI workflow was rewritten on 2026-11-10 and has not run on GitHub yet, because nothing has been pushed.

