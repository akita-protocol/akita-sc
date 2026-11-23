#!/usr/bin/env node
/**
 * Register MetaPlugin as Meta's grant policy writer (rollout H1, after deploy:meta-plugin). Meta lets its
 * creator set the writer once while it is unset; after that only the DAO wallet can change it. Without a
 * writer no wallet can store a grant policy, so a plugin that reads one (PayPlugin on rec_krby, H6)
 * refuses every delegated call.
 *
 * Usage (from projects/akita-sc):
 *   npm run set:policy-writer -- -n mainnet --dry-run --sender "$CREATOR"
 *   npm run set:policy-writer -- -n mainnet --confirm
 */
import dotenv from 'dotenv'
import { MetaClient } from '../smart_contracts/artifacts/meta/MetaClient'
import { parseBaseArgs, runScript, setupContext } from './script-base'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('set-policy-writer.ts', `
  --confirm           Send the call (plans only without it)`)
  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  const meta = ctx.appIds.meta
  const writer = ctx.appIds.metaPlugin
  if (!meta || !writer) throw new Error('The SDK records no meta or metaPlugin id for this network. Run deploy:meta and deploy:meta-plugin with --register, then rebuild the SDK')

  const sender = options.dryRun ? options.sender ?? (await ctx.algorand.app.getById(meta)).creator.toString() : ctx.sender
  const client = ctx.algorand.client.getTypedAppClientById(MetaClient, { appId: meta, defaultSender: sender, defaultSigner: ctx.signer })
  const current = (await client.state.global.policyWriter()) ?? 0n
  console.log(`Meta ${meta} on ${options.network}: policy writer ${current || 'unset'}, MetaPlugin ${writer}`)
  if (current === writer) return console.log('Nothing to do.')
  if (current !== 0n) throw new Error(`Meta already has policy writer ${current}; only the DAO wallet can change it now`)

  if (options.dryRun || !args.includes('--confirm')) {
    await client.newGroup().setPolicyWriter({ args: { writer } }).simulate({ allowUnnamedResources: true, skipSignatures: true })
    return console.log(`\nsetPolicyWriter(${writer}) simulates as ${sender}. Nothing was sent; pass --confirm to send.`)
  }
  await client.send.setPolicyWriter({ args: { writer } })
  const after = await client.state.global.policyWriter()
  if (after !== writer) throw new Error(`Meta ${meta} reads policy writer ${after} after the call, not ${writer}`)
  console.log(`Meta ${meta} now accepts grant policies only from MetaPlugin ${writer}`)
})
