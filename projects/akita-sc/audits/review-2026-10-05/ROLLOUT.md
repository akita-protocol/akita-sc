# ROLLOUT slice: cross-cutting upgrade and rollout review

Reviewer slice: ROLLOUT (upgrade path, live-app compatibility, ordering). Date 2026-10-05. MainNet reads at round ~65,700,800
(consensus v42: `AppSizeUpdates = true`, `MaxAbsoluteExtraProgramPages = 7`, `PerByteTxnSurcharge = 100`).
Read-only: nothing was built, signed or sent. Throwaway scripts and the fetched MainNet programs are in
`scratchpad/review/rollout2/` (`compare.mjs`, `callers.mjs`, `walletcalls.mjs`, `childcalls.mjs`, `boxdiff.mjs`, `router.mjs`, `abi-diff.json`, `app-*.json`).

## Verdict

ISSUES. No Critical. The principal Phase 2a/2/3 scripts are careful (ABI guard, atomic factory+child group, clear
program, schema pass-through, sponsor funding, Phase 3 readiness check). The risks sit in what those scripts do not
cover: the "ride-along" upgrades (Staking, HyperSwap, PollFactory, PrizeBoxFactory, SocialImpact/Moderation, Meta,
validator, Rewards v2) and the older generic `update-*.ts` scripts, which bypass every Phase 2 guard and still work
today through the deployed Update plugin.

## Scope

| Item | Lines |
|---|---|
| `scripts/lib/principal-rollout.ts`, `principal-rollout-run.ts`, `dao-wallet-plugin-migration.ts` (parts), `principal-phase2a/2/3*.ts`, `script-base.ts` (`runUpdate`), `update-wallet-factory.ts`, `update-dao-wallet.ts`, `update-automatic-wallets.ts`, `update-hyper-swap.ts`, `update-meta.ts`, `deploy-meta.ts`, `deploy-guild-factory.ts`, `update-*.ts` survey, `principal-accepted-abi-removals.json`, `principal-deployed-abi.json` | ~4,300 |
| `arc58/plugins/update-akita-dao/contract.algo.ts`, `utils/programs.ts`, `utils/base-contracts/upgradeable.ts`, `arc58/account/factory.algo.ts` (`updateWallet`, create), `arc58/dao/contract.algo.ts` (update, globals, `removePlugin`), `validator.algo.ts` diff, `gates/contract.algo.ts` (import/eval), `staking-pool/contract.algo.ts` (Staking/Rewards calls), `poll/factory.algo.ts` | ~1,900 read in part |
| `docs/principal-resolution/PHASE-0-SPEC.md` §6, §7, §9 | 1,109 |
| `rollout.e2e.spec.ts`, `tests/compat/fixtures/mainnet-programs.json` | setup and coverage only |
| go-algorand `apply/application.go` `updateApplication`, `transactions/application.go` `wellFormed`/`UpdatingSizes`, `transactions/transaction.go` `CheckContractVersions`, `config/consensus.go` v42 | protocol facts |
| Every `*.arc56.json` of the 23 live in-place candidates and 6 child types, plus all plugin/sub-gate artifacts (selector scans) | 183 artifacts |
| MainNet: 94 registry app ids (all programs fetched), all children of the 9 factories, 982 plugin grant boxes in the 73 live wallets, DAO globals/proposals, factory `bc` boxes | — |

## Live app compatibility table

Schema = global uints/bytes. "Pages" = extra program pages. "New size" = approval B (+ clear 4 B). Local schemas are 0/0 everywhere (an update cannot set local schema; none is declared).

| App | MainNet id | Live schema | New schema | Live pages (approval B) | New size → pages needed | Verdict |
|---|---|---|---|---|---|---|
| AkitaDAO | 3569556034 | 5u/59b | 5u/59b | 3 (7,151) | 9,738 → 4 | OK via Phase 2a plugin only (page growth; DAO wallet sponsors 3,492,500 µA). New keys `guild_fees`, `bootstrap_key_count` fit the schema; `bootstrap_key_count` read with `hasValue` fallback (`dao/contract.algo.ts:187`). Not a default Phase 2 target |
| AbstractedAccount (DAO wallet + 73 user wallets) | 3569559153 (+73 children, all program `f59520de0e45`, all `update_settings = c0` automatic) | 12u/30b | 12u/30b | 3 (8,186) | 8,178 → 3 | OK size/schema; box/global layouts unchanged (arc56 diff empty). AVM 11 → 13, irreversible (`CheckContractVersions` refuses downgrades). Only via the upgraded factory (see ROLLOUT-3, ROLLOUT-5) |
| AbstractedAccountFactory | 3569556257 | 8u/56b | 8u/56b | 3 (3,240) | 3,515 → 1 | OK. Removes 10-arg `newAccount` (K2, accepted; only live on-chain caller is the DAO's one-shot `setup`, already used) |
| Subscriptions | 3569556497 | 8u/56b | 8u/56b | 3 (8,181) | 10,179 → 4 | OK via Phase 2a plugin (sponsor 3,428,000 µA) |
| StakingPoolFactory | 3569556570 | 8u/56b | 8u/56b | 3 (2,453) | 3,960 → 1 | OK as an app; its child push has an unencoded dependency on Staking (ROLLOUT-1) |
| Staking | 3642366153 | 1u/2b | 1u/2b | 3 (6,511) | 7,010 → 3 | OK size/schema. Live program `b145905a…` matches no commit (deployed from an uncommitted tree); no removed selector found against the union of 47 historical signatures. Outside the ABI guard and the §9.7 manifest |
| Rewards | 3569556095 | 2u/1b | 2u/1b | 3 (3,774) | 4,362 | NOT upgradeable (no UpdateApplication route): Rewards v2 must be a new app + `aal.rewards` repoint |
| AkitaSocial | 3569557130 | 8u/56b | 8u/56b | 3 (8,186) | 10,884 → 5 | OK via Phase 2a plugin (sponsor 3,528,000 µA) |
| AkitaSocialGraph | 3569557033 | 1u/1b | 1u/1b | 3 (1,794) | 2,454 → 1 | OK |
| AkitaSocialImpact | 3569556973 | 1u/1b | 1u/1b | 3 (2,880) | 2,960 → 1 | OK, no removals; ride-along via `update-social.ts` (no guard) |
| AkitaSocialModeration | 3569557176 | 1u/1b | 1u/1b | 3 (1,114) | 1,087 → 0 | OK, no removals; ride-along |
| AuctionFactory | 3569557408 | 8u/56b | 8u/56b | 3 (3,426) | 4,719 → 2 | OK |
| Marketplace | 3569557584 | 8u/56b | 8u/56b | 3 (3,849) | 5,656 → 2 | OK. 2 live rev-absent Listings route every method the new Marketplace/plugin calls |
| RaffleFactory | 3569557743 | 8u/56b | 8u/56b | 3 (2,670) | 3,751 → 1 | OK. Removes `newRaffle`/`newPrizeBoxRaffle` (K6, accepted; live callers RafflePlugin 3569561863/3368399868 already broken per AR-14) |
| PollFactory | 3569557932 | 8u/56b | 8u/56b | 3 (3,679) | 3,975 → 1 | OK, no removals; 6 live polls route every called method |
| PrizeBoxFactory | 3569557972 | 8u/56b | 8u/56b | 3 (1,846) | 2,184 → 1 | OK. Child `deleteApplication()` → `deleteApplication(address)`; 0 live prize boxes |
| HyperSwap | 3569558555 | 2u/1b | 2u/1b | 3 (3,680) | 3,951 → 1 | Size/schema OK. **Removes `accept(pay,uint64,byte[32][])void`, called by live HyperSwapPlugin; not an accepted removal** (ROLLOUT-2) |
| MetaMerkles | 3569558010 | 1u/0b | 2u/1b (Meta) | 1 (2,593) | 3,833 (AVM 13) | NOT upgradeable (no UpdateApplication route; live = HEAD MetaMerkles). Meta must be a new app; `update-meta.ts` targets this id (ROLLOUT-6) |
| Gate v1 | 3569558504 | 2u/1b | 4u/1b (v2) | 0 (2,035) | 3,320 | Immutable; Gate v2 is a new app. v1 `gate_cursor = 1`: no gate was ever registered, nothing to import |
| DAOProposalValidator | 3642264629 | 0/0 | 0/0 | 1 (3,054) | 3,724 | Immutable; new validator is a new app (oal repoint). Selector-compatible with the new DAO |
| EscrowFactory | 3569555755 | 0/0 | 0/0 | 3 (1,318) | 1,441 | Immutable, unchanged on-chain (spec Q15). New code calls only methods the live program routes |
| AbstractedAccountMBR | 3642282698 | 0/0 | 0/0 | 0 (304) | 304 | Byte-identical |
| UpdateAkitaDAOPlugin | 3569559689 | 1u/3b | 1u/3b | 0 (1,721) | 2,559 | Immutable; replaced by the Phase 2a deploy. ABI of old and new plugin overlaps exactly, so the tree SDK still drives the old plugin (see ROLLOUT-3) |

Live children: wallets 73 (all `f59520de0e45`, automatic), Listings 2 (`fee38d86384b`, rev-absent), Polls 6, Escrows 37.
**Zero live StakingPool, Auction, Raffle or PrizeBox children** on MainNet (indexer `include-all`, creator = each factory).
So no mixed-generation child state exists today; the shim/marker logic only matters for children created before Phase 2 lands.

Size-sponsor total for the three page-growing apps: 10,448,500 µA onto the DAO wallet (free balance 43.37 ALGO on 2026-10-05). Fee surcharge on the >8,192 B pushes (AkitaSocial 2,696 B over → +270 µA) is covered by simulate-built groups; LocalNet runs the same rule.

## Prior-finding verification

| ID | Status | Evidence |
|---|---|---|
| Spec R9 / FIX-PLAN §2 (deployed Update plugin cannot push >8 KB or grow schema) | fixed | `update-akita-dao/contract.algo.ts:173-218` (4 chunks, `extraPagesToGrow`, current schema always passed on growth, `updateAppWithSchema`); P2-UPD-01 starts from the deployed plugin and DAO bytes |
| DAO-03 (UpgradeApp lease not bound to target) | fixed in the new plugin, residual on the deployed DAO | `requireUpgradeExecution` binds lease→UpgradeApp→target via `isUpgradeLease` or `mustGetExecution`+`getProposal` (`contract.algo.ts:59-117`). On the deployed DAO+wallet the lease-append half of DAO-03 still exists (HEAD DAO writes `executions(lease)` only for UpgradeApp, `HEAD dao/contract.algo.ts:961-965`; ExecutePlugin with the same fv/lv appends groups to the wallet key). Only the creator can propose while the DAO is Draft (`initialized = 0`), so not exploitable now; see ROLLOUT-8 |
| ACC-08 (factory child staging auth) | fixed | `utils/base-contracts/factory.ts:118-127`: DAO wallet only once the DAO has a wallet; the update plugin's inner sender is the DAO wallet |
| FIX-PLAN §2 child pages derived from size | fixed | `utils/programs.ts:30-45`, factory create sites pass `programExtraPages(…, 3)` |
| K2 / K6 accepted removals | correct | Entries cite live sha256 `f01f9bc7…` (WalletFactory) and `4b3e8a2c…` (RaffleFactory); both equal the MainNet programs; signatures are routed by them |
| DAO-01 (draft proposals never expire) | fixed in tree, still live | Live DAO Draft; #107 (UpgradeApp walletFactory, window 61,455,057–61,455,798) inert. Live until `--target AkitaDAO` runs |
| R10 (compat baseline = deployed bytecode) | partially | 34 deployed programs in `tests/compat`, but none of the ride-along pairs, and the rehearsal's DAO wallet runs the tree wallet, not `f59520de0e45` (Test gaps) |

## New findings

### ROLLOUT-1 — Medium — New StakingPool child depends on a Staking method the live Staking lacks; Phase 2 pushes it with no check

- Location: `staking-pool/contract.algo.ts:1506-1511` (`removeEntry` → `Staking.releaseAppStake` for SOFT pools); `:852`, `:1666`, `:1711` (`Rewards.closeDisbursement`); `scripts/lib/principal-rollout.ts:495-524` (StakingPoolFactory target always carries the child); `principal-rollout-run.ts:732-758` (`runPhase2`: no dependency check before pushing).
- Facts: live Staking 3642366153 does not route `releaseAppStake(uint64,address,uint64)void`; live Rewards v1 3569556095 (immutable) does not route `closeDisbursement(uint64)void`. Every other Staking/Rewards selector the new child embeds is routed. The spec runbook (§9.5) never orders the Staking upgrade or the Rewards v2 repoint before the StakingPool child push; `assertPhase3Ready` checks plugin→target only.
- Scenario: Phase 2 executes StakingPoolFactory (child staged). A creator makes a SOFT pool through the factory; users enter (`commitAppSoftStake` works on live Staking). Any entrant's `removeEntry` (and the after-end cleanup by anyone) reverts on the inner `releaseAppStake`. Entry box MBR and `AppStakesMBR` stay locked, and pool teardown is blocked, until the DAO upgrades Staking. Separately, a round that finishes with nothing paid (`tracked && paid == 0`) reverts in `finalizeDistribution` → `closeDisbursement`, and `reclaimRound(…, close=true)` always reverts while `aal.rewards` is v1; the creator/DAO escape is `abortRound(id, 0)` (leaves the v1 disbursement and its MBR behind).
- Fix: make the StakingPoolFactory target refuse unless `aal.staking` routes every Staking selector and `aal.rewards` routes every Rewards selector the child embeds (reuse `calledSignatures`/`missingSelectors`), and put "upgrade Staking, deploy Rewards v2, repoint `aal.rewards`" before step 6 in §9.5.

### ROLLOUT-2 — Medium — HyperSwap upgrade removes a selector that installed plugins call; not an accepted removal, and its script has no guard

- Location: `hyper-swap/contract.algo.ts:315` (`accept(pay,uint64,byte[32][],byte[32])`, terms binding for C-3) vs deployed `accept(pay,uint64,byte[32][])void` (HEAD `:160`); `scripts/update-hyper-swap.ts:4-6` (`runUpdate`, no ABI diff); absent from `principal-accepted-abi-removals.json`.
- Facts: live callers HyperSwapPlugin 3569561068 (installed in 7 user wallets) and 3368399121. HyperSwap `offer_cursor = 0` today.
- Scenario: after `update-hyper-swap.ts` (runnable today through the deployed Update plugin, see ROLLOUT-3), any wallet still holding the old plugin can create offers but every `accept` through the plugin reverts. No funds are lost (offers can be cancelled after expiry), but the installed plugin is broken until users reinstall the new HyperSwapPlugin.
- Fix: record the removal as a decision (a shim would reintroduce the C-3 bug), ship the new HyperSwapPlugin id and `getPluginUpdate` before/with the upgrade, and route the HyperSwap upgrade through the Phase 2 ABI guard.

### ROLLOUT-3 — Medium — Generic `update-*.ts` scripts bypass every Phase 2 safeguard; the documented `update:wallet-factory` default stages the AVM 13 wallet into the AVM 11 factory

- Location: `scripts/script-base.ts:476-497` (`runUpdate` passes no `clearProgram`, no schema, no `daoBinding`, no ABI diff); `scripts/update-wallet-factory.ts:34-42` (`skipAppUpdate: !updateFactory`, child-only by default); `scripts/update-dao-wallet.ts:8-11` (tells the operator to run `update:wallet-factory` first); HEAD `arc58/account/factory.algo.ts:146, 319` (old factory passes the compiled-in v11 clear program).
- Facts: the deployed Update plugin's ABI is a strict subset of the new one, so the tree SDK drives it; these scripts work on MainNet today for programs ≤ 8,192 B. After Phase 2a they revert (default lease read on a DAO without `isUpgradeLease`) until the DAO itself is upgraded.
- Scenario (concrete): an operator follows `update-dao-wallet.ts` and runs `npm run update:wallet-factory -- -n mainnet …` without `--update-factory`. The live factory now holds the 8,178 B AVM 13 wallet. Every `newAccount` and every `updateWallet` on the old factory pairs a v13 approval with the v11 clear program and fails `CheckContractVersions` ("program version mismatch"). All wallet creation on MainNet stops until the old child is re-staged or the factory is upgraded. The same path pushes HyperSwap (ROLLOUT-2) or a child into an un-upgraded factory with no ABI check and no atomic grouping.
- Fix: have `runUpdate` refuse a target that `PHASE2_TARGETS` covers (or any target whose child AVM version differs from the factory's compiled clear version), make `update-wallet-factory.ts` refuse child-only when the factory is not already on the tree program, add the ABI diff and `daoBinding` auto-selection to `runUpdate`, and fix the `update-dao-wallet.ts` prerequisite text.

### ROLLOUT-4 — Low — Resuming a Phase 2 proposal after the DAO upgrade rebuilds the wrong binding and cannot match the recorded groups

- Location: `principal-rollout-run.ts:651` (resume picks the binding from the DAO program now on chain), `:671`.
- Scenario: a target's UpgradeApp proposal is executed on the deployed DAO (groups built in proposal-read mode: note + `x`/`l` box refs). Before its groups are sent (crash, or a voting DAO), `--target AkitaDAO` runs. On resume `readDaoBindingMode` returns `lease`, the rebuild omits the note/boxes, and `restampExecution` throws "rebuilt group does not match". The new DAO has no `u` box for that lease, so lease mode would fail anyway; proposal mode would still work (`mustGetExecution`/`getProposal` exist on both DAOs). The proposal is lost and must be re-proposed (a full vote on an initialized DAO).
- Fix: on resume, choose the binding the proposal was built with (try proposal mode first when `executions(lease)` exists and no `u` entry does).

### ROLLOUT-5 — Low — Wallet AVM 13 rollout has no canary and the spec's order for the DAO wallet is not executable

- Location: `arc58/account/factory.algo.ts:337-350` (`updateWallet`: no caller check when `automatic`); all 74 wallets have `update_settings = c0`; spec §9.5 step 4.
- Facts/scenario: the wallet child rides with the WalletFactory Phase 2 group by default. The moment it executes, anyone can push AVM 13 code into every automatic wallet, including the DAO wallet, and protocol rules forbid downgrading back to AVM 11, so recovery is forward-only. Conversely, §9.5 step 4 ("upgrade the DAO wallet's program" before step 6) cannot happen: until Phase 2 the factory box holds the HEAD wallet (`bc` sha `f59520de…`) and the old factory could not push a v13 program anyway. Until the DAO wallet is upgraded, the new DAO/validator revert on RemoveNamedPlugin (`arc58_getNamedPluginKey` is not routed by `f59520de0e45`); `runMigration --unname-aliases` does not check this.
- Fix: decide explicitly whether to ship with `--skip-wallet-child` first and stage the wallet later (canary on a test wallet with `automatic=false`), correct the runbook order, and add a wallet-program selector check to `--unname-aliases`.

### ROLLOUT-6 — Low — `update-meta.ts` targets the immutable MetaMerkles app

- Location: `scripts/update-meta.ts:8-11` (`appIdKey: 'metaMerkles'` → 3569558010 on MainNet); live MetaMerkles has no UpdateApplication route (HEAD `meta-merkles/MetaMerkles.arc56.json`, sha matches live).
- Scenario: running it creates and executes an UpgradeApp proposal whose group always reverts (wasted proposal and fees). If `metaMerkles` is later repointed to the new Meta app, live consumers that read it at run time (merkle sub-gates, HyperSwap, StakingPool, `utils/functions.ts:554`) lose every root stored in the old app (Meta schema 2u/1b also differs, so it can never be an in-place upgrade).
- Fix: point `update-meta.ts` at the Meta receipt id, and add the Meta data-migration decision to the runbook before any `metaMerkles` repoint.

### ROLLOUT-7 — Low — Ordering not encoded for several new apps and plugins outside Phase 3

- Location: `scripts/deploy-guild-factory.ts` (no check that the wallet factory routes the 11-arg `newAccount` or that the DAO has `guild_fees`); `deploy-immutable.ts`/`deploy-*-plugin.ts` (dependency identity only, not ABI readiness).
- Facts (selector scan, new artifact → live program): StakingPlugin → Staking `setHeartbeatManager`, `closeSoftStake`, `closeHeartbeat`, `releaseAppStake`; HyperSwapPlugin → new `accept`; AkitaDAOPlugin and GuildPlugin → DAO `cancelProposal`; Guild → 11-arg `newAccount`. Phase 2 singletons and new children call `Gate.mustCheckFor`/`checkFor`, which Gate v1 lacks; Phase 2 does not check `aal.gate` (Phase 3 does).
- Scenario: deploying/granting any of these before its target upgrade gives grants that revert (no fund loss; the K2 lockstep is the same pattern).
- Fix: extend the `phase3Gaps` readiness check to every deploy script and to Phase 2 children (`aal.gate`, `aal.staking`, `aal.rewards`).

### ROLLOUT-8 — Info — Keep the deployed DAO in Draft until `--target AkitaDAO` has run

The deployed DAO still has DAO-01/02/03. While it is Draft, only the creator can propose (`HEAD dao/contract.algo.ts:169-170`), so the Phase 2a proposal-read binding is safe. If the DAO is initialized first, a weak ExecutePlugin proposal can append groups to an approved UpgradeApp lease on the deployed wallet, and the new plugin's proposal read would accept them for that target. `--target AkitaDAO` is never selected by default; nothing stops `initialize()` before it. Also `planSponsorship` (Phase 2a `--fund-sponsor`) omits the DAO's own 3,492,500 µA; `fundTarget` covers it later.

## Suspicions

- S-1: The rehearsal never runs Phase 2a/2 groups against the deployed DAO wallet program (`f59520de0e45`, AVM 11). The universe's DAO wallet is the tree wallet. Selectors match (checked: `arc58_rekeyToPlugin(uint64,uint64,…)`, `arc58_addExecutionKey`, `arc58_verifyAuthAddress`, `update(string)`), but group-validation semantics (rekey index, window checks with a 16-txn group carrying a note and DAO box refs) are untested on that program.
- S-2: Third-party SDKs/frontends that quote StakingPool creation or fees statically: the new 12,660 B child costs 3 more pages (300,000 µA) and a fee surcharge (~447 µA) per creation. The compat suite uses the test SDK, not published SDK versions.

## Upgrade / rollout notes

- Encoded and correct: Phase 2a before Phase 2 (`requirePhase2aDone`), Phase 2 before Phase 3 (`assertPhase3Ready`), ABI guard with K2/K6 bound to live sha256, factory+child atomic group (WalletFactory 14 txns, StakingPool exactly 16), current schema passed on page growth, per-target clear program, byte-for-byte post-verification, resumable proposals (`--proposal-id`), idempotent re-runs (targets already on the artifact are skipped).
- Not encoded: Staking/Rewards v2 before StakingPool child (ROLLOUT-1); Gate v2 at `aal.gate` before hinted gated paths; DAO wallet upgrade before `--unname-aliases`; K2/K4/K6 SDK lockstep, `SOCIAL_HINTED_TARGETS`, `REGISTRY_WRITES_STOPPED` (manual by nature); K8 Marketplace float (MainNet free 1,905,400 µA, enough for 8); the ride-along upgrades have no ordered runbook at all.
- Fund-loss windows: none found. Every lockstep gap reverts in-group (wallet/raffle creation, legacy social direct posts). The lock windows are ROLLOUT-1 (entrant MBRs, recoverable by a Staking upgrade) and ROLLOUT-3 (wallet creation DoS, recoverable by re-staging).
- Idempotency: Phase 2a/3 deploys resume from receipts; a crash between `newProposal` and `executeProposal` on the Draft DAO leaves an Approved, inert duplicate (it reverts on AddPlugin-exists). Phase 2 per-target resume works unless the DAO binding mode changed (ROLLOUT-4). `update-automatic-wallets.ts --skip-current` is resumable.
- Artifact consistency: all 32 + 17 artifacts in the §9.7 manifest match their sha256 and sizes; no source under `smart_contracts/` or `akita-plugin/` is newer than the artifacts; typed clients embed the same bytecode. Risk: 417 modified, 71 untracked and 7 deleted artifact files are uncommitted, and ride-along artifacts (Staking, HyperSwap, PollFactory, PrizeBoxFactory, SocialImpact/Moderation, Meta, Rewards, validator) are pinned nowhere. Commit and tag the exact tree, add those hashes to the manifest, and have the rollout scripts refuse an artifact whose sha differs from the manifest (today only RaffleFactory is pinned, by a unit test).
- The live Staking program matches no commit; its source of truth is unknown.

## Test gaps

1. Phase 2a/2 rehearsal with the deployed DAO wallet program (`f59520de0e45`) as the DAO wallet (S-1).
2. New StakingPool child against the deployed Staking 3642366153 and Rewards v1 bytes: SOFT `removeEntry`, zero-paid `finalizeDistribution`, `reclaimRound(close)` (ROLLOUT-1).
3. Compat coverage for the ride-along pairs: HyperSwap ↔ deployed HyperSwapPlugin, PollFactory ↔ live polls/PollPlugin, Staking ↔ deployed StakingPlugin/staking gates, SocialImpact/Moderation ↔ deployed social sub-gates.
4. Resume of a proposal-read Phase 2 proposal after `--target AkitaDAO` (ROLLOUT-4).
5. A guard test that `update-wallet-factory.ts` (child-only) refuses an un-upgraded factory (ROLLOUT-3).
6. TestNet sha256 comparison against the deployed-ABI snapshot (spec §9.5 step 2, still pending).

## Checked and OK

- No in-place target grows its global schema; declared keys ≤ schema for every target and child; local schema 0/0 everywhere.
- Page growth is legal on MainNet v42; the new plugin passes the current schema on every size change (go-algorand resets the schema to the txn's values otherwise).
- AVM versions: every v11 target gets a v11 clear program; the v13 wallet gets a v13 clear from the new factory's `compileArc4`.
- Update auth: every in-place target's `update` requires `Txn.sender == DAO wallet` and `callerApplicationId == pal.update` (`upgradeable.ts:33-43`, `dao/contract.algo.ts:877-884`); wallet update = admin or factory when allowed (`account/contract.algo.ts:848-858`); no bare Update/Delete routes.
- DAO globals/boxes: only additions (`t`, `b`, `u`, `guild_fees`, `bootstrap_key_count`); proposal/execution box layouts unchanged; new DAO ↔ live validator selector-compatible; old update grant on the DAO wallet is unrestricted (empty method list), so the copied grant allows `setClearProgram`/`updateAppWithSchema`.
- Wallet, Escrow, Poll, Listing layouts: unchanged or rev-gated; new callers only use selectors the live children route.
- Factory `bc` boxes on MainNet hold exactly the HEAD children (wallet, StakingPool, Auction, Raffle, Listing).
- Removed-selector scan over 210 live programs: only K2, K6, HyperSwap `accept` (ROLLOUT-2) and selectors with no live caller (StakingPool `gateCheck(appl,…)`, Raffle `getState`, PrizeBox `deleteApplication()`).
- PollFactory legacy `deletePoll` stays solvent: the deleted poll's released MBR (~863,500 µA) covers most of the 963,500 µA refund.
