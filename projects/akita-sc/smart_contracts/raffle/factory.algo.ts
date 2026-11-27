import {
  abimethod,
  Account,
  Application,
  Asset,
  clone,
  contract,
  Global,
  gtxn,
  itxn,
  loggedAssert,
  OnCompleteAction,
  Txn,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { abiCall, compileArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST } from '../utils/constants'
import { errBadMethodPrizeBoxTransferNeeded, errContractNotSet, errNotPrizeBoxOwner } from '../utils/errors'
import { assertSafeAssetTransfer, disbursementCost, getFunder, getNFTFees, getPrizeBoxOwner, principalOf, rewardsOptInCost, royalties } from '../utils/functions'
import { Proof } from '../utils/types/merkles'
import { BaseRaffle } from './base'
import { errInvalidEndingRound, errInvalidPayment, errInvalidTicketBounds, errInvalidTransfer, errNotARaffle, errNotOptedIn, errPrizeIsTicketAsset, errPrizeSeizable } from './errors'

// CONTRACT IMPORTS
import type { PrizeBox } from '../prize-box/contract.algo'
import { EscrowConfig } from '../utils/base-contracts/base'
import { FactoryContract } from '../utils/base-contracts/factory'
import { Raffle } from './contract.algo'

@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class RaffleFactory extends classes(BaseRaffle, FactoryContract) {

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /**
   * Creation cost breakdown: [disbursementMBR, weightsMBR, totalMBR].
   * totalMBR = creation fee + child pages/state + child base/opt-in/disbursement MBR + weights MBR.
   */
  private childCosts(isPrizeBox: boolean, prizeID: uint64, ticketAsset: uint64, weightsListCount: uint64): [uint64, uint64, uint64] {
    let optinMBR: uint64 = 0

    const isAlgoOrPrizeBox = prizeID === 0 || isPrizeBox
    if (!isAlgoOrPrizeBox) {
      optinMBR = Global.assetOptInMinBalance
    }

    const isAlgoTicket = ticketAsset === 0
    if (!isAlgoTicket) {
      optinMBR += Global.assetOptInMinBalance
    }

    // Worst-case disbursement MBR:
    // 1 for referral payment (in ticket asset)
    // 1 for prize transfer (when not prize box)
    // up to 4 for ASA ticket payments (creator, marketplace x2, seller) when ticket is ASA
    // 3 for prize box (no creator royalty)
    let disbursementMBR: uint64 = 0
    if (!isPrizeBox) {
      disbursementMBR += disbursementCost(1) + rewardsOptInCost(this.akitaDAO.value, prizeID)
      if (isAlgoTicket) {
        disbursementMBR += disbursementCost(1)
      } else {
        disbursementMBR += disbursementCost(5) + rewardsOptInCost(this.akitaDAO.value, ticketAsset)
      }
    } else if (isAlgoTicket) {
      disbursementMBR = disbursementCost(1)
    } else {
      disbursementMBR = disbursementCost(4) + rewardsOptInCost(this.akitaDAO.value, ticketAsset)
    }

    const childAppMBR: uint64 = Global.minBalance + optinMBR + disbursementMBR
    // `weightsListCount` is ignored: weights storage grows with the entries (see `Raffle.init`)
    const weightsMBR: uint64 = this.mbr().weights
    const fees = getNFTFees(this.akitaDAO.value)

    const raffle = compileArc4(Raffle)

    const totalMBR: uint64 = (
      fees.raffleCreationFee +
      this.childPagesMbr(raffle.clearStateProgram.length) +
      (GLOBAL_STATE_KEY_UINT_COST * raffle.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * raffle.globalBytes) +
      childAppMBR +
      weightsMBR
    )

    return [disbursementMBR, weightsMBR, totalMBR]
  }

  private createChildApp(
    isPrizeBox: boolean,
    payment: gtxn.PaymentTxn,
    prizeID: uint64, // Asset or Prize Box Application
    ticketAsset: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    creatorRoyalty: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
    sellerReferrer: Account
  ): Application {
    loggedAssert(this.boxedContract.exists, errContractNotSet)

    // AR-07: coherent configuration
    loggedAssert(endTimestamp > startTimestamp && endTimestamp > Global.latestTimestamp, errInvalidEndingRound)
    loggedAssert(maxTickets > 0 && maxTickets >= minTickets, errInvalidTicketBounds)

    // AR-15: the factory (and, through its optIn, the DAO escrow) must hold the ticket asset so
    // settlement never pays unbudgeted escrow opt-in MBR and deletion can close the asset back here
    const isAlgoTicket = ticketAsset === 0
    loggedAssert(isAlgoTicket || Global.currentApplicationAddress.isOptedIn(Asset(ticketAsset)), errNotOptedIn)

    const costs = this.childCosts(isPrizeBox, prizeID, ticketAsset, weightsListCount)
    const disbursementMBR = costs[0]
    const weightsMBR = costs[1]
    const totalMBR = costs[2]
    const fees = getNFTFees(this.akitaDAO.value)

    const raffle = compileArc4(Raffle)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === totalMBR, errInvalidPayment)

    itxn
      .payment({
        receiver: this.akitaDAOEscrow.value.app.address,
        amount: fees.raffleCreationFee,
      })
      .submit()

    const appId = raffle.call
      .create({
        args: [
          prizeID,
          isPrizeBox,
          ticketAsset,
          startTimestamp,
          endTimestamp,
          Txn.sender,
          { account: payment.sender, amount: totalMBR },
          creatorRoyalty,
          minTickets,
          maxTickets,
          minEntries,
          gateID,
          marketplace,
          this.akitaDAO.value,
          this.akitaDAOEscrow.value,
          sellerReferrer,
        ],
        // Boxed approval program in up to four 4 KB chunks (AVM 13: up to 16 KB).
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: raffle.clearStateProgram,
        extraProgramPages: this.childExtraPages(raffle.clearStateProgram.length),
      })
      .itxn
      .createdApp

    // Fund child app with base minBalance + disbursement MBR
    itxn
      .payment({
        receiver: appId.address,
        amount: Global.minBalance + disbursementMBR
      })
      .submit()

    if (!isAlgoTicket) {
      raffle.call.optin({
        appId,
        args: [
          itxn.payment({
            receiver: appId.address,
            amount: Global.assetOptInMinBalance,
          }),
          ticketAsset,
        ],
      })
    }

    raffle.call.init({
      appId,
      args: [
        itxn.payment({
          receiver: appId.address,
          amount: weightsMBR,
        }),
        weightsListCount,
      ],
    })

    return appId
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, childVersion: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig): void {
    this.version.value = version
    this.childContractVersion.value = childVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  // RAFFLE FACTORY METHODS -----------------------------------------------------------------------

  /**
   * New ASA-prize raffle (principal ABI, spec §6.8). The seller stays `Txn.sender`; `wallet` is the
   * seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
   * (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, paid when
   * the prize is claimed. The +50,000 µA global is part of `newRaffleCost`.
   *
   * The DEPLOYED creation selectors (MainNet 3569557743: no `minEntries`, no hint) are NOT routed
   * (Kyle decision K6, 2026-10-04). Deployed-era callers hard-code the old child cost (two fewer
   * global uints, and whole weights boxes paid up front), so their payment never equals the quote
   * and legacy shims could never succeed for them.
   */
  newRaffle(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    ticketAsset: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    name: string,
    proof: Proof,
    weightsListCount: uint64,
    wallet: uint64
  ): uint64 {
    const sellerReferrer = principalOf(this.akitaDAO.value, wallet).referrer

    // make sure they actually sent the asset(s) they want to raffle
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount > 0, errInvalidTransfer)
    // AR-11: the prize can't be the ticket asset (the prize close-out would sweep every ticket)
    loggedAssert(assetXfer.xferAsset.id !== ticketAsset, errPrizeIsTicketAsset)
    loggedAssert(
      assetXfer.xferAsset.clawback === Global.zeroAddress && assetXfer.xferAsset.freeze === Global.zeroAddress,
      errPrizeSeizable
    )

    const creatorRoyalty = royalties(this.akitaDAO.value, assetXfer.xferAsset, name, proof)

    const raffleApp = this.createChildApp(
      false,
      payment,
      assetXfer.xferAsset.id,
      ticketAsset,
      startTimestamp,
      endTimestamp,
      creatorRoyalty,
      minTickets,
      maxTickets,
      minEntries,
      gateID,
      marketplace,
      weightsListCount,
      sellerReferrer
    )

    const raffle = compileArc4(Raffle)

    // optin child contract to asset (we can use the AuctionBase)
    raffle.call.optin({
      appId: raffleApp,
      args: [
        itxn.payment({
          receiver: raffleApp.address,
          amount: Global.assetOptInMinBalance,
        }),
        assetXfer.xferAsset.id,
      ],
    })

    // xfer asset to child
    itxn
      .assetTransfer({
        assetReceiver: raffleApp.address,
        assetAmount: assetXfer.assetAmount,
        xferAsset: assetXfer.xferAsset,
      })
      .submit()

    return raffleApp.id
  }

  /** New prize-box raffle (principal ABI, spec §6.8); see `newRaffle`. */
  newPrizeBoxRaffle(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    ticketAsset: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    minEntries: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64,
    wallet: uint64
  ): uint64 {
    const sellerReferrer = principalOf(this.akitaDAO.value, wallet).referrer

    loggedAssert((
      prizeBoxTransferTxn.appArgs(0) === methodSelector<typeof PrizeBox.prototype.transfer>() &&
      prizeBoxTransferTxn.onCompletion === OnCompleteAction.NoOp
    ), errBadMethodPrizeBoxTransferNeeded)
    loggedAssert(getPrizeBoxOwner(this.akitaDAO.value, prizeBoxTransferTxn.appId) === Global.currentApplicationAddress, errNotPrizeBoxOwner)

    const raffleApp = this.createChildApp(
      true,
      payment,
      prizeBoxTransferTxn.appId.id,
      ticketAsset,
      startTimestamp,
      endTimestamp,
      0,
      minTickets,
      maxTickets,
      minEntries,
      gateID,
      marketplace,
      weightsListCount,
      sellerReferrer
    )

    abiCall<typeof PrizeBox.prototype.transfer>({
      appId: prizeBoxTransferTxn.appId,
      args: [raffleApp.address],
    })

    return raffleApp.id
  }

  deleteRaffle(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotARaffle)

    // AR-09: refund exactly what the deletion released back to the factory
    // (the creation fee went to the DAO escrow and is never refunded)
    const balanceBefore: uint64 = Global.currentApplicationAddress.balance
    const minBefore: uint64 = Global.currentApplicationAddress.minBalance

    // Get funder info BEFORE delete call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)

    const raffle = compileArc4(Raffle)
    raffle.call.deleteApplication({ appId })

    this.refundReleased(receiver, amount, balanceBefore, minBefore, 0)
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /** exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require */
  @abimethod({ readonly: true })
  newRaffleCost(isPrizeBox: boolean, prizeID: uint64, ticketAsset: uint64, weightsListCount: uint64): uint64 {
    return this.childCosts(isPrizeBox, prizeID, ticketAsset, weightsListCount)[2]
  }
}
