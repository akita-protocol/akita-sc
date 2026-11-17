/**
 * The TestNet parity step (runbook A4) on LocalNet against the tree DAO and wallet: a wallet is brought to
 * another network's escrows, locks and grants through real proposals, with a stand-in account for an
 * account escrow, and a second run finds nothing to do.
 */
import { getNetworkAppIds } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { deployStakingPlugin } from './fixtures/plugins/staking'
import { type ScriptContext } from '../scripts/script-base'
import { proposeAndExecute } from '../scripts/utils'
import { isEmptyPlan, planParity, readSetup, runParity, STAND_IN_FUNDING, type GrantPolicy, type Setup } from '../scripts/lib/dao-wallet-parity'

describe('DAO wallet parity: escrows, locks and grants carried from another network', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  const log = () => {}
  const account = () => algosdk.generateAccount().addr.toString()
  const MAX = 2n ** 64n - 1n
  const open: GrantPolicy = { delegationType: 0, lastValid: MAX, cooldown: 0n, methods: [], useRounds: false, useExecutionKey: false, coverFees: false, admin: false, canReclaim: false, defaultEscrow: '' }
  // Every LocalNet app is unlisted in the SDK registry, so each source app names its target app: itself.
  const same = (s: Setup) => new Map(s.grants.map((g) => [g.plugin, g.plugin]))

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 800 })
    ctx = { options: { network: 'localnet', version: 'parity' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
  })

  test('a wallet is at parity with itself', async () => {
    const setup = await readSetup(ctx)
    expect(setup.grants.length).toBeGreaterThan(0)
    expect(setup.updatePlugin).toBe(boot.daoUpdatePluginSdk!.appId)
    expect(isEmptyPlan(planParity(setup, setup, { plugins: same(setup) }))).toBe(true)
  })

  test('the difference is proposed and executed, an account escrow gets a rekeyed stand-in, and a second run does nothing', async () => {
    const wallet = await ctx.dao.getWallet()
    const walletAddress = wallet.client.appAddress.toString()
    const plugin = await deployStakingPlugin({ fixture: boot.fixture, sender: boot.sender, signer: boot.signer, args: { akitaDao: boot.dao.appId, version: 'parity' } })
    const [operator, leftover, tightened] = [account(), account(), account()]
    const upgrade = (await ctx.dao.client.state.global.upgradeAppProposalSettings())!
    const settings = { fee: upgrade.fee, power: upgrade.power, duration: upgrade.duration, participation: upgrade.participation, approval: upgrade.approval }

    // What only this wallet has: an unlocked escrow the other network keeps locked, a grant it lacks, and a grant it holds on other terms.
    const mbr = await wallet.getMbr({ escrow: 'flip_me', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.newEscrowMintCost + mbr.plugins * 2n + 1_000_000n) })
    await proposeAndExecute(ctx.algorand, ctx.dao, [
      { type: ProposalActionEnum.NewEscrow, escrow: 'flip_me', address: ALGORAND_ZERO_ADDRESS_STRING },
      { type: ProposalActionEnum.AddPlugin, client: plugin, callerType: CallerType.Other, caller: leftover, escrow: '', useRounds: false, coverFees: false, sourceLink: 'test', methods: [], useExecutionKey: false },
      { type: ProposalActionEnum.AddPlugin, client: plugin, callerType: CallerType.Other, caller: tightened, escrow: '', useRounds: false, coverFees: false, sourceLink: 'test', methods: [], useExecutionKey: false },
    ])
    const before = await readSetup(ctx)
    expect(before.escrows.find((e) => e.name === 'flip_me')).toMatchObject({ account: false, locked: false })
    const extra = before.grants.find((g) => g.plugin === plugin.appId && g.caller === leftover)!
    expect(extra).toBeDefined()
    const loose = before.grants.find((g) => g.plugin === plugin.appId && g.caller === tightened)!
    expect(loose.policy).toEqual(open)

    // The other network: the same wallet with the escrow locked, an account escrow, a locked escrow app,
    // four more grants (one restricted, one behind an execution key, one on each new escrow), a cooldown on
    // the grant both hold, and without the leftover grant.
    const restricted: GrantPolicy = { ...open, cooldown: 3n, methods: [{ selector: 'a1b2c3d4', cooldown: 7n }] }
    const source: Setup = {
      ...before, network: 'mainnet',
      escrows: [
        ...before.escrows.map((e) => (e.name === 'flip_me' ? { ...e, locked: true } : e)),
        { name: 'akta_creator', account: true, address: account(), locked: false },
        { name: 'vault', account: false, address: account(), locked: true },
      ],
      grants: [
        ...before.grants.filter((g) => g !== extra).map((g) => (g === loose ? { ...g, policy: { ...open, cooldown: 9n } } : g)),
        { plugin: plugin.appId, caller: operator, escrow: '', policy: open },
        { plugin: plugin.appId, caller: operator, escrow: 'akta_creator', policy: restricted },
        { plugin: plugin.appId, caller: operator, escrow: 'vault', policy: open },
        { plugin: plugin.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '', policy: { ...open, useExecutionKey: true, useRounds: true }, settings },
      ],
    }
    const options = { sender: ctx.sender, plugins: same(source), log }

    // A plan changes nothing and prices every proposal.
    const planned = await runParity(ctx, source, { ...options, confirm: false })
    expect(planned.plan.escrows).toEqual([
      { name: 'flip_me', action: 'lock' },
      { name: 'akta_creator', action: 'new-account' },
      { name: 'vault', action: 'new-app' }, { name: 'vault', action: 'lock' },
    ])
    expect(planned.plan.add).toHaveLength(4)
    expect(planned.plan.remove).toEqual([extra])
    expect(planned.plan.replace.map((r) => [r.target, r.differences])).toEqual([[loose, ['cooldown 0 -> 9']]])
    expect(planned.proposalIds).toEqual([])
    expect(await readSetup(ctx)).toEqual(before)

    // Only the DAO creator can send, and an account that is not rekeyed to the wallet is refused as a stand-in.
    await expect(runParity({ ...ctx, sender: account() }, source, { ...options, confirm: true })).rejects.toThrow('Only the DAO creator')
    await expect(runParity(ctx, source, { ...options, confirm: true, standIns: new Map([['akta_creator', operator]]) })).rejects.toThrow('is not rekeyed to the DAO wallet')
    expect(await readSetup(ctx)).toEqual(before)

    const done = await runParity(ctx, source, { ...options, confirm: true })
    const limit = Number((await ctx.dao.client.state.global.proposalActionLimit()) ?? 1n)
    // Eleven actions. Two of them wait for an earlier proposal to execute: the lock of the new escrow, and
    // the new terms of the replaced grant (the validator checks each action against the wallet as it stands).
    expect(limit).toBe(5)
    expect(done.proposalIds).toHaveLength(3)

    const after = await readSetup(ctx)
    expect(isEmptyPlan(planParity(source, after, { plugins: same(source) }))).toBe(true)
    const escrow = (name: string) => after.escrows.find((e) => e.name === name)!
    expect(escrow('flip_me')).toMatchObject({ account: false, locked: true })
    expect(escrow('vault')).toMatchObject({ account: false, locked: true })
    // The account escrow is the stand-in: a plain account whose auth address is the DAO wallet.
    const standIn = done.standIns.get('akta_creator')!
    expect(escrow('akta_creator')).toEqual({ name: 'akta_creator', account: true, address: standIn, locked: false })
    const info = await ctx.algorand.account.getInformation(standIn)
    expect(info.authAddr?.toString()).toBe(walletAddress)
    expect(info.balance.microAlgos).toBe(STAND_IN_FUNDING - 1_000n)

    const grant = (caller: string, name: string) => after.grants.find((g) => g.plugin === plugin.appId && g.caller === caller && g.escrow === name)
    expect(grant(leftover, '')).toBeUndefined()
    expect(grant(operator, '')!.policy).toEqual(open)
    expect(grant(operator, 'akta_creator')!.policy).toEqual(restricted)
    expect(grant(operator, 'vault')!.policy).toEqual(open)
    const keyed = grant(ALGORAND_ZERO_ADDRESS_STRING, '')!
    expect(keyed.policy).toEqual({ ...open, useExecutionKey: true, useRounds: true })
    expect(keyed.settings).toEqual(settings)
    expect(grant(tightened, '')!.policy).toEqual({ ...open, cooldown: 9n })
    // Every grant the two networks shared on the same terms is untouched.
    for (const g of before.grants.filter((x) => x !== extra && x !== loose)) expect(after.grants).toContainEqual(g)

    const again = await runParity(ctx, source, { ...options, confirm: true })
    expect(isEmptyPlan(again.plan)).toBe(true)
    expect(again.proposalIds).toEqual([])
    expect(await readSetup(ctx)).toEqual(after)
  })
})
