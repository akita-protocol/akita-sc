#!/usr/bin/env node
/**
 * LocalNet only: deploy the 2026-10 contracts that `deploy:universe` does not, on top of a fresh universe.
 *
 *   - Guilds: GuildConsensusFactory (+ fixed-signers, locked-token, subscription), GuildFactory (+ kernel) and the
 *     shared GuildPlugin (guild = 0) that wallets install once to create and take part in Guilds
 *   - Wallet plugins: WelcomePlugin, SocialClaim (with a generated LocalNet attestor key) and MetaPlugin
 *   - the MOCK Haystack Router (deploy-mock-haystack.ts): Tinyman v2 pools and the mock router app
 *
 * The deployer is the KMD dispenser, the same account `deploy:universe` deploys from on LocalNet, so admin calls
 * are sent directly (on MainNet these are DAO actions). App IDs already present in the env file are reused, so a
 * rerun only deploys what is missing. The new IDs are appended to `.env.localnet` here and in akita-rn.
 *
 * Usage: npm run deploy:localnet-v2
 */
import fs from 'node:fs'
import path from 'node:path'
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'
import { AkitaDaoSDK } from 'akita-sdk/dao'
import { setCurrentNetwork } from 'akita-sdk'
import { appendMockHaystackEnv, deployMockHaystack } from './deploy-mock-haystack'
import { deployGuildFactories } from './lib/guild-deployment'
import type { ScriptContext } from './script-base'
import { GuildPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/guild/GuildPluginClient'
import { WelcomePluginFactory } from '../smart_contracts/artifacts/arc58/plugins/welcome/WelcomePluginClient'
import { SocialClaimFactory } from '../smart_contracts/artifacts/arc58/social-claim/SocialClaimClient'
import { MetaPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/meta/MetaPluginClient'

const VERSION = 'localnet'
const ENV_FILE = path.resolve(__dirname, '../.env.localnet')
const RN_ENV_FILE = path.resolve(__dirname, '../../../../akita-rn/.env.localnet')

function readEnv(file: string): Record<string, string> {
  if (!fs.existsSync(file)) throw new Error(`${file} not found: run deploy:universe -n localnet first`)
  const out: Record<string, string> = {}
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^"(.*)"$/, '$1')
  }
  return out
}

async function main() {
  const env = readEnv(ENV_FILE)
  if (env.ALGORAND_NETWORK !== 'localnet') throw new Error('deploy-localnet-v2 only runs against LocalNet')
  setCurrentNetwork('localnet')
  for (const [k, v] of Object.entries(env)) process.env[k] ??= v

  const algorand = AlgorandClient.defaultLocalNet()
  const deployer = await algorand.account.dispenserFromEnvironment()
  const sender = deployer.addr.toString()
  const signer = deployer.signer
  algorand.setSigner(sender, signer)
  const factoryParams = { defaultSender: sender, defaultSigner: signer }
  const id = (key: string) => (env[key] ? BigInt(env[key]) : 0n)
  const added: [string, string][] = []
  const record = (key: string, value: bigint | string) => {
    env[key] = value.toString()
    added.push([key, value.toString()])
    console.log(`   ${key}=${value}`)
  }
  const fund = (receiver: string, amount: bigint) =>
    algorand.send.payment({ sender, signer, receiver, amount: microAlgo(amount) })

  const daoAppId = id('DAO_APP_ID')
  const walletFactory = id('WALLET_FACTORY_APP_ID')
  if (daoAppId === 0n || walletFactory === 0n) throw new Error('DAO_APP_ID and WALLET_FACTORY_APP_ID are required')
  const dao = new AkitaDaoSDK({ algorand, factoryParams: { appId: daoAppId, ...factoryParams } })

  // GUILDS ------------------------------------------------------------------------------------------
  if (id('GUILD_FACTORY_APP_ID') === 0n) {
    console.log('\n🏛️  Guild factories')
    const revenue = await (await dao.getWallet()).getEscrow('rev_wallet')
    const ctx = {
      options: { network: 'localnet', version: VERSION, dryRun: false },
      algorand,
      sender,
      signer,
      appIds: { dao: daoAppId },
      dao,
    } as unknown as ScriptContext
    const receiptDir = path.resolve(__dirname, '../receipts/localnet')
    fs.mkdirSync(receiptDir, { recursive: true })
    const manifest = path.join(receiptDir, `guild-factory-${Date.now()}.json`)
    const deployed = await deployGuildFactories(ctx, { revenueEscrow: { name: 'rev_wallet', app: revenue.id }, manifest })
    if (!deployed) throw new Error('Guild factories were not deployed')
    record('GUILD_CONSENSUS_FACTORY_APP_ID', deployed.consensusFactory)
    record('GUILD_FACTORY_APP_ID', deployed.guildFactory)
  }
  if (id('GUILD_PLUGIN_APP_ID') === 0n) {
    const { appClient } = await new GuildPluginFactory({ algorand, ...factoryParams }).send.create.create({
      args: { factory: id('GUILD_FACTORY_APP_ID'), guild: 0n },
    })
    record('GUILD_PLUGIN_APP_ID', appClient.appId)
  }

  // WALLET PLUGINS ----------------------------------------------------------------------------------
  console.log('\n🔌 Wallet plugins')
  if (id('WELCOME_PLUGIN_APP_ID') === 0n) {
    const { appClient } = await new WelcomePluginFactory({ algorand, ...factoryParams }).send.create.create({
      args: { factory: walletFactory },
    })
    record('WELCOME_PLUGIN_APP_ID', appClient.appId)
  }
  if (id('SOCIAL_CLAIM_APP_ID') === 0n) {
    // the backend signs claim attestations with this key on LocalNet
    const attestor = algosdk.generateAccount()
    const { appClient } = await new SocialClaimFactory({ algorand, ...factoryParams }).send.create.create({
      args: {
        welcome: id('WELCOME_PLUGIN_APP_ID'),
        pay: id('PAY_PLUGIN_APP_ID'),
        attestor: attestor.addr.publicKey,
        manager: sender,
      },
    })
    // only the account minimum: whoever sends a gift pays for its storage
    await fund(appClient.appAddress.toString(), 100_000n)
    record('SOCIAL_CLAIM_APP_ID', appClient.appId)
    record('LOCALNET_SOCIAL_CLAIM_ATTESTOR_MNEMONIC', `"${algosdk.secretKeyToMnemonic(attestor.sk)}"`)
  }
  if (id('META_PLUGIN_APP_ID') === 0n) {
    const { appClient } = await new MetaPluginFactory({ algorand, ...factoryParams }).send.create.create({
      args: { registry: id('META_APP_ID') },
    })
    record('META_PLUGIN_APP_ID', appClient.appId)
  }

  const mockAdded = await deployMockHaystack(algorand, sender, env).catch((error) => {
    console.warn('\n⚠️  MOCK Haystack Router skipped (Haystack swaps stay off on LocalNet):', error instanceof Error ? error.message : error)
    return [] as [string, string][]
  })

  if (added.length === 0 && mockAdded.length === 0) {
    console.log('\n✅ Nothing to deploy: every v2 app ID is already in .env.localnet')
    return
  }
  appendMockHaystackEnv(mockAdded)
  if (added.length === 0) return
  const block = ['', `# 2026-10 contracts (deploy-localnet-v2, ${new Date().toISOString()})`, ...added.map(([k, v]) => `${k}=${v}`), ''].join('\n')
  fs.appendFileSync(ENV_FILE, block)
  console.log(`\n📄 Appended ${added.length} IDs to ${ENV_FILE}`)
  if (fs.existsSync(RN_ENV_FILE)) {
    fs.appendFileSync(RN_ENV_FILE, block)
    console.log(`📄 Appended them to ${RN_ENV_FILE}`)
  }
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error('\n❌ deploy-localnet-v2 failed:', error)
    process.exit(1)
  },
)
