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
import { StaticArray, Uint64 } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { arc4Zero } from '../utils/constants'
import {
  ONE_YEAR,
  StakingBoxPrefixAppStakes,
  StakingBoxPrefixHeartbeats,
  StakingBoxPrefixSettings,
  StakingBoxPrefixStakes,
  StakingBoxPrefixTotals,
  StakingGlobalStateKeyHeartbeatManagerAddress,
  totalsMBR,
} from './constants'
import {
  ERR_ALREADY_OPTED_IN,
  ERR_ALREADY_INITIALIZED,
  ERR_APP_CALL_REQUIRED,
  ERR_BAD_EXPIRATION,
  ERR_BAD_EXPIRATION_UPDATE,
  ERR_HEARBEAT_NOT_FOUND,
  ERR_HEARTBEAT_CANNOT_UPDATE,
  ERR_INSUFFICIENT_BALANCE,
  ERR_INVALID_ASSET_AMOUNT,
  ERR_INVALID_PAYMENT,
  ERR_INVALID_PAYMENT_AMOUNT,
  ERR_INVALID_PAYMENT_RECEIVER,
  ERR_LOCKED,
  ERR_NO_LOCK,
  ERR_NOT_ASSET_CREATOR,
  ERR_NOT_HEARTBEAT_MANAGER,
  ERR_NOT_OPTED_IN,
  ERR_STAKE_DOESNT_EXIST,
  ERR_STAKE_NOT_FOUND,
  ERR_WITHDRAW_IS_ONLY_FOR_HARD_OR_LOCK,
} from './errors'
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
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/base'
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
    loggedAssert(!this.totals(0).exists, ERR_ALREADY_INITIALIZED)
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

    return this.stakes(sk).value
  }

  // STAKING METHODS ------------------------------------------------------------------------------

  /**
   * optin tells the contract to opt into an asa
   * @param payment The payment transaction
   * @param asset The asset to be opted into
   */
  optIn(payment: gtxn.PaymentTxn, asset: uint64): void {
    loggedAssert(!Global.currentApplicationAddress.isOptedIn(Asset(asset)), ERR_ALREADY_OPTED_IN)

    // totals mbr
    const mbr: uint64 = (
      totalsMBR +
      Global.assetOptInMinBalance
    )

    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === mbr, ERR_INVALID_PAYMENT)

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
    const inTheFuture = expiration > Global.latestTimestamp
    const lessThanOneYearInTheFuture = expiration <= Global.latestTimestamp + ONE_YEAR
    const locked = type === STAKING_TYPE_LOCK
    const isEscrow = type === STAKING_TYPE_HARD || type === STAKING_TYPE_LOCK
    const timestamp = Global.latestTimestamp

    loggedAssert((inTheFuture && lessThanOneYearInTheFuture) || !locked, ERR_BAD_EXPIRATION)

    const sk: StakeKey = {
      address: Txn.sender,
      asset: 0,
      type,
    }

    const isUpdate = this.stakes(sk).exists

    if (!isUpdate) {

      const costs = this.mbr()

      if (isEscrow) {

        loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
        loggedAssert(payment.amount === amount + costs.stakes, ERR_INVALID_PAYMENT)

        this.updateTotals(0, type, amount, true)
        if (locked) {
          this.updateLiveLockedStake(0, amount, true)
        }

      } else if (type === STAKING_TYPE_HEARTBEAT) {
        // when heartbeat staking, the amount is ignored
        // instead we record balances across wallet & escrow
        const held = new Uint64(Txn.sender.balance)
        let hard: uint64 = 0
        let lock: uint64 = 0

        const hardStakeKey: StakeKey = {
          address: Txn.sender,
          asset: 0,
          type: STAKING_TYPE_HARD,
        }

        if (this.stakes(hardStakeKey).exists) {
          hard = this.stakes(hardStakeKey).value.amount
        }

        const lockStakeKey: StakeKey = {
          address: Txn.sender,
          asset: 0,
          type: STAKING_TYPE_LOCK,
        }

        if (this.stakes(lockStakeKey).exists) {
          lock = this.stakes(lockStakeKey).value.amount
        }

        loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
        loggedAssert(payment.amount === costs.stakes + costs.heartbeats, ERR_INVALID_PAYMENT)

        const heartbeatKey: HeartbeatKey = {
          address: Txn.sender,
          asset: 0,
        }

        const hbv = new arc4Heartbeat({
          held,
          hard: new Uint64(hard),
          lock: new Uint64(lock),
          timestamp: new Uint64(timestamp),
        })

        const ehbv = new arc4Heartbeat({
          held: arc4Zero,
          hard: arc4Zero,
          lock: arc4Zero,
          timestamp: arc4Zero,
        })

        const heartbeats = new StaticArray<arc4Heartbeat, 4>(
          clone(hbv),
          clone(ehbv),
          clone(ehbv),
          clone(ehbv)
        )

        this.heartbeats(heartbeatKey).value = clone(heartbeats)

      } else {
        loggedAssert(Txn.sender.balance >= amount, ERR_INSUFFICIENT_BALANCE)
        loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
        loggedAssert(payment.amount === costs.stakes, ERR_INVALID_PAYMENT)
      }

      this.stakes(sk).value = {
        amount,
        lastUpdate: timestamp,
        expiration,
        weightedAge: 0,
      }

    } else {
      loggedAssert(type !== STAKING_TYPE_HEARTBEAT, ERR_HEARTBEAT_CANNOT_UPDATE)
      const currentStake = clone(this.stakes(sk).value)
      const { expiration: currentStakeExpiration, amount: currentStakeAmount } = currentStake
      const newAmount: uint64 = currentStakeAmount + amount
      loggedAssert(expiration >= currentStakeExpiration || !locked, ERR_BAD_EXPIRATION_UPDATE)

      if (isEscrow) {
        loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
        loggedAssert(payment.amount === amount, ERR_INVALID_PAYMENT_AMOUNT)

        this.updateTotals(0, type, amount, true)
        if (locked) {
          // expiration === 0 marks an expired lock already removed from the
          // live total. Re-locking reactivates both the old and new amount.
          this.updateLiveLockedStake(0, currentStakeExpiration === 0 ? newAmount : amount, true)
        }
      } else {
        loggedAssert(Txn.sender.balance >= currentStakeAmount + amount, ERR_INSUFFICIENT_BALANCE)
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
    const inTheFuture = expiration > Global.latestTimestamp
    let lessThanMaxLockup = expiration <= Global.latestTimestamp + ONE_YEAR
    if (this.settings(assetXfer.xferAsset.id).exists) {
      lessThanMaxLockup = expiration <= Global.latestTimestamp + this.settings(assetXfer.xferAsset.id).value
    }
    const locked = type === STAKING_TYPE_LOCK
    const isEscrow = type === STAKING_TYPE_HARD || type === STAKING_TYPE_LOCK
    const timestamp = Global.latestTimestamp

    loggedAssert((inTheFuture && lessThanMaxLockup) || !locked, ERR_BAD_EXPIRATION)

    const asset = assetXfer.xferAsset.id

    const sk: StakeKey = { address: Txn.sender, asset, type }

    const isUpdate = this.stakes(sk).exists

    if (!isUpdate) {

      const costs = this.mbr()

      if (isEscrow) {
        loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
        loggedAssert(payment.amount === costs.stakes, ERR_INVALID_PAYMENT_AMOUNT)

        loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, ERR_INVALID_ASSET_AMOUNT)
        loggedAssert(assetXfer.assetAmount === amount, ERR_INVALID_ASSET_AMOUNT)

        this.updateTotals(asset, type, amount, true)
        if (locked) {
          this.updateLiveLockedStake(asset, amount, true)
        }

      } else if (type === STAKING_TYPE_HEARTBEAT) {
        const [holdingAmount, optedIn] = AssetHolding.assetBalance(Txn.sender, asset)

        loggedAssert(optedIn, ERR_NOT_OPTED_IN)
        loggedAssert(holdingAmount > 0, ERR_INVALID_ASSET_AMOUNT)

        const held = new Uint64(holdingAmount)

        const hardStakeKey: StakeKey = { address: Txn.sender, asset, type: STAKING_TYPE_HARD }

        let hard: uint64 = 0
        if (this.stakes(hardStakeKey).exists) {
          hard = this.stakes(hardStakeKey).value.amount
        }

        const lockStakeKey: StakeKey = { address: Txn.sender, asset, type: STAKING_TYPE_LOCK }

        let lock: uint64 = 0
        if (this.stakes(lockStakeKey).exists) {
          lock = this.stakes(lockStakeKey).value.amount
        }

        loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
        loggedAssert(payment.amount === (costs.stakes + costs.heartbeats), ERR_INVALID_PAYMENT_AMOUNT)

        // if they aren't escrowing, we need to make sure the asset transfer is 0, doesn't matter to who in this case
        loggedAssert(assetXfer.assetAmount === 0, ERR_INVALID_ASSET_AMOUNT)

        const heartbeatKey: HeartbeatKey = { address: Txn.sender, asset }

        const hbv = new arc4Heartbeat({
          held,
          hard: new Uint64(hard),
          lock: new Uint64(lock),
          timestamp: new Uint64(timestamp),
        })

        const ehbv = new arc4Heartbeat({
          held: arc4Zero,
          hard: arc4Zero,
          lock: arc4Zero,
          timestamp: arc4Zero,
        })

        this.heartbeats(heartbeatKey).value = new arc4.StaticArray<arc4Heartbeat, 4>(
          clone(hbv),
          clone(ehbv),
          clone(ehbv),
          clone(ehbv)
        )
      } else {
        const [holdingAmount, optedIn] = AssetHolding.assetBalance(Txn.sender, asset)
        loggedAssert(optedIn, ERR_NOT_OPTED_IN)
        loggedAssert(holdingAmount >= amount, ERR_INSUFFICIENT_BALANCE)

        loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
        loggedAssert(payment.amount === costs.stakes, ERR_INVALID_PAYMENT_AMOUNT)

        // if they aren't escrowing, we need to make sure the asset transfer is 0, doesn't matter to who in this case
        loggedAssert(assetXfer.assetAmount === 0, ERR_INVALID_ASSET_AMOUNT)
      }

      this.stakes(sk).value = {
        amount,
        lastUpdate: timestamp,
        expiration,
        weightedAge: 0,
      }
    } else {
      loggedAssert(type !== STAKING_TYPE_HEARTBEAT, ERR_HEARTBEAT_CANNOT_UPDATE)
      const currentStake = clone(this.stakes(sk).value)
      const { expiration: currentStakeExpiration, amount: currentStakeAmount } = currentStake
      const newAmount: uint64 = currentStakeAmount + amount
      loggedAssert(expiration >= currentStakeExpiration || !locked, ERR_BAD_EXPIRATION_UPDATE)

      // updates to asa staking shouldnt require any mbr changes
      loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT_RECEIVER)
      loggedAssert(payment.amount === 0, ERR_INVALID_PAYMENT_AMOUNT)

      if (isEscrow) {
        loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, ERR_INVALID_ASSET_AMOUNT)
        loggedAssert(assetXfer.assetAmount === amount, ERR_INVALID_ASSET_AMOUNT)

        this.updateTotals(asset, type, amount, true)
        if (locked) {
          // expiration === 0 marks an expired lock already removed from the
          // live total. Re-locking reactivates both the old and new amount.
          this.updateLiveLockedStake(asset, currentStakeExpiration === 0 ? newAmount : amount, true)
        }
      } else {
        const [holdingAmount, optedIn] = AssetHolding.assetBalance(Txn.sender, asset)
        loggedAssert(optedIn, ERR_NOT_OPTED_IN)
        loggedAssert(holdingAmount >= currentStakeAmount + amount, ERR_INSUFFICIENT_BALANCE)
        // if they aren't escrowing, we need to make sure the asset transfer is 0, doesn't matter to who in this case
        loggedAssert(assetXfer.assetAmount === 0, ERR_INVALID_ASSET_AMOUNT)
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
      ERR_WITHDRAW_IS_ONLY_FOR_HARD_OR_LOCK
    )

    const sk = { address: Txn.sender, asset, type }
    loggedAssert(this.stakes(sk).exists, ERR_NO_LOCK)

    const { expiration, amount } = this.stakes(sk).value
    loggedAssert(type !== STAKING_TYPE_LOCK || expiration < Global.latestTimestamp, ERR_LOCKED)

    if (asset === 0) {
      itxn
        .payment({
          receiver: Txn.sender,
          amount: amount
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
    loggedAssert(Txn.sender === this.heartbeatManagerAddress.value, ERR_NOT_HEARTBEAT_MANAGER)

    const hbk = { address, asset }
    loggedAssert(this.heartbeats(hbk).exists, ERR_HEARBEAT_NOT_FOUND)

    const timestamp = new Uint64(Global.latestTimestamp)
    const heartbeats = clone(this.heartbeats(hbk).value)

    const [holdings] = AssetHolding.assetBalance(address, asset)
    const held = new Uint64(holdings)

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
    loggedAssert(this.stakes(sk).exists, ERR_STAKE_DOESNT_EXIST)

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
    loggedAssert(Global.callerApplicationId !== 0, ERR_APP_CALL_REQUIRED)
    const app = Global.callerApplicationId
    const key: AppStakeKey = { app, address, asset }
    const { balance, optedIn } = this.getHeld(address, asset)
    loggedAssert(optedIn, ERR_NOT_OPTED_IN)

    const cost: uint64 = this.appStakes(key).exists ? 0 : this.mbr().appStakes
    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(payment.amount === cost, ERR_INVALID_PAYMENT)

    if (!this.appStakes(key).exists) {
      loggedAssert(balance >= amount, ERR_INSUFFICIENT_BALANCE)

      let inheritedAge: uint64 = 0
      if (inheritRoot) {
        const rootKey: StakeKey = { address, asset, type: STAKING_TYPE_SOFT }
        loggedAssert(this.stakes(rootKey).exists, ERR_STAKE_DOESNT_EXIST)
        const root = clone(this.stakes(rootKey).value)
        loggedAssert(balance >= root.amount && amount <= root.amount, ERR_INSUFFICIENT_BALANCE)
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
    loggedAssert(balance >= newAmount, ERR_INSUFFICIENT_BALANCE)
    this.appStakes(key).value = this.calculateUpdatedAppStake(current, newAmount)
  }

  /** Records a shortfall for the calling app's commitment. */
  checkpointAppSoftStake(app: uint64, address: Account, asset: uint64): StakeCheck {
    const key: AppStakeKey = { app, address, asset }
    loggedAssert(this.appStakes(key).exists, ERR_STAKE_DOESNT_EXIST)
    const { balance, optedIn } = this.getHeld(address, asset)
    const info = clone(this.appStakes(key).value)
    const valid = optedIn && balance >= info.amount
    if (!valid) {
      this.appStakes(key).value = {
        amount: optedIn ? balance : 0,
        lastUpdate: Global.latestTimestamp,
        weightedAge: 0,
        inheritedAge: 0,
      }
    }
    return { valid, balance: optedIn ? balance : 0 }
  }

  updateSettings(payment: gtxn.PaymentTxn, asset: uint64, value: uint64): void {
    loggedAssert(Txn.sender === Asset(asset).creator, ERR_NOT_ASSET_CREATOR)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, ERR_INVALID_PAYMENT)
    loggedAssert(
      payment.amount === (this.settings(asset).exists ? 0 : this.mbr().settings),
      ERR_INVALID_PAYMENT
    )

    this.settings(asset).value = value
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
    loggedAssert(Global.callerApplicationId !== 0, ERR_APP_CALL_REQUIRED)
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
    loggedAssert(this.stakes(sk).exists, ERR_NO_LOCK)
    loggedAssert(Global.latestTimestamp < this.stakes(sk).value.expiration, ERR_LOCKED)
    return this.stakes(sk).value.expiration - Global.latestTimestamp
  }

  @abimethod({ readonly: true })
  getInfo(address: Account, stake: StakeInfo): Stake {
    return this.getInfoOrEmpty(address, stake)
  }

  @abimethod({ readonly: true })
  mustGetInfo(address: Account, stake: StakeInfo): Stake {
    const sk = { address, ...stake }
    loggedAssert(this.stakes(sk).exists, ERR_NO_LOCK)

    return this.stakes(sk).value
  }

  @abimethod({ readonly: true })
  getWeightedStake(address: Account, asset: uint64): WeightedStake {
    return this.getWeightedStakeForApp(address, asset, 0, true)
  }

  @abimethod({ readonly: true })
  softCheck(address: Account, asset: uint64): StakeCheck {
    const sk = { address, asset, type: STAKING_TYPE_SOFT }
    loggedAssert(this.stakes(sk).exists, ERR_STAKE_DOESNT_EXIST)

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
      weightedAge: op.btoi(Bytes(totalWeightedAge / BigUint(totalAmount)).slice(56, 64)),
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
    loggedAssert(this.heartbeats(hbk).exists, ERR_HEARBEAT_NOT_FOUND)
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
    loggedAssert(this.heartbeats(hbk).exists, ERR_HEARBEAT_NOT_FOUND)

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

      results.push(this.stakes(sk).value)
    }
    return results
  }

  @abimethod({ readonly: true })
  mustGetInfoList(address: Account, type: StakingType, assets: uint64[]): Stake[] {
    const results: Stake[] = []
    for (let i: uint64 = 0; i < assets.length; i += 1) {
      const sk = { address, asset: assets[i], type }
      loggedAssert(this.stakes(sk).exists, ERR_STAKE_NOT_FOUND)
      results.push(this.stakes(sk).value)
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

      let amountToCheck: uint64 = this.stakes(sk).value.amount
      if (type === STAKING_TYPE_HEARTBEAT) {
        amountToCheck = this.getHeartbeatAverage(address, checks[i].asset, includeEscrowed)
      }

      if (checks[i].amount >= amountToCheck) {
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
