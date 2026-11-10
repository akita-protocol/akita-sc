import { uint64 } from "@algorandfoundation/algorand-typescript"
import { Uint8 } from "@algorandfoundation/algorand-typescript/arc4"

export const SubscriptionsBoxPrefixSubscriptions = 's'
export const SubscriptionsBoxPrefixSubscriptionsList = 'l'
export const SubscriptionsBoxPrefixServices = 'o'
export const SubscriptionsBoxPrefixServicesList = 'm'
export const SubscriptionsBoxPrefixBlocks = 'b'
export const SubscriptionsBoxPrefixPasses = 'p'
/** stored principal pair `(W, principal)` of a gated wallet subscription (principal resolution §6.4, Q11) */
export const SubscriptionsBoxPrefixPrincipals = 'i'

export const SubscriptionsMBR: uint64 = 60_500
export const SubscriptionsListMBR: uint64 = 18_900
// audit SG-09: reserve the box at its maximum size up front (services are never deleted and
// title/description can grow later): key 41 ('o' + 32 + 8) + 121 bytes of fixed fields and
// string headers + MAX_TITLE_LENGTH (128) + MAX_DESCRIPTION_LENGTH (3151) = 3441 bytes
// → 2_500 + 400 * 3441
export const ServicesMBR: uint64 = 1_378_900
export const ServicesListMBR: uint64 = 18_900
export const BlocksMBR: uint64 = 15_700
export const MinPassesMBR: uint64 = 18_900
/** pass MBR charged before the SG-08 repricing (BoxCostPerBox was used per byte) */
export const LegacyPassesMBR: uint64 = 418_900
/** 'i' box: key 'i' + 32 + 8 = 41 bytes, value wallet 8 + principal 32 = 40 bytes → 2_500 + 400 * 81 */
export const SubscriptionPrincipalMBR: uint64 = 34_900

/** timestamp from which subscriptions are charged the repriced pass MBR (lazily set) */
export const SubscriptionsGlobalStateKeyPassesRepricedAt = 'passes_repriced_at'

export const MIN_AMOUNT = 4 // base units of any asa
export const MIN_INTERVAL = 60 // seconds
export const MAX_PASSES = 5 // max family passes
export const MAX_TITLE_LENGTH = 128
// max description size is set so we can nicely fit SubscriptionInfoWithPasses
// + a 500 byte cushion as a return value
// [fixed fields: 145][passes: 160+2+2][title: max 128+2+2][description: 3151+2+2][cushion: 500] = 4096
export const MAX_DESCRIPTION_LENGTH = 3151
// max description chunk size for Subscriptions.setServiceDescription(offset, data)
// [selector:4][offset:8][data_length:2][data:N] = 2048
// overhead = 14 bytes, max data = 2034 bytes
export const MAX_DESCRIPTION_CHUNK_SIZE = 2034

export const HighlightMessageNone: Uint8 = new Uint8(0)
export const HighlightMessageBestValue: Uint8 = new Uint8(1)
export const HighlightMessagePopular: Uint8 = new Uint8(2)
export const HighlightMessageNew: Uint8 = new Uint8(3)
export const HighlightMessageLimitedOffer: Uint8 = new Uint8(4)
export const HighlightMessageRecommended: Uint8 = new Uint8(5)
export const HighlightMessageTrending: Uint8 = new Uint8(6)
export const HighlightMessageStaffPick: Uint8 = new Uint8(7)
export const HighlightMessageTopRated: Uint8 = new Uint8(8)
export const HighlightMessageEditorChoice: Uint8 = new Uint8(9)
export const HighlightMessageHotDeal: Uint8 = new Uint8(10)
export const HighlightMessageSeasonal: Uint8 = new Uint8(11)
export const HighlightMessageFlashSale: Uint8 = new Uint8(12)
export const HighlightMessageExclusive: Uint8 = new Uint8(13)
export const HighlightMessageLimitedEdition: Uint8 = new Uint8(14)
export const HighlightMessageEarlyAccess: Uint8 = new Uint8(15)