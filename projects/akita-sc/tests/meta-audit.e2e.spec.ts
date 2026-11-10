import { deployAkitaDAO } from './fixtures/dao'
import { metadataDataKey, metadataValueLimit } from '../../akita-sdk/src/meta'
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import { ABIType } from 'algosdk'
import { MetaMerklesSDK } from '../../akita-sdk/src/meta-merkles'
import { MetaMerklesFactory } from '../../akita-sdk/src/generated/MetaMerklesClient'
import {
  MetaFactory,
  MetaSDK,
  MerkleTree,
  SchemaPart,
  encodeLeaf,
  hashLeaf,
  metadataBoxName,
  metadataStorageCost,
  schemaToAbiType,
} from '../../akita-sdk/src/meta'
import { errInvalidRecordPayment, errInvalidSchemaPart, errRecordRevisionMismatch } from '../smart_contracts/meta/errors'

// Regression coverage for the remediated audit findings.
describe('Meta audit reproductions (LocalNet)', () => {
  const fixture = algorandFixture()
  let sdk: MetaSDK
  let owner: string

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(500_000_000))
    const dao = await deployAkitaDAO({ fixture, sender: testAccount.toString(), signer: testAccount.signer, apps: {} })
    const factory = algorand.client.getTypedAppFactory(MetaFactory, {
      defaultSender: owner,
      defaultSigner: testAccount.signer,
    })
    const { appClient } = await factory.send.create.create({ args: { version: 'test', akitaDao: dao.appId } })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    sdk = new MetaSDK({
      algorand,
      readerAccount: owner,
      factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: testAccount.signer },
    })
  })

  test('ALG-01: deletion releases the complete record and recreation starts a fresh revision', async () => {
    const key = metadataDataKey('audit-aba', 'value')
    const before = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    const first = await sdk.setRecord({ key, data: new Uint8Array([1]), expectedRevision: 0n })
    await sdk.removeRecord({ key, expectedRevision: first.return! })
    const next = await sdk.setRecord({ key, data: new Uint8Array(1025).fill(4), expectedRevision: 0n })
    expect(first.return).toBe(1n)
    expect(next.return).toBe(1n)
    const updated = await sdk.setRecord({ key, data: new Uint8Array(1025), expectedRevision: next.return! })
    expect(updated.return).toBe(2n)
    await expect(sdk.setRecord({ key, data: new Uint8Array(1025), expectedRevision: next.return! })).rejects.toThrow(new RegExp(errRecordRevisionMismatch))
    await sdk.removeRecord({ key, expectedRevision: updated.return! })
    const after = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
    expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos)
  })

  test('OBS-01: shared rooted-data replacement returns the previous deposit', async () => {
    await sdk.addType({ description: 'Audit type', schemaList: [] })
    const name = 'audit-mbr'
    const key = 'value'
    await sdk.addRoot({ name, root: new Uint8Array(32), type: 0n })
    const before = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    const value = 'same-size-value'
    const cost = await sdk.dataCosts({ name, key, value })
    await sdk.addData({ name, key, value })
    await sdk.addData({ name, key, value })
    await sdk.deleteData({ name, key })
    const after = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    // Replacement refunds its previous deposit, and deletion returns the current deposit.
    expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos)
    expect(after.balance.microAlgos - before.balance.microAlgos).toBe(0n)
    await sdk.deleteRoot({ name })
  })

  test('ALG-02: ARC-4 string boundaries reject a proof for a substituted tuple', async () => {
    const schema = [SchemaPart.String, SchemaPart.String]
    const intended = ['alice', 'admin']
    const substituted = ['alicead', 'min']
    const tree = MerkleTree.of([intended], schema)
    const type = (await sdk.getState()).typesId
    await sdk.addType({ description: 'Audit dynamic tuple', schemaList: schema })
    const registered = await sdk.getType({ id: type })
    expect(registered!.schema).toBe('(string,string)')
    expect(encodeLeaf(intended, schema)).toEqual(ABIType.from(registered!.schema).encode(intended))
    const name = 'audit-tuple'
    await sdk.addRoot({ name, root: tree.root, type })
    expect(await sdk.verify({ address: owner, name, type,
      leaf: hashLeaf(encodeLeaf(intended, schema)), proof: tree.getProof(0) })).toBe(true)
    expect(
      await sdk.verify({
        address: owner,
        name,
        type,
        leaf: hashLeaf(encodeLeaf(substituted, schema)),
        proof: tree.getProof(0),
      }),
    ).toBe(false)
    await sdk.deleteRoot({ name })
  })

  test('every registered schema part declares the same ARC-4 tuple used by the SDK', async () => {
    const uintParts = [SchemaPart.Uint8, SchemaPart.Uint16, SchemaPart.Uint32, SchemaPart.Uint64,
      SchemaPart.Uint128, SchemaPart.Uint256, SchemaPart.Uint512]
    const byteParts = [SchemaPart.Bytes4, SchemaPart.Bytes8, SchemaPart.Bytes16, SchemaPart.Bytes32,
      SchemaPart.Bytes64, SchemaPart.Bytes128, SchemaPart.Bytes256, SchemaPart.Bytes512]
    const schema = [...uintParts, ...byteParts, SchemaPart.String, SchemaPart.Address]
    const values = [...[8, 16, 32, 64, 128, 256, 512].map(bits => (1n << BigInt(bits)) - 1n),
      ...[4, 8, 16, 32, 64, 128, 256, 512].map(size => new Uint8Array(size).fill(7)), 'é🎨', owner]
    const type = (await sdk.getState()).typesId
    await sdk.addType({ description: 'All supported ARC-4 fields', schemaList: schema })
    const registered = await sdk.getType({ id: type })
    expect(registered!.schema).toBe(schemaToAbiType(schema))
    expect(encodeLeaf(values, schema)).toEqual(ABIType.from(registered!.schema).encode(values))
  })

  test('unknown schema parts reject registration and roll back its payment', async () => {
    const before = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    const type = (await sdk.getState()).typesId
    await expect(sdk.client.send.addType({ args: {
      payment: fixture.algorand.createTransaction.payment({
        sender: owner, receiver: sdk.client.appAddress, amount: microAlgo(100_000_000),
      }),
      description: 'Invalid schema', schemaList: [SchemaPart.Uint64, 255],
    } })).rejects.toThrow(new RegExp(errInvalidSchemaPart))
    expect((await sdk.getState()).typesId).toBe(type)
    await expect(sdk.getType({ id: type })).rejects.toThrow(/box not found/)
    const after = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
    expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos)
  })

  test('ALG-03: response loss after an atomic write leaves a published value and no draft', async () => {
    const namespace = 'audit-rpc'
    const key = 'data'
    const args = { key: metadataDataKey(namespace, key), data: new Uint8Array(metadataValueLimit(metadataDataKey(namespace, key))).fill(7), expectedRevision: 0n }
    const before = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    const original = sdk.client.send.setRecord.bind(sdk.client.send)
    const networkError = new Error('Audit injected response loss after on-chain confirmation')
    const spy = vi.spyOn(sdk.client.send, 'setRecord').mockImplementationOnce(async (params) => {
      await original(params)
      throw networkError
    })
    try {
      await expect(sdk.setRecord(args)).rejects.toBe(networkError)
    } finally {
      spy.mockRestore()
    }
    const published = await sdk.readRecord(owner, metadataDataKey(namespace, key))
    expect(published.exists).toBe(true)
    expect(published.data).toEqual(args.data)
    const after = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    expect(after.balance.microAlgos - before.balance.microAlgos).toBe(
      metadataStorageCost(args.data.length, metadataDataKey(namespace, key)),
    )
    expect(after.minBalance.microAlgos - before.minBalance.microAlgos).toBe(
      metadataStorageCost(args.data.length, metadataDataKey(namespace, key)),
    )
    const replacement = await sdk.setRecord({ ...args, expectedRevision: published.revision })
    await sdk.removeRecord({ key: metadataDataKey(namespace, key), expectedRevision: replacement.return! })
    expect((await fixture.algorand.account.getInformation(sdk.client.appAddress)).balance.microAlgos).toBe(
      before.balance.microAlgos,
    )
  })

  test('ALG-03: an invalid deposit rolls back the entire write', async () => {
    const namespace = 'audit-rollback'
    const key = 'data'
    const first = await sdk.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array([1]), expectedRevision: 0n })
    const before = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    const original = sdk.client.send.setRecord.bind(sdk.client.send)
    const spy = vi.spyOn(sdk.client.send, 'setRecord').mockImplementationOnce((params) => original({
      ...params, args: { ...(params!.args as any), payment: fixture.algorand.createTransaction.payment({
        sender: owner, receiver: sdk.client.appAddress, amount: microAlgo(0),
      }) },
    }))
    try {
      await expect(
        sdk.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array(metadataValueLimit(metadataDataKey(namespace, key))), expectedRevision: first.return! }),
      ).rejects.toThrow(new RegExp(errInvalidRecordPayment))
    } finally {
      spy.mockRestore()
    }
    expect(await sdk.readRecord(owner, metadataDataKey(namespace, key))).toEqual({
      exists: true,
      revision: first.return,
      data: new Uint8Array([1]),
    })
    const after = await fixture.algorand.account.getInformation(sdk.client.appAddress)
    expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
    expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos)
    const retry = await sdk.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array(metadataValueLimit(metadataDataKey(namespace, key))), expectedRevision: first.return! })
    await sdk.removeRecord({ key: metadataDataKey(namespace, key), expectedRevision: retry.return! })
  })

  test('the retained SDK can manage roots and metadata on the frozen MetaMerkles program', async () => {
    const { algorand, testAccount } = fixture.context
    const factory = algorand.client.getTypedAppFactory(MetaMerklesFactory, {
      defaultSender: owner,
      defaultSigner: testAccount.signer,
    })
    const { appClient } = await factory.send.create.create({ args: {} })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    const legacy = new MetaMerklesSDK({
      algorand,
      readerAccount: owner,
      factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: testAccount.signer },
    })
    await legacy.addType({ description: 'Legacy compatibility', schemaList: [SchemaPart.Uint64] })
    const before = await algorand.account.getInformation(appClient.appAddress)
    const tree = MerkleTree.of([[1n], [2n], [3n]], [SchemaPart.Uint64])
    const name = 'audit-legacy'
    await legacy.addRoot({ name, root: tree.root, type: 0n })
    await legacy.addData({ name, key: 'label', value: 'Legacy value' })
    expect(await legacy.getRoot({ address: owner, name })).toEqual(tree.root)
    expect(await legacy.getData({ address: owner, name, key: 'label' })).toBe('Legacy value')
    expect(await legacy.verifiedReadFromTree({ address: owner, name, tree, index: 1, type: 0n, key: 'label' })).toBe(
      'Legacy value',
    )
    await legacy.deleteData({ name, key: 'label' })
    await legacy.deleteRoot({ name })
    expect((await algorand.account.getInformation(appClient.appAddress)).balance.microAlgos).toBe(
      before.balance.microAlgos,
    )
  })
})
