/* eslint-disable @typescript-eslint/no-unused-vars -- newService / newServiceCost mirror the hinted production ABI. */
import { Account, assert, BoxMap, bytes, contract, Global, gtxn, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import {
  ServiceStatusActive,
  ServiceStatusDraft,
  ServiceStatusShutdown,
  type Service,
  type ServiceStatus,
  type SubscriptionInfoWithExistence,
  type SubscriptionKey,
} from '../../../subscriptions/types'
import type { CID } from '../../../utils/types/base'

/** Flat service creation cost charged by the mock. */
const MockServiceCost: uint64 = 20_000

type ServiceKey = { owner: Account; id: uint64 }

/** Deterministic implementation of the subscription read ABI used by subscription consensus. */
@contract({ stateTotals: { globalBytes: 0, globalUints: 0 } })
export class MockGuildSubscriptions extends Contract {
  services = BoxMap<ServiceKey, ServiceStatus>({ keyPrefix: 's' })
  subscriptions = BoxMap<SubscriptionKey, SubscriptionInfoWithExistence>({ keyPrefix: 'u' })
  blocks = BoxMap<bytes<32>, boolean>({ keyPrefix: 'b' })
  /** number of services created per owner; IDs start at one because zero is reserved for donations */
  serviceCounts = BoxMap<Account, uint64>({ keyPrefix: 'n' })
  /** payout address recorded per service */
  payouts = BoxMap<ServiceKey, Account>({ keyPrefix: 'p' })

  private blockKey(owner: Account, account: Account): bytes<32> {
    return op.sha256(owner.bytes.concat(account.bytes))
  }

  @abimethod({ onCreate: 'require' })
  create(): void {}

  newService(
    payment: gtxn.PaymentTxn,
    interval: uint64,
    asset: uint64,
    amount: uint64,
    passes: uint64,
    gateID: uint64,
    payoutAddress: Account,
    title: string,
    bannerImage: CID,
    highlightMessage: Uint8,
    highlightColor: bytes<3>,
    wallet: uint64,
  ): uint64 {
    // the guild acts as itself: the principal-resolution hint is always 0
    assert(wallet === 0)
    assert(payment.receiver === Global.currentApplicationAddress && payment.amount === MockServiceCost)
    assert(interval >= 60 && amount >= 3)
    let id: uint64 = 1
    if (this.serviceCounts(Txn.sender).exists) {
      id = this.serviceCounts(Txn.sender).value + 1
    }
    this.serviceCounts(Txn.sender).value = id
    this.services({ owner: Txn.sender, id }).value = ServiceStatusDraft
    this.payouts({ owner: Txn.sender, id }).value = payoutAddress
    return id
  }

  activateService(): void {
    const key: ServiceKey = { owner: Txn.sender, id: this.serviceCounts(Txn.sender).value }
    assert(this.services(key).value === ServiceStatusDraft)
    this.services(key).value = ServiceStatusActive
  }

  shutdownService(id: uint64): void {
    const key: ServiceKey = { owner: Txn.sender, id }
    assert(this.services(key).exists && this.services(key).value !== ServiceStatusShutdown)
    this.services(key).value = ServiceStatusShutdown
  }

  @abimethod({ readonly: true })
  newServiceCost(asset: uint64, wallet: uint64): uint64 {
    return MockServiceCost
  }

  setService(owner: Account, id: uint64, status: ServiceStatus): void {
    this.services({ owner, id }).value = status
  }

  setSubscription(
    account: Account,
    id: uint64,
    recipient: Account,
    serviceID: uint64,
    interval: uint64,
    lastPayment: uint64,
  ): void {
    this.subscriptions({ address: account, id }).value = {
      exists: true,
      recipient,
      serviceID,
      startDate: lastPayment,
      amount: 1,
      interval,
      asset: 0,
      gateID: 0,
      lastPayment,
      streak: 1,
      escrowed: 0,
    }
  }

  setBlocked(owner: Account, account: Account, blocked: boolean): void {
    const key = this.blockKey(owner, account)
    if (blocked) this.blocks(key).value = true
    else if (this.blocks(key).exists) this.blocks(key).delete()
  }

  @abimethod({ readonly: true })
  getService(address: Account, id: uint64): Service {
    const key: ServiceKey = { owner: address, id }
    return {
      status: this.services(key).value,
      interval: 0,
      asset: 0,
      amount: 0,
      passes: 0,
      gateID: 0,
      payoutAddress: this.payouts(key).exists ? this.payouts(key).value : Global.zeroAddress,
      title: '',
      description: '',
      bannerImage: op.bzero(36),
      highlightMessage: new Uint8(0),
      highlightColor: op.bzero(3),
    }
  }

  @abimethod({ readonly: true })
  getSubscription(key: SubscriptionKey): SubscriptionInfoWithExistence {
    if (this.subscriptions(key).exists) return this.subscriptions(key).value
    return {
      exists: false,
      recipient: Global.zeroAddress,
      serviceID: 0,
      startDate: 0,
      amount: 0,
      interval: 0,
      asset: 0,
      gateID: 0,
      lastPayment: 0,
      streak: 0,
      escrowed: 0,
    }
  }

  @abimethod({ readonly: true })
  isBlocked(address: Account, blocked: Account): boolean {
    return this.blocks(this.blockKey(address, blocked)).exists
  }
}
