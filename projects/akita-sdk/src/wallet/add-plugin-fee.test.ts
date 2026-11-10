import { describe, expect, test } from 'vitest'
import { addPluginExtraFee, NewEscrowFeeAmount } from './constants'

// arc58_addPlugin inner transactions: NewEscrowFeeAmount covers the escrow factory path; an external
// controlled address adds one MBR payment for the plugin boxes and, with a new escrow, one for the escrow box.
describe('addPluginExtraFee', () => {
  test('wallet-controlled: only the new-escrow path costs extra', () => {
    expect(addPluginExtraFee(false, false)).toBe(0n)
    expect(addPluginExtraFee(true, false)).toBe(NewEscrowFeeAmount)
  })

  test('external controlled address: one MBR payment, two with a new escrow', () => {
    expect(addPluginExtraFee(false, true)).toBe(1_000n)
    expect(addPluginExtraFee(true, true)).toBe(NewEscrowFeeAmount + 2_000n)
  })
})
