import { Application, Contract, Global, itxn, uint64, abimethod, contract } from "@algorandfoundation/algorand-typescript";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";
import { PayParams } from "./types";

@contract({ ui: { glyph: 'ArrowUp', color: '#FF8A1F', defaultAction: 'send' } })
export class PayPlugin extends Contract {

  @abimethod({ ui: { action: 'send', glyph: 'ArrowUp', label: 'Send' } })
  pay(wallet: Application, rekeyBack: boolean, payments: PayParams[]): void {
    const sender = getSpendingAccount(wallet)

    for (let i: uint64 = 0; i < payments.length; i++) {
      const { receiver, asset, amount } = payments[i];

      if (asset === 0) {
        itxn
          .payment({
            sender,
            receiver,
            amount,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      } else {
        itxn
          .assetTransfer({
            sender,
            assetReceiver: receiver,
            assetAmount: amount,
            xferAsset: asset,
            rekeyTo: i < (payments.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet),
          })
          .submit()
      }
    }
  }
}
