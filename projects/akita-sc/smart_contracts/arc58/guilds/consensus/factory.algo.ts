import {
  Application, bytes, contract, Global, gtxn, itxn, loggedAssert, match, op, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import {
  GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, FactoryGlobalStateMaxBytes,
  FactoryGlobalStateMaxUints, MAX_AVM_BYTE_ARRAY_LENGTH, MIN_PROGRAM_PAGES,
} from '../../../utils/constants'
import { GuildConsensusNumGlobalBytes, GuildConsensusNumGlobalUints } from '../core/constants'
import { errGuildFactoryOnly } from '../core/errors'
import { GuildFactoryGuildProgramKey } from '../factory/constants'
import { errGuildFactoryInvalidConfig, errGuildFactoryInvalidPayment, errGuildFactoryProgramExists, errGuildFactoryInvalidType } from '../factory/errors'
import { GuildProgramRegistry } from '../factory/registry.algo'
import { GuildConsensusCreateStub } from '../factory/stubs'

/** Creates consensus applications only; its children never share the Guild factory's creator address. */
@contract({ avmVersion: 13, stateTotals: { globalBytes: FactoryGlobalStateMaxBytes, globalUints: FactoryGlobalStateMaxUints } })
export class GuildConsensusFactory extends GuildProgramRegistry {
  
  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    loggedAssert(version !== '' && akitaDAO.id > 0, errGuildFactoryInvalidConfig)
    this.version.value = version
    this.akitaDAO.value = akitaDAO
  }

  initProgram(mbrPayment: gtxn.PaymentTxn, programName: string, size: uint64): void {
    const name = programName
    this.validateProgramName(name)
    loggedAssert(name !== GuildFactoryGuildProgramKey, errGuildFactoryInvalidType)
    loggedAssert(!this.programs(name).exists, errGuildFactoryProgramExists)
    this.initializeProgram(mbrPayment, name, size)
  }

  /** Called inside an atomic Guild deployment, immediately followed by permanent binding. */
  newConsensus(payment: gtxn.PaymentTxn, consensusName: string, governanceConfig: bytes): Application {
    loggedAssert(Global.callerApplicationId !== 0, errGuildFactoryOnly)
    loggedAssert(match(payment, {
      sender: Global.callerApplicationAddress,
      receiver: Global.currentApplicationAddress,
      amount: this.cost(consensusName),
    }), errGuildFactoryInvalidPayment)
    const template = compileArc4(GuildConsensusCreateStub)
    const consensus = template.call.create({
      args: [governanceConfig],
      approvalProgram: [
        this.programChunk(consensusName, 0),
        this.programChunk(consensusName, MAX_AVM_BYTE_ARRAY_LENGTH),
        this.programChunk(consensusName, MAX_AVM_BYTE_ARRAY_LENGTH * 2),
        this.programChunk(consensusName, MAX_AVM_BYTE_ARRAY_LENGTH * 3),
      ],
      clearStateProgram: template.clearStateProgram,
      extraProgramPages: this.pagesCount(this.programs(consensusName).length, template.clearStateProgram.length) - 1,
    }).itxn.createdApp
    itxn.payment({ receiver: consensus.address, amount: Global.minBalance, fee: 0 }).submit()
    return consensus
  }

  @abimethod({ readonly: true })
  cost(consensusName: string): uint64 {
    loggedAssert(consensusName !== GuildFactoryGuildProgramKey, errGuildFactoryInvalidType)
    this.requireProgram(consensusName)
    // Approval and clear programs must use the same AVM version as the creation template.
    loggedAssert(op.btoi(this.programs(consensusName).extract(0, 1)) === 13, errGuildFactoryInvalidConfig)
    const template = compileArc4(GuildConsensusCreateStub)
    return this.pagesCount(this.programs(consensusName).length, template.clearStateProgram.length) * MIN_PROGRAM_PAGES +
      GLOBAL_STATE_KEY_UINT_COST * GuildConsensusNumGlobalUints +
      GLOBAL_STATE_KEY_BYTES_COST * GuildConsensusNumGlobalBytes + Global.minBalance
  }
}
