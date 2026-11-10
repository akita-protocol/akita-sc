import { Account, Application, bytes, Bytes, Global, GlobalState, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi } from '@algorandfoundation/algorand-typescript/op'
import { NFDGlobalStateKeysName } from '../../../utils/constants/nfd'
import { getControlledSpendingAccount, rekeyAddress } from '../../../utils/functions'
import { NFDGlobalStateKeyExpirationTime, NFDGlobalStateKeyOwner, NFDGlobalStateKeySaleAmountKey, NFDPluginAutoRenewWindow, NFDPluginGlobalStateKeyRegistry } from './constants'
import { errCannotAutoRenew, errNotAnNfd, errNotNfdOwner, errNoSaleAmount, errPriceAboveMax } from './errors'

// CONTRACT IMPORTS
import type { NFD } from '../../../utils/types/nfd'
import type { NFDRegistry } from '../../../utils/types/nfd-registry'

export class NFDPlugin extends Contract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registry = GlobalState<Application>({ key: NFDPluginGlobalStateKeyRegistry })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private isNFD(NFDApp: Application): boolean {
    const nfdNameBytes = op.AppGlobal.getExBytes(NFDApp, Bytes(NFDGlobalStateKeysName))[0]

    return abiCall<typeof NFDRegistry.prototype.isValidNfdAppId>({
      appId: this.registry.value,
      args: [String(nfdNameBytes), NFDApp.id]
    }).returnValue
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(registry: uint64) {
    this.registry.value = Application(registry)
  }

  // X METHODS ------------------------------------------------------------------------------

  mint(
    wallet: Application,
    rekeyBack: boolean,
    nfdName: string,
    amount: uint64,
    reservedFor: Account,
    linkOnMint: boolean
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    const appId = this.registry.value

    return abiCall<typeof NFDRegistry.prototype.mintNfd>({
      sender,
      appId,
      args: [
        itxn.payment({
          sender,
          receiver: appId.address,
          amount
        }),
        nfdName,
        reservedFor,
        linkOnMint
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    }).returnValue
  }

  deleteFields(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    fieldNames: bytes[]
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.deleteFields>({
      sender,
      appId,
      args: [fieldNames],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  updateFields(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    fieldAndVals: bytes[],
    mbrCost: uint64
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    if (mbrCost > 0) {
      itxn.payment({
        sender,
        receiver: appId.address,
        amount: mbrCost,
      }).submit()
    }

    abiCall<typeof NFD.prototype.updateFields>({
      sender,
      appId,
      args: [fieldAndVals],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  linkNfdAddress(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    nfdName: string,
    nfdMbrCost: uint64,
    registryMbrCost: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    if (nfdMbrCost > 0) {
      itxn.payment({
        sender,
        receiver: appId.address,
        amount: nfdMbrCost,
      }).submit()
    }

    if (registryMbrCost > 0) {
      itxn.payment({
        sender,
        receiver: this.registry.value.address,
        amount: registryMbrCost,
      }).submit()
    }

    abiCall<typeof NFDRegistry.prototype.linkNfdAddress>({
      sender,
      appId: this.registry.value,
      args: [nfdName, appId.id, sender],
      apps: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  unlinkNfdAddress(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    nfdName: string,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFDRegistry.prototype.unlinkNfdAddress>({
      sender,
      appId: this.registry.value,
      args: [nfdName, appId.id, address],
      apps: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  setAddressPrimaryNfd(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    nfdName: string,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFDRegistry.prototype.setAddressPrimaryNfd>({
      sender,
      appId: this.registry.value,
      args: [nfdName, appId.id, address],
      apps: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  offerForSale(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    sellAmount: uint64,
    reservedFor: Account
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.offerForSale>({
      sender,
      appId,
      args: [sellAmount, reservedFor],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  cancelSale(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.cancelSale>({
      sender,
      appId,
      args: [],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  postOffer(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    offer: uint64,
    note: string
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.postOffer>({
      sender,
      appId,
      args: [offer, note],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  purchase(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    maxPrice: uint64,
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    const [saleAmountBytes, saleAmountBytesExists] = op.AppGlobal.getExBytes(appId.id, Bytes(NFDGlobalStateKeySaleAmountKey))
    loggedAssert(saleAmountBytesExists, errNoSaleAmount)
    const saleAmount = btoi(saleAmountBytes)
    loggedAssert(saleAmount <= maxPrice, errPriceAboveMax)

    abiCall<typeof NFD.prototype.purchase>({
      sender,
      appId,
      args: [
        itxn.payment({
          sender,
          receiver: appId.address,
          amount: saleAmount
        }),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  updateHash(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    hash: bytes
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.updateHash>({
      sender,
      appId,
      args: [hash],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  contractLock(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    lock: boolean
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.contractLock>({
      sender,
      appId,
      args: [lock],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  segmentLock(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    lock: boolean,
    usdPrice: uint64
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.segmentLock>({
      sender,
      appId,
      args: [lock, usdPrice],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  vaultOptInLock(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    lock: boolean
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.vaultOptInLock>({
      sender,
      appId,
      args: [lock],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  vaultOptIn(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    assets: uint64[]
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.vaultOptIn>({
      sender,
      appId,
      args: [assets],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  vaultSend(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    amount: uint64,
    receiver: Account,
    note: string,
    asset: uint64,
    otherAssets: uint64[]
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.vaultSend>({
      sender,
      appId,
      args: [amount, receiver, note, asset, otherAssets],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  renew(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    years: uint64,
    maxPrice: uint64
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    const price = abiCall<typeof NFD.prototype.getRenewPrice>({
      sender,
      appId,
      args: []
    }).returnValue
    const total: uint64 = price * years
    loggedAssert(total <= maxPrice, errPriceAboveMax)

    abiCall<typeof NFD.prototype.renew>({
      sender,
      appId,
      args: [
        itxn.payment({
          sender,
          receiver: appId.address,
          amount: total
        })
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  autoRenew(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    maxPrice: uint64
  ): void {

    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    // autoRenew is meant for keeper/global grants, so it may only spend on an
    // NFD this spending account actually owns (`renew` stays permissionless).
    const [ownerBytes, ownerExists] = op.AppGlobal.getExBytes(appId.id, Bytes(NFDGlobalStateKeyOwner))
    loggedAssert(ownerExists && ownerBytes.length === 32, errNotNfdOwner)
    loggedAssert(Account(ownerBytes) === sender, errNotNfdOwner)

    const [expirationBytes, expirationExists] = op.AppGlobal.getExBytes(appId.id, Bytes(NFDGlobalStateKeyExpirationTime))
    loggedAssert(expirationExists, errCannotAutoRenew)

    const expiration = btoi(expirationBytes)
    loggedAssert(expiration > 0, errCannotAutoRenew)
    // Only renew an NFD that has not expired yet.
    loggedAssert(expiration >= Global.latestTimestamp, errCannotAutoRenew)
    loggedAssert(expiration <= Global.latestTimestamp + NFDPluginAutoRenewWindow, errCannotAutoRenew)

    const price = abiCall<typeof NFD.prototype.getRenewPrice>({
      sender,
      appId,
      args: []
    }).returnValue
    // NFD prices the renewal at call time (USD oracle, and possibly the root's segment price),
    // so the caller bounds it; an execution-key grant fixes this bound in the approved group.
    loggedAssert(price <= maxPrice, errPriceAboveMax)

    abiCall<typeof NFD.prototype.renew>({
      sender,
      appId,
      args: [
        itxn.payment({
          sender,
          receiver: appId.address,
          amount: price
        })
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  setPrimaryAddress(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    fieldName: string,
    address: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), errNotAnNfd)

    abiCall<typeof NFD.prototype.setPrimaryAddress>({
      sender,
      appId,
      args: [fieldName, address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
