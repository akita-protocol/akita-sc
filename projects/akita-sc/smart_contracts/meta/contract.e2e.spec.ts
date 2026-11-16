import { deployAkitaDAO } from '../../tests/fixtures/dao'
import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { MerkleTreeType, MetaSDK, SchemaPart, bytesToHex, createUint64Tree } from 'akita-sdk/meta'
import algosdk from 'algosdk'
import { installAccessListResourcePopulator } from '../../../akita-sdk/src/simulate/access-list'
import { MetaFactory } from '../artifacts/meta/MetaClient'
import {
  errFailedToVerifyInclusion,
  errNameTaken,
  errNameTooLong,
  errNoName,
  errNoRootForData,
  errNoTreeType,
  errReservedKeyPrefix,
} from './errors'
import { errInvalidName } from './errors'
import { errInvalidPaymentAmount } from '../utils/errors'

algokit.Config.configure({
  debug: true,
  populateAppCallResources: true,
})
installAccessListResourcePopulator()

// Generate unique names for each test (max 31 bytes for root names)
const randomSuffix = () => Math.random().toString(36).slice(2, 8)
const uniqueName = (base: string) => `${base}-${randomSuffix()}`

describe('Meta SDK Tests', () => {
  const fixture = algorandFixture()

  let deployer: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount
  let otherAccount: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount
  let sdk: MetaSDK
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.algorand
    const { testAccount } = fixture.context
    deployer = testAccount

    // Create another account for testing scenarios
    otherAccount = algorand.account.random()

    // Fund accounts
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (1000).algos())
    await algorand.account.ensureFunded(otherAccount.addr, dispenser.addr, (100).algos())

    // Create the Meta contract
    const dao = await deployAkitaDAO({ fixture, sender: testAccount.toString(), signer: testAccount.signer, apps: {} })
    const factory = algorand.client.getTypedAppFactory(MetaFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })

    const results = await factory.send.create.create({
      args: { version: 'test', akitaDao: dao.appId },
    })

    // Initialize the SDK
    sdk = new MetaSDK({
      factoryParams: {
        appId: results.appClient.appId,
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      },
      algorand,
    })

    // Fund the contract
    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: sdk.client.appAddress,
      amount: algokit.microAlgo(500_000_000n),
    })

    console.log('Meta App ID:', sdk.appId)
    console.log('Meta Address:', sdk.client.appAddress.toString())

    // Create initial tree types for all tests to use
    await sdk.addType({
      description: 'Unspecified - no schema',
      schemaList: [],
    })

    await sdk.addType({
      description: 'Collection - uint64',
      schemaList: [SchemaPart.Uint64],
    })

    await sdk.addType({
      description: 'Trait - uint64',
      schemaList: [SchemaPart.Uint64],
    })

    await sdk.addType({
      description: 'Trade - address,address,uint64,uint64',
      schemaList: [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64],
    })
  })

  beforeEach(async () => {
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (100).algos())
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // SDK READ METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('SDK Read Methods', () => {
    test('getState returns correct global state', async () => {
      const state = await sdk.getState()

      expect(state.typesId).toBeDefined()
      expect(typeof state.typesId).toBe('bigint')
    })

    test('rootCosts returns valid costs', async () => {
      const costs = await sdk.rootCosts({ name: 'test-root' })

      expect(costs).toBeGreaterThan(0n)
    })

    test.each(['', '500', 'é🎨'])('dataCosts quotes native UTF-8 payload bytes for %j', async (value) => {
      const costs = await sdk.dataCosts({
        name: 'test-root',
        key: 'royalty',
        value,
      })

      // Box name: m + owner[32] + namespace length[1] + name[9] + key[7].
      // Stored value: revision/ARC-4 header[12] + UTF-8 data, without its argument prefix.
      expect(costs).toBe(2500n + 400n * BigInt(50 + 12 + new TextEncoder().encode(value).length))
    })

    test('dataCosts increases with longer values', async () => {
      const shortCosts = await sdk.dataCosts({
        name: 'a',
        key: 'b',
        value: 'c',
      })

      const longCosts = await sdk.dataCosts({
        name: 'longer-name',
        key: 'longer-key',
        value: 'this is a much longer value string',
      })

      expect(longCosts).toBeGreaterThan(shortCosts)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // TREE TYPES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Tree Types', () => {
    test('addType creates new tree types', async () => {
      const initialState = await sdk.getState()
      const initialTypesId = initialState.typesId

      await sdk.addType({
        description: 'Test Unspecified Type',
        schemaList: [],
      })

      const newState = await sdk.getState()
      expect(newState.typesId).toBe(initialTypesId + 1n)
      expect((await sdk.getType({ id: initialTypesId }))!.schema).toBe('()')
    })

    test('addType with uint64 schema', async () => {
      await sdk.addType({
        description: 'Collection - uint64 asset IDs',
        schemaList: [SchemaPart.Uint64],
      })

      const state = await sdk.getState()
      expect(state.typesId).toBeGreaterThan(0n)
      expect((await sdk.getType({ id: state.typesId - 1n }))!.schema).toBe('(uint64)')
    })

    test('addType with complex schema', async () => {
      await sdk.addType({
        description: 'Trade - address,address,uint64,uint64',
        schemaList: [SchemaPart.Address, SchemaPart.Address, SchemaPart.Uint64, SchemaPart.Uint64],
      })

      const types = await sdk.getTypes()
      expect(types.size).toBeGreaterThan(0)
      const state = await sdk.getState()
      expect(types.get(state.typesId - 1n)!.schema).toBe('(address,address,uint64,uint64)')
    })

    test('getType retrieves created type', async () => {
      const state = await sdk.getState()

      await sdk.addType({
        description: 'Retrievable Type',
        schemaList: [SchemaPart.Uint64],
      })

      const typeInfo = await sdk.getType({ id: state.typesId })
      expect(typeInfo).toBeDefined()
      expect(typeInfo!.description).toBe('Retrievable Type')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // MERKLE ROOTS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Merkle Roots', () => {
    // Use collection type (id 1) created in beforeAll
    const collectionTypeId = 1n

    test('addRoot creates merkle root', async () => {
      const tree = createUint64Tree([1n, 2n, 3n])
      const name = uniqueName('root-create')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: collectionTypeId,
      })

      const hasRoot = await sdk.hasRoot({
        address: deployer.addr.toString(),
        name,
      })
      expect(hasRoot).toBe(true)
    })

    test('addRoot submits Access resources instead of legacy box references', async () => {
      const tree = createUint64Tree([4n, 5n, 6n])
      const name = uniqueName('root-access')
      const cost = await sdk.rootCosts({ name })
      const payment = await algorand.createTransaction.payment({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: sdk.client.appAddress,
        amount: algokit.microAlgo(cost),
      })

      const result = await sdk.client.send.addRoot({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { payment, name, root: tree.root, type: collectionTypeId },
      })
      const appCall = result.transactions.find((transaction) => transaction.applicationCall)?.applicationCall

      expect(appCall?.access?.length).toBeGreaterThan(0)
      expect(appCall?.accounts ?? []).toHaveLength(0)
      expect(appCall?.foreignApps ?? []).toHaveLength(0)
      expect(appCall?.foreignAssets ?? []).toHaveLength(0)
      expect(appCall?.boxes ?? []).toHaveLength(0)
    })

    test('addRootFromTree convenience method works', async () => {
      const tree = createUint64Tree([10n, 20n, 30n])
      const name = uniqueName('root-from-tree')

      await sdk.addRootFromTree({
        name,
        tree,
        type: collectionTypeId,
      })

      const storedRoot = await sdk.getRoot({
        address: deployer.addr.toString(),
        name,
      })

      expect(storedRoot).toBeDefined()
      expect(bytesToHex(storedRoot!)).toBe(tree.rootHex)
    })

    test('getRoot returns stored root', async () => {
      const tree = createUint64Tree([100n, 200n])
      const name = uniqueName('root-get')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: collectionTypeId,
      })

      const root = await sdk.getRoot({
        address: deployer.addr.toString(),
        name,
      })

      expect(root).toBeDefined()
      expect(root!.length).toBe(32)
    })

    test('hasRoot returns false for non-existent root', async () => {
      const hasRoot = await sdk.hasRoot({
        address: deployer.addr.toString(),
        name: uniqueName('non-existent'),
      })

      expect(hasRoot).toBe(false)
    })

    test('addRoot fails for duplicate name', async () => {
      const tree = createUint64Tree([1n, 2n])
      const name = uniqueName('duplicate')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: collectionTypeId,
      })

      // Try to add another root with same name
      await expect(
        sdk.addRoot({
          name,
          root: tree.root,
          type: collectionTypeId,
        }),
      ).rejects.toThrow(errNameTaken)
    })

    test('addRoot fails for non-existent type', async () => {
      const tree = createUint64Tree([1n])

      await expect(
        sdk.addRoot({
          name: uniqueName('bad-type'),
          root: tree.root,
          type: 9999n, // Non-existent type
        }),
      ).rejects.toThrow(errNoTreeType)
    })

    test('updateRoot modifies existing root', async () => {
      const tree1 = createUint64Tree([1n, 2n])
      const tree2 = createUint64Tree([3n, 4n])
      const name = uniqueName('update')

      await sdk.addRoot({
        name,
        root: tree1.root,
        type: collectionTypeId,
      })

      // Update the root
      await sdk.updateRoot({
        name,
        newRoot: tree2.root,
      })

      const storedRoot = await sdk.getRoot({
        address: deployer.addr.toString(),
        name,
      })

      expect(bytesToHex(storedRoot!)).toBe(tree2.rootHex)
    })

    test('updateRoot fails for non-existent root', async () => {
      const tree = createUint64Tree([1n])

      await expect(
        sdk.updateRoot({
          name: uniqueName('non-existent'),
          newRoot: tree.root,
        }),
      ).rejects.toThrow(errNoName)
    })

    test('deleteRoot removes root and returns MBR', async () => {
      const tree = createUint64Tree([1n, 2n])
      const name = uniqueName('delete')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: collectionTypeId,
      })

      // Verify it exists
      expect(
        await sdk.hasRoot({
          address: deployer.addr.toString(),
          name,
        }),
      ).toBe(true)

      // Delete it
      await sdk.deleteRoot({ name })

      // Verify it's gone
      expect(
        await sdk.hasRoot({
          address: deployer.addr.toString(),
          name,
        }),
      ).toBe(false)
    })

    test('deleteRoot fails for non-existent root', async () => {
      await expect(sdk.deleteRoot({ name: uniqueName('non-existent') })).rejects.toThrow(errNoName)
    })

    test('anyone can pay for a root and its data, and deleting them returns each deposit to whoever paid it', async () => {
      const PAYER_RECORD_MBR = 28_500n
      const sponsor = otherAccount
      const balance = async (who: TransactionSignerAccount) => (await algorand.account.getInformation(who.addr)).balance.microAlgos
      const paid = async (amount: bigint) => ({
        txn: await algorand.createTransaction.payment({ sender: sponsor.addr, receiver: sdk.client.appAddress, amount: algokit.microAlgo(amount) }),
        signer: sponsor.signer,
      })
      const tree = createUint64Tree([7n, 8n, 9n])
      const name = uniqueName('sponsored')
      const [key, value] = ['royalty', '5']
      const rootCost = await sdk.rootCosts({ name })
      const dataCost = await sdk.dataCosts({ name, key, value })
      // the deployer owns the root and its data; the other account pays for their storage
      const addRoot = async (amount: bigint) => sdk.client.send.addRoot({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { payment: await paid(amount), name, root: tree.root, type: collectionTypeId },
      })
      const addData = async (amount: bigint) => sdk.client.send.addData({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { payment: await paid(amount), name, key, value },
      })

      // a payer other than the owner is remembered, so the plain cost is not enough
      await expect(addRoot(rootCost)).rejects.toThrow(errInvalidPaymentAmount)
      let before = await balance(sponsor)
      await addRoot(rootCost + PAYER_RECORD_MBR)
      expect(before - (await balance(sponsor))).toBe(rootCost + PAYER_RECORD_MBR + 1_000n)
      expect(await sdk.hasRoot({ address: deployer.addr.toString(), name })).toBe(true)

      await expect(addData(dataCost)).rejects.toThrow(errInvalidPaymentAmount)
      before = await balance(sponsor)
      await addData(dataCost + PAYER_RECORD_MBR)
      expect(before - (await balance(sponsor))).toBe(dataCost + PAYER_RECORD_MBR + 1_000n)

      // the owner deletes both; each deposit and its payer record return to the sponsor
      const ownerBefore = await balance(deployer)
      before = await balance(sponsor)
      await sdk.deleteData({ name, key })
      expect((await balance(sponsor)) - before).toBe(dataCost + PAYER_RECORD_MBR)
      before = await balance(sponsor)
      await sdk.deleteRoot({ name })
      expect((await balance(sponsor)) - before).toBe(rootCost + PAYER_RECORD_MBR)
      expect(await balance(deployer)).toBeLessThan(ownerBefore)
      expect(await sdk.hasRoot({ address: deployer.addr.toString(), name })).toBe(false)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // METADATA
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Metadata', () => {
    // Use collection type (id 1) created in beforeAll
    const metadataTypeId = 1n

    test('addData stores metadata', async () => {
      const tree = createUint64Tree([1n, 2n, 3n])
      const name = uniqueName('meta-store')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: metadataTypeId,
      })

      await sdk.addData({
        name,
        key: 'royalty',
        value: '500',
      })

      // Read it back
      const value = await sdk.read({
        address: deployer.addr.toString(),
        name,
        key: 'royalty',
      })

      expect(value).toBe('500')
    })

    test('addData stores multiple keys', async () => {
      const tree = createUint64Tree([1n])
      const rootName = uniqueName('multi-key')

      await sdk.addRoot({
        name: rootName,
        root: tree.root,
        type: metadataTypeId,
      })

      await sdk.addData({ name: rootName, key: 'name', value: 'My Collection' })
      await sdk.addData({ name: rootName, key: 'creator', value: 'Alice' })
      await sdk.addData({ name: rootName, key: 'version', value: '1.0' })

      const nameValue = await sdk.read({
        address: deployer.addr.toString(),
        name: rootName,
        key: 'name',
      })
      const creator = await sdk.read({
        address: deployer.addr.toString(),
        name: rootName,
        key: 'creator',
      })
      const version = await sdk.read({
        address: deployer.addr.toString(),
        name: rootName,
        key: 'version',
      })

      expect(nameValue).toBe('My Collection')
      expect(creator).toBe('Alice')
      expect(version).toBe('1.0')
    })

    test('addData fails without root', async () => {
      await expect(
        sdk.addData({
          name: uniqueName('non-existent'),
          key: 'test',
          value: 'value',
        }),
      ).rejects.toThrow(errNoRootForData)
    })

    test('addData fails with reserved key prefix', async () => {
      const tree = createUint64Tree([1n])
      const name = uniqueName('reserved')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: metadataTypeId,
      })

      await expect(
        sdk.addData({
          name,
          key: 'l.forbidden',
          value: 'test',
        }),
      ).rejects.toThrow(errReservedKeyPrefix)
    })

    test('deleteData removes metadata', async () => {
      const tree = createUint64Tree([1n])
      const name = uniqueName('delete-data')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: metadataTypeId,
      })

      await sdk.addData({
        name,
        key: 'temp',
        value: 'temporary value',
      })

      // Verify it exists
      const value = await sdk.read({
        address: deployer.addr.toString(),
        name,
        key: 'temp',
      })
      expect(value).toBe('temporary value')

      // Delete it
      await sdk.deleteData({
        name,
        key: 'temp',
      })

      // After deletion, getData should return undefined (box doesn't exist)
      const deletedValue = await sdk.getData({
        address: deployer.addr.toString(),
        name,
        key: 'temp',
      })
      expect(deletedValue).toBeUndefined()
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // VERIFICATION
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Merkle Proof Verification', () => {
    // Use collection type (id 1) created in beforeAll
    const verifyTypeId = 1n
    const testTree = createUint64Tree([100n, 200n, 300n, 400n, 500n])
    let verifyRootName: string

    beforeAll(async () => {
      verifyRootName = uniqueName('verify-root')

      await sdk.addRoot({
        name: verifyRootName,
        root: testTree.root,
        type: verifyTypeId,
      })

      await sdk.addData({
        name: verifyRootName,
        key: 'royalty',
        value: '250',
      })
    })

    test('verify returns true for valid proof', async () => {
      const isValid = await sdk.verify({
        address: deployer.addr.toString(),
        name: verifyRootName,
        leaf: testTree.getLeafHash(0),
        proof: testTree.getProof(0),
        type: verifyTypeId,
      })

      expect(isValid).toBe(true)
    })

    test('verify returns true for all leaves', async () => {
      for (let i = 0; i < testTree.length; i++) {
        const isValid = await sdk.verify({
          address: deployer.addr.toString(),
          name: verifyRootName,
          leaf: testTree.getLeafHash(i),
          proof: testTree.getProof(i),
          type: verifyTypeId,
        })

        expect(isValid).toBe(true)
      }
    })

    test('verify returns false for invalid proof', async () => {
      const wrongTree = createUint64Tree([999n, 888n])

      const isValid = await sdk.verify({
        address: deployer.addr.toString(),
        name: verifyRootName,
        leaf: wrongTree.getLeafHash(0),
        proof: testTree.getProof(0),
        type: verifyTypeId,
      })

      expect(isValid).toBe(false)
    })

    test('verify returns false for wrong type', async () => {
      const wrongTypeId = verifyTypeId + 100n // Non-matching type

      const isValid = await sdk.verify({
        address: deployer.addr.toString(),
        name: verifyRootName,
        leaf: testTree.getLeafHash(0),
        proof: testTree.getProof(0),
        type: wrongTypeId,
      })

      expect(isValid).toBe(false)
    })

    test('verifyFromTree convenience method works', async () => {
      const isValid = await sdk.verifyFromTree({
        address: deployer.addr.toString(),
        name: verifyRootName,
        tree: testTree,
        index: 2,
        type: verifyTypeId,
      })

      expect(isValid).toBe(true)
    })

    test('verifiedRead returns metadata after verification', async () => {
      const value = await sdk.verifiedRead({
        address: deployer.addr.toString(),
        name: verifyRootName,
        leaf: testTree.getLeafHash(0),
        proof: testTree.getProof(0),
        type: verifyTypeId,
        key: 'royalty',
      })

      expect(value).toBe('250')
    })

    test('verifiedRead returns empty string for invalid proof', async () => {
      const wrongTree = createUint64Tree([999n])

      const value = await sdk.verifiedRead({
        address: deployer.addr.toString(),
        name: verifyRootName,
        leaf: wrongTree.getLeafHash(0),
        proof: testTree.getProof(0),
        type: verifyTypeId,
        key: 'royalty',
      })

      expect(value).toBe('')
    })

    test('verifiedReadFromTree convenience method works', async () => {
      const value = await sdk.verifiedReadFromTree({
        address: deployer.addr.toString(),
        name: verifyRootName,
        tree: testTree,
        index: 0,
        type: verifyTypeId,
        key: 'royalty',
      })

      expect(value).toBe('250')
    })

    test('verifiedMustRead throws for invalid proof', async () => {
      const wrongTree = createUint64Tree([999n])

      await expect(
        sdk.verifiedMustRead({
          address: deployer.addr.toString(),
          name: verifyRootName,
          leaf: wrongTree.getLeafHash(0),
          proof: testTree.getProof(0),
          type: verifyTypeId,
          key: 'royalty',
        }),
      ).rejects.toThrow(errFailedToVerifyInclusion)
    })

    test('verifiedMustRead returns value for valid proof', async () => {
      const value = await sdk.verifiedMustRead({
        address: deployer.addr.toString(),
        name: verifyRootName,
        leaf: testTree.getLeafHash(1),
        proof: testTree.getProof(1),
        type: verifyTypeId,
        key: 'royalty',
      })

      expect(value).toBe('250')
    })

    test('verifiedMustReadFromTree convenience method works', async () => {
      const value = await sdk.verifiedMustReadFromTree({
        address: deployer.addr.toString(),
        name: verifyRootName,
        tree: testTree,
        index: 3,
        type: verifyTypeId,
        key: 'royalty',
      })

      expect(value).toBe('250')
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // EDGE CASES & ERROR HANDLING
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Edge Cases & Error Handling', () => {
    // Use collection type (id 1) created in beforeAll
    const edgeCaseTypeId = 1n

    test('handles single-leaf tree', async () => {
      const tree = createUint64Tree([42n])
      const name = uniqueName('single-leaf')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: edgeCaseTypeId,
      })

      const isValid = await sdk.verifyFromTree({
        address: deployer.addr.toString(),
        name,
        tree,
        index: 0,
        type: edgeCaseTypeId,
      })

      expect(isValid).toBe(true)
    })

    test('handles large tree', async () => {
      const values = Array.from({ length: 100 }, (_, i) => BigInt(i))
      const tree = createUint64Tree(values)
      const name = uniqueName('large-tree')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: edgeCaseTypeId,
      })

      // Verify random leaves
      for (const index of [0, 25, 50, 75, 99]) {
        const isValid = await sdk.verifyFromTree({
          address: deployer.addr.toString(),
          name,
          tree,
          index,
          type: edgeCaseTypeId,
        })
        expect(isValid).toBe(true)
      }
    })

    test('handles the actual 31-byte root-name limit', async () => {
      const tree = createUint64Tree([1n])
      const maxName = uniqueName('max').padEnd(31, 'x')
      expect(new TextEncoder().encode(maxName).length).toBe(31)

      await sdk.addRoot({
        name: maxName,
        root: tree.root,
        type: edgeCaseTypeId,
      })

      const hasRoot = await sdk.hasRoot({
        address: deployer.addr.toString(),
        name: maxName,
      })
      expect(hasRoot).toBe(true)
      expect([...(await sdk.getRoots()).keys()].some((key) => key.address === deployer.addr.toString() && key.name === maxName)).toBe(true)
      await expect(sdk.addRoot({ name: maxName + 'x', root: tree.root, type: edgeCaseTypeId })).rejects.toThrow(errNameTooLong)
      await expect(sdk.addRoot({ name: '', root: tree.root, type: edgeCaseTypeId })).rejects.toThrow(
        new RegExp(errInvalidName),
      )
    })

    test('handles unicode in metadata values', async () => {
      const tree = createUint64Tree([1n])
      const name = uniqueName('unicode')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: edgeCaseTypeId,
      })

      const unicodeValue = '🎨 Art Collection 日本語 émojis'

      await sdk.addData({
        name,
        key: 'description',
        value: unicodeValue,
      })

      const read = await sdk.read({
        address: deployer.addr.toString(),
        name,
        key: 'description',
      })

      expect(read).toBe(unicodeValue)
    })

    test('type 0 (Unspecified) allows any type check', async () => {
      const tree = createUint64Tree([1n, 2n])
      const name = uniqueName('unspecified')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: 0n, // Use the unspecified type (id 0)
      })

      // Type 0 should pass verification
      const isValid = await sdk.verify({
        address: deployer.addr.toString(),
        name,
        leaf: tree.getLeafHash(0),
        proof: tree.getProof(0),
        type: MerkleTreeType.Unspecified,
      })

      expect(isValid).toBe(true)
    })
  })

  // ═══════════════════════════════════════════════════════════════════════════
  // MULTI-USER SCENARIOS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Multi-User Scenarios', () => {
    // Use collection type (id 1) created in beforeAll
    const multiUserTypeId = 1n

    test("can read another user's root", async () => {
      const tree = createUint64Tree([1n, 2n, 3n])
      const name = uniqueName('readable')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: multiUserTypeId,
      })

      // Another user can read deployer's root
      const root = await sdk.getRoot({
        address: deployer.addr.toString(),
        name,
      })

      expect(root).toBeDefined()
      expect(bytesToHex(root!)).toBe(bytesToHex(tree.root))
    })

    test('can verify against any root with correct proof', async () => {
      const tree = createUint64Tree([100n, 200n, 300n])
      const name = uniqueName('verifiable')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: multiUserTypeId,
      })

      // Verify against deployer's tree using the correct address
      const isValid = await sdk.verify({
        address: deployer.addr.toString(),
        name,
        leaf: tree.getLeafHash(1),
        proof: tree.getProof(1),
        type: multiUserTypeId,
      })

      expect(isValid).toBe(true)
    })

    test('verification fails for wrong address', async () => {
      const tree = createUint64Tree([1n, 2n])
      const name = uniqueName('wrong-addr')

      await sdk.addRoot({
        name,
        root: tree.root,
        type: multiUserTypeId,
      })

      // Try to verify using wrong address - should fail or return false
      const isValid = await sdk.verify({
        address: otherAccount.addr.toString(), // Wrong address
        name,
        leaf: tree.getLeafHash(0),
        proof: tree.getProof(0),
        type: multiUserTypeId,
      })

      expect(isValid).toBe(false)
    })
  })
})
