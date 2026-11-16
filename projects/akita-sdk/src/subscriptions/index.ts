import { microAlgo } from "@algorandfoundation/algokit-utils";
import { microAlgos } from "@algorandfoundation/algokit-utils";
import { isValidAddress } from "algosdk";
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import { ServiceFromTuple, ServicesKey, SubscriptionInfo, SubscriptionsArgs, SubscriptionsClient, SubscriptionsFactory } from '../generated/SubscriptionsClient'
import { MaybeSigner, NewContractSDKParams } from "../types";
import { ValueMap } from "../wallet/utils";
import { NewServiceArgs, PaidUpCheckOptions, Service, SubscribeArgs, SubscriptionGateCtx, SubscriptionGateTxn, SubscriptionInfoWithDetails, SubscriptionStatus, SubscriptionTimestampUnit } from "./types";
import { bytesToHexColor, hexColorToBytes, validateHexColor } from "./utils";
import { convertToUnixTimestamp } from "../utils";
import { FEATURED_SERVICE_MBR, HighlightMessage, MAX_DESCRIPTION_CHUNK_SIZE, MAX_DESCRIPTION_LENGTH, SUBSCRIPTION_PRINCIPAL_MBR } from "./constants";
import { PAYER_RECORD_MBR } from "../constants";

// Re-export key types from generated client
export { ServicesKey } from '../generated/SubscriptionsClient';

type ContractArgs = SubscriptionsArgs["obj"];

export * from './constants';
export * from './errors';
export * from './types';
export * from './utils';

const toBigInt = (value: bigint | number): bigint =>
  typeof value === 'bigint' ? value : BigInt(Math.floor(value));

const toSeconds = (value: bigint | number, unit: SubscriptionTimestampUnit): bigint => {
  const normalized = toBigInt(value);
  return unit === 'milliseconds' ? normalized / 1000n : normalized;
};

/**
 * The gate context a top-level (direct) caller acting as itself presents: `(sender, 0, sender)`. This is
 * what `principalOf(dao, 0)` resolves to on chain. A non-zero hint is never valid at top level (`errHtop`).
 */
export const directGateCtx = (sender: string): SubscriptionGateCtx => ({ principal: sender, wallet: 0n, spender: sender });

const resolveGateTxn = async (gateTxn: SubscriptionGateTxn, ctx: SubscriptionGateCtx) =>
  typeof gateTxn === 'function' ? await gateTxn(ctx) : gateTxn;

const assertDirectHint = (wallet: bigint, legacy: boolean) => {
  if (!legacy && wallet !== 0n) {
    throw new Error('Subscriptions: a top-level call cannot carry a wallet hint (errHtop); wallets act through the subscriptions plugin');
  }
};

export class SubscriptionsSDK extends BaseSDK<SubscriptionsClient> {

  private serviceMapKeyGenerator = ({ address, id }: ServicesKey) => (`${address}${id}`)
  public services: ValueMap<ServicesKey, Service> = new ValueMap(this.serviceMapKeyGenerator);

  constructor(params: NewContractSDKParams) {
    super({ factory: SubscriptionsFactory, ...params }, ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID);
  }

  /**
   * Get the cost to create a new service from the contract (the hinted `newServiceCost(asset, wallet)`;
   * `legacy` quotes the pre-hint selector, which uses the registry referrer).
   */
  async newServiceCost({ sender, signer, asset = 0n, wallet = 0n, legacy = false }: MaybeSigner & { asset?: bigint | number, wallet?: bigint, legacy?: boolean } = {}): Promise<bigint> {
    const sendParams = this.getSendParams({ sender, signer });
    if (legacy) {
      return (await this.client.newServiceCostUint64Uint64({ ...sendParams, args: { asset } }))
    }
    return (await this.client.newServiceCostUint64Uint64Uint64({ ...sendParams, args: { asset, wallet } }))
  }

  async blockCost({ sender, signer }: MaybeSigner = {}): Promise<bigint> {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.blockCost({ ...sendParams, args: [] })
  }

  /**
   * Get the cost to create a new subscription from the contract (box MBR + referral MBR, plus
   * `SUBSCRIPTION_PRINCIPAL_MBR` when `wallet != 0` and the service is gated). `legacy` quotes the
   * pre-hint selector (registry referrer, no stored principal).
   */
  async newSubscriptionCost({ sender, signer, recipient, asset = 0n, serviceId = 0n, wallet = 0n, legacy = false }: MaybeSigner & { recipient: string, asset?: bigint | number, serviceId?: bigint | number, wallet?: bigint, legacy?: boolean }): Promise<bigint> {
    const sendParams = this.getSendParams({ sender, signer });
    if (legacy) {
      return (await this.client.newSubscriptionCostAddressUint64Uint64Uint64({ ...sendParams, args: { recipient, asset, serviceId } }))
    }
    return (await this.client.newSubscriptionCostAddressUint64Uint64Uint64Uint64({ ...sendParams, args: { recipient, asset, serviceId, wallet } }))
  }

  /**
   * The `GateCtx` a hinted `gatedTriggerPayment(gateTxn, key, wallet)` sent by `sender` will assert
   * (readonly; the contract runs the same code). `wallet` is the CALLER's own hint, never the subscriber's.
   */
  async triggerGateCtx({ sender, address, id, wallet = 0n }: { sender?: string, address: string, id: bigint | number, wallet?: bigint }): Promise<SubscriptionGateCtx> {
    const sendParams = this.getReaderSendParams({ sender });
    const ctx = await this.client.triggerGateCtx({ ...sendParams, args: { key: { address, id: BigInt(id) }, wallet } });
    return { principal: ctx.principal, wallet: ctx.wallet, spender: ctx.spender };
  }

  /**
   * The stored principal pair `(wallet, principal)` of a gated subscription, or undefined if it has none
   * (a legacy subscription, a plain subscriber, or an ungated service).
   */
  async getStoredPrincipal({ address, id }: { address: string, id: bigint | number }): Promise<{ wallet: bigint, principal: string } | undefined> {
    try {
      const value = await this.client.state.box.principals.value({ address, id: BigInt(id) });
      return value === undefined ? undefined : { wallet: value.wallet, principal: value.principal };
    } catch {
      return undefined;
    }
  }

  /**
   * Backfill (Q13) the stored principal of a legacy gated subscription from the escrow-factory registry.
   * Permissionless; the caller pays `SUBSCRIPTION_PRINCIPAL_MBR` (refunded to the subscriber on unsubscribe).
   */
  async adoptPrincipal({ sender, signer, address, id }: MaybeSigner & { address: string, id: bigint | number }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(SUBSCRIPTION_PRINCIPAL_MBR),
      receiver: this.client.appAddress.toString(),
    });

    await this.client.send.adoptPrincipal({
      ...sendParams,
      args: { payment, key: { address, id: BigInt(id) } },
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
      maxFee: microAlgo(10_000),
    });
  }

  /**
   * Get the cost to opt the contract into an asset
   */
  async optInCost({ sender, signer, asset }: MaybeSigner & { asset: bigint | number }): Promise<bigint> {
    const sendParams = this.getSendParams({ sender, signer });
    return (await this.client.optInCost({ ...sendParams, args: { asset } }))
  }

  /**
   * Opt the Subscriptions contract (and its rev_subscriptions escrow) into an
   * asset. Must be called directly by an EOA — NOT via `SubscriptionsPlugin.optIn`
   * — because `Subscriptions.optIn` rekeys to the revenue-manager plugin
   * internally and plugin rekeys cannot be nested.
   *
   * @param asset The asset ID to opt into
   */
  async optIn({
    sender,
    signer,
    asset,
  }: MaybeSigner & {
    asset: bigint | number;
  }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const optInCost = await this.optInCost({ ...sendParams, asset });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(optInCost),
      receiver: this.client.appAddress.toString(),
    });

    const group = this.client.newGroup();

    group.optIn({
      ...sendParams,
      args: {
        payment,
        asset: BigInt(asset),
      },
      // Covers every inner fee for:
      //   - the contract's own asset opt-in (1 inner)
      //   - the composed arc58_rekeyToPlugin + RevenueManager.optIn + MBR
      //     payment + arc58_verifyAuthAddress group (4 inners)
      //   - nested inners those app calls emit (rekey payments, escrow opt-in
      //     assetTransfer, rekey-back)
      // 15× minFee is comfortably over-budget; any surplus is retained by the
      // block, which is cheap insurance against flow additions.
      extraFee: microAlgos(15_000n),
    });

    await group.send({
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
    });
  }

  /**
   * Check if the contract is opted into a specific asset
   */
  async isOptedInToAsset(asset: bigint | number): Promise<boolean> {
    const assetId = BigInt(asset);
    
    // ALGO (asset 0) doesn't require opt-in - accounts can always hold ALGO
    if (assetId === 0n) {
      return true;
    }
    
    try {
      const appAddress = this.client.appAddress.toString();

      // Use the algod endpoint /v2/accounts/{address}/assets/{asset-id}
      const algod = this.client.algorand.client.algod;
      // If the asset-holding exists, we're opted in. If it 404s, we're not.
      const response = await algod.accountAssetInformation(appAddress, assetId).do();
      return !!response.assetHolding;
    } catch (error: any) {
      // If not opted in, algod returns 404 for this endpoint
      if (error?.response?.status === 404) {
        return false;
      }
      console.warn('[SubscriptionsSDK] Error checking asset opt-in:', error);
      return false;
    }
  }

  async isBlocked({ sender, signer, address, blocked }: MaybeSigner & { address: string, blocked: string }): Promise<boolean> {
    const sendParams = this.getSendParams({ sender, signer });
    return (await this.client.isBlocked({ ...sendParams, args: { address, blocked } }))
  }

  async isShutdown({ sender, signer, address, id }: MaybeSigner & { address: string, id: bigint | number }): Promise<boolean> {
    const sendParams = this.getSendParams({ sender, signer });
    return (await this.client.isShutdown({ ...sendParams, args: { address, id } }))
  }

  async getServices(): Promise<ValueMap<ServicesKey, Service>> {
    const rawServices = await this.client.state.box.services.getMap();
    const transformedEntries = Array.from(rawServices.entries()).map(([key, value]) => [
      key,
      {
        ...value,
        highlightColor: bytesToHexColor(value.highlightColor)
      }
    ] as [ServicesKey, Service]);

    this.services = new ValueMap(
      this.serviceMapKeyGenerator,
      new Map(transformedEntries)
    );
    return this.services
  }

  async getService({ sender, address, id }: { sender?: string } & { address: string, id: number }): Promise<Service> {
    const sendParams = this.getReaderSendParams({ sender });
    const result = (await this.client.getService({ ...sendParams, args: { address, id } }))

    return {
      ...result,
      highlightColor: bytesToHexColor(result.highlightColor)
    }
  }

  async getServicesByAddress({ sender, address, start = 0n, windowSize = 20n }: { sender?: string } & { address: string, start?: bigint | number, windowSize?: bigint | number }): Promise<Service[]> {
    const sendParams = this.getReaderSendParams({ sender });
    const result = await this.client.getServicesByAddress({ ...sendParams, args: { address, start, windowSize } });
    // The return is an array of tuples, convert to Service objects
    const tuples = result as unknown as [number, bigint, bigint, bigint, bigint, bigint, string, string, string, Uint8Array, number, Uint8Array][];
    return tuples.map(tuple => {
      const result = ServiceFromTuple(tuple)
      return {
        ...result,
        highlightColor: bytesToHexColor(result.highlightColor)
      }
    });
  }

  async getSubscription({ sender, address, id }: { sender?: string } & { address: string, id: bigint }): Promise<SubscriptionInfo> {
    const sendParams = this.getReaderSendParams({ sender });
    const result = (await this.client.mustGetSubscription({ ...sendParams, args: { key: { address, id } } }))
    return {
      ...result,
      lastPayment: convertToUnixTimestamp(result.lastPayment)
    }
  }

  async getSubscriptionWithDetails({ sender, address, id }: { sender?: string } & { address: string, id: bigint }): Promise<SubscriptionInfoWithDetails> {
    const sendParams = this.getReaderSendParams({ sender });
    const result = (await this.client.getSubscriptionWithDetails({ ...sendParams, args: { key: { address, id } } }))
    return {
      ...result,
      highlightColor: bytesToHexColor(result.highlightColor),
      lastPayment: convertToUnixTimestamp(result.lastPayment),
    }
  }

  /**
   * Compute paid-up status and current payment window for a subscription.
   *
   * Defaults align with SDK-returned data:
   * - startDate: seconds (on-chain)
   * - interval: seconds (on-chain)
   * - lastPayment: milliseconds (SDK converts it)
   * - now: milliseconds (Date.now())
   */
  getSubscriptionStatus(subscription: SubscriptionInfo, options: PaidUpCheckOptions = {}): SubscriptionStatus {
    const {
      now = Date.now(),
      nowUnit = 'milliseconds',
      startDateUnit = 'seconds',
      lastPaymentUnit = 'milliseconds',
      intervalUnit = 'seconds',
    } = options;

    const nowSec = toSeconds(now, nowUnit);
    const startSec = toSeconds(subscription.startDate, startDateUnit);
    const lastPaymentSec = toSeconds(subscription.lastPayment, lastPaymentUnit);
    const intervalSec = toSeconds(subscription.interval, intervalUnit);

    if (intervalSec <= 0n || nowSec < startSec) {
      return {
        paidUp: false,
        windowStart: startSec,
        now: nowSec,
        startDate: startSec,
        lastPayment: lastPaymentSec,
        interval: intervalSec,
      };
    }

    const windowStart = nowSec - ((nowSec - startSec) % intervalSec);
    return {
      paidUp: lastPaymentSec >= windowStart,
      windowStart,
      now: nowSec,
      startDate: startSec,
      lastPayment: lastPaymentSec,
      interval: intervalSec,
    };
  }

  /**
   * Convenience wrapper for paid-up boolean.
   */
  isSubscriptionPaidUp(subscription: SubscriptionInfo, options: PaidUpCheckOptions = {}): boolean {
    return this.getSubscriptionStatus(subscription, options).paidUp;
  }

  async isFirstSubscription({ sender, address }: { sender?: string } & { address: string }): Promise<boolean> {
    const sendParams = this.getReaderSendParams({ sender });
    return (await this.client.isFirstSubscription({ ...sendParams, args: { address } }))
  }

  async getSubscriptionList({ sender, address }: { sender?: string } & { address: string }): Promise<bigint> {
    const sendParams = this.getReaderSendParams({ sender });
    return (await this.client.getSubscriptionList({ ...sendParams, args: { address } }))
  }

  async getServiceList({ sender, address }: { sender?: string } & { address: string }): Promise<bigint> {
    const sendParams = this.getReaderSendParams({ sender });
    return (await this.client.getServiceList({ ...sendParams, args: { address } }))
  }

  async newService({ sender, signer, asset = 0n, passes = 0n, gateId = 0n, wallet = 0n, legacy = false, ...rest }: NewServiceArgs): Promise<bigint> {

    const sendParams = this.getRequiredSendParams({ sender, signer });
    assertDirectHint(wallet, legacy);

    validateHexColor(rest.highlightColor);
    const highlightColor = hexColorToBytes(rest.highlightColor);
    
    // Check if we need to opt the contract into the asset (ASA services only)
    const isAsaService = asset !== 0n;
    const needsOptIn = isAsaService &&!(await this.isOptedInToAsset(asset));
    
    // Use contract method to get the exact cost
    const paymentAmount = await this.newServiceCost({ ...sendParams, asset, wallet, legacy });

    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
      receiver: this.client.appAddress.toString(),
    })

    if (rest.description.length === 0) {
      throw new Error('Description cannot be empty');
    }

    const group = this.client.newGroup();
    const currentServiceList = await this.getServiceList({
      sender: sendParams.sender.toString(),
      address: sendParams.sender.toString()
    });
    const serviceId = currentServiceList === 0n ? 1n : currentServiceList;

    // If contract needs to opt into the asset, add the opt-in call first
    if (needsOptIn) {
      const optInCost = await this.optInCost({ ...sendParams, asset });
      const optInPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(optInCost),
        receiver: this.client.appAddress.toString(),
      });
      
      group.optIn({
        ...sendParams,
        args: {
          payment: optInPayment,
          asset: BigInt(asset),
        }
      });
    }

    const { description: _description, ...serviceArgs } = rest;
    if (legacy) {
      group.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64({
        ...sendParams,
        args: { payment, asset, passes, gateId, ...serviceArgs, highlightColor }
      });
    } else {
      group.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64({
        ...sendParams,
        args: { payment, asset, passes, gateId, ...serviceArgs, highlightColor, wallet }
      });
    }

    // chunk description, max is: 3151
    if (rest.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(`Description length exceeds maximum of ${MAX_DESCRIPTION_LENGTH} characters`);
    }
    // setServiceDescription(offset: uint64, data: bytes): void
    // [selector:4][offset:8][data_length:2][data:N] = 2048, max data = 2034 bytes
    if (rest.description.length > MAX_DESCRIPTION_CHUNK_SIZE) {
      group.setServiceDescription({
        ...sendParams,
        args: {
          id: serviceId,
          offset: 0n,
          data: Buffer.from(rest.description).subarray(0, MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });

      group.setServiceDescription({
        ...sendParams,
        args: {
          id: serviceId,
          offset: BigInt(MAX_DESCRIPTION_CHUNK_SIZE),
          data: Buffer.from(rest.description).subarray(MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });
    } else {
      group.setServiceDescription({
        ...sendParams,
        args: {
          id: serviceId,
          offset: 0n,
          data: Buffer.from(rest.description)
        }
      });
    }

    group.activateService({
      ...sendParams,
      args: []
    })
    
    const result = await group.send({ ...sendParams })
    // If we added an opt-in call, the service ID will be at index 1, otherwise index 0
    const returnIndex = needsOptIn ? 1 : 0;
    return result.returns[returnIndex] as bigint;
  }

  async pauseService({ sender, signer, id }: MaybeSigner & ContractArgs['pauseService(uint64)void']): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    const group = this.client.newGroup();

    group.pauseService({
      ...sendParams,
      args: { id }
    });

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  async updateServiceTitle({ sender, signer, id, title }: MaybeSigner & { id: bigint | number; title: string }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    await this.client.send.updateServiceTitle({
      ...sendParams,
      args: { id, title }
    });
  }

  /** Change the highlight label and colour (`#rrggbb`) of one of the sender's services. */
  async updateServiceHighlight({ sender, signer, id, highlightMessage, highlightColor }: MaybeSigner & { id: bigint | number; highlightMessage: HighlightMessage | number; highlightColor: string }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    validateHexColor(highlightColor);

    await this.client.send.updateServiceHighlight({
      ...sendParams,
      args: { id, highlightMessage: Number(highlightMessage), highlightColor: hexColorToBytes(highlightColor) }
    });
  }

  /** The creator's featured (front and center) service id, or 0n when none is set. */
  async getFeaturedService({ sender, address }: { sender?: string } & { address: string }): Promise<bigint> {
    const sendParams = this.getReaderSendParams({ sender });
    return (await this.client.getFeaturedService({ ...sendParams, args: { address } }))
  }

  /**
   * What `setFeaturedService` costs: 0 once the creator has a featured box, otherwise its MBR
   * (plus the payer record when `payer` is not the creator).
   */
  async featuredServiceCost({ sender, creator, payer }: { sender?: string, creator: string, payer?: string }): Promise<bigint> {
    const current = await this.getFeaturedService({ sender, address: creator });
    if (current !== 0n) {
      return 0n;
    }
    return FEATURED_SERVICE_MBR + (payer !== undefined && payer !== creator ? PAYER_RECORD_MBR : 0n);
  }

  /** Pick which of the sender's services apps show front and center. */
  async setFeaturedService({ sender, signer, id }: MaybeSigner & { id: bigint | number }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const amount = await this.featuredServiceCost({ sender: sendParams.sender.toString(), creator: sendParams.sender.toString() });

    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(amount),
      receiver: this.client.appAddress.toString(),
    })

    await this.client.send.setFeaturedService({
      ...sendParams,
      args: { payment, id }
    });
  }

  /** Remove the sender's featured service; the storage goes back to whoever paid it. */
  async clearFeaturedService({ sender, signer }: MaybeSigner = {}): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    await this.client.send.clearFeaturedService({
      ...sendParams,
      args: [],
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
    });
  }

  async updateServiceDescription({ sender, signer, id, description }: MaybeSigner & { id: bigint | number; description: string }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(`Description length exceeds maximum of ${MAX_DESCRIPTION_LENGTH} characters`);
    }

    const group = this.client.newGroup();
    const descriptionBytes = Buffer.from(description);

    for (let offset = 0; offset < descriptionBytes.length || offset === 0; offset += MAX_DESCRIPTION_CHUNK_SIZE) {
      group.setServiceDescription({
        ...sendParams,
        args: {
          id,
          offset: BigInt(offset),
          data: descriptionBytes.subarray(offset, offset + MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });
    }

    await group.send({ ...sendParams });
  }

  async updateServiceMetadata({
    sender,
    signer,
    id,
    title,
    description
  }: MaybeSigner & { id: bigint | number; title?: string; description?: string }): Promise<void> {
    if (title !== undefined) {
      await this.updateServiceTitle({ sender, signer, id, title });
    }

    if (description !== undefined) {
      await this.updateServiceDescription({ sender, signer, id, description });
    }
  }

  async shutdownService({ sender, signer, id }: MaybeSigner & ContractArgs['shutdownService(uint64)void']): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    const group = this.client.newGroup();

    group.shutdownService({
      ...sendParams,
      args: { id }
    });

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  async block({ sender, signer, block }: MaybeSigner & { block: string }): Promise<void> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    const paymentAmount = await this.blockCost({ sender, signer });

    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
      receiver: this.client.appAddress.toString(),
    })

    const group = this.client.newGroup();

    group.block({
      ...sendParams,
      args: {
        payment,
        blocked: block
      }
    });

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  async unblock({ sender, signer, blocked }: MaybeSigner & ContractArgs['unblock(address)void']): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    const group = this.client.newGroup();

    group.unblock({
      ...sendParams,
      args: { blocked }
    });

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  async subscribe({
    sender,
    signer,
    asset = 0n,
    serviceId = 0n,
    initialDepositAmount = 0n,
    amount,
    interval,
    recipient,
    gateTxn,
    wallet = 0n,
    legacy = false,
  }: MaybeSigner & SubscribeArgs): Promise<bigint> {

    const sendParams = this.getRequiredSendParams({ sender, signer });
    assertDirectHint(wallet, legacy);

    const isAlgoSubscription = asset === 0n;
    const isGated = gateTxn !== undefined;

    // Check if we need to opt the contract into the asset (ASA subscriptions only)
    const needsOptIn = !(await this.isOptedInToAsset(asset));

    // Use contract method to get the exact subscription cost
    const subscribeCost = await this.newSubscriptionCost({
      ...sendParams,
      recipient,
      asset,
      serviceId,
      wallet,
      legacy,
    });

    // For algo subscriptions, payment includes the subscription amount
    // For ASA subscriptions, payment only covers MBR
    // If we need to opt in, add the opt-in cost to the payment
    const paymentAmount = isAlgoSubscription
      ? BigInt(amount) + subscribeCost + BigInt(initialDepositAmount)
      : subscribeCost

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
      receiver: this.client.appAddress.toString(), // Convert Address to string to avoid instanceof issues
    })

    const group = this.client.newGroup();

    // If contract needs to opt into the asset, add the opt-in call first
    if (needsOptIn) {
      const optInCost = await this.optInCost({ ...sendParams, asset });
      const optInPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(optInCost),
        receiver: this.client.appAddress.toString(),
      });
      
      group.optIn({
        ...sendParams,
        args: {
          payment: optInPayment,
          asset: BigInt(asset),
        }
      });
    }

    // the target asserts `Gate.mustCheckFor(principalOf(dao, wallet) as ctx, ...)` (hinted) or
    // `Gate.mustCheck(registry origin, ...)` (legacy, which needs a prebuilt txn)
    const gate = isGated ? await resolveGateTxn(gateTxn!, directGateCtx(sendParams.sender.toString())) : undefined;

    if (isAlgoSubscription) {
      const common = { payment, amount, interval: BigInt(interval), recipient, serviceId };
      if (isGated && legacy) {
        group.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate! } });
      } else if (isGated) {
        group.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate!, wallet } });
      } else if (legacy) {
        group.subscribePayAddressUint64Uint64Uint64Uint64({ ...sendParams, args: common });
      } else {
        group.subscribePayAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, wallet } });
      }
    } else {
      const assetTransfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount) + BigInt(initialDepositAmount),
        assetId: asset,
        receiver: this.client.appAddress.toString(),
      })

      const common = { payment, assetXfer: assetTransfer, amount, interval: BigInt(interval), recipient, serviceId };
      if (isGated && legacy) {
        group.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate! } });
      } else if (isGated) {
        group.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate!, wallet } });
      } else if (legacy) {
        group.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64({ ...sendParams, args: common });
      } else {
        group.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, wallet } });
      }
    }

    const result = await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    // The subscription ID is the return of the subscribe call: after the optional opt-in call
    // and, for gated subscriptions, after the (void) Gate.mustCheckFor / mustCheck call.
    const returnIndex = (needsOptIn ? 1 : 0) + (isGated ? 1 : 0);
    const subscriptionId = result.returns[returnIndex] as bigint | undefined;

    if (subscriptionId === undefined) {
      throw new Error('Subscription failed, no subscription ID returned');
    }

    return subscriptionId;
  }

  async unsubscribe({ sender, signer, id }: MaybeSigner & ContractArgs['unsubscribe(uint64)void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });
    
    const group = this.client.newGroup();

    group.unsubscribe({
      ...sendParams,
      args: { id: BigInt(id) }
    });

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  async deposit({ sender, signer, asset = 0n, amount, id }: MaybeSigner & { asset?: bigint | number, amount: bigint | number, id: bigint | number }): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const group = this.client.newGroup();

    if (asset !== 0n) {
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress.toString(),
      })

      group.depositAsa({
        ...sendParams,
        args: {
          assetXfer,
          id: BigInt(id)
        }
      });
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(amount),
        receiver: this.client.appAddress.toString(),
      })

      group.deposit({
        ...sendParams,
        args: {
          payment,
          id: BigInt(id)
        }
      });
    }

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  async withdraw({
    sender,
    signer,
    asset = 0n,
    amount,
    id
  }:
    MaybeSigner & {
      asset?: bigint | number,
      amount: bigint | number,
      id: bigint | number
    }): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    const group = this.client.newGroup();

    group.withdraw({
      ...sendParams,
      args: {
        amount: BigInt(amount),
        id: BigInt(id)
      }
    });

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  /**
   * Trigger the payment for subscription `{ address, id }`.
   *
   * For a gated service pass `gateTxn`. Eligibility is always re-checked for the SUBSCRIBER, never the
   * keeper. Hinted (default): `Gate.mustCheckFor(ctx, gateId, args)` with `ctx = triggerGateCtx(...)`;
   * pass a builder `(ctx) => gate.build.mustCheckFor({ ctx, gateId, args })` and the SDK fetches `ctx`.
   * `wallet` is the keeper's OWN hint (0n for a keeper acting as itself). `legacy`: the pre-hint selector,
   * whose `Gate.mustCheck` caller is the subscriber's registry origin.
   */
  async triggerPayment({ sender, signer, address, id, gateTxn, wallet = 0n, legacy = false }: MaybeSigner & { address: string, id: bigint, gateTxn?: SubscriptionGateTxn, wallet?: bigint, legacy?: boolean }): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });
    assertDirectHint(wallet, legacy);

    const group = this.client.newGroup();
    const key = { address, id };

    if (gateTxn !== undefined && legacy) {
      if (typeof gateTxn === 'function') {
        throw new Error('Subscriptions: a legacy gated trigger needs a prebuilt Gate.mustCheck txn');
      }
      group.gatedTriggerPaymentApplAddressUint64Void({
        ...sendParams,
        args: { gateTxn, key }
      });
    } else if (gateTxn !== undefined) {
      // a builder receives exactly the context the contract will assert for this sender and hint
      const gate = typeof gateTxn === 'function'
        ? await gateTxn(await this.triggerGateCtx({ sender: sendParams.sender?.toString(), address, id, wallet }))
        : gateTxn;
      group.gatedTriggerPaymentApplAddressUint64Uint64Void({
        ...sendParams,
        args: { gateTxn: gate, key, wallet }
      });
    } else {
      group.triggerPayment({
        ...sendParams,
        args: { key: { address, id } }
      });
    }

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  async setPasses({ sender, signer, id, passes }: MaybeSigner & { id: bigint | number, passes: string[] }): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    const group = this.client.newGroup();

    group.setPasses({
      ...sendParams,
      args: {
        id: BigInt(id),
        addresses: passes
      }
    });

    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }

  /**
   * Delete a pass box orphaned by a subscription cancelled before the pass-key fix. Anyone may
   * call it; the freed MBR stays in the contract.
   */
  async clearOrphanPasses({ sender, signer, address, id }: MaybeSigner & { address: string, id: bigint | number }): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.clearOrphanPasses({
      ...sendParams,
      args: { key: { address, id: BigInt(id) } },
      populateAppCallResources: true,
    });
  }
}
