#!/usr/bin/env node
/**
 * Set the creation fee the DAO stores for a staking pool, an auction and a raffle, through one DAO
 * proposal (docs/rollout/MAINNET-ROLLOUT.md, B3a). Each fee is in microAlgos, and a fee left out is not
 * changed. Every other member of `staking_fees` and `nft_fees` is kept. See `scripts/lib/creation-fees.ts`.
 *
 * Usage (from projects/akita-sc):
 *   npm run update:creation-fees -- -n mainnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --dry-run --sender "$CREATOR"
 *   npm run update:creation-fees -- -n mainnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --confirm
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { runCreationFees } from './lib/creation-fees'

runScript(async () => {
  const args = process.argv.slice(2)
  const fee = (flag: string): bigint | undefined => {
    const at = args.indexOf(flag)
    if (at < 0) return undefined
    const raw = (args[at + 1] ?? '').replaceAll('_', '').replaceAll(',', '')
    if (!/^\d+$/.test(raw)) throw new Error(`${flag} takes a whole number of microAlgos (100 ALGO is 100000000)`)
    return BigInt(raw)
  }
  const options = parseBaseArgs('update-creation-fees.ts', `
Creation fee options (at least one; there is no default):
  --staking-pool <microAlgos>  Fee to create a staking pool (staking_fees.creationFee)
  --auction <microAlgos>       Fee to create an auction (nft_fees.auctionCreationFee); charged once AuctionFactory is upgraded (E4)
  --raffle <microAlgos>        Fee to create a raffle (nft_fees.raffleCreationFee)
  --confirm                    Create and execute the proposal (plans only without it)`)
  const wanted = { stakingPool: fee('--staking-pool'), auction: fee('--auction'), raffle: fee('--raffle') }
  if (wanted.stakingPool === undefined && wanted.auction === undefined && wanted.raffle === undefined) {
    throw new Error('Name at least one fee: --staking-pool, --auction or --raffle, each in microAlgos')
  }
  const ctx = await setupContext(options)
  await runCreationFees(ctx, wanted, { confirm: args.includes('--confirm') })
})
