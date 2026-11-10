/** Frozen field-concatenation encoding for existing MetaMerkles roots. */
import { SchemaPart } from "./types";
import { MerkleTree as Arc4MerkleTree } from "../meta/tree";
export { bytesToHex, hexToBytes, hashLeaf, verifyProof } from "../meta/tree";
export type { HexString, MerkleTreeDump } from "../meta/tree";
/**
 * Encodes a value as bytes according to a schema part type.
 */
export declare function encodeValue(value: unknown, schemaPart: SchemaPart): Uint8Array;
/**
 * Encodes a leaf value using the given schema.
 * For single values, pass a single-element array schema.
 * For tuples, pass values and schema arrays of matching length.
 */
export declare function encodeLeaf(values: unknown[], schema: SchemaPart[]): Uint8Array;
/** Rebuilds legacy roots without changing the shared Merkle proof algorithm. */
export declare class MerkleTree<T extends unknown[]> extends Arc4MerkleTree<T> {
    static of<T extends unknown[]>(values: T[], schema: SchemaPart[]): MerkleTree<T>;
}
export declare function createAddressTree(addresses: Uint8Array[]): MerkleTree<[Uint8Array]>;
export declare function createUint64Tree(values: (bigint | number)[]): MerkleTree<[bigint | number]>;
export declare function createAssetTree(assetIds: (bigint | number)[]): MerkleTree<[bigint | number]>;
