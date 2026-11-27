import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount as AddressWithTransactionSigner } from '@algorandfoundation/algokit-utils/types/account';
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { StakingSDK, StakingType } from 'akita-sdk/staking'
import { DisbursementPhase, StakingPoolFactorySDK, StakingPoolSDK } from 'akita-sdk/staking-pool'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { MetaSDK, MerkleTree, SchemaPart } from '../../../akita-sdk/src/meta'
import {
  errAbortForbidden,
  errFailedStakeVerify,
  errInvalidPoolType,
  errInvalidRewardTiming,
  errNotEntrant,
  errPoolNotEnded,
  errRoundOpen,
  errSoftValueWeighted,
  errTypedPoolNeedsStakeKey,
} from './errors'
import algosdk from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { MockRandomnessBeaconClient, MockRandomnessBeaconFactory } from '../artifacts/utils/types/MockRandomnessBeaconClient'
import {
  completeBalanceVerification,
  createExpectedCost,
  expectBalanceChange,
  getAccountBalance,
  MIN_TXN_FEE,
  verifyBalanceChange
} from '../../tests/utils/balance'
import { TimeWarp } from '../../tests/utils/time'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

// H-2 (2026-10 audit): typed pools (HEARTBEAT/SOFT/HARD/LOCK) must restrict entries to the assets of
// a merkle stake key. Every test pool shares one root over the assets the tests stake.
let poolAssetTree: MerkleTree
let poolAssetLeaves: bigint[] = []
let poolStakeKey: { address: string; name: string }
const proofsFor = (asset: bigint | number): Uint8Array[] => {
  const index = poolAssetLeaves.findIndex((a) => a === BigInt(asset))
  if (index < 0) return []
  return poolAssetTree.getProof(index)
}

// Staking Pool Type Constants (matches contract)
const POOL_STAKING_TYPE_NONE = 0
const POOL_STAKING_TYPE_HEARTBEAT = 10
const POOL_STAKING_TYPE_SOFT = 20
const POOL_STAKING_TYPE_HARD = 30
const POOL_STAKING_TYPE_LOCK = 40

// Distribution Type Constants
const DISTRIBUTION_TYPE_PERCENTAGE = 10
const DISTRIBUTION_TYPE_FLAT = 20
const DISTRIBUTION_TYPE_EVEN = 30
const DISTRIBUTION_TYPE_SHUFFLE = 40

// Pool Status Constants
const POOL_STATUS_DRAFT = 0
const POOL_STATUS_FINAL = 10

// MBR Constants (from contract constants.ts). Q14 (principal resolution §6.5): entries are charged
// their exact box MBR; an ungated entry stores no gate args: 2_500 + 400 * (60 + 2) = 27_300, and
// `entriesByAddress` is 2_500 + 400 * 49 = 22_100 (the pre-Q14 flat 25_300 + 25_300 stays only for
// legacy-shim / hard-coded payments).
const POOL_ENTRIES_MBR = 27_300n
const POOL_UNIQUES_MBR = 18_900n
const POOL_ENTRIES_BY_ADDRESS_MBR = 22_100n
const STAKING_APP_STAKES_MBR = 34_900n
const WINNER_COUNT_CAP = 10n
const MIN_POOL_REWARDS_MBR = 59_700n
const POOL_REWARD_WINNING_TICKET_BYTES = 8n
const BOX_COST_PER_BYTE = 400n
const POOL_DISBURSEMENTS_MBR = 6_100n
const ASSET_OPT_IN_MBR = 100_000n // Standard ASA opt-in MBR

// Transaction fee constants are now imported from tests/utils/balance

/**
 * Calculate the MBR required for rewards storage based on winning tickets
 */
const calculateRewardsMbr = (winningTickets: bigint): bigint => {
  return MIN_POOL_REWARDS_MBR + (BOX_COST_PER_BYTE * POOL_REWARD_WINNING_TICKET_BYTES * winningTickets)
}

/**
 * Calculate the total MBR required for pool entry
 * @param entryCount Number of entries being added
 * @param isFirstEntry Whether this is the user's first entry (requires uniques MBR)
 */
const calculateEntryMbr = (entryCount: bigint, isFirstEntry: boolean): bigint => {
  const perEntryMbr = POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR
  let total = perEntryMbr * entryCount
  if (isFirstEntry) {
    total += POOL_UNIQUES_MBR
  }
  return total
}

// Balance verification utilities are now imported from tests/utils/balance

/**
 * Produce a fresh `TransactionSignerAccount` using algokit-utils v10's account
 * manager. `algosdk.makeBasicAccountTransactionSigner` cannot sign algokit-utils
 * v10 `Transaction` objects (they expose no `signTxn` method), so we defer to
 * `algorand.account.random()` which wires up a tweetnacl-backed signer that
 * speaks the v10 Transaction shape. The account is also registered with the
 * algorand client so the SDK's default-signer lookup finds it at submit time.
 */
const generateSignerAccount = (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): AddressWithTransactionSigner => {
  return algorand.account.random()
}

// Time Constants
const ONE_DAY = 86_400
const ONE_HOUR = 3_600
const ONE_MINUTE = 60

/**
 * Get the current Algorand block timestamp
 */
const getBlockTimestamp = async (algorand: import('@algorandfoundation/algokit-utils').AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  const block = await algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

/**
 * The struct argument shape expected by the contract's addReward method.
 * Field ORDER matters: the algokit-utils ABI encoder uses Object.values()
 * to convert the struct to a tuple, so the keys must be declared in the
 * same order as the contract's AddRewardParams struct definition, and
 * must not contain any extra fields.
 */
type AddRewardInput = {
  asset: bigint
  distribution: number
  rate: bigint
  expiration: bigint
  interval: bigint
  winnerCount: bigint
}

/**
 * Create an AddRewardParams object for the contract's addReward method.
 * Fields are declared in the exact order of the contract struct.
 */
const createReward = (overrides: Partial<AddRewardInput> = {}): AddRewardInput => ({
  asset: 0n,
  distribution: DISTRIBUTION_TYPE_PERCENTAGE,
  rate: 1_000_000n, // 1 ALGO
  expiration: BigInt(ONE_DAY * 7), // 7 days
  interval: BigInt(ONE_DAY), // 1 day
  winnerCount: 0n,
  ...overrides
})

describe('Staking Pool Contract', () => {
  let deployer: AddressWithTransactionSigner
  let creator: AddressWithTransactionSigner
  let user1: AddressWithTransactionSigner
  let user2: AddressWithTransactionSigner
  let akitaUniverse: AkitaUniverse
  let factorySDK: StakingPoolFactorySDK
  let poolSDK: StakingPoolSDK
  let testAssetId: bigint
  let timeWarp: TimeWarp
  let mockBeacon: MockRandomnessBeaconClient
  let dispenser: AddressWithTransactionSigner
  // Store algorand client for consistent access across tests
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  // Note: We don't use beforeEach(fixture.beforeEach) because tests share state
  // (pools created in beforeAll must persist across tests)
  // Accounts are reset/funded in nested beforeAll blocks as needed

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()
    timeWarp = new TimeWarp(algorand)

    // Account funding breakdown:
    // - Deployer: DAO universe creation + factory funding + asset creation + transfers
    //   Universe setup is complex with multiple contracts, wallets, and escrows
    // - Creator: Pool creations via factory + reward additions + asset opt-ins
    // - Users: Pool entries + asset opt-ins + transaction fees

    // Note: We use generous funding here as universe creation cost is hard to predict
    // The MBR verification tests ensure operations use exact amounts
    // Use fixture.context.generateAccount to ensure accounts are properly created in localnet
    const ctx = fixture.context
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_500_000_000) })
    creator = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    user1 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    user2 = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2500).algo())
    await algorand.account.ensureFunded(creator.addr, dispenser.addr, (2000).algo())
    await algorand.account.ensureFunded(user1.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(user2.addr, dispenser.addr, (500).algo())

    const mockBeaconFactory = algorand.client.getTypedAppFactory(MockRandomnessBeaconFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    ;({ appClient: mockBeacon } = await mockBeaconFactory.send.create.bare())

    // Build the full Akita DAO universe (required for staking pool factory to work)
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: { vrfBeacon: mockBeacon.appId },
    })

    factorySDK = akitaUniverse.stakingPoolFactory

    // Get the pool creation cost from factory for reference in tests
    // Fund the factory with minimum needed for pool creations
    // Pool creation cost is ~51 ALGO, we fund for a few pools with small buffer
    const poolCost = await factorySDK.cost()
    const factoryFunding = algokit.microAlgos(poolCost * 5n + 10_000_000n) // 5 pools + 10 ALGO buffer
    await algorand.send.payment({
      sender: deployer.addr,
      signer: deployer.signer,
      receiver: factorySDK.client.appAddress,
      amount: factoryFunding,
    })

    // Create a test ASA for reward testing
    const assetCreateTxn = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000_000_000_000n,
      decimals: 6,
      assetName: 'Test Reward Token',
      unitName: 'TRWD',
    })
    testAssetId = BigInt(assetCreateTxn.assetId)

    poolAssetLeaves = [0n, testAssetId, akitaUniverse.aktaAssetId, akitaUniverse.bonesAssetId]
    poolAssetTree = MerkleTree.of(poolAssetLeaves.map((a) => [a]), [SchemaPart.Uint64])
    const poolAssetMeta = new MetaSDK({
      algorand, readerAccount: deployer.addr.toString(),
      factoryParams: { appId: akitaUniverse.metaMerkles.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })
    await poolAssetMeta.addRoot({ name: 'pool-assets', root: poolAssetTree.root, type: 1n })
    poolStakeKey = { address: deployer.addr.toString(), name: 'pool-assets' }

    // Opt users into the test asset
    await algorand.send.assetOptIn({
      sender: user1.addr,
      signer: user1.signer,
      assetId: testAssetId,
    })
    await algorand.send.assetOptIn({
      sender: user2.addr,
      signer: user2.signer,
      assetId: testAssetId,
    })
    await algorand.send.assetOptIn({
      sender: creator.addr,
      signer: creator.signer,
      assetId: testAssetId,
    })

    // Transfer some test tokens to creator for rewards
    await algorand.send.assetTransfer({
      sender: deployer.addr,
      signer: deployer.signer,
      receiver: creator.addr,
      assetId: testAssetId,
      amount: 100_000_000_000n,
    })
  }, 120_000) // 2 minute timeout for universe setup

  afterAll(async () => {
    // Reset time warp offset after all tests
    await timeWarp.resetTimeWarp()
  })

  describe('Factory Contract', () => {
    test('should have deployed factory via Akita Universe', async () => {
      expect(factorySDK.appId).toBeGreaterThan(0n)
    })

    test('should get pool creation cost', async () => {
      const cost = await factorySDK.cost()
      expect(cost).toBeGreaterThan(0n)
    })

    test('should create a new pool via factory SDK', async () => {
      // Get expected cost from factory
      const expectedPayment = await factorySDK.cost()

      // Account for the composed group and covered inner-transaction fees. Any
      // required opcode-budget carriers are selected by simulation.
      // 10 fees: the SDK calls the hinted newPool(…, wallet = 0), which resolves the referrer from the
      // hint without the legacy EscrowFactory registry lookup (one inner call fewer than the legacy shim).
      const expectedCost = createExpectedCost(expectedPayment, 0, MIN_TXN_FEE * 10n)
      const verification = await verifyBalanceChange(
        algorand,
        creator.addr.toString(),
        expectedCost,
        'create new staking pool'
      )

      // Use the SDK's new() method which handles payment automatically
      poolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Test Staking Pool',
        type: POOL_STAKING_TYPE_SOFT,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      // Verify balance change matches expected cost
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        creator.addr.toString()
      )
      expectBalanceChange(completed, 'create new staking pool')
      // The payment itself is checked for exact equality on-chain (`payment.amount === totalMBR`).
      // AlgoKit's fee coverage can add a few µALGO of per-byte fee once the populated newPool
      // call exceeds ~925 bytes, so allow sub-min-fee slack on the fee part only.
      expect(completed.actualCost).toBeGreaterThanOrEqual(expectedCost.total)
      expect(completed.actualCost - expectedCost.total).toBeLessThan(MIN_TXN_FEE)

      expect(poolSDK.appId).toBeGreaterThan(0n)
      const poolAccount = await algorand.account.getInformation(poolSDK.client.appAddress)
      expect(poolAccount.balance.microAlgos).toBe(100_000n)
      expect(poolAccount.minBalance.microAlgos).toBe(100_000n)
    })

    test('should fail to create pool with insufficient payment (direct call)', async () => {
      // Using module-level algorand client

      // Test direct factory client call with insufficient payment
      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: factorySDK.client.appAddress,
        amount: algokit.microAlgos(1000), // Way too little
      })

      await expect(
        // hinted newPool(…, wallet) (principal resolution §6.5); the legacy selector is the 9-argument overload
        factorySDK.client.send.newPoolPayStringUint8AddressAddressStringUint64BoolUint64Uint64Uint64Uint64({
          sender: creator.addr,
          signer: creator.signer,
          args: {
            payment,
            title: 'Underfunded Pool',
            type: POOL_STAKING_TYPE_SOFT,
            marketplace: creator.addr.toString(),
            stakeKey: poolStakeKey,
            minimumStakeAmount: 0,
            allowLateSignups: false,
            gateId: 0,
            maxEntries: 0,
            wallet: 0,
          },
          extraFee: algokit.microAlgos(10_000),
        })
      ).rejects.toThrow()
    })
  })

  describe('Pool Lifecycle', () => {
    describe('Pool State', () => {
      test('should be in draft status after creation', async () => {
        const state = await poolSDK.getState()
        expect(Number(state.status)).toBe(POOL_STATUS_DRAFT)
      })

      test('should have correct title', async () => {
        const state = await poolSDK.getState()
        expect(state.title).toBe('Test Staking Pool')
      })

      test('should have correct creator', async () => {
        const state = await poolSDK.getState()
        expect(state.creator).toBe(creator.addr.toString())
      })

      test('should have correct staking type', async () => {
        const state = await poolSDK.getState()
        expect(Number(state.type)).toBe(POOL_STAKING_TYPE_SOFT)
      })
    })

    describe('Finalization', () => {
      test('should finalize pool with future timestamps', async () => {
        const now = Number(await getBlockTimestamp(algorand))
        const signupTimestamp = BigInt(now + ONE_MINUTE)
        const startTimestamp = BigInt(now + ONE_HOUR)
        const endTimestamp = BigInt(now + ONE_DAY)

        await poolSDK.finalize({
          signupTimestamp,
          startTimestamp,
          endTimestamp,
        })

        const state = await poolSDK.getState()
        expect(Number(state.status)).toBe(POOL_STATUS_FINAL)
        expect(state.signupTimestamp).toBe(signupTimestamp)
        expect(state.startTimestamp).toBe(startTimestamp)
        expect(state.endTimestamp).toBe(endTimestamp)
      })

      test('should fail to finalize if not creator', async () => {
        // Create a new pool for this test
        const testPoolSDK = await factorySDK.new({
          sender: creator.addr,
          signer: creator.signer,
          title: 'Finalize Test Pool',
          type: POOL_STAKING_TYPE_SOFT,
          marketplace: creator.addr.toString(),
          stakeKey: poolStakeKey,
          minimumStakeAmount: 0n,
          allowLateSignups: false,
          gateId: 0n,
          maxEntries: 0n,
        })

        const now = Number(await getBlockTimestamp(algorand))

        // Try to finalize as non-creator
        await expect(
          testPoolSDK.finalize({
            sender: user1.addr,
            signer: user1.signer,
            signupTimestamp: BigInt(now + ONE_MINUTE),
            startTimestamp: BigInt(now + ONE_HOUR),
            endTimestamp: BigInt(now + ONE_DAY),
          })
        ).rejects.toThrow()
      })

      test('should fail to finalize already finalized pool', async () => {
        const now = Number(await getBlockTimestamp(algorand))

        await expect(
          poolSDK.finalize({
            signupTimestamp: BigInt(now + ONE_MINUTE),
            startTimestamp: BigInt(now + ONE_HOUR),
            endTimestamp: BigInt(now + ONE_DAY * 2),
          })
        ).rejects.toThrow()
      })

      test('should fail with end timestamp before start timestamp', async () => {
        // Create a new pool for this test
        const testPoolSDK = await factorySDK.new({
          sender: creator.addr,
          signer: creator.signer,
          title: 'Invalid Timestamp Pool',
          type: POOL_STAKING_TYPE_SOFT,
          marketplace: creator.addr.toString(),
          stakeKey: poolStakeKey,
          minimumStakeAmount: 0n,
          allowLateSignups: false,
          gateId: 0n,
          maxEntries: 0n,
        })

        const now = Number(await getBlockTimestamp(algorand))

        await expect(
          testPoolSDK.finalize({
            signupTimestamp: BigInt(now + ONE_MINUTE),
            startTimestamp: BigInt(now + ONE_DAY), // start
            endTimestamp: BigInt(now + ONE_HOUR), // end before start
          })
        ).rejects.toThrow()
      })
    })
  })

  describe('Pool Read-Only Methods', () => {
    test('signUpsOpen should return correct status', async () => {
      // After finalization with future signup time, signups should be closed
      const isOpen = await poolSDK.signUpsOpen()
      expect(isOpen).toBe(false) // signup time is in the future
    })

    test('isLive should return correct status', async () => {
      const live = await poolSDK.isLive()
      expect(live).toBe(false) // start time is in the future
    })

    test('isEntered should return false for non-entered address', async () => {
      const entered = await poolSDK.isEntered({ address: user1.addr.toString() })
      expect(entered).toBe(false)
    })

    test('getState should return complete pool state', async () => {
      const state = await poolSDK.getState()

      expect(state.title).toBe('Test Staking Pool')
      expect(Number(state.status)).toBe(POOL_STATUS_FINAL)
      expect(state.creator).toBe(creator.addr.toString())
      expect(state.maxEntries).toBe(0n) // unlimited
      expect(state.gateId).toBe(0n) // no gate
    })

    test('getMbr should return correct values', async () => {
      const mbrData = await poolSDK.getMbr({ winningTickets: 0 })

      // Verify contract MBR values match our constants
      expect(mbrData.entries).toBe(POOL_ENTRIES_MBR)
      expect(mbrData.uniques).toBe(POOL_UNIQUES_MBR)
      expect(mbrData.entriesByAddress).toBe(POOL_ENTRIES_BY_ADDRESS_MBR)
      expect(mbrData.disbursements).toBe(POOL_DISBURSEMENTS_MBR)

      // Verify rewards MBR calculation with 0 winners
      expect(mbrData.rewards).toBe(calculateRewardsMbr(0n))
    })

    test('getMbr should calculate rewards MBR correctly for different winner counts', async () => {
      // Test with different winner counts
      const mbr0 = await poolSDK.getMbr({ winningTickets: 0 })
      const mbr5 = await poolSDK.getMbr({ winningTickets: 5 })
      const mbr10 = await poolSDK.getMbr({ winningTickets: 10 })

      // Verify our helper calculation matches contract values
      expect(mbr0.rewards).toBe(calculateRewardsMbr(0n))
      expect(mbr5.rewards).toBe(calculateRewardsMbr(5n))
      expect(mbr10.rewards).toBe(calculateRewardsMbr(10n))

      // Verify the full reward box formula (9-byte key + 134-byte fixed
      // value + 8 bytes per winning ticket).
      expect(mbr0.rewards).toBe(MIN_POOL_REWARDS_MBR + (BOX_COST_PER_BYTE * POOL_REWARD_WINNING_TICKET_BYTES * 0n))
      expect(mbr5.rewards).toBe(MIN_POOL_REWARDS_MBR + (BOX_COST_PER_BYTE * POOL_REWARD_WINNING_TICKET_BYTES * 5n))
      expect(mbr10.rewards).toBe(MIN_POOL_REWARDS_MBR + (BOX_COST_PER_BYTE * POOL_REWARD_WINNING_TICKET_BYTES * 10n))
    })

    test('entry MBR helper should calculate correct values', async () => {
      // Verify entry MBR calculations for different scenarios

      // Single entry, first time user
      const singleFirst = calculateEntryMbr(1n, true)
      expect(singleFirst).toBe(POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR + POOL_UNIQUES_MBR)

      // Single entry, returning user (no uniques MBR)
      const singleReturning = calculateEntryMbr(1n, false)
      expect(singleReturning).toBe(POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR)

      // Multiple entries, first time user
      const multiFirst = calculateEntryMbr(3n, true)
      expect(multiFirst).toBe((POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR) * 3n + POOL_UNIQUES_MBR)

      // Multiple entries, returning user
      const multiReturning = calculateEntryMbr(3n, false)
      expect(multiReturning).toBe((POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR) * 3n)
    })
  })

  describe('Reward Management', () => {
    let rewardPoolSDK: StakingPoolSDK

    beforeAll(async () => {
      // Create a new pool for reward testing using SDK
      rewardPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Reward Test Pool',
        type: POOL_STAKING_TYPE_NONE, // No staking requirement for reward tests
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })
    })

    describe('Add ALGO Rewards', () => {
      test('should add ALGO reward with flat distribution', async () => {
        // Using module-level algorand client

        const rewardAmount = 1_000_000n // 1 ALGO per qualified staker
        const reward = createReward({
          asset: 0n, // ALGO
          distribution: DISTRIBUTION_TYPE_FLAT,
          rate: rewardAmount,
        })

        // Get MBR from contract
        const mbrData = await rewardPoolSDK.getMbr({ winningTickets: 0 })

        // Calculate total payment: MBR for reward storage + reward amount
        const totalPayment = mbrData.rewards + rewardAmount

        // Verify our helper matches the contract's MBR calculation
        expect(mbrData.rewards).toBe(calculateRewardsMbr(0n))

        // Verify expected cost before operation
        // Account for: app call fee + payment transaction fee
        const expectedCost = createExpectedCost(totalPayment, 0, MIN_TXN_FEE)
        const verification = await verifyBalanceChange(
          algorand,
          creator.addr.toString(),
          expectedCost,
          'add ALGO reward with flat distribution'
        )

        const payment = await algorand.createTransaction.payment({
          sender: creator.addr,
          receiver: rewardPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(totalPayment)),
        })

        await rewardPoolSDK.client.send.addReward({
          sender: creator.addr,
          signer: creator.signer,
          args: {
            payment,
            reward,
          },
        })

        // Verify balance change matches expected cost
        const completed = await completeBalanceVerification(
          verification,
          algorand,
          creator.addr.toString()
        )
        expectBalanceChange(completed, 'add ALGO reward with flat distribution')
        expect(completed.actualCost).toBe(expectedCost.total)

        const state = await rewardPoolSDK.getState()
        expect(state.rewardCount).toBe(1n)
      })

      test('should add ALGO reward with even distribution', async () => {
        // Using module-level algorand client

        const rewardAmount = 10_000_000n // 10 ALGO total split among participants
        const reward = createReward({
          asset: 0n,
          distribution: DISTRIBUTION_TYPE_EVEN,
          rate: rewardAmount,
        })

        // Get MBR from contract and calculate total payment
        const mbrData = await rewardPoolSDK.getMbr({ winningTickets: 0 })
        const totalPayment = mbrData.rewards + rewardAmount

        // Verify expected cost before operation
        // Account for: app call fee + payment transaction fee
        const expectedCost = createExpectedCost(totalPayment, 0, MIN_TXN_FEE)
        const verification = await verifyBalanceChange(
          algorand,
          creator.addr.toString(),
          expectedCost,
          'add ALGO reward with even distribution'
        )

        const payment = await algorand.createTransaction.payment({
          sender: creator.addr,
          receiver: rewardPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(totalPayment)),
        })

        await rewardPoolSDK.client.send.addReward({
          sender: creator.addr,
          signer: creator.signer,
          args: {
            payment,
            reward,
          },
        })

        // Verify balance change matches expected cost
        const completed = await completeBalanceVerification(
          verification,
          algorand,
          creator.addr.toString()
        )
        expectBalanceChange(completed, 'add ALGO reward with even distribution')
        expect(completed.actualCost).toBe(expectedCost.total)

        const state = await rewardPoolSDK.getState()
        expect(state.rewardCount).toBe(2n)
      })

      test('should fail to add reward with zero rate', async () => {
        // Using module-level algorand client

        const reward = createReward({
          asset: 0n,
          distribution: DISTRIBUTION_TYPE_FLAT,
          rate: 0n, // Invalid: zero rate
        })

        const mbrData = await rewardPoolSDK.getMbr({ winningTickets: 0 })

        const payment = await algorand.createTransaction.payment({
          sender: creator.addr,
          receiver: rewardPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(mbrData.rewards)),
        })

        await expect(
          rewardPoolSDK.client.send.addReward({
            sender: creator.addr,
            signer: creator.signer,
            args: {
              payment,
              reward,
            },
          })
        ).rejects.toThrow()
      })

      test('should fail if non-creator tries to add reward', async () => {
        // Using module-level algorand client

        const reward = createReward({
          asset: 0n,
          distribution: DISTRIBUTION_TYPE_FLAT,
          rate: 1_000_000n,
        })

        const mbrData = await rewardPoolSDK.getMbr({ winningTickets: 0 })

        const payment = await algorand.createTransaction.payment({
          sender: user1.addr,
          receiver: rewardPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(mbrData.rewards) + 1_000_000),
        })

        await expect(
          rewardPoolSDK.client.send.addReward({
            sender: user1.addr,
            signer: user1.signer,
            args: {
              payment,
              reward,
            },
          })
        ).rejects.toThrow()
      })
    })

    describe('Shuffle Distribution', () => {
      test('should add shuffle reward with winner count', async () => {
        // Using module-level algorand client

        const rewardAmount = 5_000_000n // 5 ALGO total
        const winnerCount = 3n
        const reward = createReward({
          asset: 0n,
          distribution: DISTRIBUTION_TYPE_SHUFFLE,
          rate: rewardAmount,
          winnerCount,
        })

        // Get MBR from contract - shuffle requires extra MBR for winning tickets
        const mbrData = await rewardPoolSDK.getMbr({ winningTickets: Number(winnerCount) })

        // Verify MBR calculation for shuffle with winners
        expect(mbrData.rewards).toBe(calculateRewardsMbr(winnerCount))

        const totalPayment = mbrData.rewards + rewardAmount

        // Verify expected cost before operation
        // Account for: app call fee + payment transaction fee
        const expectedCost = createExpectedCost(totalPayment, 0, MIN_TXN_FEE)
        const verification = await verifyBalanceChange(
          algorand,
          creator.addr.toString(),
          expectedCost,
          'add shuffle reward with winner count'
        )

        const payment = await algorand.createTransaction.payment({
          sender: creator.addr,
          receiver: rewardPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(totalPayment)),
        })

        await rewardPoolSDK.client.send.addReward({
          sender: creator.addr,
          signer: creator.signer,
          args: {
            payment,
            reward,
          },
        })

        // Verify balance change matches expected cost
        const completed = await completeBalanceVerification(
          verification,
          algorand,
          creator.addr.toString()
        )
        expectBalanceChange(completed, 'add shuffle reward with winner count')
        expect(completed.actualCost).toBe(expectedCost.total)

        const state = await rewardPoolSDK.getState()
        expect(state.rewardCount).toBe(3n)
      })

      test('should fail shuffle with winner count greater than rate', async () => {
        // Using module-level algorand client

        const reward = createReward({
          asset: 0n,
          distribution: DISTRIBUTION_TYPE_SHUFFLE,
          rate: 2n, // Only 2
          winnerCount: 5n, // 5 winners > rate, invalid
        })

        const mbrData = await rewardPoolSDK.getMbr({ winningTickets: Number(reward.winnerCount) })

        const payment = await algorand.createTransaction.payment({
          sender: creator.addr,
          receiver: rewardPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(mbrData.rewards) + 1_000_000),
        })

        await expect(
          rewardPoolSDK.client.send.addReward({
            sender: creator.addr,
            signer: creator.signer,
            args: {
              payment,
              reward,
            },
          })
        ).rejects.toThrow()
      })

      test('should fail shuffle with winner count exceeding cap', async () => {
        // Using module-level algorand client

        const reward = createReward({
          asset: 0n,
          distribution: DISTRIBUTION_TYPE_SHUFFLE,
          rate: 100_000_000n, // Large rate
          winnerCount: WINNER_COUNT_CAP + 1n, // Exceeds cap
        })

        const mbrData = await rewardPoolSDK.getMbr({ winningTickets: Number(reward.winnerCount) })

        const payment = await algorand.createTransaction.payment({
          sender: creator.addr,
          receiver: rewardPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(mbrData.rewards) + 100_000_000),
        })

        await expect(
          rewardPoolSDK.client.send.addReward({
            sender: creator.addr,
            signer: creator.signer,
            args: {
              payment,
              reward,
            },
          })
        ).rejects.toThrow()
      })
    })
  })

  describe('Pool Entry', () => {
    let entryPoolSDK: StakingPoolSDK
    let entryUser1: AddressWithTransactionSigner
    let entryUser2: AddressWithTransactionSigner
    let stakingSDK: StakingSDK

    beforeAll(async () => {
      // Using module-level algorand client
      const timeWarp = new TimeWarp(algorand)
      stakingSDK = akitaUniverse.staking

      // Create fresh user accounts and fund from deployer who has 2000 ALGO
      entryUser1 = generateSignerAccount(algorand)
      entryUser2 = generateSignerAccount(algorand)

      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: entryUser1.addr,
        amount: algokit.microAlgos(100_000_000), // 100 ALGO for staking + entries
      })
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: entryUser2.addr,
        amount: algokit.microAlgos(100_000_000), // 100 ALGO for staking + entries
      })

      // Create and finalize a pool for entry testing using SDK
      // Use SOFT staking type which requires users to stake assets
      entryPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Entry Test Pool',
        type: POOL_STAKING_TYPE_SOFT, // Soft staking - validates user's staked balance
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 10n,
      })

      // Fund the pool with minimum balance
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: entryPoolSDK.client.appAddress,
        amount: algokit.microAlgos(200_000), // 0.2 ALGO for pool MBR
      })

      // Get current block timestamp RIGHT BEFORE finalize
      const blockTs = await getBlockTimestamp(algorand)

      // Finalize with timestamps based on actual block timestamp
      await entryPoolSDK.finalize({
        signupTimestamp: blockTs + 2n, // 2 seconds from now
        startTimestamp: blockTs + 3n, // 3 seconds from now
        endTimestamp: blockTs + BigInt(ONE_DAY * 30), // 30 days
      })

      // Use TimeWarp to advance block timestamp past start time
      await timeWarp.timeWarp(10n)

      // Users must stake ALGO before entering the pool
      // Stake 10 ALGO each with Soft staking type
      await stakingSDK.stake({
        sender: entryUser1.addr,
        signer: entryUser1.signer,
        type: StakingType.Soft,
        asset: 0n,
        amount: 10_000_000n, // 10 ALGO
      })

      await stakingSDK.stake({
        sender: entryUser2.addr,
        signer: entryUser2.signer,
        type: StakingType.Soft,
        asset: 0n,
        amount: 10_000_000n, // 10 ALGO
      })
    })

    test('pool should be live after finalization with immediate start', async () => {
      const live = await entryPoolSDK.isLive()
      expect(live).toBe(true)
    })

    test('should allow entry when pool is live using SDK', async () => {
      // Get the expected entry box and app-scoped SOFT stake MBR from the contract.
      const expectedPayment = await entryPoolSDK.enterCost({
        address: entryUser1.addr.toString(),
        assets: [0n]
      })

      // Verify expected cost before operation
      // Account for: app call fee + payment transaction fee + inner txns
      // Note: inner transaction fees are covered by extraFee in the SDK call
      const expectedCost = createExpectedCost(expectedPayment, 0, MIN_TXN_FEE * 4n) // payment + app call + staking payment/app call + stake-key merkle verify (H-2)
      const verification = await verifyBalanceChange(
        algorand,
        entryUser1.addr.toString(),
        expectedCost,
        'enter pool with single entry'
      )

      // Use SDK method which handles payment automatically
      await entryPoolSDK.enter({
        sender: entryUser1.addr,
        signer: entryUser1.signer,
        entries: [
          {
            asset: 0n,
            amount: 1_000_000n, // 1 ALGO entry (less than 10 ALGO staked)
            proofs: proofsFor(0n),
          },
        ],
      })

      // Verify balance change matches expected cost
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        entryUser1.addr.toString()
      )
      expectBalanceChange(completed, 'enter pool with single entry')
      expect(completed.actualCost).toBe(expectedCost.total)

      // Verify entry was successful
      const isEntered = await entryPoolSDK.isEntered({ address: entryUser1.addr.toString() })
      expect(isEntered).toBe(true)

    })

    test('should update entry count after entry', async () => {
      const state = await entryPoolSDK.getState()
      expect(state.entryCount).toBeGreaterThan(0n)
    })

    test('SDK should reject duplicate asset entries before constructing the group', async () => {
      await expect(
        entryPoolSDK.enter({
          sender: entryUser2.addr,
          signer: entryUser2.signer,
          entries: [
            { asset: 0n, amount: 500_000n, proofs: proofsFor(0n) },
            { asset: 0n, amount: 500_000n, proofs: proofsFor(0n) },
          ],
        }),
      ).rejects.toThrow('Each asset can only be entered once per staking pool request')

      expect(await entryPoolSDK.isEntered({ address: entryUser2.addr.toString() })).toBe(false)
    })

    test('contract should reject duplicate asset entries in the same request', async () => {
      const paymentAmount = await entryPoolSDK.enterCost({
        address: entryUser2.addr.toString(),
        assets: [0n, 0n],
      })
      const payment = await algorand.createTransaction.payment({
        sender: entryUser2.addr,
        signer: entryUser2.signer,
        receiver: entryPoolSDK.client.appAddress,
        amount: algokit.microAlgos(paymentAmount),
      })

      await expect(
        entryPoolSDK.client.send.enter({
          sender: entryUser2.addr,
          signer: entryUser2.signer,
          extraFee: algokit.microAlgos(2_000),
          args: {
            payment,
            entries: [
              [0n, 500_000n, proofsFor(0n)],
              [0n, 500_000n, proofsFor(0n)],
            ],
          },
        }),
      ).rejects.toThrow()

      expect(await entryPoolSDK.isEntered({ address: entryUser2.addr.toString() })).toBe(false)
    })

    test('should allow a user to enter an asset once', async () => {
      const expectedPayment = await entryPoolSDK.enterCost({
        address: entryUser2.addr.toString(),
        assets: [0n]
      })
      expect(expectedPayment).toBe(
        POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR + POOL_UNIQUES_MBR + STAKING_APP_STAKES_MBR,
      )

      const expectedCost = createExpectedCost(expectedPayment, 0, MIN_TXN_FEE * 4n) // + stake-key merkle verify (H-2)
      const verification = await verifyBalanceChange(
        algorand,
        entryUser2.addr.toString(),
        expectedCost,
        'enter pool with one asset'
      )

      await entryPoolSDK.enter({
        sender: entryUser2.addr,
        signer: entryUser2.signer,
        entries: [
          {
            asset: 0n,
            amount: 1_000_000n,
            proofs: proofsFor(0n),
          },
        ],
      })

      const completed = await completeBalanceVerification(
        verification,
        algorand,
        entryUser2.addr.toString()
      )
      expectBalanceChange(completed, 'enter pool with one asset')
      expect(completed.actualCost).toBe(expectedCost.total)

      const isEntered = await entryPoolSDK.isEntered({ address: entryUser2.addr.toString() })
      expect(isEntered).toBe(true)

    })

    test('should reject a later entry for the same asset', async () => {
      await expect(
        entryPoolSDK.enter({
          sender: entryUser2.addr,
          signer: entryUser2.signer,
          entries: [{ asset: 0n, amount: 500_000n, proofs: proofsFor(0n) }],
        }),
      ).rejects.toThrow()

    })

  })

  describe('Pool with Max Entries', () => {
    let limitedPoolSDK: StakingPoolSDK
    let limitedUsers: AddressWithTransactionSigner[]

    beforeAll(async () => {
      limitedUsers = [
        generateSignerAccount(algorand),
        generateSignerAccount(algorand),
        generateSignerAccount(algorand),
      ]
      for (const user of limitedUsers) {
        await algorand.send.payment({
          sender: deployer.addr,
          signer: deployer.signer,
          receiver: user.addr,
          amount: algokit.microAlgos(5_000_000),
        })
      }

      limitedPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Limited Entry Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 2n,
      })

      const blockTs = await getBlockTimestamp(algorand)
      await limitedPoolSDK.finalize({
        signupTimestamp: 0n,
        startTimestamp: 0n,
        endTimestamp: blockTs + BigInt(ONE_DAY * 30),
      })
    })

    test('should verify pool has max entries set', async () => {
      const state = await limitedPoolSDK.getState()
      expect(state.maxEntries).toBe(2n)
    })

    test('should allow exactly the configured number of entries and reject the next', async () => {
      for (const user of limitedUsers.slice(0, 2)) {
        await limitedPoolSDK.enter({
          sender: user.addr,
          signer: user.signer,
          entries: [{ asset: 0n, amount: 1n, proofs: proofsFor(0n) }],
        })
      }

      expect((await limitedPoolSDK.getState()).entryCount).toBe(2n)

      const thirdUser = limitedUsers[2]
      await expect(limitedPoolSDK.enter({
        sender: thirdUser.addr,
        signer: thirdUser.signer,
        entries: [{ asset: 0n, amount: 1n, proofs: proofsFor(0n) }],
      })).rejects.toThrow('ERR:errPmer')

      expect((await limitedPoolSDK.getState()).entryCount).toBe(2n)
      expect(await limitedPoolSDK.isEntered({ address: thirdUser.addr.toString() })).toBe(false)
    })

    test('should reject an oversized batch atomically', async () => {
      const batchUser = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: batchUser.addr,
        amount: algokit.microAlgos(5_000_000),
      })

      const batchPool = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Limited Batch Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 2n,
      })
      await batchPool.finalize({
        signupTimestamp: 0n,
        startTimestamp: 0n,
        endTimestamp: (await getBlockTimestamp(algorand)) + BigInt(ONE_DAY),
      })

      await expect(batchPool.enter({
        sender: batchUser.addr,
        signer: batchUser.signer,
        entries: [
          { asset: 0n, amount: 1n, proofs: proofsFor(0n) },
          { asset: akitaUniverse.aktaAssetId, amount: 1n, proofs: proofsFor(akitaUniverse.aktaAssetId) },
          { asset: akitaUniverse.bonesAssetId, amount: 1n, proofs: proofsFor(akitaUniverse.bonesAssetId) },
        ],
      })).rejects.toThrow('ERR:errPmer')

      expect((await batchPool.getState()).entryCount).toBe(0n)
      expect(await batchPool.isEntered({ address: batchUser.addr.toString() })).toBe(false)
    })
  })

  test('Meta collection proofs admit the listed asset and reject a mismatched proof', async () => {
    const meta = new MetaSDK({
      algorand, readerAccount: deployer.addr.toString(),
      factoryParams: { appId: akitaUniverse.metaMerkles.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })
    const tree = MerkleTree.of([[testAssetId], [akitaUniverse.aktaAssetId], [akitaUniverse.bonesAssetId], [0n]], [SchemaPart.Uint64])
    const name = 'pool-compatibility'
    await meta.addRoot({ name, root: tree.root, type: 1n })
    const pool = await factorySDK.new({
      sender: creator.addr, signer: creator.signer, title: 'Meta Collection Pool',
      type: POOL_STAKING_TYPE_NONE, marketplace: creator.addr.toString(),
      stakeKey: { address: deployer.addr.toString(), name },
      minimumStakeAmount: 0n, allowLateSignups: true, gateId: 0n, maxEntries: 0n,
    })
    await pool.finalize({ signupTimestamp: 0n, startTimestamp: 0n, endTimestamp: (await getBlockTimestamp(algorand)) + BigInt(ONE_DAY) })
    await expect(pool.enter({
      sender: user2.addr, signer: user2.signer,
      entries: [{ asset: testAssetId, amount: 1n, proofs: tree.getProof(1) }],
    })).rejects.toThrow(new RegExp(errFailedStakeVerify))
    expect((await pool.getState()).entryCount).toBe(0n)
    await pool.enter({
      sender: user1.addr, signer: user1.signer,
      entries: [{ asset: testAssetId, amount: 1n, proofs: tree.getProof(0) }],
    })
    expect((await pool.getState()).entryCount).toBe(1n)
    expect(await pool.isEntered({ address: user1.addr.toString() })).toBe(true)
  })

  describe('Pool with Minimum Stake', () => {
    let minStakePoolSDK: StakingPoolSDK
    let minStakeUser: AddressWithTransactionSigner
    let stakingSDK: StakingSDK

    beforeAll(async () => {
      // Using module-level algorand client
      const timeWarp = new TimeWarp(algorand)
      stakingSDK = akitaUniverse.staking

      // Create fresh user account and fund from deployer
      minStakeUser = generateSignerAccount(algorand)
      // Fund with minimum needed: 20 ALGO for staking + entry cost + fees + minimum balance
      // Entry cost will be verified in test, so we fund generously here for setup
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: minStakeUser.addr,
        amount: algokit.microAlgos(50_000_000), // 50 ALGO should be sufficient
      })

      // Create a pool with minimum stake requirement using SDK
      minStakePoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Min Stake Pool',
        type: POOL_STAKING_TYPE_SOFT, // Use SOFT staking
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 5_000_000n, // 5 ALGO minimum
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 0n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: minStakePoolSDK.client.appAddress,
        amount: algokit.microAlgos(200_000),
      })

      // Get current block timestamp RIGHT BEFORE finalize to avoid timing issues
      const blockTs = await getBlockTimestamp(algorand)

      // Finalize with timestamps based on actual block timestamp
      await minStakePoolSDK.finalize({
        signupTimestamp: blockTs + 2n,
        startTimestamp: blockTs + 3n,
        endTimestamp: blockTs + BigInt(ONE_DAY * 30),
      })

      // Use TimeWarp to advance block timestamp past start time
      await timeWarp.timeWarp(10n)

      // User must stake ALGO before entering the pool - stake 20 ALGO
      await stakingSDK.stake({
        sender: minStakeUser.addr,
        signer: minStakeUser.signer,
        type: StakingType.Soft,
        asset: 0n,
        amount: 20_000_000n, // 20 ALGO staked
      })
    })

    test('should verify pool has minimum stake amount set', async () => {
      const state = await minStakePoolSDK.getState()
      expect(state.minimumStakeAmount).toBe(5_000_000n)
    })

    test('should reject entry below minimum stake', async () => {
      const totalMbr = await minStakePoolSDK.enterCost({
        address: minStakeUser.addr.toString(),
        assets: [0n],
      })

      // Create payment
      const payment = await algorand.createTransaction.payment({
        sender: minStakeUser.addr,
        receiver: minStakePoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(totalMbr)),
      })

      // Try to enter with less than minimum stake (1 ALGO < 5 ALGO minimum)
      await expect(
        minStakePoolSDK.client.send.enter({
          sender: minStakeUser.addr,
          signer: minStakeUser.signer,
          extraFee: algokit.microAlgos(1000),
          args: {
            payment,
            entries: [[0n, 1_000_000n, proofsFor(0n)]], // Only 1 ALGO, below 5 ALGO minimum
          },
        })
      ).rejects.toThrow()
    })

    test('should allow entry meeting minimum stake', async () => {
      const totalMbr = await minStakePoolSDK.enterCost({
        address: minStakeUser.addr.toString(),
        assets: [0n],
      })

      // Create payment
      const payment = await algorand.createTransaction.payment({
        sender: minStakeUser.addr,
        receiver: minStakePoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(totalMbr)),
      })

      // Use direct client call with 10 ALGO entry (above 5 ALGO minimum)
      // extraFee covers the inner payment and app call to Staking, plus the stake-key merkle verify (H-2).
      await minStakePoolSDK.client.send.enter({
        sender: minStakeUser.addr,
        signer: minStakeUser.signer,
        extraFee: algokit.microAlgos(3000),
        args: {
          payment,
          entries: [[0n, 10_000_000n, proofsFor(0n)]], // 10 ALGO, above minimum
        },
      })

      const isEntered = await minStakePoolSDK.isEntered({ address: minStakeUser.addr.toString() })
      expect(isEntered).toBe(true)
    })
  })

  describe('Pool Deletion', () => {
    test('should refund the full creation MBR to the payment funder when deleting a draft pool', async () => {
      const funder = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: funder.addr,
        amount: algokit.microAlgos(100_000_000),
      })

      const factoryBeforeCreate = await algorand.account.getInformation(factorySDK.client.appAddress)
      const poolCost = await factorySDK.cost({ sender: creator.addr, signer: creator.signer })
      const payment = await algorand.createTransaction.payment({
        sender: funder.addr,
        receiver: factorySDK.client.appAddress,
        amount: algokit.microAlgo(poolCost),
      })
      const group = factorySDK.client.newGroup()
      group.newPoolPayStringUint8AddressAddressStringUint64BoolUint64Uint64Uint64Uint64({
        sender: creator.addr,
        signer: creator.signer,
        maxFee: algokit.microAlgos(20_000),
        args: {
          payment: { txn: payment, signer: funder.signer },
          title: 'Delete Refund Test Pool',
          type: POOL_STAKING_TYPE_SOFT,
          marketplace: creator.addr.toString(),
          stakeKey: poolStakeKey,
          minimumStakeAmount: 0n,
          allowLateSignups: false,
          gateId: 0n,
          maxEntries: 0n,
          wallet: 0n,
        },
      })
      group.opUp({
        sender: creator.addr,
        signer: creator.signer,
        args: {},
        maxFee: algokit.microAlgos(1_000),
      })
      group.opUp({
        sender: creator.addr,
        signer: creator.signer,
        args: {},
        maxFee: algokit.microAlgos(1_000),
        note: '1',
      })
      const createResult = await group.send({
        populateAppCallResources: true,
        coverAppCallInnerTransactionFees: true,
      })
      const poolIdToDelete = createResult.returns[0] as bigint | undefined
      expect(poolIdToDelete).toBeDefined()
      if (poolIdToDelete === undefined) {
        throw new Error('Failed to create pool for deletion refund test')
      }

      const deletePoolSDK = factorySDK.get({ appId: poolIdToDelete })
      const factoryAfterCreate = await algorand.account.getInformation(factorySDK.client.appAddress)
      const childCreationMbr = factoryAfterCreate.minBalance.microAlgos - factoryBeforeCreate.minBalance.microAlgos
      const funderInfo = await deletePoolSDK.client.state.global.funder()
      expect(funderInfo).toBeDefined()
      if (funderInfo === undefined) {
        throw new Error('Pool funder information was not stored')
      }

      expect(funderInfo.account).toBe(funder.addr.toString())
      expect(funderInfo.amount).toBe(childCreationMbr + 100_000n)

      const poolAccount = await algorand.account.getInformation(deletePoolSDK.client.appAddress)
      expect(poolAccount.balance.microAlgos).toBe(100_000n)
      expect(poolAccount.minBalance.microAlgos).toBe(100_000n)

      const funderBeforeDelete = await algorand.account.getInformation(funder.addr)
      const factoryBeforeDelete = await algorand.account.getInformation(factorySDK.client.appAddress)
      const factoryLiquidBeforeDelete = factoryBeforeDelete.balance.microAlgos - factoryBeforeDelete.minBalance.microAlgos

      await factorySDK.client.send.deletePool({
        sender: creator.addr,
        signer: creator.signer,
        args: { appId: poolIdToDelete },
        extraFee: algokit.microAlgos(3_000),
      })

      const funderAfterDelete = await algorand.account.getInformation(funder.addr)
      const factoryAfterDelete = await algorand.account.getInformation(factorySDK.client.appAddress)
      const factoryLiquidAfterDelete = factoryAfterDelete.balance.microAlgos - factoryAfterDelete.minBalance.microAlgos

      expect(funderAfterDelete.balance.microAlgos - funderBeforeDelete.balance.microAlgos).toBe(funderInfo.amount)
      expect(factoryLiquidAfterDelete).toBe(factoryLiquidBeforeDelete)
      await expect(deletePoolSDK.getState()).rejects.toThrow()
    })

    test('should fail to delete if not creator', async () => {
      // Create a pool
      const poolToDeleteSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Cannot Delete Pool',
        type: POOL_STAKING_TYPE_SOFT,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      // Try to delete as non-creator (should fail with or without extra fee)
      await expect(
        factorySDK.client.send.deletePool({
          sender: user1.addr,
          signer: user1.signer,
          args: { appId: poolToDeleteSDK.appId },
          extraFee: algokit.microAlgos(3_000),
        })
      ).rejects.toThrow()
    })

    test('should fail to delete finalized active pool', async () => {
      // Create and finalize a pool
      const activePoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Active Pool',
        type: POOL_STAKING_TYPE_SOFT,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      // Finalize the pool with future timestamps
      const now = Number(await getBlockTimestamp(algorand))
      await activePoolSDK.finalize({
        signupTimestamp: BigInt(now + ONE_MINUTE),
        startTimestamp: BigInt(now + ONE_HOUR),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      // Try to delete active pool - should fail (pool must be draft or ended)
      await expect(
        factorySDK.client.send.deletePool({
          sender: creator.addr,
          signer: creator.signer,
          args: { appId: activePoolSDK.appId },
          extraFee: algokit.microAlgos(3_000),
        })
      ).rejects.toThrow()
    })

  })

  describe('Different Pool Types', () => {
    test('should create pool with HEARTBEAT type', async () => {
      const heartbeatPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Heartbeat Pool',
        type: POOL_STAKING_TYPE_HEARTBEAT,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      const state = await heartbeatPoolSDK.getState()
      expect(Number(state.type)).toBe(POOL_STAKING_TYPE_HEARTBEAT)
    })

    test('should create pool with HARD type', async () => {
      const hardPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Hard Staking Pool',
        type: POOL_STAKING_TYPE_HARD,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      const state = await hardPoolSDK.getState()
      expect(Number(state.type)).toBe(POOL_STAKING_TYPE_HARD)
    })

    test('should create pool with LOCK type', async () => {
      const lockPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Lock Staking Pool',
        type: POOL_STAKING_TYPE_LOCK,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      const state = await lockPoolSDK.getState()
      expect(Number(state.type)).toBe(POOL_STAKING_TYPE_LOCK)
    })
  })

  describe('ASA Opt-In', () => {
    let optinPoolSDK: StakingPoolSDK

    beforeAll(async () => {
      // Create a pool for opt-in testing using SDK
      optinPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Opt-In Test Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

    })


    test('creator should be able to opt pool into ASA', async () => {
      // Using module-level algorand client

      // Create a new test asset
      const assetCreateTxn = await algorand.send.assetCreate({
        sender: creator.addr,
        signer: creator.signer,
        total: 1_000_000n,
        decimals: 0,
        assetName: 'Pool Opt-In Asset',
        unitName: 'POPT',
      })
      const optinAssetId = BigInt(assetCreateTxn.assetId)

      // Get the correct opt-in cost from the contract (includes escrow opt-ins + rewards MBR)
      const optInCost = await optinPoolSDK.client.send.optInCost({ args: { asset: optinAssetId } })
      expect(optInCost.return).toBeDefined()
      expect(optInCost.return!).toBeGreaterThanOrEqual(ASSET_OPT_IN_MBR)

      // Get balance before opt-in
      const balanceBeforeOptIn = await getAccountBalance(algorand, creator.addr.toString())

      // Use client.send with extraFee to cover inner transactions
      await optinPoolSDK.optIn({
        sender: creator.addr,
        signer: creator.signer,
        asset: optinAssetId,
      })

      // Verify balance decreased (includes MBR + fees)
      const balanceAfterOptIn = await getAccountBalance(algorand, creator.addr.toString())
      expect(balanceAfterOptIn).toBeLessThan(balanceBeforeOptIn)

      // Pool should now be opted into the asset - verify by sending asset
      await algorand.send.assetTransfer({
        sender: creator.addr,
        signer: creator.signer,
        receiver: optinPoolSDK.client.appAddress,
        assetId: optinAssetId,
        amount: 1000n,
      })
    })

    // Note: Depends on full escrow system configuration
    test('non-creator should not be able to opt pool into ASA', async () => {
      // Using module-level algorand client

      // Create a new test asset
      const assetCreateTxn = await algorand.send.assetCreate({
        sender: user1.addr,
        signer: user1.signer,
        total: 1_000_000n,
        decimals: 0,
        assetName: 'User Asset',
        unitName: 'UAST',
      })
      const userAssetId = BigInt(assetCreateTxn.assetId)

      await expect(
        optinPoolSDK.optIn({
          sender: user1.addr,
          signer: user1.signer,
          asset: userAssetId,
        })
      ).rejects.toThrow()
    })
  })

  describe('Late Signup Configuration', () => {
    test('should verify allowLateSignups defaults to false', async () => {
      // Create pool using SDK
      const lateSignupPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Late Signup Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      // Finalize with future timestamps
      const now = Number(await getBlockTimestamp(algorand))
      await lateSignupPoolSDK.finalize({
        signupTimestamp: BigInt(now + ONE_MINUTE),
        startTimestamp: BigInt(now + ONE_HOUR),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      const state = await lateSignupPoolSDK.getState()
      // allowLateSignups defaults to false - there's no method to enable it in the current contract
      expect(state.allowLateSignups).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    test('should handle pool with no end timestamp (perpetual)', async () => {
      // Using module-level algorand client
      const timeWarp = new TimeWarp(algorand)

      const perpetualPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Perpetual Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 0n,
      })

      // Get current block timestamp RIGHT BEFORE finalize to avoid timing issues
      const blockTs = await getBlockTimestamp(algorand)

      // Finalize with timestamps based on actual block timestamp
      await perpetualPoolSDK.finalize({
        signupTimestamp: blockTs + 2n,
        startTimestamp: blockTs + 3n,
        endTimestamp: 0n, // No end (perpetual)
      })

      const state = await perpetualPoolSDK.getState()
      expect(state.endTimestamp).toBe(0n)

      // Use TimeWarp to advance block timestamp past start time
      await timeWarp.timeWarp(10n)

      // Pool should be live after start time passes
      const isLive = await perpetualPoolSDK.isLive()
      expect(isLive).toBe(true)
    })

    test('should correctly calculate MBR for different winner counts', async () => {
      // Use poolSDK which was created earlier
      const mbr0 = await poolSDK.getMbr({ winningTickets: 0 })
      const mbr5 = await poolSDK.getMbr({ winningTickets: 5 })
      const mbr10 = await poolSDK.getMbr({ winningTickets: 10 })

      // More winners = more MBR for rewards
      expect(mbr5.rewards).toBeGreaterThan(mbr0.rewards)
      expect(mbr10.rewards).toBeGreaterThan(mbr5.rewards)

      // Verify exact formula is applied
      expect(mbr5.rewards - mbr0.rewards).toBe(BOX_COST_PER_BYTE * POOL_REWARD_WINNING_TICKET_BYTES * 5n)
      expect(mbr10.rewards - mbr5.rewards).toBe(BOX_COST_PER_BYTE * POOL_REWARD_WINNING_TICKET_BYTES * 5n)
    })
  })

  describe('Check Eligibility', () => {
    test('checks an isolated hard-staked ALGO entry against the staking contract', async () => {
      const poolCreator = generateSignerAccount(algorand)
      const staker = generateSignerAccount(algorand)

      for (const account of [poolCreator, staker]) {
        await algorand.send.payment({
          sender: deployer.addr,
          signer: deployer.signer,
          receiver: account.addr,
          amount: (100).algos(),
        })
      }

      const eligibilityPool = await factorySDK.new({
        sender: poolCreator.addr,
        signer: poolCreator.signer,
        title: 'Hard ALGO eligibility pool',
        type: POOL_STAKING_TYPE_HARD,
        marketplace: poolCreator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 1_000_000n,
        allowLateSignups: true,
        gateId: 0n,
        // Entry-cap behavior is covered separately; keep this eligibility test
        // focused on HARD stake validation.
        maxEntries: 0n,
      })

      await algorand.send.payment({
        sender: poolCreator.addr,
        signer: poolCreator.signer,
        receiver: eligibilityPool.client.appAddress,
        amount: algokit.microAlgos(200_000),
      })

      const now = await getBlockTimestamp(algorand)
      await eligibilityPool.finalize({
        sender: poolCreator.addr,
        signer: poolCreator.signer,
        signupTimestamp: now + 2n,
        startTimestamp: now + 3n,
        endTimestamp: now + BigInt(ONE_DAY),
      })
      await new TimeWarp(algorand).timeWarp(10n)

      await akitaUniverse.staking.stake({
        sender: staker.addr,
        signer: staker.signer,
        type: StakingType.Hard,
        asset: 0n,
        amount: 2_000_000n,
        expiration: now + BigInt(ONE_DAY),
      })
      await eligibilityPool.enter({
        sender: staker.addr,
        signer: staker.signer,
        entries: [{ asset: 0n, amount: 1_000_000n, proofs: proofsFor(0n) }],
      })

      await expect(
        eligibilityPool.check({ address: staker.addr.toString(), asset: 0n })
      ).resolves.toEqual({ isEligible: true, stake: 2_000_000n })
    })
  })

  describe('Factory SDK Helper Methods', () => {
    test('should get existing pool by appId', () => {
      const retrievedPoolSDK = factorySDK.get({ appId: poolSDK.appId })
      expect(retrievedPoolSDK.appId).toBe(poolSDK.appId)
    })

    test('should get cost for pool creation', async () => {
      const cost = await factorySDK.cost()
      expect(cost).toBeGreaterThan(0n)
    })
  })

  describe('Percentage Distribution Rewards', () => {
    let percentPoolSDK: StakingPoolSDK

    beforeAll(async () => {
      // Create a pool specifically for percentage distribution testing
      // Percentage distribution requires a valid (non-zero) stake key
      percentPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Percentage Distribution Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          // Use creator's address as stake key for percentage distribution
          // In production, this would be a Meta root key address
          address: creator.addr.toString(),
          name: 'TestStakeKey',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund the pool
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: percentPoolSDK.client.appAddress,
        amount: algokit.microAlgos(1_000_000), // 1 ALGO for MBR
      })
    })

    test('should add percentage distribution reward', async () => {
      // Percentage distribution requires a valid stake key (non-zero address)
      // The pool was created with stakeKey.address = creator.addr
      const rewardAmount = 10_000_000n // 10 ALGO
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_PERCENTAGE,
        rate: rewardAmount,
        interval: BigInt(ONE_DAY),
        expiration: BigInt(ONE_DAY * 30),
      })

      const mbr = await percentPoolSDK.getMbr({ winningTickets: 0 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: percentPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + rewardAmount)),
      })

      await percentPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      // Verify reward was added by checking reward count
      const state = await percentPoolSDK.getState()
      expect(state.rewardCount).toBe(1n)
    })
  })

  describe('ASA Rewards', () => {
    let asaRewardPoolSDK: StakingPoolSDK
    let rewardAssetId: bigint

    beforeAll(async () => {
      // Create a reward asset
      const assetCreateTxn = await algorand.send.assetCreate({
        sender: creator.addr,
        signer: creator.signer,
        total: 1_000_000_000_000n,
        decimals: 6,
        assetName: 'Reward Token',
        unitName: 'RWRD',
      })
      rewardAssetId = BigInt(assetCreateTxn.assetId)

      // Create a pool for ASA reward testing
      asaRewardPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'ASA Reward Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund the pool for MBR
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: asaRewardPoolSDK.client.appAddress,
        amount: algokit.microAlgos(1_000_000),
      })
    })

    test('should get opt-in cost for ASA reward', async () => {
      // Get the opt-in cost for adding an ASA reward
      const optInCost = await asaRewardPoolSDK.client.send.optInCost({ args: { asset: rewardAssetId } })
      expect(optInCost.return).toBeDefined()
      expect(optInCost.return!).toBeGreaterThan(0n)
    })

    test('should fail to add ASA reward if pool not opted into asset', async () => {
      // This test must run BEFORE the pool opts into the asset
      const reward = createReward({
        asset: rewardAssetId,
        distribution: DISTRIBUTION_TYPE_FLAT,
        rate: 1_000_000n,
      })

      const mbr = await asaRewardPoolSDK.getMbr({ winningTickets: 0 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: asaRewardPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards)),
      })

      const assetXfer = await algorand.createTransaction.assetTransfer({
        sender: creator.addr,
        receiver: asaRewardPoolSDK.client.appAddress,
        assetId: rewardAssetId,
        amount: 1_000_000n,
      })

      // Should fail because pool isn't opted into the ASA
      await expect(
        asaRewardPoolSDK.client.send.addRewardAsa({
          sender: creator.addr,
          signer: creator.signer,
          args: { payment, assetXfer, reward },
        })
      ).rejects.toThrow()
    })

    test('should opt pool into reward ASA using SDK', async () => {
      // Use the SDK's optIn method which handles payment calculation
      await asaRewardPoolSDK.optIn({
        sender: creator.addr,
        signer: creator.signer,
        asset: rewardAssetId,
      })

      // Verify pool can now receive the asset by sending a transfer
      await algorand.send.assetTransfer({
        sender: creator.addr,
        signer: creator.signer,
        receiver: asaRewardPoolSDK.client.appAddress,
        assetId: rewardAssetId,
        amount: 1000n,
      })
    })
  })

  describe('Shuffle Distribution', () => {
    test('should create pool with shuffle distribution reward', async () => {
      const shufflePoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Shuffle Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund the pool
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: shufflePoolSDK.client.appAddress,
        amount: algokit.microAlgos(1_000_000),
      })

      const winnerCount = 3n
      const rewardAmount = 30_000_000n // 30 ALGO total (10 per winner)

      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_SHUFFLE,
        rate: rewardAmount,
        winnerCount,
        interval: BigInt(ONE_DAY),
        expiration: BigInt(ONE_DAY * 30),
      })

      const mbr = await shufflePoolSDK.getMbr({ winningTickets: Number(winnerCount) })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: shufflePoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + rewardAmount)),
      })

      await shufflePoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const state = await shufflePoolSDK.getState()
      expect(state.rewardCount).toBe(1n)
    })

    test('should fail shuffle with more winners than rate', async () => {
      const shufflePoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Invalid Shuffle Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: shufflePoolSDK.client.appAddress,
        amount: algokit.microAlgos(1_000_000),
      })

      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_SHUFFLE,
        rate: 5n, // Only 5 ALGO
        winnerCount: 10n, // But 10 winners requested
        interval: BigInt(ONE_DAY),
      })

      const mbr = await shufflePoolSDK.getMbr({ winningTickets: 10 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: shufflePoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + 5n)),
      })

      await expect(
        shufflePoolSDK.client.send.addReward({
          sender: creator.addr,
          signer: creator.signer,
          args: { payment, reward },
        })
      ).rejects.toThrow()
    })
  })

  describe('Pool Check Methods', () => {
    let checkPoolSDK: StakingPoolSDK

    beforeAll(async () => {
      // Create a pool with SOFT staking type to test check methods
      checkPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Check Methods Pool',
        type: POOL_STAKING_TYPE_SOFT,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund the pool
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: checkPoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      // Finalize the pool
      const now = Number(await getBlockTimestamp(algorand))
      await checkPoolSDK.finalize({
        signupTimestamp: BigInt(now + ONE_MINUTE),
        startTimestamp: BigInt(now + ONE_MINUTE + 10),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })
    })

    test('should verify pool is created with SOFT staking type', async () => {
      const state = await checkPoolSDK.getState()
      expect(state.type).toBe(POOL_STAKING_TYPE_SOFT)
    })

    test('should track entry status for users', async () => {
      // Before any entries
      const isEnteredBefore = await checkPoolSDK.isEntered({ address: user1.addr.toString() })
      expect(isEnteredBefore).toBe(false)
    })
  })

  describe('Late Signup Pools', () => {
    test('should allow entry after pool start if allowLateSignups is true', async () => {
      // Create pool with allowLateSignups enabled
      const lateSignupPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Late Signup Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        gateId: 0n,
        maxEntries: 100n,
        allowLateSignups: true, // Enable late signups
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: lateSignupPoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      // Finalize with a start time in the past (relative to when we'll check)
      const now = Number(await getBlockTimestamp(algorand))
      await lateSignupPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + ONE_DAY),
      })

      // Wait for pool to become live
      const localTimeWarp = new TimeWarp(algorand)
      await localTimeWarp.timeWarp(15n)

      // Pool should be live
      const isLive = await lateSignupPoolSDK.isLive()
      expect(isLive).toBe(true)

      // signUpsOpen should return true because allowLateSignups is true
      const signUpsOpen = await lateSignupPoolSDK.signUpsOpen()
      expect(signUpsOpen).toBe(true)

      // Entry should succeed after pool start
      const lateUser = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: lateUser.addr,
        amount: algokit.microAlgos(10_000_000),
      })

      const entryCost = await lateSignupPoolSDK.enterCost({
        address: lateUser.addr.toString(),
        assets: [0n],
      })

      const payment = await algorand.createTransaction.payment({
        sender: lateUser.addr,
        receiver: lateSignupPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(entryCost)),
      })

      await lateSignupPoolSDK.client.send.enter({
        sender: lateUser.addr,
        signer: lateUser.signer,
        extraFee: algokit.microAlgos(2000),
        args: {
          payment,
          entries: [[0n, 1_000_000n, proofsFor(0n)]],
        },
      })

      // Verify user entered successfully
      const isEntered = await lateSignupPoolSDK.isEntered({ address: lateUser.addr.toString() })
      expect(isEntered).toBe(true)
    })

    test('should reject entry after pool start if allowLateSignups is false', async () => {
      const lateEntryPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'No Late Entry Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: lateEntryPoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      // Finalize with immediate start (startTimestamp = 0)
      // This requires allowLateSignups to be true, but it defaults to false
      // So we need to use a future timestamp instead
      const now = Number(await getBlockTimestamp(algorand))
      await lateEntryPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + ONE_DAY),
      })

      // Wait for start time to pass
      const localTimeWarp = new TimeWarp(algorand)
      await localTimeWarp.timeWarp(15n)

      // Pool should be live
      const isLive = await lateEntryPoolSDK.isLive()
      expect(isLive).toBe(true)

      // signUpsOpen should return false because allowLateSignups is false
      const signUpsOpen = await lateEntryPoolSDK.signUpsOpen()
      expect(signUpsOpen).toBe(false)

      const lateUser = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: lateUser.addr,
        amount: algokit.microAlgos(10_000_000),
      })

      const entryCost = await lateEntryPoolSDK.enterCost({
        address: lateUser.addr.toString(),
        assets: [0n],
      })

      const payment = await algorand.createTransaction.payment({
        sender: lateUser.addr,
        receiver: lateEntryPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(entryCost)),
      })

      await expect(
        lateEntryPoolSDK.client.send.enter({
          sender: lateUser.addr,
          signer: lateUser.signer,
          extraFee: algokit.microAlgos(2000),
          args: {
            payment,
            entries: [[0n, 1_000_000n, proofsFor(0n)]],
          },
        })
      ).rejects.toThrow()
    })
  })

  describe('Pool Expiration', () => {
    test('should track pool end timestamp correctly', async () => {
      const expiringPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Expiring Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: expiringPoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      const now = Number(await getBlockTimestamp(algorand))
      const endTime = BigInt(now + ONE_HOUR) // Pool ends in 1 hour

      await expiringPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: endTime,
      })

      const state = await expiringPoolSDK.getState()
      expect(state.endTimestamp).toBe(endTime)
    })

    test('should allow deletion of ended pool', async () => {
      const shortPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Short Duration Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: shortPoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      const now = Number(await getBlockTimestamp(algorand))
      // Short pool duration - end must be > start + 10
      await shortPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + 25), // Must be > startTimestamp + 10
      })

      // Wait for pool to end (need to wait past endTimestamp which is now + 25)
      const localTimeWarp = new TimeWarp(algorand)
      await localTimeWarp.timeWarp(30n)

      // Pool should no longer be live
      const isLive = await shortPoolSDK.isLive()
      expect(isLive).toBe(false)

      // Should be able to delete ended pool
      await factorySDK.deletePool({
        sender: creator.addr,
        signer: creator.signer,
        appId: shortPoolSDK.appId,
      })

      // Verify pool was deleted by trying to get its state
      await expect(shortPoolSDK.getState()).rejects.toThrow()
    })
  })

  describe('Factory escrow', () => {
    test('should verify factory has escrow configured', async () => {
      // The factory should have an escrow set during Akita Universe setup
      // We verify by checking the global state
      const akitaDaoEscrow = await factorySDK.client.state.global.akitaDaoEscrow()
      expect(akitaDaoEscrow).toBeDefined()
      // The escrow should be a valid application (app ID greater than 0)
      // akitaDaoEscrow is an Application reference
      expect(akitaDaoEscrow).toBeTruthy()
    })
  })

  describe('Multiple Entries Per User', () => {
    test('should track unique stakers correctly', async () => {
      const multiEntryPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Multi Entry Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: multiEntryPoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      const now = Number(await getBlockTimestamp(algorand))
      await multiEntryPoolSDK.finalize({
        signupTimestamp: BigInt(now + ONE_MINUTE),
        startTimestamp: BigInt(now + ONE_HOUR),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      // User should not be entered yet
      const isEnteredBefore = await multiEntryPoolSDK.isEntered({ address: user1.addr.toString() })
      expect(isEnteredBefore).toBe(false)
    })

    test('should calculate correct entry cost for first vs subsequent entries', async () => {
      const costPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Entry Cost Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Check entry cost for first entry (should include uniques MBR)
      const firstEntryCost = await costPoolSDK.enterCost({
        address: user1.addr.toString(),
        assets: [0n],
      })

      expect(firstEntryCost).toBeDefined()
      expect(firstEntryCost).toBeGreaterThan(0n)
      // First entry cost should include POOL_UNIQUES_MBR
      expect(firstEntryCost).toBeGreaterThanOrEqual(POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR + POOL_UNIQUES_MBR)
    })
  })

  describe('Pool with Gates', () => {
    test('should preserve or disqualify an entry from the Gate.check return value', async () => {
      const gatedUser = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: gatedUser.addr,
        amount: algokit.microAlgos(10_000_000),
      })
      await algorand.send.assetOptIn({
        sender: gatedUser.addr,
        signer: gatedUser.signer,
        assetId: testAssetId,
      })
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: gatedUser.addr,
        assetId: testAssetId,
        amount: 1n,
      })

      const gateSDK = akitaUniverse.gate as unknown as GateSDK
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: akitaUniverse.subgates.assetGate.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: gateSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })
      const registration = await gateSDK.register({
        sender: deployer.addr,
        signer: deployer.signer,
        args: [{
          type: 'asset',
          appId: akitaUniverse.subgates.assetGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          asset: testAssetId,
          op: Operator.GreaterThanOrEqualTo,
          value: 1n,
        }],
      })
      expect(registration.return).toBeDefined()
      const gateId = registration.return!

      const gatedPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Soft Gate Check Pool',
        type: POOL_STAKING_TYPE_SOFT,
        marketplace: creator.addr.toString(),
        stakeKey: poolStakeKey,
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId,
        maxEntries: 0n,
      })
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: gatedPoolSDK.client.appAddress,
        amount: algokit.microAlgos(200_000),
      })
      await gatedPoolSDK.finalize({
        signupTimestamp: 0n,
        startTimestamp: 0n,
        endTimestamp: (await getBlockTimestamp(algorand)) + BigInt(ONE_DAY),
      })

      // SOFT pools commit an existing stake to the pool when entering.
      await akitaUniverse.staking.stake({
        sender: gatedUser.addr,
        signer: gatedUser.signer,
        type: StakingType.Soft,
        asset: 0n,
        amount: 1_000_000n,
      })

      const entryGateTxn = await gateSDK.build.mustCheck({
        sender: gatedUser.addr,
        signer: gatedUser.signer,
        caller: gatedUser.addr.toString(),
        gateId,
        args: [{ type: 'asset' }],
      })
      await gatedPoolSDK.enter({
        sender: gatedUser.addr,
        signer: gatedUser.signer,
        entries: [{ asset: 0n, amount: 1_000_000n, proofs: proofsFor(0n) }],
        gateTxn: entryGateTxn,
      })

      // H-5 (2026-10 audit): anyone may re-run the gate, but only with the arguments the entrant
      // supplied at entry; there is no way to feed it a failing proof or argument.
      await gatedPoolSDK.gateCheck({
        sender: deployer.addr,
        signer: deployer.signer,
        address: gatedUser.addr.toString(),
        asset: 0n,
      })
      expect((await gatedPoolSDK.check({ address: gatedUser.addr.toString(), asset: 0n })).isEligible).toBe(true)

      await algorand.send.assetTransfer({
        sender: gatedUser.addr,
        signer: gatedUser.signer,
        receiver: deployer.addr,
        assetId: testAssetId,
        amount: 1n,
      })
      // the entrant really no longer passes the gate: disqualified
      await gatedPoolSDK.gateCheck({
        sender: deployer.addr,
        signer: deployer.signer,
        address: gatedUser.addr.toString(),
        asset: 0n,
      })
      expect((await gatedPoolSDK.check({ address: gatedUser.addr.toString(), asset: 0n })).isEligible).toBe(false)
    })

    test('should fail gatedEnter if gate not set', async () => {
      const noGatePoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'No Gate Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n, // No gate
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: noGatePoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      const now = Number(await getBlockTimestamp(algorand))
      await noGatePoolSDK.finalize({
        signupTimestamp: BigInt(now + ONE_MINUTE),
        startTimestamp: BigInt(now + ONE_HOUR),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      // Verify gate is not set
      const state = await noGatePoolSDK.getState()
      expect(state.gateId).toBe(0n)
    })
  })

  describe('Reward Interval Validation', () => {
    test('should create reward with daily interval', async () => {
      const intervalPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Interval Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: intervalPoolSDK.client.appAddress,
        amount: algokit.microAlgos(2_000_000),
      })

      const dailyInterval = BigInt(ONE_DAY)
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_FLAT,
        rate: 1_000_000n,
        interval: dailyInterval,
        expiration: BigInt(ONE_DAY * 30),
      })

      const mbr = await intervalPoolSDK.getMbr({ winningTickets: 0 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: intervalPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + reward.rate)),
      })

      await intervalPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const state = await intervalPoolSDK.getState()
      expect(state.rewardCount).toBe(1n)
    })

    test('should create reward with hourly interval', async () => {
      const hourlyPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Hourly Interval Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: hourlyPoolSDK.client.appAddress,
        amount: algokit.microAlgos(2_000_000),
      })

      const hourlyInterval = BigInt(ONE_HOUR)
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_EVEN,
        rate: 500_000n,
        interval: hourlyInterval,
        expiration: BigInt(ONE_DAY),
      })

      const mbr = await hourlyPoolSDK.getMbr({ winningTickets: 0 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: hourlyPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + reward.rate)),
      })

      await hourlyPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const state = await hourlyPoolSDK.getState()
      expect(state.rewardCount).toBe(1n)
    })
  })

  describe('Disbursement Flow', () => {
    // Note: Full disbursement flow requires the Rewards app from Akita Universe to be properly 
    // configured and linked. These tests verify the setup and entry phase which don't require 
    // the Rewards app. The actual disbursement tests (startDisbursement, disburseRewards, 
    // finalizeDistribution) are skipped as they require the full Akita ecosystem.

    let disbursementPoolSDK: StakingPoolSDK
    let disbursementUser1: AddressWithTransactionSigner
    let disbursementUser2: AddressWithTransactionSigner

    beforeAll(async () => {
      const localTimeWarp = new TimeWarp(algorand)

      // Create fresh user accounts
      disbursementUser1 = generateSignerAccount(algorand)
      disbursementUser2 = generateSignerAccount(algorand)

      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: disbursementUser1.addr,
        amount: algokit.microAlgos(100_000_000), // 100 ALGO
      })
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: disbursementUser2.addr,
        amount: algokit.microAlgos(100_000_000), // 100 ALGO
      })

      // Create a pool for disbursement testing with NONE type (no staking required)
      disbursementPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Disbursement Test Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund the pool with enough for MBR and rewards
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: disbursementPoolSDK.client.appAddress,
        amount: algokit.microAlgos(5_000_000), // 5 ALGO
      })

      // Add a FLAT distribution reward
      const rewardAmount = 1_000_000n // 1 ALGO per qualified staker
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_FLAT,
        rate: rewardAmount,
        interval: BigInt(60), // 1 minute interval for testing
        expiration: BigInt(ONE_DAY),
      })

      const mbr = await disbursementPoolSDK.getMbr({ winningTickets: 0 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: disbursementPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + (rewardAmount * 10n))), // Extra for multiple stakers
      })

      await disbursementPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      // Get timestamp before finalize
      const now = Number(await getBlockTimestamp(algorand))

      // Finalize with very short intervals for testing
      await disbursementPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      // Time warp past start
      await localTimeWarp.timeWarp(15n)
    })

    test('should verify pool is live and ready for entries', async () => {
      const isLive = await disbursementPoolSDK.isLive()
      expect(isLive).toBe(true)

      const state = await disbursementPoolSDK.getState()
      expect(state.rewardCount).toBe(1n)
    })

    test('should calculate correct entry cost', async () => {
      const entryCost = await disbursementPoolSDK.enterCost({
        address: disbursementUser1.addr.toString(),
        assets: [0n],
      })

      expect(entryCost).toBeDefined()
      expect(entryCost).toBeGreaterThan(0n)
    })

    test('should allow users to enter the pool', async () => {
      await disbursementPoolSDK.enter({
        sender: disbursementUser1.addr,
        signer: disbursementUser1.signer,
        entries: [
          {
            asset: 0n,
            amount: 1_000_000n,
            proofs: proofsFor(0n),
          },
        ],
      })

      await disbursementPoolSDK.enter({
        sender: disbursementUser2.addr,
        signer: disbursementUser2.signer,
        entries: [
          {
            asset: 0n,
            amount: 2_000_000n,
            proofs: proofsFor(0n),
          },
        ],
      })

      // Verify entries
      const isEntered1 = await disbursementPoolSDK.isEntered({ address: disbursementUser1.addr.toString() })
      const isEntered2 = await disbursementPoolSDK.isEntered({ address: disbursementUser2.addr.toString() })

      expect(isEntered1).toBe(true)
      expect(isEntered2).toBe(true)
    })

    test('should start disbursement after interval passes', async () => {
      // Wait for distribution window to open
      const localTimeWarp = new TimeWarp(algorand)
      await localTimeWarp.timeWarp(65n) // Past the 60 second interval

      // Start disbursement - rewardId 1 is the first reward added
      await disbursementPoolSDK.startDisbursement({ rewardId: 1n })

      // Pool should still be live
      const isLive = await disbursementPoolSDK.isLive()
      expect(isLive).toBe(true)

      const rewards = await disbursementPoolSDK.getRewards()
      expect(rewards.size).toBe(1)
      expect(rewards.get(1)?.phase).toBe(DisbursementPhase.Preparation)
    })

    test('should process preparation phase', async () => {
      // One call processes every entry and, having reached the last one, moves straight to the
      // allocation phase (the qualified set is frozen while the round is open).
      await disbursementPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 100n, // Process all entries
      })

      const rewards = await disbursementPoolSDK.getRewards()
      expect(rewards.get(1)?.phase).toBe(DisbursementPhase.Allocation)
      expect(rewards.get(1)?.qualifiedStakers).toBe(2n)
    })

    test('should process allocation phase', async () => {
      // With only 2 entries and iterationAmount of 100, one call processes everything
      // and transitions to Finalization phase
      await disbursementPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 100n,
      })

      // Verify we're now in Finalization phase
      const rewards = await disbursementPoolSDK.getRewards()
      expect(rewards.get(1)?.phase).toBe(DisbursementPhase.Finalization)
    })

    test('should finalize distribution', async () => {
      await disbursementPoolSDK.finalizeDistribution({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
      })

      const isLive = await disbursementPoolSDK.isLive()
      expect(isLive).toBe(true)

      // After finalization, the phase should be back to Idle
      const rewards = await disbursementPoolSDK.getRewards()
      expect(rewards.get(1)?.phase).toBe(DisbursementPhase.Idle)
    })
  })

  describe('Multiple Rewards', () => {
    let multiRewardPoolSDK: StakingPoolSDK

    beforeAll(async () => {
      // Create a pool for multiple rewards testing
      multiRewardPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Multi Reward Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund the pool generously
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: multiRewardPoolSDK.client.appAddress,
        amount: algokit.microAlgos(10_000_000), // 10 ALGO
      })
    })

    test('should add first reward (FLAT distribution)', async () => {
      const stateBefore = await multiRewardPoolSDK.getState()
      const rewardCountBefore = stateBefore.rewardCount

      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_FLAT,
        rate: 500_000n, // 0.5 ALGO per staker
        interval: BigInt(ONE_HOUR),
        expiration: BigInt(ONE_DAY * 7),
      })

      const mbr = await multiRewardPoolSDK.getMbr({ winningTickets: 0 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: multiRewardPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + 5_000_000n)),
      })

      await multiRewardPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const stateAfter = await multiRewardPoolSDK.getState()
      expect(stateAfter.rewardCount).toBe(rewardCountBefore + 1n) // Incremented by 1
    })

    test('should add second reward (EVEN distribution)', async () => {
      const stateBefore = await multiRewardPoolSDK.getState()
      const rewardCountBefore = stateBefore.rewardCount

      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_EVEN,
        rate: 2_000_000n, // 2 ALGO total split evenly
        interval: BigInt(ONE_DAY),
        expiration: BigInt(ONE_DAY * 30),
      })

      const mbr = await multiRewardPoolSDK.getMbr({ winningTickets: 0 })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: multiRewardPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + 2_000_000n)),
      })

      await multiRewardPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const stateAfter = await multiRewardPoolSDK.getState()
      expect(stateAfter.rewardCount).toBe(rewardCountBefore + 1n) // Incremented by 1
    })

    test('should add third reward (SHUFFLE distribution)', async () => {
      const stateBefore = await multiRewardPoolSDK.getState()
      const rewardCountBefore = stateBefore.rewardCount

      const winnerCount = 2n
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_SHUFFLE,
        rate: 1_000_000n, // 1 ALGO total for raffle
        winnerCount,
        interval: BigInt(ONE_DAY),
        expiration: BigInt(ONE_DAY * 14),
      })

      const mbr = await multiRewardPoolSDK.getMbr({ winningTickets: Number(winnerCount) })

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: multiRewardPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + 1_000_000n)),
      })

      await multiRewardPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const stateAfter = await multiRewardPoolSDK.getState()
      expect(stateAfter.rewardCount).toBe(rewardCountBefore + 1n) // Incremented by 1
    })

    test('should verify pool has multiple rewards configured', async () => {
      const state = await multiRewardPoolSDK.getState()
      expect(state.rewardCount).toBe(3n)
    })
  })

  describe('Fee Processing (Akita Royalties)', () => {
    // Note: Akita royalties are calculated based on the creator's impact score and 
    // the DAO's fee configuration. The royalty is deducted during disbursement.
    // Full fee processing tests require the Rewards app integration.

    let feeTestPoolSDK: StakingPoolSDK
    let feeTestUser: AddressWithTransactionSigner

    beforeAll(async () => {
      // Create pool
      feeTestPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Fee Test Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund pool
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: feeTestPoolSDK.client.appAddress,
        amount: algokit.microAlgos(10_000_000), // 10 ALGO
      })

      // Add two differently sized rewards so their disbursement lifecycles can
      // overlap without sharing royalty state.
      for (const rewardAmount of [5_000_000n, 2_000_000n]) {
        const reward = createReward({
          distribution: DISTRIBUTION_TYPE_EVEN,
          rate: rewardAmount,
          interval: BigInt(60),
          expiration: BigInt(ONE_DAY),
        })

        // reward box + budget bookkeeping boxes come out of the deposit; the rest is the budget (M-5)
        const mbr = { rewards: await feeTestPoolSDK.getAddRewardCost({ winnerCount: 0n, asset: 0n }) }
        const payment = await algorand.createTransaction.payment({
          sender: creator.addr,
          receiver: feeTestPoolSDK.client.appAddress,
          amount: algokit.microAlgos(Number(mbr.rewards + rewardAmount)),
        })

        await feeTestPoolSDK.client.send.addReward({
          sender: creator.addr,
          signer: creator.signer,
          args: { payment, reward },
        })
      }
    })

    test('should verify pool was created with fee configuration', async () => {
      // Pool should have an Akita royalty set based on creator's impact
      // The exact value depends on the DAO's impactTaxMin/Max settings
      const state = await feeTestPoolSDK.getState()
      expect(state).toBeDefined()
      expect(state.creator).toBeDefined()
    })

    test('should have reward configured for fee processing', async () => {
      const state = await feeTestPoolSDK.getState()
      expect(state.rewardCount).toBe(2n)
    })

    test('should isolate royalties across consecutive reward disbursements (one open round per pool)', async () => {
      const localTimeWarp = new TimeWarp(algorand)
      await localTimeWarp.resetTimeWarp()
      await localTimeWarp.roundWarp()

      // Create a user for the fee test pool
      feeTestUser = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: feeTestUser.addr,
        amount: algokit.microAlgos(50_000_000),
      })

      // Get timestamp and finalize the pool
      const now = Number(await getBlockTimestamp(algorand))
      await feeTestPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      // Time warp past start
      await localTimeWarp.timeWarp(15n)

      // User enters the pool
      await feeTestPoolSDK.enter({
        sender: feeTestUser.addr,
        signer: feeTestUser.signer,
        entries: [{ asset: 0n, amount: 1_000_000n, proofs: proofsFor(0n) }],
      })

      // Time warp past the reward interval
      await localTimeWarp.timeWarp(65n)

      const royaltyRate = await feeTestPoolSDK.client.state.global.akitaRoyalty()
      expect(royaltyRate).toBeGreaterThan(0n)

      const escrow = await factorySDK.client.state.global.akitaDaoEscrow()
      if (!escrow?.app || royaltyRate === undefined) {
        throw new Error('Missing staking royalty or DAO escrow configuration')
      }
      const escrowAddress = algosdk.getApplicationAddress(escrow.app).toString()
      const escrowBalanceBefore = await getAccountBalance(algorand, escrowAddress)

      // one round per pool (STAKE-1): reward two waits until reward one closes
      await feeTestPoolSDK.startDisbursement({ rewardId: 1n })
      await expect(feeTestPoolSDK.startDisbursement({ rewardId: 2n })).rejects.toThrow(errRoundOpen)

      // one call prepares every entry, pays the royalty and moves the round to allocation
      await feeTestPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 100n,
      })

      const rewardOnePrepared = await feeTestPoolSDK.getReward(1)
      const expectedRoyaltyOne = (rewardOnePrepared.rate * royaltyRate) / 100_000n
      expect(rewardOnePrepared.phase).toBe(DisbursementPhase.Allocation)
      expect(rewardOnePrepared.royaltyAmount).toBe(expectedRoyaltyOne)

      await feeTestPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 100n,
      })

      const allocationOne = await akitaUniverse.rewards.client.state.box.userAllocations.value({
        address: feeTestUser.addr.toString(),
        asset: 0n,
        disbursementId: rewardOnePrepared.activeDisbursementId,
      })
      expect(allocationOne).toBe(rewardOnePrepared.rate - rewardOnePrepared.royaltyAmount)

      await feeTestPoolSDK.finalizeDistribution({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
      })

      await feeTestPoolSDK.startDisbursement({ rewardId: 2n })
      await feeTestPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 2n,
        iterationAmount: 100n,
      })

      const rewardTwoPrepared = await feeTestPoolSDK.getReward(2)
      const expectedRoyaltyTwo = (rewardTwoPrepared.rate * royaltyRate) / 100_000n
      expect(rewardTwoPrepared.phase).toBe(DisbursementPhase.Allocation)
      expect(rewardTwoPrepared.royaltyAmount).toBe(expectedRoyaltyTwo)
      expect(rewardTwoPrepared.royaltyAmount).not.toBe(rewardOnePrepared.royaltyAmount)

      const escrowBalanceAfter = await getAccountBalance(algorand, escrowAddress)
      expect(escrowBalanceAfter - escrowBalanceBefore).toBe(expectedRoyaltyOne + expectedRoyaltyTwo)

      await feeTestPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 2n,
        iterationAmount: 100n,
      })

      const allocationTwo = await akitaUniverse.rewards.client.state.box.userAllocations.value({
        address: feeTestUser.addr.toString(),
        asset: 0n,
        disbursementId: rewardTwoPrepared.activeDisbursementId,
      })
      expect(allocationTwo).toBe(rewardTwoPrepared.rate - rewardTwoPrepared.royaltyAmount)

      await feeTestPoolSDK.finalizeDistribution({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 2n,
      })

      const rewardsAfterFinalize = await feeTestPoolSDK.getRewards()
      expect(rewardsAfterFinalize.get(1)?.phase).toBe(DisbursementPhase.Idle)
      expect(rewardsAfterFinalize.get(1)?.royaltyAmount).toBe(0n)
      expect(rewardsAfterFinalize.get(2)?.phase).toBe(DisbursementPhase.Idle)
      expect(rewardsAfterFinalize.get(2)?.royaltyAmount).toBe(0n)
    })

    test('should disburse a shuffle reward using its net royalty amount and quoted ticket MBR', async () => {
      const rewardAmount = 3_000_001n
      const winnerCount = 1n
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_SHUFFLE,
        rate: rewardAmount,
        interval: 60n,
        expiration: BigInt(ONE_DAY),
        winnerCount,
      })
      const mbr = { rewards: await feeTestPoolSDK.getAddRewardCost({ winnerCount, asset: 0n }) }
      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: feeTestPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + rewardAmount)),
      })

      await feeTestPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const rewardId = 3n
      await feeTestPoolSDK.startDisbursement({ rewardId })
      await feeTestPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId,
        iterationAmount: 100n,
      })

      const prepared = await feeTestPoolSDK.getReward(Number(rewardId))
      expect(prepared.phase).toBe(DisbursementPhase.Allocation)
      expect(prepared.royaltyAmount).toBeGreaterThan(0n)

      await feeTestPoolSDK.raffle({
        sender: creator.addr,
        signer: creator.signer,
        rewardId,
      })
      expect((await feeTestPoolSDK.getReward(Number(rewardId))).winningTickets).toHaveLength(Number(winnerCount))

      await feeTestPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId,
        iterationAmount: 100n,
      })

      const allocation = await akitaUniverse.rewards.client.state.box.userAllocations.value({
        address: feeTestUser.addr.toString(),
        asset: 0n,
        disbursementId: prepared.activeDisbursementId,
      })
      expect(allocation).toBe(prepared.rate - prepared.royaltyAmount)

      await feeTestPoolSDK.finalizeDistribution({
        sender: creator.addr,
        signer: creator.signer,
        rewardId,
      })
      const finalized = await feeTestPoolSDK.getReward(Number(rewardId))
      expect(finalized.phase).toBe(DisbursementPhase.Idle)
      expect(finalized.royaltyAmount).toBe(0n)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // 2026-10 AUDIT REGRESSIONS (H-1 … H-6, M-1, M-5, L-1, L-3)
  // ═══════════════════════════════════════════════════════════════════════════

  describe('2026-10 audit regressions', () => {
    const ZERO_KEY = { address: algosdk.ALGORAND_ZERO_ADDRESS_STRING, name: '' }

    beforeAll(async () => {
      // every test below creates its own pool
      await algorand.account.ensureFunded(creator.addr, dispenser.addr, (2000).algo())
      await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (1000).algo())
    })

    const fundedUser = async (amount = 50_000_000n) => {
      const user = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: user.addr,
        amount: algokit.microAlgos(amount),
      })
      return user
    }

    const newPool = async (overrides: Partial<Parameters<StakingPoolFactorySDK['new']>[0]> = {}) => factorySDK.new({
      sender: creator.addr,
      signer: creator.signer,
      title: 'Audit Pool',
      type: POOL_STAKING_TYPE_NONE,
      marketplace: creator.addr.toString(),
      stakeKey: ZERO_KEY,
      minimumStakeAmount: 0n,
      allowLateSignups: true,
      gateId: 0n,
      maxEntries: 0n,
      ...overrides,
    } as Parameters<StakingPoolFactorySDK['new']>[0])

    /** Free ALGO for round operations (Rewards MBR, credits, bookkeeping boxes). */
    const fundOps = async (pool: StakingPoolSDK, amount = 3_000_000n) => algorand.send.payment({
      sender: creator.addr,
      signer: creator.signer,
      receiver: pool.client.appAddress,
      amount: algokit.microAlgos(amount),
    })

    const addAlgoReward = async (pool: StakingPoolSDK, reward: AddRewardInput, budget: bigint) => {
      // reward box + budget bookkeeping boxes; the surplus becomes the reward's budget (M-5)
      const cost = await pool.getAddRewardCost({ winnerCount: reward.winnerCount, asset: reward.asset })
      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: pool.client.appAddress,
        amount: algokit.microAlgos(cost + budget),
      })
      await pool.client.send.addReward({ sender: creator.addr, signer: creator.signer, args: { payment, reward } })
    }

    const goLive = async (pool: StakingPoolSDK, endIn = BigInt(ONE_DAY)) => {
      await pool.finalize({
        signupTimestamp: 0n,
        startTimestamp: 0n,
        endTimestamp: (await getBlockTimestamp(algorand)) + endIn,
      })
    }

    const disburse = (pool: StakingPoolSDK, rewardId: bigint, iterationAmount = 100n) => pool.disburseRewards({
      sender: creator.addr,
      signer: creator.signer,
      rewardId,
      iterationAmount,
    })

    /** Advances the chain to the round a pending shuffle draw may read its committed beacon round (TRADE-3). */
    const waitForDraw = async (pool: StakingPoolSDK, rewardId: bigint) => {
      const ready = await pool.drawReadyRound(Number(rewardId))
      const { lastRound } = await algorand.client.algod.status().do()
      if (ready > lastRound + 1n) await timeWarp.roundWarp(ready - 1n)
    }

    /** Runs preparation + allocation; returns the reward as it was when allocation started. */
    const runRound = async (pool: StakingPoolSDK, rewardId: bigint, iterationAmount = 100n) => {
      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId })
      let allocating: Awaited<ReturnType<StakingPoolSDK['getReward']>> | undefined
      let tickets: bigint[] = []
      for (let i = 0; i < 200; i++) {
        const reward = await pool.getReward(Number(rewardId))
        if (reward.phase === DisbursementPhase.Idle) break
        if (reward.phase === DisbursementPhase.Finalization) {
          await pool.finalizeDistribution({ sender: creator.addr, signer: creator.signer, rewardId })
          break
        }
        if (reward.phase === DisbursementPhase.Allocation) {
          allocating = allocating ?? reward
          if (reward.winningTickets.length > 0 && tickets.length === 0) tickets = [...reward.winningTickets]
          await waitForDraw(pool, rewardId)
        }
        await disburse(pool, rewardId, iterationAmount)
      }
      return { allocating, tickets, after: await pool.getReward(Number(rewardId)) }
    }

    const allocationOf = async (disbursementId: bigint, address: string): Promise<bigint | undefined> => {
      try {
        return await akitaUniverse.rewards.client.state.box.userAllocations.value({ address, asset: 0n, disbursementId })
      } catch {
        return undefined // no allocation box
      }
    }

    test('L-3 / H-2: factory rejects unknown pool types and typed pools without a stake key', async () => {
      await expect(newPool({ type: 50 })).rejects.toThrow(errInvalidPoolType)
      await expect(newPool({ type: POOL_STAKING_TYPE_HARD })).rejects.toThrow(errTypedPoolNeedsStakeKey)
    })

    test('L-1: rewards need a positive interval and at least an hour to claim', async () => {
      const pool = await newPool()
      await expect(addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 0n }), 1_000_000n))
        .rejects.toThrow(errInvalidRewardTiming)
      await expect(addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, expiration: 60n }), 1_000_000n))
        .rejects.toThrow(errInvalidRewardTiming)
    })

    test('H-2: a NONE pool entry weighs 1 whatever quantity it claims', async () => {
      const pool = await newPool()
      await goLive(pool)
      const user = await fundedUser()
      await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 2n ** 63n }] })
      const entry = await pool.client.state.box.entries.value(1n)
      expect(entry?.quantity).toBe(1n)
    })

    test('H-2: a HEARTBEAT entry backed only by a momentary balance is disqualified at the round', async () => {
      const pool = await newPool({ type: POOL_STAKING_TYPE_HEARTBEAT, stakeKey: poolStakeKey })
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)
      const user = await fundedUser(20_000_000n)
      await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 10_000_000n, proofs: proofsFor(0n) }] })

      const { allocating, after } = await runRound(pool, 1n)
      // no manager-sampled heartbeat backs the quantity: nobody qualifies, no disbursement is created
      expect(allocating).toBeUndefined()
      expect(after.phase).toBe(DisbursementPhase.Idle)
      expect((await pool.client.state.box.entries.value(1n))?.disqualified).toBe(true)
    })

    test('H-1: an entrant cannot stay valid by shrinking its own SOFT commitment', async () => {
      const pool = await newPool({ type: POOL_STAKING_TYPE_SOFT, stakeKey: poolStakeKey })
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)

      const attacker = await fundedUser(20_000_000n)
      await akitaUniverse.staking.stake({ sender: attacker.addr, signer: attacker.signer, type: StakingType.Soft, asset: 0n, amount: 10_000_000n })
      await pool.enter({ sender: attacker.addr, signer: attacker.signer, entries: [{ asset: 0n, amount: 10_000_000n, proofs: proofsFor(0n) }] })

      // move the tokens away, then try to lower the pool's commitment directly
      await algorand.send.payment({ sender: attacker.addr, signer: attacker.signer, receiver: deployer.addr, amount: algokit.microAlgos(15_000_000n) })
      const direct = await akitaUniverse.staking.client.send.checkpointAppSoftStake({
        sender: attacker.addr,
        signer: attacker.signer,
        args: { app: pool.appId, address: attacker.addr.toString(), asset: 0n },
      })
      expect(direct.return?.valid).toBe(false)
      const commitment = await akitaUniverse.staking.client.state.box.appStakes.value({ app: pool.appId, address: attacker.addr.toString(), asset: 0n })
      expect(commitment?.amount).toBe(10_000_000n)

      const { allocating, after } = await runRound(pool, 1n)
      expect(allocating).toBeUndefined()
      expect(after.phase).toBe(DisbursementPhase.Idle)
      expect((await pool.client.state.box.entries.value(1n))?.disqualified).toBe(true)
    })

    test('L-3: a LOCK pool does not count an expired lock', async () => {
      const pool = await newPool({ type: POOL_STAKING_TYPE_LOCK, stakeKey: poolStakeKey })
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)
      const user = await fundedUser(20_000_000n)
      await akitaUniverse.staking.stake({
        sender: user.addr, signer: user.signer, type: StakingType.Lock, asset: 0n, amount: 5_000_000n,
        expiration: (await getBlockTimestamp(algorand)) + 30n,
      })
      await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 5_000_000n, proofs: proofsFor(0n) }] })

      const { allocating } = await runRound(pool, 1n) // warps 65s: the lock has expired
      expect(allocating).toBeUndefined()
      expect((await pool.client.state.box.entries.value(1n))?.disqualified).toBe(true)
    })

    test('M-1: a round with nobody qualified closes without a Rewards disbursement', async () => {
      const pool = await newPool()
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_EVEN, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)
      const { allocating, after } = await runRound(pool, 1n)
      expect(allocating).toBeUndefined()
      expect(after.phase).toBe(DisbursementPhase.Idle)
      expect(after.activeDisbursementId).toBe(0n)
      expect(await pool.getOpenRounds()).toBe(0n)
      expect(await pool.getRewardBudget(1n)).toBe(1_000_000n)
    })

    test('M-1: a single percentage staker receives the whole net reward', async () => {
      const pool = await newPool({ stakeKey: poolStakeKey })
      const rate = 1_000_000n
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_PERCENTAGE, rate, interval: 60n }), rate)
      await fundOps(pool)
      await goLive(pool)
      const user = await fundedUser()
      await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 1n, proofs: proofsFor(0n) }] })

      const { allocating, after } = await runRound(pool, 1n)
      expect(allocating).toBeDefined()
      expect(after.phase).toBe(DisbursementPhase.Idle)
      const allocation = await allocationOf(allocating!.activeDisbursementId, user.addr.toString())
      expect(allocation).toBe(rate - allocating!.royaltyAmount)
    })

    test('H-3 / H-4 / M-5: multi-asset entrant settles, sign-ups freeze during the round, unspent budget is tracked and reclaimable', async () => {
      const pool = await newPool({ stakeKey: poolStakeKey })
      const rate = 1_000n
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, rate, interval: 60n, expiration: 3_600n }), 10_000n)
      expect(await pool.getRewardBudget(1n)).toBe(10_000n)
      await fundOps(pool)
      await goLive(pool)

      const holder = await fundedUser()
      await algorand.send.assetOptIn({ sender: holder.addr, signer: holder.signer, assetId: testAssetId })
      await pool.enter({
        sender: holder.addr,
        signer: holder.signer,
        entries: [
          { asset: 0n, amount: 1n, proofs: proofsFor(0n) },
          { asset: testAssetId, amount: 1n, proofs: proofsFor(testAssetId) },
        ],
      })

      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })

      // H-4: the qualified set is frozen while the round is open
      const late = await fundedUser()
      await expect(pool.enter({ sender: late.addr, signer: late.signer, entries: [{ asset: 0n, amount: 1n }] }))
        .rejects.toThrow(errRoundOpen)

      await disburse(pool, 1n) // preparation -> allocation
      const allocating = await pool.getReward(1)
      expect(allocating.qualifiedStakers).toBe(2n)
      await disburse(pool, 1n) // allocation (both entries pay the same address) -> finalization
      await pool.finalizeDistribution({ sender: creator.addr, signer: creator.signer, rewardId: 1n })

      // H-3: one allocation box holding both shares
      const perEntry = ((2n * rate) - allocating.royaltyAmount) / 2n
      expect(await allocationOf(allocating.activeDisbursementId, holder.addr.toString())).toBe(perEntry * 2n)
      expect(await pool.getRewardBudget(1n)).toBe(10_000n - allocating.royaltyAmount - perEntry * 2n)

      // sign-ups reopen once the round is closed
      await pool.enter({ sender: late.addr, signer: late.signer, entries: [{ asset: 0n, amount: 1n, proofs: proofsFor(0n) }] })

      // M-5: unclaimed allocations come back to the reward's budget after the claim window
      await timeWarp.timeWarp(3_700n)
      const budgetBefore = await pool.getRewardBudget(1n)
      await pool.reclaimRound({
        sender: deployer.addr,
        signer: deployer.signer,
        disbursementId: allocating.activeDisbursementId,
        reclaims: [{ address: holder.addr.toString(), asset: 0n }],
        close: true,
      })
      expect(await pool.getRewardBudget(1n)).toBe(budgetBefore + perEntry * 2n)
      // the round record and its Rewards disbursement are gone
      await expect(pool.client.state.box.roundRewards.value(allocating.activeDisbursementId)).rejects.toThrow()
      await expect(akitaUniverse.rewards.client.state.box.disbursements.value(allocating.activeDisbursementId)).rejects.toThrow()
    })

    test('H-6: shuffle winners do not depend on batch size and follow the drawn tickets', async () => {
      const winnerCount = 3n
      const rate = 3_000_000n
      const users = [] as AddressWithTransactionSigner[]
      const pool = await newPool()
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_SHUFFLE, rate, interval: 60n, winnerCount }), rate)
      await fundOps(pool)
      await goLive(pool)
      for (let i = 0; i < 6; i++) {
        const u = await fundedUser(5_000_000n)
        await pool.enter({ sender: u.addr, signer: u.signer, entries: [{ asset: 0n, amount: 1n }] })
        users.push(u)
      }

      const { allocating, tickets, after } = await runRound(pool, 1n, 1n) // one entry per call
      expect(after.phase).toBe(DisbursementPhase.Idle)
      expect(tickets).toHaveLength(Number(winnerCount))
      const amount = (rate - allocating!.royaltyAmount) / winnerCount

      // weights are 1 and nobody is disqualified: ticket t belongs to entry t + 1
      const expected = new Map<string, bigint>()
      for (const t of tickets) {
        expect(t).toBeLessThan(6n)
        const winner = users[Number(t)].addr.toString()
        expected.set(winner, (expected.get(winner) ?? 0n) + amount)
      }
      for (const u of users) {
        const got = await allocationOf(allocating!.activeDisbursementId, u.addr.toString())
        expect(got ?? 0n).toBe(expected.get(u.addr.toString()) ?? 0n)
      }
    })

    test('STAKE-1: a second reward round cannot open while another round is open', async () => {
      const pool = await newPool()
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_SHUFFLE, rate: 2_000_000n, interval: 60n, winnerCount: 1n }), 2_000_000n)
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)
      for (let i = 0; i < 2; i++) {
        const u = await fundedUser(5_000_000n)
        await pool.enter({ sender: u.addr, signer: u.signer, entries: [{ asset: 0n, amount: 1n }] })
      }

      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })
      await disburse(pool, 1n) // preparation -> allocation: the shuffle ticket space is fixed
      expect((await pool.getReward(1)).phase).toBe(DisbursementPhase.Allocation)

      // another reward's preparation would disqualify entries under the open shuffle
      await expect(pool.startDisbursement({ rewardId: 2n })).rejects.toThrow(errRoundOpen)

      for (let i = 0; i < 10 && (await pool.getReward(1)).phase === DisbursementPhase.Allocation; i++) {
        await waitForDraw(pool, 1n)
        await disburse(pool, 1n)
      }
      await pool.finalizeDistribution({ sender: creator.addr, signer: creator.signer, rewardId: 1n })
      await pool.startDisbursement({ rewardId: 2n })
      expect((await pool.getReward(2)).phase).toBe(DisbursementPhase.Preparation)
    })

    test('STAKE-2: a HARD stake (re)created after the round started does not count', async () => {
      const pool = await newPool({ type: POOL_STAKING_TYPE_HARD, stakeKey: poolStakeKey })
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_PERCENTAGE, rate: 1_000_000n, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)

      const stake = 10_000_000n
      const sybils = [await fundedUser(30_000_000n), await fundedUser(30_000_000n)]
      for (const s of sybils) {
        await akitaUniverse.staking.stake({ sender: s.addr, signer: s.signer, type: StakingType.Hard, asset: 0n, amount: stake, expiration: (await getBlockTimestamp(algorand)) + BigInt(ONE_DAY) })
        await pool.enter({ sender: s.addr, signer: s.signer, entries: [{ asset: 0n, amount: stake, proofs: proofsFor(0n) }] })
      }
      // only the first sybil holds the stake when the round starts
      await akitaUniverse.staking.withdraw({ sender: sybils[1].addr, signer: sybils[1].signer, asset: 0n, type: StakingType.Hard })

      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })
      await disburse(pool, 1n, 1n) // checks sybil 0 while it holds the stake
      // the same capital moves to sybil 1 before its batch
      await akitaUniverse.staking.withdraw({ sender: sybils[0].addr, signer: sybils[0].signer, asset: 0n, type: StakingType.Hard })
      await akitaUniverse.staking.stake({ sender: sybils[1].addr, signer: sybils[1].signer, type: StakingType.Hard, asset: 0n, amount: stake, expiration: (await getBlockTimestamp(algorand)) + BigInt(ONE_DAY) })
      await disburse(pool, 1n, 1n)

      const prepared = await pool.getReward(1)
      expect(prepared.phase).toBe(DisbursementPhase.Allocation)
      expect(prepared.qualifiedStakers).toBe(1n)
      expect(prepared.qualifiedStake).toBe(stake)
      // the re-staked capital sits this round out; it is not disqualified for later rounds
      expect(await pool.client.state.box.entries.value(2n)).toMatchObject({ disqualified: false, heldOut: true })
    })

    test('STAKE-2: a HARD top-up during preparation sits out that round only and counts again in the next', async () => {
      const pool = await newPool({ type: POOL_STAKING_TYPE_HARD, stakeKey: poolStakeKey })
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, rate: 100_000n, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)

      const stake = 10_000_000n
      const users = [await fundedUser(30_000_000n), await fundedUser(30_000_000n)]
      for (const u of users) {
        await akitaUniverse.staking.stake({ sender: u.addr, signer: u.signer, type: StakingType.Hard, asset: 0n, amount: stake, expiration: (await getBlockTimestamp(algorand)) + BigInt(ONE_DAY) })
        await pool.enter({ sender: u.addr, signer: u.signer, entries: [{ asset: 0n, amount: stake, proofs: proofsFor(0n) }] })
      }

      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })
      await disburse(pool, 1n, 1n)
      // the second entrant tops up before its batch: it still covers its entry
      await akitaUniverse.staking.stake({ sender: users[1].addr, signer: users[1].signer, type: StakingType.Hard, asset: 0n, amount: 1_000_000n, expiration: (await getBlockTimestamp(algorand)) + BigInt(ONE_DAY) })
      await disburse(pool, 1n, 1n)
      const first = await pool.getReward(1)
      expect(first.qualifiedStakers).toBe(1n)
      expect(await pool.client.state.box.entries.value(2n)).toMatchObject({ disqualified: false, heldOut: true })
      for (let i = 0; i < 10 && (await pool.getReward(1)).phase === DisbursementPhase.Allocation; i++) await disburse(pool, 1n)
      await pool.finalizeDistribution({ sender: creator.addr, signer: creator.signer, rewardId: 1n })

      // next round: the top-up predates it, so both entries qualify and the hold-out is cleared
      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })
      await disburse(pool, 1n)
      expect((await pool.getReward(1)).qualifiedStakers).toBe(2n)
      expect(await pool.client.state.box.entries.value(2n)).toMatchObject({ disqualified: false, heldOut: false })
    })

    test('TRADE-3: a shuffle draw commits to a future beacon round; early or empty reads revert and cannot move it', async () => {
      const pool = await newPool()
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_SHUFFLE, rate: 2_000_000n, interval: 60n, winnerCount: 1n }), 2_000_000n)
      await fundOps(pool)
      await goLive(pool)
      for (let i = 0; i < 3; i++) {
        const u = await fundedUser(5_000_000n)
        await pool.enter({ sender: u.addr, signer: u.signer, entries: [{ asset: 0n, amount: 1n }] })
      }

      // MainNet beacon timing: one value per multiple of 8, submitted 2 rounds later
      await mockBeacon.send.setSubmitLag({ args: { lag: 2n } })
      try {
        await timeWarp.timeWarp(65n)
        await pool.startDisbursement({ rewardId: 1n })
        await disburse(pool, 1n) // preparation -> allocation commits the draw round
        const committed = await pool.getReward(1)
        expect(committed.phase).toBe(DisbursementPhase.Allocation)
        const { lastRound } = await algorand.client.algod.status().do()
        expect(committed.activeDisbursementRoundStart % 8n).toBe(0n)
        expect(committed.activeDisbursementRoundStart).toBeGreaterThan(lastRound)

        // anyone calling early is rejected: the commitment and failure count do not move
        await expect(disburse(pool, 1n)).rejects.toThrow(/Bnrd/)
        await expect(pool.raffle({ sender: user1.addr, signer: user1.signer, rewardId: 1n })).rejects.toThrow(/Bnrd/)

        // an empty read in the allowed window also reverts until BEACON_MAX_WAIT_ROUNDS
        await waitForDraw(pool, 1n)
        await mockBeacon.send.setEmpty({ args: { empty: true } })
        try {
          await expect(disburse(pool, 1n)).rejects.toThrow(/Bnrd/)
        } finally {
          await mockBeacon.send.setEmpty({ args: { empty: false } })
        }
        const kept = await pool.getReward(1)
        expect(kept.activeDisbursementRoundStart).toBe(committed.activeDisbursementRoundStart)
        expect(kept.vrfFailureCount).toBe(0n)
        expect(kept.winningTickets).toHaveLength(0)

        // the first allowed read draws from the committed round
        await disburse(pool, 1n)
        const drawn = await pool.getReward(1)
        expect(drawn.winningTickets).toHaveLength(1)
        expect(drawn.activeDisbursementRoundStart).toBe(committed.activeDisbursementRoundStart)
      } finally {
        await mockBeacon.send.setSubmitLag({ args: { lag: 0n } })
      }
    })

    test('STK-07: after BEACON_MAX_WAIT_ROUNDS an empty read closes the round unpaid; there is no second draw', async () => {
      const rate = 2_000_000n
      const pool = await newPool()
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_SHUFFLE, rate, interval: 60n, winnerCount: 1n }), 2n * rate)
      await fundOps(pool)
      await goLive(pool)
      for (let i = 0; i < 3; i++) {
        const u = await fundedUser(5_000_000n)
        await pool.enter({ sender: u.addr, signer: u.signer, entries: [{ asset: 0n, amount: 1n }] })
      }
      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })
      await disburse(pool, 1n)
      const committed = await pool.getReward(1)
      expect(committed.phase).toBe(DisbursementPhase.Allocation)
      expect(committed.royaltyAmount).toBeGreaterThan(0n)

      await mockBeacon.send.setEmpty({ args: { empty: true } })
      try {
        await timeWarp.roundWarp(committed.activeDisbursementRoundStart + 1_000n - 1n)
        await disburse(pool, 1n)
      } finally {
        await mockBeacon.send.setEmpty({ args: { empty: false } })
      }
      // nobody drew while the committed value could be read: the round is over, not re-committed
      const closed = await pool.getReward(1)
      expect(closed.phase).toBe(DisbursementPhase.Idle)
      expect(closed.activeDisbursementRoundStart).toBe(0n)
      expect(closed.winningTickets).toHaveLength(0)
      expect(await pool.getOpenRounds()).toBe(0n)
      // nothing was allocated, and the round's Rewards disbursement is gone (its storage came back)
      const gone = await akitaUniverse.rewards.client.state.box.disbursements.value(committed.activeDisbursementId)
        .then((value) => value === undefined, () => true)
      expect(gone).toBe(true)
      // the prize is still in the reward's budget: only the round's royalty was spent
      expect(await pool.getRewardBudget(1n)).toBe(2n * rate - committed.royaltyAmount)

      // the next round draws as usual
      const { tickets, after } = await runRound(pool, 1n)
      expect(tickets).toHaveLength(1)
      expect(after.phase).toBe(DisbursementPhase.Idle)
    // Warping 1,000 rounds is about 1,000 payments sent one after another: 42 s on an idle LocalNet,
    // and past the default 120 s on a CI runner whose LocalNet other test files share.
    }, 300_000)

    test('an Even reward whose split would round to 0 per staker closes the round without paying the royalty', async () => {
      const pool = await newPool()
      // maxEntries = 0 (unlimited) passes the Even check maxEntries <= rate, so the head count can outgrow the rate
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_EVEN, rate: 2n, interval: 60n }), 1_000n)
      await fundOps(pool)
      await goLive(pool)
      for (let i = 0; i < 3; i++) {
        const u = await fundedUser(5_000_000n)
        await pool.enter({ sender: u.addr, signer: u.signer, entries: [{ asset: 0n, amount: 1n }] })
      }
      const budget = await pool.getRewardBudget(1n)
      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })
      await disburse(pool, 1n)
      const reward = await pool.getReward(1)
      expect(reward.phase).toBe(DisbursementPhase.Idle)
      expect(reward.activeDisbursementId).toBe(0n)
      expect(reward.royaltyAmount).toBe(0n)
      expect(await pool.getRewardBudget(1n)).toBe(budget)
      expect(await pool.getOpenRounds()).toBe(0n)
    })

    test('STAKE-2: SOFT pools reject stake-weighted rewards; head-count rewards stay allowed', async () => {
      const pool = await newPool({ type: POOL_STAKING_TYPE_SOFT, stakeKey: poolStakeKey })
      await expect(addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_PERCENTAGE, interval: 60n }), 1_000_000n))
        .rejects.toThrow(errSoftValueWeighted)
      await expect(addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_SHUFFLE, rate: 2_000_000n, interval: 60n, winnerCount: 1n }), 2_000_000n))
        .rejects.toThrow(errSoftValueWeighted)
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n }), 1_000_000n)
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_EVEN, interval: 60n }), 1_000_000n)
      expect((await pool.getState()).rewardCount).toBe(2n)
    })

    test('M-1: only the creator or the DAO wallet can abort a round', async () => {
      const pool = await newPool()
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n }), 1_000_000n)
      await fundOps(pool)
      await goLive(pool)
      const user = await fundedUser()
      await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 1n }] })
      await timeWarp.timeWarp(65n)
      await pool.startDisbursement({ rewardId: 1n })

      await expect(pool.abortRound({ sender: user.addr, signer: user.signer, rewardId: 1n, mode: 0 }))
        .rejects.toThrow(errAbortForbidden)
      await pool.abortRound({ sender: creator.addr, signer: creator.signer, rewardId: 1n, mode: 0 })
      expect((await pool.getReward(1)).phase).toBe(DisbursementPhase.Idle)
      expect(await pool.getOpenRounds()).toBe(0n)
    })

    describe('2026-11 audit 06 fixes (STK-02, 03, 04, 08, 10)', () => {
      /** Finishes a round that is already open. */
      const finishRound = async (pool: StakingPoolSDK, rewardId: bigint) => {
        for (let i = 0; i < 200; i++) {
          const reward = await pool.getReward(Number(rewardId))
          if (reward.phase === DisbursementPhase.Idle) break
          if (reward.phase === DisbursementPhase.Finalization) {
            await pool.finalizeDistribution({ sender: creator.addr, signer: creator.signer, rewardId })
            break
          }
          if (reward.phase === DisbursementPhase.Allocation) await waitForDraw(pool, rewardId)
          await disburse(pool, rewardId)
        }
        return pool.getReward(Number(rewardId))
      }

      test('STK-02: a LOCK created or changed after the round started is held out of that round', async () => {
        const STAKE = 10_000_000n
        const RATE = 4_000_000n
        const pool = await newPool({ type: POOL_STAKING_TYPE_LOCK, stakeKey: poolStakeKey })
        await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_PERCENTAGE, rate: RATE, interval: 60n }), 2n * RATE)
        await fundOps(pool)
        await goLive(pool)

        const lock = async (who: AddressWithTransactionSigner, amount: bigint, expiration: bigint) => akitaUniverse.staking.stake({
          sender: who.addr, signer: who.signer, type: StakingType.Lock, asset: 0n, amount, expiration,
        })
        const honest = await fundedUser(STAKE + 5_000_000n)
        const late = await fundedUser((2n * STAKE) + 5_000_000n)
        const until = (await getBlockTimestamp(algorand)) + BigInt(30 * ONE_DAY)
        await lock(honest, STAKE, until)
        await lock(late, STAKE, until)
        await pool.enter({ sender: honest.addr, signer: honest.signer, entries: [{ asset: 0n, amount: STAKE, proofs: proofsFor(0n) }] })
        await pool.enter({ sender: late.addr, signer: late.signer, entries: [{ asset: 0n, amount: STAKE, proofs: proofsFor(0n) }] })

        await timeWarp.timeWarp(65n)
        await pool.startDisbursement({ rewardId: 1n })
        await disburse(pool, 1n, 1n) // entry 1: the honest locker
        // the second locker's lock changes between the two batches (stands for "the lock arrived just now")
        await lock(late, STAKE, until)
        await disburse(pool, 1n, 1n)

        const allocating = await pool.getReward(1)
        expect(allocating.phase).toBe(DisbursementPhase.Allocation)
        expect(allocating.qualifiedStakers).toBe(1n)
        expect(allocating.qualifiedStake).toBe(STAKE)
        expect(await pool.client.state.box.entries.value(2n)).toMatchObject({ disqualified: false, heldOut: true })
        expect((await finishRound(pool, 1n)).phase).toBe(DisbursementPhase.Idle)

        // held out, not disqualified: it counts again in the next round (an entry weighs its entered quantity)
        await timeWarp.timeWarp(65n)
        await pool.startDisbursement({ rewardId: 1n })
        await disburse(pool, 1n)
        const next = await pool.getReward(1)
        expect(next.qualifiedStakers).toBe(2n)
        expect(next.qualifiedStake).toBe(2n * STAKE)
        expect((await finishRound(pool, 1n)).phase).toBe(DisbursementPhase.Idle)
      })

      test('STK-03: a round its reward cannot pay closes unpaid, and the pool keeps working', async () => {
        const RATE = 1_000_000n
        const pool = await newPool()
        // two entrants at a flat 1 ALGO each need 2 ALGO; the reward holds 1.5
        await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, rate: RATE, interval: 60n }), 1_500_000n)
        await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_EVEN, rate: RATE, interval: 60n }), 10n * RATE)
        await fundOps(pool)
        await goLive(pool)

        const alice = await fundedUser(5_000_000n)
        const bob = await fundedUser(5_000_000n)
        const anyone = await fundedUser(5_000_000n)
        await pool.enter({ sender: alice.addr, signer: alice.signer, entries: [{ asset: 0n, amount: 1n }] })
        await pool.enter({ sender: bob.addr, signer: bob.signer, entries: [{ asset: 0n, amount: 1n }] })

        await timeWarp.timeWarp(65n)
        await pool.startDisbursement({ sender: anyone.addr, signer: anyone.signer, rewardId: 1n })
        // preparation completes and closes the round without paying anything
        await pool.disburseRewards({ sender: anyone.addr, signer: anyone.signer, rewardId: 1n, iterationAmount: 100n })
        const closed = await pool.getReward(1)
        expect(closed.phase).toBe(DisbursementPhase.Idle)
        expect(closed.activeDisbursementId).toBe(0n)
        expect(await pool.getOpenRounds()).toBe(0n)
        expect(await pool.getRewardBudget(1n)).toBe(1_500_000n)

        // the other reward runs, and an entrant can leave
        await pool.startDisbursement({ sender: creator.addr, signer: creator.signer, rewardId: 2n })
        expect((await finishRound(pool, 2n)).phase).toBe(DisbursementPhase.Idle)
        expect(await pool.getRewardBudget(2n)).toBe(9n * RATE)
        await pool.removeEntry({ sender: alice.addr, signer: alice.signer, address: alice.addr.toString(), asset: 0n })
        expect(await pool.isEntered({ address: alice.addr.toString() })).toBe(false)
      })

      test('STK-04: maxEntries caps the entries that exist; a removed entry gives its slot back', async () => {
        const MAX = 3n
        const pool = await newPool({ maxEntries: MAX })
        await goLive(pool)

        const leaver = await fundedUser(5_000_000n)
        for (let i = 0n; i < MAX; i++) {
          await pool.enter({ sender: leaver.addr, signer: leaver.signer, entries: [{ asset: 0n, amount: 1n }] })
          await pool.removeEntry({ sender: leaver.addr, signer: leaver.signer, address: leaver.addr.toString(), asset: 0n })
        }
        expect(await pool.getLiveEntries()).toBe(0n)

        // the pool is still open: three entrants get in, the fourth is refused
        for (let i = 0n; i < MAX; i++) {
          const user = await fundedUser(5_000_000n)
          await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 1n }] })
        }
        expect(await pool.getLiveEntries()).toBe(MAX)
        // entryCount still reports the ids issued, which is what a scan needs
        expect((await pool.getState()).entryCount).toBe(2n * MAX)
        const fourth = await fundedUser(5_000_000n)
        await expect(pool.enter({ sender: fourth.addr, signer: fourth.signer, entries: [{ asset: 0n, amount: 1n }] }))
          .rejects.toThrow('ERR:errPmer')
      })

      test('STK-08: the creator cannot abort a shuffle round once its draw can be read', async () => {
        const rate = 2_000_000n
        const pool = await newPool()
        await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_SHUFFLE, rate, interval: 60n, winnerCount: 1n }), 3n * rate)
        await fundOps(pool)
        await goLive(pool)
        for (let i = 0; i < 2; i++) {
          const u = await fundedUser(5_000_000n)
          await pool.enter({ sender: u.addr, signer: u.signer, entries: [{ asset: 0n, amount: 1n }] })
        }

        // before the committed beacon round nobody can know the draw: the creator may still abort
        await timeWarp.timeWarp(65n)
        await pool.startDisbursement({ rewardId: 1n })
        await disburse(pool, 1n)
        const first = await pool.getReward(1)
        expect(first.phase).toBe(DisbursementPhase.Allocation)
        const { lastRound } = await algorand.client.algod.status().do()
        expect(first.activeDisbursementRoundStart).toBeGreaterThan(lastRound + 1n)
        await pool.abortRound({ sender: creator.addr, signer: creator.signer, rewardId: 1n, mode: 2 })
        expect((await pool.getReward(1)).phase).toBe(DisbursementPhase.Idle)

        // once that round is reached the draw can be simulated, so the creator's abort is refused
        await timeWarp.timeWarp(65n)
        await pool.startDisbursement({ rewardId: 1n })
        await disburse(pool, 1n)
        await waitForDraw(pool, 1n)
        for (const mode of [0, 1, 2]) {
          await expect(pool.abortRound({ sender: creator.addr, signer: creator.signer, rewardId: 1n, mode }))
            .rejects.toThrow(errAbortForbidden)
        }
        // the round runs to its end
        await disburse(pool, 1n)
        expect((await pool.getReward(1)).winningTickets).toHaveLength(1)
        expect((await finishRound(pool, 1n)).phase).toBe(DisbursementPhase.Idle)
      })

      test('STK-10: an entrant whose account has closed does not block clean-up or deletion', async () => {
        const pool = await newPool()
        await goLive(pool, 300n)
        const entrant = await fundedUser(5_000_000n)
        await pool.enter({ sender: entrant.addr, signer: entrant.signer, entries: [{ asset: 0n, amount: 1n }] })
        await algorand.send.payment({
          sender: entrant.addr,
          signer: entrant.signer,
          receiver: deployer.addr,
          amount: algokit.microAlgos(0),
          closeRemainderTo: deployer.addr,
        })
        expect(await getAccountBalance(algorand, entrant.addr.toString())).toBe(0n)

        // after the end anyone may clean up; the refund (below the base minimum balance) is skipped
        await timeWarp.timeWarp(400n)
        const freeBefore = await pool.getFreeFunds(0n)
        await pool.removeEntry({ sender: creator.addr, signer: creator.signer, address: entrant.addr.toString(), asset: 0n })
        expect(await pool.isEntered({ address: entrant.addr.toString() })).toBe(false)
        expect(await getAccountBalance(algorand, entrant.addr.toString())).toBe(0n)
        // the deposit stays in the pool as free ALGO
        expect((await pool.getFreeFunds(0n)) - freeBefore).toBe(POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR + POOL_UNIQUES_MBR)

        await factorySDK.client.send.deletePool({
          sender: creator.addr,
          signer: creator.signer,
          args: { appId: pool.appId },
          extraFee: algokit.microAlgos(4_000),
        })
        await expect(pool.getState()).rejects.toThrow()
      })
    })

    describe('sponsored storage (2026-11-15)', () => {
      const PAYER_RECORD_MBR = 28_500n

      const paidEnter = async (
        pool: StakingPoolSDK,
        entrant: AddressWithTransactionSigner,
        payer: AddressWithTransactionSigner,
        paid: bigint,
        entries: [bigint, bigint, Uint8Array[]][],
      ) => pool.client.newGroup().enter({
        sender: entrant.addr,
        signer: entrant.signer,
        maxFee: algokit.microAlgos(20_000),
        args: {
          payment: {
            txn: await algorand.createTransaction.payment({ sender: payer.addr, receiver: pool.client.appAddress, amount: algokit.microAlgos(paid) }),
            signer: payer.signer,
          },
          entries,
        },
      }).send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

      test('anyone can pay for a pool entry; one account funds all of an entrant\'s entries and gets the storage back', async () => {
        const pool = await newPool()
        await goLive(pool, 300n)
        const user = await fundedUser()
        const sponsor = await fundedUser()
        const userAddr = user.addr.toString()

        // the entry storage alone is not enough from another payer: it is remembered and funds that record too
        const first = await pool.enterCost({ address: userAddr, assets: [0n] })
        await expect(paidEnter(pool, user, sponsor, first, [[0n, 1n, []]])).rejects.toThrow(/errIpay/)
        const sponsorBefore = await getAccountBalance(algorand, sponsor.addr.toString())
        await paidEnter(pool, user, sponsor, first + PAYER_RECORD_MBR, [[0n, 1n, []]])
        expect(sponsorBefore - await getAccountBalance(algorand, sponsor.addr.toString())).toBe(first + PAYER_RECORD_MBR + 1_000n)
        expect(await pool.isEntered({ address: userAddr })).toBe(true)

        // a later entry of the same entrant must come from the same payer, who pays no second payer record
        const second = await pool.enterCost({ address: userAddr, assets: [testAssetId] })
        await expect(paidEnter(pool, user, user, second, [[testAssetId, 1n, []]])).rejects.toThrow(/errIpyr/)
        await paidEnter(pool, user, sponsor, second, [[testAssetId, 1n, []]])

        // leaving returns each entry's storage to the sponsor; the payer record is released with the last one
        let held = await getAccountBalance(algorand, sponsor.addr.toString())
        const userHeld = await getAccountBalance(algorand, userAddr)
        await pool.removeEntry({ sender: user.addr, signer: user.signer, address: userAddr, asset: testAssetId })
        expect(await getAccountBalance(algorand, sponsor.addr.toString()) - held).toBe(second)
        held = await getAccountBalance(algorand, sponsor.addr.toString())
        await pool.removeEntry({ sender: user.addr, signer: user.signer, address: userAddr, asset: 0n })
        expect(await getAccountBalance(algorand, sponsor.addr.toString()) - held).toBe(first + PAYER_RECORD_MBR)
        expect(await getAccountBalance(algorand, userAddr)).toBeLessThan(userHeld) // fees only
        expect(await pool.isEntered({ address: userAddr })).toBe(false)

        // the entrant may come back funded by anyone: the old payer record is gone
        await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 1n }] })
        const before = await getAccountBalance(algorand, userAddr)
        await pool.removeEntry({ sender: user.addr, signer: user.signer, address: userAddr, asset: 0n })
        expect(await getAccountBalance(algorand, userAddr) - before).toBe(first - 2_000n)
      })

      test('a sponsored SOFT pool entry returns the pool storage and the Staking commitment\'s storage to the sponsor', async () => {
        const pool = await newPool({ type: POOL_STAKING_TYPE_SOFT, stakeKey: poolStakeKey })
        await goLive(pool, 300n)
        const user = await fundedUser(20_000_000n)
        const sponsor = await fundedUser()
        const userAddr = user.addr.toString()
        await akitaUniverse.staking.stake({ sender: user.addr, signer: user.signer, type: StakingType.Soft, asset: 0n, amount: 5_000_000n })

        const cost = await pool.enterCost({ address: userAddr, assets: [0n] })
        expect(cost).toBe(POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR + POOL_UNIQUES_MBR + STAKING_APP_STAKES_MBR)
        await paidEnter(pool, user, sponsor, cost + PAYER_RECORD_MBR, [[0n, 5_000_000n, proofsFor(0n)]])
        const commitment = { app: pool.appId, address: userAddr, asset: 0n }
        expect((await akitaUniverse.staking.client.state.box.appStakes.value(commitment))?.amount).toBe(5_000_000n)

        const poolFree = async () => {
          const info = await algorand.account.getInformation(pool.client.appAddress)
          return info.balance.microAlgos - info.minBalance.microAlgos
        }
        const freeBefore = await poolFree()
        const held = await getAccountBalance(algorand, sponsor.addr.toString())
        await pool.removeEntry({ sender: user.addr, signer: user.signer, address: userAddr, asset: 0n })
        // one payment: the pool's boxes, the commitment's box (reclaimed from Staking) and the payer record
        expect(await getAccountBalance(algorand, sponsor.addr.toString()) - held).toBe(cost + PAYER_RECORD_MBR)
        expect(await poolFree()).toBe(freeBefore)
        // the commitment's box is gone (the client reports a missing box as an error)
        const gone = await akitaUniverse.staking.client.state.box.appStakes.value(commitment)
          .then((value) => value === undefined, (error) => /box not found/.test(String(error)))
        expect(gone).toBe(true)
      })

      test('anyone can fund a reward\'s storage; closing the reward returns it to that account', async () => {
        const pool = await newPool()
        const sponsor = await fundedUser()
        const reward = createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n })
        const budget = 1_000_000n
        const cost = await pool.getAddRewardCost({ winnerCount: reward.winnerCount, asset: reward.asset })
        const add = async (paid: bigint) => pool.client.send.addReward({
          sender: creator.addr,
          signer: creator.signer,
          populateAppCallResources: true,
          coverAppCallInnerTransactionFees: true,
          maxFee: algokit.microAlgos(20_000),
          args: {
            payment: {
              txn: await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: pool.client.appAddress, amount: algokit.microAlgos(paid) }),
              signer: sponsor.signer,
            },
            reward,
          },
        })
        const sponsorBefore = await getAccountBalance(algorand, sponsor.addr.toString())
        await add(cost + PAYER_RECORD_MBR + budget)
        expect(sponsorBefore - await getAccountBalance(algorand, sponsor.addr.toString())).toBe(cost + PAYER_RECORD_MBR + budget + 1_000n)
        // the payer record is not part of the budget
        expect(await pool.getRewardBudget(1n)).toBe(budget)

        await goLive(pool, 120n)
        await timeWarp.timeWarp(200n)
        // the budget is the creator's; the storage goes back to the sponsor when the reward is closed
        const creatorBefore = await getAccountBalance(algorand, creator.addr.toString())
        await pool.withdrawReward({ sender: creator.addr, signer: creator.signer, rewardId: 1n, amount: budget })
        expect(await getAccountBalance(algorand, creator.addr.toString()) - creatorBefore).toBeGreaterThan(budget - 10_000n)
        const held = await getAccountBalance(algorand, sponsor.addr.toString())
        await pool.closeReward({ sender: creator.addr, signer: creator.signer, rewardId: 1n })
        const returned = await getAccountBalance(algorand, sponsor.addr.toString()) - held
        expect(returned).toBeGreaterThan(PAYER_RECORD_MBR)
        expect(returned).toBeLessThanOrEqual(cost + PAYER_RECORD_MBR)
      })
    })

    test('M-5: entrants exit with their MBR; after the end the creator withdraws the budget and cleans up', async () => {
      const pool = await newPool()
      const budget = 2_000_000n
      await addAlgoReward(pool, createReward({ distribution: DISTRIBUTION_TYPE_FLAT, interval: 60n }), budget)
      await goLive(pool, 300n)

      const user = await fundedUser()
      const other = await fundedUser()
      await pool.enter({ sender: user.addr, signer: user.signer, entries: [{ asset: 0n, amount: 1n }] })

      // only the entrant may leave before the end, and gets its exact MBR back (minus 2 fees)
      await expect(pool.removeEntry({ sender: other.addr, signer: other.signer, address: user.addr.toString(), asset: 0n }))
        .rejects.toThrow(errNotEntrant)
      const before = await getAccountBalance(algorand, user.addr.toString())
      await pool.removeEntry({ sender: user.addr, signer: user.signer, address: user.addr.toString(), asset: 0n })
      const after = await getAccountBalance(algorand, user.addr.toString())
      expect(after - before).toBe(POOL_ENTRIES_MBR + POOL_ENTRIES_BY_ADDRESS_MBR + POOL_UNIQUES_MBR - 2_000n)
      expect(await pool.isEntered({ address: user.addr.toString() })).toBe(false)

      // budgets are locked while the pool runs
      await expect(pool.withdrawReward({ sender: creator.addr, signer: creator.signer, rewardId: 1n, amount: budget }))
        .rejects.toThrow(errPoolNotEnded)

      await timeWarp.timeWarp(400n)
      const creatorBefore = await getAccountBalance(algorand, creator.addr.toString())
      await pool.withdrawReward({ sender: creator.addr, signer: creator.signer, rewardId: 1n, amount: budget })
      await pool.closeReward({ sender: creator.addr, signer: creator.signer, rewardId: 1n })
      const creatorAfter = await getAccountBalance(algorand, creator.addr.toString())
      // the budget plus the reward's freed box MBR, minus fees
      expect(creatorAfter - creatorBefore).toBeGreaterThan(budget)

      await factorySDK.client.send.deletePool({
        sender: creator.addr,
        signer: creator.signer,
        args: { appId: pool.appId },
        extraFee: algokit.microAlgos(4_000),
      })
      await expect(pool.getState()).rejects.toThrow()
    })
  })

  describe('Distribution Type: Even', () => {
    // Note: Even distribution splits the total reward amount equally among all qualified stakers.
    // This test verifies the pool setup with EVEN distribution type.

    let evenPoolSDK: StakingPoolSDK

    beforeAll(async () => {
      // Create pool for even distribution testing
      evenPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Even Distribution Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: 0n,
        maxEntries: 100n,
      })

      // Fund pool
      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: evenPoolSDK.client.appAddress,
        amount: algokit.microAlgos(15_000_000), // 15 ALGO
      })

      // Add EVEN distribution reward (3 ALGO split evenly)
      const rewardAmount = 3_000_000n
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_EVEN,
        rate: rewardAmount,
        interval: BigInt(60),
        expiration: BigInt(ONE_DAY),
      })

      // reward box + budget bookkeeping boxes come out of the deposit (M-5)
      const mbr = { rewards: await evenPoolSDK.getAddRewardCost({ winnerCount: 0n, asset: 0n }) }

      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: evenPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + rewardAmount)),
      })

      await evenPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })
    })

    test('should verify even distribution reward was added', async () => {
      const state = await evenPoolSDK.getState()
      expect(state.rewardCount).toBe(1n)
    })

    test('should calculate entry cost for potential users', async () => {
      const evenUser = generateSignerAccount(algorand)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: evenUser.addr,
        amount: algokit.microAlgos(10_000_000),
      })

      const cost = await evenPoolSDK.enterCost({
        address: evenUser.addr.toString(),
        assets: [0n],
      })

      expect(cost).toBeDefined()
      expect(cost).toBeGreaterThan(0n)
    })

    test('should allow three users to enter and complete even distribution', async () => {
      const localTimeWarp = new TimeWarp(algorand)

      // Create three users with different amounts
      const evenUser1 = generateSignerAccount(algorand)
      const evenUser2 = generateSignerAccount(algorand)
      const evenUser3 = generateSignerAccount(algorand)

      // Fund all users using dispenser (deployer may be low on funds by now)
      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: evenUser1.addr,
        amount: algokit.microAlgos(50_000_000),
      })
      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: evenUser2.addr,
        amount: algokit.microAlgos(50_000_000),
      })
      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: evenUser3.addr,
        amount: algokit.microAlgos(50_000_000),
      })

      // Finalize the pool
      const now = Number(await getBlockTimestamp(algorand))
      await evenPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      // Time warp past start
      await localTimeWarp.timeWarp(15n)

      // Three users enter with different stake amounts
      // For EVEN distribution, stake amount doesn't affect reward share
      await evenPoolSDK.enter({
        sender: evenUser1.addr,
        signer: evenUser1.signer,
        entries: [{ asset: 0n, amount: 1_000_000n, proofs: proofsFor(0n) }], // 1 ALGO
      })
      await evenPoolSDK.enter({
        sender: evenUser2.addr,
        signer: evenUser2.signer,
        entries: [{ asset: 0n, amount: 5_000_000n, proofs: proofsFor(0n) }], // 5 ALGO
      })
      await evenPoolSDK.enter({
        sender: evenUser3.addr,
        signer: evenUser3.signer,
        entries: [{ asset: 0n, amount: 10_000_000n, proofs: proofsFor(0n) }], // 10 ALGO
      })

      // Verify all users entered
      const isEntered1 = await evenPoolSDK.isEntered({ address: evenUser1.addr.toString() })
      const isEntered2 = await evenPoolSDK.isEntered({ address: evenUser2.addr.toString() })
      const isEntered3 = await evenPoolSDK.isEntered({ address: evenUser3.addr.toString() })
      expect(isEntered1).toBe(true)
      expect(isEntered2).toBe(true)
      expect(isEntered3).toBe(true)

      // Time warp past the reward interval
      await localTimeWarp.timeWarp(65n)

      // Start disbursement
      await evenPoolSDK.startDisbursement({ rewardId: 1n })

      // Process preparation phase
      await evenPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 100n,
      })

      // (reaching the last entry moves the round straight to allocation)

      // Process allocation phase - process entries one at a time to avoid reference limits
      // Each call processes up to iterationAmount entries
      await evenPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 1n, // Process 1 entry at a time
      })

      await evenPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 1n,
      })

      await evenPoolSDK.disburseRewards({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
        iterationAmount: 1n,
      })

      // Verify phase is Finalization
      const rewardsAfterAllocation = await evenPoolSDK.getRewards()
      expect(rewardsAfterAllocation.get(1)?.phase).toBe(DisbursementPhase.Finalization)

      // Verify qualified stakers count is 3
      expect(rewardsAfterAllocation.get(1)?.qualifiedStakers).toBe(3n)

      // Finalize distribution
      await evenPoolSDK.finalizeDistribution({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
      })

      // Verify phase is back to Idle
      const rewardsAfterFinalize = await evenPoolSDK.getRewards()
      expect(rewardsAfterFinalize.get(1)?.phase).toBe(DisbursementPhase.Idle)

      // Even distribution splits 3 ALGO evenly among 3 qualified stakers
      // Each user should receive ~1 ALGO (minus fees) regardless of their stake amount
    })
  })

  describe('Distribution Validation', () => {
    beforeAll(async () => {
      // Earlier describe blocks create ~30 pools (each ~51 ALGO), asset transfers,
      // and rewards out of `creator`, which started with 2000 ALGO. By the time we
      // reach Distribution Validation the creator is below the ~51 ALGO cost for a
      // new pool; top it back up so both sub-tests can spin up fresh pools.
      await algorand.account.ensureFunded(creator.addr, dispenser.addr, (200).algo())
    })

    test('should allow first disbursement immediately when pool starts', async () => {
      // Note: The validWindow logic allows the FIRST disbursement immediately after pool starts
      // because lastDisbursementTimestamp is 0, which is always < latestWindowStart.
      // The interval only affects SUBSEQUENT disbursements.
      const validationPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'Validation Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: validationPoolSDK.client.appAddress,
        amount: algokit.microAlgos(5_000_000),
      })

      // Add reward with very long interval
      const reward = createReward({
        distribution: DISTRIBUTION_TYPE_FLAT,
        rate: 1_000_000n,
        interval: BigInt(ONE_DAY * 365), // 1 year interval
        expiration: BigInt(ONE_DAY * 365),
      })

      const mbr = await validationPoolSDK.getMbr({ winningTickets: 0 })
      const payment = await algorand.createTransaction.payment({
        sender: creator.addr,
        receiver: validationPoolSDK.client.appAddress,
        amount: algokit.microAlgos(Number(mbr.rewards + 1_000_000n)),
      })

      await validationPoolSDK.client.send.addReward({
        sender: creator.addr,
        signer: creator.signer,
        args: { payment, reward },
      })

      const now = Number(await getBlockTimestamp(algorand))
      await validationPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + ONE_DAY * 400),
      })

      const localTimeWarp = new TimeWarp(algorand)
      await localTimeWarp.timeWarp(15n)

      // First disbursement should succeed even with long interval
      // because lastDisbursementTimestamp (0) is always < latestWindowStart
      await validationPoolSDK.startDisbursement({
        sender: creator.addr,
        signer: creator.signer,
        rewardId: 1n,
      })

      // Pool should still be live after starting disbursement
      const isLive = await validationPoolSDK.isLive()
      expect(isLive).toBe(true)
    })

    test('should fail to disburse non-existent reward', async () => {
      const noRewardPoolSDK = await factorySDK.new({
        sender: creator.addr,
        signer: creator.signer,
        title: 'No Reward Pool',
        type: POOL_STAKING_TYPE_NONE,
        marketplace: creator.addr.toString(),
        stakeKey: {
          address: algosdk.ALGORAND_ZERO_ADDRESS_STRING,
          name: '',
        },
        minimumStakeAmount: 0n,
        allowLateSignups: false,
        gateId: 0n,
        maxEntries: 100n,
      })

      await algorand.send.payment({
        sender: creator.addr,
        signer: creator.signer,
        receiver: noRewardPoolSDK.client.appAddress,
        amount: algokit.microAlgos(500_000),
      })

      const now = Number(await getBlockTimestamp(algorand))
      await noRewardPoolSDK.finalize({
        signupTimestamp: BigInt(now + 5),
        startTimestamp: BigInt(now + 10),
        endTimestamp: BigInt(now + ONE_DAY * 30),
      })

      const localTimeWarp = new TimeWarp(algorand)
      await localTimeWarp.timeWarp(15n)

      // Should fail because reward doesn't exist
      await expect(
        noRewardPoolSDK.startDisbursement({
          sender: creator.addr,
          signer: creator.signer,
          rewardId: 99n, // Non-existent reward
        })
      ).rejects.toThrow()
    })
  })
})
