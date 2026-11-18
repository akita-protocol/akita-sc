/**
 * The service account funding step (runbook E6a) on LocalNet. A PrizeBoxFactory is deployed and left
 * unfunded, as MainNet's is today: a mint fails until the account holds its own minimum balance, the
 * step sends exactly what is short, and a rerun sends nothing.
 */
import { getNetworkAppIds } from 'akita-sdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { type ScriptContext } from '../scripts/script-base'
import { DEFAULT_MODERATION_FLOAT, MODERATION_MIN_FREE, planServiceFunding, sendServiceFunding } from '../scripts/lib/service-account-funding'
import { deployPrizeBoxFactory } from './fixtures/prize-box'

describe('service accounts: an empty app account is funded before its app is used', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  const log = () => {}

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 800 })
    ctx = { options: { network: 'localnet', version: 'funding' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
  })

  test('a mint fails on an empty factory account, the step sends what is short, and a rerun sends nothing', async () => {
    const { sdk: factory } = await deployPrizeBoxFactory({
      fixture: boot.fixture, sender: boot.sender, signer: boot.signer, args: { version: 'empty', akitaDao: boot.dao.appId },
    })
    // The three other accounts are the fixture's own apps, read from the DAO as a network's would be.
    const g = ctx.dao.client.state.global
    const [aal, sal] = await Promise.all([g.akitaAppList(), g.akitaSocialAppList()])
    const empty: ScriptContext = { ...ctx, appIds: { ...ctx.appIds,
      prizeBoxFactory: factory.appId, hyperSwap: aal!.hyperSwap, socialModeration: sal!.moderation, pollFactory: boot.pollFactory!.appId } }

    const before = await planServiceFunding(empty)
    expect(before.map((p) => p.name)).toEqual(['HyperSwap', 'PrizeBoxFactory', 'PollFactory', 'AkitaSocialModeration'])
    expect(before.find((p) => p.name === 'PrizeBoxFactory')).toMatchObject({
      appId: factory.appId, balance: 0n, minBalance: 100_000n, free: 0n, shortfall: 100_000n, working: false,
    })

    // The mint charges the new box's storage exactly, so the account's own minimum is missing.
    await expect(factory.mint({ sender: boot.sender, signer: boot.signer, owner: boot.sender })).rejects.toThrow(/below min/)

    const sent = await sendServiceFunding(empty, before, log)
    expect(sent).toBe(before.reduce((sum, p) => sum + p.shortfall, 0n))

    const after = await planServiceFunding(empty)
    expect(after.every((p) => p.shortfall === 0n && p.working)).toBe(true)
    expect(after.find((p) => p.name === 'PrizeBoxFactory')).toMatchObject({ balance: 100_000n, free: 0n })
    const moderation = after.find((p) => p.name === 'AkitaSocialModeration')!
    expect(moderation.free).toBeGreaterThanOrEqual(DEFAULT_MODERATION_FLOAT)
    expect(DEFAULT_MODERATION_FLOAT).toBeGreaterThan(MODERATION_MIN_FREE)

    const box = await factory.mint({ sender: boot.sender, signer: boot.signer, owner: boot.sender })
    expect(box.appId).toBeGreaterThan(0n)

    expect(await sendServiceFunding(empty, await planServiceFunding(empty), log)).toBe(0n)
  })
})
