import { Application, Global, gtxn, itxn, loggedAssert, uint64 } from "@algorandfoundation/algorand-typescript";
import { Contract } from "@algorandfoundation/algorand-typescript/arc4";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";
import { ERR_INVALID_PAYMENT } from "./errors";
import { CreateAssetParams } from "./types";

export class AsaMintPlugin extends Contract {

  /**
   * No-op method used to pool additional opcode budget into a minting group.
   * ABI signature: `opUp()void`. Callers invoking `mint` on a non-trivial
   * batch need more than the default per-program opcode budget to parse the
   * ABI-encoded tuple array; adding extra app calls against this method
   * contributes ~700 budget each to the group's pool.
   */
  opUp(): void { }

  mint(
    wallet: Application,
    rekeyBack: boolean,
    assets: CreateAssetParams[],
    mbrPayment: gtxn.PaymentTxn
  ): uint64[] {
    const sender = getSpendingAccount(wallet)

    loggedAssert(mbrPayment.receiver === sender, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount === Global.assetCreateMinBalance * assets.length, ERR_INVALID_PAYMENT)

    let assetsCreated: uint64[] = [];
    for (let i: uint64 = 0; i < assets.length; i++) {
      const {
        assetName,
        unitName,
        total,
        decimals,
        manager,
        reserve,
        freeze,
        clawback,
        defaultFrozen,
        url
      } = assets[i];

      const createTxn = itxn
        .assetConfig({
          sender,
          assetName,
          unitName,
          total,
          decimals,
          manager,
          reserve,
          freeze,
          clawback,
          defaultFrozen,
          url,
          rekeyTo: i < (assets.length - 1) ? Global.zeroAddress : rekeyAddress(rekeyBack, wallet)
        })
        .submit()

      assetsCreated.push(createTxn.createdAsset.id);
    }

    return assetsCreated
  }
}
