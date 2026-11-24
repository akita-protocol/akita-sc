import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { Address, TransactionSigner } from 'algosdk'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { CallerType, newWallet, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { InferencePluginSDK } from '../../../akita-sdk/src/wallet/plugins/inference'
import { deployAbstractedAccountFactory } from '../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../tests/fixtures/escrow'
import { TimeWarp } from '../../tests/utils/time'
import { AbstractedAccountMbrFactory } from '../artifacts/arc58/account/AbstractedAccountMBRClient'
import { InferencePluginFactory } from '../artifacts/arc58/plugins/inference/InferencePluginClient'
import { InferenceNetworkClient, InferenceNetworkFactory } from '../artifacts/inference/InferenceNetworkClient'
import { MockInferenceDaoClient, MockInferenceDaoFactory } from '../artifacts/inference/tests/MockInferenceDAOClient'
import { MockInferenceSubscriptionsClient, MockInferenceSubscriptionsFactory } from '../artifacts/inference/tests/MockInferenceSubscriptionsClient'

const SETTLE_WINDOW = 3_600n
const UNBOND_DELAY = 30n * 86_400n
const FEE = 1_000n // 10%
const BOND = 100n

/** Box MBR = 2_500 + 400 * (key + value); the same numbers as constants.ts, checked against algod below. */
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const TICKET_MBR = 2_500n + 400n * (9n + 32n * 2n + 8n * 9n)
const POOL_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 5n)
const USAGE_MBR = 2_500n + 400n * (1n + 8n + 32n + 8n + 16n)
const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)
const ATTESTATION_MBR = 2_500n + 400n * (9n + 8n + 32n + 32n)
const metadataMbr = (uri: string) => 2_500n + 400n * (9n + BigInt(Buffer.byteLength(uri)))
const request = (n: number) => new Uint8Array(32).fill(n)

type Signer = { addr: Address; signer: TransactionSigner }
/** An Akita wallet with InferencePlugin installed for its admin: `address` is its controlled address. */
type Member = { wallet: WalletSDK; address: string; id: bigint }

describe('InferenceNetwork', () => {
  const fixture = algorandFixture()
  let admin: Signer
  let treasury: Signer
  let owner: Signer
  let claimer: Signer
  let payout: Signer
  let payer: Signer
  let stranger: Signer
  let dao: MockInferenceDaoClient
  let subscriptions: MockInferenceSubscriptionsClient
  let client: InferenceNetworkClient
  let appAddress: Address
  let akta: bigint
  let usdc: bigint
  let provider: bigint
  let warp: TimeWarp
  let walletFactory: WalletFactorySDK
  let plugin: InferencePluginSDK
  let buyer: Member
  let wallets = 0
  const previousMbrApp = process.env.WALLET_MBR_APP_ID

  const balance = async (address: Address, asset: bigint) => {
    const info = await fixture.algorand.account.getInformation(address)
    if (asset === 0n) return info.balance.microAlgo
    return (await fixture.algorand.asset.getAccountInformation(address, asset)).balance
  }
  const minBalance = async () => (await fixture.algorand.account.getInformation(appAddress)).minBalance.microAlgo
  const as = (who: Signer) => ({ sender: who.addr, signer: who.signer })
  const storage = (who: Signer, amount: bigint) =>
    fixture.algorand.createTransaction.payment({ ...as(who), receiver: appAddress, amount: microAlgo(amount) })
  const transfer = (who: Signer, asset: bigint, amount: bigint) => asset === 0n
    ? fixture.algorand.createTransaction.payment({ ...as(who), receiver: appAddress, amount: microAlgo(amount) })
    : fixture.algorand.createTransaction.assetTransfer({ ...as(who), receiver: appAddress, assetId: asset, amount })
  // settle and refund send up to three inner transactions: the payout, the rest and the storage deposit
  const settleFee = { extraFee: microAlgo(3_000) }
  // An ASA settle touches three holdings (this app's, the payout's and the payer's); name them explicitly.
  const boxKey = (prefix: string, id: bigint) => new Uint8Array([...Buffer.from(prefix), ...algosdk.encodeUint64(id)])
  const usageKey = (pool: bigint, subscriber: Address, subscription: bigint) =>
    new Uint8Array([...Buffer.from('u'), ...algosdk.encodeUint64(pool), ...subscriber.publicKey, ...algosdk.encodeUint64(subscription)])
  const settleRefs = (ticket: bigint, asset: bigint, pool?: { id: bigint; subscriber: Address; subscription: bigint }) => ({
    accountReferences: pool ? [payout.addr] : [payout.addr, payer.addr],
    assetReferences: [asset],
    boxReferences: [
      boxKey('t', ticket), boxKey('p', provider), boxKey('x', asset),
      ...(pool ? [boxKey('o', pool.id), usageKey(pool.id, pool.subscriber, pool.subscription)] : []),
    ],
  })
  const newAccount = async (algo = 50): Promise<Signer> => {
    const account = await fixture.context.generateAccount({ initialFunds: microAlgo(algo * 1_000_000) })
    return { addr: account.addr, signer: account.signer }
  }
  const optInTo = async (who: Signer, asset: bigint) => fixture.algorand.send.assetOptIn({ ...as(who), assetId: asset })
  const fund = async (who: Signer, asset: bigint, amount: bigint) =>
    fixture.algorand.send.assetTransfer({ ...as(admin), receiver: who.addr, assetId: asset, amount })

  const lastTicket = async () => (await client.state.global.ticketCount())!
  const newMember = async (algo = 20n): Promise<Member> => {
    const wallet = await newWallet({
      algorand: fixture.algorand, readerAccount: admin.addr.toString(), nickname: `inference ${++wallets}`,
      factoryParams: { appId: walletFactory.appId, defaultSender: admin.addr.toString(), defaultSigner: admin.signer },
    })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(algo * 1_000_000n) })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    return { wallet, address: wallet.client.appAddress.toString(), id: wallet.appId }
  }
  /** The wallet opens a ticket through InferencePlugin; its controlled address pays. */
  async function open(member: Member, asset: bigint, amount: bigint, id = 1, to = provider) {
    await member.wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [plugin.open({ network: client.appId, provider: to, asset, maxPrice: amount, request: request(id) })],
    })
    return lastTicket()
  }

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    warp = new TimeWarp(fixture.algorand)
    await warp.resetTimeWarp()
    const main = fixture.context.testAccount
    admin = { addr: main.addr, signer: main.signer }
    await fixture.algorand.account.ensureFundedFromEnvironment(admin.addr, microAlgo(500_000_000))
    ;[treasury, owner, claimer, payout, payer, stranger] = await Promise.all([1, 2, 3, 4, 5, 6].map(() => newAccount()))

    const create = (name: string) => fixture.algorand.send.assetCreate({
      ...as(admin), total: 10n ** 15n, decimals: 6, assetName: name, unitName: name,
    })
    akta = (await create('AKTA')).assetId
    usdc = (await create('USDC')).assetId

    dao = (await fixture.algorand.client.getTypedAppFactory(MockInferenceDaoFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
      .send.create.create({ args: { akta } })).appClient
    await dao.send.setInferenceFees({ args: { chargePercentage: FEE, providerBond: BOND } })
    subscriptions = (await fixture.algorand.client.getTypedAppFactory(MockInferenceSubscriptionsFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
      .send.create.bare()).appClient
    await subscriptions.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    await dao.send.setApps({ args: { subscriptions: subscriptions.appId, wallet: 0n } })

    const factory = fixture.algorand.client.getTypedAppFactory(InferenceNetworkFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
    const { appClient } = await factory.send.create.create({
      args: { version: 'test', akitaDao: dao.appId, admin: admin.addr.toString(), treasury: treasury.addr.toString() },
    })
    client = appClient
    appAddress = client.appAddress
    await client.appClient.fundAppAccount({ amount: microAlgo(100_000) })

    for (const asset of [akta, usdc]) {
      await client.send.optIn({ args: { payment: storage(admin, 100_000n), asset }, extraFee: microAlgo(1_000) })
    }
    for (const who of [owner, claimer, payout, payer, stranger, treasury]) {
      await optInTo(who, akta)
      await optInTo(who, usdc)
    }
    await fund(owner, akta, 10_000n)
    await fund(payer, usdc, 10_000_000n)
    await fund(payer, akta, 10_000n)

    // Tickets come only from Akita wallets: a real DAO and wallet factory, and InferencePlugin.
    const { appClient: mbr } = await fixture.algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: admin.addr, defaultSigner: admin.signer }).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const akitaDao = await deployAkitaDAO({ fixture, sender: admin.addr.toString(), signer: admin.signer, apps: {} })
    const escrowFactory = await deployEscrowFactory({ fixture, sender: admin.addr.toString(), signer: admin.signer })
    walletFactory = await deployAbstractedAccountFactory({
      fixture, sender: admin.addr.toString(), signer: admin.signer, args: { akitaDao: akitaDao.appId, escrowFactory: escrowFactory.appId },
    })
    await dao.send.setApps({ args: { subscriptions: subscriptions.appId, wallet: walletFactory.appId } })
    // An admin execution needs no policy, so the registry is never read here.
    const { appClient: pluginClient } = await fixture.algorand.client.getTypedAppFactory(InferencePluginFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
      .send.create.create({ args: { registry: dao.appId } })
    plugin = new InferencePluginSDK({ algorand: fixture.algorand, factoryParams: { appId: pluginClient.appId, defaultSender: admin.addr.toString(), defaultSigner: admin.signer } })
    buyer = await newMember()
    return () => {
      if (previousMbrApp === undefined) delete process.env.WALLET_MBR_APP_ID
      else process.env.WALLET_MBR_APP_ID = previousMbrApp
    }
  })

  describe('settings', () => {
    test('only the admin may change them, within range', async () => {
      const settings = { unbondDelay: UNBOND_DELAY, settleWindow: SETTLE_WINDOW, openRegistration: false }
      await expect(client.send.setSettings({ ...as(stranger), args: { settings } })).rejects.toThrow(/errInad/)
      await expect(client.send.setSettings({ args: { settings: { ...settings, settleWindow: 60n } } })).rejects.toThrow(/errInbw/)
      await expect(client.send.setSettings({ args: { settings: { ...settings, unbondDelay: 86_400n } } })).rejects.toThrow(/errInbw/)
      await client.send.setSettings({ args: { settings } })
      expect(await client.state.global.settings()).toMatchObject(settings)
    })

    test('payment assets each pay for their own box', async () => {
      const before = await minBalance()
      await client.send.setPaymentAsset({ args: { payment: storage(admin, ASSET_MBR), asset: usdc, allowed: true } })
      await client.send.setPaymentAsset({ args: { payment: storage(admin, ASSET_MBR), asset: 0n, allowed: true } })
      expect(await minBalance() - before).toBe(2n * ASSET_MBR)
      await expect(client.send.setPaymentAsset({ ...as(stranger), args: { payment: storage(stranger, 0n), asset: usdc, allowed: false } }))
        .rejects.toThrow(/errInad/)
    })
  })

  describe('providers', () => {
    const uri = 'https://inference.akita.community/.well-known/provider.json'

    test('register with at least the DAO bond in AKTA; while registration is closed the provider waits', async () => {
      expect((await client.send.providerCost({ args: { metadata: uri } })).return).toBe(PROVIDER_MBR + metadataMbr(uri))
      await expect(client.send.registerProvider({
        ...as(owner),
        args: { payment: storage(owner, PROVIDER_MBR + metadataMbr(uri)), bond: transfer(owner, akta, BOND - 1n), claimer: claimer.addr.toString(), payout: payout.addr.toString(), metadata: uri },
      })).rejects.toThrow(/errInbl/)
      await expect(client.send.registerProvider({
        ...as(payer),
        args: { payment: storage(payer, PROVIDER_MBR + metadataMbr(uri)), bond: transfer(payer, usdc, 1_000n), claimer: claimer.addr.toString(), payout: payout.addr.toString(), metadata: uri },
      })).rejects.toThrow(/errInbd/)

      const before = await minBalance()
      const result = await client.send.registerProvider({
        ...as(owner),
        args: { payment: storage(owner, PROVIDER_MBR + metadataMbr(uri)), bond: transfer(owner, akta, 1_000n), claimer: claimer.addr.toString(), payout: payout.addr.toString(), metadata: uri },
      })
      provider = result.return!
      expect(await minBalance() - before).toBe(PROVIDER_MBR + metadataMbr(uri))
      const info = (await client.send.getProvider({ args: { provider } })).return!
      expect(info).toMatchObject({ owner: owner.addr.toString(), claimer: claimer.addr.toString(), bond: 1_000n, bondAsset: akta, status: 0n })
    })

    test('a pending provider takes no tickets until the admin activates it', async () => {
      await expect(open(buyer, 0n, 1_000n)).rejects.toThrow(/errInpi/)
      await expect(client.send.setProviderStatus({ ...as(owner), args: { provider, status: 1n } })).rejects.toThrow(/errInad/)
      await client.send.setProviderStatus({ args: { provider, status: 1n } })
      expect((await client.send.getProvider({ args: { provider } })).return!.status).toBe(1n)
    })

    test('the owner can publish an attestation and change metadata, nobody else can', async () => {
      const attestation = { kind: 1n, measurement: new Uint8Array(32).fill(7), encryptionKey: new Uint8Array(32).fill(9) }
      await expect(client.send.setAttestation({ ...as(stranger), args: { payment: storage(stranger, ATTESTATION_MBR), provider, attestation } }))
        .rejects.toThrow(/errInow/)
      const before = await minBalance()
      await client.send.setAttestation({ ...as(owner), args: { payment: storage(owner, ATTESTATION_MBR), provider, attestation } })
      expect(await minBalance() - before).toBe(ATTESTATION_MBR)

      const shorter = 'ipfs://provider'
      const ownerBefore = await balance(owner.addr, 0n)
      await client.send.setMetadata({ ...as(owner), args: { payment: storage(owner, metadataMbr(shorter)), provider, metadata: shorter }, extraFee: microAlgo(1_000) })
      expect(await minBalance() - before).toBe(ATTESTATION_MBR + metadataMbr(shorter) - metadataMbr(uri))
      expect(await balance(owner.addr, 0n) - ownerBefore).toBe(metadataMbr(uri) - metadataMbr(shorter) - 3_000n)
    })
  })

  describe('tickets', () => {
    let ticket: bigint

    test('only an Akita wallet opens a ticket; it locks the max price and is the wallet\'s', async () => {
      // a plain account, calling directly
      await expect(client.send.open({
        ...as(payer),
        args: { payment: storage(payer, TICKET_MBR), lock: transfer(payer, usdc, 1_000n), provider, asset: usdc, request: request(1), wallet: 0n },
      })).rejects.toThrow(/errInwl/)
      // a wallet hint from a top-level call is refused too
      await expect(client.send.open({
        ...as(payer),
        args: { payment: storage(payer, TICKET_MBR), lock: transfer(payer, usdc, 1_000n), provider, asset: usdc, request: request(1), wallet: buyer.id },
      })).rejects.toThrow()
      await expect(open(buyer, 0n, 0n)).rejects.toThrow(/errInzc/)

      const before = await minBalance()
      const walletBefore = await balance(algosdk.Address.fromString(buyer.address), 0n)
      ticket = await open(buyer, 0n, 500_000n)
      expect(await minBalance() - before).toBe(TICKET_MBR)
      expect(walletBefore - await balance(algosdk.Address.fromString(buyer.address), 0n)).toBe(500_000n + TICKET_MBR)
      const info = (await client.send.getTicket({ args: { ticket } })).return!
      expect(info).toMatchObject({
        payer: buyer.address, principal: buyer.address, wallet: buyer.id, provider, asset: 0n, amount: 500_000n, feePercentage: FEE, pool: 0n,
      })
    })

    test('the claim account settles at the actual cost; the fee stays and the rest goes back', async () => {
      await expect(client.send.settle({ ...as(stranger), args: { ticket, cost: 300_000n }, ...settleFee })).rejects.toThrow(/errIncl/)
      await expect(client.send.settle({ ...as(claimer), args: { ticket, cost: 500_001n }, ...settleFee })).rejects.toThrow(/errInol/)

      const wallet = algosdk.Address.fromString(buyer.address)
      const walletBefore = await balance(wallet, 0n)
      const payoutBefore = await balance(payout.addr, 0n)
      const mbrBefore = await minBalance()
      const result = await client.send.settle({ ...as(claimer), args: { ticket, cost: 300_000n }, ...settleFee })
      expect(result.return).toBe(270_000n)
      expect(await balance(payout.addr, 0n) - payoutBefore).toBe(270_000n)
      expect(await balance(wallet, 0n) - walletBefore).toBe(200_000n + TICKET_MBR)
      expect(mbrBefore - await minBalance()).toBe(TICKET_MBR)
      expect((await client.state.box.assets.value(0n))!.fees).toBe(30_000n)
      await expect(client.send.settle({ ...as(claimer), args: { ticket, cost: 1n }, ...settleFee })).rejects.toThrow(/errInnt/)
    })

    test('a ticket keeps the fee it opened with', async () => {
      const t = await open(buyer, 0n, 100_000n, 2)
      await dao.send.setInferenceFees({ args: { chargePercentage: 5_000n, providerBond: BOND } })
      const late = await open(buyer, 0n, 100_000n, 3)
      expect((await client.send.getTicket({ args: { ticket: late } })).return!.feePercentage).toBe(2_000n) // capped at 20%
      await dao.send.setInferenceFees({ args: { chargePercentage: FEE, providerBond: BOND } })
      const before = await balance(payout.addr, 0n)
      await client.send.settle({ ...as(claimer), args: { ticket: t, cost: 100_000n }, ...settleFee })
      expect(await balance(payout.addr, 0n) - before).toBe(90_000n)
      await client.send.settle({ ...as(claimer), args: { ticket: late, cost: 100_000n }, ...settleFee })
      expect(await balance(payout.addr, 0n) - before).toBe(90_000n + 80_000n)
      expect((await client.state.box.assets.value(0n))!.fees).toBe(60_000n)
    })

    test('an unsettled ticket is refunded in full after the window, and can no longer be settled', async () => {
      const t = await open(buyer, 0n, 40_000n, 4)
      await expect(client.send.refundExpired({ ...as(stranger), args: { ticket: t }, ...settleFee })).rejects.toThrow(/errInnx/)
      await warp.timeWarp(SETTLE_WINDOW + 10n)
      await expect(client.send.settle({ ...as(claimer), args: { ticket: t, cost: 1n }, ...settleFee })).rejects.toThrow(/errInex/)
      const wallet = algosdk.Address.fromString(buyer.address)
      const before = await balance(wallet, 0n)
      await client.send.refundExpired({ ...as(stranger), args: { ticket: t }, ...settleFee })
      expect(await balance(wallet, 0n) - before).toBe(40_000n + TICKET_MBR)
    })

    test('fees sweep to the treasury', async () => {
      const before = await balance(treasury.addr, 0n)
      await client.send.sweepFees({ ...as(stranger), args: { asset: 0n }, extraFee: microAlgo(1_000) })
      expect(await balance(treasury.addr, 0n) - before).toBe(60_000n)
      expect((await client.state.box.assets.value(0n))!.fees).toBe(0n)
    })
  })

  describe('sponsor pools', () => {
    const PER_PAYMENT = 100_000n
    const SERVICE = 3n
    const MONTH = 30n * 86_400n
    let pool: bigint
    let merchant: Signer
    let member: Member
    let outsider: Member
    const addr = (m: Member) => algosdk.Address.fromString(m.address)
    const sub = (m: Member, id: bigint) => ({ address: m.address, id })
    const subBox = (m: Member, id: bigint) => new Uint8Array([...Buffer.from('s'), ...addr(m).publicKey, ...algosdk.encodeUint64(id)])
    const shutdownBox = () => new Uint8Array([...Buffer.from('x'), ...merchant.addr.publicKey, ...algosdk.encodeUint64(SERVICE)])
    const subscribe = (m: Member, id: bigint, service = SERVICE) => subscriptions.send.subscribe({
      args: { key: sub(m, id), recipient: merchant.addr.toString(), serviceId: service, interval: MONTH }, boxReferences: [subBox(m, id)],
    })
    const pay = (m: Member, id: bigint) => subscriptions.send.pay({ args: { key: sub(m, id) }, boxReferences: [subBox(m, id)] })
    /** The wallet opens a pool ticket through InferencePlugin.openPooled. */
    const pooled = async (m: Member, maxPrice: bigint, id: number, subscription = sub(m, 1n)) => {
      await m.wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [plugin.openPooled({ network: client.appId, pool, provider, maxPrice, request: request(id), subscription })],
      })
      return lastTicket()
    }
    const usage = async (m: Member, id = 1n) => (await client.send.poolUsage({ args: { pool, subscription: sub(m, id) } })).return!
    const settlePooled = (t: bigint, cost: bigint, m: Member, id = 1n) => client.send.settle(
      { ...as(claimer), args: { ticket: t, cost }, ...settleFee, ...settleRefs(t, usdc, { id: pool, subscriber: addr(m), subscription: id }) },
      { populateAppCallResources: false },
    )
    // A direct pool ticket reads the subscription with two inner calls and touches more than one
    // transaction's references, so the group carries a second call to share them.
    const subFee = { extraFee: microAlgo(2_000) }
    const withRoom = (who: Signer, id: number) => ({ ...as(who), args: { pool }, note: `room ${id}` })

    test('a sponsor creates a pool for a subscription service and funds it; its storage comes from the pool credit', async () => {
      merchant = await newAccount(1)
      ;[member, outsider] = [await newMember(5n), await newMember(5n)]
      const credit = 1_000_000n
      const create = (payment: bigint, serviceId: bigint) => client.send.createPool({
        args: {
          payment: storage(admin, payment), asset: usdc, allocator: payout.addr.toString(), merchant: merchant.addr.toString(),
          serviceId, perPayment: PER_PAYMENT,
        },
      })
      await expect(create(POOL_MBR - 1n, SERVICE)).rejects.toThrow(/errInbp/)
      await expect(create(POOL_MBR, 0n)).rejects.toThrow(/errInpe/)
      await expect(client.send.createPool({
        args: { payment: storage(admin, POOL_MBR), asset: akta, allocator: payout.addr.toString(), merchant: merchant.addr.toString(), serviceId: SERVICE, perPayment: 1n },
      })).rejects.toThrow(/errInxa/) // not a payment asset
      const before = await minBalance()
      pool = (await create(POOL_MBR + credit, SERVICE)).return!
      expect(await minBalance() - before).toBe(POOL_MBR)
      await client.send.fundPool({ ...as(payer), args: { pool, transfer: transfer(payer, usdc, 500_000n) } })
      expect((await client.send.getPool({ args: { pool } })).return).toMatchObject({
        sponsor: admin.addr.toString(), merchant: merchant.addr.toString(), serviceId: SERVICE, balance: 500_000n, credit, perPayment: PER_PAYMENT,
      })
      await subscribe(member, 1n)
      await subscribe(outsider, 1n, 4n) // another service
    })

    test('a subscriber\'s wallet opens tickets paid from the pool, up to what their payment gives; the ticket is theirs', async () => {
      // only through a wallet
      await expect(client.newGroup()
        .openPooled({ ...as(payer), ...subFee, args: { pool, provider, maxPrice: 1n, request: request(18), subscription: sub(member, 1n), wallet: 0n } })
        .getPool(withRoom(payer, 18))
        .send()).rejects.toThrow(/errInwl/)
      await expect(pooled(buyer, 10_000n, 19, sub(buyer, 1n))).rejects.toThrow(/errInns/) // no subscription
      await expect(pooled(outsider, 10_000n, 20)).rejects.toThrow(/errInns/) // the wrong service
      await expect(pooled(outsider, 10_000n, 20, sub(member, 1n))).rejects.toThrow(/errInpd/) // someone else's
      const walletBefore = await balance(addr(member), 0n)
      const t = await pooled(member, 60_000n, 21)
      expect(await balance(addr(member), 0n)).toBe(walletBefore)
      expect((await client.send.getTicket({ args: { ticket: t } })).return!).toMatchObject({
        payer: member.address, principal: member.address, wallet: member.id, pool, subscription: 1n, amount: 60_000n,
      })
      expect((await usage(member)).used).toBe(60_000n)
      await expect(pooled(member, 40_001n, 22)).rejects.toThrow(/errInpx/)
      expect((await client.send.getPool({ args: { pool } })).return).toMatchObject({
        balance: 440_000n, credit: 1_000_000n - USAGE_MBR - TICKET_MBR,
      })

      // settled at 20_000: the provider is paid, and the rest goes back to the pool and the subscription's allowance
      await settlePooled(t, 20_000n, member)
      expect(await balance(addr(member), 0n)).toBe(walletBefore)
      expect((await client.send.getPool({ args: { pool } })).return).toMatchObject({ balance: 480_000n, credit: 1_000_000n - USAGE_MBR })
      expect((await usage(member)).used).toBe(20_000n)
    })

    test('each subscription payment starts the allowance over; a lapsed or shut down subscription gets nothing', async () => {
      await expect(pooled(member, 80_001n, 23)).rejects.toThrow(/errInpx/)
      await warp.timeWarp(MONTH)
      await pay(member, 1n)
      const t = await pooled(member, PER_PAYMENT, 24)
      expect((await usage(member)).used).toBe(PER_PAYMENT)
      await settlePooled(t, PER_PAYMENT, member)

      await subscriptions.send.setShutdown({ args: { address: merchant.addr.toString(), id: SERVICE, shutdown: true }, boxReferences: [shutdownBox()] })
      await expect(pooled(member, 1n, 25)).rejects.toThrow(/errInns/)
      await subscriptions.send.setShutdown({ args: { address: merchant.addr.toString(), id: SERVICE, shutdown: false }, boxReferences: [shutdownBox()] })
      await subscriptions.send.setLastPayment({ args: { key: sub(member, 1n), lastPayment: 1n }, boxReferences: [subBox(member, 1n)] })
      await expect(pooled(member, 1n, 26)).rejects.toThrow(/errInns/)
      await pay(member, 1n)
    })

    test('the allocator opens pool tickets for a subscriber\'s wallet, and nobody else can', async () => {
      await subscribe(outsider, 2n)
      const open = async (who: Signer, account: string, memberWallet: bigint, subscription: { address: string; id: bigint }, maxPrice: bigint, id: number) =>
        (await client.newGroup()
          .openSponsored({ ...as(who), ...subFee, args: { pool, member: account, memberWallet, provider, maxPrice, request: request(id), subscription } })
          .getPool(withRoom(who, id))
          .send()).returns[0] as bigint
      await expect(open(stranger, outsider.address, outsider.id, sub(outsider, 2n), 10_000n, 30)).rejects.toThrow(/errInpd/)
      await expect(open(payout, outsider.address, 0n, sub(outsider, 2n), 10_000n, 30)).rejects.toThrow(/errInwl/) // not a wallet
      await expect(open(payout, outsider.address, member.id, sub(outsider, 2n), 10_000n, 30)).rejects.toThrow(/errInwl/) // not its wallet
      await expect(open(payout, outsider.address, outsider.id, sub(member, 1n), 10_000n, 30)).rejects.toThrow(/errInpd/)
      const t = await open(payout, outsider.address, outsider.id, sub(outsider, 2n), PER_PAYMENT, 31)
      expect((await client.send.getTicket({ args: { ticket: t } })).return!).toMatchObject({
        principal: outsider.address, wallet: outsider.id, subscription: 2n,
      })
      await expect(open(payout, outsider.address, outsider.id, sub(outsider, 2n), 1n, 32)).rejects.toThrow(/errInpx/)
      // an unsettled pool ticket is refunded to the pool and the allowance
      await warp.timeWarp(SETTLE_WINDOW + 10n)
      await client.send.refundExpired({ ...as(stranger), args: { ticket: t } })
      expect((await usage(outsider, 2n)).used).toBe(0n)
    })

    test('only the sponsor changes or empties the pool', async () => {
      await expect(client.send.updatePool({ ...as(stranger), args: { pool, allocator: stranger.addr.toString(), perPayment: 1n } }))
        .rejects.toThrow(/errInsp/)
      await client.send.updatePool({ args: { pool, allocator: payout.addr.toString(), perPayment: 0n } })
      await expect(pooled(member, 1n, 50)).rejects.toThrow(/errInpx/)
      const info = (await client.send.getPool({ args: { pool } })).return!
      await expect(client.send.withdrawPool({ ...as(stranger), args: { pool, amount: 1n, credit: 0n } })).rejects.toThrow(/errInsp/)
      const before = await balance(admin.addr, usdc)
      await client.send.withdrawPool({ args: { pool, amount: info.balance, credit: info.credit }, extraFee: microAlgo(2_000) })
      expect(await balance(admin.addr, usdc) - before).toBe(info.balance)
    })
  })

  describe('bonds', () => {
    test('the admin can pause a provider and slash its bond to anyone it names', async () => {
      const open1 = await open(buyer, 0n, 10_000n, 5)
      await client.send.setProviderStatus({ args: { provider, status: 2n } })
      await expect(open(buyer, 0n, 1_000n, 6)).rejects.toThrow(/errInpi/)
      // a paused provider can still settle what it served
      await client.send.settle({ ...as(claimer), args: { ticket: open1, cost: 10_000n }, ...settleFee })
      await expect(client.send.slash({ args: { provider, amount: 1_001n, receiver: payer.addr.toString() } })).rejects.toThrow(/errInsh/)
      await expect(client.send.slash({ ...as(stranger), args: { provider, amount: 1n, receiver: stranger.addr.toString() } })).rejects.toThrow(/errInad/)
      const before = await balance(payer.addr, akta)
      await client.send.slash({ args: { provider, amount: 400n, receiver: payer.addr.toString() }, extraFee: microAlgo(1_000) })
      expect(await balance(payer.addr, akta) - before).toBe(400n)
      await client.send.setProviderStatus({ args: { provider, status: 1n } })
    })

    test('a provider leaves after the unbonding delay with what is left of its bond', async () => {
      await client.send.addBond({ ...as(owner), args: { provider, bond: transfer(owner, akta, 100n) } })
      await expect(client.send.beginUnbond({ ...as(stranger), args: { provider } })).rejects.toThrow(/errInow/)
      await client.send.beginUnbond({ ...as(owner), args: { provider } })
      await expect(open(buyer, 0n, 1_000n, 7)).rejects.toThrow(/errInpi/)
      await expect(client.send.withdrawBond({ ...as(owner), args: { provider }, extraFee: microAlgo(1_000) })).rejects.toThrow(/errInub/)

      await warp.timeWarp(UNBOND_DELAY + 10n)
      const before = await balance(owner.addr, akta)
      await client.send.withdrawBond({ ...as(owner), args: { provider }, extraFee: microAlgo(1_000) })
      expect(await balance(owner.addr, akta) - before).toBe(700n)
      expect((await client.send.getProvider({ args: { provider } })).return).toMatchObject({ status: 4n, bond: 0n })
      await expect(client.send.setProviderStatus({ args: { provider, status: 1n } })).rejects.toThrow(/errInbs/)
    })

    test('with registration open, a new provider is active at once', async () => {
      const settings = { ...(await client.state.global.settings())!, openRegistration: true }
      await client.send.setSettings({ args: { settings } })
      const uri = 'ipfs://second'
      await fund(stranger, akta, BOND)
      const result = await client.send.registerProvider({
        ...as(stranger),
        args: { payment: storage(stranger, PROVIDER_MBR + metadataMbr(uri)), bond: transfer(stranger, akta, BOND), claimer: stranger.addr.toString(), payout: stranger.addr.toString(), metadata: uri },
      })
      expect((await client.send.getProvider({ args: { provider: result.return! } })).return).toMatchObject({ status: 1n, bond: BOND })
    })
  })
})
