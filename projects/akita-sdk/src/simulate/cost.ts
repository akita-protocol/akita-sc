import { PendingTransactionResponse, SimulateResponse } from "@algorandfoundation/algokit-utils/algod-client";
import { TransactionType } from "@algorandfoundation/algokit-utils/transact";

const MIN_TXN_FEE_MICROALGOS = 1_000n;

// -----------------------------------------------------------------------------
// Expected-cost extraction from a simulate response
// -----------------------------------------------------------------------------
//
// Given a `SimulateResponse` (the one utils10 runs inside `composer.build()`
// for resource population + inner-fee coverage), aggregate per-asset outflows
// attributable to a single tracked address across the entire group — top-level
// transactions plus every inner transaction, recursively.
//
// Intended consumer: `WalletSDK.build.usePlugin` attaches the result to
// `ExecutionBuildGroup.expectedCost` so callers can preview the exact ALGO +
// asset delta the tracked account will see at send time — without paying for
// a second simulate round-trip.

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
 * Normalize an address-like value (`Address` instance, plain object, or string)
 * to a canonical base32 string for comparison.
 *
 * Simulate-response transactions arrive as `algokit-common` `Address` objects,
 * but the tracked address may have come in as a plain string. We bounce through
 * `.toString()` so `instanceof` differences between algokit-common's `Address`
 * and algosdk's `Address` (they're distinct classes) don't bite us.
 */
function addressToString(addr: unknown): string | undefined {
  if (addr === undefined || addr === null) return undefined;
  if (typeof addr === "string") return addr;
  if (typeof (addr as { toString?: () => string }).toString === "function") {
    return (addr as { toString: () => string }).toString();
  }
  return undefined;
}

/**
 * Walk a `PendingTransactionResponse` (top-level or inner) and add any outflow
 * attributable to `tracked` into the running accumulator. Recurses into
 * `innerTxns` depth-first.
 *
 * @param ptr - The pending transaction response to inspect.
 * @param tracked - Canonical base32 address we're attributing outflow to.
 * @param payments - Accumulator mutated with any outflow entries found.
 * @param feeAcc - Accumulator mutated with fee units seen during execution.
 *   Simulate responses can preserve app-call maxFee values that were only used
 *   as caps for inner-fee coverage, so `networkFees` counts executed
 *   transactions at the protocol minimum instead of summing those max fees.
 */
function collectOutflows(
  ptr: PendingTransactionResponse,
  tracked: string,
  payments: AssetPayment[],
  feeAcc: { total: bigint }
): void {
  const signed = ptr.txn;
  const txn = signed?.txn;
  if (!txn) {
    // Shouldn't happen for a valid simulate response, but guard against
    // malformed entries so we don't crash when some other simulate caller
    // hands us a trimmed response.
    for (const inner of ptr.innerTxns ?? []) {
      collectOutflows(inner, tracked, payments, feeAcc);
    }
    return;
  }

  const sender = addressToString(txn.sender);
  const rawFee = BigInt(txn.fee ?? 0n);
  const fee = rawFee > 0n ? MIN_TXN_FEE_MICROALGOS : 0n;

  // `networkFees` counts all executed transactions in the group, not just the
  // tracked address's fees. Use one minimum-fee unit per transaction instead
  // of the simulated txn.fee, which may be an app-call maxFee cap.
  feeAcc.total += MIN_TXN_FEE_MICROALGOS;

  if (sender === tracked) {
    // Principal outflow (payment / asset transfer) first, then fee. Keeping
    // them as separate entries makes the `payments[]` breakdown legible in
    // UI: "you sent 5 ALGO to X" + "you paid 0.001 ALGO in fees".
    if (txn.type === TransactionType.Payment && txn.payment) {
      const receiver = addressToString(txn.payment.receiver) ?? "";
      const closeTo = addressToString(txn.payment.closeRemainderTo);
      const principal = BigInt(txn.payment.amount ?? 0n);
      if (principal > 0n || closeTo) {
        payments.push({
          asset: 0n,
          amount: principal,
          sender,
          receiver,
          closeRemainderTo: closeTo,
        });
      }
      // `closingAmount` is the amount swept to `closeRemainderTo` after the
      // principal transfer (the sender's remaining balance minus fees). Only
      // populated by the simulator when `closeRemainderTo` is set.
      if (closeTo) {
        const closeAmount = BigInt(ptr.closingAmount ?? 0n);
        if (closeAmount > 0n) {
          payments.push({
            asset: 0n,
            amount: closeAmount,
            sender,
            receiver: closeTo,
            closeRemainderTo: closeTo,
          });
        }
      }
    } else if (txn.type === TransactionType.AssetTransfer && txn.assetTransfer) {
      const at = txn.assetTransfer;
      // Clawback: `assetSender` is set and the *clawback admin* (sender) is
      // moving someone else's asset. In that case the principal leaves
      // `assetSender`, NOT the tracked address (which is the clawback admin).
      // Only count principal if this isn't a clawback.
      const assetSenderStr = addressToString(at.assetSender);
      const principal = BigInt(at.amount ?? 0n);
      const receiver = addressToString(at.receiver) ?? "";
      const closeTo = addressToString(at.closeRemainderTo);
      if (!assetSenderStr && (principal > 0n || closeTo)) {
        payments.push({
          asset: BigInt(at.assetId),
          amount: principal,
          sender,
          receiver,
          closeRemainderTo: closeTo,
        });
      }
      if (!assetSenderStr && closeTo) {
        const closeAmount = BigInt(ptr.assetClosingAmount ?? 0n);
        if (closeAmount > 0n) {
          payments.push({
            asset: BigInt(at.assetId),
            amount: closeAmount,
            sender,
            receiver: closeTo,
            closeRemainderTo: closeTo,
          });
        }
      }
    }
    // AppCall / KeyReg / AssetConfig / AssetFreeze / etc. have no principal
    // transfer — only the fee affects the tracked account's balance.

    if (fee > 0n) {
      payments.push({
        asset: 0n,
        amount: fee,
        sender,
        receiver: null,
        isFee: true,
      });
    }
  }

  // Recurse into inner transactions. Their senders are usually contract
  // app accounts (e.g. the wallet's app address for wallet-issued inner txns,
  // or an escrow app address for escrow-issued ones) — which is exactly the
  // scenario `tracked === walletAppAddress` is designed to catch.
  for (const inner of ptr.innerTxns ?? []) {
    collectOutflows(inner, tracked, payments, feeAcc);
  }
}

/**
 * Roll the per-entry `payments[]` into per-asset totals. Guarantees an
 * `asset === 0n` entry exists so downstream consumers can `.find(a => a.asset === 0n)`
 * without a presence check when there are mixed-asset payments but no ALGO
 * outflow. Zero-sum asset entries are filtered out to keep the shape tight.
 */
function buildSubtotals(payments: AssetPayment[]): AssetSubtotal[] {
  const totals = new Map<bigint, bigint>();
  for (const p of payments) {
    totals.set(p.asset, (totals.get(p.asset) ?? 0n) + p.amount);
  }
  const result: AssetSubtotal[] = [];
  // Emit ALGO first so consumers can rely on stable ordering in UI lists.
  if (totals.has(0n)) {
    result.push({ asset: 0n, amount: totals.get(0n)! });
    totals.delete(0n);
  }
  for (const [asset, amount] of totals) {
    if (amount > 0n) {
      result.push({ asset, amount });
    }
  }
  return result;
}

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
export function computeExpectedCost(
  simulateResponse: SimulateResponse,
  trackedAddress: string
): ExpectedCost {
  const payments: AssetPayment[] = [];
  const feeAcc = { total: 0n };

  const group = simulateResponse.txnGroups?.[0];
  if (group) {
    for (const result of group.txnResults ?? []) {
      if (result?.txnResult) {
        collectOutflows(result.txnResult, trackedAddress, payments, feeAcc);
      }
    }
  }

  const subtotals = buildSubtotals(payments);
  const algoSubtotal = subtotals.find(s => s.asset === 0n)?.amount ?? 0n;

  return {
    totalAlgo: algoSubtotal,
    networkFees: feeAcc.total,
    subtotals,
    payments,
  };
}
