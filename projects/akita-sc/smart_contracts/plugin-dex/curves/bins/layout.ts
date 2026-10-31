import { uint64 } from '@algorandfoundation/algorand-typescript'

// BinEngine storage layout (research/bins.md §3). Raw box offsets: the engine never ABI-decodes a bin
// box. The bigint model (tests/models/bins-model.ts) mirrors every constant here.

// box key prefixes: pool 'b'‖poolId, step table 's'‖binStep, chunk 'c'‖poolId‖chunk, position 'q'‖positionId
export const PoolPrefix = 'b'
export const TablePrefix = 's'
export const ChunkPrefix = 'c'
export const PositionPrefix = 'q'

// --- pool state box (400 B): u64 fields, then a 32-word chunk bitmap -------------------------------
export const PoolBinStep: uint64 = 0
export const PoolActiveId: uint64 = 8
export const PoolMinId: uint64 = 16
export const PoolBaseFactor: uint64 = 24
/** A (LB variableFeeControl) */
export const PoolVarFeeControl: uint64 = 32
export const PoolFilterPeriod: uint64 = 40
export const PoolDecayPeriod: uint64 = 48
/** R (LB reductionFactor, bps) */
export const PoolReductionFactor: uint64 = 56
export const PoolMaxVa: uint64 = 64
/** volatility state: va, vr, idRef, tLast are contiguous (one 32-byte write) */
export const PoolVa: uint64 = 72
export const PoolVr: uint64 = 80
export const PoolIdRef: uint64 = 88
export const PoolTLast: uint64 = 96
/** totals are contiguous (one 16-byte write) */
export const PoolTotalX: uint64 = 104
export const PoolTotalY: uint64 = 112
export const PoolMinBinShares: uint64 = 120
export const PoolMaxBinsPerSwap: uint64 = 128
/** bit w set ⇔ bitmap word w ≠ 0 (32 words) */
export const PoolSummary: uint64 = 136
/** bitmap word w (u64): bit b ⇔ window chunk 64w + b has occupancy ≠ 0 */
export const PoolBitmap: uint64 = 144
export const PoolHeaderSize: uint64 = 144
export const PoolBoxSize: uint64 = 400
export const BitmapWords: uint64 = 32

// --- step table box (1,152 B): T[0..19] 32 B each ‖ F[0..31] 16 B each ------------------------------
export const TableBits: uint64 = 20
export const TableT: uint64 = 0
export const TableF: uint64 = 640
export const TableBoxSize: uint64 = 1_152

// --- chunk box (1,096 B): anchor 32 ‖ occupancy u64 ‖ rentPayer 32 ‖ 32 × (x u64, y u64, supply u128) -
export const ChunkAnchor: uint64 = 0
export const ChunkOccupancy: uint64 = 32
export const ChunkRentPayer: uint64 = 40
export const ChunkRecords: uint64 = 72
export const RecordSize: uint64 = 32
export const RecordSupply: uint64 = 16
export const ChunkBoxSize: uint64 = 1_096
export const BinsPerChunk: uint64 = 32
/** log2(BinsPerChunk) */
export const ChunkShift: uint64 = 5
export const ChunkMask: uint64 = 31

// --- position box (56 + 16·width B): owner 32 ‖ poolId ‖ lowerId ‖ width ‖ width × u128 shares -------
export const PositionOwner: uint64 = 0
export const PositionPool: uint64 = 32
export const PositionLower: uint64 = 40
export const PositionWidth: uint64 = 48
export const PositionShares: uint64 = 56
export const MaxPositionWidth: uint64 = 64

// --- ids, window, ranges ----------------------------------------------------------------------------
/** price 1 (base unit to base unit) */
export const IdCenter: uint64 = 8_388_608
export const MaxId: uint64 = 16_777_216
export const WindowBins: uint64 = 65_536
export const WindowHalf: uint64 = 32_768
export const WindowChunks: uint64 = 2_048
export const MaxBinStep: uint64 = 200
/**
 * Hard cap on a pool's maxBinsPerSwap: the longest traversal (Swap, Quote, Settle) must fit one group's
 * 256 inner transactions with room for the Vault, hooks and a router (bins e2e (20b) asserts ≤ 192 op-ups).
 * Measured: ≤ 450 opcodes per bin dense with the variable fee (e2e (20)), ~435 in the sparse worst case of
 * one bin per chunk (a chunk switch and a bitmap lookup per bin, e2e (20b)), so a cap-length traversal needs
 * ~85 op-ups. Its 128 chunk refs fit one group only with access lists (16 per transaction). 512 was
 * unreachable (~330 op-ups), so a long Quote hit the inner-transaction limit instead of returning 0.
 */
export const MaxBinsPerSwapCap: uint64 = 128

// --- fees (ppb) -------------------------------------------------------------------------------------
export const FeeScale: uint64 = 1_000_000_000
/** LB MaxFee: 10% */
export const MaxFee: uint64 = 100_000_000
export const BpsToPpb: uint64 = 100_000
/**
 * Init rejects a pool whose maxFeeBps exceeds MaxFee (1,000 bps = MaxFee / BpsToPpb): the per-bin fee and the
 * custody Settle fee are capped at MaxFee, so a larger declared cap (DynamicFee, custodyFeeBps) would be
 * silently charged at 10% (OPEN-DECISIONS #13)
 */
export const MaxPoolFeeBps: uint64 = 1_000

// --- dust floor -------------------------------------------------------------------------------------
/**
 * Init rejects minBinShares below 2^32: a new bin must be worth at least one Y base unit (shares are
 * value·2^32 in Y units). Prices each dust bin an attacker places to exhaust maxBinsPerSwap (OPEN-DECISIONS
 * #14); the SDK default is one whole Y token per new bin. The floor applies to every position-bin stake:
 * Add rejects a sub-floor stake in an occupied bin and a partial Remove sweeps a sub-floor remainder.
 */
export const MinBinSharesFloor: uint64 = 4_294_967_296
export const VaScale: uint64 = 10_000
export const VarFeeDivisor: uint64 = 100_000_000_000

// --- budget -----------------------------------------------------------------------------------------
/** opcode budget kept available at the top of every bin iteration (a drained bin + a chunk switch) */
export const BinBudget: uint64 = 800
/** budget for creating a chunk (anchor pow ≤ ~1,300) */
export const ChunkBudget: uint64 = 1_600
/** budget for computing a step table */
export const TableBudget: uint64 = 9_000
/** budget per Add entry (active-bin composition path) */
export const AddBinBudget: uint64 = 1_200
/**
 * budget ensured before building every result: covers the result (~200) and leaves the caller (the
 * Vault's §4.5 checks and bookings) at least ~800 when the curve call returns
 */
export const ResultBudget: uint64 = 1_000
