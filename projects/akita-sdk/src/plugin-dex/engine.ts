import { microAlgo } from '@algorandfoundation/algokit-utils';
import { encodeAddress } from 'algosdk';
import { BaseSDK } from '../base';
import { ENV_VAR_NAMES } from '../config';
import { BinEngineClient, BinEngineFactory } from '../generated/BinEngineClient';
import { MaybeSigner, NewContractSDKParams } from '../types';
import { BINS_TABLE_BOX_MBR, binsTableBoxName } from './bins';

/** A liquidity position: `width` consecutive bins starting at `lowerId` */
export type BinPosition = {
  positionId: bigint;
  owner: string;
  poolId: bigint;
  lowerId: bigint;
  width: bigint;
};

const POSITION_PREFIX = 0x71; // 'q'
const POSITION_HEADER = 56;

const readU64 = (bytes: Uint8Array, offset: number): bigint =>
  new DataView(bytes.buffer, bytes.byteOffset + offset, 8).getBigUint64(0);

function positionBoxName(positionId: bigint): Uint8Array {
  const name = new Uint8Array(9);
  name[0] = POSITION_PREFIX;
  new DataView(name.buffer).setBigUint64(1, positionId);
  return name;
}

function decodePosition(positionId: bigint, box: Uint8Array): BinPosition {
  return {
    positionId,
    owner: encodeAddress(box.slice(0, 32)),
    poolId: readU64(box, 32),
    lowerId: readU64(box, 40),
    width: readU64(box, 48),
  };
}

/** SDK for the BinEngine curve: the per-binStep price tables a bins pool needs before it can be created */
export class BinEngineSDK extends BaseSDK<BinEngineClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: BinEngineFactory, ...params }, ENV_VAR_NAMES.BIN_ENGINE_APP_ID);
  }

  /** Whether the price table of `binStep` is stored (createPool with that step fails without it) */
  async hasBinStep(binStep: bigint): Promise<boolean> {
    return this.algorand.app.getBoxValue(this.appId, binsTableBoxName(binStep)).then(
      () => true,
      () => false,
    );
  }

  /** A position by id, or undefined once it is closed */
  async getPosition(positionId: bigint): Promise<BinPosition | undefined> {
    try {
      const box = await this.algorand.app.getBoxValue(this.appId, positionBoxName(positionId));
      return decodePosition(positionId, box.slice(0, POSITION_HEADER));
    } catch {
      return undefined;
    }
  }

  /** Open positions of `owner`, optionally in one pool (reads every position box: fine for a wallet UI) */
  async listPositions(owner: string, poolId?: bigint): Promise<BinPosition[]> {
    const names = await this.algorand.app.getBoxNames(this.appId);
    const ids = names
      .filter((name) => name.nameRaw.length === 9 && name.nameRaw[0] === POSITION_PREFIX)
      .map((name) => readU64(name.nameRaw, 1));
    const positions = await Promise.all(ids.map((id) => this.getPosition(id)));
    return positions.filter(
      (position): position is BinPosition =>
        position !== undefined && position.owner === owner && (poolId === undefined || position.poolId === poolId),
    );
  }

  /** Permissionless and idempotent: store the price table of `binStep` (≈ 0.46 ALGO MBR, kept by the engine) */
  async initBinStep({ binStep, ...signer }: MaybeSigner & { binStep: bigint }): Promise<void> {
    if (await this.hasBinStep(binStep)) return;
    const sendParams = this.getRequiredSendParams(signer);
    await this.client.send.initBinStep({
      ...sendParams,
      args: {
        mbr: this.algorand.createTransaction.payment({
          sender: sendParams.sender,
          signer: sendParams.signer,
          receiver: this.client.appAddress,
          amount: microAlgo(BINS_TABLE_BOX_MBR),
        }),
        binStep,
      },
    });
  }
}
