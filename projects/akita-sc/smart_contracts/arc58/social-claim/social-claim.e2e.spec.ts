import { Config } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { generateKeyPairSync, sign } from 'node:crypto'
import { ALGORAND_ZERO_ADDRESS_STRING, decodeAddress, getApplicationAddress, type TransactionSigner } from 'algosdk'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import {
  CallerType, newWallet, PayPluginSDK, SocialClaimSDK, socialClaimAttestationMessage, socialClaimGiftBoxName,
  socialClaimSubject, WalletFactorySDK, WalletSDK, WelcomePluginSDK,
} from 'akita-sdk/wallet'
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../tests/fixtures/escrow'
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay'
import { deploySelfOptInPlugin } from '../../../tests/fixtures/plugins/self-optin'
import { TimeWarp } from '../../../tests/utils/time'
import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { PayPluginClient } from '../../artifacts/arc58/plugins/pay/PayPluginClient'
import { WelcomePluginFactory } from '../../artifacts/arc58/plugins/welcome/WelcomePluginClient'
import { SocialClaimFactory } from '../../artifacts/arc58/social-claim/SocialClaimClient'

const ONE_DAY = 86_400n
const GIFT = 500_000n
const TOP_UP = 200_000n
/** 2500 + 400 * (1 + 32 + 8) */
const PENDING_MBR = 18_900n
/** 2500 + 400 * (49 + 16) */
const GIFT_MBR = 28_500n

const makeAttestor = () => {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519')
  const raw = Buffer.from(publicKey.export({ format: 'jwk' }).x as string, 'base64url')
  return {
    publicKey: new Uint8Array(raw),
    sign: (message: Uint8Array) => new Uint8Array(sign(null, message, privateKey)),
  }
}

type Account = { sender: string; signer: TransactionSigner }

describe('SocialClaim', () => {
  const fixture = algorandFixture()
  const attestor = makeAttestor()
  let factory: WalletFactorySDK
  let welcome: WelcomePluginSDK
  let pay: PayPluginSDK
  let socialClaim: SocialClaimSDK
  let wallet: WalletSDK
  let sender: string
  let signer: TransactionSigner
  let recipient: Account
  /** The manager is the beforeAll scope's test account; later scopes get new accounts. */
  let manager: Account
  // The app is shared by every test, so each test gets its own platform identities.
  let nextUserId = 1_000_000_000
  let subjectA: Uint8Array
  let subjectB: Uint8Array
  const previousMbr = process.env.WALLET_MBR_APP_ID

  afterAll(() => {
    if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbr
  })

  beforeAll(async () => {
    Config.configure({ debug: true, populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    const sender = testAccount.toString()
    const signer = testAccount.signer
    manager = { sender, signer }
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos())
    const { appClient: mbr } = await algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: sender, defaultSigner: signer,
    }).send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const escrow = await deployEscrowFactory({ fixture, sender, signer })
    const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrow.appId } })
    factory = await deployAbstractedAccountFactory({
      fixture, sender, signer, args: { akitaDao: dao.appId, escrowFactory: escrow.appId },
    })
    const { appClient: welcomeApp } = await algorand.client.getTypedAppFactory(WelcomePluginFactory, {
      defaultSender: sender, defaultSigner: signer,
    }).send.create.create({ args: { factory: factory.appId } })
    welcome = new WelcomePluginSDK({
      algorand, readerAccount: sender,
      factoryParams: { appId: welcomeApp.appId, defaultSender: sender, defaultSigner: signer },
    })
    pay = await deployPayPlugin({ fixture, sender, signer })
    const { appClient } = await algorand.client.getTypedAppFactory(SocialClaimFactory, {
      defaultSender: sender, defaultSigner: signer,
    }).send.create.create({
      args: { welcome: welcomeApp.appId, pay: pay.appId, attestor: attestor.publicKey, manager: sender },
    })
    // only the account minimum: whoever sends a gift pays for its storage (AUD-C5)
    await appClient.appClient.fundAppAccount({ amount: (100_000).microAlgos() })
    socialClaim = new SocialClaimSDK({
      algorand, readerAccount: sender,
      factoryParams: { appId: appClient.appId, defaultSender: sender, defaultSigner: signer },
    })
  })

  const newSponsor = async (nickname: string, assets: bigint[] = []) => {
    const sponsor = await newWallet({
      algorand: fixture.algorand, readerAccount: sender, nickname, assets,
      factoryParams: { appId: factory.appId, defaultSender: sender, defaultSigner: signer },
    })
    await sponsor.client.appClient.fundAppAccount({ amount: (30).algos() })
    await sponsor.addPlugin({ client: welcome, callerType: CallerType.Admin })
    await sponsor.addPlugin({ client: pay, callerType: CallerType.Admin })
    return sponsor
  }

  beforeEach(async () => {
    await fixture.newScope()
    const { algorand, testAccount, generateAccount } = fixture.context
    sender = testAccount.toString()
    signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos())
    const account = await generateAccount({ initialFunds: (1).algos() })
    recipient = { sender: account.toString(), signer: account.signer }
    subjectA = socialClaimSubject('x', String(nextUserId++))
    subjectB = socialClaimSubject('x', String(nextUserId++))
    wallet = await newSponsor('Sponsor')
    welcome.setSendParams({ sender, signer })
    pay.setSendParams({ sender, signer })
    socialClaim.setSendParams({ sender, signer })
  })

  const algod = () => fixture.algorand.client.algod
  const controlled = (sponsor: WalletSDK) => sponsor.client.appAddress.toString()
  const giftAddress = (id: bigint) => getApplicationAddress(id).toString()
  const balance = async (address: string) => (await fixture.algorand.account.getInformation(address)).balance.microAlgo
  /** Box MBR raises the app account's minimum balance, not its balance. */
  const mbr = async () => (await fixture.algorand.account.getInformation(socialClaim.address)).minBalance.microAlgo
  /** What the app holds beyond its minimum balance. Storage is paid in and returned exactly, so this stays 0. */
  const spare = async () => (await balance(socialClaim.address)) - (await mbr())
  /** `note` keeps two otherwise identical payments in one group from being the same transaction. */
  const storagePayment = (amount: bigint, note?: string) =>
    fixture.algorand.createTransaction.payment({
      sender, receiver: socialClaim.address, amount: Number(amount).microAlgos(), ...(note ? { note } : {}),
    })
  const authAddr = async (address: string) => (await fixture.algorand.account.getInformation(address)).authAddr
  const assetBalance = async (address: string, asset: bigint) =>
    (await fixture.algorand.asset.getAccountInformation(address, asset)).balance
  const latestTimestamp = async () => {
    const { lastRound } = await algod().status().do()
    return (await algod().block(lastRound).do()).block.header.timestamp
  }
  const adminOf = async (id: bigint) => (await factory.get({ appId: id })).client.state.global.admin()
  const referrerOf = async (id: bigint) => (await factory.get({ appId: id })).client.state.global.referrer()
  const boxNames = async () => (await socialClaim.client.appClient.getBoxNames()).map((b) => Buffer.from(b.nameRaw).toString('hex')).sort()
  const giftArgs = async (sponsor = wallet, asset = 0n, amount = GIFT) => ({
    nickname: 'Gift', asset, amount, maxCost: await welcome.cost({ payer: controlled(sponsor), asset, amount }),
  })
  const gift = async (subject: Uint8Array, { ttl = ONE_DAY, sponsor = wallet, asset = 0n, amount = GIFT } = {}) =>
    socialClaim.sendToAnyone({
      wallet: sponsor, welcome, gift: await giftArgs(sponsor, asset, amount), subject, ttl,
      usePlugin: { callerType: CallerType.Admin },
    })
  const topUp = async (subject: Uint8Array, { ttl = ONE_DAY, sponsor = wallet, asset = 0n, amount = TOP_UP } = {}) =>
    socialClaim.topUp({ wallet: sponsor, pay, subject, asset, amount, ttl, usePlugin: { callerType: CallerType.Admin } })
  const attest = (subject: Uint8Array, newAdmin: string, expires: bigint, key = attestor) =>
    key.sign(socialClaimAttestationMessage({ appId: socialClaim.appId, subject, newAdmin, expires }))
  const claim = async (subject: Uint8Array, { newAdmin = recipient.sender, key = attestor, prune = false } = {}) => {
    const expires = (await latestTimestamp()) + 3_600n
    return socialClaim.claim({ subject, newAdmin, expires, signature: attest(subject, newAdmin, expires, key), prune })
  }
  const stranger = async (): Promise<Account> => {
    const account = await fixture.context.generateAccount({ initialFunds: (1).algos() })
    return { sender: account.toString(), signer: account.signer }
  }
  /**
   * The sponsor's usePlugin group for one pay call with hand-built contribute calls appended, for
   * the rejection cases. `payCallIndex` defaults to the pay call's real position.
   */
  const groupWithContribute = async (
    payments: { receiver: string; asset: bigint; amount: bigint }[],
    contributes: { subject: Uint8Array; payCallIndex?: bigint; note?: string; storage?: bigint; payer?: Account }[],
    extraBefore: 'none' | 'payment' = 'none',
  ) => {
    const { group, length, sendParams } = await wallet.prepareUsePlugin({
      callerType: CallerType.Admin, calls: [pay.pay({ payments })],
    })
    expect(length).toBe(3)
    const composer = await group.composer()
    if (extraBefore === 'payment') {
      composer.addPayment({ sender, receiver: sender, amount: (0).microAlgos(), signer })
    }
    for (const { subject, payCallIndex = BigInt(length - 2), note, storage = 0n, payer } of contributes) {
      // `payer`: an account other than the gift's sender funds the storage, signing its own payment
      const mbrPayment = payer === undefined ? await storagePayment(storage, note) : {
        txn: await fixture.algorand.createTransaction.payment({
          sender: payer.sender, receiver: socialClaim.address, amount: Number(storage).microAlgos(),
        }),
        signer: payer.signer,
      }
      composer.addAppCallMethodCall(await socialClaim.client.params.contribute({
        ...sendParams, args: { mbrPayment, payCallIndex, subject, ttl: ONE_DAY },
        ...(note ? { note: new TextEncoder().encode(note) } : {}),
      }))
    }
    // the pay call carries no maxFee; cap it so a contract-accepted group fails on nothing else
    for (const txn of (composer as unknown as { txns: { type: string; maxFee?: unknown }[] }).txns) {
      if (txn.type === 'methodCall' && txn.maxFee === undefined) txn.maxFee = (16_000).microAlgos()
    }
    return group.send({ ...sendParams })
  }

  test('first gift creates one wallet and marks PENDING; a second gift from the same sender tops it up', async () => {
    const before = await latestTimestamp()
    const appBefore = await mbr()
    expect(await spare()).toBe(0n)
    const { wallet: id, result } = await gift(subjectA)
    expect(await adminOf(id)).toBe(socialClaim.address)
    // group: rekeyToPlugin, sendToAnyone, verifyAuthAddress, storage payment, bind
    expect(result.transactions).toHaveLength(5)
    expect(result.transactions[3].payment?.amount).toBe(PENDING_MBR + GIFT_MBR)
    expect(result.transactions[4].fee).toBe(1_000n)
    expect(await socialClaim.getPending(subjectA)).toBe(id)
    expect(await socialClaim.getDirectory(subjectA)).toBeUndefined()
    // the sender paid for both boxes: the app's own balance covered nothing
    expect(await mbr() - appBefore).toBe(PENDING_MBR + GIFT_MBR)
    expect(await spare()).toBe(0n)

    const names = await boxNames()
    expect(names).toContain('70' + Buffer.from(subjectA).toString('hex'))
    const giftName = socialClaimGiftBoxName(subjectA, wallet.appId, 0n)
    expect(giftName).toHaveLength(49)
    expect(names).toContain(Buffer.from(giftName).toString('hex'))
    const first = await socialClaim.getGift({ subject: subjectA, senderWallet: wallet.appId, asset: 0n })
    expect(first?.amount).toBe(GIFT)
    expect(first!.expiry - before).toBeGreaterThanOrEqual(ONE_DAY)
    expect(first!.expiry - before).toBeLessThan(ONE_DAY + 600n)

    const walletBefore = await balance(giftAddress(id))
    const appMid = await mbr()
    const topped = await topUp(subjectA, { ttl: 2n * ONE_DAY })
    // group: rekeyToPlugin, pay, verifyAuthAddress, storage payment, contribute
    expect(topped.transactions).toHaveLength(5)
    // same sender and asset: the box exists, so nothing is due
    expect(topped.transactions[3].payment?.amount).toBe(0n)
    expect(topped.transactions[4].fee).toBe(1_000n)
    expect(await socialClaim.getPending(subjectA)).toBe(id)
    expect(await balance(giftAddress(id)) - walletBefore).toBe(TOP_UP)
    // same sender and asset: the existing box is reused, no new MBR
    expect(await mbr()).toBe(appMid)
    expect(await spare()).toBe(0n)
    const gifts = await socialClaim.listGifts(subjectA)
    expect(gifts).toHaveLength(1)
    expect(gifts[0].senderWallet).toBe(wallet.appId)
    expect(gifts[0].asset).toBe(0n)
    expect(gifts[0].gift.amount).toBe(GIFT + TOP_UP)
    expect(gifts[0].gift.expiry - first!.expiry).toBeGreaterThanOrEqual(ONE_DAY - 600n)
  })

  test('a top-up from a different sender lands in the same wallet in its own gift box', async () => {
    const other = await newSponsor('Other')
    const { wallet: id } = await gift(subjectA)
    // whoever pays to create the wallet is its referrer (readiness audit C5, decided 2026-11-11)
    expect(await referrerOf(id)).toBe(controlled(wallet))
    const walletBefore = await balance(giftAddress(id))
    const appBefore = await mbr()
    await topUp(subjectA, { sponsor: other })
    // a later sender only adds funds: the first sender stays the referrer
    expect(await referrerOf(id)).toBe(controlled(wallet))
    expect(await socialClaim.getPending(subjectA)).toBe(id)
    expect(await balance(giftAddress(id)) - walletBefore).toBe(TOP_UP)
    expect(await mbr() - appBefore).toBe(GIFT_MBR)
    expect(await spare()).toBe(0n)
    const gifts = await socialClaim.listGifts(subjectA)
    expect(gifts.map((g) => [g.senderWallet, g.gift.amount]).sort()).toEqual(
      [[wallet.appId, GIFT], [other.appId, TOP_UP]].sort(),
    )
    // a shorter ttl never shortens the box expiry
    const expiry = gifts.find((g) => g.senderWallet === other.appId)!.gift.expiry
    await topUp(subjectA, { sponsor: other, ttl: ONE_DAY })
    expect((await socialClaim.getGift({ subject: subjectA, senderWallet: other.appId, asset: 0n }))!.expiry)
      .toBeGreaterThanOrEqual(expiry)
  })

  test('bind rejects a subject that is already PENDING or CLAIMED', async () => {
    const { wallet: id } = await gift(subjectA)
    await expect(gift(subjectA)).rejects.toThrow(/socialClaimAlreadyPending/)
    await claim(subjectA)
    await expect(gift(subjectA)).rejects.toThrow(/socialClaimAlreadyClaimed/)
    expect(await socialClaim.getDirectory(subjectA)).toBe(id)
    expect(await socialClaim.getPending(subjectA)).toBeUndefined()
    await expect(gift(subjectB, { ttl: ONE_DAY - 1n })).rejects.toThrow(/socialClaimInvalidTtl/)
    await expect(gift(subjectB, { ttl: 366n * ONE_DAY })).rejects.toThrow(/socialClaimInvalidTtl/)
  })

  test('contribute rejects a wrong position, wrong app, two payments, wrong receiver, and a non-pending subject', async () => {
    const { wallet: id } = await gift(subjectA)
    const to = giftAddress(id)
    const one = [{ receiver: to, asset: 0n, amount: TOP_UP }]
    const snapshot = async () => [await socialClaim.listGifts(subjectA), await balance(to)]
    const before = await snapshot()

    await expect(groupWithContribute(one, [{ subject: subjectA, payCallIndex: 0n }])).rejects.toThrow(/socialClaimBadPosition/)
    await expect(groupWithContribute(one, [{ subject: subjectA }], 'payment')).rejects.toThrow(/socialClaimBadPosition/)
    await expect(groupWithContribute(one, [{ subject: subjectA }, { subject: subjectA, note: 'again' }]))
      .rejects.toThrow(/socialClaimBadPosition/)
    await expect(groupWithContribute([...one, ...one], [{ subject: subjectA }])).rejects.toThrow(/socialClaimNotOnePayment/)
    await expect(groupWithContribute([{ receiver: recipient.sender, asset: 0n, amount: TOP_UP }], [{ subject: subjectA }]))
      .rejects.toThrow(/socialClaimWrongReceiver/)
    await expect(groupWithContribute(one, [{ subject: subjectB }])).rejects.toThrow(/socialClaimNotPending/)
    await expect(groupWithContribute([{ receiver: to, asset: 0n, amount: 0n }], [{ subject: subjectA }]))
      .rejects.toThrow(/socialClaimEmptyGift/)

    // wrong app: a sendToAnyone call where contribute expects pay
    const { group, length, sendParams } = await wallet.prepareUsePlugin({
      callerType: CallerType.Admin, calls: [welcome.sendToAnyone({ ...await giftArgs(), admin: socialClaim.address })],
    })
    const composer = await group.composer()
    composer.addAppCallMethodCall(await socialClaim.client.params.contribute({
      ...sendParams, args: { mbrPayment: await storagePayment(0n), payCallIndex: BigInt(length - 2), subject: subjectA, ttl: ONE_DAY },
    }))
    await expect(group.send({ ...sendParams })).rejects.toThrow(/socialClaimNotPay/)

    expect(await snapshot()).toEqual(before)
  })

  test('bind needs the sendToAnyone call three before it, on the welcome app, with this app as admin', async () => {
    const pendingBefore = await boxNames()
    const bindStorage = () => storagePayment(PENDING_MBR + GIFT_MBR)
    await expect(socialClaim.client.send.bind({
      sender, signer, args: { mbrPayment: await bindStorage(), welcomeCallIndex: 0n, subject: subjectA, ttl: ONE_DAY },
    })).rejects.toThrow(/socialClaimBadPosition/)

    const groupWithBind = async (admin: string, welcomeCallIndex: bigint) => {
      const { group, sendParams } = await wallet.prepareUsePlugin({
        callerType: CallerType.Admin, calls: [welcome.sendToAnyone({ ...await giftArgs(), admin })],
      })
      const composer = await group.composer()
      composer.addAppCallMethodCall(await socialClaim.client.params.bind({
        ...sendParams, args: { mbrPayment: await bindStorage(), welcomeCallIndex, subject: subjectA, ttl: ONE_DAY },
      }))
      return group.send({ ...sendParams })
    }
    await expect(groupWithBind(recipient.sender, 1n)).rejects.toThrow(/socialClaimAdminNotThisApp/)
    await expect(groupWithBind(socialClaim.address, 0n)).rejects.toThrow(/socialClaimBadPosition/)

    const bindAfter = async (call: Parameters<typeof wallet.prepareUsePlugin>[0]['calls'][number], error: RegExp) => {
      const { group, length, sendParams } = await wallet.prepareUsePlugin({ callerType: CallerType.Admin, calls: [call] })
      const composer = await group.composer()
      composer.addAppCallMethodCall(await socialClaim.client.params.bind({
        ...sendParams, args: { mbrPayment: await bindStorage(), welcomeCallIndex: BigInt(length - 2), subject: subjectA, ttl: ONE_DAY },
      }))
      for (const txn of (composer as unknown as { txns: { type: string; maxFee?: unknown }[] }).txns) {
        if (txn.type === 'methodCall' && txn.maxFee === undefined) txn.maxFee = (16_000).microAlgos()
      }
      await expect(group.send({ ...sendParams })).rejects.toThrow(error)
    }
    await bindAfter(pay.pay({ payments: [{ receiver: recipient.sender, asset: 0n, amount: 1n }] }), /socialClaimNotWelcome/)
    const { nickname, maxCost } = await giftArgs()
    await bindAfter(welcome.sponsor({ admin: socialClaim.address, nickname, maxCost }), /socialClaimNotSendToAnyone/)
    expect(await boxNames()).toEqual(pendingBefore)
  })

  // AUD-C5: storage is charged to whoever sends the gift, so nobody can use up storage someone else paid for.
  test('a gift is rejected unless its storage payment is exact and goes to this app', async () => {
    const bindWith = async (mbrPayment: ReturnType<typeof storagePayment>) => {
      const { group, length, sendParams } = await wallet.prepareUsePlugin({
        callerType: CallerType.Admin, calls: [welcome.sendToAnyone({ ...await giftArgs(), admin: socialClaim.address })],
      })
      const composer = await group.composer()
      composer.addAppCallMethodCall(await socialClaim.client.params.bind({
        ...sendParams, args: { mbrPayment: await mbrPayment, welcomeCallIndex: BigInt(length - 2), subject: subjectA, ttl: ONE_DAY },
      }))
      return group.send({ ...sendParams })
    }
    const boxesBefore = await boxNames()
    await expect(bindWith(storagePayment(PENDING_MBR + GIFT_MBR - 1n))).rejects.toThrow(/socialClaimInvalidStoragePayment/)
    await expect(bindWith(storagePayment(0n))).rejects.toThrow(/socialClaimInvalidStoragePayment/)
    await expect(bindWith(fixture.algorand.createTransaction.payment({
      sender, receiver: recipient.sender, amount: Number(PENDING_MBR + GIFT_MBR).microAlgos(),
    }))).rejects.toThrow(/socialClaimInvalidStoragePayment/)
    expect(await boxNames()).toEqual(boxesBefore)

    const { wallet: id } = await gift(subjectA)
    const one = [{ receiver: giftAddress(id), asset: 0n, amount: TOP_UP }]
    // this wallet already has its gift box: nothing is due, and an overpayment is not kept
    await expect(groupWithContribute(one, [{ subject: subjectA, storage: GIFT_MBR }])).rejects.toThrow(/socialClaimInvalidStoragePayment/)
    await groupWithContribute(one, [{ subject: subjectA, storage: 0n }])

    // a first gift from another wallet needs its own box paid for
    const other = await newSponsor('Other')
    const first = wallet
    wallet = other
    try {
      await expect(groupWithContribute(one, [{ subject: subjectA, storage: 0n }])).rejects.toThrow(/socialClaimInvalidStoragePayment/)
      await expect(groupWithContribute(one, [{ subject: subjectA, storage: GIFT_MBR - 1n }])).rejects.toThrow(/socialClaimInvalidStoragePayment/)
      await groupWithContribute(one, [{ subject: subjectA, storage: GIFT_MBR }])
    } finally {
      wallet = first
    }
    expect((await socialClaim.listGifts(subjectA)).map((g) => g.gift.amount).sort()).toEqual([TOP_UP, GIFT + TOP_UP].sort())
    expect(await spare()).toBe(0n)
  })

  test('anyone can pay a gift box\'s storage, and gets it back with its payer record when the gift is refunded', async () => {
    const PAYER_RECORD_MBR = 28_500n
    const other = await newSponsor('Other')
    const { wallet: id } = await gift(subjectA, { sponsor: other })
    const one = [{ receiver: giftAddress(id), asset: 0n, amount: TOP_UP }]
    const payer = await stranger()
    const appBefore = await mbr()

    // the box deposit alone is short: a payer other than the gift's sender is remembered, and funds that record
    await expect(groupWithContribute(one, [{ subject: subjectA, storage: GIFT_MBR, payer }]))
      .rejects.toThrow(/socialClaimInvalidStoragePayment/)
    const payerBefore = await balance(payer.sender)
    await groupWithContribute(one, [{ subject: subjectA, storage: GIFT_MBR + PAYER_RECORD_MBR, payer }])
    expect(payerBefore - await balance(payer.sender)).toBe(GIFT_MBR + PAYER_RECORD_MBR + 1_000n)
    expect(await mbr() - appBefore).toBe(GIFT_MBR + PAYER_RECORD_MBR)
    expect(await spare()).toBe(0n)
    expect((await socialClaim.getGift({ subject: subjectA, senderWallet: wallet.appId, asset: 0n }))?.amount).toBe(TOP_UP)

    // a later top-up of the same box owes nothing, whoever sends the (empty) storage payment
    await groupWithContribute(one, [{ subject: subjectA, storage: 0n }])

    await new TimeWarp(fixture.algorand).timeWarp(ONE_DAY + 60n)
    const relayer = await stranger()
    const payerHeld = await balance(payer.sender)
    const senderHeld = await balance(controlled(wallet))
    await socialClaim.refund({ subject: subjectA, senderWallet: wallet.appId, asset: 0n, ...relayer })
    // the gift goes back to the wallet that sent it; the storage, with the payer record's own, to whoever paid it
    expect(await balance(controlled(wallet)) - senderHeld).toBe(2n * TOP_UP)
    expect(await balance(payer.sender) - payerHeld).toBe(GIFT_MBR + PAYER_RECORD_MBR)
    expect(await mbr()).toBe(appBefore)
    expect(await spare()).toBe(0n)
  })

  test('claim hands admin to the recipient and moves PENDING to CLAIMED; gift boxes stay until pruned', async () => {
    const { wallet: id } = await gift(subjectA)
    const appBefore = await mbr()
    const claimed = await claim(subjectA)
    // outer call + inner changeAdmin + 3 opup inner calls for ed25519verifyBare
    expect(claimed.transactions[0].fee).toBe(5_000n)
    expect(await adminOf(id)).toBe(recipient.sender)
    // the claim changes the admin only: the sender who created the wallet stays its referrer
    expect(await referrerOf(id)).toBe(controlled(wallet))
    expect(await socialClaim.getPending(subjectA)).toBeUndefined()
    expect(await socialClaim.getDirectory(subjectA)).toBe(id)
    expect(await socialClaim.listGifts(subjectA)).toHaveLength(1)
    // pending box freed, directory box written: same size
    expect(await mbr()).toBe(appBefore)
    await expect(claim(subjectA)).rejects.toThrow(/socialClaimNotPending/)

    const senderBefore = await balance(controlled(wallet))
    const pruned = await socialClaim.prune({ subject: subjectA, senderWallet: wallet.appId, asset: 0n, ...await stranger() })
    // outer call + the deposit's return
    expect(pruned.transactions[0].fee).toBe(2_000n)
    expect(await socialClaim.listGifts(subjectA)).toHaveLength(0)
    expect(appBefore - await mbr()).toBe(GIFT_MBR)
    // the gift box's deposit went back to the wallet that sent the gift
    expect(await balance(controlled(wallet)) - senderBefore).toBe(GIFT_MBR)
    expect(await spare()).toBe(0n)
    // a prune of a missing box is a no-op, so a refund racing the claim group cannot fail it
    const again = await socialClaim.prune({ subject: subjectA, senderWallet: wallet.appId, asset: 0n })
    expect(again.transactions[0].fee).toBe(1_000n)
    await socialClaim.prune({ subject: subjectA, senderWallet: 1n, asset: 0n })
    expect(appBefore - await mbr()).toBe(GIFT_MBR)
    expect(await balance(controlled(wallet)) - senderBefore).toBe(GIFT_MBR)
    // contribute needs a PENDING subject; CLAIMED is not enough
    await expect(groupWithContribute([{ receiver: giftAddress(id), asset: 0n, amount: TOP_UP }], [{ subject: subjectA }]))
      .rejects.toThrow(/socialClaimNotPending/)
  })

  test('claim with prune deletes every gift box in the same group', async () => {
    const other = await newSponsor('Other')
    await gift(subjectA)
    await topUp(subjectA, { sponsor: other })
    const appBefore = await mbr()
    const sendersBefore = [await balance(controlled(wallet)), await balance(controlled(other))]
    const result = await claim(subjectA, { prune: true })
    expect(result.transactions).toHaveLength(3)
    expect(await socialClaim.listGifts(subjectA)).toHaveLength(0)
    expect(appBefore - await mbr()).toBe(2n * GIFT_MBR)
    // each sender's wallet got its own deposit back
    expect([await balance(controlled(wallet)), await balance(controlled(other))]).toEqual(sendersBefore.map((b) => b + GIFT_MBR))
    expect(await spare()).toBe(0n)
  })

  test('claim rejects a wrong signer, a different subject, an expired attestation, and this app as the new admin', async () => {
    const { wallet: id } = await gift(subjectA)
    await expect(claim(subjectA, { key: makeAttestor() })).rejects.toThrow(/socialClaimBadAttestation/)
    const expires = (await latestTimestamp()) + 3_600n
    await expect(socialClaim.claim({
      subject: subjectA, newAdmin: recipient.sender, expires, signature: attest(subjectB, recipient.sender, expires),
    })).rejects.toThrow(/socialClaimBadAttestation/)

    const expired = (await latestTimestamp()) - 1n
    await expect(socialClaim.claim({
      subject: subjectA, newAdmin: recipient.sender, expires: expired, signature: attest(subjectA, recipient.sender, expired),
    })).rejects.toThrow(/socialClaimAttestationExpired/)

    await expect(claim(subjectA, { newAdmin: socialClaim.address })).rejects.toThrow(/socialClaimInvalidNewAdmin/)
    await expect(claim(subjectA, { newAdmin: ALGORAND_ZERO_ADDRESS_STRING })).rejects.toThrow(/socialClaimInvalidNewAdmin/)
    expect(await adminOf(id)).toBe(socialClaim.address)
    expect(await socialClaim.getPending(subjectA)).toBe(id)
  })

  test('prune is rejected while the subject is PENDING', async () => {
    await gift(subjectA)
    await expect(socialClaim.prune({ subject: subjectA, senderWallet: wallet.appId, asset: 0n })).rejects.toThrow(/socialClaimStillPending/)
    expect(await socialClaim.listGifts(subjectA)).toHaveLength(1)
  })

  test('refund returns exactly one sender\'s gift after expiry and leaves the wallet claimable', async () => {
    const other = await newSponsor('Other')
    const { wallet: id } = await gift(subjectA)
    await topUp(subjectA, { sponsor: other })
    const to = giftAddress(id)
    const relayer = await stranger()
    const mine = { subject: subjectA, senderWallet: wallet.appId, asset: 0n }

    await expect(socialClaim.refund({ ...mine, ...relayer })).rejects.toThrow(/socialClaimNotExpired/)
    await new TimeWarp(fixture.algorand).timeWarp(ONE_DAY + 60n)

    const senderBefore = await balance(controlled(wallet))
    const walletBefore = await balance(to)
    const appBefore = await mbr()
    const refunded = await socialClaim.refund({ ...mine, ...relayer })
    // outer call + inner arc58_rekeyTo + its nested payment + the refund transfer + the deposit's return
    expect(refunded.transactions[0].fee).toBe(5_000n)
    // the gift and the gift box's deposit both came back
    expect(await balance(controlled(wallet)) - senderBefore).toBe(GIFT + GIFT_MBR)
    expect(walletBefore - await balance(to)).toBe(GIFT)
    expect(appBefore - await mbr()).toBe(GIFT_MBR)
    expect(await spare()).toBe(0n)
    expect(await authAddr(to)).toBeUndefined()
    expect(await adminOf(id)).toBe(socialClaim.address)
    expect(await socialClaim.getPending(subjectA)).toBe(id)
    const left = await socialClaim.listGifts(subjectA)
    expect(left.map((g) => [g.senderWallet, g.gift.amount])).toEqual([[other.appId, TOP_UP]])
    await expect(socialClaim.refund({ ...mine, ...relayer })).rejects.toThrow(/socialClaimNoGift/)

    // the wallet still works: claim it, then the new admin rekeys it (an inner payment from its own account)
    await claim(subjectA)
    expect(await adminOf(id)).toBe(recipient.sender)
    const theirs = { subject: subjectA, senderWallet: other.appId, asset: 0n }
    await expect(socialClaim.refund({ ...theirs, ...relayer })).rejects.toThrow(/socialClaimNotPending/)
    const claimedWallet = await factory.get({ appId: id })
    await claimedWallet.rekeyTo({ ...recipient, address: recipient.sender, flash: false })
    expect((await authAddr(to))?.toString()).toBe(recipient.sender)
    // the health check cost the wallet nothing: its inner payment was fee-pooled
    expect(await balance(to)).toBe(walletBefore - GIFT)
  })

  test('an ASA first gift, an ASA top-up of the same asset, and an ASA refund', async () => {
    const { algorand } = fixture
    const created = await algorand.send.assetCreate({ sender, total: 100n, decimals: 0 })
    const asset = BigInt(created.confirmation.assetIndex!)
    const sponsor = await newSponsor('ASA sponsor', [asset])
    await algorand.send.assetTransfer({ sender, receiver: controlled(sponsor), assetId: asset, amount: 20n })

    const { wallet: id } = await gift(subjectA, { sponsor, asset, amount: 7n })
    expect(await assetBalance(giftAddress(id), asset)).toBe(7n)
    await topUp(subjectA, { sponsor, asset, amount: 3n })
    expect(await assetBalance(giftAddress(id), asset)).toBe(10n)
    expect(await assetBalance(controlled(sponsor), asset)).toBe(10n)
    const gifts = await socialClaim.listGifts(subjectA)
    expect(gifts.map((g) => [g.asset, g.gift.amount])).toEqual([[asset, 10n]])

    await new TimeWarp(fixture.algorand).timeWarp(ONE_DAY + 60n)
    await socialClaim.refund({ subject: subjectA, senderWallet: sponsor.appId, asset, ...await stranger() })
    expect(await assetBalance(giftAddress(id), asset)).toBe(0n)
    expect(await assetBalance(controlled(sponsor), asset)).toBe(20n)
    expect(await authAddr(giftAddress(id))).toBeUndefined()
    expect(await socialClaim.listGifts(subjectA)).toHaveLength(0)
    expect(await socialClaim.getPending(subjectA)).toBe(id)
  })

  test('contribute rejects a sender wallet the wallet factory did not create', async () => {
    const { algorand } = fixture
    const { wallet: id } = await gift(subjectA)
    const to = giftAddress(id)
    // A fake "wallet": an app whose spending_address is an account the attacker rekeyed to PayPlugin
    // and whose controlled_address is an unfunded account no refund could ever reach.
    const spender = await fixture.context.generateAccount({ initialFunds: (1).algos() })
    await algorand.send.payment({
      sender: spender.toString(), signer: spender.signer, receiver: spender.toString(), amount: (0).microAlgos(),
      rekeyTo: getApplicationAddress(pay.appId),
    })
    const unfunded = algorand.account.random().addr.toString()
    const teal = [
      '#pragma version 10',
      'txn ApplicationID', 'bz create', 'int 1', 'return',
      'create:',
      'byte "spending_address"', 'txna ApplicationArgs 0', 'app_global_put',
      'byte "controlled_address"', 'txna ApplicationArgs 1', 'app_global_put',
      'int 1', 'return',
    ].join('\n')
    const fake = await algorand.send.appCreate({
      sender, signer,
      approvalProgram: teal, clearStateProgram: '#pragma version 10\nint 1',
      schema: { globalInts: 0, globalByteSlices: 2, localInts: 0, localByteSlices: 0 },
      args: [decodeAddress(spender.toString()).publicKey, decodeAddress(unfunded).publicKey],
    })
    const payClient = algorand.client.getTypedAppClientById(PayPluginClient, {
      appId: pay.appId, defaultSender: sender, defaultSigner: signer,
    })
    const before = [await socialClaim.listGifts(subjectA), await mbr()]
    const attack = async () => algorand.newGroup()
      .addAppCallMethodCall(await payClient.params.pay({
        args: { wallet: fake.appId, rekeyBack: false, payments: [[to, 0n, 1n]] },
        staticFee: (2_000).microAlgos(),
      }))
      .addPayment({ sender, signer, receiver: sender, amount: (0).microAlgos(), note: 'filler' })
      .addAppCallMethodCall(await socialClaim.client.params.contribute({
        sender, signer, args: { mbrPayment: await storagePayment(GIFT_MBR), payCallIndex: 0n, subject: subjectA, ttl: 365n * ONE_DAY },
      }))
      .send({ populateAppCallResources: true })
    await expect(attack()).rejects.toThrow(/socialClaimSenderNotWallet/)
    expect([await socialClaim.listGifts(subjectA), await mbr()]).toEqual(before)
  })

  test('refund drops an expired gift whose sender left the ASA, freeing the box and keeping the funds for the recipient', async () => {
    const { algorand } = fixture
    const created = await algorand.send.assetCreate({ sender, total: 100n, decimals: 0 })
    const asset = BigInt(created.confirmation.assetIndex!)
    const sponsor = await newSponsor('Leaver', [asset])
    const selfOptIn = await deploySelfOptInPlugin({ fixture, sender, signer })
    await sponsor.addPlugin({ client: selfOptIn, callerType: CallerType.Admin })
    await algorand.send.assetTransfer({ sender, receiver: controlled(sponsor), assetId: asset, amount: 5n })
    const { wallet: id } = await gift(subjectA, { sponsor, asset, amount: 5n })
    expect(await assetBalance(controlled(sponsor), asset)).toBe(0n)
    selfOptIn.setSendParams({ sender, signer })
    await sponsor.usePlugin({ callerType: CallerType.Admin, consolidateFees: true, calls: [selfOptIn.optOut({ assets: [asset] })] })

    await new TimeWarp(fixture.algorand).timeWarp(ONE_DAY + 60n)
    const appBefore = await mbr()
    const sponsorBefore = await balance(controlled(sponsor))
    await socialClaim.refund({ subject: subjectA, senderWallet: sponsor.appId, asset, ...await stranger() })
    expect(appBefore - await mbr()).toBe(GIFT_MBR)
    // the gift stays with the recipient, but the box's deposit still goes back to the wallet that paid it
    expect(await balance(controlled(sponsor)) - sponsorBefore).toBe(GIFT_MBR)
    expect(await spare()).toBe(0n)
    expect(await socialClaim.listGifts(subjectA)).toHaveLength(0)
    expect(await assetBalance(giftAddress(id), asset)).toBe(5n)
    expect(await authAddr(giftAddress(id))).toBeUndefined()
    expect(await socialClaim.getPending(subjectA)).toBe(id)
  })

  test('only the manager rotates the attestor or the manager, and claims follow the new key', async () => {
    const outsider = await stranger()
    const next = makeAttestor()
    await expect(socialClaim.setAttestor({ attestor: next.publicKey, ...outsider })).rejects.toThrow(/socialClaimManagerOnly/)
    await expect(socialClaim.setManager({ manager: outsider.sender, ...outsider })).rejects.toThrow(/socialClaimManagerOnly/)

    const { wallet: id } = await gift(subjectB)
    await socialClaim.setAttestor({ attestor: next.publicKey, ...manager })
    try {
      await expect(claim(subjectB)).rejects.toThrow(/socialClaimBadAttestation/)
      await claim(subjectB, { key: next })
      expect(await adminOf(id)).toBe(recipient.sender)
    } finally {
      await socialClaim.setAttestor({ attestor: attestor.publicKey, ...manager })
    }
  })
})
