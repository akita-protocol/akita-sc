import { Application, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { Principal } from '../../utils/principal'

// CONTRACT IMPORTS
import type { MockPrincipalProxy } from '../principal-proxy/contract.algo'

/**
 * TEST-ONLY. An unrelated app that drives a proxy with a forged wallet (E25/T41):
 * `proxy.forward(forgedWallet, probe, forgedWallet, true)`. Works against any proxy with the
 * `forward(uint64,uint64,uint64,bool)` ABI. Never deploy outside tests.
 */
export class MockY extends Contract {
  callProxy(proxy: Application, forgedWallet: uint64, probe: Application): Principal {
    return abiCall<typeof MockPrincipalProxy.prototype.forward>({
      appId: proxy,
      args: [forgedWallet, probe, forgedWallet, true],
    }).returnValue
  }
}
