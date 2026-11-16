import { BaseSDK } from "../base";
import { ServicesKey, SubscriptionInfo, SubscriptionsArgs, SubscriptionsClient } from '../generated/SubscriptionsClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { ValueMap } from "../wallet/utils";
import { NewServiceArgs, PaidUpCheckOptions, Service, SubscribeArgs, SubscriptionGateCtx, SubscriptionGateTxn, SubscriptionInfoWithDetails, SubscriptionStatus } from "./types";
import { HighlightMessage } from "./constants";
export { ServicesKey } from '../generated/SubscriptionsClient';
type ContractArgs = SubscriptionsArgs["obj"];
export * from './constants';
export * from './errors';
export * from './types';
export * from './utils';
/**
 * The gate context a top-level (direct) caller acting as itself presents: `(sender, 0, sender)`. This is
 * what `principalOf(dao, 0)` resolves to on chain. A non-zero hint is never valid at top level (`errHtop`).
 */
export declare const directGateCtx: (sender: string) => SubscriptionGateCtx;
export declare class SubscriptionsSDK extends BaseSDK<SubscriptionsClient> {
    private serviceMapKeyGenerator;
    services: ValueMap<ServicesKey, Service>;
    constructor(params: NewContractSDKParams);
    /**
     * Get the cost to create a new service from the contract (the hinted `newServiceCost(asset, wallet)`;
     * `legacy` quotes the pre-hint selector, which uses the registry referrer).
     */
    newServiceCost({ sender, signer, asset, wallet, legacy }?: MaybeSigner & {
        asset?: bigint | number;
        wallet?: bigint;
        legacy?: boolean;
    }): Promise<bigint>;
    blockCost({ sender, signer }?: MaybeSigner): Promise<bigint>;
    /**
     * Get the cost to create a new subscription from the contract (box MBR + referral MBR, plus
     * `SUBSCRIPTION_PRINCIPAL_MBR` when `wallet != 0` and the service is gated). `legacy` quotes the
     * pre-hint selector (registry referrer, no stored principal).
     */
    newSubscriptionCost({ sender, signer, recipient, asset, serviceId, wallet, legacy }: MaybeSigner & {
        recipient: string;
        asset?: bigint | number;
        serviceId?: bigint | number;
        wallet?: bigint;
        legacy?: boolean;
    }): Promise<bigint>;
    /**
     * The `GateCtx` a hinted `gatedTriggerPayment(gateTxn, key, wallet)` sent by `sender` will assert
     * (readonly; the contract runs the same code). `wallet` is the CALLER's own hint, never the subscriber's.
     */
    triggerGateCtx({ sender, address, id, wallet }: {
        sender?: string;
        address: string;
        id: bigint | number;
        wallet?: bigint;
    }): Promise<SubscriptionGateCtx>;
    /**
     * The stored principal pair `(wallet, principal)` of a gated subscription, or undefined if it has none
     * (a legacy subscription, a plain subscriber, or an ungated service).
     */
    getStoredPrincipal({ address, id }: {
        address: string;
        id: bigint | number;
    }): Promise<{
        wallet: bigint;
        principal: string;
    } | undefined>;
    /**
     * Backfill (Q13) the stored principal of a legacy gated subscription from the escrow-factory registry.
     * Permissionless; the caller pays `SUBSCRIPTION_PRINCIPAL_MBR` (refunded to the subscriber on unsubscribe).
     */
    adoptPrincipal({ sender, signer, address, id }: MaybeSigner & {
        address: string;
        id: bigint | number;
    }): Promise<void>;
    /**
     * Get the cost to opt the contract into an asset
     */
    optInCost({ sender, signer, asset }: MaybeSigner & {
        asset: bigint | number;
    }): Promise<bigint>;
    /**
     * Opt the Subscriptions contract (and its rev_subscriptions escrow) into an
     * asset. Must be called directly by an EOA — NOT via `SubscriptionsPlugin.optIn`
     * — because `Subscriptions.optIn` rekeys to the revenue-manager plugin
     * internally and plugin rekeys cannot be nested.
     *
     * @param asset The asset ID to opt into
     */
    optIn({ sender, signer, asset, }: MaybeSigner & {
        asset: bigint | number;
    }): Promise<void>;
    /**
     * Check if the contract is opted into a specific asset
     */
    isOptedInToAsset(asset: bigint | number): Promise<boolean>;
    isBlocked({ sender, signer, address, blocked }: MaybeSigner & {
        address: string;
        blocked: string;
    }): Promise<boolean>;
    isShutdown({ sender, signer, address, id }: MaybeSigner & {
        address: string;
        id: bigint | number;
    }): Promise<boolean>;
    getServices(): Promise<ValueMap<ServicesKey, Service>>;
    getService({ sender, address, id }: {
        sender?: string;
    } & {
        address: string;
        id: number;
    }): Promise<Service>;
    getServicesByAddress({ sender, address, start, windowSize }: {
        sender?: string;
    } & {
        address: string;
        start?: bigint | number;
        windowSize?: bigint | number;
    }): Promise<Service[]>;
    getSubscription({ sender, address, id }: {
        sender?: string;
    } & {
        address: string;
        id: bigint;
    }): Promise<SubscriptionInfo>;
    getSubscriptionWithDetails({ sender, address, id }: {
        sender?: string;
    } & {
        address: string;
        id: bigint;
    }): Promise<SubscriptionInfoWithDetails>;
    /**
     * Compute paid-up status and current payment window for a subscription.
     *
     * Defaults align with SDK-returned data:
     * - startDate: seconds (on-chain)
     * - interval: seconds (on-chain)
     * - lastPayment: milliseconds (SDK converts it)
     * - now: milliseconds (Date.now())
     */
    getSubscriptionStatus(subscription: SubscriptionInfo, options?: PaidUpCheckOptions): SubscriptionStatus;
    /**
     * Convenience wrapper for paid-up boolean.
     */
    isSubscriptionPaidUp(subscription: SubscriptionInfo, options?: PaidUpCheckOptions): boolean;
    isFirstSubscription({ sender, address }: {
        sender?: string;
    } & {
        address: string;
    }): Promise<boolean>;
    getSubscriptionList({ sender, address }: {
        sender?: string;
    } & {
        address: string;
    }): Promise<bigint>;
    getServiceList({ sender, address }: {
        sender?: string;
    } & {
        address: string;
    }): Promise<bigint>;
    newService({ sender, signer, asset, passes, gateId, wallet, legacy, ...rest }: NewServiceArgs): Promise<bigint>;
    pauseService({ sender, signer, id }: MaybeSigner & ContractArgs['pauseService(uint64)void']): Promise<void>;
    updateServiceTitle({ sender, signer, id, title }: MaybeSigner & {
        id: bigint | number;
        title: string;
    }): Promise<void>;
    /** Change the highlight label and colour (`#rrggbb`) of one of the sender's services. */
    updateServiceHighlight({ sender, signer, id, highlightMessage, highlightColor }: MaybeSigner & {
        id: bigint | number;
        highlightMessage: HighlightMessage | number;
        highlightColor: string;
    }): Promise<void>;
    /** The creator's featured (front and center) service id, or 0n when none is set. */
    getFeaturedService({ sender, address }: {
        sender?: string;
    } & {
        address: string;
    }): Promise<bigint>;
    /**
     * What `setFeaturedService` costs: 0 once the creator has a featured box, otherwise its MBR
     * (plus the payer record when `payer` is not the creator).
     */
    featuredServiceCost({ sender, creator, payer }: {
        sender?: string;
        creator: string;
        payer?: string;
    }): Promise<bigint>;
    /** Pick which of the sender's services apps show front and center. */
    setFeaturedService({ sender, signer, id }: MaybeSigner & {
        id: bigint | number;
    }): Promise<void>;
    /** Remove the sender's featured service; the storage goes back to whoever paid it. */
    clearFeaturedService({ sender, signer }?: MaybeSigner): Promise<void>;
    updateServiceDescription({ sender, signer, id, description }: MaybeSigner & {
        id: bigint | number;
        description: string;
    }): Promise<void>;
    updateServiceMetadata({ sender, signer, id, title, description }: MaybeSigner & {
        id: bigint | number;
        title?: string;
        description?: string;
    }): Promise<void>;
    shutdownService({ sender, signer, id }: MaybeSigner & ContractArgs['shutdownService(uint64)void']): Promise<void>;
    block({ sender, signer, block }: MaybeSigner & {
        block: string;
    }): Promise<void>;
    unblock({ sender, signer, blocked }: MaybeSigner & ContractArgs['unblock(address)void']): Promise<void>;
    subscribe({ sender, signer, asset, serviceId, initialDepositAmount, amount, interval, recipient, gateTxn, wallet, legacy, }: MaybeSigner & SubscribeArgs): Promise<bigint>;
    unsubscribe({ sender, signer, id }: MaybeSigner & ContractArgs['unsubscribe(uint64)void']): Promise<void>;
    deposit({ sender, signer, asset, amount, id }: MaybeSigner & {
        asset?: bigint | number;
        amount: bigint | number;
        id: bigint | number;
    }): Promise<void>;
    withdraw({ sender, signer, asset, amount, id }: MaybeSigner & {
        asset?: bigint | number;
        amount: bigint | number;
        id: bigint | number;
    }): Promise<void>;
    /**
     * Trigger the payment for subscription `{ address, id }`.
     *
     * For a gated service pass `gateTxn`. Eligibility is always re-checked for the SUBSCRIBER, never the
     * keeper. Hinted (default): `Gate.mustCheckFor(ctx, gateId, args)` with `ctx = triggerGateCtx(...)`;
     * pass a builder `(ctx) => gate.build.mustCheckFor({ ctx, gateId, args })` and the SDK fetches `ctx`.
     * `wallet` is the keeper's OWN hint (0n for a keeper acting as itself). `legacy`: the pre-hint selector,
     * whose `Gate.mustCheck` caller is the subscriber's registry origin.
     */
    triggerPayment({ sender, signer, address, id, gateTxn, wallet, legacy }: MaybeSigner & {
        address: string;
        id: bigint;
        gateTxn?: SubscriptionGateTxn;
        wallet?: bigint;
        legacy?: boolean;
    }): Promise<void>;
    setPasses({ sender, signer, id, passes }: MaybeSigner & {
        id: bigint | number;
        passes: string[];
    }): Promise<void>;
    /**
     * Delete a pass box orphaned by a subscription cancelled before the pass-key fix. Anyone may
     * call it; the freed MBR stays in the contract.
     */
    clearOrphanPasses({ sender, signer, address, id }: MaybeSigner & {
        address: string;
        id: bigint | number;
    }): Promise<void>;
}
