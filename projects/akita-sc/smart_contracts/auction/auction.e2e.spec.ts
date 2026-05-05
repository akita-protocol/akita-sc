import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account'
import { beforeAll, describe, expect, test } from 'vitest'
import { AuctionSDK } from 'akita-sdk/auction'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { getAccountBalance } from '../../tests/utils/balance'
import { TimeWarp } from '../../tests/utils/time'
import { MockRandomnessBeaconFactory } from '../artifacts/mock-beacon/MockRandomnessBeaconClient'

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
  const status = await algorand.client.algod.status()
  const block = await algorand.client.algod.block(status.lastRound)
  return BigInt(block.block.header.timestamp)
}

// Shared handles populated in the top-level beforeAll. Every describe block that
// needs per-auction state owns its own beforeAll, so tests inside a describe
// can run in any order without depending on earlier sibling tests.
describe('Auction SDK', () => {
  let deployer: Address & TransactionSignerAccount
  let seller: Address & TransactionSignerAccount
  let bidder1: Address & TransactionSignerAccount
  let bidder2: Address & TransactionSignerAccount
  let akitaUniverse: AkitaUniverse
  let testAssetId: bigint
  let timeWarp: TimeWarp
  let dispenser: algosdk.Address &
    TransactionSignerAccount & {
      account: SigningAccount
    }
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

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

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo())
    await algorand.account.ensureFunded(seller.addr, dispenser, (500).algo())
    await algorand.account.ensureFunded(bidder1.addr, dispenser, (500).algo())
    await algorand.account.ensureFunded(bidder2.addr, dispenser, (500).algo())

    // Deploy mock VRF beacon for raffle testing
    const mockBeaconFactory = algorand.client.getTypedAppFactory(MockRandomnessBeaconFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const { appClient: mockBeacon } = await mockBeaconFactory.send.create.bare()

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
    testAssetId = BigInt(assetCreateTxn.confirmation.assetId!)

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
      dispenser,
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
    let raffleBidders: Address & TransactionSignerAccount[] = []
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
        await algorand.account.ensureFunded(bidder.addr, dispenser, (100).algo())
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
      raffleAssetId = BigInt(assetCreateTxn.confirmation.assetId!)

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

      // Raffle call - sets raffleRound to (current round - 8) and draws winning ticket
      // The mock VRF beacon returns deterministic random data
      await raffleAuction.raffle({
        sender: deployer.addr,
        signer: deployer.signer,
      })

      const state = await raffleAuction.state()
      expect(state.raffleRound).toBeGreaterThan(0n)
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
      expect(attempts).toBeGreaterThanOrEqual(2)
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
})
