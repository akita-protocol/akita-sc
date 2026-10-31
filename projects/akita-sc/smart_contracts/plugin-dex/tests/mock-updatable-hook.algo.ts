import { Application, Box, bytes, Contract, Global, GlobalState, loggedAssert, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { passResult, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

/**
 * Test-only hook with an UpdateApplication path (FINAL-SPEC §2.2), used by the pinning tests: an
 * updated hook app must stop being callable by pools pinned to its earlier version. It also records
 * the last HookContext it received (ABI round trip of bytes<16> and nested CurveSnapshot structs).
 */
export class MockUpdatableHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  calls = GlobalState<uint64>({ key: 'calls' })
  lastPoint = GlobalState<uint64>({ key: 'last_point' })
  lastCtx = Box<bytes>({ key: 'ctx' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application): void {
    this.dex.value = dex
    this.calls.value = 0
    this.lastPoint.value = 0
  }

  /** creator-only code update; bumps Application.version */
  @abimethod({ allowActions: 'UpdateApplication' })
  update(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, 'errNotCreator')
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    this.calls.value += 1
    this.lastPoint.value = ctx.point
    if (this.lastCtx.exists) {
      this.lastCtx.delete()
    }
    this.lastCtx.value = encodeArc4(ctx)
    return passResult()
  }

  /** the last context received, decoded (fails if the hook was never called) */
  @abimethod({ readonly: true })
  lastContext(): HookContext {
    return decodeArc4<HookContext>(this.lastCtx.value)
  }

  /** pure ABI echo of a HookContext */
  @abimethod({ readonly: true })
  echo(ctx: HookContext): HookContext {
    return ctx
  }
}

/**
 * The same hook with a trivially different program (one extra read-only method), so updating a
 * MockUpdatableHook to it bumps Application.version while the hook keeps working. The pinning test
 * uses it to show that only rejectVersion stops a pool pinned to the earlier version.
 */
export class MockUpdatableHookV2 extends MockUpdatableHook {
  @abimethod({ readonly: true })
  codeVersion(): uint64 {
    return 2
  }
}
