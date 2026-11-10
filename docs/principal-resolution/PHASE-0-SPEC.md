# Principal Resolution — Phase 0 Spec

Status: approved; §8 decided by Kyle on 2026-10-04 (all recommended defaults); §9.4 deviations K1–K9 decided by Kyle on 2026-10-04 (all recommendations accepted). T32 bound decided by Kyle on 2026-10-04 (210 ops, §9.6). Phases 0–3 implemented in code, verified on LocalNet, not deployed and not committed. Final verification 2026-10-05 (§9): V0 suite 56/56 (T32 184/194/196 ops, bound 210), every e2e group green, full suite 140 files passed / 1 skipped by design, 2,398 tests passed / 0 failed / 1 skipped / 9 todo. P1 (legacy social referral MBR) decided by Kyle on 2026-10-05: no absorption (§9.6). No decision is open. Originally drafted for Kyle's review on 2026-10-04. Audience: Kyle, plus the engineers and agents implementing Phases 0–4.

Path conventions: paths are relative to `projects/akita-sc/smart_contracts/` unless they start with `akita-sdk/`
(= `projects/akita-sdk/`), `akita-plugin/` (= `projects/akita-plugin/`), `scripts/` (= `projects/akita-sc/scripts/`),
`tests/` (= `projects/akita-sc/tests/`, included by `projects/akita-sc/vitest.config.mts:20-25`), `docs/` (= the repo-root
`docs/`) or `go-algorand/` (= the local checkout `/Users/kylebreeding/algorand/go-algorand`, commit `3f8045596`, 2026-09-09).
`AA` = `arc58/account/contract.algo.ts`, `FN` = `utils/functions.ts`. Line numbers are from the **uncommitted working tree**
on 2026-10-04. `HEAD` (`e7f174ee`, 2026-07-21) is the last commit; MainNet runs older bytecode still (§7.1, "Compatibility
baseline"). A citation marked `HEAD:` refers to the committed file.

---

## 1. Summary

1. **Problem.** Identity, referral and gate subjects are resolved through the EscrowFactory reverse registry (`FN:285-305` → `EscrowFactory.get`). The registry goes stale when a wallet's controlled account is rekeyed away (`AA:1000-1013`), and it can never hold arbitrary-address sub-accounts (`AA:351-376`) or external controlled addresses (it only maps app addresses, `escrow/factory.algo.ts:80-103`).
2. **Decision (Kyle).** Drop on-chain reverse lookup. Callers pass a wallet hint `W`. Contracts verify `W` live against the authenticated call context and derive the principal from it. Third-party sites verify at interaction time, store `W`, and re-derive later.
3. **Corrections to the decided predicate.** Three corrections are required, all verified against the code and go-algorand source (§3.2). Drop every `sender.authAddress` test, because `RekeyTo` is applied before the callee runs. Require `Global.callerApplicationId != 0`. Count `W.address` as controlled only while it is not rekeyed.
4. **Two rules added after review (§3.8).** (a) Only the first hop judges the acting party's liveness. Downstream checks, gates in particular, receive the first hop's verified context `(principal, wallet, spender)` and never re-derive it, because at-rest tests give false negatives inside the acting wallet's own window. (b) Paths that a third party must be able to complete (disqualification, keeper triggers) never read a wallet's globals. They read a `(W, principal)` pair stored at interaction time and re-check it with `AppCreator` and `AuthAddr` only.
5. **Phase 0 delivers.** It delivers the standard, the helper `utils/principal.ts` (mirrored into `@akta/plugin`) and an adversarial LocalNet test suite that proves every spoof attempt fails. It also delivers the exact per-method change list, the rollout order and the open questions for Phases 1–4.
6. **Phase 0 scope.** Phase 0 changes no deployed or existing contract. All its code goes in new files, plus additive exports, so existing artifact bytecode stays byte-identical.

---

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

### 3.3 PuyaTs API to add

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

`tipWallet` reads `C(stored)`, a global of the **creator's** wallet, on a path other users complete (tips, replies, votes, reactions). This is a deliberate exception to §3.8 rule 2. The ARC-58 tip route then calls into that same wallet's code (`social/contract.algo.ts:349-360`, `arc58_rekeyToPlugin`), so an admin-updated creator wallet can make tips to its own posts revert whatever this helper does. The only party harmed is the creator, who could gate the posts anyway (residual R-CREATOR, §4.3). (Corrected 2026-10-05, review finding SOCIAL-1: on the legacy route the tipper is also harmed, because the opt-in check reads the creator but the route opts in and pays the wallet's origin, so a creator who opts the origin out after each tip makes every tipper pay the 0.1 ALGO opt-in again, and an escrow creator makes every tip revert. Hinted calls now choose the route on the account that receives the remainder (`social/base.ts` `tipRoute`). Deployed plugins keep the legacy route because they quote it. Residual: a creator who closes the origin's AKTA holding by hand after each tip still re-charges the next tipper.) Inside the creator's own default window, `ownsAtRest` is false (E23). A creator who replies to their own post from a default window therefore takes the direct-tip path. This is accepted.

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
| E25 | An app holds `S` outside a pinned window (a proxy left holding `S` with `rekeyBack=false`, or standing custody such as the router's leg escrow) and accepts a caller-chosen `wallet` | the plugin arm would pass for any forged `Wf` with `spending_address = S`. Forbidden by §3.8 rule 3; compliant plugins reject it (router precedent `arc58/plugins/akita-router/contract.algo.ts:262-276`) | T41, T42 |
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

**Measured (T31, LocalNet, Access-list mode, 2026-10-04).** Both groups succeed through `prepareGroup`/`sendPrepared`. The preparer lists exactly one `A(...)` entry for the liveness read in each case. Stripping it makes the node reject the group:

| Case | Stripped | Observed |
|---|---|---|
| T08 `Wd` escrow window (`C == W.address`, `S` = escrow) | 1 × `A(Wd.address)` | rejected: `inner tx 0 failed: logic eval error: unavailable Account <Wd.address>` |
| T11 `Wx` escrow window, `C` rekeyed away (`S` = escrow) | 1 × `A(Cx)` | rejected: `inner tx 0 failed: logic eval error: unavailable Account <Cx>` |

So `A(W.address)` is **not** implicitly available, although `Wd` is the called app of `arc58_rekeyToPlugin` in the same group: under Access lists an app reference does not bring its account. Both rows marked "A(...)" in the table above are hard requirements. The SDK must place them on a top-level transaction, because the read happens in an inner call.

### 3.7 Opcode cost (estimate below; T32 measured it)

**Measured (T32, LocalNet, 2026-10-04).** `Global.opcodeBudget` delta around `principalOf(dao, W)` in `MockPrincipalProbe.probeCost`. The value includes the `AkitaAppList` read, the subroutine call overhead and about 7 ops of probe harness (its own `akita_dao` read):

| Window | Liveness path | Measured ops |
|---|---|---|
| T06 default window (`S == C == W.address`) | `controlled == spender` shortcut | **184** |
| T08 named-escrow window (`C == W.address`, `S` = escrow) | `app_params_get AppAddress` + `authAddr(W.address) == 0` | **194** |
| T11 escrow window, external `C` rekeyed away | `app_params_get AppAddress` + `authAddr(C) == W.address` | **196** |

Breakdown of 184 (static count of the compiled TEAL; it matches the measurement within 2 ops): probe harness ≈ 7, `principalOf` (AkitaAppList read, call-context reads, call) ≈ 17, `isGenuineWallet` ≈ 69 (of which `sha512_256` = 45), plugin-arm check ≈ 26, `controlled_address` read ≈ 9, liveness ≈ 11, `referrer` read ≈ 11, branches and struct assembly ≈ 34. The estimate below left out subroutine/frame overhead and ARC-4 struct encoding. All three values exceed the original T32 bound of 150; Kyle raised the bound to 210 on 2026-10-04 (§9.6 option (a)). They are about 28% of one app call's 700-op budget. The bound cannot be met while the factory address is hashed (no `P(factory)`, §3.6): see IMPLEMENTATION-LOG.md, 2026-10-04 V0 e2e run.

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
| **Total, strict path** | **≈ 100–110** (budget 700 per app call, pooled); measured 184–196 including AkitaAppList read and call overhead (above) |

This is cheaper than today: each registry lookup costs an inner app call (1,000 µA fee plus the EscrowFactory program) and a box reference. The helper uses no AVM ≥ 12 opcodes, so consumers stay at AVM 11 (`AkitaSocial`/`Marketplace` are v11 today).

### 3.8 Integrator invariants (normative; copied verbatim into `STANDARD.md` and the `@akta/plugin` README)

1. **First hop only.** Evaluate `resolvePrincipal` only where `Txn.sender` is the acting account. Never re-derive the acting party's liveness downstream. Forward `ctx` (§3.5) instead, and test ownership with `ctxOwns`.
2. **Third-party paths never read wallet globals.** If a party other than the subject must be able to complete a path (disqualification, keeper trigger, settlement), store `(W, principal)` at interaction time and re-check it with `atRestPrincipal`. That helper reads only `AppCreator` and `AuthAddr`, so a wallet admin cannot make it panic afterwards. `tryResolvePrincipal`, `quoteReferrer` and `thirdPartyPrincipal` are for quotes whose hint the caller chose. Exception: `tipWallet` (§3.3).
3. **Custody.** The plugin arm attests "the calling app holds `S` now" (§3.1), so every app that can hold `S` must obey these rules:
   - (a) Never send as `getSpendingAccount(wallet)` (or `getControlledSpendingAccount`) when that account is one the plugin holds outside the wallet's window. Standing custody includes leg escrows, pool escrows and stale escrows. Precedent: the router's `spender != legEscrow` guard (`arc58/plugins/akita-router/contract.algo.ts:262-276`), and the PluginDex custody hooks that receive pool escrows (`plugin-dex/contract.algo.ts:740`).
   - (b) A proxy may hold `S` only within a single call from `P`. Rekey `S` to `B` in the same inner group as the `B` call. `B` must hand `S` back (to `P` or `W.address`) before it returns. `P` must not invoke any other app while `B` holds `S`. The `test-proxy-rekey` pattern with `rekeyBack=false` (`arc58/plugins/test-proxy-rekey/contract.algo.ts:33-51`) leaves `S` with `B` after `P` returns. Any app can then call `B` with a forged `Wf` (`spending_address = S`) and attribute `S`'s action to `Wf`, or spend `S` through `B`. That pattern is test-only and must not ship.
   - (c) Never rekey `S` to a caller-chosen app.
4. **Pin the wallet factory** (§3.3). Never take `F` from `W`'s own globals.
5. **Pass the hint last, as `uint64`.** Pass `0` when acting as yourself.
6. **A plugin hints its own window only** (added 2026-10-04, Phase 0 review). A plugin must pass exactly the wallet whose window it serves (its pinned first argument, `wallet.id`; use `windowHint(wallet)`) as the hint, never a value the caller supplies. A proxy `B` must receive that value from `P` and forward it unchanged. Reason: F2 pins only the plugin's `appArgs(1)`; the plugin arm binds any other hint `Wf` to `S` only through `Wf.spending_address`, which an admin-updated (forged) wallet sets freely. A plugin method that forwards a caller-chosen hint therefore lets anyone attribute the open window's `S` to `Wf`'s controlled address and referrer (T47).

---

## 4. Security argument

### 4.1 The two facts everything rests on

- **F1. The AVM authenticates the sender of every inner txn.** `authorizedSender` requires `authorizer(S) == address(callerApp)` immediately before `Perform` (`go-algorand/data/transactions/logic/eval.go:5478-5486`, `:6085`). So `callerApp != 0 && S != callerAddr` ⇒ `S` was rekeyed to the calling app when it was called. `callerApp == W` ⇒ `S` is `W.address` or rekeyed to it.
- **F2. Windows cannot be borrowed.**
  - *No re-entry:* an inner app call to any app already on the call stack fails with "attempt to re-enter" (`logic/eval.go:5975-5982`).
  - *Window pinning:* every app call after `arc58_rekeyToPlugin` must go to the installed plugin with `appArgs(1) == W`, at version 0, until the rekey back (`AA:546-553`). This is checked over `gtxn`, which is the inner group when the window is opened by an inner call.
  - So while `S` is rekeyed to `P` for wallet `W2`, `P` can only be invoked with `wallet = W2`. A forged `W` claiming `spending_address = S` can never be presented by `P` to a target during that window.

### 4.2 Spoof attempts

| Attack | Why it fails | Test |
|---|---|---|
| **Fake app** claiming to be a wallet (e.g. `mocks/fake-wallet` self-registered in EscrowFactory) | creator ≠ `appAddress(AkitaAppList.wallet)` ⇒ `errHnwl` | T05, T33 |
| **Admin-updated wallet forging globals.** `AA.update` (`AA:843-853`) lets the admin install any program; the creator stays the factory, so it passes `isGenuineWallet` | Identity is bounded to accounts the forger already controls. Direct arm (F1): `S` ∈ forger's custody. Plugin arm: `S` must be rekeyed to the caller app; by F2 a plugin serving someone else's window never carries the forged hint; at top level `errHtop`. Liveness for `C ≠ S` needs `authAddr(C) == W.address` (custody again). **Residual:** the forged `referrer` is self-asserted, as it is today; it is the forger's own fee rebate | T18–T22 |
| **Foreign plugin window** (hint `W1` while `W2`'s window is open) | `W1.spending_address != S` ⇒ `errHnbd`. Overlapping windows of two wallets in one group are impossible (F2: `W2`'s `assertValidGroup` rejects any other app call) | T15, T24 |
| **Window borrowing by re-entrancy** (an attacker app reached mid-window calls `P(W_forged)`) | AVM re-entry ban (F2) | T23 |
| **Window borrowing by composition** (`X` composes `[W2.rekeyToPlugin(P), P(W_forged), …]`) | `AA:553` rejects `appArgs(1) != W2` in the inner group too | T24 |
| **Proxy chains and standing custody** | F2 constrains only the window plugin `P`, not `B` or any other app holding `S`. If `B` keeps `S` after `P` returns (`rekeyBack=false`), or an app holds an account permanently (leg escrow, pool escrow, stale escrow) and accepts a caller-chosen `wallet`, then any caller can present a forged `Wf` with `spending_address = S`. The plugin arm then binds `S`'s action to the forger's identity and referrer, and the same app lets the caller spend `S`. This is **not** neutralised by the predicate. It is prevented only by the custody invariants (§3.8 rule 3), which every Akita plugin must satisfy and which third-party plugins are told to satisfy | T14, T41, T42 |
| **Flash rekey to an EOA** | `E` signs at top level ⇒ `errHtop` with a hint; hint 0 gives principal `C`, which is truthful | T13 |
| **Controlled account rekeyed away** | live test fails ⇒ principal = spender; the former origin is never named | T11 |
| **Arbitrary sub-account** | `S` = the address escrow, which `W` holds the window for (plugin arm). Third-party: `authAddr(A) == W.address` (at rest) ⇒ owned. No registration exists or is needed | T10, T28 |
| **`W`'s own address rekeyed** | `C == W.address` live only if `authAddr(W.address) == 0` | T12 |
| **Middle-contract caller** | Y sees `callerApp = X` and `S = X.address` ⇒ `errHnbd`; X must forward from an allow-list | T17 |
| **App sending as itself with a forged `spending_address = X.address`** (X relays a caller-chosen hint) | `sender != callerAddr` in the plugin arm ⇒ `errHnbd` (E11). Without that clause the forger's wallet and referrer would be attached to every action X takes as itself | T16b |
| **Forged hint forwarded through an honest window** (a plugin method, or a proxy fed by it, forwards a caller-chosen hint `Wf` with `Wf.spending_address = S` and `Wf.controlled_address = A` rekeyed to `Wf`) | **Not** neutralised by the predicate: F2 pins only `appArgs(1)`, so `Wf` resolves to `A` with `Wf`'s referrer. Prevented only by §3.8 rule 6 (hint = `windowHint(wallet)`), which every Akita plugin must satisfy | T47 (negative control + compliant `windowHint` path) |
| **Top-level spoof via zero address** (`callerAddr == 0 == EOA auth`) | `callerApp != 0` required | T19 |
| **Static ownership via a forged `spending_address`** (third-party reads) | `ownsAtRest` has **no** `A == W.spending_address` clause: that global is forgeable. This deliberately drops the third clause proposed in the gate research | T28 |
| **Gate gifting via a forged `controlled_address`** (relaxing at-rest liveness to `C == caller`) | Not done (E23). A forged wallet could own subscriber `A` at rest and rotate `controlled_address` through unlimited friends. Gates instead receive `ctx` from the first hop, where `ctx.wallet` is the caller's own verified wallet | T38, T40 |
| **Type confusion on read-later paths** (a forged wallet stores a uint64 under `controlled_address`/`referrer`/`spending_address`, or deletes them, after an honest interaction) | Third-party paths use the stored pair and `atRestPrincipal`, which reads no globals (§3.8 rule 2). A forged `Wf` cannot make `StakingPool.gateCheck` or `gatedTriggerPayment` panic | T35, T46 |
| **Unauthenticated context** (`swapper`/`caller` chosen by the caller and fed to `resolvePrincipalCtx`) | The ctx variant is internal and documented with its precondition. The PluginDex Quote point uses `thirdPartyPrincipal` instead (§6.12) | P2-DEX-03 |
| **Fake DAO** (`setAkitaDAO`, `AA:877-880`) pointing at a DAO whose `wallet` is a rogue factory | Consumers pin `F` (§3.3, §3.8 rule 4) | T43 |

### 4.3 Documented residuals (not fixed by Phase 0)

- **R-STALE.** `txnRekeysBack` accepts an outer txn from `controlledAddress` that rekeys it to `W` (`AA:428-433`), and that path never clears `spending_address`/`current_plugin`. If the admin rekeyed `C` to an EOA, an escrow window can end with the escrow still rekeyed to `P` and the state stale (concrete group in the semantics notes §1.4). Afterwards `P`, or anyone able to invoke `P`, passes the plugin arm **and** can spend the escrow through `P`, which is a pre-existing custody issue. It requires the admin's own action. The fix is a wallet change (Q2).
  The trigger is wider than one stale flash. `assertRekeysBack` (`AA:443-454`, used by `arc58_rekeyTo(flash=true)` at `AA:1000-1013`) shares `txnRekeysBack` (`AA:426-441`) with `assertValidGroup` (`AA:531`). So a single admin-signed group produces R-STALE while it still satisfies the flash return: `[W.arc58_rekeyTo(E, true), W.arc58_rekeyToPlugin(P, escrow), P.m(W, rekeyBack=false), pay C→C rekeyTo W.address (signed by E)]`. The window check and the flash check are both satisfied by the last txn. In a variant, `P.m(W, true)` plus `arc58_verifyAuthAddress` as the "flash return" leaves `C` with `E`, although `flash=true`. That variant is admin-only and equivalent to `flash=false`.
- **R-CREATOR.** `tipWallet` and the ARC-58 tip route read and call the creator's own wallet (§3.3). A creator whose wallet was admin-updated to hostile code can make tips, replies, votes and reactions on their own posts revert. This is self-harm only, it is pre-existing (`getOriginAccount` panics the same way today, `FN:246-253`), and the creator can gate the posts anyway.
- **R-REFERRER.** `referrer` is self-chosen at creation (`arc58/account/factory.algo.ts:85,159`) and rewritable by an admin who updates the wallet to arbitrary code. The akita-referrer gate stays self-asserted. Making it trustworthy would require the factory to record it (out of scope).
- **R-FACTORY.** Genuineness is pinned to the current `AkitaAppList.wallet` (`arc58/dao/types.ts:244`). The wallet factory (MainNet 3569556257) must only ever be upgraded in place. The DAO wallet itself is factory-created (`arc58/dao/contract.algo.ts:889-917`).

---

## 5. Phase 0 deliverables

### 5.1 Code (new files, plus additive exports only)

| File | Content |
|---|---|
| `utils/principal.ts` | §3.3 core |
| `utils/functions.ts` | **additive only**: DAO wrappers, `referralFeeTo`, `sendReferralPaymentTo`, `tipWallet`. Legacy renames wait for Phase 1, so no existing bytecode changes in Phase 0 |
| `utils/errors.ts` | re-export `errHnwl`, `errHtop`, `errHnbd`, `errHnow` (collision-checked: no existing use in the repo) |
| `akita-plugin/principal.ts`, `akita-plugin/index.ts`, `akita-plugin/package.json` | mirror + exports + version bump (§3.3) |
| `scripts/sync-akita-plugin-principal.ts` | copies `utils/principal.ts` → `akita-plugin/principal.ts` |
| `mocks/principal-probe/contract.algo.ts` | `MockPrincipalProbe` (has `akitaDAO`): `probe(wallet: uint64): Principal` (strict, non-readonly), `tryProbe(wallet)`, `probeAuth(wallet): Account` (returns `Txn.sender.authAddress`, for V0.1), readonly `quote(wallet): Account`, `owns(wallet, account): boolean`, `atRest(account, wallet, stored): Account`, `thirdParty(account, wallet): Account` (quote-only variant), `ctxOwns(ctx, account): boolean`, `probeCtx(wallet): GateCtx` (strict, returns `gateCtx(p)`), `relay(target: Application, wallet: uint64)`, which calls `target.probe(wallet)` as itself (nested-call test), and `pinnedFactoryProbe(wallet)`, which resolves with `F` read from its own DAO only (T43) |
| `mocks/principal-plugin/contract.algo.ts` | `TestPrincipalPlugin`, an installable ARC-58 plugin (pattern of `arc58/plugins/test-proxy-rekey`). `callProbe(wallet, rekeyBack, probe, hint)`: `abiCall probe.probe(hint)` with `sender = getControlledSpendingAccount(wallet)`, `rekeyTo = rekeyAddress(rekeyBack, wallet)`. `callProbeAuth(...)`. `callProbeAsSelf(wallet, probe, hint)`. `proxyProbe(wallet, rekeyBack, proxy, probe, hint)` rekeys `S` to `proxy`, then calls it. `principal(wallet): Principal` (`pluginPrincipal`). Two explicit mid-window call-outs instead of a generic one: `callRelay(wallet, rekeyBack, probe, probe2, hint)` (the plugin, sending as `S`, calls `probe.relay(probe2, hint)`; T17) and `callReenter(wallet, reenter: Application, forgedWallet)` (calls `MockPrincipalReenter.poke`; V0.2/T23). `callOwns(wallet, rekeyBack, probe, account)` evaluates `probe.owns(wallet.id, account)` while the window is open (T28 "escrow mid-window" row). `callCtxOwns(wallet, rekeyBack, probe, hint, account, alsoThirdParty)` calls `probe.probeCtx(hint)` as `S` and then, in the same window, `probe.ctxOwns(ctx, account)` (and `probe.thirdParty(account, hint)` for the E23 comparison) (T38–T40) |
| `mocks/principal-proxy/contract.algo.ts` | `MockPrincipalProxy.forward(wallet: uint64, probe, hint, rekeyBack)`: sends as `getSpendingAccount(wallet)`. It deliberately violates §3.8 rule 3(b) when `rekeyBack=false` (it keeps `S`). `MockCompliantProxy.forward(...)` is the compliant twin, which always hands `S` back to `P` and asserts it in the same call |
| `mocks/principal-custody/contract.algo.ts` | `MockCustodyPlugin`: holds a permanent account `H` (rekeyed to it at `init`, like the router's leg escrow). `act(wallet: Application, probe, hint)` sends as `getSpendingAccount(wallet)` **after** asserting `spender != H` (compliant). `actUnsafe(...)` omits the guard (negative control) |
| `mocks/principal-y/contract.algo.ts` | `MockY.callProxy(proxy, forgedWallet, probe)`: calls `MockPrincipalProxy.forward(forgedWallet, probe, forgedWallet, true)` from an unrelated app (T41) |
| `mocks/fake-dao/contract.algo.ts` | `MockFakeDAO`: exposes an `AkitaAppList` whose `wallet` is a rogue factory (`mocks/fake-wallet` creator), for T43 |
| `mocks/principal-reenter/contract.algo.ts` | `MockPrincipalReenter.poke(plugin, forgedWallet, probe)`: calls `TestPrincipalPlugin.callProbe(forgedWallet, …)` |
| `mocks/principal-composer/contract.algo.ts` | `MockPrincipalComposer.compose(wallet, plugin, probe, hintInWindow)`: inner group `[wallet.arc58_rekeyToPlugin(plugin), plugin.callProbe(hintInWindow,…), wallet.arc58_verifyAuthAddress]` (pattern of `mocks/inner-wallet-caller`) |
| `mocks/forged-wallet/contract.algo.ts` | `MockForgedWallet`: a program installed **into a genuine factory-created wallet** through an admin `UpdateApplication` (calls `AA.update(string)` with the new approval program). Methods: `setBytes(key: bytes, value: bytes)`, `setUint(key: bytes, value: uint64)` (type confusion, T35/T46), `del(key: bytes)`, `setAkitaDAO(dao: uint64)`, `callProbeAs(probe, hint, sender: Account)` (sender = own address or an account rekeyed to it). Global schema ≤ the wallet's reserved schema (`AA:115-123`). TEST-ONLY header as in `mocks/fake-wallet` |
| `utils/principal.e2e.spec.ts` | suite §5.2 |
| `tests/fixtures/unregistered-wallet.ts` | builds wallets with `WalletFactorySDK.new` and **no** `register` call, adds escrows with a raw `arc58_newEscrow` group (not `WalletSDK.addPlugin`, whose post-processor registers new escrows, `akita-sdk/src/wallet/group.ts:158-161`, `akita-sdk/src/wallet/index.ts:733-736`), and exports `assertUnregistered(addr)` (`EscrowFactory.exists(addr) == false`) |
| `tests/principal-sync.test.ts` | byte-equality of `utils/principal.ts` and `akita-plugin/principal.ts` |
| `docs/principal-resolution/STANDARD.md` | one-page normative copy of §2–§3 for third-party integrators (`@akta/plugin` README links it) |

Reused fixtures: `tests/fixtures/dao.ts` (`buildAkitaUniverse`), `tests/fixtures/abstracted-account.ts`, `tests/fixtures/escrow.ts`, `akita-sdk/wallet` `newWallet`/`WalletSDK`, `mocks/fake-wallet` (`MockFakeWallet`, as in `utils/origin-spoofing.e2e.spec.ts:55-71`), and the `algokit.Config.configure({ populateAppCallResources: true })` setup (`utils/origin-spoofing.e2e.spec.ts:19`).

### 5.2 Test suite (`utils/principal.e2e.spec.ts`)

Shared setup: a universe, plus wallets `Wd` (default, `C == W.address`, referrer R1), `Wx` (external controlled `C` rekeyed to `W` at creation, referrer R2) and `We` (named escrow `"e"`, a `defaultToEscrow` grant and an arbitrary-address escrow `"x"`). `TestPrincipalPlugin` is installed on each with the relevant grants, and `MockPrincipalProbe` is deployed with the universe DAO. **All wallets and escrows for T06–T14, T28–T30 and T38–T40 are built with `tests/fixtures/unregistered-wallet.ts`.** The SDK's `newWallet` always calls `register('')` (`akita-sdk/src/wallet/factory.ts:227`), and `addPlugin` registers new escrows, so it cannot prove registry independence. Each of those tests ends with `assertUnregistered` for every wallet address and escrow involved.

**V0: AVM facts (they gate the standard; if any fails, stop and revise §3).**

| ID | Setup | Expected |
|---|---|---|
| V0.1 | `Wx` escrow window; plugin `callProbeAuth(rekeyBack=true)` | probe sees `Txn.sender.authAddress == Wx.address`. Same with `Wd` default window: zero address. (Confirms that the decided auth test would fail) |
| V0.2 | `Wd` window; plugin `callReenter(MockPrincipalReenter, Wf)`, which calls back into the plugin | rejected with "attempt to re-enter" |
| V0.3 | outer group `[Wd.rekeyToPlugin(P), P.callProbe(wallet=Wf, …), Wd.verifyAuthAddress]` | `errIsvl` (`AA:553`) |
| V0.4 | `MockPrincipalComposer` with an in-window hint `Wf ≠ Wd` | `errIsvl` inside the inner group |

**Resolution matrix.**

| ID | Setup | Expected |
|---|---|---|
| T01 | EOA calls `probe(0)` top-level | `{0, EOA, zero, EOA, zero, false}` |
| T02 | `Wd` window, `callProbe(hint=0)` | principal `S`, wallet 0 |
| T03 | EOA calls `probe(Wd)` top-level | `errHtop` |
| T04 | `callProbe(hint = 999999999)` (nonexistent) | `errHnwl` |
| T05 | `callProbe(hint = MockFakeWallet)` | `errHnwl` |
| T06 | `Wd` default grant, `rekeyBack` ∈ {true, false} | principal `Wd.address`, `viaPlugin`, referrer R1 |
| T07 | `Wx` default grant | principal `Cx` |
| T08 | `Wd` escrow `"e"` window | principal `Wd.address` (needs `A(Wd.address)`) |
| T09 | `Wd` `defaultToEscrow` grant | same as T08 |
| T10 | `We` window on arbitrary-address escrow `"x"`; **no** EscrowFactory registration anywhere in the test | principal `C` |
| T11 | `Wx`: admin `arc58_rekeyTo(E, false)` on `Cx`, then escrow window | principal = escrow, `origin` zero, referrer R2 |
| T12 | `Wd`: `arc58_rekeyTo(E, false)` (rekeys `Wd.address`), then escrow window | principal = escrow; a default-grant window fails at `AA:1099-1105` |
| T13 | `Wx`: group `[arc58_rekeyTo(E, true), probe(Wx) signed by E as Cx, pay Cx→Cx rekeyTo Wx.address]` | `errHtop`; the same group with `probe(0)` gives principal `Cx`. Kept as a **flash-rekey regression test** for the Q2 wallet change |
| T14 | `Wd` window; `proxyProbe` via `MockCompliantProxy`, `rekeyBack` ∈ {true, false} | passes; principal as T06/T08; `S` is back with `P`/`W.address` when the proxy returns |
| T15 | `Wd` window; `callProbe(hint = Wx)` | `errHnbd` |
| T16 | `Wd` window; `callProbeAsSelf(hint = Wd)` | `errHnbd` |
| T17 | `Wd` window; `callRelay(Wd, true, probe, probe2, Wd)` | `errHnbd` |
| T18 | Forged `Wf` (genuine wallet, admin-updated to `MockForgedWallet`): `callProbeAs(probe, Wf, Wf.address)` | principal `Wf.address` (or the live `C`). The same call with `hint = Wd` gives `errHnbd` |
| T19 | `Wf.setBytes('spending_address', attackerEOA)`; attacker calls `probe(Wf)` top-level | `errHtop` |
| T20 | `Wf.setBytes('spending_address', Wd.address)`; `Wf` tries `callProbeAs(…, sender = Wd.address)` | AVM rejects: unauthorized sender (F1) |
| T21 | `Wf.setBytes('controlled_address', victimEOA)`; `callProbeAs(probe, Wf, Wf.address)` | principal `Wf.address`, never the victim |
| T22 | `Wf.setBytes('referrer', X)` | referrer `X` (documents R-REFERRER) |
| T23 | = V0.2 using `Wf` as the forged hint | re-entry rejected; no `Principal` with `wallet = Wf` |
| T24 | = V0.3 / V0.4 | `errIsvl` |
| T25 | R-STALE from §4.3, both constructions: (a) the escrow-window group ended by the controlled-address shortcut; (b) the single admin group `[rekeyTo(E,true), rekeyToPlugin(P, escrow), P.m(W,false), pay C→C rekeyTo W.address]`. Next group: `TestPrincipalPlugin.callProbe(hint=Wx)` | **passes** (documents the residual). If Q2 is approved: both constructions fail at the `rekeyToPlugin` group, and T13 still passes |
| T26 | simulate `quote(hint)` top-level for {0, Wd, Wx, fake, nonexistent} | {zero, R1, R2, zero, zero}; never reverts for these (valid or non-wallet) hints |
| T27 | `tryProbe` with every invalid hint from T03–T05/T15–T17 | returns the plain result; no revert (forged type-confused wallets: T35) |
| T28 | `owns(W, A)` for {`Wd.address`; idle escrow; arbitrary-address escrow; `Cx`; escrow mid-window (via `callOwns`, rekeyed to P); `Wd.address` after T12; `Wf` claiming `spending_address = A`; fake} | {T, T, T, T, **F**, F, **F**, F} |
| T29 | `atRest(A, W, stored)` over the T28 rows with `stored` = the principal recorded at a prior `probe`, plus the T11 state; `thirdParty(A, W)` over the same rows | `stored` where owned and still live, else `A`; both variants agree for honest wallets |
| T30 | parity: in each of T06–T14, `TestPrincipalPlugin.principal(wallet)` == `probe(...)` result in the same call | equal |
| T31 | T08 and T11 sent through the SDK central Access-list preparer; then repeated with `A(Wd.address)` / `A(Cx)` stripped | success with the preparer. Stripped: **record the observed behaviour**. `Wd` is the called app of `rekeyToPlugin` in the same group, so `A(Wd.address)` may be implicitly available under group sharing. The assertion is whatever LocalNet shows under Access-list mode, and it is written back into §3.6 |
| T32 | simulate T06/T08/T11 with `allowUnnamedResources` and trace opcode cost of `probe` | `resolvePrincipal` ≤ 210 ops (raised from 150 by Kyle on 2026-10-04, §9.6; measured 184–196) |
| T33 | existing `origin-spoofing` fake wallet (registered in EscrowFactory) as hint | `errHnwl` |
| T34 | wallet created and then deleted (or app id of a deleted child) | `errHnwl`. A factory-created wallet CAN be deleted once its admin installs code that allows it (`MockForgedWallet.destroy`); T34/T45/T46/T48/T50 cover that once-genuine id |
| T35 | Strict and quote paths on forged globals: `Wf.del('controlled_address')` → `errIwlt`; `spending_address` set to 31 bytes → `errHnbd`; `setUint('controlled_address'|'referrer'|'spending_address', 7)` → `probe`/`tryProbe`/`quote`/`thirdParty` **panic** (documented: caller-only harm) | as stated |
| T36 | compile probe: one contract with two `@abimethod({ name: 'm' })` methods of different signatures (legacy-shim pattern, §7.2) | builds; ARC-56 lists both selectors; a typed client calls both. Precedent: puya `test_cases/typed_abi_call/logger.py:29-45` |
| T37 | `MockPrincipalComposer` with `hintInWindow = Wd` (legitimate inner-composed window; the composer is Wd's allowed caller) | passes; principal as T06 |
| T38 | `Wd` default grant (`W.address` rekeyed to `P`); `callCtxOwns(Wd, true, probe, Wd, E, true)` for `Wd`'s idle escrow `E` | **true** (E23: `thirdParty(E, Wd)` evaluated at the same point returns `E`, which shows why gates must use `ctx`) |
| T39 | `Wx` default grant (`Cx` rekeyed to `P`); `ctx`; `ctxOwns(ctx, Cx)` and `ctx.wallet == Wx` | true; `quote(ctx.wallet) == R2` (the AkitaReferrerGate rule, §6.9) |
| T40 | `Wd` escrow window on `E`; `ctxOwns(ctx, E)` (`E` is rekeyed to `P`, so it is not owned at rest); `ctxOwns(ctx, A)` for an account `A` that belongs to `Wx`; forged `Wf` (with `controlled_address` set to a friend) owning `A2` at rest, `ctx` of the friend's own **genuine wallet window** (`ctx.wallet = Wfr != 0`) | T (`E == ctx.spender`); F; F (the friend's `ctx.wallet` is the friend's wallet, so no gifting); the forger's own ctx owns `A2` but not the friend |
| T41 | `MockPrincipalProxy` with `rekeyBack=false` leaves `S` with the proxy; in a later group `MockY.callProxy(proxy, Wf, probe)` with `Wf.spending_address = S` | **passes** against the non-compliant mock (negative control that demonstrates E25). After a closed genuine window the same call fails through either proxy (unauthorized sender): an AVM fact, not evidence about `MockCompliantProxy`, whose guarantee is T14 + T14b |
| T42 | `MockCustodyPlugin` holding `H`; forged `Wf.spending_address = H`; `act(Wf, probe, Wf)` | rejected by the guard; `actUnsafe` passes (negative control) |
| T43 | `Wd` admin calls `setAkitaDAO(MockFakeDAO)`; probe `pinnedFactoryProbe(Wd)` and a rogue-factory app as hint | `Wd` still resolves through the probe's own DAO; rogue app → `errHnwl` |
| T44 | (= T13 under the Q2 wallet build, when approved) flash `arc58_rekeyTo(E, true)` returned by `pay C→C rekeyTo W.address` | passes |
| T45 | `ctxOwns`/`atRest` evaluated with `W` = deleted app, fake app, nonexistent id | false / `A`; no panic |
| T46 | honest `probe` stores `(Wf, Wf.address)`; `Wf` then `setUint('controlled_address', 7)`, `del('referrer')`, `setBytes('spending_address', 31 B)`; `atRest(A, Wf, stored)` and `ctxOwns`; then the forger **deletes** `Wf` | no panic; result depends only on `AppCreator`/`AuthAddr`; after deletion `atRest` → `A`, `ctxOwns`/`owns` → false, hint → `errHnwl` |

Added by the Phase 0 review (2026-10-04):

| ID | Setup | Expected |
|---|---|---|
| T16b | forged `Wf.spending_address = probe.address`; top-level `probe.relay(probe2, Wf)` / `tryRelay` | `errHnbd` / plain(`probe.address`): only the `sender != callerAddr` clause rejects it |
| T47 | `Wd` default and escrow windows; forged `Wf` with `spending_address = S`, `controlled_address = A` (rekeyed to `Wf`), `referrer = attacker`; non-compliant `callProbe(Wd, hint = Wf)`; compliant `callProbeWindow(Wd)` (`windowHint`) | negative control resolves to `{Wf, A, A, S, attacker, true}` (proves §3.8 rule 6 is load-bearing); the compliant path resolves to `Wd` |
| T48 | `tipWallet(creator, stored)` (probe `tipWalletOf`) | live honest wallets (`Wd.address`, idle escrow, external `Cx`) → `W`; creator held in its own default window (E23), not owned, rekeyed to a fake app, deleted wallet, `C` rekeyed away, forged short/missing/unrelated `controlled_address` → 0; uint64 `controlled_address` panics (R-CREATOR) |
| T49 | `gateCheckCtx` against an approve-all stand-in gate (`MockFakeDAO.setGate`) | true only for `[selector(mustCheckFor), encode(ctx), itob(id), args]` NoOp to the gate; other ctx, wallet, id, selector, arg count, app or OnComplete → false |
| T50 | `pluginPrincipal` error paths | fake / deleted wallet → `errHnwl`; 31-byte or missing `spending_address` → `errHnbd`; `S` not held by the plugin (zero address outside a window, forged `spending_address = victim`) → `errNath` |

### 5.3 Documentation

- `docs/principal-resolution/STANDARD.md` (normative copy for integrators). It must include §3.8 verbatim: first hop only, no wallet-global reads on third-party paths, the custody invariants, factory pinning, and the `resolvePrincipalCtx` precondition.
- `akita-plugin` README section "Identity: use `pluginPrincipal`/`resolvePrincipal`, never raw `getOriginAccount`".
- Update the `akita-arc58-plugin-dev` skill text, which still recommends `getAccounts().origin` (outside this repo).

### 5.4 Acceptance criteria

1. V0.1–V0.4 pass on LocalNet; any deviation blocks Phase 1.
2. V0, T01–T50 and T14b/T16b pass (T44 once the Q2 build exists); full `npm test` is green (AGENTS.md workflow step 4).
3. `tests/principal-sync.test.ts` passes, and `tests/logged-error-codes.test.ts` passes with the new codes.
4. `npm run build` leaves every pre-existing artifact's approval/clear bytecode byte-identical (diff `artifacts/**/*.arc56.json` `byteCode` for non-mock contracts).
5. Measured opcode cost (T32) and the resource list (T31) are written back into §3.6–3.7.
6. Kyle has answered §8, or accepted the defaults.

---

## 6. Per-method change list (Phases 2–4)

Conventions for every row:

- **New ABI** = the current ABI with `wallet: uint64` **appended as the last argument**, unless the row says otherwise. Signatures are taken from the current ARC-56 artifacts.
- **Verify** = `principalOf(dao, wallet)` (strict) at the first hop.
- **Legacy** = the old selector is kept as a shim with today's registry semantics during the compatibility window (§7.2).
- **Deploy**: "DAO upgrade" = `UpdateAkitaDAOPlugin.updateApp`, authorised by `update` (`utils/base-contracts/upgradeable.ts:33-43`; committed equivalent `HEAD:utils/base-contracts/base.ts:46-52`). It requires `Global.callerApplicationId == PluginAppList.update`. **The update plugin deployed on MainNet (3569559689, matching `HEAD`) cannot push AkitaSocial or Subscriptions.** It builds `approvalProgram: [chunk1, chunk2]` (≤ 8,192 B) with no `extraProgramPages` and no schema (`HEAD:arc58/plugins/update-akita-dao/contract.algo.ts:101-138`), while today's artifacts are already 8,332 B and 8,532 B. The page-growing `pushUpdate` (`arc58/plugins/update-akita-dao/contract.algo.ts:123-170`, `utils/programs.ts:51-78`) exists only in the uncommitted tree (`utils/programs.ts` is untracked). Phase 2a (§7.1) installs it first. "Child bytecode" = `updateFactoryChildContract`, which affects **new** children only. The MainNet factories create children from 2 chunks with `extraProgramPages: 3` (`HEAD:auction/factory.algo.ts:101-125`). The StakingPool child is already 10,954 B, so each factory upgrade must land before its child bytecode push. "New app" = redeploy (immutable).
- **Selector-compare paths.** Some internal helpers check that the outer call came through the gated method by comparing selectors: `raffle/contract.algo.ts:540, 586, 633, 665` (`errBadMethodGateNeeded`) and `subscriptions/contract.algo.ts:982` (`errInvalidSequence`). The committed code has the same checks (`HEAD:raffle/contract.algo.ts:379, 424, 469, 500`, `HEAD:subscriptions/contract.algo.ts:936`). Under §7.2 the hinted method keeps the canonical name, so `methodSelector(this.gatedX)` resolves to the **new** selector and every shim call would revert. Rule: each gated entry point (hinted and shim) calls a private `xImpl(..., gated: true)`, and the selector compares are deleted.

### 6.1 AbstractedAccountFactory (MainNet 3569556257, DAO upgrade)

| Method | Current lookup | New ABI | Stored state / MBR | Pre-existing | Deploy |
|---|---|---|---|---|---|
| `newAccount(pay,address,address,string,address,byte[32],string,bool,uint64,uint64[],(…)[])uint64` | payer's registry referrer: `sendReferralPayment` at `arc58/account/factory.algo.ts:122` | **unchanged** under Q1 default A2 (the deployed 10-argument form without `automaticUpdates` is removed: K2, §9.4, SDK lockstep in §9.5 step 6): pay the cut to the `referrer` **argument** via `sendReferralPaymentTo`; the cut and the disbursement MBR come out of the creation fee (DAO share). The payment equality at `:126` (`childMBR + referralMbr + extraFunding + assetMBR + pluginMBR`) **loses its `referralMbr` term**, because the disbursement MBR is no longer paid by the payer. Add the guard `createFee >= cut + costInstantDisbursement(...)` (else no cut) to avoid underflow | none | n/a | DAO upgrade |
| `cost()uint64` (ro) | registry at `:297-299` | unchanged; under A2 it no longer adds a referral term | — | — | DAO upgrade |
| Phase 4 | `ARC58WalletIDsByAccountsMbr` pre-fund at `:106`, `:185`, `:308` | remove (needs the SDK and the wallet without `register`) | −MBR per new wallet | — | DAO upgrade |

### 6.2 AkitaSocial (MainNet 3569557130, DAO upgrade **after Phase 2a**; 8,332 B approval, so growing pages makes the DAO wallet the sponsor and requires passing the current schema, `utils/programs.ts:51-78`)

| Method (current) | Current lookup | New ABI | Notes |
|---|---|---|---|
| `post(pay,axfer,uint64,byte[24],byte[36],uint64,bool,uint64,uint64)void` | `sendPostPayment` → `sendReferralPayment(Txn.sender)` `social/contract.algo.ts:336` | `post(…,uint64)void` | referral → `sendReferralPaymentTo(p.referrer)` |
| `editPost(pay,axfer,byte[36],byte[32],uint64)void` | same (via `createPost` `:575`) | `editPost(…,uint64)void` | |
| `reply(pay,axfer,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` | `tipCreator` → `sendReferralPayment` `:450` | `reply(…,uint64)void` | |
| `gatedReply(pay,axfer,appl,uint64,byte[24],byte[36],byte[],uint64,uint64,bool,uint64,uint64)void` | tip referral `:450`; gate on **`Txn.sender`** `:922` | `gatedReply(…,uint64)void` | gate subject → `ctx = gateCtx(p)` via `gateCheckCtx` / `Gate.mustCheckFor` (§3.5, Q4) |
| `editReply(pay,axfer,byte[36],byte[32],uint64)void` | tip referral | `editReply(…,uint64)void` | |
| `gatedEditReply(pay,axfer,appl,byte[36],byte[32],uint64)void` | tip referral; gate on `Txn.sender` `:959` | `gatedEditReply(…,uint64)void` | subject → `ctx` |
| `vote(pay,axfer,byte[],uint64,bool)void` | tip referral (`createVote` `:699`, up-votes) | `vote(…,uint64)void` | |
| `editVote(pay,axfer,byte[32],bool)void` | same | `editVote(…,uint64)void` | |
| `react(pay,axfer,byte[],uint64,uint64)void` | tip referral (`createReaction` `:755`) | `react(…,uint64)void` | |
| `gatedReact(pay,axfer,appl,byte[],uint64,uint64)void` | tip referral; gate on `Txn.sender` `:1056` | `gatedReact(…,uint64)void` | subject → `ctx` |
| `initMeta(pay,address,bool,uint64,uint64,uint64)uint64` | `meta.wallet = getWalletIDUsingAkitaDAO(Txn.sender)` `:1125`, stored `:1151/:1166` | `initMeta(…,uint64)uint64` | store `p.wallet` (verified, or 0). Box layout unchanged (`social/types.ts:101`) |
| **new** `setMetaWallet(uint64)void` | — | — | rebinds `meta(Txn.sender).wallet` after strict verification (backfill for metas stored with 0). ARC-58 wallets can reach it only through the plugin (the direct arm needs `W` itself to call, and the wallet has no such method), so the social plugin gains `setMetaWallet(wallet, rekeyBack)` (§6.11) |
| `tipCreator` (private, `:424-459`) | reads `meta(creator).wallet` `:442-447`; routes to the raw `getOriginAccount` `:350` | — | hinted methods: use `tipWallet(dao, creator, stored)`; on 0 → direct tip. **The new plugin's `getCreatorDetails` must use the same helper**, so the exact MBR quotes still match. **Shims pass `legacy = true`**: route on the raw `meta(creator).wallet`, exactly as deployed plugins quote it (`arc58/plugins/social/contract.algo.ts:79-83` → `BaseSocial.checkTipMbrRequirements`, `social/base.ts:55-71`, which adds `Global.assetOptInMinBalance`). Otherwise, for a meta whose wallet no longer owns the creator at rest but still has a live `C`, an old plugin adds 100,000 µA, the upgraded target expects 0, and the exact matches in `createVote` (`:714-724`), `validatePostPayment` (`:788-812`) and `validateReactPayment` (`:814-830`) revert. Re-derive this against the deployed social bytecode (§7.1) |

Pre-existing metas: kept as they are. The read-time `tipWallet` check makes stale ones safe: today a creator whose controlled account was rekeyed away blocks tips to that creator. Social state stays keyed by the spender (Q5).

### 6.3 AkitaSocialGraph (MainNet 3569557033, DAO upgrade) — not in the 35-site inventory

| `gatedFollow(pay,appl,address)void` | gate on `Txn.sender` `social/graph.algo.ts:128` | `gatedFollow(pay,appl,address,uint64)void` | subject → `ctx` (`gateCheckCtx`); legacy shim kept (plain `gateCheck` on `Txn.sender`) |
|---|---|---|---|

### 6.4 Subscriptions (MainNet 3569556497, DAO upgrade **after Phase 2a**; 8,532 B)

| Method (current) | Current lookup | New ABI | Stored state / MBR | Pre-existing |
|---|---|---|---|---|
| `subscribe(pay,address,uint64,uint64,uint64)uint64` | referral `subscriptions/contract.algo.ts:296` | `subscribe(…,uint64)uint64` | — | — |
| `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` | referral `:296`; gate origin via registry `:754-756` | `gatedSubscribe(…,uint64)uint64` | gate via `ctx`. Box `'i'`: `BoxMap<SubscriptionKey, { wallet: uint64, principal: Account }>` = the **stored pair** `(p.wallet, p.principal)`, written when `wallet != 0 && service.gateID != 0`. **34,900 µA** (2,500 + 400·(1 + 40 + 8 + 32)), folded into `mbrAmount` (`:259-291`), deleted and refunded in `unsubscribe` (`:902-949`) | — |
| `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` | referral `:392` (exact MBR `:409`) | `subscribeAsa(…,uint64)uint64` | — | — |
| `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` | referral `:392`; gate `:800-802` | `gatedSubscribeAsa(…,uint64)uint64` | gate via `ctx`; box `'i'` as above | — |
| `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64` | referral `:580` (exact `:582`) | `newService(…,uint64)uint64` | — | — |
| `newServiceCost(uint64)uint64` (ro) | `referralFee(Txn.sender)` `:1150` | `newServiceCost(uint64,uint64)uint64` | uses `quoteReferrerOf` | — |
| `newSubscriptionCost(address,uint64,uint64)uint64` (ro) | `:1181` | `newSubscriptionCost(address,uint64,uint64,uint64)uint64` | adds +34,900 when `wallet != 0` and the service is gated | — |
| `gatedTriggerPayment(appl,(address,uint64))void` | subject `originOr(registry(key.address))` `:962-964` (keeper-dependent through `Txn.sender`) | `gatedTriggerPayment(appl,(address,uint64),uint64)void`. The trailing arg is the **caller's own hint** (strict `principalOf`; keepers acting as themselves pass 0). It never names the subscriber. The subject is a `ctx` computed by `triggerGateCtx(key, p)`: **(1)** `'i'` exists and `p.wallet != 0 && p.wallet == i.wallet` (the subscriber's own wallet triggers, e.g. from its default window) → `gateCtx(p)`, which is live and verified now and avoids E23. **(2)** `'i'` exists, any other caller → `(atRestPrincipalOf(key.address, i.wallet, i.principal), ownsAtRestOf(i.wallet, key.address) ? i.wallet : 0, key.address)`. No wallet global is read, so the subscriber cannot make keeper triggers panic. **(3)** No `'i'` (legacy subscription) → today's registry derivation, `legacyOriginOr(legacyWalletOf(key.address), key.address)`, with `ctx.wallet = legacyWalletOf(...)` only if `isGenuineWallet` and `ownsAtRest`, else 0. The keeper never chooses the subject (Q13 covers Phase 4). The gate is asserted with `gateCheckCtx`. The selector compare at `:982` is replaced by a private `triggerImpl(key, gated)` (§6 conventions) | — | legacy subscriptions keep registry semantics (3) |
| legacy shim `gatedTriggerPayment(appl,(address,uint64))void` | — | old selector | exactly today's semantics: registry subject, plain `gateCheck`, then `triggerImpl(key, true)`. The deployed Subscriptions plugin calls this selector (`HEAD:arc58/plugins/subscriptions/contract.algo.ts` ≈:481) | — |
| **new** `triggerGateCtx((address,uint64),uint64)(address,uint64,address)` (ro) | — | — | Same code as above, so the new plugin builds `Gate.mustCheckFor` with exactly the `ctx` the target will assert. Called from inside the plugin's window, where `Txn.sender`/`callerApp` equal those of the following target call | used by the new plugin |
| `getSubscription`, `SubscriptionInfo` | — | **unchanged**: deployed sub-gates decode it (`gates/sub-gates/subscription/utils.ts:43-46`) | — | — |

The ungated `triggerPayment((address,uint64))void` is unchanged externally. Internally it becomes `triggerImpl(key, false)`, which still asserts `gateID == 0`. Renewals pay no referral today (`:1002-1008`), and that stays (Q7).

### 6.5 StakingPoolFactory (MainNet 3569556570, DAO upgrade) and StakingPool child (child bytecode)

| Method | Current lookup | New ABI | Stored state / MBR | Pre-existing |
|---|---|---|---|---|
| `newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64` | referral `staking-pool/factory.algo.ts:100` | `newPool(…,uint64)uint64` | new child global uint `pv = 1` (ABI marker for plugins), +28,500 µA, included automatically via child `globalUints` | — |
| `newPoolCost()uint64` (ro) | `referralFee` `:199` | `newPoolCost(uint64)uint64` | `quoteReferrerOf` | — |
| child `gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void` | registry origin `staking-pool/contract.algo.ts:1296-1297` | `gatedEnter(…,uint64)void` | gate via `ctx`. Box `'i'`: `BoxMap<Account, { wallet: uint64, principal: Account }>` = the stored pair per entrant when `wallet != 0`. **31,700 µA** (2,500 + 400·(33 + 40)), written in `createPoolEntries` next to `uniques` (`:1026-1027`), deleted and refunded with `uniques` in `removeEntry` (`:1315-1346`) | live pools: **not upgraded**; they keep registry semantics until they end |
| child legacy shim `gatedEnter(pay,appl,(…)[])void` (old selector, used by the deployed staking-pool plugin, which gates on the raw registry origin, `arc58/plugins/staking-pool/contract.algo.ts:228,252`) | — | old selector | today's semantics for the gate (registry origin). **It also writes `'i'`** = `(W, legacyOriginOr(W, S))` when `W = legacyWalletOf(S) != 0` and `isGenuineWallet(W)`. Otherwise `gateCheck` would later re-check the spender instead of the origin, and anyone could disqualify legitimate escrow-window or external-`C` entrants for the whole compatibility window | — |
| child `enterCost(address,(…)[])uint64` (ro) | — | `enterCost(address,(…)[],uint64)uint64` | +31,700 when `wallet != 0` and no `'i'` box. The **legacy** `enterCost` shim adds +31,700 when the shim `gatedEnter` will write `'i'` (same registry test on `address`). The deployed plugin pays whatever `enterCost` returns (`arc58/plugins/staking-pool/contract.algo.ts:228-236`), so quote and charge stay equal | — |
| child `gateCheck(address,uint64)void` | `originOr(registry(address))` `:1570-1571` | **unchanged ABI** | `'i'` exists → `ctx = (atRestPrincipalOf(address, i.wallet, i.principal), ownsAtRestOf(i.wallet, address) ? i.wallet : 0, address)` → `Gate.checkFor(ctx, …)`; no `'i'` → `ctx = (address, 0, address)`. No wallet global is read, so an entrant cannot make this panic after selling the gate asset (§3.8 rule 2, T46) | — |
| child `enter(pay,(…)[])void` | none (`gateID == 0` enforced `:1306`) | unchanged | — | — |

**Pre-existing undercharge of `PoolEntriesMBR`, confirmed.** The `entries` key is `'e'` + uint64 = 9 B (`staking-pool/constants.ts:40`, `contract.algo.ts:232`). The `EntryData` value is address 32 + asset 8 + quantity 8 + `gateArgs` offset 2 + bool 1 + `gateArgs` length 2 = **≥ 53 B** (`staking-pool/types.ts:24-30`; `GateArgs = bytes[]`, `gates/types.ts:4`). That is ≥ 62 B = **≥ 27,300 µA**, against a flat `PoolEntriesMBR = 25_300` (`staking-pool/constants.ts:92`, used in `getEnterCost` `:901-917`), and the gap grows by 400 µA per byte of encoded gate args. `entriesByAddress` (`'a'` + 40 B key + 8 B value = 49 B = 22,100 µA) is **over**charged at 25,300 (`:94`). Per entry, the net charge falls short once the encoded `gateArgs` exceed 3 bytes beyond the empty array, which is exactly the gated path. In the new child, charge `entries` as `2,500 + 400·(60 + encodedLen(gateArgs))` (`encodedLen` includes the 2-byte length prefix, so an empty array gives 27,300) and `entriesByAddress` as 22,100 (Q14).

### 6.6 AuctionFactory (MainNet 3569557408, DAO upgrade) and Auction child (child bytecode)

| Method | Current lookup | New ABI | Stored state / MBR | Pre-existing |
|---|---|---|---|---|
| `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` | the seller is `Txn.sender` (`auction/factory.algo.ts:128`); referral is resolved later through the registry | `newAuction(…,uint64)uint64` | verify, then forward `p.referrer` | — |
| `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` | `:279` | `newPrizeBoxAuction(…,uint64)uint64` | same | — |
| legacy shims `newAuction`/`newPrizeBoxAuction` (old selectors) | — | old selectors | create a **new** child and forward `sellerReferrer = referrerOrZeroAddress(legacyWalletOf(Txn.sender))`. This is today's referral, resolved **at creation** instead of at completion (`sendReferralPaymentFor(seller)`), a small accepted shift: a seller who changes wallets between listing and settlement keeps the creation-time referrer. Forwarding zero would silently drop seller referrals for old plugins | — |
| child `create(uint64,bool,…,(uint64,(string,uint64)))void` (15 args) | — | append `address sellerReferrer` (16th arg; PuyaTs packs args 15+ into a tuple) | global `seller_referrer` (32 B), **+50,000 µA** per new auction, included through `globalBytes` (`auction/factory.algo.ts:98,256`). Its existence is the plugin's ABI marker | live auctions: not upgraded |
| child `completeAlgoPayments`/`completeAsaPayments` | `sendReferralPaymentFor(seller)` `auction/contract.algo.ts:274`, `:323` | internal | `sendReferralPaymentTo(seller_referrer)`; the disbursement MBR is already pre-funded (`factory.algo.ts:85-92`) | old children keep registry semantics |
| child `gatedBid(pay,appl,address)void` | registry origin `:720-724` | `gatedBid(…,uint64)void` | gate via `ctx`; legacy shim keeps the registry origin | — |
| child `gatedBidAsa(pay,axfer,appl,address)void` | `:742-746` | `gatedBidAsa(…,uint64)void` | same | — |

The factory compiles the child's create selector and schema (`compileArc4(Auction)`, `auction/factory.algo.ts:80-143`), so the factory upgrade and the child-box update land in the same proposal. The same applies to Raffle and Marketplace.

### 6.7 Marketplace (MainNet 3569557584, DAO upgrade) and Listing child (child bytecode; Listing is **not upgradeable**)

| Method | Current lookup | New ABI | Stored state / MBR | Pre-existing |
|---|---|---|---|---|
| `list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64` | the seller is `Txn.sender` (`marketplace/marketplace.algo.ts:237`) | `list(…,uint64)uint64` | forward `p.referrer` | — |
| `listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64` | `:351` | `listPrizeBox(…,uint64)uint64` | same | — |
| legacy shims `list`/`listPrizeBox` | — | old selectors | create a rev-3 Listing with `sellerReferrer = referrerOrZeroAddress(legacyWalletOf(Txn.sender))` (creation-time resolution, as for Auction) | — |
| `gatedPurchase(pay,appl,uint64,address)void` | `assertGatePassed` registry origin `:114-119` | `gatedPurchase(…,uint64)void` | gate via `ctx` | applies to all listings: the gate lives in the singleton |
| `gatedPurchaseAsa(axfer,appl,uint64,address)void` | same | `gatedPurchaseAsa(…,uint64)void` | — | — |
| `listCost(uint64,uint64,bool)uint64` (ro) | — | unchanged | +50,000 automatic. Update the SDK's hard-coded mirror `baseCost = 842_000n` and its "12 uints, 6 bytes" comment (`akita-sdk/src/marketplace/index.ts:346-357`): 7 bytes → 892,000. Better, delete the mirror in favour of `quoteListCost` | — |
| Listing `create(…)` (15 args) | — | append `address sellerReferrer` | global `seller_referrer` +50,000 µA; `ListingRevision` 2 → 3 (`marketplace/constants.ts:21`; legacy pattern `marketplace.algo.ts:80-83`) | **Corrected 2026-10-04 (IMPLEMENTATION-LOG, marketplace review fixes):** deployed (rev-absent) listings have never paid a seller referral. Their lookup is `EscrowFactory.get(txn Sender)`, and `txn Sender` is always the factory. So the referral that rev-3 children pay (hinted or shim-created) is a new payout. Implemented: also appends `uint64 factoryFloat` (+28,500 µA, so creation MBR is 920,500) |
| Listing completions | `marketplace/listing.algo.ts:145`, `:208` | internal | `sendReferralPaymentTo(seller_referrer)` | — |

### 6.8 RaffleFactory (MainNet 3569557743, DAO upgrade) and Raffle child (child bytecode)

| Method | Current lookup | New ABI | Stored state / MBR |
|---|---|---|---|
| `newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64)uint64` | the seller is `Txn.sender` (`raffle/factory.algo.ts:147`) | `newRaffle(…,uint64)uint64` | forward `p.referrer` |
| `newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` | same | `newPrizeBoxRaffle(…,uint64)uint64` | same |
| ~~legacy shims `newRaffle`/`newPrizeBoxRaffle`~~ | — | old selectors | **Deleted (Kyle decision K6, 2026-10-04).** The upgraded factory does not route the deployed creation selectors. A shim could not succeed for any deployed-era caller: the HEAD SDK's direct quote hard-codes the old child schema (107,000 µA short of the new child), and the deployed RafflePlugins never matched even the deployed factory's payment (audit AR-14). The removal is recorded in `scripts/lib/principal-accepted-abi-removals.json` |
| child `create(…)` (15 args) | — | append `address sellerReferrer` | `seller_referrer` +50,000 µA (marker) |
| child `claimRafflePrize` | `sendReferralPaymentFor(seller)` `raffle/contract.algo.ts:804` | internal | `sendReferralPaymentTo(seller_referrer)` |
| child `gatedEnter(appl,pay,address)void`, `gatedEnterAsa(appl,pay,axfer,address)void`, `gatedAdd(appl,pay)void`, `gatedAddAsa(appl,axfer)void` | `gateSubject()` `:213-215` (used `:528,:573,:623,:655`) | each `(…,uint64)void`; `gateSubject(wallet)` → `ctx`. Old-ABI shims on new children keep `gateSubject()`. **The selector compares at `raffle/contract.algo.ts:540, 586, 633, 665` are replaced by private `enterImpl`/`enterAsaImpl`/`addImpl`/`addAsaImpl(..., gated)`** (§6 conventions). Otherwise every old-plugin gated call on a new child reverts with `errBadMethodGateNeeded` | — |

Live raffles and auctions are not upgraded (Q8). Raffle creation fees pay no referral today (`raffle/factory.algo.ts:132-137`), and that stays (Q7).

### 6.9 Sub-gates and Gate (all `AkitaBaseContract`, immutable ⇒ new apps)

The MainNet Gate (3569558504) is v1. **Gate v2** (import window, sub-gate allowlist; `gates/contract.algo.ts:63-224`) exists only in the uncommitted tree, so it is part of the pending remediation and still undeployed. The context forwarding is added to Gate v2 **before** it ships, so it needs no extra deploy (Q12).

| Contract | Current | Change | Deploy |
|---|---|---|---|
| `Gate` v2 | `mustCheck(caller, gateID, args)` passes `caller` through (`:168-173`, `:264-273`) | **add** `mustCheckFor(ctx: GateCtx, gateID, args)` and readonly `checkFor(ctx, gateID, args)`. `setSubGate(app, allowed)` gains a `ctxAware` flag stored as the allowlist box value (`:196-205`). `evaluateFilter` calls `checkFor(ctx, registryEntry, args)` on context-aware sub-gates and `check(ctx.principal, registryEntry, args)` on all others. `mustCheck`/`check` stay for legacy callers. Targets assert the new call with `gateCheckCtx` (§3.3) | ships as Gate v2 |
| `SubscriptionGate.check(address,uint64,byte[])bool` | `subscriberControlledBy` → registry + `originOr` (`gates/sub-gates/subscription/utils.ts:18-27`) | new app, context-aware. `checkFor(ctx, id, args)`: args stay `(address subscriber, uint64 id)` (`CheckArgsByteLength` stays 40, `gates/sub-gates/subscription/contract.algo.ts:81`). Rule: `ctxOwnsOf(dao, ctx, subscriber)`. The plain `check(caller, …)` keeps today's registry semantics for legacy callers | new app; allowlist via `setSubGate(app, true, ctxAware=true)` |
| `SubscriptionStreakGate.check` | same util | same | new app |
| `AkitaReferrerGate.check` | `EscrowFactory.mustGet(caller)` (`gates/sub-gates/akita-referrer/contract.algo.ts:84-89`) panics for external controlled addresses | new app, context-aware. `checkFor(ctx, id, args)`: rule `ctx.wallet != 0 && referrerOf(ctx.wallet) == registered` (`ctx.wallet` was verified by the first hop; args ignored). The plain `check` keeps today's rule but uses `EscrowFactory.get` and **returns false** instead of panicking | new app |
| Existing gate entries | point at old sub-gate ids (`gates/types.ts:22-27`) | import into Gate v2 with the new context-aware sub-gate ids (`importGate`, `:211-217`) before `sealImports` | Gate v2 migration |

The other 13 sub-gates receive `ctx.principal` as `caller`, so their code is unchanged. **Their results change, though** (Q4/Q5). `social-activity`, `social-impact`, `social-follower-count`, `social-follower-index` and `social-moderator` read social state keyed by `caller` (e.g. `gates/sub-gates/social-activity/contract.algo.ts:92-95`). Social state stays keyed by the spender (Q5). So whenever `S != C` (escrow windows, external `C`) these gates evaluate `C`'s social state, not the spender's. Auction, marketplace and the others already pass the origin, so part of this inconsistency exists today (E28).

### 6.10 Wallet and registry writer

| Item | Current | Change | Phase / deploy |
|---|---|---|---|
| `AbstractedAccount.register(string)void` (`AA:822-840`) | writes the registry via `EscrowFactory.register` (`escrow/factory.algo.ts:80-103`) | remove from the next wallet version | Phase 4; factory `updateWallet` push (automatic wallets) or admin update |
| SDK writers | `newWallet` → `register` (`akita-sdk/src/wallet/factory.ts:227`), `WalletSDK.register` (`akita-sdk/src/wallet/index.ts:343-352`), the `addPlugin` escrow post-process (`:733-736`), the group builder's `addPlugin` post-processor (`akita-sdk/src/wallet/group.ts:158-161`) and its `register` builder (`group.ts:187-192`), `EscrowFactorySDK.register` (`akita-sdk/src/escrow/index.ts:127-145`), `WelcomePluginSDK.registerWallet` (`akita-sdk/src/wallet/plugins/welcome.ts:78-95`) | stop calling them at the end of Phase 3; delete in Phase 4 | SDK |
| Registry MBR | `ARC58WalletIDsByAccountsMbr` in the escrow mint quote `newEscrowMintCost` (`arc58/account/mbr.algo.ts:72-77`), which feeds the SDK's escrow cost quotes; the MBR comment at `arc58/account/constants.ts:16-17`; the factory pre-funds (§6.1) | drop from `newEscrowMintCost` in the Phase 4 wallet version; update the comment | Phase 4 |
| Off-chain registry readers | frontend and indexer consumers of `EscrowFactory.get`/`getList` (outside this repo) | inventory before Phase 3 stops the writes; after that point, new wallets and escrows are absent from the registry | Phase 3 prerequisite |
| `EscrowFactory` (MainNet 3569555755) | `extends Contract`, immutable; also the escrow creator | **no change**; `get`/`mustGet` keep serving live children, old plugins, old sub-gates and legacy subscriptions (§6.4 (3)). **Side effect of stopping registration:** `EscrowFactory.delete` requires the registry box (`escrow/factory.algo.ts:105-108`), so escrows created after registration stops can never be deleted through the factory. That includes the sunset path `SunsetContract.deleteEscrows` (`sunset/contract.algo.ts:48-56`). The escrow account stays rekeyed to the wallet, so its funds remain reachable. What is lost is deleting the escrow app and recovering its MBR. Phase 4 either adds a registry-free delete path, in a new escrow factory or by having the wallet record its escrows, or accepts the loss (Q15) | — |
| `utils/functions.ts` | `getWalletIDUsingAkitaDAO`, `getWalletID`, `originOr*`, `referralFee(For)`, `sendReferralPayment(For)` | Phase 1: rename to `legacy*`. Phase 4: delete once no source references them | — |

### 6.11 Plugins (immutable: a new app id per plugin; every existing plugin method keeps its ABI)

Each affected method already takes `wallet: Application` first (enforced at `AA:553`). New versions pass `wallet.id` as the trailing hint, build gate txns as `Gate.mustCheckFor(gateCtx(pluginPrincipalOf(dao, wallet)), …)`, and pick the target ABI per child by marker. **No existing plugin method gains an argument.** Method-restriction selectors and keepers that pin selectors therefore carry over (§7.3). The only addition is the new social method `setMetaWallet`. Every plugin must satisfy the custody invariants (§3.8 rule 3).

| Plugin (MainNet id) | Methods and target calls changed | Specifics |
|---|---|---|
| Social (3643581007) | `post`, `editPost`, `reply`, `gatedReply`, `editReply`, `gatedEditReply`, `vote`, `editVote`, `react`, `gatedReact`, `initMeta`, `gatedFollow` (`arc58/plugins/social/contract.algo.ts:112-1083`) | `referralQuote`/`tipReferralQuote` (`:97-108`, working tree only; the deployed 3643581007 has no referral quote, §7.1) → `quoteReferrerOf(dao, wallet.id) != zero ? costInstantDisbursement(…) : 0`; `getCreatorDetails` uses `tipWallet`; gate txns (`:256,:399,:681,:810`) → `mustCheckFor(ctx)`. **New method** `setMetaWallet(wallet, rekeyBack)` → `AkitaSocial.setMetaWallet(wallet.id)` (the backfill in §6.2 is otherwise unreachable for wallet users) |
| Subscriptions (3569561107) | `newService` (`:105`), `subscribe` (`:328`), `triggerPayment` (`:458`) | `subscribe` gate → `ctx`. `triggerPayment(uint64,bool,address,uint64,byte[][])` (`:458`) **keeps its ABI**. It obtains the gate `ctx` from `Subscriptions.triggerGateCtx(key, wallet.id)` (replaces `:472-473`) and passes `wallet.id` as the target's trailing hint. That hint is the keeper's own wallet; the target never takes the subscriber from it (§6.4) |
| Staking-pool (3642438287) | `newPool` (`:42`), `enter` gated branch (`:219`) | ABI by child marker `pv`. Legacy children get the old `gatedEnter` with subject `legacyOriginOr(legacyWalletOf(S), S)`, which is what the old child computes. Re-verify against the deployed child bytecode (§7.1) |
| Auction (3569561141) | `new` (`:76`), `listPrizeBox` (`:142`), `bid` gated (`:234`) | marker `seller_referrer`; legacy subject as above for old children |
| Marketplace (3569561455) | `list` (`:37`), `listPrizeBox` (`:133`), `purchase` gated (`:207`) | the singleton is upgraded first, so no per-child switch for gates |
| Raffle (3569561863) | `newRaffle` (`:86`), `newPrizeBoxRaffle` (`:150`), `enter` (`:211`), `add` (`:291`) | marker `seller_referrer` |
| Welcome (undeployed) | `newWallet` (`:69`) | referrer `useMainWalletReferrer ? getOriginAccount(wallet) : sender` (`:102`) → `pluginPrincipalOf(...).principal`; under Q1-A2 no target ABI change |
| AkitaRouter (undeployed) | `quoteCandidate` `tryQuoteRoute` (`:334-341`), `runNative` `swapRoute` ×2 (`:406-420`) | pass `wallet.id`. Keep the `spender != legEscrow` guard (`:262-276`): it is the reference implementation of §3.8 rule 3(a) |

**Added 2026-10-04 (plugin-dex track, finish pass):** a new immutable `GatedFeePassPlugin` (`arc58/plugins/gated-fee-pass`) lets ARC-58 wallet users open, refresh and close GatedFeeHook passes from their own window. It derives the pass key with `pluginPrincipalOf(dao, wallet)` and forwards `windowHint(wallet)`. It is a Phase 3 deliverable (§7.1).

Unaffected (no reinstall): dao, gate, poll, staking, rewards, hyper-swap, nfd, optin, self-optin, pay, pay-silo(+factory), revenue-manager, asa-manager, dual-stake, meta, guild, asset-inbox, sunset, update-akita-dao, haystack-router.

### 6.12 PluginDex (undeployed: adopt from day one, no compatibility shims)

| Item | Current | Change |
|---|---|---|
| `swap`, `swapRoute`, `quote`, `quoteRoute`, `tryQuoteRoute` (`plugin-dex/contract.algo.ts:2002, 2018, 2096, 2101, 2107`) | no hint | append `wallet: uint64` |
| `HookContext` (`plugin-dex/types.ts:168-180`, field order "frozen" in `plugin-dex/research/FINAL-SPEC.md:275`) | `caller`, `callerApp` | add `wallet: uint64` immediately after `callerApp`; recompile all hooks and mocks |
| Vault | DAO-agnostic (`create(version, admin)`) | stays DAO-agnostic: hooks verify |
| GatedFeeHook identity | registry via `hooks/shared/origin.ts:32-68` at `gated-fee.algo.ts:298`, `:482` | BeforeSwap: `resolvePrincipalFromDexCtx(F, ctx.wallet, ctx.caller, ctx.callerApp)` (strict; invalid hint reverts, per Kyle's default). This is sound only because the Vault sets `ctx.caller = Txn.sender` at BeforeSwap (`plugin-dex/contract.algo.ts:1386, 1514, 1848`) and the hook authenticates the Vault (`requireDexCaller`, `gated-fee.algo.ts:245`). **Quote point: never the ctx variant.** There `ctx.caller` is the caller-chosen `swapper` (`plugin-dex/contract.algo.ts:1276-1281`), so use only `thirdPartyPrincipal(F, swapper, ctx.wallet)` (quote-only, §3.3) |
| Passes | keyed by spender (`gated-fee.algo.ts:223-224, 256`) | **keyed by principal**, with hint-based owner authentication: `openPass(mbr, key, measure, gateArgs, wallet)` requires `key == principalOf(F, wallet).principal`, so no one opens a pass for someone else. `refresh(key, measure, gateArgs, wallet)` and `closePass(key, wallet)`: `requireOwnerIfLive` (`:405-409`) becomes `Txn.sender == key \|\| Txn.sender == funder \|\| principalOf(F, wallet).principal == key`. Without this, the owner (usually `C` behind a window) can never be `Txn.sender`, and a griefer who opened the pass first would hold the slot for `passTtl`. `refreshFromGate(gateTxn, key, slot, wallet)` asserts the gate with `gateCheckCtx(gateTxn, dao, gateCtx(p), slot)` where `p = principalOf(F, wallet)` and `p.principal == key`. `PassMbr` stays 47,700. **Delete `hooks/shared/origin.ts`.** Side effect: one pass and one daily cap per user across escrows |
| Router | — | §6.11 |
| LaunchManager | `devBuy` calls `PluginDex.swap` (`plugin-dex/launch/launch-manager.algo.ts:334`) | pass `wallet = 0` (it acts as itself) |
| Tests | `plugin-dex/tests/mock-wallet.algo.ts:32-33` registers in EscrowFactory; `hooks/gated-fee.e2e.spec.ts:882` asserts the `resolveOrigin` fallback | rewrite the mock wallet as a factory-created wallet (or drop `register`); replace the `resolveOrigin` assertions with hint cases. New tests: **P2-DEX-01** pass opened by a third party is rejected; **P2-DEX-02** the owner refreshes/closes through a plugin window with a hint; **P2-DEX-03** Quote with a forged `Wf` (`spending_address = victim`) and an arbitrary `swapper`, called from an app X, yields no discount for the victim's identity; **P2-DEX-04** LaunchManager dev buy with `wallet = 0` |

### 6.13 SDK (Phases 1–3)

- Direct wrappers gain `wallet?: bigint` (default `0n`) for every method in §6.1–6.8 (call sites listed in the plugin research notes §6: `akita-sdk/src/social/index.ts`, `subscriptions/index.ts`, `staking-pool/{factory,index}.ts`, `auction/{factory,index}.ts`, `marketplace/index.ts`, `raffle/{factory,index}.ts`).
- New `akita-sdk/src/principal.ts`: an off-chain mirror of §3.1 used to predict the principal for direct-call gate subjects and to seed `P(W)`/`A(C)`/`A(W.address)` before simulation.
- Cost quotes pass the wallet to the new readonly selectors.
- Regenerate clients. New plugin ids flow through `recordPluginDeployment` (`scripts/script-base.ts:723+`) → `akita-sdk/src/networks.ts` → `getPluginUpdate` (`:696-703`).

---

## 7. Migration and rollout

### 7.1 Order

| Phase | Content | Gate to proceed |
|---|---|---|
| **0** | Standard, helper, mirror, adversarial suite (§5) | §5.4 |
| **1** | Shared infrastructure, no MainNet change: `legacy*` renames, `sendReferralPaymentTo`, `tipWallet`, SDK principal mirror and preparer resource seeding, deploy and test scripts for the new sub-gates | full suite green |
| **2a** | **Upgrade path.** Deploy the new `UpdateAkitaDAOPlugin` (page growth and schema pass-through, `arc58/plugins/update-akita-dao/contract.algo.ts:123-170`). Pass a DAO proposal that repoints `PluginAppList.update` (read by `update`, §6 conventions), the matching `AkitaAppList`/`PluginAppList` entries and the DAO wallet's grant for the update plugin. Fund the DAO wallet as size sponsor (page growth moves the app's whole MBR onto the update sender, `utils/programs.ts:51-78`) | LocalNet rehearsal **starting from the `HEAD` update plugin and the deployed singleton bytecode**: the old plugin fails to push AkitaSocial (> 8,192 B), the repointed plugin succeeds, and the DAO wallet balance covers the sponsorship (P2-UPD-01) |
| **2** | **Targets first.** One DAO proposal set upgrades the singletons (`AkitaSocial`, `AkitaSocialGraph`, `Subscriptions`, `Marketplace`, `StakingPoolFactory`, `AuctionFactory`, `RaffleFactory`, `AbstractedAccountFactory`) to *hinted selectors + legacy shims* (RaffleFactory: no creation shims, K6) and pushes new child bytecode (Auction, Raffle, Listing rev 3, StakingPool with shims and markers). Deploy Gate v2 with `mustCheckFor` and the new context-aware sub-gates, allowlist them and import existing gates (§6.9). Ship SDK direct wrappers with `wallet`. Each factory upgrade lands in the same proposal as its child-bytecode push | the compatibility suite (below) passes against the **deployed** plugin and child bytecode, and the named Phase 2 tests (§7.5) pass |
| **3** | **Plugins.** Deploy 6 new plugin ids (+ welcome, router), swap DAO wallet grants (`scripts/update-dao-wallet-plugins.ts`; named aliases are refused at `:367-380`, so use the manual path from `scripts/install-dao-social-caller.ts`), append ids to the SDK and ship the in-app "update plugin" prompt (`getPluginUpdate`). Stop SDK registry writes. Launch PluginDex with hints | — |
| **4** | **Retirement** (§7.4) | criteria met |

Ordering constraint: a new plugin compiled against hinted selectors reverts until its target is upgraded, so Phase 2 must land before Phase 3.

Phase 3 gate item (added 2026-10-04, finish pass): deploy `GatedFeePassPlugin` pinned to the GatedFeeHook, and ship its id with the PluginDex launch, before any pool installs GatedFeeHook. Without it every wallet user pays the full fee. The social switch `SOCIAL_HINTED_TARGETS[network]` flips to `true` in the release that records the executed Phase 2 AkitaSocial/AkitaSocialGraph upgrade, in the same way as the registry switch below.

SDK registry-write coupling (added 2026-10-04, wallet-track review fix): "Stop SDK registry writes" is a per-network switch, `REGISTRY_WRITES_STOPPED` in `akita-sdk/src/networks.ts`. `newWallet` and `addPlugin` (new escrow) write the EscrowFactory registry by default while the switch is `false`; an explicit `register` / `registerEscrow` flag wins. TestNet/MainNet stay `false` until the Phase 3 proposal has executed there, and the release that records that execution flips the switch. LocalNet is `true`, because every LocalNet universe runs the working tree. Shipping an SDK with the switch `true` before Phase 2/3 land would drop new wallets and escrows from the registry that every deployed consumer still reads (lost referral payouts, legacy sub-gate `mustGet` panics, escrow activity attributed to the escrow).

**Compatibility baseline = deployed bytecode, not the working tree.** "Old plugins" and "today's semantics" mean the approval programs live on MainNet. They span several generations: December 2025 and May 2026 plugin ids, social plugin 3633295088/3643581007, staking-pool plugin 3642438287 (`akita-sdk/src/networks.ts:283-339`). The working tree differs substantially from them. `git diff --stat HEAD` over `smart_contracts/` (excluding artifacts) shows ≈17,500 inserted lines, including `social/contract.algo.ts` (470), `staking-pool/contract.algo.ts` (1,158), `raffle/contract.algo.ts` (573) and `arc58/account/contract.algo.ts` (375). Concretely, the committed social plugin (≈ deployed 3643581007) has no referral quote, while the committed `AkitaSocial.validatePostPayment` adds `referralFee(akta)` itself (`HEAD:social/contract.algo.ts:738-747`). Therefore:

1. The LocalNet compatibility suite fetches the deployed approval/clear programs by app id (algod `GET /v2/applications/{id}`), or builds the deploy commits, and installs **those** programs as the old plugins and old children.
2. Every shim requirement (exact payment terms, quote paths, gate subjects, selector checks) is re-derived from that code before Phase 2 is frozen. The citations in §6 and §7.2 are working-tree citations and serve only as pointers.
3. **Ride-along remediation.** Phase 2 upgrades the singletons from the *working tree*, so it also ships every pending audit fix in those files (`CONTRACT_AUDIT.md`, `ACCESS_LIST_AUDIT.md` and the uncommitted remediation). Before the proposal, list per contract which pending changes ride along, and run the compatibility suite against them separately from the principal change, so that a regression can be attributed to one or the other.

### 7.2 Compatibility window: both ABIs coexist

- **Mechanism.** In each upgraded singleton and each new child, the hinted method keeps the canonical TS and ARC-4 name (`post`). The legacy shim is a second TS method, e.g. `legacyPost`, with `@abimethod({ name: 'post' })` and the **old** signature. Overloading by signature is supported by the puya backend (precedent `puya/test_cases/typed_abi_call/logger.py:29-45`; confirmed for PuyaTs by T36). Fallback if T36 fails: hard cutover per contract (option 2 below).
- **Shim semantics are exactly the deployed semantics.** Deployed plugins rely on exact payment matches and on quotes they compute locally, so any semantic change in a shim reverts calls from old plugins. The working-tree pointers (social plugin `:97-99`, `social/contract.algo.ts:788-831`, `subscriptions/contract.algo.ts:409, 582`, `staking-pool/factory.algo.ts:109-110`) are **not** the baseline. The committed social plugin has no referral quote at all (§7.1). The full shim semantics are therefore re-derived from deployed bytecode, and they include at least:
  - registry referral and registry gate origin (through `legacy*` helpers);
  - the tip route on the raw `meta.wallet` (`tipCreator(..., legacy=true)`, §6.2);
  - gated paths that call private `xImpl(..., gated)` instead of comparing selectors (§6 conventions; Raffle, Subscriptions);
  - creation shims that forward a creation-time `sellerReferrer` (§6.6–6.7; RaffleFactory has none, K6 in §9.4);
  - the StakingPool `gatedEnter`/`enterCost` shims that write and charge `'i'` from the registry (§6.5);
  - the legacy `gatedTriggerPayment` (§6.4).
- **Program size.** AkitaSocial grows from about 8.3 KB by 10 hinted methods plus shims. AVM 13 allows 8 pages, i.e. 16,384 B for approval + clear (`utils/programs.ts:8-19`), so there is headroom. **Only the Phase 2a update plugin can use it** (§6 conventions, §7.1). Page growth makes the DAO wallet the size sponsor and requires passing the current schema (`utils/programs.ts:51-78`). Budget a funded DAO wallet.
- **Mixed generations of children.** Live children keep old code (registry) until they end. New plugins select the ABI by marker (`seller_referrer` for Auction/Raffle, `pv` for StakingPool) and use the legacy gate subject for old children (`legacyOriginOr(legacyWalletOf(S), S)`, matching what the old child asserts). Old plugins hitting new children use the shims.
- **Option 2 (hard cutover)** applies only to a contract where T36 fails or size forbids shims. Upgrade the target and swap the plugin in the same DAO proposal; old grants of that plugin break until reinstalled.

### 7.3 Plugin reinstall plan

- The swap is a straight app-id swap: plugin ABIs, method-restriction selectors, allowances, escrows and SDK wrappers carry over. The exception is the new social method `setMetaWallet`, which method-restricted social grants must add explicitly if they want it. **Second exception (added 2026-10-04, marketplace review fixes):** the new MarketplacePlugin `purchase` carries the audit MKT-02 `maxPrice` argument. Its selector changes from `0x269e4bb0` `purchase(uint64,bool,uint64,address,byte[][])void` to `0x703f18ca` `purchase(uint64,bool,uint64,address,uint64,byte[][])void`. Method-restricted grants, execution keys and keepers pinned to `0x269e4bb0` must switch to the new selector. Until Phase 3, the SDK builds the old ABI for the deployed plugin ids. Execution keys pinned to old ids, automation that pins ids, and `start`/`lastCalled` counters do **not** carry over.
- **DAO wallet:** a proposal per §7.1 Phase 3.
- **User wallets:** there is no automatic path (the factory installs plugins only at creation, `arc58/account/factory.algo.ts:209-229`). The frontend flags stale grants through `getPluginUpdate` and builds the admin-signed `arc58_removePlugin` + `arc58_addPlugin`; plugin MBR nets to about zero.
- **Measure first:** count wallets holding affected grants with the read-only indexer pattern in `scripts/inventory-mainnet-escrows.mjs` (or the creator scan in `scripts/update-automatic-wallets.ts`), filtered to the 6 plugin keys' id histories (`akita-sdk/src/networks.ts:283-339`, which includes the December-2025 generation).

### 7.4 Retiring registry reads

All of these must hold before Phase 4:
1. No legacy-selector calls on MainNet for 30 consecutive days (indexer: app calls with old selectors to the singletons), or Kyle's chosen window (Q10).
2. The DAO wallet holds no old-generation grants of the 6 plugins.
3. No live **singleton** code path calls `legacy*` except the shims being removed.

Then: DAO-upgrade the singletons without shims, push child bytecode without shims, ship the wallet version without `register`, drop `ARC58WalletIDsByAccountsMbr` from the factory, delete the SDK writers and the `legacy*` helpers. EscrowFactory stays deployed unchanged (immutable, still the escrow creator). Its registry is then read only by old children until they settle, and by old sub-gates until their gates are re-registered.

### 7.5 Named Phase 2–4 tests (part of the Phase 2 gate)

| ID | Contract | Scenario | Expected |
|---|---|---|---|
| P2-UPD-01 | UpdateAkitaDAOPlugin | §7.1 Phase 2a rehearsal from the `HEAD` update plugin and the deployed singleton bytecode | old plugin fails on AkitaSocial (> 8,192 B); new plugin succeeds; DAO wallet is the sponsor |
| P2-CMP-01 | all | compatibility suite: deployed plugin bytecode (each generation in `akita-sdk/src/networks.ts:283-339`) against upgraded targets and new children | all deployed flows pass |
| P2-RAF-01 | Raffle | old-ABI `gatedEnter`/`gatedEnterAsa`/`gatedAdd`/`gatedAddAsa` on a new child | pass (no `errBadMethodGateNeeded`) |
| P2-SUB-01 | Subscriptions | old-ABI `gatedTriggerPayment` via the deployed Subscriptions plugin on the upgraded singleton | pass (no `errInvalidSequence`) |
| P2-SUB-02 | Subscriptions | `'i'` charge and refund: exact `newSubscriptionCost` (+34,900) and refund in `unsubscribe` (`:902-949`) | exact |
| P2-SUB-03 | Subscriptions | gated trigger by (a) a third-party keeper (hint 0), (b) the subscriber's own wallet from its default window (hint = W), (c) a keeper on a legacy (no `'i'`) subscription; plus a forged-wallet subscriber that sets uint64 globals before (a) | subject (a) `atRestPrincipal`, (b) live `C`, (c) registry; no panic |
| P2-STK-01 | StakingPool | `'i'` charge/refund: exact `enterCost` (+31,700), refund in `removeEntry` (`:1315-1346`) | exact |
| P2-STK-02 | StakingPool | old plugin enters a new pool from an escrow window; a third party calls `gateCheck` | not disqualified (shim wrote `'i'`) |
| P2-STK-03 | StakingPool | entrant with forged `Wf` sets uint64 `controlled_address` after entering; third party calls `gateCheck` after the gate fails | disqualified; no panic |
| P2-STK-04 | StakingPool | gated entry with non-empty gate args | charged per the corrected `entries` formula (§6.5, Q14) |
| P2-REF-01 | Auction, Listing (Raffle: none since K6) | old plugin creates on the upgraded factory, then completes | `seller_referrer` = creation-time registry referrer, paid at completion. Raffle instead asserts that the deployed creation selectors have no route (`raffle/principal.e2e.spec.ts`, `tests/compat` B5 and CMP-S5) |
| P2-REF-02 | Auction, Listing, Raffle | new plugin on old children (no `seller_referrer`/`pv` marker) and old plugin on new children | each uses the right ABI; referrals paid as before |
| P2-SOC-01 | AkitaSocial | deployed social plugin; creator with a meta whose `wallet` no longer owns the creator at rest but has a live `C` | reply/vote/react pass (legacy tip route) |
| P2-SOC-02 | AkitaSocial | upgrade with page growth, DAO wallet as sponsor, current schema passed | pass |
| P2-SOC-03 | AkitaSocial + plugin | `setMetaWallet` through the new social plugin | `meta.wallet` rebound after strict verification |
| P2-SOC-04 | social sub-gates | escrow-window activity vs `social-activity` gate (E28) | documents the Q4/Q5 outcome |
| P2-GATE-01 | Gate v2 + SubscriptionGate | `Wd` default grant, subscription held by `Wd`'s escrow `E`, `gatedReply` via `mustCheckFor` | pass (today passes; regression guard for E23) |
| P2-GATE-02 | Gate v2 + AkitaReferrerGate | `Wx` default grant, gated action | pass |
| P2-GATE-03 | Gate v2 | `mustCheckFor` with a `ctx` that differs from the target's `p` in any field | target rejects (`gateCheckCtx`) |
| P2-GATE-04 | Gate v2 | mixed filters: one context-aware and one plain sub-gate | each receives the right call |
| P2-ABI-01 | all | typed-client and SDK generation with overloaded names (`client.send.post` for both selectors) | both callable; SDK wrappers pick the hinted one |
| P2-ACC-01 | AbstractedAccountFactory | `newAccount` under A2 with a referrer argument; `createFee < cut + disbursement` | cut paid from the fee; payer pays no `referralMbr`; no underflow (no cut) |
| P4-ESC-01 | EscrowFactory | escrow created after registration stopped; `SunsetContract.deleteEscrows` | documents `errDoesntExist` (Q15) |
| P2-DEX-01…04 | PluginDex | §6.12 | as stated there |

---

## 8. Open questions for Kyle (each with a recommended default) — decided 2026-10-04

Kyle decided all fifteen questions on 2026-10-04 by accepting every recommended default. The right-hand column records each decision and where the code implements it. §9 has the implementation status.

| # | Question | Recommended default | Decision (Kyle, 2026-10-04) and where it is implemented |
|---|---|---|---|
| Q1 | **Wallet factory `newAccount` referral semantics.** Today the cut goes to the *payer's* registered wallet's referrer (`arc58/account/factory.algo.ts:122`), so on the normal onboarding path (EOA payer) it is never paid. Options: **A1** pay the `referrer` argument and charge the disbursement MBR to the payer (new `cost(address)` selector; old clients revert when they pass a referrer). **A2** pay the `referrer` argument and fund the cut plus its disbursement MBR from the creation fee's DAO share (no ABI change, no client breakage). **B** keep payer semantics with a hint. | **A2.** Under A2 the `:126` equality loses `referralMbr`, and the factory skips the cut when `createFee < cut + disbursement MBR`. **Self-referral cannot be enforced**: a guard on `{admin, controlledAddress, payment.sender}` is bypassed with a second address. So A2 in effect becomes a public discount of `cut` on the creation fee, funded by the DAO share. It also starts paying cuts that are not paid today (DAO revenue) | **Decided: A2.** Implemented in `AbstractedAccountFactory` (wallet track): the cut is paid to the `referrer` argument from the creation fee, the payment equality drops `referralMbr`, `cost()` reads no registry, and no cut is paid when `createFee < cut + disbursement MBR`. Test: P2-ACC-01 (`arc58/account/factory.e2e.spec.ts`) |
| Q2 | Close R-STALE in the wallet. **Not** by editing the shared `txnRekeysBack` (`AA:426-441`): `assertRekeysBack` (`AA:443-454`, flash `arc58_rekeyTo`, `AA:1000-1013`) relies on the controlled-address shortcut. Outside a window `spending_address` is zero (`AA:804`, `:989`), so a shortcut gated on `spendingAddress == controlledAddress` would reject every flash return. The only other accepted return, `arc58_verifyAuthAddress`, also fails with zero spending (`AA:754-759`). Proposed: (a) in `assertValidGroup` (`AA:531`), **drop the shortcut entirely**; a default window can never use it, because `C` is rekeyed to `P` and cannot sign at the outer level. (b) In `assertRekeysBack`, accept only the shortcut txn itself, or `verifyAuthAddress` when `spending_address == controlled_address`. This is a wallet contract change | **Yes**, in the next wallet version (it also closes a pre-existing custody gap). T25 then expects both constructions to fail; T13/T44 must still pass | **Decided: yes.** Implemented in `AbstractedAccount` (wallet track): `assertValidGroup` accepts only `arc58_verifyAuthAddress` as the window close; `assertRekeysBack` accepts the shortcut txn or `verifyAuthAddress` while `spending_address == controlled_address`. `Q2_WALLET_FIX_LANDED = true` in the Phase 0 suite (T25 expects `errNrkb`; T13/T44 unchanged). Tests: `arc58/account/rekeying.e2e.spec.ts`, T13/T25/T44 |
| Q3 | Add a factory-side AppVersion pin (record `appVersion(W)` on each factory push; treat admin-updated wallets as non-genuine; consumers move to AVM 12 and need `P(factory)+B(factory,W)`) | **No.** §4.1 F2 already blocks window borrowing; the remaining forged-wallet effect is a self-referral rebate, which exists today | **Decided: no.** Nothing implemented |
| Q4 | Social and graph gate subject: principal (consistent) or spender. Today they gate on `Txn.sender` while the plugin passes the origin, so escrow-scoped grants already fail. Combined with Q5, social sub-gates then read `C`'s social state when the activity happened on `E` (E28) | **Principal** (via `ctx`) | **Decided: principal via `ctx`.** AkitaSocial and AkitaSocialGraph hinted gated methods assert `gateCheckCtx(gateTxn, dao, gateCtx(p), gateID)`; the legacy shims keep `Txn.sender` |
| Q5 | Social state (meta, posts) keyed by the spender or re-keyed by principal | **Keep the spender.** Principal is used only for gates, referral and `meta.wallet`. Accept E28: users who act from escrows build social history on the escrow, not on `C` | **Decided: keep the spender.** Social state stays keyed by `Txn.sender`; `initMeta` keeps `user === Txn.sender` (S-02). E28 is covered by P2-SOC-04 |
| Q6 | Hint omission: callers can pass 0 and act as the spender, which evades origin-keyed deny rules and skips referral | **Accept.** Gate authors who need deny semantics key on the spender as well. Akita plugins always pass `wallet.id` | **Decided: accept.** Every hinted method accepts hint 0 (acts as the spender). Akita plugins pass `windowHint(wallet)` (§3.8 rule 6) |
| Q7 | Add referral to subscription renewals (+12,800 µA per subscription box) or to raffle creation fees | **No** (unchanged scope) | **Decided: no.** No new referral site was added |
| Q8 | Upgrade live Auction/Raffle/StakingPool children in place (one at a time, `updateAppWithSchema`, DAO wallet as size sponsor) | **No.** Let them settle on registry semantics | **Decided: no.** Only new children get new bytecode. New plugins pick the ABI by marker (`pv`, `seller_referrer`) and keep the deployed ABI for old children |
| Q9 | Genuineness = a single factory (`AkitaAppList.wallet`) or an allow-list for a future factory redeploy | **Single factory**; the factory is only ever upgraded in place (documented invariant) | **Decided: single factory.** `isGenuineWallet` compares `AppCreator` with `AkitaAppList(dao).wallet` |
| Q10 | Length of the compatibility window before removing legacy shims | **30 days with no legacy-selector traffic**, and a minimum of 60 days after the Phase 3 announcement | **Decided: 30 days / 60 days.** Documentation only (§7.4); nothing in code |
| Q11 | Subscription principal storage: box `'i'` holding the stored pair `(W, principal)` (34,900 µA per gated wallet subscription; 31,700 per StakingPool entrant) or a keeper-supplied hint (no MBR, but the keeper then chooses the subject) | **Box `'i'` with the pair.** The keeper never supplies the subscriber's wallet. Legacy subscriptions use the registry (§6.4 (3), Q13) | **Decided: box `'i'` with `(W, principal)`.** Subscriptions (34,900 µA, hinted gated subscribes) and StakingPool (31,700 µA, hinted gated entries and the legacy `gatedEnter` shim when the registry names a genuine wallet) |
| Q12 | Forward the verified context to gates by adding `Gate.mustCheckFor`/`checkFor` and context-aware sub-gates to **Gate v2 before it ships** (§3.5, §6.9). The alternative is to keep `mustCheck(caller)` and accept E23: an escrow-held subscription or referrer wallet fails gates during default-grant use, which passes today | **Add it to Gate v2.** Gate v2 is still undeployed, so this costs no extra migration | **Decided: add it.** Gate v2 has `checkFor`/`mustCheckFor`, `setSubGate(app, allowed, ctxAware)` and `isCtxSubGate`; SubscriptionGate, SubscriptionStreakGate and AkitaReferrerGate have `checkFor(ctx, …)` (Gate track) |
| Q13 | Legacy gated subscriptions (no `'i'` box) after Phase 4. Options: keep the single registry read in Subscriptions permanently (EscrowFactory stays deployed); backfill `'i'` during the compatibility window through a permissionless, caller-funded `adoptPrincipal(key)` that copies the registry answer once; or fall back to `key.address` | **Backfill during the window, then fall back to `key.address`**, so Phase 4 deletes every registry read as decided. Keep the registry read only if the backfill misses active gated subscriptions | **Decided: backfill, then `key.address`.** `Subscriptions.adoptPrincipal(pay, key)` is permissionless and caller-funded (34,900 µA). The `key.address` fallback is a Phase 4 change (not applied) |
| Q14 | Correct the pre-existing `PoolEntriesMBR` undercharge (≥ 27,300 actual vs 25,300 charged, plus 400 µA per gate-arg byte) and the `entriesByAddress` overcharge (22,100 vs 25,300) in the new StakingPool child | **Yes**, in the same child bytecode push. The SDK and plugin quotes come from `enterCost`, so nothing hard-codes them | **Decided: yes.** New StakingPool child: `entries` = 2,500 + 400·(60 + encoded gate-arg length), `entriesByAddress` = 22,100, refunded exactly. The legacy shim keeps the flat charge and may borrow only free ALGO (`errNefd` guard) |
| Q15 | Escrows created after registration stops cannot be deleted through `EscrowFactory.delete` (needs the registry box, `escrow/factory.algo.ts:105-108`; sunset `deleteEscrows` `sunset/contract.algo.ts:48-56`) | **Accept for now.** Funds stay reachable through the wallet; add a registry-free delete path whenever the escrow factory is next redeployed | **Decided: accept.** P4-ESC-01 (`arc58/account/reclaim.e2e.spec.ts`) documents `errNreg` from `EscrowFactory.delete` for an unregistered escrow |

---

## 9. Implementation status (final verification 2026-10-05)

All §8 questions, K1–K9 (§9.4) and T32 (§9.6) are decided by Kyle. Phases 0, 1, 2a, 2 and 3 are implemented **in
code** in the uncommitted working tree. **Nothing is deployed and nothing is committed.** Phase 4 is not applied.

**Verified on LocalNet (final tree, 2026-10-05).** Logs are in the session scratchpad `e2e/` (`final-*.log`).

- Whole-tree build (`node scripts/build-contracts.mjs`, then `npm run build` in akita-sdk): every file under
  `smart_contracts/artifacts/`, `akita-sdk/src/generated/` and `akita-sdk/dist/` is byte-identical to the tree the
  tests ran on. §9.7 records the approval bytes and sha256 of each principal app.
- V0 suite (`utils/principal.e2e.spec.ts`): **56/56**. V0.1–V0.4, T01–T50 and T14b/T16b pass; T32 measures
  184 / 194 / 196 ops (T06 / T08 / T11) against the bound of 210 (§3.7).
- Every e2e group of §9.5 (origin-referral, wallet, gates, social, subscriptions, marketplace, staking pool,
  auction/raffle, PluginDex, rollout, compatibility) is green, each in its own runs (see the log) and together in the
  final full suite.
- Full suite (`npx vitest run` in `projects/akita-sc`, one run): **140 files passed, 1 skipped (141). Tests: 2,398
  passed, 0 failed, 1 skipped, 9 todo (2,408).** Duration 2,057 s. The skipped file is
  `arc58/account/backend-hosted-agent-identity-payment.e2e.spec.ts` (by design: it needs an external broker,
  `AKITA_BACKEND_ARC58_GOLDEN=1`). The pre-change baseline was 1,780 passed / 0 failed / 9 todo.
- Unit tests: akita-sc (no e2e) 18 files, 289/289; akita-sdk 46 files, 472/472. `scripts/sync-akita-plugin-principal.ts
  --check`: in sync. `tsc --noEmit`: akita-sdk (`-p tsconfig.esm.json` and `-p tsconfig.cjs.json`) 0 errors; akita-sc
  only the 9 errors that existed before this work (deploy-gates, deploy-rewards-v2, dao.voting e2e, guild
  test-helpers ×4, launch-hooks e2e, staking-pool e2e).
- §5.4 criteria 1, 2, 3, 5 and 6 are met. Criterion 4 (byte-identical pre-existing artifacts) applied to Phase 0
  alone; Phases 2–3 change bytecode by design (§9.2).

Accepted residuals stay as recorded: §4.3 (R-CREATOR, R-REFERRER, R-FACTORY; R-STALE is closed in the tree wallet by
Q2, T44 passes, and stays open on each deployed wallet until it runs the new program), K2/K4/K6/K8/K9 consequences
(§9.4) and the monitoring duties in §9.5. One policy question is open for Kyle (§9.6). The detailed record, with
every interface and deviation, is `docs/principal-resolution/IMPLEMENTATION-LOG.md`. This section summarises it.

### 9.1 What is implemented, per phase

| Phase | Implemented | Main files |
|---|---|---|
| 0 | `utils/principal.ts` (resolver, at-rest and third-party helpers, `windowHint`, `GateCtx`), mirrored to `@akta/plugin/principal` minus an `@akita-sc-only` block (`resolvePrincipalFromDexCtx`, `tipWalletFor`). New §3.8 rule 6: a plugin forwards only `windowHint(wallet)`. `functions.ts` wrappers (`principalOf` … `gateCheckCtx`). Mocks and the adversarial suite `utils/principal.e2e.spec.ts` (V0.1–V0.4, T01–T50, T14b, T16b) | `utils/principal.ts`, `akita-plugin/principal.ts`, `scripts/sync-akita-plugin-principal.ts`, `mocks/{fake-dao,forged-wallet,principal-*}` |
| 1 | `legacy*` renames (registry helpers, Phase 4 deletes them), `referralFeeTo`/`sendReferralPaymentTo`, `tipWallet`. SDK `@akta/sdk/principal` (off-chain predictor) and opt-in Access-list seeding. Sub-gate allowlist tooling | `utils/functions.ts`, `akita-sdk/src/principal.ts`, `akita-sdk/src/simulate/access-list.ts`, `scripts/allowlist-sub-gates.ts` |
| 2a | `UpdateAkitaDAOPlugin` with page growth, schema pass-through and a second, note-selected DAO binding read (`mustGetExecution` + `getProposal`) that works on the deployed DAO. Rollout scripts for Phases 2a, 2 and 3: plan first, `--confirm` to write, ABI ride-along refusal, Phase 3 guard | `arc58/plugins/update-akita-dao/*`, `scripts/principal-phase2a-update-plugin.ts`, `scripts/principal-phase2-upgrade-targets.ts`, `scripts/principal-phase3-plugins.ts`, `scripts/lib/principal-rollout*.ts` |
| 2 | Hinted selectors and legacy shims in AkitaSocial, AkitaSocialGraph, Subscriptions (+ `'i'`, `adoptPrincipal`, `triggerGateCtx`), Marketplace + Listing rev 3 (`seller_referrer`, `factory_float`), StakingPoolFactory + StakingPool (`pv`, `'i'`, Q14), AuctionFactory + Auction and RaffleFactory + Raffle (`seller_referrer`, `xImpl(gated)`). AbstractedAccountFactory (Q1-A2) and AbstractedAccount (Q2). Gate v2 `checkFor`/`mustCheckFor` and three context-aware sub-gates. Guild subscription consensus moved to the hinted selectors. SDK direct wrappers take `wallet`, with per-network switches `SOCIAL_HINTED_TARGETS` and `REGISTRY_WRITES_STOPPED` | contracts under `social/`, `subscriptions/`, `marketplace/`, `staking-pool/`, `auction/`, `raffle/`, `gates/`, `arc58/account/`; matching `akita-sdk/src/*` |
| 3 | New plugin versions: Social (+ `setMetaWallet`), Subscriptions, StakingPool, Auction v3, Raffle v3, Marketplace, Welcome (undeployed, edited in place), AkitaRouter. New `GatedFeePassPlugin`. PluginDex, its hooks and LaunchManager adopt hints from day one. SDK plugin wrappers (incl. `SocialPluginSDK.setMetaWallet`) and the DAO-wallet grant migration (incl. the marketplace `purchase` selector map) | `arc58/plugins/*`, `plugin-dex/*`, `scripts/lib/dao-wallet-plugin-migration.ts` |
| P2-CMP-01 | Compatibility suite on the MainNet bytes of 34 programs (read-only `GET /v2/applications/{id}`). Static half: 121 tests (120 before K6), all pass. LocalNet half (`compat.e2e.spec.ts`, 32 tests, plus the member specs in `tests/compat/members.ts`) green in the final full suite (2026-10-05) | `tests/compat/*` |
| 4 | **Not applied.** Listed in §9.5 | — |

### 9.2 Program sizes (full whole-tree build, `node scripts/build-contracts.mjs`, 2026-10-04)

Approval bytes. HEAD = commit `e7f174ee`. Pages = ⌈(approval + clear) / 2,048⌉ = 1 + extra pages; the AVM maximum is
8 pages (16,384 B). **Bold** = above 8,192 B, i.e. more than the 4 pages (3 extra) that every MainNet singleton has today.

| App | HEAD | Now | Pages | Note |
|---|---|---|---|---|
| **PluginDex** | 1,600 (old v1) | **14,092** | 7 | undeployed; limit 15,000 (`plugin-dex/size.test.ts`) |
| **StakingPool** (child) | 8,158 | **12,660** | 7 | new children only; 7 upload chunks, so the factory + child Phase 2 group is exactly 16 txns |
| **AkitaSocial** | 8,186 | **10,884** | 6 | MainNet has 4 pages: the Phase 2 push grows it 3 → 5 extra pages (Phase 2a plugin, DAO wallet is the size sponsor) |
| **Subscriptions** | 8,181 | **10,179** | 5 | 3 → 4 extra pages; 57 B left in 4 extra pages |
| **AkitaDAO** | 7,151 | **9,738** | 5 | audit ride-along, not a principal change; pushed by the Phase 2a plugin (`--target AkitaDAO`) |
| AbstractedAccount | 8,186 | 8,178 | 4 | 10 B left in 4 pages (approval + 4 B clear); Q2 |
| Auction (child) | 7,300 | 8,153 | 4 | |
| AkitaSocialPlugin | 7,230 | 8,030 | 4 | |
| Raffle (child) | 6,589 | 7,945 | 4 | |
| Marketplace | 3,849 | 5,656 | 3 | fits MainNet's 4 pages |
| AuctionFactory | 3,426 | 4,719 | 3 | |
| SubscriptionsPlugin | 3,701 | 4,462 | 3 | |
| SubscriptionGuildConsensus | — | 4,311 | 3 | undeployed |
| RafflePlugin v3 | 2,255 | 4,300 | 3 | now 2 extra pages (Kyle decision K7) |
| RaffleFactory | 2,670 | 3,751 | 2 | K6: legacy creation shims deleted (was 4,197 B, 3 pages); single-file build 2026-10-04, then replaced by the whole-tree output (§9.3). sha256 `0b1b10e7…8474`, pinned in `auction/principal-abi.test.ts`. The hinted `newRaffle`/`newPrizeBoxRaffle` were **recompiled, not byte-preserved**: puya inlined the former `*Impl` bodies (same source order), so the bytecblock and both method bodies differ from the pre-K6 build. Only e2e runs prove the new bytes (§9.5, K6) |
| GatedFeeHook | — | 4,117 | 3 | undeployed |
| StakingPoolFactory | 2,453 | 3,960 | 2 | |
| AkitaRouterPlugin | — | 3,828 | 2 | undeployed |
| AuctionPlugin v3 | 2,964 | 3,827 | 2 | |
| LaunchManager | — | 3,769 | 2 | undeployed |
| AbstractedAccountFactory | 3,240 | 3,515 | 2 | |
| Gate (v2) | 2,035 | 3,320 | 2 | new app |
| Listing (rev 3 child) | 3,011 | 3,137 | 2 | |
| MarketplacePlugin | 2,330 | 2,678 | 2 | |
| StakingPoolPlugin | 1,753 | 2,577 | 2 | |
| UpdateAkitaDAOPlugin | 1,721 | 2,559 | 2 | sha256 now `bc034036…eb4e` (whole-tree build; see §9.3) |
| AkitaSocialGraph | 1,794 | 2,454 | 2 | |
| SubscriptionStreakGate | 780 | 1,771 | 1 | new app |
| SubscriptionGate | 652 | 1,530 | 1 | new app |
| GatedFeePassPlugin | — | 1,520 | 1 | new |
| WelcomePlugin | — | 1,310 | 1 | undeployed |
| AkitaReferrerGate | 633 | 816 | 1 | new app |

Other apps above 8,192 B that this work did not change: `arc58/guilds/core/Guild` 10,246 B (6 pages) and the test-only
mocks MockBigWallet, MockStatefulBigTarget and MockBigUpgradeTarget (5–6 pages).

### 9.3 Build-mode note

Phase 1 found that `build-contracts.mjs <file>` (one file) and the whole-tree build give different bytecode (ARC-4
router order) for some contracts with the same sources. Several tracks left single-file artifacts. The full build in
this pass replaced them with whole-tree output. Bytecode (not size) changed for StakingPool, StakingPoolFactory,
AkitaSocial, Auction, AuctionFactory, Raffle, RaffleFactory and UpdateAkitaDAOPlugin; MockBigWallet also grew by
12 B. The UpdateAkitaDAOPlugin sha256 in the update-plugin log section (`69b4f14c…`) is superseded by
`bc034036b0716293de5be9a0773a14138c62673adc358d6fd1a38e0a428eeb4e`. The rollout identifies the plugin by behaviour and by
its deploy receipt, so no script pins either hash. **Deploy only from a whole-tree build, and compare like with like.**
RaffleFactory is the exception: `auction/principal-abi.test.ts` pins its whole-tree sha256 (`0b1b10e7…8474`), so a
single-file rebuild (different router order, same 3,751 B) fails the unit suite instead of changing the Phase 2 bytes
silently.

### 9.4 Deviations from this spec (details and reasons in IMPLEMENTATION-LOG.md)

Decisions on these deviations: **decided by Kyle on 2026-10-04, all recommendations accepted.** The right-hand
column records the chosen option. The T32 opcode bound was decided separately (§9.6, raised to 210). Accepted ABI removals (K2, K6) are checked in as data,
`scripts/lib/principal-accepted-abi-removals.json`, so the Phase 2 guard passes them without `--accept-removed` and still
refuses every other removal.

| # | Deviation | Options | Decision (Kyle, 2026-10-04) |
|---|---|---|---|
| K1 | UpdateAkitaDAOPlugin (Phase 2a) gained a note-selected proposal read, because the deployed DAO has no `isUpgradeLease` and no admin route. Without it the rollout deadlocks | approve (recommended), or design another route for the DAO's own upgrade | **Approved.** The note-selected proposal read stays as implemented |
| K2 | `AbstractedAccountFactory.newAccount` loses the deployed 10-argument selector (pre-existing `automaticUpdates` change, not principal). Contradicts §6.1 "unchanged" | accept with `--accept-removed`, or add a legacy shim (the factory has room) | **Accepted, no shim** (the ABI change itself was decided on 2026-10-03). Recorded in the accepted-removals list. Consequences (corrected in the review pass): (1) **SDK lockstep.** The HEAD/published `WalletFactorySDK.new`/`newWallet` sends the 10-argument selector; the tree SDK sends only the 11-argument one. Ship the SDK release in lockstep with the AbstractedAccountFactory upgrade: older SDKs cannot create wallets on the upgraded factory, and the new SDK cannot create wallets before it. Every frontend, backend and off-chain service that creates wallets updates at the same time. (2) **Welcome and Guild.** Both call the 11-argument `newAccount`. Deploy them (or switch any existing instance over) in the same execution as the factory upgrade or right after it, **never before**: before the upgrade every wallet creation through them reverts. No MainNet or TestNet instance of either is recorded (deployment summaries, `akita-sdk/src/networks.ts`), and neither source was ever committed, so nothing deployed breaks |
| K3 | GatedFeeHook at BeforeSwap prices a non-genuine in-app hint as hint 0 instead of reverting (narrows ACC-01 "a wrong hint reverts"; nothing is read through the hint) | approve, or revert the 3-line `if` and accept that the router cannot trade GatedFee pools for non-Akita wallets | **Approved.** The fallback stays (a non-genuine in-app hint is priced as hint 0) |
| K4 | AkitaSocial legacy payment terms only for app callers (any app off MainNet; the four pinned social plugins on MainNet). Old direct SDK callers get `errInvalidPayment` after Phase 2. A bounded MBR drain stays possible through an installed deployed plugin until Phase 4 | accept; monitor AkitaSocial's free balance from Phase 2 to Phase 4 | **Accepted.** Monitor AkitaSocial's free balance from Phase 2 execution to Phase 4 and top it up. Ship the `SOCIAL_HINTED_TARGETS` flip in the release right after Phase 2 executes |
| K5 | Marketplace shims pay the creation-time registry referrer on shim-created rev-3 listings (deployed children never paid a seller referral) | keep, or make `legacySellerReferrer()` return zero (one line) | **Keep** the seller-referrer payout on shim-created Listing rev 3 |
| K6 | RaffleFactory legacy creation shims are unreachable for deployed-era callers (107,000 µA short) | delete them (recommended), or add a per-raffle float | **Delete.** Done 2026-10-04: shims removed, RaffleFactory 4,197 → 3,751 B; removal recorded in the accepted-removals list. Consequence (corrected in the review pass): raffle creation through the deployed RafflePlugins already fails on the deployed factory (audit AR-14: they pay no creation fee, disbursement MBR or weights MBR); nothing changes for them. Direct creation with the HEAD SDK works today and stops when the RaffleFactory upgrade executes (its quote is 107,000 µA short, and the deployed selectors have no route). Ship the new SDK in lockstep. Wallet users get raffle creation with the Phase 3 v3 plugin |
| K7 | RafflePlugin v3 keeps the `minEntries` overloads, so it needs 2 extra pages (+100,000 µA once) | keep, or drop them (1 page; seller then calls `setMinEntries`) | **Keep** the `minEntries` overloads (2 extra pages) |
| K8 | Marketplace legacy-payment float (164,000 µA per old-plugin listing, recovered at sale or delist; 2026-10-11: 189,600, or 176,800 for a prize box, since Rewards v2 charges 12,800 more per quoted disbursement) with a 500,000 µA reserve (`errLflt`) | accept; keep the factory funded per the runbook | **Accepted.** Keep the Marketplace factory funded per the runbook: hold at least 500,000 µA plus 189,600 µA per legacy-paid listing you expect to be open at the same time (ALGO-priced only). MainNet's free balance on 2026-10-04 (1,905,400 µA) covers 7 |
| K9 | StakingPool legacy `gatedEnter` with long gate args into a new child reverts `errNefd` when the pool's free ALGO cannot cover the shortfall | accept | **Accepted** |

Implementation deviations already taken (no decision needed unless Kyle disagrees): hinted `enterCost` takes the gate
args (§6.5); `setSubGate` replaced instead of overloaded, plus `isCtxSubGate`; AkitaReferrerGate `checkFor` also checks
genuineness; legacy AkitaReferrerGate `check` returns false instead of reverting; v3 RafflePlugin uses subject `S` on
deployed children; StakingPool plugin uses the deployed child's raw-origin subject; StakingPool `gateCheck` has a
registry fallback for May-plugin entries without a pair; Subscriptions merges the subscribe paths to fit 4 extra pages;
`adoptPrincipal` takes a payment and refuses ungated or unregistered subscriptions; MarketplacePlugin `purchase` changes
selector (MKT-02, §7.3 second exception); Listing gains `factory_float` (+78,500 µA creation MBR, a refundable deposit);
SDK registry writes and social hinted targets stop per network, by switch; Welcome edited in place; the Phase 2a "admin
route" is gone; no Gate v1 → v2 import script (SG-A runbook needed).

Fixed in the finish pass (2026-10-04, see the log): the marketplace `purchase` selector map in the DAO-wallet grant
migration, `SocialPluginSDK.setMetaWallet`, `StakingPoolSDK.gateCheck` on live pools (deployed
`gateCheck(appl,address,uint64)void` with a caller gate txn) and `RaffleSDK.state` on live raffles (deployed `getState`
selector).

### 9.5 What remains

**LocalNet verification: done (final tree, 2026-10-05).** Each group below ran green, first in its own runs (one
log section per group) and then together in the final full suite (§9 intro). To repeat it, run every command from
`projects/akita-sc`, wrapped in `with-localnet-lock.sh <lane>`, in this order:
1. `npx vitest run smart_contracts/utils/principal.e2e.spec.ts` (V0 gate). **Done:** 56/56; T31/T32 written into
   §3.6–3.7; T32 measures 184 / 194 / 196 ops against the bound of 210 (§9.6).
2. `smart_contracts/utils/origin-spoofing.e2e.spec.ts`, `smart_contracts/utils/referral-to.e2e.spec.ts`. **Done:** 8/8
   (log, "E2E group origin-referral").
3. Wallet: `smart_contracts/arc58/account/{rekeying,factory,reclaim,admin,contract,account-fixes,plugin-version,agent-delegation,hosted-agent-identity-payment,backend-hosted-agent-identity-payment,balance-reader}.e2e.spec.ts`, `smart_contracts/arc58/plugins/welcome/welcome.e2e.spec.ts`, `smart_contracts/escrow/escrow.e2e.spec.ts`.
4. Gates: `smart_contracts/gates/{gate-ctx,ctx-sub-gates,gate-v2,subscription-gates,contract,staking-amount-gate,staking-power-gate}.e2e.spec.ts`, `smart_contracts/arc58/plugins/gate/gate.e2e.spec.ts`.
5. Social: `smart_contracts/social/{principal,social}.e2e.spec.ts`, `smart_contracts/arc58/plugins/social/{principal,deployed-compat,social}.e2e.spec.ts`.
6. Subscriptions: `smart_contracts/subscriptions/{principal,compat,subscriptions-audit,subscriptions}.e2e.spec.ts`, `smart_contracts/arc58/plugins/subscriptions/subscriptions.e2e.spec.ts`, `smart_contracts/arc58/guilds/tests/{subscriptions,consensus-actions,audit-remediation,factory}.e2e.spec.ts`.
7. Marketplace: `smart_contracts/marketplace/{principal,compat,marketplace}.e2e.spec.ts`, `smart_contracts/arc58/plugins/marketplace/marketplace.e2e.spec.ts`, `smart_contracts/arc58/plugins/plugin-sdk-hooks.e2e.spec.ts`, `smart_contracts/prize-box/prize-box.e2e.spec.ts`, `smart_contracts/arc58/dao/tests/upgrade/dao.upgrade.e2e.spec.ts`.
8. Staking pool: `smart_contracts/staking-pool/{principal,staking-pool}.e2e.spec.ts`, `smart_contracts/arc58/plugins/staking-pool/staking-pool.e2e.spec.ts`.
9. Auction/raffle: `smart_contracts/auction/{principal,auction}.e2e.spec.ts`, `smart_contracts/raffle/{principal,raffle}.e2e.spec.ts`, `smart_contracts/arc58/plugins/{auction/auction,raffle/raffle}.e2e.spec.ts`.
10. PluginDex: every `smart_contracts/plugin-dex/**/*.e2e.spec.ts`, `smart_contracts/arc58/plugins/akita-router/akita-router.e2e.spec.ts`.
11. Rollout: `smart_contracts/arc58/plugins/update-akita-dao/{rollout,update-akita-dao}.e2e.spec.ts`, `tests/migration-scripts.e2e.spec.ts`.
12. Compatibility: `tests/compat/compat.e2e.spec.ts` (and its members, listed in `tests/compat/members.ts`).
13. The full `npm test` (baseline 1,780 passed / 0 failed). **Done:** 140 files passed, 1 skipped by design; 2,398 tests
    passed, 0 failed, 1 skipped, 9 todo (2,408).

A failure in a compatibility or exact-charge test is a finding to route to the owning track, not a reason to relax the
assertion.

**Deployment steps (none done).** Each MainNet write needs Kyle's explicit approval of network, sender and action.
1. ~~Kyle decides K1–K9.~~ Done: Kyle accepted every recommendation on 2026-10-04 (§9.4).
2. Rehearse the whole sequence on LocalNet (P2-UPD-01), then on TestNet. The deployed-ABI snapshot and the
   accepted-removals list are keyed by the **MainNet** program sha256 values. TestNet was deployed from the same day's
   build (May 2026), but its sha256 values are not checked yet. Compare them read-only before the rehearsal (the dry
   run prints "not in the deployed-ABI snapshot" for any that differ). If they differ, either add the TestNet programs
   to `principal-deployed-abi.json` (and K2/K6 entries for those sha256 values), or run TestNet with
   `--accept-unknown-abi`, which skips the removal listing for that target. A LocalNet universe runs the tree, so its
   diff is empty: neither rehearsal exercises the accepted-removals path on-chain; only `rollout.test.ts` does.
3. Phase 2a: `scripts/principal-phase2a-update-plugin.ts` (deploy the plugin, one proposal: repoint `pal.update`, swap the
   grant, `--fund-sponsor`).
4. Upgrade the DAO (`principal-phase2-upgrade-targets.ts --target AkitaDAO`) and the DAO wallet's program. The live
   wallet program does not route `arc58_getNamedPluginKey`, so any RemoveNamedPlugin (Phase 3 `--unname-aliases`)
   reverts until then.
5. Deploy Gate v2 and the three context-aware sub-gates, allowlist them (`scripts/allowlist-sub-gates.ts`), re-register
   v1 gates per an SG-A runbook, and point `AkitaAppList.gate` at Gate v2 before pushing the new StakingPool child.
6. Phase 2: `principal-phase2-upgrade-targets.ts` for the eight singletons, each factory with its child in one group.
   Fund the DAO wallet for AkitaSocial (3 → 5 extra pages) and Subscriptions (3 → 4). The K2 and K6 ABI removals pass the
   guard from the checked-in list; any other removal is refused.
   - **K2:** the deployed 10-argument `newAccount` selector goes away. Ship the SDK release with the 11-argument
     `newAccount` in lockstep with the AbstractedAccountFactory upgrade: older SDKs cannot create wallets on the
     upgraded factory, and the new SDK cannot create wallets before it. Every off-chain service that creates wallets
     updates at the same time. Welcome and the Guild contracts call the 11-argument form: deploy them (or switch any
     existing instance over) in the same execution as the factory upgrade or right after it, never before. None is
     deployed on MainNet or TestNet today.
   - **K4:** from the moment the AkitaSocial upgrade executes until Phase 4, monitor AkitaSocial's free balance and top it
     up. Ship the release with `SOCIAL_HINTED_TARGETS[network] = true` right after Phase 2 executes.
   - **K6:** raffle creation through the deployed RafflePlugins already fails on the deployed factory (AR-14); nothing
     changes for them. Direct creation with the HEAD SDK works today and stops when the RaffleFactory upgrade executes.
     Ship the new SDK in lockstep with that upgrade (the new SDK cannot create raffles on the deployed factory either).
     Wallet users get raffle creation with the Phase 3 v3 RafflePlugin. **Do not propose the RaffleFactory upgrade until
     these pass on the current artifact** (the hinted creation methods were recompiled, not byte-preserved, §9.2):
     `smart_contracts/raffle/{raffle,principal}.e2e.spec.ts`, `smart_contracts/arc58/plugins/raffle/raffle.e2e.spec.ts`,
     the compat B5 case in `tests/compat/compat.e2e.spec.ts`, the RaffleFactory cases of
     `smart_contracts/arc58/plugins/update-akita-dao/rollout.e2e.spec.ts` and `tests/migration-scripts.e2e.spec.ts`
     (raffle child update). **Met 2026-10-05:** all of them pass on the current artifact (sha256 `0b1b10e7…8474`) in
     the final full suite.
   - **K8:** from the Marketplace upgrade on, hold at least 500,000 µA plus 189,600 µA per legacy-paid listing you expect
     to be open at the same time (ALGO-priced only; 176,800 for a prize box; 2026-10-11, Rewards v2 disbursement MBR) in
     the Marketplace factory's free balance (`errLflt` otherwise: each legacy-paid list needs `free ≥ 689,600` before
     it). MainNet's free balance on 2026-10-04 (1,905,400 µA) covers 7.
7. Phase 3: `principal-phase3-plugins.ts` (deploy the plugins, then `--swap`, `--add-method socialPlugin:setMetaWallet`
   for restricted grants; method-restricted raffle and auction grants also need the new methods listed in the log).
   Deploy `GatedFeePassPlugin` pinned to the GatedFeeHook **before any pool installs that hook**. Record the plugin ids
   in `akita-sdk/src/networks.ts`, then release the SDK with `REGISTRY_WRITES_STOPPED[network] = true`. Inventory
   off-chain registry readers first.
8. Monitor until Phase 4: AkitaSocial free balance (K4, top it up), Marketplace factory free balance (K8, keep 500,000 µA
   plus 189,600 µA per legacy-paid listing expected to be open at once), legacy-selector traffic (§7.4).

**Phase 4 (listed only, NOT applied).** After the §7.4 criteria (30 days without legacy-selector traffic, at least 60 days
after the Phase 3 announcement, no old-generation DAO grants):
- Delete every legacy shim and its helpers: AkitaSocial/Graph `legacy*` methods, `legacyTerms` and the MainNet plugin pins;
  Subscriptions legacy selectors and the registry subject (3) (fall back to `key.address`, Q13); Marketplace
  `legacyList*`, `legacyGatedPurchase*`, `legacySellerReferrer`, the float arm, `LegacyListingCreateMbr`; StakingPool legacy
  `gatedEnter`/`enterCost`, the flat `enter` branch, the `gateCheck` registry fallback and `borrowsFreeAlgo`;
  StakingPoolFactory/AuctionFactory legacy creation shims (RaffleFactory has none since K6); Auction/Raffle legacy gated shims.
- Delete the `legacy*` helpers in `utils/functions.ts`, the plugin legacy-child branches (`legacyEnter`,
  `legacyChildGateSubject`, Auction/Raffle old-child ABIs) once no old child is live, and the SDK legacy routing
  (`MARKETPLACE_LEGACY_METHODS`, `isLegacyGateTxn`, the legacy `gateCheck`/`getState` fallbacks, `SOCIAL_HINTED_TARGETS`).
- Wallet version without `register`; drop `ARC58WalletIDsByAccountsMbr` from the factory and `newEscrowMintCost`; delete the
  SDK registry writers (`register`, `registerEscrow`, `registerWallet`, `EscrowFactorySDK.register`).
- Keep the StakingPool `legacyCharged` refund path while any pool holds such entries. EscrowFactory stays deployed (Q15).

### 9.6 Decisions (updated 2026-10-05; none open)

K1–K9 are decided (§9.4). T32 was decided on 2026-10-04 (option (a)). P1 was decided on 2026-10-05 (option (a)). No decision is open:

| # | Question | Options | Recommendation | Blocks |
|---|---|---|---|---|
| T32 | `principalOf` measures 184 / 194 / 196 ops (T06 / T08 / T11, §3.7) against the original T32 bound of 150 (§5.2) | (a) accept the measured cost and set the bound to 210; (b) take `P(walletFactory)` as a resource (−45 ops; adds a resource to every hinted call) | **Decided by Kyle 2026-10-04: (a).** The bound in §5.2 and `utils/principal.e2e.spec.ts` is now 210 | — (re-run 2026-10-05: 184 / 194 / 196 ≤ 210, §5.4.2 met) |
| P1 (decided) | Should the AkitaSocial legacy shim absorb the referral MBR for posts by **referred** wallets through a deployed social plugin? `SocialPlugin.v0.0.2` quotes the referral MBR for its caller (`txn Sender`, normally an unregistered EOA), not for the wallet. The shim (like the deployed AkitaSocial) charges it for the wallet's spending address. So a referred wallet's post through v0.0.2 under-pays by exactly the referral MBR (67,000 µA, +`AssetOptInMinBalance` when Rewards lacks AKTA) and reverts `errIpay`, on MainNet today and on the shim (compat B1, log 2026-10-04 "Review of the e2e fixes") | (a) keep: referred wallets post through the Phase 3 social plugin; (b) absorb the term in the shim for legacy callers (a contract change to AkitaSocial, paid from its free balance like K4) | **Kyle, 2026-10-05: (a) keep.** No absorption, so no new drain path. Referred wallets post through the Phase 3 social plugin. v0.0.2 (MainNet 3633295088) has no post on MainNet | — |

### 9.7 Final artifact manifest (2026-10-05)

Built **whole-tree** on the final tree: `node scripts/build-contracts.mjs` (no file argument; puya-ts 1.3.1, puya
5.10.1), then `npm run build` in akita-sdk, inside `with-localnet-lock.sh` (lane `pr-build`). The rebuild left every
file under `smart_contracts/artifacts/`, `akita-sdk/src/generated/` and `akita-sdk/dist/` byte-identical to the tree
the final full suite ran on (sha256 of all 1,472 artifact/client files and 510 dist files, before and after), so these
are the bytes the suite proved. A single-file build can give other bytes (§9.3): compare like with like.

Source of each value: the ARC-56 `byteCode.approval` / `byteCode.clear` (base64, decoded) in
`smart_contracts/artifacts/<path>.arc56.json`; no `.bin` files are emitted. sha256 is over the decoded approval
program. Extra pages = ⌈(approval + clear) / 2,048⌉ − 1, the minimum that holds the program; an upgraded MainNet app
keeps the extra pages it has unless the update grows them (§9.2). The first table is the §9.2 set (32 apps), in the same
order; the second holds the test-only apps the principal work added. None has template variables.

| App | Artifact (under `smart_contracts/artifacts/`) | Approval B | Clear B | Extra pages | sha256 of approval | Note |
|---|---|---|---|---|---|---|
| PluginDex | `plugin-dex/PluginDex` | 14,092 | 4 | 6 | `8bb61f5ad0cfaebada33872c3eaa226ed72eaba3eb0bc79dc10604ef5ad16a44` | undeployed |
| StakingPool | `staking-pool/StakingPool` | 12,660 | 4 | 6 | `ccfd0dff9bd305982edc8711eda73a399117f69b40837c649f688fb43ca55d66` | child bytecode |
| AkitaSocial | `social/AkitaSocial` | 10,884 | 4 | 5 | `e38c3ac4e2e6db1d91ff01a5bb5a86cf764a6094a7ee3bbf1b4e198e52715772` |  |
| Subscriptions | `subscriptions/Subscriptions` | 10,179 | 4 | 4 | `6fb160adf28a7774e23f8d90ce0fedcc2947c201047a585caea4e5786abb7914` |  |
| AkitaDAO | `arc58/dao/AkitaDAO` | 9,738 | 4 | 4 | `213393da052c57ee162a049a35831a15ab9f81a91a1e7ed39e18283e5a384928` | audit ride-along, pushed by the Phase 2a plugin |
| AbstractedAccount | `arc58/account/AbstractedAccount` | 8,178 | 4 | 3 | `f4b3d3e1e7a2866eea1caa3014dee755ee4d945a6102014a1274851cfd4a4b7a` | Q2 |
| Auction | `auction/Auction` | 8,153 | 4 | 3 | `2caabd3a4f5ca856cf276b4fbc3f05302a55cba633ffd911ad4675eb4bf46867` | child bytecode |
| AkitaSocialPlugin | `arc58/plugins/social/AkitaSocialPlugin` | 8,030 | 4 | 3 | `04770df4dadf40beeca8500635211dc60da63419be92a7bc391b878a61c5757e` | Phase 3, new app id |
| Raffle | `raffle/Raffle` | 7,945 | 4 | 3 | `5914709361fa2bac150d58cfd22019d916a6f3e45d7735598ec9a0b389f0e7bb` | child bytecode |
| Marketplace | `marketplace/Marketplace` | 5,656 | 4 | 2 | `95353bcfa7f50df0f034c24543f2e7b4c86f78a8e47a0bb29c99a9cf516b3549` |  |
| AuctionFactory | `auction/AuctionFactory` | 4,719 | 4 | 2 | `a59f6dedb1986193a9729d2441b0200ecce227ac88ea444e386b071bbe8a6732` |  |
| SubscriptionsPlugin | `arc58/plugins/subscriptions/SubscriptionsPlugin` | 4,462 | 4 | 2 | `186fcd714ce116553fadd41f24891416310268ed41c2ecbafc1e7ad9b4aaecf2` | Phase 3, new app id |
| SubscriptionGuildConsensus | `arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensus` | 4,311 | 4 | 2 | `ca14e8f433beb98aff90d06ea6030d3b5d0dba8025c92558755f2248f89fd6db` | undeployed |
| RafflePlugin | `arc58/plugins/raffle/RafflePlugin` | 4,300 | 4 | 2 | `9967fa06d6482bcd7250f0cb0b3324fca358af65ba61bdbcfe65ec32e08f20c4` | v3, new app id (K7) |
| RaffleFactory | `raffle/RaffleFactory` | 3,751 | 4 | 1 | `0b1b10e7ab8f2f697642fe6ed634f71908b6577acd63c0dd3afd3b3ccf8c8474` | K6; pinned in `auction/principal-abi.test.ts` |
| GatedFeeHook | `plugin-dex/hooks/GatedFeeHook` | 4,117 | 4 | 2 | `11b998edb4105ddfe88bd668a6f3ae1d55253db1e02a9c86d0b0c24910d6ffde` | undeployed |
| StakingPoolFactory | `staking-pool/StakingPoolFactory` | 3,960 | 4 | 1 | `ec6c02aae97ddd0fbc8770835e55913311196522a1ce91d4cf19f9b78a687553` |  |
| AkitaRouterPlugin | `arc58/plugins/akita-router/AkitaRouterPlugin` | 3,828 | 4 | 1 | `15b2256748b9d39a9f86587872397e0acb5d72a0ed8a062016223f138bbdc304` | undeployed |
| AuctionPlugin | `arc58/plugins/auction/AuctionPlugin` | 3,827 | 4 | 1 | `68301a474766663a4a5c2c502fe1c6ac41d95af42f80e420b498459fefde00a4` | v3, new app id |
| LaunchManager | `plugin-dex/launch/LaunchManager` | 3,769 | 4 | 1 | `5c6b66c5757954dea0f7f36cfea9e5c9c8d7d2bc355e7a7022d35e20bb293177` | undeployed |
| AbstractedAccountFactory | `arc58/account/AbstractedAccountFactory` | 3,515 | 4 | 1 | `ff99ac68a4e4b936ad0f22b1655b7c98e4113c0ccda5b25d9b9d8777a3eef6fe` | Q1-A2; K2 |
| Gate | `gates/Gate` | 3,320 | 4 | 1 | `b4b1ff46e9659c1cc6c69e312250a9240715c939180c0b3d922d3b750b492c48` | v2, new app |
| Listing | `marketplace/Listing` | 3,137 | 4 | 1 | `a3fb7773ff87dd0fb7857c7fecd47ae92dd3057512da50a53ec8f66dc58d4dbd` | rev 3 child; not upgradeable |
| MarketplacePlugin | `arc58/plugins/marketplace/MarketplacePlugin` | 2,678 | 4 | 1 | `a6b974210d142660f555c31a54cfaf6ef614c7fde553bd89565543490532dba4` | Phase 3, new app id |
| StakingPoolPlugin | `arc58/plugins/staking-pool/StakingPoolPlugin` | 2,577 | 4 | 1 | `245880981798bededb7172d31203fa41101394ae4f63fd6cc52fbed4c848c90f` | Phase 3, new app id |
| UpdateAkitaDAOPlugin | `arc58/plugins/update-akita-dao/UpdateAkitaDAOPlugin` | 2,559 | 4 | 1 | `bc034036b0716293de5be9a0773a14138c62673adc358d6fd1a38e0a428eeb4e` | Phase 2a |
| AkitaSocialGraph | `social/AkitaSocialGraph` | 2,454 | 4 | 1 | `a377e2d8395172a3966bc99db207711da47e2c03b31aca1fb98d2825b657c1ce` |  |
| SubscriptionStreakGate | `gates/sub-gates/subscription-streak/SubscriptionStreakGate` | 1,771 | 4 | 0 | `d6ed4ef459a5e4d3c950d1468ecaed9cc540da0cf541f194caa1bee1f343151c` | new app |
| SubscriptionGate | `gates/sub-gates/subscription/SubscriptionGate` | 1,530 | 4 | 0 | `3c3a8d9331f8407f76c884e7d47c09ace65c7ceaac3f80751ad586ba23565de4` | new app |
| GatedFeePassPlugin | `arc58/plugins/gated-fee-pass/GatedFeePassPlugin` | 1,520 | 4 | 0 | `a9b0d32a5c4fd36ed7f7af6d2036cecdc2b617ed842c72491a5fb36de3b18aad` | new |
| WelcomePlugin | `arc58/plugins/welcome/WelcomePlugin` | 1,310 | 4 | 0 | `5724a8a13b72f38ecaa402d7dd104282c5e9941b09b327a77d0b776284d3cfb6` | undeployed, edited in place |
| AkitaReferrerGate | `gates/sub-gates/akita-referrer/AkitaReferrerGate` | 816 | 4 | 0 | `646a2ed9ebd5a83fd81aa709e2563b746a448459c2a46f7b2ea816ce4cc47d34` | new app |

| Test-only app | Artifact | Approval B | Clear B | Extra pages | sha256 of approval |
|---|---|---|---|---|---|
| MockPrincipalProbe | `mocks/principal-probe/MockPrincipalProbe` | 1,729 | 4 | 0 | `53a30ba051918cba5ac8b94cb126373aabef718134c34f59eea94c28582ac5ab` |
| TestPrincipalPlugin | `mocks/principal-plugin/TestPrincipalPlugin` | 2,276 | 4 | 1 | `2b963a59cc103fb9424df0c3adb3a290dc54beccbef19a0566188e98b2624d5d` |
| MockFakeDAO | `mocks/fake-dao/MockFakeDAO` | 1,034 | 4 | 0 | `0f6ac9d1c92f726d07815009a762eb5a00e3a86e035c6edd14685755edc4260a` |
| MockForgedWallet | `mocks/forged-wallet/MockForgedWallet` | 406 | 4 | 0 | `b8ea08f699e938b732edc4e8cd78b4c20d905eb33c1be75da1179265756a19de` |
| MockFakeWallet | `mocks/fake-wallet/MockFakeWallet` | 771 | 4 | 0 | `5ccdc31f5e83192f2fcd75afbe770f2fb01edfeafd2bd7376530c8c90dd404d4` |
| MockPrincipalComposer | `mocks/principal-composer/MockPrincipalComposer` | 195 | 4 | 0 | `feb0595c6d210d23ee3399b97705aa87b299ef4896df2d20f1a9fc137b0d904b` |
| MockCustodyPlugin | `mocks/principal-custody/MockCustodyPlugin` | 312 | 4 | 0 | `0f0d228d20bbce80cba04733e5b77d8193fb5e3bcf65fa65e092d5621c13065e` |
| MockPrincipalOverload | `mocks/principal-overload/MockPrincipalOverload` | 94 | 4 | 0 | `418545462ff81958c177c3b3019c28c0d97bfbd787aba85ebdfda320ab2e3c7a` |
| MockPrincipalProxy | `mocks/principal-proxy/MockPrincipalProxy` | 173 | 4 | 0 | `331dd868247f28fa2c7813b604e1657a997829a05a97ee3b5bb763a6bc73d9ea` |
| MockCompliantProxy | `mocks/principal-proxy/MockCompliantProxy` | 189 | 4 | 0 | `531fadcc33a5b716d953eeaebd2d10b6f6cfe21d66e1ebfda831c8a64466d7f8` |
| MockPrincipalReenter | `mocks/principal-reenter/MockPrincipalReenter` | 128 | 4 | 0 | `aaaa58e6b9837fc326b42d0fa7fd7f92dc1348bd04c7b9daeb78a47a4a20900d` |
| MockY | `mocks/principal-y/MockY` | 135 | 4 | 0 | `385638c1302e594b74f1ebf5aa4930bb1543c5034339e3bd7b0a6bb5d672bc54` |
| MockReferralProbe | `mocks/referral-probe/MockReferralProbe` | 1,162 | 4 | 0 | `564ead3627176d718056ab24e46d1332d74e13f734011a2aaf4128ad126aa39e` |
| MockEchoSubGate | `mocks/gate/MockEchoSubGate` | 258 | 4 | 0 | `37e0a6a71bd869ad266da63d63363068a65afc39d5df2534093d49474340736c` |
| MockGatedFeePlugin | `plugin-dex/tests/MockGatedFeePlugin` | 1,621 | 4 | 0 | `9f8e17777d2b2e3b61cdb4f775df613216ce524541b4112822227584e65613d1` |
| MockLegacyNftCaller | `auction/mocks/MockLegacyNftCaller` | 397 | 4 | 0 | `2bdc15b8d7e1248362e17dbf00cd4e5cd4a586dcc95f6f6579c7cdf42a2558bd` |
| MockLegacySocialPoster | `mocks/legacy-social-poster/MockLegacySocialPoster` | 308 | 4 | 0 | `ee2d57844fa06a09430fa2e70a0a60578e353099ae9cad787ad70c338d70e26b` |

The test-only apps are LocalNet mocks of the Phase 0 suite and the track e2e specs; they are never deployed.

---

## Appendix A. Review log (2026-10-04)

Each finding was checked against the working tree, `HEAD` and go-algorand before it was applied. "Applied" means the spec text changed; "Q" means it was routed to §8.

| # | Sev | Finding | Verified | Resolution |
|---|---|---|---|---|
| R1 | high | At-rest helpers give false negatives inside the subject's own default window (SubscriptionGate escrow subscription, AkitaReferrerGate external `C`) | Yes: the gate txn runs before the target's `RekeyTo` (`arc58/plugins/social/contract.algo.ts:249-262`); today `originOr` (`FN:219-228`) passes `C == W.address` unconditionally | Applied with a stronger fix: forward the whole `ctx = (principal, wallet, spender)` through `Gate.mustCheckFor` (§3.5, §6.9), with sub-gate rule `ctxOwns`. The reviewer's `(caller, wallet)` alone would still fail an escrow subscriber acting in its own window, because the escrow is not at rest; `spender` covers that case. New §3.8 rule 1, E23, T38–T40, P2-GATE-01/02. Gate v2 is undeployed, so bundling is cheap (Q12). The self-trigger case is fixed through the caller's own hint (§6.4 (1)). The `tipWallet` self-reply case is accepted |
| R2 | high | Read-later paths re-read forgeable globals; a forged wallet can block `StakingPool.gateCheck` disqualification | Yes: `AA:843-853` update, `staking-pool/contract.algo.ts:1560-1580` anyone-callable, `FN:246-253` asserts | Applied: stored pair `(W, principal)` in `'i'` (34,900 / 31,700 µA), `atRestPrincipal` with no global reads, §3.8 rule 2, "valid hints only" wording for `try*`/`quote*`, E24, T35/T46, P2-STK-03, P2-SUB-03. Exception kept for `tipWallet` (R-CREATOR): the ARC-58 tip route calls the creator's wallet code anyway, so only the creator is harmed |
| R3 | med | Plugin arm attests any custody of `S`; proxy chains and standing custody expose `S` | Yes: `test-proxy-rekey:33-51` leaves `S` with `B` when `rekeyBack=false`; router guard `akita-router:262-276` | Applied: §3.8 rule 3 (normative, in STANDARD.md/README), §3.1 note, §4.2 row rewritten (no longer "no new capability"), E25, mocks, T41/T42. Nuance: spending through `B` with the *genuine* `W` needs `W.spending_address == S`, i.e. an open or stale window |
| R4 | med | Q2 as worded breaks flash rekeys; R-STALE trigger wider | Yes: `txnRekeysBack` (`AA:426-441`) is shared by `assertValidGroup` (`:531`) and `assertRekeysBack` (`:443-454`); `spending_address` is zero outside windows (`:804`, `:989`); `verifyAuthAddress` fails with zero spending (`:754-759`) | Applied: Q2 rewritten (drop the shortcut in `assertValidGroup`; restrict it in `assertRekeysBack`); §4.3 single-group construction; E8/T13 kept as regression; T25 covers both constructions; T44 |
| R5 | med | `resolvePrincipalCtx` exported without an authenticated context; PluginDex Quote passes a caller-chosen swapper | Yes: `plugin-dex/contract.algo.ts:1276-1281`; BeforeSwap uses `Txn.sender` (`:1386, 1514, 1848`) | Applied: ctx core made internal, `resolvePrincipalFromDexCtx` with documented precondition, not exported from `@akta/plugin`; Quote uses `thirdPartyPrincipal` only (§6.12); E27; P2-DEX-03 |
| R6 | low | Integrators must not take `F` from `W.akita_dao` | Yes: `setAkitaDAO` `AA:877-880` | Applied: §3.3 paragraph, §3.8 rule 4, E26, `MockFakeDAO`, T43 |
| R7 | low | Keeper chooses the gate subject for legacy subscriptions | Yes: today the subject is fixed by the registry (`subscriptions/contract.algo.ts:962-964`) | Applied: legacy subscriptions keep the registry derivation (§6.4 (3)); the trailing arg is now the caller's *own* hint and never names the subscriber. Phase 4 handling → Q13. The reviewer's alternative (require a hint when `auth(key.address)` is a wallet address) was not adopted: the contract cannot tell whether an address is a factory wallet's without the app id |
| R8 | high | Selector-sequence asserts make legacy shims revert | Yes: `raffle/contract.algo.ts:540, 586, 633, 665`, `subscriptions/contract.algo.ts:982`; also at `HEAD` (`raffle :379, 424, 469, 500`; `subscriptions :936`) | Applied: §6 conventions rule (private `xImpl(gated)`), §6.4, §6.8, §7.2, P2-RAF-01, P2-SUB-01 |
| R9 | high | The deployed update plugin cannot push AkitaSocial/Subscriptions | Yes: `HEAD:update-akita-dao/contract.algo.ts:101-138` (2 chunks, no pages/schema); artifacts 8,332 B / 8,532 B; `utils/programs.ts` untracked; StakingPool 10,954 B; `HEAD:auction/factory.algo.ts:101-125`. Correction: the committed `update` check is `HEAD:utils/base-contracts/base.ts:46-52` (`upgradeable.ts` is uncommitted) | Applied: Phase 2a (§7.1), §6 conventions, §6.2/§6.4 headers, §7.2 size note, P2-UPD-01 |
| R10 | high | "Old plugins"/"today's semantics" taken from the working tree | Yes, and wider than stated: ≈17,500 inserted lines in `smart_contracts/` outside artifacts. The committed social plugin has no referral quote; `HEAD:social/contract.algo.ts:738-747` charges `referralFee` | Applied: §0 path note, §7.1 "Compatibility baseline" (deployed bytecode, re-derive shims, ride-along remediation list), §7.2 shim list, P2-CMP-01 |
| R11 | med | Third parties can disqualify shim entrants on new pools | Yes: `staking-pool/contract.algo.ts:1560-1580`; plugin passes the raw origin (`arc58/plugins/staking-pool/contract.algo.ts:228, 252`) | Applied: the legacy `gatedEnter` shim writes `'i'` from the registry and the legacy `enterCost` charges it (the plugin pays whatever `enterCost` returns, `:228-236`). Chosen over a `gateCheck` registry fallback because it survives Phase 4. P2-STK-02 |
| R12 | med | Changing shared `tipCreator` breaks old plugins' exact quotes | Yes: `social/contract.algo.ts:424-459`; plugin `:79-83`; `social/base.ts:55-71` | Applied: `legacy` flag on the shim path (§6.2, §7.2), P2-SOC-01. Narrowed: when the meta's wallet no longer controls `C`, today's ARC-58 route already reverts, so the break only hit metas whose wallet lost the creator at rest while `C` stayed live |
| R13 | med | Creation shims do not specify `sellerReferrer` | Yes: `auction/contract.algo.ts:274, 323`; `marketplace/listing.algo.ts:145, 208`; `raffle/contract.algo.ts:804`; `compileArc4` at `auction/factory.algo.ts:81, 239` | Applied: shims forward the creation-time `referrerOrZeroAddress(legacyWalletOf(Txn.sender))` (§6.6–6.8); factory and child updates land together; P2-REF-01/02 |
| R14 | med | Principal-keyed passes break owner checks and allow griefing; LaunchManager and tests missing | Yes: `gated-fee.algo.ts:266-272`, `:404-409`; `launch-manager.algo.ts:334`; `tests/mock-wallet.algo.ts:32-33`; `gated-fee.e2e.spec.ts:882` | Applied: hints on `openPass`/`refresh`/`refreshFromGate`/`closePass`; `openPass` restricted to the caller's own principal; LaunchManager `wallet = 0`; test rewrites; P2-DEX-01…04 |
| R15 | med | "Every plugin ABI unchanged" contradicted by triggerPayment pass-through and an unreachable `setMetaWallet` | Yes: plugin `triggerPayment` at `arc58/plugins/subscriptions/contract.algo.ts:458` | Applied: pass-through dropped (the plugin calls `triggerGateCtx` and passes `wallet.id` only to the target); social plugin gains `setMetaWallet(wallet, rekeyBack)`; §6.11 heading and §7.3 reworded |
| R16 | low | Registry writers and MBR missed; escrow deletion side effect | Yes: `group.ts:158-161, 187-192`; `escrow/index.ts:127-145`; `mbr.algo.ts:72-77`; `constants.ts:16-17`; `escrow/factory.algo.ts:105-108`; `sunset/contract.algo.ts:48-56` | Applied: §6.10 rows; Q15; P4-ESC-01 |
| R17 | low | A2 leaves `referralMbr` in the `:126` formula; self-referral unenforceable | Yes: `arc58/account/factory.algo.ts:120-126`, `:293-300` | Applied: §6.1 row, Q1 text, P2-ACC-01 |
| R18 | low | SDK `listCost` mirror cited at the wrong lines | Yes: `akita-sdk/src/marketplace/index.ts:346-357` | Applied: §6.7 (842,000 → 892,000, or delete the mirror) |
| R19 | low | Shared setup registers wallets; mock APIs underspecified; T31 expectation unverified | Yes: `akita-sdk/src/wallet/factory.ts:227`; `wallet/index.ts:733-736` | Applied: `tests/fixtures/unregistered-wallet.ts` + `assertUnregistered`; `callRelay`/`callReenter`/`callOwns`/`callCtxOwns` replace `callOut`; T31 records observed behaviour |
| R20 | low | Phase 2–4 test plan too thin | Yes | Applied: §7.5 named tests (P2-*/P4-*), part of the Phase 2 gate. With R1's design, the SubscriptionGate args stay 40 bytes, so the reviewer's 40 → 48 test is not needed |
| R21 | low | PoolEntriesMBR undercharge confirmed | Yes: 9 B key + ≥ 53 B value = ≥ 27,300 µA vs 25,300; `entriesByAddress` 22,100 vs 25,300 | Applied: §6.5 numbers and formula; net-per-entry nuance added (short only once the encoded gate args exceed 5 bytes); Q14 |
| R22 | low | Principal gate subjects with spender-keyed social state misread social sub-gates | Yes: the five social sub-gates read state by `caller` | Applied: §6.9 note, E28, Q4/Q5 text, P2-SOC-04 |
| R23 | low | `tests/` and `docs/` paths resolve wrongly; referrer-gate rule redundant | Yes: `vitest.config.mts:20-25` | Applied: path prefixes added; the referrer-gate rule was rewritten (R1), so the redundancy is gone |

Rejected outright: none. Partially modified: R1 (adds `spender` to the forwarded context), R2 (`tipWallet` exception), R7 (registry for legacy subscriptions instead of the auth-based alternative), R11 (shim writes `'i'` instead of a `gateCheck` fallback), R12 (narrower impact than stated).
### 9.8 Artifact manifest after the 2026-10-05 review fixes

Supersedes §9.7 for deployment. The 2026-10-05 production review (`projects/akita-sc/audits/review-2026-10-05/`)
was fixed in the same tree (Kyle: "lets fix all of them"). Built whole-tree as in §9.7 (`npm run build` in akita-sc,
then akita-sdk), under the build lock. The full suite then ran on these bytes: 2,446 passed, 0 failed, 9 todo,
1 skipped (142 files). Same method and columns as §9.7, plus the size change against §9.7 ("(changed)" marks a new
sha256). Generated by `projects/akita-sc/audits/review-2026-10-05/manifest.py` (re-run it after any rebuild), not by hand.

Regenerated 2026-10-11 (whole-tree build, same method) for the approved referral reclaim change: Rewards v2 stores a
per-disbursement reclaim target in its own box and adds `sweepExpired`; referral payments expire after 30 days and name
the paying service's DAO escrow as the reclaim target; Marketplace, AuctionFactory and RaffleFactory fund the reclaim
target box MBR into each child; RewardsPlugin adds `claimLegacyRewards` / `reclaimLegacyRewards` (DEC-1). Rows marked
"2026-10-11" changed; every other row is byte-identical. No program crossed a page boundary. Subscriptions has 3 B left
in 4 extra pages (was 57 B); RewardsPlugin grew to 1 extra page (new app id, no in-place limit).

Regenerated again 2026-10-11 (whole-tree build, same method) for Kyle's rework of that change: Rewards v2 stores
`reclaimTo` as a field of the disbursement record instead of a separate `'r'` box. The box design's `ReclaimTargetMBR`
(18,900) and every child-funding and quote adjustment for it are gone; `MinDisbursementsMBR` rises by the field's
12,800 to 54,500, so one single-allocation disbursement costs 79,800 (v1: 67,000). Deployed callers that pay the v1
amount revert at Rewards v2 (accepted). Rows marked "reclaimTo record field" or "Rewards v2 disbursement MBR" changed in
this pass; the Δ column stays against §9.7. Every changed program shrank or kept its size; none crossed a page
boundary. Subscriptions now has 19 B left in 4 extra pages. The full suite then ran on these bytes: 2,490 passed, 0 failed,
9 todo, 1 skipped (146 files).

Regenerated again 2026-10-11 (whole-tree build, same method) for the approved multi-step reclaim target: Rewards adds
`createDisbursement(pay,string,uint64,uint64,string,address)uint64`, which records `reclaimTo`, and keeps the 5-arg
selector as a shim that records zero (MBR unchanged). RewardsPlugin adds the 8-arg `createDisbursement(...,address)` and
keeps the 7-arg selector on the shim. StakingPool still calls the 5-arg selector and is byte-identical. Only the Rewards
(+87 B) and RewardsPlugin (+214 B) rows below changed, marked "multi-step reclaimTo"; every §9.7-set row is
byte-identical. Neither crossed a page boundary.

Regenerated 2026-10-12 (whole-tree build, same method) for the approved DAO time-weighted votes (audit DAO-04
option 4B, Kyle: "yes, start all four"). Approve / reject / abstain tally power in token-years (amount x min(days left,
365) / 365, 0 with under a week left); quorum counts whole locked tokens against the submit-time snapshot. Vote receipts
move to a v2 `'w'` box (type, power, weight; 25,700 µA); legacy `'v'` receipts are still replaced on a re-vote and
refunded at 22,500. A per-voter participation record (`'r'`, 25,300 µA, never deleted) backs the new readonly
`getGovernanceParticipation` and the new GovernanceParticipationGate. Only the AkitaDAO row below changed among the
§9.7 set (marked "2026-10-12"): it grows +346 B over the previous row and crosses a page boundary, from 4 to 5 extra pages
(Phase 2 page growth covers it; the DAO wallet sponsors 100,000 µA more). The validator source changed only in a comment. AkitaDAOPlugin
(must ship with the DAO: it pays the new deposits) and the GovernanceParticipationGate are listed under "other apps";
two test-only apps were added.

Regenerated again 2026-10-12 (whole-tree build, same method) for the approved moderator activity work (Kyle: "yes,
start all four"). AkitaSocialModeration writes `lastActive` on every successful moderation action and counts
state-changing actions per moderator per 7-day epoch in a new `'k'` box (25,300 µA, created by addModerator and deleted
by removeModerator, both against the app's own balance), with the readonly `moderatorActivity`; `moderatorMeta` keeps
its ABI for the deployed SocialModeratorGate. The new context-aware ModeratorActivityGate reads it. Every row in the table
below is byte-identical to the previous regeneration; AkitaSocialModeration (1,425 B, +338 B over 1,087 B, still 0 extra
pages) and ModeratorActivityGate are added under "other apps".

Regenerated again 2026-10-12 (whole-tree build, same method) for the approved zero-power vote rejection (Kyle: "no need
for it to vote with zero voting power"). `voteProposal` now requires time-weighted power > 0 (new error `errNpow`)
instead of whole-token weight > 0: a voter with no lock that outlasts the vote, under a week of it left, or a lock that
rounds down to 0 token-years writes no receipt, tally, quorum weight or participation record. A re-vote after power fell
to 0 is refused too, so the cast vote stands. Only the AkitaDAO row (+13 B over 10,331 B, still 5 extra pages, sponsor
unchanged at 3,592,500 µA) and the test-only MockLegacyVoteDAO row changed (marked "zero-power votes rejected"); every
other row is byte-identical, AkitaDAOPlugin and GovernanceParticipationGate included.

Regenerated 2026-10-13 (whole-tree build, same method) for the approved base-unit governance values (Kyle: "decimals
are set per asset & everything already uses base units i think"). The DAO no longer divides by 1e6: vote power is
amount x min(days left, 365) / 365 and weight is the locked amount, both in base units, and the quorum denominator is
the live locked stake in base units. A small lock (one token for 300 days) now votes; a lock with under a week left
still cannot (`errNpow`). Only the AkitaDAO row (-20 B over 10,344 B, still 5 extra pages, sponsor unchanged) and the
test-only MockLegacyVoteDAO row changed (marked "base-unit power and weight"). AkitaDAOProposalValidator (not in this
table) also changed: `MaxProposalPower` is now 1e15 base units (3,727 B, 1 extra page).

| App | Artifact (under `smart_contracts/artifacts/`) | Approval B | Δ vs §9.7 | Clear B | Extra pages | sha256 of approval | Note |
|---|---|---|---|---|---|---|---|
| PluginDex | `plugin-dex/PluginDex` | 14,092 | 0 | 4 | 6 | `8bb61f5ad0cfaebada33872c3eaa226ed72eaba3eb0bc79dc10604ef5ad16a44` | undeployed |
| StakingPool | `staking-pool/StakingPool` | 12,763 | +103 | 4 | 6 | `5de760ae44acf032724b30334e6a96c79f44eb4a1b6921dd91456d1632c16a07` (changed) | child bytecode; 2026-10-11: Rewards v2 disbursement MBR (reclaimTo field) |
| AkitaSocial | `social/AkitaSocial` | 11,056 | +172 | 4 | 5 | `9e9cf732d5076ce1e934ba466308d341536559d05668ccd8234727fa7bc0e330` (changed) | 2026-10-11: reclaimTo record field + sweepExpired |
| Subscriptions | `subscriptions/Subscriptions` | 10,217 | +38 | 4 | 4 | `bf9eba702222dd12f88ba031b5766ec2343aa02918cefd71830b8c18664f8d30` (changed) | 2026-10-11: reclaimTo record field + sweepExpired |
| AkitaDAO | `arc58/dao/AkitaDAO` | 10,324 | +586 | 4 | 5 | `3b30b515ccdf66b754806d26b206009bf511f8a338b5318a217c4ffba2323c70` (changed) | audit ride-along, pushed by the Phase 2a plugin. Corrected 2026-10-10: the DAO-R3 reversal (13:45) rebuilt the DAO after this table was generated (was 10,009 B, `27ed3d68…`); 2026-10-12: time-weighted votes (DAO-04 4B); 2026-10-12: zero-power votes rejected; 2026-10-13: base-unit power and weight |
| AbstractedAccount | `arc58/account/AbstractedAccount` | 8,178 | 0 | 4 | 3 | `f4b3d3e1e7a2866eea1caa3014dee755ee4d945a6102014a1274851cfd4a4b7a` | Q2 |
| Auction | `auction/Auction` | 8,284 | +131 | 4 | 4 | `754dc8181887545425c22923af8b84972ebdd1eba82c83a586a9c894e640acef` (changed) | child bytecode; 2026-10-11: reclaimTo record field + sweepExpired |
| AkitaSocialPlugin | `arc58/plugins/social/AkitaSocialPlugin` | 7,915 | -115 | 4 | 3 | `4b89df24bf746208ce222045965233ca74bb751e2a8f4034af651011f56a1969` (changed) | Phase 3, new app id; 2026-10-11: reclaimTo record field + sweepExpired |
| Raffle | `raffle/Raffle` | 8,058 | +113 | 4 | 3 | `24945bf4a79f5a38807c1b89d8e6471085798018d3532e2ac66feeef934fd4b0` (changed) | child bytecode; 2026-10-11: reclaimTo record field + sweepExpired |
| Marketplace | `marketplace/Marketplace` | 5,665 | +9 | 4 | 2 | `497401f36f2793fae687ab3693d2e9d534303772faf5aa4e4be4410a5c0f43b5` (changed) | 2026-10-11: reclaimTo record field + sweepExpired |
| AuctionFactory | `auction/AuctionFactory` | 4,781 | +62 | 4 | 2 | `b0bb0b4f5879205bc319255def1daa892ddd2e3579ff3385b0b2f4b3cb344256` (changed) | 2026-10-11: reclaimTo record field + sweepExpired |
| SubscriptionsPlugin | `arc58/plugins/subscriptions/SubscriptionsPlugin` | 4,462 | 0 | 4 | 2 | `186fcd714ce116553fadd41f24891416310268ed41c2ecbafc1e7ad9b4aaecf2` | Phase 3, new app id |
| SubscriptionGuildConsensus | `arc58/guilds/consensus/subscriptions/SubscriptionGuildConsensus` | 4,311 | 0 | 4 | 2 | `ca14e8f433beb98aff90d06ea6030d3b5d0dba8025c92558755f2248f89fd6db` | undeployed |
| RafflePlugin | `arc58/plugins/raffle/RafflePlugin` | 4,300 | 0 | 4 | 2 | `9967fa06d6482bcd7250f0cb0b3324fca358af65ba61bdbcfe65ec32e08f20c4` | v3, new app id (K7) |
| RaffleFactory | `raffle/RaffleFactory` | 3,794 | +43 | 4 | 1 | `27a219fa54e228c8169b83de5e2df0829b8e96a8771977fff1d1f6c3251e6aea` (changed) | K6; pinned in `auction/principal-abi.test.ts`; 2026-10-11: reclaimTo record field + sweepExpired |
| GatedFeeHook | `plugin-dex/hooks/GatedFeeHook` | 4,117 | 0 | 4 | 2 | `11b998edb4105ddfe88bd668a6f3ae1d55253db1e02a9c86d0b0c24910d6ffde` | undeployed |
| StakingPoolFactory | `staking-pool/StakingPoolFactory` | 4,006 | +46 | 4 | 1 | `a07ad926501a0f7581d82ed17e9918536c0a4b7c13b014e5cabe0283f9bbfbfd` (changed) | 2026-10-11: reclaimTo record field + sweepExpired |
| AkitaRouterPlugin | `arc58/plugins/akita-router/AkitaRouterPlugin` | 3,828 | 0 | 4 | 1 | `15b2256748b9d39a9f86587872397e0acb5d72a0ed8a062016223f138bbdc304` | undeployed |
| AuctionPlugin | `arc58/plugins/auction/AuctionPlugin` | 3,809 | -18 | 4 | 1 | `1103bdaeb2ece44dc9547cfc9ed16339e205046bd3c2fb8ff07496fdb6371f96` (changed) | v3, new app id |
| LaunchManager | `plugin-dex/launch/LaunchManager` | 3,769 | 0 | 4 | 1 | `ca6d9378e3c2445b391ff814ee801dd59a777ae46a6134a4694ed273018f3c19` (changed) | undeployed; 2026-10-11: Rewards v2 disbursement MBR (reclaimTo field) |
| AbstractedAccountFactory | `arc58/account/AbstractedAccountFactory` | 3,536 | +21 | 4 | 1 | `6ebd8972d9b0c9c209e3d54b806b179d3e431b85b535e5d7bed8a47e311350bb` (changed) | Q1-A2; K2; 2026-10-11: reclaimTo record field + sweepExpired |
| Gate | `gates/Gate` | 3,320 | 0 | 4 | 1 | `b4b1ff46e9659c1cc6c69e312250a9240715c939180c0b3d922d3b750b492c48` | v2, new app |
| Listing | `marketplace/Listing` | 3,203 | +66 | 4 | 1 | `945d2362ce5f353bf457c7012b1d4a88f2542514fda506afd69e79b87ae98e78` (changed) | rev 3 child; not upgradeable; 2026-10-11: reclaimTo record field + sweepExpired |
| MarketplacePlugin | `arc58/plugins/marketplace/MarketplacePlugin` | 2,678 | 0 | 4 | 1 | `a6b974210d142660f555c31a54cfaf6ef614c7fde553bd89565543490532dba4` | Phase 3, new app id |
| StakingPoolPlugin | `arc58/plugins/staking-pool/StakingPoolPlugin` | 2,577 | 0 | 4 | 1 | `245880981798bededb7172d31203fa41101394ae4f63fd6cc52fbed4c848c90f` | Phase 3, new app id |
| UpdateAkitaDAOPlugin | `arc58/plugins/update-akita-dao/UpdateAkitaDAOPlugin` | 2,809 | +250 | 4 | 1 | `2769b81649741789517b52a9e926bd7ff8df0a4e5062b46d332973d30fabdb0d` (changed) | Phase 2a |
| AkitaSocialGraph | `social/AkitaSocialGraph` | 2,454 | 0 | 4 | 1 | `a377e2d8395172a3966bc99db207711da47e2c03b31aca1fb98d2825b657c1ce` |  |
| SubscriptionStreakGate | `gates/sub-gates/subscription-streak/SubscriptionStreakGate` | 1,840 | +69 | 4 | 0 | `85f83fe76d81ff3b4fe4d13263be03a7450c02157394be035cc4a9bfba6247aa` (changed) | new app |
| SubscriptionGate | `gates/sub-gates/subscription/SubscriptionGate` | 1,599 | +69 | 4 | 0 | `dcb0a891069ecc196d69f02ad4673ae1ce6881e42e9fcf86b8a4cfeaba6726d0` (changed) | new app |
| GatedFeePassPlugin | `arc58/plugins/gated-fee-pass/GatedFeePassPlugin` | 1,520 | 0 | 4 | 0 | `a9b0d32a5c4fd36ed7f7af6d2036cecdc2b617ed842c72491a5fb36de3b18aad` | new |
| WelcomePlugin | `arc58/plugins/welcome/WelcomePlugin` | 1,310 | 0 | 4 | 0 | `5724a8a13b72f38ecaa402d7dd104282c5e9941b09b327a77d0b776284d3cfb6` | undeployed, edited in place |
| AkitaReferrerGate | `gates/sub-gates/akita-referrer/AkitaReferrerGate` | 816 | 0 | 4 | 0 | `646a2ed9ebd5a83fd81aa709e2563b746a448459c2a46f7b2ea816ce4cc47d34` | new app |

Other apps the review fixes changed (not in the §9.2 set):

| App | Artifact | Approval B | Clear B | Extra pages | sha256 of approval | Note |
|---|---|---|---|---|---|---|
| Rewards | `rewards/Rewards` | 4,845 | 4 | 2 | `dcb9b5695219e45ae51f5ec87d038a5fcf309ec91d9b9ad7016628ecd2473cf2` | v2, new app (STAKE-3); 2026-10-11: reclaimTo record field + sweepExpired; 2026-10-11: multi-step reclaimTo |
| RewardsPlugin | `arc58/plugins/rewards/RewardsPlugin` | 2,278 | 4 | 1 | `0edbb74a0a999a2c248cb8e152352cedd2823bfa0aa0cc6bf21a275c253a32e1` | new app id (STAKE-4); 2026-10-11: reclaimTo record field + sweepExpired; 2026-10-11: multi-step reclaimTo |
| NFDPlugin | `arc58/plugins/nfd/NFDPlugin` | 2,956 | 4 | 1 | `e7a1c0a0e22d0c393a94620d98fa632982556df7d8284f0c195dfe3e748cc8b2` | new app id (MISC-1) |
| HaystackRouterPlugin | `arc58/plugins/haystack-router/HaystackRouterPlugin` | 827 | 4 | 0 | `894249cc166072a4c4b4f8ee0dc1a8184d0e8a64c18dfc3b31a106373686b351` | new app id (MISC-2) |
| LaunchTaxHook | `plugin-dex/hooks/LaunchTaxHook` | 1,405 | 4 | 0 | `c1378b4ab5eed872a2c21385dfce216f092cb57b859d3dd12858cc1dc053afa0` | undeployed (DEXEXT-1/2) |
| Guild | `arc58/guilds/core/Guild` | 10,244 | 4 | 5 | `066eb741ea8bb7e4c1e7bdfb0ecf78c2e9d71904001649d2054b45312ef67c6e` | undeployed (GUILD-1) |
| AkitaSocialImpact | `social/AkitaSocialImpact` | 3,064 | 4 | 1 | `2bc0ed59c38558dbad186b3337ae25d2dd688a008ceceb6c2cec26755a598320` | upgrade in place (SUBGATE-1) |
| SunsetContract | `sunset/SunsetContract` | 695 | 4 | 0 | `a54ef75a80d32346b06c69359699d5c69a704bfb6c4e6398834451f9c14f956f` | AVM 13 (ACCT-1) |
| WalletFactorySunsetContract | `sunset/WalletFactorySunsetContract` | 1,111 | 4 | 0 | `7fd1f6c249286af02f1e1aa4139a0c1fe3908009cdf398b9d9d685369cd3438d` | AVM 13 (ACCT-1/2) |
| AbstractedAccountUpdateStub | `sunset/AbstractedAccountUpdateStub` | 53 | 4 | 0 | `af6dffe881a275fa53d1bd245dfa8c34a5fb0efc032c0b2f0796110641cc26ea` | AVM 13 (ACCT-1) |
| AkitaDAOPlugin | `arc58/plugins/dao/AkitaDAOPlugin` | 1,555 | 4 | 0 | `758bf85ab72387555ed94a0a45dfb76dd19decb13ee5d894ac4d7b6357a1f06c` | new app id; 2026-10-12: pays the v2 vote receipt + first-vote participation deposit (ships with the DAO upgrade) |
| GovernanceParticipationGate | `gates/sub-gates/governance-participation/GovernanceParticipationGate` | 791 | 4 | 0 | `3cc8999afd9eae9564648310bcc5a97c06ba1b0a4db330a66578c0963d522a43` | new sub-gate, context-aware (2026-10-12) |
| AkitaSocialModeration | `social/AkitaSocialModeration` | 1,425 | 4 | 0 | `2dfd91c91f9d78c626bbd4778d5bfa87996ebd1231442045f807c137c5657915` | upgrade in place (E1); 2026-10-12: lastActive on every action + per-epoch activity counters |
| ModeratorActivityGate | `gates/sub-gates/moderator-activity/ModeratorActivityGate` | 801 | 4 | 0 | `1c74fae4f29d54c60f1cb50bbd83f58fea35e229355c3acca5635aab24845607` | new sub-gate, context-aware (2026-10-12) |

| Test-only app | Artifact | Approval B | Δ | Clear B | Extra pages | sha256 of approval | Note |
|---|---|---|---|---|---|---|---|
| MockPrincipalProbe | `mocks/principal-probe/MockPrincipalProbe` | 1,729 | 0 | 4 | 0 | `53a30ba051918cba5ac8b94cb126373aabef718134c34f59eea94c28582ac5ab` |  |
| TestPrincipalPlugin | `mocks/principal-plugin/TestPrincipalPlugin` | 2,276 | 0 | 4 | 1 | `2b963a59cc103fb9424df0c3adb3a290dc54beccbef19a0566188e98b2624d5d` |  |
| MockFakeDAO | `mocks/fake-dao/MockFakeDAO` | 1,034 | 0 | 4 | 0 | `0f6ac9d1c92f726d07815009a762eb5a00e3a86e035c6edd14685755edc4260a` |  |
| MockForgedWallet | `mocks/forged-wallet/MockForgedWallet` | 406 | 0 | 4 | 0 | `b8ea08f699e938b732edc4e8cd78b4c20d905eb33c1be75da1179265756a19de` |  |
| MockFakeWallet | `mocks/fake-wallet/MockFakeWallet` | 771 | 0 | 4 | 0 | `5ccdc31f5e83192f2fcd75afbe770f2fb01edfeafd2bd7376530c8c90dd404d4` |  |
| MockPrincipalComposer | `mocks/principal-composer/MockPrincipalComposer` | 195 | 0 | 4 | 0 | `feb0595c6d210d23ee3399b97705aa87b299ef4896df2d20f1a9fc137b0d904b` |  |
| MockCustodyPlugin | `mocks/principal-custody/MockCustodyPlugin` | 312 | 0 | 4 | 0 | `0f0d228d20bbce80cba04733e5b77d8193fb5e3bcf65fa65e092d5621c13065e` |  |
| MockPrincipalOverload | `mocks/principal-overload/MockPrincipalOverload` | 94 | 0 | 4 | 0 | `418545462ff81958c177c3b3019c28c0d97bfbd787aba85ebdfda320ab2e3c7a` |  |
| MockPrincipalProxy | `mocks/principal-proxy/MockPrincipalProxy` | 173 | 0 | 4 | 0 | `331dd868247f28fa2c7813b604e1657a997829a05a97ee3b5bb763a6bc73d9ea` |  |
| MockCompliantProxy | `mocks/principal-proxy/MockCompliantProxy` | 189 | 0 | 4 | 0 | `531fadcc33a5b716d953eeaebd2d10b6f6cfe21d66e1ebfda831c8a64466d7f8` |  |
| MockPrincipalReenter | `mocks/principal-reenter/MockPrincipalReenter` | 128 | 0 | 4 | 0 | `aaaa58e6b9837fc326b42d0fa7fd7f92dc1348bd04c7b9daeb78a47a4a20900d` |  |
| MockY | `mocks/principal-y/MockY` | 135 | 0 | 4 | 0 | `385638c1302e594b74f1ebf5aa4930bb1543c5034339e3bd7b0a6bb5d672bc54` |  |
| MockReferralProbe | `mocks/referral-probe/MockReferralProbe` | 1,306 | +144 | 4 | 0 | `73bcc9ed90a1d718aacee056bd253cd1f7a2a44bb769bb21bfbc2c456d66cfec` (changed) | 2026-10-11: reclaimTo record field + sweepExpired |
| MockEchoSubGate | `mocks/gate/MockEchoSubGate` | 258 | 0 | 4 | 0 | `37e0a6a71bd869ad266da63d63363068a65afc39d5df2534093d49474340736c` |  |
| MockGatedFeePlugin | `plugin-dex/tests/MockGatedFeePlugin` | 1,621 | 0 | 4 | 0 | `9f8e17777d2b2e3b61cdb4f775df613216ce524541b4112822227584e65613d1` |  |
| MockLegacyNftCaller | `auction/mocks/MockLegacyNftCaller` | 397 | 0 | 4 | 0 | `2bdc15b8d7e1248362e17dbf00cd4e5cd4a586dcc95f6f6579c7cdf42a2558bd` |  |
| MockLegacySocialPoster | `mocks/legacy-social-poster/MockLegacySocialPoster` | 308 | 0 | 4 | 0 | `ee2d57844fa06a09430fa2e70a0a60578e353099ae9cad787ad70c338d70e26b` |  |
| MockLegacyVoteDAO | `mocks/legacy-vote-dao/MockLegacyVoteDAO` | 10,555 | new | 4 | 5 | `473657a050cef74f3a798b8fd7ce45ed5903471b6926d7c09e1ac9acc81466de` | 2026-10-12: tree DAO + legacy receipt seeding; 2026-10-12: zero-power votes rejected; 2026-10-13: base-unit power and weight |
| MockGovernanceStaking | `mocks/governance-staking/MockGovernanceStaking` | 356 | new | 4 | 0 | `4f0dbe5291f5186a003708223e24a3f537d8f62f0b2e0b8d07823272f20f1079` | 2026-10-12: settable getInfo / getTotals |

