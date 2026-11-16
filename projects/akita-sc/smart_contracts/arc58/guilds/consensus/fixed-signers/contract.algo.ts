import {
  Account,
  Application,
  BoxMap,
  Box,
  ensureBudget,
  OpUpFeeSource,
  op,
  bytes,
  Bytes,
  clone,
  contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  itxnCompose,
  loggedAssert,
  loggedErr,
  match,
  TransactionType,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { CallerTypeOther } from '../../../account/types'
import type { FundsRequest } from '../../../account/types'
import {
  MAX_FIXED_SIGNER_MEMBERS,
  FixedSignerMemberMBR,
  FixedSignerHistoryMBR,
  FixedSignerSnapshotMBR,
  FixedSignerWeightSlotMBR,
  FixedSignerWeightsBoxMBR,
  FixedSignerConsensusGlobalStateKeyEligiblePower,
  FixedSignerConsensusGlobalStateKeyMaximumMemberWeight,
  FixedSignerConsensusGlobalStateKeyMemberCount,
  FixedSignerConsensusGlobalStateKeyMembershipEpoch,
  FixedSignerConsensusGlobalStateKeyMembershipLocked,
  FixedSignerConsensusGlobalStateKeyThreshold,
  FixedSignerConsensusGlobalStateKeyWeightMode,
  FixedSignerWeightModeAssigned,
  FixedSignerWeightModeEqual,
  GuildConsensusBoxKeyMemberWeights,
  GuildConsensusBoxPrefixMemberHistory,
  GuildConsensusBoxPrefixMembers,
  GuildConsensusBoxPrefixMemberSnapshots,
  GuildConsensusNumGlobalBytes,
  GuildConsensusNumGlobalUints,
  GuildGlobalStateKeyWallet,
} from '../../core/constants'
import {
  errGuildInvalidAction,
  errGuildInvalidConsensusAction,
  errGuildInvalidMember,
  errGuildInvalidPayment,
  errGuildInvalidSettings,
  errGuildInvalidThreshold,
  errGuildInvalidType,
  errGuildInvalidWeight,
  errGuildMemberExists,
  errGuildMemberMissing,
  errGuildMembershipLocked,
  errGuildNoGovernancePower,
  errGuildNotActive,
  errGuildTooManyMembers,
  errGuildWalletRequired,
} from '../../core/errors'
import type {
  FixedSignerActionAddMembers,
  FixedSignerActionRemoveMember,
  FixedSignerActionSetMemberWeight,
  FixedSignerActionSetThreshold,
  FixedSignerActionSetWeightMode,
  FixedSignerConsensusConfig,
  FixedSignerConsensusConfiguration,
  FixedSignerMember,
  FixedSignerWeightMode,
  GuildConsensusRequirements,
  GuildConsensusResult,
  GuildProposalSettings,
  GuildVoteType,
} from '../../core/types'
import {
  FixedSignerActionAddMembers as ActionAddMembers,
  FixedSignerActionLockMembership as ActionLockMembership,
  FixedSignerActionRemoveMember as ActionRemoveMember,
  FixedSignerActionSetMemberWeight as ActionSetMemberWeight,
  FixedSignerActionSetThreshold as ActionSetThreshold,
  FixedSignerActionSetWeightMode as ActionSetWeightMode,
} from './constants'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../../account/contract.algo'
import type { GuildConsensusFactoryCreateInterface, GuildConsensusGuildInterface } from '../../interfaces'
import { GuildConsensusBase } from '../base'

/**
 * Allowlisted signer consensus with equal or explicitly assigned member weights.
 *
 * All membership, threshold, and weight-mode administration happens through opaque Guild
 * consensus actions (`uint8 code || payload`, see ./constants.ts). The Guild kernel never
 * learns what those codes mean; it only routes them here and selects proposal settings.
 */
@contract({
  avmVersion: 13,
  stateTotals: { globalBytes: GuildConsensusNumGlobalBytes, globalUints: GuildConsensusNumGlobalUints },
})
export class FixedSignerGuildConsensus extends GuildConsensusBase
  implements GuildConsensusFactoryCreateInterface, GuildConsensusGuildInterface
{
  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** approval power required for a proposal to pass */
  threshold = GlobalState<uint64>({ key: FixedSignerConsensusGlobalStateKeyThreshold })
  /** number of configured signers */
  memberCount = GlobalState<uint64>({ initialValue: 0, key: FixedSignerConsensusGlobalStateKeyMemberCount })
  /** sum of all assigned signer weights */
  eligiblePower = GlobalState<uint64>({ initialValue: 0, key: FixedSignerConsensusGlobalStateKeyEligiblePower })
  /** whether membership changes have been permanently disabled */
  membershipLocked = GlobalState<boolean>({
    initialValue: false,
    key: FixedSignerConsensusGlobalStateKeyMembershipLocked,
  })
  /** equal or explicitly assigned signer weighting */
  weightMode = GlobalState<FixedSignerWeightMode>({ key: FixedSignerConsensusGlobalStateKeyWeightMode })
  /** monotonic counter incremented by every membership change */
  membershipEpoch = GlobalState<uint64>({ initialValue: 0, key: FixedSignerConsensusGlobalStateKeyMembershipEpoch })
  /** largest assigned weight; bounds the proposer power a Guild may require */
  maximumMemberWeight = GlobalState<uint64>({ initialValue: 0, key: FixedSignerConsensusGlobalStateKeyMaximumMemberWeight })

  // BOXES ----------------------------------------------------------------------------------------

  /** signer weights keyed by account */
  members = BoxMap<Account, { weight: uint64; since: uint64; slot: uint64 }>({ keyPrefix: GuildConsensusBoxPrefixMembers })
  /** Closed membership intervals authenticate votes in ballots opened before a change. */
  memberHistory = BoxMap<{ account: Account; since: uint64 }, { weight: uint64; until: uint64 }>({
    keyPrefix: GuildConsensusBoxPrefixMemberHistory,
  })
  memberSnapshots = BoxMap<uint64, { epoch: uint64; mode: FixedSignerWeightMode }>({
    keyPrefix: GuildConsensusBoxPrefixMemberSnapshots,
  })
  /** Compact reusable weight slots bound maximum-power recalculation to at most 2 KiB. */
  memberWeights = Box<bytes>({ key: GuildConsensusBoxKeyMemberWeights })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private requireMembershipMutable(): void {
    loggedAssert(!this.membershipLocked.value, errGuildMembershipLocked)
  }

  private powerForMode(mode: FixedSignerWeightMode): uint64 {
    if (mode === FixedSignerWeightModeEqual) {
      return this.memberCount.value
    }
    if (mode === FixedSignerWeightModeAssigned) {
      return this.eligiblePower.value
    }
    return 0
  }

  private createMember(account: Account, weight: uint64): void {
    loggedAssert(account !== Global.zeroAddress, errGuildInvalidMember)
    loggedAssert(weight > 0, errGuildInvalidWeight)
    loggedAssert(!this.members(account).exists, errGuildMemberExists)
    let slot: uint64 = 0
    if (!this.memberWeights.exists) {
      this.memberWeights.create({ size: 8 })
    } else {
      const size = this.memberWeights.length
      const slots: uint64 = size / 8
      slot = slots
      // Appending to a full slot array needs no scan, including during batch configuration.
      if (this.memberCount.value < slots) {
        slot = 0
        while (slot < slots && op.btoi(this.memberWeights.extract(slot * 8, 8)) !== 0) {
          ensureBudget(300, OpUpFeeSource.GroupCredit)
          slot += 1
        }
      }
      if (slot === slots) {
        this.memberWeights.resize(size + 8)
      }
    }
    this.memberWeights.replace(slot * 8, op.itob(weight))
    this.membershipEpoch.value += 1
    this.members(account).value = { weight, since: this.membershipEpoch.value, slot }
    if (weight > this.maximumMemberWeight.value) {
      this.maximumMemberWeight.value = weight
    }
    this.memberCount.value += 1
    this.eligiblePower.value += weight
  }

  private validateMemberBatch(mode: FixedSignerWeightMode, members: FixedSignerMember[]): void {
    loggedAssert(
      mode === FixedSignerWeightModeEqual || mode === FixedSignerWeightModeAssigned,
      errGuildInvalidWeight,
    )
    loggedAssert(members.length > 0, errGuildInvalidMember)
    loggedAssert(this.memberCount.value + members.length <= MAX_FIXED_SIGNER_MEMBERS, errGuildTooManyMembers)
    if (this.memberCount.value > 0) {
      loggedAssert(this.weightMode.value === mode, errGuildInvalidType)
    }
    for (let i: uint64 = 0; i < members.length; i += 1) {
      const member = clone(members[i])
      loggedAssert(member.account !== Global.zeroAddress, errGuildInvalidMember)
      loggedAssert(member.weight > 0, errGuildInvalidWeight)
      if (mode === FixedSignerWeightModeEqual) {
        loggedAssert(member.weight === 1, errGuildInvalidWeight)
      }
      loggedAssert(!this.members(member.account).exists, errGuildMemberExists)
      for (let j: uint64 = 0; j < i; j += 1) {
        loggedAssert(member.account !== members[j].account, errGuildMemberExists)
      }
    }
  }

  private validateMemberRemoval(member: Account): void {
    loggedAssert(this.members(member).exists, errGuildMemberMissing)
    const remainingCount: uint64 = this.memberCount.value - 1
    const remainingAssignedPower: uint64 = this.eligiblePower.value - this.members(member).value.weight
    loggedAssert(remainingCount > 0, errGuildInvalidThreshold)
    if (this.weightMode.value === FixedSignerWeightModeEqual) {
      loggedAssert(remainingCount >= this.threshold.value, errGuildInvalidThreshold)
    } else if (this.weightMode.value === FixedSignerWeightModeAssigned) {
      loggedAssert(remainingAssignedPower >= this.threshold.value, errGuildInvalidThreshold)
    }
  }

  private validateMemberWeight(member: Account, weight: uint64): void {
    loggedAssert(this.weightMode.value === FixedSignerWeightModeAssigned && weight > 0, errGuildInvalidWeight)
    loggedAssert(this.members(member).exists, errGuildMemberMissing)
    const eligiblePower: uint64 = this.eligiblePower.value - this.members(member).value.weight + weight
    loggedAssert(eligiblePower >= this.threshold.value, errGuildInvalidThreshold)
  }

  private validateThreshold(threshold: uint64): void {
    loggedAssert(
      threshold > 0 && (this.memberCount.value === 0 || threshold <= this.totalMemberPower()),
      errGuildInvalidThreshold,
    )
  }

  private validateWeightMode(mode: FixedSignerWeightMode): void {
    loggedAssert(
      mode === FixedSignerWeightModeEqual || mode === FixedSignerWeightModeAssigned,
      errGuildInvalidWeight,
    )
    loggedAssert(
      this.memberCount.value === 0 || this.threshold.value <= this.powerForMode(mode),
      errGuildInvalidThreshold,
    )
  }

  private memberPower(account: Account): uint64 {
    if (!this.members(account).exists) {
      return 0
    }
    if (this.weightMode.value === FixedSignerWeightModeEqual) {
      return 1
    }
    if (this.weightMode.value === FixedSignerWeightModeAssigned) {
      return this.members(account).value.weight
    }
    return 0
  }

  private totalMemberPower(): uint64 {
    if (this.weightMode.value === FixedSignerWeightModeEqual) {
      return this.memberCount.value
    }
    if (this.weightMode.value === FixedSignerWeightModeAssigned) {
      return this.eligiblePower.value
    }
    return 0
  }

  private requirementsForProposal(requirements: GuildConsensusRequirements): GuildConsensusRequirements {
    const result = clone(requirements)
    if (this.threshold.value > result.minimumApprovals) {
      result.minimumApprovals = this.threshold.value
    }
    return result
  }

  private validateConfiguration(): void {
    const eligiblePower = this.totalMemberPower()
    loggedAssert(
      this.memberCount.value > 0 && this.threshold.value > 0 && this.threshold.value <= eligiblePower,
      errGuildInvalidThreshold,
    )
  }

  private checkpointMember(account: Account): void {
    const member = clone(this.members(account).value)
    this.membershipEpoch.value += 1
    this.memberHistory({ account, since: member.since }).value = { weight: member.weight, until: this.membershipEpoch.value }
  }

  private recalculateMaximumWeight(): void {
    let maximum: uint64 = 0
    const size = this.memberWeights.length
    for (let offset: uint64 = 0; offset < size; offset += 8) {
      ensureBudget(300, OpUpFeeSource.GroupCredit)
      const weight = op.btoi(this.memberWeights.extract(offset, 8))
      if (weight > maximum) maximum = weight
    }
    this.maximumMemberWeight.value = maximum
  }

  private validateGuildSettings(): void {
    const settings = this.guildSettings()
    for (let i: uint64 = 0; i < settings.length; i += 1) {
      this.validateSettings(settings[i])
    }
  }

  private snapshotPower(account: Account, proposalID: uint64, evidence: bytes): uint64 {
    loggedAssert(this.memberSnapshots(proposalID).exists, errGuildInvalidMember)
    const snapshot = clone(this.memberSnapshots(proposalID).value)
    let weight: uint64 = 0
    if (this.members(account).exists && this.members(account).value.since <= snapshot.epoch) {
      weight = this.members(account).value.weight
    } else if (evidence.length === 8) {
      const since = op.btoi(evidence)
      const key = { account, since }
      if (since <= snapshot.epoch && this.memberHistory(key).exists) {
        const checkpoint = clone(this.memberHistory(key).value)
        if (snapshot.epoch < checkpoint.until) weight = checkpoint.weight
      }
    }
    return weight === 0 ? 0 : (snapshot.mode === FixedSignerWeightModeEqual ? 1 : weight)
  }

  /** Validate an opaque consensus action against current state and quote the storage it needs. */
  private validateConsensusAction(data: bytes): uint64 {
    const code = this.consensusActionCode(data)
    const payload = this.consensusActionPayload(data)
    if (code === ActionLockMembership) {
      this.validateConfiguration()
      return 0
    }
    loggedAssert(code >= ActionAddMembers && code <= ActionSetWeightMode, errGuildInvalidConsensusAction)
    this.requireMembershipMutable()
    if (code === ActionAddMembers) {
      const action = decodeArc4<FixedSignerActionAddMembers>(payload)
      this.validateMemberBatch(action.mode, action.members)
      return this.memberAdditionMbr(action.members.length)
    }
    if (code === ActionRemoveMember) {
      const member = decodeArc4<FixedSignerActionRemoveMember>(payload).member
      loggedAssert(member !== Global.zeroAddress, errGuildInvalidMember)
      this.validateMemberRemoval(member)
      // The vacated member box funds the history checkpoint exactly, so removal needs no new storage.
      return 0
    }
    if (code === ActionSetMemberWeight) {
      const action = decodeArc4<FixedSignerActionSetMemberWeight>(payload)
      loggedAssert(action.member !== Global.zeroAddress, errGuildInvalidMember)
      this.validateMemberWeight(action.member, action.weight)
      return this.historyMbr()
    }
    if (code === ActionSetThreshold) {
      this.validateThreshold(decodeArc4<FixedSignerActionSetThreshold>(payload).threshold)
      return 0
    }
    if (code === ActionSetWeightMode) {
      this.validateWeightMode(decodeArc4<FixedSignerActionSetWeightMode>(payload).mode)
      return 0
    }
    loggedErr(errGuildInvalidConsensusAction)
  }

  private configureMembers(mbrPayment: gtxn.PaymentTxn, mode: FixedSignerWeightMode, members: FixedSignerMember[]): void {
    this.validateMemberBatch(mode, members)
    if (this.memberCount.value === 0) {
      this.weightMode.value = mode
    }
    loggedAssert(
      match(mbrPayment, {
        sender: this.guild.value.address,
        receiver: Global.currentApplicationAddress,
        amount: this.memberAdditionMbr(members.length),
      }),
      errGuildInvalidPayment,
    )
    const previousMbr = Global.currentApplicationAddress.minBalance
    for (let i: uint64 = 0; i < members.length; i += 1) {
      const member = clone(members[i])
      this.createMember(member.account, member.weight)
    }
    // Reused weight slots need no new storage; return the unused reserve to the Guild for forwarding.
    const refund: uint64 = mbrPayment.amount - (Global.currentApplicationAddress.minBalance - previousMbr)
    if (refund > 0) {
      itxn.payment({ receiver: this.guild.value.address, amount: refund, fee: 0 }).submit()
    }
  }

  private removeMember(member: Account): void {
    this.validateMemberRemoval(member)
    const remainingCount: uint64 = this.memberCount.value - 1
    const remainingAssignedPower: uint64 = this.eligiblePower.value - this.members(member).value.weight
    const slot = this.members(member).value.slot
    this.checkpointMember(member)
    this.memberWeights.replace(slot * 8, op.itob(0))
    this.eligiblePower.value = remainingAssignedPower
    this.members(member).delete()
    this.memberCount.value = remainingCount
    this.recalculateMaximumWeight()
    if (this.activated.value) this.validateGuildSettings()
  }

  private setMemberWeight(member: Account, weight: uint64): void {
    this.validateMemberWeight(member, weight)
    const eligiblePower: uint64 = this.eligiblePower.value - this.members(member).value.weight + weight
    this.checkpointMember(member)
    this.eligiblePower.value = eligiblePower
    this.members(member).value.weight = weight
    this.members(member).value.since = this.membershipEpoch.value
    this.memberWeights.replace(this.members(member).value.slot * 8, op.itob(weight))
    this.recalculateMaximumWeight()
    if (this.activated.value) this.validateGuildSettings()
  }

  private setThreshold(threshold: uint64): void {
    this.validateThreshold(threshold)
    this.threshold.value = threshold
  }

  private setWeightMode(mode: FixedSignerWeightMode): void {
    this.validateWeightMode(mode)
    this.weightMode.value = mode
    if (this.activated.value) this.validateGuildSettings()
  }

  private lockMembership(): void {
    this.validateConfiguration()
    this.membershipLocked.value = true
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  memberAdditionMbr(count: uint64): uint64 {
    // Reserve a new slot per member so another proposal cannot increase this quote.
    return (FixedSignerMemberMBR + FixedSignerWeightSlotMBR) * count + (this.memberWeights.exists ? 0 : FixedSignerWeightsBoxMBR)
  }

  @abimethod({ readonly: true })
  historyMbr(): uint64 {
    return FixedSignerHistoryMBR
  }

  @abimethod({ readonly: true })
  validateSettings(settings: GuildProposalSettings): void {
    super.validateSettings(settings)
    if (this.memberCount.value > 0) {
      const maximum: uint64 = this.weightMode.value === FixedSignerWeightModeEqual ? 1 : this.maximumMemberWeight.value
      loggedAssert(settings.power <= maximum && settings.minimumApprovals <= this.totalMemberPower(), errGuildInvalidSettings)
    }
  }

  @abimethod({ readonly: true })
  ballotMbr(): uint64 {
    return super.ballotMbr() + FixedSignerSnapshotMBR
  }

  @abimethod({ readonly: true })
  memberPowerAt(account: Account, proposalID: uint64, evidence: bytes): uint64 {
    return this.snapshotPower(account, proposalID, evidence)
  }

  cleanupBallot(proposalID: uint64, voters: Account[]): uint64 {
    const remaining = super.cleanupBallot(proposalID, voters)
    if (remaining === 0) {
      this.memberSnapshots(proposalID).delete()
      itxn.payment({ receiver: this.guild.value.address, amount: FixedSignerSnapshotMBR, fee: 0 }).submit()
    }
    return remaining
  }

  // CONSENSUS METHODS ----------------------------------------------------------------------------

  validateActivation(): void {
    this.requireGuild()
    this.validateConfiguration()
    this.validateGuildSettings()
    this.activated.value = true
  }

  openProposal(
    mbrPayment: gtxn.PaymentTxn,
    proposalID: uint64,
    votingEnd: uint64,
    requirements: GuildConsensusRequirements,
  ): void {
    const proposalRequirements = this.requirementsForProposal(requirements)
    this.openBallot(mbrPayment, proposalID, votingEnd, proposalRequirements, this.totalMemberPower(), this.ballotMbr())
    this.memberSnapshots(proposalID).value = { epoch: this.membershipEpoch.value, mode: this.weightMode.value }
    this.activeBallots.value += 1
  }

  resolveProposal(proposalID: uint64): GuildConsensusResult {
    const result = this.resolveBallot(proposalID)
    this.activeBallots.value -= 1
    return result
  }

  /* eslint-disable @typescript-eslint/no-unused-vars -- fixed signers use no caller evidence or time-bound power */
  vote(mbrPayment: gtxn.PaymentTxn, voter: Account, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void {
    this.voteWithPower(mbrPayment, voter, proposalID, vote, this.snapshotPower(voter, proposalID, evidence))
  }

  @abimethod({ readonly: true })
  proposalPower(account: Account, evidence: bytes, requiredThrough: uint64): uint64 {
    return this.memberPower(account)
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // DIRECT PLUGIN USE ----------------------------------------------------------------------------

  /**
   * Use a plugin the Guild's wallet granted to this consensus app, with no proposal, for a signer whose
   * own power meets the threshold: the one case in which a ballot could only record that signer's
   * approval.
   *
   * The Guild opts a plugin in by granting it to this app's address, by proposal, with whatever limits
   * the grant carries (methods, cooldown, expiry, escrow allowances). The wallet enforces every one of
   * them here exactly as for any other named caller. Only the signer threshold is consulted, against
   * the membership as it stands now; a Guild's percentage settings govern proposals, not this route.
   *
   * One inner group: the wallet opens its plugin window for this app, the listed calls run inside it,
   * and the wallet closes and verifies the window. Each entry of `calls` is the application arguments
   * of one call to `plugin`: the method selector, then the wallet's ID, then the rest of that method's
   * arguments. The calls are sent by this app, so a plugin method that pays its caller pays this app.
   */
  usePlugin(plugin: uint64, escrow: string, methodOffsets: uint64[], fundsRequest: FundsRequest[], calls: bytes[][]): void {
    loggedAssert(this.activated.value, errGuildNotActive)
    loggedAssert(this.memberPower(Txn.sender) >= this.threshold.value, errGuildNoGovernancePower)
    const [walletID, hasWallet] = op.AppGlobal.getExUint64(this.guild.value, Bytes(GuildGlobalStateKeyWallet))
    loggedAssert(hasWallet, errGuildWalletRequired)
    const uses = clone(calls)
    loggedAssert(uses.length > 0, errGuildInvalidAction)

    const wallet = Application(walletID)
    itxnCompose.begin<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>({
      appId: wallet,
      args: [plugin, CallerTypeOther, escrow, methodOffsets, fundsRequest],
      fee: 0,
    })
    for (let i: uint64 = 0; i < uses.length; i += 1) {
      const args = clone(uses[i])
      op.ITxnCreate.next()
      op.ITxnCreate.setTypeEnum(TransactionType.ApplicationCall)
      op.ITxnCreate.setApplicationId(plugin)
      op.ITxnCreate.setFee(0)
      for (let j: uint64 = 0; j < args.length; j += 1) {
        op.ITxnCreate.setApplicationArgs(args[j])
      }
    }
    itxnCompose.next<typeof AbstractedAccount.prototype.arc58_verifyAuthAddress>({ appId: wallet, fee: 0 })
    itxnCompose.submit()
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(governanceConfig: bytes): void {
    const config = decodeArc4<FixedSignerConsensusConfig>(governanceConfig)
    loggedAssert(config.threshold > 0, errGuildInvalidThreshold)
    this.initializeConsensus()
    this.threshold.value = config.threshold
    this.weightMode.value = FixedSignerWeightModeEqual
  }

  // DRAFT CONFIGURATION --------------------------------------------------------------------------

  @abimethod({ readonly: true })
  configurationMbr(config: bytes): uint64 {
    return this.memberAdditionMbr(decodeArc4<FixedSignerConsensusConfiguration>(config).members.length)
  }

  /** Configure the initial member set through the paired Guild while it is in draft. */
  configure(mbrPayment: gtxn.PaymentTxn, config: bytes): void {
    this.requireGuild()
    this.requireMembershipMutable()
    const configuration = decodeArc4<FixedSignerConsensusConfiguration>(config)
    this.configureMembers(mbrPayment, configuration.mode, configuration.members)
  }

  // GOVERNED ADMINISTRATION ----------------------------------------------------------------------

  /** Quote and validate an opaque consensus action; unsupported codes are rejected. */
  @abimethod({ readonly: true })
  consensusActionMbr(data: bytes): uint64 {
    return this.validateConsensusAction(data)
  }

  /**
   * Apply an approved Guild consensus action; direct accounts cannot call this route.
   * The threshold is already bounded by total member power, so the proposal ID is unused.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (code === ActionAddMembers) {
      const action = decodeArc4<FixedSignerActionAddMembers>(payload)
      this.configureMembers(mbrPayment, action.mode, action.members)
    } else if (code === ActionRemoveMember) {
      this.removeMember(decodeArc4<FixedSignerActionRemoveMember>(payload).member)
    } else if (code === ActionSetMemberWeight) {
      const action = decodeArc4<FixedSignerActionSetMemberWeight>(payload)
      this.setMemberWeight(action.member, action.weight)
    } else if (code === ActionSetThreshold) {
      this.setThreshold(decodeArc4<FixedSignerActionSetThreshold>(payload).threshold)
    } else if (code === ActionSetWeightMode) {
      this.setWeightMode(decodeArc4<FixedSignerActionSetWeightMode>(payload).mode)
    } else if (code === ActionLockMembership) {
      this.lockMembership()
    } else {
      loggedErr(errGuildInvalidConsensusAction)
    }
  }
}
