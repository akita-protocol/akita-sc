# Fix proposals: ARC-58 account core and shared trust boundaries (ACC-01 … ACC-10)

This document is read-only design work: nothing was edited, built or deployed. Every finding below is treated as an open bug.

**API references checked:**
- `node_modules/@algorandfoundation/algorand-typescript/op.d.ts`
  - `AppParams.appCreator` returns `readonly [Account, boolean]` (line 357)
  - `ed25519verifyBare` (706), `getByte` (763), `sha512_256` (2346), `itob` (1598)
  - `Global.callerApplicationId` (1196)
- `state.d.ts`: `GlobalState.hasValue` (19)
- `reference.d.ts`: `Account.balance` (15), `Application.creator` (234) and `.version` (242)
- Patterns already used in the repo:
  - `wallet.creator === Application(factory).address` (`gates/sub-gates/akita-referrer/contract.algo.ts:47`)
  - `op.AppGlobal.getExUint64`, `loggedAssert`, `match`, `BoxMap.delete`

**Live mainnet apps** (from `reports/mainnet-app-versions-2026-09-11.md`):

| App | App ID | Update counter | Notes |
|---|---|---|---|
| DAO wallet | 3569559153 | 4 | |
| walletFactory | 3569556257 | 2 | DAO-upgradeable `FactoryContract`; holds the boxed wallet bytecode pushed to user wallets |
| escrowFactory | 3569555755 | 0 | No update route, so immutable |
| walletMbr | 3642282698 | 0 | Immutable |
| subscriptions | 3569556497 | 1 | |
| marketplace | 3569557584 | 1 | |
| social | 3569557130 | 1 | |
| auctionFactory | 3569557408 | 1 | |
| raffleFactory | 3569557743 | 1 | |
| stakingPoolFactory | 3569556570 | 1 | |
| hyperSwap | 3569558555 | 0 | Upgradeable through `UpgradeableAkitaBaseContract` |
| Plugins | various | 0 | Must remain 0: the wallet rejects updated plugins (`txn.appId.version === 0`). A plugin fix means a new app ID plus reinstalling grants. |

---

## 0. Cross-cutting constraint: program-size budget (read first)

| Program | Current approval size | Max (4 pages) | Headroom |
|---|---|---|---|
| `AbstractedAccount` (wallet) | 7 868 B | 8 192 B | **324 B** |
| `StakingPool` (child) | 8 085 B | 8 192 B | **107 B** |
| `Subscriptions` | 8 045 B | 8 192 B | **147 B** |
| `AkitaSocial` | 7 948 B | 8 192 B | 244 B |
| `Auction` (child) | 7 184 B | 8 192 B | ~1 000 B |
| `Raffle` (child) | 6 499 B | 8 192 B | ~1 700 B |

Sizes are measured from the current artifacts, which are newer than the source.

**Implications:**
- All wallet fixes (ACC-02/03/04/05/06, plus optional ACC-10 items) must fit together in about 324 B. Rough estimates:
  - ACC-02: ~35 B
  - ACC-03: ~60 B
  - ACC-04: ~35 B
  - ACC-05: ~40 B
  - ACC-06: ~45 B
  - ACC-10a: ~8 B
  - Total ~225 B, so it should fit, but the build is the source of truth.
- If it does not fit, drop in this order:
  1. ACC-10 items
  2. ACC-06 overwrite refund
  3. ACC-05 tolerant `removeNamedPlugin`
- A fix can only be applied as an in-place update if it still fits the live app's `extraProgramPages`. Each upgraded mainnet app must be checked against its live page count before the proposal.

---

## ACC-01 (High): forged wallet "origin" through EscrowFactory self-registration → gate bypass

**Root cause:**
- `EscrowFactory.register(payment, 0)` lets any app register itself.
- `utils/functions.ts` turns `Txn.sender` into a wallet ID through that registry and trusts the registered app's `controlled_address` state.

EscrowFactory is immutable on mainnet, so the fix belongs on the consumer side, in the shared helper.

### 1. Change

`projects/akita-sc/smart_contracts/utils/functions.ts`, function `getWalletIDUsingAkitaDAO` (line 180). Only accept wallet IDs whose creator is the DAO-registered wallet factory; anything else is treated as "not a wallet".

```ts
export function getWalletIDUsingAkitaDAO(akitaDAO: Application, address: Account): Application {
  const id = getWalletID(getEscrowFactory(akitaDAO), address)
  if (id === 0) {
    return Application(0)
  }
  // Only apps created by the DAO-registered ARC-58 wallet factory are wallets.
  // appCreator never panics: a deleted/unknown app yields [zeroAddress, false].
  const [creator] = op.AppParams.appCreator(id)
  if (creator !== Application(getAkitaAppList(akitaDAO).wallet).address) {
    return Application(0)
  }
  return Application(id)
}
```

**Effect:**
- `originOr`, `originOrTxnSender`, `referrerOr`, `referralFee` and `sendReferralPayment` now fall back to `Txn.sender` (or zero referrer) for anything that is not a genuine wallet.
- `getWalletID` and `getOrigin(escrowFactory, …)` keep their current signatures but are only used through the DAO helper. Mark `getOrigin` `@deprecated`: it has no callers outside comments.

**Who still resolves correctly:**
- All legitimate wallet creators go through `AbstractedAccountFactory.newAccount`: user wallets, the DAO wallet (`arc58/dao/contract.algo.ts:740`), guild wallets (`arc58/guilds/core/contract.algo.ts:745`) and Welcome-plugin wallets.
- Escrow registrations map escrow address → wallet ID, and that wallet ID passes the creator check.

**Resources:** the wallet-factory app must be available. Callers built off-chain get it from simulate-based resource population. The wallet app itself was already required (`getExBytes`), so there is no new requirement there.
- Byte-cheaper alternative if `StakingPool` cannot fit `Application(x).address`: compare against `Account(op.sha512_256(Bytes('appID').concat(op.itob(walletFactoryId))))`. This needs no app resource but costs a few more bytes.

**Optional hardening:** make `getOriginAccount` / `getReferrerAccount` check the `exists` flag (`const [v, ok] = op.AppGlobal.getExBytes(...)`; return `Global.zeroAddress` when `!ok`). Skip it if bytes are tight: the creator check already guarantees the key exists.

**Plugin library**, `projects/akita-plugin/functions.ts`: add a helper so third-party plugins can authenticate the `wallet` argument before trusting `getOriginAccount`.

```ts
/** True if `wallet` was created by the given ARC-58 wallet factory. */
export function isAkitaWallet(wallet: Application, walletFactory: Application): boolean {
  const [creator] = op.AppParams.appCreator(wallet)
  return creator === walletFactory.address
}
```

Export it from `index.ts` and bump the `@akta/plugin` version.

### 2. ABI, state and SDK

- No ABI, state or box change.
- SDK: no call-site change.
- Off-chain, `akita-sdk` helpers that resolve "wallet for address" through `escrowFactory.get` (escrow/index.ts) should apply the same creator check before showing an origin. That is a UI-trust issue, not a contract one.

### 3. Deployment and migration

`functions.ts` is inlined at compile time, so every consumer has to be rebuilt and redeployed:

| Consumer | Uses | Mainnet path |
|---|---|---|
| `subscriptions` (gatedSubscribe*, gatedTriggerPayment, referral) | origin + referral | DAO `UpgradeApp`. Must fit 147 B headroom. |
| `marketplace` (gatedPurchase, referral) and the `Listing` child (referral) | origin + referral | DAO `UpgradeApp` for marketplace. Load the new `Listing` bytecode into marketplace's box through the update plugin. Live listings keep old code; only referral is affected there, which is low impact. |
| `auctionFactory` → `Auction` child (gatedBid/gatedBidAsa, referral) | origin | Load the new child bytecode through `updateFactoryChildContract`. **Live gated auctions stay vulnerable.** Either upgrade each live gated auction child through the update plugin (`UpgradeableAkitaBaseContract.update`), or accept the risk until they close. |
| `stakingPoolFactory` → `StakingPool` child (gatedEnter, gateCheck) | origin | Same pattern as auctions. 107 B headroom, so this is the tightest. Live gated pools need a per-child DAO upgrade or acceptance. |
| `raffleFactory` → `Raffle` child | referral (+gate imports) | New child bytecode. |
| `social` | `initMeta` wallet linkage, referral | DAO `UpgradeApp` (244 B headroom). |
| `hyperSwap` | helper import | DAO `UpgradeApp` (only if it actually links the helper). |
| `walletFactory` | `cost()`/`newAccount` referral | DAO `UpgradeApp`. Bundle with the ACC-08 change. |
| `stakingPoolFactory`, `auctionFactory`, `raffleFactory` | referral on create | DAO `UpgradeApp`. |
| `subscriptionsPlugin` (3569561107) | computes `subOrigin` for the gate txn | **No redeploy needed.** The core `Subscriptions` check is authoritative. A forged wallet would only make the plugin build a mismatching gate txn, which blocks the attacker. |

- Existing EscrowFactory registrations by attacker apps become inert; no state cleanup is needed.
- Order: core apps first, then child bytecode loads, then (optionally) per-child upgrades of live gated children.

### 4. Regression tests

- **New mock** `smart_contracts/mocks/origin-spoofer/contract.algo.ts` (test-only):
  - Global state `controlled_address: Account` and `referrer: Account`, using the same keys as the wallet.
  - `registerSelf(pay)` → `EscrowFactory.register(pay, 0)`.
  - `spoofGatedBid(auction, gateId, args)`, which builds the inner group `[pay, Gate.mustCheck(controlled_address, gateId, args), Auction.gatedBid]`.
  - Analogous `spoofGatedPurchase`, `spoofGatedEnter` and `spoofGatedSubscribe`.
- `auction/auction.e2e.spec.ts`:
  - V holds the gated asset and the spoofer does not.
  - Expect `spoofGatedBid` to fail with `errFailedGate`.
  - Control: the same flow through V's genuine wallet escrow passes.
- `marketplace/marketplace.e2e.spec.ts`: the same scenario for `gatedPurchase`.
- `subscriptions/subscriptions.e2e.spec.ts`: the same scenario for `gatedSubscribe` and `gatedSubscribeAsa`.
- `staking-pool/staking-pool.e2e.spec.ts`:
  - `gatedEnter` through the spoofer is rejected.
  - `gateCheck(address = spoofer)` disqualifies it.
- `arc58/account/factory.e2e.spec.ts` (referral): the spoofer with `referrer = attacker` calls a fee-paying path, and no referral disbursement is created.
- Positive control in `escrow/escrow.e2e.spec.ts`: a wallet escrow address still resolves to its wallet, and origin is the wallet's controlled address.

### 5. Design decision for Kyle

- **(a) Consumer-side creator check (recommended).** Works with the immutable EscrowFactory and needs no migration.
- **(b) Also deploy EscrowFactory v2** with `register` restricted to wallet-factory-created apps. Requires migrating every wallet's `escrowFactory` pointer, which has no setter, and re-registering. Not worth it now; fold it into the next escrow-factory release together with ACC-07.
- **Live gated children:** upgrade each one now, or accept the risk until they close? Recommendation: inventory live gated auctions and pools (`gateID != 0`) and upgrade only those.

### 6. Dependencies

- Depends on each consumer family fitting its byte budget; coordinate with the gates, auction, marketplace, subscriptions, staking-pool and social reviewers.
- The plugin-library helper is independent.
- The DAO registry must keep `AkitaAppList.wallet` pointing at the factory. If the wallet factory is ever replaced, wallets from the old factory stop resolving. Mitigation: before rotating the factory, extend the check to an allow-list such as `OtherAppList` spare slots.

**Size:** M. It is a small code change with a wide redeploy.

---

## ACC-02 (Medium): `coverFees` reimburses an attacker-chosen `Txn.fee`

### 1. Change

`arc58/account/contract.algo.ts`, `arc58_rekeyToPlugin` (lines 1043-1065). Reimburse only when all of the following hold:
- the call is an outer transaction (so it cannot be amplified through inner groups),
- the key is not global, or it is execution-key gated (the admin pre-signed the group, so the fee is fixed by the group ID).

```ts
    const { coverFees, useExecutionKey } = this.plugins(key).value
    // Txn.fee is caller-chosen: only reimburse a top-level call whose caller is an
    // authenticated grantee, or whose group (and therefore fee) the admin pre-authorized.
    const reimburse: boolean =
      coverFees &&
      Global.callerApplicationId === 0 &&
      (caller !== Global.zeroAddress || useExecutionKey)

    if (reimburse) {
      const maxFee: uint64 = (MAX_INNER_TXN_COUNT + MAX_OUTER_TXN_COUNT) * Global.minTxnFee
      const reimbursement: uint64 = Txn.fee < maxFee ? Txn.fee : maxFee
      itxn.payment({ sender: this.spendingAddress.value, receiver: Txn.sender, amount: reimbursement, rekeyTo: pluginApp.address }).submit()
    } else {
      itxn.payment({ sender: this.spendingAddress.value, receiver: this.spendingAddress.value, rekeyTo: pluginApp.address }).submit()
    }
```

- `caller` is the local already resolved at line 1019.
- A non-reimbursing path is silent rather than an assertion. That keeps legacy grants and core-app inner callers (`arc58OptInAndSend`, `optAkitaEscrowInAndSend`) working.
- Install-time validation is optional and costs bytes. Prefer SDK-side validation. If bytes allow, add this in `_addPlugin`:
  `loggedAssert(!(coverFees && caller === Global.zeroAddress && !useExecutionKey), errCoverFeesNeedsCaller)` with new code `errCfnc`.

### 2. ABI, state and SDK

- No ABI or state change.
- SDK changes:
  - `akita-sdk/src/wallet/index.ts:451-470` (`usePlugin`): set `hasCoverFees` to false when `callerType === Global && !useExecutionKey`, or when the call is made from an inner context. Otherwise the SDK inflates `fundsRequest` for a reimbursement that will not happen.
  - `wallet/index.ts:~590`, `wallet/group.ts:~53`, `wallet/factory.ts:82`, `dao/index.ts:163`: reject `coverFees && callerType === Global && !useExecutionKey` with a clear error.
  - `connect/types.ts` (agent installs): agent grants are caller-specific, so they still reimburse.
- If the `_addPlugin` assertion is adopted, add `errCfnc` to `akita-sdk/src/wallet/errors.ts`.

### 3. Deployment

- Wallet bytecode goes into walletFactory's boxed contract through a DAO proposal (update plugin `updateFactoryChildContract`).
- `updateWallet(wallet)` is then pushed for every wallet with `automatic = true`. This is permissionless, so a keeper script can do it.
- Wallets with `automatic = false` need their admin to call `walletFactory.updateWallet`. Wallets with `allowed = false` need the admin to send `update` (UpdateApplication) with the new program.
- DAO wallet: proposal `ProposalActionTypeUpdateWallet`.
- No state migration.
- Before upgrading, inventory DAO-wallet grants with `coverFees && caller == zero && !useExecutionKey` (for example with `scripts/update-dao-wallet-plugins.ts`). After the fix they silently stop reimbursing.
- Optional: ship a new DAO proposal validator that rejects global, non-execution `coverFees`. The validator is replaceable through `OtherAppList.daoProposalValidator`.

### 4. Regression tests

`arc58/account/contract.e2e.spec.ts`, new `describe('Cover fees')`:
1. Global `coverFees` key: an outer call with `fee = 272 * minFee` gets no reimbursement. The wallet balance only changes by plugin effects, and the sender is not refunded.
2. Caller-specific `coverFees` key: the outer call is reimbursed exactly `min(fee, cap)`. This is the existing behavior.
3. Inner-group call through a new mock `mocks/inner-wallet-caller` (an app holding a caller-specific grant to itself): no reimbursement.
4. Execution-key global `coverFees` key: reimbursed, and the fee is bound by the pre-authorized group ID.

### 5. Design decision for Kyle

Residual risk: a designated caller (agent or keeper) can still burn up to 0.272 ALGO per window, about 5 windows per outer group. Options:
- **(a)** Accept it. The caller is semi-trusted and should get only a bounded grant.
- **(b) Recommended.** Require `cooldown > 0` for `coverFees` grants, enforced in the SDK and optionally in `_addPlugin`. Cost: ~10 B.
- **(c)** Reimburse at most once per group. Needs a new global state slot (`lastReimbursedGroup: bytes<32>`). That only fits wallets with spare schema: mainnet wallets have 30/12, but new wallets from the current tree get the exact schema (see ACC-10e). Not recommended now.
- Also confirm whether any product flow needs global non-execution-key `coverFees` (for example public keepers). If one does, it should move to execution keys or caller-specific keeper grants.

### 6. Dependencies

- Shares the wallet byte budget.
- The SDK change must ship with the wallet update.
- A DAO validator update is optional.

**Size:** S (contract) + S (SDK).

---

## ACC-03 (Medium): drip allowance loses partial intervals; overflow bricks it

### 1. Change

`arc58/account/contract.algo.ts`, `verifyAllowance` (lines 676-714):
- Keep the remainder of the elapsed time.
- Saturate at `max` without overflow.
- Write `last` per allowance type instead of unconditionally.

```ts
  private verifyAllowance(key: AllowanceKey, fundRequest: FundsRequest): void {
    this._requireAllowance(key)
    const { type, spent, amount, last, max, interval, start, useRounds } = this.allowances(key).value
    this.validateAllowance(type, interval)
    const now: uint64 = useRounds ? Global.round : Global.latestTimestamp

    if (type === SpendAllowanceTypeFlat) {
      // unchanged
      const leftover: uint64 = amount - spent
      this._requireAllowanceAmount(leftover, fundRequest.amount)
      this.allowances(key).value.spent += fundRequest.amount
      this.allowances(key).value.last = now
    } else if (type === SpendAllowanceTypeWindow) {
      // unchanged body, then:
      ...
      this.allowances(key).value.last = now
    } else if (type === SpendAllowanceTypeDrip) {
      const accrualStart: uint64 = last === 0 ? start : last
      const intervals: uint64 = (now - accrualStart) / interval
      // `spent` holds the leftover bucket; clamp defensively.
      let available: uint64 = spent < max ? spent : max
      if (amount > 0 && intervals > 0) {
        const headroom: uint64 = max - available
        // intervals * amount > headroom  <=>  intervals > headroom / amount (integer)
        if (intervals > headroom / amount) {
          available = max                       // full; no multiplication -> no overflow
        } else {
          available += intervals * amount       // <= headroom, cannot overflow
        }
      }
      this._requireAllowanceAmount(available, fundRequest.amount)
      this.allowances(key).value.spent = available - fundRequest.amount
      // Advance only by whole intervals so the partial interval keeps accruing.
      this.allowances(key).value.last = accrualStart + intervals * interval
    }
  }
```

- `intervals * interval <= now - accrualStart`, so it cannot overflow.
- When the bucket is full, carrying the remainder forward is harmless.
- The legacy `last === 0` behavior is unchanged.
- To save bytes, keep a single `this.allowances(key).value.last = now` after the if/else for flat and window, and `return` early from the drip branch. Same semantics.

### 2. ABI, state and SDK

None. The box layout is unchanged. No SDK math depends on this: the SDK only maps fields (`wallet/utils.ts`).

### 3. Deployment

- Same wallet rollout as ACC-02.
- Existing drip boxes continue correctly from their stored `last`.
- Partial-interval time already lost before the upgrade is not recovered (acceptable).

### 4. Regression tests

`arc58/account/contract.e2e.spec.ts`, under `describe('Allowances')` (next to `'allowance - drip'`, line 957):
1. **Zero-amount griefing:**
   - Drip `rate = 10`, `interval = 10s`, `max = 100`.
   - Spend down to 0.
   - A global caller sends `fundsRequest = [{asset, 0}]` every 6s, five times (warp 6s each).
   - Expect 30 s elapsed to give availability `>= 30`. Before the fix it was 0.
2. **Remainder carry:** spend at t+15, then at t+20; availability gains 2 intervals in total, not 1.
3. **Overflow:**
   - `rate = 2^60`, `max = 2^62`, `interval = 1`, warp 100s.
   - The request succeeds with `available == max` and no panic.

### 5. Design decisions

None.

### 6. Dependencies

Shares the wallet byte budget (~60 B).

**Size:** S.

---

## ACC-04 (Medium): anyone can call `arc58_pluginReclaim` / `arc58_pluginOptInEscrow` on global keys, skipping expiry

### 1. Change

`arc58/account/contract.algo.ts`:

```ts
  /** Plugin-scoped escrow ops: the plugin app itself, or the specific grantee.
   *  A global (zero-caller) grant is usable by anyone only when `allowGlobal`. */
  private _requirePluginCaller(key: PluginKey, allowGlobal: boolean): void {
    loggedAssert(
      Txn.sender === Application(key.plugin).address ||
      (key.caller !== Global.zeroAddress && Txn.sender === key.caller) ||
      (allowGlobal && key.caller === Global.zeroAddress),
      errForbidden
    )
    loggedAssert(!this.pluginCheck(key).expired, errPluginExpired)
  }
```

- `arc58_pluginReclaim` (1407-1422): `this._requirePluginCaller(key, false)`. Reclaim is never open to arbitrary senders.
- `arc58_pluginOptInEscrow` (1446-1473): `this._requirePluginCaller(key, true)`. Keeps the sponsor and gift opt-in use case. The payment already nets to zero for the wallet, so the residual is junk ASA opt-ins in the escrow; expired grants are now rejected.
- Neither path enforces cooldown: they are not rekey windows. Optional if bytes allow.

### 2. ABI, state and SDK

- No ABI or state change.
- **SDK default change:** `canReclaim` defaults from `true` to `false` in:
  - `akita-sdk/src/wallet/types.ts:116` (`AddPluginDefaults`)
  - `wallet/index.ts:591`
  - `wallet/group.ts:54`
  - `wallet/factory.ts:83` (`p.canReclaim ?? true` → `?? false`)
- Fixture `tests/fixtures/dao.ts:392`: the cached `canReclaim: true` already mismatches the DAO's on-chain value (`false`). Set it to `false`.

### 3. Deployment

- Same wallet rollout as ACC-02. No migration.
- Existing global grants with `canReclaim = true` keep the flag, but only the plugin app can use it.
- DAO-installed grants already have `canReclaim = false` (`arc58/dao/contract.algo.ts:317-337`).

### 4. Regression tests

`arc58/account/reclaim.e2e.spec.ts`:
1. **Invert** `'global plugin with canReclaim=true can reclaim ALGO'` (line 180): a random sender gets `errForb`, and the escrow balance is unchanged.
2. Keep `'caller-specific plugin can reclaim'`.
3. Add a caller-specific grant with `lastValid` in the past: reclaim is rejected with `errPexp`.
4. Global `pluginOptInEscrow` with a valid payment still succeeds, and the same call on an expired grant is rejected.
5. Plugin-app sender path: a mock plugin calls `arc58_pluginReclaim` through an inner txn and succeeds. Reuse `mocks/updatable-pay-plugin` or add a method to `test-close-out`.

### 5. Design decision for Kyle

The current test (`reclaim.e2e.spec.ts:180`) makes "anyone can reclaim through a global grant" an explicit feature. Options:
- **(a) Recommended.** Reclaim restricted to the plugin app or the specific grantee; global opt-in stays allowed. This is the proposal above.
- **(b)** Keep global reclaim but block `closeOut` for non-plugin senders. Still allows draining-to-owner griefing.
- **(c)** Forbid `canReclaim` on global grants at install. Costs more bytes and needs legacy handling.
- Separately: should `pluginOptInEscrow` also be grantee-only? Recommendation: no, keep sponsor opt-ins open.

### 6. Dependencies

- Wallet byte budget.
- The SDK default change should ship with or before the wallet update.

**Size:** S.

---

## ACC-05 (Low): `arc58_removePlugin` does not refund MBR and orphans aliases

### 1. Change

`arc58/account/contract.algo.ts`:

```ts
  arc58_removePlugin(plugin: uint64, caller: Account, escrow: string): void {
    this._requireAdminOrRevoke()
    const key: PluginKey = { plugin, caller, escrow }
    this._requirePlugin(key)
    const methodsLength: uint64 = this.plugins(key).value.methods.length
    this.plugins(key).delete()
    // _addPlugin charged pluginsMbr(escrowKey, n) with escrowKey === key.escrow
    this._refundMbrToControlled(this.pluginsMbr(escrow, methodsLength))
    this._touchState()
  }

  arc58_removeNamedPlugin(name: string): void {
    this._requireAdminOrRevoke()
    loggedAssert(this.namedPlugins(name).exists, errPluginDoesNotExist)
    const app = clone(this.namedPlugins(name).value)
    let refund: uint64 = this.namedPluginsMbr(name)
    // Tolerate an alias whose grant was already removed via arc58_removePlugin.
    if (this.plugins(app).exists) {
      refund += this.pluginsMbr(app.escrow, this.plugins(app).value.methods.length)
      this.plugins(app).delete()
    }
    this.namedPlugins(name).delete()
    this._refundMbrToControlled(refund)
    this._touchState()
  }
```

- There is no double refund: `removePlugin` refunds the plugin box, and the later `removeNamedPlugin` refunds only the alias.
- Legacy plugin boxes removed before this upgrade already leaked their refund (it stays in the app account). That is not recoverable on-chain, and the amounts are small.

### 2. ABI, state and SDK

None. The SDK's `removePlugin` cache logic should also drop the aliases pointing at the key (`akita-sdk/src/wallet/index.ts`, plugin cache).

### 3. Deployment

Wallet rollout (as ACC-02). No migration.

### 4. Regression tests

`arc58/account/admin.e2e.spec.ts` (or `contract.e2e.spec.ts` 'Plugin Restrictions'):
1. Wallet with external `controlledAddress`: add a plugin with 2 methods and escrow `"x"`, then remove it. The controlled address balance returns to its pre-add value; the app balance is unchanged.
2. Named plugin: `removePlugin` on its key, then `removeNamedPlugin(name)` succeeds and refunds exactly `namedPluginsMbr(name)`; the name can be reused.
3. A revocation-app removal also refunds.

### 5. Design decisions

None.

### 6. Dependencies

Wallet byte budget. If bytes run short, keep the `removePlugin` refund and drop the tolerant alias path.

**Size:** S.

---

## ACC-06 (Low): co-admin passkeys cannot be revoked and survive recovery

### 1. Change

`arc58/account/contract.algo.ts`. The change is designed to need **no new ABI method**: `assignDomain(caller, '')` becomes "revoke".

```ts
  private isAdmin(): boolean {
    if (Txn.sender === this.admin.value) return true
    const domain = this.domain.value
    // An empty wallet domain disables all co-admin keys (set by recovery below).
    return domain !== '' &&
      this.domainKeys(Txn.sender).exists &&
      this.domainKeys(Txn.sender).value === domain
  }

  /** Assign a domain to a passkey; an empty domain removes the key. */
  assignDomain(caller: Account, domain: string): void {
    loggedAssert(this.isAdmin(), errOnlyAdminCanAddPlugin)
    if (this.domainKeys(caller).exists) {
      this._refundMbrToControlled(this.domainKeysMbr(this.domainKeys(caller).value))
      this.domainKeys(caller).delete()
    }
    if (domain !== '') {
      this._payMbrFromControlled(this.domainKeysMbr(domain))
      this.domainKeys(caller).value = domain
    }
  }

  arc58_pluginChangeAdmin(newAdmin: Account): void {
    ... existing checks ...
    this.admin.value = newAdmin
    // Recovery: invalidate every co-admin passkey; the new admin re-enables via setDomain.
    this.domain.value = ''
    ...
  }
```

- `arc58_changeAdmin` intentionally does **not** clear the domain. `AbstractedAccountFactory.newAccount` calls `arc58_changeAdmin(admin)` at the end of setup (`factory.algo.ts:244-249`) and must keep the factory-assigned domain.

### 2. ABI, state and SDK

- No ABI, state or box change. The meaning of `assignDomain` with an empty domain changes.
- SDK: add `wallet.removeDomainKey(address)` as a thin wrapper over `assignDomain(address, '')` in `akita-sdk/src/wallet/index.ts`.
- Document that after an admin-plugin recovery the domain is empty, so the new admin must call `setDomain` and re-assign trusted passkeys.

### 3. Deployment

- Wallet rollout. Existing domain-key boxes are compatible.
- Overwrites that happened before the upgrade double-charged MBR; that is not recoverable.

### 4. Regression tests

`arc58/account/admin.e2e.spec.ts`:
1. **Revoke:**
   - Assign a co-admin key K with the wallet domain; K can `setNickname`.
   - `assignDomain(K, '')` refunds exactly `domainKeysMbr(domain)`.
   - K then gets `errAdmn`.
2. **Overwrite:** assigning K domain `"a"` then `"bb"` moves the controlled balance by exactly the MBR delta.
3. **Recovery:**
   - New mock admin plugin `mocks/admin-plugin` (with `admin = true`) calls `arc58_pluginChangeAdmin(new)`.
   - The old co-admin K then gets `errAdmn`.
   - The new admin's `setDomain(d)` re-enables only keys assigned to `d`.
4. Factory setup path: `newAccount` with plugins keeps `domain == factory.domain`.

### 5. Design decision for Kyle

Should recovery clear co-admins?
- **(a) Recommended.** Yes, on `arc58_pluginChangeAdmin` only.
- **(b)** Also on `arc58_changeAdmin`. Needs the factory to call `setDomain` after the admin transfer, which it can't, because it is no longer admin. It would need a reorder in `newAccount`.
- **(c)** No automatic clearing; rely on `assignDomain(k, '')`. Leaves the recovery race open.

### 6. Dependencies

- Wallet byte budget.
- No in-repo admin plugin exists yet; any future recovery plugin relies on this behavior.

**Size:** S.

---

## ACC-07 (Low): EscrowFactory deletion strands the escrow balance; funding is not sender-bound

### 1. Change

This is for the **next** EscrowFactory release. The mainnet escrowFactory (3569555755) is immutable and wallets cannot reach `delete`.

`escrow/factory.algo.ts`:

```ts
  delete(id: uint64): void {
    ... existing auth ...
    const before: uint64 = Global.currentApplicationAddress.balance
    spendingAccount.call.delete({ appId: id })          // child closes ALL ALGO to factory
    const closed: uint64 = Global.currentApplicationAddress.balance - before
    this.walletIDsByAccounts(key).delete()
    itxn.payment({
      receiver: creator.length === 8 ? Global.callerApplicationAddress : Txn.sender,
      // released app-params MBR + released box MBR + everything the child held
      amount: MinPages + GLOBAL_STATE_KEY_BYTES_COST + this.mbr(creator.length) + closed,
    }).submit()
  }

  new(payment: gtxn.PaymentTxn): uint64 {
    ...
    loggedAssert(payment.sender === Txn.sender, errInvalidPayment)   // optional binding
```

- Inner fees are 0, so `before`/`after` reflects only the close.
- Payment sender binding in `new` is optional. The wallet's inner `new` has `payment.sender === Txn.sender === controlledAddress`, so it passes; it only matters for sponsor-style calls.

### 2. ABI, state and SDK

- No ABI change.
- `CONTRACT_AUDIT.md` must be corrected: its "Escrow Factory" row claims both fixes.

### 3. Deployment

- **Won't redeploy now.** The bug is unreachable for ARC-58 wallets.
- Fix it in source and ship it with the next escrow-factory version, together with ACC-01 option (b) if it is ever chosen.

### 4. Regression test

`escrow/escrow.e2e.spec.ts`:
- Use a test app that creates, registers and funds an escrow with an extra 1 ALGO, then calls `delete`.
- The caller app receives exactly `released MBR + 0.1 ALGO base + 1 ALGO`, and the factory balance is unchanged across the cycle.

### 5. Design decisions

None. Recommendation: source-only now.

### 6. Dependencies

None.

**Size:** S (source); deployment deferred.

---

## ACC-08 (Low / Info): permissionless `updateWallet` on arbitrary apps; boxed-contract recreation by the deployer; wallet `register()`

### 1. Changes

**(a) `arc58/account/factory.algo.ts`, `updateWallet`:** only push to apps this factory created.

```ts
  updateWallet(wallet: Application): void {
    loggedAssert(wallet.creator === Global.currentApplicationAddress, errNotAWallet) // new code 'errNwal'
    ...
```

The DAO wallet was created by this factory (`arc58/dao/contract.algo.ts:740`), so the DAO's `UpdateWallet` path still works.

**(b) `utils/base-contracts/factory.ts`, `initBoxedContract`:** shared by every factory. The creator may only create the box before the DAO wallet exists. Afterwards only the DAO wallet may create or resize it, which closes the "DAO deletes box → deployer re-creates it" path.

```ts
  initBoxedContract(version: string, size: uint64): void {
    const [daoWalletId] = op.AppGlobal.getExUint64(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysWallet))
    loggedAssert(
      daoWalletId === 0
        ? Txn.sender === Global.creatorAddress
        : Txn.sender === Application(daoWalletId).address,
      errNotAkitaDao
    )
    if (!this.boxedContract.exists) {
      this.boxedContract.create({ size })
    } else {
      this.boxedContract.resize(size)
    }
    this.childContractVersion.value = version
  }
```

- `childContractVersion.hasValue` is **not** usable as the gate: several factory `create`s set it (auction, marketplace, staking-pool, poll, raffle, prize-box).
- Behavior change: on networks where the DAO is already set up, a newly deployed factory's first box init must go through a DAO proposal. One-shot creator scripts like `scripts/init-raffle-box.ts` stop working post-DAO.
- The `exists` (resize) path is already DAO-only today, so in practice only the `!exists` path changes.
- Imports needed in `factory.ts`: `Application`, `Bytes` and `op` from `@algorandfoundation/algorand-typescript`, and `AkitaDAOGlobalStateKeysWallet` from `../../arc58/dao/constants` (the same import `upgradeable.ts` uses).
- Moving the `childContractVersion` write after the check is cosmetic: the old order was already reverted atomically on failure.

**(c) Wallet `register(escrow)`: won't fix.**
- The Welcome plugin and SDK rely on permissionless `register('')`, which `newAccount` pre-funds (`wallet/plugins/welcome.ts:83`).
- Escrow registration costs a one-time 12_100 µALGO per escrow that the admin's SDK flow pays anyway (`wallet/index.ts:689`, `group.ts:157`).
- The DAO wallet's admin is the DAO app, so an admin-only rule would block script-driven DAO escrow registration.

### 2. ABI, state and SDK

- No ABI or state change.
- New error code `errNwal` in `arc58/account/errors.ts` and `akita-sdk/src/wallet/errors.ts`.

### 3. Deployment

- walletFactory (3569556257): DAO `UpgradeApp` (counter 2 → 3).
- Every other `FactoryContract`-based factory (marketplace, auctionFactory, raffleFactory, pollFactory, prizeBoxFactory, stakingPoolFactory, and guild factory if deployed) needs the same rebuild and DAO upgrade to pick up (b). Batch it with ACC-01's redeploys of those same apps.
- Check whether the deployer key is already sunset (`scripts/execute-deployer-sunset.ts`). If it is, (b) is defense-in-depth on mainnet.

### 4. Regression tests

- `arc58/account/factory.e2e.spec.ts`:
  - `updateWallet(MockAbstractedAccount)` (from `mocks/wallet/mock.algo.ts`, an app accepting UpdateApplication) is rejected with `errNwal`.
  - `updateWallet(realWallet)` still works.
  - The DAO `UpdateWallet` proposal still works.
- A factory spec (e.g., `raffle/raffle.e2e.spec.ts` or a new `utils/base-contracts/factory.e2e.spec.ts`):
  1. After DAO setup, the DAO deletes the box.
  2. Creator `initBoxedContract` is rejected.
  3. DAO `initBoxedContract` succeeds.

### 5. Design decision for Kyle

`factoryUpdateSettings` defaults to `{ allowed: true, automatic: true }` (`contract.algo.ts:779`). That means the DAO plus anyone triggering `updateWallet` can replace every user wallet's code. Options:
- **(a)** Keep it. Fastest security-patch rollout, which ACC-02..06 rely on.
- **(b)** Default `automatic: false`. Users opt in, and patches reach only active users.
- **(c)** Keep automatic, but add a DAO-side timelock on wallet-bytecode loads.
- Recommendation: (a) for now, so these fixes can roll out, then evaluate (c).

### 6. Dependencies

- (b) touches every factory family: coordinate with the auction, marketplace, raffle, poll, prize-box and staking-pool reviewers.
- (a) must ship before or with the wallet rollout scripts.

**Size:** S (code), M (multi-app rollout).

---

## ACC-09 (Info): passkey logic signatures

**Fix (cheap and worth it):** the ed25519 variant cannot verify WebAuthn today, and nothing uses either lsig in the SDK or scripts, so there is no migration.

`arc58/keys/ed25519_passkey.algo.ts`:

```ts
const RPID = TemplateVar<bytes<32>>('RPID_HASH')
...
const message = authData.concat(sha256(cdOne.concat(cdTwo).concat(cdThree)))   // WebAuthn EdDSA signs authData || clientDataHash
assert(authData.slice(0, 32) === RPID)                 // relying-party binding
assert((op.getByte(authData, 32) & 0x05) === 0x05)     // UP (0x01) and UV (0x04) flags
... group/txid check unchanged ...
return ed25519verifyBare(message, sig, PK)
```

- `secp256r1_passkey.algo.ts`: add the same `RPID_HASH` and flags assertions.
- Keep `h = sha256(authData || sha256(clientData))`, which is correct for ES256.
- Optional: rename `sSig`/`rSig` to match the `ecdsaVerify(v, data, r, s, x, y)` argument order.
- These are template variables, so the logic-signature addresses change. That is fine: there are no live users.
- Test: new `arc58/keys/passkey.e2e.spec.ts`:
  - Sign a synthetic `authData`/`clientDataJSON` with a software P-256 key and an ed25519 key.
  - Use the logic signature to send a 0-ALGO payment in a 2-transaction group (passes).
  - Then: a wrong rpIdHash fails, UV=0 fails, and a challenge for a different group fails.
- Decision for Kyle: whether to require UV (biometric/PIN) or only UP. Recommendation: require UV for co-admin keys.

**Size:** S.

---

## ACC-10 (Info): minor items

| Item | Proposal |
|---|---|
| (a) `admin === controlledAddress` possible through factory setup → `arc58_changeAdmin` | **Fix (cheap, ~8 B):** in `arc58_changeAdmin` and `arc58_pluginChangeAdmin` add `loggedAssert(newAdmin !== this.controlledAddress.value, errAdminCannotBeControlled)`. Test in `admin.e2e.spec.ts`. Drop it first if bytes are short. |
| (b) `namedPluginsMbr` omits the escrow bytes in the alias value | **Won't fix.** The immutable `walletMbr` helper (3642282698) quotes the same formula, so changing only the wallet would desync quotes and break exact payments. The subsidy is 400 µALGO per escrow-name byte, paid by the wallet's own app account. |
| (c) `arc58_canCall` ignores `lastValid` | **Won't fix on-chain** (readonly, byte budget). SDK fix instead: `akita-sdk/src/wallet/index.ts` `canCall` should also compare `lastValid` with the current round or timestamp. |
| (d) `defaultToEscrow` grants can never receive a `fundsRequest` | **Won't fix (document).** Allowances keyed by escrow `''` cannot exist by design. The SDK should reject `fundsRequest` for `defaultToEscrow` grants with a clear error. |
| (e) `@contract({ avmVersion: 13 })` dropped `stateTotals` (30 bytes / 12 uints) | **Decision for Kyle.** Without it, new wallets get the exact schema (11 bytes / 9 uints). Any future wallet upgrade that adds a global key will fail for those wallets, and ACC-02 option (c) becomes impossible. Restoring `stateTotals: { globalBytes: AbstractAccountNumGlobalBytes, globalUints: AbstractAccountNumGlobalUints }` costs 0 bytecode but about +1.04 ALGO wallet creation MBR (back to the mainnet-parity `ABSTRACTED_ACCOUNT_MINT_PAYMENT`). Recommendation: restore. Upgradeability matters more than ~1 ALGO, and the constants and comments already assume it. |

---

## Consolidated rollout plan

1. **Wallet bundle** (ACC-02, 03, 04, 05, 06, 10a), plus 10e if chosen. One wallet build, verified ≤ 8 192 B.
   1. DAO proposal: load the bytecode into walletFactory through the update plugin.
   2. Keeper script: `updateWallet` for every automatic wallet.
   3. DAO proposal `UpdateWallet` for the DAO wallet.
   4. Notify admins of non-automatic wallets.
   5. Ship the SDK release with the matching defaults and validators at the same time.
2. **walletFactory upgrade** (ACC-08a/b, ACC-01 referral path): DAO `UpgradeApp`. Do this before step 1's keeper run so `updateWallet` refuses foreign apps.
3. **Shared-helper redeploy** (ACC-01, ACC-08b):
   1. DAO `UpgradeApp` for subscriptions, marketplace, social, hyperSwap and every factory.
   2. Load new child bytecode for Auction, StakingPool, Raffle and Listing.
   3. Per-child upgrades of live *gated* auctions and pools, per Kyle's decision.
   - Verify byte budgets first; StakingPool and Subscriptions are the tightest.
4. **Plugin library**: publish `@akta/plugin` with `isAkitaWallet`.
5. **Deferred**: EscrowFactory v2 (ACC-07, optional ACC-01b); passkey lsigs (ACC-09) whenever passkeys ship.

## Decisions needed from Kyle (summary)

1. **ACC-01:** upgrade live gated auction and staking-pool children now, or accept the risk until they close. Rec: inventory and upgrade the gated ones.
2. **ACC-02:** residual drain by designated callers. Rec: require `cooldown > 0` for `coverFees`. Also confirm that no product needs global non-execution-key `coverFees`.
3. **ACC-04:** remove anyone-can-reclaim for global grants, which inverts the existing test. Rec: yes; keep global sponsor opt-in.
4. **ACC-06:** clear co-admins on plugin-driven admin change only. Rec: yes (option a).
5. **ACC-08:** keep `automatic: true` as the default. Rec: keep for now, then consider a DAO timelock. Also confirm that the post-DAO creator lockout for `initBoxedContract` is acceptable.
6. **ACC-09:** require UV on passkeys. Rec: yes.
7. **ACC-10e:** restore the over-provisioned wallet `stateTotals` (+~1.04 ALGO per wallet). Rec: yes.
