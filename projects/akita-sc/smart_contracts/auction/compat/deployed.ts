/**
 * Deployed-bytecode compatibility fixtures (principal-resolution spec §7.1 "Compatibility baseline").
 *
 * `compat/deployed/*.arc56.json` are the committed artifacts at HEAD (`e7f174ee`), stripped of TEAL
 * source. Their approval programs are byte-identical to MainNet (checked on 2026-10-04 against
 * algod `GET /v2/applications/{id}` and the factories' `bc` child box; the sha256 values below are
 * asserted offline by `compat/deployed.test.ts`):
 *
 * | artifact        | MainNet                                   |
 * |-----------------|-------------------------------------------|
 * | AuctionFactory  | 3569557408                                |
 * | Auction (child) | box `bc` of 3569557408 (live children)    |
 * | AuctionPlugin   | 3569561141 (May 2026 generation)          |
 *
 * The helpers install those programs on LocalNet as "old" factories, children and plugins, so the
 * tests can run the deployed code against the Phase 2 targets (P2-REF-02, P2-CMP-01 for this track).
 * Methods whose selectors did not change are called through the current typed clients.
 */
import { microAlgo, type AlgorandClient } from '@algorandfoundation/algokit-utils'
import type { Arc56Contract } from '@algorandfoundation/algokit-utils/types/app-arc56'
import type { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import { ABIMethod, type Address, type TransactionSigner } from 'algosdk'
import { AuctionFactoryClient } from '../../artifacts/auction/AuctionFactoryClient'
import AuctionFactorySpec from './deployed/AuctionFactory.arc56.json'
import AuctionSpec from './deployed/Auction.arc56.json'
import AuctionPluginSpec from './deployed/AuctionPlugin.arc56.json'

export const DEPLOYED_AUCTION = {
  factory: { spec: AuctionFactorySpec as unknown as Arc56Contract, mainnetId: 3569557408n, sha256: '5e5edc277450489895f3801179daf803c7adf986e420296fefed23fc35c9db3a' },
  child: { spec: AuctionSpec as unknown as Arc56Contract, mainnetId: 3569557408n, sha256: 'd839744348c0399c13c830ccc711b1af0b7f784e49fb266573c79fa0605e704c' },
  plugin: { spec: AuctionPluginSpec as unknown as Arc56Contract, mainnetId: 3569561141n, sha256: '13d0326cc9e326c3374895075f7c1aff0cb8809e967fed9c8b9c443c0cec3148' },
} as const

export type Sender = { sender: string | Address; signer: TransactionSigner }

/** Approval and clear programs of a vendored spec. */
export function programsOf(spec: Arc56Contract): { approval: Uint8Array; clear: Uint8Array } {
  if (!spec.byteCode) throw new Error(`${spec.name}: vendored spec has no byteCode`)
  return {
    approval: new Uint8Array(Buffer.from(spec.byteCode.approval, 'base64')),
    clear: new Uint8Array(Buffer.from(spec.byteCode.clear, 'base64')),
  }
}

/** Creates an app from a vendored spec's exact bytecode, calling its ABI `create` method. */
export async function createFromSpec(
  algorand: AlgorandClient,
  spec: Arc56Contract,
  { sender, signer }: Sender,
  createSignature: string,
  args: unknown[],
  extraProgramPages: number,
): Promise<bigint> {
  const { approval, clear } = programsOf(spec)
  const result = await algorand.send.appCreateMethodCall({
    sender,
    signer,
    approvalProgram: approval,
    clearStateProgram: clear,
    schema: {
      globalInts: spec.state.schema.global.ints,
      globalByteSlices: spec.state.schema.global.bytes,
      localInts: spec.state.schema.local.ints,
      localByteSlices: spec.state.schema.local.bytes,
    },
    extraProgramPages,
    method: ABIMethod.fromSignature(createSignature),
    args: args as never,
  })
  return result.appId
}

/** A generic app client for a vendored spec (ABI calls by full signature). */
export function clientOf(algorand: AlgorandClient, spec: Arc56Contract, appId: bigint, { sender, signer }: Sender): AppClient {
  return algorand.client.getAppClientById({ appSpec: spec, appId, defaultSender: sender, defaultSigner: signer })
}

/** Loads `program` into a factory's boxed child contract (`initBoxedContract` + `loadBoxedContract`). */
export async function loadBoxedChild(client: AuctionFactoryClient, program: Uint8Array, version: string, { sender, signer }: Sender): Promise<void> {
  const perTxn = 2048 - 4 - 8 - 4
  const group = client.newGroup()
  group.initBoxedContract({ sender, signer, args: { version, size: program.length } })
  for (let offset = 0; offset < program.length; offset += perTxn) {
    group.loadBoxedContract({ sender, signer, args: { offset, data: program.slice(offset, offset + perTxn) } })
  }
  await group.send()
}

/** Box MBR of the boxed child contract (key `bc`). */
export const boxedChildMbr = (size: number): bigint => 2_500n + 400n * BigInt(2 + size)

export type LegacyFactoryParams = Sender & {
  algorand: AlgorandClient
  dao: bigint
  daoEscrow: { name: string; app: bigint }
}

/**
 * The DEPLOYED AuctionFactory (MainNet 3569557408 bytecode) with the deployed child loaded: it creates
 * "old" auctions (no `seller_referrer`, registry gate subject, settler's registry referral). Its
 * `newAuction`/`newAuctionCost`/`optIn` selectors equal the current legacy ones, so the returned typed
 * client works against it for those methods.
 */
export async function deployLegacyAuctionFactory({ algorand, sender, signer, dao, daoEscrow }: LegacyFactoryParams): Promise<AuctionFactoryClient> {
  const appId = await createFromSpec(
    algorand,
    DEPLOYED_AUCTION.factory.spec,
    { sender, signer },
    'create(string,string,uint64,(string,uint64))void',
    ['legacy', 'legacy-child', dao, [daoEscrow.name, daoEscrow.app]],
    3,
  )
  const client = algorand.client.getTypedAppClientById(AuctionFactoryClient, { appId, defaultSender: sender, defaultSigner: signer })
  const { approval } = programsOf(DEPLOYED_AUCTION.child.spec)
  await algorand.send.payment({ sender, signer, receiver: client.appAddress, amount: microAlgo(100_000n + boxedChildMbr(approval.length)) })
  await loadBoxedChild(client, approval, 'legacy-child', { sender, signer })
  return client
}

/** The DEPLOYED AuctionPlugin (MainNet 3569561141 bytecode), pinned to `factory`. */
export async function deployLegacyAuctionPlugin(algorand: AlgorandClient, factory: bigint, dao: bigint, from: Sender): Promise<AppClient> {
  const appId = await createFromSpec(algorand, DEPLOYED_AUCTION.plugin.spec, from, 'create(string,uint64,uint64)void', ['legacy', factory, dao], 1)
  return clientOf(algorand, DEPLOYED_AUCTION.plugin.spec, appId, from)
}
