/**
 * The rollout steps of docs/rollout/MAINNET-ROLLOUT.md, each checked against live chain state.
 * Read by `scripts/rollout-status.ts` (the tracker) and by `scripts/initialize-dao.ts`, which refuses to
 * launch the DAO while a step is not done. Read-only: nothing here signs.
 */
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { getPluginUpdate, REGISTRY_WRITES_STOPPED, SOCIAL_HINTED_TARGETS, type PluginAppIdKey } from 'akita-sdk'
import type { ScriptContext } from '../script-base'
import { decodePayPolicy, type RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import { createPluginClient, DAO_STATE_FULLY_INITIALIZED } from './dao-wallet-plugin-migration'
import { isPhase2aUpdatePlugin, readFactoryChild, readLiveApp } from './principal-rollout-run'
import { loadCompiled, PHASE2_RIDE_ALONG_TARGETS, PHASE2_TARGETS } from './principal-rollout'
import { readHeartbeatManager } from './heartbeat-manager'
import { planRewardsOptIns } from './rewards-opt-ins'
import { escrowAddress, planCreditWithdrawals } from './rewards-credit-withdrawal'
import { RewardsSDK } from 'akita-sdk/rewards'
import { planPowerRescale, powerProblems } from './proposal-power'
import { planServiceFunding } from './service-account-funding'
import { payOnlyGrantProblem, payPluginProblem, policyWriterGrantProblem, readDaoGrantPolicy } from './grant-policy-steps'

type Status = { done: boolean; detail: string }
type Step = { id: string; stage: string; title: string; requires: readonly string[]; run: string; check: () => Promise<Status> }
export type RolloutRow = Omit<Step, 'check'> & { status: 'done' | 'ready' | 'blocked'; missing: string[]; detail: string }

const ESCROW_CONFIG = algosdk.ABIType.from('(string,uint64)')
const same = (a?: Uint8Array, b?: Uint8Array) => !!a && !!b && Buffer.from(a).equals(Buffer.from(b))

export async function readRolloutStatus(ctx: ScriptContext): Promise<{ rows: RolloutRow[]; daoState: bigint }> {
  const network = ctx.options.network
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
  const wallet = await ctx.dao.getWallet()
  const grants = await wallet.client.state.box.plugins.getMap()
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

  add({ id: 'gate', stage: 'C', title: 'Gate v2 at aal.gate (sub-gates allowlisted, imports sealed)', requires: ['dao', 'validator'],
    run: 'runbook C1 to C4: npm run deploy:gates, scripts/allowlist-sub-gates.ts, npm run seal:gate-imports, then npm run deploy:gates -- --contracts gate --register',
    check: () => runsTree('aal.gate', aal?.gate, 'gates/Gate.arc56.json') })
  add({ id: 'staking', stage: 'D', title: 'Staking upgraded in place', requires: ['phase2a'],
    run: 'npm run update:staking', check: () => runsTree('aal.staking', aal?.staking, 'staking/Staking.arc56.json') })
  add({ id: 'rewards', stage: 'D', title: 'Rewards v2 at aal.rewards', requires: ['dao', 'validator'],
    run: 'runbook D2: npm run deploy:rewards, npm run rewards:opt-in, then npm run deploy:rewards -- --register', check: () => runsTree('aal.rewards', aal?.rewards, 'rewards/Rewards.arc56.json') })
  add({ id: 'rewards-opt-ins', stage: 'D', title: 'Rewards v2 holds every asset Rewards v1 pays out', requires: [],
    run: 'npm run rewards:opt-in -- --manifest receipts/rewards.json (before the --register cutover)', check: async () => {
      const v1 = ctx.appIds.rewardsV1 ?? 0n
      if (!aal?.rewards || !v1 || v1 === aal.rewards) return { done: false, detail: `aal.rewards = ${aal?.rewards} is still Rewards v1; the new app is named in its receipt until the cutover` }
      const { wanted, missing } = await planRewardsOptIns(ctx, v1, aal.rewards)
      return { done: missing.length === 0, detail: `Rewards ${aal.rewards} holds ${wanted.length - missing.length} of the ${wanted.length} asset(s) Rewards ${v1} holds${missing.length ? `; missing ${missing.join(', ')}` : ''}` }
    } })
  add({ id: 'heartbeat', stage: 'D', title: 'Staking heartbeat manager set by the DAO wallet', requires: ['staking', 'plugin:stakingPlugin'],
    run: 'npm run staking:set-heartbeat-manager -- --manager <ADDR>', check: async () => {
      const manager = aal?.staking ? await readHeartbeatManager(ctx, aal.staking) : undefined
      const set = manager !== undefined && manager !== ALGORAND_ZERO_ADDRESS_STRING
      return { done: set, detail: `aal.staking ${aal?.staking} heartbeat_manager_address = ${set ? manager : '(unset)'}` }
    } })

  const gatedPhase2 = new Set(['AkitaSocial', 'Subscriptions', 'Marketplace', 'StakingPoolFactory', 'AuctionFactory', 'RaffleFactory'])
  // The runner refuses a target that pays referrals until aal.rewards is Rewards v2 (rollout.test).
  const referralPhase2 = new Set([...gatedPhase2, 'AbstractedAccountFactory'])
  for (const t of [...PHASE2_TARGETS, ...PHASE2_RIDE_ALONG_TARGETS]) {
    const requires = ['phase2a', ...(gatedPhase2.has(t.name) ? ['gate'] : []), ...(referralPhase2.has(t.name) ? ['rewards'] : []), ...(t.name === 'StakingPoolFactory' ? ['staking'] : [])]
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
    add({ id: `ride:${name}`, stage: 'E', title: `${name} (ride-along, runUpdate)`, requires: ['phase2a'], run,
      check: () => runsTree(name, (ctx.appIds as unknown as Record<string, bigint>)[key], artifact) })
  }

  add({ id: 'service-accounts', stage: 'E', title: 'HyperSwap, PrizeBoxFactory, PollFactory and AkitaSocialModeration hold the ALGO they need', requires: [],
    run: 'npm run fund:service-accounts -- --confirm', check: async () => {
      // a network whose SDK table lacks one of the four apps cannot be planned; the step reads as not done
      const plans = await planServiceFunding(ctx).catch((e: Error) => e)
      if (plans instanceof Error) return { done: false, detail: plans.message }
      const short = plans.filter((p) => !p.working)
      return { done: short.length === 0, detail: short.length
        ? `cannot work until funded: ${short.map((p) => `${p.name} ${p.appId} (holds ${p.balance}, minimum ${p.minBalance})`).join(', ')}`
        : plans.map((p) => `${p.name} ${p.free} µALGO free`).join(', ') }
    } })

  add({ id: 'dao-wallet', stage: 'F', title: 'DAO wallet runs the tree (AVM 13) wallet', requires: ['p2:AbstractedAccountFactory'],
    run: 'npm run update:dao-wallet, then npm run update:automatic-wallets', check: () => runsTree('DAO wallet', ctx.appIds.wallet, 'arc58/account/AbstractedAccount.arc56.json') })
  // The helper is immutable and the SDK names it, so a wallet that stores new boxes needs a new helper before it is quoted.
  add({ id: 'wallet-mbr', stage: 'F', title: 'SDK wallet storage helper runs the tree program', requires: [],
    run: 'npm run deploy:wallet-mbr -- --register, then rebuild the SDK', check: () => runsTree('walletMbr', ctx.appIds.walletMbr, 'arc58/account/AbstractedAccountMBR.arc56.json') })

  // Not here: payPlugin, which is created with Meta as its registry and so follows Meta in stage H, and the
  // pay silo plugins, which release 2.0.0 deprecates (a PayPlugin grant with a policy does their job; H6).
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
    ['optinPlugin', 'arc58/plugins/optin/OptInPlugin.arc56.json', []],
    ['selfOptinPlugin', 'arc58/plugins/self-optin/SelfOptInPlugin.arc56.json', []],
    ['asaManagerPlugin', 'arc58/plugins/asa-manager/AsaManagerPlugin.arc56.json', []],
    ['dualStakePlugin', 'arc58/plugins/dual-stake/DualStakePlugin.arc56.json', []],
    ['revenueManagerPlugin', 'arc58/plugins/revenue-manager/RevenueManagerPlugin.arc56.json', ['dao']],
  ]
  for (const [key, artifact, requires] of plugins) {
    const run = key === 'revenueManagerPlugin' ? 'npm run deploy:revenue-manager-plugin (one proposal: pal.revenueManager + 11 grants + state)'
      : ['hyperSwapPlugin', 'pollPlugin'].includes(key) ? 'lockstep in its Phase 2 --target run (Poll: swap before, HyperSwap: after)'
      : 'runbook G1 (scripts/principal-phase3-plugins.ts --swap --register) or G2 (its deploy script, then npm run update:dao-wallet-plugins -- --confirm-update)'
    add({ id: `plugin:${key}`, stage: 'G', title: `${key} rotated (deployed, registered, DAO grants swapped)`, requires, run, check: async () => {
      const latest = await runsTree(`latest ${key}`, (ctx.appIds as unknown as Record<string, bigint>)[key], artifact)
      const stale = staleDaoGrants(key)
      const palOk = key !== 'revenueManagerPlugin' || pal?.revenueManager === ctx.appIds.revenueManagerPlugin
      return { done: latest.done && stale === 0 && palOk, detail: `${latest.detail}; ${stale} stale DAO wallet grant(s)${palOk ? '' : `; pal.revenueManager = ${pal?.revenueManager}`}` }
    } })
  }

  // The stickers escrow paid the storage of the Welcome disbursements on Rewards v1; what was released sits there
  // as credits only that escrow can withdraw, through the new RewardsPlugin and two proposals (STAKE-4).
  add({ id: 'rewards-v1-credits', stage: 'G', title: 'The stickers escrow has withdrawn its storage credits from Rewards v1', requires: ['plugin:rewardsPlugin'],
    run: 'npm run rewards:withdraw-v1-credits -- --execute (two proposals: run it while the DAO is in Draft)', check: async () => {
      const v1 = ctx.appIds.rewardsV1 ?? 0n
      if (!v1) return { done: true, detail: 'the SDK registry names no Rewards v1 on this network' }
      const escrow = await escrowAddress(ctx.dao, 'stickers').catch(() => undefined)
      if (!escrow) return { done: true, detail: 'the DAO wallet has no stickers escrow' }
      const rewards = new RewardsSDK({ algorand: ctx.algorand, factoryParams: { appId: v1, defaultSender: ctx.sender, defaultSigner: ctx.signer } })
      const plan = await planCreditWithdrawals(rewards, escrow.address)
      const total = plan.reduce((sum, w) => sum + w.amount, 0n)
      return { done: plan.length === 0, detail: plan.length ? `${plan.length} disbursement(s) on Rewards ${v1} hold ${total} µALGO of the stickers escrow's credits` : `the stickers escrow holds no credits on Rewards ${v1}` }
    } })

  add({ id: 'revenue-escrows', stage: 'G', title: 'Every rev_* escrow is registered with the RevenueManager and has its grant', requires: ['plugin:revenueManagerPlugin'],
    run: 'npm run register:revenue-escrow -- --escrow <name> --source <address> --confirm', check: async () => {
      const rmId = pal?.revenueManager ?? 0n
      if (rmId <= 0n) return { done: false, detail: 'pal.revenueManager is unset' }
      const rm = createPluginClient('revenueManagerPlugin', ctx, rmId, ctx.sender) as unknown as RevenueManagerPluginSDK
      const [records, escrows] = await Promise.all([rm.client.state.box.escrows.getMap(), wallet.getEscrows()])
      const registered = new Set([...records.keys()].filter((k) => k.wallet === wallet.appId).map((k) => k.escrow))
      const granted = new Set([...grants.keys()].filter((k) => k.plugin === rmId && k.caller === ALGORAND_ZERO_ADDRESS_STRING).map((k) => k.escrow))
      const names = [...escrows.keys()].filter((name) => name.startsWith('rev_')).sort()
      const missing = names.filter((name) => !registered.has(name) || !granted.has(name))
      // An escrow that is not registered is never split: its fees stay in it.
      return { done: missing.length === 0, detail: missing.length ? `not registered with RevenueManager ${rmId}, or without its global grant: ${missing.join(', ')}` : `all ${names.length} rev_* escrows are registered with RevenueManager ${rmId}` }
    } })
  add({ id: 'sdk-flags', stage: 'G', title: 'SDK release with REGISTRY_WRITES_STOPPED and SOCIAL_HINTED_TARGETS on', requires: ['p2:AkitaSocial', 'plugin:socialPlugin'],
    run: 'edit akita-sdk/src/networks.ts, rebuild, publish', check: async () => ({
      done: REGISTRY_WRITES_STOPPED[network] && SOCIAL_HINTED_TARGETS[network],
      detail: `REGISTRY_WRITES_STOPPED=${REGISTRY_WRITES_STOPPED[network]}, SOCIAL_HINTED_TARGETS=${SOCIAL_HINTED_TARGETS[network]}` }) })
  const products: readonly [id: string, title: string, key: string, artifact: string, requires: readonly string[], run: string][] = [
    ['meta', 'Meta deployed and registered', 'meta', 'meta/Meta.arc56.json', ['dao'], 'npm run deploy:meta -- --manifest receipts/meta.json --register'],
    ['meta-plugin', 'MetaPlugin deployed and registered', 'metaPlugin', 'arc58/plugins/meta/MetaPlugin.arc56.json', ['meta'], 'npm run deploy:meta-plugin -- --config \'{"registry":"<meta id>"}\' --manifest receipts/meta-plugin.json --register'],
    ['collectible-variations', 'Collectible Variations registry deployed and registered', 'collectibleVariations', 'collectible-variations/CollectibleVariations.arc56.json', ['meta'], 'npm run deploy:collectible-variations -- --manifest receipts/collectible-variations.json --register'],
    ['guild-consensus', 'GuildConsensusFactory deployed and registered', 'guildConsensusFactory', 'arc58/guilds/consensus/GuildConsensusFactory.arc56.json', ['p2:AbstractedAccountFactory', 'guild-fees'], 'npm run deploy:guild-factory -- --revenue-escrow-app <id> --manifest receipts/guild-factory.json --register --confirm-mainnet'],
    ['guild-factory', 'GuildFactory deployed and registered', 'guildFactory', 'arc58/guilds/factory/GuildFactory.arc56.json', ['p2:AbstractedAccountFactory', 'guild-fees'], 'npm run deploy:guild-factory (same run as the consensus factory)'],
    ['guild-plugin', 'Creation-only GuildPlugin deployed and registered', 'guildPlugin', 'arc58/plugins/guild/GuildPlugin.arc56.json', ['guild-factory'], 'npm run deploy:guild-plugin -- --config \'{"factory":"<guild factory id>","guild":"0"}\' --manifest receipts/guild-plugin.json --register'],
    ['welcome-plugin', 'WelcomePlugin deployed and registered', 'welcomePlugin', 'arc58/plugins/welcome/WelcomePlugin.arc56.json', ['p2:AbstractedAccountFactory'], 'runbook G1 (Phase 3 deploys it)'],
    ['balance-reader', 'Wallet balance reader deployed and registered', 'walletBalanceReader', 'arc58/account/AbstractedAccountBalanceReader.arc56.json', [], 'npm run deploy:wallet-balance-reader -- --manifest receipts/wallet-balance-reader.json --register'],
    ['social-claim', 'SocialClaim deployed and registered (not in release 2.0.0: name it in --allow-pending at I1)', 'socialClaim', 'arc58/social-claim/SocialClaim.arc56.json', ['welcome-plugin', 'plugin:payPlugin'], 'npm run deploy:immutable -- --contract SocialClaim --config social-claim.json --manifest receipts/social-claim.json --register'],
  ]
  for (const [id, title, key, artifact, requires, run] of products) {
    add({ id, stage: 'H', title, requires, run, check: async () => {
      const appId = (ctx.appIds as unknown as Record<string, bigint | undefined>)[key]
      return appId ? runsTree(key, appId, artifact) : { done: false, detail: `SDK ${key} is not recorded yet` }
    } })
  }
  add({ id: 'meta-policy-writer', stage: 'H', title: 'Meta accepts grant policies only from MetaPlugin', requires: ['meta', 'meta-plugin'],
    run: 'npm run set:policy-writer -- --confirm', check: async () => {
      const meta = ctx.appIds.meta
      const writer = ctx.appIds.metaPlugin
      if (!meta || !writer) return { done: false, detail: 'SDK meta or metaPlugin is not recorded yet' }
      const app = await ctx.algorand.client.algod.getApplicationByID(meta).do().catch(() => undefined)
      const entry = (app?.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === 'policy_writer')
      const current = entry ? BigInt(entry.value.uint) : 0n
      return { done: current === writer, detail: current === writer ? `Meta ${meta} takes policies from MetaPlugin ${writer}` : current ? `Meta ${meta} takes policies from app ${current}, not MetaPlugin ${writer}` : `Meta ${meta} has no policy writer yet` }
    } })
  add({ id: 'dao-policy-writer', stage: 'H', title: 'DAO wallet writes grant policies only by proposal', requires: ['dao', 'meta-policy-writer'],
    run: 'npm run install:policy-writer-grant -- --confirm', check: async () => {
      const writer = ctx.appIds.metaPlugin
      if (!writer) return { done: false, detail: 'SDK metaPlugin is not recorded yet' }
      const info = [...grants].find(([k]) => k.plugin === writer && k.caller === ALGORAND_ZERO_ADDRESS_STRING && k.escrow === '')?.[1]
      const problem = policyWriterGrantProblem(info)
      return { done: !problem, detail: problem ? `the DAO wallet's global grant of MetaPlugin ${writer} ${problem}` : `the DAO wallet holds MetaPlugin ${writer} as a global grant that needs an execution key` }
    } })
  add({ id: 'meta-escrow', stage: 'H', title: 'Meta sends its type fees to a DAO escrow', requires: ['meta'],
    run: 'npm run create:dao-escrow -- --escrow rev_meta --execute, then npm run update:app-dao-escrow -- --app meta --escrow rev_meta --confirm', check: async () => {
      const meta = ctx.appIds.meta
      if (!meta) return { done: false, detail: 'SDK meta is not recorded yet' }
      const app = await ctx.algorand.client.algod.getApplicationByID(meta).do().catch(() => undefined)
      const entry = (app?.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === 'akita_escrow')
      // EscrowConfig is the ARC-4 tuple (name: string, app: uint64)
      const escrow = entry ? BigInt((ESCROW_CONFIG.decode(entry.value.bytes) as [string, bigint])[1]) : 0n
      return { done: escrow > 0n, detail: escrow > 0n ? `Meta ${meta} sends fees to escrow app ${escrow}` : `Meta ${meta} has no DAO escrow yet; its fees wait in the app` }
    } })

  // PayPlugin reads each grant's policy from the Meta it was created with, and nothing at deploy checks that id.
  add({ id: 'plugin:payPlugin', stage: 'H', title: 'payPlugin rotated (created with Meta as its registry, registered, DAO grants swapped)', requires: ['meta'],
    run: 'npm run deploy:pay-plugin -- --config \'{"registry":"<meta id>"}\' --manifest receipts/pay-plugin.json --register, rebuild the SDK, then npm run update:dao-wallet-plugins -- --confirm-update', check: async () => {
      const plugin = ctx.appIds.payPlugin
      const problem = await payPluginProblem(ctx, plugin)
      const stale = staleDaoGrants('payPlugin')
      return { done: !problem && stale === 0, detail: `${problem ? `payPlugin ${plugin || '(unset)'} ${problem}` : `latest payPlugin ${plugin} runs the tree program and reads policies from Meta ${ctx.appIds.meta}`}; ${stale} stale DAO wallet grant(s)` }
    } })
  add({ id: 'labs-pay-policy', stage: 'H', title: 'rec_krby pays out through PayPlugin with pay only, to the one receiver its policy lists', requires: ['dao', 'dao-policy-writer', 'plugin:payPlugin'],
    run: 'npm run install:pay-policy-grant -- --escrow rec_krby --recipient <Labs address> --confirm', check: async () => {
      const plugin = ctx.appIds.payPlugin
      const problem = await payPluginProblem(ctx, plugin)
      if (problem) return { done: false, detail: `payPlugin ${plugin || '(unset)'} ${problem}` }
      const key = { plugin, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: 'rec_krby' }
      const info = [...grants].find(([k]) => k.plugin === key.plugin && k.caller === key.caller && k.escrow === key.escrow)?.[1]
      const grantProblem = payOnlyGrantProblem(info)
      if (grantProblem) return { done: false, detail: `the global grant of PayPlugin ${plugin} on rec_krby ${grantProblem}` }
      const policy = await readDaoGrantPolicy(ctx, key).catch(() => undefined)
      // PayPlugin refuses a global grant with no execution key until it has a policy for this install of it.
      if (!policy?.current) return { done: false, detail: `the pay-only grant of PayPlugin ${plugin} on rec_krby has ${policy?.exists ? 'a policy written for an earlier install of it' : 'no policy'}, so it pays nothing` }
      const { recipients, assets } = decodePayPolicy(policy.body)
      return { done: recipients.length === 1, detail: `rec_krby pays ${recipients.length === 1 ? 'only ' : ''}${recipients.join(', ')} in assets ${assets.join(', ')} (0 is ALGO); compare the address with the Labs address` }
    } })

  add({ id: 'power', stage: 'I', title: 'Proposal thresholds are in base units', requires: ['dao', 'validator'],
    run: 'npm run dao:rescale-power -- --confirm-rescale', check: async () => {
      const plan = await planPowerRescale(ctx)
      const problems = powerProblems(plan)
      return { done: plan.baseUnits && problems.length === 0, detail: !plan.baseUnits ? 'the DAO still compares power in whole tokens' : problems.length ? problems.join('; ') : 'every proposal threshold that is read is in base units' }
    } })
  add({ id: 'initialize', stage: 'I', title: 'DAO initialized (bootstrap keys cleared)', requires: ['dao', 'validator', 'dao-wallet', 'sdk-flags', 'heartbeat', 'rewards', 'rewards-opt-ins', 'power'],
    run: 'scripts/revoke-dao-bootstrap-grants.ts --confirm-revoke, then npm run dao:initialize -- --confirm-initialize', check: async () => ({
      done: Number(state ?? 0) === DAO_STATE_FULLY_INITIALIZED, detail: `DAO state = ${state}` }) })

  const results = new Map<string, Status>()
  for (const step of steps) results.set(step.id, await step.check())
  const rows = steps.map((step) => {
    const status = results.get(step.id)!
    const missing = step.requires.filter((id) => !results.get(id)?.done)
    const { check: _check, ...rest } = step
    return { ...rest, status: status.done ? 'done' as const : missing.length ? 'blocked' as const : 'ready' as const, missing, detail: status.detail }
  })
  return { rows, daoState: BigInt(state ?? 0n) }
}
