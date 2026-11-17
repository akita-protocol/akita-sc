/**
 * The creation fee step (runbook B3a) on LocalNet against the tree DAO and factories: one proposal sets
 * the three fees, every other fee member survives, and the factories quote the new fees at once.
 */
import { getNetworkAppIds } from 'akita-sdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { type ScriptContext } from '../scripts/script-base'
import { feeDifferences, readFeeStructs, runCreationFees } from '../scripts/lib/creation-fees'

describe('creation fees: staking pool, auction and raffle', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  const log = () => {}
  const ALGO = 1_000_000n
  // Prize-box creations with ALGO bids and tickets need no asset, so the quotes depend on the fee alone.
  const quotes = async () => ({
    pool: await boot.stakingPoolFactory!.cost(),
    raffle: await boot.raffleFactory!.cost({ isPrizeBox: true, prizeId: 0n, ticketAsset: 0n, weightsListCount: 0n }),
    auction: await boot.auctionFactory!.cost({ isPrizeBox: true, bidAssetId: 0n, prizeAssetId: 0n, weightsListCount: 0n }),
  })

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 800 })
    ctx = { options: { network: 'localnet', version: 'fees' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
  })

  test('one proposal sets the three fees, keeps the rest, and the factories quote them', async () => {
    const before = await readFeeStructs(ctx)
    const quoted = await quotes()
    const wanted = { stakingPool: before.staking.creationFee + 50n * ALGO, auction: before.nft.auctionCreationFee + 40n * ALGO, raffle: before.nft.raffleCreationFee + 40n * ALGO }

    // A plan sends nothing, with or without a key, and so does --confirm in a dry run.
    const planned = await runCreationFees(ctx, wanted, { confirm: false, log })
    expect(planned.proposalId).toBeUndefined()
    expect(planned.plan.changes.map((c) => c.name)).toEqual(['staking pool', 'auction', 'raffle'])
    expect((await runCreationFees({ ...ctx, options: { ...ctx.options, dryRun: true } }, wanted, { confirm: true, log })).proposalId).toBeUndefined()
    expect(await readFeeStructs(ctx)).toEqual(before)
    await expect(runCreationFees(ctx, {}, { confirm: true, log })).rejects.toThrow('Name at least one fee')

    const done = await runCreationFees(ctx, wanted, { confirm: true, log })
    expect(done.proposalId).toBeDefined()
    const after = await readFeeStructs(ctx)
    expect(after.staking).toEqual({ ...before.staking, creationFee: wanted.stakingPool })
    expect(after.nft).toEqual({ ...before.nft, auctionCreationFee: wanted.auction, raffleCreationFee: wanted.raffle })
    expect(feeDifferences(after, before)).toHaveLength(3)

    // The factories read the fee from the DAO on every call: a pool costs 50 ALGO more, and a raffle
    // and an auction 40 more each.
    const now = await quotes()
    expect(now.pool - quoted.pool).toBe(50n * ALGO)
    expect(now.raffle - quoted.raffle).toBe(40n * ALGO)
    expect(now.auction - quoted.auction).toBe(40n * ALGO)

    // A second run finds nothing to do, and one fee can move alone.
    const again = await runCreationFees(ctx, wanted, { confirm: true, log })
    expect(again.plan.changes).toEqual([])
    expect(again.proposalId).toBeUndefined()
    await runCreationFees(ctx, { raffle: 0n }, { confirm: true, log })
    expect(await readFeeStructs(ctx)).toEqual({ staking: after.staking, nft: { ...after.nft, raffleCreationFee: 0n } })
    expect((await quotes()).raffle).toBe(quoted.raffle - before.nft.raffleCreationFee)
  })
})
