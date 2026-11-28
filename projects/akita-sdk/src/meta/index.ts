import {
  decodeMetadataBoxName,
  decodeMetadataRecord,
  metadataOwnerKey,
  metadataKeyBytes,
  metadataDataKey,
  metadataDataParts,
  MetadataKey,
  metadataStorageCost,
  validateMetadataRecordKey,
  metadataBoxName,
} from "./records";
import { decodeAddress, encodeAddress } from "algosdk";
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import { MetaClient, MetaFactory, TypesValue } from "../generated/MetaClient";
import { NewContractSDKParams, MaybeSigner } from "../types";
import {
  AddRootParams,
  UpdateRootParams,
  DeleteRootParams,
  AddDataParams,
  DeleteDataParams,
  AddTypeParams,
  GetRootParams,
  GetDataParams,
  GetTypeParams,
  VerifyParams,
  ReadParams,
  VerifiedReadParams,
  RootCostsParams,
  DataCostsParams,
  MetaGlobalState,
  SchemaPart,
} from "./types";
import { MerkleTree } from "./tree";

export * from "./types";
export * from "./tree";
export * from "./errors";

/** Cost in microAlgo for adding a new tree type */
export type RootKey = { address: string; name: string };

const ADD_TYPE_COST = 100_000_000n;

/**
 * SDK for interacting with the Meta contract.
 * Use this to manage merkle tree roots, metadata, and verify merkle proofs.
 */
export type SetMetadataArgs = MaybeSigner & {
  key: MetadataKey;
  data: Uint8Array;
  expectedRevision: bigint;
};
export type RemoveMetadataArgs = MaybeSigner & {
  key: MetadataKey;
  expectedRevision: bigint;
};

export class MetaSDK extends BaseSDK<MetaClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: MetaFactory, ...params }, ENV_VAR_NAMES.META_APP_ID);
  }

  // ========== Read Methods ==========

  /**
   * Gets the current global state of the Meta contract.
   */
  async getState(): Promise<MetaGlobalState> {
    const state = await this.client.state.global.getAll();

    return {
      typesId: state.typesId ?? 0n,
    };
  }

  /**
   * Gets a merkle root by address and name.
   * @returns The 32-byte merkle root or undefined if not found
   */
  async getRoot({ address, name }: GetRootParams): Promise<Uint8Array | undefined> {
    const rootKey = metadataOwnerKey(address, name);
    try {
      return (await this.client.state.box.roots.value(rootKey))?.root;
    } catch (error) {
      // Box doesn't exist - return undefined
      if (error instanceof Error && error.message.includes("box not found")) {
        return undefined;
      }
      throw error;
    }
  }

  /**
   * Checks if a merkle root exists.
   */
  async hasRoot({ address, name }: GetRootParams): Promise<boolean> {
    const root = await this.getRoot({ address, name });
    return root !== undefined;
  }

  /**
   * Gets all merkle roots as a map.
   */
  async getRoots(): Promise<Map<RootKey, Uint8Array>> {
    return new Map([...(await this.client.state.box.roots.getMap())].map(([key, value]) => [{ address: encodeAddress(key.slice(0, 32)), name: new TextDecoder().decode(key.slice(32)) }, value.root]));
  }

  /**
   * Gets metadata associated with a merkle root.
   * @returns The metadata value or undefined if not found
   */
  async getData({ address, name, key }: GetDataParams): Promise<string | undefined> {
    if (key === "l.type") {
      try {
        const root = await this.client.state.box.roots.value(metadataOwnerKey(address, name));
        if (!root) return undefined;
        const value = new Uint8Array(8);
        new DataView(value.buffer).setBigUint64(0, root.type);
        return new TextDecoder().decode(value);
      } catch (error) {
        if (error instanceof Error && error.message.includes("box not found")) return undefined;
        throw error;
      }
    }
    const record = await this.readRecord(address, metadataDataKey(name, key));
    return record.exists ? new TextDecoder().decode(record.data) : undefined;
  }

  /**
   * Gets a tree type by ID.
   * @returns The type value (schema and description) or undefined if not found
   */
  async getType({ id }: GetTypeParams): Promise<TypesValue | undefined> {
    return await this.client.state.box.types.value(id);
  }

  /**
   * Gets all tree types as a map.
   */
  async getTypes(): Promise<Map<bigint, TypesValue>> {
    return await this.client.state.box.types.getMap();
  }

  /**
   * Gets the cost in microAlgo for creating a merkle root with the given name.
   */
  async rootCosts({ name }: RootCostsParams): Promise<bigint> {
    return await this.client.rootCosts({ args: { name } });
  }

  /**
   * Gets the cost in microAlgo for adding data with the given parameters.
   */
  async dataCosts({ name, key, value }: DataCostsParams): Promise<bigint> {
    return await this.client.dataCosts({ args: { name, key, value } });
  }

  // ========== Verify Methods ==========

  /**
   * Verifies a leaf is included in a merkle tree.
   * @returns true if the proof is valid
   */
  async verify({ address, name, leaf, proof, type }: VerifyParams): Promise<boolean> {
    // Convert proof array to format expected by contract
    const formattedProof = proof.map((p) => {
      if (p.length !== 32) {
        throw new Error("Each proof element must be exactly 32 bytes");
      }
      return p;
    });

    const { return: result } = await this.client.send.verify({
      args: {
        address,
        name,
        leaf,
        proof: formattedProof,
        type,
      },
    });

    return result ?? false;
  }

  /**
   * Reads metadata from a merkle root.
   */
  async read({ address, name, key }: ReadParams): Promise<string> {
    return await this.client.read({
      args: { address, name, key },
    });
  }

  /**
   * Verifies inclusion and reads metadata if verified.
   * @returns The metadata value, or empty string if verification fails
   */
  async verifiedRead({ address, name, leaf, proof, type, key }: VerifiedReadParams): Promise<string> {
    const formattedProof = proof.map((p) => {
      if (p.length !== 32) {
        throw new Error("Each proof element must be exactly 32 bytes");
      }
      return p;
    });

    const { return: result } = await this.client.send.verifiedRead({
      args: {
        address,
        name,
        leaf,
        proof: formattedProof,
        type,
        key,
      },
    });

    return result ?? "";
  }

  /**
   * Verifies inclusion and reads metadata. Throws if verification fails.
   * @returns The metadata value
   */
  async verifiedMustRead({ address, name, leaf, proof, type, key }: VerifiedReadParams): Promise<string> {
    const formattedProof = proof.map((p) => {
      if (p.length !== 32) {
        throw new Error("Each proof element must be exactly 32 bytes");
      }
      return p;
    });

    const { return: result } = await this.client.send.verifiedMustRead({
      args: {
        address,
        name,
        leaf,
        proof: formattedProof,
        type,
        key,
      },
    });

    if (result === undefined) {
      throw new Error("Failed to read verified data");
    }

    return result;
  }

  // ========== Write Methods ==========

  /**
   * Adds a new merkle root.
   * @param name - The name alias of the root (max 27 UTF-8 bytes)
   * @param root - The 32-byte merkle tree root
   * @param type - The index of the tree type from box storage
   */
  async addRoot({ sender, signer, name, root, type }: AddRootParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    if (root.length !== 32) {
      throw new Error("Root must be exactly 32 bytes");
    }

    const cost = await this.rootCosts({ name });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    await this.client.send.addRoot({
      ...sendParams,
      args: {
        payment,
        name,
        root,
        type,
      },
    });
  }

  /**
   * Updates an existing merkle root.
   * @param name - The name of the merkle group data
   * @param newRoot - The new 32-byte merkle tree root
   */
  async updateRoot({ sender, signer, name, newRoot }: UpdateRootParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    if (newRoot.length !== 32) {
      throw new Error("New root must be exactly 32 bytes");
    }

    await this.client.send.updateRoot({
      ...sendParams,
      args: {
        name,
        newRoot,
      },
    });
  }

  /**
   * Deletes a merkle root and returns the MBR to the sender.
   * Only the original creator can delete the root.
   */
  async deleteRoot({ sender, signer, name }: DeleteRootParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.deleteRoot({
      ...sendParams,
      // Extra fee for inner payment to return MBR
      extraFee: microAlgo(1000),
      args: { name },
    });
  }

  /**
   * Adds metadata to an existing merkle root.
   * @param name - The name of the merkle tree root
   * @param key - The metadata key (max 15 bytes, cannot start with "l.")
   * @param value - The metadata value (max 1024 bytes)
   */
  async addData({ sender, signer, name, key, value }: AddDataParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const cost = await this.dataCosts({ name, key, value });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    await this.client.send.addData({
      ...sendParams,
      args: {
        payment,
        name,
        key,
        value,
      },
    });
  }

  /**
   * Deletes metadata from a merkle root and returns the MBR to the sender.
   * Only the original creator can delete data.
   */
  async deleteData({ sender, signer, name, key }: DeleteDataParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.deleteData({
      ...sendParams,
      // Extra fee for inner payment to return MBR
      extraFee: microAlgo(1000),
      args: { name, key },
    });
  }

  /**
   * Adds a new tree type definition.
   * Requires a 100 ALGO payment.
   * @param description - Description of the tree type (max 800 bytes)
   * @param schemaList - The schema parts defining the leaf structure
   */
  async addType({ sender, signer, description, schemaList }: AddTypeParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(ADD_TYPE_COST),
      receiver: this.client.appAddress,
    });

    // Convert SchemaPart enum values to numbers for the contract
    const schemaListNumbers = schemaList.map((part) => part as number);

    await this.client.send.addType({
      ...sendParams,
      args: {
        payment,
        description,
        schemaList: schemaListNumbers,
      },
    });
  }

  /**
   * Type fees collected and not yet sent to the DAO's revenue escrow: each 100 ALGO fee less the
   * storage its type occupies.
   */
  async typeFees(): Promise<bigint> {
    return (await this.client.state.global.typeFees()) ?? 0n;
  }

  /**
   * Sends the collected type fees to the DAO's revenue escrow and returns the amount sent. Anyone may
   * call it. It fails until the DAO has named the escrow (`updateAkitaDAOEscrow`), and it never takes
   * the app below its minimum balance: whatever cannot be sent yet stays owed for a later call.
   */
  async collectTypeFees({ sender, signer }: MaybeSigner = {}): Promise<bigint> {
    const sendParams = this.getSendParams({ sender, signer });

    const { return: amount } = await this.client.send.collectTypeFees({
      ...sendParams,
      // Extra fee for the inner payment to the escrow
      extraFee: microAlgo(1000),
      args: {},
    });

    return amount ?? 0n;
  }

  // ========== High-Level Merkle Tree Methods ==========

  /**
   * Adds a merkle root from a MerkleTree instance.
   * This is a convenience method that extracts the root from the tree.
   *
   * @example
   * ```ts
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * await sdk.addRootFromTree({ name: 'my-tree', tree, type: 1n });
   * ```
   */
  async addRootFromTree<T extends unknown[]>({
    sender,
    signer,
    name,
    tree,
    type,
  }: MaybeSigner & {
    name: string;
    tree: MerkleTree<T>;
    type: bigint | number;
  }): Promise<void> {
    return this.addRoot({
      sender,
      signer,
      name,
      root: tree.root,
      type,
    });
  }

  /**
   * Verifies a leaf from a MerkleTree instance.
   * This is a convenience method that extracts the leaf hash and proof from the tree.
   *
   * @example
   * ```ts
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * const isValid = await sdk.verifyFromTree({
   *   address: creatorAddress,
   *   name: 'my-tree',
   *   tree,
   *   index: 0, // verify the first leaf
   *   type: 1n,
   * });
   * ```
   */
  async verifyFromTree<T extends unknown[]>({
    address,
    name,
    tree,
    index,
    type,
  }: {
    address: string;
    name: string;
    tree: MerkleTree<T>;
    index: number;
    type: bigint | number;
  }): Promise<boolean> {
    return this.verify({
      address,
      name,
      leaf: tree.getLeafHash(index),
      proof: tree.getProof(index),
      type,
    });
  }

  /**
   * Verifies and reads metadata using a MerkleTree instance.
   *
   * @example
   * ```ts
   * const tree = MerkleTree.ofSimple([1n, 2n, 3n], SchemaPart.Uint64);
   * const royalty = await sdk.verifiedReadFromTree({
   *   address: creatorAddress,
   *   name: 'my-tree',
   *   tree,
   *   index: 0,
   *   type: 1n,
   *   key: 'royalty',
   * });
   * ```
   */
  async verifiedReadFromTree<T extends unknown[]>({
    address,
    name,
    tree,
    index,
    type,
    key,
  }: {
    address: string;
    name: string;
    tree: MerkleTree<T>;
    index: number;
    type: bigint | number;
    key: string;
  }): Promise<string> {
    return this.verifiedRead({
      address,
      name,
      leaf: tree.getLeafHash(index),
      proof: tree.getProof(index),
      type,
      key,
    });
  }

  /**
   * Verifies inclusion and reads metadata using a MerkleTree instance.
   * Throws if verification fails.
   */
  async verifiedMustReadFromTree<T extends unknown[]>({
    address,
    name,
    tree,
    index,
    type,
    key,
  }: {
    address: string;
    name: string;
    tree: MerkleTree<T>;
    index: number;
    type: bigint | number;
    key: string;
  }): Promise<string> {
    return this.verifiedMustRead({
      address,
      name,
      leaf: tree.getLeafHash(index),
      proof: tree.getProof(index),
      type,
      key,
    });
  }
  /** One box fetch returns the published revision and data together. */
  async readRecord(account: string, recordKey: MetadataKey) {
    const name = metadataBoxName(account, recordKey);
    try { return decodeMetadataRecord(await this.algorand.app.getBoxValue(this.appId, name)); }
    catch (error) {
      if (error instanceof Error && error.message.includes("box not found"))
        return { exists: false, revision: 0n, data: new Uint8Array() };
      throw error;
    }
  }

  async setRecord(args: SetMetadataArgs): ReturnType<MetaClient["send"]["setRecord"]> {
    const { data, expectedRevision } = args;
    const key = metadataKeyBytes(args.key);
    metadataStorageCost(data.length, key);
    const sendParams = this.getRequiredSendParams(args);
    const cost = await this.client.recordCost({
      ...this.getReaderSendParams({}),
      args: { account: sendParams.sender.toString(), key, size: data.length },
    });
    return this.client.send.setRecord({
      ...sendParams,
      args: {
        payment: this.algorand.createTransaction.payment({
          sender: sendParams.sender,
          signer: sendParams.signer,
          receiver: this.client.appAddress,
          amount: microAlgo(cost),
        }),
        key,
        ...metadataDataParts(data),
        expectedRevision,
      },
      extraFee: microAlgo(1000),
    });
  }

  async removeRecord(args: RemoveMetadataArgs): ReturnType<MetaClient["send"]["removeRecord"]> {
    const { expectedRevision } = args;
    const key = metadataKeyBytes(args.key);
    validateMetadataRecordKey(key);
    return this.client.send.removeRecord({
      ...this.getRequiredSendParams(args),
      args: { key, expectedRevision },
      extraFee: microAlgo(1000),
    });
  }

  /** Discover complete owners and keys directly from box names. */
  async listRecordKeys(filter: { account?: string; keyPrefix?: Uint8Array } = {}) {
    const records: Array<{ account: string; key: Uint8Array }> = [];
    const prefix = filter.account === undefined ? new Uint8Array([0x6d]) :
      new Uint8Array([0x6d, ...decodeAddress(filter.account).publicKey, ...(filter.keyPrefix ?? [])]);
    let next: string | undefined;
    let round: number | undefined;
    do {
      const request = this.algorand.client.algod.getApplicationBoxes(this.appId).prefix(prefix).limit(1000).next(next);
      if (round !== undefined) request.round(round);
      const page = await request.do();
      round ??= page.round;
      for (const box of page.boxes) {
        const record = decodeMetadataBoxName(box.name);
        if ((filter.account === undefined || record.account === filter.account) &&
            (filter.keyPrefix === undefined || filter.keyPrefix.every((byte, i) => record.key[i] === byte))) records.push(record);
      }
      next = page.nextToken;
    } while (next);
    return records;
  }

}

export * from "./records";
export * from "./schemas";
export * from "./preferences";
export { MetaClient, MetaFactory } from "../generated/MetaClient";
