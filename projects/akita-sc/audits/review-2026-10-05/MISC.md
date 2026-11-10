# MISC slice review: Meta, HyperSwap, Poll, and assorted ARC-58 plugins

Reviewer: MISC slice. Date: 2026-10-05. Tree: HEAD e7f174ee plus the uncommitted working tree.
Read-only. Nothing was built, edited, or sent. Read-only MainNet queries only (algod/indexer at nodely).
All paths are relative to `projects/akita-sc/smart_contracts/` unless noted otherwise.

Verdict: **ISSUES**. There is 1 High, 2 Medium, and several Low/Info findings. Every prior Critical and High in this slice (HS-01, HS-02) is fixed.

## Scope (files and line counts reviewed)

| File | Lines |
|---|---|
| meta/contract.algo.ts (new) | 551 |
| meta/constants.ts, errors.ts, functions.ts, types.ts | 80 / 64 / 85 / 22 |
| arc58/plugins/meta/contract.algo.ts (new), errors.ts | 329 / 3 |
| hyper-swap/contract.algo.ts, base.ts, constants.ts, errors.ts, types.ts | 660 / 19 / 38 / 49 / 38 |
| arc58/plugins/hyper-swap/contract.algo.ts | 218 |
| poll/contract.algo.ts, factory.algo.ts, constants.ts, types.ts, errors.ts | 278 / 106 / 20 / 7 / 42 |
| arc58/plugins/poll/contract.algo.ts, errors.ts | 132 / 23 |
| arc58/plugins/welcome/contract.algo.ts (new) | 132 |
| arc58/plugins/asset-inbox/contract.algo.ts (new), constants.ts; utils/types/asset-inbox.ts | 83 / 1 / 37 |
| arc58/plugins/nfd/contract.algo.ts, constants.ts, errors.ts (auto-renew-mock is test-only and was skimmed) | 488 / 10 / 16 |
| arc58/plugins/haystack-router/contract.algo.ts, errors.ts, constants.ts | 201 / 9 / 4 |
| arc58/plugins/optin, self-optin, asa-manager (contract + errors + types) | 26 / 45 / 84 (+ errors, types) |
| arc58/plugins/revenue-manager/contract.algo.ts, types.ts, constants.ts, errors.ts | 653 / 71 / 11 / 71 |
| utils/programs.ts (new) | 99 |

Cross-reads:
- `utils/functions.ts`: assertSafe*, getControlledSpendingAccount, arc58OptInAndSend, gate helpers.
- `utils/base-contracts/{factory,optin,upgradeable,base}.ts`.
- `arc58/account/factory.algo.ts` (newAccount, cost) and `arc58/account/contract.algo.ts` (assertValidGroup).
- `gates/constants.ts`.
- The SDK `hyper-swap/terms.ts` and `networks.ts`.
- Compiled `artifacts/*` (arc56 method lists, byte sizes, schemas). The artifacts are newer than every source file above.

## Prior-finding verification

| ID | Status | Evidence |
|---|---|---|
| HS-01 (C-3) sender-only disburse + post-expiry cancel | **fixed** | `release` binds the leaf to a caller-supplied `from` (hyper-swap/contract.algo.ts:122-135). `disburseFrom` is permissionless (:492-494). `cancel` in DISBURSING needs `escrowed === leaves && expired` (:508-512), so no cancel is possible after any release. Tested in `tests/meta-consumers.e2e.spec.ts:325-374`. |
| HS-02 unverified `leaves` / unbounded expiration | **fixed (client-dependent by nature)** | 30-day cap at :249. `accept` requires `terms === sha256(id‖root‖leaves‖pRoot‖pLeaves‖exp)` (:99-102, :319). The leaf count can only be checked off-chain. SDK `validateOffer` (akita-sdk/src/hyper-swap/terms.ts:79-105) checks the count, duplicates, funders ⊂ participants, and both roots. A non-SDK client that skips this is not protected. |
| HS-03 principal not bound to participant | **fixed** | `assertSafePayment(payment, Txn.sender)` :380 and `assertSafeAssetTransfer(assetXfer, Txn.sender)` :448. MBR payments are still unbound; see MISC-5. |
| HS-04 registry re-resolved per call | **fixed** | `offerRegistry(id)` is pinned at :261 and used in `verifyLeaf` (:107) and `cleanupOffer` (:643-645). `withdraw` no longer verifies a proof (:536-547). |
| PL-01 factory over-refund / drain | **fixed** | `Poll.deleteApplication` closes to the creator (poll/contract.algo.ts:237-239). `deletePoll` uses `refundReleased` (factory.algo.ts:90-91, cap = recorded deposit). The legacy child branch (balance unchanged ⇒ pay recorded amount) absorbs 0.1 ALGO per legacy poll, per decision H-E. A new child always closes ≥0.1 ALGO, so it cannot take the legacy branch. |
| PL-02 type range check | **fixed** | Exact enum check at poll/contract.algo.ts:172-175. |
| PL-03 recyclable impact weight | **documented (accepted, H-F)** | Comment at poll/contract.algo.ts:100-108. |
| PL-04 vote MBR payer | **fixed** | `assertSafePayment(mbrPayment, Txn.sender)` at :254 and :267. |
| Info: Poll plugin gate subject | **fixed** | The plugin passes `sender` (arc58/plugins/poll/contract.algo.ts:90, :114). This matches `gateCheck(..., Txn.sender, ...)` at poll/contract.algo.ts:252. |
| F2 RM boxes funded by RM for any wallet | **partially fixed** | `requireDaoWallet` was added to newReceiveEscrow, newReceiveEscrowWithRef and migrate (:258, :302, :348). `optIn` still creates RM-funded `managedAssets` boxes that grow without bound; see MISC-4. |
| F3 RM cycle freeze | **fixed** | An undeliverable ASA share is skipped (:500-502). `skipEscrowAllocation` and `updateSplits` are DAO main-account only (:540-613). A Flat split can still stall a cycle; see MISC-3. |
| F4 NFD autoRenew any NFD | **fixed** | Owner check `i.owner.a === sender` (nfd/contract.algo.ts:437-440). Not-yet-expired check (:447). Key names confirmed on live MainNet NFD apps 2276241720 / 2276244697 / 2276249602 (`i.owner.a` and `i.expirationTime` are 32-byte and 8-byte values). Old installs keep the old behavior until reinstalled. |
| F5 spoofed wallet spends plugin balance | **partially fixed** | NFD, HyperSwap plugin and Poll plugin use `getControlledSpendingAccount`. Welcome checks auth inline (:89). RM uses `controls`. Haystack (redeployed), AssetInbox (new), OptIn, SelfOptIn and AsaManager still use the permissive getter. The exposure is only dust on those app accounts (Info). |
| F7 empty batch | **not fixed (Info)** | Unchanged. Still harmless, because verifyAuthAddress reverts. |
| F9 Haystack no economic bound | **not fixed, and the new design adds a theft path** | See MISC-2. |

## New findings

### MISC-1: High. NFD `purchase` pays the seller's current price with no buyer bound

- **Location:** `arc58/plugins/nfd/contract.algo.ts:248-273`.
- **What happens:** The amount is read from the target NFD's `i.sellamt` at execution time and paid in full (`amount: btoi(saleAmountBytes)`). There is no `maxPrice` argument.
- **Scenario:**
  1. A user, or a delegated caller or execution key acting for them, submits `purchase(wallet, true, nfdApp)` expecting the listed price of 100 ALGO.
  2. The seller (the NFD owner) watches the pending pool and lands `offerForSale(10_000 ALGO, …)` on the NFD first. It can also do this any time before a pre-authorized execution-key group runs.
  3. The plugin reads the new `i.sellamt` and pays 10,000 ALGO from the wallet's spending account.
  4. The loss is bounded only by the spending account's balance, or by the escrow allowance when the grant is escrow-scoped.
- **Variant:** Any non-owner grant of `purchase` lets the caller buy a colluding seller's NFD at an arbitrary price.
- **Severity reasoning:** This is the same class as MKT-02 (the marketplace plugin), which was rated High.
- **Fix:** Add `maxPrice: uint64` and `loggedAssert(btoi(saleAmountBytes) <= maxPrice)`. The NFD plugin is being redeployed as v2 anyway (F4/F5), so the ABI change is free now. Consider the same cap for `mint` (the amount is already caller-supplied, so it is fine) and for `renew(years)` (see Suspicion S-1).

### MISC-2: Medium. Haystack plugin: one router input can be reimbursed several times in one group

- **Location:** `arc58/plugins/haystack-router/contract.algo.ts:103-134` (`findFundingTxnIndex`), `:136-176` (pays `amount` from the wallet to the funding txn's sender), `:183-200`. Also `arc58/account/contract.algo.ts:536-572` (a rekey window allows any number of NoOp calls to the same plugin; cooldown 0 by default).
- **Description:** The redesign reimburses the outer "relay" account that pays the router. Each `swap` call independently scans forward from its own index and finds the matching input. Uniqueness is enforced only within one scan, and nothing records that an input has been consumed. Two `swap` calls in the same rekey window, or two windows of the same wallet in one group, therefore both match the same single relay→router payment. Both also pass `assertRouterCall` against the same `finalize`.
- **Scenario:** A caller holding a Haystack `swap` grant on wallet W submits this group:
  1. `W.rekeyToPlugin(haystack, …)`
  2. `swap(W, false, 0, A, out, min)`
  3. `swap(W, true, 0, A, out, min)`
  4. `W.verifyAuthAddress`
  5. `relay(attacker) → router: A ALGO`
  6. `router.finalize(beneficiary = W spending account, min, referrer)`

  The result:
  - W pays 2A to the relay.
  - The relay paid A to the router.
  - W receives the output of only one swap of A.
  - The attacker nets A per extra `swap` call, up to roughly 13 calls per group.

  The loss is bounded by the escrow allowance for escrow-scoped grants. It is unbounded (the whole spending account) for an `escrow=''` grant to a keeper, agent or Global caller. Owner-only grants are unaffected. Before this change the double payment went to the router, not to the caller.
- **Fix:** Make reimbursement single-use. Options:
  - (a) Require that no other txn in the group calls this app: scan for `appId === Global.currentApplicationId` at indices other than `Txn.groupIndex`.
  - (b) Store `Global.groupId ‖ itob(fundingTxnIndex)` in a global and reject reuse.
  - (c) Require the funding txn at a fixed offset after the plugin's window.

  Add a regression test with two `swap` calls (and two windows) sharing one input.

### MISC-3: Low. Revenue Manager Flat split stalls allocation whenever a balance is below the flat value

- **Location:** `arc58/plugins/revenue-manager/contract.algo.ts:471-487`. Validation is at `:137-188`.
- **Description:** `Flat` applies the same `value` to ALGO and to every managed ASA, and `loggedAssert(amount <= remaining)` reverts when the balance is smaller. This includes any managed ASA with zero balance this cycle. Percentages are also computed on `balance`, not on the post-flat remainder, so `flat + p%·balance > balance` also reverts.
- **Scenario:** The DAO configures `[Flat 5 ALGO, Remainder]`. Any cycle in which some managed ASA holds fewer than 5,000,000 base units reverts on that ASA, every day, until a DAO `skipEscrowAllocation` proposal runs. The test at `revenue-manager.e2e.spec.ts:413` relies on exactly this to create a stuck cycle.
- **Fix:** Use `amount = min(value, remaining)` for Flat, compute percentages on the post-flat base, or reject Flat in `validateSplits`. This is DAO-config-only, hence Low.

### MISC-4: Low. Residual of F2: `optIn` still creates RM-funded, never-deleted `managedAssets` boxes

- **Location:** `revenue-manager/contract.algo.ts:200-242` and `utils/base-contracts/base.ts` `optAkitaEscrowInAndSend`.
- **Description:** `optIn` is reachable through the Global grant when the initiator equals `source`, or the caller app is a child of `source` (a factory). A user can drive a factory child to opt the DAO escrow into a freshly minted junk ASA, for example a listing or auction priced in it. The user pays the escrow's 0.1 ALGO opt-in. RM pays the `managedAssets` box (about 14.5 mALGO), which has no delete path. Every such asset also permanently adds one item to every daily cycle (`optinCount + 1`).
- **Impact:** This is not profitable for the attacker (about 0.2 ALGO spent per 0.0145 ALGO locked), but it grows keeper work and RM-locked MBR without bound.
- **Fix:**
  - Have `optIn` require extra payment to RM for the box, or
  - restrict the assets a child may register (for example, only assets the DAO pre-approved), or
  - add a DAO `unmanageAsset` that deletes the box when the escrow has opted out.

### MISC-5: Low. HyperSwap MBR deposits (`offer`, `accept`, `escrowAsa`) are not bound to the caller; refunds to a closed payor block release, withdraw and cleanup

- **Location:** hyper-swap/contract.algo.ts:254 (`payor = payment.sender`), `:336-343`, `:444-456`.
- **Description:** Refunds are sent to the recorded `payor` (:145-150, :182-189, :201-206, :569-574, :615-620, :649).
- **Scenario:**
  1. Party A escrows its ASA leaf with the MBR payment from a throwaway account T.
  2. A closes T to 0.
  3. Every `release` of A's leaf, which refunds 34,900 µALGO to T, fails the receiver min-balance rule, so the leaf stays undeliverable in DISBURSING.
  4. Anyone can unblock it by first sending ≥0.1 ALGO to T, a cost of about 0.065 ALGO net.
- **Impact:** Griefing only.
- **Fix:** `assertSafePayment(mbrPayment, Txn.sender)` on `accept` and `escrowAsa`, as in `escrow`. Optionally, send failed-refund amounts to the leaf funder instead.

### MISC-6: Medium (broken live caller, rollout-ordering). The live PollPlugin's `new` breaks after the PollFactory upgrade

- **Location:** poll/factory.algo.ts:95-105.
- **Description:** `newPollCost` now includes `programPagesMbr(extraProgramPages)`. The Poll approval is 2,165 bytes, which needs 1 extra page, so the quote is 200,000 µALGO for pages. The live MainNet PollPlugin (`networks.ts` `pollPlugin`, the HEAD code) hard-codes `MIN_PROGRAM_PAGES` (100,000) plus schema plus minBalance. `new` asserts `payment.amount === newPollCost()` (:42).
- **Scenario:** After the factory update, every wallet poll creation through the installed plugin reverts with `errInvalidPayment` until the new PollPluginContract is deployed and wallets reinstall it. Votes and deleteBoxes are unaffected.
- **Fix:** Ship the PollPlugin redeploy and the DAO grant swap in the same proposal set as the factory update, and add the old plugin to the SDK's legacy list so `getPluginUpdate` prompts users. Alternatively, keep Poll within one page.

### MISC-7: Info

- **HyperSwap and freeze/clawback assets:** With permissionless disbursal, a party that controls the freeze or clawback of its own escrowed ASA can freeze HyperSwap's holding, or claw it back. It can then have the counterparties' leaves released to itself while its own leaf becomes undeliverable, and the offer can no longer be unwound. The same party could claw back from the counterparty after delivery anyway, so no contract fix exists. Clients should warn whenever a leaf asset has a non-zero freeze or clawback address controlled by a participant.
- **HyperSwapPlugin has no `disburseFrom`:** A wallet can only release its own leaves through the plugin. Third-party completion requires a direct HyperSwap call, which any EOA can make.
- **Welcome always creates wallets with `automaticUpdates = true`** (welcome/contract.algo.ts:111). Recipients cannot opt out at creation. This matters for the sunset auto-update window (prior F1/P-3).
- **AssetInbox and the new Haystack plugin use permissive `getSpendingAccount`:** This is the F5 residual. It only exposes dust on those app accounts.
- **Error-code renames only** in OptIn, SelfOptIn and AsaManager. Do not redeploy these; a new OptIn ID would break `arc58_canCall` for every wallet's Global grant, which HyperSwap and RM opt-ins depend on.

## Suspicions (not fully provable from this repo)

- **S-1 NFD autoRenew price for segments:** `autoRenew` pays whatever `getRenewPrice()` returns, with no cap. If segment renewals are priced from the root owner's `i.segmentPriceUsd` (live NFD `sonia.algo` 2276249602 carries `i.segmentPriceUsd`), a root owner could raise that price and then trigger `autoRenew` through a Global grant on a segment-holder's wallet. That renewal would pay the inflated price, inside the 30-day window, once per year. I could not confirm NFD v3's renew pricing for segments. Suggested fix: an owner-configured `maxRenewPrice` (stored per wallet in a box, or an argument fixed by the grant).
- **S-2 Haystack router input consumption:** The plugin only binds router calls whose selector equals `routerMethod`, and it reimburses whoever funded the matched input. If the production router has any other entry point that can consume an input, or return unused input to the input's sender, the relay could recover its input after being reimbursed. This needs the router's TEAL to confirm. It compounds the F9 note.

## Upgrade and rollout notes

1. **Meta is a new app, not an in-place upgrade.** Live MetaMerkles 3569558010 extends `Contract`, has no update route, schema 1 uint / 0 bytes, and 1 extra page. `scripts/update-meta.ts` (appIdKey `metaMerkles`) therefore cannot be used against it. Use `deploy-meta.ts` and then a DAO app-list repoint.
2. **The fresh Meta has no tree types.**
   - `addRoot` requires `types(type).exists`. HyperSwap uses type 3 (Trade), so every `HyperSwap.offer` reverts with `errNoTreeType` until types 0..3 exist. Royalty, merkle-gate and staking-pool roots need types 1 and 5 as well.
   - Types are positional, cost exactly 100 ALGO each (non-refundable, with no withdraw path), and no script seeds them.
   - Seed 0 Unspecified, 1 Collection, 2 Trait, 3 Trade, 4 Whitelist, 5 Addresses, 6 HyperSwap in this exact order, matching meta/constants.ts:55-61. That is 700 ALGO. Note that `tests/meta-consumers.e2e.spec.ts:62-65` labels id 2 "Addresses", which does not match the constants.
   - MainNet MetaMerkles holds only 7 type boxes and no roots or data, so nothing is stranded by the repoint.
3. **HyperSwap 3569558555:** `offer_cursor = 0`, no boxes, schema 2 uints / 1 byte (unchanged), extra pages 3 (8,192 B ≥ 3,951 B new approval). The upgrade is safe. Repoint `metaMerkles` to Meta and seed the types (note 2) before the first offer. The old HyperSwapPlugin breaks (the `accept` selector changed and the `mbr().offers` quote grew), so redeploy the plugin in the same set.
4. **PollFactory 3569557932:** schema 8 / 56 (unchanged), 3 extra pages, new approval 3,975 B. See MISC-6 for the plugin lockstep. Legacy children: each deletion costs the factory 0.1 ALGO (accepted).
5. **The Welcome plugin is new** and pins the factory ID. It must be deployed only after the wallet factory upgrade that adds `automaticUpdates`. `scripts/lib/principal-rollout.ts:606` lists the factory as a dependency, and the gap check (`calledSignatures`) refuses on a selector gap. Keep `--allow-unupgraded-targets` off for Welcome.
6. **NFD v2, RM v2, Haystack v2 and PollPlugin v2 are new app IDs** (plugins are immutable, and the wallet rejects updated plugins). Existing installs keep the old behavior until reinstalled. For NFD that means F4 stays open on old installs. RM migration requires every live escrow to be Idle with `allocationCounter == 0`.
7. MainNet runs consensus v42 (AVM 13, `PerByteTxnSurcharge = 100`). Meta and MetaPlugin target AVM 13, and large `setRecord` calls (up to 16 KB of args) pay the per-byte surcharge through pooled fees.

## Test gaps (named, not written)

- Haystack: two `swap` calls in one window, and two windows of one wallet, sharing one relay input (MISC-2).
- NFD: `purchase` after the seller raises `i.sellamt` in the same group or earlier, expecting rejection once `maxPrice` exists (MISC-1). `autoRenew` on a segment NFD (S-1).
- HyperSwap:
  - Withdraw and cleanup after the DAO repoints `metaMerkles` mid-offer (HS-04 pinned registry).
  - `disburseFrom` by a third party through the `receiverWallet` ARC-58 opt-in path.
  - Refund to a closed payor (MISC-5).
  - An offeror absent from the participant tree.
  - `offer` against an unseeded Meta.
- PollFactory: the legacy-child branch of `deletePoll` (a child compiled from the HEAD Poll), and the old-plugin `new` after the factory update (MISC-6).
- RM:
  - Flat split with balance < value (MISC-3).
  - Child-driven `optIn` of an arbitrary ASA (MISC-4).
  - A receiver wallet that self-upgrades and garbles `akita_dao` / `factory_app`, followed by skip → finalize → updateSplits recovery.
- Meta deployment: types seeded in constant order, and every consumer type (1, 3, 5) is resolvable.

## Checked and OK

- **Meta registry:**
  - Owner-keyed `r`/`m`/`t` namespaces are disjoint.
  - `rootCosts` = 31,700 + 400·name, which equals the real box MBR. HyperSwap's 35,300 quote matches its 9-byte names.
  - `setRecord` payment is bound (index, sender, receiver, amount, close, rekey).
  - Grow/shrink refunds go to `Txn.sender`.
  - The `box_put` + `resize` + `splice` assembly yields d0‖d1‖d2‖d3 with the correct length prefix.
  - Record and box sizes stay within the 64-byte name and 16 KB argument limits.
  - Sorted-pair double-hash proofs leave no leaf/internal-node confusion.
  - Upgrades are gated by the DAO wallet plus the update plugin.
- **MetaPlugin:**
  - `grant()` checks the rekey index, selector, plugin ID, current PluginKey and auth address.
  - Admin is `caller == wallet.address && escrow == ''`.
  - Policy keys are per wallet ID (a fake wallet can only write its own policies).
  - Shrink/clear refunds equal Meta's refunds, so the plugin balance is neutral.
  - Namespace/key scope is enforced with length-prefixed record keys.
  - `addType` requires an unrestricted scope.
- **HyperSwap:**
  - Box MBR constants match the real sizes (offer 48,100, refund 22,100, registry 9,300, participant and hash 34,900).
  - The offer deposit equals the boxes created plus the two Meta roots, and `cleanupOffer` refunds it once, after deleting every box and both roots.
  - Double release or withdraw is prevented by deleting the hash box.
  - `terms` covers every immutable field.
  - Inner fees are 0.
  - The ARC-58 opt-in path checks `Application(receiverWallet).address === receiver`, so the wallet app is fixed by the leaf.
  - AVM forbids re-entry.
- **Poll:**
  - One vote per sender.
  - The vote and delete windows do not overlap.
  - Duplicate and out-of-range options are rejected.
  - Only the factory can delete, and only with zero boxes.
  - The new child closes its account to the factory.
  - The `refundReleased` cap prevents an over-refund.
  - `newPollCost` matches the create-time page and schema MBR.
- **Poll plugin:**
  - Checks factory provenance.
  - Quotes the cost from the factory.
  - The gate txn subject matches the vote subject.
  - `GateMustCheckAbiMethod` equals `Gate.mustCheck`'s signature.
- **Welcome:**
  - Auth is checked against the plugin.
  - The cost is quoted from the pinned factory with the same payer.
  - The `maxCost` guard is applied.
  - The ALGO gift is passed as `extraFunding`.
  - For an ASA gift, the factory opts the new wallet in and then the plugin's axfer carries the rekey back.
  - The `newAccount` argument order matches the current factory.
- **AssetInbox:**
  - The router is pinned.
  - ARC-59 claims and rejects are authenticated by the spending account, so no other party can claim a wallet's inbox.
  - The opt-in is only for assets actually present; otherwise the claim reverts.
  - The freed inbox MBR flows back to the spending account.
- **NFD:** The registry validates `(name, appId)`. The owner and expiration keys were verified on MainNet. A second `autoRenew` in one group fails the window check after the first renewal.
- **Revenue Manager:**
  - Configuration methods are DAO-wallet only.
  - Skip and updateSplits are DAO main-account only (escrow grants have spending = escrow ≠ origin).
  - Percentages use `mulw`/`divw`.
  - The last percentage split takes the exact remainder.
  - Duplicate IDs are rejected.
  - `receiveAssets` boxes are created and deleted within each cycle.
  - The undeliverable-share skip does not disturb later splits.
- **OptIn / SelfOptIn / AsaManager:**
  - The MBR payment is bound to the spending account and gtxn args are positional, so there is no reuse.
  - Rekey-back is on the last inner txn.
- **utils/programs.ts:** Page math matches v42 (`MaxAbsoluteExtraProgramPages = 7`). Chunking is correct (empty chunks past the end).
