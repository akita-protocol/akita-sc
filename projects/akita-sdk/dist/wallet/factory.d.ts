import { AbstractedAccountFactoryArgs, type AbstractedAccountFactoryClient } from '../generated/AbstractedAccountFactoryClient';
import { NewContractSDKParams, MaybeSigner } from '../types';
import { PluginInstallParams } from './types';
import { WalletSDK } from './index';
import { BaseSDK } from '../base';
export type WalletFactoryContractArgs = AbstractedAccountFactoryArgs["obj"];
type NewAccountABI = WalletFactoryContractArgs['newAccount(pay,address,address,string,address,byte[32],string,uint64,uint64[],(uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)[])uint64'];
export type NewParams = (Omit<NewAccountABI, 'payment' | 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'extraFunding' | 'assets' | 'plugins'> & MaybeSigner & Partial<Pick<NewAccountABI, 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'extraFunding' | 'assets'>> & {
    plugins?: PluginInstallParams[];
});
export declare class WalletFactorySDK extends BaseSDK<AbstractedAccountFactoryClient> {
    constructor(params: NewContractSDKParams);
    new({ sender, signer, controlledAddress, admin, nickname, referrer, salt, bio, extraFunding, assets, plugins }: NewParams): Promise<WalletSDK>;
    get({ appId }: {
        appId: bigint;
    }): Promise<WalletSDK>;
    cost(params?: MaybeSigner): Promise<bigint>;
}
export declare function newWallet({ factoryParams, algorand, readerAccount, sendParams, sender, signer, controlledAddress, admin, nickname, referrer, salt, bio, extraFunding, assets, plugins, }: NewContractSDKParams & NewParams): Promise<WalletSDK>;
export {};
