import { Account, uint64 } from '@algorandfoundation/algorand-typescript'

export type PoolInfo = {
  assetA: uint64
  assetB: uint64
  feeBps: uint64
  creator: Account
  active: boolean
  mbrPayor: Account
  mbrAmount: uint64
}

export type PoolHookCountKey = {
  poolId: uint64
  hookPoint: uint64
}

export type PoolHookKey = {
  poolId: uint64
  hookPoint: uint64
  index: uint64
}

export type PoolHookInfo = {
  app: uint64
  enabled: boolean
  flags: uint64
}

export type DexHookInput = {
  assetIn: uint64
  assetOut: uint64
  amountIn: uint64
  amountOut: uint64
  feeBps: uint64
  price: uint64
  liquidity: uint64
  scratch: uint64
}

export type DexHookOutput = {
  amountIn: uint64
  amountOut: uint64
  feeBps: uint64
  price: uint64
  liquidity: uint64
  scratch: uint64
  flags: uint64
}

export type PluginDexMBRData = {
  pool: uint64
  hookCount: uint64
  poolHook: uint64
  total: uint64
}
