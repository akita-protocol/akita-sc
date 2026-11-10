import algosdk, { type modelsv2 } from 'algosdk';
import type { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import type { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer';
import type { ABIReturn } from '@algorandfoundation/algokit-utils/types/app';
type AlgodClient = algosdk.Algodv2;
type PendingTransactionResponse = modelsv2.PendingTransactionResponse;
type SimulateResponse = modelsv2.SimulateResponse;
type ABIMethod = algosdk.ABIMethod;
export interface ForceOptions {
    /** Swap the transaction sender. Used for arc58 execution handoff where
     *  simulate runs with admin perms but the group is submitted by someone
     *  else later. */
    sender?: string | algosdk.Address;
    /** Swap the sender only on these transaction indexes (all of them when unset). */
    senderIndexes?: ReadonlySet<number>;
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
     *  sender signs one big fee. Computed from the fees AlgoKit just
     *  distributed during build(), no extra simulate. */
    consolidateFees?: boolean;
}
export interface PreparedGroup {
    transactions: algosdk.Transaction[];
    signers: algosdk.TransactionSigner[];
    groupId: string;
    methodCalls: Map<number, ABIMethod>;
    /**
     * The final strict simulate response captured from `composer.build()` after
     * app-call resources, carrier calls, and inner-transaction fees are complete.
     * Exposed here so downstream consumers
     * (e.g. `computeExpectedCost`) can read account deltas and inner-txn
     * information without issuing their own simulate. Undefined only if
     * AlgoKit's internal simulate path didn't run — which shouldn't happen when
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
/** Prepare native algosdk transactions, retaining shared signer identities. */
export declare function prepareGroup(composer: TransactionComposer, overrides?: ForceOptions): Promise<PreparedGroup>;
export declare function sendPrepared(prepared: PreparedGroup, algod: AlgodClient, waitRounds?: number): Promise<SendGroupResult>;
export {};
