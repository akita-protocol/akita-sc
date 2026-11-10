import { Account, Application, Bytes, bytes, contract, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { Principal } from '../../utils/principal'

// CONTRACT IMPORTS
import type { MockPrincipalProbe } from '../principal-probe/contract.algo'

/**
 * TEST-ONLY. A program installed INTO a genuine, factory-created ARC-58 wallet by its admin
 * (`UpdateApplication` through the wallet's `update(string)`), for the forged-wallet cases
 * T18–T22, T34, T35, T40, T41, T42 and T45–T47. The app keeps the factory as creator, so it passes
 * `isGenuineWallet`, but every global is now attacker-chosen. AVM 13, like the wallet (no program
 * version downgrade on update). No access control on purpose. Never deploy outside tests.
 */
@contract({ avmVersion: 13 })
export class MockForgedWallet extends Contract {
  @abimethod({ allowActions: ['UpdateApplication'] })
  update(version: string): void { }

  /** Extra resource slots for grouped calls. */
  opUp(): void { }

  /** A forger can also make a once-genuine wallet id disappear (stored pairs then name a deleted app). */
  @abimethod({ allowActions: ['DeleteApplication'] })
  destroy(): void { }

  setBytes(key: bytes, value: bytes): void {
    op.AppGlobal.put(key, value)
  }

  /** Type confusion: store a uint64 under a key consumers read as bytes (T35/T46). */
  setUint(key: bytes, value: uint64): void {
    op.AppGlobal.put(key, value)
  }

  del(key: bytes): void {
    op.AppGlobal.delete(key)
  }

  setAkitaDAO(dao: uint64): void {
    op.AppGlobal.put(Bytes('akita_dao'), dao)
  }

  /** Direct-arm call: `probe.probe(hint)` sent as `sender` (this app's address, or an account rekeyed to it). */
  callProbeAs(probe: Application, hint: uint64, sender: Account): Principal {
    return abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      sender,
      args: [hint],
    }).returnValue
  }

  /** Direct-arm call of the non-reverting `probe.tryProbe(hint)` (T35). */
  callTryProbeAs(probe: Application, hint: uint64, sender: Account): Principal {
    return abiCall<typeof MockPrincipalProbe.prototype.tryProbe>({
      appId: probe,
      sender,
      args: [hint],
    }).returnValue
  }
}
