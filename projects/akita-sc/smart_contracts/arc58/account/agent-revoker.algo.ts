import { Account, Application, Contract, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall } from '@algorandfoundation/algorand-typescript/arc4'
import type { AbstractedAccount } from './contract.algo'

/**
 * Test-only revocation authority used by the ARC-58 agent conformance suite.
 *
 * A revocation authority must originate its wallet call from an application
 * address. This forwarding contract keeps that boundary observable without
 * coupling the generic conformance suite to DAO governance setup.
 */
export class Arc58AgentRevoker extends Contract {
  revokePlugin(wallet: Application, plugin: uint64, caller: Account, escrow: string): void {
    abiCall<typeof AbstractedAccount.prototype.arc58_removePlugin>({
      appId: wallet,
      args: [plugin, caller, escrow],
    })
  }
}
