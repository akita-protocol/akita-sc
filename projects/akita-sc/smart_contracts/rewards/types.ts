import { Account, uint64 } from '@algorandfoundation/algorand-typescript'

export type DisbursementDetails = {
  /** the creator of the disbursement */
  creator: Account
  /** the disbursement status */
  finalized: boolean
  /** the disbursement title */
  title: string
  /** the amount of tokens to distribute */
  amount: uint64
  /** the unix timestamp of the disbursement */
  timeToUnlock: uint64
  /** the expiration time as a unix timestamp */
  expiration: uint64
  /** the number of users with allocations */
  allocations: uint64
  /** the amount already distributed from this allocation */
  distributed: uint64
  /**
   * MBR credits available for creating allocation boxes or withdrawing released MBR. Credits held by
   * open allocation boxes are `allocations * UserAllocationMBR` and are not stored, so the box stays
   * the size `MinDisbursementsMBR` charges for (STAKE-3).
   */
  mbrCredits: uint64
  /** where `sweepExpired` sends what is left after expiration; the zero address = not sweepable */
  reclaimTo: Account
  /** notes */
  note: string
}

export type UserAllocationsKey = {
  /** the address of the account */
  address: Account
  /** the asset id being distributed */
  asset: uint64
  /** the disbursement id */
  disbursementID: uint64
}

export type UserAllocation = {
  /** the address of the account */
  address: Account
  /** the amount the user is owed */
  amount: uint64
}

export type AllocationReclaimDetails = {
  /** the address of the account */
  address: Account
  /** the asset id being distributed */
  asset: uint64
}

export type ClaimDetails = {
  /** the id of reward distribution */
  id: uint64
  /** the asset id being claimed */
  asset: uint64
}

export type RewardsMBRData = {
  disbursements: uint64
  userAllocations: uint64
}
