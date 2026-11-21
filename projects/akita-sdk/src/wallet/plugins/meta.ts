import { BaseSDK } from "../../base";
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { MetaPluginClient, MetaPluginFactory } from "../../generated/MetaPluginClient";
import {
  metadataDataKey,
  metadataDataParts,
  metadataPluginValueLimit,
  validateMetadataValueSize,
  validateMetadataRecordKey,
} from "../../meta/records";
import { MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn } from "../../types";
import { ABIType } from "algosdk";
import { sha256 } from "@noble/hashes/sha2.js";
import { MetaSDK } from "../../meta";
import { decodeMetadataScope, metadataScopeArgs, MetaPluginScope } from "./meta-scope";
import type { WalletSDK } from "../index";
import type { WalletUsePluginParams } from "../types";
import { getTxns } from "../utils";

type MetaRoot = MaybeSigner & { rekeyBack?: boolean; namespace: string };

type MetadataWrite = MaybeSigner & { rekeyBack?: boolean; namespace: string; key: string; expectedRevision: bigint };
type MetadataSet = MetadataWrite & { data: Uint8Array };

export { MetaPluginFactory, MetaPluginClient } from "../../generated/MetaPluginClient";
export * from "./meta-scope";

/** Split a GrantPolicyPlugin record into the grant's install epoch and the plugin's policy body. */
export function decodeGrantPolicy(data: Uint8Array): { start: bigint; body: Uint8Array } {
  if (data.length < 8) throw new Error("Grant policy record is shorter than its 8-byte header.");
  return { start: new DataView(data.buffer, data.byteOffset, 8).getBigUint64(0), body: data.slice(8) };
}

export class MetaPluginSDK extends BaseSDK<MetaPluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: MetaPluginFactory, ...params });
  }

  async getScope(args: { wallet: bigint; caller: string; escrow?: string }) {
    const registry = await this.client.state.global.registry();
    if (registry === undefined) throw new Error("Meta plugin is not initialized.");
    const key = metaPluginPolicyKey(args.wallet, args.caller, args.escrow ?? "");
    const meta = new MetaSDK({ algorand: this.algorand, readerAccount: this.getReaderSendParams({}).sender?.toString(), factoryParams: { appId: registry } });
    const record = await meta.readRecord(this.client.appAddress.toString(), key);
    if (!record.exists) return { registry, revision: 0n, start: 0n, scope: undefined };
    // A grant policy starts with the install epoch of the grant it was written for (GrantPolicyPlugin).
    const { start, body } = decodeGrantPolicy(record.data);
    const [namespace, keys] = ABIType.from("(string,string[])").decode(body) as [string, string[]];
    return { registry, revision: record.revision, start, scope: decodeMetadataScope(namespace, ABIType.from("string[]").encode(keys)) };
  }

  configureScope(args: MaybeSigner & { caller: string; escrow?: string; scope: MetaPluginScope; expectedRevision: bigint; rekeyBack?: boolean }): PluginSDKReturn {
    const scope = metadataScopeArgs(args.scope);
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors: [this.client.appClient.getABIMethod("configureScope").getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => [{ type: "methodCall", ...(await this.client.params.configureScope({
        ...sendParams, args: { wallet, rekeyBack: args.rekeyBack ?? true, caller: args.caller, escrow: args.escrow ?? "", ...scope, expectedRevision: args.expectedRevision },
      })) }],
    });
  }

  clearScope(args: MaybeSigner & { caller: string; escrow?: string; expectedRevision: bigint; rekeyBack?: boolean }): PluginSDKReturn {
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors: [this.client.appClient.getABIMethod("clearScope").getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => [{ type: "methodCall", ...(await this.client.params.clearScope({
        ...sendParams, args: { wallet, rekeyBack: args.rekeyBack ?? true, caller: args.caller, escrow: args.escrow ?? "", expectedRevision: args.expectedRevision },
      })) }],
    });
  }

  set(): PluginSDKReturn;
  set(args: MetadataSet): PluginSDKReturn;
  set(args?: MetadataSet): PluginSDKReturn {
    return this.pluginCall("set", args);
  }

  remove(): PluginSDKReturn;
  remove(args: MetadataWrite): PluginSDKReturn;
  remove(args?: MetadataWrite): PluginSDKReturn {
    return this.pluginCall("remove", args);
  }

  addRoot(): PluginSDKReturn;
  addRoot(args: MetaRoot & { root: Uint8Array; type: bigint | number }): PluginSDKReturn;
  addRoot(args?: MetaRoot & { root: Uint8Array; type: bigint | number }): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod("addRoot").getSelector()];
    if (args === undefined) return () => ({ appId: this.appId, selectors, getTxns });
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => [
        {
          type: "methodCall",
          ...(await this.client.params.addRoot({
            ...sendParams,
            args: { wallet, rekeyBack: args.rekeyBack ?? true, namespace: args.namespace, root: args.root, type: args.type },
          })),
        },
      ],
    });
  }

  updateRoot(): PluginSDKReturn;
  updateRoot(args: MetaRoot & { root: Uint8Array }): PluginSDKReturn;
  updateRoot(args?: MetaRoot & { root: Uint8Array }): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod("updateRoot").getSelector()];
    if (args === undefined) return () => ({ appId: this.appId, selectors, getTxns });
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => [
        {
          type: "methodCall",
          ...(await this.client.params.updateRoot({
            ...sendParams,
            args: { wallet, rekeyBack: args.rekeyBack ?? true, namespace: args.namespace, root: args.root },
          })),
        },
      ],
    });
  }

  deleteRoot(): PluginSDKReturn;
  deleteRoot(args: MetaRoot): PluginSDKReturn;
  deleteRoot(args?: MetaRoot): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod("deleteRoot").getSelector()];
    if (args === undefined) return () => ({ appId: this.appId, selectors, getTxns });
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => [
        {
          type: "methodCall",
          ...(await this.client.params.deleteRoot({
            ...sendParams,
            args: { wallet, rekeyBack: args.rekeyBack ?? true, namespace: args.namespace },
          })),
        },
      ],
    });
  }

  addData(): PluginSDKReturn;
  addData(args: MetaRoot & { key: string; value: string }): PluginSDKReturn;
  addData(args?: MetaRoot & { key: string; value: string }): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod("addData").getSelector()];
    if (args === undefined) return () => ({ appId: this.appId, selectors, getTxns });
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => [
        {
          type: "methodCall",
          ...(await this.client.params.addData({
            ...sendParams,
            args: { wallet, rekeyBack: args.rekeyBack ?? true, namespace: args.namespace, key: args.key, value: args.value },
          })),
        },
      ],
    });
  }

  deleteData(): PluginSDKReturn;
  deleteData(args: MetaRoot & { key: string }): PluginSDKReturn;
  deleteData(args?: MetaRoot & { key: string }): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod("deleteData").getSelector()];
    if (args === undefined) return () => ({ appId: this.appId, selectors, getTxns });
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => [
        {
          type: "methodCall",
          ...(await this.client.params.deleteData({
            ...sendParams,
            args: { wallet, rekeyBack: args.rekeyBack ?? true, namespace: args.namespace, key: args.key },
          })),
        },
      ],
    });
  }

  addType(): PluginSDKReturn;
  addType(args: MaybeSigner & { rekeyBack?: boolean; description: string; schemaList: bigint[] | number[] }): PluginSDKReturn;
  addType(args?: MaybeSigner & { rekeyBack?: boolean; description: string; schemaList: bigint[] | number[] }): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod("addType").getSelector()];
    if (args === undefined) return () => ({ appId: this.appId, selectors, getTxns });
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => [
        {
          type: "methodCall",
          ...(await this.client.params.addType({
            ...sendParams,
            args: { wallet, rekeyBack: args.rekeyBack ?? true, description: args.description, schemaList: args.schemaList },
          })),
        },
      ],
    });
  }

  /** Publish the complete value in one plugin call within a wallet execution. */
  async setRecord({ wallet, execution = {}, ...args }:
    Omit<MetadataSet, "rekeyBack"> & { wallet: Pick<WalletSDK, "usePlugin">; execution?: Omit<WalletUsePluginParams, "calls"> }) {
    validateMetadataValueSize(args.data.length, metadataPluginValueLimit(args.namespace, args.key));
    const sender = args.sender ?? execution.sender;
    const signer = args.signer ?? execution.signer;
    return wallet.usePlugin({ ...execution, sender, signer, calls: [this.set({ ...args, sender, signer })] });
  }

  private pluginCall(method: "set" | "remove", args?: MetadataSet | MetadataWrite): PluginSDKReturn {
    const selectors = [this.client.appClient.getABIMethod(method).getSelector()];
    if (args === undefined) return () => ({ appId: this.appId, selectors, getTxns });
    validateMetadataRecordKey(metadataDataKey(args.namespace, args.key));
    if ("data" in args) validateMetadataValueSize(args.data.length, metadataPluginValueLimit(args.namespace, args.key));
    const sendParams = this.getRequiredSendParams(args);
    return () => ({
      appId: this.appId,
      selectors,
      getTxns: async ({ wallet }: PluginHookParams) => {
        const callArgs = {
          wallet,
          rekeyBack: args.rekeyBack ?? true,
          namespace: args.namespace,
          key: args.key,
          expectedRevision: args.expectedRevision,
        };
        const params =
          method === "set"
            ? await this.client.params.set({ ...sendParams, args: { ...callArgs, ...metadataDataParts((args as MetadataSet).data) } })
            : await this.client.params.remove({ ...sendParams, args: callArgs });
        return [{ type: "methodCall", ...params }];
      },
    });
  }
}

/** This adapter compresses its composite policy identity into a 31-byte record key. */
export function metaPluginPolicyKey(wallet: bigint, caller: string, escrow = ""): Uint8Array {
  return sha256(ABIType.from("(uint64,address,string)").encode([wallet, caller, escrow])).slice(0, 31);
}

/** Deploy one reusable adapter. Configure delegated grants through an admin wallet execution. */
export async function newMetaPlugin(params: {
  algorand: NewContractSDKParams["algorand"];
  sender: string;
  signer: NonNullable<MaybeSigner["signer"]>;
  registry: bigint;
}): Promise<MetaPluginSDK> {
  const { algorand, sender, signer, registry } = params;
  const factory = algorand.client.getTypedAppFactory(MetaPluginFactory, { defaultSender: sender, defaultSigner: signer });
  const { appClient } = await factory.send.create.create({ args: { registry } });
  await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) });
  return new MetaPluginSDK({ algorand, readerAccount: sender, factoryParams: { appId: appClient.appId, defaultSender: sender, defaultSigner: signer } });
}
