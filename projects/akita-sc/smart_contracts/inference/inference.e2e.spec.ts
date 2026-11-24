import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { Address, TransactionSigner } from 'algosdk'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../tests/utils/time'
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

  async function open(who: Signer, asset: bigint, amount: bigint, id = 1, to = provider) {
    const result = await client.send.open({
      ...as(who),
      args: { payment: storage(who, TICKET_MBR), lock: transfer(who, asset, amount), provider: to, asset, request: request(id), wallet: 0n },
    })
    return result.return!
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
      await expect(open(payer, usdc, 1_000n)).rejects.toThrow(/errInpi/)
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

    test('a payer opens a ticket that locks the max price', async () => {
      await expect(open(payer, akta, 1_000n)).rejects.toThrow(/errInxa/)
      await expect(open(payer, usdc, 0n)).rejects.toThrow(/errInzc/)
      // the lock must come from the caller
      await expect(client.send.open({
        ...as(stranger),
        args: { payment: storage(stranger, TICKET_MBR), lock: transfer(payer, usdc, 1_000n), provider, asset: usdc, request: request(1), wallet: 0n },
      })).rejects.toThrow(/errInbd/)

      const before = await minBalance()
      ticket = await open(payer, usdc, 50_000n)
      expect(await minBalance() - before).toBe(TICKET_MBR)
      const info = (await client.send.getTicket({ args: { ticket } })).return!
      // a plain account is its own principal
      expect(info).toMatchObject({
        payer: payer.addr.toString(), principal: payer.addr.toString(), wallet: 0n, provider, asset: usdc, amount: 50_000n, feePercentage: FEE, pool: 0n,
      })
    })

    test('the claim account settles at the actual cost; the fee stays and the rest goes back', async () => {
      await expect(client.send.settle({ ...as(stranger), args: { ticket, cost: 30_000n }, ...settleFee })).rejects.toThrow(/errIncl/)
      await expect(client.send.settle({ ...as(claimer), args: { ticket, cost: 50_001n }, ...settleFee })).rejects.toThrow(/errInol/)

      const usdcBefore = await balance(payer.addr, usdc)
      const algoBefore = await balance(payer.addr, 0n)
      const mbrBefore = await minBalance()
      const result = await client.send.settle({ ...as(claimer), args: { ticket, cost: 30_000n }, ...settleFee, ...settleRefs(ticket, usdc) }, { populateAppCallResources: false })
      expect(result.return).toBe(27_000n)
      expect(await balance(payout.addr, usdc)).toBe(27_000n)
      expect(await balance(payer.addr, usdc) - usdcBefore).toBe(20_000n)
      expect(await balance(payer.addr, 0n) - algoBefore).toBe(TICKET_MBR)
      expect(mbrBefore - await minBalance()).toBe(TICKET_MBR)
      expect((await client.state.box.assets.value(usdc))!.fees).toBe(3_000n)
      await expect(client.send.settle({ ...as(claimer), args: { ticket, cost: 1n }, ...settleFee })).rejects.toThrow(/errInnt/)
    })

    test('a ticket keeps the fee it opened with', async () => {
      const t = await open(payer, 0n, 100_000n, 2)
      await dao.send.setInferenceFees({ args: { chargePercentage: 5_000n, providerBond: BOND } })
      const late = await open(payer, 0n, 100_000n, 3)
      expect((await client.send.getTicket({ args: { ticket: late } })).return!.feePercentage).toBe(2_000n) // capped at 20%
      await dao.send.setInferenceFees({ args: { chargePercentage: FEE, providerBond: BOND } })
      const before = await balance(payout.addr, 0n)
      await client.send.settle({ ...as(claimer), args: { ticket: t, cost: 100_000n }, ...settleFee })
      expect(await balance(payout.addr, 0n) - before).toBe(90_000n)
      await client.send.settle({ ...as(claimer), args: { ticket: late, cost: 100_000n }, ...settleFee })
      expect(await balance(payout.addr, 0n) - before).toBe(90_000n + 80_000n)
      expect((await client.state.box.assets.value(0n))!.fees).toBe(30_000n)
    })

    test('an unsettled ticket is refunded in full after the window, and can no longer be settled', async () => {
      const t = await open(payer, usdc, 40_000n, 4)
      await expect(client.send.refundExpired({ ...as(stranger), args: { ticket: t }, ...settleFee })).rejects.toThrow(/errInnx/)
      await warp.timeWarp(SETTLE_WINDOW + 10n)
      await expect(client.send.settle({ ...as(claimer), args: { ticket: t, cost: 1n }, ...settleFee })).rejects.toThrow(/errInex/)
      const before = await balance(payer.addr, usdc)
      await client.send.refundExpired({ ...as(stranger), args: { ticket: t }, ...settleFee })
      expect(await balance(payer.addr, usdc) - before).toBe(40_000n)
    })

    test('fees sweep to the treasury', async () => {
      const before = await balance(treasury.addr, usdc)
      await client.send.sweepFees({ ...as(stranger), args: { asset: usdc }, extraFee: microAlgo(1_000) })
      expect(await balance(treasury.addr, usdc) - before).toBe(3_000n)
      expect((await client.state.box.assets.value(usdc))!.fees).toBe(0n)
    })
  })

  describe('sponsor pools', () => {
    const PER_PAYMENT = 100_000n
    const SERVICE = 3n
    const MONTH = 30n * 86_400n
    let pool: bigint
    let merchant: Signer
    let member: Signer
    let outsider: Signer
    // a pool ticket reads the subscription with two inner calls
    const subFee = { extraFee: microAlgo(2_000) }
    const sub = (who: Signer, id: bigint) => ({ address: who.addr.toString(), id })
    const subBox = (who: Signer, id: bigint) => new Uint8Array([...Buffer.from('s'), ...who.addr.publicKey, ...algosdk.encodeUint64(id)])
    const subscribe = (who: Signer, id: bigint, service = SERVICE) => subscriptions.send.subscribe({
      args: { key: sub(who, id), recipient: merchant.addr.toString(), serviceId: service, interval: MONTH }, boxReferences: [subBox(who, id)],
    })
    const pay = (who: Signer, id: bigint) => subscriptions.send.pay({ args: { key: sub(who, id) }, boxReferences: [subBox(who, id)] })
    // A pool ticket touches more than one transaction's references (five boxes here, the DAO, and the
    // subscriptions app and its boxes), so the group carries a second call to share them.
    const withRoom = (who: Signer, id: number) => ({ ...as(who), args: { pool }, note: `room ${id}` })
    const pooled = async (who: Signer, maxPrice: bigint, id: number, subscription = sub(who, 1n)) =>
      (await client.newGroup()
        .openPooled({ ...as(who), ...subFee, args: { pool, provider, maxPrice, request: request(id), subscription, wallet: 0n } })
        .getPool(withRoom(who, id))
        .send()).returns[0] as bigint
    const usage = async (who: Signer, id = 1n) => (await client.send.poolUsage({ args: { pool, subscription: sub(who, id) } })).return!
    const settlePooled = (t: bigint, cost: bigint, who: Signer, id = 1n) => client.send.settle(
      { ...as(claimer), args: { ticket: t, cost }, ...settleFee, ...settleRefs(t, usdc, { id: pool, subscriber: who.addr, subscription: id }) },
      { populateAppCallResources: false },
    )

    test('a sponsor creates a pool for a subscription service and funds it; its storage comes from the pool credit', async () => {
      ;[merchant, member, outsider] = await Promise.all([newAccount(1), newAccount(5), newAccount(5)])
      const credit = 1_000_000n
      const create = (payment: bigint, serviceId: bigint) => client.send.createPool({
        args: {
          payment: storage(admin, payment), asset: usdc, allocator: payout.addr.toString(), merchant: merchant.addr.toString(),
          serviceId, perPayment: PER_PAYMENT,
        },
      })
      await expect(create(POOL_MBR - 1n, SERVICE)).rejects.toThrow(/errInbp/)
      await expect(create(POOL_MBR, 0n)).rejects.toThrow(/errInpe/)
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

    test('a subscriber opens tickets paid from the pool, up to what their payment gives; the ticket is theirs', async () => {
      await expect(pooled(stranger, 10_000n, 19)).rejects.toThrow(/errInns/) // no subscription
      await expect(pooled(outsider, 10_000n, 20)).rejects.toThrow(/errInns/) // the wrong service
      await expect(pooled(outsider, 10_000n, 20, sub(member, 1n))).rejects.toThrow(/errInpd/) // someone else's
      const t = await pooled(member, 60_000n, 21)
      expect((await client.send.getTicket({ args: { ticket: t } })).return!).toMatchObject({
        payer: member.addr.toString(), principal: member.addr.toString(), wallet: 0n, pool, subscription: 1n, amount: 60_000n,
      })
      expect((await usage(member)).used).toBe(60_000n)
      await expect(pooled(member, 40_001n, 22)).rejects.toThrow(/errInpx/)
      expect((await client.send.getPool({ args: { pool } })).return).toMatchObject({
        balance: 440_000n, credit: 1_000_000n - USAGE_MBR - TICKET_MBR,
      })

      // settled at 20_000: the provider is paid, and the rest goes back to the pool and the subscription's allowance
      const memberBefore = await balance(member.addr, 0n)
      await settlePooled(t, 20_000n, member)
      expect(await balance(member.addr, 0n)).toBe(memberBefore)
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

      await subscriptions.send.setShutdown({ args: { address: merchant.addr.toString(), id: SERVICE, shutdown: true }, boxReferences: [new Uint8Array([...Buffer.from('x'), ...merchant.addr.publicKey, ...algosdk.encodeUint64(SERVICE)])] })
      await expect(pooled(member, 1n, 25)).rejects.toThrow(/errInns/)
      await subscriptions.send.setShutdown({ args: { address: merchant.addr.toString(), id: SERVICE, shutdown: false }, boxReferences: [new Uint8Array([...Buffer.from('x'), ...merchant.addr.publicKey, ...algosdk.encodeUint64(SERVICE)])] })
      await subscriptions.send.setLastPayment({ args: { key: sub(member, 1n), lastPayment: 1n }, boxReferences: [subBox(member, 1n)] })
      await expect(pooled(member, 1n, 26)).rejects.toThrow(/errInns/)
      await pay(member, 1n)
    })

    test('the allocator opens pool tickets for a subscriber, and nobody else can', async () => {
      await subscribe(outsider, 2n)
      const open = async (who: Signer, forMember: Signer, subscription: { address: string; id: bigint }, maxPrice: bigint, id: number) =>
        ({ return: (await client.newGroup()
          .openSponsored({
            ...as(who), ...subFee, args: { pool, member: forMember.addr.toString(), memberWallet: 0n, provider, maxPrice, request: request(id), subscription },
          })
          .getPool(withRoom(who, id))
          .send()).returns[0] as bigint })
      await expect(open(stranger, outsider, sub(outsider, 2n), 10_000n, 30)).rejects.toThrow(/errInpd/)
      await expect(open(payout, outsider, sub(member, 1n), 10_000n, 30)).rejects.toThrow(/errInpd/)
      const t = (await open(payout, outsider, sub(outsider, 2n), PER_PAYMENT, 31)).return!
      expect((await client.send.getTicket({ args: { ticket: t } })).return!).toMatchObject({ principal: outsider.addr.toString(), subscription: 2n })
      await expect(open(payout, outsider, sub(outsider, 2n), 1n, 32)).rejects.toThrow(/errInpx/)
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
      const open1 = await open(payer, usdc, 10_000n, 5)
      await client.send.setProviderStatus({ args: { provider, status: 2n } })
      await expect(open(payer, usdc, 1_000n, 6)).rejects.toThrow(/errInpi/)
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
      await expect(open(payer, usdc, 1_000n, 7)).rejects.toThrow(/errInpi/)
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
