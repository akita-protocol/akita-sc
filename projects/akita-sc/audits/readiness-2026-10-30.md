# Production readiness pass — 2026-10-30

Scope: akita-sc working tree as of Oct 30 (including all uncommitted changes), the shared SDK
(`projects/akita-sdk`), and TestNet rollout tooling in dry-run mode. Nothing was committed, deployed,
proposed or sent to TestNet or MainNet.

## Verdict

**Not ready to ship as is.** One regression introduced in this session's changes is High severity
(fee draining through coverFees grants) and must be fixed or explicitly accepted before the account
program ships. Two Medium findings on the new shared Guild plugin need a decision. The full test
suite is green (section 1). Of the 83 findings left open by the Oct 5 review, 5 are now fixed, 14 are
partly fixed, 10 are accepted by design, 52 are still open and 2 could not be judged from the repo
(section 3); every one of them is Low or Info.

## Must fix or decide before production

| # | Severity | Where | Problem | Suggested fix |
|---|---|---|---|---|
| 1 | **High** | `smart_contracts/arc58/account/contract.algo.ts:1078-1100`, `_addPlugin` `:1154-1239` | The ACC-02 install guard is gone: a coverFees grant no longer needs a cooldown or a specific caller. On a Global (any caller), non-execution-key coverFees grant anyone can send top-level `[rekeyToPlugin(fee=272,000), verifyAuthAddress]` windows, up to 8 per group, and be repaid 0.272 ALGO each from the spending account. The attacker breaks even; the wallet loses ~2.18 ALGO per group, without limit (a 47 ALGO wallet empties in ~22 groups). Found independently by two reviewers. `account-fixes.e2e.spec.ts:101` now asserts the unguarded install. | Restore the guard (coverFees needs `cooldown > 0` and a specific caller or an execution key), **and** see #2. Or record an explicit decision to accept it. |
| 2 | Medium | `contract.algo.ts:569` (`lastCalled` only stamped per plugin app call) | A window with no plugin call still gets the reimbursement and never stamps `lastCalled`, so even with the guard back a designated caller (e.g. a leaked agent key) is not rate limited. The documented "≤ 0.272 ALGO per cooldown" residual does not hold. | Stamp `lastCalled` whenever a reimbursement is paid, or require ≥1 plugin call in a coverFees window; cap the refund at the wallet's real cost instead of 272 × min fee. |
| 3 | Medium | `smart_contracts/arc58/plugins/guild/contract.algo.ts:40-42` vs `:62-68` | The shared (guild = 0) Guild plugin acts on **every** factory Guild: the wallet only checks the plugin app id, never the `guild` argument. Its doc comment says "creation only". The apps' new member-proposal feature relies on this wildcard, so the behavior is wanted, but a grant given to an agent "for creating guilds" also lets it vote and execute in every Guild the wallet belongs to. | Fix the doc, and have the SDK/apps recommend method restrictions when the grant goes to anyone other than the admin. Alternative: split creation and participation into two plugins. |
| 4 | Medium | same file `:194-207, :217-225, :323-337, :363-378, :434-443` | The plugin pays whatever the Guild app reports (`voteMbr`, `proposalCost().total`, `consensusConfigurationMbr`, `setupCost`). A Guild that its members later upgrade (UpgradeApp keeps `creator == factory`) can report any amount, and one vote then sends an arbitrary amount of the voter's ALGO. The shared install widens this to every Guild. | Add a caller-chosen `maxPayment` and assert each payment is within it (the SDK fills it from a read). |
| 5 | Low | Rewards plugin `:382, :405, :420`; Guild plugin `:14` (every method) | New methods use the unchecked `getSpendingAccount(wallet)`. A fake "wallet" app whose `spending_address` is the plugin's own address makes the plugin act as itself and rekey its own account to the attacker (plugin account only; not transitive to wallets). Existing plugin methods share the pattern (F5 adoption never finished). | Use `getControlledSpendingAccount` everywhere. |

Two rollout-ordering constraints the dry-runs and reviewers surfaced (both are encoded in tooling
already, listed so they are not missed):

- **AkitaSocial must not be upgraded before `aal.rewards` points at Rewards v2.** The new social code
  calls `createInstantDisbursement(..., reclaimTo)`, which Rewards v1 does not route; every referred
  post, reply, vote and react would revert.
- **AbstractedAccountFactory needs Rewards v2 first** (`createInstantDisbursement` missing on TestNet
  Rewards 763128244) and **must be upgraded together with its AVM 13 child** (the dry-run guard refuses
  otherwise).

## 1. Full test suite

`npx vitest run` on LocalNet, whole suite: **153 files passed, 1 skipped; 2,557 tests passed, 1 skipped,
9 todo; exit 0** (34 min). No test was skipped or disabled for this pass. The skips are pre-existing
`.skip`/`.todo` markers in the tree: `arc58/account/backend-hosted-agent-identity-payment.e2e.spec.ts`
(whole file, 1 test), and the todo/skip entries inside `akita-router.e2e.spec.ts` (3),
`plugin-dex/hooks/backrun-arb.e2e.spec.ts` (1) and `social/social.e2e.spec.ts` (5).

Note: the suite passes with the High finding #1 in place, because `account-fixes.e2e.spec.ts:101` now
asserts the unguarded behavior.

## 2. TestNet dry-runs (no transactions)

`rollout-status` on TestNet: DAO 763128236, state 0 (Draft). Nothing past Stage B has run; Phase 2a
(new Update plugin) is the first runnable step. Every script below was run with `--network testnet
--dry-run`; dry-run mode loads no key and its signer throws, so nothing could be sent.

| Script | Result |
|---|---|
| principal-phase2a-update-plugin | OK — plans UpdateFields pal.update, AddPlugin (global, execution key), RemovePlugin 763128671 |
| update-dao | OK — 5 ABI methods added, 0 removed; DAO wallet sponsorship 3.5925 ALGO |
| principal-phase2-upgrade-targets (Subscriptions, Marketplace, AuctionFactory, RaffleFactory, StakingPoolFactory, AkitaSocial, AkitaSocialGraph) | OK — all "planned" |
| update-account-factory / update-wallet-factory | OK (planned), with the two ordering guards above |
| update-poll, update-hyper-swap | OK — HyperSwap `accept` removal flagged as an accepted decision (ROLLOUT-2) |
| update-staking, update-social (socialImpact, socialModeration), update-prize-box | OK — DRY RUN COMPLETE |
| update-dao-wallet, update-automatic-wallets | OK — DAO wallet 763128598 stays 1.0.1 (factory not yet upgraded) |
| update-dao-wallet-plugins | OK — 1 batch, 2 grants, 4 actions, MBR 286,700 µALGO, all simulations passed |
| update-guild-creation-cost | OK — guild_fees unset → 0 |
| update-wallet-creation-cost | OK, but note the script's **default fee is 1,000,000 ALGO** (documented as a temporary block). Running it without `--cost` sets that fee. |
| update-subscriptions / -marketplace / -auction-factory / -raffle / -staking-pool | Refused by design: Phase 2 targets must use `principal-phase2-upgrade-targets` (done above) |
| update-meta, update-children, update-dao-app-list | Need receipt ids / arguments that TestNet does not track; not run |

Logs: `/private/tmp/claude-501/-Users-kylebreeding-akita/db2dee5e-3488-43e0-a7b6-57daec4971a1/scratchpad/audit/dry/`.

## 3. Oct 5 review: status of every open finding

The Oct 5 fix wave deliberately left all Low and Info findings out of scope
(`fixes/DECISIONS.md`); none of the 83 below is above Low.

### Account, DAO, rollout (18)

| ID | Sev | Status | Evidence |
|---|---|---|---|
| ACCT-4 | Low | Open | Plugin installs run before C is rekeyed to the wallet (`arc58/account/factory.algo.ts:205-226` vs `:252-261`) |
| ACCT-5 | Low | Open | Recovery clears only `domain`; setting it back re-enables old `domainKeys` (`contract.algo.ts:979-981, 381-386`) |
| ACCT-6 | Low | Open | `Escrow.delete` pays from a rekeyed escrow with no rekey-back step (`escrow/contract.algo.ts:27-34`); sunset step still scheduled |
| ACCT-7 | Info | Fixed (moot) — but caused finding #1 above | cooldown guard removed |
| ACCT-8 | Info | Open (no fix intended) | `resolveCallerType` Admin path |
| ACCT-9 | Info | Accepted (F8) | unauthenticated revoker |
| ACCT-10 | Info | Open | `assignDomain` lacks `caller != controlledAddress` (`contract.algo.ts:1297-1310`) |
| ACCT-11 | Info | Accepted; live MainNet state not checked | bootstrap grants |
| DAO-R5 | Low | Open | bootstrap proposal execution has no creator check (`dao/contract.algo.ts:1309-1320`); #107 not deleted by tooling |
| DAO-R6 | Low | Open | validator does not check UpgradeApp `app != 0` / lease (`dao/validator.algo.ts:52-59`) |
| DAO-R7 | Info | Partial | power capped (`validator.algo.ts:263-265`); asset/app-list values still only decoded |
| ROLLOUT-4 | Low | Partial | `runUpdate` resume fixed; Phase 2 resume still picks binding from current DAO mode (`scripts/lib/principal-rollout-run.ts:700-711`) |
| ROLLOUT-5 | Low | Partial / accepted | canary dropped by decision; `--unname-aliases` has no selector check |
| ROLLOUT-6 | Low | Fixed | `update-meta` requires `--meta-app-id` |
| ROLLOUT-7 | Low | Partial | Phase 2 targets declare deps; standalone deploy scripts have no readiness check |
| ROLLOUT-8 | Info | Addressed in tooling | rollout-status orders DAO initialize last; no contract guard |
| ROLLOUT-S1 | Info | Open | mainnet fixture has no DAO wallet program |
| ROLLOUT-S2 | Info | Fixed in this SDK | `newPoolCost` read from chain |

### Guild and misc (16)

| ID | Sev | Status | Evidence |
|---|---|---|---|
| GUILD-2 | Low | Open | per-code and per-plugin settings never re-checked against member power after removals (`fixed-signers/contract.algo.ts:299-303`) |
| GUILD-3 | Low | Partial | consensus program names still first-come; deploy script now detects a squat (`scripts/lib/guild-deployment.ts:87-101`) |
| GUILD-4 | Low | Open | only the proposer can invalidate a stuck proposal (`core/contract.algo.ts:1147-1155`) |
| GUILD-I1 | Info | Accepted | approved proposals never expire |
| GUILD-I2 | Info | Open | subscription offerings' interval/amount/title unchecked |
| GUILD-I3 | Info | Accepted | revoke path wallet-wide |
| GUILD-I4 | Info | Open | no optInEscrow / setBio / setFactoryUpdateSettings actions |
| GUILD-I5 | Info | Cannot tell | depends on MainNet Phase 2/3 state |
| GUILD-I6 | Info | Partial | same as GUILD-3 |
| GUILD-I7 | Info | Open | approval 0 / 100% hazards undocumented |
| MISC-3 | Low | Open | RevenueManager Flat split reverts when balance < value (`revenue-manager/contract.algo.ts:472-486`) |
| MISC-4 | Low | Open | RevenueManager pays managed-asset box MBR; no unmanage path |
| MISC-5 | Low | Open | HyperSwap `accept`/`escrowAsa` payor not bound to sender (also `offer`, `:254`) |
| MISC-7 | Info | Open (advisory) | Welcome wallets `automaticUpdates = true` |
| MISC-S1 | Info | Partial | NFD auto-renew `maxPrice` is caller-chosen |
| MISC-S2 | Info | Cannot tell | depends on production router TEAL |

### DEX core and extensions (17)

None fixed since Oct 5 (only DEXEXT-1/2 changed). DEXCORE-1 (fee rounds down), -2 (clawback assets
brick a pool), -3 (single-step `setAdmin`), -4, -5 open; -6 open/partly accepted; -7 partial; -8 and -9
accepted. DEXEXT-3 partial; -4, -5 (`volatility-fee` divides by zero on an empty pool), -7, -S1 open;
-6, -S3 accepted; -S2 partial. New: the DEXEXT-2 residual is still reachable through DEXEXT-3's stranded
sell tax (bounded by MBR); `defaultBinPoolParams` defaults to the dust floor; the router and several
plugin-dex specs are untracked in git.

### Social, subscriptions, gates (16)

SOCIAL-3 fixed (Rewards v2 only, needs a sweep keeper). SOCIAL-4, -5, -6, -I1, -I2, -I3, -I5 open;
SOCIAL-I4 partial; SOCIAL-I6 accepted. SUBGATE-2, -3, -5, -6, -7, -8 open. New: SUBGATE-7's proposed fix
would misclassify same-second subscriptions; fully claimed referral disbursements need someone to call
`sweepExpired` (no script exists).

### Staking and trading (16)

STAKE-S1 fixed. STAKE-5, -6, -7, -8 (narrowed), -S2 open. TRADE-L4 partial, TRADE-I2 partial (source
fixed, MainNet plugin not moved), TRADE-L5 accepted; TRADE-L1, -L2, -L3, -L6, -L7, -L8, -I1 open
(TRADE-I1 confirmed live: MainNet PrizeBox factory 3569557972 holds 0 ALGO). New: prize boxes can still
carry freeze-enabled ASAs into auctions/raffles (closes with TRADE-L7); `abortRound` mode 0 also skips
the reserve check.

## 4. This session's contract changes — security review

| Change | Result |
|---|---|
| ACC-02 removal (account coverFees) | **High + Medium**, see #1 and #2 above |
| PluginDexPlugin | No material finding: spoofed wallets fail (`getControlledSpendingAccount`), rekey-back on every path, no grant changes, pool inputs Vault-derived |
| Rewards inbox merge | Low (#5). Claim/reject are authenticated by ARC-59 itself; `inboxRouter` has no setter and wallets refuse updated plugins |
| Shared GuildPlugin `createGuild` | Medium #3 and #4, Low #5. Sound: non-factory apps rejected, Guilds gate actions by sender, the instant draft proposal grants nothing a draft creator lacks, payments go only to factory/Guild-owned accounts, rekey handed back on every path |
| Member proposals (SDK only, no contract change) | New SDK helpers + 2 LocalNet tests; 135 related contract tests re-run green after the SDK build-path changes |
