import {
  Account,
  Contract,
  Global,
  GlobalState,
  Txn,
  assert,
  bytes,
  gtxn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi, itob } from '@algorandfoundation/algorand-typescript/op'

import { NFDGlobalStateKeysName } from '../../../utils/constants/nfd'
import { NFDGlobalStateKeyExpirationTime, NFDGlobalStateKeySaleAmountKey } from './constants'

const NFDGlobalStateKeyOwner = 'i.owner.a'

/** Test-only exact name/application registry used by the NFD auto-renew audit. */
export class Arc58NfdRegistryMock extends Contract {
  firstName = GlobalState<string>({ key: 'first_name' })
  firstApp = GlobalState<uint64>({ key: 'first_app' })
  firstEnabled = GlobalState<boolean>({ key: 'first_enabled' })
  secondName = GlobalState<string>({ key: 'second_name' })
  secondApp = GlobalState<uint64>({ key: 'second_app' })
  secondEnabled = GlobalState<boolean>({ key: 'second_enabled' })

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.firstName.value = ''
    this.firstApp.value = 0
    this.firstEnabled.value = false
    this.secondName.value = ''
    this.secondApp.value = 0
    this.secondEnabled.value = false
  }

  configure(slot: uint64, name: string, appId: uint64, enabled: boolean): void {
    if (slot === 0) {
      this.firstName.value = name
      this.firstApp.value = appId
      this.firstEnabled.value = enabled
    } else {
      assert(slot === 1)
      this.secondName.value = name
      this.secondApp.value = appId
      this.secondEnabled.value = enabled
    }
  }

  isValidNfdAppId(nfdName: string, nfdAppId: uint64): boolean {
    return (
      (this.firstEnabled.value && nfdName === this.firstName.value && nfdAppId === this.firstApp.value) ||
      (this.secondEnabled.value && nfdName === this.secondName.value && nfdAppId === this.secondApp.value)
    )
  }
}

/**
 * Test-only NFD instance implementing the exact ABI and global-state surface
 * consumed by NFDPlugin.autoRenew.
 */
export class Arc58NfdInstanceMock extends Contract {
  name = GlobalState<string>({ key: NFDGlobalStateKeysName })
  owner = GlobalState<Account>({ key: NFDGlobalStateKeyOwner })
  expiration = GlobalState<bytes>({ key: NFDGlobalStateKeyExpirationTime })
  price = GlobalState<uint64>({ key: 'test_price' })
  renewCount = GlobalState<uint64>({ key: 'renew_count' })
  lastPayment = GlobalState<uint64>({ key: 'last_payment' })
  ownershipCalls = GlobalState<uint64>({ key: 'ownership_calls' })
  failPrice = GlobalState<boolean>({ key: 'fail_price' })
  failRenew = GlobalState<boolean>({ key: 'fail_renew' })
  saleAmount = GlobalState<bytes>({ key: NFDGlobalStateKeySaleAmountKey })
  purchaseCount = GlobalState<uint64>({ key: 'purchase_count' })

  @abimethod({ onCreate: 'require' })
  create(name: string, owner: Account, expiration: uint64, price: uint64): void {
    this.name.value = name
    this.owner.value = owner
    this.expiration.value = itob(expiration)
    this.price.value = price
    this.renewCount.value = 0
    this.lastPayment.value = 0
    this.ownershipCalls.value = 0
    this.failPrice.value = false
    this.failRenew.value = false
    this.purchaseCount.value = 0
  }

  configure(name: string, owner: Account, expiration: uint64, price: uint64): void {
    this.name.value = name
    this.owner.value = owner
    this.expiration.value = itob(expiration)
    this.price.value = price
    this.renewCount.value = 0
    this.lastPayment.value = 0
    this.ownershipCalls.value = 0
    this.failPrice.value = false
    this.failRenew.value = false
  }

  setName(name: string): void {
    this.name.value = name
  }

  setOwner(owner: Account): void {
    this.owner.value = owner
  }

  setExpiration(expiration: uint64): void {
    this.expiration.value = itob(expiration)
  }

  setPrice(price: uint64): void {
    this.price.value = price
  }

  setSaleAmount(amount: uint64): void {
    this.saleAmount.value = itob(amount)
  }

  setFailure(failPrice: boolean, failRenew: boolean): void {
    this.failPrice.value = failPrice
    this.failRenew.value = failRenew
  }

  getRenewPrice(): uint64 {
    assert(!this.failPrice.value)
    return this.price.value
  }

  renew(payment: gtxn.PaymentTxn): void {
    assert(!this.failRenew.value)
    assert(payment.sender === Txn.sender)
    assert(payment.receiver === Global.currentApplicationAddress)
    assert(payment.amount === this.price.value)
    this.lastPayment.value = payment.amount
    this.renewCount.value += 1
  }

  offerForSale(_sellAmount: uint64, _reservedFor: Account): void {
    this.ownershipCalls.value += 1
  }

  purchase(payment: gtxn.PaymentTxn): void {
    assert(payment.sender === Txn.sender)
    assert(payment.receiver === Global.currentApplicationAddress)
    assert(payment.amount === btoi(this.saleAmount.value))
    this.owner.value = payment.sender
    this.purchaseCount.value += 1
  }
}
