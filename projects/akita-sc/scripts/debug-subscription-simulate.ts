#!/usr/bin/env node

/**
 * Diagnostic script for the subscription services setup failure.
 *
 * Reproduces the exact failing call from `setupSubscriptionServices`:
 *
 *   daoWallet.build.usePlugin({
 *     callerType: CallerType.Global,
 *     calls: subscriptionsPluginSdk.newServiceWithDescription({...}),
 *   })
 *
 * Instead of letting the SDK simulate (which throws on the first failure
 * with no trace info), we:
 *   1. Build the prepared group via `prepareUsePlugin` (no simulate).
 *   2. Build the raw ATC and force-set signers to empty.
 *   3. Call `algod.simulate()` directly with `execTraceConfig.enable: true`
 *      and `stateChange: true`, `stackChange: true`.
 *   4. Walk the response and dump:
 *        - Initial wallet (app 1106) global state
 *        - Per-txn global-state writes
 *        - For the failing txn, the full opcode trace surrounding the
 *          failing PC, including stack values
 *        - Decoded value of `spending_address` at the moment of failure
 *
 * Usage:
 *   ts-node --transpile-only scripts/debug-subscription-simulate.ts \
 *       --summary deployment-summary-localnet-1776109033262.json
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import algosdk, {
  Address,
  ALGORAND_ZERO_ADDRESS_STRING,
  makeEmptyTransactionSigner,
  modelsv2,
} from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { setCurrentNetwork } from 'akita-sdk'
import { AkitaDaoSDK } from 'akita-sdk/dao'
import {
  CallerType,
  SubscriptionsPluginSDK,
} from 'akita-sdk/wallet'

// Re-implement forceProperties (not exported from akita-sdk/wallet)
function forceSenderAndSigner(
  atc: algosdk.AtomicTransactionComposer,
  sender: string,
  signer: algosdk.TransactionSigner,
): algosdk.AtomicTransactionComposer {
  const group = atc.clone().buildGroup()
  const newAtc = new algosdk.AtomicTransactionComposer()
  group.forEach((t: any) => {
    t.txn.group = undefined
    t.txn.sender = algosdk.decodeAddress(sender)
    t.signer = signer
    newAtc.addTransaction(t)
  })
  // Preserve method calls
  ;(newAtc as any)['methodCalls'] = (atc as any)['methodCalls']
  return newAtc
}
import { SubscriptionsSDK, HighlightMessage } from 'akita-sdk/subscriptions'
import { createAlgorandClient } from './script-base'

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2)
let summaryPath = 'deployment-summary-localnet-1776109033262.json'
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--summary' || args[i] === '-s') {
    summaryPath = args[i + 1]
    i++
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SECONDS_PER_MONTH = 30n * 86400n
const USDC_DECIMALS = 6
const usdcAmount = (dollars: number) => BigInt(dollars * 10 ** USDC_DECIMALS)

function hexColorToBytes(hex: string): Uint8Array {
  const h = hex.replace('#', '')
  return new Uint8Array([
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ])
}

/** Pretty-print bytes as base32 Algorand address if 32 bytes, else hex */
function fmtBytes(b: Uint8Array | undefined): string {
  if (!b) return '<undefined>'
  if (b.length === 32) {
    try {
      return algosdk.encodeAddress(b)
    } catch {
      /* fall through */
    }
  }
  return `0x${Array.from(b).map((x) => x.toString(16).padStart(2, '0')).join('')} (${b.length} bytes)`
}

/** Decode an AvmValue for printing */
function fmtAvmValue(v: any): string {
  if (!v) return '<undefined>'
  // type 1 = bytes, type 2 = uint64
  if (v.type === 2 || v.type === 2n) return `uint64(${v.uint?.toString() ?? '0'})`
  if (v.type === 1 || v.type === 1n) return `bytes(${fmtBytes(v.bytes)})`
  return JSON.stringify(v, (_, val) =>
    val instanceof Uint8Array ? Array.from(val) : typeof val === 'bigint' ? val.toString() : val,
  )
}

function decodeKey(k: Uint8Array): string {
  try {
    const s = Buffer.from(k).toString('utf-8')
    if (/^[\x20-\x7e]+$/.test(s)) return s
  } catch { /* */ }
  return `0x${Buffer.from(k).toString('hex')}`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('━'.repeat(80))
  console.log('Subscription services simulate diagnostic')
  console.log('━'.repeat(80))

  // Load deployment summary
  const summary = JSON.parse(readFileSync(resolve(summaryPath), 'utf-8'))
  const daoAppId = BigInt(summary.contracts.dao.appId)
  const walletAppId = BigInt(summary.contracts.wallet.appId)
  const subscriptionsAppId = BigInt(summary.contracts.subscriptions.appId)
  const subscriptionsPluginAppId = BigInt(summary.contracts.subscriptionsPlugin.appId)
  const usdcAssetId = BigInt(summary.contracts.usdcAssetId)

  console.log(`DAO app:               ${daoAppId}`)
  console.log(`DAO wallet app:        ${walletAppId}  (${summary.contracts.wallet.address})`)
  console.log(`Subscriptions app:     ${subscriptionsAppId}`)
  console.log(`Subscriptions plugin:  ${subscriptionsPluginAppId}`)
  console.log(`USDC asset:            ${usdcAssetId}`)
  console.log()

  // Algorand client + sender
  const algorand = createAlgorandClient('localnet')
  const fixture = algorandFixture()
  await fixture.newScope()
  const account = fixture.context.testAccount as algosdk.Account
  const sender = account.addr.toString()
  const signer = (account as any).signer

  console.log(`Sender (placeholder):  ${sender}\n`)

  setCurrentNetwork('localnet')

  // SDK instances
  const dao = new AkitaDaoSDK({
    algorand,
    factoryParams: { appId: daoAppId, defaultSender: sender, defaultSigner: signer },
  })
  const daoWallet = await dao.getWallet()
  const subscriptionsPluginSdk = new SubscriptionsPluginSDK({
    algorand,
    factoryParams: { appId: subscriptionsPluginAppId, defaultSender: sender, defaultSigner: signer },
  })
  const subscriptionsSdk = new SubscriptionsSDK({
    algorand,
    factoryParams: { appId: subscriptionsAppId, defaultSender: sender, defaultSigner: signer },
  })

  // Resolve rev_subscriptions escrow payout address (matches setup script)
  let revSubPayoutAddress: string
  try {
    const revSubEscrowInfo = await daoWallet.getEscrow('rev_subscriptions')
    revSubPayoutAddress = algosdk.getApplicationAddress(revSubEscrowInfo.id).toString()
  } catch (e) {
    console.warn(`Could not resolve rev_subscriptions escrow: ${e}`)
    console.warn(`Falling back to wallet's app address as payoutAddress`)
    revSubPayoutAddress = daoWallet.client.appAddress.toString()
  }
  console.log(`rev_subscriptions payout: ${revSubPayoutAddress}\n`)

  // Service definition (matches first service in setup script)
  const service = {
    title: 'Plus',
    price: usdcAmount(20),
    interval: SECONDS_PER_MONTH,
    highlightMessage: HighlightMessage.None,
    highlightColor: '#3EE1A1',
    description: [
      'Boost your social impact and unlock gated experiences across the Akita ecosystem.',
      '',
      '- Social impact boost',
      '- Core agent access',
      '- Exclusive Plus badge',
      '- Gated staking pools, auctions, and raffles',
      '- Customizable gallery',
    ].join('\n'),
  }
  // Use a placeholder banner CID (36 bytes) — content irrelevant for the failing assert.
  const placeholderBanner = new Uint8Array(36)
  placeholderBanner[0] = 0x01
  placeholderBanner[1] = 0x55
  placeholderBanner[2] = 0x12
  placeholderBanner[3] = 0x20

  // ── Build the prepared group WITHOUT simulating ──────────────────────────
  console.log('Building usePlugin prepared group (no simulate)...')
  const calls = subscriptionsPluginSdk.newServiceWithDescription({
    sender,
    signer,
    description: service.description,
    interval: service.interval,
    asset: usdcAssetId,
    amount: service.price,
    passes: 0n,
    gate: 0n,
    payoutAddress: revSubPayoutAddress,
    title: service.title,
    bannerImage: placeholderBanner,
    highlightMessage: service.highlightMessage,
    highlightColor: hexColorToBytes(service.highlightColor),
  })

  // Mirror what wallet.build.usePlugin does internally
  const prepared = await daoWallet.prepareUsePlugin({
    sender,
    signer,
    lease: `debug_${Date.now() % 1_000_000}`,
    callerType: CallerType.Global,
    calls,
  })
  const admin = await daoWallet.client.state.global.admin()
  const suggestedParams = await algorand.getSuggestedParams()

  const builtGroup = await (await prepared.group.composer()).build()
  const atcRaw = builtGroup.atc

  // Apply same forceProperties as build.usePlugin (inline)
  const atc = forceSenderAndSigner(atcRaw, admin, makeEmptyTransactionSigner())

  console.log(`Prepared group size: ${(atc as any).transactions.length} txns`)
  console.log(`Admin (forced sender): ${admin}\n`)

  // ── Cap fees so simulate doesn't fail on coverInnerFees pre-check ──────
  const minFee = BigInt(suggestedParams.minFee)
  ;(atc as any).transactions.forEach((t: any, i: number) => {
    if (t.txn.type === algosdk.TransactionType.appl) {
      // Generous cap: 272 * minFee — matches what build.usePlugin uses
      t.txn.fee = minFee * 272n
    }
    t.signer = makeEmptyTransactionSigner()
  })

  // ── Simulate WITH full trace ────────────────────────────────────────────
  console.log('Running simulate with full execution trace...\n')
  const req = new modelsv2.SimulateRequest({
    txnGroups: [],
    allowUnnamedResources: true,
    allowEmptySignatures: true,
    fixSigners: true,
    execTraceConfig: new modelsv2.SimulateTraceConfig({
      enable: true,
      stackChange: true,
      stateChange: true,
      scratchChange: false,
    }),
  })

  const resp = await atc.simulate(algorand.client.algod, req)
  const sr = resp.simulateResponse
  const grp = sr.txnGroups[0]

  // ── Dump initial states for the wallet app ─────────────────────────────
  console.log('━'.repeat(80))
  console.log(`Initial app states accessed:`)
  console.log('━'.repeat(80))
  const initStates = sr.initialStates?.appInitialStates ?? []
  for (const a of initStates) {
    console.log(`  App ${a.id}:`)
    if (a.appGlobals) {
      for (const kv of a.appGlobals.kvs ?? []) {
        console.log(`     [global] ${decodeKey(kv.key).padEnd(28)} = ${fmtAvmValue(kv.value)}`)
      }
    }
  }
  console.log()

  // ── Failure summary ────────────────────────────────────────────────────
  if (grp.failureMessage) {
    console.log('━'.repeat(80))
    console.log(`FAILURE: ${grp.failureMessage}`)
    console.log(`failedAt path:  [${(grp as any).failedAt?.join(', ')}]`)
    console.log('━'.repeat(80))
    console.log()
  } else {
    console.log('━'.repeat(80))
    console.log('SIMULATION SUCCEEDED — no error to debug.')
    console.log('━'.repeat(80))
    return
  }

  // ── Walk per-txn results ───────────────────────────────────────────────
  const failedAt = (grp as any).failedAt as number[] | undefined
  const failedTxnIdx = failedAt?.[0] ?? -1

  console.log('Per-transaction summary:')
  console.log('─'.repeat(80))
  // Track: collect ALL writes to wallet's spending_address (any app, any depth)
  const spendingAddressWrites: { txnIdx: number; depth: string; appId?: bigint; pc: number; value: any; op: string }[] = []

  function walkTrace(trace: any, txnIdx: number, depth: string, appId?: bigint) {
    if (!trace) return
    if (trace.approvalProgramTrace) {
      const stateOps: { pc: number; op: any }[] = []
      for (const u of trace.approvalProgramTrace) {
        if (u.stateChanges && u.stateChanges.length > 0) {
          for (const op of u.stateChanges) {
            stateOps.push({ pc: u.pc, op })
            // Track writes to spending_address (key = "spending_address")
            const keyStr = decodeKey(op.key)
            if (keyStr === 'spending_address' || keyStr === 'current_plugin' || keyStr === 'rekey_index') {
              spendingAddressWrites.push({
                txnIdx, depth, appId, pc: u.pc, value: op.newValue, op: op.operation,
              })
            }
          }
        }
      }
      if (stateOps.length > 0) {
        for (const { pc, op } of stateOps) {
          const action = op.operation === 'w' ? 'WRITE' : op.operation === 'd' ? 'DELETE' : op.operation
          const where =
            op.appStateType === 'g' ? 'global' :
            op.appStateType === 'l' ? `local(${op.account})` :
            op.appStateType === 'b' ? 'box' : op.appStateType
          console.log(
            `${depth}      pc=${pc}  ${action} ${where} key=${decodeKey(op.key)} value=${fmtAvmValue(op.newValue)}`,
          )
        }
      }
    }
    // Walk inner traces
    if (trace.innerTrace) {
      for (let j = 0; j < trace.innerTrace.length; j++) {
        const inner = trace.innerTrace[j]
        const childAppId = inner.spawnedInner?.id ?? inner.appId
        console.log(`${depth}      └─[inner ${j}] appId=${childAppId ?? '?'}`)
        walkTrace(inner, txnIdx, depth + '  ', childAppId)
      }
    }
  }

  for (let i = 0; i < grp.txnResults.length; i++) {
    const tr = grp.txnResults[i] as any
    const txn: any = (atc as any).transactions[i].txn
    let txnDesc = `[${i}] type=${txn.type}`
    if (txn.type === algosdk.TransactionType.appl) {
      txnDesc += ` appId=${txn.applicationCall?.appIndex ?? '<create>'}`
      const args = txn.applicationCall?.appArgs
      if (args && args.length > 0) {
        const sel = Buffer.from(args[0]).toString('hex')
        txnDesc += ` selector=0x${sel}`
      }
    }
    if (i === failedTxnIdx) txnDesc += '  ← FAILED'
    console.log(txnDesc)

    walkTrace(tr.execTrace, i, '  ', txn.applicationCall?.appIndex)
  }
  console.log()

  // Print all wallet 2111 spending_address / current_plugin / rekey_index writes
  console.log('━'.repeat(80))
  console.log('Tracked wallet-state writes (spending_address / current_plugin / rekey_index):')
  console.log('━'.repeat(80))
  for (const w of spendingAddressWrites) {
    console.log(
      `  txn[${w.txnIdx}] ${w.depth.trim() ? '(inner)' : '(outer)'} app=${w.appId} pc=${w.pc} ${w.op} value=${fmtAvmValue(w.value)}`,
    )
  }
  console.log()

  // ── Deep-dive on failing txn ───────────────────────────────────────────
  if (failedTxnIdx >= 0) {
    const tr = grp.txnResults[failedTxnIdx] as any
    const trace = tr.execTrace
    if (trace?.approvalProgramTrace) {
      console.log('━'.repeat(80))
      console.log(`Approval-program trace for failing txn [${failedTxnIdx}]:`)
      console.log('━'.repeat(80))

      const traces: any[] = trace.approvalProgramTrace
      const lastTrace = traces[traces.length - 1]
      const failingPc = lastTrace?.pc

      // Show last 25 opcodes leading up to the failure with stack additions
      const start = Math.max(0, traces.length - 25)
      for (let i = start; i < traces.length; i++) {
        const u = traces[i]
        const isFailing = i === traces.length - 1
        const stackAdds = u.stackAdditions
          ? u.stackAdditions.map((v: any) => fmtAvmValue(v)).join(', ')
          : ''
        const stateChanges = u.stateChanges
          ? u.stateChanges
              .map((op: any) => `${op.operation} ${decodeKey(op.key)}=${fmtAvmValue(op.newValue)}`)
              .join('; ')
          : ''
        const marker = isFailing ? '  ←FAILING ASSERT' : ''
        console.log(
          `  pc=${String(u.pc).padStart(5)}  pop=${u.stackPopCount ?? 0}  add=[${stackAdds}]  ${stateChanges ? `state:[${stateChanges}]` : ''}${marker}`,
        )
      }
      console.log()
      console.log(`Failing PC: ${failingPc}`)
      console.log()

      // ── Reconstruct stack at failing PC ──────────────────────────────
      // We replay the program trace to get the stack contents right before
      // the failing assert.
      const stack: any[] = []
      for (let i = 0; i < traces.length - 1; i++) {
        const u = traces[i]
        const pop = u.stackPopCount ?? 0
        for (let j = 0; j < pop; j++) stack.pop()
        if (u.stackAdditions) for (const v of u.stackAdditions) stack.push(v)
      }
      console.log('Reconstructed stack at failing PC (top → bottom):')
      const top = stack.slice(-8).reverse()
      for (let i = 0; i < top.length; i++) {
        console.log(`   [top-${i}] ${fmtAvmValue(top[i])}`)
      }
      console.log()
    }
  }
}

main().then(
  () => process.exit(0),
  (e) => {
    console.error('\nDiagnostic script failed:', e)
    if (e instanceof Error && e.stack) console.error(e.stack)
    process.exit(1)
  },
)
