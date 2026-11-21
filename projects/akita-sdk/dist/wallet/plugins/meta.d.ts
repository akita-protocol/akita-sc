import { BaseSDK } from "../../base";
import { MetaPluginClient } from "../../generated/MetaPluginClient";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
import { MetaPluginScope } from "./meta-scope";
import type { WalletSDK } from "../index";
import type { WalletUsePluginParams } from "../types";
type MetaRoot = MaybeSigner & {
    rekeyBack?: boolean;
    namespace: string;
};
type MetadataWrite = MaybeSigner & {
    rekeyBack?: boolean;
    namespace: string;
    key: string;
    expectedRevision: bigint;
};
type MetadataSet = MetadataWrite & {
    data: Uint8Array;
};
export { MetaPluginFactory, MetaPluginClient } from "../../generated/MetaPluginClient";
export * from "./meta-scope";
/** Split a GrantPolicyPlugin record into the grant's install epoch and the plugin's policy body. */
export declare function decodeGrantPolicy(data: Uint8Array): {
    start: bigint;
    body: Uint8Array;
};
export declare class MetaPluginSDK extends BaseSDK<MetaPluginClient> {
    constructor(params: NewContractSDKParams);
    getScope(args: {
        wallet: bigint;
        caller: string;
        escrow?: string;
    }): Promise<{
        registry: bigint;
        revision: bigint;
        start: bigint;
        scope: undefined;
    } | {
        registry: bigint;
        revision: bigint;
        start: bigint;
        scope: MetaPluginScope;
    }>;
    configureScope(args: MaybeSigner & {
        caller: string;
        escrow?: string;
        scope: MetaPluginScope;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    clearScope(args: MaybeSigner & {
        caller: string;
        escrow?: string;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    set(): PluginSDKReturn;
    set(args: MetadataSet): PluginSDKReturn;
    remove(): PluginSDKReturn;
    remove(args: MetadataWrite): PluginSDKReturn;
    addRoot(): PluginSDKReturn;
    addRoot(args: MetaRoot & {
        root: Uint8Array;
        type: bigint | number;
    }): PluginSDKReturn;
    updateRoot(): PluginSDKReturn;
    updateRoot(args: MetaRoot & {
        root: Uint8Array;
    }): PluginSDKReturn;
    deleteRoot(): PluginSDKReturn;
    deleteRoot(args: MetaRoot): PluginSDKReturn;
    addData(): PluginSDKReturn;
    addData(args: MetaRoot & {
        key: string;
        value: string;
    }): PluginSDKReturn;
    deleteData(): PluginSDKReturn;
    deleteData(args: MetaRoot & {
        key: string;
    }): PluginSDKReturn;
    addType(): PluginSDKReturn;
    addType(args: MaybeSigner & {
        rekeyBack?: boolean;
        description: string;
        schemaList: bigint[] | number[];
    }): PluginSDKReturn;
    /** Publish the complete value in one plugin call within a wallet execution. */
    setRecord({ wallet, execution, ...args }: Omit<MetadataSet, "rekeyBack"> & {
        wallet: Pick<WalletSDK, "usePlugin">;
        execution?: Omit<WalletUsePluginParams, "calls">;
    }): Promise<import("../..").GroupReturn>;
    private pluginCall;
}
/** This adapter compresses its composite policy identity into a 31-byte record key. */
export declare function metaPluginPolicyKey(wallet: bigint, caller: string, escrow?: string): Uint8Array;
/** Deploy one reusable adapter. Configure delegated grants through an admin wallet execution. */
export declare function newMetaPlugin(params: {
    algorand: NewContractSDKParams["algorand"];
    sender: string;
    signer: NonNullable<MaybeSigner["signer"]>;
    registry: bigint;
}): Promise<MetaPluginSDK>;
