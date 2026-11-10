/**
 * Off-chain mirror of the principal-resolution standard
 * (docs/principal-resolution/STANDARD.md, PHASE-0-SPEC.md §3.1-§3.6).
 *
 * The on-chain source of truth is `projects/akita-sc/smart_contracts/utils/principal.ts`. This
 * module answers the same questions off chain, for two jobs:
 *
 * 1. **Prediction.** It predicts the principal a target computes, for example the gate subject of a
 *    direct call or the referrer that a cost quote charges for. A prediction is advice only.
 *    The contract decides, so never use a prediction as an authorization.
 * 2. **Resource seeding.** It names the exact resources the on-chain helper reads (§3.6). Use
 *    `seedAccessResources` (`akita-sdk/simulate/access-list`) to put them on the group before the
 *    preparer packs Access lists. The preparer also discovers them by simulation. A seed matters
 *    only where simulation is not the source of resources, or where a caller wants a fixed placement.
 *
 * Every chain read goes through a `PrincipalChainReader`. Use `algodPrincipalReader(algod)` against
 * a node, or a stub in unit tests. The mirror reproduces the AVM's panics: a wallet global stored
 * as a uint64 under a bytes key makes `len` fail on chain, and it throws `PrincipalPanicError` here.
 */
import algosdk, { Address } from 'algosdk';
/** ARC-58 wallet global keys (= arc58/account/constants.ts). */
export declare const PRINCIPAL_KEY_CONTROLLED = "controlled_address";
export declare const PRINCIPAL_KEY_SPENDING = "spending_address";
export declare const PRINCIPAL_KEY_REFERRER = "referrer";
/** Error codes raised by `utils/principal.ts` (also in `COMMON_ERROR_MESSAGES`). */
export declare const PrincipalErrorCode: {
    /** W != 0 and not created by the wallet factory (or does not exist). */
    readonly NotWallet: "errHnwl";
    /** W != 0 on a top-level call (callerApplicationId == 0). */
    readonly TopLevel: "errHtop";
    /** Neither a direct wallet call nor a plugin window that holds the sender. */
    readonly NotBound: "errHnbd";
    /** Third-party write: W does not own the account at rest. */
    readonly NotOwner: "errHnow";
    /** Malformed controlled_address. */
    readonly BadWallet: "errIwlt";
    /** The calling plugin does not hold the wallet's spending account. */
    readonly PluginNotAuth: "errNath";
};
export type PrincipalErrorCode = (typeof PrincipalErrorCode)[keyof typeof PrincipalErrorCode];
/** The zero address as a string. */
export declare const ZERO_ADDRESS: string;
/** Same fields as the on-chain `Principal`. Addresses are base32 strings, ids are bigints. */
export interface Principal {
    /** verified W, or 0n */
    wallet: bigint;
    /** identity to use: origin when live, else spender */
    principal: string;
    /** W.controlled_address when live, else the zero address */
    origin: string;
    /** the evaluated sender */
    spender: string;
    /** W.referrer (zero when W == 0, unset or malformed). Self-asserted: never a trust anchor. */
    referrer: string;
    /** true: plugin-window arm; false: direct arm or W == 0 */
    viaPlugin: boolean;
}
/** The verified context a target forwards to `Gate.mustCheckFor`. */
export interface GateCtx {
    principal: string;
    wallet: bigint;
    spender: string;
}
/** ARC-4 type of `GateCtx`: a static 72-byte tuple. */
export declare const GATE_CTX_ABI_TYPE = "(address,uint64,address)";
/** ARC-4 signature of Gate v2 `mustCheckFor` (= utils/functions.ts `GateMustCheckForAbiMethod`). */
export declare const GATE_MUST_CHECK_FOR_SIGNATURE = "mustCheckFor((address,uint64,address),uint64,byte[][])void";
/** A global value as the AVM sees it. `undefined` means the key does not exist. */
export type PrincipalGlobalValue = {
    type: 'bytes';
    value: Uint8Array;
} | {
    type: 'uint';
    value: bigint;
} | undefined;
/** The three chain reads the standard uses (AppCreator, a wallet global, AuthAddr). */
export interface PrincipalChainReader {
    /** Creator address of `appId`, or `undefined` if the app does not exist. */
    appCreator(appId: bigint): Promise<string | undefined>;
    /** Global `key` of `appId` (`undefined` when the key or the app does not exist). */
    appGlobal(appId: bigint, key: string): Promise<PrincipalGlobalValue>;
    /** Auth address of `address`; the zero address when not rekeyed or not funded. */
    authAddr(address: string): Promise<string>;
}
/** Thrown where the AVM would fail with an opcode error (a type mismatch, not a logged code). */
export declare class PrincipalPanicError extends Error {
    constructor(message: string);
}
/** Thrown by the strict variants with the code the contract logs. */
export declare class PrincipalResolutionError extends Error {
    readonly code: PrincipalErrorCode;
    constructor(code: PrincipalErrorCode, message: string);
}
/** Address of app `appId` (`sha512_256("appID" ‖ itob(appId))`). */
export declare function appAddress(appId: bigint | number): string;
/** creator(W) == appAddress(walletFactory). False for 0, for a missing app and for any other creator. */
export declare function isGenuineWallet(reader: PrincipalChainReader, wallet: bigint, walletFactory: bigint): Promise<boolean>;
/** The call context the on-chain resolver observes. */
export interface PrincipalCallContext {
    /** The pinned wallet factory id (`AkitaAppList.wallet`). Never derive it from `W`. */
    walletFactory: bigint;
    /** The wallet hint the call passes (0n = plain account). */
    hint: bigint;
    /** `Txn.sender` of the target call. */
    sender: string | Address;
    /** `Global.callerApplicationId` of the target call (0n for a top-level call). */
    callerApp: bigint;
    /** `Global.callerApplicationAddress`. Defaults to `appAddress(callerApp)`, or zero at top level. */
    callerAddr?: string | Address;
    /**
     * Override for `W.spending_address`. Use it to predict a call made inside a window that is not
     * open yet: outside a window the wallet stores the zero address there.
     */
    spendingOverride?: string | Address;
    /** true: throw like `resolvePrincipal`; false: fall back to plain like `tryResolvePrincipal`. */
    strict: boolean;
}
/**
 * Mirror of the internal `resolvePrincipalCtx` (spec §3.1). It answers both `resolvePrincipal`
 * (strict) and `tryResolvePrincipal` (non-strict) for a context you describe.
 */
export declare function predictPrincipal(reader: PrincipalChainReader, context: PrincipalCallContext): Promise<Principal>;
/**
 * The principal a target computes when a plugin calls it from inside `wallet`'s window, with
 * `windowHint(wallet)` as the hint and `spender` (the window's spending account) as `Txn.sender`.
 * Works before the window opens: it substitutes `spending_address = spender`.
 */
export declare function predictWindowPrincipal(reader: PrincipalChainReader, walletFactory: bigint, wallet: bigint, spender: string | Address, plugin: bigint): Promise<Principal>;
/** Mirror of `quoteReferrer`: genuine W => W.referrer, else zero. */
export declare function quoteReferrer(reader: PrincipalChainReader, walletFactory: bigint, hint: bigint): Promise<string>;
/** Mirror of `ownsAtRest`: genuine(W) && ((A == W.address && auth(W.address) == 0) || auth(A) == W.address). */
export declare function ownsAtRest(reader: PrincipalChainReader, walletFactory: bigint, wallet: bigint, account: string | Address): Promise<boolean>;
/** Mirror of `atRestPrincipal` (stored-pair re-check; reads no wallet globals). */
export declare function atRestPrincipal(reader: PrincipalChainReader, walletFactory: bigint, account: string | Address, wallet: bigint, stored: string | Address): Promise<string>;
/** Mirror of `thirdPartyPrincipal` (QUOTE-ONLY: reads W.controlled_address). */
export declare function thirdPartyPrincipal(reader: PrincipalChainReader, walletFactory: bigint, account: string | Address, wallet: bigint): Promise<string>;
/** Mirror of `functions.ts` `tipWallet` (`tipWalletFor`): the creator's wallet if it still owns and controls, else 0n. */
export declare function tipWallet(reader: PrincipalChainReader, walletFactory: bigint, creator: string | Address, stored: bigint): Promise<bigint>;
/** `{ principal, wallet, spender }` of a resolved principal. */
export declare function gateCtx(p: Principal): GateCtx;
/** Mirror of `ctxOwns`: account == ctx.principal || account == ctx.spender || ownsAtRest(ctx.wallet, account). */
export declare function ctxOwns(reader: PrincipalChainReader, walletFactory: bigint, ctx: GateCtx, account: string | Address): Promise<boolean>;
/** The hint a plugin forwards from inside `wallet`'s window: exactly the wallet's id (§3.8 rule 6). */
export declare function windowHint(wallet: bigint | number): bigint;
/** ARC-4 encoding of a `GateCtx` (72 bytes): the `appArgs(1)` that `gateCheckCtx` asserts. */
export declare function encodeGateCtx(ctx: GateCtx): Uint8Array;
/** The ABI method of Gate v2 `mustCheckFor`, for building the gate txn of a direct call. */
export declare function gateMustCheckForMethod(): algosdk.ABIMethod;
/** One Access-list resource, in the form `TransactionComposer` and the preparer accept. */
export type PrincipalResourceReference = algosdk.TransactionResourceReference;
/**
 * Resources `resolvePrincipal` reads for a hinted call whose state you already know (spec §3.6):
 *
 * - `P(W)` whenever `W != 0`;
 * - nothing more when `controlled == spender` (the shortcut needs no AuthAddr read);
 * - `A(W.address)` when `controlled == W.address` and `spender != controlled`
 *   (an escrow window of a default wallet, the common case);
 * - `A(controlled)` when `controlled` is external and `spender != controlled`
 *   (an escrow window of an external-controlled wallet).
 *
 * The DAO and the factory need nothing: the DAO is already present and the factory address is hashed.
 */
export declare function principalResources({ wallet, controlled, spender }: {
    wallet: bigint;
    controlled: string | Address;
    spender: string | Address;
}): PrincipalResourceReference[];
/**
 * Resources of an at-rest re-check (`ownsAtRest`, `atRestPrincipal`, `ctxOwns`): `P(W)`, `A(account)`,
 * plus `A(stored)` or `A(W.address)` when a stored principal is given.
 */
export declare function atRestResources({ wallet, account, stored }: {
    wallet: bigint;
    account: string | Address;
    stored?: string | Address;
}): PrincipalResourceReference[];
/**
 * `principalResources` for a plugin window of `wallet` whose spending account is `spender`. It reads
 * `W.controlled_address` through `reader`.
 */
export declare function windowPrincipalResources(reader: PrincipalChainReader, wallet: bigint, spender: string | Address): Promise<PrincipalResourceReference[]>;
/**
 * `PrincipalChainReader` backed by algod. Reads are cached for the reader's lifetime, so create a
 * new reader for each prediction that must see fresh state.
 */
export declare function algodPrincipalReader(algod: algosdk.Algodv2): PrincipalChainReader;
