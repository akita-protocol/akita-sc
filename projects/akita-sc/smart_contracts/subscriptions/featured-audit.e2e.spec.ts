import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { beforeAll, describe, expect, test } from 'vitest'
import { FEATURED_SERVICE_MBR, HighlightMessage, ServiceStatus, SubscriptionsSDK } from 'akita-sdk/subscriptions'
import { PAYER_RECORD_MBR } from 'akita-sdk'
import { buildAkitaUniverse } from '../../tests/fixtures/dao'
import { MAX_DESCRIPTION_LENGTH } from './constants'

const EMPTY_CID = new Uint8Array(36).fill(120)
const PAYOUT = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ'

/** Audit cases for the creator-editable highlight and the featured service box (2026-11-16). */
describe('Subscriptions highlights and featured service: audit cases', () => {
  const localnet = algorandFixture()
  let subscriptions: SubscriptionsSDK

  type Creator = TransactionSignerAccount & { address: string }

  const newCreator = async (): Promise<Creator> => {
    const { algorand } = localnet
    const dispenser = await algorand.account.dispenserFromEnvironment()
    const account = algorand.account.random()
    await algorand.account.ensureFunded(account.addr, dispenser.addr, (500).algos())
    return { addr: account.addr, signer: account.signer, address: account.addr.toString() }
  }

  const newService = async (creator: Creator, description = 'desc') =>
    subscriptions.newService({
      sender: creator.address,
      signer: creator.signer,
      interval: 60n,
      asset: 0n,
      amount: 1_000_000n,
      passes: 0n,
      gateId: 0n,
      payoutAddress: PAYOUT,
      title: 'Tier',
      description,
      bannerImage: EMPTY_CID,
      highlightMessage: HighlightMessage.None,
      highlightColor: '#000000',
    })

  const balance = async (address: string) =>
    (await localnet.algorand.account.getInformation(address)).balance.microAlgo

  /** `creator` sets its featured service while `payer` sends `amount` for the storage. */
  const setPaidBy = async (creator: Creator, payer: Creator, id: bigint, amount: bigint, extra: Record<string, unknown> = {}) =>
    subscriptions.client.send.setFeaturedService({
      sender: creator.addr,
      signer: creator.signer,
      args: {
        payment: {
          txn: await localnet.algorand.createTransaction.payment({
            sender: payer.addr,
            receiver: subscriptions.client.appAddress,
            amount: microAlgo(amount),
            ...extra,
          }),
          signer: payer.signer,
        },
        id,
      },
      populateAppCallResources: true,
    })

  beforeAll(async () => {
    await localnet.newScope()
    const { algorand, context: { testAccount } } = localnet
    const result = await buildAkitaUniverse({ fixture: localnet, sender: testAccount.toString(), signer: testAccount.signer, apps: {} })
    subscriptions = result.subscriptions
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: subscriptions.client.appAddress,
      amount: microAlgo(10_000_000n),
    })
  })

  test('a sponsor that closed its account does not block the clear: the creator gets the deposit', async () => {
    const creator = await newCreator()
    const sponsor = await newCreator()
    const id = await newService(creator)
    const { algorand } = localnet
    const cost = FEATURED_SERVICE_MBR + PAYER_RECORD_MBR
    await setPaidBy(creator, sponsor, id, cost)

    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.send.payment({
      sender: sponsor.addr,
      signer: sponsor.signer,
      receiver: dispenser.addr,
      amount: microAlgo(0n),
      closeRemainderTo: dispenser.addr,
    })
    expect(await balance(sponsor.address)).toBe(0n)

    const before = await balance(creator.address)
    await subscriptions.clearFeaturedService({ sender: creator.address, signer: creator.signer })
    // the deposit and the payer record's storage, less the call fee and its inner payment fee
    expect(await balance(creator.address) - before).toBe(cost - 2_000n)
    expect(await balance(sponsor.address)).toBe(0n)
    expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(0n)
  })

  test('a later set paid by someone else costs nothing and leaves the first payer in place', async () => {
    const creator = await newCreator()
    const other = await newCreator()
    const first = await newService(creator)
    const second = await newService(creator)
    await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id: first })

    // any amount but 0 is refused once the box exists
    await expect(setPaidBy(creator, other, second, FEATURED_SERVICE_MBR)).rejects.toThrow('errIpma')
    const otherBefore = await balance(other.address)
    await setPaidBy(creator, other, second, 0n)
    expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(second)
    expect(otherBefore - await balance(other.address)).toBe(1_000n)

    const before = await balance(creator.address)
    await subscriptions.clearFeaturedService({ sender: creator.address, signer: creator.signer })
    expect(await balance(creator.address) - before).toBe(FEATURED_SERVICE_MBR - 2_000n)
    expect(await balance(other.address)).toBe(otherBefore - 1_000n)
  })

  test('the storage payment may not close out or rekey its payer', async () => {
    const creator = await newCreator()
    const sponsor = await newCreator()
    const id = await newService(creator)
    const cost = FEATURED_SERVICE_MBR + PAYER_RECORD_MBR

    await expect(setPaidBy(creator, sponsor, id, cost, { closeRemainderTo: subscriptions.client.appAddress })).rejects.toThrow()
    await expect(setPaidBy(creator, sponsor, id, cost, { rekeyTo: creator.addr })).rejects.toThrow()
    expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(0n)
  })

  test('a highlight edit works on a service whose description has the maximum length, and keeps it', async () => {
    const creator = await newCreator()
    const description = 'd'.repeat(MAX_DESCRIPTION_LENGTH)
    const id = await newService(creator, description)

    await subscriptions.updateServiceHighlight({
      sender: creator.address, signer: creator.signer, id, highlightMessage: HighlightMessage.Popular, highlightColor: '#a1b2c3',
    })

    const service = await subscriptions.getService({ address: creator.address, id: Number(id) })
    expect(Number(service.highlightMessage)).toBe(HighlightMessage.Popular)
    expect(service.highlightColor.toLowerCase()).toBe('#a1b2c3')
    expect(service.description).toBe(description)
    expect(service.title).toBe('Tier')
  })

  test('a featured service that is shut down later stays recorded until the creator moves or clears it', async () => {
    const creator = await newCreator()
    const first = await newService(creator)
    const second = await newService(creator)
    await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id: first })
    await subscriptions.shutdownService({ sender: creator.address, signer: creator.signer, id: first })

    // the record still names the shut down service: readers have to look at its status
    expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(first)
    const service = await subscriptions.getService({ address: creator.address, id: Number(first) })
    expect(Number(service.status)).toBe(ServiceStatus.Shutdown)

    // moving it to a live service is free, and the deposit still comes back on clear
    await subscriptions.setFeaturedService({ sender: creator.address, signer: creator.signer, id: second })
    expect(await subscriptions.getFeaturedService({ address: creator.address })).toBe(second)
    const before = await balance(creator.address)
    await subscriptions.clearFeaturedService({ sender: creator.address, signer: creator.signer })
    expect(await balance(creator.address) - before).toBe(FEATURED_SERVICE_MBR - 2_000n)
  })
})
