import { Account, Application, bytes, Bytes, Global, GlobalState, gtxn, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi, itob } from '@algorandfoundation/algorand-typescript/op'

const ONE_YEAR: uint64 = 365 * 24 * 60 * 60

/**
 * TEST-ONLY NFD registry double. `isValidNfdAppId` accepts any NFD app created
 * by the same deployer whose `i.name` matches. ABI-compatible with the subset
 * of the NFD registry the NFDPlugin calls in these tests.
 *
 * Like the live registry (MainNet app 760937186), it refuses every call that carries a RekeyTo, and
 * `costToAddToAddress` is its own quote for a link. The mint, link, unlink and primary calls only count.
 */
export class MockNfdRegistry extends Contract {
  linkCost = GlobalState<uint64>({ key: 'linkCost' })
  mints = GlobalState<uint64>({ key: 'mints' })
  links = GlobalState<uint64>({ key: 'links' })
  unlinks = GlobalState<uint64>({ key: 'unlinks' })
  primaries = GlobalState<uint64>({ key: 'primaries' })
  lastAddress = GlobalState<Account>({ key: 'lastAddress' })

  private noRekey(): void {
    loggedAssert(Txn.rekeyTo === Global.zeroAddress, 'mockRegistryRekey')
  }

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.linkCost.value = 0
    this.mints.value = 0
    this.links.value = 0
    this.unlinks.value = 0
    this.primaries.value = 0
    this.lastAddress.value = Global.zeroAddress
  }

  setLinkCost(cost: uint64): void {
    loggedAssert(Txn.sender === Global.creatorAddress, 'mockRegistryCreator')
    this.linkCost.value = cost
  }

  costToAddToAddress(lookupAddress: Account): uint64 {
    this.noRekey()
    return this.linkCost.value
  }

  mintNfd(purchaseTxn: gtxn.PaymentTxn, nfdName: string, reservedFor: Account, linkOnMint: boolean): uint64 {
    this.noRekey()
    loggedAssert(purchaseTxn.receiver === Global.currentApplicationAddress, 'mockRegistryMintReceiver')
    this.mints.value += 1
    this.lastAddress.value = Txn.sender
    return this.mints.value
  }

  linkNfdAddress(nfdName: string, nfdAppId: uint64, addrToVerify: Account): void {
    this.noRekey()
    loggedAssert(Txn.sender === addrToVerify, 'mockRegistryLinkSender')
    this.links.value += 1
    this.lastAddress.value = addrToVerify
  }

  unlinkNfdAddress(nfdName: string, nfdAppId: uint64, addrToRemove: Account): void {
    this.noRekey()
    this.unlinks.value += 1
    this.lastAddress.value = addrToRemove
  }

  setAddressPrimaryNfd(nfdName: string, nfdAppId: uint64, addrBeingModified: Account): void {
    this.noRekey()
    this.primaries.value += 1
    this.lastAddress.value = addrBeingModified
  }

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
