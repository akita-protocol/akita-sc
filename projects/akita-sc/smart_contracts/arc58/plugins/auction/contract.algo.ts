import { abimethod, Account, Application, Asset, Bytes, bytes, GlobalState, itxn, loggedAssert, OnCompleteAction, op, uint64 } from "@algorandfoundation/algorand-typescript"
import { abiCall, encodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4"
import { AssetHolding, Global } from "@algorandfoundation/algorand-typescript/op"
import { classes } from "polytype"
import { AuctionGlobalStateKeyBidAsset, AuctionGlobalStateKeyBidFee, AuctionGlobalStateKeyGateID, AuctionGlobalStateKeySellerReferrer } from "../../../auction/constants"
import { GateMustCheckAbiMethod, GateMustCheckForAbiMethod } from "../../../gates/constants"
import { GateArgs } from "../../../gates/types"
import { getAkitaAppList, getControlledSpendingAccount, getPrizeBoxOwner, legacyOriginOr, legacyWalletOf, pluginPrincipalOf, rekeyAddress } from "../../../utils/functions"
import { gateCtx, windowHint } from "../../../utils/principal"
import { errNotPrizeBoxOwner } from "../../../utils/errors"
import { Proof } from "../../../utils/types/merkles"
import { AuctionPluginGlobalStateKeyFactory } from "./constants"
import { errAuctionPrizeCannotBeAlgo, errCreatorNotAuctionFactory, errNotEnoughAsset } from "./errors"

// CONTRACT IMPORTS
import { BaseAuction } from "../../../auction/base"
import type { Auction } from "../../../auction/contract.algo"
import type { AuctionFactory } from "../../../auction/factory.algo"
import type { PrizeBox } from "../../../prize-box/contract.algo"
import { AkitaBaseContract } from "../../../utils/base-contracts/upgradeable"

/**
 * AuctionPlugin v3 (principal resolution, docs/principal-resolution/PHASE-0-SPEC.md §6.6, §6.11).
 * Plugin ABI unchanged from v2. Requires the Phase 2 AuctionFactory (hinted `newAuction`).
 * - creation passes `windowHint(wallet)` to the factory, which stores the seller's verified referrer
 * - gated bids on children with `seller_referrer` (principal ABI) send `Gate.mustCheckFor` with the
 *   window's verified context and hint the window; older children get the legacy `gatedBid` with the
 *   subject they assert (registry origin of the spending account)
 *
 * v2 (audit 2026-10, AR-12 / AR-14):
 * - creation cost is quoted by the factory (`newAuctionCost`) instead of re-derived here
 * - bid MBR is read from the target auction (`mbr()`), so child MBR constant changes never desync
 * - weights clearing targets the auction; delete / cancel route through the factory
 * - every spend uses the controlled spending account (must be rekeyed to this plugin)
 */
export class AuctionPlugin extends classes(BaseAuction, AkitaBaseContract) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  factory = GlobalState<Application>({ key: AuctionPluginGlobalStateKeyFactory })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, factory: uint64, akitaDAO: uint64): void {
    this.version.value = version
    this.factory.value = Application(factory)
    this.akitaDAO.value = Application(akitaDAO)
  }

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private assertAuction(appId: Application): void {
    loggedAssert(appId.creator === this.factory.value.address, errCreatorNotAuctionFactory)
  }

  /** children created with `seller_referrer` take the principal ABI (hinted gated bids) */
  private hasPrincipalAbi(appId: Application): boolean {
    return op.AppGlobal.getExBytes(appId, Bytes(AuctionGlobalStateKeySellerReferrer))[1]
  }

  /**
   * `appArgs(0..1)` of a gated bid's gate txn. Principal-ABI child: `Gate.mustCheckFor` with the
   * verified context of this window (the child asserts it with `gateCheckCtx`). Older child:
   * `Gate.mustCheck` with the registry origin of the spending account, the subject it asserts.
   */
  private gateSelector(principalAbi: boolean): bytes {
    return principalAbi ? methodSelector(GateMustCheckForAbiMethod) : methodSelector(GateMustCheckAbiMethod)
  }

  private gateSubject(wallet: Application, sender: Account, principalAbi: boolean): bytes {
    if (principalAbi) {
      return encodeArc4(gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet)))
    }
    return legacyOriginOr(legacyWalletOf(this.akitaDAO.value, sender), sender).bytes
  }

  /** opt the factory into `asset` (paid by the wallet) if it isn't already; no-op for ALGO */
  private ensureFactoryOptedIn(sender: Account, asset: uint64): void {
    if (asset === 0 || this.factory.value.address.isOptedIn(Asset(asset))) {
      return
    }

    const cost = abiCall<typeof AuctionFactory.prototype.optInCost>({
      appId: this.factory.value,
      args: [Asset(asset)],
    }).returnValue

    abiCall<typeof AuctionFactory.prototype.optIn>({
      sender,
      appId: this.factory.value,
      args: [
        itxn.payment({
          sender,
          receiver: this.factory.value.address,
          amount: cost
        }),
        Asset(asset),
      ]
    })
  }

  // AUCTION PLUGIN METHODS -----------------------------------------------------------------------

  new(
    wallet: Application,
    rekeyBack: boolean,
    prizeID: uint64, // Asset
    prizeAmount: uint64,
    name: string,
    proof: Proof,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endtimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(prizeID !== 0, errAuctionPrizeCannotBeAlgo)
    const senderPrizeBalance = AssetHolding.assetBalance(sender, prizeID)[0]
    loggedAssert(senderPrizeBalance >= prizeAmount, errNotEnoughAsset)

    this.ensureFactoryOptedIn(sender, prizeID)
    this.ensureFactoryOptedIn(sender, bidAssetID)

    const cost = abiCall<typeof AuctionFactory.prototype.newAuctionCost>({
      appId: this.factory.value,
      args: [false, bidAssetID, prizeID, weightsListCount],
    }).returnValue

    const mbrTxn = itxn.payment({
      sender,
      receiver: this.factory.value.address,
      amount: cost
    })

    const prizeTxn = itxn.assetTransfer({
      sender,
      assetReceiver: this.factory.value.address,
      assetAmount: prizeAmount,
      xferAsset: Asset(prizeID)
    })

    return abiCall<typeof AuctionFactory.prototype.newAuction>({
      sender,
      appId: this.factory.value,
      args: [
        mbrTxn,
        prizeTxn,
        name,
        proof,
        bidAssetID,
        bidFee,
        startingBid,
        bidMinimumIncrease,
        startTimestamp,
        endtimestamp,
        gateID,
        marketplace,
        weightsListCount,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    }).returnValue
  }

  listPrizeBox(
    wallet: Application,
    rekeyBack: boolean,
    prizeBox: Application,
    bidAssetID: uint64,
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(getPrizeBoxOwner(this.akitaDAO.value, prizeBox) === sender, errNotPrizeBoxOwner)

    this.ensureFactoryOptedIn(sender, bidAssetID)

    const cost = abiCall<typeof AuctionFactory.prototype.newAuctionCost>({
      appId: this.factory.value,
      args: [true, bidAssetID, 0, weightsListCount],
    }).returnValue

    const prizeBoxTransferTxn = itxn.applicationCall({
      sender,
      appId: prizeBox,
      onCompletion: OnCompleteAction.NoOp,
      appArgs: [
        methodSelector<typeof PrizeBox.prototype.transfer>(),
        this.factory.value.address,
      ],
    })

    return abiCall<typeof AuctionFactory.prototype.newPrizeBoxAuction>({
      sender,
      appId: this.factory.value,
      args: [
        prizeBoxTransferTxn,
        itxn.payment({
          sender,
          receiver: this.factory.value.address,
          amount: cost,
        }),
        bidAssetID,
        bidFee,
        startingBid,
        bidMinimumIncrease,
        startTimestamp,
        endTimestamp,
        gateID,
        marketplace,
        weightsListCount,
        windowHint(wallet),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  clearWeightsBoxes(
    wallet: Application,
    rekeyBack: boolean,
    auctionAppID: uint64,
    iterationAmount: uint64
  ): void {
    this.assertAuction(Application(auctionAppID))
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Auction.prototype.clearWeightsBoxes>({
      sender,
      appId: Application(auctionAppID),
      args: [iterationAmount],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  deleteAuctionApp(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertAuction(appId)

    abiCall<typeof AuctionFactory.prototype.deleteAuctionApp>({
      sender,
      appId: this.factory.value,
      args: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  bid(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    amount: uint64,
    args: GateArgs,
    marketplace: Account
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    this.assertAuction(appId)

    // AR-12: MBR is quoted by the auction itself
    const { bids, bidsByAddress, locations } = abiCall<typeof BaseAuction.prototype.mbr>({
      appId,
    }).returnValue

    let mbr = bids
    const bidFee = op.AppGlobal.getExUint64(appId, Bytes(AuctionGlobalStateKeyBidFee))[0]
    const hasBid = abiCall<typeof Auction.prototype.hasBid>({
      appId,
      args: [sender]
    }).returnValue

    if (!hasBid) {
      mbr += bidsByAddress
      if (bidFee > 0) {
        mbr += locations
      }
    }

    const bidAsset = Asset(op.AppGlobal.getExUint64(appId, Bytes(AuctionGlobalStateKeyBidAsset))[0])
    if (bidAsset.id === 0) {

      const mbrPayment = itxn.payment({
        sender,
        receiver: appId.address,
        amount: amount + mbr
      })

      if (args.length > 0) {
        const principalAbi = this.hasPrincipalAbi(appId)
        const gateTxn = itxn.applicationCall({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [
            this.gateSelector(principalAbi),
            this.gateSubject(wallet, sender, principalAbi),
            op.AppGlobal.getExUint64(appId, Bytes(AuctionGlobalStateKeyGateID))[0],
            encodeArc4(args)
          ]
        })

        if (principalAbi) {
          abiCall<typeof Auction.prototype.gatedBid>({
            sender,
            appId,
            args: [mbrPayment, gateTxn, marketplace, windowHint(wallet)],
            rekeyTo: rekeyAddress(rekeyBack, wallet)
          })
        } else {
          abiCall<typeof Auction.prototype.legacyGatedBid>({
            sender,
            appId,
            args: [mbrPayment, gateTxn, marketplace],
            rekeyTo: rekeyAddress(rekeyBack, wallet)
          })
        }
      } else {
        abiCall<typeof Auction.prototype.bid>({
          sender,
          appId,
          args: [
            mbrPayment,
            marketplace,
          ],
          rekeyTo: rekeyAddress(rekeyBack, wallet)
        })
      }
    } else {
      const mbrTxn = itxn.payment({
        sender,
        receiver: appId.address,
        amount: mbr
      })

      const xferTxn = itxn.assetTransfer({
        sender,
        assetReceiver: appId.address,
        assetAmount: amount,
        xferAsset: bidAsset
      })

      if (args.length > 0) {
        const principalAbi = this.hasPrincipalAbi(appId)
        const gateTxn = itxn.applicationCall({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [
            this.gateSelector(principalAbi),
            this.gateSubject(wallet, sender, principalAbi),
            op.AppGlobal.getExUint64(appId, Bytes(AuctionGlobalStateKeyGateID))[0],
            encodeArc4(args)
          ]
        })

        if (principalAbi) {
          abiCall<typeof Auction.prototype.gatedBidAsa>({
            sender,
            appId,
            args: [mbrTxn, xferTxn, gateTxn, marketplace, windowHint(wallet)],
            rekeyTo: rekeyAddress(rekeyBack, wallet)
          })
        } else {
          abiCall<typeof Auction.prototype.legacyGatedBidAsa>({
            sender,
            appId,
            args: [mbrTxn, xferTxn, gateTxn, marketplace],
            rekeyTo: rekeyAddress(rekeyBack, wallet)
          })
        }
      } else {
        abiCall<typeof Auction.prototype.bidAsa>({
          sender,
          appId,
          args: [
            mbrTxn,
            xferTxn,
            marketplace,
          ],
          rekeyTo: rekeyAddress(rekeyBack, wallet)
        })
      }
    }
  }

  refundBid(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    id: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertAuction(appId)

    abiCall<typeof Auction.prototype.refundBid>({
      sender,
      appId,
      args: [id],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  refundMBR(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    iterationAmount: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertAuction(appId)

    abiCall<typeof Auction.prototype.refundMBR>({
      sender,
      appId,
      args: [iterationAmount],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  claimPrize(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertAuction(appId)

    abiCall<typeof Auction.prototype.claimPrize>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  claimRafflePrize(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertAuction(appId)

    abiCall<typeof Auction.prototype.claimRafflePrize>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  raffle(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    this.assertAuction(appId)
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Auction.prototype.raffle>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  findWinner(
    wallet: Application,
    rekeyBack: boolean,
    auctionAppID: uint64,
    iterationAmount: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertAuction(Application(auctionAppID))

    abiCall<typeof Auction.prototype.findWinner>({
      sender,
      appId: auctionAppID,
      args: [iterationAmount],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  /**
   * kept for ABI compatibility with v1 method restrictions; routes through the factory.
   * NoOp only: under its conventional name this would be the plugin's own DeleteApplication handler
   */
  @abimethod({ name: 'deleteApplication', allowActions: 'NoOp' })
  legacyDeleteApplication(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    this.deleteAuctionApp(wallet, rekeyBack, appId)
  }

  /** cancels an auction before it starts (through the factory, which refunds the funder) */
  cancel(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertAuction(appId)

    abiCall<typeof AuctionFactory.prototype.cancelAuction>({
      sender,
      appId: this.factory.value,
      args: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }
}
