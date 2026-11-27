import { microAlgo } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import {
  MarketplaceClient,
  MarketplaceFactory,
  MarketplaceArgs,
} from '../generated/MarketplaceClient';
import { MaybeSigner, NewContractSDKParams } from "../types";
import { ListingSDK } from "./listing";
import {
  ListParams,
  PurchaseParams,
  DelistParams,
  OptInParams,
} from "./types";
import { PrizeBoxFactorySDK } from "../prize-box";
import { MIN_DISBURSEMENTS_MBR, USER_ALLOCATION_MBR } from "../rewards";
import type { GateCtx } from "../principal";
import type { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';

import { resolveMaxCreatorRoyalty } from "./royalty";

export * from "./errors";
export * from "./listing";
export * from "./royalty";
export * from "./types";

export type MarketplaceContractArgs = MarketplaceArgs["obj"];

type MarketplaceOptInPlan = {
  asset: bigint;
  cost: bigint;
  /** the asset being sold: the factory alone opts in (`optInPrize`), with no revenue escrow involved */
  prize: boolean;
};

const ASSET_OPT_IN_MIN_BALANCE = 100_000n;

/**
 * Full ARC-4 signatures of the Marketplace methods that exist twice during the principal-resolution
 * compatibility window (PHASE-0-SPEC §7.2, P2-ABI-01). The hinted method (trailing `wallet: uint64`)
 * keeps the canonical name; the legacy shim keeps the deployed selector. The generated client exposes
 * each overload under a suffixed name (no shared `client.send.list`); this SDK always sends the hinted one,
 * except `purchase` with a legacy `Gate.mustCheck` gate txn.
 */
export const MARKETPLACE_HINTED_METHODS = {
  list: 'list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64,uint64)uint64',
  listPrizeBox: 'listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address,uint64)uint64',
  gatedPurchase: 'gatedPurchase(pay,appl,uint64,address,uint64)void',
  gatedPurchaseAsa: 'gatedPurchaseAsa(axfer,appl,uint64,address,uint64)void',
} as const;

/** Deployed (pre-principal-resolution) selectors, served by the legacy shims until Phase 4. */
export const MARKETPLACE_LEGACY_METHODS = {
  list: 'list(pay,axfer,uint64,uint64,uint64,address,uint64,address,string,byte[32][])uint64',
  listPrizeBox: 'listPrizeBox(appl,pay,uint64,uint64,uint64,address,uint64,address)uint64',
  gatedPurchase: 'gatedPurchase(pay,appl,uint64,address)void',
  gatedPurchaseAsa: 'gatedPurchaseAsa(axfer,appl,uint64,address)void',
} as const;

/**
 * Creator MBR of a rev-3 Listing child: 2 program pages + 13 global uints + 7 global byte slices
 * = 200_000 + 13 * 28_500 + 7 * 50_000. Mirrors the on-chain `listCost`; prefer `quoteListCost()`.
 * (`seller_referrer` +50,000 and `factory_float` +28,500 over the rev-2 842,000.)
 */
export const LISTING_CREATE_MBR = 920_500n;

/**
 * Creator MBR the deployed MarketplacePlugin (MainNet 3569561455) and pre-audit SDKs bake into their
 * listing payment (pre-audit Listing: 2 pages, 9 uints, 6 bytes). The legacy `list`/`listPrizeBox`
 * shims still accept it for ALGO-priced listings; the hinted methods never do. The factory floats
 * `LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR` (164,000) plus the v2 disbursement MBR increase
 * (12,800) per quoted disbursement per open legacy-paid listing (189,600 for an ASA listing, 176,800
 * for a prize box), records it on the child (`factoryFloat`) and takes it back at settlement or delist before refunding the seller.
 */
export const LEGACY_LISTING_CREATE_MBR = 756_500n;

/**
 * The gate context a DIRECT (top-level, wallet hint 0) buyer must pin in `Gate.mustCheckFor`:
 * the hinted `gatedPurchase` resolves `(principal, wallet, spender) = (sender, 0, sender)`.
 */
export function directGateCtx(sender: string | algosdk.Address): GateCtx {
  const account = sender.toString();
  return { principal: account, wallet: 0n, spender: account };
}

/** A `Gate.mustCheck(caller, ...)` txn (legacy subject) rather than `Gate.mustCheckFor(ctx, ...)`. */
export function isLegacyGateTxn(gateTxn: AppCallMethodCall): boolean {
  return gateTxn.method.name === 'mustCheck';
}

/**
 * Grouped funding transactions are otherwise byte-identical when the same account lists or
 * buys twice within one validity window (same amount, same suggested params), which makes the
 * second group fail with "transaction already in ledger". A unique note keeps them distinct.
 */
let noteCounter = 0;
function uniqueNote(tag: string): string {
  noteCounter += 1;
  return `akita-marketplace:${tag}:${Date.now()}:${noteCounter}`;
}

function getHttpStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) return undefined;

  if ('status' in error && typeof error.status === 'number') {
    return error.status;
  }

  if ('response' in error) {
    const { response } = error;
    if (typeof response === 'object' && response !== null && 'status' in response && typeof response.status === 'number') {
      return response.status;
    }
  }

  return undefined;
}

/**
 * SDK for interacting with the Marketplace contract.
 * Use this to create listings, purchase items, and delist items.
 */
export class MarketplaceSDK extends BaseSDK<MarketplaceClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: MarketplaceFactory, ...params }, ENV_VAR_NAMES.MARKETPLACE_APP_ID);
  }

  // ========== Factory/Listing Methods ==========

  /**
   * Creates a new listing and returns a ListingSDK instance.
   * Can list either an ASA or a PrizeBox based on the `isPrizeBox` flag.
   * @returns ListingSDK for the newly created listing
   */
  async list({
    sender,
    signer,
    isPrizeBox = false,
    price,
    paymentAsset,
    expiration,
    reservedFor,
    gateId,
    marketplace,
    wallet = 0n,
    ...rest
  }: ListParams): Promise<ListingSDK> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    // Get the cost for creating a new listing, dynamically querying rewards opt-in state
    const isAlgoPayment = BigInt(paymentAsset) === 0n;
    const paymentAssetId = BigInt(paymentAsset);
    const prizeId = isPrizeBox ? 0n : BigInt((rest as { asset: bigint | number }).asset);
    const [prizeRewardsOptInCost, paymentRewardsOptInCost, listingOptIns] = await Promise.all([
      this.getRewardsOptInCost(prizeId),
      this.getRewardsOptInCost(paymentAssetId),
      this.getListingOptInPlan({ prizeAsset: prizeId, paymentAsset: paymentAssetId }),
    ]);
    const cost = this.listCost({
      isPrizeBox,
      isAlgoPayment,
      prizeRewardsOptInCost,
      paymentRewardsOptInCost,
      escrowOptInCost: listingOptIns.paymentEscrowOptInCost,
    });

    const payment = await this.client.algorand.createTransaction.payment({
      note: uniqueNote('payment'),
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    let appId: bigint | undefined;
    const needsComposer = listingOptIns.assetsToOptIn.length > 0 || listingOptIns.paymentEscrowOptInCost > 0n;
    const group = needsComposer ? this.client.newGroup() : undefined;

    if (group) {
      for (const { asset, cost: optInCost, prize } of listingOptIns.assetsToOptIn) {
        const optInPayment = await this.client.algorand.createTransaction.payment({
      note: uniqueNote('payment'),
          ...sendParams,
          amount: microAlgo(optInCost),
          receiver: this.client.appAddress,
        });

        if (prize) {
          group.optInPrize({
            ...sendParams,
            args: { payment: optInPayment, asset },
            maxFee: microAlgo(257_000),
          });
        } else {
          group.optIn({
            ...sendParams,
            args: { payment: optInPayment, asset },
            maxFee: microAlgo(257_000),
          });
        }
      }
    }

    if (isPrizeBox) {
      const { prizeBoxId } = rest as Extract<ListParams, { isPrizeBox: true }>;

      const prizeBoxSDK = new PrizeBoxFactorySDK({ algorand: this.algorand, factoryParams: {}}).get({ appId: BigInt(prizeBoxId) })
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];

      const args = {
        prizeBoxTransferTxn,
        payment,
        price,
        paymentAsset,
        expiration,
        reservedFor,
        gateId,
        marketplace,
        wallet,
      };

      if (group) {
        group.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64({
          ...sendParams,
          args,
          maxFee: microAlgo(2_000_000),
        });
      } else {
        ({ return: appId } = await this.client.send.listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64Uint64({
          ...sendParams,
          args,
        }));
      }
    } else {
      const { asset, amount, name, proof, maxCreatorRoyalty } = rest as Exclude<ListParams, { isPrizeBox: true }>;

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
      note: uniqueNote('assetTransfer'),
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress,
      });

      const args = {
        payment,
        assetXfer,
        price,
        paymentAsset,
        expiration,
        reservedFor,
        gateId,
        marketplace,
        name,
        proof,
        wallet,
        maxCreatorRoyalty: resolveMaxCreatorRoyalty(maxCreatorRoyalty, proof),
      };

      if (group) {
        group.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64Uint64({
          ...sendParams,
          args,
          maxFee: microAlgo(2_000_000),
        });
      } else {
        ({ return: appId } = await this.client.send.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64Uint64({
          ...sendParams,
          args,
        }));
      }
    }

    if (group) {
      const result = await group.send({
        ...sendParams,
        coverAppCallInnerTransactionFees: true,
        populateAppCallResources: true,
      });
      appId = result.returns[result.returns.length - 1] as bigint | undefined;
    }

    if (appId === undefined) {
      throw new Error('Failed to create new listing');
    }

    return new ListingSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer,
      },
    });
  }

  /**
   * Gets a ListingSDK instance for an existing listing.
   * @param appId - The app ID of the listing
   * @returns ListingSDK for the specified listing
   */
  getListing({ appId }: { appId: bigint }): ListingSDK {
    return new ListingSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer,
      },
    });
  }

  /**
   * Checks if the rewards app is already opted into the given asset.
   * Returns 0n if opted in (no cost needed), 100_000n if not.
   */
  private async getRewardsOptInCost(assetId: bigint | number): Promise<bigint> {
    const asset = BigInt(assetId);
    if (asset === 0n) return 0n;

    try {
      const akitaDaoAppId = await this.client.state.global.akitaDao();
      if (!akitaDaoAppId) return 100_000n;

      const algod = this.algorand.client.algod;
      const daoApp = await algod.getApplicationByID(akitaDaoAppId).do();
      const globalState = daoApp.params?.globalState;
      if (!globalState) return 100_000n;

      // Find the 'aal' (akitaAppList) key in AkitaDAO global state
      const aalKey = new TextEncoder().encode('aal');
      const aalEntry = globalState.find(
        (kv: { key: Uint8Array; value: { type: number; bytes: Uint8Array } }) =>
          kv.key.length === aalKey.length && kv.key.every((b: number, i: number) => b === aalKey[i])
      );
      if (!aalEntry || aalEntry.value.type !== 1) return 100_000n;

      // Extract rewards app ID (2nd uint64 in ABI-encoded AkitaAppList, bytes 8-15)
      const aalBytes = aalEntry.value.bytes;
      if (aalBytes.length < 16) return 100_000n;
      const view = new DataView(aalBytes.buffer, aalBytes.byteOffset, aalBytes.byteLength);
      const rewardsAppId = view.getBigUint64(8);
      if (rewardsAppId === 0n) return 100_000n;

      // Check if rewards app address is already opted into the asset
      const rewardsAddress = algosdk.getApplicationAddress(rewardsAppId).toString();
      const response = await algod.accountAssetInformation(rewardsAddress, asset).do();
      return response.assetHolding ? 0n : 100_000n;
    } catch {
      // If any lookup fails (e.g. 404 not opted in), assume cost is needed
      return 100_000n;
    }
  }

  /**
   * Builds the atomic opt-in plan needed before a listing can be created.
   *
   * The listed ASA must be receivable by the marketplace before the `assetXfer`
   * transaction runs: that takes the factory's own opt-in only (`optInPrize`), because a prize never
   * earns protocol fees. For ASA-denominated listings, the payment asset also needs
   * marketplace/escrow preparation so a future purchase can settle cleanly.
   */
  private async getListingOptInPlan({ prizeAsset, paymentAsset }: { prizeAsset: bigint, paymentAsset: bigint }): Promise<{ assetsToOptIn: MarketplaceOptInPlan[], paymentEscrowOptInCost: bigint }> {
    const assets = new Set<bigint>();
    if (prizeAsset !== 0n) assets.add(prizeAsset);
    if (paymentAsset !== 0n) assets.add(paymentAsset);

    const assetsToOptIn: MarketplaceOptInPlan[] = [];
    let paymentEscrowOptInCost = 0n;

    for (const asset of assets) {
      if (asset !== paymentAsset) {
        if (!(await this.isMarketplaceOptedInToAsset(asset))) {
          assetsToOptIn.push({ asset, cost: ASSET_OPT_IN_MIN_BALANCE, prize: true });
        }
        continue;
      }

      const [isMarketplaceOptedIn, optInCost] = await Promise.all([
        this.isMarketplaceOptedInToAsset(asset),
        this.client.optInCost({ args: { asset } }),
      ]);

      if (!isMarketplaceOptedIn) {
        assetsToOptIn.push({ asset, cost: optInCost, prize: false });
        continue;
      }

      if (asset === paymentAsset && optInCost > ASSET_OPT_IN_MIN_BALANCE) {
        paymentEscrowOptInCost = optInCost - ASSET_OPT_IN_MIN_BALANCE;
      }
    }

    return { assetsToOptIn, paymentEscrowOptInCost };
  }

  private async isMarketplaceOptedInToAsset(assetId: bigint | number): Promise<boolean> {
    const asset = BigInt(assetId);
    if (asset === 0n) return true;

    try {
      const response = await this.algorand.client.algod.accountAssetInformation(this.client.appAddress.toString(), asset).do();
      return !!response.assetHolding;
    } catch (error) {
      if (getHttpStatus(error) === 404) return false;
      throw error;
    }
  }

  /**
   * Gets the cost to create a new listing.
   * @param isPrizeBox - Whether the prize is a PrizeBox
   * @param isAlgoPayment - Whether the listing will accept ALGO as payment
   * @param prizeRewardsOptInCost - Rewards app opt-in cost for the prize asset (default: 100,000, pass 0 if already opted in)
   * @param paymentRewardsOptInCost - Rewards app opt-in cost for the payment asset (default: 100,000, pass 0 if already opted in)
   */
  listCost({ isPrizeBox = false, isAlgoPayment = true, prizeRewardsOptInCost = 100_000n, paymentRewardsOptInCost = 100_000n, escrowOptInCost = 0n }: { isPrizeBox?: boolean, isAlgoPayment?: boolean, prizeRewardsOptInCost?: bigint, paymentRewardsOptInCost?: bigint, escrowOptInCost?: bigint } = {}): bigint {
    // Base cost: MIN_PROGRAM_PAGES * (1 + extraProgramPages) + (GLOBAL_STATE_KEY_UINT_COST * globalUints) + (GLOBAL_STATE_KEY_BYTES_COST * globalBytes)
    // Listing arc56 schema (rev 3): 13 global uints, 7 global bytes, extraProgramPages = 1 (2 total pages)
    //   Listing globals: prize, isPrizeBox, price, paymentAsset, expiration, creatorRoyalty, gateID, marketplaceRoyalties,
    //     prizeAmount, lastPriceRound, rev, factoryFloat (12 uints)
    //     + seller, reservedFor, marketplace, akitaDAOEscrow, sellerReferrer (5 bytes)
    //   + AkitaBaseContract: akitaDAO (1 uint), version (1 bytes)
    //   + ChildContract: funder (1 bytes)
    //   => 13 uints, 7 bytes
    // = (100_000 * 2) + (28_500 * 13) + (50_000 * 7) = 200_000 + 370_500 + 350_000 = 920_500 (LISTING_CREATE_MBR)
    // Prefer `quoteListCost()` (on-chain `listCost`), which is exact by construction.
    const baseCost = LISTING_CREATE_MBR;
    const minBalance = 100_000n;
    const assetOptInMinBalance = 100_000n;
    const perDisbursement = MIN_DISBURSEMENTS_MBR + USER_ALLOCATION_MBR;

    // Asset opt-in MBR for the child contract
    const optinMbr = isPrizeBox
      ? (isAlgoPayment ? 0n : assetOptInMinBalance)
      : (isAlgoPayment ? assetOptInMinBalance : assetOptInMinBalance * 2n);

    // Disbursement MBR
    let disbursementMbr = 0n;
    if (!isPrizeBox) {
      // 1 prize + 1 referral + (4 ASA payments if ASA)
      disbursementMbr += perDisbursement + prizeRewardsOptInCost; // prize
      if (isAlgoPayment) {
        disbursementMbr += perDisbursement; // referral (ALGO)
      } else {
        disbursementMbr += perDisbursement * 5n + paymentRewardsOptInCost; // referral + 4 ASA payments
      }
    } else {
      // 1 referral + (3 ASA payments if ASA)
      if (isAlgoPayment) {
        disbursementMbr = perDisbursement; // referral (ALGO)
      } else {
        disbursementMbr = perDisbursement * 4n + paymentRewardsOptInCost; // referral + 3 ASA payments
      }
    }

    // Escrow opt-in cost for ASA payments (factory opts escrow into payment asset)
    const escrowCost = isAlgoPayment ? 0n : escrowOptInCost;

    return baseCost + minBalance + optinMbr + disbursementMbr + escrowCost;
  }

  /**
   * Exact listing payment from the factory's readonly `listCost(prize, paymentAsset, isPrizeBox)`, as
   * the chain computes it right now (includes the rewards and DAO-escrow opt-in terms). Pass `prize = 0`
   * for a prize box. Quote after any factory opt-ins the listing group adds, or use `listCost` offline.
   */
  async quoteListCost({ prize = 0n, paymentAsset = 0n, isPrizeBox = false }: { prize?: bigint | number, paymentAsset?: bigint | number, isPrizeBox?: boolean } = {}): Promise<bigint> {
    return await this.client.listCost({ args: { prize, paymentAsset, isPrizeBox } });
  }

  // ========== Purchase Methods ==========

  /**
   * Purchases a listing.
   * Use `isAsa: true` with `paymentAsset` and `paymentAmount` for ASA payments, otherwise ALGO is used.
   * Provide `gateTxn` for gated listings.
   */
  async purchase({
    sender,
    signer,
    listingAppId,
    marketplace,
    isAsa = false,
    gateTxn,
    wallet = 0n,
    ...rest
  }: PurchaseParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const group = this.client.newGroup();
    // a legacy `Gate.mustCheck(caller, ...)` gate txn can only satisfy the legacy shim
    const legacyGate = gateTxn !== undefined && isLegacyGateTxn(gateTxn);

    if (isAsa) {
      const { paymentAsset, paymentAmount } = rest as Extract<PurchaseParams, { isAsa: true }>;

      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
      note: uniqueNote('assetTransfer'),
        ...sendParams,
        amount: BigInt(paymentAmount),
        assetId: BigInt(paymentAsset),
        receiver: this.client.appAddress,
      });

      if (gateTxn && legacyGate) {
        group.gatedPurchaseAsaAxferApplUint64AddressVoid({
          ...sendParams,
          args: {
            assetXfer,
            gateTxn,
            appId: listingAppId,
            marketplace,
          },
        });
      } else if (gateTxn) {
        group.gatedPurchaseAsaAxferApplUint64AddressUint64Void({
          ...sendParams,
          args: {
            assetXfer,
            gateTxn,
            appId: listingAppId,
            marketplace,
            wallet,
          },
        });
      } else {
        group.purchaseAsa({
          ...sendParams,
          args: {
            assetXfer,
            appId: listingAppId,
            marketplace,
          },
        });
      }
    } else {
      // Get listing to determine price for ALGO purchases
      const listing = this.getListing({ appId: BigInt(listingAppId) });
      const listingState = await listing.state();

      const payment = await this.client.algorand.createTransaction.payment({
      note: uniqueNote('payment'),
        ...sendParams,
        amount: microAlgo(listingState.price),
        receiver: this.client.appAddress,
      });

      if (gateTxn && legacyGate) {
        group.gatedPurchasePayApplUint64AddressVoid({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            appId: listingAppId,
            marketplace,
          },
        });
      } else if (gateTxn) {
        group.gatedPurchasePayApplUint64AddressUint64Void({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            appId: listingAppId,
            marketplace,
            wallet,
          },
        });
      } else {
        group.purchase({
          ...sendParams,
          args: {
            payment,
            appId: listingAppId,
            marketplace,
          },
        });
      }
    }

    await group.send(sendParams);
  }

  // ========== OptIn Methods ==========

  /**
   * Opts the marketplace into an asset so listings using it as the payment
   * asset can be fulfilled. When the marketplace has a named DAO escrow
   * configured, this also eagerly opts the escrow + every revenue-split
   * escrow in via the revenue-manager plugin, so downstream list/purchase
   * calls don't have to do the rekey dance mid-group.
   */
  async optIn({ sender, signer, asset }: OptInParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const cost = await this.client.optInCost({ args: { asset } });

    const payment = await this.client.algorand.createTransaction.payment({
      note: uniqueNote('payment'),
      ...sendParams,
      amount: microAlgo(cost),
      receiver: this.client.appAddress,
    });

    await this.client.send.optIn({
      ...sendParams,
      args: { payment, asset },
      maxFee: microAlgo(257_000),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    });
  }

  /**
   * Opts the marketplace into an asset that is going to be SOLD on it. Only the factory itself opts
   * in: the DAO revenue escrow never receives a prize, so this costs one asset opt-in (0.1 ALGO) and
   * does not depend on the escrow's payout cycle. `list` adds this call on its own when it is needed.
   * Use `optIn` for a payment asset.
   */
  async optInPrize({ sender, signer, asset }: OptInParams): Promise<void> {
    const sendParams = this.getRequiredSendParams({ sender, signer });

    const payment = await this.client.algorand.createTransaction.payment({
      note: uniqueNote('payment'),
      ...sendParams,
      amount: microAlgo(ASSET_OPT_IN_MIN_BALANCE),
      receiver: this.client.appAddress,
    });

    await this.client.send.optInPrize({
      ...sendParams,
      args: { payment, asset },
      coverAppCallInnerTransactionFees: true,
      maxFee: microAlgo(10_000),
      populateAppCallResources: true,
    });
  }

  // ========== Delist Methods ==========

  /**
   * Removes a listing and returns the asset to the seller.
   * Can only be called by the seller.
   */
  async delist({ sender, signer, appId }: DelistParams): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.delist({
      ...sendParams,
      args: { appId },
    });
  }

  // ========== Admin Methods ==========

  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDAO({ sender, signer, akitaDao }: MaybeSigner & MarketplaceContractArgs['updateAkitaDAO(uint64)void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao },
    });
  }

  /**
   * Updates the Akita DAO Escrow reference.
   */
  async updateAkitaDAOEscrow({ sender, signer, config }: MaybeSigner & MarketplaceContractArgs['updateAkitaDAOEscrow((string,uint64))void']): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { config },
    });
  }
}

/**
 * Convenience function to create a new listing and return the SDK.
 * Creates a marketplace SDK, creates the listing, and returns the listing SDK.
 */
export async function newListing({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...listParams
}: NewContractSDKParams & ListParams): Promise<ListingSDK> {
  const marketplace = new MarketplaceSDK({ factoryParams, algorand, readerAccount, sendParams });
  return await marketplace.list(listParams);
}
