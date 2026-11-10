#!/usr/bin/env node

/**
 * Update historical plugin deployments installed on the DAO wallet.
 *
 * The script discovers every wallet grant whose app ID is present in the SDK
 * deployment registry (or named by --replace) and replaces stale app IDs with
 * the latest deployment. Each replacement preserves the configurable permission
 * policy (caller, escrow scope, delegation, cooldowns, method restrictions,
 * clock mode, execution-key policy, fee coverage and DAO proposal settings);
 * see `scripts/lib/dao-wallet-plugin-migration.ts` for the full rules.
 *
 * Principal-resolution rollout additions (docs/principal-resolution/PHASE-0-SPEC.md §7.1):
 *   - Replacing the Update plugin grant also repoints the DAO's pal.update in the
 *     same proposal (Phase 2a).
 *   - --replace key:to | key:from:to names new app ids explicitly, so Phase 3 can
 *     swap grants before the SDK registry is rebuilt, and LocalNet rehearsals work.
 *   - --unname-aliases replaces a named grant with an unnamed one (the manual path
 *     of scripts/install-dao-social-caller.ts); the alias is dropped.
 *   - --add-method key:method adds new methods (e.g. socialPlugin:setMetaWallet)
 *     to METHOD-RESTRICTED grants of that plugin.
 *
 * Usage:
 *   npm run update:dao-wallet-plugins -- --network mainnet --dry-run
 *   npm run update:dao-wallet-plugins -- --network mainnet --plugin socialPlugin --dry-run
 *   npm run update:dao-wallet-plugins -- --network mainnet --replace socialPlugin:<newId> --add-method socialPlugin:setMetaWallet --dry-run
 *   npm run update:dao-wallet-plugins -- --network mainnet --confirm-update -m "$MNEMONIC"
 *   npm run update:dao-wallet-plugins -- --network mainnet --confirm-update --submit -m "$MNEMONIC"
 *   npm run update:dao-wallet-plugins -- --network mainnet --confirm-update --proposal-id 123 -m "$MNEMONIC"
 *   npm run update:dao-wallet-plugins -- --network localnet --dao-app-id <id> --replace updatePlugin:<old>:<new> --confirm-update
 */

import dotenv from 'dotenv'
import { executeProposal } from './utils'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { createMigrationPlan, DEFAULT_SOURCE_LINK, runMigration } from './lib/dao-wallet-plugin-migration'
import { parseAddMethod, parseReplacement, type GrantReplacement } from './lib/principal-rollout'

interface ExtraArgs {
  pluginFilters: string[]
  sourceLink: string
  confirmUpdate: boolean
  submit: boolean
  replacements: GrantReplacement[]
  unnameAliases: boolean
  addMethods: Record<string, string[]>
}

function requestedNetwork(): string {
  const args = process.argv.slice(2)
  const index = args.findIndex((arg) => arg === '--network' || arg === '-n')
  return index >= 0 ? (args[index + 1] ?? 'localnet') : (process.env.ALGORAND_NETWORK ?? 'localnet')
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  const extra: ExtraArgs = {
    pluginFilters: [],
    sourceLink: DEFAULT_SOURCE_LINK,
    confirmUpdate: false,
    submit: false,
    replacements: [],
    unnameAliases: false,
    addMethods: {},
  }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--plugin') {
      const value = args[++i]
      if (!value) throw new Error('--plugin requires a plugin key, name, or app ID')
      extra.pluginFilters.push(
        ...value
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean),
      )
    } else if (args[i] === '--source-link') {
      extra.sourceLink = args[++i]
      if (!extra.sourceLink) throw new Error('--source-link requires a URL')
    } else if (args[i] === '--confirm-update') {
      extra.confirmUpdate = true
    } else if (args[i] === '--submit') {
      extra.submit = true
    } else if (args[i] === '--replace') {
      extra.replacements.push(parseReplacement(args[++i] ?? ''))
    } else if (args[i] === '--unname-aliases') {
      extra.unnameAliases = true
    } else if (args[i] === '--add-method') {
      const { key, methods } = parseAddMethod(args[++i] ?? '')
      extra.addMethods[key] = [...(extra.addMethods[key] ?? []), ...methods]
    }
  }

  return extra
}

runScript(async () => {
  dotenv.config({ path: `.env.${requestedNetwork()}` })
  const extra = parseExtraArgs()
  const options = parseBaseArgs(
    'update-dao-wallet-plugins.ts',
    `
Additional options:
  --plugin <key|name|appId>  Restrict updates to a plugin. Repeat or comma-separate values.
  --replace <key:to|key:from:to>
                             Replace grants of a plugin key with app <to> (key:to uses the SDK registry to
                             find installed versions; key:from:to names the installed app). Repeatable.
  --unname-aliases           Replace a named grant with an unnamed grant (the alias is removed).
  --add-method <key:m[,m]>   Add new methods to method-restricted grants of <key> (e.g. socialPlugin:setMetaWallet).
  --source-link <url>        Proposal source link. Default: ${DEFAULT_SOURCE_LINK}
  --confirm-update           Required for funding, proposal creation, submission, or execution.
  --submit                   Submit created proposals for voting when the DAO is fully initialized.

Use --proposal-id <id> with --confirm-update to execute an existing approved proposal.
Without --submit, a fully initialized DAO receives draft proposals.`,
  )

  if (options.network === 'localnet' && extra.replacements.every((r) => r.from === undefined)) {
    throw new Error(
      'The SDK plugin deployment registry has no canonical localnet history; use testnet or mainnet, ' +
      'or name the installed apps with --replace key:from:to (and --dao-app-id)',
    )
  }

  const ctx = await setupContext(options, { minBalance: 100_000n })
  const daoApp = await ctx.algorand.app.getById(ctx.dao.appId)
  const daoCreator = daoApp.creator.toString()
  const effectiveSender = options.dryRun ? daoCreator : ctx.sender
  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })
  const planOptions = {
    effectiveSender,
    filters: extra.pluginFilters,
    sourceLink: extra.sourceLink,
    replacements: extra.replacements,
    unnameAliases: extra.unnameAliases,
    addMethods: extra.addMethods,
  }

  if (options.proposalId !== undefined) {
    const proposal = await ctx.dao.getProposal(options.proposalId)
    console.log(`Proposal ${options.proposalId}: status=${proposal.status}, actions=${proposal.actions.length}`)
    if (options.dryRun) {
      console.log('DRY RUN - would execute the existing proposal and then rescan plugin versions.')
      return
    }
    if (!extra.confirmUpdate) throw new Error('Pass --confirm-update to execute the proposal')
    await executeProposal(ctx.dao, options.proposalId)
    console.log(`Executed proposal ${options.proposalId}`)
    const remaining = await createMigrationPlan(ctx, planOptions)
    console.log(`Remaining stale grants matching filters: ${remaining.migrations.length}`)
    return
  }

  if (!options.dryRun && !extra.confirmUpdate) {
    // Plan first so the operator sees exactly what would change.
    await runMigration(ctx, { ...planOptions, confirm: false })
    throw new Error('Pass --confirm-update after reviewing the --dry-run output')
  }

  const result = await runMigration(ctx, { ...planOptions, confirm: extra.confirmUpdate, submit: extra.submit })
  if (result.proposalIds.length === 0) return

  const daoState = (await ctx.dao.client.state.global.getAll()).state
  console.log('\n' + '='.repeat(72))
  console.log('DAO WALLET PLUGIN UPDATE PROPOSAL(S) CREATED')
  console.log('='.repeat(72))
  console.log(`  Network: ${options.network}`)
  console.log(`  Grants: ${result.migrations.length}`)
  console.log(`  Proposal IDs: ${result.proposalIds.join(', ')}`)
  console.log(
    `  Status: ${
      result.executed
        ? 'executed and verified'
        : extra.submit
          ? 'submitted for voting'
          : `draft (DAO state ${daoState})`
    }`,
  )
})
