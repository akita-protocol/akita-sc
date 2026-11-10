import { Account, Application, BoxMap, bytes, clone, Global, loggedAssert, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/upgradeable'
import { getAkitaSocialAppList } from '../utils/functions'
import { CID } from '../utils/types/base'
import { AkitaSocialBoxPrefixActions, AkitaSocialBoxPrefixBanned, AkitaSocialBoxPrefixModeratorActivity, AkitaSocialBoxPrefixModerators, ModerationEffectForward, ModerationEffectNone, ModerationEffectReversal, ModeratorActivityEpoch } from './constants'
import { errAlreadyAModerator, errAlreadyAnAction, errAlreadyBanned, errNotAModerator, errNotAkitaDao, errUserNotBanned } from './errors'
import { Action, ModeratorActivity, ModeratorActivityInfo } from './types'

// CONTRACT IMPORTS
import type { AkitaSocial } from './contract.algo'

export class AkitaSocialModeration extends UpgradeableAkitaBaseContract {

  // BOXES ----------------------------------------------------------------------------------------

  /** Who is a moderator, and when they last took a moderation action (0 = never) */
  moderators = BoxMap<Account, uint64>({ keyPrefix: AkitaSocialBoxPrefixModerators })
  /** Who is banned and when they can return */
  banned = BoxMap<Account, uint64>({ keyPrefix: AkitaSocialBoxPrefixBanned })
  /** Actions usable on an akita post */
  actions = BoxMap<uint64, Action>({ keyPrefix: AkitaSocialBoxPrefixActions })
  /**
   * Counted moderation actions per moderator. addModerator creates it and removeModerator deletes it,
   * so the box MBR moves with the moderators box, from and back to this app's balance. Moderators
   * added before this box existed get it on their first counted action.
   */
  activity = BoxMap<Account, ModeratorActivity>({ keyPrefix: AkitaSocialBoxPrefixModeratorActivity })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /**
   * Stamps the sender's lastActive on every successful action and moves the sender's count for the
   * current epoch by the action's effect: a forward action (ban, flag, flags set from none) adds one,
   * a reversal (unban, unflag, flags cleared) takes one off, floored at 0. So the count is net: a
   * ban/unban or flag/unflag cycle adds nothing. Repeats that change nothing, and a change from some
   * flags to other flags, only stamp lastActive.
   */
  private recordAction(effect: uint64): void {
    const now = Global.latestTimestamp
    this.moderators(Txn.sender).value = now
    if (effect === ModerationEffectNone) {
      return
    }

    const epoch: uint64 = now / ModeratorActivityEpoch
    let actions: uint64 = 0
    let previousActions: uint64 = 0
    if (this.activity(Txn.sender).exists) {
      const last = clone(this.activity(Txn.sender).value)
      if (last.epoch === epoch) {
        actions = last.actions
        previousActions = last.previousActions
      } else if (last.epoch + 1 === epoch) {
        previousActions = last.actions
      }
    }
    if (effect === ModerationEffectForward) {
      actions += 1
    } else if (actions > 0) {
      actions -= 1
    }
    this.activity(Txn.sender).value = { epoch, actions, previousActions }
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
  }

  // MODERATION METHODS ---------------------------------------------------------------------------

  addModerator(address: Account): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    loggedAssert(!this.moderators(address).exists, errAlreadyAModerator)
    this.moderators(address).create()
    this.activity(address).create()
  }

  removeModerator(address: Account): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    loggedAssert(this.moderators(address).exists, errNotAModerator)
    this.moderators(address).delete()
    this.activity(address).delete()
  }

  ban(address: Account, expiration: uint64): void {
    loggedAssert(this.moderators(Txn.sender).exists, errNotAModerator)
    loggedAssert(!this.banned(address).exists, errAlreadyBanned)
    this.banned(address).value = expiration
    this.recordAction(ModerationEffectForward)
  }

  unban(address: Account): void {
    loggedAssert(this.moderators(Txn.sender).exists, errNotAModerator)
    loggedAssert(this.banned(address).exists, errUserNotBanned)
    this.banned(address).delete()
    this.recordAction(ModerationEffectReversal)
  }

  flagPost(ref: bytes<32>): void {
    loggedAssert(this.moderators(Txn.sender).exists, errNotAModerator)
    this.recordAction(this.applyModeration(ref, true, true, 0, false))
  }

  unflagPost(ref: bytes<32>): void {
    loggedAssert(this.moderators(Txn.sender).exists, errNotAModerator)
    this.recordAction(this.applyModeration(ref, true, false, 0, false))
  }

  setModeratorContentFlags(ref: bytes<32>, flags: uint64): void {
    loggedAssert(this.moderators(Txn.sender).exists, errNotAModerator)
    this.recordAction(this.applyModeration(ref, false, false, flags, true))
  }

  // Internal helper: reads the current post state so that we can forward both
  // `againstContentPolicy` and `moderatorFlags` to the consolidated
  // `setPostModeration` endpoint on `AkitaSocial` (which stores both on the
  // post in one inner-txn call). `updateFlagged` / `updateFlags` tell us
  // which of the two fields the caller is actually changing — the other
  // field is preserved from the current post value. Returns the change's effect on the
  // moderator's count (see recordAction).
  private applyModeration(
    ref: bytes<32>,
    updateFlagged: boolean,
    flaggedValue: boolean,
    flagsValue: uint64,
    updateFlags: boolean,
  ): uint64 {
    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    const post = abiCall<typeof AkitaSocial.prototype.getPost>({
      appId: social,
      args: [ref]
    }).returnValue

    const nextFlagged: boolean = updateFlagged ? flaggedValue : post.againstContentPolicy
    const nextFlags: uint64 = updateFlags ? flagsValue : post.moderatorFlags

    abiCall<typeof AkitaSocial.prototype.setPostModeration>({
      appId: social,
      args: [ref, nextFlagged, nextFlags]
    })

    if (updateFlagged && nextFlagged !== post.againstContentPolicy) {
      return nextFlagged ? ModerationEffectForward : ModerationEffectReversal
    }
    if (updateFlags && (nextFlags === 0) !== (post.moderatorFlags === 0)) {
      return nextFlags !== 0 ? ModerationEffectForward : ModerationEffectReversal
    }
    return ModerationEffectNone
  }

  addAction(actionAppID: uint64, content: CID): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    loggedAssert(!this.actions(actionAppID).exists, errAlreadyAnAction)
    this.actions(actionAppID).value = { content }
  }

  removeAction(actionAppID: uint64): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, errNotAkitaDao)
    loggedAssert(this.actions(actionAppID).exists, errAlreadyAnAction)
    this.actions(actionAppID).delete()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  @abimethod({ readonly: true })
  isBanned(account: Account): boolean {
    return this.banned(account).exists && this.banned(account).value > Global.latestTimestamp
  }

  @abimethod({ readonly: true })
  isModerator(account: Account): boolean {
    return this.moderators(account).exists
  }

  @abimethod({ readonly: true })
  moderatorMeta(user: Account): { exists: boolean; lastActive: uint64 } {
    if (this.moderators(user).exists) {
      return {
        exists: true,
        lastActive: this.moderators(user).value
      }
    }
    return { exists: false, lastActive: 0 }
  }

  /** Counted actions in the current epoch (`actions`) and the epoch before it (`previousActions`) */
  @abimethod({ readonly: true })
  moderatorActivity(user: Account): ModeratorActivityInfo {
    const epoch: uint64 = Global.latestTimestamp / ModeratorActivityEpoch
    if (!this.moderators(user).exists) {
      return { exists: false, lastActive: 0, epoch, actions: 0, previousActions: 0 }
    }

    let actions: uint64 = 0
    let previousActions: uint64 = 0
    if (this.activity(user).exists) {
      const record = clone(this.activity(user).value)
      if (record.epoch === epoch) {
        actions = record.actions
        previousActions = record.previousActions
      } else if (record.epoch + 1 === epoch) {
        previousActions = record.actions
      }
    }
    return { exists: true, lastActive: this.moderators(user).value, epoch, actions, previousActions }
  }
}
