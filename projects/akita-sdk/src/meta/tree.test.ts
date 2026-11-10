import { ABIType, encodeAddress } from "algosdk";
import { describe, expect, test } from "vitest";
import { MerkleTree, encodeLeaf, encodeValue, hashLeaf, schemaToAbiType, verifyProof } from "./tree";
import { SchemaPart } from "./types";
import { MerkleTree as LegacyTree, encodeLeaf as legacyLeaf } from "../meta-merkles/tree";

const address = new Uint8Array(32).fill(7);
const uintParts = [SchemaPart.Uint8, SchemaPart.Uint16, SchemaPart.Uint32, SchemaPart.Uint64,
  SchemaPart.Uint128, SchemaPart.Uint256, SchemaPart.Uint512];
const uintSizes = [8, 16, 32, 64, 128, 256, 512];
const byteParts = [SchemaPart.Bytes4, SchemaPart.Bytes8, SchemaPart.Bytes16, SchemaPart.Bytes32,
  SchemaPart.Bytes64, SchemaPart.Bytes128, SchemaPart.Bytes256, SchemaPart.Bytes512];
const byteSizes = [4, 8, 16, 32, 64, 128, 256, 512];

describe("ARC-4 Merkle leaves", () => {
  test("every supported declaration matches the Algorand SDK tuple encoding", () => {
    const schema = [...uintParts, ...byteParts, SchemaPart.String, SchemaPart.Address];
    const values = [...uintSizes.map((bits) => (1n << BigInt(bits)) - 1n),
      ...byteSizes.map((size) => new Uint8Array(size).fill(size % 251)), "é🎨", address];
    const declaration = `(${[...uintSizes.map((bits) => `uint${bits}`),
      ...byteSizes.map((size) => `byte[${size}]`), "string", "address"].join(",")})`;
    expect(schemaToAbiType(schema)).toBe(declaration);
    expect(encodeLeaf(values, schema)).toEqual(ABIType.from(declaration).encode(values));
    expect(schemaToAbiType([])).toBe("()");
    expect(encodeLeaf([], [])).toEqual(new Uint8Array());
  });

  test.each([[["ab", "c"], "0004000800026162000163"],
    [["a", "bc"], "0004000700016100026263"],
    [["", ""], "0004000600000000"]] as const)("preserves boundaries for %j", (values, hex) => {
    expect(Buffer.from(encodeLeaf([...values], [SchemaPart.String, SchemaPart.String])).toString("hex")).toBe(hex);
  });

  test("single and mixed string fields include ABI prefixes and tuple offsets", () => {
    expect(encodeValue("é", SchemaPart.String)).toEqual(new Uint8Array([0, 2, 0xc3, 0xa9]));
    expect(encodeLeaf(["é"], [SchemaPart.String])).toEqual(new Uint8Array([0, 2, 0, 2, 0xc3, 0xa9]));
    expect(encodeLeaf([42n, "", "🎨"], [SchemaPart.Uint64, SchemaPart.String, SchemaPart.String]))
      .toEqual(ABIType.from("(uint64,string,string)").encode([42n, "", "🎨"]));
  });

  test("preserves fixed-width leaf bytes, complete roots, and proofs", () => {
    for (const schema of [[SchemaPart.Uint64], [SchemaPart.Address],
      [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64]]) {
      const values = [1, 2, 3].map((n) => schema.map((part) => part === SchemaPart.Address
        ? new Uint8Array(32).fill(n) : BigInt(n)));
      const current = MerkleTree.of(values, schema), legacy = LegacyTree.of(values, schema);
      expect(current.root).toEqual(legacy.root);
      for (let i = 0; i < values.length; i++) {
        expect(encodeLeaf(values[i], schema)).toEqual(legacyLeaf(values[i], schema));
        expect(current.getProof(i)).toEqual(legacy.getProof(i));
      }
    }
  });

  test.each(uintParts.map((part, i) => [part, uintSizes[i]] as const))("uint schema %i rejects truncation", (part, bits) => {
    for (const value of [-1n, 1n << BigInt(bits), 1.5, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => encodeLeaf([value], [part])).toThrow();
    }
  });

  test("normalizes supported address, hexadecimal, and decimal string inputs", () => {
    expect(encodeLeaf([encodeAddress(address), "0xdeadbeef", "18446744073709551615"],
      [SchemaPart.Address, SchemaPart.Bytes4, SchemaPart.Uint64]))
      .toEqual(ABIType.from("(address,byte[4],uint64)").encode([address, new Uint8Array([0xde, 0xad, 0xbe, 0xef]), (1n << 64n) - 1n]));
    for (const value of ["0xdeadbee", "0xdeadbeeg", new Uint8Array(3), [1, 2, 3, 4]])
      expect(() => encodeValue(value, SchemaPart.Bytes4)).toThrow();
    expect(() => encodeValue(42, SchemaPart.String)).toThrow();
    expect(() => encodeLeaf([1n], [255 as SchemaPart])).toThrow(/Unknown schema part/);
    expect(() => encodeLeaf([1n], [])).toThrow(/must match schema length/);
  });

  test("versioned dumps preserve roots and reject the other encoding or altered content", () => {
    const schema = [SchemaPart.String, SchemaPart.String];
    const values = [["ab", "c"], ["", "é"]];
    const current = MerkleTree.of(values, schema), legacy = LegacyTree.of(values, schema);
    expect(current.dump()).toMatchObject({ format: "arc4-v1", leafEncoding: "(string,string)" });
    expect(legacy.dump()).toMatchObject({ format: "standard-v1", leafEncoding: "String,String" });
    expect(MerkleTree.load(JSON.parse(JSON.stringify(current.dump())), schema).root).toEqual(current.root);
    expect(LegacyTree.load(JSON.parse(JSON.stringify(legacy.dump())), schema).root).toEqual(legacy.root);
    expect(() => MerkleTree.load(legacy.dump(), schema)).toThrow(/format mismatch/);
    expect(() => LegacyTree.load(current.dump(), schema)).toThrow(/format mismatch/);
    expect(() => MerkleTree.load({ ...current.dump(), values: [{ value: ["a", "bc"], treeIndex: 0 }] }, schema))
      .toThrow(/does not match/);
    expect(() => MerkleTree.load({ ...current.dump(), leafEncoding: "(uint64)" }, schema)).toThrow(/does not match/);
    const integers = MerkleTree.ofSimple([1n, 2n], SchemaPart.Uint64);
    const serialized = JSON.stringify(integers.dump(), (_, value) => typeof value === "bigint" ? value.toString() : value);
    expect(MerkleTree.load(JSON.parse(serialized), [SchemaPart.Uint64]).root).toEqual(integers.root);
  });

  test("the explicit legacy entry point still rebuilds old string roots", () => {
    const schema = [SchemaPart.String, SchemaPart.String];
    const legacy = LegacyTree.of([["ab", "c"]], schema);
    expect(legacy.root).toEqual(hashLeaf(new TextEncoder().encode("abc")));
    expect(verifyProof(legacy.root, hashLeaf(legacyLeaf(["a", "bc"], schema)), legacy.getProof(0))).toBe(true);
    expect(verifyProof(legacy.root, hashLeaf(encodeLeaf(["ab", "c"], schema)), legacy.getProof(0))).toBe(false);
  });
});
