import { AlgorandClient, Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { CallerType, newWallet, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { ABIType, decodeAddress, getApplicationAddress, modelsv2 } from 'algosdk'
import { createHash } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { deployAbstractedAccountFactory } from '../../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../../tests/fixtures/escrow'
import {
  addInitialLiquidity,
  bootstrapPool,
  deployTinymanV2,
  deriveTinymanPool,
  readPoolState,
  swapDirect,
  tinymanFixedInputOut,
  TinymanPool,
  TinymanPoolState,
  TinymanV2,
} from '../../../../tests/fixtures/external/tinyman-v2'
import { addLiquidity, createPool, deployVault, hookInstall, poolConfig, sendParams, transferTxn } from '../../../../tests/fixtures/plugin-dex'
import {
  AdapterEnabled,
  AdapterExactQuote,
  adapterInfo,
  AkitaRouterPluginSDK,
  deployAkitaRouterPlugin,
  deployTinymanV2Adapter,
  deployVenueRegistry,
  FlagAllowDirect,
  LegInput,
  native,
  SegmentInput,
  SwapArgs,
  SwapBestArgs,
  tinymanRefs,
  venue,
} from '../../../../tests/fixtures/plugins/akita-router'
import { encodeAddArgs, encodeInitArgs, IdCenter } from '../../../../tests/models/bins-model'
import { addRawPlugin } from '../../../../tests/fixtures/unregistered-wallet'
import { expectContractError } from '../../../../tests/utils/errors'
import { AbstractedAccountMbrFactory } from '../../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { APP_SPEC as RouterSpec } from '../../../artifacts/arc58/plugins/akita-router/AkitaRouterPluginClient'
import { BinEngineClient, BinEngineFactory } from '../../../artifacts/plugin-dex/curves/bins/BinEngineClient'
import { BackrunArbHookClient, BackrunArbHookFactory } from '../../../artifacts/plugin-dex/hooks/BackrunArbHookClient'
import { GatedFeeHookClient, GatedFeeHookFactory } from '../../../artifacts/plugin-dex/hooks/GatedFeeHookClient'
import { PluginDexClient } from '../../../artifacts/plugin-dex/PluginDexClient'
import { MockGatedFeePluginFactory } from '../../../artifacts/plugin-dex/tests/MockGatedFeePluginClient'
import { MockMirrorDaoFactory } from '../../../artifacts/plugin-dex/tests/MockMirrorDAOClient'
import { MockSocialImpactClient, MockSocialImpactFactory } from '../../../artifacts/plugin-dex/tests/MockSocialImpactClient'
import {
  APP_SPEC as MockVenueSpec,
  MockVenueAdapterClient,
  MockVenueAdapterFactory,
} from '../../../artifacts/plugin-dex/tests/MockVenueAdapterClient'
import { RouterRecordingHookClient, RouterRecordingHookFactory } from '../../../artifacts/plugin-dex/tests/RouterRecordingHookClient'
import { TinymanV2AdapterClient } from '../../../artifacts/plugin-dex/venues/TinymanV2AdapterClient'
import { VenueRegistryClient } from '../../../artifacts/plugin-dex/venues/VenueRegistryClient'
import { errAllowanceExceeded, errCannotCallOtherAppsDuringRekey, errMethodOnCooldown } from '../../account/errors'
import {
  errRtAdapter,
  errRtAdapterVer,
  errRtAlgoLeak,
  errRtCustody,
  errRtDirect,
  errRtFunds,
  errRtOverspend,
  errRtQuote,
  errRtRekeyBack,
  errRtRoute,
  errRtSlippage,
} from './errors'

// PluginDex hook points / perms
const AFTER_INITIALIZE = 1n
const BEFORE_SWAP = 32n
const AFTER_SWAP = 64n
const QUOTE = 128n
const POKE = 256n
const CUSTODY = 1n
const DYNAMIC_FEE = 2n
const HOOK_FLAG_LAZY_CUSTODY = 1n
const LP_MODE_CURVE = 1n
// GatedFeeHook
const MEASURE_IMPACT = 2n
// MockVenueAdapter modes
const V_HONEST = 0n
const V_KEEP_REKEY = 1n
const V_REKEY_ELSEWHERE = 2n
const V_UNDERDELIVER = 3n
const V_OVERQUOTE = 4n
const V_OVERSPEND_BASELINE = 5n
const V_FEE_FROM_ACCOUNT = 6n
const V_JUNK_OPT_IN = 7n
const V_PARTIAL_FILL = 10n
const V_CLOSE_OPT_IN = 11n
const V_DONATE_INPUT = 12n

const noData = new Uint8Array()
const ZERO = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ'
const autoFees = { maxFee: microAlgo(100_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

/** ARC-28 LegEvent decoding */
const LEG_EVENT_SIG = 'LegEvent(uint64,uint64,address,uint64,uint64,uint64,uint64)'
const LEG_EVENT_SELECTOR = createHash('sha512-256').update(LEG_EVENT_SIG).digest().subarray(0, 4)
const LEG_EVENT_TYPE = ABIType.from('(uint64,uint64,address,uint64,uint64,uint64,uint64)')
type LegEventValue = { leg: bigint; venue: bigint; holder: string; assetIn: bigint; amountIn: bigint; assetOut: bigint; amountOut: bigint }

type Pending = modelsv2.PendingTransactionResponse
const countInners = (txn: Pending): number => (txn.innerTxns ?? []).reduce((n, inner) => n + 1 + countInners(inner), 0)
/** deepest inner-txn nesting below a top-level txn (the AVM allows 8 levels of inner app calls) */
const innerDepth = (txn: Pending, depth = 0): number => (txn.innerTxns ?? []).reduce((m, inner) => Math.max(m, innerDepth(inner, depth + 1)), depth)
/** the chain of app ids from the top-level txn down to the deepest inner txn */
const deepestPath = (txn: Pending): string[] => {
  const here = txn.txn.txn.applicationCall ? `appl ${txn.txn.txn.applicationCall.appIndex}` : (txn.txn.txn.type as string)
  const children = (txn.innerTxns ?? []).map(deepestPath)
  return [here, ...children.reduce((best, c) => (c.length > best.length ? c : best), [] as string[])]
}
const allInners = (txn: Pending): Pending[] => (txn.innerTxns ?? []).flatMap((inner) => [inner, ...allInners(inner)])

/** Tinyman reserves after a fixed-input swap (mirrors the AMM's protocol-fee split) */
const tmApply = (state: TinymanPoolState, assetIn: bigint, amountIn: bigint): [TinymanPoolState, bigint] => {
  const out = tinymanFixedInputOut(state, assetIn, amountIn)
  const protocolFee = (amountIn * state.feeShare) / 10_000n / state.protocolFeeRatio
  const next = { ...state }
  if (assetIn === state.asset1) {
    next.reserve1 += amountIn - protocolFee
    next.reserve2 -= out
  } else {
    next.reserve2 += amountIn - protocolFee
    next.reserve1 -= out
  }
  return [next, out]
}

/** PluginDex native constant product (no hooks, protocol fee 0) */
type NativeModel = { rIn: bigint; rOut: bigint; feeBps: bigint }
const nativeOut = (p: NativeModel, amountIn: bigint) => {
  const lpFee = (amountIn * p.feeBps) / 10_000n
  const eff = amountIn - lpFee
  const out = (eff * p.rOut) / (p.rIn + eff)
  return out > 0n && out < p.rOut ? out : 0n
}

describe('AkitaRouterPlugin', () => {
  const fixture = algorandFixture()
  const previousMbr = process.env.WALLET_MBR_APP_ID
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  let walletFactory: WalletFactorySDK
  let dex: PluginDexClient
  let recorder: RouterRecordingHookClient
  let registry: VenueRegistryClient
  let tm: TinymanV2
  let tmAdapter: TinymanV2AdapterClient
  let mock: MockVenueAdapterClient
  let router: AkitaRouterPluginSDK
  let legEscrow: string
  let tka: bigint
  let tkb: bigint
  let usdc: bigint
  let daoAppId: bigint
  let impact: MockSocialImpactClient
  const pools: Record<string, { id: bigint; escrow: string }> = {}
  const tmPools: Record<string, TinymanPool> = {}

  // HELPERS ---------------------------------------------------------------------------------------

  /** spendable holding; ALGO excludes the min balance; 0 when not opted in */
  const holding = async (address: string, asset: bigint): Promise<bigint> => {
    if (asset === 0n) {
      const info = await algorand.account.getInformation(address)
      return info.balance.microAlgo - info.minBalance.microAlgo
    }
    return algorand.asset
      .getAccountInformation(address, asset)
      .then((a) => a.balance)
      .catch(() => 0n)
  }
  const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgo
  const minBalance = async (address: string) => (await algorand.account.getInformation(address)).minBalance.microAlgo
  const authAddr = async (address: string) => (await algorand.account.getInformation(address)).authAddr?.toString()
  const optedIn = async (address: string, asset: bigint) =>
    algorand.asset
      .getAccountInformation(address, asset)
      .then(() => true)
      .catch(() => false)

  const sortPair = (a: bigint, b: bigint): [bigint, bigint] => (a < b ? [a, b] : [b, a])

  const nativePool = async (name: string, x: bigint, y: bigint, amountX: bigint, amountY: bigint, feeBps = 30n, hooks: ReturnType<typeof hookInstall>[] = []) => {
    const [assetA, assetB] = sortPair(x, y)
    const { poolId, escrow } = await createPool({ algorand, dex, sender: admin, assetA, assetB, config: poolConfig(feeBps), hooks, optInLp: [admin] })
    const [amountA, amountB] = assetA === x ? [amountX, amountY] : [amountY, amountX]
    await addLiquidity(algorand, dex, admin, poolId, amountA, amountB)
    pools[name] = { id: poolId, escrow }
  }

  const seg = (name: string, assetOut: bigint, data?: Uint8Array): SegmentInput => native(assetOut, [pools[name].id], pools[name].escrow, data)

  /** PluginDex.quoteRoute with swapper = S (what the router's native legs pay) */
  const quote = async (route: bigint[], assetIn: bigint, amountIn: bigint, swapper: string) => {
    const { return: out } = await dex.send.quoteRoute({ args: { route, assetIn, amountIn, swapper, data: noData, wallet: 0n }, ...autoFees })
    return out!
  }
  const tmQuote = async (pool: TinymanPool, assetIn: bigint, amountIn: bigint) => tinymanFixedInputOut(await readPoolState(tm, pool.address), assetIn, amountIn)
  const adapterQuote = async (assetIn: bigint, assetOut: bigint, amountIn: bigint) => {
    const { return: out } = await tmAdapter.send.akitaVenueQuote({ args: { assetIn, assetOut, amountIn, venueData: noData }, ...autoFees })
    return out!
  }
  const nativeModel = async (name: string, assetIn: bigint): Promise<NativeModel> => {
    const p = await dex.getPool({ args: { poolId: pools[name].id } })
    return assetIn === p.assetA ? { rIn: p.reserveA, rOut: p.reserveB, feeBps: p.feeBps } : { rIn: p.reserveB, rOut: p.reserveA, feeBps: p.feeBps }
  }

  const newTestWallet = async ({ assets = [] as bigint[], install = true } = {}) => {
    const wallet = await newWallet({
      algorand,
      factoryParams: { appId: walletFactory.appId, defaultSender: admin.addr.toString(), defaultSigner: admin.signer },
      readerAccount: admin.addr.toString(),
      nickname: 'router test',
      assets,
    })
    await wallet.client.appClient.fundAppAccount({ amount: (50).algos() })
    if (install) await wallet.addPlugin({ client: router, callerType: CallerType.Global })
    return wallet
  }
  const give = async (address: string, asset: bigint, amount: bigint) => algorand.send.assetTransfer({ sender: admin.addr, receiver: address, assetId: asset, amount })

  /** legacy (pool, Tinyman) co-location for every Tinyman segment (see tinymanRefs) */
  const tmAccess = (assetIn: bigint, chains: SegmentInput[][]) => {
    const tmPoolsUsed = new Set<string>()
    for (const chain of chains) {
      let asset = assetIn
      for (const s of chain) {
        if (s.venue === tmAdapter.appId) tmPoolsUsed.add(deriveTinymanPool(tm.appId, asset, s.assetOut).address)
        asset = s.assetOut
      }
    }
    return tmPoolsUsed.size > 0 ? tinymanRefs(tm.appId, ...tmPoolsUsed) : {}
  }
  const swapCall = (args: SwapArgs) => router.swap({ ...tmAccess(args.assetIn, args.legs.map((l) => l.segments)), ...args })
  const bestCall = (args: SwapBestArgs) => router.swapBest({ ...tmAccess(args.assetIn, args.candidates.map((c) => [c])), ...args })

  const use = (wallet: WalletSDK, ...calls: ReturnType<AkitaRouterPluginSDK['swap']>[]) => wallet.usePlugin({ callerType: CallerType.Global, calls })

  /** index of the router's outer txn in a wallet group */
  const routerTxn = (result: Awaited<ReturnType<typeof use>>) => result.transactions.findIndex((t) => t.applicationCall?.appIndex === router.appId)
  const legEvents = (result: Awaited<ReturnType<typeof use>>, index = routerTxn(result)): LegEventValue[] =>
    (result.confirmations[index].logs ?? [])
      .filter((log) => log.length > 4 && Buffer.from(log.subarray(0, 4)).equals(LEG_EVENT_SELECTOR))
      .map((log) => {
        const [leg, venueId, holder, assetIn, amountIn, assetOut, amountOut] = LEG_EVENT_TYPE.decode(log.subarray(4)) as [
          bigint, bigint, string, bigint, bigint, bigint, bigint,
        ]
        return { leg, venue: venueId, holder, assetIn, amountIn, assetOut, amountOut }
      })
  /** the router call's ABI return (last log, 0x151f7c75 prefix) */
  const routerReturn = (result: Awaited<ReturnType<typeof use>>, index = routerTxn(result)) => {
    const log = (result.confirmations[index].logs ?? []).at(-1)!
    expect(Buffer.from(log.subarray(0, 4)).toString('hex')).toBe('151f7c75')
    return Buffer.from(log.subarray(4)).readBigUInt64BE()
  }
  const groupInners = (result: Awaited<ReturnType<typeof use>>) => result.confirmations.reduce((n, c) => n + countInners(c), 0)

  /** E's spendable holdings for every test asset */
  const legEscrowSnapshot = async () => ({
    algo: await holding(legEscrow, 0n),
    tka: await holding(legEscrow, tka),
    tkb: await holding(legEscrow, tkb),
    usdc: await holding(legEscrow, usdc),
    auth: await authAddr(legEscrow),
  })

  /** run `body`, then assert S is handed back and E is at its pre-test baseline */
  const guarded = async <T>(S: string, body: () => Promise<T>, expectedAuth?: string): Promise<T> => {
    const before = await legEscrowSnapshot()
    const out = await body()
    expect(await authAddr(S)).toBe(expectedAuth)
    expect(await legEscrowSnapshot()).toEqual(before)
    return out
  }

  /** run a failing call and assert nothing moved: S's holdings and auth, E's holdings */
  const rejected = async (S: string, assets: bigint[], operation: Promise<unknown>, code: string) => {
    const e0 = await legEscrowSnapshot()
    const s0 = await Promise.all(assets.map((a) => holding(S, a)))
    await expectContractError(operation, code)
    expect(await Promise.all(assets.map((a) => holding(S, a)))).toEqual(s0)
    expect(await legEscrowSnapshot()).toEqual(e0)
    expect(await authAddr(S)).toBeUndefined()
  }

  const configureMock = async (mode: bigint, value = 0n, value2 = 0n, target = ZERO, client = mock) =>
    client.send.configure({ args: { mode, value, value2, target } })

  const adminNativeSwap = async (name: string, assetIn: bigint, amount: bigint) =>
    dex.send.swap({
      args: { input: transferTxn(algorand, admin, pools[name].escrow, assetIn, amount), poolId: pools[name].id, minAmountOut: 0n, recipient: admin.addr.toString(), data: noData, wallet: 0n },
      ...sendParams,
    })

  /** simulate a wallet group (unnamed resources, extra budget) to read appBudgetConsumed */
  const simulateBudget = async (wallet: WalletSDK, call: ReturnType<AkitaRouterPluginSDK['swap']>) => {
    const { group } = await wallet.prepareUsePlugin({ callerType: CallerType.Global, calls: [call] })
    const composer = await group.composer()
    const sim = await composer.simulate({ allowUnnamedResources: true, skipSignatures: true, extraOpcodeBudget: 100_000 } as never)
    const g = sim.simulateResponse.txnGroups[0]
    expect(g.failureMessage).toBeUndefined()
    return Number(g.appBudgetConsumed ?? 0)
  }

  // SETUP -----------------------------------------------------------------------------------------

  beforeAll(async () => {
    Config.configure({ populateAppCallResources: true })
    await fixture.newScope()
    algorand = fixture.algorand
    admin = fixture.context.testAccount
    const sender = admin.addr.toString()
    const signer = admin.signer
    await algorand.account.ensureFunded(admin.addr, await algorand.account.dispenserFromEnvironment(), (5_000).algos())

    const { appClient: mbr } = await algorand.client
      .getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: sender, defaultSigner: signer })
      .send.create.bare()
    process.env.WALLET_MBR_APP_ID = mbr.appId.toString()
    const escrowFactory = await deployEscrowFactory({ fixture, sender, signer })
    // MockSocialImpact as the DAO's impact app, for the GatedFeeHook pass in H1
    impact = (await algorand.client.getTypedAppFactory(MockSocialImpactFactory, { defaultSender: sender, defaultSigner: signer }).send.create.bare()).appClient
    await impact.appClient.fundAppAccount({ amount: microAlgo(1_000_000) })
    const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrowFactory.appId, impact: impact.appId } })
    daoAppId = dao.appId
    walletFactory = await deployAbstractedAccountFactory({ fixture, sender, signer, args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })

    const asset = async (unitName: string) => (await algorand.send.assetCreate({ sender, total: 10n ** 15n, decimals: 6, unitName })).assetId
    tka = await asset('TKA')
    tkb = await asset('TKB')
    usdc = await asset('USDC')

    // PluginDex Vault + native pools (one recording hook on the TKA/TKB and USDC/TKA pools)
    dex = await deployVault({ algorand, sender: admin, funding: 5_000_000n })
    recorder = (
      await algorand.client
        .getTypedAppFactory(RouterRecordingHookFactory, { defaultSender: sender, defaultSigner: signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await dex.send.setHookApproval({ args: { hook: recorder.appId, perms: DYNAMIC_FEE }, populateAppCallResources: true })
    const recording = hookInstall({ app: recorder.appId, points: BEFORE_SWAP | QUOTE, perms: 0n })

    await nativePool('algoTka', 0n, tka, 100_000_000n, 500_000_000n)
    await nativePool('tkaTkb', tka, tkb, 1_000_000_000n, 1_000_000_000n, 30n, [recording])
    await nativePool('algoTkb1', 0n, tkb, 100_000_000n, 300_000_000n)
    await nativePool('algoTkb2', 0n, tkb, 100_000_000n, 300_000_000n, 100n)
    await nativePool('usdcTka', usdc, tka, 1_000_000_000n, 1_000_000_000n, 30n, [recording])

    // Tinyman v2 (official bytecode)
    tm = await deployTinymanV2(algorand, admin.addr)
    const tmPool = async (name: string, x: bigint, y: bigint, amountX: bigint, amountY: bigint) => {
      tmPools[name] = await bootstrapPool(tm, admin.addr, x, y)
      await addInitialLiquidity(tm, tmPools[name], admin.addr, x, amountX, amountY)
    }
    await tmPool('algoUsdc', 0n, usdc, 100_000_000n, 200_000_000n)
    await tmPool('usdcTka', usdc, tka, 1_000_000_000n, 1_000_000_000n)
    await tmPool('algoTka', 0n, tka, 100_000_000n, 500_000_000n)
    await tmPool('algoTkb', 0n, tkb, 100_000_000n, 300_000_000n)

    // VenueRegistry + adapters
    registry = await deployVenueRegistry(algorand, admin)
    tmAdapter = await deployTinymanV2Adapter(algorand, admin, tm.appId)
    await registry.send.setAdapter({ args: { adapter: tmAdapter.appId, info: adapterInfo({ flags: AdapterEnabled | AdapterExactQuote, innerTxns: 3n, opBudget: 400n }) } })
    mock = (await algorand.client.getTypedAppFactory(MockVenueAdapterFactory, { defaultSender: sender, defaultSigner: signer }).send.create.create({ args: {} })).appClient
    await mock.appClient.fundAppAccount({ amount: (100).algos() })
    for (const a of [tka, tkb]) {
      await mock.send.optIn({ args: { asset: a }, ...autoFees })
      await give(mock.appAddress.toString(), a, 500_000_000n)
    }
    await registry.send.setAdapter({ args: { adapter: mock.appId, info: adapterInfo({ innerTxns: 4n, opBudget: 400n }) } })

    router = await deployAkitaRouterPlugin({ algorand, sender: admin, dex: dex.appId, registry: registry.appId, legAssets: [tka, tkb] })
    legEscrow = await router.legEscrowAddress()
  })

  afterAll(() => {
    if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
    else process.env.WALLET_MBR_APP_ID = previousMbr
  })

  test('setup: E is a child Escrow rekeyed to the router, holding only MBR', async () => {
    expect(await authAddr(legEscrow)).toBe(router.client.appAddress.toString())
    expect(await holding(legEscrow, 0n)).toBe(0n)
    expect(await optedIn(legEscrow, tka)).toBe(true)
    expect(await optedIn(legEscrow, tkb)).toBe(true)
    expect(await optedIn(legEscrow, usdc)).toBe(false)
    const info = await registry.getAdapter({ args: { adapter: tmAdapter.appId } })
    expect(info).toEqual(adapterInfo({ flags: AdapterEnabled | AdapterExactQuote, innerTxns: 3n, opBudget: 400n }))
  })

  // A. NATIVE -------------------------------------------------------------------------------------

  describe('A. native', () => {
    test('A1 ALGO→TKA, 1 hop: output == PluginDex quote for S, 3 outer txns', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 1_000_000n
      const expected = await quote([pools.algoTka.id], 0n, amountIn, S)
      const algo0 = await holding(S, 0n)
      const result = await guarded(S, () =>
        use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected, legs: [{ amountIn, segments: [seg('algoTka', tka)] }] })),
      )
      expect(result.txIds).toHaveLength(3)
      expect(routerReturn(result)).toBe(expected)
      expect(await holding(S, tka)).toBe(expected)
      // the input plus the 0.1 ALGO TKA opt-in MBR; fees come from the caller's outer txns
      expect(await holding(S, 0n)).toBe(algo0 - amountIn - 100_000n)
    })

    test('A2 2-hop route == quoteRoute; the hook saw caller == S, recipient == S and wallet == W (windowHint)', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 2_000_000n
      const route = [pools.algoTka.id, pools.tkaTkb.id]
      const expected = await quote(route, 0n, amountIn, S)
      const calls0 = await recorder.state.global.swapCalls()
      await guarded(S, () =>
        use(wallet, swapCall({ assetIn: 0n, assetOut: tkb, minAmountOut: expected, legs: [{ amountIn, segments: [native(tkb, route, pools.algoTka.escrow)] }] })),
      )
      expect(await holding(S, tkb)).toBe(expected)
      expect(await recorder.state.global.swapCalls()).toBe(calls0! + 1n)
      expect(await recorder.state.global.swapCaller()).toBe(S)
      expect(await recorder.state.global.swapRecipient()).toBe(S)
      // principal-resolution spec §6.11/§6.12: the router forwards windowHint(wallet) == wallet.id to PluginDex
      expect(await recorder.state.global.swapWallet()).toBe(wallet.client.appId)
    })

    test('A5 swapBest: the native candidate\'s Quote hook saw caller == S and wallet == W (windowHint), and so did the swap', async () => {
      const wallet = await newTestWallet({ assets: [tka] })
      const S = wallet.client.appAddress.toString()
      await give(S, tka, 10_000_000n)
      const amountIn = 1_000_000n
      const expected = await quote([pools.tkaTkb.id], tka, amountIn, S)
      const quotes0 = await recorder.state.global.quoteCalls()
      await guarded(S, () => use(wallet, bestCall({ assetIn: tka, assetOut: tkb, amountIn, minAmountOut: expected, candidates: [seg('tkaTkb', tkb)] })))
      expect(await holding(S, tkb)).toBe(expected)
      expect(await recorder.state.global.quoteCalls()).toBe(quotes0! + 1n)
      expect(await recorder.state.global.quoteCaller()).toBe(S)
      expect(await recorder.state.global.quoteWallet()).toBe(wallet.client.appId)
      expect(await recorder.state.global.swapWallet()).toBe(wallet.client.appId)
    })

    test('A3 TKA→ALGO (ALGO out), then ALGO→TKB with an inline S opt-in of exactly 100,000', async () => {
      const wallet = await newTestWallet({ assets: [tka] })
      const S = wallet.client.appAddress.toString()
      await give(S, tka, 50_000_000n)

      const sell = 10_000_000n
      const algoOut = await quote([pools.algoTka.id], tka, sell, S)
      const algo0 = await holding(S, 0n)
      await guarded(S, () => use(wallet, swapCall({ assetIn: tka, assetOut: 0n, minAmountOut: algoOut, legs: [{ amountIn: sell, segments: [seg('algoTka', 0n)] }] })))
      expect(await holding(S, 0n)).toBe(algo0 + algoOut)
      expect(await holding(S, tka)).toBe(50_000_000n - sell)

      expect(await optedIn(S, tkb)).toBe(false)
      const buy = 1_000_000n
      const tkbOut = await quote([pools.algoTkb1.id], 0n, buy, S)
      const bal0 = await balance(S)
      const min0 = await minBalance(S)
      await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tkb, minAmountOut: tkbOut, legs: [{ amountIn: buy, segments: [seg('algoTkb1', tkb)] }] })))
      expect(await holding(S, tkb)).toBe(tkbOut)
      expect(await minBalance(S)).toBe(min0 + 100_000n)
      expect(await balance(S)).toBe(bal0 - buy)
    })

    test('A4 aggregate minAmountOut = quote + 1 → errRtSlippage; balances and auth unchanged', async () => {
      const wallet = await newTestWallet({ assets: [tka] })
      const S = wallet.client.appAddress.toString()
      const expected = await quote([pools.algoTka.id], 0n, 1_000_000n, S)
      await rejected(
        S,
        [0n, tka],
        use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected + 1n, legs: [{ amountIn: 1_000_000n, segments: [seg('algoTka', tka)] }] })),
        errRtSlippage,
      )
    })
  })

  // B. TINYMAN ADAPTER ----------------------------------------------------------------------------

  describe('B. Tinyman adapter (SANDBOX)', () => {
    let wallet: WalletSDK
    let S: string
    let firstInners = 0

    test('B1 ALGO→USDC: output == TS formula == akitaVenueQuote; E back at baseline; LegEvent holder == E', async () => {
      wallet = await newTestWallet()
      S = wallet.client.appAddress.toString()
      const amountIn = 3_000_000n
      const expected = await tmQuote(tmPools.algoUsdc, 0n, amountIn)
      expect(await adapterQuote(0n, usdc, amountIn)).toBe(expected)
      expect(await optedIn(legEscrow, usdc)).toBe(false)
      const algo0 = await holding(S, 0n)
      const result = await guarded(S, () =>
        use(wallet, swapCall({ assetIn: 0n, assetOut: usdc, minAmountOut: expected, legs: [{ amountIn, segments: [venue(tmAdapter.appId, usdc)] }] })),
      )
      expect(await holding(S, usdc)).toBe(expected)
      // B2: first use of USDC in E: S paid E's 0.1 ALGO opt-in (and its own USDC opt-in)
      expect(await optedIn(legEscrow, usdc)).toBe(true)
      expect(await holding(S, 0n)).toBe(algo0 - amountIn - 200_000n)
      const [event] = legEvents(result)
      expect(event).toEqual({ leg: 0n, venue: tmAdapter.appId, holder: legEscrow, assetIn: 0n, amountIn, assetOut: usdc, amountOut: expected })
      firstInners = groupInners(result)
    })

    test('B2 the inline E opt-in costs +2 inners once; a second swap does not repeat it', async () => {
      const amountIn = 1_000_000n
      const expected = await tmQuote(tmPools.algoUsdc, 0n, amountIn)
      const algo0 = await holding(S, 0n)
      const result = await guarded(S, () =>
        use(wallet, swapCall({ assetIn: 0n, assetOut: usdc, minAmountOut: expected, legs: [{ amountIn, segments: [venue(tmAdapter.appId, usdc)] }] })),
      )
      expect(await holding(S, 0n)).toBe(algo0 - amountIn)
      // first swap: + E opt-in (pay S→E, axfer E→E) + S opt-in (axfer S→S)
      expect(firstInners - groupInners(result)).toBe(3)
    })

    test('B3 (v1) FlagAllowDirect reverts with errRtDirect', async () => {
      await rejected(
        S,
        [0n, usdc],
        use(wallet, swapCall({ assetIn: 0n, assetOut: usdc, flags: FlagAllowDirect, legs: [{ amountIn: 1_000_000n, segments: [venue(tmAdapter.appId, usdc)] }] })),
        errRtDirect,
      )
    })
    test.todo('B3 DIRECT with registry flag and caller flag works and uses 2 fewer inners (deferred to R4)')

    test('B4 USDC→ALGO (ALGO out) and ASA/ASA USDC→TKA: no asset 0 in the Tinyman inner assets', async () => {
      const usdcIn = 2_000_000n
      const algoOut = await tmQuote(tmPools.algoUsdc, usdc, usdcIn)
      const algo0 = await holding(S, 0n)
      const usdc0 = await holding(S, usdc)
      const r1 = await guarded(S, () =>
        use(wallet, swapCall({ assetIn: usdc, assetOut: 0n, minAmountOut: algoOut, legs: [{ amountIn: usdcIn, segments: [venue(tmAdapter.appId, 0n)] }] })),
      )
      expect(await holding(S, 0n)).toBe(algo0 + algoOut)
      expect(await holding(S, usdc)).toBe(usdc0 - usdcIn)

      const tkaOut = await tmQuote(tmPools.usdcTka, usdc, usdcIn)
      const r2 = await guarded(S, () =>
        use(wallet, swapCall({ assetIn: usdc, assetOut: tka, minAmountOut: tkaOut, legs: [{ amountIn: usdcIn, segments: [venue(tmAdapter.appId, tka)] }] })),
      )
      expect(await holding(S, tka)).toBe(tkaOut)
      for (const result of [r1, r2]) {
        const tmCalls = allInners(result.confirmations[routerTxn(result)]).filter((t) => t.txn.txn.applicationCall?.appIndex === tm.appId)
        expect(tmCalls).toHaveLength(1)
        expect(tmCalls[0].txn.txn.applicationCall!.foreignAssets).not.toContain(0n)
      }
    })

    test('B5 an empty Tinyman pool quotes 0 and an explicit leg reverts in the venue', async () => {
      const { assetId: tkc } = await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TKC' })
      await bootstrapPool(tm, admin.addr, 0n, tkc)
      expect(await adapterQuote(0n, tkc, 1_000_000n)).toBe(0n)
      await expect(use(wallet, swapCall({ assetIn: 0n, assetOut: tkc, legs: [{ amountIn: 1_000_000n, segments: [venue(tmAdapter.appId, tkc)] }] }))).rejects.toThrow()
      expect(await authAddr(S)).toBeUndefined()
    })
  })

  // C. SPLIT AND CHAIN ----------------------------------------------------------------------------

  describe('C. split and chain', () => {
    test('C1 70/30 native + Tinyman: total == sum of per-leg outputs; total + 1 reverts', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 10_000_000n
      const nativeIn = (amountIn * 70n) / 100n
      const tmIn = amountIn - nativeIn
      const expected = (await quote([pools.algoTka.id], 0n, nativeIn, S)) + (await tmQuote(tmPools.algoTka, 0n, tmIn))
      const legs: LegInput[] = [
        { amountIn: nativeIn, segments: [seg('algoTka', tka)] },
        { amountIn: tmIn, segments: [venue(tmAdapter.appId, tka)] },
      ]
      await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected + 1n, legs })), errRtSlippage)
      const result = await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected, legs })))
      expect(await holding(S, tka)).toBe(expected)
      expect(legEvents(result).map((e) => [e.leg, e.venue, e.holder])).toEqual([
        [0n, 0n, S],
        [1n, tmAdapter.appId, legEscrow],
      ])
    })

    test('C2 chain ALGO→USDC (Tinyman) → USDC→TKA (native, deposit from E) without S ever holding USDC', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 4_000_000n
      const usdcMid = await tmQuote(tmPools.algoUsdc, 0n, amountIn)
      const expected = await quote([pools.usdcTka.id], usdc, usdcMid, S)
      const calls0 = await recorder.state.global.swapCalls()
      const result = await guarded(S, () =>
        use(
          wallet,
          swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected, legs: [{ amountIn, segments: [venue(tmAdapter.appId, usdc), seg('usdcTka', tka)] }] }),
        ),
      )
      expect(await holding(S, tka)).toBe(expected)
      expect(await optedIn(S, usdc)).toBe(false)
      expect(await recorder.state.global.swapCalls()).toBe(calls0! + 1n)
      expect(await recorder.state.global.swapCaller()).toBe(S)
      expect(await recorder.state.global.swapRecipient()).toBe(S)
      expect(legEvents(result).map((e) => [e.venue, e.holder, e.assetIn, e.amountIn, e.assetOut, e.amountOut])).toEqual([
        [tmAdapter.appId, legEscrow, 0n, amountIn, usdc, usdcMid],
        [0n, legEscrow, usdc, usdcMid, tka, expected],
      ])
    })

    test('C3 a leg minAmountOut is enforced independently of the aggregate', async () => {
      const wallet = await newTestWallet({ assets: [tka] })
      const S = wallet.client.appAddress.toString()
      const q1 = await quote([pools.algoTka.id], 0n, 1_000_000n, S)
      const legs = (min1: bigint): LegInput[] => [
        { amountIn: 1_000_000n, minAmountOut: min1, segments: [seg('algoTka', tka)] },
        { amountIn: 1_000_000n, segments: [venue(tmAdapter.appId, tka)] },
      ]
      // native last segments pass the leg floor to PluginDex as its minAmountOut
      await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: 0n, legs: legs(q1 + 1n) })), 'errPdsl')
      await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: 0n, legs: legs(q1) })))
    })

    test('C4 shape validation: legs, segments, assets, final asset, measured 0, funds', async () => {
      const wallet = await newTestWallet({ assets: [tka] })
      const S = wallet.client.appAddress.toString()
      const leg = (amountIn = 1_000_000n): LegInput => ({ amountIn, segments: [seg('algoTka', tka)] })
      const swap = (args: Partial<Parameters<AkitaRouterPluginSDK['swap']>[0]>) =>
        use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [leg()], ...args }))
      const assets = [0n, tka]

      await rejected(S, assets, swap({ legs: [leg(), leg(), leg(), leg(), leg()] }), errRtRoute)
      await rejected(S, assets, swap({ legs: [] }), errRtRoute)
      await rejected(S, assets, swap({ legs: [{ amountIn: 1_000_000n, segments: [] }] }), errRtRoute)
      await rejected(
        S,
        assets,
        swap({ legs: [{ amountIn: 1_000_000n, segments: [seg('algoTka', tka), seg('tkaTkb', tkb), seg('tkaTkb', tka), seg('algoTka', tka)] }] }),
        errRtRoute,
      )
      await rejected(S, assets, swap({ assetOut: 0n, legs: [{ amountIn: 1_000_000n, segments: [seg('algoTka', 0n)] }] }), errRtRoute)
      await rejected(S, assets, swap({ legs: [{ amountIn: 0n, segments: [seg('algoTka', tka)] }] }), errRtRoute)
      // the last segment must output assetOut
      await rejected(S, assets, swap({ legs: [{ amountIn: 1_000_000n, segments: [seg('algoTkb1', tkb)] }] }), errRtRoute)
      // a native segment needs a pool escrow and 1..4 pools
      await rejected(S, assets, swap({ legs: [{ amountIn: 1_000_000n, segments: [native(tka, [pools.algoTka.id], ZERO)] }] }), errRtRoute)
      await rejected(S, assets, swap({ legs: [{ amountIn: 1_000_000n, segments: [native(tka, [], pools.algoTka.escrow)] }] }), errRtRoute)
      // a segment that lies about its output asset is measured as 0
      await rejected(
        S,
        assets,
        swap({ legs: [{ amountIn: 1_000_000n, segments: [seg('algoTkb1', usdc), venue(tmAdapter.appId, tka)] }] }),
        errRtSlippage,
      )
      // more input than S holds
      await rejected(S, assets, swap({ legs: [leg((await holding(S, 0n)) + 1n)] }), errRtFunds)
    })
  })

  // D. swapBest -----------------------------------------------------------------------------------

  describe('D. swapBest', () => {
    const candidates = (): SegmentInput[] => [seg('algoTkb1', tkb), seg('algoTkb2', tkb), venue(tmAdapter.appId, tkb)]

    /** per-candidate quotes for S, in candidate order */
    const quotes = async (S: string, amount: bigint) => [
      await quote([pools.algoTkb1.id], 0n, amount, S),
      await quote([pools.algoTkb2.id], 0n, amount, S),
      await tmQuote(tmPools.algoTkb, 0n, amount),
    ]
    const argmax = (values: bigint[]) => values.reduce((best, v, i) => (v > values[best] ? i : best), 0)

    test('D1 the chosen venue follows the best quote (Tinyman, then native pool B)', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 2_000_000n

      // make both native pools worse than Tinyman: buy TKB there first
      await adminNativeSwap('algoTkb1', 0n, 5_000_000n)
      await adminNativeSwap('algoTkb2', 0n, 5_000_000n)
      let q = await quotes(S, amountIn)
      expect(argmax(q)).toBe(2)
      let result = await guarded(S, () => use(wallet, bestCall({ assetIn: 0n, assetOut: tkb, amountIn, minAmountOut: q[2], candidates: candidates() })))
      expect(legEvents(result).map((e) => [e.venue, e.amountOut])).toEqual([[tmAdapter.appId, q[2]]])
      expect(routerReturn(result)).toBe(q[2])

      // now make Tinyman and pool A worse than pool B: buy a lot of TKB on Tinyman and A, sell TKB into B
      await swapDirect(tm, tmPools.algoTkb, admin.addr, 0n, 20_000_000n)
      await adminNativeSwap('algoTkb1', 0n, 10_000_000n)
      await adminNativeSwap('algoTkb2', tkb, 60_000_000n)
      q = await quotes(S, amountIn)
      expect(argmax(q)).toBe(1)
      const poolB0 = await dex.getPool({ args: { poolId: pools.algoTkb2.id } })
      const tkb0 = await holding(S, tkb)
      result = await guarded(S, () => use(wallet, bestCall({ assetIn: 0n, assetOut: tkb, amountIn, minAmountOut: q[1], candidates: candidates() })))
      expect(legEvents(result).map((e) => [e.venue, e.amountOut])).toEqual([[0n, q[1]]])
      expect((await dex.getPool({ args: { poolId: pools.algoTkb2.id } })).reserveA).toBe(poolB0.reserveA + amountIn)
      expect(await holding(S, tkb)).toBe(tkb0 + q[1])
    })

    test('D2 chunks = 4 equals a TS greedy simulation and beats every single venue', async () => {
      // two comparably priced ALGO/TKA venues (native 30 bps, Tinyman 30 bps), so greedy chunks split
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 20_000_000n
      const chunks = 4n
      const pairCandidates = [seg('algoTka', tka), venue(tmAdapter.appId, tka)]

      const model = await nativeModel('algoTka', 0n)
      let tmState = (await readPoolState(tm, tmPools.algoTka.address))!
      const single = [nativeOut(model, amountIn), tinymanFixedInputOut(tmState, 0n, amountIn)]
      // sanity: the native model matches the chain's own quote
      expect(single[0]).toBe(await quote([pools.algoTka.id], 0n, amountIn, S))

      let total = 0n
      const picks: number[] = []
      const base = amountIn / chunks
      for (let c = 0n; c < chunks; c++) {
        const amount = c + 1n === chunks ? amountIn - base * (chunks - 1n) : base
        const q = [nativeOut(model, amount), tinymanFixedInputOut(tmState, 0n, amount)]
        const best = argmax(q)
        picks.push(best)
        total += q[best]
        if (best === 1) [tmState] = tmApply(tmState, 0n, amount)
        else {
          model.rIn += amount
          model.rOut -= q[best]
        }
      }
      console.log(`[D2] greedy picks ${picks.join(',')} total ${total} vs single ${single.join('/')}`)
      expect(new Set(picks).size).toBe(2)
      for (const s of single) expect(total).toBeGreaterThanOrEqual(s)

      const tka0 = await holding(S, tka)
      const result = await guarded(S, () =>
        use(wallet, bestCall({ assetIn: 0n, assetOut: tka, amountIn, minAmountOut: total, chunks, candidates: pairCandidates })),
      )
      expect(await holding(S, tka)).toBe(tka0 + total)
      expect(legEvents(result).map((e) => e.venue)).toEqual(picks.map((pick) => (pick === 1 ? tmAdapter.appId : 0n)))
    })

    test('D3 an over-quoting adapter breaks the quote promise (errRtQuote); a covering tolerance passes', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const lie = 1_000n
      await configureMock(V_OVERQUOTE, lie)
      try {
        const amountIn = 1_000_000n
        const call = (toleranceBps: bigint) =>
          use(wallet, bestCall({ assetIn: 0n, assetOut: tka, amountIn, toleranceBps, candidates: [venue(mock.appId, tka)] }))
        await rejected(S, [0n, tka], call(0n), errRtQuote)
        const { return: quoted } = await mock.send.akitaVenueQuote({ args: { assetIn: 0n, assetOut: tka, amountIn, venueData: noData } })
        const honest = quoted! - lie
        // 10 bps of ~4.95M covers a 1,000-unit lie
        expect((quoted! * 10n) / 10_000n).toBeGreaterThan(lie)
        await guarded(S, () => call(10n))
        expect(await holding(S, tka)).toBe(honest)
      } finally {
        await configureMock(V_HONEST)
      }
    })

    test('D4 a paused native candidate is skipped through tryQuoteRoute', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 1_000_000n
      await dex.send.setPoolPaused({ args: { poolId: pools.algoTkb1.id, paused: true }, populateAppCallResources: true })
      try {
        await expectContractError(quote([pools.algoTkb1.id], 0n, amountIn, S), 'errPdpp')
        const expected = await quote([pools.algoTkb2.id], 0n, amountIn, S)
        const result = await guarded(S, () =>
          use(wallet, bestCall({ assetIn: 0n, assetOut: tkb, amountIn, minAmountOut: expected, candidates: [seg('algoTkb1', tkb), seg('algoTkb2', tkb)] })),
        )
        expect(await holding(S, tkb)).toBe(expected)
        expect(legEvents(result)).toHaveLength(1)
      } finally {
        await dex.send.setPoolPaused({ args: { poolId: pools.algoTkb1.id, paused: false }, populateAppCallResources: true })
      }
    })
  })

  // E. ADVERSARIAL ADAPTERS -----------------------------------------------------------------------

  describe('E. adversarial adapters (MockVenueAdapter)', () => {
    let wallet: WalletSDK
    let S: string
    const mockLeg = (amountIn: bigint, assetOut = tka, minAmountOut = 0n, adapter = mock.appId): LegInput => ({ amountIn, minAmountOut, segments: [venue(adapter, assetOut)] })

    beforeAll(async () => {
      wallet = await newTestWallet({ assets: [tka, tkb] })
      S = wallet.client.appAddress.toString()
      await give(S, tka, 100_000_000n)
    })

    test('honest mock swap passes every guard', async () => {
      const { return: q } = await mock.send.akitaVenueQuote({ args: { assetIn: 0n, assetOut: tka, amountIn: 1_000_000n, venueData: noData } })
      const tka0 = await holding(S, tka)
      await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: q!, legs: [mockLeg(1_000_000n)] })))
      expect(await holding(S, tka)).toBe(tka0 + q!)
    })

    test('E1 keepRekey and rekeyElsewhere → errRtRekeyBack', async () => {
      try {
        await configureMock(V_KEEP_REKEY)
        await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n)] })), errRtRekeyBack)
        await configureMock(V_REKEY_ELSEWHERE, 0n, 0n, admin.addr.toString())
        await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n)] })), errRtRekeyBack)
      } finally {
        await configureMock(V_HONEST)
      }
    })

    test('E2 overspendBaseline (dust donated to E first) → errRtOverspend', async () => {
      await algorand.send.payment({ sender: admin.addr, receiver: legEscrow, amount: microAlgo(1_000_000) })
      try {
        await configureMock(V_OVERSPEND_BASELINE, 1_000n)
        await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n)] })), errRtOverspend)
      } finally {
        await configureMock(V_HONEST)
      }
    })

    test('E3 underdeliver vs the leg minimum → errRtSlippage', async () => {
      const { return: q } = await mock.send.akitaVenueQuote({ args: { assetIn: 0n, assetOut: tka, amountIn: 1_000_000n, venueData: noData } })
      try {
        await configureMock(V_UNDERDELIVER, 1n)
        await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n, tka, q!)] })), errRtSlippage)
      } finally {
        await configureMock(V_HONEST)
      }
    })

    test('E4 feeFromAccount and junkOptIn on an ASA/ASA leg → errRtAlgoLeak', async () => {
      // E holds spendable ALGO (E2's donation) so the venue can actually leak it
      expect(await holding(legEscrow, 0n)).toBeGreaterThanOrEqual(200_000n)
      const { assetId: junk } = await algorand.send.assetCreate({ sender: admin.addr, total: 1_000n, decimals: 0, unitName: 'JUNK' })
      try {
        await configureMock(V_FEE_FROM_ACCOUNT, 2_000n)
        await rejected(S, [0n, tka, tkb], use(wallet, swapCall({ assetIn: tka, assetOut: tkb, legs: [mockLeg(1_000_000n, tkb)] })), errRtAlgoLeak)
        await configureMock(V_JUNK_OPT_IN, junk)
        await rejected(S, [0n, tka, tkb], use(wallet, swapCall({ assetIn: tka, assetOut: tkb, legs: [mockLeg(1_000_000n, tkb)] })), errRtAlgoLeak)
        expect(await optedIn(legEscrow, junk)).toBe(false)
      } finally {
        await configureMock(V_HONEST)
      }
    })

    test('E11 partial fill on the first segment: exactly the unspent input goes back to S, E stays at baseline', async () => {
      const amountIn = 1_000_000n
      const unspent = 300_000n
      const { return: q } = await mock.send.akitaVenueQuote({ args: { assetIn: 0n, assetOut: tka, amountIn: amountIn - unspent, venueData: noData } })
      const [algo0, tka0] = [await holding(S, 0n), await holding(S, tka)]
      try {
        await configureMock(V_PARTIAL_FILL, unspent)
        const result = await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(amountIn)] })))
        expect(routerReturn(result)).toBe(q!)
      } finally {
        await configureMock(V_HONEST)
      }
      expect(await holding(S, tka)).toBe(tka0 + q!)
      // S paid only what the venue took (the wallet's caller pays the fees)
      expect(algo0 - (await holding(S, 0n))).toBe(amountIn - unspent)
    })

    test('E12 partial fill on an intermediate segment: refunded to S when S holds the asset, else errRtSlippage', async () => {
      const amountIn = 1_000_000n
      const unspent = 1_000n
      // ALGO →(native) TKA in E →(mock, partial) TKB: the unspent input is TKA, an intermediate asset
      const legs = [{ amountIn, minAmountOut: 0n, segments: [seg('algoTka', tka), venue(mock.appId, tkb)] }]
      try {
        await configureMock(V_PARTIAL_FILL, unspent)
        // S opted into TKA: the TKA leftover goes back to S
        const tka0 = await holding(S, tka)
        await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tkb, legs })))
        expect(await holding(S, tka)).toBe(tka0 + unspent)
        // S2 holds no TKA: nothing may keep the leftover, so the whole route reverts
        const other = await newTestWallet({ assets: [tkb] })
        const S2 = other.client.appAddress.toString()
        expect(await optedIn(S2, tka)).toBe(false)
        await rejected(S2, [0n, tkb], use(other, swapCall({ assetIn: 0n, assetOut: tkb, legs })), errRtSlippage)
      } finally {
        await configureMock(V_HONEST)
      }
    })

    test('E13 an adapter that closes an E opt-in on an ALGO-in leg → errRtAlgoLeak (the freed MBR never reaches S)', async () => {
      expect(await optedIn(legEscrow, tkb)).toBe(true)
      expect(await holding(legEscrow, tkb)).toBe(0n)
      try {
        await configureMock(V_CLOSE_OPT_IN, tkb)
        await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n)] })), errRtAlgoLeak)
      } finally {
        await configureMock(V_HONEST)
      }
      expect(await optedIn(legEscrow, tkb)).toBe(true)
    })

    test('E14 an adapter that grows E\'s input balance (refund > amount) → errRtOverspend', async () => {
      try {
        await configureMock(V_DONATE_INPUT, 1_000_001n)
        await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n)] })), errRtOverspend)
      } finally {
        await configureMock(V_HONEST)
      }
    })

    test.todo('E5 moveOtherAsset in DIRECT is not caught (documents the DIRECT limit; deferred to R4)')

    test('E6 adapter not registered, disabled, or updated → errRtAdapter / errRtAdapterVer', async () => {
      // not registered (any app id)
      await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n, tka, 0n, recorder.appId)] })), errRtAdapter)
      // disabled
      await registry.send.setAdapter({ args: { adapter: mock.appId, info: adapterInfo({ flags: 0n, innerTxns: 4n }) } })
      try {
        await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n)] })), errRtAdapter)
      } finally {
        await registry.send.setAdapter({ args: { adapter: mock.appId, info: adapterInfo({ innerTxns: 4n }) } })
      }
      // updated after approval: version 1 vs pinned 0, until re-approved
      const mock2 = (
        await algorand.client.getTypedAppFactory(MockVenueAdapterFactory, { defaultSender: admin.addr, defaultSigner: admin.signer }).send.create.create({ args: {} })
      ).appClient
      await mock2.appClient.fundAppAccount({ amount: (20).algos() })
      await mock2.send.optIn({ args: { asset: tka }, ...autoFees })
      await give(mock2.appAddress.toString(), tka, 100_000_000n)
      await registry.send.setAdapter({ args: { adapter: mock2.appId, info: adapterInfo({ innerTxns: 4n }) } })
      await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n, tka, 0n, mock2.appId)] })))
      await algorand.send.appUpdateMethodCall({
        sender: admin.addr,
        appId: mock2.appId,
        method: mock2.appClient.getABIMethod('update'),
        args: [],
        approvalProgram: Buffer.from(MockVenueSpec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(MockVenueSpec.byteCode!.clear, 'base64'),
      })
      const info = await algorand.app.getById(mock2.appId)
      expect(BigInt(info.version ?? 0)).toBe(1n)
      await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n, tka, 0n, mock2.appId)] })), errRtAdapterVer)
      await registry.send.setAdapter({ args: { adapter: mock2.appId, info: adapterInfo({ version: 1n, innerTxns: 4n }) } })
      await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [mockLeg(1_000_000n, tka, 0n, mock2.appId)] })))
    })

    test('E7 an adapter called at top level with returnTo ≠ caller → errVaReturnTo', async () => {
      const account = algorand.account.random()
      await algorand.send.payment({ sender: admin.addr, receiver: account.addr, amount: microAlgo(1_000_000) })
      const group = tmAdapter
        .newGroup()
        .addTransaction(
          await algorand.createTransaction.payment({ sender: account.addr, receiver: account.addr, amount: microAlgo(0), rekeyTo: tmAdapter.appAddress }),
          account.signer,
        )
        .akitaVenueSwap({
          args: { account: account.addr.toString(), assetIn: 0n, amountIn: 100_000n, assetOut: usdc, minAmountOut: 0n, venueData: noData, returnTo: account.addr.toString() },
          ...autoFees,
        })
      await expectContractError(group.send(autoFees), 'errVaReturnTo')
      expect(await authAddr(account.addr.toString())).toBeUndefined()
    })

    test('E8 router swap without a wallet window → errRtCustody', async () => {
      await expectContractError(
        router.client.send.swap({
          args: { wallet: wallet.client.appId, rekeyBack: true, assetIn: 0n, assetOut: tka, minAmountOut: 0n, flags: 0n, legs: [[1_000_000n, 0n, [[0n, tka, [pools.algoTka.id], pools.algoTka.escrow, noData]]]] },
          ...autoFees,
        }),
        errRtCustody,
      )
    })

    test('E10 a fake wallet whose spending_address is the leg escrow E → errRtCustody; E stays rekeyed to the router', async () => {
      // attacker: any app publishing global 'spending_address' = E (test-only raw TEAL; not contract code)
      const attacker = algorand.account.random()
      await algorand.send.payment({ sender: admin.addr, receiver: attacker.addr, amount: microAlgo(5_000_000) })
      const approval = [
        '#pragma version 10',
        'txn ApplicationID',
        'bnz done',
        'byte "spending_address"',
        'txna ApplicationArgs 0',
        'app_global_put',
        'done:',
        'int 1',
      ].join('\n')
      const { appId: fakeWallet } = await algorand.send.appCreate({
        sender: attacker.addr,
        signer: attacker.signer,
        approvalProgram: approval,
        clearStateProgram: '#pragma version 10\nint 1',
        schema: { globalInts: 0, globalByteSlices: 1, localInts: 0, localByteSlices: 0 },
        args: [decodeAddress(legEscrow).publicKey],
      })
      // ALGO for E to "spend" (E2 may not have run under a test filter)
      await algorand.send.payment({ sender: attacker.addr, signer: attacker.signer, receiver: legEscrow, amount: microAlgo(1_200_000) })
      const e0 = await legEscrowSnapshot()
      expect(e0.auth).toBe(router.client.appAddress.toString())

      const swapParams = await router.client.params.swap({
        sender: attacker.addr,
        signer: attacker.signer,
        args: { wallet: fakeWallet, rekeyBack: true, assetIn: 0n, assetOut: tka, minAmountOut: 0n, flags: 0n, legs: [[1_000_000n, 0n, [[0n, tka, [pools.algoTka.id], pools.algoTka.escrow, noData]]]] },
        maxFee: microAlgo(100_000),
      })
      const group = algorand.newGroup().addAppCallMethodCall(swapParams)
      // opcode budget carriers, so only the custody check (not the 700-opcode budget) can stop the call
      for (let i = 0; i < 3; i += 1) {
        group.addAppCallMethodCall(
          await router.client.params.opUp({ sender: attacker.addr, signer: attacker.signer, args: {}, maxFee: microAlgo(10_000), note: `carrier ${i}` }),
        )
      }
      await expectContractError(group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true }), errRtCustody)
      expect(await legEscrowSnapshot()).toEqual(e0)
      expect(await authAddr(legEscrow)).toBe(router.client.appAddress.toString())
    })

    test('E11 a fee-only hook that flips a fake wallet\'s spending_address to E mid-swap → errRtCustody at the handback; E stays rekeyed to the router', async () => {
      // attacker: one raw-TEAL app (test-only, not contract code) acting as both fake wallet and hook.
      // Top-level call: arg0 → global 'flip'. Called by the Vault as akitaDexHook: spending_address = flip,
      // return a pass HookResult. enter() sees spending_address = A (rekeyed to the router), the hook then
      // points it at E before finish() hands back
      const attacker = algorand.account.random()
      const throwaway = algorand.account.random()
      await algorand.send.payment({ sender: admin.addr, receiver: attacker.addr, amount: microAlgo(5_000_000) })
      await algorand.send.payment({ sender: admin.addr, receiver: throwaway.addr, amount: microAlgo(5_000_000) })
      const approval = [
        '#pragma version 10',
        'txn ApplicationID',
        'bnz call',
        'byte "spending_address"',
        'txna ApplicationArgs 0',
        'app_global_put',
        'byte "flip"',
        'txna ApplicationArgs 0',
        'app_global_put',
        'int 1',
        'return',
        'call:',
        'global CallerApplicationID',
        'bnz hook',
        'byte "flip"',
        'txna ApplicationArgs 0',
        'app_global_put',
        'int 1',
        'return',
        'hook:',
        'byte "spending_address"',
        'byte "flip"',
        'app_global_get',
        'app_global_put',
        `byte 0x151f7c75${'00'.repeat(32)}`,
        'log',
        'int 1',
      ].join('\n')
      const A = throwaway.addr.toString()
      const { appId: fakeApp } = await algorand.send.appCreate({
        sender: attacker.addr,
        signer: attacker.signer,
        approvalProgram: approval,
        clearStateProgram: '#pragma version 10\nint 1',
        schema: { globalInts: 0, globalByteSlices: 2, localInts: 0, localByteSlices: 0 },
        args: [decodeAddress(A).publicKey],
      })
      // the admin approves it as a fee-only (no custody) hook, installed at BeforeSwap on an ALGO/TKA pool
      await dex.send.setHookApproval({ args: { hook: fakeApp, perms: DYNAMIC_FEE }, populateAppCallResources: true })
      await nativePool('algoTkaFlip', 0n, tka, 100_000_000n, 500_000_000n, 30n, [hookInstall({ app: fakeApp, points: BEFORE_SWAP, perms: 0n })])
      // A is rekeyed to the router (a "window" the fake wallet controls)
      await algorand.send.payment({ sender: throwaway.addr, signer: throwaway.signer, receiver: throwaway.addr, amount: microAlgo(0), rekeyTo: router.client.appAddress })
      const setFlip = (target: string) =>
        algorand.send.appCall({ sender: attacker.addr, signer: attacker.signer, appId: fakeApp, args: [decodeAddress(target).publicKey], note: `flip ${target}` })
      const attempt = async (note: string) => {
        const swapParams = await router.client.params.swap({
          sender: attacker.addr,
          signer: attacker.signer,
          args: { wallet: fakeApp, rekeyBack: true, assetIn: 0n, assetOut: tka, minAmountOut: 0n, flags: 0n, legs: [[1_000_000n, 0n, [[0n, tka, [pools.algoTkaFlip.id], pools.algoTkaFlip.escrow, noData]]]] },
          maxFee: microAlgo(100_000),
          note,
        })
        const group = algorand.newGroup().addAppCallMethodCall(swapParams)
        for (let i = 0; i < 4; i += 1) {
          group.addAppCallMethodCall(
            await router.client.params.opUp({ sender: attacker.addr, signer: attacker.signer, args: {}, maxFee: microAlgo(10_000), note: `${note} carrier ${i}` }),
          )
        }
        return group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true })
      }

      // attack: the hook flips spending_address to E during swapRoute
      await setFlip(legEscrow)
      const e0 = await legEscrowSnapshot()
      expect(e0.auth).toBe(router.client.appAddress.toString())
      await expectContractError(attempt('flip to E'), errRtCustody)
      expect(await legEscrowSnapshot()).toEqual(e0)
      expect(await authAddr(A)).toBe(router.client.appAddress.toString())

      // control: the same path with a no-op flip (A → A) confirms, so the revert above was the handback check;
      // S (not E) is handed back to the wallet app and E is untouched
      await setFlip(A)
      const a0 = await holding(A, tka)
      await attempt('flip to A')
      expect(await holding(A, tka)).toBeGreaterThan(a0)
      expect(await authAddr(A)).toBe(getApplicationAddress(fakeApp).toString())
      expect(await legEscrowSnapshot()).toEqual(e0)
    })

    test.todo('E9 T7 probe:callWalletAsAccount in DIRECT against an admin-scoped plugin on a named escrow (deferred to R4)')
  })

  // F. WALLET INTEGRATION -------------------------------------------------------------------------

  describe('F. wallet integration', () => {
    test('F1 escrow profile with a flat allowance: output lands in the escrow; over-allowance fails in the wallet', async () => {
      const wallet = await newTestWallet({ install: false })
      const escrowName = 'swap'
      await wallet.addPlugin({ client: router, callerType: CallerType.Global, escrow: escrowName, allowances: [{ type: 'flat', asset: 0n, amount: 5_000_000n }] })
      const escrowAddress = (await wallet.getEscrow(escrowName)).address.toString()
      const amountIn = 500_000n
      const expected = await quote([pools.algoTka.id], 0n, amountIn, escrowAddress)
      const call = (fund: bigint) =>
        wallet.usePlugin({
          callerType: CallerType.Global,
          escrow: escrowName,
          fundsRequest: [{ asset: 0n, amount: fund }],
          calls: [swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected, legs: [{ amountIn, segments: [seg('algoTka', tka)] }] })],
        })
      // an ARC-58 escrow stays rekeyed to the wallet app between windows
      const walletAddress = wallet.client.appAddress.toString()
      await guarded(escrowAddress, () => call(1_000_000n), walletAddress)
      expect(await holding(escrowAddress, tka)).toBe(expected)
      expect(await optedIn(wallet.client.appAddress.toString(), tka)).toBe(false)
      // 1 ALGO of the 5 ALGO allowance is spent
      await expectContractError(call(4_000_001n), errAllowanceExceeded)
      expect(await authAddr(escrowAddress)).toBe(walletAddress)
    })

    test('F2 method restrictions: only swap is allowed, so swapBest is rejected by the wallet', async () => {
      const wallet = await newTestWallet({ install: false })
      const S = wallet.client.appAddress.toString()
      await wallet.addPlugin({ client: router, callerType: CallerType.Global, methods: [{ name: router.swap(), cooldown: 0n }] })
      await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, legs: [{ amountIn: 1_000_000n, segments: [seg('algoTka', tka)] }] })))
      // the SDK refuses to build it ...
      await expect(use(wallet, bestCall({ assetIn: 0n, assetOut: tka, amountIn: 1_000_000n, candidates: [seg('algoTka', tka)] }))).rejects.toThrow(/selector/)
      // ... and the wallet rejects a hand-built window that uses swap's offset for swapBest
      const best = await router.client.params.swapBest({
        args: { wallet: wallet.client.appId, rekeyBack: true, assetIn: 0n, assetOut: tka, amountIn: 1_000_000n, minAmountOut: 0n, flags: 0n, chunks: 1n, toleranceBps: 0n, candidates: [[0n, tka, [pools.algoTka.id], pools.algoTka.escrow, noData]] },
        maxFee: microAlgo(100_000),
      })
      const group = algorand
        .newGroup()
        .addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({ args: { plugin: router.appId, type: CallerType.Global, escrow: '', methodOffsets: [0n], fundsRequest: [] }, maxFee: microAlgo(10_000) }))
        .addAppCallMethodCall(best)
        .addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ args: {}, maxFee: microAlgo(10_000) }))
      await expectContractError(group.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true }), errMethodOnCooldown)
      expect(await authAddr(S)).toBeUndefined()
    })

    test('F3 two router calls in one window (the first with rekeyBack = false)', async () => {
      const wallet = await newTestWallet({ assets: [tka] })
      const S = wallet.client.appAddress.toString()
      const q1 = await quote([pools.algoTka.id], 0n, 1_000_000n, S)
      const result = await guarded(S, () =>
        use(
          wallet,
          swapCall({ rekeyBack: false, assetIn: 0n, assetOut: tka, legs: [{ amountIn: 1_000_000n, segments: [seg('algoTka', tka)] }] }),
          swapCall({ assetIn: 0n, assetOut: tka, legs: [{ amountIn: 1_000_000n, segments: [venue(tmAdapter.appId, tka)] }] }),
        ),
      )
      expect(result.transactions.filter((t) => t.applicationCall?.appIndex === router.appId)).toHaveLength(2)
      expect(await holding(S, tka)).toBeGreaterThan(q1)
    })

    test('F4 a carrier inside the window → errCannotCallOtherAppsDuringRekey; after verify it passes', async () => {
      const wallet = await newTestWallet({ assets: [tka] })
      const S = wallet.client.appAddress.toString()
      const swapParams = await router.client.params.swap({
        args: { wallet: wallet.client.appId, rekeyBack: true, assetIn: 0n, assetOut: tka, minAmountOut: 0n, flags: 0n, legs: [[1_000_000n, 0n, [[0n, tka, [pools.algoTka.id], pools.algoTka.escrow, noData]]]] },
        maxFee: microAlgo(100_000),
      })
      const inside = algorand
        .newGroup()
        .addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({ args: { plugin: router.appId, type: CallerType.Global, escrow: '', methodOffsets: [], fundsRequest: [] }, maxFee: microAlgo(10_000) }))
        .addAppCallMethodCall(await dex.params.opUp({ args: {}, maxFee: microAlgo(10_000) }))
        .addAppCallMethodCall(swapParams)
        .addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ args: {}, maxFee: microAlgo(10_000) }))
      await expectContractError(inside.send({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true }), errCannotCallOtherAppsDuringRekey)
      expect(await authAddr(S)).toBeUndefined()

      const { group } = await wallet.prepareUsePlugin({
        callerType: CallerType.Global,
        calls: [swapCall({ assetIn: 0n, assetOut: tka, legs: [{ amountIn: 1_000_000n, segments: [seg('algoTka', tka)] }] })],
      })
      ;(await group.composer()).addAppCallMethodCall(await router.client.params.opUp({ args: {}, maxFee: microAlgo(10_000) }))
      const result = await guarded(S, () => group.send({ ...wallet.sendParams }))
      expect(result.txIds.length).toBeGreaterThanOrEqual(4)
    })

    test('F5 build.usePlugin expectedCost.totalAlgo == the actual ALGO cost', async () => {
      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 1_500_000n
      const build = await wallet.build.usePlugin({
        lease: 'router_cost_1',
        callerType: CallerType.Global,
        calls: [swapCall({ assetIn: 0n, assetOut: tka, legs: [{ amountIn, segments: [seg('algoTka', tka)] }] })],
      })
      const before = await balance(S)
      await build.send()
      const actual = before - (await balance(S))
      console.log(`[F5] expectedCost ${build.expectedCost.totalAlgo} actual ${actual}`)
      expect(build.expectedCost.totalAlgo).toBe(actual)
      expect(actual).toBe(amountIn)
    })
  })

  // G. LIMITS AND MEASUREMENT ---------------------------------------------------------------------

  describe('G. limits and measurement', () => {
    test('G1 routes 1-5: recursive inner counts and appBudgetConsumed', async () => {
      // pre-opted wallet and E, so no inline opt-ins are counted
      const wallet = await newTestWallet({ assets: [tka, tkb, usdc] })
      const S = wallet.client.appAddress.toString()
      type Extra = Pick<SwapArgs, 'staticFee'>
      const routes: [string, (extra: Extra) => ReturnType<AkitaRouterPluginSDK['swap']>][] = [
        ['1 ALGO→TKA native 1 hop', (x) => swapCall({ ...x, assetIn: 0n, assetOut: tka, legs: [{ amountIn: 1_000_000n, segments: [seg('algoTka', tka)] }] })],
        [
          '2 ALGO→TKB native 2 hops (hook on hop 2)',
          (x) => swapCall({ ...x, assetIn: 0n, assetOut: tkb, legs: [{ amountIn: 1_000_000n, segments: [native(tkb, [pools.algoTka.id, pools.tkaTkb.id], pools.algoTka.escrow)] }] }),
        ],
        [
          '3 split 70% native + 30% Tinyman',
          (x) =>
            swapCall({
              ...x,
              assetIn: 0n,
              assetOut: tka,
              legs: [
                { amountIn: 700_000n, segments: [seg('algoTka', tka)] },
                { amountIn: 300_000n, segments: [venue(tmAdapter.appId, tka)] },
              ],
            }),
        ],
        [
          '4 chain Tinyman ALGO→USDC → native USDC→TKA',
          (x) => swapCall({ ...x, assetIn: 0n, assetOut: tka, legs: [{ amountIn: 1_000_000n, segments: [venue(tmAdapter.appId, usdc), seg('usdcTka', tka)] }] }),
        ],
        [
          '5 swapBest 4 chunks × {native A, native B, Tinyman}',
          (x) => bestCall({ ...x, assetIn: 0n, assetOut: tkb, amountIn: 4_000_000n, chunks: 4n, candidates: [seg('algoTkb1', tkb), seg('algoTkb2', tkb), venue(tmAdapter.appId, tkb)] }),
        ],
      ]
      // `inners` excludes ensureBudget op-up inners (app creates): how many of those run depends on the
      // Vault's and hooks' current opcode cost and on where the SDK places outer carriers, so they are
      // only logged and bounded, while the structural inner count stays pinned
      const measured: Record<string, { inners: number; opUps: number; outer: number; budget: number }> = {}
      for (const [name, build] of routes) {
        const budget = await simulateBudget(wallet, build({ staticFee: microAlgo(150_000) }))
        const result = await guarded(S, () => use(wallet, build({})))
        const opUps = result.confirmations.reduce((n, c) => n + allInners(c).filter((t) => t.txn.txn.applicationCall?.appIndex === 0n).length, 0)
        measured[name] = { inners: groupInners(result) - opUps, opUps, outer: result.txIds.length, budget }
      }
      console.log('[G1]', JSON.stringify(measured, null, 1))
      // regression pins (FINAL-SPEC §1: 256 inner txns per group; router.md §8.2 numbers corrected)
      expect(Object.values(measured).map((m) => m.inners)).toEqual([5, 7, 12, 12, 26])
      for (const m of Object.values(measured)) expect(m.opUps).toBeLessThanOrEqual(4)
      // the SDK discovers at the group's real opcode budget, so routes 3 and 4 top up with one in-contract
      // op-up inner (counted in opUps) instead of an extra outer opcode carrier
      expect(Object.values(measured).map((m) => m.outer)).toEqual([3, 3, 3, 3, 3])
    })

    test('G2 route 6 (4 legs × native 4 hops, 2 hooks per pool at Before+After): far above 16 inners per outer call, no carriers for inner slots', async () => {
      // three extra assets and four hooked pools forming ALGO→TKA→X1→X2→X3
      const asset = async (unitName: string) => (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName })).assetId
      const x1 = await asset('X1')
      const x2 = await asset('X2')
      const x3 = await asset('X3')
      const hookApp = async () => {
        const hook = (
          await algorand.client
            .getTypedAppFactory(RouterRecordingHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
            .send.create.create({ args: { dex: dex.appId } })
        ).appClient
        await dex.send.setHookApproval({ args: { hook: hook.appId, perms: DYNAMIC_FEE }, populateAppCallResources: true })
        return hookInstall({ app: hook.appId, points: BEFORE_SWAP | AFTER_SWAP | QUOTE, perms: 0n })
      }
      const hooks = [await hookApp(), await hookApp()]
      await nativePool('r6a', 0n, tka, 100_000_000n, 500_000_000n, 30n, hooks)
      await nativePool('r6b', tka, x1, 1_000_000_000n, 1_000_000_000n, 30n, hooks)
      await nativePool('r6c', x1, x2, 1_000_000_000n, 1_000_000_000n, 30n, hooks)
      await nativePool('r6d', x2, x3, 1_000_000_000n, 1_000_000_000n, 30n, hooks)
      const route = [pools.r6a.id, pools.r6b.id, pools.r6c.id, pools.r6d.id]

      const wallet = await newTestWallet({ assets: [x3] })
      const S = wallet.client.appAddress.toString()
      const legs: LegInput[] = [1n, 2n, 3n, 4n].map((i) => ({ amountIn: 250_000n * i, segments: [native(x3, route, pools.r6a.escrow)] }))
      const result = await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: x3, legs, maxFee: microAlgo(400_000) })))
      const inners = groupInners(result)
      const carriers = result.transactions.filter((t) => t.note && new TextDecoder().decode(t.note).startsWith('akta-access-carrier-')).length
      console.log(`[G2] route 6: ${inners} inner txns, ${result.txIds.length} outer txns (${carriers} SDK carriers for refs/budget)`)
      // the old "16 per app call" rule would cap 3 outer app calls at 48 inners; under the 256-per-group pool
      // the SDK's carriers exist for refs/budget only: even counting them, 16 per outer txn could not hold this
      expect(inners).toBeGreaterThan(48)
      expect(inners).toBeGreaterThan(16 * result.txIds.length)
      // the SDK's carriers issue no inner txns themselves: they never stand in for inner slots
      const carrierInners = result.transactions
        .map((t, i) => (t.note && new TextDecoder().decode(t.note).startsWith('akta-access-carrier-') ? countInners(result.confirmations[i]) : 0))
        .reduce((a, b) => a + b, 0)
      expect(carrierInners).toBe(0)
      expect(countInners(result.confirmations[routerTxn(result)])).toBeGreaterThan(16 * result.txIds.length)
      expect(await holding(S, x3)).toBeGreaterThan(0n)
    })

    test('H3 program sizes: router ≤ 14,000 B and fits extraProgramPages 1', () => {
      const len = Buffer.from(RouterSpec.byteCode!.approval, 'base64').length + Buffer.from(RouterSpec.byteCode!.clear, 'base64').length
      console.log(`[H3] AkitaRouterPlugin approval+clear ${len} B`)
      expect(len).toBeLessThanOrEqual(14_000)
      expect(len).toBeLessThanOrEqual(4_096)
    })
  })

  // H. INTEGRATION WITH WP2 / WP3 / WP5a CONTRACTS ----------------------------------------------

  describe('H. integration (gated fee, bins, backrun)', () => {
    const pay = (receiver: string, amount: bigint) => algorand.createTransaction.payment({ sender: admin.addr, receiver, amount: microAlgo(amount) })

    test('H1 a native leg into a gated pool quotes and swaps with the same fee: discounted for the hinted principal with a pass, full without', async () => {
      // principal-resolution §6.12: the hook resolves the router's wallet hint against its DAO's wallet factory,
      // so it is bound to a mirror of the test DAO that names the factory these wallets come from
      const mirror = (
        await algorand.client
          .getTypedAppFactory(MockMirrorDaoFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { source: daoAppId, walletFactory: walletFactory.appId, daoWallet: 0n } })
      ).appClient.appId
      const hook: GatedFeeHookClient = (
        await algorand.client
          .getTypedAppFactory(GatedFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId, akitaDao: mirror, passTtl: 0n } })
      ).appClient
      await hook.appClient.fundAppAccount({ amount: (1).algos() })
      await dex.send.setHookApproval({ args: { hook: hook.appId, perms: DYNAMIC_FEE }, populateAppCallResources: true })
      // F6 schedule (akita-hooks A5): impact ≥ 500 halves the fee, floor 10 bps
      const schedule = ABIType.from('(uint64,uint64,uint64,(uint64,uint64,uint64,uint64)[])').encode([10n, 5_000n, 0n, [[0n, 500n, 0n, 5_000n]]])
      const gated = hookInstall({ app: hook.appId, points: AFTER_INITIALIZE | BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE, funding: 17_300n + 12_800n, initData: schedule })
      await nativePool('gated', 0n, tka, 100_000_000n, 500_000_000n, 100n, [gated])
      expect((await hook.getSchedule({ args: { poolId: pools.gated.id } })).tiers).toHaveLength(1)

      const member = await newTestWallet()
      const S = member.client.appAddress.toString()
      const outsider = await newTestWallet()
      const S2 = outsider.client.appAddress.toString()
      // the pass is keyed by the principal (a default wallet: S == W.address == C); admin's own pass never applies
      for (const account of [S, admin.addr.toString()]) await impact.send.setImpact({ args: { account, impact: 800n }, ...autoFees })
      // only the principal opens its pass: admin cannot (P2-DEX-01), the member's window can, through a pass plugin
      await expectContractError(
        hook.send.openPass({ args: { mbr: pay(hook.appAddress.toString(), await hook.passCost()), key: S, measure: MEASURE_IMPACT, gateArgs: [], wallet: 0n }, ...autoFees }),
        'errGfau',
      )
      const passPlugin = (
        await algorand.client
          .getTypedAppFactory(MockGatedFeePluginFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { hook: hook.appId, akitaDao: mirror } })
      ).appClient
      await passPlugin.appClient.fundAppAccount({ amount: microAlgo(200_000) })
      await addRawPlugin(member, { plugin: passPlugin.appId }, { sender: admin.addr, signer: admin.signer })
      const window = algorand.newGroup()
      window.addAppCallMethodCall(
        await member.client.params.arc58RekeyToPlugin({
          args: { plugin: passPlugin.appId, type: CallerType.Global, escrow: '', methodOffsets: [], fundsRequest: [] },
          maxFee: microAlgo(10_000),
        }),
      )
      window.addAppCallMethodCall(
        await passPlugin.params.openPass({ args: { wallet: member.client.appId, rekeyBack: true, key: S, measure: MEASURE_IMPACT, gateArgs: [] }, maxFee: microAlgo(100_000) }),
      )
      window.addAppCallMethodCall(await member.client.params.arc58VerifyAuthAddress({ args: {}, maxFee: microAlgo(10_000) }))
      await window.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
      const pass = await hook.getPass({ args: { key: S } })
      expect(pass.impact).toBe(800n)
      expect(pass.funder).toBe(S)
      expect(await hook.previewFee({ args: { poolId: pools.gated.id, key: S, feeBps: 100n } })).toBe(50n)
      expect(await hook.previewFee({ args: { poolId: pools.gated.id, key: S2, feeBps: 100n } })).toBe(100n)

      const amountIn = 1_000_000n
      for (const [wallet, address, feeBps] of [
        [member, S, 50n],
        [outsider, S2, 100n],
      ] as const) {
        const model = await nativeModel('gated', 0n)
        const expected = await quote([pools.gated.id], 0n, amountIn, address)
        expect(expected).toBe(nativeOut({ ...model, feeBps }, amountIn))
        const result = await guarded(address, () =>
          use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected, legs: [{ amountIn, segments: [seg('gated', tka)] }] })),
        )
        expect(routerReturn(result)).toBe(expected)
        expect(await holding(address, tka)).toBe(expected)
        // the pool booked exactly the discounted (or full) LP fee: reserves move by the CP math at that fee
        const after = await dex.getPool({ args: { poolId: pools.gated.id } })
        expect([after.reserveA, after.reserveB]).toEqual([model.rIn + amountIn, model.rOut - expected])
      }
    })

    test('H2 a native leg through a bins pool (BinEngine curve) == quoteRoute, alone and chained with a CP hop', async () => {
      const engine: BinEngineClient = (
        await algorand.client
          .getTypedAppFactory(BinEngineFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { vault: dex.appId }, extraProgramPages: 3 })
      ).appClient
      await engine.appClient.fundAppAccount({ amount: microAlgo(200_000) })
      await engine.send.initBinStep({ args: { mbr: pay(engine.appAddress.toString(), 1_000_000n), binStep: 25n }, ...autoFees })
      await dex.send.setCurveApproval({ args: { curve: engine.appId, lpMode: LP_MODE_CURVE, approved: true }, populateAppCallResources: true })
      const active = IdCenter + 16n
      const curveArgs = encodeInitArgs({
        binStep: 25n,
        activeId: active,
        baseFactor: 10_000n,
        varFeeControl: 0n,
        filterPeriod: 30n,
        decayPeriod: 600n,
        reductionFactor: 5_000n,
        maxVa: 350_000n,
        minBinShares: 1n << 32n, // the BinEngine floor (errBnMs below 2^32)
        maxBinsPerSwap: 64n,
      })
      const { poolId, escrow } = await createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(25n, { curve: engine.appId, curveMbr: 1_000_000n, curveArgs }) })
      pools.bins = { id: poolId, escrow }
      // active bin both sides, TKA (Y) in 3 bins below, ALGO (X) in 3 bins above
      const dist = [-3n, -2n, -1n, 0n, 1n, 2n, 3n].map((delta) => ({ delta, distX: delta >= 0n ? 250_000_000n : 0n, distY: delta <= 0n ? 250_000_000n : 0n }))
      await dex.send.addLiquidityCurve({
        args: {
          mbr: pay(dex.appAddress.toString(), 3_000_000n),
          depositA: transferTxn(algorand, admin, escrow, 0n, 30_000_000n),
          depositB: transferTxn(algorand, admin, escrow, tka, 30_000_000n),
          poolId,
          positionId: 0n,
          minShares: 0n,
          curveArgs: encodeAddArgs(active, 0n, dist),
          data: noData,
        },
        ...sendParams,
      })

      const wallet = await newTestWallet({ assets: [tka, tkb] })
      const S = wallet.client.appAddress.toString()
      const amountIn = 1_000_000n
      // 1 hop: ALGO→TKA on the bins pool
      const before = await dex.getPool({ args: { poolId } })
      const expected = await quote([poolId], 0n, amountIn, S)
      expect(expected).toBeGreaterThan(0n)
      let result = await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected, legs: [{ amountIn, segments: [seg('bins', tka)] }] })))
      expect(routerReturn(result)).toBe(expected)
      expect(await holding(S, tka)).toBe(expected)
      const after = await dex.getPool({ args: { poolId } })
      expect([after.reserveA, after.reserveB]).toEqual([before.reserveA + amountIn, before.reserveB - expected])
      // the curve app ran under the router's Vault call
      expect(allInners(result.confirmations[routerTxn(result)]).some((t) => t.txn.txn.applicationCall?.appIndex === engine.appId)).toBe(true)

      // 2 hops: ALGO→TKA (bins) → TKB (CP with the recording hook) in one native segment
      const route = [poolId, pools.tkaTkb.id]
      const expected2 = await quote(route, 0n, amountIn, S)
      result = await guarded(S, () => use(wallet, swapCall({ assetIn: 0n, assetOut: tkb, minAmountOut: expected2, legs: [{ amountIn, segments: [native(tkb, route, escrow)] }] })))
      expect(routerReturn(result)).toBe(expected2)
      expect(await holding(S, tkb)).toBe(expected2)
      // a quote + 1 floor fails inside the Vault (last segment's venue minimum)
      const expected3 = await quote([poolId], 0n, amountIn, S)
      await rejected(S, [0n, tka], use(wallet, swapCall({ assetIn: 0n, assetOut: tka, minAmountOut: expected3 + 1n, legs: [{ amountIn, minAmountOut: expected3 + 1n, segments: [seg('bins', tka)] }] })), 'errPdsl')
    })

    test('WP3 (13) a router swap on a backrun pool runs the backrun within the call-depth limit', async () => {
      const tkc = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TKC' })).assetId
      const tmPool = await bootstrapPool(tm, admin.addr, 0n, tkc)
      await addInitialLiquidity(tm, tmPool, admin.addr, 0n, 500_000_000n, 2_500_000_000n)
      const hook: BackrunArbHookClient = (
        await algorand.client
          .getTypedAppFactory(BackrunArbHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId, tinyman: tm.appId, admin: admin.addr.toString() } })
      ).appClient
      // account + venue box MBR only: no gas tank (OPEN-DECISIONS #19, the swapper's group pays every inner)
      await hook.appClient.fundAppAccount({ amount: microAlgo(200_000) })
      await dex.send.setHookApproval({ args: { hook: hook.appId, perms: CUSTODY }, populateAppCallResources: true })
      // our pool prices TKC 5% cheaper than Tinyman (backrun-arb.e2e newPool with gapBps = 500); the whole
      // surplus above the guard fee stays with LPs (no tip, no rebate)
      const tm0 = (await readPoolState(tm, tmPool.address))!
      const hookBalance = (await algorand.account.getInformation(hook.appAddress)).balance.microAlgo
      const rA = 300_000_000n
      const rB = (rA * tm0.reserve1 * 10_500n) / (tm0.reserve2 * 10_000n)
      const backrun = hookInstall({ app: hook.appId, points: AFTER_SWAP | POKE, perms: CUSTODY, flags: HOOK_FLAG_LAZY_CUSTODY })
      await nativePool('backrun', 0n, tkc, rA, rB, 30n, [backrun])
      await hook.send.registerPool({ args: { poolId: pools.backrun.id, minSurplusA: 0n, minSurplusB: 0n, maxTradeBps: 5_000n }, ...autoFees })

      const wallet = await newTestWallet()
      const S = wallet.client.appAddress.toString()
      const amountIn = 1_000_000n
      const expected = await quote([pools.backrun.id], 0n, amountIn, S)
      const result = await guarded(S, () =>
        use(
          wallet,
          swapCall({
            assetIn: 0n,
            assetOut: tkc,
            minAmountOut: expected,
            legs: [{ amountIn, segments: [seg('backrun', tkc)] }],
            // the hook reads and trades the Tinyman pool (legacy co-location, see tinymanRefs)
            ...tinymanRefs(tm.appId, tmPool.address),
          }),
        ),
      )
      const root = result.confirmations[routerTxn(result)]
      // the backrun executed: Tinyman was called under the router's Vault call and its reserves moved
      expect(allInners(root).some((t) => t.txn.txn.applicationCall?.appIndex === tm.appId)).toBe(true)
      const tm1 = (await readPoolState(tm, tmPool.address))!
      expect([tm1.reserve1, tm1.reserve2]).not.toEqual([tm0.reserve1, tm0.reserve2])
      // the escrow is handed back to the Vault; S got exactly the quote (no keeper tip to ctx.caller == S)
      expect(await authAddr(pools.backrun.escrow)).toBe(dex.appAddress.toString())
      expect(routerReturn(result)).toBe(expected)
      expect(await holding(S, tkc)).toBe(routerReturn(result))
      // every inner under the router call is fee 0 and the hook's account paid nothing: the group's outer fees
      // (simulate-based cover) carry the arbitrage inners
      for (const t of allInners(root)) expect(t.txn.txn.fee ?? 0n).toBe(0n)
      expect((await algorand.account.getInformation(hook.appAddress)).balance.microAlgo).toBe(hookBalance)
      const depth = innerDepth(root)
      console.log(`[WP3 13] router → backrun pool: inner depth ${depth} of 8, ${countInners(root)} inner txns; deepest path ${deepestPath(root).join(' → ')}`)
      expect(depth).toBeLessThanOrEqual(8)
    })
  })

  test('registry admin and adapter reader', async () => {
    const outsider = await fixture.context.generateAccount({ initialFunds: microAlgo(1_000_000) })
    await expectContractError(
      registry.send.setAdapter({ sender: outsider.addr, signer: outsider.signer, args: { adapter: mock.appId, info: adapterInfo() } }),
      'errRtam',
    )
    await expectContractError(registry.send.removeAdapter({ sender: outsider.addr, signer: outsider.signer, args: { adapter: mock.appId } }), 'errRtam')
    expect(getApplicationAddress(router.appId).toString()).toBe(router.client.appAddress.toString())
  })
})
