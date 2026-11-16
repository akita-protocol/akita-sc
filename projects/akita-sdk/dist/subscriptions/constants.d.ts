export declare enum ServiceStatus {
    None = 0,
    Draft = 10,
    Active = 20,
    Paused = 30,
    Shutdown = 40
}
export declare enum HighlightMessage {
    None = 0,
    BestValue = 1,
    Popular = 2,
    New = 3,
    LimitedOffer = 4,
    Recommended = 5,
    Trending = 6,
    StaffPick = 7,
    TopRated = 8,
    EditorChoice = 9,
    HotDeal = 10,
    Seasonal = 11,
    FlashSale = 12,
    Exclusive = 13,
    LimitedEdition = 14,
    EarlyAccess = 15
}
export declare const MAX_DESCRIPTION_LENGTH = 3151;
export declare const MAX_DESCRIPTION_CHUNK_SIZE = 2034;
export declare const MAX_LOAD_DESCRIPTION_CHUNK_SIZE = 2026;
/**
 * MBR of the stored principal pair `(W, principal)` (box 'i') that a gated subscription made through a
 * verified wallet keeps (principal resolution §6.4): 2_500 + 400 * (41 + 40). Included in
 * `newSubscriptionCost(..., wallet)` and refunded by `unsubscribe`; `adoptPrincipal` pays exactly this.
 */
export declare const SUBSCRIPTION_PRINCIPAL_MBR = 34900n;
/**
 * MBR of a creator's featured service box ('f'): 2_500 + 400 * (33 + 8). Paid by the first
 * `setFeaturedService` (later calls pay 0) and refunded by `clearFeaturedService`.
 */
export declare const FEATURED_SERVICE_MBR = 18900n;
