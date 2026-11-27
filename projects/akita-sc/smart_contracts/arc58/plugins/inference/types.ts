import { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * Policy body of a delegated InferencePlugin grant: the network it may use, the only providers it may
 * open tickets to, the only assets it may lock (0 is ALGO), and the most one ticket may lock.
 * Providers and assets are sorted ascending, without repeats, and hold 1 to 8 entries. The wallet's
 * allowance on the grant caps what all tickets lock over time.
 */
export type InferencePolicy = {
  network: uint64
  providers: uint64[]
  assets: uint64[]
  maxPrice: uint64
}
