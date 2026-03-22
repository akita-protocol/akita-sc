import { Account, Application, assert, assertMatch, Asset, Bytes, Global, gtxn, itxn, OnCompleteAction, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, compileArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { Txn } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, MAX_PROGRAM_PAGES } from '../utils/constants'
import { ERR_BAD_METHOD_PRIZE_BOX_TRANSFER_NEEDED, ERR_CONTRACT_NOT_SET, ERR_INVALID_PAYMENT, ERR_INVALID_TRANSFER, ERR_NOT_OPTED_IN, ERR_NOT_PRIZE_BOX_OWNER } from '../utils/errors'
import { disbursementCost, getFunder, getPrizeBoxOwner, rewardsOptInCost, royalties } from '../utils/functions'
import { Proof } from '../utils/types/merkles'
import { AuctionGlobalStateKeySeller } from './constants'
import { ERR_BIDS_MUST_ALWAYS_INCREASE, ERR_END_MUST_BE_ATLEAST_FIVE_MINUTES_AFTER_START, ERR_NOT_AN_AUCTION } from './errors'

// CONTRACT IMPORTS
import type { PrizeBox } from '../prize-box/contract.algo'
import { FactoryContract } from '../utils/base-contracts/factory'
import { BaseAuction } from './base'
import { Auction } from './contract.algo'

export class AuctionFactory extends classes(BaseAuction, FactoryContract) {

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, childVersion: string, akitaDAO: Application, akitaDAOEscrow: Application): void {
    this.version.value = version
    this.childContractVersion.value = childVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = akitaDAOEscrow
  }

  // AUCTION FACTORY METHODS ----------------------------------------------------------------------

  newAuction(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    name: string,
    proof: Proof,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {
    assert(bidMinimumIncrease > 0, ERR_BIDS_MUST_ALWAYS_INCREASE)
    assert(endTimestamp > startTimestamp + 300, ERR_END_MUST_BE_ATLEAST_FIVE_MINUTES_AFTER_START)
    assert(this.boxedContract.exists, ERR_CONTRACT_NOT_SET)

    const isAlgoBid = bidAssetID === 0

    assert(isAlgoBid || Global.currentApplicationAddress.isOptedIn(Asset(bidAssetID)), ERR_NOT_OPTED_IN)

    const optinMBR: uint64 = Global.assetOptInMinBalance * (isAlgoBid ? 1 : 2)

    const costs = this.mbr()

    const auction = compileArc4(Auction)

    // Worst-case disbursement MBR:
    // 1 for prize transfer (prize asset)
    // 1 for referral payment (in bid asset)
    // 4 for ASA bid payments (marketplace x2, seller, creator) when bid is ASA
    let disbursementMBR: uint64 = disbursementCost(1) + rewardsOptInCost(this.akitaDAO.value, assetXfer.xferAsset.id)
    if (isAlgoBid) {
      disbursementMBR += disbursementCost(1)
    } else {
      disbursementMBR += disbursementCost(5) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
    }

    const childAppMBR: uint64 = Global.minBalance + optinMBR + (weightsListCount * costs.weights) + disbursementMBR
    const totalMBR: uint64 = (
      MAX_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * auction.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * auction.globalBytes) +
      childAppMBR
    )

    // ensure they paid enough to cover the contract mint + mbr costs
    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: totalMBR,
      },
      ERR_INVALID_PAYMENT
    )

    // make sure they actually sent the asset they want to auction
    assertMatch(
      assetXfer,
      {
        sender: Txn.sender,
        assetReceiver: Global.currentApplicationAddress,
        assetAmount: { greaterThan: 0 },
      },
      ERR_INVALID_TRANSFER
    )

    const creatorRoyalty = royalties(this.akitaDAO.value, assetXfer.xferAsset, name, proof)

    // Read approval program from box storage in chunks
    const approvalSize = this.boxedContract.length
    const chunk1 = this.boxedContract.extract(0, 4096)
    const chunk2 = this.boxedContract.extract(4096, approvalSize - 4096)

    const auctionApp = auction.call
      .create({
        args: [
          assetXfer.xferAsset.id,
          false,
          bidAssetID,
          bidFee,
          startingBid,
          bidMinimumIncrease,
          startTimestamp,
          endTimestamp,
          { account: payment.sender, amount: totalMBR },
          Txn.sender,
          creatorRoyalty,
          gateID,
          marketplace,
          this.childContractVersion.value,
          { akitaDAO: this.akitaDAO.value, akitaDAOEscrow: this.akitaDAOEscrow.value },
        ],
        approvalProgram: [chunk1, chunk2],
        clearStateProgram: auction.clearStateProgram,
        extraProgramPages: 3
      })
      .itxn
      .createdApp

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: auctionApp.address,
        amount: Global.minBalance + disbursementMBR
      })
      .submit()

    // optin child contract to asset (we can use the AuctionBase)
    auction.call.optin({
      appId: auctionApp,
      args: [
        itxn.payment({
          receiver: auctionApp.address,
          amount: Global.assetOptInMinBalance
        }),
        assetXfer.xferAsset.id,
      ]
    })

    // xfer asset to child
    itxn
      .assetTransfer({
        assetReceiver: auctionApp.address,
        assetAmount: assetXfer.assetAmount,
        xferAsset: assetXfer.xferAsset
      })
      .submit()

    if (!isAlgoBid) {
      // optin child contract to bidding asset
      auction.call.optin({
        appId: auctionApp,
        args: [
          itxn.payment({
            receiver: auctionApp.address,
            amount: Global.assetOptInMinBalance
          }),
          bidAssetID,
        ]
      })
    }

    // Only call init when there's a raffle (bidFee > 0) since it sets up weight boxes
    if (bidFee > 0) {
      // Calculate weights MBR only (base and optIn MBR already sent above)
      const weightsMBR: uint64 = weightsListCount * costs.weights
      auction.call.init({
        appId: auctionApp.id,
        args: [
          itxn.payment({
            receiver: Application(auctionApp.id).address,
            amount: weightsMBR
          }),
          weightsListCount,
        ]
      })
    }

    return auctionApp.id
  }

  newPrizeBoxAuction(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    bidAssetID: uint64, // 0 | Asset
    bidFee: uint64,
    startingBid: uint64,
    bidMinimumIncrease: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {
    
    assert((
      prizeBoxTransferTxn.appArgs(0) === methodSelector<typeof PrizeBox.prototype.transfer>() &&
      prizeBoxTransferTxn.onCompletion === OnCompleteAction.NoOp
    ), ERR_BAD_METHOD_PRIZE_BOX_TRANSFER_NEEDED)
    assert(getPrizeBoxOwner(this.akitaDAO.value, prizeBoxTransferTxn.appId) === Global.currentApplicationAddress, ERR_NOT_PRIZE_BOX_OWNER)
    assert(bidMinimumIncrease > 0, ERR_BIDS_MUST_ALWAYS_INCREASE)
    assert(endTimestamp > startTimestamp + 300, ERR_END_MUST_BE_ATLEAST_FIVE_MINUTES_AFTER_START)
    assert(this.boxedContract.exists, ERR_CONTRACT_NOT_SET)

    const isAlgoBid = bidAssetID === 0
    const optinMBR: uint64 = isAlgoBid ? 0 : Global.assetOptInMinBalance

    const costs = this.mbr()

    const auction = compileArc4(Auction)

    // Worst-case disbursement MBR for prize box auction:
    // No prize disbursement (prize box transfer, not ASA)
    // 1 for referral payment (in bid asset)
    // ASA bid payments (marketplace x2, seller) when bid is ASA — no creator royalty for prize boxes
    let disbursementMBR: uint64 = 0
    if (isAlgoBid) {
      disbursementMBR = disbursementCost(1)
    } else {
      disbursementMBR = disbursementCost(4) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
    }

    const childAppMBR: uint64 = Global.minBalance + optinMBR + (weightsListCount * costs.weights) + disbursementMBR
    const totalMBR: uint64 = (
      MAX_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * auction.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * auction.globalBytes) +
      childAppMBR
    )

    // ensure they paid enough to cover the contract mint + mbr costs
    assertMatch(
      payment,
      {
        receiver: Global.currentApplicationAddress,
        amount: totalMBR,
      },
      ERR_INVALID_PAYMENT
    )

    const creatorRoyalty = royalties(this.akitaDAO.value, Asset(0), '', [])

    // Read approval program from box storage in chunks
    const approvalSize = this.boxedContract.length
    const chunk1 = this.boxedContract.extract(0, 4096)
    const chunk2 = this.boxedContract.extract(4096, approvalSize - 4096)

    const auctionApp = auction.call
      .create({
        args: [
          prizeBoxTransferTxn.appId.id,
          true,
          bidAssetID,
          bidFee,
          startingBid,
          bidMinimumIncrease,
          startTimestamp,
          endTimestamp,
          { account: payment.sender, amount: totalMBR },
          Txn.sender,
          creatorRoyalty,
          gateID,
          marketplace,
          this.childContractVersion.value,
          { akitaDAO: this.akitaDAO.value, akitaDAOEscrow: this.akitaDAOEscrow.value },
        ],
        approvalProgram: [chunk1, chunk2],
        clearStateProgram: auction.clearStateProgram,
        extraProgramPages: 3
      })
      .itxn
      .createdApp

    abiCall<typeof PrizeBox.prototype.transfer>({
      appId: prizeBoxTransferTxn.appId,
      args: [auctionApp.address]
    })

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: auctionApp.address,
        amount: Global.minBalance + disbursementMBR
      })
      .submit()

    if (!isAlgoBid) {
      // optin child contract to bidding asset
      auction.call.optin({
        appId: auctionApp,
        args: [
          itxn.payment({
            receiver: auctionApp.address,
            amount: Global.assetOptInMinBalance
          }),
          bidAssetID,
        ]
      })
    }

    // Only call init when there's a raffle (bidFee > 0) since it sets up weight boxes
    if (bidFee > 0) {
      const weightsMBR: uint64 = weightsListCount * costs.weights
      auction.call.init({
        appId: auctionApp.id,
        args: [
          itxn.payment({
            receiver: Application(auctionApp.id).address,
            amount: weightsMBR
          }),
          weightsListCount,
        ]
      })
    }

    return auctionApp.id
  }

  deleteAuctionApp(appId: Application): void {
    assert(appId.creator === Global.currentApplicationAddress, ERR_NOT_AN_AUCTION)
    const seller = Account(op.AppGlobal.getExBytes(appId, Bytes(AuctionGlobalStateKeySeller))[0])
    assert(seller === Txn.sender, ERR_NOT_PRIZE_BOX_OWNER)

    const { account: receiver, amount } = getFunder(appId)

    const auction = compileArc4(Auction)
    
    auction.call.deleteApplication({ appId })

    itxn
      .payment({ amount, receiver })
      .submit()
  }

  cancelAuction(appId: Application): void {
    assert(appId.creator === Global.currentApplicationAddress, ERR_NOT_AN_AUCTION)
    const seller = Account(op.AppGlobal.getExBytes(appId, Bytes(AuctionGlobalStateKeySeller))[0])
    assert(seller === Txn.sender, ERR_NOT_PRIZE_BOX_OWNER)

    const { account: receiver, amount } = getFunder(appId)

    const auction = compileArc4(Auction)

    auction.call.cancel({ appId })

    itxn
      .payment({ amount, receiver })
      .submit()
  }

  @abimethod({ readonly: true })
  newAuctionCost(isPrizeBox: boolean, bidAssetID: uint64, prizeAssetID: uint64, weightsListCount: uint64): uint64 {

    const isAlgoBid = bidAssetID === 0
    const optinMBR: uint64 = Global.assetOptInMinBalance * (isPrizeBox ? (isAlgoBid ? 0 : 1) : (isAlgoBid ? 1 : 2))

    const costs = this.mbr()

    const auction = compileArc4(Auction)

    // 1 referral (in bid asset) + prize + ASA bid payments
    let disbursementMBR: uint64 = 0
    if (!isPrizeBox) {
      disbursementMBR += disbursementCost(1) + rewardsOptInCost(this.akitaDAO.value, prizeAssetID)
      if (isAlgoBid) {
        disbursementMBR += disbursementCost(1)
      } else {
        disbursementMBR += disbursementCost(5) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
      }
    } else if (isAlgoBid) {
      disbursementMBR = disbursementCost(1)
    } else {
      disbursementMBR = disbursementCost(4) + rewardsOptInCost(this.akitaDAO.value, bidAssetID)
    }

    const childAppMBR: uint64 = Global.minBalance + optinMBR + (weightsListCount * costs.weights) + disbursementMBR
    const totalMBR: uint64 = (
      MAX_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * auction.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * auction.globalBytes) +
      childAppMBR
    )

    return totalMBR
  }
}
