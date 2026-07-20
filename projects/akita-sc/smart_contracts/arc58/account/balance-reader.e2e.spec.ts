import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { Address, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { beforeAll, describe, expect, test } from 'vitest'
import { StakingType } from 'akita-sdk/staking'
import { buildAkitaUniverse, AkitaUniverse } from '../../../tests/fixtures/dao'
import {
  AbstractedAccountBalanceReaderClient,
  AbstractedAccountBalanceReaderFactory,
} from '../../artifacts/arc58/account/AbstractedAccountBalanceReaderClient'

algokit.Config.configure({ populateAppCallResources: true })

describe('AbstractedAccountBalanceReader', () => {
  const fixture = algorandFixture()
  let universe: AkitaUniverse
  let reader: AbstractedAccountBalanceReaderClient
  let user: Address & TransactionSignerAccount
  let asset: bigint
  let unownedAsset: bigint
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const deployer = await fixture.context.generateAccount({ initialFunds: (2_000).algos() })
    user = await fixture.context.generateAccount({ initialFunds: (100).algos() })
    universe = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    })

    const readerFactory = new AbstractedAccountBalanceReaderFactory({
      algorand,
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    reader = (
      await readerFactory.send.create.create({
        args: { akitaDao: universe.dao.client.appId },
        // The current generated app spec declares zero global integers even
        // though create stores the DAO application ID. Keep this regression
        // test deployable without changing or rebuilding the contract.
        schema: {
          globalInts: 1,
          globalByteSlices: 1,
          localInts: 0,
          localByteSlices: 0,
        },
      })
    ).appClient

    const created = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1_000_000n,
      decimals: 0,
      assetName: 'Balance Reader Asset',
      unitName: 'BRA',
    })
    asset = BigInt(created.assetId)
    const unowned = await algorand.send.assetCreate({
      sender: deployer.addr,
      signer: deployer.signer,
      total: 1n,
      decimals: 0,
      assetName: 'Unowned Reader Asset',
      unitName: 'URA',
    })
    unownedAsset = BigInt(unowned.assetId)

    await algorand.send.assetOptIn({ sender: user.addr, signer: user.signer, assetId: asset })
    await algorand.send.assetTransfer({
      sender: deployer.addr,
      signer: deployer.signer,
      assetId: asset,
      amount: 100n,
      receiver: user.addr,
    })
    await universe.staking.optIn({
      sender: deployer.addr,
      signer: deployer.signer,
      asset,
    })

    const status = await algorand.client.algod.status()
    const block = await algorand.client.algod.block(status.lastRound)
    const expiration = BigInt(block.block.header.timestamp) + 3_600n
    await universe.staking.stake({
      sender: user.addr,
      signer: user.signer,
      asset: 0n,
      type: StakingType.Hard,
      amount: 1_000_000n,
      expiration,
    })
    await universe.staking.stake({
      sender: user.addr,
      signer: user.signer,
      asset: 0n,
      type: StakingType.Lock,
      amount: 2_000_000n,
      expiration,
    })
    await universe.staking.stake({
      sender: user.addr,
      signer: user.signer,
      asset,
      type: StakingType.Hard,
      amount: 10n,
      expiration,
    })
    await universe.staking.stake({
      sender: user.addr,
      signer: user.signer,
      asset,
      type: StakingType.Lock,
      amount: 20n,
      expiration,
    })
  })

  test('returns liquid plus hard/lock stake for ALGO and ASA, and zero when unopted', async () => {
    const account = await algorand.account.getInformation(user.addr)
    const result = await reader.send.balance({
      args: {
        address: user.addr.toString(),
        assets: [0n, asset, unownedAsset],
      },
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
      extraFee: algokit.microAlgo(3_000),
    })

    expect(result.return).toEqual([BigInt(account.balance.microAlgos) + 3_000_000n, 100n, 0n])
  })
})
