import { Account, Application, bytes, Bytes, Global, GlobalState, gtxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi, itob } from '@algorandfoundation/algorand-typescript/op'

const ONE_YEAR: uint64 = 365 * 24 * 60 * 60

/**
 * TEST-ONLY NFD registry double. `isValidNfdAppId` accepts any NFD app created
 * by the same deployer whose `i.name` matches. ABI-compatible with the subset
 * of the NFD registry the NFDPlugin calls in these tests.
 */
export class MockNfdRegistry extends Contract {
  @abimethod({ onCreate: 'require' })
  create(): void { }

  @abimethod({ readonly: true })
  isValidNfdAppId(nfdName: string, nfdAppId: uint64): boolean {
    const app = Application(nfdAppId)
    if (app.creator !== Global.creatorAddress) {
      return false
    }
    const [name, exists] = op.AppGlobal.getExBytes(app, Bytes('i.name'))
    return exists && name === Bytes(nfdName)
  }
}

/**
 * TEST-ONLY NFD double: stores the internal properties the NFDPlugin reads
 * (`i.name`, `i.owner.a`, `i.expirationTime`) and implements `getRenewPrice` /
 * `renew(pay)`. Renewals are accepted from anyone, like real NFD gift renewals.
 */
export class MockNfd extends Contract {
  name = GlobalState<bytes>({ key: 'i.name' })
  owner = GlobalState<bytes>({ key: 'i.owner.a' })
  expirationTime = GlobalState<bytes>({ key: 'i.expirationTime' })
  renewPrice = GlobalState<uint64>({ key: 'renewPrice' })

  @abimethod({ onCreate: 'require' })
  create(nfdName: string, owner: Account, expiration: uint64, renewPrice: uint64): void {
    this.name.value = Bytes(nfdName)
    this.owner.value = owner.bytes
    this.expirationTime.value = itob(expiration)
    this.renewPrice.value = renewPrice
  }

  getRenewPrice(): uint64 {
    return this.renewPrice.value
  }

  renew(payment: gtxn.PaymentTxn): void {
    loggedAssert(payment.receiver === Global.currentApplicationAddress, 'mockNfdRenewReceiver')
    loggedAssert(payment.amount >= this.renewPrice.value, 'mockNfdRenewAmount')
    this.expirationTime.value = itob(btoi(this.expirationTime.value) + ONE_YEAR)
  }
}
