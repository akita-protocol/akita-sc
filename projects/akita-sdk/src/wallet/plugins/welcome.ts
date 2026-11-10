import { BaseSDK } from '../../base'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { emptySigner } from '../../constants'
import { AbstractedAccountClient } from '../../generated/AbstractedAccountClient'
import { AbstractedAccountFactoryClient } from '../../generated/AbstractedAccountFactoryClient'
import { WelcomePluginArgs, WelcomePluginClient, WelcomePluginFactory } from '../../generated/WelcomePluginClient'
import { MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn } from '../../types'
import { assertByteArrayLength, randomByteArray } from '../../utils'
import { getTxns } from '../utils'

const ASSET_OPT_IN_MBR = 100_000n

type ContractArgs = WelcomePluginArgs['obj']
type SponsorABI = ContractArgs['sponsor(uint64,bool,address,string,byte[32],bool,uint64)uint64']

export type WelcomeSponsorParams = Omit<SponsorABI, 'wallet' | 'rekeyBack' | 'salt' | 'useMainWalletReferrer'>
  & MaybeSigner & {
    rekeyBack?: boolean
    salt?: Uint8Array
    /**
     * Default: the spending account. True: the sponsoring wallet's verified principal (its controlled
     * account while the wallet still controls it, else the spending account). The factory pays this
     * referrer its cut of the creation fee (Q1-A2).
     */
    useMainWalletReferrer?: boolean
  }

export type WelcomeSendParams = WelcomeSponsorParams & {
  /** ALGO is 0. Other values are ASA IDs; amount is always in base units. */
  asset: bigint | number
  amount: bigint | number
}

/**
 * One plugin for Send to Anyone and the Well. Both hooks return the new wallet
 * ID as an ABI return in wallet.usePlugin's group result. The new wallet needs no
 * registry entry (principal resolution uses wallet hints); registerWallet() is legacy.
 *
 * For a Well, install only sponsor() for the approver's caller address on a
 * dedicated escrow, with bounded allowances and an expiry. Do not install
 * sendToAnyone() on that permission. Invite redemption and identity checks belong to
 * the approver; an expiring delegation alone does not prevent repeated mints.
 */
export class WelcomePluginSDK extends BaseSDK<WelcomePluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: WelcomePluginFactory, ...params })
  }

  /**
   * Quote the ALGO debit for the actual spending account (main account or escrow), including
   * the gift or ASA opt-in MBR. Excludes fees. Simulates factory.cost() as the payer, the
   * same call the plugin makes on-chain. Under Q1-A2 the price no longer depends on the payer:
   * the referral cut and its MBR come out of the creation fee.
   */
  async cost({ payer, asset = 0n, amount = 0n }: {
    payer: string
    asset?: bigint | number
    amount?: bigint | number
  }): Promise<bigint> {
    const factoryId = await this.client.state.global.factory()
    if (factoryId === undefined) throw new Error('Welcome plugin has no factory')
    const factory = new AbstractedAccountFactoryClient({ algorand: this.algorand, appId: factoryId })
    // The payer may sit at its min balance until fundsRequest tops it up, so the reader
    // pays the pooled fee and the cost() call from the payer carries none. This is only
    // simulated, so the fee is a generous ceiling rather than an exact count.
    const { minFee } = await this.algorand.getSuggestedParams()
    const feePayment = await this.algorand.createTransaction.payment({
      sender: this.readerAccount,
      receiver: this.readerAccount,
      amount: microAlgo(0),
      staticFee: microAlgo(BigInt(minFee) * 16n),
    })
    const { returns } = await factory.newGroup()
      .addTransaction(feePayment, emptySigner)
      .cost({ sender: payer, signer: emptySigner, args: {}, staticFee: microAlgo(0) })
      .simulate({ skipSignatures: true, allowUnnamedResources: true })
    const base = returns?.[0] as bigint | undefined
    if (base === undefined) throw new Error('Failed to quote wallet creation')
    return base + (BigInt(asset) === 0n ? BigInt(amount) : ASSET_OPT_IN_MBR)
  }

  /**
   * @deprecated LEGACY registry write. Register a wallet created by sponsor() or sendToAnyone()
   * with the escrow factory's reverse registry. Principal resolution uses wallet hints, so new
   * wallets need no registry entry and the SDK no longer calls this (principal-resolution Phase 3).
   * Call it only to keep legacy registry semantics for this wallet (old plugin ids, old sub-gates).
   * The new wallet already holds the registration MBR and anyone may send this. Removed in Phase 4.
   */
  async registerWallet({ walletId, ...params }: MaybeSigner & { walletId: bigint }): Promise<void> {
    const wallet = new AbstractedAccountClient({ algorand: this.algorand, appId: walletId })
    // register() pays the registry from the new wallet via two fee-less inner txns.
    await wallet.send.register({
      ...this.getRequiredSendParams(params),
      args: { escrow: '' },
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
      maxFee: await this.feeLimit(),
    })
  }

  sponsor(): PluginSDKReturn
  sponsor(args: WelcomeSponsorParams): PluginSDKReturn
  sponsor(args?: WelcomeSponsorParams): PluginSDKReturn {
    if (args === undefined) return this.selector('sponsor')
    const { admin, nickname, maxCost, salt = randomByteArray(32), useMainWalletReferrer = false, rekeyBack = true } = args
    assertByteArrayLength(salt, 'salt', 32)
    const sendParams = this.getRequiredSendParams(args)
    return () => ({
      ...this.selector('sponsor')(),
      getTxns: async ({ wallet }: PluginHookParams) => [{
        type: 'methodCall',
        ...await this.client.params.sponsor({
          ...sendParams,
          args: { wallet, rekeyBack, admin, nickname, salt, useMainWalletReferrer, maxCost },
          maxFee: await this.feeLimit(),
        }),
      }],
    })
  }

  sendToAnyone(): PluginSDKReturn
  sendToAnyone(args: WelcomeSendParams): PluginSDKReturn
  sendToAnyone(args?: WelcomeSendParams): PluginSDKReturn {
    if (args === undefined) return this.selector('sendToAnyone')
    const { admin, nickname, maxCost, asset, amount, salt = randomByteArray(32), useMainWalletReferrer = false, rekeyBack = true } = args
    assertByteArrayLength(salt, 'salt', 32)
    const sendParams = this.getRequiredSendParams(args)
    return () => ({
      ...this.selector('sendToAnyone')(),
      getTxns: async ({ wallet }: PluginHookParams) => [{
        type: 'methodCall',
        ...await this.client.params.sendToAnyone({
          ...sendParams,
          args: { wallet, rekeyBack, admin, nickname, salt, useMainWalletReferrer, asset, amount, maxCost },
          maxFee: await this.feeLimit(),
        }),
      }],
    })
  }

  private selector(method: 'sponsor' | 'sendToAnyone'): PluginSDKReturn {
    return () => ({
      appId: this.appId,
      selectors: [this.client.appClient.getABIMethod(method).getSelector()],
      getTxns,
    })
  }

  private async feeLimit() {
    const params = await this.algorand.getSuggestedParams()
    // Allow the composer to cover nested factory/setup/registration calls.
    // This is a ceiling; simulation selects the actual required pooled fee.
    return microAlgo(BigInt(params.minFee) * 272n)
  }
}
