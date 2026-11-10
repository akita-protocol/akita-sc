import {
  Account,
  Application,
  Box,
  Bytes,
  bytes,
  clone,
  contract,
  Global,
  GlobalState,
  itxn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { MAX_AVM_BYTE_ARRAY_LENGTH } from '../../../utils/constants'
import {
  GuildVoteMBR,
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
} from '../core/constants'
import type {
  GuildConsensusRequirements,
  GuildConsensusResult,
  GuildProposalSettings,
  GuildVoteType,
} from '../core/types'
import { GuildConsensusBase } from '../consensus/base'
import { FixedSignerGuildConsensus } from '../consensus/fixed-signers/contract.algo'
import { GuildConsensusCreateStub } from '../factory/stubs'

// Every policy implements the fixed-signer lifecycle signatures used below; runtime calls target this.consensus.

/** Test-only Guild-shaped caller for independently exercising consensus policy bytecode. */
@contract({ stateTotals: { globalBytes: 9, globalUints: 1 } })
export class MockGuildConsensusHost extends Contract {
  consensus = GlobalState<Application>({ key: GuildGlobalStateKeyConsensus })
  upgradeAppProposalSettings = GlobalState<GuildProposalSettings>({
    key: GuildGlobalStateKeyUpgradeAppProposalSettings,
  })
  addPluginProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyAddPluginProposalSettings })
  removeExecutionProposalSettings = GlobalState<GuildProposalSettings>({
    key: GuildGlobalStateKeyRemoveExecutionProposalSettings,
  })
  removePluginProposalSettings = GlobalState<GuildProposalSettings>({
    key: GuildGlobalStateKeyRemovePluginProposalSettings,
  })
  addAllowancesProposalSettings = GlobalState<GuildProposalSettings>({
    key: GuildGlobalStateKeyAddAllowancesProposalSettings,
  })
  removeAllowancesProposalSettings = GlobalState<GuildProposalSettings>({
    key: GuildGlobalStateKeyRemoveAllowancesProposalSettings,
  })
  newEscrowProposalSettings = GlobalState<GuildProposalSettings>({ key: GuildGlobalStateKeyNewEscrowProposalSettings })
  toggleEscrowLockProposalSettings = GlobalState<GuildProposalSettings>({
    key: GuildGlobalStateKeyToggleEscrowLockProposalSettings,
  })
  updateGuildProposalSettings = GlobalState<GuildProposalSettings>({
    key: GuildGlobalStateKeyUpdateGuildProposalSettings,
  })
  program = Box<bytes>({ key: 'program' })

  private programFirstChunk(): bytes {
    const size = this.program.length
    if (size > MAX_AVM_BYTE_ARRAY_LENGTH) return this.program.extract(0, MAX_AVM_BYTE_ARRAY_LENGTH)
    return this.program.extract(0, size)
  }

  private programSecondChunk(): bytes {
    const size = this.program.length
    if (size > MAX_AVM_BYTE_ARRAY_LENGTH) {
      return this.program.extract(MAX_AVM_BYTE_ARRAY_LENGTH, size - MAX_AVM_BYTE_ARRAY_LENGTH)
    }
    return Bytes('')
  }

  @abimethod({ onCreate: 'require' })
  create(): void {
    const settings: GuildProposalSettings = {
      fee: 0,
      power: 0,
      duration: 1,
      participation: 0,
      approval: 0,
      minimumApprovals: 1,
    }
    this.upgradeAppProposalSettings.value = clone(settings)
    this.addPluginProposalSettings.value = clone(settings)
    this.removeExecutionProposalSettings.value = clone(settings)
    this.removePluginProposalSettings.value = clone(settings)
    this.addAllowancesProposalSettings.value = clone(settings)
    this.removeAllowancesProposalSettings.value = clone(settings)
    this.newEscrowProposalSettings.value = clone(settings)
    this.toggleEscrowLockProposalSettings.value = clone(settings)
    this.updateGuildProposalSettings.value = clone(settings)
  }

  initProgram(size: uint64): void {
    this.program.create({ size })
  }

  loadProgram(offset: uint64, data: bytes): void {
    this.program.replace(offset, data)
  }

  /** Create the real policy as this host's child and bind it back to this host. */
  createConsensus(governanceConfig: bytes): uint64 {
    const consensusContract = compileArc4(GuildConsensusCreateStub)
    const consensus = consensusContract.call.create({
      args: [governanceConfig],
      approvalProgram: [this.programFirstChunk(), this.programSecondChunk()],
      clearStateProgram: consensusContract.clearStateProgram,
      extraProgramPages: 3,
    }).itxn.createdApp
    this.consensus.value = consensus
    itxn.payment({ receiver: consensus.address, amount: Global.minBalance, fee: 0 }).submit()
    consensusContract.call.bindGuild({ appId: consensus, args: [Global.currentApplicationId] })
    return consensus.id
  }

  validateActivation(): void {
    abiCall<typeof FixedSignerGuildConsensus.prototype.validateActivation>({ appId: this.consensus.value, args: [] })
  }

  openProposal(proposalID: uint64, votingEnd: uint64, requirements: GuildConsensusRequirements): void {
    const amount = abiCall<typeof GuildConsensusBase.prototype.ballotMbr>({ appId: this.consensus.value, args: [] }).returnValue
    abiCall<typeof FixedSignerGuildConsensus.prototype.openProposal>({
      appId: this.consensus.value,
      args: [
        itxn.payment({
          receiver: this.consensus.value.address,
          amount,
          fee: 0,
        }),
        proposalID,
        votingEnd,
        requirements,
      ],
    })
  }

  vote(voter: Account, proposalID: uint64, vote: GuildVoteType, evidence: bytes): void {
    // like the Guild: only a first vote funds its receipt; changing a vote pays nothing
    const voted = abiCall<typeof FixedSignerGuildConsensus.prototype.hasVoted>({
      appId: this.consensus.value,
      args: [proposalID, voter],
    }).returnValue
    abiCall<typeof FixedSignerGuildConsensus.prototype.vote>({
      appId: this.consensus.value,
      args: [
        itxn.payment({ receiver: this.consensus.value.address, amount: voted ? 0 : GuildVoteMBR, fee: 0 }),
        voter,
        proposalID,
        vote,
        evidence,
      ],
    })
  }

  resolveProposal(proposalID: uint64): GuildConsensusResult {
    return abiCall<typeof FixedSignerGuildConsensus.prototype.resolveProposal>({
      appId: this.consensus.value,
      args: [proposalID],
    }).returnValue
  }

  cleanupBallot(proposalID: uint64, voters: Account[]): uint64 {
    return abiCall<typeof GuildConsensusBase.prototype.cleanupBallot>({
      appId: this.consensus.value,
      args: [proposalID, voters],
    }).returnValue
  }

  proposalPower(account: Account, evidence: bytes, requiredThrough: uint64): uint64 {
    return abiCall<typeof FixedSignerGuildConsensus.prototype.proposalPower>({
      appId: this.consensus.value,
      args: [account, evidence, requiredThrough],
    }).returnValue
  }

  /** Quote an opaque consensus action exactly as the Guild would. */
  consensusActionMbr(data: bytes): uint64 {
    return abiCall<typeof FixedSignerGuildConsensus.prototype.consensusActionMbr>({
      appId: this.consensus.value,
      args: [data],
    }).returnValue
  }

  /** Forward an opaque consensus action with its quoted MBR exactly as the Guild would for `proposalID`. */
  consensusAction(proposalID: uint64, data: bytes): void {
    const amount = this.consensusActionMbr(data)
    abiCall<typeof FixedSignerGuildConsensus.prototype.applyConsensusAction>({
      appId: this.consensus.value,
      args: [itxn.payment({ receiver: this.consensus.value.address, amount, fee: 0 }), proposalID, data],
    })
  }

  /** Forward opaque draft configuration with its quoted MBR exactly as the Guild would. */
  configureConsensus(config: bytes): void {
    const amount = abiCall<typeof FixedSignerGuildConsensus.prototype.configurationMbr>({
      appId: this.consensus.value,
      args: [config],
    }).returnValue
    abiCall<typeof FixedSignerGuildConsensus.prototype.configure>({
      appId: this.consensus.value,
      args: [itxn.payment({ receiver: this.consensus.value.address, amount, fee: 0 }), config],
    })
  }
}
