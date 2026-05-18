import { abimethod, Application, Bytes, GlobalState, itxn, itxnCompose, loggedAssert, op, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4';
import { getSpendingAccount, rekeyAddress } from '../../../utils/functions';
import { DualStakeGlobalStateKeyAsaID, DualStakeGlobalStateKeyRatePrecision, DualStakePluginGlobalStateKey, DualStakePluginGlobalStateKeyLSTID } from './constants';
import { ERR_NOT_A_DUALSTAKE_APP, ERR_NOT_ENOUGH_OF_ASA } from './errors';

// CONTRACT IMPORTS
import type { DualStake } from '../../../utils/types/dual-stake';


export class DualStakePlugin extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registry = GlobalState<Application>({ key: DualStakePluginGlobalStateKey })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(registry: uint64): void {
    this.registry.value = Application(registry)
  }

  // DUAL STAKE PLUGIN METHODS --------------------------------------------------------------------

  mint(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    amount: uint64
  ): void {
    const sender = getSpendingAccount(wallet)

    loggedAssert(this.registry.value.address === appId.creator, ERR_NOT_A_DUALSTAKE_APP)

    itxnCompose.begin(
      itxn.payment({
        sender,
        receiver: appId.address,
        amount: amount
      })
    )

    const rate = abiCall<typeof DualStake.prototype.get_rate>({ sender, appId }).returnValue

    if (rate > 0) {

      itxnCompose.next<typeof DualStake.prototype.mint>({
        sender,
        appId
      })

      // https://docs.myth.finance/dualSTAKE/rate
      const asaID = op.AppGlobal.getExUint64(appId, Bytes(DualStakeGlobalStateKeyAsaID))[0]
      const precision = op.AppGlobal.getExUint64(appId, Bytes(DualStakeGlobalStateKeyRatePrecision))[0]
      const asaAmount: uint64 = op.divw(...op.mulw(amount, rate), precision) + 1

      const [holdings, isOptedIn] = op.AssetHolding.assetBalance(sender, asaID)
      loggedAssert(isOptedIn && holdings >= asaAmount, ERR_NOT_ENOUGH_OF_ASA)

      itxnCompose.next(
        itxn.assetTransfer({
          sender,
          assetReceiver: appId.address,
          assetAmount: asaAmount,
          xferAsset: asaID,
          rekeyTo: rekeyAddress(rekeyBack, wallet)
        })
      )

      itxnCompose.submit()
      return
    }

    // if the rate is 0 we can skip the asset transfer
    // which means we need to set the rekeyTo on the mint txn
    itxnCompose.next<typeof DualStake.prototype.mint>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })

    itxnCompose.submit()
  }

  redeem(wallet: Application, rekeyBack: boolean, appId: Application, amount: uint64): void {
    const sender = getSpendingAccount(wallet)

    loggedAssert(this.registry.value.address === appId.creator, ERR_NOT_A_DUALSTAKE_APP)
    
    const dualStakeTokenId: uint64 = op.AppGlobal.getExUint64(appId, Bytes(DualStakePluginGlobalStateKeyLSTID))[0]

    itxn
      .assetTransfer({
        sender,
        assetReceiver: appId.address,
        assetAmount: amount,
        xferAsset: dualStakeTokenId,
      })
      .submit()
    
    abiCall<typeof DualStake.prototype.redeem>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
