import { algo, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { describe, expect, test } from 'vitest'
import { TimeWarp } from '../../tests/utils/time'
import { StakingFactory } from '../artifacts/staking/StakingClient'

const fixture = algorandFixture()
const STAKING_TYPE_LOCK = 40
const STAKES_MBR = 32_100n
const TOTALS_MBR = 15_700n
const ASSET_OPT_IN_MBR = 100_000n
const ONE_DAY = 86_400n

const latestTimestamp = async () => {
  const { algorand } = fixture.context
  const status = await algorand.client.algod.status()
  return (await algorand.client.algod.block(status.lastRound)).block.header.timestamp
}

describe('expired lock checkpointing', () => {
  test('tracks only live locks across checkpoint, retry, re-lock, and withdrawal', async () => {
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    const user = await fixture.context.generateAccount({ initialFunds: algo(10) })
    const timeWarp = new TimeWarp(algorand)
    const factory = algorand.client.getTypedAppFactory(StakingFactory, {
      defaultSender: testAccount,
      defaultSigner: testAccount.signer,
    })
    const { appClient: client } = await factory.send.create.create({
      extraProgramPages: 3,
      args: { version: '1.0.0', akitaDao: 0n },
    })
    await client.appClient.fundAppAccount({ amount: algo(1) })
    await client.send.init({ args: {} })

    const { assetId } = await algorand.send.assetCreate({
      sender: testAccount,
      signer: testAccount.signer,
      total: 1_000_000_000n,
      decimals: 6,
      assetName: 'Live lock test',
      unitName: 'LIVE',
    })
    const optInPayment = await algorand.createTransaction.payment({
      sender: testAccount,
      signer: testAccount.signer,
      receiver: client.appAddress,
      amount: microAlgo(TOTALS_MBR + ASSET_OPT_IN_MBR),
    })
    await client.send.optIn({
      args: { payment: optInPayment, asset: assetId },
      extraFee: microAlgo(1_000),
    })
    await algorand.send.assetOptIn({ sender: user, assetId })

    const stakeAmount = 10_000_000n
    await algorand.send.assetTransfer({
      sender: testAccount,
      signer: testAccount.signer,
      receiver: user,
      assetId,
      amount: stakeAmount,
    })

    try {
      const payment = await algorand.createTransaction.payment({
        sender: user,
        receiver: client.appAddress,
        amount: microAlgo(STAKES_MBR),
      })
      const assetXfer = await algorand.createTransaction.assetTransfer({
        sender: user,
        receiver: client.appAddress,
        assetId,
        amount: stakeAmount,
      })
      await client.send.stakeAsa({
        sender: user,
        signer: user.signer,
        args: {
          payment,
          assetXfer,
          type: STAKING_TYPE_LOCK,
          amount: stakeAmount,
          expiration: (await latestTimestamp()) + 5n,
        },
      })

      const staked = await client.getTotals({ args: { assets: [assetId] } })
      expect(staked[0]).toEqual([stakeAmount, 0n, stakeAmount])

      const early = await client.send.checkpointExpiredLock({
        args: { address: user.addr.toString(), asset: assetId },
      })
      expect(early.return).toBe(false)

      await timeWarp.timeWarp(10n)
      const checkpointed = await client.send.checkpointExpiredLock({
        args: { address: user.addr.toString(), asset: assetId },
      })
      expect(checkpointed.return).toBe(true)
      expect(await client.getTotals({ args: { assets: [assetId] } })).toEqual([[stakeAmount, 0n, 0n]])

      const retry = await client.send.checkpointExpiredLock({
        sender: user,
        signer: user.signer,
        args: { address: user.addr.toString(), asset: assetId },
      })
      expect(retry.return).toBe(false)

      const relockPayment = await algorand.createTransaction.payment({
        sender: user,
        receiver: client.appAddress,
        amount: microAlgo(0),
      })
      const relockXfer = await algorand.createTransaction.assetTransfer({
        sender: user,
        receiver: client.appAddress,
        assetId,
        amount: 0n,
      })
      await client.send.stakeAsa({
        sender: user,
        signer: user.signer,
        args: {
          payment: relockPayment,
          assetXfer: relockXfer,
          type: STAKING_TYPE_LOCK,
          amount: 0n,
          expiration: (await latestTimestamp()) + ONE_DAY,
        },
      })
      expect(await client.getTotals({ args: { assets: [assetId] } })).toEqual([[stakeAmount, 0n, stakeAmount]])

      await timeWarp.timeWarp(ONE_DAY + 1n)
      await client.send.checkpointExpiredLock({ args: { address: user.addr.toString(), asset: assetId } })
      await client.send.withdraw({
        sender: user,
        signer: user.signer,
        args: { asset: assetId, type: STAKING_TYPE_LOCK },
        extraFee: microAlgo(1_000),
      })
      expect(await client.getTotals({ args: { assets: [assetId] } })).toEqual([[0n, 0n, 0n]])
    } finally {
      await timeWarp.resetTimeWarp()
    }
  })
})
