import { BaseSDK } from "../../base";
import { SubscriptionsPluginArgs, SubscriptionsPluginClient } from "../../generated/SubscriptionsPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginSDKReturn } from "../../types";
type ContractArgs = SubscriptionsPluginArgs["obj"];
type OptInArgs = (Omit<ContractArgs['optIn(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type InitDescriptionArgs = (Omit<ContractArgs['initDescription(uint64,uint64)void'], 'wallet'> & MaybeSigner);
type LoadDescriptionArgs = (Omit<ContractArgs['loadDescription(uint64,uint64,byte[])void'], 'wallet'> & MaybeSigner);
type NewServiceArgs = (Omit<ContractArgs['newService(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type NewServiceWithDescriptionArgs = NewServiceArgs & {
    description: string;
};
type UpdateServiceTitleArgs = (Omit<ContractArgs['updateServiceTitle(uint64,bool,uint64,string)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type UpdateServiceHighlightArgs = (Omit<ContractArgs['updateServiceHighlight(uint64,bool,uint64,uint8,byte[3])void'], 'wallet' | 'rekeyBack' | 'highlightColor'> & MaybeSigner & {
    rekeyBack?: boolean;
    /** `#rrggbb` or the raw 3 bytes */
    highlightColor: string | Uint8Array;
});
type SetFeaturedServiceArgs = (Omit<ContractArgs['setFeaturedService(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ClearFeaturedServiceArgs = MaybeSigner & {
    rekeyBack?: boolean;
};
type SetServiceDescriptionArgs = (Omit<ContractArgs['setServiceDescription(uint64,bool,uint64,uint64,byte[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type UpdateServiceDescriptionArgs = (Omit<SetServiceDescriptionArgs, 'offset' | 'data'> & {
    description: string;
});
type UpdateServiceMetadataArgs = (Omit<UpdateServiceTitleArgs, 'title'> & {
    title?: string;
    description?: string;
});
type PauseServiceArgs = (Omit<ContractArgs['pauseService(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type ShutdownServiceArgs = (Omit<ContractArgs['shutdownService(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type BlockArgs = (Omit<ContractArgs['block(uint64,bool,address)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type UnblockArgs = (Omit<ContractArgs['unblock(uint64,bool,address)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type SubscribeArgs = (Omit<ContractArgs['subscribe(uint64,bool,uint64,address,uint64,uint64,uint64,byte[][])void'], 'wallet' | 'rekeyBack' | 'index' | 'args' | 'asset'> & MaybeSigner & {
    rekeyBack?: boolean;
    index?: bigint | number;
    args?: Uint8Array[];
    asset?: bigint | number;
});
type TriggerPaymentArgs = (Omit<ContractArgs['triggerPayment(uint64,bool,address,uint64,byte[][])void'], 'wallet' | 'rekeyBack' | 'args'> & MaybeSigner & {
    rekeyBack?: boolean;
    args?: Uint8Array[];
});
type FundTriggerPaymentArgs = (MaybeSigner & {
    id: bigint | number;
    rekeyBack?: boolean;
});
type DepositArgs = (Omit<ContractArgs['deposit(uint64,bool,uint64,uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type WithdrawArgs = (Omit<ContractArgs['withdraw(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type UnsubscribeArgs = (Omit<ContractArgs['unsubscribe(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type StreakCheckArgs = (Omit<ContractArgs['streakCheck(uint64,bool,(address,uint64))void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
type SetPassesArgs = (Omit<ContractArgs['setPasses(uint64,bool,uint64,address[])void'], 'wallet' | 'rekeyBack'> & MaybeSigner & {
    rekeyBack?: boolean;
});
export declare class SubscriptionsPluginSDK extends BaseSDK<SubscriptionsPluginClient> {
    constructor(params: NewContractSDKParams);
    optIn(): PluginSDKReturn;
    optIn(args: OptInArgs): PluginSDKReturn;
    initDescription(): PluginSDKReturn;
    initDescription(args: InitDescriptionArgs): PluginSDKReturn;
    loadDescription(): PluginSDKReturn;
    loadDescription(args: LoadDescriptionArgs): PluginSDKReturn;
    newService(): PluginSDKReturn;
    newService(args: NewServiceArgs): PluginSDKReturn;
    /**
     * Composes initDescription + loadDescription (chunked) + newService into the
     * correct call order expected by the plugin contract. Spread the returned
     * array into the `calls` parameter of `wallet.build.usePlugin()`.
     */
    newServiceWithDescription(args: NewServiceWithDescriptionArgs): PluginSDKReturn[];
    updateServiceTitle(): PluginSDKReturn;
    updateServiceTitle(args: UpdateServiceTitleArgs): PluginSDKReturn;
    updateServiceHighlight(): PluginSDKReturn;
    updateServiceHighlight(args: UpdateServiceHighlightArgs): PluginSDKReturn;
    /** the plugin pays the featured box storage from the wallet on the first call */
    setFeaturedService(): PluginSDKReturn;
    setFeaturedService(args: SetFeaturedServiceArgs): PluginSDKReturn;
    clearFeaturedService(): PluginSDKReturn;
    clearFeaturedService(args: ClearFeaturedServiceArgs): PluginSDKReturn;
    setServiceDescription(): PluginSDKReturn;
    setServiceDescription(args: SetServiceDescriptionArgs): PluginSDKReturn;
    updateServiceDescription(args: UpdateServiceDescriptionArgs): PluginSDKReturn[];
    updateServiceMetadata(args: UpdateServiceMetadataArgs): PluginSDKReturn[];
    pauseService(): PluginSDKReturn;
    pauseService(args: PauseServiceArgs): PluginSDKReturn;
    shutdownService(): PluginSDKReturn;
    shutdownService(args: ShutdownServiceArgs): PluginSDKReturn;
    block(): PluginSDKReturn;
    block(args: BlockArgs): PluginSDKReturn;
    unblock(): PluginSDKReturn;
    unblock(args: UnblockArgs): PluginSDKReturn;
    subscribe(): PluginSDKReturn;
    subscribe(args: SubscribeArgs): PluginSDKReturn;
    triggerPayment(): PluginSDKReturn;
    triggerPayment(args: TriggerPaymentArgs): PluginSDKReturn;
    fundTriggerPayment(): PluginSDKReturn;
    fundTriggerPayment(args: FundTriggerPaymentArgs): PluginSDKReturn;
    deposit(): PluginSDKReturn;
    deposit(args: DepositArgs): PluginSDKReturn;
    withdraw(): PluginSDKReturn;
    withdraw(args: WithdrawArgs): PluginSDKReturn;
    unsubscribe(): PluginSDKReturn;
    unsubscribe(args: UnsubscribeArgs): PluginSDKReturn;
    streakCheck(): PluginSDKReturn;
    streakCheck(args: StreakCheckArgs): PluginSDKReturn;
    setPasses(): PluginSDKReturn;
    setPasses(args: SetPassesArgs): PluginSDKReturn;
}
export {};
