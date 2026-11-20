import { abimethod, Account, Application, Asset, Bytes, bytes, GlobalState, itxn, loggedAssert, OnCompleteAction, op, uint64 } from "@algorandfoundation/algorand-typescript"
import { abiCall, encodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4"
import { AssetHolding, Global } from "@algorandfoundation/algorand-typescript/op"
import { classes } from "polytype"
import { GateMustCheckAbiMethod, GateMustCheckForAbiMethod } from "../../../gates/constants"
import { GateArgs } from "../../../gates/types"
import { RaffleGlobalStateKeyGateID, RaffleGlobalStateKeySellerReferrer, RaffleGlobalStateKeyTicketAsset } from "../../../raffle/constants"
import { errNotPrizeBoxOwner } from "../../../utils/errors"
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions"
import { getAkitaAppList, getPrizeBoxOwner, pluginPrincipalOf } from "../../../utils/functions"
import { gateCtx, windowHint } from "../../../utils/principal"
import { Proof } from "../../../utils/types/merkles"
import { RafflePluginGlobalStateKeyFactory } from "./constants"
import { GlobalStateKeyAkitaDAO } from "../../../constants"
import { errCreatorNotRaffleFactory, errNotEnoughAsset } from "./errors"

// CONTRACT IMPORTS
import type { PrizeBox } from "../../../prize-box/contract.algo"
import { BaseRaffle } from "../../../raffle/base"
import type { Raffle } from "../../../raffle/contract.algo"
import type { RaffleFactory } from "../../../raffle/factory.algo"
import { AkitaBaseContract } from "../../../utils/base-contracts/upgradeable"

/**
 * RafflePlugin v3 (principal resolution, docs/principal-resolution/PHASE-0-SPEC.md §6.8, §6.11).
 * Every method of the DEPLOYED plugin (MainNet 3569561863) keeps its signature (§6.11, §7.3):
 * `newRaffle`/`newPrizeBoxRaffle` keep the deployed no-`minEntries` form, and the v2 `minEntries`
 * form is a second overload. Requires the Phase 2 RaffleFactory (hinted `newRaffle`).
 * - creation passes `windowHint(wallet)` to the factory, which stores the seller's verified referrer
 * - gated entries on children with `seller_referrer` (principal ABI) send `Gate.mustCheckFor` with the
 *   window's verified context and hint the window; older (deployed) children get the legacy gated
 *   methods with the subject they assert: the spending account (`Txn.sender`)
 *
 * v2 (audit 2026-10, AR-14):
 * - creation cost is quoted by the factory (`newRaffleCost`), including the creation fee
 * - the ticket asset (a uint64 global) is read with getExUint64
 * - gated raffles are entered through the gated methods (v2 subject: wallet origin, AR-E; v3: see above)
 * - deletion routes through the factory; every spend uses the controlled spending account
 */
export class RafflePlugin extends classes(BaseRaffle, AkitaBaseContract) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  factory = GlobalState<Application>({ key: RafflePluginGlobalStateKeyFactory })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, factory: Application): void {
    this.version.value = version
    this.factory.value = factory
    // the DAO is the factory's (v1 never set it, which broke prize-box raffles and gate lookups)
    this.akitaDAO.value = Application(op.AppGlobal.getExUint64(factory, Bytes(GlobalStateKeyAkitaDAO))[0])
  }

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private assertRaffle(appId: Application): void {
    loggedAssert(appId.creator === this.factory.value.address, errCreatorNotRaffleFactory)
  }

  private ticketAssetOf(appId: Application): Asset {
    return Asset(op.AppGlobal.getExUint64(appId, Bytes(RaffleGlobalStateKeyTicketAsset))[0])
  }

  /** opt the factory into `asset` (paid by the wallet) if it isn't already; no-op for ALGO */
  private ensureFactoryOptedIn(sender: Account, asset: uint64): void {
    if (asset === 0 || this.factory.value.address.isOptedIn(Asset(asset))) {
      return
    }

    const cost = abiCall<typeof RaffleFactory.prototype.optInCost>({
      appId: this.factory.value,
      args: [Asset(asset)],
    }).returnValue

    abiCall<typeof RaffleFactory.prototype.optIn>({
      sender,
      appId: this.factory.value,
      args: [
        itxn.payment({
          sender,
          receiver: this.factory.value.address,
          amount: cost,
        }),
        Asset(asset),
      ],
    })
  }

  private gateID(appId: Application): uint64 {
    return op.AppGlobal.getExUint64(appId, Bytes(RaffleGlobalStateKeyGateID))[0]
  }

  /** children created with `seller_referrer` take the principal ABI (hinted gated methods) */
  private hasPrincipalAbi(appId: Application): boolean {
    return op.AppGlobal.getExBytes(appId, Bytes(RaffleGlobalStateKeySellerReferrer))[1]
  }

  /**
   * `appArgs(0..1)` of a gated call's gate txn. Principal-ABI child: `Gate.mustCheckFor` with the
   * verified context of this window (asserted by the child with `gateCheckCtx`). Older child:
   * `Gate.mustCheck` with the spending account, which deployed children gate on (`Txn.sender`).
   */
  private gateSelector(principalAbi: boolean): bytes {
    return principalAbi ? methodSelector(GateMustCheckForAbiMethod) : methodSelector(GateMustCheckAbiMethod)
  }

  private gateSubject(wallet: Application, sender: Account, principalAbi: boolean): bytes {
    if (principalAbi) {
      return encodeArc4(gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet)))
    }
    return sender.bytes
  }

  // RAFFLE PLUGIN METHODS ------------------------------------------------------------------------

  private newRaffleImpl(
    wallet: Application,
    rekeyBack: boolean,
    prizeID: uint64, // Asset
    prizeAmount: uint64,
    ticketAssetID: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof,
    weightsListCount: uint64
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    const senderPrizeBalance = AssetHolding.assetBalance(sender, prizeID)[0]
    loggedAssert(senderPrizeBalance >= prizeAmount, errNotEnoughAsset)

    this.ensureFactoryOptedIn(sender, prizeID)
    this.ensureFactoryOptedIn(sender, ticketAssetID)

    const cost = abiCall<typeof RaffleFactory.prototype.newRaffleCost>({
      appId: this.factory.value,
      args: [false, prizeID, ticketAssetID, weightsListCount],
    }).returnValue

    const mbrTxn = itxn.payment({
      sender,
      receiver: this.factory.value.address,
      amount: cost,
    })

    const prizeTxn = itxn.assetTransfer({
      sender,
      assetReceiver: this.factory.value.address,
      assetAmount: prizeAmount,
      xferAsset: prizeID,
    })

    return abiCall<typeof RaffleFactory.prototype.newRaffle>({
      sender,
      appId: this.factory.value,
      args: [
        mbrTxn,
        prizeTxn,
        ticketAssetID,
        startTimestamp,
        endTimestamp,
        minTickets,
        maxTickets,
        minEntries,
        gateID,
        marketplace,
        name,
        proof,
        weightsListCount,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  private newPrizeBoxRaffleImpl(
    wallet: Application,
    rekeyBack: boolean,
    prizeBox: Application,
    ticketAssetID: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    loggedAssert(getPrizeBoxOwner(this.akitaDAO.value, prizeBox) === sender, errNotPrizeBoxOwner)

    this.ensureFactoryOptedIn(sender, ticketAssetID)

    const cost = abiCall<typeof RaffleFactory.prototype.newRaffleCost>({
      appId: this.factory.value,
      args: [true, prizeBox.id, ticketAssetID, weightsListCount],
    }).returnValue

    const prizeBoxTransferTxn = itxn.applicationCall({
      sender,
      appId: prizeBox,
      onCompletion: OnCompleteAction.NoOp,
      appArgs: [
        methodSelector<typeof PrizeBox.prototype.transfer>(),
        this.factory.value.address
      ],
    })

    const mbrTxn = itxn.payment({
      sender,
      receiver: this.factory.value.address,
      amount: cost,
    })

    return abiCall<typeof RaffleFactory.prototype.newPrizeBoxRaffle>({
      sender,
      appId: this.factory.value,
      args: [
        prizeBoxTransferTxn,
        mbrTxn,
        ticketAssetID,
        startTimestamp,
        endTimestamp,
        minTickets,
        maxTickets,
        minEntries,
        gateID,
        marketplace,
        weightsListCount,
        windowHint(wallet)
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /**
   * The DEPLOYED signature (MainNet RafflePlugin 3569561863, no `minEntries`), so method-restricted
   * grants and SDK wrappers carry over in the §7.3 app-id swap. Creates with `minEntries = 0` (at
   * least one entry); the seller can raise it with `setMinEntries` before the first entry.
   */
  newRaffle(
    wallet: Application,
    rekeyBack: boolean,
    prizeID: uint64, // Asset
    prizeAmount: uint64,
    ticketAssetID: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof,
    weightsListCount: uint64
  ): uint64 {
    return this.newRaffleImpl(
      wallet, rekeyBack, prizeID, prizeAmount, ticketAssetID, startTimestamp, endTimestamp, minTickets, maxTickets,
      0, gateID, marketplace, name, proof, weightsListCount
    )
  }

  /** `newRaffle` overload that also sets the AR-C minimum number of entries (new selector) */
  @abimethod({ name: 'newRaffle' })
  newRaffleWithMinEntries(
    wallet: Application,
    rekeyBack: boolean,
    prizeID: uint64, // Asset
    prizeAmount: uint64,
    ticketAssetID: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof,
    weightsListCount: uint64
  ): uint64 {
    return this.newRaffleImpl(
      wallet, rekeyBack, prizeID, prizeAmount, ticketAssetID, startTimestamp, endTimestamp, minTickets, maxTickets,
      minEntries, gateID, marketplace, name, proof, weightsListCount
    )
  }

  /** The DEPLOYED signature (no `minEntries`); see `newRaffle` */
  newPrizeBoxRaffle(
    wallet: Application,
    rekeyBack: boolean,
    prizeBox: Application,
    ticketAssetID: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {
    return this.newPrizeBoxRaffleImpl(
      wallet, rekeyBack, prizeBox, ticketAssetID, startTimestamp, endTimestamp, minTickets, maxTickets,
      0, gateID, marketplace, weightsListCount
    )
  }

  /** `newPrizeBoxRaffle` overload that also sets the AR-C minimum number of entries (new selector) */
  @abimethod({ name: 'newPrizeBoxRaffle' })
  newPrizeBoxRaffleWithMinEntries(
    wallet: Application,
    rekeyBack: boolean,
    prizeBox: Application,
    ticketAssetID: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {
    return this.newPrizeBoxRaffleImpl(
      wallet, rekeyBack, prizeBox, ticketAssetID, startTimestamp, endTimestamp, minTickets, maxTickets,
      minEntries, gateID, marketplace, weightsListCount
    )
  }

  enter(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    amount: uint64,
    marketplace: Account,
    args: GateArgs
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    this.assertRaffle(appId)

    const { entries, entriesByAddress } = abiCall<typeof BaseRaffle.prototype.mbr>({ appId }).returnValue
    const mbr: uint64 = entries + entriesByAddress

    const ticketAsset = this.ticketAssetOf(appId)
    const gated = args.length > 0

    if (ticketAsset.id === 0) {
      const payment = itxn.payment({
        sender,
        receiver: appId.address,
        amount: amount + mbr,
      })

      if (gated) {
        const principalAbi = this.hasPrincipalAbi(appId)
        const gateTxn = itxn.applicationCall({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [this.gateSelector(principalAbi), this.gateSubject(wallet, sender, principalAbi), this.gateID(appId), encodeArc4(args)]
        })
        if (principalAbi) {
          abiCall<typeof Raffle.prototype.gatedEnter>({
            sender,
            appId,
            args: [gateTxn, payment, marketplace, windowHint(wallet)],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        } else {
          abiCall<typeof Raffle.prototype.legacyGatedEnter>({
            sender,
            appId,
            args: [gateTxn, payment, marketplace],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        }
      } else {
        abiCall<typeof Raffle.prototype.enter>({
          sender,
          appId,
          args: [payment, marketplace],
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
      }
    } else {
      const payment = itxn.payment({
        sender,
        receiver: appId.address,
        amount: mbr,
      })
      const xfer = itxn.assetTransfer({
        sender,
        assetReceiver: appId.address,
        assetAmount: amount,
        xferAsset: ticketAsset,
      })

      if (gated) {
        const principalAbi = this.hasPrincipalAbi(appId)
        const gateTxn = itxn.applicationCall({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [this.gateSelector(principalAbi), this.gateSubject(wallet, sender, principalAbi), this.gateID(appId), encodeArc4(args)]
        })
        if (principalAbi) {
          abiCall<typeof Raffle.prototype.gatedEnterAsa>({
            sender,
            appId,
            args: [gateTxn, payment, xfer, marketplace, windowHint(wallet)],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        } else {
          abiCall<typeof Raffle.prototype.legacyGatedEnterAsa>({
            sender,
            appId,
            args: [gateTxn, payment, xfer, marketplace],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        }
      } else {
        abiCall<typeof Raffle.prototype.enterAsa>({
          sender,
          appId,
          args: [payment, xfer, marketplace],
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
      }
    }
  }

  add(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    amount: uint64,
    args: GateArgs
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    this.assertRaffle(appId)

    const ticketAsset = this.ticketAssetOf(appId)
    const gated = args.length > 0

    if (ticketAsset.id === 0) {
      const payment = itxn.payment({
        sender,
        receiver: appId.address,
        amount: amount,
      })

      if (gated) {
        const principalAbi = this.hasPrincipalAbi(appId)
        const gateTxn = itxn.applicationCall({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [this.gateSelector(principalAbi), this.gateSubject(wallet, sender, principalAbi), this.gateID(appId), encodeArc4(args)]
        })
        if (principalAbi) {
          abiCall<typeof Raffle.prototype.gatedAdd>({
            sender,
            appId,
            args: [gateTxn, payment, windowHint(wallet)],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        } else {
          abiCall<typeof Raffle.prototype.legacyGatedAdd>({
            sender,
            appId,
            args: [gateTxn, payment],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        }
      } else {
        abiCall<typeof Raffle.prototype.add>({
          sender,
          appId,
          args: [payment],
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
      }
    } else {
      const xfer = itxn.assetTransfer({
        sender,
        assetReceiver: appId.address,
        assetAmount: amount,
        xferAsset: ticketAsset,
      })

      if (gated) {
        const principalAbi = this.hasPrincipalAbi(appId)
        const gateTxn = itxn.applicationCall({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [this.gateSelector(principalAbi), this.gateSubject(wallet, sender, principalAbi), this.gateID(appId), encodeArc4(args)]
        })
        if (principalAbi) {
          abiCall<typeof Raffle.prototype.gatedAddAsa>({
            sender,
            appId,
            args: [gateTxn, xfer, windowHint(wallet)],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        } else {
          abiCall<typeof Raffle.prototype.legacyGatedAddAsa>({
            sender,
            appId,
            args: [gateTxn, xfer],
            rekeyTo: rekeyAddress(rekeyBack, wallet),
          })
        }
      } else {
        abiCall<typeof Raffle.prototype.addAsa>({
          sender,
          appId,
          args: [xfer],
          rekeyTo: rekeyAddress(rekeyBack, wallet),
        })
      }
    }
  }

  setMinEntries(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    minEntries: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertRaffle(appId)

    abiCall<typeof Raffle.prototype.setMinEntries>({
      sender,
      appId,
      args: [minEntries],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  raffle(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertRaffle(appId)

    abiCall<typeof Raffle.prototype.raffle>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  findWinner(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    iterationAmount: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertRaffle(appId)

    abiCall<typeof Raffle.prototype.findWinner>({
      sender,
      appId,
      args: [iterationAmount],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  claimRafflePrize(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertRaffle(appId)

    abiCall<typeof Raffle.prototype.claimRafflePrize>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  refundMBR(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    iterationAmount: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertRaffle(appId)

    abiCall<typeof Raffle.prototype.refundMBR>({
      sender,
      appId,
      args: [iterationAmount],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  clearWeightsBoxes(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertRaffle(appId)

    abiCall<typeof Raffle.prototype.clearWeightsBoxes>({
      sender,
      appId,
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** kept for ABI compatibility with v1 method restrictions; routes through the factory */
  deleteRaffleApplication(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertRaffle(appId)

    abiCall<typeof RaffleFactory.prototype.deleteRaffle>({
      sender,
      appId: this.factory.value,
      args: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }
}
