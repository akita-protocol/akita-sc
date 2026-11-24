import { Account, Application, BoxMap, Bytes, bytes, clone, contract, Contract, GlobalState, gtxn, itxn, loggedAssert, loggedErr, match, op, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod, decodeArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { btoi, Global, Txn } from "@algorandfoundation/algorand-typescript/op";
import { GlobalStateKeyVersion } from "../../constants";
import { BoxCostPerByte, ONE_DAY, ONE_HUNDRED_PERCENT, ONE_WEEK } from "../../utils/constants";
import { calcPercent, canReceiveAlgo, payerOf, percentageOf, recordPayer, releaseDeposit, sponsorCost } from "../../utils/functions";
import { errPayerOnly } from "../../utils/errors";
import { STAKING_TYPE_LOCK } from "../../staking/types";
import { CID } from "../../utils/types/base";
import { AbstractAccountBoxPrefixExecutions, AbstractAccountBoxPrefixPlugins } from "../account/constants";
import { AddAllowanceInfo, EscrowInfo, EscrowReclaim, PluginKey } from "../account/types";
import { Split } from "../plugins/revenue-manager/types";
import { AkitaDAOBoxPrefixBootstrapGrants, AkitaDAOBoxPrefixParticipation, AkitaDAOBoxPrefixVoteReceipts, DAOLegacyProposalVotesMBR, DAOParticipationMBR, MaxGovernanceLockDays, AkitaDAOBoxPrefixUpgradeLeases, DAOUpgradeLeaseMBR, AkitaDAOBoxPrefixBootstrapKeys, AkitaDAOBoxPrefixProposals, AkitaDAOBoxPrefixTallies, AkitaDAOGlobalStateKeysBootstrapKeyCount, DAOProposalTallyMBR, MaxBootstrapKeyRounds, ProposalStatusInvalid, AkitaDAOBoxPrefixProposalVotes, AkitaDAOGlobalStateKeysAddAllowancesProposalSettings, AkitaDAOGlobalStateKeysAddPluginProposalSettings, AkitaDAOGlobalStateKeysAkitaAppList, AkitaDAOGlobalStateKeysAkitaAssets, AkitaDAOGlobalStateKeysAkitaSocialAppList, AkitaDAOGlobalStateKeysContentPolicy, AkitaDAOGlobalStateKeysGuildFees, AkitaDAOGlobalStateKeysInitialized, AkitaDAOGlobalStateKeysMinRewardsImpact, AkitaDAOGlobalStateKeysNewEscrowProposalSettings, AkitaDAOGlobalStateKeysNFTFees, AkitaDAOGlobalStateKeysInferenceFees, AkitaDAOGlobalStateKeysOtherAppList, AkitaDAOGlobalStateKeysPluginAppList, AkitaDAOGlobalStateKeysProposalActionLimit, AkitaDAOGlobalStateKeysProposalID, AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings, AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings, AkitaDAOGlobalStateKeysRemovePluginProposalSettings, AkitaDAOGlobalStateKeysRevenueSplits, AkitaDAOGlobalStateKeysSocialFees, AkitaDAOGlobalStateKeysStakingFees, AkitaDAOGlobalStateKeysSubscriptionFees, AkitaDAOGlobalStateKeysSwapFees, AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings, AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings, AkitaDAOGlobalStateKeysUpgradeAppProposalSettings, AkitaDAOGlobalStateKeysWallet, AkitaDAOGlobalStateKeysWalletFees, AkitaDAONumGlobalBytes, AkitaDAONumGlobalUints, DAOExecutionMBR, DAOProposalVotesMBR, DaoStateDraft, DaoStateFullyInitialized, DaoStatePartiallyInitialized, MinDAOPluginMBR, MinDAOProposalActionMbr, MinDAOProposalMBR, ProposalActionTypeAddAllowances, ProposalActionTypeAddNamedPlugin, ProposalActionTypeAddPlugin, ProposalActionTypeChangeAdmin, ProposalActionTypeExecutePlugin, ProposalActionTypeNewEscrow, ProposalActionTypeDeleteEscrow, ProposalActionTypeReclaim, ProposalActionTypeRemoveAllowances, ProposalActionTypeRemoveExecutePlugin, ProposalActionTypeRemoveNamedPlugin, ProposalActionTypeRemovePlugin, ProposalActionTypeToggleEscrowLock, ProposalActionTypeUpdateFields, ProposalActionTypeUpdateWallet, ProposalActionTypeUpgradeApp, ProposalStatusApproved, ProposalStatusDraft, ProposalStatusExecuted, ProposalStatusRejected, ProposalStatusVoting, ProposalVoteTypeAbstain, ProposalVoteTypeApprove, ProposalVoteTypeReject } from "./constants";
import { errBootstrapExpired, errBootstrapForbidden, errBootstrapKeyActive, errBootstrapKeysOutstanding, errExecutionKeyReused, errVotesOutstanding, errAlreadyInitialized, errDaoNotInitialized, errEmptyActionList, errExecutionKeyNotFound, errForbidden, errIncorrectSender, errInsufficientProposalThreshold, errInvalidPayment, errInvalidProposalAction, errInvalidProposalState, errInvalidUpgrade, errNoVotingPower, errNotAkitaDao, errPaymentNotRequired, errPaymentRequired, errProposalDoesNotExist, errProposalVoteNotFound, errTooManyActions, errVersionCannotBeEmpty, errVotingDurationNotMet, errWalletAlreadySetup } from "./errors";
import { AkitaAppList, AkitaAssets, AkitaDAOApps, AkitaDAOFees, AkitaSocialAppList, DAOPluginKey, DaoState, ExecutionMetadata, GovernanceParticipation, GovernanceWeight, GuildFees, InferenceFees, NFTFees, OtherAppList, PluginAppList, ProposalAction, ProposalActionType, ProposalAddAllowances, ProposalAddNamedPlugin, ProposalAddPlugin, ProposalChangeAdmin, ProposalCostInfo, ProposalDeleteEscrow, ProposalDetails, ProposalExecutePlugin, ProposalNewEscrow, ProposalReclaim, ProposalRemoveAllowances, ProposalRemoveExecutePlugin, ProposalRemoveNamedPlugin, ProposalRemovePlugin, ProposalSettings, ProposalTally, ProposalToggleEscrowLock, UpgradeLease, ProposalUpdateField, ProposalUpgradeApp, ProposalVoteInfo, ProposalVoteKey, ProposalVoteReceipt, ProposalVoteTotals, ProposalVoteType, SocialFees, StakingFees, SubscriptionFees, SwapFees, WalletFees } from "./types";

// CONTRACT IMPORTS
import type { Staking } from "../../staking/contract.algo";
import type { AbstractedAccount } from "../account/contract.algo";
import type { AbstractedAccountFactory } from "../account/factory.algo";
import type { AkitaDAOProposalValidator } from "./validator.algo";


@contract({ stateTotals: { globalBytes: AkitaDAONumGlobalBytes, globalUints: AkitaDAONumGlobalUints } })
export class AkitaDAO extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** state of the DAO */
  state = GlobalState<DaoState>({ initialValue: DaoStateDraft, key: AkitaDAOGlobalStateKeysInitialized })
  /** the version number of the DAO */
  version = GlobalState<string>({ initialValue: '', key: GlobalStateKeyVersion })
  /** the arc58 wallet the DAO controls */
  wallet = GlobalState<Application>({ key: AkitaDAOGlobalStateKeysWallet })
  /** the number of actions allowed in a proposal */
  proposalActionLimit = GlobalState<uint64>({ key: AkitaDAOGlobalStateKeysProposalActionLimit })
  /** the raw 36 byte content policy of the protocol */
  contentPolicy = GlobalState<CID>({ key: AkitaDAOGlobalStateKeysContentPolicy })
  /** the minimum impact score to qualify for daily disbursement */
  minRewardsImpact = GlobalState<uint64>({ key: AkitaDAOGlobalStateKeysMinRewardsImpact })
  /** the list of akita contract ids */
  akitaAppList = GlobalState<AkitaAppList>({ key: AkitaDAOGlobalStateKeysAkitaAppList })
  /** the list of akita social contract ids */
  akitaSocialAppList = GlobalState<AkitaSocialAppList>({ key: AkitaDAOGlobalStateKeysAkitaSocialAppList })
  /** the list of plugin contract ids */
  pluginAppList = GlobalState<PluginAppList>({ key: AkitaDAOGlobalStateKeysPluginAppList })
  /** the list of other contract ids we use */
  otherAppList = GlobalState<OtherAppList>({ key: AkitaDAOGlobalStateKeysOtherAppList })
  /** the fees for akita wallet operations */
  walletFees = GlobalState<WalletFees>({ key: AkitaDAOGlobalStateKeysWalletFees })
  /** the fees for guild operations */
  guildFees = GlobalState<GuildFees>({ key: AkitaDAOGlobalStateKeysGuildFees })
  /** fees associated with akita social */
  socialFees = GlobalState<SocialFees>({ key: AkitaDAOGlobalStateKeysSocialFees })
  /** fees associated with staking assets */
  stakingFees = GlobalState<StakingFees>({ key: AkitaDAOGlobalStateKeysStakingFees })
  /** fees associated with subscriptions */
  subscriptionFees = GlobalState<SubscriptionFees>({ key: AkitaDAOGlobalStateKeysSubscriptionFees })
  /** fees associated with NFT sales */
  nftFees = GlobalState<NFTFees>({ key: AkitaDAOGlobalStateKeysNFTFees })
  /** fees associated with swaps */
  swapFees = GlobalState<SwapFees>({ key: AkitaDAOGlobalStateKeysSwapFees })
  /** fees associated with the inference network; unset until an UpdateFields proposal writes it */
  inferenceFees = GlobalState<InferenceFees>({ key: AkitaDAOGlobalStateKeysInferenceFees })
  /** the akita assets */
  akitaAssets = GlobalState<AkitaAssets>({ key: AkitaDAOGlobalStateKeysAkitaAssets })
  /** the revenue manager contract id */
  revenueSplits = GlobalState<Split[]>({ key: AkitaDAOGlobalStateKeysRevenueSplits })

  /** The default settings for creating proposals by proposal action */
  /** proposal settings for upgrading applications */
  upgradeAppProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysUpgradeAppProposalSettings })
  /** proposal settings for adding a plugin */
  addPluginProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysAddPluginProposalSettings })
  /** proposal settings for removing a plugin */
  removePluginProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysRemovePluginProposalSettings })
  /** proposal settings for removing a plugin execution */
  removeExecutePluginProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings })
  /** proposal settings for adding an allowance */
  addAllowancesProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysAddAllowancesProposalSettings })
  /** proposal settings for removing an allowance */
  removeAllowancesProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings })
  /** proposal settings for creating a new escrow */
  newEscrowProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysNewEscrowProposalSettings })
  /** proposal settings for toggling an escrow lock */
  toggleEscrowLockProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings })
  /** proposal settings for updating fields */
  updateFieldsProposalSettings = GlobalState<ProposalSettings>({ key: AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings })
  /** the next proposal id */
  proposalID = GlobalState<uint64>({ key: AkitaDAOGlobalStateKeysProposalID })
  /**
   * Bootstrap execution keys that are still tracked. `initialize` requires 0 so no pre-authorized
   * creator-approved transaction can outlive creator control. Read through
   * `bootstrapKeysOutstanding()`: the key does not exist on DAOs created before it was introduced.
   */
  bootstrapKeyCount = GlobalState<uint64>({ key: AkitaDAOGlobalStateKeysBootstrapKeyCount })

  // BOXES ----------------------------------------------------------------------------------------

  /** Plugins that add functionality to the controlledAddress and the account that has permission to use it. */
  plugins = BoxMap<DAOPluginKey, ProposalSettings>({ keyPrefix: AbstractAccountBoxPrefixPlugins })
  /** voting state of a proposal */
  proposals = BoxMap<uint64, ProposalDetails>({ keyPrefix: AkitaDAOBoxPrefixProposals })
  /** legacy vote receipts by proposal id & address: still refunded and replaced on a re-vote */
  proposalVotes = BoxMap<ProposalVoteKey, ProposalVoteInfo>({ keyPrefix: AkitaDAOBoxPrefixProposalVotes })
  /** vote receipts by proposal id & address */
  voteReceipts = BoxMap<ProposalVoteKey, ProposalVoteReceipt>({ keyPrefix: AkitaDAOBoxPrefixVoteReceipts })
  /** governance participation per voter (read by the GovernanceParticipationGate and revenue payouts) */
  participation = BoxMap<Account, GovernanceParticipation>({ keyPrefix: AkitaDAOBoxPrefixParticipation })
  /** extra execution information for the DAO */
  executions = BoxMap<bytes<32>, ExecutionMetadata>({ keyPrefix: AbstractAccountBoxPrefixExecutions })
  /** voting-rule snapshot + outstanding vote receipts, per submitted proposal */
  tallies = BoxMap<uint64, ProposalTally>({ keyPrefix: AkitaDAOBoxPrefixTallies })
  /** execution keys registered by bootstrap proposals (lease -> lastValid round) */
  bootstrapKeys = BoxMap<bytes<32>, uint64>({ keyPrefix: AkitaDAOBoxPrefixBootstrapKeys })
  /**
   * Live UpgradeApp execution keys per target app. The Update plugin only acts for a target when the
   * group's execution key is recorded here, binding upgrades to an UpgradeApp action and its `app`.
   */
  upgradeLeases = BoxMap<uint64, UpgradeLease[]>({ keyPrefix: AkitaDAOBoxPrefixUpgradeLeases })
  /** caller-scoped grants added by bootstrap proposals: a public record of pre-launch setup, kept until a proposal removes the grant */
  bootstrapGrants = BoxMap<PluginKey, uint64>({ keyPrefix: AkitaDAOBoxPrefixBootstrapGrants })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private pluginsMbr(escrow: string): uint64 {
    return MinDAOPluginMBR + (BoxCostPerByte * Bytes(escrow).length)
  }

  private proposalsMbr(actions: ProposalAction[]): uint64 {
    let totalActionDataLength: uint64 = 0;
    for (let i: uint64 = 0; i < actions.length; i++) {
      totalActionDataLength += (MinDAOProposalActionMbr + actions[i].data.length)
    }

    return MinDAOProposalMBR + (BoxCostPerByte * totalActionDataLength)
  }

  private validateActions(actions: ProposalAction[]): void {
    // The wallet may not yet exist when the DAO is still in draft / partially-
    // initialized state (proposals submitted by the creator to configure the
    // DAO before the wallet is wired up). Pass `Application(0)` in that case —
    // only wallet-agnostic actions (e.g. UpdateFields) are valid during draft,
    // and the validator never reads wallet state for those.
    const walletApp: Application = this.wallet.hasValue ? this.wallet.value : Application(0)
    abiCall<typeof AkitaDAOProposalValidator.prototype.validateActions>({
      appId: Application(this.otherAppList.value.daoProposalValidator),
      args: [walletApp, actions]
    })
  }

  private validEditOrSubmit(proposalID: uint64): boolean {
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)
    const { status, creator } = this.proposals(proposalID).value

    return (
      status === ProposalStatusDraft &&
      Txn.sender === creator
    )
  }

  /**
   * `account`'s lock in `asset`, counted only if it outlasts `through`. Both values are in the asset's
   * base units: `weight` is the locked amount, `power` is amount x days left / 365, 0 with under a week
   * left and at most a year counted (DAO-05), so power never exceeds weight.
   */
  private lockedThrough(account: Account, asset: uint64, through: uint64): GovernanceWeight {
    const info = abiCall<typeof Staking.prototype.getInfo>({
      appId: this.akitaAppList.value.staking,
      args: [account, { asset, type: STAKING_TYPE_LOCK }],
    }).returnValue

    if (info.expiration <= through) {
      return { power: 0, weight: 0 }
    }

    const remaining: uint64 = info.expiration - Global.latestTimestamp
    if (remaining < ONE_WEEK) {
      return { power: 0, weight: info.amount }
    }

    let days: uint64 = remaining / ONE_DAY
    if (days > MaxGovernanceLockDays) {
      days = MaxGovernanceLockDays
    }
    // The quotient is at most info.amount, so it fits in a uint64.
    return { power: op.divw(...op.mulw(info.amount, days), MaxGovernanceLockDays), weight: info.amount }
  }

  /**
   * min over AKTA/BONES of each lock that stays locked until `through`, so a lock cannot be withdrawn
   * and voted again. `power` goes to the approve/reject/abstain tallies; `weight` counts toward participation,
   * in the same unit as the quorum denominator (locked stake). The two are not the same total: the
   * denominator is min(total locked AKTA, total locked BONES), while turnout sums each voter's own min,
   * counting only locks that outlast the vote. One-sided or unbalanced locks, and locks that expire
   * during the vote, add to the denominator and never to turnout, so full turnout can miss quorum.
   * Set `participation` with that gap in mind.
   */
  private governanceWeight(account: Account, through: uint64): GovernanceWeight {
    const { akta, bones } = this.akitaAssets.value

    if (akta === 0 || bones === 0) {
      return { power: 0, weight: 0 }
    }

    const a = this.lockedThrough(account, akta, through)
    const b = this.lockedThrough(account, bones, through)

    return {
      power: a.power < b.power ? a.power : b.power,
      weight: a.weight < b.weight ? a.weight : b.weight,
    }
  }

  /** Base units locked live: min(locked AKTA, locked BONES), the participation denominator. */
  private lockedStake(): uint64 {
    const { akta, bones } = this.akitaAssets.value
    if (akta === 0 || bones === 0) {
      return 0
    }
    const totals = abiCall<typeof Staking.prototype.getTotals>({
      appId: this.akitaAppList.value.staking,
      args: [[akta, bones]]
    }).returnValue
    const lockedAkta = totals[0].liveLockedStake
    const lockedBones = totals[1].liveLockedStake
    return lockedAkta < lockedBones ? lockedAkta : lockedBones
  }

  private bootstrapKeysOutstanding(): uint64 {
    return this.bootstrapKeyCount.hasValue ? this.bootstrapKeyCount.value : 0
  }

  /**
   * Bootstrap (creator-approved) execution keys must be short-lived and are tracked until cleared, so
   * `initialize` can prove none of them outlives creator control.
   */
  private trackBootstrapKey(lease: bytes<32>, lastValid: uint64): void {
    loggedAssert(lastValid <= Global.round + MaxBootstrapKeyRounds, errBootstrapForbidden)
    if (this.bootstrapKeys(lease).exists) {
      // Re-registered after removal: keep tracking the later expiry without double counting.
      if (lastValid > this.bootstrapKeys(lease).value) {
        this.bootstrapKeys(lease).value = lastValid
      }
      return
    }
    this.bootstrapKeys(lease).value = lastValid
    this.bootstrapKeyCount.value = this.bootstrapKeysOutstanding() + 1
  }

  /**
   * An execution key (lease) is never appended to while live, and an UpgradeApp lease is never re-used
   * (the Update plugin binds upgrades to it). A removed or consumed ExecutePlugin key may be re-registered.
   */
  private assertFreshLease(lease: bytes<32>): void {
    loggedAssert(!this.executions(lease).exists, errExecutionKeyReused)
    const info = abiCall<typeof AbstractedAccount.prototype.arc58_getExecutions>({
      appId: this.wallet.value,
      args: [[lease]]
    }).returnValue[0]
    loggedAssert(info.groups.length === 0, errExecutionKeyReused)
  }

  /** Record an UpgradeApp key for `app`, pruning entries whose window has passed. */
  private recordUpgradeLease(app: uint64, lease: bytes<32>, lastValid: uint64): void {
    const kept: UpgradeLease[] = []
    if (this.upgradeLeases(app).exists) {
      const current = clone(this.upgradeLeases(app).value)
      for (let i: uint64 = 0; i < current.length; i++) {
        if (current[i].lastValid >= Global.round) {
          kept.push(clone(current[i]))
        }
      }
    }
    kept.push({ lease, lastValid })
    this.upgradeLeases(app).value = clone(kept)
  }

  private maxSettings(a: ProposalSettings, b: ProposalSettings): ProposalSettings {
    return {
      fee: a.fee > b.fee ? a.fee : b.fee,
      power: a.power > b.power ? a.power : b.power,
      duration: a.duration > b.duration ? a.duration : b.duration,
      participation: a.participation > b.participation ? a.participation : b.participation,
      approval: a.approval > b.approval ? a.approval : b.approval,
    }
  }

  /**
   * UpdateFields is classed by the field it writes: registry/asset/revenue fields and the upgrade
   * settings need the upgrade class, and changing another class's settings needs that class too.
   */
  private updateFieldSettings(field: string): ProposalSettings {
    const base = clone(this.updateFieldsProposalSettings.value)
    switch (field) {
      case AkitaDAOGlobalStateKeysAkitaAppList:
      case AkitaDAOGlobalStateKeysAkitaSocialAppList:
      case AkitaDAOGlobalStateKeysOtherAppList:
      case AkitaDAOGlobalStateKeysPluginAppList:
      case AkitaDAOGlobalStateKeysAkitaAssets:
      case AkitaDAOGlobalStateKeysRevenueSplits:
      case AkitaDAOGlobalStateKeysUpgradeAppProposalSettings: {
        return this.maxSettings(base, this.upgradeAppProposalSettings.value)
      }
      case AkitaDAOGlobalStateKeysAddPluginProposalSettings: {
        return this.maxSettings(base, this.addPluginProposalSettings.value)
      }
      case AkitaDAOGlobalStateKeysRemovePluginProposalSettings: {
        return this.maxSettings(base, this.removePluginProposalSettings.value)
      }
      case AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings: {
        return this.maxSettings(base, this.removeExecutePluginProposalSettings.value)
      }
      case AkitaDAOGlobalStateKeysAddAllowancesProposalSettings: {
        return this.maxSettings(base, this.addAllowancesProposalSettings.value)
      }
      case AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings: {
        return this.maxSettings(base, this.removeAllowancesProposalSettings.value)
      }
      case AkitaDAOGlobalStateKeysNewEscrowProposalSettings: {
        return this.maxSettings(base, this.newEscrowProposalSettings.value)
      }
      case AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings: {
        return this.maxSettings(base, this.toggleEscrowLockProposalSettings.value)
      }
      default: {
        return base
      }
    }
  }

  /** Voting rules for a proposal: the submit-time snapshot, or live settings for pre-upgrade proposals. */
  private votingRules(proposalID: uint64, actions: ProposalAction[]): ProposalTally {
    if (this.tallies(proposalID).exists) {
      return clone(this.tallies(proposalID).value)
    }
    const { duration, participation, approval } = this.proposalCost(actions)
    return { duration, participation, approval, voteCount: 0, locked: 0, weight: 0 }
  }

  /** `votes` with `power` added to (or taken from) the `type` column. */
  private tallyVote(votes: ProposalVoteTotals, type: ProposalVoteType, power: uint64, add: boolean): ProposalVoteTotals {
    let approvals: uint64 = votes.approvals
    let rejections: uint64 = votes.rejections
    let abstains: uint64 = votes.abstains
    switch (type) {
      case ProposalVoteTypeApprove: {
        approvals = add ? approvals + power : approvals - power
        break
      }
      case ProposalVoteTypeReject: {
        rejections = add ? rejections + power : rejections - power
        break
      }
      case ProposalVoteTypeAbstain: {
        abstains = add ? abstains + power : abstains - power
        break
      }
      default: {
        loggedErr(errInvalidProposalAction)
      }
    }
    return { approvals, rejections, abstains }
  }

  private createOrUpdateProposal(
    id: uint64,
    cid: CID,
    actions: ProposalAction[],
    feesPaid: uint64,
    powerRequired: uint64
  ): uint64 {

    loggedAssert(actions.length > 0, errEmptyActionList)
    loggedAssert(actions.length <= this.proposalActionLimit.value, errTooManyActions)

    if (this.state.value !== DaoStateFullyInitialized) {
      loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
      // Creator-approved proposals may never hand the DAO wallet to another admin.
      for (let i: uint64 = 0; i < actions.length; i++) {
        loggedAssert(actions[i].type !== ProposalActionTypeChangeAdmin, errBootstrapForbidden)
      }

      id = this.newProposalID()

      this.proposals(id).value = {
        status: ProposalStatusApproved,
        cid,
        votes: {
          approvals: 0,
          rejections: 0,
          abstains: 0,
        },
        creator: Txn.sender,
        votingTs: 0,
        created: Global.latestTimestamp,
        feesPaid,
        actions: clone(actions)
      }

      return id
    }

    const { power: userPower } = this.governanceWeight(Txn.sender, Global.latestTimestamp + ONE_WEEK)

    loggedAssert(userPower >= powerRequired, errInsufficientProposalThreshold)

    let created: uint64 = 0
    if (id === 0) {
      id = this.newProposalID()
      created = Global.latestTimestamp
    } else {
      created = this.proposals(id).value.created
    }

    this.proposals(id).value = {
      status: ProposalStatusDraft,
      cid,
      votes: {
        approvals: 0,
        rejections: 0,
        abstains: 0,
      },
      creator: Txn.sender,
      votingTs: 0,
      created,
      feesPaid,
      actions: clone(actions)
    }

    return id
  }

  private getProposalSettings(type: ProposalActionType, data: bytes): ProposalSettings {
    switch (type) {
      case ProposalActionTypeUpgradeApp:
      case ProposalActionTypeUpdateWallet:
      case ProposalActionTypeChangeAdmin: {
        return this.upgradeAppProposalSettings.value
      }
      case ProposalActionTypeAddPlugin:
      case ProposalActionTypeAddNamedPlugin: {
        const plugin = type === ProposalActionTypeAddPlugin
          ? decodeArc4<ProposalAddPlugin>(data).plugin
          : decodeArc4<ProposalAddNamedPlugin>(data).plugin
        // A grant of the Update plugin is upgrade authority.
        if (plugin === this.pluginAppList.value.update) {
          return this.maxSettings(this.addPluginProposalSettings.value, this.upgradeAppProposalSettings.value)
        }
        return this.addPluginProposalSettings.value
      }
      case ProposalActionTypeExecutePlugin: {
        const { plugin, escrow } = decodeArc4<ProposalExecutePlugin>(data)
        // The Update plugin is only ever driven by UpgradeApp actions (upgrade class).
        loggedAssert(plugin !== this.pluginAppList.value.update, errInvalidProposalAction)
        loggedAssert(this.plugins({ plugin, escrow }).exists, errProposalDoesNotExist)
        return this.plugins({ plugin, escrow }).value
      }
      case ProposalActionTypeRemoveExecutePlugin: {
        return this.removeExecutePluginProposalSettings.value
      }
      case ProposalActionTypeRemovePlugin:
      case ProposalActionTypeRemoveNamedPlugin: {
        return this.removePluginProposalSettings.value
      }
      case ProposalActionTypeAddAllowances: {
        return this.addAllowancesProposalSettings.value
      }
      case ProposalActionTypeRemoveAllowances: {
        return this.removeAllowancesProposalSettings.value
      }
      case ProposalActionTypeNewEscrow: {
        return this.newEscrowProposalSettings.value
      }
      case ProposalActionTypeToggleEscrowLock:
      case ProposalActionTypeReclaim:
      case ProposalActionTypeDeleteEscrow: {
        return this.toggleEscrowLockProposalSettings.value
      }
      case ProposalActionTypeUpdateFields: {
        return this.updateFieldSettings(decodeArc4<ProposalUpdateField>(data).field)
      }
      default: {
        loggedErr(errInvalidProposalAction)
      }
    }
  }

  private addPlugin(data: ProposalAddNamedPlugin, bootstrap: boolean): void {
    const {
      name,
      plugin,
      caller,
      escrow,
      delegationType,
      lastValid,
      cooldown,
      methods,
      useRounds,
      useExecutionKey,
      coverFees,
      defaultToEscrow,
      fee,
      power,
      duration,
      participation,
      approval,
      allowances
    } = clone(data);

    // The Update plugin trusts a lease only when the wallet consumed it as an execution key.
    if (plugin === this.pluginAppList.value.update) {
      loggedAssert(caller === Global.zeroAddress && useExecutionKey, errInvalidProposalAction)
    }

    // Pre-launch automation is a feature: caller-scoped grants made in bootstrap survive `initialize`.
    // They are recorded so anyone can list exactly what was set up before governance took over.
    if (bootstrap && caller !== Global.zeroAddress) {
      this.bootstrapGrants({ plugin, caller, escrow: defaultToEscrow ? '' : escrow }).value = Global.round
    }

    if (useExecutionKey && caller === Global.zeroAddress) {
      this.plugins({ plugin, escrow: defaultToEscrow ? '' : escrow }).value = {
        fee,
        power,
        duration,
        participation,
        approval
      }
    }

    if (name !== '') {
      abiCall<typeof AbstractedAccount.prototype.arc58_addNamedPlugin>({
        appId: this.wallet.value,
        args: [
          name,
          plugin,
          caller,
          escrow,
          false,
          delegationType,
          lastValid,
          cooldown,
          methods,
          useRounds,
          useExecutionKey,
          coverFees,
          false,
          defaultToEscrow
        ]
      })
    } else {
      abiCall<typeof AbstractedAccount.prototype.arc58_addPlugin>({
        appId: this.wallet.value,
        args: [
          plugin,
          caller,
          escrow,
          false,
          delegationType,
          lastValid,
          cooldown,
          methods,
          useRounds,
          useExecutionKey,
          coverFees,
          false,
          defaultToEscrow
        ]
      })
    }

    if (escrow !== '' && allowances.length > 0) {
      this.addAllowances(escrow, allowances)
    }
  }

  private addAllowances(escrow: string, allowances: AddAllowanceInfo[]): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_addAllowances>({
      appId: this.wallet.value,
      args: [escrow, allowances]
    })
  }

  private removeAllowances(escrow: string, assets: uint64[]): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_removeAllowances>({
      appId: this.wallet.value,
      args: [escrow, assets]
    })
  }

  private removePlugin(data: ProposalRemoveNamedPlugin): void {
    const { name, plugin, caller, escrow } = data
    if (name !== '') {
      const key = abiCall<typeof AbstractedAccount.prototype.arc58_getNamedPluginKey>({
        appId: this.wallet.value,
        args: [name]
      }).returnValue
      loggedAssert(key.plugin === plugin && key.caller === caller && key.escrow === escrow, errInvalidProposalAction)
    }
    if (caller === Global.zeroAddress && this.plugins({ plugin, escrow }).exists) {
      this.plugins({ plugin, escrow }).delete()
    }
    if (this.bootstrapGrants({ plugin, caller, escrow }).exists) {
      this.bootstrapGrants({ plugin, caller, escrow }).delete()
    }

    if (name !== '') {
      abiCall<typeof AbstractedAccount.prototype.arc58_removeNamedPlugin>({
        appId: this.wallet.value,
        args: [name]
      })
      return
    }

    abiCall<typeof AbstractedAccount.prototype.arc58_removePlugin>({
      appId: this.wallet.value,
      args: [plugin, caller, escrow]
    })
  }

  private newEscrow(escrow: string, address: Account): uint64 {
    return abiCall<typeof AbstractedAccount.prototype.arc58_newEscrow>({
      appId: this.wallet.value,
      args: [escrow, address]
    }).returnValue
  }

  private toggleEscrowLock(escrow: string): EscrowInfo {
    return abiCall<typeof AbstractedAccount.prototype.arc58_toggleEscrowLock>({
      appId: this.wallet.value,
      args: [escrow]
    }).returnValue
  }

  private reclaim(escrow: string, reclaims: EscrowReclaim[]): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_reclaim>({
      appId: this.wallet.value,
      args: [escrow, reclaims]
    })
  }

  private deleteEscrow(escrow: string): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_deleteEscrow>({
      appId: this.wallet.value,
      args: [escrow]
    })
  }

  private changeAdmin(admin: Account): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_changeAdmin>({
      appId: this.wallet.value,
      args: [admin]
    })
  }

  private updateField(field: string, value: bytes): void {
    switch (field) {
      case AkitaDAOGlobalStateKeysContentPolicy: {
        this.contentPolicy.value = value.toFixed({ length: 36 })
        break
      }
      case AkitaDAOGlobalStateKeysProposalActionLimit: {
        this.proposalActionLimit.value = btoi(value)
        break
      }
      case AkitaDAOGlobalStateKeysMinRewardsImpact: {
        this.minRewardsImpact.value = btoi(value)
        break
      }
      case AkitaDAOGlobalStateKeysAkitaAppList: {
        const akitaAppList = decodeArc4<AkitaAppList>(value)
        this.akitaAppList.value = clone(akitaAppList)
        break
      }
      case AkitaDAOGlobalStateKeysAkitaSocialAppList: {
        const akitaSocialAppList = decodeArc4<AkitaSocialAppList>(value)
        this.akitaSocialAppList.value = clone(akitaSocialAppList)
        break
      }
      case AkitaDAOGlobalStateKeysPluginAppList: {
        const pluginAppList = decodeArc4<PluginAppList>(value)
        this.pluginAppList.value = clone(pluginAppList)
        break
      }
      case AkitaDAOGlobalStateKeysOtherAppList: {
        const otherAppList = decodeArc4<OtherAppList>(value)
        this.otherAppList.value = clone(otherAppList)
        break
      }
      case AkitaDAOGlobalStateKeysWalletFees: {
        const walletFees = decodeArc4<WalletFees>(value)
        this.walletFees.value = clone(walletFees)
        break
      }
      case AkitaDAOGlobalStateKeysGuildFees: {
        const guildFees = decodeArc4<GuildFees>(value)
        this.guildFees.value = clone(guildFees)
        break
      }
      case AkitaDAOGlobalStateKeysSocialFees: {
        const socialFees = decodeArc4<SocialFees>(value)
        this.socialFees.value = clone(socialFees)
        break
      }
      case AkitaDAOGlobalStateKeysStakingFees: {
        const stakingFees = decodeArc4<StakingFees>(value)
        this.stakingFees.value = clone(stakingFees)
        break
      }
      case AkitaDAOGlobalStateKeysSubscriptionFees: {
        const subscriptionFees = decodeArc4<SubscriptionFees>(value)
        this.subscriptionFees.value = clone(subscriptionFees)
        break
      }
      case AkitaDAOGlobalStateKeysNFTFees: {
        const nftFees = decodeArc4<NFTFees>(value)
        this.nftFees.value = clone(nftFees)
        break
      }
      case AkitaDAOGlobalStateKeysSwapFees: {
        const swapFees = decodeArc4<SwapFees>(value)
        this.swapFees.value = clone(swapFees)
        break
      }
      case AkitaDAOGlobalStateKeysInferenceFees: {
        const inferenceFees = decodeArc4<InferenceFees>(value)
        this.inferenceFees.value = clone(inferenceFees)
        break
      }
      case AkitaDAOGlobalStateKeysAkitaAssets: {
        this.akitaAssets.value = decodeArc4<AkitaAssets>(value)
        break
      }
      case AkitaDAOGlobalStateKeysUpgradeAppProposalSettings: {
        const upgradeAppSettings = decodeArc4<ProposalSettings>(value)
        this.upgradeAppProposalSettings.value = clone(upgradeAppSettings)
        break
      }
      case AkitaDAOGlobalStateKeysAddPluginProposalSettings: {
        const addPluginSettings = decodeArc4<ProposalSettings>(value)
        this.addPluginProposalSettings.value = clone(addPluginSettings)
        break
      }
      case AkitaDAOGlobalStateKeysRemovePluginProposalSettings: {
        const removePluginSettings = decodeArc4<ProposalSettings>(value)
        this.removePluginProposalSettings.value = clone(removePluginSettings)
        break
      }
      case AkitaDAOGlobalStateKeysAddAllowancesProposalSettings: {
        const addAllowanceSettings = decodeArc4<ProposalSettings>(value)
        this.addAllowancesProposalSettings.value = clone(addAllowanceSettings)
        break
      }
      case AkitaDAOGlobalStateKeysRemoveAllowancesProposalSettings: {
        const removeAllowanceSettings = decodeArc4<ProposalSettings>(value)
        this.removeAllowancesProposalSettings.value = clone(removeAllowanceSettings)
        break
      }
      case AkitaDAOGlobalStateKeysNewEscrowProposalSettings: {
        const newEscrowSettings = decodeArc4<ProposalSettings>(value)
        this.newEscrowProposalSettings.value = clone(newEscrowSettings)
        break
      }
      case AkitaDAOGlobalStateKeysRemoveExecutePluginProposalSettings: {
        const removeExecutePluginSettings = decodeArc4<ProposalSettings>(value)
        this.removeExecutePluginProposalSettings.value = clone(removeExecutePluginSettings)
        break
      }
      case AkitaDAOGlobalStateKeysToggleEscrowLockProposalSettings: {
        const toggleEscrowLockSettings = decodeArc4<ProposalSettings>(value)
        this.toggleEscrowLockProposalSettings.value = clone(toggleEscrowLockSettings)
        break
      }
      case AkitaDAOGlobalStateKeysUpdateFieldsProposalSettings: {
        const updateFieldsSettings = decodeArc4<ProposalSettings>(value)
        this.updateFieldsProposalSettings.value = clone(updateFieldsSettings)
        break
      }
      case AkitaDAOGlobalStateKeysRevenueSplits: {
        const revenueSplits = decodeArc4<Split[]>(value)
        this.revenueSplits.value = clone(revenueSplits)
        break
      }
    }
  }

  private newExecution(key: bytes<32>, groups: bytes<32>[], firstValid: uint64, lastValid: uint64): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_addExecutionKey>({
      appId: this.wallet.value,
      args: [key, groups, firstValid, lastValid]
    })
  }

  private removeExecution(key: bytes<32>): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_removeExecutionKey>({
      appId: this.wallet.value,
      args: [key]
    })
  }

  private newProposalID(): uint64 {
    const id = this.proposalID.value
    this.proposalID.value += 1
    return id
  }

  private updateWallet(): void {
    const factoryAppId = this.akitaAppList.value.wallet
    abiCall<typeof AbstractedAccountFactory.prototype.updateWallet>({
      appId: factoryAppId,
      args: [this.wallet.value]
    })
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  /**
   *
   * The Akita DAO contract supports its own upgrade via a secure, auditable process. Here's a step-by-step trace of how a self-upgrade is executed:
   * 
   * 1. Proposal Creation:
   *    - A member submits a proposal to upgrade the DAO by including a ProposalAction of type `UpgradeApp`.
   *    - This proposal references the ARC58 contract and specifies the required upgrade parameters, such as the new application code and any associated execution keys.
   *
   * 2. Proposal Approval:
   *    - The DAO community votes on the proposal. If it receives sufficient approvals as defined in the proposal’s settings, its status changes to `Approved`.
   * 
   * 3. Execution Initiation:
   *    - Upon approval, the DAO creates an execution entry in the ARC58 contract using the parameters from the upgrade proposal.
   *    - This sets up the conditions under which an upgrade may be performed, such as locking execution to a valid round interval and binding it to a unique execution key (via the transaction lease).
   *
   * 4. Upgrade Execution:
   *    - A transaction group is submitted where the ARC58 account (or an authorized delegate) triggers the actual `update` method on the DAO contract.
   *    - The `update` method receives the `proposalID` and index of the upgrade action.
   *    - The DAO contract performs the following validation checks before actually permitting the upgrade:
   *        a. Confirms the referenced proposal exists and has status `Approved`.
   *        b. Ensures the action type matches `UpgradeApp`.
   *        c. Verifies the current app ID matches the proposal’s intended target.
   *        d. Ensures the transaction lease matches the authorized execution key from the proposal.
   *        e. Validates that the group context (via groupId and round) satisfies execution constraints—e.g., only the specified group may proceed and only within a permitted round window.
   *    - Only if all conditions are satisfied is the application update allowed to continue.
   *
   * This architecture ensures upgrades are strictly governed, requiring DAO consensus, group-based transaction atomicity, and explicit validation checks at execution time.
   */
  @abimethod({ onCreate: 'require' })
  create(
    version: string,
    akta: uint64,
    contentPolicy: CID,
    minRewardsImpact: uint64,
    apps: AkitaDAOApps,
    fees: AkitaDAOFees,
    proposalSettings: {
      upgradeApp: ProposalSettings,
      addPlugin: ProposalSettings,
      removeExecutePlugin: ProposalSettings,
      removePlugin: ProposalSettings,
      addAllowance: ProposalSettings,
      removeAllowance: ProposalSettings,
      newEscrow: ProposalSettings,
      toggleEscrowLock: ProposalSettings
      updateFields: ProposalSettings,
    },
    revenueSplits: Split[]
  ): void {
    loggedAssert(this.version.value === '', errAlreadyInitialized)
    loggedAssert(version !== '', errVersionCannotBeEmpty)

    this.version.value = version
    this.proposalActionLimit.value = 5
    this.akitaAssets.value = { akta, bones: 0 }
    this.contentPolicy.value = contentPolicy
    this.minRewardsImpact.value = minRewardsImpact

    this.akitaAppList.value = {
      staking: apps.staking,
      rewards: apps.rewards,
      pool: apps.pool,
      prizeBox: apps.prizeBox,
      subscriptions: apps.subscriptions,
      gate: apps.gate,
      auction: apps.auction,
      hyperSwap: apps.hyperSwap,
      raffle: apps.raffle,
      metaMerkles: apps.metaMerkles,
      marketplace: apps.marketplace,
      wallet: apps.wallet,
    }

    this.akitaSocialAppList.value = {
      social: apps.social,
      graph: apps.graph,
      impact: apps.impact,
      moderation: apps.moderation
    }

    this.pluginAppList.value = {
      optin: apps.optin,
      revenueManager: apps.revenueManager,
      update: apps.update
    }

    this.otherAppList.value = {
      vrfBeacon: apps.vrfBeacon,
      nfdRegistry: apps.nfdRegistry,
      assetInbox: apps.assetInbox,
      escrow: apps.escrow,
      akitaNfd: apps.akitaNfd,
      poll: apps.poll,
      daoProposalValidator: apps.daoProposalValidator
    }

    this.walletFees.value = {
      createFee: fees.walletCreateFee,
      referrerPercentage: fees.walletReferrerPercentage
    }

    this.guildFees.value = {
      createFee: 0
    }

    this.socialFees.value = {
      postFee: fees.postFee,
      reactFee: fees.reactFee,
      impactTaxMin: fees.impactTaxMin,
      impactTaxMax: fees.impactTaxMax,
    }

    this.stakingFees.value = {
      creationFee: fees.poolCreationFee,
      impactTaxMin: fees.poolImpactTaxMin,
      impactTaxMax: fees.poolImpactTaxMax
    }

    this.subscriptionFees.value = {
      serviceCreationFee: fees.subscriptionServiceCreationFee,
      paymentPercentage: fees.subscriptionPaymentPercentage,
      triggerPercentage: fees.subscriptionTriggerPercentage,
    }

    this.nftFees.value = {
      marketplaceSalePercentageMin: fees.marketplaceSalePercentageMin,
      marketplaceSalePercentageMax: fees.marketplaceSalePercentageMax,
      marketplaceComposablePercentage: fees.marketplaceComposablePercentage,
      marketplaceRoyaltyDefaultPercentage: fees.marketplaceRoyaltyDefaultPercentage,
      shuffleSalePercentage: fees.shuffleSalePercentage,
      omnigemSaleFee: fees.omnigemSaleFee,
      auctionCreationFee: fees.auctionCreationFee,
      auctionSaleImpactTaxMin: fees.auctionSaleImpactTaxMin,
      auctionSaleImpactTaxMax: fees.auctionSaleImpactTaxMax,
      auctionComposablePercentage: fees.auctionComposablePercentage,
      auctionRafflePercentage: fees.auctionRafflePercentage,
      raffleCreationFee: fees.raffleCreationFee,
      raffleSaleImpactTaxMin: fees.raffleSaleImpactTaxMin,
      raffleSaleImpactTaxMax: fees.raffleSaleImpactTaxMax,
      raffleComposablePercentage: fees.raffleComposablePercentage,
    }

    this.swapFees.value = {
      impactTaxMin: fees.swapFeeImpactTaxMin,
      impactTaxMax: fees.swapFeeImpactTaxMax,
    }

    this.upgradeAppProposalSettings.value = clone(proposalSettings.upgradeApp)
    this.addPluginProposalSettings.value = clone(proposalSettings.addPlugin)
    this.removeExecutePluginProposalSettings.value = clone(proposalSettings.removeExecutePlugin)
    this.removePluginProposalSettings.value = clone(proposalSettings.removePlugin)
    this.addAllowancesProposalSettings.value = clone(proposalSettings.addAllowance)
    this.removeAllowancesProposalSettings.value = clone(proposalSettings.removeAllowance)
    this.newEscrowProposalSettings.value = clone(proposalSettings.newEscrow)
    this.toggleEscrowLockProposalSettings.value = clone(proposalSettings.toggleEscrowLock)
    this.updateFieldsProposalSettings.value = clone(proposalSettings.updateFields)

    this.revenueSplits.value = clone(revenueSplits)

    this.proposalID.value = 1
  }

  @abimethod({ allowActions: ['UpdateApplication'] })
  update(newVersion: string): void {
    loggedAssert(Txn.sender === this.wallet.value.address, errNotAkitaDao)
    const updatePlugin = this.pluginAppList.value.update
    loggedAssert(Global.callerApplicationId === updatePlugin, errInvalidUpgrade)
    this.version.value = newVersion
    // this.executions(Txn.lease).delete()
  }

  setup(nickname: string, salt: bytes<32>): uint64 {
    loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
    loggedAssert(this.state.value !== DaoStateFullyInitialized, errAlreadyInitialized)
    loggedAssert(!this.wallet.hasValue, errWalletAlreadySetup)

    const { wallet: appId } = this.akitaAppList.value

    const cost = this.setupCost()

    const walletID = abiCall<typeof AbstractedAccountFactory.prototype.newAccount>({
      appId,
      args: [
        itxn.payment({
          receiver: Application(appId).address,
          amount: cost,
        }),
        Global.zeroAddress,
        Global.currentApplicationAddress,
        nickname,
        Global.zeroAddress,
        salt,
        '',   // bio
        true, // automaticUpdates
        0,    // extraFunding
        [],   // assets
        [],   // plugins
      ]
    }).returnValue

    this.wallet.value = Application(walletID)

    return walletID
  }

  partiallyInitialize(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
    loggedAssert(this.state.value === DaoStateDraft, errAlreadyInitialized)
    this.state.value = DaoStatePartiallyInitialized
  }

  initialize(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errForbidden)
    loggedAssert(this.state.value !== DaoStateFullyInitialized, errAlreadyInitialized)
    // Every execution key a bootstrap proposal registered must be cleared (used, expired or revoked),
    // so no creator-approved key outlives creator control. Caller-scoped grants are pre-launch
    // automation and survive on purpose; `bootstrapGrants` lists them. Keys created before this
    // tracking existed are not counted here.
    loggedAssert(this.bootstrapKeysOutstanding() === 0, errBootstrapKeysOutstanding)
    this.state.value = DaoStateFullyInitialized
  }

  /**
   * Stop tracking bootstrap execution keys. A key that is still live in the DAO wallet is revoked;
   * only the creator may revoke one before its window has passed. Keys that were already used or have
   * expired can be cleared by anyone.
   */
  clearBootstrapKeys(leases: bytes<32>[]): void {
    for (let i: uint64 = 0; i < leases.length; i++) {
      const lease = leases[i]
      loggedAssert(this.bootstrapKeys(lease).exists, errExecutionKeyNotFound)
      const lastValid = this.bootstrapKeys(lease).value

      const info = abiCall<typeof AbstractedAccount.prototype.arc58_getExecutions>({
        appId: this.wallet.value,
        args: [[lease]]
      }).returnValue[0]

      if (info.groups.length > 0) {
        loggedAssert(lastValid < Global.round || Txn.sender === Global.creatorAddress, errBootstrapKeyActive)
        this.removeExecution(lease)
      }

      this.bootstrapKeys(lease).delete()
      this.bootstrapKeyCount.value = this.bootstrapKeysOutstanding() - 1
    }
  }

  // AKITA DAO METHODS ----------------------------------------------------------------------------

  newProposal(payment: gtxn.PaymentTxn, cid: CID, actions: ProposalAction[]): uint64 {
    const { total, power } = this.proposalCost(actions)

    let fee: uint64 = 0
    if (
      this.state.value === DaoStateFullyInitialized ||
      (this.state.value === DaoStatePartiallyInitialized && Txn.sender !== Global.creatorAddress)
    ) {
      fee = total
    }

    // Anyone may fund a proposal. A payer other than the proposer is remembered, and funds that record,
    // so every refund of the prepayment goes back to whoever paid it (deleteProposal, editProposal).
    const sponsor: uint64 = fee > 0 ? sponsorCost(payment.sender, Txn.sender) : 0
    loggedAssert(
      match(
        payment,
        {
          receiver: Global.currentApplicationAddress,
          amount: fee + sponsor
        }
      ),
      errInvalidPayment
    )

    this.validateActions(actions)

    const id = this.createOrUpdateProposal(0, cid, actions, fee, power)
    if (sponsor > 0) {
      recordPayer(this.proposals(id).key, payment.sender, Txn.sender)
    }
    return id
  }

  editProposal(id: uint64, cid: CID, actions: ProposalAction[]): void {
    loggedAssert(this.validEditOrSubmit(id), errInvalidProposalState)

    const { feesPaid } = this.proposals(id).value
    const { total, power } = this.proposalCost(actions)

    loggedAssert(total <= feesPaid, errPaymentRequired)

    this.validateActions(actions)
    this.createOrUpdateProposal(id, cid, actions, total, power)

    // A cheaper edit returns the difference, to whoever paid the prepayment, instead of silently keeping
    // it. A payer whose account has closed gives way to the proposer, so the edit can never be blocked.
    if (feesPaid > total) {
      const payer = payerOf(this.proposals(id).key, Txn.sender)
      itxn
        .payment({ receiver: canReceiveAlgo(payer, feesPaid - total) ? payer : Txn.sender, amount: feesPaid - total, fee: 0 })
        .submit()
    }
  }

  editProposalWithPayment(payment: gtxn.PaymentTxn, id: uint64, cid: CID, actions: ProposalAction[]): void {
    loggedAssert(this.validEditOrSubmit(id), errInvalidProposalState)

    const { feesPaid } = this.proposals(id).value
    const { total, power } = this.proposalCost(actions)

    loggedAssert(total > feesPaid, errPaymentNotRequired)

    // A proposal has one payer, so its refund never has to be split: the top-up comes from the account
    // that paid the prepayment, which need not be the proposer.
    loggedAssert(payment.sender === payerOf(this.proposals(id).key, Txn.sender), errPayerOnly)
    loggedAssert(
      match(
        payment,
        {
          receiver: Global.currentApplicationAddress,
          amount: total - feesPaid
        }
      ),
      errInvalidPayment
    )

    this.validateActions(actions)
    this.createOrUpdateProposal(id, cid, actions, total, power)
  }

  deleteProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)

    const { status, creator, feesPaid, actions, votingTs } = clone(this.proposals(proposalID).value)
    // Bootstrap leftovers (creator-approved, never executed) can be removed by their creator.
    const bootstrapLeftover = status === ProposalStatusApproved && votingTs === 0
    loggedAssert(
      status === ProposalStatusDraft ||
      status === ProposalStatusExecuted ||
      status === ProposalStatusRejected ||
      status === ProposalStatusInvalid ||
      bootstrapLeftover,
      errInvalidProposalState
    )

    loggedAssert(Txn.sender === creator, errIncorrectSender)

    // A never-submitted draft consumed nothing, so its whole prepayment returns to whoever paid it, the
    // creator unless someone else funded the proposal. Any other proposal keeps its fee for DAO
    // operations and only releases its storage.
    let storage = this.proposalsMbr(actions)
    if (this.tallies(proposalID).exists) {
      // Voters must recover their receipts (deleteProposalVotes) before the proposal can go.
      loggedAssert(this.tallies(proposalID).value.voteCount === 0, errVotesOutstanding)
      this.tallies(proposalID).delete()
      storage += DAOProposalTallyMBR
    } else {
      // A pre-upgrade proposal that went to a vote cannot prove its vote receipts are cleared.
      loggedAssert(votingTs === 0, errVotesOutstanding)
    }

    let refund: uint64 = feesPaid
    if (status !== ProposalStatusDraft) {
      refund = feesPaid < storage ? feesPaid : storage
    }

    this.proposals(proposalID).delete()

    const [receiver, amount] = releaseDeposit(this.proposals(proposalID).key, creator, refund)
    if (amount > 0) {
      itxn.payment({ receiver, amount, fee: 0 }).submit()
    }
  }

  submitProposal(proposalID: uint64): void {
    loggedAssert(this.validEditOrSubmit(proposalID), errInvalidProposalState)

    // Snapshot the voting rules so later settings changes cannot alter or brick this vote.
    const actions = clone(this.proposals(proposalID).value.actions)
    const { duration, participation, approval } = this.proposalCost(actions)
    this.tallies(proposalID).value = { duration, participation, approval, voteCount: 0, locked: this.lockedStake(), weight: 0 }

    this.proposals(proposalID).value.votingTs = Global.latestTimestamp
    this.proposals(proposalID).value.status = ProposalStatusVoting
  }

  /** The proposer abandons an approved proposal that has not executed (e.g. it became unexecutable). */
  cancelProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)
    const { status, creator, votingTs } = this.proposals(proposalID).value
    loggedAssert(status === ProposalStatusApproved && votingTs !== 0, errInvalidProposalState)
    loggedAssert(Txn.sender === creator, errIncorrectSender)
    this.proposals(proposalID).value.status = ProposalStatusInvalid
  }

  /**
   * Cast or change a vote. Approve, reject and abstain each add the voter's time-weighted power to
   * their column, so the three columns sum to the voters' power. The voter's locked amount (weight)
   * counts toward the proposal's participation. Both are base units. A voter with no power cannot vote.
   *
   * `mbrPayment` must cover the storage this vote creates: a receipt (`DAOProposalVotesMBR`) unless one
   * exists, plus `DAOParticipationMBR` with the voter's first vote. Anything above that, and the deposit
   * of a replaced legacy receipt, is refunded.
   */
  voteProposal(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, vote: ProposalVoteType): void {
    loggedAssert(this.state.value !== DaoStateDraft, errDaoNotInitialized)
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)

    const proposal = clone(this.proposals(proposalID).value)
    loggedAssert(proposal.status === ProposalStatusVoting, errInvalidProposalState)

    const rules = this.votingRules(proposalID, proposal.actions)
    const votingEnds: uint64 = proposal.votingTs + rules.duration
    loggedAssert(Global.latestTimestamp <= votingEnds, errVotingDurationNotMet)

    const key: ProposalVoteKey = { proposalID, voter: Txn.sender }

    // The vote this call replaces (none: zero power and weight). Legacy receipts carry no weight.
    let previous: ProposalVoteReceipt = { type: ProposalVoteTypeApprove, power: 0, weight: 0 }
    const revote = this.voteReceipts(key).exists
    let cost: uint64 = 0
    let released: uint64 = 0
    if (revote) {
      previous = clone(this.voteReceipts(key).value)
    } else {
      cost += DAOProposalVotesMBR
      if (this.proposalVotes(key).exists) {
        const legacy = clone(this.proposalVotes(key).value)
        previous = { type: legacy.type, power: legacy.power, weight: 0 }
        this.proposalVotes(key).delete()
        released = DAOLegacyProposalVotesMBR
      } else {
        rules.voteCount += 1
      }
    }

    const [record, hasRecord] = clone(this.participation(Txn.sender).maybe())
    if (!hasRecord) {
      cost += DAOParticipationMBR
    }

    // Anyone may fund the voter's storage. A new receipt carries a refundable deposit: a payer other than
    // the voter is remembered, and funds that record, so deleteProposalVotes returns the deposit to them.
    // What the payment holds above the cost goes back to its payer below.
    if (!revote) {
      cost += sponsorCost(mbrPayment.sender, Txn.sender)
    }
    loggedAssert(
      match(
        mbrPayment,
        {
          receiver: Global.currentApplicationAddress,
          amount: { greaterThanEq: cost },
        }
      ),
      errInvalidPayment
    )

    // Only locks that outlast the vote count, so a lock cannot be withdrawn and voted again. Without power
    // (no such lock, or under a week of it left) there is no vote, and no re-vote either: a cast vote keeps
    // the power it was cast with. Power > 0 implies weight > 0.
    const { power, weight } = this.governanceWeight(Txn.sender, votingEnds)
    loggedAssert(power > 0, errNoVotingPower)

    const votes = this.tallyVote(proposal.votes, previous.type, previous.power, false)
    this.proposals(proposalID).value.votes = this.tallyVote(votes, vote, power, true)
    this.voteReceipts(key).value = { type: vote, power, weight }
    if (!revote) {
      recordPayer(this.voteReceipts(key).key, mbrPayment.sender, Txn.sender)
    }

    if (this.tallies(proposalID).exists) {
      rules.weight = rules.weight - previous.weight + weight
      this.tallies(proposalID).value = clone(rules)
    }

    // Each proposal counts once; a re-vote only moves the timestamp. A replaced legacy receipt predates
    // the record, so it counts here.
    let counted: uint64 = hasRecord ? record.votes : 0
    if (!revote) {
      counted += 1
    }
    this.participation(Txn.sender).value = { lastVotedTs: Global.latestTimestamp, lastProposalID: proposalID, votes: counted }

    // Storage released from a replaced legacy receipt was the voter's own deposit, so it returns to the voter.
    // The surplus of this payment returns to whoever paid it; a voter who pays for themselves gets one refund.
    const surplus: uint64 = mbrPayment.amount - cost
    let toVoter: uint64 = released
    if (mbrPayment.sender === Txn.sender) {
      toVoter += surplus
    } else if (surplus > 0) {
      itxn.payment({ receiver: mbrPayment.sender, amount: surplus, fee: 0 }).submit()
    }
    if (toVoter > 0) {
      itxn.payment({ receiver: Txn.sender, amount: toVoter, fee: 0 }).submit()
    }
  }

  finalizeProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)

    const { status, votes: { approvals, rejections, abstains }, votingTs, actions } = clone(this.proposals(proposalID).value)

    loggedAssert(status === ProposalStatusVoting, errInvalidProposalState)

    const { duration, participation, approval, locked, weight } = this.votingRules(proposalID, actions)
    const tallied = this.tallies(proposalID).exists

    // Quorum counts the locked amount that voted against the amount locked when voting started
    // (DAO-04: power decays with lock time, so it is never compared with raw stake). Pre-upgrade
    // proposals have no tally: they compare their recorded power with the live locked total.
    let turnout: uint64 = weight
    let denominator: uint64 = locked
    if (!tallied) {
      turnout = approvals + rejections + abstains
      denominator = this.lockedStake()
    }
    const quorumAt: uint64 = calcPercent(denominator, participation)
    const passes = turnout >= quorumAt && this.approvalMet(approvals, rejections, approval)

    if (Global.latestTimestamp <= (votingTs + duration)) {
      // Early close: the result must hold whatever the stake that has not voted does. Power never exceeds
      // the locked amount behind it, so that stake can add at most the live locked total less the amount
      // that voted. Resolving closes the vote, so votes cast so far count as they stand.
      loggedAssert(tallied, errVotingDurationNotMet)
      const live = this.lockedStake()
      const remaining: uint64 = live > weight ? live - weight : 0
      const decided = passes
        ? this.approvalMet(approvals, rejections + remaining, approval)
        : !(weight + remaining >= quorumAt && this.approvalMet(approvals + remaining, rejections, approval))
      loggedAssert(decided, errVotingDurationNotMet)
    }

    // A vote that closed without quorum is final: it cannot be approved later when live stake falls.
    if (passes) {
      this.proposals(proposalID).value.status = ProposalStatusApproved
    } else {
      this.proposals(proposalID).value.status = ProposalStatusRejected
    }
  }

  /** Whether approvals reach `approval` of the decisive (approve + reject) power; abstain-only never does. */
  private approvalMet(approvals: uint64, rejections: uint64, approval: uint64): boolean {
    if (approvals === 0) {
      return false
    }
    if (rejections === 0) {
      return ONE_HUNDRED_PERCENT >= approval
    }
    return percentageOf(approvals, approvals + rejections) >= approval
  }

  executeProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)

    const { status, actions, votingTs } = clone(this.proposals(proposalID).value)

    loggedAssert(status === ProposalStatusApproved, errInvalidProposalState)

    // Creator-approved bootstrap proposals expire the moment creator control ends.
    const bootstrap = votingTs === 0
    if (bootstrap) {
      loggedAssert(this.state.value !== DaoStateFullyInitialized, errBootstrapExpired)
    }

    for (let i: uint64 = 0; i < actions.length; i++) {

      const { type, data } = actions[i]

      switch (type) {
        case ProposalActionTypeUpgradeApp: {
          const { app, executionKey, groups, firstValid, lastValid } = decodeArc4<ProposalUpgradeApp>(data)
          loggedAssert(app !== 0 && executionKey !== op.bzero(32).toFixed({ length: 32 }), errInvalidProposalAction)
          this.assertFreshLease(executionKey)
          if (bootstrap) {
            this.trackBootstrapKey(executionKey, lastValid)
          }
          // Record lease -> (proposal, action) so the Update plugin can bind the execution to this
          // UpgradeApp action and its target app.
          this.executions(executionKey).value = { proposalID, index: i }
          this.recordUpgradeLease(app, executionKey, lastValid)
          this.newExecution(executionKey, groups, firstValid, lastValid)
          break
        }
        case ProposalActionTypeExecutePlugin: {
          const { plugin, executionKey, groups, firstValid, lastValid } = decodeArc4<ProposalExecutePlugin>(data)
          loggedAssert(plugin !== this.pluginAppList.value.update, errInvalidProposalAction)
          this.assertFreshLease(executionKey)
          if (bootstrap) {
            this.trackBootstrapKey(executionKey, lastValid)
          }
          this.newExecution(executionKey, groups, firstValid, lastValid)
          break
        }
        case ProposalActionTypeRemoveExecutePlugin: {
          const { executionKey } = decodeArc4<ProposalRemoveExecutePlugin>(data)
          this.removeExecution(executionKey)
          break
        }
        case ProposalActionTypeAddPlugin: {
          this.addPlugin({ name: '', ...decodeArc4<ProposalAddPlugin>(data) }, bootstrap)
          break
        }
        case ProposalActionTypeAddNamedPlugin: {
          this.addPlugin(decodeArc4<ProposalAddNamedPlugin>(data), bootstrap)
          break
        }
        case ProposalActionTypeRemovePlugin: {
          this.removePlugin({ name: '', ...decodeArc4<ProposalRemovePlugin>(data) })
          break
        }
        case ProposalActionTypeRemoveNamedPlugin: {
          this.removePlugin(decodeArc4<ProposalRemoveNamedPlugin>(data))
          break
        }
        case ProposalActionTypeAddAllowances: {
          const { escrow, allowances } = decodeArc4<ProposalAddAllowances>(data)
          this.addAllowances(escrow, allowances)
          break
        }
        case ProposalActionTypeRemoveAllowances: {
          const { escrow, assets } = decodeArc4<ProposalRemoveAllowances>(data)
          this.removeAllowances(escrow, assets)
          break
        }
        case ProposalActionTypeNewEscrow: {
          const { escrow, address } = decodeArc4<ProposalNewEscrow>(data)
          this.newEscrow(escrow, address)
          break
        }
        case ProposalActionTypeToggleEscrowLock: {
          const { escrow } = decodeArc4<ProposalToggleEscrowLock>(data)
          this.toggleEscrowLock(escrow)
          break
        }
        case ProposalActionTypeReclaim: {
          const { escrow, reclaims } = decodeArc4<ProposalReclaim>(data)
          this.reclaim(escrow, reclaims)
          break
        }
        case ProposalActionTypeDeleteEscrow: {
          const { escrow } = decodeArc4<ProposalDeleteEscrow>(data)
          this.deleteEscrow(escrow)
          break
        }
        case ProposalActionTypeChangeAdmin: {
          const { admin } = decodeArc4<ProposalChangeAdmin>(data)
          this.changeAdmin(admin)
          break
        }
        case ProposalActionTypeUpdateFields: {
          const { field, value } = decodeArc4<ProposalUpdateField>(data)
          this.updateField(field, value)
          break
        }
        case ProposalActionTypeUpdateWallet: {
          this.updateWallet()
          break
        }
      }
    }

    this.proposals(proposalID).value.status = ProposalStatusExecuted
  }

  deleteProposalVotes(proposalID: uint64, voters: Account[]): void {
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)
    loggedAssert(
      this.proposals(proposalID).value.status === ProposalStatusApproved ||
      this.proposals(proposalID).value.status === ProposalStatusRejected ||
      this.proposals(proposalID).value.status === ProposalStatusExecuted ||
      this.proposals(proposalID).value.status === ProposalStatusInvalid,
      errInvalidProposalState
    )

    // Every receipt's deposit goes back to whoever paid it when the vote was cast: the voter, unless
    // someone else funded the vote (a legacy receipt never has a recorded payer). Participation records stay.
    for (let i: uint64 = 0; i < voters.length; i++) {
      const key: ProposalVoteKey = { proposalID, voter: voters[i] }
      let receiver = voters[i]
      let deposit: uint64 = DAOProposalVotesMBR
      if (this.voteReceipts(key).exists) {
        this.voteReceipts(key).delete()
        const [payer, amount] = releaseDeposit(this.voteReceipts(key).key, voters[i], DAOProposalVotesMBR)
        receiver = payer
        deposit = amount
      } else {
        loggedAssert(this.proposalVotes(key).exists, errProposalVoteNotFound)
        this.proposalVotes(key).delete()
        deposit = DAOLegacyProposalVotesMBR
      }
      // A closed (empty) account cannot receive a payment below the minimum balance: the DAO keeps it.
      if (canReceiveAlgo(receiver, deposit)) {
        itxn.payment({ receiver, amount: deposit, fee: 0 }).submit()
      }
    }

    if (this.tallies(proposalID).exists) {
      this.tallies(proposalID).value.voteCount -= voters.length
    }
  }

  @abimethod({ readonly: true })
  setupCost(): uint64 {
    const { wallet: appId } = this.akitaAppList.value
    return abiCall<typeof AbstractedAccountFactory.prototype.cost>({ appId }).returnValue
  }

  @abimethod({ readonly: true })
  proposalCost(actions: ProposalAction[]): ProposalCostInfo {
    let mbr: uint64 = this.proposalsMbr(actions)
    let info: ProposalCostInfo = {
      total: 0,
      mbr: 0,
      fee: 0,
      power: 0,
      duration: 0,
      participation: 0,
      approval: 0
    }

    for (let i: uint64 = 0; i < actions.length; i++) {

      const { type, data } = actions[i]

      const settings = this.getProposalSettings(type, data)

      info.total += settings.fee
      info.fee += settings.fee

      if (type === ProposalActionTypeUpgradeApp) {
        mbr += DAOExecutionMBR + DAOUpgradeLeaseMBR
      } else if (type === ProposalActionTypeAddPlugin) {
        // Matches addPlugin: settings are stored only for global execution-key plugins.
        const { caller, escrow, useExecutionKey, defaultToEscrow } = decodeArc4<ProposalAddPlugin>(data)
        if (useExecutionKey && caller === Global.zeroAddress) {
          mbr += this.pluginsMbr(defaultToEscrow ? '' : escrow)
        }
      } else if (type === ProposalActionTypeAddNamedPlugin) {
        const { caller, escrow, useExecutionKey, defaultToEscrow } = decodeArc4<ProposalAddNamedPlugin>(data)
        if (useExecutionKey && caller === Global.zeroAddress) {
          mbr += this.pluginsMbr(defaultToEscrow ? '' : escrow)
        }
      }

      if (settings.power > info.power) {
        info.power = settings.power
      }

      if (settings.duration > info.duration) {
        info.duration = settings.duration
      }

      if (settings.participation > info.participation) {
        info.participation = settings.participation
      }

      if (settings.approval > info.approval) {
        info.approval = settings.approval
      }
    }

    // A voted proposal stores a tally box at submit.
    if (this.state.value === DaoStateFullyInitialized) {
      mbr += DAOProposalTallyMBR
    }

    // fee should cover MBR if not, set total to MBR and fee to 0
    // this way the contract sustains its operations even if the DAO decides
    // not to charge a fee for proposals
    if (info.total < mbr) {
      info.total = mbr
      info.mbr = mbr
      info.fee = 0
    } else {
      info.mbr = mbr
      info.fee = info.total - mbr
    }

    if (this.state.value !== DaoStateFullyInitialized && Txn.sender === Global.creatorAddress) {
      info.total = 0
      info.fee = 0
    }

    return info
  }

  @abimethod({ readonly: true })
  getProposal(proposalID: uint64): ProposalDetails {
    loggedAssert(this.proposals(proposalID).exists, errProposalDoesNotExist)
    return this.proposals(proposalID).value
  }

  /**
   * Whether `lease` was registered by an UpgradeApp action targeting `app` and its window is still open
   * (read by the Update plugin).
   */
  @abimethod({ readonly: true })
  isUpgradeLease(app: uint64, lease: bytes<32>): boolean {
    if (!this.upgradeLeases(app).exists) {
      return false
    }
    const entries = clone(this.upgradeLeases(app).value)
    for (let i: uint64 = 0; i < entries.length; i++) {
      if (entries[i].lease === lease && entries[i].lastValid >= Global.round) {
        return true
      }
    }
    return false
  }

  /** `account`'s governance participation; all zeros if it has never voted. */
  @abimethod({ readonly: true })
  getGovernanceParticipation(account: Account): GovernanceParticipation {
    return this.participation(account).get({ default: { lastVotedTs: 0, lastProposalID: 0, votes: 0 } })
  }

  @abimethod({ readonly: true })
  getProposalTally(proposalID: uint64): ProposalTally {
    loggedAssert(this.tallies(proposalID).exists, errProposalDoesNotExist)
    return this.tallies(proposalID).value
  }

  @abimethod({ readonly: true })
  mustGetExecution(lease: bytes<32>): ExecutionMetadata {
    loggedAssert(this.executions(lease).exists, errExecutionKeyNotFound)
    return this.executions(lease).value
  }

  opUp(): void { }
}
