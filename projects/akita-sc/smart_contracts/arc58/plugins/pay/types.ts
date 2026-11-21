import { Account, uint64 } from "@algorandfoundation/algorand-typescript"

export type PayParams = {
  receiver: Account
  asset: uint64
  amount: uint64
}

/**
 * Policy body of a delegated PayPlugin grant: the only receivers it may pay and the only assets it may
 * send (0 is ALGO). Both lists are sorted ascending, without repeats, and hold 1 to 8 entries.
 */
export type PayPolicy = {
  recipients: Account[]
  assets: uint64[]
}
