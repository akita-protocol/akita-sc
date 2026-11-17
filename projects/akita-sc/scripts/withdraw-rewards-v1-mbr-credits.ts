#!/usr/bin/env node

/**
 * Withdraw the DAO's MBR credits from a (legacy) Rewards app through the RewardsPlugin (STAKE-4).
 *
 * On MainNet the DAO wallet's `stickers` escrow created the Welcome disbursements on Rewards v1
 * 3569556095; their released allocation MBR (about 21.33 ALGO) sits there as withdrawable credits
 * and is exposed to the v1 C-1 drain. This script:
 *   1. lists every disbursement the escrow created that still holds credits;
 *   2. proposal 1: unlocks the escrow if needed and grants the caller `withdrawMbrCredits` on it;
 *   3. withdraws every credit through the plugin (the ALGO lands on the escrow);
 *   4. proposal 2: removes the grant and restores the lock.
 *
 * Read-only unless --execute is given: it prints the plan and the proposal actions.
 * The plugin must be a RewardsPlugin created with `legacyRewards` = the Rewards app (or the app must
 * still be the DAO registry's Rewards app). It defaults to the network's latest RewardsPlugin in the
 * SDK registry, and the Rewards app to the registry's Rewards v1, so the same command fits MainNet
 * and TestNet. A RewardsPlugin deployed before `withdrawMbrCredits` existed is refused.
 *
 * Both proposals execute at once only while the DAO is in Draft, so run this before initialize().
 *
 * Usage (npm run rewards:withdraw-v1-credits):
 *   npm run rewards:withdraw-v1-credits -- -n localnet --dao-app-id <id> --rewards-plugin <id> --rewards <id>
 *   npm run rewards:withdraw-v1-credits -- -n mainnet --dry-run --sender <DAO creator>
 *   npm run rewards:withdraw-v1-credits -- -n mainnet --execute
 */

import { RewardsSDK } from 'akita-sdk/rewards'
import { RewardsPluginSDK } from 'akita-sdk/wallet'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { escrowAddress, grantActions, planCreditWithdrawals, revokeActions, runCreditWithdrawal } from './lib/rewards-credit-withdrawal'

const DEFAULT_ESCROW = 'stickers'

function parseExtraArgs() {
  const args = process.argv.slice(2)
  const value = (flag: string) => {
    const i = args.indexOf(flag)
    return i >= 0 ? args[i + 1] : undefined
  }
  const plugin = value('--rewards-plugin')
  const rewards = value('--rewards')
  const batch = value('--batch')
  return {
    escrow: value('--escrow') ?? DEFAULT_ESCROW,
    plugin: plugin ? BigInt(plugin) : undefined,
    rewards: rewards ? BigInt(rewards) : undefined,
    batch: batch ? Number(batch) : 6,
    execute: args.includes('--execute'),
  }
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs('withdraw-rewards-v1-mbr-credits.ts', `
  --rewards-plugin <id>  RewardsPlugin with withdrawMbrCredits. Default: the network's latest in the SDK registry
  --rewards <id>         Rewards app holding the credits. Default: the network's Rewards v1 in the SDK registry
  --escrow <name>        DAO wallet escrow that created the disbursements. Default: ${DEFAULT_ESCROW}
  --batch <n>            Plugin calls per wallet group. Default: 6
  --execute              Send the proposals and withdrawals (default: print the plan only)`)
  if (!extra.execute) options.dryRun = true

  const ctx = await setupContext(options, { minBalance: 2_000_000n })
  const rewardsApp = extra.rewards ?? ctx.appIds.rewardsV1
  if (!rewardsApp) throw new Error(`--rewards is required: the SDK registry names no Rewards v1 on ${options.network}`)
  const pluginApp = extra.plugin ?? ctx.appIds.rewardsPlugin
  if (!pluginApp) throw new Error(`--rewards-plugin is required: the SDK registry names no RewardsPlugin on ${options.network}`)
  const factoryParams = (appId: bigint) => ({ appId, defaultSender: ctx.sender, defaultSigner: ctx.signer })
  const plugin = new RewardsPluginSDK({ algorand: ctx.algorand, factoryParams: factoryParams(pluginApp) })
  const rewards = new RewardsSDK({ algorand: ctx.algorand, factoryParams: factoryParams(rewardsApp) })

  const pinned = await plugin.client.state.global.legacyRewards()
  // Every RewardsPlugin that has withdrawMbrCredits stores legacy_rewards at creation, 0 included.
  if (pinned === undefined) {
    throw new Error(`RewardsPlugin ${pluginApp} stores no legacy_rewards: it was deployed before withdrawMbrCredits existed. Deploy the new RewardsPlugin first (npm run deploy:rewards-plugin) and rebuild akita-sdk.`)
  }
  const registry = (await ctx.dao.client.state.global.akitaAppList())?.rewards
  if (pinned !== rewardsApp && registry !== rewardsApp) {
    throw new Error(`RewardsPlugin ${pluginApp} cannot reach Rewards ${rewardsApp} (legacy_rewards ${pinned}, registry ${registry})`)
  }

  const { address, locked } = await escrowAddress(ctx.dao, extra.escrow)
  const plan = await planCreditWithdrawals(rewards, address)
  const total = plan.reduce((sum, w) => sum + w.amount, 0n)

  console.log(`Rewards app:    ${rewardsApp}${pinned === rewardsApp ? ' (plugin legacy_rewards)' : ' (registry)'}`)
  console.log(`RewardsPlugin:  ${pluginApp}${extra.plugin === undefined ? ' (SDK registry)' : ''}`)
  console.log(`Escrow:         ${extra.escrow} ${address}${locked ? ' (locked)' : ''}`)
  console.log(`Caller:         ${ctx.sender}`)
  console.log(`Disbursements:  ${plan.length}, credits ${total} µALGO\n`)
  for (const { id, amount } of plan) console.log(`  withdrawMbrCredits(${rewardsApp}, ${id}, ${amount})`)

  const describe = (actions: ReturnType<typeof grantActions>) => actions.map((a) => {
    const { client, methods, ...rest } = a as { client?: unknown; methods?: { name: () => { selectors: Uint8Array[] } }[] } & Record<string, unknown>
    const selectors = methods?.map((m) => Buffer.from(m.name().selectors[0]).toString('hex'))
    return JSON.stringify({ ...rest, ...(selectors ? { methods: selectors } : {}) }, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
  })
  console.log('\nProposal 1 (grant):')
  for (const line of describe(grantActions(plugin, ctx.sender, extra.escrow, locked))) console.log(`  ${line}`)
  console.log('Proposal 2 (revoke):')
  for (const line of describe(revokeActions(plugin, ctx.sender, extra.escrow, locked))) console.log(`  ${line}`)

  // Proposal 1 adds a grant keyed by (plugin, caller, escrow) and proposal 2 removes that key. A grant the
  // caller already holds under it would not survive the run, so another caller has to run this.
  const held = [...(await (await ctx.dao.getWallet()).client.state.box.plugins.getMap()).keys()]
    .some((key) => key.plugin === pluginApp && key.caller === ctx.sender && key.escrow === extra.escrow)
  if (held && plan.length > 0) {
    throw new Error(`${ctx.sender} already holds a grant of RewardsPlugin ${pluginApp} on "${extra.escrow}"; this run adds a grant under the same key and then removes that key. Run it as an account that holds no such grant.`)
  }

  if (!extra.execute) {
    console.log('\nDry run: nothing sent. Pass --execute to propose, withdraw and revoke.')
    return
  }
  if (plan.length === 0) {
    console.log('\nNothing to withdraw.')
    return
  }

  const done = await runCreditWithdrawal({
    algorand: ctx.algorand,
    dao: ctx.dao,
    plugin,
    rewards,
    escrow: extra.escrow,
    caller: ctx.sender,
    signer: ctx.signer,
    batch: extra.batch,
  })
  console.log(`\nWithdrew ${done.reduce((sum, w) => sum + w.amount, 0n)} µALGO from ${done.length} disbursements to ${address}.`)
})
