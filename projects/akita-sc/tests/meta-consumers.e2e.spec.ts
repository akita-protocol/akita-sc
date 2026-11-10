import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ABIType, decodeAddress } from 'algosdk'
import { readFileSync } from 'node:fs'
import { beforeAll, describe, expect, test } from 'vitest'
import { MetaFactory, MetaSDK, MerkleTree, SchemaPart, encodeLeaf, hashLeaf } from '../../akita-sdk/src/meta'
import { MetaMerklesSDK } from '../../akita-sdk/src/meta-merkles'
import { MetaMerklesFactory } from '../../akita-sdk/src/generated/MetaMerklesClient'
import { MockMetaReaderClient, MockMetaReaderFactory } from '../smart_contracts/artifacts/mocks/meta-reader/MockMetaReaderClient'
import { MerkleAssetGateFactory } from '../smart_contracts/artifacts/gates/sub-gates/merkle-asset/MerkleAssetGateClient'
import { deployMerkleAddressGate } from './fixtures/gates/sub-gates/merkle-address'
import { deployAkitaDAO } from './fixtures/dao'
import { deployHyperSwap } from './fixtures/hyper-swap'
import { errInvalidState, errParticipantsNotCleaned, errCantVerifyLeaf, errNotAParticipant, errOfferTooLong, errTermsMismatch } from '../smart_contracts/hyper-swap/errors'
import { errClawbackForbidden, errInvalidPaymentSender } from '../smart_contracts/utils/errors'
import { errFailedToVerifyInclusion } from '../smart_contracts/meta/errors'
import { TimeWarp } from './utils/time'
import {
  HyperSwapSDK, hyperSwapRootBoxName, computeOfferTerms, validateOffer, hyperSwapTradeTree, hyperSwapParticipantTree,
  HYPER_SWAP_MAX_OFFER_DURATION,
} from 'akita-sdk'
import { MockHyperSwapFactory } from '../smart_contracts/artifacts/mocks/hyper-swap/MockHyperSwapClient'

test('Meta retains legacy operations and adds an upgradeable constructor', () => {
  const oldSpec = JSON.parse(readFileSync('../akita-sdk/legacy/MetaMerkles.arc56.json', 'utf8'))
  const spec = JSON.parse(readFileSync('smart_contracts/artifacts/meta/Meta.arc56.json', 'utf8'))
  const signature = (method: any) => `${method.name}(${method.args.map((arg: any) => arg.type).join(',')})${method.returns.type}`
  const methods = spec.methods.map(signature)
  for (const method of oldSpec.methods.filter((method: any) => method.name !== 'create'))
    expect(methods).toContain(signature(method))
  expect(methods).toContain('create(string,uint64)void')
  expect(spec.methods.find((method: any) => method.name === 'update').actions.call).toEqual(['UpdateApplication'])
  expect(spec.state.maps.box.types).toEqual(oldSpec.state.maps.box.types)
  expect(spec.state.maps.box.data).toBeUndefined()
  expect(spec.state.maps.box.records).toBeDefined()
})

describe.each(['Meta', 'MetaMerkles'] as const)('Contract consumers against %s (LocalNet)', (version) => {
  const fixture = algorandFixture()
  let sdk: MetaSDK | MetaMerklesSDK
  let reader: MockMetaReaderClient
  let owner: string
  let dao: Awaited<ReturnType<typeof deployAkitaDAO>>
  let asset: bigint
  let assets: MerkleTree<bigint[]>
  const name = 'compat-assets'

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(500_000_000))
    const defaults = { defaultSender: owner, defaultSigner: testAccount.signer }
    const registryDAO = await deployAkitaDAO({ fixture, sender: owner, signer: testAccount.signer, apps: {} })
    const app = version === 'Meta'
      ? (await algorand.client.getTypedAppFactory(MetaFactory, defaults).send.create.create({ args: { version: 'test', akitaDao: registryDAO.appId } })).appClient
      : (await algorand.client.getTypedAppFactory(MetaMerklesFactory, defaults).send.create.create({ args: {} })).appClient
    await app.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    sdk = new (version === 'Meta' ? MetaSDK : MetaMerklesSDK)({ algorand, readerAccount: owner, factoryParams: { appId: app.appId, ...defaults } })
    await sdk.addType({ description: 'Unspecified', schemaList: [] })
    await sdk.addType({ description: 'Collection', schemaList: [SchemaPart.Uint64] })
    await sdk.addType({ description: 'Addresses', schemaList: [SchemaPart.Address] })
    await sdk.addType({ description: 'Trade', schemaList: [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64] })
    dao = await deployAkitaDAO({ fixture, sender: owner, signer: testAccount.signer, apps: { metaMerkles: app.appId } })
    reader = (await algorand.client.getTypedAppFactory(MockMetaReaderFactory, defaults).send.create.bare()).appClient
    const created = await algorand.send.assetCreate({ sender: owner, total: 100n, decimals: 0 })
    asset = created.assetId
    assets = MerkleTree.of([[asset], [asset + 1n], [asset + 2n], [asset + 3n]], [SchemaPart.Uint64])
    await sdk.addRoot({ name, root: assets.root, type: 1n })
    // Royalties are stored as eight binary bytes inside the legacy ABI string.
    await sdk.addData({ name, key: 'royalty', value: '\u0000\u0000\u0000\u0000\u0000\u0000\u0001\u0000' })
  })

  test('shared typed proof/read calls preserve valid, invalid and wrong-type results', async () => {
    const args = { registry: sdk.appId, address: owner, name, leaf: hashLeaf(encodeLeaf([asset], [SchemaPart.Uint64])), proof: assets.getProof(0), type: 1n }
    expect((await reader.send.verify({ args, extraFee: microAlgo(10_000) })).return).toBe(true)
    expect((await reader.send.verify({ args: { ...args, type: 2n }, extraFee: microAlgo(10_000) })).return).toBe(false)
    expect((await reader.send.verifiedRead({ args: { ...args, key: 'royalty' }, extraFee: microAlgo(10_000) })).return)
      .toBe('\u0000\u0000\u0000\u0000\u0000\u0000\u0001\u0000')
    expect((await reader.send.verifiedRead({ args: { ...args, leaf: new Uint8Array(32), key: 'royalty' }, extraFee: microAlgo(10_000) })).return).toBe('')
  })

  test('the auction/raffle/marketplace royalty helper reads verified collection data', async () => {
    const args = { akitaDao: dao.appId, asset, name, proof: assets.getProof(0) }
    expect((await reader.send.royalty({ args, extraFee: microAlgo(10_000) })).return).toBe(256n)
    // The frozen MetaMerkles program still logs its original error code.
    await expect(reader.send.royalty({
      args: { ...args, proof: assets.getProof(1) }, extraFee: microAlgo(10_000),
    })).rejects.toThrow(version === 'Meta' ? errFailedToVerifyInclusion : 'ERR:FVRI')
  })

  test('MerkleAssetGate accepts a held collection member and rejects a mismatched proof', async () => {
    const { algorand, testAccount } = fixture.context
    const { appClient: gate } = await algorand.client.getTypedAppFactory(MerkleAssetGateFactory, {
      defaultSender: owner, defaultSigner: testAccount.signer,
    }).send.create.create({ args: { version: 'test', akitaDao: dao.appId } })
    await gate.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    const args = ABIType.from('(address,string)').encode([owner, name])
    const cost = (await gate.send.cost({ args: { args } })).return!
    const registered = await gate.send.register({ args: { args, mbrPayment: algorand.createTransaction.payment({
      sender: owner, receiver: gate.appAddress, amount: microAlgo(cost),
    }) } })
    const check = (index: number) => gate.send.check({ args: {
      caller: owner, registryId: registered.return!, args: ABIType.from('(uint64,byte[32][])').encode([asset, assets.getProof(index)]),
    }, extraFee: microAlgo(10_000) })
    expect((await check(0)).return).toBe(true)
    expect((await check(1)).return).toBe(false)
  })

  test('MerkleAddressGate accepts a member and rejects a different caller', async () => {
    const { algorand, testAccount } = fixture.context
    const addresses = [owner, ...Array.from({ length: 3 }, () => algorand.account.random().addr.toString())]
    const tree = MerkleTree.of(addresses.map((address) => [decodeAddress(address).publicKey]), [SchemaPart.Address])
    const rootName = 'compat-addresses'
    await sdk.addRoot({ name: rootName, root: tree.root, type: 2n })
    const gate = await deployMerkleAddressGate({ fixture, sender: owner, signer: testAccount.signer, args: { akitaDao: dao.appId } })
    const args = ABIType.from('(address,string)').encode([owner, rootName])
    const cost = (await gate.send.cost({ args: { args } })).return!
    const registered = await gate.send.register({ args: { args, mbrPayment: algorand.createTransaction.payment({
      sender: owner, receiver: gate.appAddress, amount: microAlgo(cost),
    }) } })
    const check = (caller: string) => gate.send.check({ args: {
      caller, registryId: registered.return!, args: ABIType.from('byte[32][]').encode(tree.getProof(0)),
    }, extraFee: microAlgo(10_000) })
    expect((await check(owner)).return).toBe(true)
    expect((await check(addresses[1])).return).toBe(false)
  })

})

// HyperSwap shares fixed MBR constants for the current Meta root layout.
describe('HyperSwap consumers against Meta (LocalNet)', () => {
  const fixture = algorandFixture()
  let sdk: MetaSDK
  let owner: string
  let dao: Awaited<ReturnType<typeof deployAkitaDAO>>
  let asset: bigint

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(500_000_000))
    const defaults = { defaultSender: owner, defaultSigner: testAccount.signer }
    const registryDAO = await deployAkitaDAO({ fixture, sender: owner, signer: testAccount.signer, apps: {} })
    const { appClient } = await algorand.client.getTypedAppFactory(MetaFactory, defaults).send.create.create({
      args: { version: 'test', akitaDao: registryDAO.appId },
    })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    sdk = new MetaSDK({ algorand, readerAccount: owner, factoryParams: { appId: appClient.appId, ...defaults } })
    await sdk.addType({ description: 'Unspecified', schemaList: [] })
    await sdk.addType({ description: 'Collection', schemaList: [SchemaPart.Uint64] })
    await sdk.addType({ description: 'Addresses', schemaList: [SchemaPart.Address] })
    await sdk.addType({ description: 'Trade', schemaList: [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64] })
    dao = await deployAkitaDAO({ fixture, sender: owner, signer: testAccount.signer, apps: { metaMerkles: appClient.appId } })
    asset = (await algorand.send.assetCreate({ sender: owner, total: 100n, decimals: 0 })).assetId
  })

  async function chainNow(): Promise<bigint> {
    const { algorand } = fixture.context
    const status = await algorand.client.algod.status().do()
    const block = await algorand.client.algod.block(status.lastRound).do()
    return BigInt(block.block.header.timestamp)
  }

  async function createSwap(startingId = 0n) {
    const { algorand, testAccount } = fixture.context
    // Each swap deploys an app and funds a partner from the owner; keep the owner topped up.
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(100_000_000))
    let swap: HyperSwapSDK
    if (startingId === 0n) {
      swap = await deployHyperSwap({ fixture, sender: owner, signer: testAccount.signer, args: { version: 'test', akitaDao: dao.appId } })
    } else {
      const defaults = { defaultSender: owner, defaultSigner: testAccount.signer }
      const { appClient } = await algorand.client.getTypedAppFactory(MockHyperSwapFactory, defaults).send.create.create({
        args: { version: 'test', akitaDao: dao.appId }, extraProgramPages: 3,
      })
      await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
      await appClient.send.setOfferCursor({ args: { id: startingId } })
      swap = new HyperSwapSDK({ algorand, factoryParams: { appId: appClient.appId, ...defaults } })
    }
    const partner = algorand.account.random()
    await algorand.account.ensureFunded(partner.addr, owner, microAlgo(5_000_000))
    const to = partner.addr.toString()
    const participantList = [owner, to]
    const leafList = [
      { from: owner, receiver: to, asset: 0n, amount: 10_000n },
      { from: to, receiver: owner, asset: 0n, amount: 20_000n },
    ]
    const participants = hyperSwapParticipantTree(participantList)
    const trades = hyperSwapTradeTree(leafList)
    const expiration = (await chainNow()) + 3600n
    /** Terms a careful participant derives from the full lists, never from the chain. */
    const terms = async (id: bigint) =>
      validateOffer({ id, offer: await swap.getOffer({ id }), leaves: leafList, participants: participantList })
    return { swap, partner, to, participants, trades, expiration, leafList, participantList, terms }
  }

  test.each([0n, 127n, 128n, 0x0123456789abcdefn, 0xfedcba9876543210n, 0xfffffffffffffffdn])(
    'HyperSwap completes repeated-root offers and refunds every deposit (first ID: %s)', async (startingId) => {
      const { algorand } = fixture.context
      const { swap, partner, to, participants, trades, expiration, terms } = await createSwap(startingId)
      const ids = [startingId, startingId + 1n]
      const before = await algorand.account.getInformation(sdk.client.appAddress)
      // Two concurrent offers may use identical roots; their Meta names must remain distinct.
      for (const id of ids) {
        await swap.offer({ root: trades.root, leaves: 2, participantsRoot: participants.root, participantsLeaves: 2, expiration })
        expect((await swap.getOffer({ id })).state).toBe(10)
      }
      const funded = await algorand.account.getInformation(swap.client.appAddress)
      expect(funded.balance.microAlgos).toBe(funded.minBalance.microAlgos)
      const registryOwner = swap.client.appAddress.toString()
      for (const id of ids) {
        expect((await sdk.client.appClient.getBoxValue(hyperSwapRootBoxName(registryOwner, id, false))).slice(0, 32)).toEqual(trades.root)
        expect((await sdk.client.appClient.getBoxValue(hyperSwapRootBoxName(registryOwner, id, true))).slice(0, 32)).toEqual(participants.root)
      }
      for (const id of ids) {
        await expect(swap.client.send.cleanupParticipant({ args: { id, participant: owner }, extraFee: microAlgo(10_000) }))
          .rejects.toThrow(new RegExp(errInvalidState))
        await swap.accept({ sender: partner.addr, signer: partner.signer, id, proof: participants.getProof(1), terms: await terms(id) })
        await expect(swap.escrow({ id, receiver: to, amount: 10_000n, proof: trades.getProof(1) }))
          .rejects.toThrow(new RegExp(errCantVerifyLeaf))
        await swap.escrow({ id, receiver: to, amount: 10_000n, proof: trades.getProof(0) })
        await swap.escrow({ sender: partner.addr, signer: partner.signer, id, receiver: owner, amount: 20_000n, proof: trades.getProof(1) })
        expect((await swap.getOffer({ id })).state).toBe(30)
        await swap.disburse({ id, receiverWallet: 0n, receiver: to, asset: 0n, amount: 10_000n })
        await swap.disburse({ sender: partner.addr, signer: partner.signer, id, receiverWallet: 0n, receiver: owner, asset: 0n, amount: 20_000n })
        expect((await swap.getOffer({ id })).state).toBe(40)
        await expect(swap.client.send.cleanupOffer({ args: { id }, extraFee: microAlgo(10_000) }))
          .rejects.toThrow(new RegExp(errParticipantsNotCleaned))
        for (const participant of [owner, to]) {
          await swap.client.send.cleanupParticipant({ args: { id, participant }, extraFee: microAlgo(10_000) })
        }
        await swap.client.send.cleanupOffer({ args: { id }, extraFee: microAlgo(10_000) })
        await expect(swap.client.state.box.offers.value(id)).rejects.toThrow('box not found')
        await expect(swap.client.state.box.offerRefunds.value(id)).rejects.toThrow('box not found')
      }
      const after = await algorand.account.getInformation(sdk.client.appAddress)
      expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
      expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos)
      const clean = await algorand.account.getInformation(swap.client.appAddress)
      expect(clean.balance.microAlgos).toBe(100_000n)
      expect(clean.minBalance.microAlgos).toBe(100_000n)
    })

  test.each([false, true])('HyperSwap SDK escrows ASA with exact opt-in funding (receiver already opted in: %s)', async (alreadyOptedIn) => {
    const { algorand } = fixture.context
    const { swap, partner, to, expiration } = await createSwap()
    const participants = MerkleTree.of([[decodeAddress(owner).publicKey]], [SchemaPart.Address])
    const trades = MerkleTree.of([[decodeAddress(owner).publicKey, decodeAddress(to).publicKey, asset, 10n]],
      [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64])
    const optInReceiver = () => algorand.send.assetOptIn({ sender: partner.addr, signer: partner.signer, assetId: asset })
    if (alreadyOptedIn) await optInReceiver()
    await swap.offer({ root: trades.root, leaves: 1, participantsRoot: participants.root, participantsLeaves: 1, expiration })
    expect((await swap.getOffer({ id: 0n })).state).toBe(20)
    const beforeEscrow = await algorand.account.getInformation(swap.client.appAddress)
    await expect(swap.escrow({ id: 0n, receiver: to, asset, amount: 10n, isAsa: true, proof: [new Uint8Array(32)] }))
      .rejects.toThrow(new RegExp(errCantVerifyLeaf))
    const rejected = await algorand.account.getInformation(swap.client.appAddress)
    expect(rejected.balance.microAlgos).toBe(beforeEscrow.balance.microAlgos)
    expect(rejected.minBalance.microAlgos).toBe(beforeEscrow.minBalance.microAlgos)
    expect(rejected.assets?.some(holding => holding.assetId === asset) ?? false).toBe(false)
    await swap.escrow({ id: 0n, receiver: to, asset, amount: 10n, isAsa: true, proof: [] })
    if (!alreadyOptedIn) await optInReceiver()
    await swap.disburse({ id: 0n, receiverWallet: 0n, receiver: to, asset, amount: 10n })
    const recipient = await algorand.account.getInformation(to)
    expect(recipient.assets?.find(holding => holding.assetId === asset)?.amount).toBe(10n)
    await swap.client.send.cleanupParticipant({ args: { id: 0n, participant: owner }, extraFee: microAlgo(10_000) })
    await swap.client.send.cleanupOffer({ args: { id: 0n }, extraFee: microAlgo(10_000) })
    // Only the base account and its explicit ASA opt-in remain funded.
    const clean = await algorand.account.getInformation(swap.client.appAddress)
    expect(clean.balance.microAlgos).toBe(200_000n)
    expect(clean.minBalance.microAlgos).toBe(200_000n)
  })

  test('HyperSwap preserves expired escrow until cancellation and withdrawal', async () => {
    const { algorand } = fixture.context
    const { swap, partner, to, participants, trades, expiration, terms } = await createSwap()
    await swap.offer({ root: trades.root, leaves: 2, participantsRoot: participants.root, participantsLeaves: 2, expiration })
    await swap.accept({ sender: partner.addr, signer: partner.signer, id: 0n, proof: participants.getProof(1), terms: await terms(0n) })
    await swap.escrow({ id: 0n, receiver: to, amount: 10_000n, proof: trades.getProof(0) })
    await new TimeWarp(algorand).timeWarp(3601n)
    await expect(swap.client.send.cleanupParticipant({ args: { id: 0n, participant: owner }, extraFee: microAlgo(10_000) }))
      .rejects.toThrow(new RegExp(errInvalidState))
    await expect(swap.client.send.cleanupOffer({ args: { id: 0n }, extraFee: microAlgo(10_000) }))
      .rejects.toThrow(new RegExp(errInvalidState))
    await swap.cancel({ id: 0n, proof: participants.getProof(0) })
    expect((await swap.getOffer({ id: 0n })).state).toBe(50)
    await swap.withdraw({ id: 0n, receiver: to, asset: 0n, amount: 10_000n, proof: trades.getProof(0) })
    expect((await swap.getOffer({ id: 0n })).state).toBe(60)
    for (const participant of [to, owner]) {
      await swap.client.send.cleanupParticipant({ args: { id: 0n, participant }, extraFee: microAlgo(10_000) })
    }
    await swap.client.send.cleanupOffer({ args: { id: 0n }, extraFee: microAlgo(10_000) })
    expect((await algorand.account.getInformation(swap.client.appAddress)).balance.microAlgos).toBe(100_000n)
  })

  const balanceOf = async (address: string) =>
    (await fixture.context.algorand.account.getInformation(address)).balance.microAlgos

  async function fundedSwap() {
    const created = await createSwap()
    const { swap, partner, to, participants, trades, expiration, terms } = created
    await swap.offer({ root: trades.root, leaves: 2, participantsRoot: participants.root, participantsLeaves: 2, expiration })
    await swap.accept({ sender: partner.addr, signer: partner.signer, id: 0n, proof: participants.getProof(1), terms: await terms(0n) })
    await swap.escrow({ id: 0n, receiver: to, amount: 10_000n, proof: trades.getProof(0) })
    await swap.escrow({ sender: partner.addr, signer: partner.signer, id: 0n, receiver: owner, amount: 20_000n, proof: trades.getProof(1) })
    expect((await swap.getOffer({ id: 0n })).state).toBe(30)
    return created
  }

  async function cleanup(swap: HyperSwapSDK, participants: string[]) {
    for (const participant of participants) {
      await swap.client.send.cleanupParticipant({ args: { id: 0n, participant }, extraFee: microAlgo(10_000) })
    }
    await swap.client.send.cleanupOffer({ args: { id: 0n }, extraFee: microAlgo(10_000) })
    expect(await balanceOf(swap.client.appAddress.toString())).toBe(100_000n)
  }

  test('HS-01: anyone completes a funded swap; a party that withholds its leaf cannot cancel and withdraw it', async () => {
    const { algorand } = fixture.context
    const { swap, partner, to } = await fundedSwap()
    // The owner releases its own leaf through the legacy selector; the partner withholds its leaf.
    await swap.disburse({ id: 0n, receiverWallet: 0n, receiver: to, asset: 0n, amount: 10_000n })
    await new TimeWarp(algorand).timeWarp(3601n)
    // After a partial disbursal the swap can no longer be cancelled, so the partner cannot take its leaf back.
    await expect(swap.cancel({ sender: partner.addr, signer: partner.signer, id: 0n, proof: [] }))
      .rejects.toThrow(new RegExp(errInvalidState))
    await expect(swap.withdraw({ sender: partner.addr, signer: partner.signer, id: 0n, receiver: owner, asset: 0n, amount: 20_000n, proof: [] }))
      .rejects.toThrow(new RegExp(errInvalidState))
    // An unrelated keeper completes the swap; the owner receives exactly the partner's principal.
    const keeper = algorand.account.random()
    await algorand.account.ensureFunded(keeper.addr, owner, microAlgo(1_000_000))
    const ownerBefore = await balanceOf(owner)
    await swap.disburseFrom({ sender: keeper.addr, signer: keeper.signer, id: 0n, from: to, receiverWallet: 0n, receiver: owner, asset: 0n, amount: 20_000n })
    expect((await swap.getOffer({ id: 0n })).state).toBe(40)
    expect(await balanceOf(owner) - ownerBefore).toBe(20_000n)
    await cleanup(swap, [owner, to])
  })

  test('HS-01: an unknown leaf cannot be disbursed, and disburseAll settles every leaf atomically', async () => {
    const { algorand } = fixture.context
    const { swap, to, leafList } = await fundedSwap()
    const keeper = algorand.account.random()
    await algorand.account.ensureFunded(keeper.addr, owner, microAlgo(1_000_000))
    const asKeeper = { sender: keeper.addr, signer: keeper.signer }
    // A leaf that was never escrowed (wrong amount) is refused, and the group rolls back as one unit.
    await expect(swap.disburseAll({ ...asKeeper, id: 0n, leaves: [leafList[0], { ...leafList[1], amount: 20_001n }] }))
      .rejects.toThrow()
    expect((await swap.getOffer({ id: 0n })).escrowed).toBe(2n)
    await swap.disburseAll({ ...asKeeper, id: 0n, leaves: leafList })
    expect((await swap.getOffer({ id: 0n })).state).toBe(40)
    await cleanup(swap, [owner, to])
  })

  test('HS-01: an expired, fully funded swap with nothing disbursed unwinds completely', async () => {
    const { algorand } = fixture.context
    const { swap, partner, to } = await fundedSwap()
    await new TimeWarp(algorand).timeWarp(3601n)
    // Cancel and withdraw no longer need proofs: the participant and hash boxes authenticate them (HS-04).
    await swap.cancel({ sender: partner.addr, signer: partner.signer, id: 0n, proof: [] })
    expect((await swap.getOffer({ id: 0n })).state).toBe(50)
    await expect(swap.disburseFrom({ id: 0n, from: to, receiverWallet: 0n, receiver: owner, asset: 0n, amount: 20_000n }))
      .rejects.toThrow(new RegExp(errInvalidState))
    await swap.withdraw({ id: 0n, receiver: to, asset: 0n, amount: 10_000n, proof: [] })
    await swap.withdraw({ sender: partner.addr, signer: partner.signer, id: 0n, receiver: owner, asset: 0n, amount: 20_000n, proof: [] })
    expect((await swap.getOffer({ id: 0n })).state).toBe(60)
    await cleanup(swap, [owner, to])
  })

  test('HS-02: an offer that under-declares its leaves cannot be accepted', async () => {
    const { swap, partner, participants, trades, expiration, leafList, participantList } = await createSwap()
    // Two real leaves, but the offeror declares one so a single counterparty escrow would flip to DISBURSING.
    await swap.offer({ root: trades.root, leaves: 1, participantsRoot: participants.root, participantsLeaves: 2, expiration })
    const offer = await swap.getOffer({ id: 0n })
    expect(await swap.offerTerms({ id: 0n })).toEqual(computeOfferTerms(0n, offer))
    expect(() => validateOffer({ id: 0n, offer, leaves: leafList, participants: participantList })).toThrow(/declares 1 leaves/)
    // Terms derived from the real list do not match what the offer committed to.
    const honest = computeOfferTerms(0n, { ...offer, leaves: BigInt(leafList.length) })
    await expect(swap.accept({ sender: partner.addr, signer: partner.signer, id: 0n, proof: participants.getProof(1), terms: honest }))
      .rejects.toThrow(new RegExp(errTermsMismatch))
    // The partner never joins, so it can never be made to fund the offer.
    await expect(swap.escrow({ sender: partner.addr, signer: partner.signer, id: 0n, receiver: owner, amount: 20_000n, proof: trades.getProof(1) }))
      .rejects.toThrow(new RegExp(errInvalidState))
  })

  test('HS-02: offers expire at most 30 days out', async () => {
    const { swap, participants, trades } = await createSwap()
    const now = await chainNow()
    const offer = (expiration: bigint) =>
      swap.offer({ root: trades.root, leaves: 2, participantsRoot: participants.root, participantsLeaves: 2, expiration })
    await expect(offer(now + HYPER_SWAP_MAX_OFFER_DURATION + 100n)).rejects.toThrow(new RegExp(errOfferTooLong))
    await offer(now + HYPER_SWAP_MAX_OFFER_DURATION - 100n)
    expect((await swap.getOffer({ id: 0n })).state).toBe(10)
  })

  test('HS-03: escrowed principal must come from the leaf funder, never a sponsor or a clawback', async () => {
    const { algorand, testAccount } = fixture.context
    const { swap, to } = await createSwap()
    const { assetId: clawable } = await algorand.send.assetCreate({ sender: owner, total: 100n, decimals: 0, clawback: owner })
    const victim = algorand.account.random()
    await algorand.account.ensureFunded(victim.addr, owner, microAlgo(1_000_000))
    await algorand.send.assetOptIn({ sender: victim.addr, signer: victim.signer, assetId: clawable })
    await algorand.send.assetTransfer({ sender: owner, receiver: victim.addr, assetId: clawable, amount: 10n })
    // A single-participant offer is escrowing immediately.
    const participantList = [owner]
    const leafList = [
      { from: owner, receiver: to, asset: 0n, amount: 10_000n },
      { from: owner, receiver: to, asset: clawable, amount: 5n },
    ]
    const participants = hyperSwapParticipantTree(participantList)
    const trades = hyperSwapTradeTree(leafList)
    await swap.offer({ root: trades.root, leaves: 2, participantsRoot: participants.root, participantsLeaves: 1, expiration: (await chainNow()) + 3600n })
    await swap.optIn({ asset: clawable })
    const { hashes } = await swap.mbr()
    const app = swap.client.appAddress
    // ALGO principal paid by a sponsor
    const sponsor = algorand.account.random()
    await algorand.account.ensureFunded(sponsor.addr, owner, microAlgo(1_000_000))
    const sponsored = await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: app, amount: microAlgo(10_000n + hashes) })
    await expect(swap.client.send.escrow({
      args: { payment: { txn: sponsored, signer: sponsor.signer }, id: 0n, receiver: to, amount: 10_000n, proof: trades.getProof(0) },
      extraFee: microAlgo(5_000),
    })).rejects.toThrow(new RegExp(errInvalidPaymentSender))
    // ASA principal clawed back from a third party by the participant
    const mbrPayment = await algorand.createTransaction.payment({ sender: owner, receiver: app, amount: microAlgo(hashes + 100_000n) })
    const clawback = await algorand.createTransaction.assetTransfer({
      sender: owner, receiver: app, assetId: clawable, amount: 5n, clawbackTarget: victim.addr,
    })
    await expect(swap.client.send.escrowAsa({
      args: {
        mbrPayment: { txn: mbrPayment, signer: testAccount.signer },
        assetXfer: { txn: clawback, signer: testAccount.signer },
        id: 0n, receiver: to, asset: clawable, amount: 5n, proof: trades.getProof(1),
      },
      extraFee: microAlgo(5_000),
    })).rejects.toThrow(new RegExp(errClawbackForbidden))
    // The funder's own ALGO is accepted.
    await swap.escrow({ id: 0n, receiver: to, amount: 10_000n, proof: trades.getProof(0) })
    expect((await swap.getOffer({ id: 0n })).escrowed).toBe(1n)
  })
})
