import {
  abimethod,
  Account,
  Application,
  clone,
  contract,
  Global,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  uint64
} from '@algorandfoundation/algorand-typescript'
import { abiCall, compileArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, MAX_PROGRAM_PAGES } from '../utils/constants'
import { ERR_BAD_METHOD_PRIZE_BOX_TRANSFER_NEEDED, ERR_CONTRACT_NOT_SET, ERR_NOT_PRIZE_BOX_OWNER } from '../utils/errors'
import { disbursementCost, getFunder, getNFTFees, getPrizeBoxOwner, rewardsOptInCost, royalties } from '../utils/functions'
import { Proof } from '../utils/types/merkles'
import { BaseRaffle } from './base'
import { ERR_INVALID_PAYMENT, ERR_INVALID_TRANSFER, ERR_NOT_A_RAFFLE } from './errors'

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
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): Application {
    loggedAssert(this.boxedContract.exists, ERR_CONTRACT_NOT_SET)

    let optinMBR: uint64 = 0

    const isAlgoOrPrizeBox = prizeID === 0 || isPrizeBox
    if (!isAlgoOrPrizeBox) {
      optinMBR = Global.assetOptInMinBalance
    }

    const isAlgoTicket = ticketAsset === 0
    if (!isAlgoTicket) {
      optinMBR += Global.assetOptInMinBalance
    }

    const costs = this.mbr()

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
    const weightsMBR: uint64 = (weightsListCount * costs.weights)
    const fees = getNFTFees(this.akitaDAO.value)

    const raffle = compileArc4(Raffle)

    const totalMBR: uint64 = (
      fees.raffleCreationFee +
      MAX_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * raffle.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * raffle.globalBytes) +
      childAppMBR +
      weightsMBR
    )

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === totalMBR, ERR_INVALID_PAYMENT)

    itxn
      .payment({
        receiver: this.akitaDAOEscrow.value.app.address,
        amount: fees.raffleCreationFee,
      })
      .submit()

    // Read approval program from box storage in chunks
    const approvalSize = this.boxedContract.length
    const chunk1 = this.boxedContract.extract(0, 4096)
    const chunk2 = this.boxedContract.extract(4096, approvalSize - 4096)

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
          gateID,
          marketplace,
          this.akitaDAO.value,
          this.akitaDAOEscrow.value,
        ],
        approvalProgram: [chunk1, chunk2],
        clearStateProgram: raffle.clearStateProgram,
        extraProgramPages: 3,
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

  newRaffle(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    ticketAsset: uint64,
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

    // make sure they actually sent the asset(s) they want to raffle
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, ERR_INVALID_TRANSFER)
    loggedAssert(assetXfer.assetAmount > 0, ERR_INVALID_TRANSFER)

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
      gateID,
      marketplace,
      weightsListCount
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

  newPrizeBoxRaffle(
    prizeBoxTransferTxn: gtxn.ApplicationCallTxn,
    payment: gtxn.PaymentTxn,
    ticketAsset: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64,
    minTickets: uint64,
    maxTickets: uint64,
    gateID: uint64,
    marketplace: Account,
    weightsListCount: uint64
  ): uint64 {

    loggedAssert(prizeBoxTransferTxn.appArgs(0) === methodSelector<typeof PrizeBox.prototype.transfer>(), ERR_BAD_METHOD_PRIZE_BOX_TRANSFER_NEEDED)
    loggedAssert(getPrizeBoxOwner(this.akitaDAO.value, prizeBoxTransferTxn.appId) === Global.currentApplicationAddress, ERR_NOT_PRIZE_BOX_OWNER)

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
      gateID,
      marketplace,
      weightsListCount
    )

    abiCall<typeof PrizeBox.prototype.transfer>({
      appId: prizeBoxTransferTxn.appId,
      args: [raffleApp.address],
    })

    return raffleApp.id
  }

  deleteRaffle(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, ERR_NOT_A_RAFFLE)

    // Get funder info BEFORE delete call (which deletes the app)
    const { account: receiver, amount } = getFunder(appId)

    const raffle = compileArc4(Raffle)
    raffle.call.deleteApplication({ appId })

    itxn
      .payment({ amount, receiver })
      .submit()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  // TODO: implement readonly listing methods
}
