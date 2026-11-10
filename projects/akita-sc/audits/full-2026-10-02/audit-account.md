# Akita security audit: ARC-58 account core and shared trust boundaries

Reviewer scope: ARC-58 account core, passkey logic signatures, escrow, shared base contracts, shared utils, and the `@akta/plugin` library. Read-only review of the current working tree (2026-10-02). Nothing was built or run on chain.

## Files read

- `projects/akita-sc/smart_contracts/arc58/account/contract.algo.ts` (all), `factory.algo.ts`, `mbr.algo.ts`, `balance-reader.algo.ts`, `types.ts`, `constants.ts`, `utils.ts`; also the `git diff HEAD` of `contract.algo.ts`
- `projects/akita-sc/smart_contracts/arc58/keys/ed25519_passkey.algo.ts`, `secp256r1_passkey.algo.ts`
- `projects/akita-sc/smart_contracts/escrow/factory.algo.ts`, `contract.algo.ts`, `constants.ts`; also their diff against HEAD
- `projects/akita-sc/smart_contracts/utils/base-contracts/{base,child,factory,optin,upgradeable}.ts`
- `projects/akita-sc/smart_contracts/utils/functions.ts` (all), `utils/types/{mbr,base,optin,asset-inbox}.ts`
- `projects/akita-plugin/{base.algo,functions,constants,types,index}.ts`
- Cross-reads used to confirm or refute findings:
  - `auction/contract.algo.ts` (gatedBid)
  - `marketplace/marketplace.algo.ts` (gatedPurchase)
  - `subscriptions/contract.algo.ts` (gatedSubscribe*)
  - `staking-pool/contract.algo.ts` (gatedEnter, gateCheck)
  - `gates/contract.algo.ts` (check/mustCheck)
  - `gates/sub-gates/akita-referrer`
  - `arc58/dao/contract.algo.ts` (addPlugin)
  - `arc58/plugins/social/contract.algo.ts`
  - `arc58/plugins/update-akita-dao`
  - SDK defaults in `akita-sdk/src/wallet/types.ts`
  - the compiled `AbstractedAccount.approval.teal`, to confirm that inner-transaction fees are 0 and that a box overwrite does `box_del`/`box_put`

---

## Findings

### ACC-01: Any app can register itself as a "wallet" in EscrowFactory and forge the `origin` used for gate checks (gate bypass)

- **Severity:** High
- **Confidence:** Likely. The full code path was traced; no on-chain proof of concept was run.
- **Location:**
  - `escrow/factory.algo.ts:78-101` (`register`: any app caller with `app = 0` registers its own address)
  - `utils/functions.ts:142-206` (`originOr` / `getOriginAccount` / `getWalletIDUsingAkitaDAO` trust the registered app's `controlled_address` global state)
  - Consumers:
    - `auction/contract.algo.ts:669-673, 691-695`
    - `marketplace/marketplace.algo.ts:302-307`
    - `subscriptions/contract.algo.ts:714-716, 760-762, 916-917`
    - `staking-pool/contract.algo.ts:985-989` and `1130-1140` (`gateCheck` disqualification)
    - `arc58/plugins/subscriptions/contract.algo.ts:472-473`
- **Description:**
  - `EscrowFactory.register` only requires `Global.callerApplicationId !== 0`. With `app = 0`, it maps `bytes16(caller.address)` to `itob(callerAppId)`. Nothing checks that the caller is an `AbstractedAccount` created by the wallet factory.
  - Shared helpers then resolve `Txn.sender` to a wallet id through that registry. They read `controlled_address` from that app's global state and use the result as the authenticated "origin".
  - The gated entry points pass this origin to `gateCheck`, which only checks that the grouped `Gate.mustCheck` call used `caller == origin`.
  - `Gate.check(caller, …)` evaluates the gate purely against the supplied address (`gates/contract.algo.ts:157-165`). No signature from that address is needed.
  - The akita-referrer sub-gate shows the intended pattern: `wallet.creator === Application(factory).address` (`gates/sub-gates/akita-referrer/contract.algo.ts:47`). The origin helpers do not apply it.
- **Exploit:**
  1. The attacker deploys app A whose global state holds `controlled_address = V`, where V is any address that passes the target gate (for example a whale holding the gated NFT or stake).
  2. A calls `EscrowFactory.register(pay 12_100, 0)` with an inner payment plus app call.
  3. A sends an inner group:
     - `[pay → auction, Gate.mustCheck(V, gateID, args), Auction.gatedBid(pay, gateTxn, mkt)]`
  4. `Txn.sender` is A.address, so the auction resolves wallet = A and origin = V. The gate passes and A bids in a holder-only auction.
  5. The same works for:
     - `Marketplace.gatedPurchase`
     - `Subscriptions.gatedSubscribe/gatedSubscribeAsa`
     - `StakingPool.gatedEnter`
     - re-checks through `StakingPool.gateCheck`, so the attacker's entries are never disqualified
- **Fix (either of):**
  - In `getWalletID` / `originOr`, require `Application(wallet).creator === walletFactory.address`, resolving the wallet factory from the DAO registry.
  - Or restrict `EscrowFactory.register(app = 0)` to apps created by the ARC-58 wallet factory.
  - In both cases, also verify that `controlled_address` exists (`getExBytes` second return).

### ACC-02: `coverFees` reimburses an attacker-chosen `Txn.fee`, letting the wallet be drained into fees

- **Severity:** Medium. It depends on configuration: any global or semi-trusted-caller key with `coverFees = true`.
- **Confidence:** Confirmed by trace.
- **Location:** `arc58/account/contract.algo.ts:1043-1056`
- **Description:**
  - Reimbursement is `min(Txn.fee, 272 * minTxnFee)`, paid from the spending account to `Txn.sender`. `Txn.fee` is set entirely by the caller and is not tied to the fees the window actually needs.
  - The caller pays X in fees and gets X back. The wallet loses X (up to 0.272 ALGO) for every rekey window.
  - With a global key and `cooldown = 0`, an attacker app can open many windows per outer transaction through inner groups. The pattern is `[rekeyToPlugin(fee = 272_000), plugin.m(wallet, true), verify]`, about 5 inner transactions per window, so roughly 50 windows per app call and 16 app calls per group. That drains about 0.272 ALGO per window, or hundreds of ALGO per group.
  - The excess can also pay fees for the attacker's unrelated transactions through fee pooling.
  - An agent key (`caller = agent`), which the connect protocol tests set up with `coverFees: true`, can likewise burn wallet ALGO regardless of its allowances.
- **Fix:**
  - Reimburse only a bounded, computed amount (for example `(numInnerTxns + 1) * minTxnFee` for the window), or store a per-key `maxFeeReimbursement`.
  - Require a cooldown, or forbid `coverFees` on global keys.

### ACC-03: Drip allowance discards partial intervals on every use, so anyone with access can freeze refills

- **Severity:** Medium (DoS or under-accrual of allowance; no theft)
- **Confidence:** Confirmed
- **Location:** `arc58/account/contract.algo.ts:698-713`
- **Description:**
  - `accrued = spent + floor(passed / interval) * amount`, and then `last = now` unconditionally (line 713). The remainder `passed % interval` is lost on every call.
  - `fundsRequest` with `amount = 0` passes the check and still resets `last`.
  - On a global escrow plugin, an attacker can submit `[rekeyToPlugin(…, fundsRequest = [{asset, 0}]), harmlessPluginCall(wallet, true), verify]` more often than `interval`. The drip then never accrues again after the legitimate user spends.
  - Honest frequent callers also lose accrual (calling every `interval/2` halves the rate).
- **Overflow:** `floor(passed/interval) * amount` overflows (panic) after a long idle period when `amount` is large (for example high-decimal ASAs). That bricks the allowance permanently because `last` can never update.
- **Fix:**
  - Set `last = accrualStart + floor(passed/interval) * interval`.
  - Skip zero-amount requests.
  - Cap the interval count at `ceil(max / amount)` before multiplying.

### ACC-04: `arc58_pluginReclaim` and `arc58_pluginOptInEscrow` are callable by anyone on global keys and skip expiry, cooldown, method and execution-key checks

- **Severity:** Medium (griefing and DoS of escrow-backed plugins; funds only move to the owner)
- **Confidence:** Confirmed
- **Location:**
  - `arc58/account/contract.algo.ts:252-259` (`_requirePluginCaller`: `caller === zeroAddress` passes for any sender)
  - `1407-1422` (reclaim)
  - `1446-1473` (opt-in)
- **Description:**
  - For a key `{plugin, caller: zero, escrow}` with `canReclaim`, anyone can call `arc58_pluginReclaim` directly, with no rekey window. The SDK default is `canReclaim: true` (`akita-sdk/src/wallet/types.ts:116`, `index.ts:591`, `factory.ts:83`).
  - The call can move any amount of ALGO or ASA out of the escrow and, when the escrow is unlocked, `closeOut` (opt the escrow out of) ASAs.
  - Plugin `lastValid`, cooldowns, method restrictions and `useExecutionKey` are not checked, so an expired grant still has reclaim power.
  - `arc58_pluginOptInEscrow` likewise lets anyone opt the escrow into arbitrary ASAs. Their payment nets to zero for the wallet, but it creates junk holdings and locks MBR.
  - The result: a third party can repeatedly drain escrows that subscriptions, auctions or keepers depend on, and opt them out of required assets.
  - DAO-governed installs hardcode `canReclaim = false` (`arc58/dao/contract.algo.ts:317-337`), so the DAO wallet is not affected through governance-installed keys.
- **Fix:**
  - Require `Txn.sender === Application(plugin).address`, or `Txn.sender === caller` with `caller !== zero`.
  - Apply `pluginCheck` (expiry and cooldown).
  - Change the SDK default to `canReclaim: false`.

### ACC-05: `arc58_removePlugin` does not refund plugin-box MBR and orphans named aliases

- **Severity:** Low
- **Confidence:** Confirmed
- **Location:** `arc58/account/contract.algo.ts:1275-1283` (compare `removeNamedPlugin`, `1342-1356`, which refunds)
- **Description:**
  - The plugin box is deleted with no `_refundMbrToControlled(pluginsMbr(...))`. For wallets with an external `controlledAddress`, the MBR paid by the controlled account stays in the app account. This breaks the "exact refund" invariant.
  - If the key also has a name, the `n` box survives. `removeNamedPlugin` then always fails at `_requirePlugin(app)`, so the alias, its MBR and the name are stuck until the same key is re-added.
- **Fix:**
  - Refund `pluginsMbr(key.escrow, methods.length)`.
  - Reject removal while an alias points at the key, or delete it in the same call.

### ACC-06: Domain co-admin passkeys survive admin changes and cannot be individually revoked

- **Severity:** Low (latent: no admin/recovery plugin or `assignDomain` caller exists in-repo yet)
- **Confidence:** Confirmed
- **Location:**
  - `arc58/account/contract.algo.ts:363-368` (`isAdmin`)
  - `913-946` (`changeAdmin` / `pluginChangeAdmin`)
  - `1260-1266` (`assignDomain`)
- **Description:**
  - Any `domainKeys[addr] == domain` is a full admin, including `update` to arbitrary code.
  - There is no delete method. `arc58_changeAdmin` and `arc58_pluginChangeAdmin` (recovery) leave all co-admin keys valid.
  - After a recovery triggered because a device was compromised, the compromised co-admin passkey can immediately call `arc58_changeAdmin` and take the wallet back, winning the race against the new admin's `setDomain`.
  - `assignDomain` also charges full MBR again on overwrite (`box_del` + `box_put`) without refunding the old amount.
- **Fix:**
  - Add `removeDomainKey`.
  - Have admin changes through the admin plugin rotate a domain epoch (or clear `domain`) so existing co-admins are invalidated.

### ACC-07: EscrowFactory deletion strands the child escrow's balance, and the documented fixes are absent

- **Severity:** Low (currently unreachable for ARC-58 wallets, which have no path to `EscrowFactory.delete`; reachable for other app-created registered escrows)
- **Confidence:** Confirmed
- **Location:**
  - `escrow/factory.algo.ts:103-133` (refund excludes the escrow's `Global.minBalance` and any residual ALGO, which `Escrow.delete` closes to the factory at `escrow/contract.algo.ts:27-34`)
  - `41-76` (`new` does not bind the payment sender)
- **Description:**
  - `CONTRACT_AUDIT.md` (Medium, Escrow Factory) states that funding was caller-bound and that the deletion refund includes the child base balance.
  - Neither is in HEAD or the working tree; the only diff is error-constant renames.
  - Any residual ALGO in a deleted escrow is permanently retained by the factory.
  - The 16-byte (EOA) creator branch of `delete` is unreachable, because `register` requires an app caller.
- **Fix:**
  - Measure the factory balance before and after `Escrow.delete`, and refund the delta plus the released MBR.
  - Reconcile the audit document with the code.

### ACC-08: Permissionless `register()` and `updateWallet()` side effects

- **Severity:** Low / Info
- **Confidence:** Confirmed
- **Location:**
  - `arc58/account/contract.algo.ts:792-810`
  - `arc58/account/factory.algo.ts:299-331`
- **`AbstractedAccount.register(escrow)`:**
  - It has no auth check. Anyone can make the wallet app pay 12_100 µALGO per escrow to the factory.
  - Each escrow can be registered only once, so the cost is bounded, but it spends user funds without consent.
  - Escrow registration MBR is not collected at `newEscrow` time.
- **`AbstractedAccountFactory.updateWallet(wallet)`:**
  - It accepts any app id and does not check `wallet.creator == factory`.
  - With default `automatic = true`, anyone can push the factory's currently boxed bytecode to every wallet. This is a central trust assumption: DAO or bytecode compromise means every wallet is compromised.
  - After the DAO calls `deleteBoxedContract`, the original factory creator regains the ability to `initBoxedContract` arbitrary code (`utils/base-contracts/factory.ts:42-46`). Anyone can then propagate that code to all auto-update wallets.
- **Fix:**
  - Admin-gate `register`.
  - Check the creator in `updateWallet`.
  - Make the `init` re-creation path DAO-only.
  - Consider defaulting `automatic` to false.

### ACC-09: Passkey logic signatures

- **Severity:** Info
- **Confidence:** Confirmed
- **Location:** `arc58/keys/ed25519_passkey.algo.ts:15-23`, `secp256r1_passkey.algo.ts:17-25`
- **Description:**
  - Transaction integrity is sound. The signed `clientDataJSON` slice must base64url-decode to `Global.groupId` (or `Txn.txId` when single), which binds fee, rekeyTo, close fields and validity. The attacker-chosen split into `cdOne|cdTwo|cdThree` cannot produce a different 32-byte challenge.
  - The ed25519 variant uses `ed25519verify`, which prepends "ProgData"‖programHash. It also hashes the WebAuthn message differently from what Ed25519 authenticators sign, so it can never validate a real WebAuthn signature. It should be `ed25519verify_bare` over `authData‖sha256(clientData)`.
  - Neither lsig checks rpIdHash, UP/UV flags or `type == "webauthn.get"`. That is acceptable only because credentials are RP-bound by the authenticator.

### ACC-10: Minor

- **Severity:** Info
- **Items:**
  - `namedPluginsMbr` omits the escrow-name bytes stored in the alias value (`constants.ts:48-49`, `contract.algo.ts:294-296`), so the app account subsidizes `400 * len(escrow)`.
  - `arc58_canCall` ignores `lastValid` (`contract.algo.ts:382-409`).
  - `defaultToEscrow` keys can never receive a `fundsRequest`, because allowances keyed by escrow `''` cannot exist.
  - The `create` check `admin !== controlledAddress` is bypassed when the factory uses setup mode, followed by `arc58_changeAdmin(admin)`.
  - `@contract({ avmVersion: 13 })` dropped the over-provisioned `stateTotals` (30/12) that `constants.ts:8-13` relies on for future upgrades. New wallets get the exact schema, so a later upgrade that adds global keys will fail for them.

---

## Checked and OK

- **Rekey sandwich (`assertValidGroup`, `txnRekeysBack`, `arc58_verifyAuthAddress`):**
  - Every outer app call in the window must target the plugin with NoOp, `version == 0` and `appArgs[1] == wallet`. Other apps, creates, ClearState and nested `rekeyToPlugin` on the same wallet are rejected.
  - The "manual" rekey-back branch needs an outer transaction from `controlledAddress`, which only an admin flash-rekeyed EOA can sign.
  - Nested inner-group `rekeyToPlugin` resets `spendingAddress`, which makes the outer `verify` fail closed.
  - Empty and verify-only windows fail because the spending account is still rekeyed to the plugin.
- **Admin plugin:** `pluginChangeAdmin` binds `Txn.sender` to the plugin of `currentPlugin`, the controlled-address auth, and the `admin` flag. A plugin cannot elevate through another plugin's window.
- **Cooldowns and method restrictions:**
  - Plugin-level cooldown allows one call per group.
  - Per-method offsets are bounds-checked and the selector is compared.
  - `CallerTypeAdmin` requires `isAdmin`.
- **Execution keys:** bound to `Txn.lease`, firstValid/lastValid rounds, and an exact group-id match. Consumed (deleted, with MBR refunded) on first use. Anyone can remove an expired key. Extension MBR is exact.
- **Flat and window allowances:** correct; no underflow, since `spent ≤ amount` is maintained. Enum and interval validation is present.
- **MBR constants:** the plugin, escrow, allowance, execution and domain-key minimums match their ARC-4 layouts (raw string keys and values).
- **Inner-transaction fees:** fixed at 0 in the compiled TEAL, so the app account is not drained by its own inner fees.
- **Escrow:** `rekey`/`delete` are creator-only. The factory's `register` checks the creator chain, so an escrow → wallet mapping cannot be forged for someone else's wallet.
- **`FactoryContract`:** `loadBoxedContract` requires a same-sender `initBoxedContract` in the same group, so bytecode loads are atomic. `UpgradeableAkitaBaseContract.update` requires the DAO wallet and the update plugin.
- **`AkitaFeeGeneratorContractWithOptIn.optIn` / `optAkitaEscrowInAndSend`:** payments are exact and the escrow id is cross-checked against the DAO wallet's escrow record.
- **Wallet factory `newAccount`:**
  - Exact payment accounting.
  - The external controlled-address flow requires the account to be rekeyed to the factory atomically in the caller's group.
  - Temporary factory admin is transferred at the end.
- **`@akta/plugin` helpers:** `rekeyAddress`, `rekeyBackIfNecessary` and `getSpendingAccount` behave as documented. A forged `wallet` argument cannot make a plugin sign for an account not rekeyed to it, because AVM auth fails. Origin values read by plugins are only as trustworthy as ACC-01 allows: plugins never verify `wallet.creator`.
