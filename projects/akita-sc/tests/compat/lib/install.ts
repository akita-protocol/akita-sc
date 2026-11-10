/**
 * LocalNet installers for the compatibility baseline (PHASE-0-SPEC.md §7.1 point 1): they create apps from
 * the DEPLOYED MainNet programs recorded in `fixtures/mainnet-programs.json` (never from the working tree),
 * and check after every install that the on-chain program is byte-identical to MainNet.
 *
 * LocalNet only: every function takes a LocalNet AlgorandClient from the test fixture.
 */
import { microAlgo, type AlgorandClient } from '@algorandfoundation/algokit-utils'
import algosdk, { ABIMethod, type Address, type TransactionSigner } from 'algosdk'
import { approvalBytes, clearBytes, program, signaturesFor } from './snapshot'
import { sha256Hex } from './teal-facts'

export type Sender = { sender: string | Address; signer: TransactionSigner }

/** The deployed program's creation method, recovered from its router (exactly one create route). */
export function createSignature(key: string): string {
  const routes = program(key).facts.createRoutes
  if (routes.length !== 1) throw new Error(`${key}: expected one create route, found ${routes.length}`)
  const sigs = signaturesFor(routes[0])
  if (sigs.length !== 1) throw new Error(`${key}: create selector 0x${routes[0]} has ${sigs.length} known signatures`)
  return sigs[0]
}

/** Constructor arguments of each deployed plugin generation, keyed by what the generation's `create` takes. */
export function pluginCreateArgs(key: string, ctx: { dao: bigint; factory?: bigint; version?: string }): unknown[] {
  const version = ctx.version ?? `mainnet-${program(key).appId}`
  const factory = () => {
    if (ctx.factory === undefined) throw new Error(`${key} needs a factory`)
    return ctx.factory
  }
  switch (createSignature(key)) {
    case 'create(string,uint64)void':
      // social v0.0.2/v0.0.3: (version, akitaDAO); raffle: (version, factory)
      return program(key).family === 'raffle' ? [version, factory()] : [version, ctx.dao]
    case 'create(string,uint64,uint64)void':
      // social May: (version, akitaDAO, escrow — unused); staking-pool / auction: (version, factory, akitaDAO)
      return program(key).family === 'social' ? [version, ctx.dao, 0n] : [version, factory(), ctx.dao]
    case 'create(uint64,string)void':
      return [ctx.dao, version]
    case 'createApplication(string,uint64,uint64)void':
      return [version, factory(), ctx.dao]
    default:
      throw new Error(`${key}: no argument mapping for ${createSignature(key)}`)
  }
}

/** Approval program currently on chain for `appId`. */
export async function onChainApproval(algorand: AlgorandClient, appId: bigint): Promise<Uint8Array> {
  return (await algorand.app.getById(appId)).approvalProgram
}

/** Throws unless `appId` runs exactly the snapshot program `key` (MainNet bytes). */
export async function assertRunsDeployed(algorand: AlgorandClient, appId: bigint, key: string): Promise<void> {
  const sha = sha256Hex(await onChainApproval(algorand, appId))
  if (sha !== program(key).approvalSha256) throw new Error(`app ${appId} does not run MainNet ${key}: ${sha} != ${program(key).approvalSha256}`)
}

/**
 * Creates an app from a deployed program (approval, clear, schema and pages exactly as on MainNet) and calls
 * its ABI create method with `args`.
 */
export async function installDeployed(algorand: AlgorandClient, key: string, from: Sender, args: unknown[]): Promise<bigint> {
  const p = program(key)
  if (p.globalSchema === undefined || p.localSchema === undefined) throw new Error(`${key} is a boxed child program, not an app`)
  const clear = clearBytes(key)
  if (!clear) throw new Error(`${key} has no clear program`)
  const result = await algorand.send.appCreateMethodCall({
    sender: from.sender,
    signer: from.signer,
    method: ABIMethod.fromSignature(createSignature(key)),
    args: args as never,
    approvalProgram: approvalBytes(key),
    clearStateProgram: clear,
    schema: {
      globalInts: p.globalSchema.ints,
      globalByteSlices: p.globalSchema.bytes,
      localInts: p.localSchema.ints,
      localByteSlices: p.localSchema.bytes,
    },
    extraProgramPages: p.extraProgramPages ?? 0,
    // large creates exceed the flat minimum fee on LocalNet (tests/fixtures/social.ts)
    extraFee: microAlgo(2_000),
  })
  await assertRunsDeployed(algorand, result.appId, key)
  return result.appId
}

/** balance − minimum balance (what an app can spend without touching its MBR). */
export async function freeBalance(algorand: AlgorandClient, address: string | Address): Promise<bigint> {
  const info = await algorand.client.algod.accountInformation(address.toString()).do()
  return BigInt(info.amount) - BigInt(info.minBalance)
}

export async function balanceOf(algorand: AlgorandClient, address: string | Address): Promise<bigint> {
  return BigInt((await algorand.client.algod.accountInformation(address.toString()).do()).amount)
}

/** Sum of the Rewards allocations held for `address` (box 'u' ‖ address ‖ itob(asset) ‖ itob(id)): where referral cuts land. */
export async function allocationsFor(algorand: AlgorandClient, rewardsAppId: bigint, address: string, assetId = 0n): Promise<bigint> {
  const prefix = Buffer.concat([Buffer.from('u'), Buffer.from(algosdk.decodeAddress(address).publicKey), Buffer.from(algosdk.encodeUint64(assetId))])
  let sum = 0n
  for (const box of await algorand.app.getBoxNames(rewardsAppId)) {
    const name = Buffer.from(box.nameRaw)
    if (name.length === prefix.length + 8 && name.subarray(0, prefix.length).equals(prefix)) {
      sum += algosdk.decodeUint64(await algorand.app.getBoxValue(rewardsAppId, box.nameRaw), 'bigint')
    }
  }
  return sum
}
