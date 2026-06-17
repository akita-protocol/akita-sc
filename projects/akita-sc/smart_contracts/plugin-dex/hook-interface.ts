import { Account, Application, Contract, uint64 } from '@algorandfoundation/algorand-typescript'
import { DexHookInput, DexHookOutput } from './types'

export class PluginDexHook extends Contract {
  dexHook(
    dex: Application,
    poolId: uint64,
    hookPoint: uint64,
    pluginIndex: uint64,
    caller: Account,
    input: DexHookInput,
    rekeyBack: boolean,
  ): DexHookOutput {
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
}
