#!/usr/bin/env node

/**
 * Principal resolution, Phase 2a (docs/principal-resolution/PHASE-0-SPEC.md §7.1): the upgrade path.
 *
 * The deployed UpdateAkitaDAOPlugin pushes at most 8,192 B with no page growth and no schema, so it
 * cannot push AkitaSocial or Subscriptions. This script:
 *   1. deploys the page-growing UpdateAkitaDAOPlugin from the immutable catalog (or verifies --plugin-id),
 *   2. creates ONE DAO proposal: pal.update = new, AddPlugin new (settings copied from the old grant),
 *      RemovePlugin old. Before DAO initialization the creator executes it at once; afterwards it is a draft,
 *   3. optionally funds the DAO wallet for the Phase 2 size sponsorship (--fund-sponsor).
 *
 * The new plugin binds each execution-key upgrade to its UpgradeApp action through DAO.mustGetExecution and
 * DAO.getProposal, which the deployed MainNet DAO implements, so after this repoint the DAO itself
 * (principal-phase2-upgrade-targets.ts --target AkitaDAO) and the Phase 2 targets upgrade in any order.
 * The script REFUSES when the DAO lacks those methods, or when the plugin artifact lacks them (stale build).
 * A --plugin-id must run this tree's artifact or the program its --manifest receipt recorded.
 *
 * Usage (always dry-run first):
 *   npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet --dry-run --sender <creator>
 *   npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet -m "$MNEMONIC" -v 2.0.0 \
 *     --manifest receipts/update-plugin.json --register --confirm [--fund-sponsor]
 *   npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet -m "$MNEMONIC" --plugin-id <id> --confirm
 *
 * On a fully initialized DAO the proposal is a draft (or submitted with --submit). After the vote, execute it with
 *   npx ts-node --transpile-only scripts/update-dao-wallet-plugins.ts -n mainnet -m "$MNEMONIC" --proposal-id <id> --confirm-update
 * and re-run this script: it detects that pal.update already runs the new plugin and only reports.
 *
 * Supersedes scripts/deploy-update-plugin.ts for this rollout: that script repoints pal.update, removes the old
 * grant and installs the new one in THREE proposals, which leaves windows with a role and no grant (or the reverse).
 */
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { runPhase2a } from './lib/principal-rollout-run'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('principal-phase2a-update-plugin.ts', `
Phase 2a options:
  --plugin-id <id>      Use an already-deployed new Update plugin (verified against the artifact or its
                        --manifest receipt, and by behaviour)
  --manifest <json>     Deployment receipt for the catalog deploy (resumable)
  --register            Record the new plugin in the SDK registry (testnet/mainnet)
  --fund-sponsor        Fund the DAO wallet for the Phase 2 size sponsorship
  --source-link <url>   Proposal source link
  --submit              Submit the proposal for voting (initialized DAO)
  --confirm             Required for any write`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const pluginId = value('--plugin-id')
  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  if (options.dryRun) ctx.dao.setSendParams({ sender: (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString(), signer: ctx.signer })
  const result = await runPhase2a(ctx, {
    newPluginId: pluginId ? BigInt(pluginId) : undefined,
    manifest: value('--manifest'),
    register: args.includes('--register'),
    fundSponsor: args.includes('--fund-sponsor'),
    sourceLink: value('--source-link'),
    submit: args.includes('--submit'),
    confirm: args.includes('--confirm'),
  })
  console.log(`\nPhase 2a: old Update plugin ${result.oldPluginId}, new ${result.newPluginId ?? '(not deployed)'}` +
    `${result.migration?.proposalIds.length ? `, proposal(s) ${result.migration.proposalIds.join(', ')}` : ''}`)
})
