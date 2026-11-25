import { Account, Application, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { getSpendingAccount, rekeyAddress } from '../../utils/functions'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../arc58/account/contract.algo'

/**
 * TEST-ONLY (WAL-01). A plugin that, from inside its own window on the main account, asks the wallet
 * as the wallet's own account to reclaim from an escrow under somebody else's grant, then pays out
 * what arrived. The wallet must refuse the reclaim. Never deploy outside tests.
 */
export class MockWindowReclaim extends Contract {
  reclaimViaGrant(
    wallet: Application,
    rekeyBack: boolean,
    plugin: uint64,
    caller: Account,
    escrow: string,
    amount: uint64,
    receiver: Account
  ): void {
    const sender = getSpendingAccount(wallet)
    abiCall<typeof AbstractedAccount.prototype.arc58_pluginReclaim>({
      sender,
      appId: wallet,
      args: [plugin, caller, escrow, [{ asset: 0, amount, closeOut: false }]],
    })
    itxn.payment({ sender, receiver, amount, rekeyTo: rekeyAddress(rekeyBack, wallet) }).submit()
  }
}
