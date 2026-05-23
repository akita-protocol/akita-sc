import { Account, Asset, uint64 } from "@algorandfoundation/algorand-typescript";

export type AssetCloseParams = { assetCloseTo: Account, xferAsset: Asset }

export type WalletEscrowReclaim = {
  escrow: string
  asset: uint64
  amount: uint64
  closeOut: boolean
}
