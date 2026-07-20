import { abimethod, Account, Application, clone, contract, Global, gtxn, itxn, loggedAssert, OnCompleteAction, Txn, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, compileArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { classes } from "polytype";
import { RootKey } from "../meta-merkles/types";
import { StakingType } from "../staking/types";
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST, MAX_PROGRAM_PAGES } from "../utils/constants";
import { ERR_CONTRACT_NOT_SET } from "../utils/errors";
import { ERR_INVALID_PAYMENT, ERR_NOT_CREATOR } from "./errors";
import { getAkitaSocialAppList, getFunder, getStakingFees, getUserImpact, impactRange, referralFee, sendReferralPayment } from "../utils/functions";

// CONTRACT IMPORTS
import { EscrowConfig } from "../utils/base-contracts/base";
import { FactoryContract } from "../utils/base-contracts/factory";
import { BaseStakingPool } from "./base";
import { StakingPool } from "./contract.algo";


@contract({
  stateTotals: {
    globalBytes: FactoryGlobalStateMaxBytes,
    globalUints: FactoryGlobalStateMaxUints
  }
})
export class StakingPoolFactory extends classes(BaseStakingPool, FactoryContract) {
  // GLOBAL STATE ---------------------------------------------------------------------------------
  // BOXES ----------------------------------------------------------------------------------------
  // PRIVATE METHODS ------------------------------------------------------------------------------

  private poolCreationFee(): uint64 {
    if (Txn.sender === this.getAkitaDAOWallet().address) {
      return 0
    }
    return getStakingFees(this.akitaDAO.value).creationFee
  }

  private poolRoyalty(): uint64 {
    if (Txn.sender === this.getAkitaDAOWallet().address) {
      return 0
    }

    const fees = getStakingFees(this.akitaDAO.value)
    const { impact: impactApp } = getAkitaSocialAppList(this.akitaDAO.value)
    let impact: uint64 = 0
    if (impactApp !== 0) {
      impact = getUserImpact(this.akitaDAO.value, Txn.sender)
    }
    return impactRange(impact, fees.impactTaxMin, fees.impactTaxMax)
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, childVersion: string, akitaDAO: Application, akitaDAOEscrow: EscrowConfig): void {
    this.version.value = version
    this.childContractVersion.value = childVersion
    this.akitaDAO.value = akitaDAO
    this.akitaDAOEscrow.value = clone(akitaDAOEscrow)
  }

  // POOL FACTORY METHODS -------------------------------------------------------------------------

  newPool(
    payment: gtxn.PaymentTxn,
    title: string,
    type: StakingType,
    marketplace: Account,
    stakeKey: RootKey,
    minimumStakeAmount: uint64,
    allowLateSignups: boolean,
    gateID: uint64,
    maxEntries: uint64,
  ): uint64 {

    loggedAssert(this.boxedContract.exists, ERR_CONTRACT_NOT_SET)

    const pool = compileArc4(StakingPool)

    const childCreationMBR: uint64 = (
      MAX_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * pool.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * pool.globalBytes)
    )
    const refundableMBR: uint64 = childCreationMBR + Global.minBalance

    const creationFee = this.poolCreationFee()
    let leftover: uint64 = creationFee
    let referralMbr: uint64 = 0
    if (creationFee > 0) {
      ({ leftover, referralMbr } = sendReferralPayment(this.akitaDAO.value, 0, creationFee))
    }

    const totalMBR: uint64 = (
      creationFee +
      refundableMBR +
      referralMbr
    )

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === totalMBR, ERR_INVALID_PAYMENT)

    // Resolve any impact-app calls before beginning the pool init inner transaction.
    const akitaRoyalty = this.poolRoyalty()

    if (leftover > 0) {
      itxn
        .payment({
          receiver: this.akitaDAOEscrow.value.app.address,
          amount: leftover,
        })
        .submit()
    }

    // Read approval program from box storage and split into chunks
    const approvalSize = this.boxedContract.length
    const chunk1 = this.boxedContract.extract(0, 4096)
    const chunk2 = this.boxedContract.extract(4096, approvalSize - 4096)

    const newPoolApp = pool.call
      .create({
        args: [
          title,
          type,
          Txn.sender,
          { account: payment.sender, amount: refundableMBR },
          marketplace,
          stakeKey,
          minimumStakeAmount,
          allowLateSignups,
          gateID,
          maxEntries,
          this.akitaDAO.value,
          this.akitaDAOEscrow.value
        ],
        approvalProgram: [chunk1, chunk2],
        clearStateProgram: pool.clearStateProgram,
        extraProgramPages: 3
      })
      .itxn
      .createdApp

    itxn
      .payment({
        receiver: Application(newPoolApp.id).address,
        amount: Global.minBalance,
      })
      .submit()

    pool.call.init({ appId: newPoolApp.id, args: [akitaRoyalty] })

    return newPoolApp.id
  }

  deletePool(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, ERR_NOT_CREATOR)

    const { account: receiver, amount } = getFunder(appId)

    abiCall<typeof StakingPool.prototype.delete>({
      appId,
      args: [Txn.sender],
      onCompletion: OnCompleteAction.DeleteApplication
    })

    itxn
      .payment({ receiver, amount })
      .submit()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  newPoolCost(): uint64 {
    const pool = compileArc4(StakingPool)

    const refundableMBR: uint64 = (
      MAX_PROGRAM_PAGES +
      (GLOBAL_STATE_KEY_UINT_COST * pool.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * pool.globalBytes) +
      Global.minBalance
    )

    let referralMbr: uint64 = 0
    const creationFee = this.poolCreationFee()
    if (creationFee > 0) {
      referralMbr = referralFee(this.akitaDAO.value, 0)
    }

    return (
      creationFee +
      refundableMBR +
      referralMbr
    )
  }
}
