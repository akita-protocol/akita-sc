import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest'
import { EscrowFactorySDK, EscrowSDK } from 'akita-sdk/escrow'
import algosdk from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import {
  getAccountBalance
} from '../../tests/utils/balance'
import { expectContractError } from '../../tests/utils/errors'
import { MockEscrowOwnerFactory } from '../artifacts/mocks/escrow-owner/MockEscrowOwnerClient'
import { errInvalidPaymentAmount } from '../utils/errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

describe('Escrow SDK', () => {
  let deployer: TransactionSignerAccount
  let user1: TransactionSignerAccount
  let user2: TransactionSignerAccount
  let akitaUniverse: AkitaUniverse
  let escrowFactorySDK: EscrowFactorySDK
  let escrowSDK: EscrowSDK
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
    user1 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    user2 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    await algorand.account.ensureFunded(user1.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(user2.addr, dispenser.addr, (500).algo())

    // Build the full Akita DAO universe (includes escrow factory)
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    })

    // Create EscrowFactorySDK from the deployed escrow factory
    escrowFactorySDK = new EscrowFactorySDK({
      algorand,
      factoryParams: {
        appId: akitaUniverse.escrowFactory.appId,
        defaultSender: user1.addr,
        defaultSigner: user1.signer,
      }
    })
  })

  describe('EscrowFactorySDK', () => {
    describe('cost()', () => {
      test('should return the cost to create a new escrow', async () => {
        const cost = await escrowFactorySDK.cost()
        expect(cost).toBeGreaterThan(0n)
      })
    })

    describe('registerCost()', () => {
      test('should return the cost to register an escrow', async () => {
        const cost = await escrowFactorySDK.registerCost()
        expect(cost).toBeGreaterThan(0n)
      })
    })

    describe('new()', () => {
      test('should create a new escrow and return EscrowSDK', async () => {
        const balanceBefore = await getAccountBalance(algorand, user1.addr.toString())
        const cost = await escrowFactorySDK.cost()

        escrowSDK = await escrowFactorySDK.new({
          sender: user1.addr,
          signer: user1.signer,
        })

        expect(escrowSDK).toBeInstanceOf(EscrowSDK)
        expect(escrowSDK.client.appId).toBeGreaterThan(0n)

        // Verify cost was deducted
        const balanceAfter = await getAccountBalance(algorand, user1.addr.toString())
        expect(balanceBefore - balanceAfter).toBeGreaterThanOrEqual(cost)
      })
    })

    describe('get()', () => {
      test('should return EscrowSDK for existing escrow', () => {
        const existingEscrow = escrowFactorySDK.get({ appId: escrowSDK.client.appId })
        expect(existingEscrow).toBeInstanceOf(EscrowSDK)
        expect(existingEscrow.client.appId).toBe(escrowSDK.client.appId)
      })
    })

    describe('exists()', () => {
      test('should return false for non-existent address', async () => {
        const exists = await escrowFactorySDK.exists({ address: user2.addr.toString() })
        expect(exists).toBe(false)
      })
    })

    describe('register()', () => {
      test('should register the wallet itself', async () => {
        // register() requires being called from another application contract
        // (Global.callerApplicationId !== 0). The wallet has a register() method
        // that handles the app-to-app call to the escrow factory.
        // Using escrow: '' registers the wallet itself (app: 0)
        // Note: Wallets auto-register on creation, so we verify the registration exists
        const walletAddress = akitaUniverse.dao.wallet.client.appAddress.toString()

        // Verify the wallet is registered (wallets auto-register on creation via wallet.register)
        const exists = await escrowFactorySDK.exists({
          address: walletAddress
        })
        expect(exists).toBe(true)

        // Verify that calling register again throws an "already registered" error
        await expect(
          akitaUniverse.dao.wallet.register({
            sender: deployer.addr,
            signer: deployer.signer,
            escrow: '', // Empty string means register the wallet itself
          })
        ).rejects.toThrow()
      })
    })

    describe('getCreator()', () => {
      test('should return creator bytes for registered wallet', async () => {
        // getCreator() returns creator bytes for registered wallets/escrows
        // The wallet is already registered (wallets auto-register on creation)
        const walletAddress = akitaUniverse.dao.wallet.client.appAddress.toString()

        // Verify the wallet is registered
        const exists = await escrowFactorySDK.exists({
          address: walletAddress
        })
        expect(exists).toBe(true)

        // getCreator should return the creator bytes for the registered wallet
        const creator = await escrowFactorySDK.getCreator({
          address: walletAddress
        })
        expect(creator).toBeInstanceOf(Uint8Array)
        expect(creator.length).toBeGreaterThan(0)
      })
    })

    describe('getList()', () => {
      test('should return creator bytes for multiple addresses', async () => {
        const creators = await escrowFactorySDK.getList({
          addresses: [escrowSDK.client.appAddress.toString()]
        })
        expect(creators).toBeInstanceOf(Array)
        expect(creators.length).toBe(1)
      })
    })
  })

  describe('EscrowSDK', () => {
    describe('getCreator()', () => {
      test('should return the escrow creator address', async () => {
        const creator = await escrowSDK.getCreator()
        // The creator should be the factory
        expect(creator).toBeTruthy()
      })
    })
  })

  describe('ACC-07 escrow deletion refund and funding binding', () => {
    test('deleting an escrow refunds its closed balance plus released MBR; the factory nets zero', async () => {
      const ownerFactory = algorand.client.getTypedAppFactory(MockEscrowOwnerFactory, {
        defaultSender: user1.addr,
        defaultSigner: user1.signer,
      })
      const { appClient: owner } = await ownerFactory.send.create.bare()
      await owner.appClient.fundAppAccount({ amount: algokit.microAlgos(3_000_000) })

      const factoryApp = akitaUniverse.escrowFactory
      const factoryBefore = await getAccountBalance(algorand, factoryApp.appAddress.toString())
      const cost = await factoryApp.cost()
      const registerCost = await factoryApp.registerCost()

      const escrowId = (await owner.send.newEscrow({
        args: { factory: factoryApp.appId, cost },
        extraFee: algokit.microAlgos(10_000),
      })).return!
      await owner.send.registerEscrow({
        args: { factory: factoryApp.appId, escrow: escrowId, mbr: registerCost },
        extraFee: algokit.microAlgos(2_000),
      })

      const escrowAddress = algosdk.getApplicationAddress(escrowId).toString()
      await algorand.send.payment({ sender: user1.addr, signer: user1.signer, receiver: escrowAddress, amount: algokit.microAlgos(1_000_000) })
      const escrowBalance = await getAccountBalance(algorand, escrowAddress)

      const refund = (await owner.send.deleteEscrow({
        args: { factory: factoryApp.appId, escrow: escrowId },
        extraFee: algokit.microAlgos(6_000),
      })).return!

      // released app MBR (pages + 1 global bytes key) + registry box MBR + everything the escrow held
      expect(refund).toBe(cost - 100_000n + registerCost + escrowBalance)
      // previously the escrow's base balance and any leftovers stayed in the factory
      expect(await getAccountBalance(algorand, factoryApp.appAddress.toString())).toBe(factoryBefore)
    })

    test('anyone can fund the creation of an escrow for the caller', async () => {
      const factoryApp = akitaUniverse.escrowFactory
      const cost = await factoryApp.cost()
      const payment = await algorand.createTransaction.payment({
        sender: user2.addr,
        receiver: factoryApp.appAddress,
        amount: algokit.microAlgos(cost),
      })
      const sponsorBefore = await getAccountBalance(algorand, user2.addr.toString())
      const created = await factoryApp.send.new({
        sender: user1.addr,
        signer: user1.signer,
        args: { payment: { txn: payment, signer: user2.signer } },
        extraFee: algokit.microAlgos(4_000),
      })
      expect(created.return!).toBeGreaterThan(0n)
      // the sponsor paid the funding and its own network fee
      expect(sponsorBefore - (await getAccountBalance(algorand, user2.addr.toString()))).toBe(cost + 1_000n)

      // the funding still has to be exact
      const short = await algorand.createTransaction.payment({
        sender: user2.addr,
        receiver: factoryApp.appAddress,
        amount: algokit.microAlgos(cost - 1n),
      })
      await expectContractError(
        factoryApp.send.new({ sender: user1.addr, signer: user1.signer, args: { payment: { txn: short, signer: user2.signer } }, extraFee: algokit.microAlgos(4_000) }),
        errInvalidPaymentAmount,
      )
    })
  })
})
