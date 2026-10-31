import {
  Application,
  Asset,
  Bytes,
  Contract,
  Global,
  GlobalState,
  loggedAssert,
  op,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'

/** read the lender's `rate` global (MockLender) */
export const ValuatorModeLender: uint64 = 0
/** return the configured `value` (0 = unavailable) */
export const ValuatorModeFixed: uint64 = 1
/** revert every call */
export const ValuatorModeRevert: uint64 = 2

/**
 * Test-only valuator (FINAL-SPEC §3.6, §4.12 external.e2e): reports a MockLender's exchange rate by
 * reading its `rate` global directly (no inner call), or a fixed value, or reverts. In lender mode it
 * returns 0 (unavailable) for any receipt/underlying pair other than the lender's own. In both answering
 * modes it returns 0 for a receipt with a clawback or freeze address (the approval checklist rule of
 * valuator-interface.ts, OPEN-DECISIONS #6). Has an UpdateApplication path so tests can bump its version
 * (valuator pinning).
 */
export class MockValuator extends Contract {
  lender = GlobalState<Application>({ key: 'lender' })
  mode = GlobalState<uint64>({ key: 'mode' })
  value = GlobalState<uint64>({ key: 'value' })

  @abimethod({ onCreate: 'require' })
  create(lender: Application): void {
    this.lender.value = lender
    this.mode.value = ValuatorModeLender
    this.value.value = 0
  }

  @abimethod({ allowActions: 'UpdateApplication' })
  update(): void {}

  configure(mode: uint64, value: uint64): void {
    this.mode.value = mode
    this.value.value = value
  }

  /** underlying base units per 1 receipt base unit × RateScale; 0 = unavailable */
  @abimethod({ readonly: true })
  akitaDexRate(receipt: uint64, underlying: uint64): uint64 {
    loggedAssert(this.mode.value !== ValuatorModeRevert, 'errVlRv')
    // approval checklist: a receipt that can be clawed back or frozen is never valued
    const asset = Asset(receipt)
    if (asset.clawback !== Global.zeroAddress || asset.freeze !== Global.zeroAddress) {
      return 0
    }
    if (this.mode.value === ValuatorModeFixed) {
      return this.value.value
    }
    // a valuator answers only for the receipt/underlying pair it was approved for (FINAL-SPEC §3.6 checklist)
    const lender = this.lender.value
    const [knownReceipt] = op.AppGlobal.getExUint64(lender, Bytes('receipt'))
    const [knownUnderlying] = op.AppGlobal.getExUint64(lender, Bytes('underlying'))
    if (receipt !== knownReceipt || underlying !== knownUnderlying) {
      return 0
    }
    const [rate, exists] = op.AppGlobal.getExUint64(lender, Bytes('rate'))
    return exists ? rate : 0
  }
}
