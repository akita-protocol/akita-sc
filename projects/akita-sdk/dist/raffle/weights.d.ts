/** The number of entries whose ticket counts share one weights box. */
export declare const RAFFLE_CHUNK_SIZE = 4096n;
/** Bytes of one ticket count in a weights box. */
export declare const RAFFLE_WEIGHT_BYTES = 8;
/** Where the ticket count of entry `entryId` is kept: the weights box and the slot inside it. */
export declare function weightLocation(entryId: bigint | number): {
    box: bigint;
    slot: number;
};
/**
 * The ticket count in `slot` of a weights box: 8 bytes, big-endian.
 *
 * A raffle created from 2.0.0 on keeps a box only as long as the entries it holds. An earlier
 * raffle reserved every box in full (4096 slots, zero where nobody entered). Both lay their slots
 * out the same way, so one reader serves both. A slot the box does not have returns `undefined`.
 */
export declare function ticketsInSlot(weightsBox: Uint8Array, slot: number): bigint | undefined;
