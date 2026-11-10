import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { MetaFactory } from '../../smart_contracts/artifacts/meta/MetaClient'
import { type ScriptContext, recordNetworkAppDeployment } from '../script-base'
import { openReceipt, sha256 } from './deployment-receipt'

/**
 * Meta is a new app beside the immutable MetaMerkles. This never touches aal.metaMerkles: consumers
 * read roots from it at call time, so it moves only after the roots migrate (DEC-3).
 */
export async function deployMeta(ctx: ScriptContext, manifest: string | undefined, register = false) {
  const factory = ctx.algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: ctx.sender, defaultSigner: ctx.signer })
  const { approvalProgram, clearStateProgram } = await factory.appFactory.compile()
  if (ctx.options.dryRun) {
    console.log(`Would deploy Meta ${ctx.options.version} on ${ctx.options.network}, governed by DAO ${ctx.appIds.dao}.`)
    return undefined
  }
  const receipt = await openReceipt(ctx, manifest, { contract: 'Meta', approval: sha256(approvalProgram), clear: sha256(clearStateProgram) })
  const appId = await receipt.createApp('Meta', { approvalProgram, clearStateProgram }, async (note) => {
    const { appClient, result } = await factory.send.create.create({
      extraProgramPages: 3, note, args: { version: ctx.options.version, akitaDao: ctx.appIds.dao },
    })
    return { appId: appClient.appId, txId: result.txIds[0] }
  })
  await ctx.algorand.account.ensureFunded(algosdk.getApplicationAddress(appId), ctx.sender, microAlgo(100_000))
  if (register) {
    await recordNetworkAppDeployment(ctx.options.network, 'meta', appId)
    receipt.receipt.registered = true
    receipt.save()
  }
  console.log(`Meta: ${appId}; receipt ${manifest}. aal.metaMerkles is unchanged: repoint it only after the roots migrate (DEC-3).`)
  return appId
}
