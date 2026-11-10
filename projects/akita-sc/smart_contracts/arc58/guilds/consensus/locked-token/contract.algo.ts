import {
  Account,
  Application,
  Asset,
  bytes,
  clone,
  contract,
  Global,
  GlobalState,
  gtxn,
  loggedAssert,
  loggedErr,
  match,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { MAX_UINT64, ONE_DAY, ONE_WEEK, ONE_YEAR_IN_DAYS } from '../../../../utils/constants'
import { ONE_YEAR } from '../../../../staking/constants'
import { STAKING_TYPE_LOCK } from '../../../../staking/types'
import {
  GuildConsensusNumGlobalBytes,
  GuildConsensusNumGlobalUints,
  LockedTokenConsensusGlobalStateKeyMinimumApprovals,
  LockedTokenConsensusGlobalStateKeyStaking,
  LockedTokenConsensusGlobalStateKeyUnit,
  MAX_LOCKED_TOKEN_DECIMALS,
  TokenConsensusGlobalStateKeyAsset,
} from '../../core/constants'
import {
  errGuildInvalidAsset,
  errGuildInvalidConsensusAction,
  errGuildInvalidPayment,
  errGuildInvalidSettings,
  errGuildInvalidStaking,
  errGuildLockout,
  errGuildUnsafeSnapshot,
} from '../../core/errors'
import type {
  ConsensusActionSetMinimumApprovals,
  GuildProposalSettings,
  GuildConsensusRequirements,
  GuildConsensusResult,
  GuildVoteType,
  LockedTokenConsensusConfig,
} from '../../core/types'
import { LockedTokenActionSetMinimumApprovals as ActionSetMinimumApprovals } from './constants'

// CONTRACT IMPORTS
import type { Staking } from '../../../../staking/contract.algo'
import type { GuildConsensusFactoryCreateInterface, GuildConsensusGuildInterface } from '../../interfaces'
import { GuildConsensusBase } from '../base'

/**
 * Time-weighted governance for universal-staking locks that outlive the ballot.
 *
 * Power is measured in whole-token-years: a lock of one whole token (10^decimals base units) with a
 * year remaining carries one unit of power, whatever the asset's decimals.
 *
 * Aggregate locked supply is mutable and therefore never used as a quorum denominator;
 * instead every ballot carries an absolute approval floor (`minimumApprovals`) so a lone
 * small lock can never pass a proposal in an empty room.
 */
@contract({
  avmVersion: 13,
  stateTotals: { globalBytes: GuildConsensusNumGlobalBytes, globalUints: GuildConsensusNumGlobalUints },
})
export class LockedTokenGuildConsensus extends GuildConsensusBase
  implements GuildConsensusFactoryCreateInterface, GuildConsensusGuildInterface
{
  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** universal staking application used to resolve voting power */
  staking = GlobalState<Application>({ key: LockedTokenConsensusGlobalStateKeyStaking })
  /** asset whose live locked stake grants voting power */
  votingAsset = GlobalState<Asset>({ key: TokenConsensusGlobalStateKeyAsset })
  /** minimum absolute approval power required for any proposal to pass */
  minimumApprovals = GlobalState<uint64>({ key: LockedTokenConsensusGlobalStateKeyMinimumApprovals })
  /** base units in one whole voting token (10^decimals) */
  votingUnit = GlobalState<uint64>({ key: LockedTokenConsensusGlobalStateKeyUnit })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /** Whole-token-years of a lock that outlives `requiredThrough`; locks with under a week left carry none. */
  private lockedPower(account: Account, requiredThrough: uint64): uint64 {
    const info = abiCall<typeof Staking.prototype.getInfo>({
      appId: this.staking.value,
      args: [account, { asset: this.votingAsset.value.id, type: STAKING_TYPE_LOCK }],
    }).returnValue
    if (info.expiration <= requiredThrough) {
      return 0
    }
    const remainingTime: uint64 = info.expiration - Global.latestTimestamp
    if (remainingTime < ONE_WEEK) {
      return 0
    }
    // amount * days / (unit * 365), in 128-bit arithmetic so no asset supply or unit can overflow.
    const [productHigh, productLow] = op.mulw(info.amount, remainingTime / ONE_DAY)
    const [tokensHigh, tokensLow] = op.divmodw(productHigh, productLow, 0, this.votingUnit.value)
    const [powerHigh, powerLow] = op.divmodw(tokensHigh, tokensLow, 0, ONE_YEAR_IN_DAYS)
    return powerHigh > 0 ? MAX_UINT64 : powerLow
  }

  private eligibleLockedPower(): uint64 {
    const totals = abiCall<typeof Staking.prototype.getTotals>({
      appId: this.staking.value,
      args: [[this.votingAsset.value.id]],
    }).returnValue
    return totals[0].liveLockedStake / this.votingUnit.value
  }

  /** Longest lock universal staking currently accepts for the voting asset. */
  private maximumLockup(): uint64 {
    const settings = abiCall<typeof Staking.prototype.getSettings>({
      appId: this.staking.value,
      args: [[this.votingAsset.value.id]],
    }).returnValue
    return settings[0].exists ? settings[0].value : ONE_YEAR
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
    loggedAssert(this.eligibleLockedPower() > 0, errGuildUnsafeSnapshot)
    // Locks with under a week left carry no power, so a shorter maximum lockup can never vote.
    loggedAssert(this.maximumLockup() > ONE_WEEK, errGuildInvalidStaking)
    loggedAssert(this.minimumApprovals.value > 0, errGuildInvalidSettings)
    this.validateGuildSettings()
  }

  private validateGuildSettings(): void {
    const settings = this.guildSettings()
    for (let i: uint64 = 0; i < settings.length; i += 1) {
      this.validateSettings(settings[i])
    }
  }

  private configureLockedToken(staking: Application, asset: Asset, minimumApprovals: uint64): void {
    loggedAssert(staking.id > 0, errGuildInvalidStaking)
    loggedAssert(asset.id > 0 && asset.total > 0, errGuildInvalidAsset)
    loggedAssert(asset.decimals <= MAX_LOCKED_TOKEN_DECIMALS, errGuildInvalidAsset)
    loggedAssert(minimumApprovals > 0, errGuildInvalidSettings)
    this.staking.value = staking
    this.votingAsset.value = asset
    this.votingUnit.value = op.exp(10, asset.decimals)
    this.minimumApprovals.value = minimumApprovals
  }

  /** Validate an opaque consensus action; locked-token policies only administer their approval floor. */
  private validateConsensusAction(data: bytes): uint64 {
    const code = this.consensusActionCode(data)
    if (code === ActionSetMinimumApprovals) {
      loggedAssert(
        decodeArc4<ConsensusActionSetMinimumApprovals>(this.consensusActionPayload(data)).minimumApprovals > 0,
        errGuildInvalidSettings,
      )
      return 0
    }
    loggedErr(errGuildInvalidConsensusAction)
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  validateSettings(settings: GuildProposalSettings): void {
    super.validateSettings(settings)
    // A proposer needs a lock outliving now + duration, and no lock can outlive now + maximumLockup.
    loggedAssert(settings.participation === 0 && settings.duration < this.maximumLockup(), errGuildInvalidSettings)
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
    this.activeBallots.value += 1
  }

  resolveProposal(proposalID: uint64): GuildConsensusResult {
    const result = this.resolveBallot(proposalID)
    this.activeBallots.value -= 1
    return result
  }

  /* eslint-disable @typescript-eslint/no-unused-vars -- staking state is authoritative; no caller evidence is needed */
  vote(mbrPayment: gtxn.PaymentTxn, voter: Account, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void {
    const votingEnd = this.proposalVotingEnd(proposalID)
    this.voteWithPower(mbrPayment, voter, proposalID, vote, this.lockedPower(voter, votingEnd))
  }

  @abimethod({ readonly: true })
  proposalPower(account: Account, evidence: bytes, requiredThrough: uint64): uint64 {
    return this.lockedPower(account, requiredThrough)
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(governanceConfig: bytes): void {
    const config = decodeArc4<LockedTokenConsensusConfig>(governanceConfig)
    this.initializeConsensus()
    this.configureLockedToken(Application(config.staking), Asset(config.asset), config.minimumApprovals)
  }

  // DRAFT CONFIGURATION --------------------------------------------------------------------------

  @abimethod({ readonly: true })
  configurationMbr(config: bytes): uint64 {
    return config.length * 0
  }

  /** Re-point the policy at another staking app, asset, or approval floor while the Guild is in draft. */
  configure(mbrPayment: gtxn.PaymentTxn, config: bytes): void {
    this.requireGuild()
    loggedAssert(
      match(mbrPayment, {
        sender: this.guild.value.address,
        receiver: Global.currentApplicationAddress,
        amount: 0,
      }),
      errGuildInvalidPayment,
    )
    const configuration = decodeArc4<LockedTokenConsensusConfig>(config)
    this.configureLockedToken(Application(configuration.staking), Asset(configuration.asset), configuration.minimumApprovals)
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
   * A new approval floor may not exceed the approvals of the proposal that sets it, so a Guild can
   * never raise its floor beyond what its own voters just demonstrated and lock itself out.
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
    // Requirements are frozen per ballot, so the floor may change while ballots are open.
    const minimumApprovals = decodeArc4<ConsensusActionSetMinimumApprovals>(
      this.consensusActionPayload(data),
    ).minimumApprovals
    loggedAssert(minimumApprovals <= this.demonstratedApprovals(proposalID), errGuildLockout)
    this.minimumApprovals.value = minimumApprovals
  }
}
