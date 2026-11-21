import { Account, Application, Asset, GlobalState, itxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { classes } from 'polytype'
import { AllocationReclaimDetails, ClaimDetails, UserAllocation } from '../../../rewards/types'
import { getControlledSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions"
import { getAkitaAppList } from '../../../utils/functions'
import { errInvalidRewardsApp } from './errors'

// CONTRACT IMPORTS
import { BaseRewards } from '../../../rewards/base'
import type { Rewards } from '../../../rewards/contract.algo'
import type { AssetInbox } from '../../../utils/types/asset-inbox'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'

export class RewardsPlugin extends classes(BaseRewards, AkitaBaseContract) {

  /**
   * The previous Rewards app (0 = none). Fixed at create: the registry only names the current
   * Rewards app, so this is the one other app whose credits, boxes and allocations the plugin may reach
   * (STAKE-4, DEC-1).
   */
  legacyRewards = GlobalState<uint64>({ key: 'legacy_rewards' })

  /** The ARC-59 ASA inbox router whose inboxes the claimInbox methods reach (0 = none). Fixed at create. */
  inboxRouter = GlobalState<Application>({ key: 'inbox_router' })

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application, legacyRewards: uint64, inboxRouter: uint64): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.legacyRewards.value = legacyRewards
    this.inboxRouter.value = Application(inboxRouter)
  }

  /** The registry's current Rewards app or the legacy one pinned at create, never any other app. */
  private assertKnownRewards(rewardsApp: uint64): void {
    loggedAssert(
      rewardsApp !== 0 &&
      (rewardsApp === getAkitaAppList(this.akitaDAO.value).rewards || rewardsApp === this.legacyRewards.value),
      errInvalidRewardsApp
    )
  }

  /** `reclaimTo` is unrestricted: what it can receive is the spending account's own funds. */
  createDisbursement(
    wallet: Application,
    rekeyBack: boolean,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string,
    mbrCredits: uint64,
    reclaimTo: Account
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    const { disbursements: mbrAmount } = this.mbr(title, note)
    const rewardsID = getAkitaAppList(this.akitaDAO.value).rewards

    return abiCall<typeof Rewards.prototype.createDisbursement>({
      sender,
      appId: rewardsID,
      args: [
        itxn.payment({
          sender,
          amount: mbrAmount + mbrCredits,
          receiver: Application(rewardsID).address,
        }),
        title,
        timeToUnlock,
        expiration,
        note,
        reclaimTo,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** The pre-reclaim-target selector: records no reclaim target. */
  @abimethod({ name: 'createDisbursement' })
  legacyCreateDisbursement(
    wallet: Application,
    rekeyBack: boolean,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string,
    mbrCredits: uint64
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)

    const { disbursements: mbrAmount } = this.mbr(title, note)
    const rewardsID = getAkitaAppList(this.akitaDAO.value).rewards

    return abiCall<typeof Rewards.prototype.legacyCreateDisbursement>({
      sender,
      appId: rewardsID,
      args: [
        itxn.payment({
          sender,
          amount: mbrAmount + mbrCredits,
          receiver: Application(rewardsID).address,
        }),
        title,
        timeToUnlock,
        expiration,
        note,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  editDisbursement(
    wallet: Application,
    rekeyBack: boolean,
    id: uint64,
    title: string,
    timeToUnlock: uint64,
    expiration: uint64,
    note: string
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Rewards.prototype.editDisbursement>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).rewards,
      args: [id, title, timeToUnlock, expiration, note],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  createUserAllocations(
    wallet: Application,
    rekeyBack: boolean,
    id: uint64,
    allocations: UserAllocation[],
    sum: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const rewardsID = getAkitaAppList(this.akitaDAO.value).rewards

    abiCall<typeof Rewards.prototype.createUserAllocations>({
      sender,
      appId: rewardsID,
      args: [
        itxn.payment({
          sender,
          amount: sum,
          receiver: Application(rewardsID).address,
        }),
        id,
        allocations,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  createAsaUserAllocations(
    wallet: Application,
    rekeyBack: boolean,
    id: uint64,
    assetID: uint64,
    allocations: UserAllocation[],
    sum: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    const rewardsID = getAkitaAppList(this.akitaDAO.value).rewards
    const rewardsApp = Application(rewardsID)

    abiCall<typeof Rewards.prototype.createAsaUserAllocations>({
      sender,
      appId: rewardsApp,
      args: [
        itxn.assetTransfer({
          sender,
          assetReceiver: rewardsApp.address,
          assetAmount: sum,
          xferAsset: assetID,
        }),
        id,
        allocations
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  finalizeDisbursement(
    wallet: Application,
    rekeyBack: boolean,
    id: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Rewards.prototype.finalizeDisbursement>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).rewards,
      args: [id],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  createInstantDisbursement(
    wallet: Application,
    rekeyBack: boolean,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[],
    sum: uint64
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    const rewardsID = getAkitaAppList(this.akitaDAO.value).rewards
    const rewardsApp = Application(rewardsID)
    const costs = this.mbr('', '')
    const mbrAmount: uint64 = costs.disbursements + (costs.userAllocations * allocations.length)

    return abiCall<typeof Rewards.prototype.legacyCreateInstantDisbursement>({
      sender,
      appId: rewardsID,
      args: [
        itxn.payment({
          sender,
          amount: mbrAmount + sum,
          receiver: rewardsApp.address,
        }),
        timeToUnlock,
        expiration,
        allocations,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  createInstantAsaDisbursement(
    wallet: Application,
    rekeyBack: boolean,
    assetID: uint64,
    timeToUnlock: uint64,
    expiration: uint64,
    allocations: UserAllocation[],
    sum: uint64
  ): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    const rewardsID = getAkitaAppList(this.akitaDAO.value).rewards
    const rewardsApp = Application(rewardsID)
    const costs = this.mbr('', '')
    const mbrAmount: uint64 = costs.disbursements + (costs.userAllocations * allocations.length)

    return abiCall<typeof Rewards.prototype.legacyCreateInstantAsaDisbursement>({
      sender,
      appId: rewardsID,
      args: [
        itxn.payment({
          sender,
          amount: mbrAmount,
          receiver: rewardsApp.address,
        }),
        itxn.assetTransfer({
          sender,
          assetReceiver: rewardsApp.address,
          assetAmount: sum,
          xferAsset: assetID,
        }),
        timeToUnlock,
        expiration,
        allocations,
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  claimRewards(
    wallet: Application,
    rekeyBack: boolean,
    rewards: ClaimDetails[]
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Rewards.prototype.claimRewards>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).rewards,
      args: [rewards],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  reclaimRewards(
    wallet: Application,
    rekeyBack: boolean,
    id: uint64,
    reclaims: AllocationReclaimDetails[]
  ): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof Rewards.prototype.reclaimRewards>({
      sender,
      appId: getAkitaAppList(this.akitaDAO.value).rewards,
      args: [id, reclaims],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** `claimRewards` against the legacy Rewards app pinned at create (refused when there is none). */
  claimLegacyRewards(
    wallet: Application,
    rekeyBack: boolean,
    rewards: ClaimDetails[]
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    loggedAssert(this.legacyRewards.value !== 0, errInvalidRewardsApp)

    abiCall<typeof Rewards.prototype.claimRewards>({
      sender,
      appId: this.legacyRewards.value,
      args: [rewards],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** `reclaimRewards` against the legacy Rewards app pinned at create (refused when there is none). */
  reclaimLegacyRewards(
    wallet: Application,
    rekeyBack: boolean,
    id: uint64,
    reclaims: AllocationReclaimDetails[]
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    loggedAssert(this.legacyRewards.value !== 0, errInvalidRewardsApp)

    abiCall<typeof Rewards.prototype.reclaimRewards>({
      sender,
      appId: this.legacyRewards.value,
      args: [id, reclaims],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Withdraws the wallet's unused MBR credits of a disbursement it created (STAKE-4). */
  withdrawMbrCredits(
    wallet: Application,
    rekeyBack: boolean,
    rewardsApp: uint64,
    id: uint64,
    amount: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertKnownRewards(rewardsApp)

    abiCall<typeof Rewards.prototype.withdrawMbrCredits>({
      sender,
      appId: rewardsApp,
      args: [id, amount],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * Deletes an empty disbursement the wallet created and refunds its box MBR and credits (STAKE-4).
   * The legacy (v1) Rewards app has no `closeDisbursement`; recover its credits with `withdrawMbrCredits`.
   */
  closeDisbursement(
    wallet: Application,
    rekeyBack: boolean,
    rewardsApp: uint64,
    id: uint64
  ): void {
    const sender = getControlledSpendingAccount(wallet)
    this.assertKnownRewards(rewardsApp)

    abiCall<typeof Rewards.prototype.closeDisbursement>({
      sender,
      appId: rewardsApp,
      args: [id],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  // ARC-59 ASA INBOX -------------------------------------------------------------------------------
  // ARC-59 authenticates claims by the app call's sender. While this plugin is active the wallet rekeys
  // its spending account here, so the plugin can make the ARC-59 call as that account.

  /** Claim an ASA from the wallet's ARC-59 inbox, opting the spending account in first when needed. */
  claimInbox(wallet: Application, rekeyBack: boolean, asset: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    if (!sender.isOptedIn(Asset(asset))) {
      itxn
        .assetTransfer({
          sender,
          assetReceiver: sender,
          assetAmount: 0,
          xferAsset: asset,
        })
        .submit()
    }

    abiCall<typeof AssetInbox.prototype.arc59_claim>({
      sender,
      appId: this.inboxRouter.value,
      args: [asset],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** Reject an ASA in the wallet's ARC-59 inbox, returning it to the asset creator. */
  rejectInbox(wallet: Application, rekeyBack: boolean, asset: uint64): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AssetInbox.prototype.arc59_reject>({
      sender,
      appId: this.inboxRouter.value,
      args: [asset],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * Recover ALGO above the inbox's minimum balance. ARC-59 recommends this before claimInbox when the
   * inbox holds extra receiver funding for the asset opt-in.
   */
  claimInboxAlgo(wallet: Application, rekeyBack: boolean): void {
    const sender = getControlledSpendingAccount(wallet)

    abiCall<typeof AssetInbox.prototype.arc59_claimAlgo>({
      sender,
      appId: this.inboxRouter.value,
      args: [],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }
}
