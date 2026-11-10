#!/usr/bin/env node
/** Offline inventory only. Never loads script-base, environment files, signers, or network clients.
 * Usage (repository root): node projects/akita-sc/scripts/plan-puyats-migration.mjs
 * Redirect stdout to save a release snapshot. HEAD comparisons are NOT on-chain comparisons.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const root = path.resolve(project, '../..')
const artifacts = path.join(project, 'smart_contracts/artifacts')
const hash = (value) => createHash('sha256').update(value).digest('hex')
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)])
const relative = (file) => path.relative(root, file).split(path.sep).join('/')
const routes = new Map()
function route(names, executionPath, notes = '') {
  for (const name of names.split(',')) routes.set(name, { executionPath, notes })
}
route('AkitaDAO', 'update:dao', 'Validator cutover and DAO upgrade must be compatible with the CURRENT wallet/DAO ABI.')
route('AkitaDAOProposalValidator', 'update:dao --validator-app-id', 'Fresh deployment in update:dao; persist ID before changing oal.daoProposalValidator.')
route('AbstractedAccount', 'update:wallet-factory --update-factory; update:dao-wallet; update:automatic-wallets', 'Lands with its factory in one group (ACCT-3: the deployed AVM 11 factory cannot create the AVM 13 wallet). bc upload only affects future wallets; inventory existing wallets and update policy separately.')
route('AbstractedAccountFactory', 'update:wallet-factory --update-factory (Phase 2 --target AbstractedAccountFactory)', 'Factory and wallet child in one group; update:account-factory refuses (ROLLOUT-3).')
route('AbstractedAccountMBR', 'deploy:wallet-mbr', 'Missing automatic SDK walletMbr registration.')
route("AbstractedAccountBalanceReader", "deploy:wallet-balance-reader", "Receipt ID configured explicitly; uses existing test schema override.")
route('AuctionFactory', 'update:auction', 'Updates app and boxed Auction approval. update:auction-factory updates only the app.')
route('RaffleFactory', 'update:raffle', 'Updates app and boxed Raffle approval.')
route('StakingPoolFactory', 'update:staking-pool', 'Updates app and boxed StakingPool approval; includes box-growth funding.')
route('Marketplace', 'update:marketplace', 'Updates app and boxed Listing approval.')
route('PollFactory', 'update:poll', 'Poll child is embedded; no bc upload needed.')
route('PrizeBoxFactory', 'update:prize-box', 'PrizeBox child is embedded; no bc upload needed.')
route('Staking', 'update:staking', 'Preserve staking state; deploy:staking is a separate state migration.')
route('Subscriptions', 'update:subscriptions')
route('AkitaSocial,AkitaSocialGraph,AkitaSocialImpact,AkitaSocialModeration', 'update:social --contracts social,socialGraph,socialImpact,socialModeration', 'Default command updates only social.')
route("HyperSwap", "update:hyper-swap", "Update in place when the deployed program permits it; preserve outstanding swaps.")
route("Rewards", "deploy:rewards", "Keep old deployment for remaining rewards; dual-read clients before --register cuts over aal.rewards.")
route("EscrowFactory", "retain existing deployment", "Retain the separate EscrowFactory and existing children. Registry merge withdrawn; preserve DAO oal.escrow and existing addresses.")
route("Gate", "deploy:gates --contracts gate", "Unused per owner; no existing gate-definition migration. --register guards DAO pointer and records SDK ID.")
route("Meta", "deploy:meta", "Explicit receipt ID; no automatic legacy metaMerkles pointer replacement.")
route("PluginDex", "deploy:plugin-dex", "Record receipt; configure admin/consumers explicitly.")
route("GuildFactory,GuildConsensusFactory", "deploy:guild-factory", "Not yet deployed per owner; fresh pair only, no existing migration.")
route("Guild", "deploy:guild-factory (template)", "No existing Guild deployments in scope.")
route("FixedSignerGuildConsensus,LockedTokenGuildConsensus,SubscriptionGuildConsensus", "deploy:guild-factory (templates)", "Fresh templates and future factory-created instances; no existing consensus migration.")
route("Auction,Raffle,StakingPool", "update:children --kind <auction|raffle|staking-pool> --factory-id ID --app-ids IDS", "Factory template updates do not update existing children. Paginated --all, creator/DAO/schema preflight and post-update verification.")
route('Listing,Poll,PrizeBox,Escrow', 'parent factory for future instances', 'Immutable existing instances stay available for settlement/use; never replace identities blindly.')
route('AkitaDAOTypes,AbstractedAccountUpdateStub,SunsetContract,WalletFactorySunsetContract', 'not a routine deployment', 'ABI helper, temporary bootstrap, or terminal cleanup program; not part of the normal rollout.')
const pluginScripts = {
  AsaManagerPlugin: 'asa-manager', AuctionPlugin: 'auction', DualStakePlugin: 'dual-stake',
  HaystackRouterPlugin: 'haystack-router', MarketplacePlugin: 'marketplace', NFDPlugin: 'nfd',
  OptInPlugin: 'optin', RafflePlugin: 'raffle', RevenueManagerPlugin: 'revenue-manager',
  RewardsPlugin: 'rewards', SelfOptInPlugin: 'self-optin', AkitaSocialPlugin: 'social',
  StakingPlugin: 'staking', StakingPoolPlugin: 'staking-pool', SubscriptionsPlugin: 'subscriptions',
  UpdateAkitaDAOPlugin: 'update',
}
for (const [name, script] of Object.entries(pluginScripts)) {
  route(name, `deploy:${script}-plugin`, 'Fresh ID; registry history and wallet grants are separate. See runbook for PAL and special rotation requirements.')
}

// Shared immutable deployer covers every formerly missing plugin and all 16 subgates.
const immutableCatalog = JSON.parse(fs.readFileSync(path.join(project, 'scripts/lib/immutable-catalog.json'), 'utf8'))
for (const [name, entry] of Object.entries(immutableCatalog)) {
  route(name, `deploy:immutable --contract ${name}`, entry.registryKey
    ? 'Durable deployment receipt, funding and optional --register for SDK history/pointers; wallet grants are separate.'
    : 'Durable receipt and funding; consumers require explicit ID configuration (no canonical SDK key).')
}
route('Rewards', 'deploy:rewards', 'Keep legacy rewards available; dual-read clients before --register changes aal.rewards.')
route('Gate', 'deploy:gates --contracts gate', 'Unused per owner. All 16 subgates now covered; --register guards DAO pointer and publishes SDK IDs.')

function programVersion(bytes) {
  let value = 0, shift = 0
  for (const byte of bytes) {
    value += (byte & 127) * 2 ** shift
    if (!(byte & 128)) return value
    shift += 7
    if (shift > 49) break
  }
  return null
}
const skipped = /\/(mocks|mock-beacon|tests|test-close-out|test-proxy-rekey)\//
const rows = []
for (const file of walk(artifacts).filter((f) => f.endsWith('.arc56.json') && !skipped.test(f))) {
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (spec.name.startsWith('Mock')) continue
  const approval = spec.byteCode?.approval ? Buffer.from(spec.byteCode.approval, 'base64') : null
  const clear = spec.byteCode?.clear ? Buffer.from(spec.byteCode.clear, 'base64') : null
  const total = approval && clear ? approval.length + clear.length : null
  const updateMethods = spec.methods.filter((m) => m.actions?.call?.includes('UpdateApplication')).map((m) => m.name)
  const bareUpdate = spec.bareActions?.call?.includes('UpdateApplication') ?? false
  let head = null
  try { head = JSON.parse(execFileSync('git', ['show', `HEAD:${relative(file)}`], { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] })) } catch { /* New artifacts have no HEAD baseline. */ }
  const plan = routes.get(spec.name)
  rows.push({
    name: spec.name, artifact: relative(file), artifactSha256: hash(fs.readFileSync(file)),
    sourceLifecycle: updateMethods.length || bareUpdate ? 'update-handler-present' : 'no-update-handler',
    updateMethods, bareUpdate,
    approvalBytes: approval?.length ?? null, clearBytes: clear?.length ?? null, totalBytes: total,
    approvalVersion: approval ? programVersion(approval) : null, clearVersion: clear ? programVersion(clear) : null,
    approvalSha256: approval ? hash(approval) : null, clearSha256: clear ? hash(clear) : null,
    extraPagesNeeded: total === null ? null : Math.max(0, Math.ceil(total / 2048) - 1),
    exceedsLegacyProgramLimit: total === null ? null : total > 8192,
    exceedsV42ProgramLimit: total === null ? null : total > 16384,
    bytecodeChangedFromHead: !head ? null : head.byteCode?.approval !== spec.byteCode?.approval || head.byteCode?.clear !== spec.byteCode?.clear,
    templateVariables: Object.keys(spec.templateVariables ?? {}),
    schema: spec.state?.schema, compiler: spec.compilerInfo,
    executionPath: plan?.executionPath ?? null,
    notes: plan?.notes ?? 'UNREVIEWED: add a lifecycle and script coverage decision.',
    reviewed: Boolean(plan),
  })
}
rows.sort((a, b) => a.name.localeCompare(b.name))
const logicSignatures = walk(artifacts).filter((f) => /\/arc58\/keys\/.*\.teal$/.test(f)).map((file) => ({
  file: relative(file), sourceSha256: hash(fs.readFileSync(file)),
  action: 'Recompile and compare program/address; inventory delegation, wallet registrations and passkey integrations before rotation.',
}))
const scriptsWithConditionalDryRun = walk(path.join(project, 'scripts')).filter((f) => f.endsWith('.ts')).filter((f) =>
  /if \(options\.dryRun && !options\.mnemonic && options\.network !== 'localnet'\)/.test(fs.readFileSync(f, 'utf8'))).map(relative)
const report = {
  kind: 'offline-planning-inventory', generatedAt: new Date().toISOString(),
  head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  targetNetwork: null, liveStateVerified: false,
  rebuildVerification: 'Not performed by this inventory command; see runbook validation record.',
  scriptsExecutionVerified: false,
  limitations: ['Working-tree artifacts only; HEAD is not deployed bytecode.', 'An update handler in candidate code does not prove the live contract can update.', 'Execution paths describe existing entry points, not approved or verified runnable commands.', 'Missing paths are intentional release blockers; this tool never deploys.'],
  counts: { artifacts: rows.length, withUpdateHandler: rows.filter((r) => r.sourceLifecycle === 'update-handler-present').length, withoutUpdateHandler: rows.filter((r) => r.sourceLifecycle === 'no-update-handler').length, changedFromHead: rows.filter((r) => r.bytecodeChangedFromHead === true).length, noHeadBaseline: rows.filter((r) => r.bytecodeChangedFromHead === null).length, unreviewed: rows.filter((r) => !r.reviewed).length },
  scriptsWithConditionalDryRun, logicSignatures, contracts: rows,
}
console.log(JSON.stringify(report, null, 2))
if (!rows.length || rows.some((r) => !r.reviewed || r.totalBytes === null || r.exceedsV42ProgramLimit)) process.exitCode = 1
