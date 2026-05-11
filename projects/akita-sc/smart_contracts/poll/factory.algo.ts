import { Application, Bytes, clone, contract, Global, gtxn, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GlobalStateKeyFunder } from '../constants'
import { EscrowConfig } from '../utils/base-contracts/base'
import { FactoryContract } from '../utils/base-contracts/factory'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, MIN_PROGRAM_PAGES } from '../utils/constants'
import { FunderInfo } from '../utils/types/mbr'
import { Poll } from './contract.algo'
import { ERR_INVALID_PAYMENT, ERR_NOT_A_POLL } from './errors'
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

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === this.newPollCost(), ERR_INVALID_PAYMENT)

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
    loggedAssert(appId.creator === Global.currentApplicationAddress, ERR_NOT_A_POLL)

    const [funderBytes] = op.AppGlobal.getExBytes(appId, Bytes(GlobalStateKeyFunder))
    const { account: receiver, amount } = decodeArc4<FunderInfo>(funderBytes)

    const poll = compileArc4(Poll)
    poll.call.deleteApplication({ appId })

    itxn
      .payment({ amount, receiver })
      .submit()
  }

  @abimethod({ readonly: true })
  newPollCost(): uint64 {
    const poll = compileArc4(Poll)
    return (
      MIN_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * poll.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * poll.globalBytes) +
      Global.minBalance
    )
  }
}
