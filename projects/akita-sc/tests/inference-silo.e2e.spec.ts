/**
 * `scripts/deploy-inference-silo.ts` (scripts/lib/inference-silo.ts) on LocalNet: the DAO wallet mints
 * the inference PaySilo through a narrow PaySiloFactoryPlugin execution-key grant.
 */
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getNetworkAppIds } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, type PaySiloFactoryPluginSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { bootstrapDaoTestContext, type DaoTestContext } from '../smart_contracts/arc58/dao/tests/utils'
import { deployPaySiloFactoryPlugin } from './fixtures/plugins/pay-silo-factory'
import { type ScriptContext } from '../scripts/script-base'
import { proposeAndExecute } from '../scripts/utils'
import {
  manifestApprovalSha256,
  PAY_SILO_MANIFEST_KEY,
  planInferenceSilo,
  readSiloRecipient,
  runInferenceSilo,
} from '../scripts/lib/inference-silo'

describe('deploy-inference-silo through the DAO wallet', () => {
  let boot: DaoTestContext
  let ctx: ScriptContext
  let factory: PaySiloFactoryPluginSDK
  const log = () => {}
  const newAddress = () => algosdk.generateAccount().addr.toString()

  const grant = async () => {
    const grants = await (await ctx.dao.getWallet()).client.state.box.plugins.getMap()
    return [...grants].find(([key]) => key.plugin === factory.appId && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === '')?.[1]
  }
  const daoSettings = () => ctx.dao.client.state.box.plugins.value({ plugin: factory.appId, escrow: '' }).catch(() => undefined)
  const bootstrapKeyCount = async () => (await ctx.dao.client.state.global.bootstrapKeyCount()) ?? 0n

  beforeAll(async () => {
    boot = await bootstrapDaoTestContext({ useFullSetup: true, fundAmount: 500 })
    factory = await deployPaySiloFactoryPlugin({ fixture: boot.fixture, sender: boot.sender, signer: boot.signer })
    ctx = { options: { network: 'localnet', version: 'silo-test' }, algorand: boot.fixture.algorand,
      sender: boot.sender, signer: boot.signer, dao: boot.dao, updatePlugin: boot.daoUpdatePluginSdk!,
      appIds: { ...getNetworkAppIds('localnet'), dao: boot.dao.appId, updatePlugin: boot.daoUpdatePluginSdk!.appId,
        paySiloFactoryPlugin: factory.appId } }
    ctx.algorand.setSigner(ctx.sender, ctx.signer)
    expect(await grant()).toBeUndefined()
  })

  test('refuses a factory that runs another program, a non-creator sender, a zero recipient and no manifest', async () => {
    const recipient = newAddress()
    await expect(planInferenceSilo(ctx, { recipient, factoryPluginId: boot.walletFactory!.appId }))
      .rejects.toThrow("not the release manifest's")
    await expect(planInferenceSilo(ctx, { recipient, factoryPluginId: factory.appId, effectiveSender: newAddress() }))
      .rejects.toThrow('Only the DAO creator')
    await expect(planInferenceSilo(ctx, { recipient: ALGORAND_ZERO_ADDRESS_STRING, factoryPluginId: factory.appId }))
      .rejects.toThrow('non-zero')
    await expect(planInferenceSilo(ctx, { recipient, factoryPluginId: factory.appId, manifestPath: join(tmpdir(), 'no-such-manifest.json') }))
      .rejects.toThrow('No release manifest')
    const empty = join(tmpdir(), `manifest-${Date.now()}.json`)
    writeFileSync(empty, JSON.stringify({ programs: {} }))
    await expect(planInferenceSilo(ctx, { recipient, factoryPluginId: factory.appId, manifestPath: empty }))
      .rejects.toThrow('has no')
  })

  test('mints a silo from the DAO wallet that runs the release PaySilo and pays the recipient, then removes the grant', async () => {
    const recipient = (await boot.fixture.context.generateAccount({ initialFunds: (1).algos() })).addr.toString()
    const keysBefore = await bootstrapKeyCount()
    const plan = await planInferenceSilo(ctx, { recipient, factoryPluginId: factory.appId })
    expect(plan).toMatchObject({ addGrant: true, removeGrant: true, grant: 'absent' })

    const result = await runInferenceSilo(ctx, { recipient, factoryPluginId: factory.appId, log })
    expect(result.proposalIds).toHaveLength(3)

    const silo = await ctx.algorand.client.algod.getApplicationByID(result.siloAppId).do()
    const walletControlled = await (await ctx.dao.getWallet()).client.state.global.controlledAddress()
    expect(silo.params!.creator.toString()).toBe(walletControlled)
    expect(await readSiloRecipient(ctx, result.siloAppId)).toBe(recipient)
    expect(result.siloApprovalSha256).toBe(manifestApprovalSha256(PAY_SILO_MANIFEST_KEY))

    expect(await grant()).toBeUndefined()
    expect(await daoSettings()).toBeUndefined()
    expect(await bootstrapKeyCount()).toBe(keysBefore)
  })

  test('--keep-grant keeps only the narrow grant; it can not mint without a proposal; a later run reuses it', async () => {
    const first = newAddress()
    const kept = await runInferenceSilo(ctx, { recipient: first, factoryPluginId: factory.appId, keepGrant: true, log })
    expect(await readSiloRecipient(ctx, kept.siloAppId)).toBe(first)

    const info = await grant()
    expect(info).toBeDefined()
    expect(info!.useExecutionKey).toBe(true)
    expect(info!.admin).toBe(false)
    expect(info!.methods.map(([selector]) => Buffer.from(selector).toString('hex')))
      .toEqual([Buffer.from(factory.mint()().selectors[0]).toString('hex')])
    expect(await daoSettings()).toEqual(await ctx.dao.client.state.global.upgradeAppProposalSettings())

    // Without an execution proposal the grant does not let anyone mint.
    await expect((await ctx.dao.getWallet()).usePlugin({ sender: ctx.sender, signer: ctx.signer, callerType: CallerType.Global,
      calls: [factory.mint({ sender: ctx.sender, signer: ctx.signer, recipient: newAddress() })] })).rejects.toThrow()

    const second = newAddress()
    const result = await runInferenceSilo(ctx, { recipient: second, factoryPluginId: factory.appId, log })
    expect(result).toMatchObject({ grant: 'narrow', addGrant: false })
    expect(result.proposalIds).toHaveLength(2)
    expect(result.siloAppId).not.toBe(kept.siloAppId)
    expect(await readSiloRecipient(ctx, result.siloAppId)).toBe(second)
    expect(await grant()).toBeUndefined()
  })

  test('refuses to reuse or remove a broader factory grant', async () => {
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.AddPlugin, client: factory,
      callerType: CallerType.Global, escrow: '', sourceLink: 'test', useExecutionKey: false }])
    await expect(planInferenceSilo(ctx, { recipient: newAddress(), factoryPluginId: factory.appId }))
      .rejects.toThrow('not the narrow mint execution-key grant')
    await proposeAndExecute(ctx.algorand, ctx.dao, [{ type: ProposalActionEnum.RemovePlugin, plugin: factory.appId,
      caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '' }])
  })
})
