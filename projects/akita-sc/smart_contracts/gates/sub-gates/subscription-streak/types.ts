import { Account, uint64 } from '@algorandfoundation/algorand-typescript'
import { Operator } from '../../types'

export type SubscriptionStreakGateRegistryInfo = {
  merchant: Account
  /** the merchant's service id (never 0) */
  serviceID: uint64
  op: Operator
  streak: uint64
}
