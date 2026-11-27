import { Account, Application, Asset, BoxMap, Bytes, bytes, clone, Global, gtxn, itxn, loggedAssert, op, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, abimethod, decodeArc4 } from "@algorandfoundation/algorand-typescript/arc4";
import { AssetHolding } from "@algorandfoundation/algorand-typescript/op";
import { ONE_DAY } from "../../../social/constants";
import { DIVISOR } from "../../../utils/constants";
import { getOriginAccount, getSpendingAccount, rekeyAddress, rekeyBackIfNecessary } from "@akita-protocol/plugin/functions";
import { calcPercent, getAkitaAppList, getEscrow, getRekeyIndex } from "../../../utils/functions";
import { GlobalStateKeyAkitaDAO } from "../../../constants";
import { AbstractAccountGlobalStateKeysFactoryApp } from "../../account/constants";
import { errEscrowDoesNotExist, errForbidden } from "../../account/errors";
import { RevenueManagerBoxPrefixEscrows, RevenueManagerBoxPrefixManagedAssets, RevenueManagerBoxPrefixReceiveAssets, RevenueManagerBoxPrefixSplitRefs, RevenueManagerBoxPrefixSplits, RevenueManagerEscrowNameMaxBytes } from "./constants";
import { errAlreadyOptedIn, errAssetAlreadyAllocated, errAssetAlreadyRegistered, errAssetListCannotBeEmpty, errAssetNotAllocated, errAssetNotRegistered, errControlledAddressMustBeEscrow, errEscrowNameTooLong, errEscrowNotAllocatable, errEscrowNotAllowedToOptin, errEscrowNotIdle, errEscrowNotInAllocationPhase, errEscrowNotInFinalizationPhase, errEscrowNotReadyForDisbursement, errFlatWithPercentageRequiresRemainder, errInvalidAsset, errInvalidMigrationMetadata, errInvalidPayment, errInvalidSplitRef, errInvalidSplitType, errInvalidWallet, errMigrationAssetCountMismatch, errOverAllocation, errPercentageExceeds100, errPercentageMustBeNotBe100WithRemainder, errReceiveEscrowAlreadyExists, errReceiveEscrowDoesNotExist, errReceiverEscrowDoesNotExist, errRemainderMustBeLast, errRemainderValueMustBeZero, errSplitRefNotFound, errSplitValueMustBePositiveOrRemainder, errSplitsCannotBeEmpty, errSplitsCannotBeMoreThan10, errSplitsMustTotal100OrHaveRemainder, errSplitsOrRefRequired, errTooManyAssets } from "./errors";
import { EscrowAssetKey, EscrowDisbursementPhaseAllocation, EscrowDisbursementPhaseFinalization, EscrowDisbursementPhaseIdle, ManagedAssetKey, ReceiveEscrow, Split, SplitDistributionTypeFlat, SplitDistributionTypePercentage, SplitDistributionTypeRemainder, SplitRef, WalletEscrowKey } from "./types";

// CONTRACT IMPORTS
import { AkitaBaseContract } from "../../../utils/base-contracts/upgradeable";
import type { AbstractedAccount } from "../../account/contract.algo";

/**
 * high level overview of how revenue manager works:
 * 
 * 1. DAO installs it twice:
 *  - once with execution key that can do anything (main account; the only path for
 *    newReceiveEscrow*, migrateReceiveEscrow, updateSplits and skipEscrowAllocation)
 *  - once globally per receive escrow with methods restricted to (in this order):
 *    optIn, startEscrowDisbursement, processEscrowAllocation, finalizeEscrowDisbursement
 *    (base.ts relies on optIn being method offset 0)
 * Receive-escrow configuration is DAO-wallet only.
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
    loggedAssert(escrow !== '', errEscrowDoesNotExist)
    loggedAssert(Bytes(escrow).length <= RevenueManagerEscrowNameMaxBytes, errEscrowNameTooLong)
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
      errInvalidWallet
    )
  }

  /**
   * Receive-escrow configuration is reserved for the DAO's ARC58 wallet. Every
   * persistent box this plugin creates is funded from the plugin's own account,
   * so letting arbitrary factory wallets configure escrows would let anyone lock
   * or drain that balance and halt DAO revenue disbursement.
   */
  private requireDaoWallet(wallet: Application): void {
    loggedAssert(wallet === this.getAkitaDAOWallet(), errForbidden)
  }

  private namedEscrowAddress(wallet: Application, escrow: string): Account {
    const escrowInfo = abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
      appId: wallet,
      args: [[escrow]]
    }).returnValue[0]

    loggedAssert(escrowInfo.address !== Global.zeroAddress, errEscrowDoesNotExist)
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
    loggedAssert(escrowInfo.address !== Global.zeroAddress, errReceiverEscrowDoesNotExist)
    return escrowInfo.address
  }

  private referencedSplits(splitRef: SplitRef): Split[] {
    const { app, key } = clone(splitRef)
    loggedAssert(app !== 0 && Bytes(key).length > 0, errInvalidSplitRef)

    const [refSplitsBytes, exists] = op.AppGlobal.getExBytes(Application(app), Bytes(key))
    loggedAssert(exists, errSplitRefNotFound)
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
    loggedAssert(this.splitRefs(key).exists, errSplitsOrRefRequired)
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
        errInvalidSplitType
      )

      // Resolve at configuration time as well as allocation time so malformed
      // wallet/app IDs and missing named escrows cannot silently burn revenue.
      this.splitReceiverAddress(splits[i].receiver)

      // Ensure value is positive (except for remainder which uses 0)
      loggedAssert(
        value > 0 || type === SplitDistributionTypeRemainder,
        errSplitValueMustBePositiveOrRemainder
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
          loggedAssert(isLast, errRemainderMustBeLast)
          loggedAssert(value === 0, errRemainderValueMustBeZero)
          hasRemainder = true
          break
      }
    }

    // ensure total percentage doesn't exceed 100%
    loggedAssert(totalPercentage <= DIVISOR, errPercentageExceeds100)
    // ensure total percentage doesn't meet 100% when using a remainder
    loggedAssert(totalPercentage !== DIVISOR || !hasRemainder, errPercentageMustBeNotBe100WithRemainder)
    // A flat allocation cannot know the balance in advance, so it always needs
    // a trailing remainder to avoid leaving untracked dust in the escrow.
    loggedAssert(!hasFlat || hasRemainder, errFlatWithPercentageRequiresRemainder)
    // Without a remainder, percentages must consume the full balance.
    loggedAssert(hasRemainder || totalPercentage === DIVISOR, errSplitsMustTotal100OrHaveRemainder)
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
    loggedAssert(this.controls(sender), errForbidden)
    loggedAssert(assets.length > 0, errAssetListCannotBeEmpty)

    loggedAssert(mbrPayment.receiver === sender, errInvalidPayment)
    loggedAssert(mbrPayment.amount >= Global.assetOptInMinBalance * assets.length, errInvalidPayment)

    const escrowKey: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(escrowKey).exists, errReceiveEscrowDoesNotExist)

    const { source, optinAllowed, phase } = this.escrows(escrowKey).value
    const initiator = gtxn.Transaction(getRekeyIndex(wallet)).sender
    const isChild = Global.callerApplicationId !== 0 && Application(Global.callerApplicationId).creator === source
    loggedAssert(source === initiator || isChild, errForbidden)
    loggedAssert(optinAllowed, errEscrowNotAllowedToOptin)
    loggedAssert(phase === EscrowDisbursementPhaseIdle, errEscrowNotIdle)

    for (let i: uint64 = 0; i < assets.length; i++) {
      const asset = assets[i]
      const assetKey: ManagedAssetKey = { wallet, escrow, asset }
      loggedAssert(asset !== 0, errInvalidAsset)
      loggedAssert(!this.managedAssets(assetKey).exists, errAssetAlreadyRegistered)
      loggedAssert(!sender.isOptedIn(Asset(asset)), errAlreadyOptedIn)

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
    this.requireDaoWallet(wallet)
    const sender = getSpendingAccount(wallet)
    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.controls(sender), errForbidden)
    this.validateEscrowName(escrow)
    this.namedEscrowAddress(wallet, escrow)
    loggedAssert(!this.escrows(key).exists, errReceiveEscrowAlreadyExists)
    loggedAssert(splits.length > 0, errSplitsCannotBeEmpty)
    loggedAssert(splits.length <= 10, errSplitsCannotBeMoreThan10)

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
    this.requireDaoWallet(wallet)
    const sender = getSpendingAccount(wallet)
    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.controls(sender), errForbidden)
    this.validateEscrowName(escrow)
    this.namedEscrowAddress(wallet, escrow)
    loggedAssert(!this.escrows(key).exists, errReceiveEscrowAlreadyExists)

    const referencedSplits = this.referencedSplits(splitRef)
    loggedAssert(referencedSplits.length > 0, errSplitsCannotBeEmpty)
    loggedAssert(referencedSplits.length <= 10, errSplitsCannotBeMoreThan10)
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
    this.requireDaoWallet(wallet)
    const sender = getSpendingAccount(wallet)
    const key: WalletEscrowKey = { wallet, escrow }

    loggedAssert(this.controls(sender), errForbidden)
    this.validateEscrowName(escrow)
    loggedAssert(!this.escrows(key).exists, errReceiveEscrowAlreadyExists)
    const escrowAddress = this.namedEscrowAddress(wallet, escrow)

    // In-progress migrations would also need to import receiveAssets boxes.
    const { phase, allocationCounter, optinCount, creationDate, lastDisbursement } = clone(receiveEscrow)
    loggedAssert(
      phase === EscrowDisbursementPhaseIdle && allocationCounter === 0,
      errEscrowNotIdle
    )
    loggedAssert(
      creationDate > 0 &&
      creationDate <= Global.latestTimestamp &&
      lastDisbursement <= Global.latestTimestamp,
      errInvalidMigrationMetadata
    )
    loggedAssert(optinCount === assets.length, errMigrationAssetCountMismatch)

    if (useSplitRef) {
      loggedAssert(splits.length === 0, errSplitsOrRefRequired)
      const referencedSplits = this.referencedSplits(splitRef)
      loggedAssert(referencedSplits.length > 0, errSplitsCannotBeEmpty)
      loggedAssert(referencedSplits.length <= 10, errSplitsCannotBeMoreThan10)
      this.validateSplits(referencedSplits)
      this.splitRefs(key).value = clone(splitRef)
    } else {
      loggedAssert(splitRef.app === 0 && Bytes(splitRef.key).length === 0, errSplitsOrRefRequired)
      loggedAssert(splits.length > 0, errSplitsCannotBeEmpty)
      loggedAssert(splits.length <= 10, errSplitsCannotBeMoreThan10)
      this.validateSplits(splits)
      this.splits(key).value = clone(splits)
    }

    for (let i: uint64 = 0; i < assets.length; i++) {
      const asset = assets[i]
      const assetKey: ManagedAssetKey = { wallet, escrow, asset }
      loggedAssert(asset !== 0, errInvalidAsset)
      loggedAssert(!this.managedAssets(assetKey).exists, errAssetAlreadyRegistered)
      loggedAssert(escrowAddress.isOptedIn(Asset(asset)), errInvalidAsset)
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
    loggedAssert(this.controls(sender), errForbidden)
    loggedAssert(sender === escrowAddress, errControlledAddressMustBeEscrow)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
    // validate the time window of the last escrow payout
    const { phase, allocatable, allocationCounter, lastDisbursement, creationDate } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseIdle, errEscrowNotIdle)
    loggedAssert(allocationCounter === 0, errEscrowNotIdle)
    loggedAssert(allocatable, errEscrowNotAllocatable)

    const latestWindow: uint64 = Global.latestTimestamp - ((Global.latestTimestamp - creationDate) % ONE_DAY)
    loggedAssert(latestWindow > lastDisbursement, errEscrowNotReadyForDisbursement)

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
    loggedAssert(this.controls(sender), errForbidden)
    loggedAssert(sender === escrowAddress, errControlledAddressMustBeEscrow)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
    const { phase, optinCount, allocationCounter } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseAllocation, errEscrowNotInAllocationPhase)
    loggedAssert(ids.length > 0, errAssetListCannotBeEmpty)
    const totalAssetsToProcess: uint64 = optinCount + 1 // + 1 to include algo
    loggedAssert(allocationCounter + ids.length <= totalAssetsToProcess, errTooManyAssets)

    // Resolve splits (either from direct storage or from referenced contract)
    const splits = this.resolveSplits(wallet, escrow)

    // Runtime validation of splits (required since referenced values can change)
    loggedAssert(splits.length > 0, errSplitsCannotBeEmpty)
    loggedAssert(splits.length <= 10, errSplitsCannotBeMoreThan10)
    this.validateSplits(splits)

    // Process each asset
    for (let i: uint64 = 0; i < ids.length; i += 1) {
      const asset = ids[i]
      loggedAssert(!this.receiveAssets({ escrow: escrowAddress, asset }).exists, errAssetAlreadyAllocated)

      let balance: uint64 = 0
      let optedIn: boolean = false;
      let frozen: boolean = false
      if (asset === 0) {
        balance = op.balance(sender) - sender.minBalance
      } else {
        const assetKey: ManagedAssetKey = { wallet, escrow, asset }
        loggedAssert(this.managedAssets(assetKey).exists, errAssetNotRegistered);
        ([balance, optedIn] = AssetHolding.assetBalance(sender, asset));
        loggedAssert(optedIn, errInvalidAsset);
        // A frozen holding cannot be sent. It stays in the escrow and the asset still counts as
        // processed, so whoever holds an asset's freeze role cannot stop the cycle.
        ([frozen] = AssetHolding.assetFrozen(sender, asset))
      }

      let remaining: uint64 = balance
      for (let j: uint64 = 0; j < splits.length; j++) {
        const { type, receiver, value } = clone(splits[j])

        let amount: uint64 = 0
        switch (type) {
          case SplitDistributionTypeFlat:
            // DAO-06: a flat share takes what is there. An asset with less than the flat amount
            // (an NFT, or a holding of 0) must not stop the cycle.
            amount = value < remaining ? value : remaining
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

        loggedAssert(amount <= remaining, errOverAllocation)
        remaining -= amount

        // Avoid zero-value inner transfers and unnecessary recipient opt-ins.
        if (amount === 0) {
          continue
        }

        const receiverAddress = this.splitReceiverAddress(receiver)

        // ALGO never requires an asset opt-in. An ASA share for a receiver that
        // is not opted in is left in the escrow and rolls into the next cycle:
        // the plugin never pays receiver opt-in MBR, and one receiver can no
        // longer revert (and so freeze) the whole disbursement cycle.
        if (asset !== 0 && (frozen || !receiverAddress.isOptedIn(Asset(asset)) || AssetHolding.assetFrozen(receiverAddress, asset)[0])) {
          continue
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
   * Governance-only check: the call must come through a grant on the DAO
   * wallet's main account (the execution-key grant), never through a
   * receive-escrow grant, whose spending account is the escrow itself.
   */
  private requireDaoMainAccount(wallet: Application): void {
    this.requireDaoWallet(wallet)
    const sender = getSpendingAccount(wallet)
    loggedAssert(this.controls(sender), errForbidden)
    loggedAssert(sender === getOriginAccount(wallet), errForbidden)
  }

  /**
   * Escape hatch for a stuck allocation phase: marks assets of `escrow` as
   * handled for this cycle without transferring anything, so their balances
   * roll over to the next cycle. Only callable through the DAO wallet's
   * main-account (execution-key) grant.
   */
  skipEscrowAllocation(wallet: Application, rekeyBack: boolean, escrow: string, ids: uint64[]): void {
    this.validateWallet(wallet)
    this.requireDaoMainAccount(wallet)
    this.validateEscrowName(escrow)
    const escrowAddress = this.namedEscrowAddress(wallet, escrow)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
    const { phase, optinCount, allocationCounter } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseAllocation, errEscrowNotInAllocationPhase)
    loggedAssert(ids.length > 0, errAssetListCannotBeEmpty)
    const totalAssetsToProcess: uint64 = optinCount + 1 // + 1 to include algo
    loggedAssert(allocationCounter + ids.length <= totalAssetsToProcess, errTooManyAssets)

    for (let i: uint64 = 0; i < ids.length; i += 1) {
      const asset = ids[i]
      loggedAssert(!this.receiveAssets({ escrow: escrowAddress, asset }).exists, errAssetAlreadyAllocated)
      if (asset !== 0) {
        const assetKey: ManagedAssetKey = { wallet, escrow, asset }
        loggedAssert(this.managedAssets(assetKey).exists, errAssetNotRegistered)
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
   * Stops tracking an asset on an idle DAO receive escrow, e.g. a hostile or dead asset, so it no longer
   * has to be processed in every cycle. The escrow keeps its holding; the DAO can close it out with a
   * Reclaim. Only callable through the DAO wallet's main-account grant.
   */
  removeManagedAsset(wallet: Application, rekeyBack: boolean, escrow: string, asset: uint64): void {
    this.validateWallet(wallet)
    this.requireDaoMainAccount(wallet)
    this.validateEscrowName(escrow)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
    const { phase, allocationCounter } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseIdle && allocationCounter === 0, errEscrowNotIdle)

    const assetKey: ManagedAssetKey = { wallet, escrow, asset }
    loggedAssert(this.managedAssets(assetKey).exists, errAssetNotRegistered)
    this.managedAssets(assetKey).delete()
    this.escrows(key).value.optinCount -= 1

    rekeyBackIfNecessary(rekeyBack, wallet)
  }

  /**
   * Replaces the split configuration of an idle DAO receive escrow (and drops
   * any split reference), e.g. to remove a receiver that can no longer accept
   * funds. Only callable through the DAO wallet's main-account grant.
   */
  updateSplits(wallet: Application, rekeyBack: boolean, escrow: string, splits: Split[]): void {
    this.validateWallet(wallet)
    this.requireDaoMainAccount(wallet)
    this.validateEscrowName(escrow)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
    const { phase, allocationCounter } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseIdle && allocationCounter === 0, errEscrowNotIdle)
    loggedAssert(splits.length > 0, errSplitsCannotBeEmpty)
    loggedAssert(splits.length <= 10, errSplitsCannotBeMoreThan10)
    this.validateSplits(splits)

    if (this.splitRefs(key).exists) {
      this.splitRefs(key).delete()
    }
    // Delete then write so a differently sized split list never depends on box resize semantics.
    if (this.splits(key).exists) {
      this.splits(key).delete()
    }
    this.splits(key).value = clone(splits)

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
    loggedAssert(this.controls(sender), errForbidden)
    loggedAssert(sender === escrowAddress, errControlledAddressMustBeEscrow)

    const key: WalletEscrowKey = { wallet, escrow }
    loggedAssert(this.escrows(key).exists, errReceiveEscrowDoesNotExist)
    const { phase, allocationCounter } = this.escrows(key).value
    loggedAssert(phase === EscrowDisbursementPhaseFinalization, errEscrowNotInFinalizationPhase)
    loggedAssert(ids.length > 0, errAssetListCannotBeEmpty)
    loggedAssert(ids.length <= allocationCounter, errTooManyAssets)

    // Delete the tracking boxes for processed assets
    for (let i: uint64 = 0; i < ids.length; i++) {
      const asset = ids[i]
      loggedAssert(this.receiveAssets({ escrow: escrowAddress, asset }).exists, errAssetNotAllocated)
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
