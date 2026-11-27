#!/usr/bin/env node
/**
 * Prints one id or address a later rollout command needs, so that none is copied by hand.
 *
 *   npm run -s rollout:id -- -n mainnet --app meta              the app id the SDK records under a key
 *   npm run -s rollout:id -- -n mainnet --app meta --address    that app's address
 *   npm run -s rollout:id -- -n mainnet --escrow rev_guilds     the app id of a DAO wallet escrow, read from the chain
 *
 * Read-only: the context is built in dry-run mode, whose signer throws. The value is the only thing
 * written to stdout, and everything else goes to stderr, so
 * `export META=$(npm run -s rollout:id -- -n mainnet --app meta)` takes the value alone. When the key
 * is not recorded (rebuild the SDK after --register) or the escrow does not exist it fails and writes
 * nothing to stdout, so the variable is left empty and the command that uses it refuses.
 */
import { getNetworkAppIds } from 'akita-sdk'
import { appAddress, isRolloutValue, recordedAppId } from './lib/rollout-id'
import { parseBaseArgs, runScript, setupContext } from './script-base'

// Only the value may reach stdout.
console.log = console.error

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  if (!args.includes('--dry-run')) process.argv.push('--dry-run')
  const options = parseBaseArgs('rollout-id.ts', `
  --app <key>         An app key of the SDK network map, such as meta or guildFactory
  --address           With --app: print the app's address instead of its id
  --escrow <name>     A DAO wallet escrow: print its app id, read from the chain`)
  const app = value('--app')
  const escrow = value('--escrow')
  if ((app === undefined) === (escrow === undefined)) throw new Error('Give exactly one of --app <key> and --escrow <name>')

  let out: string
  if (app !== undefined) {
    const id = recordedAppId(getNetworkAppIds(options.network) as unknown as Record<string, unknown>, app)
    out = args.includes('--address') ? appAddress(id) : id.toString()
  } else {
    if (args.includes('--address')) throw new Error('--address goes with --app')
    const ctx = await setupContext(options)
    const info = (await (await ctx.dao.getWallet()).getEscrows()).get(escrow!)
    if (!info || info.id <= 0n) throw new Error(`The DAO wallet has no application escrow "${escrow}"`)
    out = info.id.toString()
  }
  if (!isRolloutValue(out)) throw new Error(`Refusing to print "${out}": it is neither an app id nor an address`)
  process.stdout.write(`${out}\n`)
})
