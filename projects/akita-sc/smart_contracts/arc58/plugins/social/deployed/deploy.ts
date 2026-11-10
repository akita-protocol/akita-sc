/**
 * TEST-ONLY. Deploys the MainNet social plugin program (3643581007, v0.0.3 = HEAD e7f174ee artifact) and
 * the MainNet AkitaSocial program (3569557130) on LocalNet, so the principal-resolution compatibility
 * tests run the DEPLOYED bytecode against the upgraded targets (PHASE-0-SPEC §7.1 "Compatibility
 * baseline", P2-SOC-01, P2-SOC-02). The programs come from recorded fixtures, never recompiled.
 */
import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import type { Arc56Contract } from '@algorandfoundation/algokit-utils/types/app-arc56'
import { SocialPluginSDK } from 'akita-sdk/wallet'
import algosdk, { type Address, type TransactionSigner } from 'algosdk'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'

type DeployedAbi = { contracts: Record<string, { approvalSha256: string; mainnetAppId: number }> }
type DeployedProgram = {
  approval: string
  clear: string
  approvalSha256: string
  extraProgramPages: number
  globalInts: number
  globalBytes: number
}

const sha256 = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')
const mainnetAbi = (): DeployedAbi =>
  JSON.parse(readFileSync(path.resolve(__dirname, '../../../../social/deployed/mainnet-abi.json'), 'utf8')) as DeployedAbi

/** ARC-56 of the deployed social plugin with its TEAL source removed, so algokit uses the recorded byte code. */
export function deployedSocialPluginSpec(): Arc56Contract {
  const spec = JSON.parse(readFileSync(path.join(__dirname, 'AkitaSocialPlugin.v0.0.3.arc56.json'), 'utf8')) as Arc56Contract
  delete (spec as { source?: unknown }).source
  return spec
}

export type DeployParams = {
  algorand: AlgorandClient
  sender: string | Address
  signer: TransactionSigner
  akitaDao: bigint
}

/** Creates an app running the deployed social plugin program; returns the SDK bound to it (same ABI). */
export async function deployDeployedSocialPlugin({ algorand, sender, signer, akitaDao }: DeployParams): Promise<SocialPluginSDK> {
  const factory = algorand.client.getAppFactory({ appSpec: deployedSocialPluginSpec(), defaultSender: sender, defaultSigner: signer })
  const { appClient } = await factory.send.create({ method: 'create', args: ['0.0.3', akitaDao] })

  const onChain = await algorand.app.getById(appClient.appId)
  const expected = mainnetAbi().contracts.AkitaSocialPlugin.approvalSha256
  if (sha256(onChain.approvalProgram) !== expected) {
    throw new Error(`deployed social plugin fixture drifted: ${sha256(onChain.approvalProgram)} != ${expected}`)
  }

  return new SocialPluginSDK({ algorand, factoryParams: { appId: appClient.appId, defaultSender: sender, defaultSigner: signer } })
}

/** The recorded MainNet AkitaSocial program (approval, clear, schema, pages). */
export function deployedAkitaSocialProgram(): DeployedProgram & { approvalBytes: Uint8Array; clearBytes: Uint8Array } {
  const program = JSON.parse(
    readFileSync(path.resolve(__dirname, '../../../../social/deployed/AkitaSocial.3569557130.program.json'), 'utf8')
  ) as DeployedProgram
  const approvalBytes = new Uint8Array(Buffer.from(program.approval, 'base64'))
  if (sha256(approvalBytes) !== program.approvalSha256 || program.approvalSha256 !== mainnetAbi().contracts.AkitaSocial.approvalSha256) {
    throw new Error('deployed AkitaSocial fixture drifted')
  }
  return { ...program, approvalBytes, clearBytes: new Uint8Array(Buffer.from(program.clear, 'base64')) }
}

/**
 * Creates an app running the deployed AkitaSocial program with the MainNet schema and pages:
 * `create(string,uint64,(string,uint64))void` = (version, akitaDAO, akitaDAOEscrow).
 */
export async function deployDeployedAkitaSocial(
  { algorand, sender, signer, akitaDao }: DeployParams,
  escrow: { name: string; app: bigint },
): Promise<bigint> {
  const program = deployedAkitaSocialProgram()
  const result = await algorand.send.appCreateMethodCall({
    sender,
    signer,
    method: algosdk.ABIMethod.fromSignature('create(string,uint64,(string,uint64))void'),
    args: ['0.0.3-mainnet', akitaDao, [escrow.name, escrow.app]],
    approvalProgram: program.approvalBytes,
    clearStateProgram: program.clearBytes,
    schema: { globalInts: program.globalInts, globalByteSlices: program.globalBytes, localInts: 0, localByteSlices: 0 },
    extraProgramPages: program.extraProgramPages,
    // an ~8 KB create exceeds the flat minimum fee on LocalNet's per-byte fee rule (tests/fixtures/social.ts)
    extraFee: microAlgo(1_000),
  })
  return result.appId
}
