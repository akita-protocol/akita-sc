import type { SimulateUnnamedResourcesAccessed } from "@algorandfoundation/algokit-utils/algod-client";
import { TransactionComposer } from "@algorandfoundation/algokit-utils/composer";
import { Address, getApplicationAddress } from "@algorandfoundation/algokit-utils/common";
import {
  type ResourceReference,
  calculateFee,
  OnApplicationComplete,
  Transaction,
  TransactionParamsMeta,
  TransactionType,
} from "@algorandfoundation/algokit-utils/transact";
import { AlgorandClientTransactionSender, microAlgo } from "@algorandfoundation/algokit-utils";

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
  appId?: bigint;
  innerTxns?: SimulationPendingTransactionResult[];
};

type SimulationGroupResult = {
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

type ComposerInternals = {
  algod: {
    simulateTransactions(request: Record<string, unknown>): Promise<{
      txnGroups: SimulationGroupResult[];
    }>;
  };
  composerConfig: { populateAppCallResources: boolean; coverAppCallInnerTransactionFees: boolean };
  txns: Array<{ type: string; data: Record<string, unknown> }>;
  rawBuildTransactions?: Transaction[];
  build(): Promise<unknown>;
  reset(): void;
  addAppCall(params: Record<string, unknown>): TransactionComposer;
  analyzeGroupRequirements(transactions: Transaction[], suggestedParams: unknown, analysisParams: unknown): Promise<ComposerGroupAnalysis>;
  populateTransactionAndGroupResources(transactions: Transaction[], groupAnalysis?: ComposerGroupAnalysis): Transaction[];
};

type PlannedAccess = {
  groupIndex: number;
  transaction: Transaction;
  references: ResourceReference[];
};

const ACCESS_LIST_PATCH = Symbol.for("@akta/sdk/access-list-resource-populator");
const ACCESS_LIST_BUILD_PATCH = Symbol.for("@akta/sdk/access-list-build-populator");
const ACCESS_LIST_ANALYSIS_PATCH = Symbol.for("@akta/sdk/access-list-analysis-populator");
const ACCESS_LIST_RESET_PATCH = Symbol.for("@akta/sdk/access-list-reset-populator");
const EMPTY_ACCESS_BOX_DECODER_PATCH = Symbol.for("@akta/sdk/empty-access-box-decoder");
const SINGLE_SEND_RESULT_PATCH = Symbol.for("@akta/sdk/access-list-single-send-result");
const ACCESS_CARRIER_REGISTRY = Symbol.for("@akta/sdk/access-list-carrier-registry");
const validatedComposers = new WeakSet<object>();
const accessListRepairs = new WeakMap<object, ComposerGroupAnalysis>();
const accessListRepairKeys = new WeakMap<object, Set<string>>();
const internalRetryResets = new WeakSet<object>();

type CarrierRegistryHost = {
  [ACCESS_CARRIER_REGISTRY]?: Map<string, Uint8Array>;
};

function registeredAccessCarrierApps(algod: object): ReadonlyMap<string, Uint8Array> {
  // Proxies used by prepareGroup/analyzeGroupRequirements forward symbol reads
  // to the real algod client, preserving the network-scoped registry.
  return (algod as CarrierRegistryHost)[ACCESS_CARRIER_REGISTRY] ?? new Map<string, Uint8Array>();
}

type WireObject = Record<string, unknown> | Map<unknown, unknown>;

function wireKey(value: unknown): string {
  return value instanceof Uint8Array ? new TextDecoder().decode(value) : String(value);
}

function wireValue(object: WireObject, key: string): unknown {
  if (object instanceof Map) {
    for (const [candidate, value] of object) {
      if (wireKey(candidate) === key) return value;
    }
    return undefined;
  }
  return object[key];
}

function wireWithValue(object: WireObject, key: string, value: unknown): WireObject {
  if (object instanceof Map) {
    const copy = new Map(object);
    const existingKey = [...copy.keys()].find((candidate) => wireKey(candidate) === key) ?? key;
    copy.set(existingKey, value);
    return copy;
  }
  return { ...object, [key]: value };
}

/**
 * AlgoKit Utils 10.0.0-beta.1 represents the consensus-v41 unnamed-box entry
 * as `b: {}` and then rejects it while decoding. The canonical go-algorand
 * wire value is an entirely empty ResourceRef (`{}`). Normalize that case so
 * transaction/group hashes match consensus and simulation responses decode.
 */
function installEmptyAccessBoxDecoderCompatibility(): void {
  const appCallCodec = TransactionParamsMeta.fields.find((field) => field.name === "appCall")?.codec as
    | {
        encodeResourceReferences?: (
          appId: bigint,
          references: ResourceReference[] | undefined,
          format: unknown,
        ) => WireObject[] | undefined;
        decodeResourceReferences?: (references: WireObject[] | undefined, format: unknown) => ResourceReference[];
      }
    | undefined;
  if (!appCallCodec) return;

  const prototype = Object.getPrototypeOf(appCallCodec) as {
    [EMPTY_ACCESS_BOX_DECODER_PATCH]?: boolean;
    encodeResourceReferences?: (
      appId: bigint,
      references: ResourceReference[] | undefined,
      format: unknown,
    ) => WireObject[] | undefined;
    decodeResourceReferences?: (references: WireObject[] | undefined, format: unknown) => ResourceReference[];
  };
  if (
    prototype[EMPTY_ACCESS_BOX_DECODER_PATCH] ||
    !prototype.encodeResourceReferences ||
    !prototype.decodeResourceReferences
  ) {
    return;
  }

  const originalEncode = prototype.encodeResourceReferences;
  const originalDecode = prototype.decodeResourceReferences;
  prototype.encodeResourceReferences = function patchedEncodeResourceReferences(
    appId: bigint,
    references: ResourceReference[] | undefined,
    format: unknown,
  ): WireObject[] | undefined {
    const encoded = originalEncode.call(this, appId, references, format)?.map((reference) => {
      const box = wireValue(reference, "b");
      if (!box || typeof box !== "object") return reference;
      const boxObject = box as WireObject;
      if (wireValue(boxObject, "i") !== undefined || wireValue(boxObject, "n") !== undefined) return reference;
      return {};
    }) ?? [];

    return encoded.length > 0 ? encoded : undefined;
  };
  prototype.decodeResourceReferences = function patchedDecodeResourceReferences(
    references: WireObject[] | undefined,
    format: unknown,
  ): ResourceReference[] {
    const normalized = references?.map((reference) => {
      const box = wireValue(reference, "b");
      if (
        box === undefined &&
        ["d", "s", "p", "h", "l"].every((key) => wireValue(reference, key) === undefined)
      ) {
        return { b: { n: new Uint8Array(0) } };
      }
      if (!box || typeof box !== "object") return reference;
      const boxObject = box as WireObject;
      if (wireValue(boxObject, "n") !== undefined) return reference;
      return wireWithValue(reference, "b", wireWithValue(boxObject, "n", new Uint8Array(0)));
    });
    return originalDecode.call(this, normalized, format);
  };
  prototype[EMPTY_ACCESS_BOX_DECODER_PATCH] = true;
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

type FeeDeltaLike = { type: 0 | 1; data: bigint };

function algoAmountMicroAlgos(value: unknown): bigint | undefined {
  if (typeof value === "bigint") return value;
  if (!value || typeof value !== "object" || !("microAlgos" in value)) return undefined;
  const microAlgos = (value as { microAlgos?: unknown }).microAlgos;
  return typeof microAlgos === "bigint" ? microAlgos : undefined;
}

/** AlgoKit's FeeDelta uses 0 for a deficit and 1 for a surplus. */
function addFeeDeficit(delta: unknown, additionalDeficit: bigint): FeeDeltaLike | undefined {
  const current =
    delta &&
    typeof delta === "object" &&
    "type" in delta &&
    "data" in delta &&
    typeof (delta as { data?: unknown }).data === "bigint"
      ? (delta as FeeDeltaLike).type === 0
        ? (delta as FeeDeltaLike).data
        : -(delta as FeeDeltaLike).data
      : 0n;
  const combined = current + additionalDeficit;
  if (combined > 0n) return { type: 0, data: combined };
  if (combined < 0n) return { type: 1, data: -combined };
  return undefined;
}

function byteFeeRequirement(
  transaction: Transaction,
  feeParams: { feePerByte: bigint; minFee: bigint },
  assumedFee: bigint,
  grouped: boolean,
): bigint {
  // Assuming maxFee when present is conservative if later allocation crosses a
  // msgpack integer-width boundary. AlgoKit's original analysis uses the
  // ungrouped transaction; the post-Access requirement includes the eventual
  // fixed-width group field whenever the atomic group has multiple txns.
  const atFee = new Transaction({
    ...transaction,
    fee: assumedFee,
    group: grouped ? new Uint8Array(32).fill(1) : undefined,
  });
  return calculateFee(atFee, feeParams);
}

function isAutomaticCarrierTransaction(transaction: Transaction): boolean {
  const note = transaction.note;
  return Boolean(
    transaction.type === TransactionType.AppCall &&
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

function effectiveAddress(address: Address, transaction: Transaction): Address {
  return isZeroAddress(address) ? transaction.sender : address;
}

function effectiveAppId(appId: bigint, transaction: Transaction): bigint {
  return appId === 0n ? transaction.appCall!.appId : appId;
}

function normalizeReference(reference: ResourceReference, transaction: Transaction): ResourceReference | undefined {
  const appCall = transaction.appCall!;

  if (reference.address) {
    if (reference.address.equals(transaction.sender)) return undefined;
    return { address: reference.address };
  }
  if (reference.assetId !== undefined) return { assetId: reference.assetId };
  if (reference.appId !== undefined) {
    if (reference.appId === 0n || reference.appId === appCall.appId) return undefined;
    return { appId: reference.appId };
  }
  if (reference.holding) {
    return {
      holding: {
        address: reference.holding.address.equals(transaction.sender) ? Address.zeroAddress() : reference.holding.address,
        assetId: reference.holding.assetId,
      },
    };
  }
  if (reference.locals) {
    const address = reference.locals.address.equals(transaction.sender) ? Address.zeroAddress() : reference.locals.address;
    const appId = reference.locals.appId === appCall.appId ? 0n : reference.locals.appId;

    // The sender's local state for the current app is inherently available.
    if (isZeroAddress(address) && appId === 0n) return undefined;
    return { locals: { address, appId } };
  }
  if (reference.box) {
    return {
      box: {
        appId: reference.box.appId === 0n || reference.box.appId === appCall.appId ? 0n : reference.box.appId,
        name: reference.box.name,
      },
    };
  }
  return undefined;
}

function referenceKey(reference: ResourceReference, transaction: Transaction): string | undefined {
  if (reference.address) return `d:${reference.address.toString()}`;
  if (reference.assetId !== undefined) return `s:${reference.assetId}`;
  if (reference.appId !== undefined) return `p:${effectiveAppId(reference.appId, transaction)}`;
  if (reference.holding) {
    return `h:${effectiveAddress(reference.holding.address, transaction).toString()}:${reference.holding.assetId}`;
  }
  if (reference.locals) {
    return `l:${effectiveAddress(reference.locals.address, transaction).toString()}:${effectiveAppId(reference.locals.appId, transaction)}`;
  }
  if (reference.box) {
    return `b:${effectiveAppId(reference.box.appId, transaction)}:${bytesKey(reference.box.name)}`;
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
    if (actual !== transaction.appCall!.appId) primitiveEntries.add(`p:${actual}`);
  };

  for (const rawReference of references) {
    const reference = normalizeReference(rawReference, transaction);
    if (!reference) continue;

    // Access indices are one-based: address index 0 always aliases Txn.sender.
    // A literal all-zero account therefore has to remain in a legacy Accounts
    // array on a separate group-shared app call.
    if (isLiteralZeroAddressReference(reference)) continue;

    if (reference.address) ensureLiteralAddress(reference.address);
    else if (reference.assetId !== undefined) ensureAsset(reference.assetId);
    else if (reference.appId !== undefined) ensureApp(reference.appId);
    else if (reference.holding) {
      ensureCompositeAddress(reference.holding.address);
      ensureAsset(reference.holding.assetId);
      compositeEntries += 1;
    } else if (reference.locals) {
      ensureCompositeAddress(reference.locals.address);
      ensureApp(reference.locals.appId);
      compositeEntries += 1;
    } else if (reference.box) {
      ensureApp(reference.box.appId);
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
      result.add(`s:${reference.holding.assetId}`);
    } else if (reference.locals) {
      const address = effectiveAddress(reference.locals.address, plan.transaction);
      const appId = effectiveAppId(reference.locals.appId, plan.transaction);
      result.add(`d:${address.toString()}`);
      result.add(`p:${appId}`);
    } else if (reference.box) {
      result.add(`p:${effectiveAppId(reference.box.appId, plan.transaction)}`);
    }
  }

  // These two resources are always available to an app call.
  result.add(`d:${plan.transaction.sender.toString()}`);
  result.add(`p:${plan.transaction.appCall!.appId}`);
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
  // current JS encoders always collapse `locals.appId === called appId` to 0,
  // so place that composite on a call to a different app instead. (The
  // resource remains group-shared.)
  if (
    normalized.locals &&
    !effectiveAddress(normalized.locals.address, plan.transaction).equals(plan.transaction.sender) &&
    effectiveAppId(normalized.locals.appId, plan.transaction) === plan.transaction.appCall!.appId
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
    transaction.type === TransactionType.AppCall &&
    transaction.appCall !== undefined &&
    ((transaction.appCall.accountReferences?.length ?? 0) > 0 ||
      (transaction.appCall.assetReferences?.length ?? 0) > 0 ||
      (transaction.appCall.appReferences?.length ?? 0) > 0)
  );
}

function legacyReferenceCount(transaction: Transaction): number {
  const appCall = transaction.appCall!;
  return (
    (appCall.accountReferences?.length ?? 0) +
    (appCall.assetReferences?.length ?? 0) +
    (appCall.appReferences?.length ?? 0) +
    (appCall.boxReferences?.length ?? 0)
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
    (transaction) => transaction.type === TransactionType.AppCall && transaction.appCall !== undefined,
  );

  for (const transaction of appTransactions) {
    const appCall = transaction.appCall!;
    appCall.accessReferences = appCall.accessReferences?.filter(
      (reference) => !isLiteralZeroAddressReference(reference),
    );
    if (appCall.accessReferences?.length === 0) appCall.accessReferences = undefined;
  }

  if (
    appTransactions.some((transaction) =>
      transaction.appCall!.accountReferences?.some((address) => isZeroAddress(address)),
    )
  ) {
    return;
  }

  const candidate = appTransactions
    .filter((transaction) => {
      const appCall = transaction.appCall!;
      return (
        (appCall.accessReferences?.length ?? 0) === 0 &&
        (appCall.accountReferences?.length ?? 0) < 4 &&
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

  candidate.appCall!.accountReferences = [
    ...(candidate.appCall!.accountReferences ?? []),
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
        effectiveAppId(normalized.locals.appId, plan.transaction) === plan.transaction.appCall!.appId
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
    transaction: new Transaction({
      type: TransactionType.AppCall,
      sender: transaction.sender,
      firstValid: transaction.firstValid,
      lastValid: transaction.lastValid,
      appCall: {
        appId: transaction.appCall!.appId,
        onComplete: transaction.appCall!.onComplete,
      },
    }),
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
    ...(resources.assets ?? []).map((assetId) => ({ assetId })),
    ...(resources.apps ?? [])
      .filter((appId) => !createdAppIds.has(appId))
      .map((appId) => ({ appId })),
    ...(resources.assetHoldings ?? []).map((holding) => ({ holding })),
    ...(resources.appLocals ?? []).map((locals) => ({ locals })),
    ...(resources.boxes ?? []).filter((box) => !createdAppIds.has(box.appId)).map((box) => ({ box })),
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
    ...(resources.boxes ?? []).filter((box) => !createdAppIds.has(box.appId)).map((box) => ({ box })),
    ...(resources.accounts ?? [])
      .filter((address) => !isZeroAddress(address))
      .filter((address) => !createdAppAddresses.has(address.toString()))
      .map((address) => ({ address })),
    ...(resources.assets ?? []).map((assetId) => ({ assetId })),
    ...(resources.apps ?? [])
      .filter((appId) => !createdAppIds.has(appId))
      .map((appId) => ({ appId })),
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
    (filtered as Record<string, unknown>)[field] = values;
  };

  for (const value of resources?.accounts ?? []) add("accounts", `d:${value.toString()}`, value);
  for (const value of resources?.assets ?? []) add("assets", `s:${value}`, value);
  for (const value of resources?.apps ?? []) add("apps", `p:${value}`, value);
  for (const value of resources?.assetHoldings ?? []) {
    add("assetHoldings", `h:${value.address.toString()}:${value.assetId}`, value);
  }
  for (const value of resources?.appLocals ?? []) {
    add("appLocals", `l:${value.address.toString()}:${value.appId}`, value);
  }
  for (const value of resources?.boxes ?? []) {
    add("boxes", `b:${value.appId}:${bytesKey(value.name)}`, value);
  }

  // Unlike semantic resources, each extra box ref is intentionally another
  // identical Access entry and contributes an additional 2 KiB of IO budget.
  if ((resources?.extraBoxRefs ?? 0) > 0) filtered.extraBoxRefs = resources!.extraBoxRefs;
  return hasUnnamedResources(filtered) ? filtered : undefined;
}

function unavailableResourceFromFailure(message: string): SimulateUnnamedResourcesAccessed | undefined {
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
    if (transaction.type !== TransactionType.AppCall || !transaction.appCall) continue;
    for (const reference of transaction.appCall.accessReferences ?? []) {
      if (!reference.box) continue;
      count(reference.box.appId, reference.box.name, transaction);
    }
    for (const box of transaction.appCall.boxReferences ?? []) {
      count(box.appId, box.name, transaction);
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

function resetComposerForRetry(composer: ComposerInternals): void {
  internalRetryResets.add(composer);
  try {
    composer.reset();
  } finally {
    internalRetryResets.delete(composer);
  }

  const visited = new WeakSet<object>();
  const clearGroup = (value: unknown): void => {
    if (!value || typeof value !== "object" || visited.has(value)) return;
    visited.add(value);

    if (value instanceof Transaction) {
      value.group = undefined;
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) clearGroup(item);
      return;
    }
    // Signers, ABI methods, and other class instances do not contain built
    // transaction arguments. Restrict recursion to plain composer data.
    if (Object.getPrototypeOf(value) !== Object.prototype) return;
    for (const item of Object.values(value as Record<string, unknown>)) clearGroup(item);
  };

  for (const transaction of composer.txns) {
    const maybePromise = transaction.data.txn;
    if (transaction.type === "asyncTxn" && maybePromise instanceof Promise) {
      transaction.data.txn = maybePromise.then((resolved) => {
        const clone = new Transaction({ ...(resolved as Transaction) });
        clone.group = undefined;
        return clone;
      });
    } else {
      clearGroup(transaction.data);
    }
  }
}

function collectCreatedAppIds(group?: SimulationGroupResult): bigint[] {
  const result = new Set<bigint>();
  const visit = (pending?: SimulationPendingTransactionResult): void => {
    if (!pending) return;
    if (pending.appId && pending.appId > 0n) result.add(pending.appId);
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
export function populateAccessListResources(transactions: Transaction[], groupAnalysis?: ComposerGroupAnalysis): void {
  const appTransactions = transactions
    .map((transaction, groupIndex) => ({ transaction, groupIndex }))
    .filter(({ transaction }) => transaction.type === TransactionType.AppCall && transaction.appCall !== undefined);

  if (appTransactions.length === 0) return;
  const createdAppIds = new Set(groupAnalysis?.createdAppIds ?? []);
  const needsLiteralZeroAddress = Boolean(
    groupAnalysis?.unnamedResourcesAccessed?.accounts?.some(isZeroAddress) ||
      groupAnalysis?.transactions.some((analysis) =>
        analysis.unnamedResourcesAccessed?.accounts?.some(isZeroAddress),
      ) ||
      appTransactions.some(({ transaction }) =>
        transaction.appCall!.accessReferences?.some(isLiteralZeroAddressReference),
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
      const appCall = transaction.appCall!;
      // Canonicalize explicitly supplied entries as well as migrated boxes.
      // Inherent sender/current-app refs are semantically redundant but the
      // upstream encoder would otherwise still place them on wire, causing our
      // capacity count to understate the actual Access length.
      const references = [
        ...(appCall.accessReferences ?? []),
        ...(appCall.boxReferences ?? []).map((box) => ({ box })),
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

  for (let index = 0; index < extraBoxReferences; index += 1) {
    // An all-zero box reference contributes 2 KiB of box IO quota and, under
    // consensus v41, also authorizes one previously unnamed box in an app
    // created by this atomic group. This is the only stable representation for
    // an inner-created app whose ID is unknowable before submission.
    addGroupReference({ box: { appId: 0n, name: new Uint8Array(0) } }, true);
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
    const appCall = plan.transaction.appCall!;
    const size = accessListEntryCount(plan.transaction, plan.references);
    if (size > MAX_ACCESS_LIST_ENTRIES) {
      throw new Error(`Access list contains ${size} entries; maximum is ${MAX_ACCESS_LIST_ENTRIES}.`);
    }
    appCall.accessReferences = plan.references.length > 0 ? plan.references : undefined;
    appCall.boxReferences = undefined;
  }
}

/**
 * AlgoKit Utils 10.0.0-beta.1 still auto-populates the legacy 8-entry foreign
 * arrays. Install a narrow composer patch that keeps its fee calculation and
 * signing behavior, but replaces only the resource-population phase.
 */
export function installAccessListResourcePopulator(): void {
  installEmptyAccessBoxDecoderCompatibility();
  installSingleSendResultCompatibility();

  const prototype = TransactionComposer.prototype as unknown as ComposerInternals & {
    [ACCESS_LIST_PATCH]?: boolean;
    [ACCESS_LIST_ANALYSIS_PATCH]?: boolean;
    [ACCESS_LIST_BUILD_PATCH]?: boolean;
    [ACCESS_LIST_RESET_PATCH]?: boolean;
  };

  if (!prototype[ACCESS_LIST_RESET_PATCH]) {
    const originalReset = prototype.reset;
    prototype.reset = function patchedReset(): void {
      originalReset.call(this);
      validatedComposers.delete(this);
      if (!internalRetryResets.has(this)) {
        accessListRepairs.delete(this);
        accessListRepairKeys.delete(this);
      }
    };
    prototype[ACCESS_LIST_RESET_PATCH] = true;
  }

  if (!prototype[ACCESS_LIST_ANALYSIS_PATCH]) {
    const originalAnalyze = prototype.analyzeGroupRequirements;

    prototype.analyzeGroupRequirements = async function patchedAnalyze(
      transactions: Transaction[],
      suggestedParams: unknown,
      analysisParams: unknown,
    ): Promise<ComposerGroupAnalysis> {
      const originalAlgod = this.algod;
      let capturedGroup: SimulationGroupResult | undefined;

      this.algod = new Proxy(originalAlgod, {
        get(target, property, receiver) {
          if (property !== "simulateTransactions") return Reflect.get(target, property, receiver);

          return async (request: Record<string, unknown>) => {
            const response = await target.simulateTransactions({
              ...request,
              extraOpcodeBudget: ACCESS_DISCOVERY_OPCODE_BUDGET,
            });
            capturedGroup = response.txnGroups[0];
            return response;
          };
        },
      });

      try {
        const result = await originalAnalyze.call(this, transactions, suggestedParams, analysisParams);
        const feeParams = suggestedParams as { fee?: bigint; minFee?: bigint };
        if (feeParams.fee !== undefined && feeParams.minFee !== undefined) {
          result.accessListFeeParams = {
            feePerByte: feeParams.fee,
            minFee: feeParams.minFee,
          };
        }
        result.createdAppIds = collectCreatedAppIds(capturedGroup);
        return result;
      } finally {
        this.algod = originalAlgod;
      }
    };

    prototype[ACCESS_LIST_ANALYSIS_PATCH] = true;
  }

  if (!prototype[ACCESS_LIST_BUILD_PATCH]) {
    const originalBuild = prototype.build;

    prototype.build = async function patchedBuild(): Promise<unknown> {
      let repairPasses = 0;
      while (true) {
        try {
          const result = (await originalBuild.call(this)) as {
            transactions: Array<{ txn: Transaction }>;
          };

          if (
            !validatedComposers.has(this) &&
            this.composerConfig.populateAppCallResources &&
            result.transactions.some(({ txn }) => txn.type === TransactionType.AppCall)
          ) {
            const unsignedGroup = {
              txnGroups: [
                {
                  txns: result.transactions.map(({ txn }) => ({
                    txn,
                    sig: new Uint8Array(64),
                  })),
                },
              ],
              allowEmptySignatures: true,
              fixSigners: true,
              allowMoreLogging: true,
            };
            const validation = await this.algod.simulateTransactions({
              ...unsignedGroup,
              allowUnnamedResources: false,
            });
            const group = validation.txnGroups[0];
            if (group?.failureMessage) {
              // Discovery runs with a large extra opcode budget. Contracts that
              // use `ensureBudget()` therefore do not emit their inner budget
              // expansion call during discovery, so AlgoKit cannot include its
              // fee in `requiredFeeDelta`. In strict simulation that hidden
              // inner call first surfaces as a group-fee shortfall at
              // `itxn_submit`, rather than as an opcode-budget error. A carrier
              // supplies another 700 pooled opcodes and prevents that inner call
              // on the next pass.
              if (
                /(?:dynamic cost|static cost|opcode) budget exceeded/i.test(group.failureMessage) ||
                /group fee .* too small \(need [1-9]/i.test(group.failureMessage)
              ) {
                throw new AccessListCapacityError(
                  "Strict simulation requires another pooled opcode-budget carrier.",
                  1,
                );
              }

              const relaxedValidation = await this.algod.simulateTransactions({
                ...unsignedGroup,
                allowUnnamedResources: true,
                extraOpcodeBudget: ACCESS_DISCOVERY_OPCODE_BUDGET,
              });
              const relaxedGroup = relaxedValidation.txnGroups[0] ?? {};
              const repaired = recordAccessListRepairs(
                this,
                relaxedGroup,
                result.transactions.map(({ txn }) => txn),
                group.failureMessage,
              );
              if (repaired) {
                repairPasses += 1;
                if (repairPasses > 32) {
                  throw new Error("Access-list repair did not converge after 32 strict simulation passes.");
                }
                resetComposerForRetry(this);
                continue;
              }

              throw new Error(
                `Final Access-list validation failed in transaction ${group.failedAt?.join(", ") ?? "unknown"}: ` +
                  group.failureMessage,
              );
            }
            validatedComposers.add(this);
          }

          return result;
        } catch (error) {
          if (!(error instanceof AccessListCapacityError)) throw error;

          const currentCount = this.txns.length;
          if (currentCount + error.requiredCarrierCount > 16) {
            throw new Error(
              `This atomic path needs ${error.requiredCarrierCount} additional Access/opcode carrier call(s), ` +
                `but only ${16 - currentCount} group slot(s) remain. Split or batch the operation; ` +
                `Algorand groups are limited to 16 transactions.`,
            );
          }

          const builtTransactions = this.rawBuildTransactions ?? [];
          const registeredApps = registeredAccessCarrierApps(this.algod);
          const anchorIndex = builtTransactions.findIndex(
            (transaction) =>
              transaction.type === TransactionType.AppCall &&
              transaction.appCall !== undefined &&
              transaction.appCall.appId > 0n &&
              transaction.appCall.onComplete !== OnApplicationComplete.DeleteApplication &&
              registeredApps.has(transaction.appCall.appId.toString()),
          );
          const deletingRegisteredApps = new Set(
            builtTransactions
              .filter(
                (transaction) =>
                  transaction.type === TransactionType.AppCall &&
                  transaction.appCall?.onComplete === OnApplicationComplete.DeleteApplication &&
                  registeredApps.has(transaction.appCall.appId.toString()),
              )
              .map((transaction) => transaction.appCall!.appId.toString()),
          );
          const externalTarget = [...registeredApps.keys()].find((appId) => !deletingRegisteredApps.has(appId));
          const targetAppId =
            anchorIndex >= 0 ? builtTransactions[anchorIndex].appCall!.appId : externalTarget ? BigInt(externalTarget) : undefined;
          if (targetAppId === undefined) {
            const appIds = builtTransactions
              .filter((transaction) => transaction.type === TransactionType.AppCall && transaction.appCall?.appId)
              .map((transaction) => transaction.appCall!.appId.toString())
              .join(", ");
            throw new Error(
              `The group needs ${error.requiredCarrierCount} additional Access/opcode carrier call(s), but none of ` +
                `its usable app IDs (${appIds || "none"}) is registered with a safe carrier method. ` +
                `Construct the call through an Akita SDK, upgrade the target contract, or include another ` +
                `carrier-capable app; a carrier cannot execute after its own app is deleted.`,
            );
          }
          const targetSelector = registeredApps.get(targetAppId.toString());
          if (!targetSelector) {
            throw new Error(`No safe Access-list carrier selector is registered for application ${targetAppId}.`);
          }

          const anchorTransaction = builtTransactions[anchorIndex >= 0 ? anchorIndex : 0];
          // Carriers execute after the caller-authored group. Use the last
          // caller-authored transaction's sender/signer rather than the target
          // app call's sender: ARC-58 plugin calls may temporarily use a rekeyed
          // controlled account, while the final verify call uses the stable
          // external signer again.
          let senderContextIndex = anchorIndex;
          for (let index = builtTransactions.length - 1; index >= 0; index -= 1) {
            if (!isAutomaticCarrierTransaction(builtTransactions[index])) {
              senderContextIndex = index;
              break;
            }
          }
          const senderTransaction = builtTransactions[senderContextIndex];
          const senderContext = this.txns[senderContextIndex]?.data ?? {};
          const signer = senderContext.signer;
          const sender = senderContext.sender ?? senderTransaction.sender;
          const maxFee = senderContext.maxFee ?? DEFAULT_CARRIER_MAX_FEE;

          // A final strict validation failure happens after AlgoKit caches its
          // built group. Reset that cache before appending the retry carrier.
          resetComposerForRetry(this);
          for (let index = 0; index < error.requiredCarrierCount; index += 1) {
            this.addAppCall({
              appId: targetAppId,
              sender,
              ...(signer !== undefined ? { signer } : {}),
              args: [targetSelector],
              maxFee,
              // The note is part of the transaction ID. Include the absolute
              // group position so one-at-a-time opcode retries never append
              // duplicate carrier transactions.
              note: `akta-access-carrier-${currentCount + index + 1}`,
              firstValidRound: anchorTransaction.firstValid,
              lastValidRound: anchorTransaction.lastValid,
            });

            // Appending preserves transaction 0, ARC-4 transaction-argument
            // adjacency, and wallet rekey/verify scans. The one-shot sender
            // compatibility shim above keeps the caller's result selected.
          }
        }
      }
    };

    prototype[ACCESS_LIST_BUILD_PATCH] = true;
  }

  if (prototype[ACCESS_LIST_PATCH]) return;

  const originalPopulate = prototype.populateTransactionAndGroupResources;

  prototype.populateTransactionAndGroupResources = function patchedPopulate(
    transactions: Transaction[],
    groupAnalysis?: ComposerGroupAnalysis,
  ): Transaction[] {
    const effectiveAnalysis = mergeGroupAnalysis(groupAnalysis, accessListRepairs.get(this), transactions.length);
    const feeParams = effectiveAnalysis?.accessListFeeParams;
    const assumedFees = transactions.map(
      (transaction, groupIndex) =>
        algoAmountMicroAlgos(this.txns[groupIndex]?.data.maxFee) ?? transaction.fee ?? 0n,
    );
    const feesBeforeAccess = feeParams
      ? transactions.map((transaction) =>
          byteFeeRequirement(transaction, feeParams, transaction.fee ?? 0n, false),
        )
      : [];
    populateAccessListResources(transactions, effectiveAnalysis);

    // Access is populated after AlgoKit computes byte and inner-transaction fee
    // deltas. Long box names can add more than a kilobyte. Fold only that byte
    // growth into AlgoKit's existing FeeDelta values so its normal group pooling
    // can cover the deficit without rewriting a zero-fee prebuilt/LogicSig call.
    const feesAfterAccess = feeParams
      ? transactions.map((transaction, groupIndex) =>
          byteFeeRequirement(transaction, feeParams, assumedFees[groupIndex], transactions.length > 1),
        )
      : [];
    const hasAccessFeeGrowth = feesAfterAccess.some(
      (requiredFee, groupIndex) => requiredFee > feesBeforeAccess[groupIndex],
    );
    const coversInnerFees = this.composerConfig?.coverAppCallInnerTransactionFees ?? false;

    // Let AlgoKit retain ownership of fee deficit distribution and group-ID
    // assignment, while withholding unnamed resources so its legacy 8-slot
    // populator cannot run after Access has been installed.
    const resourcesStripped = effectiveAnalysis
      ? {
          ...effectiveAnalysis,
          transactions: effectiveAnalysis.transactions.map((analysis, groupIndex) => {
            const feeAdjustment = feeParams
              ? coversInnerFees
                ? feesAfterAccess[groupIndex] - feesBeforeAccess[groupIndex]
                : hasAccessFeeGrowth
                  ? feesAfterAccess[groupIndex] - (transactions[groupIndex].fee ?? 0n)
                  : 0n
              : 0n;
            const feeAdjusted = {
              ...analysis,
              requiredFeeDelta: addFeeDeficit(
                coversInnerFees || !hasAccessFeeGrowth ? analysis.requiredFeeDelta : undefined,
                feeAdjustment,
              ),
            };
            if (hasLegacyIndexedReferences(transactions[groupIndex])) return feeAdjusted;
            return { ...feeAdjusted, unnamedResourcesAccessed: undefined };
          }),
          unnamedResourcesAccessed: undefined,
        }
      : undefined;

    return originalPopulate.call(this, transactions, resourcesStripped);
  };

  prototype[ACCESS_LIST_PATCH] = true;
}
