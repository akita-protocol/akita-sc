#!/usr/bin/env node
/**
 * Opt the new Rewards app in to every asset the old one holds (rollout step D2).
 *
 * Run it between the Rewards deploy and the `--register` cutover:
 *   npm run deploy:rewards -- -n mainnet -v "$V" --manifest receipts/rewards.json
 *   npm run rewards:opt-in -- -n mainnet --manifest receipts/rewards.json
 *   npm run deploy:rewards -- -n mainnet -v "$V" --manifest receipts/rewards.json --register
 *
 * The receipt names both apps (the new one, and the one `aal.rewards` pointed at when it was deployed).
 * Any funded account can send the opt-ins. Assets the new app already holds are skipped, so a rerun
 * only finishes what is left. `--dry-run` prints the plan and sends nothing.
 */
import fs from 'node:fs'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { planRewardsOptIns, runRewardsOptIns } from './lib/rewards-opt-ins'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('opt-in-rewards-assets.ts', `
  --manifest <json>   The deploy:rewards receipt; names the new app and the one it replaces
  --rewards <id>      The new Rewards app (default: the receipt's app)
  --from <id>         The Rewards app whose assets are mirrored (default: the receipt's old app, else the DAO's aal.rewards)
  --asset <id[,id]>   Extra assets to opt in to`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const ctx = await setupContext(options, { minBalance: 1_000_000n })

  let receipt: { contract?: string; network?: string; appId?: string; oldAppId?: string } = {}
  const manifest = value('--manifest')
  if (manifest) {
    if (!fs.existsSync(manifest)) throw new Error(`${manifest}: no receipt there yet. Run deploy:rewards with this --manifest first (rollout step D2)`)
    receipt = JSON.parse(fs.readFileSync(manifest, 'utf8'))
    if (receipt.contract !== 'Rewards' || receipt.network !== options.network) {
      throw new Error(`${manifest}: receipt is for ${receipt.contract} on ${receipt.network}`)
    }
    if (!receipt.appId) throw new Error(`${manifest}: deployment is unresolved (no appId)`)
  }
  const to = BigInt(value('--rewards') ?? receipt.appId ?? 0)
  if (to <= 0n) throw new Error('Pass --manifest (the deploy:rewards receipt) or --rewards <id>')
  const pointer = (await ctx.dao.client.state.global.akitaAppList())?.rewards ?? 0n
  const from = BigInt(value('--from') ?? receipt.oldAppId ?? (pointer !== to ? pointer : ctx.appIds.rewardsV1 ?? 0n))
  const extra = (value('--asset') ?? '').split(',').map((s) => s.trim()).filter(Boolean).map((s) => {
    if (!/^[1-9][0-9]*$/.test(s)) throw new Error(`--asset ${s} is not an asset id`)
    return BigInt(s)
  })

  const plan = await planRewardsOptIns(ctx, from, to, extra)
  console.log(`Assets wanted (those Rewards ${plan.from} holds${extra.length ? ', plus --asset' : ''}): ${plan.wanted.length}`)
  console.log(`Rewards ${plan.to} lacks ${plan.missing.length}: ${plan.missing.join(', ') || 'none'}`)
  if (plan.missing.length === 0) { console.log('Nothing to do.'); return }
  console.log(`Cost: ${plan.missing.length} x 100,000 microAlgos held by the app, plus fees`)
  if (options.dryRun) { console.log(`DRY RUN - would send ${plan.missing.length} opt-in group(s); nothing sent.`); return }

  await runRewardsOptIns(ctx, plan)
  console.log(`Rewards ${plan.to} now holds every asset Rewards ${plan.from} holds.`)
})
