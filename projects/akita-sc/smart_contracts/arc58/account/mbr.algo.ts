import { abimethod, Bytes, Contract, Global, uint64 } from "@algorandfoundation/algorand-typescript";
import { AbstractAccountBoxMBRData } from "./types";
import { ARC58WalletIDsByAccountsMbr, NewCostForARC58 } from "../../escrow/constants";
import { abiCall } from "@algorandfoundation/algorand-typescript/arc4";

import type { AbstractedAccount } from "./contract.algo.ts";
import { BoxCostPerByte } from "../../utils/constants";
import { MethodRestrictionByteLength, MinAllowanceMBR, MinDomainKeysMBR, MinEscrowsMBR, MinExecutionsMBR, MinNamedPluginMBR, MinPluginMBR } from "./constants";

export class AbstractedAccountMBR extends Contract {

  private _calcBCPB(len: uint64): uint64 {
    return BoxCostPerByte * len
  }

  private pluginsMbr(escrow: string, methodCount: uint64): uint64 {
    return MinPluginMBR + this._calcBCPB((MethodRestrictionByteLength * methodCount) + Bytes(escrow).length)
  }

  private namedPluginsMbr(name: string): uint64 {
    return MinNamedPluginMBR + this._calcBCPB(Bytes(name).length)
  }

  private escrowsMbr(escrow: string): uint64 {
    return MinEscrowsMBR + this._calcBCPB(Bytes(escrow).length)
  }

  private allowancesMbr(escrow: string): uint64 {
    return MinAllowanceMBR + this._calcBCPB(Bytes(escrow).length)
  }

  private executionsMbr(groups: uint64): uint64 {
    return MinExecutionsMBR + this._calcBCPB(groups * 32)
  }

  private domainKeysMbr(domain: string): uint64 {
    return MinDomainKeysMBR + this._calcBCPB(Bytes(domain).length)
  }

  /**
  * Calculate the minimum balance requirements for various box operations
  *
  * @param escrow The escrow name to calculate MBR for
  * @param methodCount The number of method restrictions on the plugin
  * @param plugin The plugin name to calculate named plugin MBR for
  * @param groups The number of execution groups to calculate MBR for
  * @returns The MBR costs for plugins, named plugins, escrows, allowances, domain keys, executions, and new escrow creation
  */
  @abimethod({ readonly: true })
  mbr(
    appId: uint64,
    escrow: string,
    methodCount: uint64,
    plugin: string,
    groups: uint64,
  ): AbstractAccountBoxMBRData {
    const escrows = this.escrowsMbr(escrow)

    const escrowInfo = abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
      appId,
      args: [[escrow]]
    }).returnValue

    return {
      plugins: this.pluginsMbr(escrow, methodCount),
      namedPlugins: this.namedPluginsMbr(plugin),
      escrows,
      allowances: this.allowancesMbr(escrow),
      domainKeys: this.domainKeysMbr(plugin),
      executions: this.executionsMbr(groups),
      escrowExists: escrowInfo[0].address !== Global.zeroAddress,
      newEscrowMintCost: (
        NewCostForARC58 +
        Global.minBalance +
        ARC58WalletIDsByAccountsMbr +
        escrows
      )
    }
  }
}