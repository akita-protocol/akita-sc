import { deployAkitaDAO } from '../../tests/fixtures/dao'
import { metadataDataKey, metadataDataParts, metadataValueLimit } from '../../../akita-sdk/src/meta'
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { ABIType } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import {
  ACCOUNT_IMAGE_RECORD,
  encodeAccountImageReference,
  encodeMetadataJson,
  encodeReceiveQrStyle,
  MetaFactory,
  MetaSDK,
  metadataBoxName,
  metadataStorageCost,
  parseAccountImageReference,
  parseReceiveQrStyle,
  RECEIVE_QR_RECORD,
} from '../../../akita-sdk/src/meta'
import { MockMetaReaderClient, MockMetaReaderFactory } from '../artifacts/mocks/meta-reader/MockMetaReaderClient'
import {
  errInvalidNamespace,
  errInvalidKey,
  errRecordNamesTooLong,
  errInvalidRecordPayment,
  errRecordRevisionMismatch,
  errRecordRange,
  errRecordValueTooLarge,
  errRecordPartTooLarge,
  errRecordRequiresSlice,
} from './errors'

describe('Account metadata registry (LocalNet)', () => {
  const fixture = algorandFixture()
  let metadata: MetaSDK
  let other: MetaSDK
  let owner: string
  let readers: MockMetaReaderClient[]

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const funding = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, funding.addr, microAlgo(100_000_000))
    const stranger = algorand.account.random()
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(stranger.addr, dispenser.addr, microAlgo(10_000_000))
    const dao = await deployAkitaDAO({ fixture, sender: testAccount.toString(), signer: testAccount.signer, apps: {} })
    const factory = algorand.client.getTypedAppFactory(MetaFactory, {
      defaultSender: owner,
      defaultSigner: testAccount.signer,
    })
    const { appClient } = await factory.deploy({
      onUpdate: 'append',
      onSchemaBreak: 'append',
      createParams: { method: 'create', args: ['test', dao.appId] },
    })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    metadata = new MetaSDK({
      algorand,
      readerAccount: owner,
      factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: testAccount.signer },
    })
    other = new MetaSDK({
      algorand,
      readerAccount: stranger.addr.toString(),
      factoryParams: {
        appId: appClient.appId,
        defaultSender: stranger.addr.toString(),
        defaultSigner: stranger.signer,
      },
    })
    readers = []
    // One consumer shares the registry's creator; the other is unrelated.
    for (const creator of [testAccount, stranger]) {
      const readerFactory = algorand.client.getTypedAppFactory(MockMetaReaderFactory, {
        defaultSender: creator.addr,
        defaultSigner: creator.signer,
      })
      readers.push((await readerFactory.send.create.bare()).appClient)
    }
  })

  test('any contract can directly read an inline record without an inner transaction', async () => {
    const namespace = 'foreign-read'
    const key = 'value'
    const data = new Uint8Array(1024).fill(42)
    const written = await metadata.setRecord({ key: metadataDataKey(namespace, key), data, expectedRevision: 0n })
    for (const reader of readers) {
      expect(await reader.permissions({ args: { registry: metadata.appId } })).toEqual({
        publicReads: true,
        familyAccess: false,
      })
      const result = await reader.send.read({
        args: { registry: metadata.appId, account: owner, key: metadataDataKey(namespace, key) },
        appReferences: [metadata.appId],
        boxReferences: [
          { appId: metadata.appId, name: metadataBoxName(owner, metadataDataKey(namespace, key)) },
        ],
        staticFee: microAlgo(1000),
        populateAppCallResources: false,
      })
      expect(result.return).toEqual({ exists: true, revision: written.return, data })
      expect(result.confirmation.innerTxns ?? []).toHaveLength(0)
    }
  })

  test('direct reads reflect updates, empty values and missing or deleted records', async () => {
    const namespace = 'foreign-lifecycle'
    const key = 'value'
    const reader = readers[1]
    const args = { registry: metadata.appId, account: owner, key: metadataDataKey(namespace, key) }
    expect(await reader.read({ args })).toEqual({ exists: false, revision: 0n, data: new Uint8Array() })
    const first = await metadata.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array([1]), expectedRevision: 0n })
    const second = await metadata.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array(), expectedRevision: first.return! })
    expect(await reader.read({ args })).toEqual({ exists: true, revision: second.return, data: new Uint8Array() })
    await metadata.removeRecord({ key: metadataDataKey(namespace, key), expectedRevision: second.return! })
    expect(await reader.read({ args })).toEqual({ exists: false, revision: 0n, data: new Uint8Array() })
  })

  test('ABI reads and foreign-box utilities return the same record', async () => {
    const args = { registry: metadata.appId, account: owner, key: metadataDataKey('abi-read', 'value') }
    const reader = readers[0]
    const missing = await reader.send.readViaCall({ args, staticFee: microAlgo(2000) })
    expect(missing.return).toEqual(await reader.read({ args }))
    await metadata.setRecord({ ...args, data: new Uint8Array([9, 8, 7]), expectedRevision: 0n })
    const result = await reader.send.readViaCall({ args, staticFee: microAlgo(2000) })
    expect(result.return).toEqual(await reader.read({ args }))
    expect(result.confirmation.innerTxns).toHaveLength(1)
  })

  test('contract write utilities preserve ownership, exact deposits, refunds and revisions', async () => {
    const namespace = 'app-owned'
    const key = 'value'
    const reader = readers[0]
    await reader.appClient.fundAppAccount({ amount: microAlgo(2_000_000) })
    const before = await fixture.algorand.account.getInformation(reader.appAddress)
    const args = { registry: metadata.appId, key: metadataDataKey(namespace, key) }
    const first = await reader.send.setOwned({
      args: { ...args, data: new Uint8Array(4094).fill(12), expectedRevision: 0n },
      staticFee: microAlgo(5000),
    })
    expect((await metadata.readRecord(reader.appAddress.toString(), metadataDataKey(namespace, key))).data).toEqual(new Uint8Array(4094).fill(12))
    expect((await metadata.readRecord(owner, metadataDataKey(namespace, key))).exists).toBe(false)
    expect(before.balance.microAlgos - (await fixture.algorand.account.getInformation(reader.appAddress)).balance.microAlgos)
      .toBe(metadataStorageCost(4094, metadataDataKey(namespace, key)))
    await expect(reader.send.setOwned({
      args: { ...args, data: new Uint8Array([1]), expectedRevision: 0n }, staticFee: microAlgo(5000),
    })).rejects.toThrow(new RegExp(errRecordRevisionMismatch))
    const smaller = await reader.send.setOwned({
      args: { ...args, data: new Uint8Array([3]), expectedRevision: first.return! }, staticFee: microAlgo(5000),
    })
    expect(before.balance.microAlgos - (await fixture.algorand.account.getInformation(reader.appAddress)).balance.microAlgos)
      .toBe(metadataStorageCost(1, metadataDataKey(namespace, key)))
    const removed = await reader.send.removeOwned({
      args: { ...args, expectedRevision: smaller.return! }, staticFee: microAlgo(3000),
    })
    expect(removed.return).toBe(0n)
    expect((await metadata.readRecord(reader.appAddress.toString(), metadataDataKey(namespace, key))).exists).toBe(false)
    expect((await fixture.algorand.account.getInformation(reader.appAddress)).balance.microAlgos).toBe(before.balance.microAlgos)
  })

  test('another contract writes a multipart ARC-4 record through the shared utility', async () => {
    const reader = readers[0]
    const key = metadataDataKey('helper', 'parts')
    const data = Uint8Array.from({ length: 15000 }, (_, i) => i % 251)
    await reader.appClient.fundAppAccount({ amount: microAlgo(10_000_000) })
    const before = await fixture.algorand.account.getInformation(reader.appAddress)
    const result = await reader.send.setOwnedParts({
      args: { registry: metadata.appId, key, ...metadataDataParts(data), expectedRevision: 0n },
      extraFee: microAlgo(10_000),
    })
    expect(await metadata.readRecord(reader.appAddress.toString(), key)).toEqual({ exists: true, revision: result.return, data })
    await reader.send.removeOwned({ args: { registry: metadata.appId, key, expectedRevision: result.return! }, extraFee: microAlgo(3000) })
    expect((await fixture.algorand.account.getInformation(reader.appAddress)).balance.microAlgos).toBe(before.balance.microAlgos)
  })

  test('foreign contracts cannot write or delete boxes, even with the same creator', async () => {
    const namespace = 'foreign-write'
    const key = 'value'
    const data = new Uint8Array([7])
    const written = await metadata.setRecord({ key: metadataDataKey(namespace, key), data, expectedRevision: 0n })
    const name = metadataBoxName(owner, metadataDataKey(namespace, key))
    for (const reader of readers) {
      const resources = {
        appReferences: [metadata.appId],
        boxReferences: [{ appId: metadata.appId, name }],
        populateAppCallResources: false,
      }
      await expect(
        reader.send.write({
          ...resources,
          args: { registry: metadata.appId, name, data: ABIType.from('(uint64,byte[])').encode([999n, [0]]) },
        }),
      ).rejects.toThrow(/(?:foreign|family) app \d+ may not write box/)
      await expect(
        reader.send.remove({
          ...resources,
          args: { registry: metadata.appId, name },
        }),
      ).rejects.toThrow(/(?:foreign|family) app \d+ may not write box/)
    }
    expect(await metadata.readRecord(owner, metadataDataKey(namespace, key))).toEqual({ exists: true, revision: written.return, data })
  })

  test('round-trips both public schemas, including direct deterministic box discovery', async () => {
    const style = {
      version: 1 as const,
      background: '#a8a9ff',
      foreground: 'auto',
      moduleRoundness: 0.45,
      finderRoundness: 0.7,
      showAvatar: true,
    }
    const image = { version: 1 as const, source: { type: 'uri' as const, uri: 'ipfs://bafy-example/avatar.png' } }
    await metadata.setRecord({ ...RECEIVE_QR_RECORD, data: encodeReceiveQrStyle(style), expectedRevision: 0n })
    await metadata.setRecord({
      ...ACCOUNT_IMAGE_RECORD,
      data: encodeAccountImageReference(image),
      expectedRevision: 0n,
    })
    const qr = await other.readRecord(owner, RECEIVE_QR_RECORD.key)
    const avatar = await other.readRecord(owner, ACCOUNT_IMAGE_RECORD.key)
    expect(parseReceiveQrStyle(qr.data)).toEqual(style)
    expect(parseAccountImageReference(avatar.data)).toEqual(image)
    const box = await fixture.algorand.client.algod
      .getApplicationBoxByName(
        metadata.appId,
        metadataBoxName(owner, RECEIVE_QR_RECORD.key),
      )
      .do()
    expect(box.value).toEqual(ABIType.from('(uint64,byte[])').encode([qr.revision, qr.data]))

  })

  test('plain records are discoverable by account and namespace alongside Merkle boxes', async () => {
    expect(await metadata.listRecordKeys({ account: owner, keyPrefix: RECEIVE_QR_RECORD.key })).toEqual([
      { account: owner, ...RECEIVE_QR_RECORD },
    ])
  })

  test('a second signer can publish only its own records', async () => {
    const first = await metadata.setRecord({ key: metadataDataKey('ownership', 'image'), data: new Uint8Array([1]), expectedRevision: 0n })
    const second = await other.setRecord({ key: metadataDataKey('ownership', 'image'), data: new Uint8Array([2]), expectedRevision: 0n })
    expect(first.return).toBe(1n)
    expect(second.return).toBe(1n)
    expect((await metadata.readRecord(owner, metadataDataKey('ownership', 'image'))).data).toEqual(new Uint8Array([1]))
    const removed = await other.removeRecord({ key: metadataDataKey('ownership', 'image'), expectedRevision: second.return! })
    expect(removed.return).toBe(0n)
    expect(await metadata.readRecord(owner, metadataDataKey('ownership', 'image')))
      .toEqual({ exists: true, revision: first.return, data: new Uint8Array([1]) })
  })

  test('collects exact growth MBR and returns shrink/delete MBR without using other records funds', async () => {
    const account = metadata.client.appAddress
    const info = () => fixture.algorand.account.getInformation(account)
    const before = await info()
    const first = await metadata.setRecord({ key: metadataDataKey('costs', 'data'), data: new Uint8Array(100), expectedRevision: 0n })
    const created = await info()
    expect(created.balance.microAlgos - before.balance.microAlgos).toBe(metadataStorageCost(100, metadataDataKey('costs', 'data')))
    expect(created.minBalance.microAlgos - before.minBalance.microAlgos).toBe(metadataStorageCost(100, metadataDataKey('costs', 'data')))
    const second = await metadata.setRecord({ key: metadataDataKey('costs', 'data'), data: new Uint8Array(200), expectedRevision: first.return! })
    expect((await info()).balance.microAlgos - created.balance.microAlgos).toBe(40_000n)
    const third = await metadata.setRecord({ key: metadataDataKey('costs', 'data'), data: new Uint8Array(10), expectedRevision: second.return! })
    expect((await info()).balance.microAlgos - before.balance.microAlgos).toBe(metadataStorageCost(10, metadataDataKey('costs', 'data')))
    await metadata.removeRecord({ key: metadataDataKey('costs', 'data'), expectedRevision: third.return! })
    expect((await info()).balance.microAlgos).toBe(before.balance.microAlgos)
    expect((await metadata.readRecord(owner, metadataDataKey('costs', 'data'))).exists).toBe(false)
  })

  test('revisions belong to each record and restart after deletion', async () => {
    const args = { key: metadataDataKey('revision', 'value'), data: new Uint8Array([1]) }
    const first = await metadata.setRecord({ ...args, expectedRevision: 0n })
    expect(first.return).toBe(1n)
    const independent = await metadata.setRecord({ key: metadataDataKey('revision', 'other'), data: new Uint8Array(), expectedRevision: 0n })
    expect(independent.return).toBe(1n)
    await expect(metadata.setRecord({ ...args, expectedRevision: 0n })).rejects.toThrow(
      new RegExp(errRecordRevisionMismatch),
    )
    const second = await metadata.setRecord({ ...args, expectedRevision: first.return! })
    expect(second.return).toBe(2n)
    await expect(metadata.setRecord({ ...args, expectedRevision: first.return! })).rejects.toThrow(
      new RegExp(errRecordRevisionMismatch),
    )
    await expect(
      metadata.removeRecord({ key: args.key, expectedRevision: first.return! }),
    ).rejects.toThrow(new RegExp(errRecordRevisionMismatch))
    const removed = await metadata.removeRecord({ key: args.key, expectedRevision: second.return! })
    expect(removed.return).toBe(0n)
    const recreated = await metadata.setRecord({ ...args, expectedRevision: 0n })
    expect(recreated.return).toBe(1n)
    const updated = await metadata.setRecord({ ...args, expectedRevision: recreated.return! })
    expect(updated.return).toBe(2n)
    expect((await metadata.readRecord(owner, metadataDataKey('revision', 'other'))).revision).toBe(1n)
  })

  test('accepts arbitrary shapes and empty bytes while names remain collision-free', async () => {
    for (const [namespace, key, data] of [
      ['ab', 'c', new Uint8Array()],
      ['a', 'bc', encodeMetadataJson([1, { arbitrary: true }])],
      ['é'.repeat(13) + 'x', 'key', new Uint8Array(1024)],
    ] as const) {
      await metadata.setRecord({ key: metadataDataKey(namespace, key), data, expectedRevision: 0n })
      const stored = await metadata.readRecord(owner, metadataDataKey(namespace, key))
      expect(stored.exists).toBe(true)
      expect(stored.data).toEqual(data)
    }
  })

  test.each([
    [4094, 0, 0, 0],
    [0, 4094, 0, 0],
    [0, 0, 4094, 0],
    [0, 0, 0, 4084],
    [1, 2, 3, 4],
    [0, 17, 0, 23],
  ])('stores payload lengths %i/%i/%i/%i without ABI prefixes or reordered parts', async (...lengths) => {
    const key = `parts-${lengths.join('-')}`
    const [data0, data1, data2, data3] = lengths.map((length, part) => new Uint8Array(length).fill(part + 1))
    const data = new Uint8Array([...data0, ...data1, ...data2, ...data3])
    const result = await metadata.client.send.setRecord({
      args: {
        payment: fixture.algorand.createTransaction.payment({
          sender: owner,
          receiver: metadata.client.appAddress,
          amount: microAlgo(metadataStorageCost(data.length, key)),
        }),
        key: new TextEncoder().encode(key), data0, data1, data2, data3, expectedRevision: 0n,
      },
      extraFee: microAlgo(1000),
    })
    expect(await metadata.readRecord(owner, key)).toEqual({ exists: true, revision: result.return, data })
    const raw = await fixture.algorand.client.algod.getApplicationBoxByName(metadata.appId, metadataBoxName(owner, key)).do()
    expect(raw.value).toEqual(ABIType.from('(uint64,byte[])').encode([result.return!, data]))
    await metadata.removeRecord({ key, expectedRevision: result.return! })
  })

  test('contract rejects invalid names and oversized values even through the generated client', async () => {
    const { algorand, testAccount } = fixture.context
    for (const [key, data, error] of [
      [new Uint8Array(), new Uint8Array(), errInvalidKey],
      [new Uint8Array(129), new Uint8Array(), errInvalidKey],
      [new Uint8Array([1]), new Uint8Array(4085), errRecordPartTooLarge],
    ] as const) {
      await expect(
        metadata.client.send.setRecord({
          args: { payment: algorand.createTransaction.payment({
              sender: owner,
              signer: testAccount.signer,
              receiver: metadata.client.appAddress,
              amount: microAlgo(0),
            }), key, data0: new Uint8Array(), data1: new Uint8Array(), data2: new Uint8Array(), data3: data, expectedRevision: 0 },
        }),
      ).rejects.toThrow(new RegExp(error))
    }
  })

  test('rejects underfunded, overfunded and unrelated payments atomically', async () => {
    const { algorand, testAccount } = fixture.context
    const data = new Uint8Array([42])
    for (const amount of [
      0n,
      metadataStorageCost(1, metadataDataKey('payment', 'value')) - 1n,
      metadataStorageCost(1, metadataDataKey('payment', 'value')) + 1n,
    ]) {
      await expect(
        metadata.client.send.setRecord({
          args: { payment: algorand.createTransaction.payment({
              sender: owner,
              signer: testAccount.signer,
              receiver: metadata.client.appAddress,
              amount: microAlgo(amount),
            }), key: metadataDataKey('payment', 'value'), ...metadataDataParts(data), expectedRevision: 0 },
        }),
      ).rejects.toThrow(new RegExp(errInvalidRecordPayment))
      expect((await metadata.readRecord(owner, metadataDataKey('payment', 'value'))).exists).toBe(false)
    }
    await expect(
      metadata.client.send.setRecord({
        args: { payment: algorand.createTransaction.payment({
            sender: owner,
            signer: testAccount.signer,
            receiver: owner,
            amount: microAlgo(metadataStorageCost(1, metadataDataKey('payment', 'value'))),
          }), key: metadataDataKey('payment', 'value'), ...metadataDataParts(data), expectedRevision: 0 },
      }),
    ).rejects.toThrow(new RegExp(errInvalidRecordPayment))
  })

  test('readers ignore malformed and unknown schema data without interpreting payment instructions', async () => {
    const malformed = encodeMetadataJson({ version: 2, address: owner, amount: 5 })
    await metadata.setRecord({ key: metadataDataKey('schema-test', 'style'), data: malformed, expectedRevision: 0n })
    expect(parseReceiveQrStyle((await metadata.readRecord(owner, metadataDataKey('schema-test', 'style'))).data)).toBeUndefined()
    expect(parseAccountImageReference(malformed)).toBeUndefined()
    expect(parseReceiveQrStyle(new Uint8Array([255]))).toBeUndefined()
    expect(
      parseAccountImageReference(
        encodeMetadataJson({ version: 1, source: { type: 'uri', uri: 'javascript:alert(1)' } }),
      ),
    ).toBeUndefined()
    expect(
      parseAccountImageReference(
        encodeMetadataJson({ version: 1, source: { type: 'asset', assetId: '18446744073709551616' } }),
      ),
    ).toBeUndefined()
    expect(
      parseAccountImageReference(encodeMetadataJson({ version: 1, source: { type: 'account', address: owner } })),
    ).toBeDefined()
    expect(
      parseAccountImageReference(encodeMetadataJson({ version: 1, source: { type: 'asset', assetId: '123' } })),
    ).toBeDefined()
  })

  test.each([1, 31])('fills the complete argument budget with a %i-byte key and refunds its storage', async (keyLength) => {
    const key = new Uint8Array(keyLength).fill(255)
    const data = Uint8Array.from({ length: metadataValueLimit(key) }, (_, i) => i % 251)
    const before = await fixture.algorand.account.getInformation(metadata.client.appAddress)
    const result = await metadata.setRecord({ key: key, data, expectedRevision: 0n })
    expect(result.transactions.filter((txn) => txn.applicationCall).length).toBe(1)
    expect(result.transactions.length).toBe(2)
    expect(result.transaction.applicationCall!.appArgs.reduce((sum, arg) => sum + arg.length, 0)).toBe(16384)
    expect(result.confirmation.confirmedRound).toBeGreaterThan(0n)
    expect(result.transaction.applicationCall?.appIndex).toBe(metadata.appId)
    expect(new Set(result.confirmations.map((confirmation) => confirmation.confirmedRound)).size).toBe(1)
    expect(new Set(result.transactions.map((txn) => Buffer.from(txn.group!).toString('base64')))).toEqual(
      new Set([result.groupId]),
    )
    expect(await metadata.readRecord(owner, key)).toEqual({ exists: true, revision: result.return, data })
    const raw = await fixture.algorand.client.algod
      .getApplicationBoxByName(metadata.appId, metadataBoxName(owner, key))
      .do()
    expect(raw.value.length).toBe(data.length + 12)
    expect(raw.value).toEqual(ABIType.from('(uint64,byte[])').encode([result.return!, data]))
    const after = await fixture.algorand.account.getInformation(metadata.client.appAddress)
    expect(after.balance.microAlgos - before.balance.microAlgos).toBe(metadataStorageCost(data.length, key))
    expect(after.minBalance.microAlgos - before.minBalance.microAlgos).toBe(
      metadataStorageCost(data.length, key),
    )
    for (const reader of readers) {
      expect(await reader.info({ args: { registry: metadata.appId, account: owner, key: key } })).toEqual({
        exists: true,
        revision: result.return,
        size: BigInt(data.length),
      })
      for (const offset of [0, 4090, 8184, 12278, data.length - 1024]) {
        const slice = await reader.send.slice({
          args: { registry: metadata.appId, account: owner, key: key, offset, length: 1024, expectedRevision: result.return! },
          extraFee: microAlgo(5000),
        })
        expect(slice.return).toEqual(data.slice(offset, offset + 1024))
      }
    }
    await expect(metadata.client.readRecord({ args: { account: owner, key: key } })).rejects.toThrow(
      new RegExp(errRecordRequiresSlice),
    )
    await metadata.removeRecord({ key: key, expectedRevision: result.return! })
    expect((await fixture.algorand.account.getInformation(metadata.client.appAddress)).balance.microAlgos).toBe(
      before.balance.microAlgos,
    )
  })

  test('large stale writes cannot overwrite a newer revision', async () => {
    const key = metadataDataKey('stale', 'value')
    const first = await metadata.setRecord({ key, data: new Uint8Array([1]), expectedRevision: 0n })
    const latest = await metadata.setRecord({ key, data: new Uint8Array([3]), expectedRevision: first.return! })
    await expect(metadata.setRecord({ key, data: new Uint8Array(1025), expectedRevision: first.return! })).rejects.toThrow(new RegExp(errRecordRevisionMismatch))
    expect(await metadata.readRecord(owner, key)).toEqual({ exists: true, revision: latest.return, data: new Uint8Array([3]) })
  })

  test('31-byte raw and UTF-8 keys round-trip while 32-byte keys fail on-chain', async () => {
    for (const key of [new Uint8Array(31).fill(0xfe), new TextEncoder().encode('é'.repeat(15) + 'a')]) {
      const result = await metadata.setRecord({ key, data: new Uint8Array([1]), expectedRevision: 0n })
      expect(metadataBoxName(owner, key).length).toBe(64)
      expect((await metadata.listRecordKeys({ account: owner })).some((entry) => Buffer.from(entry.key).equals(Buffer.from(key)))).toBe(true)
      await metadata.removeRecord({ key, expectedRevision: result.return! })
    }
    await expect(metadata.client.send.setRecord({ args: { key: new Uint8Array(32), ...metadataDataParts(new Uint8Array()), expectedRevision: 0n,
      payment: fixture.algorand.createTransaction.payment({ sender: owner, receiver: metadata.client.appAddress, amount: microAlgo(0) }),
    } })).rejects.toThrow(new RegExp(errInvalidKey))
  })

  test('rejects oversized values on-chain, and permits maximum-size replacement then shrinking', async () => {
    const namespace = 'replace-max'
    const key = 'value'
    const limit = metadataValueLimit(metadataDataKey(namespace, key))
    await expect(
      metadata.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array(limit + 1), expectedRevision: 0n }),
    ).rejects.toThrow(String(limit))
    await expect(
      metadata.client.send.setRecord({
        args: { key: metadataDataKey(namespace, key), ...metadataDataParts(new Uint8Array(limit + 1)), expectedRevision: 0n, payment: fixture.algorand.createTransaction.payment({
            sender: owner,
            receiver: metadata.client.appAddress,
            amount: microAlgo(0),
          }) },
      }),
    ).rejects.toThrow(/16384/)
    await expect(metadata.client.recordCost({ args: {
      account: owner, key: metadataDataKey(namespace, key), size: limit + 1,
    } })).rejects.toThrow(new RegExp(errRecordValueTooLarge))
    const first = await metadata.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array(limit).fill(1), expectedRevision: 0n })
    const second = await metadata.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array(limit).fill(2), expectedRevision: first.return! })
    expect((await metadata.readRecord(owner, metadataDataKey(namespace, key))).data).toEqual(new Uint8Array(limit).fill(2))
    const tiny = await metadata.setRecord({ key: metadataDataKey(namespace, key), data: new Uint8Array(), expectedRevision: second.return! })
    expect(await metadata.readRecord(owner, metadataDataKey(namespace, key))).toEqual({
      exists: true,
      revision: tiny.return,
      data: new Uint8Array(),
    })
    await expect(
      metadata.client.readRecordSlice({
        args: { account: owner, key: metadataDataKey(namespace, key), offset: 0, length: 1, expectedRevision: second.return! },
      }),
    ).rejects.toThrow(new RegExp(errRecordRevisionMismatch))
    await expect(
      metadata.client.readRecordSlice({
        args: { account: owner, key: metadataDataKey(namespace, key), offset: 0, length: 1, expectedRevision: tiny.return! },
      }),
    ).rejects.toThrow(new RegExp(errRecordRange))
  })
})
