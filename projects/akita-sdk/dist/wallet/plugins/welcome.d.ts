import { BaseSDK } from '../../base';
import { WelcomePluginArgs, WelcomePluginClient } from '../../generated/WelcomePluginClient';
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from '../../types';
type ContractArgs = WelcomePluginArgs['obj'];
type SponsorABI = ContractArgs['sponsor(uint64,bool,address,string,byte[32],bool,uint64)uint64'];
export type WelcomeSponsorParams = Omit<SponsorABI, 'wallet' | 'rekeyBack' | 'salt' | 'useMainWalletReferrer'> & MaybeSigner & {
    rekeyBack?: boolean;
    salt?: Uint8Array;
    /**
     * Default: the spending account. True: the sponsoring wallet's verified principal (its controlled
     * account while the wallet still controls it, else the spending account). The factory pays this
     * referrer its cut of the creation fee (Q1-A2).
     */
    useMainWalletReferrer?: boolean;
};
export type WelcomeSendParams = WelcomeSponsorParams & {
    /** ALGO is 0. Other values are ASA IDs; amount is always in base units. */
    asset: bigint | number;
    amount: bigint | number;
};
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
export declare class WelcomePluginSDK extends BaseSDK<WelcomePluginClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Quote the ALGO debit for the actual spending account (main account or escrow), including
     * the gift or ASA opt-in MBR. Excludes fees. Simulates factory.cost() as the payer, the
     * same call the plugin makes on-chain. Under Q1-A2 the price no longer depends on the payer:
     * the referral cut and its MBR come out of the creation fee.
     */
    cost({ payer, asset, amount }: {
        payer: string;
        asset?: bigint | number;
        amount?: bigint | number;
    }): Promise<bigint>;
    /**
     * @deprecated LEGACY registry write. Register a wallet created by sponsor() or sendToAnyone()
     * with the escrow factory's reverse registry. Principal resolution uses wallet hints, so new
     * wallets need no registry entry and the SDK no longer calls this (principal-resolution Phase 3).
     * Call it only to keep legacy registry semantics for this wallet (old plugin ids, old sub-gates).
     * The new wallet already holds the registration MBR and anyone may send this. Removed in Phase 4.
     */
    registerWallet({ walletId, ...params }: MaybeSigner & {
        walletId: bigint;
    }): Promise<void>;
    sponsor(): PluginSDKReturn;
    sponsor(args: WelcomeSponsorParams): PluginSDKReturn;
    sendToAnyone(): PluginSDKReturn;
    sendToAnyone(args: WelcomeSendParams): PluginSDKReturn;
    private selector;
    private feeLimit;
}
export {};
