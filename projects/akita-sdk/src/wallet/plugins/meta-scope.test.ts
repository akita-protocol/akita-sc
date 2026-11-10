import { expect, test } from 'vitest';
import { sha256 } from '@noble/hashes/sha2.js';
import { ABIType } from 'algosdk';
import { metadataScopeArgs, decodeMetadataScope } from './meta-scope';
import { metaPluginPolicyKey } from './meta';
import { encodeAddress } from 'algosdk';

test('policy keys bind wallet, caller, and escrow independently', () => {
  const first = encodeAddress(new Uint8Array(32).fill(1));
  const second = encodeAddress(new Uint8Array(32).fill(2));
  const keys = [metaPluginPolicyKey(1n, first), metaPluginPolicyKey(2n, first), metaPluginPolicyKey(1n, second), metaPluginPolicyKey(1n, first, 'agent')];
  expect(new Set(keys.map((key) => Buffer.from(key).toString('hex'))).size).toBe(4);
  expect(keys[3]).toEqual(sha256(ABIType.from('(uint64,address,string)').encode([1n, first, 'agent'])).slice(0, 31));
});

test('allowlists use canonical byte order without normalization or duplicate entries', () => {
  const keys = ['é', 'z', '\0a', 'a', 'aa'];
  const args = metadataScopeArgs({ type: 'keys', namespace: 'test', keys });
  expect(args.keys).toEqual(['a', 'z', '\0a', 'aa', 'é']);
  expect(keys).toEqual(['é', 'z', '\0a', 'a', 'aa']);
  expect(decodeMetadataScope(args.namespace, ABIType.from('string[]').encode(args.keys))).toEqual({ type: 'keys', namespace: 'test', keys: args.keys });
  expect(() => metadataScopeArgs({ type: 'keys', namespace: 'test', keys: ['same', 'same'] })).toThrow(/Duplicate/);
});
