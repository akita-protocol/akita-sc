import { uint64 } from '@algorandfoundation/algorand-typescript'

export const ListingGlobalStateKeyPrize = 'prize'
export const ListingGlobalStateKeyIsPrizeBox = 'is_prize_box'
export const ListingGlobalStateKeyPrice = 'price'
export const ListingGlobalStateKeyPaymentAsset = 'payment_asset'
export const ListingGlobalStateKeySeller = 'seller'
export const ListingGlobalStateKeyMarketplace = 'marketplace'
export const ListingGlobalStateKeyCreatorRoyalty = 'creator_royalty'
export const ListingGlobalStateKeyMarketplaceRoyalties = 'marketplace_royalties'
export const ListingGlobalStateKeyExpiration = 'expiration'
export const ListingGlobalStateKeyReservedFor = 'reserved_for'
export const ListingGlobalStateKeyGateID = 'gate_id'
export const ListingGlobalStateKeyAkitaDAOEscrow = 'akita_escrow'
export const ListingGlobalStateKeyPrizeAmount = 'prize_amount'
export const ListingGlobalStateKeyPriceRound = 'price_round'
/** Present only on listings created by the revised (audit-fixed) Listing program */
export const ListingGlobalStateKeyRevision = 'rev'
/**
 * Rev 3+: the seller's referrer, fixed at creation by the factory (principal resolution,
 * docs/principal-resolution/PHASE-0-SPEC.md §6.7). Settlement pays the referral cut here instead of
 * reading the EscrowFactory registry. Zero address = no referral.
 */
export const ListingGlobalStateKeySellerReferrer = 'seller_referrer'
/**
 * Rev 3+: the creation MBR the factory advanced from its free balance because the listing was paid
 * through a legacy shim with the deployed plugin's pre-audit amount (`LegacyListingCreateMbr`); 0
 * otherwise. Settlement and delist repay it to the factory before the funder refund, so the seller
 * bears the consumed settlement MBR exactly as on the hinted path.
 */
export const ListingGlobalStateKeyFactoryFloat = 'factory_float'

/**
 * Listing program revision written to `rev` at creation (absent on legacy listings).
 * 2 = audit-fixed program (MKT-01..07); 3 = creation-time `seller_referrer` (principal resolution).
 */
export const ListingRevision: uint64 = 3
/** A purchase must land strictly more than this many rounds after the last price change */
export const ListingPriceChangeCooldownRounds: uint64 = 4
/** Lowest price that still splits into creator / akita / 2x marketplace / seller */
export const ListingMinimumPrice: uint64 = 4
/**
 * Creation MBR (program pages + global schema) the DEPLOYED MarketplacePlugin (MainNet 3569561455) and
 * the pre-audit SDK (`MarketplaceSDK.listCost` baseCost 756_500) bake into their `list`/`listPrizeBox` payment: the pre-audit Listing (2 pages,
 * 9 uints, 6 bytes) = 200_000 + 9 * 28_500 + 6 * 50_000 (plugin intcblock constant 756500).
 * The legacy `list`/`listPrizeBox` shims accept a payment computed with it for ALGO-priced listings.
 */
export const LegacyListingCreateMbr: uint64 = 756_500
/**
 * Per-disbursement Rewards MBR the same deployed quotes bake in (v1 `MinDisbursementsMBR`, plugin
 * intcblock 67000 = 41,700 + 25,300). Rewards v2 charges 12,800 more per disbursement for `reclaimTo`.
 */
export const LegacyMinDisbursementsMBR: uint64 = 41_700
/**
 * Free balance the factory must still hold after it floats a legacy payment. It keeps the full-deposit
 * refunds of the live rev-absent MainNet listings (3643990817, 3691743616) payable: each can consume up
 * to one prize disbursement + one rewards opt-in (67,000 + 100,000; a v1-priced disbursement reverts
 * at Rewards v2) that the factory pays from free balance (`refundListingFunder(legacy = true)`). A legacy-paid list that would go below it reverts errLflt.
 */
export const LegacyFloatReserve: uint64 = 500_000
