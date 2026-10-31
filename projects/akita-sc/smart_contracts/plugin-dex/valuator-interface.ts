import { Contract, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.6).

/**
 * Read-only rate source for an external-position receipt ASA.
 *
 * Approval checklist: the valuator must read a manipulation-resistant source, meaning a monotone
 * exchange rate such as a lending index or LST rate. It must not read an AMM spot price. Its code must
 * be immutable. The Vault pins its version (`rejectVersion = approvedVersion + 1`).
 *
 * Receipt rule (OPEN-DECISIONS #6): the valuator must answer 0 for a receipt ASA whose clawback or freeze
 * address is non-zero, so `createPool` fails with errPdva for such a slot (a zero clawback or freeze address
 * can never be set again, so the check at creation holds for the pool's life). A clawback could take receipts out
 * of the escrow (leaving it below `slot.units`) and a freeze would make the in-kind payout fail; either would
 * break in-kind exits, including `emergencyRemoveLiquidity`. The Vault does not check this itself, to stay
 * venue-agnostic; the check belongs in the valuator's code and is part of its approval.
 */
export class PluginDexValuator extends Contract {
  /** underlying base units per 1 receipt base unit × RateScale; 0 = unavailable. Deterministic, read-only. */
  @abimethod({ readonly: true })
  akitaDexRate(receipt: uint64, underlying: uint64): uint64 {
    return 0
  }
}
