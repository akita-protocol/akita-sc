#!/usr/bin/env node
/**
 * Read-only MainNet/TestNet rollout tracker for the 2026-10 release (docs/rollout/MAINNET-ROLLOUT.md).
 * Each step is checked against live chain state: done (the live program or pointer is the tree's),
 * ready (every hard prerequisite is done), or blocked (names the prerequisites still missing).
 * Never signs: the context is built in dry-run mode, whose signer throws.
 *
 * Usage (from projects/akita-sc):
 *   npx ts-node --transpile-only scripts/rollout-status.ts --network mainnet [--json]
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { readRolloutStatus } from './lib/rollout-steps'

runScript(async () => {
  if (!process.argv.includes('--dry-run')) process.argv.push('--dry-run')
  const options = parseBaseArgs('rollout-status.ts', '  --json                      Print machine-readable JSON')
  const json = process.argv.includes('--json')
  const ctx = await setupContext(options)
  const network = options.network
  const { rows, daoState: state } = await readRolloutStatus(ctx)

  if (json) {
    console.log(JSON.stringify(rows, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
    return
  }
  const mark = { done: '✓', ready: '→', blocked: '·' } as const
  console.log(`Rollout status on ${network} (DAO ${ctx.dao.appId}, state ${state})`)
  // Dry runs simulate as this account; only it can send the rollout's proposals before initialize().
  console.log(`DAO creator: ${(await ctx.algorand.app.getById(ctx.dao.appId)).creator}\n`)
  let stage = ''
  for (const r of rows) {
    if (r.stage !== stage) console.log(`\nStage ${stage = r.stage}`)
    console.log(`  ${mark[r.status as keyof typeof mark]} ${r.title}`)
    console.log(`      ${r.detail}`)
    if (r.status === 'blocked') console.log(`      blocked by: ${r.missing.join(', ')}`)
    else if (r.status === 'ready') console.log(`      run: ${r.run}`)
  }
  console.log('\nNot tracked here (no chain fact names them; check the runbook): the Listing notice (D1a) and the push and tag (I2).')
})
