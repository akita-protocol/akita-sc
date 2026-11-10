#!/usr/bin/env node
/**
 * LocalNet only: deploy the 2026-10 contracts that `deploy:universe` does not, on top of a fresh universe.
 *
 *   - Guilds: GuildConsensusFactory (+ fixed-signers, locked-token, subscription), GuildFactory (+ kernel) and the
 *     shared GuildPlugin (guild = 0) that wallets install once to create and take part in Guilds
 *   - PluginDex v2: Vault, BinEngine (+ binStep 25 table), the hooks (BackrunArbHook needs a Tinyman v2
 *     validator and is skipped), LaunchManager, GatedFeePassPlugin, PluginDexPlugin; every curve and hook is
 *     approved on the Vault
 *   - Wallet plugins: WelcomePlugin, SocialClaim (with a generated LocalNet attestor key) and MetaPlugin
 *   - the MOCK Haystack Router (deploy-mock-haystack.ts): Tinyman v2 pools, the mock router app and its relay
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
import {
  binAddMbr,
  BINS_CREATE_CURVE_MBR,
  BINS_ID_CENTER,
  catalogueInstall,
  defaultBinPoolParams,
  defaultPoolConfig,
  encodeBinAddArgs,
  encodeBinInitArgs,
  PluginDexSDK,
  spotDistribution,
} from 'akita-sdk/plugin-dex'
import { appendMockHaystackEnv, deployMockHaystack } from './deploy-mock-haystack'
import { deployGuildFactories } from './lib/guild-deployment'
import { largeProgramCreateParams } from './lib/immutable-deployment'
import type { ScriptContext } from './script-base'
import { PluginDexFactory } from '../smart_contracts/artifacts/plugin-dex/PluginDexClient'
import { BinEngineFactory } from '../smart_contracts/artifacts/plugin-dex/curves/bins/BinEngineClient'
import { ImpactFeeHookFactory } from '../smart_contracts/artifacts/plugin-dex/hooks/ImpactFeeHookClient'
import { SwapTaxHookFactory } from '../smart_contracts/artifacts/plugin-dex/hooks/SwapTaxHookClient'
import { VolatilityFeeHookFactory } from '../smart_contracts/artifacts/plugin-dex/hooks/VolatilityFeeHookClient'
import { GatedFeeHookFactory } from '../smart_contracts/artifacts/plugin-dex/hooks/GatedFeeHookClient'
import { AntiSnipeFeeHookFactory } from '../smart_contracts/artifacts/plugin-dex/hooks/AntiSnipeFeeHookClient'
import { LaunchTaxHookFactory } from '../smart_contracts/artifacts/plugin-dex/hooks/LaunchTaxHookClient'
import { ConsensusKeyregHookFactory } from '../smart_contracts/artifacts/plugin-dex/hooks/ConsensusKeyregHookClient'
import { PluginDexPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/plugin-dex/PluginDexPluginClient'
import { LaunchManagerFactory } from '../smart_contracts/artifacts/plugin-dex/launch/LaunchManagerClient'
import { GatedFeePassPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/gated-fee-pass/GatedFeePassPluginClient'
import { GuildPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/guild/GuildPluginClient'
import { WelcomePluginFactory } from '../smart_contracts/artifacts/arc58/plugins/welcome/WelcomePluginClient'
import { SocialClaimFactory } from '../smart_contracts/artifacts/arc58/social-claim/SocialClaimClient'
import { MetaPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/meta/MetaPluginClient'

const VERSION = 'localnet'
const ENV_FILE = path.resolve(__dirname, '../.env.localnet')
const RN_ENV_FILE = path.resolve(__dirname, '../../../../akita-rn/.env.localnet')

/** PluginDex hook perms (HookPerm*) and LP modes, as the Vault approves them */
const PERM = { Custody: 1n, DynamicFee: 2n, HookFee: 4n, HookFeeOut: 8n } as const
const LP_MODE_CURVE = 1n
/** BinEngine price table of the default 25 bps step: 2,500 + 400 · (9 + 1,152) */
const BIN_STEP = 25n
const BIN_TABLE_MBR = 466_900n

const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

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

  // PLUGIN DEX --------------------------------------------------------------------------------------
  if (id('PLUGIN_DEX_APP_ID') === 0n) {
    console.log('\n💱 PluginDex v2')
    const vaultFactory = new PluginDexFactory({ algorand, ...factoryParams })
    const compiled = await vaultFactory.appFactory.compile()
    const { appClient: dex } = await vaultFactory.send.create.create({
      args: { version: VERSION, admin: sender },
      extraProgramPages: 7,
      ...largeProgramCreateParams(compiled.approvalProgram, compiled.clearStateProgram),
    })
    // approval boxes for every hook and curve
    await fund(dex.appAddress.toString(), 2_000_000n)
    record('PLUGIN_DEX_APP_ID', dex.appId)

    const { appClient: engine } = await new BinEngineFactory({ algorand, ...factoryParams }).send.create.create({
      args: { vault: dex.appId },
      extraProgramPages: 3,
    })
    await fund(engine.appAddress.toString(), 200_000n)
    await dex.send.setCurveApproval({ args: { curve: engine.appId, lpMode: LP_MODE_CURVE, approved: true }, ...send })
    await engine.send.initBinStep({
      args: {
        mbr: algorand.createTransaction.payment({ sender, signer, receiver: engine.appAddress, amount: microAlgo(BIN_TABLE_MBR) }),
        binStep: BIN_STEP,
      },
      ...send,
    })
    record('BIN_ENGINE_APP_ID', engine.appId)

    const hook = async (key: string, perms: bigint, create: () => Promise<{ appClient: { appId: bigint; appAddress: algosdk.Address } }>) => {
      const { appClient } = await create()
      // account minimum balance only: per-pool boxes are paid by each install's F6 funding
      await fund(appClient.appAddress.toString(), 100_000n)
      await dex.send.setHookApproval({ args: { hook: appClient.appId, perms }, ...send })
      record(key, appClient.appId)
      return appClient.appId
    }
    const f = { algorand, ...factoryParams }
    await hook('IMPACT_FEE_HOOK_APP_ID', PERM.DynamicFee, () =>
      new ImpactFeeHookFactory(f).send.create.create({ args: { dex: dex.appId, minFeeBps: 30n, maxFeeBps: 300n, slopeBps: 100n } }))
    await hook('SWAP_TAX_HOOK_APP_ID', PERM.HookFee, () =>
      new SwapTaxHookFactory(f).send.create.create({ args: { dex: dex.appId, owner: sender, taxBps: 100n } }))
    await hook('VOLATILITY_FEE_HOOK_APP_ID', PERM.DynamicFee, () =>
      new VolatilityFeeHookFactory(f).send.create.create({
        args: { dex: dex.appId, filter: 30n, decay: 600n, reduction: 5_000n, control: 40_000n, maxVol: 1_000n, maxFee: 500n },
      }))
    const gatedHook = await hook('GATED_FEE_HOOK_APP_ID', PERM.DynamicFee, () =>
      new GatedFeeHookFactory(f).send.create.create({ args: { dex: dex.appId, akitaDao: daoAppId, passTtl: 0n } }))
    const antiSnipe = await hook('ANTI_SNIPE_FEE_HOOK_APP_ID', PERM.DynamicFee, () =>
      new AntiSnipeFeeHookFactory(f).send.create.create({ args: { dex: dex.appId } }))
    const launchTax = await hook('LAUNCH_TAX_HOOK_APP_ID', PERM.HookFee | PERM.HookFeeOut, () =>
      new LaunchTaxHookFactory(f).send.create.create({ args: { dex: dex.appId } }))
    await hook('CONSENSUS_KEYREG_HOOK_APP_ID', PERM.Custody, () =>
      new ConsensusKeyregHookFactory(f).send.create.create({ args: { dex: dex.appId, admin: sender } }))

    const { appClient: launch } = await new LaunchManagerFactory(f).send.create.create({
      args: { vault: dex.appId, admin: sender, antiSnipeHook: antiSnipe, launchTaxHook: launchTax },
    })
    await fund(launch.appAddress.toString(), 200_000n)
    await launch.send.setFees({ args: { launchFee: 0n, bounty: 0n, treasury: sender }, ...send })
    record('LAUNCH_MANAGER_APP_ID', launch.appId)

    const { appClient: pass } = await new GatedFeePassPluginFactory(f).send.create.create({
      args: { version: VERSION, hook: gatedHook },
    })
    record('GATED_FEE_PASS_PLUGIN_APP_ID', pass.appId)
  }

  if (id('PLUGIN_DEX_PLUGIN_APP_ID') === 0n) {
    const { appClient: dexPlugin } = await new PluginDexPluginFactory({ algorand, ...factoryParams }).send.create.create({
      args: { version: VERSION, dex: id('PLUGIN_DEX_APP_ID') },
    })
    record('PLUGIN_DEX_PLUGIN_APP_ID', dexPlugin.appId)
  }

  // DEMO POOLS -------------------------------------------------------------------------------------
  // An AKTA/ALGO constant-product pool with the impact fee hook and a USDC/ALGO bins pool, so the swap and
  // liquidity screens have something to show on a fresh LocalNet.
  if (!env.LOCALNET_DEMO_POOL_IDS && id('AKTA_ASSET_ID') > 0n && id('USDC_ASSET_ID') > 0n) {
    console.log('\n🌊 Demo pools')
    const dexSdk = new PluginDexSDK({ algorand, factoryParams: { appId: id('PLUGIN_DEX_APP_ID'), ...factoryParams } })
    const akta = id('AKTA_ASSET_ID')
    const usdc = id('USDC_ASSET_ID')
    const cp = await dexSdk.createPool({
      assetA: 0n,
      assetB: akta,
      config: defaultPoolConfig(30n),
      hooks: [catalogueInstall('impactFee', id('IMPACT_FEE_HOOK_APP_ID'))],
    })
    await dexSdk.addLiquidity({ poolId: cp.poolId, amountA: 1_000_000_000n, amountB: 100_000_000_000n })

    const activeId = BINS_ID_CENTER
    const bins = await dexSdk.createPool({
      assetA: 0n,
      assetB: usdc,
      config: defaultPoolConfig(25n, {
        curve: id('BIN_ENGINE_APP_ID'),
        curveMbr: BINS_CREATE_CURVE_MBR,
        curveArgs: encodeBinInitArgs(defaultBinPoolParams(activeId)),
      }),
    })
    const dist = spotDistribution(5n)
    await dexSdk.addLiquidityCurve({
      poolId: bins.poolId,
      amountA: 500_000_000n,
      amountB: 500_000_000n,
      curveArgs: encodeBinAddArgs(activeId, 2n, dist),
      mbr: binAddMbr(activeId, dist, true),
    })
    record('LOCALNET_DEMO_POOL_IDS', `${cp.poolId},${bins.poolId}`)
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
