import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'
import { Uint8 } from '@algorandfoundation/algorand-typescript/arc4'

/** ARC-89 MBR delta, `(uint8,uint64)`: sign (0 none, 1 positive, 255 negative) and amount. */
export type MbrDelta = {
  sign: Uint8
  amount: uint64
}

/** `(uint64,bool,(uint8,uint64))` */
export type WriteResult = {
  revision: uint64
  changed: boolean
  mbr: MbrDelta
}

/** `(bool,uint8,uint64)`. `refund` is the total the call refunded, over every recipient. */
export type RemoveResult = {
  removed: boolean
  reason: Uint8
  refund: uint64
}

/** `(uint8,byte[])`. role 0 means no pin applies; `pin` is PinCore || flat. */
export type MainView = {
  role: Uint8
  pin: bytes
}

// ARC-28 EVENTS ----------------------------------------------------------------------------------

export type VariationWritten = {
  asset: uint64
  writer: Account
  slot: bytes
  revision: uint64
  flags: Uint8
  kind: Uint8
  round: uint64
  timestamp: uint64
}

export type VariationDeleted = {
  asset: uint64
  writer: Account
  slot: bytes
  lastRevision: uint64
  reason: Uint8
  round: uint64
  timestamp: uint64
}

/** One per call that changes the `m` box. role 0 with cleared means the box was deleted. */
export type MainChanged = {
  asset: uint64
  revision: uint64
  role: Uint8
  cleared: boolean
  round: uint64
  timestamp: uint64
}

/** asset is 0 for a manager policy. */
export type PolicyChanged = {
  asset: uint64
  manager: Account
  revision: uint64
  flags: Uint8
  deleted: boolean
  round: uint64
  timestamp: uint64
}

export type GrantChanged = {
  holder: Account
  revision: uint64
  deleted: boolean
  round: uint64
  timestamp: uint64
}
