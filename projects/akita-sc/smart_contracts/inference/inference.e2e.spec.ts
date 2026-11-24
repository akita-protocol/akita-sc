import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { Account, Address, TransactionSigner } from 'algosdk'
import algosdk from 'algosdk'
import { createPrivateKey, generateKeyPairSync, KeyObject, sign } from 'node:crypto'
import { beforeAll, describe, expect, test } from 'vitest'
import { TimeWarp } from '../../tests/utils/time'
import { InferenceNetworkClient, InferenceNetworkFactory } from '../artifacts/inference/InferenceNetworkClient'

const DOMAIN = 'akita/inference/v1'
const CLOSE_WINDOW = 3_600n
const UNBOND_DELAY = 30n * 86_400n
const FEE_BPS = 1_000n
const MIN_BOND = 100n

/** Box MBR = 2_500 + 400 * (key + value); the same numbers as constants.ts, checked against algod below. */
const PROVIDER_MBR = 2_500n + 400n * (9n + 32n * 3n + 8n * 4n)
const CHANNEL_MBR = 2_500n + 400n * (9n + 32n + 32n + 8n * 6n)
const ASSET_MBR = 2_500n + 400n * (9n + 8n + 8n)
const ATTESTATION_MBR = 2_500n + 400n * (9n + 8n + 32n + 32n)
const metadataMbr = (uri: string) => 2_500n + 400n * (9n + BigInt(Buffer.byteLength(uri)))

type Signer = { addr: Address; signer: TransactionSigner }

function sessionKey(): { publicKey: Uint8Array; privateKey: KeyObject } {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519')
  const jwk = publicKey.export({ format: 'jwk' })
  return { publicKey: new Uint8Array(Buffer.from(jwk.x!, 'base64url')), privateKey }
}

function receipt(appId: bigint, channel: bigint, total: bigint): Uint8Array {
  return new Uint8Array(Buffer.concat([
    Buffer.from(DOMAIN), algosdk.encodeUint64(appId), algosdk.encodeUint64(channel), algosdk.encodeUint64(total),
  ]))
}

function signReceipt(key: KeyObject, appId: bigint, channel: bigint, total: bigint): Uint8Array {
  return new Uint8Array(sign(null, receipt(appId, channel, total), key))
}

describe('InferenceNetwork', () => {
  const fixture = algorandFixture()
  let admin: Signer
  let treasury: Signer
  let owner: Signer
  let claimer: Signer
  let payout: Signer
  let payer: Signer
  let stranger: Signer
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
  const deposit = (who: Signer, asset: bigint, amount: bigint) => asset === 0n
    ? fixture.algorand.createTransaction.payment({ ...as(who), receiver: appAddress, amount: microAlgo(amount) })
    : fixture.algorand.createTransaction.assetTransfer({ ...as(who), receiver: appAddress, assetId: asset, amount })
  // ensureBudget pays its op-ups from the group's fee credit; the claim's payout is one more inner.
  const claimFee = { extraFee: microAlgo(6_000) }
  const newAccount = async (algo = 50): Promise<Signer> => {
    const account = await fixture.context.generateAccount({ initialFunds: microAlgo(algo * 1_000_000) })
    return { addr: account.addr, signer: account.signer }
  }
  const optInTo = async (who: Signer, asset: bigint) =>
    fixture.algorand.send.assetOptIn({ ...as(who), assetId: asset })
  const fund = async (who: Signer, asset: bigint, amount: bigint) =>
    fixture.algorand.send.assetTransfer({ ...as(admin), receiver: who.addr, assetId: asset, amount })

  async function openChannel(who: Signer, asset: bigint, amount: bigint, key: Uint8Array, to = provider) {
    const result = await client.send.open({
      ...as(who),
      args: { payment: storage(who, CHANNEL_MBR), deposit: deposit(who, asset, amount), provider: to, asset, sessionKey: key },
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

    const factory = fixture.algorand.client.getTypedAppFactory(InferenceNetworkFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
    const { appClient } = await factory.send.create.create({
      args: { version: 'test', akitaDao: 0n, admin: admin.addr.toString(), treasury: treasury.addr.toString() },
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
    await fund(stranger, usdc, 10_000_000n)
  })

  describe('settings', () => {
    test('only the admin may change them, and the fee stays under its ceiling', async () => {
      const settings = { feeBps: FEE_BPS, bondAsset: akta, minBond: MIN_BOND, unbondDelay: UNBOND_DELAY, closeWindow: CLOSE_WINDOW, openRegistration: false }
      await expect(client.send.setSettings({ ...as(stranger), args: { settings } })).rejects.toThrow(/errInad/)
      await expect(client.send.setSettings({ args: { settings: { ...settings, feeBps: 2_001n } } })).rejects.toThrow(/errInfh/)
      await expect(client.send.setSettings({ args: { settings: { ...settings, closeWindow: 60n } } })).rejects.toThrow(/errInbw/)
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

    test('register with a bond; while registration is closed the provider waits for the admin', async () => {
      expect((await client.send.providerCost({ args: { metadata: uri } })).return).toBe(PROVIDER_MBR + metadataMbr(uri))
      await expect(client.send.registerProvider({
        ...as(owner),
        args: { payment: storage(owner, PROVIDER_MBR + metadataMbr(uri)), bond: deposit(owner, akta, MIN_BOND - 1n), claimer: claimer.addr.toString(), payout: payout.addr.toString(), metadata: uri },
      })).rejects.toThrow(/errInbl/)

      const before = await minBalance()
      const result = await client.send.registerProvider({
        ...as(owner),
        args: { payment: storage(owner, PROVIDER_MBR + metadataMbr(uri)), bond: deposit(owner, akta, 1_000n), claimer: claimer.addr.toString(), payout: payout.addr.toString(), metadata: uri },
      })
      provider = result.return!
      expect(await minBalance() - before).toBe(PROVIDER_MBR + metadataMbr(uri))
      const info = (await client.send.getProvider({ args: { provider } })).return!
      expect(info).toMatchObject({ owner: owner.addr.toString(), claimer: claimer.addr.toString(), bond: 1_000n, bondAsset: akta, status: 0n })
    })

    test('a pending provider takes no channels until the admin activates it', async () => {
      const key = sessionKey()
      await expect(openChannel(payer, usdc, 1_000n, key.publicKey)).rejects.toThrow(/errInpi/)
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
      // got the old deposit back, paid the new one and two fees
      expect(await balance(owner.addr, 0n) - ownerBefore).toBe(metadataMbr(uri) - metadataMbr(shorter) - 3_000n)
    })
  })

  describe('channels', () => {
    const key = sessionKey()
    let channel: bigint

    test('a payer opens a channel with a deposit and a session key', async () => {
      await expect(openChannel(payer, akta, 1_000n, key.publicKey)).rejects.toThrow(/errInaa/)
      await expect(openChannel(payer, usdc, 1_000n, new Uint8Array(32))).rejects.toThrow(/errInsk/)
      // the deposit must come from the caller
      await expect(client.send.open({
        ...as(payer),
        args: { payment: storage(payer, CHANNEL_MBR), deposit: deposit(stranger, usdc, 1_000n), provider, asset: usdc, sessionKey: key.publicKey },
      })).rejects.toThrow(/errInbd/)

      const before = await minBalance()
      channel = await openChannel(payer, usdc, 1_000_000n, key.publicKey)
      expect(await minBalance() - before).toBe(CHANNEL_MBR)
      const info = (await client.send.getChannel({ args: { channel } })).return!
      expect(info).toMatchObject({ payer: payer.addr.toString(), provider, asset: usdc, deposit: 1_000_000n, claimed: 0n, feeBps: FEE_BPS, closeAt: 0n })
    })

    test('the receipt message matches what the app signs', async () => {
      const message = (await client.send.receiptMessage({ args: { channel, total: 123n } })).return!
      expect(Buffer.from(message)).toEqual(Buffer.from(receipt(client.appId, channel, 123n)))
    })

    test('the claim account claims a receipt; the fee stays in the app', async () => {
      const signature = signReceipt(key.privateKey, client.appId, channel, 300_000n)
      await expect(client.send.claim({ ...as(stranger), args: { channel, total: 300_000n, signature }, ...claimFee })).rejects.toThrow(/errIncl/)
      const forged = signReceipt(sessionKey().privateKey, client.appId, channel, 300_000n)
      await expect(client.send.claim({ ...as(claimer), args: { channel, total: 300_000n, signature: forged }, ...claimFee })).rejects.toThrow(/errInbg/)
      const tooMuch = signReceipt(key.privateKey, client.appId, channel, 1_000_001n)
      await expect(client.send.claim({ ...as(claimer), args: { channel, total: 1_000_001n, signature: tooMuch }, ...claimFee })).rejects.toThrow(/errInod/)

      const result = await client.send.claim({ ...as(claimer), args: { channel, total: 300_000n, signature }, ...claimFee })
      expect(result.return).toBe(270_000n)
      expect(await balance(payout.addr, usdc)).toBe(270_000n)
      expect((await client.state.box.assets.value(usdc))!.fees).toBe(30_000n)

      // the same receipt, or an older one, pays nothing again
      await expect(client.send.claim({ ...as(claimer), args: { channel, total: 300_000n, signature }, ...claimFee })).rejects.toThrow(/errInsr/)
      const older = signReceipt(key.privateKey, client.appId, channel, 200_000n)
      await expect(client.send.claim({ ...as(claimer), args: { channel, total: 200_000n, signature: older }, ...claimFee })).rejects.toThrow(/errInsr/)
    })

    test('a receipt for another channel does not pay on this one', async () => {
      const other = await openChannel(payer, usdc, 1_000_000n, key.publicKey)
      const signature = signReceipt(key.privateKey, client.appId, other, 400_000n)
      await expect(client.send.claim({ ...as(claimer), args: { channel, total: 400_000n, signature }, ...claimFee })).rejects.toThrow(/errInbg/)
      await client.send.requestClose({ ...as(payer), args: { channel: other } })
      await client.send.settleAndClose({ ...as(claimer), args: { channel: other, total: 0n, signature: new Uint8Array(64) }, extraFee: microAlgo(2_000) })
    })

    test('anyone can top up, and the claim only pays the increase', async () => {
      await client.send.topUp({ ...as(stranger), args: { channel, deposit: deposit(stranger, usdc, 500_000n) } })
      expect((await client.send.getChannel({ args: { channel } })).return!.deposit).toBe(1_500_000n)
      const signature = signReceipt(key.privateKey, client.appId, channel, 1_100_000n)
      const result = await client.send.claim({ ...as(claimer), args: { channel, total: 1_100_000n, signature }, ...claimFee })
      expect(result.return).toBe(720_000n)
      expect(await balance(payout.addr, usdc)).toBe(990_000n)
    })

    test('a requested close gives the provider the window, then returns the rest to the payer', async () => {
      await expect(client.send.requestClose({ ...as(stranger), args: { channel } })).rejects.toThrow(/errInpy/)
      await client.send.requestClose({ ...as(payer), args: { channel } })
      await expect(client.send.topUp({ ...as(payer), args: { channel, deposit: deposit(payer, usdc, 1n) } })).rejects.toThrow(/errIncg/)
      await expect(client.send.finalizeClose({ ...as(stranger), args: { channel } })).rejects.toThrow(/errInnz/)

      // still inside the window: the last receipt is claimed
      const signature = signReceipt(key.privateKey, client.appId, channel, 1_200_000n)
      await client.send.claim({ ...as(claimer), args: { channel, total: 1_200_000n, signature }, ...claimFee })

      await warp.timeWarp(CLOSE_WINDOW + 10n)
      const late = signReceipt(key.privateKey, client.appId, channel, 1_300_000n)
      await expect(client.send.claim({ ...as(claimer), args: { channel, total: 1_300_000n, signature: late }, ...claimFee })).rejects.toThrow(/errIncg/)

      const usdcBefore = await balance(payer.addr, usdc)
      const algoBefore = await balance(payer.addr, 0n)
      const mbrBefore = await minBalance()
      await client.send.finalizeClose({ ...as(stranger), args: { channel }, extraFee: microAlgo(2_000) })
      expect(await balance(payer.addr, usdc) - usdcBefore).toBe(300_000n)
      expect(await balance(payer.addr, 0n) - algoBefore).toBe(CHANNEL_MBR)
      expect(mbrBefore - await minBalance()).toBe(CHANNEL_MBR)
      await expect(client.send.getChannel({ args: { channel } })).rejects.toThrow(/errInnc/)
    })

    test('the provider can settle and close at once, in ALGO too', async () => {
      const algoKey = sessionKey()
      const algoChannel = await openChannel(payer, 0n, 2_000_000n, algoKey.publicKey)
      const before = await balance(payer.addr, 0n)
      const signature = signReceipt(algoKey.privateKey, client.appId, algoChannel, 500_000n)
      await expect(client.send.settleAndClose({ ...as(stranger), args: { channel: algoChannel, total: 500_000n, signature }, ...claimFee }))
        .rejects.toThrow(/errIncl/)
      await client.send.settleAndClose({ ...as(claimer), args: { channel: algoChannel, total: 500_000n, signature }, extraFee: microAlgo(8_000) })
      expect(await balance(payer.addr, 0n) - before).toBe(1_500_000n + CHANNEL_MBR)
      expect((await client.state.box.assets.value(0n))!.fees).toBe(50_000n)
    })

    test('fees sweep to the treasury', async () => {
      const before = await balance(treasury.addr, usdc)
      await client.send.sweepFees({ ...as(stranger), args: { asset: usdc }, extraFee: microAlgo(1_000) })
      expect(await balance(treasury.addr, usdc) - before).toBe(30_000n + 80_000n + 10_000n)
      expect((await client.state.box.assets.value(usdc))!.fees).toBe(0n)
    })
  })

  describe('bonds', () => {
    test('the admin can pause a provider and slash its bond to the treasury', async () => {
      await client.send.setProviderStatus({ args: { provider, status: 2n } })
      await expect(openChannel(payer, usdc, 1_000n, sessionKey().publicKey)).rejects.toThrow(/errInpi/)
      await expect(client.send.slash({ args: { provider, amount: 1_001n } })).rejects.toThrow(/errInsh/)
      const before = await balance(treasury.addr, akta)
      await client.send.slash({ args: { provider, amount: 400n }, extraFee: microAlgo(1_000) })
      expect(await balance(treasury.addr, akta) - before).toBe(400n)
      await client.send.setProviderStatus({ args: { provider, status: 1n } })
    })

    test('a provider leaves after the unbonding delay with what is left of its bond', async () => {
      await client.send.addBond({ ...as(owner), args: { provider, bond: deposit(owner, akta, 100n) } })
      await expect(client.send.beginUnbond({ ...as(stranger), args: { provider } })).rejects.toThrow(/errInow/)
      await client.send.beginUnbond({ ...as(owner), args: { provider } })
      await expect(openChannel(payer, usdc, 1_000n, sessionKey().publicKey)).rejects.toThrow(/errInpi/)
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
      await fund(stranger, akta, MIN_BOND)
      const result = await client.send.registerProvider({
        ...as(stranger),
        args: { payment: storage(stranger, PROVIDER_MBR + metadataMbr(uri)), bond: deposit(stranger, akta, MIN_BOND), claimer: stranger.addr.toString(), payout: stranger.addr.toString(), metadata: uri },
      })
      expect((await client.send.getProvider({ args: { provider: result.return! } })).return).toMatchObject({ status: 1n, bond: MIN_BOND })
    })
  })
})
