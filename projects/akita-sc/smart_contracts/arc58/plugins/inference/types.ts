import { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Policy body of a delegated InferencePlugin grant: the network it may use, the only providers it may
 * pay, the only assets it may deposit (0 is ALGO), and the most one channel may ever hold. Providers
 * and assets are sorted ascending, without repeats, and hold 1 to 8 entries.
 */
export type InferencePolicy = {
  network: uint64
  providers: uint64[]
  assets: uint64[]
  maxDeposit: uint64
}
