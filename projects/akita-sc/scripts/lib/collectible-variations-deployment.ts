import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { MetaSDK, SchemaPart } from 'akita-sdk/meta'
import { CollectibleVariationsFactory } from '../../smart_contracts/artifacts/collectible-variations/CollectibleVariationsClient'
import { type ScriptContext, recordNetworkAppDeployment } from '../script-base'
import { openReceipt, sha256 } from './deployment-receipt'

/** The Meta tree type every `meta` writer set uses: leaves are single addresses. */
export const WRITER_LIST_TYPE = { description: 'Collectible writer list', schema: '(address)' } as const
/** The placeholder that takes Meta type 0 (the "any type" id) on a Meta with no types. */
export const TYPE_ZERO_DESCRIPTION = 'Unspecified'
/** Meta's fixed fee for addType (MetaTypeFee). */
export const ADD_TYPE_FEE = 100_000_000n
/** The registry's own minimum balance; every box it holds is paid for by its owner. */
export const REGISTRY_FUNDING = 100_000n

/** The lowest-numbered Meta type that is the collectible writer list, if one exists. */
export async function findWriterListType(meta: MetaSDK): Promise<bigint | undefined> {
  const types = await meta.getTypes()
  const ids = [...types.entries()]
    .filter(([id, t]) => id !== 0n && t.description === WRITER_LIST_TYPE.description && t.schema === WRITER_LIST_TYPE.schema)
    .map(([id]) => id)
    .sort((a, b) => (a < b ? -1 : 1))
  return ids[0]
}

/**
 * Collectible Variations is an immutable singleton beside Meta. It needs no DAO proposal and no
 * app-list slot: it reads only Meta, whose app id and writer-list tree type are fixed at create.
 *
 * Steps, each resumable from the receipt:
 *  1. The "collectible writer list" Meta type: reused when Meta already has it, else addType (100 ALGO).
 *  2. create(metaApp, metaTreeType), recorded in the receipt before and after.
 *  3. Fund the registry's own minimum balance (0.1 ALGO).
 *  4. --register records `collectibleVariations` in the SDK network map.
 */
export async function deployCollectibleVariations(
  ctx: ScriptContext,
  manifest: string | undefined,
  { register = false, metaApp, reserveTypeZero = false }: { register?: boolean; metaApp?: bigint; reserveTypeZero?: boolean } = {},
) {
  const meta = metaApp ?? ctx.appIds.meta ?? 0n
  if (!meta) throw new Error('Meta is not recorded for this network: deploy Meta first (step H1) or pass --meta-app-id')
  const metaInfo = await ctx.algorand.app.getById(meta).catch(() => undefined)
  if (!metaInfo) throw new Error(`Meta app ${meta} does not exist on ${ctx.options.network}`)
  const metaSdk = new MetaSDK({ factoryParams: { appId: meta, defaultSender: ctx.sender, defaultSigner: ctx.signer }, algorand: ctx.algorand })

  const factory = ctx.algorand.client.getTypedAppFactory(CollectibleVariationsFactory, { defaultSender: ctx.sender, defaultSigner: ctx.signer })
  const { approvalProgram, clearStateProgram } = await factory.appFactory.compile()
  const existingType = await findWriterListType(metaSdk)
  // Meta numbers types from 0, and verify treats type 0 as "any type". On a Meta with no types the
  // first addType would become that wildcard, so a placeholder takes id 0 first (another 100 ALGO
  // type fee, which Meta owes to the DAO).
  const typesId = (await metaSdk.client.state.global.typesId()) ?? 0n
  const needsTypeZero = existingType === undefined && typesId === 0n

  if (ctx.options.dryRun) {
    console.log(`Would deploy CollectibleVariations on ${ctx.options.network} (approval ${approvalProgram.length} bytes, sha256 ${sha256(approvalProgram)}).`)
    console.log(`  Meta: ${meta}`)
    console.log(existingType !== undefined
      ? `  Writer-list type: reuse Meta type ${existingType}`
      : `  Writer-list type: addType("${WRITER_LIST_TYPE.description}", [address]) paying ${ADD_TYPE_FEE / 1_000_000n} ALGO to Meta`)
    if (needsTypeZero) console.log(`  Meta has no types yet: --reserve-type-zero first adds "${TYPE_ZERO_DESCRIPTION}" as type 0 (another ${ADD_TYPE_FEE / 1_000_000n} ALGO)`)
    console.log(`  Then create(metaApp=${meta}, metaTreeType=<type>) and fund the registry ${REGISTRY_FUNDING} microAlgo.`)
    console.log('  No DAO proposal and no app-list slot are needed.')
    return undefined
  }

  // Every type this run may add costs the fixed fee; LocalNet tops the sender up from its dispenser.
  const typeFees = (existingType === undefined ? ADD_TYPE_FEE : 0n) + (needsTypeZero && reserveTypeZero ? ADD_TYPE_FEE : 0n)
  const needed = typeFees + REGISTRY_FUNDING + 2_000_000n
  if (ctx.options.network === 'localnet') {
    await ctx.algorand.account.ensureFundedFromEnvironment(ctx.sender, microAlgo(needed))
  } else {
    const balance = (await ctx.algorand.account.getInformation(ctx.sender)).balance.microAlgo
    if (balance < needed) throw new Error(`${ctx.sender} holds ${balance} microAlgo; this run needs about ${needed}`)
  }

  const receipt = await openReceipt(ctx, manifest, {
    contract: 'CollectibleVariations', approval: sha256(approvalProgram), clear: sha256(clearStateProgram), metaApp: meta.toString(),
  })
  const inputs = receipt.receipt.inputs as Record<string, unknown>

  // 1. The writer-list type. addType has no idempotency key, so the receipt marks it in flight and a
  //    rerun looks the type up by its description and schema instead of paying twice.
  let typeId = inputs.metaTreeType !== undefined ? BigInt(inputs.metaTreeType as string) : existingType
  if (typeId === undefined) {
    if (inputs.addTypeSubmitted) {
      throw new Error(`addType was submitted but Meta ${meta} has no "${WRITER_LIST_TYPE.description}" type yet; check the sender's last transactions before rerunning`)
    }
    if (needsTypeZero && !(await metaSdk.getType({ id: 0n }).catch(() => undefined))) {
      if (!reserveTypeZero) {
        throw new Error(`Meta ${meta} has no types, so the writer list would become type 0, which Meta treats as any type. Rerun with --reserve-type-zero to add a placeholder type 0 first (${ADD_TYPE_FEE / 1_000_000n} ALGO more).`)
      }
      inputs.typeZeroSubmitted = true
      receipt.save()
      await metaSdk.addType({ description: TYPE_ZERO_DESCRIPTION, schemaList: [] })
      console.log(`Added Meta type 0 (${TYPE_ZERO_DESCRIPTION}).`)
    }
    inputs.addTypeSubmitted = true
    receipt.save()
    await metaSdk.addType({ description: WRITER_LIST_TYPE.description, schemaList: [SchemaPart.Address] })
    typeId = await findWriterListType(metaSdk)
    if (typeId === undefined) throw new Error('addType succeeded but the type was not found')
    console.log(`Added Meta type ${typeId} (${WRITER_LIST_TYPE.description}).`)
  }
  const stored = await metaSdk.getType({ id: typeId }).catch(() => undefined)
  if (!stored || stored.description !== WRITER_LIST_TYPE.description || stored.schema !== WRITER_LIST_TYPE.schema) {
    throw new Error(`Meta type ${typeId} is not the collectible writer list`)
  }
  inputs.metaTreeType = typeId.toString()
  receipt.save()

  // 2. Create.
  const appId = await receipt.createApp('CollectibleVariations', { approvalProgram, clearStateProgram }, async (note) => {
    const { appClient, result } = await factory.send.create.create({
      extraProgramPages: 3, note, args: { metaApp: meta, metaTreeType: typeId! },
    })
    return { appId: appClient.appId, txId: result.txIds[0] }
  })
  const client = factory.getAppClientById({ appId })
  const state = await client.state.global.getAll()
  if (state.metaApp !== meta || state.metaTreeType !== typeId) {
    throw new Error(`CollectibleVariations ${appId} is bound to Meta ${state.metaApp} type ${state.metaTreeType}, not ${meta} type ${typeId}`)
  }

  // 3. Fund.
  await ctx.algorand.account.ensureFunded(algosdk.getApplicationAddress(appId), ctx.sender, microAlgo(REGISTRY_FUNDING))

  // 4. Register.
  if (register) {
    await recordNetworkAppDeployment(ctx.options.network, 'collectibleVariations', appId)
    receipt.receipt.registered = true
    receipt.save()
  }
  console.log(`CollectibleVariations: ${appId} (Meta ${meta}, writer-list type ${typeId}); receipt ${manifest}.`)
  return appId
}
