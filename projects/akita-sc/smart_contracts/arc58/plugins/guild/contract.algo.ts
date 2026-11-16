import {
  Account,
  Application,
  bytes,
  Bytes,
  Contract,
  GlobalState,
  itxn,
  loggedAssert,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { bzero } from '@algorandfoundation/algorand-typescript/op'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { getControlledSpendingAccount, rekeyAddress } from '../../../utils/functions'
import type { CID } from '../../../utils/types/base'
import type {
  GuildBaseConfig,
  GuildDeployment,
  GuildActionType,
  GuildProposalAction,
  GuildProposalSettings,
  GuildVoteType,
} from '../../guilds/core/types'
import { errGuildCostLimitExceeded, errGuildNotFromFactory } from './errors'

// CONTRACT IMPORTS
import type { Guild } from '../../guilds/core/contract.algo'
import type { GuildFactory } from '../../guilds/factory/contract.algo'

/** What `createGuild` made: the Guild, its consensus and its treasury wallet */
export type GuildCreated = {
  guild: uint64
  consensus: uint64
  wallet: uint64
}

/**
 * ARC-58 adapter for creating, configuring, and participating in Guilds.
 *
 * Each participating adapter is bound to one Guild and its factory. A separate
 * creation-only adapter can mint Guilds but cannot participate in them.
 *
 * Every method that pays takes `maxCost`: the most the wallet may pay the factory or the Guild in that
 * call, quoted when the call was built. The amounts themselves are read at execution from apps the wallet
 * does not control (Akita DAO sets creation fees, a Guild's own governance sets its proposal fees and
 * can upgrade the Guild), so a price that moved after the call was built or approved fails the call
 * instead of being paid.
 */
export class GuildPlugin extends Contract {
  factory = GlobalState<Application>({ key: 'factory' })
  /** A zero target is a creation-only adapter; every other instance is permanently scoped to one Guild. */
  guild = GlobalState<Application>({ key: 'guild' })

  @abimethod({ onCreate: 'require' })
  create(factory: Application, guild: Application): void {
    loggedAssert(factory.id > 0, errGuildNotFromFactory)
    if (guild.id > 0) {
      loggedAssert(guild.creator === factory.address, errGuildNotFromFactory)
    }
    this.factory.value = factory
    this.guild.value = guild
  }

  /**
   * A bound adapter acts only on its Guild. The unbound (shared) adapter acts on any Guild its factory
   * created: the Guild itself enforces who may do what (creator-only while a draft, members afterwards).
   */
  private requireGuild(guild: Application): void {
    loggedAssert(guild.id > 0, errGuildNotFromFactory)
    if (this.guild.value.id > 0) {
      loggedAssert(guild === this.guild.value, errGuildNotFromFactory)
    }
    loggedAssert(guild.creator === this.factory.value.address, errGuildNotFromFactory)
  }

  /** The wallet never pays more than the caller quoted when the call was built. */
  private requireWithinQuote(cost: uint64, maxCost: uint64): void {
    loggedAssert(cost <= maxCost, errGuildCostLimitExceeded)
  }

  // FACTORY AND DRAFT CONFIGURATION -------------------------------------------------------------

  newGuild(
    wallet: Application,
    rekeyBack: boolean,
    consensusName: string,
    baseConfig: GuildBaseConfig,
    governanceConfig: bytes,
    maxCost: uint64,
  ): GuildDeployment {
    loggedAssert(this.guild.value.id === 0, errGuildNotFromFactory)
    const sender = getControlledSpendingAccount(wallet)

    const cost = abiCall<typeof GuildFactory.prototype.cost>({
      sender,
      appId: this.factory.value,
      args: [consensusName],
    }).returnValue
    this.requireWithinQuote(cost, maxCost)

    const deployment = abiCall<typeof GuildFactory.prototype.newGuild>({
      sender,
      appId: this.factory.value,
      args: [
        itxn.payment({
          sender,
          receiver: this.factory.value.address,
          amount: cost,
        }),
        consensusName,
        baseConfig,
        governanceConfig,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
    return deployment
  }

  /**
   * Create a Guild and make it ready in one call (shared adapter only): create the Guild and its consensus
   * through the factory, configure the consensus draft (e.g. a fixed-signer member list), set up the
   * treasury wallet, fund it with `funding`, and, when `actions` is not empty, propose and execute them as
   * the creator's instant draft proposal (e.g. AddPlugin grants on the treasury). New app IDs pass from step
   * to step here, so the caller names none of them; only the last inner transaction hands the wallet back.
   *
   * `maxCost` covers everything the call pays except `funding`: the factory's cost, the consensus
   * configuration storage, the treasury wallet's creation cost and the draft proposal's storage.
   */
  createGuild(
    wallet: Application,
    rekeyBack: boolean,
    consensusName: string,
    baseConfig: GuildBaseConfig,
    governanceConfig: bytes,
    consensusConfig: bytes,
    nickname: string,
    salt: bytes<32>,
    funding: uint64,
    actions: GuildProposalAction[],
    maxCost: uint64,
  ): GuildCreated {
    loggedAssert(this.guild.value.id === 0, errGuildNotFromFactory)
    const sender = getControlledSpendingAccount(wallet)

    const cost = abiCall<typeof GuildFactory.prototype.cost>({
      sender,
      appId: this.factory.value,
      args: [consensusName],
    }).returnValue
    this.requireWithinQuote(cost, maxCost)
    const deployment = abiCall<typeof GuildFactory.prototype.newGuild>({
      sender,
      appId: this.factory.value,
      args: [
        itxn.payment({ sender, receiver: this.factory.value.address, amount: cost }),
        consensusName,
        baseConfig,
        governanceConfig,
      ],
    }).returnValue
    const guild = deployment.guild

    const configurationMbr = abiCall<typeof Guild.prototype.consensusConfigurationMbr>({
      sender,
      appId: guild,
      args: [consensusConfig],
    }).returnValue
    this.requireWithinQuote(cost + configurationMbr, maxCost)
    abiCall<typeof Guild.prototype.configureConsensus>({
      sender,
      appId: guild,
      args: [itxn.payment({ sender, receiver: guild.address, amount: configurationMbr }), consensusConfig],
    })

    const setupCost = abiCall<typeof Guild.prototype.setupCost>({ sender, appId: guild }).returnValue
    this.requireWithinQuote(cost + configurationMbr + setupCost, maxCost)
    itxn.payment({ sender, receiver: guild.address, amount: setupCost }).submit()
    const treasury = Application(
      abiCall<typeof Guild.prototype.setup>({ sender, appId: guild, args: [nickname, salt] }).returnValue,
    )

    // fund the treasury first: AddPlugin grants are stored on it
    if (funding > 0) {
      itxn.payment({ sender, receiver: treasury.address, amount: funding }).submit()
    }

    if (actions.length > 0) {
      // a draft charges its creator no proposal fee, so the Guild pays the proposal's storage: cover it
      const proposalCost = abiCall<typeof Guild.prototype.proposalCost>({
        sender,
        appId: guild,
        args: [actions],
      }).returnValue
      this.requireWithinQuote(cost + configurationMbr + setupCost + proposalCost.mbr, maxCost)
      if (proposalCost.mbr > 0) {
        itxn.payment({ sender, receiver: guild.address, amount: proposalCost.mbr }).submit()
      }
      const proposalID = abiCall<typeof Guild.prototype.newProposal>({
        sender,
        appId: guild,
        args: [itxn.payment({ sender, receiver: guild.address, amount: 0 }), bzero(36).toFixed({ length: 36 }), actions, Bytes('')],
      }).returnValue
      abiCall<typeof Guild.prototype.executeProposal>({ sender, appId: guild, args: [proposalID] })
    }

    // hand the wallet back
    itxn.payment({ sender, receiver: sender, amount: 0, rekeyTo: rekeyAddress(rekeyBack, wallet) }).submit()

    return { guild: guild.id, consensus: deployment.consensus.id, wallet: treasury.id }
  }

  configureConsensus(wallet: Application, rekeyBack: boolean, guild: Application, config: bytes, maxCost: uint64): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const amount = abiCall<typeof Guild.prototype.consensusConfigurationMbr>({
      sender,
      appId: guild,
      args: [config],
    }).returnValue
    this.requireWithinQuote(amount, maxCost)
    abiCall<typeof Guild.prototype.configureConsensus>({
      sender,
      appId: guild,
      args: [
        itxn.payment({
          sender,
          receiver: guild.address,
          amount,
        }),
        config,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  setup(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    nickname: string,
    salt: bytes<32>,
    maxCost: uint64,
  ): uint64 {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const cost = abiCall<typeof Guild.prototype.setupCost>({ sender, appId: guild }).returnValue
    this.requireWithinQuote(cost, maxCost)

    itxn
      .payment({
        sender,
        receiver: guild.address,
        amount: cost,
      })
      .submit()

    const guildWallet = abiCall<typeof Guild.prototype.setup>({
      sender,
      appId: guild,
      args: [nickname, salt],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
    return guildWallet
  }

  setProposalSettings(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    actionType: GuildActionType,
    settings: GuildProposalSettings,
  ): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.setProposalSettings>({
      sender,
      appId: guild,
      args: [actionType, settings],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  setProposalActionLimit(wallet: Application, rekeyBack: boolean, guild: Application, limit: uint64): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.setProposalActionLimit>({
      sender,
      appId: guild,
      args: [limit],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  setConsensusActionSettings(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    code: uint64,
    settings: GuildProposalSettings,
  ): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.setConsensusActionSettings>({
      sender,
      appId: guild,
      args: [code, settings],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Charge the draft Guild's proposal fees in `asset` (0 = ALGO), paying the opt-ins it needs. */
  setFeeAsset(wallet: Application, rekeyBack: boolean, guild: Application, asset: uint64, maxCost: uint64): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const cost = abiCall<typeof Guild.prototype.feeAssetCost>({ sender, appId: guild, args: [asset] }).returnValue
    this.requireWithinQuote(cost, maxCost)
    abiCall<typeof Guild.prototype.setFeeAsset>({
      sender,
      appId: guild,
      args: [itxn.payment({ sender, receiver: guild.address, amount: cost }), asset],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  lockPluginSet(wallet: Application, rekeyBack: boolean, guild: Application): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.lockPluginSet>({
      sender,
      appId: guild,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  partiallyInitialize(wallet: Application, rekeyBack: boolean, guild: Application): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.partiallyInitialize>({
      sender,
      appId: guild,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  initialize(wallet: Application, rekeyBack: boolean, guild: Application): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.initialize>({
      sender,
      appId: guild,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // PROPOSAL LIFECYCLE -------------------------------------------------------------------------

  newProposal(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
    maxCost: uint64,
  ): uint64 {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const cost = abiCall<typeof Guild.prototype.proposalCost>({
      sender,
      appId: guild,
      args: [actions],
    }).returnValue
    this.requireWithinQuote(cost.total, maxCost)

    const proposalID = abiCall<typeof Guild.prototype.newProposal>({
      sender,
      appId: guild,
      args: [
        itxn.payment({
          sender,
          receiver: guild.address,
          amount: cost.total,
        }),
        cid,
        actions,
        evidence,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
    return proposalID
  }

  /**
   * Propose to a Guild that charges its fee in `feeAsset`: `maxCost` bounds the ALGO storage payment and
   * `maxFee` the fee paid in `feeAsset`. A Guild whose fee asset changed since the quote fails the call.
   */
  newProposalWithFeeAsset(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
    maxCost: uint64,
    feeAsset: uint64,
    maxFee: uint64,
  ): uint64 {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const cost = abiCall<typeof Guild.prototype.proposalCost>({
      sender,
      appId: guild,
      args: [actions],
    }).returnValue
    loggedAssert(cost.feeAsset === feeAsset, errGuildCostLimitExceeded)
    this.requireWithinQuote(cost.total, maxCost)
    this.requireWithinQuote(cost.fee, maxFee)

    return abiCall<typeof Guild.prototype.newProposalWithFeeAsset>({
      sender,
      appId: guild,
      args: [
        itxn.payment({ sender, receiver: guild.address, amount: cost.total }),
        itxn.assetTransfer({ sender, assetReceiver: guild.address, xferAsset: feeAsset, assetAmount: cost.fee }),
        cid,
        actions,
        evidence,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /**
   * Edit a draft in a Guild that charges its fee in `feeAsset`, paying whatever ALGO (bounded by `maxCost`)
   * and fee tokens (bounded by `maxFee`) the new actions need beyond what the draft already paid.
   */
  editProposalWithFeeAsset(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    proposalID: uint64,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
    maxCost: uint64,
    feeAsset: uint64,
    maxFee: uint64,
  ): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const proposal = abiCall<typeof Guild.prototype.getProposal>({
      sender,
      appId: guild,
      args: [proposalID],
    }).returnValue
    const cost = abiCall<typeof Guild.prototype.proposalCost>({
      sender,
      appId: guild,
      args: [actions],
    }).returnValue
    loggedAssert(cost.feeAsset === feeAsset, errGuildCostLimitExceeded)
    const algoTopUp: uint64 = cost.total > proposal.feesPaid ? cost.total - proposal.feesPaid : 0
    const tokenTopUp: uint64 = feeAsset !== 0 && cost.fee > proposal.feeTokensPaid ? cost.fee - proposal.feeTokensPaid : 0
    this.requireWithinQuote(algoTopUp, maxCost)
    this.requireWithinQuote(tokenTopUp, maxFee)

    if (tokenTopUp > 0) {
      abiCall<typeof Guild.prototype.editProposalWithFeeAsset>({
        sender,
        appId: guild,
        args: [
          itxn.payment({ sender, receiver: guild.address, amount: algoTopUp }),
          itxn.assetTransfer({ sender, assetReceiver: guild.address, xferAsset: feeAsset, assetAmount: tokenTopUp }),
          proposalID,
          cid,
          actions,
          evidence,
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    } else if (algoTopUp > 0) {
      abiCall<typeof Guild.prototype.editProposalWithPayment>({
        sender,
        appId: guild,
        args: [itxn.payment({ sender, receiver: guild.address, amount: algoTopUp }), proposalID, cid, actions, evidence],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    } else {
      abiCall<typeof Guild.prototype.editProposal>({
        sender,
        appId: guild,
        args: [proposalID, cid, actions, evidence],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    }
  }

  editProposal(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    proposalID: uint64,
    cid: CID,
    actions: GuildProposalAction[],
    evidence: bytes,
    maxCost: uint64,
  ): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const proposal = abiCall<typeof Guild.prototype.getProposal>({
      sender,
      appId: guild,
      args: [proposalID],
    }).returnValue
    const cost = abiCall<typeof Guild.prototype.proposalCost>({
      sender,
      appId: guild,
      args: [actions],
    }).returnValue

    if (proposal.feesPaid < cost.total) {
      // `maxCost` bounds the top-up, not the proposal's whole price
      this.requireWithinQuote(cost.total - proposal.feesPaid, maxCost)
      abiCall<typeof Guild.prototype.editProposalWithPayment>({
        sender,
        appId: guild,
        args: [
          itxn.payment({
            sender,
            receiver: guild.address,
            amount: cost.total - proposal.feesPaid,
          }),
          proposalID,
          cid,
          actions,
          evidence,
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    } else {
      abiCall<typeof Guild.prototype.editProposal>({
        sender,
        appId: guild,
        args: [proposalID, cid, actions, evidence],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    }
  }

  deleteProposal(wallet: Application, rekeyBack: boolean, guild: Application, proposalID: uint64): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.deleteProposal>({
      sender,
      appId: guild,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  submitProposal(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    proposalID: uint64,
    evidence: bytes,
  ): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.submitProposal>({
      sender,
      appId: guild,
      args: [proposalID, evidence],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  voteProposal(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    proposalID: uint64,
    vote: GuildVoteType,
    evidence: bytes,
    maxCost: uint64,
  ): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    // a first vote funds its receipt; changing a vote is free
    const voteMbr = abiCall<typeof Guild.prototype.voteCost>({ sender, appId: guild, args: [proposalID, sender] }).returnValue
    this.requireWithinQuote(voteMbr, maxCost)
    abiCall<typeof Guild.prototype.voteProposal>({
      sender,
      appId: guild,
      args: [
        itxn.payment({
          sender,
          receiver: guild.address,
          amount: voteMbr,
        }),
        proposalID,
        vote,
        evidence,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  finalizeProposal(wallet: Application, rekeyBack: boolean, guild: Application, proposalID: uint64): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.finalizeProposal>({
      sender,
      appId: guild,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  cleanupProposalConsensus(
    wallet: Application,
    rekeyBack: boolean,
    guild: Application,
    proposalID: uint64,
    voters: Account[],
  ): uint64 {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    const amount = abiCall<typeof Guild.prototype.cleanupProposalConsensus>({
      sender,
      appId: guild,
      args: [proposalID, voters],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
    return amount
  }

  /** Abandon an approved proposal this wallet proposed, recovering its execution reserve. */
  cancelProposal(wallet: Application, rekeyBack: boolean, guild: Application, proposalID: uint64): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.cancelProposal>({
      sender,
      appId: guild,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  executeProposal(wallet: Application, rekeyBack: boolean, guild: Application, proposalID: uint64): void {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof Guild.prototype.executeProposal>({
      sender,
      appId: guild,
      args: [proposalID],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Forward unreserved Guild balance to its treasury wallet. */
  sweep(wallet: Application, rekeyBack: boolean, guild: Application): uint64 {
    this.requireGuild(guild)
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof Guild.prototype.sweep>({
      sender,
      appId: guild,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** Add pooled opcode budget before a heavier Guild operation in the same wallet group. */
  /* eslint-disable @typescript-eslint/no-unused-vars -- ABI names must remain wallet/rekeyBack for ARC-58 validation */
  opUp(wallet: Application, rekeyBack: boolean, nonce: uint64): void {}
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
