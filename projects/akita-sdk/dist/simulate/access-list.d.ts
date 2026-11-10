import algosdk, { Address } from 'algosdk';
import { TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer';
import type { SendParams } from '@algorandfoundation/algokit-utils/types/transaction';
type Transaction = Omit<algosdk.Transaction, 'applicationCall'> & {
    applicationCall?: {
        -readonly [K in keyof algosdk.ApplicationTransactionFields]: algosdk.ApplicationTransactionFields[K];
    };
};
type ResourceReference = algosdk.TransactionResourceReference;
export type SimulateUnnamedResourcesAccessed = {
    accounts?: Address[];
    assets?: bigint[];
    apps?: bigint[];
    assetHoldings?: Array<{
        address: Address;
        assetIndex: bigint;
    }>;
    appLocals?: Array<{
        address: Address;
        appIndex: bigint;
    }>;
    boxes?: Array<{
        appIndex: bigint;
        name: Uint8Array;
    }>;
    extraBoxRefs?: number;
};
/** Consensus-v41 limit for `txn.Access`. */
export declare const MAX_ACCESS_LIST_ENTRIES = 16;
/** Maximum extra budget accepted by algod's simulate endpoint. */
export declare const ACCESS_DISCOVERY_OPCODE_BUDGET = 320000;
type TransactionAnalysis = {
    requiredFeeDelta?: unknown;
    unnamedResourcesAccessed?: SimulateUnnamedResourcesAccessed;
};
export type ComposerGroupAnalysis = {
    transactions: TransactionAnalysis[];
    unnamedResourcesAccessed?: SimulateUnnamedResourcesAccessed;
    requiredOpcodeCarriers?: number;
    createdAppIds?: bigint[];
    accessListFeeParams?: {
        feePerByte: bigint;
        minFee: bigint;
    };
};
export declare class AccessListCapacityError extends Error {
    readonly requiredCarrierCount: number;
    constructor(message: string, requiredCarrierCount: number);
}
/**
 * Register an SDK app that can safely receive automatically-added resource
 * carrier calls. Registration is derived from the generated client's ARC-56
 * spec and scoped to one algod client, so apps from another network are never
 * called speculatively. Most apps use `opUp()void`; the size-constrained
 * ARC-58 wallet uses its readonly, zero-argument admin getter instead.
 */
export declare function registerAccessListResourceCarrier(appId: bigint, appSpec?: {
    methods?: Array<{
        name?: string;
        args?: unknown[];
        returns?: {
            type?: string;
        };
        readonly?: boolean;
    }>;
}, algod?: object): void;
/**
 * Return the number of wire entries produced by AlgoKit's access-reference
 * encoder. Composite references implicitly insert their address/app/asset
 * dependencies, so `references.length` is not the protocol size.
 */
export declare function accessListEntryCount(transaction: Transaction, references: readonly ResourceReference[]): number;
export declare function unavailableResourceFromFailure(message: string): SimulateUnnamedResourcesAccessed | undefined;
/**
 * Convert explicit legacy references and simulator-discovered unnamed
 * resources into packed consensus-v41 access lists.
 *
 * Transaction-level unnamed resources stay on the transaction that accessed
 * them. Group-level resources are greedily packed across all app calls using
 * the smallest incremental encoded size, which naturally prefers placing a
 * box on a call to its owning app and reusing composite dependencies.
 */
export declare function populateAccessListResources(input: algosdk.Transaction[], groupAnalysis?: ComposerGroupAnalysis, seeds?: readonly ResourceReference[]): void;
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
export declare function seedAccessResources(composer: TransactionComposer, references: readonly ResourceReference[]): TransactionComposer;
/** The resources seeded on `composer` so far (empty when none). */
export declare function seededAccessResources(composer: TransactionComposer): readonly ResourceReference[];
/** Enable resource discovery when building a composer without sending it. */
export declare function configureAccessListComposer(composer: TransactionComposer, options: SendParams): TransactionComposer;
/**
 * Sort simulate-reported resources into one canonical order. algod reports unnamed resources in Go map
 * iteration order, which changes on every simulate of the same group (2026-10-04: six identical
 * simulates of one call gave six box orders). The Access planner is greedy, so the order decides how
 * the resources pack: the same reply group needed 1 or 2 resource carriers (1,000 µA each) from run to
 * run. Sorted by app first, the boxes of one app are adjacent and pack together, and the carrier count
 * (and so the fee) depends only on the group's resources, not on the simulate.
 */
export declare function canonicalResources(resources: SimulateUnnamedResourcesAccessed): SimulateUnnamedResourcesAccessed;
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
export declare function discoverGroup(simulate: (extraBudget: boolean) => Promise<algosdk.modelsv2.SimulateResponse>): Promise<{
    discovery: algosdk.modelsv2.SimulateResponse;
    extraBudget: boolean;
}>;
/**
 * Pooled opcode-budget carriers a discovered group still needs. A group
 * discovered at its real budget already ran within it, and its budget added
 * includes every op-up inner call it made itself, so it normally needs none.
 */
export declare function requiredOpcodeCarriers(group: {
    appBudgetConsumed?: number;
    appBudgetAdded?: number;
}, appCount: number, extraBudget: boolean): number;
/** Discover, pack Access references, cover fees, and strictly validate before signing. */
export declare function buildAccessListGroup(composer: TransactionComposer, options?: SendParams, transform?: (transactions: algosdk.TransactionWithSigner[]) => void): Promise<{
    atc: algosdk.AtomicTransactionComposer;
    transactions: algosdk.TransactionWithSigner[];
    methodCalls: Map<number, algosdk.ABIMethod>;
    simulateResponse: algosdk.modelsv2.SimulateResponse | undefined;
}>;
/** Apply Access planning to the Utils 9 composer send path. */
export declare function installAccessListResourcePopulator(): void;
export {};
