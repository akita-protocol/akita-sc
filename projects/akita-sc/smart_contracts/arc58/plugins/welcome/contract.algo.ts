import {
  Account, Application, Asset, bytes, Contract, Global, GlobalState,
  itxn, loggedAssert, uint64,
} from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { getSpendingAccount, rekeyAddress } from "@akita-protocol/plugin/functions"
import { pluginPrincipal } from '../../../utils/principal'
import { AbstractedAccountFactory } from '../../account/factory.algo'

/**
 * Create a wallet for someone else using an ARC-58 wallet's spending account.
 *
 * Install sendToAnyone on an owner-controlled permission. For a Well, delegate only
 * sponsor to the chosen approver, with a dedicated escrow, a bounded allowance,
 * an expiry, admin=false and canReclaim=false. A public sponsor permission is
 * intentionally a public subsidy: this plugin does not establish uniqueness of
 * humans or authenticate invite links. Caller-supplied maxCost is a quote guard,
 * not a replacement for the sponsor's wallet-enforced spending permission.
 *
 * The creation cost is quoted by factory.cost(), called from the spending account so
 * the factory prices the same payer newAccount charges. Off-chain quotes simulate that
 * call as the payer and add the gift (ALGO amount or ASA opt-in MBR).
 *
 * The new wallet is not registered in the EscrowFactory reverse registry. Identity is
 * resolved from wallet hints (docs/principal-resolution), so no registration is needed;
 * the SDK stopped registry writes in Phase 3. A caller that still wants the legacy entry
 * can send the permissionless register('') later (WelcomePluginSDK.registerWallet).
 *
 * Referrer: useMainWalletReferrer=false names the spending account; true names the
 * sponsoring wallet's verified principal (pluginPrincipal: its controlled address while
 * the wallet still controls it, else the spending account). The factory pays the
 * creation-fee referral cut to that address (Q1-A2).
 *
 * The factory is fixed at deployment. This plugin has no update/delete routes,
 * custody, claim timeout, or authority over a newly created wallet.
 */
export class WelcomePlugin extends Contract {
  factory = GlobalState<Application>({ key: 'factory' })

  @abimethod({ onCreate: 'require' })
  create(factory: Application): void {
    loggedAssert(factory.id !== 0, 'welcomeInvalidFactory')
    this.factory.value = factory
  }

  /** Create a wallet, without a gift or caller-selected setup. */
  sponsor(
    wallet: Application,
    rekeyBack: boolean,
    admin: Account,
    nickname: string,
    salt: bytes<32>,
    useMainWalletReferrer: boolean,
    maxCost: uint64,
  ): uint64 {
    return this.newWallet(wallet, rekeyBack, admin, nickname, salt, useMainWalletReferrer, 0, 0, maxCost)
  }

  /** Create a wallet and atomically send ALGO (asset=0) or an ASA. */
  sendToAnyone(
    wallet: Application,
    rekeyBack: boolean,
    admin: Account,
    nickname: string,
    salt: bytes<32>,
    useMainWalletReferrer: boolean,
    asset: uint64,
    amount: uint64,
    maxCost: uint64,
  ): uint64 {
    loggedAssert(amount > 0, 'welcomeEmptyGift')
    return this.newWallet(wallet, rekeyBack, admin, nickname, salt, useMainWalletReferrer, asset, amount, maxCost)
  }

  private newWallet(
    wallet: Application,
    rekeyBack: boolean,
    admin: Account,
    nickname: string,
    salt: bytes<32>,
    useMainWalletReferrer: boolean,
    asset: uint64,
    amount: uint64,
    maxCost: uint64,
  ): uint64 {
    loggedAssert(admin !== Global.zeroAddress, 'welcomeInvalidAdmin')
    const sender = getSpendingAccount(wallet)
    loggedAssert(sender !== Global.zeroAddress, 'welcomeInactiveWallet')
    loggedAssert(sender.authAddress === Global.currentApplicationAddress, 'welcomeMissingAuthority')

    const total: uint64 = abiCall<typeof AbstractedAccountFactory.prototype.cost>({
      sender,
      appId: this.factory.value,
      fee: 0,
    }).returnValue + (asset === 0 ? amount : Global.assetOptInMinBalance)
    loggedAssert(total <= maxCost, 'welcomeCostLimitExceeded')
    const assets: uint64[] = []
    if (asset !== 0) assets.push(asset)

    const id = abiCall<typeof AbstractedAccountFactory.prototype.newAccount>({
      sender,
      appId: this.factory.value,
      args: [
        itxn.payment({ sender, receiver: this.factory.value.address, amount: total, fee: 0 }),
        Global.zeroAddress,
        admin,
        nickname,
        useMainWalletReferrer ? pluginPrincipal(wallet, this.factory.value.id).principal : sender,
        salt,
        '',
        true,
        asset === 0 ? amount : 0,
        assets,
        [],
      ],
      fee: 0,
      rekeyTo: asset === 0 ? rekeyAddress(rekeyBack, wallet) : Global.zeroAddress,
    }).returnValue

    if (asset !== 0) {
      itxn.assetTransfer({
        sender,
        assetReceiver: Application(id).address,
        xferAsset: Asset(asset),
        assetAmount: amount,
        fee: 0,
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      }).submit()
    }
    return id
  }
}
