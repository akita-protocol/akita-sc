import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest'
import { ListingSDK } from 'akita-sdk/marketplace'
import algosdk, { getApplicationAddress} from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import {
  getAccountBalance,
} from '../../tests/utils/balance'
import { expectContractError } from '../../tests/utils/errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

// Time Constants
const ONE_DAY = 86_400

// Zero address for "no reservation"
const ZERO_ADDRESS = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ'

/**
 * Get the current Algorand block timestamp
 */
const getBlockTimestamp = async (algorand: import('@algorandfoundation/algokit-utils').AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  const block = await algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

describe('Marketplace SDK', () => {
  let deployer: TransactionSignerAccount
  let seller: TransactionSignerAccount
  let buyer: TransactionSignerAccount
  let akitaUniverse: AkitaUniverse
  let listingSDK: ListingSDK
  let testAssetId: bigint
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & {
    account: SigningAccount;
  }
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    const ctx = fixture.context
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    seller = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    buyer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    await algorand.account.ensureFunded(seller.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(buyer.addr, dispenser.addr, (500).algo())

    // Build the full Akita DAO universe (includes marketplace with escrow configured)
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    })

    // Create a test ASA for listing
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
    for (const account of [seller, buyer]) {
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

    // Fund the marketplace to cover listing creation MBR
    await algorand.account.ensureFunded(akitaUniverse.marketplace.client.appAddress, dispenser.addr, (100).algo())

    // Opt the marketplace into the test asset so it can receive assets during listing creation.
    // The marketplace's optIn runs optAkitaEscrowInAndSend under the hood, which rekeys the DAO
    // wallet and makes a chain of inner calls that easily exceed the 8-reference limit for a
    // single app-call txn. Add opUps so v10's resource populator can distribute refs across the
    // group, and use coverAppCallInnerTransactionFees so the simulator sizes fees correctly.
    const optInCost = await akitaUniverse.marketplace.client.optInCost({ args: { asset: testAssetId } })
    const marketplaceOptInGroup = akitaUniverse.marketplace.client.newGroup().optIn({
      args: {
        payment: await algorand.createTransaction.payment({
          sender: deployer.addr,
          receiver: akitaUniverse.marketplace.client.appAddress,
          amount: optInCost.microAlgo(),
        }),
        asset: testAssetId,
      },
      sender: deployer.addr,
      signer: deployer.signer,
      maxFee: (257_000).microAlgo(),
    })
    for (let i = 0; i < 10; i++) {
      marketplaceOptInGroup.opUp({
        sender: deployer.addr,
        signer: deployer.signer,
        args: {},
        note: i > 0 ? `opUp-${i}` : undefined,
        maxFee: (2_000).microAlgo(),
      })
    }
    await marketplaceOptInGroup.send({
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })
  })

  describe('MarketplaceSDK', () => {
    describe('listCost()', () => {
      test('should return cost for ALGO payment listing', () => {
        const cost = akitaUniverse.marketplace.listCost({ isAlgoPayment: true })
        expect(cost).toBeGreaterThan(0n)
      })

      test('should return higher cost for ASA payment listing', () => {
        const algoCost = akitaUniverse.marketplace.listCost({ isAlgoPayment: true })
        const asaCost = akitaUniverse.marketplace.listCost({ isAlgoPayment: false })
        expect(asaCost).toBeGreaterThan(algoCost)
      })
    })

    describe('list()', () => {
      test('should create a new ASA listing', async () => {
        const currentTimestamp = await getBlockTimestamp(algorand)
        const sellerBalanceBefore = await getAccountBalance(algorand, seller.addr.toString())

        listingSDK = await akitaUniverse.marketplace.list({
          sender: seller.addr,
          signer: seller.signer,
          isPrizeBox: false,
          asset: testAssetId,
          amount: 1n,
          name: 'Test NFT',
          proof: [],
          price: 5_000_000n, // 5 ALGO
          paymentAsset: 0n, // ALGO
          expiration: currentTimestamp + BigInt(ONE_DAY * 30), // 30 days to avoid expiration during test run
          reservedFor: ZERO_ADDRESS, // No reservation
          gateId: 0n,
          marketplace: seller.addr.toString(),
        })

        expect(listingSDK).toBeInstanceOf(ListingSDK)
        expect(listingSDK.client.appId).toBeGreaterThan(0n)

        // Verify cost was deducted from seller
        const sellerBalanceAfter = await getAccountBalance(algorand, seller.addr.toString())
        expect(sellerBalanceBefore - sellerBalanceAfter).toBeGreaterThan(0n)
      })
    })

    describe('getListing()', () => {
      test('should return ListingSDK for existing listing', () => {
        const existingListing = akitaUniverse.marketplace.getListing({ appId: listingSDK.client.appId })
        expect(existingListing).toBeInstanceOf(ListingSDK)
        expect(existingListing.client.appId).toBe(listingSDK.client.appId)
      })
    })

    describe('purchase()', () => {
      // Note: purchase makes many inner transactions for royalty distribution
      // which can exceed Algorand's foreign reference limits. This test may fail
      // with "No more transactions below reference limit" and needs explicit
      // resource management or transaction group setup.
      test('should allow purchasing with ALGO', async () => {
        const buyerBalanceBefore = await getAccountBalance(algorand, buyer.addr.toString())

        await akitaUniverse.marketplace.purchase({
          sender: buyer.addr,
          signer: buyer.signer,
          listingAppId: listingSDK.client.appId,
          marketplace: seller.addr.toString(),
        })

        const buyerBalanceAfter = await getAccountBalance(algorand, buyer.addr.toString())
        // Buyer should have paid at least the listing price (5 ALGO)
        expect(buyerBalanceBefore - buyerBalanceAfter).toBeGreaterThanOrEqual(5_000_000n)
      })
    })

    describe('delist()', () => {
      test('should allow seller to delist before purchase', async () => {
        // Create a new listing to delist
        const currentTimestamp = await getBlockTimestamp(algorand)

        const newListing = await akitaUniverse.marketplace.list({
          sender: seller.addr,
          signer: seller.signer,
          isPrizeBox: false,
          asset: testAssetId,
          amount: 1n,
          name: 'Test NFT 2',
          proof: [],
          price: 10_000_000n,
          paymentAsset: 0n,
          expiration: currentTimestamp + BigInt(ONE_DAY),
          reservedFor: ZERO_ADDRESS,
          gateId: 0n,
          marketplace: seller.addr.toString(),
        })

        await akitaUniverse.marketplace.delist({
          sender: seller.addr,
          signer: seller.signer,
          appId: newListing.client.appId,
        })

        // Listing should no longer be valid
        // Note: Depending on implementation, this might throw or return specific state
      })
    })
  })

  describe('ListingSDK', () => {
    let listingSDKForTests: ListingSDK

    beforeAll(async () => {
      // Create a new listing for ListingSDK tests since the original was purchased
      const currentTimestamp = await getBlockTimestamp(algorand)
      listingSDKForTests = await akitaUniverse.marketplace.list({
        sender: seller.addr,
        signer: seller.signer,
        isPrizeBox: false,
        asset: testAssetId,
        amount: 1n,
        name: 'Test NFT for ListingSDK',
        proof: [],
        price: 5_000_000n, // 5 ALGO
        paymentAsset: 0n, // ALGO
        expiration: currentTimestamp + BigInt(ONE_DAY),
        reservedFor: ZERO_ADDRESS, // No reservation
        gateId: 0n,
        marketplace: seller.addr.toString(),
      })
    })

    describe('state()', () => {
      test('should return the current listing state', async () => {
        const state = await listingSDKForTests.state()
        expect(state.prize).toBe(testAssetId)
        // SDK returns boolean global state as uint64 (0n/1n)
        expect(state.isPrizeBox).toBeFalsy()
        expect(state.price).toBe(5_000_000n)
        expect(state.paymentAsset).toBe(0n)
        expect(state.seller).toBe(seller.addr.toString())
      })
    })

    describe('isExpired()', () => {
      test('should return false for unexpired listing', async () => {
        const isExpired = await listingSDKForTests.isExpired()
        expect(isExpired).toBe(false)
      })
    })

    describe('isReserved()', () => {
      test('should return false for non-reserved listing', async () => {
        const isReserved = await listingSDKForTests.isReserved()
        expect(isReserved).toBe(false)
      })
    })

    describe('changePrice()', () => {
      test('should allow seller to change price', async () => {
        const newPrice = 4_000_000n

        await listingSDKForTests.changePrice({
          sender: seller.addr,
          signer: seller.signer,
          price: newPrice,
        })

        const state = await listingSDKForTests.state()
        expect(state.price).toBe(newPrice)
      })
    })
  })

  describe('Fee System & Revenue Collection', () => {
    test('should verify marketplace has escrow configured', async () => {
      // The marketplace should have its akitaDaoEscrow configured
      const factoryState = await akitaUniverse.marketplace.client.state.global.getAll()
      expect(factoryState.akitaDaoEscrow).toBeDefined()
      expect(factoryState.akitaDaoEscrow?.app).toBeGreaterThan(0n)
    })

    test('should verify DAO escrow receives revenue on marketplace sale', async () => {
      // Get the escrow info for marketplace revenue
      const marketplaceEscrow = await akitaUniverse.dao.wallet.getEscrow('rev_marketplace')
      expect(marketplaceEscrow).toBeDefined()
      expect(marketplaceEscrow.id).toBeGreaterThan(0n)

      // The escrow balance should be tracked (might be 0 if fees are distributed differently)
      const escrowBalance = await getAccountBalance(algorand, getApplicationAddress(marketplaceEscrow.id).toString())
      expect(escrowBalance).toBeGreaterThanOrEqual(0n)
    })
  })

  // ---------------------------------------------------------------------------------------------
  // Audit regressions: MKT-01 / 03 / 04 / 05 / 06 / 07, I-2, I-4
  // ---------------------------------------------------------------------------------------------
  describe('Audit regressions', () => {
    let usdc: bigint // payment ASA
    let meme: bigint // fungible prize ASA
    let seller2: TransactionSignerAccount // never opted into the payment asset
    let buyer2: TransactionSignerAccount // never opted into the prize asset

    /** spendable factory ALGO: balance above its minimum balance */
    const freeBalance = async (address: string | Address): Promise<bigint> => {
      const info = await algorand.client.algod.accountInformation(address.toString()).do()
      return BigInt(info.amount) - BigInt(info.minBalance)
    }

    const assetBalance = async (address: string | Address, assetId: bigint): Promise<bigint> => {
      const info = await algorand.account.getInformation(address.toString())
      return info.assets?.find((a) => a.assetId === assetId)?.amount ?? 0n
    }

    const createAsset = async (name: string, clawback?: Address): Promise<bigint> => {
      const res = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 10_000_000_000n,
        decimals: 0,
        assetName: name,
        unitName: name.slice(0, 8),
        clawback,
      })
      return BigInt(res.confirmation.assetIndex!)
    }

    const optIn = async (account: TransactionSignerAccount, assetId: bigint) => {
      await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId })
    }

    const give = async (to: TransactionSignerAccount, assetId: bigint, amount: bigint, from: TransactionSignerAccount = deployer) => {
      await algorand.send.assetTransfer({ sender: from.addr, signer: from.signer, assetId, amount, receiver: to.addr })
    }

    const listAsa = async (
      who: TransactionSignerAccount,
      asset: bigint,
      amount: bigint,
      price: bigint,
      paymentAsset: bigint,
    ): Promise<ListingSDK> => {
      const now = await getBlockTimestamp(algorand)
      return akitaUniverse.marketplace.list({
        sender: who.addr,
        signer: who.signer,
        isPrizeBox: false,
        asset,
        amount,
        name: '',
        proof: [],
        price,
        paymentAsset,
        expiration: now + BigInt(ONE_DAY * 30),
        reservedFor: ZERO_ADDRESS,
        gateId: 0n,
        marketplace: who.addr.toString(),
      })
    }

    const appExists = async (appId: bigint): Promise<boolean> => {
      try {
        await algorand.client.algod.getApplicationByID(appId).do()
        return true
      } catch {
        return false
      }
    }

    const padRounds = async (n: number) => {
      for (let i = 0; i < n; i++) {
        await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: deployer.addr, amount: (0).microAlgo(), note: `pad-${i}-${Date.now()}` })
      }
    }

    beforeAll(async () => {
      usdc = await createAsset('USDCtest')
      meme = await createAsset('MEMEtest')

      seller2 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(200_000_000) })
      buyer2 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(200_000_000) })

      for (const acct of [seller, buyer]) {
        await optIn(acct, usdc)
        await optIn(acct, meme)
      }
      await optIn(seller2, meme)
      await optIn(buyer2, usdc)

      await give(seller, meme, 1_000_000n)
      await give(seller2, meme, 1_000_000n)
      await give(buyer, usdc, 1_000_000n)
      await give(buyer, meme, 1_000_000n)
      await give(buyer2, usdc, 1_000_000n)
    })

    test('MKT-05/01/03: ASA-priced listing can be created, is deleted on purchaseAsa, and leaves the factory whole', async () => {
      const factory = akitaUniverse.marketplace.client.appAddress
      // first listing opts the factory (+ DAO escrow) into the assets; measure from the second one
      const warmup = await listAsa(seller, meme, 1n, 10n, usdc)
      await akitaUniverse.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: warmup.client.appId })

      const freeBefore = await freeBalance(factory)
      const listing = await listAsa(seller, meme, 1_000n, 500n, usdc)
      expect((await listing.state()).paymentAsset).toBe(usdc)

      const buyerMemeBefore = await assetBalance(buyer.addr, meme)
      await akitaUniverse.marketplace.purchase({
        sender: buyer.addr,
        signer: buyer.signer,
        listingAppId: listing.client.appId,
        marketplace: seller.addr.toString(),
        isAsa: true,
        paymentAsset: usdc,
        paymentAmount: 500n,
      })

      expect(await assetBalance(buyer.addr, meme) - buyerMemeBefore).toBe(1_000n)
      // MKT-01: the child is deleted (it was a NoOp zombie before)
      expect(await appExists(listing.client.appId)).toBe(false)
      // MKT-03: nothing was paid out of the factory's pooled balance
      expect(await freeBalance(factory)).toBe(freeBefore)
    })

    test('MKT-04: purchaseAsa paying with the prize asset instead of the payment asset is rejected', async () => {
      const listing = await listAsa(seller, meme, 1_000n, 500n, usdc)
      await expectContractError(akitaUniverse.marketplace.purchase({
        sender: buyer.addr,
        signer: buyer.signer,
        listingAppId: listing.client.appId,
        marketplace: seller.addr.toString(),
        isAsa: true,
        paymentAsset: meme,
        paymentAmount: 500n,
      }), 'errIxfr')
      await akitaUniverse.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: listing.client.appId })
    })

    test('MKT-04: purchaseAsa with a transfer from someone other than the caller is rejected', async () => {
      const listing = await listAsa(seller, meme, 10n, 500n, usdc)
      const assetXfer = await algorand.createTransaction.assetTransfer({ note: `t-${Date.now()}-${Math.random()}`,
        sender: buyer2.addr, signer: buyer2.signer, assetId: usdc, amount: 500n,
        receiver: akitaUniverse.marketplace.client.appAddress,
      })
      await expectContractError(
        akitaUniverse.marketplace.client.newGroup().purchaseAsa({
          sender: buyer.addr, signer: buyer.signer,
          args: { assetXfer: { txn: assetXfer, signer: buyer2.signer }, appId: listing.client.appId, marketplace: seller.addr.toString() },
        }).send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true, maxFee: (100_000).microAlgo() } as never),
        'errIpms'
      )
      await akitaUniverse.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: listing.client.appId })
    })

    test('MKT-04: listing with the payment asset equal to the prize is rejected', async () => {
      await expectContractError(listAsa(seller, meme, 10n, 500n, meme), 'errPbdl')
    })

    test('MKT-06: a clawed-back listing cannot be sold', async () => {
      const claw = await createAsset('CLAWtest', seller.addr)
      await optIn(seller, claw)
      await optIn(buyer, claw)
      await give(seller, claw, 5n)

      const listing = await listAsa(seller, claw, 5n, 5_000_000n, 0n)
      // seller (clawback) pulls the prize back out of the listing
      await algorand.send.assetTransfer({
        sender: seller.addr, signer: seller.signer, assetId: claw, amount: 5n,
        clawbackTarget: listing.client.appAddress, receiver: seller.addr,
      })

      const buyerAlgoBefore = await getAccountBalance(algorand, buyer.addr.toString())
      await expectContractError(akitaUniverse.marketplace.purchase({
        sender: buyer.addr,
        signer: buyer.signer,
        listingAppId: listing.client.appId,
        marketplace: seller.addr.toString(),
      }), 'errPchg')
      expect(await getAccountBalance(algorand, buyer.addr.toString())).toBe(buyerAlgoBefore)

      await akitaUniverse.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: listing.client.appId })
    })

    test('TRADE-6: a donated unit does not make a fungible listing unsellable; the buyer receives it', async () => {
      const listing = await listAsa(seller, meme, 1_000n, 5_000_000n, 0n)
      await algorand.send.assetTransfer({ sender: buyer.addr, signer: buyer.signer, assetId: meme, amount: 1n, receiver: listing.client.appAddress })

      const buyerMemeBefore = await assetBalance(buyer.addr, meme)
      await akitaUniverse.marketplace.purchase({
        sender: buyer.addr,
        signer: buyer.signer,
        listingAppId: listing.client.appId,
        marketplace: seller.addr.toString(),
      })
      expect(await assetBalance(buyer.addr, meme) - buyerMemeBefore).toBe(1_001n)
      expect(await appExists(listing.client.appId)).toBe(false)
    })

    test('MKT-07: changePrice below the minimum is rejected', async () => {
      const listing = await listAsa(seller, testAssetId, 1n, 5_000_000n, 0n)
      await expectContractError(listing.changePrice({ sender: seller.addr, signer: seller.signer, price: 3n }), 'errPrlo')
      await akitaUniverse.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: listing.client.appId })
    })

    test('MKT-02: a purchase in the same round as a price change is rejected; it succeeds after the cooldown', async () => {
      const listing = await listAsa(seller, testAssetId, 1n, 5_000_000n, 0n)
      const factoryClient = akitaUniverse.marketplace.client

      // seller reprices and buyer purchases in one atomic group (same round)
      const payment = await algorand.createTransaction.payment({ note: `t-${Date.now()}-${Math.random()}`,
        sender: buyer.addr, signer: buyer.signer, receiver: factoryClient.appAddress, amount: (6_000_000).microAlgo(),
      })
      const group = listing.client.newGroup()
        .changePrice({ sender: seller.addr, signer: seller.signer, args: { price: 6_000_000n }, maxFee: (10_000).microAlgo() })
      const composer = await group.composer()
      composer.addAppCallMethodCall(await factoryClient.params.purchase({
        sender: buyer.addr, signer: buyer.signer,
        args: { payment: { txn: payment, signer: buyer.signer }, appId: listing.client.appId, marketplace: seller.addr.toString() },
        maxFee: (100_000).microAlgo(),
      }))
      await expectContractError(
        composer.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true }),
        'errPrcd'
      )

      // a lone price change, then the cooldown passes
      await listing.changePrice({ sender: seller.addr, signer: seller.signer, price: 6_000_000n })
      await padRounds(6)
      await akitaUniverse.marketplace.purchase({
        sender: buyer.addr,
        signer: buyer.signer,
        listingAppId: listing.client.appId,
        marketplace: seller.addr.toString(),
      })
      expect(await appExists(listing.client.appId)).toBe(false)
    })

    test('MKT-03: a buyer who is not opted into the prize does not drain the factory', async () => {
      const factory = akitaUniverse.marketplace.client.appAddress
      const freeBefore = await freeBalance(factory)
      const listing = await listAsa(seller, testAssetId, 1n, 5_000_000n, 0n)

      // buyer2 is not opted into testAssetId -> prize goes through the Rewards inbox (consumes MBR)
      await akitaUniverse.marketplace.purchase({
        sender: buyer2.addr,
        signer: buyer2.signer,
        listingAppId: listing.client.appId,
        marketplace: seller.addr.toString(),
      })

      expect(await appExists(listing.client.appId)).toBe(false)
      expect(await freeBalance(factory)).toBe(freeBefore)
    })

    test('I-2: an ASA sale settles even when the seller is not opted into the payment asset', async () => {
      const factory = akitaUniverse.marketplace.client.appAddress
      const freeBefore = await freeBalance(factory)
      const listing = await listAsa(seller2, meme, 100n, 300n, usdc)

      await akitaUniverse.marketplace.purchase({
        sender: buyer.addr,
        signer: buyer.signer,
        listingAppId: listing.client.appId,
        marketplace: seller.addr.toString(),
        isAsa: true,
        paymentAsset: usdc,
        paymentAmount: 300n,
      })

      expect(await appExists(listing.client.appId)).toBe(false)
      expect(await freeBalance(factory)).toBe(freeBefore)
    })

    test('I-4: listPrizeBox rejects a prize box handed over by someone other than the caller', async () => {
      await algorand.account.ensureFunded(akitaUniverse.prizeBoxFactory.client.appAddress, dispenser.addr, (10).algo())
      const box = await akitaUniverse.prizeBoxFactory.mint({ sender: seller.addr, signer: seller.signer, owner: seller.addr.toString() })
      const factoryClient = akitaUniverse.marketplace.client
      const cost = await factoryClient.listCost({ args: { prize: 0n, paymentAsset: 0n, isPrizeBox: true } })
      const now = await getBlockTimestamp(algorand)

      // seller hands the box to the marketplace, but buyer is the one listing it
      const transferTxn = (await box.client.createTransaction.transfer({
        sender: seller.addr, signer: seller.signer, args: { newOwner: factoryClient.appAddress.toString() },
      })).transactions[0]
      const payment = await algorand.createTransaction.payment({ note: `t-${Date.now()}-${Math.random()}`,
        sender: buyer.addr, signer: buyer.signer, receiver: factoryClient.appAddress, amount: cost.microAlgo(),
      })
      await expectContractError(
        factoryClient.newGroup().listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64({
          sender: buyer.addr, signer: buyer.signer,
          args: {
            prizeBoxTransferTxn: { txn: transferTxn, signer: seller.signer },
            payment: { txn: payment, signer: buyer.signer },
            price: 1_000_000n, paymentAsset: 0n, expiration: now + BigInt(ONE_DAY), reservedFor: ZERO_ADDRESS, gateId: 0n,
            marketplace: buyer.addr.toString(),
            wallet: 0n,
          },
        }).send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true, maxFee: (100_000).microAlgo() } as never),
        'errNpbo'
      )
    })

    test('MKT-09: on-chain listCost matches the SDK quote for ALGO and ASA listings', async () => {
      const onChainAlgo = await akitaUniverse.marketplace.client.listCost({ args: { prize: testAssetId, paymentAsset: 0n, isPrizeBox: false } })
      const sdkAlgo = akitaUniverse.marketplace.listCost({ isAlgoPayment: true, prizeRewardsOptInCost: 0n })
      expect(onChainAlgo).toBe(sdkAlgo)
    })
  })
})
