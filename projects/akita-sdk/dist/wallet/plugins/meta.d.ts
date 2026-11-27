import { BaseSDK } from "../../base";
import { MetaPluginClient } from "../../generated/MetaPluginClient";
import { MaybeSigner, NewContractSDKParams, PluginSDKReturn } from "../../types";
import type { MetaPreferenceRecord } from "../../meta/preferences";
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
    /**
     * The scope this MetaPlugin (or `plugin`, another MetaPlugin) applies to one grant. Grant policies
     * are owned by the wallet's controlled address and keyed by `grantPolicyKey`.
     */
    getScope(args: {
        wallet: bigint;
        caller: string;
        escrow?: string;
        plugin?: bigint;
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
    /** The raw grant policy of any plugin's grant `(plugin, caller, escrow)` on `wallet`. */
    getPolicy(args: {
        wallet: bigint;
        plugin: bigint;
        caller: string;
        escrow?: string;
    }): Promise<{
        registry: bigint;
        exists: false;
        revision: bigint;
        start: bigint;
        body: Uint8Array<ArrayBuffer>;
    } | {
        registry: bigint;
        exists: true;
        revision: bigint;
        start: bigint;
        body: Uint8Array<ArrayBufferLike>;
    }>;
    /**
     * Write the policy of `plugin`'s grant `(caller, escrow)`. Run it through this MetaPlugin's admin
     * grant (`CallerType.Admin`), on the MetaPlugin registered as Meta's policy writer. Put it in the
     * same group as the grant's install to leave no unconfigured gap.
     */
    configurePolicy(args: MaybeSigner & {
        plugin: bigint;
        caller: string;
        escrow?: string;
        body: Uint8Array;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    /** Remove the policy of `plugin`'s grant `(caller, escrow)`, through this MetaPlugin's admin grant. */
    clearPolicy(args: MaybeSigner & {
        plugin: bigint;
        caller: string;
        escrow?: string;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    /** `configurePolicy` for a MetaPlugin grant: `plugin` (default: this one) gets `scope`. */
    configureScope(args: MaybeSigner & {
        plugin?: bigint;
        caller: string;
        escrow?: string;
        scope: MetaPluginScope;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    /** `clearPolicy` for a MetaPlugin grant (default: this one). */
    clearScope(args: MaybeSigner & {
        plugin?: bigint;
        caller: string;
        escrow?: string;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    /** Point Meta at a new policy writer, through this MetaPlugin's grant on the DAO wallet (Meta accepts only the DAO wallet). */
    setPolicyWriter(args: MaybeSigner & {
        writer: bigint;
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
    /**
     * `set` for a preference record (see `meta/preferences`): the wallet's spending account publishes
     * `data` under `record`. Several of these can share one wallet execution.
     */
    setPreference(args: MaybeSigner & {
        record: Pick<MetaPreferenceRecord, "namespace" | "field">;
        data: Uint8Array;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    /** `remove` for a preference record; Meta refunds its storage deposit. */
    removePreference(args: MaybeSigner & {
        record: Pick<MetaPreferenceRecord, "namespace" | "field">;
        expectedRevision: bigint;
        rekeyBack?: boolean;
    }): PluginSDKReturn;
    /** Publish the complete value in one plugin call within a wallet execution. */
    setRecord({ wallet, execution, ...args }: Omit<MetadataSet, "rekeyBack"> & {
        wallet: Pick<WalletSDK, "usePlugin">;
        execution?: Omit<WalletUsePluginParams, "calls">;
    }): Promise<import("../..").GroupReturn>;
    private pluginCall;
}
/**
 * Meta record key of the grant policy for `(plugin, caller, escrow)`: the reserved 0x00 byte, then
 * the first 30 bytes of sha256 over the ARC-4 `(uint64,address,string)` grant identity.
 */
export declare function grantPolicyKey(plugin: bigint, caller: string, escrow?: string): Uint8Array;
/** The account that owns a wallet's grant policies: its controlled address. */
export declare function walletControlledAddress(algorand: NewContractSDKParams["algorand"], wallet: bigint): Promise<string>;
/** Deploy one reusable adapter. Configure delegated grants through an admin wallet execution. */
export declare function newMetaPlugin(params: {
    algorand: NewContractSDKParams["algorand"];
    sender: string;
    signer: NonNullable<MaybeSigner["signer"]>;
    registry: bigint;
}): Promise<MetaPluginSDK>;
