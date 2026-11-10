import { Account, Application, Global, GlobalState, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { getSpendingAccount, rekeyAddress } from '../../utils/functions'
import { Principal } from '../../utils/principal'

// CONTRACT IMPORTS
import type { MockPrincipalProbe } from '../principal-probe/contract.algo'

/**
 * TEST-ONLY. A plugin with STANDING custody of an account `H` (like the router's leg escrow),
 * for E25/T42. `act` is compliant with §3.8 rule 3(a): it never sends as a wallet's spending
 * account when that account is `H`. `actUnsafe` omits the guard (negative control).
 * Never deploy outside tests.
 */
export class MockCustodyPlugin extends Contract {
  held = GlobalState<Account>({ key: 'held' })

  /** Record `held`, which must already be rekeyed to this app. */
  init(held: Account): void {
    const [auth] = op.AcctParams.acctAuthAddr(held)
    loggedAssert(auth === Global.currentApplicationAddress, 'errCsnh')
    this.held.value = held
  }

  /** Compliant: refuses to act as its standing-custody account. Rekeys the spender back to the wallet. */
  act(wallet: Application, probe: Application, hint: uint64): Principal {
    const sender = getSpendingAccount(wallet)
    loggedAssert(sender !== this.held.value, 'errCsgd')
    return abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      sender,
      args: [hint],
      rekeyTo: rekeyAddress(true, wallet),
    }).returnValue
  }

  /** NON-COMPLIANT negative control: sends as whatever `wallet.spending_address` names. */
  actUnsafe(wallet: Application, probe: Application, hint: uint64): Principal {
    const sender = getSpendingAccount(wallet)
    return abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      sender,
      args: [hint],
    }).returnValue
  }
}
