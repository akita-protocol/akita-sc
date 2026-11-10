# Fix run decision trail (2026-10-05)

Request: Kyle, "lets fix all of them" after the production review (audits/review-2026-10-05).

## Frame
- Done when: every Critical/High/Medium finding (29) is fixed or explicitly not-done with a reason; each fix
  has a regression test; the full akita-sc suite (`npm test`, under the LocalNet lock) is green against the
  baseline; nothing committed or deployed.
- Baseline: memory records the full suite green on this tree today (2,398 pass / 0 fail / 9 todo / 1 skip,
  lane pr-final). No files changed between that run and the review start (find -newer check, 10:02).
- Rollback: scratchpad/fix/pre-fix-snapshot.tgz (869 uncommitted source paths, pre-fix state).
- Rigor: high. New apps are one-way doors once deployed; live apps upgrade in place.

## Scope calls
- In scope: Critical/High/Medium + the five decisions, with the recommended default from each finding.
- Out of scope this wave: 42 Low + 42 Info. Offered as a follow-up wave.
- Decision defaults applied:
  - GUILD-1: Guild treasuries do not auto-update (automaticUpdates=false).
  - SUBGATE-1: short grace of min(1 day, interval/4) instead of a full unpaid window. A strict rule would cut
    access at every boundary until a keeper triggers.
  - DAO-R3: revoke creator-era grants before initialize(); contract refuses caller-scoped bootstrap grants.
  - STAKE-3/4: drop usedMbrCredits; add plugin withdraw/close paths and a v1 credit-withdraw script.
  - SOCIAL-2: no referral on up-votes/reacts under legacy terms.
- TRADE-1: the routing fix only. The shared getControlledSpendingAccount stays as is (touches every plugin;
  forged-wallet hardening is the Low SUBGATE-2 class, next wave).
- ROLLOUT-5's `--skip-wallet-child` canary conflicts with ACCT-3 and is dropped.

## Execution
- Main tree, edited in place (Kyle asked for no hidden worktrees). 7 lanes with disjoint file ownership:
  dex, dao, trade, stake, plugins, social, rollout. Builds serialised by a build lock; LocalNet by the
  shared cross-session lock. Rules: scratchpad/fix/LANE-RULES.md.

## Log
| time | event |
|---|---|
| 11:10 | 7 lanes launched (Opus, high effort; Fable unavailable until Oct 9) |
| 11:32 | dex lane done: DEXEXT-1/2 fixed in hook only (pendingSell marker, per-asset totals, solvency asserts). Coordinator reviewed diff: OK. 38/38 launch-hooks e2e, regression tests failed on old code. |
| 12:28 | stake lane done: STAKE-1 one open round per pool; STAKE-2 HARD needs lastUpdate < round start (lastDisbursementTimestamp set at startDisbursement), SOFT rejects Percentage/Shuffle; STAKE-3 usedMbrCredits dropped (SDK decodes both layouts); STAKE-4 plugin withdraw/close with create-pinned legacyRewards + v1 withdraw script. 180/180 family specs. Coordinator spot-checked STAKE-1/2: OK. Open cross-lane: launch-hooks spec hard-codes REWARDS_TOP_UP 3_200 (5 fails), compat D read budget 10267>10240 on factory upgrade (owner unknown). |
| 12:28 | plugins lane done: MISC-1 NFD purchase maxPrice (+ renew/autoRenew caps, MISC-S1); MISC-2 haystack scan stops at next call to this plugin (each input single-use); GUILD-1 automaticUpdates=false. 131 tests pass; Haystack + Guild regressions failed on old build. Coordinator reviewed haystack fix: OK. Residual: autoRenew cap is caller-chosen on Global/agent grants (per-wallet stored cap not built). |
| 12:32 | trade lane done: TRADE-1..6. 10/10 regressions failed before, pass after. Auction child now 8,229 B (5 pages, +0.1 ALGO MBR per auction); AuctionFactory needs >= 14,800 µA top-up before child push; child push needs new Update plugin. Raffle sha pin needs whole-tree rebuild. |
| 12:32 | social lane done: SOCIAL-1 (hinted route by remainder receiver; legacy plugins keep old route; residual: manual opt-out still re-charges), SOCIAL-2 (no referral on legacy up-votes/reacts), SUBGATE-1 (+SUBGATE-4) single subscriptionPaidUp helper, grace min(1d, interval/4). Coordinator reviewed helper: OK. Regressions not run on old code (inferred). AkitaSocial 11,020 B, schema/ABI unchanged. |
| 12:36 | dao lane done: R1 (rekey must use Global no-escrow grant with useExecutionKey; lease window checked; isUpgradeLease expires; pal.update AddPlugin is upgrade class), R2 (locked-stake snapshot at submit; quorum miss -> Rejected), R3 (tracking 'g' box instead of refusing: fixture needs creator grants; off-chain revoke script, dry-run only), R4 (skip refund to 0-balance voter). 7/7 regressions failed before. 180/180. DAO 10,009 B, schema unchanged. Coordinator reviewed R1 plugin check: OK. |
| 12:39 | rollout lane done: ACCT-1 (sunset AVM 13, DAO wallet before DAO app, simulate first), ACCT-2 (one 11-txn group), ACCT-3/ROLLOUT-3 (child mandatory, childPushProblems, runUpdate refuses Phase 2 targets), ROLLOUT-1/2, MISC-6. rollout.test 53/53, sunset e2e all pass. Found: DAO wallet can't close while others hold its created ASAs (simulation now refuses); ACCT-6 (Low) blocks execute-deployer-sunset with wallet escrows. |
| 12:39 | coordinator: launch-hooks spec updated for STAKE-3 (REWARDS_TOP_UP removed, used = allocations*25,300). Running it. |
| 13:28 | coordinator: compat D root cause = execution windows simulated as admin before the DAO boxes exist; go-algorand counts every referenced box's size + large-program bytes at first box access; DAO-R1 grew DAO (+271) and Update plugin (+250) and used up the margin. Fix: one empty box ref (1 KB read quota) in UpdateAkitaDAOPluginSDK.upgradeReferences. A/B: without it compat 26 pass / 6 skip with "read budget exceeded (10267 > 10240)"; with it 32/32. |
| 13:28 | whole-tree build OK (contracts + SDK incl. d.ts). Full suite: 2,446 passed / 0 failed / 9 todo / 1 skipped (baseline 2,398). SDK unit 474/474. Principal mirror in sync. Spec: R-CREATOR corrected, §9.8 manifest generated by audits/review-2026-10-05/manifest.py. |
| 13:45 | Kyle pushed back on DAO-R3 ("half the power of arc58 is setting up automation before the guild exists"). Changed: bootstrap caller-scoped grants are recorded in the 'g' box as a public record but no longer count toward bootstrap_key_count, so initialize() is not blocked; revoke script keeps grants by default (--revoke opt-in) and still always removes weak pal.update grants and leftover execution keys. DAO + update plugin + dao plugin + compat: 333/333. |
