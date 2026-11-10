/**
 * `runUpdate --proposal-id` (scripts/script-base.ts) on LocalNet, end to end (2026-10-05 review).
 *
 * A resume rebuilds the update execution from scratch, at a later round and against a changed chain:
 * the UpgradeApp proposal now exists (and, when executed, the wallet's 'x' + lease execution box too).
 * The rebuilt groups must still hash to the group ids the proposal recorded, or
 * `restampExecutionFromProposal` throws "Rebuilt group ... does not match proposal group id".
 * Each byte of the rebuild comes from simulate at resume time (Access lists, covered fees), so only a
 * real chain run proves it. Both resumable states are covered:
 *   - Executed (status 50): the first run stopped after proposeAndExecute, before the update was sent.
 *   - Approved, not executed (status 40): the first run stopped at executeProposal.
 * The real update targets are staking-pool children through `updateChildren`, the same path the
 * `update-children` script runs.
 */
import { getNetworkAppIds } from 'akita-sdk'
import { ProposalActionEnum, ProposalStatusEnum } from 'akita-sdk/dao'
import { StakingPoolStakingType } from 'akita-sdk/staking-pool'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { updateChildren } from '../scripts/lib/child-updates'
import { recordedLease } from '../scripts/lib/execution-lease'
import { type ScriptContext } from '../scripts/script-base'

describe('runUpdate --proposal-id resumes a real UpgradeApp proposal', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 500 })
    ctx = { options: { network: 'localnet', version: 'resume-test' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
    await ctx.dao.getWallet()
  })

  afterEach(() => vi.restoreAllMocks())

  async function newPool(title: string) {
    return boot.stakingPoolFactory!.new({ sender: ctx.sender, signer: ctx.signer, title,
      type: StakingPoolStakingType.NONE, marketplace: ctx.sender, stakeKey: { address: ctx.sender, name: 'resume' }, minimumStakeAmount: 1n,
      gateId: 0n, allowLateSignups: false, maxEntries: 0n })
  }

  /** Runs the first update attempt, which `interrupt` stops part way; returns the proposal it created. */
  async function interruptedRun(context: ScriptContext, poolId: bigint, interrupt: () => void) {
    const create = vi.spyOn(context.dao, 'newProposal')
    interrupt()
    await expect(updateChildren(context, 'staking-pool', boot.stakingPoolFactory!.appId, [poolId], false)).rejects.toThrow('test interruption')
    expect(create).toHaveBeenCalledTimes(1)
    const proposalId = (await create.mock.results[0].value).return as bigint
    vi.restoreAllMocks()
    const proposal = await context.dao.getProposal(proposalId)
    const upgrade = proposal.actions.find((a) => a.type === ProposalActionEnum.UpgradeApp)
    expect(upgrade && upgrade.type === ProposalActionEnum.UpgradeApp && upgrade.app).toBe(poolId)
    return { proposalId, status: proposal.status, upgrade: upgrade as Extract<typeof upgrade, { type: typeof ProposalActionEnum.UpgradeApp }> }
  }

  /** Resumes with `--proposal-id`; the rebuild must match the recorded groups and the update must land. */
  async function resume(context: ScriptContext, poolId: bigint, proposalId: bigint) {
    const resumed: ScriptContext = { ...context, options: { ...context.options, proposalId } }
    const create = vi.spyOn(context.dao, 'newProposal')
    const build = vi.spyOn(context.dao.wallet.build, 'usePlugin')
    const [result] = await updateChildren(resumed, 'staking-pool', boot.stakingPoolFactory!.appId, [poolId], false)
    expect(create).not.toHaveBeenCalled()
    expect(build).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({ appId: poolId, proposalId })
    expect(result.confirmedRound).toBeGreaterThan(0n)
    return { lease: build.mock.calls[0][0].lease }
  }

  test('executed proposal (status 50): the rebuild matches the recorded group ids and the update confirms', async () => {
    const context: ScriptContext = { ...ctx, options: { ...ctx.options, version: 'resume-executed' } }
    const pool = await newPool('Resume executed')
    const before = await pool.client.state.global.getAll()

    // Stop after proposeAndExecute, before the update groups are sent.
    const { proposalId, status, upgrade } = await interruptedRun(context, pool.appId, () => {
      const original = context.dao.wallet.build.usePlugin
      vi.spyOn(context.dao.wallet.build, 'usePlugin').mockImplementationOnce(async (params) => {
        const execution = await original(params)
        execution.send = async () => { throw new Error('test interruption: send') }
        return execution
      })
    })
    expect(status).toBe(ProposalStatusEnum.Executed)
    expect((await pool.client.state.global.getAll()).version).toBe(before.version)

    // The proposal, its execution box and many rounds now exist that the first build did not see.
    const { lease } = await resume(context, pool.appId, proposalId)
    expect(lease).toBe(recordedLease(upgrade.executionKey))
    const after = await pool.client.state.global.getAll()
    expect(after.version).toBe('resume-executed')
    expect({ ...after, version: before.version }).toEqual(before)
  })

  test('approved proposal not yet executed (status 40): the resume executes it, then the rebuild matches and the update confirms', async () => {
    const context: ScriptContext = { ...ctx, options: { ...ctx.options, version: 'resume-approved' } }
    const pool = await newPool('Resume approved')
    const before = await pool.client.state.global.getAll()

    // Stop at executeProposal: the proposal exists, the wallet has no execution box for its lease yet.
    const { proposalId, status, upgrade } = await interruptedRun(context, pool.appId, () => {
      vi.spyOn(context.dao.client.send, 'executeProposal').mockRejectedValueOnce(new Error('test interruption: execute'))
    })
    expect(status).toBe(ProposalStatusEnum.Approved)

    // Control: the group-id check is live. A rebuild with any other lease (the pre-fix fresh stamp) is
    // refused before the proposal is executed.
    const original = context.dao.wallet.build.usePlugin
    vi.spyOn(context.dao.wallet.build, 'usePlugin').mockImplementation(async (params) => original({ ...params, lease: 'child_fresh_123456' }))
    await expect(updateChildren({ ...context, options: { ...context.options, proposalId } }, 'staking-pool', boot.stakingPoolFactory!.appId, [pool.appId], false))
      .rejects.toThrow(/Rebuilt group 1 does not match proposal group id/)
    vi.restoreAllMocks()
    expect((await context.dao.getProposal(proposalId)).status).toBe(ProposalStatusEnum.Approved)

    const { lease } = await resume(context, pool.appId, proposalId)
    expect(lease).toBe(recordedLease(upgrade.executionKey))
    expect((await context.dao.getProposal(proposalId)).status).toBe(ProposalStatusEnum.Executed)
    const after = await pool.client.state.global.getAll()
    expect(after.version).toBe('resume-approved')
    expect({ ...after, version: before.version }).toEqual(before)
  })
})
