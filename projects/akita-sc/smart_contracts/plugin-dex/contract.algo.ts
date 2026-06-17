import {
  Account,
  Application,
  Asset,
  BoxMap,
  clone,
  Contract,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import {
  HookPointMax,
  HookPointMin,
  PluginDexBoxPrefixHookCounts,
  PluginDexBoxPrefixPoolHooks,
  PluginDexBoxPrefixPools,
  PluginDexGlobalStateKeyAdmin,
  PluginDexGlobalStateKeyLastChange,
  PluginDexGlobalStateKeyPoolCursor,
  PluginDexGlobalStateKeyVersion,
  PluginDexHookCountMBR,
  PluginDexMinPoolMBR,
  PluginDexPoolHookMBR,
} from './constants'
import {
  ERR_ADMIN_ONLY,
  ERR_AUTH_ADDR_MISMATCH,
  ERR_HOOK_DISABLED,
  ERR_HOOK_NOT_FOUND,
  ERR_INVALID_HOOK_CONFIG,
  ERR_INVALID_HOOK_POINT,
  ERR_INVALID_PAYMENT,
  ERR_INVALID_POOL,
  ERR_MISSING_REKEY_BACK,
  ERR_POOL_INACTIVE,
  ERR_POOL_NOT_FOUND,
} from './errors'
import {
  DexHookInput,
  DexHookOutput,
  PluginDexMBRData,
  PoolHookCountKey,
  PoolHookInfo,
  PoolHookKey,
  PoolInfo,
} from './types'
import type { PluginDexHook } from './hook-interface'

export class PluginDex extends Contract {
  version = GlobalState<string>({ key: PluginDexGlobalStateKeyVersion })
  admin = GlobalState<Account>({ key: PluginDexGlobalStateKeyAdmin })
  poolCursor = GlobalState<uint64>({ key: PluginDexGlobalStateKeyPoolCursor })
  lastChange = GlobalState<uint64>({ key: PluginDexGlobalStateKeyLastChange })

  pools = BoxMap<uint64, PoolInfo>({ keyPrefix: PluginDexBoxPrefixPools })
  hookCounts = BoxMap<PoolHookCountKey, uint64>({ keyPrefix: PluginDexBoxPrefixHookCounts })
  poolHooks = BoxMap<PoolHookKey, PoolHookInfo>({ keyPrefix: PluginDexBoxPrefixPoolHooks })

  @abimethod({ onCreate: 'require' })
  create(version: string, admin: Account): void {
    this.version.value = version
    this.admin.value = admin
    this.poolCursor.value = 0
    this.lastChange.value = Global.latestTimestamp
  }

  private requireAdmin(): void {
    loggedAssert(Txn.sender === this.admin.value, ERR_ADMIN_ONLY)
  }

  private touchChange(): void {
    this.lastChange.value = Global.latestTimestamp
  }

  private nextPoolId(): uint64 {
    const id = this.poolCursor.value
    this.poolCursor.value = id + 1
    return id
  }

  private validatePoolAssets(assetA: Asset, assetB: Asset): void {
    loggedAssert(assetA.id !== assetB.id, ERR_INVALID_POOL)
  }

  private validateHookPoint(hookPoint: uint64): void {
    loggedAssert(hookPoint >= HookPointMin && hookPoint <= HookPointMax, ERR_INVALID_HOOK_POINT)
  }

  private poolMbr(hookCount: uint64): uint64 {
    return PluginDexMinPoolMBR + (PluginDexHookCountMBR + PluginDexPoolHookMBR) * hookCount
  }

  private outputFromInput(input: DexHookInput): DexHookOutput {
    return {
      amountIn: input.amountIn,
      amountOut: input.amountOut,
      feeBps: input.feeBps,
      price: input.price,
      liquidity: input.liquidity,
      scratch: input.scratch,
      flags: 0,
    }
  }

  private inputFromOutput(input: DexHookInput, output: DexHookOutput): DexHookInput {
    return {
      assetIn: input.assetIn,
      assetOut: input.assetOut,
      amountIn: output.amountIn,
      amountOut: output.amountOut,
      feeBps: output.feeBps,
      price: output.price,
      liquidity: output.liquidity,
      scratch: output.scratch,
    }
  }

  private rekeyToPlugin(plugin: Application): void {
    loggedAssert(Global.currentApplicationAddress.authAddress === Global.currentApplicationAddress, ERR_AUTH_ADDR_MISMATCH)

    itxn
      .payment({
        receiver: Global.currentApplicationAddress,
        amount: 0,
        rekeyTo: plugin.address,
      })
      .submit()
  }

  private requireRekeyBack(): void {
    loggedAssert(Global.currentApplicationAddress.authAddress === Global.currentApplicationAddress, ERR_MISSING_REKEY_BACK)
  }

  private installHook(poolId: uint64, hookPoint: uint64, plugin: Application): void {
    this.validateHookPoint(hookPoint)

    const countKey: PoolHookCountKey = { poolId, hookPoint }
    let index: uint64 = 0

    if (this.hookCounts(countKey).exists) {
      index = this.hookCounts(countKey).value
    }

    const hookKey: PoolHookKey = { poolId, hookPoint, index }
    loggedAssert(!this.poolHooks(hookKey).exists, ERR_INVALID_HOOK_CONFIG)

    this.poolHooks(hookKey).value = {
      app: plugin.id,
      enabled: true,
      flags: 0,
    }
    this.hookCounts(countKey).value = index + 1
  }

  private executeHooks(poolId: uint64, hookPoint: uint64, input: DexHookInput): DexHookOutput {
    this.validateHookPoint(hookPoint)

    const countKey: PoolHookCountKey = { poolId, hookPoint }
    if (!this.hookCounts(countKey).exists) {
      return this.outputFromInput(input)
    }

    const count = this.hookCounts(countKey).value
    let current = clone(input)
    let output = this.outputFromInput(current)

    for (let index: uint64 = 0; index < count; index += 1) {
      const hookKey: PoolHookKey = { poolId, hookPoint, index }
      loggedAssert(this.poolHooks(hookKey).exists, ERR_HOOK_NOT_FOUND)

      const hook = clone(this.poolHooks(hookKey).value)
      loggedAssert(hook.enabled, ERR_HOOK_DISABLED)

      const plugin = Application(hook.app)
      this.rekeyToPlugin(plugin)

      output = abiCall<typeof PluginDexHook.prototype.dexHook>({
        appId: plugin,
        args: [
          Global.currentApplicationId,
          poolId,
          hookPoint,
          index,
          Txn.sender,
          current,
          true,
        ],
      }).returnValue

      this.requireRekeyBack()
      current = this.inputFromOutput(current, output)
    }

    return output
  }

  createPool(
    mbrPayment: gtxn.PaymentTxn,
    assetA: Asset,
    assetB: Asset,
    feeBps: uint64,
    hookPoints: uint64[],
    hookPlugins: Application[],
  ): uint64 {
    this.validatePoolAssets(assetA, assetB)
    loggedAssert(hookPoints.length === hookPlugins.length, ERR_INVALID_HOOK_CONFIG)

    const requiredMbr = this.poolMbr(hookPlugins.length)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount >= requiredMbr, ERR_INVALID_PAYMENT)

    const poolId = this.nextPoolId()
    loggedAssert(!this.pools(poolId).exists, ERR_INVALID_POOL)

    this.pools(poolId).value = {
      assetA: assetA.id,
      assetB: assetB.id,
      feeBps,
      creator: Txn.sender,
      active: true,
      mbrPayor: mbrPayment.sender,
      mbrAmount: mbrPayment.amount,
    }

    for (let i: uint64 = 0; i < hookPlugins.length; i += 1) {
      this.installHook(poolId, hookPoints[i], hookPlugins[i])
    }

    this.touchChange()
    return poolId
  }

  setPoolActive(poolId: uint64, active: boolean): void {
    this.requireAdmin()
    loggedAssert(this.pools(poolId).exists, ERR_POOL_NOT_FOUND)
    this.pools(poolId).value.active = active
    this.touchChange()
  }

  setHookEnabled(poolId: uint64, hookPoint: uint64, index: uint64, enabled: boolean): void {
    this.requireAdmin()
    this.validateHookPoint(hookPoint)

    const hookKey: PoolHookKey = { poolId, hookPoint, index }
    loggedAssert(this.poolHooks(hookKey).exists, ERR_HOOK_NOT_FOUND)
    this.poolHooks(hookKey).value.enabled = enabled
    this.touchChange()
  }

  /**
   * Temporary execution surface while swap/liquidity methods are being built.
   * The final DEX methods should call executeHooks internally at each lifecycle point.
   */
  adminRunHook(poolId: uint64, hookPoint: uint64, input: DexHookInput): DexHookOutput {
    this.requireAdmin()
    loggedAssert(this.pools(poolId).exists, ERR_POOL_NOT_FOUND)
    loggedAssert(this.pools(poolId).value.active, ERR_POOL_INACTIVE)

    return this.executeHooks(poolId, hookPoint, input)
  }

  @abimethod({ readonly: true })
  getPool(poolId: uint64): PoolInfo {
    if (this.pools(poolId).exists) {
      return this.pools(poolId).value
    }

    return {
      assetA: 0,
      assetB: 0,
      feeBps: 0,
      creator: Global.zeroAddress,
      active: false,
      mbrPayor: Global.zeroAddress,
      mbrAmount: 0,
    }
  }

  @abimethod({ readonly: true })
  getHookCount(poolId: uint64, hookPoint: uint64): uint64 {
    this.validateHookPoint(hookPoint)

    const countKey: PoolHookCountKey = { poolId, hookPoint }
    if (this.hookCounts(countKey).exists) {
      return this.hookCounts(countKey).value
    }

    return 0
  }

  @abimethod({ readonly: true })
  getHook(poolId: uint64, hookPoint: uint64, index: uint64): PoolHookInfo {
    this.validateHookPoint(hookPoint)

    const hookKey: PoolHookKey = { poolId, hookPoint, index }
    if (this.poolHooks(hookKey).exists) {
      return this.poolHooks(hookKey).value
    }

    return {
      app: 0,
      enabled: false,
      flags: 0,
    }
  }

  @abimethod({ readonly: true })
  mbr(hookCount: uint64): PluginDexMBRData {
    return {
      pool: PluginDexMinPoolMBR,
      hookCount: PluginDexHookCountMBR,
      poolHook: PluginDexPoolHookMBR,
      total: this.poolMbr(hookCount),
    }
  }
}
