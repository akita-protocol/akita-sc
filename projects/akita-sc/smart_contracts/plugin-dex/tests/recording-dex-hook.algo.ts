import {
  Application,
  BoxMap,
  Bytes,
  bytes,
  clone,
  Contract,
  Global,
  GlobalState,
  loggedAssert,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { HookPointAfterInitialize } from '../constants'
import { passResult, rekeyBackToDex, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

/** What the hook saw at one point: its own ALGO balance at the time of the call, and the full context */
export type HookRecord = {
  balance: uint64
  ctx: HookContext
}

/**
 * Test-only hook (FINAL-SPEC §2.2, §4.12 tests 2 and 9) that records, per hook point, the last
 * HookContext it received (caller, callerApp, recipient, data, ...) and its own balance at that
 * moment, so tests can check F6 funding/initData and the quote identity rules. It rejects the
 * initData 'reject' at AfterInitialize, and hands custody straight back when it is a custody hook.
 * Box MBR for the records comes from its F6 funding (or a direct top-up).
 */
export class RecordingDexHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  calls = GlobalState<uint64>({ key: 'calls' })
  records = BoxMap<uint64, bytes>({ keyPrefix: 'r' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application): void {
    this.dex.value = dex
    this.calls.value = 0
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    this.calls.value += 1
    if (ctx.point === HookPointAfterInitialize) {
      loggedAssert(ctx.data !== Bytes('reject'), 'errRecInit')
    }
    const record: HookRecord = { balance: Global.currentApplicationAddress.balance, ctx: clone(ctx) }
    if (this.records(ctx.point).exists) {
      this.records(ctx.point).delete()
    }
    this.records(ctx.point).value = encodeArc4(record)
    if (ctx.custody) {
      rekeyBackToDex(dex, ctx.escrow)
    }
    return passResult()
  }

  /** the last record for `point` (fails if the hook was never called there) */
  @abimethod({ readonly: true })
  record(point: uint64): HookRecord {
    return decodeArc4<HookRecord>(this.records(point).value)
  }
}
