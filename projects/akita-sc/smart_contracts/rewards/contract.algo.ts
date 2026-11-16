import {
  Account,
  Application,
  Asset,
  BoxMap,
  Bytes,
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
  errAllocationAlreadyExists,
  errAllocationDoesNotExist,
  errDisbursementAlreadyFinal,
  errDisbursementDoesNotExist,
  errDisbursementFullyDistributed,
  errDisbursementLocked,
  errDisbursementNotExpired,
  errDisbursementsCannotBeEmpty,
  errDisbursementsMustHaveAllocations,
  errInvalidDisbursementExpirationTime,
  errInvalidDisbursementUnlockTime,
  errInvalidMbrAmount,
  errInvalidPayment,
  errInvalidTransfer,
  errYouAreNotTheCreator,
  errDisbursementNotFinal,
  errDisbursementNotEmpty,
  errInvalidGroupIndex,
  errInvalidCloseTo,
  errDisbursementNotSweepable,
  errReclaimTargetNotOptedIn,
} from './errors'
import { BoxCostPerByte } from '../utils/constants'
import { errPayerOnly } from '../utils/errors'
import {
  assertBoundAssetTransfer, assertBoundPayment, assertExactPayment, assertPlainPayment, canReceiveAlgo, payerOf,
  recordPayer, releaseDeposit, sponsorCost,
} from '../utils/functions'
import {
  AllocationReclaimDetails,
  ClaimDetails,
  DisbursementDetails,
  UserAllocation,
  UserAllocationsKey,
} from './types'

// CONTRACT IMPORTS
import { AkitaBaseContract } from '../utils/base-contracts/upgradeable'
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

  /**
   * Remembers who funds disbursement `id` when it is not the creator (the caller). That payer funds
   * the disbursement's storage and MBR credits from then on, and they return to it. Reward amounts
   * stay the creator's.
   * @returns what the payer adds to its payment for being remembered (0 for the creator)
   */
  private sponsor(id: uint64, payer: Account): uint64 {
    recordPayer(this.disbursements(id).key, payer, Txn.sender)
    return sponsorCost(payer, Txn.sender)
  }

  private useMbrCredit(id: uint64, amount: uint64): void {
    loggedAssert(this.disbursements(id).value.mbrCredits >= amount, errInvalidMbrAmount)
    this.disbursements(id).value.mbrCredits -= amount
  }

  /** Credits held by allocation boxes are `allocations * UserAllocationMBR`; a deleted box releases one. */
  private refundAllocationMbr(id: uint64): void {
    this.addMbrCredit(id, UserAllocationMBR)
  }

  /** `0` = no unlock delay; otherwise it must not be in the past. */
  private assertValidUnlock(timeToUnlock: uint64): void {
    loggedAssert(
      timeToUnlock >= Global.latestTimestamp || timeToUnlock === 0,
      errInvalidDisbursementUnlockTime
    )
  }

  /** `0` = never expires; otherwise at least a minute in the future. */
  private assertValidExpiration(expiration: uint64): void {
    loggedAssert(
      expiration >= Global.latestTimestamp + 60 || expiration === 0,
      errInvalidDisbursementExpirationTime
    )
  }

  /**
   * Writes one allocation. A repeated address tops up its existing box instead of failing (ST-2),
   * so pools whose users hold several entries, or win several shuffle tickets, still settle.
   * Zero amounts create nothing.
   * @returns 1 when a new allocation box was created, otherwise 0
   */
  private writeAllocation(id: uint64, address: Account, asset: uint64, amount: uint64): uint64 {
    if (amount === 0) {
      return 0
    }

    const key: UserAllocationsKey = { disbursementID: id, address, asset }
    const [previous, exists] = this.userAllocations(key).maybe()
    this.disbursements(id).value.amount += amount

    if (exists) {
      this.userAllocations(key).value = previous + amount
      return 0
    }

    this.userAllocations(key).value = amount
    this.disbursements(id).value.allocations += 1
    return 1
  }

  /**
   * Grouped asset transfer into this app from the caller: no clawback source, no rekey, and a
   * close-out (if any) only to this app.
   */
  private assertInboundAssetTransfer(assetXfer: gtxn.AssetTransferTxn, amount: uint64): void {
    loggedAssert(assetXfer.sender === Txn.sender, errInvalidTransfer)
    loggedAssert(assetXfer.assetSender === Global.zeroAddress, errInvalidTransfer)
    loggedAssert(assetXfer.rekeyTo === Global.zeroAddress, errInvalidTransfer)
    loggedAssert(
      assetXfer.assetCloseTo === Global.zeroAddress || assetXfer.assetCloseTo === Global.currentApplicationAddress,
      errInvalidCloseTo
    )
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount === amount, errInvalidTransfer)
  }

  /** Box MBR of a disbursement whose title and note have these lengths. */
  private disbursementBoxMbr(titleLength: uint64, noteLength: uint64): uint64 {
    return MinDisbursementsMBR + (BoxCostPerByte * (titleLength + noteLength))
  }

  /**
   * Deletes a disbursement with no outstanding allocations and returns the MBR its box held plus the
   * remaining MBR credits.
   */
  private deleteDisbursement(id: uint64): uint64 {
    const { mbrCredits, title, note } = this.disbursements(id).value
    const released: uint64 = this.disbursementBoxMbr(Bytes(title).length, Bytes(note).length) + mbrCredits
    this.disbursements(id).delete()
    return released
  }

  /**
   * Writes a finalized instant disbursement of `asset`. With a non-zero `reclaimTo`, anyone can sweep
   * what is unclaimed at expiration to it.
   * @returns the id, the allocation sum, and the exact MBR the caller must pay
   */
  private newInstantDisbursement(
    asset: uint64,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[],
    reclaimTo: Account
  ): { id: uint64, sum: uint64, mbrAmount: uint64 } {
    loggedAssert(allocations.length > 0, errDisbursementsMustHaveAllocations)
    this.assertValidUnlock(timeToUnlock)
    this.assertValidExpiration(expiration)

    const id = this.newDisbursementID()

    const allocationsMbr: uint64 = UserAllocationMBR * allocations.length
    const mbrAmount: uint64 = MinDisbursementsMBR + allocationsMbr

    this.disbursements(id).value = {
      creator: Txn.sender,
      finalized: true,
      title: '',
      amount: 0,
      timeToUnlock,
      expiration,
      allocations: 0,
      distributed: 0,
      mbrCredits: allocationsMbr,
      reclaimTo,
      note: '',
    }

    let sum: uint64 = 0
    let newBoxes: uint64 = 0
    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      newBoxes += this.writeAllocation(id, allocations[i].address, asset, allocations[i].amount)
      sum += allocations[i].amount
    }
    this.useMbrCredit(id, UserAllocationMBR * newBoxes)

    return { id, sum, mbrAmount }
  }

  private newDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string,
    reclaimTo: Account
  ): uint64 {
    const id = this.newDisbursementID()

    const costs = this.mbr(title, note)
    const mbrAmount = costs.disbursements

    // Anyone may fund the storage. Any surplus becomes MBR credit, which returns to whoever paid.
    const sponsor = this.sponsor(id, mbrPayment.sender)
    assertPlainPayment(mbrPayment)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount >= mbrAmount + sponsor, errInvalidPayment)

    this.disbursements(id).value = {
      creator: Txn.sender,
      finalized: false,
      title,
      amount: 0,
      timeToUnlock,
      expiration,
      allocations: 0,
      distributed: 0,
      mbrCredits: mbrPayment.amount - mbrAmount - sponsor,
      reclaimTo,
      note,
    }

    return id
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // REWARDS METHODS ------------------------------------------------------------------------------

  fundMbrCredits(id: uint64, payment: gtxn.PaymentTxn): void {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)
    loggedAssert(this.disbursements(id).value.creator === Txn.sender, errYouAreNotTheCreator)
    // Credits return to whoever funded the disbursement, so that account is the one that adds to them.
    loggedAssert(payment.sender === payerOf(this.disbursements(id).key, Txn.sender), errPayerOnly)
    assertPlainPayment(payment)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount > 0, errInvalidPayment)

    this.addMbrCredit(id, payment.amount)
  }

  withdrawMbrCredits(id: uint64, amount: uint64): void {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)
    loggedAssert(this.disbursements(id).value.creator === Txn.sender, errYouAreNotTheCreator)
    loggedAssert(amount > 0, errInvalidMbrAmount)
    loggedAssert(this.disbursements(id).value.mbrCredits >= amount, errInvalidMbrAmount)
    this.disbursements(id).value.mbrCredits -= amount

    // credits go back to whoever funded the disbursement (the creator, unless someone else paid)
    const payer = payerOf(this.disbursements(id).key, Txn.sender)
    itxn.payment({
      receiver: canReceiveAlgo(payer, amount) ? payer : Txn.sender,
      amount,
    }).submit()
  }

  /**
   * Opens a draft disbursement; allocations follow in batches, then `finalizeDisbursement`. After
   * `expiration`, anyone may sweep what is unclaimed to a non-zero `reclaimTo` (`sweepExpired`).
   */
  createDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string,
    reclaimTo: Account
  ): uint64 {
    return this.newDisbursement(mbrPayment, title, timeToUnlock, expiration, note, reclaimTo)
  }

  /** The pre-reclaim-target selector: `createDisbursement` with no reclaim target. */
  @abimethod({ name: 'createDisbursement' })
  legacyCreateDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string
  ): uint64 {
    return this.newDisbursement(mbrPayment, title, timeToUnlock, expiration, note, Global.zeroAddress)
  }

  editDisbursement(
    id: uint64,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string
  ): void {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)

    const { creator, finalized, title: oldTitle, note: oldNote } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, errYouAreNotTheCreator)
    loggedAssert(finalized === false, errDisbursementAlreadyFinal)

    // The box grows or shrinks with the strings; charge or release that MBR against the creator's
    // credits so this app never funds (or keeps) the difference.
    const oldMbr = this.disbursementBoxMbr(Bytes(oldTitle).length, Bytes(oldNote).length)
    const newMbr = this.disbursementBoxMbr(Bytes(title).length, Bytes(note).length)
    if (newMbr > oldMbr) {
      const delta: uint64 = newMbr - oldMbr
      loggedAssert(this.disbursements(id).value.mbrCredits >= delta, errInvalidMbrAmount)
      this.disbursements(id).value.mbrCredits -= delta
    } else if (oldMbr > newMbr) {
      this.disbursements(id).value.mbrCredits += oldMbr - newMbr
    }

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
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)

    const { creator, finalized } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, errYouAreNotTheCreator)
    loggedAssert(!finalized, errDisbursementAlreadyFinal)

    let sum: uint64 = 0
    let newBoxes: uint64 = 0
    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      newBoxes += this.writeAllocation(id, allocations[i].address, 0, allocations[i].amount)
      sum += allocations[i].amount
    }

    this.useMbrCredit(id, UserAllocationMBR * newBoxes)

    assertBoundPayment(payment, Txn.sender, Global.currentApplicationAddress, sum)
  }

  createAsaUserAllocations(
    assetXfer: gtxn.AssetTransferTxn,
    id: uint64,
    allocations: UserAllocation[]
  ): void {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)

    const { creator, finalized } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, errYouAreNotTheCreator)
    loggedAssert(!finalized, errDisbursementAlreadyFinal)

    const asset = assetXfer.xferAsset.id
    let matchSum: uint64 = 0
    let newBoxes: uint64 = 0
    for (let i: uint64 = 0; i < allocations.length; i += 1) {
      newBoxes += this.writeAllocation(id, allocations[i].address, asset, allocations[i].amount)
      matchSum += allocations[i].amount
    }

    this.useMbrCredit(id, UserAllocationMBR * newBoxes)

    assertBoundAssetTransfer(assetXfer, Txn.sender, Global.currentApplicationAddress, assetXfer.xferAsset, matchSum)
  }

  /**
   * Creates and finalizes a multi-ASA disbursement funded by the `allocations.length + 1`
   * transactions immediately before this call: one exact MBR payment from any payer, then one asset
   * transfer per allocation from the caller.
   *
   * The index arguments are kept for ABI compatibility and must equal those positions. Binding
   * the funding to the slots directly before the call means no other call in the group (this
   * method or any positional transaction argument) can reuse it (C-1).
   */
  createAsaDisbursementFromGroup(
    mbrPaymentIndex: uint64,
    assetTransferStartIndex: uint64,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string,
    allocations: UserAllocation[]
  ): uint64 {
    const count: uint64 = allocations.length
    loggedAssert(count > 0, errDisbursementsMustHaveAllocations)
    loggedAssert(Txn.groupIndex > count, errInvalidGroupIndex)
    loggedAssert(assetTransferStartIndex === Txn.groupIndex - count, errInvalidGroupIndex)
    loggedAssert(mbrPaymentIndex === assetTransferStartIndex - 1, errInvalidGroupIndex)

    this.assertValidUnlock(timeToUnlock)
    this.assertValidExpiration(expiration)

    const id = this.newDisbursementID()
    const payment = gtxn.PaymentTxn(mbrPaymentIndex)

    const costs = this.mbr(title, note)
    const disbursementMbrAmount = costs.disbursements
    const allocationMbrAmount: uint64 = costs.userAllocations * count

    // exact: no surplus may turn into withdrawable credit
    assertExactPayment(
      payment,
      Global.currentApplicationAddress,
      disbursementMbrAmount + allocationMbrAmount + this.sponsor(id, payment.sender)
    )

    this.disbursements(id).value = {
      creator: Txn.sender,
      finalized: false,
      title,
      amount: 0,
      timeToUnlock,
      expiration,
      allocations: 0,
      distributed: 0,
      mbrCredits: allocationMbrAmount,
      reclaimTo: Global.zeroAddress,
      note,
    }

    let newBoxes: uint64 = 0
    for (let i: uint64 = 0; i < count; i += 1) {
      const assetXfer = gtxn.AssetTransferTxn(assetTransferStartIndex + i)
      const allocation = clone(allocations[i])
      loggedAssert(allocation.amount > 0, errDisbursementsCannotBeEmpty)
      assertBoundAssetTransfer(
        assetXfer,
        Txn.sender,
        Global.currentApplicationAddress,
        assetXfer.xferAsset,
        allocation.amount
      )
      newBoxes += this.writeAllocation(id, allocation.address, assetXfer.xferAsset.id, allocation.amount)
    }

    this.useMbrCredit(id, UserAllocationMBR * newBoxes)

    loggedAssert(this.disbursements(id).value.amount > 0, errDisbursementsCannotBeEmpty)
    loggedAssert(this.disbursements(id).value.allocations > 0, errDisbursementsMustHaveAllocations)

    this.disbursements(id).value.finalized = true

    return id
  }

  finalizeDisbursement(id: uint64): void {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)

    const { creator, finalized, timeToUnlock, expiration, amount, allocations } = this.disbursements(id).value
    loggedAssert(Txn.sender === creator, errYouAreNotTheCreator)
    loggedAssert(!finalized, errDisbursementAlreadyFinal)
    this.assertValidUnlock(timeToUnlock)
    this.assertValidExpiration(expiration)
    loggedAssert(amount > 0, errDisbursementsCannotBeEmpty)
    loggedAssert(allocations > 0, errDisbursementsMustHaveAllocations)

    this.disbursements(id).value.finalized = true
  }

  /**
   * Instant ALGO disbursement. The payment must be exactly the disbursement MBR, one allocation
   * MBR per entry, and the allocation sum, from any payer (a payer other than the caller adds
   * `PayerRecordMBR` and gets the storage back; the reward amounts stay the caller's). Repeated
   * addresses are summed and zero amounts are skipped; the MBR of boxes not created stays as
   * withdrawable credit. After `expiration`, anyone may sweep what is unclaimed to
   * a non-zero `reclaimTo` (`sweepExpired`).
   */
  createInstantDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[],
    reclaimTo: Account
  ): uint64 {
    const { id, sum, mbrAmount } = this.newInstantDisbursement(0, timeToUnlock, expiration, allocations, reclaimTo)
    assertExactPayment(mbrPayment, Global.currentApplicationAddress, mbrAmount + sum + this.sponsor(id, mbrPayment.sender))
    return id
  }

  /**
   * The pre-reclaim-target selector: `createInstantDisbursement` with no reclaim target. It charges the
   * v2 disbursement MBR, so deployed callers that pay the v1 amount revert.
   */
  @abimethod({ name: 'createInstantDisbursement' })
  legacyCreateInstantDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[]
  ): uint64 {
    const { id, sum, mbrAmount } = this.newInstantDisbursement(0, timeToUnlock, expiration, allocations, Global.zeroAddress)
    assertExactPayment(mbrPayment, Global.currentApplicationAddress, mbrAmount + sum + this.sponsor(id, mbrPayment.sender))
    return id
  }

  /** Instant ASA disbursement; same rules as `createInstantDisbursement`, with the sum sent as `assetXfer`. */
  createInstantAsaDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[],
    reclaimTo: Account
  ): uint64 {
    const { id, sum, mbrAmount } = this.newInstantDisbursement(assetXfer.xferAsset.id, timeToUnlock, expiration, allocations, reclaimTo)
    assertExactPayment(mbrPayment, Global.currentApplicationAddress, mbrAmount + this.sponsor(id, mbrPayment.sender))
    this.assertInboundAssetTransfer(assetXfer, sum)
    return id
  }

  /** The pre-reclaim-target selector: `createInstantAsaDisbursement` with no reclaim target, at the v2 MBR. */
  @abimethod({ name: 'createInstantAsaDisbursement' })
  legacyCreateInstantAsaDisbursement(
    mbrPayment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[]
  ): uint64 {
    const { id, sum, mbrAmount } = this.newInstantDisbursement(assetXfer.xferAsset.id, timeToUnlock, expiration, allocations, Global.zeroAddress)
    assertExactPayment(mbrPayment, Global.currentApplicationAddress, mbrAmount + this.sponsor(id, mbrPayment.sender))
    this.assertInboundAssetTransfer(assetXfer, sum)
    return id
  }

  claimRewards(rewards: ClaimDetails[]): void {
    for (let i: uint64 = 0; i < rewards.length; i += 1) {
      loggedAssert(this.disbursements(rewards[i].id).exists, errDisbursementDoesNotExist)

      const { finalized, timeToUnlock, expiration, amount, distributed, note } = this.disbursements(rewards[i].id).value
      loggedAssert(finalized, errDisbursementNotFinal)
      loggedAssert(timeToUnlock <= Global.latestTimestamp, errDisbursementLocked)
      // expiration 0 = never expires
      loggedAssert(expiration === 0 || expiration >= Global.latestTimestamp, errDisbursementLocked)
      loggedAssert(amount > distributed, errDisbursementFullyDistributed)

      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: rewards[i].id,
        address: Txn.sender,
        asset: rewards[i].asset,
      }
      loggedAssert(this.userAllocations(userAllocationsKey).exists, errAllocationDoesNotExist)
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
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)
    const { creator, finalized, expiration } = this.disbursements(id).value

    loggedAssert(creator === Txn.sender, errYouAreNotTheCreator)
    loggedAssert(finalized, errDisbursementNotFinal)
    // a never-expiring (0) disbursement can never be reclaimed
    loggedAssert(expiration !== 0 && expiration < Global.latestTimestamp, errDisbursementNotExpired)

    for (let i: uint64 = 0; i < reclaims.length; i += 1) {
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: reclaims[i].address,
        asset: reclaims[i].asset,
      }
      loggedAssert(this.userAllocations(userAllocationsKey).exists, errAllocationDoesNotExist)

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

  /**
   * Permissionless sweep of an expired disbursement that has a reclaim target. Each listed
   * allocation that still exists is deleted and its amount and box MBR go to the reclaim target
   * (allocations already claimed or swept are skipped). Once no allocations remain, the
   * disbursement box is deleted and its MBR and the remaining MBR credits go there too. The
   * creator's own `reclaimRewards` is unchanged.
   */
  sweepExpired(id: uint64, reclaims: AllocationReclaimDetails[]): void {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)
    const { finalized, expiration, reclaimTo } = this.disbursements(id).value
    loggedAssert(reclaimTo !== Global.zeroAddress, errDisbursementNotSweepable)
    loggedAssert(finalized, errDisbursementNotFinal)
    loggedAssert(expiration !== 0 && expiration < Global.latestTimestamp, errDisbursementNotExpired)

    // Reward amounts go to the reclaim target. Storage goes back to whoever funded the disbursement:
    // a recorded payer, or the reclaim target when the creator paid for it themselves.
    let algoAmount: uint64 = 0
    let storage: uint64 = 0
    for (let i: uint64 = 0; i < reclaims.length; i += 1) {
      const userAllocationsKey: UserAllocationsKey = {
        disbursementID: id,
        address: reclaims[i].address,
        asset: reclaims[i].asset,
      }
      const [userAllocation, exists] = this.userAllocations(userAllocationsKey).maybe()
      if (exists) {
        this.disbursements(id).value.allocations -= 1
        this.disbursements(id).value.amount -= userAllocation
        this.userAllocations(userAllocationsKey).delete()
        storage += UserAllocationMBR

        if (reclaims[i].asset === 0) {
          algoAmount += userAllocation
        } else {
          loggedAssert(reclaimTo.isOptedIn(Asset(reclaims[i].asset)), errReclaimTargetNotOptedIn)
          itxn.assetTransfer({
            assetReceiver: reclaimTo,
            assetAmount: userAllocation,
            xferAsset: reclaims[i].asset,
          }).submit()
        }
      }
    }

    const record = this.disbursements(id).key
    let funder = payerOf(record, reclaimTo)
    if (this.disbursements(id).value.allocations === 0) {
      const released: uint64 = storage + this.deleteDisbursement(id)
      const [receiver, total] = releaseDeposit(record, reclaimTo, released)
      funder = receiver
      storage = total
    }
    if (funder === reclaimTo || !canReceiveAlgo(funder, storage)) {
      algoAmount += storage
    } else if (storage > 0) {
      itxn.payment({ receiver: funder, amount: storage }).submit()
    }

    if (algoAmount > 0) {
      itxn.payment({ receiver: reclaimTo, amount: algoAmount }).submit()
    }
  }

  /**
   * Deletes a disbursement with no outstanding allocations (never-used drafts, or finalized
   * disbursements fully claimed/reclaimed) and refunds its box MBR and any remaining MBR credits to
   * whoever funded it (the creator, unless someone else paid).
   */
  closeDisbursement(id: uint64): void {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)
    const { creator, allocations } = this.disbursements(id).value
    loggedAssert(creator === Txn.sender, errYouAreNotTheCreator)
    loggedAssert(allocations === 0, errDisbursementNotEmpty)

    const released = this.deleteDisbursement(id)
    const [receiver, amount] = releaseDeposit(this.disbursements(id).key, creator, released)
    itxn.payment({ receiver, amount }).submit()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  allocationMbrCreditShortfall(id: uint64, allocationCount: uint64): uint64 {
    loggedAssert(this.disbursements(id).exists, errDisbursementDoesNotExist)

    const mbrAmount: uint64 = UserAllocationMBR * allocationCount
    const credits: uint64 = this.disbursements(id).value.mbrCredits
    if (credits >= mbrAmount) {
      return 0
    }

    return mbrAmount - credits
  }

}
