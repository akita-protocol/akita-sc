import { uint64 } from "@algorandfoundation/algorand-typescript";
import { Uint8 } from "@algorandfoundation/algorand-typescript/arc4";
import { PayWallType, PostType, TipAction, TipSendType } from "./types";

export const AkitaSocialGlobalStateKeysPaywallID = 'paywall_id'

export const AkitaSocialBoxPrefixFollows = 'f'
export const AkitaSocialBoxPrefixBlocks = 'b'
export const AkitaSocialBoxPrefixPosts = 'p'
export const AkitaSocialboxPrefixPayWall = 'w'
export const AkitaSocialBoxPrefixVotes = 'v'
export const AkitaSocialBoxPrefixVoteList = 'o'
export const AkitaSocialBoxPrefixReactions = 'r'
export const AkitaSocialBoxPrefixReactionList = 'e'
export const AkitaSocialBoxPrefixMeta = 'm'
export const AkitaSocialBoxPrefixModerators = 'd'
export const AkitaSocialBoxPrefixBanned = 'n'
export const AkitaSocialBoxPrefixActions = 'a'

export const ImpactBoxPrefixMeta = 'm'
export const ImpactBoxPrefixSubscriptionStateModifier = 's'

export const FollowsMBR: uint64 = 31_700
export const BlocksMBR: uint64 = 15_700
export const MinPostsMBR: uint64 = 46_500 // + (400 * ref.length), — includes creatorFlags + moderatorFlags (2 x uint64 = 16 bytes x 400)
export const MinPayWallMBR: uint64 = 5_200 // TODO: double check
export const VotesMBR: uint64 = 19_300
export const VotelistMBR: uint64 = 19_300
export const ReactionsMBR: uint64 = 22_100
export const ReactionlistMBR: uint64 = 18_900
export const MetaMBR: uint64 = 45_300
export const ModeratorsMBR: uint64 = 18_900
export const BannedMBR: uint64 = 18_900
export const ActionsMBR: uint64 = 29_700

export const ImpactMetaMBR: uint64 = 31_700
export const SubscriptionStateModifierMBR: uint64 = 9_300

export const ONE_DAY: uint64 = 86_400
export const TWO_YEARS: uint64 = 63_072_000
export const THIRTY_DAYS: uint64 = 2_592_000
export const ONE_YEAR: uint64 = 31_536_000

// Maximum allowed drift for user-provided timestamps (60 seconds)
export const MAX_TIMESTAMP_DRIFT: uint64 = 60

export const ONE_MILLION_AKITA: uint64 = 1_000_000_000_000
export const TWO_HUNDRED_THOUSAND_AKITA: uint64 = 200_000_000_000
export const TEN_THOUSAND_AKITA: uint64 = 10_000_000_000

export const AmendmentMBR: uint64 = 13_200 // (400 * 33) 'a' + nextEditKey
export const EditBackRefMBR: uint64 = 13_200 // (400 * 33) 'e' + originalKey

// Built-in ref type IDs (registered at contract init)
export const RefTypePost: uint64 = 1
export const RefTypeAsset: uint64 = 2
export const RefTypeAddress: uint64 = 3
export const RefTypeApp: uint64 = 4

// PostType enum - what kind of post is this
export const PostTypePost: PostType = new Uint8(0)      // Top-level post
export const PostTypeReply: PostType = new Uint8(1)     // Reply/comment
export const PostTypeEditPost: PostType = new Uint8(2)  // Edit of a top-level post
export const PostTypeEditReply: PostType = new Uint8(3) // Edit of a reply

export const TipSendTypeInvalid: TipSendType = new Uint8(0)
export const TipSendTypeDirect: TipSendType = new Uint8(10)
export const TipSendTypeARC58: TipSendType = new Uint8(20)

export const TipActionPost: TipAction = new Uint8(10)
export const TipActionReact: TipAction = new Uint8(20)

export const PayWallTypeOneTimePayment: PayWallType = new Uint8(10)
export const PayWallTypeSubscription: PayWallType = new Uint8(20)

export const PayWallPayOptionSize: uint64 = 17

export const AkitaSocialBoxPrefixRefTypes = 't'
export const RefTypesBaseMBR: uint64 = 9_300 // 2_500 + (400 * (9 + 8)) key(9) + fixed value overhead(8)
export const AkitaSocialGlobalStateKeysRefTypeCounter = 'ref_type_counter'

// Built-in ref type count (post, asset, address, app)
export const BuiltInRefTypeCount: uint64 = 4

// Content flag bitmask values
export const ContentFlagNSFW: uint64 = 1            // 0b001
export const ContentFlagAI: uint64 = 2               // 0b010
export const ContentFlagPaidPartnership: uint64 = 4   // 0b100