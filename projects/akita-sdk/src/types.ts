import { AlgorandClient } from "@algorandfoundation/algokit-utils/algorand-client";
import { AlgoAmount } from '@algorandfoundation/algokit-utils/amount';
import { SendParams } from "@algorandfoundation/algokit-utils/transaction";
import {
  AddressWithTransactionSigner,
  Transaction,
  TransactionSigner,
} from "@algorandfoundation/algokit-utils/transact";
import { ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import { PendingTransactionResponse } from "@algorandfoundation/algokit-utils/algod-client";
import { AppFactoryAppClientParams } from "@algorandfoundation/algokit-utils/app-factory";
import { AppReturn } from "@algorandfoundation/algokit-utils/types/app";
import { ABIReturn } from "@algorandfoundation/algokit-utils/abi";
import {
  AppCallMethodCall,
  AppCallParams,
  AppCreateMethodCall,
  AppCreateParams,
  AppDeleteMethodCall,
  AppDeleteParams,
  AppUpdateMethodCall,
  AppUpdateParams,
  AssetConfigParams,
  AssetCreateParams,
  AssetDestroyParams,
  AssetFreezeParams,
  AssetOptInParams,
  AssetOptOutParams,
  AssetTransferParams,
  OfflineKeyRegistrationParams,
  OnlineKeyRegistrationParams,
  PaymentParams,
} from "@algorandfoundation/algokit-utils/composer";

/**
 * Tagged discriminated union used by wallet plugins to describe the
 * transactions they want to append to a plugin execution group. The
 * consumer (see `wallet/index.ts`) dispatches to the correct composer
 * method based on the `type` tag.
 */
export type PluginTxn =
  | (PaymentParams & { type: 'pay' })
  | (AssetCreateParams & { type: 'assetCreate' })
  | (AssetConfigParams & { type: 'assetConfig' })
  | (AssetFreezeParams & { type: 'assetFreeze' })
  | (AssetDestroyParams & { type: 'assetDestroy' })
  | (AssetTransferParams & { type: 'assetTransfer' })
  | (AssetOptInParams & { type: 'assetOptIn' })
  | (AssetOptOutParams & { type: 'assetOptOut' })
  | (AppCallParams & { type: 'appCall' })
  | (AppCreateParams & { type: 'appCall' })
  | (AppUpdateParams & { type: 'appCall' })
  | (AppDeleteParams & { type: 'appCall' })
  | (OnlineKeyRegistrationParams & { type: 'keyReg' })
  | (OfflineKeyRegistrationParams & { type: 'keyReg' })
  | ({ type: 'txnWithSigner'; txn: Transaction; signer: TransactionSigner })
  | (AppCallMethodCall & { type: 'methodCall' })
  | (AppCreateMethodCall & { type: 'methodCall' })
  | (AppUpdateMethodCall & { type: 'methodCall' })
  | (AppDeleteMethodCall & { type: 'methodCall' });

export type MaybeSigner = {
  sender?: ReadableAddress;
  signer?: TransactionSigner;
};

/**
 * Extract a plain `TransactionSigner` from either a raw signer function or an
 * `AddressWithTransactionSigner` object. This is the shape most algokit-utils
 * send.* and composer paths actually consume.
 */
export function normalizeSigner(
  signer: TransactionSigner | AddressWithTransactionSigner | undefined,
): TransactionSigner | undefined {
  if (signer === undefined) return undefined;
  if (typeof signer === 'function') return signer;
  return signer.signer;
}

export type ClientFactory<T> = new (params: { algorand: AlgorandClient }) => {
  getAppClientById(params: AppFactoryAppClientParams): T;
};

export interface SDKClient {
  appId: bigint;
  algorand: AlgorandClient;
}

export type ExpandedSendParams = SendParams & {
  maxFee?: AlgoAmount;
  sender?: ReadableAddress;
  signer?: TransactionSigner;
};

export type ExpandedSendParamsWithSigner = ExpandedSendParams & {
  sender: ReadableAddress;
  signer: TransactionSigner;
};

// Type guard function
export function hasSenderSigner(params: ExpandedSendParams): params is ExpandedSendParamsWithSigner {
  return params.sender !== undefined && params.signer !== undefined;
}

// Generic type for SDK instances that extend BaseSDK
export interface AkitaSDK<TClient extends SDKClient = SDKClient> {
  appId: bigint;
  client: TClient;
  algorand: AlgorandClient;
  readerAccount: string;
  sendParams: SendParams;
  setReaderAccount(readerAccount: string): void;
  setSendParams(sendParams: SendParams): void;
}

// Helper type to extract the client type from an SDK
export type ExtractClientType<T> = T extends AkitaSDK<infer C> ? C : never;

// Helper type to extract the SDK type from a client
export type SDKFromClient<TClient extends SDKClient> = AkitaSDK<TClient>;

export interface NewBaseContractSDKParams<T> extends NewContractSDKParams {
  factory: ClientFactory<T>;
}

// Utility types for working with SDK instances

// Type guard to check if an object is an AkitaSDK instance
export type IsAkitaSDK<T> = T extends AkitaSDK<any> ? true : false;

// Union type helper for multiple SDK types
export type AnyAkitaSDK = AkitaSDK<any>;

// Type to constrain function parameters to only accept AkitaSDK instances
export type RequireAkitaSDK<T extends AkitaSDK<any>> = T;

// Type to extract method signatures from a client (for direct method usage)
export type ClientMethodSignatures<TClient> = {
  [K in keyof TClient]: TClient[K] extends (...args: any[]) => any ? TClient[K] : never;
}[keyof TClient];

// Type to extract method names from a client (useful for dynamic method calling)
export type ClientMethods<TClient> = {
  [K in keyof TClient]: TClient[K] extends (...args: any[]) => any ? K : never;
}[keyof TClient];

export type PluginHookParams = {
  wallet: bigint;
}

export type PluginSDKReturn = (spendingAddress?: ReadableAddress) => {
  appId: bigint;
  selectors: Uint8Array[];
  getTxns: (params: PluginHookParams) => Promise<PluginTxn[]>;
  /**
   * Number of opUp transactions to add after verifyAuthAddr.
   * Complex operations like voting need additional opUp calls
   * to provide extra resource reference slots for inner transactions.
   */
  opUpCount?: number;
}

export function isPluginSDKReturn(value: unknown): value is PluginSDKReturn {
  return typeof value === 'function';
}

// Helper type for plugin method specifications that allows both string names and method references
export type PluginMethodSpecifier = PluginSDKReturn | Uint8Array[];

// Type for SDK constructor parameters with proper client factory typing
export type SDKConstructorParams<TClient extends SDKClient> = NewContractSDKParams & {
  factory: ClientFactory<TClient>;
};

/**
 * Factory params with optional appId - can be resolved from environment
 */
export type OptionalAppIdFactoryParams = Omit<AppFactoryAppClientParams, 'appId'> & {
  appId?: bigint;
};

/**
 * Parameters for constructing SDK instances
 * appId is optional - if not provided, will be resolved from environment variables
 */
export interface NewContractSDKParams {
  factoryParams: OptionalAppIdFactoryParams;
  algorand: AlgorandClient;
  readerAccount?: string;
  sendParams?: SendParams;
}

export interface PluginCallParams {
  appId: bigint;
  method: string;
  args?: any[];
  sendParams?: ExpandedSendParams;
  readerAccount?: string;
}

export type TxnReturn<T> = Omit<{
  groupId: string | undefined;
  txIds: string[];
  returns?: ABIReturn[] | undefined;
  confirmations: PendingTransactionResponse[];
  transactions: Transaction[];
  confirmation: PendingTransactionResponse;
  transaction: Transaction;
  return?: ABIReturn | undefined;
}, "return"> & AppReturn<T>

export type GroupReturn = {
  groupId: string | undefined;
  txIds: string[];
  returns: ABIReturn[] & [];
  confirmations: PendingTransactionResponse[];
  transactions: Transaction[];
}
