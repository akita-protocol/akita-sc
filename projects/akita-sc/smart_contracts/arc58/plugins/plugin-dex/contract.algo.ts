import {
  Account,
  Application,
  Asset,
  bytes,
  clone,
  Contract,
  contract,
  Global,
  GlobalState,
  itxn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import type { PluginDex } from '../../../plugin-dex/contract.algo'
import type { BinEngine } from '../../../plugin-dex/curves/bins/engine.algo'
import {
  CurveLiquidityResult,
  ExternalSlotConfig,
  HookInstall,
  PoolConfig,
  PoolInfo,
  RemoveResult,
} from '../../../plugin-dex/types'
import { getControlledSpendingAccount, rekeyAddress } from '../../../utils/functions'

/**
 * PluginDexPlugin: the ARC-58 plugin a wallet uses to create pools and provide liquidity on the PluginDex
 * Vault. Swaps go through AkitaRouterPlugin.
 *
 * Every Vault call is an inner transaction sent as the wallet's spending account S, so pools, LP tokens and
 * curve positions belong to S. The last inner transaction of each method carries the rekey back to the wallet.
 *
 * Never updated: the ARC-58 wallet only accepts plugins whose Application.version is 0.
 */
@contract({ avmVersion: 13 })
export class PluginDexPlugin extends Contract {
  version = GlobalState<string>({ key: 'version' })
  /** PluginDex Vault (immutable) */
  dex = GlobalState<Application>({ key: 'dex' })

  @abimethod({ onCreate: 'require' })
  create(version: string, dex: Application): void {
    this.version.value = version
    this.dex.value = dex
  }

  /** No-op carrier for opcode budget and resource references */
  opUp(): void {}

  // POOLS ----------------------------------------------------------------------------------------

  /**
   * Create a pool owned by nobody (pools are permissionless). `payment` µALGO goes to the Vault, which
   * refunds what it does not use to S. Assets must already be in Vault order (assetA < assetB).
   */
  createPool(
    wallet: Application,
    rekeyBack: boolean,
    assetA: uint64,
    assetB: uint64,
    config: PoolConfig,
    hooks: HookInstall[],
    externals: ExternalSlotConfig[],
    payment: uint64,
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof PluginDex.prototype.createPool>({
      appId: this.dex.value,
      sender,
      args: [
        itxn.payment({ sender, receiver: this.dex.value.address, amount: payment }),
        assetA,
        assetB,
        clone(config),
        clone(hooks),
        clone(externals),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  // LIQUIDITY (fungible LP) ----------------------------------------------------------------------

  /** Deposit both sides of a fungible-LP pool; LP is minted to S (opted in here when needed) */
  addLiquidity(
    wallet: Application,
    rekeyBack: boolean,
    poolId: uint64,
    amountA: uint64,
    amountB: uint64,
    minLpOut: uint64,
    data: bytes,
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    const pool = this.pool(poolId)
    this.ensureOptIn(sender, pool.lpAsset)
    const escrow = Application(pool.escrow).address
    const depositB = itxn.assetTransfer({ sender, assetReceiver: escrow, xferAsset: pool.assetB, assetAmount: amountB })
    const rekeyTo = rekeyAddress(rekeyBack, wallet)

    if (pool.assetA === 0) {
      return abiCall<typeof PluginDex.prototype.addLiquidity>({
        appId: this.dex.value,
        sender,
        args: [itxn.payment({ sender, receiver: escrow, amount: amountA }), depositB, poolId, minLpOut, data],
        rekeyTo,
      }).returnValue
    }
    return abiCall<typeof PluginDex.prototype.addLiquidity>({
      appId: this.dex.value,
      sender,
      args: [
        itxn.assetTransfer({ sender, assetReceiver: escrow, xferAsset: pool.assetA, assetAmount: amountA }),
        depositB,
        poolId,
        minLpOut,
        data,
      ],
      rekeyTo,
    }).returnValue
  }

  /** Burn `lpAmount` LP for both sides; curve pools are synced first so S keeps its share of unbooked surplus */
  removeLiquidity(
    wallet: Application,
    rekeyBack: boolean,
    poolId: uint64,
    lpAmount: uint64,
    minAmountA: uint64,
    minAmountB: uint64,
    data: bytes,
  ): RemoveResult {
    const sender = getControlledSpendingAccount(wallet)
    const pool = this.pool(poolId)
    if (pool.curve !== 0) {
      abiCall<typeof PluginDex.prototype.sync>({ appId: this.dex.value, sender, args: [poolId] })
    }
    return abiCall<typeof PluginDex.prototype.removeLiquidity>({
      appId: this.dex.value,
      sender,
      args: [
        itxn.assetTransfer({ sender, assetReceiver: this.dex.value.address, xferAsset: pool.lpAsset, assetAmount: lpAmount }),
        poolId,
        minAmountA,
        minAmountB,
        data,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  // LIQUIDITY (curve positions) ------------------------------------------------------------------

  /**
   * Add to a curve position owned by S (`positionId` 0 opens one). `mbr` µALGO is forwarded for boxes
   * the curve may create; the curve refunds the excess.
   */
  addLiquidityCurve(
    wallet: Application,
    rekeyBack: boolean,
    poolId: uint64,
    positionId: uint64,
    amountA: uint64,
    amountB: uint64,
    minShares: uint64,
    curveArgs: bytes,
    mbr: uint64,
    data: bytes,
  ): CurveLiquidityResult {
    const sender = getControlledSpendingAccount(wallet)
    const pool = this.pool(poolId)
    const escrow = Application(pool.escrow).address
    const mbrPayment = itxn.payment({ sender, receiver: this.dex.value.address, amount: mbr })
    const depositB = itxn.assetTransfer({ sender, assetReceiver: escrow, xferAsset: pool.assetB, assetAmount: amountB })
    const rekeyTo = rekeyAddress(rekeyBack, wallet)

    if (pool.assetA === 0) {
      return abiCall<typeof PluginDex.prototype.addLiquidityCurve>({
        appId: this.dex.value,
        sender,
        args: [mbrPayment, itxn.payment({ sender, receiver: escrow, amount: amountA }), depositB, poolId, positionId, minShares, curveArgs, data],
        rekeyTo,
      }).returnValue
    }
    return abiCall<typeof PluginDex.prototype.addLiquidityCurve>({
      appId: this.dex.value,
      sender,
      args: [
        mbrPayment,
        itxn.assetTransfer({ sender, assetReceiver: escrow, xferAsset: pool.assetA, assetAmount: amountA }),
        depositB,
        poolId,
        positionId,
        minShares,
        curveArgs,
        data,
      ],
      rekeyTo,
    }).returnValue
  }

  /**
   * Remove from a curve position after a sync. With `closePosition` the emptied position is also deleted
   * on the curve engine, refunding its MBR to S (only valid when the remove empties every share).
   */
  removeLiquidityCurve(
    wallet: Application,
    rekeyBack: boolean,
    poolId: uint64,
    positionId: uint64,
    minAmountA: uint64,
    minAmountB: uint64,
    curveArgs: bytes,
    data: bytes,
    closePosition: boolean,
  ): RemoveResult {
    const sender = getControlledSpendingAccount(wallet)
    const rekeyTo = rekeyAddress(rekeyBack, wallet)
    const curve = this.pool(poolId).curve
    abiCall<typeof PluginDex.prototype.sync>({ appId: this.dex.value, sender, args: [poolId] })

    const removed = abiCall<typeof PluginDex.prototype.removeLiquidityCurve>({
      appId: this.dex.value,
      sender,
      args: [poolId, positionId, minAmountA, minAmountB, curveArgs, data],
      rekeyTo: closePosition ? Global.zeroAddress : rekeyTo,
    }).returnValue

    if (closePosition) {
      abiCall<typeof BinEngine.prototype.closePosition>({
        appId: curve,
        sender,
        args: [positionId],
        rekeyTo,
      })
    }
    return removed
  }

  // INTERNALS ------------------------------------------------------------------------------------

  private pool(poolId: uint64): PoolInfo {
    return abiCall<typeof PluginDex.prototype.getPool>({ appId: this.dex.value, args: [poolId] }).returnValue
  }

  /** opt S into an ASA (0.1 ALGO MBR from S) */
  private ensureOptIn(sender: Account, asset: uint64): void {
    if (asset !== 0 && !sender.isOptedIn(Asset(asset))) {
      itxn.assetTransfer({ sender, assetReceiver: sender, xferAsset: asset, assetAmount: 0 }).submit()
    }
  }
}
