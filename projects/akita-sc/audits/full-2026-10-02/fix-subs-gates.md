# Fix proposals: Subscriptions and Gates (SG-01 … SG-17)

These are read-only proposals; nothing in the repo was edited. Paths are relative to
`projects/akita-sc/smart_contracts/` unless noted. Every PuyaTs API used below was checked
against `node_modules/@algorandfoundation/algorand-typescript/*.d.ts` or existing repo usage:

- `gtxn.PaymentTxn.{sender,closeRemainderTo,rekeyTo}`
- `gtxn.AssetTransferTxn.{sender,assetSender,assetCloseTo}`
- `op.AppParams.appCreator(app) -> readonly [Account, boolean]`
- `op.AppGlobal.getExBytes(...) -> [bytes, boolean]`
- `Account.authAddress`
- `bytes.slice(start)` / `bytes.slice(start, end)`, where `end` is an index, not a length
- `bytes.concat`
- `Box.delete() -> boolean`
- recursive private subroutines, which `Gate.evaluate` already uses

The live-app facts come from `reports/mainnet-app-versions-2026-09-11.md`.

## 0. Deployment model: what can be upgraded

| Live app (mainnet) | Upgradeable? | How a fix ships |
|---|---|---|
| `subscriptions` 3569556497 (counter 1, v0.0.2) | Yes. It extends `AkitaFeeGeneratorContractWithOptIn` → `UpgradeableAkitaBaseContract.update`, gated on the DAO wallet and the update plugin. | DAO `UpgradeApp` proposal (normal `runUpdate` script flow). No box-layout changes are proposed. The global schema has headroom (8 uint / 56 byte slots; it uses 1 uint and 2 bytes), so adding a `GlobalState<uint64>` is safe. |
| `gate` 3569558504 (counter 0) | No. It extends plain `AkitaBaseContract`, which has no `update`. | A new **Gate v2** app, plus a DAO proposal that updates `akitaAppList.gate`. |
| All 16 sub-gates, 3569558602…3569558618, 3642526856, 3642975628 | No. All extend `AkitaBaseContract` and have no `update`. | Changed sub-gates are deployed as new apps. Sub-gates are **not** in the DAO registry; only the SDK `GateRegistryConfig` (`akita-sdk/src/networks.ts`) and each Gate registry entry (`GateFilterEntry.app`) refer to them. |
| `gatePlugin` 3569561367 | No. `gateAppID` is fixed at creation. | A new GatePlugin v2 that resolves `getAkitaAppList(akitaDAO).gate` at call time. |
| `subscriptionsPlugin` 3569561107 | No. | **No change needed.** Every proposal keeps the Subscriptions ABI, and the plugin reads costs from the contract. |
| `escrowFactory` 3569555755 | No. It extends plain `Contract`. | It cannot be fixed in place. This is why SG-04 is fixed in the shared reader helper and not in `register`. |
| `walletFactory` 3569556257 (counter 2) | Yes (DAO). | DAO `UpgradeApp`. |

### What happens to existing gate registrations

`Gate` registry boxes hold `(layer, app, registryEntry, op)` and cannot be edited: there is no admin
path and the app is immutable. Existing gates therefore keep calling the old, buggy sub-gate apps
for as long as consumers resolve gate IDs against Gate v1.

Consumers (subscription services, social follow/paywall gates, polls, staking pools, marketplace,
auction and raffle children) store **gate IDs**, and they resolve the Gate app through the DAO at
check time (`gateCheck` → `getAkitaAppList(akitaDAO).gate`). So:

- **If we only switch the DAO to a fresh Gate v2**, every old gate ID is either "not found" (fail
  closed) or, worse, collides with an unrelated new v2 gate that has the same numeric ID.
  Subscription services and poll/pool children cannot change their `gateID`, so gated services
  would become permanently unusable.
- **Proposed migration (D1):**
  1. Gate v2 is created with `gateCursor = 2^32`, a disjoint ID space for new gates, and a
     `legacyCutoff = v1.gate_cursor` read at deploy time.
  2. Gate v2 gets a one-shot import path:
     `importGate(id, entries)`, allowed only if `id < legacyCutoff`, `!exists`, and the sender is
     the migrator; then `sealImports()`.
  3. A migration script reads every v1 gate (`getGate`). For filters that point at **changed**
     sub-gates, it re-registers the entry in the v2 sub-gate using the old `getEntry` bytes and
     imports with the new `(app, registryEntry)`. Unchanged sub-gates keep their app and entry ID.
  4. Gates that are invalid under the new SG-06 validation are flagged for manual review rather
     than imported silently.
  5. Gate IDs created on v1 after the cutoff (for example through the old gate plugin) will
     simply be "not found" on v2. That is fail-closed, never a collision.

Sub-gates that change and need new apps: subscription, subscription-streak, nfd-root, nfd,
social-follower-count, staking-amount, asset. Unchanged and reusable: akita-referrer,
merkle-address, merkle-asset, poll, social-activity, social-impact, social-moderator,
social-follower-index, staking-power.

---

## HIGH

### SG-01 — ASA `newService` pays the referral in the ASA from pooled escrow (fix size: S)

**Change**: `subscriptions/contract.algo.ts`, in `newService` and `newServiceCost`.
```ts
// newService (was: sendReferralPayment(this.akitaDAO.value, asset, serviceCreationFee))
const { leftover, referralMbr } = sendReferralPayment(this.akitaDAO.value, 0, serviceCreationFee)

// newServiceCost (was: referralFee(this.akitaDAO.value, asset))
const referralCost = referralFee(this.akitaDAO.value, 0)   // creation fee is always ALGO
```
- **ABI:** keep the `asset` parameter of `newServiceCost(uint64)` (now unused) so the plugin and
  SDK stay compatible.
- **SDK:** `akita-sdk/src/subscriptions/index.ts:45-47, 298` needs no change, because it reads
  the cost from the contract.
- **Optional hardening (D2):** a per-asset escrow ledger:
  - `escrowTotals = BoxMap<uint64, uint64>({ keyPrefix: 'e' })`, incremented on
    subscribe/deposit and decremented on trigger/withdraw/unsubscribe.
  - An `assertSolvent(asset)` check after every outbound transfer.
  - This adds a new box family. Legacy totals are unknown, so it needs a DAO/migrator
    `seedEscrowTotal(asset, total)` computed off-chain.
  - Recommendation: defer. The direct fix closes the bug.
- **Migration:**
  - DAO `UpgradeApp` for subscriptions.
  - Off-chain check: scan Rewards `createInstantAsaDisbursement` calls whose inner sender is the
    Subscriptions app inside a `newService` group with `asset != 0`, and sum the drain per ASA.
  - If the sum is non-zero, the DAO tops up the Subscriptions app's ASA balance. Escrow accounting
    on mainnet is otherwise unaffected.
- **Test:** `subscriptions/subscriptions.e2e.spec.ts`, new describe "ASA service creation referral":
  1. Wallet B subscribes to an ASA service and deposits X, so the app escrows the ASA.
  2. Attacker wallet W is created with `referrer = R`.
  3. W calls `newService(asset = ASA)`.
  4. Assert: the app's ASA balance is unchanged, the referral disbursement is in **ALGO** and
     equals `calcPercent(fee, referrerPercentage)`, the escrow receives `fee - referral` ALGO,
     and B can still `withdraw(X)`.
  - Mirror the same scenario through the plugin in `arc58/plugins/subscriptions/subscriptions.e2e.spec.ts`.

### SG-02 — `streakCheck` inflates the streak (fix size: S)

**Change**: in `subscriptions/contract.algo.ts`, `streakCheck` may only *reset* a streak. The
increment stays in `triggerPayment`, which `canTrigger` already limits to once per window.
```ts
private windowStarts(sub: SubscriptionInfo): { current: uint64, previous: uint64 } {
  const current: uint64 = this.getLatestWindowStart(sub.startDate, sub.interval)
  const previous: uint64 = current >= sub.interval ? current - sub.interval : 0 // underflow guard
  return { current, previous }
}

private incrementStreakOnPayment(key: SubscriptionKey): void {   // replaces updateStreak(key, 1)
  const sub = clone(this.subscriptions(key).value)
  const { current, previous } = this.windowStarts(sub)
  if (sub.lastPayment < previous) {
    this.subscriptions(key).value.streak = 1
  } else if (sub.lastPayment < current) {
    this.subscriptions(key).value.streak += 1
  }
}

streakCheck(key: SubscriptionKey): void {
  loggedAssert(this.subscriptions(key).exists, errSubscriptionDoesNotExist)
  const sub = clone(this.subscriptions(key).value)
  const { previous } = this.windowStarts(sub)
  if (sub.lastPayment < previous) {
    this.subscriptions(key).value.streak = 0   // lapse only; never increments
  }
}
```
- **ABI/layout:** none. The plugin `streakCheck` and SDK `wallet/plugins/subscriptions.ts:759-780` are unchanged.
- **Migration:**
  - DAO `UpgradeApp`.
  - Streaks already inflated on mainnet cannot be told apart on-chain.
  - Option: an off-chain scan for more than one `streakCheck` per key per window. If abuse exists,
    D3 decides between accepting it (it self-heals when the subscriber next lapses) and a one-shot
    DAO `resetStreak(key)` admin method. Recommendation: scan first; add the admin method only if
    abuse is found.
- **Cross-family:** `social/impact.algo.ts:242-260` (subscriber impact for streak ≥ 12) benefits
  automatically. Tell the social reviewer.
- **Test:** `subscriptions/subscriptions.e2e.spec.ts`:
  1. Subscribe and warp one interval.
  2. Call `streakCheck` ×3 → streak still 1.
  3. `triggerPayment` → 2.
  4. `streakCheck` → 2.
  5. Warp 3 intervals and call `streakCheck` → 0.
  6. Trigger → 1.

### SG-03 — Subscription and streak gates pass with a dust donation (fix size: M, new apps)

**Change**: new `SubscriptionGate` v2 and `SubscriptionStreakGate` v2
(`gates/sub-gates/subscription*/contract.algo.ts`). The registration layout is unchanged:
`(address,uint64)` and `(address,uint64,uint8,uint64)`. Only `id` is renamed to `serviceID` and
validated. A check argument is added that names the subscribing account and its subscription ID.
```ts
type SubscriptionGateRegistryInfo = { merchant: Account; serviceID: uint64 }
type SubscriptionGateCheckParams = { subscriber: Account; id: uint64 }     // 40 bytes
// checkShape initialValue: '(address,uint64)'

register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
  loggedAssert(args.length === RegisterArgsByteLength, errInvalidArgCount)
  const info = decodeArc4<SubscriptionGateRegistryInfo>(args)
  loggedAssert(info.serviceID !== 0, errInvalidRegistryArg)             // donations can't gate
  abiCall<typeof Subscriptions.prototype.getService>({                   // asserts the service exists
    appId: getAkitaAppList(this.akitaDAO.value).subscriptions,
    args: [info.merchant, info.serviceID],
  })
  // ...payment checks unchanged...
}

check(caller: Account, registryID: uint64, args: bytes): boolean {
  loggedAssert(args.length === 40, errInvalidArgCount)
  loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
  const { merchant, serviceID } = clone(this.registry(registryID).value)
  const { subscriber, id } = decodeArc4<SubscriptionGateCheckParams>(args)
  if (!this.controlledBy(subscriber, caller)) return false
  return this.isActive(subscriber, id, merchant, serviceID)
}

private controlledBy(subscriber: Account, caller: Account): boolean {
  if (subscriber === caller) return true
  const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, subscriber)  // SG-04-hardened helper
  return wallet.id !== 0 && getOriginAccount(wallet) === caller
}

private isActive(subscriber: Account, id: uint64, merchant: Account, serviceID: uint64): boolean {
  const subsApp = getAkitaAppList(this.akitaDAO.value).subscriptions
  const info = abiCall<typeof Subscriptions.prototype.getSubscription>({
    appId: subsApp, args: [{ address: subscriber, id }],
  }).returnValue
  if (!info.exists || info.serviceID !== serviceID || info.recipient !== merchant) return false
  if (abiCall<typeof Subscriptions.prototype.isShutdown>({ appId: subsApp, args: [merchant, serviceID] }).returnValue) {
    return false
  }
  const current: uint64 = Global.latestTimestamp - ((Global.latestTimestamp - info.startDate) % info.interval)
  const previous: uint64 = current >= info.interval ? current - info.interval : 0
  return info.lastPayment > previous     // same staleness rule, underflow-safe
}
```
The streak gate is identical, plus the `op` switch on `info.streak`. Also:
- `register` validates `op.asUint64() >= 10 && op.asUint64() <= 60`.
- `!info.exists` returns `false` instead of panicking with `% 0` (also covers SG-17a).

- **SDK changes:**
  - `akita-sdk/src/gates/types.ts:103-114`: rename `id` → `serviceID`, and add
    `GateCheckArg { type: 'subscription' | 'subscription_streak', subscriber: string, id: bigint }`
    (currently `{ type: 'subscription' }` with no arguments, lines 151-152).
  - `akita-sdk/src/gates/index.ts`: add check-arg encoding for both types at the check-args
    switch (~lines 340-400), and update the registration encoders at lines 250-259.
  - `akita-sdk/src/networks.ts`: new sub-gate app IDs.
- **Migration:**
  - Deploy both v2 sub-gates. Legacy gate registrations are imported per §0 (D1) by re-registering
    `(merchant, id)` as `(merchant, serviceID = id)`.
  - Legacy `id` was ambiguous (a subscription index), so each imported entry is checked off-chain:
    if no service `id` exists for `merchant`, the entry is flagged.
- **Design decisions:**
  - **D4: subject model.** (a) Caller-supplied `(subscriber, id)` with an origin-ownership check
    (above; no Subscriptions change). (b) A Subscriptions-side index
    `(subscriberOrigin, merchant, serviceID) → subscriptionID` (new box family and MBR).
    Recommendation: (a).
  - **D5:** should family-pass holders (`passes`) satisfy the gate? Recommendation: not now. Passes
    are unused on-chain today, and enabling them needs a pass → subscription reverse index.
- **Test:** `gates/contract.e2e.spec.ts`, new "subscription gate" describe (none exists today):
  1. Gate (merchant M, service S) with a dust 40-year-interval donation to M → **false**.
  2. Subscription to another service of M → false.
  3. Valid subscription to S, checked via wallet origin + wallet-address subscriber → true.
  4. Subscriber not controlled by the caller → false.
  5. Lapsed subscription → false.
  6. Shut-down service → false.
  7. Streak gate: inflation attempt (SG-02) leaves the streak at 2, so `>= 5` fails.

### SG-04 — Spoofable origin via self-registered "wallets" (= ACC-01). One protocol-wide fix (fix size: M)

**Shared helper change, `utils/functions.ts` only.** Every consumer gets the fix through
`getWalletIDUsingAkitaDAO` / `originOr` / `getOriginAccount`:
```ts
export function getWalletIDUsingAkitaDAO(akitaDAO: Application, address: Account): Application {
  const id = getWalletID(getEscrowFactory(akitaDAO), address)
  if (id === 0) return Application(0)
  // Only AbstractedAccounts created by the canonical wallet factory may act as a wallet.
  const [creator, exists] = op.AppParams.appCreator(id)
  if (!exists || creator !== Application(getAkitaAppList(akitaDAO).wallet).address) {
    return Application(0)          // fall back to Txn.sender / `or` – never an attacker-chosen origin
  }
  return Application(id)
}

export function getOriginAccount(walletID: Application): Account {
  const [controlled, exists] = op.AppGlobal.getExBytes(walletID, Bytes(AbstractAccountGlobalStateKeysControlledAddress))
  assert(exists && controlled.length === 32, errInvalidWallet)   // new error code
  return Account(controlled)
}

export function originOr(walletID: Application, or: Account): Account {
  if (walletID.id === 0) return or
  const origin = getOriginAccount(walletID)
  // D6 (recommended): reject legacy wallets whose external controlled address never proved control.
  // At rest an external controlled address is rekeyed to the wallet app; while it is the spending
  // account it IS Txn.sender. Anything else is unproven.
  if (origin !== walletID.address && origin !== Txn.sender && origin.authAddress !== walletID.address) {
    return or
  }
  return origin
}
```
- `getWalletID(escrowFactory, address)` stays as it is; `getWalletIDUsingAkitaDAO` is the
  authenticated entry point. **Do not** use raw `getWalletID` / `getOrigin` for authorization.
  They currently have no algo.ts callers apart from the helper itself, so mark them
  `/** unauthenticated */` or remove them.
- **Second part, wallet factory proof for new wallets.** In `arc58/account/factory.algo.ts`,
  `newAccount`, after the payment checks:
  ```ts
  if (controlledAddress !== Global.zeroAddress) {
    loggedAssert(Txn.sender === controlledAddress || payment.sender === controlledAddress, errControlledAddressNotSigner)
  }
  ```
  The internal callers (`dao/contract.algo.ts:740`, `guilds/core/contract.algo.ts:748`,
  `plugins/welcome/contract.algo.ts:94`) all pass `Global.zeroAddress`, so they are unaffected.
  - SDK: in `akita-sdk/src/wallet/factory.ts:29-120` (`new`), when `controlledAddress` is
    external, `sender` must be the controlled address. Assert that client-side with a clear error.
- **Why not fix `EscrowFactory.register`:** that app is immutable, and replacing it would mean
  migrating every `walletIDsByAccounts` entry. The reader-side check is equivalent and is
  deployable.
- **Consumers that must be recompiled and shipped** to pick up the helper:
  - Through DAO `UpgradeApp`: subscriptions, social (`AkitaSocial`), walletFactory (also uses
    `sendReferralPayment`), and any other upgradeable consumer listed by `grep getWalletIDUsingAkitaDAO|originOr`.
    In scope here: `subscriptions/contract.algo.ts`, `social/contract.algo.ts`,
    `arc58/account/factory.algo.ts`.
  - Through factory child-bytecode reload (new children only): `auction/contract.algo.ts`,
    `marketplace/marketplace.algo.ts`, `raffle/contract.algo.ts`, `staking-pool/contract.algo.ts`.
    **Existing live children keep the vulnerable code.** Inventory gated live children and either
    let them expire or have the DAO/creator close them.
  - New SubscriptionGate v2 (SG-03) and any v2 sub-gate that resolves origins.
  - `hyper-swap/contract.algo.ts` also imports the helpers; the HyperSwap reviewer should confirm
    whether it uses them for authorization.
- **Design decisions:**
  - **D6:** include the runtime `authAddress` check in `originOr`. Recommended: it closes spoofing
    by **existing** factory wallets created with an arbitrary `controlledAddress`. The cost is that
    an external-controlled wallet whose controlled EOA is not rekeyed to the wallet loses origin
    resolution and falls back to the sender, which is a degradation, not a fund risk.
  - **D7:** wallets created by any **older** wallet-factory app ID fail the creator check. Inventory
    them on mainnet. If any exist, add a DAO-managed `legacyWalletFactories` list, or accept the
    degradation (they lose origin and referral). Recommendation: inventory first.
- **Tests:**
  - New test-only mock `mocks/fake-wallet/contract.algo.ts`. It sets the global
    `controlled_address = whale`, calls `EscrowFactory.register(pay, 0)`, then sends the inner group
    `[pay, Gate.mustCheck(whale, gateID, []), Subscriptions.gatedSubscribe(...)]`.
  - In `subscriptions/subscriptions.e2e.spec.ts`: expect `errFailedGate`.
  - The same mock in the auction, marketplace and staking-pool specs (coordinate with ACC-01).
  - Positive tests: a real wallet using its main account and a named escrow both still resolve
    to the origin. `arc58/account/factory.e2e.spec.ts`: `newAccount` with an external
    `controlledAddress` from a different sender fails.

### SG-07 — NFD-root gate accepts other roots (fix size: S, new app; bundle SG-14)

**Change**: `NFDRootGate` v2 (`gates/sub-gates/nfd-root/contract.algo.ts`).
```ts
private nfdGate(user: Account, appID: uint64, root: string): boolean {
  const [nfdName, hasName] = op.AppGlobal.getExBytes(appID, Bytes(NFDGlobalStateKeysName))
  if (!hasName) return false
  const exact = Bytes(root).concat(Bytes('.algo'))                    // the root NFD itself (D8)
  const suffix = Bytes('.').concat(exact)                             // ".<root>.algo"
  const isRoot = nfdName === exact
  const isSegment = nfdName.length > suffix.length
    && nfdName.slice(nfdName.length - suffix.length) === suffix
  if (!isRoot && !isSegment) return false
  // ...isValidNfdAppId(String(nfdName), appID) unchanged...
  for (let i: uint64 = 0; i < caAlgoData.length; i += 32) {          // SG-14 fix
    if (caAlgoData.slice(i, i + 32) === user.bytes) return true
  }
  return false
}

register(...) {
  const rootBytes = args
  loggedAssert(rootBytes.length > 0 && rootBytes.length <= 27, errInvalidRegistryArg)
  for (let i: uint64 = 0; i < rootBytes.length; i += 1) {
    loggedAssert(rootBytes.slice(i, i + 1) !== Bytes('.'), errInvalidRegistryArg)  // bare root label only
  }
  // cost: 5_700 + BoxCostPerByte * (2 + args.length) (fixes the BoxCostPerBox overcharge)
}
```
NFDs have only one segment level, so the `.root.algo` suffix together with registry validity
proves the NFD is the root or one of its segments. The parent-app-ID read is no longer needed.

- **SDK:** new app ID in `networks.ts`. The `nfd_root` cost encoding changes because the cost
  formula changes; the SDK reads `cost()`, so no hard-coded constant needs updating.
- **Migration:** new app, plus a legacy import that re-registers each root string (§0).
- **D8:** should the owner of `akita.algo` itself pass the "akita root" gate? Recommendation: yes.
- **Test:** `gates/contract.e2e.spec.ts`. NFD mocks do not exist; add
  `mocks/nfd/{nfd,registry}.algo.ts`, where `readField` returns packed addresses and
  `isValidNfdAppId` uses an allowlist. Cases:
  1. `evil.algo` (no parent) → false.
  2. `x.notakita.algo` → false.
  3. `x.akita.algo` → true.
  4. `akita.algo` → true.
  5. A user listed as the 2nd verified address → true (SG-14).

---

## MEDIUM

### SG-05 — Gated trigger evaluates the keeper (fix size: S)

**Change**: `subscriptions/contract.algo.ts`, `gatedTriggerPayment`:
```ts
const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, key.address)
const origin = originOr(wallet, key.address)          // subscriber, not Txn.sender
loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, origin, gateID), errFailedGate)
```
- **ABI:** none. The plugin already sends `subOrigin`
  (`arc58/plugins/subscriptions/contract.algo.ts:472-492`), so plugin triggers start working.
- **SDK:** `akita-sdk/src/subscriptions/index.ts:721-742`. The caller-built `gateTxn` must use the
  subscriber's origin; add a doc comment or helper.
- **D9:** keep the per-payment eligibility re-check (recommended, as originally intended), or drop
  the gate at trigger time (eligibility only at subscribe). Re-checking needs keepers to hold the
  subscriber's gate args. Most sub-gates take none; merkle proofs are public.
- **Depends on:** SG-04, because the subject is resolved through the hardened helper.
- **Test:** `subscriptions/subscriptions.e2e.spec.ts` plus the plugin spec:
  1. Gated subscription; an ineligible keeper triggers with the subscriber's gate txn → succeeds.
  2. The subscriber becomes ineligible; an eligible keeper using its own origin → `errFailedGate`.
  3. A keeper passing the ineligible subscriber's origin → gate fails.

### SG-06 — Gate expression semantics (fix size: M, part of Gate v2)

**Change**: Gate v2 (`gates/contract.algo.ts`). Strict validation, plus an evaluator whose
semantics are explicit: left-to-right within a layer; a filter followed by a deeper layer applies
its operator to the whole deeper group, which runs to the end because layers never decrease.
```ts
const MAX_GATE_FILTERS: uint64 = 8

private evaluate(caller: Account, filters: GateFilterEntry[], args: GateArgs, start: uint64): boolean {
  let result = this.evaluateFilter(caller, filters[start], args[start])
  for (let i: uint64 = start; i + 1 < filters.length; i += 1) {
    const op = filters[i].logicalOperator
    if (filters[i + 1].layer > filters[i].layer) {
      const nested = this.evaluate(caller, filters, args, i + 1)
      return op === AND ? (result && nested) : (result || nested)
    }
    const next = this.evaluateFilter(caller, filters[i + 1], args[i + 1])
    result = op === AND ? (result && next) : (result || next)
  }
  return result
}

private validate(filters: GateFilter[], argsLength: uint64): void {
  loggedAssert(filters.length > 0 && filters.length <= MAX_GATE_FILTERS, errInvalidLayer)
  loggedAssert(argsLength === filters.length, errInvalidArgCount)
  loggedAssert(filters[0].layer === 0, errInvalidLayer)
  for (let i: uint64 = 0; i < filters.length; i += 1) {
    if (i > 0) {
      loggedAssert(filters[i].layer >= filters[i - 1].layer && filters[i].layer <= filters[i - 1].layer + 1, errInvalidLayer)
    }
    if (i + 1 < filters.length) {
      loggedAssert(filters[i].logicalOperator === AND || filters[i].logicalOperator === OR, errBadOperation)
    }
    loggedAssert(this.subGates(filters[i].app).exists, errInvalidSubGate)   // SG-16
  }
}
// register(): this.validate(filters, args.length) first
// check():    loggedAssert(args.length === filters.length, errInvalidArgCount); return this.evaluate(caller, filters, args, 0)
```
`ensureBudget` stays, sized to `filters.length`.

- **ABI:** `GateFilter`/`GateFilterEntry` unchanged, and `check`/`mustCheck` selectors unchanged,
  so consumers' `gateCheck` is unaffected.
- **New Gate v2 methods:** `importGate`, `sealImports`, `setSubGate`. New error codes are needed
  in `gates/errors.ts` and in `akita-sdk/src/gates/errors.ts`.
- **SDK:** document the semantics in `akita-sdk/src/gates/types.ts`. Optionally add a builder that
  rejects invalid layer and operator combinations client-side.
- **D10, operator semantics:**
  - (a) Fixed layered semantics as above. No ABI change. Only "right-nested" expressions are
    possible, so `(A∨B)∧(C∨D)` is not expressible. **Recommended for this release.**
  - (b) A postfix/RPN encoding: a full boolean language, but an ABI change for `GateFilter` plus a
    new SDK builder.
  - (c) Flat expressions only (no layers). Simplest, least expressive.
- **Migration:** legacy gates imported per §0 are evaluated under the new semantics. The migration
  script evaluates both semantics symbolically and flags every gate whose truth table differs
  (any gate with layer > 0 or an operator outside {10, 20}).
- **Test:** `gates/contract.e2e.spec.ts`, "composite semantics", using MockGate variants that
  return true or false:
  1. `[A{0,AND}, B{1,OR}, C{1}]` with only C true → false.
  2. The same with A and C true → true.
  3. `[A{0,OR}, B{0,AND}, C{1,AND}, D{1}]` truth-table cases.
  4. Unknown operator → register rejects.
  5. Empty filters, `args.length ≠ filters.length`, a layer jump of 2, or a first layer ≠ 0 → rejects.

### SG-08 — Passes box key, price and unpaid creation (fix size: S)

**Change**: in `subscriptions/contract.algo.ts`:
```ts
// unsubscribe
let mbrRefund: uint64 = costs.subscriptions
if (sub.serviceID > 0) {
  const { passes } = this.services({ address: sub.recipient, id: sub.serviceID }).value
  if (passes > 0) {
    this.passes(subKey).delete()                    // subKey = { address: Txn.sender, id }, returns bool
    mbrRefund += this.passesRefund(sub.startDate)   // refund what was charged, box or not
  }
}

// setPasses
loggedAssert(passes > 0 && passes >= addresses.length, errPassCountOverflow)
```
In `subscriptions/base.ts`, `mbr()`:
```ts
passes: MinPassesMBR + (BoxCostPerByte * (2 + (AccountLength * MAX_PASSES))),   // 83_700 (was 418_900)
```
- **D11, legacy price:** mainnet subscriptions created before the upgrade paid 418,900.
  - (a) Keep 418,900 (symmetric refund, no migration, overcharges new users).
  - (b) Reprice and record the cut-over, then refund by `startDate`:
    ```ts
    passesRepricedAt = GlobalState<uint64>({ key: 'passes_repriced_at' })   // set once by DAO
    private passesRefund(startDate: uint64): uint64 {
      return startDate < this.passesRepricedAt.value ? 418_900 : this.mbr().passes
    }
    ```
    Plus a DAO-only `setPassesRepricedAt()`, callable once.
  - **Recommended: (b).** Schema headroom exists (§0).
- **Legacy orphans:** pass boxes keyed by already-deleted subscriptions. Add an owner-callable
  `clearOrphanPasses(id)`, allowed when `!subscriptions({sender,id}).exists && passes({sender,id}).exists`.
  It deletes the box and refunds only the freed box MBR, `2_500 + 400 * (41 + boxLength)`, using
  `this.passes(key).length`. This avoids double refunds where the old wrong-key path already paid
  someone.
- **ABI:** adds `clearOrphanPasses(uint64)void` (optional) and the DAO setter. The SDK needs a
  hook for `clearOrphanPasses` in `akita-sdk/src/subscriptions/index.ts` and, optionally, the
  plugin. The plugin is immutable, so wallet users would call it via a later plugin version or
  `executeAsAdmin`.
- **Test:** `subscriptions/subscriptions.e2e.spec.ts`:
  1. Subscribe to a passes service, `setPasses`, unsubscribe → the box at `{sender, subId}` is gone
     and the refund equals the charge.
  2. Subscribe without calling `setPasses` → the refund is still returned.
  3. `setPasses([])` on a `passes == 0` service → rejected.
  4. Two subscriptions where `subId == other.serviceID` → each deletes only its own box.
  5. Legacy-date subscription refunds 418,900.

### SG-09 — Service MBR is far below the box size (fix size: S)

**Change**: `subscriptions/constants.ts`:
```ts
// key 41 ('o'+32+8) + value 121 fixed/headers + max title + max description
export const ServicesMBR: uint64 = 1_378_900   // 2_500 + 400 * (41 + 121 + 128 + 3_151)
```
Charged once and retained (services are never deleted). `newServiceCost` picks it up through
`mbr()`, so the SDK and plugin read the new value automatically.

- **D12:**
  - (a) Reserve the maximum upfront. About 1.38 ALGO, against the 100 ALGO creation fee.
    **Recommended**; no ABI change.
  - (b) Charge growth in `setServiceDescription`/`updateServiceTitle` with a grouped payment.
    That is an ABI change to both methods plus a plugin and SDK change.
- **Migration:** legacy services keep their 62,500 reserve and can still grow for free.
  - Off-chain: sum `(actual box MBR − 62,500)` over existing services, plus their remaining
    growth headroom to the maximum.
  - The DAO funds the Subscriptions app with that deficit in the same proposal as the upgrade.
  - Keep SG-01's optional solvency check in mind.
- **Test:** `subscriptions/subscriptions.e2e.spec.ts`:
  1. Create a service.
  2. Write a 3,151-byte description and a 128-byte title.
  3. Assert app `balance − minBalance` is unchanged versus before service creation, apart from fees
     forwarded.

### SG-10 — Staking-amount gate trusts stale SOFT records (fix size: S, new app; bundle SG-17b)

**Change**: `StakingAmountGate` v2 (`gates/sub-gates/staking-amount/contract.algo.ts`).
```ts
if (type === STAKING_TYPE_HEARTBEAT) {
  staked = abiCall<typeof Staking.prototype.getHeartbeatAverage>({ appId, args: [user, asset, includeEscrowed] }).returnValue
} else {
  const info = abiCall<typeof Staking.prototype.getInfo>({ appId, args: [user, { asset, type }] }).returnValue  // no panic
  staked = info.amount
  if (type === STAKING_TYPE_SOFT && staked > 0) {
    const { balance } = abiCall<typeof Staking.prototype.softCheck>({ appId, args: [user, asset] }).returnValue
    if (balance < staked) staked = balance            // never count more than currently held
  }
}
// register: loggedAssert(type in {HEARTBEAT, SOFT, HARD, LOCK}, errBadOperation); op in [10..60]
```
- **Migration:** new app; legacy entries are imported per §0.
- **Cross-family:** the staking reviewer should confirm `softCheck` semantics for asset 0, where
  `balance` includes MBR.
- **Test:** `gates/staking-amount-gate.e2e.spec.ts`:
  1. Soft stake 1M, then transfer the tokens out → `>= 1M` fails.
  2. No stake record → false, not a panic.
  3. Invalid type → register rejects.

---

## LOW

### SG-11 — Bind grouped fund transactions (fix size: S)

**Change**: add shared helpers in `utils/functions.ts`. They are reusable by marketplace, rewards
and social, which state the same invariant.
```ts
export function assertBoundPayment(p: gtxn.PaymentTxn, receiver: Account, payer: Account): void {
  assert(p.sender === payer && p.receiver === receiver
    && p.closeRemainderTo === Global.zeroAddress && p.rekeyTo === Global.zeroAddress, errInvalidPayment)
}
export function assertBoundAssetTransfer(x: gtxn.AssetTransferTxn, receiver: Account, payer: Account): void {
  assert(x.sender === payer && x.assetReceiver === receiver && x.assetSender === Global.zeroAddress
    && x.assetCloseTo === Global.zeroAddress && x.rekeyTo === Global.zeroAddress, errInvalidTransfer)
}
```
Use them in `createSubscription`, `createAsaSubscription`, `newService`, `block`, `deposit` and
`depositAsa`, with `payer = Txn.sender`, `receiver = Global.currentApplicationAddress`.

- **Compatibility:** the plugin always uses `sender = spending account` for both the funding txn
  and the app call (`arc58/plugins/subscriptions/contract.algo.ts`), and the SDK uses the same
  sender. Verify no fee-sponsorship path relies on a different payer.
- **Test:** `subscriptions/subscriptions.e2e.spec.ts`:
  1. A payment from a third account → rejected.
  2. A clawback-sourced `depositAsa` (test ASA with clawback = attacker) → rejected.
  3. `closeRemainderTo` set → rejected.

### SG-12 — Bind activation to the same merchant (fix size: S)

**Change**: in `verifyServiceActivation`, inside the loop:
```ts
loggedAssert(txn.sender === Txn.sender, errInvalidSequence)
```
- **Test:** `[newService(A), activateService(B)]` → `errInvalidSequence`.

### SG-13 — Follower-count gate calls the wrong app (fix size: S, new app)

**Change**: `SocialFollowerCountGate` v2: call `AkitaSocial.getMetaExists`, then `getMeta`, on
`getAkitaSocialAppList(...).social` instead of `.graph`, and return `false` if no meta exists.
Apply the same `getMetaExists` guard in social-activity only if that app is redeployed; otherwise
won't fix (fail-closed).

- **Migration:** new app plus import. Legacy follower-count gates never passed, so imports cannot
  change outcomes in a dangerous direction.
- **Test:** `gates/contract.e2e.spec.ts`: a user with N followers passes `>= N` and fails
  `>= N+1`; a user without meta → false.

### SG-14 — NFD verified-address slicing (fix size: S)

Bundled into SG-07 (nfd-root), and the same one-line change in `NFDGate` v2:
`caAlgoData.slice(i, i + 32)`. NFDGate needs a new app and import. Test: covered in SG-07.

### SG-15 — AssetGate MBR under-quoted (fix size: S, new app; bundle SG-17c)

**Change**: add `AssetGateRegistryMBR: uint64 = 12_500` in `gates/constants.ts` (8-byte key plus
17-byte value) and use it in `cost`/`register`. Also treat asset 0 as ALGO:
```ts
if (asset === 0) { balance = user.balance } else { const [b, opted] = AssetHolding.assetBalance(user, asset); if (!opted) return false; balance = b }
```
- **Migration:** new app plus import.
- **Test:** register and assert the AssetGate app's `balance − minBalance` is unchanged; ALGO
  balance gate.

### SG-16 — Arbitrary sub-gate apps (fix size: S, part of Gate v2)

**Change**: Gate v2 gains an allowlist and a cost cap.
```ts
subGates = BoxMap<uint64, bytes<0>>({ keyPrefix: 's' })
setSubGate(payment: gtxn.PaymentTxn, app: uint64, allowed: boolean): void {
  loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
  // create(): exact MBR payment; delete(): refund to the DAO wallet
}
// in register: loggedAssert(cost <= MAX_SUBGATE_COST, errInvalidPayment)
```
Plus a new `GatePlugin` v2 that extends `AkitaBaseContract` and uses
`getAkitaAppList(this.akitaDAO.value).gate` instead of the fixed `gateAppID`.

- **D13:** a strict DAO allowlist (recommended) versus permissionless custom sub-gates with only
  a cost cap.
- **SDK:** `akita-sdk/src/wallet/plugins/gate*` gets the new plugin app ID; `networks.ts`.
- **Test:** register with an unlisted app → rejected; a listed app works; a cost above the cap → rejected.

---

## INFO (SG-17)

| Item | Decision |
|---|---|
| a. Streak gate `% 0` panic on a missing subscription | **Fix**, bundled in SG-03 (`!exists → false`). |
| b. Staking-amount `mustGetInfo` panic | **Fix**, bundled in SG-10 (`getInfo`). |
| c. Asset/merkle-asset with asset 0 | AssetGate: **fix** in SG-15. MerkleAsset: won't fix; collections are ASAs by definition. |
| d. AkitaReferrerGate panics for external-controlled wallets; referrer is self-declared | Won't fix now. The app is otherwise correct, and the semantics are inherent (referrer is chosen at wallet creation). Document it in the SDK. |
| e. MerkleAddress `Unspecified` wildcard type and ≥ 2-element proof minimum | Won't fix in this release. The root is chosen by the gate creator, and small trees can be padded. If MerkleAddress is ever redeployed, set `MinCheckArgsLength = 2` and pin `MerkleTreeTypeAddresses`. |
| f. Empty-filter gate underfunded by 800 µALGO | Fixed by SG-06 validation (`filters.length > 0`). |
| g. Merkle register cost uses `BoxCostPerBox` per byte (overcharge, self-harm) | Won't fix unless redeploying. NFD-root's version is fixed in SG-07. |
| h. SubscriptionsPlugin shared `description` box can be created or resized by anyone | Won't fix. One singleton box, bounded at about 1.26 ALGO once, and the plugin is immutable. |
| i. Passes are unused on-chain | Covered by design decision D5. |

---

## Dependencies and sequencing

1. **SG-04 / ACC-01 first.** SG-03 (`controlledBy`) and SG-05 resolve subjects through the
   hardened helper. One change in `utils/functions.ts`
   (`getWalletIDUsingAkitaDAO`, `getOriginAccount`, `originOr`) plus the wallet-factory proof.
   Coordinate one consumer-upgrade wave with the account, social, auction, marketplace,
   staking-pool and raffle reviewers.
2. **Subscriptions upgrade.** One DAO `UpgradeApp` carrying SG-01, 02, 05, 08, 09, 11, 12
   (plus the SG-04 helper), with the DAO top-ups for SG-01 (if drained) and SG-09 in the same
   proposal or batch.
3. **Gate v2 wave.**
   1. Deploy Gate v2 (SG-06, 16) and the changed sub-gates (SG-03 ×2, 07, 10, 13, 14/NFD, 15).
   2. `setSubGate` for every live sub-gate.
   3. Run the import script.
   4. `sealImports`.
   5. DAO proposal: `akitaAppList.gate = v2`.
   6. Deploy GatePlugin v2.
   7. Release the SDK with `networks.ts` and the gate types.

   Steps 4 and 5 must land together: before the DAO switch, consumers still resolve v1.
4. **Cross-family:**
   - SG-02 affects social impact scoring.
   - SG-10 affects staking soft-stake semantics.
   - The SG-11 helper should be shared with marketplace, rewards and social funding checks.
   - Gate v2's ID-space switch affects every gated consumer: social follow/paywall gates, poll
     children, staking pools (including the staking reviewer's finding on caller-supplied gate
     re-checks), marketplace, auction and raffle.
   - Factory children created before the helper and Gate changes keep the old code.

## Design decisions for Kyle

| # | Decision | Recommendation |
|---|---|---|
| D1 | Gate v2 migration: import legacy gates (migrator role plus seal) or let them fail closed | Import, with a disjoint ID space starting at 2^32 and a sealed one-shot migrator. |
| D2 | Per-asset escrow solvency ledger in Subscriptions | Defer. |
| D3 | Reset already-inflated streaks | Scan first; add a DAO `resetStreak` only if abuse is found. |
| D4 | Subscription gate subject model | Caller-supplied `(subscriber, id)` plus an origin check. |
| D5 | Family passes satisfy subscription gates | Not now. |
| D6 | Runtime `authAddress` check for legacy spoofed external wallets | Yes. |
| D7 | Wallets from older factory app IDs | Inventory, then decide on a legacy allowlist. |
| D8 | Root NFD owner passes its own root gate | Yes. |
| D9 | Re-check the gate at each trigger, for the subscriber | Yes. |
| D10 | Gate operator semantics | Fixed layered semantics now; RPN later if needed. |
| D11 | Passes repricing | Reprice to 83,700, with legacy refunds by `startDate` cut-over. |
| D12 | Service MBR | Reserve the maximum (1,378,900) upfront. |
| D13 | Sub-gate allowlist | Strict DAO allowlist plus a cost cap. |
