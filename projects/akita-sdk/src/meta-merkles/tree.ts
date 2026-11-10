/** Frozen field-concatenation encoding for existing MetaMerkles roots. */
import { SchemaPart } from "./types";
import { MerkleTree as Arc4MerkleTree, hexToBytes } from "../meta/tree";
export { bytesToHex, hexToBytes, hashLeaf, verifyProof } from "../meta/tree";
export type { HexString, MerkleTreeDump } from "../meta/tree";


/**
 * Encodes a value as bytes according to a schema part type.
 */
export function encodeValue(value: unknown, schemaPart: SchemaPart): Uint8Array {
  switch (schemaPart) {
    case SchemaPart.Uint8: {
      const buf = new Uint8Array(1);
      buf[0] = Number(value) & 0xff;
      return buf;
    }
    case SchemaPart.Uint16: {
      const buf = new Uint8Array(2);
      const view = new DataView(buf.buffer);
      view.setUint16(0, Number(value), false);
      return buf;
    }
    case SchemaPart.Uint32: {
      const buf = new Uint8Array(4);
      const view = new DataView(buf.buffer);
      view.setUint32(0, Number(value), false);
      return buf;
    }
    case SchemaPart.Uint64: {
      const buf = new Uint8Array(8);
      const view = new DataView(buf.buffer);
      view.setBigUint64(0, BigInt(value as bigint | number), false);
      return buf;
    }
    case SchemaPart.Uint128: {
      const buf = new Uint8Array(16);
      let n = BigInt(value as bigint | number);
      for (let i = 15; i >= 0; i--) {
        buf[i] = Number(n & 0xffn);
        n >>= 8n;
      }
      return buf;
    }
    case SchemaPart.Uint256: {
      const buf = new Uint8Array(32);
      let n = BigInt(value as bigint | number);
      for (let i = 31; i >= 0; i--) {
        buf[i] = Number(n & 0xffn);
        n >>= 8n;
      }
      return buf;
    }
    case SchemaPart.Uint512: {
      const buf = new Uint8Array(64);
      let n = BigInt(value as bigint | number);
      for (let i = 63; i >= 0; i--) {
        buf[i] = Number(n & 0xffn);
        n >>= 8n;
      }
      return buf;
    }
    case SchemaPart.Bytes4:
    case SchemaPart.Bytes8:
    case SchemaPart.Bytes16:
    case SchemaPart.Bytes32:
    case SchemaPart.Bytes64:
    case SchemaPart.Bytes128:
    case SchemaPart.Bytes256:
    case SchemaPart.Bytes512: {
      const sizes: Record<number, number> = {
        [SchemaPart.Bytes4]: 4,
        [SchemaPart.Bytes8]: 8,
        [SchemaPart.Bytes16]: 16,
        [SchemaPart.Bytes32]: 32,
        [SchemaPart.Bytes64]: 64,
        [SchemaPart.Bytes128]: 128,
        [SchemaPart.Bytes256]: 256,
        [SchemaPart.Bytes512]: 512,
      };
      const size = sizes[schemaPart];
      if (value instanceof Uint8Array) {
        if (value.length !== size) {
          throw new Error(`Expected ${size} bytes, got ${value.length}`);
        }
        return value;
      }
      // Handle hex string
      const bytes = hexToBytes(value as string);
      if (bytes.length !== size) {
        throw new Error(`Expected ${size} bytes, got ${bytes.length}`);
      }
      return bytes;
    }
    case SchemaPart.String: {
      return new TextEncoder().encode(value as string);
    }
    case SchemaPart.Address: {
      // Algorand addresses are 32 bytes when decoded from base32
      const addr = value as string;
      // Use algosdk-style decoding or raw bytes
      if (addr.length === 58) {
        // Base32 encoded Algorand address - decode it
        // For simplicity, if you have algosdk available, use decodeAddress
        // Here we'll just use raw bytes if provided as Uint8Array
        throw new Error("Please provide address as Uint8Array (32 bytes) or use decodeAlgorandAddress helper");
      }
      if (value instanceof Uint8Array && value.length === 32) {
        return value;
      }
      throw new Error("Address must be 32 bytes");
    }
    default:
      throw new Error(`Unknown schema part: ${schemaPart}`);
  }
}

/**
 * Encodes a leaf value using the given schema.
 * For single values, pass a single-element array schema.
 * For tuples, pass values and schema arrays of matching length.
 */
export function encodeLeaf(values: unknown[], schema: SchemaPart[]): Uint8Array {
  if (values.length !== schema.length) {
    throw new Error(`Values length (${values.length}) must match schema length (${schema.length})`);
  }

  const encoded = values.map((v, i) => encodeValue(v, schema[i]));
  const totalLength = encoded.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);

  let offset = 0;
  for (const arr of encoded) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}


/** Rebuilds legacy roots without changing the shared Merkle proof algorithm. */
export class MerkleTree<T extends unknown[]> extends Arc4MerkleTree<T> {
  static override of<T extends unknown[]>(values: T[], schema: SchemaPart[]): MerkleTree<T> {
    if (values.length === 0) throw new Error("Cannot create merkle tree with no values");
    return new MerkleTree(values, schema, encodeLeaf, "standard-v1");
  }
}

export function createAddressTree(addresses: Uint8Array[]): MerkleTree<[Uint8Array]> {
  return MerkleTree.ofSimple(addresses, SchemaPart.Address);
}

export function createUint64Tree(values: (bigint | number)[]): MerkleTree<[bigint | number]> {
  return MerkleTree.ofSimple(values, SchemaPart.Uint64);
}

export function createAssetTree(assetIds: (bigint | number)[]): MerkleTree<[bigint | number]> {
  return createUint64Tree(assetIds);
}
