import { Account, BoxMap, clone, Global, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { ServiceID, SubscriptionInfo, SubscriptionInfoWithExistence, SubscriptionKey } from '../../subscriptions/types'

type ServiceKey = { address: Account; id: uint64 }

/**
 * Stands in for Akita's Subscriptions app with the two readonly methods InferenceNetwork calls
 * (`getSubscription`, `isShutdown`), the same ABI. The test writes subscriptions and pays them.
 */
export class MockInferenceSubscriptions extends Contract {
  subscriptions = BoxMap<SubscriptionKey, SubscriptionInfo>({ keyPrefix: 's' })
  shutdowns = BoxMap<ServiceKey, uint64>({ keyPrefix: 'x' })

  /** Writes a subscription that started now, paid now. */
  subscribe(key: SubscriptionKey, recipient: Account, serviceID: ServiceID, interval: uint64): void {
    this.subscriptions(key).value = {
      recipient, serviceID, startDate: Global.latestTimestamp, amount: 1, interval, asset: 0, gateID: 0,
      lastPayment: Global.latestTimestamp, streak: 1, escrowed: 0,
    }
  }

  /** Records a payment now. */
  pay(key: SubscriptionKey): void {
    this.subscriptions(key).value.lastPayment = Global.latestTimestamp
    this.subscriptions(key).value.streak = this.subscriptions(key).value.streak + 1
  }

  /** Sets when the last payment was (to make a subscription lapse). */
  setLastPayment(key: SubscriptionKey, lastPayment: uint64): void {
    this.subscriptions(key).value.lastPayment = lastPayment
  }

  setShutdown(address: Account, id: uint64, shutdown: boolean): void {
    if (shutdown) this.shutdowns({ address, id }).value = 1
    else if (this.shutdowns({ address, id }).exists) this.shutdowns({ address, id }).delete()
  }

  @abimethod({ readonly: true })
  isShutdown(address: Account, id: uint64): boolean {
    return this.shutdowns({ address, id }).exists
  }

  @abimethod({ readonly: true })
  getSubscription(key: SubscriptionKey): SubscriptionInfoWithExistence {
    if (!this.subscriptions(key).exists) {
      return {
        exists: false, recipient: Global.zeroAddress, serviceID: 0, startDate: 0, amount: 0, interval: 0, asset: 0,
        gateID: 0, lastPayment: 0, streak: 0, escrowed: 0,
      }
    }
    const info = clone(this.subscriptions(key).value)
    return {
      exists: true, recipient: info.recipient, serviceID: info.serviceID, startDate: info.startDate, amount: info.amount,
      interval: info.interval, asset: info.asset, gateID: info.gateID, lastPayment: info.lastPayment, streak: info.streak,
      escrowed: info.escrowed,
    }
  }
}
