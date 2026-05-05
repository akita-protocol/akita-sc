import {
  Application,
  BoxMap,
  clone,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'

import {
  MinDisbursementsMBR,
  RewardsBoxPrefixDisbursements,
  RewardsBoxPrefixUserAllocations,
  RewardsGlobalStateKeyDisbursementID,
  UserAllocationMBR,
} from './constants'
import {
  ERR_ALLOCATION_ALREADY_EXISTS,
  ERR_ALLOCATION_DOES_NOT_EXIST,
  ERR_DISBURSEMENT_ALREADY_FINAL,
  ERR_DISBURSEMENT_DOES_NOT_EXIST,
  ERR_DISBURSEMENT_FULLY_DISTRIBUTED,
  ERR_DISBURSEMENT_LOCKED,
  ERR_DISBURSEMENT_NOT_EXPIRED,
  ERR_DISBURSEMENTS_CANNOT_BE_EMPTY,
  ERR_DISBURSEMENTS_MUST_HAVE_ALLOCATIONS,
  ERR_INVALID_DISBURSEMENT_EXPIRATION_TIME,
  ERR_INVALID_DISBURSEMENT_UNLOCK_TIME,
  ERR_INVALID_MBR_AMOUNT,
  ERR_INVALID_PAYMENT,
  ERR_INVALID_TRANSFER,
  ERR_YOU_ARE_NOT_THE_CREATOR,
} from './errors'
import {
  AllocationReclaimDetails,
  ClaimDetails,
  DisbursementDetails,
  UserAllocation,
  UserAllocationsKey,
} from './types'

// CONTRACT IMPORTS
import { AkitaBaseContract } from '../utils/base-contracts/base'
import { ContractWithOptIn } from '../utils/base-contracts/optin'
import { BaseRewards } from './base'


export class Rewards extends classes(BaseRewards, AkitaBaseContract, ContractWithOptIn) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** the disbursement id cursor */
  disbursementID = GlobalState<uint64>({ initialValue: 1, key: RewardsGlobalStateKeyDisbursementID })

  // BOXES ----------------------------------------------------------------------------------------

  /** the disbursement map of tokens
   *
   * the key is the uint64 id of the disbursement
   * the value is the details of the disbursement
   *
   */
  disbursements = BoxMap<uint64, DisbursementDetails>({ keyPrefix: RewardsBoxPrefixDisbursements })
  /** the user allocations of disbursements
   *
   * the key is the address of the qualified account with the uint64 id of the disbursement
   * the value is the amount they are owed
   */
  userAllocations = BoxMap<UserAllocationsKey, uint64>({ keyPrefix: RewardsBoxPrefixUserAllocations })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newDisbursementID(): uint64 {
    const id = this.disbursementID.value
    this.disbursementID.value += 1
    return id
  }

  private addMbrCredit(id: uint64, amount: uint64): void {
    this.disbursements(id).value.mbrCredits += amount
  }

  private useMbrCredit(id: uint64, amount: uint64): void {
    loggedAssert(this.disbursements(id).value.mbrCredits >= amount, ERR_INVALID_MBR_AMOUNT)
    this.disbursements(id).value.mbrCredits -= amount
    this.disbursements(id).value.usedMbrCredits += amount
  }

  private releaseMbrCredit(id: uint64, amount: uint64): void {
    loggedAssert(this.disbursements(id).value.usedMbrCredits >= amount, ERR_INVALID_MBR_AMOUNT)
    this.disbursements(id).value.usedMbrCredits -= amount
    this.disbursements(id).value.mbrCredits += amount
  }

  private refundAllocationMbr(id: uint64): void {
    this.releaseMbrCredit(id, UserAllocationMBR)
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // REWARDS METHODS ------------------------------------------------------------------------------

  fundMbrCredits(id: uint64, payment: gtxn.PaymentTxn): void {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)
    loggedAssert(this.disbursements(id).value.creator === Txn.sender, ERR_YOU_ARE_NOT_THE_CREATOR)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount > 0, ERR_INVALID_PAYMENT)

    this.addMbrCredit(id, payment.amount)
  }

  withdrawMbrCredits(id: uint64, amount: uint64): void {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)
    loggedAssert(this.disbursements(id).value.creator === Txn.sender, ERR_YOU_ARE_NOT_THE_CREATOR)
    loggedAssert(amount > 0, ERR_INVALID_MBR_AMOUNT)
    loggedAssert(this.disbursements(id).value.mbrCredits >= amount, ERR_INVALID_MBR_AMOUNT)
    this.disbursements(id).value.mbrCredits -= amount

    itxn.payment({
      receiver: Txn.sender,
      amount,
    }).submit()
  }

  createDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string
  ): uint64 {
    const id = this.newDisbursementID()

    const costs = this.mbr(title, note)
    const mbrAmount = costs.disbursements

    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount >= mbrAmount, ERR_INVALID_PAYMENT)

    this.disbursements(id).value = {
      creator: Txn.sender,
      finalized: false,
      title,
      amount: 0,
      timeToUnlock,
      expiration,
      allocations: 0,
      distributed: 0,
      mbrCredits: mbrPayment.amount - mbrAmount,
      usedMbrCredits: 0,
      note,
    }

    return id
  }

  editDisbursement(
    id: uint64,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string
  ): void {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)

    const { creator, finalized } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, ERR_YOU_ARE_NOT_THE_CREATOR)
    loggedAssert(finalized === false, ERR_DISBURSEMENT_ALREADY_FINAL)

    this.disbursements(id).value.title = title
    this.disbursements(id).value.timeToUnlock = timeToUnlock
    this.disbursements(id).value.expiration = expiration
    this.disbursements(id).value.note = note
  }

  createUserAllocations(
    payment: gtxn.PaymentTxn,
    id: uint64,
    allocations: UserAllocation[]
  ): void {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)

    const { creator, finalized, title, note } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, ERR_YOU_ARE_NOT_THE_CREATOR)
    loggedAssert(!finalized, ERR_DISBURSEMENT_ALREADY_FINAL)

    let sum: uint64 = 0
    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: allocations[i].address,
        asset: 0,
      }

      loggedAssert(!this.userAllocations(userAllocationsKey).exists, ERR_ALLOCATION_ALREADY_EXISTS)

      this.userAllocations(userAllocationsKey).value = allocations[i].amount
      this.disbursements(id).value.allocations += 1
      this.disbursements(id).value.amount += allocations[i].amount

      sum += allocations[i].amount
    }

    const costs = this.mbr(title, note)
    const mbrAmount: uint64 = costs.userAllocations * allocations.length
    this.useMbrCredit(id, mbrAmount)

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === sum, ERR_INVALID_PAYMENT)
  }

  createAsaUserAllocations(
    assetXfer: gtxn.AssetTransferTxn,
    id: uint64,
    allocations: UserAllocation[]
  ): void {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)

    const { creator, finalized, title, note } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, ERR_YOU_ARE_NOT_THE_CREATOR)
    loggedAssert(!finalized, ERR_DISBURSEMENT_ALREADY_FINAL)

    let matchSum: uint64 = 0
    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: allocations[i].address,
        asset: assetXfer.xferAsset.id,
      }
      loggedAssert(!this.userAllocations(userAllocationsKey).exists, ERR_ALLOCATION_ALREADY_EXISTS)

      this.userAllocations(userAllocationsKey).value = allocations[i].amount

      this.disbursements(id).value.allocations += 1
      this.disbursements(id).value.amount += allocations[i].amount

      matchSum += allocations[i].amount
    }

    const costs = this.mbr(title, note)
    const mbrAmount: uint64 = costs.userAllocations * allocations.length
    this.useMbrCredit(id, mbrAmount)

    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, ERR_INVALID_TRANSFER)
    loggedAssert(assetXfer.assetAmount === matchSum, ERR_INVALID_TRANSFER)
  }

  createAsaDisbursementFromGroup(
    mbrPaymentIndex: uint64,
    assetTransferStartIndex: uint64,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string,
    allocations: UserAllocation[]
  ): uint64 {
    const id = this.newDisbursementID()
    const payment = gtxn.PaymentTxn(mbrPaymentIndex)

    const costs = this.mbr(title, note)
    const disbursementMbrAmount = costs.disbursements
    const allocationMbrAmount: uint64 = costs.userAllocations * allocations.length

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount >= disbursementMbrAmount + allocationMbrAmount, ERR_INVALID_PAYMENT)

    this.disbursements(id).value = {
      creator: Txn.sender,
      finalized: false,
      title,
      amount: 0,
      timeToUnlock,
      expiration,
      allocations: 0,
      distributed: 0,
      mbrCredits: payment.amount - disbursementMbrAmount,
      usedMbrCredits: 0,
      note,
    }

    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      const assetXfer = gtxn.AssetTransferTxn(assetTransferStartIndex + i)
      const allocation = clone(allocations[i])
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: allocation.address,
        asset: assetXfer.xferAsset.id,
      }

      loggedAssert(!this.userAllocations(userAllocationsKey).exists, ERR_ALLOCATION_ALREADY_EXISTS)
      loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, ERR_INVALID_TRANSFER)
      loggedAssert(assetXfer.assetAmount === allocation.amount, ERR_INVALID_TRANSFER)

      this.userAllocations(userAllocationsKey).value = allocation.amount
      this.disbursements(id).value.allocations += 1
      this.disbursements(id).value.amount += allocation.amount
    }

    this.useMbrCredit(id, allocationMbrAmount)

    loggedAssert(
      timeToUnlock >= Global.latestTimestamp || timeToUnlock === 0,
      ERR_INVALID_DISBURSEMENT_UNLOCK_TIME
    )
    loggedAssert(
      expiration >= Global.latestTimestamp + 60 || expiration === 0,
      ERR_INVALID_DISBURSEMENT_EXPIRATION_TIME
    )
    loggedAssert(this.disbursements(id).value.amount > 0, ERR_DISBURSEMENTS_CANNOT_BE_EMPTY)
    loggedAssert(this.disbursements(id).value.allocations > 0, ERR_DISBURSEMENTS_MUST_HAVE_ALLOCATIONS)

    this.disbursements(id).value.finalized = true

    return id
  }

  finalizeDisbursement(id: uint64): void {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)

    const { creator, finalized, timeToUnlock, expiration, amount, allocations } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, ERR_YOU_ARE_NOT_THE_CREATOR)
    loggedAssert(!finalized, ERR_DISBURSEMENT_ALREADY_FINAL)
    loggedAssert(
      timeToUnlock >= Global.latestTimestamp || timeToUnlock === 0,
      ERR_INVALID_DISBURSEMENT_UNLOCK_TIME
    )
    loggedAssert(
      expiration >= Global.latestTimestamp + 60 || expiration === 0,
      ERR_INVALID_DISBURSEMENT_EXPIRATION_TIME
    )
    loggedAssert(amount > 0, ERR_DISBURSEMENTS_CANNOT_BE_EMPTY)
    loggedAssert(allocations > 0, ERR_DISBURSEMENTS_MUST_HAVE_ALLOCATIONS)

    this.disbursements(id).value.finalized = true
  }

  createInstantDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[]
  ): uint64 {
    const id = this.newDisbursementID()

    const allocationsMbr: uint64 = UserAllocationMBR * allocations.length
    const mbrAmount: uint64 = MinDisbursementsMBR + allocationsMbr

    let sum: uint64 = 0
    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: allocations[i].address,
        asset: 0,
      }

      this.userAllocations(userAllocationsKey).value = allocations[i].amount
      sum += allocations[i].amount
    }

    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount === mbrAmount + sum, ERR_INVALID_PAYMENT)

    this.disbursements(id).value = {
      creator: Txn.sender,
      finalized: true,
      title: '',
      amount: sum,
      timeToUnlock,
      expiration,
      allocations: allocations.length,
      distributed: 0,
      mbrCredits: 0,
      usedMbrCredits: allocationsMbr,
      note: '',
    }

    return id
  }

  createInstantAsaDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[]
  ): uint64 {
    const id = this.newDisbursementID()

    const allocationsMbr: uint64 = UserAllocationMBR * allocations.length
    const mbrAmount: uint64 = MinDisbursementsMBR + allocationsMbr

    let sum: uint64 = 0
    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: allocations[i].address,
        asset: assetXfer.xferAsset.id,
      }

      this.userAllocations(userAllocationsKey).value = allocations[i].amount
      sum += allocations[i].amount
    }

    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount === mbrAmount, ERR_INVALID_PAYMENT)

    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, ERR_INVALID_TRANSFER)
    loggedAssert(assetXfer.assetAmount === sum, ERR_INVALID_TRANSFER)

    this.disbursements(id).value = {
      creator: Txn.sender,
      finalized: true,
      title: '',
      amount: sum,
      timeToUnlock,
      expiration,
      allocations: allocations.length,
      distributed: 0,
      mbrCredits: 0,
      usedMbrCredits: allocationsMbr,
      note: '',
    }

    return id
  }

  claimRewards(rewards: ClaimDetails[]): void {
    for (let i: uint64 = 0; i < rewards.length; i += 1) {
      loggedAssert(this.disbursements(rewards[i].id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)

      const { timeToUnlock, expiration, amount, distributed, note } = this.disbursements(rewards[i].id).value
      loggedAssert(timeToUnlock <= Global.latestTimestamp, ERR_DISBURSEMENT_LOCKED)
      loggedAssert(expiration >= Global.latestTimestamp, ERR_DISBURSEMENT_LOCKED)
      loggedAssert(amount > distributed, ERR_DISBURSEMENT_FULLY_DISTRIBUTED)

      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: rewards[i].id,
        address: Txn.sender,
        asset: rewards[i].asset,
      }
      loggedAssert(this.userAllocations(userAllocationsKey).exists, ERR_ALLOCATION_DOES_NOT_EXIST)
      const userAllocation = this.userAllocations(userAllocationsKey).value

      this.disbursements(rewards[i].id).value.allocations -= 1
      this.disbursements(rewards[i].id).value.distributed += userAllocation
      this.userAllocations(userAllocationsKey).delete()
      this.refundAllocationMbr(rewards[i].id)

      const isAlgo = rewards[i].asset === 0

      if (!isAlgo) {
        const assetXfer = itxn.assetTransfer({
          assetReceiver: Txn.sender,
          assetAmount: userAllocation,
          xferAsset: rewards[i].asset,
          note,
        })

        assetXfer.submit()
      } else {
        const payment = itxn.payment({
          receiver: Txn.sender,
          amount: userAllocation,
          note,
        })

        payment.submit()
      }
    }
  }

  reclaimRewards(id: uint64, reclaims: AllocationReclaimDetails[]): void {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)
    const { creator, finalized, expiration } = this.disbursements(id).value

    loggedAssert(creator === Txn.sender, ERR_YOU_ARE_NOT_THE_CREATOR)
    loggedAssert(finalized, ERR_DISBURSEMENT_ALREADY_FINAL)
    loggedAssert(expiration <= Global.latestTimestamp, ERR_DISBURSEMENT_NOT_EXPIRED)

    for (let i: uint64 = 0; i < reclaims.length; i += 1) {
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: reclaims[i].address,
        asset: reclaims[i].asset,
      }
      loggedAssert(this.userAllocations(userAllocationsKey).exists, ERR_ALLOCATION_DOES_NOT_EXIST)

      const userAllocation = this.userAllocations(userAllocationsKey).value

      this.disbursements(id).value.allocations -= 1
      this.disbursements(id).value.amount -= userAllocation
      this.userAllocations(userAllocationsKey).delete()
      this.refundAllocationMbr(id)

      const isAlgo = reclaims[i].asset === 0

      if (!isAlgo) {
        const xfer = itxn.assetTransfer({
          assetReceiver: creator,
          assetAmount: userAllocation,
          xferAsset: reclaims[i].asset,
        })

        xfer.submit()
      } else {
        itxn
          .payment({
            receiver: creator,
            amount: userAllocation,
          })
          .submit()
      }
    }
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  allocationMbrCreditShortfall(id: uint64, allocationCount: uint64): uint64 {
    loggedAssert(this.disbursements(id).exists, ERR_DISBURSEMENT_DOES_NOT_EXIST)

    const mbrAmount: uint64 = UserAllocationMBR * allocationCount
    const credits: uint64 = this.disbursements(id).value.mbrCredits
    if (credits >= mbrAmount) {
      return 0
    }

    return mbrAmount - credits
  }

}
