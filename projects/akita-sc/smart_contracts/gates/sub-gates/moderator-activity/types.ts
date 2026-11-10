import { uint64 } from '@algorandfoundation/algorand-typescript'

export type ModeratorActivityGateRegistryInfo = {
  /** counted moderation actions required */
  minActions: uint64
  /** 0: the current epoch only; 1: the current epoch plus the one before it */
  epochsBack: uint64
}
