#!/usr/bin/env node
/**
 * LocalNet only: deploy the MOCK Haystack Router (not Haystack's code; see scripts/lib/mock-haystack.ts).
 *
 *   - Tinyman v2 from the vendored fixture (official bytecode, downloaded and hash-checked) with ALGO/USDC,
 *     AKTA/USDC and ALGO/AKTA pools, priced a little apart so routes can take two hops or split
 *   - the mock router app (smart_contracts/mocks/haystack-router-localnet); each swap's route comes from a fresh
 *     per-swap account, as Haystack's do
 *
 * Writes MOCK_TINYMAN_APP_ID, MOCK_HAYSTACK_ROUTER_APP_ID and MOCK_HAYSTACK_API_URL to `.env.localnet` here and in
 * akita-rn (the apps use the mock only when these are set). IDs already in the env file are reused. Run the API
 * with `npm run mock-haystack`.
 *
 * Usage: npm run deploy:mock-haystack   (also run at the end of deploy:localnet-v2)
 */
import fs from 'node:fs'
import path from 'node:path'
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'
import { addInitialLiquidity, bootstrapPool, deployTinymanV2, deriveTinymanPool, readPoolState } from '../tests/fixtures/external/tinyman-v2'
import { compileRouter } from './lib/mock-haystack'

const ENV_FILE = path.resolve(__dirname, '../.env.localnet')
const RN_ENV_FILE = path.resolve(__dirname, '../../../../akita-rn/.env.localnet')
export const MOCK_HAYSTACK_PORT = 8787
export const MOCK_HAYSTACK_API_URL = `http://localhost:${MOCK_HAYSTACK_PORT}/api`

export function readEnv(file = ENV_FILE): Record<string, string> {
  if (!fs.existsSync(file)) throw new Error(`${file} not found: run deploy:universe -n localnet first`)
  const out: Record<string, string> = {}
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^"(.*)"$/, '$1')
  }
  return out
}

/** Deploy what is missing; returns the [key, value] pairs to append to the env files */
export async function deployMockHaystack(algorand: AlgorandClient, sender: string, env: Record<string, string>) {
  const added: [string, string][] = []
  const id = (key: string) => (env[key] ? BigInt(env[key]) : 0n)
  const record = (key: string, value: bigint | string) => {
    env[key] = value.toString()
    added.push([key, value.toString()])
    console.log(`   ${key}=${value}`)
  }
  const fund = (receiver: string, amount: bigint) => algorand.send.payment({ sender, receiver, amount: microAlgo(amount) })

  console.log('\n🧪 MOCK Haystack Router (LocalNet only, not Haystack code)')
  const akta = id('AKTA_ASSET_ID')
  const usdc = id('USDC_ASSET_ID')
  if (akta === 0n || usdc === 0n) throw new Error('AKTA_ASSET_ID and USDC_ASSET_ID are required')

  if (id('MOCK_TINYMAN_APP_ID') === 0n) {
    const tm = await deployTinymanV2(algorand, sender)
    record('MOCK_TINYMAN_APP_ID', tm.appId)
  }
  const tm = { algorand, appId: id('MOCK_TINYMAN_APP_ID'), appAddress: algosdk.getApplicationAddress(id('MOCK_TINYMAN_APP_ID')).toString(), admin: sender }
  // ALGO/USDC at 1 : 1.02, AKTA/USDC at 100 : 1 and ALGO/AKTA at 1 : 100, so the two-hop price differs a little
  for (const [a, b, amountA, amountB] of [
    [0n, usdc, 1_000_000_000n, 1_020_000_000n],
    [akta, usdc, 100_000_000_000n, 1_000_000_000n],
    [0n, akta, 1_000_000_000n, 100_000_000_000n],
  ] as const) {
    const derived = deriveTinymanPool(tm.appId, a, b)
    let state = await readPoolState(tm, derived.address)
    const pool = state ? { ...derived, lpAsset: state.lpAsset } : await bootstrapPool(tm, sender, a, b)
    state = await readPoolState(tm, pool.address)
    if (state && state.issued === 0n) await addInitialLiquidity(tm, pool, sender, a, amountA, amountB)
    console.log(`   Tinyman pool ${a}/${b}: ${pool.address}`)
  }

  if (id('MOCK_HAYSTACK_ROUTER_APP_ID') === 0n) {
    const { approval, clear } = await compileRouter(algorand)
    const { appId } = await algorand.send.appCreate({ sender, approvalProgram: approval, clearStateProgram: clear })
    // asset opt-in MBR as routes reach new assets
    await fund(algosdk.getApplicationAddress(appId).toString(), 2_000_000n)
    record('MOCK_HAYSTACK_ROUTER_APP_ID', appId)
  }
  if (env.MOCK_HAYSTACK_API_URL !== MOCK_HAYSTACK_API_URL) record('MOCK_HAYSTACK_API_URL', MOCK_HAYSTACK_API_URL)
  return added
}

/** Append the new keys here and, when it exists, to akita-rn's env file */
export function appendMockHaystackEnv(added: [string, string][]) {
  if (added.length === 0) return
  const header = `# MOCK Haystack Router, LocalNet only (deploy-mock-haystack, ${new Date().toISOString()})`
  const block = ['', header, ...added.map(([k, v]) => `${k}=${v}`), ''].join('\n')
  fs.appendFileSync(ENV_FILE, block)
  if (fs.existsSync(RN_ENV_FILE)) fs.appendFileSync(RN_ENV_FILE, block)
}

async function main() {
  const env = readEnv()
  if (env.ALGORAND_NETWORK !== 'localnet') throw new Error('deploy-mock-haystack only runs against LocalNet')
  const algorand = AlgorandClient.defaultLocalNet()
  const deployer = await algorand.account.dispenserFromEnvironment()
  algorand.setSigner(deployer.addr, deployer.signer)
  const added = await deployMockHaystack(algorand, deployer.addr.toString(), env)
  appendMockHaystackEnv(added)
  console.log(added.length ? `\n📄 Appended ${added.length} keys to .env.localnet` : '\n✅ Mock Haystack already deployed')
}

if (require.main === module) {
  main().then(
    () => process.exit(0),
    (error) => {
      console.error('\n❌ deploy-mock-haystack failed:', error)
      process.exit(1)
    },
  )
}
