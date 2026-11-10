import { BaseSDK } from "../base";
import { TxnReturn } from '../types';
import { GateArgs, GateClient } from '../generated/GateClient';
import type { GateCtx } from '../principal';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { GateCheckArg, GateRegistrationFilterAndArg, GateRegistryConfig } from "./types";
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
type ContractArgs = GateArgs["obj"];
/**
 * Args of the context-aware Gate v2 calls (principal-resolution spec §3.5, §6.9). `ctx` must be the
 * context the target will verify: `gateCtx(principal)` from `akita-sdk/principal` (`predictPrincipal` /
 * `predictWindowPrincipal`) for the wallet hint the target receives. A ctx that differs in any field
 * makes the target's `gateCheckCtx` fail.
 */
export type GateCheckForParams = {
    ctx: GateCtx;
    gateId: bigint | number;
    args: GateCheckArg[];
};
export * from './errors';
export * from './types';
export declare class GateSDK extends BaseSDK<GateClient> {
    private contractIdToType;
    private gateEncodings;
    constructor(params: NewContractSDKParams & {
        gateRegistry: GateRegistryConfig;
    });
    private getGateTypeFromContractId;
    private encodeGateRegistryArgs;
    private decodeGateArgs;
    private encodeGateCheckArgs;
    register({ sender, signer, args }: {
        args: GateRegistrationFilterAndArg[];
    } & MaybeSigner): Promise<TxnReturn<bigint>>;
    check({ sender, signer, caller, gateId, args }: Omit<ContractArgs['check(address,uint64,byte[][])bool'], 'args'> & {
        args: GateCheckArg[];
    } & MaybeSigner): Promise<TxnReturn<boolean>>;
    mustCheck({ sender, signer, caller, gateId, args }: Omit<ContractArgs['check(address,uint64,byte[][])bool'], 'args'> & {
        args: GateCheckArg[];
    } & MaybeSigner): Promise<TxnReturn<void>>;
    /**
     * Context evaluation (readonly, simulated): context-aware sub-gates receive `checkFor(ctx, ...)`,
     * all others `check(ctx.principal, ...)`.
     */
    checkFor({ sender, signer, ctx, gateId, args }: GateCheckForParams & MaybeSigner): Promise<boolean>;
    /** `checkFor`, asserted on chain (`errFgte`). Targets pin this call with `gateCheckCtx`. */
    mustCheckFor({ sender, signer, ctx, gateId, args }: GateCheckForParams & MaybeSigner): Promise<TxnReturn<void>>;
    getGate({ sender, signer, gateId }: ContractArgs['getGate(uint64)(uint64,uint64,uint64,uint8,byte[])[]'] & MaybeSigner): Promise<any>;
    cost({ sender, signer, ...args }: ContractArgs['cost((uint64,uint64,uint8)[],byte[][])uint64'] & MaybeSigner): Promise<bigint>;
    /**
     * Allowlist (or remove) a sub-gate app. Only the Gate creator (before imports are sealed)
     * or the DAO wallet (after) may call this. `ctxAware` (default false) marks a sub-gate that
     * implements `checkFor(ctx, ...)` (see `CTX_AWARE_GATE_TYPES`); calling again with
     * `allowed = true` re-flags it in place. Box MBR from the Gate's balance: 6_100 plain,
     * 6_500 context-aware.
     */
    setSubGate({ sender, signer, app, allowed, ctxAware }: {
        app: bigint | number;
        allowed: boolean;
        ctxAware?: boolean;
    } & MaybeSigner): Promise<void>;
    /** Whether `app` is allowlisted as a context-aware sub-gate. */
    isCtxSubGate({ sender, signer, app }: {
        app: bigint | number;
    } & MaybeSigner): Promise<boolean>;
    /** Whether `app` is an allowlisted sub-gate. */
    isSubGate({ sender, signer, app }: {
        app: bigint | number;
    } & MaybeSigner): Promise<boolean>;
    readonly build: {
        check: ({ sender, signer, caller, gateId, args }: (Omit<ContractArgs["check(address,uint64,byte[][])bool"], "args"> & {
            args: GateCheckArg[];
        } & MaybeSigner)) => Promise<AppCallMethodCall>;
        mustCheck: ({ sender, signer, caller, gateId, args }: (Omit<ContractArgs["check(address,uint64,byte[][])bool"], "args"> & {
            args: GateCheckArg[];
        } & MaybeSigner)) => Promise<AppCallMethodCall>;
        /** The gate txn a direct caller puts before a hinted target method (`gateCheckCtx` asserts it). */
        mustCheckFor: ({ sender, signer, ctx, gateId, args }: GateCheckForParams & MaybeSigner) => Promise<AppCallMethodCall>;
        checkFor: ({ sender, signer, ctx, gateId, args }: GateCheckForParams & MaybeSigner) => Promise<AppCallMethodCall>;
    };
}
