# Algorand protocol constraints and DeFi ecosystem for a unified on-chain finance kernel (as of 4 Nov 2026)

Scope: the exact AVM and protocol limits that constrain a kernel in which pools and ARC-58 wallets are accounts, modules act inside one atomic group (possibly through a "flash rekey" of an escrow), and a final settle call checks every touched account. Also: the DeFi venues, oracles and stablecoins the kernel would plug into.

Status of the network on the research date: MainNet runs go-algorand 5.x. Consensus v42 (AVM 13) shipped in go-algorand v5.0.0-stable (12 Aug 2026). Consensus v43 (fix-only, still AVM 13) shipped in v5.0.4-stable (20 Oct 2026). Latest node release is v5.0.5-stable (28 Oct 2026, no protocol upgrade). — [go-algorand releases](https://github.com/algorand/go-algorand/releases)

Caveat on "activated" vs "released": a consensus version activates only after the upgrade vote plus a delay of 208,000 rounds (about 7 days). I did not confirm the exact MainNet activation round of v43. If the vote started on release, v43 is live or about to be live in early November 2026. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)

---

## 1. Program size, extra pages, opcode budget, op-up

### Takeaway
Since consensus v42 (AVM 13, Aug 2026) an app can have up to 7 extra pages: 8 pages x 2,048 bytes = 16,384 bytes for approval + clear together. Only bytes above the old 8,192-byte limit pay a per-byte fee surcharge, and only in the create/update transaction. The opcode budget stays at 700 per app call, pooled across the group, plus 700 per inner app call.

### Cited Findings
- `MaxAppProgramLen = 2048` (set in v28; was 1024 in v24). `MaxExtraAppProgramPages = 3` (v28). These give the "basic" limit of 2,048 x (1 + 3) = 8,192 bytes. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- v42 sets `MaxAbsoluteExtraProgramPages = 7` with the comment "Allow larger programs with extra fees". The field comment: "the absolute maximum number of extra pages allowed, even with extra fees paid. Provides DoS protection." — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- One extra page adds 2,048 bytes total, shared between approval and clear ("An ExtraProgramPages of 1 means 2048 more total bytes, or 1024 for each program"). — local `node_modules/@algorandfoundation/algorand-typescript/op.d.ts` line 1049 (pinned v1.3.1)
- Fee surcharge for large programs: `LargeProgramExtraBytes = max(0, totalProgramSize - MaxAppTotalProgramLen*(1+MaxExtraAppProgramPages))`, that is, bytes above 8,192 in approval + clear carried by the transaction. Each such byte adds `PerByteTxnSurcharge` to the fee factor. — [application.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/application.go)
- v42 sets `PerByteTxnSurcharge = 100` with the comment "Each charged byte adds 0.000100 of min fee". The unit is `basics.Micros` (millionths), and the base fee factor is `1e6`. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [transaction.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/transaction.go); [units.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/basics/units.go)
- The same surcharge applies to notes above `MaxTxnNoteBytes` (up to `MaxAbsoluteTxnNoteBytes = 4096`, v42) and app args above `MaxAppTotalArgLen` (up to `MaxAbsoluteTotalArgLen = 16384`, v42). — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [application.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/application.go)
- v42 `AppSizeUpdates = true`: "allows application update transactions to change the extra-program-pages and global schema sizes." AVM 13 adds the app field `AppSizeSponsor`: "If non-zero, this account is responsible for the app's extra pages and global state balance requirement." — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/); local `op.d.ts` line 369-372
- v43 `CloseRequiresBaseMinBalance = true`: an account can close only if its MBR is exactly the base MinBalance. Reason in the comment: `AppSizeUpdates` let an account hold MBR "for global state and extra pages of apps it neither created nor opted into." — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- Go-algorand 5.0.0 release notes: "Big transactions: larger transactions (notes up to 4KB, up to 7 extra program pages, larger LogicSigs) priced via a per-byte fee surcharge, with simulate reporting fee usage". — [v5.0.0-stable](https://github.com/algorand/go-algorand/releases/tag/v5.0.0-stable)
- `MaxAppProgramCost = 700` (v24). From AVM v4 the cost is tracked dynamically. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- Pooling (AVM v5+): for n app calls in a group, total cost must not exceed n x 700. Inner calls (AVM v6+): each inner group submitted with `itxn_submit` "increases the pooled budget by MaxAppProgramCost" per inner app call. — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- LogicSig budget: 20,000 per transaction, pooled across the group (20,000 x group size). A single LogicSig can be up to 16,000 bytes with the per-byte fee (`MaxAbsoluteLogicSigProgramSize 16000`, v40). — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/); [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- Stack: max depth 1000; max byte value 4,096 bytes; 256 scratch slots. — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/); [eval.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/logic/eval.go)
- The pinned PuyaTs exposes `Global.opcodeBudget` (remaining budget) for op-up loops. — local `op.d.ts` line 1191

### Inferences
- The Plugin DEX Vault (14,227 bytes) already relies on v42 pages 4-7. The 16,384-byte ceiling is a hard consensus cap (`MaxAbsoluteExtraProgramPages`), not a fee choice. Headroom is 2,157 bytes, including the clear program.
- Surcharge arithmetic (my calculation from the cited code): a full 16,384-byte app has 8,192 surcharged bytes x 100 micros = 0.8192 of a min fee, about 819 microAlgo extra at the 1,000 microAlgo min fee, on create or update only. Normal calls do not carry program bytes, so they pay no surcharge. For the Vault (14,227 + clear) it is about 605 microAlgo per deploy/update.
- Program MBR: each extra page is commonly documented as adding `AppFlatParamsMinBalance` (100,000 microAlgo) to the creator's MBR, so 7 pages add 0.7 ALGO. I did not re-read that formula in this session (see Gaps).
- Op-up pattern in this environment: one top-level group can contain at most 16 app calls (11,200 budget). Each inner app call (for example to a no-op "op-up" app, or a self-call) adds 700 and costs one min fee (pooled from the outer fee). With 256 inner transactions per group, the theoretical ceiling is about 16 x 700 + 256 x 700 = 190,400, but every inner call consumes inner-txn slots that the kernel also needs for transfers.

### Gaps
- Exact MBR formula for extra pages (`AppFlatParamsMinBalance x (1 + ExtraProgramPages)`) was not re-verified against the ledger code in this session.
- Whether a `vFuture` change raises `MaxAbsoluteExtraProgramPages` above 7: the vFuture block (fetched) does not change it, so no larger programs are planned in current master.

---

## 2. Group size, inner transactions, call depth, logs

### Takeaway
16 top-level transactions per group; 256 inner transactions per group (16 per top-level txn, pooled); inner app-call depth 8; 32 log calls and 1,024 total log bytes per program execution.

### Cited Findings
- `MaxTxGroupSize = 16` (since v18). — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- `MaxInnerTransactions = 16` (v30) and `EnableInnerTransactionPooling = true` (v31). The group-wide bound is 16 x 16 = 256 inner transactions ("Before EnableInnerTransactionPooling, MaxInnerTransactions was the amount allowed in a single txn"). — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [eval.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/logic/eval.go)
- `maxAppCallDepth = 8`: "the limit on inner appl call depth ... 0 would prevent inner appls". — [eval.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/logic/eval.go)
- `maxLogCalls = 32` ("the limit of total log calls during a program execution"); `MaxEvalDeltaTotalLogSize = 1024` ("maximum size of the sum of all log sizes in a single eval delta"). The `log` opcode fails past MaxLogCalls or when logged bytes exceed 1,024. — [eval.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/logic/eval.go); [bounds.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/bounds/bounds.go); [opcodes](https://dev.algorand.co/reference/algorand-teal/opcodes/)
- Apps must be AVM v4 or greater to be called in an inner transaction. — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)

### Inferences
- The kernel's settle call has 1,024 bytes of logs. ARC-28 events for many touched accounts must be compact (for example one packed summary event), or be emitted by the module calls instead of by settle.
- Each inner app call level counts against depth 8. A path such as wallet plugin -> kernel -> module -> pool -> token-app already uses 4 levels.

### Gaps
- None material.

---

## 3. References, access lists, boxes, global/local state

### Takeaway
Classic foreign arrays allow 8 references of each type with 8 total per transaction. The `txn.Access` list (consensus v41, usable by AVM v9+ programs) allows 16 explicit entries, including cross-products. Resources are shared group-wide (AVM v9+). Boxes: up to 32,768 bytes, 8 box refs per txn, 2,048 bytes of I/O budget per box ref (v41). AVM 13 adds cross-app box access.

### Cited Findings
- v41 "txn.Access work": `MaxAppTxnAccounts = 8` (was 4), `MaxAppAccess = 16` ("Twice as many, though cross products are explicit"), `BytesPerBoxReference = 2048` (was 1024; "Count is more important that bytes, loosen up"). — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- `MaxAppTxnForeignApps = 8`, `MaxAppTxnForeignAssets = 8` (v28); `MaxAppTotalTxnReferences = 8` (v24); `MaxAppBoxReferences = 8` (v36). — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- "v9 and later applications may use the txn.Access list instead of the foreign arrays." A pre-v9 program "cannot be invoked with tx.Access". — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/); [eval.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/logic/eval.go)
- "In v9 and later applications, there is group-level resource sharing." Holdings and locals are available if both components are available. A box is available if any transaction in the group references it. — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- Box I/O budget: `BytesPerBoxReference` is "Amount added to a txgroup's box I/O budget per box ref supplied. For reads: the sum of the sizes of all boxes in the group must be less than I/O budget". — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- `MaxBoxSize = 32768`, `BoxFlatMinBalance = 2500`, `BoxByteMinBalance = 400` (all v36). Box opcodes fail in a ClearStateProgram. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- State: `MaxAppKeyLen = 64`, `MaxAppBytesValueLen = 128`, `MaxAppSumKeyValueLens = 128`, `MaxGlobalSchemaEntries = 64`, `MaxLocalSchemaEntries = 16`. MBR: `SchemaMinBalancePerEntry = 25000`, `SchemaUintMinBalance = 3500`, `SchemaBytesMinBalance = 25000`; `AppFlatParamsMinBalance = 100000`, `AppFlatOptInMinBalance = 100000`, `MinBalance = 100000`. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- v42 `AllowZeroLocalAppRef = true` (no description fetched). — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- AVM 13 cross-app boxes: `app_box_create/del/extract/get/len/put/replace/resize/splice` act on another app's box. Access needs the box to be available and permitted by the owner. `AppForeignBoxReads` "permits any application to read its boxes, and grants no other access." `AppFamilyBoxAccess` "permits applications with the same creator address to read and write its boxes." An app sets these on itself with `app_params_set`. "Any operation except a read therefore fails if a non-family application" sits between family members on the call stack. — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/); [opcodes](https://dev.algorand.co/reference/algorand-teal/opcodes/)
- The pinned PuyaTs (algorand-typescript 1.3.1) exposes these as `AppBox.*`, `AppParamsSet.appForeignBoxReads/appFamilyBoxAccess`, and `AppParams.appVersion/appSizeSponsor/appForeignBoxReads/appFamilyBoxAccess` (all "Min AVM version: 13"). — local `op.d.ts` lines 144-394

### Inferences
- Box MBR = 2,500 + 400 x (key length + value length) microAlgo (standard formula, consistent with the cited constants). A 32-byte key + 128-byte value box costs 66,500 microAlgo.
- With 16 txns x 8 box refs = 128 box refs per group, the group box I/O budget is up to 262,144 bytes. Extra box refs can come from empty "reference-only" app calls, but each uses a group slot.
- With 16 txns x 16 access entries, a group can name up to 256 resources. A settle call that must check "every touched account" needs each account and each (account, asset) holding available somewhere in the group.
- Family box access lets a kernel and its modules (same creator) read and write one shared ledger of boxes directly, instead of passing data through inner calls. The risk: any future app by the same creator also gets write access. The creator account must be a locked deployer (for example an app that cannot deploy arbitrary code).

### Gaps
- Exact semantics of the "family" check when the creator is an app (factory) versus an EOA were not verified.
- Whether `app_box_*` against another app consumes the group box I/O budget in the same way was not verified.

---

## 4. Group introspection and the "settle last" pattern

### Takeaway
`gtxn`/`gtxns` read fields of any transaction in the current group, including later ones. `gload`/`gloads` (scratch) and `gaid` (created IDs) only work on earlier transactions. So a first "open" call can require that the last group transaction is a settle call to the kernel. Inside an inner group, these opcodes see only the inner group.

### Cited Findings
- `gload`: "fails unless the requested transaction is an ApplicationCall and T < GroupIndex". `gloads`: same with A < GroupIndex. `gaid`/`gaids`: "fails unless the requested transaction created an asset or application and T < GroupIndex". — [opcodes](https://dev.algorand.co/reference/algorand-teal/opcodes/); local `op.d.ts` line 746
- `gtxn`/`gtxns` ("field F of the Tth transaction in the current group") carry no T < GroupIndex note. — [opcodes](https://dev.algorand.co/reference/algorand-teal/opcodes/)
- "Application calls may inspect the final scratch space of earlier application calls in the same group." — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- go-algorand 5.0.0 fixed "Eval: handle error in gload of a txn that didn't run a program". — [v5.0.0-stable](https://github.com/algorand/go-algorand/releases/tag/v5.0.0-stable)
- Inner groups get their own eval params: `NewInnerEvalParams` "creates an EvalParams to be used while evaluating an inner group txgroup" with `TxnGroup: txg`. `gitxn`/`gitxna` read the last inner group submitted. — [eval.go](https://raw.githubusercontent.com/algorand/go-algorand/master/data/transactions/logic/eval.go); [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- Logs of a group transaction are readable as txn fields `Logs` and `LastLog` (AVM v5/v6; "only with itxn in v5"). — local `op.d.ts` lines 1058-1082
- `Global.callerApplicationId` / `callerApplicationAddress` (0 when top-level) are available. — local `op.d.ts` lines 1196-1201
- v41 `EnableAppVersioning`: the app version "autoincrements ... when the app is updated, careful callers may avoid making inner calls to apps that have changed." AVM 12 adds the txn field `RejectVersion` ("Application version for which the txn must reject") and the app field `AppVersion`. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/); local `op.d.ts` lines 364-367, 1109-1112

### Inferences
- "Settle last" works at top level: in the open call, assert `gtxn[GroupSize-1].ApplicationID == kernel` and its method selector is `settle`. Group atomicity guarantees settle runs; if settle fails, the whole group reverts.
- Data flow is one-way: earlier calls can leave state for settle through final scratch (`gloads`), logs (`gtxn Logs`), or boxes. Settle cannot push data back to earlier calls. Open cannot read the scratch of later calls.
- A module called by the kernel through an inner txn cannot see the outer group. If a third-party app calls the kernel in an inner group, the kernel's "last txn is settle" check refers to that inner group. The kernel must decide whether to allow inner-group sessions (check `callerApplicationId`) and enforce settle in the same group level.
- Gtxn checks only bind transaction fields, not execution results. Settle must verify final balances itself; it cannot trust that an earlier txn "did the right thing".
- `RejectVersion` lets the kernel (or a user's group) pin the exact module version it was audited against. This defends against a module upgrade between quote and execution.

### Gaps
- I found no primary-doc sentence that explicitly says "gtxn may access later transactions". The inference rests on the contrast with the explicit T < GroupIndex rule for gload/gaid (and long-standing practice). Confirm on LocalNet with one test.
- Whether `gloads` can read the scratch of an inner app call (as opposed to a top-level one) was not confirmed. Assume it cannot.

---

## 5. Transient storage and passing state between calls

### Takeaway
The AVM has no transient (per-group, auto-cleared) storage. Options are: final scratch read with `gloads` (earlier -> later, top-level only), logs read with `gtxn`, global state (128-byte k+v), and boxes that are created in the group and deleted at settle (MBR is paid and refunded in the same group).

### Cited Findings
- Scratch space is 256 slots per program execution; later app calls can read the final scratch of earlier app calls. — [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- Box MBR constants: 2,500 flat + 400 per byte. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- Global state values: max key 64, max value 128, key + value <= 128. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)

### Inferences
- A "session box" pattern (create at open, delete at settle) is the closest thing to transient storage. The payer must front the MBR inside the group; deletion refunds it to the app account, not to the payer, so the kernel must pay it back explicitly.
- A crashed group leaves no trace (atomic), so a session box never leaks across groups. A session box that settle forgets to delete stays and blocks the next session; settle must always delete or reset it.
- Global-state "session" slots are cheaper than boxes but limited to 64 entries and 128 bytes each.

### Gaps
- No vFuture or AVM 14 transient-storage proposal was found in consensus.go master.

---

## 6. Rekeying, close-to, opt-in/opt-out, freeze and clawback

### Takeaway
An account can be rekeyed to an app address; the app then signs for it through inner transactions. The module can rekey back in the same group, and settle can check `AcctParams.acctAuthAddr`. ASA freeze and clawback powers override any rekey, so they are a direct risk to collateral in user accounts.

### Cited Findings
- `acct_params_get AcctAuthAddr` ("Address the account is rekeyed to", AVM v6) and `AcctMinBalance` are available in the pinned PuyaTs. — local `op.d.ts` lines 66-75
- v42 `EnforceAuthAddrSenderDiff = true`: "requires that AuthAddr must be empty or different from Sender". — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- v43 `CloseRequiresBaseMinBalance`: closing (CloseRemainderTo) is allowed only when the MBR is exactly the base MinBalance. go-algorand 5.0.4 also notes "eval: refuse to assemble a close-out that still requires a minimum balance". — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [v5.0.4-stable](https://github.com/algorand/go-algorand/releases/tag/v5.0.4-stable)
- Global `assetOptInMinBalance` and `assetCreateMinBalance` (AVM v10) report the opt-in and create MBR. — local `op.d.ts` lines 1206-1211; [AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/)
- `itxn_begin` initializes Sender to the application address; an inner txn can use another Sender only if that account's auth address is the app. — local `op.d.ts` line 1955

### Inferences
- Flash-rekey flow: (1) the escrow's controller rekeys the escrow to the module app address; (2) the module moves funds with inner txns (Sender = escrow); (3) the module's last inner txn sets `RekeyTo` = the original controller; (4) settle asserts `acctAuthAddr(escrow) == controller` and the balance invariants. If step 3 is missing, settle fails and the group reverts.
- `EnforceAuthAddrSenderDiff`: a rekey back to the account's own address must clear the auth address rather than store it. Rekey-back code should rekey to the controller (an app address), not to the escrow itself, or rely on the protocol clearing it. Verify the exact behavior on LocalNet.
- A rekeyed escrow can also be closed by the module (`CloseRemainderTo`, `AssetCloseTo`). Settle must check that the escrow still exists and still holds each required opt-in, not only that its auth address is restored.
- ASA clawback: the clawback address can move tokens out of any holding, and the freeze address can freeze a holding, independent of rekeys and of the kernel. Collateral in an ASA with active clawback or freeze can disappear or become unliquidatable. This is standard ASA semantics (see Gaps for the source).
- Collateral kept in a user-controlled ARC-58 wallet is not locked between groups: the wallet admin can spend or rekey it in a later group. A lending or perps module needs collateral in an escrow that only the kernel (or a kernel-approved plugin) can move, or the kernel must re-check health in each group that touches the account.

### Gaps
- I did not fetch the ASA spec page this session; the clawback/freeze override semantics come from protocol knowledge. Source to cite: [ASA docs](https://dev.algorand.co/concepts/assets/overview/).
- The precise effect of `EnforceAuthAddrSenderDiff` on a `RekeyTo = Sender` transaction was not confirmed.

---

## 7. Block time, finality, fees, simulate, 2025-2026 upgrades

### Takeaway
Rounds are about 2.8-2.9 s with dynamic round times. Finality is immediate (no forks). Min fee is 1,000 microAlgo; v42 adds per-byte surcharges and load tracking in block headers. `dryrun` was removed in 5.0; `simulate` is the only pre-execution tool. Staking rewards (v40), access lists and app versioning (v41), and AVM 13 / Falcon / big transactions (v42) are the main 2025-2026 changes.

### Cited Findings
- `AgreementFilterTimeoutPeriod0 = 3000 ms` (v38; was 3400 ms in v34); `DynamicFilterTimeout = true` (v39). Upgrade-delay comments use "2.9 ballpark round times". — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- A secondary aggregator says dynamic round times cut block time to 2.8 seconds. — [CoinMarketCap summary](https://coinmarketcap.com/cmc-ai/algorand/latest-updates) (secondary; treat with caution)
- `MinTxnFee = 1000`, `MaxTxnLife = 1000` rounds. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- v42 `LoadTracking = true`: "enables header values that track Load that grows/shrinks when blocks are more/less than half full." The fetched code does not show that Load feeds into the fee yet. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- v40 (staking rewards): `Payouts.Enabled = true`, `Percent = 50` (of block fees to proposer), `GoOnlineFee = 2,000,000`, `MinBalance = 30,000 ALGO`, `MaxBalance = 70,000,000 ALGO`, `Bonus.BaseAmount = 10,000,000`, `Bonus.DecayInterval = 1,000,000`, `Heartbeat = true`. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- v41 (go-algorand 4.3.0 era): LogicSig version 12, app versioning, SHA-512 block hash, access lists. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go); [4.3.0 forum post](https://forum.algorand.co/t/mainnet-and-testnet-update-go-algorand-4-3-0/14930)
- v42 / go-algorand 5.0.0 (12 Aug 2026): Falcon-1024 PQ accounts and delegated LogicSigs, big transactions with per-byte pricing, up to 7 extra pages, AVM 13 (`poseidon2`, `sha512`, `app_params_set`, foreign box opcodes, variable-length branches, auto-salting of v13 programs), removal of `dryrun` and `tealdbg`, "Big transactions simulate fee usage", "AVM: report actual inner group fee shortfall". — [v5.0.0-stable](https://github.com/algorand/go-algorand/releases/tag/v5.0.0-stable)
- v43 / go-algorand 5.0.4 (20 Oct 2026): `CloseRequiresBaseMinBalance`. — [v5.0.4-stable](https://github.com/algorand/go-algorand/releases/tag/v5.0.4-stable)
- vFuture (not scheduled): LogicSig/AVM version 14, Falcon-512 and Ed25519 sig schemes (`EnableSigSchemeFalcon512`, `EnableSigSchemeEd25519`, `EnableSigSchemeLogicSig`), `RequireLogicSigArgAccess`, `AllowGroupedHeartbeats`. No larger programs, no new group limits. — [consensus.go](https://raw.githubusercontent.com/algorand/go-algorand/master/config/consensus.go)
- Pinned PuyaTs (algorand-typescript 1.3.1, puya-ts 1.3.1) has opcodes through AVM 13 (16 v13 entries: `AppBox.*`, `AppParamsSet`, new `AppParams` fields, `poseidon2`, `sha512`) and one AVM 14 entry (`sumhash512`, "Min AVM version: 14"). Other notable ops present: `EllipticCurve.*` (BN254/BLS12-381), `mimc`, `falconVerify` (v12), `ecdsa*`, `onlineStake`, `VoterParams`, `Block`. — local `op.d.ts` (counts from `grep "Min AVM version"`)
- Third-party coverage of 5.0 ("doubles app sizes, expands transaction limits") reports a muted market response. — [blockchain.news](https://blockchain.news/news/algorand-5-0-expands-app-transaction-limits)

### Inferences
- With ~2.8 s rounds and instant finality, a kernel can treat a confirmed group as final. Oracle staleness windows can be expressed in rounds (about 21 rounds per minute).
- Op-up and fee pooling: every inner txn needs a fee (pooled from overpayment by the outer txns). A kernel group with many inner calls must set the outer fee high enough; simulate now reports actual fee needs and inner-group shortfall.
- The `sumhash512` v14 op is in the typings but not on MainNet; do not use it.

### Gaps
- Congestion fee mechanics (fee-per-byte under load) were not re-verified this session.
- P2P networking status (hybrid relays / P2P mode) was not researched; I found no 2026 primary source in the time available.
- Exact `simulate` options (extra opcode budget, allow-unnamed-resources, exec trace) were not re-fetched.

---

## 8. Algorand DeFi TVL, volume and largest protocols

### Takeaway
Algorand DeFi is small and shrinking: DefiLlama chain TVL is about $30.8M (4 Nov 2026), down from $134.9M on 1 Jan 2025. 30-day DEX volume is about $11.9M, and Tinyman has about 69% of it. The largest non-CEX TVL sits in RWA (Lofty), staking pools (Reti) and liquid staking (xALGO), not in trading.

### Cited Findings
- Chain TVL: $30,769,612 (about rank 48 of all chains). — [DefiLlama chains API](https://api.llama.fi/v2/chains)
- Chain TVL history (DefiLlama default series): 2023-01-01 $95.8M; 2024-01-01 $88.2M; 2025-01-01 $134.9M; 2025-07-01 $63.1M; 2026-01-01 $45.9M; 2026-07-01 $30.2M; 2026-11-04 $30.8M. The series peak is $319.1M on 2024-02-10. — [DefiLlama historical TVL](https://api.llama.fi/v2/historicalChainTvl/Algorand)
- Protocol TVL on Algorand (DefiLlama, 4 Nov 2026): Portal (Wormhole) bridge $114.3M; Lofty (RWA) $101.1M; Reti Pooling (staking pools) $75.5M; xALGO Liquid Staking (Folks) $25.7M; Folks Finance Lending $23.6M; Tinyman $5.0M; Meld Gold $4.2M; Messina Liquid Staking $1.2M; Pact $0.90M; Algofi Lend (legacy) $0.67M; gALGO $0.44M; Alpha Arcade (prediction market) $0.18M; Myth Finance dualSTAKE $0.18M; DorkFi lending $0.17M; Ultraswap lending $0.13M; Biatec DEX $75k; Algofi Swap $59k; GARD CDP $6k; Compx CDP $3.5k; Algodex $3k; AlgoRai options vault $1.7k; Deridex (derivatives) $187; C3 Exchange $50; Deflex aggregator $20. 51 protocols list Algorand TVL. — [DefiLlama protocols API](https://api.llama.fi/protocols)
- DEX volume on Algorand: 24h $198,654; 7d $2,511,019; 30d $11,906,023. By 30d: Tinyman $8.16M, Alpha Arcade $2.50M, Pact $0.99M, Biatec $0.25M. Humble DeFi, Algofi Swap and C3 report no volume. — [DefiLlama DEX overview](https://api.llama.fi/overview/dexs/algorand)
- Algofi, which held about 55% of Algorand TVL, announced a wind-down to withdraw-only in July 2023. It cut collateral factors over months to force migration. The team cited inability to maintain its standards; outlets linked it to falling chain activity and the US regulatory action that named ALGO. — [CoinDesk](https://coindesk-coindesk-prod.cdn.arcpublishing.com/business/2023/07/11/defi-protocol-holding-55-of-algorand-value-to-shut-down/); [Blockworks](https://blockworks.co/news/algofi-defi-algorand); [crypto.news](https://crypto.news/?p=14177666)
- Haystack Router is a DEX aggregator and smart order router across multiple Algorand DEXes and LST protocols (successor to `@txnlab/deflex`). — local skill description `anthropic-skills:haystack-router` (no public metrics found)

### Inferences
- The Lofty ($101M) and Portal ($114M) figures exceed the chain total, so DefiLlama's default chain TVL excludes these categories (bridge, RWA, CEX, probably liquid staking). The "tradeable DeFi" base is roughly Folks lending + Tinyman + Pact, about $30M.
- The series peak in Feb 2024 ($319M) looks inconsistent with the 2023-2025 points around $90-135M; it may be a data artifact. Do not quote it without checking.
- Lesson from Algofi: a single protocol held most chain TVL; when the team left, users depended on an orderly wind-down path. A kernel should have an immutable "withdraw-only" mode and should not depend on one operator for liquidations.
- Liquidity is thin: $200k daily DEX volume chain-wide. Liquidation design must assume shallow pools and high slippage for anything except ALGO/USDC and LSTs.

### Gaps
- Vestige, Humble and Haystack Router volumes are not on DefiLlama (Vestige is an aggregator/analytics site). I found no public metrics for them.
- Folks Finance xChain TVL on non-Algorand chains was not pulled.
- CompX: only the CDP ($3.5k) and streaming ($30) entries appear; other CompX products have no DefiLlama data.

---

## 9. Oracles available on Algorand

### Takeaway
There is no confirmed native Chainlink or Pyth price-feed deployment on Algorand. On-chain options are the Folks Feed Oracle (an Algorand app with prices in global state, SDK beta), Gora (formerly Algoracle, a native decentralized oracle network), legacy Tellor contracts, and on-chain AMM prices (Tinyman/Pact) as TWAP sources. Folks' multichain xApp uses Chainlink, Pyth and DIA, but on its hub chain, not on Algorand.

### Cited Findings
- Folks Feed Oracle: beta Python SDK that reads prices from a Folks oracle app on Algorand; prices are in the app's global state keyed by asset ID; the README lists USDC among supported feeds. — [folks-feed-python-sdk](https://github.com/Folks-Feed-Oracle/folks-feed-python-sdk)
- Folks xApp (xChain) oracle: uses Chainlink, Pyth Network and DIA; "feeds are only needed in the Hub, where the protocol pools and logics are located"; a NodeManager checks staleness and that prices from multiple oracles "not differ by more than a certain threshold". — [Folks xApp docs](https://docs.xapp.folks.finance/technical-details/oracle)
- Algoracle/Gora: described as a decentralized oracle network linking Algorand to outside data; contracts read a feed contract; testnet-era data providers listed as AmberData, Brave New Coin, CryptoCompare, dxFeed. Sources are exchange listing pages, not primary docs. — [KuCoin GORA page](https://www.kucoin.com/price/GORA)
- Tellor on Algorand: feed contracts, medianizer contracts and a governance contract. — [developer.algorand.org article](https://developer.algorand.org/articles/teal-algo-oracle-algorand-layer-1)
- A May 2026 guide puts Chainlink at about $32B TVS and 83.7% share; Pyth uses a pull model with sub-second off-chain cadence. (General market context, not Algorand-specific.) — [blockeden.xyz](https://blockeden.xyz/blog/2026/01/19/blockchain-oracle-wars-chainlink-pyth-redstone-defi-infrastructure/)

### Inferences
- Pyth price updates are signed messages that travel over Wormhole, and Wormhole (Portal) is live on Algorand with $114M TVL. A pull-style Pyth verifier on Algorand is plausible but would need Wormhole VAA verification on-chain (heavy budget). I found no evidence it exists.
- For perps or lending, a kernel likely needs its own oracle module: a push feed (Folks Feed or Gora) plus an AMM TWAP sanity bound, with staleness in rounds and a max deviation check, as Folks does on its hub.

### Gaps
- No primary Gora documentation was reached; feed list, update latency and node count are unknown.
- Lofty oracle: I found nothing; Lofty appears to be an RWA issuer, not an oracle provider.
- Whether Pyth or Chainlink list Algorand on their official supported-chains pages was not checked directly.

---

## 10. Stablecoins on Algorand

### Takeaway
USDC dominates: about $112.2M of $113.3M USD-pegged supply on Algorand. USDT is under $1M. Small euro stablecoins (EURQ, EURS, EURe) exist.

### Cited Findings
- Algorand stablecoin supply (DefiLlama, 4 Nov 2026): pegged USD $113,253,077; pegged EUR $418,077. — [DefiLlama stablecoin chains](https://stablecoins.llama.fi/stablecoinchains)
- By asset: USDC $112,238,836; USDT $840,501; EURQ (Quantoz) $336,225; STBL $173,738; EURS (Stasis) $73,573; EURe (Monerium) $6,213; EURD (Quantoz) $2,065. — [DefiLlama stablecoins API](https://stablecoins.llama.fi/stablecoins?includePrices=false)

### Inferences
- Pricing, margin and settlement should use USDC as the base unit. USDT liquidity is too thin for liquidations.
- USDC on Algorand is a Circle-issued ASA with freeze and clawback set (standard Circle practice). The kernel must accept that issuer risk for USDC collateral; see Section 6.

### Gaps
- USDT issuance status on Algorand (Tether announced discontinuing support on several chains in 2023-2024) was not confirmed this session; the remaining $0.84M supply suggests a legacy balance.
- USDC's freeze/clawback addresses were not read on-chain this session.

---

## 11. Perps, options and margin products on Algorand

### Takeaway
No live perps venue with meaningful TVL exists on Algorand. C3 (cross-margin spot/perps) shows $50 TVL; Deridex (derivatives) $187; options vaults (AlgoRai, Silo) are near zero. An xGov proposal for a perpetual margin exchange exists, outcome unknown.

### Cited Findings
- C3 announced a self-custodial cross-margin exchange for derivatives and spot, with perpetuals, options and global cross-margining, launching on Algorand; it raised $3.6M led by Arrington Capital and Jump Capital; founders came from Rand Labs (My Algo, AlgoExplorer). — [C3 announcement](https://medium.com/c3protocol/announcing-c3-protocol-5c5e998d4c73); [CoinDesk mirror](https://irishnews.pages.dev/crypto-news-coindesk.com/business/2021/11/22/algorand-project-raises-36m-to-make-cross-chain-defi-friendly-for-big-investors)
- DefiLlama TVL today: C3 Exchange $50 (listed as Cross Chain Bridge); Deridex $187 (Derivatives); AlgoRai Finance $1,670 and Silo Protocol $87 (Options Vault). — [DefiLlama protocols API](https://api.llama.fi/protocols)
- xGov-38 proposal: "Decentralized Perpetual Margin Exchange". — [Algorand forum](https://forum.algorand.co/t/xgov-38-decentralized-perpetual-margin-exchange/9910)
- Alpha Arcade (prediction market) is the second-largest venue by 30d volume ($2.50M) with $0.18M TVL. — [DefiLlama DEX overview](https://api.llama.fi/overview/dexs/algorand); [DefiLlama protocols API](https://api.llama.fi/protocols)

### Inferences
- Prior Algorand derivatives (C3, Deridex) did not reach durable liquidity. A kernel perps module would be greenfield and must bootstrap its own LP and oracle stack.

### Gaps
- Why C3 and Deridex wound down was not found in this session.
- xGov-38 funding and delivery status unknown.

---

## Constraints for the kernel

Concrete design rules derived from the findings above. Numbers are current for consensus v42/v43 (AVM 13).

1. **Code size.** Each app is at most 16,384 bytes (approval + clear, 7 extra pages). This is a hard cap. Keep the kernel core (open, settle, account checks) in one app and put each module in its own app. Budget about 0.8 min fee extra per create/update above 8,192 bytes, and about 0.1 ALGO MBR per extra page (verify).
2. **Use `AppSizeUpdates`.** Deploy with the pages you need now; an update can add pages and global schema later (v42). Track who pays through `AppSizeSponsor`.
3. **Pin module versions.** Inner calls from the kernel to modules set `RejectVersion` = the audited version + 1 (or check `AppParams.appVersion`). A module upgrade then cannot silently change behavior inside a live group.
4. **Settle-last at top level.** The open call asserts with `gtxn` that the last group transaction is a kernel `settle` call. Settle reads module results from earlier calls with `gloads`/`gtxn Logs`, then verifies final balances, auth addresses and opt-ins of every touched account. Never trust a field check in place of a balance check.
5. **Decide inner-group policy.** `gtxn` inside an inner group sees only that group. Either reject sessions where `Global.callerApplicationId != 0`, or require open and settle to be in the same inner group. Test both paths.
6. **Session state.** No transient storage exists. Use one session box (created at open, deleted at settle) or global-state slots for the touched-account set. Settle must always clear it and refund its MBR to the payer.
7. **Touched-account limits.** A group can name at most 16 x 16 = 256 access entries and 128 box refs (262,144 bytes box I/O). Settle checks for N accounts and M assets need N + N x M holdings available. Practically cap a session at about 8-16 accounts and a few assets, and size the box I/O budget explicitly.
8. **Opcode budget.** 700 per app call, pooled; 16 top-level calls give 11,200; each inner app call adds 700 and costs one min fee. Put the expensive math (bin walks, health checks) in calls that the group already has, and use op-up inner calls only as a fallback. Simulate every group; 5.0 simulate reports fee usage and inner-group fee shortfall.
9. **Inner-txn and depth budget.** 256 inner txns per group and depth 8. Reserve slots for rekey-back, transfers and op-ups. Keep module call chains at depth 4 or less.
10. **Logs.** 32 logs and 1,024 bytes per app call. Settle emits one compact summary event; per-action events come from the module calls.
11. **Flash rekey.** The module must rekey the escrow back to its controller in its last inner txn. Settle asserts `acctAuthAddr(escrow) == controller`, the escrow is not closed, and all required opt-ins still exist. Rekey to the controller app, not to the escrow itself (`EnforceAuthAddrSenderDiff`, v42).
12. **Collateral custody.** Collateral that a module relies on between groups must sit in an escrow that only the kernel can move. Collateral in a user-admin ARC-58 wallet is not locked between groups. Lending/perps health must be checked in every group that moves that collateral.
13. **ASA admin risk.** Whitelist collateral assets. For each, read freeze and clawback addresses; treat any non-zero address as issuer risk (USDC has these). Apply a haircut or exclude assets whose clawback is an unknown party.
14. **Close-out.** Accounts that carry app or box MBR cannot be closed (v43). Wallet/escrow teardown must delete boxes and opt out of apps and assets first.
15. **Shared state between kernel and modules.** Consider AVM 13 family box access so modules write the kernel ledger directly. Only do this if the creator is a locked factory; any future app with the same creator gets write access. Non-family apps in the call stack block writes, which is a useful guard.
16. **Finality and timing.** Rounds are about 2.8-2.9 s and final on confirmation. Express oracle staleness and funding intervals in rounds (`Global.round`) and also check `Global.latestTimestamp`.
17. **Withdraw-only mode.** Ship an immutable path that lets users exit when operators stop (Algofi lesson). It must not depend on oracles or keepers.
18. **Do not use AVM 14.** `sumhash512` is in the pinned typings but is vFuture only.

## Ecosystem integration list

| Venue / service | Type | Algorand TVL / volume (DefiLlama, 4 Nov 2026) | Integration notes |
|---|---|---|---|
| Tinyman | AMM DEX | TVL $5.0M; 30d volume $8.16M (about 69% of chain) | Primary external liquidity for routing, liquidations and TWAP sanity prices. |
| Pact | AMM DEX | TVL $0.90M; 30d volume $0.99M | Secondary venue; stableswap pools. |
| Biatec DEX | Concentrated-liquidity DEX | TVL $75k; 30d volume $0.25M | Small. |
| Humble DeFi | AMM DEX | No DefiLlama volume | Low priority. |
| Haystack Router | Aggregator / smart order router (ex-Deflex) | No public metrics | Route kernel swaps and liquidations through it; this repo already mocks ORDER_ROUTER v4 on LocalNet. |
| Vestige | Aggregator / analytics | No DefiLlama data | Price data and routing UI. |
| Folks Finance Lending | Lending | TVL $23.6M | Largest lending market; flash-loan and collateral counterparty; also runs xChain (hub on another chain). |
| xALGO (Folks) | Liquid staking | TVL $25.7M | Main LST collateral candidate. |
| Reti Pooling | Staking pools | TVL $75.5M | Staking-yield source. |
| Messina | Liquid staking + bridge | LST $1.2M; bridge $589 | Minor. |
| gALGO, Myth dualSTAKE | Liquid staking | $0.44M; $0.18M | Minor LSTs. |
| Lofty | RWA (real estate tokens) | TVL $101.1M (excluded from chain total) | Possible RWA collateral; not an oracle. |
| Meld Gold, ASA.Gold | RWA (gold) | $4.2M; $28k | Commodity collateral candidates. |
| Portal (Wormhole) | Bridge | $114.3M | Source of bridged assets; possible path for Pyth messages (unconfirmed). |
| Alpha Arcade | Prediction market | TVL $0.18M; 30d volume $2.50M | Active trading venue. |
| DorkFi, Ultraswap | Lending | $0.17M; $0.13M | Small. |
| GARD, CompX CDP | CDP | $6k; $3.5k | Near-dead. |
| C3, Deridex, AlgoRai, Silo | Perps / derivatives / options | $50; $187; $1.7k; $87 | Effectively inactive; no perps incumbent. |
| Algofi | Lending / AMM (withdraw-only since 2023) | $0.67M; $59k residual | Do not integrate. |
| Folks Feed Oracle | On-chain push oracle (app global state) | n/a | Beta SDK; confirm coverage and update cadence before use. |
| Gora (ex-Algoracle) | Native decentralized oracle | n/a | No primary docs reached; verify feeds and latency. |
| Tellor (Algorand) | Oracle (feeds + medianizer) | n/a | Legacy; verify it is maintained. |
| USDC | Stablecoin (Circle ASA) | $112.2M supply | Base unit for pricing and settlement; has freeze/clawback. |
| USDT | Stablecoin | $0.84M supply | Too thin for use. |
| EURQ, EURS, EURe, STBL | Stablecoins | $336k; $74k; $6k; $174k | Niche. |
