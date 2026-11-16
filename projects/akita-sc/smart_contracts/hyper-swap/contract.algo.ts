import { Account, Application, Asset, BoxMap, bytes, Bytes, Global, GlobalState, gtxn, itxn, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { AssetHolding, itob, sha256 } from '@algorandfoundation/algorand-typescript/op'
import { classes } from 'polytype'
import { MerkleTreeTypeTrade } from '../meta/constants'
import { arc58OptInAndSend, getAkitaAppList, getPluginAppList, assertPlainPayment, assertSafeAssetTransfer, canReceiveAlgo } from '../utils/functions'
import { RefundValue } from '../utils/types/mbr'
import { Proof } from '../utils/types/merkles'
import {
  HyperSwapBoxPrefixOfferRefunds,
  HyperSwapBoxPrefixOfferRegistry,
  HyperSwapBoxPrefixHashes,
  HyperSwapBoxPrefixOffers,
  HyperSwapBoxPrefixParticipants,
  HyperSwapGlobalStateKeyOfferCursor,
  MaxOfferDuration,
  STATE_CANCEL_COMPLETED,
  STATE_CANCELLED,
  STATE_COMPLETED,
  STATE_DISBURSING,
  STATE_ESCROWING,
  STATE_OFFERED,
} from './constants'
import {
  errAlreadyAccepted,
  errBadRoots,
  errCantVerifyLeaf,
  errInvalidPayment,
  errInvalidState,
  errInvalidTransfer,
  errLeafAlreadyEscrowed,
  errLeafNotEscrowed,
  errNotAParticipant,
  errNotAccepted,
  errNothingToWithdraw,
  errOfferExpired,
  errOfferNotFound,
  errOfferTooLong,
  errParticipantNotFound,
  errParticipantsNotCleaned,
  errReceiverNotOptedIn,
  errReceiverWalletMismatch,
  errTermsMismatch,
} from './errors'
import { HashKey, OfferValue, ParticipantKey } from './types'
import { CallerTypeGlobal } from '../arc58/account/types'

// CONTRACT IMPORTS
import type { AbstractedAccount } from '../arc58/account/contract.algo'
import type { Meta } from '../meta/contract.algo'
import { UpgradeableAkitaBaseContract } from '../utils/base-contracts/upgradeable'
import { ContractWithOptIn } from '../utils/base-contracts/optin'
import { BaseHyperSwap } from './base'


export class HyperSwap extends classes(BaseHyperSwap, UpgradeableAkitaBaseContract, ContractWithOptIn) {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  /** global counter for offers */
  offerCursor = GlobalState<uint64>({ key: HyperSwapGlobalStateKeyOfferCursor })

  // BOXES ----------------------------------------------------------------------------------------

  /** map of hyper swap offers */
  offers = BoxMap<uint64, OfferValue>({ keyPrefix: HyperSwapBoxPrefixOffers })
  /** map of the participants in each swap */
  participants = BoxMap<ParticipantKey, RefundValue>({ keyPrefix: HyperSwapBoxPrefixParticipants })
  /** map of merkle tree hashes during escrow & disbursal phases */
  hashes = BoxMap<HashKey, RefundValue>({ keyPrefix: HyperSwapBoxPrefixHashes })

  /** Original offer/root deposit, refunded after their storage is deleted. */
  offerRefunds = BoxMap<uint64, RefundValue>({ keyPrefix: HyperSwapBoxPrefixOfferRefunds })

  /**
   * Meta registry that holds the offer's roots, pinned at creation. Later DAO registry changes
   * cannot strand an offer's proofs or root deposits.
   */
  offerRegistry = BoxMap<uint64, uint64>({ keyPrefix: HyperSwapBoxPrefixOfferRegistry })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  /** Opaque 9-byte name: tree tag + uint64 offer ID, carried by the legacy string ABI. */
  private rootName(id: uint64, participants: boolean): string {
    return String((participants ? Bytes('p') : Bytes('t')).concat(itob(id)))
  }

  private newOfferID(): uint64 {
    const id = this.offerCursor.value
    this.offerCursor.value += 1
    return id
  }

  /**
   * Commitment to the immutable terms of an offer. Every accepting participant must supply it,
   * so nobody can join an offer whose leaf count, roots or expiration differ from what their
   * client checked against the full leaf and participant lists.
   */
  private terms(id: uint64): bytes<32> {
    const { root, leaves, participantsRoot, participantsLeaves, expiration } = this.offers(id).value
    return sha256(Bytes`${itob(id)}${root}${itob(leaves)}${participantsRoot}${itob(participantsLeaves)}${itob(expiration)}`)
  }

  /** Verifies a leaf against one of the offer's roots in the registry pinned at creation. */
  private verifyLeaf(id: uint64, participants: boolean, leaf: bytes<32>, proof: Proof): boolean {
    return abiCall<typeof Meta.prototype.verify>({
      appId: this.offerRegistry(id).value,
      args: [
        Global.currentApplicationAddress,
        this.rootName(id, participants),
        leaf,
        proof,
        MerkleTreeTypeTrade
      ],
    }).returnValue
  }

  /**
   * Returns a storage deposit to the account that paid it (AUD-C22). A payor whose account has
   * closed cannot take a refund below the minimum balance, and a failed refund must never hold up
   * a payout, a withdrawal or another account's cleanup. The deposit then goes to `owner`, the
   * participant the record belongs to, and stays with the contract when neither can take it.
   */
  private refundStorage(payor: Account, owner: Account, amount: uint64): void {
    if (canReceiveAlgo(payor, amount)) {
      itxn.payment({ receiver: payor, amount }).submit()
    } else if (canReceiveAlgo(owner, amount)) {
      itxn.payment({ receiver: owner, amount }).submit()
    }
  }

  /**
   * Releases one escrowed leaf. The leaf hash names its funder (`from`); the hash box existing
   * proves the leaf was verified and funded during escrow.
   */
  private release(id: uint64, from: Account, receiverWallet: uint64, receiver: Account, asset: uint64, amount: uint64): void {
    // ensure the offer exists
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    const { state, escrowed } = this.offers(id).value
    // ensure we are in the disbursing stage (every agreed leaf is funded)
    loggedAssert(state === STATE_DISBURSING, errInvalidState)

    // ensure this leaf is escrowed
    const hash = sha256(sha256(Bytes`${from.bytes}${receiver.bytes}${itob(asset)}${itob(amount)}`))
    const hashKey: HashKey = { id, hash }
    loggedAssert(this.hashes(hashKey).exists, errLeafNotEscrowed)

    let { payor, amount: refundAmount } = this.hashes(hashKey).value
    this.hashes(hashKey).delete()

    // process the transfer
    if (asset === 0) {
      // ALGO transfer - direct payment
      itxn
        .payment({ amount, receiver })
        .submit()

      // refund the account that covered the MBR
      this.refundStorage(payor, from, refundAmount)
    } else {
      // ASA transfer - check if receiver needs opt-in
      const [, isOptedIn] = AssetHolding.assetBalance(receiver, asset)

      if (!isOptedIn) {
        // receiver not opted in - try ARC58 opt-in if they have an ARC58 wallet
        loggedAssert(receiverWallet !== 0, errReceiverNotOptedIn)
        loggedAssert(Application(receiverWallet).address === receiver, errReceiverWalletMismatch)
        // ensure sufficient MBR was escrowed to cover the opt-in cost
        loggedAssert(refundAmount >= Global.assetOptInMinBalance, errReceiverNotOptedIn)

        // verify the ARC58 wallet allows opt-in from this plugin
        const optinPlugin = getPluginAppList(this.akitaDAO.value).optin
        const canOptIn = abiCall<typeof AbstractedAccount.prototype.arc58_canCall>({
          appId: receiverWallet,
          args: [
            optinPlugin,
            CallerTypeGlobal,
            Global.currentApplicationAddress,
            '',
            op.bzero(4).toFixed({ length: 4 }),
          ]
        }).returnValue

        loggedAssert(canOptIn, errReceiverNotOptedIn)

        // use escrowed MBR to opt in the receiver via ARC58
        arc58OptInAndSend(this.akitaDAO.value, Application(receiverWallet), '', [asset], [amount])

        // refund remaining MBR (total - opt-in cost) to payor
        const optInCost = Global.assetOptInMinBalance
        if (refundAmount > optInCost) {
          this.refundStorage(payor, from, refundAmount - optInCost)
        }
      } else {
        // receiver is opted in - direct asset transfer
        itxn
          .assetTransfer({
            xferAsset: asset,
            assetAmount: amount,
            assetReceiver: receiver,
          })
          .submit()

        // refund the full MBR to payor
        this.refundStorage(payor, from, refundAmount)
      }
    }

    const newEscrowed: uint64 = escrowed - 1
    this.offers(id).value.escrowed = newEscrowed
    // if we disbursed all needed assets switch to the completed state
    if (newEscrowed === 0) {
      this.offers(id).value.state = STATE_COMPLETED
    }
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: Application): void {
    this.version.value = version
    this.akitaDAO.value = akitaDAO
    this.offerCursor.value = 0
  }

  // HYPER SWAP METHODS ---------------------------------------------------------------------------

  /**
   * Creates a merkle tree based atomic payment/xfer group
   *
   * @param root the merkle tree root of trades consisting of from address, recipient address, asset id & amount
   * @param leaves the number of leaves in the tree
   * @param participantsRoot the merkle tree root of participating addresses
   * @param participantLeaves the number of leaves in the participant tree
   * @param expiration the unix timestamp that the offer auto-expires at; at most `MaxOfferDuration` from now
   */
  offer(
    payment: gtxn.PaymentTxn,
    root: bytes<32>,
    leaves: uint64,
    participantsRoot: bytes<32>,
    participantsLeaves: uint64,
    expiration: uint64
  ) {
    loggedAssert(root !== participantsRoot, errBadRoots)
    loggedAssert(expiration > Global.latestTimestamp, errOfferExpired)
    // A bounded window caps how long counterparties' escrow can be locked.
    loggedAssert(expiration - Global.latestTimestamp <= MaxOfferDuration, errOfferTooLong)

    const costs = this.mbr()
    const metaMerklesCost: uint64 = costs.mm.root + costs.mm.data
    const hyperSwapOfferMBRAmount: uint64 = costs.offers + costs.participants + (metaMerklesCost * 2)
    const payor = payment.sender

    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === hyperSwapOfferMBRAmount, errInvalidPayment)

    const id = this.newOfferID()
    const metaMerklesAppID = getAkitaAppList(this.akitaDAO.value).metaMerkles
    this.offerRegistry(id).value = metaMerklesAppID

    abiCall<typeof Meta.prototype.addRoot>({
      appId: metaMerklesAppID,
      args: [
        itxn.payment({
          receiver: Application(metaMerklesAppID).address,
          amount: metaMerklesCost,
        }),
        this.rootName(id, false),
        root,
        MerkleTreeTypeTrade
      ],
    })

    // add the participants root to the meta merkle contract
    abiCall<typeof Meta.prototype.addRoot>({
      appId: metaMerklesAppID,
      args: [
        itxn.payment({
          receiver: Application(metaMerklesAppID).address,
          amount: metaMerklesCost,
        }),
        this.rootName(id, true),
        participantsRoot,
        MerkleTreeTypeTrade
      ],
    })

    // automatically set our sender as the first accepted participant
    this.participants({ id, address: Txn.sender }).value = { payor, amount: costs.participants }
    this.offerRefunds(id).value = { payor, amount: costs.offers + (metaMerklesCost * 2) }

    // create the offering box & default state
    this.offers(id).value = {
      state: participantsLeaves === 1 ? STATE_ESCROWING : STATE_OFFERED,
      root,
      leaves,
      escrowed: 0,
      participantsRoot,
      participantsLeaves,
      acceptances: 1,
      expiration,
    }
  }

  /**
   * Accepts an offer
   *
   * @param mbrPayment the payment to cover the MBR
   * @param id the id of the offer being accepted
   * @param proof the bytes32 array proof of inclusion in the participants list
   * @param terms `offerTerms(id)` as computed by the participant from the full leaf and participant lists
   */
  accept(mbrPayment: gtxn.PaymentTxn, id: uint64, proof: Proof, terms: bytes<32>) {
    // ensure the offer exists
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    // the participant agrees to exactly these roots, counts and expiration
    loggedAssert(terms === this.terms(id), errTermsMismatch)
    const { state, expiration, acceptances, participantsLeaves } = this.offers(id).value
    // ensure we are still in the collecting acceptances stage
    loggedAssert(state === STATE_OFFERED, errInvalidState)
    loggedAssert(expiration > Global.latestTimestamp, errOfferExpired)
    // ensure they are a participant
    loggedAssert(this.verifyLeaf(id, true, sha256(sha256(Txn.sender.bytes)), proof), errNotAParticipant)

    // ensure they haven't already accepted
    const senderParticipantKey = { id, address: Txn.sender }
    loggedAssert(!this.participants(senderParticipantKey).exists, errAlreadyAccepted)
    // increment the acceptance count
    const newAcceptances: uint64 = acceptances + 1
    this.offers(id).value.acceptances = newAcceptances

    const costs = this.mbr()

    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === costs.participants, errInvalidPayment)

    // flag this participant as accepted
    this.participants(senderParticipantKey).value = {
      payor: mbrPayment.sender,
      amount: costs.participants
    }
    // if we collected all needed acceptances switch to the gathering state
    if (participantsLeaves === newAcceptances) {
      this.offers(id).value.state = STATE_ESCROWING
    }
  }

  /**
   * Escrows the assets in the trade for a given leaf in the tree
   *
   * @param payment the leaf's ALGO principal plus the hash MBR, from any payer
   * @param id the id of the offer
   * @param receiver the recipient in the offer leaf
   * @param amount the amount in the offer leaf
   * @param proof the proof to verify the details are part of the tree
   */
  escrow(payment: gtxn.PaymentTxn, id: uint64, receiver: Account, amount: uint64, proof: Proof) {
    // ensure the offer exists
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    const { state, escrowed, leaves, expiration } = this.offers(id).value
    // ensure we are still in the escrowing stage
    loggedAssert(state === STATE_ESCROWING, errInvalidState)
    // ensure the offer hasn't expired
    loggedAssert(expiration > Global.latestTimestamp, errOfferExpired)
    // ensure they are a participant
    const senderParticipantKey = { id, address: Txn.sender }
    loggedAssert(this.participants(senderParticipantKey).exists, errNotAParticipant)
    // ensure this leaf has not already been escrowed
    const hash = sha256(sha256(Bytes`${Txn.sender.bytes}${receiver.bytes}${itob(0)}${itob(amount)}`))
    const hashKey: HashKey = { id, hash }
    loggedAssert(!this.hashes(hashKey).exists, errLeafAlreadyEscrowed)
    // verify the leaf
    loggedAssert(this.verifyLeaf(id, false, hash, proof), errCantVerifyLeaf)

    const costs = this.mbr()

    // principal and hash MBR arrive in one payment, from any payer (no close-out or rekey); a
    // cancelled leaf returns the principal to the participant and the MBR to the payer
    assertPlainPayment(payment)
    loggedAssert(payment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(payment.amount === amount + costs.hashes, errInvalidPayment)

    // add the leaf to the our escrowed list
    this.hashes(hashKey).value = {
      payor: payment.sender,
      amount: costs.hashes
    }

    const newEscrowed: uint64 = escrowed + 1
    this.offers(id).value.escrowed = newEscrowed
    // if we collected all needed assets switch to the disbursement state
    // increment our escrow count
    if (leaves === newEscrowed) {
      this.offers(id).value.state = STATE_DISBURSING
    }
  }

  /**
   * Escrows the assets in the trade for a given leaf in the tree
   * @param mbrPayment the payment to cover the MBR
   * @param assetXfer the asset transfer to escrow the asa, sent by the participant (no clawback)
   * @param id the id of the offer
   * @param receiver the recipient in the offer leaf
   * @param asset the asset in the offer leaf
   * @param amount the amount in the offer leaf
   * @param proof the proof to verify the details are part of the tree
   */
  escrowAsa(
    mbrPayment: gtxn.PaymentTxn,
    assetXfer: gtxn.AssetTransferTxn,
    id: uint64,
    receiver: Account,
    asset: uint64,
    amount: uint64,
    proof: Proof
  ) {
    // ensure the offer exists
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    const { state, escrowed, leaves, expiration } = this.offers(id).value
    // ensure we are still in the escrowing stage
    loggedAssert(state === STATE_ESCROWING, errInvalidState)
    // ensure the offer hasn't expired
    loggedAssert(expiration > Global.latestTimestamp, errOfferExpired)
    // ensure they are a participant
    const senderParticipantKey = { id, address: Txn.sender }
    loggedAssert(this.participants(senderParticipantKey).exists, errNotAParticipant)
    // ensure this leaf has not already been escrowed
    const hash = sha256(sha256(Bytes`${Txn.sender.bytes}${receiver.bytes}${itob(asset)}${itob(amount)}`))
    const hashKey: HashKey = { id, hash }
    loggedAssert(!this.hashes(hashKey).exists, errLeafAlreadyEscrowed)
    // verify the leaf
    loggedAssert(this.verifyLeaf(id, false, hash, proof), errCantVerifyLeaf)

    // track the mbr the app / receiver need
    const costs = this.mbr()
    let mbrAmount = costs.hashes

    // collect opt-in MBR if receiver is not opted into the asset
    if (!receiver.isOptedIn(Asset(asset))) {
      mbrAmount += Global.assetOptInMinBalance
    }

    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === mbrAmount, errInvalidPayment)

    // the principal is the leaf funder's own holding (no clawback, close-out or rekey)
    assertSafeAssetTransfer(assetXfer, Txn.sender)
    loggedAssert(assetXfer.assetReceiver === Global.currentApplicationAddress, errInvalidTransfer)
    loggedAssert(assetXfer.xferAsset === Asset(asset), errInvalidTransfer)
    loggedAssert(assetXfer.assetAmount === amount, errInvalidTransfer)

    // add the leaf to the our escrowed list
    this.hashes(hashKey).value = {
      payor: mbrPayment.sender,
      amount: mbrAmount
    }
    // increment our escrow count
    const newEscrowed: uint64 = escrowed + 1
    this.offers(id).value.escrowed = newEscrowed
    // if we collected all needed assets switch to the disbursement state
    if (leaves === newEscrowed) {
      this.offers(id).value.state = STATE_DISBURSING
    }
  }

  /**
   * Disburses the caller's own escrowed leaf. Kept for the existing plugin ABI; equivalent to
   * `disburseFrom(id, Txn.sender, ...)`.
   *
   * @param id the id of the offer
   * @param receiverWallet the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)
   * @param receiver the recipient address in the leaf
   * @param asset the asset being transferred
   * @param amount the amount being transferred
   */
  disburse(id: uint64, receiverWallet: uint64, receiver: Account, asset: uint64, amount: uint64) {
    this.release(id, Txn.sender, receiverWallet, receiver, asset, amount)
  }

  /**
   * Disburses any escrowed leaf. Permissionless: once every agreed leaf is funded, anyone can
   * complete the swap, so no participant can withhold its own leaf.
   *
   * @param id the id of the offer
   * @param from the funder (sender) in the leaf
   * @param receiverWallet the receiver's ARC58 wallet app id (0 if not an ARC58 wallet)
   * @param receiver the recipient address in the leaf
   * @param asset the asset being transferred
   * @param amount the amount being transferred
   */
  disburseFrom(id: uint64, from: Account, receiverWallet: uint64, receiver: Account, asset: uint64, amount: uint64) {
    this.release(id, from, receiverWallet, receiver, asset, amount)
  }

  /**
   * Cancels an offer. Allowed while collecting acceptances or escrow, and in DISBURSING only after
   * expiration and only if no leaf has been disbursed yet (`escrowed === leaves`), so a swap is
   * either completed or fully unwound.
   *
   * @param id the id of the offer being cancelled
   * @param proof unused; kept for ABI compatibility (membership was proven at accept)
   */
  cancel(id: uint64, proof: Proof) {
    // ensure the offer exists
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    const { state, escrowed, leaves, expiration } = this.offers(id).value
    loggedAssert(
      state === STATE_OFFERED || state === STATE_ESCROWING ||
      (state === STATE_DISBURSING && escrowed === leaves && expiration <= Global.latestTimestamp),
      errInvalidState
    )

    // ensure the sender has accepted this offer (the box exists only after a verified accept,
    // or for the offeror)
    const senderParticipantKey = { id, address: Txn.sender }
    loggedAssert(this.participants(senderParticipantKey).exists, errNotAccepted)

    // set the state to cancelled (or cancel_completed if nothing is escrowed)
    if (escrowed === 0) {
      this.offers(id).value.state = STATE_CANCEL_COMPLETED
    } else {
      this.offers(id).value.state = STATE_CANCELLED
    }
  }

  /**
   * Withdraws your assets from a cancelled swap if they're escrowed
   *
   * @param id the id of the cancelled offer
   * @param receiver the receiver of the leaf's swap
   * @param asset the asset of the leaf's swap
   * @param amount the amount of the leaf's swap
   * @param proof unused; kept for ABI compatibility (the hash box proves a verified escrow)
   */
  withdraw(id: uint64, receiver: Account, asset: uint64, amount: uint64, proof: Proof) {
    // ensure the offer exists
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    const { state, escrowed } = this.offers(id).value
    // ensure the offer is cancelled
    loggedAssert(state === STATE_CANCELLED, errInvalidState)
    // ensure the escrow count isn't zero
    loggedAssert(escrowed > 0, errNothingToWithdraw)
    // ensure this leaf is still escrowed; the hash names the caller as its funder
    const hash = sha256(sha256(Bytes`${Txn.sender.bytes}${receiver.bytes}${itob(asset)}${itob(amount)}`))
    const hashKey: HashKey = { id, hash }
    loggedAssert(this.hashes(hashKey).exists, errLeafNotEscrowed)

    let { payor, amount: refundAmount } = this.hashes(hashKey).value
    this.hashes(hashKey).delete()

    if (asset === 0) {
      itxn
        .payment({
          amount: amount,
          receiver: Txn.sender,
        })
        .submit()
    } else {
      itxn
        .assetTransfer({
          xferAsset: asset,
          assetAmount: amount,
          assetReceiver: Txn.sender,
        })
        .submit()
    }

    this.refundStorage(payor, Txn.sender, refundAmount)

    // decrement our escrow count
    const newEscrowed: uint64 = escrowed - 1
    // mark the cancelled offer as done if theres no more escrowed assets
    if (newEscrowed === 0) {
      this.offers(id).value.escrowed = newEscrowed
      this.offers(id).value.state = STATE_CANCEL_COMPLETED
    } else {
      this.offers(id).value.escrowed = newEscrowed
    }
  }

  // CLEANUP METHODS --------------------------------------------------------------------------------

  /**
   * Cleans up participant box and refunds MBR
   * Can only be called when offer is completed, cancelled+completed, or expired
   *
   * @param id the id of the offer
   * @param participant the participant address to clean up
   */
  cleanupParticipant(id: uint64, participant: Account) {
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    const { state, expiration, acceptances, escrowed } = this.offers(id).value

    // can only cleanup if completed, cancel_completed, or expired (while in OFFERED or ESCROWING state)
    const isCompleted = state === STATE_COMPLETED || state === STATE_CANCEL_COMPLETED
    const isExpired = (state === STATE_OFFERED || state === STATE_ESCROWING) && expiration <= Global.latestTimestamp && escrowed === 0
    loggedAssert(isCompleted || isExpired, errInvalidState)

    const participantKey: ParticipantKey = { id, address: participant }
    loggedAssert(this.participants(participantKey).exists, errParticipantNotFound)

    const { payor, amount } = this.participants(participantKey).value
    this.participants(participantKey).delete()

    // decrement acceptances to track cleanup progress
    this.offers(id).value.acceptances = acceptances - 1

    // refund the MBR to the original payor
    this.refundStorage(payor, participant, amount)
  }

  /**
   * Cleans up the offer box after all participants have been cleaned up
   * Can only be called when offer is completed, cancelled+completed, or expired
   *
   * @param id the id of the offer
   */
  cleanupOffer(id: uint64) {
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    const { state, expiration, acceptances, escrowed } = this.offers(id).value

    // can only cleanup if completed, cancel_completed, or expired (while in OFFERED or ESCROWING state)
    const isCompleted = state === STATE_COMPLETED || state === STATE_CANCEL_COMPLETED
    const isExpired = (state === STATE_OFFERED || state === STATE_ESCROWING) && expiration <= Global.latestTimestamp && escrowed === 0
    loggedAssert(isCompleted || isExpired, errInvalidState)

    // ensure all participant boxes have been cleaned up
    loggedAssert(acceptances === 0, errParticipantsNotCleaned)

    const { payor, amount } = this.offerRefunds(id).value
    // roots live in the registry pinned at creation, even if the DAO has since repointed it
    const registry = this.offerRegistry(id).value
    abiCall<typeof Meta.prototype.deleteRoot>({ appId: registry, args: [this.rootName(id, false)] })
    abiCall<typeof Meta.prototype.deleteRoot>({ appId: registry, args: [this.rootName(id, true)] })
    this.offers(id).delete()
    this.offerRefunds(id).delete()
    this.offerRegistry(id).delete()
    itxn.payment({ receiver: payor, amount }).submit()
  }

  // READ ONLY METHODS ----------------------------------------------------------------------------

  /** The terms commitment `accept` expects for an offer. Clients should compute it independently. */
  @abimethod({ readonly: true })
  offerTerms(id: uint64): bytes<32> {
    loggedAssert(this.offers(id).exists, errOfferNotFound)
    return this.terms(id)
  }
}
