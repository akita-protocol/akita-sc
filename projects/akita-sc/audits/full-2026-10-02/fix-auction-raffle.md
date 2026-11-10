# Fix proposals: Auction / Raffle / plugins (AR-01 … AR-15)

These are proposals only: no repo edits, builds, or chain access. Paths are relative to `projects/akita-sc/smart_contracts/`.

APIs used in the sketches were checked against `node_modules/@algorandfoundation/algorand-typescript/*.d.ts` or existing repo code:

| API | Source |
|---|---|
| `Account.balance`, `Account.minBalance`, `Account.isOptedIn` | `reference.d.ts:15,21,88` |
| `Global.round`, `Global.latestTimestamp`, `Global.currentApplicationAddress` | `op.d.ts:1161-1181` |
| `GlobalState.delete` / `hasValue` | `state.d.ts:15-19` |
| `BoxMap.exists` / `delete` | `box.d.ts` |
| `op.AppGlobal.getExUint64` | `op.d.ts:249` |
| `op.Block.blkTimestamp` | `op.d.ts:499-501` |
| `while` / `break`, tuple destructuring, `abiCall` returning a struct | existing usage in `pcg64.algo.ts` and `functions.ts` |

---

## 0. Global constraints for every child fix (read first)

**C1. Recovering live children needs schema-compatible bytecode.** Live children can be repaired in place. Every Auction and Raffle child inherits `UpgradeableAkitaBaseContract.update`, which the DAO wallet calls through `UpdateAkitaDAOPlugin.updateApp(wallet, rekeyBack, appId)` (`arc58/plugins/update-akita-dao/contract.algo.ts:101-139`). An app update cannot change the global schema or the extra-page count. So the fixed child code must:
- Fit the existing schema. Auction is 25 uint / 10 bytes and Raffle is 21 uint / 9 bytes (from `artifacts/*/arc56.json`).
- Use **no new global keys** beyond what legacy children already store.
- Fit in **4 pages = 8192 bytes**, because `extraProgramPages: 3` is fixed at creation.

Current approval sizes are Auction 7184 B and Raffle 6499 B, so Auction has only about 1 KB of headroom. Every sketch below reuses existing keys: `raffleRound`, `vrfFailureCount`, `rafflePrizeClaimed`, `winner`/`raffleWinner`, `findWinnerCursors`, `funder`. If Auction exceeds 8192 B after the build, cut space as follows:
- Remove the unused `bidTotal` (`GlobalState<Uint128>`, never written). This also removes a bytes slot for new children; legacy children keep the slot, which is harmless.
- Collapse the duplicated ALGO/ASA payout code into one helper.

The SDK reads `state.bidTotal` (`akita-sdk/src/auction/index.ts:60`), so that line goes too.

**C2. Confirm live children are upgradeable before relying on recovery.** Before relying on recovery, confirm via indexer (read-only) that live mainnet children were created from bytecode containing the `update(string)void` selector. They were created by factories 3569557408 and 3569557743 from their boxed bytecode.
- If they contain it, every "stuck" child below is recoverable with a DAO `UpgradeApp` action.
- If they do not, stuck funds are unrecoverable and only new children benefit.

**C3. Deployment order (one DAO proposal, or strictly in this order):**
1. Redeploy the **plugins**. `AuctionPlugin` and `RafflePlugin` extend `AkitaBaseContract`, which has no `update`, so they get new app IDs. Then update the DAO plugin app list and have wallets reinstall. The new plugins must read MBR from the child (AR-12/AR-14) before any child bytecode changes its constants.
2. **Upgrade the factories** (`update` plus `updateFactoryChildContract` to upload the new child bytecode). This includes the measured-refund logic (AR-09/AR-13). It must land **before** live children are upgraded; otherwise an old factory refunding `totalMBR`, combined with a new child that pays weights MBR directly to the funder, double-pays.
3. **Upgrade live, non-deleted children** with `updateApp`. Enumerate them via indexer: apps whose creator is the factory address. Prioritise stuck children: ended with no bids, undeletable, dead-range raffle, ASA-bid unclaimable, zero-entry raffle.
4. Handle one-time **legacy reconciliations**: weights MBR already paid to the factory, and earlier raffle-factory over-refunds (see AR-09).

**C4. Test infrastructure.** Most regression tests need a controllable beacon.
- Extend the test-only `utils/types/mock-randomness-beacon.algo.ts` with `setSeed(seed: bytes)` and `setEmpty(empty: boolean)`, stored in global state. Today it returns a constant.
- Advance LocalNet rounds with dummy self-payments. Dev mode produces one round per transaction.
- This is a test-only contract change, but AGENTS.md requires approval (**Kyle: D7**).

---

## High

### AR-01: Commit-reveal draw round (Auction + Raffle). Size M
**Change: `auction/contract.algo.ts` `raffle()`, `raffle/contract.algo.ts` `raffle()`, constants.**

- The first call after the end only commits to a **future** round.
- A later call reveals.
- If the beacon returns an empty seed, re-commit forward. Never step to `round + 4k`, which may already be public.

No new state: this reuses `raffleRound` and `vrfFailureCount`.

```ts
// auction/constants.ts and raffle/constants.ts
export const DRAW_DELAY_ROUNDS: uint64 = 8   // committed round is strictly in the future
export const BEACON_LAG_ROUNDS: uint64 = 8   // beacon value readable from round+8 (current assumption)

// Auction.raffle()
raffle(): void {
  loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errAuctionHasNotEnded)
  loggedAssert(this.bidFee.value > 0, errNotApplicableToThisAuction)
  loggedAssert(this.winningTicket.value === 0, errWinnerAlreadyDrawn)
  loggedAssert(this.raffleWinner.value === Global.zeroAddress, errWinnerAlreadyFound)
  loggedAssert(!this.rafflePrizeClaimed.value, errRaffleAlreadyPrizeClaimed)

  if (this.raffleRound.value === 0) {
    this.excludeWinnerWeight()                 // AR-02: freeze eligible weight at commit time
    if (this.weightedBidTotal.value === 0) {   // AR-02: no eligible losers
      this.settleWithoutRaffle()
      return
    }
    if (this.weightedBidTotal.value === 1) {   // pcg64Random needs a range of ≥2
      this.winningTicket.value = 1
      return
    }
    this.raffleRound.value = Global.round + DRAW_DELAY_ROUNDS
    return
  }

  loggedAssert(Global.round >= this.raffleRound.value + BEACON_LAG_ROUNDS, errNotEnoughTime)

  const seed = abiCall<typeof RandomnessBeacon.prototype.get>({
    appId: getOtherAppList(this.akitaDAO.value).vrfBeacon,
    args: [this.raffleRound.value, this.salt.value],
  }).returnValue

  if (seed.length === 0) {
    this.vrfFailureCount.value += 1
    this.raffleRound.value = Global.round + DRAW_DELAY_ROUNDS   // forward only
    return
  }

  const rngState = pcg64Init(seed.slice(0, 16))
  let upperBound = this.weightedBidTotal.value
  if (upperBound < MAX_UINT64) { upperBound += 1 }
  this.winningTicket.value = pcg64Random(rngState, 1, upperBound, 1)[1][0].asUint64()
}
```

Raffle uses the same shape. The zero- and one-ticket branches from AR-07 come before the commit, and there is no `excludeWinnerWeight`.

- **ABI / schema / boxes:** No changes. `raffle()void` keeps its signature but now has two phases.
- **SDK:**
  - `akita-sdk/src/auction/index.ts:219` `raffle()` and `akita-sdk/src/raffle/index.ts:367` `raffle()`: document the two phases, or add a `drawWinner()` helper that calls `raffle()`, polls until `Global.round >= state.raffleRound + 8`, then calls `raffle()` again.
  - Plugin `raffle()` hooks (`wallet/plugins/auction.ts`, `wallet/plugins/raffle.ts`): no ABI change.
- **Migration:**
  - For legacy children not yet drawn, upgrade before anyone calls `raffle()`.
  - A legacy child whose `raffleRound` was already set by old code without a ticket (only possible after an empty-seed failure) would reveal a past round. Accept that (rare), or have the DAO upgrade only children with `raffle_round == 0`.
  - Draws that already happened cannot be redone.
- **Regression tests:** `auction/auction.e2e.spec.ts` and `raffle/raffle.e2e.spec.ts`, case "draw is committed to a future round":
  1. After the end, `raffle()` sets `raffleRound == txnRound + 8` and leaves `winningTicket == 0`.
  2. An immediate second call fails with `errNotEnoughTime`.
  3. After advancing 16 rounds, the ticket is drawn.
  4. With `mock.setEmpty(true)`, the reveal leaves `raffleRound > previous` and `> currentRound`.
- **Residual risk:** If the beacon's history window is shorter than the time before someone reveals, a party who dislikes the (now public) outcome can wait for the committed round to age out, then trigger a forward re-commit, which is a re-roll. Mitigations:
  - Have keepers and the SDK reveal promptly.
  - Optionally cap re-commits (`vrfFailureCount` ≤ N), after which only the seller or DAO can trigger the draw.
- **Design decision D1 (Kyle):**
  - (a) **Commit at the first post-end call plus N rounds** (sketch above). *Recommended*: robust, no dependence on block history, no new state.
  - (b) Anchor to the first round after `endTimestamp`. The caller supplies `r`, and the contract checks `op.Block.blkTimestamp(r) > end && op.Block.blkTimestamp(r - 1) <= end`. This is a single step and nobody chooses the round, but `blkTimestamp` only covers about the last 1000 rounds, so (a) is still needed as a fallback.
  - (c) Record the round at the last bid or entry. Rejected: the last bidder or entrant controls it.
- **Cross-family:** `staking-pool/contract.algo.ts:1024-1046` uses `+4·failures` stepping too. Apply the same forward re-commit there (another reviewer's scope).

### AR-02: Make the loser raffle always resolvable. Size M
**Change: `auction/contract.algo.ts`.**

At commit time, remove the auction winner's weight. Delete the amount-based skip in `findWinner`. Settle without a raffle when no eligible weight remains. Self-heal legacy dead-range children.

```ts
private excludeWinnerWeight(): void {
  if (this.bidID.value === 1) { return }                       // no bids
  const { account } = this.bids(this.bidID.value - 1).value
  const loc = this.bidsByAddress(account).value
  const box: uint64 = loc / ChunkSize
  const w = this.weights(box).value[loc % ChunkSize].asUint64() // idempotent: 0 after the first call
  this.weights(box).value[loc % ChunkSize] = new Uint64(0)
  this.weightTotals.value[box] = new Uint64(this.weightTotals.value[box].asUint64() - w)
  this.weightedBidTotal.value -= w
}

private rafflePool(): uint64 {                                   // AR-03
  return this.raffleAmount.value - this.getBidFee(this.highestBid.value)
}

private settleWithoutRaffle(): void {
  const pool = this.rafflePool()
  if (pool > 0) { this.sendToAkitaEscrow(pool) }                 // D2c
  this.rafflePrizeClaimed.value = true
}

private resetDraw(): void {                                      // legacy dead-range recovery only
  this.winningTicket.value = 0
  this.raffleRound.value = 0
  this.findWinnerCursors.value = { startingIndex: 0, currentRangeStart: 1 }
}

findWinner(iterationAmount: uint64): void {
  // ...existing asserts...
  const info = this.getWinnerWeightBoxInfo()          // AR-08 version
  const startingIndex = info[0]
  let currentRangeStart = info[1]
  if (startingIndex >= this.uniqueAddressCount.value) { this.resetDraw(); return }
  // ...clamp iterationAmount as today...
  for (let i: uint64 = 0; i < iterationAmount; i += 1) {
    const amount = weight[chunkOffset + i].asUint64()      // no `amount === highestBid` skip
    const currentRangeEnd: uint64 = currentRangeStart + amount
    if (this.winningTicket.value >= currentRangeStart && this.winningTicket.value < currentRangeEnd) {
      this.raffleWinner.value = this.locations(startingIndex + i).value
    }
    currentRangeStart = currentRangeEnd
  }
  this.findWinnerCursors.value = { startingIndex: startingIndex + iterationAmount, currentRangeStart }
}

// refundMBR gate (line 833)
loggedAssert(
  this.bidFee.value === 0 || this.raffleWinner.value !== Global.zeroAddress || this.rafflePrizeClaimed.value,
  errWinnerNotFound
)
```

Optional consecutive self-outbid rejection (D2b), in `createBid` / `createBidAsa` before `newBidID()`:

```ts
if (this.bidID.value > 1) {
  loggedAssert(this.bids(this.bidID.value - 1).value.account !== Txn.sender, errCannotOutbidSelf)
}
```

Optional factory guard: `loggedAssert(bidFee === 0 || startingBid > 0, errInvalidStartingBid)`. This ensures every bid has positive weight.

- **ABI / schema / boxes:** No changes. New error constants go in `auction/errors.ts` and `akita-sdk/src/auction/errors.ts`.
- **SDK:** `findWinner` loops should stop when `raffleWinner != zero` **or** `winningTicket` is back to 0 (legacy reset: call `raffle()` again). `refundMBR` can now run after a no-raffle settlement.
- **Migration:**
  - Legacy children whose search ran out without a winner self-heal after the upgrade. The next `findWinner` resets, `raffle()` re-commits and excludes the winner, then the draw runs again.
  - Single-bidder or self-outbid legacy children settle on the first post-upgrade `raffle()`.
- **Regression tests:** `auction/auction.e2e.spec.ts`
  1. Two bidders A=1.0 and B=1.1, with the mock seed chosen so the old ticket would land in B's range. The raffle winner is A, and the full lifecycle reaches `deleteAuctionApp`.
  2. A single-bidder fee auction: `raffle()` sets `rafflePrizeClaimed` with no draw. Then refundMBR, clear, delete.
  3. A self-outbid sequence A, A: rejected (if D2b = reject) or settled.
  4. A plugin variant in `arc58/plugins/auction/auction.e2e.spec.ts`.
- **Design decision D2 (Kyle):**
  - (a) Exclude the winner by zeroing their weight at commit. *Recommended*: smallest code; the box totals stay consistent for AR-08.
  - (b) Self-outbid: reject consecutive self-outbids (*recommended*, matches the documented behaviour; with `startingBid > 0`, a no-loser auction then always has an empty pool), or allow raising your own high bid, in which case your retained fees go to the other losers.
  - (c) Where a non-empty pool goes when there are no eligible losers (only legacy children or self-raise): DAO escrow (*recommended*) or seller.

### AR-03: Raffle pool must exclude the winning bid's fee. Size S
**Change: `auction/contract.algo.ts` `claimRafflePrize()`.**

Pay `rafflePool()` (see AR-02) instead of `raffleAmount`. Accrual stays unchanged, so legacy and new children use identical accounting. No migration of `raffleAmount` is needed.

```ts
const pool = this.rafflePool()
const { auctionRafflePercentage } = getNFTFees(this.akitaDAO.value)
const akitaFee = calcPercent(pool, auctionRafflePercentage)
const leftover: uint64 = pool - akitaFee
// ...same transfers using akitaFee / leftover...
```

Alternative (not recommended): accrue the previous highest bid's fee when it is outbid. That breaks legacy children mid-auction (fees would be counted twice).

- **ABI / schema / boxes / SDK:** No changes. If the SDK shows the pool, compute it as `raffleAmount - fee(highestBid)`.
- **Migration:** Legacy children that have not claimed become solvent after the upgrade. Pools already overpaid cannot be recovered. Losers left short can be reimbursed by the DAO after an indexer review of claimed fee auctions.
- **Regression test:** `auction/auction.e2e.spec.ts`, "claim before refunds stays solvent":
  1. 3–5 bidders; `claimRafflePrize` before any refund.
  2. Then `refundMBR` over all bids.
  3. Assert every loser received `amount - fee` and the raffle winner received `Σ losing fees - akita cut`.
  4. Assert `deleteAuctionApp` succeeds with an exact factory balance.
  5. Repeat with an ASA bid.

### AR-04: Auction with no bids, and pre-start cancel for fee auctions. Size S–M
**Change: `auction/contract.algo.ts` `claimPrize()`, `clearWeightsBoxes()`, `cancel()`.**

```ts
private returnPrizeToSeller(): void {            // extracted from cancel()
  if (this.isPrizeBox.value) {
    abiCall<typeof PrizeBox.prototype.transfer>({ appId: this.prize.value, args: [this.seller.value] })
  } else {
    itxn.assetTransfer({ assetCloseTo: this.seller.value, xferAsset: this.prize.value }).submit()
  }
}

claimPrize(): void {
  loggedAssert(Global.latestTimestamp > this.endTimestamp.value, errAuctionHasNotEnded)
  loggedAssert(!this.prizeClaimed.value, errPrizeAlreadyClaimed)
  if (this.bidID.value === 1) {                  // no bids
    this.returnPrizeToSeller()
    this.prizeClaimed.value = true
    this.rafflePrizeClaimed.value = true
    return
  }
  // ...existing...
}

clearWeightsBoxes(iterationAmount: uint64): uint64 {
  const preStartCancel: boolean =
    Txn.sender === this.seller.value && this.bidID.value === 1 && Global.latestTimestamp < this.startTimestamp.value
  loggedAssert(
    preStartCancel ||
    (Global.latestTimestamp > this.endTimestamp.value && this.prizeClaimed.value && this.rafflePrizeClaimed.value),
    errRaffleNotPrizeClaimed
  )
  // ...delete loop...
  itxn.payment({ receiver: this.funder.value.account, amount: returnAmount }).submit()   // AR-09/13
  return returnAmount
}
```

`cancel()` stays as is (it still requires `weightsBoxCount === 0`) but calls `returnPrizeToSeller()`. Once weights are cleared, bids revert (`loc < ChunkSize * 0`), so a seller who clears and never cancels just lands in the no-bid path. Also add `loggedAssert(weightListLength <= 15, errTooManyWeightBoxes)` in `Auction.init` and `AuctionFactory`, because `weightTotals` has 15 slots.

- **ABI / schema / boxes:** No changes.
- **SDK:** `AuctionFactorySDK.cancelAuction` for fee auctions must first call `AuctionSDK.clearWeightsBoxes` (as the seller), then `cancelAuction`. Update the plugin `cancel` path (AR-14).
- **Migration:** Ended no-bid auctions are recoverable after the upgrade. Anyone calls `claimPrize` (the prize goes to the seller), then `clearWeightsBoxes`, then the seller calls `deleteAuctionApp`.
- **Regression tests:** `auction/auction.e2e.spec.ts`
  1. "No bids, fee auction": after the end, claimPrize returns the prize to the seller; clear; delete; exact seller refund.
  2. Same for a zero-fee auction and a prize box.
  3. "Fee auction pre-start cancel": the seller clears weights and cancels. A non-seller clearing pre-start is rejected.

### AR-05: Reachable Auction deletion. Size S
**Change: `auction/contract.algo.ts` `deleteApplication()`.**

```ts
loggedAssert(this.bidFee.value === 0 || this.rafflePrizeClaimed.value, errRaffleWinnerHasNotClaimed)
// ...
if (!this.isPrizeBox.value && Global.currentApplicationAddress.isOptedIn(Asset(this.prize.value))) {
  itxn.assetTransfer({ assetCloseTo: Global.creatorAddress, xferAsset: this.prize.value }).submit()
}
if (this.bidAsset.value.id !== 0 && Global.currentApplicationAddress.isOptedIn(this.bidAsset.value)) {
  itxn.assetTransfer({ assetCloseTo: Global.creatorAddress, xferAsset: this.bidAsset.value }).submit()
}
itxn.payment({ closeRemainderTo: Global.creatorAddress }).submit()
```

- **ABI / schema / boxes / SDK:** No changes.
- **Migration:** Claimed but undeletable legacy auctions become deletable after the upgrade. Their weights MBR was already paid to the factory by legacy `clearWeightsBoxes`; see the AR-09/13 reconciliation.
- **Regression tests:** `auction/auction.e2e.spec.ts`: full lifecycle to `deleteAuctionApp` for each of:
  - ASA prize with ALGO bid (buyer opted in);
  - ASA prize with a buyer not opted in (disbursement path);
  - zero-fee auction;
  - prize box.

  Assert the factory balance before equals after, and the funder receives exactly the released MBR.

### AR-06: ASA-bid Akita fee goes to the escrow. Size S
**Change: `auction/contract.algo.ts` `completeAsaPayments()`.** Introduce a shared helper, also used by AR-02 and `claimRafflePrize`.

```ts
private sendToAkitaEscrow(amount: uint64): void {
  if (this.bidAsset.value.id === 0) {
    itxn.payment({ receiver: this.akitaDAOEscrow.value.app.address, amount }).submit()
  } else if (this.akitaDAOEscrow.value.app.address.isOptedIn(this.bidAsset.value)) {
    itxn.assetTransfer({ assetReceiver: this.akitaDAOEscrow.value.app.address, assetAmount: amount, xferAsset: this.bidAsset.value }).submit()
  } else {
    this.optAkitaEscrowInAndSend(this.bidAsset.value, amount)
  }
}
// completeAsaPayments: replace lines 320-334 with `this.sendToAkitaEscrow(leftover)`
```

- **ABI / schema / boxes / SDK:** No changes.
- **Migration:** Ended ASA-bid auctions are currently unclaimable. Upgrade, then `claimPrize`. Enumerate children with `bid_asset != 0` via indexer.
- **Regression test:** `auction/auction.e2e.spec.ts`, "ASA-bid auction settles". Escrow ASA balance increases by the leftover, the DAO app account is untouched, and the lifecycle completes to deletion.

### AR-07: Raffle with 0 or 1 tickets is settleable; validate configuration. Size M
**Change: `raffle/contract.algo.ts` `raffle()`, `claimRafflePrize()`; `raffle/factory.algo.ts` `createChildApp()`.**

```ts
// Raffle.raffle(): before the AR-01 commit
loggedAssert(this.winner.value === Global.zeroAddress, errWinnerAlreadyFound)
if (this.ticketCount.value === 0) { this.winner.value = this.seller.value; return }   // prize returns to seller
if (this.ticketCount.value === 1) { this.winningTicket.value = 1; return }

// claimRafflePrize(): the winner may have no entry (seller sentinel)
let marketplace = this.marketplace.value
if (this.entriesByAddress(this.winner.value).exists) {
  marketplace = this.entries(this.entriesByAddress(this.winner.value).value).value.marketplace
}
// ASA branch: wrap every payout in `if (amount > 0) { ... }`; zero-amount axfers fail for
// receivers that are not opted in, and createInstantDisbursement(0) wastes MBR

// RaffleFactory.createChildApp()
loggedAssert(maxTickets > 0 && maxTickets >= minTickets, errInvalidTicketBounds)
loggedAssert(endTimestamp > startTimestamp, errInvalidEndingRound)
```

- **ABI / schema / boxes:** No changes. New error constants in `raffle/errors.ts` and the SDK `raffle/errors.ts`.
- **SDK:** `RaffleSDK.claimPrize` callers should accept `winner == seller`.
- **Migration:** Ended zero-entry or one-unit raffles recover after the upgrade: `raffle()` → `claimRafflePrize` → `refundMBR` → `clearWeightsBoxes` → `deleteRaffle`.
- **Regression tests:** `raffle/raffle.e2e.spec.ts`
  1. Zero entries: the prize goes back to the seller and the raffle deletes.
  2. Entries with 0 tickets (`minTickets = 0`): seller gets the prize, entrants get their MBR back.
  3. A single entry of 1 unit wins.
  4. An ASA-ticket zero-entry raffle.
  5. Factory rejects `max < min` and `max = 0`.
- **Design decision D3 (Kyle):** Should a raffle with tickets but too little participation also return the prize? That needs a new "minimum total tickets" field, which means a schema change, so new children only. *Recommendation:* defer; ship the 0/1-ticket fix now.

### AR-08: Fix the winner-search cursor across boxes. Size M
**Change: `getWinnerWeightBoxInfo()` and the cursor store in both contracts.** Skip whole boxes only when the cursor sits on a box boundary, and always store the start position the call actually iterated from.

```ts
// Raffle (Auction is identical with startingIndex/currentRangeStart field names)
private getWinnerWeightBoxInfo(): [uint64, uint64] {
  let startingIndex = this.findWinnerCursors.value.index
  let currentRangeStart = this.findWinnerCursors.value.amountIndex
  while (startingIndex % ChunkSize === 0 && startingIndex / ChunkSize < this.weightsBoxCount.value) {
    const boxStake = this.weightTotals.value[startingIndex / ChunkSize].asUint64()
    if (this.winningTicket.value < currentRangeStart + boxStake) { break }
    startingIndex += ChunkSize
    currentRangeStart += boxStake
  }
  return [startingIndex, currentRangeStart]
}

// Raffle.findWinner end (replaces lines 588-589)
loggedAssert(startingIndex < this.entryCount.value, errWinnerNotFound)   // invariant
// ...loop...
this.findWinnerCursors.value = { index: startingIndex + iterationAmount, amountIndex: currentRangeStart }
```

- **ABI / schema / boxes / SDK:** No changes.
- **Migration:** Only children with more than 4096 entries or bidders are affected. Check `entry_count` and `unique_address_count` via indexer; probably none.
  - Do not upgrade a child in the middle of a search with a desynced cursor.
  - If one exists, its stored cursor cannot be repaired without new code. Options: a DAO-only reset method in a one-off bytecode, or accept the risk.
- **Regression tests:**
  1. A plain-TS model test, e.g. `projects/akita-sc/tests/unit/winner-search.spec.ts` (vitest; no PuyaTs runtime needed). It mirrors the algorithm with a configurable chunk size, randomises weights, tickets and `iterationAmount` sequences, and asserts that the address found is the same as a linear scan for every sequence.
  2. A slow e2e in `raffle/raffle.e2e.spec.ts`, behind a `SLOW=1` flag: 4100 entrants, ticket forced into box 1 with the mock seed, `findWinner(1)` then `findWinner(big)`. Asserts the correct winner.

### AR-09: Exact refunds when a Raffle child is deleted. Size M
**Change: `raffle/contract.algo.ts` `deleteApplication()` and `clearWeightsBoxes()`; `raffle/factory.algo.ts` `deleteRaffle()`.**

Pattern:
- The child pays each component it releases directly to the funder.
- The child closes all remaining holdings to the factory.
- The factory refunds exactly what it measurably received (its balance delta plus its minimum-balance release).

The creation fee is never refunded. It went to the escrow, so measurement excludes it automatically.

```ts
// Raffle.clearWeightsBoxes(): pay the funder, not the factory
itxn.payment({ receiver: this.funder.value.account, amount: returnAmount }).submit()

// Raffle.deleteApplication()
@abimethod({ allowActions: 'DeleteApplication' })
deleteApplication(): void {
  // ...existing asserts...
  if (this.ticketAsset.value.id !== 0 && Global.currentApplicationAddress.isOptedIn(this.ticketAsset.value)) {
    const to = Global.creatorAddress.isOptedIn(this.ticketAsset.value) ? Global.creatorAddress : this.ticketAsset.value.creator
    itxn.assetTransfer({ assetCloseTo: to, xferAsset: this.ticketAsset.value }).submit()
  }
  if (!this.isPrizeBox.value && Global.currentApplicationAddress.isOptedIn(Asset(this.prize.value))) {
    itxn.assetTransfer({ assetCloseTo: Global.creatorAddress, xferAsset: this.prize.value }).submit()
  }
  itxn.payment({ closeRemainderTo: Global.creatorAddress }).submit()
}

// RaffleFactory.deleteRaffle()
deleteRaffle(appId: Application): void {
  loggedAssert(appId.creator === Global.currentApplicationAddress, errNotARaffle)
  const { account: receiver } = getFunder(appId)
  const balBefore: uint64 = Global.currentApplicationAddress.balance
  const minBefore: uint64 = Global.currentApplicationAddress.minBalance
  compileArc4(Raffle).call.deleteApplication({ appId })
  const released: uint64 =
    (Global.currentApplicationAddress.balance - balBefore) + (minBefore - Global.currentApplicationAddress.minBalance)
  itxn.payment({ amount: released, receiver }).submit()
}
```

Inner fees are pooled from the outer transaction, as everywhere else in the repo. If the caller underpays fees, the shortfall comes out of `released`, which is the right party.

- **ABI / schema / boxes:** No changes. The `funder.amount` field becomes informational only.
- **SDK:** Update the docs for `RaffleFactorySDK.deleteRaffle` / `cost()`: the creation fee is non-refundable. Add a readonly `newRaffleCost(...)` on RaffleFactory, mirroring `createChildApp`. That is an ABI addition, and it lets the SDK (`raffle/factory.ts:49-89`, currently a hard-coded mirror including a 10 ALGO fee default) and the plugin (AR-14) stop duplicating the formula.
- **Migration:** Apply C3 order: factory before children.
  - Legacy raffles deleted before their child upgrade still strand their own child funding; the measured refund will not overpay. Upgrade live raffles promptly, because `deleteRaffle` is permissionless.
  - **Reconciliation:**
    - Legacy children whose weights were already paid to the factory by old `clearWeightsBoxes` and are still undeleted get no weights refund under the new logic. Their weights MBR sits in the factory.
    - Past deletions over-refunded `creationFee + child funding` out of the pooled balance.
    - Snapshot the factory's spendable balance (balance minus min balance) and list outstanding children via indexer.
- **Design decision D5 (Kyle):** How to reconcile legacy weights MBR held in the factory:
  - (a) A DAO-gated one-shot `rescueRefund(receiver, amount)` in this factory upgrade, removed in the next one;
  - (b) DAO treasury reimburses those funders directly. *Recommended*: no extra factory surface;
  - (c) accept the loss.

  Also coordinate with the marketplace reviewer so all child factories share one exact-refund helper. A candidate is a `protected measuredRelease(before: uint64, minBefore: uint64): uint64` in `utils/base-contracts/factory.ts`.
- **Regression tests:**
  - `raffle/raffle.e2e.spec.ts`, full lifecycle for each of ALGO ticket, ASA ticket and prize box:
    - assert the factory spendable balance is unchanged before vs after;
    - assert funder refund == weights MBR (paid at clear) + released child funding + app-param MBR, minus the creation fee;
    - assert the child account is gone with no leftover.
  - Two concurrent raffles, one deleted, with the other's funds untouched (pooled-balance isolation).

---

## Medium

### AR-10: The settlement referrer must not be the caller. Size S (shared helper)
**Change: `utils/functions.ts`.** Add a variant that takes an explicit account, and keep the existing function as a wrapper:

```ts
export function sendReferralPaymentFor(akitaDAO: Application, account: Account, asset: uint64, amount: uint64): ReferralPaymentInfo {
  const wallet = getWalletIDUsingAkitaDAO(akitaDAO, account)
  const referrer = referrerOrZeroAddress(wallet)
  // ...body identical to sendReferralPayment...
}
export function sendReferralPayment(akitaDAO: Application, asset: uint64, amount: uint64): ReferralPaymentInfo {
  return sendReferralPaymentFor(akitaDAO, Txn.sender, asset, amount)
}
```

Call sites to switch:
- `auction/contract.algo.ts:264, 317` → `sendReferralPaymentFor(this.akitaDAO.value, this.seller.value, ...)`
- `raffle/contract.algo.ts:645, 703`, same.

- **ABI / schema / SDK:** No changes.
- **Migration:** Child upgrade only.
- **Regression test:** In `auction/auction.e2e.spec.ts` and `raffle/raffle.e2e.spec.ts`, a third-party wallet with its own referrer calls `claimPrize` through the plugin. The referral disbursement goes to the chosen party's referrer, not the caller's.
- **Design decision D4 (Kyle):** Whose referrer:
  - seller (*recommended*: the sale tax is already based on the seller's impact);
  - buyer/winner;
  - none, with the whole fee to the escrow.

  Check with the marketplace reviewer, since Listing likely has the same pattern.

### AR-11: Reject prize == payment asset. Size S
**Change:**
- `auction/factory.algo.ts` `newAuction()`: `loggedAssert(assetXfer.xferAsset.id !== bidAssetID, errPrizeIsBidAsset)`.
- `raffle/factory.algo.ts` `newRaffle()`: `loggedAssert(assetXfer.xferAsset.id !== ticketAsset, errPrizeIsTicketAsset)`.

Prize boxes are app IDs, which share the ID space with assets, so no collision is possible.

- **ABI / schema / boxes:** No changes. New error constants (contract and SDK).
- **Migration:** Use the indexer to find any live child where `prize == bid_asset/ticket_asset`. If one exists, recovering it needs a child bytecode that transfers only the escrowed prize amount; that is not proposed unless such a child exists.
- **Regression test:** In the factory specs, `newAuction` and `newRaffle` with prize == payment asset revert.

### AR-13: AuctionFactory refunds only what was measurably released. Size S (same pattern as AR-09)
**Change:**
- `auction/factory.algo.ts` `deleteAuctionApp()` and `cancelAuction()`: replace `amount` from `getFunder` with the measured `released` (code as in AR-09).
- `Auction.clearWeightsBoxes` pays `this.funder.value.account` (already in the AR-04 sketch).
- `Auction.deleteApplication` and `cancel` already close to the factory.

- **ABI / schema / boxes / SDK:** No changes.
- **Migration:** C3 order, plus the D5 reconciliation. Every fee auction that completed `clearWeightsBoxes` under legacy code has its ~39 ALGO weights MBR held in the factory.
- **Regression test:** `auction/auction.e2e.spec.ts`. On the buyer-not-opted-in path (disbursement consumed), the factory's spendable balance is unchanged and the funder receives everything except the consumed disbursement MBR.

---

## Low

### AR-12: Correct the Auction box MBR constants. Size S (deployment-coupled)
**Change: `auction/constants.ts`.** Set `AuctionMBRBids = 35_300` (2500 + 400·(9 + 73)) and `AuctionMBRBidsByAddress = 18_900` (2500 + 400·(33 + 8)).

- **ABI / schema / boxes:** No changes. `mbr()` returns the new values.
- **SDK:** `AuctionSDK.bid` already reads `mbr()` from the child on-chain (`akita-sdk/src/auction/index.ts:~141`), so nothing changes. The plugin computes MBR from its **own** baked `BaseAuction` constants (`arc58/plugins/auction/contract.algo.ts:273`). It must instead read the child, otherwise every plugin bid on an upgraded child fails:

  ```ts
  const { bids, bidsByAddress, locations } = abiCall<typeof BaseAuction.prototype.mbr>({ appId }).returnValue
  ```

  **Dependency:** the plugin redeploy (AR-14) must ship before or with any child upgrade.
- **Migration:** For upgraded legacy children, `refundMBR` refunds the full actual MBR, including the 400 µALGO that bidders underpaid. The child's liquid funds absorb it, at negligible cost.
- **Regression test:** `auction/auction.e2e.spec.ts`. For one bid, the app's min-balance increase equals the quoted `bids + bidsByAddress + locations`.

### AR-15: Raffle factory must be opted into the ticket asset. Size S
**Change: `raffle/factory.algo.ts` `createChildApp()`.** Add:

```ts
loggedAssert(isAlgoTicket || Global.currentApplicationAddress.isOptedIn(Asset(ticketAsset)), errNotOptedIn)
```

This matches Auction. The factory's `optIn` also opts the escrow in, so `claimRafflePrize` never takes the unbudgeted branch. AR-09 also needs it, so the ticket-asset close can go to the factory.

- **ABI / schema / boxes:** No changes.
- **SDK:** `RaffleFactorySDK.newRaffle` should call `optIn({ asset: ticketAsset })` first when the factory is not opted in. `raffle/factory.ts:258` has the method.
- **Migration:** Legacy children: after the upgrade, `deleteApplication` closes to the asset creator when the factory is not opted in (AR-09 sketch).
- **Regression test:** `raffle/raffle.e2e.spec.ts`. An ASA-ticket raffle without a factory opt-in reverts; with the opt-in, the full lifecycle completes and the escrow receives the fee.

### AR-14: Plugin repairs (redeploy; no rekey risk). Size M overall
Every fix below is cheap and worth doing, because a redeploy is needed anyway for AR-12.

**Auction plugin (`arc58/plugins/auction/contract.algo.ts`):**
- `new` and `listPrizeBox`: get the payment amount from `abiCall<typeof AuctionFactory.prototype.newAuctionCost>({ appId: this.factory.value, args: [isPrizeBox, bidAssetID, prizeID, weightsListCount] }).returnValue`.
- `new` and `listPrizeBox`: guard the bid-asset opt-in with `bidAssetID !== 0 && !...isOptedIn(...)`.
- `bid`: get MBR from the child (AR-12).
- `clearWeightsBoxes`: use `appId: Application(auctionAppID)`.
- `cancel`: call `AuctionFactory.prototype.cancelAuction`.
- `deleteApplication`: redirect to `AuctionFactory.prototype.deleteAuctionApp`, keeping the ABI name so installed method restrictions still match.

**Raffle plugin (`arc58/plugins/raffle/contract.algo.ts`):**
- `newRaffle` and `newPrizeBoxRaffle`: use the new `RaffleFactory.newRaffleCost` (AR-09).
- Remove the duplicated prize opt-in block.
- Fix the inverted `ticketAssetIsAlgo` opt-in.
- Read the ticket asset with `Asset(op.AppGlobal.getExUint64(appId, Bytes(RaffleGlobalStateKeyTicketAsset))[0])`.
- `enter` / `add`: add a gated branch (when `args.length > 0`) that calls `gatedEnter` / `gatedEnterAsa` / `gatedAdd` / `gatedAddAsa`. Build the gate app call as the auction plugin does (selector `GateMustCheckAbiMethod`, the subject, `gateID` read with `getExUint64`). The subject must be `sender` for today's Raffle contract (it gates on `Txn.sender`), or `origin` if Raffle is aligned with Auction after ACC-01 (see dependencies).
- `deleteRaffleApplication`: call `RaffleFactory.prototype.deleteRaffle`.

- **ABI:**
  - Plugin ABIs are unchanged in name.
  - Plugin `cancel` / `deleteApplication` change their target, not their signature.
  - Gated raffle entry has no new methods; `args` is now honoured.
  - New app IDs: update the DAO `PluginAppList`, the SDK network config, and `scripts/deploy-auction-plugin.ts` / `deploy-raffle-plugin.ts`. Wallets must reinstall the plugins (method-restriction indices unchanged).
- **SDK:** `akita-sdk/src/wallet/plugins/auction.ts`, `wallet/plugins/raffle.ts`: point at the new app IDs, and pass gate args for gated raffles.
- **Regression tests:** `arc58/plugins/auction/auction.e2e.spec.ts`, `arc58/plugins/raffle/raffle.e2e.spec.ts`:
  - create ALGO-bid and ASA-bid auctions and a prize-box auction through the plugin;
  - full lifecycle through plugin `clearWeightsBoxes` and `deleteAuctionApp`;
  - gated raffle entry through the plugin;
  - after every call, assert the spending account's auth address is unchanged.
- **Won't fix:** None.

---

## Dependency map

- **AR-01 hosts AR-02:** `excludeWinnerWeight` runs in the commit branch. AR-02's legacy self-heal (`resetDraw`) relies on AR-01's commit semantics.
- **AR-02 + AR-08:** zeroing the winner's weight keeps `weightTotals` consistent, which the AR-08 box skipping needs.
- **AR-03 is used by AR-02** (`rafflePool()` in `settleWithoutRaffle`).
- **AR-04, AR-05 and AR-07 deletions all end in AR-09/AR-13.** Ship the measured-refund factories first (C3), or upgraded children double-pay the weights MBR.
- **AR-06 introduces `sendToAkitaEscrow`,** reused by AR-02 and `claimRafflePrize`.
- **AR-12 needs the AR-14 plugin redeploy first:** the plugin must read child MBR, or plugin bids break.
- **AR-15 is required by AR-09:** the ticket-asset close goes to the factory.
- **AR-10 changes `utils/functions.ts`** (shared): coordinate with the marketplace reviewer, since Listing likely uses `sendReferralPayment` the same way.
- **ACC-01 (origin spoofing, other family):**
  - `Auction.gatedBid` / `gatedBidAsa` derive the gate subject with `originOrTxnSender(getWalletIDUsingAkitaDAO(Txn.sender))` (`auction/contract.algo.ts:669-673, 691-695`). The ACC-01 fix lands in that shared helper; Auction needs only a rebuild and upgrade.
  - Raffle gates on `Txn.sender`. After ACC-01, decide whether to align Raffle to `origin` (D6, *recommended*: align, so a wallet user's gate is checked against their controlled address consistently). That changes which subject the AR-14 plugin passes.
- **Marketplace reviewer:**
  - Use one shared exact-refund helper for every child factory (AR-09/AR-13, D5).
  - PrizeBox transfer to and from children is unchanged here.
- **Staking pool (other family):** same forward re-commit fix as AR-01.

## Design decisions needed from Kyle

| ID | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | AR-01 randomness anchor | (a) commit at first post-end call + 8 rounds, re-commit forward on failure; (b) first round after `endTimestamp` via `op.Block.blkTimestamp`, with (a) as fallback; (c) round of the last bid | **(a)**. Optionally cap re-commits, then restrict who may draw. |
| D2 | AR-02/03 loser-raffle semantics | exclusion method; self-outbid reject vs allow; no-loser pool → escrow vs seller | **Zero the winner's weight at commit**; **reject consecutive self-outbid** and require `startingBid > 0` for fee auctions; **escrow** for legacy no-loser pools |
| D3 | AR-07 minimum participation | add a min-total-tickets field (schema change, new children only) vs defer | **Defer**; ship the 0/1-ticket fix |
| D4 | AR-10 referrer identity | seller / buyer-winner / none | **Seller** |
| D5 | AR-09/13 legacy reconciliation | DAO-gated rescue method / DAO treasury reimbursement / accept | **Treasury reimbursement** from an indexer snapshot |
| D6 | Raffle gate subject after ACC-01 | keep `Txn.sender` / align to `origin` | **Align to origin** |
| D7 | Test-only mock-beacon change (controllable seed/empty) | approve / not | **Approve** (AGENTS.md requires explicit approval for contract edits) |
| D8 | Live-child upgrade scope | upgrade all live children vs only stuck ones | **All live children** (needed for AR-01/03/10 correctness), in one or a few batched DAO proposals |

## Rollout checklist

1. Read-only indexer snapshot of every live child of 3569557408 / 3569557743, recording key globals:
   - `bid_fee`, `bid_id`, `prize_claimed`, `raffle_prize_claimed`, `raffle_winner`, `winning_ticket`, `raffle_round`;
   - `weights_box_count`, `bid_asset`/`ticket_asset`, `prize`, `entry_count`, `ticket_count`;
   - `end_timestamp`, and whether the `update` selector is present in the child.
2. Build. Check that the Auction and Raffle approval programs are ≤ 8192 B and the schemas are unchanged (25/10 and 21/9 or smaller).
3. Run `npm test` including the new regressions; slow AR-08 suite separately.
4. DAO proposal(s), in this order:
   1. new plugins and the plugin list;
   2. factory upgrades plus `updateFactoryChildContract`;
   3. `UpgradeApp` per live child;
   4. reconciliation payouts (D5).
5. Post-upgrade keeper run to recover each stuck child:
   - no-bid → `claimPrize`;
   - dead-range → `findWinner` (resets) then `raffle()` ×2;
   - ASA-bid → `claimPrize`;
   - zero-entry raffle → `raffle()`, then `claimRafflePrize`;
   - then refund, clear and delete.
