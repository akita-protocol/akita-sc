import { Application, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'

// CONTRACT IMPORTS
import type { TestPrincipalPlugin } from '../principal-plugin/contract.algo'

/**
 * TEST-ONLY (V0.2/T23). Reached mid-window from `TestPrincipalPlugin.callReenter`, it tries to
 * borrow the open window by calling the plugin again with a forged wallet. The AVM forbids calling
 * an app that is already on the call stack. Never deploy outside tests.
 */
export class MockPrincipalReenter extends Contract {
  poke(plugin: Application, forgedWallet: uint64, probe: Application): void {
    abiCall<typeof TestPrincipalPlugin.prototype.callProbe>({
      appId: plugin,
      args: [Application(forgedWallet), false, probe, forgedWallet],
    })
  }
}
