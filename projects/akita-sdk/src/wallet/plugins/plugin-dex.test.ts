import { ABIMethod, ABIType } from 'algosdk';
import { describe, expect, test } from 'vitest';
import type { GroupReturn } from '../../types';
import { decodePluginReturn, decodePluginReturns } from './plugin-dex';

const PLUGIN = 77n;
const swap = ABIMethod.fromSignature('swap(uint64,bool,uint64,uint64,uint64,uint64,byte[])uint64');
const opUp = ABIMethod.fromSignature('opUp()void');

const returnLog = (value: bigint) =>
  new Uint8Array([...Buffer.from('151f7c75', 'hex'), ...ABIType.from('uint64').encode(value)]);

const call = (appIndex: bigint, method: ABIMethod, logs: Uint8Array[]) => ({
  txn: { txn: { applicationCall: { appIndex, appArgs: [method.getSelector()] } } },
  logs,
});

const group = (...confirmations: ReturnType<typeof call>[]) => ({ confirmations }) as unknown as GroupReturn;

describe('decodePluginReturns', () => {
  test('returns every call of the method on the plugin, in group order, skipping carriers and other apps', () => {
    const result = group(
      call(PLUGIN, swap, [returnLog(10n)]),
      call(PLUGIN, opUp, []),
      call(5n, swap, [returnLog(99n)]),
      call(PLUGIN, swap, [new Uint8Array([1, 2]), returnLog(7n)]),
    );
    expect(decodePluginReturns<bigint>(result, PLUGIN, swap)).toEqual([10n, 7n]);
    expect(decodePluginReturn<bigint>(result, PLUGIN, swap)).toBe(10n);
  });

  test('a matching call without a return log throws; no matching call throws for the single form', () => {
    expect(() => decodePluginReturns(group(call(PLUGIN, swap, [])), PLUGIN, swap)).toThrow('No swap return');
    expect(decodePluginReturns(group(call(PLUGIN, opUp, [])), PLUGIN, swap)).toEqual([]);
    expect(() => decodePluginReturn(group(call(PLUGIN, opUp, [])), PLUGIN, swap)).toThrow('No swap return');
    expect(() => decodePluginReturns(group(), PLUGIN, opUp)).toThrow('opUp returns nothing');
  });
});
