/**
 * P2-UPD-01 (docs/principal-resolution/PHASE-0-SPEC.md §7.1 Phase 2a, §7.5): LocalNet rehearsal of the
 * upgrade path, starting from the DEPLOYED DAO, the DEPLOYED Update plugin and the DEPLOYED AkitaSocial
 * bytecode (fixtures/mainnet-deployed.json, read from MainNet; byte-identical to the HEAD artifacts).
 *
 *   0. Baseline: the DAO runs the deployed DAO program (no isUpgradeLease, no ChangeAdmin), the deployed
 *      Update plugin is pal.update and holds the DAO wallet's Update grant.
 *   1. The deployed plugin re-pushes the deployed AkitaSocial, but pushes neither this tree's AkitaSocial
 *      nor this tree's DAO (> 8,192 B).
 *   2. Phase 3 refuses while AkitaSocial still runs the deployed program.
 *   3. Phase 2a (`runPhase2a`) on the deployed DAO: ONE proposal repoints pal.update and swaps the grant.
 *   4. Phase 2 (`runPhase2`) on the deployed DAO: the new plugin pushes this tree's AkitaSocial with page
 *      growth; the DAO wallet becomes the size sponsor.
 *   5. The DAO's own upgrade (`--target AkitaDAO`) through the new plugin, bound by the deployed DAO's
 *      mustGetExecution + getProposal: no admin route, no isUpgradeLease needed. The DAO starts in its
 *      MainNet layout (3 extra pages, 5 uints / 59 byte slices, creator as size sponsor) and grows pages.
 *      Later DAO upgrades that need no growth send no pages or schema and keep both.
 *   6. Then Phase 2 target upgrades on the upgraded DAO: RaffleFactory + Raffle in ONE group, the split
 *      path, and a window that opens later (resume by proposal id).
 *   7. The old plugin keeps no grant; the upgraded DAO refuses ExecutePlugin on the new one (DAO-03).
 *
 * The rollout code under test is `scripts/lib/principal-rollout-run.ts` and
 * `scripts/lib/dao-wallet-plugin-migration.ts`, the same code the Phase 2a/2/3 scripts run.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { getNetworkAppIds, sendPrepared, type SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, UpdateAkitaDAOPluginSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao'
import type { ScriptContext } from '../../../../scripts/script-base'
import { proposeAndExecute } from '../../../../scripts/utils'
import { deployImmutable } from '../../../../scripts/lib/immutable-deployment'
import { runMigration } from '../../../../scripts/lib/dao-wallet-plugin-migration'
import {
  executeTargetPlan,
  isCurrentUpdatePlugin,
  isPhase2aUpdatePlugin,
  planTarget,
  readDaoBindingMode,
  readFactoryChild,
  readLiveApp,
  runPhase2,
  runPhase2a,
  runPhase3,
} from '../../../../scripts/lib/principal-rollout-run'
import {
  loadCompiled,
  missingDaoBindingMethods,
  PHASE2_DAO_TARGET,
  PHASE2_TARGETS,
  PHASE3_PLUGINS,
  PROGRAM_PAGE_SIZE,
  planAppUpdate,
  planGroups,
  programHasSelector,
  sponsoredMbr,
  UPGRADE_LEASE_SIGNATURE,
} from '../../../../scripts/lib/principal-rollout'
import { TimeWarp } from '../../../../tests/utils/time'
import deployed from './fixtures/mainnet-deployed.json'

algokit.Config.configure({ populateAppCallResources: true })

type FixtureApp = { approval: string; clear: string; extraProgramPages: number; globalInts: number; globalBytes: number; createSignature: string }
const apps = deployed.apps as unknown as Record<'updatePlugin' | 'social' | 'dao', FixtureApp>
const bytes = (b64: string) => new Uint8Array(Buffer.from(b64, 'base64'))
const key32 = (seed: number) => new Uint8Array(32).fill(seed)
const socialTarget = PHASE2_TARGETS.find((t) => t.name === 'AkitaSocial')!
const raffleTarget = PHASE2_TARGETS.find((t) => t.name === 'RaffleFactory')!

const fixture = algorandFixture()

describe('P2-UPD-01: Phase 2a rehearsal from the deployed Update plugin and AkitaSocial bytecode', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let dispenser: TransactionSignerAccount
  let universe: AkitaUniverse
  let ctx: ScriptContext
  let sender: string
  let headPluginId: bigint
  let headSocialId: bigint
  let newPluginId: bigint
  const receipts = fs.mkdtempSync(path.join(os.tmpdir(), 'p2-upd-01-'))

  /** Create an app from raw deployed bytecode, with the deployed pages and schema. */
  const createDeployed = async (app: FixtureApp, args: algosdk.ABIValue[]) => {
    const result = await algorand.send.appCreateMethodCall({
      sender,
      approvalProgram: bytes(app.approval),
      clearStateProgram: bytes(app.clear),
      schema: { globalInts: app.globalInts, globalByteSlices: app.globalBytes, localInts: 0, localByteSlices: 0 },
      extraProgramPages: app.extraProgramPages,
      method: algosdk.ABIMethod.fromSignature(app.createSignature),
      args,
    })
    return result.appId
  }

  /** One UpgradeApp proposal + execution through `plugin` (the flow the deployed tooling uses). */
  const upgradeThrough = async (plugin: UpdateAkitaDAOPluginSDK, appId: bigint, data: Uint8Array, version: string, lease: string) => {
    const daoWallet = await universe.dao.getWallet()
    await algorand.account.ensureFunded(plugin.client.appAddress, dispenser.addr, microAlgo(2_500n + 400n * BigInt(2 + data.length)))
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000) })
    await universe.dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    const execution = await daoWallet.build.usePlugin({
      sender, signer: deployer.signer, lease, windowSize: 2000n, callerType: CallerType.Global,
      calls: [plugin.updateApp({ sender, signer: deployer.signer, appId, version, data })],
    })
    const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(costs.plugins + costs.executions + 2_000_000n) })
    const actions: ProposalAction<SDKClient>[] = [{
      type: ProposalActionEnum.UpgradeApp, app: appId, executionKey: execution.lease, groups: execution.ids,
      firstValid: execution.firstValid, lastValid: execution.lastValid,
    }]
    await proposeAndExecute(algorand, universe.dao, actions)
    const sent = []
    for (const window of execution.windows) sent.push(await sendPrepared(window, algorand.client.algod))
    return sent
  }

  /** The UpdateApplication inner txns a send issued to `appId`. */
  const innerUpdates = (sent: Awaited<ReturnType<typeof sendPrepared>>[], appId: bigint) => {
    const found: algosdk.Transaction[] = []
    const walk = (responses: algosdk.modelsv2.PendingTransactionResponse[] = []) => {
      for (const r of responses) {
        const call = r.txn.txn.applicationCall
        if (call && call.appIndex === appId && call.onComplete === algosdk.OnApplicationComplete.UpdateApplicationOC) found.push(r.txn.txn)
        walk(r.innerTxns)
      }
    }
    for (const s of sent) walk(s.confirmations)
    return found
  }

  /** Keys each upgrade itself writes: the version, and the counters its (bootstrap) proposal advances. */
  const upgradeWrites = ['version', 'proposal_id', 'bootstrap_key_count']
  /** Every other global key with its value. */
  const globalsBesidesVersion = async (appId: bigint) =>
    Object.fromEntries(Object.entries(await algorand.app.getGlobalState(appId)).filter(([key]) => !upgradeWrites.includes(key)))

  const localSchema = async (appId: bigint) => {
    const { params } = await algorand.client.algod.getApplicationByID(appId).do()
    return [Number(params?.localStateSchema?.numUint ?? 0), Number(params?.localStateSchema?.numByteSlice ?? 0)]
  }

  const schemaTotals = async (address: string) => {
    const info = await algorand.client.algod.accountInformation(address).do()
    return {
      pages: Number(info.appsTotalExtraPages ?? 0),
      uints: Number(info.appsTotalSchema?.numUint ?? 0),
      bytes: Number(info.appsTotalSchema?.numByteSlice ?? 0),
    }
  }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    sender = deployer.addr.toString()
    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    universe.dao.setSendParams({ sender, signer: deployer.signer })
    await universe.dao.getWallet()

    const appIds = { ...getNetworkAppIds('localnet'), dao: universe.dao.appId, updatePlugin: universe.updatePlugin.appId }
    for (const target of PHASE2_TARGETS) appIds[target.appIdKey] = 0n
    ctx = {
      options: { network: 'localnet', version: 'p2-upd-01' },
      algorand,
      sender,
      signer: deployer.signer,
      appIds,
      dao: universe.dao,
      updatePlugin: universe.updatePlugin,
    } as ScriptContext
    algorand.setSigner(sender, deployer.signer)

    // MainNet state: the DAO runs the deployed DAO program in the deployed layout (3 extra pages, 5 uints /
    // 59 byte slices) with its creator as size sponsor. The universe's (tree) Update plugin installs a
    // program that accepts any update; the creator then installs the deployed program with that layout (an
    // update that sets pages and schema, sent by the creator, makes the creator the sponsor again). Neither
    // step touches global state, and the state layout is the same in both DAO versions.
    const open = loadCompiled('mocks/schema-upgrade/MockSchemaSmallTarget.arc56.json')
    await upgradeThrough(universe.updatePlugin, universe.dao.appId, open.approval, 'head-dao', `p2upd_dao_${Date.now() % 1_000_000}`)
    const suggestedParams = await algorand.client.algod.getTransactionParams().do()
    const layout = algosdk.makeApplicationUpdateTxnFromObject({
      sender,
      appIndex: universe.dao.appId,
      suggestedParams: { ...suggestedParams, flatFee: true, fee: 10_000n },
      approvalProgram: bytes(apps.dao.approval),
      clearProgram: bytes(apps.dao.clear),
      extraPages: apps.dao.extraProgramPages,
      numGlobalInts: apps.dao.globalInts,
      numGlobalByteSlices: apps.dao.globalBytes,
      appArgs: [algosdk.ABIMethod.fromSignature('update(string)void').getSelector(), new algosdk.ABIStringType().encode('head-dao')],
    })
    await algorand.newGroup().addTransaction(layout, deployer.signer).send()
    const mainnetDao = await readLiveApp(ctx, universe.dao.appId)
    expect(Buffer.from(mainnetDao.approval)).toEqual(Buffer.from(bytes(apps.dao.approval)))
    expect([mainnetDao.extraProgramPages, mainnetDao.globalInts, mainnetDao.globalBytes]).toEqual([3, 5, 59])

    // MainNet state: the deployed Update plugin is pal.update and holds the Update grant.
    headPluginId = await createDeployed(apps.updatePlugin, ['1.0.0', universe.dao.appId, new Uint8Array([0x0b])])
    await algorand.account.ensureFunded(algosdk.getApplicationAddress(headPluginId), dispenser.addr, microAlgo(200_000))
    const baseline = await runMigration(ctx, {
      effectiveSender: sender,
      replacements: [{ key: 'updatePlugin', from: universe.updatePlugin.appId, to: headPluginId }],
      filters: [universe.updatePlugin.appId.toString()],
      confirm: true,
      log: () => {},
    })
    expect(baseline.executed).toBe(true)
    expect((await universe.dao.client.state.global.pluginAppList())?.update).toBe(headPluginId)

    // The deployed AkitaSocial: deployed bytes, 3 extra pages, 8 uints / 56 byte slices, creator = deployer.
    headSocialId = await createDeployed(apps.social, ['0.0.2', universe.dao.appId, ['rev_social', 0n]])
    ctx.appIds.social = headSocialId
  })

  test('baseline: the DAO runs the deployed program, which has the proposal-read methods but no isUpgradeLease or ChangeAdmin', async () => {
    const dao = (await readLiveApp(ctx, universe.dao.appId)).approval
    expect(missingDaoBindingMethods(dao)).toEqual([])
    expect(programHasSelector(dao, UPGRADE_LEASE_SIGNATURE)).toBe(false)
    expect(programHasSelector(dao, 'arc58_changeAdmin(address)void')).toBe(false)
    expect((await universe.dao.client.state.global.pluginAppList())?.update).toBe(headPluginId)
  })

  test('the deployed Update plugin re-pushes the deployed AkitaSocial (≤ 8,192 B)', async () => {
    const head = new UpdateAkitaDAOPluginSDK({ algorand, factoryParams: { appId: headPluginId, defaultSender: sender, defaultSigner: deployer.signer } })
    await upgradeThrough(head, headSocialId, bytes(apps.social.approval), 'head-control', `p2upd_ctl_${Date.now() % 1_000_000}`)
    const after = await algorand.app.getGlobalState(headSocialId)
    expect(after.version?.value).toBe('head-control')
    expect(Buffer.from((await readLiveApp(ctx, headSocialId)).approval)).toEqual(Buffer.from(bytes(apps.social.approval)))
  })

  test('the deployed Update plugin cannot push this tree\'s AkitaSocial (> 8,192 B)', async () => {
    const next = loadCompiled(socialTarget.artifact)
    expect(next.approval.length).toBeGreaterThan(8_192)
    expect(planAppUpdate(await readLiveApp(ctx, headSocialId), next).legacyPluginCanPush).toBe(false)
    const head = new UpdateAkitaDAOPluginSDK({ algorand, factoryParams: { appId: headPluginId, defaultSender: sender, defaultSigner: deployer.signer } })
    await expect(upgradeThrough(head, headSocialId, next.approval, 'head-big', `p2upd_big_${Date.now() % 1_000_000}`)).rejects.toThrow()
    const live = await readLiveApp(ctx, headSocialId)
    expect(Buffer.from(live.approval)).toEqual(Buffer.from(bytes(apps.social.approval)))
    expect(live.extraProgramPages).toBe(3)
  })

  test('the deployed Update plugin cannot push this tree\'s DAO (> 8,192 B)', async () => {
    const next = loadCompiled(PHASE2_DAO_TARGET.artifact)
    expect(next.approval.length).toBeGreaterThan(8_192)
    const head = new UpdateAkitaDAOPluginSDK({ algorand, factoryParams: { appId: headPluginId, defaultSender: sender, defaultSigner: deployer.signer } })
    await expect(upgradeThrough(head, universe.dao.appId, next.approval, 'head-dao-big', `p2upd_daobig_${Date.now() % 1_000_000}`)).rejects.toThrow()
    expect(Buffer.from((await readLiveApp(ctx, universe.dao.appId)).approval)).toEqual(Buffer.from(bytes(apps.dao.approval)))
  })

  test('Phase 3 refuses while AkitaSocial still runs the deployed program (Phase 2 not landed)', async () => {
    const social = PHASE3_PLUGINS.filter((p) => p.catalog === 'AkitaSocialPlugin')
    ctx.appIds.socialGraph = (await universe.dao.client.state.global.akitaSocialAppList())!.graph
    const created = async () => Number((await algorand.client.algod.accountInformation(sender).do()).totalCreatedApps)
    const before = await created()
    await expect(runPhase3(ctx, { plugins: social, swap: true, confirm: true, log: () => {} })).rejects.toThrow(/AkitaSocialPlugin -> AkitaSocial \d+: missing .*setMetaWallet/)
    expect(await created()).toBe(before)
    // The explicit override passes the guard (then stops at --confirm here, so nothing is deployed).
    await expect(runPhase3(ctx, { plugins: social, swap: true, confirm: false, allowUnupgradedTargets: true, log: () => {} })).rejects.toThrow('--confirm')
    ctx.appIds.socialGraph = 0n
  })

  test('Phase 2a: one proposal repoints pal.update and swaps the grant to the catalog-deployed plugin', async () => {
    newPluginId = (await deployImmutable(ctx, 'UpdateAkitaDAOPlugin', {}, path.join(receipts, 'update-plugin.json'), false))!
    expect(await isCurrentUpdatePlugin(ctx, newPluginId)).toBe(true)
    expect(await isPhase2aUpdatePlugin(ctx, newPluginId)).toBe(true)
    expect(await isPhase2aUpdatePlugin(ctx, headPluginId)).toBe(false)
    const walletAddress = universe.dao.wallet.client.appAddress.toString()

    const result = await runPhase2a(ctx, { newPluginId, confirm: true, fundSponsor: true, sponsorTargets: [socialTarget], log: () => {} })
    expect(result.oldPluginId).toBe(headPluginId)
    // The deployed DAO: no isUpgradeLease, so the plugin reads the proposal. Phase 2a proceeds (no deadlock).
    expect(result.daoBindingMode).toBe('proposal')
    expect(result.daoSupportsUpgradeLease).toBe(false)
    expect(result.migration?.executed).toBe(true)
    expect(result.migration?.proposalIds).toHaveLength(1)
    const [migration] = result.migration!.migrations
    expect(migration.repointsUpdate).toBe(true)
    expect(migration.actions.map((a) => a.type)).toEqual([ProposalActionEnum.UpdateFields, ProposalActionEnum.AddPlugin, ProposalActionEnum.RemovePlugin])

    expect((await universe.dao.client.state.global.pluginAppList())?.update).toBe(newPluginId)
    const plugins = await universe.dao.wallet.client.state.box.plugins.getMap()
    const grants = Array.from(plugins.keys()).filter((k) => k.plugin === newPluginId || k.plugin === headPluginId)
    expect(grants.map((k) => k.plugin)).toEqual([newPluginId])
    const grant = plugins.get(grants[0])!
    expect(grant.useExecutionKey).toBe(true)
    expect(grants[0].caller).toBe(algosdk.ALGORAND_ZERO_ADDRESS_STRING)

    // The DAO wallet now holds the sponsorship the AkitaSocial upgrade will move onto it.
    const sponsor = result.sponsorship.lines.find((l) => l.appId === headSocialId)!.plan.sponsoredMbrAfter
    const info = await algorand.account.getInformation(walletAddress)
    expect(info.balance.microAlgos - info.minBalance.microAlgos).toBeGreaterThanOrEqual(sponsor)
  })

  test('Phase 2 on the DEPLOYED DAO: the new plugin pushes this tree\'s AkitaSocial with page growth; the DAO wallet becomes the size sponsor', async () => {
    ctx.updatePlugin = new UpdateAkitaDAOPluginSDK({ algorand, factoryParams: { appId: newPluginId, defaultSender: sender, defaultSigner: deployer.signer } })
    ctx.appIds.updatePlugin = newPluginId
    const walletAddress = universe.dao.wallet.client.appAddress.toString()
    const next = loadCompiled(socialTarget.artifact)
    const plan = planAppUpdate(await readLiveApp(ctx, headSocialId), next)
    expect(plan.sizeChange).toBe(true)
    const [walletBefore, creatorBefore] = await Promise.all([schemaTotals(walletAddress), schemaTotals(sender)])

    const [result] = await runPhase2(ctx, { targets: [socialTarget], confirm: true, log: () => {} })
    expect(result.status).toBe('upgraded')

    const live = await readLiveApp(ctx, headSocialId)
    expect(Buffer.from(live.approval)).toEqual(Buffer.from(next.approval))
    expect(Buffer.from(live.clear)).toEqual(Buffer.from(next.clear))
    expect(live.extraProgramPages).toBe(plan.extraPagesAfter)
    expect(live.extraProgramPages).toBeGreaterThan(3)
    expect([live.globalInts, live.globalBytes]).toEqual([plan.globalIntsAfter, plan.globalBytesAfter])
    const state = await algorand.app.getGlobalState(headSocialId)
    expect(state.version?.value).toBe('p2-upd-01')
    expect(BigInt(state.akita_dao?.value ?? 0)).toBe(universe.dao.appId)

    // Size sponsorship moved: the DAO wallet carries the new pages + schema, the creator is released.
    const [walletAfter, creatorAfter] = await Promise.all([schemaTotals(walletAddress), schemaTotals(sender)])
    expect(walletAfter.pages - walletBefore.pages).toBe(plan.extraPagesAfter)
    expect(walletAfter.uints - walletBefore.uints).toBe(plan.globalIntsAfter)
    expect(walletAfter.bytes - walletBefore.bytes).toBe(plan.globalBytesAfter)
    expect(creatorBefore.pages - creatorAfter.pages).toBe(3)
    expect(creatorBefore.uints - creatorAfter.uints).toBe(8)
    expect(creatorBefore.bytes - creatorAfter.bytes).toBe(56)
  })

  test('the DAO upgrades itself through the Phase 2a plugin (UpgradeApp bound by the deployed DAO\'s proposal read)', async () => {
    ctx.options.version = 'p2-dao'
    const daoId = universe.dao.appId
    const walletAddress = universe.dao.wallet.client.appAddress.toString()
    const next = loadCompiled(PHASE2_DAO_TARGET.artifact)
    const before = await readLiveApp(ctx, daoId)
    const globalsBefore = await globalsBesidesVersion(daoId)
    const localBefore = await localSchema(daoId)
    const [walletBefore, creatorBefore] = await Promise.all([schemaTotals(walletAddress), schemaTotals(sender)])
    // The MainNet layout: 3 extra pages, 5 uints / 59 byte slices, sponsored by the creator.
    expect([before.extraProgramPages, before.globalInts, before.globalBytes]).toEqual([apps.dao.extraProgramPages, apps.dao.globalInts, apps.dao.globalBytes])
    for (const key of ['aal', 'sal', 'pal', 'oal', 'wallet', 'initialized']) expect(globalsBefore[key], key).toBeDefined()

    const plan = planAppUpdate(before, next)
    const neededPages = Math.ceil((next.approval.length + next.clear.length) / PROGRAM_PAGE_SIZE) - 1
    expect(neededPages).toBeGreaterThan(before.extraProgramPages)
    expect(plan).toMatchObject({ growTo: neededPages, extraPagesAfter: neededPages, sizeChange: true })

    const [result] = await runPhase2(ctx, { targets: [PHASE2_DAO_TARGET], confirm: true, log: () => {} })
    expect(result.status).toBe('upgraded')
    const live = await readLiveApp(ctx, daoId)
    expect(Buffer.from(live.approval)).toEqual(Buffer.from(next.approval))
    expect(Buffer.from(live.clear)).toEqual(Buffer.from(next.clear))
    expect(programHasSelector(live.approval, UPGRADE_LEASE_SIGNATURE)).toBe(true)
    expect((await algorand.app.getGlobalState(daoId)).version?.value).toBe('p2-dao')

    // Pages grow to exactly what the program needs. The schema never shrinks and holds what the new DAO declares.
    expect(live.extraProgramPages).toBe(neededPages)
    expect(live.globalInts).toBeGreaterThanOrEqual(Math.max(before.globalInts, next.globalInts))
    expect(live.globalBytes).toBeGreaterThanOrEqual(Math.max(before.globalBytes, next.globalBytes))
    expect(await localSchema(daoId)).toEqual(localBefore)
    expect(localBefore).toEqual([0, 0])
    // Every global key keeps its value: the registry pointers, the wallet and the init flag included.
    expect(await globalsBesidesVersion(daoId)).toEqual(globalsBefore)
    expect((await universe.dao.client.state.global.pluginAppList())?.update).toBe(newPluginId)

    // The DAO wallet sent the update, so it now sponsors the DAO's pages and schema; the creator is released.
    const [walletAfter, creatorAfter] = await Promise.all([schemaTotals(walletAddress), schemaTotals(sender)])
    expect(walletAfter.pages - walletBefore.pages).toBe(neededPages)
    expect([walletAfter.uints - walletBefore.uints, walletAfter.bytes - walletBefore.bytes]).toEqual([live.globalInts, live.globalBytes])
    expect(creatorBefore.pages - creatorAfter.pages).toBe(before.extraProgramPages)
    expect([creatorBefore.uints - creatorAfter.uints, creatorBefore.bytes - creatorAfter.bytes]).toEqual([before.globalInts, before.globalBytes])
    expect(plan.sponsoredMbrAfter).toBe(sponsoredMbr(live.extraProgramPages, live.globalInts, live.globalBytes))
    expect(plan.sponsoredMbrAfter).toBe(3_592_500n)

    // The proposal of this upgrade carried the plugin's proposal-read note (the deployed DAO had no isUpgradeLease).
    const proposal = await universe.dao.getProposal(result.proposalId!)
    expect(proposal.actions.filter((a) => a.type === ProposalActionEnum.UpgradeApp && a.app === daoId)).toHaveLength(1)
  })

  test('later DAO upgrades that need no growth send no pages or schema, and keep both', async () => {
    const daoId = universe.dao.appId
    const walletAddress = universe.dao.wallet.client.appAddress.toString()
    const grown = await readLiveApp(ctx, daoId)
    const globalsBefore = await globalsBesidesVersion(daoId)
    const walletBefore = await schemaTotals(walletAddress)
    const unchanged = async () => {
      const live = await readLiveApp(ctx, daoId)
      expect([live.extraProgramPages, live.globalInts, live.globalBytes]).toEqual([grown.extraProgramPages, grown.globalInts, grown.globalBytes])
      expect(await globalsBesidesVersion(daoId)).toEqual(globalsBefore)
      expect(await localSchema(daoId)).toEqual([0, 0])
      expect(await schemaTotals(walletAddress)).toEqual(walletBefore)
      return live
    }

    // 1. The Phase 2 runner re-pushes the DAO, bound by the lease index the upgraded DAO now has.
    expect(await readDaoBindingMode(ctx)).toBe('lease')
    ctx.options.version = 'p2-dao-again'
    const base = await planTarget(ctx, PHASE2_DAO_TARGET)
    expect(base.plan.sizeChange).toBe(false)
    const again = await executeTargetPlan(ctx, { ...base, appUpToDate: false, groups: planGroups({ approvalSize: base.next.approval.length, withClear: true }, undefined) }, { log: () => {} })
    expect(again.status).toBe('upgraded')
    await unchanged()

    // 2. A plain updateApp with a smaller program: the inner update carries no pages and no schema.
    const sent = await upgradeThrough(ctx.updatePlugin, daoId, bytes(apps.dao.approval), 'p2-dao-down', `p2upd_down_${Date.now() % 1_000_000}`)
    const [update] = innerUpdates(sent, daoId)
    expect(update.applicationCall).toMatchObject({ extraPages: 0, numGlobalInts: 0, numGlobalByteSlices: 0 })
    expect(Buffer.from((await unchanged()).approval)).toEqual(Buffer.from(bytes(apps.dao.approval)))

    // 3. Back through the runner on a DAO without isUpgradeLease: the proposal-read (K1 note) binding.
    expect(await readDaoBindingMode(ctx)).toBe('proposal')
    ctx.options.version = 'p2-dao-k1'
    const [k1] = await runPhase2(ctx, { targets: [PHASE2_DAO_TARGET], confirm: true, log: () => {} })
    expect(k1.status).toBe('upgraded')
    expect(Buffer.from((await unchanged()).approval)).toEqual(Buffer.from(base.next.approval))
    expect((await algorand.app.getGlobalState(daoId)).version?.value).toBe('p2-dao-k1')
  })

  test('after the swap the old Update plugin has no grant and cannot be driven by an ExecutePlugin key', async () => {
    const plugins = await universe.dao.wallet.client.state.box.plugins.getMap()
    expect(Array.from(plugins.keys()).some((k) => k.plugin === headPluginId)).toBe(false)
    const round = BigInt((await algorand.client.algod.status().do()).lastRound)
    await expect(proposeAndExecute(algorand, universe.dao, [{
      type: ProposalActionEnum.ExecutePlugin, plugin: headPluginId, caller: algosdk.ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
      executionKey: key32(91), groups: [key32(92)], firstValid: 1n, lastValid: round + 100n,
    }])).rejects.toThrow()
    // The new plugin is pal.update, so the DAO refuses ExecutePlugin on it as well (DAO-03).
    await expect(proposeAndExecute(algorand, universe.dao, [{
      type: ProposalActionEnum.ExecutePlugin, plugin: newPluginId, caller: algosdk.ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
      executionKey: key32(93), groups: [key32(94)], firstValid: 1n, lastValid: round + 100n,
    }])).rejects.toThrow(/errIact/)
  })

  test('Phase 2 factory path: the factory upgrade and its child push land in ONE group', async () => {
    // RaffleFactory + Raffle plan to 13 txns (3,751 B factory = 2 upload chunks since K6, + 7,945 B child).
    // StakingPoolFactory + StakingPool plan to exactly 16 today (see the update-plugin section of
    // IMPLEMENTATION-LOG.md); --split-children is the fallback.
    ctx.appIds.raffleFactory = universe.raffleFactory.appId
    ctx.options.version = 'p2-combined'
    const base = await planTarget(ctx, raffleTarget)
    // Force a full re-push of the same bytes so the combined path runs on the universe's factory.
    const groups = planGroups({ approvalSize: base.next.approval.length, withClear: true }, base.child!.approval.length)
    expect(groups.atomic).toBe(true)
    expect(groups.groups.map((g) => g.txns)).toEqual([13])
    const result = await executeTargetPlan(ctx, { ...base, appUpToDate: false, childUpToDate: false, groups }, { log: () => {} })
    expect(result.status).toBe('upgraded')

    const proposal = await universe.dao.getProposal(result.proposalId!)
    const upgrades = proposal.actions.filter((a) => a.type === ProposalActionEnum.UpgradeApp)
    expect(upgrades).toHaveLength(1)
    const state = await algorand.app.getGlobalState(universe.raffleFactory.appId)
    expect(state.version?.value).toBe('p2-combined')
    expect(state.child_contract_version?.value).toBe('p2-combined')
    expect(Buffer.from((await readFactoryChild(ctx, universe.raffleFactory.appId))!)).toEqual(Buffer.from(base.child!.approval))
  })

  test('Phase 2 factory path, split: the factory group goes first, then the child group, in one proposal', async () => {
    ctx.options.version = 'p2-split'
    const base = await planTarget(ctx, raffleTarget)
    const groups = planGroups({ approvalSize: base.next.approval.length, withClear: true }, base.child!.approval.length, true)
    expect(groups.groups.map((g) => [g.app, g.child])).toEqual([[true, false], [false, true]])
    const result = await executeTargetPlan(ctx, { ...base, appUpToDate: false, childUpToDate: false, groups }, { log: () => {} })
    expect(result.status).toBe('upgraded')
    const proposal = await universe.dao.getProposal(result.proposalId!)
    expect(proposal.actions.filter((a) => a.type === ProposalActionEnum.UpgradeApp)).toHaveLength(2)
    const state = await algorand.app.getGlobalState(universe.raffleFactory.appId)
    expect([state.version?.value, state.child_contract_version?.value]).toEqual(['p2-split', 'p2-split'])
  })

  test('Phase 2 window that opens later: the proposal is executed, the target is scheduled, and the resume sends it', async () => {
    ctx.options.version = 'p2-later'
    const base = await planTarget(ctx, raffleTarget)
    const p = { ...base, appUpToDate: false, childUpToDate: false, groups: planGroups({ approvalSize: base.next.approval.length, withClear: true }, base.child!.approval.length) }
    const round = BigInt((await algorand.client.algod.status().do()).lastRound)
    const first = await executeTargetPlan(ctx, p, { firstValid: round + 40n, windowRounds: 1_000, log: () => {} })
    expect(first.status).toBe('scheduled')
    expect(first.window?.firstValid).toBe(round + 40n)
    expect((await algorand.app.getGlobalState(universe.raffleFactory.appId)).version?.value).not.toBe('p2-later')

    await new TimeWarp(algorand).warpForwardRounds(45n)
    const resumed = await executeTargetPlan(ctx, p, { proposalId: first.proposalId, log: () => {} })
    expect(resumed).toMatchObject({ status: 'upgraded', proposalId: first.proposalId })
    const state = await algorand.app.getGlobalState(universe.raffleFactory.appId)
    expect([state.version?.value, state.child_contract_version?.value]).toEqual(['p2-later', 'p2-later'])
  })
})
