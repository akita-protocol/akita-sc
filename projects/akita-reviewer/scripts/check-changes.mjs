#!/usr/bin/env node
// Lists tracked apps whose program changed since they were last reviewed.
// Phase 0 and 1 keep "last reviewed" in work/state.json; phase 2 reads the
// reviewer's Meta pointer records instead.
//
//   node scripts/check-changes.mjs                          # print changed apps as JSON
//   node scripts/check-changes.mjs --record mainnet:123456  # mark an app reviewed at its live hash
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { fetchApplication } from './core/program.mjs'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const STATE = join(ROOT, 'work/state.json')
const { values } = parseArgs({
  options: {
    record: { type: 'string', multiple: true, default: [] },
    limit: { type: 'string', default: '5' },
  },
})

const tracked = JSON.parse(readFileSync(join(ROOT, 'tracked.json'), 'utf8'))
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {}

async function live(networkName, appId) {
  const network = tracked.networks[networkName]
  if (!network) throw new Error(`tracked.json has no network "${networkName}"`)
  return fetchApplication({ algod: network.algod, token: network.token, appId })
}

if (values.record.length) {
  for (const entry of values.record) {
    const [networkName, id] = entry.split(':')
    const app = await live(networkName, Number(id))
    state[`${networkName}:${id}`] = app.deleted
      ? { deleted: true, recordedAt: new Date().toISOString() }
      : { programHash: app.programHash, round: app.round, recordedAt: new Date().toISOString() }
    console.log(`recorded ${networkName}:${id}`)
  }
  mkdirSync(dirname(STATE), { recursive: true })
  writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n')
  process.exit(0)
}

const changed = []
const failures = []
for (const [networkName, network] of Object.entries(tracked.networks)) {
  for (const entry of network.apps) {
    const key = `${networkName}:${entry.appId}`
    try {
      const app = await live(networkName, entry.appId)
      const last = state[key]
      if (app.deleted) {
        if (!last?.deleted) changed.push({ key, name: entry.name, change: 'deleted' })
        continue
      }
      if (!last) changed.push({ key, name: entry.name, change: 'never reviewed', programHash: app.programHash, round: app.round })
      else if (last.programHash !== app.programHash) {
        changed.push({ key, name: entry.name, change: 'program changed', from: last.programHash, programHash: app.programHash, round: app.round })
      }
    } catch (error) {
      failures.push({ key, error: error.message })
    }
  }
}
const limit = Number(values.limit)
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), changed: changed.slice(0, limit), deferred: changed.length > limit ? changed.slice(limit).map((c) => c.key) : [], failures }, null, 2))
