# Akita security audit: Subscriptions + Gates (read-only)

Reviewer scope: `smart_contracts/subscriptions/*`, `arc58/plugins/subscriptions/*`,
`gates/contract.algo.ts` + all 16 `gates/sub-gates/*`, `arc58/plugins/gate/*`.
Cross-read: `utils/functions.ts` (origin/referral/gate helpers), `escrow/factory.algo.ts`,
`arc58/account/factory.algo.ts`, `arc58/account/contract.algo.ts`, `social/impact.algo.ts`,
`social/graph.algo.ts`, `staking/contract.algo.ts`, `meta/contract.algo.ts`.
Reviewed the current working tree. All paths below are relative to
`/Users/kylebreeding/akita/akita-sc/projects/akita-sc/smart_contracts/`.

## Important context: documented fixes are not in the code

`CONTRACT_AUDIT.md` says several Subscriptions and Gates findings are remediated: bound grouped
senders, clawback rejection, the subscriber origin as the trigger gate subject, ALGO creation-fee
referral, pass cleanup keyed by subscription, a service MBR that reserves the maximum description,
strict operator/structure validation for gates, and exact NFD slicing. None of these fixes is in
the working tree. The working-tree diff of `subscriptions/contract.algo.ts` and `gates/**`
against HEAD only renames error constants (insertions equal deletions). No local branch has the
fixes either; I checked by grepping every branch for sender or clawback checks. The fixes are
missing, not regressed. Treat the audit doc's "fixed" rows for these areas as inaccurate.

---

## Findings

### SG-01 — ASA `newService` pays the referral out of subscribers' escrowed ASA (High, Confirmed)
- **Where:** `subscriptions/contract.algo.ts:538` (`sendReferralPayment(this.akitaDAO.value, asset, serviceCreationFee)`), then `:543-548` (leftover paid in **ALGO**); `utils/functions.ts:617-640` and the ASA branch of `createInstantDisbursement`, which runs `itxn.assetTransfer({ assetAmount: sum, xferAsset: asset })` from the Subscriptions app (`utils/functions.ts:~576-583`). The plugin path does the same: `arc58/plugins/subscriptions/contract.algo.ts:141-167`.
- **Description:** `serviceCreationFee` is an ALGO amount (default 100 ALGO). For `asset != 0`, the code computes the referral as `calcPercent(serviceCreationFee, referrerPercentage)` (default 20% = 20,000,000) but pays it **in base units of the ASA**, from the Subscriptions app's own ASA balance. That balance is the pooled `escrowed` deposits of ASA subscribers. Meanwhile the full ALGO fee is collected, and only `fee - referralFee` ALGO is forwarded, so the contract keeps the ALGO difference.
- **Exploit:** The attacker creates an Akita wallet whose `referrer` is an address they control; `newAccount` accepts any referrer. They call `newService(asset = X)` for an ASA X that the Subscriptions app holds as subscriber escrow. Each call moves 20,000,000 base units of X into a Rewards disbursement that the attacker's referrer can claim, and costs the attacker about 100 ALGO plus MBR. For low-decimal or high-value ASAs (for example an 8-decimal BTC token, where 2e7 sats is 0.2 BTC), this is very profitable theft. For any ASA it drains other users' escrow, so their `withdraw`, `unsubscribe`, and `triggerPayment` calls then fail. A legitimate merchant who has a referrer causes the same drain without intending to.
- **Fix:** Always call `sendReferralPayment(akitaDAO, 0, serviceCreationFee)` in `newService` and `newServiceCost`, matching the ALGO fee payment. Account for escrowed ASA per asset and assert that outflows never exceed non-escrowed balance.

### SG-02 — Anyone can inflate a subscription streak with `streakCheck` (High, Confirmed)
- **Where:** `subscriptions/contract.algo.ts:145-163` (`updateStreak`), `:1009-1011` (`streakCheck`, no auth), `:1003` (trigger also increments).
- **Description:** `updateStreak` adds 1 whenever `lastPayment` falls in the previous window and not the current one. `streakCheck` does not change `lastPayment`, so calling it N times in the same window adds N. `triggerPayment` then adds another 1.
- **Exploit:** Subscribe, wait one interval, send `[streakCheck × N, triggerPayment]` in one group, and the streak becomes N+2 after paying only two periods. Consumers that are affected:
  - `SubscriptionStreakGate` (`gates/sub-gates/subscription-streak/contract.algo.ts:70-77`): any streak threshold can be bypassed.
  - `AkitaSocialImpact.getSubscriberImpactScore` (`social/impact.algo.ts:242-260`, streak ≥ 12 gives the maximum subscriber impact). That impact feeds social fees, `SocialImpactGate`, and other impact consumers.
  - Anyone can also inflate a victim's streak to make them fail `Equal` or `LessThan` streak gates.
- **Fix:** Make `streakCheck` only reset the streak (never increment), or track the last window credited (`lastStreakWindow`) and increment at most once per window, only when a payment is made.

### SG-03 — `SubscriptionGate` and `SubscriptionStreakGate` pass with a dust donation (High, Confirmed)
- **Where:** `gates/sub-gates/subscription/contract.algo.ts:39-59, 85-90`; `gates/sub-gates/subscription-streak/contract.algo.ts:47-68`.
- **Description:** The registry stores `(merchant, id)`, but `check` looks up `subscriptions[{caller, id}]`. That treats `id` as the caller's per-account subscription counter, not a service. It then only checks `recipient === merchant` and that the subscription is not stale. It never checks `serviceID`, so a donation (`serviceID == 0`) counts. Donation `amount` and `interval` are chosen by the subscriber (minimum 4 base units, interval ≥ 60, no maximum).
- **Exploit:** The gate means "subscribed to merchant M (service/id k)". The attacker uses an EOA whose subscription counter will reach `k` (filling earlier IDs with throwaway subscriptions, unsubscribed afterwards if they like). Subscription #k is `subscribe(recipient = M, amount = 4, interval ≈ 40 years, serviceID = 0)`. `notStale` stays true for the whole first interval, because `lastWindowStart = start - interval`. The gate passes for decades at a cost of 4 µALGO plus a refundable MBR. With SG-02, any streak threshold also passes.
  - Side effect: wallet users subscribe from their wallet or escrow address, but the gate looks up `caller` (the origin EOA), so legitimate wallet subscribers fail the gate.
- **Fix:** Register `(merchant, serviceID)`. Have the check take the subscriber's subscription ID as a check argument, then verify `info.serviceID == registered serviceID` (and `!= 0`), `recipient == merchant`, the service is not shutdown, and the subscription is not stale. Key the lookup by the caller's actual subscribing account(s).

### SG-04 — Spoofable "origin" makes gates check an attacker-chosen subject (High, Confirmed, systemic)
- **Where:** `utils/functions.ts:142-206` (`originOr` / `getOriginAccount` read `controlled_address` from whatever app `EscrowFactory.get(Txn.sender)` returns); `escrow/factory.algo.ts:78-101` (`register(payment, 0)` lets **any** calling app map its own address to its own app ID); `arc58/account/factory.algo.ts:79-150` (`newAccount` accepts any `controlledAddress` without proof of control). Consumers in scope: `subscriptions/contract.algo.ts:714-716`, `:760-762`, `:916-918`.
- **Description:** The gate subject in Subscriptions is `originOrTxnSender(getWalletIDUsingAkitaDAO(akitaDAO, Txn.sender))`. Nothing checks that the resolved "wallet" was created by the canonical wallet factory, or that its `controlled_address` is really controlled by it.
- **Exploit (no wallet needed):** The attacker deploys app X, which sets global `controlled_address` to a whale address W that satisfies the gate, then calls `EscrowFactory.register(pay, 0)`. App X then sends an inner group `[pay → Subscriptions, Gate.mustCheck(W, gateID, args), Subscriptions.gatedSubscribe(...)]`. Subscriptions resolves the wallet to X and the origin to W. `gateCheck` requires `appArgs(1) == W`, so the gate is evaluated on W and passes. X now holds a gated subscription. The alternative route is a factory wallet with `controlledAddress = W` plus a plugin escrow as sender. The same pattern affects every gated feature that derives origin this way (outside this scope: social, poll, marketplace, etc.).
- **Fix:** In `getWalletIDUsingAkitaDAO`/`originOr`, require `Application(wallet).creator == walletFactory.address`. Have the wallet factory require proof of control of an external `controlledAddress` (a signed zero-payment or rekey in the creation group). Restrict `EscrowFactory.register(…, 0)` to wallet-factory-created apps.

### SG-05 — Gated trigger evaluates the gate on the keeper, not the subscriber (Medium, Confirmed)
- **Where:** `subscriptions/contract.algo.ts:906-921` (origin derived from `Txn.sender`); plugin `arc58/plugins/subscriptions/contract.algo.ts:469-498` (builds the gate txn for `subOrigin`, the subscriber).
- **Description and exploit:** A subscriber who has lost eligibility (sold the gating asset, unstaked, and so on) keeps the subscription live and fresh. That also keeps `SubscriptionGate` passing for them, because any keeper who passes the gate (or an alternate account, or SG-04) can trigger. In the other direction, the plugin's correct `subOrigin` never matches the contract's keeper-origin check, so third-party keepers cannot trigger gated subscriptions through the plugin (a functional DoS).
- **Fix:** Derive the subject from `key.address`: `originOr(getWalletIDUsingAkitaDAO(akitaDAO, key.address), key.address)`.

### SG-06 — Gate expression evaluation ignores nesting and operators, so gates can be weaker than configured (Medium, Likely)
- **Where:** `gates/contract.algo.ts:48-87` (`evaluate`), `:118-155` (`register` has no operator, structure, or arg-count validation).
- **Description:**
  1. A nested group is detected only when `filters[i+2].layer > filters[i+1].layer`. A deeper layer that starts at `i+1` is treated as flat. Example: `[A{L0,AND}, B{L1,OR}, C{L1}]` is intended as `A AND (B OR C)` but evaluates to `(A AND B) OR C`, so a caller satisfying only C passes.
  2. Nested results are combined with `filters[i].logicalOperator` instead of the operator of the filter just before the group (`filters[i+1]`). For example, `[A{L0,OR}, B{L0,AND}, C{L1,AND}, D{L1}]` evaluates to `(A||B)||(C&&D)`.
  3. An unknown operator value (anything other than 10/20, including the default 0) silently drops `nextResult`.

  There are no e2e tests with layer > 0.
- **Fix:** Validate `logicalOperator ∈ {AND, OR}` for every non-final entry, `filters.length > 0`, and `args.length == filters.length` at register and check. Rewrite `evaluate` as a proper recursive-descent parser over layers, or flatten to an explicit postfix or tree form. Add nested-semantics tests.

### SG-07 — NFD-root gate: root-level NFDs skip the root check and the suffix match has no delimiter (High, Confirmed)
- **Where:** `gates/sub-gates/nfd-root/contract.algo.ts:40-53`.
- **Description and exploit:**
  - If the NFD has no `i.parentAppID` (any root-level NFD), the root comparison is skipped entirely. Owning (or being a verified address on) any registry-valid root NFD such as `evil.algo` passes a gate for root `akita`.
  - For segments, the check only compares the `root.length` bytes before the last 5 characters. It does not check the preceding `.`, that the suffix is `.algo`, or that the parent app is the root's app. So `x.notakita.algo` passes for root `akita`.
- **Fix:** Require `parentExists`, resolve the parent app ID, and require the parent's `i.name == root + ".algo"` (validated through `isValidNfdAppId`). Alternatively, require an exact match `nfdName == root + ".algo"` or `nfdName` ending with `"." + root + ".algo"`.

### SG-08 — Passes box: cleanup uses the wrong key, MBR is overcharged and lost, and unpaid boxes can be created (Medium, Confirmed)
- **Where:** `subscriptions/contract.algo.ts:871-874` (deletes `passes[{sender, sub.serviceID}]`), `:1035` (writes `passes[{sender, subscriptionID}]`), `:1020-1035`; `subscriptions/base.ts:14`.
- **Description:**
  1. `unsubscribe` deletes and refunds the box keyed by the **service ID**, not the subscription's own ID. The real pass box is orphaned forever, because `setPasses` requires the subscription to exist. The subscriber's prepaid pass MBR is not refunded, or a different subscription's pass box is deleted instead.
  2. `costs.passes = 18_900 + BoxCostPerBox(2,500) * 160 = 418,900`. It should use `BoxCostPerByte`; the real maximum is 83,700. Every subscriber to a service with passes pays 418,900, and because of (1) usually never gets it back.
  3. `setPasses(id, [])` on a subscription to a `passes == 0` service passes the `passes >= length` check and creates a 43-byte box (19,700 µALGO) funded from the pooled app balance. After unsubscribing, that box can never be deleted. Each cycle costs the attacker roughly 4k µALGO in fees and permanently locks 19.7k µALGO of other users' escrow as MBR.
- **Fix:** Delete `passes[{sender, id}]` in `unsubscribe`. Charge `MinPassesMBR + 2 (length prefix) * 400 + BoxCostPerByte * 32 * MAX_PASSES`. Reject `setPasses` when `service.passes == 0`.

### SG-09 — Service MBR is far below the actual box size and is paid from subscriber escrow (Medium, Confirmed)
- **Where:** `subscriptions/constants.ts:13` (`ServicesMBR = 62_500`, which covers 150 bytes); `subscriptions/contract.algo.ts:525, 570-594`.
- **Description:** The service box is 162 bytes (41-byte key plus 121-byte value) plus the title and description. Its MBR ranges from 67,300 up to 1,378,900 µALGO (128-byte title, 3,151-byte description), but only 62,500 is charged. `setServiceDescription` and `updateServiceTitle` grow the box for free. Every full-description service (and the plugin's `newService` always writes a description) takes up to about 1.32 ALGO of other users' escrowed ALGO and turns it into locked MBR. Withdrawals and unsubscribes eventually fail. The audit doc's "retained reserve for the maximum description" is not implemented.
- **Fix:** Charge `2500 + 400 * (41 + 121 + MAX_TITLE_LENGTH + MAX_DESCRIPTION_LENGTH)`, or charge the growth delta in `setServiceDescription`/`updateServiceTitle`.

### SG-10 — Staking-amount gate trusts the stale recorded SOFT stake amount (Medium, Likely)
- **Where:** `gates/sub-gates/staking-amount/contract.algo.ts:67-79` (for non-heartbeat types it uses raw `mustGetInfo().amount`); compare with `Staking.softCheck` (`staking/contract.algo.ts:782-800`).
- **Description and exploit:** A SOFT stake records a commitment but leaves the tokens in the wallet. Validity relies on someone calling `checkpointSoftStake`. A user can soft-stake 1M from account A, move the tokens to B, soft-stake again, and so on. Every account passes a "≥ 1M soft staked" gate with the same tokens until someone checkpoints them. The register step also does not validate `type`.
- **Fix:** For SOFT, use `softCheck` (`valid && amount`), or `min(recorded, current balance)`. Whitelist `type`.

### SG-11 — Grouped fund transactions are not bound to the resource owner, and clawback/close fields are unchecked (Low, Confirmed)
- **Where:** `subscriptions/contract.algo.ts:262-263, 371-376, 540-541, 671-672, 803-829`.
- **Description:** `payment.sender`, `assetXfer.sender`, `assetXfer.assetSender` (clawback), `assetCloseTo`, `closeRemainderTo`, and `rekeyTo` are never checked. Each grouped txn must still be signed by its sender and ARC-4 txn args are positional, so outside a cooperating signer this only lets a sponsor fund someone else's subscription (and the refund goes to the subscriber, not the sponsor). A clawback-sourced transfer is possible only for the clawback authority. No direct theft was found, but this contradicts the protocol invariant and the audit doc's "fixed" claim.
- **Fix:** Assert `sender == Txn.sender`, `assetSender == Global.zeroAddress`, and zero close/rekey fields.

### SG-12 — `verifyServiceActivation` is not bound to the same merchant (Low/Info, Confirmed)
- **Where:** `subscriptions/contract.algo.ts:453-473`.
- **Description:** Any later `activateService` call satisfies the check, including one from a different sender (which activates that sender's own latest draft). The merchant's service stays Draft and can be activated later in another group. The impact is limited to breaking the "created in one group" invariant. If the merchant then creates another service, the earlier draft can never be activated (self-harm).
- **Fix:** Assert `txn.sender == Txn.sender`.

### SG-13 — `SocialFollowerCountGate` calls a non-ABI method on the graph app, so it always fails (Low, Confirmed)
- **Where:** `gates/sub-gates/social-follower-count/contract.algo.ts:49-52` calls `AkitaSocial.getMeta` on `getAkitaSocialAppList().graph`, but `AkitaSocialGraph.getMeta` is `private` (`social/graph.algo.ts:53`).
- **Impact:** Every check rejects. Inside an OR composite this makes the whole gate fail closed (DoS).
- **Fix:** Call `getMeta` on `.social` (where `followerCount` is stored).

### SG-14 — NFD and NFD-root verified-address loop only checks the first address (Low, Confirmed)
- **Where:** `gates/sub-gates/nfd/contract.algo.ts:44-49`; `gates/sub-gates/nfd-root/contract.algo.ts:69-75`. `caAlgoData.slice(i, 32)` uses an end index, not a length, so it returns empty for `i ≥ 32`.
- **Impact:** Verified addresses after the first are rejected (fail closed). `social/impact.algo.ts` uses the correct `slice(i, i + 32)`.

### SG-15 — AssetGate registry MBR is under-quoted (Low, Confirmed)
- **Where:** `gates/sub-gates/asset/contract.algo.ts:75-86` uses `OperatorAndValueRegistryMBR = 9,300` (a 17-byte box), but the box is an 8-byte key plus a 17-byte value, which needs 12,500.
- **Impact:** Each registration takes 3,200 µALGO from AssetGate's own balance. Repeated registrations exhaust it and DoS new asset gates.
- **Fix:** Charge 12,500.

### SG-16 — Gate registration forwards ALGO in amounts chosen by caller-selected sub-gate apps (Low/Info, Confirmed)
- **Where:** `gates/contract.algo.ts:129-139`; `arc58/plugins/gate/contract.algo.ts:35-53`.
- **Description:** `cost()` comes from an arbitrary app, and the same amount is paid to that app's address from the wallet's spending account. Normally this is self-harm only. If the Gate plugin is installed for an agent or a global caller, it becomes a payment primitive to an arbitrary address, limited only by the allowance.
- **Fix:** Whitelist sub-gate app IDs through the DAO registry, or cap per-filter cost.

### SG-17 — Minor fail-closed and accounting notes (Info)
- `SubscriptionStreakGate` with a missing subscription computes `% 0` and panics, failing the whole composite (including OR).
- `StakingAmountGate.mustGetInfo` panics when no stake exists, with the same composite effect.
- `AkitaReferrerGate` panics for external-controlled wallets (the origin EOA is not registered).
- `AssetGate` and `MerkleAssetGate` with asset 0 always return false.
- The referrer gate's semantics are weak, because the referrer is self-declared at wallet creation.
- `MerkleAddressGate` passes the `Unspecified` type (wildcard) and requires a proof of at least 2 elements (`MinCheckArgsLength = 66`), so trees with 1 or 2 leaves can never pass.
- An empty-filter gate is underfunded by 800 µALGO.
- Merkle and NFD-root register costs use `BoxCostPerBox` per byte (overcharge, self-harm).
- In the `SubscriptionsPlugin`, the shared `description` box (`initDescription`/`loadDescription`) can be created or resized by anyone using plugin-app MBR (up to about 1.26 ALGO, once).
- Pass addresses are not used by any on-chain gate.

---

## Checked and OK
- `triggerPayment` double or early trigger: `canTrigger` enforces one payment per window, `amount ≤ escrowed`, not blocked, and not shutdown. Paused services stay triggerable by design.
- The fee split adds up exactly (`akitaFee + triggerFee + leftOver = amount`). Minimum amount 4 prevents underflow at the default fee config. Inner txn fees default to 0, so the app pays no fees.
- `withdraw`, `deposit`, `unsubscribe`, and `setPasses` are keyed by `Txn.sender`, so nobody can withdraw or modify another account's subscription. ARC-4 txn args are positional, so one payment cannot be credited twice.
- Subscription, subscriptions-list, services-list, and blocks MBR constants match their box sizes. The block key 16-byte truncation is collision-infeasible.
- `subscribe` on a gated service is rejected (`gateID == 0` check). Gated paths take `gateID` from the service record, and `gateCheck` pins the Gate app, `mustCheck` selector, subject, and gate ID.
- `Gate.check`/`mustCheck`: missing args, gate IDs, or registry entries fail closed. Layer monotonicity is enforced.
- Poll gate checks that the poll's creator is the canonical poll factory. The social activity, impact, moderator, and follower-index gates use canonical DAO app IDs and the caller as subject.
- Staking power reads the canonical Staking app's LOCK type with correct expiry handling.
- `MerkleAsset` binds the leaf to the caller's held ASA and the Collection type. `MerkleAddress` binds the leaf to `sha256(sha256(caller))`.
- Sub-gate registry MBRs for subscription, streak, referrer, poll, social (operator/value), staking-amount, staking-power, and follower-index are correct.
- Subscriptions plugin methods always act on `getSpendingAccount(wallet)` and pin the canonical Subscriptions and Gate apps. Rekey-back is applied on the final call of every method.
