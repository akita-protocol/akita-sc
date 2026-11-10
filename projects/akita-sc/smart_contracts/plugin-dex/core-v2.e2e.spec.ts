import { AlgorandClient, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress, modelsv2 } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { PluginDexClient, PluginDexComposer, PluginDexFactory } from '../artifacts/plugin-dex/PluginDexClient'
import { MockDexHookClient, MockDexHookFactory } from '../artifacts/plugin-dex/tests/MockDexHookClient'
import {
  MockUpdatableHookClient,
  MockUpdatableHookFactory,
} from '../artifacts/plugin-dex/tests/MockUpdatableHookClient'
import { RecordingDexHookClient, RecordingDexHookFactory } from '../artifacts/plugin-dex/tests/RecordingDexHookClient'
import {
  APP_SPEC as UpdatableHookV2Spec,
  MockUpdatableHookV2Client,
} from '../artifacts/plugin-dex/tests/MockUpdatableHookV2Client'
import { expectContractError } from '../../tests/utils/errors'
import {
  addLiquidity,
  assertEscrowIdentity,
  createPool,
  deployVault,
  emptyBoxRef,
  holding,
  hookInstall,
  largeProgramCreateParams,
  poolConfig,
  readQuotaEmptyRefs,
  SmallProgramLimit,
  transferTxn,
  vaultApprovalLength,
  vaultProgramLength,
} from '../../tests/fixtures/plugin-dex'

// hook points / permissions / flags
const AFTER_INITIALIZE = 1n
const BEFORE_SWAP = 32n
const AFTER_SWAP = 64n
const QUOTE = 128n
const POKE = 256n
const CUSTODY = 1n
const DYNAMIC_FEE = 2n
const HOOK_FEE = 4n
const HOOK_FEE_OUT = 8n
const LAZY_CUSTODY = 1n
// MockDexHook modes
const MODE = {
  pass: 0n,
  steal: 1n,
  donate: 3n,
  setFee: 5n,
  trade: 7n,
  stealBoth: 8n,
  keyreg: 9n,
  requestCustody: 10n,
  hookFeeOut: 11n,
  closeHolding: 18n,
}
const MODE_STEAL_BOTH = MODE.stealBoth
const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const NO_DATA = new Uint8Array()

/** v1 constant-product output for an exact-in swap at `feeBps` */
const expectedOut = (amountIn: bigint, reserveIn: bigint, reserveOut: bigint, feeBps: bigint) => {
  const effective = amountIn - (amountIn * feeBps) / 10_000n
  return (effective * reserveOut) / (reserveIn + effective)
}
const ceilDiv = (a: bigint, b: bigint) => (a + b - 1n) / b

const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** floor(eB · 2^64 / eA) as 16 big-endian bytes, the Vault's native priceX64 */
const priceX64 = (eA: bigint, eB: bigint): Uint8Array => {
  const value = eA === 0n ? 0n : (eB << 64n) / eA
  return Uint8Array.from({ length: 16 }, (_, i) => Number((value >> BigInt(8 * (15 - i))) & 0xffn))
}

/** AVM rejection of an inner app call whose target's version reached rejectVersion (go-algorand ledger/apply) */
const rejectVersionError = (version: bigint) => `app version (${version}) >= reject version (${version})`

const bigEndian8 = (n: bigint) => Array.from({ length: 8 }, (_, i) => Number((n >> BigInt(8 * (7 - i))) & 0xffn))

type InnerTree = { innerTxns?: InnerTree[] }
const countInners = (txn: InnerTree): number =>
  (txn.innerTxns ?? []).reduce((n, inner) => n + 1 + countInners(inner), 0)

describe('PluginDex v2 core', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let trader: TransactionSignerAccount
  let dex: PluginDexClient
  let tka: bigint

  const deployUpdatableHook = async (): Promise<MockUpdatableHookClient> => {
    const hook = (
      await algorand.client
        .getTypedAppFactory(MockUpdatableHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    // box MBR for the recorded context
    await hook.appClient.fundAppAccount({ amount: (1).algo() })
    return hook
  }

  const deployMockHook = async (perms = CUSTODY, funding = 1_000_000n): Promise<MockDexHookClient> => {
    const hook = (
      await algorand.client
        .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await hook.appClient.fundAppAccount({ amount: microAlgo(funding) })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms }, ...send })
    return hook
  }

  /** RecordingDexHook, approved (CUSTODY is the approval ceiling; installs use perms 0); unfunded unless asked */
  const deployRecordingHook = async (funding = 0n): Promise<RecordingDexHookClient> => {
    const hook = (
      await algorand.client
        .getTypedAppFactory(RecordingDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    if (funding > 0n) await hook.appClient.fundAppAccount({ amount: microAlgo(funding) })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms: CUSTODY }, ...send })
    return hook
  }

  const configure = (hook: MockDexHookClient, mode: bigint, value = 0n, value2 = 0n, target = ZERO) =>
    hook.send.configure({ args: { mode, value, value2, target }, ...send })

  /** poke behind an opUp reference carrier: a trading custody hook needs more than one call's 8 references */
  const poke = (poolId: bigint, hookIndex: bigint, data = NO_DATA) =>
    dex
      .newGroup()
      .opUp({ sender: trader.addr, args: [], note: 'reference carrier', maxFee: send.maxFee })
      .poke({ sender: trader.addr, args: { poolId, hookIndex, data }, maxFee: send.maxFee })
      .send(send)

  const quote = async (poolId: bigint, assetIn: bigint, amountIn: bigint, swapper = ZERO, data = NO_DATA) =>
    (await dex.send.quote({ args: { poolId, assetIn, amountIn, swapper, data, wallet: 0n }, ...send })).return!

  /** a funded, liquid pool on (ALGO, tka) */
  const livePool = async (
    config = poolConfig(30n),
    hooks: ReturnType<typeof hookInstall>[] = [],
    amountA = 10_000_000n,
    amountB = 10_000_000n,
  ) => {
    const { poolId, escrow } = await createPool({
      algorand,
      dex,
      sender: admin,
      assetA: 0n,
      assetB: tka,
      config,
      hooks,
      optInLp: [trader],
    })
    await addLiquidity(algorand, dex, trader, poolId, amountA, amountB)
    return { poolId, escrow }
  }

  type Inner = {
    txn: {
      txn: {
        type: string
        applicationCall?: { appIndex?: bigint }
        payment?: { receiver: { toString(): string }; amount: bigint }
      }
    }
    innerTxns?: Inner[]
  }
  /** the Vault frame's direct inner transactions, op-ups (inner app creates) separated out */
  const innerKinds = (confirmation: unknown) => {
    const inners = ((confirmation as { innerTxns?: Inner[] }).innerTxns ?? []) as Inner[]
    const isOpUp = (inner: Inner) => inner.txn.txn.type === 'appl' && !inner.txn.txn.applicationCall?.appIndex
    return {
      all: inners,
      opUps: inners.filter(isOpUp).length,
      work: inners.filter((inner) => !isOpUp(inner)).map((inner) => inner.txn.txn.type),
    }
  }

  /**
   * swap through algokit's resource population. On a hooked pool one opUp() reference carrier goes first:
   * algokit 9.2.2 adds the asset again for every asset holding it places, so a hooked swap overflows the
   * 8 references of one call once the Vault needs a third box ref for its read quota (FINAL-SPEC §10 A11).
   * The swap stays the last transaction of the group.
   */
  const swap = async (poolId: bigint, assetIn: bigint, amountIn: bigint, data = new Uint8Array()) => {
    const pool = await dex.getPool({ args: { poolId } })
    let group = dex.newGroup() as PluginDexComposer<unknown[]>
    if (pool.hookPoints !== 0n) {
      group = group.opUp({ sender: trader.addr, args: [], note: 'reference carrier', maxFee: send.maxFee }) as PluginDexComposer<
        unknown[]
      >
    }
    group = group.swap({
      sender: trader.addr,
      args: {
        input: transferTxn(algorand, trader, getApplicationAddress(pool.escrow).toString(), assetIn, amountIn),
        poolId,
        minAmountOut: 0n,
        recipient: ALGORAND_ZERO_ADDRESS_STRING,
        data,
        wallet: 0n,
      },
      maxFee: send.maxFee,
    }) as PluginDexComposer<unknown[]>
    const result = await group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
    return { ...result, return: result.returns.at(-1) as unknown as bigint | undefined }
  }

  const box = (prefix: string, id: bigint) => ({
    appId: dex.appId,
    name: new Uint8Array([prefix.charCodeAt(0), ...bigEndian8(id)]),
  })

  /**
   * swap with explicit references (escrow, asset, p:/h: boxes, hook apps, plus empty box refs for the read
   * quota of the Vault program above 8,192 B, FINAL-SPEC §10 A11) and a static fee. A call has at most 8
   * references: empty refs that do not fit go on an opUp() reference carrier placed first in the group (it
   * issues no inner transactions; the read quota is group-pooled). Returns the group result and the number
   * of carriers.
   */
  const swapExplicit = async (poolId: bigint, assetIn: bigint, amountIn: bigint, hookApps: bigint[], fee = 60_000n, budgetCalls = 0) => {
    const pool = await dex.getPool({ args: { poolId } })
    const apps = [pool.escrow, ...hookApps]
    const assets = [pool.assetA === 0n ? pool.assetB : pool.assetA, ...(pool.assetA === 0n ? [] : [pool.assetB])]
    const boxes = [box('p', poolId), box('h', poolId)]
    const empty = await readQuotaEmptyRefs(algorand, dex, boxes)
    // app references that do not fit the swap's 8 ride on the carriers too (references are group-shared)
    const room = 8 - assets.length - boxes.length
    const carriedApps = apps.slice(room)
    const inline = Math.min(empty, Math.max(0, room - apps.length))
    let carried = empty - inline
    let group = dex.newGroup() as PluginDexComposer<unknown[]>
    const carriers = Math.ceil((carriedApps.length + carried) / 8) + budgetCalls
    for (let c = 0; c < carriers; c++) {
      const carrierApps = carriedApps.slice(8 * c, 8 * c + 8)
      const carrierBoxes = Math.min(8 - carrierApps.length, carried)
      carried -= carrierBoxes
      group = group.opUp({
        sender: trader.addr,
        args: [],
        note: `reference carrier ${c}`,
        appReferences: carrierApps,
        boxReferences: Array.from({ length: carrierBoxes }, emptyBoxRef),
        staticFee: microAlgo(1_000),
      }) as PluginDexComposer<unknown[]>
    }
    group = group.swap({
      sender: trader.addr,
      args: {
        input: transferTxn(algorand, trader, getApplicationAddress(pool.escrow).toString(), assetIn, amountIn),
        poolId,
        minAmountOut: 0n,
        recipient: ALGORAND_ZERO_ADDRESS_STRING,
        data: new Uint8Array(),
        wallet: 0n,
      },
      appReferences: apps.slice(0, room),
      assetReferences: assets,
      boxReferences: [...boxes, ...Array.from({ length: inline }, emptyBoxRef)],
      staticFee: microAlgo(fee),
    }) as PluginDexComposer<unknown[]>
    const result = await group.send({ populateAppCallResources: false })
    return { ...result, carriers }
  }

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    trader = await localnet.context.generateAccount({ initialFunds: (1_000).algo() })
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (2_000).algo())

    const { assetId } = await algorand.send.assetCreate({
      sender: admin.addr,
      total: 10n ** 15n,
      decimals: 6,
      unitName: 'TKA',
    })
    tka = assetId
    await algorand.send.assetOptIn({ sender: trader.addr, assetId: tka })
    await algorand.send.assetTransfer({ sender: admin.addr, receiver: trader.addr, assetId: tka, amount: 10n ** 12n })

    dex = await deployVault({ algorand, sender: admin })
  })

  describe('p0', () => {
    test('(a) the Vault is above 8,192 B and deploys with extra pages, box refs and a static fee', async () => {
      const approval = vaultApprovalLength()
      console.log(`[p0] PluginDex approval ${approval} B, approval+clear ${vaultProgramLength()} B`)
      expect(vaultProgramLength()).toBeGreaterThan(SmallProgramLimit)

      const info = await algorand.client.algod.getApplicationByID(dex.appId).do()
      expect(Number(info.params!.extraProgramPages)).toBe(7)
      expect(info.params!.approvalProgram.length).toBe(approval)
      expect(await dex.state.global.version()).toBe('test')
    })

    test('(a) creating it without write budget, or with the minimum fee, is rejected', async () => {
      const factory = algorand.client.getTypedAppFactory(PluginDexFactory, {
        defaultSender: admin.addr,
        defaultSigner: admin.signer,
      })
      const { boxReferences, staticFee } = largeProgramCreateParams(vaultProgramLength())
      const create = (refs: typeof boxReferences, fee: bigint) =>
        factory.send.create.create({
          args: { version: 'p0', admin: admin.addr.toString() },
          extraProgramPages: 7,
          boxReferences: refs,
          staticFee: microAlgo(fee),
          populateAppCallResources: false,
        })
      await expect(create([], staticFee!.microAlgo)).rejects.toThrow(/write budget/)
      // the creating txn's minimum fee rises with the program size (FINAL-SPEC §1)
      const lowFee = await create(boxReferences, 1_000n).then(
        () => undefined,
        (error: Error) => error.message,
      )
      console.log(`[p0] create at the minimum fee: ${lowFee?.slice(0, 200)}`)
      expect(lowFee).toBeDefined()
      // the fixture's parameters are sufficient
      const { appClient } = await create(boxReferences, staticFee!.microAlgo)
      expect(appClient.appId).toBeGreaterThan(0n)
    })

    describe('(b) version pinning with rejectVersion, (c) HookContext ABI round trip', () => {
      let pinned: MockUpdatableHookClient
      let control: MockUpdatableHookClient
      let pinnedPool: bigint
      let controlPool: bigint

      beforeAll(async () => {
        pinned = await deployUpdatableHook()
        control = await deployUpdatableHook()
        for (const hook of [pinned, control]) {
          await dex.send.setHookApproval({ args: { hook: hook.appId, perms: CUSTODY }, ...send })
          expect(await dex.getHookApproval({ args: { hook: hook.appId } })).toEqual({ perms: CUSTODY, version: 0n })
        }
        const hooks = (app: bigint) => [hookInstall({ app, points: BEFORE_SWAP | AFTER_SWAP, perms: 0n })]
        ;({ poolId: pinnedPool } = await createPool({
          algorand,
          dex,
          sender: admin,
          assetA: 0n,
          assetB: tka,
          config: poolConfig(30n),
          hooks: hooks(pinned.appId),
        }))
        ;({ poolId: controlPool } = await createPool({
          algorand,
          dex,
          sender: admin,
          assetA: 0n,
          assetB: tka,
          config: poolConfig(30n),
          hooks: hooks(control.appId),
        }))
        for (const poolId of [pinnedPool, controlPool])
          await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)
        // the generated client returns HookConfig[] elements as [app, version, points, perms, flags]
        expect((await dex.getPoolHooks({ args: { poolId: pinnedPool } }))[0]).toEqual([
          pinned.appId,
          0n,
          BEFORE_SWAP | AFTER_SWAP,
          0n,
          0n,
        ])
      })

      test('(b) a pinned, un-updated hook is callable', async () => {
        await swap(pinnedPool, 0n, 100_000n)
        expect(await pinned.state.global.calls()).toBe(2n)
        await assertEscrowIdentity(algorand, dex, pinnedPool)
      })

      test('(c) the hook receives the exact HookContext (bytes<16> prices, nested CurveSnapshot, data)', async () => {
        const before = await dex.getPool({ args: { poolId: controlPool } })
        const data = new Uint8Array([0xde, 0xad, 0xbe, 0xef])
        const { return: out } = await swap(controlPool, 0n, 250_000n, data)
        const after = await dex.getPool({ args: { poolId: controlPool } })
        const ctx = await control.lastContext()

        expect(ctx.point).toBe(AFTER_SWAP)
        expect(ctx.poolId).toBe(controlPool)
        expect(ctx.curve).toBe(0n)
        expect(ctx.escrow).toBe(getApplicationAddress(before.escrow).toString())
        expect(ctx.caller).toBe(trader.addr.toString())
        expect(ctx.callerApp).toBe(0n)
        expect(ctx.recipient).toBe(trader.addr.toString())
        expect([ctx.assetIn, ctx.assetOut]).toEqual([0n, tka])
        expect([ctx.exactIn, ctx.custody]).toEqual([true, false])
        expect([ctx.amountIn, ctx.amountOut]).toEqual([250_000n, out])
        expect([ctx.reserveIn, ctx.reserveOut]).toEqual([after.reserveA, after.reserveB])
        expect([ctx.feeBps, ctx.custodyFeeBps, ctx.lpSupply]).toEqual([30n, 30n, before.lpSupply])
        expect(ctx.before).toEqual({
          priceX64: priceX64(before.reserveA, before.reserveB),
          activeId: 0n,
          liquidity: 0n,
          flags: 0n,
        })
        expect(ctx.after).toEqual({
          priceX64: priceX64(after.reserveA, after.reserveB),
          activeId: 0n,
          liquidity: 0n,
          flags: 0n,
        })
        expect(Buffer.from(ctx.before.priceX64).equals(Buffer.from(ctx.after.priceX64))).toBe(false)
        expect(ctx.curveData).toEqual(new Uint8Array())
        expect(ctx.data).toEqual(data)

        // pure ABI echo with every field non-trivial
        const probe = {
          ...ctx,
          before: {
            priceX64: Uint8Array.from({ length: 16 }, (_, i) => 255 - i),
            activeId: 2n ** 63n,
            liquidity: 7n,
            flags: 3n,
          },
          after: {
            priceX64: Uint8Array.from({ length: 16 }, (_, i) => i + 1),
            activeId: 1n,
            liquidity: 2n ** 64n - 1n,
            flags: 0n,
          },
          custody: true,
          // the §6.12 field right after callerApp round-trips at full width
          wallet: 2n ** 64n - 2n,
          curveData: new Uint8Array([1, 2, 3]),
        }
        expect(await control.echo({ args: { ctx: probe } })).toEqual(probe)
      })

      test('(b) after an update to a working program, only rejectVersion stops the pinned pool', async () => {
        // update to MockUpdatableHookV2: the same hook logic plus one read-only method, so the program
        // (and Application.version) changes but the hook still answers akitaDexHook with a valid ABI return
        await algorand.send.appUpdateMethodCall({
          sender: admin.addr,
          signer: admin.signer,
          appId: pinned.appId,
          method: pinned.appClient.getABIMethod('update'),
          args: [],
          approvalProgram: Buffer.from(UpdatableHookV2Spec.byteCode!.approval, 'base64'),
          clearStateProgram: Buffer.from(UpdatableHookV2Spec.byteCode!.clear, 'base64'),
        })
        const info = await algorand.client.algod.getApplicationByID(pinned.appId).do()
        console.log(`[p0] updated hook app version: ${info.params!.version}`)
        expect(BigInt(info.params!.version ?? 0)).toBe(1n)
        // positive control: the app now runs the V2 program
        const updated = algorand.client.getTypedAppClientById(MockUpdatableHookV2Client, {
          appId: pinned.appId,
          defaultSender: admin.addr,
          defaultSigner: admin.signer,
        })
        expect(await updated.codeVersion()).toBe(2n)

        // the pool pinned to version 0 calls with rejectVersion = 1: the AVM refuses the inner call
        const callsBefore = await pinned.state.global.calls()
        await expectContractError(swap(pinnedPool, 0n, 100_000n), rejectVersionError(1n))
        expect(await pinned.state.global.calls()).toBe(callsBefore)

        await swap(controlPool, 0n, 100_000n)
        await assertEscrowIdentity(algorand, dex, controlPool)
      })

      test('(b) createPool rejects a hook whose version moved past its approval', async () => {
        await expectContractError(
          createPool({
            algorand,
            dex,
            sender: admin,
            assetA: 0n,
            assetB: tka,
            config: poolConfig(30n),
            hooks: [hookInstall({ app: pinned.appId, points: AFTER_SWAP, perms: 0n })],
          }),
          'errPdvr',
        )
      })

      test('(b) the updated program works as a hook once re-approved; the old pool stays pinned', async () => {
        await dex.send.setHookApproval({ args: { hook: pinned.appId, perms: CUSTODY }, ...send })
        expect(await dex.getHookApproval({ args: { hook: pinned.appId } })).toEqual({ perms: CUSTODY, version: 1n })
        const { poolId } = await createPool({
          algorand,
          dex,
          sender: admin,
          assetA: 0n,
          assetB: tka,
          config: poolConfig(30n),
          hooks: [hookInstall({ app: pinned.appId, points: BEFORE_SWAP | AFTER_SWAP, perms: 0n })],
        })
        await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)
        const callsBefore = await pinned.state.global.calls()
        await swap(poolId, 0n, 100_000n)
        expect(await pinned.state.global.calls()).toBe((callsBefore ?? 0n) + 2n)
        await assertEscrowIdentity(algorand, dex, poolId)

        // the re-approval only affects later pools: the version-0 pool is still refused by the AVM
        await expectContractError(swap(pinnedPool, 0n, 100_000n), rejectVersionError(1n))
      })

      test('§4.12 (1) a pool pinned to a stale hook version still lets LPs exit once paused', async () => {
        const pool = await dex.getPool({ args: { poolId: pinnedPool } })
        await dex.send.setPoolPaused({ args: { poolId: pinnedPool, paused: true }, ...send })
        const lp = await holding(algorand, trader.addr.toString(), pool.lpAsset)
        expect(lp).toBeGreaterThan(0n)
        const { return: out } = await dex.send.emergencyRemoveLiquidity({
          sender: trader.addr,
          args: {
            lpTransfer: algorand.createTransaction.assetTransfer({
              sender: trader.addr,
              receiver: dex.appAddress,
              assetId: pool.lpAsset,
              amount: lp,
            }),
            poolId: pinnedPool,
            minAmountA: 0n,
            minAmountB: 0n,
          },
          ...send,
        })
        expect(out!.amountA).toBe((lp * pool.reserveA) / pool.lpSupply)
        expect(out!.amountB).toBe((lp * pool.reserveB) / pool.lpSupply)
        await assertEscrowIdentity(algorand, dex, pinnedPool)
      })

      test('§4.12 (1) revoking an approval leaves existing pools working and blocks new installs', async () => {
        await dex.send.setHookApproval({ args: { hook: control.appId, perms: 0n }, ...send })
        expect(await dex.getHookApproval({ args: { hook: control.appId } })).toEqual({ perms: 0n, version: 0n })
        const callsBefore = (await control.state.global.calls())!
        await swap(controlPool, 0n, 100_000n)
        expect(await control.state.global.calls()).toBe(callsBefore + 2n)
        await assertEscrowIdentity(algorand, dex, controlPool)
        await expectContractError(
          createPool({
            algorand,
            dex,
            sender: admin,
            assetA: 0n,
            assetB: tka,
            config: poolConfig(30n),
            hooks: [hookInstall({ app: control.appId, points: AFTER_SWAP, perms: 0n })],
          }),
          'errPdha',
        )
      })
    })

    test('(d) the Vault itself issues more than 16 inner transactions in one app call, without carriers', async () => {
      const hooks: bigint[] = []
      for (let i = 0; i < 4; i++) hooks.push((await deployMockHook()).appId)
      const { poolId } = await createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config: poolConfig(30n),
        hooks: hooks.map((app) => hookInstall({ app, points: BEFORE_SWAP | AFTER_SWAP, perms: CUSTODY })),
        optInLp: [trader],
      })
      await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)

      // explicit references: algokit's resource population regroups this call incorrectly ("incomplete group")
      const result = await swapExplicit(poolId, 0n, 100_000n, hooks)
      // the group is [input payment, swap] plus only reference carriers (read quota, A11): none for inner slots
      expect(result.transactions.length).toBe(2 + result.carriers)
      for (const carrier of result.confirmations.slice(0, result.carriers)) {
        expect((carrier as unknown as InnerTree).innerTxns ?? []).toHaveLength(0)
      }
      const appCall = result.confirmations[result.confirmations.length - 1] as unknown as InnerTree
      const direct = (appCall.innerTxns ?? []).length
      const total = countInners(appCall)
      console.log(`[p0] inner transactions issued by the Vault itself: ${direct}; including descendants: ${total}`)
      // issued by the Vault frame: 4 hooks × 2 points × (escrow rekey + hook call) + payout
      expect(direct).toBe(17)
      expect(direct).toBeGreaterThan(16)
      // plus each hook's own rekey back (issued inside its appl)
      expect(total).toBe(25)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('custody guard', () => {
    test('a custody delta that is negative on both sides fails with errPdki (native pool)', async () => {
      const hook = await deployMockHook()
      await hook.send.optIn({ args: { asset: tka }, ...send })
      const { poolId } = await createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config: poolConfig(30n),
        hooks: [hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY })],
        optInLp: [trader],
      })
      await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)

      // 1 µALGO of A and 1% of B. Read as "gain B, lose A" (the pre-fix classification) this passes the
      // fee-adjusted k check: (1e7 + 1e5 − fee)·(1e7 − 1) ≥ 1e14
      await hook.send.configure({
        args: { mode: MODE_STEAL_BOTH, value: 1n, value2: 100_000n, target: ALGORAND_ZERO_ADDRESS_STRING },
        ...send,
      })
      await expectContractError(
        dex.send.poke({ sender: trader.addr, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send }),
        'errPdki',
      )

      // the same hook taking only B (one-sided theft) also fails, and a pass leaves the pool intact
      await hook.send.configure({
        args: { mode: MODE_STEAL_BOTH, value: 0n, value2: 100_000n, target: ALGORAND_ZERO_ADDRESS_STRING },
        ...send,
      })
      await expectContractError(
        dex.send.poke({ sender: trader.addr, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send }),
        'errPdki',
      )
      await hook.send.configure({
        args: { mode: 0n, value: 0n, value2: 0n, target: ALGORAND_ZERO_ADDRESS_STRING },
        ...send,
      })
      await dex.send.poke({ sender: trader.addr, args: { poolId, hookIndex: 0n, data: new Uint8Array() }, ...send })
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('budget', () => {
    /** simulate one Vault call at the real budget (no extra opcode budget) and return its txn result */
    type Simulatable = {
      simulate(options: {
        allowUnnamedResources: boolean
        skipSignatures: boolean
      }): Promise<{ simulateResponse: modelsv2.SimulateResponse }>
    }
    const measure = async (build: (group: ReturnType<PluginDexClient['newGroup']>) => Simulatable, index: number) => {
      const result = await build(dex.newGroup()).simulate({ allowUnnamedResources: true, skipSignatures: true })
      const group = result.simulateResponse.txnGroups[0]
      expect(group.failureMessage).toBeUndefined()
      return group.txnResults[index]
    }

    test('hookless native swap, addLiquidity and removeLiquidity fit one app call (700) without op-ups', async () => {
      const { poolId, escrow } = await livePool()
      const pool = await dex.getPool({ args: { poolId } })

      const swapResult = await measure(
        (group) =>
          group.swap({
            sender: trader.addr,
            args: {
              input: transferTxn(algorand, trader, escrow, 0n, 100_000n),
              poolId,
              minAmountOut: 0n,
              recipient: ZERO,
              data: NO_DATA,
              wallet: 0n,
            },
            staticFee: microAlgo(2_000),
          }),
        1,
      )
      const addResult = await measure(
        (group) =>
          group.addLiquidity({
            sender: trader.addr,
            args: {
              depositA: transferTxn(algorand, trader, escrow, 0n, 1_000_000n),
              depositB: transferTxn(algorand, trader, escrow, tka, 1_000_000n),
              poolId,
              minLpOut: 0n,
              data: NO_DATA,
            },
            staticFee: microAlgo(2_000),
          }),
        2,
      )
      const removeResult = await measure(
        (group) =>
          group.removeLiquidity({
            sender: trader.addr,
            args: {
              lpTransfer: algorand.createTransaction.assetTransfer({
                sender: trader.addr,
                receiver: dex.appAddress,
                assetId: pool.lpAsset,
                amount: 10_000n,
              }),
              poolId,
              minAmountA: 0n,
              minAmountB: 0n,
              data: NO_DATA,
            },
            staticFee: microAlgo(3_000),
          }),
        1,
      )
      const used = [swapResult, addResult, removeResult].map((result) => Number(result.appBudgetConsumed))
      console.log(
        `[budget] hookless native swap ${used[0]}, addLiquidity ${used[1]}, removeLiquidity ${used[2]} opcodes`,
      )
      for (const [i, result] of [swapResult, addResult, removeResult].entries()) {
        expect(used[i]).toBeLessThanOrEqual(700)
        expect(innerKinds(result.txnResult).opUps).toBe(0)
      }
      expect(innerKinds(swapResult.txnResult).work).toEqual(['axfer'])
    })

    test('a hookless addLiquidity off the pool ratio (one side refunded) completes without the caller adding budget', async () => {
      const { poolId, escrow } = await livePool()
      // each direction leaves an excess of the other asset that the Vault refunds from the escrow
      for (const [amountA, amountB] of [
        [1_000_000n, 5_000_000n],
        [5_000_000n, 1_000_000n],
      ]) {
        await measure(
          (group) =>
            group.addLiquidity({
              sender: trader.addr,
              args: {
                depositA: transferTxn(algorand, trader, escrow, 0n, amountA),
                depositB: transferTxn(algorand, trader, escrow, tka, amountB),
                poolId,
                minLpOut: 0n,
                data: NO_DATA,
              },
              staticFee: microAlgo(4_000),
            }),
          2,
        )
      }
    })

    test('(L8) an AfterSwap-only hooked swap sent as a bare [input, swap] group tops up its own budget', async () => {
      const hook = await deployRecordingHook(1_000_000n)
      const { poolId, escrow } = await livePool(poolConfig(30n), [
        hookInstall({ app: hook.appId, points: AFTER_SWAP, perms: 0n }),
      ])

      // no carrier in the group: before L8 the swap path into runHooks spent the whole 700 and failed
      // with "dynamic cost budget exceeded" before the first in-loop checkpoint
      const swapResult = await measure(
        (group) =>
          group.swap({
            sender: trader.addr,
            args: {
              input: transferTxn(algorand, trader, escrow, 0n, 100_000n),
              poolId,
              minAmountOut: 0n,
              recipient: ZERO,
              data: NO_DATA,
              wallet: 0n,
            },
            staticFee: microAlgo(10_000),
          }),
        1,
      )
      expect(innerKinds(swapResult.txnResult).opUps).toBeGreaterThan(0)
    })
  })

  describe('§4.12 (2) F6: hook funding and initData', () => {
    let r1: RecordingDexHookClient
    let r2: RecordingDexHookClient

    /** createPool through the generated client; the refund is the inner payment back to the payer */
    const createPoolRaw = async (payment: bigint, hooks: ReturnType<typeof hookInstall>[]) => {
      // one opUp() carrier: the recording hooks' own boxes push the call past 8 references
      const result = await dex
        .newGroup()
        .createPool({
          sender: admin.addr,
          args: {
            payment: algorand.createTransaction.payment({
              sender: admin.addr,
              receiver: dex.appAddress,
              amount: microAlgo(payment),
            }),
            assetA: 0n,
            assetB: tka,
            config: poolConfig(30n),
            hooks,
            externals: [],
          },
          maxFee: send.maxFee,
        })
        .opUp({ sender: admin.addr, args: [], maxFee: send.maxFee })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
      const refund = innerKinds(result.confirmations[1]).all.filter(
        (inner) => inner.txn.txn.type === 'pay' && inner.txn.txn.payment!.receiver.toString() === admin.addr.toString(),
      )
      return {
        poolId: result.returns[0]!,
        refund: refund.reduce((sum, inner) => sum + inner.txn.txn.payment!.amount, 0n),
      }
    }

    const installs = (f1: bigint, f2: bigint, d1 = new Uint8Array([1, 2, 3]), d2 = new Uint8Array([9])) => [
      hookInstall({ app: r1.appId, points: AFTER_INITIALIZE, perms: 0n, funding: f1, initData: d1 }),
      hookInstall({ app: r2.appId, points: AFTER_INITIALIZE | BEFORE_SWAP, perms: 0n, funding: f2, initData: d2 }),
    ]

    beforeAll(async () => {
      r1 = await deployRecordingHook()
      r2 = await deployRecordingHook()
      // warm the (ALGO, tka) pair index so every later pool grows it by the same 8 bytes
      await createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(30n) })
    })

    test('each hook receives exactly its funding before AfterInitialize, and only its own initData', async () => {
      const { poolId } = await createPoolRaw(5_000_000n, installs(1_000_000n, 600_000n))
      const rec1 = await r1.record({ args: { point: AFTER_INITIALIZE } })
      const rec2 = await r2.record({ args: { point: AFTER_INITIALIZE } })
      expect(rec1.balance).toBe(1_000_000n)
      expect(rec2.balance).toBe(600_000n)
      expect(rec1.ctx.data).toEqual(new Uint8Array([1, 2, 3]))
      expect(rec2.ctx.data).toEqual(new Uint8Array([9]))
      // §6.12: no wallet hint at liquidity / initialize points
      expect([rec1.ctx.wallet, rec2.ctx.wallet]).toEqual([0n, 0n])
      expect([rec1.ctx.point, rec1.ctx.poolId, rec1.ctx.caller, rec1.ctx.custody]).toEqual([
        AFTER_INITIALIZE,
        poolId,
        admin.addr.toString(),
        false,
      ])
      expect(await r1.state.global.calls()).toBe(1n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('the required payment includes Σfunding: underpaying by 1 µALGO fails with errPdip', async () => {
      const funded = await createPoolRaw(10_000_000n, installs(1_000_000n, 600_000n))
      const unfunded = await createPoolRaw(10_000_000n, installs(0n, 0n))
      const required = 10_000_000n - funded.refund
      expect(required - (10_000_000n - unfunded.refund)).toBe(1_600_000n)

      await expectContractError(createPoolRaw(required - 1n, installs(1_000_000n, 600_000n)), 'errPdip')
      const exact = await createPoolRaw(required, installs(1_000_000n, 600_000n))
      expect(exact.refund).toBe(0n)
    })

    test('a hook that rejects its initData reverts the creation', async () => {
      await expectContractError(
        createPoolRaw(5_000_000n, installs(1_000_000n, 600_000n, new Uint8Array(Buffer.from('reject')))),
        'errRecInit',
      )
    })
  })

  describe('§4.12 (3) custodyFeeBps', () => {
    let hook: MockDexHookClient
    const TAKE = 100_000n

    /** ALGO a trade taking `take` of B must pay for k to hold with no fee: ceil(A·B/(B − take)) − A */
    const fairAlgo = (a: bigint, b: bigint, take: bigint) => ceilDiv(a * b, b - take) - a
    /** smallest G with (A + G − ceil(G·fee/1e4))·(B − take) ≥ A·B (the Vault's fee-adjusted k check) */
    const minAlgoWithFee = (a: bigint, b: bigint, take: bigint, fee: bigint) => {
      const ok = (g: bigint) => (a + g - ceilDiv(g * fee, 10_000n)) * (b - take) >= a * b
      let lo = fairAlgo(a, b, take)
      let hi = lo * 2n
      while (lo < hi) {
        const mid = (lo + hi) / 2n
        if (ok(mid)) hi = mid
        else lo = mid + 1n
      }
      return lo
    }

    beforeAll(async () => {
      hook = await deployMockHook(CUSTODY, 5_000_000n)
      await hook.send.optIn({ args: { asset: tka }, ...send })
    })

    test('a trade at the fee-free fair price fails with custodyFeeBps 30 and passes with custodyFeeBps 0', async () => {
      const install = [hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY })]
      const { poolId: feePool } = await livePool(poolConfig(30n), install)
      const { poolId: freePool } = await livePool(poolConfig(30n, { custodyFeeBps: 0n }), install)

      const pool = await dex.getPool({ args: { poolId: feePool } })
      const fair = fairAlgo(pool.reserveA, pool.reserveB, TAKE)
      await configure(hook, MODE.trade, TAKE, fair)
      await expectContractError(poke(feePool, 0n), 'errPdki')

      const free = await dex.getPool({ args: { poolId: freePool } })
      expect(fairAlgo(free.reserveA, free.reserveB, TAKE)).toBe(fair)
      await poke(freePool, 0n)
      const after = await dex.getPool({ args: { poolId: freePool } })
      expect([after.reserveA, after.reserveB]).toEqual([free.reserveA + fair, free.reserveB - TAKE])
      await assertEscrowIdentity(algorand, dex, freePool)
    })

    test('with custodyFeeBps 30 the cheapest passing trade pays the fee: one µALGO less fails', async () => {
      const { poolId } = await livePool(poolConfig(30n), [
        hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY }),
      ])
      const pool = await dex.getPool({ args: { poolId } })
      const fair = fairAlgo(pool.reserveA, pool.reserveB, TAKE)
      const min = minAlgoWithFee(pool.reserveA, pool.reserveB, TAKE, 30n)
      // the fee is ~30 bps of the gain on top of the fee-free price
      expect(min).toBeGreaterThan(fair + (fair * 29n) / 10_000n)
      expect(min).toBeLessThanOrEqual(fair + ceilDiv(fair * 31n, 10_000n) + 1n)

      await configure(hook, MODE.trade, TAKE, min - 1n)
      await expectContractError(poke(poolId, 0n), 'errPdki')
      await configure(hook, MODE.trade, TAKE, min)
      await poke(poolId, 0n)
      const after = await dex.getPool({ args: { poolId } })
      expect([after.reserveA, after.reserveB]).toEqual([pool.reserveA + min, pool.reserveB - TAKE])
      await assertEscrowIdentity(algorand, dex, poolId)
      await configure(hook, MODE.pass)
    })
  })

  describe('§4.12 (4) lazy custody', () => {
    let hook: MockDexHookClient
    let poolId: bigint
    let escrow: string

    beforeAll(async () => {
      hook = await deployMockHook(CUSTODY, 2_000_000n)
      ;({ poolId, escrow } = await livePool(poolConfig(30n), [
        hookInstall({ app: hook.appId, points: BEFORE_SWAP, perms: CUSTODY, flags: LAZY_CUSTODY }),
      ]))
    })

    test('a lazy hook that does not ask for custody costs one inner call and the escrow is never rekeyed', async () => {
      await configure(hook, MODE.pass)
      const callsBefore = (await hook.state.global.calls())!
      const result = await swap(poolId, 0n, 100_000n)
      const { work, all } = innerKinds(result.confirmations.at(-1))
      // [hook call, payout]: no escrow rekey payment
      expect(work).toEqual(['appl', 'axfer'])
      expect(all.some((inner) => inner.txn.txn.type === 'pay')).toBe(false)
      expect(await hook.state.global.calls()).toBe(callsBefore + 1n)
      expect((await algorand.account.getInformation(escrow)).authAddr?.toString()).toBe(dex.appAddress.toString())
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('RequestCustody then steal fails with errPdki', async () => {
      await configure(hook, MODE.requestCustody, 1_000n, MODE.steal)
      await expectContractError(swap(poolId, 0n, 100_000n), 'errPdki')
    })

    test('RequestCustody then donate is called twice and the donation is booked before the swap math', async () => {
      await configure(hook, MODE.requestCustody, 50_000n, MODE.donate)
      const before = await dex.getPool({ args: { poolId } })
      const callsBefore = (await hook.state.global.calls())!
      const { return: out } = await swap(poolId, tka, 100_000n)
      expect(out).toBe(expectedOut(100_000n, before.reserveB, before.reserveA + 50_000n, 30n))
      const after = await dex.getPool({ args: { poolId } })
      expect(after.reserveA).toBe(before.reserveA + 50_000n - out!)
      expect(await hook.state.global.calls()).toBe(callsBefore + 2n)
      await assertEscrowIdentity(algorand, dex, poolId)
      await configure(hook, MODE.pass)
    })
  })

  describe('§4.12 (5) poke', () => {
    let hook: MockDexHookClient
    let other: MockDexHookClient
    let poolId: bigint
    let escrow: string

    beforeAll(async () => {
      hook = await deployMockHook(CUSTODY, 6_000_000n)
      other = await deployMockHook(CUSTODY)
      ;({ poolId, escrow } = await livePool(poolConfig(30n), [
        hookInstall({ app: hook.appId, points: POKE, perms: CUSTODY }),
        hookInstall({ app: other.appId, points: BEFORE_SWAP, perms: 0n }),
      ]))
    })

    test('a donation through poke is booked into reserves', async () => {
      await configure(hook, MODE.donate, 70_000n)
      const before = await dex.getPool({ args: { poolId } })
      await poke(poolId, 0n)
      const after = await dex.getPool({ args: { poolId } })
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA + 70_000n, before.reserveB])
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('poking a hook that is not subscribed to Poke, or a missing index, fails with errPdhc', async () => {
      await expectContractError(poke(poolId, 1n), 'errPdhc')
      await expectContractError(poke(poolId, 5n), 'errPdhc')
    })

    test('ModeKeyreg without the 2 ALGO pre-donation is a loss: errPdki', async () => {
      await configure(hook, MODE.keyreg, 0n)
      await expectContractError(poke(poolId, 0n), 'errPdki')
    })

    test('ModeKeyreg with the pre-donation puts the escrow online (incentive-eligible) at no cost to LPs', async () => {
      await configure(hook, MODE.keyreg, 2_000_000n)
      const before = await dex.getPool({ args: { poolId } })
      await poke(poolId, 0n)
      const info = await algorand.client.algod.accountInformation(escrow).do()
      expect(info.status).toBe('Online')
      expect(info.incentiveEligible).toBe(true)
      const after = await dex.getPool({ args: { poolId } })
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA, before.reserveB])
      await assertEscrowIdentity(algorand, dex, poolId)
      await configure(hook, MODE.pass)
    })

    test('poking a paused pool fails with errPdpp', async () => {
      await dex.send.setPoolPaused({ args: { poolId, paused: true }, ...send })
      await expectContractError(poke(poolId, 0n), 'errPdpp')
      await dex.send.setPoolPaused({ args: { poolId, paused: false }, ...send })
    })
  })

  describe('§4.12 (6) sync', () => {
    test('sync on a pool with no liquidity fails', async () => {
      const { poolId } = await createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config: poolConfig(30n),
      })
      await expectContractError(dex.send.sync({ args: { poolId }, ...send }), 'errPdil')
    })

    test('direct ALGO and ASA transfers to the escrow are booked by sync', async () => {
      const { poolId, escrow } = await livePool()
      await algorand.send.payment({ sender: trader.addr, receiver: escrow, amount: microAlgo(30_000) })
      await algorand.send.assetTransfer({ sender: trader.addr, receiver: escrow, assetId: tka, amount: 40_000n })
      await assertEscrowIdentity(algorand, dex, poolId, 30_000n, 40_000n)

      const before = await dex.getPool({ args: { poolId } })
      await dex.send.sync({ sender: trader.addr, args: { poolId }, ...send })
      const after = await dex.getPool({ args: { poolId } })
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA + 30_000n, before.reserveB + 40_000n])
      expect(after.lpSupply).toBe(before.lpSupply)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('addLiquidity syncs a donation first, so the new LP mints against the post-donation reserves', async () => {
      const { poolId, escrow } = await livePool()
      const donation = 1_000_000n
      await algorand.send.payment({ sender: admin.addr, receiver: escrow, amount: microAlgo(donation) })
      const before = await dex.getPool({ args: { poolId } })

      const minted = await addLiquidity(algorand, dex, trader, poolId, 1_000_000n, 1_000_000n)
      const fromA = (1_000_000n * before.lpSupply) / (before.reserveA + donation)
      const fromB = (1_000_000n * before.lpSupply) / before.reserveB
      expect(minted).toBe(fromA < fromB ? fromA : fromB)
      // the depositor did not capture the donation: it was booked before the mint
      expect(minted).toBeLessThan((1_000_000n * before.lpSupply) / before.reserveA)
      const after = await dex.getPool({ args: { poolId } })
      expect(after.reserveA).toBe(before.reserveA + donation + 1_000_000n)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('§4.12 (7) HookFeeOut', () => {
    let feeOut: MockDexHookClient

    beforeAll(async () => {
      feeOut = await deployMockHook(HOOK_FEE | HOOK_FEE_OUT)
      await feeOut.send.optIn({ args: { asset: tka }, ...send })
    })

    test('a 100 bps out-fee: quote == swap, and the hook receives it in assetOut', async () => {
      const { poolId } = await livePool(poolConfig(30n, { maxHookFeeBps: 200n }), [
        hookInstall({ app: feeOut.appId, points: BEFORE_SWAP | QUOTE, perms: HOOK_FEE_OUT }),
      ])
      await configure(feeOut, MODE.hookFeeOut, 100n, 0n)
      const pool = await dex.getPool({ args: { poolId } })
      const gross = expectedOut(1_000_000n, pool.reserveA, pool.reserveB, 30n)
      const fee = (gross * 100n) / 10_000n

      const quoted = await quote(poolId, 0n, 1_000_000n)
      expect(quoted).toBe(gross - fee)
      const hookBefore = await holding(algorand, feeOut.appAddress.toString(), tka)
      const traderBefore = await holding(algorand, trader.addr.toString(), tka)
      const { return: out } = await swap(poolId, 0n, 1_000_000n)
      expect(out).toBe(quoted)
      expect((await holding(algorand, feeOut.appAddress.toString(), tka)) - hookBefore).toBe(fee)
      expect((await holding(algorand, trader.addr.toString(), tka)) - traderBefore).toBe(quoted)
      // the pool books the gross output: the out-fee is paid by the trader, not the LPs
      const after = await dex.getPool({ args: { poolId } })
      expect(after.reserveB).toBe(pool.reserveB - gross)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('hook fee in + hook fee out above maxHookFeeBps fails with errPdhf', async () => {
      const { poolId } = await livePool(poolConfig(30n, { maxHookFeeBps: 200n }), [
        hookInstall({ app: feeOut.appId, points: BEFORE_SWAP | QUOTE, perms: HOOK_FEE | HOOK_FEE_OUT }),
      ])
      // 100 bps in (10,000 of 1,000,000) + 150 bps out = 250 > 200
      await configure(feeOut, MODE.hookFeeOut, 150n, 10_000n)
      await expectContractError(swap(poolId, 0n, 1_000_000n), 'errPdhf')
      await expectContractError(quote(poolId, 0n, 1_000_000n), 'errPdhf')
      // 100 in + 100 out = 200 is at the cap
      await configure(feeOut, MODE.hookFeeOut, 100n, 10_000n)
      expect(await quote(poolId, 0n, 1_000_000n)).toBeGreaterThan(0n)
    })

    test('two HookFeeOut installs on one pool fail with errPdhc', async () => {
      const second = await deployMockHook(HOOK_FEE_OUT)
      await expectContractError(
        createPool({
          algorand,
          dex,
          sender: admin,
          assetA: 0n,
          assetB: tka,
          config: poolConfig(30n, { maxHookFeeBps: 200n }),
          hooks: [
            hookInstall({ app: feeOut.appId, points: BEFORE_SWAP | QUOTE, perms: HOOK_FEE_OUT }),
            hookInstall({ app: second.appId, points: BEFORE_SWAP | QUOTE, perms: HOOK_FEE_OUT }),
          ],
        }),
        'errPdhc',
      )
    })

    // Readiness audit 2026-11-09, C15. A hook that returns fee fields at AfterInitialize declares the
    // most it will charge. The mock returns the same result at every point, so in hookFeeOut mode it
    // declares hookFee = value2 on the input side and hookFeeOutBps = value on the output side whenever
    // its install includes AfterInitialize.
    test('AUD-C15 declared hook fees must fit the cap together, and no undeclared fee hook may sit beside them', async () => {
      // approved for both fee permissions, so an install's own choice of permissions is what is tested
      const input = await deployMockHook(HOOK_FEE | HOOK_FEE_OUT)
      const DECLARES = AFTER_INITIALIZE | BEFORE_SWAP | QUOTE
      const create = (maxHookFeeBps: bigint, hooks: ReturnType<typeof hookInstall>[]) =>
        createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(30n, { maxHookFeeBps }), hooks })
      const out = (perms = HOOK_FEE_OUT, points = DECLARES) => hookInstall({ app: feeOut.appId, points, perms })
      const inn = (perms = HOOK_FEE, points = DECLARES) => hookInstall({ app: input.appId, points, perms })

      await configure(feeOut, MODE.hookFeeOut, 300n, 0n) // declares 300 bps on the output side
      await configure(input, MODE.hookFeeOut, 0n, 200n) // declares 200 bps on the input side

      // Each fits a 300 bps cap on its own. Together a swap can owe 500, so 300 and 499 are refused:
      // otherwise the pool would trade in one direction and revert in the other.
      await create(300n, [out()])
      await create(200n, [inn()])
      await expectContractError(create(300n, [out(), inn()]), 'errPdhf')
      await expectContractError(create(499n, [inn(), out()]), 'errPdhf')
      await create(500n, [out(), inn()])

      // A fee hook that does not declare (here: installed without AfterInitialize) cannot share the pool
      // with one that does, whatever the cap: the Vault has no bound for it.
      await expectContractError(create(1_000n, [out(), inn(HOOK_FEE, BEFORE_SWAP | QUOTE)]), 'errPdhm')
      await expectContractError(create(1_000n, [inn(HOOK_FEE, BEFORE_SWAP | QUOTE), out()]), 'errPdhm')
      // Without a hook-fee permission the other hook cannot charge, so it does not count.
      await create(300n, [out(), inn(0n, BEFORE_SWAP | QUOTE)])

      // A declaration needs the matching permission on each side.
      await expectContractError(create(1_000n, [out(HOOK_FEE)]), 'errPdhm')
      await expectContractError(create(1_000n, [inn(HOOK_FEE_OUT)]), 'errPdhm')

      // One hook that declares both sides: its worst case is the larger of the two.
      await configure(feeOut, MODE.hookFeeOut, 300n, 200n)
      await expectContractError(create(299n, [out(HOOK_FEE | HOOK_FEE_OUT)]), 'errPdhf')
      await create(300n, [out(HOOK_FEE | HOOK_FEE_OUT)])
      await expectContractError(create(1_000n, [out(HOOK_FEE_OUT)]), 'errPdhm')

      // Where nobody declares, nothing changes: fee hooks without AfterInitialize are checked per swap.
      await create(100n, [out(HOOK_FEE_OUT, BEFORE_SWAP | QUOTE), inn(HOOK_FEE, BEFORE_SWAP | QUOTE)])

      await configure(feeOut, MODE.pass)
      await configure(input, MODE.pass)
    })
  })

  describe('§4.12 (8) per-pool fee cap', () => {
    let feeHook: MockDexHookClient

    beforeAll(async () => {
      feeHook = await deployMockHook(DYNAMIC_FEE)
    })

    test('maxFeeBps 5000 accepts a SetFee of 4000 (quote == swap at 40%)', async () => {
      const { poolId } = await livePool(poolConfig(30n, { maxFeeBps: 5_000n }), [
        hookInstall({ app: feeHook.appId, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE }),
      ])
      await configure(feeHook, MODE.setFee, 4_000n)
      const pool = await dex.getPool({ args: { poolId } })
      const expected = expectedOut(1_000_000n, pool.reserveA, pool.reserveB, 4_000n)
      expect(await quote(poolId, 0n, 1_000_000n)).toBe(expected)
      expect((await swap(poolId, 0n, 1_000_000n)).return).toBe(expected)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('maxFeeBps 1000 rejects the same SetFee with errPdfe', async () => {
      const { poolId } = await livePool(poolConfig(30n), [
        hookInstall({ app: feeHook.appId, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE }),
      ])
      await configure(feeHook, MODE.setFee, 4_000n)
      await expectContractError(swap(poolId, 0n, 1_000_000n), 'errPdfe')
      await expectContractError(quote(poolId, 0n, 1_000_000n), 'errPdfe')
    })

    test('createPool bounds: maxFeeBps ≤ 9000, feeBps ≤ maxFeeBps, custodyFeeBps ≤ maxFeeBps', async () => {
      const create = (overrides: Parameters<typeof poolConfig>[1]) =>
        createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(30n, overrides) })
      await expectContractError(create({ maxFeeBps: 9_001n }), 'errPdfe')
      await expectContractError(create({ maxFeeBps: 20n }), 'errPdfe')
      await expectContractError(create({ custodyFeeBps: 1_001n }), 'errPdfe')
      await create({ maxFeeBps: 9_000n, custodyFeeBps: 9_000n })
    })
  })

  describe('§4.12 (9) quote identity', () => {
    let rec: RecordingDexHookClient
    let poolId: bigint
    let watcher: TransactionSignerAccount

    beforeAll(async () => {
      rec = await deployRecordingHook(1_000_000n)
      watcher = await localnet.context.generateAccount({ initialFunds: (1).algo() })
      ;({ poolId } = await livePool(poolConfig(30n), [
        hookInstall({ app: rec.appId, points: BEFORE_SWAP | QUOTE, perms: 0n }),
      ]))
    })

    /** a quote sent as a real transaction, so the recording hook's writes persist */
    const sentQuote = (sender: TransactionSignerAccount, swapper: string, data: Uint8Array, wallet = 0n) =>
      dex
        .newGroup()
        .quote({
          sender: sender.addr,
          signer: sender.signer,
          args: { poolId, assetIn: 0n, amountIn: 100_000n, swapper, data, wallet },
          maxFee: microAlgo(20_000),
        })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })

    test('at Quote, ctx.caller is the swapper argument and ctx.wallet the wallet argument; callerApp is 0 at top level', async () => {
      await sentQuote(trader, watcher.addr.toString(), new Uint8Array([7]), 777n)
      const { ctx } = await rec.record({ args: { point: QUOTE } })
      expect([ctx.point, ctx.caller, ctx.recipient, ctx.callerApp, ctx.wallet]).toEqual([
        QUOTE,
        watcher.addr.toString(),
        watcher.addr.toString(),
        0n,
        777n,
      ])
      expect(ctx.data).toEqual(new Uint8Array([7]))
    })

    test('at Quote with a zero swapper, ctx.caller is Txn.sender', async () => {
      await sentQuote(trader, ZERO, NO_DATA)
      const { ctx } = await rec.record({ args: { point: QUOTE } })
      expect(ctx.caller).toBe(trader.addr.toString())
    })

    test('at BeforeSwap, ctx.caller is Txn.sender, ctx.recipient the swap recipient and ctx.wallet the (unverified) hint', async () => {
      const pool = await dex.getPool({ args: { poolId } })
      // one opUp() carrier for references: the recording hook's box plus the recipient
      await dex
        .newGroup()
        .swap({
          sender: trader.addr,
          args: {
            input: transferTxn(algorand, trader, getApplicationAddress(pool.escrow).toString(), 0n, 100_000n),
            poolId,
            minAmountOut: 0n,
            recipient: admin.addr.toString(),
            data: new Uint8Array([5, 6]),
            // the Vault is DAO-agnostic: it passes any hint through and leaves verification to hooks (§6.12)
            wallet: 4_242n,
          },
          maxFee: send.maxFee,
        })
        .opUp({ sender: trader.addr, args: [], maxFee: send.maxFee })
        .send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
      const { ctx } = await rec.record({ args: { point: BEFORE_SWAP } })
      expect([ctx.point, ctx.caller, ctx.recipient, ctx.callerApp, ctx.wallet, ctx.custody]).toEqual([
        BEFORE_SWAP,
        trader.addr.toString(),
        admin.addr.toString(),
        0n,
        4_242n,
        false,
      ])
      expect(ctx.data).toEqual(new Uint8Array([5, 6]))
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })

  describe('§4.12 (10, 11) tryQuoteRoute and route shape', () => {
    let live: bigint
    let paused: bigint
    let tkb: bigint

    const tryQuote = async (route: bigint[], assetIn: bigint, amountIn: bigint) =>
      (await dex.send.tryQuoteRoute({ args: { route, assetIn, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send }))
        .return!
    const quoteRoute = (route: bigint[], assetIn: bigint, amountIn: bigint) =>
      dex.send.quoteRoute({ args: { route, assetIn, amountIn, swapper: ZERO, data: NO_DATA, wallet: 0n }, ...send })

    beforeAll(async () => {
      ;({ poolId: live } = await livePool())
      ;({ poolId: paused } = await livePool())
      await dex.send.setPoolPaused({ args: { poolId: paused, paused: true }, ...send })
      tkb = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 12n, decimals: 6, unitName: 'TKB' }))
        .assetId
    })

    test('a valid route quotes the same through tryQuoteRoute and quoteRoute', async () => {
      const quoted = (await quoteRoute([live], 0n, 1_000_000n)).return!
      expect(quoted).toBeGreaterThan(0n)
      expect(await tryQuote([live], 0n, 1_000_000n)).toBe(quoted)
      expect(await quote(live, 0n, 1_000_000n)).toBe(quoted)
    })

    test('tryQuoteRoute returns 0 where quoteRoute reverts', async () => {
      const cases: [string, bigint[], bigint, bigint, string][] = [
        ['paused pool', [paused], 0n, 1_000_000n, 'errPdpp'],
        ['paused second hop', [live, paused], 0n, 1_000_000n, 'errPdpp'],
        ['missing pool', [999_999_999n], 0n, 1_000_000n, 'errPdpn'],
        ['asset not in the pool', [live], tkb, 1_000_000n, 'errPdan'],
        ['zero output', [live], 0n, 1n, 'errPdil'],
      ]
      for (const [name, route, assetIn, amountIn, error] of cases) {
        expect(await tryQuote(route, assetIn, amountIn), name).toBe(0n)
        await expectContractError(quoteRoute(route, assetIn, amountIn), error)
      }
    })

    test('(11) a route that repeats a pool fails with errPdrt in swapRoute, quoteRoute and tryQuoteRoute', async () => {
      const pool = await dex.getPool({ args: { poolId: live } })
      await expectContractError(quoteRoute([live, live], 0n, 1_000_000n), 'errPdrt')
      await expectContractError(
        dex.send.tryQuoteRoute({
          args: { route: [live, live], assetIn: 0n, amountIn: 1_000_000n, swapper: ZERO, data: NO_DATA, wallet: 0n },
          ...send,
        }),
        'errPdrt',
      )
      await expectContractError(
        dex.send.swapRoute({
          sender: trader.addr,
          args: {
            input: transferTxn(algorand, trader, getApplicationAddress(pool.escrow).toString(), 0n, 1_000_000n),
            route: [live, live],
            minAmountOut: 0n,
            recipient: ZERO,
            data: NO_DATA,
            wallet: 0n,
          },
          populateAppCallResources: false,
          appReferences: [pool.escrow],
          assetReferences: [tka],
          // read quota (A11): the 14,092 B Vault (5,900 B above 8,192) plus two p: reads needs 6,185 B > 3 refs' 6,144
          boxReferences: [box('p', live), box('p', live), { appId: 0n, name: new Uint8Array() }, { appId: 0n, name: new Uint8Array() }],
          staticFee: microAlgo(10_000),
        }),
        'errPdrt',
      )
    })
  })

  describe('custody on ASA/ASA pools', () => {
    test('a custody hook that closes an empty escrow holding to take the freed MBR fails with errPdki', async () => {
      const tkc = (
        await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 12n, decimals: 6, unitName: 'TKC' })
      ).assetId
      const hook = await deployMockHook()
      await hook.send.configure({ args: { mode: MODE.closeHolding, value: 100_000n, value2: tkc, target: ZERO } })
      await expectContractError(
        createPool({
          algorand,
          dex,
          sender: admin,
          assetA: tka,
          assetB: tkc,
          config: poolConfig(30n),
          hooks: [hookInstall({ app: hook.appId, points: AFTER_INITIALIZE, perms: CUSTODY })],
        }),
        'errPdki',
      )
    })
  })

  describe('§4.12 (12) inner transaction pool', () => {
    test('3 eager custody hooks at Before and AfterSwap: more than 16 inners, no carriers', async () => {
      const hooks: bigint[] = []
      for (let i = 0; i < 3; i++) hooks.push((await deployMockHook()).appId)
      const { poolId } = await livePool(
        poolConfig(30n),
        hooks.map((app) => hookInstall({ app, points: BEFORE_SWAP | AFTER_SWAP, perms: CUSTODY })),
      )
      const result = await swapExplicit(poolId, 0n, 100_000n, hooks)
      // [input payment, swap] plus only reference carriers for the Vault's read quota (A11), which depend on
      // program + box bytes crossing 2,048 B boundaries: the group's 256 inner transactions are pooled, so
      // no carrier is needed for inner slots and none issues an inner transaction
      expect(result.transactions.length).toBe(2 + result.carriers)
      for (const carrier of result.confirmations.slice(0, result.carriers)) {
        expect((carrier as unknown as InnerTree).innerTxns ?? []).toHaveLength(0)
      }
      const confirmation = result.confirmations.at(-1)!
      const { work, opUps } = innerKinds(confirmation)
      const total = countInners(confirmation as unknown as InnerTree)
      console.log(`[inner pool] Vault inners ${work.length} (+${opUps} op-ups), with descendants ${total}`)
      // 3 hooks × 2 points × (escrow rekey + hook call) + payout, plus each hook's rekey back
      expect(work.length).toBe(13)
      expect(total - opUps).toBe(19)
      expect(total).toBeGreaterThan(16)
      await assertEscrowIdentity(algorand, dex, poolId)
    })

    test('8 eager custody hooks at Before and AfterSwap fit the 1,024 B log limit of one swap', async () => {
      const hooks: bigint[] = []
      for (let i = 0; i < 8; i++) hooks.push((await deployMockHook()).appId)
      const { poolId } = await createPool({
        algorand,
        dex,
        sender: admin,
        assetA: 0n,
        assetB: tka,
        config: poolConfig(30n),
        hooks: hooks.map((app) => hookInstall({ app, points: BEFORE_SWAP | AFTER_SWAP, perms: CUSTODY })),
        optInLp: [trader],
        budgetCalls: 4,
      })
      await addLiquidity(algorand, dex, trader, poolId, 10_000_000n, 10_000_000n)
      // 16 custody events, the swap event and the ABI return in the Vault's frame
      // plain opUp calls add 700 opcodes each to the group's pooled budget for the stack's checks
      const result = await swapExplicit(poolId, 0n, 100_000n, hooks, 200_000n, 6)
      const logs = result.confirmations.at(-1)!.logs ?? []
      expect(logs.length).toBe(18)
      expect(logs.reduce((n, log) => n + log.length, 0)).toBeLessThanOrEqual(1_024)
      await assertEscrowIdentity(algorand, dex, poolId)
    })
  })
})
