import { Application, Bytes, clone, contract, Global, gtxn, itxn, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GlobalStateKeyFunder } from '../constants'
import { EscrowConfig } from '../utils/base-contracts/base'
import { FactoryContract } from '../utils/base-contracts/factory'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST } from '../utils/constants'
import { assertPlainPayment, recordPayer, releaseDeposit, sponsorCost } from '../utils/functions'
import { programPagesMbr } from '../utils/programs'
import { FunderInfo } from '../utils/types/mbr'
import { Poll } from './contract.algo'
import { errInvalidPayment, errNotAPoll } from './errors'
import { PollType } from './types'

@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class PollFactory extends FactoryContract {

  @abimethod({ onCreate: 'require' })
  create(version: string, childVersion: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig): void {
    this.version.value = version
    this.childContractVersion.value = childVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  /**
   * Creates a poll for the caller.
   *
   * The caller is the poll's author. The poll records the author as its `funder` account, and that
   * account alone may clear the poll's votes once it has ended (`Poll.deleteBoxes`, readiness audit
   * C17). Anyone may pay for the poll. A payer that is not the author adds `PayerRecordMBR` and is
   * remembered here, under the new poll's id, so `deletePoll` returns the deposit to the payer and
   * the author keeps the cleanup (AUD-C24). Before this, a sponsored poll recorded its sponsor as
   * the `funder`, which handed the cleanup to the sponsor.
   */
  new(
    payment: gtxn.PaymentTxn,
    type: PollType,
    endTime: uint64,
    maxSelected: uint64,
    question: string,
    options: string[],
    gateID: uint64,
  ): uint64 {

    const poll = compileArc4(Poll)

    const cost = this.newPollCost()
    assertPlainPayment(payment)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === cost + sponsorCost(payment.sender, Txn.sender), errInvalidPayment)

    const mint = poll.call
      .create({
        args: [
          this.akitaDAO.value.id,
          type,
          endTime,
          maxSelected,
          { account: Txn.sender, amount: cost },
          question,
          options,
          gateID
        ],
      })
      .itxn
      .createdApp

    recordPayer(op.itob(mint.id), payment.sender, Txn.sender)

    itxn
      .payment({
        receiver: mint.address,
        amount: Global.minBalance
      })
      .submit()

    return mint.id
  }

  /**
   * Deletes a finished poll whose votes have been cleared and returns its deposit to whoever paid
   * it: the payer remembered by `new`, or the account the poll records when nobody else paid. A
   * poll created before AUD-C24 has no payer record and is refunded to its recorded account, as
   * it always was.
   */
  deletePoll(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAPoll)

    const [funderBytes] = op.AppGlobal.getExBytes(appId, Bytes(GlobalStateKeyFunder))
    const { account: author, amount: deposit } = decodeArc4<FunderInfo>(funderBytes)

    const balanceBefore = Global.currentApplicationAddress.balance
    const minBefore = Global.currentApplicationAddress.minBalance

    // Releasing the payer record here, after the readings above, counts its storage as released
    // by this call, so a sponsor is refunded the deposit and the record's storage together.
    const [receiver, amount] = releaseDeposit(op.itob(appId.id), author, deposit)

    const poll = compileArc4(Poll)
    poll.call.deleteApplication({ appId })

    if (Global.currentApplicationAddress.balance === balanceBefore) {
      // Legacy child (created before PL-01): it did not close its account back, so its
      // forwarded min balance is stranded. The factory absorbs that one-time loss (H-E);
      // no new child can be created with the legacy program.
      itxn
        .payment({ amount, receiver })
        .submit()
    } else {
      // Refund only what this deletion returned or released, capped at the recorded deposit.
      this.refundReleased(receiver, amount, balanceBefore, minBefore, 0)
    }
  }

  @abimethod({ readonly: true })
  newPollCost(): uint64 {
    const poll = compileArc4(Poll)
    return (
      // Poll has outgrown one page; quote every page the create call allocates.
      programPagesMbr(poll.extraProgramPages) +
      (GLOBAL_STATE_KEY_UINT_COST * poll.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * poll.globalBytes) +
      Global.minBalance
    )
  }
}
