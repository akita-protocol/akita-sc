import algosdk, { type modelsv2 } from 'algosdk';
import type { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import type { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer';
import { AppManager } from '@algorandfoundation/algokit-utils/types/app-manager';
import { waitForConfirmation } from '@algorandfoundation/algokit-utils';
import { encodeLease } from '@algorandfoundation/algokit-utils';
import type { ABIReturn } from '@algorandfoundation/algokit-utils/types/app';
import { buildAccessListGroup } from './access-list';
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
export async function prepareGroup(composer: TransactionComposer, overrides: ForceOptions = {}): Promise<PreparedGroup> {
  const sender = typeof overrides.sender === 'string' ? algosdk.Address.fromString(overrides.sender) : overrides.sender;
  const lease = overrides.lease === undefined ? undefined : encodeLease(overrides.lease);
  const built = await buildAccessListGroup(composer, { populateAppCallResources: true, coverAppCallInnerTransactionFees: true }, (group) => {
    group.forEach((item, index) => {
      if (sender && (!overrides.senderIndexes || overrides.senderIndexes.has(index))) {
        (item.txn as unknown as { sender: algosdk.Address }).sender = sender;
      }
      if (overrides.signer) item.signer = overrides.signer;
      if (lease && index === 0) (item.txn as unknown as { lease: Uint8Array }).lease = lease;
    });
  });
  const transactions = built.transactions.map(({ txn }, index) => {
    const copy = algosdk.decodeUnsignedTransaction(algosdk.encodeUnsignedTransaction(txn));
    copy.group = undefined;
    if (overrides.firstValid !== undefined) (copy as unknown as { firstValid: bigint }).firstValid = overrides.firstValid;
    if (overrides.lastValid !== undefined) (copy as unknown as { lastValid: bigint }).lastValid = overrides.lastValid;
    if (!overrides.consolidateFees && overrides.fees?.has(index)) copy.fee = overrides.fees.get(index)!.microAlgo;
    return copy;
  });
  if (overrides.consolidateFees && transactions.length) {
    const total = transactions.reduce((sum, txn) => sum + txn.fee, 0n);
    transactions.forEach((txn, index) => { txn.fee = index === 0 ? total : 0n; });
  }
  algosdk.assignGroupID(transactions);
  return { transactions, signers: built.transactions.map(({ signer }) => signer), groupId: Buffer.from(transactions[0].group!).toString('base64'), methodCalls: built.methodCalls, simulateResponse: built.simulateResponse };
}

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
  await algod.sendRawTransaction(signedTxns).do();

  const firstConfirmation = await waitForConfirmation(
    txIds[0],
    waitRounds,
    algod
  );
  const confirmations: PendingTransactionResponse[] = [firstConfirmation];
  for (let i = 1; i < txIds.length; i++) {
    confirmations.push(await algod.pendingTransactionInformation(txIds[i]).do());
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
