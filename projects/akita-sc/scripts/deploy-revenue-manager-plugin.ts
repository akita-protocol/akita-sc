#!/usr/bin/env node

/**
 * Deploy a RevenueManagerPlugin and replace every installation on the DAO
 * wallet that references the previous app ID.
 *
 * Usage:
 *   npm run deploy:revenue-manager-plugin -- -n mainnet -m "$MNEMONIC" -v "0.0.4"
 *   npm run deploy:revenue-manager-plugin -- -n mainnet -m "$MNEMONIC" \
 *     --old-plugin-id 123 --new-plugin-id 456
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { PluginInfo, PluginKey } from '../smart_contracts/artifacts/arc58/account/AbstractedAccountClient'
import type { ProposalSettings } from '../smart_contracts/artifacts/arc58/dao/AkitaDAOClient'
import { RevenueManagerPluginFactory } from '../smart_contracts/artifacts/arc58/plugins/revenue-manager/RevenueManagerPluginClient'
import type {
  ReceiveEscrow,
  SplitRef,
} from '../smart_contracts/artifacts/arc58/plugins/revenue-manager/RevenueManagerPluginClient'
import {
  parseBaseArgs,
  pluginDeploymentInstructions,
  recordPluginDeployment,
  runScript,
  setupContext,
} from './script-base'
import { getAppFundingNeeded, proposeAndExecute } from './utils'

const SOURCE_LINK = 'https://github.com/kylebee/akita-sc'
const EXECUTION_GROUP_BUFFER = 2n

type ExtraArgs = {
  oldPluginId?: bigint
  newPluginId?: bigint
  abandonedPluginIds: bigint[]
  managedAssetOverrides: Map<string, bigint[]>
  sourceLink: string
  allowStateReset: boolean
}

type Installation = {
  key: PluginKey
  info: PluginInfo
  escrow: string
  defaultToEscrow: boolean
}

type RevenueMigration = {
  wallet: bigint
  escrow: string
  receiveEscrow: ReceiveEscrow
  assets: bigint[]
  assetHoldings: bigint[]
  assetSource: 'existing-managed-map' | 'unambiguous-holdings' | 'explicit-override' | 'none'
  sourceOptinCount: bigint
  splits: [[bigint, string], number, bigint][]
  splitRef: SplitRef
  useSplitRef: boolean
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  const extra: ExtraArgs = {
    abandonedPluginIds: [],
    managedAssetOverrides: new Map(),
    sourceLink: SOURCE_LINK,
    allowStateReset: false,
  }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--old-plugin-id') {
      extra.oldPluginId = BigInt(args[++i])
    } else if (args[i] === '--new-plugin-id') {
      extra.newPluginId = BigInt(args[++i])
    } else if (args[i] === '--abandoned-plugin-id') {
      extra.abandonedPluginIds.push(BigInt(args[++i]))
    } else if (args[i] === '--managed-asset') {
      const value = args[++i]
      const separator = value?.lastIndexOf(':') ?? -1
      if (separator < 1 || separator === value.length - 1) {
        throw new Error('--managed-asset must use <escrow>:<assetId>')
      }
      const escrow = value.slice(0, separator)
      const asset = BigInt(value.slice(separator + 1))
      extra.managedAssetOverrides.set(escrow, [...(extra.managedAssetOverrides.get(escrow) ?? []), asset])
    } else if (args[i] === '--source-link') {
      extra.sourceLink = args[++i]
    } else if (args[i] === '--allow-state-reset') {
      extra.allowStateReset = true
    }
  }

  return extra
}

function pluginKeyId(key: PluginKey): string {
  return `${key.plugin}:${key.caller}:${key.escrow}`
}

function grantId(plugin: bigint, caller: string, escrow: string): string {
  return `${plugin}:${caller}:${escrow}`
}

function revenueEscrowId(wallet: bigint, escrow: string): string {
  return `${wallet}:${escrow}`
}

function managedAssetId(wallet: bigint, escrow: string, asset: bigint): string {
  return `${wallet}:${escrow}:${asset}`
}

function sortAssetIds(assets: bigint[]): bigint[] {
  return [...assets].sort((left, right) => (left < right ? -1 : left > right ? 1 : 0))
}

function managedAssetBoxMbr(escrow: string): bigint {
  // BoxMap prefix (1) + ABI (uint64,string,uint64) key (20 + UTF-8 bytes), empty value.
  const boxNameBytes = 21n + BigInt(Buffer.byteLength(escrow, 'utf8'))
  return 2_500n + 400n * boxNameBytes
}

function stateJson(value: unknown): string {
  return JSON.stringify(value, (_key, item) => {
    if (typeof item === 'bigint') return `${item}n`
    if (item instanceof Uint8Array) return Buffer.from(item).toString('hex')
    return item
  })
}

function revenueMapJson<T>(map: Map<{ wallet: bigint; escrow: string }, T>): string {
  const entries = Array.from(map, ([key, value]) => [revenueEscrowId(key.wallet, key.escrow), value] as const)
  entries.sort(([left], [right]) => left.localeCompare(right))
  return stateJson(entries)
}

function managedAssetMapJson(map: Map<{ wallet: bigint; escrow: string; asset: bigint }, unknown>): string {
  const entries = Array.from(map.keys(), (key) => managedAssetId(key.wallet, key.escrow, key.asset)).sort()
  return stateJson(entries)
}

function expectedManagedAssetJson(migrations: RevenueMigration[]): string {
  const entries = migrations
    .flatMap((migration) => migration.assets.map((asset) => managedAssetId(migration.wallet, migration.escrow, asset)))
    .sort()
  return stateJson(entries)
}

function expectedRevenueEscrowJson(migrations: RevenueMigration[]): string {
  const entries = migrations.map(
    (migration) => [revenueEscrowId(migration.wallet, migration.escrow), migration.receiveEscrow] as const,
  )
  entries.sort(([left], [right]) => left.localeCompare(right))
  return stateJson(entries)
}

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function installationLabel(installation: Installation): string {
  const scope = installation.escrow === '' ? 'root' : installation.escrow
  const caller = installation.key.caller === ALGORAND_ZERO_ADDRESS_STRING ? 'global' : installation.key.caller
  return `${scope} (${caller})`
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs(
    'deploy-revenue-manager-plugin.ts',
    `
  --old-plugin-id <appId>       Plugin app ID to replace; defaults to the DAO PAL value
  --new-plugin-id <appId>       Resume using an already-deployed replacement
  --abandoned-plugin-id <id>    Also replace grants left on an abandoned partial replacement; repeatable
  --managed-asset <name>:<id>   Explicitly correct/register a managed ASA during migration; repeatable
  --source-link <url>           Source URL stored with new grants
  --allow-state-reset           Permit abandoning old revenue-manager box state

Resume example:
  npm run deploy:revenue-manager-plugin -- -n mainnet -m "$MNEMONIC" \\
    --old-plugin-id 123 --new-plugin-id 456`,
  )
  console.log(`\nStarting RevenueManagerPlugin replacement on ${options.network}...\n`)

  const ctx = await setupContext(options, { minBalance: 50_000_000n })
  const wallet = await ctx.dao.getWallet()
  const currentPal = await ctx.dao.client.state.global.pluginAppList()

  if (
    extra.newPluginId !== undefined &&
    extra.oldPluginId === undefined &&
    currentPal?.revenueManager === extra.newPluginId
  ) {
    throw new Error('--old-plugin-id is required when resuming after the DAO PAL already points to --new-plugin-id')
  }

  const oldPluginId = extra.oldPluginId ?? currentPal?.revenueManager ?? ctx.appIds.revenueManagerPlugin
  if (oldPluginId === 0n) {
    throw new Error('Could not resolve the existing revenue-manager plugin app ID')
  }
  if (extra.newPluginId === oldPluginId) {
    throw new Error('--new-plugin-id must differ from --old-plugin-id')
  }
  if (
    currentPal !== undefined &&
    currentPal.revenueManager !== oldPluginId &&
    currentPal.revenueManager !== extra.newPluginId
  ) {
    throw new Error(
      `DAO PAL points to unexpected RevenueManagerPlugin ${currentPal.revenueManager}; ` +
        'pass matching --old-plugin-id/--new-plugin-id values before continuing',
    )
  }

  if (oldPluginId < 1n || (extra.newPluginId !== undefined && extra.newPluginId < 1n)) {
    throw new Error('Plugin app IDs must be positive integers')
  }
  if (extra.abandonedPluginIds.some((appId) => appId < 1n)) {
    throw new Error('Abandoned plugin app IDs must be positive integers')
  }
  if (extra.managedAssetOverrides.size > 0 && extra.allowStateReset) {
    throw new Error('--managed-asset cannot be combined with --allow-state-reset')
  }
  for (const [escrow, assets] of extra.managedAssetOverrides) {
    if (assets.some((asset) => asset < 1n)) {
      throw new Error(`Managed-asset overrides for ${escrow} must contain positive ASA IDs`)
    }
    if (new Set(assets.map(String)).size !== assets.length) {
      throw new Error(`Managed-asset overrides for ${escrow} contain duplicate ASA IDs`)
    }
  }

  const sourcePluginIds = new Set([oldPluginId, ...extra.abandonedPluginIds])
  if (sourcePluginIds.size !== 1 + extra.abandonedPluginIds.length) {
    throw new Error('Old and abandoned plugin app IDs must be unique')
  }
  if (extra.newPluginId !== undefined && sourcePluginIds.has(extra.newPluginId)) {
    throw new Error('--new-plugin-id must differ from every source plugin app ID')
  }

  const oldPlugin = new RevenueManagerPluginSDK({
    algorand: ctx.algorand,
    factoryParams: {
      appId: oldPluginId,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    },
  })
  const [revenueEscrows, receiveAssets, oldManagedAssets, splits, splitRefs, pluginMap, namedPluginMap, escrowMap] =
    await Promise.all([
      oldPlugin.client.state.box.escrows.getMap(),
      oldPlugin.client.state.box.receiveAssets.getMap(),
      oldPlugin.client.state.box.managedAssets.getMap(),
      oldPlugin.client.state.box.splits.getMap(),
      oldPlugin.client.state.box.splitRefs.getMap(),
      wallet.client.state.box.plugins.getMap(),
      wallet.client.state.box.namedPlugins.getMap(),
      wallet.client.state.box.escrows.getMap(),
    ])
  const revenueStateBoxCount =
    revenueEscrows.size + receiveAssets.size + oldManagedAssets.size + splits.size + splitRefs.size
  console.log(
    `Revenue-manager state boxes: escrows=${revenueEscrows.size}, receiveAssets=${receiveAssets.size}, ` +
      `managedAssets=${oldManagedAssets.size}, splits=${splits.size}, splitRefs=${splitRefs.size}`,
  )
  const splitsByEscrow = new Map(Array.from(splits, ([key, value]) => [revenueEscrowId(key.wallet, key.escrow), value]))
  const splitRefsByEscrow = new Map(
    Array.from(splitRefs, ([key, value]) => [revenueEscrowId(key.wallet, key.escrow), value]),
  )
  const managedAssetsByEscrow = new Map<string, bigint[]>()
  for (const key of oldManagedAssets.keys()) {
    const id = revenueEscrowId(key.wallet, key.escrow)
    managedAssetsByEscrow.set(id, [...(managedAssetsByEscrow.get(id) ?? []), key.asset])
  }
  const migrations: RevenueMigration[] = []
  const usedManagedAssetOverrides = new Set<string>()
  if (!extra.allowStateReset) {
    const status = await ctx.algorand.client.algod.status()
    const latestBlock = await ctx.algorand.client.algod.block(status.lastRound)
    const latestTimestamp = BigInt(latestBlock.block.header.timestamp)

    if (receiveAssets.size > 0) {
      throw new Error(
        `RevenueManagerPlugin ${oldPluginId} has ${receiveAssets.size} receiveAssets box(es); ` +
          'finish or unwind the active disbursement before migration',
      )
    }
    if (splits.size + splitRefs.size !== revenueEscrows.size) {
      throw new Error('Revenue-manager split configuration count does not match its escrow count')
    }

    const revenueEscrowIds = new Set(
      Array.from(revenueEscrows.keys(), (key) => revenueEscrowId(key.wallet, key.escrow)),
    )
    for (const key of oldManagedAssets.keys()) {
      const id = revenueEscrowId(key.wallet, key.escrow)
      if (!revenueEscrowIds.has(id)) {
        throw new Error(`Managed asset ${managedAssetId(key.wallet, key.escrow, key.asset)} has no receive escrow`)
      }
    }

    for (const [key, receiveEscrow] of revenueEscrows) {
      const id = revenueEscrowId(key.wallet, key.escrow)
      const directSplits = splitsByEscrow.get(id)
      const splitRef = splitRefsByEscrow.get(id)

      if (key.wallet !== wallet.appId) {
        throw new Error(`Revenue escrow ${id} belongs to wallet ${key.wallet}, not DAO wallet ${wallet.appId}`)
      }
      if (receiveEscrow.phase !== 0 || receiveEscrow.allocationCounter !== 0n) {
        throw new Error(`Revenue escrow ${id} is not idle and cannot be migrated without receiveAssets state`)
      }
      if (Buffer.byteLength(key.escrow, 'utf8') > 43) {
        throw new Error(`Revenue escrow ${id} exceeds the 43-byte managed-asset escrow-name limit`)
      }
      if (
        receiveEscrow.creationDate === 0n ||
        receiveEscrow.creationDate > latestTimestamp ||
        receiveEscrow.lastDisbursement > latestTimestamp
      ) {
        throw new Error(`Revenue escrow ${id} has migration metadata outside the valid on-chain time range`)
      }
      if ((directSplits === undefined) === (splitRef === undefined)) {
        throw new Error(`Revenue escrow ${id} must have exactly one splits or splitRef configuration`)
      }

      const escrowInfo = escrowMap.get(key.escrow)
      if (escrowInfo === undefined || escrowInfo.address === ALGORAND_ZERO_ADDRESS_STRING) {
        throw new Error(`Revenue escrow ${id} does not resolve to a named wallet escrow address`)
      }
      const escrowAccount = await ctx.algorand.account.getInformation(escrowInfo.address)
      const assetHoldings = sortAssetIds((escrowAccount.assets ?? []).map((holding) => BigInt(holding.assetId)))
      if (new Set(assetHoldings.map(String)).size !== assetHoldings.length) {
        throw new Error(`Revenue escrow ${id} returned duplicate ASA holdings`)
      }

      const existingManagedAssets = sortAssetIds(managedAssetsByEscrow.get(id) ?? [])
      const explicitAssets = extra.managedAssetOverrides.get(key.escrow)
      let assets: bigint[]
      let assetSource: RevenueMigration['assetSource']
      if (explicitAssets !== undefined) {
        usedManagedAssetOverrides.add(key.escrow)
        assets = sortAssetIds(explicitAssets)
        const holdingIds = new Set(assetHoldings.map(String))
        const missingHolding = assets.find((asset) => !holdingIds.has(String(asset)))
        if (missingHolding !== undefined) {
          throw new Error(
            `Managed-asset override for ${id} includes ASA ${missingHolding}, but the escrow is not opted into it`,
          )
        }
        assetSource = 'explicit-override'
      } else if (existingManagedAssets.length > 0) {
        if (BigInt(existingManagedAssets.length) !== receiveEscrow.optinCount) {
          throw new Error(
            `Revenue escrow ${id} tracks optinCount=${receiveEscrow.optinCount} but has ` +
              `${existingManagedAssets.length} managed-asset box(es)`,
          )
        }
        if (existingManagedAssets.some((asset) => asset === 0n)) {
          throw new Error(`Revenue escrow ${id} has an invalid zero managed-asset ID`)
        }
        if (new Set(existingManagedAssets.map(String)).size !== existingManagedAssets.length) {
          throw new Error(`Revenue escrow ${id} has duplicate managed-asset IDs`)
        }
        const holdingIds = new Set(assetHoldings.map(String))
        const missingHolding = existingManagedAssets.find((asset) => !holdingIds.has(String(asset)))
        if (missingHolding !== undefined) {
          throw new Error(`Revenue escrow ${id} is not currently opted into managed asset ${missingHolding}`)
        }
        assets = existingManagedAssets
        assetSource = 'existing-managed-map'
      } else if (receiveEscrow.optinCount === 0n) {
        assets = []
        assetSource = 'none'
      } else if (BigInt(assetHoldings.length) === receiveEscrow.optinCount) {
        assets = assetHoldings
        assetSource = 'unambiguous-holdings'
      } else if (BigInt(assetHoldings.length) < receiveEscrow.optinCount) {
        throw new Error(
          `Revenue escrow ${id} tracks ${receiveEscrow.optinCount} managed ASA(s), but only ` +
            `${assetHoldings.length} holding(s) exist`,
        )
      } else {
        throw new Error(
          `Revenue escrow ${id} tracks ${receiveEscrow.optinCount} managed ASA(s), but has ` +
            `${assetHoldings.length} holdings and no managed-asset identity map; refusing to guess`,
        )
      }

      const targetReceiveEscrow = {
        ...receiveEscrow,
        optinCount: BigInt(assets.length),
      }

      migrations.push({
        wallet: key.wallet,
        escrow: key.escrow,
        receiveEscrow: targetReceiveEscrow,
        assets,
        assetHoldings,
        assetSource,
        sourceOptinCount: receiveEscrow.optinCount,
        splits: directSplits ?? [],
        splitRef: splitRef ?? { app: 0n, key: new Uint8Array() },
        useSplitRef: splitRef !== undefined,
      })
    }
    const unusedOverrides = Array.from(extra.managedAssetOverrides.keys()).filter(
      (escrow) => !usedManagedAssetOverrides.has(escrow),
    )
    if (unusedOverrides.length > 0) {
      throw new Error(`Managed-asset override(s) do not match a revenue escrow: ${unusedOverrides.join(', ')}`)
    }
    migrations.sort((left, right) => left.escrow.localeCompare(right.escrow))
  }

  const namesByPluginKey = new Map<string, string>()
  for (const [name, key] of namedPluginMap) {
    namesByPluginKey.set(pluginKeyId(key), name)
  }

  const escrowNamesById = new Map<bigint, string>()
  for (const [name, info] of escrowMap) {
    if (info.id !== 0n) escrowNamesById.set(info.id, name)
  }

  const installations: Installation[] = []
  for (const [key, info] of pluginMap) {
    if (!sourcePluginIds.has(key.plugin) || info.start === 0n) continue

    if (info.admin || info.canReclaim) {
      throw new Error(
        `Cannot faithfully replace privileged revenue-manager grant ${pluginKeyId(key)} through DAO governance`,
      )
    }

    const namedPlugin = namesByPluginKey.get(pluginKeyId(key))
    if (namedPlugin !== undefined) {
      throw new Error(
        `Revenue-manager installation ${installationLabel({ key, info, escrow: key.escrow, defaultToEscrow: false })} ` +
          `is named "${namedPlugin}"; named grant replacement requires a dedicated migration`,
      )
    }

    let escrow = key.escrow
    let defaultToEscrow = false
    if (key.escrow === '' && info.escrow !== 0n) {
      const defaultEscrow = escrowNamesById.get(info.escrow)
      if (defaultEscrow === undefined) {
        throw new Error(`Could not resolve default escrow app ${info.escrow} for plugin grant ${pluginKeyId(key)}`)
      }
      escrow = defaultEscrow
      defaultToEscrow = true
    }

    installations.push({ key, info, escrow, defaultToEscrow })
  }

  installations.sort((a, b) => installationLabel(a).localeCompare(installationLabel(b)))

  const proposalSettingsByInstallation = new Map<string, ProposalSettings>()
  for (const installation of installations) {
    if (!installation.info.useExecutionKey) continue
    const proposalSettings = await ctx.dao.client.state.box.plugins.value({
      plugin: installation.key.plugin,
      escrow: installation.escrow,
    })
    if (proposalSettings === undefined) {
      throw new Error(`Missing DAO proposal settings for ${installationLabel(installation)}`)
    }
    proposalSettingsByInstallation.set(pluginKeyId(installation.key), proposalSettings)
  }

  const migrationCaller = ctx.sender.toString()
  if (
    !extra.allowStateReset &&
    migrations.length > 0 &&
    installations.some((installation) => installation.key.caller === migrationCaller && installation.key.escrow === '')
  ) {
    throw new Error(`The migration caller ${migrationCaller} is also a permanent root installation caller`)
  }

  const sourceManagedAssetMbr = Array.from(oldManagedAssets.keys()).reduce(
    (total, key) => total + managedAssetBoxMbr(key.escrow),
    0n,
  )
  const expectedManagedAssetMbr = migrations.reduce(
    (total, migration) => total + BigInt(migration.assets.length) * managedAssetBoxMbr(migration.escrow),
    0n,
  )
  const additionalManagedAssetMbr =
    expectedManagedAssetMbr > sourceManagedAssetMbr ? expectedManagedAssetMbr - sourceManagedAssetMbr : 0n

  console.log(`Old RevenueManagerPlugin: ${oldPluginId}`)
  if (extra.abandonedPluginIds.length > 0) {
    console.log(`Abandoned partial replacement(s): ${extra.abandonedPluginIds.join(', ')}`)
  }
  console.log(`Discovered installations: ${installations.length}`)
  for (const installation of installations) {
    console.log(
      `   - ${installationLabel(installation)}; source=${installation.key.plugin}; ` +
        `methods=${installation.info.methods.length}`,
    )
  }
  console.log()

  if (!extra.allowStateReset) {
    console.log('Managed asset migration plan:')
    for (const migration of migrations) {
      const assets = migration.assets.length > 0 ? migration.assets.join(', ') : 'none'
      const holdings = migration.assetHoldings.length > 0 ? migration.assetHoldings.join(', ') : 'none'
      console.log(
        `   - ${migration.escrow}: optinCount=${migration.sourceOptinCount}` +
          `${migration.sourceOptinCount === migration.receiveEscrow.optinCount ? '' : ` -> ${migration.receiveEscrow.optinCount}`}; ` +
          `assets=[${assets}]; holdings=[${holdings}]; source=${migration.assetSource}`,
      )
      if (migration.receiveEscrow.optinCount === 0n && migration.assetHoldings.length > 0) {
        console.log('     Existing holdings are unrelated and will not be registered as managed assets.')
      }
    }
    console.log(
      `Managed-asset boxes: source=${oldManagedAssets.size}, target=${migrations.reduce(
        (total, migration) => total + migration.assets.length,
        0,
      )}; additional MBR=${additionalManagedAssetMbr} microAlgo\n`,
    )
  }

  if (installations.length === 0 && currentPal?.revenueManager !== oldPluginId) {
    console.log('No old installations remain and the DAO PAL has already moved; verifying the resumed migration.\n')
  }

  const factory = ctx.algorand.client.getTypedAppFactory(RevenueManagerPluginFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  let resumedPlugin: RevenueManagerPluginSDK | undefined
  if (extra.newPluginId !== undefined) {
    const [appInfo, compiled] = await Promise.all([
      ctx.algorand.client.algod.applicationById(extra.newPluginId),
      factory.appFactory.compile(),
    ])
    if (
      !bytesEqual(appInfo.params.approvalProgram, compiled.approvalProgram) ||
      !bytesEqual(appInfo.params.clearStateProgram, compiled.clearStateProgram)
    ) {
      throw new Error(`RevenueManagerPlugin ${extra.newPluginId} bytecode does not match the current artifact`)
    }

    resumedPlugin = new RevenueManagerPluginSDK({
      algorand: ctx.algorand,
      factoryParams: {
        appId: extra.newPluginId,
        defaultSender: ctx.sender,
        defaultSigner: ctx.signer,
      },
    })
    const [configuredDao, configuredVersion] = await Promise.all([
      resumedPlugin.client.state.global.akitaDao(),
      resumedPlugin.client.state.global.version(),
    ])
    if (configuredDao !== ctx.appIds.dao) {
      throw new Error(
        `RevenueManagerPlugin ${extra.newPluginId} targets DAO ${configuredDao ?? 'undefined'}, ` +
          `expected ${ctx.appIds.dao}`,
      )
    }
    if (configuredVersion !== options.version) {
      throw new Error(
        `RevenueManagerPlugin ${extra.newPluginId} has version ${configuredVersion ?? 'undefined'}, ` +
          `expected ${options.version}`,
      )
    }
    console.log(`Verified resumed RevenueManagerPlugin ${extra.newPluginId} bytecode, DAO, and version.\n`)
  }

  if (options.dryRun) {
    console.log(
      extra.newPluginId === undefined
        ? `DRY RUN - Would deploy RevenueManagerPlugin version ${options.version}`
        : `DRY RUN - Would use RevenueManagerPlugin ${extra.newPluginId}`,
    )
    console.log(
      extra.allowStateReset
        ? `DRY RUN - Would abandon ${revenueStateBoxCount} old state box(es)`
        : `DRY RUN - Would migrate ${migrations.length} revenue escrow configuration(s)`,
    )
    console.log(`DRY RUN - Would atomically replace ${installations.length} installation(s)`)
    console.log('DRY RUN - Would update pal.revenueManager after all replacements verify\n')
    return
  }

  let newPluginId = extra.newPluginId
  if (newPluginId === undefined) {
    console.log(`Deploying RevenueManagerPlugin version ${options.version}...`)
    const { appClient } = await factory.send.create.create({
      args: { version: options.version, akitaDao: ctx.appIds.dao },
    })
    newPluginId = appClient.appId
    console.log(`   New plugin deployed: ${newPluginId}`)

    await ctx.algorand.send.payment({
      sender: ctx.sender,
      signer: ctx.signer,
      receiver: appClient.appAddress,
      amount: (1).algos(),
    })
    console.log('   Plugin account funded with 1 ALGO\n')
  } else {
    console.log(`Using existing RevenueManagerPlugin ${newPluginId}\n`)
  }

  const newPlugin =
    resumedPlugin ??
    new RevenueManagerPluginSDK({
      algorand: ctx.algorand,
      factoryParams: {
        appId: newPluginId,
        defaultSender: ctx.sender,
        defaultSigner: ctx.signer,
      },
    })
  const [configuredDao, configuredVersion] = await Promise.all([
    newPlugin.client.state.global.akitaDao(),
    newPlugin.client.state.global.version(),
  ])
  if (configuredDao !== ctx.appIds.dao) {
    throw new Error(
      `RevenueManagerPlugin ${newPluginId} targets DAO ${configuredDao ?? 'undefined'}, expected ${ctx.appIds.dao}`,
    )
  }
  if (configuredVersion !== options.version) {
    throw new Error(
      `RevenueManagerPlugin ${newPluginId} has version ${configuredVersion ?? 'undefined'}, expected ${options.version}`,
    )
  }

  const currentPluginMap = new Set(Array.from(pluginMap.keys(), pluginKeyId))
  const migrationGrant = grantId(newPluginId, migrationCaller, '')
  const pendingMigrationIds = new Set<string>()

  if (!extra.allowStateReset && migrations.length > 0) {
    const [existingEscrows, existingReceiveAssets, existingManagedAssets, existingSplits, existingSplitRefs] =
      await Promise.all([
        newPlugin.client.state.box.escrows.getMap(),
        newPlugin.client.state.box.receiveAssets.getMap(),
        newPlugin.client.state.box.managedAssets.getMap(),
        newPlugin.client.state.box.splits.getMap(),
        newPlugin.client.state.box.splitRefs.getMap(),
      ])

    if (existingReceiveAssets.size > 0) {
      throw new Error(`Replacement plugin ${newPluginId} already has in-progress receiveAssets state`)
    }

    const expectedEscrowIds = new Set(
      migrations.map((migration) => revenueEscrowId(migration.wallet, migration.escrow)),
    )
    const expectedManagedIds = new Set(
      migrations.flatMap((migration) =>
        migration.assets.map((asset) => managedAssetId(migration.wallet, migration.escrow, asset)),
      ),
    )
    for (const stateMap of [existingEscrows, existingSplits, existingSplitRefs]) {
      for (const key of stateMap.keys()) {
        const id = revenueEscrowId(key.wallet, key.escrow)
        if (!expectedEscrowIds.has(id)) {
          throw new Error(`Replacement plugin ${newPluginId} has unexpected revenue state for ${id}`)
        }
      }
    }
    for (const key of existingManagedAssets.keys()) {
      const id = managedAssetId(key.wallet, key.escrow, key.asset)
      if (!expectedManagedIds.has(id)) {
        throw new Error(`Replacement plugin ${newPluginId} has unexpected managed asset ${id}`)
      }
    }

    const existingEscrowsById = new Map(
      Array.from(existingEscrows, ([key, value]) => [revenueEscrowId(key.wallet, key.escrow), value]),
    )
    const existingSplitsById = new Map(
      Array.from(existingSplits, ([key, value]) => [revenueEscrowId(key.wallet, key.escrow), value]),
    )
    const existingSplitRefsById = new Map(
      Array.from(existingSplitRefs, ([key, value]) => [revenueEscrowId(key.wallet, key.escrow), value]),
    )
    const existingManagedByEscrow = new Map<string, bigint[]>()
    for (const key of existingManagedAssets.keys()) {
      const id = revenueEscrowId(key.wallet, key.escrow)
      existingManagedByEscrow.set(id, [...(existingManagedByEscrow.get(id) ?? []), key.asset])
    }

    for (const migration of migrations) {
      const id = revenueEscrowId(migration.wallet, migration.escrow)
      const existingEscrow = existingEscrowsById.get(id)
      const existingSplitsConfig = existingSplitsById.get(id)
      const existingSplitRefConfig = existingSplitRefsById.get(id)
      const existingAssets = sortAssetIds(existingManagedByEscrow.get(id) ?? [])
      const hasAnyState =
        existingEscrow !== undefined ||
        existingSplitsConfig !== undefined ||
        existingSplitRefConfig !== undefined ||
        existingAssets.length > 0

      if (!hasAnyState) {
        pendingMigrationIds.add(id)
        continue
      }

      const expectedConfig = migration.useSplitRef ? migration.splitRef : migration.splits
      const existingConfig = migration.useSplitRef ? existingSplitRefConfig : existingSplitsConfig
      const unexpectedConfig = migration.useSplitRef ? existingSplitsConfig : existingSplitRefConfig
      if (
        existingEscrow === undefined ||
        existingConfig === undefined ||
        unexpectedConfig !== undefined ||
        stateJson(existingEscrow) !== stateJson(migration.receiveEscrow) ||
        stateJson(existingConfig) !== stateJson(expectedConfig) ||
        stateJson(existingAssets) !== stateJson(migration.assets)
      ) {
        throw new Error(`Replacement plugin ${newPluginId} has partial or mismatched migrated state for ${id}`)
      }
    }
  }

  if (!extra.allowStateReset && pendingMigrationIds.size > 0) {
    const oldPluginAccount = await ctx.algorand.account.getInformation(oldPlugin.client.appAddress.toString())
    const stateFunding = await getAppFundingNeeded(
      ctx.algorand,
      newPlugin.client.appAddress.toString(),
      BigInt(oldPluginAccount.minBalance.microAlgos) + additionalManagedAssetMbr,
    )
    if (stateFunding > 0n) {
      await ctx.algorand.send.payment({
        sender: ctx.sender,
        signer: ctx.signer,
        receiver: newPlugin.client.appAddress,
        amount: microAlgo(stateFunding),
      })
      console.log(`Funded replacement plugin with ${stateFunding} microAlgo for migrated boxes\n`)
    }
  }

  let temporaryMbr = 0n
  for (const installation of installations) {
    const mbr = await wallet.getMbr({
      escrow: installation.escrow,
      methodCount: BigInt(installation.info.methods.length),
      plugin: '',
      groups: installation.info.useExecutionKey ? EXECUTION_GROUP_BUFFER : 0n,
    })
    temporaryMbr += mbr.plugins
  }
  if (!extra.allowStateReset && pendingMigrationIds.size > 0 && !currentPluginMap.has(migrationGrant)) {
    const migrationGrantMbr = await wallet.getMbr({ escrow: '', methodCount: 1n, plugin: '', groups: 0n })
    temporaryMbr += migrationGrantMbr.plugins
  }
  const funding = await getAppFundingNeeded(ctx.algorand, wallet.client.appAddress.toString(), temporaryMbr)
  if (funding > 0n) {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(funding) })
    console.log(`Funded DAO wallet with ${funding} microAlgo for replacement MBR\n`)
  }

  if (!extra.allowStateReset && migrations.length > 0) {
    if (pendingMigrationIds.size > 0 && !currentPluginMap.has(migrationGrant)) {
      console.log('Installing temporary revenue-state migration grant...')
      await proposeAndExecute(ctx.algorand, ctx.dao, [
        {
          type: ProposalActionEnum.AddPlugin,
          client: newPlugin,
          callerType: CallerType.Other,
          caller: migrationCaller,
          escrow: '',
          sourceLink: extra.sourceLink,
          useExecutionKey: false,
          methods: [{ name: newPlugin.migrateReceiveEscrow(), cooldown: 0n }],
        },
      ])
      currentPluginMap.add(migrationGrant)
    }

    for (let i = 0; i < migrations.length; i++) {
      const migration = migrations[i]
      const id = revenueEscrowId(migration.wallet, migration.escrow)
      if (!pendingMigrationIds.has(id)) {
        console.log(`   [${i + 1}/${migrations.length}] ${migration.escrow} already migrated`)
        continue
      }

      console.log(`   [${i + 1}/${migrations.length}] Migrating ${migration.escrow}...`)
      await wallet.usePlugin({
        sender: ctx.sender,
        signer: ctx.signer,
        callerType: CallerType.Other,
        calls: [
          newPlugin.migrateReceiveEscrow({
            escrow: migration.escrow,
            receiveEscrow: migration.receiveEscrow,
            assets: migration.assets,
            splits: migration.splits,
            splitRef: migration.splitRef,
            useSplitRef: migration.useSplitRef,
          }),
        ],
      })
    }

    const [migratedEscrows, migratedReceiveAssets, migratedManagedAssets, migratedSplits, migratedSplitRefs] =
      await Promise.all([
        newPlugin.client.state.box.escrows.getMap(),
        newPlugin.client.state.box.receiveAssets.getMap(),
        newPlugin.client.state.box.managedAssets.getMap(),
        newPlugin.client.state.box.splits.getMap(),
        newPlugin.client.state.box.splitRefs.getMap(),
      ])
    if (
      revenueMapJson(migratedEscrows) !== expectedRevenueEscrowJson(migrations) ||
      migratedReceiveAssets.size !== 0 ||
      managedAssetMapJson(migratedManagedAssets) !== expectedManagedAssetJson(migrations) ||
      revenueMapJson(migratedSplits) !== revenueMapJson(splits) ||
      revenueMapJson(migratedSplitRefs) !== revenueMapJson(splitRefs)
    ) {
      throw new Error('Replacement revenue-manager state does not exactly match the source state')
    }

    if (currentPluginMap.has(migrationGrant)) {
      console.log('Removing temporary revenue-state migration grant...')
      await proposeAndExecute(ctx.algorand, ctx.dao, [
        {
          type: ProposalActionEnum.RemovePlugin,
          plugin: newPluginId,
          caller: migrationCaller,
          escrow: '',
        },
      ])
      currentPluginMap.delete(migrationGrant)
    }
    console.log('Revenue-manager state migration verified\n')
  }

  for (let i = 0; i < installations.length; i++) {
    const installation = installations[i]
    const newKey = grantId(newPluginId, installation.key.caller, installation.key.escrow)
    const oldKey = pluginKeyId(installation.key)

    if (currentPluginMap.has(newKey) && !currentPluginMap.has(oldKey)) {
      console.log(`   [${i + 1}/${installations.length}] ${installationLabel(installation)} already replaced`)
      continue
    }

    const proposalSettings = installation.info.useExecutionKey ? proposalSettingsByInstallation.get(oldKey) : undefined
    if (installation.info.useExecutionKey && proposalSettings === undefined) {
      throw new Error(`Missing DAO proposal settings for ${installationLabel(installation)}`)
    }

    const methods = installation.info.methods.map(([selector, cooldown]) => ({
      name: [selector],
      cooldown,
    }))
    const common = {
      type: ProposalActionEnum.AddPlugin as const,
      client: newPlugin,
      escrow: installation.escrow,
      delegationType: BigInt(installation.info.delegationType),
      lastValid: installation.info.lastValid,
      cooldown: installation.info.cooldown,
      methods,
      useRounds: installation.info.useRounds,
      coverFees: installation.info.coverFees,
      defaultToEscrow: installation.defaultToEscrow,
      sourceLink: extra.sourceLink,
    }
    const caller =
      installation.key.caller === ALGORAND_ZERO_ADDRESS_STRING
        ? { callerType: CallerType.Global as typeof CallerType.Global }
        : { callerType: CallerType.Other as typeof CallerType.Other, caller: installation.key.caller }
    const execution = installation.info.useExecutionKey
      ? {
          useExecutionKey: true as const,
          fee: proposalSettings!.fee,
          power: proposalSettings!.power,
          duration: proposalSettings!.duration,
          participation: proposalSettings!.participation,
          approval: proposalSettings!.approval,
        }
      : { useExecutionKey: false as const }

    const addAction = { ...common, ...caller, ...execution } as ProposalAction<SDKClient>
    const removeAction: ProposalAction<SDKClient> = {
      type: ProposalActionEnum.RemovePlugin,
      plugin: installation.key.plugin,
      caller: installation.key.caller,
      escrow: installation.key.escrow,
    }

    console.log(`   [${i + 1}/${installations.length}] Replacing ${installationLabel(installation)}...`)
    await proposeAndExecute(
      ctx.algorand,
      ctx.dao,
      currentPluginMap.has(newKey) ? [removeAction] : [addAction, removeAction],
    )

    const verifiedMap = await wallet.client.state.box.plugins.getMap()
    const verifiedKeys = new Set(Array.from(verifiedMap.keys(), pluginKeyId))
    if (!verifiedKeys.has(newKey) || verifiedKeys.has(oldKey)) {
      throw new Error(`Plugin grant replacement did not verify for ${installationLabel(installation)}`)
    }
    currentPluginMap.add(newKey)
    currentPluginMap.delete(oldKey)
  }

  const migratedPluginMap = await wallet.client.state.box.plugins.getMap()
  const remainingSourceGrants = Array.from(migratedPluginMap.keys()).filter((key) => sourcePluginIds.has(key.plugin))
  if (remainingSourceGrants.length > 0) {
    throw new Error(`${remainingSourceGrants.length} source revenue-manager grant(s) remain after replacement`)
  }

  const latestPal = await ctx.dao.client.state.global.pluginAppList()
  if (latestPal?.revenueManager !== newPluginId) {
    console.log('\nUpdating DAO Plugin App List...')
    const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [
      {
        type: ProposalActionEnum.UpdateFields,
        field: 'pal',
        value: { revenueManager: newPluginId },
      },
    ])
    console.log(`   PAL updated by proposal ${proposalId}`)
  }

  const finalPal = await ctx.dao.client.state.global.pluginAppList()
  if (finalPal?.revenueManager !== newPluginId) {
    throw new Error(`DAO PAL did not update to RevenueManagerPlugin ${newPluginId}`)
  }

  await recordPluginDeployment(options.network, 'revenueManagerPlugin', newPluginId, options.version)

  console.log('\n' + '='.repeat(80))
  console.log('REVENUE MANAGER PLUGIN REPLACEMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Network: ${options.network}
Old Plugin App ID: ${oldPluginId}
New Plugin App ID: ${newPluginId}
Installations replaced: ${installations.length}

${pluginDeploymentInstructions(options.network, 'revenueManagerPlugin', newPluginId, options.version)}
`)
})
