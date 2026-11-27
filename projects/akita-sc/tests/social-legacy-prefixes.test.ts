/**
 * The pre-upgrade check of `scripts/check-social-legacy-prefixes.ts` (audit 08, SOC-13): among the
 * refs that have a post before the upgrade, no two may share the 16 bytes a legacy vote or reaction
 * entry keys on, because the upgraded program cannot tell such a pair apart.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import {
  describeCollisions,
  LEGACY_REF_BYTES,
  POSTS_PREFIX,
  postsRefs,
  prefixCollisions,
  REF_BYTES,
} from '../scripts/lib/social-legacy-prefixes'

/** The contract's own prefixes, read from its source (the constants module is contract code). */
const constants = readFileSync(path.resolve(__dirname, '../smart_contracts/social/constants.ts'), 'utf8')
const prefixOf = (name: string): string => {
  const match = constants.match(new RegExp(`export const ${name} = '(.)'`))
  if (!match) throw new Error(`${name} not found in the social constants`)
  return match[1]
}
const AkitaSocialBoxPrefixPosts = prefixOf('AkitaSocialBoxPrefixPosts')
const AkitaSocialBoxPrefixVoteList = prefixOf('AkitaSocialBoxPrefixVoteList')

const ref = (hex: string) => hex.padEnd(REF_BYTES * 2, '0')
const box = (prefix: string, hex: string) => new Uint8Array([...Buffer.from(prefix), ...Buffer.from(ref(hex), 'hex')])

describe('social legacy prefixes (SOC-13)', () => {
  test('the constants are the ones the contract uses', () => {
    expect(POSTS_PREFIX).toBe(AkitaSocialBoxPrefixPosts)
    expect(LEGACY_REF_BYTES).toBe(16)
    expect(REF_BYTES).toBe(32)
  })

  test('only the posts boxes are read, and only those with a whole ref as their key', () => {
    const names = [
      box(AkitaSocialBoxPrefixPosts, 'aa'),
      box(AkitaSocialBoxPrefixVoteList, 'bb'),
      new Uint8Array([...Buffer.from(AkitaSocialBoxPrefixPosts), 1, 2, 3]),
      new Uint8Array(Buffer.from(AkitaSocialBoxPrefixPosts)),
    ]
    expect(postsRefs(names)).toEqual([ref('aa')])
  })

  test('refs that differ only after the 16th byte are a collision; earlier differences are not', () => {
    const a = `${'11'.repeat(16)}${'00'.repeat(16)}`
    const b = `${'11'.repeat(16)}${'ff'.repeat(16)}`
    const c = `${'11'.repeat(15)}22${'00'.repeat(16)}`
    expect(prefixCollisions([a, c])).toEqual([])
    expect(prefixCollisions([a, b, c])).toEqual([{ prefix: '11'.repeat(16), refs: [a, b].sort() }])
    // the same ref listed twice is one post, not a pair
    expect(prefixCollisions([a, a])).toEqual([])
  })

  test('what the check prints says whether the upgrade may go ahead', () => {
    const a = `${'11'.repeat(16)}${'00'.repeat(16)}`
    const b = `${'11'.repeat(16)}${'ff'.repeat(16)}`
    expect(describeCollisions(3n, [a], [])).toMatch(/1 posts, no two of them share the 16 bytes/)
    expect(describeCollisions(3n, [a], [])).toMatch(/can go ahead/)
    const message = describeCollisions(3n, [a, b], prefixCollisions([a, b]))
    expect(message).toMatch(/1 group\(s\) of posts share/)
    expect(message).toContain(a)
    expect(message).toContain(b)
  })
})
