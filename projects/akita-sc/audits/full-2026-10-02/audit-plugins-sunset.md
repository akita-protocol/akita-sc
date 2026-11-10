# Akita security audit: ARC-58 plugins (part) and sunset

Reviewer scope (current working tree, read-only):

- `projects/akita-sc/smart_contracts/arc58/plugins/`: revenue-manager, nfd, haystack-router, asa-manager, optin, self-optin, pay, pay-silo (plugin and factory), asset-inbox, welcome, sunset, test-close-out, test-proxy-rekey
- `projects/akita-sc/smart_contracts/sunset/` (`SunsetContract`, `WalletFactorySunsetContract`)
- Cross-reads: `arc58/account/contract.algo.ts` (rekeyToPlugin, assertValidGroup, verifyAuthAddress, update, _addPlugin), `arc58/account/factory.algo.ts` (updateWallet), `utils/functions.ts` (getSpendingAccount, getEscrow, arc58OptInAndSend), `projects/akita-plugin/*.ts`, and the scripts `sunset-cleanup.ts`, `execute-deployer-sunset.ts` and `deploy-revenue-manager-plugin.ts`.

How the wallet enforces calls (this was the baseline for every finding): `arc58_rekeyToPlugin` rekeys the spending account to the plugin. `assertValidGroup` (account/contract.algo.ts:484-562) then requires every app call before the first rekey-back txn to be a NoOp to the same plugin, with `appArgs(1)` equal to this wallet, and enforces method restrictions. `arc58_verifyAuthAddress` (951-952) reverts unless the spending account's auth address is back on the wallet. Any plugin method that is granted to a non-owner caller (Global or Other) must therefore be safe for any argument values that caller picks.

---

## Findings

### F1: WalletFactorySunsetContract has no authorization, so anyone can drain the DAO wallet and default-config user wallets during sunset
- **Severity:** Critical. **Confidence:** Confirmed (by code and script trace).
- **Location:** `smart_contracts/sunset/wallet-factory.algo.ts:42-131` (every method: `updateWallet`, `deleteWalletBoxes`, `closeOutWallet`, `deleteWalletAssets`, `deleteWalletEscrows`, `deleteWallet`, `deleteBoxedContract`, `deleteBoxes`, `closeOut`, `deleteAssets`, `delete`). Related: `sunset/contract.algo.ts:13-18` (`auth()` accepts `Global.creatorAddress`), `arc58/account/contract.algo.ts:779` (wallets default to `factoryUpdateSettings = {allowed:true, automatic:true}`), `arc58/account/contract.algo.ts:813-822` (wallet `update` accepts the factory), `arc58/account/factory.algo.ts:299-307` (live factory `updateWallet` needs no caller check when `automatic`).
- **Description:** `CONTRACT_AUDIT.md` says the destructive sunset entry points are creator/deployer-only. That holds for `SunsetContract`, but `WalletFactorySunsetContract` has no sender check and no pinned target or destination in any method. The factory is the creator of every wallet. So when the factory calls a wallet that runs `SunsetContract`, the wallet's `auth()` passes (`Txn.sender === Global.creatorAddress`).
- **Exploit scenario:**
  1. The sunset scripts (`sunset-cleanup.ts` steps 1-7, `execute-deployer-sunset.ts:605-760`) first load `SunsetContract` as the factory's boxed child. In a separate proposal they then update the factory approval to `WalletFactorySunsetContract`. All later steps are separate transactions spread over many rounds.
  2. After step 2, any account calls `factory.deleteWallet(daoWallet, attacker)`. The DAO wallet's ALGO is closed to the attacker. `closeOutWallet(daoWallet, [{assetCloseTo: attacker, xferAsset}])` does the same for its ASAs, and `factory.delete(attacker)` takes the factory's balance.
  3. The same works for any user wallet that kept the default `allowed=true`. The attacker first calls `factory.updateWallet(userWallet)` (no check, and the wallet accepts because the sender is the factory), then calls `deleteWallet` or `closeOutWallet` with their own close-to address.
  4. Even before step 2, once step 1 has replaced the `bc` child box with `SunsetContract`, anyone can call the live factory's `updateWallet` on any wallet with `automatic=true` (the default). That turns user wallets into `SunsetContract`. Their app-address funds then belong to whoever passes `auth()` (the factory or `SUNSET_CALLER` = deployer). Wallets with an external controlled EOA are frozen permanently, because the EOA stays rekeyed to an app that can no longer sign for it.
  5. Griefing variant: `deleteBoxedContract()` can be called by anyone. In `sunset-cleanup.ts` the DAO app is deleted (step 4) before the DAO wallet is updated (step 5). Deleting `bc` in between leaves the DAO wallet stranded with a deleted admin.
- **Suggested fix:**
  - Add a creator/`SUNSET_CALLER` `auth()` to every `WalletFactorySunsetContract` method.
  - Pin the only wallet it may touch (the DAO wallet ID) and the close-to address as template variables or create-time state.
  - Never stage `SunsetContract` in the live factory's `bc` box. Alternatively, stage the child and swap the factory approval atomically in one group, so the general-purpose `updateWallet` can never push it into user wallets.
  - Add hostile-caller tests for every factory-sunset method.

### F2: Any wallet can lock or drain the Revenue Manager app balance, because the plugin pays all box and receiver opt-in MBR itself (DoS on DAO revenue disbursement)
- **Severity:** Medium. **Confidence:** Confirmed.
- **Location:**
  - `arc58/plugins/revenue-manager/contract.algo.ts:257-268` (`escrows` and `splits` boxes, no payment) and `299-312` (`splitRefs`)
  - `:224` and `:375` (`managedAssets` boxes; the `mbrPayment` in `optIn` only funds the escrow's ASA MBR)
  - `:504` (`receiveAssets` boxes)
  - `:480-482` together with `utils/functions.ts:405-408` (`arc58OptInAndSend` pays `assetOptInMinBalance` from the RM app account to the receiver's origin)
  - `:55-68` (`validateWallet` accepts any factory-created wallet)
  - `arc58/account/contract.algo.ts:1118-1135` (`_addPlugin` has no plugin allowlist)
  - `scripts/deploy-revenue-manager-plugin.ts:607-612` (RM is funded with 1 ALGO)
- **Description:** Every RM write is funded from RM's own app account. `validateWallet` only checks that the wallet was created by the factory, and anyone can create a wallet and install RM on their own escrow.
- **Exploit scenario:**
  - **Lock:** the attacker creates wallet W1 and an escrow, installs RM, and calls `newReceiveEscrow` or `migrateReceiveEscrow` repeatedly, each with up to 10 splits, plus `optIn` on many ASAs. The escrows, splits and managedAssets boxes have no delete path, so RM's free balance is locked permanently at the cost of fees only.
  - **Drain:** with splits that point to the attacker's wallet W2 (global optin plugin installed), each `processEscrowAllocation` makes RM pay 0.1 ALGO to W2's origin for every managed ASA that W2 is not opted into. W2 opts out after each daily cycle and the ALGO comes back, so the cycle repeats.
  - **Impact:** once RM's free balance is gone, DAO `processEscrowAllocation` fails, because it must create `receiveAssets` boxes and pay receiver opt-in MBR. DAO revenue distribution halts. Top-ups can be absorbed again the same way.
- **Suggested fix:**
  - Require an MBR payment, bound to the actor, for every persistent box. Refund it on a new delete path.
  - Fund receiver opt-ins from the escrow being disbursed, not from RM.
  - Optionally, limit `newReceiveEscrow`, `newReceiveEscrowWithRef` and `migrateReceiveEscrow` to the DAO wallet (`getDAOARC58Wallet(akitaDAO)`).

### F3: A Revenue Manager cycle can be frozen permanently by one split receiver (and is always frozen for named-escrow receivers that are not opted in)
- **Severity:** Medium. **Confidence:** Confirmed.
- **Location:** `revenue-manager/contract.algo.ts:420-423, 436-447, 477-482, 507-510`; `utils/functions.ts:391-431`; `optin/contract.algo.ts:8-9`.
- **Description:** Once `startEscrowDisbursement` sets the phase to Allocation, the escrow can only return to Idle after every managed asset plus ALGO has been processed. There is no abort or reset method, and no method to edit or delete splits. Processing an ASA for a receiver that is not opted in calls `arc58OptInAndSend`, which fails in two ways:
  - It pays the MBR to the receiver wallet's origin (`controlled_address`). When `receiver.escrow !== ''`, the optin plugin's spending account is the escrow address, so `mbrPayment.receiver === sender` fails.
  - It requires the receiver wallet to hold a Global optin grant for that escrow.
  - Separately, `validateWallet` is not a code-integrity check: wallet admins can replace their own wallet's code (`account/contract.algo.ts:813-822`), and a replaced wallet can simply revert the `arc58_getEscrows` or `arc58_rekeyToPlugin` call.
- **Exploit scenario:**
  1. A third-party split receiver opts out of a managed ASA and removes its global optin grant, or self-upgrades its wallet.
  2. The next permissionless `processEscrowAllocation` that includes that ASA reverts.
  3. `allocationCounter` can never reach `optinCount+1`, so `finalizeEscrowDisbursement` is unreachable. The escrow never returns to Idle, and future cycles (including ALGO) stop for good.
  4. The same happens without any malice for any split that targets a named escrow which is not already opted in.
  5. Recovery needs a DAO app upgrade or a plugin replacement and migration.
- **Suggested fix:**
  - Pay the opt-in MBR to the receiver's spending account (the escrow address when an escrow is set).
  - Skip a failing receiver instead of reverting (for example by rolling its share into the remainder), or route undeliverable ASA shares to ARC-59 (`arc59OptInAndSend`).
  - Add a DAO-only abort/reset and a split edit/delete method.

### F4: NFD `autoRenew` pays to renew any valid NFD, not only NFDs the wallet owns
- **Severity:** Medium. **Confidence:** Likely (depends on NFD `renew` accepting payment from non-owners, which NFD supports for gift renewals; not verifiable on LocalNet mocks).
- **Location:** `arc58/plugins/nfd/contract.algo.ts:425-460`.
- **Description:** `autoRenew` only checks that `appId` is registry-valid and that its expiration is within 30 days (including any NFD that has already expired). It never checks that the NFD's owner is the wallet's spending account. The method only makes sense as a keeper or Global grant (the owner would just call `renew`).
- **Exploit scenario:** a wallet grants `autoRenew` to a Global or keeper caller. The caller repeatedly calls `autoRenew(wallet, true, <any third-party NFD near expiry>)`. Each call spends `getRenewPrice()` ALGO from the wallet on someone else's NFD. Many such NFDs exist on MainNet, so the wallet can be drained up to its balance or allowance.
- **Suggested fix:** read the NFD owner global (for example `i.owner.a`) and assert it equals `sender`. Optionally, cap the price.

### F5: Plugins accept any app as `wallet`, so a spoofed wallet can spend the plugin app account's own funds
- **Severity:** Low. **Confidence:** Confirmed (impact limited to value held by plugin app accounts).
- **Location:** every in-scope plugin that uses `getSpendingAccount(wallet)` without `controls(sender)` or `validateWallet`:
  - `pay/contract.algo.ts:7-34`
  - `nfd/contract.algo.ts` (all methods)
  - `asa-manager/contract.algo.ts:18-83`
  - `haystack-router/contract.algo.ts:183-200`
  - `optin`, `self-optin`, `asset-inbox`, `sunset` plugin
  - `test-close-out`, `test-proxy-rekey`
  - Base library: `projects/akita-plugin/functions.ts:16-22`; the `controls()` helper at `:132` exists but these plugins never call it.
- **Description and exploit:** an attacker deploys an app whose global `spending_address` equals the plugin's own app address, then calls the plugin directly with that app as `wallet`. Inner transactions from the plugin's own address are always authorized. For example, `PayPlugin.pay(fake, false, [{receiver: attacker, asset: 0, amount: X}])` sends any ALGO or ASA above MBR that sits on the Pay plugin account to the attacker. NFD, Haystack and the others can likewise spend their own balances. Welcome is not affected (line 83 checks `authAddress`), and RM is not affected (`controls()` plus `validateWallet`).
- **Suggested fix:** in the shared helper, assert `sender.authAddress === Global.currentApplicationAddress`. Make `getSpendingAccount` fail closed when that is false.

### F6: SunsetContract `deleteBoxes` is unauthenticated
- **Severity:** Low. **Confidence:** Confirmed (intentional per tests, but undocumented in the threat model).
- **Location:** `sunset/contract.algo.ts:26-30` (and `wallet-factory.algo.ts:109-113`).
- **Description:** once any app is updated to `SunsetContract`, anyone can delete any of its boxes. The freed MBR stays in the app and the destination is still authorized, so there is no direct theft. However, the box deletes can be raced against the scripted order, which can make scripted steps fail. For the factory variant, see the `deleteBoxedContract` grief in F1.
- **Suggested fix:** gate it with `auth()`.

### F7: Empty-batch rejection that CONTRACT_AUDIT says exists is not implemented
- **Severity:** Info. **Confidence:** Confirmed.
- **Location:** `optin/contract.algo.ts:7-25`, `self-optin/contract.algo.ts:7-44`, `pay/contract.algo.ts:7-34`, `pay-silo/contract.algo.ts:16-43`, `asa-manager/contract.algo.ts:18-83`. None of these assert `length > 0`.
- **Description:** this is not exploitable. An empty batch with `rekeyBack=true` leaves the account rekeyed to the plugin, and `arc58_verifyAuthAddress` (account/contract.algo.ts:952) then reverts the whole group. Still, the documented on-chain invariant ("Critical | Wallet plugins | ... Reject empty batches on-chain") does not match the code.
- **Suggested fix:** add `loggedAssert(x.length > 0)` or correct the document.

### F8: Test-only plugins ship as SDK clients; TestProxyRekey rekeys to a caller-supplied app
- **Severity:** Info. **Confidence:** Confirmed.
- **Location:** `test-proxy-rekey/contract.algo.ts:35-51` (rekeys the spending account to `payPlugin.address`, an arbitrary argument, before calling it); `test-close-out/contract.algo.ts:18-61` (arbitrary `closeRemainderTo` and `assetCloseTo`); `projects/akita-sdk/src/generated/Test{ProxyRekey,CloseOut}PluginClient.ts`.
- **Description:** no deploy or install script uses these plugins. Any wallet that installs one grants an authorized caller full drain. With TestProxyRekey, a malicious "payPlugin" can empty the account and rekey it back to the wallet, which passes `verifyAuthAddress`.
- **Suggested fix:** exclude both from the SDK's generated or exported clients and from production artifact catalogs.

### F9: Haystack plugin enforces no economic bound, and some router calls are not validated
- **Severity:** Info. **Confidence:** Confirmed (design note).
- **Location:** `haystack-router/contract.algo.ts:65-95, 88`.
- **Description:**
  - `minOutputAmount` is chosen by the caller and only checked for equality with the router argument. A non-owner Haystack grant is therefore spend authority over the input amount (it can set `min=1` and route through manipulated pools).
  - Router calls whose selector differs from `routerMethod`, and router calls placed before the plugin call, are skipped and never validated.
  - The safety of these choices depends on router semantics that are not modeled on-chain.
- **Suggested fix:** grant only to the owner, or add an allowance-style output floor (oracle or stored max slippage).

---

## Checked and OK

- **Rekey-back placement:** every in-scope plugin path puts `rekeyAddress(rekeyBack, wallet)` on the final inner txn, or calls `rekeyBackIfNecessary` last:
  - RM `optIn`, `new*`, `migrate`, `start`, `process`, `finalize`
  - every NFD method (the read-only `getRenewPrice` call has no rekey)
  - Haystack final reimbursement
  - asset-inbox (the opt-in comes before the claim/rekey)
  - Welcome (rekey on the factory call for ALGO gifts, on the final axfer for ASA gifts)
  - sunset plugin
  - batch plugins (rekey only on index `len-1`)
- **No rekey to an attacker-controlled address in production plugins.** Only the test-only TestProxyRekey does this (F8).
- **Cross-wallet action within a group:** blocked. `assertValidGroup` forces all plugin calls in the window to carry this wallet's ID, and AVM forbids re-entrancy into the plugin from apps it calls (RM receiver wallets, NFD apps, routers).
- **RM cross-wallet aliasing:**
  - `controls(sender)` plus `sender === namedEscrowAddress` prevents a self-upgraded attacker wallet from aliasing the DAO escrow.
  - `receiveAssets` is keyed by the escrow address, and `managedAssets` by (wallet, escrow, asset).
  - Duplicate IDs within a batch are rejected (the box is created per iteration).
  - Counters are bounded, so there is no underflow in `finalize`.
- **RM split math:**
  - Percentages use `mulw`/`divw` (no overflow).
  - The final percentage receives the exact remainder, and `amount <= remaining` is asserted.
  - Flat splits require a trailing remainder.
  - Referenced splits are re-validated every cycle.
  - At most 10 splits.
- **RM `optIn` authorization:** the rekey initiator must equal the stored `source`, or the caller must be an app created by `source`. The escrow must be Idle.
- **Opt-in plugins:** the MBR payment receiver is bound to the spending account and the amount is exact (optin). Duplicates in a batch fail. Self-optin `optOut` requires a zero balance and closes to the asset creator (never to a caller-chosen address).
- **Pay-silo:** the recipient is fixed at creation and the plugin has no update path. The factory creates silos from the wallet's spending account.
- **ASA Manager:** the creation MBR payment is exactly bound to the spending account.
- **Asset Inbox:** the ARC-59 router is pinned at creation. Claims and claimAlgo always pay the spending account (`Txn.sender`). Reject returns the asset to the creator according to ARC-59.
- **Welcome:**
  - The factory is pinned.
  - It requires `sender.authAddress == this app`.
  - The cost is quoted from the same payer and capped by `maxCost`.
  - Inner fees are 0.
  - Public sponsorship as a subsidy is documented.
- **Haystack:**
  - The router app and selector are pinned.
  - The funding txn must be unique, must not use a close-to, a clawback sender or a rekey, and must come before finalize.
  - Beneficiary, referrer, output asset and minOutput are bound.
  - The inner reimbursement fee is 0.
- **NFD:** the target app is validated against the pinned registry through `isValidNfdAppId(name, appId)`. The sale price is read from NFD state.
- **SunsetContract:** `delete`, `closeOut`, `deleteAssets`, `deleteEscrows` and `reclaimWalletEscrows` are gated by creator or `SUNSET_CALLER` (pinned to the deployer in the scripts).
- **Sunset plugin:** the close destination is chosen by the caller, but the plugin is installed under DAO execution-key authority. The target must accept the spending account as creator or `SUNSET_CALLER`.
- **Unbounded loops:** all loops are bounded by argument arrays (and therefore by the opcode budget) or by splits (≤10).
