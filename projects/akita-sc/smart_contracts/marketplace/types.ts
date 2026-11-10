import { uint64 } from "@algorandfoundation/algorand-typescript"

export type Royalties = {
  creator: uint64
  marketplace: uint64
}
/** Itemised listing-creation cost (see `Marketplace.listCost`) */
export type ListingCostInfo = {
  /** exact payment `list` / `listPrizeBox` require */
  total: uint64
  /** non-refundable part: DAO escrow + split opt-ins for a new payment asset */
  escrowOptIn: uint64
  /** worst-case settlement disbursement MBR forwarded to the child */
  disbursement: uint64
  /** child ASA opt-in MBR (prize and/or payment asset) */
  optin: uint64
  /** creator MBR of the child app itself: program pages + global schema */
  createMbr: uint64
}
