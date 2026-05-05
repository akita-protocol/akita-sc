import { Account, Application, BoxMap, bytes, Global, loggedAssert, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/base'
import { getAkitaSocialAppList } from '../utils/functions'
import { CID } from '../utils/types/base'
import { AkitaSocialBoxPrefixActions, AkitaSocialBoxPrefixBanned, AkitaSocialBoxPrefixModerators } from './constants'
import { ERR_ALREADY_A_MODERATOR, ERR_ALREADY_AN_ACTION, ERR_ALREADY_BANNED, ERR_NOT_A_MODERATOR, ERR_NOT_AKITA_DAO, ERR_USER_NOT_BANNED } from './errors'
import { Action } from './types'

// CONTRACT IMPORTS
import type { AkitaSocial } from './contract.algo'

export class AkitaSocialModeration extends UpgradeableAkitaBaseContract {

  // BOXES ----------------------------------------------------------------------------------------

  /** Who is a moderator */
  moderators = BoxMap<Account, uint64>({ keyPrefix: AkitaSocialBoxPrefixModerators })
  /** Who is banned and when they can return */
  banned = BoxMap<Account, uint64>({ keyPrefix: AkitaSocialBoxPrefixBanned })
  /** Actions usable on an akita post */
  actions = BoxMap<uint64, Action>({ keyPrefix: AkitaSocialBoxPrefixActions })

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
  }

  // MODERATION METHODS ---------------------------------------------------------------------------

  addModerator(address: Account): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)
    loggedAssert(!this.moderators(address).exists, ERR_ALREADY_A_MODERATOR)
    this.moderators(address).create()
  }

  removeModerator(address: Account): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)
    loggedAssert(this.moderators(address).exists, ERR_NOT_A_MODERATOR)
    this.moderators(address).delete()
  }

  ban(address: Account, expiration: uint64): void {
    loggedAssert(this.moderators(Txn.sender).exists, ERR_NOT_A_MODERATOR)
    loggedAssert(!this.banned(address).exists, ERR_ALREADY_BANNED)
    this.banned(address).value = expiration
  }

  unban(address: Account): void {
    loggedAssert(this.moderators(Txn.sender).exists, ERR_NOT_A_MODERATOR)
    loggedAssert(this.banned(address).exists, ERR_USER_NOT_BANNED)
    this.banned(address).delete()
  }

  flagPost(ref: bytes<32>): void {
    loggedAssert(this.moderators(Txn.sender).exists, ERR_NOT_A_MODERATOR)
    this.applyModeration(ref, true, true, 0, false)
  }

  unflagPost(ref: bytes<32>): void {
    loggedAssert(this.moderators(Txn.sender).exists, ERR_NOT_A_MODERATOR)
    this.applyModeration(ref, true, false, 0, false)
  }

  setModeratorContentFlags(ref: bytes<32>, flags: uint64): void {
    loggedAssert(this.moderators(Txn.sender).exists, ERR_NOT_A_MODERATOR)
    this.applyModeration(ref, false, false, flags, true)
  }

  // Internal helper: reads the current post state so that we can forward both
  // `againstContentPolicy` and `moderatorFlags` to the consolidated
  // `setPostModeration` endpoint on `AkitaSocial` (which stores both on the
  // post in one inner-txn call). `updateFlagged` / `updateFlags` tell us
  // which of the two fields the caller is actually changing — the other
  // field is preserved from the current post value.
  private applyModeration(
    ref: bytes<32>,
    updateFlagged: boolean,
    flaggedValue: boolean,
    flagsValue: uint64,
    updateFlags: boolean,
  ): void {
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
  }

  addAction(actionAppID: uint64, content: CID): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)
    loggedAssert(!this.actions(actionAppID).exists, ERR_ALREADY_AN_ACTION)
    this.actions(actionAppID).value = { content }
  }

  removeAction(actionAppID: uint64): void {
    loggedAssert(Txn.sender === this.getAkitaDAOWallet().address, ERR_NOT_AKITA_DAO)
    loggedAssert(this.actions(actionAppID).exists, ERR_ALREADY_AN_ACTION)
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
}

