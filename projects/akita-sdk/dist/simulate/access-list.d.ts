import type { SimulateUnnamedResourcesAccessed } from "@algorandfoundation/algokit-utils/algod-client";
import { type ResourceReference, Transaction } from "@algorandfoundation/algokit-utils/transact";
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
/**
 * Convert explicit legacy references and simulator-discovered unnamed
 * resources into packed consensus-v41 access lists.
 *
 * Transaction-level unnamed resources stay on the transaction that accessed
 * them. Group-level resources are greedily packed across all app calls using
 * the smallest incremental encoded size, which naturally prefers placing a
 * box on a call to its owning app and reusing composite dependencies.
 */
export declare function populateAccessListResources(transactions: Transaction[], groupAnalysis?: ComposerGroupAnalysis): void;
/**
 * AlgoKit Utils 10.0.0-beta.1 still auto-populates the legacy 8-entry foreign
 * arrays. Install a narrow composer patch that keeps its fee calculation and
 * signing behavior, but replaces only the resource-population phase.
 */
export declare function installAccessListResourcePopulator(): void;
export {};
