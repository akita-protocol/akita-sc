/**
 * The lease string an UpgradeApp action recorded. `usePlugin` takes the lease as a string and pads it
 * with zero bytes to 32 (algokit `encodeLease`); the leases the update scripts build are ASCII, so
 * dropping the padding recovers the string. Throws when the result would not encode back to the same bytes.
 *
 * A resumed upgrade must rebuild its groups with this lease, not a fresh one: the wallet's execution
 * box reference ('x' + lease) is part of each hashed group, so a fresh lease gives other group ids.
 */
export function recordedLease(executionKey: Uint8Array): string {
  const notALease = () => new Error('the recorded execution key is not a padded lease string; cannot rebuild its groups')
  if (executionKey.length !== 32) throw notALease()
  let end = executionKey.length
  while (end > 0 && executionKey[end - 1] === 0) end--
  const lease = Buffer.from(executionKey.subarray(0, end)).toString('utf8')
  const bytes = Buffer.from(lease, 'utf8') // invalid UTF-8 decodes to U+FFFD and no longer fits or matches
  if (bytes.length > 32) throw notALease()
  const encoded = new Uint8Array(32)
  encoded.set(bytes)
  if (Buffer.compare(Buffer.from(encoded), Buffer.from(executionKey)) !== 0) throw notALease()
  return lease
}
