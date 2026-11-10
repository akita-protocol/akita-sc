import fs from 'node:fs'
import { createHash } from 'node:crypto'
import type { ScriptContext } from '../script-base'

export const sha256 = (value: string | Uint8Array) => createHash('sha256').update(value).digest('hex')
export const toJson = (value: unknown) => JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2) + '\n'

export type CompiledApp = { approvalProgram: Uint8Array; clearStateProgram: Uint8Array }
/** An app this receipt creates. `appId` is absent while its creation is in flight. */
export type CreatedApp = { approvalHash: string; clearHash: string; appId?: string; txId?: string }

export type DeploymentReceipt = {
  identity: string; network: string; genesisHash: string; sender: string; dao: string; version: string
  /** Everything besides network, sender, DAO and version that the deployed apps are bound to. */
  inputs: Record<string, unknown>
  apps: Record<string, CreatedApp>
  registered?: boolean
}

/**
 * Resumable receipt for a deployment that creates several apps (the `--manifest` pattern of
 * immutable-deployment.ts). Rerunning with the same manifest skips every app already created and
 * verifies it on chain; a crash between submitting a creation and saving its app ID is refused
 * instead of creating a duplicate. Each creation carries a note naming the receipt identity and app.
 */
export async function openReceipt(ctx: ScriptContext, file: string | undefined, inputs: Record<string, unknown>) {
  if (!file) throw new Error('--manifest is required for a deployment receipt')
  const genesisHash = Buffer.from((await ctx.algorand.getSuggestedParams()).genesisHash!).toString('base64')
  const identity = sha256(toJson({ genesisHash, sender: ctx.sender, dao: ctx.appIds.dao, version: ctx.options.version, inputs }))
  let exists = fs.existsSync(file)
  const receipt: DeploymentReceipt = exists
    ? JSON.parse(fs.readFileSync(file, 'utf8'))
    : { identity, network: ctx.options.network, genesisHash, sender: ctx.sender, dao: ctx.appIds.dao.toString(),
      version: ctx.options.version, inputs: JSON.parse(toJson(inputs)), apps: {} }
  if (receipt.identity !== identity) throw new Error('Manifest does not match network, sender, DAO, version, inputs or artifacts')

  const save = () => {
    if (!exists) {
      // Exclusive creation also prevents two processes from running the same deployment.
      fs.writeFileSync(file, toJson(receipt), { flag: 'wx', mode: 0o600 })
      exists = true
      return
    }
    fs.writeFileSync(`${file}.tmp`, toJson(receipt), { mode: 0o600 })
    fs.renameSync(`${file}.tmp`, file)
  }
  const creationNote = (name: string) => `akita-deploy:${identity}:${name}`

  const verify = async (name: string) => {
    const record = receipt.apps[name]
    const appId = BigInt(record.appId!)
    const live = (await ctx.algorand.client.algod.getApplicationByID(appId).do()).params
    if (!live || live.creator.toString() !== ctx.sender || sha256(live.approvalProgram) !== record.approvalHash
      || sha256(live.clearStateProgram) !== record.clearHash) {
      throw new Error(`${name} app ${appId} does not match its deployment receipt`)
    }
    return appId
  }

  /** Creates `name` once. On resume returns the recorded app after checking it runs the recorded programs. */
  const createApp = async (name: string, compiled: CompiledApp, create: (note: string) => Promise<{ appId: bigint; txId: string }>) => {
    const recorded = receipt.apps[name]
    if (recorded && !recorded.appId) {
      throw new Error(`${name} creation outcome is unresolved. Find the app ${ctx.sender} created with note `
        + `${creationNote(name)} and record its appId and txId in the receipt; refusing a duplicate deployment`)
    }
    if (!recorded) {
      receipt.apps[name] = { approvalHash: sha256(compiled.approvalProgram), clearHash: sha256(compiled.clearStateProgram) }
      save()
      const created = await create(creationNote(name))
      receipt.apps[name] = { ...receipt.apps[name], appId: created.appId.toString(), txId: created.txId }
      save()
    }
    return verify(name)
  }

  return { receipt, save, createApp }
}
