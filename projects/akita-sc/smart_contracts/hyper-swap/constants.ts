import { uint64 } from "@algorandfoundation/algorand-typescript"
import { Uint8 } from "@algorandfoundation/algorand-typescript/arc4"

export const HyperSwapGlobalStateKeyOfferCursor = 'offer_cursor'
export const HyperSwapGlobalStateKeySpendingAccountFactoryApp = 'spending_account_factory_app'

export const HyperSwapBoxPrefixOffers = 'o'
export const HyperSwapBoxPrefixOfferRefunds = 'f'
export const HyperSwapBoxPrefixParticipants = 'p'
export const HyperSwapBoxPrefixHashes = 'h'
/** Meta registry app ID pinned when the offer was created (HS-04). */
export const HyperSwapBoxPrefixOfferRegistry = 'r'

// Offer: 9-byte box name + 105-byte value. Refund: 9-byte name + 40-byte value.
export const OffersMBR: uint64 = 48_100
export const OfferRefundsMBR: uint64 = 22_100
// Pinned registry: 9-byte box name + 8-byte app ID.
export const OfferRegistryMBR: uint64 = 9_300
export const ParticipantsMBR: uint64 = 34_900
export const HashesMBR: uint64 = 34_900
// Meta root: 1-byte prefix + 32-byte owner + 9-byte name + (32-byte root, 8-byte type).
export const MetaMerkleHyperSwapRootMBR: uint64 = 2_500 + 400 * (1 + 32 + 9 + 32 + 8)
// Meta stores the type with the root; keep the legacy quote field for ABI compatibility.
export const MetaMerkleHyperSwapDataMBR: uint64 = 0

/** Longest an offer may stay open: 30 days (HS-02). */
export const MaxOfferDuration: uint64 = 2_592_000

export const META_MERKLE_ADDRESS_SCHEMA: uint64 = 1
export const META_MERKLE_TRADE_SCHEMA: uint64 = 4
export const META_MERKLE_TRADE_TYPE: uint64 = 3

export const STATE_OFFERED = new Uint8(10) // an offer has been made and is pending acceptance by the other parties
export const STATE_ESCROWING = new Uint8(20) // the offer is accepted by both parties and the contract is collecting the assets
export const STATE_DISBURSING = new Uint8(30) // the contract has collected all assets from both parties and is dispersing the assets to the other parties
export const STATE_COMPLETED = new Uint8(40) // the trade has completed and the contract can be deleted
export const STATE_CANCELLED = new Uint8(50) // the trade was cancelled
export const STATE_CANCEL_COMPLETED = new Uint8(60) // the trade was cancelled and any necessary withdraws completed
