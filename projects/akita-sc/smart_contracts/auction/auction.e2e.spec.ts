import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest'
import { AuctionSDK } from 'akita-sdk/auction'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { getAccountBalance } from '../../tests/utils/balance'
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
const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  const block = await algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

// Shared handles populated in the top-level beforeAll. Every describe block that
// needs per-auction state owns its own beforeAll, so tests inside a describe
// can run in any order without depending on earlier sibling tests.
describe('Auction SDK', () => {
  let deployer: TransactionSignerAccount
  let seller: TransactionSignerAccount
  let bidder1: TransactionSignerAccount
  let bidder2: TransactionSignerAccount
  let akitaUniverse: AkitaUniverse
  let testAssetId: bigint
  let timeWarp: TimeWarp
  let dispenser: algosdk.Address &
    TransactionSignerAccount & {
      account: SigningAccount
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
    seller = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    bidder1 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    bidder2 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    await algorand.account.ensureFunded(seller.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(bidder1.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(bidder2.addr, dispenser.addr, (500).algo())

    // Deploy mock VRF beacon for raffle testing
    const mockBeaconFactory = algorand.client.getTypedAppFactory(MockRandomnessBeaconFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    ;({ appClient: mockBeacon } = await mockBeaconFactory.send.create.bare())

    // Build the full Akita DAO universe (includes auctionFactory with escrow configured)
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {
        vrfBeacon: mockBeacon.appId,
      },
    })

    // Create a test ASA for auction prize
    const assetCreateTxn = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000_000n,
      decimals: 0,
      assetName: 'Test NFT',
      unitName: 'TNFT',
    })
    testAssetId = BigInt(assetCreateTxn.confirmation.assetIndex!)

    // Opt all accounts into the test asset
    for (const account of [seller, bidder1, bidder2]) {
      await algorand.send.assetOptIn({
        sender: account.addr,
        signer: account.signer,
        assetId: testAssetId,
      })
    }

    // Transfer some test assets to the seller
    await algorand.send.assetTransfer({
      sender: deployer.addr,
      signer: deployer.signer,
      assetId: testAssetId,
      amount: 100n,
      receiver: seller.addr,
    })

    // Fund the auction factory to cover auction creation MBR
    await algorand.account.ensureFunded(
      akitaUniverse.auctionFactory.client.appAddress,
      dispenser.addr,
      (100).algo(),
    )

    await akitaUniverse.auctionFactory.optIn({ asset: testAssetId })
  })

  // ==========================================================================
  // AuctionFactorySDK.cost() — read-only, independent
  // ==========================================================================
  describe('AuctionFactorySDK.cost()', () => {
    test('should return the cost to create an auction', async () => {
      const cost = await akitaUniverse.auctionFactory.cost({
        isPrizeBox: false,
        bidAssetId: 0n,
        prizeAssetId: 0n,
        weightsListCount: 0n,
      })
      expect(cost).toBeGreaterThan(0n)
    })

    test('should return higher cost with weights list', async () => {
      const costNoWeights = await akitaUniverse.auctionFactory.cost({
        isPrizeBox: false,
        bidAssetId: 0n,
        prizeAssetId: 0n,
        weightsListCount: 0n,
      })
      const costWithWeights = await akitaUniverse.auctionFactory.cost({
        isPrizeBox: false,
        bidAssetId: 0n,
        prizeAssetId: 0n,
        weightsListCount: 1n,
      })
      expect(costWithWeights).toBeGreaterThan(costNoWeights)
    })
  })

  // ==========================================================================
  // Simple ALGO Auction — create, bid, claim
  //
  // The describe block deploys ONE auction and walks it through both bids plus
  // the claim in beforeAll, then each test reads one aspect of the final state.
  // That means every test inside this describe is independent and can be added,
  // removed, or reordered without cascading failures.
  // ==========================================================================
  describe('Simple ALGO Auction', () => {
    let auction: AuctionSDK
    let sellerBalanceBefore: bigint
    let escrowBalanceBefore: bigint
    let auctionEscrowAppId: bigint

    beforeAll(async () => {
      const currentTimestamp = await getBlockTimestamp(algorand)
      sellerBalanceBefore = await getAccountBalance(algorand, seller.addr.toString())

      // Capture the DAO auction-revenue escrow balance before the sale so we can
      // assert (in the Fee System describe) that it strictly increased.
      const auctionEscrow = await akitaUniverse.dao.wallet.getEscrow('rev_auction')
      auctionEscrowAppId = auctionEscrow.id
      escrowBalanceBefore = await getAccountBalance(
        algorand,
        getApplicationAddress(auctionEscrowAppId).toString(),
      )

      auction = await akitaUniverse.auctionFactory.newAuction({
        sender: seller.addr,
        signer: seller.signer,
        isPrizeBox: false,
        prizeAsset: testAssetId,
        prizeAmount: 1n,
        name: 'Test Auction',
        proof: [],
        bidAssetId: 0n, // ALGO bids
        bidFee: 0n,
        startingBid: 1_000_000n, // 1 ALGO
        bidMinimumIncrease: 100_000n, // 0.1 ALGO
        startTimestamp: currentTimestamp + BigInt(ONE_MINUTE),
        endTimestamp: currentTimestamp + BigInt(ONE_DAY),
        gateId: 0n,
        marketplace: seller.addr.toString(),
        weightsListCount: 0n,
      })

      // Before-start window: verify isLive is false at creation time, then warp
      // into the live window for bids.
      expect(await auction.isLive()).toBe(false)
      await timeWarp.timeWarp(BigInt(ONE_MINUTE + 10))

      // Initial bid
      await auction.bid({
        sender: bidder1.addr,
        signer: bidder1.signer,
        amount: 1_000_000n, // 1 ALGO (starting bid)
        marketplace: seller.addr.toString(),
      })

      // Outbid
      await auction.bid({
        sender: bidder2.addr,
        signer: bidder2.signer,
        amount: 1_100_000n, // 1.1 ALGO
        marketplace: seller.addr.toString(),
      })

      // End the auction and have the winner claim.
      await timeWarp.timeWarp(BigInt(ONE_DAY + 10))
      await auction.claimPrize({
        sender: bidder2.addr,
        signer: bidder2.signer,
      })
    })

    test('newAuction returns an AuctionSDK with a valid appId', () => {
      expect(auction).toBeInstanceOf(AuctionSDK)
      expect(auction.client.appId).toBeGreaterThan(0n)
    })

    test('newAuction charges the seller', async () => {
      const sellerBalanceAfter = await getAccountBalance(algorand, seller.addr.toString())
      expect(sellerBalanceBefore).toBeGreaterThan(sellerBalanceAfter)
    })

    test('factory.get() returns the same AuctionSDK for an existing appId', () => {
      const existing = akitaUniverse.auctionFactory.get({ appId: auction.client.appId })
      expect(existing).toBeInstanceOf(AuctionSDK)
      expect(existing.client.appId).toBe(auction.client.appId)
    })

    test('state reflects creation parameters and the winning bid', async () => {
      const state = await auction.state()
      expect(state.prize).toBe(testAssetId)
      expect(state.isPrizeBox).toBeFalsy()
      expect(state.bidAsset).toBe(0n) // ALGO
      expect(state.startingBid).toBe(1_000_000n)
      expect(state.highestBid).toBe(1_100_000n) // after bidder2 outbid bidder1
    })

    test('mbr returns non-zero values for all box types', async () => {
      const mbr = await auction.mbr()
      expect(mbr.bids).toBeGreaterThan(0n)
      expect(mbr.bidsByAddress).toBeGreaterThan(0n)
      expect(mbr.locations).toBeGreaterThan(0n)
    })

    test('getMinimumBidAmount returns highestBid + bidMinimumIncrease (1.1 + 0.1 = 1.2 ALGO)', async () => {
      const minBid = await auction.getMinimumBidAmount()
      expect(minBid).toBe(1_200_000n)
    })

    test('hasBid returns true for both bidders', async () => {
      expect(await auction.hasBid({ address: bidder1.addr.toString() })).toBe(true)
      expect(await auction.hasBid({ address: bidder2.addr.toString() })).toBe(true)
    })

    test('hasBid returns false for non-bidders', async () => {
      expect(await auction.hasBid({ address: deployer.addr.toString() })).toBe(false)
    })

    test('prize is marked claimed after claimPrize', async () => {
      const state = await auction.state()
      expect(state.prizeClaimed).toBeTruthy()
    })

    test('DAO auction-revenue escrow balance strictly increased after claim', async () => {
      const escrowBalanceAfter = await getAccountBalance(
        algorand,
        getApplicationAddress(auctionEscrowAppId).toString(),
      )
      expect(escrowBalanceAfter).toBeGreaterThan(escrowBalanceBefore)
    })
  })

  // ==========================================================================
  // Fee System — checks that don't need a completed auction
  // ==========================================================================
  describe('Fee System & Revenue Collection', () => {
    test('auction factory has DAO escrow configured', async () => {
      const factoryState = await akitaUniverse.auctionFactory.client.state.global.getAll()
      expect(factoryState.akitaDaoEscrow).toBeDefined()
      expect(factoryState.akitaDaoEscrow?.app).toBeGreaterThan(0n)
    })

    test('DAO auction-revenue escrow is registered with a valid appId', async () => {
      const auctionEscrow = await akitaUniverse.dao.wallet.getEscrow('rev_auction')
      expect(auctionEscrow).toBeDefined()
      expect(auctionEscrow.id).toBeGreaterThan(0n)
    })
  })

  // ==========================================================================
  // Raffle Auction — self-contained (its own describe-level beforeAll)
  // ==========================================================================
  describe('Raffle Auction (bidFee > 0)', () => {
    let raffleAuction: AuctionSDK
    let raffleBidders: TransactionSignerAccount[] = []
    const NUM_BIDDERS = 40 // Enough to require multiple findWinner iterations even with max iterationAmount
    const BID_FEE = 1000n // 10% fee (in hundredths: 1000 = 10.00%)
    let raffleAssetId: bigint

    beforeAll(async () => {
      // Reset time for this test suite
      await timeWarp.resetTimeWarp()

      // Create bidder accounts for the raffle test
      for (let i = 0; i < NUM_BIDDERS; i++) {
        const bidder = await fixture.context.generateAccount({
          initialFunds: algokit.microAlgos(100_000_000),
        })
        await algorand.account.ensureFunded(bidder.addr, dispenser.addr, (100).algo())
        raffleBidders.push(bidder)
      }

      // Create a new asset for the raffle auction
      const assetCreateTxn = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1n,
        decimals: 0,
        assetName: 'Raffle NFT',
        unitName: 'RNFT',
      })
      raffleAssetId = BigInt(assetCreateTxn.confirmation.assetIndex!)

      // Transfer to seller
      await algorand.send.assetOptIn({
        sender: seller.addr,
        signer: seller.signer,
        assetId: raffleAssetId,
      })
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        assetId: raffleAssetId,
        amount: 1n,
        receiver: seller.addr,
      })

      // Opt factory into new asset
      await akitaUniverse.auctionFactory.optIn({ asset: raffleAssetId })
    })

    test('should create raffle auction with bidFee', async () => {
      const currentTimestamp = await getBlockTimestamp(algorand)

      raffleAuction = await akitaUniverse.auctionFactory.newAuction({
        sender: seller.addr,
        signer: seller.signer,
        isPrizeBox: false,
        prizeAsset: raffleAssetId,
        prizeAmount: 1n,
        name: 'Raffle Test Auction',
        proof: [],
        bidAssetId: 0n, // ALGO bids
        bidFee: BID_FEE, // 10% fee enables raffle
        startingBid: 1_000_000n, // 1 ALGO
        bidMinimumIncrease: 100_000n, // 0.1 ALGO
        startTimestamp: currentTimestamp + BigInt(ONE_MINUTE),
        endTimestamp: currentTimestamp + BigInt(ONE_DAY),
        gateId: 0n,
        marketplace: seller.addr.toString(),
        weightsListCount: 3n, // Required for raffle mode
      })

      expect(raffleAuction).toBeInstanceOf(AuctionSDK)

      const state = await raffleAuction.state()
      expect(state.bidFee).toBe(BID_FEE)
      expect(state.weightsBoxCount).toBe(3n)
    })

    test('should allow multiple bidders to place bids', async () => {
      // Time warp to auction start
      await timeWarp.timeWarp(BigInt(ONE_MINUTE + 10))

      // Have all bidders place bids sequentially (each outbidding the previous)
      for (let i = 0; i < raffleBidders.length; i++) {
        const bidder = raffleBidders[i]
        const bidAmount = 1_000_000n + BigInt(i) * 100_000n // 1 ALGO + 0.1*i ALGO

        await raffleAuction.bid({
          sender: bidder.addr,
          signer: bidder.signer,
          amount: bidAmount,
          marketplace: seller.addr.toString(),
        })
      }

      const state = await raffleAuction.state()
      // Each unique bidder gets tracked
      expect(state.uniqueAddressCount).toBe(BigInt(NUM_BIDDERS))
      // Raffle amount should have accumulated from bid fees
      expect(state.raffleAmount).toBeGreaterThan(0n)
      // Highest bid should be from last bidder
      expect(state.highestBid).toBe(1_000_000n + BigInt(NUM_BIDDERS - 1) * 100_000n)
    })

    test('should track raffle fee accumulation', async () => {
      const state = await raffleAuction.state()

      // With 10% fee on each bid, raffle pool should be ~10% of total weighted bids
      // (excluding the highest bidder who doesn't participate in raffle)
      expect(state.raffleAmount).toBeGreaterThan(0n)
      expect(state.weightedBidTotal).toBeGreaterThan(0n)
    })

    test('should draw winning ticket after auction ends', async () => {
      // Time warp to after auction ends
      await timeWarp.timeWarp(BigInt(ONE_DAY + 100))

      // AR-01 commit-reveal: the first call commits to a future round (no ticket yet)
      await raffleAuction.raffle({
        sender: deployer.addr,
        signer: deployer.signer,
      })

      const committed = await raffleAuction.state()
      expect(committed.raffleRound).toBeGreaterThan(0n)
      expect(committed.winningTicket).toBe(0n)

      // advance past the committed round's beacon availability, then draw
      const ready = await raffleAuction.drawReadyRound()
      await timeWarp.roundWarp(ready)
      await raffleAuction.raffle({
        sender: deployer.addr,
        signer: deployer.signer,
      })

      const state = await raffleAuction.state()
      expect(state.raffleRound).toBe(committed.raffleRound)
      expect(state.winningTicket).toBeGreaterThan(0n)
    })

    test('should find raffle winner using cursor iteration', async () => {
      // findWinner needs to iterate through participants
      // We maximize iterationAmount (16) to test max per transaction group
      // With 40 bidders, we ensure multiple transaction groups are needed
      // This tests both: max throughput per group AND cursor-based iteration across groups

      const stateBefore = await raffleAuction.state()
      // raffleWinner is initialized to zero address, not empty string
      expect(stateBefore.raffleWinner).toBe(ALGORAND_ZERO_ADDRESS_STRING)

      // Use maximum iteration amount (16) to test max per transaction group
      // With 40 bidders, highest bidder is excluded, so 39 participants
      // Using 16 per iteration: first call processes 16, second processes 16, third processes 7
      // This maximizes throughput per group while ensuring multiple groups are needed
      const ITERATION_SIZE = 16n

      let attempts = 0
      const MAX_ATTEMPTS = 10 // Safety limit
      let state = await raffleAuction.state()

      while (state.raffleWinner === ALGORAND_ZERO_ADDRESS_STRING && attempts < MAX_ATTEMPTS) {
        await raffleAuction.findWinner({
          sender: deployer.addr,
          signer: deployer.signer,
          iterationAmount: ITERATION_SIZE,
        })

        state = await raffleAuction.state()
        attempts++
      }

      // Should have found a winner (not the highest bidder)
      expect(state.raffleWinner).not.toBe(ALGORAND_ZERO_ADDRESS_STRING)
      // Winner should not be the auction winner (highest bidder)
      const highestBidder = raffleBidders[raffleBidders.length - 1]
      expect(state.raffleWinner).not.toBe(highestBidder.addr.toString())

      // Should have required multiple transaction groups to test cursor iteration
      // With 39 participants and 16 per iteration, we need at least 2-3 calls
      // This tests both: maximum iterationAmount per group (16) AND multiple groups
      // With the winner's weight excluded (AR-02) the ticket can land in the first window,
      // so a single call may already find the winner; the search must finish within the
      // ceil(39 / 16) = 3 windows either way.
      expect(attempts).toBeGreaterThanOrEqual(1)
      expect(attempts).toBeLessThanOrEqual(3)
    })

    test('should allow auction winner to claim prize', async () => {
      // Time warp to after raffle auction ends
      await timeWarp.timeWarp(BigInt(ONE_DAY + 100))

      const highestBidder = raffleBidders[raffleBidders.length - 1]

      // Opt highest bidder into the prize asset
      await algorand.send.assetOptIn({
        sender: highestBidder.addr,
        signer: highestBidder.signer,
        assetId: raffleAssetId,
      })

      await raffleAuction.claimPrize({
        sender: highestBidder.addr,
        signer: highestBidder.signer,
      })

      const state = await raffleAuction.state()
      expect(state.prizeClaimed).toBeTruthy()
    })

    test('should allow raffle winner to claim raffle prize', async () => {
      const state = await raffleAuction.state()
      const raffleWinnerAddr = state.raffleWinner

      expect(raffleWinnerAddr).not.toBe(ALGORAND_ZERO_ADDRESS_STRING)

      // Find the raffle winner account
      const raffleWinner = raffleBidders.find((b) => b.addr.toString() === raffleWinnerAddr)
      expect(raffleWinner).toBeDefined()

      const balanceBefore = await getAccountBalance(algorand, raffleWinnerAddr)

      await raffleAuction.claimRafflePrize({
        sender: raffleWinner!.addr,
        signer: raffleWinner!.signer,
      })

      const balanceAfter = await getAccountBalance(algorand, raffleWinnerAddr)
      const stateAfter = await raffleAuction.state()

      expect(stateAfter.rafflePrizeClaimed).toBeTruthy()
      // Winner should have received the raffle pool
      expect(balanceAfter).toBeGreaterThan(balanceBefore)
    })

    test('should verify hasBid works for raffle participants', async () => {
      // All bidders should show as having bid
      for (const bidder of raffleBidders) {
        const hasBid = await raffleAuction.hasBid({ address: bidder.addr.toString() })
        expect(hasBid).toBe(true)
      }

      // Non-participant should show as not having bid
      const hasBid = await raffleAuction.hasBid({ address: deployer.addr.toString() })
      expect(hasBid).toBe(false)
    })
  })

  // ==========================================================================
  // Audit 2026-10 regressions (AR-01 … AR-13)
  // ==========================================================================
  describe('Audit 2026-10 regressions', () => {
    const ZERO = ALGORAND_ZERO_ADDRESS_STRING
    const BID_FEE = 1_000n // 1%
    const BEACON_MAX_WAIT_ROUNDS = 1_000n

    const factoryAddress = () => akitaUniverse.auctionFactory.client.appAddress.toString()

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

    const newBidder = async () => {
      const account = await newAccount(50)
      await optInTo(account, testAssetId)
      return account
    }

    const createAuction = async (
      owner: TransactionSignerAccount,
      { bidFee = BID_FEE, startIn = 60n, duration = 3_600n, bidAssetId = 0n, startingBid = 1_000_000n, prizeAsset = testAssetId, weightsListCount = bidFee > 0n ? 3n : 0n }: {
        bidFee?: bigint, startIn?: bigint, duration?: bigint, bidAssetId?: bigint, startingBid?: bigint, prizeAsset?: bigint, weightsListCount?: bigint
      } = {},
    ) => {
      const now = await getBlockTimestamp(algorand)
      return akitaUniverse.auctionFactory.newAuction({
        sender: owner.addr,
        signer: owner.signer,
        isPrizeBox: false,
        prizeAsset,
        prizeAmount: 1n,
        name: 'Regression Auction',
        proof: [],
        bidAssetId,
        bidFee,
        startingBid,
        bidMinimumIncrease: 100_000n,
        startTimestamp: now + startIn,
        endTimestamp: now + duration,
        gateId: 0n,
        marketplace: owner.addr.toString(),
        weightsListCount,
      })
    }

    const bid = (auction: AuctionSDK, bidder: TransactionSignerAccount, amount: bigint) =>
      auction.bid({ sender: bidder.addr, signer: bidder.signer, amount, marketplace: bidder.addr.toString() })

    /** commit-reveal draw (AR-01): commit, wait for the beacon round, draw */
    const draw = async (auction: AuctionSDK) => {
      await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
      const state = await auction.state()
      if (state.winningTicket === 0n && !state.rafflePrizeClaimed && state.raffleRound > 0n) {
        await timeWarp.roundWarp(await auction.drawReadyRound())
        await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
      }
    }

    const findWinner = async (auction: AuctionSDK): Promise<string> => {
      for (let i = 0; i < 10; i++) {
        const { raffleWinner } = await auction.state()
        if (raffleWinner !== ZERO) return raffleWinner
        await auction.findWinner({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 16n })
      }
      throw new Error('raffle winner not found')
    }

    /** refund every bid's MBR, clear the weights boxes and delete through the factory */
    const cleanupAndDelete = async (auction: AuctionSDK, owner: TransactionSignerAccount) => {
      const state = await auction.state()
      if (state.bidID > 1n) {
        await auction.refundMBR({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 16n })
      }
      if (state.weightsBoxCount > 0n) {
        await auction.clearWeightsBoxes({ sender: deployer.addr, signer: deployer.signer, iterationAmount: state.weightsBoxCount })
      }
      await akitaUniverse.auctionFactory.deleteAuction({ sender: owner.addr, signer: owner.signer, appId: auction.client.appId })
      await expect(algorand.client.algod.getApplicationByID(auction.client.appId).do()).rejects.toThrow()
    }

    test('AR-01/02/03/05/13: commit-reveal draw, winner weight excluded, raffle prize claimed before refunds stays solvent, exact factory refund', async () => {
      const owner = await newSeller()
      const [a, b] = [await newBidder(), await newBidder()]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const auction = await createAuction(owner)
      await timeWarp.timeWarp(70n)
      await bid(auction, a, 1_000_000n)
      await bid(auction, b, 1_100_000n)
      await timeWarp.timeWarp(3_700n)

      // AR-01: the first call only commits to a future round
      await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
      const committed = await auction.state()
      const { lastRound } = await algorand.client.algod.status().do()
      expect(committed.winningTicket).toBe(0n)
      expect(committed.raffleRound).toBeGreaterThan(lastRound)
      // AR-02: the auction winner's weight was removed at commit
      expect(committed.weightedBidTotal).toBe(1_000_000n)

      // the committed round's beacon value is not available yet
      await expect(auction.raffle({ sender: deployer.addr, signer: deployer.signer })).rejects.toThrow()

      // TRADE-3: an empty beacon read before BEACON_MAX_WAIT_ROUNDS reverts and keeps the commitment
      await mockBeacon.send.setEmpty({ args: { empty: true } })
      try {
        await timeWarp.roundWarp(await auction.drawReadyRound())
        await expect(auction.raffle({ sender: deployer.addr, signer: deployer.signer }).then(() => 'revealed')).rejects.toThrow(/Bnrd/)
        const kept = await auction.state()
        expect(kept.raffleRound).toBe(committed.raffleRound)
        expect(kept.vrfFailureCount).toBe(0n)

        // after BEACON_MAX_WAIT_ROUNDS an empty read re-commits forward, never to an already-public round
        await timeWarp.roundWarp(committed.raffleRound + BEACON_MAX_WAIT_ROUNDS)
        await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
        const recommitted = await auction.state()
        const status = await algorand.client.algod.status().do()
        expect(recommitted.vrfFailureCount).toBe(1n)
        expect(recommitted.winningTicket).toBe(0n)
        expect(recommitted.raffleRound % 8n).toBe(0n)
        expect(recommitted.raffleRound).toBeGreaterThan(status.lastRound)
      } finally {
        await mockBeacon.send.setEmpty({ args: { empty: false } })
      }

      await timeWarp.roundWarp(await auction.drawReadyRound())
      await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
      expect((await auction.state()).winningTicket).toBeGreaterThan(0n)

      // AR-02: only the losing bidder can win, whatever the ticket
      expect(await findWinner(auction)).toBe(a.addr.toString())

      // AR-03: claim the raffle prize before anyone is refunded; every refund must still succeed
      const aBefore = await getAccountBalance(algorand, a.addr.toString())
      await auction.claimRafflePrize({ sender: deployer.addr, signer: deployer.signer })
      const aAfter = await getAccountBalance(algorand, a.addr.toString())
      const losingFee = 10_000n // 1% of A's losing 1 ALGO bid; B's winning fee is not part of the pool
      expect(aAfter - aBefore).toBeGreaterThan(0n)
      expect(aAfter - aBefore).toBeLessThanOrEqual(losingFee)

      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      const refundBefore = await getAccountBalance(algorand, a.addr.toString())
      await cleanupAndDelete(auction, owner)
      const refundAfter = await getAccountBalance(algorand, a.addr.toString())
      // A gets the losing bid back minus the retained fee, plus its bid/address/location MBR
      expect(refundAfter - refundBefore).toBeGreaterThanOrEqual(1_000_000n - losingFee)

      // AR-13: the factory refunded exactly what it released (pooled balance untouched)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('AR-02: a single-bidder fee auction settles without a raffle and can be deleted', async () => {
      const owner = await newSeller()
      const a = await newBidder()
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const auction = await createAuction(owner)
      await timeWarp.timeWarp(70n)
      await bid(auction, a, 1_000_000n)
      await timeWarp.timeWarp(3_700n)

      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
      const state = await auction.state()
      expect(state.rafflePrizeClaimed).toBeTruthy()
      expect(state.winningTicket).toBe(0n)
      expect(state.raffleRound).toBe(0n)

      await cleanupAndDelete(auction, owner)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('anyone can pay for a bid; the bid belongs to the bidder and its storage returns to the payer', async () => {
      const PAYER_RECORD_MBR = 28_500n
      const owner = await newSeller()
      const [a, b, sponsor] = [await newBidder(), await newBidder(), await newAccount(50)]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const auction = await createAuction(owner)
      await timeWarp.timeWarp(70n)
      const costs = await auction.mbr()
      const storage = costs.bids + costs.bidsByAddress + costs.locations // a first bid in a fee auction

      // the sponsor's payment carries the bid, the bid's storage and its own payer record
      const amount = 1_000_000n
      const sponsoredBid = async (paid: bigint) => auction.client.send.bid({
        sender: a.addr,
        signer: a.signer,
        args: {
          payment: {
            txn: await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: auction.client.appAddress, amount: paid.microAlgo() }),
            signer: sponsor.signer,
          },
          marketplace: a.addr.toString(),
        },
        populateAppCallResources: true,
        coverAppCallInnerTransactionFees: true,
        maxFee: (20_000).microAlgo(),
      })
      // a payment that only covers the bid and its storage is short by the payer record
      await expect(sponsoredBid(amount + storage)).rejects.toThrow()
      const sponsorBefore = await getAccountBalance(algorand, sponsor.addr.toString())
      await sponsoredBid(amount + storage + PAYER_RECORD_MBR)
      expect(sponsorBefore - await getAccountBalance(algorand, sponsor.addr.toString())).toBe(amount + storage + PAYER_RECORD_MBR + 1_000n)
      const live = await auction.state()
      expect(live.highestBid).toBe(amount)
      expect(await auction.hasBid({ address: a.addr.toString() })).toBe(true)

      // b outbids with its own money; a's bid amount is a's to take back
      await bid(auction, b, 2_000_000n)
      await timeWarp.timeWarp(3_700n)
      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      await draw(auction)
      if (!(await auction.state()).rafflePrizeClaimed) {
        await findWinner(auction)
        await auction.claimRafflePrize({ sender: deployer.addr, signer: deployer.signer })
      }

      // the cleanup pays a's bid back to a, and the bid storage with its payer record back to the sponsor
      const sponsorHeld = await getAccountBalance(algorand, sponsor.addr.toString())
      const aHeld = await getAccountBalance(algorand, a.addr.toString())
      const bHeld = await getAccountBalance(algorand, b.addr.toString())
      await cleanupAndDelete(auction, owner)
      expect(await getAccountBalance(algorand, sponsor.addr.toString()) - sponsorHeld).toBe(storage + PAYER_RECORD_MBR)
      const fee = (amount * BID_FEE) / 100_000n
      expect(await getAccountBalance(algorand, a.addr.toString()) - aHeld).toBe(amount - fee)
      expect(await getAccountBalance(algorand, b.addr.toString()) - bHeld).toBe(storage)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('eight sponsored bids are refunded in one call, the batch size the desktop app uses', async () => {
      const PAYER_RECORD_MBR = 28_500n
      const owner = await newSeller()
      const sponsor = await newAccount(200)
      const bidders: TransactionSignerAccount[] = []
      for (let i = 0; i < 8; i++) bidders.push(await newBidder())

      const auction = await createAuction(owner)
      await timeWarp.timeWarp(70n)
      const costs = await auction.mbr()
      const storage = costs.bids + costs.bidsByAddress + costs.locations // a first bid in a fee auction
      let amount = 1_000_000n
      for (const bidder of bidders) {
        await auction.client.send.bid({
          sender: bidder.addr,
          signer: bidder.signer,
          args: {
            payment: {
              txn: await algorand.createTransaction.payment({
                sender: sponsor.addr, receiver: auction.client.appAddress, amount: (amount + storage + PAYER_RECORD_MBR).microAlgo(),
              }),
              signer: sponsor.signer,
            },
            marketplace: bidder.addr.toString(),
          },
          populateAppCallResources: true,
          coverAppCallInnerTransactionFees: true,
          maxFee: (20_000).microAlgo(),
        })
        amount += 200_000n
      }
      await timeWarp.timeWarp(3_700n)
      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      await draw(auction)
      if (!(await auction.state()).rafflePrizeClaimed) {
        await findWinner(auction)
        await auction.claimRafflePrize({ sender: deployer.addr, signer: deployer.signer })
      }

      // Seven losing bids are still to be paid back, and every bid's storage has a payer record.
      const cursor = async () => (await auction.client.state.global.refundMbrCursor()) ?? 0n
      const before = await cursor()
      const sponsorHeld = await getAccountBalance(algorand, sponsor.addr.toString())
      await auction.refundMBR({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 8n })
      expect((await cursor()) - before).toBe(8n)
      expect(await getAccountBalance(algorand, sponsor.addr.toString()) - sponsorHeld).toBe(8n * (storage + PAYER_RECORD_MBR))
      // every refund is done, so only the weights boxes and the app itself are left to remove
      const { weightsBoxCount } = await auction.state()
      if (weightsBoxCount > 0n) {
        await auction.clearWeightsBoxes({ sender: deployer.addr, signer: deployer.signer, iterationAmount: weightsBoxCount })
      }
      await akitaUniverse.auctionFactory.deleteAuction({ sender: owner.addr, signer: owner.signer, appId: auction.client.appId })
      await expect(algorand.client.algod.getApplicationByID(auction.client.appId).do()).rejects.toThrow()
    })

    test('AR-02: the current highest bidder cannot outbid itself in a fee auction', async () => {
      const owner = await newSeller()
      const [a, b] = [await newBidder(), await newBidder()]
      const auction = await createAuction(owner)
      await timeWarp.timeWarp(70n)

      await bid(auction, a, 1_000_000n)
      await expect(bid(auction, a, 1_100_000n)).rejects.toThrow(/Cobs/)
      // A may bid again once someone else is highest
      await bid(auction, b, 1_100_000n)
      await bid(auction, a, 1_200_000n)
      expect((await auction.state()).highestBid).toBe(1_200_000n)
    })

    test('AR-02: fee auctions need a positive starting bid', async () => {
      const owner = await newSeller()
      await expect(createAuction(owner, { startingBid: 0n })).rejects.toThrow(/Sbrq/)
    })

    test('AR-04: an auction with no bids returns the prize to the seller and can be deleted', async () => {
      const owner = await newSeller()
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())
      const auction = await createAuction(owner)
      await timeWarp.timeWarp(3_700n)

      const prizeBefore = (await algorand.asset.getAccountInformation(owner.addr, testAssetId)).balance
      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      const prizeAfter = (await algorand.asset.getAccountInformation(owner.addr, testAssetId)).balance
      expect(prizeAfter - prizeBefore).toBe(1n)

      const state = await auction.state()
      expect(state.prizeClaimed).toBeTruthy()
      expect(state.rafflePrizeClaimed).toBeTruthy()

      await cleanupAndDelete(auction, owner)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('AR-04: the seller can cancel a fee auction before it starts (others cannot clear its weights)', async () => {
      const owner = await newSeller()
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())
      const auction = await createAuction(owner, { startIn: 7_200n, duration: 14_400n })

      await expect(
        auction.clearWeightsBoxes({ sender: deployer.addr, signer: deployer.signer, iterationAmount: 3n })
      ).rejects.toThrow()

      const sellerBefore = await getAccountBalance(algorand, owner.addr.toString())
      const returned = await auction.clearWeightsBoxes({ sender: owner.addr, signer: owner.signer, iterationAmount: 3n })
      expect(returned).toBe(3n * (await auction.mbr()).weights)
      // AR-13: the weights MBR goes straight back to the funder
      expect(await getAccountBalance(algorand, owner.addr.toString())).toBeGreaterThan(sellerBefore)

      await akitaUniverse.auctionFactory.cancelAuction({ sender: owner.addr, signer: owner.signer, appId: auction.client.appId })
      await expect(algorand.client.algod.getApplicationByID(auction.client.appId).do()).rejects.toThrow()
      expect((await algorand.asset.getAccountInformation(owner.addr, testAssetId)).balance).toBe(1n)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('AR-05/13: a claimed zero-fee ASA-prize auction can be deleted with an exact refund', async () => {
      const owner = await newSeller()
      const [a, b] = [await newBidder(), await newBidder()]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const auction = await createAuction(owner, { bidFee: 0n })
      await timeWarp.timeWarp(70n)
      await bid(auction, a, 1_000_000n)
      await bid(auction, b, 1_100_000n)
      await timeWarp.timeWarp(3_700n)
      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      expect((await algorand.asset.getAccountInformation(b.addr, testAssetId)).balance).toBe(1n)

      await cleanupAndDelete(auction, owner)
      expect(await getAccountBalance(algorand, factoryAddress())).toBe(factoryBefore)
    })

    test('AR-06: an ASA-bid auction settles and its protocol fee lands in the DAO revenue escrow', async () => {
      const owner = await newSeller()
      const [a, b] = [await newBidder(), await newBidder()]

      const { assetId: bidAssetId } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000_000_000n, decimals: 0, assetName: 'Bid Token', unitName: 'BID',
      })
      for (const account of [owner, a, b]) await optInTo(account, bidAssetId)
      for (const account of [a, b]) {
        await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: bidAssetId, amount: 10_000_000n, receiver: account.addr })
      }
      await akitaUniverse.auctionFactory.optIn({ sender: deployer.addr, signer: deployer.signer, asset: bidAssetId })

      const escrow = await akitaUniverse.dao.wallet.getEscrow('rev_auction')
      const escrowAddress = getApplicationAddress(escrow.id)
      const escrowBefore = (await algorand.asset.getAccountInformation(escrowAddress, bidAssetId)).balance

      const auction = await createAuction(owner, { bidFee: 0n, bidAssetId })
      await timeWarp.timeWarp(70n)
      await auction.bid({ sender: a.addr, signer: a.signer, amount: 1_000_000n, marketplace: owner.addr.toString(), isAsa: true, bidAsset: bidAssetId })
      await auction.bid({ sender: b.addr, signer: b.signer, amount: 2_000_000n, marketplace: owner.addr.toString(), isAsa: true, bidAsset: bidAssetId })
      await timeWarp.timeWarp(3_700n)

      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      const escrowAfter = (await algorand.asset.getAccountInformation(escrowAddress, bidAssetId)).balance
      expect(escrowAfter).toBeGreaterThan(escrowBefore)
      // the DAO app account never holds the bid asset
      await expect(
        algorand.asset.getAccountInformation(getApplicationAddress(akitaUniverse.dao.appId), bidAssetId)
      ).rejects.toThrow()

      await cleanupAndDelete(auction, owner)
    })

    test('AR-11: the prize cannot be the bid asset', async () => {
      const owner = await newSeller()
      await expect(createAuction(owner, { bidFee: 0n, bidAssetId: testAssetId })).rejects.toThrow(/Piba/)
    })

    test('AR-12: quoted bid MBR equals the actual min-balance increase', async () => {
      const owner = await newSeller()
      const [a, b] = [await newBidder(), await newBidder()]
      const auction = await createAuction(owner)
      await timeWarp.timeWarp(70n)

      const { bids, bidsByAddress, locations } = await auction.mbr()
      const minBalance = async () =>
        BigInt((await algorand.client.algod.accountInformation(auction.client.appAddress).do()).minBalance)

      const before = await minBalance()
      await bid(auction, a, 1_000_000n)
      const afterFirst = await minBalance()
      expect(afterFirst - before).toBe(bids + bidsByAddress + locations)

      await bid(auction, b, 1_100_000n)
      await bid(auction, a, 1_200_000n)
      const afterRepeat = await minBalance()
      // b: first bid (3 boxes); a's second bid: only a new bid box
      expect(afterRepeat - afterFirst).toBe(bids + bidsByAddress + locations + bids)
    })

    test('TRADE-2: the factory rejects a prize ASA that has a clawback or freeze address', async () => {
      const owner = await newSeller()
      for (const role of ['clawback', 'freeze'] as const) {
        const { assetId } = await algorand.send.assetCreate({
          sender: owner.addr, signer: owner.signer, total: 1n, decimals: 0, assetName: `Seizable ${role}`, unitName: 'SZP', [role]: owner.addr,
        })
        await akitaUniverse.auctionFactory.optIn({ sender: deployer.addr, signer: deployer.signer, asset: BigInt(assetId) })
        await expect(createAuction(owner, { prizeAsset: BigInt(assetId) }).then(() => 'created')).rejects.toThrow(/Pszb/)
      }
    })

    test('TRADE-3: the draw commits to a stored beacon round and completes at the first allowed reveal', async () => {
      const owner = await newSeller()
      const [a, b] = [await newBidder(), await newBidder()]
      const auction = await createAuction(owner)
      await timeWarp.timeWarp(70n)
      await bid(auction, a, 1_000_000n)
      await bid(auction, b, 1_100_000n)
      await timeWarp.timeWarp(3_700n)

      // MainNet beacon timing: one value per multiple of 8, submitted 2 rounds later
      await mockBeacon.send.setSubmitLag({ args: { lag: 2n } })
      try {
        // commit in a round ≡ 1 (mod 8), the residue whose reveal used to read empty forever
        const { lastRound } = await algorand.client.algod.status().do()
        const next = lastRound + 1n
        await timeWarp.roundWarp(next + ((9n - (next % 8n)) % 8n) - 1n)
        await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
        const committed = await auction.state()
        expect(committed.raffleRound % 8n).toBe(0n)

        // the reveal lands exactly in the first allowed round
        await timeWarp.roundWarp((await auction.drawReadyRound()) - 1n)
        await auction.raffle({ sender: deployer.addr, signer: deployer.signer })
        const drawn = await auction.state()
        expect(drawn.winningTicket).toBeGreaterThan(0n)
        expect(drawn.raffleRound).toBe(committed.raffleRound)
        expect(drawn.vrfFailureCount).toBe(0n)
      } finally {
        await mockBeacon.send.setSubmitLag({ args: { lag: 0n } })
      }
    })

    test('TRADE-4: a zero-fee auction cannot be charged for weights boxes', async () => {
      const owner = await newSeller()
      await expect(createAuction(owner, { bidFee: 0n, weightsListCount: 3n }).then(() => 'created')).rejects.toThrow(/Wnbf/)
    })

    test('TRADE-5: a bidder that opted out of the bid asset blocks neither refunds, the raffle prize nor deletion', async () => {
      const owner = await newSeller()
      const [a, b] = [await newBidder(), await newBidder()]
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000_000_000n, decimals: 0, assetName: 'Opt-out Bid', unitName: 'OOB',
      })
      const bidAssetId = BigInt(assetId)
      for (const account of [owner, a, b]) await optInTo(account, bidAssetId)
      for (const account of [a, b]) {
        await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: bidAssetId, amount: 10_000_000n, receiver: account.addr })
      }
      await akitaUniverse.auctionFactory.optIn({ sender: deployer.addr, signer: deployer.signer, asset: bidAssetId })

      const auction = await createAuction(owner, { bidAssetId })
      await timeWarp.timeWarp(70n)
      await auction.bid({ sender: a.addr, signer: a.signer, amount: 1_000_000n, marketplace: owner.addr.toString(), isAsa: true, bidAsset: bidAssetId })
      await auction.bid({ sender: b.addr, signer: b.signer, amount: 2_000_000n, marketplace: owner.addr.toString(), isAsa: true, bidAsset: bidAssetId })
      await algorand.send.assetOptOut({ sender: a.addr, signer: a.signer, assetId: bidAssetId, creator: deployer.addr, ensureZeroBalance: false })
      await timeWarp.timeWarp(3_700n)

      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      await draw(auction)
      expect(await findWinner(auction)).toBe(a.addr.toString())

      const rewardsAddress = getApplicationAddress(akitaUniverse.rewards.appId)
      const rewardsHolding = async () => {
        const info = await algorand.account.getInformation(rewardsAddress)
        return info.assets?.find((holding) => holding.assetId === bidAssetId)?.amount ?? 0n
      }
      const rewardsBefore = await rewardsHolding()
      await auction.claimRafflePrize({ sender: deployer.addr, signer: deployer.signer })
      await cleanupAndDelete(auction, owner)

      // A's losing bid (minus its 1% fee) and its raffle prize wait for A as Rewards disbursements
      expect(await rewardsHolding() - rewardsBefore).toBeGreaterThan(990_000n)
    })

    /** opts the account out of the prize asset and closes it, so a payment below 0.1 ALGO can no longer reach it */
    const closeAccount = async (account: TransactionSignerAccount) => {
      await algorand.send.assetOptOut({ sender: account.addr, signer: account.signer, assetId: testAssetId, creator: deployer.addr, ensureZeroBalance: true })
      await algorand.send.payment({
        sender: account.addr, signer: account.signer, receiver: dispenser.addr, amount: algokit.microAlgos(0), closeRemainderTo: dispenser.addr,
      })
      expect(await getAccountBalance(algorand, account.addr.toString())).toBe(0n)
    }

    test('AUD-C6: a bidder who took their bid back and closed their account blocks neither the refunds nor the delete', async () => {
      const owner = await newSeller()
      const [leaver, winner] = [await newBidder(), await newBidder()]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      const auction = await createAuction(owner, { bidFee: 0n })
      await timeWarp.timeWarp(70n)
      await bid(auction, leaver, 1_000_000n)
      await bid(auction, winner, 1_100_000n)

      // The outbid bidder takes the bid back, then closes the account: only its storage deposit is still owed.
      const leaverBefore = await getAccountBalance(algorand, leaver.addr.toString())
      await auction.refundBid({ sender: deployer.addr, signer: deployer.signer, id: 1n })
      expect(await getAccountBalance(algorand, leaver.addr.toString()) - leaverBefore).toBe(1_000_000n)
      await closeAccount(leaver)

      await timeWarp.timeWarp(3_700n)
      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })
      expect((await algorand.asset.getAccountInformation(winner.addr, testAssetId)).balance).toBe(1n)

      const { bids, bidsByAddress } = await auction.mbr()
      expect(bids + bidsByAddress).toBeLessThan(100_000n)
      const winnerBefore = await getAccountBalance(algorand, winner.addr.toString())
      await cleanupAndDelete(auction, owner)

      // The closed account, first in the list, is passed over and the bidder after it gets its deposit back.
      expect(await getAccountBalance(algorand, winner.addr.toString()) - winnerBefore).toBe(bids + bidsByAddress)
      expect(await getAccountBalance(algorand, leaver.addr.toString())).toBe(0n)
      // The deposit that could not be returned leaves with the auction's account and stays in the factory.
      expect(await getAccountBalance(algorand, factoryAddress()) - factoryBefore).toBe(bids + bidsByAddress)
    })

    test('AUD-C6: a single refund to a closed account is not skipped, and the cleanup still passes over it', async () => {
      const owner = await newSeller()
      const [leaver, winner] = [await newBidder(), await newBidder()]
      const factoryBefore = await getAccountBalance(algorand, factoryAddress())

      // Bids small enough that the refund itself is below the minimum balance.
      const auction = await createAuction(owner, { bidFee: 0n, startingBid: 50_000n })
      await timeWarp.timeWarp(70n)
      await bid(auction, leaver, 50_000n)
      await bid(auction, winner, 150_000n)
      await closeAccount(leaver)

      // On its own the refund fails as a whole and the bid stays unrefunded.
      await expect(auction.refundBid({ sender: deployer.addr, signer: deployer.signer, id: 1n }).then(() => 'refunded')).rejects.toThrow()

      await timeWarp.timeWarp(3_700n)
      await auction.claimPrize({ sender: deployer.addr, signer: deployer.signer })

      const { bids, bidsByAddress } = await auction.mbr()
      await cleanupAndDelete(auction, owner)
      expect(await getAccountBalance(algorand, leaver.addr.toString())).toBe(0n)
      expect(await getAccountBalance(algorand, factoryAddress()) - factoryBefore).toBe(50_000n + bids + bidsByAddress)
    })
  })
})
