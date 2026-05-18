import { describe, expect, test } from 'vitest'
import { TransactionType } from '@algorandfoundation/algokit-utils/transact'
import type { SimulateResponse } from '@algorandfoundation/algokit-utils/algod-client'

import { computeExpectedCost } from './cost'

const TRACKED = 'TRACKED'
const OTHER = 'OTHER'

function txn({
  sender,
  fee,
  innerTxns,
  payment,
}: {
  sender: string
  fee: bigint
  innerTxns?: unknown[]
  payment?: { amount: bigint; receiver: string }
}) {
  return {
        txn: {
          txn: {
            sender,
            fee,
        type: payment ? TransactionType.Payment : TransactionType.AppCall,
        payment: payment
          ? {
            amount: payment.amount,
            receiver: payment.receiver,
          }
          : undefined,
      },
    },
    innerTxns,
  }
}

function simulateResponse(txnResults: unknown[]): SimulateResponse {
  return {
    txnGroups: [
      {
        txnResults: txnResults.map((txnResult) => ({ txnResult })),
      },
    ],
  } as unknown as SimulateResponse
}

describe('computeExpectedCost', () => {
  test('counts simulated max fees as minimum fee units for networkFees', () => {
    const cost = computeExpectedCost(
      simulateResponse([
        txn({
          sender: OTHER,
          fee: 272_000n,
          innerTxns: [
            txn({ sender: TRACKED, fee: 0n, payment: { amount: 100_000n, receiver: OTHER } }),
          ],
        }),
        txn({ sender: OTHER, fee: 500_000n }),
      ]),
      TRACKED,
    )

    expect(cost.networkFees).toBe(3_000n)
    expect(cost.totalAlgo).toBe(100_000n)
  })

  test('caps tracked fee payments from simulate maxFee to one minimum fee', () => {
    const cost = computeExpectedCost(
      simulateResponse([
        txn({
          sender: TRACKED,
          fee: 272_000n,
        }),
      ]),
      TRACKED,
    )

    expect(cost.networkFees).toBe(1_000n)
    expect(cost.totalAlgo).toBe(1_000n)
    expect(cost.payments).toEqual([
      {
        asset: 0n,
        amount: 1_000n,
        sender: TRACKED,
        receiver: null,
        isFee: true,
      },
    ])
  })
})
