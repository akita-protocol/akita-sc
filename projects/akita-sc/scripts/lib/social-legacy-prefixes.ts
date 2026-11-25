/**
 * The pre-upgrade check for audit 08, SOC-13.
 *
 * A vote or reaction made on the deployed AkitaSocial is stored under a key that holds only the
 * first 16 bytes of its ref. The upgraded program consumes such an entry only against a ref whose
 * post existed before the upgrade's cutoff (`assertLegacyRef`), which stops a look-alike ref minted
 * afterwards. What it cannot tell apart are two refs that both existed before the cutoff and share
 * those 16 bytes: an entry made on one of them could be undone against the other, moving one vote's
 * weight, or decrementing a reaction counter until an honest reactor's deposit is stuck.
 *
 * So the pair has to be ruled out off chain, before the upgrade: list the app's `posts` boxes and
 * check that no two of their 32-byte keys share a prefix of 16. If any pair did share one, the refs
 * would have to go on a deny list in the program before E1 is run.
 */

/** The `posts` box prefix of AkitaSocial (`AkitaSocialBoxPrefixPosts`). */
export const POSTS_PREFIX = 'p'
/** Bytes of the ref a legacy vote or reaction key holds (`legacyVoteKey`, `legacyReactionKey`). */
export const LEGACY_REF_BYTES = 16
/** Length of a ref, and so of a `posts` box key after its prefix. */
export const REF_BYTES = 32

export type PostsKey = { /** hex of the whole 32-byte ref */ ref: string }

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')

/** The refs of an app's `posts` boxes: every box name that is the prefix plus 32 bytes. */
export function postsRefs(boxNames: Uint8Array[]): string[] {
  const prefix = Buffer.from(POSTS_PREFIX)
  return boxNames
    .filter((name) => name.length === prefix.length + REF_BYTES && Buffer.from(name.slice(0, prefix.length)).equals(prefix))
    .map((name) => hex(name.slice(prefix.length)))
}

export type PrefixCollision = { prefix: string; refs: string[] }

/** Pre-cutoff refs that share the 16 bytes a legacy entry keys on. Empty means the upgrade is safe. */
export function prefixCollisions(refs: string[]): PrefixCollision[] {
  const byPrefix = new Map<string, string[]>()
  for (const ref of refs) {
    const prefix = ref.slice(0, LEGACY_REF_BYTES * 2)
    const group = byPrefix.get(prefix)
    if (group) {
      if (!group.includes(ref)) group.push(ref)
    } else {
      byPrefix.set(prefix, [ref])
    }
  }
  return [...byPrefix]
    .filter(([, group]) => group.length > 1)
    .map(([prefix, group]) => ({ prefix, refs: [...group].sort() }))
}

/** What the check prints, and whether the upgrade may go ahead. */
export function describeCollisions(appId: bigint, refs: string[], collisions: PrefixCollision[]): string {
  if (collisions.length === 0) {
    return `AkitaSocial ${appId}: ${refs.length} posts, no two of them share the ${LEGACY_REF_BYTES} bytes a legacy vote or reaction keys on (SOC-13). The upgrade can go ahead.`
  }
  const lines = collisions.map(({ prefix, refs: group }) => `  ${prefix}…: ${group.join(', ')}`)
  return `AkitaSocial ${appId}: ${collisions.length} group(s) of posts share the ${LEGACY_REF_BYTES} bytes a legacy vote or reaction keys on (SOC-13):\n${lines.join('\n')}`
}
