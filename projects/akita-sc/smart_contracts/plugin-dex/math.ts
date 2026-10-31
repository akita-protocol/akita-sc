import { BigUint, biguint, Bytes, bytes, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { errCustodyInvariant, errInvalidInput } from './errors'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §2.2 math.ts): shared fixed-point helpers for the Vault,
// curve apps and hooks. Rounding direction is part of each helper's contract.

/** floor(a · b / c) with a 128-bit intermediate; fails if the quotient overflows uint64 */
export function mulDiv(a: uint64, b: uint64, c: uint64): uint64 {
  return op.divw(...op.mulw(a, b), c)
}

/** ceil(a · b / c) with a 128-bit intermediate; fails (errPdin) if the quotient overflows uint64 */
export function mulDivUp(a: uint64, b: uint64, c: uint64): uint64 {
  const [qHi, qLo, rHi, rLo] = op.divmodw(...op.mulw(a, b), 0, c)
  loggedAssert(qHi === 0, errInvalidInput)
  return rHi === 0 && rLo === 0 ? qLo : qLo + 1
}

/** floor(sqrt(a · b)) */
export function sqrtProduct(a: uint64, b: uint64): uint64 {
  return op.btoi(Bytes(op.bsqrt(BigUint(a) * BigUint(b))))
}

// Q64.64 --------------------------------------------------------------------------------------------

/** 2^64 as a biguint */
export function q64One(): biguint {
  return BigUint(Bytes.fromHex('010000000000000000'))
}

/** the all-zero Q64.64 price */
export function zeroX64(): bytes<16> {
  return op.bzero(16).toFixed({ length: 16 })
}

/** left-pad a biguint (< 2^128) into a 16-byte big-endian Q64.64 */
export function toX64(value: biguint): bytes<16> {
  return op.bzero(16).bitwiseOr(Bytes(value)).toFixed({ length: 16 })
}

/**
 * Q64.64 price of one base unit of A in base units of B: floor(reserveB · 2^64 / reserveA).
 * Returns zero when reserveA == 0. Uses a single `divmodw` (the quotient is < 2^128 for any uint64 inputs).
 */
export function priceX64(reserveA: uint64, reserveB: uint64): bytes<16> {
  if (reserveA === 0) {
    return zeroX64()
  }
  // (reserveB · 2^64) is the 128-bit pair (reserveB, 0)
  const [qHi, qLo] = op.divmodw(reserveB, 0, 0, reserveA)
  return op.itob(qHi).concat(op.itob(qLo)).toFixed({ length: 16 })
}

// SIGNED DELTAS -------------------------------------------------------------------------------------

/** A signed uint64 magnitude. `neg` is false for zero. Never use raw uint64 subtraction for deltas. */
export type SignedDelta = {
  mag: uint64
  neg: boolean
}

/** after − before as a SignedDelta */
export function signedDelta(before: uint64, after: uint64): SignedDelta {
  if (after >= before) {
    return { mag: after - before, neg: false }
  }
  return { mag: before - after, neg: true }
}

/** a + b for two SignedDeltas */
export function addSigned(a: SignedDelta, b: SignedDelta): SignedDelta {
  if (a.neg === b.neg) {
    return { mag: a.mag + b.mag, neg: a.neg && a.mag + b.mag > 0 }
  }
  if (a.mag >= b.mag) {
    const mag: uint64 = a.mag - b.mag
    return { mag, neg: a.neg && mag > 0 }
  }
  return { mag: b.mag - a.mag, neg: b.neg }
}

/** value + delta; fails with errPdki (custody invariant) on underflow */
export function applySigned(value: uint64, delta: SignedDelta): uint64 {
  if (!delta.neg) {
    return value + delta.mag
  }
  loggedAssert(value >= delta.mag, errCustodyInvariant)
  return value - delta.mag
}
