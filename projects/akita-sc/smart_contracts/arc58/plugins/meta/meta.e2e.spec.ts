import { errScopeMissing, errScopeAdmin, errScopeStale, errScopeGrantMissing } from './errors'
import { metadataDataKey, metadataDataParts, metadataPluginValueLimit } from '../../../../../akita-sdk/src/meta'
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { ABIMethod, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { CallerType, newWallet, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import {
  MetaFactory,
  createUint64Tree,
  SchemaPart,
  MetaSDK,
  encodeAccountImageReference,
} from '../../../../../akita-sdk/src/meta'
import { MetaPluginFactory, MetaPluginSDK, newMetaPlugin, metadataScopeArgs, MetaPluginScope } from '../../../../../akita-sdk/src/wallet/plugins/meta'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { errAuthAddrMismatch } from '../../account/errors'
import {
  errKeysRequireNamespace,
  errRecordValueTooLarge,
  errRecordPartTooLarge,
  errRecordRevisionMismatch,
  errInvalidKey,
  errDuplicateScopeKey,
  errScopeTooLarge,
  errNamespaceScope,
  errKeyScope,
  errRootScope,
  errReservedKeyPrefix,
  errTypeScope,
} from '../../../meta/errors'

describe('MetaPlugin per-wallet grant policies (LocalNet)', () => {
  const fixture = algorandFixture()
  let factory: WalletFactorySDK
  let wallet: WalletSDK
  let metadata: MetaSDK
  let namespacePlugin: MetaPluginSDK
  let keysPlugin: MetaPluginSDK
  let unrestricted: MetaPluginSDK
  let owner: string
  const previousMbrApp = process.env.WALLET_MBR_APP_ID
  const image = encodeAccountImageReference({
    version: 1,
    source: { type: 'uri', uri: 'https://example.com/image.png' },
  })

  let administrators = new Set<bigint>()
  const customScopes = new Map<bigint, MetaPluginScope>()
  const scopeFor = (client: MetaPluginSDK): MetaPluginScope => customScopes.get(client.appId) ?? (
    client === namespacePlugin ? { type: 'namespace', namespace: 'akita.account' } :
    client === keysPlugin ? { type: 'keys', namespace: 'akita.account', keys: ['image'] } : { type: 'unrestricted' }
  )
  const install = async (args: Parameters<WalletSDK['addPlugin']>[0] & { client: MetaPluginSDK }) => {
    if (!administrators.has(args.client.appId)) {
      await wallet.addPlugin({ client: args.client, callerType: CallerType.Admin })
      administrators.add(args.client.appId)
    }
    await wallet.addPlugin(args)
    const caller = args.callerType === CallerType.Global ? ALGORAND_ZERO_ADDRESS_STRING : args.caller!
    await wallet.usePlugin({ callerType: CallerType.Admin, calls: [args.client.configureScope({
      caller, escrow: args.escrow ?? '', scope: scopeFor(args.client), expectedRevision: 0n,
    })] })
  }
  const policy = (client: MetaPluginSDK) => client.getScope({ wallet: wallet.appId, caller: ALGORAND_ZERO_ADDRESS_STRING })

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    const { algorand, testAccount } = fixture.context
    owner = testAccount.toString()
    const signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(owner, dispenser.addr, microAlgo(1_000_000_000))
    const mbrFactory = algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {
      defaultSender: owner,
      defaultSigner: signer,
    })
    const { appClient: mbr } = await mbrFactory.send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const dao = await deployAkitaDAO({ fixture, sender: owner, signer, apps: {} })
    const escrowFactory = await deployEscrowFactory({ fixture, sender: owner, signer })
    factory = await deployAbstractedAccountFactory({
      fixture,
      sender: owner,
      signer,
      args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId },
    })
    const registryFactory = algorand.client.getTypedAppFactory(MetaFactory, {
      defaultSender: owner,
      defaultSigner: signer,
    })
    const { appClient } = await registryFactory.deploy({
      onUpdate: 'append',
      onSchemaBreak: 'append',
      createParams: { method: 'create', args: ['test', dao.appId] },
    })
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    metadata = new MetaSDK({
      algorand,
      readerAccount: owner,
      factoryParams: { appId: appClient.appId, defaultSender: owner, defaultSigner: signer },
    })
    await metadata.addType({ description: 'Meta plugin tests', schemaList: [SchemaPart.Uint64] })
    const params = { algorand, sender: owner, signer, registry: metadata.appId }
    unrestricted = await newMetaPlugin(params)
    namespacePlugin = await newMetaPlugin(params)
    keysPlugin = await newMetaPlugin({
      ...params,
    })
  })

  afterAll(() => {
    if (previousMbrApp === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbrApp
  })

  beforeEach(async () => {
    administrators = new Set()
    wallet = await newWallet({
      algorand: fixture.algorand,
      readerAccount: owner,
      factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: fixture.context.testAccount.signer },
      nickname: 'Metadata test',
    })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(5_000_000) })
  })

  test('one plugin isolates callers and wallets, denies missing policies, and lets only admins change them', async () => {
    const plugin = unrestricted
    const alice = fixture.algorand.account.random()
    const bob = fixture.algorand.account.random()
    for (const account of [alice, bob]) await fixture.algorand.account.ensureFunded(account.addr, owner, microAlgo(10_000_000))
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    for (const account of [alice, bob]) await wallet.addPlugin({ client: plugin, callerType: CallerType.Other, caller: account.addr.toString() })
    const run = (target: WalletSDK, account: typeof alice, namespace: string, key = 'value') => target.usePlugin({
      sender: account.addr.toString(), signer: account.signer, callerType: CallerType.Other,
      calls: [plugin.set({ sender: account.addr.toString(), signer: account.signer, namespace, key, data: new Uint8Array([8]), expectedRevision: 0n })],
    })
    const configure = async (target: WalletSDK, account: typeof alice, namespace: string, expectedRevision = 0n) => target.usePlugin({
      callerType: CallerType.Admin,
      calls: [plugin.configureScope({ caller: account.addr.toString(), scope: { type: 'namespace', namespace }, expectedRevision })],
    })
    await expect(run(wallet, alice, 'alice')).rejects.toThrow(errScopeMissing)
    await configure(wallet, alice, 'alice')
    await configure(wallet, bob, 'bob')
    await run(wallet, alice, 'alice')
    await run(wallet, bob, 'bob')
    await expect(run(wallet, alice, 'bob')).rejects.toThrow(errNamespaceScope)
    await expect(run(wallet, bob, 'alice')).rejects.toThrow(errNamespaceScope)
    await wallet.usePlugin({ callerType: CallerType.Admin, calls: [plugin.set({ namespace: 'owner', key: 'value', data: new Uint8Array([9]), expectedRevision: 0n })] })
    await expect(run(wallet, alice, 'owner')).rejects.toThrow(errNamespaceScope)
    const policyArgs = { wallet: wallet.appId, caller: alice.addr.toString() }
    const initial = await plugin.getScope(policyArgs)
    await configure(wallet, alice, 'alice-updated', initial.revision)
    await expect(configure(wallet, alice, 'forbidden', initial.revision)).rejects.toThrow(/errMrev/)
    await expect(run(wallet, alice, 'alice', 'after-update')).rejects.toThrow(errNamespaceScope)
    await run(wallet, alice, 'alice-updated')
    const original = await plugin.getScope(policyArgs)
    await expect(wallet.usePlugin({
      sender: alice.addr.toString(), signer: alice.signer, callerType: CallerType.Other,
      calls: [plugin.configureScope({ sender: alice.addr.toString(), signer: alice.signer, caller: alice.addr.toString(), scope: { type: 'unrestricted' }, expectedRevision: original.revision })],
    })).rejects.toThrow(errScopeAdmin)
    expect(await plugin.getScope(policyArgs)).toEqual(original)
    const secondWallet = await newWallet({ algorand: fixture.algorand, readerAccount: owner,
      factoryParams: { appId: factory.appId, defaultSender: owner, defaultSigner: fixture.context.testAccount.signer }, nickname: 'Second policy wallet' })
    await secondWallet.client.appClient.fundAppAccount({ amount: microAlgo(2_000_000) })
    await secondWallet.addPlugin({ client: plugin, callerType: CallerType.Admin })
    await secondWallet.addPlugin({ client: plugin, callerType: CallerType.Other, caller: alice.addr.toString() })
    await expect(run(secondWallet, alice, 'alice')).rejects.toThrow(errScopeMissing)
    await configure(secondWallet, alice, 'second-wallet')
    await run(secondWallet, alice, 'second-wallet')
    await expect(run(secondWallet, alice, 'alice')).rejects.toThrow(errNamespaceScope)
    await expect(run(wallet, alice, 'second-wallet')).rejects.toThrow(errNamespaceScope)
    const walletAddress = wallet.client.appAddress.toString()
    const depositBefore = await fixture.algorand.account.getInformation(walletAddress)
    await wallet.usePlugin({ callerType: CallerType.Admin, calls: [plugin.clearScope({ caller: alice.addr.toString(), expectedRevision: original.revision })] })
    expect((await plugin.getScope(policyArgs)).scope).toBeUndefined()
    expect((await fixture.algorand.account.getInformation(walletAddress)).balance.microAlgos).toBeGreaterThan(depositBefore.balance.microAlgos)
    await expect(run(wallet, alice, 'alice', 'next')).rejects.toThrow(errScopeMissing)
    await run(wallet, bob, 'bob', 'next')
    await run(secondWallet, alice, 'second-wallet', 'next')
    // Deleting a policy does not delete that caller's data or another wallet's policy.
    expect((await metadata.readRecord(walletAddress, metadataDataKey('alice', 'value'))).data).toEqual(new Uint8Array([8]))
    expect((await fixture.algorand.account.getInformation(plugin.client.appAddress)).balance.microAlgos).toBe(100_000n)
  })

  test('a policy lapses when its grant is removed and installed again, and needs an installed grant', async () => {
    const plugin = unrestricted
    const alice = fixture.algorand.account.random()
    await fixture.algorand.account.ensureFunded(alice.addr, owner, microAlgo(10_000_000))
    const caller = alice.addr.toString()
    const run = (key: string) => wallet.usePlugin({
      sender: caller, signer: alice.signer, callerType: CallerType.Other,
      calls: [plugin.set({ sender: caller, signer: alice.signer, namespace: 'alice', key, data: new Uint8Array([1]), expectedRevision: 0n })],
    })
    const configure = (expectedRevision: bigint) => wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [plugin.configureScope({ caller, scope: { type: 'namespace', namespace: 'alice' }, expectedRevision })],
    })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin })

    // No grant for alice yet: there is nothing to configure.
    await expect(configure(0n)).rejects.toThrow(errScopeGrantMissing)

    // Rounds make each install's start epoch distinct on LocalNet.
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Other, caller, useRounds: true })
    await configure(0n)
    await run('first')
    const written = await plugin.getScope({ wallet: wallet.appId, caller })
    expect(written.start).toBeGreaterThan(0n)

    await wallet.removePlugin({ plugin: plugin.appId, caller, escrow: '' })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Other, caller, useRounds: true })
    // The old policy survives in Meta but belongs to the removed install.
    await expect(run('second')).rejects.toThrow(errScopeStale)

    await configure(written.revision)
    const rewritten = await plugin.getScope({ wallet: wallet.appId, caller })
    expect(rewritten.start).toBeGreaterThan(written.start)
    await run('second')

    // A removed grant's policy can still be cleared, which refunds its storage.
    await wallet.removePlugin({ plugin: plugin.appId, caller, escrow: '' })
    await wallet.usePlugin({ callerType: CallerType.Admin, calls: [plugin.clearScope({ caller, expectedRevision: rewritten.revision })] })
    expect((await plugin.getScope({ wallet: wallet.appId, caller })).scope).toBeUndefined()
  })

  test('unrestricted install can use different namespaces, then delete and restore wallet control', async () => {
    await install({ client: unrestricted, callerType: CallerType.Global })
    for (const namespace of ['akita.account', 'another.app']) {
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [unrestricted.set({ namespace, key: 'image', data: image, expectedRevision: 0n })],
      })
    }
    const address = wallet.client.appAddress.toString()
    const record = await metadata.readRecord(address, metadataDataKey('akita.account', 'image'))
    expect(record.data).toEqual(image)
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [unrestricted.remove({ namespace: 'akita.account', key: 'image', expectedRevision: record.revision })],
    })
    expect((await metadata.readRecord(address, metadataDataKey('akita.account', 'image'))).exists).toBe(false)
    expect((await fixture.algorand.account.getInformation(address)).authAddr).toBeUndefined()
  })

  test('namespace install allows multiple keys and rejects other namespaces for set and remove', async () => {
    await install({ client: namespacePlugin, callerType: CallerType.Global })
    for (const key of ['image', 'display-name']) {
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [namespacePlugin.set({ namespace: 'akita.account', key, data: image, expectedRevision: 0n })],
      })
    }
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [namespacePlugin.set({ namespace: 'other', key: 'image', data: image, expectedRevision: 0n })],
      }),
    ).rejects.toThrow(new RegExp(errNamespaceScope))
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [namespacePlugin.remove({ namespace: 'other', key: 'image', expectedRevision: 0n })],
      }),
    ).rejects.toThrow(new RegExp(errNamespaceScope))
    expect((await policy(namespacePlugin)).scope).toEqual({ type: 'namespace', namespace: 'akita.account' })
  })

  test('exact-key install enforces both dimensions, with no prefix or wildcard matching', async () => {
    await install({ client: keysPlugin, callerType: CallerType.Global })
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [keysPlugin.set({ namespace: 'akita.account', key: 'image', data: image, expectedRevision: 0n })],
    })
    for (const key of ['image.extra', 'Image', '*', 'display-name']) {
      await expect(
        wallet.usePlugin({
          callerType: CallerType.Global,
          calls: [keysPlugin.set({ namespace: 'akita.account', key, data: image, expectedRevision: 0n })],
        }),
      ).rejects.toThrow(new RegExp(errKeyScope))
      await expect(
        wallet.usePlugin({
          callerType: CallerType.Global,
          calls: [keysPlugin.remove({ namespace: 'akita.account', key, expectedRevision: 0n })],
        }),
      ).rejects.toThrow(new RegExp(errKeyScope))
    }
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [keysPlugin.set({ namespace: 'another.app', key: 'image', data: image, expectedRevision: 0n })],
      }),
    ).rejects.toThrow(new RegExp(errNamespaceScope))
    expect(await policy(keysPlugin)).toMatchObject({
      registry: metadata.appId,
    })
  })

  test('scoped caller writes the sub-account record, not the parent wallet or its own profile', async () => {
    const agent = fixture.algorand.account.random()
    const caller = agent.addr.toString()
    await fixture.algorand.account.ensureFunded(caller, owner, microAlgo(10_000_000))
    await install({
      client: keysPlugin,
      callerType: CallerType.Other,
      caller,
      escrow: 'agent',
      allowances: [{ asset: 0n, type: 'flat', amount: 2_000_000n }],
    })
    await wallet.usePlugin({
      sender: caller,
      signer: agent.signer,
      callerType: CallerType.Other,
      escrow: 'agent',
      fundsRequest: [{ asset: 0n, amount: 1_000_000n }],
      calls: [
        keysPlugin.set({
          sender: caller,
          signer: agent.signer,
          namespace: 'akita.account',
          key: 'image',
          data: image,
          expectedRevision: 0n,
        }),
      ],
    })
    const escrows = await wallet.getEscrows()
    const escrow = escrows.get('agent')!
    expect((await metadata.readRecord(escrow.address, metadataDataKey('akita.account', 'image'))).data).toEqual(image)
    expect((await metadata.readRecord(wallet.client.appAddress.toString(), metadataDataKey('akita.account', 'image'))).exists).toBe(
      false,
    )
    expect((await metadata.readRecord(caller, metadataDataKey('akita.account', 'image'))).exists).toBe(false)
    expect((await fixture.algorand.account.getInformation(escrow.address)).authAddr?.toString()).toBe(
      wallet.client.appAddress.toString(),
    )
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Other,
        escrow: 'agent',
        calls: [keysPlugin.set({ namespace: 'akita.account', key: 'image', data: image, expectedRevision: 0n })],
      }),
    ).rejects.toThrow()
  })

  test('method restrictions can grant set without granting deletion', async () => {
    await install({
      client: keysPlugin,
      callerType: CallerType.Global,
      methods: [{ name: keysPlugin.set(), cooldown: 0n }],
    })
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [keysPlugin.set({ namespace: 'akita.account', key: 'image', data: image, expectedRevision: 0n })],
    })
    const record = await metadata.readRecord(wallet.client.appAddress.toString(), metadataDataKey('akita.account', 'image'))
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [keysPlugin.remove({ namespace: 'akita.account', key: 'image', expectedRevision: record.revision })],
      }),
    ).rejects.toThrow()
    expect((await metadata.readRecord(wallet.client.appAddress.toString(), metadataDataKey('akita.account', 'image'))).revision).toBe(
      record.revision,
    )
  })

  test('a failed scoped call rolls back earlier writes in the same wallet group', async () => {
    await install({ client: keysPlugin, callerType: CallerType.Global })
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          keysPlugin.set({
            namespace: 'akita.account',
            key: 'image',
            data: image,
            expectedRevision: 0n,
            rekeyBack: false,
          }),
          keysPlugin.set({ namespace: 'akita.account', key: 'display-name', data: image, expectedRevision: 0n }),
        ],
      }),
    ).rejects.toThrow(new RegExp(errKeyScope))
    expect((await metadata.readRecord(wallet.client.appAddress.toString(), metadataDataKey('akita.account', 'image'))).exists).toBe(
      false,
    )
  })

  test('policies cannot be reinitialized and malformed policies fail on-chain', async () => {
    await install({ client: keysPlugin, callerType: CallerType.Global })
    await expect(fixture.algorand.send.appCallMethodCall({
      sender: owner, signer: fixture.context.testAccount.signer, appId: keysPlugin.appId,
      method: ABIMethod.fromSignature('create(uint64)void'), args: [metadata.appId],
    })).rejects.toThrow()
    for (const { error, ...scope } of [
      { namespace: '', keys: ['image'], error: errKeysRequireNamespace },
      { namespace: 'valid', keys: [''], error: errInvalidKey },
      { namespace: 'valid', keys: ['image', 'image'], error: errDuplicateScopeKey },
      { namespace: 'valid', keys: ['a'.repeat(64), 'b'.repeat(64)], error: errScopeTooLarge },
    ]) {
      const method = keysPlugin.client.appClient.getABIMethod('configureScope')
      await expect(wallet.usePlugin({ callerType: CallerType.Admin, calls: [() => ({
        appId: keysPlugin.appId, selectors: [method.getSelector()],
        getTxns: async ({ wallet: walletId }) => [{ type: 'methodCall', ...(await keysPlugin.client.params.configureScope({
          sender: owner, signer: fixture.context.testAccount.signer,
          args: { wallet: walletId, rekeyBack: true, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '', ...scope, expectedRevision: (await policy(keysPlugin)).revision },
        })) }],
      })] })).rejects.toThrow(error)
    }
    expect(() => metadataScopeArgs({ type: 'keys', namespace: 'valid', keys: [] })).toThrow()
  })

  test('the maximum encoded key list can be deployed and used within ordinary wallet calls', async () => {
    // 24 keys encode to exactly 124 bytes, including ARC-4 offsets and string lengths.
    const keys = [...Array.from({ length: 23 }, (_, i) => String.fromCharCode(97 + i)), 'xyz']
    const plugin = await newMetaPlugin({
      algorand: fixture.algorand,
      sender: owner,
      signer: fixture.context.testAccount.signer,
      registry: metadata.appId,
    })
    customScopes.set(plugin.appId, { type: 'keys', namespace: 'limits', keys })
    await install({ client: plugin, callerType: CallerType.Global })
    expect((await policy(plugin)).scope).toEqual({ type: 'keys', namespace: 'limits', keys })
    for (const key of [keys[0], keys.at(-1)!]) {
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [plugin.set({ namespace: 'limits', key, data: new Uint8Array(1024), expectedRevision: 0n })],
      })
      const record = await metadata.readRecord(wallet.client.appAddress.toString(), metadataDataKey('limits', key))
      expect(record.data.length).toBe(1024)
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [plugin.remove({ namespace: 'limits', key, expectedRevision: record.revision })],
      })
    }
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(30_000_000) })
    const full = await plugin.setRecord({ wallet, execution: { callerType: CallerType.Global },
      namespace: 'limits', key: keys.at(-1)!, data: new Uint8Array(metadataPluginValueLimit('limits', keys.at(-1)!)).fill(17), expectedRevision: 0n })
    expect(full.transactions.length).toBeLessThanOrEqual(16)
    expect((await metadata.readRecord(wallet.client.appAddress.toString(), metadataDataKey('limits', keys.at(-1)!))).data)
      .toEqual(new Uint8Array(metadataPluginValueLimit('limits', keys.at(-1)!)).fill(17))
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [plugin.set({ namespace: 'limits', key: 'xy', data: image, expectedRevision: 0n })],
      }),
    ).rejects.toThrow(new RegExp(errKeyScope))
  })

  test('root and record operations coexist, with key grants unable to mutate roots', async () => {
    for (const client of [namespacePlugin, keysPlugin])
      await install({ client, callerType: CallerType.Global })
    const address = wallet.client.appAddress.toString()
    const namespace = 'akita.account'
    const tree = createUint64Tree([1n, 2n, 3n])
    const updated = createUint64Tree([4n, 5n, 6n])
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [namespacePlugin.addRoot({ namespace, root: tree.root, type: 0n })],
    })
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [keysPlugin.set({ namespace, key: 'image', data: image, expectedRevision: 0n })],
    })
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [keysPlugin.addData({ namespace, key: 'image', value: 'rooted-image' })],
    })
    expect(await metadata.getData({ address, name: namespace, key: 'image' })).toBe('rooted-image')
    expect(new TextDecoder().decode((await metadata.readRecord(address, metadataDataKey(namespace, 'image'))).data)).toBe('rooted-image')
    expect(
      await metadata.verifiedReadFromTree({ address, name: namespace, tree, index: 0, type: 0n, key: 'image' }),
    ).toBe('rooted-image')
    for (const call of [
      keysPlugin.addRoot({ namespace, root: tree.root, type: 0n }),
      keysPlugin.updateRoot({ namespace, root: updated.root }),
      keysPlugin.deleteRoot({ namespace }),
    ])
      await expect(wallet.usePlugin({ callerType: CallerType.Global, calls: [call] })).rejects.toThrow(
        new RegExp(errRootScope),
      )
    for (const call of [
      keysPlugin.addData({ namespace, key: 'other', value: 'forbidden' }),
      keysPlugin.deleteData({ namespace, key: 'other' }),
    ])
      await expect(wallet.usePlugin({ callerType: CallerType.Global, calls: [call] })).rejects.toThrow(
        new RegExp(errKeyScope),
      )
    await expect(
      wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [namespacePlugin.deleteData({ namespace, key: 'l.type' })],
      }),
    ).rejects.toThrow(errReservedKeyPrefix)
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [namespacePlugin.updateRoot({ namespace, root: updated.root })],
    })
    expect(await metadata.verifyFromTree({ address, name: namespace, tree, index: 0, type: 0n })).toBe(false)
    expect(await metadata.verifyFromTree({ address, name: namespace, tree: updated, index: 0, type: 0n })).toBe(true)
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [keysPlugin.deleteData({ namespace, key: 'image' })],
    })
    expect(await metadata.getData({ address, name: namespace, key: 'image' })).toBeUndefined()
    await wallet.usePlugin({ callerType: CallerType.Global, calls: [namespacePlugin.deleteRoot({ namespace })] })
    expect(await metadata.hasRoot({ address, name: namespace })).toBe(false)
    expect((await metadata.readRecord(address, metadataDataKey(namespace, 'image'))).exists).toBe(false)
    expect((await fixture.algorand.account.getInformation(address)).authAddr).toBeUndefined()
  })

  test('namespace grants reject other roots and global type registration', async () => {
    for (const client of [namespacePlugin, keysPlugin]) {
      await install({ client, callerType: CallerType.Global })
      await expect(
        wallet.usePlugin({
          callerType: CallerType.Global,
          calls: [client.addType({ description: 'forbidden', schemaList: [] })],
        }),
      ).rejects.toThrow(new RegExp(errTypeScope))
    }
    for (const call of [
      namespacePlugin.addRoot({ namespace: 'other', root: new Uint8Array(32), type: 0n }),
      namespacePlugin.updateRoot({ namespace: 'other', root: new Uint8Array(32) }),
      namespacePlugin.deleteRoot({ namespace: 'other' }),
      namespacePlugin.addData({ namespace: 'other', key: 'image', value: 'forbidden' }),
      namespacePlugin.deleteData({ namespace: 'other', key: 'image' }),
    ])
      await expect(wallet.usePlugin({ callerType: CallerType.Global, calls: [call] })).rejects.toThrow(
        new RegExp(errNamespaceScope),
      )
  })

  test('unrestricted grants can register tree types with the existing fee and schema', async () => {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(101_000_000) })
    await install({ client: unrestricted, callerType: CallerType.Global })
    const { typesId } = await metadata.getState()
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        unrestricted.addType({
          description: 'Delegated tree type',
          schemaList: [SchemaPart.Uint64, SchemaPart.Address],
        }),
      ],
    })
    expect(await metadata.getType({ id: typesId })).toEqual({
      description: 'Delegated tree type',
      schema: '(uint64,address)',
    })
  })

  test('root operations use the sub-account spending address and allowance', async () => {
    await install({
      client: namespacePlugin,
      callerType: CallerType.Global,
      escrow: 'tree-agent',
      allowances: [{ asset: 0n, type: 'flat', amount: 1_000_000n }],
    })
    const namespace = 'akita.account'
    const tree = createUint64Tree([7n, 8n])
    await wallet.usePlugin({
      callerType: CallerType.Global,
      escrow: 'tree-agent',
      fundsRequest: [{ asset: 0n, amount: 500_000n }],
      calls: [
        namespacePlugin.addRoot({ namespace, root: tree.root, type: 0n, rekeyBack: false }),
        namespacePlugin.addData({ namespace, key: 'image', value: 'agent-tree' }),
      ],
    })
    const account = (await wallet.getEscrows()).get('tree-agent')!.address
    expect(await metadata.verifyFromTree({ address: account, name: namespace, tree, index: 0, type: 0n })).toBe(true)
    expect(await metadata.getData({ address: account, name: namespace, key: 'image' })).toBe('agent-tree')
    expect(await metadata.hasRoot({ address: wallet.client.appAddress.toString(), name: namespace })).toBe(false)
    expect((await fixture.algorand.account.getInformation(account)).authAddr?.toString()).toBe(
      wallet.client.appAddress.toString(),
    )
  })

  test('a set-only key grant can publish a maximum-size record for a sub-account and restore wallet control', async () => {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(30_000_000) })
    await install({
      client: keysPlugin,
      callerType: CallerType.Global,
      escrow: 'big-agent',
      methods: [{ name: keysPlugin.set(), cooldown: 0n }],
      allowances: [{ asset: 0n, type: 'flat', amount: 20_000_000n }],
    })
    const data = Uint8Array.from({ length: metadataPluginValueLimit('akita.account', 'image') }, (_, i) => i % 251)
    const result = await keysPlugin.setRecord({
      wallet,
      execution: {
        callerType: CallerType.Global,
        escrow: 'big-agent',
        fundsRequest: [{ asset: 0n, amount: 15_000_000n }],
      },
      namespace: 'akita.account',
      key: 'image',
      data,
      expectedRevision: 0n,
    })
    const writes = result.transactions.filter((txn) => txn.applicationCall?.appIndex === keysPlugin.appId)
    expect(writes).toHaveLength(1)
    expect(writes[0].applicationCall!.appArgs.reduce((sum, arg) => sum + arg.length, 0)).toBe(16384)
    expect(result.transactions.length).toBeLessThanOrEqual(16)
    expect(new Set(result.confirmations.map((confirmation) => confirmation.confirmedRound)).size).toBe(1)
    expect(new Set(result.transactions.map((txn) => Buffer.from(txn.group!).toString('base64')))).toEqual(
      new Set([result.groupId]),
    )
    const account = (await wallet.getEscrows()).get('big-agent')!.address
    expect((await metadata.readRecord(account, metadataDataKey('akita.account', 'image'))).data).toEqual(data)
    expect((await metadata.readRecord(wallet.client.appAddress.toString(), metadataDataKey('akita.account', 'image'))).exists).toBe(
      false,
    )
    expect((await fixture.algorand.account.getInformation(account)).authAddr?.toString()).toBe(
      wallet.client.appAddress.toString(),
    )
  })

  test.each([['a', 'b'], ['é'.repeat(14), 'ab']])('fills the plugin argument budget for %s/%s', async (namespace, key) => {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000) })
    await install({ client: unrestricted, callerType: CallerType.Global })
    const limit = metadataPluginValueLimit(namespace, key)
    const data = new Uint8Array(limit).fill(13)
    const result = await unrestricted.setRecord({ wallet, execution: { callerType: CallerType.Global }, namespace, key, data, expectedRevision: 0n })
    const write = result.transactions.find((txn) => txn.applicationCall?.appIndex === unrestricted.appId)!
    expect(write.applicationCall!.appArgs.reduce((sum, arg) => sum + arg.length, 0)).toBe(16384)
    const account = wallet.client.appAddress.toString()
    const recordKey = metadataDataKey(namespace, key)
    const record = await metadata.readRecord(account, recordKey)
    expect(record.data).toEqual(data)
    await expect(unrestricted.setRecord({ wallet, execution: { callerType: CallerType.Global }, namespace, key,
      data: new Uint8Array(limit + 1), expectedRevision: record.revision,
    })).rejects.toThrow(String(limit))
    expect(await metadata.readRecord(account, recordKey)).toEqual(record)
  })

  test.each(['part', 'rekey', 'response'])(
    'ALG-03: atomic wallet publication handles %s failure',
    async (failure) => {
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(30_000_000) })
      await install({
        client: keysPlugin,
        callerType: CallerType.Global,
        methods: [{ name: keysPlugin.set(), cooldown: 0n }],
      })
      const account = wallet.client.appAddress.toString()
      const before = await fixture.algorand.account.getInformation(metadata.client.appAddress)
      const data = new Uint8Array(metadataPluginValueLimit('akita.account', 'image')).fill(19)
      const args = {
        wallet,
        execution: { callerType: CallerType.Global },
        namespace: 'akita.account',
        key: 'image',
        data,
        expectedRevision: 0n,
      }
      const originalCommit = keysPlugin.client.params.set.bind(keysPlugin.client.params)
      const originalSend = wallet.usePlugin.bind(wallet)
      const networkError = new Error('Response lost after confirmed atomic wallet execution')
      const spy =
        failure === 'part'
          ? vi
              .spyOn(keysPlugin.client.params, 'set')
              .mockImplementationOnce((params) => originalCommit({ ...params, args: { ...(params!.args as any), ...metadataDataParts(new Uint8Array(8192)), data3: new Uint8Array(4085) } }))
          : failure === 'rekey'
            ? vi
                .spyOn(keysPlugin.client.params, 'set')
                .mockImplementationOnce((params) => originalCommit({ ...params, args: { ...(params!.args as any), rekeyBack: false } }))
            : vi.spyOn(wallet, 'usePlugin').mockImplementationOnce(async (params) => {
                await originalSend(params)
                throw networkError
              })
      try {
        await expect(keysPlugin.setRecord(args)).rejects.toThrow(
          failure === 'part'
            ? new RegExp(errRecordPartTooLarge)
            : failure === 'rekey'
              ? errAuthAddrMismatch
              : networkError.message,
        )
      } finally {
        spy.mockRestore()
      }
      const record = await metadata.readRecord(account, metadataDataKey(args.namespace, args.key))
      expect(record.exists).toBe(failure === 'response')
      if (failure === 'response') expect(record.data).toEqual(data)
      else {
        const after = await fixture.algorand.account.getInformation(metadata.client.appAddress)
        expect(after.balance.microAlgos).toBe(before.balance.microAlgos)
        expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos)
      }
      // Each path can immediately write again: no hidden draft blocks the key.
      await keysPlugin.setRecord({ ...args, expectedRevision: record.revision })
      expect((await metadata.readRecord(account, metadataDataKey(args.namespace, args.key))).data).toEqual(data)
    },
  )

  test('ALG-01: plugin deletion refunds the record and rejects stale writes', async () => {
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    await install({
      client: keysPlugin,
      callerType: CallerType.Global,
      methods: [
        { name: keysPlugin.set(), cooldown: 0n },
        { name: keysPlugin.remove(), cooldown: 0n },
      ],
    })
    const account = wallet.client.appAddress.toString()
    const before = await fixture.algorand.account.getInformation(account)
    const namespace = 'akita.account'
    const key = 'image'
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [keysPlugin.set({ namespace, key, data: new Uint8Array([1]), expectedRevision: 0n })],
    })
    const record = await metadata.readRecord(account, metadataDataKey(namespace, key))
    await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [keysPlugin.remove({ namespace, key, expectedRevision: record.revision })],
    })
    expect((await metadata.readRecord(account, metadataDataKey(namespace, key))).exists).toBe(false)
    await expect(
      wallet.usePlugin({ callerType: CallerType.Global, calls: [keysPlugin.set({ namespace, key, data: new Uint8Array([2]), expectedRevision: record.revision })] }),
    ).rejects.toThrow(new RegExp(errRecordRevisionMismatch))
    expect((await fixture.algorand.account.getInformation(account)).balance.microAlgos).toBe(before.balance.microAlgos)
  })

  test('atomic large writes enforce namespace and selected-key scopes', async () => {
    await install({ client: keysPlugin, callerType: CallerType.Global })
    for (const scope of [
      { namespace: 'other', key: 'image', error: new RegExp(errNamespaceScope) },
      { namespace: 'akita.account', key: 'other', error: new RegExp(errKeyScope) },
    ]) await expect(keysPlugin.setRecord({ wallet, execution: { callerType: CallerType.Global },
      namespace: scope.namespace, key: scope.key, data: new Uint8Array(metadataPluginValueLimit(scope.namespace, scope.key)), expectedRevision: 0n,
    })).rejects.toThrow(scope.error)
  })
})
