/**
 * ACC-01 / SG-04 regression: an app that self-registers in the EscrowFactory and stores an
 * attacker-chosen `controlled_address` must not be treated as an ARC-58 wallet, so it cannot
 * borrow another account's identity for gate checks or referrals.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { StakingPoolSDK } from 'akita-sdk/staking-pool'
import { newWallet, WalletSDK } from 'akita-sdk/wallet'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { MockFakeWalletClient, MockFakeWalletFactory } from '../artifacts/mocks/fake-wallet/MockFakeWalletClient'
import { errFailedGate } from './errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
const POOL_STAKING_TYPE_NONE = 0
const REGISTER_MBR = 12_100n

const blockTimestamp = async (algorand: algokit.AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  const block = await algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

describe('Origin spoofing via self-registered fake wallets (ACC-01 / SG-04)', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let whale: TransactionSignerAccount
  let attacker: TransactionSignerAccount
  let universe: AkitaUniverse
  let fake: MockFakeWalletClient
  let wallet: WalletSDK
  let gateSDK: GateSDK
  let gateId: bigint
  let pool: StakingPoolSDK
  let testAssetId: bigint

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (2_500).algo() })
    whale = await fixture.context.generateAccount({ initialFunds: (100).algo() })
    attacker = await fixture.context.generateAccount({ initialFunds: (100).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_500).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })

    // The fake wallet: attacker-controlled app claiming the whale as its controlled address.
    const fakeFactory = algorand.client.getTypedAppFactory(MockFakeWalletFactory, {
      defaultSender: attacker.addr,
      defaultSigner: attacker.signer,
    })
    fake = (await fakeFactory.send.create.create({
      args: { controlledAddress: whale.addr.toString(), referrer: attacker.addr.toString(), spendingAddress: ZERO },
    })).appClient
    await fake.appClient.fundAppAccount({ amount: (5).algo() })
    // EscrowFactory.register accepts any app caller.
    await fake.send.registerSelf({
      args: { escrowFactory: universe.escrowFactory.appId, mbr: REGISTER_MBR },
      extraFee: microAlgo(2_000),
    })
    expect(await universe.escrowFactory.exists({ args: { address: fake.appAddress.toString() } })).toBe(true)

    // A genuine wallet created by the DAO-registered wallet factory.
    wallet = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: whale.addr, defaultSigner: whale.signer },
      sender: whale.addr,
      signer: whale.signer,
      nickname: 'genuine',
      // This spec exercises the legacy registry resolver (fake.probe -> legacyWalletOf -> EscrowFactory.get).
      register: true,
    })

    // Asset gate: holders of testAsset only. The whale holds it, the fake wallet does not.
    testAssetId = (await algorand.send.assetCreate({
      sender: deployer.addr, signer: deployer.signer, total: 1_000n, decimals: 0, assetName: 'Gate', unitName: 'GT',
    })).assetId
    await algorand.send.assetOptIn({ sender: whale.addr, signer: whale.signer, assetId: testAssetId })
    await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: whale.addr, assetId: testAssetId, amount: 1n })

    gateSDK = universe.gate as unknown as GateSDK
    await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: universe.subgates.assetGate.client.appAddress, amount: (1).algo() })
    await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: gateSDK.client.appAddress, amount: (1).algo() })
    gateId = (await gateSDK.register({
      sender: deployer.addr,
      signer: deployer.signer,
      args: [{
        type: 'asset',
        appId: universe.subgates.assetGate.appId,
        layer: 0n,
        logicalOperator: LogicalOperator.None,
        asset: testAssetId,
        op: Operator.GreaterThanOrEqualTo,
        value: 1n,
      }],
    })).return!

    const factorySDK = universe.stakingPoolFactory
    await algorand.send.payment({
      sender: deployer.addr, signer: deployer.signer, receiver: factorySDK.client.appAddress,
      amount: microAlgo((await factorySDK.cost()) * 2n + 10_000_000n),
    })
    pool = await factorySDK.new({
      sender: deployer.addr,
      signer: deployer.signer,
      title: 'Gated NONE pool',
      type: POOL_STAKING_TYPE_NONE,
      marketplace: deployer.addr.toString(),
      stakeKey: { address: ZERO, name: '' },
      minimumStakeAmount: 0n,
      allowLateSignups: true,
      gateId,
      maxEntries: 0n,
    })
    await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: pool.client.appAddress, amount: microAlgo(200_000) })
    await pool.finalize({
      sender: deployer.addr,
      signer: deployer.signer,
      signupTimestamp: 0n,
      startTimestamp: 0n,
      endTimestamp: (await blockTimestamp(algorand)) + 86_400n,
    })
  })

  const probe = async (address: string) =>
    (await fake.send.probe({ args: { akitaDao: universe.dao.appId, address }, extraFee: microAlgo(5_000) })).return!

  test('a self-registered fake wallet is not resolved as a wallet', async () => {
    const resolved = await probe(fake.appAddress.toString())
    expect(resolved.walletId).toBe(0n)
    // origin falls back to the sender address, never the claimed whale
    expect(resolved.origin).toBe(fake.appAddress.toString())
    expect(resolved.origin).not.toBe(whale.addr.toString())
    // no referral attributable to the attacker-chosen referrer
    expect(resolved.referrer).toBe(ZERO)
  })

  test('a factory-created wallet and its escrows still resolve', async () => {
    const resolved = await probe(wallet.client.appAddress.toString())
    expect(resolved.walletId).toBe(wallet.appId)
    expect(resolved.origin).toBe(wallet.client.appAddress.toString())

    const mbr = await wallet.getMbr({ escrow: 'origin', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.newEscrowMintCost + 1_000_000n) })
    const escrowId = (await wallet.newEscrow({ sender: whale.addr, signer: whale.signer, escrow: 'origin', address: ZERO })).return!
    await wallet.register({ sender: whale.addr, signer: whale.signer, escrow: 'origin' })

    const escrowResolved = await probe(algosdk.getApplicationAddress(escrowId).toString())
    expect(escrowResolved.walletId).toBe(wallet.appId)
    expect(escrowResolved.origin).toBe(wallet.client.appAddress.toString())
  })

  test('the real holder passes the gate, the fake wallet impersonating it does not', async () => {
    const gateTxn = await gateSDK.build.mustCheck({
      sender: whale.addr, signer: whale.signer, caller: whale.addr.toString(), gateId, args: [{ type: 'asset' }],
    })
    await pool.enter({ sender: whale.addr, signer: whale.signer, entries: [{ asset: 0n, amount: 1n }], gateTxn })

    const encodedGateArgs = (gateTxn.args?.[2] ?? []) as Uint8Array[]
    const group = fake.newGroup()
      .gatedEnter({
        args: {
          pool: pool.appId,
          gate: gateSDK.appId,
          gateCaller: whale.addr.toString(),
          gateId,
          gateArgs: encodedGateArgs,
          payAmount: 1_000_000n,
          entries: [[0n, 1n, []]],
        },
        maxFee: microAlgo(100_000),
      })
    for (let i = 0; i < 4; i++) {
      group.opUp({ args: {}, note: `opUp-${i}`, maxFee: microAlgo(1_000) })
    }
    await expect(group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true }))
      .rejects.toThrow(new RegExp(errFailedGate))
  })
})
