import { Address } from "algosdk";
import { AllowanceInfo as SubAllowanceInfo } from "../generated/AbstractedAccountClient";
import { AddAllowanceArgs, AllowanceInfo } from "./types";
import { PluginHookParams, PluginTxn } from "../types";
export declare function SpendAllowanceTypeFromString(type: string): bigint;
export declare function AllowancesToTuple(allowances: AddAllowanceArgs[]): [number | bigint, number | bigint, number | bigint, number | bigint, number | bigint, boolean][];
export declare function AllowanceInfoTranslate(info: SubAllowanceInfo): AllowanceInfo;
export declare function executionBoxKey(lease: string): Uint8Array;
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
