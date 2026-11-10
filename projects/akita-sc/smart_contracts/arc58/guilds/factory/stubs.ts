/* eslint-disable @typescript-eslint/no-unused-vars -- ABI-only templates replaced by boxed programs at creation. */
import { Account, Application, bytes, contract, gtxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import type { GuildBaseConfig, GuildConsensusRequirements, GuildConsensusResult, GuildVoteType } from '../core/types'
import type {
  GuildConsensusFactoryCreateInterface,
  GuildConsensusGuildInterface,
  GuildFactoryCreateInterface,
} from '../interfaces'
import {
  GuildConsensusNumGlobalBytes,
  GuildConsensusNumGlobalUints,
  GuildNumGlobalBytes,
  GuildNumGlobalUints,
} from '../core/constants'

/** Tiny compile-time template; factory creation replaces this approval program with boxed bytes. */
@contract({ avmVersion: 13, stateTotals: { globalBytes: GuildConsensusNumGlobalBytes, globalUints: GuildConsensusNumGlobalUints } })
export class GuildConsensusCreateStub extends Contract
  implements GuildConsensusFactoryCreateInterface, GuildConsensusGuildInterface
{
  @abimethod({ onCreate: 'require' })
  create(governanceConfig: bytes): void {}

  bindGuild(guild: Application): void {}

  @abimethod({ readonly: true })
  configurationMbr(config: bytes): uint64 {
    return 0
  }

  configure(mbrPayment: gtxn.PaymentTxn, config: bytes): void {}

  validateActivation(): void {}

  @abimethod({ readonly: true })
  proposalPower(account: Account, evidence: bytes, requiredThrough: uint64): uint64 {
    return 0
  }

  openProposal(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, votingEnd: uint64, requirements: GuildConsensusRequirements): void {}

  vote(mbrPayment: gtxn.PaymentTxn, voter: Account, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void {}

  @abimethod({ readonly: true })
  hasVoted(proposalID: uint64, voter: Account): boolean {
    return false
  }

  resolveProposal(proposalID: uint64): GuildConsensusResult {
    return { approved: false, approvals: 0, rejections: 0, abstains: 0, eligiblePower: 0 }
  }

  /** Opaque governed policy administration; policies reject codes they do not support. */
  @abimethod({ readonly: true })
  consensusActionMbr(data: bytes): uint64 {
    return 0
  }

  applyConsensusAction(mbrPayment: gtxn.PaymentTxn, proposalID: uint64, data: bytes): void {}
}

/** Tiny compile-time template; factory creation replaces this approval program with boxed bytes. */
@contract({ avmVersion: 13, stateTotals: { globalBytes: GuildNumGlobalBytes, globalUints: GuildNumGlobalUints } })
export class GuildCreateStub extends Contract implements GuildFactoryCreateInterface {
  @abimethod({ onCreate: 'require' })
  create(
    version: string,
    creator: Account,
    walletFactory: Application,
    consensus: Application,
    config: GuildBaseConfig,
  ): void {}

  @abimethod({ allowActions: ['UpdateApplication'] })
  update(newVersion: string): void {}
}
