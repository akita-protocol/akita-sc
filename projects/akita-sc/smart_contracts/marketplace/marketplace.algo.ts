import { Account, Application, Asset, assert, assertMatch, Bytes, Global, gtxn, itxn, OnCompleteAction, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { AkitaDAOEscrowAccountMarketplace } from '../arc58/dao/constants'
import { ERR_HAS_GATE } from '../social/errors'
import { GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, MIN_PROGRAM_PAGES } from '../utils/constants'
import { ERR_BAD_METHOD_PRIZE_BOX_TRANSFER_NEEDED, ERR_CONTRACT_NOT_SET, ERR_INVALID_PAYMENT, ERR_INVALID_TRANSFER, ERR_NOT_PRIZE_BOX_OWNER } from '../utils/errors'
import { disbursementCost, gateCheck, getFunder, getPrizeBoxOwner, getWalletIDUsingAkitaDAO, originOrTxnSender, rewardsOptInCost, royalties, splitOptInCount } from '../utils/functions'
import { Proof } from '../utils/types/merkles'
import { ListingGlobalStateKeyGateID } from './constants'
import { ERR_NOT_A_LISTING, ERR_PRICE_TOO_LOW } from './errors'
import type { PrizeBox } from '../prize-box/contract.algo'

// CONTRACT IMPORTS
import { FactoryContract } from '../utils/base-contracts/factory'
import { Listing } from './listing.algo'


export class Marketplace extends FactoryContract {

  // BOXES ----------------------------------------------------------------------------------------

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, childVersion: string, akitaDAO: Application, akitaDAOEscrow: Application): void {
    this.version.value = version
    this.childContractVersion.value = childVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = akitaDAOEscrow
  }

  // MARKETPLACE METHODS --------------------------------------------------------------------------

  list(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    price: uint64,
    paymentAsset: uint64, // 0 | Asset
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof
  ): uint64 {
    /** lowest split is 4 */
    assert(price >= 4, ERR_PRICE_TOO_LOW)
    assert(this.boxedContract.exists, ERR_CONTRACT_NOT_SET)

    const isAlgoPayment = paymentAsset === 0
    const optinMBR: uint64 = isAlgoPayment
      ? Global.assetOptInMinBalance
      : Global.assetOptInMinBalance * 2

    const listing = compileArc4(Listing)

    // Worst-case disbursement MBR:
    // 1 for prize transfer (prize asset)
    // 1 for referral payment (in payment asset)
    // ASA payment disbursements when payment is ASA:
    //   4 total (creator, marketplace x2, seller) — akita escrow opted in by factory
    let disbursementMBR: uint64 = disbursementCost(1) + rewardsOptInCost(this.akitaDAO.value, assetXfer.xferAsset.id)
    if (isAlgoPayment) {
      disbursementMBR += disbursementCost(1)
    } else {
      disbursementMBR += disbursementCost(5) + rewardsOptInCost(this.akitaDAO.value, paymentAsset)
    }

    // Cost to opt akita escrow into payment asset (if not already opted in)
    const escrowOptInCost: uint64 = isAlgoPayment
      ? 0
      : Global.assetOptInMinBalance * splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.address, Asset(paymentAsset))

    const childAppMBR: uint64 = Global.minBalance + optinMBR + disbursementMBR + escrowOptInCost
    const totalMBR: uint64 = (
      MIN_PROGRAM_PAGES * (1 + listing.extraProgramPages) +
      (GLOBAL_STATE_KEY_UINT_COST * listing.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * listing.globalBytes) +
      childAppMBR
    )

    // ensure they paid enough to cover the contract mint + mbr costs
    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: totalMBR
      },
      ERR_INVALID_PAYMENT
    )

    // make sure they actually send the asset they want to sell
    assertMatch(
      assetXfer,
      {
        sender: Txn.sender,
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: { greaterThan: 0 },
      },
      ERR_INVALID_PAYMENT
    )

    const creatorRoyalty = royalties(this.akitaDAO.value, assetXfer.xferAsset, name, proof)

    // Read approval program from box storage
    const approvalProgram = this.boxedContract.extract(0, this.boxedContract.length)

    // mint listing contract
    const listingApp = listing.call
      .create({
        args: [
          assetXfer.xferAsset.id,
          false,
          price,
          paymentAsset,
          expiration,
          Txn.sender,
          { account: payment.sender, amount: totalMBR },
          reservedFor,
          creatorRoyalty,
          gateID,
          marketplace,
          this.childContractVersion.value,
          this.akitaDAO.value,
          this.akitaDAOEscrow.value,
        ],
        approvalProgram: [approvalProgram],
        clearStateProgram: listing.clearStateProgram,
      })
      .itxn
      .createdApp

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: listingApp.address,
        amount: Global.minBalance + disbursementMBR
      })
      .submit()

    // optin child contract to sale asset
    listing.call.optin({
      appId: listingApp,
      args: [
        itxn.payment({
          receiver: listingApp.address,
          amount: Global.assetOptInMinBalance,
        }),
        assetXfer.xferAsset.id,
      ],
    })

    // xfer asset to child
    itxn
      .assetTransfer({
        assetReceiver: listingApp.address,
        assetAmount: assetXfer.assetAmount,
        xferAsset: assetXfer.xferAsset,
      })
      .submit()

    if (!isAlgoPayment) {
      // optin child contract to payment asset
      listing.call.optin({
        appId: listingApp,
        args: [
          itxn.payment({
            receiver: listingApp.address,
            amount: optinMBR,
          }),
          paymentAsset,
        ],
      })

      // ensure akita escrow is opted into payment asset for fee collection
      if (!this.akitaDAOEscrow.value.address.isOptedIn(Asset(paymentAsset))) {
        this.optAkitaEscrowInAndSend(AkitaDAOEscrowAccountMarketplace, Asset(paymentAsset), 0)
      }
    }

    return listingApp.id
  }

  listPrizeBox(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    price: uint64,
    paymentAsset: uint64,
    expiration: uint64,
    reservedFor: Account,
    gateID: uint64,
    marketplace: Account,
  ): uint64 {
    assert(price >= 4, ERR_PRICE_TOO_LOW)
    assert(this.boxedContract.exists, ERR_CONTRACT_NOT_SET)

    assert((
      prizeBoxTransferTxn.appArgs(0) === methodSelector<typeof PrizeBox.prototype.transfer>() &&
      prizeBoxTransferTxn.onCompletion === OnCompleteAction.NoOp
    ), ERR_BAD_METHOD_PRIZE_BOX_TRANSFER_NEEDED)
    assert(getPrizeBoxOwner(this.akitaDAO.value, prizeBoxTransferTxn.appId) === Global.currentApplicationAddress, ERR_NOT_PRIZE_BOX_OWNER)

    const isAlgoPayment = paymentAsset === 0
    const optinMBR: uint64 = isAlgoPayment
      ? 0
      : Global.assetOptInMinBalance

    const listing = compileArc4(Listing)

    // Worst-case disbursement MBR for prize box listing:
    // No prize disbursement (prize box transfer, not ASA)
    // 1 for referral payment (in payment asset)
    // ASA payment disbursements when payment is ASA:
    //   3 total (marketplace x2, seller) — no creator royalty for prize boxes, akita escrow opted in by factory
    let disbursementMBR: uint64 = 0
    if (isAlgoPayment) {
      disbursementMBR = disbursementCost(1)
    } else {
      disbursementMBR = disbursementCost(4) + rewardsOptInCost(this.akitaDAO.value, paymentAsset)
    }

    // Cost to opt akita escrow into payment asset (if not already opted in)
    const escrowOptInCost: uint64 = isAlgoPayment
      ? 0
      : Global.assetOptInMinBalance * splitOptInCount(this.akitaDAO.value, this.akitaDAOEscrow.value.address, Asset(paymentAsset))

    const childAppMBR: uint64 = Global.minBalance + optinMBR + disbursementMBR + escrowOptInCost
    const totalMBR: uint64 = (
      MIN_PROGRAM_PAGES * (1 + listing.extraProgramPages) +
      (GLOBAL_STATE_KEY_UINT_COST * listing.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * listing.globalBytes) +
      childAppMBR
    )

    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: totalMBR
      },
      ERR_INVALID_PAYMENT
    )

    // Read approval program from box storage
    const approvalProgram = this.boxedContract.extract(0, this.boxedContract.length)

    // mint listing contract
    const listingApp = listing.call
      .create({
        args: [
          prizeBoxTransferTxn.appId.id,
          true,
          price,
          paymentAsset,
          expiration,
          Txn.sender,
          { account: payment.sender, amount: totalMBR },
          reservedFor,
          0,
          gateID,
          marketplace,
          this.childContractVersion.value,
          this.akitaDAO.value,
          this.akitaDAOEscrow.value,
        ],
        approvalProgram: [approvalProgram],
        clearStateProgram: listing.clearStateProgram,
      })
      .itxn
      .createdApp

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: listingApp.address,
        amount: Global.minBalance + disbursementMBR
      })
      .submit()

    // Transfer prize box ownership to the listing app
    abiCall<typeof PrizeBox.prototype.transfer>({
      appId: prizeBoxTransferTxn.appId,
      args: [listingApp.address],
    })

    if (!isAlgoPayment) {
      // optin child contract to payment asset
      listing.call.optin({
        appId: listingApp,
        args: [
          itxn.payment({
            receiver: listingApp.address,
            amount: optinMBR,
          }),
          paymentAsset,
        ],
      })

      // ensure akita escrow is opted into payment asset for fee collection
      if (!this.akitaDAOEscrow.value.address.isOptedIn(Asset(paymentAsset))) {
        this.optAkitaEscrowInAndSend(AkitaDAOEscrowAccountMarketplace, Asset(paymentAsset), 0)
      }
    }

    return listingApp.id
  }

  gatedPurchase(
    payment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, Txn.sender)
    const origin = originOrTxnSender(wallet)

    assert(appId.creator === Global.currentApplicationAddress, ERR_NOT_A_LISTING)
    const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]
    assert(gateCheck(gateTxn, this.akitaDAO.value, origin, gateID))
    assertMatch(
      payment,
      { receiver: Global.currentApplicationAddress },
      ERR_INVALID_PAYMENT
    )

    // Get funder info BEFORE purchase call (which deletes the app)
    const { account: creator, amount } = getFunder(appId)

    const listing = compileArc4(Listing)
    listing.call.purchase({
      appId,
      args: [
        itxn.payment({
          receiver: appId.address,
          amount: payment.amount,
        }),
        Txn.sender,
        marketplace
      ],
    })

    itxn
      .payment({
        amount,
        receiver: creator,
      })
      .submit()
  }

  purchase(
    payment: gtxn.PaymentTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    assert(appId.creator === Global.currentApplicationAddress, ERR_NOT_A_LISTING)
    const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]
    assert(gateID === 0, ERR_HAS_GATE)
    assertMatch(
      payment,
      { receiver: Global.currentApplicationAddress },
      ERR_INVALID_PAYMENT
    )

    // Get funder info BEFORE purchase call (which deletes the app)
    const { account: creator, amount } = getFunder(appId)

    const listing = compileArc4(Listing)
    listing.call.purchase({
      appId,
      args: [
        itxn.payment({
          receiver: appId.address,
          amount: payment.amount,
        }),
        Txn.sender,
        marketplace
      ],
    })

    itxn
      .payment({
        amount,
        receiver: creator,
      })
      .submit()
  }

  gatedPurchaseAsa(
    assetXfer: gtxn.AssetTransferTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    const wallet = getWalletIDUsingAkitaDAO(this.akitaDAO.value, Txn.sender)
    const origin = originOrTxnSender(wallet)

    assert(appId.creator === Global.currentApplicationAddress, ERR_NOT_A_LISTING)
    const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]
    assert(gateCheck(gateTxn, this.akitaDAO.value, origin, gateID))
    assertMatch(
      assetXfer,
      {
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: { greaterThan: 0 },
      },
      ERR_INVALID_TRANSFER
    )

    // Get funder info BEFORE purchase call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)

    const listing = compileArc4(Listing)
    listing.call.purchaseAsa({
      appId,
      args: [
        itxn.assetTransfer({
          assetReceiver: appId.address,
          assetAmount: assetXfer.assetAmount,
          xferAsset: assetXfer.xferAsset,
        }),
        Txn.sender,
        marketplace
      ],
    })

    itxn
      .payment({ amount, receiver })
      .submit()
  }

  purchaseAsa(
    assetXfer: gtxn.AssetTransferTxn,
    appId: Application,
    marketplace: Account,
  ): void {
    assert(appId.creator === Global.currentApplicationAddress, ERR_NOT_A_LISTING)
    const gateID = op.AppGlobal.getExUint64(appId, Bytes(ListingGlobalStateKeyGateID))[0]
    assert(gateID === 0, ERR_HAS_GATE)
    assertMatch(
      assetXfer,
      {
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: { greaterThan: 0 },
      },
      ERR_INVALID_TRANSFER
    )

    // Get funder info BEFORE purchase call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)

    const listing = compileArc4(Listing)
    listing.call.purchaseAsa({
      appId,
      args: [
        itxn.assetTransfer({
          assetReceiver: appId.address,
          assetAmount: assetXfer.assetAmount,
          xferAsset: assetXfer.xferAsset,
        }),
        Txn.sender,
        marketplace
      ],
    })

    itxn
      .payment({ amount, receiver })
      .submit()
  }

  delist(appId: Application): void {
    assert(appId.creator === Global.currentApplicationAddress, ERR_NOT_A_LISTING)

    // Get funder info BEFORE delist call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)

    const listing = compileArc4(Listing)
    listing.call.delist({
      appId,
      args: [Txn.sender],
    })

    itxn
      .payment({ amount, receiver })
      .submit()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  // TODO: add readonly list methods
}
