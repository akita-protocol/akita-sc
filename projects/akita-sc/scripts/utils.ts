import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { decodeUnsignedTransaction as decodeTransaction, encodeUnsignedTransaction as encodeTransactionRaw } from 'algosdk';
import type { TransactionSigner } from 'algosdk';
import { SDKClient } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction } from 'akita-sdk/dao'
import algosdk from 'algosdk'


export async function getAppFundingNeeded(
  algorand: AlgorandClient,
  appAddress: string,
  required: bigint,
  buffer: bigint = 10_000_000n,
): Promise<bigint> {
  const info = await algorand.account.getInformation(appAddress)
  const surplus = BigInt(info.balance.microAlgos) - BigInt(info.minBalance.microAlgos)
  if (surplus >= required) return 0n
  return required - surplus + buffer
}

/**
 * Shared helper to create and execute a proposal in one step.
 * Smart-funds the DAO app account only when needed.
 */
export async function proposeAndExecute<TClient extends SDKClient>(
  algorand: AlgorandClient,
  dao: AkitaDaoSDK,
  actions: ProposalAction<TClient>[],
  expectedProposalId?: bigint,
): Promise<bigint> {
  const info = await dao.proposalCost({
    sender: dao.sendParams.sender!,
    signer: dao.sendParams.signer!,
    actions,
  })
  const funding = await getAppFundingNeeded(
    algorand,
    dao.client.appClient.appAddress.toString(),
    info.total + 1_000_000n
  )
  if (funding > 0n) {
    await algorand.send.payment({
      sender: dao.sendParams.sender!,
      signer: dao.sendParams.signer!,
      receiver: dao.client.appClient.appAddress,
      amount: microAlgo(funding),
    })
  }

  const { return: proposalId } = await dao.newProposal({ actions })
  if (proposalId === undefined) {
    throw new Error('Failed to create proposal')
  }
  // Groups bound to a predicted proposal id (K1 proposal read) only verify under that id.
  if (expectedProposalId !== undefined && proposalId !== expectedProposalId) {
    throw new Error(`Proposal ${proposalId} was created, but its execution groups reference proposal ${expectedProposalId}; not executing it`)
  }

  if (dao.appId === 0n || dao.client.appId === 0n) {
    throw new Error(`Cannot execute proposal ${proposalId}: DAO client app ID resolved to 0`)
  }

  await dao.client.send.executeProposal({
    sender: dao.sendParams.sender!,
    signer: (dao.sendParams.signer!),
    args: { proposalId },
    coverAppCallInnerTransactionFees: true,
    populateAppCallResources: true,
    maxFee: microAlgo(1_000_000),
  })
  return proposalId
}

export async function executeProposal(dao: AkitaDaoSDK, proposalId: bigint): Promise<void> {
  await dao.client.send.executeProposal({
    sender: dao.sendParams.sender!,
    signer: (dao.sendParams.signer!),
    args: { proposalId },
    coverAppCallInnerTransactionFees: true,
    populateAppCallResources: true,
    maxFee: microAlgo(1_000_000),
  })
}
