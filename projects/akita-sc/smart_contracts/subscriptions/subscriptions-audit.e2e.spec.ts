import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { decodeAddress, encodeUint64, TransactionSigner } from 'algosdk'
import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { TimeWarp } from '../../tests/utils/time'
import { errFailedGate, errInvalidSequence, errPassCountOverflow } from './errors'

/**
 * Regression tests for the 2026-10-02 audit fixes in Subscriptions:
 * SG-02 (streak inflation), SG-05 (gated trigger subject), SG-08 (pass box key / price /
 * unpaid boxes), SG-09 (service MBR reserve), SG-11 (bound funding transfers) and
 * SG-12 (same-merchant activation).
 */

Config.configure({ populateAppCallResources: true })

const EMPTY_CID = new Uint8Array(36).fill(120)
const INTERVAL = 60n
/** streak / window tests use a long interval so LocalNet block-time drift cannot skip a window */
const LONG_INTERVAL = 3_600n
const SUBSCRIPTIONS_MBR = 60_500n
const PASSES_MBR = 83_700n
/** what an account pays, and later gets back, for being remembered as the payer of someone else's record */
const PAYER_RECORD_MBR = 28_500n

describe('Subscriptions (audit fixes)', () => {
  const localnet = algorandFixture()

  let universe: AkitaUniverse
  let subscriptions: SubscriptionsSDK
  let timeWarp: TimeWarp
  let deployer: string
  let deployerSigner: TransactionSigner

  const newAccount = async (algos = 300): Promise<TransactionSignerAccount> => {
    const account = await localnet.context.generateAccount({ initialFunds: (algos).algos() })
    return account
  }

  const newService = async (merchant: TransactionSignerAccount, { passes = 0n, gateId = 0n, amount = 100_000n } = {}) => subscriptions.newService({
    sender: merchant.addr.toString(),
    signer: merchant.signer,
    interval: INTERVAL,
    asset: 0n,
    amount,
    passes,
    gateId,
    payoutAddress: merchant.addr.toString(),
    title: 'Audit Service',
    description: 'audit',
    bannerImage: EMPTY_CID,
    highlightMessage: 0,
    highlightColor: '#FF5733',
  })

  const subscribe = async (subscriber: TransactionSignerAccount, recipient: string, serviceId: bigint, extra: { amount?: bigint, initialDepositAmount?: bigint } = {}) =>
    subscriptions.subscribe({
      sender: subscriber.addr.toString(),
      signer: subscriber.signer,
      asset: 0n,
      amount: extra.amount ?? 100_000n,
      interval: INTERVAL,
      recipient,
      serviceId,
      initialDepositAmount: extra.initialDepositAmount ?? 0n,
    })

  const passBoxExists = async (address: string, id: bigint): Promise<boolean> => {
    const name = new Uint8Array([...new TextEncoder().encode('p'), ...decodeAddress(address).publicKey, ...encodeUint64(id)])
    try {
      await localnet.context.algorand.app.getBoxValue(subscriptions.appId, name)
      return true
    } catch {
      return false
    }
  }

  const freeBalance = async (address: string): Promise<bigint> => {
    const info = await localnet.context.algorand.account.getInformation(address)
    return info.balance.microAlgos - info.minBalance.microAlgos
  }

  beforeAll(async () => {
    await localnet.newScope()
    const { algorand, context: { testAccount } } = localnet
    deployer = testAccount.toString()
    deployerSigner = testAccount.signer
    timeWarp = new TimeWarp(algorand)

    universe = await buildAkitaUniverse({ fixture: localnet, sender: deployer, signer: deployerSigner, apps: {} })
    subscriptions = universe.subscriptions

    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(deployer, dispenser.addr, (1_000).algos())
  })

  afterEach(async () => {
    await timeWarp.resetTimeWarp()
  })

  describe('SG-02 streaks only grow with payments', () => {
    test('streakCheck never increments; payments add one per window; lapses reset', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const subscriberAddr = subscriber.addr.toString()

      const id = await subscriptions.subscribe({
        sender: subscriberAddr,
        signer: subscriber.signer,
        asset: 0n,
        amount: 100_000n,
        interval: LONG_INTERVAL,
        recipient: merchant.addr.toString(),
        serviceId: 0n,
        initialDepositAmount: 1_000_000n,
      })
      const key = { address: subscriberAddr, id }
      let nonce = 0
      const streakCheck = () => subscriptions.client.send.streakCheck({ sender: subscriberAddr, signer: subscriber.signer, args: { key }, note: `sg02-${nonce++}` })
      const streak = async () => (await subscriptions.getSubscription({ address: subscriberAddr, id })).streak

      expect(await streak()).toBe(1n)
      await timeWarp.timeWarp(LONG_INTERVAL + 60n)

      // was: +1 per call while the last payment sits in the previous window
      await streakCheck()
      await streakCheck()
      await streakCheck()
      expect(await streak()).toBe(1n)

      await subscriptions.triggerPayment({ sender: subscriberAddr, signer: subscriber.signer, address: subscriberAddr, id })
      expect(await streak()).toBe(2n)

      await streakCheck()
      expect(await streak()).toBe(2n)

      // miss whole windows: streakCheck resets, the next payment restarts at 1
      await timeWarp.timeWarp(LONG_INTERVAL * 3n)
      await streakCheck()
      expect(await streak()).toBe(0n)

      await subscriptions.triggerPayment({ sender: subscriberAddr, signer: subscriber.signer, address: subscriberAddr, id })
      expect(await streak()).toBe(1n)
    })

    test('streakCheck rejects a missing subscription', async () => {
      await expect(subscriptions.client.send.streakCheck({
        sender: deployer,
        signer: deployerSigner,
        args: { key: { address: deployer, id: 999_999n } },
      })).rejects.toThrow('errUdne')
    })
  })

  describe('SG-08 family passes', () => {
    test('unsubscribe deletes the subscription-keyed pass box and refunds the pass MBR', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const subscriberAddr = subscriber.addr.toString()
      const serviceId = await newService(merchant, { passes: 2n })

      const cost = await subscriptions.newSubscriptionCost({ sender: subscriberAddr, recipient: merchant.addr.toString(), serviceId })
      const listMbr = (await subscriptions.client.isFirstSubscription({ args: { address: subscriberAddr } })) ? 18_900n : 0n
      expect(cost).toBe(SUBSCRIPTIONS_MBR + PASSES_MBR + listMbr)

      const id = await subscribe(subscriber, merchant.addr.toString(), serviceId)
      const pass = (await newAccount(1)).addr.toString()
      await subscriptions.setPasses({ sender: subscriberAddr, signer: subscriber.signer, id, passes: [pass] })
      expect(await passBoxExists(subscriberAddr, id)).toBe(true)

      const appBefore = (await localnet.context.algorand.account.getInformation(subscriptions.client.appAddress)).balance.microAlgos
      await subscriptions.unsubscribe({ sender: subscriberAddr, signer: subscriber.signer, id })
      const appAfter = (await localnet.context.algorand.account.getInformation(subscriptions.client.appAddress)).balance.microAlgos

      expect(await passBoxExists(subscriberAddr, id)).toBe(false)
      expect(appBefore - appAfter).toBe(SUBSCRIPTIONS_MBR + PASSES_MBR)
    })

    test('the pass MBR is refunded even if passes were never set', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const subscriberAddr = subscriber.addr.toString()
      const serviceId = await newService(merchant, { passes: 3n })
      const id = await subscribe(subscriber, merchant.addr.toString(), serviceId)

      const appBefore = (await localnet.context.algorand.account.getInformation(subscriptions.client.appAddress)).balance.microAlgos
      await subscriptions.unsubscribe({ sender: subscriberAddr, signer: subscriber.signer, id })
      const appAfter = (await localnet.context.algorand.account.getInformation(subscriptions.client.appAddress)).balance.microAlgos
      expect(appBefore - appAfter).toBe(SUBSCRIPTIONS_MBR + PASSES_MBR)
    })

    test('unsubscribing never deletes another subscription\'s pass box (serviceID == other subscription id)', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const subscriberAddr = subscriber.addr.toString()
      // the merchant's services 1 and 2
      const s1 = await newService(merchant, { passes: 2n })
      const s2 = await newService(merchant, { passes: 2n })
      expect([s1, s2]).toEqual([1n, 2n])

      // subscription #1 is to service 2; subscription #2 (to service 1) owns a pass box
      const sub1 = await subscribe(subscriber, merchant.addr.toString(), s2)
      const sub2 = await subscribe(subscriber, merchant.addr.toString(), s1)
      expect([sub1, sub2]).toEqual([1n, 2n])
      await subscriptions.setPasses({ sender: subscriberAddr, signer: subscriber.signer, id: sub2, passes: [deployer] })

      // legacy code deleted passes[{subscriber, serviceID = 2}] — subscription #2's box
      await subscriptions.unsubscribe({ sender: subscriberAddr, signer: subscriber.signer, id: sub1 })
      expect(await passBoxExists(subscriberAddr, sub2)).toBe(true)
    })

    test('setPasses is rejected on a service without passes (no unpaid boxes)', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const serviceId = await newService(merchant, { passes: 0n })
      const id = await subscribe(subscriber, merchant.addr.toString(), serviceId)
      await expect(subscriptions.setPasses({ sender: subscriber.addr.toString(), signer: subscriber.signer, id, passes: [] }))
        .rejects.toThrow(errPassCountOverflow)
    })

    test('clearOrphanPasses refuses live subscriptions and missing boxes', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const subscriberAddr = subscriber.addr.toString()
      const serviceId = await newService(merchant, { passes: 2n })
      const id = await subscribe(subscriber, merchant.addr.toString(), serviceId)
      await subscriptions.setPasses({ sender: subscriberAddr, signer: subscriber.signer, id, passes: [deployer] })

      await expect(subscriptions.clearOrphanPasses({ sender: deployer, signer: deployerSigner, address: subscriberAddr, id }))
        .rejects.toThrow('errUdne')
      await subscriptions.unsubscribe({ sender: subscriberAddr, signer: subscriber.signer, id })
      await expect(subscriptions.clearOrphanPasses({ sender: deployer, signer: deployerSigner, address: subscriberAddr, id }))
        .rejects.toThrow('errUdne')
    })
  })

  describe('SG-09 service MBR reserve', () => {
    test('growing title and description to the maximum never touches other users\' funds', async () => {
      const merchant = await newAccount()
      const merchantAddr = merchant.addr.toString()
      const app = subscriptions.client.appAddress.toString()

      const before = await freeBalance(app)
      const serviceId = await newService(merchant)
      await subscriptions.updateServiceTitle({ sender: merchantAddr, signer: merchant.signer, id: serviceId, title: 't'.repeat(128) })
      await subscriptions.updateServiceDescription({ sender: merchantAddr, signer: merchant.signer, id: serviceId, description: 'd'.repeat(3151) })
      const after = await freeBalance(app)

      // the reserved MBR covers the box at its maximum size exactly
      expect(after).toBe(before)
    })
  })

  describe('SG-11 funding transfers are bound to the subscriber', () => {
    test('deposit rejects a payment from another account', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const sponsor = await newAccount(20)
      const id = await subscribe(subscriber, merchant.addr.toString(), 0n)

      const payment = await localnet.context.algorand.createTransaction.payment({
        sender: sponsor.addr,
        signer: sponsor.signer,
        receiver: subscriptions.client.appAddress,
        amount: microAlgo(100_000),
      })
      await expect(subscriptions.client.send.deposit({
        sender: subscriber.addr.toString(),
        signer: subscriber.signer,
        args: { payment, id },
      })).rejects.toThrow('errIpms')
    })

    test('deposit rejects a payment that closes the sender out', async () => {
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const id = await subscribe(subscriber, merchant.addr.toString(), 0n)
      // the closing payment also pays the app call's fee (the sender has nothing left after it)
      const payment = await localnet.context.algorand.createTransaction.payment({
        sender: subscriber.addr,
        signer: subscriber.signer,
        receiver: subscriptions.client.appAddress,
        amount: microAlgo(100_000),
        closeRemainderTo: merchant.addr,
        staticFee: microAlgo(4_000),
      })
      await expect(subscriptions.client.send.deposit({
        sender: subscriber.addr.toString(),
        signer: subscriber.signer,
        args: { payment, id },
        staticFee: microAlgo(0),
      })).rejects.toThrow('errNcls')
    })

    test('depositAsa rejects a clawback-sourced transfer', async () => {
      const { algorand } = localnet
      const akta = universe.aktaAssetId
      const victim = await newAccount(5)
      const merchant = await newAccount()

      if (!(await subscriptions.isOptedInToAsset(akta))) {
        await subscriptions.optIn({ sender: deployer, signer: deployerSigner, asset: akta })
      }

      // the deployer (AKTA clawback) subscribes with AKTA as a donation
      const id = await subscriptions.subscribe({
        sender: deployer,
        signer: deployerSigner,
        asset: akta,
        amount: 1_000n,
        interval: INTERVAL,
        recipient: deployer,
        serviceId: 0n,
      })

      await algorand.send.assetOptIn({ sender: victim.addr, signer: victim.signer, assetId: akta })
      await algorand.send.assetTransfer({ sender: deployer, signer: deployerSigner, receiver: victim.addr, assetId: akta, amount: 10_000n })

      // the clawback pulls the victim's AKTA into the deployer's subscription escrow
      const assetXfer = await algorand.createTransaction.assetTransfer({
        sender: deployer,
        signer: deployerSigner,
        receiver: subscriptions.client.appAddress,
        clawbackTarget: victim.addr,
        assetId: akta,
        amount: 10_000n,
      })
      await expect(subscriptions.client.send.depositAsa({
        sender: deployer,
        signer: deployerSigner,
        args: { assetXfer, id },
      })).rejects.toThrow('errNclw')
    })

    test('anyone can pay a block\'s storage, and the deposit returns to whoever paid it', async () => {
      const { algorand } = localnet.context
      const merchant = await newAccount(5)
      const sponsor = await newAccount(5)
      const blocked = (await newAccount(1)).addr.toString()
      const cost = await subscriptions.blockCost()
      const balance = async (who: TransactionSignerAccount) => (await algorand.account.getInformation(who.addr)).balance.microAlgos
      const block = async (amount: bigint) => subscriptions.client.send.block({
        sender: merchant.addr.toString(),
        signer: merchant.signer,
        args: {
          payment: {
            txn: await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: subscriptions.client.appAddress, amount: microAlgo(amount) }),
            signer: sponsor.signer,
          },
          blocked,
        },
      })

      // the deposit alone is not enough from another payer: it is remembered and funds that record too
      await expect(block(cost)).rejects.toThrow('errIpma')
      const before = await balance(sponsor)
      await block(cost + PAYER_RECORD_MBR)
      expect(before - await balance(sponsor)).toBe(cost + PAYER_RECORD_MBR + 1_000n)
      expect(await subscriptions.isBlocked({ address: merchant.addr.toString(), blocked })).toBe(true)

      const held = await balance(sponsor)
      const merchantHeld = await balance(merchant)
      await subscriptions.unblock({ sender: merchant.addr.toString(), signer: merchant.signer, blocked })
      expect(await balance(sponsor) - held).toBe(cost + PAYER_RECORD_MBR)
      expect(await balance(merchant)).toBeLessThan(merchantHeld) // fees only, no refund
    })

    test('anyone can fund a subscription; the escrow is the subscriber\'s and the storage returns to the payer', async () => {
      const { algorand } = localnet.context
      const merchant = await newAccount()
      const subscriber = await newAccount(5)
      const sponsor = await newAccount(20)
      const subscriberAddr = subscriber.addr.toString()
      const amount = 100_000n
      const deposit = 250_000n
      const balance = async (who: TransactionSignerAccount) => (await algorand.account.getInformation(who.addr)).balance.microAlgos
      const cost = await subscriptions.newSubscriptionCost({ sender: subscriberAddr, recipient: merchant.addr.toString() })
      const fundedSubscribe = async (paid: bigint) => subscriptions.client.newGroup()
        .subscribePayAddressUint64Uint64Uint64Uint64Uint64({
          sender: subscriberAddr,
          signer: subscriber.signer,
          maxFee: microAlgo(20_000),
          args: {
            payment: {
              txn: await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: subscriptions.client.appAddress, amount: microAlgo(paid) }),
              signer: sponsor.signer,
            },
            amount, interval: INTERVAL, recipient: merchant.addr.toString(), serviceId: 0n, wallet: 0n,
          },
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

      // without the payer record's deposit the sponsor's payment is short
      await expect(fundedSubscribe(amount + cost + PAYER_RECORD_MBR - 1n)).rejects.toThrow('errIpay')
      const before = await balance(sponsor)
      const { returns } = await fundedSubscribe(amount + cost + PAYER_RECORD_MBR + deposit)
      const id = returns[0] as bigint
      expect(before - await balance(sponsor)).toBe(amount + cost + PAYER_RECORD_MBR + deposit + 1_000n)
      const sub = await subscriptions.getSubscription({ address: subscriberAddr, id })
      expect(sub.escrowed).toBe(deposit)

      // unsubscribing pays the escrow to the subscriber and the storage back to the sponsor
      const sponsorHeld = await balance(sponsor)
      const subscriberHeld = await balance(subscriber)
      await subscriptions.unsubscribe({ sender: subscriberAddr, signer: subscriber.signer, id })
      expect(await balance(sponsor) - sponsorHeld).toBe(SUBSCRIPTIONS_MBR + PAYER_RECORD_MBR)
      const gained = await balance(subscriber) - subscriberHeld
      expect(gained).toBeLessThanOrEqual(deposit)
      expect(gained).toBeGreaterThan(deposit - 10_000n) // the escrow, less network fees
    })

    test('a sponsored ASA subscription returns its storage to the payer', async () => {
      const { algorand } = localnet.context
      const akta = universe.aktaAssetId
      const merchant = await newAccount()
      const subscriber = await newAccount(5)
      const sponsor = await newAccount(20)
      const subscriberAddr = subscriber.addr.toString()
      const balance = async (who: TransactionSignerAccount) => (await algorand.account.getInformation(who.addr)).balance.microAlgos

      if (!(await subscriptions.isOptedInToAsset(akta))) {
        await subscriptions.optIn({ sender: deployer, signer: deployerSigner, asset: akta })
      }
      await algorand.send.assetOptIn({ sender: merchant.addr, signer: merchant.signer, assetId: akta })
      await algorand.send.assetOptIn({ sender: subscriber.addr, signer: subscriber.signer, assetId: akta })
      await algorand.send.assetTransfer({ sender: deployer, signer: deployerSigner, receiver: subscriber.addr, assetId: akta, amount: 10_000n })

      const cost = await subscriptions.newSubscriptionCost({ sender: subscriberAddr, recipient: merchant.addr.toString(), asset: akta })
      const fundedSubscribe = async (paid: bigint) => subscriptions.client.newGroup()
        .subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64({
          sender: subscriberAddr,
          signer: subscriber.signer,
          maxFee: microAlgo(20_000),
          args: {
            payment: {
              txn: await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: subscriptions.client.appAddress, amount: microAlgo(paid) }),
              signer: sponsor.signer,
            },
            assetXfer: await algorand.createTransaction.assetTransfer({
              sender: subscriber.addr, receiver: subscriptions.client.appAddress, assetId: akta, amount: 3_000n,
            }),
            amount: 1_000n, interval: INTERVAL, recipient: merchant.addr.toString(), serviceId: 0n, wallet: 0n,
          },
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

      await expect(fundedSubscribe(cost)).rejects.toThrow('errIpma')
      const { returns } = await fundedSubscribe(cost + PAYER_RECORD_MBR)
      const id = returns[0] as bigint

      const sponsorHeld = await balance(sponsor)
      const subscriberHeld = await balance(subscriber)
      await subscriptions.unsubscribe({ sender: subscriberAddr, signer: subscriber.signer, id })
      expect(await balance(sponsor) - sponsorHeld).toBe(SUBSCRIPTIONS_MBR + PAYER_RECORD_MBR)
      expect(await balance(subscriber)).toBeLessThan(subscriberHeld) // fees only: the storage went to the sponsor
    })
  })

  describe('SG-12 activation is bound to the creating merchant', () => {
    test('a different sender\'s activateService does not satisfy newService', async () => {
      const merchant = await newAccount()
      const other = await newAccount(5)
      const cost = await subscriptions.newServiceCost({ sender: merchant.addr.toString() })
      const payment = await localnet.context.algorand.createTransaction.payment({
        sender: merchant.addr,
        signer: merchant.signer,
        receiver: subscriptions.client.appAddress,
        amount: microAlgo(cost),
      })

      // hinted selector (principal resolution: trailing wallet hint, 0 = acting as itself)
      await expect(subscriptions.client.newGroup()
        .newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64({
          sender: merchant.addr.toString(),
          signer: merchant.signer,
          args: {
            payment,
            interval: INTERVAL,
            asset: 0n,
            amount: 100_000n,
            passes: 0n,
            gateId: 0n,
            payoutAddress: merchant.addr.toString(),
            title: 'x',
            bannerImage: EMPTY_CID,
            highlightMessage: 0,
            highlightColor: new Uint8Array([1, 2, 3]),
            wallet: 0n,
          },
          extraFee: microAlgo(5_000),
        })
        .activateService({ sender: other.addr.toString(), signer: other.signer, args: [] })
        .send()).rejects.toThrow(errInvalidSequence)
    })
  })

  describe('SG-05 gated triggers re-check the subscriber', () => {
    // legacy: the pre-hint selectors (deployed plugins), whose plain Gate.mustCheck names the subscriber's
    // registry origin; hinted: Gate.mustCheckFor(ctx) with ctx = triggerGateCtx(key, keeper's own hint 0)
    test.each([['legacy', true], ['hinted', false]] as const)('%s: a keeper triggers with the subscriber as gate subject; an ineligible subscriber stops paying', async (_label, legacy) => {
      const { algorand } = localnet
      const akta = universe.aktaAssetId
      const merchant = await newAccount()
      const subscriber = await newAccount(20)
      const keeper = await newAccount(5)
      const eligibleKeeper = await newAccount(5)
      const subscriberAddr = subscriber.addr.toString()

      // AKTA >= 1 gate
      const gate = new GateSDK({
        algorand,
        factoryParams: { appId: universe.gate.appId, defaultSender: deployer, defaultSigner: deployerSigner },
        gateRegistry: { asset: universe.subgates.assetGate.appId },
      })
      await algorand.send.payment({ sender: deployer, signer: deployerSigner, receiver: universe.subgates.assetGate.client.appAddress, amount: microAlgo(100_000) })
      const { return: gateId } = await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: akta, op: Operator.GreaterThanOrEqualTo, value: 1n }],
      })

      for (const account of [subscriber, eligibleKeeper]) {
        await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: akta })
        await algorand.send.assetTransfer({ sender: deployer, signer: deployerSigner, receiver: account.addr, assetId: akta, amount: 10n })
      }

      const serviceId = await subscriptions.newService({
        sender: merchant.addr.toString(),
        signer: merchant.signer,
        interval: LONG_INTERVAL,
        asset: 0n,
        amount: 100_000n,
        passes: 0n,
        gateId: gateId!,
        payoutAddress: merchant.addr.toString(),
        title: 'Gated',
        description: 'gated',
        bannerImage: EMPTY_CID,
        highlightMessage: 0,
        highlightColor: '#FF5733',
      })
      /** the gate txn `sender` presents with `caller` as the subject (a plain context for the hinted path) */
      const gateFor = async (sender: TransactionSignerAccount, caller: string) => legacy
        ? gate.build.mustCheck({ sender: sender.addr.toString(), signer: sender.signer, caller, gateId: gateId!, args: [{ type: 'asset' }] })
        : gate.build.mustCheckFor({ sender: sender.addr.toString(), signer: sender.signer, ctx: { principal: caller, wallet: 0n, spender: caller }, gateId: gateId!, args: [{ type: 'asset' }] })

      const id = await subscriptions.subscribe({
        sender: subscriberAddr,
        signer: subscriber.signer,
        asset: 0n,
        amount: 100_000n,
        interval: LONG_INTERVAL,
        recipient: merchant.addr.toString(),
        serviceId,
        initialDepositAmount: 1_000_000n,
        gateTxn: await gateFor(subscriber, subscriberAddr),
        legacy,
      })

      // an ineligible keeper can trigger: the gate is evaluated for the subscriber
      await timeWarp.timeWarp(LONG_INTERVAL + 60n)
      await subscriptions.triggerPayment({
        sender: keeper.addr.toString(),
        signer: keeper.signer,
        address: subscriberAddr,
        id,
        gateTxn: await gateFor(keeper, subscriberAddr),
        legacy,
      })
      expect((await subscriptions.getSubscription({ address: subscriberAddr, id })).streak).toBe(2n)

      // the subscriber loses eligibility
      await algorand.send.assetTransfer({ sender: subscriber.addr, signer: subscriber.signer, receiver: deployer, assetId: akta, amount: 10n })
      await timeWarp.timeWarp(LONG_INTERVAL)

      // was: an eligible keeper's own gate check satisfied the trigger
      await expect(subscriptions.triggerPayment({
        sender: eligibleKeeper.addr.toString(),
        signer: eligibleKeeper.signer,
        address: subscriberAddr,
        id,
        gateTxn: await gateFor(eligibleKeeper, eligibleKeeper.addr.toString()),
        legacy,
      })).rejects.toThrow(errFailedGate)

      // and the subscriber's own gate check now fails
      await expect(subscriptions.triggerPayment({
        sender: eligibleKeeper.addr.toString(),
        signer: eligibleKeeper.signer,
        address: subscriberAddr,
        id,
        gateTxn: await gateFor(eligibleKeeper, subscriberAddr),
        legacy,
      })).rejects.toThrow(errFailedGate)
    })
  })
})
