import {
  Account,
  bytes,
  Contract,
  Global,
  GlobalState,
  gtxn,
  loggedAssert,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { itob } from '@algorandfoundation/algorand-typescript/op'

/**
 * Test-only NFD instance that exposes the renewal quote and payment it received.
 * Named apart from `mocks/nfd/contract.algo.ts`'s `MockNfd`: generated clients share one flat SDK directory.
 * `i.owner.a` is the expected payer, so the NFD plugin's ownership check (F4, `errNnow`) passes for the
 * renewing spending account.
 */
export class MockNfdRenewalProbe extends Contract {
  name = GlobalState<string>({ key: 'i.name' })
  owner = GlobalState<Account>({ key: 'i.owner.a' })
  expiration = GlobalState<bytes>({ key: 'i.expirationTime' })
  renewPrice = GlobalState<uint64>({ key: 'renewPrice' })
  expectedPayer = GlobalState<Account>({ key: 'expectedPayer' })
  quoteCount = GlobalState<uint64>({ key: 'quoteCount' })
  renewalCount = GlobalState<uint64>({ key: 'renewalCount' })
  lastRenewAmount = GlobalState<uint64>({ key: 'lastAmount' })
  lastRenewPayer = GlobalState<Account>({ key: 'lastPayer' })

  @abimethod({ onCreate: 'require' })
  create(
    name: string,
    expiration: uint64,
    renewPrice: uint64,
    expectedPayer: Account,
    includeExpiration: boolean,
  ): void {
    this.name.value = name
    this.owner.value = expectedPayer
    if (includeExpiration) {
      this.expiration.value = itob(expiration)
    }
    this.renewPrice.value = renewPrice
    this.expectedPayer.value = expectedPayer
    this.quoteCount.value = 0
    this.renewalCount.value = 0
    this.lastRenewAmount.value = 0
    this.lastRenewPayer.value = Global.zeroAddress
  }

  setExpiration(expiration: uint64): void {
    loggedAssert(Txn.sender === Global.creatorAddress, 'errNotCreator')
    this.expiration.value = itob(expiration)
  }

  setExpirationFromNow(offset: uint64): void {
    loggedAssert(Txn.sender === Global.creatorAddress, 'errNotCreator')
    this.expiration.value = itob(Global.latestTimestamp + offset)
  }

  getRenewPrice(): uint64 {
    this.quoteCount.value += 1
    return this.renewPrice.value
  }

  renew(payment: gtxn.PaymentTxn): void {
    loggedAssert(payment.sender === this.expectedPayer.value, 'errWrongPayer')
    loggedAssert(payment.receiver === Global.currentApplicationAddress, 'errWrongReceiver')
    loggedAssert(payment.amount === this.renewPrice.value, 'errWrongAmount')

    this.renewalCount.value += 1
    this.lastRenewAmount.value = payment.amount
    this.lastRenewPayer.value = payment.sender
  }
}
