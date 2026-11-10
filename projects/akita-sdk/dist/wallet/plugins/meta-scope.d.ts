export declare const METADATA_MAX_SCOPE_BYTES = 124;
export type MetaPluginScope = {
    type: "unrestricted";
} | {
    type: "namespace";
    namespace: string;
} | {
    type: "keys";
    namespace: string;
    keys: readonly string[];
};
export declare function metadataScopeArgs(scope?: MetaPluginScope): {
    namespace: string;
    keys: string[];
};
export declare function decodeMetadataScope(namespace: string, encodedKeys: Uint8Array): MetaPluginScope;
