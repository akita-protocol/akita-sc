/**
 * BinEngine (bins curve) argument encoders and sizing, mirrored from akita-sc
 * `smart_contracts/plugin-dex/curves/bins/engine.algo.ts` and `tests/models/bins-model.ts`.
 */
export declare const BINS_ID_CENTER: bigint;
export declare const BINS_PER_CHUNK = 32n;
export declare const BINS_WINDOW_HALF = 32768n;
export declare const BINS_MAX_BIN_STEP = 200n;
export declare const BINS_MAX_POSITION_WIDTH = 64n;
export declare const BINS_MAX_BINS_PER_SWAP_CAP = 128n;
/** distX / distY are parts per billion of the deposited side */
export declare const BINS_DIST_SCALE = 1000000000n;
/** remove fracPpb that takes the whole position */
export declare const BINS_REMOVE_ALL = 1000000000n;
export declare const BINS_MIN_BIN_SHARES_FLOOR: bigint;
/** BinEngine pool box MBR: the curveMbr a bins createPool must carry */
export declare const BINS_POOL_BOX_MBR: bigint;
/** one 32-bin chunk box; an add pays one per new chunk it touches */
export declare const BINS_CHUNK_BOX_MBR: bigint;
/** the per-binStep price table, stored once by `initBinStep` */
export declare const BINS_TABLE_BOX_MBR: bigint;
export declare const binsPositionBoxMbr: (width: bigint) => bigint;
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
    /**
     * Dust floor: the least value (in Y base units × 2^32) a position may keep in one bin. Use
     * `defaultMinBinShares(decimalsY)`, one whole Y token. The engine accepts anything from
     * `BINS_MIN_BIN_SHARES_FLOOR` (one Y base unit) up, but at that floor a bin costs next to nothing to
     * occupy, so a pool can be seeded with dust bins that force large swaps to be split.
     */
    minBinShares: bigint;
    /** 1..128 */
    maxBinsPerSwap: bigint;
};
/**
 * ARCHITECTURE §12.1 rule 5: one whole Y token per new bin (10^decimals · 2^32), clamped to u64 for
 * tokens with ≥ 10 decimals, and never below the engine floor.
 */
export declare function defaultMinBinShares(decimalsY: number): bigint;
/**
 * Defaults for a bins pool: 25 bps steps, variable fee off, 64 bins per swap, and a dust floor of one
 * whole Y token per bin.
 *
 * `decimalsY` is the decimals of the pool's B side in Vault order (the higher asset id; 6 when that is
 * ALGO's pair such as USDC). It is required so that no pool gets the engine's one-base-unit floor by
 * leaving it out (readiness audit 2026-11-09, C10). To choose another floor, pass `minBinShares` in
 * `overrides`.
 */
export declare const defaultBinPoolParams: (activeId: bigint, decimalsY: number, overrides?: Partial<BinPoolParams>) => BinPoolParams;
/** The nearest bin id to a price p (units of B per unit of A, base units) */
export declare const binIdForPrice: (binStep: bigint, price: number) => bigint;
/** Approximate price of a bin (B per A, base units), for display */
export declare const binPrice: (binStep: bigint, id: bigint) => number;
/** PoolConfig.curveArgs of a bins pool. Throws below the engine's floor, which `init` would reject (errBnMs). */
export declare const encodeBinInitArgs: (p: BinPoolParams) => Uint8Array;
/** One bin of an add: `delta` from the active bin, and the share of each side it takes (ppb) */
export type BinDistEntry = {
    delta: bigint;
    distX: bigint;
    distY: bigint;
};
export declare const encodeBinAddArgs: (activeIdDesired: bigint, idSlippage: bigint, dist: BinDistEntry[]) => Uint8Array;
export declare const encodeBinRemoveArgs: (fromId: bigint, toId: bigint, fracPpb?: bigint) => Uint8Array;
/**
 * Spread a deposit uniformly over `radius` bins on each side of the active bin, the LB "spot" shape:
 * X (assetA) goes to the active bin and above, Y (assetB) to the active bin and below.
 */
export declare function spotDistribution(radius: bigint): BinDistEntry[];
/**
 * µALGO an add should carry for boxes it may create: the position box (new positions) and every chunk
 * its bins touch (assumed new; the excess is refunded).
 */
export declare function binAddMbr(activeId: bigint, dist: BinDistEntry[], newPosition: boolean): bigint;
/** curveMbr of a bins createPool: the engine's pool box and the active chunk (the excess is refunded) */
export declare const BINS_CREATE_CURVE_MBR: bigint;
/** Box name of a binStep's price table on the BinEngine ('s' ‖ binStep) */
export declare const binsTableBoxName: (binStep: bigint) => Uint8Array;
