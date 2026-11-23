/**
 * Three rollout steps that are each one creator-approved DAO proposal about a DAO wallet escrow:
 *
 *   - `pointAppAtDaoEscrow` (H1 step 2, gap G14): a fee-generating app is told which DAO escrow its
 *     fees go to, through the Update plugin's `updateAkitaDaoEscrowForApp`.
 *   - `registerRevenueEscrow` (G3a): an escrow is registered with the RevenueManager as a receive escrow
 *     that follows the DAO's `revenue_splits`, and gets the same global grant as the other revenue
 *     escrows, so the split keeper can cycle it.
 *   - `installPaySiloGrant` (H6): a PaySiloPlugin, whose recipient is fixed at creation, is installed on
 *     one escrow with only its `pay` method.
 *
 * All three need the DAO creator's key, the upgraded DAO (rollout B2) and a DAO that is not initialized;
 * after `initialize()` each is a vote, which no script here drives. Each reads back what it wrote, and
 * a rerun does only what is still missing.
 */
import { microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, type PaySiloPluginSDK, type RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import type { ScriptContext } from '../script-base'
import { getAppFundingNeeded, proposeAndExecute } from '../utils'
import { createPluginClient, DAO_STATE_FULLY_INITIALIZED, DEFAULT_SOURCE_LINK } from './dao-wallet-plugin-migration'
import { comparesPowerInBaseUnits } from './power-units'
import { loadCompiled } from './principal-rollout'

const WINDOW_ROUNDS = 2000n
const ESCROW_CONFIG = algosdk.ABIType.from('(string,uint64)')
const REVENUE_SPLITS_KEY = 'revenue_splits'
const PAY_SILO_ARTIFACT = 'arc58/plugins/pay-silo/PaySiloPlugin.arc56.json'
const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')
type Log = (line: string) => void

/** Checks every one of these steps shares; returns the DAO wallet and its address. */
export async function bootstrapWallet(ctx: ScriptContext, sender: string) {
  const [state, daoApp] = await Promise.all([
    ctx.dao.client.state.global.state(), ctx.algorand.client.algod.getApplicationByID(ctx.dao.appId).do(),
  ])
  const creator = daoApp.params!.creator.toString()
  if (Number(state ?? 0) === DAO_STATE_FULLY_INITIALIZED) throw new Error('The DAO is initialized: this needs a voted proposal, which this script does not drive')
  if (!comparesPowerInBaseUnits(daoApp.params!.approvalProgram)) throw new Error('The DAO is not upgraded yet; run rollout step B2 first')
  if (sender !== creator) throw new Error(`Only the DAO creator ${creator} can create pre-initialization proposals (sender ${sender})`)
  const wallet = await ctx.dao.getWallet()
  return { wallet, walletAddress: wallet.client.appAddress.toString() }
}

/** The app id of a named DAO wallet escrow; throws when the escrow does not exist. */
async function escrowApp(wallet: Awaited<ReturnType<typeof bootstrapWallet>>['wallet'], escrow: string): Promise<bigint> {
  const info = await wallet.getEscrow(escrow).catch(() => undefined)
  if (!info || info.id <= 0n) throw new Error(`The DAO wallet has no escrow "${escrow}"; create it first: npm run create:dao-escrow -- --escrow ${escrow} --execute`)
  return info.id
}

export async function fundWallet(ctx: ScriptContext, walletAddress: string, required: bigint, log: Log) {
  const funding = await getAppFundingNeeded(ctx.algorand, walletAddress, required + 1_000_000n, 0n)
  if (funding === 0n) return
  await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: walletAddress, amount: microAlgo(funding) })
  log(`  Funded the DAO wallet with ${funding} microAlgos`)
}

/** `usePlugin` simulates as the wallet admin, which therefore needs a spendable balance. */
export async function fundWalletAdmin(ctx: ScriptContext, wallet: Awaited<ReturnType<typeof bootstrapWallet>>['wallet']) {
  const admin = await wallet.client.state.global.admin()
  if (!admin) throw new Error('DAO wallet admin is missing')
  const funding = await getAppFundingNeeded(ctx.algorand, admin, 1_000_000n, 0n)
  if (funding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: admin, amount: microAlgo(funding) })
}

export async function clearUsedKey(ctx: ScriptContext, lease: Uint8Array, log: Log) {
  if ((await ctx.dao.getBootstrapKeys()).some((tracked) => hex(tracked) === hex(lease))) {
    await ctx.dao.clearBootstrapKeys({ leases: [lease] })
    log('  Cleared the used bootstrap key')
  }
}

// ---------------------------------------------------------------------------------------------
// H1 step 2 (G14): point a fee generator at its DAO escrow
// ---------------------------------------------------------------------------------------------

/** The DAO escrow an app sends its fees to (`akita_escrow` global), or undefined when unset. */
export async function readAppDaoEscrow(ctx: Pick<ScriptContext, 'algorand'>, appId: bigint): Promise<{ name: string; app: bigint } | undefined> {
  const app = await ctx.algorand.client.algod.getApplicationByID(appId).do()
  const entry = (app.params?.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === 'akita_escrow')
  if (!entry || entry.value.bytes.length === 0) return undefined
  const [name, id] = ESCROW_CONFIG.decode(entry.value.bytes) as [string, bigint]
  return { name, app: BigInt(id) }
}

export type AppEscrowResult = { appId: bigint; escrow: string; escrowApp: bigint; changed: boolean; proposalId?: bigint }

export async function pointAppAtDaoEscrow(ctx: ScriptContext, options: { appId: bigint; escrow: string; plan?: boolean; sender?: string; log?: Log }): Promise<AppEscrowResult> {
  const log = options.log ?? console.log
  const { appId, escrow } = options
  const sender = options.sender ?? ctx.sender
  const { wallet, walletAddress } = await bootstrapWallet(ctx, sender)
  const id = await escrowApp(wallet, escrow)
  const current = await readAppDaoEscrow(ctx, appId)
  log(`  App ${appId} sends fees to ${current && current.app > 0n ? `"${current.name}" (escrow app ${current.app})` : 'no escrow yet'}; wanted "${escrow}" (escrow app ${id})`)
  if (current?.name === escrow && current.app === id) return { appId, escrow, escrowApp: id, changed: false }
  if (options.plan) return { appId, escrow, escrowApp: id, changed: true }

  await fundWalletAdmin(ctx, wallet)
  const execution = await wallet.build.usePlugin({
    sender: ctx.sender, signer: ctx.signer, lease: `dao_escrow_${Date.now() % 1_000_000}`, windowSize: WINDOW_ROUNDS, callerType: CallerType.Global,
    calls: [ctx.updatePlugin.updateAkitaDaoEscrowForApp({ sender: ctx.sender, signer: ctx.signer, appId, newEscrow: { name: escrow, app: id } })],
  })
  const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.ids.length) })
  await fundWallet(ctx, walletAddress, mbr.executions, log)
  // The Update plugin is driven by UpgradeApp actions only; the action names the app it may touch.
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [{
    type: ProposalActionEnum.UpgradeApp, app: appId, executionKey: execution.lease, groups: execution.ids,
    firstValid: execution.firstValid, lastValid: execution.lastValid,
  }])
  log(`  UpgradeApp proposal ${proposalId} executed (lease ${hex(execution.lease)})`)
  await execution.send()
  await clearUsedKey(ctx, execution.lease, log)

  const after = await readAppDaoEscrow(ctx, appId)
  if (after?.name !== escrow || after.app !== id) throw new Error(`App ${appId} names escrow ${JSON.stringify(after, (_, v) => typeof v === 'bigint' ? v.toString() : v)} after the update`)
  log(`  Verified: app ${appId} sends fees to "${escrow}" (escrow app ${id})`)
  return { appId, escrow, escrowApp: id, changed: true, proposalId }
}

// ---------------------------------------------------------------------------------------------
// G3a: register a receive escrow with the RevenueManager
// ---------------------------------------------------------------------------------------------

export type RevenueEscrowResult = { escrow: string; revenueManager: bigint; registered: boolean; granted: boolean; proposalId?: bigint }

export async function registerRevenueEscrow(ctx: ScriptContext, options: { escrow: string; source: string; plan?: boolean; sender?: string; sourceLink?: string; log?: Log }): Promise<RevenueEscrowResult> {
  const log = options.log ?? console.log
  const { escrow, source } = options
  if (!algosdk.isValidAddress(source) || source === ALGORAND_ZERO_ADDRESS_STRING) throw new Error(`--source must be a non-zero Algorand address (got ${source})`)
  const sender = options.sender ?? ctx.sender
  const { wallet, walletAddress } = await bootstrapWallet(ctx, sender)
  await escrowApp(wallet, escrow)
  const revenueManager = (await ctx.dao.client.state.global.pluginAppList())?.revenueManager ?? 0n
  if (revenueManager <= 0n) throw new Error('The DAO pluginAppList names no revenue manager')
  const rm = createPluginClient('revenueManagerPlugin', ctx, revenueManager, sender) as unknown as RevenueManagerPluginSDK

  const grants = await wallet.client.state.box.plugins.getMap()
  const grant = (escrowName: string) => [...grants].find(([key]) => key.plugin === revenueManager && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === escrowName)?.[1]
  const root = grant('')
  if (!root?.useExecutionKey) throw new Error(`RevenueManager ${revenueManager} has no global execution-key grant on the DAO wallet; run rollout step G3 first`)
  const record = await rm.client.state.box.escrows.value({ wallet: wallet.appId, escrow }).catch(() => undefined)
  if (record && record.source !== source) throw new Error(`Escrow "${escrow}" is registered with source ${record.source}, not ${source}; the source cannot be changed here`)
  const needsRegister = !record
  const needsGrant = !grant(escrow)
  log(`  Escrow "${escrow}" on RevenueManager ${revenueManager}: ${needsRegister ? 'not registered' : 'registered'}; grant ${needsGrant ? 'absent' : 'present'}`)
  if ((!needsRegister && !needsGrant) || options.plan) return { escrow, revenueManager, registered: needsRegister, granted: needsGrant }

  const methods = [
    // optIn stays first: fee generators rekey an escrow to the revenue manager with method offset 0
    { name: rm.optIn(), cooldown: 0n },
    { name: rm.startEscrowDisbursement(), cooldown: 0n },
    { name: rm.processEscrowAllocation(), cooldown: 0n },
    { name: rm.finalizeEscrowDisbursement(), cooldown: 0n },
  ]
  const actions: ProposalAction<SDKClient>[] = []
  let execution: Awaited<ReturnType<typeof wallet.build.usePlugin>> | undefined
  let walletMbr = 0n
  if (needsRegister) {
    await fundWalletAdmin(ctx, wallet)
    execution = await wallet.build.usePlugin({
      sender: ctx.sender, signer: ctx.signer, lease: `rev_escrow_${Date.now() % 1_000_000}`, windowSize: WINDOW_ROUNDS, callerType: CallerType.Global,
      calls: [rm.newReceiveEscrowWithRef({
        sender: ctx.sender, signer: ctx.signer, escrow, source, allocatable: true, optinAllowed: true,
        splitRef: { app: ctx.dao.appId, key: new Uint8Array(Buffer.from(REVENUE_SPLITS_KEY)) },
      })],
    })
    walletMbr += (await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.ids.length) })).executions
    actions.push({
      type: ProposalActionEnum.ExecutePlugin, plugin: revenueManager, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
      executionKey: execution.lease, groups: execution.ids, firstValid: execution.firstValid, lastValid: execution.lastValid,
    })
  }
  if (needsGrant) {
    walletMbr += (await wallet.getMbr({ escrow, methodCount: BigInt(methods.length), plugin: '', groups: 0n })).plugins
    actions.push({
      type: ProposalActionEnum.AddPlugin, client: rm, callerType: CallerType.Global, escrow,
      sourceLink: options.sourceLink ?? DEFAULT_SOURCE_LINK, useExecutionKey: false, methods,
    } as ProposalAction<SDKClient>)
  }
  await fundWallet(ctx, walletAddress, walletMbr, log)
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, actions)
  log(`  Proposal ${proposalId} executed: ${[needsRegister && 'ExecutePlugin newReceiveEscrowWithRef', needsGrant && 'AddPlugin'].filter(Boolean).join(' + ')}`)
  if (execution) {
    await execution.send()
    await clearUsedKey(ctx, execution.lease, log)
  }

  const after = await rm.client.state.box.escrows.value({ wallet: wallet.appId, escrow }).catch(() => undefined)
  if (!after || after.source !== source) throw new Error(`Escrow "${escrow}" is not registered with source ${source} after the proposal`)
  const installed = [...await wallet.client.state.box.plugins.getMap()].find(([key]) => key.plugin === revenueManager && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === escrow)?.[1]
  const wanted = methods.map((method) => hex(method.name().selectors[0]))
  if (!installed || installed.useExecutionKey || installed.admin || installed.methods.map(([selector]) => hex(selector)).join() !== wanted.join()) {
    throw new Error(`The RevenueManager grant on escrow "${escrow}" does not hold optIn, start, process, finalize in that order`)
  }
  log(`  Verified: "${escrow}" is a receive escrow (source ${source}) that follows the DAO's revenue_splits, with the four-method grant`)
  return { escrow, revenueManager, registered: needsRegister, granted: needsGrant, proposalId }
}

// ---------------------------------------------------------------------------------------------
// H6: install a pay silo on one escrow, pay only
// ---------------------------------------------------------------------------------------------

export type PaySiloGrantResult = { plugin: bigint; escrow: string; recipient: string; installed: boolean; proposalId?: bigint }

export async function installPaySiloGrant(ctx: ScriptContext, options: { plugin: bigint; escrow: string; recipient: string; plan?: boolean; sender?: string; sourceLink?: string; log?: Log }): Promise<PaySiloGrantResult> {
  const log = options.log ?? console.log
  const { plugin, escrow, recipient } = options
  if (!algosdk.isValidAddress(recipient)) throw new Error(`--recipient ${recipient} is not an Algorand address`)
  const sender = options.sender ?? ctx.sender
  const { wallet, walletAddress } = await bootstrapWallet(ctx, sender)
  await escrowApp(wallet, escrow)

  const app = await ctx.algorand.client.algod.getApplicationByID(plugin).do().catch(() => { throw new Error(`PaySiloPlugin ${plugin} does not exist`) })
  if (!Buffer.from(app.params!.approvalProgram).equals(Buffer.from(loadCompiled(PAY_SILO_ARTIFACT).approval))) {
    throw new Error(`App ${plugin} does not run the tree ${PAY_SILO_ARTIFACT}`)
  }
  const stored = (app.params!.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === 'recipient')?.value.bytes
  const pinned = stored && stored.length === 32 ? algosdk.encodeAddress(stored) : undefined
  // The recipient is fixed at creation and is the whole safety of an open grant, so it is restated here.
  if (pinned !== recipient) throw new Error(`PaySiloPlugin ${plugin} pays ${pinned ?? '(unset)'}, not ${recipient}`)

  const client = createPluginClient('paySiloPlugin', ctx, plugin, sender) as unknown as PaySiloPluginSDK
  const paySelector = hex(client.pay()().selectors[0])
  const find = async () => [...await wallet.client.state.box.plugins.getMap()].find(([key]) => key.plugin === plugin && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === escrow)?.[1]
  const narrow = (info: NonNullable<Awaited<ReturnType<typeof find>>>) => !info.admin && !info.canReclaim && !info.useExecutionKey &&
    info.methods.length === 1 && hex(info.methods[0][0]) === paySelector
  const existing = await find()
  if (existing && !narrow(existing)) throw new Error(`The DAO wallet already holds a PaySiloPlugin ${plugin} grant on "${escrow}" that is not the pay-only grant`)
  log(`  PaySiloPlugin ${plugin} pays ${recipient}; pay-only grant on "${escrow}": ${existing ? 'present' : 'absent'}`)
  if (existing || options.plan) return { plugin, escrow, recipient, installed: !existing }

  const mbr = await wallet.getMbr({ escrow, methodCount: 1n, plugin: '', groups: 0n })
  await fundWallet(ctx, walletAddress, mbr.plugins, log)
  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [{
    type: ProposalActionEnum.AddPlugin, client, callerType: CallerType.Global, escrow,
    sourceLink: options.sourceLink ?? DEFAULT_SOURCE_LINK, useExecutionKey: false, methods: [{ name: client.pay(), cooldown: 0n }],
  } as ProposalAction<SDKClient>])
  const after = await find()
  if (!after || !narrow(after)) throw new Error(`The pay-only grant of PaySiloPlugin ${plugin} on "${escrow}" is missing after proposal ${proposalId}`)
  log(`  AddPlugin proposal ${proposalId} executed; verified the pay-only grant on "${escrow}"`)
  return { plugin, escrow, recipient, installed: true, proposalId }
}
