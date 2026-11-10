import type { Account, Application, bytes, gtxn, uint64 } from '@algorandfoundation/algorand-typescript'
import type { GuildBaseConfig, GuildConsensusRequirements, GuildConsensusResult, GuildVoteType } from './core/types'

/** ABI surface the factory uses to create and update Guild applications. */
export interface GuildFactoryCreateInterface {
  create(
    version: string,
    creator: Account,
    walletFactory: Application,
    consensus: Application,
    config: GuildBaseConfig,
  ): void

  update(newVersion: string): void
}

/** ABI surface the factory uses to create and bind consensus applications. */
export interface GuildConsensusFactoryCreateInterface {
  create(governanceConfig: bytes): void
  bindGuild(guild: Application): void
}

/** Policy-owned draft configuration ABI used by the paired Guild. */
export interface GuildConsensusConfigurationInterface {
  configurationMbr(config: bytes): uint64
  configure(mbrPayment: gtxn.PaymentTxn, config: bytes): void
}

/**
 * Policy-owned governed administration ABI.
 *
 * `data` is `uint8 code || ABI payload`. The policy validates the action and quotes
 * the storage it needs; the Guild only reads the code to select proposal settings.
 * `proposalID` names the approved proposal being executed so a policy can bound changes by the
 * approval power that proposal actually demonstrated.
 */
export interface GuildConsensusActionInterface {
  consensusActionMbr(data: bytes): uint64
  applyConsensusAction(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, data: bytes): void
}

/** Consensus ABI called by the paired Guild rather than by the factory. */
export interface GuildConsensusGuildInterface extends GuildConsensusConfigurationInterface, GuildConsensusActionInterface {
  validateActivation(): void
  proposalPower(account: Account, evidence: bytes, requiredThrough: uint64): uint64
  openProposal(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, votingEnd: uint64, requirements: GuildConsensusRequirements): void
  vote(mbrPayment: gtxn.PaymentTxn, voter: Account, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void
  hasVoted(proposalID: uint64, voter: Account): boolean
  resolveProposal(proposalID: uint64): GuildConsensusResult
}
