import { SimulateResponse } from "@algorandfoundation/algokit-utils/algod-client";
/**
 * An itemized outflow from the tracked address, one entry per contributing
 * transaction (top-level or inner). `isFee` distinguishes fee outflows from
 * principal (`pay.amount` / `axfer.amount` / close-remainder) outflows.
 */
export type AssetPayment = {
    /** Asset ID. `0n` represents ALGO. */
    asset: bigint;
    /** Amount leaving the tracked address for this outflow (microALGO for ALGO). */
    amount: bigint;
    /** Outflow sender — always equals the tracked address by construction. */
    sender: string;
    /** Outflow receiver. `null` for fees (paid to the network, not an address). */
    receiver: string | null;
    /** If this outflow was a close-remainder transfer, the address receiving the close-out. */
    closeRemainderTo?: string;
    /** `true` when this entry is a transaction fee paid by the tracked address. */
    isFee?: boolean;
};
/**
 * Per-asset total outflow from the tracked address. `asset === 0n` is ALGO
 * (matches `totalAlgo`); every other entry is an ASA.
 */
export type AssetSubtotal = {
    /** Asset ID. `0n` represents ALGO. */
    asset: bigint;
    /** Total amount of this asset leaving the tracked address across the group. */
    amount: bigint;
};
/**
 * Aggregated cost prediction for a built transaction group from the
 * perspective of a single tracked address.
 *
 * Populated by `computeExpectedCost` using the simulate response that utils10
 * already runs during `composer.build()` — no additional simulate roundtrip
 * is performed.
 */
export type ExpectedCost = {
    /**
     * Total microALGO outflow from the tracked address across the whole group.
     * Equals the sum of:
     *   - `pay.amount` where sender is tracked
     *   - `closingAmount` where sender is tracked and `closeRemainderTo` is set
     *   - transaction fees where sender is tracked
     */
    totalAlgo: bigint;
    /**
     * Sum of transaction fees across the entire group (all senders). This is
     * the total network fee the group costs to submit, regardless of who pays —
     * useful for UI that surfaces the group's network footprint separately from
     * the tracked account's balance delta.
     */
    networkFees: bigint;
    /**
     * Per-asset outflow totals from the tracked address. Contains one entry per
     * distinct asset the tracked address sends. Always includes an `asset === 0n`
     * entry matching `totalAlgo` (even if zero) when the tracked address has any
     * outflow in the group; asset entries are omitted when the corresponding
     * total is zero.
     */
    subtotals: AssetSubtotal[];
    /** Itemized outflows contributing to `subtotals`, one entry per transaction. */
    payments: AssetPayment[];
};
/**
 * Aggregate per-asset outflows attributable to `trackedAddress` across every
 * transaction (top-level + inner, recursive) in a simulate response.
 *
 * This is the *net cost from the tracked account's perspective* — what leaves
 * its balance when the group executes. It intentionally does NOT subtract
 * inbound transfers, because `build.usePlugin` callers want the "how much do
 * I need to cover" number, not a net P&L view.
 *
 * Fees are counted per-txn where the tracked address is the sender. Because
 * utils10 distributes inner-txn fees up to the calling app-call's fee field
 * during `coverAppCallInnerTransactionFees`, inner transactions themselves
 * typically have fee=0 in the simulate response — the tracked address only
 * "sees" fees when it is the top-level sender of a txn that the utils10 pass
 * pooled fees onto. This matches real-world execution semantics.
 *
 * @param simulateResponse - The response from the simulate call that was
 *   captured during `composer.build()` in `prepareGroup`. Exactly one txn
 *   group is expected (`txnGroups[0]`).
 * @param trackedAddress - Address whose outflows we want to aggregate. Pass
 *   a canonical base32 string (e.g. `wallet.client.appAddress.toString()`).
 * @returns An `ExpectedCost` snapshot suitable for attaching to
 *   `ExecutionBuildGroup.expectedCost`.
 */
export declare function computeExpectedCost(simulateResponse: SimulateResponse, trackedAddress: string): ExpectedCost;
