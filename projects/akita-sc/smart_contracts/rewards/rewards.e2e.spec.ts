import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { RewardsSDK, UserAllocation } from 'akita-sdk/rewards'
import algosdk from 'algosdk'
import { TimeWarp } from '../../tests/utils/time'
import { RewardsFactory } from '../artifacts/rewards/RewardsClient'
import {
  errAllocationAlreadyExists,
  errAllocationDoesNotExist,
  errDisbursementAlreadyFinal,
  errDisbursementDoesNotExist,
  errDisbursementLocked,
  errDisbursementNotExpired,
  errDisbursementsCannotBeEmpty,
  errInvalidDisbursementUnlockTime,
  errInvalidMbrAmount,
  errYouAreNotTheCreator,
  errDisbursementNotFinal,
  errDisbursementNotEmpty,
  errInvalidGroupIndex,
  errDisbursementNotSweepable,
  errReclaimTargetNotOptedIn,
} from './errors'
import { errInvalidPaymentAmount, errPayerOnly } from '../utils/errors'

/** what an account pays, and later gets back, for being remembered as the payer of someone else's record */
const PAYER_RECORD_MBR = 28_500n

algokit.Config.configure({
  debug: true,
  populateAppCallResources: true,
})

describe('Rewards SDK Tests', () => {
  const fixture = algorandFixture()

  let deployer: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount
  let sdk: RewardsSDK
  let timeWarp: TimeWarp
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  // Helper to get current timestamp
  const getCurrentTimestamp = async (): Promise<bigint> => {
    const status = await algorand.client.algod.status().do()
    const block = await algorand.client.algod.block(status.lastRound).do()
    return BigInt(block.block.header.timestamp)
  }

  const getMbrCredits = async (id: bigint) => {
    const disbursement = await sdk.getDisbursement({ id })
    // credits held by allocation boxes: one UserAllocationMBR per open allocation
    const { userAllocations } = await sdk.mbr({ title: '', note: '' })
    return {
      available: BigInt((disbursement as any).mbrCredits ?? 0n),
      used: disbursement.allocations * userAllocations,
    }
  }

  const allocationMbrCredits = async (allocationCount: number): Promise<bigint> => {
    const mbrData = await sdk.mbr({ title: '', note: '' })
    return mbrData.userAllocations * BigInt(allocationCount)
  }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.algorand
    const { testAccount } = fixture.context
    deployer = testAccount

    timeWarp = new TimeWarp(algorand)

    // Create the rewards contract
    const factory = algorand.client.getTypedAppFactory(RewardsFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })

    const results = await factory.send.create.create({
      args: { version: '1.0.0', akitaDao: 0n },
    })

    // Initialize the SDK
    sdk = new RewardsSDK({
      factoryParams: {
        appId: results.appClient.appId,
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      },
      algorand,
    })

    // Fund the contract
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: sdk.client.appAddress,
      amount: algokit.microAlgo(500_000_000n),
    })

    console.log('Rewards App ID:', sdk.appId)
    console.log('Rewards Address:', sdk.client.appAddress.toString())
  })

  beforeEach(async () => {
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (100).algos())
  })

  afterEach(async () => {
    if (timeWarp) {
      await timeWarp.resetTimeWarp()
    }
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK READ METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Read Methods', () => {
    test('getState returns correct global state', async () => {
      const state = await sdk.getState()

      expect(state.version).toBe('1.0.0')
      expect(state.disbursementId).toBeDefined()
      expect(typeof state.disbursementId).toBe('bigint')
    })

    test('mbr returns correct MBR data', async () => {
      const mbrData = await sdk.mbr({ title: 'Test Title', note: 'Test Note' })

      expect(mbrData.disbursements).toBeDefined()
      expect(mbrData.userAllocations).toBeDefined()
      expect(mbrData.disbursements).toBeGreaterThan(0n)
      expect(mbrData.userAllocations).toBeGreaterThan(0n)
    })

    test('mbr increases with longer strings', async () => {
      const shortMbr = await sdk.mbr({ title: 'A', note: 'B' })
      const longMbr = await sdk.mbr({
        title: 'This is a much longer title',
        note: 'This is a much longer note for testing',
      })

      expect(longMbr.disbursements).toBeGreaterThan(shortMbr.disbursements)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK DISBURSEMENT CREATION
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Disbursement Creation', () => {
    test('createDisbursement creates successfully', async () => {
      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'SDK Test Disbursement',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Created via SDK',
      })

      expect(disbursementId).toBeDefined()
      expect(typeof disbursementId).toBe('bigint')
    })

    test('getDisbursement retrieves created disbursement', async () => {
      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Retrievable Disbursement',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'For retrieval test',
      })

      const disbursement = await sdk.getDisbursement({ id: disbursementId })

      expect(disbursement.title).toBe('Retrievable Disbursement')
      expect(disbursement.note).toBe('For retrieval test')
      expect(disbursement.finalized).toBe(false)
      expect(disbursement.amount).toBe(0n)
    })

    test('getDisbursements returns all disbursements', async () => {
      const disbursements = await sdk.getDisbursements()

      expect(disbursements).toBeInstanceOf(Map)
      expect(disbursements.size).toBeGreaterThan(0)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK DISBURSEMENT EDITING
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Disbursement Editing', () => {
    test('editDisbursement updates successfully', async () => {
      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Editable via SDK',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Original note',
      })

      await sdk.editDisbursement({
        id: disbursementId,
        title: 'Updated via SDK',
        timeToUnlock: currentTimestamp + 120n,
        expiration: currentTimestamp + 172800n,
        note: 'Updated note',
      })

      const updated = await sdk.getDisbursement({ id: disbursementId })
      expect(updated.title).toBe('Updated via SDK')
      expect(updated.note).toBe('Updated note')
    })

    test('editDisbursement fails for non-existent id', async () => {
      const currentTimestamp = await getCurrentTimestamp()

      await expect(
        sdk.editDisbursement({
          id: 999999n,
          title: 'Will Fail',
          timeToUnlock: currentTimestamp + 60n,
          expiration: currentTimestamp + 86400n,
          note: 'Should not work',
        })
      ).rejects.toThrow(errDisbursementDoesNotExist)
    })

    test('editDisbursement fails for non-creator', async () => {
      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Only Creator Can Edit',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Test note',
      })

      const otherAccount = await fixture.context.generateAccount({
        initialFunds: (10).algos(),
      })

      await expect(
        sdk.editDisbursement({
          sender: otherAccount.addr,
          signer: otherAccount.signer,
          id: disbursementId,
          title: 'Malicious Edit',
          timeToUnlock: currentTimestamp + 60n,
          expiration: currentTimestamp + 86400n,
          note: 'Should fail',
        })
      ).rejects.toThrow(errYouAreNotTheCreator)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK ALGO ALLOCATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK ALGO Allocations', () => {
    test('createUserAllocations creates ALGO allocations', async () => {
      const user1 = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const user2 = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'ALGO Allocation Test',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'For allocation test',
        mbrCredits: await allocationMbrCredits(2),
      })

      const allocations: UserAllocation[] = [
        { address: user1.addr.toString(), amount: 1_000_000n },
        { address: user2.addr.toString(), amount: 2_000_000n },
      ]

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations,
      })

      // Verify allocations were created
      const user1Allocation = await sdk.getUserAllocation({
        address: user1.addr.toString(),
        disbursementId,
        asset: 0n,
      })
      expect(user1Allocation).toBe(1_000_000n)

      const user2Allocation = await sdk.getUserAllocation({
        address: user2.addr.toString(),
        disbursementId,
        asset: 0n,
      })
      expect(user2Allocation).toBe(2_000_000n)
    })

    test('hasAllocation returns correct boolean', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const otherUser = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Has Allocation Test',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Test note',
        mbrCredits: await allocationMbrCredits(1),
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      const hasAlloc = await sdk.hasAllocation({
        address: user.addr.toString(),
        disbursementId,
        asset: 0n,
      })
      expect(hasAlloc).toBe(true)

      const noAlloc = await sdk.hasAllocation({
        address: otherUser.addr.toString(),
        disbursementId,
        asset: 0n,
      })
      expect(noAlloc).toBe(false)
    })

    // ST-2 (2026-10 audit): a repeated address now tops up its allocation instead of failing,
    // so pool rounds with multi-asset entrants or repeat shuffle winners still settle.
    test('createUserAllocations tops up a duplicate allocation', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Duplicate Prevention',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Test note',
        mbrCredits: await allocationMbrCredits(1),
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [{ address: user.addr.toString(), amount: 500_000n }],
      })

      expect(await sdk.getUserAllocation({
        address: user.addr.toString(),
        disbursementId,
        asset: 0n,
      })).toBe(1_500_000n)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK MBR CREDITS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK MBR Credits', () => {
    test('createDisbursement overpayment allocates withdrawable MBR credits', async () => {
      const currentTimestamp = await getCurrentTimestamp()
      const initialCredits = 75_000n
      const withdrawal = 25_000n

      const disbursementId = await sdk.createDisbursement({
        title: 'Credit Overpayment',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Overpay into credits',
        mbrCredits: initialCredits,
      })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: initialCredits,
        used: 0n,
      })

      await sdk.withdrawMbrCredits({ id: disbursementId, amount: withdrawal })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: initialCredits - withdrawal,
        used: 0n,
      })
    })

    test('fundMbrCredits and withdrawMbrCredits update available credits exactly', async () => {
      const currentTimestamp = await getCurrentTimestamp()
      const disbursementId = await sdk.createDisbursement({
        title: 'Explicit Credit Funding',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Fund and withdraw',
      })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: 0n,
        used: 0n,
      })

      await sdk.fundMbrCredits({ id: disbursementId, amount: 90_000n })
      await sdk.withdrawMbrCredits({ id: disbursementId, amount: 30_000n })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: 60_000n,
        used: 0n,
      })
    })

    test('contract allocation call fails without existing MBR credits', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'No Allocation Credits',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Direct contract call should fail',
      })

      const payment = await algorand.createTransaction.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: sdk.client.appAddress,
        amount: algokit.microAlgo(1_000_000n),
      })

      await expect(
        (sdk.client.send as any).createUserAllocations({
          sender: deployer.addr,
          signer: deployer.signer,
          args: {
            payment,
            id: disbursementId,
            allocations: [[user.addr.toString(), 1_000_000n]],
          },
        })
      ).rejects.toThrow(errInvalidMbrAmount)
    })

    test('createUserAllocations consumes credits and claimRewards releases them', async () => {
      const user1 = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const user2 = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const currentTimestamp = await getCurrentTimestamp()
      const title = 'Claim Credit Release'
      const note = 'Credits released on claim'
      const mbrData = await sdk.mbr({ title, note })
      const allocationMbr = mbrData.userAllocations
      const extraCredits = 10_000n
      const allocatedCredits = allocationMbr * 2n

      const disbursementId = await sdk.createDisbursement({
        title,
        timeToUnlock: 0n,
        expiration: currentTimestamp + 86400n,
        note,
        mbrCredits: allocatedCredits + extraCredits,
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [
          { address: user1.addr.toString(), amount: 1_000_000n },
          { address: user2.addr.toString(), amount: 2_000_000n },
        ],
      })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: extraCredits,
        used: allocatedCredits,
      })

      await sdk.finalizeDisbursement({ id: disbursementId })

      await sdk.claimRewards({
        sender: user1.addr,
        signer: user1.signer,
        rewards: [{ id: disbursementId, asset: 0n }],
      })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: extraCredits + allocationMbr,
        used: allocationMbr,
      })

      await sdk.claimRewards({
        sender: user2.addr,
        signer: user2.signer,
        rewards: [{ id: disbursementId, asset: 0n }],
      })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: extraCredits + allocatedCredits,
        used: 0n,
      })
    })

    test('reclaimRewards releases used MBR credits back to available credits', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const currentTimestamp = await getCurrentTimestamp()
      const title = 'Reclaim Credit Release'
      const note = 'Credits released on reclaim'
      const mbrData = await sdk.mbr({ title, note })
      const allocationMbr = mbrData.userAllocations

      const disbursementId = await sdk.createDisbursement({
        title,
        timeToUnlock: 0n,
        expiration: currentTimestamp + 120n,
        note,
        mbrCredits: allocationMbr,
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })
      await sdk.finalizeDisbursement({ id: disbursementId })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: 0n,
        used: allocationMbr,
      })

      await timeWarp.timeWarp(180n)

      await sdk.reclaimRewards({
        id: disbursementId,
        reclaims: [{ address: user.addr.toString(), asset: 0n }],
      })

      await expect(getMbrCredits(disbursementId)).resolves.toEqual({
        available: allocationMbr,
        used: 0n,
      })
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK FINALIZE DISBURSEMENT
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Finalize Disbursement', () => {
    test('finalizeDisbursement works with allocations', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'To Finalize',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'For finalization',
        mbrCredits: await allocationMbrCredits(1),
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await sdk.finalizeDisbursement({ id: disbursementId })

      const disbursement = await sdk.getDisbursement({ id: disbursementId })
      expect(disbursement.finalized).toBe(true)
    })

    test('finalizeDisbursement fails without allocations', async () => {
      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Empty Disbursement',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'No allocations',
      })

      await expect(sdk.finalizeDisbursement({ id: disbursementId })).rejects.toThrow(
        errDisbursementsCannotBeEmpty
      )
    })

    test('finalizeDisbursement fails twice', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Double Finalize',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'Test note',
        mbrCredits: await allocationMbrCredits(1),
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await sdk.finalizeDisbursement({ id: disbursementId })

      await expect(sdk.finalizeDisbursement({ id: disbursementId })).rejects.toThrow(
        errDisbursementAlreadyFinal
      )
    })

    test('finalizeDisbursement fails with past unlock time', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'Past Unlock',
        timeToUnlock: currentTimestamp - 100n,
        expiration: currentTimestamp + 86400n,
        note: 'Test note',
        mbrCredits: await allocationMbrCredits(1),
      })

      await sdk.createUserAllocations({
        id: disbursementId,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await expect(sdk.finalizeDisbursement({ id: disbursementId })).rejects.toThrow(
        errInvalidDisbursementUnlockTime
      )
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK INSTANT DISBURSEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Instant Disbursements', () => {
    test('createInstantDisbursement creates finalized ALGO disbursement', async () => {
      const user1 = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const user2 = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 86400n,
        allocations: [
          { address: user1.addr.toString(), amount: 1_000_000n },
          { address: user2.addr.toString(), amount: 2_000_000n },
        ],
      })

      expect(disbursementId).toBeDefined()

      const disbursement = await sdk.getDisbursement({ id: disbursementId })
      expect(disbursement.finalized).toBe(true)
      expect(disbursement.amount).toBe(3_000_000n)
    })

    test('createInstantAsaDisbursement creates finalized ASA disbursement', async () => {
      const user1 = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const user2 = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      // Create test asset
      const assetResult = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 10_000_000_000n,
        decimals: 6,
        assetName: 'SDK Test Token',
        unitName: 'SDKT',
      })
      const assetId = BigInt(assetResult.assetId)

      // Opt contract into asset
      await sdk.optIn({ asset: assetId })

      // Users opt into asset
      await algorand.send.assetOptIn({
        sender: user1.addr,
        signer: user1.signer,
        assetId,
      })
      await algorand.send.assetOptIn({
        sender: user2.addr,
        signer: user2.signer,
        assetId,
      })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantAsaDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 86400n,
        asset: assetId,
        allocations: [
          { address: user1.addr.toString(), amount: 100_000_000n },
          { address: user2.addr.toString(), amount: 200_000_000n },
        ],
      })

      expect(disbursementId).toBeDefined()

      const disbursement = await sdk.getDisbursement({ id: disbursementId })
      expect(disbursement.finalized).toBe(true)
      expect(disbursement.amount).toBe(300_000_000n)
    })

  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK CLAIM REWARDS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Claim Rewards', () => {
    test('claimRewards claims ALGO rewards successfully', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const rewardAmount = 5_000_000n

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 86400n,
        allocations: [{ address: user.addr.toString(), amount: rewardAmount }],
      })

      const balanceBefore = await algorand.account.getInformation(user.addr)

      await sdk.claimRewards({
        sender: user.addr,
        signer: user.signer,
        rewards: [{ id: disbursementId, asset: 0n }],
      })

      const balanceAfter = await algorand.account.getInformation(user.addr)
      const balanceIncrease = balanceAfter.balance.microAlgos - balanceBefore.balance.microAlgos

      // Account for transaction fees
      expect(balanceIncrease).toBeGreaterThan(Number(rewardAmount) - 15_000)
    })

    test('claimRewards claims ASA rewards successfully', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const rewardAmount = 50_000_000n

      // Create test asset
      const assetResult = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 10_000_000_000n,
        decimals: 6,
        assetName: 'Claim Test Token',
        unitName: 'CLM',
      })
      const assetId = BigInt(assetResult.assetId)

      await sdk.optIn({ asset: assetId })

      await algorand.send.assetOptIn({
        sender: user.addr,
        signer: user.signer,
        assetId,
      })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantAsaDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 86400n,
        asset: assetId,
        allocations: [{ address: user.addr.toString(), amount: rewardAmount }],
      })

      await sdk.claimRewards({
        sender: user.addr,
        signer: user.signer,
        rewards: [{ id: disbursementId, asset: assetId }],
      })

      const accountInfo = await algorand.client.algod.accountInformation(user.addr.toString()).do()
      const assetHolding = accountInfo.assets?.find(
        (a: { assetId?: number | bigint; 'asset-id'?: number }) =>
          BigInt(a.assetId ?? a['asset-id'] ?? 0) === assetId
      )
      expect(BigInt(assetHolding?.amount ?? 0)).toBe(rewardAmount)
      const disbursement = await sdk.getDisbursement({ id: disbursementId })
      expect((disbursement as any).mbrCredits).toBeGreaterThan(0n)
    })

    test('claimRewards fails when rewards are locked', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: currentTimestamp + 3600n, // Locked for 1 hour
        expiration: currentTimestamp + 86400n,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await expect(
        sdk.claimRewards({
          sender: user.addr,
          signer: user.signer,
          rewards: [{ id: disbursementId, asset: 0n }],
        })
      ).rejects.toThrow(errDisbursementLocked)
    })

    test('claimRewards fails for non-allocated user', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const otherUser = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 86400n,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await expect(
        sdk.claimRewards({
          sender: otherUser.addr,
          signer: otherUser.signer,
          rewards: [{ id: disbursementId, asset: 0n }],
        })
      ).rejects.toThrow(errAllocationDoesNotExist)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK RECLAIM REWARDS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Reclaim Rewards', () => {
    test('reclaimRewards reclaims expired ALGO rewards', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const rewardAmount = 3_000_000n

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 120n, // Expires in 2 minutes
        allocations: [{ address: user.addr.toString(), amount: rewardAmount }],
      })

      await timeWarp.timeWarp(180n) // Warp 3 minutes

      const balanceBefore = await algorand.account.getInformation(deployer.addr)

      await sdk.reclaimRewards({
        id: disbursementId,
        reclaims: [{ address: user.addr.toString(), asset: 0n }],
      })

      const balanceAfter = await algorand.account.getInformation(deployer.addr)
      const balanceIncrease = balanceAfter.balance.microAlgos - balanceBefore.balance.microAlgos

      expect(balanceIncrease).toBeGreaterThan(Number(rewardAmount) - 15_000)
    })

    test('reclaimRewards fails for non-expired rewards', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 86400n, // Long expiration
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await expect(
        sdk.reclaimRewards({
          id: disbursementId,
          reclaims: [{ address: user.addr.toString(), asset: 0n }],
        })
      ).rejects.toThrow(errDisbursementNotExpired)
    })

    test('reclaimRewards fails for non-creator', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const attacker = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: currentTimestamp + 120n,
        allocations: [{ address: user.addr.toString(), amount: 1_000_000n }],
      })

      await timeWarp.timeWarp(180n)

      await expect(
        sdk.reclaimRewards({
          sender: attacker.addr,
          signer: attacker.signer,
          id: disbursementId,
          reclaims: [{ address: user.addr.toString(), asset: 0n }],
        })
      ).rejects.toThrow(errYouAreNotTheCreator)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // RECLAIM TARGET + SWEEP EXPIRED
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Reclaim target and sweepExpired', () => {
    /** rewards/constants.ts MinDisbursementsMBR: 2,500 + 400 * (9 B key + 121 B DisbursementDetails with reclaimTo) */
    const DISBURSEMENT_MBR = 54_500n
    /** what deployed callers built against Rewards v1 pay per disbursement box */
    const V1_DISBURSEMENT_MBR = 41_700n
    const ALLOCATION_MBR = 25_300n
    const balance = async (address: string | Address) => (await algorand.account.getInformation(address)).balance.microAlgo
    const minBalance = async (address: string | Address) => (await algorand.account.getInformation(address)).minBalance.microAlgo

    const accounts = async () => ({
      user: await fixture.context.generateAccount({ initialFunds: (1).algos() }),
      reclaimTo: await fixture.context.generateAccount({ initialFunds: (1).algos() }),
      keeper: await fixture.context.generateAccount({ initialFunds: (1).algos() }),
    })

    test('an unrelated account sweeps an expired ALGO allocation, its MBR and the box to the reclaim target', async () => {
      const { user, reclaimTo, keeper } = await accounts()
      const amount = 2_000_000n
      const rewardsMinBefore = await minBalance(sdk.client.appAddress)
      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: (await getCurrentTimestamp()) + 120n,
        allocations: [{ address: user.addr.toString(), amount }],
        reclaimTo: reclaimTo.addr.toString(),
      })
      // the charged MBR is exactly what the record (with its reclaimTo field) and the allocation box lock up
      expect(await minBalance(sdk.client.appAddress) - rewardsMinBefore).toBe(DISBURSEMENT_MBR + ALLOCATION_MBR)
      expect((await sdk.getDisbursement({ id: disbursementId })).reclaimTo).toBe(reclaimTo.addr.toString())
      expect(await sdk.getReclaimTarget({ id: disbursementId })).toBe(reclaimTo.addr.toString())
      expect(await sdk.getSweepableAllocations({ id: disbursementId })).toEqual([
        { address: user.addr.toString(), asset: 0n, amount },
      ])

      await expect(sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId }))
        .rejects.toThrow(errDisbursementNotExpired)

      await timeWarp.timeWarp(180n)
      expect(await sdk.getSweepableDisbursementIds()).toContain(disbursementId)

      const targetBefore = await balance(reclaimTo.addr)
      const rewardsBefore = await balance(sdk.client.appAddress)
      await sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId })

      const released = amount + ALLOCATION_MBR + DISBURSEMENT_MBR
      expect(await balance(reclaimTo.addr) - targetBefore).toBe(released)
      expect(rewardsBefore - await balance(sdk.client.appAddress)).toBe(released)
      await expect(sdk.getDisbursement({ id: disbursementId })).rejects.toThrow('not found')
      expect(await sdk.hasAllocation({ address: user.addr.toString(), disbursementId, asset: 0n })).toBe(false)
    })

    test('the old instant selector records a zero reclaimTo at the v2 MBR: sweep reverts, the creator reclaims as before', async () => {
      const { user, keeper } = await accounts()
      const amount = 1_000_000n
      const rewardsMinBefore = await minBalance(sdk.client.appAddress)
      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: (await getCurrentTimestamp()) + 120n,
        allocations: [{ address: user.addr.toString(), amount }],
      })
      expect(await minBalance(sdk.client.appAddress) - rewardsMinBefore).toBe(DISBURSEMENT_MBR + ALLOCATION_MBR)
      expect((await sdk.getDisbursement({ id: disbursementId })).reclaimTo).toBe(algosdk.ALGORAND_ZERO_ADDRESS_STRING)
      expect(await sdk.getReclaimTarget({ id: disbursementId })).toBeUndefined()

      await timeWarp.timeWarp(180n)
      await expect(sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId }))
        .rejects.toThrow(errDisbursementNotSweepable)
      await expect(sdk.reclaimRewards({
        sender: keeper.addr,
        signer: keeper.signer,
        id: disbursementId,
        reclaims: [{ address: user.addr.toString(), asset: 0n }],
      })).rejects.toThrow(errYouAreNotTheCreator)

      const rewardsBefore = await balance(sdk.client.appAddress)
      await sdk.reclaimRewards({ id: disbursementId, reclaims: [{ address: user.addr.toString(), asset: 0n }] })
      expect(rewardsBefore - await balance(sdk.client.appAddress)).toBe(amount)
      // the freed allocation MBR stays creator credit, exactly as before the reclaim target existed
      expect((await sdk.getDisbursement({ id: disbursementId })).mbrCredits).toBe(ALLOCATION_MBR)
    })

    test('after a claim, a sweep with no allocations closes the disbursement and returns its MBR and credits', async () => {
      const { user, reclaimTo, keeper } = await accounts()
      const amount = 500_000n
      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: (await getCurrentTimestamp()) + 120n,
        allocations: [{ address: user.addr.toString(), amount }],
        reclaimTo: reclaimTo.addr.toString(),
      })
      await sdk.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id: disbursementId, asset: 0n }] })

      await timeWarp.timeWarp(180n)
      const targetBefore = await balance(reclaimTo.addr)
      await sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId, reclaims: [] })

      expect(await balance(reclaimTo.addr) - targetBefore).toBe(DISBURSEMENT_MBR + ALLOCATION_MBR)
      await expect(sdk.getDisbursement({ id: disbursementId })).rejects.toThrow('not found')
    })

    test('a partial sweep keeps the disbursement; a repeated entry is skipped and the last one closes it', async () => {
      const { user, reclaimTo, keeper } = await accounts()
      const other = await fixture.context.generateAccount({ initialFunds: (1).algos() })
      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: (await getCurrentTimestamp()) + 120n,
        allocations: [
          { address: user.addr.toString(), amount: 300_000n },
          { address: other.addr.toString(), amount: 700_000n },
        ],
        reclaimTo: reclaimTo.addr.toString(),
      })
      await timeWarp.timeWarp(180n)

      const first = { address: user.addr.toString(), asset: 0n }
      let before = await balance(reclaimTo.addr)
      await sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId, reclaims: [first] })
      expect(await balance(reclaimTo.addr) - before).toBe(300_000n + ALLOCATION_MBR)
      expect((await sdk.getDisbursement({ id: disbursementId })).allocations).toBe(1n)

      before = await balance(reclaimTo.addr)
      await sdk.sweepExpired({
        sender: keeper.addr,
        signer: keeper.signer,
        id: disbursementId,
        reclaims: [first, { address: other.addr.toString(), asset: 0n }],
      })
      expect(await balance(reclaimTo.addr) - before).toBe(700_000n + ALLOCATION_MBR + DISBURSEMENT_MBR)
      await expect(sdk.getDisbursement({ id: disbursementId })).rejects.toThrow('not found')
    })

    test('the creator closing an empty disbursement gets the whole box MBR, reclaimTo field included, back', async () => {
      const { user, reclaimTo } = await accounts()
      const disbursementId = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: (await getCurrentTimestamp()) + 86_400n,
        allocations: [{ address: user.addr.toString(), amount: 100_000n }],
        reclaimTo: reclaimTo.addr.toString(),
      })
      await sdk.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id: disbursementId, asset: 0n }] })

      const rewardsBefore = await balance(sdk.client.appAddress)
      const targetBefore = await balance(reclaimTo.addr)
      await sdk.closeDisbursement({ id: disbursementId })
      expect(rewardsBefore - await balance(sdk.client.appAddress)).toBe(DISBURSEMENT_MBR + ALLOCATION_MBR)
      // closeDisbursement refunds the creator, never the reclaim target
      expect(await balance(reclaimTo.addr)).toBe(targetBefore)
      await expect(sdk.getDisbursement({ id: disbursementId })).rejects.toThrow('not found')
    })

    test('a deployed caller paying the v1 disbursement MBR on the old selectors reverts; the v2 amount passes', async () => {
      const { user } = await accounts()
      const amount = 100_000n
      const call = async (mbr: bigint) => sdk.client.send.createInstantDisbursementPayUint64Uint64AddressUint64Uint64({
        sender: deployer.addr,
        signer: deployer.signer,
        args: {
          mbrPayment: algorand.createTransaction.payment({
            sender: deployer.addr,
            receiver: sdk.client.appAddress,
            amount: algokit.microAlgo(mbr + ALLOCATION_MBR + amount),
          }),
          timeToUnlock: 0n,
          expiration: 0n,
          allocations: [[user.addr.toString(), amount]],
        },
      })
      await expect(call(V1_DISBURSEMENT_MBR)).rejects.toThrow(errInvalidPaymentAmount)
      const { return: id } = await call(DISBURSEMENT_MBR)
      expect(await sdk.getUserAllocation({ address: user.addr.toString(), disbursementId: id!, asset: 0n })).toBe(amount)
    })

    test('a multi-step disbursement with reclaimTo: same MBR as the old selector, kept by edit, claimable, then swept', async () => {
      const { user, reclaimTo, keeper } = await accounts()
      const other = await fixture.context.generateAccount({ initialFunds: (1).algos() })
      const title = 'Multi'
      const boxMbr = DISBURSEMENT_MBR + 400n * BigInt(title.length)
      const rewardsMinBefore = await minBalance(sdk.client.appAddress)
      const disbursementId = await sdk.createDisbursement({
        title, timeToUnlock: 0n, expiration: (await getCurrentTimestamp()) + 120n, note: '',
        mbrCredits: 2n * ALLOCATION_MBR, reclaimTo: reclaimTo.addr.toString(),
      })
      expect(await minBalance(sdk.client.appAddress) - rewardsMinBefore).toBe(boxMbr)
      await sdk.editDisbursement({ id: disbursementId, title, timeToUnlock: 0n, expiration: (await getCurrentTimestamp()) + 120n, note: '' })
      expect(await sdk.getReclaimTarget({ id: disbursementId })).toBe(reclaimTo.addr.toString())

      await sdk.createUserAllocations({ id: disbursementId, allocations: [{ address: user.addr.toString(), amount: 300_000n }] })
      await sdk.createUserAllocations({ id: disbursementId, allocations: [{ address: other.addr.toString(), amount: 700_000n }] })
      await sdk.finalizeDisbursement({ id: disbursementId })

      const rewardsBefore = await balance(sdk.client.appAddress)
      await sdk.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id: disbursementId, asset: 0n }] })
      expect(rewardsBefore - await balance(sdk.client.appAddress)).toBe(300_000n)
      expect(await sdk.hasAllocation({ address: user.addr.toString(), disbursementId, asset: 0n })).toBe(false)
      expect(await sdk.getSweepableDisbursementIds()).not.toContain(disbursementId)

      await timeWarp.timeWarp(180n)
      expect(await sdk.getSweepableDisbursementIds()).toContain(disbursementId)
      const targetBefore = await balance(reclaimTo.addr)
      await sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId })
      // other's allocation and its box MBR, the claimed box's MBR (back as credit) and the closed box
      expect(await balance(reclaimTo.addr) - targetBefore).toBe(700_000n + 2n * ALLOCATION_MBR + boxMbr)
      await expect(sdk.getDisbursement({ id: disbursementId })).rejects.toThrow('not found')
    })

    test('the old 5-arg createDisbursement selector records a zero reclaimTo at an unchanged MBR: sweep reverts errDbns', async () => {
      const { user, keeper } = await accounts()
      const title = 'Legacy'
      const rewardsMinBefore = await minBalance(sdk.client.appAddress)
      const { return: disbursementId } = await sdk.client.send.createDisbursementPayStringUint64Uint64StringUint64({
        sender: deployer.addr,
        signer: deployer.signer,
        args: {
          mbrPayment: algorand.createTransaction.payment({
            sender: deployer.addr,
            receiver: sdk.client.appAddress,
            amount: algokit.microAlgo(DISBURSEMENT_MBR + 400n * BigInt(title.length) + ALLOCATION_MBR),
          }),
          title,
          timeToUnlock: 0n,
          expiration: (await getCurrentTimestamp()) + 120n,
          note: '',
        },
      })
      expect(await minBalance(sdk.client.appAddress) - rewardsMinBefore).toBe(DISBURSEMENT_MBR + 400n * BigInt(title.length))
      const id = disbursementId!
      expect((await sdk.getDisbursement({ id })).reclaimTo).toBe(algosdk.ALGORAND_ZERO_ADDRESS_STRING)
      expect((await sdk.getDisbursement({ id })).mbrCredits).toBe(ALLOCATION_MBR)

      await sdk.createUserAllocations({ id, allocations: [{ address: user.addr.toString(), amount: 100_000n }] })
      await sdk.finalizeDisbursement({ id })
      await timeWarp.timeWarp(180n)
      expect(await sdk.getSweepableDisbursementIds()).not.toContain(id)
      await expect(sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id }))
        .rejects.toThrow(errDisbursementNotSweepable)
    })

    test('an ASA sweep needs the reclaim target opted in, then moves the asset and the MBR', async () => {
      const { user, reclaimTo, keeper } = await accounts()
      const { assetId: created } = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1_000_000n,
        decimals: 0,
        assetName: 'Sweep Test',
        unitName: 'SWP',
      })
      const assetId = BigInt(created)
      await sdk.optIn({ asset: assetId })
      const amount = 4_000n
      const disbursementId = await sdk.createInstantAsaDisbursement({
        timeToUnlock: 0n,
        expiration: (await getCurrentTimestamp()) + 120n,
        asset: assetId,
        allocations: [{ address: user.addr.toString(), amount }],
        reclaimTo: reclaimTo.addr.toString(),
      })
      await timeWarp.timeWarp(180n)

      await expect(sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId }))
        .rejects.toThrow(errReclaimTargetNotOptedIn)

      await algorand.send.assetOptIn({ sender: reclaimTo.addr, signer: reclaimTo.signer, assetId })
      const algoBefore = await balance(reclaimTo.addr)
      await sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: disbursementId })

      const holding = await algorand.asset.getAccountInformation(reclaimTo.addr, assetId)
      expect(holding.balance).toBe(amount)
      expect(await balance(reclaimTo.addr) - algoBefore).toBe(ALLOCATION_MBR + DISBURSEMENT_MBR)
      await expect(sdk.getDisbursement({ id: disbursementId })).rejects.toThrow('not found')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK ASA ALLOCATIONS (Multi-Step Flow)
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK ASA Allocations (Multi-Step)', () => {
    test('createAsaUserAllocations creates ASA allocations', async () => {
      const user1 = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const user2 = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      // Create test asset
      const assetResult = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 10_000_000_000n,
        decimals: 6,
        assetName: 'Allocation Token',
        unitName: 'ALOC',
      })
      const assetId = BigInt(assetResult.assetId)

      await sdk.optIn({ asset: assetId })

      await algorand.send.assetOptIn({
        sender: user1.addr,
        signer: user1.signer,
        assetId,
      })
      await algorand.send.assetOptIn({
        sender: user2.addr,
        signer: user2.signer,
        assetId,
      })

      const currentTimestamp = await getCurrentTimestamp()

      const disbursementId = await sdk.createDisbursement({
        title: 'ASA Allocation Test',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'For ASA allocation',
        mbrCredits: await allocationMbrCredits(2),
      })

      await sdk.createAsaUserAllocations({
        id: disbursementId,
        asset: assetId,
        allocations: [
          { address: user1.addr.toString(), amount: 100_000_000n },
          { address: user2.addr.toString(), amount: 200_000_000n },
        ],
      })

      // Verify allocations
      const user1Allocation = await sdk.getUserAllocation({
        address: user1.addr.toString(),
        disbursementId,
        asset: assetId,
      })
      expect(user1Allocation).toBe(100_000_000n)

      const user2Allocation = await sdk.getUserAllocation({
        address: user2.addr.toString(),
        disbursementId,
        asset: assetId,
      })
      expect(user2Allocation).toBe(200_000_000n)

      // Finalize and verify
      await sdk.finalizeDisbursement({ id: disbursementId })

      const disbursement = await sdk.getDisbursement({ id: disbursementId })
      expect(disbursement.finalized).toBe(true)
      expect(disbursement.amount).toBe(300_000_000n)
    })

    test('createAsaUserAllocations consumes reusable MBR credits', async () => {
      const user1 = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const user2 = await fixture.context.generateAccount({ initialFunds: (10).algos() })

      const assetResult = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 10_000_000_000n,
        decimals: 6,
        assetName: 'Credit Allocation Token',
        unitName: 'CRED',
      })
      const assetId = BigInt(assetResult.assetId)

      await sdk.optIn({ asset: assetId })
      await algorand.send.assetOptIn({
        sender: user1.addr,
        signer: user1.signer,
        assetId,
      })
      await algorand.send.assetOptIn({
        sender: user2.addr,
        signer: user2.signer,
        assetId,
      })

      const currentTimestamp = await getCurrentTimestamp()
      const disbursementId = await sdk.createDisbursement({
        title: 'ASA Credit Allocation Test',
        timeToUnlock: currentTimestamp + 60n,
        expiration: currentTimestamp + 86400n,
        note: 'For ASA credit allocation',
      })

      const mbrData = await sdk.mbr({
        title: 'ASA Credit Allocation Test',
        note: 'For ASA credit allocation',
      })
      const creditAmount = mbrData.userAllocations * 2n

      await sdk.fundMbrCredits({ id: disbursementId, amount: creditAmount })
      const fundedDisbursement = await sdk.getDisbursement({ id: disbursementId })
      expect((fundedDisbursement as any).mbrCredits).toBeGreaterThanOrEqual(creditAmount)

      await sdk.createAsaUserAllocations({
        id: disbursementId,
        asset: assetId,
        allocations: [
          { address: user1.addr.toString(), amount: 100_000_000n },
          { address: user2.addr.toString(), amount: 200_000_000n },
        ],
      })

      const user1Allocation = await sdk.getUserAllocation({
        address: user1.addr.toString(),
        disbursementId,
        asset: assetId,
      })
      expect(user1Allocation).toBe(100_000_000n)

      const user2Allocation = await sdk.getUserAllocation({
        address: user2.addr.toString(),
        disbursementId,
        asset: assetId,
      })
      expect(user2Allocation).toBe(200_000_000n)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK OPT-IN
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Opt-In', () => {
    test('optIn opts contract into asset', async () => {
      const assetResult = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1_000_000n,
        decimals: 0,
        assetName: 'Opt In Test',
        unitName: 'OPT',
      })
      const assetId = BigInt(assetResult.assetId)

      await sdk.optIn({ asset: assetId })

      // Verify the contract holds the asset (balance should be 0)
      const accountInfo = await algorand.client.algod
        .accountInformation(sdk.client.appAddress.toString()).do()
      const assetHolding = accountInfo.assets?.find(
        (a: { assetId?: number | bigint; 'asset-id'?: number }) =>
          BigInt(a.assetId ?? a['asset-id'] ?? 0) === assetId
      )
      expect(assetHolding).toBeDefined()
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // BATCH LIMITS - Testing transaction limits
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Batch Limits', () => {
    // Helper to generate multiple test accounts
    const generateAccounts = async (count: number) => {
      const accounts = []
      for (let i = 0; i < count; i++) {
        const account = await fixture.context.generateAccount({ initialFunds: (10).algos() })
        accounts.push(account)
      }
      return accounts
    }

    // Helper to create allocations array
    const createAllocations = (accounts: TransactionSignerAccount[], amount: bigint): UserAllocation[] => {
      return accounts.map(account => ({
        address: account.addr.toString(),
        amount,
      }))
    }

    describe('createUserAllocations limits (with dynamic opUp)', () => {
      test('can create 5 ALGO allocations (no opUp needed)', async () => {
        const accounts = await generateAccounts(5)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createDisbursement({
          title: 'Batch 5',
          timeToUnlock: currentTimestamp + 60n,
          expiration: currentTimestamp + 86400n,
          note: 'Testing 5 allocations',
          mbrCredits: await allocationMbrCredits(5),
        })

        await sdk.createUserAllocations({
          id: disbursementId,
          allocations: createAllocations(accounts, 100_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(5n)
      })

      test('can create 10 ALGO allocations (with opUp)', async () => {
        const accounts = await generateAccounts(10)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createDisbursement({
          title: 'Batch 10',
          timeToUnlock: currentTimestamp + 60n,
          expiration: currentTimestamp + 86400n,
          note: 'Testing 10 allocations with opUp',
          mbrCredits: await allocationMbrCredits(10),
        })

        await sdk.createUserAllocations({
          id: disbursementId,
          allocations: createAllocations(accounts, 100_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(10n)
      })

      test('can create 15 ALGO allocations (with multiple opUps)', async () => {
        const accounts = await generateAccounts(15)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createDisbursement({
          title: 'Batch 15',
          timeToUnlock: currentTimestamp + 60n,
          expiration: currentTimestamp + 86400n,
          note: 'Testing 15 allocations with opUps',
          mbrCredits: await allocationMbrCredits(15),
        })

        await sdk.createUserAllocations({
          id: disbursementId,
          allocations: createAllocations(accounts, 100_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(15n)
      })
    })

    describe('createInstantDisbursement limits (with dynamic opUp)', () => {
      test('can create instant disbursement with 5 allocations (no opUp)', async () => {
        const accounts = await generateAccounts(5)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          allocations: createAllocations(accounts, 100_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(5n)
        expect(disbursement.finalized).toBe(true)
      })

      test('can create instant disbursement with 10 allocations (with opUp)', async () => {
        const accounts = await generateAccounts(10)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          allocations: createAllocations(accounts, 100_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(10n)
        expect(disbursement.finalized).toBe(true)
      })

      test('can create instant disbursement with 15 allocations (with multiple opUps)', async () => {
        const accounts = await generateAccounts(15)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          allocations: createAllocations(accounts, 100_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(15n)
        expect(disbursement.finalized).toBe(true)
      })
    })

    describe('claimRewards limits (with dynamic opUp)', () => {
      test('user can claim from 2 disbursements (no opUp)', async () => {
        const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
        const currentTimestamp = await getCurrentTimestamp()

        // Create 2 disbursements for the same user
        const disbursementIds: bigint[] = []
        for (let i = 0; i < 2; i++) {
          const id = await sdk.createInstantDisbursement({
            timeToUnlock: 0n,
            expiration: currentTimestamp + 86400n,
            allocations: [{ address: user.addr.toString(), amount: 100_000n }],
          })
          disbursementIds.push(id)
        }

        const balanceBefore = await algorand.account.getInformation(user.addr)

        await sdk.claimRewards({
          sender: user.addr,
          signer: user.signer,
          rewards: disbursementIds.map(id => ({ id, asset: 0n })),
        })

        const balanceAfter = await algorand.account.getInformation(user.addr)
        const balanceIncrease = balanceAfter.balance.microAlgos - balanceBefore.balance.microAlgos

        // Should have received 200,000 - fees
        expect(balanceIncrease).toBeGreaterThan(180_000)
      })

      test('user can claim from 4 disbursements (with opUp)', async () => {
        const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementIds: bigint[] = []
        for (let i = 0; i < 4; i++) {
          const id = await sdk.createInstantDisbursement({
            timeToUnlock: 0n,
            expiration: currentTimestamp + 86400n,
            allocations: [{ address: user.addr.toString(), amount: 100_000n }],
          })
          disbursementIds.push(id)
        }

        const balanceBefore = await algorand.account.getInformation(user.addr)

        await sdk.claimRewards({
          sender: user.addr,
          signer: user.signer,
          rewards: disbursementIds.map(id => ({ id, asset: 0n })),
        })

        const balanceAfter = await algorand.account.getInformation(user.addr)
        const balanceIncrease = balanceAfter.balance.microAlgos - balanceBefore.balance.microAlgos

        // Should have received 400,000 - fees
        expect(balanceIncrease).toBeGreaterThan(360_000)
      })

      test('user can claim from 5 disbursements (with opUps)', async () => {
        const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementIds: bigint[] = []
        for (let i = 0; i < 5; i++) {
          const id = await sdk.createInstantDisbursement({
            timeToUnlock: 0n,
            expiration: currentTimestamp + 86400n,
            allocations: [{ address: user.addr.toString(), amount: 100_000n }],
          })
          disbursementIds.push(id)
        }

        const balanceBefore = await algorand.account.getInformation(user.addr)

        await sdk.claimRewards({
          sender: user.addr,
          signer: user.signer,
          rewards: disbursementIds.map(id => ({ id, asset: 0n })),
        })

        const balanceAfter = await algorand.account.getInformation(user.addr)
        const balanceIncrease = balanceAfter.balance.microAlgos - balanceBefore.balance.microAlgos

        // Should have received 500,000 - fees
        expect(balanceIncrease).toBeGreaterThan(450_000)
      })
    })

    describe('reclaimRewards limits', () => {
      test('creator can reclaim from 3 users in one call', async () => {
        const accounts = await generateAccounts(3)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 120n, // Expires in 2 minutes
          allocations: createAllocations(accounts, 100_000n),
        })

        await timeWarp.timeWarp(180n) // Warp past expiration

        const balanceBefore = await algorand.account.getInformation(deployer.addr)

        await sdk.reclaimRewards({
          id: disbursementId,
          reclaims: accounts.map(acc => ({ address: acc.addr.toString(), asset: 0n })),
        })

        const balanceAfter = await algorand.account.getInformation(deployer.addr)
        const balanceIncrease = balanceAfter.balance.microAlgos - balanceBefore.balance.microAlgos

        // Should have received 300,000 - fees + MBR refunds
        expect(balanceIncrease).toBeGreaterThan(250_000)
      })

      test('creator can reclaim from 5 users in one call', async () => {
        const accounts = await generateAccounts(5)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 120n,
          allocations: createAllocations(accounts, 100_000n),
        })

        await timeWarp.timeWarp(180n)

        const balanceBefore = await algorand.account.getInformation(deployer.addr)

        await sdk.reclaimRewards({
          id: disbursementId,
          reclaims: accounts.map(acc => ({ address: acc.addr.toString(), asset: 0n })),
        })

        const balanceAfter = await algorand.account.getInformation(deployer.addr)
        const balanceIncrease = balanceAfter.balance.microAlgos - balanceBefore.balance.microAlgos

        // Should have received 500,000 - fees + MBR refunds
        expect(balanceIncrease).toBeGreaterThan(450_000)
      })
    })

    describe('ASA batch limits (with dynamic opUp)', () => {
      test('can create instant ASA disbursement with 5 allocations (no opUp)', async () => {
        const accounts = await generateAccounts(5)

        // Create test asset
        const assetResult = await algorand.send.assetCreate({
          sender: deployer.addr,
          signer: deployer.signer,
          total: 10_000_000_000n,
          decimals: 6,
          assetName: 'Batch ASA Test',
          unitName: 'BATCH',
        })
        const assetId = BigInt(assetResult.assetId)

        await sdk.optIn({ asset: assetId })

        // Users opt into asset
        for (const account of accounts) {
          await algorand.send.assetOptIn({
            sender: account.addr,
            signer: account.signer,
            assetId,
          })
        }

        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantAsaDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          asset: assetId,
          allocations: createAllocations(accounts, 1_000_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(5n)
        expect(disbursement.amount).toBe(5_000_000n)
      })

      test('can create instant ASA disbursement with 10 allocations (with opUp)', async () => {
        const accounts = await generateAccounts(10)

        const assetResult = await algorand.send.assetCreate({
          sender: deployer.addr,
          signer: deployer.signer,
          total: 10_000_000_000n,
          decimals: 6,
          assetName: 'Batch ASA Test 10',
          unitName: 'BAT10',
        })
        const assetId = BigInt(assetResult.assetId)

        await sdk.optIn({ asset: assetId })

        for (const account of accounts) {
          await algorand.send.assetOptIn({
            sender: account.addr,
            signer: account.signer,
            assetId,
          })
        }

        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantAsaDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          asset: assetId,
          allocations: createAllocations(accounts, 1_000_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(10n)
        expect(disbursement.amount).toBe(10_000_000n)
      })

      test('can create instant ASA disbursement with 15 allocations (with multiple opUps)', async () => {
        const accounts = await generateAccounts(15)

        const assetResult = await algorand.send.assetCreate({
          sender: deployer.addr,
          signer: deployer.signer,
          total: 10_000_000_000n,
          decimals: 6,
          assetName: 'Batch ASA Test 15',
          unitName: 'BAT15',
        })
        const assetId = BigInt(assetResult.assetId)

        await sdk.optIn({ asset: assetId })

        for (const account of accounts) {
          await algorand.send.assetOptIn({
            sender: account.addr,
            signer: account.signer,
            assetId,
          })
        }

        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantAsaDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          asset: assetId,
          allocations: createAllocations(accounts, 1_000_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(15n)
        expect(disbursement.amount).toBe(15_000_000n)
      })
    })

    // ═══════════════════════════════════════════════════════════════════════════
    // MAXIMUM ALLOCATION LIMITS
    // ═══════════════════════════════════════════════════════════════════════════
    // Limiting factor: ApplicationArgs size limit (2048 bytes)
    // Each allocation = 40 bytes (32 byte address + 8 byte amount)
    // Overhead = ~22 bytes (method selector + other args)
    // Max allocations = floor((2048 - 22) / 40) = 50 allocations
    //
    // Reference limits (128 with 15 opUps) are NOT the bottleneck here.
    // ═══════════════════════════════════════════════════════════════════════════

    describe('Maximum allocation limits (50 per transaction group)', () => {
      test('ALGO: can create instant disbursement with 50 allocations (MAX)', async () => {
        const MAX_ALLOCATIONS = 50
        const accounts = await generateAccounts(MAX_ALLOCATIONS)
        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          allocations: createAllocations(accounts, 100_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(BigInt(MAX_ALLOCATIONS))
        expect(disbursement.amount).toBe(BigInt(MAX_ALLOCATIONS) * 100_000n)
        expect(disbursement.finalized).toBe(true)
      })

      test('ASA: can create instant disbursement with 50 allocations (MAX)', async () => {
        const MAX_ALLOCATIONS = 50
        const accounts = await generateAccounts(MAX_ALLOCATIONS)

        const assetResult = await algorand.send.assetCreate({
          sender: deployer.addr,
          signer: deployer.signer,
          total: 100_000_000_000n,
          decimals: 6,
          assetName: 'Max Allocation Test',
          unitName: 'MAXA',
        })
        const assetId = BigInt(assetResult.assetId)

        await sdk.optIn({ asset: assetId })

        for (const account of accounts) {
          await algorand.send.assetOptIn({
            sender: account.addr,
            signer: account.signer,
            assetId,
          })
        }

        const currentTimestamp = await getCurrentTimestamp()

        const disbursementId = await sdk.createInstantAsaDisbursement({
          timeToUnlock: 0n,
          expiration: currentTimestamp + 86400n,
          asset: assetId,
          allocations: createAllocations(accounts, 1_000_000n),
        })

        const disbursement = await sdk.getDisbursement({ id: disbursementId })
        expect(disbursement.allocations).toBe(BigInt(MAX_ALLOCATIONS))
        expect(disbursement.amount).toBe(BigInt(MAX_ALLOCATIONS) * 1_000_000n)
        expect(disbursement.finalized).toBe(true)
      })
    })
  })
  // ═══════════════════════════════════════════════════════════════════════════
  // REWARDS V2 REGRESSIONS (2026-10 audit: C-1, H-3, M-4)
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Rewards v2 regressions', () => {
    const newOptedInAsset = async (holders: TransactionSignerAccount[]) => {
      const assetResult = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 10_000_000_000n,
        decimals: 0,
        assetName: 'V2 Token',
        unitName: 'V2T',
      })
      const assetId = BigInt(assetResult.assetId)
      await sdk.optIn({ asset: assetId })
      for (const h of holders) {
        await algorand.send.assetOptIn({ sender: h.addr, signer: h.signer, assetId })
      }
      return assetId
    }

    const fromGroupCall = async (
      sender: TransactionSignerAccount,
      paymentIndex: bigint,
      startIndex: bigint,
      allocations: [string, bigint][],
      expiration: bigint,
      note = '',
    ) => sdk.client.params.createAsaDisbursementFromGroup({
      sender: sender.addr,
      signer: sender.signer,
      note,
      args: {
        mbrPaymentIndex: paymentIndex,
        assetTransferStartIndex: startIndex,
        title: '',
        timeToUnlock: 0n,
        expiration,
        note: '',
        allocations,
      },
      staticFee: algokit.microAlgo(2_000),
    })

    test('C-1: two createAsaDisbursementFromGroup calls cannot share one funding block', async () => {
      const attacker = await fixture.context.generateAccount({ initialFunds: (50).algos() })
      const assetId = await newOptedInAsset([attacker])
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: attacker.addr, assetId, amount: 1_000n })

      const mbr = await sdk.mbr({ title: '', note: '' })
      const exact = mbr.disbursements + mbr.userAllocations
      const expiration = (await getCurrentTimestamp()) + 86_400n
      const appBalanceBefore = (await algorand.account.getInformation(sdk.client.appAddress)).balance.microAlgos

      // [pay, axfer, call(0,1), call(0,1)]: the second call reuses the first one's funding
      await expect(
        algorand.newGroup()
          .addPayment({ sender: attacker.addr, signer: attacker.signer, receiver: sdk.client.appAddress, amount: algokit.microAlgo(exact) })
          .addAssetTransfer({ sender: attacker.addr, signer: attacker.signer, receiver: sdk.client.appAddress, assetId, amount: 1_000n })
          .addAppCallMethodCall(await fromGroupCall(attacker, 0n, 1n, [[attacker.addr.toString(), 1_000n]], expiration, 'first'))
          .addAppCallMethodCall(await fromGroupCall(attacker, 0n, 1n, [[attacker.addr.toString(), 1_000n]], expiration, 'second'))
          .send()
      ).rejects.toThrow(errInvalidGroupIndex)

      const appBalanceAfter = (await algorand.account.getInformation(sdk.client.appAddress)).balance.microAlgos
      expect(appBalanceAfter).toBe(appBalanceBefore)
    })

    test('C-1: funding must be exact and immediately before the call; another account may pay it and gets it back', async () => {
      const creator = await fixture.context.generateAccount({ initialFunds: (50).algos() })
      const sponsor = await fixture.context.generateAccount({ initialFunds: (50).algos() })
      const assetId = await newOptedInAsset([creator])
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: creator.addr, assetId, amount: 10_000n })

      const mbr = await sdk.mbr({ title: '', note: '' })
      const exact = mbr.disbursements + mbr.userAllocations
      const expiration = (await getCurrentTimestamp()) + 86_400n
      const build = async (payAmount: bigint, payer: TransactionSignerAccount, p: bigint, a: bigint) =>
        algorand.newGroup()
          .addPayment({ sender: payer.addr, signer: payer.signer, receiver: sdk.client.appAddress, amount: algokit.microAlgo(payAmount) })
          .addAssetTransfer({ sender: creator.addr, signer: creator.signer, receiver: sdk.client.appAddress, assetId, amount: 500n })
          .addAppCallMethodCall(await fromGroupCall(creator, p, a, [[creator.addr.toString(), 500n]], expiration))

      // surplus payment would become withdrawable MBR credit
      await expect((await build(exact + 1_000_000n, creator, 0n, 1n)).send()).rejects.toThrow()
      // another payer is remembered, so the storage alone is not enough from it
      await expect((await build(exact, sponsor, 0n, 1n)).send()).rejects.toThrow(errInvalidPaymentAmount)
      // wrong positions
      await expect((await build(exact, creator, 1n, 2n)).send()).rejects.toThrow(errInvalidGroupIndex)

      // the bound group works and creates a finalized disbursement with no spare credit
      const before = await sdk.getState()
      await (await build(exact, creator, 0n, 1n)).send()
      const disbursement = await sdk.getDisbursement({ id: before.disbursementId })
      expect(disbursement.finalized).toBe(true)
      expect(disbursement.amount).toBe(500n)
      expect(BigInt((disbursement as any).mbrCredits)).toBe(0n)

      // another account pays the storage and its payer record, and gets both back at the close
      const balance = async (account: TransactionSignerAccount) => (await algorand.account.getInformation(account.addr)).balance.microAlgo
      const next = await sdk.getState()
      const sponsorBefore = await balance(sponsor)
      await (await build(exact + PAYER_RECORD_MBR, sponsor, 0n, 1n)).send()
      expect(sponsorBefore - (await balance(sponsor))).toBe(exact + PAYER_RECORD_MBR + 1_000n)
      expect((await sdk.getDisbursement({ id: next.disbursementId })).finalized).toBe(true)
      expect(BigInt(((await sdk.getDisbursement({ id: next.disbursementId })) as any).mbrCredits)).toBe(0n)

      await sdk.claimRewards({ sender: creator.addr, signer: creator.signer, rewards: [{ id: next.disbursementId, asset: assetId }] })
      const sponsorHeld = await balance(sponsor)
      const creatorHeld = await balance(creator)
      await sdk.closeDisbursement({ sender: creator.addr, signer: creator.signer, id: next.disbursementId })
      expect((await balance(sponsor)) - sponsorHeld).toBe(exact + PAYER_RECORD_MBR)
      expect(await balance(creator)).toBeLessThan(creatorHeld)
    })

    test('a draft funded by another account: that account tops it up, and credits and storage return to it', async () => {
      const creator = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const sponsor = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const balance = async (account: TransactionSignerAccount) => (await algorand.account.getInformation(account.addr)).balance.microAlgo
      const pay = (payer: TransactionSignerAccount, amount: bigint) => algorand.createTransaction.payment({
        sender: payer.addr, receiver: sdk.client.appAddress, amount: algokit.microAlgo(amount),
      })
      const mbr = await sdk.mbr({ title: 'paid for', note: '' })
      const credits = mbr.userAllocations * 2n
      const create = async (amount: bigint) => sdk.client.send.createDisbursementPayStringUint64Uint64StringUint64({
        sender: creator.addr,
        signer: creator.signer,
        args: {
          mbrPayment: { txn: await pay(sponsor, amount), signer: sponsor.signer },
          title: 'paid for', timeToUnlock: 0n, expiration: (await getCurrentTimestamp()) + 86_400n, note: '',
        },
      })

      // the storage alone is not enough from another payer: it also funds its payer record
      await expect(create(mbr.disbursements + PAYER_RECORD_MBR - 1n)).rejects.toThrow()
      const sponsorStart = await balance(sponsor)
      const { return: id } = await create(mbr.disbursements + PAYER_RECORD_MBR + credits)
      expect((await getMbrCredits(id!)).available).toBe(credits)

      // top-ups come from the account that funded the disbursement, whoever created it
      const fund = async (payer: TransactionSignerAccount) => (sdk.client.send as any).fundMbrCredits({
        sender: creator.addr,
        signer: creator.signer,
        args: { id, payment: { txn: await pay(payer, mbr.userAllocations), signer: payer.signer } },
      })
      await expect(fund(creator)).rejects.toThrow(errPayerOnly)
      await fund(sponsor)
      expect((await getMbrCredits(id!)).available).toBe(credits + mbr.userAllocations)

      // the creator withdraws credit and closes the draft; all of it goes to the account that paid
      const creatorHeld = await balance(creator)
      await sdk.withdrawMbrCredits({ sender: creator.addr, signer: creator.signer, id: id!, amount: mbr.userAllocations })
      await sdk.closeDisbursement({ sender: creator.addr, signer: creator.signer, id: id! })
      // the sponsor is out the network fees of its two payments only
      expect(sponsorStart - (await balance(sponsor))).toBe(2_000n)
      expect(await balance(creator)).toBeLessThan(creatorHeld)
      await expect(sdk.getDisbursement({ id: id! })).rejects.toThrow()
    })

    test('a sweep returns storage to the account that paid it and the rewards to the reclaim target', async () => {
      const creator = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const sponsor = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const user = await fixture.context.generateAccount({ initialFunds: (1).algos() })
      const reclaimTo = await fixture.context.generateAccount({ initialFunds: (1).algos() })
      const keeper = await fixture.context.generateAccount({ initialFunds: (1).algos() })
      const balance = async (account: TransactionSignerAccount) => (await algorand.account.getInformation(account.addr)).balance.microAlgo
      const mbr = await sdk.mbr({ title: '', note: '' })
      const storage = mbr.disbursements + mbr.userAllocations
      const amount = 2_000_000n

      const { return: id } = await sdk.client.send.createInstantDisbursementPayUint64Uint64AddressUint64AddressUint64({
        sender: creator.addr,
        signer: creator.signer,
        args: {
          mbrPayment: {
            txn: await algorand.createTransaction.payment({
              sender: sponsor.addr, receiver: sdk.client.appAddress, amount: algokit.microAlgo(storage + amount + PAYER_RECORD_MBR),
            }),
            signer: sponsor.signer,
          },
          timeToUnlock: 0n,
          expiration: (await getCurrentTimestamp()) + 120n,
          allocations: [[user.addr.toString(), amount]],
          reclaimTo: reclaimTo.addr.toString(),
        },
      })

      await timeWarp.timeWarp(180n)
      const sponsorHeld = await balance(sponsor)
      const targetHeld = await balance(reclaimTo)
      const creatorHeld = await balance(creator)
      await sdk.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id: id! })
      expect((await balance(reclaimTo)) - targetHeld).toBe(amount)
      expect((await balance(sponsor)) - sponsorHeld).toBe(storage + PAYER_RECORD_MBR)
      expect(await balance(creator)).toBe(creatorHeld)
      await expect(sdk.getDisbursement({ id: id! })).rejects.toThrow('not found')
    })

    test('H-3: repeated addresses top up one allocation instead of failing', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const now = await getCurrentTimestamp()
      const id = await sdk.createDisbursement({
        title: 'topup', timeToUnlock: 0n, expiration: now + 86_400n, note: '',
        mbrCredits: await allocationMbrCredits(3),
      })

      await sdk.createUserAllocations({
        id,
        allocations: [
          { address: user.addr.toString(), amount: 5n },
          { address: user.addr.toString(), amount: 7n },
        ],
      })
      await sdk.createUserAllocations({ id, allocations: [{ address: user.addr.toString(), amount: 3n }] })

      expect(await sdk.getUserAllocation({ address: user.addr.toString(), disbursementId: id, asset: 0n })).toBe(15n)
      const d = await sdk.getDisbursement({ id })
      expect(d.allocations).toBe(1n)
      expect(d.amount).toBe(15n)
      // only one allocation box consumed credit
      const credits = await getMbrCredits(id)
      expect(credits.used).toBe(await allocationMbrCredits(1))
    })

    test('M-4: claims require finalization', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const now = await getCurrentTimestamp()
      const id = await sdk.createDisbursement({
        title: 'unfinal', timeToUnlock: 0n, expiration: now + 86_400n, note: '',
        mbrCredits: await allocationMbrCredits(1),
      })
      await sdk.createUserAllocations({ id, allocations: [{ address: user.addr.toString(), amount: 1_000n }] })

      await expect(
        sdk.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id, asset: 0n }] })
      ).rejects.toThrow(errDisbursementNotFinal)

      await sdk.finalizeDisbursement({ id })
      await sdk.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id, asset: 0n }] })
    })

    test('M-4: expiration 0 never expires: claimable later, never reclaimable', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const id = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: 0n,
        allocations: [{ address: user.addr.toString(), amount: 2_000n }],
      })

      await expect(
        sdk.reclaimRewards({ id, reclaims: [{ address: user.addr.toString(), asset: 0n }] })
      ).rejects.toThrow(errDisbursementNotExpired)

      await timeWarp.timeWarp(86_400n * 30n)
      await sdk.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id, asset: 0n }] })
    })

    test('M-4: instant batches are validated; duplicates are summed and their unused MBR stays withdrawable', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const now = await getCurrentTimestamp()

      await expect(
        sdk.createInstantDisbursement({ timeToUnlock: 0n, expiration: now + 86_400n, allocations: [] })
      ).rejects.toThrow()

      await expect(
        sdk.createInstantDisbursement({ timeToUnlock: 0n, expiration: now - 10n, allocations: [{ address: user.addr.toString(), amount: 1n }] })
      ).rejects.toThrow()

      const id = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: now + 86_400n,
        allocations: [
          { address: user.addr.toString(), amount: 1_000n },
          { address: user.addr.toString(), amount: 500n },
          { address: user.addr.toString(), amount: 0n },
        ],
      })
      expect(await sdk.getUserAllocation({ address: user.addr.toString(), disbursementId: id, asset: 0n })).toBe(1_500n)
      const d = await sdk.getDisbursement({ id })
      expect(d.allocations).toBe(1n)
      expect(d.amount).toBe(1_500n)
      const credits = await getMbrCredits(id)
      expect(credits.available).toBe(await allocationMbrCredits(2))
      expect(credits.used).toBe(await allocationMbrCredits(1))
    })

    test('closeDisbursement refunds box MBR and credits once every allocation is consumed', async () => {
      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const now = await getCurrentTimestamp()
      const id = await sdk.createInstantDisbursement({
        timeToUnlock: 0n,
        expiration: now + 86_400n,
        allocations: [{ address: user.addr.toString(), amount: 1_000n }],
      })

      await expect(sdk.closeDisbursement({ id })).rejects.toThrow(errDisbursementNotEmpty)

      await sdk.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id, asset: 0n }] })

      const mbr = await sdk.mbr({ title: '', note: '' })
      const before = (await algorand.account.getInformation(deployer.addr)).balance.microAlgos
      await sdk.closeDisbursement({ id })
      const after = (await algorand.account.getInformation(deployer.addr)).balance.microAlgos
      // disbursement box + the released allocation credit, minus fees
      expect(after - before).toBeGreaterThan(mbr.disbursements + mbr.userAllocations - 10_000n)
      await expect(sdk.getDisbursement({ id })).rejects.toThrow()
    })

    test('STAKE-3: a Rewards app funded with only its minimum balance stays solvent through instant disbursements, claims and closes', async () => {
      const { appClient } = await algorand.client.getTypedAppFactory(RewardsFactory, {
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      }).send.create.create({ args: { version: '1.0.0', akitaDao: 0n } })
      const lean = new RewardsSDK({
        factoryParams: { appId: appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
        algorand,
      })
      await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: lean.client.appAddress, amount: algokit.microAlgo(100_000n) })
      /** ALGO above the minimum balance: exactly what the app owes (ALGO allocations + MBR credits) */
      const spare = async () => {
        const info = await algorand.account.getInformation(lean.client.appAddress)
        return info.balance.microAlgo - info.minBalance.microAlgo
      }
      expect(await spare()).toBe(0n)

      const user = await fixture.context.generateAccount({ initialFunds: (10).algos() })
      const assetId = BigInt((await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000_000n, decimals: 0, assetName: 'Lean', unitName: 'LEAN',
      })).assetId)
      await lean.optIn({ asset: assetId })
      await algorand.send.assetOptIn({ sender: user.addr, signer: user.signer, assetId })
      expect(await spare()).toBe(0n)

      const expiration = (await getCurrentTimestamp()) + 86_400n
      const algoId = await lean.createInstantDisbursement({ timeToUnlock: 0n, expiration, allocations: [{ address: user.addr.toString(), amount: 1_000n }] })
      expect(await spare()).toBe(1_000n)
      const asaId = await lean.createInstantAsaDisbursement({ timeToUnlock: 0n, expiration, asset: assetId, allocations: [{ address: user.addr.toString(), amount: 500n }] })
      expect(await spare()).toBe(1_000n)

      const { userAllocations } = await lean.mbr({ title: '', note: '' })
      await lean.claimRewards({ sender: user.addr, signer: user.signer, rewards: [{ id: algoId, asset: 0n }, { id: asaId, asset: assetId }] })
      // the two deleted allocation boxes become withdrawable credits
      expect(await spare()).toBe(2n * userAllocations)

      await lean.closeDisbursement({ id: algoId })
      await lean.closeDisbursement({ id: asaId })
      expect(await spare()).toBe(0n)
    })

    test('editDisbursement charges a longer title against credits and credits a shorter one', async () => {
      const now = await getCurrentTimestamp()
      const id = await sdk.createDisbursement({ title: 'a', timeToUnlock: 0n, expiration: now + 86_400n, note: '' })
      // no credits: growing the box must fail instead of using the app's balance
      await expect(
        sdk.editDisbursement({ id, title: 'a much longer title', timeToUnlock: 0n, expiration: now + 86_400n, note: '' })
      ).rejects.toThrow(errInvalidMbrAmount)

      await sdk.editDisbursement({ id, title: '', timeToUnlock: 0n, expiration: now + 86_400n, note: '' })
      expect((await getMbrCredits(id)).available).toBe(400n)
    })
  })
})
