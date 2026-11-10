import algosdk from 'algosdk'
import { AuctionFactory } from '../../smart_contracts/artifacts/auction/AuctionClient'
import { RaffleFactory } from '../../smart_contracts/artifacts/raffle/RaffleClient'
import { StakingPoolFactory } from '../../smart_contracts/artifacts/staking-pool/StakingPoolClient'
import { type ScriptContext, type UpdateTarget, runUpdate } from '../script-base'

export const childKinds = ['auction', 'raffle', 'staking-pool'] as const
export type ChildKind = typeof childKinds[number]
const factories = { auction: AuctionFactory, raffle: RaffleFactory, 'staking-pool': StakingPoolFactory }

export async function discoverChildren(ctx: ScriptContext, factoryId: bigint): Promise<bigint[]> {
  if (factoryId <= 0n) throw new Error('A positive factory ID is required')
  const ids: bigint[] = []
  let token: string | undefined
  const seen = new Set<string>()
  do {
    let request = ctx.algorand.client.indexer.searchForApplications().creator(algosdk.getApplicationAddress(factoryId).toString()).limit(1000)
    if (token) request = request.nextToken(token)
    const page = await request.do()
    for (const app of page.applications) if (!app.deleted) ids.push(app.id)
    token = page.nextToken
    if (token && seen.has(token)) throw new Error('Indexer repeated a pagination token; child inventory is incomplete')
    if (token) seen.add(token)
  } while (token)
  return [...new Set(ids)]
}

export async function updateChildren(ctx: ScriptContext, kind: ChildKind, factoryId: bigint, ids: bigint[], syncSelectors = true) {
  if (!childKinds.includes(kind) || factoryId <= 0n || !ids.length || ids.some(id => id <= 0n)) throw new Error('Supply a supported kind, factory ID, and positive child IDs')
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate child app IDs')
  const Factory = factories[kind]
  const factory = new Factory({ algorand: ctx.algorand, defaultSender: ctx.sender, defaultSigner: ctx.signer })
  const compiled = await factory.appFactory.compile()
  const targets: UpdateTarget[] = []
  // Inspect every selected ID before submitting the first governance proposal.
  for (const appId of ids) {
    const live = (await ctx.algorand.client.algod.getApplicationByID(appId).do()).params
    if (!live || live.creator.toString() !== algosdk.getApplicationAddress(factoryId).toString()) throw new Error(`App ${appId} was not created by factory ${factoryId}`)
    const client = factory.getAppClientById({ appId })
    const state = await client.state.global.getAll()
    if (state.akitaDao !== ctx.dao.appId) throw new Error(`App ${appId} belongs to another DAO`)
    // Reject mismatched families using their stable schema, before decoding any box state.
    const schema = factory.appFactory.appSpec.state.schema
    if (Number(live.globalStateSchema?.numUint) !== schema.global.ints || Number(live.globalStateSchema?.numByteSlice) !== schema.global.bytes) throw new Error(`App ${appId} does not have the ${kind} schema`)
    if (Buffer.from(live.approvalProgram).equals(Buffer.from(compiled.approvalProgram)) && state.version === ctx.options.version) {
      console.log(`App ${appId}: already matches approval and version`)
      continue
    }
    targets.push({ name: `${kind} ${appId}`, appId, appIdKey: '', leasePrefix: `child_${appId}`, syncSelectors,
      createFactory: params => new Factory(params) })
  }
  return runUpdate(ctx, targets)
}
