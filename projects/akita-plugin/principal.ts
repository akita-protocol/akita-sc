/**
 * Principal resolution for ARC-58 wallet hints (normative spec: docs/principal-resolution/STANDARD.md).
 *
 * A caller passes a wallet hint `W` (`uint64`, `0` = plain account) as the LAST ABI argument of a
 * target method. The target verifies `W` live against the authenticated call context and derives
 * the principal (the identity used for gates, referrals and stored ownership) from it.
 *
 * This file is self-contained on purpose: it imports only from `@algorandfoundation/algorand-typescript`
 * and inlines its global keys and error codes. `scripts/sync-akita-plugin-principal.ts` copies it to
 * `akita-plugin/principal.ts` byte-for-byte, EXCEPT the block between the `@akita-sc-only:begin` and
 * `@akita-sc-only:end` marker lines at the end of the file, which it strips (internal helpers that trust
 * caller-supplied context and must not reach third parties). `tests/principal-sync.test.ts` fails on drift.
 * Edit `projects/akita-sc/smart_contracts/utils/principal.ts` and re-run the sync script.
 *
 * INTEGRATOR INVARIANTS (STANDARD.md §3.8):
 *  1. First hop only. Evaluate `resolvePrincipal` only where `Txn.sender` is the acting account; never
 *     re-derive the acting party's liveness downstream. Forward `GateCtx` instead and test with `ctxOwns`.
 *  2. Third-party paths never read wallet globals. Store `(W, principal)` at interaction time and
 *     re-check it with `atRestPrincipal`. `tryResolvePrincipal`, `quoteReferrer` and `thirdPartyPrincipal`
 *     are for quotes whose hint the caller chose.
 *  3. Custody. Every app that can hold the spending account must obey the custody rules in STANDARD.md.
 *  4. Pin the wallet factory. `walletFactory` must come from your own deploy-time configuration or your
 *     own DAO reference. NEVER derive it from anything reachable through `W` (e.g. `W.akita_dao`).
 *  5. Pass the hint last, as `uint64`. Pass `0` when acting as yourself.
 *  6. A plugin hints its own window only. Inside a wallet's window, pass exactly the wallet whose window
 *     you serve (your pinned first argument: `windowHint(wallet)` == `wallet.id`) as the hint, never a
 *     value the caller supplies. A proxy must receive that value from the plugin and forward it unchanged.
 *     The plugin arm binds a hint to the sender only through the hint's own (forgeable) `spending_address`.
 */
import { Account, Application, Bytes, Global, loggedAssert, loggedErr, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'

/** ARC-58 wallet global keys (= arc58/account/constants.ts, akita-plugin/constants.ts). */
export const PRINCIPAL_KEY_CONTROLLED = 'controlled_address'
export const PRINCIPAL_KEY_SPENDING = 'spending_address'
export const PRINCIPAL_KEY_REFERRER = 'referrer'

/** W != 0 and not created by the wallet factory (or does not exist). */
export const errHintNotWallet = 'errHnwl'
/** W != 0 on a top-level call (callerApplicationId == 0). */
export const errHintTopLevel = 'errHtop'
/** Neither a direct wallet call (callerApp == W) nor a plugin window (W.spending_address == sender). */
export const errHintNotBound = 'errHnbd'
/** Third-party write: W does not own the account at rest. */
export const errHintNotOwner = 'errHnow'
/** Malformed controlled_address (same code as utils/errors.ts errInvalidWallet). */
export const errHintBadWallet = 'errIwlt'
/** The calling plugin does not hold the wallet's spending account (same code as utils/errors.ts errPluginNotAuthAddr). */
export const errHintPluginNotAuth = 'errNath'

export type Principal = {
  /** verified W, or 0 */
  wallet: uint64
  /** identity to use: origin when live, else spender */
  principal: Account
  /** W.controlled_address when live, else the zero address */
  origin: Account
  /** the evaluated sender */
  spender: Account
  /** W.referrer (zero when W == 0, unset or malformed). Self-asserted: never a trust anchor. */
  referrer: Account
  /** true: plugin-window arm; false: direct arm or W == 0 */
  viaPlugin: boolean
}

/** The verified context forwarded to gates (static 72-byte ARC-4 tuple `(address,uint64,address)`). */
export type GateCtx = {
  principal: Account
  wallet: uint64
  spender: Account
}

/** Address of app `appId`, computed without needing the app as a resource. */
function appAddressOf(appId: uint64): Account {
  return Account(op.sha512_256(Bytes('appID').concat(op.itob(appId))))
}

/** Address of an existing app (P(appId) required); zero if it does not exist. */
function walletAddressOf(wallet: uint64): Account {
  const [address] = op.AppParams.appAddress(wallet)
  return address
}

/** Auth address of `account`; zero for an un-rekeyed or unfunded account (never panics). Resource: A(account). */
function authAddrOf(account: Account): Account {
  const [auth] = op.AcctParams.acctAuthAddr(account)
  return auth
}

function plainPrincipal(sender: Account): Principal {
  return {
    wallet: 0,
    principal: sender,
    origin: Global.zeroAddress,
    spender: sender,
    referrer: Global.zeroAddress,
    viaPlugin: false,
  }
}

/** creator(W) == appAddress(walletFactory); exists-checked; resource: P(W). */
export function isGenuineWallet(wallet: uint64, walletFactory: uint64): boolean {
  if (wallet === 0 || walletFactory === 0) {
    return false
  }
  const [creator, exists] = op.AppParams.appCreator(wallet)
  return exists && creator === appAddressOf(walletFactory)
}

/**
 * Live control of `controlled` by `wallet`, relative to `spender`:
 * `controlled == spender`, or (`controlled == W.address` and W.address is not rekeyed), or
 * (`controlled != W.address` and `authAddr(controlled) == W.address`).
 * INTERNAL (not exported): the `controlled == spender` shortcut runs before any wallet check, so it is
 * sound only when `spender` is the AVM-authenticated Txn.sender of a first hop or comes from a stored
 * pair, and `controlled` was read from a genuine W. Resources: P(W), and A(W.address) or A(controlled)
 * when `controlled != spender`.
 */
function walletControlsLive(wallet: uint64, controlled: Account, spender: Account): boolean {
  if (controlled === spender) {
    return true
  }
  const [walletAddress, walletExists] = op.AppParams.appAddress(wallet)
  if (!walletExists) {
    return false
  }
  if (controlled === walletAddress) {
    return authAddrOf(walletAddress) === Global.zeroAddress
  }
  return authAddrOf(controlled) === walletAddress
}

/**
 * Core, context-parameterised resolver. `strict` reverts with the codes above; otherwise every
 * failure falls back to the plain result (hint 0).
 *
 * INTERNAL: F1 holds only if `sender` is the real Txn.sender of the call that observed `callerApp`.
 * Callers must copy (sender, callerApp, callerAddr) from Txn.sender / Global.callerApplicationId /
 * Global.callerApplicationAddress of an authenticated first hop. Not exported.
 */
function resolvePrincipalCtx(
  walletFactory: uint64,
  hint: uint64,
  sender: Account,
  callerApp: uint64,
  callerAddr: Account,
  strict: boolean
): Principal {
  if (hint === 0) {
    return plainPrincipal(sender)
  }

  if (!isGenuineWallet(hint, walletFactory)) {
    if (strict) {
      loggedErr(errHintNotWallet)
    }
    return plainPrincipal(sender)
  }

  if (callerApp === 0) {
    if (strict) {
      loggedErr(errHintTopLevel)
    }
    return plainPrincipal(sender)
  }

  let viaPlugin = false
  if (callerApp !== hint) {
    // plugin window (including proxy chains): the calling app holds `sender`, and the wallet
    // says `sender` is its current spending account. No sender.authAddress test: RekeyTo is
    // applied before the callee runs (spec §3.2).
    const [spending, spendingExists] = op.AppGlobal.getExBytes(hint, Bytes(PRINCIPAL_KEY_SPENDING))
    if (!(spendingExists && spending.length === 32 && spending === sender.bytes && sender !== callerAddr)) {
      if (strict) {
        loggedErr(errHintNotBound)
      }
      return plainPrincipal(sender)
    }
    viaPlugin = true
  }

  const [controlledBytes, controlledExists] = op.AppGlobal.getExBytes(hint, Bytes(PRINCIPAL_KEY_CONTROLLED))
  if (!(controlledExists && controlledBytes.length === 32)) {
    if (strict) {
      loggedErr(errHintBadWallet)
    }
    return plainPrincipal(sender)
  }
  const controlled = Account(controlledBytes)
  const live = walletControlsLive(hint, controlled, sender)

  const [referrerBytes, referrerExists] = op.AppGlobal.getExBytes(hint, Bytes(PRINCIPAL_KEY_REFERRER))
  const referrer = referrerExists && referrerBytes.length === 32 ? Account(referrerBytes) : Global.zeroAddress

  return {
    wallet: hint,
    principal: live ? controlled : sender,
    origin: live ? controlled : Global.zeroAddress,
    spender: sender,
    referrer,
    viaPlugin,
  }
}

/**
 * Write paths: Txn.sender + Global.callerApplicationId/Address, strict (invalid hints revert).
 * A plugin calling this target from inside a window must pass `windowHint(wallet)` (invariant 6).
 */
export function resolvePrincipal(walletFactory: uint64, hint: uint64): Principal {
  return resolvePrincipalCtx(
    walletFactory,
    hint,
    Txn.sender,
    Global.callerApplicationId,
    Global.callerApplicationAddress,
    true
  )
}

/**
 * Non-reverting for valid hints only: invalid hints resolve as hint 0, but a genuine wallet whose
 * admin stored a uint64 under a bytes key can still panic. For contextual quotes; never on
 * third-party paths.
 */
export function tryResolvePrincipal(walletFactory: uint64, hint: uint64): Principal {
  return resolvePrincipalCtx(
    walletFactory,
    hint,
    Txn.sender,
    Global.callerApplicationId,
    Global.callerApplicationAddress,
    false
  )
}

/**
 * Readonly cost methods (simulated top-level, callerApp == 0): genuine wallet => W.referrer, else
 * the zero address. Same caveat as `tryResolvePrincipal` (uint64-typed `referrer` panics).
 */
export function quoteReferrer(walletFactory: uint64, hint: uint64): Account {
  if (!isGenuineWallet(hint, walletFactory)) {
    return Global.zeroAddress
  }
  const [referrerBytes, referrerExists] = op.AppGlobal.getExBytes(hint, Bytes(PRINCIPAL_KEY_REFERRER))
  return referrerExists && referrerBytes.length === 32 ? Account(referrerBytes) : Global.zeroAddress
}

/**
 * At-rest ownership, no call context, no global reads:
 * genuine(W) && ((A == W.address && auth(W.address) == 0) || auth(A) == W.address).
 * Resources: P(W), A(A). False for an account rekeyed to an open window's plugin (E23).
 */
export function ownsAtRest(walletFactory: uint64, wallet: uint64, account: Account): boolean {
  if (!isGenuineWallet(wallet, walletFactory)) {
    return false
  }
  const walletAddress = walletAddressOf(wallet)
  if (account === walletAddress) {
    return authAddrOf(walletAddress) === Global.zeroAddress
  }
  return authAddrOf(account) === walletAddress
}

/**
 * Read-later principal from a STORED pair (W, stored), no global reads (third-party safe):
 *   stored == account ? account
 *   : ownsAtRest(W, account) && (stored == W.address ? auth(W.address) == 0 : auth(stored) == W.address) ? stored
 *   : account
 * Resources: P(W), A(account), A(stored). Never panics for any W.
 */
export function atRestPrincipal(walletFactory: uint64, account: Account, wallet: uint64, stored: Account): Account {
  if (stored === account) {
    return account
  }
  if (!ownsAtRest(walletFactory, wallet, account)) {
    return account
  }
  const walletAddress = walletAddressOf(wallet)
  if (stored === walletAddress) {
    return authAddrOf(walletAddress) === Global.zeroAddress ? stored : account
  }
  return authAddrOf(stored) === walletAddress ? stored : account
}

/**
 * QUOTE-ONLY read-later principal that reads W.controlled_address:
 * !ownsAtRest ? account : (walletControlsLive(W, C, account) ? C : account).
 * Can panic for a forged W (uint64-typed controlled_address); allowed only where the hint's chooser
 * is the only party affected (quotes, previews).
 */
export function thirdPartyPrincipal(walletFactory: uint64, account: Account, wallet: uint64): Account {
  if (!ownsAtRest(walletFactory, wallet, account)) {
    return account
  }
  const [controlledBytes, controlledExists] = op.AppGlobal.getExBytes(wallet, Bytes(PRINCIPAL_KEY_CONTROLLED))
  if (!(controlledExists && controlledBytes.length === 32)) {
    return account
  }
  const controlled = Account(controlledBytes)
  return walletControlsLive(wallet, controlled, account) ? controlled : account
}

/** The verified context forwarded to gates: { p.principal, p.wallet, p.spender }. */
export function gateCtx(p: Principal): GateCtx {
  return { principal: p.principal, wallet: p.wallet, spender: p.spender }
}

/**
 * Sub-gate subject test: `account` belongs to the verified actor. No call context, no global reads:
 * account == ctx.principal || account == ctx.spender || (ctx.wallet != 0 && ownsAtRest(F, ctx.wallet, account)).
 * Only meaningful for a `ctx` the target verified (Gate.mustCheckFor + gateCheckCtx).
 */
export function ctxOwns(walletFactory: uint64, ctx: GateCtx, account: Account): boolean {
  if (account === ctx.principal || account === ctx.spender) {
    return true
  }
  return ctx.wallet !== 0 && ownsAtRest(walletFactory, ctx.wallet, account)
}

/**
 * Plugin side, inside the wallet's window: the same answer the first-hop target computes for
 * (wallet.id, S) when this plugin calls it as S = wallet.spending_address. Asserts the wallet is
 * genuine (errHnwl) and that this app holds S (errNath). The target computes this answer only if the
 * plugin hints `windowHint(wallet)`; any other hint is invariant 6's forged-hint case.
 */
export function pluginPrincipal(wallet: Application, walletFactory: uint64): Principal {
  loggedAssert(isGenuineWallet(wallet.id, walletFactory), errHintNotWallet)
  const [spending, spendingExists] = op.AppGlobal.getExBytes(wallet, Bytes(PRINCIPAL_KEY_SPENDING))
  loggedAssert(spendingExists && spending.length === 32, errHintNotBound)
  const spender = Account(spending)
  loggedAssert(authAddrOf(spender) === Global.currentApplicationAddress, errHintPluginNotAuth)
  return resolvePrincipalCtx(
    walletFactory,
    wallet.id,
    spender,
    Global.currentApplicationId.id,
    Global.currentApplicationAddress,
    true
  )
}

/**
 * The hint a plugin forwards from inside `wallet`'s window: exactly `wallet.id`, the wallet whose window
 * it serves (its pinned first argument). Never forward a hint the caller chose (invariant 6): a forged
 * wallet can claim any `spending_address`, so a caller-chosen hint can attribute the window's spending
 * account to the forger's controlled address and referrer. Use this helper so every forwarded hint is
 * greppable.
 */
export function windowHint(wallet: Application): uint64 {
  return wallet.id
}
