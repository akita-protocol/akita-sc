/**
 * The revenue split step (runbook B3b) and the receivers' opt-ins (G3b) on LocalNet against the tree
 * DAO, DAO wallet and RevenueManager: one proposal sets 80/5/15, every revenue escrow then pays by it,
 * the locked receivers opt in through their open grant, and an asset divides the same way.
 */
import { getNetworkAppIds, type PluginSDKReturn } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, type RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING, type Address, type TransactionSigner } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { type ScriptContext } from '../scripts/script-base'
import { proposeAndExecute } from '../scripts/utils'
import { registerRevenueEscrow } from '../scripts/lib/dao-escrow-steps'
import { createPluginClient } from '../scripts/lib/dao-wallet-plugin-migration'
import { planReceiverOptIns, runReceiverOptIns } from '../scripts/lib/revenue-receiver-opt-ins'
import { parseShares, readReceiveEscrows, readRevenueSplits, runRevenueSplits, simulateProposal } from '../scripts/lib/revenue-splits'

describe('revenue split: one table for every source', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  /** The same context for an account that holds no role: it keeps the payouts going and sends the opt-ins. */
  let keeperCtx: ScriptContext
  let keeper: { addr: Address; signer: TransactionSigner }
  let rm: RevenueManagerPluginSDK
  let walletId: bigint
  const log = () => {}
  const RECEIVERS = ['rec_krby', 'rec_mod', 'rec_gov']
  const RELEASE = parseShares('rec_krby=80,rec_mod=5,rec_gov=15')
  const LIVE = parseShares('rec_krby=40,rec_mod=20,rec_gov=40')

  const who = () => ({ sender: keeper.addr.toString(), signer: keeper.signer })
  const stored = async () => (await readRevenueSplits(ctx)).map((split) => `${split.escrow} ${split.value}`)
  const address = async (escrow: string) => (await (await ctx.dao.getWallet()).getEscrows()).get(escrow)!.address.toString()
  const info = (account: string) => ctx.algorand.account.getInformation(account)
  const held = (account: Awaited<ReturnType<typeof info>>, asset: bigint) => account.assets?.find((holding) => holding.assetId === asset)?.amount ?? 0n
  const fund = async (escrow: string, amount: bigint) =>
    ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: await address(escrow), amount: microAlgo(amount) })
  /** A call through an escrow's open grant, sent by the keeper. */
  const escrowCall = async (escrow: string, calls: PluginSDKReturn[]) =>
    (await ctx.dao.getWallet()).usePlugin({ ...who(), callerType: CallerType.Global, escrow, calls })
  const managed = async (escrow: string) => [...await rm.client.state.box.managedAssets.getMap()].map(([key]) => key)
    .filter((key) => key.wallet === walletId && key.escrow === escrow).map((key) => key.asset)
  const start = (escrow: string) => escrowCall(escrow, [rm.startEscrowDisbursement(who())])
  /** Allocate and finalize a started cycle. Returns what the escrow held of `asset` and what each receiver gained. */
  const finish = async (escrow: string, asset = 0n) => {
    const ids = [0n, ...await managed(escrow)]
    const amount = (account: Awaited<ReturnType<typeof info>>) => (asset === 0n ? account.balance.microAlgos : held(account, asset))
    const receivers = await Promise.all(RECEIVERS.map(address))
    const source = await info(await address(escrow))
    const before = await Promise.all(receivers.map(info))
    await escrowCall(escrow, [rm.processEscrowAllocation({ ...who(), ids })])
    await escrowCall(escrow, [rm.finalizeEscrowDisbursement({ ...who(), ids })])
    const after = await Promise.all(receivers.map(info))
    return {
      distributable: asset === 0n ? source.balance.microAlgos - source.minBalance.microAlgos : held(source, asset),
      gained: after.map((account, i) => amount(account) - amount(before[i])),
    }
  }
  const payout = async (escrow: string, asset = 0n) => { await start(escrow); return finish(escrow, asset) }
  /** What three percentage entries receive: each rounds down, and the last takes what is left. */
  const divide = (amount: bigint, first: bigint, second: bigint) => {
    const a = (amount * first) / 100_000n
    const b = (amount * second) / 100_000n
    return [a, b, amount - a - b]
  }
  const newEscrow = async (escrow: string) => {
    const wallet = await ctx.dao.getWallet()
    const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.newEscrowMintCost + 1_000_000n) })
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING }])
  }

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 800 })
    ctx = { options: { network: 'localnet', version: 'splits' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
    keeper = await boot.fixture.context.generateAccount({ initialFunds: (100).algo() })
    keeperCtx = { ...ctx, sender: keeper.addr.toString(), signer: keeper.signer }
    walletId = (await ctx.dao.getWallet()).appId
    const revenueManager = (await ctx.dao.client.state.global.pluginAppList())!.revenueManager
    rm = createPluginClient('revenueManagerPlugin', ctx, revenueManager, ctx.sender) as unknown as RevenueManagerPluginSDK
    // The RevenueManager's own account holds the tracking boxes of an open cycle.
    await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: rm.client.appAddress, amount: microAlgo(2_000_000n) })
  })

  test('a plan sends nothing, one proposal sets 80/5/15, and every revenue escrow then pays by it', async () => {
    // The tree DAO starts with the shares both networks held on 2026-11-18, read by every revenue escrow.
    expect(await stored()).toEqual(['rec_krby 40000', 'rec_mod 20000', 'rec_gov 40000'])
    const { escrows } = await readReceiveEscrows(ctx, walletId, ctx.sender)
    expect(escrows.map((e) => e.escrow)).toEqual(expect.arrayContaining(['rev_auction', 'rev_marketplace', 'rev_social', 'rev_subscriptions', 'rev_wallet']))
    expect(escrows.every((e) => e.follows && !e.ownSplit && e.phase === 0)).toBe(true)

    // Before the change a payout divides 40/20/40.
    await fund('rev_wallet', 3_000_003n)
    const old = await payout('rev_wallet')
    expect(old.distributable).toBeGreaterThanOrEqual(3_000_003n)
    expect(old.gained).toEqual(divide(old.distributable, 40_000n, 20_000n))

    // A plan simulates the proposal as the creator and sends nothing, with or without a key; so does a dry run.
    const lines: string[] = []
    const planned = await runRevenueSplits(ctx, RELEASE, { confirm: false, log: (line) => lines.push(line) })
    expect(planned.proposalId).toBeUndefined()
    expect(planned.plan.rows).toEqual([{ escrow: 'rec_krby', from: 40_000n, to: 80_000n }, { escrow: 'rec_mod', from: 20_000n, to: 5_000n }, { escrow: 'rec_gov', from: 40_000n, to: 15_000n }])
    expect(lines.join('\n')).toContain('is created and executed without error')
    expect(lines.join('\n')).toContain('PLAN ONLY: nothing was sent')
    expect((await runRevenueSplits({ ...ctx, options: { ...ctx.options, dryRun: true } }, RELEASE, { confirm: true, log })).proposalId).toBeUndefined()
    expect(await stored()).toEqual(['rec_krby 40000', 'rec_mod 20000', 'rec_gov 40000'])

    // Only the creator can make the change: the simulation fails for anyone else, and so does the step.
    await expect(simulateProposal(ctx, keeper.addr.toString(), planned.plan.actions, 0n, 0n)).rejects.toThrow('The DAO rejects this proposal in simulation')
    await expect(runRevenueSplits(keeperCtx, RELEASE, { confirm: true, log })).rejects.toThrow('Only the DAO creator')
    await expect(runRevenueSplits(ctx, parseShares('rec_krby=80,rec_mod=5,rec_gov=14'), { confirm: true, log })).rejects.toThrow('not 100%')

    const done = await runRevenueSplits(ctx, RELEASE, { confirm: true, log })
    expect(done.proposalId).toBeDefined()
    expect(await stored()).toEqual(['rec_krby 80000', 'rec_mod 5000', 'rec_gov 15000'])

    // No revenue escrow was touched, and each pays 80/5/15 at once: the last receiver takes the remainder.
    for (const escrow of ['rev_subscriptions', 'rev_auction']) {
      await fund(escrow, 5_000_003n)
      const paid = await payout(escrow)
      expect(paid.distributable).toBeGreaterThanOrEqual(5_000_003n)
      expect(paid.gained).toEqual(divide(paid.distributable, 80_000n, 5_000n))
      expect(paid.gained[0] + paid.gained[1] + paid.gained[2]).toBe(paid.distributable)
    }

    // A second run finds nothing to do.
    const again = await runRevenueSplits(ctx, RELEASE, { confirm: true, log })
    expect(again.plan.changed).toBe(false)
    expect(again.proposalId).toBeUndefined()
  })

  test('the locked receivers opt in through their open grant, and an asset then divides 80/5/15', async () => {
    const asset = (await ctx.algorand.send.assetCreate({ sender: ctx.sender, signer: ctx.signer, total: 10n ** 12n, decimals: 6, assetName: 'Split Test Dollar', unitName: 'STD' })).assetId
    // A further source, registered the way rev_nfd is (G3a), reads the same table without another step.
    const escrow = 'rev_split_test'
    await newEscrow(escrow)
    await registerRevenueEscrow(ctx, { escrow, source: keeper.addr.toString(), log })
    expect((await readReceiveEscrows(ctx, walletId, ctx.sender)).escrows.find((e) => e.escrow === escrow)).toEqual({ escrow, follows: true, ownSplit: false, phase: 0 })
    // Its source registers the asset, as a fee generator does the first time it is paid in one. Until
    // the escrow holds some of it there is nothing to pay out, so no receiver is asked to opt in.
    await escrowCall(escrow, [rm.optIn({ ...who(), assets: [asset] })])
    const empty = await planReceiverOptIns(ctx)
    expect(empty.unheld).toContain(asset)
    expect(empty.wanted).not.toContain(asset)
    expect((await planReceiverOptIns(ctx, [asset])).wanted).toContain(asset)
    await ctx.algorand.send.assetTransfer({ sender: ctx.sender, signer: ctx.signer, receiver: await address(escrow), assetId: asset, amount: 1_000_003n })

    const plan = await planReceiverOptIns(ctx)
    expect(plan.wanted).toContain(asset)
    expect(plan.unheld).not.toContain(asset)
    expect(plan.receivers.map((r) => r.escrow)).toEqual(RECEIVERS)
    expect(plan.receivers.every((r) => r.locked && r.granted && r.missing.includes(asset))).toBe(true)
    const wanted = plan.receivers.reduce((count, r) => count + r.missing.length, 0)
    await expect(runReceiverOptIns(ctx, { assets: [asset + 999_999n], confirm: false, log })).rejects.toThrow('is not an asset')

    // A plan simulates every group as the account named and sends nothing.
    const lines: string[] = []
    expect((await runReceiverOptIns(ctx, { confirm: false, sender: keeper.addr.toString(), log: (line) => lines.push(line) })).optedIn).toBe(0)
    expect(lines.join('\n')).toContain('group(s) pass')
    expect((await runReceiverOptIns({ ...keeperCtx, options: { ...ctx.options, dryRun: true } }, { confirm: true, log })).optedIn).toBe(0)
    expect((await planReceiverOptIns(ctx)).receivers.map((r) => r.missing)).toEqual(plan.receivers.map((r) => r.missing))

    // Any funded account sends them, and pays the minimum balance; the escrows stay locked.
    const balances = await Promise.all(plan.receivers.map((r) => info(r.address)))
    expect((await runReceiverOptIns(keeperCtx, { confirm: true, log })).optedIn).toBe(wanted)
    const after = await planReceiverOptIns(ctx)
    expect(after.receivers.every((r) => r.locked && r.missing.length === 0)).toBe(true)
    for (const [i, r] of plan.receivers.entries()) {
      const now = await info(r.address)
      expect(now.balance.microAlgos - balances[i].balance.microAlgos).toBe(100_000n * BigInt(r.missing.length))
      expect(now.balance.microAlgos - now.minBalance.microAlgos).toBe(balances[i].balance.microAlgos - balances[i].minBalance.microAlgos)
    }
    expect((await runReceiverOptIns(keeperCtx, { confirm: true, log })).optedIn).toBe(0)

    const paid = await payout(escrow, asset)
    expect(paid.distributable).toBe(1_000_003n)
    expect(paid.gained).toEqual([800_002n, 50_000n, 150_001n])
    expect(held(await info(await address(escrow)), asset)).toBe(0n)
  })

  test('the split does not change while a payout cycle is open, and the same step moves it back', async () => {
    const escrow = 'rev_marketplace'
    await fund(escrow, 2_000_001n)
    await start(escrow)
    const lines: string[] = []
    await runRevenueSplits(ctx, LIVE, { confirm: false, log: (line) => lines.push(line) })
    expect(lines.join('\n')).toContain(`"${escrow}" is in the middle of a payout cycle`)
    expect(lines.join('\n')).toContain(`Before --confirm: A payout cycle is open on ${escrow}`)
    await expect(runRevenueSplits(ctx, LIVE, { confirm: true, log })).rejects.toThrow(`A payout cycle is open on ${escrow}`)
    expect(await stored()).toEqual(['rec_krby 80000', 'rec_mod 5000', 'rec_gov 15000'])

    // The open cycle finishes at the shares stored, and then the table can move.
    const paid = await finish(escrow)
    expect(paid.gained).toEqual(divide(paid.distributable, 80_000n, 5_000n))
    expect((await runRevenueSplits(ctx, LIVE, { confirm: true, log })).proposalId).toBeDefined()
    expect(await stored()).toEqual(['rec_krby 40000', 'rec_mod 20000', 'rec_gov 40000'])
  })
})
