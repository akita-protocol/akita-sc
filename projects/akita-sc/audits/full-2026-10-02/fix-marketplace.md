# Fix proposals: Marketplace / Listing, PrizeBox, Plugin DEX, Marketplace ARC-58 plugin

These proposals cover the findings in `audit-marketplace.md`. Paths are relative to `projects/akita-sc/smart_contracts/` unless they start with `akita-sdk/`, which means `projects/akita-sdk/src/`. This was a read-only exercise: nothing has been edited, built or run.

Every PuyaTs API used below was checked against `node_modules/@algorandfoundation/algorand-typescript/*.d.ts` or against existing repo code:

| API | Where it is defined or already used |
| --- | --- |
| `Account.balance`, `Account.minBalance`, `Account.authAddress`, `Account.isOptedIn` | `reference.d.ts:15,21,27,88` |
| `Asset.clawback`, `Asset.balance(acct)` | `reference.d.ts:164,176` |
| `Global.zeroAddress`, `Global.round` | `op.d.ts:1146,1161` |
| `op.AppGlobal.getExUint64` returns `[uint64, boolean]` | `op.d.ts:249` |
| `gtxn.AssetTransferTxn.assetSender` / `.assetCloseTo` | `gtxn.d.ts:333,341` |
| `PaymentTxn.closeRemainderTo` | `gtxn.d.ts:73` |
| `@abimethod({ allowActions: 'DeleteApplication' })` | `arc4/index.d.ts:96`; used in `auction/contract.algo.ts:585` |
| `onCompletion: OnCompleteAction.DeleteApplication` on `abiCall` / `compileArc4(...).call.*` | `arc4/c2c.d.ts:34` (`TypedApplicationCallFields` ⊇ `itxn.ApplicationCallFields`); used in `staking-pool/factory.algo.ts:158-162` |

**Live mainnet apps affected** (`akita-sdk/networks.ts`):

| App | ID | How it is upgraded |
| --- | --- | --- |
| Marketplace factory | 3569557584 | `UpgradeApp`. Its Listing bytecode lives in box `bc` and is reloaded with `initBoxedContract` / `loadBoxedContract`. |
| PrizeBoxFactory | 3569557972 | `UpgradeApp`. The PrizeBox program is compiled into the factory through `compileArc4(PrizeBox)` rather than stored in a box, so upgrading the factory changes the bytecode of every PrizeBox minted afterwards. |
| MarketplacePlugin | (current DAO plugin entry) | Not upgradeable: it extends `AkitaBaseContract`, which has no `update`. Must be redeployed as a new app. |
| PluginDex | not deployed | Rewritten as PluginDex v2 (2026-10-03). It is immutable by design: no `update` or `delete`. It is deployed through `scripts/lib/immutable-catalog.json` as the first app of the v2 stack, in dependency order. PD-01 and PD-02 are resolved; see their status notes. |

Order: Critical/High first, then Medium, Low and Info.

---

## MKT-01 (High): purchaseAsa does not delete the listing, so the factory leaks app MBR

**Change: `marketplace/listing.algo.ts` → `purchaseAsa`**

```ts
// remove the `// @ts-ignore` line and the bogus key
@abimethod({ allowActions: 'DeleteApplication' })
purchaseAsa(assetXfer: gtxn.AssetTransferTxn, buyer: Account, marketplace: Account): void { ... }
```

Add a revision marker to the Listing so the factory can recognise legacy (pre-fix) children:

```ts
// marketplace/constants.ts
export const ListingGlobalStateKeyRevision = 'rev'
export const ListingRevision: uint64 = 2   // needs `import { uint64 } ...`

// listing.algo.ts
rev = GlobalState<uint64>({ key: ListingGlobalStateKeyRevision })
// in create():
this.rev.value = ListingRevision
```

**Change: `marketplace/marketplace.algo.ts` → `purchaseAsa`, `gatedPurchaseAsa`.** Also make `purchase`, `gatedPurchase` and `delist` explicit; they already compile to `5`, but should not rely on the default.

```ts
private isLegacyListing(appId: Application): boolean {
  const [, hasRev] = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyRevision))
  return !hasRev
}

// purchaseAsa / gatedPurchaseAsa, before the inner call:
loggedAssert(!this.isLegacyListing(appId), errLegacyListing)   // new code 'errLgcy' in marketplace/errors.ts

listing.call.purchaseAsa({
  appId,
  args: [ itxn.assetTransfer({ ... }), Txn.sender, marketplace ],
  onCompletion: OnCompleteAction.DeleteApplication,
})
// same `onCompletion: OnCompleteAction.DeleteApplication` on listing.call.purchase(...) and listing.call.delist(...)
```

**ABI and schema**
- In the Listing ARC-56, `purchaseAsa` actions change from `call: [NoOp]` to `call: [DeleteApplication]`.
- The Listing gains one global uint (`rev`). Global uints go from 9 to 10 (more come with MKT-06/07).
- The factory's cost formula uses `listing.globalUints`, so it adjusts itself.
- **SDK:** `akita-sdk/marketplace/index.ts:332-350` hard-codes `baseCost = 756_500n` (9 uints). Replace it with a call to the new readonly `listCost` (MKT-09). The generated `ListingClient` will send `purchaseAsa` with `DeleteApplication`. `akita-sdk/marketplace/index.ts:417` builds the factory call (factory ABI unchanged), so only the regenerated clients are needed.

**Deployment**
- Use one DAO proposal and execute it atomically:
  1. `UpgradeApp` for Marketplace 3569557584.
  2. `initBoxedContract` / `loadBoxedContract` with the new Listing bytecode, using `UpdateAkitaDAOPlugin` "load factory bytecode".
- If the two land in different groups, `list` reverts in between because the create ABI changes with MKT-06. That window is an outage, not a vulnerability.
- Legacy children keep their old code. With the guard above:
  - Legacy ASA-priced listings cannot be bought. Their sellers must `delist` and relist.
  - Legacy `delist` works and correctly deletes the app, because `delist` was always `DeleteApplication`.
  - Legacy ALGO-priced listings keep working: `purchase` was always `DeleteApplication`.

**Leaked MBR from orphaned listings**
1. **Inventory.** Use the indexer to list apps created by the factory address (`accounts/{factoryAddr}/created-applications`, including deleted = false). A zombie is a listing whose app still exists while its account balance is 0 and it holds no assets. Each zombie has permanently locked 756,500 µALGO of the factory's minimum balance (2 pages, 9 uints, 6 bytes). It may also have over-refunded `escrowOptInCost`.
2. **Prize-box zombies cannot be recovered.** Old `delist` first calls `PrizeBox.transfer(seller)`, and the zombie no longer owns the box. If the buyer transferred the box back, it would go to the *original seller*. Write these off.
3. **ASA-prize zombies may be recoverable** (only if any exist from older bytecode). Add an optional DAO-wallet-only `sweepLegacyListing(appId)` method that:
   - funds the zombie with `Global.minBalance + 2 × assetOptInMinBalance`;
   - calls the old creator-only `optin(pay, prize)` and `optin(pay, paymentAsset)`, whose selectors are unchanged;
   - calls `delist(seller)` with `onCompletion: DeleteApplication`. Old `delist` only checks `caller === seller` and `Txn.sender === creator`.

   This only works if the seller is still opted into both assets, because the `assetCloseTo` receiver must be opted in. Recovery is about 0.7565 ALGO per zombie, with no refund paid out (the funder was already refunded). Only build it if the inventory finds enough such zombies to justify it.
4. **Treasury.** Have the DAO top up the factory's free balance by `n × 756,500 µALGO + escrow over-refunds`, so that refunds owed to legitimate sellers of live legacy listings cannot fail. Record the locked amount as a write-off.

**Regression tests (`marketplace/marketplace.e2e.spec.ts`)**
- List a prize box priced in an ASA, buy it with `purchaseAsa`, and assert:
  - the listing app no longer exists (`getApplicationById` throws);
  - the seller receives their split and the buyer owns the box;
  - factory balance minus factory minBalance (free balance) is the same before list and after purchase;
  - the funder's ALGO is back to its starting value minus fees.
- Repeat with `gatedPurchaseAsa`.
- Plugin route: `arc58/plugins/marketplace/marketplace.e2e.spec.ts`, same assertions.

**Size:** S for the fix, M including the legacy guard and inventory script.

---

## MKT-02 (High): the plugin purchase has no price bound (front-run by `changePrice`)

**Change: `arc58/plugins/marketplace/contract.algo.ts` → `purchase`**

```ts
purchase(
  wallet: Application,
  rekeyBack: boolean,
  appId: Application,
  marketplace: Account,
  maxPrice: uint64,            // NEW
  args: GateArgs
): void {
  ...
  const price = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyPrice))[0]
  loggedAssert(price <= maxPrice, errPriceAboveMax)   // new code in arc58/plugins/marketplace/errors.ts
  ...
}
```

Defence in depth in the Listing (optional; see the design decision below):

```ts
// listing.algo.ts
lastPriceRound = GlobalState<uint64>({ key: ListingGlobalStateKeyPriceRound })   // 'price_round'
// create(): this.lastPriceRound.value = Global.round
// changePrice(): this.lastPriceRound.value = Global.round
// purchase()/purchaseAsa(): loggedAssert(Global.round > this.lastPriceRound.value + PriceChangeCooldownRounds, errPriceJustChanged)
```

**ABI**
- The plugin `purchase` selector changes from `purchase(uint64,bool,uint64,address,byte[][])void` to `purchase(uint64,bool,uint64,address,uint64,byte[][])void`.
- Wallets that installed the plugin with method restrictions key them by selector (`arc58/account/types.ts:104`), so the restriction list must be re-issued.
- **SDK:** `akita-sdk/wallet/plugins/marketplace.ts:23,114-146`. The `PurchaseArgs` type comes from the regenerated client. Callers (UIs, agents) must pass `maxPrice`. The SDK should default it to the price the user was shown, never to the on-chain value.

**Deployment**
- The plugin cannot be upgraded. Deploy a new MarketplacePlugin app and update the DAO `PluginAppList` / registry entry for the marketplace plugin.
- Have the SDK migrate wallets: `addPlugin(new)` + `removePlugin(old)`.
- The old plugin stays callable by wallets that still have it installed, so they stay exposed until they migrate. The Listing cooldown is the only control that also protects them, and only for listings created after the upgrade.

**Regression tests (`arc58/plugins/marketplace/marketplace.e2e.spec.ts`)**
- The seller calls `changePrice(10×)`, then the buyer calls plugin `purchase` with `maxPrice` = old price. Assert it reverts with `errPriceAboveMax` and the wallet balance is unchanged.
- The happy path with `maxPrice === price` succeeds.
- If the cooldown is adopted: `changePrice` then `purchase` in the same round reverts with `errPriceJustChanged`.

**Size:** M (plugin ABI, redeploy, SDK, wallet migration).

> **Decision for Kyle (MKT-02):**
> - (a) `maxPrice` argument in the plugin only.
> - (b) Price-change cooldown in the Listing only.
> - (c) Both.
>
> **Recommendation: (c).** `maxPrice` is the only complete defence: the buyer states the most they will pay. The cooldown (a few rounds, e.g. 3) also protects buyers still on the old plugin, and wallets with method restrictions until they migrate, against same-block sandwiches on new listings. With (b) alone, a seller can still reprice minutes before a slow or automated buyer.

---

## MKT-04 (High, latent): the paid asset is not validated in purchaseAsa, and grouped transactions are not bound (includes I-3)

**Change: `marketplace/listing.algo.ts` → `purchaseAsa`**

```ts
loggedAssert(assetXfer.xferAsset.id === this.paymentAsset.value.id, errInvalidTransfer)
loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
loggedAssert(assetXfer.assetAmount === this.price.value, errInvalidTransfer)
```

**Change: `marketplace/marketplace.algo.ts` → `purchaseAsa` / `gatedPurchaseAsa`.** Putting the checks in the factory as well protects legacy children, which never had them.

```ts
const [paymentAssetId] = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyPaymentAsset))
loggedAssert(assetXfer.xferAsset.id === paymentAssetId, errInvalidTransfer)
loggedAssert(assetXfer.sender === Txn.sender, errInvalidTransfer)
loggedAssert(assetXfer.assetSender === Global.zeroAddress, errInvalidTransfer)   // no clawback source
loggedAssert(assetXfer.assetCloseTo === Global.zeroAddress, errInvalidTransfer)
```

**`purchase` / `gatedPurchase`** (I-3):

```ts
loggedAssert(payment.sender === Txn.sender, errInvalidPayment)
loggedAssert(payment.closeRemainderTo === Global.zeroAddress, errInvalidPayment)
```

**`list`** (I-3, plus refusing prize == payment, the same class as AR-11):

```ts
loggedAssert(assetXfer.assetSender === Global.zeroAddress, errInvalidPayment)
loggedAssert(assetXfer.assetCloseTo === Global.zeroAddress, errInvalidPayment)
loggedAssert(paymentAsset !== assetXfer.xferAsset.id, errInvalidPayment)
```

**ABI:** none.

**SDK:** confirm that `akita-sdk/marketplace/index.ts:383-460` builds the payment or transfer from the same `sender` as the app call. It does at `:49-51` (`payment` from `sender`). Plugin inner transactions already use `sender` = spending account = `Txn.sender`.

**Deployment:** ships with the MKT-01 factory upgrade. It must ship together with MKT-05: fixing MKT-05 alone turns this latent bug into a live one.

**Regression tests (`marketplace/marketplace.e2e.spec.ts`)**
- Create an ASA-priced listing (needs MKT-05) of a fungible prize X. The buyer calls `purchaseAsa` paying `price` units of X. Expect `errInvalidTransfer`.
- A buyer pays from a second account (sender ≠ caller): rejected.
- A clawback-sourced transfer: rejected.
- `list` with `paymentAsset === prize`: rejected.

**Size:** S.

---

## MKT-03 (Medium): the factory refunds the recorded deposit, not the MBR actually released

**Change: `utils/base-contracts/factory.ts`.** Add a shared helper so the auction and raffle factories can reuse it (AR-09, AR-13):

```ts
/**
 * Refund the funder only what the child actually returned plus the creator-MBR
 * released by deleting it, capped at the recorded deposit.
 * `balanceBefore` / `minBefore` are read at method entry; `forwarded` is ALGO this
 * method sent into the child (e.g. the buyer's price) during the same call.
 */
protected refundReleased(
  receiver: Account,
  recorded: uint64,
  balanceBefore: uint64,
  minBefore: uint64,
  forwarded: uint64
): void {
  const self = Global.currentApplicationAddress
  const received: uint64 = self.balance + forwarded - balanceBefore
  const released: uint64 = minBefore > self.minBalance ? minBefore - self.minBalance : 0
  let refund: uint64 = received + released
  if (refund > recorded) {
    refund = recorded
  }
  if (refund > 0) {
    itxn.payment({ receiver, amount: refund }).submit()
  }
}
```

The arithmetic is safe. Inner fees are pooled (fee 0), so `self.balance` after the call equals `balanceBefore - forwarded + closeAmount`, which means `received >= 0`.

**`marketplace/marketplace.algo.ts`:** use the helper in `purchase`, `gatedPurchase`, `purchaseAsa`, `gatedPurchaseAsa` and `delist`.

```ts
const balanceBefore: uint64 = Global.currentApplicationAddress.balance
const minBefore: uint64 = Global.currentApplicationAddress.minBalance
const legacy = this.isLegacyListing(appId)
const { account: receiver, amount } = getFunder(appId)
listing.call.purchase({ appId, args: [...], onCompletion: OnCompleteAction.DeleteApplication })
if (legacy) {
  itxn.payment({ receiver, amount }).submit()        // honour old deposit terms (bounded set)
} else {
  this.refundReleased(receiver, amount, balanceBefore, minBefore, payment.amount)   // forwarded = 0 for ASA routes / delist
}
```

Do **not** add `escrowOptInCost` to the refundable amount. Either keep `funder.amount = totalMBR` (the delta logic withholds it automatically) or record `totalMBR - escrowOptInCost`. Recording the smaller amount makes the stored value honest, so prefer it.

**ABI and schema:** none in the contracts.

**SDK:** `akita-sdk/marketplace/index.ts` documentation and cost display. `escrowOptInCost` becomes non-refundable. Disbursement MBR used during settlement is no longer returned to the seller.

**Deployment:** ships with the MKT-01 upgrade. Legacy children keep the full recorded refund. That set is bounded because no new legacy listings can be created after the box is reloaded.

**Regression tests (`marketplace/marketplace.e2e.spec.ts`)**
- **Escrow opt-in:** `listPrizeBox` with a fresh payment ASA, then delist. Assert factory free balance (balance minus minBalance) is the same before and after. Assert the funder got back `totalMBR - escrowOptInCost`.
- **Buyer not opted in:** an ALGO listing of an ASA bought by a buyer not opted into the prize. Assert factory free balance is unchanged, the refund is `totalMBR - 67,000` (−100,000 more if Rewards was not opted in), and the buyer can claim from Rewards.
- **Buyer-side marketplace not opted in, ASA route:** same assertions.

**Size:** M.

> **Decision for Kyle (MKT-03):** who pays settlement-time MBR (inbox/disbursement, Rewards opt-in)?
> - (a) The seller, out of the deposit, using delta refunds.
> - (b) The buyer, through an extra payment when it is not opted in.
> - (c) Remove the disbursement fallback and require the buyer to be opted in, with the plugin auto-opting-in.
>
> **Recommendation: (a)** now, because the deposit is already priced as worst case. Consider (c) later to simplify.
>
> For legacy children, recommend honouring the old full refund (bounded) rather than the delta.

---

## MKT-06 (Medium): the listed quantity is not stored or verified (clawback rug)

**Change: `marketplace/listing.algo.ts`**

```ts
prizeAmount = GlobalState<uint64>({ key: ListingGlobalStateKeyPrizeAmount })   // 'prize_amount'

// create(..., prizeAmount: uint64, ...)   -> new ABI arg (factory-only caller)
this.prizeAmount.value = prizeAmount

// transferPurchaseToBuyer(), ASA branch, before any transfer:
const prizeAsset = Asset(this.prize.value)
loggedAssert(prizeAsset.balance(Global.currentApplicationAddress) === this.prizeAmount.value, errPrizeChanged)
```

**`marketplace/marketplace.algo.ts`:** in `list`, pass `assetXfer.assetAmount` as `prizeAmount`. In `listPrizeBox`, pass 0 (unused).

For prize boxes, see the decision below. If Kyle chooses to reject clawback assets, change `prize-box/contract.algo.ts` → `optin`:

```ts
loggedAssert(Asset(asset).clawback === Global.zeroAddress, errClawbackAsset)   // needs `Asset` import
```

**ABI:** Listing `create` gains a `uint64` argument (only the factory calls it). Listing gains 1 global uint.

**SDK:** `listCost` (handled by MKT-09). `akita-sdk/marketplace/listing.ts` state reader should expose `prizeAmount`.

**Deployment:** ships with the MKT-01 upgrade and box reload. Legacy children stay unprotected; document this in the UI by comparing each listing's holding with what was listed.

**Regression tests (`marketplace/marketplace.e2e.spec.ts`)**
- Create a test ASA with clawback = seller. List it, have the seller claw it back from the listing address, then buy. Expect `errPrizeChanged`, and the buyer's payment reverts.
- If the prize-box rule is adopted: `prize-box/prize-box.e2e.spec.ts`, `optin` of a clawback asset reverts.

**Size:** S for ASA listings. S–M for the prize-box rule.

> **Decision for Kyle (MKT-06, prize boxes):** box contents cannot be verified at purchase time.
> - (a) Reject clawback-enabled ASAs in `PrizeBox.optin`.
> - (b) Allow them, but record a `clawbackCount` in the PrizeBox. UIs warn, and Listing/Auction/Raffle may refuse boxes with `clawbackCount > 0`.
> - (c) Accept the risk and document it.
>
> **Recommendation: (a).** Prize boxes are trade containers. A clawback asset makes the contents unverifiable, and this blocks the same rug in Auction and Raffle prizes. ARC-18/20-style royalty-enforced NFTs can still be sold as single-ASA listings, which (with this fix) verify their balance.

---

## PD-02 (Medium, latent): hooks chosen by the pool creator control the shared DEX account

> **Status (2026-10-03): resolved by the PluginDex v2 rewrite; option (b) chosen, plus guards beyond it.**
> Kyle asked for flash-rekey custody hooks (his ARC-58 technique) and then chose to keep per-pool
> escrows over a shared DEX account, so the recommendation below ((a) non-custodial hooks) and M-6 in
> FIX-PLAN.md are superseded for PluginDex. What v2 does instead:
> - **Per-pool escrows.** Each pool's reserves sit in its own child Escrow app rekeyed to the Vault. The
>   Vault's own account is never rekeyed. A custody hook only ever gets *its* pool's escrow, and only for
>   the duration of its inner call. The AVM forbids re-entry, so it cannot call back into the Vault.
> - **Custody guard.** After every custody call the escrow must be rekeyed back (`errPdrb`). Every balance
>   change is booked against reserves and must be a trade at least as good for LPs as a swap paying the
>   pool's `custodyFeeBps` (`errPdki`); a loss on both sides always fails. Curve pools add a value floor,
>   the curve's own settle check and a price band.
> - **Allowlist and pinning.** Hooks, curves and valuators need admin approval with a permission ceiling.
>   Each pool freezes the approved app *version* and calls it with `rejectVersion`, so an updated hook
>   cannot run on existing pools.
> - **Liveness.** The admin can pause a pool. `emergencyRemoveLiquidity` then exits without running any
>   hook.
> - **MBR.** `createPool` measures the real cost and refunds any overpayment (the "or refund the excess"
>   option). Pools are permanent; there is no deletion path.
>
> Tests: `plugin-dex/core-v2.e2e.spec.ts`, `vault-guard.e2e.spec.ts`, `plugin-dex.e2e.spec.ts` (custody
> theft, keep-rekey, rekey-elsewhere, both-sides-negative, unapproved hook, version-pinned hook, pause and
> emergency exit). Design: `smart_contracts/plugin-dex/ARCHITECTURE.md` and
> `smart_contracts/plugin-dex/research/FINAL-SPEC.md`. The original finding and fix proposal below are kept
> for the record; they describe v1.

The contract is not deployed and is immutable, so fix it before the first deployment.

**Change: `plugin-dex/contract.algo.ts`** (recommended shape):
- **Stop rekeying.** `executeHooks` calls `dexHook` as a plain app call and validates the output; hooks never hold signing authority over the DEX account. Delete `rekeyToPlugin` / `requireRekeyBack`, or keep them behind a separate allowlisted "custodial hook" flag.

  ```ts
  for (let index: uint64 = 0; index < count; index += 1) {
    const hookKey: PoolHookKey = { poolId, hookPoint, index }
    loggedAssert(this.poolHooks(hookKey).exists, errHookNotFound)
    const hook = clone(this.poolHooks(hookKey).value)
    if (hook.enabled) {                                   // I-7: skip instead of revert
      output = abiCall<typeof PluginDexHook.prototype.dexHook>({
        appId: Application(hook.app),
        args: [Global.currentApplicationId, poolId, hookPoint, index, Txn.sender, current, false],
      }).returnValue
      loggedAssert(output.feeBps <= MaxHookFeeBps, errInvalidHookConfig)   // bound every field the DEX will trust
      current = this.inputFromOutput(current, output)
    }
  }
  ```

- **Hook allowlist.** Add `approvedHooks = BoxMap<uint64, boolean>({ keyPrefix: 'a' })`. Add an admin- or DAO-only `setHookApproved(app, approved)`. In `installHook`, assert `this.approvedHooks(plugin.id).exists && this.approvedHooks(plugin.id).value`.
- **Exact MBR.** In `createPool`, use `mbrPayment.amount === requiredMbr` instead of `>=`.
- **Admin rotation (optional).** `setAdmin(newAdmin)` restricted to the admin.

**ABI:** `createPool` is unchanged. New methods are `setHookApproved` and `setAdmin`. `PluginDexHook.dexHook` keeps its signature with `rekeyBack = false`; alternatively drop that argument now, before any hook ships.

**SDK:** regenerate `akita-sdk/generated/PluginDexClient.ts`. There are no hand-written call sites.

**Tests:** new `plugin-dex/plugin-dex.e2e.spec.ts`.
- A malicious hook (a test contract that tries an inner payment from the DEX address) fails because the DEX is no longer rekeyed to it.
- A hook that is not approved cannot be installed.
- Overpaying MBR is rejected.
- A disabled hook is skipped.
- Two pools' hook pipelines stay independent.

**Size:** L, because the design changes.

> **Decision for Kyle (PD-02):**
> - (a) Non-custodial hooks: no rekey, the DEX applies validated outputs.
> - (b) Per-pool escrow (one child app or ARC-58 escrow per pool), with hooks rekeying only that escrow.
> - (c) Keep the shared-account rekey and rely only on a hook allowlist.
>
> **Recommendation: (a) + allowlist now.** Move to (b) only if a hook must custody funds, such as CLAMM position management. (c) alone still lets one approved but buggy hook drain every pool.
>
> **Decided (Kyle, 2026-10-02): (b)** with the allowlist, version pinning and the custody guard described in the status note above.

---

## MKT-05 (Low): ASA-priced `list` always reverts (2× opt-in payment)

**Change: `marketplace/marketplace.algo.ts` → `list`, payment-asset opt-in (`:158-167`)**

```ts
listing.call.optin({
  appId: listingApp,
  args: [
    itxn.payment({ receiver: listingApp.address, amount: Global.assetOptInMinBalance }),  // was optinMBR (2×)
    paymentAsset,
  ],
})
```

The charge remains `optinMBR = 2 × assetOptInMinBalance` (prize opt-in + payment opt-in). Forwarded MBR now equals what was charged.

**Plugin:** `arc58/plugins/marketplace/contract.algo.ts:99` stays at 2× (it matches the charge), or goes away entirely with MKT-09.

**ABI:** none.

**Deployment:** ships with the MKT-01 upgrade. **It must ship together with MKT-04.**

**Tests (`marketplace/marketplace.e2e.spec.ts`):** "should create, buy and delist an ASA-priced ASA listing". Assert the child is opted into both assets, the split goes to the payment asset, and factory free balance is unchanged after purchase and after delist.

**Size:** S.

---

## MKT-07 (Low): `changePrice` has no bounds

**Change: `marketplace/listing.algo.ts` → `changePrice`**

```ts
changePrice(price: uint64): void {
  loggedAssert(Txn.sender === this.seller.value, errMustBeSeller)
  loggedAssert(price >= 4, errPriceTooLow)          // import errPriceTooLow from './errors'
  this.price.value = price
  this.lastPriceRound.value = Global.round          // if MKT-02 cooldown adopted
}
```

If free giveaways are wanted, allow `price === 0 || price >= 4`. With price 0, `getAmounts(0)` returns all zeros, which is safe.

**ABI:** none. **Deployment:** box reload only; legacy children keep the old behaviour (harm limited to the seller).

**Tests (`marketplace/marketplace.e2e.spec.ts`):** `changePrice(3)` reverts with `errPriceTooLow`. `changePrice(4)` followed by a purchase succeeds.

**Size:** S.

---

## MKT-08 (Low): royalty bypass when no proof is supplied

**Change: `utils/functions.ts` → `royalties`.** This depends on the decision below. A sketch for option (a):

```ts
if (!(proof.length > 0)) {
  // creator-level default published under a canonical root name
  const info = abiCall<typeof Meta.prototype.recordInfo>({ appId: getAkitaAppList(akitaDAO).metaMerkles,
    args: [asset.creator, /* dataKey for (CreatorRoyaltyRootName, 'royalty') */] }).returnValue
  ...use it when info says it exists, else CreatorRoyaltyDefault
}
```

The exact `recordInfo` key encoding must be taken from `meta/contract.algo.ts` (`dataKey`, `recordKey`) before writing this. `Meta.read` asserts that the record exists (`meta/contract.algo.ts:330-335`), so it cannot be used as a soft lookup.

**ABI:** none in the Marketplace.

**Tests:** `marketplace/marketplace.e2e.spec.ts`. The creator publishes a 10% default. A seller lists with an empty proof. Expect `creatorRoyalty === 10_000`.

**Size:** M.

> **Decision for Kyle (MKT-08):**
> - (a) A canonical per-creator royalty root, used when no proof is supplied.
> - (b) Require a proof whenever the creator has any royalty root, and fail closed.
> - (c) Accept the behaviour as advisory, as royalties on Algorand already are (off-market transfers bypass them).
>
> **Recommendation: (c) now**, documenting that the default is a floor. Do (a) later if creators ask for enforcement. This only affects royalty income; no user funds are at risk.

---

## MKT-09 (Low): the plugin computes escrow opt-in cost against the factory address

**Change: `marketplace/marketplace.algo.ts`.** Factor the cost into a private helper and expose a readonly quote. Both `list` and `listPrizeBox` assert `payment.amount === this.listingCost(...)`.

```ts
private listingCost(prize: uint64, paymentAsset: uint64, isPrizeBox: boolean): uint64 { /* body moved from list/listPrizeBox */ }

@abimethod({ readonly: true })
listCost(prize: uint64, paymentAsset: uint64, isPrizeBox: boolean): uint64 {
  return this.listingCost(prize, paymentAsset, isPrizeBox)
}
```

**Change: `arc58/plugins/marketplace/contract.algo.ts` → `list` / `listPrizeBox`.** Delete the duplicated arithmetic (`:98-120`, `:197-219`). After any `optIn` calls:

```ts
const cost = abiCall<typeof Marketplace.prototype.listCost>({
  sender, appId: this.factory.value, args: [asset, paymentAsset, false]
}).returnValue
```

This follows the existing `optInCost` pattern at `:57-61`.

**ABI:** the Marketplace gains `listCost(uint64,uint64,bool)uint64`. The plugin ABI is unchanged.

**SDK:** replace the hard-coded `akita-sdk/marketplace/index.ts:332-360` `listCost` with a simulate call to the readonly method. This removes the 9-uint constant that MKT-01/02/06 invalidate.

**Deployment:** factory upgrade plus the new plugin app (bundled with the MKT-02 redeploy).

**Tests (`arc58/plugins/marketplace/marketplace.e2e.spec.ts`):**
- Escrow not opted in but factory already opted in: plugin `list` succeeds.
- SDK `listCost` equals the on-chain quote for ALGO/ASA × ASA/prize-box combinations.

**Size:** M.

---

## PB-01 (Low): duplicate PrizeBox opt-in inflates `optinCount`

**Change: `prize-box/contract.algo.ts` → `optin`**

```ts
loggedAssert(!Global.currentApplicationAddress.isOptedIn(Asset(asset)), errAlreadyOptedIn)  // new 'errAopt' in prize-box/errors.ts; import Asset
```

**ABI:** none.

**Deployment:** PrizeBoxFactory `UpgradeApp`. New boxes use the new code; existing live boxes keep the old code. A box with an inflated count can never be deleted, which strands about 0.1 ALGO per box. Write this off; it is not worth a migration.

**Tests (`prize-box/prize-box.e2e.spec.ts`):** opting into the same asset twice reverts and `optinCount` stays 1. Withdraw everything, then delete, succeeds.

**Size:** S.

---

## PB-02 (Low): PrizeBox funder accounting

**Change: `prize-box/contract.algo.ts`**

```ts
export class PrizeBox extends classes(Contract, ChildContract) ... // or just add the field:
funder = GlobalState<FunderInfo>({ key: GlobalStateKeyFunder })

@abimethod({ onCreate: 'require' })
create(owner: Account, funder: FunderInfo): void {
  this.owner.value = owner
  this.optinCount.value = 0
  this.funder.value = clone(funder)
}

@abimethod({ allowActions: 'DeleteApplication' })
deleteApplication(caller: Account): void {
  loggedAssert(Txn.sender === Global.creatorAddress, errNotOwner)   // factory-routed
  loggedAssert(caller === this.owner.value, errNotOwner)
  loggedAssert(this.optinCount.value === 0, errNotEmpty)
  itxn.payment({ closeRemainderTo: this.owner.value }).submit()     // account balance (min + any ALGO) -> owner
}
```

The simpler form avoids polytype: add the `funder` GlobalState directly, which is what `ChildContract` does in `utils/base-contracts/child.ts`.

**Change: `prize-box/factory.algo.ts`**

```ts
mint(payment: gtxn.PaymentTxn, owner: Account): uint64 {
  ... // existing amount check
  const appMbr: uint64 = MIN_PROGRAM_PAGES + GLOBAL_STATE_KEY_UINT_COST * prizeBox.globalUints + GLOBAL_STATE_KEY_BYTES_COST * prizeBox.globalBytes
  prizeBox.call.create({ args: [owner, { account: payment.sender, amount: appMbr }] })
  ...
}

deletePrizeBox(appId: Application): void {
  loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAPrizeBox)
  const { account: receiver, amount } = getFunder(appId)
  const balanceBefore: uint64 = Global.currentApplicationAddress.balance
  const minBefore: uint64 = Global.currentApplicationAddress.minBalance
  abiCall<typeof PrizeBox.prototype.deleteApplication>({
    appId, args: [Txn.sender], onCompletion: OnCompleteAction.DeleteApplication
  })
  this.refundReleased(receiver, amount, balanceBefore, minBefore, 0)   // MKT-03 helper
}
```

The opt-in MBR follows the box owner, as it does today and as the design decision below recommends.

**ABI and schema:**
- `PrizeBox.create(address,(address,uint64))`.
- `PrizeBox.deleteApplication(address)` becomes creator-only.
- PrizeBox gains 1 global bytes, so the mint cost goes from 278,500 to 328,500 µALGO.
- PrizeBoxFactory gains `deletePrizeBox(uint64)void`.

**SDK:**
- `akita-sdk/prize-box/index.ts:116`: `deleteApplication` → `factory.deletePrizeBox`.
- `akita-sdk/prize-box/index.ts:190-197`: `cost()` hard-codes 178,500; update it or read it from the contract.

Auction, Raffle and Marketplace only call `PrizeBox.transfer`, which is unchanged.

**Deployment:** PrizeBoxFactory `UpgradeApp`. Old live boxes have no `funder` state and keep the old owner-callable `deleteApplication()`, so they are unaffected. `deletePrizeBox` on an old box fails in `getFunder`, which is correct; the SDK should fall back to the old direct delete for those boxes.

**Tests (`prize-box/prize-box.e2e.spec.ts`):**
- Mint funded by A for owner B. Transfer to C, withdraw, then delete via the factory. Assert A gets the app MBR back and C gets the account balance.
- PrizeBoxFactory free balance is unchanged.
- A direct `deleteApplication` from the owner reverts.

**Size:** M.

> **Decision for Kyle (PB-02):** who gets the opt-in MBR when a box is sold?
> - (a) Whoever owns the box at deletion (it is part of the box's value).
> - (b) The original opt-in payer, tracked with a per-asset funder box.
>
> **Recommendation: (a).** It matches the "sold as one unit" model and avoids per-asset boxes. Only the app-creation MBR goes back to the minter.

---

## PD-01 (Low): wrong auth-address check makes PluginDex hooks unrunnable

> **Status (2026-10-03): moot in PluginDex v2.** The Vault's own account is never rekeyed, so there is no
> self-auth check to get wrong. Custody hooks receive a per-pool escrow that is rekeyed *to the Vault*,
> so the check is `escrow.authAddress === Global.currentApplicationAddress`, which is correct for a
> rekeyed account. Covered by the custody tests in `plugin-dex/plugin-dex.e2e.spec.ts` and
> `core-v2.e2e.spec.ts` (well-behaved hook, keep-rekey, rekey-elsewhere). The text below describes v1.

**Change: `plugin-dex/contract.algo.ts:124-138`.** This only applies if the rekey model is kept (PD-02 option b or c).

```ts
loggedAssert(Global.currentApplicationAddress.authAddress === Global.zeroAddress, errAuthAddrMismatch)  // before rekey
loggedAssert(Global.currentApplicationAddress.authAddress === Global.zeroAddress, errMissingRekeyBack)  // after hook
```

The reason: an account that is not rekeyed, or is rekeyed back to itself, reports the zero address. `arc58/account/contract.algo.ts:727-732` handles the same case. Under PD-02 option (a) the rekey code is deleted and this finding goes away.

**Must not ship without PD-02.** It is currently the only thing preventing the hook-custody problem.

**Tests:** in the new `plugin-dex/plugin-dex.e2e.spec.ts`, run `adminRunHook` with one well-behaved hook and assert it succeeds.

**Size:** S.

---

## Informational

| ID | Proposal | Size |
| --- | --- | --- |
| **I-1** Referral never paid from Listing | **Fix (needs decision).** Add `sendReferralPaymentFor(akitaDAO, account, asset, amount)` in `utils/functions.ts`, which resolves `getWalletIDUsingAkitaDAO(akitaDAO, account)` instead of `Txn.sender`. Call it from `listing.algo.ts:129,192` with `this.seller.value`; the fee rate is already seller-impact based. Leave the existing helper as is for other callers. **Kyle:** should the seller's referrer or the buyer's referrer earn it? Recommend seller. | S |
| **I-2** The fallback for a seller not opted in can never close | **Fix.** In `completeAsaPayments`, take the seller fallback with `closeOut = true` and amount `this.paymentAsset.value.balance(Global.currentApplicationAddress)` (the remaining balance), so the Listing opts out and `closeRemainderTo` succeeds. Test: an ASA listing whose seller is not opted into the payment asset settles and the seller claims from Rewards. | S |
| **I-3** Grouped transactions not bound to the caller | **Fix.** Folded into MKT-04. | S |
| **I-4** `listPrizeBox` does not bind the transfer's sender | **Fix.** Add `loggedAssert(prizeBoxTransferTxn.sender === Txn.sender, errNotPrizeBoxOwner)`. The plugin already sends both from the spending account. | S |
| **I-5** Deployer can reload child bytecode after the box is deleted | **Won't fix in the contract.** `factory.ts` is shared by every factory, and initial deployment needs the creator path. Handle it operationally: the DAO should never delete `bc` on a live factory, and the deployer-sunset runbook should rekey or retire the creator key. | — |
| **I-6** Delegated callers can reprice or list without allowance limits | **Won't fix in the contract.** This is a wallet policy question. Document it in the SDK and in the agent-install UX: do not grant `list`, `listPrizeBox`, `changePrice` or `delist` selectors to agents or execution keys. | — |
| **I-7** A disabled hook reverts the whole hook point | **Fix.** Folded into PD-02 (skip disabled hooks). | S |

---

## Cross-cutting dependencies

1. **MKT-04 and MKT-05 must ship together.** Fixing the opt-in payment without the asset check turns MKT-04 into a live theft path.
2. **MKT-03's `refundReleased` helper** lives in `utils/base-contracts/factory.ts` and should be reused by:
   - AR-09 (RaffleFactory full-payment refund);
   - AR-13 (AuctionFactory disbursement MBR);
   - PB-02 (`deletePrizeBox`);
   - `staking-pool/factory.algo.ts:153-167` (same `getFunder` → full-refund pattern; check for the same leak).

   Put it in the base class once and land it before those changes.
3. **MKT-01's legacy handling** relies on MKT-03 (delta for new children, honoured full refund for legacy).
4. **MKT-01, 03, 04, 05, 06 and 07, plus I-2, I-4 and MKT-09's factory half**, are one Marketplace factory `UpgradeApp` plus a Listing bytecode reload. Execute them as **one atomic DAO proposal**, because the Listing `create` ABI changes.
5. **MKT-02 and MKT-09's plugin half** need one new MarketplacePlugin app, a DAO plugin-registry update, and SDK wallet migration (re-issue method restrictions keyed by the new `purchase` selector).
6. **ACC-01** (forged `origin` through EscrowFactory registration) breaks `gatedPurchase` / `gatedPurchaseAsa` (`marketplace.algo.ts:302-307, 374-379`). Gated listings stay bypassable until ACC-01 is fixed in `escrow/factory.algo.ts`. No Marketplace-side change is needed if ACC-01 is fixed at the registry. Until then, gated listings should not be marketed as access-controlled.
7. **PrizeBox (PB-01, PB-02, the MKT-06 clawback rule)** changes what Auction and Raffle receive as prizes, but not the ABI they use (only `transfer`). AR-11 (prize asset equal to bid asset) is fixed in the same way as the MKT-04 `paymentAsset !== prize` assertion.
8. **PD-01 must not ship without PD-02.**
9. **Testing note:** the e2e tests use the SDK `dist`, so rebuild the SDK after regenerating clients. The full suite needs the VibeKit indexer.

## Order of work (suggested)

1. Add `refundReleased` to the base factory (shared with AR-09/AR-13).
2. Marketplace factory and Listing bundle: MKT-01, 04, 05, 03, 06, 07, 09 (factory half), I-2, I-4. Regenerate clients, update SDK `listCost`, run the e2e suite. Then run the indexer inventory of zombies and plan the DAO top-up.
3. New MarketplacePlugin: MKT-02, MKT-09 (plugin half). SDK wallet migration.
4. PrizeBoxFactory upgrade: PB-01, PB-02, and the MKT-06 prize-box rule if chosen.
5. Plugin DEX redesign (PD-02 + PD-01 + I-7) before any deployment.
6. MKT-08 and I-1 after Kyle decides.
