import { Application, Global, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { getSpendingAccount } from '../../utils/functions'
import { Principal } from '../../utils/principal'

// CONTRACT IMPORTS
import type { MockPrincipalProbe } from '../principal-probe/contract.algo'

/**
 * TEST-ONLY, NON-COMPLIANT proxy B (E9/E25, T14/T41). Sends `probe.probe(hint)` as
 * `getSpendingAccount(wallet)` and hands that account to its caller only when `rekeyBack`.
 * With `rekeyBack = false` it KEEPS the account, which violates the custody rule
 * (docs/principal-resolution/STANDARD.md, §3.8 rule 3(b)): afterwards any app can call `forward`
 * with a forged wallet whose `spending_address` is that account. Never deploy outside tests.
 */
export class MockPrincipalProxy extends Contract {
  forward(wallet: uint64, probe: Application, hint: uint64, rekeyBack: boolean): Principal {
    const sender = getSpendingAccount(Application(wallet))
    return abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      sender,
      args: [hint],
      rekeyTo: rekeyBack ? Global.callerApplicationAddress : Global.zeroAddress,
    }).returnValue
  }
}

/**
 * TEST-ONLY, COMPLIANT twin of `MockPrincipalProxy`: it always hands the spending account back to
 * the calling app in the same call and asserts it did (§3.8 rule 3(b)). `rekeyBack` is ignored.
 */
export class MockCompliantProxy extends Contract {
  forward(wallet: uint64, probe: Application, hint: uint64, rekeyBack: boolean): Principal {
    const sender = getSpendingAccount(Application(wallet))
    const result = abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      sender,
      args: [hint],
      rekeyTo: Global.callerApplicationAddress,
    }).returnValue
    const [auth] = op.AcctParams.acctAuthAddr(sender)
    loggedAssert(auth === Global.callerApplicationAddress, 'errPxhb')
    return result
  }
}
