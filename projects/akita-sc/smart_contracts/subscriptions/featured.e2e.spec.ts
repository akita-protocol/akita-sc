import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { beforeAll, describe, expect, test } from 'vitest'
import { FEATURED_SERVICE_MBR, HighlightMessage, ServiceStatus, SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { PAYER_RECORD_MBR } from 'akita-sdk'
import { buildAkitaUniverse } from '../../tests/fixtures/dao'
import { FeaturedServiceMBR } from './constants'
import { errFeaturedShutdown, errNoFeaturedService, errServiceDoesNotExist } from './errors'

const EMPTY_CID = new Uint8Array(36).fill(120)
const PAYOUT = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ'

/**
 * Creator-editable highlights (`updateServiceHighlight`) and the per-creator featured service box
 * (`setFeaturedService` / `clearFeaturedService` / `getFeaturedService`).
 */
describe('Subscriptions highlights and featured service', () => {
  const localnet = algorandFixture()
  let subscriptions: SubscriptionsSDK

  const newCreator = async (): Promise<TransactionSignerAccount & { address: string }> => {
    const { algorand } = localnet
    const dispenser = await algorand.account.dispenserFromEnvironment()
    const account = algorand.account.random()
    await algorand.account.ensureFunded(account.addr, dispenser.addr, (500).algos())
    return { addr: account.addr, signer: account.signer, address: account.addr.toString() }
  }

  const newService = async (creator: { address: string, signer: TransactionSignerAccount['signer'] }, title = 'Tier') =>
    subscriptions.newService({
      sender: creator.address,
      signer: creator.signer,
      interval: 60n,
      asset: 0n,
      amount: 1_000_000n,
      passes: 0n,
      gateId: 0n,
      payoutAddress: PAYOUT,
      title,
      description: 'desc',
      bannerImage: EMPTY_CID,
      highlightMessage: HighlightMessage.None,
      highlightColor: '#000000',
    })

  const balance = async (address: string) =>
    (await localnet.algorand.account.getInformation(address)).balance.microAlgo

  beforeAll(async () => {
    await localnet.newScope()
    const { algorand, context: { testAccount } } = localnet

    const result = await buildAkitaUniverse({
      fixture: localnet,
      sender: testAccount.toString(),
      signer: testAccount.signer,
      apps: {}
    })
    subscriptions = result.subscriptions

    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: subscriptions.client.appAddress,
      amount: microAlgo(10_000_000n)
    })
  })

  test('SDK and contract agree on the featured box MBR', () => {
    expect(FEATURED_SERVICE_MBR).toBe(BigInt(FeaturedServiceMBR))
    // 2_500 + 400 * ('f' + 32 key + 8 value)
    expect(FEATURED_SERVICE_MBR).toBe(2_500n + 400n * 41n)
  })

  describe('updateServiceHighlight', () => {
    test('creator changes the label and colour, also after pause and shutdown', async () => {
      const creator = await newCreator()
      const id = await newService(creator)

      await subscriptions.updateServiceHighlight({
        sender: creator.address, signer: creator.signer, id,
        highlightMessage: HighlightMessage.BestValue, highlightColor: '#12abEF',
      })
      let service = await subscriptions.getService({ address: creator.address, id: Number(id) })
      expect(service.highlightMessage).toBe(HighlightMessage.BestValue)
      expect(service.highlightColor).toBe('#12ABEF')
      // the rest of the service is untouched
      expect(service.title).toBe('Tier')
      expect(service.description).toBe('desc')
      expect(service.amount).toBe(1_000_000n)

      await subscriptions.pauseService({ sender: creator.address, signer: creator.signer, id })
      await subscriptions.updateServiceHighlight({
        sender: creator.address, signer: creator.signer, id,
        highlightMessage: HighlightMessage.Popular, highlightColor: '#FF0000',
      })
      service = await subscriptions.getService({ address: creator.address, id: Number(id) })
      expect(service.highlightMessage).toBe(HighlightMessage.Popular)
      expect(service.status).toBe(ServiceStatus.Paused)

      await subscriptions.shutdownService({ sender: creator.address, signer: creator.signer, id })
      await subscriptions.updateServiceHighlight({
        sender: creator.address, signer: creator.signer, id,
        highlightMessage: HighlightMessage.None, highlightColor: '#000000',
      })
      service = await subscriptions.getService({ address: creator.address, id: Number(id) })
      expect(service.highlightMessage).toBe(HighlightMessage.None)
      expect(service.highlightColor).toBe('#000000')
    })

    test('non-creator cannot change a highlight', async () => {
      const creator = await newCreator()
      const other = await newCreator()
      const id = await newService(creator)

      await expect(subscriptions.updateServiceHighlight({
        sender: other.address, signer: other.signer, id,
        highlightMessage: HighlightMessage.Popular, highlightColor: '#FFFFFF',
      })).rejects.toThrow(errServiceDoesNotExist)

      const service = await subscriptions.getService({ address: creator.address, id: Number(id) })
      expect(service.highlightMessage).toBe(HighlightMessage.None)
    })

    test('subscription details report the updated highlight', async () => {
      const creator = await newCreator()
      const subscriber = await newCreator()
      const id = await newService(creator)

      const subId = await subscriptions.subscribe({
        sender: subscriber.address,
        signer: subscriber.signer,
        asset: 0n,
        recipient: creator.address,
        amount: 1_000_000n,
        interval: 60n,
        serviceId: id,
      })

      await subscriptions.updateServiceHighlight({
        sender: creator.address, signer: creator.signer, id,
        highlightMessage: HighlightMessage.TopRated, highlightColor: '#00FF00',
      })

      const details = await subscriptions.getSubscriptionWithDetails({ address: subscriber.address, id: subId })
      expect(details.highlightMessage).toBe(HighlightMessage.TopRated)
      expect(details.highlightColor).toBe('#00FF00')
    })
  })

  describe('featured service', () => {
    test('defaults to 0, is set once for its MBR, then changes for free', async () => {
      const creator = await newCreator()
      const first = await newService(creator, 'Basic')
      const second = await newService(creator, 'Pro')

      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(0n)
      expect(await subscriptions.featuredServiceCost({ creator: creator.address })).toBe(FEATURED_SERVICE_MBR)

      const appBefore = await balance(subscriptions.client.appAddress.toString())
      await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id: second })
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(second)
      expect(await balance(subscriptions.client.appAddress.toString()) - appBefore).toBe(FEATURED_SERVICE_MBR)

      expect(await subscriptions.featuredServiceCost({ creator: creator.address })).toBe(0n)
      const appMid = await balance(subscriptions.client.appAddress.toString())
      await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id: first })
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(first)
      expect(await balance(subscriptions.client.appAddress.toString())).toBe(appMid)
    })

    test('a paused service can be featured', async () => {
      const creator = await newCreator()
      const id = await newService(creator)
      await subscriptions.pauseService({ sender: creator.address, signer: creator.signer, id })

      await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id })
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(id)
    })

    test('rejects a missing service, another creator\'s service, and a shut down service', async () => {
      const creator = await newCreator()
      const other = await newCreator()
      const id = await newService(creator)
      await newService(other)
      const otherSecond = await newService(other)

      // service 0 is never a service
      await expect(subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id: 0n }))
        .rejects.toThrow(errServiceDoesNotExist)
      // ids are per creator: `other` has a service 2, `creator` does not
      await expect(subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id: otherSecond }))
        .rejects.toThrow(errServiceDoesNotExist)

      await subscriptions.shutdownService({ sender: creator.address, signer: creator.signer, id })
      await expect(subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id }))
        .rejects.toThrow(errFeaturedShutdown)
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(0n)
    })

    test('payment must be exact: MBR on the first call, 0 after', async () => {
      const creator = await newCreator()
      const id = await newService(creator)
      const { algorand } = localnet

      const pay = (amount: bigint) => algorand.createTransaction.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: subscriptions.client.appAddress,
        amount: microAlgo(amount),
      })
      const send = (amount: bigint) => subscriptions.client.send.setFeaturedService({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment: pay(amount), id },
      })

      await expect(send(0n)).rejects.toThrow()
      await expect(send(FEATURED_SERVICE_MBR - 1n)).rejects.toThrow()
      await send(FEATURED_SERVICE_MBR)
      await expect(send(FEATURED_SERVICE_MBR)).rejects.toThrow()
      await send(0n)
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(id)
    })

    test('clear refunds the creator and resets to 0; clearing twice fails', async () => {
      const creator = await newCreator()
      const id = await newService(creator)
      await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id })

      const before = await balance(creator.address)
      await subscriptions.clearFeaturedService({ sender: creator.address, signer: creator.signer })
      const after = await balance(creator.address)
      // refund less the app call fee and its inner payment fee
      expect(after - before).toBe(FEATURED_SERVICE_MBR - 2_000n)
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(0n)

      await expect(subscriptions.clearFeaturedService({ sender: creator.address, signer: creator.signer }))
        .rejects.toThrow(errNoFeaturedService)

      // setting again pays the MBR again
      expect(await subscriptions.featuredServiceCost({ creator: creator.address })).toBe(FEATURED_SERVICE_MBR)
      await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id })
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(id)
    })

    test('a sponsor can pay the storage and gets it back on clear', async () => {
      const creator = await newCreator()
      const sponsor = await newCreator()
      const id = await newService(creator)
      const { algorand } = localnet

      const cost = await subscriptions.featuredServiceCost({ creator: creator.address, payer: sponsor.address })
      expect(cost).toBe(FEATURED_SERVICE_MBR + PAYER_RECORD_MBR)

      // without the payer record the sponsor's payment is short
      await expect(subscriptions.client.send.setFeaturedService({
        sender: creator.addr,
        signer: creator.signer,
        args: {
          payment: {
            txn: await algorand.createTransaction.payment({
              sender: sponsor.addr,
              receiver: subscriptions.client.appAddress,
              amount: microAlgo(FEATURED_SERVICE_MBR),
            }),
            signer: sponsor.signer,
          },
          id,
        },
      })).rejects.toThrow('errIpma')

      await subscriptions.client.send.setFeaturedService({
        sender: creator.addr,
        signer: creator.signer,
        args: {
          payment: {
            txn: await algorand.createTransaction.payment({
              sender: sponsor.addr,
              receiver: subscriptions.client.appAddress,
              amount: microAlgo(cost),
            }),
            signer: sponsor.signer,
          },
          id,
        },
        populateAppCallResources: true,
      })
      expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(id)

      const sponsorBefore = await balance(sponsor.address)
      await subscriptions.clearFeaturedService({ sender: creator.address, signer: creator.signer })
      expect(await balance(sponsor.address) - sponsorBefore).toBe(cost)
    })

    test('featured boxes are per creator', async () => {
      const a = await newCreator()
      const b = await newCreator()
      const aFirst = await newService(a)
      await newService(b)
      const bSecond = await newService(b)

      await subscriptions.setFeaturedService({ sender: a.address, signer: a.signer, id: aFirst })
      await subscriptions.setFeaturedService({ sender: b.address, signer: b.signer, id: bSecond })

      expect(await subscriptions.getFeaturedService({ address: a.address })).toBe(aFirst)
      expect(await subscriptions.getFeaturedService({ address: b.address })).toBe(bSecond)

      await subscriptions.clearFeaturedService({ sender: a.address, signer: a.signer })
      expect(await subscriptions.getFeaturedService({ address: a.address })).toBe(0n)
      expect(await subscriptions.getFeaturedService({ address: b.address })).toBe(bSecond)
    })
  })
})
