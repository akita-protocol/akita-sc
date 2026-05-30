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
import { btoi, itob, Txn } from '@algorandfoundation/algorand-typescript/op'
import { getSpendingAccount, rekeyAddress } from '../../../utils/functions'
import {
  ERR_INVALID_BENEFICIARY,
  ERR_INVALID_FUNDING,
  ERR_INVALID_MIN_OUTPUT,
  ERR_INVALID_OUTPUT_ASSET,
  ERR_INVALID_RECEIVER_ARG,
  ERR_INVALID_ROUTER,
  ERR_INVALID_ROUTER_CALL,
} from './errors'
import {
  HaystackRouterPluginGlobalStateKeyReferrer,
  HaystackRouterPluginGlobalStateKeyReferrerTreasury,
  HaystackRouterPluginGlobalStateKeyRouter,
  HaystackRouterPluginGlobalStateKeyRouterMethod,
} from './constants'

const FINALIZE_ASSET_OUT_ARG_INDEX: uint64 = 2
const FINALIZE_MIN_AMOUNT_OUT_ARG_INDEX: uint64 = 4
const FINALIZE_BENEFICIARY_ARG_INDEX: uint64 = 6
const FINALIZE_REFERER_ARG_INDEX: uint64 = 8

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
    outputAsset: uint64,
    minOutputAmount: uint64,
  ): void {
    let foundRouterCall = false

    for (let i: uint64 = Txn.groupIndex + 1; i < Global.groupSize; i += 1) {
      const txn = gtxn.Transaction(i)

      if (txn.type !== TransactionType.ApplicationCall || txn.appId !== this.router.value) {
        continue
      }

      const routerCall = gtxn.ApplicationCallTxn(i)

      loggedAssert(routerCall.onCompletion === OnCompleteAction.NoOp, ERR_INVALID_ROUTER_CALL)
      loggedAssert(routerCall.numAppArgs > 0, ERR_INVALID_ROUTER_CALL)

      if (routerCall.appArgs(0) !== this.routerMethod.value) {
        continue
      }

      loggedAssert(routerCall.numAppArgs > FINALIZE_REFERER_ARG_INDEX, ERR_INVALID_ROUTER_CALL)
      loggedAssert(this.getAccountRef(routerCall, FINALIZE_BENEFICIARY_ARG_INDEX) === sender, ERR_INVALID_RECEIVER_ARG)
      loggedAssert(
        routerCall.assets(btoi(routerCall.appArgs(FINALIZE_ASSET_OUT_ARG_INDEX))).id === outputAsset,
        ERR_INVALID_OUTPUT_ASSET,
      )
      loggedAssert(routerCall.appArgs(FINALIZE_MIN_AMOUNT_OUT_ARG_INDEX) === itob(minOutputAmount), ERR_INVALID_MIN_OUTPUT)
      loggedAssert(this.getAccountRef(routerCall, FINALIZE_REFERER_ARG_INDEX) === this.referrer.value, ERR_INVALID_BENEFICIARY)

      foundRouterCall = true
    }

    loggedAssert(foundRouterCall, ERR_INVALID_ROUTER)
  }

  private getAccountRef(routerCall: gtxn.ApplicationCallTxn, appArgIndex: uint64): Account {
    const accountIndex = btoi(routerCall.appArgs(appArgIndex))

    return routerCall.accounts(accountIndex)
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
    loggedAssert(amount > 0, ERR_INVALID_FUNDING)
    this.assertRouterCall(
      sender,
      outputAsset,
      minOutputAmount,
    )

    if (asset === 0) {
      itxn
        .payment({
          sender,
          receiver: this.router.value.address,
          amount,
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
        .submit()
    } else {
      itxn
        .assetTransfer({
          sender,
          assetReceiver: this.router.value.address,
          assetAmount: amount,
          xferAsset: asset,
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
        .submit()
    }
  }

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
