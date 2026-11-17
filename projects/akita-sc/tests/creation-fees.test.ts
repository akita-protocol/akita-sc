/**
 * The creation fee plan (runbook B3a), against the fee structs both DAOs held on 2026-11-17: what
 * changes, what is written back untouched, and what is refused.
 */
import { ProposalActionEnum } from 'akita-sdk/dao'
import { describe, expect, test } from 'vitest'
import { algo, feeDifferences, planCreationFees, type FeeStructs } from '../scripts/lib/creation-fees'

// MainNet and TestNet held the same values (read 2026-11-17).
const live = (): FeeStructs => ({
  staking: { creationFee: 50_000_000n, impactTaxMin: 500n, impactTaxMax: 3_000n },
  nft: {
    marketplaceSalePercentageMin: 500n, marketplaceSalePercentageMax: 2_000n, marketplaceComposablePercentage: 500n,
    marketplaceRoyaltyDefaultPercentage: 5_000n, shuffleSalePercentage: 1_000n, omnigemSaleFee: 100_000_000n,
    auctionCreationFee: 10_000_000n, auctionSaleImpactTaxMin: 500n, auctionSaleImpactTaxMax: 2_000n,
    auctionComposablePercentage: 500n, auctionRafflePercentage: 10_000n, raffleCreationFee: 10_000_000n,
    raffleSaleImpactTaxMin: 500n, raffleSaleImpactTaxMax: 2_000n, raffleComposablePercentage: 500n,
  },
})
const RELEASE = { stakingPool: 100_000_000n, auction: 50_000_000n, raffle: 50_000_000n }

describe('creation fee plan', () => {
  test('the release fees: three members change in two structs, and every other member is written back as read', () => {
    const plan = planCreationFees(live(), RELEASE)
    expect(plan.changes.map((c) => `${c.name} ${c.field}.${c.member} ${c.from} -> ${c.to}`)).toEqual([
      'staking pool staking_fees.creationFee 50000000 -> 100000000',
      'auction nft_fees.auctionCreationFee 10000000 -> 50000000',
      'raffle nft_fees.raffleCreationFee 10000000 -> 50000000',
    ])
    expect(plan.unchanged).toEqual([])
    expect(plan.actions).toEqual([
      { type: ProposalActionEnum.UpdateFields, field: 'staking_fees', value: { ...live().staking, creationFee: 100_000_000n } },
      { type: ProposalActionEnum.UpdateFields, field: 'nft_fees', value: { ...live().nft, auctionCreationFee: 50_000_000n, raffleCreationFee: 50_000_000n } },
    ])
    // Fifteen members of nft_fees and three of staking_fees go out; only the three named differ from what was read.
    expect(feeDifferences(plan.expected, live())).toHaveLength(3)
    expect(Object.keys((plan.actions[1] as { value: object }).value)).toHaveLength(15)
  })

  test('a fee left out is not changed, and its struct is not written', () => {
    const plan = planCreationFees(live(), { raffle: 50_000_000n })
    expect(plan.changes.map((c) => c.name)).toEqual(['raffle'])
    expect(plan.actions).toHaveLength(1)
    expect(plan.actions[0]).toMatchObject({ field: 'nft_fees', value: { auctionCreationFee: 10_000_000n, raffleCreationFee: 50_000_000n } })
    expect(plan.expected.staking).toEqual(live().staking)
  })

  test('a fee already at its value needs no proposal', () => {
    const after = planCreationFees(live(), RELEASE).expected
    const plan = planCreationFees(after, RELEASE)
    expect(plan.changes).toEqual([])
    expect(plan.unchanged.map((c) => c.name)).toEqual(['staking pool', 'auction', 'raffle'])
    expect(plan.actions).toEqual([])
    // One of two already there: only the other struct is written.
    expect(planCreationFees(after, { stakingPool: 100_000_000n, raffle: 0n }).actions.map((a) => (a as { field: string }).field)).toEqual(['nft_fees'])
  })

  test('zero is a fee; a negative amount and a struct without the member are refused', () => {
    expect(planCreationFees(live(), { auction: 0n }).changes).toEqual([{ name: 'auction', field: 'nft_fees', member: 'auctionCreationFee', from: 10_000_000n, to: 0n }])
    expect(() => planCreationFees(live(), { raffle: -1n })).toThrow('cannot be negative')
    const old = live()
    delete old.nft.raffleCreationFee
    expect(() => planCreationFees(old, { raffle: 1n })).toThrow("nft_fees holds no raffleCreationFee")
  })

  test('a read-back that differs is named member by member', () => {
    const expected = planCreationFees(live(), RELEASE).expected
    expect(feeDifferences(expected, expected)).toEqual([])
    const actual = { staking: { ...expected.staking, impactTaxMax: 1n }, nft: { ...expected.nft } }
    delete actual.nft.shuffleSalePercentage
    expect(feeDifferences(actual, expected)).toEqual(['staking.impactTaxMax: 1, expected 3000', 'nft.shuffleSalePercentage: undefined, expected 1000'])
  })

  test('amounts print in ALGO', () => {
    expect([algo(0n), algo(100_000_000n), algo(50_500_000n), algo(1n), algo(1_234_000_000n)]).toEqual(['0 ALGO', '100 ALGO', '50.5 ALGO', '0.000001 ALGO', '1,234 ALGO'])
  })
})
