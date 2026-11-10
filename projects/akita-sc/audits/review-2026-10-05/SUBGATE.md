# SUBGATE slice review: Subscriptions, Gate v2, sub-gates, Subscriptions/Gate plugins

Reviewer: SUBGATE subagent, 2026-10-05. Read-only. Paths are relative to
`projects/akita-sc/smart_contracts/` unless noted.

## Verdict

ISSUES. No Critical or High. One Medium (subscription gate grants paid access for half the price),
several Low/Info, and hard rollout ordering constraints for the Subscriptions upgrade.

## Scope (files + line counts reviewed)

| File | Lines |
|---|---|
| subscriptions/contract.algo.ts | 1,536 (full; also diffed against HEAD, 1,232) |
| subscriptions/base.ts, constants.ts, types.ts, errors.ts | 18 / 58 / 133 / 73 |
| subscriptions/principal-shims.test.ts, guild-consensus-abi.test.ts | 168 / 97 (ran: 20/20 pass) |
| gates/contract.algo.ts (Gate v2) | 399 |
| gates/base.ts, constants.ts, types.ts, errors.ts, mock-gate.ts | 10 / 43 / 45 / 46 / 32 |
| gates/sub-gates/* (16 sub-gates incl. subscription/utils.ts) | ~1,900 |
| arc58/plugins/subscriptions/contract.algo.ts, constants.ts, errors.ts | 706 / 8 / 22 |
| arc58/plugins/gate/contract.algo.ts | 61 |
| Cross-read | utils/principal.ts (full), utils/functions.ts (gate/principal/referral/transfer-binding helpers), utils/base-contracts/{upgradeable,base}.ts, utils/programs.ts, arc58/plugins/update-akita-dao (pushUpdate), meta/contract.algo.ts (verify/hash), social/impact.algo.ts (isSubscribed), staking softCheck/getInfo, plugin-dex/hooks/gated-fee.algo.ts (Gate.checkFor ctx), scripts/{allowlist-sub-gates,deploy-gates,deploy-subscriptions-plugin}.ts, scripts/lib/ctx-sub-gates.ts |
| Artifacts | Subscriptions / Gate / sub-gate ARC-56 (methods, OnComplete actions, schema, program size) |
| MainNet (read-only) | Subscriptions 3569556497 params + all boxes + balance; Gate v1 3569558504 state + boxes; old SubscriptionsPlugin 3569561107 / GatePlugin 3569561367 balances |

Unit tests run (no LocalNet): `subscriptions/principal-shims.test.ts`, `subscriptions/guild-consensus-abi.test.ts`,
`arc58/plugins/update-akita-dao/rollout.test.ts`: all pass (20 + 42).

## Live MainNet facts used below

- Subscriptions 3569556497: approval 8,181 B, `extra-program-pages` 3 (max 8,192 B total), global schema 8 uint / 56 bytes
  (uses `akita_dao`, `akita_escrow`, `version`). Balance 4,909,300, min balance 1,475,300 (spare 3,434,000 µALGO).
  Boxes: 4 services (`o`, all ungated, `passes = 0`), 5 subscriptions (`s`, all `gateID = 0`, all `escrowed = 0`,
  max streak 3 for a 30-day service started May 2026, consistent with real payments), 2 `l`, 2 `m`, no `p`, `b`, `i`.
  3 services are owned by the DAO wallet (H253…), 1 by NDLSAU….
- Gate v1 3569558504: `gate_cursor = 1`, **no gate boxes**. Nothing to import.
- Compiled Subscriptions: approval 10,179 B + clear 4 B = 10,183 B, schema 8/56, OnCompletes NoOp + UpdateApplication
  only (no delete).

## Prior-finding verification

| ID | Status | Evidence |
|---|---|---|
| SG-01 ASA referral from escrow | Fixed | `subscriptions/contract.algo.ts:757` pays the creation-fee referral with asset 0; quote `:799` uses asset 0. Legacy shim `legacyNewService` (`:871-886`) goes through the same `newServiceImpl`, so the deployed plugin is fixed too. ASA subscribe referral `:350` is paid in the ASA out of `akitaFees` (correct units, funded by the subscriber's transfer). |
| SG-02 streak inflation | Fixed | `streakCheck` `:1296-1303` only resets; increment only in `triggerImpl` `:706` (`incrementStreakOnPayment` `:199-215`), which `canTrigger` `:464-467` limits to once per window. Live streaks show no inflation (SG-C scan). |
| SG-03 dust donation passes subscription gates | Fixed | `gates/sub-gates/subscription/contract.algo.ts:70-86` (serviceID != 0, service must exist), `utils.ts:47-74` (exists, serviceID, recipient, shutdown, staleness). Streak gate `:76-94` validates op range. Missing sub returns false (no `% 0`). But see SUBGATE-1 (staleness rule). |
| SG-04 origin spoofing | Fixed (in scope) | Hinted paths use strict `principalOf` (genuine-wallet + call-context binding, `utils/principal.ts:120-190`). Legacy shims use `legacyWalletOf` with creator check (`utils/functions.ts:285-305`) and `legacyOriginOr` liveness check (SG-F, `:219-228`). |
| SG-05 / SG-I gated trigger subject | Fixed | Hinted `gatedTriggerPayment` `:1244-1250` uses `triggerCtx(key, …)` `:596-619` (stored pair / at-rest / registry of `key.address`, never the keeper). Legacy shim `:1256-1265` derives origin from `key.address`. |
| SG-06 / SG-J gate semantics | Fixed | `gates/contract.algo.ts:121-136` (count 1..8, args == count, layer 0 start, +0/+1 steps, AND/OR on non-final), `:172-189` recursive evaluator matches documented semantics. |
| SG-07 / SG-H NFD root | Fixed | `nfd-root/contract.algo.ts:47-56` exact `root.algo` or `.root.algo` suffix (with length guard), registry validity `:58-65`, register rejects dots `:99-104`. |
| SG-08 / SG-K passes | Fixed | `unsubscribe` deletes `passes[subKey]` and always refunds what was charged `:1195-1203`; price 83,700 (`base.ts:16`, verified 2,500 + 400 × (41 + 162)); `setPasses` requires `passes > 0` `:1322`; `clearOrphanPasses` `:1336-1339`. Repricing cut-over edge: SUBGATE-7 (no live impact: no passes services on MainNet). |
| SG-09 / SG-L service MBR | Fixed for new services | `constants.ts:19` 1,378,900 (verified 2,500 + 400 × 3,441). Legacy services can still grow for free: see rollout notes. |
| SG-10 staking-amount SOFT | Fixed (residual) | `staking-amount/contract.algo.ts:79-89` clamps to current balance; `getInfo` no panic; type whitelist `:122-129`. Residual: balance is flash-borrowable within a group (same as AssetGate). |
| SG-11 transfer binding | Fixed | `assertSafePayment`/`assertBoundPayment`/`assertSafeAssetTransfer` at `:373-378, 390-392, 759, 989, 1135, 1150, 1287`. |
| SG-12 activation binding | Fixed | `:488`. |
| SG-13 follower-count | Fixed | `social-follower-count/contract.algo.ts:47-62` (`getMetaExists` then `getMeta` on `.social`; ABI confirmed in AkitaSocial ARC-56). |
| SG-14 NFD slicing | Fixed | `nfd/contract.algo.ts:44-50`, `nfd-root:74-79` (`i + 32 <= len`, `slice(i, i + 32)`). |
| SG-15 AssetGate MBR | Fixed | `gates/constants.ts:37` 12,500 (verified); asset 0 = ALGO `asset/contract.algo.ts:47-55`. |
| SG-16 / SG-M allowlist + cost cap + plugin | Fixed | `gates/contract.algo.ts:134` allowlist at register/import, `:287` cap 1 ALGO; `arc58/plugins/gate/contract.algo.ts:37-38` resolves gate from the DAO and uses `getControlledSpendingAccount`. |
| SG-17 a/b/c/d/f | Fixed | streak/staking no-panic, AssetGate asset 0, referrer legacy `check` returns false instead of reverting (`akita-referrer/contract.algo.ts:94-109`), empty gates rejected. e/g/h: not fixed (accepted "won't fix"). |
| SG-F runtime auth check | Fixed | `utils/functions.ts:219-228`. |

## New findings

### SUBGATE-1 (Medium): the subscription gate stays "active" for a full unpaid window, so a subscriber keeps continuous gated access while paying every other window

- **Location:** `gates/sub-gates/subscription/utils.ts:70-74` (`active = lastPayment > previousWindowStart`), used by
  `SubscriptionGate.check/checkFor` (`subscription/contract.algo.ts:96-124`) and `SubscriptionStreakGate`
  (`subscription-streak/contract.algo.ts:113-145`). Same formula in `social/impact.algo.ts:61-65` (cross-family).
- **Mechanism:** a payment made at time `t` inside window k keeps the gate true until the end of window k+1. Nobody can
  collect window k+1 if the subscriber keeps `escrowed < amount` (`canTrigger` `subscriptions/contract.algo.ts:469-471`),
  and `deposit` / `withdraw` / `triggerPayment` are free and permissionless.
- **Scenario:** merchant M runs service S (30-day interval, 100 units) gated content via a `SubscriptionGate(M, S)`.
  1. Subscriber U subscribes (pays window 1). At the start of window 2 U sends `[deposit(100), triggerPayment(U,id)]`
     (U even gets the trigger fee). `lastPayment` is in window 2.
  2. U never leaves escrow in the contract. Window 3: the gate is still true (`lastPayment > start(W2)`); keepers
     cannot trigger (`amount > escrowed`).
  3. Window 4: before using the gated feature U sends `[deposit, triggerPayment, gatedAction]` atomically. Active again
     for windows 4 and 5.
  Result: continuous access, M is paid for windows 2, 4, 6, … (50%). The streak resets to 1 each time, so only
  streak gates with threshold ≥ 2 are unaffected; the plain subscription gate (and social subscriber impact for
  streak 1) are.
- **Why not "by design":** the grace exists to tolerate keeper lag, but the subscriber controls whether the next
  window is collectible. An `escrowed >= amount` condition in the grace window does not fix it either, because the
  subscriber can `[deposit, gatedAction, withdraw]` in one group.
- **Fix options:** (a) active iff `lastPayment >= currentWindowStart` (paid for the current window); gated flows
  prepend `triggerPayment` when due (any account can trigger once per window). (b) Bounded grace: active iff
  `lastPayment >= currentWindowStart || (lastPayment >= previousWindowStart && now - currentWindowStart <= GRACE)`
  with a small fixed GRACE (for example 1 day), so the leak is at most GRACE/interval. Apply the same rule in
  `social/impact.algo.ts isSubscribed`. The sub-gates are new apps, so this is a pre-deploy change.

### SUBGATE-2 (Low): SubscriptionsPlugin trusts `getSpendingAccount` of an unverified wallet, so anyone can make the plugin spend its own balance

- **Location:** `arc58/plugins/subscriptions/contract.algo.ts:63, 303` (and every method); compare Gate plugin
  `arc58/plugins/gate/contract.algo.ts:37` (`getControlledSpendingAccount`).
- **Scenario:** attacker deploys app X with global `spending_address = SubscriptionsPlugin.address`, then calls
  `SubscriptionsPlugin.optIn(X, false, assetN)` repeatedly with fresh or already-opted assets. The plugin sends
  `optInCost` (≥ 100,000 µALGO) from its own account to Subscriptions each call (`:67-85`; `Subscriptions.optIn`
  accepts any payer). `block(X, addr_i)` likewise moves 15,700 per call into block boxes keyed by the plugin. Hinted
  methods (`subscribe`, `newService`, gated trigger) revert on the forged hint (`errHnwl`), so no subscription can be
  created for the plugin address.
- **Impact:** the plugin's spare balance (the old live plugin 3569561107 holds 1,563,300 with min 256,500) is pushed
  into Subscriptions. Afterwards `initDescription` cannot grow the shared description box, so plugin `newService`
  with a longer description reverts until someone refunds the plugin (griefing). The old plugin is immutable.
- **Fix:** use `getControlledSpendingAccount(wallet)` in every SubscriptionsPlugin method (new plugin only).

### SUBGATE-3 (Low): subscriber self-trigger through the new plugin with `rekeyBack = true` fails for gated subscriptions without a stored pair

- **Location:** plugin `triggerPayment` `arc58/plugins/subscriptions/contract.algo.ts:487-526`; `triggerCtx` case (3)
  `subscriptions/contract.algo.ts:606-618`.
- **Scenario:** a gated subscription created through a legacy shim (`legacyGatedSubscribe` stores no pair, `:1033-1043`;
  the deployed May-2026 plugin keeps creating these until it is retired). The subscriber's own wallet triggers it via
  the new plugin with `rekeyBack = true`. The readonly `triggerGateCtx` runs while `key.address` is rekeyed to the
  plugin, so `ownsAtRestOf(W, key.address)` is false and `ctx.wallet = 0`. The final `gatedTriggerPayment` carries
  `rekeyTo = W.address`, applied before the callee runs, so the target computes `ctx.wallet = W`. `gateCheckCtx` sees a
  different encoded ctx and the call fails with `errFgte`.
- **Impact:** functional only (keepers and `rekeyBack = false` work; `adoptPrincipal` fixes it). No MainNet gated
  subscriptions exist today.
- **Fix:** in the plugin, compute the ctx for the trigger with the rekey state the target will see (send the trigger
  with `rekeyBack = false` and rekey back in a trailing zero payment), or have `triggerCtx` case (3) ignore at-rest
  ownership when `key.address == Txn.sender`.

### SUBGATE-4 (Low): the subscribe-time payment does not count at the start of window 2 (gate and streak use different boundary rules)

- **Location:** `gates/sub-gates/subscription/utils.ts:74` (strict `>`), versus `incrementStreakOnPayment`
  `subscriptions/contract.algo.ts:205-214` (treats `lastPayment == previousWindowStart` as paid).
- **Scenario:** `lastPayment == startDate`. From `startDate + interval` until a keeper triggers, `previousWindowStart ==
  startDate`, so the gate returns false for every new subscriber with full escrow. Fail-closed; a GatedFee pass
  measured in that gap loses its gate bit for `passTtl`.
- **Fix:** resolved together with SUBGATE-1 (pick one boundary rule and use it in both places).

### SUBGATE-5 (Low): ASA subscribe reverts for referred wallets if the DAO sets both subscription fee percentages to 0

- **Location:** quote `newSubscriptionCost` `subscriptions/contract.algo.ts:1402` always adds the referral
  disbursement MBR when a referrer exists; `createSubscription` `:350-351` only spends it when `akitaFees > 0`; the ASA
  path asserts the payment is exact (`:373`).
- **Impact:** with `paymentPercentage = triggerPercentage = 0`, plugin ASA subscribes from referred wallets fail
  (`errInvalidPaymentAmount`). The ALGO path over-pays and escrows the surplus (recoverable). Config-dependent.
- **Fix:** make `referralFeeTo` (or the quote) return 0 when the computed fee base is 0, or accept `>=` and escrow the
  surplus as the ALGO path does.

### SUBGATE-6 (Info): allowlist governance and fallback behaviour of Gate v2

- `gates/contract.algo.ts:109-118, 239-251, 266-270`: until `sealImports` the deployer EOA alone controls the allowlist
  (and imports below `legacyCutoff`). Removing a sub-gate from the allowlist does not stop existing gates calling it
  (evaluation never checks membership, `:191-202`); it only turns a context-aware sub-gate into a plain one. There is
  no way to disable a sub-gate found vulnerable after gates reference it.
- If `SubscriptionGate`, `SubscriptionStreakGate` or `AkitaReferrerGate` are allowlisted without `ctxAware`,
  `mustCheckFor` falls back to their legacy registry rule, so wallets that are not in the EscrowFactory registry (new
  wallets once registry writes stop) fail those gates. `scripts/allowlist-sub-gates.ts` flags them correctly from the
  artifact; `deploy-universe.ts` and `deploy-gates.ts` do not allowlist at all.
- On "the gated-fee sub-gate is not on the allowlist": there is no gated-fee sub-gate. `GatedFeeHook`
  (`plugin-dex/hooks/gated-fee.algo.ts:584-589`) is a consumer of `Gate.checkFor`; its gate slots only need gates whose
  sub-gates were allowlisted at `register` time. All 16 catalog sub-gates are covered by the allowlist script.

### SUBGATE-7 (Info): pass repricing cut-over can under-refund a legacy subscription created in the same second as the first post-upgrade subscribe/unsubscribe

- `subscriptions/contract.algo.ts:218-231`: `passesCharged` uses `startDate < passesRepricedAt`. A legacy subscription
  created in the upgrade block (same `latestTimestamp`) gets 83,700 instead of 418,900 back. No MainNet service has
  passes, so no live impact. Fix: set `passesRepricedAt = latestTimestamp + 1`.

### SUBGATE-8 (Info): minor notes

- `adoptPrincipal` (`:1278-1290`) is paid by any caller but refunded to the subscriber on `unsubscribe` (`:1205-1207`):
  a gift, not a loss.
- Referral rebate: `p.referrer` is self-asserted (`utils/principal.ts:177-178`); any user can set themselves as
  referrer and take `referrerPercentage` of Akita fees on their own subscriptions and service creation. Same as before.
- Two gated-trigger selectors evaluate different subjects for the same subscription (hinted: stored pair / principal;
  legacy: registry origin of `key.address`); the keeper chooses. Both subjects belong to the subscriber, so no cross-user
  effect.
- `MerkleAddressGate` still accepts any tree type (`MerkleTreeTypeUnspecified`) and needs a proof of ≥ 2 elements
  (`merkle-address/contract.algo.ts:21, 78-93`). Leaf/node second-preimage is not possible: the leaf is computed by
  the gate as `sha256(sha256(caller))` (32-byte input) while nodes hash 64-byte inputs (`meta/contract.algo.ts:135-140,
  313-318`); a forged leaf would need a SHA-256 collision.
- `getActiveSubscription` does not check merchant blocks; a blocked subscriber keeps gate access until the grace runs out.

## Suspicions (not confirmed)

- None that could not be traced to a concrete scenario above.

## Upgrade / rollout notes

1. **Program size forces a page-growing update.** 10,183 B > 8,192 B (live `extra-program-pages = 3`). The update must
   set `extraProgramPages = 4` (capacity 10,240 B, 57 B headroom) and repeat the full 8/56 schema. This needs
   consensus with `AppSizeUpdates` / `MaxAbsoluteExtraProgramPages = 7` live on MainNet and the working-tree
   UpdateAkitaDAO plugin (`pushUpdate`, `arc58/plugins/update-akita-dao/contract.algo.ts:161-200`); the deployed update
   plugin cannot push it (`rollout.test.ts:163-167` asserts `legacyPluginCanPush = false`). The DAO wallet becomes the
   size sponsor and must hold the app's pages + schema MBR (~3.5 ALGO) at update time. Any later fix that adds more than
   57 bytes needs a fifth page.
2. **Schema/box/ABI safety:** schema unchanged (8/56; new `passes_repriced_at` uint fits). Box layouts unchanged; new
   prefix `i` does not collide (`s,l,o,m,b,p`). Every deployed selector is still routed (unit test P2-CMP-01 passes).
   `update(string)void` retained; no DeleteApplication.
3. **Order:** (a) deploy Gate v2 + 16 sub-gates, run `allowlist-sub-gates.ts` (ctx flags), `sealImports`, DAO switches
   `aal.gate` (`legacyCutoff` = 1: Gate v1 has no gates); (b) upgrade Subscriptions (hinted gated paths require
   `Gate.mustCheckFor`, so upgrading before the gate switch breaks only hinted gated subscribes; no gated services exist
   today); (c) only then enable the new SubscriptionsPlugin (it calls hinted selectors the deployed Subscriptions lacks,
   `rollout.test.ts:449-452`).
4. **Fund the new SubscriptionsPlugin** with ≥ 0.1 ALGO + 1,263,300 µALGO (max description box) before announcing it:
   plugin `newService` requires `initDescription`, which creates the box from the plugin's own balance
   (`arc58/plugins/subscriptions/contract.algo.ts:88-95`); `deploy-subscriptions-plugin.ts` funds nothing.
5. **Legacy service MBR (SG-09 migration):** the four live services can grow to the 3,400-byte maximum for free:
   4,718,400 µALGO in total (third-party NDLSAU… service: 1,212,800; DAO's three: 3,505,600). Spare balance is
   3,434,000 and no subscriber escrow is held today, so third-party growth is covered; if the DAO grows its own service
   descriptions it should top up by the difference (1,284,400 µALGO worst case).
6. No passes services, no gated subscriptions, no orphan pass boxes exist on MainNet, so SG-08 legacy pricing and
   `adoptPrincipal` backfill have nothing to migrate.

## Test gaps (named, not written)

1. "a subscriber who pays every other window stays active continuously" (SUBGATE-1), for `SubscriptionGate` and
   social subscriber impact.
2. "a fresh subscription is active at the start of window 2 until the first trigger" (SUBGATE-4).
3. "SubscriptionsPlugin rejects a forged wallet whose spending_address is the plugin" (SUBGATE-2: `optIn`, `block`).
4. "subscriber's own wallet triggers a legacy-shim gated subscription through the new plugin with rekeyBack = true"
   (SUBGATE-3).
5. "in-place upgrade of the deployed 3-page Subscriptions program with live legacy boxes (services, ASA subscription),
   then trigger / withdraw / unsubscribe" (compat.e2e deploys the new contract fresh; rollout.test only plans).
6. "ASA subscribe through the plugin with subscription fee percentages set to 0 and a referred wallet" (SUBGATE-5).
7. "a legacy subscription to a passes service created in the same second as the first post-upgrade call refunds
   418,900" (SUBGATE-7).
8. Gate v2: "nested layer 2 inside layer 1" truth table (only one nesting level is tested) and "8-filter gate fits one
   group's resource budget through mustCheckFor".

## Checked and OK

- Value conservation in `createSubscription` (ALGO: `amount + mbr + referralMbr` in, `leftover + referral + referralMbr
  + leftOver` out, surplus escrowed; ASA: same in ASA units, MBR exact in ALGO), `triggerImpl` (fees sum to `amount`,
  `escrowed -= amount`), `withdraw`, `deposit(Asa)`, `unsubscribe` (escrow + subscriptions MBR + pass charge + pair MBR,
  all to `Txn.sender`), `unblock`, `newServiceImpl`.
- No path lets a merchant move subscriber escrow: amount/interval/asset/payout are copied or immutable; shutdown/block
  only stop triggers; withdraw/unsubscribe ignore blocks and status.
- Gated subscription cannot be created or paid without the gate (`checkSubscribe` `:513-533`, `triggerImpl` `:638-640`,
  gate id 0 not found in Gate v2).
- `gateCheckCtx` pins app, NoOp, 4 args, selector, encoded ctx and gate id; ctx is computed by the target itself.
  `ctxOwns` subject rule cannot borrow another user's subscription or wallet (needs liveness or at-rest rekey to W).
- Principal pair storage/refund MBR 34,900 matches box size; pass MBR 83,700; service MBR 1,378,900; sub-gate registry
  MBRs (subscription 21,700, streak 25,300, asset 12,500, nfd-root, referrer, gate registry 6,100 + 12,800/filter) are
  exact or over-charged, never under-charged.
- Gate v2: structure validation, evaluator semantics, cost cap, allowlist at register/import, admin hand-over at seal,
  ID space from 2^32, immutable (no update/delete), `checkFor` pure predicate.
- NFD root/segment matching and verified-address loop; NFD registry validation of the app id.
- Merkle gates: leaf bound to caller / held asset, no leaf/node confusion.
- Staking-amount: SOFT clamp, no panic on missing stake, type and op whitelists.
- Gate plugin: DAO-resolved gate, controlled spending account, rekey on the final call.
- Subscriptions plugin: hinted calls pass `windowHint(wallet)`; gate ctx for subscribe equals the target's
  `principalOf` (rekey on the final call does not change plugin-arm resolution); rekey-back on the final call of every
  method.
- Arithmetic: interval ≥ 60 (no `% 0`), window starts underflow-safe, fee split cannot underflow with
  `MIN_AMOUNT = 4` and percentages ≤ 100%; overflows only revert the caller's own call.
