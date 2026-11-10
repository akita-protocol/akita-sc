import { abimethod, Account, Application, clone, contract, Global, gtxn, itxn, loggedAssert, OnCompleteAction, Txn, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, compileArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { classes } from "polytype";
import { RootKey } from "../meta/types";
import { StakingType } from "../staking/types";
import { FactoryGlobalStateMaxBytes, FactoryGlobalStateMaxUints, GLOBAL_STATE_KEY_BYTES_COST, GLOBAL_STATE_KEY_UINT_COST } from "../utils/constants";
import { errContractNotSet } from "../utils/errors";
import { errInvalidPayment, errInvalidPoolType, errNotCreator, errTypedPoolNeedsStakeKey } from "./errors";
import { POOL_STAKING_TYPE_HARD, POOL_STAKING_TYPE_HEARTBEAT, POOL_STAKING_TYPE_LOCK, POOL_STAKING_TYPE_NONE, POOL_STAKING_TYPE_SOFT } from "./constants";
import { getAkitaSocialAppList, getFunder, getStakingFees, getUserImpact, impactRange, legacyReferralFee, legacySendReferralPayment, principalOf, quoteReferrerOf, referralFeeTo, sendReferralPaymentTo } from "../utils/functions";
import { ReferralPaymentInfo } from "../utils/types/referral";

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

  /**
   * Creates a pool. `referrer`/`legacy` select the creation-fee referral: legacy shims pay the
   * registry referrer of `Txn.sender` (deployed semantics), hinted calls pay `referrer` (the verified
   * principal's referrer, or zero for `wallet = 0`).
   */
  private createPool(
    payment: gtxn.PaymentTxn,
    title: string,
    type: StakingType,
    marketplace: Account,
    stakeKey: RootKey,
    minimumStakeAmount: uint64,
    allowLateSignups: boolean,
    gateID: uint64,
    maxEntries: uint64,
    referrer: Account,
    legacy: boolean,
  ): uint64 {

    loggedAssert(this.boxedContract.exists, errContractNotSet)
    // L-3: only known pool types; H-2: typed pools weigh real stake of an asset from the stake key
    loggedAssert(
      type === POOL_STAKING_TYPE_NONE ||
      type === POOL_STAKING_TYPE_HEARTBEAT ||
      type === POOL_STAKING_TYPE_SOFT ||
      type === POOL_STAKING_TYPE_HARD ||
      type === POOL_STAKING_TYPE_LOCK,
      errInvalidPoolType
    )
    loggedAssert(type === POOL_STAKING_TYPE_NONE || stakeKey.address !== Global.zeroAddress, errTypedPoolNeedsStakeKey)

    const pool = compileArc4(StakingPool)

    const childCreationMBR: uint64 = (
      this.childPagesMbr(pool.clearStateProgram.length) +
      (GLOBAL_STATE_KEY_UINT_COST * pool.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * pool.globalBytes)
    )
    const refundableMBR: uint64 = childCreationMBR + Global.minBalance

    const creationFee = this.poolCreationFee()
    let leftover: uint64 = creationFee
    let referralMbr: uint64 = 0
    if (creationFee > 0) {
      let info: ReferralPaymentInfo
      if (legacy) {
        info = legacySendReferralPayment(this.akitaDAO.value, 0, creationFee, this.akitaDAOEscrow.value.app.address)
      } else {
        info = sendReferralPaymentTo(this.akitaDAO.value, referrer, 0, creationFee, this.akitaDAOEscrow.value.app.address)
      }
      leftover = info.leftover
      referralMbr = info.referralMbr
    }

    const totalMBR: uint64 = (
      creationFee +
      refundableMBR +
      referralMbr
    )

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === totalMBR, errInvalidPayment)

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
        // Boxed approval program in up to four 4 KB chunks (AVM 13: up to 16 KB).
        approvalProgram: [
          this.childApprovalChunk(0),
          this.childApprovalChunk(1),
          this.childApprovalChunk(2),
          this.childApprovalChunk(3),
        ],
        clearStateProgram: pool.clearStateProgram,
        extraProgramPages: this.childExtraPages(pool.clearStateProgram.length)
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

  /**
   * Creates a staking pool (PHASE-0-SPEC §6.5). The creation-fee referral goes to the verified
   * principal's referrer, resolved from the wallet hint.
   * @param wallet the caller's ARC-58 wallet hint (0 = act as `Txn.sender`); plugins pass `windowHint(wallet)`
   * @returns the new pool's app id
   */
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
    wallet: uint64,
  ): uint64 {
    const p = principalOf(this.akitaDAO.value, wallet)
    return this.createPool(payment, title, type, marketplace, stakeKey, minimumStakeAmount, allowLateSignups, gateID, maxEntries, p.referrer, false)
  }

  /**
   * LEGACY SHIM `newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64`
   * (deployed staking-pool plugin 3642438287 and pre-hint SDKs; delete in Phase 4): registry
   * referral of `Txn.sender`. The pool it creates is a current child (with the `pv` marker).
   */
  @abimethod({ name: 'newPool' })
  legacyNewPool(
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
    return this.createPool(payment, title, type, marketplace, stakeKey, minimumStakeAmount, allowLateSignups, gateID, maxEntries, Global.zeroAddress, true)
  }

  deletePool(appId: Application): void {
    loggedAssert(appId.creator === Global.currentApplicationAddress, errNotCreator)

    const { account: receiver, amount } = getFunder(appId)
    const self = Global.currentApplicationAddress
    const balanceBefore = self.balance
    const minBefore = self.minBalance

    abiCall<typeof StakingPool.prototype.delete>({
      appId,
      args: [Txn.sender],
      onCompletion: OnCompleteAction.DeleteApplication
    })

    // refund only what the deletion actually returned or released, capped at the recorded deposit
    this.refundReleased(receiver, amount, balanceBefore, minBefore, 0)
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  private poolCost(referralMbr: uint64): uint64 {
    const pool = compileArc4(StakingPool)

    const refundableMBR: uint64 = (
      this.childPagesMbr(pool.clearStateProgram.length) +
      (GLOBAL_STATE_KEY_UINT_COST * pool.globalUints) +
      (GLOBAL_STATE_KEY_BYTES_COST * pool.globalBytes) +
      Global.minBalance
    )

    return (
      this.poolCreationFee() +
      refundableMBR +
      referralMbr
    )
  }

  /**
   * @param wallet the wallet hint `newPool` will receive: its referrer (genuine wallets only) adds the
   *               referral disbursement MBR when a creation fee applies
   * @returns the exact payment `newPool(…, wallet)` requires from `Txn.sender`
   */
  @abimethod({ readonly: true, name: 'newPoolCost' })
  hintedNewPoolCost(wallet: uint64): uint64 {
    let referralMbr: uint64 = 0
    if (this.poolCreationFee() > 0) {
      referralMbr = referralFeeTo(this.akitaDAO.value, quoteReferrerOf(this.akitaDAO.value, wallet), 0)
    }
    return this.poolCost(referralMbr)
  }

  /** LEGACY SHIM `newPoolCost()uint64` (registry referrer of `Txn.sender`; delete in Phase 4). */
  @abimethod({ readonly: true, name: 'newPoolCost' })
  legacyNewPoolCost(): uint64 {
    let referralMbr: uint64 = 0
    if (this.poolCreationFee() > 0) {
      referralMbr = legacyReferralFee(this.akitaDAO.value, 0)
    }
    return this.poolCost(referralMbr)
  }
}
