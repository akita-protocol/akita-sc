import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest'
import { RaffleSDK } from 'akita-sdk/raffle'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import {
  getAccountBalance,
} from '../../tests/utils/balance'
import { TimeWarp } from '../../tests/utils/time'
import { MockRandomnessBeaconClient, MockRandomnessBeaconFactory } from '../artifacts/utils/types/MockRandomnessBeaconClient'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

// Time Constants
const ONE_DAY = 86_400
const ONE_MINUTE = 60

/**
 * Get the current Algorand block timestamp
 */
const getBlockTimestamp = async (algorand: import('@algorandfoundation/algokit-utils').AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  const block = await algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

describe('Raffle SDK', () => {
  let deployer: TransactionSignerAccount
  let creator: TransactionSignerAccount
  let participant1: TransactionSignerAccount
  let participant2: TransactionSignerAccount
  let akitaUniverse: AkitaUniverse
  let raffleSDK: RaffleSDK
  let testAssetId: bigint
  let timeWarp: TimeWarp
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & {
    account: SigningAccount;
  }
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  let mockBeacon: MockRandomnessBeaconClient

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()
    timeWarp = new TimeWarp(algorand)

    // Reset any time offset from previous test runs
    await timeWarp.resetTimeWarp()

    const ctx = fixture.context
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    creator = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    participant1 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    participant2 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    await algorand.account.ensureFunded(creator.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(participant1.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(participant2.addr, dispenser.addr, (500).algo())

    // Deploy mock VRF beacon for raffle testing
    const mockBeaconFactory = algorand.client.getTypedAppFactory(MockRandomnessBeaconFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    ;({ appClient: mockBeacon } = await mockBeaconFactory.send.create.bare())

    // Build the full Akita DAO universe (includes raffleFactory with escrow configured)
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {
        vrfBeacon: mockBeacon.appId,
      },
    })

    // Create a test ASA for raffle prize
    const assetCreateTxn = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000_000n,
      decimals: 0,
      assetName: 'Raffle Prize NFT',
      unitName: 'RPNFT',
    })
    testAssetId = BigInt(assetCreateTxn.confirmation.assetIndex!)

    // Opt all accounts into the test asset
    for (const account of [creator, participant1, participant2]) {
      await algorand.send.assetOptIn({
        sender: account.addr,
        signer: account.signer,
        assetId: testAssetId,
      })
    }

    // Transfer prize asset to the creator
    await algorand.send.assetTransfer({
      sender: deployer.addr,
      signer: deployer.signer,
      assetId: testAssetId,
      amount: 100n,
      receiver: creator.addr,
    })

    // Fund the raffle factory to cover raffle creation MBR
    await algorand.account.ensureFunded(akitaUniverse.raffleFactory.client.appAddress, dispenser.addr, (100).algo())

    // Opt the raffle factory into the test asset so it can receive the prize during raffle creation.
    // optIn does the asset opt-in + (when escrow is configured) routes through the revenue manager
    // plugin, which fans out to several inner txns and exceeds the per-txn resource-reference limit
    // — so we group with opUp to expand the resource-reference budget and let algokit-utils auto-
    // size the inner-txn fees via simulate.
    const optInCost = await akitaUniverse.raffleFactory.client.optInCost({ args: { asset: testAssetId } })
    const optInPayment = await algorand.createTransaction.payment({
      sender: deployer.addr,
      receiver: akitaUniverse.raffleFactory.client.appAddress,
      amount: optInCost.microAlgo(),
    })
    const optInGroup = akitaUniverse.raffleFactory.client.newGroup()
    optInGroup.optIn({
      args: { payment: optInPayment, asset: testAssetId },
      sender: deployer.addr,
      signer: deployer.signer,
      maxFee: (50_000).microAlgo(),
    })
    optInGroup.opUp({
      args: {},
      sender: deployer.addr,
      signer: deployer.signer,
      maxFee: (50_000).microAlgo(),
    })
    await optInGroup.send({
      coverAppCallInnerTransactionFees: true,
    })
  })

  describe('RaffleFactorySDK', () => {
    describe('cost()', () => {
      // cost() is quoted on-chain by the factory (newRaffleCost), creation fee included
      test('should return the cost to create a raffle', async () => {
        const cost = await akitaUniverse.raffleFactory.cost({
          isPrizeBox: false,
          prizeId: testAssetId,
          ticketAsset: 0n,
          weightsListCount: 4n, // ignored: weights storage grows with the entries
        })
        expect(cost).toBeGreaterThan(0n)
      })

      test('should return higher cost for ASA tickets', async () => {
        const algoCost = await akitaUniverse.raffleFactory.cost({ prizeId: testAssetId, ticketAsset: 0n })
        const asaCost = await akitaUniverse.raffleFactory.cost({ prizeId: testAssetId, ticketAsset: testAssetId })
        expect(asaCost).toBeGreaterThan(algoCost)
      })
    })

    describe('newRaffle()', () => {
      test('should create a new ALGO ticket raffle', async () => {
        const currentTimestamp = await getBlockTimestamp(algorand)
        const creatorBalanceBefore = await getAccountBalance(algorand, creator.addr.toString())

        const newRaffleSDK = await akitaUniverse.raffleFactory.newRaffle({
          sender: creator.addr,
          signer: creator.signer,
          prizeAsset: testAssetId,
          prizeAmount: 1n,
          ticketAsset: 0n, // ALGO tickets
          startTimestamp: currentTimestamp + BigInt(ONE_MINUTE),
          endTimestamp: currentTimestamp + BigInt(ONE_DAY),
          minTickets: 1_000_000n, // 1 ALGO minimum
          maxTickets: 100_000_000n, // 100 ALGO maximum
          gateId: 0n,
          marketplace: creator.addr.toString(),
          name: 'Test Raffle',
          proof: [],
          weightsListCount: 4n, // ignored: weights storage grows with the entries
        })

        expect(newRaffleSDK).toBeInstanceOf(RaffleSDK)
        expect(newRaffleSDK.client.appId).toBeGreaterThan(0n)

        // Verify cost was deducted from creator
        const creatorBalanceAfter = await getAccountBalance(algorand, creator.addr.toString())
        expect(creatorBalanceBefore - creatorBalanceAfter).toBeGreaterThan(0n)
      })
    })

    describe('get()', () => {
      test('should return RaffleSDK for existing raffle', async () => {
        // Create a raffle first to test get()
        const currentTimestamp = await getBlockTimestamp(algorand)
        const testRaffleSDK = await akitaUniverse.raffleFactory.newRaffle({
          sender: creator.addr,
          signer: creator.signer,
          prizeAsset: testAssetId,
          prizeAmount: 1n,
          ticketAsset: 0n, // ALGO tickets
          startTimestamp: currentTimestamp + BigInt(ONE_MINUTE),
          endTimestamp: currentTimestamp + BigInt(ONE_DAY),
          minTickets: 1_000_000n, // 1 ALGO minimum
          maxTickets: 100_000_000n, // 100 ALGO maximum
          gateId: 0n,
          marketplace: creator.addr.toString(),
          name: 'Test Raffle for get()',
          proof: [],
          weightsListCount: 4n, // ignored: weights storage grows with the entries
        })

        const existingRaffle = akitaUniverse.raffleFactory.get({ appId: testRaffleSDK.client.appId })
        expect(existingRaffle).toBeInstanceOf(RaffleSDK)
        expect(existingRaffle.client.appId).toBe(testRaffleSDK.client.appId)
      })
    })
  })

  describe('RaffleSDK', () => {
    beforeAll(async () => {
      // Create a raffle for all RaffleSDK tests to use
      if (!raffleSDK) {
        const currentTimestamp = await getBlockTimestamp(algorand)
        raffleSDK = await akitaUniverse.raffleFactory.newRaffle({
          sender: creator.addr,
          signer: creator.signer,
          prizeAsset: testAssetId,
          prizeAmount: 1n,
          ticketAsset: 0n, // ALGO tickets
          startTimestamp: currentTimestamp + BigInt(ONE_MINUTE),
          endTimestamp: currentTimestamp + BigInt(ONE_DAY),
          minTickets: 1_000_000n, // 1 ALGO minimum
          maxTickets: 100_000_000n, // 100 ALGO maximum
          gateId: 0n,
          marketplace: creator.addr.toString(),
          name: 'Test Raffle',
          proof: [],
          weightsListCount: 4n, // ignored: weights storage grows with the entries
        })
      }
    })

    describe('state()', () => {
      test('should return the current raffle state', async () => {
        const state = await raffleSDK.state()
        expect(state.prize).toBe(testAssetId)
        expect(state.seller).toBe(creator.addr.toString())
      })
    })

    describe('isLive()', () => {
      test('should return false before raffle starts', async () => {
        const isLive = await raffleSDK.isLive()
        expect(isLive).toBe(false)
      })

      test('should return true during raffle', async () => {
        // Time warp to after start time
        await timeWarp.timeWarp(BigInt(ONE_MINUTE + 10))
        const isLive = await raffleSDK.isLive()
        expect(isLive).toBe(true)
      })
    })

    describe('mbr()', () => {
      test('should return MBR data', async () => {
        const mbr = await raffleSDK.mbr()
        expect(mbr.entries).toBeGreaterThan(0n)
        expect(mbr.entriesByAddress).toBeGreaterThan(0n)
      })
    })

    describe('enter()', () => {
      test('should allow entering with ALGO tickets', async () => {
        // Ensure raffle is live
        await timeWarp.timeWarp(BigInt(ONE_MINUTE + 10))

        const balanceBefore = await getAccountBalance(algorand, participant1.addr.toString())

        await raffleSDK.enter({
          sender: participant1.addr,
          signer: participant1.signer,
          amount: 5_000_000n, // 5 ALGO worth of tickets
          marketplace: creator.addr.toString(),
        })

        const balanceAfter = await getAccountBalance(algorand, participant1.addr.toString())
        // Should have spent 5 ALGO + MBR + fees
        expect(balanceBefore - balanceAfter).toBeGreaterThanOrEqual(5_000_000n)
      })
    })

    describe('isEntered()', () => {
      test('should return true for entered participant', async () => {
        const isEntered = await raffleSDK.isEntered({ address: participant1.addr.toString() })
        expect(isEntered).toBe(true)
      })

      test('should return false for non-participant', async () => {
        const isEntered = await raffleSDK.isEntered({ address: deployer.addr.toString() })
        expect(isEntered).toBe(false)
      })
    })

    describe('getEntryByAddress()', () => {
      test('should return entry ID for participant', async () => {
        const entryId = await raffleSDK.getEntryByAddress({ address: participant1.addr.toString() })
        expect(entryId).toBeGreaterThanOrEqual(0n)
      })
    })

    describe('getEntry()', () => {
      test('should return entry data', async () => {
        const entryId = await raffleSDK.getEntryByAddress({ address: participant1.addr.toString() })
        const entry = await raffleSDK.getEntry({ entryId })
        expect(entry).toBeDefined()
        expect(entry.account).toBe(participant1.addr.toString())
      })
    })

    describe('getTicketCount()', () => {
      test('should return ticket count for an entry', async () => {
        const entryId = await raffleSDK.getEntryByAddress({ address: participant1.addr.toString() })
        const ticketCount = await raffleSDK.getTicketCount({ entryId })
        expect(ticketCount).toBe(5_000_000n) // Initial entry amount
      })
    })

    describe('getEntryWithTickets()', () => {
      test('should return entry data with ticket count by entry ID', async () => {
        const entryId = await raffleSDK.getEntryByAddress({ address: participant1.addr.toString() })
        const entryWithTickets = await raffleSDK.getEntryWithTickets({ entryId })

        expect(entryWithTickets).toBeDefined()
        expect(entryWithTickets.account).toBe(participant1.addr.toString())
        expect(entryWithTickets.entryId).toBe(entryId)
        expect(entryWithTickets.ticketCount).toBe(5_000_000n)
      })
    })

    describe('getEntryWithTicketsByAddress()', () => {
      test('should return entry data with ticket count by address', async () => {
        const entryWithTickets = await raffleSDK.getEntryWithTicketsByAddress({
          address: participant1.addr.toString()
        })

        expect(entryWithTickets).toBeDefined()
        expect(entryWithTickets.account).toBe(participant1.addr.toString())
        expect(entryWithTickets.ticketCount).toBe(5_000_000n)
        expect(entryWithTickets.entryId).toBeGreaterThanOrEqual(0n)
      })

      test('should throw for non-existent address', async () => {
        await expect(
          raffleSDK.getEntryWithTicketsByAddress({ address: deployer.addr.toString() })
        ).rejects.toThrow('No entry found for address')
      })
    })

    describe('add()', () => {
      test('should allow adding more tickets', async () => {
        await raffleSDK.add({
          sender: participant1.addr,
          signer: participant1.signer,
          amount: 2_000_000n, // 2 more ALGO
        })

        // Entry should now have more tickets - verify using getEntryWithTickets
        const entryWithTickets = await raffleSDK.getEntryWithTicketsByAddress({
          address: participant1.addr.toString()
        })
        expect(entryWithTickets.ticketCount).toBe(7_000_000n) // 5 + 2 ALGO
      })
    })

    describe('getAllEntriesWithTickets()', () => {
      test('should return all entries with ticket counts', async () => {
        // Add a second participant
        await raffleSDK.enter({
          sender: participant2.addr,
          signer: participant2.signer,
          amount: 10_000_000n, // 10 ALGO
          marketplace: creator.addr.toString(),
        })

        const allEntries = await raffleSDK.getAllEntriesWithTickets()

        expect(allEntries.length).toBe(2)

        // Find each participant's entry
        const p1Entry = allEntries.find(e => e.account === participant1.addr.toString())
        const p2Entry = allEntries.find(e => e.account === participant2.addr.toString())

        expect(p1Entry).toBeDefined()
        expect(p1Entry!.ticketCount).toBe(7_000_000n) // 5 + 2 ALGO from previous tests
        expect(p1Entry!.entryId).toBeGreaterThanOrEqual(0n)

        expect(p2Entry).toBeDefined()
        expect(p2Entry!.ticketCount).toBe(10_000_000n)
        expect(p2Entry!.entryId).toBeGreaterThanOrEqual(0n)
      })

      test('should include marketplace in entry data', async () => {
        const allEntries = await raffleSDK.getAllEntriesWithTickets()

        for (const entry of allEntries) {
          expect(entry.marketplace).toBe(creator.addr.toString())
        }
      })
    })
  })

  describe('Fee System & Revenue Collection', () => {
    test('should verify raffle factory has escrow configured', async () => {
      // The raffle factory should have its akitaDaoEscrow configured
      const factoryState = await akitaUniverse.raffleFactory.client.state.global.getAll()
      expect(factoryState.akitaDaoEscrow).toBeDefined()
      expect(factoryState.akitaDaoEscrow?.app).toBeGreaterThan(0n)
    })

    test('should verify DAO escrow exists for raffle revenue', async () => {
      // Get the escrow info for raffle revenue
      const raffleEscrow = await akitaUniverse.dao.wallet.getEscrow('rev_raffle')
      expect(raffleEscrow).toBeDefined()
      expect(raffleEscrow.id).toBeGreaterThan(0n)

      // The escrow balance should be tracked
      const escrowAddress = algosdk.getApplicationAddress(raffleEscrow.id).toString()
      const escrowBalance = await getAccountBalance(algorand, escrowAddress)
      expect(escrowBalance).toBeGreaterThanOrEqual(0n)
    })
  })

  // ==========================================================================
  // Audit 2026-10 regressions (AR-01, 07, 08, 09, 11, 15, C)
  // ==========================================================================
  describe('Audit 2026-10 regressions', () => {
    const ZERO = ALGORAND_ZERO_ADDRESS_STRING
    const factoryAddress = () => akitaUniverse.raffleFactory.client.appAddress.toString()

    const newAccount = async (algo: number) => {
      const account = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(algo * 1_000_000) })
      await algorand.account.ensureFunded(account.addr, dispenser.addr, algo.algo())
      return account
    }

    const optInTo = async (account: TransactionSignerAccount, assetId: bigint) => {
      await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId })
    }

    const newSeller = async () => {
      const account = await newAccount(200)
      await optInTo(account, testAssetId)
      await algorand.send.assetTransfer({
        sender: deployer.addr, signer: deployer.signer, assetId: testAssetId, amount: 1n, receiver: account.addr,
      })
      return account
    }

    const newEntrant = async () => {
      const account = await newAccount(50)
      await optInTo(account, testAssetId)
      return account
    }

    const createRaffle = async (
      owner: TransactionSignerAccount,
      { minTickets = 1_000_000n, maxTickets = 100_000_000n, minEntries = 0n, ticketAsset = 0n, startIn = 60n, duration = 3_600n, prizeAsset = testAssetId, weightsListCount = 4n }: {
        minTickets?: bigint, maxTickets?: bigint, minEntries?: bigint, ticketAsset?: bigint, startIn?: bigint, duration?: bigint, prizeAsset?: bigint, weightsListCount?: bigint
      } = {},
    ) => {
      const now = await getBlockTimestamp(algorand)
      return akitaUniverse.raffleFactory.newRaffle({
        sender: owner.addr,
        signer: owner.signer,
        prizeAsset,
        prizeAmount: 1n,
        ticketAsset,
        startTimestamp: now + startIn,
        endTimestamp: now + duration,
        minTickets,
        maxTickets,
        minEntries,
        gateId: 0n,
        marketplace: owner.addr.toString(),
        name: 'Regression Raffle',
        proof: [],
        weightsListCount,
      })
    }

    const enter = (raffle: RaffleSDK, entrant: TransactionSignerAccount, amount: bigint) =>
      raffle.enter({ sender: entrant.addr, signer: entrant.signer, amount, marketplace: entrant.addr.toString() })

    const findWinner = async (raffle: RaffleSDK): Promise<string> => {
      for (let i = 0; i < 10; i++) {
        const { winner } = await raffle.state()
        if (winner !== ZERO) return winner
        await raffle.findWinner({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 16n })
      }
      throw new Error('raffle winner not found')
    }

    /** refund every entry, clear the weights boxes and delete through the factory */
    const cleanupAndDelete = async (raffle: RaffleSDK) => {
      const state = await raffle.state()
      if (state.entryCount > state.refundMbrCursor) {
        await raffle.refundMBR({ sender: deployer.addr, signer: deployer.signer, iterationAmount: state.entryCount })
      }
      await raffle.clearWeightsBoxes({ sender: deployer.addr, signer: deployer.signer })
      await akitaUniverse.raffleFactory.deleteRaffle({ sender: deployer.addr, signer: deployer.signer, appId: raffle.client.appId })
      await expect(algorand.client.algod.getApplicationByID(raffle.client.appId).do()).rejects.toThrow()
    }

    test('AR-01/08/09: commit-reveal draw, winner search, settlement and exact factory refund', async () => {
      const owner = await newSeller()
      const [p1, p2] = [await newEntrant(), await newEntrant()]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const raffle = await createRaffle(owner)
      await timeWarp.timeWarp(70n)
      await enter(raffle, p1, 5_000_000n)
      await enter(raffle, p2, 10_000_000n)
      await timeWarp.timeWarp(3_700n)

      // AR-01: the first call only commits to a future round
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      const committed = await raffle.state()
      const { lastRound } = await algorand.client.algod.status().do()
      expect(committed.winningTicket).toBe(0n)
      expect(committed.raffleRound).toBeGreaterThan(lastRound)
      await expect(raffle.raffle({ sender: deployer.addr, signer: deployer.signer })).rejects.toThrow()

      await timeWarp.roundWarp(await raffle.drawReadyRound())
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      expect((await raffle.state()).winningTicket).toBeGreaterThan(0n)

      const winner = await findWinner(raffle)
      expect([p1.addr.toString(), p2.addr.toString()]).toContain(winner)

      const sellerBefore = await getAccountBalance(algorand, owner.addr.toString())
      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      expect((await algorand.asset.getAccountInformation(winner, testAssetId)).balance).toBe(1n)
      expect(await getAccountBalance(algorand, owner.addr.toString())).toBeGreaterThan(sellerBefore)

      await cleanupAndDelete(raffle)
      // AR-09: refund = what the deletion released; the creation fee (sent to the escrow) is not refunded
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('anyone can pay for an entry; the tickets belong to the entrant and the entry storage returns to the payer', async () => {
      const PAYER_RECORD_MBR = 28_500n
      const owner = await newSeller()
      const [entrant, other, sponsor] = [await newEntrant(), await newEntrant(), await newAccount(50)]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const raffle = await createRaffle(owner)
      await timeWarp.timeWarp(70n)
      const costs = await raffle.mbr()
      const entryMbr = costs.entries + costs.entriesByAddress

      // the sponsor's payment carries the tickets, the entry storage and its own payer record
      const tickets = 5_000_000n
      const sponsorBefore = await getAccountBalance(algorand, sponsor.addr.toString())
      await raffle.client.send.enter({
        sender: entrant.addr,
        signer: entrant.signer,
        args: {
          payment: {
            txn: await algorand.createTransaction.payment({
              sender: sponsor.addr, receiver: raffle.client.appAddress, amount: (tickets + entryMbr + PAYER_RECORD_MBR).microAlgo(),
            }),
            signer: sponsor.signer,
          },
          marketplace: entrant.addr.toString(),
        },
        populateAppCallResources: true,
        coverAppCallInnerTransactionFees: true,
        maxFee: (20_000).microAlgo(),
      })
      expect(sponsorBefore - await getAccountBalance(algorand, sponsor.addr.toString())).toBe(tickets + entryMbr + PAYER_RECORD_MBR + 1_000n)
      await enter(raffle, other, 10_000_000n)
      const live = await raffle.state()
      expect(live.entryCount).toBe(2n)
      expect(live.ticketCount).toBe(tickets + 10_000_000n)

      await timeWarp.timeWarp(3_700n)
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      await timeWarp.roundWarp(await raffle.drawReadyRound())
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      await findWinner(raffle)
      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })

      // the refund pays the sponsor its storage and payer record back, the self-funded entrant its storage
      const sponsorHeld = await getAccountBalance(algorand, sponsor.addr.toString())
      const entrantHeld = await getAccountBalance(algorand, entrant.addr.toString())
      const otherHeld = await getAccountBalance(algorand, other.addr.toString())
      await cleanupAndDelete(raffle)
      expect(await getAccountBalance(algorand, sponsor.addr.toString()) - sponsorHeld).toBe(entryMbr + PAYER_RECORD_MBR)
      expect(await getAccountBalance(algorand, entrant.addr.toString())).toBe(entrantHeld)
      expect(await getAccountBalance(algorand, other.addr.toString()) - otherHeld).toBe(entryMbr)
      // nothing of the payer record is left behind in the factory either
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('eight sponsored entries are refunded in one call, the batch size the desktop app uses', async () => {
      const PAYER_RECORD_MBR = 28_500n
      const owner = await newSeller()
      const sponsor = await newAccount(200)
      const entrants: TransactionSignerAccount[] = []
      for (let i = 0; i < 8; i++) entrants.push(await newEntrant())

      const raffle = await createRaffle(owner)
      await timeWarp.timeWarp(70n)
      const costs = await raffle.mbr()
      const entryMbr = costs.entries + costs.entriesByAddress
      const tickets = 2_000_000n
      for (const entrant of entrants) {
        await raffle.client.send.enter({
          sender: entrant.addr,
          signer: entrant.signer,
          args: {
            payment: {
              txn: await algorand.createTransaction.payment({
                sender: sponsor.addr, receiver: raffle.client.appAddress, amount: (tickets + entryMbr + PAYER_RECORD_MBR).microAlgo(),
              }),
              signer: sponsor.signer,
            },
            marketplace: entrant.addr.toString(),
          },
          populateAppCallResources: true,
          coverAppCallInnerTransactionFees: true,
          maxFee: (20_000).microAlgo(),
        })
      }
      expect((await raffle.state()).entryCount).toBe(8n)

      await timeWarp.timeWarp(3_700n)
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      await timeWarp.roundWarp(await raffle.drawReadyRound())
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      await findWinner(raffle)
      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })

      // Every refund reads and deletes a payer record on top of the two entry boxes.
      const sponsorHeld = await getAccountBalance(algorand, sponsor.addr.toString())
      await raffle.refundMBR({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 8n })
      expect((await raffle.state()).refundMbrCursor).toBe(8n)
      expect(await getAccountBalance(algorand, sponsor.addr.toString()) - sponsorHeld).toBe(8n * (entryMbr + PAYER_RECORD_MBR))
      await cleanupAndDelete(raffle)
    })

    test('no entrant cap: a raffle reserves no weights boxes, each entry funds its own slot, and refunds from the last entry down free them', async () => {
      const ENTRY_BOX = 31_700n
      const BY_ADDRESS = 18_900n
      const SLOT = 3_200n // 8 bytes
      const NEW_WEIGHTS_BOX = 6_100n // 2,500 + 400 * ('w' + uint64)
      const TOTALS_BOX = 2_900n // 2,500 + 400 * 't'
      const owner = await newSeller()
      const entrants = [await newEntrant(), await newEntrant(), await newEntrant()]
      const tickets = [2_000_000n, 3_000_000n, 4_000_000n]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      // the creation price no longer buys a number of weights boxes, and no number is refused
      const quotes = await Promise.all([0n, 4n, 15n, 1_000n].map((weightsListCount) =>
        akitaUniverse.raffleFactory.cost({ prizeId: testAssetId, ticketAsset: 0n, weightsListCount })))
      expect(new Set(quotes).size).toBe(1)

      const raffle = await createRaffle(owner, { weightsListCount: 0n })
      const appId = raffle.client.appId
      const boxNames = async () => (await algorand.app.getBoxNames(appId)).map((box) => Buffer.from(box.nameRaw).toString('latin1')).sort()
      const weightsBox = (index: bigint) => new Uint8Array([0x77, ...algosdk.encodeUint64(index)])
      const totalsBox = new Uint8Array([0x74])
      const minBalance = async () => BigInt((await algorand.account.getInformation(raffle.client.appAddress)).minBalance.microAlgos)

      // at creation the raffle holds only the empty totals box, funded by the seller
      expect(await boxNames()).toEqual(['t'])
      const costs = await raffle.mbr()
      expect(costs).toEqual({ entries: ENTRY_BOX + SLOT + NEW_WEIGHTS_BOX + SLOT, weights: TOTALS_BOX, entriesByAddress: BY_ADDRESS })
      const entryMbr = costs.entries + costs.entriesByAddress

      await timeWarp.timeWarp(70n)
      const minBefore = await minBalance()
      for (const [i, entrant] of entrants.entries()) await enter(raffle, entrant, tickets[i])

      // three entries: their entry boxes, three slots, and one weights box with its total
      expect(await minBalance() - minBefore).toBe(3n * (ENTRY_BOX + BY_ADDRESS + SLOT) + NEW_WEIGHTS_BOX + SLOT)
      expect((await algorand.app.getBoxValue(appId, weightsBox(0n))).length).toBe(3 * 8)
      expect(algosdk.decodeUint64(await algorand.app.getBoxValue(appId, totalsBox), 'bigint')).toBe(9_000_000n)
      const listed = (await raffle.getAllEntriesWithTickets()).sort((a, b) => Number(a.entryId - b.entryId))
      expect(listed.map((entry) => entry.ticketCount)).toEqual(tickets)
      expect(listed.map((entry) => entry.account)).toEqual(entrants.map((entrant) => entrant.addr.toString()))

      // more tickets go into the entry's own slot and its box's total
      await raffle.add({ sender: entrants[0].addr, signer: entrants[0].signer, amount: 1_000_000n })
      expect(await raffle.getTicketCount({ entryId: 0n })).toBe(3_000_000n)
      expect(await raffle.getTicketCount({ entryId: 2n })).toBe(4_000_000n)
      expect(algosdk.decodeUint64(await algorand.app.getBoxValue(appId, totalsBox), 'bigint')).toBe(10_000_000n)
      expect((await raffle.state()).ticketCount).toBe(10_000_000n)
      expect((await algorand.app.getBoxValue(appId, weightsBox(0n))).length).toBe(3 * 8)

      await timeWarp.timeWarp(3_700n)
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      await timeWarp.roundWarp(await raffle.drawReadyRound())
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      expect(entrants.map((entrant) => entrant.addr.toString())).toContain(await findWinner(raffle))
      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })

      // the first refund goes to the last entry and takes its slot off the end of the weights box
      const held = await Promise.all(entrants.map((entrant) => getAccountBalance(algorand, entrant.addr.toString())))
      const gained = async (i: number) => await getAccountBalance(algorand, entrants[i].addr.toString()) - held[i]
      await raffle.refundMBR({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 1n })
      expect((await raffle.state()).refundMbrCursor).toBe(1n)
      expect([await gained(0), await gained(1), await gained(2)]).toEqual([0n, 0n, entryMbr])
      expect((await algorand.app.getBoxValue(appId, weightsBox(0n))).length).toBe(2 * 8)
      const left = (await raffle.getAllEntriesWithTickets()).sort((a, b) => Number(a.entryId - b.entryId))
      expect(left.map((entry) => [entry.entryId, entry.ticketCount])).toEqual([[0n, 3_000_000n], [1n, 3_000_000n]])
      await expect(raffle.clearWeightsBoxes({ sender: deployer.addr, signer: deployer.signer })).rejects.toThrow()

      // the rest: every deposit is back, the weights box is gone and only the totals box is left
      await raffle.refundMBR({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 5n })
      expect((await raffle.state()).refundMbrCursor).toBe(3n)
      expect([await gained(0), await gained(1), await gained(2)]).toEqual([entryMbr, entryMbr, entryMbr])
      expect(await boxNames()).toEqual(['t'])

      // the totals box returns to the seller who funded it; a second call has nothing left to release
      const ownerHeld = await getAccountBalance(algorand, owner.addr.toString())
      expect(await raffle.clearWeightsBoxes({ sender: deployer.addr, signer: deployer.signer })).toBe(TOTALS_BOX)
      expect(await getAccountBalance(algorand, owner.addr.toString()) - ownerHeld).toBe(TOTALS_BOX)
      expect(await boxNames()).toEqual([])
      expect(await raffle.clearWeightsBoxes({ sender: deployer.addr, signer: deployer.signer })).toBe(0n)

      await cleanupAndDelete(raffle)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('AR-07: a raffle with no entries returns the prize to the seller and can be deleted', async () => {
      const owner = await newSeller()
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())
      const raffle = await createRaffle(owner)
      await timeWarp.timeWarp(3_700n)

      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      const state = await raffle.state()
      expect(state.failed).toBeTruthy()
      expect(state.winner).toBe(owner.addr.toString())

      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      expect((await algorand.asset.getAccountInformation(owner.addr, testAssetId)).balance).toBe(1n)

      await cleanupAndDelete(raffle)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('AR-C: below the minimum entries the raffle fails, the prize returns and entrants are refunded', async () => {
      const owner = await newSeller()
      const [p1, p2] = [await newEntrant(), await newEntrant()]
      const raffle = await createRaffle(owner, { minEntries: 3n })
      expect((await raffle.state()).minEntries).toBe(3n)

      await timeWarp.timeWarp(70n)
      await enter(raffle, p1, 2_000_000n)
      await enter(raffle, p2, 3_000_000n)
      await timeWarp.timeWarp(3_700n)

      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      const state = await raffle.state()
      expect(state.failed).toBeTruthy()
      expect(state.winner).toBe(owner.addr.toString())

      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      expect((await algorand.asset.getAccountInformation(owner.addr, testAssetId)).balance).toBe(1n)

      const { entries, entriesByAddress } = await raffle.mbr()
      const p1Before = await getAccountBalance(algorand, p1.addr.toString())
      const p2Before = await getAccountBalance(algorand, p2.addr.toString())
      await cleanupAndDelete(raffle)
      expect(await getAccountBalance(algorand, p1.addr.toString()) - p1Before).toBe(2_000_000n + entries + entriesByAddress)
      expect(await getAccountBalance(algorand, p2.addr.toString()) - p2Before).toBe(3_000_000n + entries + entriesByAddress)
    })

    test('AR-07: a single one-unit ticket wins without a beacon draw', async () => {
      const owner = await newSeller()
      const p1 = await newEntrant()
      const raffle = await createRaffle(owner, { minTickets: 1n, maxTickets: 10n })
      await timeWarp.timeWarp(70n)
      await enter(raffle, p1, 1n)
      await timeWarp.timeWarp(3_700n)

      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      const state = await raffle.state()
      expect(state.winningTicket).toBe(1n)
      expect(state.raffleRound).toBe(0n)
      expect(await findWinner(raffle)).toBe(p1.addr.toString())

      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      await cleanupAndDelete(raffle)
    })

    test('AR-C: only the seller can set the minimum entries, and only before the first entry', async () => {
      const owner = await newSeller()
      const p1 = await newEntrant()
      const raffle = await createRaffle(owner)

      await expect(raffle.setMinEntries({ sender: p1.addr, signer: p1.signer, minEntries: 5n })).rejects.toThrow(/Nslr/)
      await raffle.setMinEntries({ sender: owner.addr, signer: owner.signer, minEntries: 2n })
      expect((await raffle.state()).minEntries).toBe(2n)

      await timeWarp.timeWarp(70n)
      await enter(raffle, p1, 1_000_000n)
      await expect(raffle.setMinEntries({ sender: owner.addr, signer: owner.signer, minEntries: 9n })).rejects.toThrow(/Aent/)
    })

    test('AR-07/11/15: the factory rejects incoherent configurations', async () => {
      const owner = await newSeller()
      await expect(createRaffle(owner, { minTickets: 10n, maxTickets: 5n })).rejects.toThrow(/Itbd/)
      await expect(createRaffle(owner, { ticketAsset: testAssetId })).rejects.toThrow(/Pita/)

      const { assetId: otherAsset } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000n, decimals: 0, assetName: 'Unlisted Ticket', unitName: 'UTK',
      })
      await expect(createRaffle(owner, { ticketAsset: otherAsset })).rejects.toThrow(/Nopt/)
    })

    const factoryOptIn = async (asset: bigint) => {
      const cost = await akitaUniverse.raffleFactory.client.optInCost({ args: { asset } })
      const payment = await algorand.createTransaction.payment({
        sender: deployer.addr, receiver: akitaUniverse.raffleFactory.client.appAddress, amount: cost.microAlgo(),
      })
      const group = akitaUniverse.raffleFactory.client.newGroup()
      group.optIn({ args: { payment, asset }, sender: deployer.addr, signer: deployer.signer, maxFee: (50_000).microAlgo() })
      group.opUp({ args: {}, sender: deployer.addr, signer: deployer.signer, maxFee: (50_000).microAlgo() })
      await group.send({ coverAppCallInnerTransactionFees: true })
    }

    test('TRADE-2: the factory rejects a prize ASA that has a clawback or freeze address', async () => {
      const owner = await newSeller()
      for (const role of ['clawback', 'freeze'] as const) {
        const { assetId } = await algorand.send.assetCreate({
          sender: owner.addr, signer: owner.signer, total: 1n, decimals: 0, assetName: `Seizable ${role}`, unitName: 'SZP', [role]: owner.addr,
        })
        await factoryOptIn(BigInt(assetId))
        await expect(createRaffle(owner, { prizeAsset: BigInt(assetId) }).then(() => 'created')).rejects.toThrow(/Pszb/)
      }
    })

    test('TRADE-3: the draw commits to a stored beacon round, completes at the first allowed reveal, and an early empty read changes nothing', async () => {
      const owner = await newSeller()
      const [p1, p2] = [await newEntrant(), await newEntrant()]
      const raffle = await createRaffle(owner)
      await timeWarp.timeWarp(70n)
      await enter(raffle, p1, 5_000_000n)
      await enter(raffle, p2, 10_000_000n)
      await timeWarp.timeWarp(3_700n)

      // MainNet beacon timing: one value per multiple of 8, submitted 2 rounds later
      await mockBeacon.send.setSubmitLag({ args: { lag: 2n } })
      try {
        // commit in a round ≡ 1 (mod 8), the residue whose reveal used to read empty forever
        const { lastRound } = await algorand.client.algod.status().do()
        const next = lastRound + 1n
        await timeWarp.roundWarp(next + ((9n - (next % 8n)) % 8n) - 1n)
        await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
        const committed = await raffle.state()
        expect(committed.raffleRound % 8n).toBe(0n)

        // an empty read before BEACON_MAX_WAIT_ROUNDS reverts and keeps the commitment
        await mockBeacon.send.setEmpty({ args: { empty: true } })
        try {
          await timeWarp.roundWarp(await raffle.drawReadyRound())
          await expect(raffle.raffle({ sender: deployer.addr, signer: deployer.signer }).then(() => 'revealed')).rejects.toThrow(/Bnrd/)
        } finally {
          await mockBeacon.send.setEmpty({ args: { empty: false } })
        }
        const kept = await raffle.state()
        expect(kept.raffleRound).toBe(committed.raffleRound)
        expect(kept.winningTicket).toBe(0n)

        await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
        const drawn = await raffle.state()
        expect(drawn.winningTicket).toBeGreaterThan(0n)
        expect(drawn.raffleRound).toBe(committed.raffleRound)
      } finally {
        await mockBeacon.send.setSubmitLag({ args: { lag: 0n } })
      }
    })

    test('TRADE-3: with the MainNet beacon timing a reveal in the first allowed round succeeds', async () => {
      const owner = await newSeller()
      const [p1, p2] = [await newEntrant(), await newEntrant()]
      const raffle = await createRaffle(owner)
      await timeWarp.timeWarp(70n)
      await enter(raffle, p1, 5_000_000n)
      await enter(raffle, p2, 10_000_000n)
      await timeWarp.timeWarp(3_700n)

      await mockBeacon.send.setSubmitLag({ args: { lag: 2n } })
      try {
        const { lastRound } = await algorand.client.algod.status().do()
        const next = lastRound + 1n
        await timeWarp.roundWarp(next + ((9n - (next % 8n)) % 8n) - 1n)
        await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
        const committed = await raffle.state()

        await timeWarp.roundWarp((await raffle.drawReadyRound()) - 1n)
        await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
        const drawn = await raffle.state()
        expect(drawn.winningTicket).toBeGreaterThan(0n)
        expect(drawn.raffleRound).toBe(committed.raffleRound)
      } finally {
        await mockBeacon.send.setSubmitLag({ args: { lag: 0n } })
      }
    })

    test('TRADE-5: in a failed ASA-ticket raffle an entrant that opted out of the ticket asset blocks neither refunds nor deletion', async () => {
      const owner = await newSeller()
      const [p1, p2] = [await newEntrant(), await newEntrant()]
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000_000_000n, decimals: 0, assetName: 'Opt-out Ticket', unitName: 'OOT',
      })
      const ticketAsset = BigInt(assetId)
      for (const account of [p1, p2]) {
        await optInTo(account, ticketAsset)
        await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: ticketAsset, amount: 10_000_000n, receiver: account.addr })
      }
      await factoryOptIn(ticketAsset)

      const raffle = await createRaffle(owner, { ticketAsset, minEntries: 3n })
      await timeWarp.timeWarp(70n)
      for (const [entrant, amount] of [[p1, 2_000_000n], [p2, 3_000_000n]] as const) {
        await raffle.enter({ sender: entrant.addr, signer: entrant.signer, amount, marketplace: entrant.addr.toString(), isAsa: true, ticketAsset })
      }
      await algorand.send.assetOptOut({ sender: p1.addr, signer: p1.signer, assetId: ticketAsset, creator: deployer.addr, ensureZeroBalance: false })
      await timeWarp.timeWarp(3_700n)

      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      expect((await raffle.state()).failed).toBeTruthy()
      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })

      const rewardsAddress = algosdk.getApplicationAddress(akitaUniverse.rewards.appId)
      const rewardsHolding = async () => {
        const info = await algorand.account.getInformation(rewardsAddress)
        return info.assets?.find((holding) => holding.assetId === ticketAsset)?.amount ?? 0n
      }
      const holding = async (address: string | algosdk.Address) =>
        (await algorand.asset.getAccountInformation(address, ticketAsset)).balance
      const rewardsBefore = await rewardsHolding()
      const p2Before = await holding(p2.addr)
      await cleanupAndDelete(raffle)

      // p2 gets its tickets back directly; p1's wait for it as a Rewards disbursement
      expect(await holding(p2.addr) - p2Before).toBe(3_000_000n)
      expect(await rewardsHolding() - rewardsBefore).toBe(2_000_000n)
    })

    /** opts the account out of the prize asset and closes it, so a payment below 0.1 ALGO can no longer reach it */
    const closeAccount = async (account: TransactionSignerAccount) => {
      await algorand.send.assetOptOut({ sender: account.addr, signer: account.signer, assetId: testAssetId, creator: deployer.addr, ensureZeroBalance: true })
      await algorand.send.payment({
        sender: account.addr, signer: account.signer, receiver: dispenser.addr, amount: algokit.microAlgos(0), closeRemainderTo: dispenser.addr,
      })
      expect(await getAccountBalance(algorand, account.addr.toString())).toBe(0n)
    }

    /** balances of everyone a cleanup and delete can pay; the deployer sends those calls and pays their fees */
    const settlementBalances = async (raffle: RaffleSDK, owner: TransactionSignerAccount, stayer: TransactionSignerAccount) => ({
      raffle: await getAccountBalance(algorand, raffle.client.appAddress.toString()),
      owner: await getAccountBalance(algorand, owner.addr.toString()),
      stayer: await getAccountBalance(algorand, stayer.addr.toString()),
      factory: await getAccountBalance(algorand, factoryAddress()),
    })

    test('AUD-C6: after a settled raffle an entrant who closed their account blocks neither the refunds nor the delete', async () => {
      const owner = await newSeller()
      const [p1, p2] = [await newEntrant(), await newEntrant()]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const raffle = await createRaffle(owner)
      await timeWarp.timeWarp(70n)
      await enter(raffle, p1, 5_000_000n)
      await enter(raffle, p2, 10_000_000n)
      await timeWarp.timeWarp(3_700n)

      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      await timeWarp.roundWarp(await raffle.drawReadyRound())
      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      const winner = await findWinner(raffle)
      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })

      // The entrant who did not win leaves: its entry storage deposit is below the minimum balance.
      const [leaver, stayer] = winner === p1.addr.toString() ? [p2, p1] : [p1, p2]
      await closeAccount(leaver)

      const { entries, entriesByAddress } = await raffle.mbr()
      expect(entries + entriesByAddress).toBeLessThan(100_000n)
      const before = await settlementBalances(raffle, owner, stayer)
      await cleanupAndDelete(raffle)
      const after = await settlementBalances(raffle, owner, stayer)

      expect(after.stayer - before.stayer).toBe(entries + entriesByAddress)
      expect(await getAccountBalance(algorand, leaver.addr.toString())).toBe(0n)
      // The deposit that could not be returned leaves with the raffle's account (into the seller's
      // storage refund, or the factory once that refund reaches the seller's deposit): nothing is
      // stranded in the deleted app, and the factory is not out of pocket.
      expect(after.raffle).toBe(0n)
      expect(after.owner).toBeGreaterThan(before.owner)
      expect(after.factory).toBeGreaterThanOrEqual(factoryBefore)
    })

    test('AUD-C6: in a failed raffle a closed account owed less than the minimum balance is skipped and the others are refunded', async () => {
      const owner = await newSeller()
      const [leaver, stayer] = [await newEntrant(), await newEntrant()]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const raffle = await createRaffle(owner, { minTickets: 10_000n, minEntries: 3n })
      await timeWarp.timeWarp(70n)
      await enter(raffle, leaver, 20_000n)
      await enter(raffle, stayer, 3_000_000n)
      await timeWarp.timeWarp(3_700n)

      await raffle.raffle({ sender: deployer.addr, signer: deployer.signer })
      expect((await raffle.state()).failed).toBeTruthy()
      await raffle.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      expect((await algorand.asset.getAccountInformation(owner.addr, testAssetId)).balance).toBe(1n)

      await closeAccount(leaver)

      const { entries, entriesByAddress } = await raffle.mbr()
      const before = await settlementBalances(raffle, owner, stayer)
      await cleanupAndDelete(raffle)
      const after = await settlementBalances(raffle, owner, stayer)

      // Listed first, the closed account is passed over: neither its 20,000 µALGO of tickets nor its deposit can be delivered.
      expect(after.stayer - before.stayer).toBe(3_000_000n + entries + entriesByAddress)
      expect(await getAccountBalance(algorand, leaver.addr.toString())).toBe(0n)
      expect(after.raffle).toBe(0n)
      expect(after.owner).toBeGreaterThan(before.owner)
      expect(after.factory).toBeGreaterThanOrEqual(factoryBefore)
    })
  })
})
