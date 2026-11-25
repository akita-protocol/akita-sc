import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest'
import {
  AMENDMENT_MBR,
  BLOCKS_MBR,
  BOX_COST_PER_BYTE,
  CID_LENGTH,
  EDIT_BACK_REF_MBR,
  // Constants
  FOLLOWS_MBR,
  MIN_PAYWALL_MBR,
  MIN_POSTS_MBR,
  MODERATOR_ACTIVITY_MBR,
  MODERATORS_MBR,
  PAYWALL_PAY_OPTION_SIZE,
  PayWallType,
  REACTIONLIST_MBR,
  REACTION_RECORD_MBR,
  REACTIONS_MBR,
  RefType,
  REPLY_PARENT_REF_MBR,
  SocialSDK,
  VOTELIST_MBR,
  VOTES_MBR
} from 'akita-sdk/social'
import { StakingType } from 'akita-sdk/staking'
import algosdk from 'algosdk'
import {
  completeBalanceVerification,
  createExpectedCost,
  expectBalanceChange,
  MIN_TXN_FEE,
  verifyBalanceChange,
} from '../../tests/utils/balance'
import { AkitaSocialClient, AkitaSocialFactory } from '../artifacts/social/AkitaSocialClient'
import { AkitaSocialGraphClient, AkitaSocialGraphFactory } from '../artifacts/social/AkitaSocialGraphClient'
import { AkitaSocialImpactClient, AkitaSocialImpactFactory } from '../artifacts/social/AkitaSocialImpactClient'
import { AkitaSocialModerationFactory } from '../artifacts/social/AkitaSocialModerationClient'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

// ============================================================================
// Test Suite: Social Contracts Deployment
// ============================================================================
describe('Social Contracts Deployment', () => {
  let deployer: TransactionSignerAccount
  let socialClient: AkitaSocialClient
  let graphClient: AkitaSocialGraphClient
  let impactClient: AkitaSocialImpactClient
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

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    // Deploy AkitaSocialImpact contract
    const impactFactory = algorand.client.getTypedAppFactory(
      AkitaSocialImpactFactory,
      {
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      }
    )

    const impactResults = await impactFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })
    impactClient = impactResults.appClient

    // Deploy AkitaSocialGraph contract
    const graphFactory = algorand.client.getTypedAppFactory(
      AkitaSocialGraphFactory,
      {
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      }
    )

    const graphResults = await graphFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })
    graphClient = graphResults.appClient

    // Deploy AkitaSocial contract (now fits in 3 extra pages!)
    const socialFactory = algorand.client.getTypedAppFactory(
      AkitaSocialFactory,
      {
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      }
    )

    const socialResults = await socialFactory.send.create.create({
      // AkitaSocial is > 8 KB: its create transaction exceeds the flat minimum fee
      extraFee: algokit.microAlgo(1_000),
      args: {
        version: '0.0.1',
        akitaDao: 0n,
        akitaDaoEscrow: { name: '', app: 0n },
      }
    })
    socialClient = socialResults.appClient

  }, 180_000)

  test('should deploy AkitaSocialImpact contract', () => {
    expect(impactClient.appId).toBeGreaterThan(0n)
    expect(impactClient.appAddress).toBeDefined()
  })

  test('should deploy AkitaSocialGraph contract', () => {
    expect(graphClient.appId).toBeGreaterThan(0n)
    expect(graphClient.appAddress).toBeDefined()
  })

  test('should deploy AkitaSocial contract', () => {
    expect(socialClient.appId).toBeGreaterThan(0n)
    expect(socialClient.appAddress).toBeDefined()
  })

  test('all three contracts should have unique app IDs', () => {
    const appIds = [socialClient.appId, graphClient.appId, impactClient.appId]
    const uniqueIds = new Set(appIds)
    expect(uniqueIds.size).toBe(3)
  })

  test('AkitaSocial contract deploys within the AVM 13 program limit', () => {
    // > 8 KB since the principal-resolution legacy shims (PHASE-0-SPEC §7.2): the fixture reserves
    // 7 extra pages; legacy-abi.test.ts asserts approval + clear <= 16_384 bytes
    expect(socialClient.appId).toBeGreaterThan(0n)
  })
})

// ============================================================================
// Test Suite: SDK MBR Calculations (Comprehensive)
// ============================================================================
describe('SDK MBR Calculations', () => {
  let sdk: SocialSDK
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  let deployer: TransactionSignerAccount
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    // Deploy contracts
    const impactFactory = algorand.client.getTypedAppFactory(AkitaSocialImpactFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const impactResults = await impactFactory.send.create.create({ args: { akitaDao: 0n, version: '0.0.1' } })

    const graphFactory = algorand.client.getTypedAppFactory(AkitaSocialGraphFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const graphResults = await graphFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })

    const socialFactory = algorand.client.getTypedAppFactory(AkitaSocialFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const socialResults = await socialFactory.send.create.create({
      // AkitaSocial is > 8 KB: its create transaction exceeds the flat minimum fee
      extraFee: algokit.microAlgo(1_000),
      args: { version: '0.0.1', akitaDao: 0n, akitaDaoEscrow: { name: '', app: 0n } }
    })

    const moderationFactory = algorand.client.getTypedAppFactory(AkitaSocialModerationFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const moderationResults = await moderationFactory.send.create.create({
      args: { akitaDao: 0n, version: '0.0.1' }
    })

    sdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      graphFactoryParams: { appId: graphResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      impactFactoryParams: { appId: impactResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      moderationFactoryParams: { appId: moderationResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })
  }, 180_000)

  describe('calculatePostMBR', () => {
    test('should return correct value for standard 36-byte CID', () => {
      const mbr = sdk.calculatePostMBR(36)
      const expected = MIN_POSTS_MBR + (BOX_COST_PER_BYTE * 36n) + VOTES_MBR + VOTELIST_MBR
      expect(mbr).toBe(expected)
    })

    test('should return correct value for minimum CID (1 byte)', () => {
      const mbr = sdk.calculatePostMBR(1)
      const expected = MIN_POSTS_MBR + (BOX_COST_PER_BYTE * 1n) + VOTES_MBR + VOTELIST_MBR
      expect(mbr).toBe(expected)
    })

    test('should return correct value for large CID (100 bytes)', () => {
      const mbr = sdk.calculatePostMBR(100)
      const expected = MIN_POSTS_MBR + (BOX_COST_PER_BYTE * 100n) + VOTES_MBR + VOTELIST_MBR
      expect(mbr).toBe(expected)
    })

    test('should return correct value for zero-length CID', () => {
      const mbr = sdk.calculatePostMBR(0)
      const expected = MIN_POSTS_MBR + VOTES_MBR + VOTELIST_MBR
      expect(mbr).toBe(expected)
    })

    test('should add AMENDMENT_MBR and EDIT_BACK_REF_MBR when isAmendment is true', () => {
      const mbrNormal = sdk.calculatePostMBR(36, false)
      const mbrAmendment = sdk.calculatePostMBR(36, true)
      expect(mbrAmendment - mbrNormal).toBe(AMENDMENT_MBR + EDIT_BACK_REF_MBR)
    })

    test('should correctly calculate with default parameters', () => {
      const mbrDefault = sdk.calculatePostMBR()
      const mbrExplicit = sdk.calculatePostMBR(CID_LENGTH, false)
      expect(mbrDefault).toBe(mbrExplicit)
    })

    test('MBR should scale linearly with CID length', () => {
      const mbr10 = sdk.calculatePostMBR(10)
      const mbr20 = sdk.calculatePostMBR(20)
      const mbr30 = sdk.calculatePostMBR(30)
      expect(mbr20 - mbr10).toBe(10n * BOX_COST_PER_BYTE)
      expect(mbr30 - mbr20).toBe(10n * BOX_COST_PER_BYTE)
    })
  })

  describe('calculateReplyMBR', () => {
    test('should be post MBR plus the 32-byte parent ref', () => {
      const replyMbr = sdk.calculateReplyMBR(36, false, false)
      const postMbr = sdk.calculatePostMBR(36, false)
      expect(replyMbr).toBe(postMbr + REPLY_PARENT_REF_MBR)
    })

    test('needsEmptyPost adds the empty posts box a non-post parent gets on its first reply', () => {
      expect(sdk.calculateReplyMBR(36, false, true) - sdk.calculateReplyMBR(36, false, false)).toBe(MIN_POSTS_MBR)
    })

    test('should add the amendment and back-ref MBR for edits', () => {
      const mbrBase = sdk.calculateReplyMBR(36, false, false)
      const mbrAmendment = sdk.calculateReplyMBR(36, true, false)
      expect(mbrAmendment - mbrBase).toBe(AMENDMENT_MBR + EDIT_BACK_REF_MBR)
    })
  })

  describe('calculateVoteMBR', () => {
    test('should return VOTELIST_MBR for basic vote', () => {
      const mbr = sdk.calculateVoteMBR(false)
      expect(mbr).toBe(VOTELIST_MBR)
    })

    test('should add empty post MBR when needsEmptyPost is true', () => {
      const mbrWithout = sdk.calculateVoteMBR(false)
      const mbrWith = sdk.calculateVoteMBR(true)
      expect(mbrWith - mbrWithout).toBe(MIN_POSTS_MBR + VOTES_MBR)
    })

    test('should use default parameter correctly', () => {
      const mbrDefault = sdk.calculateVoteMBR()
      const mbrExplicit = sdk.calculateVoteMBR(false)
      expect(mbrDefault).toBe(mbrExplicit)
    })
  })

  describe('calculateReactMBR', () => {
    test('should include REACTIONS_MBR for first reaction with NFT', () => {
      expect(sdk.calculateReactMBR(true, false)).toBe(REACTION_RECORD_MBR + REACTIONS_MBR)
    })

    test('should only have REACTION_RECORD_MBR for subsequent reaction', () => {
      expect(sdk.calculateReactMBR(false, false)).toBe(REACTION_RECORD_MBR)
    })

    test('needsEmptyPost adds the empty posts box a non-post target gets on its first reaction', () => {
      expect(sdk.calculateReactMBR(true, true) - sdk.calculateReactMBR(true, false)).toBe(MIN_POSTS_MBR)
      expect(sdk.calculateReactMBR(false, true) - sdk.calculateReactMBR(false, false)).toBe(MIN_POSTS_MBR)
    })

    test('legacy reaction boxes are refunded at the old MBR', () => {
      expect(REACTIONLIST_MBR).toBe(18_900n)
      expect(REACTION_RECORD_MBR).toBe(15_700n)
    })
  })

  describe('calculatePayWallMBR', () => {
    test('should return minimum for 0 options', () => {
      const mbr = sdk.calculatePayWallMBR(0, 0)
      expect(mbr).toBe(MIN_PAYWALL_MBR)
    })

    test('should scale with number of user options', () => {
      const mbr0 = sdk.calculatePayWallMBR(0, 0)
      const mbr1 = sdk.calculatePayWallMBR(1, 0)
      const mbr2 = sdk.calculatePayWallMBR(2, 0)
      const mbr5 = sdk.calculatePayWallMBR(5, 0)

      expect(mbr1 - mbr0).toBe(BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE)
      expect(mbr2 - mbr1).toBe(BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE)
      expect(mbr5 - mbr0).toBe(5n * BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE)
    })

    test('should scale with number of agent options', () => {
      const mbr0 = sdk.calculatePayWallMBR(0, 0)
      const mbr1 = sdk.calculatePayWallMBR(0, 1)
      const mbr3 = sdk.calculatePayWallMBR(0, 3)

      expect(mbr1 - mbr0).toBe(BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE)
      expect(mbr3 - mbr0).toBe(3n * BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE)
    })

    test('should combine user and agent options', () => {
      const mbr = sdk.calculatePayWallMBR(2, 3)
      const expected = MIN_PAYWALL_MBR + (5n * BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE)
      expect(mbr).toBe(expected)
    })

    test('should handle large option counts', () => {
      const mbr = sdk.calculatePayWallMBR(10, 10)
      const expected = MIN_PAYWALL_MBR + (20n * BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE)
      expect(mbr).toBe(expected)
    })
  })

  describe('fixed edit MBR constants', () => {
    test('uses exact amendment and back-reference box costs', () => {
      expect(AMENDMENT_MBR).toBe(13_200n)
      expect(EDIT_BACK_REF_MBR).toBe(13_200n)
    })
  })
})

// ============================================================================
// Test Suite: SDK Configuration
// ============================================================================
describe('SDK Configuration', () => {
  let sdk: SocialSDK
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let user1: TransactionSignerAccount
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount }
  let socialAppId: bigint
  let graphAppId: bigint
  let impactAppId: bigint

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    user1 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    // Deploy contracts
    const impactFactory = algorand.client.getTypedAppFactory(AkitaSocialImpactFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const impactResults = await impactFactory.send.create.create({ args: { akitaDao: 0n, version: '0.0.1' } })
    impactAppId = impactResults.appClient.appId

    const graphFactory = algorand.client.getTypedAppFactory(AkitaSocialGraphFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const graphResults = await graphFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })
    graphAppId = graphResults.appClient.appId

    const socialFactory = algorand.client.getTypedAppFactory(AkitaSocialFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const socialResults = await socialFactory.send.create.create({
      // AkitaSocial is > 8 KB: its create transaction exceeds the flat minimum fee
      extraFee: algokit.microAlgo(1_000),
      args: { version: '0.0.1', akitaDao: 0n, akitaDaoEscrow: { name: '', app: 0n } }
    })
    socialAppId = socialResults.appClient.appId

    const moderationFactory = algorand.client.getTypedAppFactory(AkitaSocialModerationFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const moderationResults = await moderationFactory.send.create.create({
      args: { akitaDao: 0n, version: '0.0.1' }
    })

    sdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      graphFactoryParams: { appId: graphAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      impactFactoryParams: { appId: impactAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      moderationFactoryParams: { appId: moderationResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })
  }, 180_000)

  describe('setReaderAccount', () => {
    test('should update reader account', () => {
      const newReader = user1.addr.toString()
      sdk.setReaderAccount(newReader)
      expect(sdk.readerAccount).toBe(newReader)
    })
  })

  describe('setSendParams', () => {
    test('should update send params', () => {
      const newParams = { sender: user1.addr, signer: user1.signer }
      sdk.setSendParams(newParams)
      expect(sdk.sendParams.sender).toBe(user1.addr)
    })
  })
})

// ============================================================================
// Test Suite: Read Methods
// ============================================================================
describe('SDK Read Methods', () => {
  let sdk: SocialSDK
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  let deployer: TransactionSignerAccount
  let user1: TransactionSignerAccount
  let user2: TransactionSignerAccount
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    user1 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    user2 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    // Deploy contracts
    const impactFactory = algorand.client.getTypedAppFactory(AkitaSocialImpactFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const impactResults = await impactFactory.send.create.create({ args: { akitaDao: 0n, version: '0.0.1' } })

    const graphFactory = algorand.client.getTypedAppFactory(AkitaSocialGraphFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const graphResults = await graphFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })

    const socialFactory = algorand.client.getTypedAppFactory(AkitaSocialFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const socialResults = await socialFactory.send.create.create({
      // AkitaSocial is > 8 KB: its create transaction exceeds the flat minimum fee
      extraFee: algokit.microAlgo(1_000),
      args: { version: '0.0.1', akitaDao: 0n, akitaDaoEscrow: { name: '', app: 0n } }
    })

    const moderationFactory = algorand.client.getTypedAppFactory(AkitaSocialModerationFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const moderationResults = await moderationFactory.send.create.create({
      args: { akitaDao: 0n, version: '0.0.1' }
    })

    sdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      graphFactoryParams: { appId: graphResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      impactFactoryParams: { appId: impactResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      moderationFactoryParams: { appId: moderationResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })
  }, 180_000)

  describe('Graph Read Methods', () => {
    describe('isBlocked', () => {
      test('should return false for non-blocked users', async () => {
        const result = await sdk.isBlocked({
          user: user1.addr.toString(),
          blocked: user2.addr.toString(),
        })
        expect(result).toBe(false)
      })

      test('should work with different address pairs', async () => {
        const result1 = await sdk.isBlocked({ user: deployer.addr.toString(), blocked: user1.addr.toString() })
        const result2 = await sdk.isBlocked({ user: deployer.addr.toString(), blocked: user2.addr.toString() })
        const result3 = await sdk.isBlocked({ user: user1.addr.toString(), blocked: deployer.addr.toString() })

        expect(result1).toBe(false)
        expect(result2).toBe(false)
        expect(result3).toBe(false)
      })

      test('should accept optional sender/signer params', async () => {
        const result = await sdk.isBlocked({
          sender: user1.addr,
          signer: user1.signer,
          user: user1.addr.toString(),
          blocked: user2.addr.toString(),
        })
        expect(result).toBe(false)
      })
    })

    describe('isFollowing', () => {
      test('should return false for non-existent follow', async () => {
        const result = await sdk.isFollowing({
          follower: user2.addr.toString(),
          user: user1.addr.toString(),
        })
        expect(result).toBe(false)
      })
    })
  })

  describe('Impact Read Methods', () => {
    describe('getUserImpact', () => {
      // Impact reads require a fully-configured AkitaDAO. The fixture here deploys
      // contracts with akitaDao=0n, so these paths aren't testable without real DAO
      // setup. Previously these used try/catch + expect(true).toBe(true), which made
      // them pass-regardless. Marked todo until a DAO-configured fixture exists.
      test.todo('should return value for any address (requires configured DAO)')
      test.todo('should accept optional sender/signer (requires configured DAO)')
    })

    describe('getUserImpactWithoutSocial', () => {
      test.todo('should return value for any address (requires configured DAO)')
    })
  })

  describe('Social Read Methods', () => {
    describe('isBanned', () => {
      test('should return false for an unbanned account', async () => {
        // The SDK now talks directly to the moderation contract, so a
        // non-banned account simply resolves to false (rather than throwing
        // on missing DAO config as it did when the call was proxied through
        // AkitaSocial).
        await expect(sdk.isBanned({ account: user1.addr.toString() }))
          .resolves.toBe(false)
      })
    })

    describe('getMeta', () => {
      test('should throw for user without meta', async () => {
        await expect(sdk.getMeta({ user: user1.addr.toString() }))
          .rejects
          .toThrow()
      })
    })

    describe('getPost', () => {
      test('should throw for non-existent post', async () => {
        const fakeRef = new Uint8Array(32).fill(0)
        await expect(sdk.getPost({ ref: fakeRef }))
          .rejects
          .toThrow()
      })
    })

    describe('getVote', () => {
      test('should throw for non-existent vote', async () => {
        const fakeRef = new Uint8Array(32).fill(0)
        await expect(sdk.getVote({ account: user1.addr.toString(), ref: fakeRef }))
          .rejects
          .toThrow()
      })
    })

    describe('getModeratorMeta', () => {
      test('should return exists:false for non-moderator', async () => {
        // Non-moderator lookup should return a placeholder with exists=false, not throw.
        // If the SDK throws on missing boxes, that's a bug we want surfaced — so no try/catch.
        const result = await sdk.getModeratorMeta({ user: user1.addr.toString() })
        expect(result.exists).toBe(false)
      })
    })
  })
})

// ============================================================================
// Test Suite: Write Methods (Expected Failures without DAO)
// ============================================================================
describe('SDK Write Methods (without DAO)', () => {
  let sdk: SocialSDK
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  let deployer: TransactionSignerAccount
  let user1: TransactionSignerAccount
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    user1 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    // Deploy contracts
    const impactFactory = algorand.client.getTypedAppFactory(AkitaSocialImpactFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const impactResults = await impactFactory.send.create.create({ args: { akitaDao: 0n, version: '0.0.1' } })

    const graphFactory = algorand.client.getTypedAppFactory(AkitaSocialGraphFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const graphResults = await graphFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })
    // Fund for inner txns
    await graphResults.appClient.appClient.fundAppAccount({ amount: algokit.microAlgos(1_000_000) })

    const socialFactory = algorand.client.getTypedAppFactory(AkitaSocialFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const socialResults = await socialFactory.send.create.create({
      // AkitaSocial is > 8 KB: its create transaction exceeds the flat minimum fee
      extraFee: algokit.microAlgo(1_000),
      args: { version: '0.0.1', akitaDao: 0n, akitaDaoEscrow: { name: '', app: 0n } }
    })
    // Fund for inner txns
    await socialResults.appClient.appClient.fundAppAccount({ amount: algokit.microAlgos(1_000_000) })

    const moderationFactory = algorand.client.getTypedAppFactory(AkitaSocialModerationFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const moderationResults = await moderationFactory.send.create.create({
      args: { akitaDao: 0n, version: '0.0.1' }
    })

    sdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      graphFactoryParams: { appId: graphResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      impactFactoryParams: { appId: impactResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      moderationFactoryParams: { appId: moderationResults.appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })
  }, 180_000)

  // These tests verify the SDK methods are callable and handle errors appropriately
  // Full functionality requires a properly configured DAO with AKTA tokens

  describe('Meta Operations', () => {
    test('initMeta should throw without DAO configuration', async () => {
      await expect(sdk.initMeta({ user: deployer.addr.toString() }))
        .rejects
        .toThrow()
    })

    test('updateMeta should throw for user without meta', async () => {
      await expect(sdk.updateMeta({ followGateId: 0n }))
        .rejects
        .toThrow()
    })
  })

  describe('Post Operations', () => {
    const testCid = new Uint8Array(36).fill(1)
    const testTip = { aktaAssetId: 0n, tipAmount: 0n }

    test('post should throw without DAO configuration', async () => {
      await expect(sdk.post({ cid: testCid }))
        .rejects
        .toThrow()
    })

    test('editPost should throw without existing post', async () => {
      const amendment = new Uint8Array(32).fill(0)
      await expect(sdk.editPost({ cid: testCid, amendment }))
        .rejects
        .toThrow()
    })

    test('reply should throw without DAO configuration', async () => {
      const ref = new Uint8Array(32).fill(0)
      await expect(sdk.reply({
        cid: testCid,
        ref,
        refType: RefType.Post,
      })).rejects.toThrow()
    })
  })

  describe('Vote Operations', () => {
    const testRef = new Uint8Array(32).fill(0)
    const testTip = { aktaAssetId: 0n, tipAmount: 0n }

    test('vote should throw without DAO configuration', async () => {
      await expect(sdk.vote({
        ref: testRef,
        refType: RefType.Post,
        isUp: true,
      })).rejects.toThrow()
    })

    test('invertVote should throw for non-existent vote', async () => {
      await expect(sdk.invertVote({ ref: testRef }))
        .rejects
        .toThrow()
    })

    test('deleteVote should throw for non-existent vote', async () => {
      await expect(sdk.deleteVote({ ref: testRef }))
        .rejects
        .toThrow()
    })
  })

  describe('Reaction Operations', () => {
    const testRef = new Uint8Array(32).fill(0)

    test('react should throw without DAO configuration', async () => {
      await expect(sdk.react({
        ref: testRef,
        refType: RefType.Post,
        nft: 123n,
      })).rejects.toThrow()
    })

    test('deleteReaction should throw for non-existent reaction', async () => {
      await expect(sdk.deleteReaction({ ref: testRef, nft: 123n }))
        .rejects
        .toThrow()
    })
  })

  describe('Graph Operations', () => {
    test('follow should throw without DAO configuration', async () => {
      await expect(sdk.follow({ address: user1.addr.toString() }))
        .rejects
        .toThrow()
    })

    test('unfollow should throw for non-existent follow', async () => {
      await expect(sdk.unfollow({ address: user1.addr.toString() }))
        .rejects
        .toThrow()
    })

    test('block should throw without DAO configuration', async () => {
      await expect(sdk.block({ address: user1.addr.toString() }))
        .rejects
        .toThrow()
    })

    test('unblock should throw for non-existent block', async () => {
      await expect(sdk.unblock({ address: user1.addr.toString() }))
        .rejects
        .toThrow()
    })
  })

  describe('Moderation Operations', () => {
    test('addModerator should throw (requires DAO wallet)', async () => {
      await expect(sdk.addModerator({ address: user1.addr.toString() }))
        .rejects
        .toThrow()
    })

    test('removeModerator should throw for non-moderator', async () => {
      await expect(sdk.removeModerator({ address: user1.addr.toString() }))
        .rejects
        .toThrow()
    })

    test('ban should throw (requires moderator)', async () => {
      await expect(sdk.ban({ address: user1.addr.toString(), expiration: 0n }))
        .rejects
        .toThrow()
    })

    test('unban should throw for non-banned user', async () => {
      await expect(sdk.unban({ address: user1.addr.toString() }))
        .rejects
        .toThrow()
    })

    test('flagPost should throw for non-existent post', async () => {
      const fakeRef = new Uint8Array(32).fill(0)
      await expect(sdk.flagPost({ ref: fakeRef }))
        .rejects
        .toThrow()
    })

    test('unflagPost should throw for non-existent post', async () => {
      const fakeRef = new Uint8Array(32).fill(0)
      await expect(sdk.unflagPost({ ref: fakeRef }))
        .rejects
        .toThrow()
    })
  })

  describe('PayWall Operations', () => {
    test('createPayWall should succeed (does not require DAO)', async () => {
      // PayWall creation doesn't require DAO configuration - it just stores paywall options
      const payWallId = await sdk.createPayWall({
        userPayInfo: [{ type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 1000n }],
        agentPayInfo: []
      })
      expect(payWallId).toBeGreaterThan(0n)
    })

    test('createPayWall with multiple user options', async () => {
      const payWallId = await sdk.createPayWall({
        userPayInfo: [
          { type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 1000n },
          { type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 5000n },
          { type: PayWallType.Subscription, assetOrSubId: 1n, amount: 0n },
        ],
        agentPayInfo: []
      })
      expect(payWallId).toBeGreaterThan(0n)
    })

    test('createPayWall with agent options', async () => {
      const payWallId = await sdk.createPayWall({
        userPayInfo: [],
        agentPayInfo: [
          { type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 2000n },
        ]
      })
      expect(payWallId).toBeGreaterThan(0n)
    })

    test('createPayWall with both user and agent options', async () => {
      const payWallId = await sdk.createPayWall({
        userPayInfo: [{ type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 1000n }],
        agentPayInfo: [{ type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 500n }]
      })
      expect(payWallId).toBeGreaterThan(0n)
    })

  })

  describe('Action Operations', () => {
    test('addAction should throw (requires DAO wallet)', async () => {
      const content = new Uint8Array(36).fill(0)
      await expect(sdk.addAction({ actionAppId: 123n, content }))
        .rejects
        .toThrow()
    })

    test('removeAction should throw for non-existent action', async () => {
      await expect(sdk.removeAction({ actionAppId: 123n }))
        .rejects
        .toThrow()
    })
  })
})

// ============================================================================
// Test Suite: Success Cases with Full DAO Integration
// ============================================================================
describe('Social Operations Success Cases', () => {
  let deployer: TransactionSignerAccount
  let user1: TransactionSignerAccount
  let user2: TransactionSignerAccount
  let moderator: TransactionSignerAccount
  let socialClient: AkitaSocialClient
  let graphClient: AkitaSocialGraphClient
  let impactClient: AkitaSocialImpactClient
  let sdk: SocialSDK
  let user1Sdk: SocialSDK
  let user2Sdk: SocialSDK
  let moderatorSdk: SocialSDK
  let aktaAssetId: bigint
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount }
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  // Test data
  const testCid = new Uint8Array(36)
  for (let i = 0; i < 36; i++) testCid[i] = i + 1

  const testCid2 = new Uint8Array(36)
  for (let i = 0; i < 36; i++) testCid2[i] = i + 100

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    // Create accounts
    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000_000) })
    user1 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(1_000_000_000) })
    user2 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(1_000_000_000) })
    moderator = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(1_000_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (5000).algo())

    // Create AKTA token
    const assetCreateResult = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000_000_000_000_000n, // 1 quadrillion
      decimals: 6,
      assetName: 'Akita Inu',
      unitName: 'AKTA',
      defaultFrozen: false,
    })
    aktaAssetId = assetCreateResult.confirmation.assetIndex!

    // Opt users into AKTA
    for (const user of [user1, user2, moderator]) {
      await algorand.send.assetOptIn({
        sender: user.addr,
        signer: user.signer,
        assetId: aktaAssetId,
      })
      // Transfer AKTA to users
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: user.addr,
        assetId: aktaAssetId,
        amount: 10_000_000_000n, // 10,000 AKTA
      })
    }

    // Deploy Impact contract
    const impactFactory = algorand.client.getTypedAppFactory(AkitaSocialImpactFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const impactResults = await impactFactory.send.create.create({
      args: { akitaDao: 0n, version: '0.0.1' }
    })
    impactClient = impactResults.appClient

    // Deploy Graph contract
    const graphFactory = algorand.client.getTypedAppFactory(AkitaSocialGraphFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const graphResults = await graphFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })
    graphClient = graphResults.appClient
    await graphClient.appClient.fundAppAccount({ amount: algokit.microAlgos(10_000_000) })

    // Deploy Social contract
    const socialFactory = algorand.client.getTypedAppFactory(AkitaSocialFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const socialResults = await socialFactory.send.create.create({
      // AkitaSocial is > 8 KB: its create transaction exceeds the flat minimum fee
      extraFee: algokit.microAlgo(1_000),
      args: { version: '0.0.1', akitaDao: 0n, akitaDaoEscrow: { name: '', app: 0n } }
    })
    socialClient = socialResults.appClient
    await socialClient.appClient.fundAppAccount({ amount: algokit.microAlgos(10_000_000) })

    // Opt contracts into AKTA
    await algorand.send.assetOptIn({
      sender: deployer.addr,
      signer: deployer.signer,
      assetId: aktaAssetId,
    })

    // Deploy Moderation contract
    const moderationFactory = algorand.client.getTypedAppFactory(AkitaSocialModerationFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const moderationResults = await moderationFactory.send.create.create({
      args: { akitaDao: 0n, version: '0.0.1' }
    })
    const moderationAppId = moderationResults.appClient.appId

    // Create SDKs for each user
    sdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      graphFactoryParams: { appId: graphClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      impactFactoryParams: { appId: impactClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })

    user1Sdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialClient.appId, defaultSender: user1.addr, defaultSigner: user1.signer },
      graphFactoryParams: { appId: graphClient.appId, defaultSender: user1.addr, defaultSigner: user1.signer },
      impactFactoryParams: { appId: impactClient.appId, defaultSender: user1.addr, defaultSigner: user1.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: user1.addr, defaultSigner: user1.signer },
    })

    user2Sdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialClient.appId, defaultSender: user2.addr, defaultSigner: user2.signer },
      graphFactoryParams: { appId: graphClient.appId, defaultSender: user2.addr, defaultSigner: user2.signer },
      impactFactoryParams: { appId: impactClient.appId, defaultSender: user2.addr, defaultSigner: user2.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: user2.addr, defaultSigner: user2.signer },
    })

    moderatorSdk = new SocialSDK({
      algorand,
      socialFactoryParams: { appId: socialClient.appId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
      graphFactoryParams: { appId: graphClient.appId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
      impactFactoryParams: { appId: impactClient.appId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
    })

  }, 300_000)

  describe('Setup Verification', () => {
    test('all contracts should be deployed', () => {
      expect(socialClient.appId).toBeGreaterThan(0n)
      expect(graphClient.appId).toBeGreaterThan(0n)
      expect(impactClient.appId).toBeGreaterThan(0n)
    })

    test('AKTA token should be created', () => {
      expect(aktaAssetId).toBeGreaterThan(0n)
    })

    test('all SDKs should be initialized', () => {
      expect(sdk.socialAppId).toBe(socialClient.appId)
      expect(user1Sdk.socialAppId).toBe(socialClient.appId)
      expect(user2Sdk.socialAppId).toBe(socialClient.appId)
      expect(moderatorSdk.socialAppId).toBe(socialClient.appId)
    })
  })

  describe('PayWall Operations (Success)', () => {
    let payWallId1: bigint
    let payWallId2: bigint

    test('should create paywall with one-time payment option', async () => {
      payWallId1 = await sdk.createPayWall({
        userPayInfo: [{ type: PayWallType.OneTimePayment, assetOrSubId: aktaAssetId, amount: 1000000n }],
        agentPayInfo: []
      })
      expect(payWallId1).toBeGreaterThan(0n)
    })

    test('should create paywall with multiple options', async () => {
      payWallId2 = await sdk.createPayWall({
        userPayInfo: [
          { type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 100000n },
          { type: PayWallType.OneTimePayment, assetOrSubId: aktaAssetId, amount: 50000n },
        ],
        agentPayInfo: [
          { type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 200000n },
        ]
      })
      expect(payWallId2).toBeGreaterThan(payWallId1)
    })

    test('paywall IDs should be sequential', async () => {
      const payWallId3 = await sdk.createPayWall({
        userPayInfo: [{ type: PayWallType.Subscription, assetOrSubId: 1n, amount: 0n }],
        agentPayInfo: []
      })
      expect(payWallId3).toBe(payWallId2 + 1n)
    })
  })

  describe('Graph Read Operations (Success)', () => {
    test('isBlocked should return false for users who have not blocked each other', async () => {
      const blocked = await sdk.isBlocked({
        user: user1.addr.toString(),
        blocked: user2.addr.toString()
      })
      expect(blocked).toBe(false)
    })

    test('isBlocked should work with swapped users', async () => {
      const blocked = await sdk.isBlocked({
        user: user2.addr.toString(),
        blocked: user1.addr.toString()
      })
      expect(blocked).toBe(false)
    })
  })

  describe('Impact Read Operations (Success)', () => {
    // Same DAO-config caveat as in 'SDK Read Methods > Impact Read Methods'.
    test.todo('getUserImpact should return a value (requires configured DAO)')
    test.todo('getUserImpactWithoutSocial should return a value (requires configured DAO)')
  })

  // Note: The following tests document expected behavior with a fully configured DAO
  // They may fail in standalone testing due to missing DAO configuration
  // But they verify the SDK methods are properly structured

  describe('MBR Calculation Verification', () => {
    test('post MBR should match expected formula', () => {
      const mbr = sdk.calculatePostMBR(36)
      // posts box (47,300 + 400 * 36) + votes (19,300) + votelist (19,300) = 100,300.
      // S-05: MIN_POSTS_MBR was 46,500, which left the ref length prefix unfunded.
      expect(mbr).toBe(100_300n)
    })

    test('vote MBR should be votelist MBR', () => {
      const mbr = sdk.calculateVoteMBR()
      expect(mbr).toBe(VOTELIST_MBR)
    })

    test('react MBR for first reaction should include both components', () => {
      const mbrFirst = sdk.calculateReactMBR(true)
      const mbrSubsequent = sdk.calculateReactMBR(false)
      expect(mbrFirst).toBe(REACTION_RECORD_MBR + REACTIONS_MBR)
      expect(mbrSubsequent).toBe(REACTION_RECORD_MBR)
    })

    test('follow MBR should be fixed', () => {
      expect(sdk.calculateFollowMBR()).toBe(FOLLOWS_MBR)
    })

    test('block MBR should be fixed', () => {
      expect(sdk.calculateBlockMBR()).toBe(BLOCKS_MBR)
    })
  })
})

// ============================================================================
// Test Suite: Direct Contract Tests (bypassing SDK for edge cases)
// ============================================================================
describe('Direct Contract Operations', () => {
  let deployer: TransactionSignerAccount
  let graphClient: AkitaSocialGraphClient
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount }
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    // Deploy Graph contract for direct testing
    const graphFactory = algorand.client.getTypedAppFactory(AkitaSocialGraphFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    const graphResults = await graphFactory.send.create.create({
      args: {
        akitaDao: 0n,
        version: '0.0.1',
      }
    })
    graphClient = graphResults.appClient

  }, 180_000)

  test('graph contract should deploy successfully', () => {
    expect(graphClient.appId).toBeGreaterThan(0n)
  })

  test('graph contract should have correct app address', () => {
    expect(graphClient.appAddress).toBeDefined()
    expect(graphClient.appAddress.toString()).toMatch(/^[A-Z2-7]{58}$/)
  })

  test('isBlocked read method should work directly on client', async () => {
    const deployer2 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) })
    const result = await graphClient.isBlocked({
      args: {
        user: deployer.addr.toString(),
        blocked: deployer2.addr.toString()
      }
    })
    expect(result).toBe(false)
  })
})

// ============================================================================
// Test Suite: Full Integration with Akita Universe (requires full DAO)
// ============================================================================
import { ProposalActionEnum } from 'akita-sdk/dao'
import { Operator } from 'akita-sdk/gates'
import type { ModeratorActivityGateClient } from '../artifacts/gates/sub-gates/moderator-activity/ModeratorActivityGateClient'
import type { SocialModeratorGateClient } from '../artifacts/gates/sub-gates/social-moderator/SocialModeratorGateClient'
import { sendPrepared } from 'akita-sdk'
import { CallerType } from 'akita-sdk/wallet'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { TimeWarp } from '../../tests/utils/time'
import { getAppFundingNeeded, proposeAndExecute } from '../../scripts/utils'
import {
  DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL,
  DEFAULT_UPDATE_AKITA_DAO_DURATION,
  DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION,
  DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
} from '../utils/defaults'
import { errInvalidPaymentAmount } from '../utils/errors'
import { errAlreadyBlocked, errAlreadyReacted, errBanned, errHasGate, errHaventVoted, errInvalidModifier, errInvalidPayment, errNotSelfMeta } from './errors'

// NOTE: These tests require buildAkitaUniverse which takes 5-10 minutes
describe('Full DAO Integration Tests', () => {
  let deployer: TransactionSignerAccount
  let user1: TransactionSignerAccount
  let user2: TransactionSignerAccount
  let moderator: TransactionSignerAccount
  let daoSdk: SocialSDK
  let user1Sdk: SocialSDK
  let user2Sdk: SocialSDK
  let moderatorSdk: SocialSDK
  let aktaAssetId: bigint
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount }
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  let akitaUniverse: AkitaUniverse
  let postRef1: Uint8Array
  let payWallId: bigint
  let socialAppId: bigint
  let graphAppId: bigint
  let impactAppId: bigint

  /** Top-level transactions `sender` signed in the blocks after `fromRound`, in group order (read from algod). */
  async function senderTxnsSince(sender: string, fromRound: bigint): Promise<algosdk.Transaction[]> {
    const { lastRound } = await algorand.client.algod.status().do()
    const txns: algosdk.Transaction[] = []
    for (let round = fromRound + 1n; round <= lastRound; round++) {
      const { block } = await algorand.client.algod.block(round).do()
      for (const stib of block.payset) {
        const txn = stib.signedTxn.signedTxn.txn
        if (txn.sender.toString() === sender) txns.push(txn)
      }
    }
    return txns
  }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()

    // Create accounts
    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000_000) })
    user1 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    user2 = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
    moderator = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (5000).algo())

    // Create AKTA token BEFORE building universe so escrows can be opted in
    const assetCreateResult = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000_000_000_000_000n,
      decimals: 6,
      assetName: 'Akita Inu Test',
      unitName: 'AKTA',
      defaultFrozen: false,
    })
    aktaAssetId = assetCreateResult.confirmation.assetIndex!

    // Build Akita Universe with AKTA asset ID (escrows will be opted into AKTA during setup)
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
      aktaAssetId
    })

    // Set social fees for testing (AKTA asset is already set in buildAkitaUniverse)
    await akitaUniverse.dao.client.appClient.fundAppAccount({ amount: algokit.microAlgos(5_000_000) })
    const { return: feesProposalId } = await akitaUniverse.dao.newProposal({
      actions: [
        {
          type: ProposalActionEnum.UpdateFields,
          field: 'social_fees',
          value: { postFee: 100_000_000n, reactFee: 10_000_000n, impactTaxMin: 0n, impactTaxMax: 100n }
        }
      ]
    })
    if (feesProposalId !== undefined) {
      await akitaUniverse.dao.executeProposal({ proposalId: feesProposalId })
    }

    // Use social contracts from akitaUniverse (properly configured with correct escrow)
    socialAppId = akitaUniverse.social.socialAppId
    graphAppId = akitaUniverse.social.graphAppId
    impactAppId = akitaUniverse.social.impactAppId
    const moderationAppId = akitaUniverse.social.moderationAppId

    // Opt users into AKTA and fund them
    // When we create the AKTA token, deployer is the creator and has all tokens
    for (const user of [user1, user2, moderator]) {
      await algorand.send.assetOptIn({
        sender: user.addr,
        signer: user.signer,
        assetId: aktaAssetId,
      })
      // Transfer AKTA from deployer to users
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: user.addr,
        assetId: aktaAssetId,
        amount: 100_000_000_000n, // 100,000 AKTA (6 decimals)
      })
    }

    // Create SDKs - pass daoAppId for full integration tests
    const daoAppId = akitaUniverse.dao.client.appId

    daoSdk = new SocialSDK({
      algorand,
      daoAppId,
      socialFactoryParams: { appId: socialAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      graphFactoryParams: { appId: graphAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      impactFactoryParams: { appId: impactAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })

    user1Sdk = new SocialSDK({
      algorand,
      daoAppId,
      socialFactoryParams: { appId: socialAppId, defaultSender: user1.addr, defaultSigner: user1.signer },
      graphFactoryParams: { appId: graphAppId, defaultSender: user1.addr, defaultSigner: user1.signer },
      impactFactoryParams: { appId: impactAppId, defaultSender: user1.addr, defaultSigner: user1.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: user1.addr, defaultSigner: user1.signer },
    })

    user2Sdk = new SocialSDK({
      algorand,
      daoAppId,
      socialFactoryParams: { appId: socialAppId, defaultSender: user2.addr, defaultSigner: user2.signer },
      graphFactoryParams: { appId: graphAppId, defaultSender: user2.addr, defaultSigner: user2.signer },
      impactFactoryParams: { appId: impactAppId, defaultSender: user2.addr, defaultSigner: user2.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: user2.addr, defaultSigner: user2.signer },
    })

    moderatorSdk = new SocialSDK({
      algorand,
      daoAppId,
      socialFactoryParams: { appId: socialAppId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
      graphFactoryParams: { appId: graphAppId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
      impactFactoryParams: { appId: impactAppId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
      moderationFactoryParams: { appId: moderationAppId, defaultSender: moderator.addr, defaultSigner: moderator.signer },
    })

    // Initialize social contract to opt into AKTA (required for tip payments)
    try {
      await daoSdk.init()
    } catch (e) {
      console.log('Init failed (may already be opted in):', e)
    }

    // Note: Tests now use ALGO (asset ID 0) for tips to avoid escrow opt-in complexity
    // AKTA opt-in would require using the revenue manager plugin on the escrow
    // which requires proper plugin installation and execution through the DAO wallet

  }, 600_000) // 10 minute timeout for full setup

  describe('DAO Setup Verification', () => {
    test('akita universe should be created', () => {
      expect(akitaUniverse).toBeDefined()
      expect(akitaUniverse.dao).toBeDefined()
    })

    test('social contracts should be deployed', () => {
      expect(socialAppId).toBeGreaterThan(0n)
      expect(graphAppId).toBeGreaterThan(0n)
      expect(impactAppId).toBeGreaterThan(0n)
    })

    test('AKTA token should exist', () => {
      expect(aktaAssetId).toBeGreaterThan(0n)
    })

    test('social fees should be configured', async () => {
      const socialFees = await akitaUniverse.dao.client.state.global.socialFees()
      expect(socialFees?.postFee).toBe(100_000_000n)
      expect(socialFees?.reactFee).toBe(10_000_000n)
    })

    test('DAO app list should have social contracts', async () => {
      const appList = await akitaUniverse.dao.client.state.global.akitaSocialAppList()
      expect(appList?.social).toBe(socialAppId)
      expect(appList?.graph).toBe(graphAppId)
      expect(appList?.impact).toBe(impactAppId)
    })
  })

  describe('Meta Operations (Success)', () => {
    test('initMeta should initialize user1 metadata', async () => {
      // Get expected cost (MBR for meta initialization)
      // Account for: app call fee + payment transaction fee + inner transaction fees
      // Note: initMeta has 1 inner payment transaction + 1 abiCall (which may create inner transactions)
      const expectedPayment = user1Sdk.calculateMetaMBR()
      const expectedCost = createExpectedCost(expectedPayment, 1, MIN_TXN_FEE * 2n) // 1 inner payment + payment transaction; hint 0 resolves the sender with no EscrowFactory lookup (principal resolution)
      const verification = await verifyBalanceChange(
        algorand,
        user1.addr.toString(),
        expectedCost,
        'initMeta for user1'
      )

      const streak = await user1Sdk.initMeta({ user: user1.addr.toString() })

      // Verify balance change matches expected cost
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user1.addr.toString()
      )
      expectBalanceChange(completed, 'initMeta for user1')
      expect(completed.actualCost).toBe(expectedCost.total)

      expect(streak).toBe(1n)
    })

    test('getMeta should return initialized metadata for user1', async () => {
      const meta = await user1Sdk.getMeta({ user: user1.addr.toString() })
      expect(meta.streak).toBe(1n)
    })

    test('initMeta should initialize user2 metadata', async () => {
      const streak = await user2Sdk.initMeta({ user: user2.addr.toString() })
      expect(streak).toBe(1n)
    })

    test('initMeta should initialize moderator metadata', async () => {
      const streak = await moderatorSdk.initMeta({ user: moderator.addr.toString() })
      expect(streak).toBe(1n)
    })

    test('updateMeta should update metadata fields', async () => {
      // First create a paywall since updateMeta validates the defaultPayWallId
      const payWallId = await user1Sdk.createPayWall({
        userPayInfo: [{ type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 1000n }],
        agentPayInfo: []
      })
      await user1Sdk.updateMeta({ followGateId: 0n, defaultPayWallId: payWallId })
      const meta = await user1Sdk.getMeta({ user: user1.addr.toString() })
      expect(meta).toBeDefined()
      expect(meta.defaultPayWallId).toBe(payWallId)
    })
  })

  describe('PayWall Operations (Success)', () => {
    test('createPayWall with AKTA payment option', async () => {
      // Get expected cost (MBR for paywall)
      // Account for: app call fee + payment transaction fee
      const mbrAmount = user1Sdk.calculatePayWallMBR(1, 0) // 1 user option, 0 agent options
      const expectedCost = createExpectedCost(mbrAmount, 0, MIN_TXN_FEE)
      const verification = await verifyBalanceChange(
        algorand,
        user1.addr.toString(),
        expectedCost,
        'createPayWall with AKTA payment option'
      )

      payWallId = await user1Sdk.createPayWall({
        userPayInfo: [{ type: PayWallType.OneTimePayment, assetOrSubId: aktaAssetId, amount: 1_000_000n }],
        agentPayInfo: []
      })

      // Verify balance change matches expected cost
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user1.addr.toString()
      )
      expectBalanceChange(completed, 'createPayWall with AKTA payment option')
      expect(completed.actualCost).toBe(expectedCost.total)

      expect(payWallId).toBeGreaterThan(0n)
    })

    test('createPayWall with multiple options', async () => {
      // Get expected cost (MBR for paywall with multiple options)
      // Account for: app call fee + payment transaction fee
      const mbrAmount = user1Sdk.calculatePayWallMBR(2, 1) // 2 user options, 1 agent option
      const expectedCost = createExpectedCost(mbrAmount, 0, MIN_TXN_FEE)
      const verification = await verifyBalanceChange(
        algorand,
        user1.addr.toString(),
        expectedCost,
        'createPayWall with multiple options'
      )

      const id = await user1Sdk.createPayWall({
        userPayInfo: [
          { type: PayWallType.OneTimePayment, assetOrSubId: 0n, amount: 100000n },
          { type: PayWallType.OneTimePayment, assetOrSubId: aktaAssetId, amount: 50000n },
        ],
        agentPayInfo: [
          { type: PayWallType.Subscription, assetOrSubId: 1n, amount: 0n },
        ]
      })

      // Verify balance change matches expected cost
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user1.addr.toString()
      )
      expectBalanceChange(completed, 'createPayWall with multiple options')
      expect(completed.actualCost).toBe(expectedCost.total)

      expect(id).toBeGreaterThan(payWallId)
    })
  })

  describe('Post Operations (Success)', () => {
    const testCid = new Uint8Array(36).fill(42)

    test('post should create a new post', async () => {
      // Get expected cost (MBR payment in ALGO + transaction fees)
      // Note: postFee is paid in AKTA via asset transfer, not included in ALGO payment
      // Account for the composed payment, asset-transfer, and app-call group,
      // including covered inner transactions and simulator-selected carriers.
      const mbrAmount = user1Sdk.calculatePostMBR(testCid.length, false)
      const expectedCost = createExpectedCost(mbrAmount, 0, MIN_TXN_FEE * 8n) // no escrow-factory referral lookup: audit removed the quote lookup, principal resolution the payment lookup
      const verification = await verifyBalanceChange(
        algorand,
        user1.addr.toString(),
        expectedCost,
        'create post'
      )

      const result = await user1Sdk.post({ cid: testCid })
      postRef1 = result.postKey // Capture the computed post key

      // Verify balance change matches expected cost (MBR + fees)
      // Note: postFee is paid separately in AKTA, not ALGO
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user1.addr.toString()
      )
      expectBalanceChange(completed, 'create post')
      expect(completed.actualCost).toBe(expectedCost.total)

      expect(postRef1).toHaveLength(32)
    })

    test('post with paywall', async () => {
      const testCid2 = new Uint8Array(36).fill(43)
      const result = await user1Sdk.post({
        cid: testCid2,
        payWallId,
        usePayWall: true,
      })
      expect(result.postKey).toHaveLength(32)
    })

    test('post with gate (gateId 0 = no gate)', async () => {
      const testCid3 = new Uint8Array(36).fill(44)
      const result = await user1Sdk.post({
        cid: testCid3,
        gateId: 0n,
      })
      expect(result.postKey).toHaveLength(32)
    })
  })

  describe('Reply Operations (Success)', () => {
    test('reply to a post', async () => {
      const replyCid = new Uint8Array(36).fill(50)
      // Get expected cost (MBR for reply)
      // Note: reactFee is paid in AKTA via asset transfer, not included in ALGO payment
      // Account for the composed payment, asset-transfer, and app-call group,
      // including covered inner transactions and simulator-selected carriers.
      const mbrAmount = user2Sdk.calculateReplyMBR(replyCid.length, false, false)
      // pay + axfer + reply call (own fee + 10 inner txns; no escrow-factory referral lookup: the audit
      // removed the quote lookup, principal resolution the payment lookup) + ONE resource carrier.
      // The reply needs 31 Access entries (max 16 per call): the reply call plus one carrier.
      // Before 2026-10-04 the SDK packed the resources in the order algod's simulate reported them,
      // which is Go map order and changes on every simulate, so the same reply took 1 or 2 carriers
      // (akita-sdk canonicalResources). The SDK now sorts them first, so the count is fixed.
      const expectedCost = createExpectedCost(mbrAmount, 0, MIN_TXN_FEE * 13n)
      const verification = await verifyBalanceChange(
        algorand,
        user2.addr.toString(),
        expectedCost,
        'reply to a post'
      )
      const startRound = (await algorand.client.algod.status().do()).lastRound

      const result = await user2Sdk.reply({
        cid: replyCid,
        ref: postRef1,
        refType: RefType.Post,
      })

      const sent = await senderTxnsSince(user2.addr.toString(), startRound)
      const [replyCall, ...carriers] = sent.filter((txn) => txn.type === algosdk.TransactionType.appl)
      expect(replyCall.applicationCall!.appIndex).toBe(socialAppId)
      expect(replyCall.fee).toBe(MIN_TXN_FEE * 11n)
      expect(carriers).toHaveLength(1)
      expect(carriers[0].fee).toBe(MIN_TXN_FEE)
      expect(sent.filter((txn) => txn.type !== algosdk.TransactionType.appl).map((txn) => txn.fee)).toEqual([MIN_TXN_FEE, MIN_TXN_FEE])

      // Verify balance change matches expected cost (MBR + fees)
      // Note: reactFee is paid separately in AKTA, not ALGO
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user2.addr.toString()
      )
      expectBalanceChange(completed, 'reply to a post')
      expect(completed.actualCost).toBe(expectedCost.total)

      expect(result.replyKey).toHaveLength(32)
    })

  })

  describe('Vote Operations (Success)', () => {
    test('upvote a post', async () => {
      // Get expected cost (MBR for vote)
      // Note: reactFee is paid in AKTA via asset transfer, not included in ALGO payment
      // Account for the composed payment, asset-transfer, and app-call group,
      // including covered inner transactions and simulator-selected carriers.
      const mbrAmount = user2Sdk.calculateVoteMBR(false)
      // principal resolution: no escrow-factory referral lookup. The vote needs the same 31-entry resource set
      // as the reply: the vote call plus ONE resource carrier. Up to 2026-10-04 the SDK packed the resources in
      // algod's (Go map) order and this vote always happened to take 2 carriers on LocalNet (indexer, 9 runs);
      // in the canonical order (akita-sdk canonicalResources) it takes 1, so the fee is 1,000 µA lower.
      const expectedCost = createExpectedCost(mbrAmount, 0, MIN_TXN_FEE * 13n)
      const verification = await verifyBalanceChange(
        algorand,
        user2.addr.toString(),
        expectedCost,
        'upvote a post'
      )

      await user2Sdk.vote({
        ref: postRef1,
        refType: RefType.Post,
        isUp: true,
      })

      // Verify balance change matches expected cost (MBR + fees)
      // Note: reactFee is paid separately in AKTA, not ALGO
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user2.addr.toString()
      )
      expectBalanceChange(completed, 'upvote a post')
      expect(completed.actualCost).toBe(expectedCost.total)
    })

    test('invertVote to flip vote direction', async () => {
      // invertVote has no MBR payment (0), but requires reactFee in AKTA
      // Note: reactFee is paid in AKTA via asset transfer, not included in ALGO payment
      const expectedCost = createExpectedCost(0n, 3, MIN_TXN_FEE * 6n)
      const verification = await verifyBalanceChange(
        algorand,
        user2.addr.toString(),
        expectedCost,
        'invertVote to flip vote direction'
      )

      await user2Sdk.invertVote({
        ref: postRef1,
      })

      // Verify balance change matches expected cost (just fees)
      // Note: reactFee is paid separately in AKTA, not ALGO
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user2.addr.toString()
      )
      expectBalanceChange(completed, 'invertVote to flip vote direction')
      expect(completed.actualCost).toBe(expectedCost.total)
    })

    test('deleteVote to remove vote entirely', async () => {
      // deleteVote refunds MBR, so cost is just fees
      // Note: MBR refund increases balance, so actual cost will be minimal
      const expectedCost = createExpectedCost(0n, 3, 0n) // 3 opUp calls, no base payment
      const verification = await verifyBalanceChange(
        algorand,
        user2.addr.toString(),
        expectedCost,
        'deleteVote to remove vote entirely'
      )

      await user2Sdk.deleteVote({
        ref: postRef1,
      })

      // Verify balance change (refund increases balance, so cost is minimal - just fees)
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user2.addr.toString()
      )
      // Note: actualCost will be negative or small because MBR refund increases balance
      // We just verify the operation completed successfully
      expect(completed.balanceAfter).toBeGreaterThanOrEqual(completed.balanceBefore - expectedCost.total)
    })
  })

  describe('React Operations (Success)', () => {
    let reactionNftId: bigint

    test('react to a post with NFT', async () => {
      // Create an NFT for user2 to react with
      const nftResult = await algorand.send.assetCreate({
        sender: user2.addr,
        signer: user2.signer,
        total: 1n,
        decimals: 0,
        assetName: 'React NFT',
        unitName: 'REACT',
        defaultFrozen: false,
      })
      reactionNftId = BigInt(nftResult.confirmation.assetIndex!)

      // Get expected cost (MBR for first reaction with NFT)
      // Note: reactFee is paid in AKTA via asset transfer, not included in ALGO payment
      // Account for the composed payment, asset-transfer, and app-call group,
      // including covered inner transactions and simulator-selected carriers.
      const mbrAmount = user2Sdk.calculateReactMBR(true, false) // first reaction with NFT
      const expectedCost = createExpectedCost(mbrAmount, 0, MIN_TXN_FEE * 10n) // principal resolution: no escrow-factory referral lookup
      const verification = await verifyBalanceChange(
        algorand,
        user2.addr.toString(),
        expectedCost,
        'react to a post with NFT'
      )

      await user2Sdk.react({
        ref: postRef1,
        refType: RefType.Post,
        nft: reactionNftId,
      })

      // Verify balance change matches expected cost (MBR + fees)
      // Note: reactFee is paid separately in AKTA, not ALGO
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user2.addr.toString()
      )
      expectBalanceChange(completed, 'react to a post with NFT')
      expect(completed.actualCost).toBe(expectedCost.total)
    })

    test('deleteReaction should remove reaction', async () => {
      // deleteReaction refunds MBR, so cost is just fees
      // Note: MBR refund increases balance, so actual cost will be minimal
      const expectedCost = createExpectedCost(0n, 3, 0n) // 3 opUp calls, no base payment
      const verification = await verifyBalanceChange(
        algorand,
        user2.addr.toString(),
        expectedCost,
        'deleteReaction should remove reaction'
      )

      await user2Sdk.deleteReaction({
        ref: postRef1,
        nft: reactionNftId
      })

      // Verify balance change (refund increases balance, so cost is minimal - just fees)
      const completed = await completeBalanceVerification(
        verification,
        algorand,
        user2.addr.toString()
      )
      // Note: actualCost will be negative or small because MBR refund increases balance
      // We just verify the operation completed successfully
      expect(completed.balanceAfter).toBeGreaterThanOrEqual(completed.balanceBefore - expectedCost.total)
    })

    test('a non-final reaction deletion preserves and decrements the aggregate', async () => {
      const nftResult = await algorand.send.assetCreate({
        sender: user2.addr,
        signer: user2.signer,
        total: 2n,
        decimals: 0,
        assetName: 'Shared React NFT',
        unitName: 'SHREACT',
        defaultFrozen: false,
      })
      const sharedNftId = BigInt(nftResult.confirmation.assetIndex!)

      await algorand.send.assetOptIn({
        sender: moderator.addr,
        signer: moderator.signer,
        assetId: sharedNftId,
      })
      await algorand.send.assetTransfer({
        sender: user2.addr,
        signer: user2.signer,
        receiver: moderator.addr,
        assetId: sharedNftId,
        amount: 1n,
      })

      await user2Sdk.react({ ref: postRef1, refType: RefType.Post, nft: sharedNftId })
      await moderatorSdk.react({ ref: postRef1, refType: RefType.Post, nft: sharedNftId })

      await expect(daoSdk.socialClient.state.box.reactions.value({
        ref: postRef1,
        nft: sharedNftId,
      })).resolves.toBe(2n)

      await user2Sdk.deleteReaction({ ref: postRef1, nft: sharedNftId })

      await expect(daoSdk.socialClient.state.box.reactions.value({
        ref: postRef1,
        nft: sharedNftId,
      })).resolves.toBe(1n)

      await moderatorSdk.deleteReaction({ ref: postRef1, nft: sharedNftId })
      await expect(daoSdk.socialClient.state.box.reactions.value({
        ref: postRef1,
        nft: sharedNftId,
      })).resolves.toBe(0n)
    })
  })

  describe('Graph Operations (Success)', () => {
    // Note: Graph write operations (follow, block, etc.) require akitaDAO to be set
    // The graph contract has a chicken-and-egg problem: updateAkitaDAO requires DAO wallet
    // but to find DAO wallet we need akitaDAO set. Read operations still work.

    test('isBlocked should return false for users who have not blocked each other', async () => {
      // Read operation works without akitaDAO
      const isBlocked = await user1Sdk.isBlocked({
        user: user1.addr.toString(),
        blocked: user2.addr.toString()
      })
      expect(isBlocked).toBe(false)
    })

    test('isBlocked should work for multiple user pairs', async () => {
      const isBlocked1 = await user1Sdk.isBlocked({
        user: user2.addr.toString(),
        blocked: user1.addr.toString()
      })
      const isBlocked2 = await user1Sdk.isBlocked({
        user: deployer.addr.toString(),
        blocked: user1.addr.toString()
      })
      expect(isBlocked1).toBe(false)
      expect(isBlocked2).toBe(false)
    })

    // Graph write operations are tested in standalone tests where
    // the contract doesn't require akitaDAO for the core functionality
  })

  // Note: Moderation operations (addModerator, removeModerator, addAction, removeAction)
  // require calling from the DAO wallet (abstracted account), not just any sender.
  // This requires using the wallet's plugin system which is complex to set up in tests.
  // These operations are tested via the DAO fixture tests.

  describe('Moderation Operations (Success)', () => {
    // Note: addModerator/removeModerator require the DAO wallet plugin system
    // The contract checks Txn.sender === akitaDAOWallet.address which requires inner txns from wallet
    // Read operations work without wallet sender

    test('addModerator should throw (requires DAO wallet sender)', async () => {
      // This requires sender to be DAO wallet (abstracted account)
      await expect(daoSdk.addModerator({ address: moderator.addr.toString() }))
        .rejects.toThrow()
    })

    test('getModeratorMeta should return exists=false for non-moderators', async () => {
      const meta = await daoSdk.getModeratorMeta({ user: moderator.addr.toString() })
      expect(meta.exists).toBe(false)
    })

    test('isBanned should return false for non-banned users', async () => {
      const isBanned = await daoSdk.isBanned({ account: user2.addr.toString() })
      expect(isBanned).toBe(false)
    })
  })

  describe('Action Operations (Success)', () => {
    // Note: addAction/removeAction require Txn.sender === akitaDAOWallet.address

    test('addAction should throw (requires DAO wallet sender)', async () => {
      // This requires sender to be DAO wallet (abstracted account)
      const content = new Uint8Array(36).fill(200)
      await expect(daoSdk.addAction({ actionAppId: 123n, content }))
        .rejects.toThrow()
    })

    test('removeAction should throw (requires DAO wallet sender)', async () => {
      // This requires sender to be DAO wallet (abstracted account)
      await expect(daoSdk.removeAction({ actionAppId: 123n }))
        .rejects.toThrow()
    })
  })

  describe('Impact Operations (Success)', () => {
    test('should create a social-impact app soft-stake commitment', async () => {
      const rootAmount = 20_000_000_000n
      const impactAmount = 10_000_000_000n

      await akitaUniverse.staking.optIn({
        sender: deployer.addr,
        signer: deployer.signer,
        asset: aktaAssetId,
      })
      await akitaUniverse.staking.stake({
        sender: user1.addr,
        signer: user1.signer,
        type: StakingType.Soft,
        asset: aktaAssetId,
        amount: rootAmount,
      })
      await user1Sdk.commitStakingImpact({ amount: impactAmount })

      const appStake = await akitaUniverse.staking.getAppWeightedStake({
        app: impactAppId,
        address: user1.addr.toString(),
        asset: aktaAssetId,
        acceptInherited: true,
      })
      expect(appStake.amount).toBe(impactAmount)

      const checkpoint = await user2Sdk.checkpointStakingImpact({ address: user1.addr.toString() })
      expect(checkpoint.valid).toBe(true)
      expect(checkpoint.balance).toBeGreaterThanOrEqual(impactAmount)
    })

    test('getUserImpact should return user impact score', async () => {
      const impact = await daoSdk.getUserImpact({ address: user1.addr.toString() })
      expect(impact).toBeGreaterThanOrEqual(0n)
    })

    test('getUserImpactWithoutSocial should return base impact', async () => {
      const impact = await daoSdk.getUserImpactWithoutSocial({ address: user1.addr.toString() })
      expect(impact).toBeGreaterThanOrEqual(0n)
    })

    test('getUserSocialImpact should return social component', async () => {
      // Contract now returns the raw inputs (hasMeta, streak, startDate, voteCount,
      // isNegative) instead of a single computed bigint; the final impact is
      // computed off-chain by consumers.
      const impact = await daoSdk.getUserSocialImpact({ user: user1.addr.toString() })
      expect(impact).toBeDefined()
      expect(typeof impact.hasMeta).toBe('boolean')
      expect(typeof impact.streak).toBe('bigint')
      expect(typeof impact.startDate).toBe('bigint')
      expect(typeof impact.voteCount).toBe('bigint')
      expect(typeof impact.isNegative).toBe('boolean')
    })
  })

  describe('Ref Type Registry', () => {
    let socialClient: AkitaSocialClient

    beforeAll(() => {
      socialClient = algorand.client.getTypedAppClientById(AkitaSocialClient, {
        appId: socialAppId,
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      })
    })

    // Note: the `getRefType` readonly ABI method was removed to reduce the
    // size of AkitaSocial. Off-chain callers can still read the `refTypes`
    // box directly via `getApplicationBoxByName`; behavior for registered
    // types is covered by the registration/use tests below.

    test('mbr should return refTypes cost that scales with name and schema length', async () => {
      const emptyRef = new Uint8Array(0)

      // Short name, no schema
      const shortResult = await socialClient.send.mbr({
        args: { ref: emptyRef, refTypeName: 'x', refTypeSchema: new Uint8Array(0) }
      })
      expect(shortResult.return!.refTypes).toBeGreaterThan(0n)

      // Longer name + schema
      const longResult = await socialClient.send.mbr({
        args: { ref: emptyRef, refTypeName: 'arc53_collection', refTypeSchema: new TextEncoder().encode('sha256(nfd_app_id + collection_name)') }
      })
      expect(longResult.return!.refTypes).toBeGreaterThan(shortResult.return!.refTypes)
    })

    test('registerRefType should reject non-DAO callers', async () => {
      const name = 'x'
      const schema = new Uint8Array(0)
      const { return: mbrData } = await socialClient.send.mbr({
        args: { ref: new Uint8Array(0), refTypeName: name, refTypeSchema: schema }
      })

      const mbrPayment = await algorand.createTransaction.payment({
        sender: deployer.addr,
        receiver: socialClient.appClient.appAddress,
        amount: algokit.microAlgos(Number(mbrData!.refTypes)),
      })

      // Short-code matches `errNotAkitaDao` ('NDAO') emitted via ARC-65
      // `loggedAssert`. See `smart_contracts/social/errors.ts`.
      await expect(
        socialClient.send.registerRefType({
          args: { mbrPayment, name, schema },
          populateAppCallResources: true,
        })
      ).rejects.toThrow('errNdao')
    })
  })

  // ==========================================================================
  // Regressions for the 2026-10 social audit (graph / impact / plugin lane)
  // ==========================================================================
  describe('Audit regressions', () => {
    /**
     * Block time of the latest round. Tests move block time forward and it never comes back, so it runs
     * ahead of the wall clock; a ban has to end after it (audit 08, SOC-07).
     */
    const chainNow = async (): Promise<bigint> => {
      const { lastRound } = await algorand.client.algod.status().do()
      return (await algorand.client.algod.block(lastRound).do()).block.header.timestamp
    }

    const aktaBalance = async (address: string): Promise<bigint> => {
      const info = await algorand.asset.getAccountInformation(address, aktaAssetId)
      return info.balance
    }

    // Mirrors `getHeldAktaImpactScore` in impact.algo.ts.
    const heldAktaScore = (balance: bigint): bigint => {
      if (balance < 10_000_000_000n) return 0n
      const capped = balance >= 1_000_000_000_000n ? 1_000_000_000_000n : balance
      return (capped * 50n) / 1_000_000_000_000n
    }

    // Runs `calls` through the DAO wallet with the Social plugin installed (DAO-gated
    // moderation / impact methods need the DAO wallet as sender).
    let socialPluginInstalledOnDao = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const executeAsDao = async (lease: string, calls: any[]) => {
      const dao = akitaUniverse.dao
      await dao.getWallet()
      const daoWallet = dao.wallet
      if (!socialPluginInstalledOnDao) {
        await proposeAndExecute(algorand, dao, [{
          type: ProposalActionEnum.AddPlugin,
          client: akitaUniverse.socialPlugin,
          callerType: CallerType.Global,
          sourceLink: 'https://github.com/kylebee/akita-sc',
          useExecutionKey: true,
          fee: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_CREATION,
          power: DEFAULT_UPDATE_AKITA_DAO_PROPOSAL_POWER,
          duration: DEFAULT_UPDATE_AKITA_DAO_DURATION,
          participation: DEFAULT_UPDATE_AKITA_DAO_PARTICIPATION,
          approval: DEFAULT_UPDATE_AKITA_DAO_APP_APPROVAL,
        }])
        socialPluginInstalledOnDao = true
      }

      const admin = await daoWallet.client.state.global.admin()
      const funding = await getAppFundingNeeded(algorand, admin!, 2_000_000n, 1_000_000n)
      if (funding > 0n) {
        await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: admin!, amount: algokit.microAlgo(funding) })
      }
      await daoWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(2_000_000) })

      const execution = await daoWallet.build.usePlugin({
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        lease,
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls,
      })
      const costs = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
      await daoWallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(costs.executions + 1_000_000n) })
      await proposeAndExecute(algorand, dao, [{
        type: ProposalActionEnum.ExecutePlugin,
        plugin: akitaUniverse.socialPlugin.appId,
        caller: deployer.addr.toString(),
        escrow: '',
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      }])
      for (const window of execution.windows) await sendPrepared(window, algorand.client.algod)
    }

    test('S-10e: a repeated block is rejected instead of keeping a second MBR payment', async () => {
      const target = moderator.addr.toString()
      await user1Sdk.block({ address: target })
      await expect(user1Sdk.block({ address: target })).rejects.toThrow(new RegExp(errAlreadyBlocked))

      const graphAddress = user1Sdk.graphClient.appAddress.toString()
      const before = await algorand.account.getInformation(graphAddress)
      await user1Sdk.unblock({ address: target })
      const after = await algorand.account.getInformation(graphAddress)
      // exactly one block MBR leaves the graph app
      expect(BigInt(before.balance.microAlgos) - BigInt(after.balance.microAlgos)).toBe(BLOCKS_MBR)
      await expect(user1Sdk.isBlocked({ user: user1.addr.toString(), blocked: target })).resolves.toBe(false)
    })

    test('S-09: anyone can pay a graph MBR, and the deposit returns to whoever paid it', async () => {
      const graph = user1Sdk.graphClient
      const target = moderator.addr.toString()
      const PAYER_RECORD_MBR = 28_500n
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgos
      const block = async (amount: bigint) => graph.send.block({
        sender: user1.addr,
        signer: user1.signer,
        args: {
          mbrPayment: {
            txn: await algorand.createTransaction.payment({ sender: user2.addr, receiver: graph.appAddress, amount: algokit.microAlgo(amount) }),
            signer: user2.signer,
          },
          address: target,
        },
        populateAppCallResources: true,
        coverAppCallInnerTransactionFees: true,
        maxFee: algokit.microAlgo(10_000),
      })

      // a payer other than the caller is remembered, so the block deposit alone is not enough
      await expect(block(BLOCKS_MBR)).rejects.toThrow(new RegExp(errInvalidPaymentAmount))
      await expect(user1Sdk.isBlocked({ user: user1.addr.toString(), blocked: target })).resolves.toBe(false)

      const paidFrom = await balance(user2.addr.toString())
      await block(BLOCKS_MBR + PAYER_RECORD_MBR)
      await expect(user1Sdk.isBlocked({ user: user1.addr.toString(), blocked: target })).resolves.toBe(true)
      expect(paidFrom - (await balance(user2.addr.toString()))).toBe(BLOCKS_MBR + PAYER_RECORD_MBR + 1_000n)

      // the caller lifts the block; both deposits go back to the payer and nothing goes to the caller
      const sponsorBefore = await balance(user2.addr.toString())
      const callerBefore = await balance(user1.addr.toString())
      await user1Sdk.unblock({ address: target })
      expect((await balance(user2.addr.toString())) - sponsorBefore).toBe(BLOCKS_MBR + PAYER_RECORD_MBR)
      expect(await balance(user1.addr.toString())).toBeLessThan(callerBefore)
      await expect(user1Sdk.isBlocked({ user: user1.addr.toString(), blocked: target })).resolves.toBe(false)
    })

    test('S-09: anyone can pay a vote MBR, and un-voting returns the deposit to whoever paid it', async () => {
      const PAYER_RECORD_MBR = 28_500n
      const social = user2Sdk.socialClient
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgos
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(62) })
      const [fees, assets] = await Promise.all([user2Sdk.getSocialFees(), user2Sdk.getAkitaAssets()])
      // user2 votes; the deployer pays the vote record's deposit, user2 pays the AKTA tip
      const vote = async (amount: bigint) => social.newGroup().votePayAxferByteUint64BoolUint64Void({
        sender: user2.addr,
        signer: user2.signer,
        maxFee: algokit.microAlgo(20_000),
        args: {
          mbrPayment: {
            txn: await algorand.createTransaction.payment({ sender: deployer.addr, receiver: social.appAddress, amount: algokit.microAlgo(amount) }),
            signer: deployer.signer,
          },
          tip: await algorand.createTransaction.assetTransfer({
            sender: user2.addr, receiver: social.appAddress, assetId: assets.akta, amount: fees.reactFee,
          }),
          ref: postKey, type: RefType.Post, isUp: true, wallet: 0n,
        },
      }).send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

      // a payer other than the voter is remembered, so the vote deposit alone is not enough
      await expect(vote(VOTELIST_MBR)).rejects.toThrow()
      const paidFrom = await balance(deployer.addr.toString())
      await vote(VOTELIST_MBR + PAYER_RECORD_MBR)
      expect(paidFrom - (await balance(deployer.addr.toString()))).toBe(VOTELIST_MBR + PAYER_RECORD_MBR + 1_000n)
      expect((await daoSdk.getVote({ account: user2.addr.toString(), ref: postKey })).isUp).toBe(true)

      // un-voting returns both deposits to the payer and nothing to the voter
      const sponsorBefore = await balance(deployer.addr.toString())
      const voterBefore = await balance(user2.addr.toString())
      await user2Sdk.deleteVote({ ref: postKey })
      expect((await balance(deployer.addr.toString())) - sponsorBefore).toBe(VOTELIST_MBR + PAYER_RECORD_MBR)
      expect(await balance(user2.addr.toString())).toBeLessThan(voterBefore)
    })

    test("S-06 (accepted): a vote records the voter's whole impact, held AKTA included", async () => {
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(61) })
      await user2Sdk.vote({ ref: postKey, refType: RefType.Post, isUp: true })

      const recorded = (await daoSdk.getVote({ account: user2.addr.toString(), ref: postKey })).impact
      const full = await daoSdk.getUserImpact({ address: user2.addr.toString() })
      const held = heldAktaScore(await aktaBalance(user2.addr.toString()))

      // user2 holds ~100,000 AKTA, so the score has a held-AKTA component, and the vote's weight
      // is the same score every other reader gets (the owner's decision of 2026-11-25)
      expect(held).toBeGreaterThan(0n)
      expect(recorded).toBe(full)
      expect(recorded).toBeGreaterThanOrEqual(held)
    })

    test('S-10h: the DAO cannot set a zero subscription modifier', async () => {
      await expect(executeAsDao('social_zero_modifier', [
        akitaUniverse.socialPlugin.updateSubscriptionStateModifier({ subscriptionIndex: 1n, newModifier: 0n }),
      ])).rejects.toThrow(new RegExp(errInvalidModifier))
    })

    test('S-08: banned users can still withdraw follow and block MBR', async () => {
      // moderator / ban boxes are funded from the moderation app's own balance (S-10i won't fix)
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: daoSdk.moderationClient.appAddress,
        amount: algokit.microAlgo(1_000_000),
      })
      await executeAsDao('social_add_moderator', [
        akitaUniverse.socialPlugin.addModerator({ address: moderator.addr.toString() }),
      ])
      await expect(daoSdk.getModeratorMeta({ user: moderator.addr.toString() })).resolves.toMatchObject({ exists: true })

      // user2 follows user1 and blocks the moderator, then gets banned
      await user2Sdk.follow({ address: user1.addr.toString() })
      await user2Sdk.block({ address: moderator.addr.toString() })
      const farFuture = (await chainNow()) + 10n * 365n * 86_400n * 100n
      await moderatorSdk.ban({ address: user2.addr.toString(), expiration: farFuture })
      await expect(daoSdk.isBanned({ account: user2.addr.toString() })).resolves.toBe(true)

      const graphAddress = user2Sdk.graphClient.appAddress.toString()
      const before = await algorand.account.getInformation(graphAddress)
      await user2Sdk.unfollow({ address: user1.addr.toString() })
      await user2Sdk.unblock({ address: moderator.addr.toString() })
      const after = await algorand.account.getInformation(graphAddress)

      expect(BigInt(before.balance.microAlgos) - BigInt(after.balance.microAlgos)).toBe(FOLLOWS_MBR + BLOCKS_MBR)
      await expect(daoSdk.isFollowing({ follower: user2.addr.toString(), user: user1.addr.toString() })).resolves.toBe(false)

      // a banned user still cannot create new follows
      await expect(user2Sdk.follow({ address: user1.addr.toString() })).rejects.toThrow(new RegExp(errBanned))

      await moderatorSdk.unban({ address: user2.addr.toString() })
    })

    // ------------------------------------------------------------------------
    // AkitaSocialModeration lastActive (read by SocialModeratorGate)
    // ------------------------------------------------------------------------

    const ensureModerator = async (account: TransactionSignerAccount, lease: string) => {
      const address = account.addr.toString()
      if ((await daoSdk.getModeratorMeta({ user: address })).exists) return
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: daoSdk.moderationClient.appAddress,
        amount: algokit.microAlgo(1_000_000),
      })
      await executeAsDao(lease, [akitaUniverse.socialPlugin.addModerator({ address })])
    }

    test('every moderation action records its block time as the moderator lastActive', async () => {
      await ensureModerator(moderator, 'social_add_moderator_active')
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(62) })
      const target = algorand.account.random().addr.toString()
      const farFuture = (await chainNow()) + 365n * 86_400n
      const client = moderatorSdk.moderationClient
      const params = {
        sender: moderator.addr,
        signer: moderator.signer,
        coverAppCallInnerTransactionFees: true,
        maxFee: algokit.microAlgo(10_000),
      }
      // `delta`: the net count moves +1 on a forward action, -1 on a reversal, 0 when nothing changes
      const setFlags = (flags: bigint) => () => client.send.setModeratorContentFlags({ ...params, args: { ref: postKey, flags } })
      const actions = [
        { name: 'ban', delta: 1n, run: () => client.send.ban({ ...params, args: { address: target, expiration: farFuture } }) },
        { name: 'unban', delta: -1n, run: () => client.send.unban({ ...params, args: { address: target } }) },
        { name: 'flagPost', delta: 1n, run: () => client.send.flagPost({ ...params, args: { ref: postKey } }) },
        { name: 'flagPost (already flagged)', delta: 0n, run: () => client.send.flagPost({ ...params, args: { ref: postKey } }) },
        { name: 'unflagPost', delta: -1n, run: () => client.send.unflagPost({ ...params, args: { ref: postKey } }) },
        { name: 'setModeratorContentFlags', delta: 1n, run: setFlags(5n) },
        { name: 'setModeratorContentFlags (same flags)', delta: 0n, run: setFlags(5n) },
        { name: 'setModeratorContentFlags (other flags)', delta: 0n, run: setFlags(3n) },
        { name: 'setModeratorContentFlags (cleared)', delta: -1n, run: setFlags(0n) },
        { name: 'setModeratorContentFlags (set again)', delta: 1n, run: setFlags(5n) },
      ]

      const user = moderator.addr.toString()
      let previous = await daoSdk.getModeratorActivity({ user })
      for (const { name, delta, run } of actions) {
        // each action lands in a later second, so one that skips the write cannot pass on the previous value.
        // A warp, not a sleep: earlier warps can leave the LocalNet clock ahead of the wall clock.
        await new TimeWarp(algorand).timeWarp(1n)
        const { confirmation } = await run()
        const { block } = await algorand.client.algod.block(confirmation.confirmedRound!).do()
        const activity = await daoSdk.getModeratorActivity({ user })
        const { lastActive } = await daoSdk.getModeratorMeta({ user })

        const carried = activity.epoch === previous.epoch ? previous.actions : 0n
        expect({ name, lastActive, actions: activity.actions }).toEqual({
          name,
          lastActive: BigInt(block.header.timestamp),
          actions: carried + delta < 0n ? 0n : carried + delta,
        })
        expect(activity.lastActive).toBe(lastActive)
        expect(lastActive > previous.lastActive).toBe(true)
        previous = activity
      }
      await expect(daoSdk.getPost({ ref: postKey })).resolves.toMatchObject({ againstContentPolicy: false, moderatorFlags: 5n })
    })

    test('flag/unflag and ban/unban cycles do not raise the moderator activity count', async () => {
      await ensureModerator(moderator, 'social_add_moderator_active')
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(63) })
      const target = algorand.account.random().addr.toString()
      const user = moderator.addr.toString()
      const farFuture = (await chainNow()) + 365n * 86_400n
      const { epoch, actions: before } = await daoSdk.getModeratorActivity({ user })
      for (let i = 0; i < 3; i++) {
        await moderatorSdk.flagPost({ ref: postKey })
        await moderatorSdk.unflagPost({ ref: postKey })
        await moderatorSdk.ban({ address: target, expiration: farFuture })
        await moderatorSdk.unban({ address: target })
      }
      const after = await daoSdk.getModeratorActivity({ user })
      // the cycles ran inside one epoch unless the clock crossed a boundary mid-test
      expect(after.actions).toBe(after.epoch === epoch ? before : 0n)
    })

    const registerSubGateEntry = async (
      gate: SocialModeratorGateClient | ModeratorActivityGateClient,
      args: Uint8Array,
    ): Promise<bigint> => {
      const { return: cost } = await gate.send.cost({ sender: deployer.addr, signer: deployer.signer, args: { args } })
      const mbrPayment = await algorand.createTransaction.payment({
        sender: deployer.addr,
        receiver: gate.appAddress,
        amount: algokit.microAlgo(cost!),
      })
      const { return: registryId } = await gate.send.register({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { mbrPayment: { txn: mbrPayment, signer: deployer.signer }, args },
      })
      return registryId!
    }

    const gateCallParams = {
      coverAppCallInnerTransactionFees: true,
      maxFee: algokit.microAlgo(10_000),
    }

    test('SocialModeratorGate "active in the last hour" passes an active moderator and fails one who never acted', async () => {
      const idle = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) })
      await ensureModerator(moderator, 'social_add_moderator_active')
      await ensureModerator(idle, 'social_add_moderator_idle')

      const target = algorand.account.random().addr.toString()
      await moderatorSdk.ban({ address: target, expiration: (await chainNow()) + 86_400n })
      await moderatorSdk.unban({ address: target })

      const gate = akitaUniverse.subgates.socialModeratorGate.client
      const registryId = await registerSubGateEntry(
        gate,
        algosdk.ABIType.from('(uint8,uint64)').encode([Operator.GreaterThanOrEqualTo, 3_600n]),
      )

      const check = async (caller: string) => (await gate.send.check({
        ...gateCallParams,
        sender: deployer.addr,
        signer: deployer.signer,
        args: { caller, registryId, args: new Uint8Array() },
      })).return

      expect(await check(moderator.addr.toString())).toBe(true)
      expect(await check(idle.addr.toString())).toBe(false)
    })

    const activityArgs = (minActions: bigint, epochsBack: bigint) =>
      algosdk.ABIType.from('(uint64,uint64)').encode([minActions, epochsBack])
    const activityCheck = async (caller: string, registryId: bigint) => (await akitaUniverse.subgates.moderatorActivityGate.client.send.check({
      ...gateCallParams,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { caller, registryId, args: new Uint8Array() },
    })).return
    const activityCheckFor = async (principal: string, spender: string, registryId: bigint) => (await akitaUniverse.subgates.moderatorActivityGate.client.send.checkFor({
      ...gateCallParams,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { ctx: { principal, wallet: 0n, spender }, registryId, args: new Uint8Array() },
    })).return

    test('ModeratorActivityGate passes on counted actions in the epoch window, for check and checkFor', async () => {
      const idle = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) })
      await ensureModerator(moderator, 'social_add_moderator_active')
      await ensureModerator(idle, 'social_add_moderator_idle2')

      for (let i = 0; i < 2; i++) {
        const target = algorand.account.random().addr.toString()
        await moderatorSdk.ban({ address: target, expiration: (await chainNow()) + 86_400n })
      }
      const { actions, previousActions } = await daoSdk.getModeratorActivity({ user: moderator.addr.toString() })
      expect(actions).toBeGreaterThanOrEqual(2n)

      const gate = akitaUniverse.subgates.moderatorActivityGate.client
      const reached = await registerSubGateEntry(gate, activityArgs(actions, 0n))
      const missed = await registerSubGateEntry(gate, activityArgs(actions + previousActions + 1n, 1n))
      await expect(registerSubGateEntry(gate, activityArgs(1n, 2n))).rejects.toThrow(/errIrga/)

      const active = moderator.addr.toString()
      const quiet = idle.addr.toString()
      const outsider = user1.addr.toString()
      expect(await activityCheck(active, reached)).toBe(true)
      expect(await activityCheck(active, missed)).toBe(false)
      expect(await activityCheck(quiet, reached)).toBe(false)
      expect(await activityCheck(outsider, reached)).toBe(false)
      // the moderator acted as the spender of another principal's context
      expect(await activityCheckFor(quiet, active, reached)).toBe(true)
      expect(await activityCheckFor(active, active, reached)).toBe(true)
      expect(await activityCheckFor(quiet, quiet, reached)).toBe(false)
      expect(await activityCheckFor(outsider, quiet, reached)).toBe(false)
    })

    test('activity counters roll over 7-day epochs and the gate window follows them, for check and checkFor', async () => {
      const idle = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) })
      await ensureModerator(moderator, 'social_add_moderator_active')
      await ensureModerator(idle, 'social_add_moderator_idle3')
      const active = moderator.addr.toString()
      const quiet = idle.addr.toString()
      const epochSeconds = 604_800n
      const chainTime = async () => {
        const { lastRound } = await algorand.client.algod.status().do()
        return (await algorand.client.algod.block(lastRound).do()).block.header.timestamp
      }
      const warpToEpochStart = async (epochsAhead: bigint) => {
        const now = await chainTime()
        await new TimeWarp(algorand).timeWarp((now / epochSeconds + epochsAhead) * epochSeconds - now)
      }
      const counts = async () => {
        const { actions, previousActions } = await daoSdk.getModeratorActivity({ user: active })
        return { actions, previousActions }
      }
      // a fresh target each time: a ban counts +1 and only a reversal (unban) would take it back
      const ban = async () => moderatorSdk.ban({ address: algorand.account.random().addr.toString(), expiration: (await chainTime()) + 86_400n })

      // two epochs ahead, so the epoch before the current one holds no actions
      await warpToEpochStart(2n)
      await ban()
      await ban()
      expect(await counts()).toEqual({ actions: 2n, previousActions: 0n })

      const gate = akitaUniverse.subgates.moderatorActivityGate.client
      const current = await registerSubGateEntry(gate, activityArgs(2n, 0n))
      const window = await registerSubGateEntry(gate, activityArgs(2n, 1n))
      expect([await activityCheck(active, current), await activityCheck(active, window)]).toEqual([true, true])

      // next epoch: the view rolls the stored counts forward before any write
      await warpToEpochStart(1n)
      expect(await counts()).toEqual({ actions: 0n, previousActions: 2n })
      expect(await activityCheck(active, current)).toBe(false)
      expect(await activityCheck(active, window)).toBe(true)
      expect(await activityCheckFor(quiet, active, current)).toBe(false)
      expect(await activityCheckFor(quiet, active, window)).toBe(true)

      // the first write of the epoch rolls the stored record the same way
      await ban()
      expect(await counts()).toEqual({ actions: 1n, previousActions: 2n })

      // two epochs on, both counts are out of the window
      await warpToEpochStart(2n)
      expect(await counts()).toEqual({ actions: 0n, previousActions: 0n })
      expect(await activityCheck(active, window)).toBe(false)
      expect(await activityCheckFor(quiet, active, window)).toBe(false)
      await expect(daoSdk.getModeratorMeta({ user: active })).resolves.toMatchObject({ exists: true })
    })

    test('addModerator pays both moderator boxes from the moderation app and removeModerator frees them', async () => {
      const temp = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(10_000_000) })
      const address = temp.addr.toString()
      const moderation = daoSdk.moderationClient
      await algorand.send.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: moderation.appAddress,
        amount: algokit.microAlgo(1_000_000),
      })
      const minBalance = async () => (await algorand.account.getInformation(moderation.appAddress)).minBalance.microAlgos
      const activityBox = Buffer.from([...Buffer.from('k'), ...temp.addr.publicKey])
      const hasActivityBox = async () =>
        (await algorand.app.getBoxNames(moderation.appId)).some((box) => Buffer.from(box.nameRaw).equals(activityBox))
      const base = await minBalance()

      await executeAsDao('social_add_moderator_boxes', [akitaUniverse.socialPlugin.addModerator({ address })])
      expect(await minBalance() - base).toBe(MODERATORS_MBR + MODERATOR_ACTIVITY_MBR)
      expect(await hasActivityBox()).toBe(true)

      // counted actions update the counters without allocating more (ban +1, unban -1: net 0)
      const target = algorand.account.random().addr.toString()
      const params = { ...gateCallParams, sender: temp.addr, signer: temp.signer }
      await moderation.send.ban({ ...params, args: { address: target, expiration: (await chainNow()) + 86_400n } })
      expect((await daoSdk.getModeratorActivity({ user: address })).actions).toBe(1n)
      await moderation.send.unban({ ...params, args: { address: target } })
      expect(await minBalance() - base).toBe(MODERATORS_MBR + MODERATOR_ACTIVITY_MBR)
      expect((await daoSdk.getModeratorActivity({ user: address })).actions).toBe(0n)

      await executeAsDao('social_remove_moderator_boxes', [akitaUniverse.socialPlugin.removeModerator({ address })])
      expect(await minBalance()).toBe(base)
      expect(await hasActivityBox()).toBe(false)
      expect(await daoSdk.getModeratorActivity({ user: address })).toMatchObject({ exists: false, actions: 0n, previousActions: 0n })

      // a re-added moderator starts from zero, not from the deleted counters
      await executeAsDao('social_readd_moderator_boxes', [akitaUniverse.socialPlugin.addModerator({ address })])
      expect(await daoSdk.getModeratorActivity({ user: address })).toMatchObject({ exists: true, lastActive: 0n, actions: 0n, previousActions: 0n })
    })

    // ------------------------------------------------------------------------
    // AkitaSocial (S-01 / S-02 / S-04 / S-05 / S-08 / S-09 / S-10d)
    // ------------------------------------------------------------------------

    const lookalikeOf = (ref: Uint8Array, fill: number): Uint8Array => {
      const out = new Uint8Array(32)
      out.set(ref.slice(0, 16))
      out.fill(fill, 16)
      return out
    }

    const createNft = async (owner: TransactionSignerAccount): Promise<bigint> => {
      const result = await algorand.send.assetCreate({
        sender: owner.addr,
        signer: owner.signer,
        total: 1n,
        decimals: 0,
        assetName: 'Audit NFT',
        unitName: 'ANFT',
      })
      return result.confirmation.assetIndex!
    }

    const socialFreeBalance = async (): Promise<bigint> => {
      const info = await algorand.account.getInformation(daoSdk.socialClient.appAddress)
      return BigInt(info.balance.microAlgos) - BigInt(info.minBalance.microAlgos)
    }

    test('S-02: initMeta only creates meta for the caller', async () => {
      const stranger = algorand.account.random()
      await expect(user1Sdk.initMeta({ user: stranger.addr.toString() })).rejects.toThrow(new RegExp(errNotSelfMeta))
      const { return: exists } = await daoSdk.socialClient.send.getMetaExists({ args: { user: stranger.addr.toString() } })
      expect(exists).toBe(false)
    })

    test('the legacy list cutoff is stamped by the first post box this version creates', async () => {
      const cutoff = await daoSdk.socialClient.state.global.legacyListCutoff()
      expect(cutoff).toBeDefined()
      expect(cutoff! > 0n).toBe(true)
    })

    test('S-01: a vote on a lookalike ref cannot undo or block a vote on the real post', async () => {
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(71) })
      const lookalike = lookalikeOf(postKey, 0xff)
      const votesBox = () => algorand.app.getBoxValue(daoSdk.socialClient.appId, new Uint8Array([118, ...postKey]))
      const before = await votesBox()

      // user2 down-votes a lookalike address ref (same first 16 bytes as the post key)
      await user2Sdk.vote({ ref: lookalike, refType: RefType.Address, isUp: false })

      // they never voted on the real post, so there is nothing to undo there
      await expect(user2Sdk.deleteVote({ ref: postKey })).rejects.toThrow(new RegExp(errHaventVoted))
      expect(await votesBox()).toEqual(before)

      // and the lookalike vote does not block a real vote on the post
      await user2Sdk.vote({ ref: postKey, refType: RefType.Post, isUp: true })
      await expect(daoSdk.getVote({ account: user2.addr.toString(), ref: postKey })).resolves.toMatchObject({ isUp: true })
      await expect(daoSdk.getVote({ account: user2.addr.toString(), ref: lookalike })).resolves.toMatchObject({ isUp: false })
    })

    test('S-01 / S-08: a lookalike ref cannot delete a reaction, and a blocked reactor can still reclaim theirs', async () => {
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(72) })
      const nft = await createNft(user2)
      await user2Sdk.react({ ref: postKey, refType: RefType.Post, nft })

      await expect(user2Sdk.deleteReaction({ ref: lookalikeOf(postKey, 0xee), nft })).rejects.toThrow(new RegExp(errAlreadyReacted))
      const { userReactedNfts } = await user2Sdk.getPostReactions({ ref: postKey, userAddress: user2.addr.toString() })
      expect(userReactedNfts.has(nft)).toBe(true)

      // the post creator blocks the reactor; the refund path stays open
      await user1Sdk.block({ address: user2.addr.toString() })
      const appBefore = await algorand.account.getInformation(daoSdk.socialClient.appAddress)
      await user2Sdk.deleteReaction({ ref: postKey, nft })
      const appAfter = await algorand.account.getInformation(daoSdk.socialClient.appAddress)
      expect(BigInt(appBefore.balance.microAlgos) - BigInt(appAfter.balance.microAlgos)).toBe(REACTION_RECORD_MBR)
      await user1Sdk.unblock({ address: user2.addr.toString() })
    })

    test("S-04 / S-10d: a gated wall rejects ungated replies and votes; defaultPayWallId 0 is accepted", async () => {
      // user2 materializes user1's wall with a vote before the gate is set
      await user2Sdk.vote({ ref: user1.addr.publicKey, refType: RefType.Address, isUp: false })
      await user2Sdk.deleteVote({ ref: user1.addr.publicKey })

      await user1Sdk.updateMeta({ addressGateId: 999n, defaultPayWallId: 0n })
      try {
        await expect(user2Sdk.reply({
          cid: new Uint8Array(36).fill(73),
          ref: user1.addr.publicKey,
          refType: RefType.Post,
        })).rejects.toThrow(new RegExp(errHasGate))
        await expect(user2Sdk.vote({ ref: user1.addr.publicKey, refType: RefType.Address, isUp: true }))
          .rejects.toThrow(new RegExp(errHasGate))
      } finally {
        await user1Sdk.updateMeta({ addressGateId: 0n, defaultPayWallId: 0n })
      }
    })

    test('S-09: anyone can pay a reaction MBR, and removing the reaction returns the record deposit to whoever paid it', async () => {
      const PAYER_RECORD_MBR = 28_500n
      const social = user2Sdk.socialClient
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgos
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(76) })
      const nft = await createNft(user2)
      const [fees, assets] = await Promise.all([user2Sdk.getSocialFees(), user2Sdk.getAkitaAssets()])
      // user2 reacts; the deployer pays the storage, user2 pays the AKTA tip
      const react = async (amount: bigint) => social.newGroup().reactPayAxferByteUint64Uint64Uint64Void({
        sender: user2.addr,
        signer: user2.signer,
        maxFee: algokit.microAlgo(20_000),
        args: {
          mbrPayment: {
            txn: await algorand.createTransaction.payment({ sender: deployer.addr, receiver: social.appAddress, amount: algokit.microAlgo(amount) }),
            signer: deployer.signer,
          },
          tip: await algorand.createTransaction.assetTransfer({
            sender: user2.addr, receiver: social.appAddress, assetId: assets.akta, amount: fees.reactFee,
          }),
          ref: postKey, type: RefType.Post, nft, wallet: 0n,
        },
      }).send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

      // the first reaction with an NFT pays for the reaction record and for the counter box, which is
      // never refunded; a payer other than the reactor also funds the record that remembers them
      const storage = REACTION_RECORD_MBR + REACTIONS_MBR
      await expect(react(storage)).rejects.toThrow()
      const paidFrom = await balance(deployer.addr.toString())
      await react(storage + PAYER_RECORD_MBR)
      expect(paidFrom - (await balance(deployer.addr.toString()))).toBe(storage + PAYER_RECORD_MBR + 1_000n)
      const { userReactedNfts } = await user2Sdk.getPostReactions({ ref: postKey, userAddress: user2.addr.toString() })
      expect(userReactedNfts.has(nft)).toBe(true)

      // removing the reaction returns the record deposit and the payer record to the payer, nothing to the reactor
      const sponsorBefore = await balance(deployer.addr.toString())
      const reactorBefore = await balance(user2.addr.toString())
      await user2Sdk.deleteReaction({ ref: postKey, nft })
      expect((await balance(deployer.addr.toString())) - sponsorBefore).toBe(REACTION_RECORD_MBR + PAYER_RECORD_MBR)
      expect(await balance(user2.addr.toString())).toBeLessThan(reactorBefore)
    })

    test('S-09: anyone can pay a paywall MBR for the caller', async () => {
      const payWall = {
        userPayInfo: [[PayWallType.OneTimePayment, 0n, 1_000_000n]] as [number, bigint, bigint][],
        agentPayInfo: [],
      }
      const amount = MIN_PAYWALL_MBR + BOX_COST_PER_BYTE * PAYWALL_PAY_OPTION_SIZE
      const create = async (paid: bigint) => daoSdk.socialClient.send.createPayWall({
        sender: user1.addr,
        signer: user1.signer,
        args: {
          mbrPayment: {
            txn: await algorand.createTransaction.payment({ sender: user2.addr, receiver: daoSdk.socialClient.appAddress, amount: algokit.microAlgo(paid) }),
            signer: user2.signer,
          },
          payWall,
        },
        populateAppCallResources: true,
      })

      // paywall storage is never refunded, so no payer is remembered: the plain amount is exact
      await expect(create(amount - 1n)).rejects.toThrow(new RegExp(errInvalidPayment))
      const { return: payWallId } = await create(amount)
      expect(payWallId).toBeGreaterThan(0n)
    })

    test('S-05: post, reply, a vote that materializes a ref, and react do not drain the app', async () => {
      const start = await socialFreeBalance()
      const { postKey } = await user1Sdk.post({ cid: new Uint8Array(36).fill(74) })
      await user2Sdk.reply({ cid: new Uint8Array(36).fill(75), ref: postKey, refType: RefType.Post })
      const freshAddress = algorand.account.random().addr.publicKey
      await user2Sdk.vote({ ref: freshAddress, refType: RefType.Address, isUp: false })
      const nft = await createNft(user2)
      await user2Sdk.react({ ref: postKey, refType: RefType.Post, nft })
      expect(await socialFreeBalance()).toBeGreaterThanOrEqual(start)
    })

  })
})
