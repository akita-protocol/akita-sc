import { uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * TEST-ONLY (T36). Compile probe for the legacy-shim pattern of PHASE-0-SPEC §7.2: two TS methods
 * exported under the same ARC-4 name `m` with different signatures. The hinted method keeps the
 * canonical name; the shim keeps the old signature. Never deploy outside tests.
 */
export class MockPrincipalOverload extends Contract {
  /** Hinted ABI: `m(uint64,uint64)uint64` (the trailing `wallet` hint). */
  m(value: uint64, wallet: uint64): uint64 {
    return value + wallet
  }

  /** Legacy shim: `m(uint64)uint64`, the pre-hint signature. */
  @abimethod({ name: 'm' })
  legacyM(value: uint64): uint64 {
    return value
  }
}
