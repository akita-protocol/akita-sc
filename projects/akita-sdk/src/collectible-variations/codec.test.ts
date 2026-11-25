import { createHash } from 'node:crypto';
import algosdk from 'algosdk';
import { describe, expect, test } from 'vitest';
import { CollectibleVariationsSDK } from './index';
import {
  assetPolicyBoxName,
  concatBytes,
  decodeGrant,
  decodeMain,
  decodePolicy,
  decodeVariation,
  decodeWriterSet,
  encodeWriterSet,
  grantBoxName,
  mainBoxName,
  managerPolicyBoxName,
  metaRootName,
  parseDepositLog,
  uint64Bytes,
  variationBoxName,
  WriterSet,
} from './codec';
import { boxMbr } from './layout';
import { verifyProof } from '../meta/tree';

const a = algosdk.encodeAddress(new Uint8Array(32).fill(1));
const b = algosdk.encodeAddress(new Uint8Array(32).fill(2));
const pk = (x: string) => algosdk.decodeAddress(x).publicKey;
const text = (s: string) => new TextEncoder().encode(s);

describe('box names', () => {
  test('layouts and lengths', () => {
    const v = variationBoxName(7n, a, 'thumb');
    expect(v.length).toBe(46);
    expect(v[0]).toBe(0x76);
    expect([...v.slice(1, 9)]).toEqual([0, 0, 0, 0, 0, 0, 0, 7]);
    expect([...v.slice(9, 41)]).toEqual([...pk(a)]);
    expect(new TextDecoder().decode(v.slice(41))).toBe('thumb');
    expect(mainBoxName(7n)).toEqual(concatBytes(text('m'), uint64Bytes(7n)));
    expect(assetPolicyBoxName(7n)).toEqual(concatBytes(text('p'), uint64Bytes(7n)));
    expect(managerPolicyBoxName(a)).toEqual(concatBytes(text('P'), pk(a)));
    expect(grantBoxName(a)).toEqual(concatBytes(text('g'), pk(a)));
  });

  test('slot bounds', () => {
    expect(() => variationBoxName(1n, a, '')).toThrow();
    expect(() => variationBoxName(1n, a, 'x'.repeat(24))).toThrow();
    expect(variationBoxName(1n, a, 'x'.repeat(23)).length).toBe(64);
  });
});

describe('writer sets', () => {
  const sets: WriterSet[] = [
    { mode: 'closed' },
    { mode: 'open' },
    { mode: 'allow', writers: [a, b] },
    { mode: 'delegate', app: 1234n },
    { mode: 'meta', root: new Uint8Array(32).fill(9) },
  ];

  test('round trip', () => {
    for (const set of sets) {
      const bytes = encodeWriterSet(set);
      expect(decodeWriterSet(bytes)).toEqual({ set, length: bytes.length });
    }
    expect([...encodeWriterSet({ mode: 'delegate', app: 1n })]).toEqual([3, 0, 0, 0, 0, 0, 0, 0, 1]);
  });

  test('rejects malformed sets', () => {
    expect(() => encodeWriterSet({ mode: 'allow', writers: [] })).toThrow();
    expect(() => encodeWriterSet({ mode: 'allow', writers: Array(9).fill(a) })).toThrow();
    expect(() => encodeWriterSet({ mode: 'delegate', app: 0n })).toThrow();
    expect(() => encodeWriterSet({ mode: 'meta', root: new Uint8Array(32) })).toThrow();
    expect(() => decodeWriterSet(new Uint8Array([5]))).toThrow();
  });
});

describe('meta root names', () => {
  test('tag + base64url of the first 18 hash bytes, 25 bytes', () => {
    const name = assetPolicyBoxName(42n);
    const expected = 'c' + createHash('sha256').update(name).digest().subarray(0, 18).toString('base64url');
    expect(metaRootName('c', name)).toBe(expected);
    expect(metaRootName('c', name).length).toBe(25);
    expect(metaRootName('g', grantBoxName(a)).startsWith('g')).toBe(true);
  });
});

describe('box values', () => {
  test('collectible and holder-scope variations', () => {
    const flat = new Uint8Array([1, 2, 3]);
    const collectible = concatBytes(new Uint8Array([1, 0x80, 1, 2]), uint64Bytes(5n), new Uint8Array([0, 3]), flat, text('body'));
    expect(decodeVariation(collectible)).toEqual({
      format: 1,
      locked: true,
      holderScope: false,
      kind: 1,
      sub: 2,
      revision: 5n,
      flat,
      body: text('body'),
    });
    const holder = concatBytes(new Uint8Array([1, 0x01, 3, 0]), uint64Bytes(6n), new Uint8Array([0, 0]), pk(b), new Uint8Array([0]), text('{}'));
    const decoded = decodeVariation(holder);
    expect(decoded.holder).toBe(b);
    expect(decoded.decimals).toBe(0);
    expect(decoded.flat.length).toBe(0);
    expect(decoded.body).toEqual(text('{}'));
  });

  test('main box with both sections', () => {
    const core = (writer: string, slot: string, rev: bigint) =>
      concatBytes(pk(writer), new Uint8Array([slot.length]), text(slot), new Uint8Array(23 - slot.length), uint64Bytes(rev), new Uint8Array([1, 4]));
    const creator = concatBytes(core(a, 'thumb', 3n), new Uint8Array([9, 9]));
    const holder = concatBytes(pk(b), core(b, 'me', 8n), new Uint8Array([7]));
    const value = concatBytes(
      new Uint8Array([1, 0x80, 0]),
      uint64Bytes(11n),
      new Uint8Array([0, creator.length, 0, holder.length]),
      uint64Bytes(100n),
      uint64Bytes(200n),
      creator,
      holder,
    );
    const main = decodeMain(value);
    expect(main.creatorLocked).toBe(true);
    expect(main.revision).toBe(11n);
    expect(main.creatorDeposit).toBe(100n);
    expect(main.holderDeposit).toBe(200n);
    expect(main.creator).toEqual({ writer: a, slot: text('thumb'), sourceRevision: 3n, kind: 1, sub: 4, flat: new Uint8Array([9, 9]) });
    expect(main.holder?.holder).toBe(b);
    expect(main.holder?.slot).toEqual(text('me'));
    expect(main.holder?.flat).toEqual(new Uint8Array([7]));
  });

  test('policy and grant', () => {
    const sets = concatBytes(encodeWriterSet({ mode: 'open' }), encodeWriterSet({ mode: 'allow', writers: [a] }));
    const policy = decodePolicy(concatBytes(new Uint8Array([1, 0x83]), uint64Bytes(4n), sets));
    expect(policy).toEqual({
      locked: true,
      managerWrites: true,
      holderPinsCollectibleOnly: true,
      revision: 4n,
      collectible: { mode: 'open' },
      holder: { mode: 'allow', writers: [a] },
    });
    const grant = decodeGrant(concatBytes(new Uint8Array([1]), uint64Bytes(9n), encodeWriterSet({ mode: 'delegate', app: 5n })));
    expect(grant).toEqual({ revision: 9n, writers: { mode: 'delegate', app: 5n } });
  });
});

describe('deposits', () => {
  test('parses the deposit log and ignores others', () => {
    const log = concatBytes(text('cv:deposit:'), uint64Bytes(21_700n));
    expect(parseDepositLog([text('ERR:errCvDm'), log])).toBe(21_700n);
    expect(parseDepositLog([text('ERR:errCvNa')])).toBeUndefined();
    expect(parseDepositLog([concatBytes(text('cv:deposit:'), uint64Bytes(1n), new Uint8Array([0]))])).toBeUndefined();
  });

  test('box MBR', () => {
    expect(boxMbr(46, 23)).toBe(2500n + 400n * 69n);
  });
});

describe('writer lists', () => {
  test('proofs verify against the tree root with the contract leaf', () => {
    const tree = CollectibleVariationsSDK.writerListTree([a, b]);
    const proof = CollectibleVariationsSDK.writerProof(tree, b);
    const leaf = createHash('sha256').update(createHash('sha256').update(pk(b)).digest()).digest();
    expect(verifyProof(tree.root, new Uint8Array(leaf), proof)).toBe(true);
    expect(() => CollectibleVariationsSDK.writerProof(tree, algosdk.encodeAddress(new Uint8Array(32).fill(3)))).toThrow();
  });
});
