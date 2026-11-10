import { ABIType, ALGORAND_ZERO_ADDRESS_STRING, decodeAddress, encodeUint64, generateAccount } from 'algosdk';
import { describe, expect, test } from 'vitest';
import { allocationKeysOf, decodeDisbursementDetails, isSweepable } from './index';

const creator = ALGORAND_ZERO_ADDRESS_STRING;
const fields = { title: 'Welcome AKTA', amount: 2_000_000_000n, timeToUnlock: 0n, expiration: 4_102_444_800n, allocations: 1n, distributed: 5n, mbrCredits: 25_300n, note: 'hi' };

describe('decodeDisbursementDetails', () => {
  test('reads the v2 layout (reclaimTo, no usedMbrCredits) at its exact 121-byte empty size', () => {
    const v2 = ABIType.from('(address,bool,string,uint64,uint64,uint64,uint64,uint64,uint64,address,string)');
    expect(v2.encode([creator, true, '', 0n, 0n, 0n, 0n, 0n, 0n, creator, ''])).toHaveLength(121);
    const reclaimTo = generateAccount().addr.toString();
    const value = v2.encode([creator, true, fields.title, fields.amount, fields.timeToUnlock, fields.expiration, fields.allocations, fields.distributed, fields.mbrCredits, reclaimTo, fields.note]);
    expect(decodeDisbursementDetails(value)).toEqual({ creator, finalized: true, ...fields, reclaimTo });
  });

  test('reads the v1 layout (MainNet 3569556095) that still stores usedMbrCredits', () => {
    const v1 = ABIType.from('(address,bool,string,uint64,uint64,uint64,uint64,uint64,uint64,uint64,string)');
    const value = v1.encode([creator, true, fields.title, fields.amount, fields.timeToUnlock, fields.expiration, fields.allocations, fields.distributed, fields.mbrCredits, 25_300n, fields.note]);
    expect(decodeDisbursementDetails(value)).toEqual({ creator, finalized: true, ...fields, reclaimTo: ALGORAND_ZERO_ADDRESS_STRING });
  });
});

describe('sweep helpers', () => {
  const holder = generateAccount().addr.toString();
  const allocationBox = (address: string, asset: bigint, id: bigint) => new Uint8Array([
    0x75, ...decodeAddress(address).publicKey, ...encodeUint64(asset), ...encodeUint64(id),
  ]);

  test('allocationKeysOf keeps only the user allocation boxes of the requested disbursement', () => {
    const mine = allocationBox(holder, 1234n, 7n);
    const names = [
      mine,
      allocationBox(holder, 0n, 8n),
      new Uint8Array([0x64, ...encodeUint64(7n)]),
      mine.slice(0, 48),
    ];
    expect(allocationKeysOf(names, 7n)).toEqual([{ name: mine, address: holder, asset: 1234n }]);
  });

  test('isSweepable needs a reclaim target and a passed, non-zero expiration', () => {
    expect(isSweepable({ expiration: 100n, reclaimTo: holder }, 101n)).toBe(true);
    expect(isSweepable({ expiration: 100n, reclaimTo: holder }, 100n)).toBe(false);
    expect(isSweepable({ expiration: 0n, reclaimTo: holder }, 101n)).toBe(false);
    expect(isSweepable({ expiration: 100n, reclaimTo: ALGORAND_ZERO_ADDRESS_STRING }, 101n)).toBe(false);
  });
});
