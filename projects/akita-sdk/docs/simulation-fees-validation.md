# Wallet simulation fee validation

Validated on 2026-09-08 using LocalNet algod 5.0.0, the current SDK source,
AlgoKit Utils 10.0.0-beta.1, and algosdk 3.6.0. Utils 9.2.2 with algosdk
3.7.0 was installed separately under `/tmp/akita-fee-v9` for comparison.
Repository dependency versions and SDK runtime behavior were not changed.

**Simulation pools outer transaction fees, including fees for inner
transactions. The multi-ALGO balance requirement comes from inflating every
app call to its maximum fee, not from a node requirement that each transaction
pay independently. Switching to Utils 9.2.2 alone does not fix it.**

## Observed results

These use an existing ARC-58 wallet and its Global PayPlugin. The three outer
transactions are rekey, plugin payment, and authorization verification. Two
inner transactions execute. All amounts below are ALGO.

| Simulation | Outer fees | Result |
| --- | --- | --- |
| Every app call at the stated maximum | `[0.272, 0.272, 0.272]` | Pass |
| First transaction pays | `[0.272, 0, 0]` | Pass; identical discovered box names and inner count |
| Last transaction pays | `[0, 0, 0.272]` | Pass; identical discovered box names and inner count |
| Actual fee for this path | `[0.005, 0, 0]` | Pass |
| Insufficient pooled fee | `[0.001, 0, 0]` | Node rejects with a group-fee error |
| Sender reduced to 0.3 spendable, individual maxima | `[0.272, 0.272, 0.272]` | Balance failure |
| Same spendable balance, first transaction pays | `[0.272, 0, 0]` | Pass |
| SDK `build.usePlugin`, 16 outer transactions, original discovery | Per-call maximums | Balance failure |
| Same SDK build, pooled discovery | `[0.272, 0, …, 0]` during discovery | Pass; final fee is **0.031**, with 15 inner transactions |

The low-balance comparison prepends a payment **inside simulation** that
leaves 0.3 ALGO above the sender's minimum balance. It does not change the
ledger. The script checks the actual account balance afterward.

The SDK-built three- and sixteen-transaction outputs also pass a separate
strict simulation: no unnamed resources and no extra opcode budget. This
checks the populated box/resource references and final fees together, after
the SDK's fee consolidation and regrouping. The identical pooled wallet
request succeeds through the v10 algod client, algosdk 3.6.0, and algosdk 3.7.0.

## Why this happens

Utils v10 `TransactionComposer.analyzeGroupRequirements()` copies each app
call and sets its simulated `fee` to its logical `maxFee`. Only after a
successful simulation does it derive the real fees from the inner transaction
results. The simulation therefore requires enough spendable balance for all
the inflated fees even when the final group is inexpensive.

In this working tree, [DEFAULT_SEND_PARAMS](../src/constants.ts) supplies
`maxFee: 257_000`. The `272 × minFee` fallback in
[wallet/index.ts](../src/wallet/index.ts) fills missing limits; it preserves
existing limits. The captured default wallet requests actually use 257,000
per call: **4.112 ALGO for 16 calls**, before minimum balance and transfers.
Explicit 272,000 limits produce the reported **4.352 ALGO** buffer.
`build.usePlugin` also overrides the simulation sender with the wallet admin
inside `prepareGroup`; the account whose balance matters may differ from the
eventual submitter.

Utils 9.2.2 retains the same behavior in `getGroupExecutionInfo()`. The
comparison runs its real `prepareGroupForSending()` with three app calls and
captures **`[272000, 272000, 272000]`** in the discovery request.
[Released v9 implementation](https://github.com/algorandfoundation/algokit-utils-ts/blob/v9.2.2/src/transaction/transaction.ts).

Repository history also contains this behavior before the v10 migration:
at `7fbaa0b8^`, the root dependency was Utils **9.1.2**, and the SDK's own
`simulate/prepare.ts` copied each `maxFee` into `txn.fee` and enforced the same
per-transaction cap during allocation. The balance requirement is therefore
not something introduced solely by the v10 beta.

There is a second, distinct failure that can look like missing pooling:
setting transaction 0's `maxFee` high and all other `maxFee` values to zero
does **not** create actual fee surplus. With initial fees `[1000, 0, 0]`,
the node accepts the inflated discovery group, then Utils v10 rejects its
own fee allocation with:

```text
Calculated transaction fee 1000 µALGO is greater than max of 0 for transaction 1
```

The reproducer asserts this error. It is a plausible explanation for the old
observation, not proof of what happened in the earlier SDK version.

## Implication for a fix

Change the **discovery request's fee budget**, preserving the composer's
per-transaction fee limits and its final fee/resource calculation. The
diagnostic interceptor demonstrates that approach without changing production
code. Moving the same total 4.352 ALGO onto transaction 0 would still require
the same spendable balance; reducing the aggregate discovery budget is the
part that removes the artificial requirement.

The tested 0.272 ALGO is not a universal maximum for every possible plugin
group. Inner-transaction limits are pooled across the group, and large
transactions can have usage surcharges. A production implementation needs a
bounded budget/retry policy, must preserve fee reimbursement and payer
semantics, and must retain final strict validation. It must not calculate
final cost from a failed, incomplete simulation.
[Fee and simulation rules](https://dev.algorand.co/concepts/transactions/fees/),
[consensus limits](https://github.com/algorand/go-algorand/blob/v5.0.0-stable/config/consensus.go).

An eventual v9 migration is a separate compatibility change: this SDK uses
v10 transaction/client imports, generated clients, signer adapters, and
composer internals. algosdk is already present as a peer dependency; the
current registry stable versions were Utils 9.2.2 and algosdk 3.7.0.

## Reproduction

With the existing LocalNet wallet and plugin from this run:

```sh
node projects/akita-sdk/scripts/validate-simulation-fees.cjs 361596 361662 /tmp/akita-fee-v9
```

The third argument is optional. To repeat the stable-version comparison,
install Utils 9.2.2 and algosdk 3.7.0 into an isolated directory and pass that
directory. No repository install or dependency migration is required.
After a LocalNet reset, supply IDs for a new wallet and its enabled Global
PayPlugin. The wallet admin must have more than 0.301 ALGO spendable for the
simulated balance-reduction comparison, and the plugin must permit the admin
to execute this payment path.

The script loads SDK source using the repository's installed `ts-node`, uses
empty signatures, and forbids submission through its SDK client. It prints
request fees, failure summaries, inner counts, and discovered boxes.
See [recorded results](simulation-fees-validation.json).

## Repository checks

- `npm test --workspace=@akta/sdk`: 22 files, 228 tests passed.
- `npm test --workspace=smart_contracts`: 68 files passed; 991 tests passed,
  11 existing TODOs, zero failures (18m 52s).
- The diagnostic script completed all 15 result records, including the expected
  underfunding and zero-cap rejections. `node --check` also passed.
- No contract source, generated client, or SDK runtime file was edited for this investigation.
