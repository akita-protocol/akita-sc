import { Application, clone, contract, Global, gtxn, itxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, compileArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { EscrowConfig } from '../utils/base-contracts/base'
import { FactoryContract } from '../utils/base-contracts/factory'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, MIN_PROGRAM_PAGES } from '../utils/constants'
import { Poll } from './contract.algo'
import { ERR_INVALID_PAYMENT } from './errors'
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
