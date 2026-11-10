import { BaseSDK } from '../base';
import { BinEngineClient } from '../generated/BinEngineClient';
import { MaybeSigner, NewContractSDKParams } from '../types';
/** A liquidity position: `width` consecutive bins starting at `lowerId` */
export type BinPosition = {
    positionId: bigint;
    owner: string;
    poolId: bigint;
    lowerId: bigint;
    width: bigint;
};
/** SDK for the BinEngine curve: the per-binStep price tables a bins pool needs before it can be created */
export declare class BinEngineSDK extends BaseSDK<BinEngineClient> {
    constructor(params: NewContractSDKParams);
    /** Whether the price table of `binStep` is stored (createPool with that step fails without it) */
    hasBinStep(binStep: bigint): Promise<boolean>;
    /** A position by id, or undefined once it is closed */
    getPosition(positionId: bigint): Promise<BinPosition | undefined>;
    /** Open positions of `owner`, optionally in one pool (reads every position box: fine for a wallet UI) */
    listPositions(owner: string, poolId?: bigint): Promise<BinPosition[]>;
    /** Permissionless and idempotent: store the price table of `binStep` (≈ 0.46 ALGO MBR, kept by the engine) */
    initBinStep({ binStep, ...signer }: MaybeSigner & {
        binStep: bigint;
    }): Promise<void>;
}
