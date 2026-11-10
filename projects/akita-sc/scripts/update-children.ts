#!/usr/bin/env node
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { childKinds, type ChildKind, discoverChildren, updateChildren } from './lib/child-updates'
runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('update-children.ts', `
  --kind <auction|raffle|staking-pool>   Required child family
  --factory-id <id>                    Required parent factory (run once per generation)
  --app-ids <id,id>                     Explicit selection, or --all to discover via indexer
  --all                                Select all undeleted children of this factory
  Dry runs read and compile only. Resume one child with --app-ids ID --proposal-id ID.`)
  const kind = value('--kind') as ChildKind
  if (!childKinds.includes(kind)) throw new Error('A valid --kind is required')
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const factoryId = BigInt(value('--factory-id') ?? '0')
  if (factoryId <= 0n) throw new Error('--factory-id is required')
  if (Boolean(value('--app-ids')) === args.includes('--all')) throw new Error('Choose exactly one of --app-ids or --all')
  const ctx = await setupContext(options)
  const ids = value('--app-ids')?.split(',').map(BigInt) ?? await discoverChildren(ctx, factoryId)
  if (!ids.length) { console.log('No children found; verify indexer synchronization before marking this generation complete.'); return }
  await updateChildren(ctx, kind, factoryId, ids)
})
