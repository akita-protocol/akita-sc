# Akita security review: Auction / Raffle / plugins / PCG

Read-only review of the **current working tree** (uncommitted changes included).
Paths are relative to `projects/akita-sc/smart_contracts/`.

## Scope covered

- `auction/contract.algo.ts`, `auction/factory.algo.ts`, `auction/constants.ts`, `auction/types.ts`, `auction/base.ts`
- `raffle/contract.algo.ts`, `raffle/factory.algo.ts`, `raffle/constants.ts`, `raffle/types.ts`, `raffle/base.ts`
- `arc58/plugins/auction/contract.algo.ts`, `arc58/plugins/raffle/contract.algo.ts`
- `utils/types/lib_pcg/{pcg32,pcg64,consts}.algo.ts`, `utils/types/randomness-beacon.ts`
- Cross-read: `utils/functions.ts` (gateCheck, calcPercent, sendReferralPayment, createInstantDisbursement, royalties, getFunder), `utils/base-contracts/{base,factory,optin,upgradeable,child}.ts`, `rewards/contract.algo.ts` (instant disbursements), `arc58/dao/contract.algo.ts` (to check whether it can hold ASAs), e2e specs.

**Regressions.** `CONTRACT_AUDIT.md` lists several Auction and Raffle items as remediated: the winner fee/weight is excluded from the raffle pool, a highest bidder cannot outbid itself, zero-fee/no-loser auctions skip the raffle, ASA fees go to the escrow, raffle configuration is validated, a zero-entry raffle can be cancelled, and factories refund only the MBR that was actually released. None of these fixes is in the current tree. `git diff` on these files shows only error-constant renames. The findings below cover these regressions plus new issues.

Most "locked" outcomes can only be undone by a DAO `update` of the child app. Children inherit `UpgradeableAkitaBaseContract.update`, which the DAO wallet triggers through the update plugin. No user-side path recovers the funds.

---

## Findings

### AR-01: VRF draw round is chosen by the caller and its randomness is already public (Auction + Raffle)
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `auction/contract.algo.ts:753-781`, `raffle/contract.algo.ts:525-551`
- **Description:** The draw round is not fixed when the sale ends. It is set on the first `raffle()` call as `raffleRound = Global.round - 8`, and the call must satisfy `Global.round >= roundToUse + 8`, which means the beacon value is read in that same transaction. The randomness for `Global.round - 8` is already committed on-chain in the beacon when the call executes. The `salt` is also public: it is the creation `Txn.txId`. Anyone can call `raffle()`, so the first caller knows the winning ticket before submitting and picks which round to use.
- **Exploit:**
  1. After the end time, an entrant or losing bidder simulates `beacon.get(R-8, salt)` → `pcg64Random(...)` for upcoming rounds R.
  2. When R gives a ticket inside their own weight range, they submit `raffle()` with `firstValid = lastValid = R`.
  3. They win the raffle prize (Raffle) or the loser pool (Auction).

  The same lever can also deliberately pick a ticket in the Auction "dead range" (AR-02) and brick settlement for everyone, at the cost of one transaction fee.
- **Fix:** Commit then reveal. Fix the draw round in advance: record `drawRound = Global.round + N` (N ≥ 8) when the sale ends or on a separate commit call. Read the beacon only once `Global.round >= drawRound + 8`, and never let a caller move the round. Bound the retry path on beacon failure to deterministic later rounds.

### AR-02: Auction loser raffle can become permanently unresolvable (winner weight in range, single-bidder/self-outbid)
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `auction/contract.algo.ts:149-170` (weights), `775-781` (draw over `weightedBidTotal`), `810-815` (skip `amount === highestBid`), `748` (no redraw), `833` / `592` / `946` (terminal gates)
- **Description:**
  - **Dead range.** `weightedBidTotal` includes the current highest bidder's weight, and the ticket is drawn uniformly over `[1, weightedBidTotal]`. `findWinner` skips the entry whose weight equals `highestBid` but still advances `currentRangeStart` past it. If the ticket falls in that dead range, `raffleWinner` is never set. `raffle()` cannot redraw because `winningTicket !== 0`.
  - **Probability.** The chance of a lock is `highestBid / weightedBidTotal`. Two bidders at 100 and 110 give about 52%.
  - **Single bidder or self-outbid.** No consecutive self-outbid check exists, contrary to the audit doc. With one unique bidder, or a bidder who outbids itself, the lock is certain.
  - **Total of 1.** If `weightedBidTotal == 1`, `pcg64Random` asserts `lower < upper-1`, so `raffle()` always reverts.
- **Impact:** These paths stay blocked forever:
  - `refundMBR`, which requires `raffleWinner`.
  - `claimRafflePrize`.
  - `clearWeightsBoxes`, which requires `rafflePrizeClaimed`.
  - `deleteApplication`.

  Locked funds:
  - the retained loser fees;
  - every bidder's bid, address and location box MBR;
  - the seller's weights MBR (≥ 3 × 13.11 ALGO);
  - the creation deposit.

  AR-01 lets anyone force this outcome on purpose.
- **Exploit:** A single bidder enters a fee auction, or bids twice in a row. Alternatively, a griefer calls `raffle()` at a round whose ticket lands in the winner's range.
- **Fix:**
  - Draw over `weightedBidTotal - highestBidderWeight`, skipping the winner's slot without consuming range, or remove the winner's weight from the totals when the auction ends.
  - Skip the raffle and set `rafflePrizeClaimed` when no losing weight exists.
  - Reject consecutive self-outbids.

### AR-03: Auction raffle pool counts the winning bid's fee, which is never retained, so the pool is insolvent
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `auction/contract.algo.ts:463-466`, `504-507` (fee added for every bid, including the final one), `877-893` (winner's full `amount` paid out as proceeds), `896-941` (`claimRafflePrize` pays `raffleAmount`)
- **Description:** A losing bid keeps its fee (`refundBid` returns `amount - fee`). The winning bid is paid out in full by `claimPrize` through `getAmounts(amount)`, whose parts sum to `amount`. Yet `raffleAmount` also includes `getBidFee(winningAmount)`. So `claimRafflePrize` pays out `fee(win)` more than the contract holds for the pool.
- **Exploit:** As soon as `findWinner` resolves, the raffle winner calls `claimRafflePrize` before the other losers are refunded. The extra `fee(win)` comes out of unrefunded losing bids. The last `refundBid` / `refundMBR` then fails on balance or min-balance, so that bidder loses funds and the app cannot be deleted. If all losers were refunded first, `claimRafflePrize` reverts unless someone donates the shortfall.
- **Fix:** Add a bid's fee to the pool only when the bid becomes a losing bid, at outbid time or at refund. Alternatively, subtract `getBidFee(highestBid)` before paying the pool.

### AR-04: Auction with no bids locks the prize forever
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `auction/contract.algo.ts:877-883` (`bids(bidID-1)` = `bids(0)`, which never exists), `626-630` (`cancel` only before start; fee auctions also fail `weightsBoxCount === 0`), `591` (delete requires `prizeClaimed`)
- **Description:** `bidID` starts at 1. With no bids, `claimPrize` reads the missing box `bids(0)` and reverts. `cancel` is only allowed before `startTimestamp`. For fee auctions, `cancel` is impossible even before start because the weights boxes exist and `clearWeightsBoxes` requires the auction to have ended and both prizes to be claimed.
- **Impact:**
  - Any auction that ends with zero bids permanently traps the prize ASA or PrizeBox, the child's MBR and the seller's deposit, including ~39+ ALGO of weights MBR for fee auctions.
  - Fee auctions cannot be cancelled at all.
- **Fix:**
  - Add a terminal "no bids" path after the end that returns the prize to the seller and allows deletion.
  - Let `cancel` clear the weights boxes when no bids exist.

### AR-05: Auction terminal deletion is unreachable (ASA prizes and zero-fee auctions)
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `auction/contract.algo.ts:597-604` (deletion closes out the prize again), `236-252` (claim already closed it out), `592` (`rafflePrizeClaimed` required unconditionally); `auction/factory.algo.ts:323-337`
- **Description:**
  - **ASA prize.** `transferPurchaseToBuyer` sends the prize with `assetCloseTo: buyer`, or with `createInstantDisbursement(..., closeOut=true)`, which sets `assetCloseTo` to the Rewards app. Either way the child loses its prize holding. `deleteApplication` then issues another `assetCloseTo` for the prize from an account that is no longer opted in, and the AVM rejects it. Every claimed ASA-prize auction is undeletable.
  - **Zero fee.** `rafflePrizeClaimed` can only become true through `claimRafflePrize`. That requires `raffleWinner`, and `findWinner` asserts `bidFee > 0`. Every zero-fee auction is undeletable.
- **Impact:** `deleteAuctionApp` never refunds the funder. For fee auctions, `clearWeightsBoxes` has already paid the ~39 ALGO weights MBR to the factory (`Global.creatorAddress`), so the seller loses it and the factory keeps it as unaccounted pooled balance.
- **Fix:**
  - Close the prize only if `Global.currentApplicationAddress.isOptedIn(prize)`.
  - Require `rafflePrizeClaimed` only when `bidFee > 0` and losing weight exists.
  - Return released MBR to the funder directly or through exact factory accounting (see AR-13).

### AR-06: ASA-bid settlement sends the Akita fee to the DAO app address, which cannot hold ASAs, so `claimPrize` always reverts
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `auction/contract.algo.ts:320-334`
- **Description:** The code checks `akitaDAOEscrow.value.app.address.isOptedIn(bidAsset)` but then transfers to `this.akitaDAO.value.address`. The factory requires itself to be opted into the bid asset, and its `optIn` also opts the DAO escrow in, so the "escrow is opted in" branch is the normal one. The AkitaDAO app contract has no asset-transfer or opt-in code (`arc58/dao/contract.algo.ts`), so its app account is never opted in. The axfer, even with amount 0, fails.
- **Impact:** Every ASA-bid auction cannot settle:
  - the prize and the winning bid stay locked;
  - `refundMBR` stays blocked because `prizeClaimed` stays false;
  - the app can never be deleted.

  If the DAO app were ever opted in, protocol revenue would bypass the revenue escrow instead. This is a regression of the remediated "ASA protocol fee used wrong address" item.
- **Fix:** Use `assetReceiver: this.akitaDAOEscrow.value.app.address`, as the ALGO path and Raffle already do.

### AR-07: A raffle with zero entries, or a total of 1 ticket, can never be drawn and has no cancel path
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `raffle/contract.algo.ts:545-551` (`pcg64Random(…,1,ticketCount+1)` asserts `ticketCount ≥ 2`), `592-594` / `302-306` / `356-361` (everything gated on `winner` / `prizeClaimed`); `raffle/factory.algo.ts` (no cancel, no bound validation)
- **Description:**
  - **No draw.** With `ticketCount ∈ {0,1}`, `raffle()` always reverts, so `winner` is never set.
  - **Everything else is gated.** `claimRafflePrize`, `refundMBR` and `deleteRaffle` all depend on that winner.
  - **No validation.** Nothing checks `minTickets ≤ maxTickets`, `minTickets > 0`, a minimum participation level, or start against now.
  - **No cancel.** There is no zero-entry cancel path, despite the audit doc.
- **Impact:** The prize (ASA or PrizeBox), the weights MBR (≥ 4 × 13.11 ALGO), the seller's deposit and any entrant's MBR or tickets are locked. A raffle nobody enters is a common outcome.
- **Fix:**
  - Add a post-end path that returns the prize and refunds entries when `ticketCount < 2` or participation is below a minimum.
  - With exactly one entrant, award the prize directly.
  - Validate the configuration in the factory.

### AR-08: Chunked winner search loses track of position across weight boxes, giving a wrong, steerable winner or a lock when there are more than 4096 entries
- **Severity:** High for Raffle, Low for Auction. **Confidence:** Confirmed (traced).
- **Location:**
  - `raffle/contract.algo.ts:177-192` and `588-589`
  - `auction/contract.algo.ts:423-437`, `824-827`
- **Description:** `getWinnerWeightBoxInfo` always walks `weightTotals[i]` from box 0, adding to whatever cursor is stored. The stored cursor may already be in the middle of a later box.
  - **Raffle desync.** `findWinner` then stores `index += iterationAmount`, starting from the old stored index rather than from the box start it actually iterated. Meanwhile `amountIndex` holds the advanced range start, so the two drift apart.
  - **Trace (ChunkSize = 4 for illustration).**
    1. Setup: entries e0..e5 each have weight 10, and the ticket is 55, which belongs to e5.
    2. `findWinner(1)` scans e4 and stores `{index:1, amountIndex:51}`.
    3. The next call returns `[1, 51]`, scans box 0 from offset 1, and sets `winner = e1` (wrong).
  - **Raffle steering.** Which wrong entrant wins depends on the caller-chosen `iterationAmount` sequence, so a caller holding entries in box 0 can steer the prize to themselves. Combined with AR-01 they can also choose the ticket.
  - **Raffle lock.** In other layouts, `startingIndex` jumps past `entryCount`, `entryCount - startingIndex` underflows, and `findWinner` reverts forever.
  - **Auction variant.** The Auction stores a consistent index but re-adds `weightTotals[0..]` from a mid-box cursor. When the rest of the current box outweighs box 0, the search jumps a whole box and misses or misattributes the ticket.
- **Impact:** Raffles with more than 4096 entrants select the wrong winner even with honest callers, as soon as the search runs in batches, which `ensureBudget` limits make unavoidable. Inflating the entrant count is cheap because entry MBR is refundable, so an attacker can steer the winner.
- **Fix:** Keep separate `boxIndex` and `offsetInBox` cursors. Skip whole boxes using `weightTotals[boxIndex..]` only when the cursor is at a box boundary. Store `index = startingIndex + iterationAmount` using the iterated start.

### AR-09: RaffleFactory refunds the full creation payment (fee included) while the child's funds are stranded on deletion, draining the pooled factory balance
- **Severity:** High. **Confidence:** Confirmed.
- **Location:** `raffle/factory.algo.ts:94-111` (`raffleCreationFee` forwarded to the DAO escrow but included in `totalMBR`), `127` (funder amount = `totalMBR`), `291-303` (`deleteRaffle` pays `totalMBR`); `raffle/contract.algo.ts:356-362` (`deleteApplication` closes nothing)
- **Description:** On deletion the factory only gets back:
  - the app-param MBR (pages and global state);
  - the weights MBR from `clearWeightsBoxes`.

  `Raffle.deleteApplication` does not close the ticket-asset holding or the ALGO (`Global.minBalance`, opt-in MBR, unused disbursement MBR, any dust). All of that is stranded in the deleted app's account. Yet `deleteRaffle` pays the funder `totalMBR`, which includes `raffleCreationFee` and all the stranded child funding.
- **Impact:**
  - Each deletion takes `raffleCreationFee + Global.minBalance + optinMBR + disbursementMBR` from the factory's pooled balance, which includes other raffles' pending weights refunds.
  - The creation fee is effectively refunded to every seller.
  - Once the pool is empty, later `deleteRaffle` calls revert and those sellers' deposits stay locked.
  - Anyone can call `deleteRaffle`.
- **Fix:**
  - Have `Raffle.deleteApplication` close the ticket asset and `closeRemainderTo` the factory.
  - Record the creation fee as non-refundable.
  - Refund only what the factory actually received back.

### AR-10: Settlement referral fee is captured by whoever calls the claim
- **Severity:** Medium. **Confidence:** Likely (depends on the intended referral semantics).
- **Location:** `utils/functions.ts:617-644` (referrer derived from `Txn.sender`), called from `auction/contract.algo.ts:264`, `317` and `raffle/contract.algo.ts:645`, `703`. `claimPrize` / `claimRafflePrize` have no caller restriction.
- **Description / exploit:**
  1. An attacker creates an Akita wallet whose `referrer` is an address they control. Wallet creation accepts any referrer.
  2. They front-run `claimPrize` or `claimRafflePrize` through the plugin.
  3. `referrerPercentage` of the Akita sale fee goes to the attacker's referrer instead of the buyer's or seller's referrer, or the DAO.
- **Fix:** Derive the referrer from a fixed party, such as the stored winner or seller wallet, not from `Txn.sender` in a permissionless settlement call.

### AR-11: Prize asset equal to the bid/ticket asset bricks settlement
- **Severity:** Medium. **Confidence:** Confirmed.
- **Location:** `auction/factory.algo.ts:40-97` and `raffle/factory.algo.ts:190-209` (no check that the prize ≠ the payment asset); `auction/contract.algo.ts:234-242`; `raffle/contract.algo.ts:603-611`
- **Description:** The prize transfer uses `assetCloseTo` (or a close-out disbursement) on the full holding. When the prize equals the payment asset, that also sends all bids or tickets to the winner and opts the child out. The following fee and seller transfers fail, so `claimPrize` / `claimRafflePrize` can never succeed.
- **Impact:** A seller, whether careless or malicious, can create a raffle in which every entrant's tickets and MBR are locked. In an auction the winning bid and the MBR are locked.
- **Fix:** Reject `prize == bidAsset/ticketAsset` in both factories, or transfer only the escrowed prize amount without closing out.

### AR-12: Auction box MBR constants are underquoted by 400 µALGO
- **Severity:** Low. **Confidence:** Likely.
- **Location:** `auction/constants.ts:66-67`
- **Description:** The actual MBR of the `bids` box is 2500 + 400·(9 + 73) = 35,300, against 34,900 in the constant. The `bidsByAddress` box is 2500 + 400·(33 + 8) = 18,900, against 18,500. Raffle's equivalents, 18,900 and 31,700, are computed correctly. Each bid underpays its MBR by 400 to 800 µALGO, and the shortfall is silently taken from bid principal and the disbursement budget.
- **Impact:** In a large auction where losers were refunded early, `claimPrize` can fail on min-balance. `refundMBR` cannot run until the prize is claimed, so settlement deadlocks until someone donates ALGO. Bidders are also refunded 400 µALGO less per box than they effectively locked.
- **Fix:** Correct the constants, or derive them from the box sizes.

### AR-13: AuctionFactory refunds the full deposit even though disbursement MBR was consumed
- **Severity:** Medium. **Confidence:** Confirmed (currently hidden by AR-05).
- **Location:** `auction/factory.algo.ts:73-80`, `115`, `328-336`
- **Description:** The prize disbursement for a buyer who is not opted in, the referral disbursement and the ASA royalty disbursements each spend `MinDisbursementsMBR + UserAllocationMBR` (plus a possible Rewards opt-in) from the child. That ALGO is credited to the child inside Rewards and never comes back to the factory. `deleteAuctionApp` still pays the funder the full `totalMBR`. Once AR-05 is fixed, each deletion drains the factory's pooled balance by the spent amount, or reverts when the pool is empty.
- **Fix:** Refund the funder the amount actually closed back plus the released app MBR, or treat the disbursement budget as a non-refundable fee.

### AR-14: Plugin methods are non-functional or mis-targeted (no exploitable path, no dangling rekey)
- **Severity:** Info/Low. **Confidence:** Confirmed.
- **Auction plugin:**
  - `new` (`arc58/plugins/auction/contract.algo.ts:102-115`) omits `disbursementMBR` and so mismatches the factory's exact `totalMBR`.
  - `new` also calls `isOptedIn(Asset(0))` and `optIn(Asset(0))` for ALGO bids (`:78-91`).
  - `listPrizeBox` (`:195-201`) omits `Global.minBalance` and the disbursement MBR.
  - `clearWeightsBoxes` calls `appId: this.factory.value` instead of the auction (`:236-241`).
  - `deleteApplication` and `cancel` call the child directly, which fails `Txn.sender === Global.creatorAddress` (`:468-498`).
- **Raffle plugin:**
  - `newRaffle` omits the creation fee, the disbursement MBR and the weights MBR (`arc58/plugins/raffle/contract.algo.ts:122-128`).
  - `newPrizeBoxRaffle` adds the opt-in MBR when the ticket is ALGO, which is inverted (`:195-197`).
  - `enter` and `add` ignore `args` and always call the non-gated method, which reverts on gated raffles (`:236-329`).
  - The ticket asset (a uint64 global) is read with `getExBytes` and `btoi` (`:251`, `:300`).
  - `deleteRaffleApplication` calls the child directly (`:381-395`).
- Every path still ends with `rekeyTo` on its final inner call, so failures are atomic and no spending account is left rekeyed.

### AR-15: Raffle ASA-ticket claim pays escrow opt-in MBR from an unbudgeted balance
- **Severity:** Low. **Confidence:** Likely.
- **Location:** `raffle/contract.algo.ts:706-719`
- **Description:** RaffleFactory does not require itself, and therefore the escrow, to be opted into the ticket ASA. When the escrow is not opted in, `optAkitaEscrowInAndSend` pays `(1 + splits) × 0.1 ALGO` from the child. The factory did not budget for this. The child's only ALGO is the disbursement budget, so the claim can revert until someone donates ALGO.
- **Fix:** Require the factory and escrow to be opted in at creation, as AuctionFactory does, or budget for this cost.

---

## Checked and OK

- **Grouped transactions:**
  - Bid and entry payments and asset transfers are bound by ABI position.
  - The receiver must be the app, amounts are checked against the minimum/maximum plus MBR, and the asset must match the configured bid or ticket asset.
  - The ASA path requires the payment to equal the MBR exactly.
  - A transaction cannot be reused across calls.
  - Unbound `payment.sender` is sponsorship that benefits the bidder, not an exploit.
- **Refunds and claims:**
  - No double refund: the `refunded` flag is set before payout, and the box is deleted afterwards.
  - The winning bid cannot be refunded (`id < bidID-1`).
  - `prizeClaimed` and `rafflePrizeClaimed` prevent double claims.
  - Payouts go to the recorded accounts, never to the caller.
- **Timing and state:**
  - Bids and entries are rejected outside `[start, end]`, and the snipe extension only applies while the auction is live.
  - The draw and claims require `> end`.
  - A non-zero `winningTicket` blocks redraws, and draws are never 0.
  - Weights cannot change after the end.
- **Raffle ranges and randomness:**
  - Ranges are half-open `[start, start+w)`, with the draw in `[1, total]` and the cursor starting at 1. This is correct within a single box.
  - PCG64/PCG32 rejection sampling (threshold = 2^n mod bound) is unbiased, and the bounds are asserted.
- **Fee caps:** `calcPercent` asserts p ≤ 100%, so `bidFee > 100%` only blocks bidding and cannot drain funds. Creator royalty is capped at 50%.
- **Gates:**
  - `gateCheck` binds the gate app, NoOp, the `mustCheck` selector, the subject and the gate ID.
  - Non-gated entry points are blocked when `gateID != 0` (`errHasGate` or a selector check).
  - The plugin passes `origin`, which matches the Auction's `originOrTxnSender`.
- **Child apps:**
  - Child `create` requires an app caller.
  - `init`, `optin`, `cancel` and `deleteApplication` are creator-only.
  - `update`, `updateAkitaDAO` and `updateAkitaDAOEscrow` are gated by the DAO wallet.
  - Plugins and factories check `appId.creator == factory`, so child app IDs cannot be spoofed.
- **Raffle entries:** one entry per address; `add` is bounded by `maxTickets`; entry MBR is refunded exactly to the entrant.
- **Deletion authorization:** Auction deletion and cancel are seller-only. Raffle deletion is open to anyone, but the refund only goes to the recorded funder.
- **Not reported:** the I/O budget for `Raffle.clearWeightsBoxes`, which deletes ≥4 × 32 KB boxes in one call, may be infeasible. I could not confirm it, so it is left out.
