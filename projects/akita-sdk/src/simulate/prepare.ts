import algosdk from "algosdk";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import { AlgodClient, PendingTransactionResponse, SimulateResponse } from "@algorandfoundation/algokit-utils/algod-client";
import { TransactionComposer } from "@algorandfoundation/algokit-utils/composer";
import { AppManager } from "@algorandfoundation/algokit-utils/app-manager";
import { encodeTransactionRaw } from "@algorandfoundation/algokit-utils/transact";
import { waitForConfirmation } from "@algorandfoundation/algokit-utils/transaction";
import { microAlgo, encodeLease } from "@algorandfoundation/algokit-utils";
import { ABIMethod, ABIReturn } from "@algorandfoundation/algokit-utils/abi";
import { wrapUtils10Signer } from "../utils";

// -----------------------------------------------------------------------------
// Utils10-native group preparation and sending
// -----------------------------------------------------------------------------
//
// `prepareGroup` + `sendPrepared` replace the legacy
// `composerToLegacyAtc → forceProperties → prepareGroupWithCost → sendLegacyAtc`
// chain with a single utils10-native flow that runs exactly one simulate.
//
// The old chain existed because `prepareGroupWithCost` was written for
// `algosdk.AtomicTransactionComposer` and mutated transactions using algosdk
// field names. Utils10's composer natively supports `populateAppCallResources`
// and `coverAppCallInnerTransactionFees` via `composer.build()`, so we no
// longer need to re-implement that logic on the algosdk ATC layer.
//
// We still drop into algosdk shape *after* build() to apply field mutations
// (sender swap, lease, fee consolidation) — utils10 transactions aren't
// trivially mutable and have no exposed `assignGroupID` equivalent. This
// conversion happens in-memory without a second simulate roundtrip.

export interface ForceOptions {
  /** Swap the transaction sender. Used for arc58 execution handoff where
   *  simulate runs with admin perms but the group is submitted by someone
   *  else later. */
  sender?: string | algosdk.Address;
  /** Override the signer on every transaction in the group. */
  signer?: algosdk.TransactionSigner;
  /** Set the lease on transaction 0 (for replay protection / execution
   *  registration). */
  lease?: Uint8Array | string;
  /** Override the first/last valid rounds on every transaction. */
  firstValid?: bigint;
  lastValid?: bigint;
  /** Map of txn-index → fee override. Mutually exclusive with
   *  `consolidateFees`. */
  fees?: Map<number, AlgoAmount>;
  /** Move all distributed fees onto transaction 0 and zero the rest, so the
   *  sender signs one big fee. Computed from the fees utils10 just
   *  distributed during build(), no extra simulate. */
  consolidateFees?: boolean;
}

export interface PreparedGroup {
  transactions: algosdk.Transaction[];
  signers: algosdk.TransactionSigner[];
  groupId: string;
  methodCalls: Map<number, ABIMethod>;
  /**
   * The simulate response captured from the single simulate round-trip that
   * utils10 runs inside `composer.build()` to populate app-call resources and
   * distribute inner-transaction fees. Exposed here so downstream consumers
   * (e.g. `computeExpectedCost`) can read account deltas and inner-txn
   * information *without* paying for a second simulate. Undefined only if
   * utils10's internal simulate path didn't run — which shouldn't happen when
   * `populateAppCallResources` and `coverAppCallInnerTransactionFees` are on.
   */
  simulateResponse?: SimulateResponse;
}

export interface SendGroupResult {
  groupId: string;
  confirmedRound: bigint;
  txIds: string[];
  confirmations: PendingTransactionResponse[];
  returns: ABIReturn[];
}

/**
 * Run a single simulate through utils10's `composer.build()` to populate
 * app-call resources and distribute fees for inner-transaction coverage,
 * then apply any post-build overrides (sender swap, lease, fee consolidation)
 * to the resulting transactions.
 *
 * Returns an unsigned, regrouped group ready for either:
 *   - Immediate sending via `sendPrepared(prepared, algod)`
 *   - Handoff to a different submitter (arc58 execution flow) by returning
 *     `prepared.transactions` without signing
 *
 * Exactly one simulate runs per call (inside `composer.build()`). Post-build
 * mutations happen in-memory and don't trigger another simulate.
 */
export async function prepareGroup(
  composer: TransactionComposer,
  overrides: ForceOptions = {}
): Promise<PreparedGroup> {
  // Run simulate-populate-cover. This is the only simulate roundtrip.
  const configured = composer.clone({
    populateAppCallResources: true,
    coverAppCallInnerTransactionFees: true,
  });

  // When sender/signer overrides are requested, swap them on the cloned
  // composer BEFORE `build()` fires — so the single simulate inside build
  // runs as-if the overridden sender submitted the group. This matters for
  // execution handoff (arc58), where simulate must run as admin to populate
  // resources correctly. Post-build mutation (further down) would leave the
  // simulate having been run with the wrong sender, producing contract-level
  // "box not found" assertion failures.
  const senderOverride =
    overrides.sender !== undefined
      ? typeof overrides.sender === "string"
        ? overrides.sender
        : overrides.sender.toString()
      : undefined;
  if (senderOverride || overrides.signer) {
    const internalTxns = (configured as unknown as {
      txns: Array<{ type: string; data: { sender?: unknown; signer?: unknown } }>;
    }).txns;
    for (const ctxn of internalTxns) {
      if (senderOverride) ctxn.data.sender = senderOverride;
      if (overrides.signer) ctxn.data.signer = overrides.signer;
    }
  }

  // Intercept the single simulate utils10 performs inside `composer.build()`
  // (via `analyzeGroupRequirements` → `algod.simulateTransactions`). We wrap
  // the composer's algod client in a Proxy that transparently forwards every
  // method, then overloads `simulateTransactions` to cache the response.
  //
  // Why a Proxy and not a monkey-patch of `algod.simulateTransactions`:
  // the algod client is shared across the entire SDK — patching its prototype
  // method would leak into unrelated simulate calls. A per-call Proxy is
  // scoped to this one `prepareGroup` invocation and reverted the moment
  // build() returns.
  //
  // Why capture on the composer and not the outer algod: utils10 reads the
  // algod off the composer instance when analyzing the group, so the wrapper
  // must be installed on the composer's `algod` property specifically.
  let capturedSimulateResponse: SimulateResponse | undefined;
  const composerInternal = configured as unknown as { algod: AlgodClient };
  const originalAlgod = composerInternal.algod;
  composerInternal.algod = new Proxy(originalAlgod, {
    get(target, prop, receiver) {
      if (prop === "simulateTransactions") {
        // Bind explicitly so `this` inside the algod method (which internally
        // calls HTTP-request helpers) still resolves to the real client.
        const original = Reflect.get(target, prop, receiver) as AlgodClient["simulateTransactions"];
        return async (...args: Parameters<AlgodClient["simulateTransactions"]>) => {
          const response = await original.apply(target, args);
          capturedSimulateResponse = response;
          return response;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  });

  let built: Awaited<ReturnType<TransactionComposer["build"]>>["transactions"];
  let methodCalls: Awaited<ReturnType<TransactionComposer["build"]>>["methodCalls"];
  try {
    const result = await configured.build();
    built = result.transactions;
    methodCalls = result.methodCalls;
  } finally {
    // Restore the real algod reference even on failure so a thrown build()
    // (e.g. simulate rejection) doesn't leave the composer pointing at our
    // proxy. The composer is usually single-use, but this guards against
    // callers that reuse it after catching.
    composerInternal.algod = originalAlgod;
  }

  // Resolve fee override map. consolidateFees takes precedence over explicit
  // fees, since it's computed from the fees utils10 just distributed.
  let feesMap = overrides.fees;
  if (overrides.consolidateFees) {
    const total = built.reduce(
      (acc, tws) => acc + BigInt(tws.txn.fee ?? 0n),
      0n
    );
    feesMap = new Map<number, AlgoAmount>([
      [0, microAlgo(total)],
      ...Array.from({ length: built.length - 1 }, (_, i) =>
        [i + 1, microAlgo(0n)] as [number, AlgoAmount]
      ),
    ]);
  }

  const senderAddr =
    overrides.sender !== undefined
      ? typeof overrides.sender === "string"
        ? algosdk.decodeAddress(overrides.sender)
        : overrides.sender
      : undefined;

  const leaseBytes =
    overrides.lease !== undefined
      ? typeof overrides.lease === "string"
        ? encodeLease(overrides.lease)
        : overrides.lease
      : undefined;

  // Convert each utils10 Transaction to an algosdk Transaction via msgpack
  // roundtrip. This gives us field-mutation access (algosdk declares `sender`
  // readonly at the type level, but a fresh-decoded Transaction object has a
  // plain mutable field at runtime — this is the supported mutation point).
  const txns: algosdk.Transaction[] = built.map((tws, i) => {
    const bytes = encodeTransactionRaw(tws.txn);
    const txn = algosdk.decodeUnsignedTransaction(bytes);
    txn.group = undefined;
    if (senderAddr) {
      (txn as unknown as { sender: algosdk.Address }).sender = senderAddr;
    }
    if (leaseBytes && i === 0) {
      (txn as unknown as { lease: Uint8Array }).lease = leaseBytes;
    }
    if (overrides.firstValid !== undefined) {
      (txn as unknown as { firstValid: bigint }).firstValid = overrides.firstValid;
    }
    if (overrides.lastValid !== undefined) {
      (txn as unknown as { lastValid: bigint }).lastValid = overrides.lastValid;
    }
    if (feesMap?.has(i)) {
      (txn as unknown as { fee: bigint }).fee = feesMap.get(i)!.microAlgo;
    }
    return txn;
  });

  algosdk.assignGroupID(txns);

  const signers: algosdk.TransactionSigner[] = built.map(
    (tws) => overrides.signer ?? wrapUtils10Signer(tws.signer)
  );

  return {
    transactions: txns,
    signers,
    groupId: Buffer.from(txns[0].group!).toString("base64"),
    methodCalls,
    simulateResponse: capturedSimulateResponse,
  };
}

/**
 * Submit a `PreparedGroup` via utils10's `AlgodClient`, waiting for
 * confirmation and decoding ABI returns via the `methodCalls` map captured
 * from `composer.build()`.
 *
 * Companion to `prepareGroup`. Use this when you've prepared a group with
 * post-build mutations (fee consolidation, signer override) and want to
 * send it yourself rather than hand off to another submitter.
 */
export async function sendPrepared(
  prepared: PreparedGroup,
  algod: AlgodClient,
  waitRounds = 10
): Promise<SendGroupResult> {
  // txIDs must be captured before we drop the group ID below — the
  // txID is computed from the canonical encoding which includes `group`.
  const txIds = prepared.transactions.map((txn) => txn.txID());

  // Invoke signers directly rather than going through `AtomicTransactionComposer`.
  // The ATC's `addTransaction` refuses txns that already have a group ID set, but
  // `prepareGroup` has already assigned the group. Grouping signers by identity
  // mirrors ATC's own internal gatherSignatures behavior.
  const signerToIndexes = new Map<algosdk.TransactionSigner, number[]>();
  for (let i = 0; i < prepared.signers.length; i++) {
    const signer = prepared.signers[i];
    const existing = signerToIndexes.get(signer);
    if (existing) existing.push(i);
    else signerToIndexes.set(signer, [i]);
  }

  const signedTxns: Uint8Array[] = new Array(prepared.transactions.length);
  for (const [signer, indexes] of signerToIndexes) {
    const parts = await signer(prepared.transactions, indexes);
    for (let j = 0; j < indexes.length; j++) {
      signedTxns[indexes[j]] = parts[j];
    }
  }
  await algod.sendRawTransaction(signedTxns);

  const firstConfirmation = await waitForConfirmation(
    txIds[0],
    waitRounds,
    algod
  );
  const confirmations: PendingTransactionResponse[] = [firstConfirmation];
  for (let i = 1; i < txIds.length; i++) {
    confirmations.push(await algod.pendingTransactionInformation(txIds[i]));
  }

  const returns: ABIReturn[] = [];
  for (let i = 0; i < confirmations.length; i++) {
    const method = prepared.methodCalls.get(i);
    if (!method) continue;
    const abiReturn = AppManager.getABIReturn(confirmations[i], method);
    if (abiReturn !== undefined) returns.push(abiReturn);
  }

  return {
    groupId: prepared.groupId,
    confirmedRound: BigInt(firstConfirmation.confirmedRound ?? 0),
    txIds,
    confirmations,
    returns,
  };
}
