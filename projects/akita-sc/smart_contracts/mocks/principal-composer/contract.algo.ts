import { Application, itxnCompose, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { Contract, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { CallerTypeOther } from '../../arc58/account/types'
import { Principal } from '../../utils/principal'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../../arc58/account/contract.algo'
import type { TestPrincipalPlugin } from '../principal-plugin/contract.algo'

/**
 * TEST-ONLY (E21/T37, V0.4). Opens a window by inner composition (pattern of
 * mocks/inner-wallet-caller), using a grant whose caller is this app:
 * [wallet.arc58_rekeyToPlugin(plugin), plugin.callProbe(hintInWindow, true, probe, hintInWindow),
 *  wallet.arc58_verifyAuthAddress]. With `hintInWindow != wallet` the wallet's window pinning
 * rejects the plugin call (`errIsvl`). Never deploy outside tests.
 */
export class MockPrincipalComposer extends Contract {
  compose(wallet: Application, plugin: Application, probe: Application, hintInWindow: uint64): Principal {
    itxnCompose.begin<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>({
      appId: wallet,
      args: [plugin.id, CallerTypeOther, '', [], []],
    })
    itxnCompose.next<typeof TestPrincipalPlugin.prototype.callProbe>({
      appId: plugin,
      args: [Application(hintInWindow), true, probe, hintInWindow],
    })
    itxnCompose.next<typeof AbstractedAccount.prototype.arc58_verifyAuthAddress>({
      appId: wallet,
    })
    itxnCompose.submit()
    return decodeArc4<Principal>(op.GITxn.lastLog(1), 'log')
  }
}
