# Principal Resolution Standard (normative)

Status: Phase 0, 2026-10-04. Audience: third-party integrators and Akita contract authors.
This page is the normative copy of §2–§3 of [`PHASE-0-SPEC.md`](PHASE-0-SPEC.md). The security argument,
rollout and per-method change list stay in the spec. Code: `projects/akita-sc/smart_contracts/utils/principal.ts`,
mirrored byte-for-byte into `@akta/plugin` as `principal.ts` (see `projects/akita-plugin/README.md`).

Path conventions: as in the spec (paths relative to `projects/akita-sc/smart_contracts/`; `AA` = `arc58/account/contract.algo.ts`,
`FN` = `utils/functions.ts`). Line citations point at the 2026-10-04 working tree and are informative only.

## 1. Quick start

1. Add `wallet: uint64` as the **last** argument of every method whose caller identity matters. `0` = plain account.
2. At the first hop, call `resolvePrincipal(walletFactory, wallet)` (or `principalOf(akitaDAO, wallet)` inside Akita).
   An invalid hint reverts; an absent hint (`0`) resolves to `Txn.sender`.
3. Use `p.principal` for gates, attribution and stored ownership. Use `p.referrer` for referral payouts (it is self-asserted,
   so it never authorises anything).
4. Forward `gateCtx(p)` to gates (`Gate.mustCheckFor`) and assert it with `gateCheckCtx`. Sub-gates test subjects with `ctxOwns`.
5. If another party must later re-derive the subject (disqualification, keeper triggers), store `(p.wallet, p.principal)` now and
   re-check it with `atRestPrincipal`.
6. Pin `walletFactory` to your own configuration. Never read it through the wallet.

| Error | Code | Meaning |
|---|---|---|
| `errHintNotWallet` | `errHnwl` | hint is not an app created by the pinned wallet factory (or does not exist) |
| `errHintTopLevel` | `errHtop` | hint given on a top-level call |
| `errHintNotBound` | `errHnbd` | neither a direct call from `W` nor `W`'s open plugin window holding the sender |
| `errHintNotOwner` | `errHnow` | third-party write: `W` does not own the account at rest |
| `errHintBadWallet` | `errIwlt` | `W.controlled_address` missing or not 32 bytes |
| `errHintPluginNotAuth` | `errNath` | `pluginPrincipal`: the calling plugin does not hold the spending account |

## 2. Definitions

| Term | Meaning |
|---|---|
| **Spender** (`S`) | `Txn.sender` of the call being evaluated. It is the account whose funds move and whose signature or app custody the AVM checked. |
| **Wallet hint** (`W`) | A caller-supplied `uint64` app id. `0` means "plain account, no wallet". Any other value is a claim that the call acts for ARC-58 wallet `W`. On target methods it is always the **last** ABI argument, named `wallet`, typed `uint64` (not `application`, so it stays friendly to access lists: `ACCESS_LIST_AUDIT.md` lines 24 and 60). |
| **Genuine wallet** | `W != 0`, `W` exists, and `appCreator(W) == appAddress(AkitaAppList(dao).wallet)`. This uses `FN:263-275` `appAddress`/`isAkitaWallet`. It does **not** prove the code is genuine (§4.2). |
| **Origin** (`C`) | `W`'s raw `controlled_address` global (`AA:137`, read via `FN:246-253`). It is display data until it passes the live-control test. |
| **Live control** | `W` can move `C` right now: `C == S`, or (`C == W.address` and `authAddr(W.address) == zero`), or (`C != W.address` and `authAddr(C) == W.address`). Only the first hop evaluates it against the acting `S`. Evaluated later in the same window for a *different* account, it is false for any account currently rekeyed to the window's plugin (E23). |
| **Verified context** (`ctx`) | `(principal, wallet, spender)` as computed by the first hop. It is forwarded to gates through `Gate.mustCheckFor` (§3.5, §6.9) and is never recomputed downstream. |
| **Stored pair** | `(W, principal)` written at interaction time by a target that must later re-derive a third party's principal (`'i'` boxes, §6.4–6.5). It is re-checked without reading any wallet global (§3.3 `atRestPrincipal`). |
| **Principal** | The identity a contract uses for gates, attribution and stored ownership: `C` if `W` is verified and has live control of `C`, otherwise `S`. With `W == 0` it is `S`. |
| **Plugin window** | The span between `arc58_rekeyToPlugin` (`AA:1047-1114`) and the rekey back, during which `W.spending_address == S` and `S` is rekeyed to plugin `P` (`AA:1063-1069`, `:1099-1107`). The window is closed by `arc58_verifyAuthAddress` (`AA:987-992`). |
| **Direct wallet call** | An inner call issued by the wallet app `W` itself (`Global.callerApplicationId == W`), for example `register` at `AA:822-840`. |
| **Proxy chain** | Plugin `A` rekeys `S` to app `B`, and `B` calls the target (`arc58/plugins/test-proxy-rekey/contract.algo.ts:33-51`). |
| **Referrer** | `W`'s `referrer` global (`AA:163`, written only at `AA:808`). It is self-asserted (§4.2). |
| **First hop** | The first Akita contract whose `Txn.sender` is `S`. Only that contract can evaluate the predicate (§3.5). |

---

## 3. The standard

### 3.1 Predicate (normative pseudocode)

```
resolve(F = walletFactoryId, hint, S = Txn.sender, callerApp = Global.callerApplicationId,
        callerAddr = Global.callerApplicationAddress, strict):

  if hint == 0:
      return { wallet: 0, principal: S, origin: ZERO, spender: S, referrer: ZERO, viaPlugin: false }

  W = hint
  (creator, ok) = app_params_get AppCreator W
  require ok && creator == sha512_256("appID" ‖ itob(F))              else fail errHnwl
  require callerApp != 0                                               else fail errHtop

  if callerApp == W:                         // direct wallet call
      viaPlugin = false
  else:                                      // plugin window (incl. proxy chains)
      (sp, e) = app_global_get_ex W "spending_address"
      require e && len(sp) == 32 && sp == S && S != callerAddr        else fail errHnbd
      viaPlugin = true

  (c, e) = app_global_get_ex W "controlled_address"
  require e && len(c) == 32                                            else fail errIwlt
  C = Account(c)
  live = C == S
      || (C == W.address && acct_params_get AuthAddr(W.address) == ZERO)
      || (C != W.address && acct_params_get AuthAddr(C) == W.address)

  (r, e) = app_global_get_ex W "referrer";  referrer = (e && len(r)==32) ? r : ZERO
  return { wallet: W, principal: live ? C : S, origin: live ? C : ZERO, spender: S,
           referrer, viaPlugin }

fail(code): strict ? loggedErr(code) : return resolve(F, 0, ...)      // try-variant falls back to plain
```

Rules that go with the predicate:

- **Invalid hint reverts** on every write path (Kyle's default). Only the `try*` variants (quotes) fall back to plain. The fallback covers non-wallets, missing apps and malformed byte values. It **cannot** cover a genuine wallet whose admin stored a `uint64` under a bytes key: `app_global_get_ex` then returns a uint64, `len`/`==` on it panics, and the AVM has no type-test opcode. So `try*` and `quote*` are "non-reverting for valid hints only". This only hurts the caller who chose the hint, so these helpers must never run on a path a third party needs to complete (§3.8 rule 2).
- **Controlled account rekeyed away** gives principal = spender (`live == false`). The referrer is still `W.referrer`, because `W` was verified as the actor.
- **Proxy chains are supported**: the plugin arm checks only `W.spending_address == S`, never which app is the caller. In effect the arm attests "the calling app holds `S` right now". That is sound only while every app that ever holds `S` obeys the custody invariants in §3.8 rule 3. F2 protects the window plugin `P` and nothing else.
- **The direct arm does not read `S`'s auth.** The AVM already proved at submit time that `S` is `W.address` (un-rekeyed) or an account rekeyed to `W.address` (go-algorand `data/transactions/logic/eval.go:6085` calls `authorizedSender`, `:5478-5486`, before `Perform`).

### 3.2 Why the decided predicate is amended (each change is a correctness fix, not a preference)

| Change | Evidence | Failure if not applied |
|---|---|---|
| **Drop `sender.authAddress == W.address` (direct) and `sender.authAddress == callerApp.address` (plugin).** | go-algorand applies `RekeyTo` **before** the app runs, for outer txns (`ledger/eval/eval.go:1354`, before the type switch at `:1359`) and for inner txns (`ledger/eval/applications.go:316`, before the switch). Every plugin→target call that rekeys back carries `rekeyTo: rekeyAddress(rekeyBack, wallet)` (`FN:452-458`), e.g. `arc58/plugins/social/contract.algo.ts:158`, `arc58/plugins/auction/contract.algo.ts:138`. Inside the target, `S.auth` is then already `W.address`, or zero when `S == W.address`. | Every `rekeyBack=true` plugin call reverts, which covers almost every referral and gate site. |
| **Add `callerApp != 0`.** | At top level `Global.callerApplicationAddress` is the zero address (`algorand-typescript/op.d.ts:1197-1201`), and an un-rekeyed EOA also has auth == zero. | A factory-created wallet that its admin updated to arbitrary code (§4.2) sets `spending_address = attackerEOA`, and the attacker then passes the plugin arm from a top-level call. Even without the auth test, the plugin arm would accept a top-level call from any `S == W.spending_address`. |
| **`C == W.address` counts only if `authAddr(W.address) == zero`.** | `originOr` (`FN:224`) accepts `origin == W.address` unconditionally. PluginDex `walletControls` (`plugin-dex/hooks/shared/origin.ts:48-58`) also checks only that early return. `arc58_rekeyTo(E, false)` with `controlled == W.address` hands `W.address` to `E` (`AA:1000-1013`). | Escrow activity keeps being attributed to `W.address` after the admin gave it away, which contradicts "origin only while W still controls it". |
| **External `C` needs only `authAddr(C) == W.address`, not `authAddr(W.address) == zero`.** | Rekey is not transitive. App `W` can still sign for `C` while `W.address` is rekeyed (the authorizer is `W.address` = W's app address; `logic/eval.go:5478-5486`). | The stricter PluginDex clause would wrongly drop live control and costs an extra `A(W.address)` resource. |

### 3.3 PuyaTs API

**File `utils/principal.ts` (new).** It is self-contained: it imports only from `@algorandfoundation/algorand-typescript` (and `/arc4` if needed), and inlines its global key strings and error codes. The file is copied to `akita-plugin/principal.ts` by `scripts/sync-akita-plugin-principal.ts`, byte-for-byte except the Akita-only block between the `// @akita-sc-only:begin` and `// @akita-sc-only:end` marker lines, which the sync strips (amended 2026-10-04, Phase 0 review: the mirror is the module third parties import, so anything exported there is public). A unit test fails the build on drift (§5.4). It takes the wallet factory id as a parameter, so third parties do not need the DAO.

```ts
import { Account, Application, Bytes, Global, Txn, loggedAssert, loggedErr, op, uint64 } from '@algorandfoundation/algorand-typescript'

export const PRINCIPAL_KEY_CONTROLLED = 'controlled_address'   // = arc58/account/constants.ts / akita-plugin/constants.ts:5
export const PRINCIPAL_KEY_SPENDING   = 'spending_address'
export const PRINCIPAL_KEY_REFERRER   = 'referrer'

export const errHintNotWallet  = 'errHnwl'  // W != 0 and not created by the wallet factory (or does not exist)
export const errHintTopLevel   = 'errHtop'  // W != 0 on a top-level call (callerApplicationId == 0)
export const errHintNotBound   = 'errHnbd'  // neither direct (callerApp == W) nor plugin window (W.spending == sender)
export const errHintNotOwner   = 'errHnow'  // third-party write: W does not own the account at rest
export const errHintBadWallet  = 'errIwlt'  // reuse of utils/errors.ts:31 errInvalidWallet: malformed controlled_address

export type Principal = {
  wallet: uint64      // verified W, or 0
  principal: Account  // identity to use: origin when live, else spender
  origin: Account     // W.controlled_address when live, else zero address
  spender: Account    // the evaluated sender
  referrer: Account   // W.referrer (zero when W == 0, unset or malformed)
  viaPlugin: boolean  // true: plugin-window arm; false: direct arm or W == 0
}

/** creator(W) == appAddress(walletFactory); exists-checked; resource: P(W). */
export function isGenuineWallet(wallet: uint64, walletFactory: uint64): boolean

/** Live control of `controlled` by `wallet`, relative to `spender` (definition in §2).
 *  INTERNAL, not exported (Phase 0 review): it returns true for controlled == spender before any wallet
 *  check, so it is sound only for an AVM-authenticated first-hop sender or a stored pair. */
function walletControlsLive(wallet: uint64, controlled: Account, spender: Account): boolean

/**
 * Core, context-parameterised. `strict` reverts with the codes above; otherwise falls back to plain.
 * INTERNAL: F1 holds only if `sender` is the real Txn.sender of the call that observed `callerApp`.
 * Callers must copy (sender, callerApp) from Txn.sender / Global.callerApplicationId of an authenticated
 * first hop, and must authenticate that hop themselves (cf. PluginDex `requireDexCaller`,
 * plugin-dex/hooks/gated-fee.algo.ts:245). Not exported from @akta/plugin.
 */
function resolvePrincipalCtx(walletFactory: uint64, hint: uint64, sender: Account,
                             callerApp: uint64, callerAddr: Account, strict: boolean): Principal
/** Exported only from utils/principal.ts for PluginDex hooks (BeforeSwap); see the precondition above.
 *  Lives in the `@akita-sc-only` block, so the @akta/plugin mirror does not contain it. */
export function resolvePrincipalFromDexCtx(walletFactory: uint64, hint: uint64, sender: Account, callerApp: uint64): Principal

/** Write paths: Txn.sender + Global.callerApplicationId/Address, strict. */
export function resolvePrincipal(walletFactory: uint64, hint: uint64): Principal
/** Non-reverting for valid hints only (§3.1): invalid hints resolve as hint 0; a genuine wallet with
 *  uint64-typed bytes keys can still panic. For contextual quotes; never on third-party paths. */
export function tryResolvePrincipal(walletFactory: uint64, hint: uint64): Principal

/** Readonly cost methods (simulated top-level, callerApp == 0): genuine-only check. Same caveat as tryResolvePrincipal. */
export function quoteReferrer(walletFactory: uint64, hint: uint64): Account

/** At-rest ownership, no call context, no global reads: genuine(W) && ((A == W.address && auth(W.address)==0) || auth(A) == W.address).
 *  Resources: P(W), A(A), A(W.address) when A == W.address. False for an account rekeyed to an open window's plugin (E23). */
export function ownsAtRest(walletFactory: uint64, wallet: uint64, account: Account): boolean

/** Read-later principal from a STORED pair (W, stored), no global reads (§3.8 rule 2):
 *  stored == account ? account
 *  : ownsAtRest(W, account) && (stored == W.address ? auth(W.address) == 0 : auth(stored) == W.address) ? stored
 *  : account
 *  Resources: P(W), A(account), A(stored) or A(W.address). Never panics for any W (app_params_get returns ok=false). */
export function atRestPrincipal(walletFactory: uint64, account: Account, wallet: uint64, stored: Account): Account

/** QUOTE-ONLY read-later principal that reads W.controlled_address:
 *  !ownsAtRest ? account : (walletControlsLive(W, C, account) ? C : account).
 *  Can panic for a forged W (§3.1); allowed only where the hint's chooser is the only party affected (PluginDex Quote, previews). */
export function thirdPartyPrincipal(walletFactory: uint64, account: Account, wallet: uint64): Account

/** The verified context forwarded to gates (§3.5). Static 72-byte ARC-4 tuple. */
export type GateCtx = { principal: Account, wallet: uint64, spender: Account }
export function gateCtx(p: Principal): GateCtx                    // { p.principal, p.wallet, p.spender }
/** Sub-gate subject test: the account belongs to the verified actor. No call context needed, no global reads. */
export function ctxOwns(walletFactory: uint64, ctx: GateCtx, account: Account): boolean
//   account == ctx.principal || account == ctx.spender || (ctx.wallet != 0 && ownsAtRest(walletFactory, ctx.wallet, account))

/** Plugin side, inside the window: same answer the first-hop target computes for (wallet.id, S). */
export function pluginPrincipal(wallet: Application, walletFactory: uint64): Principal
//   asserts isGenuineWallet (errHnwl) and S.auth == Global.currentApplicationAddress (errNath, utils/errors.ts:30)

/** The only hint a plugin may forward from inside a window (§3.8 rule 6): wallet.id. */
export function windowHint(wallet: Application): uint64

// @akita-sc-only block (stripped from the @akta/plugin mirror): resolvePrincipalFromDexCtx (above) and tipWalletFor
/** Core of FN tipWallet (below), taking the factory instead of the DAO. */
export function tipWalletFor(walletFactory: uint64, creator: Account, stored: uint64): uint64
```

**The `walletFactory` parameter must be pinned by the integrator** (normative, repeated in `STANDARD.md` and the `@akta/plugin` JSDoc). Take it from your own deploy-time configuration or from your own DAO reference (`getAkitaAppList(this.akitaDAO.value).wallet`). Never derive it from anything reachable through `W`. A genuine wallet's admin can repoint the wallet's `akita_dao` global (`setAkitaDAO`, `AA:877-880`) at a fake DAO whose `wallet` entry is any factory. Every app that factory created would then pass `isGenuineWallet` for a consumer that trusted `AkitaAppList(W.akitaDAO).wallet`.

**DAO-aware wrappers in `FN` (new, additive).** Each resolves `F = getAkitaAppList(dao).wallet` (`FN:111-114`):
`principalOf(dao, hint)`, `tryPrincipalOf(dao, hint)`, `quoteReferrerOf(dao, hint)`, `ownsAtRestOf(dao, w, a)`,
`atRestPrincipalOf(dao, a, w, stored)`, `thirdPartyPrincipalOf(dao, a, w)` (quote-only), `ctxOwnsOf(dao, ctx, a)`,
`pluginPrincipalOf(dao, wallet)`, `gateCheckCtx(gateTxn, dao, ctx, id)` (the `mustCheckFor` twin of `FN:346-355`
`gateCheck`: it asserts `appArgs(0) == selector(Gate.mustCheckFor)`, `appArgs(1) == encode(ctx)` and `appArgs(2) == itob(id)`),
plus these referral helpers without the registry:

```ts
export function referralFeeTo(dao: Application, referrer: Account, asset: uint64): uint64            // body of FN:726-735 minus 727-728
export function sendReferralPaymentTo(dao: Application, referrer: Account, asset: uint64, amount: uint64): ReferralPaymentInfo  // FN:751-778 minus 752-753
export function tipWallet(dao: Application, creator: Account, stored: uint64): uint64
//   stored != 0 && ownsAtRestOf(dao, stored, creator) && walletControlsLive(stored, C(stored), creator) ? stored : 0
```

`tipWallet` reads `C(stored)`, a global of the **creator's** wallet, on a path other users complete (tips, replies, votes, reactions). This is a deliberate exception to §3.8 rule 2. The ARC-58 tip route then calls into that same wallet's code (`social/contract.algo.ts:349-360`, `arc58_rekeyToPlugin`), so an admin-updated creator wallet can make tips to its own posts revert whatever this helper does. The only party harmed is the creator, who could gate the posts anyway (residual R-CREATOR, §4.3). Inside the creator's own default window, `ownsAtRest` is false (E23). A creator who replies to their own post from a default window therefore takes the direct-tip path. This is accepted.

The existing registry helpers stay but are renamed with a `legacy` prefix in Phase 1. They are used only by legacy shims (§7.2):
`legacyWalletOf` (= `getWalletIDUsingAkitaDAO`), `legacyOriginOr`, `legacyReferralFee`, `legacySendReferralPayment(For)`.

**`@akta/plugin` (`akita-plugin/index.ts`).** Export everything from `principal.ts` except `resolvePrincipalCtx`/`resolvePrincipalFromDexCtx`, which are not part of the third-party surface. (Amended 2026-10-04: puya-ts cannot import from `index.ts`, so contracts import `@akta/plugin/principal`, the mirror itself. Non-export from `index.ts` alone is therefore not a boundary: `resolvePrincipalCtx` and `walletControlsLive` are module-private, and `resolvePrincipalFromDexCtx`/`tipWalletFor` are stripped from the mirror. `windowHint` is exported.) Also export `controls`, which is defined at `akita-plugin/functions.ts:168-170` but not exported at `index.ts:5-14`. Add JSDoc that `getOriginAccount`, `getAccounts().origin` and `getReferrerAccount` (`akita-plugin/functions.ts:66-105`) are **display only, not identity**. Bump the version 1.1.0 → 1.2.0 (`akita-plugin/package.json:3`). Note that `akita-plugin`'s `isAkitaWallet` uses `walletFactory.address`, which needs P(factory). The new `isGenuineWallet` hashes the address instead (resource-free).

### 3.4 Edge cases and their decided behaviour

| # | Situation | Behaviour | Test |
|---|---|---|---|
| E1 | `W == 0` (EOA or any caller) | principal = `S`, referrer zero | T01, T02 |
| E2 | Default grant, `S == C == W.address`, `rekeyBack` true or false | plugin arm; principal `W.address` | T06 |
| E3 | External controlled `C` rekeyed to `W`, default grant (`S == C`) | principal `C` (shortcut `C == S`) | T07 |
| E4 | Named-escrow or `defaultToEscrow` window (`S` = escrow app). `current_plugin.escrow` may be `''` (`AA:1203-1208`), so compare addresses only | principal `C` if live; needs A(W.address) or A(C) | T08, T09 |
| E5 | Arbitrary-address escrow (`arc58_newEscrow(name, addr)`, `AA:369`) | works with no registration; principal `C` | T10 |
| E6 | External `C` rekeyed away permanently (`arc58_rekeyTo(E,false)`) | principal = `S`, `origin` zero, referrer still `W.referrer` | T11 |
| E7 | `W.address` (= `C`) rekeyed away | escrow windows: principal = escrow. Default windows can no longer open (`AA:1099-1105` needs W to sign for `C`) | T12 |
| E8 | Flash rekey of `C` to EOA `E`; `E` signs a direct call | hint `W`: revert `errHtop`. Hint 0: principal `C`. Must keep working after the Q2 wallet change (flash returns use the controlled-address shortcut) | T13 |
| E9 | Proxy chain A → B, with B handing `S` back before it returns (§3.8 rule 3) | passes; caller = B | T14 |
| E10 | Hint names a different genuine wallet than the open window | `errHnbd` | T15 |
| E11 | Plugin sends as its own address with hint `W` | `errHnbd` (`S == callerAddr` or `S != spending`) | T16 |
| E12 | Nested call P → X → Y, with Y evaluating the hint | `errHnbd`: Y sees `callerApp = X`, `S = X.address`. Verify at the first hop and forward (§3.5) | T17 |
| E13 | Fake app (creator ≠ factory), deleted app, or nonexistent id | `errHnwl` | T04, T05, T33, T34 |
| E14 | Admin-updated ("forged") wallet: direct arm | principal bounded to `W.address` or accounts rekeyed to `W.address` | T18 |
| E15 | Forged wallet, `spending_address = attackerEOA`, top-level call | `errHtop` | T19 |
| E16 | Forged `controlled_address = victim` (victim not rekeyed to W) | principal = `S`, never the victim | T21 |
| E17 | Forged `referrer` | returned as is: self-asserted, no third-party harm (pre-existing) | T22 |
| E18 | Stale window (`AA:428-433` shortcut, §4.3), including the single-admin-group construction | plugin arm keeps passing for `P` in later groups: **documented residual**, see Q2 | T25 |
| E19 | Readonly quote, simulated top-level | `quoteReferrer`: genuine ⇒ `W.referrer`, else zero. Never reverts for valid hints; a forged wallet with a uint64 `referrer` panics (caller-only harm) | T26, T35 |
| E20 | Malformed globals (missing, short, or uint64-typed `controlled_address`/`spending_address`/`referrer`) | strict: `errIwlt` / `errHnbd`, or an AVM panic for uint64-typed values. `atRestPrincipal`/`ctxOwns`/`ownsAtRest`: unaffected (no global reads) | T35 |
| E21 | Window opened by inner composition (`FN:502-541` `arc58OptInAndSend`, `mocks/inner-wallet-caller`) | passes; `rekey_index` is not used | T37 |
| E22 | Hint omitted (`W = 0`) by a custom plugin or a direct caller | principal = `S`, no referral. Accepted (Q6) | T02 |
| E23 | Third-party or at-rest check evaluated **inside the subject's own window** (e.g. `Wd` default grant, so `W.address` is rekeyed to `P` while the gate txn runs before the target; subscriber = escrow `E`) | `ownsAtRest(W, E)` is true but `live(W, W.address, E)` is false. The same holds for an external `C` rekeyed to `P`. Gates must therefore never re-derive liveness; they use the forwarded `ctx` (`ctxOwns`). Accepted where no `ctx` exists: `tipWallet` on self-replies (direct-tip path), `atRestPrincipal` for a subscription self-trigger without a matching hint (§6.4) | T38–T40 |
| E24 | Stored pair re-checked later after the wallet admin changed globals (forged uint64 `controlled_address`, deleted keys) | `atRestPrincipal` ignores globals: the result depends only on `AppCreator(W)` and `AuthAddr`. Third-party disqualification (`StakingPool.gateCheck`) cannot be blocked | T46 |
| E25 | An app holds `S` outside a pinned window (a proxy left holding `S` with `rekeyBack=false`, or standing custody such as a leg escrow) and accepts a caller-chosen `wallet` | the plugin arm would pass for any forged `Wf` with `spending_address = S`. Forbidden by §3.8 rule 3; compliant plugins reject it | T41, T42 |
| E26 | Wallet admin repoints `akita_dao` at a fake DAO (`AA:877-880`) | no effect: `F` is pinned by the consumer (§3.3) | T43 |
| E28 | Escrow-window social activity (posts and streaks keyed by escrow `E`) evaluated by a `social-activity` gate whose subject is principal `C` | evaluates `C`'s state, not `E`'s (Q4/Q5 decide) | P2-SOC-04 |
| E27 | `resolvePrincipalCtx` fed an unauthenticated `sender` (PluginDex Quote `swapper`, `plugin-dex/contract.algo.ts:1276-1281`) | forbidden: Quote uses `thirdPartyPrincipal(F, swapper, wallet)` only (§6.12) | P2-DEX-03 |

### 3.5 Nested calls and forwarding

Only the first hop can evaluate the predicate. Downstream contracts must accept a forwarded `{principal, wallet, referrer}` only from allow-listed callers. The existing patterns already do this: the factory → child `create` (Listing `marketplace/listing.algo.ts:330`, Auction `auction/contract.algo.ts:592`, Raffle `raffle/contract.algo.ts:357`) and Gate → sub-gate (`gates/contract.algo.ts:168-173`).

Two forwarding paths are added:

1. `sellerReferrer` into the child `create` (§6.6–6.8).
2. **The verified context into gates.** A gate txn is a `gtxn` argument. It executes *before* the target call and before that call's `RekeyTo` is applied (e.g. the social plugin builds `Gate.mustCheck` with `sender = S` and then calls `gatedReply`, `arc58/plugins/social/contract.algo.ts:249-262`). So during a default grant, `C`/`W.address` is still rekeyed to `P` while sub-gates run, and any liveness test there fails (E23). The target therefore pins the whole context in the gate call. Gate v2 gains `mustCheckFor(ctx: GateCtx, gateID, args)` and a readonly `checkFor`. The target asserts `appArgs(1) == encode(p.principal, p.wallet, p.spender)` through `gateCheckCtx` (§3.3). The Gate passes `ctx` to sub-gates that are flagged context-aware and passes `ctx.principal` as the plain `caller` to all others (§6.9). Because `ctx.wallet` is the caller's own verified wallet, a context-aware sub-gate cannot be used to gift a subscription or referral across users.

### 3.6 Resource requirements (SDK must place these on top-level transactions)

Targets are reached by **inner** calls from plugins, and inner calls cannot carry Access lists (`ACCESS_LIST_AUDIT.md` rule 8, line 43). Resources are shared group-wide for AVM v9+ (rule 3). `wallet` is a `uint64`, so no foreign-app entry is added implicitly.

| Read | Resource | When |
|---|---|---|
| `appCreator(W)`, W globals | `P(W)` | always when `W != 0` (usually already present: the plugin reads W) |
| factory address | none (`sha512_256` hash, `FN:263-266`) | — |
| `AkitaAppList.wallet` | `P(DAO)` | already present everywhere |
| `Txn.sender`, `Global.callerApplication*` | none | — |
| `authAddr(W.address)` | `A(W.address)`. Under Access an app ref does **not** imply its account (`ACCESS_LIST_AUDIT.md` line 24) | `C == W.address` and `S != C`: the escrow window of a default wallet, **the common case** |
| `authAddr(C)` | `A(C)` | `C` external and `S != C`: the escrow window of an external-controlled wallet |
| `ownsAtRest(W, A)` | `P(W)`, `A(A)`, `A(W.address)` if `A == W.address` | third-party reads |
| `atRestPrincipal(A, W, stored)` | as `ownsAtRest`, plus `A(stored)` (or `A(W.address)` when `stored == W.address`) | `'i'` box re-checks (§6.4–6.5) |
| `ctxOwns(ctx, A)` | as `ownsAtRest` when `A ∉ {ctx.principal, ctx.spender}` | context-aware sub-gates |
| removed | `P(EscrowFactory)`, `B(EscrowFactory, bytes16(S))` and one inner txn (1,000 µA fee) per lookup | every old registry read (`FN:293-305`) |

The SDK central preparer (`ACCESS_LIST_AUDIT.md` lines 47-60) discovers these through simulation. `populateAppCallResources: true` paths discover them too.

### 3.7 Opcode cost (measured by T32; bound 210)

**Measured (T32, LocalNet, 2026-10-04; unchanged in the final run of 2026-10-05).** `Global.opcodeBudget` delta around
`principalOf(dao, W)` in `MockPrincipalProbe.probeCost`. The value includes the `AkitaAppList` read, the subroutine
call overhead and about 7 ops of probe harness:

| Window | Liveness path | Measured ops |
|---|---|---|
| T06 default window (`S == C == W.address`) | `controlled == spender` shortcut | **184** |
| T08 named-escrow window (`C == W.address`, `S` = escrow) | `app_params_get AppAddress` + `authAddr(W.address) == 0` | **194** |
| T11 escrow window, external `C` rekeyed away | `app_params_get AppAddress` + `authAddr(C) == W.address` | **196** |

**Bound: 210 ops** (Kyle, 2026-10-04; the original bound was 150). T32 in `utils/principal.e2e.spec.ts` asserts
`<= 210` for each window. The bound leaves 14 ops above the measured maximum (T11). A change to `principal.ts` that
costs more turns T32 red; that is intended, so the cost change goes back to Kyle. 196 ops is about 28% of one app
call's 700-op budget (pooled across the group). The 150 bound cannot be met while the wallet factory address is
hashed (`sha512_256`, 45 ops), because the helper takes no `P(walletFactory)` resource (§3.6).

The step estimate below left out subroutine and frame overhead, the ARC-4 encoding of `Principal` (about 17 ops) and
the probe harness. It is kept as a per-step guide:

| Step | ≈ ops |
|---|---|
| `hint == 0` early return | 5 |
| `getAkitaAppList(dao).wallet` (global get + extract) | 8 |
| `appAddress(F)`: concat + `sha512_256` (cost 45) | 48 |
| `app_params_get AppCreator` + compare | 4 |
| caller checks + spending read/len/compare | 12 |
| controlled read/len + 1–2 `acct_params_get AuthAddr` | 12 |
| referrer read/len | 6 |
| struct assembly | 8 |
| **Total, strict path** | **≈ 100–110** estimated (budget 700 per app call, pooled); **measured 184–196** including the AkitaAppList read and call overhead (above) |

This is cheaper than today: each registry lookup costs an inner app call (1,000 µA fee plus the EscrowFactory program) and a box reference. The helper uses no AVM ≥ 12 opcodes, so consumers stay at AVM 11 (`AkitaSocial`/`Marketplace` are v11 today).

### 3.8 Integrator invariants (normative; copied verbatim into `STANDARD.md` and the `@akta/plugin` README)

1. **First hop only.** Evaluate `resolvePrincipal` only where `Txn.sender` is the acting account. Never re-derive the acting party's liveness downstream. Forward `ctx` (§3.5) instead, and test ownership with `ctxOwns`.
2. **Third-party paths never read wallet globals.** If a party other than the subject must be able to complete a path (disqualification, keeper trigger, settlement), store `(W, principal)` at interaction time and re-check it with `atRestPrincipal`. That helper reads only `AppCreator` and `AuthAddr`, so a wallet admin cannot make it panic afterwards. `tryResolvePrincipal`, `quoteReferrer` and `thirdPartyPrincipal` are for quotes whose hint the caller chose. Exception: `tipWallet` (§3.3).
3. **Custody.** The plugin arm attests "the calling app holds `S` now" (§3.1), so every app that can hold `S` must obey these rules:
   - (a) Never send as `getSpendingAccount(wallet)` (or `getControlledSpendingAccount`) when that account is one the plugin holds outside the wallet's window. Standing custody includes leg escrows, pool escrows and stale escrows. Precedent: the PluginDex custody hooks that receive pool escrows (`plugin-dex/contract.algo.ts:740`).
   - (b) A proxy may hold `S` only within a single call from `P`. Rekey `S` to `B` in the same inner group as the `B` call. `B` must hand `S` back (to `P` or `W.address`) before it returns. `P` must not invoke any other app while `B` holds `S`. The `test-proxy-rekey` pattern with `rekeyBack=false` (`arc58/plugins/test-proxy-rekey/contract.algo.ts:33-51`) leaves `S` with `B` after `P` returns. Any app can then call `B` with a forged `Wf` (`spending_address = S`) and attribute `S`'s action to `Wf`, or spend `S` through `B`. That pattern is test-only and must not ship.
   - (c) Never rekey `S` to a caller-chosen app.
4. **Pin the wallet factory** (§3.3). Never take `F` from `W`'s own globals.
5. **Pass the hint last, as `uint64`.** Pass `0` when acting as yourself.
6. **A plugin hints its own window only** (added 2026-10-04, Phase 0 review). A plugin must pass exactly the wallet whose window it serves (its pinned first argument, `wallet.id`; use `windowHint(wallet)`) as the hint, never a value the caller supplies. A proxy `B` must receive that value from `P` and forward it unchanged. Reason: F2 pins only the plugin's `appArgs(1)`; the plugin arm binds any other hint `Wf` to `S` only through `Wf.spending_address`, which an admin-updated (forged) wallet sets freely. A plugin method that forwards a caller-chosen hint therefore lets anyone attribute the open window's `S` to `Wf`'s controlled address and referrer (T47).
