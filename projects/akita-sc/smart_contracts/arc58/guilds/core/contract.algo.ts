import {
  Account,
  Application,
  Asset,
  BoxMap,
  bytes,
  Bytes,
  clone,
  contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  loggedErr,
  match,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GlobalStateKeyVersion } from '../../../constants'
import { BoxCostPerByte, ONE_HUNDRED_PERCENT } from '../../../utils/constants'
import { recordPayer, releasePayer, sponsorCost } from '../../../utils/functions'
import type { CID } from '../../../utils/types/base'
import { AbstractAccountGlobalStateKeysControlledAddress } from '../../account/constants'
import { DelegationTypeSelf } from '../../account/types'
import {
  GuildActionAddAllowances,
  GuildActionAddNamedPlugin,
  GuildActionAddPlugin,
  GuildActionChangeAdmin,
  GuildActionConsensus,
  GuildActionExecutePlugin,
  GuildActionFullyInitialize,
  GuildActionLockPluginSet,
  GuildActionDeleteEscrow,
  GuildActionNewEscrow,
  GuildActionReclaim,
  GuildActionRemoveAllowances,
  GuildActionRemoveExecution,
  GuildActionRemoveNamedPlugin,
  GuildActionRemovePlugin,
  GuildActionSetConsensusActionSettings,
  GuildActionSetFeeAsset,
  GuildActionSetProposalActionLimit,
  GuildActionSetPluginSettings,
  GuildActionSetProposalSettings,
  GuildActionNewWallet,
  GuildActionToggleEscrowLock,
  GuildActionUpdateWallet,
  GuildActionUpgradeApp,
  GuildBoxPrefixConsensusActions,
  GuildBoxPrefixExecutions,
  GuildBoxPrefixFeeTokenReserves,
  GuildBoxPrefixPlugins,
  GuildBoxPrefixProposals,
  GuildConsensusBoxPrefixVotes,
  GuildConsensusActionSettingsMBR,
  GuildGlobalStateKeyConsensus,
  GuildGlobalStateKeyAddAllowancesProposalSettings,
  GuildGlobalStateKeyAddPluginProposalSettings,
  GuildGlobalStateKeyCreator,
  GuildGlobalStateKeyFeeAsset,
  GuildGlobalStateKeyNewEscrowProposalSettings,
  GuildGlobalStateKeyPluginSetLocked,
  GuildGlobalStateKeyProposalActionLimit,
  GuildGlobalStateKeyProposalID,
  GuildGlobalStateKeyRemoveAllowancesProposalSettings,
  GuildGlobalStateKeyRemoveExecutionProposalSettings,
  GuildGlobalStateKeyRemovePluginProposalSettings,
  GuildGlobalStateKeyReserved,
  GuildGlobalStateKeyState,
  GuildGlobalStateKeyToggleEscrowLockProposalSettings,
  GuildGlobalStateKeyUpdateGuildProposalSettings,
  GuildGlobalStateKeyUpgradeAppProposalSettings,
  GuildGlobalStateKeyWallet,
  GuildGlobalStateKeyWalletFactory,
  GuildNumGlobalBytes,
  GuildNumGlobalUints,
  GuildExecutionMBR,
  GuildFeeTokenReserveMBR,
  MAX_GUILD_PROPOSAL_ACTIONS,
  MinGuildProposalMBR,
  GuildPluginMBR,
  MinGuildProposalActionMbr,
  GuildVoteMBR,
  GuildProposalStatusApproved,
  GuildProposalStatusDraft,
  GuildProposalStatusExecuted,
  GuildProposalStatusInvalid,
  GuildProposalStatusRejected,
  GuildProposalStatusVoting,
  GuildStateDraft,
  GuildStateFullyInitialized,
  GuildStatePartiallyInitialized,
} from './constants'
import {
  errGuildCreatorOnly,
  errGuildDraftOnly,
  errGuildFactoryOnly,
  errGuildFeeAssetChanged,
  errGuildInvalidAction,
  errGuildInvalidAdmin,
  errGuildInvalidAsset,
  errGuildInvalidConsensus,
  errGuildInvalidConsensusAction,
  errGuildInvalidPayment,
  errGuildInvalidProposal,
  errGuildPayerOnly,
  errGuildInvalidProposalState,
  errGuildInvalidVersion,
  errGuildInvalidWallet,
  errGuildInvalidWalletFactory,
  errGuildLockout,
  errGuildNoGovernancePower,
  errGuildNotActive,
  errGuildPluginSetLocked,
  errGuildTooManyActions,
  errGuildWalletAlreadySet,
  errGuildWalletRequired,
} from './errors'
import type {
  GuildBaseConfig,
  GuildActionType,
  GuildConsensusBallot,
  GuildConsensusRequirements,
  GuildExecutionMetadata,
  GuildPluginKey,
  GuildProposal,
  GuildProposalAction,
  GuildProposalAddAllowances,
  GuildProposalAddNamedPlugin,
  GuildProposalAddPlugin,
  GuildProposalChangeAdmin,
  GuildProposalConsensusActionSettings,
  GuildProposalCostInfo,
  GuildProposalExecution,
  GuildProposalDeleteEscrow,
  GuildProposalNewEscrow,
  GuildProposalReclaim,
  GuildProposalRemoveAllowances,
  GuildProposalRemoveExecution,
  GuildProposalRemoveNamedPlugin,
  GuildProposalRemovePlugin,
  GuildProposalNewWallet,
  GuildProposalSetActionLimit,
  GuildProposalSetFeeAsset,
  GuildProposalSetPluginSettings,
  GuildProposalSetSettings,
  GuildProposalSettings,
  GuildProposalToggleEscrowLock,
  GuildProposalUpgradeApp,
  GuildState,
  GuildVoteType,
} from './types'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../account/contract.algo'
import type { AbstractedAccountFactory } from '../../account/factory.algo'
import type { GuildConsensusBase } from '../consensus/base'
import type { GuildConsensusCreateStub } from '../factory/stubs'
import type { GuildFactoryCreateInterface } from '../interfaces'

/**
 * Generic proposal and ARC-58 execution kernel. Membership, voting, vote
 * storage, and final resolution live in the permanently paired consensus app.
 *
 * Funds model: the Guild application account only ever holds its own minimum
 * balance plus proposer prepayments for proposals that have not reached a
 * terminal outcome (`reserved`). Everything else is returned to whoever paid it
 * or forwarded to the treasury, the Guild's ARC-58 wallet.
 */
@contract({ avmVersion: 13, stateTotals: { globalBytes: GuildNumGlobalBytes, globalUints: GuildNumGlobalUints } })
export class Guild extends Contract implements GuildFactoryCreateInterface {
  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** lifecycle state of the Guild */
  state = GlobalState<GuildState>({ initialValue: GuildStateDraft, key: GuildGlobalStateKeyState })
  /** dedicated consensus application permanently paired with this Guild */
  consensus = GlobalState<Application>({ key: GuildGlobalStateKeyConsensus })
  /** version number of the Guild implementation */
  version = GlobalState<string>({ key: GlobalStateKeyVersion })
  /** account with unrestricted bootstrap authority while the Guild is in draft */
  creator = GlobalState<Account>({ key: GuildGlobalStateKeyCreator })
  /** ARC-58 wallet administered by the Guild */
  wallet = GlobalState<Application>({ key: GuildGlobalStateKeyWallet })
  /** factory used to create and update the ARC-58 wallet */
  walletFactory = GlobalState<Application>({ key: GuildGlobalStateKeyWalletFactory })
  /** maximum number of actions in one proposal */
  proposalActionLimit = GlobalState<uint64>({ key: GuildGlobalStateKeyProposalActionLimit })
  /** next proposal ID */
  proposalID = GlobalState<uint64>({ initialValue: 1, key: GuildGlobalStateKeyProposalID })
  /** whether plugin additions and removals are permanently disabled */
  pluginSetLocked = GlobalState<boolean>({ initialValue: false, key: GuildGlobalStateKeyPluginSetLocked })
  /**
   * Proposer prepayments held in free balance for proposals that have not reached a terminal
   * outcome. Proposal boxes are already locked as minimum balance and are therefore excluded.
   */
  reserved = GlobalState<uint64>({ initialValue: 0, key: GuildGlobalStateKeyReserved })
  /** settings for Guild or managed application upgrades */
  upgradeAppProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyUpgradeAppProposalSettings })
  /** settings for adding ARC-58 plugins */
  addPluginProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyAddPluginProposalSettings })
  /** settings for removing ARC-58 execution keys */
  removeExecutionProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyRemoveExecutionProposalSettings })
  /** settings for removing ARC-58 plugins */
  removePluginProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyRemovePluginProposalSettings })
  /** settings for adding ARC-58 escrow allowances */
  addAllowancesProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyAddAllowancesProposalSettings })
  /** settings for removing ARC-58 escrow allowances */
  removeAllowancesProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyRemoveAllowancesProposalSettings })
  /** settings for creating ARC-58 escrows */
  newEscrowProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyNewEscrowProposalSettings })
  /** settings for locking, unlocking, and reclaiming ARC-58 escrows */
  toggleEscrowLockProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyToggleEscrowLockProposalSettings })
  /** settings for changing the Guild itself */
  updateGuildProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyUpdateGuildProposalSettings })
  /** asset new proposals pay their fees in; 0 = ALGO. Proposal storage is always paid in ALGO. */
  feeAsset = GlobalState<uint64>({ initialValue: 0, key: GuildGlobalStateKeyFeeAsset })

  // BOXES ----------------------------------------------------------------------------------------

  /** execution-proposal settings attached to installed ARC-58 plugins */
  plugins = BoxMap<GuildPluginKey, GuildProposalSettings>({ keyPrefix: GuildBoxPrefixPlugins })
  /** proposals keyed by proposal ID */
  proposals = BoxMap<uint64, GuildProposal>({ keyPrefix: GuildBoxPrefixProposals })
  /** proposal metadata keyed by ARC-58 execution key */
  executions = BoxMap<bytes<32>, GuildExecutionMetadata>({ keyPrefix: GuildBoxPrefixExecutions })
  /** proposal settings keyed by opaque consensus action code; codes without settings use updateGuild */
  consensusActions = BoxMap<uint64, GuildProposalSettings>({ keyPrefix: GuildBoxPrefixConsensusActions })
  /** fee tokens held for draft proposals, keyed by asset; the Guild's balance above this is sweepable */
  feeTokenReserves = BoxMap<uint64, uint64>({ keyPrefix: GuildBoxPrefixFeeTokenReserves })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(
    version: string,
    creator: Account,
    walletFactory: Application,
    consensus: Application,
    config: GuildBaseConfig,
  ): void {
    loggedAssert(Global.callerApplicationId !== 0, errGuildFactoryOnly)
    loggedAssert(version !== '', errGuildInvalidVersion)
    loggedAssert(consensus.id > 0, errGuildInvalidConsensus)
    loggedAssert(walletFactory.id > 0, errGuildInvalidWalletFactory)
    loggedAssert(
      config.proposalActionLimit > 0 && config.proposalActionLimit <= MAX_GUILD_PROPOSAL_ACTIONS,
      errGuildTooManyActions,
    )

    this.consensus.value = consensus
    this.validateSettings(config.proposalSettings.upgradeApp)
    this.validateSettings(config.proposalSettings.addPlugin)
    this.validateSettings(config.proposalSettings.removeExecution)
    this.validateSettings(config.proposalSettings.removePlugin)
    this.validateSettings(config.proposalSettings.addAllowances)
    this.validateSettings(config.proposalSettings.removeAllowances)
    this.validateSettings(config.proposalSettings.newEscrow)
    this.validateSettings(config.proposalSettings.toggleEscrowLock)
    this.validateSettings(config.proposalSettings.updateGuild)

    this.version.value = version
    this.creator.value = creator
    this.proposalActionLimit.value = config.proposalActionLimit
    this.upgradeAppProposalSettings.value = clone(config.proposalSettings.upgradeApp)
    this.addPluginProposalSettings.value = clone(config.proposalSettings.addPlugin)
    this.removeExecutionProposalSettings.value = clone(config.proposalSettings.removeExecution)
    this.removePluginProposalSettings.value = clone(config.proposalSettings.removePlugin)
    this.addAllowancesProposalSettings.value = clone(config.proposalSettings.addAllowances)
    this.removeAllowancesProposalSettings.value = clone(config.proposalSettings.removeAllowances)
    this.newEscrowProposalSettings.value = clone(config.proposalSettings.newEscrow)
    this.toggleEscrowLockProposalSettings.value = clone(config.proposalSettings.toggleEscrowLock)
    this.updateGuildProposalSettings.value = clone(config.proposalSettings.updateGuild)
    this.walletFactory.value = walletFactory
  }

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private requireCreatorDraft(): void {
    loggedAssert(this.state.value === GuildStateDraft, errGuildDraftOnly)
    loggedAssert(Txn.sender === this.creator.value, errGuildCreatorOnly)
  }

  private validateSettings(settings: GuildProposalSettings): void {
    abiCall<typeof GuildConsensusBase.prototype.validateSettings>({
      appId: this.consensus.value,
      args: [settings],
    })
  }

  private validateWallet(wallet: Application): void {
    loggedAssert(wallet.id > 0, errGuildInvalidWallet)
    const admin = abiCall<typeof AbstractedAccount.prototype.arc58_getAdmin>({ appId: wallet }).returnValue
    loggedAssert(admin === Global.currentApplicationAddress, errGuildInvalidWallet)
  }

  private requireWallet(): void {
    loggedAssert(this.wallet.hasValue, errGuildWalletRequired)
    this.validateWallet(this.wallet.value)
  }

  /** The account that holds Guild funds: the wallet's controlled address, or the wallet app itself. */
  private treasury(): Account {
    const [controlled, exists] = op.AppGlobal.getExBytes(
      this.wallet.value,
      Bytes(AbstractAccountGlobalStateKeysControlledAddress),
    )
    return exists ? Account(controlled) : this.wallet.value.address
  }

  private pay(receiver: Account, amount: uint64): void {
    if (amount > 0) {
      itxn.payment({ receiver, amount, fee: 0 }).submit()
    }
  }

  /** A closed (zero-balance) account cannot receive less than the base minimum balance. */
  private canReceive(receiver: Account, amount: uint64): boolean {
    const [, funded] = op.AcctParams.acctBalance(receiver)
    return funded || amount >= Global.minBalance
  }

  /**
   * Refund a payer. An account that has since closed and that `amount` cannot re-open forfeits the
   * refund to the treasury; without a wallet it stays in free balance, where sweep() forwards it later.
   * A refund can therefore never block finalization, execution, cleanup, or a committed upgrade group.
   */
  private refund(receiver: Account, amount: uint64): void {
    if (amount === 0) {
      return
    }
    if (this.canReceive(receiver, amount)) {
      itxn.payment({ receiver, amount, fee: 0 }).submit()
    } else if (this.wallet.hasValue) {
      const treasury = this.treasury()
      if (this.canReceive(treasury, amount)) {
        itxn.payment({ receiver: treasury, amount, fee: 0 }).submit()
      }
    }
  }

  /** Balance above the application's own minimum balance requirement. */
  private freeBalance(): uint64 {
    const balance = Global.currentApplicationAddress.balance
    const minimum = Global.currentApplicationAddress.minBalance
    return balance > minimum ? balance - minimum : 0
  }

  /** Fees belong to the treasury; without a wallet they wait in free balance for sweep(). */
  private forwardFee(fee: uint64): void {
    if (fee > 0 && this.wallet.hasValue) {
      this.pay(this.treasury(), fee)
    }
  }

  /** The part of a proposal's fee paid in microALGO; it is included in `total`. */
  private algoFee(cost: GuildProposalCostInfo): uint64 {
    return cost.feeAsset === 0 ? cost.fee : 0
  }

  /** The part of a proposal's fee paid in the Guild's fee asset; it is not included in `total`. */
  private tokenFee(cost: GuildProposalCostInfo): uint64 {
    return cost.feeAsset === 0 ? 0 : cost.fee
  }

  private requireAsset(asset: uint64): void {
    const [, exists] = op.AssetParams.assetCreator(asset)
    loggedAssert(exists, errGuildInvalidAsset)
  }

  private sendTokens(receiver: Account, asset: uint64, amount: uint64): void {
    itxn.assetTransfer({ assetReceiver: receiver, xferAsset: asset, assetAmount: amount, fee: 0 }).submit()
  }

  /** Fee tokens belong to the treasury; while it cannot hold them they wait here for sweepFeeTokens(). */
  private forwardTokenFee(asset: uint64, amount: uint64): void {
    if (amount > 0 && this.wallet.hasValue) {
      const treasury = this.treasury()
      if (treasury.isOptedIn(Asset(asset))) {
        this.sendTokens(treasury, asset, amount)
      }
    }
  }

  /** Refund fee tokens. A payer that has opted out of the asset forfeits them to the treasury. */
  private refundTokens(receiver: Account, asset: uint64, amount: uint64): void {
    if (amount === 0) {
      return
    }
    if (receiver.isOptedIn(Asset(asset))) {
      this.sendTokens(receiver, asset, amount)
    } else {
      this.forwardTokenFee(asset, amount)
    }
  }

  private reserveTokens(asset: uint64, amount: uint64): void {
    if (amount > 0) {
      this.feeTokenReserves(asset).value += amount
    }
  }

  private releaseTokens(asset: uint64, amount: uint64): void {
    if (amount > 0) {
      this.feeTokenReserves(asset).value -= amount
    }
  }

  /** What starting to charge fees in `asset` costs now: the Guild's opt-in and reserve box, and the treasury's opt-in. */
  private feeAssetMbr(asset: uint64): uint64 {
    if (asset === 0) {
      return 0
    }
    let mbr: uint64 = 0
    if (!Global.currentApplicationAddress.isOptedIn(Asset(asset))) {
      mbr += Global.assetOptInMinBalance
    }
    if (!this.feeTokenReserves(asset).exists) {
      mbr += GuildFeeTokenReserveMBR
    }
    if (this.wallet.hasValue && !this.treasury().isOptedIn(Asset(asset))) {
      mbr += Global.assetOptInMinBalance
    }
    return mbr
  }

  /** Opt the treasury into `asset` through the Guild's admin rekey; the Guild pays its minimum balance. */
  private optInTreasury(asset: uint64): void {
    const treasury = this.treasury()
    if (treasury.isOptedIn(Asset(asset))) {
      return
    }
    this.pay(treasury, Global.assetOptInMinBalance)
    abiCall<typeof AbstractedAccount.prototype.arc58_rekeyTo>({
      appId: this.wallet.value,
      args: [Global.currentApplicationAddress, false],
    })
    itxn
      .assetTransfer({
        sender: treasury,
        assetReceiver: treasury,
        xferAsset: asset,
        assetAmount: 0,
        rekeyTo: this.wallet.value.address,
        fee: 0,
      })
      .submit()
  }

  /** Charge new proposals' fees in `asset` (0 = ALGO). Drafts keep the asset they were created with. */
  private applyFeeAsset(asset: uint64): void {
    if (asset !== 0) {
      this.requireAsset(asset)
      if (!Global.currentApplicationAddress.isOptedIn(Asset(asset))) {
        this.sendTokens(Global.currentApplicationAddress, asset, 0)
      }
      if (!this.feeTokenReserves(asset).exists) {
        this.feeTokenReserves(asset).value = 0
      }
      if (this.wallet.hasValue) {
        this.optInTreasury(asset)
      }
    }
    this.feeAsset.value = asset
  }

  /** Release the execution reserve held for a proposal, refunding its payer whatever was not consumed. */
  private releaseReserve(proposalID: uint64, payer: Account, held: uint64, spent: uint64): void {
    if (held === 0) {
      return
    }
    this.reserved.value -= held
    this.proposals(proposalID).value.feesPaid = 0
    if (held > spent) {
      this.refund(payer, held - spent)
    }
  }

  /** Whoever funded a Guild-local execution box: the voted proposal's payer, or the bootstrap creator. */
  private executionFunder(proposalID: uint64): Account {
    return this.proposals(proposalID).exists ? this.proposals(proposalID).value.payer : this.creator.value
  }

  /** The consensus app's box key for one vote; the Guild keys a sponsored vote's payer record by it. */
  private voteRecord(proposalID: uint64, voter: Account): bytes {
    return Bytes(GuildConsensusBoxPrefixVotes).concat(op.itob(proposalID)).concat(voter.bytes)
  }

  /** The part of a draft's prepayment that sits in free balance rather than in its own box storage. */
  private draftReserve(feesPaid: uint64, actions: GuildProposalAction[]): uint64 {
    return feesPaid - this.proposalMbr(actions)
  }

  private pluginMbr(escrow: string): uint64 {
    return GuildPluginMBR + BoxCostPerByte * Bytes(escrow).length
  }

  private proposalMbr(actions: GuildProposalAction[]): uint64 {
    let actionBytes: uint64 = 0
    for (let i: uint64 = 0; i < actions.length; i += 1) {
      actionBytes += MinGuildProposalActionMbr + actions[i].data.length
    }
    return MinGuildProposalMBR + BoxCostPerByte * actionBytes
  }

  private consensusActionCode(data: bytes): uint64 {
    loggedAssert(data.length > 0, errGuildInvalidConsensusAction)
    return op.getByte(data, 0)
  }

  private consensusActionMbr(data: bytes): uint64 {
    return abiCall<typeof GuildConsensusCreateStub.prototype.consensusActionMbr>({
      appId: this.consensus.value,
      args: [data],
    }).returnValue
  }

  /** Actions that reconfigure the Guild or its consensus and therefore never need a wallet. */
  private isUpdateGuildAction(type: GuildActionType): boolean {
    const value = type.asUint64()
    return (
      (value >= GuildActionSetProposalSettings.asUint64() && value <= GuildActionSetConsensusActionSettings.asUint64()) ||
      type === GuildActionFullyInitialize ||
      type === GuildActionLockPluginSet ||
      type === GuildActionSetFeeAsset
    )
  }

  /** Every action class whose proposal settings may be changed by governance. */
  private isConfigurableAction(type: GuildActionType): boolean {
    return (
      this.isUpdateGuildAction(type) ||
      type === GuildActionUpgradeApp ||
      type === GuildActionUpdateWallet ||
      type === GuildActionChangeAdmin ||
      type === GuildActionAddPlugin ||
      type === GuildActionAddNamedPlugin ||
      type === GuildActionSetPluginSettings ||
      type === GuildActionRemoveExecution ||
      type === GuildActionRemovePlugin ||
      type === GuildActionRemoveNamedPlugin ||
      type === GuildActionAddAllowances ||
      type === GuildActionRemoveAllowances ||
      type === GuildActionNewEscrow ||
      type === GuildActionToggleEscrowLock ||
      type === GuildActionReclaim ||
      type === GuildActionDeleteEscrow
    )
  }

  /** The current settings of one configurable action class, exactly as SetProposalSettings would write them. */
  private classSettings(type: GuildActionType): GuildProposalSettings {
    if (this.isUpdateGuildAction(type)) {
      return this.updateGuildProposalSettings.value
    }
    switch (type) {
      case GuildActionUpgradeApp:
      case GuildActionUpdateWallet:
      case GuildActionChangeAdmin: {
        return this.upgradeAppProposalSettings.value
      }
      case GuildActionAddPlugin:
      case GuildActionAddNamedPlugin:
      case GuildActionSetPluginSettings: {
        return this.addPluginProposalSettings.value
      }
      case GuildActionRemoveExecution: {
        return this.removeExecutionProposalSettings.value
      }
      case GuildActionRemovePlugin:
      case GuildActionRemoveNamedPlugin: {
        return this.removePluginProposalSettings.value
      }
      case GuildActionAddAllowances: {
        return this.addAllowancesProposalSettings.value
      }
      case GuildActionRemoveAllowances: {
        return this.removeAllowancesProposalSettings.value
      }
      case GuildActionNewEscrow: {
        return this.newEscrowProposalSettings.value
      }
      case GuildActionToggleEscrowLock:
      case GuildActionReclaim:
      case GuildActionDeleteEscrow: {
        return this.toggleEscrowLockProposalSettings.value
      }
      default: {
        loggedErr(errGuildInvalidAction)
      }
    }
  }

  /** Field-by-field strictest of two settings. */
  private strongerSettings(a: GuildProposalSettings, b: GuildProposalSettings): GuildProposalSettings {
    return {
      fee: a.fee > b.fee ? a.fee : b.fee,
      power: a.power > b.power ? a.power : b.power,
      duration: a.duration > b.duration ? a.duration : b.duration,
      participation: a.participation > b.participation ? a.participation : b.participation,
      approval: a.approval > b.approval ? a.approval : b.approval,
      minimumApprovals: a.minimumApprovals > b.minimumApprovals ? a.minimumApprovals : b.minimumApprovals,
    }
  }

  /**
   * Settings that govern one action. Changing the settings of a class requires the stronger of the changing
   * action's own class and the class being changed, so a weaker class can never rewrite a stronger one's rules.
   */
  private getProposalSettings(type: GuildActionType, data: bytes): GuildProposalSettings {
    if (type === GuildActionConsensus) {
      return this.getConsensusActionSettings(this.consensusActionCode(data))
    }
    if (type === GuildActionExecutePlugin) {
      const { plugin, escrow } = decodeArc4<GuildProposalExecution>(data)
      loggedAssert(this.plugins({ plugin, escrow }).exists, errGuildInvalidAction)
      return this.plugins({ plugin, escrow }).value
    }
    if (type === GuildActionSetProposalSettings) {
      const target = decodeArc4<GuildProposalSetSettings>(data).actionType
      // Unconfigurable targets are rejected by validateAction.
      if (this.isConfigurableAction(target)) {
        return this.strongerSettings(this.updateGuildProposalSettings.value, this.classSettings(target))
      }
      return this.updateGuildProposalSettings.value
    }
    if (type === GuildActionSetConsensusActionSettings) {
      const code = decodeArc4<GuildProposalConsensusActionSettings>(data).code
      return this.strongerSettings(this.updateGuildProposalSettings.value, this.getConsensusActionSettings(code))
    }
    if (type === GuildActionSetPluginSettings) {
      const update = decodeArc4<GuildProposalSetPluginSettings>(data)
      const key: GuildPluginKey = { plugin: update.plugin, escrow: update.escrow }
      if (this.plugins(key).exists) {
        return this.strongerSettings(this.addPluginProposalSettings.value, this.plugins(key).value)
      }
      return this.addPluginProposalSettings.value
    }
    return this.classSettings(type)
  }

  /**
   * A voted change may keep or lower an approval requirement, but may raise one only as far as its own
   * ballot met it, so the coalition that passed it can always pass the next change. That holds for the
   * approval minimum and for both ratios: a raised participation needs that turnout on this ballot, and
   * a raised approval ratio needs that share of this ballot's decisive votes. Draft setters (proposal
   * ID 0) and bootstrap proposals run before any ballot exists and are not bounded.
   */
  private requireAttainable(proposalID: uint64, current: GuildProposalSettings, next: GuildProposalSettings): void {
    if (!this.proposals(proposalID).exists || this.proposals(proposalID).value.votingTs === 0) {
      return
    }
    const raisesMinimum = next.minimumApprovals > current.minimumApprovals
    const raisesParticipation = next.participation > current.participation
    const raisesApproval = next.approval > current.approval
    if (!raisesMinimum && !raisesParticipation && !raisesApproval) {
      return
    }
    const { votes, eligiblePower } = this.getBallot(proposalID)
    const decisive: uint64 = votes.approvals + votes.rejections
    loggedAssert(!raisesMinimum || next.minimumApprovals <= votes.approvals, errGuildLockout)
    loggedAssert(
      !raisesParticipation ||
        this.productAtLeast(decisive + votes.abstains, ONE_HUNDRED_PERCENT, eligiblePower, next.participation),
      errGuildLockout,
    )
    loggedAssert(
      !raisesApproval || this.productAtLeast(votes.approvals, ONE_HUNDRED_PERCENT, decisive, next.approval),
      errGuildLockout,
    )
  }

  /** a * b >= c * d, without overflow */
  private productAtLeast(a: uint64, b: uint64, c: uint64, d: uint64): boolean {
    const [ah, al] = op.mulw(a, b)
    const [ch, cl] = op.mulw(c, d)
    return ah > ch || (ah === ch && al >= cl)
  }

  /** Wallet-facing actions need a wallet, except Guild-local plugin settings and execution keys. */
  private requiresWallet(action: GuildProposalAction): boolean {
    if (this.isUpdateGuildAction(action.type) || action.type === GuildActionSetPluginSettings) {
      return false
    }
    if (action.type === GuildActionRemoveExecution) {
      return !this.executions(decodeArc4<GuildProposalRemoveExecution>(action.data).executionKey).exists
    }
    return true
  }

  private validateAction(action: GuildProposalAction): void {
    // Resolving settings also rejects unknown actions and missing execution plugins.
    this.getProposalSettings(action.type, action.data)

    if (this.state.value === GuildStateDraft) {
      // Bootstrap proposals configure the Guild; they may not pre-authorize executions that outlive creator control.
      loggedAssert(
        action.type !== GuildActionUpgradeApp && action.type !== GuildActionExecutePlugin,
        errGuildInvalidAction,
      )
    }

    if (
      action.type === GuildActionAddPlugin ||
      action.type === GuildActionAddNamedPlugin ||
      action.type === GuildActionRemovePlugin ||
      action.type === GuildActionRemoveNamedPlugin
    ) {
      loggedAssert(!this.pluginSetLocked.value, errGuildPluginSetLocked)
    }

    if (this.requiresWallet(action)) {
      this.requireWallet()
    }

    if (action.type === GuildActionAddPlugin) {
      const plugin = decodeArc4<GuildProposalAddPlugin>(action.data)
      this.validatePluginSettings(plugin)
    } else if (action.type === GuildActionAddNamedPlugin) {
      const plugin = decodeArc4<GuildProposalAddNamedPlugin>(action.data)
      this.validatePluginSettings(plugin)
    } else if (action.type === GuildActionSetProposalSettings) {
      const update = decodeArc4<GuildProposalSetSettings>(action.data)
      this.validateSettings(update.settings)
      loggedAssert(this.isConfigurableAction(update.actionType), errGuildInvalidAction)
    } else if (action.type === GuildActionSetProposalActionLimit) {
      const limit = decodeArc4<GuildProposalSetActionLimit>(action.data).limit
      loggedAssert(limit > 0 && limit <= MAX_GUILD_PROPOSAL_ACTIONS, errGuildTooManyActions)
    } else if (action.type === GuildActionSetConsensusActionSettings) {
      this.validateSettings(decodeArc4<GuildProposalConsensusActionSettings>(action.data).settings)
    } else if (action.type === GuildActionSetFeeAsset) {
      const asset = decodeArc4<GuildProposalSetFeeAsset>(action.data).asset
      if (asset !== 0) {
        this.requireAsset(asset)
      }
    } else if (action.type === GuildActionConsensus) {
      // The policy validates its own action against current state and rejects unknown codes.
      this.consensusActionMbr(action.data)
    } else if (action.type === GuildActionChangeAdmin) {
      const admin = decodeArc4<GuildProposalChangeAdmin>(action.data).admin
      loggedAssert(admin !== Global.zeroAddress && admin !== Global.currentApplicationAddress, errGuildInvalidAdmin)
    } else if (action.type === GuildActionSetPluginSettings) {
      const update = decodeArc4<GuildProposalSetPluginSettings>(action.data)
      loggedAssert(this.plugins({ plugin: update.plugin, escrow: update.escrow }).exists, errGuildInvalidAction)
      this.validateSettings(update.settings)
    } else if (action.type === GuildActionUpgradeApp) {
      this.validateUpgrade(decodeArc4<GuildProposalUpgradeApp>(action.data))
    } else if (action.type === GuildActionExecutePlugin) {
      // The wallet's own rule (errExecutionNotReady), checked here so it cannot pass a vote and never execute.
      const execution = decodeArc4<GuildProposalExecution>(action.data)
      loggedAssert(execution.groups.length > 0 && execution.firstValid <= execution.lastValid, errGuildInvalidAction)
    }
  }

  /**
   * A self-upgrade commits to transaction groups. A transaction sent on its own has an all-zero group ID,
   * so a zero entry would commit to nothing: it is never a valid commitment.
   */
  private validateUpgrade(upgrade: GuildProposalUpgradeApp): void {
    loggedAssert(upgrade.app === Global.currentApplicationId.id, errGuildInvalidAction)
    loggedAssert(upgrade.groups.length > 0 && upgrade.firstValid <= upgrade.lastValid, errGuildInvalidAction)
    for (let i: uint64 = 0; i < upgrade.groups.length; i += 1) {
      loggedAssert(upgrade.groups[i] !== op.bzero(32), errGuildInvalidAction)
    }
  }

  private validatePluginSettings(plugin: GuildProposalAddPlugin): void {
    // The wallet's own install rules (errZeroAddressDelegationType, errUsingExecutionKeyRequiresGlobal,
    // ACC-02 errCoverFeesRequiresCaller, errEscrowRequiredToBeSetAsDefault), checked here so a proposal
    // the wallet would refuse can't pass a vote and then sit Approved forever.
    const openCaller = plugin.caller === Global.zeroAddress
    loggedAssert(!(plugin.delegationType === DelegationTypeSelf && openCaller), errGuildInvalidAction)
    loggedAssert(!(plugin.useExecutionKey && !openCaller), errGuildInvalidAction)
    loggedAssert(!(plugin.coverFees && openCaller), errGuildInvalidAction)
    loggedAssert(!(plugin.defaultToEscrow && plugin.escrow === ''), errGuildInvalidAction)
    if (plugin.useExecutionKey) {
      this.validateSettings({
        fee: plugin.fee,
        power: plugin.power,
        duration: plugin.duration,
        participation: plugin.participation,
        approval: plugin.approval,
        minimumApprovals: plugin.minimumApprovals,
      })
    }
  }

  protected validateActions(actions: GuildProposalAction[]): void {
    loggedAssert(actions.length > 0, errGuildInvalidAction)
    loggedAssert(actions.length <= this.proposalActionLimit.value, errGuildTooManyActions)
    this.validateEachAction(actions)
  }

  /** Per-action validation only; a later action-limit change never strands an approved proposal. */
  private validateEachAction(actions: GuildProposalAction[]): void {
    for (let i: uint64 = 0; i < actions.length; i += 1) {
      this.validateAction(actions[i])
    }
  }

  private validEditOrSubmit(proposalID: uint64): boolean {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const { status, creator } = this.proposals(proposalID).value
    return status === GuildProposalStatusDraft && Txn.sender === creator
  }

  private nextProposalID(): uint64 {
    const id = this.proposalID.value
    this.proposalID.value += 1
    return id
  }

  private governancePower(account: Account, evidence: bytes, requiredThrough: uint64): uint64 {
    return abiCall<typeof GuildConsensusCreateStub.prototype.proposalPower>({
      appId: this.consensus.value,
      args: [account, evidence, requiredThrough],
    }).returnValue
  }

  private createOrUpdateProposal(
    id: uint64,
    cid: CID,
    actions: GuildProposalAction[],
    feesPaid: uint64,
    feeTokensPaid: uint64,
    payer: Account,
    feeTokenPayer: Account,
    powerRequired: uint64,
    proposerPower: uint64,
  ): uint64 {
    if (this.state.value === GuildStateDraft) {
      this.requireCreatorDraft()
      id = this.nextProposalID()
      this.proposals(id).value = {
        status: GuildProposalStatusApproved,
        cid,
        creator: Txn.sender,
        payer,
        feeTokenPayer,
        votingTs: 0,
        created: Global.latestTimestamp,
        feesPaid,
        feeAsset: this.feeAsset.value,
        feeTokensPaid,
        actions: clone(actions),
      }
      return id
    }

    loggedAssert(proposerPower >= powerRequired, errGuildNoGovernancePower)
    let created: uint64 = 0
    if (id === 0) {
      id = this.nextProposalID()
      created = Global.latestTimestamp
    } else {
      created = this.proposals(id).value.created
    }

    this.proposals(id).value = {
      status: GuildProposalStatusDraft,
      cid,
      creator: Txn.sender,
      payer,
      feeTokenPayer,
      votingTs: 0,
      created,
      feesPaid,
      feeAsset: this.feeAsset.value,
      feeTokensPaid,
      actions: clone(actions),
    }
    return id
  }

  private activate(partial: boolean): void {
    this.requireCreatorDraft()
    if (!partial) {
      this.requireWallet()
    }
    abiCall<typeof GuildConsensusCreateStub.prototype.validateActivation>({ appId: this.consensus.value })
    this.state.value = partial ? GuildStatePartiallyInitialized : GuildStateFullyInitialized
  }

  private setSettingsForAction(type: GuildActionType, settings: GuildProposalSettings, proposalID: uint64): void {
    this.validateSettings(settings)
    this.requireAttainable(proposalID, this.classSettings(type), settings)
    if (this.isUpdateGuildAction(type)) {
      this.updateGuildProposalSettings.value = clone(settings)
      return
    }
    switch (type) {
      case GuildActionUpgradeApp:
      case GuildActionUpdateWallet:
      case GuildActionChangeAdmin:
        this.upgradeAppProposalSettings.value = clone(settings)
        break
      case GuildActionAddPlugin:
      case GuildActionAddNamedPlugin:
      case GuildActionSetPluginSettings:
        this.addPluginProposalSettings.value = clone(settings)
        break
      case GuildActionRemoveExecution:
        this.removeExecutionProposalSettings.value = clone(settings)
        break
      case GuildActionRemovePlugin:
      case GuildActionRemoveNamedPlugin:
        this.removePluginProposalSettings.value = clone(settings)
        break
      case GuildActionAddAllowances:
        this.addAllowancesProposalSettings.value = clone(settings)
        break
      case GuildActionRemoveAllowances:
        this.removeAllowancesProposalSettings.value = clone(settings)
        break
      case GuildActionNewEscrow:
        this.newEscrowProposalSettings.value = clone(settings)
        break
      case GuildActionToggleEscrowLock:
      case GuildActionReclaim:
      case GuildActionDeleteEscrow:
        this.toggleEscrowLockProposalSettings.value = clone(settings)
        break
      default:
        loggedErr(errGuildInvalidAction)
    }
  }

  private addPlugin(data: GuildProposalAddNamedPlugin): void {
    loggedAssert(!this.pluginSetLocked.value, errGuildPluginSetLocked)
    const plugin = clone(data)
    const escrowKey = plugin.defaultToEscrow ? '' : plugin.escrow
    if (plugin.useExecutionKey && plugin.caller === Global.zeroAddress) {
      this.plugins({ plugin: plugin.plugin, escrow: escrowKey }).value = {
        fee: plugin.fee,
        power: plugin.power,
        duration: plugin.duration,
        participation: plugin.participation,
        approval: plugin.approval,
        minimumApprovals: plugin.minimumApprovals,
      }
    }

    if (plugin.name !== '') {
      abiCall<typeof AbstractedAccount.prototype.arc58_addNamedPlugin>({
        appId: this.wallet.value,
        args: [
          plugin.name,
          plugin.plugin,
          plugin.caller,
          plugin.escrow,
          false,
          plugin.delegationType,
          plugin.lastValid,
          plugin.cooldown,
          plugin.methods,
          plugin.useRounds,
          plugin.useExecutionKey,
          plugin.coverFees,
          false,
          plugin.defaultToEscrow,
        ],
      })
    } else {
      abiCall<typeof AbstractedAccount.prototype.arc58_addPlugin>({
        appId: this.wallet.value,
        args: [
          plugin.plugin,
          plugin.caller,
          plugin.escrow,
          false,
          plugin.delegationType,
          plugin.lastValid,
          plugin.cooldown,
          plugin.methods,
          plugin.useRounds,
          plugin.useExecutionKey,
          plugin.coverFees,
          false,
          plugin.defaultToEscrow,
        ],
      })
    }

    if (plugin.escrow !== '' && plugin.allowances.length > 0) {
      abiCall<typeof AbstractedAccount.prototype.arc58_addAllowances>({
        appId: this.wallet.value,
        args: [plugin.escrow, plugin.allowances],
      })
    }
  }

  private removePlugin(data: GuildProposalRemoveNamedPlugin): void {
    loggedAssert(!this.pluginSetLocked.value, errGuildPluginSetLocked)
    if (data.name !== '') {
      const key = abiCall<typeof AbstractedAccount.prototype.arc58_getNamedPluginKey>({
        appId: this.wallet.value,
        args: [data.name],
      }).returnValue
      loggedAssert(key.plugin === data.plugin && key.caller === data.caller && key.escrow === data.escrow, errGuildInvalidAction)
    }
    if (data.caller === Global.zeroAddress && this.plugins({ plugin: data.plugin, escrow: data.escrow }).exists) {
      this.plugins({ plugin: data.plugin, escrow: data.escrow }).delete()
      // The released storage was funded when the plugin was installed, not by this proposal.
      this.forwardFee(this.pluginMbr(data.escrow))
    }
    if (data.name !== '') {
      abiCall<typeof AbstractedAccount.prototype.arc58_removeNamedPlugin>({
        appId: this.wallet.value,
        args: [data.name],
      })
    } else {
      abiCall<typeof AbstractedAccount.prototype.arc58_removePlugin>({
        appId: this.wallet.value,
        args: [data.plugin, data.caller, data.escrow],
      })
    }
  }

  /**
   * Create a fresh ARC-58 wallet administered by this Guild. The Guild never adopts an existing wallet,
   * so no domain key, revocation app, plugin, or execution key predates its administration.
   */
  private createWallet(nickname: string, salt: bytes<32>): uint64 {
    loggedAssert(!this.wallet.hasValue, errGuildWalletAlreadySet)
    const walletFactory = this.walletFactory.value
    // Resolve the factory cost before beginning the newAccount inner transaction group.
    // setupCost() performs an ABI call, which cannot run while an itxn group is open.
    const cost = this.setupCost()
    const walletID = abiCall<typeof AbstractedAccountFactory.prototype.newAccount>({
      appId: walletFactory,
      args: [
        itxn.payment({ receiver: walletFactory.address, amount: cost }),
        Global.zeroAddress,
        Global.currentApplicationAddress,
        nickname,
        Global.zeroAddress,
        salt,
        '',
        // No automatic updates: only the Guild's UpdateWallet action may push wallet code.
        false,
        0,
        [],
        [],
      ],
    }).returnValue

    this.wallet.value = Application(walletID)
    if (this.feeAsset.value !== 0) {
      this.optInTreasury(this.feeAsset.value)
    }
    return walletID
  }

  // GUILD CONFIGURATION METHODS ------------------------------------------------------------------

  /** Return the MBR required by the paired consensus implementation for an opaque draft configuration. */
  @abimethod({ readonly: true })
  consensusConfigurationMbr(config: bytes): uint64 {
    return abiCall<typeof GuildConsensusCreateStub.prototype.configurationMbr>({
      appId: this.consensus.value,
      args: [config],
    }).returnValue
  }

  /** Forward opaque draft configuration to the paired consensus implementation. */
  configureConsensus(mbrPayment: gtxn.PaymentTxn, config: bytes): void {
    this.requireCreatorDraft()
    const amount = this.consensusConfigurationMbr(config)
    loggedAssert(
      match(mbrPayment, {
        receiver: Global.currentApplicationAddress,
        amount,
      }),
      errGuildInvalidPayment,
    )
    const before = Global.currentApplicationAddress.balance
    abiCall<typeof GuildConsensusCreateStub.prototype.configure>({
      appId: this.consensus.value,
      args: [itxn.payment({ receiver: this.consensus.value.address, amount, fee: 0 }), config],
    })
    // Storage the policy did not need comes back here; return it to whoever paid it.
    const after = Global.currentApplicationAddress.balance
    this.refund(mbrPayment.sender, after + amount > before ? after + amount - before : 0)
  }

  /** Create the Guild's ARC-58 wallet through its configured wallet factory. */
  setup(nickname: string, salt: bytes<32>): uint64 {
    this.requireCreatorDraft()
    return this.createWallet(nickname, salt)
  }

  /** Update one action class's proposal settings while the Guild remains in draft. */
  setProposalSettings(actionType: GuildActionType, settings: GuildProposalSettings): void {
    this.requireCreatorDraft()
    this.setSettingsForAction(actionType, settings, 0)
  }

  /** Attach proposal settings to one opaque consensus action code while the Guild remains in draft. */
  setConsensusActionSettings(code: uint64, settings: GuildProposalSettings): void {
    this.requireCreatorDraft()
    this.validateSettings(settings)
    this.consensusActions(code).value = clone(settings)
  }

  /** Update the maximum proposal action count while the Guild remains in draft. */
  setProposalActionLimit(limit: uint64): void {
    this.requireCreatorDraft()
    loggedAssert(limit > 0 && limit <= MAX_GUILD_PROPOSAL_ACTIONS, errGuildTooManyActions)
    this.proposalActionLimit.value = limit
  }

  /**
   * Charge new proposals' fees in `asset` (0 = ALGO) while the Guild remains in draft. The payment covers
   * `feeAssetCost(asset)`: the Guild's and the treasury's opt-ins and the Guild's fee token reserve box.
   */
  setFeeAsset(mbrPayment: gtxn.PaymentTxn, asset: uint64): void {
    this.requireCreatorDraft()
    loggedAssert(
      match(mbrPayment, {
        receiver: Global.currentApplicationAddress,
        amount: this.feeAssetMbr(asset),
      }),
      errGuildInvalidPayment,
    )
    this.applyFeeAsset(asset)
  }

  /** Permanently prevent this Guild from adding or removing ARC-58 plugins. */
  lockPluginSet(): void {
    this.requireCreatorDraft()
    this.pluginSetLocked.value = true
  }

  /** End creator control while allowing consensus to attach the ARC-58 wallet later. */
  partiallyInitialize(): void {
    this.activate(true)
  }

  /** End creator control and require the Guild's ARC-58 wallet to be configured. */
  initialize(): void {
    this.activate(false)
  }

  // GUILD METHODS --------------------------------------------------------------------------------

  /** Create a proposal after the paired consensus app verifies proposer power. A fee due in a fee asset needs `newProposalWithFeeAsset`. */
  newProposal(payment: gtxn.PaymentTxn, cid: CID, actions: GuildProposalAction[], evidence: bytes): uint64 {
    return this.draftProposal(payment, Txn.sender, 0, cid, actions, evidence)
  }

  /**
   * Create a proposal whose fee is due in the Guild's fee asset: `payment` covers the ALGO storage and
   * `feePayment` the fee, both to the Guild.
   */
  newProposalWithFeeAsset(
    payment: gtxn.PaymentTxn,
    feePayment: gtxn.AssetTransferTxn,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
  ): uint64 {
    loggedAssert(this.feeAsset.value !== 0, errGuildInvalidPayment)
    this.requireTokenPayment(feePayment, this.feeAsset.value, this.tokenFee(this.proposalCost(actions)))
    return this.draftProposal(payment, feePayment.sender, feePayment.assetAmount, cid, actions, evidence)
  }

  private requireTokenPayment(feePayment: gtxn.AssetTransferTxn, asset: uint64, amount: uint64): void {
    loggedAssert(
      match(feePayment, {
        assetSender: Global.zeroAddress,
        assetReceiver: Global.currentApplicationAddress,
        xferAsset: Asset(asset),
        assetAmount: amount,
        assetCloseTo: Global.zeroAddress,
        rekeyTo: Global.zeroAddress,
      }),
      errGuildInvalidPayment,
    )
  }

  /**
   * `payment` and the fee asset payment may each come from anyone. Whoever paid is recorded on the
   * proposal and gets every refund of what they paid; with nothing paid the proposer is recorded.
   */
  private draftProposal(
    payment: gtxn.PaymentTxn,
    tokenPayer: Account,
    tokensPaid: uint64,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
  ): uint64 {
    const cost = this.proposalCost(actions)
    const bootstrap = this.state.value === GuildStateDraft
    const fee: uint64 = bootstrap ? 0 : cost.total
    loggedAssert(tokensPaid === this.tokenFee(cost), errGuildInvalidPayment)
    loggedAssert(
      match(payment, {
        receiver: Global.currentApplicationAddress,
        amount: fee,
      }),
      errGuildInvalidPayment,
    )
    this.validateActions(actions)
    const proposerPower: uint64 = bootstrap
      ? 0
      : this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration)
    const id = this.createOrUpdateProposal(
      0,
      cid,
      actions,
      fee,
      tokensPaid,
      fee > 0 ? payment.sender : Txn.sender,
      tokensPaid > 0 ? tokenPayer : Txn.sender,
      cost.power,
      proposerPower,
    )
    if (!bootstrap) {
      this.reserved.value += this.draftReserve(fee, actions)
      this.reserveTokens(cost.feeAsset, tokensPaid)
    }
    return id
  }

  /** A draft pays its fee in the asset it was created with; once the Guild changes asset it can only be deleted. */
  private requireCurrentFeeAsset(proposal: GuildProposal): void {
    loggedAssert(proposal.feeAsset === this.feeAsset.value, errGuildFeeAssetChanged)
  }

  /** Edit a draft proposal without adding funding. */
  editProposal(id: uint64, cid: CID, actions: GuildProposalAction[], evidence: bytes): void {
    loggedAssert(this.validEditOrSubmit(id), errGuildInvalidProposalState)
    const previous = clone(this.proposals(id).value)
    this.requireCurrentFeeAsset(previous)
    const cost = this.proposalCost(actions)
    loggedAssert(cost.total <= previous.feesPaid && this.tokenFee(cost) <= previous.feeTokensPaid, errGuildInvalidPayment)
    this.validateActions(actions)
    const proposerPower = this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration)
    this.createOrUpdateProposal(
      id,
      cid,
      actions,
      previous.feesPaid,
      previous.feeTokensPaid,
      previous.payer,
      previous.feeTokenPayer,
      cost.power,
      proposerPower,
    )
    this.reserved.value =
      this.reserved.value + this.draftReserve(previous.feesPaid, actions) - this.draftReserve(previous.feesPaid, previous.actions)
  }

  /**
   * Edit a draft proposal and fund its increased storage, ballot MBR, or ALGO action fees.
   *
   * A proposal has one payer, so its refunds never have to be split: the top-up comes from the account
   * that funded the draft, which need not be the proposer.
   */
  editProposalWithPayment(
    payment: gtxn.PaymentTxn,
    id: uint64,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
  ): void {
    loggedAssert(this.validEditOrSubmit(id), errGuildInvalidProposalState)
    const previous = clone(this.proposals(id).value)
    this.requireCurrentFeeAsset(previous)
    const cost = this.proposalCost(actions)
    loggedAssert(cost.total > previous.feesPaid && this.tokenFee(cost) <= previous.feeTokensPaid, errGuildInvalidPayment)
    loggedAssert(payment.sender === previous.payer, errGuildPayerOnly)
    loggedAssert(
      match(payment, {
        receiver: Global.currentApplicationAddress,
        amount: cost.total - previous.feesPaid,
      }),
      errGuildInvalidPayment,
    )
    this.validateActions(actions)
    const proposerPower = this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration)
    this.createOrUpdateProposal(
      id,
      cid,
      actions,
      cost.total,
      previous.feeTokensPaid,
      previous.payer,
      previous.feeTokenPayer,
      cost.power,
      proposerPower,
    )
    this.reserved.value =
      this.reserved.value + this.draftReserve(cost.total, actions) - this.draftReserve(previous.feesPaid, previous.actions)
  }

  /**
   * Edit a draft proposal whose fee in the Guild's fee asset rose. `payment` funds any ALGO increase
   * (it may be zero) and `feePayment` the fee increase.
   *
   * Each top-up comes from the account that paid that part of the draft. A draft that held no fee in
   * the fee asset yet takes the sender of `feePayment` as its fee token payer.
   */
  editProposalWithFeeAsset(
    payment: gtxn.PaymentTxn,
    feePayment: gtxn.AssetTransferTxn,
    id: uint64,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
  ): void {
    loggedAssert(this.validEditOrSubmit(id), errGuildInvalidProposalState)
    const previous = clone(this.proposals(id).value)
    this.requireCurrentFeeAsset(previous)
    const cost = this.proposalCost(actions)
    const tokenFee = this.tokenFee(cost)
    loggedAssert(tokenFee > previous.feeTokensPaid, errGuildInvalidPayment)
    loggedAssert(previous.feeTokensPaid === 0 || feePayment.sender === previous.feeTokenPayer, errGuildPayerOnly)
    this.requireTokenPayment(feePayment, previous.feeAsset, tokenFee - previous.feeTokensPaid)
    const feesPaid: uint64 = cost.total > previous.feesPaid ? cost.total : previous.feesPaid
    loggedAssert(feesPaid === previous.feesPaid || payment.sender === previous.payer, errGuildPayerOnly)
    loggedAssert(
      match(payment, {
        receiver: Global.currentApplicationAddress,
        amount: feesPaid - previous.feesPaid,
      }),
      errGuildInvalidPayment,
    )
    this.validateActions(actions)
    const proposerPower = this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration)
    this.createOrUpdateProposal(
      id,
      cid,
      actions,
      feesPaid,
      tokenFee,
      previous.payer,
      feePayment.sender,
      cost.power,
      proposerPower,
    )
    this.reserved.value =
      this.reserved.value + this.draftReserve(feesPaid, actions) - this.draftReserve(previous.feesPaid, previous.actions)
    this.reserveTokens(previous.feeAsset, tokenFee - previous.feeTokensPaid)
  }

  /**
   * Delete a never-submitted draft or any bootstrap proposal as its creator.
   *
   * Drafts refund the full prepayment, each part in the currency it was paid in and to the account that
   * paid it; bootstrap proposals, which the Guild funded from creator-provided balance, refund the
   * storage they release to the creator.
   */
  deleteProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const proposal = clone(this.proposals(proposalID).value)
    const bootstrap =
      proposal.votingTs === 0 &&
      (proposal.status === GuildProposalStatusApproved || proposal.status === GuildProposalStatusExecuted)
    loggedAssert(proposal.status === GuildProposalStatusDraft || bootstrap, errGuildInvalidProposalState)
    loggedAssert(Txn.sender === proposal.creator, errGuildCreatorOnly)

    // Read before the box is deleted below.
    const payer = proposal.payer
    const feeTokenPayer = proposal.feeTokenPayer
    const feeAsset = proposal.feeAsset
    let refund: uint64 = proposal.feesPaid
    let tokenRefund: uint64 = 0
    if (bootstrap) {
      refund = this.proposalMbr(proposal.actions)
    } else {
      this.reserved.value -= this.draftReserve(proposal.feesPaid, proposal.actions)
      tokenRefund = proposal.feeTokensPaid
      this.releaseTokens(feeAsset, tokenRefund)
    }
    // Deleting the box releases its storage, which covers the box share of the refund.
    this.proposals(proposalID).delete()
    this.refund(payer, refund)
    this.refundTokens(feeTokenPayer, feeAsset, tokenRefund)
  }

  /** Move a proposal created under Guild consensus from draft to voting. */
  submitProposal(proposalID: uint64, evidence: bytes): void {
    loggedAssert(this.state.value !== GuildStateDraft, errGuildNotActive)
    loggedAssert(this.validEditOrSubmit(proposalID), errGuildInvalidProposalState)
    const proposal = clone(this.proposals(proposalID).value)
    this.requireCurrentFeeAsset(proposal)
    const cost = this.proposalCost(proposal.actions)
    const tokenFee = this.tokenFee(cost)
    loggedAssert(proposal.feesPaid >= cost.total && proposal.feeTokensPaid >= tokenFee, errGuildInvalidPayment)
    loggedAssert(
      this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration) >= cost.power,
      errGuildNoGovernancePower,
    )
    const requirements: GuildConsensusRequirements = {
      participation: cost.participation,
      approval: cost.approval,
      minimumApprovals: cost.minimumApprovals,
    }
    const ballotMbr = abiCall<typeof GuildConsensusBase.prototype.ballotMbr>({ appId: this.consensus.value, args: [] }).returnValue
    abiCall<typeof GuildConsensusCreateStub.prototype.openProposal>({
      appId: this.consensus.value,
      args: [
        itxn.payment({
          receiver: this.consensus.value.address,
          amount: ballotMbr,
          fee: 0,
        }),
        proposalID,
        Global.latestTimestamp + cost.duration,
        requirements,
      ],
    })

    // Settle the prepayment: the proposal box stays as permanent history, the ballot is funded,
    // fees go to the treasury, and only the execution reserve stays held for this proposal.
    const algoFee = this.algoFee(cost)
    const held: uint64 = cost.total - (this.proposalMbr(proposal.actions) + ballotMbr + algoFee)
    const surplus: uint64 = proposal.feesPaid - cost.total
    this.reserved.value -= ballotMbr + algoFee + surplus
    this.releaseTokens(proposal.feeAsset, proposal.feeTokensPaid)
    this.proposals(proposalID).value.feesPaid = held
    this.proposals(proposalID).value.feeTokensPaid = 0
    this.proposals(proposalID).value.votingTs = Global.latestTimestamp
    this.proposals(proposalID).value.status = GuildProposalStatusVoting
    this.refund(proposal.payer, surplus)
    this.refundTokens(proposal.feeTokenPayer, proposal.feeAsset, proposal.feeTokensPaid - tokenFee)
    this.forwardFee(algoFee)
    this.forwardTokenFee(proposal.feeAsset, tokenFee)
  }

  /**
   * Vote through the Guild while its consensus app calculates and stores the result. Voting again changes
   * the vote; only a first vote pays for its receipt (see `voteCost`).
   *
   * Anyone may pay for the receipt. A payer other than the voter adds `PayerRecordMBR`, so the Guild
   * can remember them, and gets both back when the receipt is cleaned up.
   */
  voteProposal(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    loggedAssert(
      this.proposals(proposalID).value.status === GuildProposalStatusVoting,
      errGuildInvalidProposalState,
    )
    const cost = this.nextVoteCost(proposalID, Txn.sender)
    const sponsor: uint64 = cost > 0 ? sponsorCost(mbrPayment.sender, Txn.sender) : 0
    loggedAssert(
      match(mbrPayment, {
        receiver: Global.currentApplicationAddress,
        amount: cost + sponsor,
      }),
      errGuildInvalidPayment,
    )
    if (sponsor > 0) {
      recordPayer(this.voteRecord(proposalID, Txn.sender), mbrPayment.sender, Txn.sender)
    }
    abiCall<typeof GuildConsensusCreateStub.prototype.vote>({
      appId: this.consensus.value,
      args: [
        itxn.payment({
          receiver: this.consensus.value.address,
          amount: cost,
          fee: 0,
        }),
        Txn.sender,
        proposalID,
        vote,
        evidence,
      ],
    })
  }

  private nextVoteCost(proposalID: uint64, voter: Account): uint64 {
    const voted = abiCall<typeof GuildConsensusCreateStub.prototype.hasVoted>({
      appId: this.consensus.value,
      args: [proposalID, voter],
    }).returnValue
    return voted ? 0 : GuildVoteMBR
  }

  /** Resolve the proposal using the result returned by the paired consensus app. */
  finalizeProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const proposal = clone(this.proposals(proposalID).value)
    loggedAssert(proposal.status === GuildProposalStatusVoting, errGuildInvalidProposalState)
    const result = abiCall<typeof GuildConsensusCreateStub.prototype.resolveProposal>({
      appId: this.consensus.value,
      args: [proposalID],
    }).returnValue
    if (result.approved) {
      this.proposals(proposalID).value.status = GuildProposalStatusApproved
    } else {
      this.proposals(proposalID).value.status = GuildProposalStatusRejected
      // A rejected proposal never executes; return its execution reserve to whoever paid it.
      this.releaseReserve(proposalID, proposal.payer, proposal.feesPaid, 0)
    }
  }

  /**
   * Reclaim terminal consensus boxes without deleting the historical Guild proposal.
   *
   * Every listed vote receipt's storage returns to whoever paid it, the voter unless someone else
   * funded the vote; the ballot storage returns to the proposal's payer.
   * Approved ballots stay until execution or cancellation, since policies read the approving
   * ballot while applying consensus actions.
   */
  cleanupProposalConsensus(proposalID: uint64, voters: Account[]): uint64 {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const { status, payer } = this.proposals(proposalID).value
    loggedAssert(
      status === GuildProposalStatusRejected ||
        status === GuildProposalStatusExecuted ||
        status === GuildProposalStatusInvalid,
      errGuildInvalidProposalState,
    )
    const before = Global.currentApplicationAddress.balance
    const remaining = abiCall<typeof GuildConsensusBase.prototype.cleanupBallot>({
      appId: this.consensus.value,
      args: [proposalID, voters],
    }).returnValue
    const after = Global.currentApplicationAddress.balance
    const received: uint64 = after > before ? after - before : 0
    let distributed: uint64 = 0
    for (let i: uint64 = 0; i < voters.length; i += 1) {
      const votePayer = releasePayer(this.voteRecord(proposalID, voters[i]), voters[i])
      this.refund(votePayer, GuildVoteMBR + sponsorCost(votePayer, voters[i]))
      distributed += GuildVoteMBR
    }
    if (received > distributed) {
      this.refund(payer, received - distributed)
    }
    return remaining
  }

  /**
   * Abandon an approved proposal that has not executed, refunding its execution reserve.
   *
   * Approved proposals never expire, and state changes after approval can leave one permanently
   * unexecutable; cancellation is the proposer's way to return the prepaid reserve to its payer.
   */
  cancelProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const proposal = clone(this.proposals(proposalID).value)
    loggedAssert(proposal.status === GuildProposalStatusApproved && proposal.votingTs !== 0, errGuildInvalidProposalState)
    loggedAssert(Txn.sender === proposal.creator, errGuildCreatorOnly)
    this.proposals(proposalID).value.status = GuildProposalStatusInvalid
    this.releaseReserve(proposalID, proposal.payer, proposal.feesPaid, 0)
  }

  /** Execute every action in an approved proposal. */
  executeProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const proposal = clone(this.proposals(proposalID).value)
    loggedAssert(proposal.status === GuildProposalStatusApproved, errGuildInvalidProposalState)

    // Creator-approved bootstrap proposals expire the moment creator control ends, and only the creator runs them.
    if (proposal.votingTs === 0) {
      this.requireCreatorDraft()
    }

    // The action count was checked when the proposal was drafted; only the actions themselves are re-checked.
    this.validateEachAction(proposal.actions)
    this.proposals(proposalID).value.status = GuildProposalStatusExecuted
    const held = proposal.feesPaid
    const freeBefore = this.freeBalance()

    for (let i: uint64 = 0; i < proposal.actions.length; i += 1) {
      const { type, data } = proposal.actions[i]
      switch (type) {
        case GuildActionUpgradeApp: {
          const action = decodeArc4<GuildProposalUpgradeApp>(data)
          this.validateUpgrade(action)
          loggedAssert(!this.executions(action.executionKey).exists, errGuildInvalidAction)
          this.executions(action.executionKey).value = { proposalID, index: i }
          break
        }
        case GuildActionExecutePlugin: {
          const action = decodeArc4<GuildProposalExecution>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_addExecutionKey>({
            appId: this.wallet.value,
            args: [action.executionKey, action.groups, action.firstValid, action.lastValid],
          })
          break
        }
        case GuildActionRemoveExecution: {
          const action = decodeArc4<GuildProposalRemoveExecution>(data)
          if (this.executions(action.executionKey).exists) {
            const funder = this.executionFunder(this.executions(action.executionKey).value.proposalID)
            this.executions(action.executionKey).delete()
            this.refund(funder, GuildExecutionMBR)
          } else {
            abiCall<typeof AbstractedAccount.prototype.arc58_removeExecutionKey>({
              appId: this.wallet.value,
              args: [action.executionKey],
            })
          }
          break
        }
        case GuildActionAddPlugin:
          this.addPlugin({ name: '', ...decodeArc4<GuildProposalAddPlugin>(data) })
          break
        case GuildActionAddNamedPlugin:
          this.addPlugin(decodeArc4<GuildProposalAddNamedPlugin>(data))
          break
        case GuildActionRemovePlugin:
          this.removePlugin({ name: '', ...decodeArc4<GuildProposalRemovePlugin>(data) })
          break
        case GuildActionRemoveNamedPlugin:
          this.removePlugin(decodeArc4<GuildProposalRemoveNamedPlugin>(data))
          break
        case GuildActionSetPluginSettings: {
          const action = decodeArc4<GuildProposalSetPluginSettings>(data)
          // An earlier action in this proposal may have removed the plugin; never re-create its policy.
          loggedAssert(this.plugins({ plugin: action.plugin, escrow: action.escrow }).exists, errGuildInvalidAction)
          this.plugins({ plugin: action.plugin, escrow: action.escrow }).value = clone(action.settings)
          break
        }
        case GuildActionAddAllowances: {
          const action = decodeArc4<GuildProposalAddAllowances>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_addAllowances>({
            appId: this.wallet.value,
            args: [action.escrow, action.allowances],
          })
          break
        }
        case GuildActionRemoveAllowances: {
          const action = decodeArc4<GuildProposalRemoveAllowances>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_removeAllowances>({
            appId: this.wallet.value,
            args: [action.escrow, action.assets],
          })
          break
        }
        case GuildActionNewEscrow: {
          const action = decodeArc4<GuildProposalNewEscrow>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_newEscrow>({
            appId: this.wallet.value,
            args: [action.escrow, action.address],
          })
          break
        }
        case GuildActionToggleEscrowLock: {
          const action = decodeArc4<GuildProposalToggleEscrowLock>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_toggleEscrowLock>({
            appId: this.wallet.value,
            args: [action.escrow],
          })
          break
        }
        case GuildActionReclaim: {
          const action = decodeArc4<GuildProposalReclaim>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_reclaim>({
            appId: this.wallet.value,
            args: [action.escrow, action.reclaims],
          })
          break
        }
        case GuildActionDeleteEscrow: {
          // The wallet refuses while a plugin or an allowance still names the escrow or it holds an asset.
          const action = decodeArc4<GuildProposalDeleteEscrow>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_deleteEscrow>({
            appId: this.wallet.value,
            args: [action.escrow],
          })
          break
        }
        case GuildActionSetProposalSettings: {
          const action = decodeArc4<GuildProposalSetSettings>(data)
          this.setSettingsForAction(action.actionType, action.settings, proposalID)
          break
        }
        case GuildActionSetProposalActionLimit:
          this.proposalActionLimit.value = decodeArc4<GuildProposalSetActionLimit>(data).limit
          break
        case GuildActionNewWallet: {
          const action = decodeArc4<GuildProposalNewWallet>(data)
          this.createWallet(action.nickname, action.salt)
          break
        }
        case GuildActionConsensus: {
          const amount = this.consensusActionMbr(data)
          abiCall<typeof GuildConsensusCreateStub.prototype.applyConsensusAction>({
            appId: this.consensus.value,
            args: [itxn.payment({ receiver: this.consensus.value.address, amount, fee: 0 }), proposalID, data],
          })
          break
        }
        case GuildActionSetConsensusActionSettings: {
          const action = decodeArc4<GuildProposalConsensusActionSettings>(data)
          this.validateSettings(action.settings)
          this.requireAttainable(proposalID, this.getConsensusActionSettings(action.code), action.settings)
          this.consensusActions(action.code).value = clone(action.settings)
          break
        }
        case GuildActionUpdateWallet:
          loggedAssert(this.walletFactory.hasValue, errGuildInvalidWalletFactory)
          abiCall<typeof AbstractedAccountFactory.prototype.updateWallet>({
            appId: this.walletFactory.value,
            args: [this.wallet.value],
          })
          break
        case GuildActionChangeAdmin: {
          // Hand the treasury to another administrator and free the slot so a new wallet can be attached.
          const action = decodeArc4<GuildProposalChangeAdmin>(data)
          abiCall<typeof AbstractedAccount.prototype.arc58_changeAdmin>({
            appId: this.wallet.value,
            args: [action.admin],
          })
          this.wallet.delete()
          break
        }
        case GuildActionFullyInitialize:
          loggedAssert(this.state.value === GuildStatePartiallyInitialized, errGuildInvalidProposalState)
          this.requireWallet()
          this.state.value = GuildStateFullyInitialized
          break
        case GuildActionLockPluginSet:
          this.pluginSetLocked.value = true
          break
        case GuildActionSetFeeAsset:
          this.applyFeeAsset(decodeArc4<GuildProposalSetFeeAsset>(data).asset)
          break
        default:
          loggedErr(errGuildInvalidAction)
      }
    }

    // Settle with the payer: whatever the execution did not consume from their reserve, plus any
    // storage a policy handed back during execution, goes to them rather than staying in the Guild.
    const freeAfter = this.freeBalance()
    if (proposal.votingTs !== 0) {
      // A voted proposal may only spend its own reserve, never other proposers' funds or the treasury's.
      loggedAssert(freeAfter + held >= freeBefore, errGuildInvalidPayment)
    }
    const baseline: uint64 = freeBefore > held ? freeBefore - held : 0
    const refund: uint64 = freeAfter > baseline ? freeAfter - baseline : 0
    if (held > 0) {
      this.reserved.value -= held
      this.proposals(proposalID).value.feesPaid = 0
    }
    this.refund(proposal.payer, refund)
  }

  /** Active upgrades consume a voted transaction-group commitment, including exact program bytes and version. */
  @abimethod({ allowActions: ['UpdateApplication'] })
  update(newVersion: string): void {
    if (this.state.value === GuildStateDraft) {
      loggedAssert(Global.callerApplicationAddress === Global.creatorAddress, errGuildFactoryOnly)
    } else {
      loggedAssert(this.executions(Txn.lease).exists, errGuildInvalidAction)
      const metadata = clone(this.executions(Txn.lease).value)
      const proposal = clone(this.proposals(metadata.proposalID).value)
      loggedAssert(proposal.status === GuildProposalStatusExecuted, errGuildInvalidProposalState)
      const action = clone(proposal.actions[metadata.index])
      loggedAssert(action.type === GuildActionUpgradeApp, errGuildInvalidAction)
      const upgrade = decodeArc4<GuildProposalUpgradeApp>(action.data)
      loggedAssert(upgrade.app === Global.currentApplicationId.id && upgrade.executionKey === Txn.lease, errGuildInvalidAction)
      loggedAssert(Global.round >= upgrade.firstValid && Global.round <= upgrade.lastValid, errGuildInvalidAction)
      // An ungrouped call has no group ID to commit to.
      loggedAssert(Global.groupId !== op.bzero(32), errGuildInvalidAction)
      let approvedGroup = false
      for (let i: uint64 = 0; i < upgrade.groups.length; i += 1) {
        if (upgrade.groups[i] === Global.groupId) {
          approvedGroup = true
        }
      }
      loggedAssert(approvedGroup, errGuildInvalidAction)
      this.executions(Txn.lease).delete()
      this.refund(proposal.payer, GuildExecutionMBR)
    }
    loggedAssert(newVersion !== '', errGuildInvalidVersion)
    this.version.value = newVersion
  }

  /**
   * Forward every microALGO that is not the Guild's own storage or a proposer's reserve to the treasury.
   *
   * Anyone may call this once the Guild is active; in draft only the creator may, since the
   * creator funds draft storage from this balance.
   */
  sweep(): uint64 {
    loggedAssert(this.state.value !== GuildStateDraft || Txn.sender === this.creator.value, errGuildCreatorOnly)
    this.requireWallet()
    const free = this.freeBalance()
    const amount: uint64 = free > this.reserved.value ? free - this.reserved.value : 0
    this.pay(this.treasury(), amount)
    return amount
  }

  /**
   * Forward fee tokens of `asset` that no draft proposal holds to the treasury, once it is opted in.
   * Fees wait here while the Guild has no wallet or its treasury cannot hold the asset.
   */
  sweepFeeTokens(asset: uint64): uint64 {
    loggedAssert(this.state.value !== GuildStateDraft || Txn.sender === this.creator.value, errGuildCreatorOnly)
    this.requireWallet()
    const amount = this.sweepableFeeTokens(asset)
    loggedAssert(amount === 0 || this.treasury().isOptedIn(Asset(asset)), errGuildInvalidAsset)
    this.forwardTokenFee(asset, amount)
    return amount
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /** Return what `setFeeAsset(asset)` must pay now: the opt-ins and fee token reserve box it still needs. */
  @abimethod({ readonly: true })
  feeAssetCost(asset: uint64): uint64 {
    return this.feeAssetMbr(asset)
  }

  /** Return the `asset` balance sweepFeeTokens() would forward to the treasury right now. */
  @abimethod({ readonly: true })
  sweepableFeeTokens(asset: uint64): uint64 {
    const [balance, optedIn] = op.AssetHolding.assetBalance(Global.currentApplicationAddress, asset)
    if (!optedIn) {
      return 0
    }
    const held: uint64 = this.feeTokenReserves(asset).exists ? this.feeTokenReserves(asset).value : 0
    return balance > held ? balance - held : 0
  }

  /** Return the funding required to create the Guild's ARC-58 wallet. */
  @abimethod({ readonly: true })
  setupCost(): uint64 {
    return abiCall<typeof AbstractedAccountFactory.prototype.cost>({ appId: this.walletFactory.value }).returnValue
  }

  /** Return proposal cost and the strictest consensus settings among all actions. */
  @abimethod({ readonly: true })
  proposalCost(actions: GuildProposalAction[]): GuildProposalCostInfo {
    const ballotMbr = abiCall<typeof GuildConsensusBase.prototype.ballotMbr>({ appId: this.consensus.value, args: [] }).returnValue
    let mbr: uint64 = this.proposalMbr(actions) + ballotMbr
    const info: GuildProposalCostInfo = {
      total: 0,
      mbr: 0,
      fee: 0,
      power: 0,
      duration: 0,
      participation: 0,
      approval: 0,
      minimumApprovals: 0,
      feeAsset: this.feeAsset.value,
    }

    for (let i: uint64 = 0; i < actions.length; i += 1) {
      const action = clone(actions[i])
      const settings = this.getProposalSettings(action.type, action.data)
      info.total += settings.fee
      info.fee += settings.fee

      if (action.type === GuildActionUpgradeApp) {
        mbr += GuildExecutionMBR
      } else if (action.type === GuildActionNewWallet) {
        mbr += this.setupCost()
        if (this.feeAsset.value !== 0) {
          mbr += Global.assetOptInMinBalance
        }
      } else if (action.type === GuildActionSetFeeAsset) {
        // The most it can cost; execution refunds what an existing opt-in or reserve box saves.
        if (decodeArc4<GuildProposalSetFeeAsset>(action.data).asset !== 0) {
          mbr += 2 * Global.assetOptInMinBalance + GuildFeeTokenReserveMBR
        }
      } else if (action.type === GuildActionAddPlugin) {
        const plugin = decodeArc4<GuildProposalAddPlugin>(action.data)
        if (plugin.useExecutionKey && plugin.caller === Global.zeroAddress) {
          mbr += this.pluginMbr(plugin.defaultToEscrow ? '' : plugin.escrow)
        }
      } else if (action.type === GuildActionAddNamedPlugin) {
        const plugin = decodeArc4<GuildProposalAddNamedPlugin>(action.data)
        if (plugin.useExecutionKey && plugin.caller === Global.zeroAddress) {
          mbr += this.pluginMbr(plugin.defaultToEscrow ? '' : plugin.escrow)
        }
      } else if (action.type === GuildActionConsensus) {
        mbr += this.consensusActionMbr(action.data)
      } else if (action.type === GuildActionSetConsensusActionSettings) {
        const code = decodeArc4<GuildProposalConsensusActionSettings>(action.data).code
        if (!this.consensusActions(code).exists) {
          mbr += GuildConsensusActionSettingsMBR
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
      if (settings.minimumApprovals > info.minimumApprovals) {
        info.minimumApprovals = settings.minimumApprovals
      }
    }

    info.mbr = mbr
    info.total = mbr + this.algoFee(info)

    if (this.state.value === GuildStateDraft && Txn.sender === this.creator.value) {
      info.total = 0
      info.fee = 0
    }
    return info
  }

  /** Return a proposal by ID. */
  @abimethod({ readonly: true })
  getProposal(proposalID: uint64): GuildProposal {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    return this.proposals(proposalID).value
  }

  /** Return the consensus ballot for a Guild proposal. */
  @abimethod({ readonly: true })
  getBallot(proposalID: uint64): GuildConsensusBallot {
    return abiCall<typeof GuildConsensusBase.prototype.getBallot>({
      appId: this.consensus.value,
      args: [proposalID],
    }).returnValue
  }

  /** Return proposal metadata associated with an ARC-58 execution key. */
  @abimethod({ readonly: true })
  mustGetExecution(lease: bytes<32>): GuildExecutionMetadata {
    loggedAssert(this.executions(lease).exists, errGuildInvalidAction)
    return this.executions(lease).value
  }

  /** Return the settings that govern one opaque consensus action code. */
  @abimethod({ readonly: true })
  getConsensusActionSettings(code: uint64): GuildProposalSettings {
    if (this.consensusActions(code).exists) {
      return this.consensusActions(code).value
    }
    return this.updateGuildProposalSettings.value
  }

  /**
   * What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free.
   * A payer other than the voter adds `PayerRecordMBR` to a first vote.
   */
  @abimethod({ readonly: true })
  voteCost(proposalID: uint64, voter: Account): uint64 {
    return this.nextVoteCost(proposalID, voter)
  }

  /** Return the minimum-balance payment required to store one vote. */
  @abimethod({ readonly: true })
  voteMbr(): uint64 {
    return abiCall<typeof GuildConsensusBase.prototype.voteMbr>({ appId: this.consensus.value }).returnValue
  }

  /** Return the balance sweep() would forward to the treasury right now. */
  @abimethod({ readonly: true })
  sweepable(): uint64 {
    const free = this.freeBalance()
    return free > this.reserved.value ? free - this.reserved.value : 0
  }

  /** Return whether proposals may still add or remove wallet plugins. */
  @abimethod({ readonly: true })
  canChangePluginSet(): boolean {
    return !this.pluginSetLocked.value
  }

  opUp(): void {}
}
