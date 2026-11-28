#!/usr/bin/env node
// Fetches one application's programs into work/apps/<network>/<appId>/ and
// prints their hashes. With --disassemble it also writes TEAL, which needs an
// algod with the developer API enabled (AlgoKit LocalNet has it).
//
//   node scripts/fetch-app.mjs --network mainnet --app 123456 [--disassemble http://localhost:4001]
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { disassemble, fetchApplication } from './core/program.mjs'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const { values } = parseArgs({
  options: {
    network: { type: 'string', default: 'mainnet' },
    app: { type: 'string' },
    disassemble: { type: 'string' },
    'disassemble-token': { type: 'string', default: 'a'.repeat(64) },
  },
})
const appId = Number(values.app)
if (!Number.isSafeInteger(appId) || appId <= 0) {
  console.error('usage: fetch-app.mjs --network <name> --app <id> [--disassemble <algod url>]')
  process.exit(2)
}
const tracked = JSON.parse(readFileSync(join(ROOT, 'tracked.json'), 'utf8'))
const network = tracked.networks[values.network]
if (!network) throw new Error(`tracked.json has no network "${values.network}"`)

const app = await fetchApplication({ algod: network.algod, token: network.token, appId })
if (app.deleted) {
  console.log(JSON.stringify({ appId, deleted: true }))
  process.exit(0)
}
const dir = join(ROOT, 'work/apps', values.network, String(appId))
mkdirSync(dir, { recursive: true })
writeFileSync(join(dir, 'approval.bin'), app.approval)
writeFileSync(join(dir, 'clear.bin'), app.clear)
if (values.disassemble) {
  const opts = { algod: values.disassemble, token: values['disassemble-token'] }
  writeFileSync(join(dir, 'approval.teal'), await disassemble({ ...opts, program: app.approval }))
  writeFileSync(join(dir, 'clear.teal'), await disassemble({ ...opts, program: app.clear }))
}
const { approval, clear, ...info } = app
const record = { network: values.network, ...info, approvalBytes: approval.length, clearBytes: clear.length }
writeFileSync(join(dir, 'app.json'), JSON.stringify(record, null, 2) + '\n')
console.log(JSON.stringify(record, null, 2))
