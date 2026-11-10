#!/usr/bin/env node
import fs from 'node:fs'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { activatePluginDex, parseActivationPolicy } from './lib/plugin-dex-activation'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('activate-plugin-dex.ts', `
  --receipts <dir>    Required: the deploy-immutable receipts of all 13 PluginDex v2 contracts,
                      one <Contract>.json each (e.g. receipts/dex)
  --policy <json>     Required: LaunchManager policy file
                      {"launchFee": "0", "bounty": "0", "treasury": "<address>", "gatedFunding": "30100",
                       "devBuy": {"maxBps": "500", "minVestSeconds": "86400", "maxVestSeconds": "31536000"}}

Sends the PluginDex v2 admin calls as the deployer (the admin given at deploy): Vault curve and hook
approvals (GatedFeeHook only once GatedFeePassPlugin is pinned to it), LaunchManager setFees /
setHooks (GatedFeeHook) / setDevBuy (DAO aal.rewards, which must run Rewards v2), then proposeAdmin(DAO
wallet) on every app with an admin. Calls whose state already matches are skipped and each sent call is
verified on chain.

The handover is two steps. This script only proposes. The DAO wallet must then call acceptAdmin() on
each app itself; those calls are listed as awaiting and printed. The deployer stays admin until the
DAO wallet has accepted, so nothing is locked if the DAO wallet cannot make the call yet.
If a pending call's admin is already the DAO wallet, nothing is sent and the calls for a DAO proposal
are printed.`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const receipts = value('--receipts')
  const policyFile = value('--policy')
  if (!receipts || !policyFile) throw new Error('--receipts and --policy are required')
  const policy = parseActivationPolicy(JSON.parse(fs.readFileSync(policyFile, 'utf8')))
  const report = await activatePluginDex(await setupContext(options), receipts, policy)
  const count = (status: string) => report.filter(r => r.status === status).length
  console.log(`\n${count('done')} already done, ${count('sent')} sent, ${count('pending')} pending, ${count('awaiting')} awaiting the DAO wallet${options.dryRun ? ' (dry run: nothing sent)' : ''}`)
})
