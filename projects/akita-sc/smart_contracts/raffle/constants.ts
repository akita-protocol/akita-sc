import { uint64 } from '@algorandfoundation/algorand-typescript'

export const RaffleGlobalStateKeyTicketAsset = 'ticket_asset'
export const RaffleGlobalStateKeyStartTimestamp = 'start_timestamp'
export const RaffleGlobalStateKeyEndTimestamp = 'end_timestamp'
export const RaffleGlobalStateKeySeller = 'seller'
export const RaffleGlobalStateKeyMinTickets = 'min_tickets'
export const RaffleGlobalStateKeyMaxTickets = 'max_tickets'
export const RaffleGlobalStateKeyEntryCount = 'entry_count'
export const RaffleGlobalStateKeyTicketCount = 'ticket_count'
export const RaffleGlobalStateKeyWinningTicket = 'winning_ticket'
export const RaffleGlobalStateKeyWinner = 'winner'
export const RaffleGlobalStateKeyPrize = 'prize'
export const RaffleGlobalStateKeyIsPrizeBox = 'is_prize_box'
export const RaffleGlobalStateKeyPrizeClaimed = 'prize_claimed'
export const RaffleGlobalStateKeyCreatorRoyalty = 'creator_royalty'
export const RaffleGlobalStateKeyGateID = 'gate_id'
export const RaffleGlobalStateKeyMarketplace = 'marketplace'
export const RaffleGlobalStateKeyMarketplaceRoyalties = 'marketplace_royalties'
export const RaffleGlobalStateKeyAkitaRoyalty = 'akita_royalty'
export const RaffleGlobalStateKeyVRFFailureCount = 'vrf_failure_count'
export const RaffleGlobalStateKeyEntryID = 'entry_id'
export const RaffleGlobalStateKeyWeightsBoxCount = 'weights_box_count'
export const RaffleGlobalStateKeyWeightTotals = 'w_totals'
export const RaffleGlobalStateKeyFindWinnersCursor = 'find_winner_cursors'
export const RaffleGlobalStateKeyRefundMBRCursor = 'refund_mbr_cursor'
export const RaffleGlobalStateKeySalt = 'salt'
export const RaffleGlobalStateKeyRaffleRound = 'raffle_round'
export const RaffleGlobalStateKeyMinEntries = 'min_entries'
export const RaffleGlobalStateKeyFailed = 'failed'
/**
 * Creation-time referrer of the seller's verified wallet (zero address if none), paid at settlement.
 * Its EXISTENCE marks a child with the principal ABI (hinted gated methods; spec §6.8).
 */
export const RaffleGlobalStateKeySellerReferrer = 'seller_referrer'

export const RaffleBoxPrefixEntries = 'e'
export const RaffleBoxPrefixWeights = 'w'
export const RaffleBoxPrefixEntriesByAddress = 'a'

export const EntriesMBR: uint64 = 31_700
export const WeightsMBR: uint64 = 13_113_300
export const EntriesByAddressMBR: uint64 = 18_900

export const BoxWeightTotalsSize: uint64 = 15

// 4096*8 bytes = 32KB
export const ChunkSize: uint64 = 4096

// VRF draw (commit-reveal). The MainNet beacon (1615566206) stores one value per multiple of
// BEACON_ROUND_INTERVAL rounds and submits it about 2 rounds later. The first post-end raffle()
// call commits to the first stored round at least DRAW_DELAY_ROUNDS ahead; the draw may read it
// BEACON_LAG_ROUNDS after that round. An empty read reverts until BEACON_MAX_WAIT_ROUNDS have
// passed (inside the beacon's ~1,512-round window), and only then re-commits forward.
export const DRAW_DELAY_ROUNDS: uint64 = 8
export const BEACON_ROUND_INTERVAL: uint64 = 8
export const BEACON_LAG_ROUNDS: uint64 = 4
export const BEACON_MAX_WAIT_ROUNDS: uint64 = 1_000
