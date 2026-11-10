import { ABIType } from "algosdk";
import { validateMetadataName, metadataDataKey } from "../../meta/records";
const keysType = ABIType.from("string[]");
export const METADATA_MAX_SCOPE_BYTES = 124;

export type MetaPluginScope =
  | { type: "unrestricted" }
  | { type: "namespace"; namespace: string }
  | { type: "keys"; namespace: string; keys: readonly string[] };

export function metadataScopeArgs(scope: MetaPluginScope = { type: "unrestricted" }) {
  if (scope.type === "unrestricted") return { namespace: "", keys: [] as string[] };
  validateMetadataName(scope.namespace);
  const keys = scope.type === "keys" ? [...scope.keys] : [];
  if (scope.type === "keys" && keys.length === 0) throw new Error("A key-restricted scope must select at least one key.");
  keys.forEach((key) => { validateMetadataName(key); metadataDataKey(scope.namespace, key); });
  if (new Set(keys).size !== keys.length) throw new Error("Duplicate metadata scope keys.");
  if (keysType.encode(keys).length > METADATA_MAX_SCOPE_BYTES) throw new Error("The encoded scope key list exceeds 124 bytes.");
  const encoder = new TextEncoder();
  keys.sort((a, b) => {
    const left = encoder.encode(a), right = encoder.encode(b);
    if (left.length !== right.length) return left.length - right.length;
    for (let i = 0; i < left.length; i++) if (left[i] !== right[i]) return left[i] - right[i];
    return 0;
  });
  return { namespace: scope.namespace, keys };
}

export function decodeMetadataScope(namespace: string, encodedKeys: Uint8Array): MetaPluginScope {
  const keys = keysType.decode(encodedKeys) as string[];
  const scope: MetaPluginScope =
    namespace === "" ? { type: "unrestricted" } : keys.length ? { type: "keys", namespace, keys } : { type: "namespace", namespace };
  if (namespace === "" && keys.length) throw new Error("Invalid metadata plugin scope.");
  metadataScopeArgs(scope);
  return scope;
}

