import { GlobalKeysState, PluginInfo as ClientPluginInfo, AbstractedAccountArgs, AbstractedAccountReturns } from "../generated/AbstractedAccountClient";
import { MaybeSigner, SDKClient, AkitaSDK, PluginMethodSpecifier, PluginSDKReturn, GroupReturn } from "../types";
import { AppReturn } from "@algorandfoundation/algokit-utils/types/app";
import { ABIReturn } from "@algorandfoundation/algokit-utils/abi";
import { ExpectedCost } from "../simulate/cost";
import { PreparedGroup } from "../simulate/prepare";
import algosdk from "algosdk";

type ContractArgs = AbstractedAccountArgs["obj"];

export type WalletGlobalState = GlobalKeysState;

export type MethodOffset = {
  name: Uint8Array;
  cooldown: bigint;
  lastCalled: bigint;
}

export type FundsRequest = {
  asset: bigint;
  amount: bigint;
}

export type PluginInfo = Omit<ClientPluginInfo, 'methods'> & {
  methods: MethodOffset[]
}

export type MbrParams = {
  escrow: string
  methodCount: bigint | number
  plugin: string
  groups: bigint | number
}

export type RekeyArgs = {
  type: bigint | number
  escrow: string
  methodOffsets: bigint[] | number[]
  fundsRequest: [number | bigint, number | bigint][]
}

export const CallerType = {
  Other: 0n,
  Global: 1n,
  Admin: 2n,
} as const

export type CallerType = (typeof CallerType)[keyof typeof CallerType]

export type AddPluginArgs = Omit<ContractArgs['arc58_addNamedPlugin(string,uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)void'], 'name'>

// Updated plugin parameters to support fluent transaction API
export type WalletUsePluginParams = (
  Omit<ContractArgs['arc58_rekeyToPlugin(uint64,uint64,string,uint64[],(uint64,uint64)[])void'], 'plugin' | 'type' | 'escrow' | 'methodOffsets' | 'fundsRequest'> &
  {
    name?: string
    callerType?: CallerType
    escrow?: string
    fundsRequest?: FundsRequest[]
    calls: PluginSDKReturn[]
    lease?: string
    consolidateFees?: boolean
  }
) & MaybeSigner;

export type BuildWalletUsePluginParams = (
  WalletUsePluginParams
  & {
    lease: string,
    firstValid?: bigint,
    windowSize?: bigint,
    skipSignatures?: boolean
  }
)

export type SendOptions = {
  signer?: algosdk.TransactionSigner
}

export type ExecutionBuildGroup = {
  lease: Uint8Array
  firstValid: bigint
  lastValid: bigint
  useRounds: boolean
  ids: Uint8Array[]
  /**
   * Pre-populated, pre-grouped windows ready to submit. Each window's validity
   * range covers a portion of `[firstValid, lastValid]`. For the arc58
   * execution-handoff pattern, pass a window to `sendPrepared(window, algod)`
   * to sign + submit. For in-process submission, call `send()`.
   */
  windows: PreparedGroup[]
  send: (options?: SendOptions) => Promise<GroupReturn>
  /**
   * Predicted cost of executing this group from the wallet's perspective,
   * aggregated from the simulate response captured during `build.usePlugin`
   * (no extra simulate round-trip). Lets callers preview the exact ALGO +
   * asset delta the wallet's app account will see at `send()` time, which
   * is what enables a single-simulate UX: build once, preview cost, sign &
   * send on user action without re-simulating.
   *
   * See `simulate/cost.ts` for the full shape and semantics.
   */
  expectedCost: ExpectedCost
}

// Default values for addPlugin method
export const AddPluginDefaults = {
  escrow: '',
  name: '',
  useExecutionKey: false,
  useRounds: false,
  admin: false,
  delegationType: 0n,
  coverFees: false,
  canReclaim: true,
}

export type CanCallParams = (
  Omit<ContractArgs['arc58_canCall(uint64,uint64,address,string,byte[4])bool'], 'method'>
  & {
    methods: PluginMethodSpecifier
  }
  & MaybeSigner
)

// Enhanced method specification that supports method references directly
export type PluginMethodDefinition = {
  name: PluginMethodSpecifier;
  cooldown: bigint;
};

export type SpendAllowanceType = 'flat' | 'window' | 'drip';

export type AddAllowanceArgs = {
  asset: bigint;
  useRounds?: boolean;
} & (
    | {
      type: 'flat';
      amount: bigint;
    }
    | {
      type: 'window';
      amount: bigint;
      interval: bigint;
    }
    | {
      type: 'drip';
      rate: bigint;
      max: bigint;
      interval: bigint;
    }
  );

// AllowanceInfo
export type AllowanceInfo = {
  last: bigint,
  start: bigint,
  useRounds: boolean
} & (
    | {
      type: 'flat',
      spent: bigint,
      amount: bigint,
    }
    | {
      type: 'window',
      spent: bigint,
      amount: bigint,
      interval: bigint,
    }
    | {
      type: 'drip',
      max: bigint,
      lastLeftover: bigint,
      rate: bigint,
      interval: bigint,
    }
  )

// allowance info type guards
export function isFlatAllowance(info: AllowanceInfo): info is Extract<AllowanceInfo, { type: 'flat' }> {
  return info.type === 'flat';
}

export function isWindowAllowance(info: AllowanceInfo): info is Extract<AllowanceInfo, { type: 'window' }> {
  return info.type === 'window';
}

export function isDripAllowance(info: AllowanceInfo): info is Extract<AllowanceInfo, { type: 'drip' }> {
  return info.type === 'drip';
}

type BaseWalletAddPluginParams<TClient extends SDKClient> =
  Partial<Omit<ContractArgs['arc58_addNamedPlugin(string,uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)void'], 'methods'>> &
  MaybeSigner &
  {
    client: AkitaSDK<TClient>
    methods?: PluginMethodDefinition[]
    /**
     * @deprecated Use `WalletGroupComposer.addAllowances()` instead.
     * Allowances are keyed on-chain by `{escrow, asset}` and should be
     * set at the escrow level, not per-plugin.
     */
    allowances?: AddAllowanceArgs[]
  }

export type WalletAddPluginParams<TClient extends SDKClient> =
  BaseWalletAddPluginParams<TClient> & (
    | { callerType: typeof CallerType.Global | typeof CallerType.Admin; caller?: never }
    | { callerType?: typeof CallerType.Other; caller: string }
  )

/** Plugin install params for factory-level wallet creation. All fields match arc58_addPlugin args. */
export type PluginInstallParams = {
  plugin: bigint
  caller: string
  escrow?: string
  admin?: boolean
  delegationType?: bigint | number
  lastValid?: bigint
  cooldown?: bigint
  methods?: [Uint8Array, bigint | number][]
  useRounds?: boolean
  useExecutionKey?: boolean
  coverFees?: boolean
  canReclaim?: boolean
  defaultToEscrow?: boolean
}

/**
 * Type guard to check if an object is a valid AkitaSDK instance for use with plugins
 */
export function isValidPluginSDK<TClient extends SDKClient>(
  sdk: any
): sdk is AkitaSDK<TClient> {
  return (
    sdk &&
    typeof sdk === 'object' &&
    typeof sdk.appId === 'bigint' &&
    sdk.client &&
    typeof sdk.client.appId === 'bigint' &&
    typeof sdk.client.appAddress === 'string' &&
    sdk.algorand
  );
}

/**
 * Extract the app ID from a plugin SDK instance in a type-safe way
 */
export function getPluginAppId<TClient extends SDKClient>(
  plugin: AkitaSDK<TClient>
): bigint {
  return plugin.appId;
}
