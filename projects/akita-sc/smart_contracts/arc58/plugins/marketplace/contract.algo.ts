import { Account, Application, Asset, Bytes, GlobalState, itxn, loggedAssert, OnCompleteAction, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding, Global } from '@algorandfoundation/algorand-typescript/op'
import { GateArgs } from '../../../gates/types'
import { ListingGlobalStateKeyGateID, ListingGlobalStateKeyPaymentAsset, ListingGlobalStateKeyPrice } from '../../../marketplace/constants'
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions"
import { GateMustCheckForAbiMethod, getAkitaAppList, getPrizeBoxOwner, pluginPrincipalOf } from '../../../utils/functions'
import { gateCtx, windowHint } from '../../../utils/principal'
import { Proof } from '../../../utils/types/merkles'
import { MarketplacePluginGlobalStateKeyFactory } from './constants'
import { errNotPrizeBoxOwner } from '../../../utils/errors'
import { errListingCreatorNotMarketplace, errNotEnoughAsset, errPriceAboveMax } from './errors'

// CONTRACT IMPORTS
import type { Listing } from '../../../marketplace/listing.algo'
import type { Marketplace } from '../../../marketplace/marketplace.algo'
import type { PrizeBox } from '../../../prize-box/contract.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'


export class MarketplacePlugin extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  factory = GlobalState<Application>({ key: MarketplacePluginGlobalStateKeyFactory })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  createApplication(version: string, factory: Application, akitaDAO: Application): void {
    this.version.value = version
    this.factory.value = factory
    this.akitaDAO.value = akitaDAO
  }

  // MARKETPLACE PLUGIN METHODS -------------------------------------------------------------------

  list(
    wallet: Application,
    rekeyBack: boolean,
    asset: uint64, // 0 | Asset
    assetAmount: uint64,
    price: uint64,
    paymentAsset: uint64, // 0 | Asset
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof,
    maxCreatorRoyalty: uint64,
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(AssetHolding.assetBalance(sender, asset)[0] >= assetAmount, errNotEnoughAsset)

    // The prize needs the factory alone to hold it: one opt-in, and nothing that depends on the DAO
    // revenue escrow (which only ever receives the payment asset).
    if (!this.factory.value.address.isOptedIn(Asset(asset))) {
      abiCall<typeof Marketplace.prototype.optInPrize>({
        sender,
        appId: this.factory.value,
        args: [
          itxn.payment({
            sender,
            receiver: this.factory.value.address,
            amount: Global.assetOptInMinBalance
          }),
          Asset(asset),
        ]
      })
    }

    if (paymentAsset !== 0 && !this.factory.value.address.isOptedIn(Asset(paymentAsset))) {
      const optinMBR = abiCall<typeof Marketplace.prototype.optInCost>({
        sender,
        appId: this.factory.value,
        args: [Asset(paymentAsset)]
      }).returnValue

      abiCall<typeof Marketplace.prototype.optIn>({
        sender,
        appId: this.factory.value,
        args: [
          itxn.payment({
            sender,
            receiver: this.factory.value.address,
            amount: optinMBR
          }),
          Asset(paymentAsset),
        ]
      })
    }

    // the factory quotes its own exact cost (after any opt-ins above have landed)
    const childContractMBR = abiCall<typeof Marketplace.prototype.listCost>({
      sender,
      appId: this.factory.value,
      args: [asset, paymentAsset, false]
    }).returnValue

    return abiCall<typeof Marketplace.prototype.list>({
      sender,
      appId: this.factory.value,
      args: [
        itxn.payment({
          sender,
          receiver: this.factory.value.address,
          amount: childContractMBR
        }),
        itxn.assetTransfer({
          sender,
          assetReceiver: this.factory.value.address,
          assetAmount: assetAmount,
          xferAsset: asset
        }),
        price,
        paymentAsset,
        expiration,
        reservedFor,
        gateID,
        marketplace,
        name,
        proof,
        // principal resolution invariant 6: hint exactly the wallet whose window this call serves
        windowHint(wallet),
        // the seller's bound on the royalty, which the factory resolves when this call runs
        maxCreatorRoyalty,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
      fee: 0,
    }).returnValue
  }

  listPrizeBox(
    wallet: Application,
    rekeyBack: boolean,
    prizeBox: Application,
    price: uint64,
    paymentAsset: uint64, // 0 | Asset
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(getPrizeBoxOwner(this.akitaDAO.value, prizeBox) === sender, errNotPrizeBoxOwner)

    const prizeBoxTransferTxn = itxn.applicationCall({
      sender,
      appId: prizeBox,
      onCompletion: OnCompleteAction.NoOp,
      appArgs: [
        methodSelector<typeof PrizeBox.prototype.transfer>(),
        this.factory.value.address
      ],
    })

    if (paymentAsset !== 0 && !this.factory.value.address.isOptedIn(Asset(paymentAsset))) {
      const optinMBR = abiCall<typeof Marketplace.prototype.optInCost>({
        sender,
        appId: this.factory.value,
        args: [Asset(paymentAsset)]
      }).returnValue

      abiCall<typeof Marketplace.prototype.optIn>({
        sender,
        appId: this.factory.value,
        args: [
          itxn.payment({
            sender,
            receiver: this.factory.value.address,
            amount: optinMBR
          }),
          Asset(paymentAsset),
        ]
      })
    }

    const childContractMBR = abiCall<typeof Marketplace.prototype.listCost>({
      sender,
      appId: this.factory.value,
      args: [0, paymentAsset, true]
    }).returnValue

    return abiCall<typeof Marketplace.prototype.listPrizeBox>({
      sender,
      appId: this.factory.value,
      args: [
        prizeBoxTransferTxn,
        itxn.payment({
          sender,
          receiver: this.factory.value.address,
          amount: childContractMBR
        }),
        price,
        paymentAsset,
        expiration,
        reservedFor,
        gateID,
        marketplace,
        windowHint(wallet),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
      fee: 0,
    }).returnValue
  }

  purchase(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    marketplace: Account,
    maxPrice: uint64,
    args: GateArgs
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(appId.creator === this.factory.value.address, errListingCreatorNotMarketplace)

    // the price is read on-chain at execution: bound it by what the buyer agreed to pay
    const price = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyPrice))[0]
    loggedAssert(price <= maxPrice, errPriceAboveMax)
    const paymentAsset = Asset(op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyPaymentAsset))[0])

    if (paymentAsset.id === 0) {
      if (args.length > 0) {
        const { gate } = getAkitaAppList(this.akitaDAO.value)
        const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]

        // the buyer's verified context, exactly what the target recomputes for windowHint(wallet)
        const ctx = gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet))
        const gateTxn = itxn.applicationCall({
          appId: gate,
          appArgs: [
            methodSelector(GateMustCheckForAbiMethod),
            encodeArc4(ctx),
            gateID,
            encodeArc4(args)
          ],
        })

        abiCall<typeof Marketplace.prototype.gatedPurchase>({
          sender,
          appId: this.factory.value,
          args: [
            itxn.payment({
              sender,
              receiver: this.factory.value.address,
              amount: price
            }),
            gateTxn,
            appId,
            marketplace,
            windowHint(wallet),
          ],
          rekeyTo: rekeyAddress(rekeyBack, wallet)
        })
      } else {
        abiCall<typeof Marketplace.prototype.purchase>({
          sender,
          appId: this.factory.value,
          args: [
            itxn.payment({
              sender,
              receiver: this.factory.value.address,
              amount: price
            }),
            appId,
            marketplace
          ],
          rekeyTo: rekeyAddress(rekeyBack, wallet)
        })
      }
    } else {
      if (args.length > 0) {
        const { gate } = getAkitaAppList(this.akitaDAO.value)
        const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]

        // the buyer's verified context, exactly what the target recomputes for windowHint(wallet)
        const ctx = gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet))
        const gateTxn = itxn.applicationCall({
          appId: gate,
          appArgs: [
            methodSelector(GateMustCheckForAbiMethod),
            encodeArc4(ctx),
            gateID,
            encodeArc4(args)
          ],
        })

        abiCall<typeof Marketplace.prototype.gatedPurchaseAsa>({
          sender,
          appId: this.factory.value,
          args: [
            itxn.assetTransfer({
              sender,
              assetReceiver: this.factory.value.address,
              assetAmount: price,
              xferAsset: paymentAsset
            }),
            gateTxn,
            appId,
            marketplace,
            windowHint(wallet),
          ],
          rekeyTo: rekeyAddress(rekeyBack, wallet)
        })
      } else {
        abiCall<typeof Marketplace.prototype.purchaseAsa>({
          sender,
          appId: this.factory.value,
          args: [
            itxn.assetTransfer({
              sender,
              assetReceiver: this.factory.value.address,
              assetAmount: price,
              xferAsset: paymentAsset
            }),
            appId,
            marketplace
          ],
          rekeyTo: rekeyAddress(rekeyBack, wallet)
        })
      }
    }
  }

  changePrice(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    price: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(appId.creator === this.factory.value.address, errListingCreatorNotMarketplace)

    abiCall<typeof Listing.prototype.changePrice>({
      sender,
      appId,
      args: [price],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  delist(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(appId.creator === this.factory.value.address, errListingCreatorNotMarketplace)

    abiCall<typeof Marketplace.prototype.delist>({
      sender,
      appId: this.factory.value,
      args: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
