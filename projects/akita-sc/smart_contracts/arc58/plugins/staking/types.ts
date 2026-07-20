import type { Account, uint64 } from "@algorandfoundation/algorand-typescript"

export type SoftStakeKey = {
  address: Account
  asset: uint64
}

export type AppSoftStakeKey = {
  app: uint64
  address: Account
  asset: uint64
}
