/**
 * AUD-C7: the 100 ALGO fee for registering a tree type used to stay in the Meta app with no way out.
 *
 * Meta now counts each fee, less the storage its type occupies, as owed to the DAO. Anyone can send
 * the collected amount to the revenue escrow the DAO names for Meta (`updateAkitaDAOEscrow`, through
 * the update plugin like every other fee-generating contract). Until the DAO names one nothing can be
 * collected, and a collection never takes the app below its minimum balance.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { sendPrepared } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { MetaSDK, SchemaPart } from 'akita-sdk/meta'
import { SDKClient } from 'akita-sdk/types'
import { CallerType } from 'akita-sdk/wallet'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { expectContractError } from '../../tests/utils/errors'
import { errEscrowDoesNotExist } from '../arc58/account/errors'
import { MetaFactory } from '../artifacts/meta/MetaClient'
import { errNotAkitaDao } from '../errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

const TYPE_FEE = 100_000_000n
const BASE_MIN_BALANCE = 100_000n
const ESCROW = 'rev_meta'

async function proposeAndExecute<TClient extends SDKClient>(dao: AkitaDaoSDK, actions: ProposalAction<TClient>[]): Promise<bigint> {
  const info = await dao.proposalCost({ actions })
  await dao.client.appClient.fundAppAccount({ amount: info.total.microAlgo() })
  const { return: proposalId } = await dao.newProposal({ actions })
  if (proposalId === undefined) throw new Error('Failed to create proposal')
  await dao.executeProposal({ proposalId })
  return proposalId
}

describe('Meta type fees go to a DAO escrow (AUD-C7)', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  let dispenser: TransactionSignerAccount
  let meta: MetaSDK
  let metaAddress: string

  const info = (address: string) => algorand.account.getInformation(address)
  const balance = async (address: string) => (await info(address)).balance.microAlgo

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: microAlgo(2_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (500).algo())

    // A fresh Meta governed by the universe's DAO, created with no balance of its own.
    const factory = algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
    const { appClient } = await factory.send.create.create({ args: { version: 'test', akitaDao: universe.dao.appId } })
    meta = new MetaSDK({ algorand, factoryParams: { appId: appClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })
    metaAddress = appClient.appAddress.toString()
  })

  test('each new type adds its fee, less its storage, to what is owed to the DAO', async () => {
    expect(await meta.typeFees()).toBe(0n)

    await meta.addType({ description: 'Unspecified - no schema', schemaList: [] })
    const first = await info(metaAddress)
    const firstStorage = first.minBalance.microAlgo - BASE_MIN_BALANCE
    expect(firstStorage).toBeGreaterThan(0n)
    expect(first.balance.microAlgo).toBe(TYPE_FEE)
    expect(await meta.typeFees()).toBe(TYPE_FEE - firstStorage)

    await meta.addType({ description: 'Collection - uint64', schemaList: [SchemaPart.Uint64] })
    const second = await info(metaAddress)
    const secondStorage = second.minBalance.microAlgo - first.minBalance.microAlgo
    expect(secondStorage).toBeGreaterThan(firstStorage)
    expect(second.balance.microAlgo).toBe(2n * TYPE_FEE)
    expect(await meta.typeFees()).toBe(2n * TYPE_FEE - firstStorage - secondStorage)
  })

  test('nothing can be collected before the DAO names an escrow, and only the DAO can name one', async () => {
    const before = await balance(metaAddress)
    await expectContractError(meta.collectTypeFees(), errEscrowDoesNotExist)
    await expectContractError(
      meta.client.send.updateAkitaDaoEscrow({ args: { config: { name: ESCROW, app: universe.dao.appId } } }),
      errNotAkitaDao,
    )
    expect(await balance(metaAddress)).toBe(before)
  })

  test('once the DAO names the escrow anyone can send it the collected fees, never below the app minimum balance', async () => {
    const sender = deployer.addr.toString()
    const signer = deployer.signer
    const dao = new AkitaDaoSDK({ algorand, factoryParams: { appId: universe.dao.appId, defaultSender: sender, defaultSigner: signer } })
    await dao.getWallet()
    const wallet = dao.wallet
    await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })

    // The DAO creates the revenue escrow for Meta ...
    const escrowMbr = await wallet.getMbr({ escrow: ESCROW, methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(escrowMbr.newEscrowMintCost + 1_000_000n) })
    await proposeAndExecute(dao, [{ type: ProposalActionEnum.NewEscrow, escrow: ESCROW, address: algosdk.ALGORAND_ZERO_ADDRESS_STRING }])
    const escrow = await wallet.getEscrow(ESCROW)
    const escrowAddress = algosdk.getApplicationAddress(escrow.id).toString()

    // ... and points Meta at it through the update plugin, approved by an UpgradeApp proposal.
    const execution = await wallet.build.usePlugin({
      sender, signer, lease: `meta_escrow_${Date.now() % 1_000_000}`, windowSize: 2000n, callerType: CallerType.Global,
      calls: [universe.updatePlugin.updateAkitaDaoEscrowForApp({ sender, signer, appId: meta.appId, newEscrow: { name: ESCROW, app: escrow.id } })],
    })
    const walletMbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(walletMbr.plugins + walletMbr.executions + 2_000_000n) })
    await proposeAndExecute(dao, [{
      type: ProposalActionEnum.UpgradeApp, app: meta.appId,
      executionKey: execution.lease, groups: execution.ids,
      firstValid: execution.firstValid, lastValid: execution.lastValid,
    }])
    for (const window of execution.windows) await sendPrepared(window, algorand.client.algod)

    const configured = await meta.client.state.global.akitaDaoEscrow()
    expect(configured?.name).toBe(ESCROW)
    expect(configured?.app).toBe(escrow.id)

    const collector = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    const collect = () => meta.collectTypeFees({ sender: collector.addr.toString(), signer: collector.signer })
    const owed = await meta.typeFees()
    const escrowBefore = await balance(escrowAddress)

    // This app was created with no balance, so the first fee also covered its own 0.1 ALGO minimum.
    // Only what the app can spare is sent; the rest stays owed.
    expect(await collect()).toBe(owed - BASE_MIN_BALANCE)
    expect(await balance(escrowAddress) - escrowBefore).toBe(owed - BASE_MIN_BALANCE)
    expect(await meta.typeFees()).toBe(BASE_MIN_BALANCE)
    const drained = await info(metaAddress)
    expect(drained.balance.microAlgo).toBe(drained.minBalance.microAlgo)
    expect(await collect()).toBe(0n)

    // Once the app holds its own minimum (the deploy script funds it), the rest follows.
    await algorand.send.payment({ sender: dispenser.addr, receiver: metaAddress, amount: microAlgo(BASE_MIN_BALANCE) })
    expect(await collect()).toBe(BASE_MIN_BALANCE)
    expect(await balance(escrowAddress) - escrowBefore).toBe(owed)
    expect(await meta.typeFees()).toBe(0n)
    const settled = await info(metaAddress)
    expect(settled.balance.microAlgo).toBe(settled.minBalance.microAlgo)

    // A later type is collected in full.
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (150).algo())
    await meta.addType({ description: 'Trait - uint64', schemaList: [SchemaPart.Uint64] })
    const next = await meta.typeFees()
    expect(next).toBeGreaterThan(TYPE_FEE - 50_000n)
    expect(await collect()).toBe(next)
    expect(await balance(escrowAddress) - escrowBefore).toBe(owed + next)
    expect(await meta.typeFees()).toBe(0n)
  })
})
