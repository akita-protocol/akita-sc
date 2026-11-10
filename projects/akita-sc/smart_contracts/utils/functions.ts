import { Account, Application, assert, Asset, Bytes, Global, gtxn, itxn, itxnCompose, loggedAssert, OnCompleteAction, op, Txn, uint64 } from "@algorandfoundation/algorand-typescript"
import { abiCall, Address, decodeArc4, methodSelector } from "@algorandfoundation/algorand-typescript/arc4"
import { btoi, itob, sha256 } from "@algorandfoundation/algorand-typescript/op"
import { AbstractAccountGlobalStateKeysControlledAddress, AbstractAccountGlobalStateKeysCurrentPlugin, AbstractAccountGlobalStateKeysReferrer, AbstractAccountGlobalStateKeysRekeyIndex, AbstractAccountGlobalStateKeysSpendingAddress } from "../arc58/account/constants"
import { errEscrowDoesNotExist } from "../arc58/account/errors"
import { CallerTypeGlobal, EscrowInfo, PluginKey } from "../arc58/account/types"
import { AkitaDAOGlobalStateKeysAkitaAppList, AkitaDAOGlobalStateKeysAkitaAssets, AkitaDAOGlobalStateKeysAkitaSocialAppList, AkitaDAOGlobalStateKeysNFTFees, AkitaDAOGlobalStateKeysOtherAppList, AkitaDAOGlobalStateKeysPluginAppList, AkitaDAOGlobalStateKeysRevenueSplits, AkitaDAOGlobalStateKeysSocialFees, AkitaDAOGlobalStateKeysStakingFees, AkitaDAOGlobalStateKeysSubscriptionFees, AkitaDAOGlobalStateKeysSwapFees, AkitaDAOGlobalStateKeysWallet, AkitaDAOGlobalStateKeysWalletFees } from "../arc58/dao/constants"
import { AkitaAppList, AkitaAssets, AkitaSocialAppList, NFTFees, OtherAppList, PluginAppList, SocialFees, StakingFees, SubscriptionFees, SwapFees, WalletFees } from "../arc58/dao/types"
import { GlobalStateKeyFunder } from "../constants"
import { GateArgs } from "../gates/types"
import { PrizeBoxGlobalStateKeyOwner } from "../prize-box/constants"
import { MinDisbursementsMBR, UserAllocationMBR } from "../rewards/constants"
import { UserAllocation } from "../rewards/types"
import { STAKING_TYPE_LOCK } from "../staking/types"
import { CreatorRoyaltyDefault, CreatorRoyaltyMaximumSingle, DIVISOR, IMPACT_DIVISOR, ONE_DAY, ONE_WEEK, ONE_YEAR_IN_DAYS, THIRTY_DAYS } from "./constants"
import {
  errAssetsAndAmountsMismatch,
  errCannotCloseOutOfAlgoForbidden,
  errClawbackForbidden,
  errCloseForbidden,
  errInvalidAsset,
  errInvalidAssetAmount,
  errInvalidAssetReceiver,
  errInvalidPaymentAmount,
  errInvalidPaymentReceiver,
  errInvalidPaymentSender,
  errInvalidPercentage,
  errInvalidPercentageOfArgs,
  errInvalidWallet,
  errNotAPrizeBox,
  errPluginNotAuthAddr,
  errRekeyForbidden,
} from "./errors"
import { FunderInfo } from "./types/mbr"
import { Proof } from "./types/merkles"
import { ReferralPaymentInfo } from "./types/referral"

// CONTRACT IMPORTS
import type { AbstractedAccount } from "../arc58/account/contract.algo"
import type { OptInPlugin } from "../arc58/plugins/optin/contract.algo"
import { Split } from "../arc58/plugins/revenue-manager/types"
import type { EscrowFactory } from "../escrow/factory.algo"
import type { Gate } from "../gates/contract.algo"
import type { Meta } from "../meta/contract.algo"
import type { Rewards } from "../rewards/contract.algo"
import { AkitaSocialImpact } from "../social/impact.algo"
import { PoolGlobalStateKeyGateID } from "../staking-pool/constants"
import type { Staking } from "../staking/contract.algo"
import type { AssetInbox } from "./types/asset-inbox"

export function controls(sender: Account): boolean {
  return sender.authAddress === Global.currentApplicationAddress
}

// GROUPED TRANSFER BINDING -------------------------------------------------------------------------

/**
 * Assert a grouped payment is a plain transfer from `sender`: no close-out and no rekey.
 * Receiver and amount are left to the caller (see `assertBoundPayment`).
 */
export function assertSafePayment(txn: gtxn.PaymentTxn, sender: Account): void {
  loggedAssert(txn.sender === sender, errInvalidPaymentSender)
  loggedAssert(txn.closeRemainderTo === Global.zeroAddress, errCloseForbidden)
  loggedAssert(txn.rekeyTo === Global.zeroAddress, errRekeyForbidden)
}

/**
 * Assert a grouped payment is exactly `amount` µALGO from `sender` to `receiver`,
 * with no close-out and no rekey.
 */
export function assertBoundPayment(txn: gtxn.PaymentTxn, sender: Account, receiver: Account, amount: uint64): void {
  assertSafePayment(txn, sender)
  loggedAssert(txn.receiver === receiver, errInvalidPaymentReceiver)
  loggedAssert(txn.amount === amount, errInvalidPaymentAmount)
}

/**
 * Assert a grouped asset transfer is a plain transfer from `sender`: not a clawback
 * (`assetSender` unset), no `assetCloseTo` and no rekey.
 * Receiver, asset and amount are left to the caller (see `assertBoundAssetTransfer`).
 */
export function assertSafeAssetTransfer(txn: gtxn.AssetTransferTxn, sender: Account): void {
  loggedAssert(txn.sender === sender, errInvalidPaymentSender)
  loggedAssert(txn.assetSender === Global.zeroAddress, errClawbackForbidden)
  loggedAssert(txn.assetCloseTo === Global.zeroAddress, errCloseForbidden)
  loggedAssert(txn.rekeyTo === Global.zeroAddress, errRekeyForbidden)
}

/**
 * Assert a grouped asset transfer moves exactly `amount` of `asset` from `sender` to
 * `receiver`: not a clawback, no `assetCloseTo` and no rekey.
 */
export function assertBoundAssetTransfer(
  txn: gtxn.AssetTransferTxn,
  sender: Account,
  receiver: Account,
  asset: Asset,
  amount: uint64
): void {
  assertSafeAssetTransfer(txn, sender)
  loggedAssert(txn.assetReceiver === receiver, errInvalidAssetReceiver)
  loggedAssert(txn.xferAsset === asset, errInvalidAsset)
  loggedAssert(txn.assetAmount === amount, errInvalidAssetAmount)
}

export function getDAOARC58Wallet(akitaDAO: Application): Application {
  const [walletID] = op.AppGlobal.getExUint64(akitaDAO, Bytes(AkitaDAOGlobalStateKeysWallet))
  return Application(walletID)
}

export function getAkitaAppList(akitaDAO: Application): AkitaAppList {
  const [appListBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysAkitaAppList))
  return decodeArc4<AkitaAppList>(appListBytes)
}

export function getAkitaSocialAppList(akitaDAO: Application): AkitaSocialAppList {
  const [appListBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysAkitaSocialAppList))
  return decodeArc4<AkitaSocialAppList>(appListBytes)
}

export function getPluginAppList(akitaDAO: Application): PluginAppList {
  const [pluginAppListBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysPluginAppList))
  return decodeArc4<PluginAppList>(pluginAppListBytes)
}

export function getOtherAppList(akitaDAO: Application): OtherAppList {
  const [otherAppListBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysOtherAppList))
  return decodeArc4<OtherAppList>(otherAppListBytes)
}

export function getEscrowFactory(akitaDAO: Application): uint64 {
  return getOtherAppList(akitaDAO).escrow
}

export function getWalletFees(akitaDAO: Application): WalletFees {
  const [walletFeesBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysWalletFees))
  return decodeArc4<WalletFees>(walletFeesBytes)
}

export function getSocialFees(akitaDAO: Application): SocialFees {
  const [socialFeesBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysSocialFees))
  return decodeArc4<SocialFees>(socialFeesBytes)
}

export function getStakingFees(akitaDAO: Application): StakingFees {
  const [stakingFeesBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysStakingFees))
  return decodeArc4<StakingFees>(stakingFeesBytes)
}

export function getSubscriptionFees(akitaDAO: Application): SubscriptionFees {
  const [subscriptionFeesBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysSubscriptionFees))
  return decodeArc4<SubscriptionFees>(subscriptionFeesBytes)
}

export function getSwapFees(akitaDAO: Application): SwapFees {
  const [swapFeesBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysSwapFees))
  return decodeArc4<SwapFees>(swapFeesBytes)
}

export function getNFTFees(akitaDAO: Application): NFTFees {
  const [nftFeesBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysNFTFees))
  return decodeArc4<NFTFees>(nftFeesBytes)
}

export function getAkitaAssets(akitaDAO: Application): AkitaAssets {
  const akitaAssetsBytes = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysAkitaAssets))[0]
  return decodeArc4<AkitaAssets>(akitaAssetsBytes)
}

export function getSplits(akitaDAO: Application): Split[] {
  const [splitsBytes] = op.AppGlobal.getExBytes(akitaDAO, Bytes(AkitaDAOGlobalStateKeysRevenueSplits))
  return decodeArc4<Split[]>(splitsBytes)
}

export function calcPercent(a: uint64, p: uint64): uint64 {
  assert(p <= DIVISOR, errInvalidPercentage)
  return op.divw(...op.mulw(a, p), DIVISOR)
}

export function percentageOf(a: uint64, b: uint64): uint64 {
  assert(a < b, errInvalidPercentageOfArgs)
  return op.divw(...op.mulw(a, DIVISOR), b)
}

export function wideRatio(numerators: [uint64, uint64], denominators: [uint64, uint64]): uint64 {
  assert(denominators[0] > 0 && denominators[1] > 0, errInvalidPercentage)
  const [overflow, result] = op.divmodw(...op.mulw(...numerators), ...op.mulw(...denominators))
  assert(overflow === 0, errInvalidPercentage)
  return result
}

export function akitaSocialFee(akitaDAO: Application, impact: uint64): uint64 {
  const { impactTaxMin, impactTaxMax } = getSocialFees(akitaDAO)
  return impactRange(impact, impactTaxMin, impactTaxMax)
}

/** calculates a point between two numbers in relation to user impact */
export function impactRange(impact: uint64, min: uint64, max: uint64): uint64 {
  const minImpact: uint64 = (impact > 1) ? impact - 1 : 1
  return max - (((max - min) * minImpact) / IMPACT_DIVISOR)
}

export function getUserImpact(akitaDAO: Application, account: Account): uint64 {
  return abiCall<typeof AkitaSocialImpact.prototype.getUserImpact>({
    appId: getAkitaSocialAppList(akitaDAO).impact,
    args: [account]
  }).returnValue
}

/** LEGACY (registry semantics; legacy shims only, delete in Phase 4: use principalOf / atRestPrincipalOf).
 * The origin (controlled address) of an authenticated wallet, or `or` when `walletID` is 0.
 *
 * `walletID` must come from `legacyWalletOf` (creator-checked). In addition, an
 * external controlled address only counts if it is provably under the wallet's control right
 * now: it is the wallet's own app address, it is the current sender (it is the spending account
 * rekeyed to a plugin), or it is rekeyed to the wallet app. Otherwise `or` is returned. This
 * stops wallets created with an arbitrary `controlledAddress` from borrowing someone's identity.
 */
export function legacyOriginOr(walletID: Application, or: Account): Account {
  if (walletID.id === 0) {
    return or
  }
  const origin = getOriginAccount(walletID)
  if (origin !== walletID.address && origin !== Txn.sender && origin.authAddress !== walletID.address) {
    return or
  }
  return origin
}

export function legacyOriginOrTxnSender(walletID: Application): Account {
  return legacyOriginOr(walletID, Txn.sender)
}

export function referrerOr(walletID: Application, or: Account): Account {
  if (walletID.id === 0) {
    return or
  }
  return getReferrerAccount(walletID)
}

export function referrerOrZeroAddress(walletID: Application): Account {
  return referrerOr(walletID, Global.zeroAddress)
}

/** The wallet's `controlled_address`. Fails if the app has no 32-byte value under that key. */
export function getOriginAccount(walletID: Application): Account {
  const [controlledAccountBytes, exists] = op.AppGlobal.getExBytes(
    walletID,
    Bytes(AbstractAccountGlobalStateKeysControlledAddress)
  )
  loggedAssert(exists && controlledAccountBytes.length === 32, errInvalidWallet)
  return Account(controlledAccountBytes)
}

export function getReferrerAccount(walletID: Application): Account {
  const [referrerBytes] = op.AppGlobal.getExBytes(
    walletID,
    Bytes(AbstractAccountGlobalStateKeysReferrer)
  )
  return Account(Bytes(referrerBytes))
}

/** Address of application `appId`, computed without needing the app as a resource. */
export function appAddress(appId: uint64): Account {
  return Account(op.sha512_256(Bytes('appID').concat(itob(appId))))
}

/** True if `wallet` exists and was created by the ARC-58 wallet factory `walletFactory`. */
export function isAkitaWallet(wallet: uint64, walletFactory: uint64): boolean {
  if (wallet === 0 || walletFactory === 0) {
    return false
  }
  const [creator, exists] = op.AppParams.appCreator(wallet)
  return exists && creator === appAddress(walletFactory)
}

/** LEGACY (EscrowFactory registry read; legacy shims only, delete in Phase 4: use principalOf).
 * Authenticated wallet lookup: the ARC-58 wallet registered for `address` (a wallet app address
 * or one of its escrows) in the DAO's escrow factory, or `Application(0)`.
 *
 * The escrow factory lets any app register itself, so the registered app only counts if it was
 * created by the DAO-registered wallet factory (`AkitaAppList.wallet`). Use this (never a raw
 * escrow-factory read) before trusting `getOriginAccount` / `getReferrerAccount`.
 */
export function legacyWalletOf(akitaDAO: Application, address: Account): Application {
  return Application(legacyWalletID(getEscrowFactory(akitaDAO), getAkitaAppList(akitaDAO).wallet, address))
}

/** LEGACY (EscrowFactory registry read; only via legacyWalletOf, delete in Phase 4).
 * Wallet app id registered for `address` in `escrowFactory`, or 0 if none is registered or the
 * registered app was not created by `walletFactory`.
 */
export function legacyWalletID(escrowFactory: uint64, walletFactory: uint64, address: Account): uint64 {
  const data = abiCall<typeof EscrowFactory.prototype.get>({
    appId: escrowFactory,
    args: [address]
  }).returnValue

  if (Bytes(data).length !== 8) {
    return 0
  }

  const wallet = btoi(data)
  return isAkitaWallet(wallet, walletFactory) ? wallet : 0
}

export function gateCall(akitaDAO: Application, caller: Account, id: uint64, args: GateArgs): boolean {
  return abiCall<typeof Gate.prototype.check>({
    appId: getAkitaAppList(akitaDAO).gate,
    args: [
      caller,
      id,
      args,
    ],
  }).returnValue
}

export function softGateCheck(gateTxn: gtxn.ApplicationCallTxn, akitaDAO: Application, caller: Account, id: uint64): boolean {
  // A successful ARC-4 call to Gate.check already guarantees the allowed
  // completion action and argument count; authenticate the values the pool
  // relies on before consuming the return log.
  assert(
    gateTxn.appId === Application(getAkitaAppList(akitaDAO).gate) &&
    gateTxn.onCompletion === OnCompleteAction.NoOp &&
    gateTxn.numAppArgs === 4 &&
    gateTxn.appArgs(0) === methodSelector<typeof Gate.prototype.check>() &&
    gateTxn.appArgs(1) === new Address(caller).bytes &&
    gateTxn.appArgs(2) === itob(id)
  )

  return decodeArc4<boolean>(op.extract(gateTxn.lastLog, 4))
}

export function getCheckByIndex(index: uint64, akitaDAO: Application, caller: Account, id: uint64): boolean {
  const gateTxn = gtxn.ApplicationCallTxn(index)
  return (
    gateTxn.appId === Application(getAkitaAppList(akitaDAO).gate) &&
    gateTxn.onCompletion === OnCompleteAction.NoOp &&
    gateTxn.numAppArgs === 4 &&
    gateTxn.appArgs(0) === methodSelector<typeof Gate.prototype.mustCheck>() &&
    gateTxn.appArgs(1) === new Address(caller).bytes &&
    gateTxn.appArgs(2) === itob(id)
  )
}

export function gateCheck(gateTxn: gtxn.ApplicationCallTxn, akitaDAO: Application, caller: Account, id: uint64): boolean {
  return (
    gateTxn.appId === Application(getAkitaAppList(akitaDAO).gate) &&
    gateTxn.onCompletion === OnCompleteAction.NoOp &&
    gateTxn.numAppArgs === 4 &&
    gateTxn.appArgs(0) === methodSelector<typeof Gate.prototype.mustCheck>() &&
    gateTxn.appArgs(1) === new Address(caller).bytes &&
    gateTxn.appArgs(2) === itob(id)
  )
}

export function getGateArgs(gateTxn: gtxn.ApplicationCallTxn): GateArgs {
  return decodeArc4<GateArgs>(gateTxn.appArgs(3))
}

export function getStakingPoolGateID(appId: Application) {
  return op.AppGlobal.getExUint64(appId, Bytes(PoolGlobalStateKeyGateID))[0]
}

export type Arc58Accounts = {
  walletAddress: Account;
  origin: Account;
  sender: Account;
  referrer: Account;
};

export function getAccounts(wallet: Application): Arc58Accounts {
  const origin = getOriginAccount(wallet)
  const sender = getSpendingAccount(wallet)
  const referrer = getReferrerAccount(wallet)
  return {
    walletAddress: wallet.address,
    origin,
    sender,
    referrer
  }
}

export function getSpendingAccount(wallet: Application): Account {
  const [spendingAddressBytes] = op.AppGlobal.getExBytes(
    wallet,
    Bytes(AbstractAccountGlobalStateKeysSpendingAddress)
  )
  return Account(Bytes(spendingAddressBytes))
}

/**
 * Like `getSpendingAccount`, but also asserts the spending account is currently rekeyed to the
 * calling app (the plugin). A spoofed `wallet` whose `spending_address` points at an account
 * this app does not control (for example the plugin's own, never-rekeyed app account) fails
 * with `errNath`. Prefer this in plugin methods that spend from the account.
 */
export function getControlledSpendingAccount(wallet: Application): Account {
  const sender = getSpendingAccount(wallet)
  loggedAssert(sender.authAddress === Global.currentApplicationAddress, errPluginNotAuthAddr)
  return sender
}

export function getEscrow(wallet: Application): string {
  // The escrow is stored in the currentPlugin struct (PluginKey)
  // which contains { plugin: uint64, caller: address, escrow: string }
  const [currentPluginBytes] = op.AppGlobal.getExBytes(
    wallet,
    Bytes(AbstractAccountGlobalStateKeysCurrentPlugin)
  )
  // Decode the PluginKey struct and extract the escrow field
  const currentPlugin = decodeArc4<PluginKey>(currentPluginBytes)
  return currentPlugin.escrow
}

export function getEscrowInfo(wallet: Application): EscrowInfo {
  const escrow = getEscrow(wallet)
  return abiCall<typeof AbstractedAccount.prototype.arc58_getEscrows>({
    appId: wallet.id,
    args: [[escrow]]
  }).returnValue[0]
}

export function mustGetEscrowInfo(wallet: Application): EscrowInfo {
  const info = getEscrowInfo(wallet)
  assert(info.address !== Global.zeroAddress, errEscrowDoesNotExist)
  return info
}

export function getRekeyIndex(wallet: Application): uint64 {
  const [rekeyIndexBytes] = op.AppGlobal.getExUint64(
    wallet,
    Bytes(AbstractAccountGlobalStateKeysRekeyIndex)
  )
  return rekeyIndexBytes
}

export function rekeyBackIfNecessary(rekeyBack: boolean, wallet: Application): void {
  if (rekeyBack) {
    const sender = getSpendingAccount(wallet)
    itxn
      .payment({
        sender,
        receiver: sender,
        amount: 0,
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
      .submit()
  }
}

export function rekeyAddress(rekeyBack: boolean, wallet: Application): Account {
  if (!rekeyBack) {
    return Global.zeroAddress
  }

  return wallet.address
}

export function arc59OptInAndSend(akitaDAO: Application, recipient: Account, asset: uint64, amount: uint64, closeOut: boolean): void {
  const assetInbox = getOtherAppList(akitaDAO).assetInbox
  const inboxAddress = Application(assetInbox).address

  const { mbr, routerOptedIn, receiverAlgoNeededForClaim } = abiCall<typeof AssetInbox.prototype.arc59_getSendAssetInfo>({
    appId: assetInbox,
    args: [recipient, asset]
  }).returnValue

  if (mbr || receiverAlgoNeededForClaim) {
    itxn.payment({
      receiver: inboxAddress,
      amount: mbr + receiverAlgoNeededForClaim
    }).submit()
  }

  if (!routerOptedIn) {
    abiCall<typeof AssetInbox.prototype.arc59_optRouterIn>({
      appId: assetInbox,
      args: [asset]
    })
  }

  let xferTxn = itxn.assetTransfer({
    assetReceiver: inboxAddress,
    assetAmount: amount,
    xferAsset: asset
  })

  if (closeOut) {
    xferTxn = itxn.assetTransfer({
      xferAsset: asset,
      assetCloseTo: inboxAddress
    })
  }

  abiCall<typeof AssetInbox.prototype.arc59_sendAsset>({
    appId: assetInbox,
    args: [xferTxn, recipient, receiverAlgoNeededForClaim]
  })
}

export function arc58OptInAndSend(akitaDAO: Application, recipientWallet: Application, escrow: string, assets: uint64[], amounts: uint64[]): void {
  assert(assets.length === amounts.length, errAssetsAndAmountsMismatch)
  const optinPlugin = getPluginAppList(akitaDAO).optin
  const origin = getOriginAccount(recipientWallet)

  itxnCompose.begin<typeof AbstractedAccount.prototype.arc58_rekeyToPlugin>({
    appId: recipientWallet.id,
    args: [optinPlugin, CallerTypeGlobal, escrow, [], []]
  })

  itxnCompose.next<typeof OptInPlugin.prototype.optIn>({
    appId: optinPlugin,
    args: [
      recipientWallet,
      true,
      assets,
      itxn.payment({
        receiver: origin,
        amount: Global.assetOptInMinBalance * assets.length
      })
    ]
  })

  for (let i: uint64 = 0; i < amounts.length; i++) {
    if (amounts[i] > 0) {
      itxnCompose.next(
        itxn.assetTransfer({
          assetAmount: amounts[i],
          assetReceiver: origin,
          xferAsset: assets[i]
        })
      )
    }
  }

  itxnCompose.next<typeof AbstractedAccount.prototype.arc58_verifyAuthAddress>({
    appId: recipientWallet
  })

  itxnCompose.submit()
}

export function royalties(akitaDAO: Application, asset: Asset, name: string, proof: Proof): uint64 {
  let creatorRoyalty: uint64 = 0

  if (!(proof.length > 0)) {
    return CreatorRoyaltyDefault
  }

  // A supplied proof has to verify. verifiedRead turns failure into an empty
  // string, which this helper would charge as a 0% royalty.
  const creatorRoyaltyString = abiCall<typeof Meta.prototype.verifiedMustRead>({
    appId: getAkitaAppList(akitaDAO).metaMerkles,
    args: [
      asset.creator,
      name,
      sha256(sha256(itob(asset.id))),
      proof,
      1,
      'royalty',
    ]
  }).returnValue

  if (Bytes(creatorRoyaltyString).length > 0) {
    creatorRoyalty = btoi(Bytes(creatorRoyaltyString))
  }

  if (creatorRoyalty > CreatorRoyaltyMaximumSingle) {
    return CreatorRoyaltyMaximumSingle
  }

  return creatorRoyalty
}

export function getPrizeBoxOwner(akitaDAO: Application, prizeBox: Application): Account {
  assert(prizeBox.creator === Application(getAkitaAppList(akitaDAO).prizeBox).address, errNotAPrizeBox)
  const [ownerBytes] = op.AppGlobal.getExBytes(prizeBox, Bytes(PrizeBoxGlobalStateKeyOwner))
  return new Address(ownerBytes).native
}

export function getFunder(appId: Application): FunderInfo {
  const [funderBytes] = op.AppGlobal.getExBytes(appId, Bytes(GlobalStateKeyFunder))
  return decodeArc4<FunderInfo>(funderBytes)
}

export function getStakingPowerThrough(
  stakingApp: uint64,
  user: Account,
  asset: uint64,
  requiredThrough: uint64,
): uint64 {
  const info = abiCall<typeof Staking.prototype.getInfo>({
    appId: stakingApp,
    args: [
      user,
      {
        asset,
        type: STAKING_TYPE_LOCK,
      },
    ],
  }).returnValue

  if (info.expiration <= requiredThrough) {
    return 0
  }

  const remainingTime: uint64 = info.expiration - Global.latestTimestamp

  if (remainingTime < ONE_WEEK) {
    return 0
  }

  const remainingDays: uint64 = remainingTime / ONE_DAY
  return op.divw(...op.mulw(wideRatio([info.amount, 1_000_000], [ONE_YEAR_IN_DAYS, 1_000_000]), remainingDays), 1_000_000)
}

export function getStakingPower(stakingApp: uint64, user: Account, asset: uint64): uint64 {
  return getStakingPowerThrough(stakingApp, user, asset, Global.latestTimestamp)
}

export function costInstantDisbursement(akitaDAO: Application, asset: uint64, allocationsLength: uint64): uint64 {
  const rewardsApp = getAkitaAppList(akitaDAO).rewards
  let cost: uint64 = MinDisbursementsMBR + (UserAllocationMBR * allocationsLength)

  if (asset !== 0 && !Application(rewardsApp).address.isOptedIn(Asset(asset))) {
    cost += Global.assetOptInMinBalance
  }

  return cost
}

/**
 * Calculate the MBR cost for N single-allocation disbursements.
 * Does NOT include rewards app asset opt-in — use rewardsOptInCost separately per unique asset.
 */
export function disbursementCost(count: uint64): uint64 {
  return (MinDisbursementsMBR + UserAllocationMBR) * count
}

/**
 * Returns the cost to opt the rewards app into an asset, or 0 if already opted in or asset is ALGO.
 * Call once per unique asset to avoid double-counting — the rewards app never opts out.
 */
export function rewardsOptInCost(akitaDAO: Application, asset: uint64): uint64 {
  if (asset !== 0) {
    const rewardsApp = getAkitaAppList(akitaDAO).rewards
    if (!Application(rewardsApp).address.isOptedIn(Asset(asset))) {
      return Global.assetOptInMinBalance
    }
  }
  return 0
}

/**
 * Funds a Rewards instant disbursement from the calling app. A non-zero `reclaimTo` lets anyone sweep
 * what is unclaimed at `expiration` to it (`Rewards.sweepExpired`).
 */
export function createInstantDisbursement(akitaDAO: Application, asset: uint64, timeToUnlock: uint64, expiration: uint64, allocations: UserAllocation[], sum: uint64, closeOut: boolean, reclaimTo: Account): { id: uint64, cost: uint64 } {
  assert(asset !== 0 || closeOut === false, errCannotCloseOutOfAlgoForbidden)
  const rewardsApp = getAkitaAppList(akitaDAO).rewards

  let id: uint64 = 0
  const mbr: uint64 = MinDisbursementsMBR + (UserAllocationMBR * allocations.length)
  let cost: uint64 = mbr
  if (asset === 0) {
    id = abiCall<typeof Rewards.prototype.createInstantDisbursement>({
      appId: rewardsApp,
      args: [
        itxn.payment({
          receiver: Application(rewardsApp).address,
          amount: mbr + sum
        }),
        timeToUnlock,
        expiration,
        allocations,
        reclaimTo
      ]
    }).returnValue
  } else {
    if (!Application(rewardsApp).address.isOptedIn(Asset(asset))) {
      cost += Global.assetOptInMinBalance
      abiCall<typeof Rewards.prototype.optIn>({
        appId: rewardsApp,
        args: [
          itxn.payment({
            receiver: Application(rewardsApp).address,
            amount: Global.assetOptInMinBalance
          }),
          Asset(asset)
        ]
      })
    }

    const transferTxn = itxn.assetTransfer({
      assetReceiver: Application(rewardsApp).address,
      assetAmount: sum,
      xferAsset: asset
    })

    if (closeOut) {
      transferTxn.set({ assetCloseTo: Application(rewardsApp).address })
    }

    id = abiCall<typeof Rewards.prototype.createInstantAsaDisbursement>({
      appId: rewardsApp,
      args: [
        itxn.payment({
          receiver: Application(rewardsApp).address,
          amount: mbr
        }),
        transferTxn,
        timeToUnlock,
        expiration,
        allocations,
        reclaimTo
      ]
    }).returnValue
  }

  return { id, cost }
}

/** LEGACY shims only (registry referrer of `Txn.sender`; new code: referralFeeTo(dao, p.referrer, asset)). See `legacyReferralFeeFor`. */
export function legacyReferralFee(akitaDAO: Application, asset: uint64): uint64 {
  return legacyReferralFeeFor(akitaDAO, Txn.sender, asset)
}

/** LEGACY (registry referrer; legacy shims only, delete in Phase 4: use referralFeeTo).
 * Referral disbursement MBR charged when a fee is attributed to `account`: 0 if `account` has no
 * authenticated wallet with a referrer, otherwise `costInstantDisbursement(akitaDAO, asset, 1)`.
 */
export function legacyReferralFeeFor(akitaDAO: Application, account: Account, asset: uint64): uint64 {
  const wallet = legacyWalletOf(akitaDAO, account)
  const referrer = referrerOrZeroAddress(wallet)

  if (referrer === Global.zeroAddress) {
    return 0
  }

  return costInstantDisbursement(akitaDAO, asset, 1)
}

/** LEGACY shims only (registry referrer of `Txn.sender`; new code: sendReferralPaymentTo(dao, p.referrer, ...)). */
export function legacySendReferralPayment(akitaDAO: Application, asset: uint64, amount: uint64, reclaimTo: Account): ReferralPaymentInfo {
  return legacySendReferralPaymentFor(akitaDAO, Txn.sender, asset, amount, reclaimTo)
}

/** LEGACY (registry referrer; legacy shims only, delete in Phase 4: use sendReferralPaymentTo).
 * Pay the referral cut of `amount` (in `asset`) to the referrer of `account`'s authenticated
 * wallet, as a Rewards instant disbursement funded by the calling app.
 *
 * Use this when the fee is attributable to someone other than the caller (for example the seller
 * of a listing settled by a buyer or keeper). Returns the remainder of `amount` and the
 * disbursement MBR the calling app spent; `{ leftover: amount, referralMbr: 0 }` if there is no
 * referrer. The referrer has `THIRTY_DAYS` to claim; after that anyone can sweep the cut and the MBR
 * to `reclaimTo` (the paying service's DAO escrow).
 */
export function legacySendReferralPaymentFor(akitaDAO: Application, account: Account, asset: uint64, amount: uint64, reclaimTo: Account): ReferralPaymentInfo {
  const wallet = legacyWalletOf(akitaDAO, account)
  const referrer = referrerOrZeroAddress(wallet)

  let referralFee: uint64 = 0
  if (amount > 0 && referrer !== Global.zeroAddress) {

    const { referrerPercentage } = getWalletFees(akitaDAO)

    referralFee = calcPercent(amount, referrerPercentage)
    if (referralFee === 0 && amount > 0) {
      referralFee = 1
    }

    const { cost: referralMbr } = createInstantDisbursement(
      akitaDAO,
      asset,
      Global.latestTimestamp,
      (Global.latestTimestamp + THIRTY_DAYS),
      [{ address: referrer, amount: referralFee }],
      referralFee,
      false,
      reclaimTo
    )

    return { leftover: (amount - referralFee), referralMbr }
  }

  return { leftover: amount, referralMbr: 0 }
}

export function splitOptInCount(akitaDAO: Application, escrow: Account, asset: Asset): uint64 {
  let count: uint64 = 0

  if (!escrow.isOptedIn(asset)) {
    count += 1
    // split accounts are dedicated escrows, if the main escrow is not opted in, assume the others aren't either
    const splits = getSplits(akitaDAO)
    count += splits.length
  }

  return count
}

// PRINCIPAL RESOLUTION -----------------------------------------------------------------------------
// Additive (Phase 0, docs/principal-resolution/PHASE-0-SPEC.md §3.3). DAO-aware wrappers around
// utils/principal.ts: each pins the wallet factory to `AkitaAppList(akitaDAO).wallet` of the
// CONSUMER's own DAO reference (never a DAO read from the wallet). Kept at the end of the file (with
// their imports) so the TEAL source comments of existing contracts keep their line numbers.

import { encodeArc4 } from "@algorandfoundation/algorand-typescript/arc4"
import {
  atRestPrincipal,
  ctxOwns,
  GateCtx,
  ownsAtRest,
  pluginPrincipal,
  Principal,
  quoteReferrer,
  resolvePrincipal,
  thirdPartyPrincipal,
  tipWalletFor,
  tryResolvePrincipal,
} from "./principal"

/** ARC-4 signature of Gate v2 `mustCheckFor(ctx, gateID, args)` (Gate track implements it; see IMPLEMENTATION-LOG.md). */
export const GateMustCheckForAbiMethod = 'mustCheckFor((address,uint64,address),uint64,byte[][])void'

/** Strict first-hop resolution (`resolvePrincipal`) against the DAO's wallet factory. Invalid hints revert. */
export function principalOf(akitaDAO: Application, hint: uint64): Principal {
  return resolvePrincipal(getAkitaAppList(akitaDAO).wallet, hint)
}

/** `tryResolvePrincipal` against the DAO's wallet factory (contextual quotes only, never third-party paths). */
export function tryPrincipalOf(akitaDAO: Application, hint: uint64): Principal {
  return tryResolvePrincipal(getAkitaAppList(akitaDAO).wallet, hint)
}

/** `quoteReferrer` against the DAO's wallet factory (readonly cost methods). */
export function quoteReferrerOf(akitaDAO: Application, hint: uint64): Account {
  return quoteReferrer(getAkitaAppList(akitaDAO).wallet, hint)
}

/** `ownsAtRest` against the DAO's wallet factory (no call context, no wallet-global reads). */
export function ownsAtRestOf(akitaDAO: Application, wallet: uint64, account: Account): boolean {
  return ownsAtRest(getAkitaAppList(akitaDAO).wallet, wallet, account)
}

/** `atRestPrincipal` against the DAO's wallet factory (stored-pair re-check; third-party safe). */
export function atRestPrincipalOf(akitaDAO: Application, account: Account, wallet: uint64, stored: Account): Account {
  return atRestPrincipal(getAkitaAppList(akitaDAO).wallet, account, wallet, stored)
}

/** QUOTE-ONLY: `thirdPartyPrincipal` against the DAO's wallet factory (reads W.controlled_address). */
export function thirdPartyPrincipalOf(akitaDAO: Application, account: Account, wallet: uint64): Account {
  return thirdPartyPrincipal(getAkitaAppList(akitaDAO).wallet, account, wallet)
}

/** `ctxOwns` against the DAO's wallet factory (context-aware sub-gates). */
export function ctxOwnsOf(akitaDAO: Application, ctx: GateCtx, account: Account): boolean {
  return ctxOwns(getAkitaAppList(akitaDAO).wallet, ctx, account)
}

/** Plugin side, inside the window: `pluginPrincipal` against the DAO's wallet factory. */
export function pluginPrincipalOf(akitaDAO: Application, wallet: Application): Principal {
  return pluginPrincipal(wallet, getAkitaAppList(akitaDAO).wallet)
}

/**
 * The `Gate.mustCheckFor` twin of `gateCheck`: `gateTxn` is a NoOp call to the DAO's gate with
 * `appArgs = [selector(mustCheckFor), encode(ctx), itob(id), args]`. The target passes the `ctx` it
 * verified itself (`gateCtx(principalOf(...))`), so a gate txn built for any other context fails.
 */
export function gateCheckCtx(gateTxn: gtxn.ApplicationCallTxn, akitaDAO: Application, ctx: GateCtx, id: uint64): boolean {
  return (
    gateTxn.appId === Application(getAkitaAppList(akitaDAO).gate) &&
    gateTxn.onCompletion === OnCompleteAction.NoOp &&
    gateTxn.numAppArgs === 4 &&
    gateTxn.appArgs(0) === methodSelector(GateMustCheckForAbiMethod) &&
    gateTxn.appArgs(1) === encodeArc4(ctx) &&
    gateTxn.appArgs(2) === itob(id)
  )
}

/**
 * Referral disbursement MBR for a fee whose referrer is already known (no registry lookup):
 * 0 for the zero address, otherwise `costInstantDisbursement(akitaDAO, asset, 1)`.
 */
export function referralFeeTo(akitaDAO: Application, referrer: Account, asset: uint64): uint64 {
  if (referrer === Global.zeroAddress) {
    return 0
  }

  return costInstantDisbursement(akitaDAO, asset, 1)
}

/**
 * Pay the referral cut of `amount` (in `asset`) to `referrer` (any address; usually the verified
 * principal's `referrer` or a creation-time stored referrer), as a Rewards instant disbursement funded
 * by the calling app. Same economics as `legacySendReferralPaymentFor`, without the registry lookup:
 * unclaimed after `THIRTY_DAYS`, the cut and the MBR can be swept to `reclaimTo`.
 */
export function sendReferralPaymentTo(akitaDAO: Application, referrer: Account, asset: uint64, amount: uint64, reclaimTo: Account): ReferralPaymentInfo {
  let referralFee: uint64 = 0
  if (amount > 0 && referrer !== Global.zeroAddress) {

    const { referrerPercentage } = getWalletFees(akitaDAO)

    referralFee = calcPercent(amount, referrerPercentage)
    if (referralFee === 0 && amount > 0) {
      referralFee = 1
    }

    const { cost: referralMbr } = createInstantDisbursement(
      akitaDAO,
      asset,
      Global.latestTimestamp,
      (Global.latestTimestamp + THIRTY_DAYS),
      [{ address: referrer, amount: referralFee }],
      referralFee,
      false,
      reclaimTo
    )

    return { leftover: (amount - referralFee), referralMbr }
  }

  return { leftover: amount, referralMbr: 0 }
}

/**
 * Tip routing wallet for `creator`, given the wallet id `stored` in the creator's social meta:
 * `stored` if it is a genuine wallet that owns `creator` at rest and still has live control of its
 * controlled address relative to `creator`, else 0 (direct tip). Reads a global of the CREATOR's own
 * wallet (deliberate exception to the no-global-reads rule, residual R-CREATOR): a missing or short
 * `controlled_address` gives 0; a uint64-typed one panics (only the creator's own posts are affected).
 */
export function tipWallet(akitaDAO: Application, creator: Account, stored: uint64): uint64 {
  return tipWalletFor(getAkitaAppList(akitaDAO).wallet, creator, stored)
}
