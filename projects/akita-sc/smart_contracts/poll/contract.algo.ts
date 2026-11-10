import {
  Account,
  Application,
  BoxMap,
  bytes,
  clone,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { AcctParams, Global, Txn } from '@algorandfoundation/algorand-typescript/op'
import { GlobalStateKeyFunder } from '../constants'
import { errHasGate } from '../social/errors'
import { AkitaBaseContract } from '../utils/base-contracts/upgradeable'
import { assertSafePayment, gateCheck, getUserImpact } from '../utils/functions'
import { FunderInfo } from '../utils/types/mbr'
import {
  PollGlobalStateKeyBoxCount,
  PollGlobalStateKeyEndTime,
  PollGlobalStateKeyGateID,
  PollGlobalStateKeyMaxSelected,
  PollGlobalStateKeyOptionCount,
  PollGlobalStateKeyOptionFive,
  PollGlobalStateKeyOptionFour,
  PollGlobalStateKeyOptionOne,
  PollGlobalStateKeyOptionThree,
  PollGlobalStateKeyOptionTwo,
  PollGlobalStateKeyQuestion,
  PollGlobalStateKeyType,
  PollGlobalStateKeyVotesFive,
  PollGlobalStateKeyVotesFour,
  PollGlobalStateKeyVotesOne,
  PollGlobalStateKeyVotesThree,
  PollGlobalStateKeyVotesTwo,
  votesMBR,
} from './constants'
import {
  errAlreadyVoted,
  errBadDeployer,
  errFailedGate,
  errInvalidEndTime,
  errInvalidMaxSelection,
  errInvalidOptionCount,
  errInvalidPayment,
  errInvalidPollType,
  errInvalidVote,
  errInvalidVoteCount,
  errInvalidVoteOption,
  errMustBeCalledFromFactory,
  errNotVoted,
  errPollActive,
  errPollEnded,
  errStillHasVoteBoxes,
} from './errors'
import { MultipleChoice, MultipleChoiceImpact, PollType, SingleChoice, SingleChoiceImpact } from './types'

export class Poll extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** The type of poll: SingleChoice, MultipleChoice, SingleChoiceImpact or MultipleChoiceImpact */
  type = GlobalState<Uint8>({ key: PollGlobalStateKeyType })
  /** the gate id to be used for filtering who can interact with this poll */
  gateID = GlobalState<uint64>({ key: PollGlobalStateKeyGateID })
  /** the time the poll ends as a unix timestamp */
  endTime = GlobalState<uint64>({ key: PollGlobalStateKeyEndTime })
  /** the number of options in the poll */
  optionCount = GlobalState<uint64>({ key: PollGlobalStateKeyOptionCount })
  /** the maximum number of selections in a multiple choice poll */
  maxSelected = GlobalState<uint64>({ key: PollGlobalStateKeyMaxSelected })
  /** the number of boxes created during the poll */
  boxCount = GlobalState<uint64>({ key: PollGlobalStateKeyBoxCount })
  /** the creator-side MBR funder to refund after the poll is deleted */
  funder = GlobalState<FunderInfo>({ key: GlobalStateKeyFunder })
  /** the question being asked */
  question = GlobalState<string>({ key: PollGlobalStateKeyQuestion })
  /** the options and vote counts of the poll */
  optionOne = GlobalState<string>({ key: PollGlobalStateKeyOptionOne })
  optionTwo = GlobalState<string>({ key: PollGlobalStateKeyOptionTwo })
  optionThree = GlobalState<string>({ key: PollGlobalStateKeyOptionThree })
  optionFour = GlobalState<string>({ key: PollGlobalStateKeyOptionFour })
  optionFive = GlobalState<string>({ key: PollGlobalStateKeyOptionFive })
  /** the number of votes for each option */
  votesOne = GlobalState<uint64>({ initialValue: 0, key: PollGlobalStateKeyVotesOne })
  votesTwo = GlobalState<uint64>({ initialValue: 0, key: PollGlobalStateKeyVotesTwo })
  votesThree = GlobalState<uint64>({ initialValue: 0, key: PollGlobalStateKeyVotesThree })
  votesFour = GlobalState<uint64>({ initialValue: 0, key: PollGlobalStateKeyVotesFour })
  votesFive = GlobalState<uint64>({ initialValue: 0, key: PollGlobalStateKeyVotesFive })

  // BOXES ----------------------------------------------------------------------------------------

  /** A map of addresses to empty bytes to track who has voted */
  votes = BoxMap<Account, bytes<0>>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /**
   * Records a vote. Impact polls weight it by `getUserImpact(Txn.sender)` evaluated now.
   *
   * Known limitation (documented, not enforced): parts of the impact score, such as held AKTA,
   * come from transferable balances, and each address (including each ARC-58 escrow) votes
   * separately. The same AKTA can therefore be moved between addresses to vote with the same
   * weight more than once. Impact polls are advisory; do not use their totals for decisions
   * that move funds.
   */
  private createVote(votes: uint64[]): void {
    let impact: uint64 = 1
    if (this.type.value === SingleChoiceImpact || this.type.value === MultipleChoiceImpact) {
      impact = getUserImpact(this.akitaDAO.value, Txn.sender)
    }

    if (this.type.value === SingleChoice || this.type.value === SingleChoiceImpact) {
      loggedAssert(votes.length === 1, errInvalidVoteCount)
      loggedAssert(votes[0] <= this.optionCount.value - 1, errInvalidVoteOption)

      if (votes[0] === 0) {
        this.votesOne.value += impact
      } else if (votes[0] === 1) {
        this.votesTwo.value += impact
      } else if (votes[0] === 2) {
        this.votesThree.value += impact
      } else if (votes[0] === 3) {
        this.votesFour.value += impact
      } else if (votes[0] === 4) {
        this.votesFive.value += impact
      }
    } else {
      loggedAssert(votes.length <= this.maxSelected.value, errInvalidVoteCount)

      for (let i: uint64 = 0; i < votes.length; i += 1) {
        loggedAssert(votes[i] <= this.optionCount.value - 1, errInvalidVoteOption)
        for (let j: uint64 = i + 1; j < votes.length; j += 1) {
          loggedAssert(votes[i] !== votes[j], errInvalidVoteOption)
        }

        if (votes[i] === 0) {
          this.votesOne.value += impact
        } else if (votes[i] === 1) {
          this.votesTwo.value += impact
        } else if (votes[i] === 2) {
          this.votesThree.value += impact
        } else if (votes[i] === 3) {
          this.votesFour.value += impact
        } else if (votes[i] === 4) {
          this.votesFive.value += impact
        }
      }
    }

    this.votes(Txn.sender).create()
    this.boxCount.value += 1
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(
    akitaDAO: uint64,
    type: PollType,
    endTime: uint64,
    maxSelected: uint64,
    funder: FunderInfo,
    question: string,
    options: string[],
    gateID: uint64
  ): void {
    loggedAssert(Global.callerApplicationId !== 0, errBadDeployer)
    loggedAssert(Global.latestTimestamp < endTime, errInvalidEndTime)
    loggedAssert(
      type === SingleChoice || type === MultipleChoice || type === SingleChoiceImpact || type === MultipleChoiceImpact,
      errInvalidPollType
    )

    this.akitaDAO.value = Application(akitaDAO)
    this.type.value = type
    this.gateID.value = gateID
    this.endTime.value = endTime
    this.funder.value = clone(funder)
    this.question.value = question

    loggedAssert(options.length >= 2 && options.length <= 5, errInvalidOptionCount)

    if (type === MultipleChoice || type === MultipleChoiceImpact) {
      loggedAssert(maxSelected >= 2 && maxSelected <= options.length - 1, errInvalidMaxSelection)
      this.maxSelected.value = maxSelected
    }

    this.optionCount.value = options.length
    this.boxCount.value = 0

    this.optionOne.value = options[0]
    this.optionTwo.value = options[1]

    if (options.length >= 3) {
      this.optionThree.value = options[2]
    }

    if (options.length >= 4) {
      this.optionFour.value = options[3]
    }

    if (options.length >= 5) {
      this.optionFive.value = options[4]
    }
  }

  deleteBoxes(addresses: Account[]): void {
    loggedAssert(Global.latestTimestamp > this.endTime.value, errPollActive)

    for (let i: uint64 = 0; i < addresses.length; i += 1) {

      loggedAssert(this.votes(addresses[i]).exists, errNotVoted)
      this.votes(addresses[i]).delete()

      // A closed (empty) account cannot receive a payment below the minimum balance. Its deposit stays
      // here and leaves with the rest of the account when the poll is deleted, so a voter who closed
      // their account never blocks the cleanup or the delete.
      const [balance] = AcctParams.acctBalance(addresses[i])
      if (balance > 0) {
        itxn
          .payment({
            receiver: addresses[i],
            amount: votesMBR,
            note: 'MBR refund for poll vote',
          })
          .submit()
      }

      this.boxCount.value -= 1
    }
  }

  @abimethod({ allowActions: 'DeleteApplication' })
  deleteApplication(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errMustBeCalledFromFactory)
    loggedAssert(Global.latestTimestamp > this.endTime.value, errPollActive)
    loggedAssert(this.boxCount.value === 0, errStillHasVoteBoxes)
    // Return the whole account (the factory-forwarded min balance and any surplus) to the factory,
    // which refunds the funder; nothing is stranded in the deleted app's account.
    itxn
      .payment({ closeRemainderTo: Global.creatorAddress })
      .submit()
  }

  // POLL METHODS --------------------------------------------------------------------------------

  gatedVote(
    mbrPayment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    votes: uint64[]
  ): void {
    loggedAssert(Global.latestTimestamp <= this.endTime.value, errPollEnded)
    loggedAssert(!this.votes(Txn.sender).exists, errAlreadyVoted)
    loggedAssert(votes.length <= 5 && votes.length >= 1, errInvalidVote)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, this.gateID.value), errFailedGate)
    // the voter funds its own vote box, so the refund in `deleteBoxes` reaches the payer
    assertSafePayment(mbrPayment, Txn.sender)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === votesMBR, errInvalidPayment)

    this.createVote(votes)
  }

  vote(mbrPayment: gtxn.PaymentTxn, votes: uint64[]): void {
    loggedAssert(Global.latestTimestamp <= this.endTime.value, errPollEnded)
    loggedAssert(!this.votes(Txn.sender).exists, errAlreadyVoted)
    loggedAssert(votes.length <= 5 && votes.length >= 1, errInvalidVote)
    loggedAssert(this.gateID.value === 0, errHasGate)
    // the voter funds its own vote box, so the refund in `deleteBoxes` reaches the payer
    assertSafePayment(mbrPayment, Txn.sender)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === votesMBR, errInvalidPayment)

    this.createVote(votes)
  }

  @abimethod({ readonly: true })
  hasVoted(user: Account): boolean {
    return this.votes(user).exists
  }
}
