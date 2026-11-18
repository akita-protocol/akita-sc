import { abimethod, Account, Application, Asset, Bytes, GlobalState, itxn, loggedAssert, op, uint64 } from "@algorandfoundation/algorand-typescript";
import { abiCall, encodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4";
import { itob } from "@algorandfoundation/algorand-typescript/op";
import { GlobalStateKeyAkitaDAO, GlobalStateKeyVersion } from "../../../constants";
import { GateArgs } from "../../../gates/types";
import { RootKey } from "../../../meta/types";
import { PoolGlobalStateKeyPrincipalVersion } from "../../../staking-pool/constants";
import { AddRewardParams, StakeEntry } from "../../../staking-pool/types";
import { StakingType } from "../../../staking/types";
import { GateMustCheckForAbiMethod, getAkitaAppList, getOriginAccount, getControlledSpendingAccount, getStakingPoolGateID, legacyWalletOf, pluginPrincipalOf, rekeyAddress } from "../../../utils/functions";
import { gateCtx, windowHint } from "../../../utils/principal";
import { PoolPluginGlobalStateKeyFactory } from "./constants";
import { errNotAValidPool } from "./errors";

// CONTRACT IMPORTS
import { Gate } from "../../../gates/contract.algo";
import { BaseStakingPool } from "../../../staking-pool/base";
import { StakingPool } from "../../../staking-pool/contract.algo";
import { StakingPoolFactory } from "../../../staking-pool/factory.algo";


/**
 * ARC-58 staking-pool plugin. Principal-resolution version (PHASE-0-SPEC §6.11): hinted target ABIs
 * with `windowHint(wallet)` (§3.8 rule 6), gate txns through `Gate.mustCheckFor(ctx)`, and per-pool
 * ABI selection by the child's `pv` marker. No method of this plugin changed its ABI.
 */
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

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /** True for children built with the hinted `gatedEnter`/`enterCost` (global uint `pv`). */
  private isHintedPool(appId: Application): boolean {
    return op.AppGlobal.getExUint64(appId, Bytes(PoolGlobalStateKeyPrincipalVersion))[1]
  }

  /**
   * Storage a reward costs the pool. Children with budgets (global uint `pv`) quote it themselves:
   * the reward box, the reward's budget box and, the first time, the asset's total box. An ALGO
   * reward's budget is the payment beyond this quote. Older children store the reward box only.
   */
  private rewardStorageCost(sender: Account, appId: Application, winnerCount: uint64, asset: uint64): uint64 {
    if (!this.isHintedPool(appId)) {
      return this.rewardsMbr(winnerCount)
    }
    return abiCall<typeof StakingPool.prototype.addRewardCost>({
      sender,
      appId,
      args: [winnerCount, asset],
    }).returnValue
  }

  /**
   * LEGACY children (no `pv`; delete in Phase 4): the gate subject a deployed child asserts for
   * `sender`, re-derived from its bytecode (MainNet factory 3569556570 box `bc`): the raw
   * `controlled_address` of the wallet the EscrowFactory registry names for `sender`, else `sender`.
   * `legacyWalletOf` also requires the registered app to be a genuine wallet; for an honest window
   * the registered app is `wallet` itself, so the answers agree.
   */
  private legacyChildGateSubject(sender: Account): Account {
    const registered = legacyWalletOf(this.akitaDAO.value, sender)
    if (registered.id === 0) {
      return sender
    }
    return getOriginAccount(registered)
  }

  /** Legacy (pre-`pv`) child: the deployed ABI and gate subject. */
  private legacyEnter(
    wallet: Application,
    rekeyBack: boolean,
    appId: Application,
    entries: StakeEntry[],
    args: GateArgs,
    sender: Account,
    gateID: uint64
  ): void {
    // resolve the subject (an EscrowFactory read) before any txn of the entry group is built
    let subject: Account = sender
    if (gateID !== 0) {
      subject = this.legacyChildGateSubject(sender)
    }

    const total = abiCall<typeof StakingPool.prototype.enterCost>({
      sender,
      appId,
      args: [sender, entries]
    }).returnValue

    const mbrPayment = itxn.payment({
      sender,
      receiver: appId.address,
      amount: total
    })

    if (gateID !== 0) {
      const { gate } = getAkitaAppList(this.akitaDAO.value)
      const gateTxn = itxn.applicationCall({
        sender,
        appId: gate,
        appArgs: [
          methodSelector<typeof Gate.prototype.mustCheck>(),
          subject,
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
    const sender = getControlledSpendingAccount(wallet)
    // §3.8 rule 6: the only hint a plugin forwards is the wallet whose window it serves
    const hint = windowHint(wallet)

    // Ask the factory for the sender-specific cost so DAO-owned wallets are
    // exempt and referral MBR is included for referred user wallets.
    const poolCost = abiCall<typeof StakingPoolFactory.prototype.hintedNewPoolCost>({
      sender,
      appId: this.factory.value,
      args: [hint],
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
        hint,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet)
    })
  }

  initPool(
    wallet: Application,
    rekeyBack: boolean,
    poolID: uint64
  ): void {
    loggedAssert(Application(poolID).creator === this.factory.value.address, errNotAValidPool)

    const sender = getControlledSpendingAccount(wallet)

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
    loggedAssert(appId.creator === this.factory.value.address, errNotAValidPool)

    const sender = getControlledSpendingAccount(wallet)

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
    loggedAssert(appId.creator === this.factory.value.address, errNotAValidPool)

    const sender = getControlledSpendingAccount(wallet)

    if (reward.asset === 0) {
      // quoted before the reward group is built: the quote is an inner call of its own
      const storage = this.rewardStorageCost(sender, appId, reward.winnerCount, 0)

      abiCall<typeof StakingPool.prototype.addReward>({
        sender,
        appId,
        args: [
          itxn.payment({
            sender,
            receiver: appId.address,
            amount: amount + storage
          }),
          reward
        ],
        rekeyTo: rekeyAddress(rekeyBack, wallet)
      })
    } else {
      // check if pool is opted into the reward asset
      if (!appId.address.isOptedIn(Asset(reward.asset))) {
        // The pool quotes its own opt-in: it requires this exact amount, which depends on how many
        // of the DAO's revenue receivers still have to opt in.
        const optInCost = abiCall<typeof StakingPool.prototype.optInCost>({
          sender,
          appId,
          args: [Asset(reward.asset)],
        }).returnValue

        abiCall<typeof StakingPool.prototype.optIn>({
          sender,
          appId,
          args: [
            itxn.payment({
              sender,
              receiver: appId.address,
              amount: optInCost
            }),
            Asset(reward.asset),
          ]
        })
      }

      const storage = this.rewardStorageCost(sender, appId, reward.winnerCount, reward.asset)

      abiCall<typeof StakingPool.prototype.addRewardAsa>({
        sender,
        appId,
        args: [
          itxn.payment({
            sender,
            receiver: appId.address,
            amount: storage
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
    loggedAssert(Application(poolID).creator === this.factory.value.address, errNotAValidPool)

    const sender = getControlledSpendingAccount(wallet)

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
    loggedAssert(appId.creator === this.factory.value.address, errNotAValidPool)
    const sender = getControlledSpendingAccount(wallet)
    const gateID = getStakingPoolGateID(appId)

    if (!this.isHintedPool(appId)) {
      this.legacyEnter(wallet, rekeyBack, appId, entries, args, sender, gateID)
      return
    }

    // §3.8 rule 6: the only hint a plugin forwards is the wallet whose window it serves
    const hint = windowHint(wallet)

    const total = abiCall<typeof StakingPool.prototype.hintedEnterCost>({
      sender,
      appId,
      args: [sender, entries, args, hint]
    }).returnValue

    const mbrPayment = itxn.payment({
      sender,
      receiver: appId.address,
      amount: total
    })

    if (gateID !== 0) {
      // the entrant's verified context, exactly what the pool recomputes for windowHint(wallet)
      const ctx = gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet))
      // We're forced to manually construct an app call here because the abiCall<typeof Gate.prototype.mustCheckFor>
      // method immediately invokes & is not passable as an arg to the other call
      const { gate } = getAkitaAppList(this.akitaDAO.value)
      const gateTxn = itxn.applicationCall({
        sender,
        appId: gate,
        appArgs: [
          methodSelector(GateMustCheckForAbiMethod),
          encodeArc4(ctx),
          itob(gateID),
          encodeArc4(args)
        ]
      })

      abiCall<typeof StakingPool.prototype.hintedGatedEnter>({
        sender,
        appId,
        args: [
          mbrPayment,
          gateTxn,
          entries,
          hint,
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
