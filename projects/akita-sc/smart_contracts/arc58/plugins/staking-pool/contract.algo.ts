import { abimethod, Account, Application, Asset, Bytes, Global, GlobalState, itxn, loggedAssert, op, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, encodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4";
import { btoi } from "@algorandfoundation/algorand-typescript/op";
import { GlobalStateKeyAkitaDAO, GlobalStateKeyAkitaEscrow, GlobalStateKeyVersion } from "../../../constants";
import { GateArgs } from "../../../gates/types";
import { RootKey } from "../../../meta-merkles/types";
import { WinnerCountCap } from "../../../staking-pool/constants";
import { AddRewardParams, StakeEntry } from "../../../staking-pool/types";
import { StakingType } from "../../../staking/types";
import { getAccounts, getAkitaAppList, getSpendingAccount, getStakingPoolGateID, rekeyAddress } from "../../../utils/functions";
import { PoolPluginGlobalStateKeyFactory } from "./constants";
import { ERR_NOT_A_VALID_POOL } from "./errors";

// CONTRACT IMPORTS
import { Gate } from "../../../gates/contract.algo";
import { BaseStakingPool } from "../../../staking-pool/base";
import { StakingPool } from "../../../staking-pool/contract.algo";
import { StakingPoolFactory } from "../../../staking-pool/factory.algo";


export class StakingPoolPlugin extends BaseStakingPool {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  version = GlobalState<string>({ key: GlobalStateKeyVersion })
  /** the factory contract */
  factory = GlobalState<Application>({ key: PoolPluginGlobalStateKeyFactory })
  /** the Akita DAO */
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, factory: Application, akitaDAO: Application): void {
    this.version.value = version
    this.factory.value = factory
    this.akitaDAO.value = akitaDAO
  }

  // POOL PLUGIN METHODS --------------------------------------------------------------------------

  newPool(
    wallet: Application,
    rekeyBack: boolean,
    title: string,
    type: StakingType,
    marketplace: Account,
    stakeKey: RootKey,
    minimumStakeAmount: uint64,
    allowLateSignups: boolean,
    gateID: uint64,
    maxEntries: uint64,
  ): void {
    const sender = getSpendingAccount(wallet)

    // Ask the factory for the sender-specific cost so DAO-owned wallets are
    // exempt and referral MBR is included for referred user wallets.
    const poolCost = abiCall<typeof StakingPoolFactory.prototype.newPoolCost>({
      sender,
      appId: this.factory.value,
    }).returnValue

    const mbrTxn = itxn.payment({
      sender,
      receiver: this.factory.value.address,
      amount: poolCost
    })

    abiCall<typeof StakingPoolFactory.prototype.newPool>({
      sender,
      appId: this.factory.value,
      args: [
        mbrTxn,
        title,
        type,
        marketplace,
        stakeKey,
        minimumStakeAmount,
        allowLateSignups,
        gateID,
        maxEntries,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  initPool(
    wallet: Application,
    rekeyBack: boolean,
    poolID: uint64
  ): void {
    loggedAssert(Application(poolID).creator === this.factory.value.address, ERR_NOT_A_VALID_POOL)

    const sender = getSpendingAccount(wallet)

    abiCall<typeof StakingPool.prototype.init>({
      sender,
      appId: poolID,
      args: [0],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  deletePool(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application
  ): void {
    loggedAssert(appId.creator === this.factory.value.address, ERR_NOT_A_VALID_POOL)

    const sender = getSpendingAccount(wallet)

    abiCall<typeof StakingPoolFactory.prototype.deletePool>({
      sender,
      appId: this.factory.value,
      args: [appId],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  addReward(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    reward: AddRewardParams,
    amount: uint64
  ): void {
    loggedAssert(appId.creator === this.factory.value.address, ERR_NOT_A_VALID_POOL)

    const sender = getSpendingAccount(wallet)

    if (reward.asset === 0) {
      abiCall<typeof StakingPool.prototype.addReward>({
        sender,
        appId,
        args: [
          itxn.payment({
            sender,
            receiver: appId.address,
            amount: amount + this.rewardsMbr(reward.winnerCount)
          }),
          reward
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    } else {
      // check if pool is opted into the reward asset
      if (!appId.address.isOptedIn(Asset(reward.asset))) {

        // get the akita dao escrow for the pool factory
        const escrowBytes = op.AppGlobal.getExBytes(this.factory.value, Bytes(GlobalStateKeyAkitaEscrow))[0]
        const escrow = Application(btoi(escrowBytes));
        const optinMBR: uint64 = Global.assetOptInMinBalance * (
          !escrow.address.isOptedIn(Asset(reward.asset)) ? 4 : 1
        )

        const rewardsMBR: uint64 = this.rewardsMbr(WinnerCountCap) * 2

        abiCall<typeof StakingPool.prototype.optIn>({
          sender,
          appId,
          args: [
            itxn.payment({
              sender,
              receiver: appId.address,
              amount: optinMBR + rewardsMBR
            }),
            Asset(reward.asset),
          ]
        })
      }

      abiCall<typeof StakingPool.prototype.addRewardAsa>({
        sender,
        appId,
        args: [
          itxn.payment({
            sender,
            receiver: appId.address,
            amount: this.rewardsMbr(reward.winnerCount)
          }),
          itxn.assetTransfer({
            sender,
            assetReceiver: appId.address,
            assetAmount: amount,
            xferAsset: reward.asset
          }),
          reward
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    }
  }

  finalizePool(
    wallet: Application,
    rekeyBack: boolean,
    poolID: uint64,
    signupTimestamp: uint64,
    startTimestamp: uint64,
    endTimestamp: uint64
  ): void {
    loggedAssert(Application(poolID).creator === this.factory.value.address, ERR_NOT_A_VALID_POOL)

    const sender = getSpendingAccount(wallet)

    abiCall<typeof StakingPool.prototype.finalize>({
      sender,
      appId: poolID,
      args: [
        signupTimestamp,
        startTimestamp,
        endTimestamp,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  enter(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    entries: StakeEntry[],
    args: GateArgs
  ): void {
    loggedAssert(appId.creator === this.factory.value.address, ERR_NOT_A_VALID_POOL)
    const { origin, sender } = getAccounts(wallet)

    const total = abiCall<typeof StakingPool.prototype.enterCost>({
      sender,
      appId,
      args: [sender, entries]
    }).returnValue

    const gateID = getStakingPoolGateID(appId)

    const mbrPayment = itxn.payment({
      sender,
      receiver: appId.address,
      amount: total
    })

    if (gateID !== 0) {
      // We're forced to manually construct an app call here because the abiCall<typeof Gate.prototype.mustCheck>
      // method immediately invokes & is not passable as an arg to the other call
      const { gate } = getAkitaAppList(this.akitaDAO.value)
      const gateTxn = itxn.applicationCall({
        sender,
        appId: gate,
        appArgs: [
          methodSelector<typeof Gate.prototype.mustCheck>(),
          origin,
          gateID,
          encodeArc4(args)
        ]
      })

      abiCall<typeof StakingPool.prototype.gatedEnter>({
        sender,
        appId,
        args: [
          mbrPayment,
          gateTxn,
          entries,
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    } else {
      abiCall<typeof StakingPool.prototype.enter>({
        sender,
        appId,
        args: [
          mbrPayment,
          entries
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    }
  }
}
