import { BaseSDK } from '../base';
import { Launch, LaunchManagerClient, LaunchParams, LaunchResult, TokenParams } from '../generated/LaunchManagerClient';
import { MaybeSigner, NewContractSDKParams } from '../types';
export type { Launch, LaunchParams, LaunchResult, TokenParams } from '../generated/LaunchManagerClient';
/** Launch defaults: a 1% fee, a 50% → 1% anti-snipe decay over 20 rounds and no taxes */
export declare const defaultLaunchParams: (p: Pick<LaunchParams, "curveSupply" | "virtualQuote" | "virtualToken" | "graduationThreshold">, overrides?: Partial<LaunchParams>) => LaunchParams;
/**
 * SDK for the LaunchManager: fair launches of a new ASA into a PluginDex launch pool (virtual-reserve
 * bonding curve) that graduates once its quote reserve reaches the threshold.
 */
export declare class LaunchManagerSDK extends BaseSDK<LaunchManagerClient> {
    constructor(params: NewContractSDKParams);
    getLaunch(launchId: bigint): Promise<Launch>;
    /** The current launch fee and bounty (µALGO) */
    fees(): Promise<{
        launchFee: bigint;
        bounty: bigint;
    }>;
    /** Phase 1: mint the token. Returns the launch id. */
    createToken({ token, ...signer }: MaybeSigner & {
        token: TokenParams;
    }): Promise<bigint>;
    /**
     * Phase 2 (the token's creator): create and seed the launch pool. The payment covers the fee, the bounty,
     * the pool and any dev buy; the excess is refunded. `maxLaunchFee`/`maxBounty` default to the current fees.
     */
    launch({ launchId, params, maxLaunchFee, maxBounty, payment, ...signer }: MaybeSigner & {
        launchId: bigint;
        params: LaunchParams;
        maxLaunchFee?: bigint;
        maxBounty?: bigint;
        payment?: bigint;
    }): Promise<LaunchResult>;
    /** Graduate a launch whose pool reached its threshold; the caller earns the bounty */
    graduate({ launchId, ...signer }: MaybeSigner & {
        launchId: bigint;
    }): Promise<void>;
}
