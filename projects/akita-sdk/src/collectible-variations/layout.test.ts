import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';
import { APP_SPEC } from '../generated/CollectibleVariationsClient';
import { COLLECTIBLE_VARIATIONS_ERROR_MESSAGES } from './errors';
import * as layout from './layout';

const contractDir = resolve(__dirname, '../../../akita-sc/smart_contracts/collectible-variations');
const source = (file: string) => readFileSync(resolve(contractDir, file), 'utf8');

/** `export const Name: uint64 = 12`, `= 0x80`, `= Bytes('v')`, `= 'c'`, `= Uint64(...n)` and multi-line strings. */
function contractConstants(): Map<string, string | bigint> {
  const out = new Map<string, string | bigint>();
  const text = source('constants.ts').replace(/=\s*\n\s*/g, '= ');
  for (const [, name, raw] of text.matchAll(/export const (\w+)(?::\s*\w+)?\s*=\s*([^\n]+)/g)) {
    const value = raw.trim();
    let m: RegExpMatchArray | null;
    if ((m = value.match(/^(0x[0-9a-f]+|\d+)$/i))) out.set(name, BigInt(m[1]));
    else if ((m = value.match(/^Uint64\((\d+)n\)$/))) out.set(name, BigInt(m[1]));
    else if ((m = value.match(/^Bytes\('([^']*)'\)$/))) out.set(name, m[1]);
    else if ((m = value.match(/^'([^']*)'$/))) out.set(name, m[1]);
    else if ((m = value.match(/^Bytes\.fromHex\('([0-9a-f]+)'\)$/i))) out.set(name, `hex:${m[1]}`);
  }
  return out;
}

describe('Collectible Variations layout', () => {
  const contract = contractConstants();

  test('every contract constant is mirrored with the same value', () => {
    expect(contract.size).toBeGreaterThan(80);
    const sdk = layout as unknown as Record<string, unknown>;
    for (const [name, value] of contract) {
      if (name === 'Base64UrlAlphabet' || name === 'Arc4ReturnPrefix') continue;
      expect(sdk[name], name).toBeDefined();
      const mirrored = sdk[name];
      if (typeof value === 'bigint') expect(BigInt(mirrored as number | bigint), name).toBe(value);
      else expect(mirrored, name).toBe(value);
    }
  });

  test('every contract error code has a message', () => {
    const codes = [...source('errors.ts').matchAll(/export const \w+ = '(\w+)'/g)].map((m) => m[1]);
    expect(codes.length).toBe(16);
    expect(Object.keys(COLLECTIBLE_VARIATIONS_ERROR_MESSAGES).sort()).toEqual([...codes].sort());
  });

  test('the generated client exposes the registry methods', () => {
    const signatures = APP_SPEC.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`);
    expect(signatures).toContain(
      'writeVariation(uint64,uint64,byte[],address,uint8,uint8,bool,byte[],byte[],uint64,byte[32][])(uint64,bool,(uint8,uint64))',
    );
    expect(signatures).toContain('getMain(uint64)(uint8,byte[])');
    expect(signatures).toContain('purge(byte[])(bool,uint8,uint64)');
    expect(APP_SPEC.methods.find((m) => m.name === 'getMain')?.readonly).toBe(true);
  });
});
