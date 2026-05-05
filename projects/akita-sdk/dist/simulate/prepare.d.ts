import algosdk from "algosdk";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import { AlgodClient, PendingTransactionResponse, SimulateResponse } from "@algorandfoundation/algokit-utils/algod-client";
import { TransactionComposer } from "@algorandfoundation/algokit-utils/composer";
import { ABIMethod, ABIReturn } from "@algorandfoundation/algokit-utils/abi";
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
export declare function prepareGroup(composer: TransactionComposer, overrides?: ForceOptions): Promise<PreparedGroup>;
/**
 * Submit a `PreparedGroup` via utils10's `AlgodClient`, waiting for
 * confirmation and decoding ABI returns via the `methodCalls` map captured
 * from `composer.build()`.
 *
 * Companion to `prepareGroup`. Use this when you've prepared a group with
 * post-build mutations (fee consolidation, signer override) and want to
 * send it yourself rather than hand off to another submitter.
 */
export declare function sendPrepared(prepared: PreparedGroup, algod: AlgodClient, waitRounds?: number): Promise<SendGroupResult>;
