"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/meta/types.ts
var SchemaPart = /* @__PURE__ */ ((SchemaPart2) => {
  SchemaPart2[SchemaPart2["Uint8"] = 10] = "Uint8";
  SchemaPart2[SchemaPart2["Uint16"] = 11] = "Uint16";
  SchemaPart2[SchemaPart2["Uint32"] = 12] = "Uint32";
  SchemaPart2[SchemaPart2["Uint64"] = 13] = "Uint64";
  SchemaPart2[SchemaPart2["Uint128"] = 14] = "Uint128";
  SchemaPart2[SchemaPart2["Uint256"] = 15] = "Uint256";
  SchemaPart2[SchemaPart2["Uint512"] = 16] = "Uint512";
  SchemaPart2[SchemaPart2["Bytes4"] = 20] = "Bytes4";
  SchemaPart2[SchemaPart2["Bytes8"] = 21] = "Bytes8";
  SchemaPart2[SchemaPart2["Bytes16"] = 22] = "Bytes16";
  SchemaPart2[SchemaPart2["Bytes32"] = 23] = "Bytes32";
  SchemaPart2[SchemaPart2["Bytes64"] = 24] = "Bytes64";
  SchemaPart2[SchemaPart2["Bytes128"] = 25] = "Bytes128";
  SchemaPart2[SchemaPart2["Bytes256"] = 26] = "Bytes256";
  SchemaPart2[SchemaPart2["Bytes512"] = 27] = "Bytes512";
  SchemaPart2[SchemaPart2["String"] = 30] = "String";
  SchemaPart2[SchemaPart2["Address"] = 40] = "Address";
  return SchemaPart2;
})(SchemaPart || {});
var MerkleTreeType = /* @__PURE__ */ ((MerkleTreeType2) => {
  MerkleTreeType2[MerkleTreeType2["Unspecified"] = 0] = "Unspecified";
  MerkleTreeType2[MerkleTreeType2["Collection"] = 1] = "Collection";
  MerkleTreeType2[MerkleTreeType2["Trait"] = 2] = "Trait";
  MerkleTreeType2[MerkleTreeType2["Trade"] = 3] = "Trade";
  MerkleTreeType2[MerkleTreeType2["Whitelist"] = 4] = "Whitelist";
  MerkleTreeType2[MerkleTreeType2["Addresses"] = 5] = "Addresses";
  return MerkleTreeType2;
})(MerkleTreeType || {});

// src/meta/tree.ts
var _algosdk = require('algosdk');
var _sha2js = require('@noble/hashes/sha2.js');
function bytesToHex(bytes) {
  return `0x${Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("")}`;
}
function hexToBytes(hex) {
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleanHex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
function compareBytes(a, b) {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }
  return a.length - b.length;
}
function hashPair(a, b) {
  if (compareBytes(a, b) > 0) {
    return _sha2js.sha256.call(void 0, new Uint8Array([...b, ...a]));
  }
  return _sha2js.sha256.call(void 0, new Uint8Array([...a, ...b]));
}
var schemaTypes = {
  [10 /* Uint8 */]: "uint8",
  [11 /* Uint16 */]: "uint16",
  [12 /* Uint32 */]: "uint32",
  [13 /* Uint64 */]: "uint64",
  [14 /* Uint128 */]: "uint128",
  [15 /* Uint256 */]: "uint256",
  [16 /* Uint512 */]: "uint512",
  [20 /* Bytes4 */]: "byte[4]",
  [21 /* Bytes8 */]: "byte[8]",
  [22 /* Bytes16 */]: "byte[16]",
  [23 /* Bytes32 */]: "byte[32]",
  [24 /* Bytes64 */]: "byte[64]",
  [25 /* Bytes128 */]: "byte[128]",
  [26 /* Bytes256 */]: "byte[256]",
  [27 /* Bytes512 */]: "byte[512]",
  [30 /* String */]: "string",
  [40 /* Address */]: "address"
};
function schemaPartType(part) {
  const type = schemaTypes[part];
  if (type === void 0) throw new Error(`Unknown schema part: ${part}`);
  return type;
}
function schemaToAbiType(schema) {
  return `(${schema.map(schemaPartType).join(",")})`;
}
function abiValue(value, type) {
  if (type.startsWith("byte[")) {
    if (typeof value === "string") {
      if (!/^(?:0x)?(?:[0-9a-fA-F]{2})*$/.test(value)) throw new Error("Invalid hexadecimal byte string");
      return hexToBytes(value);
    }
    if (!(value instanceof Uint8Array)) throw new Error("Byte fields require Uint8Array or hexadecimal strings");
  }
  if (type === "string" && typeof value !== "string") throw new Error("String fields require strings");
  if (type.startsWith("uint") && typeof value === "string") {
    if (!/^[0-9]+$/.test(value)) throw new Error("Unsigned integer strings must contain decimal digits");
    return BigInt(value);
  }
  return value;
}
function encodeValue(value, schemaPart) {
  const type = schemaPartType(schemaPart);
  return _algosdk.ABIType.from(type).encode(abiValue(value, type));
}
function encodeLeaf(values, schema) {
  if (values.length !== schema.length) {
    throw new Error(`Values length (${values.length}) must match schema length (${schema.length})`);
  }
  const types = schema.map(schemaPartType);
  return _algosdk.ABIType.from(schemaToAbiType(schema)).encode(values.map((value, i) => abiValue(value, types[i])));
}
function hashLeaf(encodedLeaf) {
  return _sha2js.sha256.call(void 0, _sha2js.sha256.call(void 0, encodedLeaf));
}
var MerkleTree = class _MerkleTree {
  // value index -> tree index
  constructor(values, schema, encodeLeafValue = encodeLeaf, format = "arc4-v1") {
    this.encodeLeafValue = encodeLeafValue;
    this.format = format;
    this.values = values;
    this.schema = schema;
    this.leafIndices = /* @__PURE__ */ new Map();
    this.tree = this.buildTree();
  }
  
  
  
  
  
  
  /**
   * Creates a new merkle tree from an array of values.
   *
   * For single-value leaves (e.g., uint64[]), pass each value as an array: [[1n], [2n], [3n]]
   * Or use the convenience form with a single-element schema.
   *
   * @param values - Array of leaf values (each value is an array matching the schema)
   * @param schema - The schema defining how to encode each leaf
   */
  static of(values, schema) {
    if (values.length === 0) {
      throw new Error("Cannot create merkle tree with no values");
    }
    return new _MerkleTree(values, schema);
  }
  /**
   * Creates a merkle tree for simple single-type values.
   *
   * @example
   * ```ts
   * // Tree of addresses
   * const tree = MerkleTree.ofSimple(addresses, SchemaPart.Address);
   *
   * // Tree of uint64 values
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * ```
   */
  static ofSimple(values, schemaPart) {
    return this.of(
      values.map((v) => [v]),
      [schemaPart]
    );
  }
  /**
   * Loads a merkle tree from a dump (useful for persistence).
   */
  static load(dump, schema) {
    const values = dump.values.map((v) => v.value);
    const tree = this.of(values, schema);
    const rebuilt = tree.dump();
    if (dump.format !== rebuilt.format) {
      throw new Error("Tree encoding format mismatch: use meta for arc4-v1 and meta-merkles for legacy standard-v1 dumps");
    }
    if (dump.leafEncoding !== rebuilt.leafEncoding || dump.tree.length !== rebuilt.tree.length || dump.tree.some((hash, i) => hash !== rebuilt.tree[i])) {
      throw new Error("Tree dump does not match its values and leaf schema");
    }
    return tree;
  }
  buildTree() {
    const leaves = this.values.map((v) => hashLeaf(this.encodeLeafValue(v, this.schema)));
    const n = leaves.length;
    const treeSize = 2 * n - 1;
    const tree = new Array(treeSize);
    for (let i = 0; i < n; i++) {
      tree[treeSize - n + i] = leaves[i];
      this.leafIndices.set(i, treeSize - n + i);
    }
    for (let i = treeSize - n - 1; i >= 0; i--) {
      const left = tree[2 * i + 1];
      const right = tree[2 * i + 2];
      tree[i] = right ? hashPair(left, right) : left;
    }
    return tree;
  }
  /**
   * The merkle root as a 32-byte Uint8Array.
   */
  get root() {
    return this.tree[0];
  }
  /**
   * The merkle root as a hex string (0x prefixed).
   */
  get rootHex() {
    return bytesToHex(this.root);
  }
  /**
   * Number of leaves in the tree.
   */
  get length() {
    return this.values.length;
  }
  /**
   * Gets the proof for a leaf at the given index.
   * @param index - The index of the leaf value
   * @returns Array of 32-byte proof elements
   */
  getProof(index) {
    if (index < 0 || index >= this.values.length) {
      throw new Error(`Index ${index} out of bounds [0, ${this.values.length})`);
    }
    const proof = [];
    let treeIndex = this.leafIndices.get(index);
    while (treeIndex > 0) {
      const siblingIndex = treeIndex % 2 === 0 ? treeIndex - 1 : treeIndex + 1;
      if (siblingIndex < this.tree.length && this.tree[siblingIndex]) {
        proof.push(this.tree[siblingIndex]);
      }
      treeIndex = Math.floor((treeIndex - 1) / 2);
    }
    return proof;
  }
  /**
   * Gets the proof for a leaf at the given index as hex strings.
   */
  getProofHex(index) {
    return this.getProof(index).map(bytesToHex);
  }
  /**
   * Gets the leaf hash at the given index.
   */
  getLeafHash(index) {
    if (index < 0 || index >= this.values.length) {
      throw new Error(`Index ${index} out of bounds [0, ${this.values.length})`);
    }
    const treeIndex = this.leafIndices.get(index);
    return this.tree[treeIndex];
  }
  /**
   * Gets the leaf hash at the given index as a hex string.
   */
  getLeafHashHex(index) {
    return bytesToHex(this.getLeafHash(index));
  }
  /**
   * Verifies a proof locally (without calling the contract).
   * @param index - The index of the leaf value to verify
   * @param proof - The proof array (optional, will be computed if not provided)
   * @returns true if the proof is valid
   */
  verify(index, proof) {
    const actualProof = _nullishCoalesce(proof, () => ( this.getProof(index)));
    let hash = this.getLeafHash(index);
    for (const sibling of actualProof) {
      hash = hashPair(hash, sibling);
    }
    return this.compareBytes(hash, this.root);
  }
  compareBytes(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  /**
   * Iterates over all values with their indices.
   */
  *entries() {
    for (let i = 0; i < this.values.length; i++) {
      yield [i, this.values[i]];
    }
  }
  /**
   * Gets the value at the given index.
   */
  getValue(index) {
    if (index < 0 || index >= this.values.length) {
      throw new Error(`Index ${index} out of bounds [0, ${this.values.length})`);
    }
    return this.values[index];
  }
  /**
   * Finds the index of a value in the tree.
   * @param predicate - Function to test each value
   * @returns The index of the first matching value, or -1 if not found
   */
  findIndex(predicate) {
    for (let i = 0; i < this.values.length; i++) {
      if (predicate(this.values[i], i)) {
        return i;
      }
    }
    return -1;
  }
  /**
   * Gets proof for a value matching the predicate.
   */
  getProofFor(predicate) {
    const index = this.findIndex(predicate);
    if (index === -1) return null;
    return { index, proof: this.getProof(index) };
  }
  /**
   * Renders the tree as a string for debugging.
   */
  render() {
    const lines = ["Merkle Tree:"];
    lines.push(`  Root: ${this.rootHex}`);
    lines.push(`  Leaves: ${this.values.length}`);
    lines.push("  Values:");
    for (let i = 0; i < this.values.length; i++) {
      lines.push(`    [${i}] ${JSON.stringify(this.values[i])} -> ${this.getLeafHashHex(i)}`);
    }
    return lines.join("\n");
  }
  /**
   * Dumps the tree to a JSON-serializable format.
   */
  dump() {
    return {
      format: this.format,
      tree: this.tree.map(bytesToHex),
      values: this.values.map((value, i) => ({
        value,
        treeIndex: this.leafIndices.get(i)
      })),
      leafEncoding: this.format === "arc4-v1" ? schemaToAbiType(this.schema) : this.schema.map((s) => SchemaPart[s]).join(",")
    };
  }
};
function createAddressTree(addresses) {
  return MerkleTree.ofSimple(addresses, 40 /* Address */);
}
function createUint64Tree(values) {
  return MerkleTree.ofSimple(values, 13 /* Uint64 */);
}
function createAssetTree(assetIds) {
  return createUint64Tree(assetIds);
}
function verifyProof(root, leaf, proof) {
  let hash = leaf;
  for (const sibling of proof) {
    hash = hashPair(hash, sibling);
  }
  if (root.length !== hash.length) return false;
  for (let i = 0; i < root.length; i++) {
    if (root[i] !== hash[i]) return false;
  }
  return true;
}















exports.SchemaPart = SchemaPart; exports.MerkleTreeType = MerkleTreeType; exports.bytesToHex = bytesToHex; exports.hexToBytes = hexToBytes; exports.schemaToAbiType = schemaToAbiType; exports.encodeValue = encodeValue; exports.encodeLeaf = encodeLeaf; exports.hashLeaf = hashLeaf; exports.MerkleTree = MerkleTree; exports.createAddressTree = createAddressTree; exports.createUint64Tree = createUint64Tree; exports.createAssetTree = createAssetTree; exports.verifyProof = verifyProof;
//# sourceMappingURL=chunk-J43IZCZC.js.map