import { Config, microAlgos } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { beforeAll, describe, expect, test } from 'vitest'
import { PollSDK, PollTypeEnum } from 'akita-sdk/poll'
import { GateSDK, LogicalOperator } from 'akita-sdk/gates'
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

    test('PL-04: anyone can pay the vote MBR; the vote belongs to the caller and the deposit returns to the payer', async () => {
      const poll = await newShortPoll()
      const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgos
      const pay = (amount: number, extra: { rekeyTo?: typeof voter2.addr } = {}, to = poll) =>
        algorand.createTransaction.payment({ sender: voter1.addr, receiver: to.client.appAddress, amount: microAlgos(amount), ...extra })

      // a payer other than the voter is remembered: the vote deposit alone is not enough
      await expect(poll.client.send.vote({
        sender: voter2.addr,
        signer: voter2.signer,
        args: { mbrPayment: { txn: await pay(15_300), signer: voter1.signer }, votes: [0n] },
      })).rejects.toThrow(/errIpay/)
      expect(await poll.hasVoted({ user: voter2.addr.toString() })).toBe(false)

      const sponsorBefore = await balance(voter1.addr.toString())
      const voterBefore = await balance(voter2.addr.toString())
      await poll.client.send.vote({
        sender: voter2.addr,
        signer: voter2.signer,
        args: { mbrPayment: { txn: await pay(15_300 + 28_500), signer: voter1.signer }, votes: [0n] },
      })
      expect(await poll.hasVoted({ user: voter2.addr.toString() })).toBe(true)
      expect(await poll.hasVoted({ user: voter1.addr.toString() })).toBe(false)
      // the sponsor paid the vote deposit, its payer record and its own network fee; the voter paid a network fee only
      expect(sponsorBefore - (await balance(voter1.addr.toString()))).toBe(15_300n + 28_500n + 1_000n)
      expect(voterBefore - (await balance(voter2.addr.toString()))).toBeLessThan(15_300n)

      // the cleanup returns both deposits to the sponsor, and nothing to the voter
      await timeWarp.timeWarp(61n)
      const sponsorHeld = await balance(voter1.addr.toString())
      const voterHeld = await balance(voter2.addr.toString())
      await poll.deleteBoxes({ sender: creator.addr, signer: creator.signer, addresses: [voter2.addr.toString()] })
      expect((await balance(voter1.addr.toString())) - sponsorHeld).toBe(15_300n + 28_500n)
      expect(await balance(voter2.addr.toString())).toBe(voterHeld)
      await akitaUniverse.pollFactory.deletePoll({ sender: creator.addr, signer: creator.signer, appId: poll.client.appId })
      expect((await algorand.account.getInformation(poll.client.appAddress)).balance.microAlgos).toBe(0n)

      // the payment still has to be a plain one: it may not rekey its payer
      const other = await newShortPoll()
      await expect(other.client.send.vote({
        sender: voter2.addr,
        signer: voter2.signer,
        args: { mbrPayment: { txn: await pay(15_300 + 28_500, { rekeyTo: voter2.addr }, other), signer: voter1.signer }, votes: [0n] },
      })).rejects.toThrow()
      expect(await other.hasVoted({ user: voter2.addr.toString() })).toBe(false)
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

  describe('AUD-C17: the poll creator holds the cleanup', () => {
    const newShortPoll = async () =>
      akitaUniverse.pollFactory.new({
        sender: creator.addr,
        signer: creator.signer,
        type: PollTypeEnum.SingleChoice,
        endTime: (await getBlockTimestamp(algorand)) + 60n,
        maxSelected: 1n,
        question: 'Who cleans up?',
        options: ['Creator', 'Anyone'],
        gateId: 0n,
      })

    const gateCheck = async (caller: string, gateId: bigint): Promise<boolean> => {
      const { return: passed } = await akitaUniverse.gate.client.send.check({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { caller, gateId, args: [new Uint8Array()] },
        extraFee: microAlgos(10_000),
      })
      return passed!
    }

    test('nobody but the creator can delete vote boxes, and a poll gate holds until the creator does', async () => {
      const poll = await newShortPoll()
      await poll.vote({ sender: voter1.addr, signer: voter1.signer, votes: [0n] })

      const gates = new GateSDK({
        algorand,
        factoryParams: { appId: akitaUniverse.gate.appId, defaultSender: deployer.addr.toString(), defaultSigner: deployer.signer },
        gateRegistry: { poll: akitaUniverse.subgates.pollGate.appId },
      })
      const gateId = (await gates.register({
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        args: [{
          type: 'poll',
          appId: akitaUniverse.subgates.pollGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          poll: poll.client.appId,
        }],
      })).return!

      expect(await gateCheck(voter1.addr.toString(), gateId)).toBe(true)
      expect(await gateCheck(voter2.addr.toString(), gateId)).toBe(false)

      await timeWarp.timeWarp(61n)

      // After the poll ends: a stranger cannot remove a voter's box, and neither can the voter.
      for (const outsider of [voter2, voter1]) {
        await expect(poll.deleteBoxes({
          sender: outsider.addr, signer: outsider.signer, addresses: [voter1.addr.toString()],
        })).rejects.toThrow(/errNcre/)
      }
      // The poll cannot be deleted from under the gate either while a box remains.
      await expect(akitaUniverse.pollFactory.deletePoll({
        sender: voter2.addr, signer: voter2.signer, appId: poll.client.appId,
      })).rejects.toThrow(/errShvb/)
      // So the gate still passes the voter after the poll has ended.
      expect(await poll.hasVoted({ user: voter1.addr.toString() })).toBe(true)
      expect(await gateCheck(voter1.addr.toString(), gateId)).toBe(true)

      // The creator cleans up; the voter gets the deposit back.
      const voterBefore = await getAccountBalance(algorand, voter1.addr.toString())
      await poll.deleteBoxes({ sender: creator.addr, signer: creator.signer, addresses: [voter1.addr.toString()] })
      expect(await getAccountBalance(algorand, voter1.addr.toString()) - voterBefore).toBe(15_300n)
      expect(await gateCheck(voter1.addr.toString(), gateId)).toBe(false)

      // Once the poll itself is deleted the gate answers false. It used to fail the whole call.
      await akitaUniverse.pollFactory.deletePoll({ sender: voter2.addr, signer: voter2.signer, appId: poll.client.appId })
      await expect(algorand.client.algod.getApplicationByID(Number(poll.client.appId)).do()).rejects.toThrow()
      expect(await gateCheck(voter1.addr.toString(), gateId)).toBe(false)
      expect(await gateCheck(voter2.addr.toString(), gateId)).toBe(false)
    })

    test('a poll gate on an app that is not a poll answers false', async () => {
      const gates = new GateSDK({
        algorand,
        factoryParams: { appId: akitaUniverse.gate.appId, defaultSender: deployer.addr.toString(), defaultSigner: deployer.signer },
        gateRegistry: { poll: akitaUniverse.subgates.pollGate.appId },
      })
      const gateId = (await gates.register({
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        args: [{
          type: 'poll',
          appId: akitaUniverse.subgates.pollGate.appId,
          layer: 0n,
          logicalOperator: LogicalOperator.None,
          // the poll factory is a real app, but no poll
          poll: akitaUniverse.pollFactory.client.appId,
        }],
      })).return!
      expect(await gateCheck(voter1.addr.toString(), gateId)).toBe(false)
    })
  })

  describe('AUD-C24: a sponsored poll belongs to its author', () => {
    const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgos
    const factoryInfo = async () => {
      const info = await algorand.account.getInformation(akitaUniverse.pollFactory.client.appAddress)
      const boxes = await algorand.app.getBoxNames(akitaUniverse.pollFactory.client.appId)
      return { spendable: info.balance.microAlgos - info.minBalance.microAlgos, boxes: boxes.length }
    }

    /**
     * `author` calls the factory, `payer` signs the payment. Returns the new poll's app id, a plain
     * number, so a call that was expected to fail and did not is reported without printing an SDK object.
     */
    const createId = async (
      author: TransactionSignerAccount,
      payer: TransactionSignerAccount,
      amount: bigint,
      extra: { rekeyTo?: typeof payer.addr } = {},
    ) => {
      const payment = await algorand.createTransaction.payment({
        sender: payer.addr,
        receiver: akitaUniverse.pollFactory.client.appAddress,
        amount: microAlgos(amount),
        ...extra,
      })
      const { return: appId } = await akitaUniverse.pollFactory.client.send.new({
        sender: author.addr,
        signer: author.signer,
        args: {
          payment: { txn: payment, signer: payer.signer },
          type: PollTypeEnum.SingleChoice,
          endTime: (await getBlockTimestamp(algorand)) + 60n,
          maxSelected: 1n,
          question: 'Who holds a sponsored poll?',
          options: ['Author', 'Sponsor'],
          gateId: 0n,
        },
        coverAppCallInnerTransactionFees: true,
        maxFee: microAlgos(5_000),
      })
      return appId!
    }
    const create = async (author: TransactionSignerAccount, payer: TransactionSignerAccount, amount: bigint) =>
      akitaUniverse.pollFactory.get({ appId: await createId(author, payer, amount) })

    test('anyone may pay for a poll: the author clears its votes and the payer gets the deposit back', async () => {
      const sponsor = await fixture.context.generateAccount({ initialFunds: microAlgos(20_000_000) })
      const cost = await akitaUniverse.pollFactory.cost()
      const before = await factoryInfo()

      // a payer that is not the author is remembered, so the bare deposit is not enough
      await expect(createId(creator, sponsor, cost)).rejects.toThrow(/errIpay/)
      // and the payment has to be a plain one: it may not rekey its payer
      await expect(createId(creator, sponsor, cost + 28_500n, { rekeyTo: creator.addr })).rejects.toThrow()
      expect(await factoryInfo()).toEqual(before)

      const sponsorBefore = await balance(sponsor.addr.toString())
      const poll = await create(creator, sponsor, cost + 28_500n)
      // the sponsor paid the deposit, its payer record and its own network fee
      expect(sponsorBefore - (await balance(sponsor.addr.toString()))).toBe(cost + 28_500n + 1_000n)
      // the poll records its author, and the factory holds the one payer record
      const funder = await poll.client.state.global.funder()
      expect(funder!.account).toBe(creator.addr.toString())
      expect(funder!.amount).toBe(cost)
      expect(await factoryInfo()).toEqual({ spendable: before.spendable, boxes: before.boxes + 1 })

      await poll.vote({ sender: voter1.addr, signer: voter1.signer, votes: [0n] })
      await timeWarp.timeWarp(61n)

      // paying for the poll gives no say over its votes: only the author clears them
      await expect(poll.deleteBoxes({
        sender: sponsor.addr, signer: sponsor.signer, addresses: [voter1.addr.toString()],
      })).rejects.toThrow(/errNcre/)
      expect(await poll.hasVoted({ user: voter1.addr.toString() })).toBe(true)
      const voterBefore = await balance(voter1.addr.toString())
      await poll.deleteBoxes({ sender: creator.addr, signer: creator.signer, addresses: [voter1.addr.toString()] })
      expect((await balance(voter1.addr.toString())) - voterBefore).toBe(15_300n)

      // anyone may delete the finished poll: the deposit and the payer record go back to the sponsor
      const sponsorHeld = await balance(sponsor.addr.toString())
      const authorHeld = await balance(creator.addr.toString())
      await akitaUniverse.pollFactory.deletePoll({ sender: voter2.addr, signer: voter2.signer, appId: poll.client.appId })
      expect((await balance(sponsor.addr.toString())) - sponsorHeld).toBe(cost + 28_500n)
      expect(await balance(creator.addr.toString())).toBe(authorHeld)
      expect(await factoryInfo()).toEqual(before)
    })

    test('a poll its author pays for keeps no payer record and refunds the author', async () => {
      const cost = await akitaUniverse.pollFactory.cost()
      const before = await factoryInfo()

      // the author owes the deposit alone
      await expect(createId(creator, creator, cost + 28_500n)).rejects.toThrow(/errIpay/)
      const poll = await create(creator, creator, cost)
      const funder = await poll.client.state.global.funder()
      expect(funder!.account).toBe(creator.addr.toString())
      expect(funder!.amount).toBe(cost)
      expect(await factoryInfo()).toEqual(before)

      await timeWarp.timeWarp(61n)
      const authorHeld = await balance(creator.addr.toString())
      await akitaUniverse.pollFactory.deletePoll({ sender: voter2.addr, signer: voter2.signer, appId: poll.client.appId })
      expect((await balance(creator.addr.toString())) - authorHeld).toBe(cost)
      expect(await factoryInfo()).toEqual(before)
    })

    test('a sponsor that closed its account is opened again by the refund', async () => {
      const sponsor = await fixture.context.generateAccount({ initialFunds: microAlgos(20_000_000) })
      const cost = await akitaUniverse.pollFactory.cost()
      const before = await factoryInfo()
      const poll = await create(creator, sponsor, cost + 28_500n)
      await algorand.send.payment({
        sender: sponsor.addr, signer: sponsor.signer, receiver: dispenser.addr, amount: microAlgos(0), closeRemainderTo: dispenser.addr,
      })
      expect(await balance(sponsor.addr.toString())).toBe(0n)

      await timeWarp.timeWarp(61n)
      await akitaUniverse.pollFactory.deletePoll({ sender: voter2.addr, signer: voter2.signer, appId: poll.client.appId })
      expect(await balance(sponsor.addr.toString())).toBe(cost + 28_500n)
      expect(await factoryInfo()).toEqual(before)
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
