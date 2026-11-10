import { abimethod, Account, Application, BoxMap, Bytes, bytes, Global, gtxn, itxn, loggedAssert, Txn, uint64 } from "@algorandfoundation/algorand-typescript"
import { abiCall } from "@algorandfoundation/algorand-typescript/arc4"
import { classes } from 'polytype'
import { UpgradeableAkitaBaseContract } from "../utils/base-contracts/upgradeable"
import { assertBoundPayment, gateCheck, gateCheckCtx, getAkitaSocialAppList, principalOf } from "../utils/functions"
import { gateCtx } from "../utils/principal"
import { BaseSocial } from "./base"
import { AkitaSocialBoxPrefixBlocks, AkitaSocialBoxPrefixFollows } from "./constants"
import type { AkitaSocial } from "./contract.algo"
import type { AkitaSocialModeration } from "./moderation.algo"
import { errAlreadyBlocked, errAlreadyFollowing, errAutomatedAccount, errBanned, errBlocked, errFailedGate, errHasGate, errNotFollowing, errSelfBlock, errSelfFollow, errUserNotBlocked } from "./errors"
import { BlockListKey, FollowsKey, MetaValue } from "./types"

export class AkitaSocialGraph extends classes(BaseSocial, UpgradeableAkitaBaseContract) {

  /**
   * Create method to initialize the contract with the DAO reference
   * @param akitaDao The Akita DAO app ID
   * @param version The version string for this contract
   */
  @abimethod({ onCreate: 'require' })
  create(akitaDao: Application, version: string): void {
    this.akitaDAO.value = akitaDao
    this.version.value = version
  }

  /** Who follows who - key is {user, follower}, value is the follow index */
  follows = BoxMap<FollowsKey, uint64>({ keyPrefix: AkitaSocialBoxPrefixFollows })
  /** All the blocks on the network */
  blocks = BoxMap<BlockListKey, bytes<0>>({ keyPrefix: AkitaSocialBoxPrefixBlocks })

  private isBanned(account: Account): boolean {
    const { moderation } = getAkitaSocialAppList(this.akitaDAO.value)
    return abiCall<typeof AkitaSocialModeration.prototype.isBanned>({
      appId: moderation,
      args: [account]
    }).returnValue
  }

  // creates a blocklist key
  private blk(userAddress: Account, blockedAddress: Account): BlockListKey {
    const user = userAddress.bytes.slice(0, 16).toFixed({ length: 16 })
    const blocked = blockedAddress.bytes.slice(0, 16).toFixed({ length: 16 })
    return { user, blocked }
  }

  // creates a follows key from user (being followed) and follower addresses
  private flw(user: Account, follower: Account): FollowsKey {
    const userBytes = user.bytes.slice(0, 16).toFixed({ length: 16 })
    const followerBytes = follower.bytes.slice(0, 16).toFixed({ length: 16 })
    return { user: userBytes, follower: followerBytes }
  }

  private getMeta(address: Account): MetaValue {
    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    return abiCall<typeof AkitaSocial.prototype.getMeta>({
      appId: social,
      args: [address]
    }).returnValue
  }

  private updateFollowerMeta(account: Account, newFollowerIndex: uint64, newFollowerCount: uint64): void {
    const { social } = getAkitaSocialAppList(this.akitaDAO.value)
    abiCall<typeof AkitaSocial.prototype.updateFollowerMeta>({
      appId: social,
      args: [account, newFollowerIndex, newFollowerCount]
    })
  }

  private createFollow(sender: Account, address: Account): void {
    loggedAssert(!this.isBanned(sender), errBanned)
    loggedAssert(!this.isBlocked(address, sender), errBlocked)
    loggedAssert(sender !== address, errSelfFollow)
    
    // Check if the follower is automated - automated accounts can't follow
    const { automated } = this.getMeta(sender)
    loggedAssert(!automated, errAutomatedAccount)

    // Create the follows key using user-follower pair
    const followsKey = this.flw(address, sender)
    
    // Check if already following
    loggedAssert(!this.follows(followsKey).exists, errAlreadyFollowing)

    // Get the follower tracking info from the account being followed (address)
    const { followerCount, followerIndex } = this.getMeta(address)

    // Store the follow with the index as the value
    this.follows(followsKey).value = followerIndex + 1

    this.updateFollowerMeta(address, followerIndex + 1, followerCount + 1)
  }

  // we dont remove followers because that requires us to know the index
  // instead, blocking supersedes following
  block(mbrPayment: gtxn.PaymentTxn, address: Account): void {
    loggedAssert(!this.isBanned(Txn.sender), errBanned)
    loggedAssert(Txn.sender !== address, errSelfBlock)

    assertBoundPayment(mbrPayment, Txn.sender, Global.currentApplicationAddress, this.mbr(Bytes(''), '', Bytes('')).blocks)

    const blocksKey = this.blk(Txn.sender, address)
    // `create()` is a no-op on an existing box, which would keep a second payment with no
    // matching refund
    loggedAssert(!this.blocks(blocksKey).exists, errAlreadyBlocked)
    this.blocks(blocksKey).create()
  }

  // Withdrawal path: deliberately open to banned users so their MBR is never locked.
  unblock(address: Account): void {
    const blocksKey = this.blk(Txn.sender, address)
    loggedAssert(this.blocks(blocksKey).exists, errUserNotBlocked)
    this.blocks(blocksKey).delete()

    itxn
      .payment({
        receiver: Txn.sender,
        amount: this.mbr(Bytes(''), '', Bytes('')).blocks
      })
      .submit()
  }

  /**
   * Follow `address` through its follow gate. `wallet` is the caller's wallet hint (LAST argument,
   * 0 = act as the sender): it is verified (`principalOf`, a wrong hint reverts) and the gate is
   * checked against the verified context (`Gate.mustCheckFor`, principal-resolution spec §6.3, Q4).
   * The follow itself stays keyed by the spender (Q5).
   */
  gatedFollow(
    mbrPayment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    address: Account,
    wallet: uint64
  ): void {
    const p = principalOf(this.akitaDAO.value, wallet)
    const { followGateID } = this.getMeta(address)
    loggedAssert(gateCheckCtx(gateTxn, this.akitaDAO.value, gateCtx(p), followGateID), errFailedGate)

    this.followImpl(mbrPayment, address)
  }

  /** LEGACY shim (pre-hint selector, deployed semantics: Gate.mustCheck on Txn.sender). Phase 4 removes it. */
  @abimethod({ name: 'gatedFollow' })
  legacyGatedFollow(
    mbrPayment: gtxn.PaymentTxn,
    gateTxn: gtxn.ApplicationCallTxn,
    address: Account
  ): void {
    const { followGateID } = this.getMeta(address)
    loggedAssert(gateCheck(gateTxn, this.akitaDAO.value, Txn.sender, followGateID), errFailedGate)

    this.followImpl(mbrPayment, address)
  }

  private followImpl(mbrPayment: gtxn.PaymentTxn, address: Account): void {
    const { follows } = this.mbr(Bytes(''), '', Bytes(''))
    assertBoundPayment(mbrPayment, Txn.sender, Global.currentApplicationAddress, follows)

    this.createFollow(Txn.sender, address)
  }

  follow(mbrPayment: gtxn.PaymentTxn, address: Account): void {
    const { followGateID } = this.getMeta(address)
    loggedAssert(followGateID === 0, errHasGate)

    this.followImpl(mbrPayment, address)
  }

  // Withdrawal path: deliberately open to banned users so their MBR is never locked.
  unfollow(address: Account): void {
    // Create the follows key using user-follower pair
    const followsKey = this.flw(address, Txn.sender)
    // Check if actually following
    loggedAssert(this.follows(followsKey).exists, errNotFollowing)

    const { followerCount, followerIndex } = this.getMeta(address)

    this.updateFollowerMeta(address, followerIndex, followerCount - 1)
    this.follows(followsKey).delete()

    itxn
      .payment({
        receiver: Txn.sender,
        amount: this.mbr(Bytes(''), '', Bytes('')).follows
      })
      .submit()
  }

  @abimethod({ readonly: true })
  isBlocked(user: Account, blocked: Account): boolean {
    const blocksKey = this.blk(user, blocked)
    return this.blocks(blocksKey).exists
  }

  @abimethod({ readonly: true })
  isFollowing(follower: Account, user: Account): boolean {
    const followsKey = this.flw(user, follower)
    return this.follows(followsKey).exists
  }

  @abimethod({ readonly: true })
  getFollowIndex(follower: Account, user: Account): uint64 {
    const followsKey = this.flw(user, follower)
    return this.follows(followsKey).value
  }
}