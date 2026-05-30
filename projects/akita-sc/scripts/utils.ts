import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { decodeTransaction, encodeTransactionRaw } from '@algorandfoundation/algokit-utils/transact'
import type { TransactionSigner } from '@algorandfoundation/algokit-utils/transact'
import { SDKClient } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction } from 'akita-sdk/dao'
import algosdk from 'algosdk'

function wrapUtils10Signer(signer: unknown): TransactionSigner {
  return async (txnGroup, indexesToSign) => {
    const utils10Group: unknown[] = txnGroup.map((txn) => {
      if (typeof (txn as { getEncodingSchema?: unknown }).getEncodingSchema === 'function') {
        return decodeTransaction(algosdk.encodeUnsignedTransaction(txn as unknown as algosdk.Transaction))
      }
      return txn
    })

    try {
      return await (signer as (g: unknown[], i: number[]) => Promise<Uint8Array[]>)(utils10Group, indexesToSign)
    } catch (error) {
      if (error instanceof TypeError && /signTxn is not a function/.test(error.message)) {
        const algosdkGroup: algosdk.Transaction[] = txnGroup.map((txn) => {
          if (typeof (txn as { signTxn?: unknown }).signTxn === 'function') {
            return txn as unknown as algosdk.Transaction
          }
          return algosdk.decodeUnsignedTransaction(encodeTransactionRaw(txn as never))
        })
        return (signer as algosdk.TransactionSigner)(algosdkGroup, indexesToSign)
      }
      throw error
    }
  }
}

/**
 * Checks if an app account needs funding and returns the amount to send.
 * Adds a 10 ALGO buffer when funding is needed so we don't fund on every call.
 * Returns 0n if the account already has sufficient surplus.
 */
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
  actions: ProposalAction<TClient>[]
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

  if (dao.appId === 0n || dao.client.appId === 0n) {
    throw new Error(`Cannot execute proposal ${proposalId}: DAO client app ID resolved to 0`)
  }

  await dao.client.send.executeProposal({
    sender: dao.sendParams.sender!,
    signer: wrapUtils10Signer(dao.sendParams.signer!),
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
    signer: wrapUtils10Signer(dao.sendParams.signer!),
    args: { proposalId },
    coverAppCallInnerTransactionFees: true,
    populateAppCallResources: true,
    maxFee: microAlgo(1_000_000),
  })
}
