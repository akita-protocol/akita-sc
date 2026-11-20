import { Application, itxn, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { GateArgs, GateFilter } from "../../../gates/types";
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions";
import { getAkitaAppList } from "../../../utils/functions";

// CONTRACT IMPORTS
import type { Gate } from "../../../gates/contract.algo";
import { AkitaBaseContract } from "../../../utils/base-contracts/upgradeable";


/**
 * Gate plugin v2: registers composite gates from an ARC-58 wallet.
 *
 * Resolves the canonical Gate app from the DAO registry on every call (audit SG-16), so a
 * Gate redeploy only needs a DAO registry update, not a plugin redeploy. The Gate app
 * itself enforces the sub-gate allowlist and per-filter cost cap, which bounds how much the
 * wallet can be charged.
 */
export class GatePlugin extends AkitaBaseContract {

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(akitaDAO: uint64, version: string): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // GATE PLUGIN METHODS --------------------------------------------------------------------------

  register(
    wallet: Application,
    rekeyBack: boolean,
    filters: GateFilter[],
    args: GateArgs
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    const gate = Application(getAkitaAppList(this.akitaDAO.value).gate)

    const amount = abiCall<typeof Gate.prototype.cost>({
      sender,
      appId: gate,
      args: [filters, args],
    }).returnValue

    return abiCall<typeof Gate.prototype.register>({
      sender,
      appId: gate,
      args: [
        itxn.payment({
          sender,
          receiver: gate.address,
          amount,
        }),
        filters,
        args,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    }).returnValue
  }
}
