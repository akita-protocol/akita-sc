# Fix proposals: Staking / Staking Pool / Rewards (findings from audit-staking.md)

Read-only proposal. Paths are relative to `projects/akita-sc/smart_contracts/` unless they start with `projects/`.
The PuyaTs APIs used below were checked against `node_modules/@algorandfoundation/algorand-typescript/*.d.ts`:
- `gtxn.PaymentTxn(n)` and `gtxn.AssetTransferTxn(n)` (gtxn.d.ts:592/610)
- `.sender`, `.assetSender`, `.assetCloseTo`, `.rekeyTo`
- `Txn.groupIndex`
- `Box<T>({key})` and `BoxMap(key)`, which returns a `Box<T>` with `.exists`, `.maybe()` and `.delete()` (box.d.ts:33-54, 129)
- `op.AppParams.appCreator(app) -> [Account, boolean]` (op.d.ts:357)

Repo patterns used: `op.divw(...op.mulw(a,b), c)`, `abiCall<typeof X.prototype.m>`, `itxn.payment(...).submit()`, `getAkitaDAOWallet()`.
Every sketch is still unbuilt and must be compiled and measured.

---

## 0. Deployment facts that shape every fix

| App | Mainnet | Upgradeable? | Constraint |
|---|---|---|---|
| Rewards | 3569556095, update counter 0 | **No.** `Rewards` extends `AkitaBaseContract` (no `UpdateApplication`) in every revision | Must be **redeployed**. The live v1 stays callable forever. The SDK registry added this ID on 2026-05-23, after `createAsaDisbursementFromGroup` was introduced (commit 7fbaa0b8, 2026-05-05), so **v1 very likely contains the C-1 bug**. Verify by checking for the selector of `createAsaDisbursementFromGroup(uint64,uint64,string,uint64,uint64,string,(address,uint64)[])uint64` in the on-chain approval program. |
| Staking | 3642366153 | Yes. DAO `UpgradeApp` → update plugin `updateApp` (`UpgradeableAkitaBaseContract.update`) | Global schema is fixed at 1 uint / 2 bytes and already used (`akitaDAO`, `version`, `heartbeat_manager_address`). Box layouts must stay compatible. The program is 6,354 B of an 8,192 B maximum (3 extra pages per `scripts/deploy-staking.ts:489`). |
| StakingPoolFactory | 3569556570 | Yes (via `FactoryContract`). Child bytecode is replaced with update plugin `updateFactoryChildContract` | — |
| StakingPool children | one app per pool | Yes, **individually**. `AkitaBaseFeeGeneratorContract.update` requires DAO wallet + update plugin, so each live pool needs its own DAO `updateApp` | Global schema is **full** (12 ints / 10 bytes), so all new state must live in boxes. The approval program is **8,085 B of 8,192 B** (107 B headroom; the factory creates children with 3 extra pages, the maximum). **Every pool fix must be measured, and the pool fixes together almost certainly exceed the budget unless code is removed (see D-7).** |
| Staking / StakingPool / Rewards plugins | counter 0 | No (plugins are immutable) | New plugin methods mean deploying a new plugin, updating the DAO registry and reinstalling on wallets. |

The Rewards app ID is resolved at call time through `getAkitaAppList(akitaDAO).rewards` by pools and the rewards plugin. Switching the DAO registry therefore redirects both. However, a pool round already in flight holds an `activeDisbursementID` that only exists in v1 (see the migration order in §Dependencies).

---

## C-1: Rewards `createAsaDisbursementFromGroup` group-transaction reuse (Critical) — Size: S (code), L (migration)

**Change.** In `rewards/contract.algo.ts`, method `createAsaDisbursementFromGroup`: keep the ABI so the SDK is unchanged, but bind the indexes to the slots immediately before the call, bind the funders, and require an exact payment.

```ts
createAsaDisbursementFromGroup(mbrPaymentIndex: uint64, assetTransferStartIndex: uint64, title: string,
  timeToUnlock: uint64, expiration: uint64, note: string, allocations: UserAllocation[]): uint64 {
  const count: uint64 = allocations.length
  loggedAssert(count > 0, errDisbursementsMustHaveAllocations)
  // Funding must be the `count + 1` txns immediately before this call. Any other call's txn
  // args sit immediately before *that* call, so the ranges can never overlap (an appl separates them).
  loggedAssert(Txn.groupIndex > count, errInvalidPayment)
  loggedAssert(assetTransferStartIndex === Txn.groupIndex - count, errInvalidTransfer)
  loggedAssert(mbrPaymentIndex === assetTransferStartIndex - 1, errInvalidPayment)

  const id = this.newDisbursementID()
  const payment = gtxn.PaymentTxn(mbrPaymentIndex)
  const costs = this.mbr(title, note)
  const disbursementMbrAmount = costs.disbursements
  const allocationMbrAmount: uint64 = costs.userAllocations * count
  loggedAssert(payment.sender === Txn.sender, errInvalidPayment)
  loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
  loggedAssert(payment.amount === disbursementMbrAmount + allocationMbrAmount, errInvalidPayment) // exact: no surplus credit
  ...
  for (let i: uint64 = 0; i < count; i += 1) {
    const assetXfer = gtxn.AssetTransferTxn(assetTransferStartIndex + i)
    loggedAssert(assetXfer.sender === Txn.sender, errInvalidTransfer)
    loggedAssert(assetXfer.assetSender === Global.zeroAddress, errInvalidTransfer) // no clawback source
    ... (existing receiver/amount checks; reuse H-3 "exists" handling, see below)
  }
```

**Other create paths in Rewards.** All other txn arguments are ARC-4 positional (`gtxn.PaymentTxn` / `AssetTransferTxn` parameters), so they cannot be shared. Two more changes are cheap and close sponsor-credit leakage:
- `createDisbursement`: add `loggedAssert(mbrPayment.sender === Txn.sender, errInvalidPayment)`. The surplus becomes creator-withdrawable credit, so only the creator should fund it. The pool calls through an inner txn (sender = pool) and the plugin uses the spending account (sender = Txn.sender), so both stay compatible.
- `fundMbrCredits`: same sender binding.
- `createInstantDisbursement`, `createInstantAsaDisbursement` and `createUserAllocations` are positional and fund user payouts. Binding the sender there is optional and not needed for safety.

**ABI / schema / SDK.**
- No ABI change. The SDK (`projects/akita-sdk/src/rewards/index.ts:372-432`) already builds `[pay, axfer×N, call]` with args `0, 1` and an exact payment, so it passes unchanged. **If** that group is ever embedded at a nonzero offset, the SDK must pass `callIndex - N - 1` and `callIndex - N`.
- New deploy, so update `projects/akita-sdk/src/networks.ts:461` (`rewards`) and keep v1 in the legacy-deployment list used by `getDisbursementsAcrossDeployments` (`rewards/index.ts`, covered by `deployments.test.ts`) so v1 claims keep working.

**Deployment / migration.**
1. **Emergency (Kyle decision D-1).** v1 cannot be patched or paused. Anyone can drain its whole ALGO and ASA balance. Options:
   - (a) Accept the risk, publicize quickly, and urge claims and reclaims.
   - (b) DAO/team performs a white-hat rescue, using the exploit itself to move v1 funds to a DAO escrow, then re-issues the allocations in v2 from a snapshot of the v1 allocation boxes.
   - (c) Do nothing until v2 ships.

   **Recommendation:** first check the v1 balance and confirm the selector. If the balance is material, do (b) immediately (legal/comms sign-off) and snapshot allocation boxes beforehand. Otherwise (a).
2. Deploy Rewards v2 with the C-1, H-3, M-4 and M-1 changes bundled into one deploy, since each redeploy is costly. Opt v2 into the needed ASAs.
3. Finish or abort every in-flight pool round (see §Dependencies) **before** the DAO switches `akitaAppList.rewards` to v2 (DAO `UpdateFields`).
4. Update the SDK registry and keep the v1 read/claim path.

**Regression tests** (`rewards/rewards.e2e.spec.ts`, new `describe('Group binding')`):
- Two `createAsaDisbursementFromGroup` calls in one group pointing at the same `(0, 1)` → the second rejects (`errIxfr` / `errIpay`).
- `[pay, axfer, createDisbursement(pay)…, createAsaDisbursementFromGroup(0,1)]` → rejects.
- Payment with surplus → rejects. Clawback-source axfer → rejects. Payment from a third party → rejects.
- Happy path: the SDK helper with 1 and 14 allocations still works.
- Attack replay: after a rejected reuse, the app balance and `withdrawMbrCredits` are unchanged.

---

## H-1: SOFT-pool entry made "valid forever" via a direct `checkpointAppSoftStake` call (High) — Size: S (staking) + S (pool)

**Change 1 (Staking; protects every live pool after one Staking upgrade).** In `staking/contract.algo.ts`, `checkpointAppSoftStake`: only the consuming app may lower the commitment. A third-party checkpoint only resets age. A missing record returns invalid instead of reverting, which is needed by L-2.

```ts
checkpointAppSoftStake(app: uint64, address: Account, asset: uint64): StakeCheck {
  const key: AppStakeKey = { app, address, asset }
  const { balance, optedIn } = this.getHeld(address, asset)
  const held: uint64 = optedIn ? balance : 0
  if (!this.appStakes(key).exists) {
    return { valid: false, balance: held }
  }
  const info = clone(this.appStakes(key).value)
  const valid = optedIn && balance >= info.amount
  if (!valid) {
    // Only the consuming app may shrink its own commitment; anyone may reset its age.
    const amount: uint64 = Global.callerApplicationId === app ? held : info.amount
    this.appStakes(key).value = { amount, lastUpdate: Global.latestTimestamp, weightedAge: 0, inheritedAge: 0 }
  }
  return { valid, balance: held }
}
```

Social impact keeps working because `impact.checkpointStakingImpact` calls in as the key app. A wallet calling through the staking plugin, or any EOA, now only resets age.

**Change 2 (pool; also covers commitments already lowered on mainnet).** In `staking-pool/contract.algo.ts`, `checkByID` SOFT branch: validate against the entry, not the commitment.

```ts
if (check.valid && check.balance >= quantity) { return check }
```

**ABI.** No change. The SDK `wallet/plugins/staking.ts` `checkpointAppSoftStake` keeps working, with weaker effect. Document it.

**Migration.** Upgrade Staking via DAO. Then upgrade each live SOFT pool (DAO `updateApp` per pool) and the factory child bytecode. Before the pool upgrade, query mainnet `appStakes` boxes (prefix `a`) where `app` is a pool and `amount < entry.quantity` to see whether the bug was already used.

**Tests.**
- `staking/staking.e2e.spec.ts`: an EOA calling `checkpointAppSoftStake(poolApp, …)` with a shortfall leaves `amount` unchanged and zeroes age. The same call from the app itself (use the existing mock-caller pattern or the social impact app) lowers it.
- `staking-pool/staking-pool.e2e.spec.ts` "Pool Check Methods": enter a SOFT pool, empty the wallet, call the Staking checkpoint directly, run `startDisbursement` and `disburseRewards` → the entry is disqualified and gets no allocation. Variant: tokens returned at check time but below `quantity` → disqualified.

---

## H-2: Reward weight (`quantity`) not bound to stake (High) — Size: M — **Design decision D-2**

**Recommended model (B′, smallest that is consistent):**
- **NONE pools.** Weight is fixed at 1, so `quantity` is ignored. In `createPoolEntries`, store `quantity: poolType === POOL_STAKING_TYPE_NONE ? 1 : quantity` and skip the `minimumStakeAmount` check for NONE. Percentage and Shuffle then degrade to per-head, which is the only meaning they can have without a stake. Optionally forbid Percentage on NONE in `validateReward` (`loggedAssert(!(distribution === Percentage && type === NONE))`).
- **Typed pools.** Validity is binary every round: entry valid iff observed ≥ `quantity`, otherwise permanently disqualified. This is the existing HARD/LOCK semantic, extended to SOFT (H-1) and HEARTBEAT. In `getStakeValue`, the HEARTBEAT branch becomes:

```ts
const avg = abiCall<typeof Staking.prototype.getHeartbeatAverage>({ appId: ..., args: [address, asset, true] }).returnValue
if (avg >= quantity) return { valid: true, balance: avg }
this.entries(id).value.disqualified = true
return { valid: false, balance: 0 }
```

  The HEARTBEAT exemption in `gateCheck` becomes unnecessary and can be dropped (saves bytes).
- **Asset restriction.** In `staking-pool/factory.algo.ts` `newPool`, add `loggedAssert(type === POOL_STAKING_TYPE_NONE || stakeKey.address !== Global.zeroAddress, errStakeKeyRequired)`. Also add the same assertion in pool `createPoolEntries`, so already-deployed pools stop accepting junk-asset entries once upgraded. (Requires the constants import in the factory and validating `type` against the enum, see L-3.)
- **Overflow.** With NONE = 1 and typed weights ≤ real stake of a merkle-approved asset, `total += quantity` is bounded by the sum of approved assets' supplies. If an approved asset can have a supply near 2^64, add a saturating check (`loggedAssert(total + quantity >= total)`).

**Options for Kyle (D-2):**
- (A) Per-round effective weight stored in a new `BoxMap<uint64, uint64>` keyed by entry ID (weight = min(quantity, observed)). Most precise, but costs about 9.3k µA of MBR per entry and more bytes.
- (B′) Binary validity + NONE = 1. Recommended: least code, upgrade-compatible, no new boxes.
- (C) Forbid Percentage and Shuffle on NONE and HEARTBEAT pools entirely.

**Existing state.** Old NONE entries keep their stored `quantity`. After upgrade, `processPreparationPhase` must treat NONE weight as 1 regardless of stored quantity (`const weight: uint64 = poolType === NONE ? 1 : quantity`, used in preparation and in all distributions). Junk-asset entries in pools without a stakeKey cannot be removed retroactively. They stay valid only while their (junk) stake holds, and are per-head only for Flat/Even. Flag affected pools.

**SDK.** Add `staking-pool/index.ts` docs and `enterCost` notes: the quantity is ignored for NONE.

**Tests** (`staking-pool.e2e.spec.ts`):
- "Different Pool Types": NONE pool, entrant passes quantity 2^63 → Shuffle odds equal per head; Percentage either disallowed or per-head.
- HEARTBEAT pool: flash-enter (balance in the same group, then sent away); after M-2 beats, the entry is disqualified.
- HARD pool without a stakeKey is rejected at the factory.

---

## H-3: Duplicate allocation per address stalls the round (High) — Size: S (in the Rewards v2 deploy) — **Design decision D-3**

**Recommended: Rewards tops up an existing allocation (creator, unfinalized).** In `rewards/contract.algo.ts`, `createUserAllocations` and `createAsaUserAllocations`:

```ts
let newBoxes: uint64 = 0
for (let i: uint64 = 0; i < allocations.length; i += 1) {
  const amt = allocations[i].amount
  if (amt === 0) continue                       // pools may compute 0 shares; don't burn a box
  const key: UserAllocationsKey = { disbursementID: id, address: allocations[i].address, asset /* 0 or xferAsset */ }
  const [prev, exists] = this.userAllocations(key).maybe()
  if (exists) {
    this.userAllocations(key).value = prev + amt
  } else {
    this.userAllocations(key).value = amt
    this.disbursements(id).value.allocations += 1
    newBoxes += 1
  }
  this.disbursements(id).value.amount += amt
  sum += amt
}
this.useMbrCredit(id, this.mbr(title, note).userAllocations * newBoxes)
```

Unused credits are left over when addresses aggregate. The pool needs M-5's withdraw path to recover them (small).

**Options (D-3):**
- (A) Rewards top-up. Recommended: Rewards is being redeployed anyway, it fixes multi-asset pools and repeat Shuffle winners at once, and needs no pool change.
- (B) One entry per address in the pool (sum quantities across assets). Changes the pool data model and is too big for the byte budget.
- (C) Pool-side dedup within a batch only. Does not handle duplicates across batches, so it is insufficient.

**Dependency.** Pools only benefit after the DAO registry points at Rewards v2. Shuffle repeat-winner handling also relies on this.

**Tests.**
- `rewards.e2e.spec.ts`: a creator adds `[A:5, A:7]` → one box of 12, `allocations=1`, credit used once. Later batch `[A:3]` → 15.
- `staking-pool.e2e.spec.ts`: an entrant with two assets in a merkle-asset pool → the Percentage/Flat round finalizes and the address receives the summed amount. Shuffle where the same address wins twice → finalizes with 2×amount.

---

## H-4: Late sign-ups during Allocation (High) — Size: M

**Change (shared with H-6 and M-1): an "active rounds" counter box blocks entry and disqualification while any reward round is open.** In `staking-pool/contract.algo.ts`:

```ts
/** number of reward rounds currently outside Idle; new box so existing children stay layout-compatible */
activeRounds = Box<uint64>({ key: 'x' })            // 2_500 + 400*(1+8) = 6_100 µA, paid from pool balance

private openRounds(): uint64 {
  const [n, ok] = this.activeRounds.maybe()
  return ok ? n : 0
}
private closeRound(): void {
  const n = this.openRounds()
  if (n > 0) this.activeRounds.value = n - 1   // guard: children upgraded mid-round start at 0
}
// startDisbursement: this.activeRounds.value = this.openRounds() + 1
// finalizeDistribution / empty-round close / abortRound: this.closeRound()
// createPoolEntries:   loggedAssert(this.openRounds() === 0, errRewardAlreadyInDisbursement)
// check / gateCheck:   loggedAssert(this.openRounds() === 0, errRewardAlreadyInDisbursement)
```

Alternative: a per-reward `entryID` snapshot box (`BoxMap<uint64,uint64>`, prefix `'n'`) bounding the allocation loops. That allows sign-ups during rounds but does not freeze disqualification, which H-6 needs. The counter is recommended.

**Trade-off.** Anyone can call `startDisbursement` and briefly block sign-ups. Rounds are short and anyone can push them forward, so this is acceptable. It needs M-1 so that no round can stall forever, plus an `abortRound` escape (M-1).

**ABI.** No new public methods except `abortRound` (M-1). New error code is optional (reuse `errRaid`).

**Migration.** Abort or finish in-flight rounds before upgrading a pool. The counter starts at 0 on upgraded children, and `closeRound` is guarded.

**Tests** (`staking-pool.e2e.spec.ts` "Late Signup Pools"): with `allowLateSignups`, start a round → `enter` rejects until `finalizeDistribution`, then succeeds. `gateCheck` and `check` reject mid-round.

---

## H-5: Permissionless `gateCheck` with caller-chosen args (High) — Size: S–M

**Change.** In `staking-pool/contract.algo.ts`, `gateCheck`: evaluate the gate with the entrant's stored `entry.gateArgs` and drop the caller-supplied gate transaction. This is an ABI change.

```ts
gateCheck(address: Account, asset: uint64): void {
  loggedAssert(this.gateID.value !== 0, errGateIdNotSet)
  loggedAssert(this.openRounds() === 0, errRewardAlreadyInDisbursement)      // H-4 freeze
  const id = this.entriesByAddress({ address, asset }).value
  const origin = originOr(getWalletIDUsingAkitaDAO(this.akitaDAO.value, address), address)
  const passes = abiCall<typeof Gate.prototype.check>({
    appId: getAkitaAppList(this.akitaDAO.value).gate,
    args: [origin, this.gateID.value, clone(this.entries(id).value.gateArgs)],
  }).returnValue
  if (!passes) this.entries(id).value.disqualified = true
}
```

Use `import type { Gate } from '../gates/contract.algo'`. The plugin already imports `Gate` this way. This removes `softGateCheck`'s use in the pool, which saves some bytes.

**ABI / SDK.** `gateCheck(appl,address,uint64)void` → `gateCheck(address,uint64)void`. Update:
- `projects/akita-sdk/src/staking-pool/index.ts:103-106` (no gate txn in the group)
- `staking-pool/types.ts:66` (`GateCheckParams`)
- the generated `StakingPoolClient`

Gate opcode budget comes from the caller (opUp) as before.

**Semantics.** Stored proofs stay valid unless the gate registry changes. Gates whose args are time-sensitive (rare) evaluate with stale args, so the entrant re-proves only by re-entering (no exit today, see M-5).

**Dependency.** **ACC-01 (origin derivation).** Both `gatedEnter` (`originOrTxnSender`) and this check derive the subject from `getWalletIDUsingAkitaDAO`/`originOr`. If ACC-01 lets an attacker spoof origin at entry, the stored-args check evaluates the wrong subject. Land ACC-01 first or together.

**Tests** (`staking-pool.e2e.spec.ts`, new gated-pool block using a merkle-address gate): a third party calls `gateCheck(victim, asset)` → the victim stays qualified while valid. After the gate registry removes the victim's leaf → disqualified. There is no API to pass custom args anymore.

---

## H-6: Shuffle stall and steering (High) — Size: M–L — **Design decision D-4**

**Recommended minimal-correct rewrite (keeps the `Reward` box layout):**
1. **Seed after the ticket space is final.** At the Preparation→Allocation transition in `processPreparationPhase`, set `reward.activeDisbursementRoundStart = Global.round` (instead of in `startDisbursement`). `qualifiedStake` is final at that point, and with the H-4 freeze the entry set and flags cannot change afterwards.
2. **Ticket space = qualified weight, half-open.** In `raffle`:
   - `loggedAssert(distribution === DistributionTypeShuffle, errUnknownRewardRateType)`.
   - Draw `pcg64Random(rngState, 0, qualifiedStake, winnerCount)`. pcg64 returns `[lower, upper)` (pcg64.algo.ts:61) and requires `upper ≥ 2`.
   - If `qualifiedStake < 2`, set `winningTickets` to `winnerCount` zeros, so the single weight-1 staker wins all tickets (no RNG).
3. **Per-ticket scan with a persisted cursor; skip disqualified entries without consuming range.** `raffleCursor.stake` is repurposed as `rangeStart`.

```ts
private createShuffleDisbursement(rewardID: uint64, iterationAmount: uint64): void {
  const r = clone(this.rewards(rewardID).value)
  const actualSum: uint64 = r.rate - r.royaltyAmount
  this.assertRewardBalance(r.asset, actualSum)
  const amount: uint64 = actualSum / r.winnerCount
  let { ticket, stake: rangeStart, disbursed } = r.raffleCursor
  let id = r.disbursementCursor
  let steps: uint64 = 0
  let allocations: UserAllocation[] = []
  while (steps < iterationAmount && ticket < r.winningTickets.length) {
    loggedAssert(id < this.entryID.value, errNotReadyToDisburse)      // impossible if ranges == ticket space
    const { disqualified, address, quantity } = this.entries(id).value
    steps += 1
    if (!disqualified) {
      const rangeEnd: uint64 = rangeStart + quantity                  // [rangeStart, rangeEnd)
      if (r.winningTickets[ticket] < rangeEnd) {
        allocations.push({ address, amount })
        disbursed += 1
        ticket += 1
        id = 1                                                        // next ticket rescans from the start
        rangeStart = 0
        continue
      }
      rangeStart = rangeEnd
    }
    id += 1
  }
  if (allocations.length > 0) this.createRewardAllocations(r.activeDisbursementID, r.asset, allocations, amount * allocations.length)
  if (ticket === r.winningTickets.length) {
    this.rewards(rewardID).value.phase = DisbursementPhaseFinalization
    this.rewards(rewardID).value.disbursementCursor = 1
    this.rewards(rewardID).value.raffleCursor = { ticket: 0, stake: 0, disbursed: 0 }
    this.rewards(rewardID).value.winningTickets = []
  } else {
    this.rewards(rewardID).value.disbursementCursor = id
    this.rewards(rewardID).value.raffleCursor = { ticket, stake: rangeStart, disbursed }
  }
}
```

   - The reset/re-raffle path is deleted. The ticket-to-entry mapping is now independent of batch boundaries.
   - Repeat winners rely on H-3 (Rewards top-up).
   - The weight is `quantity` (= 1 for NONE per H-2).
   - Cost: at most `winnerCount × entries` iterations in total (winnerCount ≤ 10), split across caller-sized batches.
   - Sorting the tickets would make a single pass possible, but needs indexed assignment on a native `uint64[]`, which I could not confirm in the d.ts or the repo. It is avoided.

**Options (D-4):**
- (A) Minimal rewrite above. Recommended.
- (B) Move Shuffle out of the pool child into a separate "pool disburser" app, which also relieves the byte budget.
- (C) Disable Shuffle for new pools until redesigned.

**Migration.** Shuffle rounds in flight on live pools have incompatible cursor semantics. Run `abortRound` (M-1) before upgrading each pool. Existing tests in "Shuffle Distribution" (`staking-pool.e2e.spec.ts:732`, `:2024`) assume tickets in `[1, Q]` and must be updated.

**Tests** (`staking-pool.e2e.spec.ts`, using the existing `MockRandomnessBeacon`, :183): with a fixed seed, run the same Shuffle with `iterationAmount = 1` and `= N`; the winners must be identical and must match an off-chain recomputation. Also cover:
- a disqualified entry in the middle (its range is skipped);
- 30+ entries over many batches (no underflow);
- a single qualified staker (all tickets);
- `raffle` on a non-Shuffle reward → rejects;
- `qualifiedStake` changes after `startDisbursement` cannot change the seed round, because the round is taken at the transition.

---

## M-1: Rounds with zero or one qualified entrant stall forever (Medium) — Size: S–M

**Change (pool):**
1. **Create the Rewards disbursement lazily.** Move `createRewards(...)` and the `activeDisbursementID` assignment from `startDisbursement` to the Preparation→Allocation transition, and only when `qualifiedStakers > 0`. If `qualifiedStakers === 0` (or Shuffle with `qualifiedStake === 0`), close the round: phase Idle, cursor 1, totals 0, `closeRound()`, and pay no royalty. No Rewards disbursement exists, so nothing is stranded. This also makes the disbursement expiry start at allocation (helps L-1).
2. **Percentage single staker.** Replace `calcPercent(actualAmount, percentageOf(quantity, qualifiedStake))` with `op.divw(...op.mulw(actualAmount, quantity), qualifiedStake)` (pattern from `utils/functions.ts:109`). It is safe because `quantity ≤ qualifiedStake` under the H-4 freeze, and it is smaller in bytes.
3. **Even.** Divide-by-zero becomes unreachable via (1).
4. **`abortRound(rewardID)`** (creator or DAO wallet):
   - If an `activeDisbursementID` exists with allocations, call `Rewards.finalizeDisbursement` so the existing allocations become claimable. Otherwise, use the Rewards v2 `cancelDisbursement` described below.
   - Then reset the reward to Idle and call `closeRound()`.
   - This is required for migration of rounds stuck today.

**Rewards v2 (optional, recommended).** `cancelDisbursement(id)`: creator only, `!finalized && allocations === 0` → delete the box and refund `mbr(title, note).disbursements + mbrCredits` to the creator.

**ABI / SDK.** New `abortRound(uint64)void` (pool) and `cancelDisbursement(uint64)void` (Rewards). Add wrappers in `projects/akita-sdk/src/staking-pool/index.ts` and `rewards/index.ts`.

**Tests** (`staking-pool.e2e.spec.ts` "Edge Cases"):
- `startDisbursement` on an empty pool, then `disburseRewards` → returns to Idle, no Rewards disbursement exists, and the next window works.
- A single Percentage staker receives the full `rate - royalty`.
- `abortRound` on a stuck round (forced through a pre-fix scenario) finalizes the partial allocations.

---

## M-2: Heartbeats never update (Medium) — Size: S — **Design decision D-5 (authority)**

**Change** (`staking/contract.algo.ts`):

```ts
setHeartbeatManager(manager: Account): void {
  loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)   // see D-5
  this.heartbeatManagerAddress.value = manager
}
// createHeartbeat: replace AssetHolding lookup (line 578) with native ALGO support
const held = new Uint64(this.getHeld(address, asset).balance)
```

On creation in `stake` and `stakeAsa` (HEARTBEAT): do **not** record the user-timed snapshot. Write four empty heartbeats. The rotation loop at :609-623 then writes index 0 first. The average stays 0 until the manager beats, which removes the flash snapshot.

**D-5 (who sets the manager).**
- (a) DAO wallet. Needs a caller path: a new StakingPlugin method `setHeartbeatManager(wallet, rekeyBack, manager)` executed through DAO `ExecutePlugin`. Plugins are immutable, so this requires a new plugin deploy.
- (b) `Global.creatorAddress`, if the Staking deployer key is still controlled (the deployer-sunset scripts suggest it may be retired).
- (c) Hard-code the manager into the upgrade.

**Recommendation:** (a). Also have `init` reject non-creator callers (cheap, Info).

**Existing state.** Existing heartbeat boxes keep their creation snapshot until 4 manager beats rotate it out. At 4 beats a day, that takes about one day. Run the manager immediately after the upgrade.

**Dependency.** H-2 (HEARTBEAT pools) and heartbeat-type staking-amount gates depend on this.

**Tests** (`staking/staking.e2e.spec.ts` "Heartbeat Staking"):
- New ALGO and ASA heartbeat: `getHeartbeatAverage` = 0 at creation.
- The manager beats → average = held. ALGO beat succeeds.
- A non-manager → `errNhbm`. A non-DAO `setHeartbeatManager` → rejects.

---

## M-3: Soft stakes validated only at read time (Medium) — Size: S — **Design decision D-6**

**Change** (`staking/contract.algo.ts`): readonly views clamp SOFT amounts to the current holding, so every consumer (staking-amount gate, `stakeCheck`, pools via `getInfo`) sees backed amounts.

```ts
private clampSoft(address: Account, asset: uint64, info: Stake): Stake {
  const held = this.getHeld(address, asset)
  const backed: uint64 = held.optedIn ? held.balance : 0
  if (backed >= info.amount) return info
  return { amount: backed, lastUpdate: info.lastUpdate, expiration: info.expiration, weightedAge: 0 }
}
// getInfo / mustGetInfo / getInfoAtLeast / getInfoList / mustGetInfoList: if (type === STAKING_TYPE_SOFT) value = this.clampSoft(...)
// stakeCheck: for SOFT, amountToCheck = clamped amount
```

**D-6 (soft-stake model).**
- (A) Clamp at read (above). Recommended: cheap, and the Staking upgrade covers the staking-amount gate immediately.
- (B) Keep soft as "advisory" and require HARD/LOCK for value-bearing uses (pools paying rewards, gates guarding value). Document it, and have the factory reject SOFT pools for Percentage/Shuffle.
- (C) Time-weighted soft via heartbeats.

Cycling the same tokens through several accounts inside one group cannot be prevented by any balance-at-read model. Only escrow (B) or manager-timed sampling (C) stop it. **Recommendation:** (A) now, plus (B) guidance for high-value pools.

**Tests.**
- `gates/staking-amount-gate.e2e.spec.ts`: soft-stake 1M, move the tokens away → the SOFT gate fails without anyone checkpointing.
- `staking/staking.e2e.spec.ts`: `getInfo(SOFT)` reflects the balance. `getInfo(HARD/LOCK)` is unchanged.

---

## M-4: Rewards claim and expiry semantics (Medium) — Size: S (in the v2 deploy)

**Change** (`rewards/contract.algo.ts`):
- `claimRewards`: add `finalized` to the destructure, then `loggedAssert(finalized, errDisbursementNotFinal)` (new code, e.g. `'errDbnf'`, mirrored in `projects/akita-sdk/src/rewards/errors.ts`). Change the expiry check to `loggedAssert(expiration === 0 || expiration >= Global.latestTimestamp, errDisbursementLocked)`.
- `reclaimRewards`: `loggedAssert(expiration !== 0 && expiration < Global.latestTimestamp, errDisbursementNotExpired)`.
- `createInstantDisbursement` / `createInstantAsaDisbursement`: `allocations.length > 0`; each `amount > 0`; `loggedAssert(!this.userAllocations(key).exists, errAllocationAlreadyExists)` before the write; the same unlock and expiry rules as `finalizeDisbursement`.

**Interaction.** The pool never claims, so it is unaffected. Pool rounds must finalize before users can claim; finalizing is already part of the flow.

**Tests** (`rewards.e2e.spec.ts` "SDK Claim/Reclaim/Instant"):
- Claim before finalize rejects.
- `expiration = 0`: claim succeeds after a time warp, reclaim rejects.
- An instant batch with a duplicate, a zero amount, or empty rejects.

---

## M-5: Pool fund lifecycle (Medium) — Size: L — **Design decision D-7 (also the pool byte budget)**

**Proposed components (new boxes only, layout-compatible):**
1. **Per-reward budget.** `budgets = BoxMap<uint64, uint64>({ keyPrefix: 'b' })`.
   - `addReward` / `addRewardAsa` credit the funded amount (ALGO: `payment.amount - rewardsMbr`; ASA: `assetXfer.assetAmount`).
   - Each round debits what it pays: allocations sum + royalty, and for ALGO rewards also the Rewards disbursement MBR plus allocation credits.
   - `assertRewardBalance` is replaced by a budget check. This removes cross-reward insolvency.
   - Add an ops-ALGO budget for ASA-reward pools, funded at `addReward`.
2. **Creator withdraw.** `withdrawReward(rewardID, amount)`: creator only, reward Idle and (`!isLive()` or `endTimestamp` passed), pays `≤ budget` (ALGO or ASA).
3. **Pool-side Rewards hygiene.** `reclaimRound(disbursementID, reclaims)` (permissionless after expiry) calls `Rewards.reclaimRewards` (the pool is creator) and then `withdrawMbrCredits`, crediting the reward budget.
4. **Entrant exit.** `exit(asset)`, only when no round is open:
   - mark the entry disqualified;
   - delete `entriesByAddress` (and `uniques` when it is the last entry);
   - refund those MBRs to the entrant;
   - for SOFT, call Staking `releaseAppStake` (L-2).

   Keep the `entries(id)` box so iteration has no holes. Alternatively delete it and make the loops `if (!this.entries(id).exists) continue`.
5. **Delete.**
   - Forbid deletion while entries or rewards exist, unless `endTimestamp != 0 && now > endTimestamp`.
   - A `cleanup(ids[])` batch deletes boxes and refunds each funder. `assetCloseTo` the creator for leftover reward ASAs before close.
   - The pool pays the remaining reward budget to the creator before the close to the factory.
   - With `endTimestamp == 0`, the creator must first call `endPool()` (sets `endTimestamp = now + grace`).

**D-7 (pool code size).** The pool is at 8,085/8,192 B, and H-2/H-4/H-5/H-6/M-1/M-5 add code. Options:
- (A) Trim:
  - remove the separate public `raffle` (fold it into `disburseRewards`);
  - remove the `check()` public method;
  - replace `calcPercent`/`percentageOf` with `divw`;
  - drop `softGateCheck` and the HEARTBEAT exemption;
  - shorten error paths;
  - then measure. Likely enough for the H-* fixes, not for M-5.
- (B) Split: move reward accounting and disbursement (rounds, Shuffle, budgets) into a singleton `StakingPoolRewards` app keyed by pool ID, with the child keeping entries only. This is a bigger change, but it makes future fixes upgrade-once instead of once per pool.
- (C) Ship the H-* fixes now via (A), and do M-5 as part of (B).

**Recommendation:** (C).

**Migration.** Live pools have no budget boxes. On first use, derive the budget from the current pool balance (ALGO minus min-balance; ASA balance) split across rewards by creator declaration, or treat it as a pooled budget for legacy pools.

**Tests** (`staking-pool.e2e.spec.ts` "Pool Deletion", "Reward Management"):
- Two rewards of the same asset: one cannot spend the other's budget.
- The creator withdraws unspent budget after end.
- An entrant exits and gets the exact MBR back.
- Delete after cleanup refunds funder and creator exactly. Deletion with leftover boxes is rejected cleanly.

---

## L-1: Disbursement finalization deadline (Low) — Size: S

**Change (pool).** With M-1(1), the disbursement is created at allocation start, with expiration `now + reward.expiration`. In addition:
- in `finalizeDistribution`, before `finalizeRewards`, extend the deadline via the existing creator-only `Rewards.editDisbursement(id, title, 0, Global.latestTimestamp + expiration, '')`;
- in `validateReward`, add `loggedAssert(reward.interval > 0 && reward.expiration >= 3_600, errRateMustBeGreaterThanZero /* or new code */)`.

The `editDisbursement` call costs bytes (D-7). Dropping it is acceptable if the minimum expiration is generous (≥ 1 day).

**Tests:** a round whose allocation takes longer than the expiration still finalizes. `interval = 0` or a tiny expiration rejects at `addReward`.

---

## L-2: Staking MBR refunds and terminal closes (Low) — Size: M

**Change** (`staking/contract.algo.ts`):
- `withdraw`: for ALGO, pay `amount + StakesMBR` in the existing payment. For ASA, add `itxn.payment({ receiver: Txn.sender, amount: StakesMBR }).submit()`. This is backed for old stakes too, because box deletion frees exactly that MBR.
- `closeSoftStake(asset)`: owner deletes `stakes{sender, asset, SOFT}` and is refunded `StakesMBR`.
- `closeHeartbeat(asset)`: deletes `stakes{…HEARTBEAT}` and `heartbeats{sender, asset}` and refunds `StakesMBR + HeartbeatsMBR`.
- `releaseAppStake(app, address, asset)`: allowed if `Global.callerApplicationId === app`, or if the consuming app no longer exists (`const [, live] = op.AppParams.appCreator(app); !live`) and `Txn.sender === address`. Deletes the box and refunds `AppStakesMBR` to `address`.
  - Requires H-1's "missing → invalid" change so that pools and social do not revert on released records.
  - Social impact needs a matching `releaseStakingImpact` if a user should be able to leave. Coordinate with the social family.

**ABI / SDK.** Three new methods. Add them to `projects/akita-sdk/src/staking/index.ts`. Plugin exposure (`wallet/plugins/staking.ts`) needs a new StakingPlugin version (immutable).

**Tests** (`staking/staking.e2e.spec.ts`): exact balance deltas on withdraw (amount + 32,100), close soft, close heartbeat (102,200), and release app stake by the app versus by the owner after app deletion.

---

## L-3: Unvalidated stake/pool types; expired locks accepted in LOCK pools (Low) — Size: S

**Change.**
- `staking/contract.algo.ts` `stake` / `stakeAsa`, first lines: `loggedAssert(type === STAKING_TYPE_HEARTBEAT || type === STAKING_TYPE_SOFT || type === STAKING_TYPE_HARD || type === STAKING_TYPE_LOCK, errInvalidStakeType)`. New error code; mirror it in `projects/akita-sdk/src/staking/errors.ts`.
- `staking-pool/factory.algo.ts` `newPool`: the same set plus `POOL_STAKING_TYPE_NONE`.
- `staking-pool/contract.algo.ts` `checkByID`, non-SOFT branch: `if (info.amount >= quantity && (this.type.value !== POOL_STAKING_TYPE_LOCK || info.expiration > Global.latestTimestamp))`. Import `POOL_STAKING_TYPE_LOCK`.

**Dependency: DAO-05 (max lock).** Bundle it in the same Staking upgrade. `stakeAsa` lockup uses the creator-set `settings(asset)` (:377-379), and `Global.latestTimestamp + value` can overflow. Clamp the settings value in `updateSettings` (e.g. ≤ some protocol max) consistently with DAO-05.

**Tests:** `stake(type=99)` rejects. Factory `newPool(type=50)` rejects. A LOCK pool entry with an expired lock is disqualified at preparation.

---

## Info items
| Item | Decision |
|---|---|
| `stakeCheck` strict `>=` (`staking/contract.algo.ts:1043`) | **Fix (cheap, in the Staking upgrade):** `if (checks[i].amount > amountToCheck) return false`. No on-chain consumers; check SDK users of `stakeCheck`. |
| `Staking.init` permissionless | Fix cheaply alongside D-5: `loggedAssert(Txn.sender === Global.creatorAddress, ...)`. Harmless today; won't fix if bytes are tight. |
| Clawback-source transfers not rejected (`stakeAsa`, Rewards ASA paths) | **Fix (cheap)** in Staking (`assetXfer.assetSender === Global.zeroAddress`) and Rewards v2 (all ASA paths). |
| Plugin empty checkpoint batch | **Won't fix now:** the wallet's mandatory `arc58_verifyAuthAddress` fails the group. Add `length > 0` in the next StakingPlugin version, since a new version is needed for L-2/M-2 anyway. |
| `initPool` dead plugin method | **Won't fix** (plugin immutable). Drop it in the next StakingPoolPlugin version. |
| `raffle` callable on non-Shuffle | Fixed by H-6 (assert distribution). |

---

## Dependencies and rollout order

1. **Now:** D-1 decision on Rewards v1 funds (check balance, confirm selector).
2. **Rewards v2 deploy** (C-1 + H-3 + M-4 + `cancelDisbursement` + clawback/sender binding). Not yet wired into the DAO.
3. **Staking upgrade** (H-1 staking side, M-2, M-3, L-2, L-3, Info, DAO-05). Box layouts are unchanged, so it is safe in place. Afterwards:
   - set the heartbeat manager (D-5);
   - start beats;
   - deploy a new StakingPlugin exposing the close/release/setter methods.
4. **Pool child rewrite** (H-1 pool side, H-2, H-4, H-5, H-6, M-1, L-1, L-3 pool part, within D-7(A)):
   - load it into the factory via `updateFactoryChildContract`;
   - for each live pool: drive or abort in-flight rounds, then DAO `updateApp`.
   - Rounds must be finished or aborted **while the DAO registry still points at Rewards v1**, because `activeDisbursementID` is only valid there.
5. **Switch `akitaAppList.rewards` → v2** (DAO `UpdateFields`). Update the SDK `networks.ts` and keep v1 in the legacy list for claims.
6. **M-5 / D-7(B)** pool-rewards split as a follow-up.

**Cross-family dependencies:**
- **ACC-01** (origin spoofing) affects H-5 and `gatedEnter`.
- **DAO-05** (max lock) bundles with L-3 and the Staking upgrade.
- The social family's `impact.checkpointStakingImpact` depends on the H-1 semantics (the app may lower), and its leave flow needs L-2 `releaseAppStake`.
- The staking-amount gate behavior changes with M-3 (clamp) and M-2 (heartbeat average starts at 0).

**Within-family dependencies:**
- H-6 → H-3 (repeat winners), H-4 (freeze), M-1 (Q < 2, lazy disbursement).
- H-2 (HEARTBEAT) → M-2.
- H-4 counter → M-1 `abortRound`.
- L-2 `releaseAppStake` → H-1 "missing ⇒ invalid".
- Everything in the pool → D-7 byte budget.
