# Fix plan — 2026-10-02 audit

Companion to [README.md](README.md). Per-family proposals (code sketches, ABI/SDK
impact, migration, regression tests) are in `fix-*.md` beside this file. Nothing
has been implemented; every code sketch still needs `npm run build` + tests.

## 1. Mainnet facts (read-only checks, 2026-10-02)

| App | Finding | Live state | Exposure |
|---|---|---|---|
| Rewards 3569556095 | C-1 | Deployed program contains `createAsaDisbursementFromGroup` (all 18 current selectors present). **No update method — cannot be upgraded.** 21 disbursements with open allocations, all created by `I3SHCU7Z…` (auth → DAO wallet), all "Welcome AKTA" / "Welcome Sticker Pack", expiry 2100-01-01 (creator cannot reclaim). | 16,000 AKTA (8 × 2,000), ~140 sticker NFTs, ~30.8 ALGO free balance. Low monetary value; breaks Welcome gifts for 166 recipients. |
| HyperSwap 3569558555 | C-3, HS-02 | `offer_cursor = 0`, app account never funded. | None today. Fix before first use. |
| DAO 3569556034 | DAO-01 | `initialized = 0` (Draft). All 168 proposals are bootstrap (`votingTs = 0`); 167 Executed, #107 Approved (UpgradeApp walletFactory, execution window rounds 61,455,057–61,455,798 long expired → inert). | Creator is the de-facto governor today. DAO-01 fix must ship **before** initialization. |

## 2. Hard constraints found while planning

- **Program size — 16 KB as of AVM 13 (corrected; reviewers assumed 8 KB).**
  Update calls may now also change `extraPages` and the global schema. So
  the byte-trimming in the Social/StakingPool/wallet proposals, and the "reuse
  existing state keys" workarounds for Auction/Raffle/StakingPool children, are no
  longer required. Remaining plumbing to make >8 KB / schema changes reachable:
  - Every boxed-bytecode loader/updater splits approval into **2 × 4096-byte
    chunks** (`MAX_AVM_BYTE_ARRAY_LENGTH`; 15 sites incl. `UpdateAkitaDAOPlugin`,
    wallet factory `updateWallet`, `utils/base-contracts/factory.ts`). Generalise to
    N chunks.
  - Update inner txns must pass `extraProgramPages` (and schema when growing);
    PuyaTs 1.3.1 `itxn` supports both. The extra-page / schema MBR on update is
    charged to the app's creator (the factory for children, the creator for
    top-level apps) — fund before upgrading.
  - Factory child creation hard-codes `extraProgramPages: 3`; derive it from size.
  - Mainnet `UpdateAkitaDAOPlugin` is immutable and does only 2 chunks with no
    pages/schema → the **new Update plugin (DAO-03) is a prerequisite** for any
    upgrade that grows an existing app past 8 KB or adds global state.
  - Existing per-user wallets were created with 3 extra pages; growing them goes
    through the (new) factory `updateWallet` path.
- **Immutable apps (fix = new app + registry switch):** Rewards, Gate + all 16
  sub-gates, EscrowFactory, DAO validator, every plugin (the wallet rejects plugins
  with update counter ≠ 0). Plugin redeploys require wallet re-installs.
- **DAO-upgradeable:** DAO, wallet, walletFactory, staking, subscriptions,
  social ×4, marketplace, prizeBoxFactory, auction/raffle/poll/stakingPool
  factories, HyperSwap. Auction/Raffle/StakingPool **children** inherit a DAO-gated
  `update` (pages/schema can grow via the new Update plugin); Listing/PrizeBox/Poll children do not.
- **Origin-spoofing fix (ACC-01/SG-04)** lives in a shared helper, so every
  consumer must be rebuilt and upgraded; existing gated children keep old code
  unless individually upgraded.

## 3. Shared building blocks (implement once, reuse)

| Helper | Where | Used by |
|---|---|---|
| `getWalletIDUsingAkitaDAO` creator check (wallet app must be created by DAO's wallet factory) + `originOr` auth-addr check | `utils/functions.ts` | ACC-01, SG-04, SG-03/05, H-5, auction/marketplace/raffle/pool gates, social tips |
| `assertBoundPayment` / `assertBoundAssetTransfer` (sender, no clawback, no close, no rekey) | `utils/functions.ts` | SG-11, HS-03, PL-04, C-1, MKT-04, S-09, DAO-07 |
| `refundReleased` (refund = factory balance delta + min-balance released, capped at recorded deposit) | `utils/base-contracts/factory.ts` | MKT-03, AR-09, AR-13, PL-01, PB-02, staking-pool delete |
| `sendReferralPaymentFor(dao, account, …)` | `utils/functions.ts` | AR-10, Listing referral (I-1) |
| `sendToAkitaEscrow` | `utils/functions.ts` | AR-06, AR-02 |
| guarded `refund()` (closed receiver → treasury) | guild core; reusable by DAO | Guild L-2, DAO vote refunds |
| `getControlledSpendingAccount()` | `utils/functions.ts` + `@akta/plugin` | F5, new plugins |

## 4. Release waves

Each wave is code + tests in this repo, then a DAO proposal set. Waves 1–2 are
urgent; later waves can be batched per contract to minimise upgrades.

**Wave 0 — shared helpers** (no deploy on their own): §3 table, plus N-chunk bytecode loading and `extraProgramPages`/schema on update (§2).

**Wave 1 — live criticals**
- Rewards v2 (C-1, H-3, M-4, L-1, `cancelDisbursement`, sender binding) — new app.
  Welcome plugin and any Rewards consumers must point at v2; keep v1 claimable.
- HyperSwap upgrade (HS-01+02+03+04) before any offer exists.
- Sunset (F1 + F6) — code only, low priority per Kyle.

**Wave 2 — protocol-wide authz**
- ACC-01 origin fix → rebuild & upgrade: subscriptions, social, marketplace,
  factories (+ reload child bytecode), HyperSwap; upgrade live gated
  auction/pool children (decision A-1).
- Social S-01/02/03 + S-08 (one Social upgrade + new Social plugin, one proposal).

**Wave 3 — per-contract cleanups (one upgrade each)**
- Subscriptions: SG-01, 02, 05, 08, 09, 11, 12.
- Marketplace factory + Listing bytecode: MKT-01, 03, 04, 05, 06, 07, 09(factory), I-2, I-4. PrizeBoxFactory: PB-01, PB-02.
- Auction/Raffle factories, then plugins, then live children: AR-01…15.
- PollFactory: PL-01, 02, 04.
- Staking: H-1 (staking side), M-2, M-3, L-2, L-3, DAO-05. Then staking-pool child + live pools: H-1…H-6, M-1, (M-5 later).
- Wallet: ACC-02, 03, 04, 05, 06, 08, 10a (+ ACC-10e decision); DAO wallet UpdateWallet.
- DAO: validator redeploy → new Update + DAO plugins → DAO upgrade (DAO-01…12).

**Wave 4 — new apps**
- Gate v2 + new sub-gates (SG-03, 06, 07, 10, 13, 14, 15, 16) with legacy-ID import.
- Revenue Manager v2 (F2, F3), NFD plugin v2 (F4 + F5), Marketplace plugin v2 (MKT-02, 09), Auction/Raffle plugins v2 (AR-12, 14), Social plugin v2.
- Guilds (not on mainnet): L-1, L-2, I-1, I-2, I-3; L-3 with DAO-05.
- PluginDex (not deployed): resolved by the PluginDex v2 rewrite (2026-10-03). PD-01 is moot and PD-02 is handled by per-pool escrows, the custody guard and version-pinned, admin-approved hooks (see M-6 below and the status notes in fix-marketplace.md).

## 5. Decisions — recommended defaults

Reply "approve all" or list overrides by ID. Details and alternatives are in the
named `fix-*.md`.

**Urgent**
- **U-1 Rewards v1 funds** (fix-staking D-1): recommend **ship Rewards v2 + repoint Welcome, then notify the 166 recipients to claim**; no white-hat drain (value is low and it would itself be a mainnet exploit of our own app).

**Account (fix-account.md)**
- A-1 Upgrade live gated auction/staking-pool children after ACC-01: **yes, inventory gated ones and upgrade them.**
- A-2 coverFees grants require `cooldown > 0`: **yes.**
- A-3 Remove "anyone can reclaim" on global grants (flip `reclaim.e2e.spec.ts:180`): **yes**; SDK `canReclaim` default → false.
- A-4 Co-admins cleared only on admin-plugin admin change: **yes.**
- A-5 Keep wallet auto-update default; deployer loses bytecode init once DAO exists: **yes.**
- A-6 Passkeys require user verification (not just presence): **yes.**
- A-7 Restore 30/12 global schema reservation (+~1.04 ALGO per new wallet): **yes.**

**DAO (fix-dao.md)**
- D-1 Bootstrap: proposals unexecutable after init, ChangeAdmin banned in bootstrap, bootstrap keys expire ≤10k rounds (1B): **yes.**
- D-2 Per-field UpdateFields classes; app lists/assets/`upgrade_app_ps`/`revenue_splits` = upgrade class: **yes**; apply same rule to Guild `SetProposalSettings`.
- D-3 Bind upgrades to UpgradeApp leases in a new Update plugin now (3A); wallet-level key→plugin binding later (3B): **yes.**
- D-4 Vote weight = raw locked min(AKTA,BONES) counting only locks outlasting the vote (4A): **yes.**
- D-5 Max-lock changes DAO-only for governance assets (else bounded 2w–4y): **DAO-only.**
- D-6 No sponsored votes (payment sender = voter): **yes.**
- D-7 Legacy voted proposals non-deletable; proposer-only `cancelProposal`; no expiry: **yes.**

**Guilds (fix-guilds.md)**
- G-1 Subscription power = paid-up at the moment of propose/vote (B): **yes.**
- G-2 Cap `minimumApprovals` increases at the guild level for all policies: **yes.**
- G-3 Offering cap 64: **yes.**
- G-4 Refunds to closed accounts forfeit to treasury: **yes.**
- G-5 Staking max-lock non-decreasing + docs (shared with D-5): **yes.**
- G-6 Bootstrap execution creator-only: **yes.**

**Staking / Pools / Rewards (fix-staking.md)**
- ST-1 NONE pools weight 1; typed pools re-validate stake each round: **yes.**
- ST-2 Rewards v2 tops up an existing allocation instead of rejecting duplicates: **yes.**
- ST-3 Minimal shuffle rewrite (commit-after-prep VRF, persisted cursor): **yes.**
- ST-4 Heartbeat manager set by DAO wallet via staking plugin: **yes.**
- ST-5 Clamp SOFT stake to current balance at read time; recommend hard/lock for high-value pools: **yes.**
- ST-6 With 16 KB + schema growth, implement M-5 inside the pool (no trimming / no shared rewards app needed): **yes.**

**Social (fix-social.md)**
- S-1 Byte budget: moot with 16 KB — still remove the dead empty-post code (it is also a bug), keep `getVotes` and the `editVote` flip: **yes.**
- S-2 `initMeta` strictly self-only: **yes.**
- S-3 Did working-tree `initMeta(user)` ever deploy? Mainnet social is 0.0.2 (pre-regression) — **assume no; I will confirm against bytecode.**
- S-4 Legacy 16-byte key cutoff as compile-time constant; decide tally repair after a mainnet prefix-collision scan: **yes.**
- S-5 Gated walls remain un-votable: **yes.**
- S-6 Charge exactly the referral actually spent + DAO top-up: **yes.**
- S-7 Exclude spot AKTA/NFT balances from the social-only impact path: **yes.**
- S-8 Full sender binding (bytes no longer a constraint): **yes.**

**Subscriptions / Gates (fix-subs-gates.md)**
- SG-A Gate v2 with sealed one-shot legacy import, IDs from 2^32: **yes.**
- SG-B Defer escrow solvency ledger: **yes.**
- SG-C Scan for inflated streaks; add `resetStreak` only if abuse found: **yes.**
- SG-D Subscription gate takes `(subscriber, subId)` with ownership check: **yes.**
- SG-E Family passes don't count for gates (for now): **yes.**
- SG-F Runtime auth-addr check in `originOr`: **yes.**
- SG-G Inventory wallets from older factory IDs before any allowlist: **yes.**
- SG-H Root NFD owner passes its own root gate: **yes.**
- SG-I Re-check gate for subscriber on every trigger: **yes.**
- SG-J Fixed layered AND/OR semantics now: **yes.**
- SG-K Reprice passes with a cutoff (legacy keeps old refund): **yes.**
- SG-L Reserve max service MBR up front: **yes.**
- SG-M DAO sub-gate allowlist + per-filter cost cap: **yes.**

**Marketplace / PrizeBox / PluginDex (fix-marketplace.md)**
- M-1 `maxPrice` in plugin **and** price-change cooldown: **both.**
- M-2 Settlement-time MBR paid by seller from deposit; legacy listings keep full refund: **yes.**
- M-3 PrizeBox rejects clawback-enabled assets: **yes.**
- M-4 Royalties advisory for now: **yes.**
- M-5 PrizeBox opt-in MBR → current owner; creation MBR → minter: **yes.**
- M-6 PluginDex hooks get no account control + allowlist: **superseded.** Kyle chose per-pool escrows with admin-approved flash-rekey custody hooks in the PluginDex v2 rewrite (2026-10-02, separate session). PD-01 is moot in v2 (the DEX account is never rekeyed); PD-02 is handled by that design, not by this audit.
- M-7 Settlement referral → seller's referrer: **yes** (same as AR D4).

**Auction / Raffle (fix-auction-raffle.md)**
- AR-A Commit VRF at first post-end call + 8 rounds, re-commit forward only: **yes.**
- AR-B Zero winner weight; reject consecutive self-outbids when `startingBid > 0`; legacy no-loser pool → DAO escrow: **yes.**
- AR-C Add a minimum-participation setting now that schema can grow on update: **yes** (was "defer").
- AR-D Reimburse legacy stranded weights MBR from treasury (no rescue method): **yes.**
- AR-E Raffle gates check origin like Auction: **yes.**
- AR-F Make the test-only mock beacon controllable: **yes.**
- AR-G Upgrade all live children, not only stuck ones: **yes.**

**Meta / HyperSwap / Poll (fix-meta-swap-poll.md)**
- H-A Terms commitment as a new `accept` argument (needs HyperSwap plugin redeploy; plugin has no live offers): **A.**
- H-B Expiration cap 30 days: **yes.**
- H-C Permissionless disburse once fully funded: **yes.**
- H-D Pin registry per offer (with H-A): **yes.**
- H-E Old polls: factory absorbs the stranded 0.1 ALGO: **yes.**
- H-F Impact polls: document limitation: **yes.**

**Plugins / Sunset (fix-plugins-sunset.md)**
- P-1 Revenue Manager config DAO-wallet-only: **yes.**
- P-2 Undeliverable split shares stay in escrow; add DAO-only `skipEscrowAllocation` + `updateSplits`: **yes.**
- P-3 Sunset: accept the auto-update window after confirming no valuable auto-update wallets exist: **yes** (low priority).
- P-4 NFD `renew` stays permissionless; confirm owner key name against a live NFD: **yes.**
- P-5 Add `getControlledSpendingAccount`, leave `getSpendingAccount` permissive: **yes.**

## 6. Execution approach once approved

1. Implement Wave 0 + Wave 1 in this repo, family by family, each with its
   regression tests; `npm run build`, rebuild `akita-sdk` dist, run focused suites,
   then the full `npm test`.
2. Report per-family results (what ran, what failed) before moving on.
3. Mainnet deploy scripts / DAO proposals are prepared but **not executed**;
   each mainnet write needs your explicit go-ahead with sender + network.
