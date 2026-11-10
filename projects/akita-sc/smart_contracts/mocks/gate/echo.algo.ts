import { Account, Bytes, bytes, Contract, gtxn, log, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GateCtx } from '../../utils/principal'

/**
 * TEST-ONLY sub-gate that echoes what the Gate forwards (principal-resolution spec §6.9, Q12).
 * It passes only when the filter's check args equal what it received:
 * - `check(caller, id, args)`: `args == caller` (32 bytes); logs `check`.
 * - `checkFor(ctx, id, args)`: `args == encodeArc4(ctx)` (72 bytes); logs `checkFor`.
 * So a test proves which call (and which subject) each filter got.
 */
export class MockEchoSubGate extends Contract {
  cost(args: bytes): uint64 {
    return 0
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    return 0
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    log(Bytes('check'))
    return args === caller.bytes
  }

  checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean {
    log(Bytes('checkFor'))
    return args === encodeArc4(ctx)
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return Bytes('')
  }
}
