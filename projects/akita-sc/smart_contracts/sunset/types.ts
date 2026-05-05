import { Account, Asset } from "@algorandfoundation/algorand-typescript";

export type AssetCloseParams = { assetCloseTo: Account, xferAsset: Asset }