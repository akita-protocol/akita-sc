import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ABIType, TransactionSigner } from 'algosdk'
import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { TimeWarp } from '../../tests/utils/time'

/**
 * Regression tests for SG-03 (subscription / streak gates name a service, never accept
 * donations, and prove the caller owns the subscription) and SG-13 (follower-count gate
 * reads the social app).
 */

Config.configure({ populateAppCallResources: true })

const EMPTY_CID = new Uint8Array(36).fill(120)
const INTERVAL = 60n
const checkArgs = (subscriber: string, id: bigint) => ABIType.from('(address,uint64)').encode([subscriber, id])

describe('Subscription and social gates (audit fixes)', () => {
  const localnet = algorandFixture()

  let universe: AkitaUniverse
  let subscriptions: SubscriptionsSDK
  let gate: GateSDK
  let timeWarp: TimeWarp
  let deployer: string
  let deployerSigner: TransactionSigner

  let merchant: TransactionSignerAccount
  let subscriber: TransactionSignerAccount
  let attacker: TransactionSignerAccount
  let serviceId: bigint
  let subscriptionId: bigint

  const check = async (caller: string, gateId: bigint, args: Uint8Array): Promise<boolean> => {
    const { return: passed } = await universe.gate.client.send.check({
      sender: deployer,
      signer: deployerSigner,
      args: { caller, gateId, args: [args] },
      extraFee: microAlgo(10_000),
    })
    return passed!
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
    await algorand.account.ensureFunded(deployer, dispenser.addr, (500).algos())

    gate = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer, defaultSigner: deployerSigner },
      gateRegistry: {
        subscription: universe.subgates.subscriptionGate.appId,
        subscription_streak: universe.subgates.subscriptionStreakGate.appId,
        social_follower_count: universe.subgates.socialFollowerCountGate.appId,
      },
    })

    merchant = await localnet.context.generateAccount({ initialFunds: (300).algos() })
    subscriber = await localnet.context.generateAccount({ initialFunds: (20).algos() })
    attacker = await localnet.context.generateAccount({ initialFunds: (20).algos() })

    serviceId = await subscriptions.newService({
      sender: merchant.addr.toString(),
      signer: merchant.signer,
      interval: INTERVAL,
      asset: 0n,
      amount: 1_000_000n,
      passes: 0n,
      gateId: 0n,
      payoutAddress: merchant.addr.toString(),
      title: 'Premium',
      description: 'premium tier',
      bannerImage: EMPTY_CID,
      highlightMessage: 0,
      highlightColor: '#112233',
    })

    subscriptionId = await subscriptions.subscribe({
      sender: subscriber.addr.toString(),
      signer: subscriber.signer,
      asset: 0n,
      amount: 1_000_000n,
      interval: INTERVAL,
      recipient: merchant.addr.toString(),
      serviceId,
      initialDepositAmount: 5_000_000n,
    })
  })

  afterEach(async () => {
    await timeWarp.resetTimeWarp()
  })

  const registerSubscriptionGate = async (id: bigint) => (await gate.register({
    sender: deployer,
    signer: deployerSigner,
    args: [{ type: 'subscription', appId: universe.subgates.subscriptionGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, merchant: merchant.addr.toString(), serviceId: id }],
  })).return!

  describe('SG-03 SubscriptionGate', () => {
    test('registration rejects donations (service 0) and unknown services', async () => {
      await expect(registerSubscriptionGate(0n)).rejects.toThrow('errIrga')
      await expect(registerSubscriptionGate(999n)).rejects.toThrow()
    })

    test('a real subscription to the service passes; a dust donation does not', async () => {
      const gateId = await registerSubscriptionGate(serviceId)
      expect(await check(subscriber.addr.toString(), gateId, checkArgs(subscriber.addr.toString(), subscriptionId))).toBe(true)

      // the attacker's subscription #1: a 4 µALGO donation to the merchant with a ~40 year interval
      const donationId = await subscriptions.subscribe({
        sender: attacker.addr.toString(),
        signer: attacker.signer,
        asset: 0n,
        amount: 4n,
        interval: 1_260_000_000n,
        recipient: merchant.addr.toString(),
        serviceId: 0n,
      })
      expect(await check(attacker.addr.toString(), gateId, checkArgs(attacker.addr.toString(), donationId))).toBe(false)
    })

    test('the caller must own the subscription it presents', async () => {
      const gateId = await registerSubscriptionGate(serviceId)
      expect(await check(attacker.addr.toString(), gateId, checkArgs(subscriber.addr.toString(), subscriptionId))).toBe(false)
    })

    test('a lapsed subscription fails', async () => {
      const gateId = await registerSubscriptionGate(serviceId)
      await timeWarp.timeWarp(INTERVAL * 3n)
      expect(await check(subscriber.addr.toString(), gateId, checkArgs(subscriber.addr.toString(), subscriptionId))).toBe(false)
      // paying again restores access
      await subscriptions.triggerPayment({ sender: subscriber.addr.toString(), signer: subscriber.signer, address: subscriber.addr.toString(), id: subscriptionId })
      expect(await check(subscriber.addr.toString(), gateId, checkArgs(subscriber.addr.toString(), subscriptionId))).toBe(true)
    })
  })

  describe('SUBGATE-1 paid-up rule: the previous window counts only for a short grace', () => {
    test('a payment covers its own window plus min(1 day, interval / 4), not the whole next window', async () => {
      const interval = 3_600n // grace = 900 s
      // every service pays the creation fee; top the shared merchant up for this one
      await localnet.context.algorand.send.payment({ sender: deployer, signer: deployerSigner, receiver: merchant.addr, amount: (150).algos() })
      const hourlyId = await subscriptions.newService({
        sender: merchant.addr.toString(),
        signer: merchant.signer,
        interval,
        asset: 0n,
        amount: 1_000_000n,
        passes: 0n,
        gateId: 0n,
        payoutAddress: merchant.addr.toString(),
        title: 'Grace',
        description: 'grace tier',
        bannerImage: EMPTY_CID,
        highlightMessage: 0,
        highlightColor: '#112233',
      })
      const gateId = await registerSubscriptionGate(hourlyId)
      const streakGateId = (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{
          type: 'subscription_streak',
          appId: universe.subgates.subscriptionStreakGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          merchant: merchant.addr.toString(),
          serviceId: hourlyId,
          op: Operator.GreaterThanOrEqualTo,
          streak: 1n,
        }],
      })).return!

      const payer = await localnet.context.generateAccount({ initialFunds: (20).algos() })
      const id = await subscriptions.subscribe({
        sender: payer.addr.toString(),
        signer: payer.signer,
        asset: 0n,
        amount: 1_000_000n,
        interval,
        recipient: merchant.addr.toString(),
        serviceId: hourlyId,
        initialDepositAmount: 3_000_000n,
      })
      const args = checkArgs(payer.addr.toString(), id)
      const active = () => check(payer.addr.toString(), gateId, args)
      const trigger = () => subscriptions.triggerPayment({ sender: payer.addr.toString(), signer: payer.signer, address: payer.addr.toString(), id })

      expect(await active()).toBe(true)

      // window 2, inside the grace: the subscribe-time payment still counts (SUBGATE-4: it used to fail here)
      await timeWarp.timeWarp(interval + 60n)
      expect(await active()).toBe(true)
      await trigger()

      // window 3, inside the grace: the window-2 payment counts
      await timeWarp.timeWarp(interval)
      expect(await active()).toBe(true)

      // window 3, past the grace and unpaid: inactive (it used to stay active until window 4)
      await timeWarp.timeWarp(1_000n)
      expect(await active()).toBe(false)
      expect(await check(payer.addr.toString(), streakGateId, args)).toBe(false)

      // paying the current window restores access
      await trigger()
      expect(await active()).toBe(true)
      expect(await check(payer.addr.toString(), streakGateId, args)).toBe(true)
    })
  })

  describe('SG-03 SubscriptionStreakGate', () => {
    test('streak inflation through streakCheck does not satisfy a streak gate', async () => {
      const gateId = (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{
          type: 'subscription_streak',
          appId: universe.subgates.subscriptionStreakGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          merchant: merchant.addr.toString(),
          serviceId,
          op: Operator.GreaterThanOrEqualTo,
          streak: 5n,
        }],
      })).return!

      // a long-interval service so LocalNet block-time drift cannot skip a window
      const longServiceId = await subscriptions.newService({
        sender: merchant.addr.toString(),
        signer: merchant.signer,
        interval: 3_600n,
        asset: 0n,
        amount: 1_000_000n,
        passes: 0n,
        gateId: 0n,
        payoutAddress: merchant.addr.toString(),
        title: 'Hourly',
        description: 'hourly tier',
        bannerImage: EMPTY_CID,
        highlightMessage: 0,
        highlightColor: '#112233',
      })
      const streakGateId = (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{
          type: 'subscription_streak',
          appId: universe.subgates.subscriptionStreakGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          merchant: merchant.addr.toString(),
          serviceId: longServiceId,
          op: Operator.GreaterThanOrEqualTo,
          streak: 5n,
        }],
      })).return!

      const fresh = await localnet.context.generateAccount({ initialFunds: (20).algos() })
      const id = await subscriptions.subscribe({
        sender: fresh.addr.toString(),
        signer: fresh.signer,
        asset: 0n,
        amount: 1_000_000n,
        interval: 3_600n,
        recipient: merchant.addr.toString(),
        serviceId: longServiceId,
        initialDepositAmount: 2_000_000n,
      })
      expect(await check(fresh.addr.toString(), gateId, checkArgs(fresh.addr.toString(), id))).toBe(false)

      await timeWarp.timeWarp(3_660n)
      for (let i = 0; i < 5; i++) {
        await subscriptions.client.send.streakCheck({ sender: fresh.addr.toString(), signer: fresh.signer, args: { key: { address: fresh.addr.toString(), id } }, note: `sg03-${i}` })
      }
      await subscriptions.triggerPayment({ sender: fresh.addr.toString(), signer: fresh.signer, address: fresh.addr.toString(), id })

      expect((await subscriptions.getSubscription({ address: fresh.addr.toString(), id })).streak).toBe(2n)
      expect(await check(fresh.addr.toString(), streakGateId, checkArgs(fresh.addr.toString(), id))).toBe(false)
    })

    test('a missing subscription fails the gate instead of erroring', async () => {
      const gateId = (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{
          type: 'subscription_streak',
          appId: universe.subgates.subscriptionStreakGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          merchant: merchant.addr.toString(),
          serviceId,
          op: Operator.GreaterThanOrEqualTo,
          streak: 1n,
        }],
      })).return!
      expect(await check(attacker.addr.toString(), gateId, checkArgs(attacker.addr.toString(), 777n))).toBe(false)
    })
  })

  describe('SG-13 SocialFollowerCountGate', () => {
    test('reads follower counts from the social app', async () => {
      const gateId = (await gate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{
          type: 'social_follower_count',
          appId: universe.subgates.socialFollowerCountGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          op: Operator.GreaterThanOrEqualTo,
          value: 0n,
        }],
      })).return!

      const member = await localnet.context.generateAccount({ initialFunds: (20).algos() })
      // no social meta yet → false (was: the call to the graph app always failed)
      expect(await check(member.addr.toString(), gateId, new Uint8Array())).toBe(false)

      await universe.social.initMeta({ sender: member.addr.toString(), signer: member.signer, user: member.addr.toString() })
      expect(await check(member.addr.toString(), gateId, new Uint8Array())).toBe(true)
    })
  })

  describe('AUD-C14 SocialActivityGate', () => {
    test('an account with no profile fails the gate instead of failing the group', async () => {
      const activityGate = new GateSDK({
        algorand: localnet.context.algorand,
        factoryParams: { appId: universe.gate.appId, defaultSender: deployer, defaultSigner: deployerSigner },
        gateRegistry: { social_activity: universe.subgates.socialActivityGate.appId },
      })
      // "active within the last day"
      const gateId = (await activityGate.register({
        sender: deployer,
        signer: deployerSigner,
        args: [{
          type: 'social_activity',
          appId: universe.subgates.socialActivityGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          op: Operator.GreaterThanOrEqualTo,
          value: 86_400n,
        }],
      })).return!

      const member = await localnet.context.generateAccount({ initialFunds: (20).algos() })
      // No profile: the gate answers false. Before the fix the inner getMeta call failed, so this
      // check (and any group that carried it) was rejected.
      expect(await check(member.addr.toString(), gateId, new Uint8Array())).toBe(false)

      // A profile created just now counts as active.
      await universe.social.initMeta({ sender: member.addr.toString(), signer: member.signer, user: member.addr.toString() })
      expect(await check(member.addr.toString(), gateId, new Uint8Array())).toBe(true)
    })
  })

  describe('GateSDK social_* registrations (OperatorAndValue shape)', () => {
    test('registers and decodes social_activity / follower_count / impact / moderator filters', async () => {
      const socialGate = new GateSDK({
        algorand: localnet.context.algorand,
        factoryParams: { appId: universe.gate.appId, defaultSender: deployer, defaultSigner: deployerSigner },
        gateRegistry: {
          social_activity: universe.subgates.socialActivityGate.appId,
          social_follower_count: universe.subgates.socialFollowerCountGate.appId,
          social_impact: universe.subgates.socialImpactGate.appId,
          social_moderator: universe.subgates.socialModeratorGate.appId,
        },
      })

      const cases = [
        { type: 'social_activity', appId: universe.subgates.socialActivityGate.appId, value: 86_400n },
        { type: 'social_follower_count', appId: universe.subgates.socialFollowerCountGate.appId, value: 10n },
        { type: 'social_impact', appId: universe.subgates.socialImpactGate.appId, value: 250n },
        { type: 'social_moderator', appId: universe.subgates.socialModeratorGate.appId, value: 3_600n },
      ] as const

      for (const { type, appId, value } of cases) {
        const { return: gateId } = await socialGate.register({
          sender: deployer,
          signer: deployerSigner,
          args: [{ type, appId, layer: 0n, logicalOperator: LogicalOperator.None, op: Operator.GreaterThanOrEqualTo, value }],
        })
        expect(gateId).toBeGreaterThanOrEqual(4_294_967_296n)
        expect(await socialGate.getGate({ gateId: gateId! })).toEqual([{ type, op: Operator.GreaterThanOrEqualTo, value }])
      }
    })
  })

  describe('SG-03 shutdown', () => {
    test('a shut-down service fails the gate', async () => {
      const gateId = await registerSubscriptionGate(serviceId)
      await subscriptions.triggerPayment({ sender: subscriber.addr.toString(), signer: subscriber.signer, address: subscriber.addr.toString(), id: subscriptionId }).catch(() => undefined)
      expect(await check(subscriber.addr.toString(), gateId, checkArgs(subscriber.addr.toString(), subscriptionId))).toBe(true)
      await subscriptions.shutdownService({ sender: merchant.addr.toString(), signer: merchant.signer, id: serviceId })
      expect(await check(subscriber.addr.toString(), gateId, checkArgs(subscriber.addr.toString(), subscriptionId))).toBe(false)
    })
  })
})
