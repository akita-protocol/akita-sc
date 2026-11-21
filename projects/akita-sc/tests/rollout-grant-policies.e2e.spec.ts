/**
 * The rollout steps about grant policies, on LocalNet against the tree DAO: the DAO wallet's policy
 * writer grant (H1) and one grant's policy written by proposal (scripts/lib/grant-policy-steps.ts).
 */
import { getNetworkAppIds } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, MetaPluginSDK, newMetaPlugin } from 'akita-sdk/wallet'
import algosdk, { ABIType, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { beforeAll, describe, expect, test } from 'vitest'
import { MetaFactory } from '../../akita-sdk/src/meta'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { type ScriptContext } from '../scripts/script-base'
import { proposeAndExecute } from '../scripts/utils'
import { installPolicyWriterGrant, policyWriterGrantProblem, readDaoGrantPolicy, readPolicyWriter, writeDaoGrantPolicy } from '../scripts/lib/grant-policy-steps'
import { readRolloutStatus } from '../scripts/lib/rollout-steps'

describe('rollout steps: grant policies on the DAO wallet', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  let writer: MetaPluginSDK
  let meta: bigint
  const escrow = 'rec_policy'
  const log = () => {}
  const stranger = () => algosdk.generateAccount().addr.toString()
  const scope = (namespace: string) => ABIType.from('(string,string[])').encode([namespace, []])
  const target = () => ({ plugin: writer.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })
  const writerGrant = async () => [...await (await ctx.dao.getWallet()).client.state.box.plugins.getMap()]
    .find(([key]) => key.plugin === writer.appId && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === '')?.[1]
  const row = async () => (await readRolloutStatus(ctx)).rows.find((r) => r.id === 'dao-policy-writer')!

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 800 })
    const { algorand } = boot.fixture
    const metaFactory = algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: boot.sender, defaultSigner: boot.signer })
    const { appClient } = await metaFactory.send.create.create({ args: { version: 'test', akitaDao: boot.dao.appId } })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    meta = appClient.appId
    writer = await newMetaPlugin({ algorand, sender: boot.sender, signer: boot.signer, registry: meta })
    ctx = { options: { network: 'localnet', version: 'rollout-grant-policies' }, algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId, meta, metaPlugin: writer.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
  })

  describe('the policy writer grant', () => {
    test('it is refused until Meta takes policies from the recorded MetaPlugin', async () => {
      expect(await readPolicyWriter(ctx, meta)).toBe(0n)
      await expect(installPolicyWriterGrant(ctx, { log })).rejects.toThrow('takes policies from no app yet')
      expect((await row()).status).not.toBe('done')
      const other = await newMetaPlugin({ algorand: ctx.algorand, sender: boot.sender, signer: boot.signer, registry: meta })
      // A MetaPlugin that is not the registered writer is refused as well.
      const metaClient = ctx.algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: boot.sender, defaultSigner: boot.signer }).getAppClientById({ appId: meta })
      await metaClient.send.setPolicyWriter({ args: { writer: other.appId } })
      await expect(installPolicyWriterGrant(ctx, { log })).rejects.toThrow(`takes policies from ${other.appId}, not MetaPlugin ${writer.appId}`)
    })

    test('only what needs an execution key counts as the writer grant', () => {
      const good = { useExecutionKey: true, admin: false, canReclaim: false, coverFees: false }
      expect(policyWriterGrantProblem(good)).toBeUndefined()
      expect(policyWriterGrantProblem(undefined)).toBe('is not installed')
      expect(policyWriterGrantProblem({ ...good, useExecutionKey: false })).toBe('does not need an execution key')
      expect(policyWriterGrantProblem({ ...good, admin: true })).toBe('is an admin grant')
      expect(policyWriterGrantProblem({ ...good, canReclaim: true })).toBe('can reclaim')
      expect(policyWriterGrantProblem({ ...good, coverFees: true })).toBe('covers fees')
    })
  })

  describe('with a registered writer', () => {
    beforeAll(async () => {
      // A fresh Meta whose writer is the recorded MetaPlugin, as rollout H1 leaves it.
      const { algorand } = boot.fixture
      const metaFactory = algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: boot.sender, defaultSigner: boot.signer })
      const { appClient } = await metaFactory.send.create.create({ args: { version: 'test-2', akitaDao: boot.dao.appId } })
      await appClient.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
      meta = appClient.appId
      writer = await newMetaPlugin({ algorand, sender: boot.sender, signer: boot.signer, registry: meta })
      await appClient.send.setPolicyWriter({ args: { writer: writer.appId } })
      ctx.appIds = { ...ctx.appIds, meta, metaPlugin: writer.appId }
    })

    test('the grant is installed once, by the creator, at the upgrade thresholds', async () => {
      await expect(installPolicyWriterGrant({ ...ctx, sender: stranger() }, { log })).rejects.toThrow('Only the DAO creator')
      expect(await installPolicyWriterGrant(ctx, { log, plan: true })).toMatchObject({ meta, writer: writer.appId, installed: true })
      expect(await writerGrant()).toBeUndefined()
      expect((await row()).status).not.toBe('done')

      const result = await installPolicyWriterGrant(ctx, { log })
      expect(result.installed).toBe(true)
      expect(result.proposalId).toBeGreaterThan(0n)
      expect(await writerGrant()).toMatchObject({ useExecutionKey: true, admin: false, canReclaim: false, coverFees: false })
      const upgrade = (await ctx.dao.client.state.global.upgradeAppProposalSettings())!
      expect(await ctx.dao.client.state.box.plugins.value({ plugin: writer.appId, escrow: '' })).toEqual(upgrade)
      expect(await row()).toMatchObject({ status: 'done' })

      expect(await installPolicyWriterGrant(ctx, { log })).toMatchObject({ installed: false })
    })

    test('a policy needs its grant, and is written by one proposal, once', async () => {
      const wallet = await ctx.dao.getWallet()
      await expect(writeDaoGrantPolicy(ctx, { ...target(), body: scope('labs'), log })).rejects.toThrow('install the grant first')

      const mbr = await wallet.getMbr({ escrow, methodCount: 1n, plugin: '', groups: 0n })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.newEscrowMintCost + mbr.plugins + 2_000_000n) })
      await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING }])
      await proposeAndExecute(ctx.algorand, ctx.dao, [{
        type: ProposalActionEnum.AddPlugin, client: writer, callerType: CallerType.Global, escrow, sourceLink: 'test', useExecutionKey: false,
        methods: [{ name: writer.set(), cooldown: 0n }],
      }])
      expect(await readDaoGrantPolicy(ctx, target())).toMatchObject({ exists: false, current: false })

      expect(await writeDaoGrantPolicy(ctx, { ...target(), body: scope('labs'), log, plan: true })).toMatchObject({ written: true, revision: 0n })
      expect((await readDaoGrantPolicy(ctx, target())).exists).toBe(false)
      await expect(writeDaoGrantPolicy({ ...ctx, sender: stranger() }, { ...target(), body: scope('labs'), log })).rejects.toThrow('Only the DAO creator')

      const keysBefore = (await ctx.dao.getBootstrapKeys()).length
      const first = await writeDaoGrantPolicy(ctx, { ...target(), body: scope('labs'), log })
      expect(first.written).toBe(true)
      expect(first.revision).toBeGreaterThan(0n)
      const stored = await readDaoGrantPolicy(ctx, target())
      expect(stored).toMatchObject({ exists: true, current: true, revision: first.revision })
      expect(Buffer.from(stored.body).equals(Buffer.from(scope('labs')))).toBe(true)
      expect((await writer.getScope({ wallet: wallet.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })).scope).toMatchObject({ type: 'namespace', namespace: 'labs' })
      // The key the proposal registered is used up and no longer tracked, so it cannot hold up initialize().
      expect((await ctx.dao.getBootstrapKeys()).length).toBe(keysBefore)

      expect(await writeDaoGrantPolicy(ctx, { ...target(), body: scope('labs'), log })).toMatchObject({ written: false, revision: first.revision })
      const second = await writeDaoGrantPolicy(ctx, { ...target(), body: scope('other'), log })
      expect(second.revision).toBeGreaterThan(first.revision)
      expect((await writer.getScope({ wallet: wallet.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })).scope).toMatchObject({ type: 'namespace', namespace: 'other' })
    })
  })
})
