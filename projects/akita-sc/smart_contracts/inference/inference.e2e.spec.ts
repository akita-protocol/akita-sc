import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { Address, TransactionSigner } from 'algosdk'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../tests/utils/time'
import { InferenceNetworkClient, InferenceNetworkFactory } from '../artifacts/inference/InferenceNetworkClient'
import { MockInferenceDaoClient, MockInferenceDaoFactory } from '../artifacts/inference/tests/MockInferenceDAOClient'
import { MockInferenceGateClient, MockInferenceGateFactory } from '../artifacts/inference/tests/MockInferenceGateClient'

const SETTLE_WINDOW = 3_600n
const UNBOND_DELAY = 30n * 86_400n
const FEE = 1_000n // 10%
const BOND = 100n

/** Box MBR = 2_500 + 400 * (key + value); the same numbers as constants.ts, checked against algod below. */
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const TICKET_MBR = 2_500n + 400n * (9n + 32n + 8n * 7n)
const POOL_MBR = 2_500n + 400n * (9n + 32n * 2n + 8n * 6n)
const USAGE_MBR = 2_500n + 400n * (1n + 8n + 32n + 16n)
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
  let gate: MockInferenceGateClient
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
  const settleRefs = (ticket: bigint, asset: bigint, pool?: { id: bigint; member: Address }) => ({
    accountReferences: pool ? [payout.addr] : [payout.addr, payer.addr],
    assetReferences: [asset],
    boxReferences: [
      boxKey('t', ticket), boxKey('p', provider), boxKey('x', asset),
      ...(pool ? [boxKey('o', pool.id), new Uint8Array([...Buffer.from('u'), ...algosdk.encodeUint64(pool.id), ...pool.member.publicKey])] : []),
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
      args: { payment: storage(who, TICKET_MBR), lock: transfer(who, asset, amount), provider: to, asset, request: request(id) },
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
    gate = (await fixture.algorand.client.getTypedAppFactory(MockInferenceGateFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
      .send.create.bare()).appClient
    await gate.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    await dao.send.setGate({ args: { gate: gate.appId } })

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
        args: { payment: storage(stranger, TICKET_MBR), lock: transfer(payer, usdc, 1_000n), provider, asset: usdc, request: request(1) },
      })).rejects.toThrow(/errInbd/)

      const before = await minBalance()
      ticket = await open(payer, usdc, 50_000n)
      expect(await minBalance() - before).toBe(TICKET_MBR)
      const info = (await client.send.getTicket({ args: { ticket } })).return!
      expect(info).toMatchObject({ payer: payer.addr.toString(), provider, asset: usdc, amount: 50_000n, feePercentage: FEE })
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
    const PER_MEMBER = 100_000n
    const GATE_ID = 7n
    let pool: bigint
    let member: Signer
    let outsider: Signer

    const gated = async (who: Signer, maxPrice: bigint, id: number) => {
      const check = gate.params.mustCheck({ ...as(who), args: { caller: who.addr.toString(), gateId: GATE_ID, args: [] } })
      return (await client.send.openGated({ ...as(who), args: { gateTxn: check, pool, provider, maxPrice, request: request(id) } })).return!
    }

    test('a sponsor creates and funds a pool; its storage comes from the pool credit', async () => {
      ;[member, outsider] = await Promise.all([newAccount(5), newAccount(5)])
      const credit = 1_000_000n
      await expect(client.send.createPool({
        args: { payment: storage(admin, POOL_MBR - 1n), asset: usdc, allocator: claimer.addr.toString(), gate: GATE_ID, perMember: PER_MEMBER, period: 86_400n },
      })).rejects.toThrow(/errInbp/)
      const before = await minBalance()
      pool = (await client.send.createPool({
        args: { payment: storage(admin, POOL_MBR + credit), asset: usdc, allocator: payout.addr.toString(), gate: GATE_ID, perMember: PER_MEMBER, period: 86_400n },
      })).return!
      expect(await minBalance() - before).toBe(POOL_MBR)
      await client.send.fundPool({ ...as(payer), args: { pool, transfer: transfer(payer, usdc, 500_000n) } })
      expect((await client.send.getPool({ args: { pool } })).return).toMatchObject({ sponsor: admin.addr.toString(), balance: 500_000n, credit, perMember: PER_MEMBER })
      await gate.send.allow({ args: { account: member.addr.toString(), gateId: GATE_ID }, boxReferences: [member.addr.publicKey] })
    })

    test('a member who passes the gate opens tickets paid from the pool, up to the per-member amount', async () => {
      await expect(gated(outsider, 10_000n, 20)).rejects.toThrow(/errMgat/)
      const t = await gated(member, 60_000n, 21)
      const info = (await client.send.getTicket({ args: { ticket: t } })).return!
      expect(info).toMatchObject({ payer: member.addr.toString(), pool, amount: 60_000n })
      expect((await client.send.poolRemaining({ args: { pool, member: member.addr.toString() } })).return).toBe(40_000n)
      await expect(gated(member, 40_001n, 22)).rejects.toThrow(/errInpx/)
      expect((await client.send.getPool({ args: { pool } })).return).toMatchObject({
        balance: 440_000n, credit: 1_000_000n - USAGE_MBR - TICKET_MBR,
      })

      // settled at 20_000: the provider is paid, and the rest goes back to the pool and the member's allowance
      const memberBefore = await balance(member.addr, 0n)
      await client.send.settle({ ...as(claimer), args: { ticket: t, cost: 20_000n }, ...settleFee, ...settleRefs(t, usdc, { id: pool, member: member.addr }) }, { populateAppCallResources: false })
      expect(await balance(member.addr, 0n)).toBe(memberBefore)
      expect((await client.send.getPool({ args: { pool } })).return).toMatchObject({ balance: 480_000n, credit: 1_000_000n - USAGE_MBR })
      expect((await client.send.poolRemaining({ args: { pool, member: member.addr.toString() } })).return).toBe(80_000n)
    })

    test('the allocator opens pool tickets for any member, and nobody else can', async () => {
      const open = (who: Signer, forMember: Signer, maxPrice: bigint, id: number) =>
        client.send.openSponsored({ ...as(who), args: { pool, member: forMember.addr.toString(), provider, maxPrice, request: request(id) } })
      await expect(open(stranger, outsider, 10_000n, 30)).rejects.toThrow(/errInpd/)
      const t = (await open(payout, outsider, 100_000n, 31)).return!
      await expect(open(payout, outsider, 1n, 32)).rejects.toThrow(/errInpx/)
      // an unsettled pool ticket is refunded to the pool
      await warp.timeWarp(SETTLE_WINDOW + 10n)
      await client.send.refundExpired({ ...as(stranger), args: { ticket: t } })
      expect((await client.send.poolRemaining({ args: { pool, member: outsider.addr.toString() } })).return).toBe(PER_MEMBER)
    })

    test('each period starts fresh', async () => {
      expect((await client.send.poolRemaining({ args: { pool, member: member.addr.toString() } })).return).toBe(80_000n)
      await warp.timeWarp(86_400n)
      expect((await client.send.poolRemaining({ args: { pool, member: member.addr.toString() } })).return).toBe(PER_MEMBER)
      const t = await gated(member, PER_MEMBER, 40)
      await client.send.settle({ ...as(claimer), args: { ticket: t, cost: PER_MEMBER }, ...settleFee, ...settleRefs(t, usdc, { id: pool, member: member.addr }) }, { populateAppCallResources: false })
    })

    test('only the sponsor changes or empties the pool', async () => {
      await expect(client.send.updatePool({ ...as(stranger), args: { pool, allocator: stranger.addr.toString(), gate: 0n, perMember: 1n, period: 1n } }))
        .rejects.toThrow(/errInsp/)
      await client.send.updatePool({ args: { pool, allocator: payout.addr.toString(), gate: 0n, perMember: PER_MEMBER, period: 86_400n } })
      await expect(gated(member, 1_000n, 50)).rejects.toThrow(/errInpd/)
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
