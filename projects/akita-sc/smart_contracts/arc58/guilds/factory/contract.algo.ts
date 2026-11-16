import {
  Account, Application, Bytes, bytes, clone, contract, Global, GlobalState, gtxn, itxn,
  loggedAssert, match, OnCompleteAction, op, Txn, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { AkitaDAOGlobalStateKeysGuildFees } from '../../dao/constants'
import type { GuildFees } from '../../dao/types'
import { GlobalStateKeyAkitaEscrow } from '../../../constants'
import { errNotAkitaDao } from '../../../errors'
import { getAkitaAppList } from '../../../utils/functions'
import {
  GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, FactoryGlobalStateMaxBytes,
  FactoryGlobalStateMaxUints, MIN_PROGRAM_PAGES, MAX_AVM_BYTE_ARRAY_LENGTH,
} from '../../../utils/constants'
import { BaseFactoryGlobalStateKeyChildContractVersion } from '../../../utils/base-contracts/factory'
import type { EscrowConfig } from '../../../utils/base-contracts/base'
import { GuildGlobalStateKeyCreator, GuildNumGlobalBytes, GuildNumGlobalUints } from '../core/constants'
import { errGuildCreatorOnly } from '../core/errors'
import type { GuildBaseConfig, GuildDeployment } from '../core/types'
import { GuildFactoryGuildProgramKey } from './constants'
import {
  errGuildFactoryGuildFeesUnset, errGuildFactoryInvalidConfig,
  errGuildFactoryInvalidPayment, errGuildFactoryInvalidType, errGuildFactoryInvalidVersion,
} from './errors'
import { GuildProgramRegistry } from './registry.algo'
import { GuildConsensusCreateStub, GuildCreateStub } from './stubs'
import type { GuildConsensusFactory } from '../consensus/factory.algo'

/** Creates only Guild kernels; policy programs are owned by the separate consensus factory. */
@contract({ avmVersion: 13, stateTotals: { globalBytes: FactoryGlobalStateMaxBytes, globalUints: FactoryGlobalStateMaxUints } })
export class GuildFactory extends GuildProgramRegistry {
  // GLOBAL STATE ---------------------------------------------------------------------------------

  childContractVersion = GlobalState<string>({ key: BaseFactoryGlobalStateKeyChildContractVersion })
  consensusFactory = GlobalState<Application>({ key: 'consensus_factory' })
  akitaDAOEscrow = GlobalState<EscrowConfig>({ key: GlobalStateKeyAkitaEscrow })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  initProgram(mbrPayment: gtxn.PaymentTxn, programName: string, size: uint64): void {
    const name = programName
    this.validateProgramName(name)
    loggedAssert(name === GuildFactoryGuildProgramKey, errGuildFactoryInvalidType)
    loggedAssert(
      Txn.sender === (this.programs(name).exists ? this.getAkitaDAOWallet().address : Global.creatorAddress),
      errNotAkitaDao,
    )
    this.childContractVersion.value = this.version.value
    this.initializeProgram(mbrPayment, name, size)
  }

  private getGuildCreateFee(): uint64 {
    const [fees, exists] = op.AppGlobal.getExBytes(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysGuildFees))
    loggedAssert(exists, errGuildFactoryGuildFeesUnset)
    return decodeArc4<GuildFees>(fees).createFee
  }

  private consensusCost(name: string): uint64 {
    return abiCall<typeof GuildConsensusFactory.prototype.cost>({ appId: this.consensusFactory.value, args: [name] }).returnValue
  }

  private guildMbr(): uint64 {
    return 8 * MIN_PROGRAM_PAGES + GLOBAL_STATE_KEY_UINT_COST * GuildNumGlobalUints +
      GLOBAL_STATE_KEY_BYTES_COST * GuildNumGlobalBytes + Global.minBalance
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig, consensusFactory: Application): void {
    loggedAssert(version !== '', errGuildFactoryInvalidVersion)
    loggedAssert(
      akitaDAO.id > 0 && akitaDAOEscrow.app.id > 0 && akitaDAOEscrow.name !== '' && consensusFactory.id > 0,
      errGuildFactoryInvalidConfig,
    )
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
    this.consensusFactory.value = consensusFactory
  }

  updateAkitaDAOEscrow(config: EscrowConfig): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    this.akitaDAOEscrow.value = clone(config)
  }

  // GUILD FACTORY METHODS ------------------------------------------------------------------------

  /** Push the registered kernel onto a draft Guild; only that Guild's creator may trigger it. */
  updateGuild(guild: Application): void {
    this.requireProgram(GuildFactoryGuildProgramKey)
    const [creator, exists] = op.AppGlobal.getExBytes(guild, Bytes(GuildGlobalStateKeyCreator))
    loggedAssert(exists && Txn.sender === Account(creator), errGuildCreatorOnly)
    const template = compileArc4(GuildCreateStub)
    abiCall<typeof GuildCreateStub.prototype.update>({
      appId: guild,
      args: [this.childContractVersion.value],
      onCompletion: OnCompleteAction.UpdateApplication,
      approvalProgram: [
        this.programChunk(GuildFactoryGuildProgramKey, 0),
        this.programChunk(GuildFactoryGuildProgramKey, MAX_AVM_BYTE_ARRAY_LENGTH),
        this.programChunk(GuildFactoryGuildProgramKey, MAX_AVM_BYTE_ARRAY_LENGTH * 2),
        this.programChunk(GuildFactoryGuildProgramKey, MAX_AVM_BYTE_ARRAY_LENGTH * 3),
      ],
      clearStateProgram: template.clearStateProgram,
    })
  }

  /**
   * Both factories participate in one atomic deployment; no returned pair is left unbound.
   *
   * Like the Akita DAO, every Guild creates its treasury wallet through the DAO's wallet factory,
   * so the creator cannot substitute a factory or wallet of their own.
   */
  newGuild(
    payment: gtxn.PaymentTxn,
    consensusName: string,
    baseConfig: GuildBaseConfig,
    governanceConfig: bytes,
  ): GuildDeployment {
    this.requireProgram(GuildFactoryGuildProgramKey)
    const consensusCost = this.consensusCost(consensusName)
    const createFee = this.getGuildCreateFee()
    const walletFactory = Application(getAkitaAppList(this.akitaDAO.value).wallet)
    loggedAssert(walletFactory.id > 0, errGuildFactoryInvalidConfig)
    loggedAssert(match(payment, {
      receiver: Global.currentApplicationAddress,
      amount: this.guildMbr() + consensusCost + createFee,
    }), errGuildFactoryInvalidPayment)
    const consensus = abiCall<typeof GuildConsensusFactory.prototype.newConsensus>({
      appId: this.consensusFactory.value,
      args: [itxn.payment({ receiver: this.consensusFactory.value.address, amount: consensusCost, fee: 0 }), consensusName, governanceConfig],
    }).returnValue
    const template = compileArc4(GuildCreateStub)
    const guild = template.call.create({
      args: [this.childContractVersion.value, Txn.sender, walletFactory, consensus, baseConfig],
      approvalProgram: [
        this.programChunk(GuildFactoryGuildProgramKey, 0),
        this.programChunk(GuildFactoryGuildProgramKey, MAX_AVM_BYTE_ARRAY_LENGTH),
        this.programChunk(GuildFactoryGuildProgramKey, MAX_AVM_BYTE_ARRAY_LENGTH * 2),
        this.programChunk(GuildFactoryGuildProgramKey, MAX_AVM_BYTE_ARRAY_LENGTH * 3),
      ],
      clearStateProgram: template.clearStateProgram,
      // Reserve AVM 13 capacity for governed upgrades, independently of today's program size.
      extraProgramPages: 7,
    }).itxn.createdApp
    itxn.payment({ receiver: guild.address, amount: Global.minBalance, fee: 0 }).submit()
    abiCall<typeof GuildConsensusCreateStub.prototype.bindGuild>({ appId: consensus, args: [guild] })
    if (createFee > 0) {
      itxn.payment({ receiver: this.akitaDAOEscrow.value.app.address, amount: createFee, fee: 0 }).submit()
    }
    return { guild, consensus }
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  guildCreateFee(): uint64 {
    return this.getGuildCreateFee()
  }

  @abimethod({ readonly: true })
  cost(consensusName: string): uint64 {
    this.requireProgram(GuildFactoryGuildProgramKey)
    return this.guildMbr() + this.consensusCost(consensusName) + this.getGuildCreateFee()
  }
}
