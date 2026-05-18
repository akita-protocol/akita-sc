import { Application, GlobalState, itxn, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { GateArgs, GateFilter } from "../../../gates/types";
import { getSpendingAccount, rekeyAddress } from "../../../utils/functions";

// CONTRACT IMPORTS
import { BaseGate } from "../../../gates/base";
import { Gate } from "../../../gates/contract.algo";


export const GatePluginGlobalStateKeyGateAppID = 'gate_app_id'

export class GatePlugin extends BaseGate {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  gateAppID = GlobalState<Application>({ key: GatePluginGlobalStateKeyGateAppID })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(gateAppID: uint64): void {
    this.gateAppID.value = Application(gateAppID)
  }

  // GATE PLUGIN METHODS --------------------------------------------------------------------------

  register(
    wallet: Application,
    rekeyBack: boolean,
    filters: GateFilter[],
    args: GateArgs
  ): void {
    const sender = getSpendingAccount(wallet)
    const amount = abiCall<typeof Gate.prototype.cost>({
      appId: this.gateAppID.value,
      args: [filters, args],
    }).returnValue

    abiCall<typeof Gate.prototype.register>({
      sender,
      appId: this.gateAppID.value,
      args: [
        itxn.payment({
          sender,
          receiver: this.gateAppID.value.address,
          amount,
        }),
        filters,
        args,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
