import {
  Account,
  Application,
  Box,
  Bytes,
  bytes,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  OnCompleteAction,
  op,
  TransactionType,
  Txn,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { AkitaDAOGlobalStateKeysWallet } from '../../arc58/dao/constants'
import { errNotAkitaDao } from '../../errors'
import { errContractNotSet, errInvalidCallOrder } from '../errors'
import { boxedProgramChunk, boxedProgramSize, LEGACY_CHILD_EXTRA_PROGRAM_PAGES, programExtraPages, programPagesMbr } from '../programs'

// CONTRACT IMPORTS
import { AkitaFeeGeneratorContractWithOptIn } from './base'

export const BaseFactoryGlobalStateKeyChildContractVersion = 'child_contract_version'
export const BoxKeyBoxedContract = 'bc'

export type AppCreatorValue = {
  creator: Account
  amount: uint64
}

/**
 * Refund owed to a child's funder when the child is deleted: the ALGO the factory actually
 * received during the call plus the creator min-balance released by the deletion, capped at
 * the funder's recorded deposit.
 *
 * - `balanceBefore` / `minBefore`: `Global.currentApplicationAddress.balance` / `.minBalance`
 *   read at method entry, before any inner transaction.
 * - `forwarded`: ALGO this call sent out of the factory into the child (or elsewhere) that came
 *   from a third party in the same call (e.g. a buyer's price forwarded to a listing).
 *
 * Underflow-safe: if inner fees were paid from the factory balance, `received` floors at 0.
 */
export function releasedRefund(recorded: uint64, balanceBefore: uint64, minBefore: uint64, forwarded: uint64): uint64 {
  const self = Global.currentApplicationAddress
  const gross: uint64 = self.balance + forwarded
  const received: uint64 = gross > balanceBefore ? gross - balanceBefore : 0
  const minAfter: uint64 = self.minBalance
  const released: uint64 = minBefore > minAfter ? minBefore - minAfter : 0
  const refund: uint64 = received + released
  return refund > recorded ? recorded : refund
}

export class FactoryContract extends AkitaFeeGeneratorContractWithOptIn {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the current version of the child contract */
  childContractVersion = GlobalState<string>({ key: BaseFactoryGlobalStateKeyChildContractVersion })

  // BOXES ----------------------------------------------------------------------------------------

  boxedContract = Box<bytes>({ key: BoxKeyBoxedContract })

  // CHILD PROGRAM HELPERS ------------------------------------------------------------------------

  /** Chunk `index` (0..3) of the boxed child approval program; empty past the end. */
  protected childApprovalChunk(index: uint64): bytes {
    return boxedProgramChunk(Bytes(BoxKeyBoxedContract), index)
  }

  /** Size in bytes of the boxed child approval program. */
  protected childApprovalSize(): uint64 {
    return boxedProgramSize(Bytes(BoxKeyBoxedContract))
  }

  /**
   * Extra pages for a new child: derived from the boxed program size, never below the legacy
   * 3 extra pages (so existing cost quotes and immutable plugins stay exact for ≤ 8 KB children).
   */
  protected childExtraPages(clearSize: uint64): uint64 {
    return this.childExtraPagesAtLeast(clearSize, LEGACY_CHILD_EXTRA_PROGRAM_PAGES)
  }

  /** Extra pages for a new child derived from the boxed program size, never below `minExtraPages`. */
  protected childExtraPagesAtLeast(clearSize: uint64, minExtraPages: uint64): uint64 {
    return programExtraPages(this.childApprovalSize(), clearSize, minExtraPages)
  }

  /** Creator page MBR for a new child (replaces the hard-coded `MAX_PROGRAM_PAGES`). */
  protected childPagesMbr(clearSize: uint64): uint64 {
    return programPagesMbr(this.childExtraPages(clearSize))
  }

  /**
   * Pay `receiver` the refund computed by `releasedRefund` (see there) and return the amount.
   * Call after the child has been deleted and its balance closed back to the factory.
   */
  protected refundReleased(
    receiver: Account,
    recorded: uint64,
    balanceBefore: uint64,
    minBefore: uint64,
    forwarded: uint64
  ): uint64 {
    const refund = releasedRefund(recorded, balanceBefore, minBefore, forwarded)
    if (refund > 0) {
      itxn.payment({ receiver, amount: refund }).submit()
    }
    return refund
  }

  // AKITA FACTORY METHODS --------------------------------------------------------------------

  initBoxedContract(version: string, size: uint64): void {
    // ACC-08: the deployer may only seed child bytecode before the DAO wallet exists (initial
    // deployment). Once the DAO has a wallet, only the DAO wallet may create or resize the box,
    // so a DAO `deleteBoxedContract` can no longer hand bytecode control back to the deployer.
    const [daoWalletId] = op.AppGlobal.getExUint64(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysWallet))
    loggedAssert(
      daoWalletId === 0
        ? Txn.sender === Global.creatorAddress
        : Txn.sender === Application(daoWalletId).address,
      errNotAkitaDao
    )
    this.childContractVersion.value = version
    if (!this.boxedContract.exists) {
      this.boxedContract.create({ size })
    } else {
      this.boxedContract.resize(size)
    }
  }

  loadBoxedContract(offset: uint64, data: bytes): void {
    const expectedPreviousCalls: uint64 = offset / 2032
    const txn = gtxn.Transaction(Txn.groupIndex - expectedPreviousCalls - 1)
    loggedAssert((
      txn.type === TransactionType.ApplicationCall
      && txn.appId === Global.currentApplicationId
      && txn.numAppArgs === 3
      && txn.onCompletion === OnCompleteAction.NoOp
      && txn.appArgs(0) === methodSelector(this.initBoxedContract)
      && txn.sender === Txn.sender
    ), errInvalidCallOrder)
    loggedAssert(this.boxedContract.exists, errContractNotSet)
    this.boxedContract.replace(offset, data)
  }

  deleteBoxedContract(): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    this.boxedContract.delete()
  }
}
