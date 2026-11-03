import { Account, Application, bytes, Bytes, Global, GlobalState, itxn, loggedAssert, op, uint64, contract } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { btoi } from '@algorandfoundation/algorand-typescript/op'
import { NFDGlobalStateKeysName } from '../../../utils/constants/nfd'
import { getSpendingAccount, rekeyAddress } from '../../../utils/functions'
import { NFDGlobalStateKeyExpirationTime, NFDGlobalStateKeySaleAmountKey, NFDPluginAutoRenewWindow, NFDPluginGlobalStateKeyRegistry } from './constants'
import { ERR_CANNOT_AUTO_RENEW, ERR_NOT_AN_NFD, ERR_NO_SALE_AMOUNT } from './errors'

// CONTRACT IMPORTS
import type { NFD } from '../../../utils/types/nfd'
import type { NFDRegistry } from '../../../utils/types/nfd-registry'

@contract({ ui: { glyph: 'Identification', color: '#ff602d', defaultAction: 'nfd_update' } })
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

  @abimethod({ ui: { action: 'nfd_purchase', glyph: 'ShoppingBag', label: 'Mint NFD' } })
  mint(
    wallet: Application,
    rekeyBack: boolean,
    nfdName: string,
    amount: uint64,
    reservedFor: Account,
    linkOnMint: boolean
  ): uint64 {
    const sender = getSpendingAccount(wallet)
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

  @abimethod({ ui: { action: 'nfd_update', glyph: 'PencilSquare', label: 'Remove NFD fields' } })
  deleteFields(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    fieldNames: bytes[]
  ): void {
    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFD.prototype.deleteFields>({
      sender,
      appId,
      args: [fieldNames],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'nfd_update', glyph: 'PencilSquare', label: 'Update NFD' } })
  updateFields(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    fieldAndVals: bytes[],
    mbrCost: uint64
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

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

  @abimethod({ ui: { action: 'nfd_link', glyph: 'Link', label: 'Link address' } })
  linkNfdAddress(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    nfdName: string,
    nfdMbrCost: uint64,
    registryMbrCost: uint64
  ): void {
    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

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

  @abimethod({ ui: { action: 'nfd_unlink', glyph: 'XCircle', label: 'Unlink address' } })
  unlinkNfdAddress(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    nfdName: string,
    address: Account
  ): void {
    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFDRegistry.prototype.unlinkNfdAddress>({
      sender,
      appId: this.registry.value,
      args: [nfdName, appId.id, address],
      apps: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  @abimethod({ ui: { action: 'nfd_primary', glyph: 'Star', label: 'Set primary NFD' } })
  setAddressPrimaryNfd(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    nfdName: string,
    address: Account
  ): void {
    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFDRegistry.prototype.setAddressPrimaryNfd>({
      sender,
      appId: this.registry.value,
      args: [nfdName, appId.id, address],
      apps: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  @abimethod({ ui: { action: 'nfd_list', glyph: 'Tag', label: 'List NFD for sale' } })
  offerForSale(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    sellAmount: uint64,
    reservedFor: Account
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFD.prototype.offerForSale>({
      sender,
      appId,
      args: [sellAmount, reservedFor],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'nfd_delist', glyph: 'ArchiveBoxXMark', label: 'Cancel NFD sale' } })
  cancelSale(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFD.prototype.cancelSale>({
      sender,
      appId,
      args: [],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'nfd_offer', glyph: 'HandRaised', label: 'Offer on NFD' } })
  postOffer(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    offer: uint64,
    note: string
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFD.prototype.postOffer>({
      sender,
      appId,
      args: [offer, note],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'nfd_purchase', glyph: 'ShoppingBag', label: 'Buy NFD' } })
  purchase(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    const [saleAmountBytes, saleAmountBytesExists] = op.AppGlobal.getExBytes(appId.id, Bytes(NFDGlobalStateKeySaleAmountKey))
    loggedAssert(saleAmountBytesExists, ERR_NO_SALE_AMOUNT)

    abiCall<typeof NFD.prototype.purchase>({
      sender,
      appId,
      args: [
        itxn.payment({
          sender,
          receiver: appId.address,
          amount: btoi(saleAmountBytes)
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

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFD.prototype.updateHash>({
      sender,
      appId,
      args: [hash],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'nfd_lock', glyph: 'LockClosed', label: 'Lock NFD' } })
  contractLock(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    lock: boolean
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

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

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

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

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

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

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

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

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFD.prototype.vaultSend>({
      sender,
      appId,
      args: [amount, receiver, note, asset, otherAssets],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'nfd_renew', glyph: 'ArrowPath', label: 'Renew NFD' } })
  renew(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    years: uint64
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    const price = abiCall<typeof NFD.prototype.getRenewPrice>({
      sender,
      appId,
      args: []
    }).returnValue

    abiCall<typeof NFD.prototype.renew>({
      sender,
      appId,
      args: [
        itxn.payment({
          sender,
          receiver: appId.address,
          amount: (price * years)
        })
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  @abimethod({ ui: { action: 'nfd_renew', glyph: 'ArrowPath', label: 'Auto-renew NFD' } })
  autoRenew(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {

    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    const [expirationBytes, expirationExists] = op.AppGlobal.getExBytes(appId.id, Bytes(NFDGlobalStateKeyExpirationTime))
    loggedAssert(expirationExists, ERR_CANNOT_AUTO_RENEW)

    const expiration = btoi(expirationBytes)
    loggedAssert(expiration > 0, ERR_CANNOT_AUTO_RENEW)
    loggedAssert(expiration <= Global.latestTimestamp + NFDPluginAutoRenewWindow, ERR_CANNOT_AUTO_RENEW)

    const price = abiCall<typeof NFD.prototype.getRenewPrice>({
      sender,
      appId,
      args: []
    }).returnValue

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

  @abimethod({ ui: { action: 'nfd_primary', glyph: 'Star', label: 'Set primary address' } })
  setPrimaryAddress(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    fieldName: string,
    address: Account
  ): void {
    const sender = getSpendingAccount(wallet)

    loggedAssert(this.isNFD(appId), ERR_NOT_AN_NFD)

    abiCall<typeof NFD.prototype.setPrimaryAddress>({
      sender,
      appId,
      args: [fieldName, address],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
