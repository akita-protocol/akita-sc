import { Account, uint64 } from '@algorandfoundation/algorand-typescript'

export type SubscriptionGateRegistryInfo = {
  merchant: Account
  /** the merchant's service id (never 0: donations cannot satisfy a gate) */
  serviceID: uint64
}

/** check args: the subscribing account (wallet / escrow / EOA) and its subscription id */
export type SubscriptionGateCheckParams = {
  subscriber: Account
  id: uint64
}
