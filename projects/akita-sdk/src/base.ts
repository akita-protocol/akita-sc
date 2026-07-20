import { AlgorandClient } from "@algorandfoundation/algokit-utils/types/algorand-client";
import { DEFAULT_READER, DEFAULT_SEND_PARAMS } from "./constants";
import { resolveAppIdWithClient, ENV_VAR_NAMES, detectNetworkFromClient, getCurrentNetwork, AkitaNetwork } from "./config";
import { ExpandedSendParams, ExpandedSendParamsWithSigner, hasSenderSigner, MaybeSigner, NewBaseContractSDKParams, normalizeSigner } from "./types";
import { makeEmptyTransactionSigner } from "@algorandfoundation/algokit-utils/transact";
import { installAccessListResourcePopulator, registerAccessListResourceCarrier } from './simulate/access-list';

// AlgoKit Utils currently discovers resources with simulate but still writes
// them to the legacy 8-entry foreign arrays. Install the SDK-wide Access
// populator before any generated client composes a transaction.
installAccessListResourcePopulator();

export abstract class BaseSDK<T> {
  public appId: bigint;
  public client: T;
  public algorand: AlgorandClient;
  public readerAccount: string = DEFAULT_READER;
  public sendParams: ExpandedSendParams;
  
  /** The detected network for this SDK instance */
  public network: AkitaNetwork;

  /**
   * Override this in subclasses to specify the environment variable name for the app ID
   */
  protected static envVarName: string = '';

  constructor({ factoryParams, algorand, factory, readerAccount, sendParams }: NewBaseContractSDKParams<T>, envVarName?: string) {
    // Detect network from AlgorandClient
    this.network = detectNetworkFromClient(algorand);
    
    // Resolve app ID from provided value, environment, or network config
    const resolvedAppId = resolveAppIdWithClient(
      algorand,
      factoryParams.appId,
      envVarName || (this.constructor as typeof BaseSDK).envVarName || '',
      this.constructor.name
    );
    
    this.appId = resolvedAppId;
    this.algorand = algorand;
    if (readerAccount) { this.readerAccount = readerAccount; }
    this.sendParams = { ...(sendParams ?? DEFAULT_SEND_PARAMS) };

    if (!!factoryParams.defaultSender) {
      this.sendParams.sender = factoryParams.defaultSender;
    }
    if (!!factoryParams.defaultSigner) {
      this.sendParams.signer = normalizeSigner(factoryParams.defaultSigner);
    }

    // Create the client with the resolved app ID
    this.client = new factory({ algorand }).getAppClientById({
      ...factoryParams,
      appId: resolvedAppId,
    });

    // Generated clients expose their full ARC-56 spec. Register only contracts
    // with a known zero-resource carrier route so the central composer can add
    // Access/opcode capacity when simulation proves the branch needs it.
    registerAccessListResourceCarrier(
      resolvedAppId,
      (
        this.client as {
          appSpec?: {
            methods?: Array<{
              name?: string;
              args?: unknown[];
              returns?: { type?: string };
              readonly?: boolean;
            }>;
          };
        }
      ).appSpec,
      (this.algorand as { client?: { algod?: object } }).client?.algod,
    );
  }

  setReaderAccount(readerAccount: string): void {
    this.readerAccount = readerAccount;
  }

  setSendParams(sendParams: ExpandedSendParams): void {
    this.sendParams = { ...sendParams };
  }

  protected getSendParams({ sender, signer }: MaybeSigner = {}): ExpandedSendParams {
    return {
      ...this.sendParams,
      ...(sender !== undefined && { sender }),
      ...(signer !== undefined && { signer: normalizeSigner(signer) }),
    };
  }

  protected getRequiredSendParams(params: MaybeSigner = {}): ExpandedSendParamsWithSigner {
    const sendParams = this.getSendParams(params);
    if (!hasSenderSigner(sendParams)) {
      throw new Error('Sender and signer must be provided either explicitly or through defaults at SDK instantiation');
    }
    return sendParams;
  }

  protected getReaderSendParams({ sender }: { sender?: string } = {}): ExpandedSendParams {
    return {
      ...this.sendParams,
      ...(sender !== undefined ? { sender } : { sender: this.readerAccount }),
      signer: makeEmptyTransactionSigner()
    };
  }
}
