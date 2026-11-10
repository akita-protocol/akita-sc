import { Application, Bytes, clone, contract, Global, gtxn, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GlobalStateKeyFunder } from '../constants'
import { EscrowConfig } from '../utils/base-contracts/base'
import { FactoryContract } from '../utils/base-contracts/factory'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST } from '../utils/constants'
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

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === this.newPollCost(), errInvalidPayment)

    const mint = poll.call
      .create({
        args: [
          this.akitaDAO.value.id,
          type,
          endTime,
          maxSelected,
          { account: payment.sender, amount: payment.amount },
          question,
          options,
          gateID
        ],
      })
      .itxn
      .createdApp

    itxn
      .payment({
        receiver: mint.address,
        amount: Global.minBalance
      })
      .submit()

    return mint.id
  }

  deletePoll(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAPoll)

    const [funderBytes] = op.AppGlobal.getExBytes(appId, Bytes(GlobalStateKeyFunder))
    const { account: receiver, amount } = decodeArc4<FunderInfo>(funderBytes)

    const balanceBefore = Global.currentApplicationAddress.balance
    const minBefore = Global.currentApplicationAddress.minBalance

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
