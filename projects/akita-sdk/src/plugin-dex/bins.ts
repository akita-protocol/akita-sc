/**
 * BinEngine (bins curve) argument encoders and sizing, mirrored from akita-sc
 * `smart_contracts/plugin-dex/curves/bins/engine.algo.ts` and `tests/models/bins-model.ts`.
 */

export const BINS_ID_CENTER = 1n << 23n;
export const BINS_PER_CHUNK = 32n;
export const BINS_WINDOW_HALF = 32_768n;
export const BINS_MAX_BIN_STEP = 200n;
export const BINS_MAX_POSITION_WIDTH = 64n;
export const BINS_MAX_BINS_PER_SWAP_CAP = 128n;
/** distX / distY are parts per billion of the deposited side */
export const BINS_DIST_SCALE = 1_000_000_000n;
/** remove fracPpb that takes the whole position */
export const BINS_REMOVE_ALL = 1_000_000_000n;
export const BINS_MIN_BIN_SHARES_FLOOR = 1n << 32n;
const U64_MAX = (1n << 64n) - 1n;

const boxMbr = (keyLength: number, size: number): bigint => 2_500n + 400n * BigInt(keyLength + size);
const POOL_BOX_SIZE = 144 + 32 * 8;
const CHUNK_BOX_SIZE = 72 + 32 * 32;
const TABLE_BOX_SIZE = 20 * 32 + 32 * 16;
const POSITION_HEADER = 56;
/** BinEngine pool box MBR: the curveMbr a bins createPool must carry */
export const BINS_POOL_BOX_MBR = boxMbr(9, POOL_BOX_SIZE);
/** one 32-bin chunk box; an add pays one per new chunk it touches */
export const BINS_CHUNK_BOX_MBR = boxMbr(17, CHUNK_BOX_SIZE);
/** the per-binStep price table, stored once by `initBinStep` */
export const BINS_TABLE_BOX_MBR = boxMbr(9, TABLE_BOX_SIZE);
export const binsPositionBoxMbr = (width: bigint): bigint => boxMbr(9, POSITION_HEADER + 16 * Number(width));

const u64be = (v: bigint): Uint8Array => {
  const out = new Uint8Array(8);
  new DataView(out.buffer).setBigUint64(0, v);
  return out;
};
const u32be = (v: bigint): Uint8Array => {
  const out = new Uint8Array(4);
  new DataView(out.buffer).setUint32(0, Number(v));
  return out;
};
const concat = (...parts: Uint8Array[]): Uint8Array => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
};

export type BinPoolParams = {
  /** price step between bins in bps, 1..200 */
  binStep: bigint;
  /** starting active bin; see `binIdForPrice` */
  activeId: bigint;
  /** base fee factor (LB v2.1) */
  baseFactor: bigint;
  /** variable fee control A; 0 turns the variable fee off */
  varFeeControl: bigint;
  filterPeriod: bigint;
  decayPeriod: bigint;
  /** bps, ≤ 10,000 */
  reductionFactor: bigint;
  maxVa: bigint;
  /** dust floor per new bin; use `defaultMinBinShares` */
  minBinShares: bigint;
  /** 1..128 */
  maxBinsPerSwap: bigint;
};

/** Defaults the engine tests use: 25 bps steps, variable fee off, 64 bins per swap */
export const defaultBinPoolParams = (activeId: bigint, overrides: Partial<BinPoolParams> = {}): BinPoolParams => ({
  binStep: 25n,
  activeId,
  baseFactor: 10_000n,
  varFeeControl: 0n,
  filterPeriod: 30n,
  decayPeriod: 600n,
  reductionFactor: 5_000n,
  maxVa: 350_000n,
  minBinShares: BINS_MIN_BIN_SHARES_FLOOR,
  maxBinsPerSwap: 64n,
  ...overrides,
});

/**
 * ARCHITECTURE §12.1 rule 5: one whole Y token per new bin (10^decimals · 2^32), clamped to u64 for
 * tokens with ≥ 10 decimals, and never below the engine floor.
 */
export function defaultMinBinShares(decimalsY: number): bigint {
  const v = 10n ** BigInt(decimalsY) * BINS_MIN_BIN_SHARES_FLOOR;
  return v > U64_MAX ? U64_MAX : v;
}

/** The nearest bin id to a price p (units of B per unit of A, base units) */
export const binIdForPrice = (binStep: bigint, price: number): bigint =>
  BINS_ID_CENTER + BigInt(Math.round(Math.log(price) / Math.log(1 + Number(binStep) / 10_000)));

/** Approximate price of a bin (B per A, base units), for display */
export const binPrice = (binStep: bigint, id: bigint): number => Math.pow(1 + Number(binStep) / 10_000, Number(id - BINS_ID_CENTER));

/** PoolConfig.curveArgs of a bins pool */
export const encodeBinInitArgs = (p: BinPoolParams): Uint8Array =>
  concat(
    ...[
      p.binStep,
      p.activeId,
      p.baseFactor,
      p.varFeeControl,
      p.filterPeriod,
      p.decayPeriod,
      p.reductionFactor,
      p.maxVa,
      p.minBinShares,
      p.maxBinsPerSwap,
    ].map(u64be),
  );

/** One bin of an add: `delta` from the active bin, and the share of each side it takes (ppb) */
export type BinDistEntry = { delta: bigint; distX: bigint; distY: bigint };

export const encodeBinAddArgs = (activeIdDesired: bigint, idSlippage: bigint, dist: BinDistEntry[]): Uint8Array =>
  concat(
    u64be(activeIdDesired),
    u64be(idSlippage),
    ...dist.map((d) => concat(u32be(d.delta + (1n << 31n)), u32be(d.distX), u32be(d.distY))),
  );

export const encodeBinRemoveArgs = (fromId: bigint, toId: bigint, fracPpb: bigint = BINS_REMOVE_ALL): Uint8Array =>
  concat(u64be(fromId), u64be(toId), u64be(fracPpb));

/**
 * Spread a deposit uniformly over `radius` bins on each side of the active bin, the LB "spot" shape:
 * X (assetA) goes to the active bin and above, Y (assetB) to the active bin and below.
 */
export function spotDistribution(radius: bigint): BinDistEntry[] {
  if (radius < 0n || 2n * radius + 1n > BINS_MAX_POSITION_WIDTH) throw new Error('radius out of range');
  const sideBins = radius + 1n;
  const share = BINS_DIST_SCALE / sideBins;
  const out: BinDistEntry[] = [];
  for (let d = -radius; d <= radius; d++) {
    out.push({ delta: d, distX: d >= 0n ? share : 0n, distY: d <= 0n ? share : 0n });
  }
  return out;
}

/**
 * µALGO an add should carry for boxes it may create: the position box (new positions) and every chunk
 * its bins touch (assumed new; the excess is refunded).
 */
export function binAddMbr(activeId: bigint, dist: BinDistEntry[], newPosition: boolean): bigint {
  if (dist.length === 0) return 0n;
  const ids = dist.map((d) => activeId + d.delta);
  const lo = ids.reduce((a, b) => (a < b ? a : b));
  const hi = ids.reduce((a, b) => (a > b ? a : b));
  const chunks = hi / BINS_PER_CHUNK - lo / BINS_PER_CHUNK + 1n;
  return chunks * BINS_CHUNK_BOX_MBR + (newPosition ? binsPositionBoxMbr(hi - lo + 1n) : 0n);
}

/** curveMbr of a bins createPool: the engine's pool box and the active chunk (the excess is refunded) */
export const BINS_CREATE_CURVE_MBR = BINS_POOL_BOX_MBR + BINS_CHUNK_BOX_MBR;

/** Box name of a binStep's price table on the BinEngine ('s' ‖ binStep) */
export const binsTableBoxName = (binStep: bigint): Uint8Array => concat(new TextEncoder().encode('s'), u64be(binStep));
