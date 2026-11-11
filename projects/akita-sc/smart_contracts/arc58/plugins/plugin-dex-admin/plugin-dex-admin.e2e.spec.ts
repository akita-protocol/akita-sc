/**
 * PluginDexAdminPlugin end to end: an Akita wallet takes the admin role of a Plugin DEX deployment (the
 * Vault, LaunchManager, BackrunArbHook, ConsensusKeyregHook and GatedFeeHook) and uses it, all through
 * `wallet.usePlugin`.
 *
 * Readiness audit 2026-11-09, C10 made the handover two steps: the successor itself must send
 * `acceptAdmin`. A wallet's address is only a sender inside a plugin window, so without this plugin a
 * wallet (the DAO wallet on MainNet) could be proposed but could never accept, and could not use the role.
 * GatedFeeHook has no handover (its admin is always its DAO's wallet), but the same limit applied to it.
 *
 * What the suite pins down:
 *   - the plugin adds no authority: a wallet that is not the admin gets each app's own "not the admin" error
 *   - the wallet accepts all four stored roles in one group, the deployer is out, and every admin action
 *     then works (or reaches the app's own validation) through the plugin
 *   - only the apps pinned at create can be reached (errDaTg); a bad id at create is refused (errDaCr)
 *   - an app posing as a wallet cannot make the plugin send from its own account (errNath)
 *   - the role can be granted method by method to a named caller, and handed on again
 */
import { AlgorandClient, Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { CallerType, newWallet, PluginDexAdminPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import { ABITupleType, ABIType, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { createPool, deployVault, poolConfig } from '../../../../tests/fixtures/plugin-dex'
import { expectContractError } from '../../../../tests/utils/errors'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { PluginDexAdminPluginClient, PluginDexAdminPluginFactory } from '../../../artifacts/arc58/plugins/plugin-dex-admin/PluginDexAdminPluginClient'
import { MockFakeWalletFactory } from '../../../artifacts/mocks/fake-wallet/MockFakeWalletClient'
import { BackrunArbHookClient, BackrunArbHookFactory } from '../../../artifacts/plugin-dex/hooks/BackrunArbHookClient'
import { ConsensusKeyregHookClient, ConsensusKeyregHookFactory } from '../../../artifacts/plugin-dex/hooks/ConsensusKeyregHookClient'
import { GatedFeeHookClient, GatedFeeHookFactory } from '../../../artifacts/plugin-dex/hooks/GatedFeeHookClient'
import { LaunchManagerClient, LaunchManagerFactory } from '../../../artifacts/plugin-dex/launch/LaunchManagerClient'
import { PluginDexClient } from '../../../artifacts/plugin-dex/PluginDexClient'
import { MockMirrorDaoFactory } from '../../../artifacts/plugin-dex/tests/MockMirrorDAOClient'
import { errPluginNotAuthAddr } from '../../../utils/errors'
import { errDaCreate, errDaTarget } from './errors'

const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

// each app's own "the sender is not my admin" code
const NOT_VAULT_ADMIN = 'errPdao'
const NOT_LAUNCH_ADMIN = 'errLmad'
const NOT_BACKRUN_ADMIN = 'errBrao'
const NOT_KEYREG_ADMIN = 'errCkad'
const NOT_GATED_ADMIN = 'errGfad'

type Call = ReturnType<PluginDexAdminPluginSDK['acceptAdminOf']>

describe('PluginDexAdminPlugin', () => {
  const fixture = algorandFixture()
  let algorand: AlgorandClient
  let deployer: TransactionSignerAccount
  let owner: TransactionSignerAccount
  let guardian: TransactionSignerAccount
  let stranger: TransactionSignerAccount
  let successor: TransactionSignerAccount

  let dex: PluginDexClient
  let manager: LaunchManagerClient
  let backrun: BackrunArbHookClient
  let keyreg: ConsensusKeyregHookClient
  /** its admin is the wallet of its DAO, which is `wallet` below: no handover */
  let gated: GatedFeeHookClient
  /** the four apps with a stored admin, in handover order */
  let targets: { name: string; appId: bigint; notAdmin: string; client: PluginDexClient | LaunchManagerClient | BackrunArbHookClient | ConsensusKeyregHookClient }[]

  let pluginClient: PluginDexAdminPluginClient
  let plugin: PluginDexAdminPluginSDK
  let pluginAddress: string
  /** takes the four stored admin roles in this suite, and is the GatedFeeHook's DAO wallet from the start */
  let wallet: WalletSDK
  let walletAddress: string
  /** holds the same plugin grant and is never the admin of anything */
  let outsider: WalletSDK
  /** any live app that is none of the four: stands in for a hook, curve or valuator id */
  let anyApp: bigint
  let poolId: bigint
  let treasury: string

  const use = (...calls: Call[]) => wallet.usePlugin({ callerType: CallerType.Global, calls })
  const admins = async () =>
    Promise.all(targets.map(async ({ client }) => [await client.state.global.admin(), await client.state.global.pendingAdmin()]))
  const algo = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgo
  const poolPaused = async () => (await dex.getPool({ args: { poolId } })).paused
  const schedule = (impactMaxDiscountBps = 500n) => ({
    floorFeeBps: 10n,
    maxDiscountBps: 2_000n,
    impactMaxDiscountBps,
    tiers: [[0n, 0n, 1n, 1_000n]] as [bigint, bigint, bigint, bigint][],
  })
  const poolKeys = (voteFirst = 1_000n, voteLast = 3_000_000n) => ({
    operator: guardian.addr.toString(),
    voteKey: new Uint8Array(32).fill(1),
    selectionKey: new Uint8Array(32).fill(2),
    stateProofKey: new Uint8Array(64).fill(3),
    voteFirst,
    voteLast,
    voteKeyDilution: 1_732n,
  })

  /** One call per admin action (everything but the two handover methods), with the code a non-admin gets */
  const adminActions = (): { method: string; notAdmin: string; call: Call }[] => [
    { method: 'vaultSetProtocolFee', notAdmin: NOT_VAULT_ADMIN, call: plugin.vaultSetProtocolFee({ protocolFeeBps: 1n, treasury }) },
    { method: 'vaultSetHookApproval', notAdmin: NOT_VAULT_ADMIN, call: plugin.vaultSetHookApproval({ hook: anyApp, perms: 1n }) },
    { method: 'vaultSetCurveApproval', notAdmin: NOT_VAULT_ADMIN, call: plugin.vaultSetCurveApproval({ curve: anyApp, lpMode: 0n, approved: true }) },
    { method: 'vaultSetValuatorApproval', notAdmin: NOT_VAULT_ADMIN, call: plugin.vaultSetValuatorApproval({ valuator: anyApp, approved: true }) },
    { method: 'vaultSetPoolPaused', notAdmin: NOT_VAULT_ADMIN, call: plugin.vaultSetPoolPaused({ poolId, paused: true }) },
    { method: 'vaultWriteDownExternal', notAdmin: NOT_VAULT_ADMIN, call: plugin.vaultWriteDownExternal({ poolId, slot: 0n }) },
    { method: 'launchSetFees', notAdmin: NOT_LAUNCH_ADMIN, call: plugin.launchSetFees({ launchFee: 1n, bounty: 1n, treasury }) },
    { method: 'launchSetHooks', notAdmin: NOT_LAUNCH_ADMIN, call: plugin.launchSetHooks({ antiSnipeHook: anyApp, launchTaxHook: anyApp, gatedHook: anyApp, gatedFunding: 1n }) },
    { method: 'launchSetDevBuy', notAdmin: NOT_LAUNCH_ADMIN, call: plugin.launchSetDevBuy({ rewards: anyApp, maxBps: 1n, minVestSeconds: 1n, maxVestSeconds: 2n }) },
    { method: 'backrunSetPaused', notAdmin: NOT_BACKRUN_ADMIN, call: plugin.backrunSetPaused({ paused: true }) },
    { method: 'backrunRegisterPool', notAdmin: NOT_BACKRUN_ADMIN, call: plugin.backrunRegisterPool({ poolId, minSurplusA: 1n, minSurplusB: 1n, maxTradeBps: 100n }) },
    { method: 'backrunSetPoolEnabled', notAdmin: NOT_BACKRUN_ADMIN, call: plugin.backrunSetPoolEnabled({ poolId, enabled: false }) },
    { method: 'backrunWithdraw', notAdmin: NOT_BACKRUN_ADMIN, call: plugin.backrunWithdraw({ amount: 1n }) },
    { method: 'keyregSetPoolKeys', notAdmin: NOT_KEYREG_ADMIN, call: plugin.keyregSetPoolKeys({ poolId, keys: poolKeys() }) },
    { method: 'keyregDeletePoolKeys', notAdmin: NOT_KEYREG_ADMIN, call: plugin.keyregDeletePoolKeys({ poolId }) },
    { method: 'keyregWithdraw', notAdmin: NOT_KEYREG_ADMIN, call: plugin.keyregWithdraw({ amount: 1n }) },
    { method: 'gatedSetGateSlots', notAdmin: NOT_GATED_ADMIN, call: plugin.gatedSetGateSlots({ slots: [1n] }) },
    { method: 'gatedSetPassTtl', notAdmin: NOT_GATED_ADMIN, call: plugin.gatedSetPassTtl({ ttl: 7_200n }) },
    { method: 'gatedSetMaxDiscountedSwapsPerDay', notAdmin: NOT_GATED_ADMIN, call: plugin.gatedSetMaxDiscountedSwapsPerDay({ cap: 5n }) },
    { method: 'gatedSetDefaultSchedule', notAdmin: NOT_GATED_ADMIN, call: plugin.gatedSetDefaultSchedule({ schedule: schedule() }) },
  ]

  /** what the plugin's account holds: nothing, until the spoofing test sends it ALGO as a mistaken payment would */
  let pluginFloat = 0n

  /** every window closes with the wallet in control of its own account, and the plugin's account is never touched */
  const expectAccountsSettled = async () => {
    const walletInfo = await algorand.account.getInformation(walletAddress)
    expect(walletInfo.authAddr?.toString() ?? walletAddress).toBe(walletAddress)
    const pluginInfo = await algorand.account.getInformation(pluginAddress)
    expect(pluginInfo.authAddr, 'the plugin account must never be rekeyed').toBeUndefined()
    expect(pluginInfo.balance.microAlgo, 'nothing the plugin holds ever moves').toBe(pluginFloat)
  }

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    algorand = fixture.algorand
    deployer = fixture.context.testAccount
    await algorand.account.ensureFunded(deployer.addr, await algorand.account.dispenserFromEnvironment(), (5_000).algos())
    owner = await fixture.context.generateAccount({ initialFunds: microAlgo(50_000_000) })
    guardian = await fixture.context.generateAccount({ initialFunds: microAlgo(10_000_000) })
    stranger = await fixture.context.generateAccount({ initialFunds: microAlgo(10_000_000) })
    successor = await fixture.context.generateAccount({ initialFunds: microAlgo(10_000_000) })
    treasury = successor.addr.toString()
    const sender = deployer.addr.toString()
    const signer = deployer.signer
    const defaults = { defaultSender: deployer.addr, defaultSigner: signer }

    const { appClient: mbr } = await algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, defaults).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    anyApp = mbr.appId
    const escrowFactory = await deployEscrowFactory({ fixture, sender, signer })
    const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrowFactory.appId } })
    const walletFactory = await deployAbstractedAccountFactory({ fixture, sender, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })

    // the four apps with an admin, all created with the deployer as admin (as deploy:immutable does)
    dex = await deployVault({ algorand, sender: deployer, funding: 5_000_000n })
    manager = (
      await algorand.client.getTypedAppFactory(LaunchManagerFactory, defaults)
        .send.create.create({ args: { vault: dex.appId, admin: sender, antiSnipeHook: 0n, launchTaxHook: 0n } })
    ).appClient
    // the Tinyman app id is only stored at create: any live app stands in
    backrun = (
      await algorand.client.getTypedAppFactory(BackrunArbHookFactory, defaults)
        .send.create.create({ args: { dex: dex.appId, tinyman: dex.appId, admin: sender } })
    ).appClient
    keyreg = (
      await algorand.client.getTypedAppFactory(ConsensusKeyregHookFactory, defaults)
        .send.create.create({ args: { dex: dex.appId, admin: sender } })
    ).appClient
    for (const client of [manager, backrun, keyreg]) await client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    targets = [
      { name: 'PluginDex', appId: dex.appId, notAdmin: NOT_VAULT_ADMIN, client: dex },
      { name: 'LaunchManager', appId: manager.appId, notAdmin: NOT_LAUNCH_ADMIN, client: manager },
      { name: 'BackrunArbHook', appId: backrun.appId, notAdmin: NOT_BACKRUN_ADMIN, client: backrun },
      { name: 'ConsensusKeyregHook', appId: keyreg.appId, notAdmin: NOT_KEYREG_ADMIN, client: keyreg },
    ]

    const token = (await algorand.send.assetCreate({ sender, total: 10n ** 15n, decimals: 6, unitName: 'TKN' })).assetId
    poolId = (await createPool({ algorand, dex, sender: deployer, assetA: 0n, assetB: token, config: poolConfig(30n) })).poolId

    // the owner is the admin of both wallets and the only signer of their windows from here on
    const open = async (nickname: string) => {
      const created = await newWallet({
        algorand,
        factoryParams: { appId: walletFactory.appId, defaultSender: owner.addr, defaultSigner: owner.signer },
        sender: owner.addr,
        signer: owner.signer,
        nickname,
      })
      await algorand.send.payment({ sender, signer, receiver: created.client.appAddress, amount: microAlgo(20_000_000) })
      return created
    }
    wallet = await open('dex admin wallet')
    walletAddress = wallet.client.appAddress.toString()
    outsider = await open('not an admin')

    // GatedFeeHook's admin is the ARC-58 wallet of its DAO. A real DAO creates its own wallet, so a mirror of
    // the DAO that names `wallet` stands in (the gated-fee suite does the same).
    const mirror = (
      await algorand.client.getTypedAppFactory(MockMirrorDaoFactory, defaults)
        .send.create.create({ args: { source: dao.appId, walletFactory: walletFactory.appId, daoWallet: wallet.appId } })
    ).appClient
    gated = (
      await algorand.client.getTypedAppFactory(GatedFeeHookFactory, defaults)
        .send.create.create({ args: { dex: dex.appId, akitaDao: mirror.appId, passTtl: 0n } })
    ).appClient
    await gated.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })

    pluginClient = (
      await algorand.client.getTypedAppFactory(PluginDexAdminPluginFactory, defaults).send.create.create({
        args: { version: '0.1.0', vault: dex.appId, launchManager: manager.appId, backrunArbHook: backrun.appId,
          consensusKeyregHook: keyreg.appId, gatedFeeHook: gated.appId },
      })
    ).appClient
    pluginAddress = pluginClient.appAddress.toString()
    plugin = new PluginDexAdminPluginSDK({ algorand, factoryParams: { appId: pluginClient.appId, defaultSender: owner.addr, defaultSigner: owner.signer } })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })
    await outsider.addPlugin({ client: plugin, callerType: CallerType.Global })
  })

  test('create pins the five apps and refuses an id that is not a live app with the admin state', async () => {
    const good = { vault: dex.appId, launchManager: manager.appId, backrunArbHook: backrun.appId, consensusKeyregHook: keyreg.appId, gatedFeeHook: gated.appId }
    expect(await plugin.targets()).toEqual(good)
    expect(await pluginClient.state.global.version()).toBe('0.1.0')

    const factory = algorand.client.getTypedAppFactory(PluginDexAdminPluginFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
    for (const field of Object.keys(good) as (keyof typeof good)[]) {
      // 0, and a live app that stores neither an `admin` nor an `akita_dao`
      for (const bad of [0n, anyApp]) {
        await expectContractError(factory.send.create.create({ args: { version: '0.1.0', ...good, [field]: bad } }), errDaCreate)
      }
    }
    // the hook whose admin is a DAO's wallet and an app with a stored admin cannot stand in for each other
    await expectContractError(factory.send.create.create({ args: { version: '0.1.0', ...good, gatedFeeHook: dex.appId } }), errDaCreate)
    await expectContractError(factory.send.create.create({ args: { version: '0.1.0', ...good, vault: gated.appId } }), errDaCreate)
  })

  test('every method takes the wallet first, and the suite below covers each one', () => {
    const windowed = pluginClient.appSpec.methods.filter((m) => m.args[0]?.name === 'wallet').map((m) => m.name)
    const rest = pluginClient.appSpec.methods.filter((m) => m.args[0]?.name !== 'wallet').map((m) => m.name)
    expect(rest.sort()).toEqual(['create', 'opUp'])
    expect([...adminActions().map((a) => a.method), 'acceptAdminOf', 'proposeAdminOf'].sort()).toEqual(windowed.sort())
    // no update method: the ARC-58 wallet only accepts plugins that were never updated
    expect(pluginClient.appSpec.bareActions).toEqual({ create: [], call: [] })
    expect(pluginClient.appSpec.methods.flatMap((m) => [...m.actions.create, ...m.actions.call])).not.toContain('UpdateApplication')
  })

  test('the plugin adds no authority: a wallet that is not the admin gets each app\'s own refusal', async () => {
    const asOutsider = (call: Call) => outsider.usePlugin({ callerType: CallerType.Global, calls: [call] })
    for (const { method, notAdmin, call } of adminActions()) {
      await expectContractError(asOutsider(call), notAdmin).catch((error) => {
        throw new Error(`${method}: ${(error as Error).message}`)
      })
    }
    for (const { appId, notAdmin } of targets) {
      // nothing was proposed, so there is nothing to accept, and only the admin proposes
      await expectContractError(asOutsider(plugin.acceptAdminOf({ app: appId })), notAdmin)
      await expectContractError(asOutsider(plugin.proposeAdminOf({ app: appId, admin: outsider.client.appAddress.toString() })), notAdmin)
      // the wallet that will take the roles is no admin yet either
      await expectContractError(use(plugin.acceptAdminOf({ app: appId })), notAdmin)
    }
    expect(await admins()).toEqual(targets.map(() => [deployer.addr.toString(), undefined]))
    const outsiderInfo = await algorand.account.getInformation(outsider.client.appAddress)
    expect(outsiderInfo.authAddr).toBeUndefined()
    await expectAccountsSettled()
  })

  test('a handover reaches only the four pinned apps, even when another app has named the wallet', async () => {
    // a second Vault whose admin proposed this wallet: the app itself would accept the call
    const other = await deployVault({ algorand, sender: deployer })
    await other.send.proposeAdmin({ args: { admin: walletAddress }, ...send })
    await expectContractError(use(plugin.acceptAdminOf({ app: other.appId })), errDaTarget)
    await expectContractError(use(plugin.proposeAdminOf({ app: other.appId, admin: walletAddress })), errDaTarget)
    await expectContractError(use(plugin.acceptAdminOf({ app: anyApp })), errDaTarget)
    // GatedFeeHook is pinned, but it has no admin to hand over
    await expectContractError(use(plugin.acceptAdminOf({ app: gated.appId })), errDaTarget)
    expect(await other.state.global.admin()).toBe(deployer.addr.toString())
    await expectAccountsSettled()
  })

  test('the wallet accepts all four admin roles in one group and the deployer is out', async () => {
    // step 1, by the deployer: nothing changes yet
    await dex.send.proposeAdmin({ args: { admin: walletAddress }, ...send })
    await manager.send.proposeAdmin({ args: { admin: walletAddress }, ...send })
    await backrun.send.proposeAdmin({ args: { admin: walletAddress }, ...send })
    await keyreg.send.proposeAdmin({ args: { admin: walletAddress }, ...send })
    expect(await admins()).toEqual(targets.map(() => [deployer.addr.toString(), walletAddress]))

    // step 2, by the wallet: one window, four calls, only the last hands the wallet back
    const accepted = await use(
      ...targets.map(({ appId }, i) => plugin.acceptAdminOf({ app: appId, rekeyBack: i === targets.length - 1 })),
    )
    expect(accepted.confirmations.filter((c) => c.txn.txn.applicationCall?.appIndex === plugin.appId)).toHaveLength(targets.length)
    expect(await admins()).toEqual(targets.map(() => [walletAddress, undefined]))
    await expectAccountsSettled()

    // the deployer's key no longer administers anything
    await expectContractError(dex.send.setProtocolFee({ args: { protocolFeeBps: 0n, treasury }, ...send }), NOT_VAULT_ADMIN)
    await expectContractError(manager.send.setFees({ args: { launchFee: 0n, bounty: 0n, treasury }, ...send }), NOT_LAUNCH_ADMIN)
    await expectContractError(backrun.send.setPaused({ args: { paused: true }, ...send }), NOT_BACKRUN_ADMIN)
    await expectContractError(keyreg.send.deletePoolKeys({ args: { poolId }, ...send }), NOT_KEYREG_ADMIN)
    // and an acceptance cannot be replayed
    await expectContractError(use(plugin.acceptAdminOf({ app: dex.appId })), NOT_VAULT_ADMIN)
  })

  test('Vault: fee, approvals, pause and write-down go through the plugin', async () => {
    await use(plugin.vaultSetProtocolFee({ protocolFeeBps: 2_500n, treasury }))
    expect(await dex.state.global.protocolFeeBps()).toBe(2_500n)
    expect(await dex.state.global.treasury()).toBe(treasury)
    // the Vault's own limits still apply to its admin
    await expectContractError(use(plugin.vaultSetProtocolFee({ protocolFeeBps: 5_001n, treasury })), 'errPdfe')

    await use(plugin.vaultSetHookApproval({ hook: keyreg.appId, perms: 31n }))
    expect((await dex.state.box.approvedHooks.getMap()).get(keyreg.appId)).toEqual({ perms: 31n, version: 0n })
    await expectContractError(use(plugin.vaultSetHookApproval({ hook: keyreg.appId, perms: 32n })), 'errPdhc')
    await use(plugin.vaultSetHookApproval({ hook: keyreg.appId, perms: 0n }))
    expect((await dex.state.box.approvedHooks.getMap()).has(keyreg.appId)).toBe(false)

    await use(plugin.vaultSetCurveApproval({ curve: anyApp, lpMode: 1n, approved: true }))
    expect((await dex.state.box.approvedCurves.getMap()).get(anyApp)).toEqual({ version: 0n, lpMode: 1n })
    await use(plugin.vaultSetCurveApproval({ curve: anyApp, lpMode: 1n, approved: false }))
    expect((await dex.state.box.approvedCurves.getMap()).has(anyApp)).toBe(false)

    await use(plugin.vaultSetValuatorApproval({ valuator: anyApp, approved: true }))
    expect((await dex.state.box.approvedValuators.getMap()).get(anyApp)).toBe(0n)
    await use(plugin.vaultSetValuatorApproval({ valuator: anyApp, approved: false }))
    expect((await dex.state.box.approvedValuators.getMap()).has(anyApp)).toBe(false)

    // a write-down needs a paused pool and an external slot. This pool has no slot, so the call is refused
    // by the Vault's own checks, which sit after its admin check (external.e2e.spec.ts covers the arithmetic).
    expect(await poolPaused()).toBe(false)
    await expectContractError(use(plugin.vaultWriteDownExternal({ poolId, slot: 0n })), 'errPdnp')
    await use(plugin.vaultSetPoolPaused({ poolId, paused: true }))
    expect(await poolPaused()).toBe(true)
    await expectContractError(use(plugin.vaultWriteDownExternal({ poolId, slot: 0n })), 'errPdex')
    await use(plugin.vaultSetPoolPaused({ poolId, paused: false }))
    expect(await poolPaused()).toBe(false)
    await expectContractError(use(plugin.vaultSetPoolPaused({ poolId: poolId + 99n, paused: true })), 'errPdpn')
    await expectAccountsSettled()
  })

  test('LaunchManager: fees, hooks and the dev-buy policy go through the plugin', async () => {
    await use(plugin.launchSetFees({ launchFee: 5_000_000n, bounty: 250_000n, treasury }))
    expect(await manager.state.global.launchFee()).toBe(5_000_000n)
    expect(await manager.state.global.bounty()).toBe(250_000n)
    expect(await manager.state.global.treasury()).toBe(treasury)

    await use(plugin.launchSetHooks({ antiSnipeHook: anyApp, launchTaxHook: keyreg.appId, gatedHook: backrun.appId, gatedFunding: 300_000n }))
    expect(await manager.state.global.antiSnipeHook()).toBe(anyApp)
    expect(await manager.state.global.launchTaxHook()).toBe(keyreg.appId)
    expect(await manager.state.global.gatedHook()).toBe(backrun.appId)
    expect(await manager.state.global.gatedFunding()).toBe(300_000n)

    await use(plugin.launchSetDevBuy({ rewards: anyApp, maxBps: 500n, minVestSeconds: 3_600n, maxVestSeconds: 86_400n }))
    expect(await manager.state.global.rewards()).toBe(anyApp)
    expect(await manager.state.global.devBuyMaxBps()).toBe(500n)
    expect(await manager.state.global.devVestMin()).toBe(3_600n)
    expect(await manager.state.global.devVestMax()).toBe(86_400n)
    await expectContractError(use(plugin.launchSetDevBuy({ rewards: anyApp, maxBps: 500n, minVestSeconds: 2n, maxVestSeconds: 1n })), 'errLmpr')
    await expectAccountsSettled()
  })

  test('BackrunArbHook: kill switch, registration checks and withdraw go through the plugin', async () => {
    await use(plugin.backrunSetPaused({ paused: true }))
    expect(await backrun.state.global.paused()).toBe(1n)
    await use(plugin.backrunSetPaused({ paused: false }))
    expect(await backrun.state.global.paused()).toBe(0n)

    // registration reaches the hook's own checks, which sit after its admin check: bad parameters, then a
    // pool that does not run this hook (backrun-arb.e2e.spec.ts covers a full registration against Tinyman)
    await expectContractError(use(plugin.backrunRegisterPool({ poolId, minSurplusA: 1n, minSurplusB: 1n, maxTradeBps: 0n })), 'errBrpm')
    await expectContractError(use(plugin.backrunRegisterPool({ poolId, minSurplusA: 1n, minSurplusB: 1n, maxTradeBps: 100n })), 'errBrpl')
    await expectContractError(use(plugin.backrunSetPoolEnabled({ poolId, enabled: false })), 'errBrtm')

    // the hook pays its admin, which is the wallet
    const before = await algo(walletAddress)
    await use(plugin.backrunWithdraw({ amount: 300_000n }))
    expect((await algo(walletAddress)) - before).toBe(300_000n)
    await expectAccountsSettled()
  })

  test('ConsensusKeyregHook: pool keys and withdraw go through the plugin', async () => {
    const keys = poolKeys()
    await use(plugin.keyregSetPoolKeys({ poolId, keys }))
    expect((await keyreg.state.box.keys.getMap()).get(poolId)).toEqual(keys)
    await expectContractError(use(plugin.keyregSetPoolKeys({ poolId, keys: poolKeys(10n, 9n) })), 'errCkkw')
    await use(plugin.keyregDeletePoolKeys({ poolId }))
    expect((await keyreg.state.box.keys.getMap()).has(poolId)).toBe(false)

    const before = await algo(walletAddress)
    await use(plugin.keyregWithdraw({ amount: 200_000n }))
    expect((await algo(walletAddress)) - before).toBe(200_000n)
    await expectAccountsSettled()
  })

  test('GatedFeeHook: gate slots, pass lifetime, daily cap and default schedule go through the plugin', async () => {
    await use(plugin.gatedSetGateSlots({ slots: [5n, 6n] }))
    expect(await gated.state.box.gateSlots()).toEqual([5n, 6n])
    // the hook's own limits still apply to its admin
    await expectContractError(use(plugin.gatedSetGateSlots({ slots: Array<bigint>(9).fill(5n) })), 'errGfgs')

    await use(plugin.gatedSetPassTtl({ ttl: 7_200n }))
    expect(await gated.state.global.passTtl()).toBe(7_200n)
    await expectContractError(use(plugin.gatedSetPassTtl({ ttl: 3_599n })), 'errGftl')

    await use(plugin.gatedSetMaxDiscountedSwapsPerDay({ cap: 5n }))
    expect(await gated.state.global.maxDiscountedSwapsPerDay()).toBe(5n)

    await use(plugin.gatedSetDefaultSchedule({ schedule: schedule() }))
    expect(await gated.state.box.defaultSchedule()).toEqual(schedule())
    await expectContractError(use(plugin.gatedSetDefaultSchedule({ schedule: schedule(2_001n) })), 'errGfsc')
    await expectAccountsSettled()
  })

  test('from an escrow the calls are refused: the admin is the wallet\'s main account', async () => {
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global, escrow: 'dex_ops' })
    await expectContractError(
      wallet.usePlugin({ callerType: CallerType.Global, escrow: 'dex_ops', calls: [plugin.vaultSetPoolPaused({ poolId, paused: true })] }),
      NOT_VAULT_ADMIN,
    )
    expect(await poolPaused()).toBe(false)
    await wallet.removePlugin({ plugin: plugin.appId, caller: ZERO, escrow: 'dex_ops' })
  })

  test('an app posing as a wallet cannot make the plugin send from its own account', async () => {
    const as = { defaultSender: stranger.addr, defaultSigner: stranger.signer }
    // not a wallet: it only stores the plugin's own address as its spending account
    const { appClient: fake } = await algorand.client.getTypedAppFactory(MockFakeWalletFactory, as)
      .send.create.create({ args: { controlledAddress: ZERO, referrer: ZERO, spendingAddress: pluginAddress } })

    const testValue = (type: string): unknown => {
      if (type === 'uint64') return dex.appId
      if (type === 'bool') return true
      if (type === 'address') return stranger.addr.toString()
      const bytes = /^byte\[(\d+)\]$/.exec(type)
      if (bytes) return new Uint8Array(Number(bytes[1]))
      if (type.endsWith('[]')) return []
      if (type.startsWith('(')) return (ABIType.from(type) as ABITupleType).childTypes.map((child) => testValue(child.toString()))
      throw new Error(`no test value for ABI type ${type}`)
    }
    const windowed = pluginClient.appSpec.methods.filter((m) => m.args[0]?.name === 'wallet')
    expect(windowed).toHaveLength(22)
    const spoof = (method: (typeof windowed)[number]) => pluginClient.appClient.send.call({
      sender: stranger.addr,
      signer: stranger.signer,
      method: method.name,
      args: [fake.appId, true, ...method.args.slice(2).map((arg) => testValue(arg.type))] as never,
      extraFee: microAlgo(10_000),
    })

    // the plugin's account is empty, as it always should be: reading its auth address already fails
    for (const method of windowed) {
      await expect(spoof(method), method.name).rejects.toThrow(/acct_params_get AcctAuthAddr; assert/)
    }
    await expectAccountsSettled()

    // with ALGO in it (a payment sent to the plugin by mistake) there is something to take: still refused
    pluginFloat = 500_000n
    await algorand.send.payment({ sender: stranger.addr, signer: stranger.signer, receiver: pluginAddress, amount: microAlgo(pluginFloat) })
    for (const method of windowed) {
      await expectContractError(spoof(method), errPluginNotAuthAddr).catch((error) => {
        throw new Error(`${method.name}: ${(error as Error).message}`)
      })
    }
    await expectAccountsSettled()
  })

  test('a named caller can be granted one action only, here pausing a pool', async () => {
    // replace the open grant with one for the guardian, limited to vaultSetPoolPaused
    await wallet.removePlugin({ plugin: plugin.appId, caller: ZERO, escrow: '' })
    await wallet.addPlugin({ client: plugin, caller: guardian.addr.toString(), methods: [{ name: plugin.vaultSetPoolPaused(), cooldown: 0n }] })
    const asGuardian = { sender: guardian.addr.toString(), signer: guardian.signer }

    await wallet.usePlugin({ ...asGuardian, calls: [plugin.vaultSetPoolPaused({ poolId, paused: true, ...asGuardian })] })
    expect(await poolPaused()).toBe(true)

    // any other action: the SDK refuses to build it, and the wallet refuses it on chain whatever offset is claimed
    await expect(
      wallet.usePlugin({ ...asGuardian, calls: [plugin.vaultSetProtocolFee({ protocolFeeBps: 0n, treasury, ...asGuardian })] }),
    ).rejects.toThrow('does not match any allowed method')
    const window = async (by: TransactionSignerAccount, call: Parameters<ReturnType<AlgorandClient['newGroup']>['addAppCallMethodCall']>[0]) => {
      const from = { sender: by.addr, signer: by.signer }
      const group = algorand.newGroup()
      group.addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({
        ...from,
        args: { plugin: plugin.appId, type: CallerType.Other, escrow: '', methodOffsets: [0], fundsRequest: [] },
        extraFee: microAlgo(1_000),
      }))
      group.addAppCallMethodCall(call)
      group.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ ...from, args: {} }))
      return group.send({ populateAppCallResources: true })
    }
    await expectContractError(
      window(guardian, await pluginClient.params.vaultSetProtocolFee({
        ...asGuardian,
        args: { wallet: wallet.appId, rekeyBack: true, protocolFeeBps: 0n, treasury },
        extraFee: microAlgo(5_000),
      })),
      'errMcld',
    )
    expect(await dex.state.global.protocolFeeBps()).toBe(2_500n)

    // an account without a grant cannot open a window at all, not even for the granted action
    await expect(
      window(stranger, await pluginClient.params.vaultSetPoolPaused({
        sender: stranger.addr,
        signer: stranger.signer,
        args: { wallet: wallet.appId, rekeyBack: true, poolId, paused: false },
        extraFee: microAlgo(5_000),
      })),
    ).rejects.toThrow()
    expect(await poolPaused()).toBe(true)
    await expectAccountsSettled()

    // back to the open grant for the rest of the suite
    await wallet.removePlugin({ plugin: plugin.appId, caller: guardian.addr.toString(), escrow: '' })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Global })
    await use(plugin.vaultSetPoolPaused({ poolId, paused: false }))
    expect(await poolPaused()).toBe(false)
  })

  test('the wallet hands the role on the same two-step way', async () => {
    const next = successor.addr.toString()
    await use(...targets.map(({ appId }, i) => plugin.proposeAdminOf({ app: appId, admin: next, rekeyBack: i === targets.length - 1 })))
    // proposed, not transferred: the wallet is still the admin
    expect(await admins()).toEqual(targets.map(() => [walletAddress, next]))
    await use(plugin.vaultSetProtocolFee({ protocolFeeBps: 2_000n, treasury }))

    // the zero address cancels a pending handover
    await use(plugin.proposeAdminOf({ app: dex.appId, admin: ZERO }))
    await expectContractError(dex.send.acceptAdmin({ sender: successor.addr, signer: successor.signer, args: [], ...send }), NOT_VAULT_ADMIN)
    await use(plugin.proposeAdminOf({ app: dex.appId, admin: next }))

    const from = { sender: successor.addr, signer: successor.signer }
    await dex.send.acceptAdmin({ ...from, args: [], ...send })
    await manager.send.acceptAdmin({ ...from, args: [], ...send })
    await backrun.send.acceptAdmin({ ...from, args: [], ...send })
    await keyreg.send.acceptAdmin({ ...from, args: [], ...send })
    expect(await admins()).toEqual(targets.map(() => [next, undefined]))

    // the wallet is out again: the plugin has nothing of its own to fall back on
    await expectContractError(use(plugin.vaultSetPoolPaused({ poolId, paused: true })), NOT_VAULT_ADMIN)
    await expectContractError(use(plugin.launchSetFees({ launchFee: 0n, bounty: 0n, treasury })), NOT_LAUNCH_ADMIN)
    await expectContractError(use(plugin.backrunSetPaused({ paused: true })), NOT_BACKRUN_ADMIN)
    await expectContractError(use(plugin.keyregDeletePoolKeys({ poolId })), NOT_KEYREG_ADMIN)
    expect(await dex.state.global.protocolFeeBps()).toBe(2_000n)
    await expectAccountsSettled()
  })
})
