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
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { getPluginUpdate, REGISTRY_WRITES_STOPPED, SOCIAL_HINTED_TARGETS, type PluginAppIdKey } from 'akita-sdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { DAO_STATE_FULLY_INITIALIZED } from './lib/dao-wallet-plugin-migration'
import { isPhase2aUpdatePlugin, readFactoryChild, readLiveApp } from './lib/principal-rollout-run'
import { loadCompiled, PHASE2_RIDE_ALONG_TARGETS, PHASE2_TARGETS } from './lib/principal-rollout'
import { readHeartbeatManager } from './lib/heartbeat-manager'

type Status = { done: boolean; detail: string }
type Step = { id: string; stage: string; title: string; requires: readonly string[]; run: string; check: () => Promise<Status> }

const same = (a?: Uint8Array, b?: Uint8Array) => !!a && !!b && Buffer.from(a).equals(Buffer.from(b))

runScript(async () => {
  if (!process.argv.includes('--dry-run')) process.argv.push('--dry-run')
  const options = parseBaseArgs('rollout-status.ts', '  --json                      Print machine-readable JSON')
  const json = process.argv.includes('--json')
  const ctx = await setupContext(options)
  const network = options.network

  const programs = new Map<bigint, Promise<Uint8Array | undefined>>()
  const program = (appId: bigint | undefined) => {
    if (!appId) return Promise.resolve(undefined)
    if (!programs.has(appId)) programs.set(appId, readLiveApp(ctx, appId).then((a) => a.approval, () => undefined))
    return programs.get(appId)!
  }
  const runsTree = async (label: string, appId: bigint | undefined, artifact: string): Promise<Status> => {
    const live = await program(appId)
    if (!live) return { done: false, detail: `${label}: app ${appId ?? '(unset)'} not found` }
    return same(live, loadCompiled(artifact).approval)
      ? { done: true, detail: `${label} ${appId} runs the tree program` }
      : { done: false, detail: `${label} ${appId} runs another program` }
  }

  const g = ctx.dao.client.state.global
  const [aal, oal, pal, state, guildFees] = await Promise.all([
    g.akitaAppList(), g.otherAppList(), g.pluginAppList(), g.state(), g.guildFees().catch(() => undefined),
  ])
  const grants = await (await ctx.dao.getWallet()).client.state.box.plugins.getMap()
  const staleDaoGrants = (key: PluginAppIdKey) => [...grants.keys()]
    .filter((k) => getPluginUpdate(network, k.plugin)?.current.key === key).length

  const steps: Step[] = []
  const add = (step: Step) => steps.push(step)

  add({ id: 'phase2a', stage: 'B', title: 'Phase 2a: tree UpdateAkitaDAOPlugin holds pal.update', requires: [],
    run: 'scripts/principal-phase2a-update-plugin.ts --confirm --fund-sponsor', check: async () => {
      const ok = !!pal?.update && await isPhase2aUpdatePlugin(ctx, pal.update)
      const sdk = ctx.appIds.updatePlugin === pal?.update
      return { done: ok && sdk, detail: `pal.update = ${pal?.update}${ok ? ' (Phase 2a plugin)' : ''}; SDK updatePlugin = ${ctx.appIds.updatePlugin}${sdk ? '' : ' (rebuild akita-sdk after --register)'}` }
    } })
  add({ id: 'dao', stage: 'B', title: 'AkitaDAO upgraded (stays Draft)', requires: ['phase2a'],
    run: 'npm run update:dao (validator, oal repoint, then --target AkitaDAO)', check: () => runsTree('AkitaDAO', ctx.dao.appId, 'arc58/dao/AkitaDAO.arc56.json') })
  add({ id: 'validator', stage: 'B', title: 'oal.daoProposalValidator is the tree validator', requires: [],
    run: 'npm run update:dao', check: () => runsTree('validator', oal?.daoProposalValidator, 'arc58/dao/AkitaDAOProposalValidator.arc56.json') })
  add({ id: 'guild-fees', stage: 'B', title: 'guild_fees set through UpdateFields', requires: ['dao', 'validator'],
    run: 'scripts/update-guild-creation-cost.ts', check: async () => ({ done: guildFees !== undefined, detail: guildFees ? `guild_fees = ${JSON.stringify(guildFees, (_, v) => typeof v === 'bigint' ? v.toString() : v)}` : 'guild_fees absent' }) })

  add({ id: 'gate', stage: 'C', title: 'Gate v2 at aal.gate (sub-gates allowlisted, imports sealed)', requires: [],
    run: 'npm run deploy:gates -- --contracts gate,<sub-gates> --manifest-dir R --register; scripts/allowlist-sub-gates.ts; scripts/seal-gate-imports.ts',
    check: () => runsTree('aal.gate', aal?.gate, 'gates/Gate.arc56.json') })
  add({ id: 'staking', stage: 'D', title: 'Staking upgraded in place', requires: [],
    run: 'npm run update:staking', check: () => runsTree('aal.staking', aal?.staking, 'staking/Staking.arc56.json') })
  add({ id: 'rewards', stage: 'D', title: 'Rewards v2 at aal.rewards', requires: [],
    run: 'npm run deploy:rewards -- --manifest R/rewards.json --register', check: () => runsTree('aal.rewards', aal?.rewards, 'rewards/Rewards.arc56.json') })
  add({ id: 'heartbeat', stage: 'D', title: 'Staking heartbeat manager set by the DAO wallet', requires: ['staking', 'plugin:stakingPlugin'],
    run: 'npm run staking:set-heartbeat-manager -- --manager <ADDR>', check: async () => {
      const manager = aal?.staking ? await readHeartbeatManager(ctx, aal.staking) : undefined
      const set = manager !== undefined && manager !== ALGORAND_ZERO_ADDRESS_STRING
      return { done: set, detail: `aal.staking ${aal?.staking} heartbeat_manager_address = ${set ? manager : '(unset)'}` }
    } })

  const gatedPhase2 = new Set(['AkitaSocial', 'Subscriptions', 'Marketplace', 'StakingPoolFactory', 'AuctionFactory', 'RaffleFactory'])
  for (const t of [...PHASE2_TARGETS, ...PHASE2_RIDE_ALONG_TARGETS]) {
    const requires = ['phase2a', ...(gatedPhase2.has(t.name) ? ['gate'] : []), ...(t.name === 'StakingPoolFactory' ? ['staking', 'rewards'] : [])]
    const ride = PHASE2_RIDE_ALONG_TARGETS.includes(t)
    add({ id: `p2:${t.name}`, stage: 'E', title: `${t.name}${t.child ? ` + ${t.child.name} child` : ''}`, requires, run: `scripts/principal-phase2-upgrade-targets.ts --target ${t.name} --confirm${ride ? ' (lockstep plugin)' : ''}`,
      check: async () => {
        const appId = (ctx.appIds as unknown as Record<string, bigint>)[t.appIdKey]
        const app = await runsTree(t.name, appId, t.artifact)
        if (!t.child) return app
        const child = same(await readFactoryChild(ctx, appId), loadCompiled(t.child.artifact).approval)
        return { done: app.done && child, detail: `${app.detail}; staged ${t.child.name} ${child ? 'is' : 'is not'} the tree child` }
      } })
  }
  for (const [name, key, artifact, run] of [
    ['AkitaSocialImpact', 'socialImpact', 'social/AkitaSocialImpact.arc56.json', 'npm run update:social -- --contracts socialImpact,socialModeration'],
    ['AkitaSocialModeration', 'socialModeration', 'social/AkitaSocialModeration.arc56.json', 'npm run update:social -- --contracts socialImpact,socialModeration'],
    ['PrizeBoxFactory', 'prizeBoxFactory', 'prize-box/PrizeBoxFactory.arc56.json', 'npm run update:prize-box'],
  ] as const) {
    add({ id: `ride:${name}`, stage: 'E', title: `${name} (ride-along, runUpdate)`, requires: [], run,
      check: () => runsTree(name, (ctx.appIds as unknown as Record<string, bigint>)[key], artifact) })
  }

  add({ id: 'dao-wallet', stage: 'F', title: 'DAO wallet runs the tree (AVM 13) wallet', requires: ['p2:AbstractedAccountFactory'],
    run: 'npm run update:dao-wallet, then npm run update:automatic-wallets', check: () => runsTree('DAO wallet', ctx.appIds.wallet, 'arc58/account/AbstractedAccount.arc56.json') })

  const plugins: readonly [PluginAppIdKey, string, readonly string[]][] = [
    ['socialPlugin', 'arc58/plugins/social/AkitaSocialPlugin.arc56.json', ['p2:AkitaSocial', 'p2:AkitaSocialGraph', 'gate']],
    ['subscriptionsPlugin', 'arc58/plugins/subscriptions/SubscriptionsPlugin.arc56.json', ['p2:Subscriptions', 'gate']],
    ['marketplacePlugin', 'arc58/plugins/marketplace/MarketplacePlugin.arc56.json', ['p2:Marketplace', 'gate']],
    ['stakingPoolPlugin', 'arc58/plugins/staking-pool/StakingPoolPlugin.arc56.json', ['p2:StakingPoolFactory', 'gate']],
    ['auctionPlugin', 'arc58/plugins/auction/AuctionPlugin.arc56.json', ['p2:AuctionFactory', 'gate']],
    ['rafflePlugin', 'arc58/plugins/raffle/RafflePlugin.arc56.json', ['p2:RaffleFactory', 'gate']],
    ['stakingPlugin', 'arc58/plugins/staking/StakingPlugin.arc56.json', ['staking']],
    ['rewardsPlugin', 'arc58/plugins/rewards/RewardsPlugin.arc56.json', ['rewards']],
    ['gatePlugin', 'arc58/plugins/gate/GatePlugin.arc56.json', ['gate']],
    ['daoPlugin', 'arc58/plugins/dao/AkitaDAOPlugin.arc56.json', ['dao']],
    ['hyperSwapPlugin', 'arc58/plugins/hyper-swap/HyperSwapPlugin.arc56.json', ['p2:HyperSwap']],
    ['pollPlugin', 'arc58/plugins/poll/PollPluginContract.arc56.json', []],
    ['nfdPlugin', 'arc58/plugins/nfd/NFDPlugin.arc56.json', []],
    ['haystackRouterPlugin', 'arc58/plugins/haystack-router/HaystackRouterPlugin.arc56.json', []],
    ['revenueManagerPlugin', 'arc58/plugins/revenue-manager/RevenueManagerPlugin.arc56.json', []],
  ]
  for (const [key, artifact, requires] of plugins) {
    const run = key === 'revenueManagerPlugin' ? 'npm run deploy:revenue-manager-plugin (one proposal: pal.revenueManager + 11 grants + state)'
      : ['hyperSwapPlugin', 'pollPlugin'].includes(key) ? 'lockstep in its Phase 2 --target run (Poll: swap before, HyperSwap: after)'
      : 'scripts/principal-phase3-plugins.ts --swap --register (Phase 3) or update:dao-wallet-plugins'
    add({ id: `plugin:${key}`, stage: 'G', title: `${key} rotated (deployed, registered, DAO grants swapped)`, requires, run, check: async () => {
      const latest = await runsTree(`latest ${key}`, (ctx.appIds as unknown as Record<string, bigint>)[key], artifact)
      const stale = staleDaoGrants(key)
      const palOk = key !== 'revenueManagerPlugin' || pal?.revenueManager === ctx.appIds.revenueManagerPlugin
      return { done: latest.done && stale === 0 && palOk, detail: `${latest.detail}; ${stale} stale DAO wallet grant(s)${palOk ? '' : `; pal.revenueManager = ${pal?.revenueManager}`}` }
    } })
  }

  add({ id: 'sdk-flags', stage: 'G', title: 'SDK release with REGISTRY_WRITES_STOPPED and SOCIAL_HINTED_TARGETS on', requires: ['p2:AkitaSocial', 'plugin:socialPlugin'],
    run: 'edit akita-sdk/src/networks.ts, rebuild, publish', check: async () => ({
      done: REGISTRY_WRITES_STOPPED[network] && SOCIAL_HINTED_TARGETS[network],
      detail: `REGISTRY_WRITES_STOPPED=${REGISTRY_WRITES_STOPPED[network]}, SOCIAL_HINTED_TARGETS=${SOCIAL_HINTED_TARGETS[network]}` }) })
  add({ id: 'initialize', stage: 'I', title: 'DAO initialized (bootstrap keys cleared)', requires: ['dao', 'validator', 'dao-wallet', 'sdk-flags', 'heartbeat'],
    run: 'scripts/revoke-dao-bootstrap-grants.ts, clearBootstrapKeys, initialize()', check: async () => ({
      done: Number(state ?? 0) === DAO_STATE_FULLY_INITIALIZED, detail: `DAO state = ${state}` }) })

  const results = new Map<string, Status>()
  for (const step of steps) results.set(step.id, await step.check())
  const rows = steps.map((step) => {
    const status = results.get(step.id)!
    const missing = step.requires.filter((id) => !results.get(id)?.done)
    return { ...step, check: undefined, status: status.done ? 'done' : missing.length ? 'blocked' : 'ready', missing, detail: status.detail }
  })

  if (json) {
    console.log(JSON.stringify(rows, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
    return
  }
  const mark = { done: '✓', ready: '→', blocked: '·' } as const
  console.log(`Rollout status on ${network} (DAO ${ctx.dao.appId}, state ${state})\n`)
  let stage = ''
  for (const r of rows) {
    if (r.stage !== stage) console.log(`\nStage ${stage = r.stage}`)
    console.log(`  ${mark[r.status as keyof typeof mark]} ${r.title}`)
    console.log(`      ${r.detail}`)
    if (r.status === 'blocked') console.log(`      blocked by: ${r.missing.join(', ')}`)
    else if (r.status === 'ready') console.log(`      run: ${r.run}`)
  }
  console.log('\nNot tracked here (no SDK key; check their receipts): Meta, Guild factories, PluginDex stack, WelcomePlugin, GatedFeePassPlugin, MetaPlugin.')
})
