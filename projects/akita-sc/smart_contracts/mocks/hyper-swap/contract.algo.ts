import { uint64 } from '@algorandfoundation/algorand-typescript'
import { HyperSwap } from '../../hyper-swap/contract.algo'

/** LocalNet-only fixture for exercising offer IDs without creating intervening offers. */
export class MockHyperSwap extends HyperSwap {
  setOfferCursor(id: uint64): void {
    this.offerCursor.value = id
  }
}
