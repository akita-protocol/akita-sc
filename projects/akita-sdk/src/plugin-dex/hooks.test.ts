import { describe, expect, test } from 'vitest';
import {
  AntiSnipe,
  antiSnipeInstall,
  binAddMbr,
  BINS_CHUNK_BOX_MBR,
  BINS_DIST_SCALE,
  binsPositionBoxMbr,
  catalogueInstall,
  defaultMinBinShares,
  encodeAntiSnipeInit,
  encodeBinAddArgs,
  encodeBinInitArgs,
  encodeBinRemoveArgs,
  encodeGatedFeeSchedule,
  encodeLaunchTaxInit,
  defaultBinPoolParams,
  gatedFeeInstall,
  HookFlag,
  HookPerm,
  HookPoint,
  HOOK_CATALOGUE,
  launchTaxInstall,
  orderPair,
  pointNames,
  spotDistribution,
  swapFeeBuffer,
  validateAntiSnipe,
  validateHookStack,
  validateLaunchTax,
  withSlippage,
} from './index';

const OWNER = 'Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA';
const u16 = (b: Uint8Array, o: number) => new DataView(b.buffer, b.byteOffset).getUint16(o);
const u32 = (b: Uint8Array, o: number) => new DataView(b.buffer, b.byteOffset).getUint32(o);
const u64 = (b: Uint8Array, o: number) => new DataView(b.buffer, b.byteOffset).getBigUint64(o);

describe('hook initData encoders match the contract shapes', () => {
  test('SnipeInit is 72 bytes (5 × u64 + address)', () => {
    const data = encodeAntiSnipeInit({ startFeeBps: 5_000n, endFeeBps: 100n, decayMode: 1n, decayRounds: 20n, startMode: 0n });
    expect(data.length).toBe(72);
    expect(u64(data, 0)).toBe(5_000n);
    expect(u64(data, 24)).toBe(20n);
    expect([...data.slice(40)].every((b) => b === 0)).toBe(true);
  });

  test('TaxInit is 64 bytes (address + 4 × u64)', () => {
    const data = encodeLaunchTaxInit({ owner: OWNER, quoteAsset: 0n, buyTaxBps: 100n, sellTaxBps: 200n, untilRound: 9n });
    expect(data.length).toBe(64);
    expect(u64(data, 48)).toBe(200n);
    expect(u64(data, 56)).toBe(9n);
  });

  test('FeeSchedule: 3 × u64, a tail pointer of 26, a u16 count and 32 B per tier', () => {
    const tiers = [
      { minPower: 1n, minImpact: 0n, gateMask: 0n, discountBps: 100n },
      { minPower: 5n, minImpact: 0n, gateMask: 1n, discountBps: 500n },
    ];
    const data = encodeGatedFeeSchedule({ floorFeeBps: 5n, maxDiscountBps: 1_000n, impactMaxDiscountBps: 0n, tiers });
    expect(data.length).toBe(28 + 32 * tiers.length);
    expect(u16(data, 24)).toBe(26);
    expect(u16(data, 26)).toBe(2);
    expect(encodeGatedFeeSchedule().length).toBe(0);
  });
});

describe('install builders', () => {
  test('anti-snipe adds AfterAddLiquidity for a first-liquidity clock and funds its box', () => {
    const creation = antiSnipeInstall(7n, { startFeeBps: 5_000n, endFeeBps: 100n, decayMode: 0n, decayRounds: 10n, startMode: AntiSnipe.StartCreation });
    const first = antiSnipeInstall(7n, { startFeeBps: 5_000n, endFeeBps: 100n, decayMode: 0n, decayRounds: 10n, startMode: AntiSnipe.StartFirstLiquidity });
    expect(creation.points & HookPoint.AfterAddLiquidity).toBe(0n);
    expect(first.points & HookPoint.AfterAddLiquidity).toBe(HookPoint.AfterAddLiquidity);
    expect(creation.funding).toBe(38_100n);
  });

  test('launch tax takes HookFee for buys and HookFeeOut + AfterSwap for sells, funded per quote asset', () => {
    const buyOnly = launchTaxInstall(9n, { owner: OWNER, quoteAsset: 0n, buyTaxBps: 100n, sellTaxBps: 0n, untilRound: 0n });
    expect(buyOnly.perms).toBe(HookPerm.HookFee);
    expect(buyOnly.points & HookPoint.AfterSwap).toBe(0n);
    expect(buyOnly.funding).toBe(34_900n);
    const both = launchTaxInstall(9n, { owner: OWNER, quoteAsset: 31n, buyTaxBps: 100n, sellTaxBps: 100n, untilRound: 0n });
    expect(both.perms).toBe(HookPerm.HookFee | HookPerm.HookFeeOut);
    expect(both.points & HookPoint.AfterSwap).toBe(HookPoint.AfterSwap);
    expect(both.funding).toBe(34_900n + 100_000n + 9_300n);
  });

  test('gated fee funds its schedule box per tier', () => {
    expect(gatedFeeInstall(3n, { floorFeeBps: 0n, maxDiscountBps: 100n, impactMaxDiscountBps: 0n, tiers: [] }).funding).toBe(17_300n);
    expect(gatedFeeInstall(3n, undefined, 2).funding).toBe(17_300n + 2n * 12_800n);
  });

  test('catalogue installs refuse hooks that need initData', () => {
    expect(() => catalogueInstall('antiSnipeFee', 1n)).toThrow();
    const backrun = catalogueInstall('backrunArb', 1n);
    expect(backrun.flags).toBe(HookFlag.LazyCustody);
    expect(pointNames(backrun.points)).toEqual(['AfterSwap', 'Poke']);
  });

  test('every catalogue hook passes the contract rules on its own', () => {
    for (const entry of Object.values(HOOK_CATALOGUE)) {
      const issues = validateHookStack(
        [{ app: 1n, points: entry.points, perms: entry.perms, flags: entry.flags }],
        { maxFeeBps: 9_000n, maxHookFeeBps: 1_000n },
      );
      expect(issues, entry.kind).toEqual([]);
    }
  });
});

describe('validateHookStack mirrors PluginDex.validateHooks', () => {
  const pool = { feeBps: 30n, maxFeeBps: 1_000n, custodyFeeBps: 30n, maxHookFeeBps: 0n };

  test('pricing hooks at BeforeSwap must answer Quote', () => {
    const issues = validateHookStack([{ app: 1n, points: HookPoint.BeforeSwap, perms: HookPerm.DynamicFee }], pool);
    expect(issues.map((i) => i.message)).toContain('A hook that prices swaps must also answer quotes');
  });

  test('lazy custody and External need Custody', () => {
    const issues = validateHookStack([{ app: 1n, points: HookPoint.Poke, perms: 0n, flags: HookFlag.LazyCustody }], pool);
    expect(issues).toHaveLength(1);
  });

  test('no duplicates, at most one HookFeeOut hook, at most 8 hooks', () => {
    const out = { points: HookPoint.AfterSwap, perms: HookPerm.HookFeeOut };
    expect(validateHookStack([{ app: 1n, ...out }, { app: 2n, ...out }], pool).map((i) => i.message)).toContain(
      'Only one hook may take a fee on the swap output',
    );
    expect(validateHookStack([{ app: 1n, points: 1n, perms: 0n }, { app: 1n, points: 1n, perms: 0n }], pool)).toHaveLength(1);
    const nine = Array.from({ length: 9 }, (_, i) => ({ app: BigInt(i + 1), points: 1n, perms: 0n }));
    expect(validateHookStack(nine, pool)).toHaveLength(1);
  });

  test('perms beyond the DAO approval and unapproved hooks are reported', () => {
    const approvals = new Map([[1n, HookPerm.DynamicFee]]);
    const issues = validateHookStack(
      [
        { app: 1n, points: HookPoint.BeforeSwap | HookPoint.Quote, perms: HookPerm.DynamicFee | HookPerm.HookFee },
        { app: 2n, points: HookPoint.Poke, perms: 0n },
      ],
      pool,
      approvals,
    );
    expect(issues.map((i) => i.index)).toEqual([0, 1]);
  });

  test('fee limits', () => {
    expect(validateHookStack([], { feeBps: 1_001n, maxFeeBps: 2_000n, maxHookFeeBps: 0n })).toHaveLength(1);
    expect(validateHookStack([], { maxFeeBps: 9_001n, maxHookFeeBps: 1_001n })).toHaveLength(2);
    expect(validateHookStack([], { maxFeeBps: 100n, custodyFeeBps: 101n, maxHookFeeBps: 0n })).toHaveLength(1);
  });

  test('hook-specific init checks against the pool caps', () => {
    expect(validateAntiSnipe({ startFeeBps: 5_000n, endFeeBps: 100n, decayMode: 0n, decayRounds: 10n, startMode: 0n }, pool)).toHaveLength(1);
    expect(validateLaunchTax({ owner: OWNER, quoteAsset: 0n, buyTaxBps: 100n, sellTaxBps: 0n, untilRound: 0n }, pool)).toHaveLength(1);
  });
});

describe('bins encoders', () => {
  test('init args are 10 × u64; add args 16 B + 12 B per bin; remove args 24 B', () => {
    expect(encodeBinInitArgs(defaultBinPoolParams(1n << 23n)).length).toBe(80);
    const dist = spotDistribution(2n);
    const add = encodeBinAddArgs(1n << 23n, 3n, dist);
    expect(add.length).toBe(16 + 12 * dist.length);
    expect(u32(add, 16)).toBe(2 ** 31 - 2);
    expect(encodeBinRemoveArgs(1n, 2n).length).toBe(24);
  });

  test('spot distribution puts X at and above the active bin, Y at and below, each ≤ 1e9', () => {
    const dist = spotDistribution(3n);
    expect(dist).toHaveLength(7);
    expect(dist.reduce((s, d) => s + d.distX, 0n)).toBeLessThanOrEqual(BINS_DIST_SCALE);
    expect(dist.filter((d) => d.delta < 0n).every((d) => d.distX === 0n && d.distY > 0n)).toBe(true);
    expect(() => spotDistribution(32n)).toThrow();
  });

  test('add MBR counts the chunks touched and the position box', () => {
    const active = 32n * 1000n + 31n;
    expect(binAddMbr(active, spotDistribution(1n), true)).toBe(2n * BINS_CHUNK_BOX_MBR + binsPositionBoxMbr(3n));
    expect(binAddMbr(active - 10n, spotDistribution(1n), false)).toBe(BINS_CHUNK_BOX_MBR);
  });

  test('minBinShares clamps to u64 for tokens with 10+ decimals (§12.1 rule 5)', () => {
    expect(defaultMinBinShares(6)).toBe(10n ** 6n * 2n ** 32n);
    expect(defaultMinBinShares(18)).toBe(2n ** 64n - 1n);
  });
});

describe('helpers', () => {
  test('orderPair and slippage', () => {
    expect(orderPair(5n, 0n)).toEqual({ assetA: 0n, assetB: 5n, flipped: true });
    expect(() => orderPair(1n, 1n)).toThrow();
    expect(withSlippage(10_000n, 50n)).toBe(9_950n);
  });

  test('fee buffer: 11 min fees per backrun pool, 2 per other lazy-custody hook', () => {
    const hooks = [
      { app: 10n, perms: HookPerm.Custody, flags: HookFlag.LazyCustody },
      { app: 11n, perms: HookPerm.Custody, flags: HookFlag.LazyCustody },
      { app: 12n, perms: HookPerm.DynamicFee, flags: 0n },
    ];
    expect(swapFeeBuffer(hooks, 10n)).toBe(13_000n);
  });
});
