# STAKE slice: Staking, Staking Pool, Rewards, and the staking/pool/dual-stake/rewards plugins

Reviewer: production-readiness review, 2026-10-05. Working tree is HEAD `e7f174ee` plus uncommitted changes.
Paths are relative to `projects/akita-sc/smart_contracts/` unless stated. Read-only: nothing was built, edited, or sent.
MainNet facts come from public algod/indexer reads (scripts in `scratchpad/review/stake/`).

## Verdict

**ISSUES.** The C-1 fix in Rewards v2 is correct: one funding block can no longer back two calls.
However, the slice still has two High findings and two Medium findings that should be fixed or explicitly accepted before rollout.

## Scope

| File | Lines |
|---|---|
| `rewards/contract.algo.ts`, `base.ts`, `types.ts`, `constants.ts` | 628 / 13 / 61 / 9 |
| `staking/contract.algo.ts`, `constants.ts`, `types.ts`, `base.ts`, `errors.ts` | 1,152 / 21 / 122 / 14 / 59 |
| `staking-pool/contract.algo.ts`, `factory.algo.ts`, `base.ts`, `types.ts`, `constants.ts`, `errors.ts`, `compat.test.ts`, `compat/mainnet-programs.ts` | 1,905 / 282 / 27 / 109 / 147 / 108 / 160 / (data) |
| `arc58/plugins/rewards`, `staking`, `staking-pool`, `dual-stake` (`contract.algo.ts`) | 240 / 270 / 386 / 108 |
| Read-across: `utils/base-contracts/factory.ts` (156), `utils/programs.ts` (99), `utils/functions.ts` (assertBound\*, createInstantDisbursement, calcPercent), `utils/types/lib_pcg/pcg64.algo.ts`, `scripts/deploy-rewards-v2.ts`, compiled `artifacts/{rewards,staking,staking-pool}/*.arc56.json` | |

### MainNet state checked (2026-10-05)

- **Rewards v1 3569556095** (update counter 0, no update method). Free balance 30,760,700 µA. It holds 16,000 AKTA plus 14 sticker ASAs (11–13 units each). There are 146 disbursement boxes and 166 open allocation boxes: 8 AKTA allocations and 158 sticker allocations, spread over **13 distinct EOA addresses**. FIX-PLAN's "166 recipients" is really 166 allocations. The 145 Welcome disbursements were created by `I3SHCU7Z…` (auth → DAO wallet). Together they hold **21,327,900 µA of withdrawable `mbrCredits`**.
- **StakingPoolFactory 3569556570.** It has **never created a child**: indexer `applications?creator=<factory addr>&include-all=true` returns 0, and the factory has 2 txns, both payments. The approval program is 2,453 B with 3 extra pages. Global schema is 8 ints / 56 bytes.
- **Staking 3642366153.** Approval program is 6,511 B with 3 extra pages. Global schema is 1 uint / 2 bytes; `heartbeat_manager_address` is **unset**. Boxes: `totals(0)`, one SOFT stake (AKTA), and 8 app stakes, all for app 3569556973 (social impact). There are 0 heartbeat boxes. Free balance is 884,300 µA.
- **Protocol is v42.** `AppSizeUpdates` is on, `MaxAbsoluteExtraProgramPages` is 7, and `PerByteTxnSurcharge` is 100 µ per byte above 8 KB.

## Prior-finding verification

| ID | Status | Evidence |
|---|---|---|
| C-1 (Rewards group reuse) | **fixed** in v2 code. The **live v1 is still exploitable** (immutable). | `rewards/contract.algo.ts:339-343` binds the funding to `[groupIndex-count-1, groupIndex-1]`. Any other call's funding lies before that call's own appl, so the ranges can't overlap: an appl in the range fails the `gtxn.PaymentTxn`/`AssetTransferTxn` type check. Positional args are also disjoint. `assertBoundPayment` requires an exact amount, `sender == Txn.sender`, and no close/rekey (`:356`). Each transfer is bound (`:377-383`). Tests: `rewards.e2e.spec.ts:1604,1628`. |
| H-1 (direct `checkpointAppSoftStake`) | fixed | `staking/contract.algo.ts:706` lowers the amount only when `callerApplicationId === app`; a missing record returns invalid (`:699-701`). Pool compares `check.balance >= quantity` (`staking-pool/contract.algo.ts:700`). |
| H-2 (weight not bound to stake) | **partially fixed** | NONE weighs 1 (`:404-406`, `:1063-1065`). Typed pools need a stakeKey (`factory.algo.ts:93`, `contract.algo.ts:1058`). HEARTBEAT uses the manager average (`:741-752`). **HARD and SOFT weights can still be backed by one recycled balance → STAKE-2.** |
| H-3 (duplicate allocation) | fixed (effective only after the registry points at v2) | `rewards/contract.algo.ts:135-152` tops up an existing allocation. |
| H-4 (late sign-ups) | fixed for entries. **Bypassed for disqualifications by a concurrent reward → STAKE-1.** | `assertNoOpenRound` in `createPoolEntries:1001`, `removeEntry:1473`, `check:1721`, `gateCheck:1733`. |
| H-5 (gateCheck caller args) | fixed | `gateCheck` uses the stored `gateArgs` and the stored principal (`:1731-1772`). |
| H-6 (shuffle) | fixed for cursor, underflow, re-raffle, ticket space and seed timing. **Regressed by STAKE-1.** | `:631-679`, `:513`, `:1551`, `:1581` |
| M-1 | fixed | Empty rounds close (`:491-496`); single staker handled via `divw` (`:550`); `abortRound` added (`:1643`). |
| M-2 | fixed in code. Operational dependency (see rollout notes). | Empty heartbeats (`staking/contract.algo.ts:256-264, 344, 447`), `setHeartbeatManager` (`:748`), ALGO via `getHeld` (`:577`). |
| M-3 | **partially fixed** | `clampSoft` fixes stale SOFT reads for gates and `getInfo` (`:223-235`). Pool cycling across preparation batches remains → STAKE-2. |
| M-4 | fixed | claim requires `finalized` (`:509`); expiration 0 handled in claim (`:512`) and reclaim (`:558`); instant batches validated (`:422-453`). |
| M-5 | fixed, with the caveat in STAKE-5 | budgets, `withdrawReward`, `reclaimRound`, `removeEntry`, `closeReward`, `closeOutAsset`, `delete` |
| L-1 | fixed | expiry reset at settle (`:859-862`); `interval > 0`, `expiration >= 3600` (`:924`) |
| L-2 | fixed | `withdraw` refunds `StakesMBR` (`staking/contract.algo.ts:517-539`); `closeSoftStake`, `closeHeartbeat`, `releaseAppStake` (`:754-794`) |
| L-3 | fixed | `assertValidStakeType` (`:237-245`), factory type validation (`factory.algo.ts:85-92`), LOCK pools check expiry (`contract.algo.ts:716`) |
| Info items | fixed | `stakeCheck` uses `>` (`:1122`); creator-only `init` (`:129`); clawback rejected (`assertSafeAssetTransfer`, `assertBoundAssetTransfer`); plugin rejects empty batches; `raffle` asserts Shuffle (`:1551`) |

## New findings

### STAKE-1 — High — A second reward's preparation disqualifies entries mid-round, so Shuffle ranges shift (winner steering) or the round stalls

- **Location:** `staking-pool/contract.algo.ts`
  - `:1517-1537`: `startDisbursement` does not check for other open rounds.
  - `:467`, `:722`, `:751`: preparation writes `disqualified = true`.
  - `:648`, `:645`: Shuffle builds its ranges from the *current* flags and asserts `errShuffleExhausted`.
  - `:1556-1583`: tickets are public after `raffle`.
- **Scenario:**
  1. A pool has reward A (Shuffle) and reward B (any distribution, possibly another interval). Concurrent rounds are supported: see `staking-pool.e2e.spec.ts:3176`.
  2. The attacker holds k HARD or SOFT entries. A's preparation counts all of them, so `qualifiedStake` includes their weights, and A moves to Allocation.
  3. The beacon value for `activeDisbursementRoundStart + 1` is published, so the attacker computes the winning tickets off-chain.
  4. In one atomic group the attacker:
     - calls `startDisbursement(B)`;
     - withdraws or moves the stake of a chosen subset of their entries;
     - runs `disburseRewards(B, n)` over those entries, so `checkByID` marks them disqualified;
     - calls `disburseRewards(A, …)`: `raffle`, then allocation.
- **Effect:**
  - Every range after a disqualified entry shifts down by its weight. The attacker picks among 2^k ticket→entry mappings and keeps the one that lands most tickets on their remaining entries. This is theft of the Shuffle prize from other entrants.
  - Tickets in the top `Σ removed weight` of the ticket space match no range. The loop reaches `entryID` and reverts with `errShuffleExhausted`. The round stays stuck until the creator or the DAO calls `abortRound(…, 1)`. That call finalizes only the tickets already processed, which the attacker can order to include their wins.
  - While the round stays open, `removeEntry` is frozen for everyone (`:1473`).
- **Fix (pick one):**
  - Allow one open round per pool: `assertNoOpenRound()` in `startDisbursement`.
  - Or never persist a disqualification while another round is open (count the entry as invalid for this reward only).
  - Or snapshot per-round eligibility, for example a per-round bitmap or `entryID` plus disqualification epoch.

### STAKE-2 — High — Preparation checks each entry at a caller-chosen moment, so one balance backs many HARD or SOFT entries (M-3 / H-2 residual)

- **Location:**
  - `staking-pool/contract.algo.ts:451-479`: batch size is chosen by the caller of the permissionless `disburseRewards` (`:1587`).
  - `:681-724`: the check is an instantaneous `getInfo` (HARD) or `checkpointAppSoftStake` (SOFT).
  - `staking/contract.algo.ts:504-547`: a HARD withdraw has no lock or cooldown.
- **Scenario:** The attacker has capital C and k sybil entries in a HARD (or SOFT) pool, each entered with quantity C (the stake is also cycled at entry time). Each round:
  1. They call `startDisbursement`, then `disburseRewards(id, n)` up to sybil 1 while sybil 1 holds the stake.
  2. They `withdraw` (HARD) or transfer (SOFT) the tokens to sybil 2 and re-stake.
  3. They call `disburseRewards(id, 1)`, and repeat for each sybil. All of this can be one atomic group per few sybils.

  Every sybil is counted with weight C, and allocations are never re-checked (and must not be, per H-4). The attacker takes k× their fair Percentage or Shuffle weight, or k Flat/Even heads, from honest stakers.
- **Note:** FIX-PLAN ST-5 recommends "hard/lock for high-value pools". **HARD is not safe; only LOCK and HEARTBEAT are.**
- **Fix:**
  - HARD: require `info.lastUpdate < round start timestamp` (store the start timestamp; a re-created or topped-up stake then sits out one round).
  - SOFT: forbid Percentage and Shuffle (and document the sybil risk for Flat/Even), or require LOCK or HEARTBEAT for value-weighted rewards. Enforce this in `validateReward` or at the factory.

### STAKE-3 — Medium — The disbursement box MBR constant undercharges by 3,200 µA per disbursement. A Rewards v2 funded with only 100,000 µA breaks protocol-wide referral payouts.

- **Location:**
  - `rewards/constants.ts:8`: `MinDisbursementsMBR = 41_700`.
  - The real empty box is key `'d'+u64` (9 B) plus a 97 B `DisbursementDetails` value: 2,500 + 400·106 = **44,900** µA. The 8 B gap is `usedMbrCredits` (`types.ts:23`), added without updating the constant. MainNet confirms it: v1 box 66 is 162 B = 97 + 12 (title) + 53 (note).
  - The constant is used by `rewards/base.ts:10`, `createInstantDisbursement:428-453`, `createInstantAsaDisbursement:472-498`, `closeDisbursement:607`, the pool's `createRewards` (`staking-pool/contract.algo.ts:761`), and `utils/functions.ts:660-704`. That helper is used by auction, raffle and listing children and the referral helpers.
  - `scripts/deploy-rewards-v2.ts:37-38` funds v2 with 100,000 µA only ("disbursements fund their own boxes").
- **Scenario:**
  1. Rewards v2 is deployed and funded with 100,000 µA, and the DAO switches `akitaAppList.rewards` to it.
  2. The next ASA referral payout (auction claim, listing sale, raffle) sends an exact 41,700 + 25,300 µA but creates boxes worth 70,200 µA. The Rewards call fails its min-balance check and **reverts the whole calling operation**.
  3. ALGO payouts pass by borrowing the allocated ALGO, so the referrer's **claim** later fails.
  4. Once some ALGO is in the app, every open disbursement permanently consumes 3,200 µA of other users' pooled ALGO.
  5. A griefer can lock about 3.2 ALGO of pooled funds per 1,000 disbursements at zero net cost: create, then later `closeDisbursement`.
  6. v1 survives only on its initial ~10 ALGO buffer: 30.76 ALGO free − 21.33 ALGO credits ≈ 9.43 ALGO ≈ 10 ALGO − 146 × 3,200.
- **Fix:**
  - Do **not** simply raise the constant: live, immutable auction, raffle and listing children pay exactly 41,700.
  - Drop `usedMbrCredits` from the v2 struct. It always equals `allocations × UserAllocationMBR`: `useMbrCredit` and `releaseMbrCredit` move exactly that per box (`:97-111`). Dropping it makes 41,700 exact again.
  - Alternatively, keep the field, fund v2 with a buffer, and add a DAO top-up runbook plus a solvency test.
  - Add an e2e assertion that the app balance equals its min balance plus liabilities after create, claim and close. Current tests fund Rewards with 10 ALGO, which masks the bug (`tests/fixtures/dao.ts:997`).

### STAKE-4 — Medium — The Rewards plugin cannot withdraw credits or close disbursements, and can only reach the registry's Rewards app

- **Location:** `arc58/plugins/rewards/contract.algo.ts`. The methods are create, edit, allocations, finalize, instant ×2, claim and reclaim. There is no `withdrawMbrCredits`, `closeDisbursement` or `fundMbrCredits`. Every call resolves `getAkitaAppList(...).rewards` (`:32, 65, 79, 106, 135, 150, 182, 219, 235`).
- **Scenario:**
  - A wallet creator's surplus MBR credits, the 25,300 µA released by each claim or reclaim, and the disbursement box MBR are reachable only through those missing methods, so they are stranded.
  - The DAO already has **21.33 ALGO of credits stranded on v1**, and that ALGO is also exposed to the C-1 drain.
  - After the registry switch, no plugin path reaches v1 at all.
  - The 13 Welcome recipients are EOAs and can still claim v1 directly, so they are not affected.
- **Fix:** The new RewardsPlugin is already a new deploy (new methods). Add `withdrawMbrCredits` and `closeDisbursement`, with an explicit `rewardsApp` parameter that is validated against the current and legacy Rewards IDs, or DAO-pinned. Then the DAO can pull its v1 credits before anyone drains them.

### STAKE-5 — Low — Legacy flat-charged entries are refunded 1,200 µA more than their boxes free, and that surplus can be reserved by budgets

- **Location:**
  - `staking-pool/contract.algo.ts:1039-1045`: `enter` accepts the flat 50,600 µA charge.
  - `:1482`: refunds 50,600, while the freed boxes are worth 27,300 + 22,100 = 49,400.
  - `:330-340` (`freeFunds`) and `:1338-1344` (`assignBudget`) count the surplus as free funds.
  - `removeEntry` (`:1472-1515`) has no reserve check.
- **Scenario:** Legacy plugins pay the flat charge. The creator calls `assignBudget` on all free ALGO, then entrants exit. Each exit pays 1,200 µA out of reserved ALGO. Later `assertAlgoReservesCovered` fails at preparation (round stalls until topped up), or the last `withdrawReward` fails.
- **Fix:** Exclude the surplus `Σ legacyCharged × 1,200` from `freeFunds`, or call `assertAlgoReservesCovered()` at the end of `removeEntry`.

### STAKE-6 — Low — `abortRound` mode 0 on a current-Rewards disbursement permanently locks allocated rewards

- **Location:** `staking-pool/contract.algo.ts:1643-1674`.
- **Scenario:** The creator or the DAO aborts with mode 0 after some batches were allocated. The Rewards disbursement stays unfinalized, so nobody can claim it (`:509`), reclaim it (`:556`), or close it (allocations > 0). No `roundRewards` entry exists, so the pool can never finalize it later. Those funds were already debited from the budget.
- **Fix:** Reject mode 0 when `activeDisbursementID` belongs to the current Rewards app and has allocations. Better, store the Rewards app ID with the round.

### STAKE-7 — Low — Pools never opt Rewards into the reward ASA, so on a fresh v2 every ASA round stalls at Allocation

- **Location:**
  - `staking-pool/contract.algo.ts:826-838`: `createAsaUserAllocations` sends the ASA to Rewards, which is not opted in.
  - `optIn` (`:1228-1253`) opts in only the pool and the DAO escrow.
- **Scenario:** After the switch to v2, the first ASA round has already paid the royalty and created the disbursement, then reverts at allocation. Anyone can fix it by paying `Rewards.optIn` (0.1 ALGO). `deploy-rewards-v2.ts` lists this as a manual step.
- **Fix:** Opt Rewards in from the pool's `optIn` (its 2 × `rewardsMbr(10)` buffer already covers it), or before `createAsaUserAllocations`.

### STAKE-8 — Low — `total += weight` in preparation can overflow and block every reward of the pool

- **Location:** `staking-pool/contract.algo.ts:478`.
- **Scenario:** A typed pool lists a high-supply asset (≥ 2^60 base units held). With STAKE-2 cycling, k sybils × C overflow uint64, so the preparation batch always reverts. `abortRound` resets the round, but the next round reverts again until the sybils leave.
- **Fix:** Saturate or assert per entry, or cap `quantity` at `minimumStakeAmount`-relative bounds.

## Suspicions (not fully traced)

- **VRF retry can be spammed** (pre-existing, unchanged since HEAD). `raffle` increments `vrfFailureCount` on every empty beacon reply, and each increment moves the target round by 4 (`:1565-1575`).
  - Many `raffle` calls in one group, issued before the beacon publishes, push the target far into the future. Repeated each block, this is a liveness grief.
  - If the beacon only keeps recent rounds, a round that nobody raffles in time may never catch up.
  - Needs the real beacon's `get` semantics (empty vs panic, retention window) to confirm.
- **`roundRewards` is keyed only by `disbursementID`** (`:271, 869, 1683`). Any future Rewards v3 switch with live pools would mix v2 and v3 IDs. This is moot today because no pools exist.

## Rewards v1 migration (live, immutable)

- v1 cannot be patched or paused. The C-1 drain stays live for as long as v1 holds value.
- What is exposed today:
  - 16,000 AKTA (8 allocations);
  - 158 sticker NFT units;
  - 30.76 ALGO free, of which 21.33 ALGO are DAO credits.
- The allocations expire in 2100, so the DAO can never reclaim them.

Recommended order:

1. **Now:** the DAO withdraws its 21.33 ALGO `mbrCredits` from v1. Call `withdrawMbrCredits(id, credits)` per fully claimed Welcome disbursement, as creator `I3SHCU7Z…`. This needs a DAO-executed call path: the current Rewards plugin lacks the method (STAKE-4). It cuts the ALGO at risk to the ~9.4 ALGO buffer.
2. Ask the 13 recipient EOAs to claim directly from v1. Keep the v1 client in the SDK; the plugin path will not reach v1 after the switch.
3. Deploy v2 with STAKE-3 fixed (or with a funded buffer), then opt it into the ASAs that pools, referrals and Welcome use.
4. Switch the registry. No pool rounds are in flight because MainNet has no pools.
5. Accept that whatever stays unclaimed in v1 can be drained. Disclose this.

FIX-PLAN U-1 (no white-hat drain) is consistent with this.

## Upgrade / rollout notes

- **StakingPool children:** none exist on MainNet. The schema growth (12 → 13 uints), new boxes and the 12,660 B program only affect new pools. No existing-child migration is needed.
- **Factory first, then child code.**
  - The live factory 0.0.2 pushes at most 2 × 4 KB with 3 extra pages. Loading the 12,660 B child into `bc` before the factory upgrade makes every `newPool` fail. That is safe, but broken until the upgrade lands.
  - The new factory (3,960 B) fits the live 3 pages and the same 8/56 schema.
  - Loading 12,660 B needs an update-plugin `updateFactoryChildContract` that handles more than 8 KB (DAO slice dependency).
  - On v42, each child create pays a per-byte surcharge of about 0.45× min fee. Plugin and SDK fee budgets must cover it.
- **Staking:**
  - 7,010 B fits the live 3 pages; schema is unchanged; ABI is additive only.
  - Set the heartbeat manager right after the upgrade, via a **new** StakingPlugin `setHeartbeatManager` installed on the DAO wallet. Until beats start, new HEARTBEAT stakes average 0, and HEARTBEAT pool entries are permanently disqualified at their first round.
  - There are no legacy heartbeat boxes.
- **Live callers:** the live social impact (`commitAppSoftStake` / `checkpointAppSoftStake`) and the live staking plugin stay ABI-compatible. Payments come from `Txn.sender`, so `assertSafePayment` passes.
- **Legacy plugins:** the May-2026 pool plugin 3569562283 already mis-pays `newPool` (noted in `compat/mainnet-programs.ts`). It also cannot enter SOFT pools, because its hard-coded charge lacks `AppStakesMBR`. This behavior is unchanged.
- **Rewards v2 is still non-upgradeable** (`AkitaBaseContract`). The next bug again means a new app plus migration. Consider `UpgradeableAkitaBaseContract`.
- **Dual-stake plugin:** only error-string renames. Redeploying changes nothing functionally.

## Test gaps

- **Concurrent rewards:** a Shuffle reward in Allocation while a second reward's preparation disqualifies an entry. Expect no shift and no stall (STAKE-1).
- **HARD and SOFT cycling:** withdraw or transfer between single-entry preparation batches. Expect a disqualification or zero gain (STAKE-2).
- **Rewards solvency:** start from `ensureFunded(…, 0)` plus 100,000 µA. Run instant ASA and ALGO disbursements, claims and closes, and assert `balance >= minBalance` throughout (STAKE-3).
- **Rewards plugin:** wallet creator recovers credits and box MBR (STAKE-4).
- **`removeEntry` of a legacy-charged entry** after `assignBudget` of all free ALGO (STAKE-5).
- **`abortRound` mode 0 with allocations** (STAKE-6). An ASA round against a Rewards app that is not opted in (STAKE-7).
- **Pool `delete` happy path with every new box type present** (budgets, committed, roundRewards, principals). Assert exact funder and creator refunds.
- **HEARTBEAT pool entry before any manager beat:** the entry is disqualified, and the entrant can exit and re-enter.

## Checked and OK

- **Rewards v2 positional txn args:** they cannot be shared with `createAsaDisbursementFromGroup` or with each other.
- **Rewards v2 inbound transfers:** all are sender-bound, with no clawback or rekey. Close-out is allowed only to the app (`:158-168`).
- **Rewards claim and reclaim:** they delete the allocation before paying, pay the stored address or creator, and release exactly one credit.
- **Rewards close and edit:** `closeDisbursement` refunds exactly what was charged and needs `allocations == 0`. The MBR delta in `editDisbursement` is symmetric.
- **Staking stake and withdraw:**
  - escrow amounts are bound;
  - totals and `liveLockedStake` stay consistent across re-lock, `checkpointExpiredLock` and withdraw;
  - the `StakesMBR` refund is backed by box deletion for every live stake;
  - `releaseAppStake` auth holds (consuming app, or owner after app deletion);
  - `updateSettings` is DAO-only for governance assets, bounded, and non-decreasing.
- **Pool entry MBR:** quotes and refunds are exact (Q14 formula verified: 27,300 / 22,100 / 18,900 / 31,700). The SOFT `AppStakesMBR` is refunded once, by Staking.
- **Pool reward accounting:**
  - budget arithmetic for Flat, Even, Percentage and Shuffle: royalty plus allocations never exceed the required amount;
  - dust stays in the budget;
  - `divw` is used for Percentage;
  - pcg64 draws in `[0, Q)` and handles Q < 2.
- **Factory:** the `deletePool` refund is capped at the recorded deposit and equals the released MBR. Child `init` and `delete` are factory-only. Creator-only reward and asset management holds.
- **Plugins:**
  - inner txns use `getSpendingAccount`;
  - `rekeyTo` is set on the last call only;
  - pool targets are checked via `appId.creator == factory`;
  - dual-stake checks `appId.creator == registry`.
