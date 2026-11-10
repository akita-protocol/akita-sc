import {
  abimethod,
  Account,
  Application,
  contract,
  Global,
  gtxn,
  itxn,
  loggedAssert,
  OnCompleteAction,
  Txn,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { abiCall, compileArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, MIN_PROGRAM_PAGES } from '../utils/constants'
import { errInvalidPayment } from './errors'
import { errNotAPrizeBox } from '../utils/errors'
import { getFunder } from '../utils/functions'

// CONTRACT IMPORTS
import { FactoryContract } from '../utils/base-contracts/factory'
import { PrizeBox } from './contract.algo'


@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class PrizeBoxFactory extends FactoryContract {

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    this.version.value = version
    this.childContractVersion.value = version
    this.akitaDAO.value = akitaDAO
  }

  // PRIZE BOX FACTORY METHODS --------------------------------------------------------------------

  mint(payment: gtxn.PaymentTxn, owner: Account): uint64 {

    const prizeBox = compileArc4(PrizeBox)

    // creation MBR stays with this factory while the box exists and is refunded to the
    // minter (payment sender) by `deletePrizeBox`; the box's own min balance goes to its owner
    const appMBR: uint64 = (
      MIN_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * prizeBox.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * prizeBox.globalBytes)
    )

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === appMBR + Global.minBalance, errInvalidPayment)

    const prizeBoxApp = prizeBox.call
      .create({
        args: [owner, { account: payment.sender, amount: appMBR }],
      })
      .itxn
      .createdApp

    itxn
      .payment({
        receiver: prizeBoxApp.address,
        amount: Global.minBalance,
      })
      .submit()

    return prizeBoxApp.id
  }

  /**
   * Delete an empty prize box (caller must be its owner). The box account closes to the owner;
   * the creation MBR this factory releases is refunded to the recorded minter.
   */
  deletePrizeBox(appId: Application): void {
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotAPrizeBox)
    const { account: receiver, amount } = getFunder(appId)

    abiCall<typeof PrizeBox.prototype.deleteApplication>({
      appId,
      args: [Txn.sender],
      onCompletion: OnCompleteAction.DeleteApplication,
    })

    this.refundReleased(receiver, amount, balanceBefore, minBefore, 0)
  }

  @abimethod({ readonly: true })
  mintCost(): uint64 {
    const prizeBox = compileArc4(PrizeBox)
    return (
      MIN_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * prizeBox.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * prizeBox.globalBytes) +
      Global.minBalance
    )
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  // TODO: create readonly methods
}
