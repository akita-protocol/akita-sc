import { Account, bytes, uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * One sender's open gift for a subject, per asset. Box key: 'g' + subject + senderWallet + asset.
 * The box exists while the gift is refundable (subject PENDING) or absorbed (subject CLAIMED,
 * prunable). A refund deletes it.
 */
export type GiftKey = {
  /** sha256(utf8(`${platform}:${platformUserId}`)) */
  subject: bytes<32>
  /** The ARC-58 wallet that paid. A refund goes to its controlled address. */
  senderWallet: uint64
  /** 0 for ALGO, else the ASA id. */
  asset: uint64
}

export type Gift = {
  /** Base units, summed over every top-up from this sender in this asset. */
  amount: uint64
  /** Unix seconds. After this, anyone may refund. Top-ups only extend it. */
  expiry: uint64
}

export type SocialClaimBound = {
  subject: bytes<32>
  wallet: uint64
  senderWallet: uint64
  asset: uint64
  amount: uint64
  expiry: uint64
}

/** `amount` and `expiry` are the gift box totals after this top-up. */
export type SocialClaimContributed = {
  subject: bytes<32>
  wallet: uint64
  senderWallet: uint64
  asset: uint64
  amount: uint64
  expiry: uint64
}

export type SocialClaimClaimed = {
  subject: bytes<32>
  wallet: uint64
  newAdmin: Account
}

export type SocialClaimRefunded = {
  subject: bytes<32>
  wallet: uint64
  senderWallet: uint64
  asset: uint64
  amount: uint64
  refundedTo: Account
}

/** An expired gift that could not be returned to its sender: the box is gone and the funds stay for the recipient. */
export type SocialClaimDropped = {
  subject: bytes<32>
  wallet: uint64
  senderWallet: uint64
  asset: uint64
  amount: uint64
}
