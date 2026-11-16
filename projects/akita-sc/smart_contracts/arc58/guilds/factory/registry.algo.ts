import {
  BoxMap, Bytes, bytes, Global, gtxn, loggedAssert, match, OnCompleteAction,
  op, TransactionType, Txn, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { UpgradeableAkitaBaseContract } from '../../../utils/base-contracts/upgradeable'
import { MAX_AVM_BYTE_ARRAY_LENGTH, PROGRAM_PAGE_SIZE } from '../../../utils/constants'
import { errContractNotSet, errInvalidCallOrder } from '../../../utils/errors'
import {
  GuildFactoryBoxPrefixPrograms, MAX_GUILD_APPROVAL_PROGRAM_SIZE,
  MAX_GUILD_PROGRAM_NAME_BYTES, PROGRAM_UPLOAD_CHUNK_SIZE,
} from './constants'
import {
  errGuildFactoryInvalidConfig, errGuildFactoryInvalidPayment,
  errGuildFactoryInvalidType,
} from './errors'

/** Shared atomic program uploads. Every chunk fits the pinned transaction signer's argument limit. */
export abstract class GuildProgramRegistry extends UpgradeableAkitaBaseContract {
  // BOXES ----------------------------------------------------------------------------------------

  programs = BoxMap<string, bytes>({ keyPrefix: GuildFactoryBoxPrefixPrograms })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  protected validateProgramName(name: string): void {
    loggedAssert(name !== '' && Bytes(name).length <= MAX_GUILD_PROGRAM_NAME_BYTES, errGuildFactoryInvalidType)
  }

  protected requireProgram(name: string): void {
    this.validateProgramName(name)
    loggedAssert(this.programs(name).exists, errContractNotSet)
  }

  protected programChunk(name: string, offset: uint64): bytes {
    this.requireProgram(name)
    const program = this.programs(name)
    if (offset >= program.length) {
      return Bytes('')
    }
    const remaining: uint64 = program.length - offset
    return program.extract(offset, remaining > MAX_AVM_BYTE_ARRAY_LENGTH ? MAX_AVM_BYTE_ARRAY_LENGTH : remaining)
  }

  protected pagesCount(approvalSize: uint64, clearSize: uint64): uint64 {
    return (approvalSize + clearSize + PROGRAM_PAGE_SIZE - 1) / PROGRAM_PAGE_SIZE
  }

  // PROGRAM REGISTRY METHODS ---------------------------------------------------------------------

  /** Allocate storage only when every contiguous upload call is present in the same atomic group. */
  protected initializeProgram(mbrPayment: gtxn.PaymentTxn, programName: string, size: uint64): void {
    this.validateProgramName(programName)
    loggedAssert(size > 0 && size <= MAX_GUILD_APPROVAL_PROGRAM_SIZE, errGuildFactoryInvalidConfig)
    loggedAssert(match(mbrPayment, {
      receiver: Global.currentApplicationAddress,
      amount: this.programFunding(programName, size),
    }), errGuildFactoryInvalidPayment)

    const chunks: uint64 = (size + PROGRAM_UPLOAD_CHUNK_SIZE - 1) / PROGRAM_UPLOAD_CHUNK_SIZE
    loggedAssert(Txn.groupIndex + chunks < Global.groupSize, errInvalidCallOrder)
    for (let i: uint64 = 0; i < chunks; i += 1) {
      const txn = gtxn.Transaction(Txn.groupIndex + i + 1)
      const remaining: uint64 = size - i * PROGRAM_UPLOAD_CHUNK_SIZE
      const chunkSize: uint64 = remaining > PROGRAM_UPLOAD_CHUNK_SIZE ? PROGRAM_UPLOAD_CHUNK_SIZE : remaining
      loggedAssert(
        txn.type === TransactionType.ApplicationCall && txn.appId === Global.currentApplicationId &&
        txn.onCompletion === OnCompleteAction.NoOp && txn.sender === Txn.sender && txn.numAppArgs === 3 &&
        txn.appArgs(0) === methodSelector(this.loadProgram) && op.btoi(txn.appArgs(1)) === i * PROGRAM_UPLOAD_CHUNK_SIZE &&
        txn.appArgs(2).length === chunkSize + 2,
        errInvalidCallOrder,
      )
    }
    if (this.programs(programName).exists) {
      this.programs(programName).resize(size)
    } else {
      this.programs(programName).create({ size })
    }
  }

  /** Load only the exact chunk authorized by the preceding initProgram transaction. */
  loadProgram(offset: uint64, data: bytes): void {
    loggedAssert(offset % PROGRAM_UPLOAD_CHUNK_SIZE === 0, errInvalidCallOrder)
    const previousCalls: uint64 = offset / PROGRAM_UPLOAD_CHUNK_SIZE + 1
    loggedAssert(Txn.groupIndex >= previousCalls, errInvalidCallOrder)
    const txn = gtxn.Transaction(Txn.groupIndex - previousCalls)
    loggedAssert(
      txn.type === TransactionType.ApplicationCall && txn.appId === Global.currentApplicationId &&
      txn.onCompletion === OnCompleteAction.NoOp && txn.sender === Txn.sender && txn.numAppArgs === 3 &&
      txn.appArgs(0) === methodSelector('initProgram(pay,string,uint64)void'),
      errInvalidCallOrder,
    )
    const name = decodeArc4<string>(txn.appArgs(1))
    this.requireProgram(name)
    loggedAssert(this.programs(name).length === op.btoi(txn.appArgs(2)), errGuildFactoryInvalidConfig)
    this.programs(name).replace(offset, data)
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  programMbr(programName: string, size: uint64): uint64 {
    this.validateProgramName(programName)
    return 2_500 + 400 * (1 + Bytes(programName).length + size)
  }

  @abimethod({ readonly: true })
  programFunding(programName: string, size: uint64): uint64 {
    const requested = this.programMbr(programName, size)
    if (!this.programs(programName).exists) {
      return requested
    }
    const current = this.programMbr(programName, this.programs(programName).length)
    return requested > current ? requested - current : 0
  }
}
