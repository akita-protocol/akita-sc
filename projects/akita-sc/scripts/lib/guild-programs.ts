import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { installAccessListResourcePopulator, registerAccessListResourceCarrier } from 'akita-sdk'
type ReadableAddress = string | import('algosdk').Address
import type { TransactionSigner } from 'algosdk'
import type { GuildFactoryClient } from '../../smart_contracts/artifacts/arc58/guilds/factory/GuildFactoryClient'
import type { GuildConsensusFactoryClient } from '../../smart_contracts/artifacts/arc58/guilds/consensus/GuildConsensusFactoryClient'

export const GUILD_PROGRAM_UPLOAD_CHUNK_SIZE = 2_000
export const MAX_GUILD_APPROVAL_PROGRAM_SIZE = 16_372

/** Deployment and integration tests share this standard-signer, atomic upload path. */
export async function uploadGuildProgram(
  algorand: AlgorandClient,
  client: GuildFactoryClient | GuildConsensusFactoryClient,
  sender: ReadableAddress,
  signer: TransactionSigner,
  programName: string,
  program: Uint8Array,
): Promise<void> {
  installAccessListResourcePopulator()
  registerAccessListResourceCarrier(client.appId, client.appClient.appSpec, algorand.client.algod)
  if (program.length === 0 || program.length > MAX_GUILD_APPROVAL_PROGRAM_SIZE) {
    throw new Error(`Approval program must contain 1 to ${MAX_GUILD_APPROVAL_PROGRAM_SIZE} bytes`)
  }
  const maxFee = microAlgo(100_000n)
  const mbrPayment = await algorand.createTransaction.payment({
    sender,
    signer,
    receiver: client.appAddress,
    amount: microAlgo(await client.programFunding({ args: { programName, size: program.length } })),
  })
  const composer = await client.newGroup().composer()
  composer.addAppCallMethodCall(await client.params.initProgram({
    args: { mbrPayment, programName, size: program.length }, sender, signer, maxFee,
  }))
  for (let offset = 0; offset < program.length; offset += GUILD_PROGRAM_UPLOAD_CHUNK_SIZE) {
    composer.addAppCallMethodCall(await client.params.loadProgram({
      args: { offset, data: program.slice(offset, offset + GUILD_PROGRAM_UPLOAD_CHUNK_SIZE) }, sender, signer, maxFee,
    }))
  }
  await composer.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
}
