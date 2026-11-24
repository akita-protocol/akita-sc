import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { createAddressTree, MetaSDK, SchemaPart } from 'akita-sdk/meta'
import algosdk from 'algosdk'
import { createHash } from 'node:crypto'
import { beforeAll, describe, expect, test } from 'vitest'
import { CollectibleVariationsSDK } from '../../../akita-sdk/src/collectible-variations'
import { installAccessListResourcePopulator } from '../../../akita-sdk/src/simulate/access-list'
import {
  CollectibleVariationsClient,
  CollectibleVariationsFactory,
} from '../artifacts/collectible-variations/CollectibleVariationsClient'
import { MetaFactory } from '../artifacts/meta/MetaClient'
import { MockAdmitDelegateFactory } from '../artifacts/mocks/collectible-variations/MockAdmitDelegateClient'
import { MockSmartAsaFactory } from '../artifacts/mocks/collectible-variations/MockSmartAsaClient'
import {
  errAssetExists,
  errAssetMissing,
  errBadArgument,
  errBadPurge,
  errBadSmartAsa,
  errDepositMismatch,
  errLocked,
  errNotAuthorized,
  errNotCreator,
  errNotHolder,
  errNotSingleUnit,
  errPreconditionFailed,
  errSourceChanged,
  errSourceMissing,
  errSourceNotAllowed,
  errTooLarge,
} from './errors'

algokit.Config.configure({ populateAppCallResources: true })
installAccessListResourcePopulator()

type Account = TransactionSignerAccount
type Method = keyof ReturnType<CollectibleVariationsClient['newGroup']> & `arcTbd${string}`

const ZERO = algosdk.encodeAddress(new Uint8Array(32))
const SEND = { populateAppCallResources: true } as const
// Inner transactions use fee 0; the outer call covers up to ten of them.
const EXTRA_FEE = microAlgo(10_000)
const IF_ANY = 18446744073709551615n
const enc = (s: string) => new TextEncoder().encode(s)
const be64 = (n: bigint) => {
  const out = new Uint8Array(8)
  new DataView(out.buffer).setBigUint64(0, n)
  return out
}
const concat = (...parts: Uint8Array[]) => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0))
  let at = 0
  for (const p of parts) {
    out.set(p, at)
    at += p.length
  }
  return out
}
const pk = (address: string) => algosdk.decodeAddress(address).publicKey
const sha256 = (b: Uint8Array) => new Uint8Array(createHash('sha256').update(b).digest())
const mbr = (name: number, value: number) => 2500n + 400n * BigInt(name + value)

// Writer sets in their stored encoding.
const CLOSED = new Uint8Array([0])
const OPEN = new Uint8Array([1])
const allow = (...writers: string[]) => concat(new Uint8Array([2, writers.length]), ...writers.map(pk))
const delegate = (app: bigint) => concat(new Uint8Array([3]), be64(app))
const metaSet = (root: Uint8Array) => concat(new Uint8Array([4]), root)

const variationName = (asset: bigint, writer: string, slot: string) => concat(enc('v'), be64(asset), pk(writer), enc(slot))
const assetPolicyName = (asset: bigint) => concat(enc('p'), be64(asset))
const managerPolicyName = (manager: string) => concat(enc('P'), pk(manager))
const grantName = (holder: string) => concat(enc('g'), pk(holder))
const mainName = (asset: bigint) => concat(enc('m'), be64(asset))
const metaRootName = (tag: string, boxName: Uint8Array) => tag + Buffer.from(sha256(boxName).subarray(0, 18)).toString('base64url')

const FLAT = new Uint8Array([1, 0, 2, 2, 4, 1, 2, 3, 4])

describe('Collectible Variations registry', () => {
  const fixture = algorandFixture()
  let algorand: algokit.AlgorandClient
  let dispenser: Account
  let deployer: Account
  let registry: CollectibleVariationsClient
  let metaSdk: MetaSDK
  let metaApp: bigint
  let creator: Account
  let alice: Account
  let bob: Account
  let holder: Account
  let holder2: Account

  const clientFor = (account: Account) =>
    algorand.client.getTypedAppClientById(CollectibleVariationsClient, {
      appId: registry.appId,
      defaultSender: account.addr,
      defaultSigner: account.signer,
    })

  /**
   * The deposit a call needs: simulate it alone and read `cv:deposit:` from the failed call's
   * logs. Zero when the call needs none (or fails for another reason, which `send` then reports).
   */
  async function depositFor(account: Account, method: Method, args: unknown): Promise<bigint> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group = clientFor(account).newGroup() as any
    const composer = await group[method]({ args, staticFee: microAlgo(60_000) }).composer()
    const { transactions } = await composer.buildTransactions()
    const grouped = algosdk.assignGroupID(transactions)
    const request = new algosdk.modelsv2.SimulateRequest({
      txnGroups: [
        new algosdk.modelsv2.SimulateRequestTransactionGroup({
          txns: grouped.map((txn) => new algosdk.SignedTransaction({ txn })),
        }),
      ],
      allowEmptySignatures: true,
      allowUnnamedResources: true,
      allowMoreLogging: true,
      extraOpcodeBudget: 20_000,
    })
    const raw = await algorand.client.algod.simulateTransactions(request).do()
    const prefix = Buffer.from('cv:deposit:')
    for (const result of raw.txnGroups[0].txnResults) {
      for (const entry of result.txnResult.logs ?? []) {
        const log = Buffer.from(entry)
        if (log.length === prefix.length + 8 && log.subarray(0, prefix.length).equals(prefix)) {
          return log.readBigUInt64BE(prefix.length)
        }
      }
    }
    return 0n
  }

  /** Send one registry call, preceded by the deposit it needs (or `pay`, to test mismatches). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function call<T = any>(account: Account, method: Method, args: unknown, pay?: bigint): Promise<{ ret: T; paid: bigint }> {
    const paid = pay ?? (await depositFor(account, method, args))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group = clientFor(account).newGroup() as any
    if (paid > 0n) {
      group.addTransaction(
        await algorand.createTransaction.payment({ sender: account.addr, receiver: registry.appAddress, amount: microAlgo(paid) }),
        account.signer,
      )
    }
    group[method]({ args, extraFee: EXTRA_FEE })
    const result = await group.send(SEND)
    return { ret: result.returns.at(-1) as T, paid }
  }

  const box = async (name: Uint8Array) => {
    try {
      return await algorand.app.getBoxValue(registry.appId, name)
    } catch {
      return undefined
    }
  }
  const balance = async (account: Account | string) =>
    (await algorand.account.getInformation(typeof account === 'string' ? account : account.addr)).balance.microAlgo

  const newAccount = async (algos = 50) => {
    const account = algorand.account.random()
    await algorand.account.ensureFunded(account.addr, dispenser.addr, algokit.algos(algos))
    return account as unknown as Account
  }

  /** A plain ASA whose manager (and so creator) is `owner`. */
  async function mintAsset(owner: Account, total = 1n, decimals = 0, manager: string | undefined = owner.addr.toString()) {
    const { assetId } = await algorand.send.assetCreate({
      sender: owner.addr,
      signer: owner.signer,
      total,
      decimals,
      manager,
    })
    return assetId
  }

  async function give(asset: bigint, from: Account, to: Account, amount = 1n) {
    const info = await algorand.asset.getAccountInformation(to.addr, asset).catch(() => undefined)
    if (!info) await algorand.send.assetOptIn({ sender: to.addr, signer: to.signer, assetId: asset })
    await algorand.send.assetTransfer({ sender: from.addr, signer: from.signer, receiver: to.addr, assetId: asset, amount })
  }

  const writeArgs = (asset: bigint, over: Partial<Record<string, unknown>> = {}) => ({
    asset,
    controllingApp: 0n,
    slot: enc('thumb'),
    holder: ZERO,
    kind: 1,
    sub: 1,
    lock: false,
    flat: FLAT,
    body: new Uint8Array(),
    ifRevision: IF_ANY,
    proof: [] as Uint8Array[],
    ...over,
  })
  const policyArgs = (asset: bigint, over: Partial<Record<string, unknown>> = {}) => ({
    asset,
    controllingApp: 0n,
    collectible: CLOSED,
    holder: CLOSED,
    managerWrites: true,
    holderPinsCollectibleOnly: false,
    lock: false,
    ...over,
  })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.algorand
    deployer = fixture.context.testAccount
    dispenser = (await algorand.account.dispenserFromEnvironment()) as unknown as Account
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, algokit.algos(1000))

    const meta = await algorand.client
      .getTypedAppFactory(MetaFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
      .send.create.create({ args: { version: 'test', akitaDao: 1n } })
    metaApp = meta.appClient.appId
    await algorand.send.payment({ sender: dispenser.addr, receiver: meta.appClient.appAddress, amount: algokit.algos(10) })
    metaSdk = new MetaSDK({
      factoryParams: { appId: metaApp, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      algorand,
    })
    // Type 0 is "unspecified" in Meta, so the writer-list type is 1 here.
    await metaSdk.addType({ description: 'Unspecified', schemaList: [] })
    await metaSdk.addType({ description: 'Collectible writer list', schemaList: [SchemaPart.Address] })

    const created = await algorand.client
      .getTypedAppFactory(CollectibleVariationsFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
      .send.create.create({ args: { metaApp, metaTreeType: 1n } })
    registry = created.appClient
    await algorand.send.payment({ sender: deployer.addr, receiver: registry.appAddress, amount: microAlgo(100_000) })

    creator = await newAccount(200)
    alice = await newAccount()
    bob = await newAccount()
    holder = await newAccount()
    holder2 = await newAccount()
  })

  describe('create', () => {
    test('rejects a zero Meta app or tree type', async () => {
      const factory = algorand.client.getTypedAppFactory(CollectibleVariationsFactory, {
        defaultSender: deployer.addr,
        defaultSigner: deployer.signer,
      })
      await expect(factory.send.create.create({ args: { metaApp, metaTreeType: 0n } })).rejects.toThrow(errBadArgument)
      await expect(factory.send.create.create({ args: { metaApp: 0n, metaTreeType: 1n } })).rejects.toThrow(errBadArgument)
    })

    test('stores its configuration and cannot be updated or deleted', async () => {
      const state = await registry.state.global.getAll()
      expect(state.metaApp).toBe(metaApp)
      expect(state.metaTreeType).toBe(1n)
      await expect(
        algorand.send.appUpdate({
          sender: deployer.addr,
          appId: registry.appId,
          approvalProgram: new Uint8Array([0x0d, 0x81, 0x01]),
          clearStateProgram: new Uint8Array([0x0d, 0x81, 0x01]),
        }),
      ).rejects.toThrow()
      await expect(algorand.send.appDelete({ sender: deployer.addr, appId: registry.appId })).rejects.toThrow()
    })
  })

  describe('collectible-scope writes', () => {
    test('the creator writes under the default policy and pays exactly the box MBR', async () => {
      const asset = await mintAsset(creator)
      const { ret, paid } = await call(creator, 'arcTbdWriteVariation', writeArgs(asset))
      const name = variationName(asset, creator.addr.toString(), 'thumb')
      const value = await box(name)
      expect(value).toBeDefined()
      expect(paid).toBe(mbr(name.length, value!.length))
      expect(ret.changed).toBe(true)
      expect(ret.mbr).toEqual({ sign: 1, amount: paid })
      // format, flags, kind, sub, revision, flatLen, flat
      expect([...value!.subarray(0, 4)]).toEqual([1, 0, 1, 1])
      expect(Buffer.from(value!.subarray(4, 12)).readBigUInt64BE()).toBe(ret.revision)
      expect([...value!.subarray(14)]).toEqual([...FLAT])
    })

    test('a stranger is rejected under the default (closed) policy', async () => {
      const asset = await mintAsset(creator)
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(asset))).rejects.toThrow(errNotAuthorized)
    })

    test('an equal rewrite is a no-op that takes no payment', async () => {
      const asset = await mintAsset(creator)
      const first = await call(creator, 'arcTbdWriteVariation', writeArgs(asset))
      // Same bytes except the revision: the candidate keeps the stored revision, so it is equal.
      const again = await call(creator, 'arcTbdWriteVariation', writeArgs(asset))
      expect(again.paid).toBe(0n)
      expect(again.ret).toEqual({ revision: first.ret.revision, changed: false, mbr: { sign: 0, amount: 0n } })
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset), 1_000n)).rejects.toThrow(errDepositMismatch)
    })

    test('a wrong or missing deposit is rejected', async () => {
      const asset = await mintAsset(creator)
      const deposit = await depositFor(creator, 'arcTbdWriteVariation', writeArgs(asset))
      expect(deposit).toBeGreaterThan(0n)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset), deposit + 1n)).rejects.toThrow(errDepositMismatch)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset), 0n)).rejects.toThrow(errDepositMismatch)
    })

    test('a smaller replacement refunds the difference to the writer', async () => {
      const asset = await mintAsset(creator)
      await call(creator, 'arcTbdWriteVariation', writeArgs(asset, { body: new Uint8Array(100) }))
      const { ret, paid } = await call(creator, 'arcTbdWriteVariation', writeArgs(asset))
      expect(paid).toBe(0n)
      expect(ret.mbr).toEqual({ sign: 255, amount: 40_000n })
    })

    test('ifRevision guards create and replace', async () => {
      const asset = await mintAsset(creator)
      const first = await call(creator, 'arcTbdWriteVariation', writeArgs(asset, { ifRevision: 0n }))
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset, { sub: 2, ifRevision: 0n }))).rejects.toThrow(
        errPreconditionFailed,
      )
      await expect(
        call(creator, 'arcTbdWriteVariation', writeArgs(asset, { sub: 2, ifRevision: first.ret.revision + 1000n })),
      ).rejects.toThrow(errPreconditionFailed)
      const second = await call(creator, 'arcTbdWriteVariation', writeArgs(asset, { sub: 2, ifRevision: first.ret.revision }))
      expect(second.ret.revision).toBeGreaterThan(first.ret.revision)
    })

    test('argument checks', async () => {
      const asset = await mintAsset(creator)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset, { kind: 0 }))).rejects.toThrow(errBadArgument)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset, { slot: new Uint8Array() }))).rejects.toThrow(errBadArgument)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset, { slot: new Uint8Array(24) }))).rejects.toThrow(errBadArgument)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset, { flat: new Uint8Array() }))).rejects.toThrow(errBadArgument)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset, { flat: new Uint8Array(769) }))).rejects.toThrow(errTooLarge)
      // A data entry needs no flat image.
      await call(creator, 'arcTbdWriteVariation', writeArgs(asset, { kind: 3, flat: new Uint8Array(), body: enc('{}') }))
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(999_999_999n))).rejects.toThrow(errAssetMissing)
    })

    test('a locked entry cannot be changed or deleted by its writer, but the creator can evict it', async () => {
      const asset = await mintAsset(creator)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: OPEN }))
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { lock: true }))
      // The no-op still converges under the lock.
      expect((await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { lock: true }))).ret.changed).toBe(false)
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(asset, { sub: 9 }))).rejects.toThrow(errLocked)
      const del = { asset, controllingApp: 0n, writer: alice.addr.toString(), slot: enc('thumb') }
      await expect(call(alice, 'arcTbdDeleteVariation', del)).rejects.toThrow(errNotAuthorized)
      await expect(call(bob, 'arcTbdDeleteVariation', del)).rejects.toThrow(errNotAuthorized)
      const before = await balance(alice)
      const { ret } = await call(creator, 'arcTbdDeleteVariation', del)
      expect(ret.removed).toBe(true)
      expect(ret.reason).toBe(5)
      // The refund goes to the writer, not the creator.
      expect((await balance(alice)) - before).toBe(ret.refund)
    })

    test('the writer deletes an unlocked entry and gets its deposit back; a missing entry is a no-op', async () => {
      const asset = await mintAsset(creator)
      const { paid } = await call(creator, 'arcTbdWriteVariation', writeArgs(asset))
      const del = { asset, controllingApp: 0n, writer: creator.addr.toString(), slot: enc('thumb') }
      const { ret } = await call(creator, 'arcTbdDeleteVariation', del)
      expect(ret).toEqual({ removed: true, reason: 2, refund: paid })
      const again = await call(creator, 'arcTbdDeleteVariation', del)
      expect(again.ret).toEqual({ removed: false, reason: 0, refund: 0n })
    })
  })

  describe('creator policy', () => {
    test('open, allow and managerWrites rules', async () => {
      const asset = await mintAsset(creator)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: allow(alice.addr.toString()), managerWrites: false }))
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset))
      await expect(call(bob, 'arcTbdWriteVariation', writeArgs(asset))).rejects.toThrow(errNotAuthorized)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset))).rejects.toThrow(errNotAuthorized)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: OPEN, managerWrites: false }))
      await call(bob, 'arcTbdWriteVariation', writeArgs(asset))
    })

    test('only the creator sets an asset policy, and the writer sets are validated', async () => {
      const asset = await mintAsset(creator)
      await expect(call(alice, 'arcTbdSetAssetPolicy', policyArgs(asset))).rejects.toThrow(errNotCreator)
      for (const bad of [
        new Uint8Array(),
        new Uint8Array([5]),
        new Uint8Array([0, 0]),
        new Uint8Array([2, 0]),
        allow(...Array(9).fill(alice.addr.toString())),
        delegate(0n),
        metaSet(new Uint8Array(32)),
      ]) {
        await expect(call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: bad }))).rejects.toThrow(errBadArgument)
      }
    })

    test('a manager policy covers every asset of that manager, and an asset policy overrides it', async () => {
      const manager = await newAccount()
      const a = await mintAsset(manager)
      const b = await mintAsset(manager)
      const { ret, paid } = await call(manager, 'arcTbdSetManagerPolicy', {
        collectible: OPEN,
        holder: CLOSED,
        managerWrites: true,
        holderPinsCollectibleOnly: false,
      })
      expect(ret.changed).toBe(true)
      expect(paid).toBe(mbr(33, 12))
      await call(alice, 'arcTbdWriteVariation', writeArgs(a))
      await call(alice, 'arcTbdWriteVariation', writeArgs(b))
      await call(manager, 'arcTbdSetAssetPolicy', policyArgs(b))
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(b, { sub: 5 }))).rejects.toThrow(errNotAuthorized)
      await call(alice, 'arcTbdWriteVariation', writeArgs(a, { sub: 5 }))

      const removed = await call(manager, 'arcTbdDeleteManagerPolicy', {})
      expect(removed.ret).toEqual({ removed: true, reason: 5, refund: paid })
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(a, { sub: 6 }))).rejects.toThrow(errNotAuthorized)
    })

    test('a locked asset policy cannot change, be deleted, or let the creator evict entries', async () => {
      const asset = await mintAsset(creator)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: OPEN, lock: true }))
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset))
      // Re-sending the same locked policy is a no-op.
      expect((await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: OPEN, lock: true }))).ret.changed).toBe(false)
      await expect(call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset))).rejects.toThrow(errLocked)
      await expect(call(creator, 'arcTbdDeleteAssetPolicy', { asset, controllingApp: 0n })).rejects.toThrow(errLocked)
      await expect(
        call(creator, 'arcTbdDeleteVariation', { asset, controllingApp: 0n, writer: alice.addr.toString(), slot: enc('thumb') }),
      ).rejects.toThrow(errNotAuthorized)
    })

    test('the AssetCreator removes creator-side boxes once no creator resolves', async () => {
      const asset = await mintAsset(creator)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: OPEN }))
      // Clear the manager (keeping a reserve, since a config with no addresses is a destroy): no creator resolves.
      await algorand.send.assetConfig({
        sender: creator.addr,
        signer: creator.signer,
        assetId: asset,
        manager: undefined,
        reserve: creator.addr,
      })
      await expect(call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset))).rejects.toThrow(errNotCreator)
      await expect(call(alice, 'arcTbdDeleteAssetPolicy', { asset, controllingApp: 0n })).rejects.toThrow(errNotCreator)
      const { ret } = await call(creator, 'arcTbdDeleteAssetPolicy', { asset, controllingApp: 0n })
      expect(ret.removed).toBe(true)
      expect(ret.reason).toBe(6)
    })
  })

  describe('holder scope', () => {
    test('a holder writes for itself; others and non-holders are rejected', async () => {
      const asset = await mintAsset(creator)
      await give(asset, creator, holder)
      const args = writeArgs(asset, { holder: holder.addr.toString() })
      const { ret, paid } = await call(holder, 'arcTbdWriteVariation', args)
      expect(ret.changed).toBe(true)
      const value = await box(variationName(asset, holder.addr.toString(), 'thumb'))
      expect(paid).toBe(mbr(41 + 5, value!.length))
      expect(value![1]).toBe(0x01)
      expect(algosdk.encodeAddress(value!.subarray(14, 46))).toBe(holder.addr.toString())
      await expect(call(alice, 'arcTbdWriteVariation', args)).rejects.toThrow(errNotAuthorized)
      await expect(call(holder2, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder2.addr.toString() }))).rejects.toThrow(
        errNotHolder,
      )
    })

    test('an asset below one whole unit has no holder', async () => {
      const asset = await mintAsset(creator, 50n, 2)
      await expect(call(creator, 'arcTbdWriteVariation', writeArgs(asset, { holder: creator.addr.toString() }))).rejects.toThrow(
        errNotHolder,
      )
    })

    test('a grant admits writers for entries bound to the granting holder', async () => {
      const asset = await mintAsset(creator)
      await give(asset, creator, holder)
      const granted = await call(holder, 'arcTbdSetGrant', { writers: allow(alice.addr.toString()) })
      expect(granted.paid).toBe(mbr(33, 9 + 34))
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString() }))
      await expect(call(bob, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString() }))).rejects.toThrow(
        errNotAuthorized,
      )
      const removed = await call(holder, 'arcTbdDeleteGrant', {})
      expect(removed.ret).toEqual({ removed: true, reason: 4, refund: granted.paid })
    })

    test('the policy holder set admits writers too', async () => {
      const asset = await mintAsset(creator)
      await give(asset, creator, holder)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { holder: OPEN }))
      await call(bob, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString() }))
    })

    test('a transfer voids holder-scope entries: anyone may delete them and a locked one can be rewritten', async () => {
      const asset = await mintAsset(creator)
      await give(asset, creator, holder)
      await call(holder, 'arcTbdSetGrant', { writers: allow(alice.addr.toString()) })
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString(), lock: true, slot: enc('a') }))
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString(), slot: enc('b') }))
      const delA = { asset, controllingApp: 0n, writer: alice.addr.toString(), slot: enc('a') }
      const delB = { asset, controllingApp: 0n, writer: alice.addr.toString(), slot: enc('b') }
      // While bound, the holder may remove an entry about it.
      expect((await call(holder, 'arcTbdDeleteVariation', delB)).ret.reason).toBe(4)
      await expect(call(bob, 'arcTbdDeleteVariation', delA)).rejects.toThrow(errNotAuthorized)

      await give(asset, holder, holder2)
      await call(holder2, 'arcTbdSetGrant', { writers: allow(alice.addr.toString()) })
      // The void locked entry can be rewritten for the new holder.
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder2.addr.toString(), slot: enc('a') }))
      await call(holder2, 'arcTbdDeleteGrant', {})
      await call(holder, 'arcTbdDeleteGrant', {})
    })

    test('a void entry is deletable by anyone', async () => {
      const asset = await mintAsset(creator)
      await give(asset, creator, holder)
      await call(holder, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString(), lock: true }))
      await give(asset, holder, creator)
      const before = await balance(holder)
      const { ret } = await call(bob, 'arcTbdDeleteVariation', {
        asset,
        controllingApp: 0n,
        writer: holder.addr.toString(),
        slot: enc('thumb'),
      })
      expect(ret.reason).toBe(3)
      expect((await balance(holder)) - before).toBe(ret.refund)
    })
  })

  describe('Meta writer sets', () => {
    test('a meta collectible set stores a registry-owned root and admits writers by proof', async () => {
      const asset = await mintAsset(creator)
      const tree = createAddressTree([pk(alice.addr.toString()), pk(bob.addr.toString())])
      const policyName = assetPolicyName(asset)
      const rootName = metaRootName('c', policyName)
      const rootCost = await metaSdk.rootCosts({ name: rootName })
      const { paid } = await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: metaSet(tree.root) }))
      expect(paid).toBe(mbr(9, 10 + 33 + 1) + rootCost)
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name: rootName })).toEqual(tree.root)

      await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { proof: tree.getProof(0) }))
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(asset, { slot: enc('x'), proof: tree.getProof(1) }))).rejects.toThrow(
        errNotAuthorized,
      )
      await expect(call(holder, 'arcTbdWriteVariation', writeArgs(asset, { proof: tree.getProof(0) }))).rejects.toThrow(errNotAuthorized)

      // A new tree updates the same root in place and costs nothing.
      const next = createAddressTree([pk(holder.addr.toString()), pk(bob.addr.toString())])
      const updated = await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: metaSet(next.root) }))
      expect(updated.paid).toBe(0n)
      expect(updated.ret.mbr).toEqual({ sign: 0, amount: 0n })
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name: rootName })).toEqual(next.root)
      await call(holder, 'arcTbdWriteVariation', writeArgs(asset, { proof: next.getProof(0) }))

      // Deleting the policy deletes the root and refunds both deposits to the creator.
      const removed = await call(creator, 'arcTbdDeleteAssetPolicy', { asset, controllingApp: 0n })
      expect(removed.ret).toEqual({ removed: true, reason: 5, refund: paid })
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name: rootName })).toBeUndefined()
    })

    test('switching away from meta deletes the root and refunds its cost', async () => {
      const asset = await mintAsset(creator)
      const tree = createAddressTree([pk(alice.addr.toString())])
      const rootName = metaRootName('h', assetPolicyName(asset))
      const rootCost = await metaSdk.rootCosts({ name: rootName })
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { holder: metaSet(tree.root) }))
      const { ret } = await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { holder: OPEN }))
      expect(ret.mbr).toEqual({ sign: 255, amount: rootCost + 32n * 400n })
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name: rootName })).toBeUndefined()
    })

    test('a meta grant admits holder-scope writers by proof', async () => {
      const asset = await mintAsset(creator)
      await give(asset, creator, holder)
      const tree = createAddressTree([pk(bob.addr.toString())])
      await call(holder, 'arcTbdSetGrant', { writers: metaSet(tree.root) })
      const name = metaRootName('g', grantName(holder.addr.toString()))
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name })).toEqual(tree.root)
      await call(bob, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString(), proof: tree.getProof(0) }))
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString(), proof: tree.getProof(0) }))).rejects.toThrow(
        errNotAuthorized,
      )
      await call(holder, 'arcTbdDeleteGrant', {})
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name })).toBeUndefined()
    })

    test('a meta manager policy uses the manager policy box name', async () => {
      const manager = await newAccount()
      const asset = await mintAsset(manager)
      const tree = createAddressTree([pk(alice.addr.toString())])
      await call(manager, 'arcTbdSetManagerPolicy', {
        collectible: metaSet(tree.root),
        holder: CLOSED,
        managerWrites: false,
        holderPinsCollectibleOnly: false,
      })
      const name = metaRootName('c', managerPolicyName(manager.addr.toString()))
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name })).toEqual(tree.root)
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { proof: tree.getProof(0) }))
      await call(manager, 'arcTbdDeleteManagerPolicy', {})
    })
  })

  describe('delegate writer sets', () => {
    test('the delegate app decides', async () => {
      const mock = await algorand.client
        .getTypedAppFactory(MockAdmitDelegateFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
        .send.create.bare()
      const asset = await mintAsset(creator)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: delegate(mock.appClient.appId), managerWrites: false }))
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(asset))).rejects.toThrow(errNotAuthorized)
      await mock.appClient.send.setAnswer({ args: { answer: true } })
      await call(alice, 'arcTbdWriteVariation', writeArgs(asset))
    })
  })

  describe('main image', () => {
    test('creator pin, holder pin, fallback after transfer, holder replacement and unpins', async () => {
      const asset = await mintAsset(creator)
      const written = await call(creator, 'arcTbdWriteVariation', writeArgs(asset))
      const pin = { asset, controllingApp: 0n, writer: creator.addr.toString(), slot: enc('thumb'), sourceRevision: written.ret.revision, lock: false }

      await expect(call(alice, 'arcTbdPinMainCreator', pin)).rejects.toThrow(errNotCreator)
      await expect(call(creator, 'arcTbdPinMainCreator', { ...pin, sourceRevision: 1n })).rejects.toThrow(errSourceChanged)
      await expect(call(creator, 'arcTbdPinMainCreator', { ...pin, slot: enc('none') })).rejects.toThrow(errSourceMissing)
      const pinned = await call(creator, 'arcTbdPinMainCreator', pin)
      const main = await box(mainName(asset))
      expect(pinned.paid).toBe(mbr(9, main!.length))
      expect((await call(creator, 'arcTbdPinMainCreator', pin)).ret.changed).toBe(false)

      let view = (await registry.send.arcTbdGetMain({ args: { asset } })).return!
      expect(view.role).toBe(1)
      expect(algosdk.encodeAddress(view.pin.subarray(0, 32))).toBe(creator.addr.toString())
      expect([...view.pin.subarray(66)]).toEqual([...FLAT])

      // Holder pin, from a holder-scope source bound to the holder.
      await give(asset, creator, holder)
      const own = await call(holder, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString(), slot: enc('me') }))
      const holderPin = { asset, writer: holder.addr.toString(), slot: enc('me'), sourceRevision: own.ret.revision }
      await expect(call(alice, 'arcTbdPinMainHolder', holderPin)).rejects.toThrow(errNotHolder)
      const hp = await call(holder, 'arcTbdPinMainHolder', holderPin)
      expect(hp.ret.mbr.sign).toBe(1)
      view = (await registry.send.arcTbdGetMain({ args: { asset } })).return!
      expect(view.role).toBe(2)
      // A creator may not pin a holder-scope source.
      await expect(
        call(creator, 'arcTbdPinMainCreator', { ...pin, writer: holder.addr.toString(), slot: enc('me'), sourceRevision: own.ret.revision }),
      ).rejects.toThrow(errSourceNotAllowed)

      // After a transfer the holder pin is void and the creator pin shows.
      await give(asset, holder, holder2)
      view = (await registry.send.arcTbdGetMain({ args: { asset } })).return!
      expect(view.role).toBe(1)

      // The new holder replaces the void pin: the old holder gets its whole deposit back.
      const before = await balance(holder)
      const replaced = await call(holder2, 'arcTbdPinMainHolder', { ...pin, sourceRevision: written.ret.revision })
      expect(replaced.paid).toBeGreaterThan(0n)
      expect((await balance(holder)) - before).toBe(hp.paid)
      expect((await registry.send.arcTbdGetMain({ args: { asset } })).return!.role).toBe(2)
      await expect(call(alice, 'arcTbdUnpinMainHolder', { asset })).rejects.toThrow(errNotAuthorized)

      // Void again, then anyone clears it; the refund goes to the holder in the section.
      await give(asset, holder2, creator)
      const before2 = await balance(holder2)
      const cleared = await call(alice, 'arcTbdUnpinMainHolder', { asset })
      expect(cleared.ret.reason).toBe(3)
      expect((await balance(holder2)) - before2).toBe(cleared.ret.refund)

      // The creator section is last: unpinning it deletes the box, and the deposits sum to its MBR.
      const last = await call(creator, 'arcTbdUnpinMainCreator', { asset, controllingApp: 0n })
      expect(last.ret.removed).toBe(true)
      expect(await box(mainName(asset))).toBeUndefined()
      expect(last.ret.refund + cleared.ret.refund).toBe(pinned.paid + replaced.paid)
      expect((await registry.send.arcTbdGetMain({ args: { asset } })).return!.role).toBe(0)
    })

    test('a locked creator pin cannot be changed or cleared', async () => {
      const asset = await mintAsset(creator)
      const written = await call(creator, 'arcTbdWriteVariation', writeArgs(asset))
      const pin = { asset, controllingApp: 0n, writer: creator.addr.toString(), slot: enc('thumb'), sourceRevision: written.ret.revision, lock: true }
      await call(creator, 'arcTbdPinMainCreator', pin)
      const other = await call(creator, 'arcTbdWriteVariation', writeArgs(asset, { slot: enc('alt') }))
      await expect(
        call(creator, 'arcTbdPinMainCreator', { ...pin, slot: enc('alt'), sourceRevision: other.ret.revision }),
      ).rejects.toThrow(errLocked)
      await expect(call(creator, 'arcTbdUnpinMainCreator', { asset, controllingApp: 0n })).rejects.toThrow(errLocked)
    })

    test('holder pins need a single-unit asset, and holderPinsCollectibleOnly blocks holder-scope sources', async () => {
      const fungible = await mintAsset(creator, 10n)
      await call(creator, 'arcTbdWriteVariation', writeArgs(fungible))
      await expect(
        call(creator, 'arcTbdPinMainHolder', { asset: fungible, writer: creator.addr.toString(), slot: enc('thumb'), sourceRevision: 0n }),
      ).rejects.toThrow(errNotSingleUnit)

      const asset = await mintAsset(creator)
      await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { holderPinsCollectibleOnly: true }))
      await give(asset, creator, holder)
      const own = await call(holder, 'arcTbdWriteVariation', writeArgs(asset, { holder: holder.addr.toString() }))
      await expect(
        call(holder, 'arcTbdPinMainHolder', { asset, writer: holder.addr.toString(), slot: enc('thumb'), sourceRevision: own.ret.revision }),
      ).rejects.toThrow(errSourceNotAllowed)
    })
  })

  describe('purge after destroy', () => {
    test('anyone purges the boxes of a destroyed asset, refunding their owners', async () => {
      const asset = await mintAsset(creator)
      const tree = createAddressTree([pk(alice.addr.toString())])
      const policy = await call(creator, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: metaSet(tree.root), managerWrites: true }))
      const written = await call(alice, 'arcTbdWriteVariation', writeArgs(asset, { proof: tree.getProof(0) }))
      const pinned = await call(creator, 'arcTbdPinMainCreator', {
        asset,
        controllingApp: 0n,
        writer: alice.addr.toString(),
        slot: enc('thumb'),
        sourceRevision: written.ret.revision,
        lock: true,
      })

      await expect(call(bob, 'arcTbdPurge', { name: variationName(asset, alice.addr.toString(), 'thumb') })).rejects.toThrow(errAssetExists)
      await algorand.send.assetDestroy({ sender: creator.addr, signer: creator.signer, assetId: asset })

      // Writes and deletes on a destroyed asset fail; only purge touches its boxes.
      await expect(call(alice, 'arcTbdWriteVariation', writeArgs(asset))).rejects.toThrow(errAssetMissing)
      for (const bad of [enc('v'), concat(enc('g'), be64(asset)), concat(enc('m'), be64(asset), enc('x')), concat(enc('v'), be64(asset), pk(alice.addr.toString()))]) {
        await expect(call(bob, 'arcTbdPurge', { name: bad })).rejects.toThrow(errBadPurge)
      }

      const aliceBefore = await balance(alice)
      const v = await call(bob, 'arcTbdPurge', { name: variationName(asset, alice.addr.toString(), 'thumb') })
      expect(v.ret).toEqual({ removed: true, reason: 1, refund: written.paid })
      expect((await balance(alice)) - aliceBefore).toBe(written.paid)

      const m = await call(bob, 'arcTbdPurge', { name: mainName(asset) })
      expect(m.ret).toEqual({ removed: true, reason: 1, refund: pinned.paid })

      const rootName = metaRootName('c', assetPolicyName(asset))
      const p = await call(bob, 'arcTbdPurge', { name: assetPolicyName(asset) })
      expect(p.ret).toEqual({ removed: true, reason: 1, refund: policy.paid })
      expect(await metaSdk.getRoot({ address: registry.appAddress.toString(), name: rootName })).toBeUndefined()

      expect((await call(bob, 'arcTbdPurge', { name: assetPolicyName(asset) })).ret).toEqual({ removed: false, reason: 0, refund: 0n })
    })
  })

  describe('ARC-20 Smart ASA creator', () => {
    test('the controlling app names the creator', async () => {
      const factory = algorand.client.getTypedAppFactory(MockSmartAsaFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
      const { appClient: smart } = await factory.send.create.bare()
      await algorand.send.payment({ sender: deployer.addr, receiver: smart.appAddress, amount: algokit.algos(1) })
      const minted = await smart.send.mint({ args: { total: 1n, decimals: 0n, creator: alice.addr.toString() }, extraFee: microAlgo(1000) })
      const asset = minted.return!

      await expect(call(alice, 'arcTbdSetAssetPolicy', policyArgs(asset, { collectible: OPEN }))).rejects.toThrow(errNotCreator)
      await call(alice, 'arcTbdSetAssetPolicy', policyArgs(asset, { controllingApp: smart.appId, collectible: OPEN }))
      await expect(
        call(bob, 'arcTbdSetAssetPolicy', policyArgs(asset, { controllingApp: smart.appId, collectible: CLOSED })),
      ).rejects.toThrow(errNotCreator)
      // A controlling app that is not the clawback is rejected.
      const plain = await mintAsset(creator)
      await expect(call(creator, 'arcTbdSetAssetPolicy', policyArgs(plain, { controllingApp: smart.appId }))).rejects.toThrow(
        errBadSmartAsa,
      )

      await smart.send.setCreator({ args: { creator: bob.addr.toString() } })
      await call(bob, 'arcTbdSetAssetPolicy', policyArgs(asset, { controllingApp: smart.appId, collectible: CLOSED }))
      await call(bob, 'arcTbdDeleteAssetPolicy', { asset, controllingApp: smart.appId })
    })
  })

  describe('SDK', () => {
    test('measures deposits, sends, decodes and cleans up', async () => {
      const sdkFor = (account: Account) =>
        new CollectibleVariationsSDK({
          factoryParams: { appId: registry.appId, defaultSender: account.addr, defaultSigner: account.signer },
          algorand,
        })
      const owner = await newAccount()
      const sdk = sdkFor(owner)
      const asset = await mintAsset(owner)
      expect((await sdk.getEffectivePolicy({ asset })).source).toBe('default')

      const tree = CollectibleVariationsSDK.writerListTree([alice.addr.toString(), bob.addr.toString()])
      const policy = await sdk.setAssetPolicy({ asset, collectible: { mode: 'meta', root: tree.root }, holder: { mode: 'open' } })
      expect(policy.result.changed).toBe(true)
      expect(policy.deposit).toBeGreaterThan(0n)
      const stored = await sdk.getEffectivePolicy({ asset })
      expect(stored.source).toBe('asset')
      expect(stored.policy.collectible).toEqual({ mode: 'meta', root: tree.root })
      expect(stored.policy.holder).toEqual({ mode: 'open' })

      const writer = sdkFor(bob)
      const written = await writer.writeVariation({
        asset,
        slot: 'thumb',
        kind: 1,
        flat: FLAT,
        body: enc('hello'),
        proof: CollectibleVariationsSDK.writerProof(tree, bob.addr.toString()),
      })
      const variation = await sdk.getVariation({ asset, writer: bob.addr.toString(), slot: 'thumb' })
      expect(variation).toMatchObject({ holderScope: false, locked: false, kind: 1, revision: written.result.revision })
      expect(variation!.flat).toEqual(FLAT)
      expect(variation!.body).toEqual(enc('hello'))

      await sdk.pinMainCreator({ asset, writer: bob.addr.toString(), slot: 'thumb', sourceRevision: written.result.revision })
      const main = await sdk.getMain({ asset })
      expect(main.role).toBe(1)
      expect(main.pin).toMatchObject({ writer: bob.addr.toString(), sourceRevision: written.result.revision, kind: 1 })
      const mainBox = await sdk.getMainBox({ asset })
      expect(mainBox!.creatorDeposit).toBeGreaterThan(0n)

      await expect(writer.writeVariation({ asset, slot: 'x', kind: 3, body: enc('{}') })).rejects.toThrow(errNotAuthorized)
      expect((await sdk.unpinMainCreator({ asset })).result.removed).toBe(true)
      expect((await writer.deleteVariation({ asset, writer: bob.addr.toString(), slot: 'thumb' })).result.reason).toBe(2)
      const removed = await sdk.deleteAssetPolicy({ asset })
      expect(removed.result.refund).toBe(policy.deposit)
    })
  })
})
