#!/usr/bin/env node
/**
 * Read-only check to run before the AkitaSocial upgrade of rollout step E1 (audit 08, SOC-13).
 *
 * It lists the live AkitaSocial's `posts` boxes and checks that no two refs share the 16 bytes a
 * legacy vote or reaction entry keys on. While that holds, the upgraded program's `assertLegacyRef`
 * is enough: a legacy entry can only be consumed against the ref it was made on. It sends nothing
 * and needs no key.
 *
 * Usage (from projects/akita-sc):
 *   npx ts-node --transpile-only scripts/check-social-legacy-prefixes.ts --network mainnet [--json]
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { describeCollisions, POSTS_PREFIX, postsRefs, prefixCollisions } from './lib/social-legacy-prefixes'

runScript(async () => {
  if (!process.argv.includes('--dry-run')) process.argv.push('--dry-run')
  const options = parseBaseArgs('check-social-legacy-prefixes.ts', '  --json                      Print machine-readable JSON')
  const json = process.argv.includes('--json')
  const ctx = await setupContext(options)
  const appId = ctx.appIds.social
  if (!appId) throw new Error(`No social app id configured for ${options.network}`)

  // Every page is read at one round, so a post written while this runs cannot be missed by half.
  const round = Number((await ctx.algorand.client.algod.status().do()).lastRound)
  const names: Uint8Array[] = []
  let next: string | undefined
  for (let page = 0; page < 1_000; page++) {
    const response = await ctx.algorand.client.algod.getApplicationBoxes(appId)
      .prefix(Buffer.from(POSTS_PREFIX)).limit(1_000).round(round).next(next).do()
    for (const box of response.boxes) names.push(box.name)
    next = response.nextToken
    if (!next || response.boxes.length === 0) break
  }
  if (next) throw new Error(`AkitaSocial ${appId} has more posts than this check reads`)

  const refs = postsRefs(names)
  console.log(`read at round ${round}`)
  const collisions = prefixCollisions(refs)
  if (json) {
    console.log(JSON.stringify({ app: appId.toString(), round, posts: refs.length, collisions }, null, 2))
  } else {
    console.log(describeCollisions(appId, refs, collisions))
  }
  if (collisions.length > 0) {
    throw new Error('Refusing the upgrade: add these refs to a deny list in assertLegacyRef first (SOC-13)')
  }
})
