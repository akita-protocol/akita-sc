# Akita security review: Marketplace / Listing, PrizeBox, Plugin DEX, Marketplace ARC-58 plugin

Reviewer scope (current working tree, not HEAD), all paths relative to `projects/akita-sc/smart_contracts/`:

- `marketplace/marketplace.algo.ts` (factory), `marketplace/listing.algo.ts` (child), constants/errors/types
- `prize-box/contract.algo.ts`, `prize-box/factory.algo.ts`
- `plugin-dex/contract.algo.ts`, `types.ts`, `constants.ts`, `hook-interface.ts`
- `arc58/plugins/marketplace/contract.algo.ts`
- `utils/base-contracts/factory.ts`, `child.ts`, `base.ts`, `optin.ts`, `upgradeable.ts`
- Read-across: `utils/functions.ts` (gateCheck, royalties, getFunder, getPrizeBoxOwner, sendReferralPayment, createInstantDisbursement, splitOptInCount), `rewards/contract.algo.ts` (instant disbursements), compiled artifacts in `artifacts/marketplace/`.

Important context: `CONTRACT_AUDIT.md` lists Marketplace and PrizeBox fixes as remediated: purchaseAsa set to `DeleteApplication`, exact one-opt-in child funding, actor-bound and clawback-rejecting grouped funding, a minimum for safe price updates, PrizeBox funder records, and rejection of duplicate opt-ins. **None of these remediations is present in the current working tree.** The only uncommitted changes to these files rename error constants. The compiled artifacts (`artifacts/marketplace/*.arc56.json`, `*.teal`, dated Sep 22) match the vulnerable source. Several findings below are those regressions.

---

## Findings

### MKT-01: `Listing.purchaseAsa` still compiles as NoOp. Each ASA sale leaves a zombie listing and drains the factory's pooled ALGO
- **Severity:** High. **Confidence:** Confirmed (verified in source and compiled artifacts)
- **Location:** `marketplace/listing.algo.ts:376-399` (`// @ts-ignore` + `@abimethod({ OnCompleteAction: 'DeleteApplication' })`). Callers are `marketplace/marketplace.algo.ts:368-403` (`gatedPurchaseAsa`) and `:405-436` (`purchaseAsa`), which call `listing.call.purchaseAsa` with no `onCompletion`.
- **Evidence:** `artifacts/marketplace/Listing.arc56.json` shows `purchaseAsa` actions `{call: ['NoOp']}`, while `purchase` and `delist` are `['DeleteApplication']`. In `Marketplace.approval.teal`, the `gatedPurchaseAsa` and `purchaseAsa` inner calls set `OnCompletion 0`, while `purchase` and `gatedPurchase` set `pushint 5`.
- **Description:** This regresses the Critical item in CONTRACT_AUDIT.md. During ASA settlement the Listing closes its ALGO to the factory (`closeRemainderTo: creator`), but the app is not deleted. The factory then refunds the full `funder.amount` (= `totalMBR`, which includes the app-creation MBR: 2 pages + 9 uints + 6 bytes = 756,500 µALGO). That creation MBR stays locked in the factory's minimum balance because the app still exists. Each ASA-payment sale therefore moves about 0.7565 ALGO (plus any `escrowOptInCost`, see MKT-03) from the factory's free balance into permanently locked MBR. The zombie cannot be cleaned up afterwards. `delist` fails because the listing is no longer opted in and no longer owns the prize box, and a second `purchaseAsa` fails because the listing is not opted into the payment asset. When the factory's free balance falls below one app MBR, every ASA-payment purchase reverts on the refund payment.
- **Exploit:** The attacker mints one PrizeBox. They call `listPrizeBox` with `paymentAsset` set to a self-created junk ASA and price 4, then buy the listing with `purchaseAsa` paying 4 junk units. The deposit is refunded in full and the prize box returns to the attacker for the next cycle. Each loop costs about 0.02–0.03 ALGO in pooled fees and locks about 0.76 ALGO of factory funds. Repeating it exhausts the factory, after which honest ASA-payment buyers cannot purchase. Every honest ASA sale also leaks the same amount.
- **Fix:** Use `@abimethod({ allowActions: 'DeleteApplication' })` on `purchaseAsa`. Pass `onCompletion: OnCompleteAction.DeleteApplication` explicitly from both factory routes. Add an e2e test that asserts the child is deleted and the factory balance is exact. Add an inventory and cleanup path for zombie listings that already exist.

### MKT-02: The Marketplace plugin pays whatever the listing price is at execution time, with no buyer-side max price. A seller can front-run a buyer
- **Severity:** High. **Confidence:** Likely (the code path is confirmed; exploitation needs ordering ahead of the victim transaction)
- **Location:** `arc58/plugins/marketplace/contract.algo.ts:243-352`. The price is read from listing state at `:254` and paid as `amount: price` / `assetAmount: price` at `:279, :295, :325, :341`. `marketplace/listing.algo.ts:445-448` lets `changePrice` set any value at any time.
- **Description:** The direct (non-plugin) path is safe because the buyer signs a payment for an exact amount and `Listing.purchase` requires `amount === price`. The plugin path instead derives the amount on-chain from `price` at execution. The buyer's wallet call (`purchase(wallet, rekeyBack, appId, marketplace, args)`) carries no expected price.
- **Exploit:** A buyer, an agent, or an execution-key batch submits a wallet `usePlugin(marketplace.purchase, listingX)` after seeing a price of 10 ALGO. The seller watches pending transactions and lands `changePrice(10_000 ALGO)` first, in the same or an earlier round. The plugin pays 10,000 ALGO from the wallet's spending account, limited only by the wallet balance or the caller's allowance.
- **Fix:** Add a `maxPrice` (or `expectedPrice`) argument to the plugin's `purchase` and assert `price <= maxPrice`. Optionally add a `lastPriceChange` round to the Listing and make purchases in the same round revert.

### MKT-03: The factory refunds the recorded deposit, not the MBR actually released. Escrow opt-in and disbursement MBR consumed in the group are paid from the factory's pooled balance
- **Severity:** Medium. **Confidence:** Confirmed
- **Location:**
  - `marketplace/marketplace.algo.ts:76-80, 217-221`: `escrowOptInCost` is folded into `totalMBR` (`:80-86, :221-227`), which is stored as `funder.amount` (`:112, :245`).
  - `:170-172, :287-290`: the factory pays that amount to the DAO escrow via `optAkitaEscrowInAndSend` (`utils/base-contracts/base.ts:82-138`). It never comes back.
  - `:311/345/384/417/442 + :326-331/360-365/400-402/433-435/450-452`: every purchase and delist refunds the full `funder.amount`.
  - `marketplace/listing.algo.ts:109-118, 216-287`: `createInstantDisbursement` spends Listing ALGO (41,700 + 25,300 µALGO, plus 100,000 for a Rewards ASA opt-in) that is then missing from the `closeRemainderTo` back to the factory.
- **Description:** The factory receives `listing close balance + released app MBR`. It pays out `totalMBR`. The difference comes from the factory's free balance whenever (a) the factory opted the DAO escrow and its split accounts into a new payment asset, or (b) the Listing used disbursement MBR. Case (b) happens when the buyer is not opted into the prize ASA, or, on ASA purchases, when the creator or the listing-side or buyer-side marketplace account is not opted into the payment asset. The buyer controls the buyer-side marketplace and can pick any account that is not opted in. This is the same class as the Critical "Child factories" item in CONTRACT_AUDIT.md.
- **Exploit:**
  - (a) `listPrizeBox` with a freshly created ASA as `paymentAsset`, then `delist`. The attacker gets the full deposit back, and the factory loses 0.1 × (1 + number of splits) ALGO per cycle. The ASA can be destroyed afterwards.
  - (b) List a cheap ASA for 4 µALGO and buy it from a second account that is not opted into the ASA. The factory loses at least 0.067 ALGO, or 0.167 ALGO with a fresh ASA, per loop, against about 0.02 ALGO in fees.
  - Once the factory is drained, honest delists and purchases whose refund exceeds the released balance revert. Their prize or prize box stays locked in the listing until someone tops up the factory.
- **Fix:** Store separate refundable and non-refundable components. Do not include `escrowOptInCost` in `funder.amount`. Either charge disbursement/opt-in MBR as non-refundable or, better, refund `balance released by the child + app MBR released` as measured by a before/after balance delta of the factory. Never refund the stored total blindly.

### MKT-04: `purchaseAsa` never checks the asset that was paid (`xferAsset`). Latent: once ASA-payment `list` works, a buyer can pay with the prize asset itself
- **Severity:** High (latent; not reachable in the current tree). **Confidence:** Confirmed code defect
- **Location:** `marketplace/listing.algo.ts:391-392` checks only `assetReceiver` and `assetAmount`. `marketplace/marketplace.algo.ts:380-381, 413-414` check only receiver and amount > 0 and forward `assetXfer.xferAsset` unchanged (`:393, :426`).
- **Description:** The amount is checked against `price`, but the asset is never compared to `this.paymentAsset`. The listing can only receive assets it is opted into. For a regular ASA listing with an ASA payment, that set includes the prize asset. `transferPurchaseToBuyer` then closes the entire prize balance to the buyer with `assetCloseTo`, so the "payment" units come straight back.
- **Exploit:** This needs MKT-05 fixed first. A listing offers 100,000,000 base units of MEME for 50 USDC (price = 50,000,000). The attacker sends a tiny amount of USDC to the listing to cover the fee transfers, then calls `purchaseAsa` paying 50,000,000 base units of MEME. They receive 150,000,000 MEME. The seller's `assetCloseTo` returns 0 USDC. The prize is stolen for the cost of the fees.
- **Current reachability:** ASA-payment `list` always reverts (MKT-05), and prize-box listings are opted only into the payment asset, so the defect is masked today.
- **Fix:** Add `loggedAssert(assetXfer.xferAsset === this.paymentAsset.value)` in the Listing, and mirror it in the factory. Also assert `assetXfer.sender === Txn.sender` (factory) and `assetSender === Global.zeroAddress` / no `assetCloseTo` on the user transaction.

### MKT-05: `Marketplace.list` always reverts when the payment is an ASA, because it sends 2× opt-in MBR and the Listing requires exactly 1×
- **Severity:** Low (availability and functional; no funds at risk). **Confidence:** Confirmed
- **Location:** `marketplace/marketplace.algo.ts:57-59` (`optinMBR = 2 × assetOptInMinBalance`), `:158-167` (payment-asset opt-in sends `amount: optinMBR`), `utils/base-contracts/optin.ts:51` (`payment.amount === Global.assetOptInMinBalance`). The plugin mirrors this at `arc58/plugins/marketplace/contract.algo.ts:99`.
- **Description:** This regresses the audit's "exact one-opt-in" fix. Regular ASA listings priced in an ASA cannot be created. There is no e2e test for this path. The defect currently hides MKT-04, so both must be fixed together.
- **Fix:** Send `Global.assetOptInMinBalance` for each `optin` call and charge 2× in total. Add an e2e test for ASA-priced `list`, purchase and delist.

### MKT-06: The Listing never records or verifies the listed quantity. A seller who holds the clawback for the prize ASA (or an ASA inside a prize box) can empty the listing and still collect the price
- **Severity:** Medium. **Confidence:** Confirmed
- **Location:** `marketplace/marketplace.algo.ts:148-154` transfers `assetXfer.assetAmount`, which is never stored. `marketplace/listing.algo.ts:101-118` closes whatever balance remains to the buyer. `prize-box/contract.algo.ts` has no content lock. `marketplace/marketplace.algo.ts:93-95` does not reject `assetSender` (clawback) or `assetCloseTo`.
- **Exploit:** A collection creator keeps clawback on an NFT and lists it. Once a buyer's purchase is pending (or simply before any buyer looks closely), the creator claws the NFT back from the listing address. The purchase still succeeds: `assetCloseTo` moves 0 units, and the buyer's full price is split and paid to the seller. For fungible listings a partial clawback sells fewer units than were advertised. Freezing the listing's holding blocks purchases. That is only DoS, but the same root cause applies.
- **Fix:** Store `prizeAmount` at creation. In `transferPurchaseToBuyer`, assert `balance(prize) === prizeAmount`. Optionally reject prize ASAs that have a non-zero clawback, or flag them in listing state. For prize boxes, store a content hash or count and verify it before transfer.

### MKT-07: Listing `changePrice` has no bounds (regression of the audit's "safe update minimum")
- **Severity:** Low. **Confidence:** Confirmed
- **Location:** `marketplace/listing.algo.ts:445-448`. The underflow site is `:82`.
- **Description:** The seller can set the price to 1–3. `getAmounts` then computes at least 1 + 1 + 2 = 4 in fees, so `seller = amount - 4` underflows and every purchase reverts. This only hurts the seller's own listing, and `delist` still works. The lack of an upper bound or change timestamp is what enables MKT-02.
- **Fix:** Require `price >= 4` (or `price == 0` as an explicit giveaway) and record the last change round.

### MKT-08: A seller can avoid the creator royalty by omitting the proof
- **Severity:** Low. **Confidence:** Confirmed
- **Location:** `utils/functions.ts:433-439` (an empty proof returns `CreatorRoyaltyDefault` = 5%). The seller supplies `name` and `proof` at `marketplace/marketplace.algo.ts:97`.
- **Description:** A creator who declared a royalty of up to 50% in MetaMerkles cannot enforce it. The seller passes an empty proof and pays 5%. The seller also chooses which of the creator's roots to prove against. When the declared royalty is below 5%, the seller supplies the proof, so the seller always pays `min(5%, declared)`.
- **Fix:** Look up the creator's canonical royalty root on-chain (a fixed name such as `royalty`) rather than trusting a seller-supplied name and proof. If no proof is supplied but the root exists, fail closed.

### MKT-09: The plugin computes the escrow opt-in count against the factory address instead of the DAO escrow
- **Severity:** Low (DoS). **Confidence:** Confirmed
- **Location:** `arc58/plugins/marketplace/contract.algo.ts:110-112, 207-209` (`splitOptInCount(..., this.factory.value.address, ...)`), compared with `marketplace/marketplace.algo.ts:76-78, 217-219` (`this.akitaDAOEscrow.value.app.address`).
- **Description:** If the factory is already opted into the payment asset but the escrow is not (for example after `updateAkitaDAOEscrow` changes the escrow), the plugin's payment and the factory's exact `totalMBR` check disagree. Every plugin listing in that asset then reverts.
- **Fix:** Call the factory's cost quote instead of re-deriving it in the plugin.

### PB-01: Repeating a PrizeBox `optin` inflates `optinCount`, so the box can never be deleted (regression)
- **Severity:** Low. **Confidence:** Confirmed
- **Location:** `prize-box/contract.algo.ts:51-65` (no `isOptedIn` check; opting in again is a 0-amount transfer to self that succeeds), `:35-42` (`optinCount === 0` is required to delete).
- **Exploit:** A seller opts the box into the same ASA twice, then sells it through Marketplace, Auction or Raffle. The buyer can withdraw the assets but can never close the box. The base minimum balance (0.1 ALGO) and the stuck count are lost. The impact is small and limited to the box.
- **Fix:** `loggedAssert(!Global.currentApplicationAddress.isOptedIn(Asset(asset)))` before opting in.

### PB-02: PrizeBox funder accounting is missing (regression of the audit's High PrizeBox item)
- **Severity:** Low (misallocation; no attacker gain). **Confidence:** Confirmed
- **Location:** `prize-box/factory.algo.ts:40-67`, `prize-box/contract.algo.ts:35-42`.
- **Description:** The minter pays pages, state and the minimum balance. `deleteApplication` is called by the owner directly, not through the factory. It closes the remaining ALGO, including other parties' opt-in MBR, to the current owner. The app-creation MBR is released into the PrizeBoxFactory's free balance and never returns to the minter. `mint` accepts any `owner`, and `payment.sender` is not recorded.
- **Fix:** Implement what CONTRACT_AUDIT.md describes: record the mint funder and each opt-in funder, and route deletion through the factory so each component is refunded exactly.

### PD-01: The PluginDex auth-address checks are wrong, so any pool with hooks can never run them
- **Severity:** Low (availability; the contract is pre-production with no tests). **Confidence:** Confirmed
- **Location:** `plugin-dex/contract.algo.ts:124-138`.
- **Description:** `acct_params_get AcctAuthAddr` returns the zero address for an account that is not rekeyed. Rekeying back to self also resets it to zero. The ARC-58 account handles exactly this case in `arc58/account/contract.algo.ts:727-732`. Here, `authAddress === currentApplicationAddress` is never true, so `rekeyToPlugin` always fails and `adminRunHook` reverts for every pool that has hooks.
- **Fix:** Compare against `Global.zeroAddress` both before the rekey and after the rekey back.
- **Status (2026-10-03):** Moot in PluginDex v2. The Vault's own account is never rekeyed. Custody hooks get a per-pool escrow that is rekeyed to the Vault, and `escrow.authAddress === Global.currentApplicationAddress` is the correct check for it. See the PD-01 status note in fix-marketplace.md.

### PD-02: PluginDex hooks chosen by the pool creator get full control of the shared DEX account. There is no isolation between pools (latent)
- **Severity:** Medium (latent; masked by PD-01, and the DEX currently holds only box MBR plus overpayments). **Confidence:** Confirmed design defect
- **Location:** `plugin-dex/contract.algo.ts:203-237` (anyone can `createPool` with arbitrary `hookPlugins`), `:161-201` (the single DEX app account is rekeyed to each hook in turn), `:216` (`mbrPayment.amount >= requiredMbr`, so overpayment becomes free balance).
- **Description:** While a hook runs, the hook app can send any ALGO above the minimum balance and any ASA from the DEX account, and can set large inner fees. It only has to rekey back before it returns. All pools share one account, so a malicious pool's hook can take the liquidity or fees of every other pool once swap and liquidity methods call `executeHooks`, which the architecture document says they will. Today only the admin can trigger hooks.
- **Fix:**
  - Do not let hooks run with spending authority over the account that holds funds. Give each pool its own escrow (child app or ARC-58 escrow), or call hooks without a rekey and apply their outputs through DEX-validated logic.
  - Allowlist hook apps through a registry.
  - Require exact MBR (`===`) or refund the excess, and add a pool deletion path with an exact refund to `mbrPayor`.
- **Status (2026-10-03):** Resolved by the PluginDex v2 rewrite. Kyle chose per-pool escrows with flash-rekey custody hooks, which supersedes FIX-PLAN M-6 for PluginDex:
  - Each pool has its own escrow, and the Vault's own account is never rekeyed.
  - After every custody call, a guard requires the escrow to be rekeyed back and the change in reserves to be at least as good for LPs as a fee-paying trade.
  - Hooks need admin approval and are version-pinned.
  - `createPool` refunds overpayment. Pools are permanent (no deletion path), by design.

  See the PD-02 status note in fix-marketplace.md.

---

## Informational
- **I-1:** No referral is ever paid on Listing sales. `sendReferralPayment` resolves the referrer from `Txn.sender`, which inside the Listing is the factory, so it never finds one (`listing.algo.ts:129, 192`; `utils/functions.ts:617-618`). The referral MBR charged in `disbursementMBR` is never used.
- **I-2:** On ASA-priced purchases, the fallback for a seller who is not opted in can never complete. `createInstantDisbursement(..., closeOut=false)` leaves the Listing opted into the payment asset, so the final `closeRemainderTo` fails (`listing.algo.ts:271-288, 396-398`). The seller has to opt in.
- **I-3:** Grouped transactions are not bound to the actor (regression of the documented hardening). `purchase` and `gatedPurchase` do not bind `payment.sender`. `purchaseAsa` and `gatedPurchaseAsa` do not bind `assetXfer.sender` or reject `assetSender`/`assetCloseTo`. `list` does not reject `assetSender`, which means a seller holding a clawback can list a victim's tokens, although that seller could take them directly anyway. No standalone exploit was found, because every sender signs the group, but this should be restored alongside MKT-04.
- **I-4:** `listPrizeBox` (`marketplace.algo.ts:191-195`) does not bind `prizeBoxTransferTxn.sender` to `Txn.sender`. Any prize box owned by the Marketplace factory address, for example one transferred there by mistake, can be listed by anyone as its seller.
- **I-5:** `FactoryContract.initBoxedContract` (`utils/base-contracts/factory.ts:42-51`) lets the original deployer (`Global.creatorAddress`) load new child bytecode again whenever the DAO has deleted the box. Confirm this matches the deployer-sunset plan.
- **I-6:** The plugin's `list`, `changePrice` and `delist` move value without spending, so allowances do not limit them. A delegated caller with these selectors could reprice the wallet's listings to 0 and buy them from another account. Restrict these selectors for agents and execution keys.
- **I-7:** In PluginDex, disabling a hook makes the whole hook point revert (`errHookDisabled`) instead of skipping that hook. The admin cannot be rotated, and pool boxes are never deleted. **Status (2026-10-03), PluginDex v2:**
  - Hooks can no longer be disabled per pool. Stacks are frozen at creation and version-pinned. A broken hook is handled by `setPoolPaused` plus `emergencyRemoveLiquidity`, which runs no hooks.
  - The admin can be rotated with `setAdmin`.
  - Pool boxes are still never deleted, by design.

## Checked and OK
- **Child spoofing:** every factory purchase and delist checks `appId.creator === Global.currentApplicationAddress`, and the plugin checks `creator === factory`. A Listing created by some other app is never trusted. `getPrizeBoxOwner` requires the prize box's creator to be the canonical PrizeBoxFactory.
- **Listing entry points:** `purchase`, `purchaseAsa`, `delist` and `optin` are callable only by the factory (`Txn.sender === Global.creatorAddress`). `changePrice` is seller-only. `updateAkitaDAO` is DAO-wallet-only. The Listing has no update method. The only deletion routes are the factory's `purchase` and `delist`.
- **Price and payment checks:** exact price on both ALGO (`amount === price`, sender is the factory, receiver is the listing) and ASA amount. The buyer is bound to `Txn.sender`. `reservedFor` and expiry are enforced. Non-gated purchase requires `gateID === 0`. `gateCheck` validates the gate app ID, NoOp, argument count, `mustCheck` selector, caller (origin) and gate ID.
- **Seller interference:** a seller changing the price or delisting mid-purchase in the direct path makes the purchase revert, with no loss. The plugin path is MKT-02.
- **Fee split:** creator, akita, both marketplace shares and seller sum exactly to the price. Seller gets the remainder or `assetCloseTo`. There is no underflow at price ≥ 4 with current percentage caps (creator ≤ 50%; `calcPercent` asserts `p ≤ DIVISOR`). Nothing is stranded.
- **Prize boxes:** ownership moves atomically to the listing, so a box cannot be listed twice. `delist` returns ownership to the seller. Only the owner can withdraw.
- **Double refund:** not possible. The ALGO path deletes the child, and an ASA zombie can be neither repurchased nor delisted.
- **Inner fees:** inner transactions in the factory, Listing, PrizeBox and PluginDex use fee 0 (pooled), so the factory and listing cannot be drained through fees.
- **Factory bytecode boxes:** `loadBoxedContract` requires a successful `initBoxedContract` in the same group from the same sender, which is the creator or the DAO wallet. Only the DAO can delete the box and upgrade.
- **Marketplace plugin rekey:** every plugin method applies `rekeyTo` on its final call. A failure reverts the whole group, so no rekey is left dangling.
- **PluginDex state:** state-changing calls other than `createPool` are admin-only. Box keys include `poolId`, so IDs from different pools cannot collide. The MBR constants cover the real box sizes (pool 44,900 ≤ 70,000; count 12,500 ≤ 20,000; hook 19,300 ≤ 50,000). Pool IDs increase monotonically.
