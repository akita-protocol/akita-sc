import { BigUint, biguint, Bytes, bytes, loggedAssert, op, uint64, Uint64 } from '@algorandfoundation/algorand-typescript'

// BinEngine fixed-point helpers (research/bins.md §2). Q128.128 prices and u128 shares are `biguint`.
// PuyaTs `biguint` has no shifts, so `>> 128` drops the last 16 bytes with `op.substring` and `<< 128`
// appends 16 zero bytes. Byte-math results are minimal big-endian (no leading zeros).

/** overflow of a u128 field or a u64 conversion */
export const errBinOverflow = 'errBnOv'

/** 2^128 */
export function q128(): biguint {
  return BigUint(Bytes.fromHex('0100000000000000000000000000000000'))
}

/** 2^128 − 1 (adds a ceiling before `>> 128`) */
export function q128Minus1(): biguint {
  return BigUint(Bytes.fromHex('ffffffffffffffffffffffffffffffff'))
}

/** 2^192: exclusive upper bound of a bin price (p < 2^64) */
export function maxPrice(): biguint {
  return BigUint(Bytes.fromHex('01000000000000000000000000000000000000000000000000'))
}

/** 2^64: lower bound of a bin price (p ≥ 2^-64) */
export function minPrice(): biguint {
  return BigUint(Bytes.fromHex('010000000000000000'))
}

/** 2^256 (inverts a Q128.128 value) */
export function q256(): biguint {
  return BigUint(Bytes.fromHex('010000000000000000000000000000000000000000000000000000000000000000'))
}

/** floor(x / 2^128) */
export function shr128(x: biguint): biguint {
  const b = Bytes(x)
  return b.length > 16 ? BigUint(op.substring(b, 0, b.length - 16)) : BigUint(0)
}

/** floor(x / 2^96) */
export function shr96(x: biguint): biguint {
  const b = Bytes(x)
  return b.length > 12 ? BigUint(op.substring(b, 0, b.length - 12)) : BigUint(0)
}

/** floor(x / 2^32) */
export function shr32(x: biguint): biguint {
  const b = Bytes(x)
  return b.length > 4 ? BigUint(op.substring(b, 0, b.length - 4)) : BigUint(0)
}

/**
 * ceil(x / 2^32): the reported share unit (CurveResult.shares). Rounded up so a nonzero per-bin mint
 * never reports 0 (the Vault requires minted > 0), however inflated the bin's share price is.
 */
export function ceilShr32(x: biguint): biguint {
  return shr32(x + BigUint(4_294_967_295))
}

/** v · 2^128 */
export function shl128(v: uint64): biguint {
  return BigUint(op.itob(v).concat(op.bzero(16)))
}

/** ceil(a / b) for b > 0 */
export function ceilDiv(a: biguint, b: biguint): biguint {
  if (a === BigUint(0)) {
    return a
  }
  return (a - BigUint(1)) / b + BigUint(1)
}

/** x as a uint64; fails (btoi) above 2^64 − 1 */
export function toU64(x: biguint): uint64 {
  return op.btoi(Bytes(x))
}

/** min(x, 2^64 − 1) */
export function satU64(x: biguint): uint64 {
  const b = Bytes(x)
  return b.length > 8 ? Uint64(18_446_744_073_709_551_615n) : op.btoi(b)
}

/** x as exactly `width` big-endian bytes; fails (errBnOv) when x ≥ 2^(8·width) */
export function padTo(x: biguint, width: uint64): bytes {
  const b = Bytes(x)
  loggedAssert(b.length <= width, errBinOverflow)
  return op.bzero(width - b.length).concat(b)
}

/** ceil(a · b / c) for uint64 inputs whose quotient fits uint64 */
export function mulDivCeil(a: uint64, b: uint64, c: uint64): uint64 {
  const [hi, lo] = op.mulw(a, b)
  const [qHi, qLo, rHi, rLo] = op.divmodw(hi, lo, 0, c)
  loggedAssert(qHi === 0, errBinOverflow)
  return rHi === 0 && rLo === 0 ? qLo : qLo + 1
}

/** floor(a · b / c) for uint64 inputs whose quotient fits uint64 */
export function mulDivFloor(a: uint64, b: uint64, c: uint64): uint64 {
  return op.divw(...op.mulw(a, b), c)
}

/** index of the lowest set bit of x (x ≠ 0) */
export function lowestBit(x: uint64): uint64 {
  return op.bitLength(x ^ (x & (x - 1))) - 1
}

/** |a − b| */
export function absDiff(a: uint64, b: uint64): uint64 {
  return a > b ? a - b : b - a
}
