# Deferred solvency and wallet-held margin (as of November 2026)

Scope: how existing systems let accounts owe value temporarily inside one transaction and then enforce final solvency; how to represent negative balances on the AVM (uint64 math aborts on underflow); and the risks of using a user's own ARC-58 smart wallet as a margin account. Local code was read, not modified.

Local files read (paths relative to `/Users/kylebreeding/akita/akita-sc/projects/akita-sc/smart_contracts/`):
- `arc58/account/contract.algo.ts` (1,780 lines, the ARC-58 wallet app)
- `plugin-dex/contract.algo.ts` (Vault, custody guard `bookDelta`), `plugin-dex/math.ts` (`SignedDelta`), `plugin-dex/types.ts` (`CustodyEvent`), `plugin-dex/ARCHITECTURE.md` §2 and §6, `plugin-dex/research/FINAL-SPEC.md`

---

## Q1. Uniswap v4: how currency deltas are stored and how unlock/settle/take/sync are enforced

### Takeaway
Uniswap v4 keeps one signed `int256` delta per (caller, currency) in EIP-1153 transient storage, plus one global counter of nonzero deltas. `unlock()` calls the caller back and then reverts with `CurrencyNotSettled` unless the counter is zero. The counter makes the final check O(1) instead of a loop over every touched (account, currency) pair.

### Cited Findings
- `unlock(bytes data)` reverts with `AlreadyUnlocked` if already unlocked, then calls `IUnlockCallback(msg.sender).unlockCallback(data)`, then runs `if (NonzeroDeltaCount.read() != 0) CurrencyNotSettled.selector.revertWith();` (~line 107). Every delta-changing function carries the `onlyWhenUnlocked` modifier, which reverts with `ManagerLocked` (~line 96). — [PoolManager.sol](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol)
- `_accountDelta(Currency, int128 delta, address target)` calls `currency.applyDelta(target, delta)`, which returns `(int256 previous, int256 next)`. It decrements `NonzeroDeltaCount` when `next == 0` and increments it when `previous == 0` (~line 330). — [PoolManager.sol](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol)
- Sign convention (from the caller's view): `take` applies `-(amount)` and then transfers out; `mint` (ERC-6909 claims) applies `-(amount)`; `settle`/`settleFor` and `burn` apply `+amount`. `clear` lets a caller forfeit an exact positive delta (`MustClearExactPositiveDelta`). Negative = caller owes the pool; positive = pool owes the caller. — [PoolManager.sol](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol)
- `sync(currency)` snapshots `balanceOfSelf()` into transient `CurrencyReserves`. `_settle` credits `paid = reservesNow - reservesBefore` for ERC-20s, or `msg.value` for native ETH when not synced (~lines 205, 226, 300). Payment is measured, not declared. — [PoolManager.sol](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol)
- `CurrencyDelta._computeSlot` hashes `keccak256(target, currency)` to a transient slot (lines 10-14). `getDelta` does `tload` (line 21). `applyDelta(currency, target, int128 delta) returns (int256 previous, int256 next)` does `tload`, `next = previous + delta`, `tstore` (lines 28-41). — [CurrencyDelta.sol](https://github.com/Uniswap/v4-core/blob/main/src/libraries/CurrencyDelta.sol)
- `BalanceDelta` is `type BalanceDelta is int256`: "Two `int128` values packed into a single `int256`" (lines 6-8). `add`/`sub` compute in int256 and narrow each half with SafeCast `toInt128()` (lines 20-46). `amount0` uses `sar(128, ·)`; `amount1` uses `signextend(15, ·)` (lines 61-71). — [BalanceDelta.sol](https://github.com/Uniswap/v4-core/blob/main/src/types/BalanceDelta.sol)

### Inferences
- The delta is a ledger *entry*, not a balance. The PoolManager never needs a real negative token balance: the real balance is only moved by `take` (out) and measured by `sync`/`settle` (in).
- Deltas are keyed by **caller**, not by end user. Solvency of end users (who funded what) is the router's or hook's problem. A kernel that wants per-user checks must key deltas by the account whose solvency matters.
- The nonzero-count trick is the key cost saver. It makes "every touched account is flat" a single comparison at the end.

### Gaps
- `NonzeroDeltaCount.sol` and `Lock.sol` (the transient-slot libraries) were not fetched in this session; that they use `tload`/`tstore` at fixed slots is inferred from `CurrencyDelta.sol` and the import list.

---

## Q2. Balancer v3 Vault: transient accounting, `_supplyCredit` / `_takeDebt`, settle

### Takeaway
Balancer v3 uses the same design as Uniswap v4 (signed int256 per-token delta in transient storage plus a nonzero-delta counter, checked when the outermost `unlock` returns), but with the opposite sign: positive means the caller owes the Vault. Credit comes only from measured balance increases, capped by a caller hint.

### Cited Findings
- `_supplyCredit(token, credit)` calls `_accountDelta(token, -credit.toInt256())`; `_takeDebt(token, debt)` calls `_accountDelta(token, debt.toInt256())` (~lines 76-87). — [VaultCommon.sol](https://github.com/balancer/balancer-v3-monorepo/blob/main/pkg/vault/contracts/VaultCommon.sol)
- `_accountDelta` reads `current = _tokenDeltas().tGet(token)`, sets `next = current + delta`, and calls `_nonZeroDeltaCount().tDecrement()` when `next == 0` or `tIncrement()` when `current == 0`, then `tSet` (~lines 97-119). `onlyWhenUnlocked` reverts with `VaultIsNotUnlocked` unless the transient flag is set (~lines 52-61). — [VaultCommon.sol](https://github.com/balancer/balancer-v3-monorepo/blob/main/pkg/vault/contracts/VaultCommon.sol)
- The `transient` modifier is for functions that "temporarily modify the token deltas of the Vault, but expect to revert or settle balances by the end of their execution". On the outermost exit it reverts with `BalanceNotSettled` if `_nonZeroDeltaCount().tload() != 0` (~lines 96-108). `unlock(data)` is `transient` and calls back `msg.sender` (~line 133). — [Vault.sol](https://github.com/balancer/balancer-v3-monorepo/blob/main/pkg/vault/contracts/Vault.sol)
- `settle(token, amountHint)`: `reservesBefore = _reservesOf[token]`, `currentReserves = token.balanceOf(this)`, `_reservesOf[token] = currentReserves`, `credit = currentReserves - reservesBefore`, capped at `amountHint`, then `_supplyCredit`. `sendTo` does `_takeDebt`, `_reservesOf[token] -= amount`, `safeTransfer` (~lines 139-167). — [Vault.sol](https://github.com/balancer/balancer-v3-monorepo/blob/main/pkg/vault/contracts/Vault.sol)
- Inside one unlock, `removeLiquidity` charges a round-trip fee when liquidity was added in the same session (`_addLiquidityCalled().tGet(...)`, ~line 565). ERC-4626 buffer wrap/unwrap nets as `_takeDebt(underlying)` + `_supplyCredit(wrapped)` without external calls when the buffer has liquidity (~lines 855-915). — [Vault.sol](https://github.com/balancer/balancer-v3-monorepo/blob/main/pkg/vault/contracts/Vault.sol)

### Inferences
- Balancer keeps a persistent `_reservesOf[token]` (storage, not transient) as the "last booked" balance. Credit = live balance minus booked balance. This is exactly the Plugin DEX custody guard's snapshot/measure pattern (Q5), but global per token.
- The round-trip fee shows that deferred accounting opens intra-session games (add then remove at a manipulated price). A kernel needs per-session flags for such cases.
- Neither Uniswap v4 nor Balancer v3 runs a *health* check at the end. They only require every delta to be zero. Health-factor checks at the end come from Euler's EVC (Q3).

### Gaps
- Exact line numbers are approximate (the fetch tool reported them as estimates).

---

## Q3. Euler v2 EVC: deferred account and vault status checks, controller model, operators, sub-accounts, simulation

### Takeaway
The EVC does not net deltas. It defers *predicates*: while a checks-deferred call (`call`, `batch`, `controlCollateral`) runs, vaults register "check this account" and "check this vault" in small sets. When the outermost context ends, the EVC calls the account's single controller vault with the account's collateral list, and each touched vault checks its own invariants. Any failure reverts everything.

### Cited Findings
- Checks are deferred "until the end of the execution of the outermost function call"; `call`, `batch`, and `controlCollateral` are checks-deferrable. "When the execution context ends, the address sets are iterated over." The context "is however *not* treated as a stack". — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- The deferred sets have a hard cap: failure when the count "exceeds the maximum of 10 (`SET_MAX_ELEMENTS`)". — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- After any liquidity-changing operation a vault "should invoke `requireAccountStatusCheck` on the EVC to schedule a future callback"; operations on a separate account need their own call. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- At check time, "an account can have at most one controller". The controller's `checkAccountStatus` receives "an account's address and this account's list of enabled collateral vaults" and returns its own selector as the magic success value. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- "Only the controller itself can call `disableController` on the EVC", typically after full repayment. The paper warns vaults to avoid "unrepayable dust" that would tie an account to a controller forever. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- `controlCollateral` "can only be used in one specific case: when a controller vault wants to invoke a function on a collateral vault"; the controller "can allow the collateral to be seized in order to repay the debt". — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- Operators: "the operator contract can act on behalf of the specified account"; the owner "can always revoke an operator's privileges at any time"; multiple operators are allowed; operators can change the collateral and controller sets, controllers cannot. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- Sub-accounts: "up to 256" virtual accounts per owner, sharing "the first 19 bytes" with the owner address. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- Simulation: "Simulations work by actually performing the requested operations but then reverting"; use `batchSimulation`. Malicious vaults can read `simulationInProgress` and behave differently, so simulation is not a security check. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- Lockdown mode ("can only be activated by the owner, applies to all their accounts") and permit-disabled mode exist as owner kill switches. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- Risk statement: a malicious vault could "misrepresent the amount of assets it holds", "reject liquidations when a user is in violation, or fail to require account status checks when necessary"; controllers should accept only audited collateral or verify it against a registry/factory. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)

### Inferences
- The EVC is the closest precedent to the proposed kernel: deferred checks keyed by account, a single "controller" (lender) per account that alone decides health, and a hard cap on touched accounts (10) to bound end-of-batch cost.
- The EVC answers the user's challenge (2) structurally: collateral never sits loose in an arbitrary wallet. It sits in **collateral vaults that cooperate** (they call `requireAccountStatusCheck` on every outflow), and only the controller can release itself. The owner cannot remove the lien.
- "Only one controller" removes cross-lender double-pledging inside the EVC: two lenders cannot both count the same collateral at the same time.

### Gaps
- The whitepaper fetch did not show the exact function `forgiveAccountStatusCheck`; it says controllers "can only forgive accounts that they are the sole controller of". Whether account checks guard against prices moved within the same batch is not addressed in the whitepaper.

---

## Q4. Other deferred-solvency patterns: Solana instruction introspection (marginfi), Sui hot potato, Aave, Morpho, Aptos

### Takeaway
Two other enforcement styles exist. Solana programs inspect the transaction's later instructions to prove a closing instruction exists (marginfi). Move chains make the debt a value of a type that cannot be dropped, so the VM itself forces repayment (Sui hot potato). marginfi's 2025 bug shows the main failure mode of deferred checks: an operation that moves state *out* of the account being checked during the deferred window.

### Cited Findings
- marginfi v2 `lending_account_start_flashloan` carries an `end_index: u64`; health checks are skipped until `end_flashloan`, which must sit at a higher index and target the same MarginfiAccount; both must be top-level (no CPI); a second flash loan cannot start while `ACCOUNT_IN_FLASHLOAN` is set. — [DeepWiki: marginfi flashloans](https://deepwiki.com/0dotxyz/marginfi-v2/4.2-flashloans); [carbon decoder](https://docs.rs/crate/carbon-marginfi-v2-decoder/latest/source/src/instructions/lending_account_start_flashloan.rs)
- Vulnerability (disclosed Sept 17, 2025): `transfer_to_new_account` "fails to check whether the account being transferred is in the middle of a flash loan". Attack: start flash loan on A, borrow max, transfer A's liabilities to new account B, end flash loan on A (now empty, passes), never repay. marginfi had "over $160M in deposits"; no funds lost. Fix (commit `67ab029`): no transfers during an active flash loan; disabled accounts cannot repay a flash loan. — [Asymmetric Research](https://asymmetric.com/threat-contained-marginfi-flash-loan-vulnerability/); [fix commit](https://github.com/0dotxyz/marginfi-v2/commit/67ab029e9564d73a4f4b84b1a7ea035cdd1d7c11)
- Sui hot potato: a struct with no abilities "cannot be stored", copied, or discarded, so the transaction cannot finish until it is consumed; flash loans are the canonical use. — [Move Book: hot potato](https://move-book.com/programmability/hot-potato-pattern)
- DeepBook v3 flash loans return a `FlashLoan` hot potato that must be returned to the pool by the end of the call; Trail of Bits says this needs "no callbacks or runtime balance checks". A receipt with `drop` would let a borrower skip repayment. — [Sui docs: DeepBook flash loans](https://docs.sui.io/standards/deepbookv3-sdk/flash-loans); [Trail of Bits](https://blog.trailofbits.com/2025/09/10/how-sui-move-rethinks-flash-loan-security/)

### Inferences
- Algorand sits between Solana and Sui. Like Solana, an app can read other transactions of its atomic group (`gtxn`, `gload`), so "a closing settle call exists at a later index" can be asserted at open time. The ARC-58 wallet already does this: `assertValidGroup` walks `Txn.groupIndex+1 .. groupSize` and requires `arc58_verifyAuthAddress` (`arc58/account/contract.algo.ts` lines ~531-575). There is no linear type, so the hot-potato guarantee must be emulated with "open" state that only `settle` clears, plus the group-scan at open.
- The marginfi lesson maps directly to ARC-58: any admin path that moves positions or authority out of the wallet (`arc58_rekeyTo`, `arc58_changeAdmin`, `update`, `arc58_reclaim`) must be blocked while a kernel session or debt is open (Q7).

### Gaps
- Aave v3 `flashLoan` (repay pulled via `transferFrom` after `executeOperation`, or opened as debt with `interestRateMode`), Morpho Blue callbacks (`onMorphoSupply`, `onMorphoFlashLoan`, health checked after the callback), and Aptos patterns were not fetched in this session. They are well known, but no primary source was verified here.
- Byte-level marginfi introspection code (`flashloan.rs`) was not read.

---

## Q5. Representing negative values on the AVM (uint64 aborts on underflow)

### Takeaway
The user is right that raw `a - b` with `b > a` aborts the AVM program. No system above stores a negative *token balance*. They store a signed *ledger delta* and keep real balances non-negative. On the AVM the delta must be encoded explicitly. Plugin DEX already does this with `{mag: uint64, neg: bool}` and never subtracts raw balances.

### Cited Findings
- AVM `-`: "A minus B. Fail if B > A." `+`: "Fail on overflow." `b-` (byteslice big-endian math): "Fail on underflow." So neither uint64 nor bigint math has a native signed type. — [AVM opcodes](https://dev.algorand.co/reference/algorand-teal/opcodes/)
- AVM `gload`/`gloads` read scratch slots of an earlier ApplicationCall in the same group ("fails unless ... T < GroupIndex"). — [AVM opcodes](https://dev.algorand.co/reference/algorand-teal/opcodes/)
- Atomic groups: "every transaction in the group either succeeds or none of them do." — [Algorand atomic groups](https://dev.algorand.co/concepts/transactions/atomic-txn-groups/)
- Local: `plugin-dex/math.ts` lines 54-90 define `SignedDelta = { mag: uint64; neg: boolean }` with the rule "`neg` is false for zero. Never use raw uint64 subtraction for deltas." `signedDelta(before, after)` branches on `after >= before`; `addSigned` adds same-sign magnitudes or subtracts the smaller from the larger; `applySigned(value, delta)` asserts `value >= delta.mag` (errPdki) before subtracting. — local `plugin-dex/math.ts`
- Local: `bookDelta(poolId, pool, dA, dB)` (`plugin-dex/contract.algo.ts` ~598-656) classifies the measured deltas: both zero → no-op; both ≤ 0 and nonzero → fail; mixed → the loss must be ≤ liquid reserve (`reserve − external`) and pass a fee-adjusted k check (native) or an L2 value floor plus curve Settle (curve pools); then `applySigned` writes the reserves. — local `plugin-dex/contract.algo.ts`; `plugin-dex/ARCHITECTURE.md` §6 (lines ~227-262)
- Local: `CustodyEvent = { poolId, hook, point, deltaA: uint64, negA: bool, deltaB: uint64, negB: bool }` (`plugin-dex/types.ts` ~274-282) logs signed deltas as magnitude + sign. FINAL-SPEC line ~765: "`SignedDelta {mag, neg}`; never raw uint64 subtraction". — local `plugin-dex/types.ts`, `plugin-dex/research/FINAL-SPEC.md`

### Inferences
Representation options for a kernel delta ledger (one entry per account × asset):

| Encoding | Storage | Add | Zero / sign test | Notes |
|---|---|---|---|---|
| **Magnitude + sign bit** (current `SignedDelta`) | 9 B (uint64 + bool), or pack the sign into a high bit | branchy (`addSigned`) | `mag == 0` | Already in the codebase and audited. Must normalize `neg=false` at zero, or the "is flat" check breaks. |
| **Two columns: credit, debit** (uint64 each) | 16 B | branch-free: `credit += x` or `debit += x` | `credit == debit` | No sign logic, no underflow ever. Net only at settle (`credit >= debit`). Columns grow monotonically, so overflow is the risk; bound per-session amounts. Easiest to audit. Matches double-entry bookkeeping. |
| **Offset (excess-2^63)** | 8 B | `x + d − 2^63` needs care to avoid intermediate overflow | `x == 2^63` | Compact, but halves the range and every add risks overflow; error-prone in PuyaTs. |
| **bigint offset (e.g. 2^128 + x as 16-32 byte `biguint`)** | 16-32 B | `b+`/`b-` | compare to offset | Wide range, costs more opcodes; still no native sign. |
| **Netting per asset only** (Uniswap/Balancer style: one delta per caller × currency) | small | — | nonzero counter | Works for pools (only flatness matters). Not enough for margin, where one account may legitimately end with debt in asset X backed by collateral in asset Y. |

- The real token balance should never go negative. Debts are ledger entries; tokens move only when an account actually pays (measured as balance-after minus booked balance, like Uniswap `sync`/`settle`, Balancer `settle`, and the Plugin DEX custody snapshot).
- A nonzero-entry counter (Uniswap `NonzeroDeltaCount`, Balancer `_nonZeroDeltaCount`) is the AVM-friendly way to make "all flat" O(1). It has to be kept exactly in step with the zero normalization rule.
- Algorand has no transient storage. Options: global/box state that `settle` resets (it reverts with the group if settle fails, by atomicity), or scratch space read across the group with `gloads` (only from earlier app calls). Persistent "session open" state needs a matching group scan at open time so a session cannot outlive its group.

### Gaps
- No primary source compared opcode costs of these encodings on the AVM; the table is reasoning, not measurement.

---

## Q6. Precedents for user-position accounts used as margin

### Takeaway
Every verified production precedent puts margin in an account the **protocol** controls (Gearbox credit accounts) or in **cooperating vaults** under a single controller (Euler EVC). None found lets an unrestricted, owner-upgradable personal wallet back debt directly.

### Cited Findings
- Gearbox V3: users act on a credit account only via `CreditFacadeV3.multicall`, gated by `creditAccountOwnerOnly`. External calls must go through an adapter resolved by `creditManager.adapterToContract(target)`; unmapped targets revert `TargetContractNotAllowedException`. — [CreditFacadeV3.sol](https://github.com/Gearbox-protocol/core-v3/blob/main/contracts/credit/CreditFacadeV3.sol)
- Gearbox V3 end-of-multicall: forbidden-token checks (revert `ForbiddenTokensException` or switch to safe prices), then `_fullCollateralCheck` unless `SKIP_COLLATERAL_CHECK_FLAG` is set. Health is total weighted value / debt; it must be > 1. — [CreditFacadeV3.sol](https://github.com/Gearbox-protocol/core-v3/blob/main/contracts/credit/CreditFacadeV3.sol); [Gearbox multicall docs](https://docs.gearbox.finance/developers/multicall-system)
- Gearbox liquidation: `liquidateCreditAccount` is public (anyone can call, no owner signature), `nonReentrant`, and reverts `CreditAccountNotLiquidatableException` unless `twvUSD < totalDebtUSD` or the facade is expired. — [CreditFacadeV3.sol](https://github.com/Gearbox-protocol/core-v3/blob/main/contracts/credit/CreditFacadeV3.sol)
- Gearbox bots: `botMulticall` runs only for approved, non-forbidden bots with nonzero permissions on that account; the permissions are passed as flags that limit the multicall. — [CreditFacadeV3.sol](https://github.com/Gearbox-protocol/core-v3/blob/main/contracts/credit/CreditFacadeV3.sol)
- Euler EVC: collateral lives in collateral vaults that call `requireAccountStatusCheck` on outflows; one controller per account; only the controller can disable itself; the controller can seize collateral via `controlCollateral`. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)

### Inferences
- The Gearbox model is "the protocol owns the account, the user drives it through an allowlist". The Euler model is "the user owns the account, but assets count as collateral only inside cooperating vaults that report every outflow". The proposed "whole ARC-58 wallet backs margin" design is neither. It needs one of them as a sub-structure.
- On ARC-58 the Gearbox analogue already exists: a named **escrow** (separate Algorand account rekeyed to the wallet app) used by a plugin (`arc58_rekeyToPlugin` sets `spendingAddress` to the escrow, `contract.algo.ts` ~1052-1116). A kernel could hold margin in an escrow it controls, not in the main controlled address.

### Gaps
- Instadapp DSA, dYdX v4 / Drift sub-accounts, Hyperliquid unified/portfolio margin, ERC-4337/7579 accounts used as margin, Aave/Uniswap v3 position NFTs as collateral, Contango, and Morpho/Safe modules were not verified in this session (tool-call budget). They should not be cited from these notes without a fresh primary source.

---

## Q7. Risks of wallet-held collateral, checked against the ARC-58 code

### Takeaway
In the current ARC-58 wallet the admin can, at any time and in the same group, rekey the account away, replace the app's code, remove any plugin, change the admin, and drain escrows even when they are "locked". So **no plugin-level lien survives the owner today**. Wallet-held margin is unsafe unless the wallet contract gains a debt-aware lock, or the margin moves to an account the protocol controls.

### Cited Findings (local code, `arc58/account/contract.algo.ts`)
- **Rekey away.** `arc58_rekeyTo(address, flash)` (admin only, ~1005-1020) sends an inner payment from the controlled address with `rekeyTo: address`. With `flash = false` there is no rekey-back requirement. After this, the wallet app (and every plugin) loses signing authority over the account.
- **Replace the code.** `update(version)` allows `UpdateApplication` by the admin, or by the factory when `factoryUpdateSettings.allowed` (~848-856). A new approval program can drop any lien logic.
- **Remove the lien plugin.** `arc58_removePlugin` requires only `isAdmin() || canRevoke()` (~1323-1335; `_requireAdminOrRevoke` ~221-223). No check for open debt or protocol consent. `arc58_removeAllowances` has the same gate (~1576).
- **Change control.** `arc58_changeAdmin` (admin, ~948-954). `arc58_pluginChangeAdmin` lets a plugin with the `admin` flag set a new admin and clears co-admin passkeys (recovery path, ~962-984). A recovery plugin and a margin lien can therefore conflict.
- **Escrow lock is not a lien.** `arc58_toggleEscrowLock` is admin-only (~1430-1438). A lock blocks opt-ins and allowance changes (`_requireUnlockedEscrow`, ~1489, ~1513, ~1542, ~1578) and blocks close-out on *plugin* reclaims (`arc58_pluginReclaim` passes `!locked`, ~1477). But admin `arc58_reclaim` calls `reclaim(escrow, reclaims, true)` without checking the lock (~1447-1450), so the admin can move all escrow funds and close holdings while locked.
- **What the wallet already enforces well.** During a plugin rekey window, `assertValidGroup` (~501-575) requires every later app call to target the same plugin app (`errCannotCallOtherAppsDuringRekey`), requires `appId.version === 0` (a never-updated plugin), checks expiry/cooldown/method allowlists and execution-key groups, and requires `arc58_verifyAuthAddress` later in the group (`errMissingRekeyBack`). `arc58_verifyAuthAddress` asserts the account is rekeyed back (~992-998).

### Cited Findings (Algorand protocol)
- ASA clawback: the clawback address "can reclaim holdings of the asset from any account"; freeze can freeze holdings; both are disabled only if the address is empty. Assets can be created default-frozen. — [Algorand transaction reference](https://dev.algorand.co/concepts/transactions/reference)
- Opt-out and close: an asset close field removes the holding (opt-out); a payment close-to closes the account and sends the rest. — [Algorand transaction reference](https://dev.algorand.co/concepts/transactions/reference)
- Rekey sets the address that "will authorize all future transactions"; rekeying to the sender resets it. — [Algorand transaction reference](https://developer.algorand.org/docs/reference/transactions)

### Inferences (risk catalogue)
1. **Collateral leaves between checks.** Any admin transaction outside a kernel group (send, `arc58_reclaim`, rekey) moves value with no health check. Deferred checks only cover the group they run in. Severity: critical.
2. **Rekey / app update / admin change.** Shown above; each removes the protocol's future ability to liquidate. Same class as the marginfi `transfer_to_new_account` bug (Q4). Critical.
3. **Liquidation needs forced access.** Liquidation must run without the owner's signature (Gearbox: public `liquidateCreditAccount`; Euler: `controlCollateral`). On ARC-58 that requires a global-caller plugin grant that the admin cannot revoke while debt exists. Today the admin can revoke it (`arc58_removePlugin`). Critical.
4. **Issuer freeze / clawback.** A frozen ASA cannot be sold by a liquidator; clawback can remove it entirely. Count only ASAs with empty freeze and clawback addresses, or haircut them heavily. High.
5. **Opt-out / receiver opt-in.** The owner can close an ASA holding (sending it elsewhere), and a liquidator or kernel escrow must be opted in to receive. Liquidation paths must pre-opt-in receivers and must not depend on the borrower's opt-in state. High.
6. **Malicious or upgraded plugins.** Plugins with the `admin` flag can change the admin. The wallet's version-0 rule blocks *updated* plugins during a window, but a newly installed malicious plugin is version 0 too. Also the EVC warns that collateral that does not cooperate can misreport holdings or block liquidations. High.
7. **Heterogeneous valuation.** LP tokens, receipts and NFTs need per-asset oracles; LP tokens priced from spot reserves can be moved inside the same group before the settle check. Value only allowlisted assets with manipulation-resistant prices. High.
8. **Dust griefing.** Many tiny ASA holdings raise end-of-group check cost (the EVC caps deferred sets at 10). Also "unrepayable dust" can lock an account to a lender forever (EVC). Medium.
9. **Cross-protocol double-pledging.** The same wallet assets can back debt in two protocols that each see the full balance. EVC prevents this only inside the EVC by "at most one controller". An ARC-58 kernel must be the sole controller, or pledges must be recorded in one registry. High.
10. **Recovery conflicts.** Social recovery (`arc58_pluginChangeAdmin`) is a legitimate admin change that must still not free the collateral. The lien must bind the account, not the current admin. Medium.
11. **MEV around liquidations.** Public liquidation invites racing; on Algorand there is no public mempool auction in the Ethereum sense, but liquidations are still first-come. Use a liquidation bonus cap and partial liquidation. Medium (needs a source for Algorand ordering behaviour; see Gaps).

### Gaps
- Whether the ARC-58 revocation app (`canRevoke`) is held by a third party in production deployments was not checked.
- Algorand transaction-ordering/MEV behaviour was not researched in this session.

---

## Q8. Mitigations used in practice

### Takeaway
Real systems either take custody of margin into a protocol-controlled sub-account (Gearbox) or restrict collateral to cooperating vaults with a non-removable, single controller and mandatory checks on every outflow (Euler). Allowlists, caps, a bounded touched-set, and a public liquidation path appear in both.

### Cited Findings
- Protocol-controlled account plus adapter allowlist plus end-of-multicall full collateral check plus forbidden-token rules. — [CreditFacadeV3.sol](https://github.com/Gearbox-protocol/core-v3/blob/main/contracts/credit/CreditFacadeV3.sol)
- Controller-only release (`disableController`), single controller, collateral vaults that report outflows, controller-only `controlCollateral`, collateral allowlist via registry/factory, cap of 10 deferred accounts/vaults. — [EVC whitepaper](https://github.com/euler-xyz/ethereum-vault-connector/blob/master/docs/whitepaper.md)
- Block state-moving operations while a deferred session is open (marginfi fix: no account transfer during an active flash loan). — [Asymmetric Research](https://asymmetric.com/threat-contained-marginfi-flash-loan-vulnerability/)
- Measure payments as balance-after minus booked balance; never trust declared amounts. — [Balancer Vault.sol `settle`](https://github.com/balancer/balancer-v3-monorepo/blob/main/pkg/vault/contracts/Vault.sol); [Uniswap PoolManager.sol `sync`/`settle`](https://github.com/Uniswap/v4-core/blob/main/src/PoolManager.sol)
- The Plugin DEX Vault already applies the custody variant on Algorand: snapshot, flash-rekey the escrow to the hook, require rekey-back (`escrow.authAddress == Vault`, errPdrb), measure, classify signed deltas, bound losses to the liquid reserve. — local `plugin-dex/ARCHITECTURE.md` §6

### Inferences
- The ARC-58 escrow mechanism is the natural "sub-account". What it lacks for margin is (a) an escrow whose lock the admin cannot lift and whose funds the admin cannot `arc58_reclaim` while debt exists, and (b) a plugin grant that the admin cannot remove while debt exists. Both are wallet-contract changes and need explicit approval under the project rules.

### Gaps
- Per-account debt caps and isolation modes in Aave/Morpho were not sourced in this session.

---

## Findings for the kernel

### Takeaway
Use a signed *ledger* for temporary debts, never signed balances, and keep margin in an account the kernel controls. Do not count the free ARC-58 controlled address as collateral under the current wallet contract.

### Design rules
1. **Deltas are ledger entries, balances never go negative.** Store per (account, asset) either two monotonic uint64 columns (credit, debit) or the existing `SignedDelta {mag, neg}` with `neg = false` at zero. Ban raw `a − b` on delta paths (already a Plugin DEX rule in `math.ts`).
2. **Credit only by measurement.** An account earns credit only from a measured balance increase against a booked snapshot (Uniswap `sync`/`settle`, Balancer `settle`, Plugin DEX custody guard). Cap by a caller hint like Balancer.
3. **O(1) final flatness.** Keep a nonzero-entry counter updated on every 0 ↔ nonzero transition, plus a bounded touched-account set (EVC caps at 10). Settle fails if the counter is nonzero for pool-type accounts, and runs a health predicate for margin accounts.
4. **Two kinds of end check.** Pools and reserves must end flat or invariant-preserving (Uniswap/Balancer/Plugin DEX). Margin accounts may end with debt, but only if their single controller's health check passes (EVC). Do not mix the two into one "all deltas zero" rule.
5. **Session cannot outlive its group.** At open, scan later group transactions (`gtxn`) and require the kernel `settle` call, as `assertValidGroup` requires `arc58_verifyAuthAddress`. Any "session open" state must be cleared by settle; atomicity reverts it otherwise. Reject nested sessions (marginfi `ACCOUNT_IN_FLASHLOAN`).
6. **Freeze escape hatches during a session.** While a session is open, nothing may move positions or authority out of a touched account: no rekey, admin change, app update, plugin removal, escrow reclaim, or ASA close-out (marginfi `transfer_to_new_account` lesson).
7. **Margin lives in a kernel-controlled escrow, not the free wallet.** Count collateral only in an ARC-58 escrow (separate account) whose auth address is the kernel or the wallet app under a kernel lien. Moving assets in is a measured credit; moving out runs the health check (EVC collateral-vault rule).
8. **The lien must survive the owner while debt > 0.** Required wallet changes (need explicit approval): `arc58_removePlugin`, `arc58_removeAllowances`, `arc58_reclaim`, `arc58_toggleEscrowLock`, `arc58_rekeyTo`, `update`, and admin-plugin `arc58_pluginChangeAdmin` must refuse to touch the margin escrow or the kernel grant while the kernel reports debt. Only the kernel (controller) releases the lien (EVC `disableController`). If the wallet contract will not change, the kernel must take custody: the escrow is rekeyed to the kernel, not to the wallet.
9. **One controller per margin account.** The kernel is the sole controller of a margin escrow, which stops double-pledging inside the system. Pledges to outside protocols are not visible, so never count assets the kernel does not custody.
10. **Liquidation without the owner.** Provide a public liquidation path (Gearbox `liquidateCreditAccount`, EVC `controlCollateral`). Pre-opt-in the liquidation receiver and the margin escrow; do not depend on the borrower's opt-in state.
11. **Collateral allowlist with issuer-risk rules.** Accept only allowlisted assets; give zero or heavily haircut weight to ASAs with a freeze or clawback address or default-frozen; price LP and receipt tokens with manipulation-resistant valuators (the Plugin DEX clipped-valuator `max(v, r')` / `min(v, r')` rule is a local model).
12. **Bound the work.** Cap touched accounts and assets per session and per account (dust griefing, opcode budget). Avoid states that leave unrepayable dust tying an account to the kernel forever.
13. **Simulation is not a check.** Fee and outcome simulation can differ from execution (EVC `simulationInProgress` warning; Plugin DEX lazy-custody fee buffer). Always re-check on chain at settle.
