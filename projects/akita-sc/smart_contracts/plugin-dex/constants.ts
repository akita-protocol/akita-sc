import { uint64 } from '@algorandfoundation/algorand-typescript'

export const PluginDexGlobalStateKeyVersion = 'version'
export const PluginDexGlobalStateKeyAdmin = 'admin'
export const PluginDexGlobalStateKeyPoolCursor = 'pool_cursor'
export const PluginDexGlobalStateKeyLastChange = 'last_change'

export const PluginDexBoxPrefixPools = 'p'
export const PluginDexBoxPrefixHookCounts = 'c'
export const PluginDexBoxPrefixPoolHooks = 'h'

export const HookPointBeforeInitialize: uint64 = 1
export const HookPointAfterInitialize: uint64 = 2
export const HookPointBeforeAddLiquidity: uint64 = 3
export const HookPointAfterAddLiquidity: uint64 = 4
export const HookPointBeforeRemoveLiquidity: uint64 = 5
export const HookPointAfterRemoveLiquidity: uint64 = 6
export const HookPointBeforeSwapQuote: uint64 = 7
export const HookPointAfterSwapQuote: uint64 = 8
export const HookPointBeforeSwap: uint64 = 9
export const HookPointAfterSwap: uint64 = 10
export const HookPointBeforeCollectFees: uint64 = 11
export const HookPointAfterCollectFees: uint64 = 12

export const HookPointMin: uint64 = HookPointBeforeInitialize
export const HookPointMax: uint64 = HookPointAfterCollectFees

export const PluginDexMinPoolMBR: uint64 = 70_000
export const PluginDexHookCountMBR: uint64 = 20_000
export const PluginDexPoolHookMBR: uint64 = 50_000
