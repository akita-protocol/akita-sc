import { Account, BoxMap, Contract, uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Test stand-in for AkitaSocialImpact (FINAL-SPEC WP5a, akita-hooks A12 fixture 2). ABI-compatible
 * `getUserImpact(address)uint64`, read through the DAO's `sal.impact`, with a test setter.
 * Fund the app account for the box MBR (2,500 + 400 · (1 + 32 + 8) = 18,900 µALGO per account).
 */
export class MockSocialImpact extends Contract {
  impacts = BoxMap<Account, uint64>({ keyPrefix: 'i' })

  setImpact(account: Account, impact: uint64): void {
    this.impacts(account).value = impact
  }

  getUserImpact(address: Account): uint64 {
    return this.impacts(address).get({ default: 0 })
  }
}
