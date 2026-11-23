import { expect, test } from 'vitest';
import { sha256 } from '@noble/hashes/sha2.js';
import { ABIType } from 'algosdk';
import { metadataScopeArgs, decodeMetadataScope } from './meta-scope';
import { decodeGrantPolicy, grantPolicyKey } from './meta';
import { encodeAddress } from 'algosdk';

test('grant policy keys bind plugin, caller, and escrow, and sit in the reserved prefix', () => {
  const first = encodeAddress(new Uint8Array(32).fill(1));
  const second = encodeAddress(new Uint8Array(32).fill(2));
  const keys = [grantPolicyKey(1n, first), grantPolicyKey(2n, first), grantPolicyKey(1n, second), grantPolicyKey(1n, first, 'agent')];
  expect(new Set(keys.map((key) => Buffer.from(key).toString('hex'))).size).toBe(4);
  for (const key of keys) {
    expect(key.length).toBe(31);
    expect(key[0]).toBe(0);
  }
  expect(keys[3].slice(1)).toEqual(sha256(ABIType.from('(uint64,address,string)').encode([1n, first, 'agent'])).slice(0, 30));
});

test('grant policy records split into the install epoch and the body', () => {
  const data = new Uint8Array([0, 0, 0, 0, 0, 0, 1, 2, 9, 8]);
  expect(decodeGrantPolicy(data)).toEqual({ start: 258n, body: new Uint8Array([9, 8]) });
  expect(() => decodeGrantPolicy(new Uint8Array(7))).toThrow(/header/);
});

test('allowlists use canonical byte order without normalization or duplicate entries', () => {
  const keys = ['é', 'z', '\0a', 'a', 'aa'];
  const args = metadataScopeArgs({ type: 'keys', namespace: 'test', keys });
  expect(args.keys).toEqual(['a', 'z', '\0a', 'aa', 'é']);
  expect(keys).toEqual(['é', 'z', '\0a', 'a', 'aa']);
  expect(decodeMetadataScope(args.namespace, ABIType.from('string[]').encode(args.keys))).toEqual({ type: 'keys', namespace: 'test', keys: args.keys });
  expect(() => metadataScopeArgs({ type: 'keys', namespace: 'test', keys: ['same', 'same'] })).toThrow(/Duplicate/);
});
