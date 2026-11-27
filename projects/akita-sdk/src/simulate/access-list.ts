import algosdk, { Address, getApplicationAddress, TransactionType } from 'algosdk';
import { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer';
import { AlgorandClientTransactionSender } from '@algorandfoundation/algokit-utils/types/algorand-client-transaction-sender';
import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import type { SendParams } from '@algorandfoundation/algokit-utils/types/transaction';
import type { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { simulateWithUsage, usageFeeSurcharge } from './usage';
type Transaction = Omit<algosdk.Transaction, 'applicationCall'> & {
  applicationCall?: { -readonly [K in keyof algosdk.ApplicationTransactionFields]: algosdk.ApplicationTransactionFields[K] };
};
type ResourceReference = algosdk.TransactionResourceReference;
export type SimulateUnnamedResourcesAccessed = {
  accounts?: Address[]; assets?: bigint[]; apps?: bigint[];
  assetHoldings?: Array<{ address: Address; assetIndex: bigint }>;
  appLocals?: Array<{ address: Address; appIndex: bigint }>;
  boxes?: Array<{ appIndex: bigint; name: Uint8Array }>;
  extraBoxRefs?: number;
};
/** Consensus-v41 limit for `txn.Access`. */
export const MAX_ACCESS_LIST_ENTRIES = 16;

/** Maximum extra budget accepted by algod's simulate endpoint. */
export const ACCESS_DISCOVERY_OPCODE_BUDGET = 320_000;

/** ABI selector for `opUp()void`. */
const OP_UP_SELECTOR = new Uint8Array([0x85, 0x4d, 0xed, 0xe0]);

/** ABI selector for the ARC-58 wallet's readonly `arc58_getAdmin()address`. */
const ARC58_GET_ADMIN_SELECTOR = new Uint8Array([0x13, 0xbc, 0x44, 0xe4]);

const DEFAULT_CARRIER_MAX_FEE = microAlgo(257_000n);

type TransactionAnalysis = {
  requiredFeeDelta?: unknown;
  unnamedResourcesAccessed?: SimulateUnnamedResourcesAccessed;
};

type SimulationTransactionResult = {
  txnResult?: SimulationPendingTransactionResult;
  unnamedResourcesAccessed?: SimulateUnnamedResourcesAccessed;
};

type SimulationPendingTransactionResult = {
  appIndex?: bigint;
  innerTxns?: SimulationPendingTransactionResult[];
};

type SimulationGroupResult = {
  groupUsage?: bigint;
  txnResults?: SimulationTransactionResult[];
  unnamedResourcesAccessed?: SimulateUnnamedResourcesAccessed;
  appBudgetAdded?: number;
  appBudgetConsumed?: number;
  failureMessage?: string;
  failedAt?: number[];
};

export type ComposerGroupAnalysis = {
  transactions: TransactionAnalysis[];
  unnamedResourcesAccessed?: SimulateUnnamedResourcesAccessed;
  requiredOpcodeCarriers?: number;
  createdAppIds?: bigint[];
  accessListFeeParams?: { feePerByte: bigint; minFee: bigint };
};


type PlannedAccess = {
  groupIndex: number;
  transaction: Transaction;
  references: ResourceReference[];
};

const ACCESS_LIST_PATCH = Symbol.for("@akta/sdk/access-list-resource-populator");
const SINGLE_SEND_RESULT_PATCH = Symbol.for("@akta/sdk/access-list-single-send-result");
const ACCESS_CARRIER_REGISTRY = Symbol.for("@akta/sdk/access-list-carrier-registry");
const accessListRepairs = new WeakMap<object, ComposerGroupAnalysis>();
const accessListRepairKeys = new WeakMap<object, Set<string>>();

type CarrierRegistryHost = {
  [ACCESS_CARRIER_REGISTRY]?: Map<string, Uint8Array>;
};

function registeredAccessCarrierApps(algod: object): ReadonlyMap<string, Uint8Array> {
  // Proxies used by prepareGroup/analyzeGroupRequirements forward symbol reads
  // to the real algod client, preserving the network-scoped registry.
  return (algod as CarrierRegistryHost)[ACCESS_CARRIER_REGISTRY] ?? new Map<string, Uint8Array>();
}

type SingleSendResult = {
  transactions: Transaction[];
  confirmations: unknown[];
  txIds: string[];
  transaction?: Transaction;
  confirmation?: unknown;
  txId?: string;
  [key: string]: unknown;
};

function isAutomaticCarrierTransaction(transaction: Transaction): boolean {
  const note = transaction.note;
  return Boolean(
    transaction.type === TransactionType.appl &&
      note &&
      new TextDecoder().decode(note).startsWith("akta-access-carrier-"),
  );
}

/**
 * AlgoKit's one-shot send helpers expose the final transaction as their public
 * result. Auto-carriers are inserted beside the authorized app call and may be
 * physically last, so select the last caller-authored transaction instead.
 */
function installSingleSendResultCompatibility(): void {
  const prototype = AlgorandClientTransactionSender.prototype as unknown as {
    [SINGLE_SEND_RESULT_PATCH]?: boolean;
    _send(
      composerCall: unknown,
      log: unknown,
    ): (params: unknown) => Promise<SingleSendResult>;
  };
  if (prototype[SINGLE_SEND_RESULT_PATCH]) return;

  const originalSend = prototype._send;
  prototype._send = function patchedSingleSend(
    composerCall: unknown,
    log: unknown,
  ): (params: unknown) => Promise<SingleSendResult> {
    const send = originalSend.call(this, composerCall, log);
    return async (params: unknown) => {
      const result = await send(params);
      let selectedIndex = -1;
      for (let index = result.transactions.length - 1; index >= 0; index -= 1) {
        if (!isAutomaticCarrierTransaction(result.transactions[index])) {
          selectedIndex = index;
          break;
        }
      }
      if (selectedIndex < 0 || selectedIndex === result.transactions.length - 1) return result;
      return {
        ...result,
        transaction: result.transactions[selectedIndex],
        confirmation: result.confirmations[selectedIndex],
        txId: result.txIds[selectedIndex],
      };
    };
  };
  prototype[SINGLE_SEND_RESULT_PATCH] = true;
}

export class AccessListCapacityError extends Error {
  constructor(
    message: string,
    public readonly requiredCarrierCount: number,
  ) {
    super(message);
    this.name = "AccessListCapacityError";
  }
}

/**
 * Register an SDK app that can safely receive automatically-added resource
 * carrier calls. Registration is derived from the generated client's ARC-56
 * spec and scoped to one algod client, so apps from another network are never
 * called speculatively. Most apps use `opUp()void`; the size-constrained
 * ARC-58 wallet uses its readonly, zero-argument admin getter instead.
 */
export function registerAccessListResourceCarrier(
  appId: bigint,
  appSpec?: {
    methods?: Array<{
      name?: string;
      args?: unknown[];
      returns?: { type?: string };
      readonly?: boolean;
    }>;
  },
  algod?: object,
): void {
  if (appId <= 0n || !algod) return;

  const methods = appSpec?.methods ?? [];
  const selector = methods.some(
    (method) => method.name === "opUp" && method.args?.length === 0 && method.returns?.type === "void",
  )
    ? OP_UP_SELECTOR
    : methods.some(
          (method) =>
            method.name === "arc58_getAdmin" &&
            method.args?.length === 0 &&
            method.returns?.type === "address" &&
            method.readonly === true,
        )
      ? ARC58_GET_ADMIN_SELECTOR
      : undefined;
  if (!selector) return;

  const host = algod as CarrierRegistryHost;
  host[ACCESS_CARRIER_REGISTRY] ??= new Map<string, Uint8Array>();
  host[ACCESS_CARRIER_REGISTRY]!.set(appId.toString(), selector);
}

function bytesKey(value: Uint8Array): string {
  return Array.from(value, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function isZeroAddress(address: Address): boolean {
  return address.equals(Address.zeroAddress());
}

function isLiteralZeroAddressReference(reference: ResourceReference): boolean {
  return reference.address !== undefined && isZeroAddress(reference.address);
}

function isEmptyBoxReference(reference: ResourceReference): boolean {
  return reference.box !== undefined && reference.box.appIndex === 0n && reference.box.name.length === 0;
}

function effectiveAddress(address: Address, transaction: Transaction): Address {
  return isZeroAddress(address) ? transaction.sender : address;
}

function effectiveAppId(appId: bigint, transaction: Transaction): bigint {
  return appId === 0n ? transaction.applicationCall!.appIndex : appId;
}

function normalizeReference(reference: ResourceReference, transaction: Transaction): ResourceReference | undefined {
  const appCall = transaction.applicationCall!;

  if (reference.address) {
    if (reference.address.equals(transaction.sender)) return undefined;
    return { address: reference.address };
  }
  if (reference.assetIndex !== undefined) return { assetIndex: reference.assetIndex };
  if (reference.appIndex !== undefined) {
    if (reference.appIndex === 0n || reference.appIndex === appCall.appIndex) return undefined;
    return { appIndex: reference.appIndex };
  }
  if (reference.holding) {
    return {
      holding: {
        address: reference.holding.address.equals(transaction.sender) ? Address.zeroAddress() : reference.holding.address,
        assetIndex: reference.holding.assetIndex,
      },
    };
  }
  if (reference.locals) {
    const address = reference.locals.address.equals(transaction.sender) ? Address.zeroAddress() : reference.locals.address;
    const appId = reference.locals.appIndex === appCall.appIndex ? 0n : reference.locals.appIndex;

    // The sender's local state for the current app is inherently available.
    if (isZeroAddress(address) && appId === 0n) return undefined;
    return { locals: { address, appIndex: appId } };
  }
  if (reference.box) {
    return {
      box: {
        appIndex: reference.box.appIndex === 0n || reference.box.appIndex === appCall.appIndex ? 0n : reference.box.appIndex,
        name: reference.box.name,
      },
    };
  }
  return undefined;
}

function referenceKey(reference: ResourceReference, transaction: Transaction): string | undefined {
  if (reference.address) return `d:${reference.address.toString()}`;
  if (reference.assetIndex !== undefined) return `s:${reference.assetIndex}`;
  if (reference.appIndex !== undefined) return `p:${effectiveAppId(reference.appIndex, transaction)}`;
  if (reference.holding) {
    return `h:${effectiveAddress(reference.holding.address, transaction).toString()}:${reference.holding.assetIndex}`;
  }
  if (reference.locals) {
    return `l:${effectiveAddress(reference.locals.address, transaction).toString()}:${effectiveAppId(reference.locals.appIndex, transaction)}`;
  }
  if (reference.box) {
    return `b:${effectiveAppId(reference.box.appIndex, transaction)}:${bytesKey(reference.box.name)}`;
  }
  return undefined;
}

/**
 * Return the number of wire entries produced by AlgoKit's access-reference
 * encoder. Composite references implicitly insert their address/app/asset
 * dependencies, so `references.length` is not the protocol size.
 */
export function accessListEntryCount(transaction: Transaction, references: readonly ResourceReference[]): number {
  const primitiveEntries = new Set<string>();
  let compositeEntries = 0;

  const ensureLiteralAddress = (address: Address) => {
    if (!address.equals(transaction.sender)) primitiveEntries.add(`d:${address.toString()}`);
  };
  const ensureCompositeAddress = (address: Address) => {
    const actual = effectiveAddress(address, transaction);
    if (!actual.equals(transaction.sender)) primitiveEntries.add(`d:${actual.toString()}`);
  };
  const ensureAsset = (assetId: bigint) => primitiveEntries.add(`s:${assetId}`);
  const ensureApp = (appId: bigint) => {
    const actual = effectiveAppId(appId, transaction);
    if (actual !== transaction.applicationCall!.appIndex) primitiveEntries.add(`p:${actual}`);
  };

  for (const rawReference of references) {
    const reference = normalizeReference(rawReference, transaction);
    if (!reference) continue;

    // Access indices are one-based: address index 0 always aliases Txn.sender.
    // A literal all-zero account therefore has to remain in a legacy Accounts
    // array on a separate group-shared app call.
    if (isLiteralZeroAddressReference(reference)) continue;

    if (reference.address) ensureLiteralAddress(reference.address);
    else if (reference.assetIndex !== undefined) ensureAsset(reference.assetIndex);
    else if (reference.appIndex !== undefined) ensureApp(reference.appIndex);
    else if (reference.holding) {
      ensureCompositeAddress(reference.holding.address);
      ensureAsset(reference.holding.assetIndex);
      compositeEntries += 1;
    } else if (reference.locals) {
      ensureCompositeAddress(reference.locals.address);
      ensureApp(reference.locals.appIndex);
      compositeEntries += 1;
    } else if (reference.box) {
      ensureApp(reference.box.appIndex);
      compositeEntries += 1;
    }
  }

  return primitiveEntries.size + compositeEntries;
}

function providedResourceKeys(plan: PlannedAccess): Set<string> {
  const result = new Set<string>();

  for (const rawReference of plan.references) {
    const reference = normalizeReference(rawReference, plan.transaction);
    if (!reference) continue;
    if (isLiteralZeroAddressReference(reference)) continue;

    const key = referenceKey(reference, plan.transaction);
    if (key) result.add(key);

    // Composite references also expose their dependency resources.
    if (reference.holding) {
      const address = effectiveAddress(reference.holding.address, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`s:${reference.holding.assetIndex}`);
    } else if (reference.locals) {
      const address = effectiveAddress(reference.locals.address, plan.transaction);
      const appId = effectiveAppId(reference.locals.appIndex, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`p:${appId}`);
    } else if (reference.box) {
      result.add(`p:${effectiveAppId(reference.box.appIndex, plan.transaction)}`);
    }
  }

  // These two resources are always available to an app call.
  result.add(`d:${plan.transaction.sender.toString()}`);
  result.add(`p:${plan.transaction.applicationCall!.appIndex}`);
  return result;
}

function hasResource(plans: readonly PlannedAccess[], reference: ResourceReference): boolean {
  for (const plan of plans) {
    const normalized = normalizeReference(reference, plan.transaction);
    if (!normalized) return true;
    const key = referenceKey(normalized, plan.transaction);
    if (key && providedResourceKeys(plan).has(key)) return true;
  }
  return false;
}

function addToTransaction(plan: PlannedAccess, reference: ResourceReference, allowDuplicate = false): boolean {
  const normalized = normalizeReference(reference, plan.transaction);
  if (!normalized) return true;

  // Consensus v41 does not yet allow a Locals ref to use app index 0. The
  // current JS encoders always collapse `locals.appIndex === called appId` to 0,
  // so place that composite on a call to a different app instead. (The
  // resource remains group-shared.)
  if (
    normalized.locals &&
    !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) &&
    effectiveAppId(normalized.locals.appIndex, plan.transaction) === plan.transaction.applicationCall!.appIndex
  ) {
    return false;
  }

  const key = referenceKey(normalized, plan.transaction);
  if (!allowDuplicate && key && providedResourceKeys(plan).has(key)) return true;

  const proposed = [...plan.references, normalized];
  if (accessListEntryCount(plan.transaction, proposed) > MAX_ACCESS_LIST_ENTRIES) return false;
  plan.references = proposed;
  return true;
}

function hasLegacyIndexedReferences(transaction: Transaction): boolean {
  return (
    transaction.type === TransactionType.appl &&
    transaction.applicationCall !== undefined &&
    ((transaction.applicationCall.accounts?.length ?? 0) > 0 ||
      (transaction.applicationCall.foreignAssets?.length ?? 0) > 0 ||
      (transaction.applicationCall.foreignApps?.length ?? 0) > 0)
  );
}

function legacyReferenceCount(transaction: Transaction): number {
  const appCall = transaction.applicationCall!;
  return (
    (appCall.accounts?.length ?? 0) +
    (appCall.foreignAssets?.length ?? 0) +
    (appCall.foreignApps?.length ?? 0) +
    (appCall.boxes?.length ?? 0)
  );
}

/**
 * `txn.Access` uses index zero as the sender/current-app alias, so it cannot
 * represent the literal all-zero account. Preserve that rare resource through
 * a legacy Accounts entry on one group-shared app call. A dedicated automatic
 * carrier is requested only when every existing call is already Access-based
 * or has exhausted the conservative legacy limits.
 */
function provideLiteralZeroAddress(transactions: readonly Transaction[]): void {
  const zeroAddress = Address.zeroAddress();
  const appTransactions = transactions.filter(
    (transaction) => transaction.type === TransactionType.appl && transaction.applicationCall !== undefined,
  );

  for (const transaction of appTransactions) {
    const appCall = transaction.applicationCall!;
    appCall.access = appCall.access?.filter(
      (reference) => !isLiteralZeroAddressReference(reference),
    );
    if (appCall.access?.length === 0) appCall.access = [];
  }

  if (
    appTransactions.some((transaction) =>
      transaction.applicationCall!.accounts?.some((address) => isZeroAddress(address)),
    )
  ) {
    return;
  }

  const candidate = appTransactions
    .filter((transaction) => {
      const appCall = transaction.applicationCall!;
      return (
        (appCall.access?.length ?? 0) === 0 &&
        (appCall.accounts?.length ?? 0) < 4 &&
        legacyReferenceCount(transaction) < 8
      );
    })
    .sort((first, second) => {
      const firstCarrier = isAutomaticCarrierTransaction(first) ? 0 : 1;
      const secondCarrier = isAutomaticCarrierTransaction(second) ? 0 : 1;
      const firstLegacy = hasLegacyIndexedReferences(first) ? 0 : 1;
      const secondLegacy = hasLegacyIndexedReferences(second) ? 0 : 1;
      return firstCarrier - secondCarrier || firstLegacy - secondLegacy;
    })[0];

  if (!candidate) {
    throw new AccessListCapacityError(
      "A literal zero-address account requires one legacy resource-carrier call.",
      1,
    );
  }

  candidate.applicationCall!.accounts = [
    ...(candidate.applicationCall!.accounts ?? []),
    zeroAddress,
  ];
}

function addToBestTransaction(plans: readonly PlannedAccess[], reference: ResourceReference, allowDuplicate = false): boolean {
  if (!allowDuplicate && hasResource(plans, reference)) return true;

  const candidates = plans
    .map((plan, index) => {
      const normalized = normalizeReference(reference, plan.transaction);
      if (!normalized) return { index, incremental: 0, total: accessListEntryCount(plan.transaction, plan.references) };
      if (
        normalized.locals &&
        !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) &&
        effectiveAppId(normalized.locals.appIndex, plan.transaction) === plan.transaction.applicationCall!.appIndex
      ) {
        return { index, incremental: Number.POSITIVE_INFINITY, total: Number.POSITIVE_INFINITY };
      }
      const before = accessListEntryCount(plan.transaction, plan.references);
      const after = accessListEntryCount(plan.transaction, [...plan.references, normalized]);
      return { index, incremental: after - before, total: after };
    })
    .filter(({ total }) => total <= MAX_ACCESS_LIST_ENTRIES)
    .sort((a, b) => a.incremental - b.incremental || a.total - b.total || a.index - b.index);

  const candidate = candidates[0];
  return Boolean(candidate && addToTransaction(plans[candidate.index], reference, allowDuplicate));
}

function virtualCarrier(template: PlannedAccess): PlannedAccess {
  const { transaction } = template;
  return {
    groupIndex: -1,
    references: [],
    transaction: new algosdk.Transaction({
      type: algosdk.TransactionType.appl,
      sender: transaction.sender,
      suggestedParams: { fee: 0, minFee: 1000, firstValid: transaction.firstValid, lastValid: transaction.lastValid },
      appCallParams: { appIndex: transaction.applicationCall!.appIndex, onComplete: transaction.applicationCall!.onComplete },
    }) as Transaction,
  };
}

function transactionResources(
  resources?: SimulateUnnamedResourcesAccessed,
  createdAppIds: ReadonlySet<bigint> = new Set(),
): ResourceReference[] {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => getApplicationAddress(appId).toString()),
  );
  return [
    ...(resources.accounts ?? [])
      .filter((address) => !isZeroAddress(address))
      .filter((address) => !createdAppAddresses.has(address.toString()))
      .map((address) => ({ address })),
    ...(resources.assets ?? []).map((assetId) => ({ assetIndex: assetId })),
    ...(resources.apps ?? [])
      .filter((appId) => !createdAppIds.has(appId))
      .map((appId) => ({ appIndex: appId })),
    ...(resources.assetHoldings ?? []).map((holding) => ({ holding })),
    ...(resources.appLocals ?? []).map((locals) => ({ locals })),
    ...(resources.boxes ?? []).filter((box) => !createdAppIds.has(box.appIndex)).map((box) => ({ box })),
  ];
}

function groupResources(
  resources?: SimulateUnnamedResourcesAccessed,
  createdAppIds: ReadonlySet<bigint> = new Set(),
): ResourceReference[] {
  if (!resources) return [];
  const createdAppAddresses = new Set(
    Array.from(createdAppIds, (appId) => getApplicationAddress(appId).toString()),
  );

  // Add composites first. Their dependency entries also provide the simple
  // resources, which produces smaller access lists than adding simple refs first.
  return [
    ...(resources.appLocals ?? []).map((locals) => ({ locals })),
    ...(resources.assetHoldings ?? []).map((holding) => ({ holding })),
    ...(resources.boxes ?? []).filter((box) => !createdAppIds.has(box.appIndex)).map((box) => ({ box })),
    ...(resources.accounts ?? [])
      .filter((address) => !isZeroAddress(address))
      .filter((address) => !createdAppAddresses.has(address.toString()))
      .map((address) => ({ address })),
    ...(resources.assets ?? []).map((assetId) => ({ assetIndex: assetId })),
    ...(resources.apps ?? [])
      .filter((appId) => !createdAppIds.has(appId))
      .map((appId) => ({ appIndex: appId })),
  ];
}

function hasUnnamedResources(resources?: SimulateUnnamedResourcesAccessed): boolean {
  return Boolean(
    resources &&
      ((resources.accounts?.length ?? 0) > 0 ||
        (resources.assets?.length ?? 0) > 0 ||
        (resources.apps?.length ?? 0) > 0 ||
        (resources.assetHoldings?.length ?? 0) > 0 ||
        (resources.appLocals?.length ?? 0) > 0 ||
        (resources.boxes?.length ?? 0) > 0 ||
        (resources.extraBoxRefs ?? 0) > 0),
  );
}

function mergeUnnamedResources(
  first?: SimulateUnnamedResourcesAccessed,
  second?: SimulateUnnamedResourcesAccessed,
): SimulateUnnamedResourcesAccessed | undefined {
  if (!hasUnnamedResources(first) && !hasUnnamedResources(second)) return undefined;

  const merged: SimulateUnnamedResourcesAccessed = {
    accounts: [...(first?.accounts ?? []), ...(second?.accounts ?? [])],
    assets: [...(first?.assets ?? []), ...(second?.assets ?? [])],
    apps: [...(first?.apps ?? []), ...(second?.apps ?? [])],
    assetHoldings: [...(first?.assetHoldings ?? []), ...(second?.assetHoldings ?? [])],
    appLocals: [...(first?.appLocals ?? []), ...(second?.appLocals ?? [])],
    boxes: [...(first?.boxes ?? []), ...(second?.boxes ?? [])],
    extraBoxRefs: (first?.extraBoxRefs ?? 0) + (second?.extraBoxRefs ?? 0),
  };
  return merged;
}

function mergeGroupAnalysis(
  original: ComposerGroupAnalysis | undefined,
  repairs: ComposerGroupAnalysis | undefined,
  transactionCount: number,
): ComposerGroupAnalysis | undefined {
  if (!original && !repairs) return undefined;

  return {
    transactions: Array.from({ length: transactionCount }, (_, index) => ({
      ...(original?.transactions[index] ?? {}),
      unnamedResourcesAccessed: mergeUnnamedResources(
        original?.transactions[index]?.unnamedResourcesAccessed,
        repairs?.transactions[index]?.unnamedResourcesAccessed,
      ),
    })),
    unnamedResourcesAccessed: mergeUnnamedResources(
      original?.unnamedResourcesAccessed,
      repairs?.unnamedResourcesAccessed,
    ),
    requiredOpcodeCarriers: original?.requiredOpcodeCarriers,
    accessListFeeParams: original?.accessListFeeParams,
    createdAppIds: [
      ...new Set([...(original?.createdAppIds ?? []), ...(repairs?.createdAppIds ?? [])]),
    ],
  };
}

function filterNewRepairResources(
  composer: object,
  scope: string,
  resources?: SimulateUnnamedResourcesAccessed,
): SimulateUnnamedResourcesAccessed | undefined {
  if (!hasUnnamedResources(resources)) return undefined;

  let keys = accessListRepairKeys.get(composer);
  if (!keys) {
    keys = new Set<string>();
    accessListRepairKeys.set(composer, keys);
  }

  const filtered: SimulateUnnamedResourcesAccessed = {};
  const add = <T>(field: keyof SimulateUnnamedResourcesAccessed, key: string, value: T): void => {
    const scopedKey = `${scope}:${key}`;
    if (keys!.has(scopedKey)) return;
    keys!.add(scopedKey);
    const values = (filtered[field] ?? []) as T[];
    values.push(value);
    (filtered as unknown as Record<string, unknown>)[field] = values;
  };

  for (const value of resources?.accounts ?? []) add("accounts", `d:${value.toString()}`, value);
  for (const value of resources?.assets ?? []) add("assets", `s:${value}`, value);
  for (const value of resources?.apps ?? []) add("apps", `p:${value}`, value);
  for (const value of resources?.assetHoldings ?? []) {
    add("assetHoldings", `h:${value.address.toString()}:${value.assetIndex}`, value);
  }
  for (const value of resources?.appLocals ?? []) {
    add("appLocals", `l:${value.address.toString()}:${value.appIndex}`, value);
  }
  for (const value of resources?.boxes ?? []) {
    add("boxes", `b:${value.appIndex}:${bytesKey(value.name)}`, value);
  }

  // Unlike semantic resources, each extra box ref is intentionally another
  // identical Access entry and contributes an additional 2 KiB of IO budget.
  if ((resources?.extraBoxRefs ?? 0) > 0) filtered.extraBoxRefs = resources!.extraBoxRefs;
  return hasUnnamedResources(filtered) ? filtered : undefined;
}

export function unavailableResourceFromFailure(message: string): SimulateUnnamedResourcesAccessed | undefined {
  // An inner app call makes the callee's local state for every account it
  // passes "accessible", so the AVM checks the caller has that Local State at
  // itxn_submit. Simulate does not report this pair as an unnamed resource,
  // and Access, unlike legacy foreign arrays, has no implicit account x app
  // cross-product, so the pair only surfaces as a strict failure.
  const locals = /unavailable Local State (\d+)\+([A-Z2-7]{58})/.exec(message);
  if (locals) return { appLocals: [{ appIndex: BigInt(locals[1]), address: Address.fromString(locals[2]) }] };

  const holding = /unavailable Holding (?:(\d+)\+([A-Z2-7]{58})|([A-Z2-7]{58})\+(\d+))/.exec(message);
  if (holding) {
    return {
      assetHoldings: [{
        assetIndex: BigInt(holding[1] ?? holding[4]),
        address: Address.fromString(holding[2] ?? holding[3]),
      }],
    };
  }

  const account = /unavailable Account ([A-Z2-7]{58})/.exec(message)?.[1];
  if (account) return { accounts: [Address.fromString(account)] };

  const app = /unavailable App(?:lication)? (\d+)/i.exec(message)?.[1];
  if (app) return { apps: [BigInt(app)] };

  const asset = /unavailable Asset (\d+)/i.exec(message)?.[1];
  if (asset) return { assets: [BigInt(asset)] };
  return undefined;
}

function providedExtraBoxReferences(transactions: readonly Transaction[]): number {
  const uniqueNamedBoxes = new Set<string>();
  let namedBoxReferenceCount = 0;
  let emptyBoxReferenceCount = 0;

  const count = (appId: bigint, name: Uint8Array, transaction: Transaction): void => {
    // Consensus v41 assigns every all-zero box reference to the unnamed-box
    // pool. In addition, duplicate named refs contribute quota after the first.
    if (appId === 0n && name.length === 0) {
      emptyBoxReferenceCount += 1;
      return;
    }
    namedBoxReferenceCount += 1;
    uniqueNamedBoxes.add(`b:${effectiveAppId(appId, transaction)}:${bytesKey(name)}`);
  };

  for (const transaction of transactions) {
    if (transaction.type !== TransactionType.appl || !transaction.applicationCall) continue;
    for (const reference of transaction.applicationCall.access ?? []) {
      if (!reference.box) continue;
      count(reference.box.appIndex, reference.box.name, transaction);
    }
    for (const box of transaction.applicationCall.boxes ?? []) {
      count(box.appIndex, box.name, transaction);
    }
  }

  return emptyBoxReferenceCount + Math.max(0, namedBoxReferenceCount - uniqueNamedBoxes.size);
}

function recordAccessListRepairs(
  composer: object,
  relaxedGroup: SimulationGroupResult,
  transactions: readonly Transaction[],
  failureMessage: string,
): boolean {
  const transactionCount = transactions.length;
  const previous = accessListRepairs.get(composer);
  const reportedGroupResources = relaxedGroup.unnamedResourcesAccessed;
  // In an Access-bearing simulation algod reports the total extra box quota
  // consumed, including duplicate box entries already present in the group.
  // Convert that total back into the incremental deficit before persisting a
  // repair; otherwise each validation pass would add the same quota again.
  const incrementalGroupResources = reportedGroupResources
    ? {
        ...reportedGroupResources,
        extraBoxRefs: Math.max(
          0,
          (reportedGroupResources.extraBoxRefs ?? 0) - providedExtraBoxReferences(transactions),
        ),
      }
    : undefined;
  const groupRepair = filterNewRepairResources(composer, "group", incrementalGroupResources);
  const transactionRepairs = Array.from({ length: transactionCount }, (_, index) => ({
    unnamedResourcesAccessed: filterNewRepairResources(
      composer,
      `transaction:${index}`,
      relaxedGroup.txnResults?.[index]?.unnamedResourcesAccessed,
    ),
  }));

  // Always parse the strict failure as well. Algod can repeat an already-known
  // app in the relaxed resource report while the actual missing item is that
  // app's account, which Access no longer exposes implicitly.
  const fallbackRepair = filterNewRepairResources(
    composer,
    "group",
    unavailableResourceFromFailure(failureMessage),
  );
  const changed =
    hasUnnamedResources(groupRepair) ||
    hasUnnamedResources(fallbackRepair) ||
    transactionRepairs.some((repair) => hasUnnamedResources(repair.unnamedResourcesAccessed));
  if (!changed) return false;

  const additions: ComposerGroupAnalysis = {
    transactions: transactionRepairs,
    unnamedResourcesAccessed: mergeUnnamedResources(groupRepair, fallbackRepair),
    createdAppIds: collectCreatedAppIds(relaxedGroup),
  };
  accessListRepairs.set(composer, mergeGroupAnalysis(previous, additions, transactionCount)!);
  return true;
}

function collectCreatedAppIds(group?: SimulationGroupResult): bigint[] {
  const result = new Set<bigint>();
  const visit = (pending?: SimulationPendingTransactionResult): void => {
    if (!pending) return;
    if (pending.appIndex && pending.appIndex > 0n) result.add(pending.appIndex);
    for (const inner of pending.innerTxns ?? []) visit(inner);
  };
  for (const transaction of group?.txnResults ?? []) visit(transaction.txnResult);
  return [...result];
}

/**
 * Convert explicit legacy references and simulator-discovered unnamed
 * resources into packed consensus-v41 access lists.
 *
 * Transaction-level unnamed resources stay on the transaction that accessed
 * them. Group-level resources are greedily packed across all app calls using
 * the smallest incremental encoded size, which naturally prefers placing a
 * box on a call to its owning app and reusing composite dependencies.
 */
export function populateAccessListResources(
  input: algosdk.Transaction[],
  groupAnalysis?: ComposerGroupAnalysis,
  seeds: readonly ResourceReference[] = [],
): void {
  const transactions = input as Transaction[];
  const appTransactions = transactions
    .map((transaction, groupIndex) => ({ transaction, groupIndex }))
    .filter(({ transaction }) => transaction.type === TransactionType.appl && transaction.applicationCall !== undefined);

  if (appTransactions.length === 0) return;
  const createdAppIds = new Set(groupAnalysis?.createdAppIds ?? []);
  const needsLiteralZeroAddress = Boolean(
    groupAnalysis?.unnamedResourcesAccessed?.accounts?.some(isZeroAddress) ||
      groupAnalysis?.transactions.some((analysis) =>
        analysis.unnamedResourcesAccessed?.accounts?.some(isZeroAddress),
      ) ||
      appTransactions.some(({ transaction }) =>
        transaction.applicationCall!.access?.some(isLiteralZeroAddressReference),
      ),
  );
  if (needsLiteralZeroAddress) provideLiteralZeroAddress(transactions);

  // Keep explicitly indexed account/app/asset arrays intact. Besides ARC-4
  // reference arguments, the Haystack router integration authenticates values
  // by reading another transaction's Accounts/Assets slots. `txn.Access` does
  // not populate those arrays. Mixing a legacy transaction with Access-bearing
  // carrier calls elsewhere in the same group is valid and preserves both
  // behaviors.
  const plans = appTransactions
    .filter(({ transaction }) => !hasLegacyIndexedReferences(transaction))
    .map(({ transaction, groupIndex }) => {
      const appCall = transaction.applicationCall!;
      // Canonicalize explicitly supplied entries as well as migrated boxes.
      // Inherent sender/current-app refs are semantically redundant but the
      // upstream encoder would otherwise still place them on wire, causing our
      // capacity count to understate the actual Access length.
      const references = [
        ...(appCall.access ?? []),
        ...(appCall.boxes ?? []).map((box) => ({ box })),
      ]
        .map((reference) => normalizeReference(reference, transaction))
        .filter((reference): reference is ResourceReference => reference !== undefined);

      return { transaction, references, groupIndex };
    });

  const groupResourcesToAdd = groupResources(groupAnalysis?.unnamedResourcesAccessed, createdAppIds);
  const extraBoxReferences = groupAnalysis?.unnamedResourcesAccessed?.extraBoxRefs ?? 0;
  const planningPlans = [...plans];
  let requiredResourceCarriers = 0;

  const carrierTemplate = plans[0] ?? {
    groupIndex: appTransactions[0].groupIndex,
    references: [],
    transaction: appTransactions[0].transaction,
  };

  const addGroupReference = (reference: ResourceReference, allowDuplicate = false): void => {
    if (addToBestTransaction(planningPlans, reference, allowDuplicate)) return;

    const carrier = virtualCarrier(carrierTemplate);
    planningPlans.push(carrier);
    requiredResourceCarriers += 1;

    if (!addToBestTransaction(planningPlans, reference, allowDuplicate)) {
      throw new Error(
        `A single access resource cannot fit within the ${MAX_ACCESS_LIST_ENTRIES}-entry Access limit.`,
      );
    }
  };

  for (const plan of plans) {
    const { groupIndex } = plan;
    for (const reference of transactionResources(
      groupAnalysis?.transactions[groupIndex]?.unnamedResourcesAccessed,
      createdAppIds,
    )) {
      if (!addToTransaction(plan, reference)) {
        throw new Error(`Transaction ${groupIndex} requires more than ${MAX_ACCESS_LIST_ENTRIES} non-shareable access-list entries.`);
      }
    }
  }

  for (const reference of groupResourcesToAdd) {
    addGroupReference(reference);
  }

  // Seeded resources (seedAccessResources) are group-shared like discovered ones. A seed that
  // discovery already provided, or that is the sender / called app of some call, adds nothing.
  // The exception is a seeded all-zero box reference: it names nothing and is box IO headroom, so
  // every one is placed, on top of the references discovery asked for (see `boxReadHeadroom`).
  for (const reference of seeds) {
    if (isLiteralZeroAddressReference(reference)) continue;
    if (reference.appIndex !== undefined && createdAppIds.has(reference.appIndex)) continue;
    addGroupReference(reference, isEmptyBoxReference(reference));
  }

  for (let index = 0; index < extraBoxReferences; index += 1) {
    // An all-zero box reference contributes 2 KiB of box IO quota and, under
    // consensus v41, also authorizes one previously unnamed box in an app
    // created by this atomic group. This is the only stable representation for
    // an inner-created app whose ID is unknowable before submission.
    addGroupReference({ box: { appIndex: 0n, name: new Uint8Array(0) } }, true);
  }

  const requiredCarrierCount = Math.max(requiredResourceCarriers, groupAnalysis?.requiredOpcodeCarriers ?? 0);
  if (requiredCarrierCount > 0) {
    const used = plans.map((plan) => accessListEntryCount(plan.transaction, plan.references)).join(", ") || "none";
    const reason = requiredResourceCarriers > 0 ? "Access capacity" : "pooled opcode budget";
    throw new AccessListCapacityError(
      `${reason} requires ${requiredCarrierCount} additional safe resource-carrier call(s) ` +
        `(current encoded entries by eligible app call: ${used}; max ${MAX_ACCESS_LIST_ENTRIES} each).`,
      requiredCarrierCount,
    );
  }

  // Commit only after the entire group fits, so a capacity error does not leave
  // a half-converted composer behind.
  for (const plan of plans) {
    const appCall = plan.transaction.applicationCall!;
    const size = accessListEntryCount(plan.transaction, plan.references);
    if (size > MAX_ACCESS_LIST_ENTRIES) {
      throw new Error(`Access list contains ${size} entries; maximum is ${MAX_ACCESS_LIST_ENTRIES}.`);
    }
    appCall.access = plan.references;
    appCall.boxes = [];
  }
}


const configuredComposers = new WeakMap<TransactionComposer, SendParams>();
const preparedComposers = new WeakMap<TransactionComposer, Awaited<ReturnType<typeof buildAccessListGroup>>>();
const seededComposers = new WeakMap<TransactionComposer, ResourceReference[]>();

/**
 * Seed Access-list resources that a group needs, before the preparer packs it (principal-resolution
 * spec §3.6). Typical seeds come from `akita-sdk/principal`: `principalResources(...)` gives `P(W)`,
 * plus `A(W.address)` when the controlled account is the wallet's own address and the spender is an
 * escrow, or `A(C)` when an external controlled account `C` is not the spender.
 *
 * Seeds are merged with the simulation-discovered resources and deduplicated. A seed is placed only
 * when `populateAppCallResources` is on (the preparer path). It costs Access capacity, so seed only
 * resources that some call in the group reads. Calling this again appends, and it drops a cached build.
 */
export function seedAccessResources(composer: TransactionComposer, references: readonly ResourceReference[]): TransactionComposer {
  if (references.length === 0) return composer;
  seededComposers.set(composer, [...(seededComposers.get(composer) ?? []), ...references]);
  preparedComposers.delete(composer);
  return composer;
}

/** Bytes of box IO quota one box reference adds to its group (consensus v41). */
export const BYTES_PER_BOX_REFERENCE = 2_048;

/**
 * Seeds that add box read budget for `bytes` of boxes a group reads but that do not exist yet when it
 * is built: one all-zero box reference per 2,048 B (rounded up; none for 0).
 *
 * algod sizes a group's box read budget from the boxes that exist when it simulates, and rounds it up
 * to whole references. A box created between the build and the send (an execution key, the proposal
 * that carries it) is read against whatever the rounding left over, so a group built just under a
 * 2,048 B step is refused at send time with "read budget exceeded". A reference passed on a call does
 * not help: the simulation counts it as budget the group already has and asks for fewer of its own.
 * These are placed after discovery, so they are always on top.
 */
export function boxReadHeadroom(bytes: bigint | number): ResourceReference[] {
  const count = Math.ceil(Number(bytes) / BYTES_PER_BOX_REFERENCE);
  return Array.from({ length: Math.max(0, count) }, () => ({ box: { appIndex: 0n, name: new Uint8Array(0) } }));
}

/** The resources seeded on `composer` so far (empty when none). */
export function seededAccessResources(composer: TransactionComposer): readonly ResourceReference[] {
  return seededComposers.get(composer) ?? [];
}
const nativeBuild = TransactionComposer.prototype.build;
type ComposerContext = {
  algod: algosdk.Algodv2;
  getSuggestedParams(): Promise<algosdk.SuggestedParams>;
  txnMaxFees: Map<number, AlgoAmount>;
  atc: algosdk.AtomicTransactionComposer;
};

/** Enable resource discovery when building a composer without sending it. */
export function configureAccessListComposer(composer: TransactionComposer, options: SendParams): TransactionComposer {
  installAccessListResourcePopulator();
  configuredComposers.set(composer, options);
  return composer;
}

function normalizedResources(resources?: algosdk.modelsv2.SimulateUnnamedResourcesAccessed): SimulateUnnamedResourcesAccessed | undefined {
  if (!resources) return undefined;
  return canonicalResources({
    accounts: resources.accounts?.map((account) => account),
    apps: resources.apps,
    assets: resources.assets,
    boxes: resources.boxes?.map(({ app, name }) => ({ appIndex: app, name })),
    appLocals: resources.appLocals?.map(({ app, account }) => ({ appIndex: app, address: account })),
    assetHoldings: resources.assetHoldings?.map(({ asset, account }) => ({ assetIndex: asset, address: account })),
    extraBoxRefs: resources.extraBoxRefs,
  });
}

const compareIds = (a: bigint, b: bigint) => (a < b ? -1 : a > b ? 1 : 0);
const compareBytes = (a: Uint8Array, b: Uint8Array) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] - b[i];
  return a.length - b.length;
};
const compareAddresses = (a: Address, b: Address) => compareBytes(a.publicKey, b.publicKey);

/**
 * Sort simulate-reported resources into one canonical order. algod reports unnamed resources in Go map
 * iteration order, which changes on every simulate of the same group (2026-10-04: six identical
 * simulates of one call gave six box orders). The Access planner is greedy, so the order decides how
 * the resources pack: the same reply group needed 1 or 2 resource carriers (1,000 µA each) from run to
 * run. Sorted by app first, the boxes of one app are adjacent and pack together, and the carrier count
 * (and so the fee) depends only on the group's resources, not on the simulate.
 */
export function canonicalResources(resources: SimulateUnnamedResourcesAccessed): SimulateUnnamedResourcesAccessed {
  return {
    ...resources,
    accounts: resources.accounts && [...resources.accounts].sort(compareAddresses),
    apps: resources.apps && [...resources.apps].sort(compareIds),
    assets: resources.assets && [...resources.assets].sort(compareIds),
    boxes: resources.boxes && [...resources.boxes].sort((a, b) => compareIds(a.appIndex, b.appIndex) || compareBytes(a.name, b.name)),
    appLocals: resources.appLocals && [...resources.appLocals].sort((a, b) => compareAddresses(a.address, b.address) || compareIds(a.appIndex, b.appIndex)),
    assetHoldings: resources.assetHoldings && [...resources.assetHoldings].sort((a, b) => compareAddresses(a.address, b.address) || compareIds(a.assetIndex, b.assetIndex)),
  };
}

function normalizedGroup(group: algosdk.modelsv2.SimulateTransactionGroupResult): SimulationGroupResult {
  const pending = (txn: algosdk.modelsv2.PendingTransactionResponse): SimulationPendingTransactionResult => ({
    appIndex: txn.applicationIndex,
    innerTxns: txn.innerTxns?.map(pending),
  });
  return {
    ...group,
    groupUsage: group.groupUsage === undefined ? undefined : BigInt(group.groupUsage),
    unnamedResourcesAccessed: normalizedResources(group.unnamedResourcesAccessed),
    txnResults: group.txnResults.map((txn) => ({ txnResult: pending(txn.txnResult), unnamedResourcesAccessed: normalizedResources(txn.unnamedResourcesAccessed) })),
  };
}

function compose(transactions: algosdk.TransactionWithSigner[], methods: Map<number, algosdk.ABIMethod>): algosdk.AtomicTransactionComposer {
  const atc = new algosdk.AtomicTransactionComposer();
  for (const { txn, signer } of transactions) {
    const copy = algosdk.decodeUnsignedTransaction(algosdk.encodeUnsignedTransaction(txn));
    copy.group = undefined;
    atc.addTransaction({ txn: copy, signer });
  }
  (atc as unknown as { methodCalls: Map<number, algosdk.ABIMethod> }).methodCalls = methods;
  return atc;
}

/**
 * Run resource discovery at the group's real opcode budget first, and fall
 * back to `ACCESS_DISCOVERY_OPCODE_BUDGET` extra budget only when that fails.
 *
 * Contracts that op themselves up (`ensureBudget`, which checks
 * `global OpcodeBudget`) take a different branch when the simulator grants
 * extra budget: their op-up inner transactions never run, so neither their
 * fees nor their resources appear in an extra-budget simulation, and the
 * strict, real-budget validation then fails with "group fee too small".
 * A group that runs within its own budget therefore needs no carriers, and
 * its real-budget simulation is exactly what will execute on chain. Only a
 * group that genuinely lacks pooled budget is discovered with extra budget,
 * which is what sizes the pooled opcode-budget carriers it needs.
 */
export async function discoverGroup(
  simulate: (extraBudget: boolean) => Promise<algosdk.modelsv2.SimulateResponse>,
): Promise<{ discovery: algosdk.modelsv2.SimulateResponse; extraBudget: boolean }> {
  const realBudget = await simulate(false);
  if (!realBudget.txnGroups[0]?.failureMessage) return { discovery: realBudget, extraBudget: false };
  return { discovery: await simulate(true), extraBudget: true };
}

/**
 * Pooled opcode-budget carriers a discovered group still needs. A group
 * discovered at its real budget already ran within it, and its budget added
 * includes every op-up inner call it made itself, so it normally needs none.
 */
export function requiredOpcodeCarriers(
  group: { appBudgetConsumed?: number; appBudgetAdded?: number },
  appCount: number,
  extraBudget: boolean,
): number {
  // A group that succeeded at its real budget already fits: whatever op-ups it
  // needed ran inside it. Its consumed/added figures are not comparable (the
  // simulator can report more consumed than added for nested op-up paths), so
  // deriving carriers from them would demand budget the group does not need.
  if (!extraBudget) return 0;
  const added = group.appBudgetAdded ?? 0;
  const available = Math.max(appCount * 700, added - ACCESS_DISCOVERY_OPCODE_BUDGET);
  return Math.max(0, Math.ceil(((group.appBudgetConsumed ?? 0) - available) / 700));
}

/** Discover, pack Access references, cover fees, and strictly validate before signing. */
export async function buildAccessListGroup(composer: TransactionComposer, options: SendParams = {},
  transform?: (transactions: algosdk.TransactionWithSigner[]) => void) {
  const context = composer as unknown as ComposerContext;
  const raw = await nativeBuild.call(composer);
  const methods = raw.methodCalls as Map<number, algosdk.ABIMethod>;
  let original = raw.atc.clone().buildGroup();
  transform?.(original);
  const coversFees = options.coverAppCallInnerTransactionFees ?? false;
  const populates = options.populateAppCallResources ?? false;
  const hasApps = original.some(({ txn }) => txn.type === TransactionType.appl);
  if (!hasApps || (!coversFees && !populates)) {
    const atc = compose(original, methods);
    return { atc, transactions: atc.buildGroup(), methodCalls: methods, simulateResponse: undefined as algosdk.modelsv2.SimulateResponse | undefined };
  }
  const suggestedParams = await context.getSuggestedParams();
  const maxFees = new Map(context.txnMaxFees);
  const minFee = BigInt(suggestedParams.minFee);
  const repairs = {};
  for (let pass = 0; pass < 32; pass++) {
    const discoveryTxns = compose(original, methods).buildGroup();
    for (const [i, { txn }] of discoveryTxns.entries()) {
      if (txn.type !== TransactionType.appl) continue;
      if (!maxFees.has(i)) maxFees.set(i, microAlgo(txn.fee));
      if (coversFees) txn.fee = maxFees.get(i)!.microAlgo;
    }
    const simulate = async (txns: algosdk.TransactionWithSigner[], strict: boolean, extraBudget = !strict) => {
      const grouped = compose(txns, methods).buildGroup();
      return simulateWithUsage(context.algod, new algosdk.modelsv2.SimulateRequest({
        txnGroups: [new algosdk.modelsv2.SimulateRequestTransactionGroup({
          txns: grouped.map(({ txn }) => new algosdk.SignedTransaction({ txn })),
        })],
        allowEmptySignatures: true, fixSigners: true, allowMoreLogging: true,
        allowUnnamedResources: !strict,
        ...(extraBudget ? { extraOpcodeBudget: ACCESS_DISCOVERY_OPCODE_BUDGET } : {}),
      }));
    };
    const { discovery, extraBudget } = await discoverGroup(
      (budgeted) => simulate(discoveryTxns, false, budgeted),
    );
    const group = discovery.txnGroups[0];
    if (group.failureMessage) throw new Error(`Resource discovery failed: ${group.failureMessage}`);
    const normalized = normalizedGroup(group);
    const candidates = compose(original, methods).buildGroup();
    const txns = candidates.map(({ txn }) => txn) as Transaction[];
    const appCount = txns.filter((txn) => txn.type === TransactionType.appl).length;
    const analysis = mergeGroupAnalysis({
      transactions: normalized.txnResults?.map((txn) => ({ unnamedResourcesAccessed: txn.unnamedResourcesAccessed })) ?? [],
      unnamedResourcesAccessed: normalized.unnamedResourcesAccessed,
      createdAppIds: collectCreatedAppIds(normalized),
      requiredOpcodeCarriers: requiredOpcodeCarriers(group, appCount, extraBudget),
    }, accessListRepairs.get(repairs), txns.length);
    try {
      const byteFee = (txn: algosdk.Transaction) => { const required = BigInt(txn.toByte().length + 75) * BigInt(suggestedParams.fee); return required > minFee ? required : minFee; };
      const beforeBytes = candidates.map(({ txn }) => byteFee(txn));
      if (populates) populateAccessListResources(candidates.map(({ txn }) => txn), analysis, seededComposers.get(composer));
      const grew = candidates.some(({ txn }, index) => byteFee(txn) > beforeBytes[index]);
      let atc = compose(candidates, methods);
      if (coversFees || grew) {
        atc.buildGroup();
        // Utils 9 retains ownership of inner-fee allocation and maxFee enforcement.
        // Supply the discovery result already obtained above; resource packing is complete.
        const { prepareGroupForSending } = await import('@algorandfoundation/algokit-utils');
        const cachedAlgod = new Proxy(context.algod, { get(target, property, receiver) {
          if (property === 'simulateTransactions') return () => ({ do: async () => coversFees ? discovery : { ...discovery, txnGroups: discovery.txnGroups.map((group) => ({ ...group, txnResults: group.txnResults.map((result) => ({ ...result, txnResult: { ...result.txnResult, innerTxns: [] } })) })) } });
          return Reflect.get(target, property, receiver);
        } });
        atc = await prepareGroupForSending(atc, cachedAlgod, { coverAppCallInnerTransactionFees: true, populateAppCallResources: false }, { maxFees, suggestedParams });
        const extra = coversFees ? usageFeeSurcharge(group, minFee) : 0n;
        if (extra > 0n) {
          const index = atc.buildGroup().findIndex(({ txn }) => txn.type === TransactionType.appl);
          const txn = atc.buildGroup()[index].txn;
          if (txn.fee + extra > maxFees.get(index)!.microAlgo) throw new Error('Protocol usage exceeds app-call maxFee');
          txn.fee += extra;
          atc = compose(atc.buildGroup(), methods);
        }
      }
      const transactions = atc.buildGroup();
      const validation = await simulate(transactions, true);
      const failure = validation.txnGroups[0]?.failureMessage;
      if (failure) {
        if (/(?:dynamic cost|static cost|opcode) budget exceeded|group fee .* too small \(needs? [1-9]/i.test(failure)) {
          throw new AccessListCapacityError('Strict simulation requires another pooled opcode-budget carrier.', 1);
        }
        // Repair against the same execution path the strict run takes: an app
        // that ops itself up only touches its op-up resources at real budget.
        const { discovery: relaxed } = await discoverGroup((budgeted) => simulate(transactions, false, budgeted));
        if (recordAccessListRepairs(repairs, normalizedGroup(relaxed.txnGroups[0]), transactions.map(({ txn }) => txn) as Transaction[], failure)) continue;
        throw new Error(`Strict resource validation failed: ${failure}`);
      }
      return { atc, transactions, methodCalls: methods, simulateResponse: validation };
    } catch (error) {
      if (!(error instanceof AccessListCapacityError) || !populates) throw error;
      if (original.length + error.requiredCarrierCount > 16) throw error;
      const registry = registeredAccessCarrierApps(context.algod);
      const deleted = new Set(original.filter(({ txn }) => txn.applicationCall?.onComplete === algosdk.OnApplicationComplete.DeleteApplicationOC).map(({ txn }) => txn.applicationCall!.appIndex.toString()));
      const anchor = original.find(({ txn }) => txn.applicationCall && !deleted.has(txn.applicationCall.appIndex.toString()) && registry.has(txn.applicationCall.appIndex.toString())) ?? original.find(({ txn }) => txn.applicationCall);
      const targetAppId = anchor?.txn.applicationCall && !deleted.has(anchor.txn.applicationCall.appIndex.toString()) && registry.has(anchor.txn.applicationCall.appIndex.toString()) ? anchor.txn.applicationCall.appIndex : [...registry.keys()].filter((id) => !deleted.has(id)).map(BigInt)[0];
      if (!anchor || targetAppId === undefined) throw new Error(error.message + ' None of its usable app IDs has a registered safe resource carrier.');
      const sender = [...original].reverse().find(({ txn }) => !isAutomaticCarrierTransaction(txn as Transaction)) ?? anchor;
      for (let i = 0; i < error.requiredCarrierCount; i++) {
        const index = original.length;
        const txn = algosdk.makeApplicationNoOpTxnFromObject({
          sender: sender.txn.sender, appIndex: targetAppId,
          appArgs: [registry.get(targetAppId.toString())!],
          note: new TextEncoder().encode(`akta-access-carrier-${index + 1}`),
          suggestedParams: { ...suggestedParams, flatFee: true, fee: minFee, firstValid: anchor.txn.firstValid, lastValid: anchor.txn.lastValid },
        });
        original.push({ txn, signer: sender.signer });
        maxFees.set(index, DEFAULT_CARRIER_MAX_FEE);
      }
    }
  }
  throw new Error('Access resource repair did not converge');
}

/** Apply Access planning to the Utils 9 composer send path. */
export function installAccessListResourcePopulator(): void {
  const prototype = TransactionComposer.prototype;
  if ((prototype as unknown as Record<symbol, boolean>)[ACCESS_LIST_PATCH]) return;
  (prototype as unknown as Record<symbol, boolean>)[ACCESS_LIST_PATCH] = true;
  installSingleSendResultCompatibility();
  const nativeSend = prototype.send;
  prototype.build = async function () {
    const options = configuredComposers.get(this);
    if (!options) return nativeBuild.call(this);
    const cached = preparedComposers.get(this);
    if (cached) return cached;
    const result = await buildAccessListGroup(this, options);
    (this as unknown as ComposerContext).atc = result.atc;
    preparedComposers.set(this, result);
    return result;
  };
  prototype.send = async function (params = {}) {
    const options = { ...params, populateAppCallResources: params.populateAppCallResources ?? Config.populateAppCallResources };
    if (options.populateAppCallResources || options.coverAppCallInnerTransactionFees) {
      const result = preparedComposers.get(this) ?? await buildAccessListGroup(this, options);
      (this as unknown as ComposerContext).atc = result.atc;
      preparedComposers.set(this, result);
    }
    return nativeSend.call(this, { ...params, populateAppCallResources: false, coverAppCallInnerTransactionFees: false });
  };
  const nativeRebuild = prototype.rebuild;
  prototype.rebuild = async function () {
    preparedComposers.delete(this);
    return nativeRebuild.call(this);
  };
}
