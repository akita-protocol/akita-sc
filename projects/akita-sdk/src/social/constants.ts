/**
 * Social System MBR Constants (in microAlgos)
 * Base MBR formula: 2500 + (400 * (key_size + value_size))
 * 
 * From contract constants.ts:
 * - BoxCostPerByte = 400
 */

// Box cost per byte (standard Algorand value)
export const BOX_COST_PER_BYTE = 400n;

// ============================================================================
// Social Contract MBR values (from contract)
// ============================================================================

/** Follows box MBR: 31,700 microAlgo */
export const FOLLOWS_MBR = 31_700n;

/** Blocks box MBR: 15,700 microAlgo */
export const BLOCKS_MBR = 15_700n;

/** Minimum posts box MBR: 47,300 microAlgo (add 400 * ref.length for total): key 33 + value head 77 + ref length prefix 2 */
export const MIN_POSTS_MBR = 47_300n;

/** Minimum paywall MBR: 9,300 microAlgo (key 9 + value 8, before pay options) */
export const MIN_PAYWALL_MBR = 9_300n;

/**
 * Deployed (pre-Phase-2) AkitaSocial terms, used while `SOCIAL_HINTED_TARGETS[network]` is false:
 * posts box base 46,500 (no reply parent-ref, no votes box for a materialized ref, 18,900 reaction
 * list per reaction) and paywall base 5,200.
 */
export const LEGACY_MIN_POSTS_MBR = 46_500n;
/** Deployed (pre-Phase-2) AkitaSocial paywall base MBR: 5,200 microAlgo */
export const LEGACY_MIN_PAYWALL_MBR = 5_200n;

/** Votes box MBR: 19,300 microAlgo */
export const VOTES_MBR = 19_300n;

/** Vote list box MBR: 19,300 microAlgo */
export const VOTELIST_MBR = 19_300n;

/** Reactions box MBR: 22,100 microAlgo */
export const REACTIONS_MBR = 22_100n;

/** Legacy reaction list box MBR ('e' + 16 + 16 + 8 key): 18,900 microAlgo. Refunded when a legacy reaction is deleted. */
export const REACTIONLIST_MBR = 18_900n;

/** Reaction record box MBR ('y' + sha256(user || ref || nft) key, empty value): 15,700 microAlgo */
export const REACTION_RECORD_MBR = 15_700n;

/** Parent-ref MBR carried by every reply ref (400 * 32): 12,800 microAlgo */
export const REPLY_PARENT_REF_MBR = 12_800n;

/** Meta box MBR: 45,300 microAlgo */
export const META_MBR = 45_300n;

/** Moderators box MBR: 18,900 microAlgo */
export const MODERATORS_MBR = 18_900n;

/** Moderator activity box ('k') MBR, created with the moderators box: 25,300 microAlgo */
export const MODERATOR_ACTIVITY_MBR = 25_300n;

/** Banned box MBR: 18,900 microAlgo */
export const BANNED_MBR = 18_900n;

/** Actions box MBR: 29,700 microAlgo */
export const ACTIONS_MBR = 29_700n;

/** Amendment MBR (for marking original as amended): 13,200 microAlgo (400 * 33 = 'a' + nextEditKey) */
export const AMENDMENT_MBR = 13_200n;

/** Edit back-reference MBR (for edit posts): 13,200 microAlgo (400 * 33 = 'e' + originalKey) */
export const EDIT_BACK_REF_MBR = 13_200n;

/** PayWall pay option size: 17 bytes each */
export const PAYWALL_PAY_OPTION_SIZE = 17n;

// ============================================================================
// Impact Contract MBR values
// ============================================================================

/** Impact meta box MBR: 31,700 microAlgo */
export const IMPACT_META_MBR = 31_700n;

/** Subscription state modifier MBR: 9,300 microAlgo */
export const SUBSCRIPTION_STATE_MODIFIER_MBR = 9_300n;

// ============================================================================
// Calculated MBR for common operations
// ============================================================================

/**
 * Post MBR: posts + votes + votelist
 * = 47,300 + (400 * 36) + 19,300 + 19,300 = 100,300 microAlgo (for 36-byte CID)
 */
export const POST_BASE_MBR = MIN_POSTS_MBR + VOTES_MBR + VOTELIST_MBR;

/**
 * Reply MBR: post MBR + the 32-byte parent ref the reply stores
 */
export const REPLY_BASE_MBR = POST_BASE_MBR + REPLY_PARENT_REF_MBR;

/**
 * Vote MBR: votelist only
 * For upvotes, additional payment needed for tip to creator
 */
export const VOTE_BASE_MBR = VOTELIST_MBR;

/**
 * React MBR: reactionlist (+ reactions if first reaction with this NFT)
 */
export const REACT_BASE_MBR = REACTION_RECORD_MBR;
export const REACT_NEW_NFT_MBR = REACTION_RECORD_MBR + REACTIONS_MBR;

// ============================================================================
// Time constants (matching contract)
// ============================================================================
export const ONE_DAY_SECONDS = 86_400n;
export const ONE_WEEK_SECONDS = 604_800n;
export const ONE_MONTH_SECONDS = 2_592_000n;
export const ONE_YEAR_SECONDS = 31_536_000n;
export const TWO_YEARS_SECONDS = 63_072_000n;

/** Maximum allowed drift for user-provided timestamps (60 seconds) */
export const MAX_TIMESTAMP_DRIFT_SECONDS = 60n;

// ============================================================================
// Content sizes
// ============================================================================

/** CID length (IPFS CIDv1) */
export const CID_LENGTH = 36;

/** Post reference length (32-byte hash) */
export const POST_REF_LENGTH = 32;

// ============================================================================
// RefType constants (matching contract)
// ============================================================================
export const REPLY_TYPE_POST = 1;
export const REPLY_TYPE_ASSET = 2;
export const REPLY_TYPE_ADDRESS = 3;
export const REPLY_TYPE_APP = 4;

// ============================================================================
// PostType constants (matching contract)
// ============================================================================
export const POST_TYPE_POST = 0;       // Top-level post
export const POST_TYPE_REPLY = 1;      // Reply/comment
export const POST_TYPE_EDIT_POST = 2;  // Edit of a top-level post
export const POST_TYPE_EDIT_REPLY = 3; // Edit of a reply

// ============================================================================
// Tip action types
// ============================================================================
export const TIP_ACTION_POST = 10;
export const TIP_ACTION_REACT = 20;

// ============================================================================
// Tip send types
// ============================================================================
export const TIP_SEND_TYPE_DIRECT = 10;
export const TIP_SEND_TYPE_ARC59 = 20;
export const TIP_SEND_TYPE_ARC58 = 30;
