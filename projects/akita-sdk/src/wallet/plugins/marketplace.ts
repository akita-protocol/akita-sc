type ReadableAddress = string | import('algosdk').Address;
import { ABIMethod } from "algosdk";
import { BaseSDK } from "../../base";
import { MarketplacePluginArgs, MarketplacePluginClient, MarketplacePluginFactory } from "../../generated/MarketplacePluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
import { getTxns } from "../utils";
import { resolveMaxCreatorRoyalty } from "../../marketplace/royalty";

type ContractArgs = MarketplacePluginArgs["obj"];

/**
 * `purchase` of every MarketplacePlugin deployed before audit MKT-02 added `maxPrice` (selector 0x269e4bb0).
 * The working-tree plugin routes `purchase(uint64,bool,uint64,address,uint64,byte[][])void` (0x703f18ca)
 * instead; its other five selectors are unchanged. Method-restricted grants and pinned keepers must list
 * the new selector after the Phase 3 swap (PHASE-0-SPEC §7.3).
 */
export const MARKETPLACE_PLUGIN_LEGACY_PURCHASE = ABIMethod.fromSignature('purchase(uint64,bool,uint64,address,byte[][])void');

/**
 * MarketplacePlugin app ids that route only the legacy (no `maxPrice`) `purchase`: every generation in
 * `networks.ts` so far. `MarketplacePluginSDK` builds the legacy call for these ids, so the current SDK
 * can still buy through the live plugin until Phase 3.
 */
export const MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS: ReadonlySet<bigint> = new Set([
  751968424n, // TestNet, December 2025
  763128885n, // TestNet, May 2026
  3368399474n, // MainNet, December 2025
  3569561455n, // MainNet, May 2026
]);

/**
 * `list` of every MarketplacePlugin deployed before the seller's royalty bound (`maxCreatorRoyalty`) was
 * added. The ids in `MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS` route this form and no other.
 */
export const MARKETPLACE_PLUGIN_LEGACY_LIST = ABIMethod.fromSignature('list(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64');

type ListArgs = (
  // `maxCreatorRoyalty`: the highest creator royalty the seller accepts (50_000 = 50%). Required when a
  // royalty `proof` is supplied: pass the royalty the seller was shown (see `resolveMaxCreatorRoyalty`).
  Omit<ContractArgs['list(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64'], 'wallet' | 'rekeyBack' | 'maxCreatorRoyalty'>
  & MaybeSigner
  & { rekeyBack?: boolean; maxCreatorRoyalty?: bigint | number }
);

type ListPrizeBoxArgs = (
  Omit<ContractArgs['listPrizeBox(uint64,bool,uint64,uint64,uint64,uint64,address,uint64,address)uint64'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type PurchaseArgs = (
  // `maxPrice`: the most the wallet will pay; the plugin reverts (errPamx) if the listing price is higher.
  // Pass the price the user was shown, never a freshly read on-chain value.
  Omit<ContractArgs['purchase(uint64,bool,uint64,address,uint64,byte[][])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type ChangePriceArgs = (
  Omit<ContractArgs['changePrice(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type DelistArgs = (
  Omit<ContractArgs['delist(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

export class MarketplacePluginSDK extends BaseSDK<MarketplacePluginClient> {

  /**
   * Force the `purchase` ABI: `true` = legacy (no `maxPrice`), `false` = current. Unset = legacy only for
   * the ids in `MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS` (e.g. set it for a deployed program reinstalled
   * under a new id on LocalNet).
   */
  legacyPurchaseAbi?: boolean;

  constructor({ legacyPurchaseAbi, ...params }: NewContractSDKParams & { legacyPurchaseAbi?: boolean }) {
    super({ factory: MarketplacePluginFactory, ...params });
    this.legacyPurchaseAbi = legacyPurchaseAbi;
  }

  /** Whether this plugin app routes only the legacy `purchase(uint64,bool,uint64,address,byte[][])void`. */
  usesLegacyPurchaseAbi(): boolean {
    return this.legacyPurchaseAbi ?? MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS.has(BigInt(this.client.appId));
  }

  private listSelector(): Uint8Array {
    return this.usesLegacyPurchaseAbi()
      ? MARKETPLACE_PLUGIN_LEGACY_LIST.getSelector()
      : this.client.appClient.getABIMethod('list').getSelector();
  }

  private purchaseSelector(): Uint8Array {
    return this.usesLegacyPurchaseAbi()
      ? MARKETPLACE_PLUGIN_LEGACY_PURCHASE.getSelector()
      : this.client.appClient.getABIMethod('purchase').getSelector();
  }

  /**
   * The legacy plugin has no on-chain price bound, so refuse here when the listing already costs more
   * than `maxPrice`. This is a read before signing, not an atomic check. Rev-3 listings add the on-chain
   * price-change cooldown (errPrcd), which covers the few rounds between this read and the purchase.
   */
  private async assertLegacyPriceWithin(listingAppId: bigint, maxPrice: bigint): Promise<void> {
    const state = await this.algorand.app.getGlobalState(listingAppId);
    const price = state.price?.value;
    if (typeof price !== 'bigint') {
      throw new Error(`Listing ${listingAppId} has no price`);
    }
    if (price > maxPrice) {
      throw new Error(`errPamx: listing ${listingAppId} price ${price} is above maxPrice ${maxPrice} (checked by the SDK: this plugin version has no maxPrice)`);
    }
  }

  list(): PluginSDKReturn;
  list(args: ListArgs): PluginSDKReturn;
  list(args?: ListArgs): PluginSDKReturn {
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.listSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.listSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        if (this.usesLegacyPurchaseAbi()) {
          // deployed plugin ABI: no maxCreatorRoyalty argument, so the royalty is not bounded on chain
          return [{
            type: 'methodCall',
            ...sendParams,
            appId: this.client.appId,
            method: MARKETPLACE_PLUGIN_LEGACY_LIST,
            args: [
              wallet, rekeyBack, args.asset, args.assetAmount, args.price, args.paymentAsset, args.expiration,
              args.reservedFor, args.gateId, args.marketplace, args.name, args.proof,
            ],
          }];
        }

        const params = await this.client.params.list({
          ...sendParams,
          args: { wallet, rekeyBack, ...args, maxCreatorRoyalty: resolveMaxCreatorRoyalty(args.maxCreatorRoyalty, args.proof as Uint8Array[]) },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  listPrizeBox(): PluginSDKReturn;
  listPrizeBox(args: ListPrizeBoxArgs): PluginSDKReturn;
  listPrizeBox(args?: ListPrizeBoxArgs): PluginSDKReturn {
    const methodName = 'listPrizeBox';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.listPrizeBox({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  purchase(): PluginSDKReturn;
  purchase(args: PurchaseArgs): PluginSDKReturn;
  purchase(args?: PurchaseArgs): PluginSDKReturn {
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.purchaseSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.purchaseSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        if (this.usesLegacyPurchaseAbi()) {
          // deployed plugin ABI: no maxPrice argument (MKT-02 shipped after it)
          await this.assertLegacyPriceWithin(BigInt(args.appId), BigInt(args.maxPrice));
          return [{
            type: 'methodCall',
            ...sendParams,
            appId: this.client.appId,
            method: MARKETPLACE_PLUGIN_LEGACY_PURCHASE,
            args: [wallet, rekeyBack, args.appId, args.marketplace, args.args],
          }];
        }

        const params = await this.client.params.purchase({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  changePrice(): PluginSDKReturn;
  changePrice(args: ChangePriceArgs): PluginSDKReturn;
  changePrice(args?: ChangePriceArgs): PluginSDKReturn {
    const methodName = 'changePrice';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.changePrice({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  delist(): PluginSDKReturn;
  delist(args: DelistArgs): PluginSDKReturn;
  delist(args?: DelistArgs): PluginSDKReturn {
    const methodName = 'delist';
    if (args === undefined) {
      return (spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.delist({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }
}
