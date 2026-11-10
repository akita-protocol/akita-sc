import { Account, Bytes, bytes, Contract, gtxn, uint64 } from "@algorandfoundation/algorand-typescript"
import { abimethod } from "@algorandfoundation/algorand-typescript/arc4"
import { GateCtx } from "../utils/principal"

export class MockGate extends Contract {

  cost(arg: bytes): uint64 {
    return 0
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    return 0
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    return false
  }

  /**
   * Context-aware sub-gate interface (spec §6.9): `ctx` is the first hop's verified
   * `(principal, wallet, spender)`, forwarded by Gate v2 `checkFor` / `mustCheckFor` to sub-gates
   * allowlisted with `ctxAware = true`. Must return false (never revert) for a well-formed call it
   * cannot satisfy.
   */
  checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean {
    return false
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return Bytes('')
  }
}