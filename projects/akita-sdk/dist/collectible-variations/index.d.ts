import { BaseSDK } from '../base';
import { CollectibleVariationsClient, RemoveResult, WriteResult } from '../generated/CollectibleVariationsClient';
import { MerkleTree } from '../meta/tree';
import { MaybeSigner, NewContractSDKParams } from '../types';
import { Grant, MainBox, Pin, Policy, Slot, Variation, WriterSet } from './codec';
export * from './codec';
export * from './errors';
export * as layout from './layout';
export type { RemoveResult, WriteResult } from '../generated/CollectibleVariationsClient';
type Method = 'writeVariation' | 'deleteVariation' | 'pinMainCreator' | 'pinMainHolder' | 'unpinMainCreator' | 'unpinMainHolder' | 'setAssetPolicy' | 'setManagerPolicy' | 'deleteAssetPolicy' | 'deleteManagerPolicy' | 'setGrant' | 'deleteGrant' | 'purge';
/** A call's ABI result and the deposit paid in front of it (0 when none). */
export type Sent<T> = {
    result: T;
    deposit: bigint;
};
/** An ARC-20 Smart ASA's controlling app; omit (0) for a plain ASA. */
type Controlled = {
    controllingApp?: bigint;
};
export type WriteVariationParams = MaybeSigner & Controlled & {
    asset: bigint;
    slot: Slot;
    /** Bind the entry to this holder (holder scope). Omit for collectible scope. */
    holder?: string;
    kind: number;
    sub?: number;
    lock?: boolean;
    flat?: Uint8Array;
    body?: Uint8Array;
    /** IfAbsent (0n), a stored revision, or IfAny (the default). */
    ifRevision?: bigint;
    /** Merkle proof, for writers admitted by a `meta` writer set. */
    proof?: Uint8Array[];
};
export type VariationKey = {
    asset: bigint;
    writer: string;
    slot: Slot;
};
export type PolicyParams = {
    collectible?: WriterSet;
    holder?: WriterSet;
    managerWrites?: boolean;
    holderPinsCollectibleOnly?: boolean;
};
export type MainView = {
    role: number;
    pin?: Pin;
};
/**
 * SDK for the Collectible Variations registry: per-asset variations (images,
 * render bundles, data, links), the main image pin, creator policies, holder
 * grants, and purge after destroy.
 *
 * Every write measures its own deposit: the SDK simulates the call once
 * without a payment, reads the required amount from the `cv:deposit:` log,
 * then sends `[payment, call]`. Refunds arrive by inner payment.
 */
export declare class CollectibleVariationsSDK extends BaseSDK<CollectibleVariationsClient> {
    constructor(params: NewContractSDKParams);
    writeVariation({ sender, signer, asset, slot, holder, kind, sub, lock, flat, body, ifRevision, proof, controllingApp, }: WriteVariationParams): Promise<Sent<WriteResult>>;
    deleteVariation({ sender, signer, asset, writer, slot, controllingApp }: MaybeSigner & Controlled & VariationKey): Promise<Sent<RemoveResult>>;
    /** Pin a collectible-scope variation as the creator's main image. */
    pinMainCreator({ sender, signer, asset, writer, slot, sourceRevision, lock, controllingApp, }: MaybeSigner & Controlled & VariationKey & {
        sourceRevision: bigint;
        lock?: boolean;
    }): Promise<Sent<WriteResult>>;
    /** Pin a variation as the holder's main image (single-unit assets only). */
    pinMainHolder({ sender, signer, asset, writer, slot, sourceRevision }: MaybeSigner & VariationKey & {
        sourceRevision: bigint;
    }): Promise<Sent<WriteResult>>;
    unpinMainCreator({ sender, signer, asset, controllingApp }: MaybeSigner & Controlled & {
        asset: bigint;
    }): Promise<Sent<RemoveResult>>;
    unpinMainHolder({ sender, signer, asset }: MaybeSigner & {
        asset: bigint;
    }): Promise<Sent<RemoveResult>>;
    /** Set one asset's policy (overrides the manager policy). `lock` is permanent. */
    setAssetPolicy({ sender, signer, asset, controllingApp, lock, ...policy }: MaybeSigner & Controlled & PolicyParams & {
        asset: bigint;
        lock?: boolean;
    }): Promise<Sent<WriteResult>>;
    /** Set the policy of every asset whose ASA manager is the sender. */
    setManagerPolicy({ sender, signer, ...policy }: MaybeSigner & PolicyParams): Promise<Sent<WriteResult>>;
    deleteAssetPolicy({ sender, signer, asset, controllingApp }: MaybeSigner & Controlled & {
        asset: bigint;
    }): Promise<Sent<RemoveResult>>;
    deleteManagerPolicy(params?: MaybeSigner): Promise<Sent<RemoveResult>>;
    /** Writers the sender admits for holder-scope entries bound to it. */
    setGrant({ sender, signer, writers }: MaybeSigner & {
        writers: WriterSet;
    }): Promise<Sent<WriteResult>>;
    deleteGrant(params?: MaybeSigner): Promise<Sent<RemoveResult>>;
    /** Delete a `v`, `m` or `p` box of a destroyed asset. Anyone may call. */
    purge({ sender, signer, name }: MaybeSigner & {
        name: Uint8Array;
    }): Promise<Sent<RemoveResult>>;
    getVariation({ asset, writer, slot }: VariationKey): Promise<Variation | undefined>;
    getMainBox({ asset }: {
        asset: bigint;
    }): Promise<MainBox | undefined>;
    getAssetPolicy({ asset }: {
        asset: bigint;
    }): Promise<Policy | undefined>;
    getManagerPolicy({ manager }: {
        manager: string;
    }): Promise<Policy | undefined>;
    getGrant({ holder }: {
        holder: string;
    }): Promise<Grant | undefined>;
    /** The policy that applies to an asset: `p`, else `P` of its ASA manager, else the default. */
    getEffectivePolicy({ asset }: {
        asset: bigint;
    }): Promise<{
        policy: Policy;
        source: 'asset' | 'manager' | 'default';
    }>;
    /**
     * The pin that applies, as getMain computes it: a holder pin whose
     * holder still holds one whole unit, else the creator pin, else role 0.
     * Read from the box and the holder's balance, so it needs no funded reader.
     */
    getMain({ asset }: {
        asset: bigint;
    }): Promise<MainView>;
    /** holding(account).amount >= 10^decimals; false when not opted in. */
    holds(account: string, asset: bigint, decimals: number): Promise<boolean>;
    /**
     * The deposit a call needs, learned by simulating it without a payment: the
     * registry logs `cv:deposit:` || amount before it rejects. 0 when the call
     * needs no deposit or fails for another reason (sending it then reports that
     * reason).
     */
    depositFor(method: Method, args: object, params?: MaybeSigner): Promise<bigint>;
    /** A `meta` writer set's Merkle tree over writer addresses (leaf = sha256(sha256(address))). */
    static writerListTree(writers: string[]): MerkleTree<[Uint8Array]>;
    /** The proof that `writer` is in `tree`, for `writeVariation({ proof })`. */
    static writerProof(tree: MerkleTree<[Uint8Array]>, writer: string): Uint8Array[];
    private policyArgs;
    private call;
    private box;
}
