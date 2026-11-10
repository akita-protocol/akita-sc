import { Bytes, bytes, Contract, Global, GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Mock VRF beacon for testing purposes (test-only, never deployed to a live network).
 *
 * By default it returns a fixed 32-byte seed for every round. Tests can override
 * the seed (`setSeed`) to steer the drawn ticket, make every read come back
 * empty (`setEmpty`) to exercise the beacon-failure path, or model the MainNet
 * beacon's timing (`setSubmitLag`).
 */
export class MockRandomnessBeacon extends Contract {
  /** override seed; empty means "use the default seed" */
  seed = GlobalState<bytes>({ initialValue: Bytes(''), key: 'seed' })
  /** when true, `get` returns empty bytes (beacon value unavailable) */
  empty = GlobalState<boolean>({ initialValue: false, key: 'empty' })
  /**
   * 0 = every round is available at once. Otherwise mirrors MainNet beacon 1615566206: it stores
   * one value per multiple of 8, answers round r from ceil8(r), and that value lands `submitLag`
   * rounds after ceil8(r)
   */
  submitLag = GlobalState<uint64>({ initialValue: 0, key: 'submitLag' })

  /**
   * Returns mock random bytes for testing.
   */
  get(round: uint64, userData: bytes): bytes {
    if (this.empty.value) {
      return Bytes('')
    }

    if (this.submitLag.value > 0) {
      const stored: uint64 = (round + 7) / 8 * 8
      if (Global.round < stored + this.submitLag.value) {
        return Bytes('')
      }
    }

    if (this.seed.value.length > 0) {
      return this.seed.value
    }

    // Return 32 bytes of predictable "random" data
    return Bytes.fromHex('0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20')
  }

  /** test helper: use `seed` for every subsequent read (empty bytes restores the default) */
  setSeed(seed: bytes): void {
    this.seed.value = seed
  }

  /** test helper: make every subsequent read return empty bytes */
  setEmpty(empty: boolean): void {
    this.empty.value = empty
  }

  /** test helper: model the MainNet beacon's ceil-to-8 storage and submission lag (0 disables) */
  setSubmitLag(lag: uint64): void {
    this.submitLag.value = lag
  }
}
