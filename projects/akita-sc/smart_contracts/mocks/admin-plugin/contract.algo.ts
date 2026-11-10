import { Account, Application } from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { rekeyBackIfNecessary } from '../../utils/functions'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../arc58/account/contract.algo'

/**
 * TEST-ONLY (ACC-06 / A-4). An admin-privileged plugin that changes the wallet admin through
 * `arc58_pluginChangeAdmin` (the recovery path). Never deploy outside tests: it has no
 * authorization of its own.
 */
export class MockAdminPlugin extends Contract {
  changeAdmin(wallet: Application, rekeyBack: boolean, newAdmin: Account): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_pluginChangeAdmin>({
      appId: wallet,
      args: [newAdmin],
    })
    rekeyBackIfNecessary(rekeyBack, wallet)
  }
}
