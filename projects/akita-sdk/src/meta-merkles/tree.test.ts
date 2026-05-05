import { describe, test, expect } from 'vitest'
import { sha256 } from '@noble/hashes/sha256'
import {
  bytesToHex,
  hexToBytes,
  encodeValue,
  encodeLeaf,
  hashLeaf,
  MerkleTree,
  createUint64Tree,
  createAssetTree,
  createAddressTree,
  verifyProof,
} from './tree'
import { SchemaPart } from './types'

describe('bytesToHex / hexToBytes', () => {
  test('bytesToHex prefixes with 0x and zero-pads', () => {
    expect(bytesToHex(new Uint8Array([0x01, 0x0f, 0xff]))).toBe('0x010fff')
  })

  test('bytesToHex on empty array', () => {
    expect(bytesToHex(new Uint8Array([]))).toBe('0x')
  })

  test('hexToBytes accepts 0x-prefixed input', () => {
    expect(Array.from(hexToBytes('0x010fff'))).toEqual([0x01, 0x0f, 0xff])
  })

  test('hexToBytes accepts unprefixed input', () => {
    expect(Array.from(hexToBytes('010fff'))).toEqual([0x01, 0x0f, 0xff])
  })

  test('round-trip bytesToHex → hexToBytes', () => {
    const original = new Uint8Array([0, 1, 2, 255, 128, 64])
    const hex = bytesToHex(original)
    const decoded = hexToBytes(hex)
    expect(Array.from(decoded)).toEqual(Array.from(original))
  })
})

describe('encodeValue', () => {
  describe('unsigned integers (big-endian)', () => {
    test('Uint8: 0xff', () => {
      expect(Array.from(encodeValue(0xff, SchemaPart.Uint8))).toEqual([0xff])
    })

    test('Uint8: overflow truncates (& 0xff)', () => {
      // Lock in current masking behavior: 256 → 0
      expect(Array.from(encodeValue(256, SchemaPart.Uint8))).toEqual([0])
    })

    test('Uint16: 0x1234 big-endian', () => {
      expect(Array.from(encodeValue(0x1234, SchemaPart.Uint16))).toEqual([0x12, 0x34])
    })

    test('Uint32: 0x12345678 big-endian', () => {
      expect(Array.from(encodeValue(0x12345678, SchemaPart.Uint32))).toEqual([0x12, 0x34, 0x56, 0x78])
    })

    test('Uint64: 1n produces 8-byte big-endian', () => {
      expect(Array.from(encodeValue(1n, SchemaPart.Uint64))).toEqual([0, 0, 0, 0, 0, 0, 0, 1])
    })

    test('Uint64: max value (2^64 - 1) fills with 0xff', () => {
      const max = (1n << 64n) - 1n
      expect(Array.from(encodeValue(max, SchemaPart.Uint64))).toEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
    })

    test('Uint64: accepts number input', () => {
      expect(Array.from(encodeValue(42, SchemaPart.Uint64))).toEqual([0, 0, 0, 0, 0, 0, 0, 42])
    })

    test('Uint128: produces 16 bytes big-endian', () => {
      const result = encodeValue(1n, SchemaPart.Uint128)
      expect(result.length).toBe(16)
      expect(result[15]).toBe(1)
      expect(result[0]).toBe(0)
    })

    test('Uint256: produces 32 bytes big-endian', () => {
      const result = encodeValue(0xffn, SchemaPart.Uint256)
      expect(result.length).toBe(32)
      expect(result[31]).toBe(0xff)
      // Everything above the low byte is zero
      for (let i = 0; i < 31; i++) expect(result[i]).toBe(0)
    })

    test('Uint512: produces 64 bytes big-endian', () => {
      const result = encodeValue(1n, SchemaPart.Uint512)
      expect(result.length).toBe(64)
      expect(result[63]).toBe(1)
    })
  })

  describe('fixed-length byte arrays', () => {
    test('Bytes4 from hex string', () => {
      const result = encodeValue('0xdeadbeef', SchemaPart.Bytes4)
      expect(Array.from(result)).toEqual([0xde, 0xad, 0xbe, 0xef])
    })

    test('Bytes32 from hex string', () => {
      const hex = '0x' + 'ab'.repeat(32)
      const result = encodeValue(hex, SchemaPart.Bytes32)
      expect(result.length).toBe(32)
      for (const byte of result) expect(byte).toBe(0xab)
    })

    test('Bytes32 accepts Uint8Array directly', () => {
      const bytes = new Uint8Array(32).fill(0x07)
      const result = encodeValue(bytes, SchemaPart.Bytes32)
      expect(result).toBe(bytes)
    })

    test('throws when Uint8Array length mismatches schema', () => {
      const bytes = new Uint8Array(16) // wrong length for Bytes32
      expect(() => encodeValue(bytes, SchemaPart.Bytes32)).toThrow(/Expected 32 bytes, got 16/)
    })

    test('throws when hex string length mismatches schema', () => {
      expect(() => encodeValue('0xdead', SchemaPart.Bytes4)).toThrow(/Expected 4 bytes, got 2/)
    })
  })

  describe('String', () => {
    test('encodes as UTF-8', () => {
      const result = encodeValue('hello', SchemaPart.String)
      expect(Array.from(result)).toEqual([0x68, 0x65, 0x6c, 0x6c, 0x6f])
    })

    test('encodes unicode', () => {
      // € (U+20AC) → [0xe2, 0x82, 0xac]
      const result = encodeValue('€', SchemaPart.String)
      expect(Array.from(result)).toEqual([0xe2, 0x82, 0xac])
    })

    test('encodes empty string as empty bytes', () => {
      expect(encodeValue('', SchemaPart.String).length).toBe(0)
    })
  })

  describe('Address', () => {
    test('accepts 32-byte Uint8Array', () => {
      const bytes = new Uint8Array(32).fill(0x11)
      const result = encodeValue(bytes, SchemaPart.Address)
      expect(result).toBe(bytes)
    })

    test('rejects non-32-byte Uint8Array', () => {
      const bytes = new Uint8Array(31).fill(0x11)
      expect(() => encodeValue(bytes, SchemaPart.Address)).toThrow(/Address must be 32 bytes/)
    })

    test('rejects base32 strings (must use Uint8Array)', () => {
      // 58-char base32 address should route to the "provide as Uint8Array" error.
      const addr = 'A'.repeat(58)
      expect(() => encodeValue(addr, SchemaPart.Address)).toThrow(/provide address as Uint8Array/)
    })
  })

  test('throws on unknown schema part', () => {
    expect(() => encodeValue(1, 999 as SchemaPart)).toThrow(/Unknown schema part/)
  })
})

describe('encodeLeaf', () => {
  test('concatenates multiple encoded fields in order', () => {
    // [uint8(0x01), uint16(0x0203)] → [0x01, 0x02, 0x03]
    const result = encodeLeaf([1, 0x0203], [SchemaPart.Uint8, SchemaPart.Uint16])
    expect(Array.from(result)).toEqual([0x01, 0x02, 0x03])
  })

  test('single field produces same output as encodeValue', () => {
    const leaf = encodeLeaf([42n], [SchemaPart.Uint64])
    const value = encodeValue(42n, SchemaPart.Uint64)
    expect(Array.from(leaf)).toEqual(Array.from(value))
  })

  test('throws when values and schema lengths mismatch', () => {
    expect(() => encodeLeaf([1, 2], [SchemaPart.Uint8]))
      .toThrow(/Values length \(2\) must match schema length \(1\)/)
  })

  test('handles empty inputs', () => {
    expect(encodeLeaf([], []).length).toBe(0)
  })
})

describe('hashLeaf', () => {
  test('double-hashes with SHA256 (standard leaf prefix defense)', () => {
    const input = new Uint8Array([1, 2, 3])
    const expected = sha256(sha256(input))
    expect(Array.from(hashLeaf(input))).toEqual(Array.from(expected))
  })

  test('produces 32-byte output', () => {
    expect(hashLeaf(new Uint8Array([1])).length).toBe(32)
  })

  test('is deterministic', () => {
    const a = hashLeaf(new Uint8Array([1, 2, 3]))
    const b = hashLeaf(new Uint8Array([1, 2, 3]))
    expect(Array.from(a)).toEqual(Array.from(b))
  })

  test('differs for different inputs', () => {
    const a = hashLeaf(new Uint8Array([1]))
    const b = hashLeaf(new Uint8Array([2]))
    expect(Array.from(a)).not.toEqual(Array.from(b))
  })
})

describe('MerkleTree', () => {
  describe('construction', () => {
    test('MerkleTree.of throws on empty input', () => {
      expect(() => MerkleTree.of([], [SchemaPart.Uint64])).toThrow(/Cannot create merkle tree with no values/)
    })

    test('MerkleTree.ofSimple wraps each value in a single-element array', () => {
      const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64)
      expect(tree.length).toBe(3)
      expect(tree.getValue(0)).toEqual([1n])
      expect(tree.getValue(1)).toEqual([2n])
      expect(tree.getValue(2)).toEqual([3n])
    })

    test('createUint64Tree is equivalent to ofSimple(Uint64)', () => {
      const a = createUint64Tree([1n, 2n, 3n])
      const b = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64)
      expect(a.rootHex).toBe(b.rootHex)
    })

    test('createAssetTree is equivalent to createUint64Tree (asset IDs are uint64)', () => {
      const a = createAssetTree([100n, 200n, 300n])
      const b = createUint64Tree([100n, 200n, 300n])
      expect(a.rootHex).toBe(b.rootHex)
    })

    test('createAddressTree stores 32-byte addresses', () => {
      const addr1 = new Uint8Array(32).fill(0x01)
      const addr2 = new Uint8Array(32).fill(0x02)
      const tree = createAddressTree([addr1, addr2])
      expect(tree.length).toBe(2)
    })
  })

  describe('single-leaf tree', () => {
    test('root equals the single leaf hash', () => {
      const tree = MerkleTree.ofSimple([42n], SchemaPart.Uint64)
      const expectedLeafHash = hashLeaf(encodeLeaf([42n], [SchemaPart.Uint64]))
      expect(Array.from(tree.root)).toEqual(Array.from(expectedLeafHash))
    })

    test('length is 1', () => {
      const tree = MerkleTree.ofSimple([42n], SchemaPart.Uint64)
      expect(tree.length).toBe(1)
    })

    test('getProof returns empty proof', () => {
      const tree = MerkleTree.ofSimple([42n], SchemaPart.Uint64)
      expect(tree.getProof(0)).toEqual([])
    })

    test('verify succeeds with empty proof', () => {
      const tree = MerkleTree.ofSimple([42n], SchemaPart.Uint64)
      expect(tree.verify(0)).toBe(true)
    })
  })

  describe('multi-leaf tree (power-of-2 size)', () => {
    const values = [1n, 2n, 3n, 4n]
    let tree: MerkleTree<[bigint]>

    test('builds a tree of 4 values', () => {
      tree = MerkleTree.ofSimple(values, SchemaPart.Uint64)
      expect(tree.length).toBe(4)
    })

    test('root is 32 bytes', () => {
      tree = MerkleTree.ofSimple(values, SchemaPart.Uint64)
      expect(tree.root.length).toBe(32)
    })

    test('rootHex is 0x-prefixed 64-char string', () => {
      tree = MerkleTree.ofSimple(values, SchemaPart.Uint64)
      expect(tree.rootHex).toMatch(/^0x[0-9a-f]{64}$/)
    })

    test('every leaf verifies against the root', () => {
      tree = MerkleTree.ofSimple(values, SchemaPart.Uint64)
      for (let i = 0; i < values.length; i++) {
        expect(tree.verify(i)).toBe(true)
      }
    })

    test('verify fails for wrong proof', () => {
      tree = MerkleTree.ofSimple(values, SchemaPart.Uint64)
      // Use leaf 0's proof to try to verify leaf 1
      const wrongProof = tree.getProof(0)
      expect(tree.verify(1, wrongProof)).toBe(false)
    })

    test('getProof returns log2(N) siblings for power-of-2 size', () => {
      tree = MerkleTree.ofSimple(values, SchemaPart.Uint64)
      expect(tree.getProof(0).length).toBe(2) // log2(4) = 2
    })
  })

  describe('multi-leaf tree (non-power-of-2 size)', () => {
    test('builds and verifies a 3-leaf tree', () => {
      const tree = MerkleTree.ofSimple([10n, 20n, 30n], SchemaPart.Uint64)
      expect(tree.length).toBe(3)
      for (let i = 0; i < 3; i++) {
        expect(tree.verify(i)).toBe(true)
      }
    })

    test('builds and verifies a 5-leaf tree', () => {
      const tree = MerkleTree.ofSimple([1n, 2n, 3n, 4n, 5n], SchemaPart.Uint64)
      for (let i = 0; i < 5; i++) {
        expect(tree.verify(i)).toBe(true)
      }
    })

    test('builds and verifies a 7-leaf tree', () => {
      const tree = MerkleTree.ofSimple([1n, 2n, 3n, 4n, 5n, 6n, 7n], SchemaPart.Uint64)
      for (let i = 0; i < 7; i++) {
        expect(tree.verify(i)).toBe(true)
      }
    })
  })

  describe('out-of-bounds index', () => {
    test('getProof throws', () => {
      const tree = MerkleTree.ofSimple([1n, 2n], SchemaPart.Uint64)
      expect(() => tree.getProof(-1)).toThrow(/Index -1 out of bounds/)
      expect(() => tree.getProof(2)).toThrow(/Index 2 out of bounds/)
    })

    test('getValue throws', () => {
      const tree = MerkleTree.ofSimple([1n, 2n], SchemaPart.Uint64)
      expect(() => tree.getValue(-1)).toThrow(/Index -1 out of bounds/)
      expect(() => tree.getValue(5)).toThrow(/Index 5 out of bounds/)
    })

    test('getLeafHash throws', () => {
      const tree = MerkleTree.ofSimple([1n, 2n], SchemaPart.Uint64)
      expect(() => tree.getLeafHash(-1)).toThrow(/Index -1 out of bounds/)
      expect(() => tree.getLeafHash(5)).toThrow(/Index 5 out of bounds/)
    })
  })

  describe('search helpers', () => {
    test('findIndex returns the first matching index', () => {
      const tree = MerkleTree.ofSimple([10n, 20n, 30n, 20n], SchemaPart.Uint64)
      expect(tree.findIndex(([v]) => v === 20n)).toBe(1)
    })

    test('findIndex returns -1 when no match', () => {
      const tree = MerkleTree.ofSimple([10n, 20n, 30n], SchemaPart.Uint64)
      expect(tree.findIndex(([v]) => v === 999n)).toBe(-1)
    })

    test('getProofFor returns {index, proof} for first match', () => {
      const tree = MerkleTree.ofSimple([10n, 20n, 30n], SchemaPart.Uint64)
      const result = tree.getProofFor(([v]) => v === 20n)
      expect(result).not.toBeNull()
      expect(result!.index).toBe(1)
      // Verify that the returned proof actually works
      expect(tree.verify(1, result!.proof)).toBe(true)
    })

    test('getProofFor returns null when no match', () => {
      const tree = MerkleTree.ofSimple([10n, 20n], SchemaPart.Uint64)
      expect(tree.getProofFor(([v]) => v === 999n)).toBeNull()
    })
  })

  describe('verify determinism', () => {
    test('verify succeeds whether proof is passed or computed', () => {
      const tree = MerkleTree.ofSimple([1n, 2n, 3n, 4n, 5n], SchemaPart.Uint64)
      // No proof arg → computed internally
      expect(tree.verify(2)).toBe(true)
      // Explicit proof arg
      expect(tree.verify(2, tree.getProof(2))).toBe(true)
    })
  })

  describe('entries generator', () => {
    test('yields all [index, value] pairs in order', () => {
      const tree = MerkleTree.ofSimple([10n, 20n, 30n], SchemaPart.Uint64)
      const collected: [number, [bigint]][] = []
      for (const entry of tree.entries()) collected.push(entry)
      expect(collected).toEqual([
        [0, [10n]],
        [1, [20n]],
        [2, [30n]],
      ])
    })
  })

  describe('dump', () => {
    test('produces a JSON-serializable object with standard-v1 format', () => {
      const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64)
      const dumped = tree.dump()
      expect(dumped.format).toBe('standard-v1')
      expect(dumped.tree.length).toBe(5) // 2n-1 for n=3
      expect(dumped.values.length).toBe(3)
      expect(dumped.leafEncoding).toBe('Uint64')
    })

    test('can be JSON round-tripped', () => {
      const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64)
      const dumped = tree.dump()
      // bigint doesn't serialize directly; coerce values for the round-trip check
      const coerced = {
        ...dumped,
        values: dumped.values.map(v => ({
          ...v,
          value: (v.value as [bigint]).map(x => x.toString()),
        })),
      }
      const json = JSON.stringify(coerced)
      const parsed = JSON.parse(json)
      expect(parsed.format).toBe('standard-v1')
    })
  })
})

describe('verifyProof (standalone)', () => {
  test('verifies a valid proof against the root', () => {
    const tree = MerkleTree.ofSimple([1n, 2n, 3n, 4n], SchemaPart.Uint64)
    const proof = tree.getProof(1)
    const leaf = tree.getLeafHash(1)
    expect(verifyProof(tree.root, leaf, proof)).toBe(true)
  })

  test('rejects a proof for the wrong leaf', () => {
    const tree = MerkleTree.ofSimple([1n, 2n, 3n, 4n], SchemaPart.Uint64)
    const proof = tree.getProof(1)
    const wrongLeaf = tree.getLeafHash(2) // different leaf
    expect(verifyProof(tree.root, wrongLeaf, proof)).toBe(false)
  })

  test('rejects a proof against the wrong root', () => {
    const tree = MerkleTree.ofSimple([1n, 2n, 3n, 4n], SchemaPart.Uint64)
    const proof = tree.getProof(1)
    const leaf = tree.getLeafHash(1)
    const wrongRoot = new Uint8Array(32) // all zeros
    expect(verifyProof(wrongRoot, leaf, proof)).toBe(false)
  })

  test('rejects when root length differs from hash length', () => {
    const tree = MerkleTree.ofSimple([1n, 2n], SchemaPart.Uint64)
    const proof = tree.getProof(0)
    const leaf = tree.getLeafHash(0)
    const shortRoot = new Uint8Array(16)
    expect(verifyProof(shortRoot, leaf, proof)).toBe(false)
  })

  test('matches MerkleTree.verify for the same inputs', () => {
    const tree = MerkleTree.ofSimple([1n, 2n, 3n, 4n, 5n, 6n, 7n], SchemaPart.Uint64)
    for (let i = 0; i < 7; i++) {
      const viaClass = tree.verify(i)
      const viaStandalone = verifyProof(tree.root, tree.getLeafHash(i), tree.getProof(i))
      expect(viaStandalone).toBe(viaClass)
    }
  })
})

describe('tree determinism', () => {
  test('same inputs produce same root', () => {
    const t1 = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64)
    const t2 = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64)
    expect(t1.rootHex).toBe(t2.rootHex)
  })

  test('different input order produces different root', () => {
    const t1 = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64)
    const t2 = MerkleTree.ofSimple([3n, 2n, 1n], SchemaPart.Uint64)
    expect(t1.rootHex).not.toBe(t2.rootHex)
  })
})
