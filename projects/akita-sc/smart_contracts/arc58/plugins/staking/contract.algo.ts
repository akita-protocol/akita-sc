import { Account, Application, Asset, Global, itxn, loggedAssert, uint64 } from "@algorandfoundation/algorand-typescript"
import { abiCall, abimethod } from "@algorandfoundation/algorand-typescript/arc4"
import { classes } from 'polytype'
import { SettingsMBR, totalsMBR } from "../../../staking/constants"
import { STAKING_TYPE_HARD, STAKING_TYPE_HEARTBEAT, STAKING_TYPE_LOCK, StakingType, StakeCheck } from "../../../staking/types"
import { getAkitaAppList, getControlledSpendingAccount, rekeyAddress } from "../../../utils/functions"

// CONTRACT IMPORTS
import { BaseStaking } from "../../../staking/base"
import type { Staking } from "../../../staking/contract.algo"
import { AkitaBaseContract } from "../../../utils/base-contracts/upgradeable"
import { AppSoftStakeKey, SoftStakeKey } from "./types"
import { errEmptyBatch } from "./errors"

export class StakingPlugin extends classes(BaseStaking, AkitaBaseContract) {

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(akitaDAO: uint64, version: string): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // STAKING PLUGIN METHODS -----------------------------------------------------------------------

  stake(
    wallet: Application,
    rekeyBack: boolean,
    assetID: uint64,
    type: StakingType,
    amount: uint64,
    expiration: uint64,
    isUpdate: boolean
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const stakingAppID = getAkitaAppList(this.akitaDAO.value).staking
    const stakingApp = Application(stakingAppID)

    const isEscrow = type === STAKING_TYPE_HARD || type === STAKING_TYPE_LOCK
    const isAlgo = assetID === 0

    const costs = this.mbr()

    let sendAmount: uint64 = 0
    if (!isUpdate) {
      if (isEscrow && isAlgo) {
        sendAmount = amount + costs.stakes
      } else if (type === STAKING_TYPE_HEARTBEAT) {
        sendAmount = (costs.stakes + costs.heartbeats)
      } else {
        sendAmount = costs.stakes
      }
    } else if (isEscrow && isAlgo) {
      sendAmount = amount
    }

    if (isAlgo) {
      abiCall<typeof Staking.prototype.stake>({
        sender,
        appId: stakingAppID,
        args: [
          itxn.payment({
            sender,
            receiver: stakingApp.address,
            amount: sendAmount,
          }),
          type,
          amount,
          expiration,
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    } else {
      if (isEscrow && !stakingApp.address.isOptedIn(Asset(assetID))) {
        abiCall<typeof Staking.prototype.optIn>({
          sender,
          appId: stakingAppID,
          args: [
            itxn.payment({
              sender,
              receiver: stakingApp.address,
              amount: totalsMBR + Global.assetOptInMinBalance,
            }),
            assetID,
          ],
        })
      }

      abiCall<typeof Staking.prototype.stakeAsa>({
        sender,
        appId: stakingAppID,
        args: [
          itxn.payment({
            sender,
            receiver: stakingApp.address,
            amount: sendAmount,
          }),
          itxn.assetTransfer({
            sender,
            assetReceiver: stakingApp.address,
            assetAmount: isEscrow ? amount : 0,
            xferAsset: assetID,
          }),
          type,
          amount,
          expiration,
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
    }
  }

  withdraw(
    wallet: Application,
    rekeyBack: boolean,
    asset: uint64,
    type: StakingType
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Staking.prototype.withdraw>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).staking,
      args: [asset, type],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  createHeartbeat(
    wallet: Application,
    rekeyBack: boolean,
    address: Account,
    asset: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Staking.prototype.createHeartbeat>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).staking,
      args: [address, asset],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  checkpointSoftStake(
    wallet: Application,
    rekeyBack: boolean,
    stakeKeys: SoftStakeKey[]
  ): StakeCheck[] {
    // an empty batch would emit no inner txn and never rekey back
    loggedAssert(stakeKeys.length > 0, errEmptyBatch)
    const sender = getControlledSpendingAccount(wallet)
    let results: StakeCheck[] = []
    for (let i: uint64 = 0; i < stakeKeys.length; i++) {
      results.push(
        abiCall<typeof Staking.prototype.checkpointSoftStake>({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).staking,
          args: [stakeKeys[i].address, stakeKeys[i].asset],
          rekeyTo: i === stakeKeys.length - 1 ? rekeyAddress(rekeyBack, wallet) : Global.zeroAddress,
        }).returnValue
      )
    }
    return results
  }

  checkpointAppSoftStake(
    wallet: Application,
    rekeyBack: boolean,
    appStakeKeys: AppSoftStakeKey[]
  ): StakeCheck[] {
    loggedAssert(appStakeKeys.length > 0, errEmptyBatch)
    const sender = getControlledSpendingAccount(wallet)
    let results: StakeCheck[] = []
    for (let i: uint64 = 0; i < appStakeKeys.length; i++) {
      results.push(
        abiCall<typeof Staking.prototype.checkpointAppSoftStake>({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).staking,
          args: [appStakeKeys[i].app, appStakeKeys[i].address, appStakeKeys[i].asset],
          rekeyTo: i === appStakeKeys.length - 1 ? rekeyAddress(rekeyBack, wallet) : Global.zeroAddress,
        }).returnValue
      )
    }
    return results
  }

  updateSettings(
    wallet: Application,
    rekeyBack: boolean,
    asset: uint64,
    value: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const appId = getAkitaAppList(this.akitaDAO.value).staking

    const settings = abiCall<typeof Staking.prototype.getSettings>({
      sender,
      appId,
      args: [[asset]],
    }).returnValue

    abiCall<typeof Staking.prototype.updateSettings>({
      sender,
      appId,
      args: [
        itxn.payment({
          sender,
          receiver: Application(appId).address,
          amount: settings[0].exists ? 0 : SettingsMBR,
        }),
        asset,
        value
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * Sets the Staking heartbeat manager. Staking only accepts this from the DAO wallet, so this is
   * meant to be executed by the DAO wallet (ST-4).
   */
  setHeartbeatManager(wallet: Application, rekeyBack: boolean, manager: Account): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Staking.prototype.setHeartbeatManager>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).staking,
      args: [manager],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Closes the wallet's SOFT stake; the stake box MBR returns to the spending account. */
  closeSoftStake(wallet: Application, rekeyBack: boolean, asset: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Staking.prototype.closeSoftStake>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).staking,
      args: [asset],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Closes the wallet's heartbeat stake and history; MBR returns to the spending account. */
  closeHeartbeat(wallet: Application, rekeyBack: boolean, asset: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Staking.prototype.closeHeartbeat>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).staking,
      args: [asset],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Releases an app-scoped commitment of the wallet whose consuming app was deleted. */
  releaseAppStake(wallet: Application, rekeyBack: boolean, app: uint64, asset: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Staking.prototype.releaseAppStake>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).staking,
      args: [app, sender, asset],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }
}
