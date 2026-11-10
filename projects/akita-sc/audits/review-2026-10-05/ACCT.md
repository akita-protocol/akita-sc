# ACCT slice: ARC-58 account core, keys, escrow, sunset, base contracts, shared utils, principal resolution, @akta/plugin

Reviewer: production-readiness pass, 2026-10-05. Read-only. Working tree = HEAD `e7f174ee` + uncommitted changes.
Nothing was built, edited or sent. MainNet was read through `https://mainnet-api.4160.nodely.dev` (read-only).
Throwaway scripts: `review/bc-check.mjs`, `review/abi-diff.mjs`, `review/dao-wallet.mjs`, `review/dao-plugins.mjs`.

Verdict: **ISSUES** (2 High, 1 Medium, several Low/Info). The wallet core itself (rekey window, allowances,
execution keys, MBR accounting, principal predicate) held up; the High findings are in the sunset path and its
interaction with the new AVM 13 wallet program.

---

## 1. Scope (files + line counts)

| File | Lines | Status |
|---|---|---|
| `smart_contracts/arc58/account/contract.algo.ts` | 1,791 | modified; read in full + full diff vs HEAD |
| `smart_contracts/arc58/account/factory.algo.ts` | 395 | modified; read in full + diff |
| `smart_contracts/arc58/account/agent-probe.algo.ts` | 38 | new (test-only) |
| `smart_contracts/arc58/account/agent-revoker.algo.ts` | 19 | new (test-only) |
| `smart_contracts/arc58/account/balance-reader.algo.ts` | 76 | modified (schema fix) |
| `smart_contracts/arc58/account/{types,utils,errors,constants}.ts` | 172/49/131/60 | modified (types: removed dead types; errors: code renames) |
| `smart_contracts/arc58/keys/{ed25519,secp256r1}_passkey.algo.ts`, `constants.ts` | 35/37/8 | modified (ACC-09) |
| `smart_contracts/escrow/contract.algo.ts`, `factory.algo.ts`, `constants.ts` | 35/203/9 | modified (ACC-07); MainNet EscrowFactory 3569555755 is immutable |
| `smart_contracts/sunset/contract.algo.ts`, `wallet-factory.algo.ts`, `types.ts` | 73/180/10 | modified (F1, F6) |
| `smart_contracts/utils/base-contracts/{base,factory,optin,child}.ts` | 217/156/59/11 | modified |
| `smart_contracts/utils/base-contracts/upgradeable.ts` | 44 | new (moved out of base.ts, logic unchanged) |
| `smart_contracts/utils/programs.ts` | 103 | read (page/size helpers used by factories) |
| `smart_contracts/utils/functions.ts` | 927 | modified; read in full |
| `smart_contracts/utils/principal.ts` | 381 | new; read in full |
| `projects/akita-plugin/{principal,functions,index,base.algo,constants,types}.ts`, `package.json` | 350/179/56/46/12/12 | mirror checked identical to `utils/principal.ts` minus the `@akita-sc-only` block |
| Rollout / sunset scripts (cross-read) | — | `scripts/execute-deployer-sunset.ts`, `scripts/sunset-cleanup.ts`, `scripts/principal-phase2-upgrade-targets.ts`, `scripts/lib/principal-rollout{,-run}.ts` |
| Compiled artifacts | — | `AbstractedAccount` 8,178 B approval + 4 B clear (TEAL v13); `AbstractedAccountFactory` 3,515 B (v11); `SunsetContract` 712 B (v11); `WalletFactorySunsetContract` 1,131 B (v11) |
| go-algorand (local checkout) | — | `data/transactions/transaction.go:572-606` (program version rules), `data/transactions/logic/eval.go:5478-5486` (inner sender auth), `ledger/apply/asset.go:340-420`, `config/consensus.go:1538-1550` (v42 = MainNet: AVM 13, app size updates) |

MainNet facts used (read 2026-10-05):
- Wallet factory 3569556257: approval 3,240 B, 3 extra pages, schema 56/8. Its `bc` box holds an 8,186 B wallet
  program, **TEAL v11**, routing only the 10-arg `create(...)` (old selector present, new 11-arg selector absent).
- DAO wallet 3569559153: approval v11, clear v11, 3 extra pages, schema 30 bytes / 12 uints,
  `update_settings = 0xc0` (allowed, automatic), domain `akita.community`, no `d` (co-admin) boxes.
  Account holds 47.16 ALGO and 448,256 AKTA, and manages 16 created ASAs.
- MainNet protocol = ConsensusV42 (AVM 13 live; `AppSizeUpdates` on; program-byte surcharge only above 8,192 B).

---

## 2. Prior-finding verification

| ID | Status | Evidence |
|---|---|---|
| ACC-01 origin spoofing via EscrowFactory self-registration | **Fixed in tree** (live consumers stay vulnerable until upgraded; other slices) | `utils/functions.ts:285-305` `legacyWalletOf`/`legacyWalletID` require `isAkitaWallet` (creator == `appAddress(AkitaAppList.wallet)`); `legacyOriginOr` (`:219-228`) also requires live control. New code uses `utils/principal.ts` (no registry). |
| ACC-02 `coverFees` reimburses caller-chosen fee | **Fixed, documented residual** | `contract.algo.ts:1085-1111` reimburses only top-level (`callerApplicationId == 0`), `cooldown > 0`, caller-specific or exec-key grants; install guard `:1202-1205`. Residual: a designated caller can still burn ≤ 0.272 ALGO per cooldown period (decision (b)). |
| ACC-03 drip allowance | **Fixed** | `contract.algo.ts:718-743`: saturating add without overflow, `last` advances by whole intervals, zero-amount requests no longer erase accrual. |
| ACC-04 reclaim / opt-in by anyone on global grants | **Fixed** | `_requirePluginCaller` `:267-275` (plugin app, or named caller; global only for opt-in), expiry enforced; reclaim `:1486`, opt-in `:1528`. Opt-in payment is positional (`gtxn` arg = `groupIndex-1`), so it cannot be reused across calls. |
| ACC-05 removePlugin MBR refund / orphan alias | **Fixed** | `:1341-1343` refunds `pluginsMbr(key.escrow, n)`; `removeNamedPlugin` tolerates a removed grant `:1411-1419`. Charge/refund traced equal, including alias re-add sequences. |
| ACC-06 co-admin keys survive recovery / can't be revoked | **Partially fixed** | Revoke via `assignDomain(k,'')` `:1312-1325` with exact refund; recovery clears `domain` `:982`. Residual: see ACCT-5 (keys re-activate when the same domain is set again). |
| ACC-07 EscrowFactory delete strands balance; funding unbound | **Fixed in source only; moot** | `escrow/factory.algo.ts:55`, `:122-143`. EscrowFactory 3569555755 is immutable and no new escrow factory is planned. Also `Escrow.delete` can never run for a wallet escrow (ACCT-6). |
| ACC-08 `updateWallet` on any app; deployer re-init of `bc`; permissionless `register` | **Fixed (a, b); (c) won't fix as decided** | `factory.algo.ts:340-341` creator check; `utils/base-contracts/factory.ts:116-131` DAO-only after the DAO wallet exists. |
| ACC-09 passkey lsigs | **Fixed** | `arc58/keys/*`: rpIdHash template, UP+UV flags, `ed25519verify_bare` over `authData‖sha256(clientData)`; ES256 arg order fixed. |
| ACC-10a admin == controlled | **Fixed** | `:951`, `:978`. |
| ACC-10b named-plugin MBR omits escrow bytes | Won't fix (decided) | unchanged `:310-312`. |
| ACC-10c `canCall` ignores lastValid | **Fixed** | `pluginCallAllowed` `:404-424` now uses `pluginCheck` (expired, cooldown, per-method cooldown). |
| ACC-10e stateTotals | **Fixed** | `@contract({ stateTotals: 30/12 })` `:117-123`; artifact schema 30/12 = MainNet wallets. |
| F1 WalletFactorySunsetContract unauthenticated | **Fixed (auth); residual open** | `auth()` on every method `sunset/wallet-factory.algo.ts:54-179`. Residual staging window still in both scripts: ACCT-2. |
| F5 spoofed `wallet` spends plugin funds (lib part) | **Fixed in lib** (adoption is in the plugin slice) | `getControlledSpendingAccount` in `utils/functions.ts:398-402` and `akita-plugin/functions.ts:36-40`, exported `index.ts:7`. |
| F6 `SunsetContract.deleteBoxes` unauthenticated | **Fixed** | `sunset/contract.algo.ts:26-31`. |
| F8 test-only plugins ship as SDK clients | Won't fix (decided); grew | `akita-sdk/src/generated/` now also ships `Arc58AgentRevokerClient`, `Arc58AgentProbePluginClient` (see ACCT-9). |
| SG-04 external controlled address wrap | **Fixed** | `factory.algo.ts:130-139` in-group rekey proof. |
| R-STALE / Q2 | **Fixed in tree** | `assertValidGroup` closes only on `arc58_verifyAuthAddress` (`:536-545`); flash return keeps the shortcut (`:443-458`). Existing stale state is not repaired (log, wallet track item 7). |

---

## 3. New findings

### ACCT-1 — High — Sunset bricks the DAO treasury once the DAO wallet runs the AVM 13 program

- **Location:** `sunset/contract.algo.ts:11` (no `@contract({ avmVersion })` → TEAL v11; artifact `SunsetContract.approval.teal` line 1 `#pragma version 11`), `sunset/wallet-factory.algo.ts:61-100` (`updateWallet` pushes the boxed v11 SunsetContract with a v11 clear), `arc58/account/contract.algo.ts:117-118` (`avmVersion: 13`); scripts `scripts/execute-deployer-sunset.ts:631-679`, `scripts/sunset-cleanup.ts:166-219`.
- **Rule:** go-algorand `data/transactions/transaction.go:590-596`: an UpdateApplication may not lower the approval (or clear) version once it is ≥ `MinInnerApplVersion` ("approval program version downgrade: 11 < 13"). The implementation log already hit this exact error when trying to put the MainNet v11 wallet back on a tree wallet (IMPLEMENTATION-LOG §"D. LIVE wallets").
- **Scenario:**
  1. The planned rollout pushes the tree wallet (v13) to the DAO wallet (spec §9.5 step 4; anyone can also push it, the DAO wallet is `automatic`).
  2. Later the sunset runs. Both scripts update the DAO app to SunsetContract, **delete the DAO app**, and only then call `WalletFactorySunsetContract.updateWallet(daoWallet)` (`execute-deployer-sunset.ts:665-679`; `sunset-cleanup.ts` step 4 then step 5).
  3. That update pushes v11 approval + v11 clear onto a v13 app → rejected.
  4. State after the failure: the DAO wallet's admin is the deleted DAO app's address (no signer); the wallet factory now runs `WalletFactorySunsetContract`, which has no `initBoxedContract`/`loadBoxedContract` and no update route (immutable), so `bc` can never hold a v13 program; `update` on the wallet accepts only admin or factory. The DAO wallet's 47 ALGO, 448,256 AKTA and the manager role of 16 ASAs are locked permanently (the only remaining grants are execution-key-gated or narrow caller-specific ones; none can move AKTA).
- **Fix:** compile `SunsetContract` (and anything else that may ever be pushed into a wallet) at `avmVersion: 13`; in both scripts, push SunsetContract into the DAO wallet and simulate the remaining wallet steps **before** deleting the DAO app; add an e2e that runs `WalletFactorySunsetContract.updateWallet` against a real tree-built `AbstractedAccount`.

### ACCT-2 — High — Sunset staging window lets anyone turn every automatic-update user wallet into SunsetContract

- **Location:** `scripts/execute-deployer-sunset.ts:607-629` and `scripts/sunset-cleanup.ts:126-164` (step 1 stores SunsetContract as the live factory's `bc` child in one execution; step 2 swaps the factory approval in a later, separate execution); live/tree `arc58/account/factory.algo.ts:337-390` (`updateWallet` needs no caller when `automatic`); `contract.algo.ts:848-858` (wallet accepts updates from the factory).
- **Scenario:** after step 1 lands and before step 2 lands (different groups, possibly different rounds, and the window is visible on chain), any account sends `walletFactory.updateWallet(W)` for every wallet with `update_settings.automatic = true` (the MainNet default; SDK-created wallets choose it at creation now). Each wallet becomes `SunsetContract`, whose `auth()` accepts only the factory (creator) or `SUNSET_CALLER` (deployer). Consequences per wallet: the app account's ALGO/ASAs are movable only by the deployer (`delete(closeRemainderTo)`); an external controlled EOA and every escrow stay rekeyed to the wallet app, and SunsetContract has no method that sends as them, so those funds are frozen forever. Cost to the attacker: fees, ~16 wallets per group.
- **Current gating:** every MainNet wallet is TEAL v11 today, so all are exposed. Wallets already updated to the v13 tree program are protected only by accident (the downgrade rule in ACCT-1); fixing ACCT-1 by compiling SunsetContract at v13 removes that accident and exposes all automatic wallets again. The scripts contain no inventory gate (the fix doc's decision (a) "accept after an inventory" is not implemented).
- **Fix:** do steps 1 and 2 in one atomic execution group (SunsetContract is 712 B: init + 1 load + the factory approval update fit well under 16 txns), or have `WalletFactorySunsetContract` carry the SunsetContract program itself and never stage it in the live factory's `bc`. Add an e2e: stranger calls `updateWallet(userWallet)` between the two steps and must fail.

### ACCT-3 — Medium — `--skip-wallet-child` / `--split-children` leave the upgraded wallet factory unable to create wallets

- **Location:** `scripts/principal-phase2-upgrade-targets.ts:45-46,85-86`, `scripts/lib/principal-rollout.ts:516-518` (wallet child marked `optional: true`, comment "leaves new wallets on the old code"), `scripts/lib/principal-rollout-run.ts:323`; contract side `arc58/account/factory.algo.ts:145-169` (`compileArc4(AbstractedAccount).call.create` with the 11-arg selector and the v13 clear program, approval from `bc`).
- **Scenario:** the operator runs Phase 2 with `--skip-wallet-child` (or `--split-children`, which the help text recommends when the combined group does not build). The factory is upgraded to the tree; `bc` still holds the MainNet v11 wallet. Every `newAccount` then sends an 11-arg `create` selector the v11 program does not route, with a v13 clear next to a v11 approval ("program version mismatch: 11 != 13"). All wallet creation (SDK, Welcome, Guild) reverts; `updateWallet` reverts too. With `--skip-wallet-child` this lasts until someone notices and runs a separate child push. The comment "leaves new wallets on the old code" is wrong.
- **Fix:** make the wallet child mandatory for the AbstractedAccountFactory target (refuse `--skip-wallet-child` / split for it), or have `planTarget` refuse a factory upgrade whose compiled child selector/version does not match the live `bc`.

### ACCT-4 — Low — `newAccount` with an external controlled address and any plugin (or escrow) always reverts

- **Location:** `arc58/account/factory.algo.ts:205-226` (plugin installs run while the external account is still rekeyed to the factory; it is rekeyed to the wallet only at `:229-262`); `contract.algo.ts:278-288` (`_payMbrFromControlled` sends from `controlledAddress`), `:351-366` (escrow creation also sends from it).
- **Scenario:** `newAccount(controlledAddress = C, plugins = [...])`: the wallet's `_addPlugin` issues an inner payment with sender C, whose authorizer is the factory, not the wallet (`logic/eval.go:5478-5486`) → revert. Even if ordering were fixed, the factory already funds `pluginMBR` into the wallet app (`:179-185`) and the wallet would charge C again (double charge). Pre-existing in HEAD; untested (`factory.e2e.spec.ts:595-680` cover external C without plugins only). No funds lost (the group reverts).
- **Fix:** for external C, install plugins after the rekey to the wallet and do not pre-fund `pluginMBR` into the app, or reject `plugins.length > 0` with external C.

### ACCT-5 — Low — Recovery clears co-admin keys only until the same domain is set again

- **Location:** `contract.algo.ts:379-386` (`isAdmin` = key's domain equals the wallet domain), `:962-987` (recovery sets `domain = ''`), `:867-870` (`setDomain`).
- **Scenario:** a co-admin passkey K (domain `akita.community`, the factory domain every wallet starts with) is compromised. An admin plugin recovers the wallet (`domain = ''`). The new admin re-enables multi-device use with `setDomain('akita.community')` as the docs instruct, which re-activates **every** old key with that domain, including K. K is a full admin (`update`, `arc58_changeAdmin`) and can take the wallet back. Safe only if the new admin first revokes each old key with `assignDomain(k, '')`, which the contract does not force. Latent: no admin/recovery plugin exists outside `mocks/admin-plugin`.
- **Fix:** have recovery bump a domain epoch stored with each key (or delete keys lazily on mismatch), or document that `setDomain` after recovery must use a fresh domain string.

### ACCT-6 — Low — `Escrow.delete` can never succeed for a wallet escrow, so `EscrowFactory.delete` and the sunset `deleteEscrows` step always fail

- **Location:** `escrow/contract.algo.ts:27-34` (closes its balance with an inner payment from its own address), `escrow/factory.algo.ts:55-75` (every escrow is rekeyed to the caller at creation), `sunset/contract.algo.ts:48-56`, `scripts/execute-deployer-sunset.ts:713-731`.
- **Scenario:** a wallet escrow's auth address is the wallet app address. The escrow app's inner payment from its own address fails `authorizedSender` (`eval.go:5483`). Nothing in the wallet ever rekeys an escrow back to itself. So the ACC-07 refund logic is unreachable for wallet escrows, and the sunset's "deleting DAO wallet-owned escrow apps" step aborts the script (after the DAO is already deleted). Locked per escrow: its 0.1 ALGO min balance plus the factory's 150,000 µA creator MBR (24 DAO escrows ≈ 6 ALGO).
- **Fix:** the escrow must be rekeyed back to itself (e.g. through a plugin window) before deletion; add that step to the sunset scripts, or accept and skip the step.

### ACCT-7 — Info — coverFees grants are limited to one plugin call per window

- `_addPlugin` now requires `cooldown > 0` for `coverFees` (`:1202-1205`), and the plugin-level cooldown makes the second plugin app call in the same window fail (`assertValidGroup` `:560-562`, `isOnCooldown` `:460-470`: `0 < cooldown`). Agent/keeper flows that need two plugin calls in one window cannot use fee coverage. Functional, not a fund risk.

### ACCT-8 — Info — `arc58_canCall(..., type = Admin)` now reverts for a non-admin reader

- `resolveCallerType` asserts admin for `CallerTypeAdmin` (`:394-402`); `arc58_canCall` (`:1031-1041`) is readonly and simulated by arbitrary readers, so it now throws instead of returning `false`.

### ACCT-9 — Info — Test-only `Arc58AgentRevoker` is unauthenticated and its client ships in the SDK

- `arc58/account/agent-revoker.algo.ts:12-18` forwards `arc58_removePlugin` for anyone. If a deployment ever sets it as a wallet's revocation app, anyone can strip that wallet's plugins. `akita-sdk/src/generated/Arc58AgentRevokerClient.ts` and `Arc58AgentProbePluginClient.ts` are exported like production clients (same pattern as F8).

### ACCT-10 — Info — Admin misconfigurations that hand admin to plugins

- `assignDomain(controlledAddress, walletDomain)` makes the controlled account a co-admin; any plugin holding it in a window can then call `arc58_changeAdmin` as it. `arc58_newEscrow(name, address = external controlled C)` (`:369`) is accepted and creates an "escrow" that is the main account, so escrow-scoped allowances stop limiting a plugin. Both need the admin's own action; cheap guards: reject `caller == controlledAddress` in `assignDomain` and `address == controlledAddress` in `newEscrow`.

### ACCT-11 — Info (outside slice, observed on MainNet) — DAO wallet has caller-specific grants for EOAs

- DAO wallet plugin boxes (`review/dao-plugins.mjs`): caller `YIIMG4OHC4SBM2HGVU3PHZSUL7YCFTGVR4U2ADA5RZZGDLIBAM5IEK5RUY` holds non-execution-key, unrestricted grants on the main account for NFD (3572944055), ASA manager (3605315701), self-optin (3569560545) and social (3569562087) plugins, plus RM `rev_nfd`; the factory creator `R2MOGX…` holds self-optin and ASA-manager grants. These bypass DAO proposals for the treasury account. Route to the DAO slice.

---

## 4. Suspicions (not proven)

- None at High/Medium. Checked and dropped: reuse of one sponsor payment across many `arc58_pluginOptInEscrow` calls (impossible: ARC-4 txn args are positional, `groupIndex-1`); outer `verifyAuthAddress` passing with a different spending account after nested windows (every nested `rekeyToPlugin` needs its own `verify`, which zeroes `spending_address`, so the outer `verify` fails closed).

---

## 5. Upgrade / rollout notes

1. **AVM 13 is one-way.** Once a wallet runs the tree program (v13), no program below v13 can ever be pushed to it: no rollback to the MainNet wallet, and every future wallet program, sunset program or emergency patch must be compiled at AVM ≥ 13 (ACCT-1).
2. **Wallet size:** 8,178 B + 4 B clear = 8,182 B, 10 B under the 4-page limit that MainNet wallets have. Any further wallet change needs page growth (factory becomes size sponsor via `extraPagesToGrow`, `utils/programs.ts:58-62`; each permissionless `updateWallet` then charges the factory +100,000 µA per added page per wallet).
3. **Factory + child must be atomic** (ACCT-3). The default plan is atomic (2 wrap + 5 factory + 7 child = 14 txns); do not use `--skip-wallet-child` or `--split-children` for AbstractedAccountFactory.
4. **ABI:** vs HEAD/MainNet the only removed selectors are factory `newAccount` 10-arg (K2, accepted) and wallet `create` 10-arg (only the factory calls it). All other wallet selectors are unchanged; error codes are renamed (`ERR:ADMN` → `ERR:errAdmn` etc.), so off-chain error mappers must ship with the SDK.
5. **Schema:** wallet 30/12 and factory 56/8 match MainNet. Box layouts (`PluginInfo`, `AllowanceInfo`, `EscrowInfo`, `ExecutionInfo`, keys) are unchanged; existing boxes stay valid.
6. **DAO wallet is `automatic = true`.** Once the DAO loads the new wallet into `bc`, anyone can push it to the DAO wallet. Behaviour changes it brings: Q2 (only `verifyAuthAddress` closes windows), coverFees rules, reclaim restrictions.
7. **Sunset:** do not run either sunset script until ACCT-1, ACCT-2 and ACCT-6 are fixed; re-order so the DAO is deleted last.
8. EscrowFactory source changes (ACC-07, payment binding) do not ship: MainNet 3569555755 is immutable and wallets have no `escrow_factory` setter.

---

## 6. Test gaps (name only)

- Sunset e2e: `WalletFactorySunsetContract.updateWallet` on a real tree-built (v13) `AbstractedAccount` (would catch ACCT-1).
- Sunset e2e: stranger `walletFactory.updateWallet(userWallet)` between the "store child" and "swap factory" executions (ACCT-2).
- Sunset e2e: `deleteWalletEscrows` on a wallet with a real factory-created escrow (ACCT-6).
- Rollout test: Phase 2 AbstractedAccountFactory with `--skip-wallet-child`, then `newAccount` (ACCT-3).
- Factory e2e: `newAccount` with external controlled address + one plugin (ACCT-4).
- Admin e2e: recovery → `setDomain(sameDomain)` → old co-admin key must stay disabled (ACCT-5).
- Wallet e2e: coverFees grant used with two plugin calls in one window (ACCT-7).

---

## 7. Checked and OK

- **Rekey window:** only `arc58_verifyAuthAddress` closes a window; every outer app call in the window must be the installed plugin, NoOp, `AppVersion == 0`, `appArgs(1) == wallet`; nested `rekeyToPlugin` resets and zeroes `spending_address` so the outer verify fails closed; an empty or verify-only window fails; the R-STALE constructions now fail (`errNrkb`).
- **Flash rekey** (`assertRekeysBack`): admin-only; the `spending == controlled` verify clause is evaluated at `arc58_rekeyTo` time, so in practice only the controlled-address shortcut returns a flash (admin self-harm only).
- **coverFees:** top-level only, cooldown-limited, never on open global grants; reimbursement paid from the spending account inside the window.
- **Allowances:** flat and window math unchanged and correct; drip saturates, no overflow, no lost partial intervals; MBR per allowance matches the box layout (27,700 + 400·len).
- **Execution keys:** bound to `Txn.lease`, round window and exact group id; consumed with exact MBR refund; extension charges exactly 12,800 µA per group; anyone may remove expired keys (refund to controlled).
- **MBR constants:** plugin 38,900, named 20,500 (+name; escrow bytes undercharged by design), escrow 19,300, allowance 27,700, execution 23,700, domain key 15,700 all match their ARC-4 layouts; add/remove refunds are symmetric incl. alias edge cases.
- **Admin plugin path** (`arc58_pluginChangeAdmin`): sender = current plugin, controlled account rekeyed to it, `admin` flag, empty escrow; cannot be reached through another plugin's window.
- **Wallet factory:** exact payment equation; creation referral (Q1-A2) cannot underflow (guard equals `sendReferralPaymentTo` MBR); in-group SG-04 proof; `updateWallet` creator check; growth path keeps schema; create/`cost()` page MBR = 400,000 µA for ≤ 8 KB.
- **`FactoryContract`:** `initBoxedContract` creator-only before the DAO wallet exists, DAO-wallet-only after; `loadBoxedContract` bound to a same-sender init in the same group; `deleteBoxedContract` DAO-only. `UpgradeableAkitaBaseContract.update` requires DAO wallet sender and the update plugin as caller.
- **Principal predicate** (`utils/principal.ts`): genuine check by hashed factory address (no resource, pinned by consumer); `callerApp != 0`; direct arm relies on AVM sender auth; plugin arm requires `W.spending == S` and `S != callerAddr`; liveness requires custody (`auth(C) == W.address` or un-rekeyed `W.address`); forged `controlled_address`/`spending_address`/`referrer` cannot name a third party; `ownsAtRest`/`atRestPrincipal`/`ctxOwns` read no wallet globals; `pluginPrincipal` asserts this app holds S; `resolvePrincipalFromDexCtx`/`tipWalletFor` are stripped from the `@akta/plugin` mirror (mirror verified identical otherwise). Residuals R-REFERRER, R-CREATOR, rule-6 (window hint) and custody rules are as documented.
- **Legacy helpers:** `legacyOriginOr` now requires live control; `getOriginAccount` rejects malformed values.
- **Escrow factory register:** creator-chain check prevents mapping someone else's escrow.
- **Passkey lsigs:** challenge bound to group id / txid; rpIdHash and UP+UV enforced; correct verify primitives.
- **Sunset auth:** every `SunsetContract` and `WalletFactorySunsetContract` entry point gated (creator or `SUNSET_CALLER`).
- **balance-reader:** HEAD schema (1 byte, 0 uint) could not store its uint global; tree schema (1 uint) is correct.
- **Program surcharge:** wallet total 8,182 B is under the 8,192 B free limit, so no v42 per-byte fee on create/update.
