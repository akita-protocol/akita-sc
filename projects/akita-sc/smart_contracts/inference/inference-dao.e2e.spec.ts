/**
 * InferenceNetwork run by the Akita DAO, on the full LocalNet universe: the DAO's wallet administers
 * the network through InferencePlugin (one ExecutePlugin proposal per change), the network's fees go
 * to the DAO revenue escrow `rev_inference`, and the DAO upgrades the network through its update
 * plugin with providers and tickets in place.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { sendPrepared } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import type { PluginSDKReturn, SDKClient } from 'akita-sdk/types'
import { CallerType, newWallet, WalletSDK } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { inferenceTicketId, InferencePluginSDK } from '../../../akita-sdk/src/wallet/plugins/inference'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { buildAddPluginAction, proposeAndExecute } from '../arc58/dao/tests/utils'
import { InferencePluginFactory } from '../artifacts/arc58/plugins/inference/InferencePluginClient'
import { InferenceNetworkClient, InferenceNetworkFactory } from '../artifacts/inference/InferenceNetworkClient'
import { AkitaDAOGlobalStateKeysRevenueSplits } from '../arc58/dao/constants'

const ESCROW = 'rev_inference'
const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const metadataMbr = (uri: string) => 2_500n + 400n * (9n + BigInt(Buffer.byteLength(uri)))
const request = (n: number) => new Uint8Array(32).fill(n)
const FEE = 500n // the owner's 5%

describe('InferenceNetwork under the Akita DAO', () => {
  const fixture = algorandFixture()
  let universe: AkitaUniverse
  let deployer: { addr: algosdk.Address; signer: algosdk.TransactionSigner }
  let network: InferenceNetworkClient
  let plugin: InferencePluginSDK
  let claimer: { addr: algosdk.Address; signer: algosdk.TransactionSigner }
  let member: WalletSDK
  let provider: bigint
  let escrowAddress: string
  let lease = 0

  const balance = async (address: string | algosdk.Address, asset = 0n) => asset === 0n
    ? (await fixture.algorand.account.getInformation(address)).balance.microAlgos
    : (await fixture.algorand.asset.getAccountInformation(address, asset)).balance
  const pay = (amount: bigint) => fixture.algorand.createTransaction.payment({
    sender: deployer.addr, signer: deployer.signer, receiver: network.appAddress, amount: microAlgo(amount),
  })
  const fundDao = async () => {
    const wallet = universe.dao.wallet
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000n), sender: deployer.addr, signer: deployer.signer })
    await universe.dao.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000n), sender: deployer.addr, signer: deployer.signer })
  }

  /** Registers `calls` on the DAO wallet under an execution key, has the DAO approve them, and sends them. */
  async function daoExecute(calls: PluginSDKReturn[], action: (execution: { lease: Uint8Array; ids: Uint8Array[]; firstValid: bigint; lastValid: bigint }) => ProposalAction<SDKClient>) {
    await fundDao()
    const execution = await universe.dao.wallet.build.usePlugin({
      sender: deployer.addr.toString(), signer: deployer.signer, lease: `inference_${++lease}_${Date.now() % 1_000_000}`,
      windowSize: 2000n, callerType: CallerType.Global, calls,
    })
    await fundDao()
    await proposeAndExecute(universe.dao, [action(execution)])
    for (const window of execution.windows) await sendPrepared(window, fixture.algorand.client.algod)
  }
  const asDaoPlugin = (calls: PluginSDKReturn[]) => daoExecute(calls, (execution) => ({
    type: ProposalActionEnum.ExecutePlugin, plugin: plugin.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
    executionKey: execution.lease, groups: execution.ids, firstValid: execution.firstValid, lastValid: execution.lastValid,
  }))
  const asDaoUpgrade = (calls: PluginSDKReturn[]) => daoExecute(calls, (execution) => ({
    type: ProposalActionEnum.UpgradeApp, app: network.appId,
    executionKey: execution.lease, groups: execution.ids, firstValid: execution.firstValid, lastValid: execution.lastValid,
  }))

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    deployer = { addr: testAccount.addr, signer: testAccount.signer }
    await algorand.account.ensureFundedFromEnvironment(deployer.addr, microAlgo(2_000_000_000))
    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr.toString(), signer: deployer.signer, apps: {} })
    const send = { defaultSender: deployer.addr, defaultSigner: deployer.signer }

    // Deployed and configured by the deployer as its bootstrap admin, as deploy-inference.ts does.
    network = (await algorand.client.getTypedAppFactory(InferenceNetworkFactory, send)
      .send.create.create({ args: { version: '1.0.0', akitaDao: universe.dao.appId, admin: deployer.addr.toString() } })).appClient
    await network.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    for (const asset of [universe.aktaAssetId, universe.usdcAssetId]) {
      await network.send.optIn({ args: { payment: pay(100_000n), asset }, extraFee: microAlgo(1_000) })
    }
    await network.send.setSettings({ args: { settings: { unbondDelay: 30n * 86_400n, settleWindow: 3_600n, openRegistration: false } } })
    await network.send.setPaymentAsset({ args: { payment: pay(ASSET_MBR), asset: 0n, allowed: true } })
    claimer = algorand.account.random()
    await algorand.account.ensureFunded(claimer.addr, deployer.addr, microAlgo(5_000_000))
    const uri = 'ipfs://akita'
    provider = (await network.send.registerProvider({
      args: {
        payment: pay(PROVIDER_MBR + metadataMbr(uri)),
        bond: algorand.createTransaction.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: network.appAddress, assetId: universe.aktaAssetId, amount: 0n }),
        claimer: claimer.addr.toString(), payout: claimer.addr.toString(), metadata: uri,
      },
    })).return!
    await network.send.setProviderStatus({ args: { provider, status: 1n } })

    plugin = new InferencePluginSDK({
      algorand,
      factoryParams: {
        appId: (await algorand.client.getTypedAppFactory(InferencePluginFactory, send).send.create.create({ args: { registry: universe.dao.appId } })).appClient.appId,
        defaultSender: deployer.addr.toString(), defaultSigner: deployer.signer,
      },
    })
    member = await newWallet({
      algorand, readerAccount: deployer.addr.toString(), nickname: 'inference member',
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: deployer.addr.toString(), defaultSigner: deployer.signer },
    })
    await member.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000n) })
    await member.addPlugin({ client: plugin, callerType: CallerType.Admin })

    await proposeAndExecute(universe.dao, [
      { type: ProposalActionEnum.UpdateFields, field: 'inference_fees', value: { chargePercentage: FEE, providerBond: 0n } },
    ])
  }, 1_200_000)

  test('the bootstrap admin hands the network to the DAO, which runs it through InferencePlugin', async () => {
    await network.send.setAdmin({ args: { admin: ALGORAND_ZERO_ADDRESS_STRING } })
    await expect(network.send.setProviderStatus({ args: { provider, status: 2n } })).rejects.toThrow(/errInad/)

    // The DAO's wallet gets a global InferencePlugin grant that needs an execution key.
    await fundDao()
    // An admin change is held to the thresholds of an app upgrade, like the DAO's policy writer grant.
    const settings = (await universe.dao.client.state.global.upgradeAppProposalSettings())!
    await proposeAndExecute(universe.dao, [buildAddPluginAction({
      client: plugin, callerType: CallerType.Global, escrow: '', useExecutionKey: true,
      governance: { fee: settings.fee, power: settings.power, duration: settings.duration, participation: settings.participation, approval: settings.approval },
    })])
    await asDaoPlugin([plugin.setProviderStatus({ network: network.appId, provider, status: 2n })])
    expect((await network.send.getProvider({ args: { provider } })).return!.status).toBe(2n)
    await asDaoPlugin([
      // every call but the last leaves the wallet's account with the plugin
      plugin.setProviderStatus({ network: network.appId, provider, status: 1n, rekeyBack: false }),
      plugin.setPaymentAsset({ network: network.appId, asset: universe.usdcAssetId, allowed: true, newBox: true }),
    ])
    expect((await network.send.getProvider({ args: { provider } })).return!.status).toBe(1n)
    expect((await network.state.box.assets.value(universe.usdcAssetId))!.allowed).toBe(1n)
  }, 600_000)

  test('fees go to the DAO revenue escrow the DAO names', async () => {
    const ticket = async (id: number, amount: bigint) => {
      await member.usePlugin({
        callerType: CallerType.Admin,
        calls: [plugin.open({ network: network.appId, provider, asset: 0n, maxPrice: amount, request: request(id) })],
      })
      return inferenceTicketId(member.client.appAddress.toString(), request(id))
    }
    const t = await ticket(1, 200_000n)
    expect((await network.send.getTicket({ args: { ticket: t } })).return!.feePercentage).toBe(FEE)
    await network.send.settle({ sender: claimer.addr, signer: claimer.signer, args: { ticket: t, cost: 100_000n }, extraFee: microAlgo(3_000) })
    expect((await network.state.box.assets.value(0n))!.fees).toBe(5_000n)
    await expect(network.send.sweepFees({ args: { asset: 0n }, extraFee: microAlgo(1_000) })).rejects.toThrow(/errInne/)

    // rev_inference, created and registered with the RevenueManager like the other revenue escrows (G3a),
    // with this network as the source allowed to opt it in.
    await fundDao()
    await proposeAndExecute(universe.dao, [{ type: ProposalActionEnum.NewEscrow, escrow: ESCROW, address: ALGORAND_ZERO_ADDRESS_STRING }])
    const revenueManager = universe.revenueManagerPlugin
    await daoExecute([revenueManager.newReceiveEscrowWithRef({
      escrow: ESCROW, source: network.appAddress.toString(), allocatable: true, optinAllowed: true,
      splitRef: { app: universe.dao.appId, key: new Uint8Array(Buffer.from(AkitaDAOGlobalStateKeysRevenueSplits)) },
    })], (execution) => ({
      type: ProposalActionEnum.ExecutePlugin, plugin: revenueManager.appId, caller: deployer.addr.toString(), escrow: '',
      executionKey: execution.lease, groups: execution.ids, firstValid: execution.firstValid, lastValid: execution.lastValid,
    }))
    await fundDao()
    await proposeAndExecute(universe.dao, [buildAddPluginAction({
      client: revenueManager, callerType: CallerType.Global, escrow: ESCROW, useExecutionKey: false,
      methods: [
        { name: revenueManager.optIn(), cooldown: 0n },
        { name: revenueManager.startEscrowDisbursement(), cooldown: 0n },
        { name: revenueManager.processEscrowAllocation(), cooldown: 0n },
        { name: revenueManager.finalizeEscrowDisbursement(), cooldown: 0n },
      ],
    })])
    const { id: escrowApp } = await universe.dao.wallet.getEscrow(ESCROW)
    escrowAddress = algosdk.getApplicationAddress(escrowApp).toString()

    // The DAO points the network at it, as update:app-dao-escrow does.
    await asDaoUpgrade([universe.updatePlugin.updateAkitaDaoEscrowForApp({
      sender: deployer.addr.toString(), signer: deployer.signer, appId: network.appId, newEscrow: { name: ESCROW, app: escrowApp },
    })])
    expect(await network.state.global.akitaDaoEscrow()).toMatchObject({ name: ESCROW, app: escrowApp })

    const before = await balance(escrowAddress)
    await network.send.sweepFees({ args: { asset: 0n }, extraFee: microAlgo(1_000) })
    expect(await balance(escrowAddress) - before).toBe(5_000n)
    expect((await network.state.box.assets.value(0n))!.fees).toBe(0n)

    // USDC fees wait until the escrow holds USDC; anyone opts it in, through the RevenueManager.
    await expect(network.send.sweepFees({ args: { asset: universe.usdcAssetId }, extraFee: microAlgo(1_000) })).rejects.toThrow(/errInne/)
    const cost = (await network.send.escrowOptInCost({ args: { asset: universe.usdcAssetId } })).return!
    expect(cost).toBeGreaterThan(0n)
    await network.send.optInDaoEscrow({ args: { payment: pay(cost), asset: universe.usdcAssetId }, extraFee: microAlgo(10_000) })
    expect(await balance(escrowAddress, universe.usdcAssetId)).toBe(0n)
    expect((await network.send.escrowOptInCost({ args: { asset: universe.usdcAssetId } })).return).toBe(0n)
    expect(await network.send.sweepFees({ args: { asset: universe.usdcAssetId }, extraFee: microAlgo(1_000) }).then((r) => r.return)).toBe(0n)
  }, 600_000)

  test('the DAO upgrades the network with providers and tickets in place', async () => {
    const open = await member.usePlugin({
      callerType: CallerType.Admin,
      calls: [plugin.open({ network: network.appId, provider, asset: 0n, maxPrice: 50_000n, request: request(2) })],
    })
    expect(open).toBeDefined()
    const t = inferenceTicketId(member.client.appAddress.toString(), request(2))

    const { approvalProgram } = await fixture.algorand.client.getTypedAppFactory(InferenceNetworkFactory, { defaultSender: deployer.addr }).appFactory.compile()
    await expect(network.appClient.send.update({ method: 'update', args: ['9.9.9'] })).rejects.toThrow()
    await asDaoUpgrade([universe.updatePlugin.updateApp({
      sender: deployer.addr.toString(), signer: deployer.signer, appId: network.appId, version: '1.0.1', data: approvalProgram,
    })])
    expect(await network.state.global.version()).toBe('1.0.1')
    expect((await network.send.getProvider({ args: { provider } })).return!.status).toBe(1n)
    expect((await network.send.getTicket({ args: { ticket: t } })).return!.amount).toBe(50_000n)
    await network.send.settle({ sender: claimer.addr, signer: claimer.signer, args: { ticket: t, cost: 50_000n }, extraFee: microAlgo(3_000) })
  }, 600_000)
})
