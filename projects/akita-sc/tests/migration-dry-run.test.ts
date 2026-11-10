import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { describe, expect, test, vi } from 'vitest'
import { setupContext, verifyUpdatePlugin } from '../scripts/script-base'
import { deployImmutable, immutableCatalog, immutableContracts, pluginDexDeployOrder, postDeploySteps, prepareImmutable,
  validateDeployOrder } from '../scripts/lib/immutable-deployment'
import { discoverChildren } from '../scripts/lib/child-updates'

describe('migration dry runs', () => {
  test('does not load a signing account or fund LocalNet even with a mnemonic supplied', async () => {
    const ctx = await setupContext({ network: 'localnet', version: 'test', dryRun: true, mnemonic: 'deliberately invalid test input' })
    await expect(ctx.signer([], [])).rejects.toThrow('cannot sign')
    const file = path.join(os.tmpdir(), `akita-dryrun-${Date.now()}.json`)
    await deployImmutable(ctx, 'PayPlugin', {}, file, true)
    expect(fs.existsSync(file)).toBe(false)
  })

  test('all formerly conditional deployers exit before reaching an unavailable node', () => {
    const scripts = ['asa-manager-plugin', 'auction-plugin', 'dual-stake-plugin', 'haystack-router-plugin',
      'hyper-swap', 'marketplace-plugin', 'optin-plugin', 'raffle-plugin', 'self-optin-plugin',
      'social-plugin', 'staking-plugin', 'staking-pool-plugin', 'rewards-plugin', 'subscriptions-plugin']
    for (const file of [...scripts.map(script => `deploy-${script}.ts`), 'opt-in-stickers-escrow-akta.ts']) {
      const output = execFileSync(process.execPath, ['-r', 'ts-node/register/transpile-only', `scripts/${file}`, '--network', 'localnet', '--dry-run', '--registry', '1', '--router', '1', '--referrer-treasury', '1', '--akta-asset-id', '1'], {
        cwd: path.resolve(__dirname, '..'), encoding: 'utf8', timeout: 20_000,
        env: { ...process.env, ALGOD_SERVER: 'http://127.0.0.1', ALGOD_PORT: '1', ALGOD_TOKEN: 'a'.repeat(64), INDEXER_SERVER: 'http://127.0.0.1', INDEXER_PORT: '1', INDEXER_TOKEN: 'a'.repeat(64),
          KMD_SERVER: 'http://127.0.0.1', KMD_PORT: '1', KMD_TOKEN: 'a'.repeat(64),
          DEPLOYER_MNEMONIC: 'deliberately invalid test input', MNEMONIC: '' },
      })
      expect(output).toContain('DRY RUN')
    }
  }, 120_000)

  test('discovers every indexer page and excludes deleted children', async () => {
    const responses = [{ applications: [{ id: 10n }, { id: 11n, deleted: true }], nextToken: 'second' }, { applications: [{ id: 12n }, { id: 10n }] }]
    const request = { creator: vi.fn().mockReturnThis(), limit: vi.fn().mockReturnThis(), nextToken: vi.fn().mockReturnThis(), do: vi.fn().mockImplementation(async () => responses.shift()) }
    const ctx = { algorand: { client: { indexer: { searchForApplications: () => request } } } } as unknown as Awaited<ReturnType<typeof setupContext>>
    expect(await discoverChildren(ctx, 2n)).toEqual([10n, 12n])
    expect(request.nextToken).toHaveBeenCalledWith('second')
  })

  test('rejects constructor overrides that would register a different DAO or version', async () => {
    const ctx = await setupContext({ network: 'localnet', version: 'release', daoAppId: 1n, dryRun: true })
    expect(() => prepareImmutable(ctx, 'Rewards', { version: 'other' })).toThrow('conflicts')
    expect(() => prepareImmutable(ctx, 'Rewards', { akitaDAO: '2' })).toThrow('conflicts')
  })

  // OPEN-DECISIONS #2 (a): v2 replaces v1 under the PluginDex key; the rest of the stack is catalogued with its
  // constructor wiring and a dependency order the tooling validates.
  test('catalogs the PluginDex v2 stack with its dependency order and constructor wiring', async () => {
    const ctx = await setupContext({ network: 'localnet', version: 'release', daoAppId: 1n, dryRun: true })
    expect(pluginDexDeployOrder).toEqual(['PluginDex', 'BinEngine', 'ImpactFeeHook', 'SwapTaxHook', 'VolatilityFeeHook',
      'BackrunArbHook', 'GatedFeeHook', 'AntiSnipeFeeHook', 'LaunchTaxHook', 'ConsensusKeyregHook',
      'PluginDexPlugin', 'LaunchManager', 'GatedFeePassPlugin'])
    for (const name of pluginDexDeployOrder) expect(immutableContracts).toContain(name)
    expect(immutableCatalog.PluginDex.plugin).toBe(false)
    // the swap, pool and liquidity wallet plugin deploys with the stack, pinned to the Vault
    expect(immutableCatalog.PluginDexPlugin.plugin).toBe(true)
    expect(immutableCatalog.PluginDexPlugin.dependencies).toEqual({ dex: 'PluginDex' })
    // the production GatedFeeHook pass plugin ships with the stack, pinned to the hook (plugin-dex review fix)
    expect(immutableCatalog.GatedFeePassPlugin.plugin).toBe(true)
    expect(immutableCatalog.GatedFeePassPlugin.dependencies).toEqual({ hook: 'GatedFeeHook' })
    expect(prepareImmutable(ctx, 'GatedFeePassPlugin', { hook: '9' }).args).toEqual(['release', 9n])
    expect(() => validateDeployOrder(['PluginDex', 'GatedFeePassPlugin', 'GatedFeeHook'])).toThrow('GatedFeePassPlugin must be deployed after GatedFeeHook')
    expect(() => validateDeployOrder()).not.toThrow()
    expect(() => validateDeployOrder(['PluginDexPlugin', 'PluginDex'])).toThrow('PluginDexPlugin must be deployed after PluginDex')
    expect(() => validateDeployOrder(['PluginDex', 'AntiSnipeFeeHook', 'LaunchManager', 'LaunchTaxHook'])).toThrow('after LaunchTaxHook')

    // The Vault takes version + admin from the context; it is above 8 KB, so creation carries write budget.
    const vault = prepareImmutable(ctx, 'PluginDex')
    expect(vault.args).toEqual(['release', ctx.sender])
    expect(vault.approval.length + vault.clear.length).toBeGreaterThan(8_192)
    // Missing dependency IDs name the contract to deploy first.
    expect(() => prepareImmutable(ctx, 'PluginDexPlugin')).toThrow('requires dex: the app ID of PluginDex')
    expect(() => prepareImmutable(ctx, 'BinEngine')).toThrow('requires vault: the app ID of PluginDex')
    expect(() => prepareImmutable(ctx, 'LaunchManager', { vault: '5', antiSnipeHook: '6' })).toThrow('the app ID of LaunchTaxHook')
    const launch = prepareImmutable(ctx, 'LaunchManager', { vault: '5', antiSnipeHook: '6', launchTaxHook: '7' })
    expect(launch.dependencies).toEqual([
      { arg: 'vault', contract: 'PluginDex', appId: 5n },
      { arg: 'antiSnipeHook', contract: 'AntiSnipeFeeHook', appId: 6n },
      { arg: 'launchTaxHook', contract: 'LaunchTaxHook', appId: 7n },
    ])
    // Plain uint64 parameters accept 0; app-ID arguments do not.
    expect(prepareImmutable(ctx, 'ImpactFeeHook', { dex: '5', minFeeBps: '0', maxFeeBps: '100', slopeBps: 0 }).args).toEqual([5n, 0n, 100n, 0n])
    expect(() => prepareImmutable(ctx, 'ImpactFeeHook', { dex: '0', minFeeBps: '0', maxFeeBps: '1', slopeBps: '0' })).toThrow('positive integer app ID')
    expect(() => prepareImmutable(ctx, 'SwapTaxHook', { dex: '5', owner: ctx.sender, taxBps: '-1' })).toThrow('non-negative integer')
    // GatedFeeHook: akitaDAO from the context, passTtl 0 = contract default (1 day).
    expect(prepareImmutable(ctx, 'GatedFeeHook', { dex: '5' }).args).toEqual([5n, 1n, 0n])
    expect(postDeploySteps('LaunchTaxHook', 9n)).toEqual([{ app: 'PluginDex', method: 'setHookApproval', args: { hook: 9n, perms: 12 }, note: 'max perms HookFee | HookFeeOut' }])
  })

  test('deploy-immutable --help documents the PluginDex v2 deploy order', () => {
    const output = execFileSync(process.execPath, ['-r', 'ts-node/register/transpile-only', 'scripts/deploy-immutable.ts', '--help'],
      { cwd: path.resolve(__dirname, '..'), encoding: 'utf8', timeout: 20_000 })
    expect(output).toContain('11. PluginDexPlugin (dex=PluginDex)')
    expect(output).toContain('PluginDex.setHookApproval(hook=id, perms=12)')
    expect(output).toContain('--allow-dependency-mismatch')
  }, 30_000)

  test('rejects a mismatched update plugin before inspecting grants', async () => {
    const grants = vi.fn()
    const ctx = { appIds: { updatePlugin: 2n }, updatePlugin: { appId: 2n },
      dao: { getWallet: vi.fn(), client: { state: { global: { pluginAppList: async () => ({ update: 3n }) } } }, wallet: { getPlugins: grants } },
    } as unknown as Awaited<ReturnType<typeof setupContext>>
    await expect(verifyUpdatePlugin(ctx)).rejects.toThrow('does not match')
    expect(grants).not.toHaveBeenCalled()
  })
})
