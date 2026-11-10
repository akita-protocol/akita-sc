import {
  Account,
  Application,
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
import { BoxCostPerByte } from '../../../utils/constants'
import type { CID } from '../../../utils/types/base'
import { AbstractAccountGlobalStateKeysControlledAddress } from '../../account/constants'
import {
  GuildActionAddAllowances,
  GuildActionAddNamedPlugin,
  GuildActionAddPlugin,
  GuildActionChangeAdmin,
  GuildActionConsensus,
  GuildActionExecutePlugin,
  GuildActionFullyInitialize,
  GuildActionLockPluginSet,
  GuildActionNewEscrow,
  GuildActionReclaim,
  GuildActionRemoveAllowances,
  GuildActionRemoveExecution,
  GuildActionRemoveNamedPlugin,
  GuildActionRemovePlugin,
  GuildActionSetConsensusActionSettings,
  GuildActionSetProposalActionLimit,
  GuildActionSetPluginSettings,
  GuildActionSetProposalSettings,
  GuildActionNewWallet,
  GuildActionToggleEscrowLock,
  GuildActionUpdateWallet,
  GuildActionUpgradeApp,
  GuildBoxPrefixConsensusActions,
  GuildBoxPrefixExecutions,
  GuildBoxPrefixPlugins,
  GuildBoxPrefixProposals,
  GuildConsensusActionSettingsMBR,
  GuildGlobalStateKeyConsensus,
  GuildGlobalStateKeyAddAllowancesProposalSettings,
  GuildGlobalStateKeyAddPluginProposalSettings,
  GuildGlobalStateKeyCreator,
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
  errGuildInvalidAction,
  errGuildInvalidAdmin,
  errGuildInvalidConsensus,
  errGuildInvalidConsensusAction,
  errGuildInvalidPayment,
  errGuildInvalidProposal,
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
  GuildProposalNewEscrow,
  GuildProposalReclaim,
  GuildProposalRemoveAllowances,
  GuildProposalRemoveExecution,
  GuildProposalRemoveNamedPlugin,
  GuildProposalRemovePlugin,
  GuildProposalNewWallet,
  GuildProposalSetActionLimit,
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

  // BOXES ----------------------------------------------------------------------------------------

  /** execution-proposal settings attached to installed ARC-58 plugins */
  plugins = BoxMap<GuildPluginKey, GuildProposalSettings>({ keyPrefix: GuildBoxPrefixPlugins })
  /** proposals keyed by proposal ID */
  proposals = BoxMap<uint64, GuildProposal>({ keyPrefix: GuildBoxPrefixProposals })
  /** proposal metadata keyed by ARC-58 execution key */
  executions = BoxMap<bytes<32>, GuildExecutionMetadata>({ keyPrefix: GuildBoxPrefixExecutions })
  /** proposal settings keyed by opaque consensus action code; codes without settings use updateGuild */
  consensusActions = BoxMap<uint64, GuildProposalSettings>({ keyPrefix: GuildBoxPrefixConsensusActions })

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

  /** Release the execution reserve held for a proposal, refunding whatever was not consumed. */
  private releaseReserve(proposalID: uint64, creator: Account, held: uint64, spent: uint64): void {
    if (held === 0) {
      return
    }
    this.reserved.value -= held
    this.proposals(proposalID).value.feesPaid = 0
    if (held > spent) {
      this.refund(creator, held - spent)
    }
  }

  /** Whoever funded a Guild-local execution box: the voted proposal's creator, or the bootstrap creator. */
  private executionFunder(proposalID: uint64): Account {
    return this.proposals(proposalID).exists ? this.proposals(proposalID).value.creator : this.creator.value
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
      type === GuildActionLockPluginSet
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
      type === GuildActionReclaim
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
      case GuildActionReclaim: {
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
   * A voted change may keep or lower an approval minimum, but may raise it only to the approvals its own
   * ballot demonstrated, so the coalition that passed it can always pass the next change. Draft setters
   * (proposal ID 0) and bootstrap proposals run before any ballot exists and are not bounded.
   */
  private requireAttainableMinimum(proposalID: uint64, current: uint64, next: uint64): void {
    if (next <= current || !this.proposals(proposalID).exists || this.proposals(proposalID).value.votingTs === 0) {
      return
    }
    loggedAssert(next <= this.getBallot(proposalID).votes.approvals, errGuildLockout)
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
    }
  }

  private validatePluginSettings(plugin: GuildProposalAddPlugin): void {
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
        votingTs: 0,
        created: Global.latestTimestamp,
        feesPaid,
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
      votingTs: 0,
      created,
      feesPaid,
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
    this.requireAttainableMinimum(proposalID, this.classSettings(type).minimumApprovals, settings.minimumApprovals)
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
        sender: Txn.sender,
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
    // Storage the policy did not need comes back here; return it to the creator who paid it.
    const after = Global.currentApplicationAddress.balance
    this.refund(Txn.sender, after + amount > before ? after + amount - before : 0)
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

  /** Create a proposal after the paired consensus app verifies proposer power. */
  newProposal(payment: gtxn.PaymentTxn, cid: CID, actions: GuildProposalAction[], evidence: bytes): uint64 {
    const cost = this.proposalCost(actions)
    const bootstrap = this.state.value === GuildStateDraft
    const fee: uint64 = bootstrap ? 0 : cost.total
    loggedAssert(
      match(payment, {
        sender: Txn.sender,
        receiver: Global.currentApplicationAddress,
        amount: fee,
      }),
      errGuildInvalidPayment,
    )
    this.validateActions(actions)
    const proposerPower: uint64 = bootstrap
      ? 0
      : this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration)
    const id = this.createOrUpdateProposal(0, cid, actions, fee, cost.power, proposerPower)
    if (!bootstrap) {
      this.reserved.value += this.draftReserve(fee, actions)
    }
    return id
  }

  /** Edit a draft proposal without adding funding. */
  editProposal(id: uint64, cid: CID, actions: GuildProposalAction[], evidence: bytes): void {
    loggedAssert(this.validEditOrSubmit(id), errGuildInvalidProposalState)
    const previous = clone(this.proposals(id).value)
    const cost = this.proposalCost(actions)
    loggedAssert(cost.total <= previous.feesPaid, errGuildInvalidPayment)
    this.validateActions(actions)
    const proposerPower = this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration)
    this.createOrUpdateProposal(id, cid, actions, previous.feesPaid, cost.power, proposerPower)
    this.reserved.value =
      this.reserved.value + this.draftReserve(previous.feesPaid, actions) - this.draftReserve(previous.feesPaid, previous.actions)
  }

  /** Edit a draft proposal and fund its increased storage, ballot MBR, or action fees. */
  editProposalWithPayment(
    payment: gtxn.PaymentTxn,
    id: uint64,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
  ): void {
    loggedAssert(this.validEditOrSubmit(id), errGuildInvalidProposalState)
    const previous = clone(this.proposals(id).value)
    const cost = this.proposalCost(actions)
    loggedAssert(cost.total > previous.feesPaid, errGuildInvalidPayment)
    loggedAssert(
      match(payment, {
        sender: Txn.sender,
        receiver: Global.currentApplicationAddress,
        amount: cost.total - previous.feesPaid,
      }),
      errGuildInvalidPayment,
    )
    this.validateActions(actions)
    const proposerPower = this.governancePower(Txn.sender, evidence, Global.latestTimestamp + cost.duration)
    this.createOrUpdateProposal(id, cid, actions, cost.total, cost.power, proposerPower)
    this.reserved.value =
      this.reserved.value + this.draftReserve(cost.total, actions) - this.draftReserve(previous.feesPaid, previous.actions)
  }

  /**
   * Delete a never-submitted draft or any bootstrap proposal as its creator.
   *
   * Drafts refund the full prepayment; bootstrap proposals, which the Guild funded from
   * creator-provided balance, refund the storage they release.
   */
  deleteProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const proposal = clone(this.proposals(proposalID).value)
    const bootstrap =
      proposal.votingTs === 0 &&
      (proposal.status === GuildProposalStatusApproved || proposal.status === GuildProposalStatusExecuted)
    loggedAssert(proposal.status === GuildProposalStatusDraft || bootstrap, errGuildInvalidProposalState)
    loggedAssert(Txn.sender === proposal.creator, errGuildCreatorOnly)

    let refund: uint64 = proposal.feesPaid
    if (bootstrap) {
      refund = this.proposalMbr(proposal.actions)
    } else {
      this.reserved.value -= this.draftReserve(proposal.feesPaid, proposal.actions)
    }
    // Deleting the box releases its storage, which covers the box share of the refund.
    this.proposals(proposalID).delete()
    this.refund(proposal.creator, refund)
  }

  /** Move a proposal created under Guild consensus from draft to voting. */
  submitProposal(proposalID: uint64, evidence: bytes): void {
    loggedAssert(this.state.value !== GuildStateDraft, errGuildNotActive)
    loggedAssert(this.validEditOrSubmit(proposalID), errGuildInvalidProposalState)
    const proposal = clone(this.proposals(proposalID).value)
    const cost = this.proposalCost(proposal.actions)
    loggedAssert(proposal.feesPaid >= cost.total, errGuildInvalidPayment)
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
    const held: uint64 = cost.total - (this.proposalMbr(proposal.actions) + ballotMbr + cost.fee)
    const surplus: uint64 = proposal.feesPaid - cost.total
    this.reserved.value -= ballotMbr + cost.fee + surplus
    this.proposals(proposalID).value.feesPaid = held
    this.proposals(proposalID).value.votingTs = Global.latestTimestamp
    this.proposals(proposalID).value.status = GuildProposalStatusVoting
    this.refund(proposal.creator, surplus)
    this.forwardFee(cost.fee)
  }

  /**
   * Vote through the Guild while its consensus app calculates and stores the result. Voting again changes
   * the vote; only a first vote pays for its receipt (see `voteCost`).
   */
  voteProposal(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    loggedAssert(
      this.proposals(proposalID).value.status === GuildProposalStatusVoting,
      errGuildInvalidProposalState,
    )
    const cost = this.nextVoteCost(proposalID, Txn.sender)
    loggedAssert(
      match(mbrPayment, {
        sender: Txn.sender,
        receiver: Global.currentApplicationAddress,
        amount: cost,
      }),
      errGuildInvalidPayment,
    )
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
      // A rejected proposal never executes; return its execution reserve to the proposer.
      this.releaseReserve(proposalID, proposal.creator, proposal.feesPaid, 0)
    }
  }

  /**
   * Reclaim terminal consensus boxes without deleting the historical Guild proposal.
   *
   * Every listed voter recovers their own vote receipt; the ballot storage returns to the proposer.
   * Approved ballots stay until execution or cancellation, since policies read the approving
   * ballot while applying consensus actions.
   */
  cleanupProposalConsensus(proposalID: uint64, voters: Account[]): uint64 {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const { status, creator } = this.proposals(proposalID).value
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
      this.refund(voters[i], GuildVoteMBR)
      distributed += GuildVoteMBR
    }
    if (received > distributed) {
      this.refund(creator, received - distributed)
    }
    return remaining
  }

  /**
   * Abandon an approved proposal that has not executed, refunding its execution reserve.
   *
   * Approved proposals never expire, and state changes after approval can leave one permanently
   * unexecutable; cancellation is the proposer's way to recover the reserve they prepaid.
   */
  cancelProposal(proposalID: uint64): void {
    loggedAssert(this.proposals(proposalID).exists, errGuildInvalidProposal)
    const proposal = clone(this.proposals(proposalID).value)
    loggedAssert(proposal.status === GuildProposalStatusApproved && proposal.votingTs !== 0, errGuildInvalidProposalState)
    loggedAssert(Txn.sender === proposal.creator, errGuildCreatorOnly)
    this.proposals(proposalID).value.status = GuildProposalStatusInvalid
    this.releaseReserve(proposalID, proposal.creator, proposal.feesPaid, 0)
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
          loggedAssert(action.app === Global.currentApplicationId.id, errGuildInvalidAction)
          loggedAssert(!this.executions(action.executionKey).exists, errGuildInvalidAction)
          loggedAssert(action.groups.length > 0 && action.firstValid <= action.lastValid, errGuildInvalidAction)
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
          this.requireAttainableMinimum(
            proposalID,
            this.getConsensusActionSettings(action.code).minimumApprovals,
            action.settings.minimumApprovals,
          )
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
        default:
          loggedErr(errGuildInvalidAction)
      }
    }

    // Settle with the proposer: whatever the execution did not consume from their reserve, plus any
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
    this.refund(proposal.creator, refund)
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
      let approvedGroup = false
      for (let i: uint64 = 0; i < upgrade.groups.length; i += 1) {
        if (upgrade.groups[i] === Global.groupId) {
          approvedGroup = true
        }
      }
      loggedAssert(approvedGroup, errGuildInvalidAction)
      this.executions(Txn.lease).delete()
      this.refund(proposal.creator, GuildExecutionMBR)
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

  // READ ONLY METHODS ----------------------------------------------------------------------------

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
    info.total = mbr + info.fee

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

  /** What `voter`'s next vote on the proposal pays: a first vote funds its receipt; changing a vote is free. */
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
