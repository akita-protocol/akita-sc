import { Account, Application, Asset, BoxMap, Bytes, bytes, clone, Global, gtxn, itxn, loggedAssert, op, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod, decodeArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { AssetHolding } from "@algorandfoundation/algorand-typescript/op";
import { ONE_DAY } from "../../../social/constants";
import { DIVISOR } from "../../../utils/constants";
import { arc58OptInAndSend, calcPercent, getAkitaAppList, getEscrow, getOriginAccount, getRekeyIndex, getSpendingAccount, rekeyAddress, rekeyBackIfNecessary } from "../../../utils/functions";
import { GlobalStateKeyAkitaDAO } from "../../../constants";
import { AbstractAccountGlobalStateKeysFactoryApp } from "../../account/constants";
import { ERR_ESCROW_DOES_NOT_EXIST, ERR_FORBIDDEN } from "../../account/errors";
import { RevenueManagerBoxPrefixEscrows, RevenueManagerBoxPrefixManagedAssets, RevenueManagerBoxPrefixReceiveAssets, RevenueManagerBoxPrefixSplitRefs, RevenueManagerBoxPrefixSplits, RevenueManagerEscrowNameMaxBytes } from "./constants";
import { ERR_ALREADY_OPTED_IN, ERR_ASSET_ALREADY_ALLOCATED, ERR_ASSET_ALREADY_REGISTERED, ERR_ASSET_LIST_CANNOT_BE_EMPTY, ERR_ASSET_NOT_ALLOCATED, ERR_ASSET_NOT_REGISTERED, ERR_CONTROLLED_ADDRESS_MUST_BE_ESCROW, ERR_ESCROW_NAME_TOO_LONG, ERR_ESCROW_NOT_ALLOCATABLE, ERR_ESCROW_NOT_ALLOWED_TO_OPTIN, ERR_ESCROW_NOT_IDLE, ERR_ESCROW_NOT_IN_ALLOCATION_PHASE, ERR_ESCROW_NOT_IN_FINALIZATION_PHASE, ERR_ESCROW_NOT_READY_FOR_DISBURSEMENT, ERR_FLAT_WITH_PERCENTAGE_REQUIRES_REMAINDER, ERR_INVALID_ASSET, ERR_INVALID_MIGRATION_METADATA, ERR_INVALID_PAYMENT, ERR_INVALID_SPLIT_REF, ERR_INVALID_SPLIT_TYPE, ERR_INVALID_WALLET, ERR_MIGRATION_ASSET_COUNT_MISMATCH, ERR_OVER_ALLOCATION, ERR_PERCENTAGE_EXCEEDS_100, ERR_PERCENTAGE_MUST_BE_NOT_BE_100_WITH_REMAINDER, ERR_RECEIVE_ESCROW_ALREADY_EXISTS, ERR_RECEIVE_ESCROW_DOES_NOT_EXIST, ERR_RECEIVER_ESCROW_DOES_NOT_EXIST, ERR_REMAINDER_MUST_BE_LAST, ERR_REMAINDER_VALUE_MUST_BE_ZERO, ERR_SPLIT_REF_NOT_FOUND, ERR_SPLIT_VALUE_MUST_BE_POSITIVE_OR_REMAINDER, ERR_SPLITS_CANNOT_BE_EMPTY, ERR_SPLITS_CANNOT_BE_MORE_THAN_10, ERR_SPLITS_MUST_TOTAL_100_OR_HAVE_REMAINDER, ERR_SPLITS_OR_REF_REQUIRED, ERR_TOO_MANY_ASSETS } from "./errors";
import { EscrowAssetKey, EscrowDisbursementPhaseAllocation, EscrowDisbursementPhaseFinalization, EscrowDisbursementPhaseIdle, ManagedAssetKey, ReceiveEscrow, Split, SplitDistributionTypeFlat, SplitDistributionTypePercentage, SplitDistributionTypeRemainder, SplitRef, WalletEscrowKey } from "./types";

// CONTRACT IMPORTS
import { AkitaBaseContract } from "../../../utils/base-contracts/base";
import type { AbstractedAccount } from "../../account/contract.algo";

/**
 * high level overview of how revenue manager works:
 * 
 * 1. DAO installs it twice:  
 *  - once with execution key that can do anything
 *  - once globally with methods restricted to: optin, startEscrowDisbursement, processEscrowAllocation
 * 2. DAO proposes 'new escrow'
 * 2. DAO proposes 'execute plugin' -> revenue-manager:newReceiveEscrow
 * 
*/

export class RevenueManagerPlugin extends AkitaBaseContract {
  /** box map of all the escrows */
  escrows = BoxMap<WalletEscrowKey, ReceiveEscrow>({ keyPrefix: RevenueManagerBoxPrefixEscrows })
  /** box map of escrow assets that have already been processed during this allocation */
  receiveAssets = BoxMap<EscrowAssetKey, bytes<0>>({ keyPrefix: RevenueManagerBoxPrefixReceiveAssets })
  /** permanent identity set for ASAs opted in through this receive escrow */
  managedAssets = BoxMap<ManagedAssetKey, bytes<0>>({ keyPrefix: RevenueManagerBoxPrefixManagedAssets })
  /** how to split revenue & where to send it */
  splits = BoxMap<WalletEscrowKey, Split[]>({ keyPrefix: RevenueManagerBoxPrefixSplits })
  /** references to splits stored in other contracts (alternative to direct splits) */
  splitRefs = BoxMap<WalletEscrowKey, SplitRef>({ keyPrefix: RevenueManagerBoxPrefixSplitRefs })

  private controls(sender: Account): boolean {
    return sender.authAddress === Global.currentApplicationAddress
  }

  private validateEscrowName(escrow: string): void {
    loggedAssert(escrow !== '', ERR_ESCROW_DOES_NOT_EXIST)
    loggedAssert(Bytes(escrow).length <= RevenueManagerEscrowNameMaxBytes, ERR_ESCROW_NAME_TOO_LONG)
  }

  /**
   * Bind every caller/receiver app ID to an ARC58 wallet created by the
   * configured DAO's wallet factory. Merely exposing lookalike global state is
   * insufficient: the wallet must also have been created by that factory app.
   */
  private validateWallet(wallet: Application): void {
    const walletFactory = Application(getAkitaAppList(this.akitaDAO.value).wallet)
    const [akitaDAO, hasAkitaDAO] = op.AppGlobal.getExUint64(wallet, Bytes(GlobalStateKeyAkitaDAO))
    const [factoryApp, hasFactoryApp] = op.AppGlobal.getExUint64(wallet, Bytes(AbstractAccountGlobalStateKeysFactoryApp))

    loggedAssert(
      hasAkitaDAO &&
      akitaDAO === this.akitaDAO.value.id &&
      hasFactoryApp &&
      factoryApp === walletFactory.id &&
      wallet.creator === walletFactory.address,
      ERR_INVALID_WALLET
    )
  }

  private namedEscrowAddress(wallet: Application, escrow: string): Account {
    const escrowInfo = abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
      appId: wallet,
      args: [[escrow]]
    }).returnValue[0]

    loggedAssert(escrowInfo.address !== Global.zeroAddress, ERR_ESCROW_DOES_NOT_EXIST)
    return escrowInfo.address
  }

  private splitReceiverAddress(receiver: { wallet: Application, escrow: string }): Account {
    this.validateWallet(receiver.wallet)
    if (receiver.escrow === '') {
      return getOriginAccount(receiver.wallet)
    }

    const escrowInfo = abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
      appId: receiver.wallet,
      args: [[receiver.escrow]]
    }).returnValue[0]
    loggedAssert(escrowInfo.address !== Global.zeroAddress, ERR_RECEIVER_ESCROW_DOES_NOT_EXIST)
    return escrowInfo.address
  }

  private referencedSplits(splitRef: SplitRef): Split[] {
    const { app, key } = clone(splitRef)
    loggedAssert(app !== 0 && Bytes(key).length > 0, ERR_INVALID_SPLIT_REF)

    const [refSplitsBytes, exists] = op.AppGlobal.getExBytes(Application(app), Bytes(key))
    loggedAssert(exists, ERR_SPLIT_REF_NOT_FOUND)
    return decodeArc4<Split[]>(refSplitsBytes)
  }

  /**
   * Resolves splits for an escrow - either from direct storage or from a referenced contract
   * @returns The Split[] to use for distribution
   */
  private resolveSplits(wallet: Application, escrow: string): Split[] {
    const key: WalletEscrowKey = { wallet, escrow }

    // Check for direct splits first
    if (this.splits(key).exists) {
      return clone(this.splits(key).value)
    }

    // Fall back to referenced splits
    loggedAssert(this.splitRefs(key).exists, ERR_SPLITS_OR_REF_REQUIRED)
    return this.referencedSplits(this.splitRefs(key).value)
  }

  /**
   * Validates a splits configuration
   */
  private validateSplits(splits: Split[]): void {
    let totalPercentage: uint64 = 0
    let hasRemainder: boolean = false
    let hasFlat: boolean = false

    for (let i: uint64 = 0; i < splits.length; i++) {
      const { type, value } = clone(splits[i])
      const isLast = i === splits.length - 1

      loggedAssert(
        type === SplitDistributionTypePercentage ||
        type === SplitDistributionTypeFlat ||
        type === SplitDistributionTypeRemainder,
        ERR_INVALID_SPLIT_TYPE
      )

      // Resolve at configuration time as well as allocation time so malformed
      // wallet/app IDs and missing named escrows cannot silently burn revenue.
      this.splitReceiverAddress(splits[i].receiver)

      // Ensure value is positive (except for remainder which uses 0)
      loggedAssert(
        value > 0 || type === SplitDistributionTypeRemainder,
        ERR_SPLIT_VALUE_MUST_BE_POSITIVE_OR_REMAINDER
      )

      switch (type) {
        case SplitDistributionTypePercentage:
          totalPercentage += value
          break
        case SplitDistributionTypeFlat:
          hasFlat = true
          break
        case SplitDistributionTypeRemainder:
          // Remainder must be last
          loggedAssert(isLast, ERR_REMAINDER_MUST_BE_LAST)
          loggedAssert(value === 0, ERR_REMAINDER_VALUE_MUST_BE_ZERO)
          hasRemainder = true
          break
      }
    }

    // ensure total percentage doesn't exceed 100%
    loggedAssert(totalPercentage <= DIVISOR, ERR_PERCENTAGE_EXCEEDS_100)
    // ensure total percentage doesn't meet 100% when using a remainder
    loggedAssert(totalPercentage !== DIVISOR || !hasRemainder, ERR_PERCENTAGE_MUST_BE_NOT_BE_100_WITH_REMAINDER)
    // A flat allocation cannot know the balance in advance, so it always needs
    // a trailing remainder to avoid leaving untracked dust in the escrow.
    loggedAssert(!hasFlat || hasRemainder, ERR_FLAT_WITH_PERCENTAGE_REQUIRES_REMAINDER)
    // Without a remainder, percentages must consume the full balance.
    loggedAssert(hasRemainder || totalPercentage === DIVISOR, ERR_SPLITS_MUST_TOTAL_100_OR_HAVE_REMAINDER)
  }

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
  }

  /**
   * optin exists because revenue manager uses additional metadata to track optin counts for processing payments
   * revenue escrows must be locked to avoid mistracking optins to ensure all opted in assets get processed
  */
  optIn(wallet: Application, rekeyBack: boolean, assets: uint64[], mbrPayment: gtxn.PaymentTxn): void {
    this.validateWallet(wallet)
    const escrow = getEscrow(wallet)
    this.validateEscrowName(escrow)
    const sender = getSpendingAccount(wallet)
    loggedAssert(this.controls(sender), ERR_FORBIDDEN)
    loggedAssert(assets.length > 0, ERR_ASSET_LIST_CANNOT_BE_EMPTY)

    loggedAssert(mbrPayment.receiver === sender, ERR_INVALID_PAYMENT)
    loggedAssert(mbrPayment.amount >= Global.assetOptInMinBalance * assets.length, ERR_INVALID_PAYMENT)

    const escrowKey: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(escrowKey).exists, ERR_RECEIVE_ESCROW_DOES_NOT_EXIST)

    const { source, optinAllowed, phase } = this.escrows(escrowKey).value
    const initiator = gtxn.Transaction(getRekeyIndex(wallet)).sender
    const isChild = Global.callerApplicationId !== 0 && Application(Global.callerApplicationId).creator === source
    loggedAssert(source === initiator || isChild, ERR_FORBIDDEN)
    loggedAssert(optinAllowed, ERR_ESCROW_NOT_ALLOWED_TO_OPTIN)
    loggedAssert(phase === EscrowDisbursementPhaseIdle, ERR_ESCROW_NOT_IDLE)

    for (let i: uint64 = 0; i < assets.length; i++) {
      const asset = assets[i]
      const assetKey: ManagedAssetKey = { wallet, escrow, asset }
      loggedAssert(asset !== 0, ERR_INVALID_ASSET)
      loggedAssert(!this.managedAssets(assetKey).exists, ERR_ASSET_ALREADY_REGISTERED)
      loggedAssert(!sender.isOptedIn(Asset(asset)), ERR_ALREADY_OPTED_IN)

      itxn
        .assetTransfer({
          sender,
          assetReceiver: sender,
          assetAmount: 0,
          xferAsset: Asset(asset),
          rekeyTo: rekeyAddress(rekeyBack && (i === (assets.length - 1)), wallet)
        })
        .submit();

      this.managedAssets(assetKey).create()
    }

    this.escrows(escrowKey).value.optinCount += assets.length
  }

  /**
   * Creates a new receive escrow with direct splits
   * Use this when you want to store splits directly in this contract
   */
  newReceiveEscrow(
    wallet: Application,
    rekeyBack: boolean,
    escrow: string,
    source: Account,
    allocatable: boolean,
    optinAllowed: boolean,
    splits: Split[]
  ): void {
    this.validateWallet(wallet)
    const sender = getSpendingAccount(wallet)
    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.controls(sender), ERR_FORBIDDEN)
    this.validateEscrowName(escrow)
    this.namedEscrowAddress(wallet, escrow)
    loggedAssert(!this.escrows(key).exists, ERR_RECEIVE_ESCROW_ALREADY_EXISTS)
    loggedAssert(splits.length > 0, ERR_SPLITS_CANNOT_BE_EMPTY)
    loggedAssert(splits.length <= 10, ERR_SPLITS_CANNOT_BE_MORE_THAN_10)

    // Validate before writing either box. The call remains atomic, but this
    // order also makes the intended no-partial-configuration invariant clear.
    this.validateSplits(splits)

    this.escrows(key).value = {
      source,
      allocatable,
      optinAllowed,
      optinCount: 0,
      phase: EscrowDisbursementPhaseIdle,
      allocationCounter: 0,
      lastDisbursement: 0,
      creationDate: Global.latestTimestamp,
    }

    this.splits(key).value = clone(splits)

    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  /**
   * Creates a new receive escrow with a reference to splits stored in another contract
   * Use this when you want splits to be dynamically read from another contract's global state
   */
  newReceiveEscrowWithRef(
    wallet: Application,
    rekeyBack: boolean,
    escrow: string,
    source: Account,
    allocatable: boolean,
    optinAllowed: boolean,
    splitRef: SplitRef
  ): void {
    this.validateWallet(wallet)
    const sender = getSpendingAccount(wallet)
    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.controls(sender), ERR_FORBIDDEN)
    this.validateEscrowName(escrow)
    this.namedEscrowAddress(wallet, escrow)
    loggedAssert(!this.escrows(key).exists, ERR_RECEIVE_ESCROW_ALREADY_EXISTS)

    const referencedSplits = this.referencedSplits(splitRef)
    loggedAssert(referencedSplits.length > 0, ERR_SPLITS_CANNOT_BE_EMPTY)
    loggedAssert(referencedSplits.length <= 10, ERR_SPLITS_CANNOT_BE_MORE_THAN_10)
    this.validateSplits(referencedSplits)

    this.escrows(key).value = {
      source,
      allocatable,
      optinAllowed,
      optinCount: 0,
      phase: EscrowDisbursementPhaseIdle,
      allocationCounter: 0,
      lastDisbursement: 0,
      creationDate: Global.latestTimestamp,
    }

    // The reference is re-resolved and revalidated during every allocation,
    // because its source state remains intentionally dynamic.
    this.splitRefs(key).value = clone(splitRef)

    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  /**
   * Imports an idle receive escrow without resetting its historical metadata.
   * Exactly one configuration form must be selected by useSplitRef.
   */
  migrateReceiveEscrow(
    wallet: Application,
    rekeyBack: boolean,
    escrow: string,
    receiveEscrow: ReceiveEscrow,
    assets: uint64[],
    splits: Split[],
    splitRef: SplitRef,
    useSplitRef: boolean
  ): void {
    this.validateWallet(wallet)
    const sender = getSpendingAccount(wallet)
    const key: WalletEscrowKey = { wallet, escrow }

    loggedAssert(this.controls(sender), ERR_FORBIDDEN)
    this.validateEscrowName(escrow)
    loggedAssert(!this.escrows(key).exists, ERR_RECEIVE_ESCROW_ALREADY_EXISTS)
    const escrowAddress = this.namedEscrowAddress(wallet, escrow)

    // In-progress migrations would also need to import receiveAssets boxes.
    const { phase, allocationCounter, optinCount, creationDate, lastDisbursement } = clone(receiveEscrow)
    loggedAssert(
      phase === EscrowDisbursementPhaseIdle && allocationCounter === 0,
      ERR_ESCROW_NOT_IDLE
    )
    loggedAssert(
      creationDate > 0 &&
      creationDate <= Global.latestTimestamp &&
      lastDisbursement <= Global.latestTimestamp,
      ERR_INVALID_MIGRATION_METADATA
    )
    loggedAssert(optinCount === assets.length, ERR_MIGRATION_ASSET_COUNT_MISMATCH)

    if (useSplitRef) {
      loggedAssert(splits.length === 0, ERR_SPLITS_OR_REF_REQUIRED)
      const referencedSplits = this.referencedSplits(splitRef)
      loggedAssert(referencedSplits.length > 0, ERR_SPLITS_CANNOT_BE_EMPTY)
      loggedAssert(referencedSplits.length <= 10, ERR_SPLITS_CANNOT_BE_MORE_THAN_10)
      this.validateSplits(referencedSplits)
      this.splitRefs(key).value = clone(splitRef)
    } else {
      loggedAssert(splitRef.app === 0 && Bytes(splitRef.key).length === 0, ERR_SPLITS_OR_REF_REQUIRED)
      loggedAssert(splits.length > 0, ERR_SPLITS_CANNOT_BE_EMPTY)
      loggedAssert(splits.length <= 10, ERR_SPLITS_CANNOT_BE_MORE_THAN_10)
      this.validateSplits(splits)
      this.splits(key).value = clone(splits)
    }

    for (let i: uint64 = 0; i < assets.length; i++) {
      const asset = assets[i]
      const assetKey: ManagedAssetKey = { wallet, escrow, asset }
      loggedAssert(asset !== 0, ERR_INVALID_ASSET)
      loggedAssert(!this.managedAssets(assetKey).exists, ERR_ASSET_ALREADY_REGISTERED)
      loggedAssert(escrowAddress.isOptedIn(Asset(asset)), ERR_INVALID_ASSET)
      this.managedAssets(assetKey).create()
    }

    this.escrows(key).value = clone(receiveEscrow)
    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  startEscrowDisbursement(wallet: Application, rekeyBack: boolean): void {
    this.validateWallet(wallet)
    const escrow = getEscrow(wallet)
    this.validateEscrowName(escrow)
    const escrowAddress = this.namedEscrowAddress(wallet, escrow)
    const sender = getSpendingAccount(wallet)
    loggedAssert(this.controls(sender), ERR_FORBIDDEN)
    loggedAssert(sender === escrowAddress, ERR_CONTROLLED_ADDRESS_MUST_BE_ESCROW)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, ERR_RECEIVE_ESCROW_DOES_NOT_EXIST)
    // validate the time window of the last escrow payout
    const { phase, allocatable, allocationCounter, lastDisbursement, creationDate } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseIdle, ERR_ESCROW_NOT_IDLE)
    loggedAssert(allocationCounter === 0, ERR_ESCROW_NOT_IDLE)
    loggedAssert(allocatable, ERR_ESCROW_NOT_ALLOCATABLE)

    const latestWindow: uint64 = Global.latestTimestamp - ((Global.latestTimestamp - creationDate) % ONE_DAY)
    loggedAssert(latestWindow > lastDisbursement, ERR_ESCROW_NOT_READY_FOR_DISBURSEMENT)

    this.escrows(key).value.phase = EscrowDisbursementPhaseAllocation
    this.escrows(key).value.lastDisbursement = latestWindow

    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  processEscrowAllocation(wallet: Application, rekeyBack: boolean, ids: uint64[]): void {
    this.validateWallet(wallet)
    const escrow = getEscrow(wallet)
    this.validateEscrowName(escrow)
    const escrowAddress = this.namedEscrowAddress(wallet, escrow)
    const sender = getSpendingAccount(wallet)
    loggedAssert(this.controls(sender), ERR_FORBIDDEN)
    loggedAssert(sender === escrowAddress, ERR_CONTROLLED_ADDRESS_MUST_BE_ESCROW)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, ERR_RECEIVE_ESCROW_DOES_NOT_EXIST)
    const { phase, optinCount, allocationCounter } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseAllocation, ERR_ESCROW_NOT_IN_ALLOCATION_PHASE)
    loggedAssert(ids.length > 0, ERR_ASSET_LIST_CANNOT_BE_EMPTY)
    const totalAssetsToProcess: uint64 = optinCount + 1 // + 1 to include algo
    loggedAssert(allocationCounter + ids.length <= totalAssetsToProcess, ERR_TOO_MANY_ASSETS)

    // Resolve splits (either from direct storage or from referenced contract)
    const splits = this.resolveSplits(wallet, escrow)

    // Runtime validation of splits (required since referenced values can change)
    loggedAssert(splits.length > 0, ERR_SPLITS_CANNOT_BE_EMPTY)
    loggedAssert(splits.length <= 10, ERR_SPLITS_CANNOT_BE_MORE_THAN_10)
    this.validateSplits(splits)

    // Process each asset
    for (let i: uint64 = 0; i < ids.length; i += 1) {
      const asset = ids[i]
      loggedAssert(!this.receiveAssets({ escrow: escrowAddress, asset }).exists, ERR_ASSET_ALREADY_ALLOCATED)

      let balance: uint64 = 0
      let optedIn: boolean = false;
      if (asset === 0) {
        balance = op.balance(sender) - sender.minBalance
      } else {
        const assetKey: ManagedAssetKey = { wallet, escrow, asset }
        loggedAssert(this.managedAssets(assetKey).exists, ERR_ASSET_NOT_REGISTERED);
        ([balance, optedIn] = AssetHolding.assetBalance(sender, asset));
        loggedAssert(optedIn, ERR_INVALID_ASSET)
      }

      let remaining: uint64 = balance
      for (let j: uint64 = 0; j < splits.length; j++) {
        const { type, receiver, value } = clone(splits[j])

        let amount: uint64 = 0
        switch (type) {
          case SplitDistributionTypeFlat:
            amount = value
            break
          case SplitDistributionTypePercentage:
            // With percentage-only 100% splits, assign the final receiver the
            // exact remainder so integer division cannot strand rounding dust.
            amount = j === splits.length - 1 ? remaining : calcPercent(balance, value)
            break
          case SplitDistributionTypeRemainder:
            // Remainder gets whatever is left
            amount = remaining
            break
        }

        loggedAssert(amount <= remaining, ERR_OVER_ALLOCATION)
        remaining -= amount

        // Avoid zero-value inner transfers and unnecessary recipient opt-ins.
        if (amount === 0) {
          continue
        }

        const receiverAddress = this.splitReceiverAddress(receiver)

        // ALGO never requires an asset opt-in; ASA receivers are opted in on demand.
        if (asset !== 0 && !receiverAddress.isOptedIn(Asset(asset))) {
          arc58OptInAndSend(this.akitaDAO.value, receiver.wallet, receiver.escrow, [asset], [0])
        }

        if (asset === 0) {
          itxn
            .payment({
              sender,
              receiver: receiverAddress,
              amount
            })
            .submit()
        } else {
          itxn
            .assetTransfer({
              sender,
              assetReceiver: receiverAddress,
              assetAmount: amount,
              xferAsset: asset
            })
            .submit()
        }
      }

      this.receiveAssets({ escrow: escrowAddress, asset }).create()
    }

    this.escrows(key).value.allocationCounter += ids.length
    if ((allocationCounter + ids.length) === totalAssetsToProcess) {
      this.escrows(key).value.phase = EscrowDisbursementPhaseFinalization
    }

    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  /**
   * Cleans up processed asset boxes and resets escrow back to idle state
   * Must be called after all assets have been processed (escrow in Finalization phase)
   * Can be called in batches - pass the asset IDs that were processed to delete their tracking boxes
  */
  finalizeEscrowDisbursement(wallet: Application, rekeyBack: boolean, ids: uint64[]): void {
    this.validateWallet(wallet)
    const escrow = getEscrow(wallet)
    this.validateEscrowName(escrow)
    const escrowAddress = this.namedEscrowAddress(wallet, escrow)
    const sender = getSpendingAccount(wallet)
    loggedAssert(this.controls(sender), ERR_FORBIDDEN)
    loggedAssert(sender === escrowAddress, ERR_CONTROLLED_ADDRESS_MUST_BE_ESCROW)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, ERR_RECEIVE_ESCROW_DOES_NOT_EXIST)
    const { phase, allocationCounter } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseFinalization, ERR_ESCROW_NOT_IN_FINALIZATION_PHASE)
    loggedAssert(ids.length > 0, ERR_ASSET_LIST_CANNOT_BE_EMPTY)
    loggedAssert(ids.length <= allocationCounter, ERR_TOO_MANY_ASSETS)

    // Delete the tracking boxes for processed assets
    for (let i: uint64 = 0; i < ids.length; i++) {
      const asset = ids[i]
      loggedAssert(this.receiveAssets({ escrow: escrowAddress, asset }).exists, ERR_ASSET_NOT_ALLOCATED)
      this.receiveAssets({ escrow: escrowAddress, asset }).delete()
    }

    // Decrement the allocation counter
    this.escrows(key).value.allocationCounter -= ids.length

    // If all boxes have been cleaned up, reset to idle
    if ((allocationCounter - ids.length) === 0) {
      this.escrows(key).value.phase = EscrowDisbursementPhaseIdle
    }

    rekeyBackIfNecessary(rekeyBack, wallet)
  }
}
