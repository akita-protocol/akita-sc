#!/usr/bin/env node
/**
 * Give TestNet's DAO wallet the escrows, escrow locks and plugin grants MainNet's has, before the rollout
 * is rehearsed there (docs/rollout/MAINNET-ROLLOUT.md, A4). MainNet is only read. See
 * `scripts/lib/dao-wallet-parity.ts` for the rules.
 *
 * MainNet's two account escrows are plain accounts rekeyed to its DAO wallet. On TestNet the run creates a
 * stand-in for each: a new account, funded with 0.2 ALGO and rekeyed to the TestNet DAO wallet in one group.
 *
 * Usage (from projects/akita-sc):
 *   npm run rollout:testnet-parity -- -n testnet --dry-run --sender "$CREATOR"
 *   npm run rollout:testnet-parity -- -n testnet --confirm
 */
import fs from 'node:fs'
import algosdk from 'algosdk'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { parseSetup, readSetup, runParity, serializeSetup, type Setup } from './lib/dao-wallet-parity'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const values = (key: string) => args.flatMap((arg, i) => (arg === key && args[i + 1] ? [args[i + 1]] : []))
  const pairs = (key: string) => values(key).map((pair) => {
    const [from, to, ...rest] = pair.split('=')
    if (!from || !to || rest.length) throw new Error(`${key} takes <from>=<to>, got "${pair}"`)
    return [from, to] as const
  })
  const options = parseBaseArgs('testnet-dao-parity.ts', `
  --confirm                      Create the stand-in accounts and the proposals (plans only without it)
  --keep-extra                   Leave the grants only TestNet has, instead of removing them
  --plugin <mainnet>=<testnet>   Name the TestNet app for a MainNet plugin app (repeatable)
  --caller <mainnet>=<testnet>   Grant a different account on TestNet than the MainNet caller (repeatable)
  --stand-in <escrow>=<address>  Register this account, already rekeyed to the TestNet DAO wallet, for an account escrow (repeatable)
  --source-snapshot <file>       Read MainNet's setup from a file written by --save-snapshot instead of the network
  --save-snapshot <file>         Write the MainNet setup that was read
  --source-link <url>            Source link stored with each new grant`)
  if (options.network !== 'testnet') throw new Error('This step changes TestNet only: pass -n testnet. MainNet is the source and is only read.')

  // MainNet first: the SDK holds one current network, and the context built last sets it.
  const snapshot = value('--source-snapshot')
  let source: Setup
  if (snapshot) {
    source = parseSetup(fs.readFileSync(snapshot, 'utf8'))
  } else {
    // Dry-run mode: the MainNet context never holds the key, whatever the environment holds.
    source = await readSetup(await setupContext({ network: 'mainnet', version: 'read-only', dryRun: true, algodToken: options.algodToken }))
  }
  if (source.network !== 'mainnet') throw new Error(`The source setup is ${source.network}'s, not MainNet's`)
  const save = value('--save-snapshot')
  if (save) fs.writeFileSync(save, serializeSetup(source))

  for (const [, address] of [...pairs('--caller'), ...pairs('--stand-in')]) {
    if (!algosdk.isValidAddress(address)) throw new Error(`"${address}" is not an Algorand address`)
  }
  const ctx = await setupContext(options, { minBalance: 2_000_000n })
  const creator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  await runParity(ctx, source, {
    confirm: args.includes('--confirm'),
    keepExtra: args.includes('--keep-extra'),
    sender: options.dryRun ? options.sender ?? creator : ctx.sender,
    plugins: new Map(pairs('--plugin').map(([from, to]) => [BigInt(from), BigInt(to)])),
    callers: new Map(pairs('--caller')),
    standIns: new Map(pairs('--stand-in')),
    sourceLink: value('--source-link'),
  })
})
