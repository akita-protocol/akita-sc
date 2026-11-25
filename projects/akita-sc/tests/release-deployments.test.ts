import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import algosdk from 'algosdk'
import { MAINNET_APP_IDS, TESTNET_APP_IDS } from 'akita-sdk'
import { recordNetworkAppDeployment, recordPluginDeployment, setupContext, type ScriptContext } from '../scripts/script-base'
import { openReceipt } from '../scripts/lib/deployment-receipt'
import { assertGuildPrerequisites, guildNewAccountSignature } from '../scripts/lib/guild-deployment'
import { immutableCatalog, prepareImmutable, recordSdkKey } from '../scripts/lib/immutable-deployment'
import { loadCompiled, selectorOf } from '../scripts/lib/principal-rollout'

vi.mock('../scripts/script-base', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../scripts/script-base')>()),
  recordNetworkAppDeployment: vi.fn(),
  recordPluginDeployment: vi.fn(),
}))

type LiveApp = { creator: string; approvalProgram: Uint8Array; clearStateProgram: Uint8Array }
const SENDER = 'SENDER'
const approval = new Uint8Array([1, 2, 3])
const clear = new Uint8Array([4])

function fakeContext(chain: { apps?: Map<bigint, LiveApp>; wallet?: bigint; guildFees?: unknown; version?: string } = {}) {
  const apps = chain.apps ?? new Map<bigint, LiveApp>()
  return {
    options: { network: 'localnet', version: chain.version ?? 'v1' },
    sender: SENDER,
    appIds: { dao: 5n },
    algorand: {
      getSuggestedParams: async () => ({ genesisHash: new Uint8Array(32).fill(7) }),
      client: { algod: { getApplicationByID: (id: bigint) => ({ do: async () => {
        if (!apps.has(id)) throw new Error('application does not exist')
        return { params: apps.get(id) }
      } }) } },
    },
    dao: { appId: 5n, client: { state: { global: {
      akitaAppList: async () => ({ wallet: chain.wallet ?? 0n }),
      guildFees: async () => chain.guildFees,
    } } } },
  } as unknown as ScriptContext
}

describe('deployment receipts', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'akita-receipt-test-'))
  let next = 100n
  const created = (apps: Map<bigint, LiveApp>) => vi.fn(async () => {
    const appId = next++
    apps.set(appId, { creator: SENDER, approvalProgram: approval, clearStateProgram: clear })
    return { appId, txId: `tx-${appId}` }
  })

  test('resumes from the receipt without creating an app twice', async () => {
    const apps = new Map<bigint, LiveApp>()
    const file = path.join(dir, 'resume.json')
    const create = created(apps)
    const first = await openReceipt(fakeContext({ apps }), file, { contract: 'X' })
    const appId = await first.createApp('X', { approvalProgram: approval, clearStateProgram: clear }, create)
    const resumed = await openReceipt(fakeContext({ apps }), file, { contract: 'X' })
    expect(await resumed.createApp('X', { approvalProgram: approval, clearStateProgram: clear }, create)).toBe(appId)
    expect(create).toHaveBeenCalledTimes(1)
    expect(JSON.parse(fs.readFileSync(file, 'utf8')).apps.X).toMatchObject({ appId: appId.toString(), txId: `tx-${appId}` })
  })

  test('refuses a creation whose outcome was not recorded', async () => {
    const apps = new Map<bigint, LiveApp>()
    const file = path.join(dir, 'crash.json')
    const crashed = await openReceipt(fakeContext({ apps }), file, { contract: 'X' })
    await expect(crashed.createApp('X', { approvalProgram: approval, clearStateProgram: clear }, async () => { throw new Error('process killed') }))
      .rejects.toThrow('process killed')
    const create = created(apps)
    const resumed = await openReceipt(fakeContext({ apps }), file, { contract: 'X' })
    await expect(resumed.createApp('X', { approvalProgram: approval, clearStateProgram: clear }, create)).rejects.toThrow('outcome is unresolved')
    expect(create).not.toHaveBeenCalled()
  })

  test('refuses a receipt for other inputs and an app that no longer matches it', async () => {
    const apps = new Map<bigint, LiveApp>()
    const file = path.join(dir, 'identity.json')
    const receipt = await openReceipt(fakeContext({ apps }), file, { contract: 'X' })
    const appId = await receipt.createApp('X', { approvalProgram: approval, clearStateProgram: clear }, created(apps))
    await expect(openReceipt(fakeContext({ apps, version: 'v2' }), file, { contract: 'X' })).rejects.toThrow('Manifest does not match')
    await expect(openReceipt(fakeContext({ apps }), file, { contract: 'Y' })).rejects.toThrow('Manifest does not match')
    apps.set(appId, { creator: SENDER, approvalProgram: new Uint8Array([9]), clearStateProgram: clear })
    const resumed = await openReceipt(fakeContext({ apps }), file, { contract: 'X' })
    await expect(resumed.createApp('X', { approvalProgram: approval, clearStateProgram: clear }, created(apps))).rejects.toThrow('does not match its deployment receipt')
  })

  test('requires --manifest outside dry-run', async () => {
    await expect(openReceipt(fakeContext(), undefined, {})).rejects.toThrow('--manifest is required')
  })
})

describe('Guild pre-flight guards', () => {
  const tree = loadCompiled('arc58/account/AbstractedAccountFactory.arc56.json').approval
  const tenArgs = guildNewAccountSignature().replace(/,\(uint64,address,string,bool,uint8.*\)\[\]\)uint64$/, ')uint64')
  const withProgram = (program: Uint8Array, guildFees: unknown) => fakeContext({
    wallet: 42n, guildFees, apps: new Map([[42n, { creator: SENDER, approvalProgram: program, clearStateProgram: clear }]]),
  })

  test('accept the tree wallet factory with guild_fees set', async () => {
    expect(algosdk.ABIMethod.fromSignature(guildNewAccountSignature()).args).toHaveLength(11)
    await expect(assertGuildPrerequisites(withProgram(tree, { createFee: 0n }))).resolves.toEqual({ walletFactory: 42n })
  })

  test('refuse a wallet factory without the 11-argument newAccount (K2)', async () => {
    expect(algosdk.ABIMethod.fromSignature(tenArgs).args).toHaveLength(10)
    const legacy = new Uint8Array(Buffer.concat([Buffer.from('legacy router'), Buffer.from(selectorOf(tenArgs))]))
    await expect(assertGuildPrerequisites(withProgram(legacy, { createFee: 0n }))).rejects.toThrow('K2: wallet factory 42 (aal.wallet) does not route')
    await expect(assertGuildPrerequisites(fakeContext({ wallet: 43n, guildFees: { createFee: 0n } }))).rejects.toThrow('K2')
    await expect(assertGuildPrerequisites(fakeContext({ guildFees: { createFee: 0n } }))).rejects.toThrow('aal.wallet is unset')
  })

  test('refuse a DAO without guild_fees', async () => {
    await expect(assertGuildPrerequisites(withProgram(tree, undefined))).rejects.toThrow('has no guild_fees global')
  })
})

describe('SDK keys for the 2026-10 release', () => {
  beforeEach(() => {
    vi.mocked(recordNetworkAppDeployment).mockClear()
    vi.mocked(recordPluginDeployment).mockClear()
  })

  test('every catalog key, meta and the Guild factories exist in the network maps and the README', () => {
    const readme = fs.readFileSync(path.resolve(__dirname, '../../../README.md'), 'utf8')
    const keys = [...Object.values(immutableCatalog).map(e => e.registryKey).filter((k): k is string => !!k), 'meta', 'guildFactory', 'guildConsensusFactory', 'rewardsV1']
    for (const key of keys) {
      expect(Object.hasOwn(MAINNET_APP_IDS, key) && Object.hasOwn(TESTNET_APP_IDS, key), key).toBe(true)
      expect(readme.split('\n').some(line => line.startsWith(`| \`${key}\` |`) && /lora\.algokit\.io\/|\| — \|/.test(line)), key).toBe(true)
    }
    expect(MAINNET_APP_IDS.rewardsV1).toBe(3569556095n)
    expect(MAINNET_APP_IDS.guildFactory).toBe(0n)
  })

  test('routes each key to its recorder and records only the shared GuildPlugin (guild = 0)', async () => {
    const ctx = await setupContext({ network: 'mainnet', version: 'release', daoAppId: 1n, dryRun: true })
    await recordSdkKey(ctx, 'GuildPlugin', prepareImmutable(ctx, 'GuildPlugin', { factory: '7', guild: '9' }), 10n)
    expect(recordNetworkAppDeployment).not.toHaveBeenCalled()
    await recordSdkKey(ctx, 'GuildPlugin', prepareImmutable(ctx, 'GuildPlugin', { factory: '7', guild: '0' }), 11n)
    expect(recordNetworkAppDeployment).toHaveBeenCalledWith('mainnet', 'guildPlugin', 11n)
    await recordSdkKey(ctx, 'PayPlugin', prepareImmutable(ctx, 'PayPlugin', { registry: '5' }), 12n)
    expect(recordPluginDeployment).toHaveBeenCalledWith('mainnet', 'payPlugin', 12n, 'release')
  })

  test('SocialClaim deploys through the catalog with its attestor key and manager', async () => {
    const ctx = await setupContext({ network: 'mainnet', version: 'release', daoAppId: 1n, dryRun: true })
    const attestor = Array.from({ length: 32 }, (_, i) => i + 1) as unknown as string[]
    const manager = algosdk.encodeAddress(new Uint8Array(32).fill(9))
    const prepared = prepareImmutable(ctx, 'SocialClaim', { welcome: '7', pay: '8', attestor, manager })
    expect(prepared.args).toEqual([7n, 8n, attestor, manager])
    // a short key, a zero app ID and a missing manager are refused before anything is sent
    expect(() => prepareImmutable(ctx, 'SocialClaim', { welcome: '7', pay: '8', attestor: attestor.slice(1), manager })).toThrow()
    expect(() => prepareImmutable(ctx, 'SocialClaim', { welcome: '0', pay: '8', attestor, manager })).toThrow('positive integer app ID')
    expect(() => prepareImmutable(ctx, 'SocialClaim', { welcome: '7', pay: '8', attestor })).toThrow('requires constructor config manager')
    await recordSdkKey(ctx, 'SocialClaim', prepared, 30n)
    expect(recordNetworkAppDeployment).toHaveBeenCalledWith('mainnet', 'socialClaim', 30n)
    expect(recordPluginDeployment).not.toHaveBeenCalled()
  })

  test('keeps the replaced Rewards app as rewardsV1 only while that key is unset', async () => {
    const ctx = await setupContext({ network: 'mainnet', version: 'release', daoAppId: 1n, dryRun: true })
    const rewards = prepareImmutable(ctx, 'Rewards')
    await recordSdkKey(ctx, 'Rewards', rewards, 20n, '3569556095')
    expect(vi.mocked(recordNetworkAppDeployment).mock.calls).toEqual([['mainnet', 'rewards', 20n]])
    vi.mocked(recordNetworkAppDeployment).mockClear()
    await recordSdkKey({ ...ctx, appIds: { ...ctx.appIds, rewardsV1: 0n } }, 'Rewards', rewards, 20n, '3569556095')
    expect(vi.mocked(recordNetworkAppDeployment).mock.calls).toEqual([['mainnet', 'rewardsV1', 3569556095n], ['mainnet', 'rewards', 20n]])
  })
})
