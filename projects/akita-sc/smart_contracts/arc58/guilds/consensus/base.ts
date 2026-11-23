import {
  Account,
  Application,
  BoxMap,
  bytes,
  Bytes,
  clone,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  loggedErr,
  match,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { MAX_UINT64, ONE_HUNDRED_PERCENT } from '../../../utils/constants'
import {
  GuildConsensusBallotMBR,
  GuildVoteMBR,
  GuildConsensusBoxPrefixBallots,
  GuildConsensusBoxPrefixVotes,
  GuildConsensusGlobalStateKeyActivated,
  GuildConsensusGlobalStateKeyActiveBallots,
  GuildConsensusGlobalStateKeyGuild,
  GuildGlobalStateKeyAddAllowancesProposalSettings,
  GuildGlobalStateKeyAddPluginProposalSettings,
  GuildGlobalStateKeyConsensus,
  GuildGlobalStateKeyNewEscrowProposalSettings,
  GuildGlobalStateKeyRemoveAllowancesProposalSettings,
  GuildGlobalStateKeyRemoveExecutionProposalSettings,
  GuildGlobalStateKeyRemovePluginProposalSettings,
  GuildGlobalStateKeyToggleEscrowLockProposalSettings,
  GuildGlobalStateKeyUpdateGuildProposalSettings,
  GuildGlobalStateKeyUpgradeAppProposalSettings,
  GuildVoteAbstain,
  GuildVoteApprove,
  GuildVoteReject,
  MAX_GUILD_PROPOSAL_POWER,
  MAX_GUILD_VOTING_DURATION,
} from '../core/constants'
import {
  errGuildFactoryOnly,
  errGuildInvalidConsensusAction,
  errGuildInvalidPayment,
  errGuildInvalidProposal,
  errGuildInvalidProposalState,
  errGuildInvalidSettings,
  errGuildInvalidVote,
  errGuildInvalidWeight,
  errGuildNoGovernancePower,
  errGuildUnsafeSnapshot,
  errGuildVoteMissing,
  errGuildVotingOpen,
  errGuildWalletAlreadySet,
} from '../core/errors'
import type {
  GuildConsensusBallot,
  GuildConsensusRequirements,
  GuildConsensusResult,
  GuildProposalSettings,
  GuildVote,
  GuildVoteKey,
  GuildVoteType,
} from '../core/types'

/** Shared ballot storage, vote accounting, resolution, and cleanup mechanics for every consensus policy. */
export class GuildConsensusBase extends Contract {
  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** Guild permanently paired with this consensus application */
  guild = GlobalState<Application>({ key: GuildConsensusGlobalStateKeyGuild })
  /** number of proposals with an open ballot */
  activeBallots = GlobalState<uint64>({ initialValue: 0, key: GuildConsensusGlobalStateKeyActiveBallots })
  /** whether the paired Guild has left draft; settings are re-validated on policy changes afterwards */
  activated = GlobalState<boolean>({ initialValue: false, key: GuildConsensusGlobalStateKeyActivated })

  // BOXES ----------------------------------------------------------------------------------------

  /** ballot state keyed by Guild proposal ID */
  ballots = BoxMap<uint64, GuildConsensusBallot>({ keyPrefix: GuildConsensusBoxPrefixBallots })
  /** individual vote receipts keyed by proposal ID and voter */
  votes = BoxMap<GuildVoteKey, GuildVote>({ keyPrefix: GuildConsensusBoxPrefixVotes })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  protected initializeConsensus(): void {
    loggedAssert(
      Global.callerApplicationId !== 0 && Global.callerApplicationAddress === Global.creatorAddress,
      errGuildFactoryOnly,
    )
  }

  protected requireGuild(): void {
    loggedAssert(this.guild.hasValue && Global.callerApplicationId === this.guild.value.id, errGuildInvalidProposal)
  }

  protected guildSettings(): GuildProposalSettings[] {
    return [
      this.getGuildSettings(Bytes(GuildGlobalStateKeyUpgradeAppProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyAddPluginProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyRemoveExecutionProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyRemovePluginProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyAddAllowancesProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyRemoveAllowancesProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyNewEscrowProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyToggleEscrowLockProposalSettings)),
      this.getGuildSettings(Bytes(GuildGlobalStateKeyUpdateGuildProposalSettings)),
    ]
  }

  private getGuildSettings(key: bytes): GuildProposalSettings {
    const [encoded, exists] = op.AppGlobal.getExBytes(this.guild.value, key)
    loggedAssert(exists, errGuildInvalidSettings)
    return decodeArc4<GuildProposalSettings>(encoded)
  }

  /**
   * Pure policy validation also works before binding, while the factory creates the Guild.
   *
   * `fee` has no ceiling below uint64: it is counted in base units of whatever the Guild charges in, so
   * one number cannot bound ALGO and every asset alike. A Guild that sets a fee nobody can pay closes
   * that class of proposal to itself.
   */
  @abimethod({ readonly: true })
  validateSettings(settings: GuildProposalSettings): void {
    loggedAssert(
      settings.duration > 0 && settings.duration <= MAX_GUILD_VOTING_DURATION &&
      settings.power <= MAX_GUILD_PROPOSAL_POWER &&
      settings.participation <= ONE_HUNDRED_PERCENT && settings.approval <= ONE_HUNDRED_PERCENT &&
      (settings.approval > 0 || settings.minimumApprovals > 0),
      errGuildInvalidSettings,
    )
  }

  /** Split an opaque Guild consensus action into its policy-defined code and ABI payload. */
  protected consensusActionCode(data: bytes): uint64 {
    loggedAssert(data.length > 0, errGuildInvalidConsensusAction)
    return op.getByte(data, 0)
  }

  protected consensusActionPayload(data: bytes): bytes {
    return data.slice(1)
  }

  private productAtLeast(a: uint64, b: uint64, c: uint64, d: uint64): boolean {
    const [ah, al] = op.mulw(a, b)
    const [ch, cl] = op.mulw(c, d)
    return ah > ch || (ah === ch && al >= cl)
  }

  private recordVote(
    mbrPayment: gtxn.PaymentTxn,
    voter: Account,
    proposalID: uint64,
    vote: GuildVoteType,
    power: uint64,
  ): void {
    loggedAssert(this.ballots(proposalID).exists, errGuildInvalidProposal)
    const ballot = clone(this.ballots(proposalID).value)
    loggedAssert(!ballot.resolved && Global.latestTimestamp <= ballot.votingEnd, errGuildInvalidProposalState)

    // A voter may change their vote until the ballot resolves: the earlier vote's power is replaced, and
    // its receipt (already funded) is reused, so a change costs no storage.
    const key: GuildVoteKey = { proposalID, voter }
    const changing = this.votes(key).exists
    loggedAssert(
      match(mbrPayment, {
        sender: this.guild.value.address,
        receiver: Global.currentApplicationAddress,
        amount: changing ? 0 : GuildVoteMBR,
      }),
      errGuildInvalidPayment,
    )
    loggedAssert(power > 0, errGuildNoGovernancePower)

    if (changing) {
      const previous = clone(this.votes(key).value)
      if (previous.type === GuildVoteApprove) {
        ballot.votes.approvals -= previous.power
      } else if (previous.type === GuildVoteReject) {
        ballot.votes.rejections -= previous.power
      } else {
        ballot.votes.abstains -= previous.power
      }
    }

    const turnout: uint64 = ballot.votes.approvals + ballot.votes.rejections + ballot.votes.abstains
    loggedAssert(power <= MAX_UINT64 - turnout, errGuildInvalidWeight)

    if (vote === GuildVoteApprove) {
      ballot.votes.approvals += power
    } else if (vote === GuildVoteReject) {
      ballot.votes.rejections += power
    } else if (vote === GuildVoteAbstain) {
      ballot.votes.abstains += power
    } else {
      loggedErr(errGuildInvalidVote)
    }
    if (!changing) {
      ballot.voteCount += 1
    }

    this.ballots(proposalID).value = clone(ballot)
    this.votes(key).value = { type: vote, power }
  }

  protected openBallot(
    mbrPayment: gtxn.PaymentTxn,
    proposalID: uint64,
    votingEnd: uint64,
    requirements: GuildConsensusRequirements,
    eligiblePower: uint64,
    ballotMbr: uint64,
  ): void {
    this.requireGuild()
    loggedAssert(
      !this.ballots(proposalID).exists && votingEnd > Global.latestTimestamp,
      errGuildInvalidProposalState,
    )
    loggedAssert(
      requirements.participation <= ONE_HUNDRED_PERCENT && requirements.approval <= ONE_HUNDRED_PERCENT,
      errGuildInvalidSettings,
    )
    loggedAssert(
      match(mbrPayment, {
        sender: this.guild.value.address,
        receiver: Global.currentApplicationAddress,
        amount: ballotMbr,
      }),
      errGuildInvalidPayment,
    )

    this.ballots(proposalID).value = {
      resolved: false,
      approved: false,
      votingEnd,
      eligiblePower,
      voteCount: 0,
      requirements: clone(requirements),
      votes: { approvals: 0, rejections: 0, abstains: 0 },
    }
  }

  /**
   * Approval power demonstrated by the proposal that is applying a consensus action.
   *
   * Policies bound self-limiting changes (such as an approval floor) by it, so the coalition that
   * passed a change can always pass the next one. Before activation the creator configures the
   * policy through bootstrap proposals that never had a ballot, so no bound applies.
   */
  protected demonstratedApprovals(proposalID: uint64): uint64 {
    if (!this.activated.value) {
      return MAX_UINT64
    }
    loggedAssert(this.ballots(proposalID).exists, errGuildInvalidProposal)
    const ballot = clone(this.ballots(proposalID).value)
    loggedAssert(ballot.resolved && ballot.approved, errGuildInvalidProposalState)
    return ballot.votes.approvals
  }

  protected proposalVotingEnd(proposalID: uint64): uint64 {
    this.requireGuild()
    loggedAssert(this.ballots(proposalID).exists, errGuildInvalidProposal)
    return this.ballots(proposalID).value.votingEnd
  }

  protected voteWithPower(
    mbrPayment: gtxn.PaymentTxn,
    voter: Account,
    proposalID: uint64,
    vote: GuildVoteType,
    power: uint64,
  ): void {
    this.requireGuild()
    this.recordVote(mbrPayment, voter, proposalID, vote, power)
  }

  // CONSENSUS METHODS ----------------------------------------------------------------------------

  /** Permanently bind this consensus instance to the Guild created beside it. */
  bindGuild(guild: Application): void {
    loggedAssert(Global.callerApplicationId !== 0 &&
      (Global.callerApplicationAddress === Global.creatorAddress || guild.creator === Global.callerApplicationAddress), errGuildFactoryOnly)
    loggedAssert(!this.guild.hasValue && guild.id > 0, errGuildWalletAlreadySet)
    const [consensusID, exists] = op.AppGlobal.getExUint64(guild, Bytes(GuildGlobalStateKeyConsensus))
    loggedAssert(exists && consensusID === Global.currentApplicationId.id, errGuildInvalidProposal)
    this.guild.value = guild
  }

  protected resolveBallot(proposalID: uint64): GuildConsensusResult {
    this.requireGuild()
    loggedAssert(this.ballots(proposalID).exists, errGuildInvalidProposal)
    const ballot = clone(this.ballots(proposalID).value)
    loggedAssert(!ballot.resolved, errGuildInvalidProposalState)
    loggedAssert(ballot.eligiblePower > 0 || ballot.requirements.participation === 0, errGuildUnsafeSnapshot)

    const { approvals, rejections, abstains } = ballot.votes
    const turnout: uint64 = approvals + rejections + abstains
    ballot.approved = this.meetsRequirements(ballot, approvals, rejections, turnout)
    if (Global.latestTimestamp <= ballot.votingEnd) {
      loggedAssert(this.decidedEarly(ballot, ballot.approved), errGuildVotingOpen)
    }
    ballot.resolved = true
    this.ballots(proposalID).value = clone(ballot)
    return {
      approved: ballot.approved,
      approvals: ballot.votes.approvals,
      rejections: ballot.votes.rejections,
      abstains: ballot.votes.abstains,
      eligiblePower: ballot.eligiblePower,
    }
  }

  /** Whether these vote totals pass the ballot's requirements. */
  private meetsRequirements(ballot: GuildConsensusBallot, approvals: uint64, rejections: uint64, turnout: uint64): boolean {
    const decisive: uint64 = approvals + rejections
    return (
      approvals > 0 &&
      (ballot.requirements.participation === 0 ||
        this.productAtLeast(turnout, ONE_HUNDRED_PERCENT, ballot.eligiblePower, ballot.requirements.participation)) &&
      (ballot.requirements.minimumApprovals === 0 || approvals >= ballot.requirements.minimumApprovals) &&
      (ballot.requirements.approval === 0 ||
        (decisive > 0 && this.productAtLeast(approvals, ONE_HUNDRED_PERCENT, decisive, ballot.requirements.approval)))
    )
  }

  /**
   * Early close: whether the result already holds whatever the eligible power that has not voted does.
   * An approval must survive all of it rejecting; a rejection must survive all of it approving. Votes cast
   * so far count as they stand, since resolving closes the ballot (no later changes). Needs the eligible
   * power snapshot taken when the ballot opened; ballots without one only resolve once voting ends.
   */
  private decidedEarly(ballot: GuildConsensusBallot, approved: boolean): boolean {
    if (ballot.eligiblePower === 0) {
      return false
    }
    const { approvals, rejections, abstains } = ballot.votes
    const turnout: uint64 = approvals + rejections + abstains
    const remaining: uint64 = ballot.eligiblePower > turnout ? ballot.eligiblePower - turnout : 0
    if (approved) {
      // participation already holds with the votes cast, and more voters can only add to it
      return this.meetsRequirements(ballot, approvals, rejections + remaining, turnout)
    }
    return !this.meetsRequirements(ballot, approvals + remaining, rejections, turnout + remaining)
  }

  /** Delete terminal vote receipts in batches, then delete the empty ballot and refund its MBR to the Guild. */
  cleanupBallot(proposalID: uint64, voters: Account[]): uint64 {
    this.requireGuild()
    loggedAssert(this.ballots(proposalID).exists, errGuildInvalidProposal)
    const ballot = clone(this.ballots(proposalID).value)
    loggedAssert(ballot.resolved, errGuildInvalidProposalState)

    let reclaimed: uint64 = 0
    for (let i: uint64 = 0; i < voters.length; i += 1) {
      const key: GuildVoteKey = { proposalID, voter: voters[i] }
      loggedAssert(this.votes(key).exists, errGuildVoteMissing)
      this.votes(key).delete()
      ballot.voteCount -= 1
      reclaimed += GuildVoteMBR
    }

    if (ballot.voteCount === 0) {
      this.ballots(proposalID).delete()
      reclaimed += GuildConsensusBallotMBR
    } else {
      this.ballots(proposalID).value = clone(ballot)
    }

    if (reclaimed > 0) {
      itxn.payment({ receiver: this.guild.value.address, amount: reclaimed, fee: 0 }).submit()
    }
    return ballot.voteCount
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  getBallot(proposalID: uint64): GuildConsensusBallot {
    loggedAssert(this.ballots(proposalID).exists, errGuildInvalidProposal)
    return this.ballots(proposalID).value
  }

  @abimethod({ readonly: true })
  voteMbr(): uint64 {
    return GuildVoteMBR
  }

  /** Whether `voter` has a vote on the proposal (a further vote changes it). */
  @abimethod({ readonly: true })
  hasVoted(proposalID: uint64, voter: Account): boolean {
    return this.votes({ proposalID, voter }).exists
  }

  @abimethod({ readonly: true })
  ballotMbr(): uint64 {
    return GuildConsensusBallotMBR
  }

  opUp(): void {}
}
