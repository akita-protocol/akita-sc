#!/usr/bin/env node
/**
 * Give the DAO wallet its InferencePlugin grant, the way the DAO administers InferenceNetwork: a global
 * grant on no escrow that needs an execution key, at the DAO's app upgrade thresholds. Each admin
 * change (settings, payment assets, provider status, slash, the bootstrap admin) is then one
 * ExecutePlugin proposal that runs one InferencePlugin pass-through from the DAO's wallet, the only
 * sender InferenceNetwork accepts once deploy:inference --hand-to-dao has given up the bootstrap admin.
 *
 * Needs the DAO creator's key and a DAO that is not initialized, like the other grant scripts; after
 * `initialize()` the same AddPlugin is a vote. It reads the grant back, and a rerun does nothing.
 *
 * Usage (from projects/akita-sc), after deploy:inference --register and an SDK rebuild:
 *   npm run install:inference-admin-grant -- -n testnet --dry-run
 *   npm run install:inference-admin-grant -- -n testnet --confirm
 */
import dotenv from 'dotenv'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType } from 'akita-sdk/wallet'
import { InferencePluginSDK } from '../../akita-sdk/src/wallet/plugins/inference'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { bootstrapWallet, fundWallet } from './lib/dao-escrow-steps'
import { DEFAULT_SOURCE_LINK } from './lib/dao-wallet-plugin-migration'
import { policyWriterGrantProblem } from './lib/grant-policy-steps'
import { proposeAndExecute } from './utils'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  dotenv.config({ path: `.env.${value('--network') ?? value('-n')}` })
  const options = parseBaseArgs('install-inference-admin-grant.ts', `
  --source-link <url>   Source link stored with the grant
  --confirm             Create and execute the proposal (plans only without it)`)
  const ctx = await setupContext(options, { minBalance: 2_000_000n })
  const plugin = ctx.appIds.inferencePlugin ?? 0n
  if (plugin === 0n) throw new Error('The SDK records no inferencePlugin for this network: run deploy:inference with --register, then rebuild the SDK')

  const plan = options.dryRun || !args.includes('--confirm')
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  const sender = options.dryRun ? options.sender ?? daoCreator : ctx.sender
  const { wallet, walletAddress } = await bootstrapWallet(ctx, sender)
  const settings = await ctx.dao.client.state.global.upgradeAppProposalSettings()
  if (!settings) throw new Error('The DAO has no upgradeApp proposal settings')

  const find = async () => [...await wallet.client.state.box.plugins.getMap()]
    .find(([key]) => key.plugin === plugin && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === '')?.[1]
  // The same shape as the policy writer grant: only the execution key keeps anyone else from using it.
  const existing = await find()
  const problem = policyWriterGrantProblem(existing)
  if (existing && problem) throw new Error(`The DAO wallet already holds a global InferencePlugin ${plugin} grant on no escrow that ${problem}; refusing to reuse it`)
  console.log(`InferencePlugin ${plugin} on ${options.network}: the DAO wallet's execution-key grant is ${existing ? 'present' : 'absent'}`)
  if (existing) return console.log('Nothing to do.')
  if (plan) return console.log('\nOne AddPlugin proposal would be created. Nothing was sent; pass --confirm to send.')

  const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
  await fundWallet(ctx, walletAddress, mbr.plugins, console.log)
  const client = new InferencePluginSDK({ algorand: ctx.algorand, factoryParams: { appId: plugin, defaultSender: sender, defaultSigner: ctx.signer } })
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [{
    type: ProposalActionEnum.AddPlugin, client, callerType: CallerType.Global, escrow: '',
    sourceLink: value('--source-link') ?? DEFAULT_SOURCE_LINK, useExecutionKey: true,
    fee: settings.fee, power: settings.power, duration: settings.duration, participation: settings.participation, approval: settings.approval,
  }])
  const afterProblem = policyWriterGrantProblem(await find())
  if (afterProblem) throw new Error(`The DAO wallet's InferencePlugin ${plugin} grant ${afterProblem} after proposal ${proposalId}`)
  console.log(`AddPlugin proposal ${proposalId} executed; verified the DAO wallet's execution-key grant of InferencePlugin ${plugin}`)
})
