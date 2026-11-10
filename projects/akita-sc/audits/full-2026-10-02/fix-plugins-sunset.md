# Fix proposals: ARC-58 plugins (part) and sunset

These proposals follow from `audit-plugins-sunset.md`. They are read-only: no repo files were edited, nothing was built, and no chain was touched. Paths are relative to `projects/akita-sc/smart_contracts` unless noted.

APIs used below, and where each was checked:
- `TemplateVar`, `Txn.sender`, `Global.creatorAddress`, `loggedAssert`: `sunset/contract.algo.ts:1-18`, `template-var.d.ts`, `util.d.ts:37`.
- `Account.authAddress`, `Account.minBalance`, `isOptedIn`: `reference.d.ts:21,27,88`.
- `BoxMap(...).exists`, `.delete()`, `.create()`: `box.d.ts:17-57`.
- `op.AppGlobal.getExBytes` and `getDAOARC58Wallet`: `utils/functions.ts:38-41`.
- `AkitaBaseContract.getAkitaDAOWallet()`: `utils/base-contracts/upgradeable.ts:18-21`.
- `compileArc4(..., { templateVars })`: `compiled.d.ts:78-92`, `arc4/c2c.d.ts:74`.

**Deployment facts that apply to every plugin finding:**
- Every in-scope plugin extends `Contract`, or `AkitaBaseContract` in RM's case. None of them has an `UpdateApplication` route.
- The wallet also rejects any plugin that has ever been updated: `loggedAssert(txn.appId.version === 0, errInvalidPluginVersion)` at `arc58/account/contract.algo.ts:529`.
- So **every plugin fix means a new app ID plus re-grants**. There are no in-place updates.
- Sunset contracts are not deployed as standalone apps. Their approvals are only pushed as updates at teardown time, so a code change is enough.

---

## F1: Critical. WalletFactorySunsetContract has no authorization. Size: S

**Change** (minimal, as Kyle asked). In `sunset/wallet-factory.algo.ts`:

```ts
import { ..., loggedAssert, TemplateVar, Txn } from '@algorandfoundation/algorand-typescript'
import { errNotAkitaDao } from '../errors'

const sunsetCaller = TemplateVar<Account>('SUNSET_CALLER')

export class WalletFactorySunsetContract extends Contract {
  private auth(): void {
    loggedAssert(
      Txn.sender === Global.creatorAddress || Txn.sender === sunsetCaller,
      errNotAkitaDao
    )
  }

  updateWallet(wallet: Application): void { this.auth(); /* unchanged */ }
  deleteWalletBoxes(...)   { this.auth(); ... }
  closeOutWallet(...)      { this.auth(); ... }
  deleteWalletAssets(...)  { this.auth(); ... }
  deleteWalletEscrows(...) { this.auth(); ... }
  deleteWallet(...)        { this.auth(); ... }
  deleteBoxedContract()    { this.auth(); ... }
  deleteBoxes(...)         { this.auth(); ... }
  closeOut(...)            { this.auth(); ... }
  deleteAssets(...)        { this.auth(); ... }
  @abimethod({ allowActions: ['DeleteApplication'] })
  delete(closeRemainderTo: Account): void { this.auth(); itxn.payment({ closeRemainderTo }).submit() }
}
```

`Global.creatorAddress` here means the original creator of the live factory, because this approval is installed by update. `SUNSET_CALLER` is the operator who actually runs the teardown.

**ABI, schema and box changes:** none. The selectors are unchanged.

**Call sites:** the factory-sunset compile must now provide the template variable, or compilation fails (which is fail-closed and fine):
- `scripts/sunset-cleanup.ts:101`: `walletFactorySunsetFactory.appFactory.compile({ deployTimeParams: { SUNSET_CALLER: algosdk.decodeAddress(ctx.sender).publicKey } })`
- `scripts/execute-deployer-sunset.ts:373`: the same change.
- `tests/fixtures/sunset.ts`: add `deployWalletFactorySunset({ sunsetCaller })`, mirroring `deploySunsetContract`.
- No SDK change. The `WalletFactorySunsetContractClient` is generated only under `smart_contracts/artifacts`.

**Deploy and migration:** none. The approval is only pushed during a sunset run.

**Regression tests:**
- New file `sunset/wallet-factory-sunset.e2e.spec.ts`:
  - A stranger is rejected on each of the 11 methods, using empty batches or dummy args.
  - The creator and `SUNSET_CALLER` are both accepted.
- `sunset/sunset-integration.e2e.spec.ts`:
  - After the factory is updated to the sunset approval, a stranger's `updateWallet(userWallet)`, `deleteWallet(wallet, stranger)` and `closeOutWallet` are all rejected.
  - The wallet and factory balances are unchanged afterwards.
  - The scripted authorized path still completes.

**Decision for Kyle: the residual step-1 exposure, which the minimal fix does not close.** Both scripts first load `SunsetContract` into the live factory's `bc` box, then swap the approval in a separate proposal. In between, the live factory's `updateWallet` (`arc58/account/factory.algo.ts:299-307`) needs no caller when a wallet has `automatic=true`, which is the default (`arc58/account/contract.algo.ts:779`). So anyone can push `SunsetContract` into user wallets. After F1 they cannot steal from them, but the wallets are bricked and only the creator or `SUNSET_CALLER` can move their funds.

Options:
- (a) Accept the risk after an inventory shows that no wallet with `allowed && automatic` holds value under the old factory.
- (b) Put the child load and the approval swap in one atomic execution group, if the chunked `loadBoxedContract` calls fit in 16 transactions.
- (c) Have `WalletFactorySunsetContract.updateWallet` push `compileArc4(SunsetContract, { templateVars: { SUNSET_CALLER: ... } }).approvalProgram` and drop the `bc` box dependency. This one is unverified: forwarding a TemplateVar into a nested compile needs a compile test.

**Recommendation:** (a), with (b) as a fallback if the inventory finds funded wallets.

---

## F2: Medium. RM box and opt-in MBR is funded by RM for any factory wallet. Size: S code, M tests

**Decision for Kyle.** Options:
- **A. DAO-wallet-only configuration.** Only the DAO wallet may create, migrate or edit receive escrows. RM is DAO revenue infrastructure: `base.ts:optAkitaEscrowInAndSend` and the deploy script only ever target the DAO wallet. No ABI change.
- **B. Caller-funded boxes.** Add an `mbrPayment: gtxn.PaymentTxn` argument to `newReceiveEscrow`, `newReceiveEscrowWithRef` and `migrateReceiveEscrow`. Measure `Global.currentApplicationAddress.minBalance` before and after the box writes and require `payment.receiver === Global.currentApplicationAddress && payment.amount >= delta`. Add delete and refund paths that record the funder. This changes the ABI and SDK and is more work.

**Recommendation:** A. Combined with F3's change (no more RM-paid receiver opt-ins), it removes both the lock vector and the drain vector.

**Change for A** in `arc58/plugins/revenue-manager/contract.algo.ts`:

```ts
private requireDaoWallet(wallet: Application): void {
  // AkitaBaseContract.getAkitaDAOWallet() reads the DAO's `wallet` global
  loggedAssert(wallet === this.getAkitaDAOWallet(), errForbidden)
}
```

Call it right after `this.validateWallet(wallet)` in:
- `newReceiveEscrow` (line 243)
- `newReceiveEscrowWithRef` (line 286)
- `migrateReceiveEscrow` (line 331)
- the new `updateSplits` (see F3)

`optIn`, `start`, `process` and `finalize` need no change: they all require an existing `escrows` box, which can then only exist for the DAO wallet.

**ABI, schema and box changes:** none for A.

**SDK:** no signature change. Update the `akita-sdk/src/wallet/plugins/revenue-manager.ts` docs to say the methods are DAO-only.

**Deploy and migration** (revenueManagerPlugin 3642325118 is live and immutable):
1. Before deploying, list the old plugin's `e`-prefix boxes. Confirm that every `wallet` equals the DAO wallet; `migrateReceiveEscrow` would reject any other.
2. Confirm every escrow is in phase Idle with `allocationCounter == 0`. Finalize any open cycle first.
3. Run the existing `scripts/deploy-revenue-manager-plugin.ts` flow. It already:
   - deploys and funds the new app (1 ALGO, line 607);
   - installs a temporary migration grant;
   - calls `migrateReceiveEscrow` for each escrow and verifies the box maps;
   - replaces each DAO grant (AddPlugin new, RemovePlugin old);
   - updates `pal.revenueManager`.
4. Grant constraint: `utils/base-contracts/base.ts:99` hard-codes method offset `[0]` = `optIn` for the Global grant. The new Global grant must keep `optIn` first, and must not include `skipEscrowAllocation` or `updateSplits`.
5. Add the new ID to `akita-sdk/src/networks.ts` (`revenueManagerPlugin` deployments; keep the old one as legacy).
6. Contracts that reach RM through `pal` (`base.ts`) need no redeploy.
7. The old plugin's MBR stays stranded, because there is no delete route. That is acceptable.

**Regression tests:**
- `arc58/plugins/revenue-manager/revenue-manager.e2e.spec.ts`: a non-DAO user wallet with RM installed calls `newReceiveEscrow`, `newReceiveEscrowWithRef` and `migrateReceiveEscrow`. Each is rejected with `errForb`, and RM's app balance and box count are unchanged.
- The existing positive tests currently use a user wallet, so they must move to the universe DAO wallet. Either use the proposal/execution-key path that `arc58/dao/tests/setup/dao.setup.e2e.spec.ts` already uses, or deploy a dedicated RM whose `akitaDAO` reports the test wallet as its `wallet` global.

---

## F3: Medium. One receiver can freeze a disbursement cycle (no abort, broken named-escrow opt-in). Size: M

**Decision for Kyle.** Options:
- **(a) Leave undeliverable shares in the escrow.** Keep the existing cycle logic, but if a receiver is not opted into the ASA, don't transfer and don't auto-opt-in. The share stays in the escrow and rolls into the next cycle. This removes `arc58OptInAndSend` from RM and with it the RM-funded 0.1 ALGO payments (part of F2) and the named-escrow payment-receiver bug. Trade-off: a rolled-over share is re-split by percentage next cycle, so other receivers absorb part of it.
- **(b) Keep auto-opt-in but fix it.** Pay the MBR to the receiver's spending address (the escrow address when `escrow !== ''`) and fund it from the disbursing escrow. That means ALGO must be processed last, because the escrow's spendable ALGO is otherwise zero. This needs a shared-helper change and a variant of `arc58OptInAndSend` with a `sender` parameter.
- **(c) Deliver undeliverable ASA shares through ARC-59** (`arc59OptInAndSend`), with a sender-parameterized variant funded by the escrow.

Under all three, a malicious receiver can still make `splitReceiverAddress` revert: a self-upgraded wallet can garble the `akita_dao` or `factory_app` globals, or revert `arc58_getEscrows`. So the DAO also needs an escape hatch: `skipEscrowAllocation`, plus `updateSplits` to remove a bad receiver.

**Recommendation:** (a) plus both DAO-only escape hatches. Pre-opt-in for receivers stays the DAO's job: `optAkitaEscrowInAndSend` already funds the escrow with `splitOptInCount` MBR.

**Change 1** in `processEscrowAllocation`, replacing lines 477-482:

```ts
const receiverAddress = this.splitReceiverAddress(receiver)
// Undeliverable ASA shares stay in the escrow and roll into the next cycle.
if (asset !== 0 && !receiverAddress.isOptedIn(Asset(asset))) {
  continue
}
```

`remaining -= amount` has already run (line 470), so later splits and the remainder are unaffected. Also drop `arc58OptInAndSend` from the import on line 6.

**Change 2:** a new method that only the DAO execution-key grant can call (it is not in the Global grant's method allowlist):

```ts
/** Marks assets as handled for this cycle without transferring; balances roll over. */
skipEscrowAllocation(wallet: Application, rekeyBack: boolean, ids: uint64[]): void {
  // identical preamble to processEscrowAllocation lines 409-423
  this.validateWallet(wallet)
  const escrow = getEscrow(wallet)
  this.validateEscrowName(escrow)
  const escrowAddress = this.namedEscrowAddress(wallet, escrow)
  const sender = getSpendingAccount(wallet)
  loggedAssert(this.controls(sender), errForbidden)
  loggedAssert(sender === escrowAddress, errControlledAddressMustBeEscrow)
  const key: WalletEscrowKey = { wallet, escrow }
  loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
  const { phase, optinCount, allocationCounter } = this.escrows(key).value
  loggedAssert(phase === EscrowDisbursementPhaseAllocation, errEscrowNotInAllocationPhase)
  loggedAssert(ids.length > 0, errAssetListCannotBeEmpty)
  const totalAssetsToProcess: uint64 = optinCount + 1
  loggedAssert(allocationCounter + ids.length <= totalAssetsToProcess, errTooManyAssets)

  for (let i: uint64 = 0; i < ids.length; i += 1) {
    const asset = ids[i]
    loggedAssert(!this.receiveAssets({ escrow: escrowAddress, asset }).exists, errAssetAlreadyAllocated)
    if (asset !== 0) {
      loggedAssert(this.managedAssets({ wallet, escrow, asset }).exists, errAssetNotRegistered)
    }
    this.receiveAssets({ escrow: escrowAddress, asset }).create()
  }

  this.escrows(key).value.allocationCounter += ids.length
  if ((allocationCounter + ids.length) === totalAssetsToProcess) {
    this.escrows(key).value.phase = EscrowDisbursementPhaseFinalization
  }
  rekeyBackIfNecessary(rekeyBack, wallet)
}
```

This deliberately skips the holding check, so it also unsticks an asset the escrow is no longer opted into. If the Global grant were misconfigured to include it, the worst case is one cycle's distribution being deferred.

**Change 3:** `updateSplits`, DAO-only and Idle-only:

```ts
updateSplits(wallet: Application, rekeyBack: boolean, escrow: string, splits: Split[]): void {
  this.validateWallet(wallet)
  this.requireDaoWallet(wallet)                       // from F2
  const sender = getSpendingAccount(wallet)
  loggedAssert(this.controls(sender), errForbidden)
  const key: WalletEscrowKey = { wallet, escrow }
  loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
  loggedAssert(this.escrows(key).value.phase === EscrowDisbursementPhaseIdle, errEscrowNotIdle)
  loggedAssert(splits.length > 0, errSplitsCannotBeEmpty)
  loggedAssert(splits.length <= 10, errSplitsCannotBeMoreThan10)
  this.validateSplits(splits)
  if (this.splitRefs(key).exists) this.splitRefs(key).delete()
  if (this.splits(key).exists) this.splits(key).delete()   // delete-then-write avoids resize semantics
  this.splits(key).value = clone(splits)
  rekeyBackIfNecessary(rekeyBack, wallet)
}
```

**ABI changes:** two new methods. No state-schema or box-layout change.

**SDK** (`akita-sdk/src/wallet/plugins/revenue-manager.ts`):
- Add `skipEscrowAllocation()` and `updateSplits()` hooks, following the `processEscrowAllocation` and `finalizeEscrowDisbursement` pattern (lines 277-340), plus their argument types.
- `plugin-sdk-hooks.e2e.spec.ts` checks that every wallet-first ABI method has an SDK hook, so it fails until these hooks exist.
- Regenerate `RevenueManagerPluginClient`.

**Deploy:** ships together with F2 in the same new RM app and migration.

**Regression tests** (`revenue-manager.e2e.spec.ts`):
1. An ASA split to a receiver (origin) that is not opted in. Processing succeeds, the opted-in receivers are paid, the unpaid share stays in the escrow, the phase reaches Finalization, and RM's app balance is unchanged (no opt-in payment).
2. The same, with a named-escrow receiver.
3. A stuck asset (the escrow opted out of a managed ASA). `processEscrowAllocation` reverts, `skipEscrowAllocation` via the DAO grant advances to Finalization, and finalize returns the escrow to Idle.
4. A Global-grant caller calling `skipEscrowAllocation` or `updateSplits` is rejected by the wallet's method restriction.
5. `updateSplits`:
   - is rejected outside Idle;
   - replaces the splits;
   - deletes an existing splitRef;
   - re-runs `validateSplits`, so a bad receiver is rejected.

**Cross-family:** none under (a). `arc58OptInAndSend` stays as it is for HyperSwap, which always passes `escrow=''`, so the origin-vs-escrow bug does not affect it. Under (b), the shared helper changes, and HyperSwap (upgradeable) would pick that up on its next upgrade.

---

## F4: Medium. NFD `autoRenew` can renew NFDs the wallet does not own. Size: M (mostly test mocks)

**Change** in `arc58/plugins/nfd/contract.algo.ts`.

`nfd/constants.ts`:
```ts
export const NFDGlobalStateKeyOwner = 'i.owner.a'   // VERIFY against a live mainnet NFD's global state before shipping
```

`nfd/errors.ts`:
```ts
export const errNotNfdOwner = 'errNnow'
```

In `autoRenew`, after `isNFD` (line 433):
```ts
const [ownerBytes, ownerExists] = op.AppGlobal.getExBytes(appId.id, Bytes(NFDGlobalStateKeyOwner))
loggedAssert(ownerExists && Account(ownerBytes) === sender, errNotNfdOwner)
```

Leave `renew` unrestricted, because it is owner-invoked and gift renewals are a legitimate use. Optional: add the same owner check to `renew` if Kyle doesn't want delegated gifting.

**Decision for Kyle (small):**
- Confirm the owner global key name by reading a live NFD's global state with algod, before writing code. If NFD stores ownership differently, use the registry's ownership lookup instead.
- Decide whether `renew` should also be owner-only.

**ABI and schema:** none. There is a new error code; add it to the SDK translator (`akita-sdk/src/wallet/errors.ts` or the NFD domain map).

**Deploy:**
- The NFD plugin is immutable, so deploy a new app with `create(registry)`.
- Re-grant on the DAO wallet and its escrows by copying the old grants, in the same way as `scripts/install-dao-account-nfd-plugin.ts`, then remove the old grants.
- Add the new ID to `akita-sdk/src/networks.ts` under `nfdPlugin`, with the old ID kept as legacy so `getPluginUpdate` can prompt users to reinstall.
- User wallets that installed the old NFD plugin keep the old behavior until they reinstall.

**Regression tests:**
- No NFD mock exists today (`mocks/nfd/` is empty), so add:
  - `mocks/nfd/registry.algo.ts`, with `isValidNfdAppId(name, appId)`;
  - `mocks/nfd/nfd.algo.ts`, with globals `i.name`, `i.owner.a`, `i.expirationTime`, plus `getRenewPrice()` and `renew(pay)`.
- In `arc58/plugins/nfd/nfd.e2e.spec.ts`:
  - Install the plugin Global with methods `[autoRenew]`.
  - A stranger calling `autoRenew` on a third-party NFD that expires in 10 days is rejected with `errNnow`, and the wallet balance is unchanged.
  - `autoRenew` on the wallet's own NFD succeeds, and the balance drops by exactly the renew price.
  - An NFD outside the 30-day window is rejected with `errNarn`.

---

## F5: Low. Spoofed `wallet` lets anyone spend a plugin app's own funds. Size: S code; rollout piggybacks on other redeploys

**Change:** add a controlled-account getter to both libraries. Do not change `getSpendingAccount` itself yet.

`utils/functions.ts`, next to `controls()` on line 34:
```ts
import { errPluginNotAuthAddr } from '../errors'   // existing code 'errNath' (errors.ts:53)

export function getControlledSpendingAccount(wallet: Application): Account {
  const sender = getSpendingAccount(wallet)
  loggedAssert(sender.authAddress === Global.currentApplicationAddress, errPluginNotAuthAddr)
  return sender
}
```
`loggedAssert` must be added to the line-1 import from `@algorandfoundation/algorand-typescript`. An app account that has never been rekeyed has `authAddress == zeroAddress`, so the spoof fails.

`projects/akita-plugin/functions.ts`: add the same helper, with a literal code (`'errNath'`) because the package has no errors module. Export it from `index.ts`, mention it in the `base.algo.ts` docs, and bump the `@akta/plugin` version.

**Should `getSpendingAccount` enforce the check itself?**
- **Not now.** There are 186 call sites across about 30 plugins (social, guild, subscriptions, update-akita-dao, …). Some may read the spending address for identity or gating outside control. And because plugins are immutable, a library-default change would silently change the behavior of every future redeploy.
- **Recommendation:**
  1. Ship `getControlledSpendingAccount` now.
  2. Adopt it in the in-scope plugins as they get redeployed.
  3. Open a follow-up to audit the other plugin families.
  4. Then flip `getSpendingAccount` to enforce the check, and add `readSpendingAccount` for read-only uses.

**Per-plugin adoption and rollout:**

| Plugin | Adopt? | Notes |
| --- | --- | --- |
| nfd | Yes | Redeploys anyway for F4 |
| haystack-router | Yes, at its next redeploy | |
| pay | Yes, at its next redeploy | |
| asa-manager | Yes, at its next redeploy | |
| asset-inbox | Yes, at its next redeploy | |
| self-optin | Yes, at its next redeploy | |
| sunset plugin | Yes, at its next redeploy | |
| optin | **Won't fix** | `pal.optin` is what `arc58OptInAndSend` uses for every user's Global grant, so changing the ID breaks HyperSwap/RM delivery to wallets that granted the old ID. The spoof needs the attacker to pay the MBR to the plugin's own address, so there is no loss. |
| pay-silo | **Won't fix** | The recipient is fixed, so spoofed calls only pay the plugin's own funds to the intended recipient. Existing silos would need to be re-minted. |
| test plugins | n/a | See F8 |

**Before redeploying anything just for F5:** check the ALGO and ASA balance of each mainnet plugin app account. If they hold only MBR, the impact is about zero and F5 should just ride along with the next functional redeploy.

**ABI and schema:** none.

**Regression test** (`arc58/plugins/wallet-plugins.e2e.spec.ts`):
- Add `mocks/fake-wallet/contract.algo.ts`, whose `create(spending: Account)` writes the global `spending_address` (key from `ARC58_SPENDING_ADDRESS_KEY`).
- Fund the Pay plugin app with 1 ALGO.
- Call `pay(fakeWallet, false, [{receiver: stranger, asset: 0, amount: 500_000}])` directly. It is rejected with `errNath`, and the plugin's balance is unchanged.
- The normal wallet path still works.

---

## F6: Low. `SunsetContract.deleteBoxes` is unauthenticated. Size: S

**Change** in `sunset/contract.algo.ts:26`:
```ts
deleteBoxes(boxes: bytes[]): void {
  this.auth()
  for (let i: uint64 = 0; i < boxes.length; i++) { op.Box.delete(boxes[i]) }
}
```
The `WalletFactorySunsetContract.deleteBoxes` copy is covered by F1.

**Callers are still authorized:**
- `WalletFactorySunsetContract.deleteWalletBoxes` calls in as the factory, which is the wallet's creator.
- The scripts call in as the deployer or `SUNSET_CALLER`.
- `SunsetPlugin.deleteBoxes` calls in as the DAO wallet's spending account, which works only where that account created the target app. Verify this against the targets in `arc58/plugins/sunset/sunset-plugin.e2e.spec.ts`.

**ABI, schema and deploy:** none.

**Tests** (`sunset/sunset.e2e.spec.ts:140-150`):
- Change "accepts an empty batch without error" (currently sent by a stranger) to expect rejection.
- Add authorized empty and non-empty batch cases.
- Keep the sunset-plugin deleteBoxes test passing.

---

## F7: Info. No on-chain rejection of empty batches. Size: S; bundle with other redeploys or fix the document

**Change** (only when the plugin is redeployed anyway):
- `pay.pay`, `self-optin.optIn` and `optOut`, `asa-manager.mint` and `delete`: add `loggedAssert(<array>.length > 0, errEmptyBatch)`.
- Add `errEmptyBatch` to `smart_contracts/errors.ts` and to `akita-sdk/src/errors.ts`.
- **Won't fix** for `optin` (pal pinning, as in F5) and `pay-silo` (would need re-minting).

This is not exploitable, because `arc58_verifyAuthAddress` reverts the group. **Today, correct `CONTRACT_AUDIT.md`** instead of redeploying for this alone.

**Tests:** in the matching plugin specs, an empty batch is rejected.

---

## F8: Info. Test-only plugins ship as SDK clients. Won't fix on-chain; optional S cleanup

These plugins are never deployed by any script. The optional cleanup:
- Move `arc58/plugins/test-close-out` and `test-proxy-rekey` under `smart_contracts/mocks/plugins/`, so `build:arc58plugins` stops emitting them into the plugin artifact set and `akita-sdk/src/generated`.
- Update the imports in `tests/fixtures/plugins/test-{close-out,proxy-rekey}.ts`.

---

## F9: Info. Haystack plugin has no economic bound. Won't fix

There is no on-chain price oracle, so the minimum output can't be bounded meaningfully on-chain. Document in the Haystack SDK and plugin docs that a non-owner grant gives spend authority over the input amount and must be paired with an allowance. Revisit if Haystack ever exposes a signed quote the plugin could verify.

---

## Design decisions for Kyle

1. **F2:** DAO-wallet-only RM configuration (**recommended**) or caller-funded boxes.
2. **F3:**
   - Behavior for undeliverable shares: roll over in the escrow (**recommended**), fund opt-ins from the escrow, or deliver through ARC-59.
   - Add the DAO-only `skipEscrowAllocation` and `updateSplits` (**recommended: yes**).
3. **F1 residual:** accept after an inventory (**recommended**), or make the child load and approval swap atomic, or embed via `compileArc4` templateVars.
4. **F4:**
   - Confirm the NFD owner global key.
   - Decide whether `renew` is also owner-only (**recommended: no**).
5. **F5:** keep `getSpendingAccount` permissive for now and add `getControlledSpendingAccount` (**recommended**), or flip the default after a cross-family audit.

## Dependencies and ordering

- **F2 and F3** ship in one new RM app and one migration. F3's `updateSplits` uses F2's `requireDaoWallet`. Finalize all open cycles before migrating.
- The Global-grant method list must keep `optIn` at index 0 (`base.ts:99`).
- **F4 and F5:** do NFD's F5 adoption inside the F4 redeploy.
- **F5 and F7:** both are library or per-plugin hygiene. Batch them into each plugin's next functional redeploy, and never redeploy `optin` because `pal.optin` is used for cross-wallet opt-ins.
- **F5 cross-family:** the new helper lives in `utils/functions.ts`, which every in-repo plugin and HyperSwap share, and in `projects/akita-plugin`, which third parties consume. Adding the helper changes no existing bytecode.
- **F1 and F6** are independent of the plugin redeploys. Both need `SUNSET_CALLER` passed in the two sunset scripts and the test fixture.
- The F3 recommendation avoids touching `arc58OptInAndSend`, so there is no HyperSwap coupling. Option (b) would create that coupling.
