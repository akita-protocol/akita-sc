import { Config, microAlgos } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { beforeAll, describe, expect, test } from 'vitest'
import { PollSDK, PollTypeEnum } from 'akita-sdk/poll'
import algosdk from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { getAccountBalance } from '../../tests/utils/balance'
import { TimeWarp } from '../../tests/utils/time'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';

Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

// Time Constants
const ONE_DAY = 86_400

/**
 * Get the current Algorand block timestamp
 */
const getBlockTimestamp = async (algorand: import('@algorandfoundation/algokit-utils').AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  const block = await algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

describe('Poll SDK', () => {
  let deployer: TransactionSignerAccount
  let creator: TransactionSignerAccount
  let voter1: TransactionSignerAccount
  let voter2: TransactionSignerAccount
  let akitaUniverse: AkitaUniverse
  let pollSDK: PollSDK
  let timeWarp: TimeWarp
  let dispenser: TransactionSignerAccount
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()
    timeWarp = new TimeWarp(algorand)

    // Reset any time offset from previous test runs
    await timeWarp.resetTimeWarp()

    const ctx = fixture.context
    deployer = await ctx.generateAccount({ initialFunds: microAlgos(2_000_000_000) })
    creator = await ctx.generateAccount({ initialFunds: microAlgos(500_000_000) })
    voter1 = await ctx.generateAccount({ initialFunds: microAlgos(100_000_000) })
    voter2 = await ctx.generateAccount({ initialFunds: microAlgos(100_000_000) })

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
    await algorand.account.ensureFunded(creator.addr, dispenser.addr, (500).algo())
    await algorand.account.ensureFunded(voter1.addr, dispenser.addr, (100).algo())
    await algorand.account.ensureFunded(voter2.addr, dispenser.addr, (100).algo())

    // Build the full Akita DAO universe (includes pollFactory with escrow configured)
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    })

    // Fund the poll factory to cover poll creation MBR
    await algorand.account.ensureFunded(akitaUniverse.pollFactory.client.appAddress, dispenser.addr, (100).algo())
  })

  describe('PollFactorySDK', () => {
    describe('cost()', () => {
      test('should return the cost to create a poll', async () => {
        const cost = await akitaUniverse.pollFactory.cost()
        expect(cost).toBeGreaterThan(0n)
      })
    })

    describe('new()', () => {
      test('should create a new single choice poll', async () => {
        const currentTimestamp = await getBlockTimestamp(algorand)
        const creatorBalanceBefore = await getAccountBalance(algorand, creator.addr.toString())

        pollSDK = await akitaUniverse.pollFactory.new({
          sender: creator.addr,
          signer: creator.signer,
          type: PollTypeEnum.SingleChoice,
          endTime: currentTimestamp + BigInt(ONE_DAY),
          maxSelected: 1n,
          question: 'What is your favorite color?',
          options: ['Red', 'Blue', 'Green'],
          gateId: 0n,
        })

        expect(pollSDK).toBeInstanceOf(PollSDK)
        expect(pollSDK.client.appId).toBeGreaterThan(0n)

        // Verify cost was deducted from creator
        const creatorBalanceAfter = await getAccountBalance(algorand, creator.addr.toString())
        expect(creatorBalanceBefore - creatorBalanceAfter).toBeGreaterThan(0n)
      })

      test('should create a multiple choice poll', async () => {
        const currentTimestamp = await getBlockTimestamp(algorand)

        const multiPoll = await akitaUniverse.pollFactory.new({
          sender: creator.addr,
          signer: creator.signer,
          type: PollTypeEnum.MultipleChoice,
          endTime: currentTimestamp + BigInt(ONE_DAY),
          maxSelected: 3n,
          question: 'Which features do you want?',
          options: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
          gateId: 0n,
        })

        expect(multiPoll).toBeInstanceOf(PollSDK)
        const state = await multiPoll.state()
        expect(state.maxSelected).toBe(3n)
        expect(state.optionCount).toBe(4n)
      })
    })

    describe('get()', () => {
      test('should return PollSDK for existing poll', () => {
        const existingPoll = akitaUniverse.pollFactory.get({ appId: pollSDK.client.appId })
        expect(existingPoll).toBeInstanceOf(PollSDK)
        expect(existingPoll.client.appId).toBe(pollSDK.client.appId)
      })
    })
  })

  describe('PollSDK', () => {
    describe('state()', () => {
      test('should return the current poll state', async () => {
        const state = await pollSDK.state()
        expect(state.type).toBe(PollTypeEnum.SingleChoice)
        expect(state.question).toBe('What is your favorite color?')
        expect(state.optionCount).toBe(3n)
        // maxSelected is only set for MultipleChoice polls, defaults to 0 for SingleChoice
        expect(state.maxSelected).toBe(0n)
      })
    })

    describe('getOptions()', () => {
      test('should return options as array', async () => {
        const options = await pollSDK.getOptions()
        expect(options).toEqual(['Red', 'Blue', 'Green'])
      })
    })

    describe('getVoteCounts()', () => {
      test('should return vote counts as array', async () => {
        const votes = await pollSDK.getVoteCounts()
        expect(votes).toEqual([0n, 0n, 0n])
      })
    })

    describe('hasEnded()', () => {
      test('should return false before poll ends', async () => {
        const hasEnded = await pollSDK.hasEnded()
        expect(hasEnded).toBe(false)
      })
    })

    describe('hasVoted()', () => {
      test('should return false for voters who have not voted', async () => {
        const hasVoted = await pollSDK.hasVoted({ user: voter1.addr.toString() })
        expect(hasVoted).toBe(false)
      })
    })

    describe('vote()', () => {
      test('should allow voting for a single option', async () => {
        await pollSDK.vote({
          sender: voter1.addr,
          signer: voter1.signer,
          votes: [0n], // Vote for option 0 (Red)
        })

        const hasVoted = await pollSDK.hasVoted({ user: voter1.addr.toString() })
        expect(hasVoted).toBe(true)

        const votes = await pollSDK.getVoteCounts()
        expect(votes[0]).toBe(1n)
      })

      test('should update vote counts correctly', async () => {
        await pollSDK.vote({
          sender: voter2.addr,
          signer: voter2.signer,
          votes: [1n], // Vote for option 1 (Blue)
        })

        const votes = await pollSDK.getVoteCounts()
        expect(votes[0]).toBe(1n) // Red
        expect(votes[1]).toBe(1n) // Blue
      })
    })

    describe('deletePoll()', () => {
      test('should reject deleting an active poll', async () => {
        await expect(akitaUniverse.pollFactory.deletePoll({
          sender: creator.addr,
          signer: creator.signer,
          appId: pollSDK.client.appId,
        })).rejects.toThrow()
      })
    })

    describe('deleteBoxes()', () => {
      test('should reject deleting a finished poll while vote boxes remain', async () => {
        // Time warp to after poll ends
        await timeWarp.timeWarp(BigInt(ONE_DAY + 10))

        await expect(akitaUniverse.pollFactory.deletePoll({
          sender: creator.addr,
          signer: creator.signer,
          appId: pollSDK.client.appId,
        })).rejects.toThrow()
      })

      test('should delete boxes and refund MBR after poll ends', async () => {
        await pollSDK.deleteBoxes({
          sender: creator.addr,
          signer: creator.signer,
          addresses: [voter1.addr.toString(), voter2.addr.toString()],
        })

        // Boxes should be deleted
        const state = await pollSDK.state()
        expect(state.boxCount).toBe(0n)
      })
    })

    describe('deletePoll() after cleanup', () => {
      test('should delete a finished poll after boxes are deleted', async () => {
        await akitaUniverse.pollFactory.deletePoll({
          sender: creator.addr,
          signer: creator.signer,
          appId: pollSDK.client.appId,
        })

        await expect(algorand.client.algod.getApplicationByID(Number(pollSDK.client.appId)).do()).rejects.toThrow()
      })
    })
  })

  describe('Audit regressions (PL-01, PL-02, PL-04)', () => {
    const spendable = async (address: string) => {
      const info = await algorand.account.getInformation(address)
      return info.balance.microAlgos - info.minBalance.microAlgos
    }

    const newShortPoll = async (type: PollTypeEnum = PollTypeEnum.SingleChoice, maxSelected = 1n) =>
      akitaUniverse.pollFactory.new({
        sender: creator.addr,
        signer: creator.signer,
        type,
        endTime: (await getBlockTimestamp(algorand)) + 60n,
        maxSelected,
        question: 'Regression?',
        options: ['Yes', 'No', 'Maybe'],
        gateId: 0n,
      })

    test('PL-01: create/delete cycles leave the factory balance unchanged and close the poll account', async () => {
      const factory = akitaUniverse.pollFactory.client.appAddress.toString()
      for (const scenario of ['empty', 'voted', 'donated'] as const) {
        const before = await spendable(factory)
        const poll = await newShortPoll()
        const pollAddress = poll.client.appAddress.toString()
        if (scenario === 'voted') {
          await poll.vote({ sender: voter1.addr, signer: voter1.signer, votes: [0n] })
        }
        if (scenario === 'donated') {
          await algorand.send.payment({ sender: dispenser.addr, receiver: pollAddress, amount: (1).algo() })
        }
        await timeWarp.timeWarp(61n)
        if (scenario === 'voted') {
          await poll.deleteBoxes({ sender: creator.addr, signer: creator.signer, addresses: [voter1.addr.toString()] })
        }
        await akitaUniverse.pollFactory.deletePoll({ sender: creator.addr, signer: creator.signer, appId: poll.client.appId })
        // The deleted poll's account is closed back to the factory; nothing is stranded.
        expect((await algorand.account.getInformation(pollAddress)).balance.microAlgos).toBe(0n)
        // The funder's refund is capped at its deposit, so the factory never pays out of its own balance.
        expect(await spendable(factory) - before).toBe(scenario === 'donated' ? 1_000_000n : 0n)
      }
    })

    test('PL-02: only the four poll types are accepted, including MultipleChoiceImpact', async () => {
      for (const invalid of [0, 15, 25, 39, 41]) {
        await expect(newShortPoll(invalid as PollTypeEnum, 2n)).rejects.toThrow(/errIpty/)
      }
      const poll = await newShortPoll(PollTypeEnum.MultipleChoiceImpact, 2n)
      await poll.vote({ sender: voter2.addr, signer: voter2.signer, votes: [0n, 2n] })
      const [yes, no, maybe] = await poll.getVoteCounts()
      expect(yes).toBeGreaterThan(0n)
      expect(maybe).toBe(yes)
      expect(no).toBe(0n)
    })

    test('PL-04: the vote MBR must be paid by the voter', async () => {
      const poll = await newShortPoll()
      const sponsored = await algorand.createTransaction.payment({
        sender: voter1.addr, receiver: poll.client.appAddress, amount: microAlgos(15_300),
      })
      await expect(poll.client.send.vote({
        sender: voter2.addr,
        signer: voter2.signer,
        args: { mbrPayment: { txn: sponsored, signer: voter1.signer }, votes: [0n] },
      })).rejects.toThrow(/errIpms/)
      expect(await poll.hasVoted({ user: voter2.addr.toString() })).toBe(false)
    })

    test('AUD-C6: a voter who closed their account does not block the cleanup or the delete', async () => {
      const factory = akitaUniverse.pollFactory.client.appAddress.toString()
      const leaver = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const poll = await newShortPoll()
      const pollAddress = poll.client.appAddress.toString()

      await poll.vote({ sender: leaver.addr, signer: leaver.signer, votes: [0n] })
      await poll.vote({ sender: voter1.addr, signer: voter1.signer, votes: [1n] })

      // The leaver empties and closes their account: a 15,300 µALGO refund can no longer be delivered to it.
      await algorand.send.payment({
        sender: leaver.addr, signer: leaver.signer, receiver: dispenser.addr, amount: microAlgos(0), closeRemainderTo: dispenser.addr,
      })
      expect((await algorand.account.getInformation(leaver.addr)).balance.microAlgos).toBe(0n)

      await timeWarp.timeWarp(61n)
      const factoryBefore = await spendable(factory)
      const stayerBefore = await getAccountBalance(algorand, voter1.addr.toString())

      await poll.deleteBoxes({
        sender: creator.addr,
        signer: creator.signer,
        addresses: [leaver.addr.toString(), voter1.addr.toString()],
      })

      // Both vote boxes are gone; the voter who is still there is refunded, the closed account is skipped.
      expect(await poll.hasVoted({ user: leaver.addr.toString() })).toBe(false)
      expect(await poll.hasVoted({ user: voter1.addr.toString() })).toBe(false)
      expect(await getAccountBalance(algorand, voter1.addr.toString()) - stayerBefore).toBe(15_300n)
      expect((await algorand.account.getInformation(leaver.addr)).balance.microAlgos).toBe(0n)

      await akitaUniverse.pollFactory.deletePoll({ sender: creator.addr, signer: creator.signer, appId: poll.client.appId })
      expect((await algorand.account.getInformation(pollAddress)).balance.microAlgos).toBe(0n)
      // The deposit that could not be returned leaves with the poll's account and stays in the factory.
      expect(await spendable(factory) - factoryBefore).toBe(15_300n)
    })
  })

  describe('Fee System & Revenue Collection', () => {
    test('should verify poll factory has escrow configured', async () => {
      // The poll factory should have its akitaDaoEscrow configured
      const factoryState = await akitaUniverse.pollFactory.client.state.global.getAll()
      expect(factoryState.akitaDaoEscrow).toBeDefined()
      expect(factoryState.akitaDaoEscrow?.app).toBeGreaterThan(0n)
    })

    test('should verify DAO escrow exists for poll revenue', async () => {
      // Get the escrow info for poll revenue
      const pollEscrow = await akitaUniverse.dao.wallet.getEscrow('rev_poll')
      expect(pollEscrow).toBeDefined()
      expect(pollEscrow.id).toBeGreaterThan(0n)

      // The escrow balance should be tracked - derive address from escrow app ID
      const escrowAddress = algosdk.getApplicationAddress(pollEscrow.id).toString()
      const escrowBalance = await getAccountBalance(algorand, escrowAddress)
      expect(escrowBalance).toBeGreaterThanOrEqual(0n)
    })
  })
})
