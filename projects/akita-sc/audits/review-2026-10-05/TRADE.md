# TRADE slice review: Auction, Raffle, PrizeBox, Marketplace / Listing, PCG, trade plugins

Reviewer: TRADE slice. Date: 2026-10-05. Tree: HEAD `e7f174ee` plus the uncommitted working tree.
Paths are relative to `projects/akita-sc/smart_contracts/` unless stated otherwise.
Read-only. Nothing was edited or built, and nothing was sent on-chain.

**What ran:**
- Pure unit tests: `raffle/winner-search.test.ts`, `auction/principal-abi.test.ts` and `marketplace/compat-static.test.ts`. 25/25 passed.
- Read-only MainNet queries: algod, indexer, and algod `/v2/teal/disassemble` of the VRF beacon 1615566206.
- No e2e tests were run (shared LocalNet).

## Scope

| File | Lines |
|---|---|
| auction/contract.algo.ts | 1040 |
| auction/factory.algo.ts | 523 |
| auction/constants.ts, errors.ts, base.ts, types.ts | 85 / 84 / 15 / 24 |
| auction/compat/deployed.ts, mocks/legacy-caller.algo.ts, principal-abi.test.ts | 124 / 62 / 236 |
| raffle/contract.algo.ts | 958 |
| raffle/factory.algo.ts | 372 |
| raffle/constants.ts, errors.ts, types.ts, base.ts, compat/deployed.ts, winner-search.test.ts | 54 / 84 / 47 / 13 / 75 / 106 |
| prize-box/contract.algo.ts, factory.algo.ts, constants, errors | 134 / 110 / 2 / 26 |
| marketplace/marketplace.algo.ts | 697 |
| marketplace/listing.algo.ts | 491 |
| marketplace/constants.ts, errors.ts, types.ts, compat-static.test.ts | 55 / 52 / 19 / 58 |
| utils/types/lib_pcg/{pcg32,pcg64,consts}.algo.ts | 167 / 69 / 11 |
| utils/types/mock-randomness-beacon.algo.ts, randomness-beacon.ts | 41 / 7 |
| arc58/plugins/auction/contract.algo.ts | 522 |
| arc58/plugins/raffle/contract.algo.ts | 643 |
| arc58/plugins/marketplace/contract.algo.ts | 364 |
| Read-across: utils/base-contracts/{factory,base,optin,child,upgradeable}.ts, utils/functions.ts (gate/refund/disbursement/referral helpers), utils/programs.ts, rewards instant-disbursement paths, arc58/account rekey-window validation (`:535-575`) | — |
| Compiled artifacts: `artifacts/{auction,raffle,marketplace,prize-box,arc58/plugins/*}/*.arc56.json`, Marketplace / AuctionPlugin TEAL | — |
| HEAD (= MainNet `bc`) versions of the Auction, Raffle and Listing children and their factories | — |

**MainNet inventory, read-only, round 65,700,851:**
- AuctionFactory 3569557408, RaffleFactory 3569557743 and PrizeBoxFactory 3569557972 have **never created a child**.
- Marketplace 3569557584 has 2 live legacy (rev-absent) ALGO-priced listings, 3643990817 and 3691743616, and 1 deleted listing.
- The `bc` boxes are byte-identical to `auction/compat/deployed/Auction.arc56.json` and `raffle/compat/deployed/Raffle.arc56.json`.

Free balances (balance minus min balance):

| Factory | Free balance (µA) |
|---|---|
| AuctionFactory | 356,800 |
| RaffleFactory | 641,200 |
| Marketplace | 1,905,400 |
| PrizeBoxFactory | 0 (account unfunded) |

Raw data is in `scratchpad/review/trade-inventory/`.

## Prior-finding verification

| ID | Status | Evidence |
|---|---|---|
| AR-01 commit-reveal VRF | **Partially fixed** | Commit at the first post-end call (`auction/contract.algo.ts:793-807`, `raffle/contract.algo.ts:794-811`) and reveal at `raffleRound + 8` (`:810` / `:813`). The reveal lag does not match the real beacon (ceil-to-8 plus 2-round submission). An empty read re-commits forward and keeps the round's residue mod 8, which makes the draw stallable. See **TRADE-3**. |
| AR-02 dead range / self-outbid / single bidder | Fixed | `excludeWinnerWeight` `:405-421`, `settleWithoutRaffle` `:424-427`, `assertNotSelfOutbid` `:442-446`, factory `startingBid > 0` and ≤ 15 boxes `factory.algo.ts:44-49`, `weightedBidTotal == 1` path `:801-804`. |
| AR-03 pool counts the winner's fee | Fixed | `rafflePool()` `:397-399`, used in `claimRafflePrize` `:964` and `settleWithoutRaffle`. |
| AR-04 no-bid lock / fee-auction cancel | Fixed | No-bid branch in `claimPrize` `:938-943`. Pre-start seller `clearWeightsBoxes` `:982-992`. `cancel` uses `returnPrizeToSeller`. |
| AR-05 undeletable auctions | Fixed | Conditional close-outs `:632-648`. `rafflePrizeClaimed` is required only when `bidFee > 0` (`:626`). |
| AR-06 ASA fee to the DAO app | Fixed | `sendToAkitaEscrow` (`utils/base-contracts/base.ts`) is used at `:285`, `:353`, `:969`. |
| AR-07 0/1-ticket raffle, bounds, cancel | Fixed | `failed` path `raffle/contract.algo.ts:796-807`. Bounds checked in child `:391`, `:397`, `:399` and in factory `:114-115`. `minEntries` / `setMinEntries` (AR-C). |
| AR-08 chunked cursor | Fixed | `getWinnerWeightBoxInfo` (Auction `:374-389`, Raffle `:203-218`), cursor stored from the iterated start (`:876-879` / `:874`). The model test passes. A >4096 e2e still does not exist. |
| AR-09 raffle factory over-refund | Fixed | The child closes everything to the factory (`raffle/contract.algo.ts:515-549`). Weights MBR goes straight to the funder (`:504-509`). The factory refund is measured (`factory.algo.ts:348-363`, `releasedRefund`). |
| AR-10 caller-chosen referrer | Fixed | Creation-time `seller_referrer` is paid by `sendReferralPaymentTo` (Auction `:282`, `:349`; Raffle `:899`; Listing `:157`, `:220`). |
| AR-11 prize == payment asset | Fixed | Auction factory `:118`. Raffle factory `:253` plus child `:399`. Listing factory `marketplace.algo.ts:283`. |
| AR-12 auction box MBR | Fixed | `auction/constants.ts`: 35,300 / 18,900 / 18,900. The v3 plugin reads the child `mbr()` (`arc58/plugins/auction/contract.algo.ts:278`). |
| AR-13 auction factory refund | **Fixed, with a regression** | Measured refund (`factory.algo.ts:454-486`). Zero-fee auctions still charge weights MBR that is never sent to the child, so the funder never gets it back (**TRADE-4**). |
| AR-14 plugin repairs | **Fixed, with a regression** | Costs, opt-ins, ticket-asset read, gated branches and factory routing are all fixed. Routing `deleteApplication` through the factory made the AuctionPlugin's conventional delete handler succeed (**TRADE-1**). |
| AR-15 raffle factory ticket opt-in | Fixed | `raffle/factory.algo.ts:119-120`. |
| MKT-01 purchaseAsa NoOp | Fixed | `Listing.arc56`: `purchaseAsa` call = `[DeleteApplication]`. `Marketplace.approval.teal:3767-3786` sets `pushint 5 / itxn_field OnCompletion`, and so do `purchase` and `delist`. Legacy (rev-absent) listings are refused on the ASA route (`marketplace.algo.ts:224`). Both live legacy listings are ALGO-priced. |
| MKT-02 no max price | Fixed (new plugin) | `maxPrice` (`arc58/plugins/marketplace/contract.algo.ts:253-254`) plus a 4-round price cooldown in the Listing (`listing.algo.ts:111-116`, `:485-490`). Residual: wallets on the deployed plugin 3569561455 still have no bound (rollout note). |
| MKT-03 refund of the recorded deposit | Fixed | `refundListingFunder` / `releasedRefund` (`marketplace.algo.ts:93-111`). The escrow opt-in is excluded from `funder.amount` (`:306`, `:423`). Legacy listings get the full deposit (bounded set of 2). |
| MKT-04 paid asset not checked | Fixed | Factory: `assertBuyerAsaPayment` `:185-191`. Listing: `:430-432`. |
| MKT-05 2× opt-in | Fixed | One opt-in MBR per `optin` (`:340-371`). |
| MKT-06 quantity / clawback | Fixed for Listing and PrizeBox | `prize_amount` equality (`listing.algo.ts:129`) and the PrizeBox clawback reject. **Not carried over to Auction/Raffle ASA prizes (TRADE-2).** The equality form opens a donation grief (**TRADE-6**). |
| MKT-07 price floor | Fixed | `ListingMinimumPrice` = 4 at list and in `changePrice`. |
| MKT-08 royalty bypass | Not fixed (by decision M-4, advisory) | `utils/functions.ts:544-575`. |
| MKT-09 plugin opt-in count | Fixed | The plugin uses `listCost` from the factory. |
| PB-01 duplicate opt-in | Fixed | `prize-box/contract.algo.ts` asserts `!isOptedIn`. |
| PB-02 funder accounting | Fixed | `funder` is recorded at mint. Deletion only through `PrizeBoxFactory.deletePrizeBox` with a measured refund. |
| I-1..I-4 (marketplace info) | Fixed | `seller_referrer`, seller close-out disbursement, `assertSafe*` bindings, and `prizeBoxTransferTxn.sender === Txn.sender` in `listPrizeBoxImpl` `:403`. The I-4 analog in the Auction and Raffle factories remains (Low, below). |
| K6 RaffleFactory creation shims removed | Verified safe | No on-chain caller of the deployed `newRaffle` / `newPrizeBoxRaffle` selectors in the tree. The deployed RafflePlugin creation path already fails (AR-14). MainNet has 0 raffles. The SDK must ship in lockstep (documented). |

## New findings

### TRADE-1 (High): anyone can delete the AuctionPlugin v3 app

**Location:**
- `arc58/plugins/auction/contract.algo.ts:498-504`.
- Compiled routing: `artifacts/arc58/plugins/auction/AuctionPlugin.approval.teal:50-63` (`txn OnCompletion; pushint 5; ==; assert`). `AuctionPlugin.arc56.json` lists `deleteApplication` with call actions `[DeleteApplication]`.
- `utils/functions.ts:384-402` (`getControlledSpendingAccount` does not check that `wallet` is genuine).

**What is wrong:**
1. PuyaTs conventional routing makes a method named `deleteApplication` the app's DeleteApplication handler (`algorand-typescript/arc4/index.d.ts:25-46`, `ConventionalRouting`). It is callable only with `OnCompletion = DeleteApplication`, and it carries no creator or DAO check.
2. In the deployed plugin the body called the child directly, which always failed (AR-14), so the delete could never succeed.
3. In v3 the body forwards to `AuctionFactory.deleteAuctionApp`, which succeeds for any seller of a finished auction. When the method returns 1, the AVM deletes the plugin app.

The ARC-58 rekey window (`arc58/account/contract.algo.ts:554`) rejects non-NoOp plugin calls. The attack does not need a wallet, though, because `getControlledSpendingAccount` reads `spending_address` from any app id.

**Scenario:**
1. Attacker EOA X calls `AuctionFactory.newAuction` with a self-minted ASA prize, `bidFee = 0`, `startTimestamp` in the past and `endTimestamp = start + 301` (ends almost at once), `weightsListCount = 0` and `wallet = 0`. This costs a refundable deposit.
2. After the end, anyone calls `claimPrize`. With no bids, the prize returns to X.
3. The attacker deploys a trivial app F with global `spending_address` = X, then rekeys X to the AuctionPlugin app address.
4. The attacker sends an app call to the AuctionPlugin with selector `deleteApplication(uint64,bool,uint64)void`, args `(F, true, auctionId)` and `OnCompletion = DeleteApplication`. The call runs as follows:
   - `getControlledSpendingAccount(F)` returns X, and X's auth is the plugin.
   - The factory checks seller == X, deletes the child and refunds X. The inner call rekeys X to `F.address`.
   - The approval returns 1, and the **AuctionPlugin app is deleted**.

**Impact:**
- The shared AuctionPlugin is permanently destroyed for every wallet and for the DAO grant. Wallet users cannot bid, claim, cancel or delete as their spending account until the DAO deploys a new plugin and every wallet reinstalls it.
- The attack costs a few transaction fees and is repeatable against each redeploy.
- No funds are taken. Auctions can still be settled directly by EOAs.

**Fix:**
- Override the conventional routing: `@abimethod({ name: 'deleteApplication', allowActions: 'NoOp' })` on a renamed TS method. This keeps selector `0xbedfc93b` for method restrictions.
- Add a regression test: calling the plugin with `OnCompletion = DeleteApplication` must fail.
- Defence in depth: have `getControlledSpendingAccount` (or the plugins) require `isAkitaWallet(wallet)`.
- Audit every other contract for methods named `deleteApplication` / `updateApplication` / `closeOutOfApplication` / `optInToApplication`. In this slice only the AuctionPlugin has one.

### TRADE-2 (High): Auction and Raffle ASA prizes are not protected against clawback or freeze

The seller can take back the prize after bids or entries arrive and still be paid.

**Location:**
- `auction/factory.algo.ts:115-120`: the prize transfer is checked only for sender, receiver, amount > 0 and != bid asset. There is no clawback or freeze check and no stored amount.
- `auction/contract.algo.ts:241-270`: `transferPurchaseToBuyer` closes out whatever balance remains.
- `raffle/factory.algo.ts:249-253`, `raffle/contract.algo.ts:285-314` (`transferPrize`).
- Contrast: Listing stores and checks `prize_amount` (`listing.algo.ts:129`), and PrizeBox rejects clawback assets.

**Scenario (Raffle):**
1. Seller S is the creator of an ASA collection with `clawback = S`. Clawback is common on royalty-enforced or game NFTs.
2. S calls `RaffleFactory.newRaffle` with the NFT as the prize. Entrants buy tickets.
3. After the end and before `claimRafflePrize`, S sends a clawback axfer from the raffle app address back to S.
4. `claimRafflePrize` (`:877-922`) "transfers" a zero balance to the winner (`assetCloseTo` moves 0 units). It then pays S the full ticket proceeds through `getAmounts(ticketCount)`.

**Scenario (Auction):** the same steps. The highest bidder pays the full bid (`claimPrize` `:932-957`) and receives nothing.

**Freeze variant:** if S holds the freeze address and freezes the child's holding:
- `claimPrize` / `claimRafflePrize` revert forever.
- `refundMBR` (requires `prizeClaimed`), `clearWeightsBoxes` and deletion stay blocked.
- Everyone's box MBR and the ≥39–197 ALGO weights deposit are locked, and the winning bid or ticket proceeds are held hostage.

**Fix:**
- Reject prize ASAs with `clawback != zero` (and preferably `freeze != zero`) in both factories. This matches the PrizeBox decision M-3.
- Alternatively, store `prizeAmount` at creation and, when the balance changed, switch to a refund path: bids or tickets back, prize remainder to the seller.

### TRADE-3 (Medium): the VRF reveal can stall forever because its timing does not match the MainNet beacon

**Location:**
- `auction/contract.algo.ts:806`, `:810`, `:817-821`.
- `raffle/contract.algo.ts:809`, `:813`, `:820-824`.
- `auction/constants.ts:84-85`, `raffle/constants.ts:53-54`.
- SDK `akita-sdk/src/auction/index.ts:266-271` and `raffle/index.ts:492-497` (`drawReadyRound = raffleRound + 8`).

**How the beacon behaves (beacon 1615566206, disassembled):**
- `get(uint64,byte[])byte[]` (`0x189392c5`) answers round `r` from the VRF output stored for `ceil8(r)` (`label13: (r+7)/8*8`).
- It returns empty bytes unless `first ≤ ceil8(r) ≤ last` (`label30`).
- The window is about 1,512 rounds.
- Indexer: the last 40 `submit` calls (`0xa49d4a78`) all landed exactly **2 rounds after** the round they cover.
- So `get(r)` becomes non-empty only at round `ceil8(r) + 2`.

**The contract's timing:**
1. The commit sets `raffleRound = c + 8`, where `c` is the commit round.
2. The reveal is allowed at `raffleRound + 8`.
3. If `raffleRound ≡ 1 (mod 8)`, then `ceil8(raffleRound) + 2 = raffleRound + 9`. A reveal in round `raffleRound + 8` always reads empty.
4. On an empty read the contract re-commits to `Global.round + 8 = raffleRound + 16`, which is ≡ 1 again, so the cycle repeats.
5. For `raffleRound ≡ 2`, the value arrives in the same block as the first allowed reveal (an ordering race).

**Stall scenario:**
1. A griefer (for example a losing bidder or a rival entrant) is the first post-end caller of `raffle()` in a round `c ≡ 1 (mod 8)`. Anyone can call it.
2. After that, they send one reveal per cycle with `firstValid = lastValid = raffleRound + 8`. Each reveal reads empty and re-commits with the same residue.
3. Honest callers who wait for the SDK's `drawReadyRound()` and fire at once hit the same empty read and keep the loop going.
4. Cost to the griefer: about 1 transaction per 16 rounds.

While the loop runs:
- Raffle: `claimRafflePrize`, `refundMBR`, `clearWeightsBoxes` and deletion are blocked, so the prize, the ticket proceeds, entrant MBR and ≥52 ALGO of weights MBR are locked.
- Auction: `refundMBR`, `clearWeightsBoxes` and deletion are blocked.

It ends when the griefer stops and someone reveals at `raffleRound + 9` or later.

**Bias variant (suspicion):** the proposer of the reveal-allowed block can see the pending beacon `submit` (VRF proof → output) and order a reveal ahead of it, vetoing an unfavourable draw. The residue-1 cycle makes that veto repeatable.

**Fix:**
1. Commit to a multiple of 8: `raffleRound = ceil8(Global.round + DRAW_DELAY)`.
2. Allow the reveal at `raffleRound + BEACON_LAG` with a lag of at least 4 that covers the observed submission delay.
3. **On an empty read, do not re-commit** while `Global.round < raffleRound + MAX_WAIT`, for example 1,000 rounds, which is inside the 1,512-round window. Return or revert without changing state instead.
4. Re-commit only after `MAX_WAIT`.
5. Update the SDK's `drawReadyRound()` to match.
6. Add a mock beacon mode that mirrors the ceil8 mapping and the 2-round lag.

### TRADE-4 (Medium): zero-fee auctions charge weights MBR that is never refunded

**Location:**
- `auction/factory.algo.ts:44-49`: `validateRaffleConfig` checks `weightsListCount` only when `bidFee > 0`.
- `:103-109` and `:361-367`: `weightsListCount × 13,113,300` is charged unconditionally.
- `:202-215` and `:437-449`: `init` (the only place the weights MBR is sent to the child) runs only when `bidFee > 0`.
- `:454-486`: the refund is measured.
- `newAuctionCost` `:488-522` quotes it too.

**Scenario:**
1. A seller, or a UI that always passes `weightsListCount = 3`, creates an auction with `bidFee = 0`.
2. The seller pays 39.34 ALGO extra. It stays in the AuctionFactory's free balance.
3. On `deleteAuctionApp` / `cancelAuction` the funder receives only the child close-out plus the released app MBR.
4. The 39.34 ALGO (13.11 ALGO per box) is never returned.

At HEAD the full `totalMBR` refund hid this. The measured refund (AR-13) exposes it. The SDK (`akita-sdk/src/auction/factory.ts:34-59`) and the v3 plugin forward the caller's value unchanged.

**Fix:**
- `loggedAssert(bidFee > 0 || weightsListCount === 0)` in `validateRaffleConfig`, or charge weights only when `bidFee > 0` (in `newAuctionCost` too).
- Add an e2e test: a zero-fee auction with `weightsListCount > 0` reverts, or its funder receives the exact refund.

### TRADE-5 (Medium): one opted-out ASA receiver blocks sequential refunds and settlement for everyone

**Location:**
- Auction:
  - `refundBid` → `sendBidAsset` `:774` (no fallback);
  - `refundMBR` runs strictly in cursor order (`:892-929`);
  - `deleteApplication` requires every refund (`:622-628`);
  - `claimRafflePrize` → `sendBidAsset(raffleWinner)` `:975`, and `clearWeightsBoxes` needs `rafflePrizeClaimed` (`:991`).
- Raffle (failed raffle): `refundMBR` → `sendTickets(account, …)` `:475` (no fallback). `clearWeightsBoxes` and `deleteApplication` require the cursor to be complete (`:493`, `:519`).

**Scenario (Raffle, ASA tickets):**
1. The griefer enters early with `minTickets`, then closes out their ticket-ASA holding.
2. The raffle fails (`minEntries` not reached, a common outcome).
3. `refundMBR` reverts at the griefer's index forever.
4. Every later entrant's tickets (principal, not just MBR), all entry MBR, the seller's ≥52.45 ALGO weights MBR and the deposit stay locked until the griefer opts back in, which is a ransom position.

**Scenario (Auction, ASA bids):** the griefer bids once and opts out of the bid ASA. After being outbid, their refund fails:
- `refundMBR` stops at their index, which blocks later bidders' box MBR and the seller's deletion refund.
- If the griefer is drawn as loser-raffle winner, the weights MBR (≥39 ALGO) is also locked.

ALGO variants (small payments to closed accounts) can be unblocked by anyone funding the account, so they are Low.

**Fix:**
- Use the existing `sendBidAssetOrDisburse` / `sendTicketsOrDisburse` fallback in these paths. Fund the disbursement MBR from the box MBR being released, or switch to a pull-based refund record.
- Alternatively, let `refundMBR` skip a receiver that is not opted in and record a claimable credit.

### TRADE-6 (Medium): a 1-unit donation makes an ASA listing unsellable

**Location:** `marketplace/listing.algo.ts:129` (`balance === prizeAmount`).

**Scenario:**
1. A listing sells 1,000 units of a fungible token, or one edition of a multi-supply NFT.
2. Anyone holding 1 unit sends it to the listing address. The listing is opted in, so this needs no permission.
3. Every `purchase` / `purchaseAsa` then reverts with `errPchg`.
4. The seller can only delist and relist, paying fees, and the griefer can repeat at the cost of 1 unit plus a fee.

Live legacy listings are not affected, because they have no check.

**Fix:** `>=`. A clawback that reduces the balance is still detected, and a donation simply goes to the buyer through the close-out.

### Low / Info

- **L-1. Prize-box transfer sender not bound in the Auction and Raffle factories (I-4 analog).** `auction/factory.algo.ts:333-337` and `raffle/factory.algo.ts:317-321` do not assert `prizeBoxTransferTxn.sender === Txn.sender`. Any prize box left owned by a factory can be auctioned or raffled by anyone, who becomes its seller. Mirror `marketplace.algo.ts:403`.
- **L-2. The Auction factory does not use `assertSafeAssetTransfer` on the prize transfer** (`:116`): no rejection of `assetCloseTo`, clawback-sourced transfers or rekeys. Any excess lands in the factory, which is the seller's own loss. Raffle and Marketplace do use it.
- **L-3. Settlement and refund payments in ALGO to an empty or closed account below 0.1 ALGO revert.** This covers the creator, a marketplace or the seller in Listing `completeAlgoPayments` `:150-211` and Auction `completeAlgoPayments`. Anyone can unblock it by funding the account, so it is a liveness issue only.
- **L-4. A beacon value that ages out (about 1,512 rounds) can be re-rolled.** If nobody reveals within about 70 minutes of the value appearing, a disfavoured party can re-roll it. TRADE-3's `MAX_WAIT` keeps this in place but narrows it.
- **L-5. K8 float DoS.** Legacy-paid ALGO listings lock 164,000 µA of factory free balance each, recovered at sale or delist. About 8 listings exhaust the margin above the 500,000 µA reserve (`marketplace.algo.ts:168-182`). After that, deployed-plugin users cannot list until someone tops up the factory. The deposits are refundable, so the attack cost is near zero. This is accepted risk (K8); monitor it.
- **L-6. Escrow change after factory opt-in.** If the DAO repoints `akitaDAOEscrow` after the factory opted into an ASA, `sendToAkitaEscrow` in a child pays `(1 + splits) × 0.1` ALGO of unbudgeted opt-in MBR. The claim reverts until someone donates ALGO.
- **L-7. PrizeBox accepts freeze-enabled assets.** A seller holding the freeze address can freeze the contents after the sale (`prize-box/contract.algo.ts` `optin` checks clawback only).
- **L-8. Listing `getAmounts` has no tiny-amount fallback** (`listing.algo.ts:80-108`), unlike Auction and Raffle. With a high creator royalty and a price near 4, every purchase underflows. This only affects the seller's own listing, which they can reprice.
- **I-1. PrizeBoxFactory 3569557972 has 0 balance.** `mint` sends `Global.minBalance` from the payment to the box. The factory's own 0.1 ALGO base plus the new app MBR is then uncovered, so the first mint reverts until the factory is funded with ≥ 0.1 ALGO.
- **I-2. The deployed AuctionPlugin 3569561141 quotes bid MBR from stale constants** (IMPLEMENTATION-LOG deviation 5). On new children, its ASA bids always fail (`payment.amount === mbr`), and ALGO bids land 400–800 µA lower than requested.

## Upgrade / rollout notes

1. **Live children:**
   - MainNet has no Auction or Raffle children. Every "old child vs new factory" interaction is moot on MainNet, as are the AR-G vs Q8 conflict and the D5 / AR-D legacy weights reconciliation. TestNet children were not inventoried.
   - Marketplace's 2 legacy ALGO listings keep the full-deposit refund. They use `purchase(pay,address,address)void` / `delist(address)void`, whose selectors and semantics are unchanged. The ASA route refuses them.
2. **`bc` box growth is paid from factory free balance:**

   | Factory | Growth | Cost (µA) | Free after (µA) |
   |---|---|---|---|
   | AuctionFactory | 7,300 → 8,153 B | 341,200 | 15,600 |
   | RaffleFactory | 6,589 → 7,945 B | 542,400 | 98,800 |
   | Marketplace | 3,011 → 3,137 B | 50,400 | ~1,855,000 (K8 needs ≥ 500,000 plus floats) |

   Fund the Auction factory before the proposal if anything else will touch it.
3. **Do not deploy AuctionPlugin v3 until TRADE-1 is fixed.** Every v3 plugin is immutable, so a fix after deployment means a new app id plus a reinstall for every wallet.
4. **Old MarketplacePlugin users.** Wallets still on 3569561455 have no `maxPrice`. The 4-round cooldown protects only rev-3 listings, and only against races of 4 rounds or less. The 2 legacy listings have no cooldown.
5. **K6.** The RaffleFactory upgrade must ship together with the new SDK. The HEAD SDK cannot create raffles on the upgraded factory, and the new SDK cannot create them on the deployed one.
6. **PrizeBoxFactory.** Fund it (I-1) before Marketplace, Auction or Raffle users try to mint.
7. **Sizes.**
   - Auction child: 8,153 B (39 B under the 4-page limit, so any further fix such as TRADE-3 or TRADE-5 may push it to 5 pages, +100,000 µA per auction).
   - Raffle child: 7,945 B. Listing: 3,137 B.
   - Factory schemas are unchanged (8 / 56).

## Test gaps (named; not written)

- `arc58/plugins/auction/auction.e2e.spec.ts`: "plugin cannot be deleted". An app call with `OnCompletion = DeleteApplication` to `deleteApplication(uint64,bool,uint64)` must revert, including through a fake-wallet spending account.
- `auction/auction.e2e.spec.ts` and `raffle/raffle.e2e.spec.ts`: "clawback prize rug". A creator with clawback pulls the prize after bids or entries; the claim must refuse or refund. Add a freeze variant.
- Mock beacon mode with ceil8 mapping and a 2-round submit lag. Commit at `c ≡ 1 (mod 8)`, then a reveal at `raffleRound + 8` must not change `raffleRound`.
- `auction/auction.e2e.spec.ts`: a zero-fee auction with `weightsListCount = 3` must be rejected, or the funder's refund must be exact.
- `raffle/raffle.e2e.spec.ts`: a failed ASA-ticket raffle where one entrant opted out of the ticket ASA, then refunds and deletion.
- `auction/auction.e2e.spec.ts`: an ASA-bid auction with an opted-out loser, then `refundMBR` and deletion.
- `marketplace/marketplace.e2e.spec.ts`: a 1-unit donation to a fungible listing, then purchase.
- Raffle with more than 4,096 entrants (slow e2e). Only the TS model covers the multi-box cursor today.
- `prize-box/prize-box.e2e.spec.ts`: minting from an unfunded factory (the MainNet state).

## Checked and OK

- **Bid and refund accounting:**
  - Outbid refunds are `amount - fee`, and the winning bid is never refundable (`id < bidID-1`).
  - The `refunded` flag is set before payout.
  - Self-outbid is rejected only for fee auctions.
  - Weight updates use non-negative differences, because bids strictly increase.
  - The pool equals the sum of losing fees on every claim and refund ordering.
- **Raffle-pool exclusion of the winner:** the winner's weight is zeroed together with `weightTotals` and `weightedBidTotal`. The ticket range `[1, total]` maps exactly onto the losers' ranges. `startingBid > 0` means every loser has weight.
- **Winner search bounds:** box skipping happens only on a boundary, and the cursor is stored from the iterated start (model test green). Raffle has no reset path, and none is reachable for new children.
- **PCG:** rejection sampling is unbiased (`threshold = 2^64 mod bound`). Bounds are asserted. The seed is 16 of the beacon's 32 bytes.
- **Prize claim and escrow receivers:**
  - The prize goes to the recorded winner or buyer, through a close-out or a Rewards close-out disbursement.
  - Fees go to the configured escrow (`sendToAkitaEscrow`).
  - Referral goes to `seller_referrer`.
  - Zero-amount payouts are skipped (Raffle) or harmless (Rewards skips zero allocations).
- **Factory refunds:**
  - `releasedRefund` = received + released min balance, capped at the recorded deposit.
  - Weights MBR is paid straight to the funder by the child, so there is no double pay.
  - The creation fee and escrow opt-in are excluded by construction.
  - The legacy-float arithmetic `min(released, recorded + float) - float` is correct.
- **Grouped transactions:** every bid, entry and purchase payment uses `assertSafePayment` / `assertSafeAssetTransfer` bound to `Txn.sender` (no close, no rekey, no clawback). Receivers, assets and amounts are checked. ABI positions prevent reusing one transaction across calls.
- **Auth:**
  - Child `create` requires an app caller.
  - `init`, `optin`, `deleteApplication` and `cancel` are creator-only.
  - Listing `purchase*` / `delist` are factory-only; `changePrice` is seller-only.
  - Auction delete and cancel are seller-gated in the factory. Raffle delete is permissionless, but the refund goes to the recorded funder.
  - Plugins pin `creator == factory`.
  - Child `update` is DAO-wallet plus the update plugin.
- **MKT-01 TEAL:** the `purchase`, `purchaseAsa` and `delist` inner calls set `OnCompletion 5`.
- **Gates:** hinted paths use `gateCheckCtx` pinned to the verified context. Legacy shims keep registry semantics for old callers. Ungated entry points refuse gated children.
- **State and time:** bids and entries are live only in `[start, end]`. The draw and claims require `> end`. Snipe extension happens only on a live bid. Timestamps are monotonic.
- **K6:** no on-chain caller and no live raffle. The removal is recorded in the accepted-removals list.
- **Inner fees:** 0 everywhere (pooled), so the factories cannot be drained through fees.
- **Raffle and Auction box MBR constants** match the box sizes.
