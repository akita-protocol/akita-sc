import { Bytes, uint64 } from "@algorandfoundation/algorand-typescript";
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
export const AkitaSocialBoxPrefixModeratorActivity = 'k'

// Vote / reaction records keyed by sha256 of the full (user, ref[, NFT]) tuple.
// The 16-byte-truncated 'o' / 'e' maps are legacy: read and deleted only.
export const AkitaSocialBoxPrefixVoteRecords = 'x'
export const AkitaSocialBoxPrefixReactionRecords = 'y'
// Timestamp of the first post box created after the record-map upgrade. Legacy
// 16-byte list entries may only be consumed against posts older than this.
export const AkitaSocialGlobalStateKeysLegacyListCutoff = 'legacy_list_cutoff'

export const ImpactBoxPrefixMeta = 'm'
export const ImpactBoxPrefixSubscriptionStateModifier = 's'

export const FollowsMBR: uint64 = 31_700
export const BlocksMBR: uint64 = 15_700
// 2_500 + 400 * (key 33 + value head 77 + ref length prefix 2) = 47_300; add 400 * ref.length for the ref itself
export const MinPostsMBR: uint64 = 47_300
// 2_500 + 400 * (key 9 + value 8: two array offsets + two array lengths); add 400 * 17 per pay option
export const MinPayWallMBR: uint64 = 9_300
export const VotesMBR: uint64 = 19_300
export const VotelistMBR: uint64 = 19_300
export const ReactionsMBR: uint64 = 22_100
export const ReactionlistMBR: uint64 = 18_900 // legacy 'e' + 16 + 16 + 8 key
export const ReactionRecordMBR: uint64 = 15_700 // 'y' + 32 key, empty value
export const MetaMBR: uint64 = 45_300
export const ModeratorsMBR: uint64 = 18_900
export const BannedMBR: uint64 = 18_900
export const ActionsMBR: uint64 = 29_700
// 2_500 + 400 * (key 33 + value 24); paid from the moderation app's balance in addModerator, freed back to it in removeModerator
export const ModeratorActivityMBR: uint64 = 25_300
/** Moderator activity counters roll over every 7 days (epoch = latestTimestamp / this; boundaries fall on Thursday 00:00 UTC) */
export const ModeratorActivityEpoch: uint64 = 604_800
/** How a moderation call moves the moderator's net activity count (see AkitaSocialModeration.recordAction) */
export const ModerationEffectNone: uint64 = 0
export const ModerationEffectForward: uint64 = 1
export const ModerationEffectReversal: uint64 = 2

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
// Every reply ref stores the 32-byte parent ref after the CID
export const ReplyParentRefMBR: uint64 = 12_800 // 400 * 32

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
// PRINCIPAL RESOLUTION: LEGACY SHIM PAYMENT TERMS (docs/principal-resolution/PHASE-0-SPEC.md §6.2, §7.2)
// The legacy (pre-hint) selectors must accept exactly what the DEPLOYED social plugin (MainNet
// 3643581007 = HEAD e7f174ee) quotes locally, or every call from it reverts. That plugin was compiled
// with MinPostsMBR = 46_500 (this file now has 47_300), reaction-list MBR = ReactionlistMBR (18_900,
// new records cost ReactionRecordMBR) and no ReplyParentRefMBR / never-voted VotesMBR terms. Delete
// with the shims in Phase 4.
/** MinPostsMBR the deployed social plugin quotes: legacy shims charge 800 µA less per posts box. */
export const LegacyMinPostsMBR: uint64 = 46_500
// Legacy payment terms are honoured only for the callers that quote them (review fix, 2026-10-04).
// On MainNet (Global.genesisHash == MainNetGenesisHash) that is the four deployed social plugin
// programs below; every other caller of an old selector, top-level senders included, pays the
// corrected terms. Delete with the shims in Phase 4.
/** MainNet genesis hash (base64): sha512_256("GE" || msgpack(genesis.json of mainnet-v1.0)). */
export const MainNetGenesisHash = Bytes.fromBase64('wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=', { length: 32 })
/** MainNet social plugin, December 2025 deploy (akita-sdk networks.ts socialPlugin[0]). */
export const LegacySocialPluginDecember: uint64 = 3_368_400_007
/** MainNet social plugin, May 2026 deploy (socialPlugin[1]). */
export const LegacySocialPluginMay: uint64 = 3_569_562_087
/** MainNet social plugin v0.0.2 (socialPlugin[2]). */
export const LegacySocialPluginV002: uint64 = 3_633_295_088
/** MainNet social plugin v0.0.3 (socialPlugin[3], = HEAD e7f174ee). */
export const LegacySocialPluginV003: uint64 = 3_643_581_007
