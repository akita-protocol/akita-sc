# @akta/plugin

Utility library for building ARC-58 plugins for Akita abstracted-account wallets with Algorand
TypeScript (PuyaTs 1.3.1).

> **Importing from contracts.** PuyaTs 1.3.1 does not compile `export { … } from` re-exports, so a
> contract file cannot import from the package root (`index.ts`). Import from the module files:
> `@akta/plugin/functions`, `@akta/plugin/principal`, `@akta/plugin/base.algo`,
> `@akta/plugin/constants`. `index.ts` is the TypeScript (type-checking) entry point.

## Spending helpers (`functions.ts`)

| Helper | Use |
|---|---|
| `getControlledSpendingAccount(wallet)` | The wallet's spending account, asserted to be rekeyed to your plugin (`errNath`). Use it as `sender` of every inner transaction that spends. |
| `getSpendingAccount(wallet)` | The raw `spending_address` global (no check). |
| `rekeyAddress(rekeyBack, wallet)` / `rekeyBackIfNecessary(rekeyBack, wallet)` | Return the spending account to the wallet on your last inner transaction. |
| `controls(account)` | `account.authAddress == this app`. |
| `getOriginAccount`, `getReferrerAccount`, `getAccounts` | **Display only, not identity** (see below). |

## Identity: use `pluginPrincipal` / `resolvePrincipal`, never raw `getOriginAccount`

A wallet's `controlled_address` and `referrer` globals are self-declared. A wallet admin can update
the wallet to arbitrary code, and a controlled account can be rekeyed away. So the raw values say
nothing about who is acting. Use the principal helpers in `principal.ts`
(normative spec: [`docs/principal-resolution/STANDARD.md`](../../docs/principal-resolution/STANDARD.md)).

- **Wallet hint.** A caller passes the wallet app id `W` as the **last** ABI argument, typed
  `uint64`, named `wallet`. `0` means "plain account, no wallet".
- **In a target contract (first hop):** `resolvePrincipal(walletFactory, wallet)` returns
  `{ wallet, principal, origin, spender, referrer, viaPlugin }`. An invalid hint reverts
  (`errHnwl`, `errHtop`, `errHnbd`, `errIwlt`). `principal` is the controlled address while the
  wallet still controls it, else the spender.
- **In your plugin, inside the wallet's window:** `pluginPrincipal(wallet, walletFactory)` returns
  the same answer the target will compute when you call it as the spending account with
  `windowHint(wallet)` (= `wallet.id`) as the hint.
- **Hint your own window only (invariant 6).** From inside a window, always forward
  `windowHint(wallet)`, the wallet whose window you serve. Never forward a hint your caller chose,
  and never take it from a method argument. The target binds a hint to the spending account only
  through the hint's own `spending_address` global, which a forged (admin-updated) wallet can set to
  any account. A plugin method that forwards a caller-chosen hint lets anyone attribute the open
  window's spending account to a forged wallet's controlled address and referrer.
- **Gates:** forward `gateCtx(p)` (the verified context) and test sub-gate subjects with
  `ctxOwns(walletFactory, ctx, account)`.
- **Read later (third-party paths):** store `(W, principal)` at interaction time and re-check it
  with `atRestPrincipal(walletFactory, account, W, stored)`. It reads no wallet globals.
- **Quotes:** `tryResolvePrincipal`, `quoteReferrer`, `thirdPartyPrincipal` (quote-only; they
  read wallet globals and can panic on a forged wallet, which harms only the caller who chose the
  hint).
- `isGenuineWallet(wallet, walletFactory)` hashes the factory address, so it needs no
  `P(walletFactory)` resource (unlike the older `isAkitaWallet(wallet, walletFactory)`).

**Pin the wallet factory.** `walletFactory` must come from your own deploy-time configuration or
your own DAO reference. Never derive it from anything reachable through `W`: a wallet admin can
repoint the wallet's `akita_dao` global at a fake DAO.

## Integrator invariants (copied verbatim from the spec, §3.8)

1. **First hop only.** Evaluate `resolvePrincipal` only where `Txn.sender` is the acting account. Never re-derive the acting party's liveness downstream. Forward `ctx` (§3.5) instead, and test ownership with `ctxOwns`.
2. **Third-party paths never read wallet globals.** If a party other than the subject must be able to complete a path (disqualification, keeper trigger, settlement), store `(W, principal)` at interaction time and re-check it with `atRestPrincipal`. That helper reads only `AppCreator` and `AuthAddr`, so a wallet admin cannot make it panic afterwards. `tryResolvePrincipal`, `quoteReferrer` and `thirdPartyPrincipal` are for quotes whose hint the caller chose. Exception: `tipWallet` (§3.3).
3. **Custody.** The plugin arm attests "the calling app holds `S` now" (§3.1), so every app that can hold `S` must obey these rules:
   - (a) Never send as `getSpendingAccount(wallet)` (or `getControlledSpendingAccount`) when that account is one the plugin holds outside the wallet's window. Standing custody includes leg escrows, pool escrows and stale escrows. Precedent: the PluginDex custody hooks that receive pool escrows (`plugin-dex/contract.algo.ts:740`).
   - (b) A proxy may hold `S` only within a single call from `P`. Rekey `S` to `B` in the same inner group as the `B` call. `B` must hand `S` back (to `P` or `W.address`) before it returns. `P` must not invoke any other app while `B` holds `S`. The `test-proxy-rekey` pattern with `rekeyBack=false` (`arc58/plugins/test-proxy-rekey/contract.algo.ts:33-51`) leaves `S` with `B` after `P` returns. Any app can then call `B` with a forged `Wf` (`spending_address = S`) and attribute `S`'s action to `Wf`, or spend `S` through `B`. That pattern is test-only and must not ship.
   - (c) Never rekey `S` to a caller-chosen app.
4. **Pin the wallet factory** (§3.3). Never take `F` from `W`'s own globals.
5. **Pass the hint last, as `uint64`.** Pass `0` when acting as yourself.
6. **A plugin hints its own window only** (added 2026-10-04, Phase 0 review). A plugin must pass exactly the wallet whose window it serves (its pinned first argument, `wallet.id`; use `windowHint(wallet)`) as the hint, never a value the caller supplies. A proxy `B` must receive that value from `P` and forward it unchanged. Reason: F2 pins only the plugin's `appArgs(1)`; the plugin arm binds any other hint `Wf` to `S` only through `Wf.spending_address`, which an admin-updated (forged) wallet sets freely. A plugin method that forwards a caller-chosen hint therefore lets anyone attribute the open window's `S` to `Wf`'s controlled address and referrer (T47).

**Not part of the package surface** (neither from `index.ts` nor from `@akta/plugin/principal`):
`resolvePrincipalCtx` and `walletControlsLive` exist in `principal.ts` but are not exported, and
the Akita-only `resolvePrincipalFromDexCtx` and `tipWalletFor` are stripped from this mirror. The
context resolvers trust a caller-supplied `(sender, callerApp)`, which is sound only when those
values were copied from `Txn.sender` / `Global.callerApplicationId` of an authenticated first hop.
`walletControlsLive` returns `true` for `controlled == spender` before any wallet check, so it is
sound only when `spender` is the AVM-authenticated sender of a first hop or comes from a stored
pair, never a caller-supplied account. Use `ownsAtRest` / `atRestPrincipal` for at-rest questions.

## Removing a grant belongs to the wallet

A plugin needs no method for removal, and should not carry one. The wallet's
`arc58_removePlugin(plugin, caller, escrow)` accepts three senders: the wallet's admin, its
revocation app, and the account named as `caller` in that grant. The last one lets a caller give
up its own access, for example an agent that shuts down and frees the storage its grants hold in
users' wallets. The storage returns to the wallet, never to the caller.

- A grant open to anyone and an admin grant have no caller that can remove them.
- A plugin that forwards `arc58_removePlugin` gains nothing: its own address is none of the three
  senders, and sending as the wallet's own account, which a plugin can do inside its window, is
  refused too.
- A wallet that names such a forwarder as its revocation app lets anyone strip its plugins.

## Keeping the mirror in sync

`principal.ts` is a copy of `projects/akita-sc/smart_contracts/utils/principal.ts`, byte-for-byte
except that the Akita-only block between the `// @akita-sc-only:begin` and `// @akita-sc-only:end`
marker lines is removed. Edit the source, then run
`npx tsx scripts/sync-akita-plugin-principal.ts` from `projects/akita-sc`.
`tests/principal-sync.test.ts` fails on drift.
