import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginSDKReturn, sendPrepared } from 'akita-sdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, WalletSDK } from 'akita-sdk/wallet'
import { MetaFactory } from '../../../../../akita-sdk/src/meta'
import { MetaPluginSDK, newMetaPlugin } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao'
import { proposeAndExecute } from '../../../../scripts/utils'
import { errNotAkitaDao } from '../../../errors'
import { errExecutionKeyNotFound, errGroupNotFound } from '../../account/errors'
import {
  DEFAULT_CREATION,
  DEFAULT_UPGRADE_APP_APPROVAL,
  DEFAULT_UPGRADE_APP_PARTICIPATION,
  DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
  DEFAULT_UPGRADE_APP_VOTING_DURATION,
} from '../../../utils/defaults'

algokit.Config.configure({ populateAppCallResources: true })

/**
 * The DAO wallet's admin is the DAO app, which cannot open an admin window on a plugin. A DAO writes
 * grant policies instead through a global MetaPlugin grant that needs an execution key: a proposal's
 * ExecutePlugin action registers the exact group, and anyone then submits it. This is the path the
 * rollout uses to configure a global grant on a DAO escrow (the Labs payout on rec_krby, step H6).
 */
describe('MetaPlugin grant policies on the DAO wallet (LocalNet)', () => {
  const fixture = algorandFixture()
  const escrow = 'rec_policy'
  const namespace = 'labs'
  let deployer: TransactionSignerAccount
  let universe: AkitaUniverse
  let daoWallet: WalletSDK
  let writer: MetaPluginSDK
  let metaAppId: bigint
  let leaseCounter = 0

  /** Build `calls` as one group through the DAO wallet's execution-key grant (simulate only). */
  const daoBuild = (calls: PluginSDKReturn[], lease: string) => daoWallet.build.usePlugin({
    sender: deployer.addr,
    signer: deployer.signer,
    lease,
    callerType: CallerType.Global,
    windowSize: 2000n,
    calls,
  })

  /** Register a built group by an ExecutePlugin proposal. */
  const daoRegister = (plugin: bigint, build: Awaited<ReturnType<typeof daoBuild>>) => proposeAndExecute(fixture.algorand, universe.dao, [{
    type: ProposalActionEnum.ExecutePlugin,
    plugin,
    caller: deployer.addr.toString(),
    escrow: '',
    executionKey: build.lease,
    groups: build.ids,
    firstValid: build.firstValid,
    lastValid: build.lastValid,
  }])

  const newLease = () => { leaseCounter += 1; return `meta_dao_${Date.now() % 100_000}_${leaseCounter}` }

  const configure = (namespace: string, expectedRevision: bigint) => writer.configureScope({
    sender: deployer.addr, signer: deployer.signer, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow,
    scope: { type: 'namespace', namespace }, expectedRevision,
  })

  beforeAll(async () => {
    await fixture.newScope()
    const { algorand } = fixture.context
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    daoWallet = universe.dao.wallet

    const metaFactory = algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
    const { appClient: meta } = await metaFactory.send.create.create({ args: { version: 'test', akitaDao: universe.dao.appId } })
    metaAppId = meta.appId
    await meta.appClient.fundAppAccount({ amount: algokit.microAlgos(1_000_000) })
    writer = await newMetaPlugin({ algorand, sender: deployer.addr.toString(), signer: deployer.signer, registry: metaAppId })

    // Rollout H1: while it is unset only the creator may register the writer, although the DAO has a
    // wallet. Once it is set the creator cannot change it.
    const stranger = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) })
    await expect(meta.send.setPolicyWriter({ sender: stranger.addr, signer: stranger.signer, args: { writer: writer.appId } }))
      .rejects.toThrow(new RegExp(errNotAkitaDao))
    await meta.send.setPolicyWriter({ args: { writer: writer.appId } })
    await expect(meta.send.setPolicyWriter({ args: { writer: 1n } })).rejects.toThrow(new RegExp(errNotAkitaDao))

    await algorand.account.ensureFunded(daoWallet.client.appAddress, dispenser.addr, (20).algo())
    const admin = (await daoWallet.client.state.global.admin())!
    await algorand.account.ensureFunded(admin, dispenser.addr, (5).algo())

    await proposeAndExecute(algorand, universe.dao, [{ type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING }])
    // The writer's grant: global, on no escrow, usable only in groups a proposal registered.
    await proposeAndExecute(algorand, universe.dao, [{
      type: ProposalActionEnum.AddPlugin, client: writer, callerType: CallerType.Global, escrow: '', sourceLink: '', useExecutionKey: true,
      fee: DEFAULT_CREATION,
      power: DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
      duration: DEFAULT_UPGRADE_APP_VOTING_DURATION,
      participation: DEFAULT_UPGRADE_APP_PARTICIPATION,
      approval: DEFAULT_UPGRADE_APP_APPROVAL,
    }])
    // The grant the policy configures: a public grant on a DAO escrow, as the Labs payout is.
    await proposeAndExecute(algorand, universe.dao, [{
      type: ProposalActionEnum.AddPlugin, client: writer, callerType: CallerType.Global, escrow, sourceLink: '', useExecutionKey: false,
      methods: [{ name: writer.set(), cooldown: 0n }],
    }])
  })

  test('a proposal writes the policy of a global grant on a DAO escrow, owned by the DAO wallet', async () => {
    const before = await writer.getScope({ wallet: daoWallet.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })
    expect(before.scope).toBeUndefined()

    const build = await daoBuild([configure(namespace, 0n)], newLease())
    await daoRegister(writer.appId, build)
    await sendPrepared(build.windows[0], fixture.algorand.client.algod)

    const info = await daoWallet.getPluginByKey({ plugin: writer.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })
    const after = await writer.getScope({ wallet: daoWallet.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })
    expect(after.revision).toBeGreaterThan(0n)
    expect(after.start).toBe(info.start)
    expect(after.scope).toMatchObject({ type: 'namespace', namespace })
  })

  test('the writer grant runs only in a group a proposal registered', async () => {
    const { revision } = await writer.getScope({ wallet: daoWallet.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })

    // No execution key at all.
    await expect(daoWallet.usePlugin({
      sender: deployer.addr, signer: deployer.signer, callerType: CallerType.Global, calls: [configure('other', revision)],
    })).rejects.toThrow(errExecutionKeyNotFound)

    // A registered key, but a different group under it.
    const lease = newLease()
    const registered = await daoBuild([configure(namespace, revision)], lease)
    const other = await daoBuild([configure('other', revision)], lease)
    await daoRegister(writer.appId, registered)
    await expect(sendPrepared(other.windows[0], fixture.algorand.client.algod)).rejects.toThrow(errGroupNotFound)

    // The registered group still runs, once.
    await sendPrepared(registered.windows[0], fixture.algorand.client.algod)
    const after = await writer.getScope({ wallet: daoWallet.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })
    expect(after.revision).toBeGreaterThan(revision)
  })
})
