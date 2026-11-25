import { microAlgo } from '@algorandfoundation/algokit-utils';
import algosdk, { decodeAddress } from 'algosdk';
import { BaseSDK } from '../base';
import {
  CollectibleVariationsClient,
  CollectibleVariationsFactory,
  RemoveResult,
  WriteResult,
} from '../generated/CollectibleVariationsClient';
import { createAddressTree, MerkleTree } from '../meta/tree';
import { MaybeSigner, NewContractSDKParams } from '../types';
import {
  assetPolicyBoxName,
  decodeGrant,
  decodeMain,
  decodePolicy,
  decodeVariation,
  DEFAULT_POLICY,
  encodeWriterSet,
  grantBoxName,
  Grant,
  mainBoxName,
  MainBox,
  managerPolicyBoxName,
  parseDepositLog,
  Pin,
  Policy,
  Slot,
  slotBytes,
  variationBoxName,
  Variation,
  WriterSet,
} from './codec';
import { IfAny, PlainAsa, RoleCreator, RoleHolder, RoleNone } from './layout';

export * from './codec';
export * from './errors';
export * as layout from './layout';
export type { RemoveResult, WriteResult } from '../generated/CollectibleVariationsClient';

/** Fee the deposit-discovery simulate pays, so inner calls (Meta, Smart ASA, delegates) can run. */
const DISCOVERY_FEE = 60_000n;

type Method =
  | 'arcTbdWriteVariation'
  | 'arcTbdDeleteVariation'
  | 'arcTbdPinMainCreator'
  | 'arcTbdPinMainHolder'
  | 'arcTbdUnpinMainCreator'
  | 'arcTbdUnpinMainHolder'
  | 'arcTbdSetAssetPolicy'
  | 'arcTbdSetManagerPolicy'
  | 'arcTbdDeleteAssetPolicy'
  | 'arcTbdDeleteManagerPolicy'
  | 'arcTbdSetGrant'
  | 'arcTbdDeleteGrant'
  | 'arcTbdPurge';

/** A call's ABI result and the deposit paid in front of it (0 when none). */
export type Sent<T> = { result: T; deposit: bigint };

/** An ARC-20 Smart ASA's controlling app; omit (0) for a plain ASA. */
type Controlled = { controllingApp?: bigint };

export type WriteVariationParams = MaybeSigner &
  Controlled & {
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

export type VariationKey = { asset: bigint; writer: string; slot: Slot };

export type PolicyParams = {
  collectible?: WriterSet;
  holder?: WriterSet;
  managerWrites?: boolean;
  holderPinsCollectibleOnly?: boolean;
};

export type MainView = { role: number; pin?: Pin };

/**
 * SDK for the Collectible Variations registry: per-asset variations (images,
 * render bundles, data, links), the main image pin, creator policies, holder
 * grants, and purge after destroy.
 *
 * Every write measures its own deposit: the SDK simulates the call once
 * without a payment, reads the required amount from the `cv:deposit:` log,
 * then sends `[payment, call]`. Refunds arrive by inner payment.
 */
export class CollectibleVariationsSDK extends BaseSDK<CollectibleVariationsClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: CollectibleVariationsFactory, ...params }, 'COLLECTIBLE_VARIATIONS_APP_ID');
  }

  // ========== Writes ==========

  async writeVariation({
    sender,
    signer,
    asset,
    slot,
    holder,
    kind,
    sub = 0,
    lock = false,
    flat = new Uint8Array(),
    body = new Uint8Array(),
    ifRevision = IfAny,
    proof = [],
    controllingApp = BigInt(PlainAsa),
  }: WriteVariationParams): Promise<Sent<WriteResult>> {
    return this.call(
      'arcTbdWriteVariation',
      {
        asset,
        controllingApp,
        slot: slotBytes(slot),
        holder: holder ?? algosdk.ALGORAND_ZERO_ADDRESS_STRING,
        kind,
        sub,
        lock,
        flat,
        body,
        ifRevision,
        proof,
      },
      { sender, signer },
    );
  }

  async deleteVariation({ sender, signer, asset, writer, slot, controllingApp = 0n }: MaybeSigner & Controlled & VariationKey) {
    return this.call<RemoveResult>('arcTbdDeleteVariation', { asset, controllingApp, writer, slot: slotBytes(slot) }, { sender, signer });
  }

  /** Pin a collectible-scope variation as the creator's main image. */
  async pinMainCreator({
    sender,
    signer,
    asset,
    writer,
    slot,
    sourceRevision,
    lock = false,
    controllingApp = 0n,
  }: MaybeSigner & Controlled & VariationKey & { sourceRevision: bigint; lock?: boolean }) {
    return this.call<WriteResult>(
      'arcTbdPinMainCreator',
      { asset, controllingApp, writer, slot: slotBytes(slot), sourceRevision, lock },
      { sender, signer },
    );
  }

  /** Pin a variation as the holder's main image (single-unit assets only). */
  async pinMainHolder({ sender, signer, asset, writer, slot, sourceRevision }: MaybeSigner & VariationKey & { sourceRevision: bigint }) {
    return this.call<WriteResult>('arcTbdPinMainHolder', { asset, writer, slot: slotBytes(slot), sourceRevision }, { sender, signer });
  }

  async unpinMainCreator({ sender, signer, asset, controllingApp = 0n }: MaybeSigner & Controlled & { asset: bigint }) {
    return this.call<RemoveResult>('arcTbdUnpinMainCreator', { asset, controllingApp }, { sender, signer });
  }

  async unpinMainHolder({ sender, signer, asset }: MaybeSigner & { asset: bigint }) {
    return this.call<RemoveResult>('arcTbdUnpinMainHolder', { asset }, { sender, signer });
  }

  /** Set one asset's policy (overrides the manager policy). `lock` is permanent. */
  async setAssetPolicy({ sender, signer, asset, controllingApp = 0n, lock = false, ...policy }: MaybeSigner & Controlled & PolicyParams & { asset: bigint; lock?: boolean }) {
    return this.call<WriteResult>('arcTbdSetAssetPolicy', { asset, controllingApp, ...this.policyArgs(policy), lock }, { sender, signer });
  }

  /** Set the policy of every asset whose ASA manager is the sender. */
  async setManagerPolicy({ sender, signer, ...policy }: MaybeSigner & PolicyParams) {
    return this.call<WriteResult>('arcTbdSetManagerPolicy', this.policyArgs(policy), { sender, signer });
  }

  async deleteAssetPolicy({ sender, signer, asset, controllingApp = 0n }: MaybeSigner & Controlled & { asset: bigint }) {
    return this.call<RemoveResult>('arcTbdDeleteAssetPolicy', { asset, controllingApp }, { sender, signer });
  }

  async deleteManagerPolicy(params: MaybeSigner = {}) {
    return this.call<RemoveResult>('arcTbdDeleteManagerPolicy', {}, params);
  }

  /** Writers the sender admits for holder-scope entries bound to it. */
  async setGrant({ sender, signer, writers }: MaybeSigner & { writers: WriterSet }) {
    return this.call<WriteResult>('arcTbdSetGrant', { writers: encodeWriterSet(writers) }, { sender, signer });
  }

  async deleteGrant(params: MaybeSigner = {}) {
    return this.call<RemoveResult>('arcTbdDeleteGrant', {}, params);
  }

  /** Delete a `v`, `m` or `p` box of a destroyed asset. Anyone may call. */
  async purge({ sender, signer, name }: MaybeSigner & { name: Uint8Array }) {
    return this.call<RemoveResult>('arcTbdPurge', { name }, { sender, signer });
  }

  // ========== Reads ==========

  async getVariation({ asset, writer, slot }: VariationKey): Promise<Variation | undefined> {
    const value = await this.box(variationBoxName(asset, writer, slot));
    return value && decodeVariation(value);
  }

  async getMainBox({ asset }: { asset: bigint }): Promise<MainBox | undefined> {
    const value = await this.box(mainBoxName(asset));
    return value && decodeMain(value);
  }

  async getAssetPolicy({ asset }: { asset: bigint }): Promise<Policy | undefined> {
    const value = await this.box(assetPolicyBoxName(asset));
    return value && decodePolicy(value);
  }

  async getManagerPolicy({ manager }: { manager: string }): Promise<Policy | undefined> {
    const value = await this.box(managerPolicyBoxName(manager));
    return value && decodePolicy(value);
  }

  async getGrant({ holder }: { holder: string }): Promise<Grant | undefined> {
    const value = await this.box(grantBoxName(holder));
    return value && decodeGrant(value);
  }

  /** The policy that applies to an asset: `p`, else `P` of its ASA manager, else the default. */
  async getEffectivePolicy({ asset }: { asset: bigint }): Promise<{ policy: Policy; source: 'asset' | 'manager' | 'default' }> {
    const own = await this.getAssetPolicy({ asset });
    if (own) return { policy: own, source: 'asset' };
    const { manager } = await this.algorand.asset.getById(asset);
    if (manager && manager !== algosdk.ALGORAND_ZERO_ADDRESS_STRING) {
      const managed = await this.getManagerPolicy({ manager: manager.toString() });
      if (managed) return { policy: managed, source: 'manager' };
    }
    return { policy: DEFAULT_POLICY, source: 'default' };
  }

  /**
   * The pin that applies, as arcTBD_get_main computes it: a holder pin whose
   * holder still holds one whole unit, else the creator pin, else role 0.
   * Read from the box and the holder's balance, so it needs no funded reader.
   */
  async getMain({ asset }: { asset: bigint }): Promise<MainView> {
    const main = await this.getMainBox({ asset });
    if (main?.holder && (await this.holds(main.holder.holder, asset, main.decimals))) {
      const { holder: _holder, ...pin } = main.holder;
      return { role: RoleHolder, pin };
    }
    if (main?.creator) return { role: RoleCreator, pin: main.creator };
    return { role: RoleNone };
  }

  /** holding(account).amount >= 10^decimals; false when not opted in. */
  async holds(account: string, asset: bigint, decimals: number): Promise<boolean> {
    if (account === algosdk.ALGORAND_ZERO_ADDRESS_STRING || decimals > 19) return false;
    try {
      const info = await this.algorand.asset.getAccountInformation(account, asset);
      return info.balance >= 10n ** BigInt(decimals);
    } catch {
      return false;
    }
  }

  // ========== Deposits ==========

  /**
   * The deposit a call needs, learned by simulating it without a payment: the
   * registry logs `cv:deposit:` || amount before it rejects. 0 when the call
   * needs no deposit or fails for another reason (sending it then reports that
   * reason).
   */
  async depositFor(method: Method, args: object, params: MaybeSigner = {}): Promise<bigint> {
    const { sender } = this.getSendParams(params);
    if (!sender) throw new Error('A sender is needed to measure a deposit');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const create = this.client.createTransaction as any;
    const { transactions } = await create[method]({ sender, args, staticFee: microAlgo(DISCOVERY_FEE) });
    const grouped = algosdk.assignGroupID(transactions);
    const response = await this.algorand.client.algod
      .simulateTransactions(
        new algosdk.modelsv2.SimulateRequest({
          txnGroups: [
            new algosdk.modelsv2.SimulateRequestTransactionGroup({
              txns: grouped.map((txn: algosdk.Transaction) => new algosdk.SignedTransaction({ txn })),
            }),
          ],
          allowEmptySignatures: true,
          allowUnnamedResources: true,
          allowMoreLogging: true,
          extraOpcodeBudget: 20_000,
        }),
      )
      .do();
    const logs = response.txnGroups[0].txnResults.flatMap((r) => r.txnResult.logs ?? []);
    return parseDepositLog(logs) ?? 0n;
  }

  /** A `meta` writer set's Merkle tree over writer addresses (leaf = sha256(sha256(address))). */
  static writerListTree(writers: string[]): MerkleTree<[Uint8Array]> {
    return createAddressTree(writers.map((w) => decodeAddress(w).publicKey));
  }

  /** The proof that `writer` is in `tree`, for `writeVariation({ proof })`. */
  static writerProof(tree: MerkleTree<[Uint8Array]>, writer: string): Uint8Array[] {
    const key = decodeAddress(writer).publicKey;
    const found = tree.getProofFor(([value]) => value.length === 32 && value.every((b, i) => b === key[i]));
    if (!found) throw new Error(`${writer} is not in the writer list`);
    return found.proof;
  }

  // ========== Internals ==========

  private policyArgs({ collectible, holder, managerWrites = true, holderPinsCollectibleOnly = false }: PolicyParams) {
    return {
      collectible: encodeWriterSet(collectible ?? { mode: 'closed' }),
      holder: encodeWriterSet(holder ?? { mode: 'closed' }),
      managerWrites,
      holderPinsCollectibleOnly,
    };
  }

  private async call<T>(method: Method, args: object, params: MaybeSigner): Promise<Sent<T>> {
    const sendParams = this.getRequiredSendParams(params);
    const deposit = await this.depositFor(method, args, params);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group = this.client.newGroup() as any;
    if (deposit > 0n) {
      const payment = await this.algorand.createTransaction.payment({
        sender: sendParams.sender,
        receiver: this.client.appAddress,
        amount: microAlgo(deposit),
      });
      group.addTransaction(payment, sendParams.signer);
    }
    group[method]({ ...sendParams, args });
    const sent = await group.send({ ...sendParams });
    return { result: sent.returns[sent.returns.length - 1] as T, deposit };
  }

  private async box(name: Uint8Array): Promise<Uint8Array | undefined> {
    try {
      return await this.algorand.app.getBoxValue(this.appId, name);
    } catch {
      return undefined;
    }
  }
}
