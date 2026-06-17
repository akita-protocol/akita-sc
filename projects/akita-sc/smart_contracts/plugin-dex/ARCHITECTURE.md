# Plugin DEX Architecture

PluginDex is a pool manager with pool-native hook pipelines. Pools are created with hook plugins installed at fixed lifecycle points. Hook execution is owned by the DEX contract, not by caller-supplied outer app calls.

## Goals

- Let each pool install multiple plugins at creation time.
- Preserve deterministic install order per hook point.
- Use one static plugin ABI method so the DEX can call all plugins uniformly.
- Let plugins temporarily control the DEX account via rekey during their hook execution.
- Keep the DEX core small enough to add swap math, CLAMM modules, swap taxes, custom fees, and oracle/liquidity extensions later.

## Hook Points

The first hook-point set is inspired by Uniswap v4 hook phases:

- `BeforeInitialize`
- `AfterInitialize`
- `BeforeAddLiquidity`
- `AfterAddLiquidity`
- `BeforeRemoveLiquidity`
- `AfterRemoveLiquidity`
- `BeforeSwapQuote`
- `AfterSwapQuote`
- `BeforeSwap`
- `AfterSwap`
- `BeforeCollectFees`
- `AfterCollectFees`

Each hook point has its own ordered plugin list per pool.

## Static Plugin Interface

Every plugin implements the same method:

```ts
dexHook(
  dex: Application,
  poolId: uint64,
  hookPoint: uint64,
  pluginIndex: uint64,
  caller: Account,
  input: DexHookInput,
  rekeyBack: boolean,
): DexHookOutput
```

The plugin receives its pool, hook point, and install index. It can use the hook point to branch internally while keeping the DEX call path static.

## Rekey Execution

For each hook point, the DEX:

1. Loads the hook count for the pool and hook point.
2. Iterates hooks in install order.
3. Rekeys the DEX app account to the plugin app address.
4. Calls `dexHook`.
5. Requires the plugin to rekey the DEX account back before control continues.
6. Feeds the plugin output into the next plugin input.

This mirrors the ARC-58 rekey pattern, but the DEX owns the lifecycle and ordering.
