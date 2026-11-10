# Staking / Staking Pool / Rewards security review (read-only)

Snapshot: working tree on `main`, 2026-10-02. Paths below are relative to
`projects/akita-sc/smart_contracts/`.

## Scope covered

- `staking/*` (contract, types, constants, utils)
- `staking-pool/*` (contract, factory, base, constants, types)
- `rewards/*` (contract, base, constants, types)
- `arc58/plugins/staking`, `arc58/plugins/staking-pool`, `arc58/plugins/rewards`, `arc58/plugins/dual-stake`
- Read-across: `utils/functions.ts` (percentageOf, gate helpers, getStakingPowerThrough), `gates/contract.algo.ts`,
  `gates/sub-gates/merkle-address`, `gates/sub-gates/staking-amount`, `social/impact.algo.ts` (app-soft-stake consumer),
  `arc58/dao/contract.algo.ts` (liveLockedStake/lock power), `arc58/account/contract.algo.ts` (rekey-back enforcement),
  `utils/base-contracts/*`, `utils/types/lib_pcg/pcg64.algo.ts`.

## Important context: CONTRACT_AUDIT.md remediations are NOT in the working tree for Staking and Rewards

`git diff HEAD` for `staking/contract.algo.ts` and `rewards/contract.algo.ts` is only an error-constant rename and an
import-path change. The following items that CONTRACT_AUDIT.md lists as fixed are absent from the code:

- Staking: creator-only init and assigned heartbeat manager (`init` at `staking/contract.algo.ts:114` is permissionless and
  never sets `heartbeatManagerAddress`); native-ALGO heartbeat (`createHeartbeat` still uses `AssetHolding` at :578);
  pre-mutation stake-type validation; exact-MBR withdraw refund; soft/heartbeat/app-stake terminal closes.
- Rewards: finalization guard on claim; "expiration 0 = never expires"; positive/unique instant batches;
  `closeDisbursement`; funder binding / clawback rejection.

Staking Pool fixes (actual counts, whole-batch cap, canonical beacon) are present.

---

## Findings

### C-1: Group transactions can be reused across `createAsaDisbursementFromGroup` calls, so all of Rewards' ALGO and ASA can be drained
- **Severity:** Critical. **Confidence:** Confirmed (code trace).
- **Location:** `rewards/contract.algo.ts:260-327` (index-addressed txns at :270 and :294, credit at :288), `withdrawMbrCredits` :124-135, `claimRewards` :439-482.
- **Description:** The method reads the MBR payment and the asset transfers by caller-supplied absolute group index
  (`gtxn.PaymentTxn(mbrPaymentIndex)`, `gtxn.AssetTransferTxn(assetTransferStartIndex + i)`). It never marks them as
  consumed, never binds them to `Txn.sender`, and never checks that the group holds only one such call. Several app calls in
  one group can therefore point at the same payment and the same asset transfers. Each call:
  - records `mbrCredits = payment.amount - disbursementMbr` (the payment only needs `>=`, so any surplus becomes withdrawable credit), and
  - creates a finalized disbursement whose allocations are "backed" by the same deposit.
- **Exploit:** The attacker builds one group:
  1. txn0: pay P ALGO to Rewards.
  2. txn1: transfer N units of any ASA Rewards holds. `ContractWithOptIn.optIn` is permissionless, so the attacker can opt Rewards into their own ASA for 0.1 ALGO.
  3. txn2..txn15: 14 calls to `createAsaDisbursementFromGroup(0, 1, '', 0, now+3600, '', [{attacker, N}])`.

  The attacker is the stored `creator` of each disbursement. They call `withdrawMbrCredits(id_k, P - ~0.067 ALGO)` for all
  14 IDs and receive about 14·P ALGO after paying in P. They also call `claimRewards` on each ID and receive 14·N of the ASA
  after depositing N. Both outflows come from other users' unclaimed allocations and MBR credits. Scale P to the app balance.
- **Fix:** Use ARC-4 positional `gtxn` parameters, or require
  `payment.sender == Txn.sender`, `payment.amount == exact`, and that the referenced indexes are immediately before this call
  (`Txn.groupIndex - k`) so they cannot be shared. Reject clawback (`assetSender != zeroAddress`) transfers. Consider
  removing the method.

### H-1: Anyone can lower an app soft stake directly, so a SOFT-pool entry stays valid forever without holding tokens
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `staking/contract.algo.ts:690-705` (`checkpointAppSoftStake` takes any `app`, no caller check); `staking-pool/contract.algo.ts:534-541` (`checkByID`); reward weight uses the entry quantity at :271/:283 and :338.
- **Description:** `checkpointAppSoftStake(app, address, asset)` is permissionless. When the balance is short it rewrites
  `appStakes[app,address,asset].amount = balance` and returns `valid=false` to whoever called it. The pool decides validity
  only from `check.valid`, which is `balance >= appStake.amount`. It then uses the entry's original `quantity` (never
  lowered) for `qualifiedStake` and percentage/shuffle weight.
- **Exploit:** The attacker enters a SOFT pool with quantity Q. A flash balance is enough to satisfy the root soft stake and
  `commitAppSoftStake`. They move the tokens away (staying opted in with 0 balance) and call
  `Staking.checkpointAppSoftStake(poolAppId, attacker, asset)` directly, which sets the app-stake amount to 0. Every later
  pool check sees `0 >= 0` and returns valid, so the attacker earns Q-weighted (or per-head) rewards indefinitely while
  holding nothing. This repeats across sybil addresses with the same tokens.
- **Fix:** Restrict `checkpointAppSoftStake` to `Global.callerApplicationId == app`, or never lower the amount (only flag
  invalid). In the pool, compare against `entry.quantity` (`balance >= quantity`) rather than trusting `valid`.

### H-2: Reward weight (`quantity`) is not bound to any stake in NONE and HEARTBEAT pools, or to the intended asset when no stakeKey is set
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `staking-pool/contract.algo.ts:743-803` (entry validation), :573-585 (`getStakeValue`: NONE/HEARTBEAT always `valid:true`, heartbeat average ignored), :283 (`total += quantity`), :338 (percentage weight), :471 (shuffle range), :686-688 (only Percentage requires a stakeKey).
- **Description:**
  - **NONE pools:** `quantity` is only checked against `minimumStakeAmount`. It is never compared with any balance or stake, yet it is the Percentage and Shuffle weight.
  - **HEARTBEAT pools:** `quantity` is checked once, at entry, against the instantaneous `Txn.sender` balance (flashable inside a group). Preparation never re-validates it; the heartbeat average is fetched and discarded.
  - **HARD/LOCK/SOFT pools without a stakeKey** (allowed for Flat, Even and Shuffle): the entry asset is arbitrary. A self-minted junk ASA with a huge hard stake gives a huge Shuffle weight. One address can also create one entry per junk asset, giving several Flat/Even shares.
- **Exploit:**
  - In a gate-only NONE Shuffle pool (or NONE Percentage pool with a stakeKey), enter with quantity ≈ 2^63 and win almost every ticket or ~100% of the percentage.
  - In a HEARTBEAT pool, borrow tokens inside the entry group, enter with Q, return the tokens, and collect Q-weighted rewards every round.
  - DoS variant: quantity = 2^64-1 in a NONE pool makes `total += quantity` (:283) overflow, so preparation reverts forever for every reward.
- **Fix:**
  - Re-validate every entry each round against the actual stake or heartbeat average, and use `min(quantity, observed)` as the weight.
  - Forbid Percentage and Shuffle on NONE pools.
  - Require a stakeKey (or a fixed asset) for every typed pool.
  - Bound `quantity`.

### H-3: An address with several entries (multi-asset pools) or a repeat Shuffle winner stops every reward round permanently
- **Severity:** High (permanent DoS, rewards locked). **Confidence:** Confirmed.
- **Location:** `staking-pool/contract.algo.ts:332-341`, :378-386, :418-426, :468-476 push one allocation per entry; `rewards/contract.algo.ts:207` and :242 assert `!userAllocations(disbursementID, address, asset).exists`.
- **Description:** Entries are keyed by `(address, asset)`, so a user who stakes two assets has two entries. This is the
  normal case for merkle-asset (NFT collection) pools. Each allocation phase emits one `UserAllocation{address, amount}` per
  entry. Rewards keys allocations by `(address, rewardAsset, disbursementID)`, so the second allocation for the same address
  reverts. The cursor cannot skip an entry, so the round can never reach Finalization and the reward never returns to Idle.
  Shuffle has the same problem: tickets are drawn with replacement, so one address can win twice, and the outcome is
  deterministic (see H-6), so the revert repeats forever.
- **Exploit:** Any user enters with two assets (in a NONE pool without a stakeKey, any two asset IDs work) and every reward of the pool is bricked. Honest NFT holders trigger it by accident.
- **Fix:** Aggregate per address before calling Rewards, or key entries and allocations per address. In Rewards, add to an existing allocation instead of asserting non-existence when the caller is the disbursement creator.

### H-4: Late sign-ups during the Allocation phase stall the round permanently or are overpaid
- **Severity:** High for `allowLateSignups` pools. **Confidence:** Confirmed.
- **Location:** `staking-pool/contract.algo.ts:1161-1178` (`signUpsOpen` with late sign-ups stays open while live); allocation loops iterate to the current `entryID` at :324-341, :371-386, :411-426; MBR credits are funded only for `qualifiedStakers` at :294-299 and :612-630; `rewards/contract.algo.ts:89-93` (`useMbrCredit` asserts).
- **Description:** Preparation fixes `qualifiedStakers` and `qualifiedStake` and funds exactly that many allocation boxes.
  Entries added afterwards are not disqualified, are never stake-checked, and are included by the allocation loops.
  - Their allocation exceeds the funded credits, so `useMbrCredit` reverts.
  - For Percentage, `percentageOf(quantity, qualifiedStake)` also asserts `quantity < qualifiedStake`.

  Either revert repeats on every retry because the entry cannot be skipped. If credits happen to be free (an entry was
  disqualified after preparation), the late entrant is paid a share outside the denominator. The pool's other funds pay for
  it: sum > rate, and no balance assertion exists for Percentage.
- **Exploit:** Enter during any running Allocation phase and the reward is bricked.
- **Fix:** Snapshot `entryID` at preparation end and only iterate `< snapshot`. Alternatively, block sign-ups while any reward is outside Idle.

### H-5: Anyone can disqualify any entrant of a gated pool by calling `gateCheck` with garbage gate args
- **Severity:** High. **Confidence:** Confirmed (for args-dependent sub-gates).
- **Location:** `staking-pool/contract.algo.ts:1130-1140`; `utils/functions.ts:219-233` (`softGateCheck` binds app, selector, caller and gateID, but not `appArgs(3)`); `gates/contract.algo.ts:157-161` forwards caller args; `gates/sub-gates/merkle-address/contract.algo.ts:73-88` returns false on a bad proof.
- **Description:** `gateCheck` is permissionless and permanently sets `disqualified = true` whenever the supplied
  `Gate.check` returned false. The caller fully controls the per-filter args: merkle proofs, NFD/asset references and so on.
- **Exploit:** In a merkle-address (or similar) gated pool, the attacker submits
  `[Gate.check(victimOrigin, gateID, <invalid proof>), pool.gateCheck(gateTxn, victim, asset)]` for every competitor.
  Everyone except the attacker is disqualified. The attacker takes 100% of Flat/Even/Shuffle rewards, or bricks the round
  (see M-1).
- **Fix:** Only allow the entrant (or their wallet origin) to submit their own gate check. Otherwise re-evaluate the gate with stored `entry.gateArgs` instead of caller args.

### H-6: Shuffle disbursement can be stalled and its winners steered
- **Severity:** High. **Confidence:** Confirmed for the arithmetic and state bugs; Likely for grinding.
- **Location:** `staking-pool/contract.algo.ts:438-520`, `raffle` :1024-1063, `startDisbursement` :1020.
- **Description:**
  1. **Range cursor never advances across batches.** `stake` is never updated inside the loop. At :518 the stored
     `raffleCursor.stake` stays at the batch's starting value (0), so every batch restarts ranges at 0. Ticket-to-entry
     mapping then depends on caller-chosen `iterationAmount`. `disburseRewards` is permissionless, so the caller can pick
     batch boundaries that land a known ticket on their own entry.
  2. **Underflow on hits after the first batch.** `iterationAmount -= i` (:494) uses the absolute entry index. Any hit at
     `i > iterationAmount` when the cursor is above 1 reverts. Because each call can process only a few box-reading
     iterations, shuffles on pools larger than one batch end up reverting forever or running the cursor to `entryID` with no
     winner, which leaves them stuck with `iterationAmount = 0`.
  3. **Reset path re-uses the same seed.** On reset (:478-490), earlier batches' allocations are already written.
     `raffle()` reuses the same `roundToUse`, because `vrfFailureCount` was reset to 0 at :1062, and the same salt. The
     re-draw produces identical tickets and identical winners. That causes duplicate allocations (revert, see H-3) or an
     infinite loop.
  4. **Ticket space does not match the ranges.** Disqualified entries still occupy ranges, and every range adds +1, while
     tickets are drawn in `[1, qualifiedStake]`. Qualified entries near the end can become unreachable.
  5. **Seed is known before the ticket space is fixed.** `roundToUse` is fixed at `startDisbursement`, before preparation.
     The VRF output is public long before preparation finishes, while `qualifiedStake` can still be shaped: late entries,
     self-invalidation of sybil entries, or H-5 disqualification. An attacker can grind `qualifiedStake` until their entry wins.
- **Fix:**
  - Persist `currentRangeStart` in `raffleCursor.stake`.
  - Use per-call relative counters.
  - Exclude disqualified entries from ranges (or include them in the ticket space).
  - Use half-open ranges.
  - Derive the VRF round after preparation completes, with a commit delay.
  - Bump the round on every re-raffle.
  - Aggregate per-address wins.

### M-1: Reward rounds with zero or one qualified entrant stall permanently, and anyone can start one
- **Severity:** Medium. **Confidence:** Confirmed.
- **Location:** `startDisbursement` is permissionless at `staking-pool/contract.algo.ts:999-1022`; `rewards/contract.algo.ts:343-344` (finalize requires `amount > 0` and `allocations > 0`); `staking-pool/contract.algo.ts:415` (Even divides by `qualifiedStakers`); `utils/functions.ts:113` (`percentageOf` asserts `a < b`); `pcg64.algo.ts:44-45` (raffle needs `qualifiedStake >= 2`).
- **Description:** With 0 qualified entrants, every distribution reaches Finalization with amount 0 and `finalizeDisbursement`
  reverts forever (Even reverts earlier on divide-by-zero). With exactly one qualified Percentage entrant,
  `percentageOf(q, q)` reverts.
- **Exploit:** Call `startDisbursement` right after the window opens, before anyone has entered (or after disqualifying
  everyone via H-5). The reward never returns to Idle.
- **Fix:** If `qualifiedStakers == 0`, close the round as a no-op. Use `<=` or special-case a single staker. Allow skipping empty rounds.

### M-2: Heartbeats never update, so the heartbeat average is a single flashable snapshot
- **Severity:** Medium. **Confidence:** Confirmed.
- **Location:** `staking/contract.algo.ts:86` (`heartbeatManagerAddress` has no writer anywhere in the repo); `createHeartbeat` :569-624 (:570 reads the unset state and reverts; :578 uses `AssetHolding` for asset 0, so ALGO heartbeats would revert anyway); creation snapshot :267-323 and :408-457; `getHeartbeatAverage` :939-966; consumer `gates/sub-gates/staking-amount/contract.algo.ts:67-71`.
- **Description:** A heartbeat record keeps only the creation snapshot, and nothing can ever add beats.
- **Exploit:** Inside one group, receive tokens, call `stakeAsa(HEARTBEAT)` (records `held`), and send the tokens back. The
  average equals the borrowed balance forever, which passes heartbeat-type staking-amount gates. The same tokens can be
  cycled through many accounts in one group.
- **Fix:** Set the manager (creator-only init or a DAO setter). Use `address.balance` for asset 0. Ignore a heartbeat until it has N beats taken at unpredictable times.

### M-3: Soft-stake commitments are validated only at read time, so the same balance backs many accounts and gates trust stale amounts
- **Severity:** Medium. **Confidence:** Confirmed (design weakness, exploitable).
- **Location:** `staking/contract.algo.ts:764-774` (`getInfo` / `mustGetInfo` return the soft amount without a balance check); `stakeCheck` :1031-1049; `getWeightedStakeForApp` :813-873; `commitAppSoftStake` :645-687.
- **Description:** A soft stake is created against a momentary balance. Consumers then do one of two things:
  - `staking-amount` gate (SOFT type), `stakeCheck`: read the recorded amount with no balance check at all.
  - Social impact via `getAppWeightedStake`, and pool preparation: check the balance only at the instant of the read.

  Weighted age keeps accruing while the tokens are absent unless a third party calls a checkpoint, and nobody is paid to do so.
- **Exploit:**
  - Hold tokens only within the group that reads impact or gates, moving the same tokens A→B→C between reads.
  - In pool preparation (permissionless, caller-chosen batches), interleave transfers so each sybil entry is checked while it holds the tokens. The same trick works for HARD stakes via withdraw/restake between batches.
  - Create a root soft stake once with borrowed tokens and keep passing SOFT staking-amount gates forever.
- **Fix:** Have `getInfo`/`stakeCheck` (soft) clamp to the current balance. Gates should use `softCheck` semantics. Reset age on any observed shortfall, and consider requiring escrow (hard/lock) for value-bearing uses.

### M-4: Rewards claim and expiry semantics are wrong (documented fixes regressed)
- **Severity:** Medium. **Confidence:** Confirmed.
- **Location:** `rewards/contract.algo.ts:439-446` (no `finalized` check; `expiration >= now` fails when expiration is 0); `reclaimRewards` :490 (`expiration <= now` passes immediately when expiration is 0); `createInstantDisbursement` / `createInstantAsaDisbursement` :349-437 (no unlock/expiry validation, no non-empty / positive / unique checks).
- **Description:**
  - Claims work before finalization.
  - A disbursement with `expiration = 0` (explicitly accepted by `finalizeDisbursement` and `createAsaDisbursementFromGroup` as "never expires") cannot be claimed, yet the creator can reclaim everything at once. A creator can advertise a never-expiring airdrop and take it back.
  - Duplicate addresses in instant batches overwrite one box but count both amounts, stranding funds that cannot be reclaimed.
- **Fix:** Require `finalized` in claim. Treat `expiration == 0` as never-expiring in both claim and reclaim. Validate instant batches.

### M-5: Pool fund lifecycle — reward and MBR funds are unrecoverable or captured by the factory, and rewards share one balance
- **Severity:** Medium. **Confidence:** Likely (account-close behavior with boxes and ASA holdings).
- **Location:** `staking-pool/contract.algo.ts:864-877` (`delete` closes the whole remainder to the factory; allowed anytime when `endTimestamp == 0`); `factory.algo.ts:153-167` (refunds only `refundableMBR` to the funder and keeps the rest); no reward-withdraw or entry-exit method; per-round MBR is paid from the pool balance at :595-598, :612-630 and :1113.
- **Description:**
  - The pool holds boxes (rewards, entries, disbursements) and reward-ASA holdings, which should prevent the close-out, so it likely can never be deleted and the funder refund and leftover rewards are locked.
  - If deletion succeeds, leftover reward funds and entrants' entry MBR are swept to the factory, not to their owners.
  - Entrants have no exit, so their entry and app-stake MBR is never refunded.
  - Each round's Rewards disbursement MBR, allocation MBR and disbursement-box MBR come out of the shared pool ALGO balance. Rewards later releases those credits to the pool, which has no `withdrawMbrCredits` or `reclaimRewards` path. ALGO reward budgets therefore shrink every round and one reward can starve another (Percentage has no balance assertion).
- **Fix:** Account reward budgets per reward. Pre-charge round MBR on `addReward`. Add a creator withdraw for unallocated budget, an entrant exit, and pool-side reclaim/withdraw of Rewards credits. Delete boxes before close and refund each funder.

### L-1: Rewards finalization can expire before the round ends, leaving it stuck
- **Severity:** Low. **Confidence:** Confirmed.
- **Location:** `staking-pool/contract.algo.ts:1008-1012` sets disbursement expiration to `now + reward.expiration` at start; `rewards/contract.algo.ts:339-342` requires `expiration >= now + 60` at finalize; `validateReward` :680-704 does not bound `expiration` or `interval`.
- **Description:** If a multi-batch round (or a VRF wait) outlasts `reward.expiration - 60`, or `reward.expiration` is 0, finalize reverts permanently. Allocations become unclaimable after expiry and cannot be reclaimed because the disbursement is not finalized. `interval == 0` makes the window computation divide by zero (:565).
- **Fix:** Set expiration at finalization and validate `expiration >= 60` and `interval > 0`.

### L-2: Staking MBR is not refunded on withdraw, and soft, heartbeat and app stakes have no close path
- **Severity:** Low. **Confidence:** Confirmed.
- **Location:** `staking/contract.algo.ts:514-549` (deletes the stake box but returns only `amount`; the 32,100 µALGO MBR stays in the app); no close methods for soft, heartbeat or app stakes (`grep` finds none).
- **Description:** MBR paid by users (including the 34,900 µALGO per SOFT-pool entry) is permanently locked.
- **Fix:** Refund `StakesMBR` on withdraw. Add owner-only closes as documented.

### L-3: Stake and pool types are not validated, and LOCK pools accept expired locks
- **Severity:** Low. **Confidence:** Confirmed.
- **Location:** `staking/contract.algo.ts:236-366` and :368-512 (any `type` other than HEARTBEAT/HARD/LOCK takes the soft branch and stores an un-checkpointable record); `factory.algo.ts:62-72` (pool `type` is unvalidated); pool LOCK check at `staking-pool/contract.algo.ts:544-557` ignores `expiration`.
- **Description:** A pool or gate configured with a nonstandard type can be satisfied by a flash-balance pseudo-stake that can never be checkpointed. Expired, withdrawable locks still qualify for LOCK pools.
- **Fix:** Validate the enum before mutation. For LOCK pools, require `expiration > now`.

### Info
- `stakeCheck` uses `checks[i].amount >= amountToCheck → false` (`staking/contract.algo.ts:1043`). Staking exactly the required amount fails.
- `Staking.init` is callable by anyone (one-shot, writes only zeros), so there is no direct impact.
- `stakeAsa`, `createAsaUserAllocations` and `createInstantAsaDisbursement` do not reject clawback-sourced transfers or bind funders. Funds are only credited to `Txn.sender` or the creator, so there is no direct theft, but this deviates from the protocol invariant.
- Staking plugin `checkpointSoftStake` / `checkpointAppSoftStake` with an empty array emit no rekey-back (`arc58/plugins/staking/contract.algo.ts:152,172`). The wallet's required `arc58_verifyAuthAddress` (`arc58/account/contract.algo.ts:516-554, 951-956`) makes the group fail, so no rekey is left dangling. Rejecting empty arrays would still be cleaner.
- Staking-pool plugin `initPool` always reverts, because the pool's `init` requires the caller to be the factory.
- `StakingPool.raffle` is public and callable for non-shuffle rewards. It is harmless with `winnerCount = 0`.

## Checked and OK
- Hard/lock withdraw: exists/expiration checks, totals decremented once, box deleted, and the payout goes to `Txn.sender`. There is no double withdraw.
- `liveLockedStake` bookkeeping is consistent across new lock, re-lock (with and without `checkpointExpiredLock`), checkpoint and withdraw. DAO participation and lock power read it consistently.
- Escrow stake payments: receiver and amount are bound. The asset comes from the transfer itself, so there is no ALGO/ASA confusion for asset 0 in `stake` versus `stakeAsa`.
- Pool max-entries cap counts the whole batch, and duplicate `(address, asset)` entries are rejected in-batch and across batches.
- Pool creator-only methods (`optIn`, `addReward(Asa)`, `finalize`) and factory-only `init`/`delete` are enforced. The factory `deletePool` refund equals the factory-held child MBR plus the pool min balance.
- Staking, Rewards and pool upgrades require the DAO wallet plus the update plugin. Rewards and the pool use only DAO-registry app IDs; the pool plugin validates `appId.creator == factory`.
- ARC-58 plugins build every inner txn from `getSpendingAccount(wallet)`, set `rekeyTo` only on the final call, and target registry-resolved apps. Dual-stake validates `appId.creator == registry`.
- Rewards `claimRewards` and `reclaimRewards` delete the allocation before paying, pay the stored address or creator, and release MBR credit exactly once.
