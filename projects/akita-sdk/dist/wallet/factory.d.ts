import { AbstractedAccountFactoryArgs, type AbstractedAccountFactoryClient } from '../generated/AbstractedAccountFactoryClient';
import { NewContractSDKParams, MaybeSigner } from '../types';
import { PluginInstallParams } from './types';
import { WalletSDK } from './index';
import { BaseSDK } from '../base';
import { TransactionSigner } from 'algosdk';
export type WalletFactoryContractArgs = AbstractedAccountFactoryArgs["obj"];
type NewAccountABI = WalletFactoryContractArgs['newAccount(pay,address,address,string,address,byte[32],string,bool,uint64,uint64[],(uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)[])uint64'];
export type NewParams = (Omit<NewAccountABI, 'payment' | 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'automaticUpdates' | 'extraFunding' | 'assets' | 'plugins'> & MaybeSigner & Partial<Pick<NewAccountABI, 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'automaticUpdates' | 'extraFunding' | 'assets'>> & {
    plugins?: PluginInstallParams[];
    /**
     * SG-04: signer for an external `controlledAddress`. The account must hand itself to the
     * factory (rekey) inside the creation group; the SDK adds that transaction first. If omitted,
     * the AlgorandClient's registered signer for `controlledAddress` is used.
     */
    controlledSigner?: TransactionSigner;
});
export declare class WalletFactorySDK extends BaseSDK<AbstractedAccountFactoryClient> {
    constructor(params: NewContractSDKParams);
    /**
     * Create a wallet. `referrer` (any address, default zero) is stored as the wallet's `referrer` global and
     * is paid its cut of the DAO creation fee by the factory (Q1-A2). The wallet is NOT written into the
     * EscrowFactory reverse registry (principal-resolution Phase 3).
     */
    new({ sender, signer, controlledAddress, admin, nickname, referrer, salt, bio, automaticUpdates, extraFunding, assets, plugins, controlledSigner, }: NewParams): Promise<WalletSDK>;
    get({ appId }: {
        appId: bigint;
    }): Promise<WalletSDK>;
    /**
     * The exact payment `newAccount` requires before extras (extra funding, asset opt-ins, plugin boxes).
     * Q1-A2: the creation referral (cut + disbursement MBR) comes out of the DAO's creation fee, so the
     * price is the same for every caller and never depends on the EscrowFactory registry.
     */
    cost(params?: MaybeSigner): Promise<bigint>;
}
export type NewWalletParams = NewContractSDKParams & NewParams & {
    /**
     * LEGACY. Also write the wallet into the EscrowFactory reverse registry (`register('')`).
     * Default: `!registryWritesStopped(network)` (networks.ts `REGISTRY_WRITES_STOPPED`). Registry writes
     * stop only after the Phase 3 proposal has executed on that network (spec §7.1); until then deployed
     * consumers still read the registry. LocalNet already runs the Phase 3 code, so it defaults to no write.
     * Pass `true` / `false` to force either behaviour (tests of legacy registry semantics pass `true`).
     * Removed in Phase 4.
     */
    register?: boolean;
};
export declare function newWallet({ factoryParams, algorand, readerAccount, sendParams, sender, signer, controlledAddress, admin, nickname, referrer, salt, bio, automaticUpdates, extraFunding, assets, plugins, controlledSigner, register, }: NewWalletParams): Promise<WalletSDK>;
export {};
