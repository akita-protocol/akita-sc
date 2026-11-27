/** The number of entries whose ticket counts share one weights box. */
export const RAFFLE_CHUNK_SIZE = 4096n;

/** Bytes of one ticket count in a weights box. */
export const RAFFLE_WEIGHT_BYTES = 8;

/** Where the ticket count of entry `entryId` is kept: the weights box and the slot inside it. */
export function weightLocation(entryId: bigint | number): { box: bigint; slot: number } {
  const id = BigInt(entryId);
  return { box: id / RAFFLE_CHUNK_SIZE, slot: Number(id % RAFFLE_CHUNK_SIZE) };
}

/**
 * The ticket count in `slot` of a weights box: 8 bytes, big-endian.
 *
 * A raffle created from 2.0.0 on keeps a box only as long as the entries it holds. An earlier
 * raffle reserved every box in full (4096 slots, zero where nobody entered). Both lay their slots
 * out the same way, so one reader serves both. A slot the box does not have returns `undefined`.
 */
export function ticketsInSlot(weightsBox: Uint8Array, slot: number): bigint | undefined {
  const offset = slot * RAFFLE_WEIGHT_BYTES;
  if (slot < 0 || offset + RAFFLE_WEIGHT_BYTES > weightsBox.length) return undefined;
  return new DataView(weightsBox.buffer, weightsBox.byteOffset, weightsBox.byteLength).getBigUint64(offset);
}
