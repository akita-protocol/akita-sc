import { Address } from "algosdk";
import { AllowanceInfo as SubAllowanceInfo } from "../generated/AbstractedAccountClient";
import { AddAllowanceArgs, AllowanceInfo, EscrowDeleteWarning, EscrowTeardown } from "./types";
import { PluginHookParams, PluginTxn } from "../types";
type ComposerTransactionWithMaxFee<TFee> = {
    type: string;
    maxFee?: TFee;
};
/**
 * What a person has to be told before they confirm the delete of an escrow: what becomes of its
 * address. An escrow with app id 0 is an ordinary account rekeyed to the wallet, and any other is the
 * account of an app the escrow factory made.
 */
export declare function escrowDeleteWarnings(id: bigint, address: string): EscrowDeleteWarning[];
/** Throw, naming the reason, when an escrow cannot be deleted as the chain shows it. */
export declare function assertEscrowCanBeDeleted(plan: EscrowTeardown, unlock: boolean): void;
/**
 * Applies a default max fee to composer inputs that resolve to app calls.
 *
 * algokit-utils represents raw app calls as `appCall` and ABI app calls as
 * `methodCall` until the composer builds them. Both become application-call
 * transactions and require a max fee when inner-transaction fee coverage is
 * enabled.
 */
export declare function applyDefaultAppCallMaxFees<TFee>(transactions: ComposerTransactionWithMaxFee<TFee>[], maxFee: TFee): void;
export declare function SpendAllowanceTypeFromString(type: string): bigint;
export declare function AllowancesToTuple(allowances: AddAllowanceArgs[]): [number | bigint, number | bigint, number | bigint, number | bigint, number | bigint, boolean][];
export declare function AllowanceInfoTranslate(info: SubAllowanceInfo): AllowanceInfo;
export declare function executionBoxKey(lease: string): Uint8Array;
/**
 * Size of the wallet's execution key box (`'x' + lease`) for a key with `groups` group ids: an
 * `ExecutionInfo` of two rounds and a list of 32-byte ids, 20 B plus 32 B per group.
 */
export declare function executionKeyBoxBytes(groups: number): number;
export declare function domainBoxKey(address: string | Address): Uint8Array;
export declare class ValueMap<K extends object, V> {
    private map;
    private keyGenerator;
    constructor(keyGenerator: (obj: K) => string, iterable?: Iterable<readonly [K | Partial<K> | string, V]>);
    private generateKey;
    set(key: K | Partial<K> | string, value: V): this;
    get(key: K | Partial<K> | string): V | undefined;
    has(key: K | Partial<K> | string): boolean;
    delete(key: K | Partial<K> | string): boolean;
    clear(): void;
    get size(): number;
    keys(): IterableIterator<string>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[string, V]>;
    forEach(callbackfn: (value: V, key: string, map: Map<string, V>) => void): void;
    [Symbol.iterator](): IterableIterator<[string, V]>;
}
export declare const getTxns: ({}: PluginHookParams) => Promise<PluginTxn[]>;
export {};
