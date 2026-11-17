import { Account, Application, Contract, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall } from '@algorandfoundation/algorand-typescript/arc4'

import { getSpendingAccount, rekeyAddress } from '../../utils/functions'
import type { AbstractedAccount } from './contract.algo'

/**
 * Test-only ARC-58 plugin with two distinct, harmless ABI selectors.
 *
 * Both methods perform a zero-value self-payment and restore wallet authority.
 * Keeping the effects identical lets the conformance suite isolate method
 * allowlisting from payment and asset semantics.
 *
 * `removeGrant` is the hostile case: from inside its own window it asks the wallet,
 * as the spending account, to remove a plugin grant. The wallet must refuse.
 */
export class Arc58AgentProbePlugin extends Contract {
  allowed(wallet: Application, rekeyBack: boolean): void {
    const spendingAccount = getSpendingAccount(wallet)

    itxn
      .payment({
        sender: spendingAccount,
        receiver: spendingAccount,
        amount: 0,
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
      .submit()
  }

  forbidden(wallet: Application, rekeyBack: boolean): void {
    const spendingAccount = getSpendingAccount(wallet)

    itxn
      .payment({
        sender: spendingAccount,
        receiver: spendingAccount,
        amount: 0,
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
      .submit()
  }

  removeGrant(wallet: Application, rekeyBack: boolean, plugin: uint64, caller: Account, escrow: string): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_removePlugin>({
      sender: getSpendingAccount(wallet),
      appId: wallet,
      args: [plugin, caller, escrow],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }
}
