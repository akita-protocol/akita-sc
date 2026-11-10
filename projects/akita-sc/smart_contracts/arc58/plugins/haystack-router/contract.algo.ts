import {
  Account,
  Application,
  bytes,
  Contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  OnCompleteAction,
  TransactionType,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { extract, extractUint16, extractUint64, itob, Txn } from '@algorandfoundation/algorand-typescript/op'
import { getSpendingAccount, rekeyAddress } from '../../../utils/functions'
import {
  errInvalidBeneficiary,
  errInvalidFunding,
  errInvalidMinOutput,
  errInvalidOutputAsset,
  errInvalidReceiverArg,
  errInvalidRouter,
  errInvalidRouterCall,
} from './errors'
import {
  HaystackRouterPluginGlobalStateKeyReferrer,
  HaystackRouterPluginGlobalStateKeyReferrerTreasury,
  HaystackRouterPluginGlobalStateKeyRouter,
  HaystackRouterPluginGlobalStateKeyRouterMethod,
} from './constants'

/**
 * Haystack's route call (ORDER_ROUTER v4, MainNet app 3757715482, method 871a0354), decoded from the live API's
 * routes and the router's program:
 *   arg 1  uint16 length, then uint64 asset ids: [0] the input asset, [1] the output asset (ALGO = 0)
 *   arg 4  93 bytes: uint16, uint64 minAmountOut (at 2), uint64 expected output (at 10), uint16 fee bps,
 *          uint64, byte, beneficiary address (at 29), referrer address (at 61)
 */
const FINALIZE_ASSETS_ARG_INDEX: uint64 = 1
const FINALIZE_TERMS_ARG_INDEX: uint64 = 4
const FINALIZE_TERMS_LENGTH: uint64 = 93
const FINALIZE_TERMS_MIN_OUTPUT_OFFSET: uint64 = 2
const FINALIZE_TERMS_BENEFICIARY_OFFSET: uint64 = 29
const FINALIZE_TERMS_REFERRER_OFFSET: uint64 = 61

export class HaystackRouterPlugin extends Contract {

  router = GlobalState<Application>({ key: HaystackRouterPluginGlobalStateKeyRouter })

  routerMethod = GlobalState<bytes<4>>({ key: HaystackRouterPluginGlobalStateKeyRouterMethod })

  referrer = GlobalState<Account>({ key: HaystackRouterPluginGlobalStateKeyReferrer })

  referrerTreasury = GlobalState<Application>({ key: HaystackRouterPluginGlobalStateKeyReferrerTreasury })

  @abimethod({ onCreate: 'require' })
  create(router: Application, routerMethod: bytes<4>, referrer: Account, referrerTreasury: Application): void {
    this.router.value = router
    this.routerMethod.value = routerMethod
    this.referrer.value = referrer
    this.referrerTreasury.value = referrerTreasury
  }

  private assertRouterCall(
    sender: Account,
    asset: uint64,
    outputAsset: uint64,
    minOutputAmount: uint64,
    fundingTxnIndex: uint64,
  ): void {
    let foundRouterCall = false

    for (let i: uint64 = Txn.groupIndex + 1; i < Global.groupSize; i += 1) {
      const txn = gtxn.Transaction(i)

      if (txn.type !== TransactionType.ApplicationCall || txn.appId !== this.router.value) {
        continue
      }

      const routerCall = gtxn.ApplicationCallTxn(i)

      loggedAssert(routerCall.onCompletion === OnCompleteAction.NoOp, errInvalidRouterCall)
      loggedAssert(routerCall.numAppArgs > 0, errInvalidRouterCall)

      if (routerCall.appArgs(0) !== this.routerMethod.value) {
        continue
      }

      loggedAssert(i > fundingTxnIndex, errInvalidFunding)
      loggedAssert(routerCall.numAppArgs > FINALIZE_TERMS_ARG_INDEX, errInvalidRouterCall)

      const assets = routerCall.appArgs(FINALIZE_ASSETS_ARG_INDEX)
      loggedAssert(assets.length >= 18 && extractUint16(assets, 0) >= 2, errInvalidRouterCall)
      loggedAssert(extractUint64(assets, 2) === asset, errInvalidFunding)
      loggedAssert(extractUint64(assets, 10) === outputAsset, errInvalidOutputAsset)

      const terms = routerCall.appArgs(FINALIZE_TERMS_ARG_INDEX)
      loggedAssert(terms.length === FINALIZE_TERMS_LENGTH, errInvalidRouterCall)
      loggedAssert(extract(terms, FINALIZE_TERMS_MIN_OUTPUT_OFFSET, 8) === itob(minOutputAmount), errInvalidMinOutput)
      loggedAssert(extract(terms, FINALIZE_TERMS_BENEFICIARY_OFFSET, 32) === sender.bytes, errInvalidReceiverArg)
      loggedAssert(extract(terms, FINALIZE_TERMS_REFERRER_OFFSET, 32) === this.referrer.value.bytes, errInvalidBeneficiary)

      foundRouterCall = true
    }

    loggedAssert(foundRouterCall, errInvalidRouter)
  }

  private findFundingTxnIndex(asset: uint64, amount: uint64): uint64 {
    let fundingTxnIndex = Global.groupSize

    for (let i: uint64 = Txn.groupIndex + 1; i < Global.groupSize; i += 1) {
      const funding = gtxn.Transaction(i)

      // Inputs after the next call to this plugin belong to that call, so each input funds one swap.
      if (funding.type === TransactionType.ApplicationCall && funding.appId === Global.currentApplicationId) {
        break
      }

      if (asset === 0 && funding.type === TransactionType.Payment) {
        const payment = gtxn.PaymentTxn(i)
        if (payment.receiver !== this.router.value.address || payment.amount !== amount) {
          continue
        }
        loggedAssert(payment.closeRemainderTo === Global.zeroAddress, errInvalidFunding)
      } else if (asset !== 0 && funding.type === TransactionType.AssetTransfer) {
        const transfer = gtxn.AssetTransferTxn(i)
        if (transfer.assetReceiver !== this.router.value.address || transfer.xferAsset.id !== asset || transfer.assetAmount !== amount) {
          continue
        }
        loggedAssert(transfer.assetSender === Global.zeroAddress, errInvalidFunding)
        loggedAssert(transfer.assetCloseTo === Global.zeroAddress, errInvalidFunding)
      } else {
        continue
      }

      loggedAssert(funding.rekeyTo === Global.zeroAddress, errInvalidFunding)
      // A second matching input would make the intended funding ambiguous.
      loggedAssert(fundingTxnIndex === Global.groupSize, errInvalidFunding)
      fundingTxnIndex = i
    }

    loggedAssert(fundingTxnIndex < Global.groupSize, errInvalidFunding)
    return fundingTxnIndex
  }

  private executeSwap(
    sender: Account,
    rekeyBack: boolean,
    wallet: Application,
    asset: uint64,
    amount: uint64,
    outputAsset: uint64,
    minOutputAmount: uint64,
  ): void {
    loggedAssert(amount > 0, errInvalidFunding)
    const fundingTxnIndex = this.findFundingTxnIndex(asset, amount)
    // The recipient is necessarily the sender of the matching router input.
    const fundingAccount = gtxn.Transaction(fundingTxnIndex).sender
    this.assertRouterCall(
      sender,
      asset,
      outputAsset,
      minOutputAmount,
      fundingTxnIndex,
    )

    if (asset === 0) {
      itxn
        .payment({
          sender,
          receiver: fundingAccount,
          amount,
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
        .submit()
    } else {
      itxn
        .assetTransfer({
          sender,
          assetReceiver: fundingAccount,
          assetAmount: amount,
          xferAsset: asset,
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
        .submit()
    }
  }

  /**
   * Find Haystack's outer input transaction and fund its sender.
   * Keep the Haystack route intact after the wallet and plugin calls; its output beneficiary
   * must still be the wallet's spending account.
   */
  swap(
    wallet: Application,
    rekeyBack: boolean,
    asset: uint64,
    amount: uint64,
    outputAsset: uint64,
    minOutputAmount: uint64,
  ): void {
    this.executeSwap(
      getSpendingAccount(wallet),
      rekeyBack,
      wallet,
      asset,
      amount,
      outputAsset,
      minOutputAmount,
    )
  }
}
