import { GlobalKeysState, PluginInfo as ClientPluginInfo, AbstractedAccountArgs, AbstractedAccountReturns } from "../generated/AbstractedAccountClient";
import { MaybeSigner, SDKClient, AkitaSDK, PluginMethodSpecifier, PluginSDKReturn, GroupReturn } from "../types";
import { AppReturn } from "@algorandfoundation/algokit-utils/types/app";
import { ABIReturn } from '@algorandfoundation/algokit-utils/types/app';
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

/** A grant that names an escrow, and the aliases that point at it. */
export type EscrowPluginRef = {
  plugin: bigint
  caller: string
  /** The escrow part of the grant's key: the escrow's name, or '' for a grant that defaults to the escrow. */
  escrow: string
  names: string[]
}

/**
 * What becomes of an escrow's address once the escrow is deleted. It differs with the kind of escrow,
 * and in both cases it cannot be undone:
 *
 * - `address-returns-to-its-key`: the escrow is an ordinary account that was rekeyed to the wallet.
 *   The delete closes it, and closing an account ends its rekey. From then on the address belongs to
 *   whoever holds its private key, and no longer to the wallet.
 * - `address-under-nobodys-control`: the escrow is the account of an app the escrow factory made. The
 *   delete removes that app, and nobody controls the address afterwards. ALGO sent to it is lost. An
 *   asset cannot be sent to it: the address is opted in to none, and only the address itself could
 *   opt in.
 */
export type EscrowDeleteWarningCode = 'address-returns-to-its-key' | 'address-under-nobodys-control'

/**
 * Something a person has to be told before they confirm the delete of an escrow.
 *
 * An app that offers the delete shows every warning of the plan where it cannot be missed, in the
 * confirmation itself and not behind a link or a tooltip, and asks for the confirmation only after it.
 * The same holds where the delete is put into a DAO or Guild proposal: show it to the person who
 * creates the proposal.
 */
export type EscrowDeleteWarning = {
  /** A stable code, for an app to key its own wording, translation and styling on. */
  code: EscrowDeleteWarningCode
  /** The warning in plain English, ready to show as it is. */
  message: string
}

/** What the chain lists for one escrow: everything that has to go before the escrow can be deleted. */
export type EscrowTeardown = {
  escrow: string
  id: bigint
  address: string
  locked: boolean
  /** Whether the escrow factory has the escrow on record. A delete registers one that is not. */
  registered: boolean
  /**
   * How many plugins and allowances the wallet counts for the escrow. While this is above zero the
   * wallet refuses to delete it. Undefined for an escrow made before the wallet kept this count: the
   * wallet cannot check a delete of such an escrow, so remove everything listed here with it.
   */
  counted: bigint | undefined
  /** Grants that name the escrow. */
  plugins: EscrowPluginRef[]
  /** Aliases that name the escrow and whose grant is already gone. */
  staleNames: string[]
  /** Assets the escrow has an allowance for. */
  allowances: bigint[]
  /** Assets the escrow holds or is opted in to. */
  assets: bigint[]
  /** What stands in the way that no call of the wallet can undo. Empty when the escrow can be deleted. */
  blockers: string[]
  /**
   * What the person has to be told before they confirm the delete. Never empty: it always says what
   * becomes of the escrow's address. An app must show all of it prominently (see `EscrowDeleteWarning`).
   */
  warnings: EscrowDeleteWarning[]
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
    /**
     * Seed the resources a principal-resolving target reads for this window (spec §3.6: `P(W)`,
     * plus `A(W.address)` or `A(controlled)` when the spending account is an escrow) into the
     * Access-list preparer before simulation. Default false: simulation already discovers them.
     * Use it for tight groups where a fixed placement matters.
     */
    seedPrincipalResources?: boolean
    /** transactions placed at the start of the group (e.g. a payment the same signer approves) */
    preTransactions?: { txn: algosdk.Transaction; signer: algosdk.TransactionSigner }[]
  }
) & MaybeSigner;

export type BuildWalletUsePluginParams = (
  WalletUsePluginParams
  & {
    lease: string,
    firstValid?: bigint,
    windowSize?: bigint,
    skipSignatures?: boolean,
    /**
     * Simulate only the rekey as the wallet's admin, with this max fee in microALGO, and the rest of the group
     * as the real sender (who also pays when it runs). For Global and Admin grants on a wallet whose admin
     * holds little spare ALGO, e.g. a Guild, since a simulate charges each transaction's max fee to its sender.
     */
    adminRekeyMaxFee?: bigint
    /**
     * Bytes of boxes the group reads that are created after it is built and before it is sent, on top of
     * this wallet's execution key box, which is always counted. For example the boxes a DAO proposal
     * writes for the key. The group is given box read budget for them (see `boxReadHeadroom`).
     */
    pendingBoxBytes?: bigint | number
    /**
     * The exact number of box read headroom references to add, in place of the number worked out from
     * the execution key box and `pendingBoxBytes`. Only for rebuilding a group whose id is already
     * recorded: a box that exists by then is sized by the simulation itself, so the same group can need
     * fewer of these. Try the built group's `boxReadHeadroomRefs` first and then count down.
     */
    boxReadHeadroomRefs?: number
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
  /** How many box read headroom references the build added after discovery (2,048 B each). */
  boxReadHeadroomRefs: number
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
  canReclaim: false,
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
    /**
     * LEGACY. Also write a NEWLY created escrow into the EscrowFactory reverse registry
     * (`register(escrow)`) after the install. Default: `!registryWritesStopped(network)`
     * (networks.ts `REGISTRY_WRITES_STOPPED`): writes continue until the Phase 3 proposal has executed on
     * that network (spec §7.1), and stop by default on LocalNet. Pass `true` / `false` to force either
     * behaviour (tests of legacy registry semantics pass `true`). Removed in Phase 4.
     */
    registerEscrow?: boolean
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
