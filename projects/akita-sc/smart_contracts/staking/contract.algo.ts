import {
  abimethod,
  Account,
  Application,
  arc4,
  Asset,
  BigUint,
  BoxMap,
  Bytes,
  clone,
  Global,
  GlobalState,
  gtxn,
  itxn,
  loggedAssert,
  op,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { decodeArc4, StaticArray, Uint64 } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { arc4Zero } from '../utils/constants'
import {
  AppStakesMBR,
  HeartbeatsMBR,
  MAX_MAX_LOCKUP,
  MIN_MAX_LOCKUP,
  ONE_YEAR,
  StakesMBR,
  StakingBoxPrefixAppStakes,
  StakingBoxPrefixHeartbeats,
  StakingBoxPrefixSettings,
  StakingBoxPrefixStakes,
  StakingBoxPrefixTotals,
  StakingGlobalStateKeyHeartbeatManagerAddress,
  totalsMBR,
} from './constants'
import {
  errAlreadyOptedIn,
  errAlreadyInitialized,
  errAppCallRequired,
  errBadExpiration,
  errBadExpirationUpdate,
  errHearbeatNotFound,
  errHeartbeatCannotUpdate,
  errInsufficientBalance,
  errInvalidAssetAmount,
  errInvalidPayment,
  errInvalidPaymentAmount,
  errInvalidPaymentReceiver,
  errLocked,
  errNoLock,
  errNotAssetCreator,
  errNotHeartbeatManager,
  errNotOptedIn,
  errStakeDoesntExist,
  errStakeNotFound,
  errWithdrawIsOnlyForHardOrLock,
  errNotAkitaDao,
  errNotCreator,
  errInvalidStakeType,
  errInvalidLockupSetting,
  errLockupDecrease,
  errAppStakeInUse,
} from './errors'
import { AkitaDAOGlobalStateKeysAkitaAssets } from '../arc58/dao/constants'
import { AkitaAssets } from '../arc58/dao/types'
import { assertSafeAssetTransfer, assertSafePayment } from '../utils/functions'
import {
  arc4Heartbeat,
  AppStake,
  AppStakeKey,
  AssetCheck,
  Escrow,
  HeartbeatKey,
  Stake,
  StakeCheck,
  StakeInfo,
  StakeKey,
  STAKING_TYPE_HARD,
  STAKING_TYPE_HEARTBEAT,
  STAKING_TYPE_LOCK,
  STAKING_TYPE_SOFT,
  StakingType,
  TotalsInfo,
  WeightedStake,
  SettingsCheck
} from './types'

// CONTRACT IMPORTS
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/upgradeable'
import { BaseStaking } from './base'
import { emptyHeartbeat } from './utils'

export class Staking extends classes(BaseStaking, UpgradeableAkitaBaseContract) {

  // GLOBAL STATE ---------------------------------------------------------------------------------
  /** The address that is allowed to call the 'beat' method to create heartbeat records */
  heartbeatManagerAddress = GlobalState<Account>({ key: StakingGlobalStateKeyHeartbeatManagerAddress })

  // BOXES ----------------------------------------------------------------------------------------

  // 2_500 + (400 * (42 + 32)) = 32,100
  stakes = BoxMap<StakeKey, Stake>({ keyPrefix: StakingBoxPrefixStakes })

  // Portable root soft stakes remain in `stakes`; consumer-specific commitments live here.
  // 2_500 + (400 * (49 + 32)) = 34,900
  appStakes = BoxMap<AppStakeKey, AppStake>({ keyPrefix: StakingBoxPrefixAppStakes })

  // 2_500 + (400 * (41 + 128)) = 44,100
  heartbeats = BoxMap<HeartbeatKey, arc4.StaticArray<arc4Heartbeat, 4>>({
    keyPrefix: StakingBoxPrefixHeartbeats,
  })

  totals = BoxMap<uint64, TotalsInfo>({ keyPrefix: StakingBoxPrefixTotals })

  settings = BoxMap<uint64, uint64>({ keyPrefix: StakingBoxPrefixSettings })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
  }

  init(): void {
    loggedAssert(Txn.sender === Global.creatorAddress, errNotCreator)
    loggedAssert(!this.totals(0).exists, errAlreadyInitialized)
    this.totals(0).value = { locked: 0, escrowed: 0, liveLockedStake: 0 }
  }

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private updateTotals(asset: uint64, type: StakingType, amount: uint64, isAdd: boolean): void {
    if (type === STAKING_TYPE_HARD) {
      if (isAdd) {
        this.totals(asset).value.escrowed += amount
      } else {
        this.totals(asset).value.escrowed -= amount
      }
    } else if (type === STAKING_TYPE_LOCK) {
      if (isAdd) {
        this.totals(asset).value.locked += amount
      } else {
        this.totals(asset).value.locked -= amount
      }
    }
  }

  private updateLiveLockedStake(asset: uint64, amount: uint64, isAdd: boolean): void {
    if (isAdd) {
      this.totals(asset).value.liveLockedStake += amount
    } else {
      this.totals(asset).value.liveLockedStake -= amount
    }
  }

  private calculateUpdatedWeightedAge(info: Stake, newAmount: uint64): uint64 {
    const currentAge: uint64 = info.weightedAge + (Global.latestTimestamp - info.lastUpdate)
    return op.divw(...op.mulw(currentAge, info.amount), newAmount)
  }

  private getWeightedAge(info: Stake): uint64 {
    return info.weightedAge + (Global.latestTimestamp - info.lastUpdate)
  }

  private getAppWeightedAge(info: AppStake, acceptInherited: boolean): uint64 {
    const age: uint64 = info.weightedAge + (Global.latestTimestamp - info.lastUpdate)
    return acceptInherited ? age : age - info.inheritedAge
  }

  private calculateUpdatedAppStake(info: AppStake, newAmount: uint64): AppStake {
    const currentAge: uint64 = this.getAppWeightedAge(info, true)
    return {
      amount: newAmount,
      lastUpdate: Global.latestTimestamp,
      weightedAge: op.divw(...op.mulw(currentAge, info.amount), newAmount),
      inheritedAge: op.divw(...op.mulw(info.inheritedAge, info.amount), newAmount),
    }
  }

  private getHeld(address: Account, asset: uint64): { balance: uint64; optedIn: boolean } {
    if (asset === 0) {
      return { balance: address.balance, optedIn: true }
    }

    const [balance, optedIn] = AssetHolding.assetBalance(address, asset)
    return { balance, optedIn }
  }

  private checkpointStake(info: Stake, balance: uint64): Stake {
    if (balance >= info.amount) {
      return info
    }

    return {
      amount: balance,
      lastUpdate: Global.latestTimestamp,
      expiration: info.expiration,
      weightedAge: 0,
    }
  }

  private emptyStake(): Stake {
    return { amount: 0, lastUpdate: 0, expiration: 0, weightedAge: 0 }
  }

  private getInfoOrEmpty(address: Account, stake: StakeInfo): Stake {
    const sk = { address, ...stake }
    if (!this.stakes(sk).exists) {
      return this.emptyStake()
    }

    return this.clampSoft(address, stake.asset, stake.type, this.stakes(sk).value)
  }

  /**
   * A SOFT stake is a commitment, not custody: never report more than the holder currently has
   * (M-3 / ST-5). Other stake types are returned unchanged.
   */
  private clampSoft(address: Account, asset: uint64, type: StakingType, info: Stake): Stake {
    if (type !== STAKING_TYPE_SOFT) {
      return info
    }

    const { balance, optedIn } = this.getHeld(address, asset)
    const backed: uint64 = optedIn ? balance : 0
    if (backed >= info.amount) {
      return info
    }

    return { amount: backed, lastUpdate: info.lastUpdate, expiration: info.expiration, weightedAge: 0 }
  }

  private assertValidStakeType(type: StakingType): void {
    loggedAssert(
      type === STAKING_TYPE_HEARTBEAT ||
      type === STAKING_TYPE_SOFT ||
      type === STAKING_TYPE_HARD ||
      type === STAKING_TYPE_LOCK,
      errInvalidStakeType
    )
  }

  /** The DAO's governance assets, or zeros when the DAO has not configured them. */
  private governanceAssets(): AkitaAssets {
    const [bytes, exists] = op.AppGlobal.getExBytes(this.akitaDAO.value, Bytes(AkitaDAOGlobalStateKeysAkitaAssets))
    if (!exists) {
      return { akta: 0, bones: 0 }
    }
    return decodeArc4<AkitaAssets>(bytes)
  }

  /** Empty history: a heartbeat average only counts manager-timed beats (M-2). */
  private emptyHeartbeats(): arc4.StaticArray<arc4Heartbeat, 4> {
    return new arc4.StaticArray<arc4Heartbeat, 4>(
      emptyHeartbeat(),
      emptyHeartbeat(),
      emptyHeartbeat(),
      emptyHeartbeat()
    )
  }

  // STAKING METHODS ------------------------------------------------------------------------------

  /**
   * optin tells the contract to opt into an asa
   * @param payment The payment transaction
   * @param asset The asset to be opted into
   */
  optIn(payment: gtxn.PaymentTxn, asset: uint64): void {
    loggedAssert(!Global.currentApplicationAddress.isOptedIn(Asset(asset)), errAlreadyOptedIn)

    // totals mbr
    const mbr: uint64 = (
      totalsMBR +
      Global.assetOptInMinBalance
    )

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === mbr, errInvalidPayment)

    itxn.assetTransfer({
      assetReceiver: Global.currentApplicationAddress,
      assetAmount: 0,
      xferAsset: asset
    }).submit()

    this.totals(asset).value = {
      locked: 0,
      escrowed: 0,
      liveLockedStake: 0,
    }
  }

  stake(payment: gtxn.PaymentTxn, type: StakingType, amount: uint64, expiration: uint64): void {
    this.assertValidStakeType(type)
    // MBR (and ALGO escrow) is refunded to the staker, so the staker must fund it.
    assertSafePayment(payment, Txn.sender)
    const inTheFuture = expiration > Global.latestTimestamp
    const lessThanOneYearInTheFuture = expiration <= Global.latestTimestamp + ONE_YEAR
    const locked = type === STAKING_TYPE_LOCK
    const isEscrow = type === STAKING_TYPE_HARD || type === STAKING_TYPE_LOCK
    const timestamp = Global.latestTimestamp

    loggedAssert((inTheFuture && lessThanOneYearInTheFuture) || !locked, errBadExpiration)

    const sk: StakeKey = {
      address: Txn.sender,
      asset: 0,
      type,
    }

    const isUpdate = this.stakes(sk).exists

    if (!isUpdate) {

      const costs = this.mbr()

      if (isEscrow) {

        loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
        loggedAssert(payment.amount === amount + costs.stakes, errInvalidPayment)

        this.updateTotals(0, type, amount, true)
        if (locked) {
          this.updateLiveLockedStake(0, amount, true)
        }

      } else if (type === STAKING_TYPE_HEARTBEAT) {
        // when heartbeat staking, the amount is ignored: the heartbeat manager samples the
        // balance later. No snapshot is taken here, because the caller controls its timing and
        // could borrow the balance for this one group (M-2).
        loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
        loggedAssert(payment.amount === costs.stakes + costs.heartbeats, errInvalidPayment)

        const heartbeatKey: HeartbeatKey = {
          address: Txn.sender,
          asset: 0,
        }

        this.heartbeats(heartbeatKey).value = this.emptyHeartbeats()

      } else {
        loggedAssert(Txn.sender.balance >= amount, errInsufficientBalance)
        loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
        loggedAssert(payment.amount === costs.stakes, errInvalidPayment)
      }

      this.stakes(sk).value = {
        amount,
        lastUpdate: timestamp,
        expiration,
        weightedAge: 0,
      }

    } else {
      loggedAssert(type !== STAKING_TYPE_HEARTBEAT, errHeartbeatCannotUpdate)
      const currentStake = clone(this.stakes(sk).value)
      const { expiration: currentStakeExpiration, amount: currentStakeAmount } = currentStake
      const newAmount: uint64 = currentStakeAmount + amount
      loggedAssert(expiration >= currentStakeExpiration || !locked, errBadExpirationUpdate)

      if (isEscrow) {
        loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
        loggedAssert(payment.amount === amount, errInvalidPaymentAmount)

        this.updateTotals(0, type, amount, true)
        if (locked) {
          // expiration === 0 marks an expired lock already removed from the
          // live total. Re-locking reactivates both the old and new amount.
          this.updateLiveLockedStake(0, currentStakeExpiration === 0 ? newAmount : amount, true)
        }
      } else {
        loggedAssert(Txn.sender.balance >= currentStakeAmount + amount, errInsufficientBalance)
      }

      this.stakes(sk).value = {
        amount: newAmount,
        lastUpdate: timestamp,
        expiration,
        weightedAge: this.calculateUpdatedWeightedAge(currentStake, newAmount),
      }
    }
  }

  stakeAsa(
    payment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    type: StakingType,
    amount: uint64,
    expiration: uint64
  ): void {
    this.assertValidStakeType(type)
    assertSafePayment(payment, Txn.sender)
    // no clawback-sourced, closing or rekeying transfer, and the staker funds its own escrow
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    const inTheFuture = expiration > Global.latestTimestamp
    let lessThanMaxLockup = expiration <= Global.latestTimestamp + ONE_YEAR
    if (this.settings(assetXfer.xferAsset.id).exists) {
      lessThanMaxLockup = expiration <= Global.latestTimestamp + this.settings(assetXfer.xferAsset.id).value
    }
    const locked = type === STAKING_TYPE_LOCK
    const isEscrow = type === STAKING_TYPE_HARD || type === STAKING_TYPE_LOCK
    const timestamp = Global.latestTimestamp

    loggedAssert((inTheFuture && lessThanMaxLockup) || !locked, errBadExpiration)

    const asset = assetXfer.xferAsset.id

    const sk: StakeKey = { address: Txn.sender, asset, type }

    const isUpdate = this.stakes(sk).exists

    if (!isUpdate) {

      const costs = this.mbr()

      if (isEscrow) {
        loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
        loggedAssert(payment.amount === costs.stakes, errInvalidPaymentAmount)

        loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidAssetAmount)
        loggedAssert(assetXfer.assetAmount === amount, errInvalidAssetAmount)

        this.updateTotals(asset, type, amount, true)
        if (locked) {
          this.updateLiveLockedStake(asset, amount, true)
        }

      } else if (type === STAKING_TYPE_HEARTBEAT) {
        const [holdingAmount, optedIn] = AssetHolding.assetBalance(Txn.sender, asset)

        loggedAssert(optedIn, errNotOptedIn)
        loggedAssert(holdingAmount > 0, errInvalidAssetAmount)

        loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
        loggedAssert(payment.amount === (costs.stakes + costs.heartbeats), errInvalidPaymentAmount)

        // if they aren't escrowing, we need to make sure the asset transfer is 0, doesn't matter to who in this case
        loggedAssert(assetXfer.assetAmount === 0, errInvalidAssetAmount)

        // no creation snapshot (see `stake`): only manager-timed beats count (M-2)
        const heartbeatKey: HeartbeatKey = { address: Txn.sender, asset }
        this.heartbeats(heartbeatKey).value = this.emptyHeartbeats()
      } else {
        const [holdingAmount, optedIn] = AssetHolding.assetBalance(Txn.sender, asset)
        loggedAssert(optedIn, errNotOptedIn)
        loggedAssert(holdingAmount >= amount, errInsufficientBalance)

        loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
        loggedAssert(payment.amount === costs.stakes, errInvalidPaymentAmount)

        // if they aren't escrowing, we need to make sure the asset transfer is 0, doesn't matter to who in this case
        loggedAssert(assetXfer.assetAmount === 0, errInvalidAssetAmount)
      }

      this.stakes(sk).value = {
        amount,
        lastUpdate: timestamp,
        expiration,
        weightedAge: 0,
      }
    } else {
      loggedAssert(type !== STAKING_TYPE_HEARTBEAT, errHeartbeatCannotUpdate)
      const currentStake = clone(this.stakes(sk).value)
      const { expiration: currentStakeExpiration, amount: currentStakeAmount } = currentStake
      const newAmount: uint64 = currentStakeAmount + amount
      loggedAssert(expiration >= currentStakeExpiration || !locked, errBadExpirationUpdate)

      // updates to asa staking shouldnt require any mbr changes
      loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPaymentReceiver)
      loggedAssert(payment.amount === 0, errInvalidPaymentAmount)

      if (isEscrow) {
        loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidAssetAmount)
        loggedAssert(assetXfer.assetAmount === amount, errInvalidAssetAmount)

        this.updateTotals(asset, type, amount, true)
        if (locked) {
          // expiration === 0 marks an expired lock already removed from the
          // live total. Re-locking reactivates both the old and new amount.
          this.updateLiveLockedStake(asset, currentStakeExpiration === 0 ? newAmount : amount, true)
        }
      } else {
        const [holdingAmount, optedIn] = AssetHolding.assetBalance(Txn.sender, asset)
        loggedAssert(optedIn, errNotOptedIn)
        loggedAssert(holdingAmount >= currentStakeAmount + amount, errInsufficientBalance)
        // if they aren't escrowing, we need to make sure the asset transfer is 0, doesn't matter to who in this case
        loggedAssert(assetXfer.assetAmount === 0, errInvalidAssetAmount)
      }

      this.stakes(sk).value = {
        amount: newAmount,
        lastUpdate: timestamp,
        expiration,
        weightedAge: this.calculateUpdatedWeightedAge(currentStake, newAmount),
      }
    }
  }

  withdraw(asset: uint64, type: StakingType): void {
    loggedAssert(
      type === STAKING_TYPE_HARD || type === STAKING_TYPE_LOCK,
      errWithdrawIsOnlyForHardOrLock
    )

    const sk = { address: Txn.sender, asset, type }
    loggedAssert(this.stakes(sk).exists, errNoLock)

    const { expiration, amount } = this.stakes(sk).value
    loggedAssert(type !== STAKING_TYPE_LOCK || expiration < Global.latestTimestamp, errLocked)

    // Custody plus the stake box MBR the staker paid when creating it (L-2).
    if (asset === 0) {
      itxn
        .payment({
          receiver: Txn.sender,
          amount: amount + StakesMBR
        })
        .submit()
    } else {
      itxn
        .assetTransfer({
          assetReceiver: Txn.sender,
          assetAmount: amount,
          xferAsset: asset
        })
        .submit()

      itxn
        .payment({
          receiver: Txn.sender,
          amount: StakesMBR
        })
        .submit()
    }

    this.updateTotals(asset, type, amount, false)
    if (type === STAKING_TYPE_LOCK && expiration !== 0) {
      this.updateLiveLockedStake(asset, amount, false)
    }

    this.stakes(sk).delete()
  }

  /** Permissionlessly removes an expired lock from the live governance total. */
  checkpointExpiredLock(address: Account, asset: uint64): boolean {
    const sk: StakeKey = { address, asset, type: STAKING_TYPE_LOCK }
    if (!this.stakes(sk).exists) {
      return false
    }

    const info = clone(this.stakes(sk).value)
    if (info.expiration === 0 || info.expiration >= Global.latestTimestamp) {
      return false
    }

    this.updateLiveLockedStake(asset, info.amount, false)
    info.expiration = 0
    this.stakes(sk).value = clone(info)
    return true
  }

  createHeartbeat(address: Account, asset: uint64): void {
    loggedAssert(Txn.sender === this.heartbeatManagerAddress.value, errNotHeartbeatManager)

    const hbk = { address, asset }
    loggedAssert(this.heartbeats(hbk).exists, errHearbeatNotFound)

    const timestamp = new Uint64(Global.latestTimestamp)
    const heartbeats = clone(this.heartbeats(hbk).value)

    // native balance for ALGO (asset 0), holding otherwise
    const held = new Uint64(this.getHeld(address, asset).balance)

    const hardStakeKey = {
      address,
      asset,
      type: STAKING_TYPE_HARD
    }

    let hard: uint64 = 0
    if (this.stakes(hardStakeKey).exists) {
      hard = this.stakes(hardStakeKey).value.amount
    }

    const lockStakeKey = {
      address,
      asset,
      type: STAKING_TYPE_LOCK
    }

    let lock: uint64 = 0
    if (this.stakes(lockStakeKey).exists) {
      lock = this.stakes(lockStakeKey).value.amount
    }

    /**
     * The index with the highest timestamp is the newest
     * since we only keep history of the last 4 heartbeats
     * all we need to do is check which timestamp in the array
     * is the highest and replace the one after it with the new heartbeat
     */
    for (let i: uint64 = 0; i < 4; i += 1) {
      if (
        i === 3 ||
        heartbeats[i].timestamp.asUint64() > heartbeats[i + 1].timestamp.asUint64()
      ) {
        const indexToModify: uint64 = i === 3 ? 0 : i + 1
        this.heartbeats(hbk).value[indexToModify] = new arc4Heartbeat({
          held,
          hard: new Uint64(hard),
          lock: new Uint64(lock),
          timestamp,
        })
        return
      }
    }
  }

  /** Permissionlessly records an observed shortfall against the portable root commitment. */
  checkpointSoftStake(address: Account, asset: uint64): StakeCheck {
    const sk: StakeKey = { address, asset, type: STAKING_TYPE_SOFT }
    loggedAssert(this.stakes(sk).exists, errStakeDoesntExist)

    const { balance, optedIn } = this.getHeld(address, asset)
    const info = clone(this.stakes(sk).value)
    const valid = optedIn && balance >= info.amount
    if (!valid) {
      this.stakes(sk).value = this.checkpointStake(info, optedIn ? balance : 0)
    }

    return { valid, balance: optedIn ? balance : 0 }
  }

  /**
   * Creates or adds to a soft commitment scoped to one consuming app.
   * New commitments may inherit the portable root's current weighted age.
   */
  commitAppSoftStake(
    payment: gtxn.PaymentTxn,
    address: Account,
    asset: uint64,
    amount: uint64,
    inheritRoot: boolean
  ): void {
    loggedAssert(Global.callerApplicationId !== 0, errAppCallRequired)
    const app = Global.callerApplicationId
    const key: AppStakeKey = { app, address, asset }
    const { balance, optedIn } = this.getHeld(address, asset)
    loggedAssert(optedIn, errNotOptedIn)

    const cost: uint64 = this.appStakes(key).exists ? 0 : this.mbr().appStakes
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === cost, errInvalidPayment)

    if (!this.appStakes(key).exists) {
      loggedAssert(balance >= amount, errInsufficientBalance)

      let inheritedAge: uint64 = 0
      if (inheritRoot) {
        const rootKey: StakeKey = { address, asset, type: STAKING_TYPE_SOFT }
        loggedAssert(this.stakes(rootKey).exists, errStakeDoesntExist)
        const root = clone(this.stakes(rootKey).value)
        loggedAssert(balance >= root.amount && amount <= root.amount, errInsufficientBalance)
        inheritedAge = this.getWeightedAge(root)
      }

      this.appStakes(key).value = {
        amount,
        lastUpdate: Global.latestTimestamp,
        weightedAge: inheritedAge,
        inheritedAge,
      }
      return
    }

    const current = clone(this.appStakes(key).value)
    const newAmount: uint64 = current.amount + amount
    loggedAssert(balance >= newAmount, errInsufficientBalance)
    this.appStakes(key).value = this.calculateUpdatedAppStake(current, newAmount)
  }

  /**
   * Records a shortfall against an app-scoped commitment.
   *
   * Anyone may call it, but only the consuming app itself may shrink the commitment; any other
   * caller only resets its accrued age. Otherwise a holder could empty their wallet, shrink their
   * own commitment to 0 and stay "valid" for that app forever (H-1). A missing commitment (never
   * made, or released) is reported as invalid instead of failing.
   */
  checkpointAppSoftStake(app: uint64, address: Account, asset: uint64): StakeCheck {
    const key: AppStakeKey = { app, address, asset }
    const { balance, optedIn } = this.getHeld(address, asset)
    const held: uint64 = optedIn ? balance : 0
    if (!this.appStakes(key).exists) {
      return { valid: false, balance: held }
    }

    const info = clone(this.appStakes(key).value)
    const valid = optedIn && balance >= info.amount
    if (!valid) {
      const amount: uint64 = Global.callerApplicationId === app ? held : info.amount
      this.appStakes(key).value = {
        amount,
        lastUpdate: Global.latestTimestamp,
        weightedAge: 0,
        inheritedAge: 0,
      }
    }
    return { valid, balance: held }
  }

  /**
   * Sets an asset's maximum lock duration (stakeAsa LOCK).
   *
   * - The DAO's governance assets (AKTA / BONES) can only be configured by the DAO wallet; any
   *   other asset by its creator (DAO-05).
   * - The value must lie in [2 weeks, 4 years] and may never decrease, so a configured lockup can
   *   neither freeze locking nor strand existing lockers' assumptions (G-5).
   */
  updateSettings(payment: gtxn.PaymentTxn, asset: uint64, value: uint64): void {
    const { akta, bones } = this.governanceAssets()
    if (asset !== 0 && (asset === akta || asset === bones)) {
      loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    } else {
      loggedAssert(Txn.sender === Asset(asset).creator, errNotAssetCreator)
    }

    loggedAssert(value >= MIN_MAX_LOCKUP && value <= MAX_MAX_LOCKUP, errInvalidLockupSetting)
    const current: uint64 = this.settings(asset).exists ? this.settings(asset).value : ONE_YEAR
    loggedAssert(value >= current, errLockupDecrease)

    assertSafePayment(payment, Txn.sender)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(
      payment.amount === (this.settings(asset).exists ? 0 : this.mbr().settings),
      errInvalidPayment
    )

    this.settings(asset).value = value
  }

  /** Sets the account allowed to record heartbeats. DAO wallet only (ST-4). */
  setHeartbeatManager(manager: Account): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    this.heartbeatManagerAddress.value = manager
  }

  /** Owner closes their SOFT stake and gets the stake box MBR back (L-2). */
  closeSoftStake(asset: uint64): void {
    const sk: StakeKey = { address: Txn.sender, asset, type: STAKING_TYPE_SOFT }
    loggedAssert(this.stakes(sk).exists, errStakeDoesntExist)
    this.stakes(sk).delete()

    itxn.payment({ receiver: Txn.sender, amount: StakesMBR }).submit()
  }

  /** Owner closes their heartbeat stake and its history and gets both boxes' MBR back (L-2). */
  closeHeartbeat(asset: uint64): void {
    const sk: StakeKey = { address: Txn.sender, asset, type: STAKING_TYPE_HEARTBEAT }
    loggedAssert(this.stakes(sk).exists, errStakeDoesntExist)
    this.stakes(sk).delete()

    let refund: uint64 = StakesMBR
    const hbk: HeartbeatKey = { address: Txn.sender, asset }
    if (this.heartbeats(hbk).exists) {
      this.heartbeats(hbk).delete()
      refund += HeartbeatsMBR
    }

    itxn.payment({ receiver: Txn.sender, amount: refund }).submit()
  }

  /**
   * Deletes an app-scoped commitment and refunds its box MBR to the committed address (L-2).
   * Allowed for the consuming app itself, or for the owner once that app no longer exists.
   */
  releaseAppStake(app: uint64, address: Account, asset: uint64): void {
    const key: AppStakeKey = { app, address, asset }
    loggedAssert(this.appStakes(key).exists, errStakeDoesntExist)

    const [, appExists] = op.AppParams.appCreator(app)
    loggedAssert(
      Global.callerApplicationId === app || (!appExists && Txn.sender === address),
      errAppStakeInUse
    )

    this.appStakes(key).delete()
    itxn.payment({ receiver: address, amount: AppStakesMBR }).submit()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  optInCost(): uint64 {
    return totalsMBR + Global.assetOptInMinBalance
  }

  @abimethod({ readonly: true })
  stakeCost(asset: uint64, type: StakingType): uint64 {
    const { stakes, heartbeats } = this.mbr()
    const sk: StakeKey = { address: Txn.sender, asset, type }
    const isUpdate = this.stakes(sk).exists

    if (type === STAKING_TYPE_HEARTBEAT) {
      return isUpdate ? 0 : stakes + heartbeats
    }

    return isUpdate ? 0 : stakes
  }

  @abimethod({ readonly: true })
  appStakeCost(address: Account, asset: uint64): uint64 {
    loggedAssert(Global.callerApplicationId !== 0, errAppCallRequired)
    const key: AppStakeKey = { app: Global.callerApplicationId, address, asset }
    return this.appStakes(key).exists ? 0 : this.mbr().appStakes
  }

  @abimethod({ readonly: true })
  getTimeLeft(address: Account, asset: uint64): uint64 {
    const sk = { address, asset, type: STAKING_TYPE_LOCK }
    if (!this.stakes(sk).exists || Global.latestTimestamp >= this.stakes(sk).value.expiration) {
      return 0
    }

    return this.stakes(sk).value.expiration - Global.latestTimestamp
  }

  @abimethod({ readonly: true })
  mustGetTimeLeft(address: Account, asset: uint64): uint64 {
    const sk = { address, asset, type: STAKING_TYPE_LOCK }
    loggedAssert(this.stakes(sk).exists, errNoLock)
    loggedAssert(Global.latestTimestamp < this.stakes(sk).value.expiration, errLocked)
    return this.stakes(sk).value.expiration - Global.latestTimestamp
  }

  @abimethod({ readonly: true })
  getInfo(address: Account, stake: StakeInfo): Stake {
    return this.getInfoOrEmpty(address, stake)
  }

  @abimethod({ readonly: true })
  mustGetInfo(address: Account, stake: StakeInfo): Stake {
    const sk = { address, ...stake }
    loggedAssert(this.stakes(sk).exists, errNoLock)

    return this.clampSoft(address, stake.asset, stake.type, this.stakes(sk).value)
  }

  @abimethod({ readonly: true })
  getWeightedStake(address: Account, asset: uint64): WeightedStake {
    return this.getWeightedStakeForApp(address, asset, 0, true)
  }

  @abimethod({ readonly: true })
  softCheck(address: Account, asset: uint64): StakeCheck {
    const sk = { address, asset, type: STAKING_TYPE_SOFT }
    loggedAssert(this.stakes(sk).exists, errStakeDoesntExist)

    const { amount } = this.stakes(sk).value
    if (asset === 0) {
      const valid = address.balance >= amount
      return { valid, balance: address.balance }
    }

    const [holdingAmount, optedIn] = AssetHolding.assetBalance(address, asset)

    if (!optedIn) {
      return { valid: false, balance: 0 }
    }

    const valid = holdingAmount >= amount

    return { valid, balance: holdingAmount }
  }

  @abimethod({ readonly: true })
  getAppWeightedStake(
    app: uint64,
    address: Account,
    asset: uint64,
    acceptInherited: boolean
  ): WeightedStake {
    return this.getWeightedStakeForApp(address, asset, app, acceptInherited)
  }

  private getWeightedStakeForApp(
    address: Account,
    asset: uint64,
    app: uint64,
    acceptInherited: boolean
  ): WeightedStake {
    let totalAmount: uint64 = 0
    let totalWeightedAge = BigUint(0)

    const softKey: StakeKey = { address, asset, type: STAKING_TYPE_SOFT }
    const appKey: AppStakeKey = { app, address, asset }
    const held = this.getHeld(address, asset)
    if (app === 0) {
      if (this.stakes(softKey).exists) {
        const info = clone(this.stakes(softKey).value)
        if (held.optedIn && held.balance >= info.amount) {
          const age = this.getWeightedAge(info)
          totalAmount += info.amount
          totalWeightedAge += BigUint(info.amount) * BigUint(age)
        }
      }
    } else {
      if (this.appStakes(appKey).exists) {
        const info = clone(this.appStakes(appKey).value)
        if (held.optedIn && held.balance >= info.amount) {
          const age = this.getAppWeightedAge(info, acceptInherited)
          totalAmount += info.amount
          totalWeightedAge += BigUint(info.amount) * BigUint(age)
        }
      }
    }

    const hardKey: StakeKey = { address, asset, type: STAKING_TYPE_HARD }
    if (this.stakes(hardKey).exists) {
      const info = clone(this.stakes(hardKey).value)
      const age = this.getWeightedAge(info)
      totalAmount += info.amount
      totalWeightedAge += BigUint(info.amount) * BigUint(age)
    }

    const lockKey: StakeKey = { address, asset, type: STAKING_TYPE_LOCK }
    if (this.stakes(lockKey).exists) {
      const info = clone(this.stakes(lockKey).value)
      const age = this.getWeightedAge(info)
      totalAmount += info.amount
      totalWeightedAge += BigUint(info.amount) * BigUint(age)
    }

    if (totalAmount === 0) {
      return { amount: 0, weightedAge: 0 }
    }

    return {
      amount: totalAmount,
      // BigUint values use a variable-length big-endian encoding. The weighted
      // average is bounded by uint64 because every contributing age is uint64,
      // so decode the quotient directly instead of slicing as if it were a
      // fixed 64-byte value.
      weightedAge: op.btoi(Bytes(totalWeightedAge / BigUint(totalAmount))),
    }
  }

  @abimethod({ readonly: true })
  getInfoAtLeast(address: Account, stake: StakeInfo): Stake[] {
    const results: Stake[] = []

    if (stake.type === STAKING_TYPE_SOFT) {
      results.push(this.getInfoOrEmpty(address, { asset: stake.asset, type: STAKING_TYPE_SOFT }))
    }

    if (stake.type === STAKING_TYPE_SOFT || stake.type === STAKING_TYPE_HARD) {
      results.push(this.getInfoOrEmpty(address, { asset: stake.asset, type: STAKING_TYPE_HARD }))
    }

    if (
      stake.type === STAKING_TYPE_SOFT ||
      stake.type === STAKING_TYPE_HARD ||
      stake.type === STAKING_TYPE_LOCK
    ) {
      results.push(this.getInfoOrEmpty(address, { asset: stake.asset, type: STAKING_TYPE_LOCK }))
    }

    return results
  }

  @abimethod({ readonly: true })
  getEscrowInfo(address: Account, asset: uint64): Escrow {
    const sk = { address, asset, type: STAKING_TYPE_HARD }
    const lk = { address, asset, type: STAKING_TYPE_LOCK }

    let hard: uint64 = 0
    if (this.stakes(sk).exists) {
      hard = this.stakes(sk).value.amount
    }

    let lock: uint64 = 0
    if (this.stakes(lk).exists) {
      lock = this.stakes(lk).value.amount
    }

    return { hard, lock }
  }

  @abimethod({ readonly: true })
  getHeartbeat(address: Account, asset: uint64): arc4.StaticArray<arc4Heartbeat, 4> {
    const hbk = { address, asset }
    if (!this.heartbeats(hbk).exists) {
      return new arc4.StaticArray<arc4Heartbeat, 4>(
        emptyHeartbeat(),
        emptyHeartbeat(),
        emptyHeartbeat(),
        emptyHeartbeat()
      )
    }

    return this.heartbeats(hbk).value
  }

  @abimethod({ readonly: true })
  mustGetHeartbeat(address: Account, asset: uint64): arc4.StaticArray<arc4Heartbeat, 4> {
    const hbk = { address, asset }
    loggedAssert(this.heartbeats(hbk).exists, errHearbeatNotFound)
    return this.heartbeats(hbk).value
  }

  @abimethod({ readonly: true })
  getHeartbeatAverage(address: Account, asset: uint64, includeEscrowed: boolean): uint64 {
    const hbk = { address, asset }

    if (!this.heartbeats(hbk).exists) {
      return 0
    }

    const heartbeats = clone(this.heartbeats(hbk).value)

    let total: uint64 = 0
    let count: uint64 = 0
    for (let i: uint64 = 0; i < heartbeats.length; i += 1) {
      if (heartbeats[i].timestamp.asUint64() > 0) {
        count += 1
        if (includeEscrowed) {
          total += heartbeats[i].held.asUint64() + heartbeats[i].hard.asUint64() + heartbeats[i].lock.asUint64()
        } else {
          total += heartbeats[i].held.asUint64()
        }
      }
    }

    if (count === 0) {
      return 0
    }

    return total / count
  }

  @abimethod({ readonly: true })
  mustGetHeartbeatAverage(address: Account, asset: uint64, includeEscrowed: boolean): uint64 {
    const hbk = { address, asset }
    loggedAssert(this.heartbeats(hbk).exists, errHearbeatNotFound)

    const heartbeats = clone(this.heartbeats(hbk).value)

    let total: uint64 = 0
    let count: uint64 = 0
    for (let i: uint64 = 0; i < 4; i += 1) {
      // Only count entries with non-zero timestamps (valid entries)
      if (heartbeats[i].timestamp.asUint64() > 0) {
        count += 1
        if (includeEscrowed) {
          total += heartbeats[i].held.asUint64() + heartbeats[i].hard.asUint64() + heartbeats[i].lock.asUint64()
        } else {
          total += heartbeats[i].held.asUint64()
        }
      }
    }

    if (count === 0) {
      return 0
    }

    return total / count
  }

  @abimethod({ readonly: true })
  getInfoList(address: Account, type: StakingType, assets: uint64[]): Stake[] {
    const results: Stake[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      const sk = { address, asset: assets[i], type }
      if (!this.stakes(sk).exists) {

        const emptyStake: Stake = {
          amount: 0,
          lastUpdate: 0,
          expiration: 0,
          weightedAge: 0,
        }

        results.push(emptyStake)
        continue
      }

      results.push(this.clampSoft(address, assets[i], type, this.stakes(sk).value))
    }
    return results
  }

  @abimethod({ readonly: true })
  mustGetInfoList(address: Account, type: StakingType, assets: uint64[]): Stake[] {
    const results: Stake[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      const sk = { address, asset: assets[i], type }
      loggedAssert(this.stakes(sk).exists, errStakeNotFound)
      results.push(this.clampSoft(address, assets[i], type, this.stakes(sk).value))
    }
    return results
  }

  @abimethod({ readonly: true })
  stakeCheck(address: Account, checks: AssetCheck[], type: StakingType, includeEscrowed: boolean): boolean {
    for (let i: uint64 = 0; i < checks.length; i += 1) {
      const sk = { address, asset: checks[i].asset, type }
      if (!this.stakes(sk).exists) {
        return false
      }

      let amountToCheck: uint64 = this.clampSoft(address, checks[i].asset, type, this.stakes(sk).value).amount
      if (type === STAKING_TYPE_HEARTBEAT) {
        amountToCheck = this.getHeartbeatAverage(address, checks[i].asset, includeEscrowed)
      }

      // staked amount must be at least the required amount
      if (checks[i].amount > amountToCheck) {
        return false
      }
    }

    return true
  }

  @abimethod({ readonly: true })
  getTotals(assets: uint64[]): TotalsInfo[] {
    const results: TotalsInfo[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      results.push(this.totals(assets[i]).value)
    }
    return results
  }

  @abimethod({ readonly: true })
  getSettings(assets: uint64[]): SettingsCheck[] {
    const results: SettingsCheck[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      if (!this.settings(assets[i]).exists) {
        results.push({ value: 0, exists: false })
        continue
      }

      results.push({ value: this.settings(assets[i]).value, exists: true })
    }
    return results
  }
}
