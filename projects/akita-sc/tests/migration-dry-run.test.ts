import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { describe, expect, test, vi } from 'vitest'
import { setupContext, verifyUpdatePlugin } from '../scripts/script-base'
import { type CatalogEntry, dependencyDeployOrder, deployImmutable, immutableCatalog, immutableContracts, prepareImmutable,
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

  // The dependency tooling stays although no catalog contract depends on another at present.
  test('validates a deploy order against the dependencies of the entries it is given', () => {
    const entry = (extra: Partial<CatalogEntry> = {}): CatalogEntry => ({ artifact: 'x', registryKey: null, plugin: false, daoField: null, ...extra })
    const entries = { Base: entry(), Child: entry({ dependencies: { base: 'Base' } }), Late: entry({ after: ['Child'] }) }
    expect(() => validateDeployOrder(['Base', 'Child', 'Late'], entries)).not.toThrow()
    expect(() => validateDeployOrder(['Child', 'Base', 'Late'], entries)).toThrow('Child must be deployed after Base')
    expect(() => validateDeployOrder(['Base', 'Late', 'Child'], entries)).toThrow('Late must be deployed after Child')
    expect(() => validateDeployOrder(['Base', 'Child'], entries)).toThrow('Late has dependencies but no deploy order')
    expect(() => validateDeployOrder(['Base', 'Other'], entries)).toThrow('Deploy order names unknown contract Other')
    expect(() => validateDeployOrder(['Ghost'], { Ghost: entry({ dependencies: { base: 'Missing' } }) })).toThrow('Ghost depends on unknown contract Missing')
    expect(dependencyDeployOrder).toEqual([])
    expect(Object.values(immutableCatalog).some(e => e.dependencies || e.after)).toBe(false)
    expect(() => validateDeployOrder()).not.toThrow()
  })

  // The Plugin DEX is parked on its own branch: this tree must not be able to deploy any part of it.
  test('the catalog offers no Plugin DEX contract', async () => {
    const parked = /Dex|BinEngine|LaunchManager|GatedFee|Hook$/
    expect(immutableContracts.filter(name => parked.test(name))).toEqual([])
    expect(Object.values(immutableCatalog).filter(e => e.artifact.includes('plugin-dex') || e.artifact.includes('gated-fee'))).toEqual([])
    const ctx = await setupContext({ network: 'localnet', version: 'release', daoAppId: 1n, dryRun: true })
    expect(() => prepareImmutable(ctx, 'PluginDex')).toThrow('Unknown immutable contract PluginDex')
  })

  test('deploy-immutable --help lists the contracts and the dependency flag', () => {
    const output = execFileSync(process.execPath, ['-r', 'ts-node/register/transpile-only', 'scripts/deploy-immutable.ts', '--help'],
      { cwd: path.resolve(__dirname, '..'), encoding: 'utf8', timeout: 20_000 })
    expect(output).toContain('--allow-dependency-mismatch')
    for (const name of immutableContracts) expect(output).toContain(name)
    expect(output).not.toMatch(/PluginDex|BinEngine|LaunchManager/)
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
