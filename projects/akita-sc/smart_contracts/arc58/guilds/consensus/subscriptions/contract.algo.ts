import {
  Account,
  Application,
  Box,
  BoxMap,
  bytes,
  clone,
  contract,
  ensureBudget,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  loggedErr,
  match,
  op,
  OpUpFeeSource,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import {
  GuildConsensusNumGlobalBytes,
  GuildConsensusNumGlobalUints,
  MAX_SUBSCRIPTION_OFFERINGS,
  SubscriptionConsensusBoxKeyOfferingWeights,
  SubscriptionConsensusBoxPrefixOfferingHistory,
  SubscriptionConsensusBoxPrefixOfferings,
  SubscriptionConsensusBoxPrefixSnapshots,
  SubscriptionConsensusGlobalStateKeyMaximumWeight,
  SubscriptionConsensusGlobalStateKeyMinimumApprovals,
  SubscriptionConsensusGlobalStateKeyOfferingCount,
  SubscriptionConsensusGlobalStateKeyOfferingEpoch,
  SubscriptionConsensusGlobalStateKeySubscriptions,
  SubscriptionOfferingHistoryMBR,
  SubscriptionOfferingMBR,
  SubscriptionSnapshotMBR,
  SubscriptionWeightsBoxMBR,
  SubscriptionWeightSlotMBR,
} from '../../core/constants'
import {
  errGuildInvalidConsensusAction,
  errGuildInvalidPayment,
  errGuildInvalidProposal,
  errGuildInvalidSettings,
  errGuildInvalidSubscription,
  errGuildInvalidWeight,
  errGuildLockout,
  errGuildOfferingMissing,
} from '../../core/errors'
import type {
  ConsensusActionSetMinimumApprovals,
  GuildProposalSettings,
  GuildConsensusRequirements,
  GuildConsensusResult,
  GuildVoteType,
  SubscriptionActionRemoveOffering,
  SubscriptionActionSetOfferingWeight,
  SubscriptionConsensusConfig,
  SubscriptionConsensusConfiguration,
  SubscriptionOffering,
} from '../../core/types'
import {
  SubscriptionActionAddOfferings as ActionAddOfferings,
  SubscriptionActionRemoveOffering as ActionRemoveOffering,
  SubscriptionActionSetMinimumApprovals as ActionSetMinimumApprovals,
  SubscriptionActionSetOfferingWeight as ActionSetOfferingWeight,
} from './constants'

// CONTRACT IMPORTS
import type { Subscriptions } from '../../../../subscriptions/contract.algo'
import type { GuildConsensusFactoryCreateInterface, GuildConsensusGuildInterface } from '../../interfaces'
import { GuildConsensusBase } from '../base'

type SubscriptionOfferingState = { weight: uint64; since: uint64 }
type SubscriptionOfferingHistoryKey = { serviceID: uint64; since: uint64 }
type SubscriptionOfferingCheckpoint = { weight: uint64; until: uint64 }
/** What a ballot freezes when it opens: the offering epoch, and the time that seasoning is measured against. */
type SubscriptionBallotSnapshot = { epoch: uint64; openedAt: uint64 }

/**
 * One subscription vote weighted by the offering it pays for.
 *
 * Every offering is a subscription service this application creates and owns, so no outside
 * service owner can pause, gate, or block the Guild's electorate. Services are ALGO-priced, ungated,
 * and pay out to the Guild application. Offerings and the absolute approval floor are administered
 * through opaque Guild consensus actions (`uint8 code || payload`, see ./constants.ts), and at least
 * one offering always remains open for subscription.
 *
 * Offering weights are versioned by epoch and every ballot freezes the epoch it opened at, so
 * offering changes never alter the weight of a ballot that is already open.
 *
 * A subscription votes only on ballots that opened after it had been paid, without a gap, for one
 * full payment interval (readiness audit 2026-11-09, C13). Dues are paid into the Guild's own
 * treasury, so without this a proposal that pays out of the treasury could be carried by accounts
 * that subscribed for the occasion and took their dues back out with it. With it, new voting
 * weight is visible to the existing members for a whole interval before it can be used, and it
 * cannot vote on anything they open in that time. Proposing is not seasoned, only voting.
 */
@contract({
  avmVersion: 13,
  stateTotals: { globalBytes: GuildConsensusNumGlobalBytes, globalUints: GuildConsensusNumGlobalUints },
})
export class SubscriptionGuildConsensus extends GuildConsensusBase
  implements GuildConsensusFactoryCreateInterface, GuildConsensusGuildInterface
{
  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** subscriptions application hosting this policy's services */
  subscriptions = GlobalState<Application>({ key: SubscriptionConsensusGlobalStateKeySubscriptions })
  /** minimum absolute approval weight required for a proposal to pass */
  minimumApprovals = GlobalState<uint64>({ key: SubscriptionConsensusGlobalStateKeyMinimumApprovals })
  /** number of services currently granting voting weight */
  offeringCount = GlobalState<uint64>({ initialValue: 0, key: SubscriptionConsensusGlobalStateKeyOfferingCount })
  /** monotonic counter incremented by every offering change */
  offeringEpoch = GlobalState<uint64>({ initialValue: 0, key: SubscriptionConsensusGlobalStateKeyOfferingEpoch })
  /** largest current offering weight; bounds the proposer power a Guild may require */
  maximumWeight = GlobalState<uint64>({ initialValue: 0, key: SubscriptionConsensusGlobalStateKeyMaximumWeight })

  // BOXES ----------------------------------------------------------------------------------------

  /** current voting weight keyed by owned service ID, with the epoch it took effect */
  offerings = BoxMap<uint64, SubscriptionOfferingState>({ keyPrefix: SubscriptionConsensusBoxPrefixOfferings })
  /** closed weight intervals authenticate votes in ballots opened before a change */
  offeringHistory = BoxMap<SubscriptionOfferingHistoryKey, SubscriptionOfferingCheckpoint>({
    keyPrefix: SubscriptionConsensusBoxPrefixOfferingHistory,
  })
  /** offering epoch and opening time frozen when each ballot opened */
  snapshots = BoxMap<uint64, SubscriptionBallotSnapshot>({ keyPrefix: SubscriptionConsensusBoxPrefixSnapshots })
  /** Multiset of live offering weights (8 bytes per slot, 0 = free) that bounds maximum-weight recalculation. */
  offeringWeights = Box<bytes>({ key: SubscriptionConsensusBoxKeyOfferingWeights })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /** Funding the subscriptions app requires for this application's next service. */
  private serviceCost(): uint64 {
    return abiCall<typeof Subscriptions.prototype.newServiceCost>({
      appId: this.subscriptions.value,
      // hint 0: the consensus application acts as itself (no ARC-58 wallet, no referrer)
      args: [0, 0],
    }).returnValue
  }

  /** Quotes a fresh weight slot per offering so another proposal cannot raise it; reused slots are refunded. */
  private offeringsMbr(count: uint64): uint64 {
    return (this.serviceCost() + SubscriptionOfferingMBR + SubscriptionWeightSlotMBR) * count +
      (this.offeringWeights.exists ? 0 : SubscriptionWeightsBoxMBR)
  }

  /** First slot holding `weight`, or the slot count when none does. */
  private weightSlot(weight: uint64): uint64 {
    const slots: uint64 = this.offeringWeights.length / 8
    for (let slot: uint64 = 0; slot < slots; slot += 1) {
      ensureBudget(300, OpUpFeeSource.GroupCredit)
      if (op.btoi(this.offeringWeights.extract(slot * 8, 8)) === weight) {
        return slot
      }
    }
    return slots
  }

  private insertWeight(weight: uint64): void {
    if (!this.offeringWeights.exists) {
      this.offeringWeights.create({ size: 8 })
    }
    const slot = this.weightSlot(0)
    if (slot === this.offeringWeights.length / 8) {
      this.offeringWeights.resize(this.offeringWeights.length + 8)
    }
    this.offeringWeights.replace(slot * 8, op.itob(weight))
    if (weight > this.maximumWeight.value) {
      this.maximumWeight.value = weight
    }
  }

  /** Swap one live weight for another (0 frees the slot) and recompute the maximum. */
  private replaceWeight(previous: uint64, next: uint64): void {
    const slot = this.weightSlot(previous)
    loggedAssert(slot < this.offeringWeights.length / 8, errGuildOfferingMissing)
    this.offeringWeights.replace(slot * 8, op.itob(next))
    let maximum: uint64 = 0
    const size = this.offeringWeights.length
    for (let offset: uint64 = 0; offset < size; offset += 8) {
      ensureBudget(300, OpUpFeeSource.GroupCredit)
      const weight = op.btoi(this.offeringWeights.extract(offset, 8))
      if (weight > maximum) {
        maximum = weight
      }
    }
    this.maximumWeight.value = maximum
  }

  /** Create and activate one service owned by this application; revenue pays out to the Guild. */
  private createService(offering: SubscriptionOffering): uint64 {
    const subscriptions = this.subscriptions.value
    const cost = this.serviceCost()
    const none: uint64 = 0
    const [, created, _activated] = itxn.submitGroup(
      itxn.payment({ receiver: subscriptions.address, amount: cost, fee: 0 }),
      itxn.applicationCall({
        appId: subscriptions,
        appArgs: [
          methodSelector<typeof Subscriptions.prototype.newService>(),
          encodeArc4(offering.interval),
          encodeArc4(none), // ALGO: the Guild application receives the payouts
          encodeArc4(offering.amount),
          encodeArc4(none), // no shared passes: one subscription is one voter
          encodeArc4(none), // no gate: anyone may subscribe, so an offering can never become unreachable
          encodeArc4(this.guild.value.address),
          encodeArc4(offering.title),
          encodeArc4(offering.bannerImage),
          encodeArc4(offering.highlightMessage),
          encodeArc4(offering.highlightColor),
          encodeArc4(none), // principal hint: the application acts as itself (no wallet, no referrer)
        ],
        fee: 0,
      }),
      itxn.applicationCall({
        appId: subscriptions,
        appArgs: [methodSelector<typeof Subscriptions.prototype.activateService>()],
        fee: 0,
      }),
    )
    return decodeArc4<uint64>(created.lastLog, 'log')
  }

  /** Pay back whatever part of an MBR payment was not spent on services or storage. */
  private refundUnused(mbrPayment: gtxn.PaymentTxn, balanceBefore: uint64, minBalanceBefore: uint64): void {
    const paidOut: uint64 = balanceBefore - Global.currentApplicationAddress.balance
    const stored: uint64 = Global.currentApplicationAddress.minBalance - minBalanceBefore
    const refund: uint64 = mbrPayment.amount - paidOut - stored
    if (refund > 0) {
      itxn.payment({ receiver: this.guild.value.address, amount: refund, fee: 0 }).submit()
    }
  }

  /** Current weight of a service, or zero when it grants none. */
  private currentWeight(serviceID: uint64): uint64 {
    return this.offerings(serviceID).exists ? this.offerings(serviceID).value.weight : 0
  }

  /** Weight a service carried at `epoch`; `since` names the closed interval when the weight has changed. */
  private weightAt(serviceID: uint64, epoch: uint64, since: uint64): uint64 {
    if (this.offerings(serviceID).exists && this.offerings(serviceID).value.since <= epoch) {
      return this.offerings(serviceID).value.weight
    }
    const key: SubscriptionOfferingHistoryKey = { serviceID, since }
    if (since <= epoch && this.offeringHistory(key).exists) {
      const checkpoint = clone(this.offeringHistory(key).value)
      if (epoch < checkpoint.until) {
        return checkpoint.weight
      }
    }
    return 0
  }

  /**
   * Whether a subscription had been paid without a gap for one full interval when a ballot opened.
   *
   * Payment windows are `interval` long and counted from `startDate`. `streak` is the number of
   * consecutive windows paid, ending with the window of `lastPayment`, so the unbroken run began in
   * window `last + 1 - streak`. A run that began with the subscription began at `startDate` exactly.
   * A run that began later (after a missed window) began somewhere inside its first window, so it is
   * counted from the end of that window. The run must be one interval old at `openedAt`.
   */
  private seasoned(startDate: uint64, lastPayment: uint64, streak: uint64, interval: uint64, openedAt: uint64): boolean {
    if (interval === 0 || streak === 0 || lastPayment < startDate) {
      return false
    }
    const lastWindow: uint64 = (lastPayment - startDate) / interval
    // The subscriptions app grows a streak by at most one per window, so it never exceeds lastWindow + 1.
    const firstWindow: uint64 = streak > lastWindow ? 0 : lastWindow + 1 - streak
    const runStart: uint64 = firstWindow === 0 ? startDate : startDate + (firstWindow + 1) * interval
    return runStart + interval <= openedAt
  }

  /**
   * The owned service an account's subscription pays for, provided it is paid up at this moment. Power is
   * independent of ballot duration, so no proposal setting can outlast every offering's payment interval.
   * A non-zero `openedAt` also requires the subscription to be seasoned for a ballot opened then.
   * Returns zero when the subscription grants nothing; real service IDs start at one.
   */
  private paidService(account: Account, subscriptionID: uint64, openedAt: uint64): uint64 {
    const sub = abiCall<typeof Subscriptions.prototype.getSubscription>({
      appId: this.subscriptions.value,
      args: [{ address: account, id: subscriptionID }],
    }).returnValue
    if (
      !sub.exists ||
      sub.recipient !== Global.currentApplicationAddress ||
      sub.lastPayment === 0 ||
      sub.lastPayment + sub.interval < Global.latestTimestamp
    ) {
      return 0
    }
    if (openedAt !== 0 && !this.seasoned(sub.startDate, sub.lastPayment, sub.streak, sub.interval, openedAt)) {
      return 0
    }
    return sub.serviceID
  }

  /** Evidence is `uint64 subscriptionID`, optionally followed by `uint64 since` for a changed offering. */
  private evidenceSubscription(evidence: bytes): uint64 {
    loggedAssert(evidence.length === 8 || evidence.length === 16, errGuildInvalidSubscription)
    return op.extractUint64(evidence, 0)
  }

  private evidenceSince(evidence: bytes): uint64 {
    return evidence.length === 16 ? op.extractUint64(evidence, 8) : 0
  }

  private requirementsForProposal(requirements: GuildConsensusRequirements): GuildConsensusRequirements {
    const result = clone(requirements)
    loggedAssert(result.participation === 0, errGuildInvalidSettings)
    if (this.minimumApprovals.value > result.minimumApprovals) {
      result.minimumApprovals = this.minimumApprovals.value
    }
    return result
  }

  private validateConfiguration(): void {
    loggedAssert(this.offeringCount.value > 0 && this.minimumApprovals.value > 0, errGuildInvalidSubscription)
    this.validateGuildSettings()
  }

  private validateGuildSettings(): void {
    const settings = this.guildSettings()
    for (let i: uint64 = 0; i < settings.length; i += 1) {
      this.validateSettings(settings[i])
    }
  }

  private validateOfferings(offerings: SubscriptionOffering[]): void {
    loggedAssert(
      offerings.length > 0 && this.offeringCount.value + offerings.length <= MAX_SUBSCRIPTION_OFFERINGS,
      errGuildInvalidSubscription,
    )
    for (let i: uint64 = 0; i < offerings.length; i += 1) {
      loggedAssert(offerings[i].weight > 0, errGuildInvalidWeight)
    }
  }

  /** Validate an opaque consensus action against current state and quote the funding it needs. */
  private validateConsensusAction(data: bytes): uint64 {
    const code = this.consensusActionCode(data)
    const payload = this.consensusActionPayload(data)
    if (code === ActionAddOfferings) {
      const offerings = decodeArc4<SubscriptionConsensusConfiguration>(payload)
      this.validateOfferings(offerings)
      return this.offeringsMbr(offerings.length)
    }
    if (code === ActionSetOfferingWeight) {
      const action = decodeArc4<SubscriptionActionSetOfferingWeight>(payload)
      loggedAssert(this.offerings(action.serviceID).exists, errGuildOfferingMissing)
      loggedAssert(action.weight > 0, errGuildInvalidWeight)
      return SubscriptionOfferingHistoryMBR
    }
    if (code === ActionRemoveOffering) {
      const serviceID = decodeArc4<SubscriptionActionRemoveOffering>(payload).serviceID
      loggedAssert(this.offerings(serviceID).exists, errGuildOfferingMissing)
      // The last offering is the only way in; removing it would leave no one able to vote.
      loggedAssert(this.offeringCount.value > 1, errGuildLockout)
      // The vacated offering box funds most of its history checkpoint.
      return SubscriptionOfferingHistoryMBR - SubscriptionOfferingMBR
    }
    if (code === ActionSetMinimumApprovals) {
      loggedAssert(decodeArc4<ConsensusActionSetMinimumApprovals>(payload).minimumApprovals > 0, errGuildInvalidSubscription)
      return 0
    }
    loggedErr(errGuildInvalidConsensusAction)
  }

  private addOfferings(offerings: SubscriptionOffering[]): void {
    for (let i: uint64 = 0; i < offerings.length; i += 1) {
      const offering = clone(offerings[i])
      const serviceID = this.createService(offering)
      this.offeringEpoch.value += 1
      this.offerings(serviceID).value = { weight: offering.weight, since: this.offeringEpoch.value }
      this.insertWeight(offering.weight)
      this.offeringCount.value += 1
    }
  }

  /** Close the current weight interval of an offering so open ballots keep authenticating it. */
  private checkpointOffering(serviceID: uint64): void {
    const offering = clone(this.offerings(serviceID).value)
    this.offeringEpoch.value += 1
    this.offeringHistory({ serviceID, since: offering.since }).value = {
      weight: offering.weight,
      until: this.offeringEpoch.value,
    }
  }

  private setOfferingWeight(serviceID: uint64, weight: uint64): void {
    this.replaceWeight(this.offerings(serviceID).value.weight, weight)
    this.checkpointOffering(serviceID)
    this.offerings(serviceID).value = { weight, since: this.offeringEpoch.value }
    if (this.activated.value) this.validateGuildSettings()
  }

  private removeOffering(serviceID: uint64): void {
    const offering = clone(this.offerings(serviceID).value)
    this.replaceWeight(offering.weight, 0)
    // Free the offering box before writing its larger checkpoint.
    this.offerings(serviceID).delete()
    this.offeringEpoch.value += 1
    this.offeringHistory({ serviceID, since: offering.since }).value = {
      weight: offering.weight,
      until: this.offeringEpoch.value,
    }
    this.offeringCount.value -= 1
    // Stop charging subscribers for a service that no longer confers voting weight.
    abiCall<typeof Subscriptions.prototype.shutdownService>({
      appId: this.subscriptions.value,
      args: [serviceID],
    })
    if (this.activated.value) this.validateGuildSettings()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  validateSettings(settings: GuildProposalSettings): void {
    super.validateSettings(settings)
    loggedAssert(settings.participation === 0, errGuildInvalidSettings)
    // Some offering must carry enough weight for a subscriber to propose; checked again at activation.
    if (this.offeringCount.value > 0) {
      loggedAssert(settings.power <= this.maximumWeight.value, errGuildInvalidSettings)
    }
  }

  @abimethod({ readonly: true })
  ballotMbr(): uint64 {
    return super.ballotMbr() + SubscriptionSnapshotMBR
  }

  /**
   * Voting weight a subscription grants on an open ballot; `evidence` matches `vote`.
   * Zero when the subscription is not paid up now, or was not yet seasoned when the ballot opened.
   */
  @abimethod({ readonly: true })
  subscriberPowerAt(account: Account, proposalID: uint64, evidence: bytes): uint64 {
    loggedAssert(this.ballots(proposalID).exists && this.snapshots(proposalID).exists, errGuildInvalidProposal)
    const { epoch, openedAt } = this.snapshots(proposalID).value
    const serviceID = this.paidService(account, this.evidenceSubscription(evidence), openedAt)
    return serviceID === 0 ? 0 : this.weightAt(serviceID, epoch, this.evidenceSince(evidence))
  }

  cleanupBallot(proposalID: uint64, voters: Account[]): uint64 {
    const remaining = super.cleanupBallot(proposalID, voters)
    if (remaining === 0) {
      this.snapshots(proposalID).delete()
      itxn.payment({ receiver: this.guild.value.address, amount: SubscriptionSnapshotMBR, fee: 0 }).submit()
    }
    return remaining
  }

  // CONSENSUS METHODS ----------------------------------------------------------------------------

  validateActivation(): void {
    this.requireGuild()
    this.validateConfiguration()
    this.activated.value = true
  }

  openProposal(
    mbrPayment: gtxn.PaymentTxn,
    proposalID: uint64,
    votingEnd: uint64,
    requirements: GuildConsensusRequirements,
  ): void {
    const proposalRequirements = this.requirementsForProposal(requirements)
    this.openBallot(mbrPayment, proposalID, votingEnd, proposalRequirements, 0, this.ballotMbr())
    // A block timestamp is never zero, so `openedAt` always switches seasoning on for the ballot.
    this.snapshots(proposalID).value = { epoch: this.offeringEpoch.value, openedAt: Global.latestTimestamp }
    this.activeBallots.value += 1
  }

  resolveProposal(proposalID: uint64): GuildConsensusResult {
    const result = this.resolveBallot(proposalID)
    this.activeBallots.value -= 1
    return result
  }

  vote(mbrPayment: gtxn.PaymentTxn, voter: Account, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void {
    this.requireGuild()
    this.voteWithPower(mbrPayment, voter, proposalID, vote, this.subscriberPowerAt(voter, proposalID, evidence))
  }

  /** Proposers need a subscription paid up now, weighted by the current offering. Proposing is not seasoned. */
  /* eslint-disable @typescript-eslint/no-unused-vars -- power does not depend on the ballot deadline */
  @abimethod({ readonly: true })
  proposalPower(account: Account, evidence: bytes, requiredThrough: uint64): uint64 {
    const serviceID = this.paidService(account, this.evidenceSubscription(evidence), 0)
    return serviceID === 0 ? 0 : this.currentWeight(serviceID)
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(governanceConfig: bytes): void {
    const config = decodeArc4<SubscriptionConsensusConfig>(governanceConfig)
    loggedAssert(config.subscriptions > 0 && config.minimumApprovals > 0, errGuildInvalidSubscription)
    this.initializeConsensus()
    this.subscriptions.value = Application(config.subscriptions)
    this.minimumApprovals.value = config.minimumApprovals
  }

  // DRAFT CONFIGURATION --------------------------------------------------------------------------

  /** Service creation funding plus offering storage for each new service; unused funding is refunded. */
  @abimethod({ readonly: true })
  configurationMbr(config: bytes): uint64 {
    return this.offeringsMbr(decodeArc4<SubscriptionConsensusConfiguration>(config).length)
  }

  /** Create the initial owned services through the paired Guild while it is in draft. */
  configure(mbrPayment: gtxn.PaymentTxn, config: bytes): void {
    this.requireGuild()
    loggedAssert(!this.activated.value, errGuildInvalidSubscription)
    const offerings = decodeArc4<SubscriptionConsensusConfiguration>(config)
    this.validateOfferings(offerings)
    loggedAssert(
      match(mbrPayment, {
        sender: this.guild.value.address,
        receiver: Global.currentApplicationAddress,
        amount: this.offeringsMbr(offerings.length),
      }),
      errGuildInvalidPayment,
    )
    const balanceBefore = Global.currentApplicationAddress.balance
    const minBalanceBefore = Global.currentApplicationAddress.minBalance
    this.addOfferings(offerings)
    this.refundUnused(mbrPayment, balanceBefore, minBalanceBefore)
  }

  // GOVERNED ADMINISTRATION ----------------------------------------------------------------------

  /** Quote and validate an opaque consensus action; unsupported codes are rejected. */
  @abimethod({ readonly: true })
  consensusActionMbr(data: bytes): uint64 {
    return this.validateConsensusAction(data)
  }

  /**
   * Apply an approved Guild consensus action; direct accounts cannot call this route.
   *
   * A new approval floor may not exceed the approvals of the proposal that sets it, so the Guild
   * can never raise its floor beyond what its own voters just demonstrated.
   */
  applyConsensusAction(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, data: bytes): void {
    this.requireGuild()
    const amount = this.validateConsensusAction(data)
    loggedAssert(
      match(mbrPayment, {
        sender: this.guild.value.address,
        receiver: Global.currentApplicationAddress,
        amount,
      }),
      errGuildInvalidPayment,
    )
    const code = this.consensusActionCode(data)
    const payload = this.consensusActionPayload(data)
    if (code === ActionSetMinimumApprovals) {
      // Requirements are frozen per ballot, so the floor may change while ballots are open.
      const minimumApprovals = decodeArc4<ConsensusActionSetMinimumApprovals>(payload).minimumApprovals
      loggedAssert(minimumApprovals <= this.demonstratedApprovals(proposalID), errGuildLockout)
      this.minimumApprovals.value = minimumApprovals
      return
    }
    // Offering changes are versioned, so they may happen while ballots are open.
    if (code === ActionAddOfferings) {
      const balanceBefore = Global.currentApplicationAddress.balance
      const minBalanceBefore = Global.currentApplicationAddress.minBalance
      this.addOfferings(decodeArc4<SubscriptionConsensusConfiguration>(payload))
      this.refundUnused(mbrPayment, balanceBefore, minBalanceBefore)
    } else if (code === ActionSetOfferingWeight) {
      const action = decodeArc4<SubscriptionActionSetOfferingWeight>(payload)
      this.setOfferingWeight(action.serviceID, action.weight)
    } else if (code === ActionRemoveOffering) {
      this.removeOffering(decodeArc4<SubscriptionActionRemoveOffering>(payload).serviceID)
    } else {
      loggedErr(errGuildInvalidConsensusAction)
    }
  }
}
