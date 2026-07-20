#!/usr/bin/env node

/**
 * Replace the legacy immutable Staking app with the current upgradeable app.
 *
 * The legacy deployments cannot update in place. This script only permits a
 * clean replacement when every legacy record is disposable soft-staking state
 * and all escrow-bearing state is empty. That invariant is checked again from
 * live algod state immediately before any deployment.
 *
 * Usage:
 *   npm run deploy:staking -- -n testnet -m "$MNEMONIC" -v 0.0.2 \
 *     --discard-soft-stakes --dry-run
 *   npm run deploy:staking -- -n testnet -m "$MNEMONIC" -v 0.0.2 \
 *     --discard-soft-stakes
 *
 * Resume after a replacement app was created:
 *   npm run deploy:staking -- -n testnet -m "$MNEMONIC" -v 0.0.2 \
 *     --old-staking-id 123 --new-staking-id 456 --discard-soft-stakes
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { ProposalActionEnum } from 'akita-sdk/dao'
import algosdk from 'algosdk'
import { StakingFactory } from '../smart_contracts/artifacts/staking/StakingClient'
import {
  parseBaseArgs,
  runScript,
  setupContext,
  type Network,
  type ScriptContext,
} from './script-base'
import { proposeAndExecute } from './utils'

const SOFT_STAKING_TYPE = 20
const STAKE_PREFIX = 's'.charCodeAt(0)
const TOTALS_PREFIX = 't'.charCodeAt(0)
const TARGET_APP_BALANCE = 1_000_000n

type ExtraArgs = {
  oldStakingId?: bigint
  newStakingId?: bigint
  discardSoftStakes: boolean
}

type LegacyAudit = {
  softStakeCount: number
  totalsCount: number
  appBalance: bigint
  appMinBalance: bigint
}

type CompiledStaking = {
  approvalProgram: Uint8Array
  clearStateProgram: Uint8Array
}

function parseExtraArgs(): ExtraArgs {
  const args = process.argv.slice(2)
  const extra: ExtraArgs = { discardSoftStakes: false }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--old-staking-id') {
      extra.oldStakingId = BigInt(args[++i])
    } else if (args[i] === '--new-staking-id') {
      extra.newStakingId = BigInt(args[++i])
    } else if (args[i] === '--discard-soft-stakes') {
      extra.discardSoftStakes = true
    }
  }

  if (extra.oldStakingId !== undefined && extra.oldStakingId < 1n) {
    throw new Error('--old-staking-id must be a positive integer')
  }
  if (extra.newStakingId !== undefined && extra.newStakingId < 1n) {
    throw new Error('--new-staking-id must be a positive integer')
  }
  if (extra.oldStakingId !== undefined && extra.oldStakingId === extra.newStakingId) {
    throw new Error('--old-staking-id and --new-staking-id must differ')
  }

  return extra
}

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function readUint64(bytes: Uint8Array, offset: number): bigint {
  if (offset < 0 || offset + 8 > bytes.length) throw new Error('uint64 read exceeds byte array')
  return Buffer.from(bytes).readBigUInt64BE(offset)
}

async function auditLegacyStaking(
  ctx: ScriptContext,
  appId: bigint,
  discardSoftStakes: boolean,
): Promise<LegacyAudit> {
  const algod = ctx.algorand.client.algod
  const app = await algod.applicationById(appId)
  const creator = app.params.creator.toString()
  if (creator !== ctx.sender) {
    throw new Error(`Legacy Staking ${appId} creator ${creator} does not match deployer ${ctx.sender}`)
  }

  const globalState = new Map(
    (app.params.globalState ?? []).map(({ key, value }) => [Buffer.from(key).toString('utf8'), value]),
  )
  const daoState = globalState.get('akita_dao')
  if (!daoState || daoState.type !== 2 || daoState.uint !== ctx.appIds.dao) {
    throw new Error(
      `Legacy Staking ${appId} has unexpected akita_dao ${daoState?.uint ?? 'missing'}; expected ${ctx.appIds.dao}`,
    )
  }

  const appAccount = await algod.accountInformation(algosdk.getApplicationAddress(appId))
  if ((appAccount.assets ?? []).length !== 0) {
    throw new Error(`Legacy Staking ${appId} has ASA holdings/opt-ins and cannot be clean-reset safely`)
  }

  const listing = await algod.applicationBoxes(appId, { max: 1000 })
  let softStakeCount = 0
  let totalsCount = 0

  for (const descriptor of listing.boxes) {
    const name = descriptor.name
    const box = await algod.applicationBoxByName(appId, name)
    const value = box.value

    if (name[0] === STAKE_PREFIX) {
      if (name.length !== 42 || (value.length !== 24 && value.length !== 32)) {
        throw new Error(
          `Legacy Staking ${appId} has malformed stake box ${Buffer.from(name).toString('base64')}`,
        )
      }
      const type = name[41]
      if (type !== SOFT_STAKING_TYPE) {
        throw new Error(
          `Legacy Staking ${appId} has non-soft stake type ${type}; refusing a state-reset replacement`,
        )
      }
      softStakeCount += 1
      continue
    }

    if (name[0] === TOTALS_PREFIX) {
      if (name.length !== 9 || (value.length !== 16 && value.length !== 24)) {
        throw new Error(
          `Legacy Staking ${appId} has malformed totals box ${Buffer.from(name).toString('base64')}`,
        )
      }
      const locked = readUint64(value, 0)
      const escrowed = readUint64(value, 8)
      const liveLockedStake = value.length === 24 ? readUint64(value, 16) : 0n
      if (locked !== 0n || escrowed !== 0n || liveLockedStake !== 0n) {
        throw new Error(
          `Legacy Staking ${appId} has nonzero escrow totals ` +
            `(locked=${locked}, escrowed=${escrowed}, liveLockedStake=${liveLockedStake})`,
        )
      }
      totalsCount += 1
      continue
    }

    throw new Error(
      `Legacy Staking ${appId} has non-disposable box prefix ${String.fromCharCode(name[0] ?? 0)} ` +
        `(${Buffer.from(name).toString('base64')})`,
    )
  }

  if (softStakeCount > 0 && !discardSoftStakes) {
    throw new Error(
      `Legacy Staking ${appId} has ${softStakeCount} soft-stake record(s); ` +
        'pass --discard-soft-stakes only after explicitly approving their reset',
    )
  }

  return {
    softStakeCount,
    totalsCount,
    appBalance: appAccount.amount,
    appMinBalance: appAccount.minBalance,
  }
}

async function compileStaking(ctx: ScriptContext): Promise<{
  factory: StakingFactory
  compiled: CompiledStaking
}> {
  const factory = ctx.algorand.client.getTypedAppFactory(StakingFactory, {
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const compiled = await factory.appFactory.compile()
  return { factory, compiled }
}

async function getInitializedTotals(ctx: ScriptContext, appId: bigint): Promise<Uint8Array | undefined> {
  const name = Buffer.concat([Buffer.from('t'), Buffer.alloc(8)])
  try {
    return (await ctx.algorand.client.algod.applicationBoxByName(appId, name)).value
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'status' in error && error.status === 404) {
      return undefined
    }
    throw error
  }
}

async function verifyReplacementIdentity(
  ctx: ScriptContext,
  appId: bigint,
  compiled: CompiledStaking,
): Promise<void> {
  const algod = ctx.algorand.client.algod
  const app = await algod.applicationById(appId)
  if (app.params.creator.toString() !== ctx.sender) {
    throw new Error(`Replacement Staking ${appId} was not created by ${ctx.sender}`)
  }
  if (!bytesEqual(app.params.approvalProgram, compiled.approvalProgram)) {
    throw new Error(`Replacement Staking ${appId} approval program does not match the current artifact`)
  }
  if (!bytesEqual(app.params.clearStateProgram, compiled.clearStateProgram)) {
    throw new Error(`Replacement Staking ${appId} clear program does not match the current artifact`)
  }
  if (app.params.extraProgramPages !== 3) {
    throw new Error(`Replacement Staking ${appId} has ${app.params.extraProgramPages ?? 0} extra pages; expected 3`)
  }

  const state = new Map(
    (app.params.globalState ?? []).map(({ key, value }) => [Buffer.from(key).toString('utf8'), value]),
  )
  const version = state.get('version')
  const dao = state.get('akita_dao')
  if (!version || version.type !== 1 || Buffer.from(version.bytes).toString('utf8') !== ctx.options.version) {
    throw new Error(`Replacement Staking ${appId} version does not equal ${ctx.options.version}`)
  }
  if (!dao || dao.type !== 2 || dao.uint !== ctx.appIds.dao) {
    throw new Error(`Replacement Staking ${appId} akita_dao does not equal ${ctx.appIds.dao}`)
  }
}

async function verifyReplacementState(
  ctx: ScriptContext,
  appId: bigint,
  { requireCleanState }: { requireCleanState: boolean },
): Promise<void> {
  const algod = ctx.algorand.client.algod

  const boxes = await algod.applicationBoxes(appId, { max: 1000 })
  if (requireCleanState && boxes.boxes.length !== 1) {
    throw new Error(`Replacement Staking ${appId} has ${boxes.boxes.length} boxes; expected only totals(0)`)
  }
  const totals = await getInitializedTotals(ctx, appId)
  if (!totals || totals.length !== 24) {
    throw new Error(`Replacement Staking ${appId} totals(0) is missing or malformed`)
  }
  if (
    requireCleanState &&
    (readUint64(totals, 0) !== 0n ||
      readUint64(totals, 8) !== 0n ||
      readUint64(totals, 16) !== 0n)
  ) {
    throw new Error(`Replacement Staking ${appId} totals(0) is not clean`)
  }

  const account = await algod.accountInformation(algosdk.getApplicationAddress(appId))
  if (requireCleanState && (account.assets ?? []).length !== 0) {
    throw new Error(`Replacement Staking ${appId} unexpectedly has ASA holdings/opt-ins`)
  }
  if (account.amount < account.minBalance) {
    throw new Error(
      `Replacement Staking ${appId} is underfunded: ${account.amount} < minimum ${account.minBalance}`,
    )
  }
}

async function ensureReplacementInitialized(
  ctx: ScriptContext,
  factory: StakingFactory,
  appId: bigint,
): Promise<void> {
  const client = factory.getAppClientById({ appId })
  const boxes = await ctx.algorand.client.algod.applicationBoxes(appId, { max: 1000 })
  const totals = await getInitializedTotals(ctx, appId)
  if (totals === undefined && boxes.boxes.length !== 0) {
    throw new Error(`Existing replacement ${appId} has boxes but no totals(0); refusing to initialize it`)
  }
  if (totals !== undefined) {
    if (
      boxes.boxes.length !== 1 ||
      totals.length !== 24 ||
      readUint64(totals, 0) !== 0n ||
      readUint64(totals, 8) !== 0n ||
      readUint64(totals, 16) !== 0n
    ) {
      throw new Error(`Existing replacement ${appId} has non-clean state; refusing to overwrite it`)
    }
  }

  let accountAmount = 0n
  try {
    accountAmount = (
      await ctx.algorand.client.algod.accountInformation(algosdk.getApplicationAddress(appId))
    ).amount
  } catch (error) {
    if (!(typeof error === 'object' && error !== null && 'status' in error && error.status === 404)) {
      throw error
    }
    // A newly created application account may not exist until its first payment.
  }

  if (accountAmount < TARGET_APP_BALANCE) {
    await ctx.algorand.send.payment({
      sender: ctx.sender,
      signer: ctx.signer,
      receiver: algosdk.getApplicationAddress(appId),
      amount: microAlgo(TARGET_APP_BALANCE - accountAmount),
    })
    console.log(`   Funded replacement to ${TARGET_APP_BALANCE} microALGO`)
  }

  if (totals === undefined) {
    await client.send.init({ args: {} })
    console.log('   Initialized totals(0)')
  }
}

async function validateStakingCatalogTargets(
  network: Network,
  oldAppId: bigint,
  newAppId?: bigint,
): Promise<void> {
  if (network === 'localnet') return

  const fs = await import('fs/promises')
  const path = await import('path')
  const [networkSource, readmeSource] = await Promise.all([
    fs.readFile(path.join(__dirname, '../../akita-sdk/src/networks.ts'), 'utf8'),
    fs.readFile(path.join(__dirname, '../../../README.md'), 'utf8'),
  ])
  const expectedIds = [oldAppId, ...(newAppId === undefined ? [] : [newAppId])]
  if (!expectedIds.some((appId) => networkSource.includes(`staking: ${appId}n,`))) {
    throw new Error(
      `${network.toUpperCase()}_APP_IDS.staking does not match ` + expectedIds.map((appId) => `${appId}n`).join(' or '),
    )
  }
  const row = readmeSource
    .split('\n')
    .find((line) => line.startsWith('| `staking` |') && line.includes('lora.algokit.io/testnet/application'))
  if (!row || row.split('|').length < 5) {
    throw new Error('README.md staking deployment row is missing or malformed')
  }
}

async function recordStakingDeployment(
  network: Network,
  oldAppId: bigint,
  newAppId: bigint,
): Promise<void> {
  if (network === 'localnet') return

  const fs = await import('fs/promises')
  const path = await import('path')
  const ts = await import('typescript')
  const networksPath = path.join(__dirname, '../../akita-sdk/src/networks.ts')
  const readmePath = path.join(__dirname, '../../../README.md')
  const [networkSource, readmeSource] = await Promise.all([
    fs.readFile(networksPath, 'utf8'),
    fs.readFile(readmePath, 'utf8'),
  ])

  const source = ts.createSourceFile('networks.ts', networkSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const declarationName = `${network.toUpperCase()}_APP_IDS`
  let initializer: import('typescript').Expression | undefined

  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== declarationName) continue
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue
      for (const property of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue
        if (property.name.getText(source).replaceAll(/["']/g, '') === 'staking') {
          initializer = property.initializer
        }
      }
    }
  })

  if (!initializer) throw new Error(`Could not find ${declarationName}.staking in ${networksPath}`)
  const current = initializer.getText(source)
  if (current !== `${oldAppId}n` && current !== `${newAppId}n`) {
    throw new Error(
      `${declarationName}.staking is ${current}; expected either ${oldAppId}n or ${newAppId}n`,
    )
  }
  const nextNetworkSource =
    current === `${newAppId}n`
      ? networkSource
      : networkSource.slice(0, initializer.getStart(source)) + `${newAppId}n` + networkSource.slice(initializer.end)

  const lines = readmeSource.split('\n')
  const rowIndex = lines.findIndex(
    (line) => line.startsWith('| `staking` |') && line.includes('lora.algokit.io/testnet/application'),
  )
  if (rowIndex === -1) throw new Error('Could not find the staking deployment row in README.md')
  const columns = lines[rowIndex].split('|')
  const column = network === 'testnet' ? 2 : 3
  columns[column] = ` [\`${newAppId}\`](https://lora.algokit.io/${network}/application/${newAppId}) `
  lines[rowIndex] = columns.join('|')
  const nextReadmeSource = lines.join('\n')

  await Promise.all([
    nextNetworkSource === networkSource ? Promise.resolve() : fs.writeFile(networksPath, nextNetworkSource, 'utf8'),
    nextReadmeSource === readmeSource ? Promise.resolve() : fs.writeFile(readmePath, nextReadmeSource, 'utf8'),
  ])
  console.log(`   Recorded ${declarationName}.staking=${newAppId} and updated README.md`)
}

runScript(async () => {
  const extra = parseExtraArgs()
  const options = parseBaseArgs(
    'deploy-staking.ts',
    `
  --old-staking-id <appId>   Legacy app to replace; defaults to DAO aal.staking
  --new-staking-id <appId>   Resume with an already-created replacement
  --discard-soft-stakes      Explicitly approve resetting legacy soft-stake boxes`,
  )

  console.log(`\nStarting Staking replacement on ${options.network}...\n`)
  const ctx = await setupContext(options, { minBalance: 10_000_000n })
  const aal = await ctx.dao.client.state.global.akitaAppList()
  if (!aal) throw new Error('DAO akitaAppList is missing')

  if (
    extra.newStakingId !== undefined &&
    extra.oldStakingId === undefined &&
    aal.staking === extra.newStakingId
  ) {
    throw new Error('--old-staking-id is required when resuming after DAO aal.staking already changed')
  }

  const oldStakingId = extra.oldStakingId ?? aal.staking
  if (oldStakingId < 1n) throw new Error('Could not resolve a positive legacy Staking app ID')
  if (aal.staking !== oldStakingId && aal.staking !== extra.newStakingId) {
    throw new Error(
      `DAO aal.staking is ${aal.staking}; expected old ${oldStakingId}` +
        (extra.newStakingId === undefined ? '' : ` or replacement ${extra.newStakingId}`),
    )
  }
  await validateStakingCatalogTargets(options.network, oldStakingId, extra.newStakingId)

  console.log(`Auditing legacy Staking ${oldStakingId}...`)
  const audit = await auditLegacyStaking(ctx, oldStakingId, extra.discardSoftStakes)
  console.log(`   Soft stakes: ${audit.softStakeCount}`)
  console.log(`   Empty totals boxes: ${audit.totalsCount}`)
  console.log(`   ASA holdings/opt-ins: 0`)
  console.log(`   App balance/minimum: ${audit.appBalance}/${audit.appMinBalance} microALGO\n`)

  console.log('Compiling current Staking contract...')
  const { factory, compiled } = await compileStaking(ctx)
  console.log(`   Approval: ${compiled.approvalProgram.length} bytes`)
  console.log(`   Clear: ${compiled.clearStateProgram.length} bytes\n`)

  if (options.dryRun) {
    if (extra.newStakingId !== undefined) {
      await verifyReplacementIdentity(ctx, extra.newStakingId, compiled)
      await verifyReplacementState(ctx, extra.newStakingId, {
        requireCleanState: aal.staking !== extra.newStakingId,
      })
      console.log(`   Existing replacement ${extra.newStakingId} is exact and initialized`)
    }
    console.log('DRY RUN - no transactions or catalog writes performed')
    console.log(`   1. Deploy version ${options.version} with 3 reserved program pages`)
    console.log(`   2. Fund and initialize a clean totals(0) box`)
    console.log(`   3. Verify bytecode, globals, boxes, holdings, and funding`)
    console.log(`   4. Update DAO aal.staking from ${oldStakingId} to the replacement`)
    console.log(`   5. Update SDK and README deployment IDs\n`)
    return
  }

  let newStakingId = extra.newStakingId
  if (newStakingId === undefined) {
    console.log('Deploying replacement Staking...')
    const { appClient } = await factory.send.create.create({
      extraProgramPages: 3,
      args: {
        version: options.version,
        akitaDao: ctx.appIds.dao,
      },
    })
    newStakingId = appClient.appId
    console.log(`   New Staking app: ${newStakingId}`)
  } else {
    console.log(`Resuming replacement Staking ${newStakingId}...`)
  }

  await verifyReplacementIdentity(ctx, newStakingId, compiled)
  const replacementAlreadyLive = aal.staking === newStakingId
  if (replacementAlreadyLive) {
    await verifyReplacementState(ctx, newStakingId, { requireCleanState: false })
    console.log('   Live replacement identity and initialized state verified\n')
  } else {
    await ensureReplacementInitialized(ctx, factory, newStakingId)
    await verifyReplacementState(ctx, newStakingId, { requireCleanState: true })
    console.log('   Replacement bytecode and clean state verified\n')
  }

  const currentAal = await ctx.dao.client.state.global.akitaAppList()
  if (!currentAal) throw new Error('DAO akitaAppList disappeared during deployment')
  let proposalId: bigint | undefined
  if (currentAal.staking === oldStakingId) {
    console.log(`Updating DAO aal.staking to ${newStakingId}...`)
    proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [
      {
        type: ProposalActionEnum.UpdateFields,
        field: 'aal',
        value: { staking: newStakingId },
      },
    ])
    console.log(`   DAO proposal ${proposalId} executed`)
  } else if (currentAal.staking === newStakingId) {
    console.log('   DAO aal.staking already points to the replacement')
  } else {
    throw new Error(`DAO aal.staking changed unexpectedly to ${currentAal.staking}`)
  }

  const verifiedAal = await ctx.dao.client.state.global.akitaAppList()
  if (verifiedAal?.staking !== newStakingId) {
    throw new Error(`DAO aal.staking verification failed; found ${verifiedAal?.staking ?? 'missing'}`)
  }

  await recordStakingDeployment(options.network, oldStakingId, newStakingId)

  console.log('='.repeat(80))
  console.log('STAKING REPLACEMENT COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Network: ${options.network}
Old Staking: ${oldStakingId}
New Staking: ${newStakingId}
Discarded soft-stake records: ${audit.softStakeCount}
Version: ${options.version}
DAO AAL proposal: ${proposalId ?? 'already applied'}
`)
})
