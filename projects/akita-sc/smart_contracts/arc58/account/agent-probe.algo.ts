import { Application, Contract, itxn } from '@algorandfoundation/algorand-typescript'

import { getSpendingAccount, rekeyAddress } from '../../utils/functions'

/**
 * Test-only ARC-58 plugin with two distinct, harmless ABI selectors.
 *
 * Both methods perform a zero-value self-payment and restore wallet authority.
 * Keeping the effects identical lets the conformance suite isolate method
 * allowlisting from payment and asset semantics.
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
}
