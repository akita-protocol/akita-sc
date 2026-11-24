/**
 * InferencePlugin on LocalNet: a wallet's `inference` escrow opens per-request tickets on
 * InferenceNetwork as the payer, a delegated key (such as the one that runs routines) does so only
 * inside its policy, and what the provider does not settle comes back to the escrow. Every ticket is
 * the wallet's, whichever key opened it, and a sponsor pool counts every key's use against the
 * wallet's subscription.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk, { ABIType } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { CallerType, newWallet, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { MetaFactory, MetaSDK, SchemaPart } from '../../../../../akita-sdk/src/meta'
import { MetaPluginSDK, newMetaPlugin } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import {
  decodeInferencePolicy, encodeInferencePolicy, inferenceUsageKey, InferencePluginSDK,
} from '../../../../../akita-sdk/src/wallet/plugins/inference'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { InferencePluginFactory } from '../../../artifacts/arc58/plugins/inference/InferencePluginClient'
import { InferenceNetworkClient, InferenceNetworkFactory } from '../../../artifacts/inference/InferenceNetworkClient'
import { MockInferenceDaoFactory } from '../../../artifacts/inference/tests/MockInferenceDAOClient'
import {
  MockInferenceSubscriptionsClient, MockInferenceSubscriptionsFactory,
} from '../../../artifacts/inference/tests/MockInferenceSubscriptionsClient'
import { errPolicyMissing } from '../../../utils/errors'
import { errAllowanceExceeded } from '../../account/errors'
import { errInferencePolicyCap, errInferencePolicyDenied, errInferencePolicyFields } from './errors'

const ESCROW = 'inference'
const TICKET_MBR = 2_500n + 400n * (9n + 32n * 2n + 8n * 9n)
const POOL_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 5n)
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)

const request = (n: number) => new Uint8Array(32).fill(n)

describe('InferencePlugin (LocalNet)', () => {
  const fixture = algorandFixture()
  let owner: string
  let factory: WalletFactorySDK
  let writer: MetaPluginSDK
  let plugin: InferencePluginSDK
  let network: InferenceNetworkClient
  let wallet: WalletSDK
  let escrow: string
  let walletAddress: string
  let subscriptions: MockInferenceSubscriptionsClient
  let akita: bigint
  let other: bigint
  let agent: { addr: algosdk.Address; signer: algosdk.TransactionSigner }
  let claimer: { addr: algosdk.Address; signer: algosdk.TransactionSigner }
  const previousMbrApp = process.env.WALLET_MBR_APP_ID

  const balance = async (address: string) => (await fixture.algorand.account.getInformation(address)).balance.microAlgos
  const asAgent = (call: ReturnType<InferencePluginSDK['open']>) => wallet.usePlugin({
    sender: agent.addr.toString(), signer: agent.signer, escrow: ESCROW, calls: [call],
  })
  const configure = (body: Uint8Array, expectedRevision = 0n) => wallet.usePlugin({
    callerType: CallerType.Admin,
    calls: [writer.configurePolicy({ plugin: plugin.appId, caller: agent.addr.toString(), escrow: ESCROW, body, expectedRevision })],
  })
  const lastTicket = async () => (await network.state.global.ticketCount())!

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(1_000_000_000))

    const { appClient: mbr } = await algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: owner, defaultSigner: signer }).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const dao = await deployAkitaDAO({ fixture, sender: owner, signer, apps: {} })
    const escrowFactory = await deployEscrowFactory({ fixture, sender: owner, signer })
    factory = await deployAbstractedAccountFactory({ fixture, sender: owner, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })
    const { appClient: metaClient } = await algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: owner, defaultSigner: signer }).deploy({
      onUpdate: 'append', onSchemaBreak: 'append', createParams: { method: 'create', args: ['inference-plugin-test', dao.appId] },
    })
    await metaClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    const meta = new MetaSDK({ algorand, readerAccount: owner, factoryParams: { appId: metaClient.appId, defaultSender: owner, defaultSigner: signer } })
    await meta.addType({ description: 'Inference plugin tests', schemaList: [SchemaPart.Uint64] })
    writer = await newMetaPlugin({ algorand, sender: owner, signer, registry: meta.appId })
    await meta.client.send.setPolicyWriter({ args: { writer: writer.appId } })

    const { appClient: pluginClient } = await algorand.client.getTypedAppFactory(InferencePluginFactory, { defaultSender: owner, defaultSigner: signer })
      .send.create.create({ args: { registry: meta.appId } })
    plugin = new InferencePluginSDK({ algorand, factoryParams: { appId: pluginClient.appId, defaultSender: owner, defaultSigner: signer } })

    // The network, with Akita as provider 1 and a second provider the policy leaves out.
    // Bonds in ALGO here (the mock DAO names no AKTA), and a 10% DAO fee.
    const { appClient: inferenceDao } = await algorand.client.getTypedAppFactory(MockInferenceDaoFactory, { defaultSender: owner, defaultSigner: signer })
      .send.create.create({ args: { akta: 0n } })
    await inferenceDao.send.setInferenceFees({ args: { chargePercentage: 1_000n, providerBond: 0n } })
    // The network resolves wallets against the real wallet factory, and reads subscriptions from a mock.
    subscriptions = (await algorand.client.getTypedAppFactory(MockInferenceSubscriptionsFactory, { defaultSender: owner, defaultSigner: signer })
      .send.create.bare()).appClient
    await subscriptions.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    await inferenceDao.send.setApps({ args: { subscriptions: subscriptions.appId, wallet: factory.appId } })
    const { appClient } = await algorand.client.getTypedAppFactory(InferenceNetworkFactory, { defaultSender: owner, defaultSigner: signer })
      .send.create.create({ args: { version: 'test', akitaDao: inferenceDao.appId, admin: owner, treasury: owner } })
    network = appClient
    await network.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    await network.send.setSettings({ args: { settings: { unbondDelay: 30n * 86_400n, settleWindow: 3_600n, openRegistration: true } } })
    const pay = (amount: bigint) => algorand.createTransaction.payment({ sender: owner, receiver: network.appAddress, amount: microAlgo(amount) })
    await network.send.setPaymentAsset({ args: { payment: pay(ASSET_MBR), asset: 0n, allowed: true } })
    claimer = algorand.account.random()
    await algorand.account.ensureFunded(claimer.addr, owner, microAlgo(5_000_000))
    const register = async (uri: string) => (await network.send.registerProvider({
      args: {
        payment: pay(PROVIDER_MBR + 2_500n + 400n * (9n + BigInt(uri.length))), bond: pay(0n),
        claimer: claimer.addr.toString(), payout: claimer.addr.toString(), metadata: uri,
      },
    })).return!
    akita = await register('ipfs://akita')
    other = await register('ipfs://other')

    agent = algorand.account.random()
    await algorand.account.ensureFunded(agent.addr, owner, microAlgo(5_000_000))
    wallet = await newWallet({ algorand, readerAccount: owner, factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: signer }, nickname: 'Inference' })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(20_000_000) })
    await wallet.addPlugin({ client: writer, callerType: CallerType.Admin })
    await wallet.addPlugin({
      client: plugin, callerType: CallerType.Other, caller: agent.addr.toString(), escrow: ESCROW,
      allowances: [{ asset: 0n, type: 'flat', amount: 10_000_000n }],
    })
    const { id } = await wallet.getEscrow(ESCROW)
    escrow = algosdk.getApplicationAddress(id).toString()
    walletAddress = wallet.client.appAddress.toString()
    await algorand.send.payment({ sender: owner, signer, receiver: escrow, amount: microAlgo(5_000_000) })
    return () => {
      if (previousMbrApp === undefined) delete process.env.WALLET_MBR_APP_ID
      else process.env.WALLET_MBR_APP_ID = previousMbrApp
    }
  })

  test('a delegated grant without a policy opens nothing', async () => {
    await expect(asAgent(plugin.open({
      sender: agent.addr.toString(), signer: agent.signer, network: network.appId, provider: akita, asset: 0n, maxPrice: 100_000n, request: request(1),
    }))).rejects.toThrow(errPolicyMissing)
  })

  test('the writer refuses a malformed policy', async () => {
    const raw = ABIType.from('(uint64,uint64[],uint64[],uint64)')
    await expect(configure(raw.encode([network.appId, [], [0n], 1n]))).rejects.toThrow(errInferencePolicyFields)
    await expect(configure(raw.encode([network.appId, [2n, 1n], [0n], 1n]))).rejects.toThrow(errInferencePolicyFields)
    await expect(configure(raw.encode([network.appId, [1n], [0n], 0n]))).rejects.toThrow(errInferencePolicyFields)
    await expect(configure(raw.encode([0n, [1n], [0n], 1n]))).rejects.toThrow(errInferencePolicyFields)
  })

  test('a delegated key opens tickets within its policy; the provider settles and the rest comes back', async () => {
    const body = encodeInferencePolicy({ network: network.appId, providers: [akita], assets: [0n], maxPrice: 1_000_000n })
    await configure(body)
    expect(decodeInferencePolicy(body)).toEqual({ network: network.appId, providers: [akita], assets: [0n], maxPrice: 1_000_000n })
    const open = (provider: bigint, maxPrice: bigint, id: number) => asAgent(plugin.open({
      sender: agent.addr.toString(), signer: agent.signer, network: network.appId, provider, asset: 0n, maxPrice, request: request(id),
    }))

    await expect(open(other, 100_000n, 1)).rejects.toThrow(errInferencePolicyDenied)
    await expect(open(akita, 1_000_001n, 1)).rejects.toThrow(errInferencePolicyCap)

    const before = await balance(escrow)
    await open(akita, 600_000n, 1)
    const ticket = await lastTicket()
    expect(await balance(escrow)).toBe(before - 600_000n - TICKET_MBR)
    // The escrow paid, and the ticket is the wallet's account's.
    expect((await network.send.getTicket({ args: { ticket } })).return).toMatchObject({
      payer: escrow, principal: walletAddress, wallet: wallet.appId, provider: akita, asset: 0n, amount: 600_000n,
    })

    // The provider settles at the actual cost; the rest and the storage deposit return to the escrow.
    const payoutBefore = await balance(claimer.addr.toString())
    await network.send.settle({ sender: claimer.addr, signer: claimer.signer, args: { ticket, cost: 250_000n }, extraFee: microAlgo(3_000) })
    expect(await balance(escrow)).toBe(before - 250_000n)
    expect(await balance(claimer.addr.toString()) - payoutBefore).toBe(225_000n - 4_000n)
  })

  test('the allowance caps what the wallet moves into the escrow for tickets', async () => {
    // The wallet tops up the escrow per call through the grant's 10 ALGO flat allowance. Each ticket
    // asks for its max price plus the storage deposit, so the tenth one is refused.
    const open = (i: number) => wallet.usePlugin({
      sender: agent.addr.toString(), signer: agent.signer, escrow: ESCROW,
      fundsRequest: [{ asset: 0n, amount: 1_000_000n + TICKET_MBR }],
      calls: [plugin.open({
        sender: agent.addr.toString(), signer: agent.signer, network: network.appId, provider: akita, asset: 0n, maxPrice: 1_000_000n, request: request(10 + i),
      })],
    })
    for (let i = 0; i < 9; i++) await open(i)
    await expect(open(9)).rejects.toThrow(errAllowanceExceeded)
  })

  test('an admin execution is not limited by the policy', async () => {
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000) })
    await wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [plugin.open({ network: network.appId, provider: other, asset: 0n, maxPrice: 2_000_000n, request: request(99) })],
    })
    // an admin call is the same account's
    expect((await network.send.getTicket({ args: { ticket: await lastTicket() } })).return).toMatchObject({
      principal: walletAddress, wallet: wallet.appId, provider: other, amount: 2_000_000n,
    })
  })

  test('a sponsor pool pays for the wallet\'s subscription; every key that calls counts against the same allowance', async () => {
    const { algorand } = fixture.context
    const merchant = algorand.account.random()
    const SERVICE = 3n
    const subscription = { address: walletAddress, id: 1n }
    const subBox = new Uint8Array([...Buffer.from('s'), ...algosdk.decodeAddress(walletAddress).publicKey, ...algosdk.encodeUint64(1n)])
    await subscriptions.send.subscribe({
      args: { key: subscription, recipient: merchant.addr.toString(), serviceId: SERVICE, interval: 30n * 86_400n }, boxReferences: [subBox],
    })
    const pay = (amount: bigint) => algorand.createTransaction.payment({ sender: owner, receiver: network.appAddress, amount: microAlgo(amount) })
    const pool = (await network.send.createPool({
      args: { payment: pay(POOL_MBR + 1_000_000n), asset: 0n, allocator: owner, merchant: merchant.addr.toString(), serviceId: SERVICE, perPayment: 1_000_000n },
    })).return!
    await network.send.fundPool({ args: { pool, transfer: pay(5_000_000n) } })

    const openPooled = (maxPrice: bigint, id: number, admin = false) => wallet.usePlugin({
      ...(admin ? { callerType: CallerType.Admin } : { sender: agent.addr.toString(), signer: agent.signer, escrow: ESCROW }),
      calls: [plugin.openPooled({
        ...(admin ? {} : { sender: agent.addr.toString(), signer: agent.signer }),
        network: network.appId, pool, provider: akita, maxPrice, request: request(id), subscription,
      })],
    })
    const before = await balance(escrow)
    await openPooled(400_000n, 40)
    expect(await balance(escrow)).toBe(before)
    const ticket = await lastTicket()
    expect((await network.send.getTicket({ args: { ticket } })).return).toMatchObject({
      payer: walletAddress, principal: walletAddress, wallet: wallet.appId, pool, subscription: 1n, amount: 400_000n,
    })
    // the owner's own key and the routine key share the subscription's 1 ALGO
    await openPooled(600_000n, 41, true)
    await expect(openPooled(1n, 42)).rejects.toThrow(/errInpx/)
    expect((await network.send.poolUsage({ args: { pool, subscription } })).return!.used).toBe(1_000_000n)

    await network.send.settle({
      sender: claimer.addr, signer: claimer.signer, args: { ticket, cost: 100_000n }, extraFee: microAlgo(3_000),
      boxReferences: [inferenceUsageKey(pool, walletAddress, 1n)],
    })
    expect((await network.send.poolUsage({ args: { pool, subscription } })).return!.used).toBe(700_000n)
  })
})
