import { AbstractedAccountArgs, AllowanceKey, EscrowInfo, PluginKey, type AbstractedAccountClient, ExecutionInfo, AbstractedAccountComposer } from '../generated/AbstractedAccountClient';
import { AbstractAccountBoxMbrData, AbstractedAccountMbrClient } from '../generated/AbstractedAccountMBRClient';
import { AddAllowanceArgs, AllowanceInfo, BuildWalletUsePluginParams, CanCallParams, ExecutionBuildGroup, MbrParams, PluginInfo, WalletAddPluginParams, WalletGlobalState, WalletUsePluginParams } from './types';
import { MaybeSigner, NewContractSDKParams, SDKClient, GroupReturn, TxnReturn, ExpandedSendParamsWithSigner } from '../types';
import { BaseSDK } from '../base';
import { Address } from 'algosdk';
import { ValueMap } from './utils';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { WalletGroupComposer } from './group';
import { type Principal, type PrincipalResourceReference } from '../principal';
export * from './constants';
export * from './errors';
export * from './factory';
export * from './group';
export * from './plugins';
export * from "./types";
type ContractArgs = AbstractedAccountArgs["obj"];
export declare class WalletSDK extends BaseSDK<AbstractedAccountClient> {
    private pluginMapKeyGenerator;
    private allowanceMapKeyGenerator;
    plugins: ValueMap<PluginKey, PluginInfo>;
    namedPlugins: Map<string, PluginKey>;
    escrows: Map<string, EscrowInfo>;
    allowances: ValueMap<AllowanceKey, AllowanceInfo>;
    executions: Map<Uint8Array, ExecutionInfo>;
    mbrClient: AbstractedAccountMbrClient;
    constructor(params: NewContractSDKParams);
    group(): WalletGroupComposer;
    updateCache(key: PluginKey, allowances?: bigint[]): Promise<void>;
    prepareUsePlugin({ sender, signer, name, callerType, escrow, fundsRequest, calls, lease, seedPrincipalResources, preTransactions, }: WalletUsePluginParams): Promise<{
        plugins: bigint[];
        caller: string;
        useRounds: boolean;
        length: number;
        group: AbstractedAccountComposer<[]>;
        sendParams: ExpandedSendParamsWithSigner;
    }>;
    /**
     * The wallet hint a plugin forwards to a principal-resolving target from inside this wallet's window:
     * exactly this wallet's app id (`windowHint(wallet)`, spec §3.8 rule 6). Akita plugins add it
     * themselves; the SDK never passes a caller-chosen hint. A direct (top-level) call passes `0n`, because
     * a non-zero hint on a top-level call reverts with `errHtop`.
     */
    get windowHint(): bigint;
    /** The spending account of a window for (`plugin`, `caller`, `escrow`), including `defaultToEscrow` grants. */
    private windowSpender;
    /**
     * Resources a hinted target reads for a window whose spending account is `spender` (spec §3.6):
     * `P(W)`, plus `A(W.address)` or `A(controlled)` when the spending account is an escrow. Feed them to
     * `seedAccessResources` (or pass `seedPrincipalResources: true` to `usePlugin`).
     */
    principalResources({ spender }: {
        spender: string | Address;
    }): Promise<PrincipalResourceReference[]>;
    /**
     * PREDICTION ONLY (never authorization): the principal a hinted target computes when `plugin` calls it
     * from this wallet's window on `escrow` ('' = the main account, or the grant's `defaultToEscrow` escrow).
     * Gates see `principal`; referrals pay `referrer`.
     *
     * @param walletFactory the pinned wallet factory (`AkitaAppList.wallet`). When omitted, the wallet's own
     * `factory_app` global is used, which is fine for predicting your own wallet but must never be a trust
     * anchor (spec §3.8 rule 4).
     */
    predictPrincipal({ plugin, caller, escrow, walletFactory }: {
        plugin: bigint;
        /** the grant's caller (zero address for a global grant, the wallet address for an admin grant) */
        caller: string;
        escrow?: string;
        walletFactory?: bigint;
    }): Promise<Principal>;
    /**
     * @deprecated LEGACY registry write (EscrowFactory reverse registry). Principal resolution uses
     * wallet hints, so the SDK no longer calls this on its own (principal-resolution Phase 3). Call it
     * only to keep legacy registry semantics (old plugin ids, legacy shims, old sub-gates) working for
     * this wallet or one of its escrows. Removed with `register` itself in Phase 4.
     */
    register({ sender, signer, escrow }: ContractArgs['register(string)void'] & MaybeSigner): Promise<void>;
    changeRevocationApp({ sender, signer, app }: MaybeSigner & {
        app: bigint;
    }): Promise<void>;
    setNickname({ sender, signer, nickname }: MaybeSigner & {
        nickname: string;
    }): Promise<void>;
    setAvatar({ sender, signer, avatar }: MaybeSigner & {
        avatar: bigint;
    }): Promise<void>;
    setBanner({ sender, signer, banner }: MaybeSigner & {
        banner: bigint;
    }): Promise<void>;
    setBio({ sender, signer, bio }: MaybeSigner & {
        bio: string;
    }): Promise<void>;
    changeAdmin({ sender, signer, newAdmin }: MaybeSigner & {
        newAdmin: string;
    }): Promise<void>;
    verifyAuthAddress(params?: MaybeSigner): Promise<void>;
    /**
     * Admin rekey of the controlled account to `address`. With `flash: true` the same group must return it
     * with a transaction from the controlled account that rekeys it back to the wallet app (Q2: a later
     * `arc58_verifyAuthAddress` only counts while it verifies the controlled account itself). Plugin windows
     * close only through `arc58_verifyAuthAddress`, which `usePlugin` always appends.
     */
    rekeyTo({ sender, signer, ...args }: MaybeSigner & ContractArgs['arc58_rekeyTo(address,bool)void']): Promise<void>;
    canCall({ sender, signer, ...args }: CanCallParams): Promise<boolean[]>;
    /** Whether the grant resolved from (plugin, caller type, address, escrow) is past its lastValid. */
    private isPluginExpired;
    /**
     * ACC-06: remove a co-admin / domain passkey and refund its MBR to the controlled address.
     * (On-chain this is `assignDomain(address, '')`.)
     */
    removeDomainKey({ sender, signer, address }: MaybeSigner & {
        address: string;
    }): Promise<void>;
    usePlugin(params: WalletUsePluginParams): Promise<GroupReturn>;
    /**
     * Modify the ABI-encoded fundsRequest argument in a rekey transaction.
     * Replaces the inflated simulation amounts with the correct amounts (original + realFee).
     *
     * The fundsRequest arg is encoded as `(uint64,uint64)[]`:
     *   2 bytes: element count (big-endian uint16)
     *   Per element: 8 bytes asset (big-endian uint64) + 8 bytes amount (big-endian uint64)
     */
    private adjustFundsRequestAmounts;
    addPlugin<TClient extends SDKClient>({ sender, signer, name, client, caller, callerType, methods, escrow, admin, delegationType, lastValid, cooldown, useRounds, useExecutionKey, coverFees, canReclaim, defaultToEscrow, allowances, registerEscrow, }: WalletAddPluginParams<TClient>): Promise<GroupReturn>;
    removePlugin({ sender, signer, ...args }: ContractArgs['arc58_removePlugin(uint64,address,string)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    /** ACC-05: remove a named plugin alias (and its grant, if still installed), refunding their MBR. */
    removeNamedPlugin({ sender, signer, name }: MaybeSigner & {
        name: string;
    }): Promise<TxnReturn<void>>;
    /**
     * @internal True when the controlled address is not the wallet app address. The wallet then moves
     * every box MBR with an inner payment from (adds) or to (removes) the controlled address.
     */
    hasExternalControlledAddress(): Promise<boolean>;
    /** @internal Extra fee for a call that makes one MBR payment or refund (see `controlledMbrFee`). */
    controlledMbrExtraFee(): Promise<AlgoAmount>;
    /**
     * Assign a domain to a passkey address. A key whose domain equals the wallet domain is a
     * co-admin (while the wallet domain is non-empty). Reassigning refunds the old key's MBR
     * before charging the new one. An empty `domain` revokes the key (see `removeDomainKey`).
     */
    assignDomain({ sender, signer, ...args }: ContractArgs['assignDomain(address,string)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    /**
     * @internal Extra fee for the MBR payments a domain key change makes. These inner payments
     * only happen when the controlled address is not the wallet app address: assigning pays for
     * the new box (and refunds the old one when reassigning), revoking refunds the box.
     */
    domainKeyExtraFee(caller: string, action: 'assign' | 'remove'): Promise<AlgoAmount>;
    newEscrow({ sender, signer, ...args }: ContractArgs['arc58_newEscrow(string,address)uint64'] & MaybeSigner): Promise<TxnReturn<bigint>>;
    toggleEscrowLock({ sender, signer, ...args }: ContractArgs['arc58_toggleEscrowLock(string)(uint64,address,bool)'] & MaybeSigner): Promise<TxnReturn<EscrowInfo>>;
    reclaimFunds({ sender, signer, ...args }: ContractArgs['arc58_reclaim(string,(uint64,uint64,bool)[])void'] & MaybeSigner): Promise<TxnReturn<void>>;
    optInEscrow({ sender, signer, ...args }: ContractArgs['arc58_optInEscrow(string,uint64[])void'] & MaybeSigner): Promise<TxnReturn<void>>;
    addAllowances({ sender, signer, escrow, allowances }: {
        escrow: string;
        allowances: AddAllowanceArgs[];
    } & MaybeSigner): Promise<TxnReturn<void>>;
    removeAllowances({ sender, signer, ...args }: ContractArgs['arc58_removeAllowances(string,uint64[])void'] & MaybeSigner): Promise<TxnReturn<void>>;
    addExecutionKey({ sender, signer, ...args }: ContractArgs['arc58_addExecutionKey(byte[32],byte[32][],uint64,uint64)void'] & MaybeSigner): Promise<TxnReturn<void>>;
    removeExecutionKey({ sender, signer, ...args }: ContractArgs['arc58_removeExecutionKey(byte[32])void'] & MaybeSigner): Promise<TxnReturn<void>>;
    readonly build: {
        usePlugin: ({ firstValid, windowSize, consolidateFees, skipSignatures, adminRekeyMaxFee, ...args }: BuildWalletUsePluginParams) => Promise<ExecutionBuildGroup>;
    };
    getGlobalState(): Promise<WalletGlobalState>;
    getAdmin(): Promise<string>;
    getPlugins(): Promise<ValueMap<PluginKey, PluginInfo>>;
    getPluginByKey(key: PluginKey): Promise<PluginInfo>;
    getNamedPlugins(): Promise<Map<string, PluginKey>>;
    getPluginByName(name: string): Promise<PluginInfo>;
    getEscrows(): Promise<Map<string, EscrowInfo>>;
    getEscrow(escrow: string): Promise<EscrowInfo>;
    getAllowances(): Promise<ValueMap<AllowanceKey, AllowanceInfo>>;
    getAllowance(key: AllowanceKey): Promise<AllowanceInfo>;
    getExecutions(): Promise<Map<Uint8Array, ExecutionInfo>>;
    getExecution(lease: Uint8Array<ArrayBufferLike>): Promise<ExecutionInfo>;
    /** @returns the domain assigned to a passkey address, or undefined if it has none */
    getDomainKey(address: string): Promise<string | undefined>;
    getMbr(args: MbrParams): Promise<AbstractAccountBoxMbrData>;
}
