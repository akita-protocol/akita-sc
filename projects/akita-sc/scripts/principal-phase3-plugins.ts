#!/usr/bin/env node

/**
 * Principal resolution, Phase 3 (docs/principal-resolution/PHASE-0-SPEC.md §7.1, §7.3): plugins.
 *
 * Deploys the new plugin versions from the immutable catalog (AkitaSocialPlugin, SubscriptionsPlugin,
 * StakingPoolPlugin, AuctionPlugin, MarketplacePlugin, RafflePlugin, WelcomePlugin), then replaces the DAO
 * wallet's grants of the old versions with grants of the new ones, keeping every grant's policy. Phase 2 must have landed:
 * the new plugins call hinted selectors that revert on un-upgraded targets. Before any deploy or swap the
 * script checks every method each new plugin calls against the live singleton, the child program its
 * factory stages, and the DAO's Gate, and refuses on a gap (--allow-unupgraded-targets overrides).
 *
 * Usage (always dry-run first):
 *   npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet --dry-run
 *   npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -m "$MNEMONIC" -v 2.0.0 \
 *     --manifest-dir receipts/phase3 --register --confirm
 *   npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -m "$MNEMONIC" \
 *     --deployed AkitaSocialPlugin=<id>,AuctionPlugin=<id> --swap --add-new-methods --confirm
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { runPhase3 } from './lib/principal-rollout-run'
import { LOCKSTEP_PLUGINS, PHASE3_PLUGINS } from './lib/principal-rollout'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('principal-phase3-plugins.ts', `
Phase 3 options:
  --plugin <Name[,Name]>     Only these catalog plugins (default: ${PHASE3_PLUGINS.map((p) => p.catalog).join(', ')};
                             also the Phase 2 lockstep plugins ${LOCKSTEP_PLUGINS.map((p) => p.catalog).join(', ')})
  --deployed <Name=id,...>   New versions that are already deployed (skip their deploy)
  --manifest-dir <dir>       Deployment receipts, one per plugin (resumable)
  --register                 Record new ids in the SDK registry (testnet/mainnet)
  --swap                     Replace the DAO wallet's grants of the old versions
  --unname-aliases           Replace named grants with unnamed ones (the alias is dropped)
  --add-new-methods          Add setMetaWallet to method-restricted social grants
  --submit                   Submit created proposals for voting (initialized DAO)
  --allow-unupgraded-targets Deploy/swap although a dependency lacks a method the plugin calls (override)
  --confirm                  Required for any write`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const only = (value('--plugin') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const plugins = only.length === 0 ? PHASE3_PLUGINS : only.map((name) => {
    const plugin = [...PHASE3_PLUGINS, ...LOCKSTEP_PLUGINS].find((p) => p.catalog === name)
    if (!plugin) throw new Error(`Unknown Phase 3 plugin ${name}`)
    return plugin
  })
  const deployed: Record<string, bigint> = {}
  for (const pair of (value('--deployed') ?? '').split(',').map((s) => s.trim()).filter(Boolean)) {
    const [name, id] = pair.split('=')
    if (!name || !/^[1-9][0-9]*$/.test(id ?? '')) throw new Error(`--deployed ${pair}: expected Name=id`)
    deployed[name] = BigInt(id)
  }
  const ctx = await setupContext(options, { minBalance: 5_000_000n })
  if (options.dryRun) ctx.dao.setSendParams({ sender: (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString(), signer: ctx.signer })
  const result = await runPhase3(ctx, {
    plugins,
    deployed,
    manifestDir: value('--manifest-dir'),
    register: args.includes('--register'),
    swap: args.includes('--swap'),
    unnameAliases: args.includes('--unname-aliases'),
    addNewMethods: args.includes('--add-new-methods'),
    submit: args.includes('--submit'),
    confirm: args.includes('--confirm'),
    allowUnupgradedTargets: args.includes('--allow-unupgraded-targets'),
  })
  console.log('\nPhase 3 deployed:', Object.entries(result.deployed).map(([k, v]) => `${k}=${v}`).join(', ') || '(none)')
})
