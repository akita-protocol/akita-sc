import { AlgorandClient, Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { StakingType } from 'akita-sdk/staking'
import { CallerType, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { ABIType, Address, ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress } from 'algosdk'
import * as crypto from 'crypto'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { AbstractedAccountMbrFactory } from '../../artifacts/arc58/account/AbstractedAccountMBRClient'
import { GatedFeeHookClient, GatedFeeHookFactory } from '../../artifacts/plugin-dex/hooks/GatedFeeHookClient'
import { ImpactFeeHookFactory } from '../../artifacts/plugin-dex/hooks/ImpactFeeHookClient'
import { PluginDexClient } from '../../artifacts/plugin-dex/PluginDexClient'
import { MockDexHookFactory } from '../../artifacts/plugin-dex/tests/MockDexHookClient'
import { GatedFeePassPluginFactory } from '../../artifacts/arc58/plugins/gated-fee-pass/GatedFeePassPluginClient'
import { PluginDexPluginClient, PluginDexPluginFactory } from '../../artifacts/arc58/plugins/plugin-dex/PluginDexPluginClient'
import { MockGatedFeePluginClient, MockGatedFeePluginFactory } from '../../artifacts/plugin-dex/tests/MockGatedFeePluginClient'
import { MockMirrorDaoFactory } from '../../artifacts/plugin-dex/tests/MockMirrorDAOClient'
import { APP_SPEC as ForgedWalletSpec, MockForgedWalletClient } from '../../artifacts/mocks/forged-wallet/MockForgedWalletClient'
import { MockSocialImpactClient, MockSocialImpactFactory } from '../../artifacts/plugin-dex/tests/MockSocialImpactClient'
import { MockWalletClient, MockWalletFactory as MockWalletAppFactory } from '../../artifacts/plugin-dex/tests/MockWalletClient'
import { MockWalletFactoryClient, MockWalletFactoryFactory } from '../../artifacts/plugin-dex/tests/MockWalletFactoryClient'
import { StakingClient } from '../../artifacts/staking/StakingClient'
import { EscrowFactoryClient } from '../../artifacts/escrow/EscrowFactoryClient'
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account'
import { deployAkitaDAO } from '../../../tests/fixtures/dao'
import { deployEscrowFactory } from '../../../tests/fixtures/escrow'
import { allowlistSubGates, deployGateClient } from '../../../tests/fixtures/gates/gate'
import {
  addLiquidity,
  assertEscrowIdentity,
  createPool,
  deployVault,
  HookInstall,
  hookInstall,
  poolConfig,
  transferTxn,
} from '../../../tests/fixtures/plugin-dex'
import { addRawPlugin, assertUnregistered, newUnregisteredWallet } from '../../../tests/fixtures/unregistered-wallet'
import { deployStaking } from '../../../tests/fixtures/staking'
import { deployStakingPowerGate } from '../../../tests/fixtures/subgates'
import { expectContractError } from '../../../tests/utils/errors'
import { TimeWarp } from '../../../tests/utils/time'

// hook points / permissions (constants.ts)
const AFTER_INITIALIZE = 1n
const BEFORE_SWAP = 32n
const QUOTE = 128n
const DYNAMIC_FEE = 2n
const GATED_POINTS = AFTER_INITIALIZE | BEFORE_SWAP | QUOTE
// GatedFeeHook measure bits
const MEASURE_POWER = 1n
const MEASURE_IMPACT = 2n
const MEASURE_GATES = 4n
/** 2,500 + 400 · (key 'p'‖address 33 + FeePass 80) */
const PASS_MBR = 47_700n
const PASS_BYTES = 80n
const DEFAULT_MAX_DISCOUNTED_SWAPS_PER_DAY = 500n
const ONE_DAY = 86_400n
const ONE_YEAR = 365n * ONE_DAY
// MockDexHook
const MODE_SET_FEE = 5n

const POOL_FEE = 100n
const PROTOCOL_FEE_BPS = 2_000n
const STAKE_BOX_MBR = 32_100n
const NO_DATA = new Uint8Array()

const send = { maxFee: microAlgo(200_000), coverAppCallInnerTransactionFees: true, populateAppCallResources: true }

type Tier = { minPower: bigint; minImpact: bigint; gateMask: bigint; discountBps: bigint }
type Schedule = { floorFeeBps: bigint; maxDiscountBps: bigint; impactMaxDiscountBps: bigint; tiers: Tier[] }

const scheduleType = ABIType.from('(uint64,uint64,uint64,(uint64,uint64,uint64,uint64)[])')
const encodeSchedule = (s: Schedule): Uint8Array =>
  scheduleType.encode([s.floorFeeBps, s.maxDiscountBps, s.impactMaxDiscountBps, s.tiers.map((t) => [t.minPower, t.minImpact, t.gateMask, t.discountBps])])

/**
 * akita-hooks A5.4 example schedule. Staking power (getStakingPowerThrough) is amount·remainingDays/365
 * in whole tokens (÷1e6), so a 10 ALGO one-year lock has power 9 on LocalNet (akta = 0 = ALGO).
 */
const MAIN_SCHEDULE: Schedule = {
  floorFeeBps: 10n,
  maxDiscountBps: 5_000n,
  impactMaxDiscountBps: 1_000n,
  tiers: [
    { minPower: 5n, minImpact: 0n, gateMask: 0n, discountBps: 5_000n },
    { minPower: 0n, minImpact: 800n, gateMask: 0n, discountBps: 5_000n },
    { minPower: 0n, minImpact: 0n, gateMask: 1n, discountBps: 3_000n },
    { minPower: 0n, minImpact: 500n, gateMask: 0n, discountBps: 1_500n },
  ],
}

const expectedOut = (amountIn: bigint, reserveIn: bigint, reserveOut: bigint, feeBps: bigint) => {
  const effectiveIn = amountIn - (amountIn * feeBps) / 10_000n
  return (effectiveIn * reserveOut) / (reserveIn + effectiveIn)
}

const be8 = (n: bigint) => {
  const b = new Uint8Array(8)
  new DataView(b.buffer).setBigUint64(0, n)
  return b
}

/** A subject-only gate context: what an EOA (wallet hint 0) resolves to, `(account, 0, account)` */
const plainCtx = (account: string) => ({ principal: account, wallet: 0n, spender: account })

const blockTimestamp = async (algorand: AlgorandClient): Promise<bigint> => {
  const status = await algorand.client.algod.status().do()
  const block = await algorand.client.algod.block(status.lastRound).do()
  return BigInt(block.block.header.timestamp)
}

describe('GatedFeeHook (WP5a)', () => {
  const localnet = algorandFixture()
  let algorand: AlgorandClient
  let admin: TransactionSignerAccount
  /** EOA lock-staker: 10 ALGO for ~1 year ⇒ power 9 */
  let trader: TransactionSignerAccount
  let stranger: TransactionSignerAccount
  let tka: bigint

  let dex: PluginDexClient
  let hook: GatedFeeHookClient
  let staking: StakingClient
  let impact: MockSocialImpactClient
  let walletFactory: MockWalletFactoryClient
  let gateSdk: GateSDK
  let gateId: bigint
  /** the staking-power sub-gate behind `gateId` */
  let spgAppId: bigint
  let daoAppId: bigint
  /** the DAO's MockWallet, rekeyed to `admin` so admin can sign as it */
  let daoWallet: TransactionSignerAccount
  let daoWalletAppId: bigint

  /** gated ALGO/TKA pool with MAIN_SCHEDULE */
  let gatedPool: bigint
  /** ungated ALGO/TKA pool (route partner) */
  let plainPool: bigint

  /**
   * Audit ACC-08: once the DAO has a wallet, only that wallet may seed a factory's child bytecode
   * (initBoxedContract). The test DAO wallet is rekeyed to admin, so deploy the wallet factory as it.
   */
  const deployWalletFactoryAsDao = async () => {
    await algorand.send.payment({ sender: admin.addr, receiver: daoWallet.addr, amount: microAlgo(10_000_000n) })
    return deployAbstractedAccountFactory({
      fixture: localnet,
      sender: daoWallet.addr,
      signer: daoWallet.signer,
      args: { akitaDao: daoAppId, escrowFactory: escrowFactoryId },
    })
  }

  const asSigner = (address: string, signer: TransactionSignerAccount): TransactionSignerAccount => ({
    addr: Address.fromString(address),
    signer: signer.signer,
  })

  const newAccount = async (algo = 50) => {
    const account = await localnet.context.generateAccount({ initialFunds: microAlgo(BigInt(algo) * 1_000_000n) })
    await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: tka })
    return account
  }

  const lockStake = async (account: TransactionSignerAccount, amount: bigint, expiration: bigint) => {
    await staking.send.stake({
      sender: account.addr,
      signer: account.signer,
      args: {
        payment: algorand.createTransaction.payment({
          sender: account.addr,
          signer: account.signer,
          receiver: staking.appAddress,
          amount: microAlgo(STAKE_BOX_MBR + amount),
        }),
        type: StakingType.Lock,
        amount,
        expiration,
      },
      ...send,
    })
  }

  const gatedInstall = (initData = encodeSchedule(MAIN_SCHEDULE), tiers = 4n): HookInstall =>
    hookInstall({ app: hook.appId, points: GATED_POINTS, perms: DYNAMIC_FEE, funding: 17_300n + 12_800n * tiers, initData })

  const newPool = async (hooks: HookInstall[], feeBps = POOL_FEE, liquidity = 100_000_000n) => {
    const { poolId } = await createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(feeBps), hooks, optInLp: [admin] })
    if (liquidity > 0n) await addLiquidity(algorand, dex, admin, poolId, liquidity, liquidity * 2n)
    return poolId
  }

  /**
   * `owner` opens the pass of `key` (default: its own address) with hint `wallet` (default 0); `funder` pays the
   * MBR (principal-resolution spec §6.12: only the key's principal may open it, anyone may fund it).
   */
  const openPass = async (
    owner: TransactionSignerAccount,
    measure: bigint,
    funder: TransactionSignerAccount = admin,
    gateArgs: Uint8Array[][] = [],
    key: string = owner.addr.toString(),
    wallet = 0n,
  ) =>
    (
      await hook.send.openPass({
        sender: owner.addr,
        signer: owner.signer,
        args: {
          // createTransaction drops `signer`: pass the funder's signer with the txn, or the call's signer (owner) signs it
          mbr: { txn: await algorand.createTransaction.payment({ sender: funder.addr, receiver: hook.appAddress, amount: microAlgo(PASS_MBR) }), signer: funder.signer },
          key,
          measure,
          gateArgs,
          wallet,
        },
        ...send,
      })
    ).return!

  const refresh = async (key: string, measure: bigint, sender: TransactionSignerAccount = admin, gateArgs: Uint8Array[][] = [], wallet = 0n) =>
    (await hook.send.refresh({ sender: sender.addr, signer: sender.signer, args: { key, measure, gateArgs, wallet }, ...send })).return!

  const closePass = (key: string, sender: TransactionSignerAccount = admin, wallet = 0n) =>
    hook.send.closePass({ sender: sender.addr, signer: sender.signer, args: { key, wallet }, ...send })

  const setDailyCap = (cap: bigint, sender: TransactionSignerAccount = daoWallet) =>
    hook.send.setMaxDiscountedSwapsPerDay({ sender: sender.addr, signer: sender.signer, args: { cap }, ...send })

  const swapsToday = async (key: string) => hook.getDiscountedSwapsToday({ args: { key } })

  /** keep a multi-swap test inside one UTC day: warp into the next day when fewer than `margin` seconds remain */
  const ensureDayMargin = async (margin = 900n) => {
    const left = ONE_DAY - ((await blockTimestamp(algorand)) % ONE_DAY)
    if (left < margin) await new TimeWarp(algorand).timeWarp(left + 60n)
  }

  /** a fresh account with an impact-800 pass (tier 2: 50% off ⇒ 50 bps on gatedPool), funded by itself */
  const newImpactPassHolder = async () => {
    const user = await newAccount()
    const caller = user.addr.toString()
    await impact.send.setImpact({ args: { account: caller, impact: 800n }, ...send })
    expect((await openPass(user, MEASURE_IMPACT, user)).impact).toBe(800n)
    return { user, caller }
  }

  const quote = async (poolId: bigint, assetIn: bigint, amountIn: bigint, swapper: string = ALGORAND_ZERO_ADDRESS_STRING, sender = admin, wallet = 0n) =>
    (await dex.send.quote({ sender: sender.addr, signer: sender.signer, args: { poolId, assetIn, amountIn, swapper, data: NO_DATA, wallet }, ...send })).return!

  const swap = async (account: TransactionSignerAccount, poolId: bigint, assetIn: bigint, amountIn: bigint, recipient = ALGORAND_ZERO_ADDRESS_STRING, wallet = 0n) => {
    const pool = await dex.getPool({ args: { poolId } })
    return (
      await dex.send.swap({
        sender: account.addr,
        signer: account.signer,
        args: {
          input: transferTxn(algorand, account, getApplicationAddress(pool.escrow).toString(), assetIn, amountIn),
          poolId,
          minAmountOut: 0n,
          recipient,
          data: NO_DATA,
          wallet,
        },
        ...send,
      })
    ).return!
  }

  /** fee bps the pool charged, recovered from a swap of `amountIn` ALGO against the pre-swap reserves */
  const expectSwapAtFee = async (account: TransactionSignerAccount, poolId: bigint, amountIn: bigint, feeBps: bigint, recipient?: string) => {
    const before = await dex.getPool({ args: { poolId } })
    const quoted = await quote(poolId, 0n, amountIn, account.addr.toString())
    expect(quoted).toBe(expectedOut(amountIn, before.reserveA, before.reserveB, feeBps))
    const out = await swap(account, poolId, 0n, amountIn, recipient)
    expect(out).toBe(quoted)
    const after = await dex.getPool({ args: { poolId } })
    // the protocol share is protocolFeeBps of the (discounted) LP fee
    const lpFee = (amountIn * feeBps) / 10_000n
    expect(after.protocolFeesA - before.protocolFeesA).toBe((lpFee * PROTOCOL_FEE_BPS) / 10_000n)
    await assertEscrowIdentity(algorand, dex, poolId)
    return out
  }

  const newMockWallet = async (controlledAddress: string, genuine: boolean): Promise<MockWalletClient> => {
    let wallet: MockWalletClient
    if (genuine) {
      const { return: id } = await walletFactory.send.newAccount({
        args: {
          payment: algorand.createTransaction.payment({ sender: admin.addr, receiver: walletFactory.appAddress, amount: microAlgo(200_000) }),
          controlledAddress,
          admin: admin.addr.toString(),
          nickname: '',
          referrer: ALGORAND_ZERO_ADDRESS_STRING,
          salt: new Uint8Array(crypto.randomBytes(32)),
          bio: '',
          automaticUpdates: true,
          extraFunding: 0n,
          assets: [],
          plugins: [],
        },
        ...send,
      })
      wallet = algorand.client.getTypedAppClientById(MockWalletClient, { appId: id!, defaultSender: admin.addr, defaultSigner: admin.signer })
    } else {
      wallet = (
        await algorand.client
          .getTypedAppFactory(MockWalletAppFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { controlledAddress, admin: admin.addr.toString(), operator: admin.addr.toString() } })
      ).appClient
      await wallet.appClient.fundAppAccount({ amount: microAlgo(200_000) })
    }
    return wallet
  }

  let escrowFactoryId: bigint
  let escrowFactory: EscrowFactoryClient

  beforeAll(async () => {
    await localnet.newScope()
    algorand = localnet.algorand
    admin = localnet.context.testAccount
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(admin.addr, dispenser.addr, (2_000).algo())

    tka = (await algorand.send.assetCreate({ sender: admin.addr, total: 10n ** 15n, decimals: 6, unitName: 'TKA' })).assetId
    trader = await newAccount(100)
    stranger = await newAccount()
    for (const account of [trader, stranger]) {
      await algorand.send.assetTransfer({ sender: admin.addr, receiver: account.addr, assetId: tka, amount: 10n ** 11n })
    }

    // Akita stack: escrow factory, staking (lock ALGO: akta = 0 on LocalNet), main gate, mock impact, mock wallet factory
    const fixture = localnet
    escrowFactory = await deployEscrowFactory({ fixture, sender: admin.addr, signer: admin.signer })
    escrowFactoryId = escrowFactory.appId
    staking = await deployStaking({ fixture, sender: admin.addr, signer: admin.signer, args: { version: 'test', akitaDao: 0n } })
    await staking.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    await staking.send.init({ args: {} })
    const gate = await deployGateClient({ fixture, sender: admin.addr, signer: admin.signer, args: { version: 'test', akitaDao: 0n } })
    await gate.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    impact = (
      await algorand.client.getTypedAppFactory(MockSocialImpactFactory, { defaultSender: admin.addr, defaultSigner: admin.signer }).send.create.bare()
    ).appClient
    await impact.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    walletFactory = (
      await algorand.client
        .getTypedAppFactory(MockWalletFactoryFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: {} })
    ).appClient
    await walletFactory.appClient.fundAppAccount({ amount: microAlgo(5_000_000n) })

    const dao = await deployAkitaDAO({
      fixture,
      sender: admin.addr,
      signer: admin.signer,
      apps: { staking: staking.appId, gate: gate.appId, escrow: escrowFactory.appId, impact: impact.appId, wallet: walletFactory.appId },
    })
    daoAppId = dao.appId
    await algorand.send.payment({ sender: admin.addr, receiver: getApplicationAddress(daoAppId), amount: microAlgo(2_000_000n) })

    // the DAO's wallet, created through the mock factory (DAO.setup), then rekeyed to admin for DAO-only calls
    const { return: daoWalletId } = await dao.client.send.setup({ args: { nickname: 'dao', salt: new Uint8Array(32) }, ...send })
    daoWalletAppId = daoWalletId!
    const daoWalletClient = algorand.client.getTypedAppClientById(MockWalletClient, { appId: daoWalletId!, defaultSender: admin.addr, defaultSigner: admin.signer })
    await daoWalletClient.send.rekeyTo({ args: { to: admin.addr.toString() }, ...send })
    daoWallet = asSigner(daoWalletClient.appAddress.toString(), admin)
    await algorand.send.payment({ sender: admin.addr, receiver: daoWallet.addr, amount: microAlgo(1_000_000n) })

    // staking-power sub-gate (power ≥ 1) registered in the main gate
    const spg = await deployStakingPowerGate({ fixture, sender: admin.addr, signer: admin.signer, args: { version: 'test', akitaDao: daoAppId } })
    await spg.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    // Gate v2 (audit SG-M) only registers DAO-allowlisted sub-gates; the gate's creator allowlists before sealing
    await allowlistSubGates(gate, [spg.appId])
    spgAppId = spg.appId
    gateSdk = new GateSDK({
      algorand,
      factoryParams: { appId: gate.appId, defaultSender: admin.addr, defaultSigner: admin.signer },
      gateRegistry: { staking_power: spg.appId },
    })
    gateId = (
      await gateSdk.register({
        args: [{ type: 'staking_power', appId: spg.appId, layer: 0n, logicalOperator: LogicalOperator.None, op: Operator.GreaterThanOrEqualTo, asset: 0n, power: 1n }],
      })
    ).return!

    // Vault + hook
    dex = await deployVault({ algorand, sender: admin })
    await dex.send.setProtocolFee({ args: { protocolFeeBps: PROTOCOL_FEE_BPS, treasury: admin.addr.toString() }, ...send })
    hook = (
      await algorand.client
        .getTypedAppFactory(GatedFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId, akitaDao: daoAppId, passTtl: 0n } })
    ).appClient
    await hook.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
    await dex.send.setHookApproval({ args: { hook: hook.appId, perms: DYNAMIC_FEE }, ...send })
    await hook.send.setGateSlots({ sender: daoWallet.addr, signer: daoWallet.signer, args: { slots: [gateId] }, ...send })

    // trader: a 10 ALGO lock for ~1 year ⇒ power floor(10·363/365) = 9
    const now = await blockTimestamp(algorand)
    await lockStake(trader, 10_000_000n, now + ONE_YEAR - ONE_DAY)

    gatedPool = await newPool([gatedInstall()])
    plainPool = await newPool([])
  }, 300_000)

  test('setup: the DAO wallet is a factory-created MockWallet and the pool schedule came from initData (F6)', async () => {
    expect(await hook.state.global.passTtl()).toBe(ONE_DAY)
    expect(await hook.getGateSlots()).toEqual([gateId])
    const schedule = await hook.getSchedule({ args: { poolId: gatedPool } })
    expect(schedule.floorFeeBps).toBe(MAIN_SCHEDULE.floorFeeBps)
    expect(schedule.tiers.length).toBe(4)
    const hooks = await dex.getPoolHooks({ args: { poolId: gatedPool } })
    expect(hooks.length).toBe(1)
    // HookConfig [app, version, points, perms, flags]
    expect(hooks[0]).toEqual([hook.appId, 0n, GATED_POINTS, DYNAMIC_FEE, 0n])
  })

  test('T-1: no pass ⇒ pool fee; quote == swap', async () => {
    expect(await hook.previewFee({ args: { poolId: gatedPool, key: stranger.addr.toString(), feeBps: POOL_FEE } })).toBe(POOL_FEE)
    await expectSwapAtFee(stranger, gatedPool, 1_000_000n, POOL_FEE)
  })

  test('T-2: EOA lock-staker with a power pass gets the tier discount; quote(swapper) == swap', async () => {
    // the trader opens its own pass (wallet hint 0); admin funds it
    const pass = await openPass(trader, MEASURE_POWER)
    expect(pass.power).toBe(9n)
    expect(pass.impact).toBe(0n)
    expect(pass.gates).toBe(0n)
    expect(pass.funder).toBe(admin.addr.toString())
    // the quote is sent by admin but priced for the trader
    await expectSwapAtFee(trader, gatedPool, 1_000_000n, 50n)
    // without swapper the quote prices admin, who has no pass
    const pool = await dex.getPool({ args: { poolId: gatedPool } })
    expect(await quote(gatedPool, 0n, 1_000_000n)).toBe(expectedOut(1_000_000n, pool.reserveA, pool.reserveB, POOL_FEE))
  })

  test('T-3: a lock that ends before now + TTL measures power 0 ⇒ no discount', async () => {
    const shortLocker = await newAccount()
    await lockStake(shortLocker, 10_000_000n, (await blockTimestamp(algorand)) + ONE_DAY / 2n)
    const pass = await openPass(shortLocker, MEASURE_POWER, shortLocker)
    expect(pass.power).toBe(0n)
    expect(pass.funder).toBe(shortLocker.addr.toString())
    expect(await hook.previewFee({ args: { poolId: gatedPool, key: shortLocker.addr.toString(), feeBps: POOL_FEE } })).toBe(POOL_FEE)
    await expectSwapAtFee(shortLocker, gatedPool, 1_000_000n, POOL_FEE)
  })

  test('T-5: a live pass is refreshed or closed only by its key, its funder, or its principal by hint', async () => {
    const spender = trader.addr.toString()
    await expectContractError(refresh(spender, MEASURE_POWER, stranger), 'errGfau')
    await expectContractError(closePass(spender, stranger), 'errGfau')
    // key (trader) and funder (admin) may
    expect((await refresh(spender, MEASURE_POWER, trader)).power).toBe(9n)
    const pass = await refresh(spender, MEASURE_POWER, admin)
    expect(pass.power).toBe(9n)
    expect(pass.funder).toBe(admin.addr.toString())
  })

  test('pass lifecycle guards: duplicate open, MBR, measure mask', async () => {
    await expectContractError(openPass(trader, MEASURE_POWER), 'errGfex')
    const other = await newAccount()
    await expectContractError(
      hook.send.openPass({
        sender: other.addr,
        signer: other.signer,
        args: {
          mbr: { txn: await algorand.createTransaction.payment({ sender: admin.addr, receiver: hook.appAddress, amount: microAlgo(PASS_MBR - 1n) }), signer: admin.signer },
          key: other.addr.toString(),
          measure: 0n,
          gateArgs: [],
          wallet: 0n,
        },
        ...send,
      }),
      'errGfmb',
    )
    await expectContractError(openPass(other, 8n), 'errGfms')
    expect(await hook.passCost()).toBe(PASS_MBR)
  })

  test('P2-DEX-01: a pass opened by a third party is rejected; the owner can always open its own', async () => {
    const victim = await newAccount()
    const key = victim.addr.toString()
    // a griefer (hint 0) names the victim's key: rejected, whoever funds it
    await expectContractError(openPass(stranger, MEASURE_POWER, stranger, [], key), 'errGfau')
    await expectContractError(openPass(stranger, MEASURE_POWER, victim, [], key), 'errGfau')
    // a hint never helps a top-level caller: a genuine (factory-created) wallet hint reverts errHtop, a foreign one errHnwl
    const genuine = await newMockWallet(key, true)
    const foreign = await newMockWallet(key, false)
    await expectContractError(openPass(stranger, MEASURE_POWER, stranger, [], key, genuine.appId), 'errHtop')
    await expectContractError(openPass(stranger, MEASURE_POWER, stranger, [], key, foreign.appId), 'errHnwl')
    expect((await hook.getPass({ args: { key } })).validUntil).toBe(0n)
    // the victim opens its own pass (funded by the stranger, who becomes the funder)
    const pass = await openPass(victim, 0n, stranger)
    expect(pass.funder).toBe(stranger.addr.toString())
    // a third party cannot set its gate bit either, even with a passing gate check of its own verified context
    // (the trader passes the staking-power gate): key must be the caller's own principal
    await expectContractError(
      hook.send.refreshFromGate({
        sender: trader.addr,
        signer: trader.signer,
        args: {
          gateTxn: await gateSdk.client.params.mustCheckFor({
            sender: trader.addr,
            signer: trader.signer,
            maxFee: microAlgo(20_000),
            args: { ctx: plainCtx(trader.addr.toString()), gateId, args: [NO_DATA] },
          }),
          key,
          slot: 0n,
          wallet: 0n,
        },
        ...send,
      }),
      'errGfau',
    )
    await closePass(key, stranger)
  })

  test('T-6: impact tiers (mock impact) and the continuous impact discount below a tier', async () => {
    const user = await newAccount()
    const caller = user.addr.toString()
    await impact.send.setImpact({ args: { account: caller, impact: 800n }, ...send })
    const pass = await openPass(user, MEASURE_IMPACT, user)
    expect(pass.impact).toBe(800n)
    expect(pass.power).toBe(0n)
    await expectSwapAtFee(user, gatedPool, 1_000_000n, 50n)

    const preview = () => hook.previewFee({ args: { poolId: gatedPool, key: caller, feeBps: POOL_FEE } })
    // 600: tier 4 (15%) beats the continuous 6%
    await impact.send.setImpact({ args: { account: caller, impact: 600n }, ...send })
    await refresh(caller, MEASURE_IMPACT, user)
    expect(await preview()).toBe(85n)
    // 300: no tier; continuous 300·1000/1000 = 300 bps = 3%
    await impact.send.setImpact({ args: { account: caller, impact: 300n }, ...send })
    await refresh(caller, MEASURE_IMPACT, user)
    expect(await preview()).toBe(97n)
    await expectSwapAtFee(user, gatedPool, 2_000_000n, 97n)
  })

  test('T-7: gate slot tier: the bit is set by refresh (inner Gate.checkFor) and by refreshFromGate (outer Gate.mustCheckFor)', async () => {
    const user = await newAccount()
    const caller = user.addr.toString()
    // 3 ALGO for ~1 year ⇒ power 2: below tier 1 (5) but passes the staking-power gate (≥ 1)
    await lockStake(user, 3_000_000n, (await blockTimestamp(algorand)) + ONE_YEAR - ONE_DAY)
    await expectContractError(openPass(user, MEASURE_GATES, user, []), 'errGfar')
    const pass = await openPass(user, MEASURE_POWER | MEASURE_GATES, user, [[NO_DATA]])
    expect(pass.power).toBe(2n)
    expect(pass.gates).toBe(1n)
    await expectSwapAtFee(user, gatedPool, 1_000_000n, 70n)

    // re-measure without gates: the bit is cleared
    const cleared = await refresh(caller, MEASURE_POWER, user)
    expect(cleared.gates).toBe(0n)
    expect(await hook.previewFee({ args: { poolId: gatedPool, key: caller, feeBps: POOL_FEE } })).toBe(POOL_FEE)

    const fromGateWith = async (gateTxn: Awaited<ReturnType<typeof gateSdk.client.params.mustCheckFor>> | Awaited<ReturnType<typeof gateSdk.client.params.mustCheck>>) =>
      hook.send.refreshFromGate({ sender: user.addr, signer: user.signer, args: { gateTxn, key: caller, slot: 0n, wallet: 0n }, ...send })
    const mustCheckFor = (ctx: ReturnType<typeof plainCtx>) =>
      gateSdk.client.params.mustCheckFor({ sender: user.addr, signer: user.signer, maxFee: microAlgo(20_000), args: { ctx, gateId, args: [NO_DATA] } })
    // a mustCheckFor of another principal's context does not count (the trader passes the gate itself)
    await expectContractError(fromGateWith(await mustCheckFor(plainCtx(trader.addr.toString()))), 'errGfgt')
    // nor a context that differs only in the spender or the wallet
    await expectContractError(fromGateWith(await mustCheckFor({ ...plainCtx(caller), spender: trader.addr.toString() })), 'errGfgt')
    await expectContractError(fromGateWith(await mustCheckFor({ ...plainCtx(caller), wallet: 1n })), 'errGfgt')
    // the legacy Gate.mustCheck(caller) no longer counts (spec §6.12: refreshFromGate asserts gateCheckCtx)
    await expectContractError(
      fromGateWith(await gateSdk.client.params.mustCheck({ sender: user.addr, signer: user.signer, maxFee: microAlgo(20_000), args: { caller, gateId, args: [NO_DATA] } })),
      'errGfgt',
    )
    const fromGate = (await fromGateWith(await mustCheckFor(plainCtx(caller)))).return!
    expect(fromGate.gates).toBe(1n)
    expect(fromGate.validUntil).toBe(cleared.validUntil)
    await expectSwapAtFee(user, gatedPool, 1_000_000n, 70n)
  })

  test('T-8 (§6.12): a top-level swap with a wallet hint reverts (errHtop genuine, errHnwl foreign); hint 0 keeps the discount', async () => {
    // MockWallets publish controlled_address = trader. A genuine one (created by the DAO's wallet factory)
    // still cannot bind a top-level call; a foreign one is not a wallet at all.
    const genuine = await newMockWallet(trader.addr.toString(), true)
    const foreign = await newMockWallet(trader.addr.toString(), false)
    await expectContractError(swap(trader, gatedPool, 0n, 1_000_000n, ALGORAND_ZERO_ADDRESS_STRING, genuine.appId), 'errHtop')
    await expectContractError(swap(trader, gatedPool, 0n, 1_000_000n, ALGORAND_ZERO_ADDRESS_STRING, foreign.appId), 'errHnwl')
    // the hint only matters to the hook: an un-gated pool ignores it (the Vault stays DAO-agnostic)
    expect(await swap(trader, plainPool, 0n, 1_000_000n, ALGORAND_ZERO_ADDRESS_STRING, foreign.appId)).toBeGreaterThan(0n)
    // hint 0: the trader's own pass (T-2)
    await expectSwapAtFee(trader, gatedPool, 1_000_000n, 50n)
  })

  test('T-9 (§6.12, ACC-01): a hinted Quote never reverts and never prices an identity the wallet does not control', async () => {
    const genuine = await newMockWallet(trader.addr.toString(), true)
    const foreign = await newMockWallet(trader.addr.toString(), false)
    const pool = await dex.getPool({ args: { poolId: gatedPool } })
    const full = expectedOut(1_000_000n, pool.reserveA, pool.reserveB, POOL_FEE)
    const discounted = expectedOut(1_000_000n, pool.reserveA, pool.reserveB, 50n)
    // swapper = the wallet's own address: owned at rest, but the claimed controlled address (trader) is not
    // rekeyed to it, so the key stays the wallet address, which has no pass (was T-8b / T-9)
    for (const wallet of [genuine, foreign]) {
      expect(await quote(gatedPool, 0n, 1_000_000n, wallet.appAddress.toString(), admin, wallet.appId)).toBe(full)
    }
    // swapper = trader with someone else's hint: not owned by that wallet ⇒ the swapper itself (quotes preview any key)
    expect(await quote(gatedPool, 0n, 1_000_000n, trader.addr.toString(), admin, genuine.appId)).toBe(discounted)
    expect(await quote(gatedPool, 0n, 1_000_000n, trader.addr.toString(), admin, foreign.appId)).toBe(discounted)
    // the hint never moves the key to the claimed controlled address: no pass was opened for a wallet address
    expect((await hook.getPass({ args: { key: genuine.appAddress.toString() } })).validUntil).toBe(0n)
  })

  test('T-10: stack order: [ImpactFee, GatedFee] discounts the impact fee; a later fee hook overrides the discount', async () => {
    const impactHook = (
      await algorand.client
        .getTypedAppFactory(ImpactFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId, minFeeBps: 200n, maxFeeBps: 1_000n, slopeBps: 0n } })
    ).appClient
    const fixedFee = (
      await algorand.client
        .getTypedAppFactory(MockDexHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.create({ args: { dex: dex.appId } })
    ).appClient
    await fixedFee.send.configure({ args: { mode: MODE_SET_FEE, value: 150n, value2: 0n, target: ALGORAND_ZERO_ADDRESS_STRING } })
    for (const app of [impactHook.appId, fixedFee.appId]) {
      await dex.send.setHookApproval({ args: { hook: app, perms: DYNAMIC_FEE }, ...send })
    }
    const pricing = (app: bigint) => hookInstall({ app, points: BEFORE_SWAP | QUOTE, perms: DYNAMIC_FEE })

    // ImpactFee sets 200, GatedFee halves it
    const impactFirst = await newPool([pricing(impactHook.appId), gatedInstall()], 30n)
    await expectSwapAtFee(trader, impactFirst, 1_000_000n, 100n)
    await expectSwapAtFee(stranger, impactFirst, 1_000_000n, 200n)
    // GatedFee halves 30 to 15, then a fee-raising hook (AntiSnipe stand-in) sets 150
    const gatedFirst = await newPool([gatedInstall(), pricing(fixedFee.appId)], 30n)
    await expectSwapAtFee(trader, gatedFirst, 1_000_000n, 150n)
    // the fixed hook sets 150, GatedFee halves it
    const fixedFirst = await newPool([pricing(fixedFee.appId), gatedInstall()], 30n)
    await expectSwapAtFee(trader, fixedFirst, 1_000_000n, 75n)
  })

  test('T-11: the discount never raises the fee; the floor holds; caps are enforced at creation', async () => {
    const oneTier = (floorFeeBps: bigint, discountBps = 5_000n, maxDiscountBps = 5_000n, impactMaxDiscountBps = 0n, gateMask = 0n): Schedule => ({
      floorFeeBps,
      maxDiscountBps,
      impactMaxDiscountBps,
      tiers: [{ minPower: 5n, minImpact: 0n, gateMask, discountBps }],
    })
    const caller = trader.addr.toString()

    const floored = await newPool([gatedInstall(encodeSchedule(oneTier(80n)), 1n)])
    await expectSwapAtFee(trader, floored, 1_000_000n, 80n)

    // a floor above the running fee never raises it
    const highFloor = await newPool([gatedInstall(encodeSchedule(oneTier(500n)), 1n)])
    await expectSwapAtFee(trader, highFloor, 1_000_000n, POOL_FEE)
    for (const feeBps of [0n, 1n, 30n, 100n, 1_000n]) {
      const fee = await hook.previewFee({ args: { poolId: gatedPool, key: caller, feeBps } })
      expect(fee).toBeLessThanOrEqual(feeBps)
      const halved = feeBps - feeBps / 2n
      const floor = feeBps < 500n ? feeBps : 500n
      expect(await hook.previewFee({ args: { poolId: highFloor, key: caller, feeBps } })).toBe(halved > floor ? halved : floor)
    }

    // maxDiscountBps caps every tier and the continuous part (checked when the schedule is written)
    const rejects = async (schedule: Schedule) =>
      expectContractError(
        createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(POOL_FEE), hooks: [gatedInstall(encodeSchedule(schedule), 1n)] }),
        'errGfsc',
      )
    await rejects(oneTier(0n, 6_000n, 5_000n))
    await rejects(oneTier(0n, 5_000n, 9_001n))
    await rejects(oneTier(0n, 1_000n, 5_000n, 5_001n))
  })

  test('T-12: swapRoute across a gated and an un-gated pool equals quoteRoute(…, trader)', async () => {
    const route = [gatedPool, plainPool]
    const amountIn = 1_000_000n
    const quoteRoute = async (swapper: string) =>
      (await dex.send.quoteRoute({ args: { route, assetIn: 0n, amountIn, swapper, data: NO_DATA, wallet: 0n }, ...send })).return!

    const gated = await dex.getPool({ args: { poolId: gatedPool } })
    const plain = await dex.getPool({ args: { poolId: plainPool } })
    const hop1 = expectedOut(amountIn, gated.reserveA, gated.reserveB, 50n)
    const expected = expectedOut(hop1, plain.reserveB, plain.reserveA, POOL_FEE)

    const quoted = await quoteRoute(trader.addr.toString())
    expect(quoted).toBe(expected)
    expect(await quoteRoute(ALGORAND_ZERO_ADDRESS_STRING)).toBeLessThan(quoted)

    const before = await algorand.account.getInformation(trader.addr)
    const result = await dex.send.swapRoute({
      sender: trader.addr,
      signer: trader.signer,
      args: {
        input: transferTxn(algorand, trader, getApplicationAddress(gated.escrow).toString(), 0n, amountIn),
        route,
        minAmountOut: quoted,
        recipient: ALGORAND_ZERO_ADDRESS_STRING,
        data: NO_DATA,
        wallet: 0n,
      },
      ...send,
    })
    expect(result.return).toBe(quoted)
    const after = await algorand.account.getInformation(trader.addr)
    const fees = result.transactions.reduce((sum, txn) => sum + txn.fee, 0n)
    expect(after.balance.microAlgo - before.balance.microAlgo).toBe(quoted - amountIn - fees)
    await assertEscrowIdentity(algorand, dex, gatedPool)
    await assertEscrowIdentity(algorand, dex, plainPool)
  })

  test('T-13: a schedule delivered through F6 is immutable; the DAO default applies only to later pools', async () => {
    // empty initData and no default ⇒ no schedule, no discount (never reverts)
    const bare = await newPool([gatedInstall(NO_DATA, 0n)])
    expect((await hook.getSchedule({ args: { poolId: bare } })).tiers).toEqual([])
    await expectSwapAtFee(trader, bare, 1_000_000n, POOL_FEE)

    const firstDefault: Schedule = { floorFeeBps: 0n, maxDiscountBps: 2_000n, impactMaxDiscountBps: 0n, tiers: [{ minPower: 1n, minImpact: 0n, gateMask: 0n, discountBps: 2_000n }] }
    const toArgs = (s: Schedule) => ({ ...s, tiers: s.tiers.map((t) => [t.minPower, t.minImpact, t.gateMask, t.discountBps] as [bigint, bigint, bigint, bigint]) })
    await expectContractError(hook.send.setDefaultSchedule({ args: { schedule: toArgs(firstDefault) }, ...send }), 'errGfad')
    await hook.send.setDefaultSchedule({ sender: daoWallet.addr, signer: daoWallet.signer, args: { schedule: toArgs(firstDefault) }, ...send })

    const defaulted = await newPool([gatedInstall(NO_DATA, 1n)])
    await expectSwapAtFee(trader, defaulted, 1_000_000n, 80n)
    expect((await hook.getSchedule({ args: { poolId: bare } })).tiers).toEqual([])

    // changing the default changes neither the defaulted pool nor the F6 pool
    const secondDefault: Schedule = { ...firstDefault, maxDiscountBps: 9_000n, tiers: [{ minPower: 0n, minImpact: 0n, gateMask: 0n, discountBps: 9_000n }] }
    await hook.send.setDefaultSchedule({ sender: daoWallet.addr, signer: daoWallet.signer, args: { schedule: toArgs(secondDefault) }, ...send })
    const defaultedSchedule = await hook.getSchedule({ args: { poolId: defaulted } })
    expect(defaultedSchedule.maxDiscountBps).toBe(2_000n)
    expect(defaultedSchedule.tiers.length).toBe(1)
    const main = await hook.getSchedule({ args: { poolId: gatedPool } })
    expect(main.floorFeeBps).toBe(MAIN_SCHEDULE.floorFeeBps)
    expect(main.maxDiscountBps).toBe(MAIN_SCHEDULE.maxDiscountBps)
    expect(main.tiers.length).toBe(4)
    await expectSwapAtFee(trader, defaulted, 1_000_000n, 80n)

    // only the canonical DEX can deliver a schedule (AfterInitialize); there is no other writer
    const snapshot = { priceX64: new Uint8Array(16), activeId: 0n, liquidity: 0n, flags: 0n }
    await expectContractError(
      hook.send.akitaDexHook({
        args: {
          dex: dex.appId,
          hookIndex: 0n,
          ctx: {
            point: AFTER_INITIALIZE,
            poolId: 9_999n,
            curve: 0n,
            escrow: ALGORAND_ZERO_ADDRESS_STRING,
            caller: admin.addr.toString(),
            callerApp: 0n,
            wallet: 0n,
            recipient: admin.addr.toString(),
            assetIn: 0n,
            assetOut: tka,
            exactIn: true,
            custody: false,
            amountIn: 0n,
            amountOut: 0n,
            reserveIn: 0n,
            reserveOut: 0n,
            lpAmount: 0n,
            lpSupply: 0n,
            positionId: 0n,
            feeBps: POOL_FEE,
            custodyFeeBps: POOL_FEE,
            before: snapshot,
            after: snapshot,
            curveData: NO_DATA,
            data: encodeSchedule(secondDefault),
          },
        },
        ...send,
      }),
      'errHookCaller',
    )
    const methods = hook.appClient.appSpec.methods.map((m) => m.name)
    expect(methods).not.toContain('configurePool')
  })

  test('T-14: a malformed schedule reverts createPool', async () => {
    const attempt = (initData: Uint8Array) =>
      createPool({ algorand, dex, sender: admin, assetA: 0n, assetB: tka, config: poolConfig(POOL_FEE), hooks: [gatedInstall(initData, 5n)] })
    const valid = encodeSchedule(MAIN_SCHEDULE)
    // encoding: truncated, trailing byte, too short, wrong tail pointer, tier count disagreeing with the length
    const badPointer = new Uint8Array(valid)
    badPointer[25] = 27
    const badCount = new Uint8Array(valid)
    badCount[27] = 3
    for (const initData of [valid.slice(0, valid.length - 1), new Uint8Array([...valid, 0]), new Uint8Array([1, 2, 3]), badPointer, badCount]) {
      await expectContractError(attempt(initData), 'errGfsc')
    }
    // bounds: > 4 tiers, zero discount, gate mask beyond 8 slots, floor above the per-pool fee cap
    const tier = MAIN_SCHEDULE.tiers[0]
    for (const schedule of [
      { ...MAIN_SCHEDULE, tiers: [tier, tier, tier, tier, tier] },
      { ...MAIN_SCHEDULE, tiers: [{ ...tier, discountBps: 0n }] },
      { ...MAIN_SCHEDULE, tiers: [{ ...tier, gateMask: 256n }] },
      { ...MAIN_SCHEDULE, floorFeeBps: 9_001n },
    ]) {
      await expectContractError(attempt(encodeSchedule(schedule)), 'errGfsc')
    }
  })

  test('DAO-only configuration: gate slots and pass TTL', async () => {
    await expectContractError(hook.send.setGateSlots({ args: { slots: [gateId] }, ...send }), 'errGfad')
    await expectContractError(
      hook.send.setGateSlots({ sender: daoWallet.addr, signer: daoWallet.signer, args: { slots: Array(9).fill(gateId) }, ...send }),
      'errGfgs',
    )
    await expectContractError(hook.send.setPassTtl({ args: { ttl: 3_600n }, ...send }), 'errGfad')
    await expectContractError(hook.send.setPassTtl({ sender: daoWallet.addr, signer: daoWallet.signer, args: { ttl: 3_599n }, ...send }), 'errGftl')
    await expectContractError(hook.send.setPassTtl({ sender: daoWallet.addr, signer: daoWallet.signer, args: { ttl: 604_801n }, ...send }), 'errGftl')
  })

  test('T-16 (#18): the per-pass daily cap on discounted swaps; quote == swap at and after the cap; DAO-only', async () => {
    // default cap, set at create
    expect(await hook.state.global.maxDiscountedSwapsPerDay()).toBe(DEFAULT_MAX_DISCOUNTED_SWAPS_PER_DAY)
    // only the DAO wallet may change it
    await expectContractError(setDailyCap(2n, admin), 'errGfad')
    await expectContractError(setDailyCap(2n, stranger), 'errGfad')
    expect(await hook.state.global.maxDiscountedSwapsPerDay()).toBe(DEFAULT_MAX_DISCOUNTED_SWAPS_PER_DAY)

    const { user, caller } = await newImpactPassHolder()
    // the counter is sized into the pass box (PASS_MBR covers it)
    const box = await algorand.app.getBoxValue(hook.appId, new Uint8Array([...new TextEncoder().encode('p'), ...user.addr.publicKey]))
    expect(BigInt(box.length)).toBe(PASS_BYTES)
    expect(PASS_MBR).toBe(2_500n + 400n * (33n + PASS_BYTES))
    expect(await hook.passCost()).toBe(PASS_MBR)

    await setDailyCap(2n)
    try {
      expect(await hook.state.global.maxDiscountedSwapsPerDay()).toBe(2n)
      await ensureDayMargin()
      const preview = () => hook.previewFee({ args: { poolId: gatedPool, key: caller, feeBps: POOL_FEE } })

      // quotes never count
      for (let i = 0; i < 3; i++) await quote(gatedPool, 0n, 1_000_000n, caller)
      expect(await swapsToday(caller)).toBe(0n)

      // discounted up to the cap, each swap counted once (expectSwapAtFee checks quote == swap)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, 50n)
      expect(await swapsToday(caller)).toBe(1n)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, 50n)
      expect(await swapsToday(caller)).toBe(2n)
      const pass = await hook.getPass({ args: { key: caller } })
      expect(pass.daySwaps).toBe(2n)
      expect(pass.swapDay).toBe((await blockTimestamp(algorand)) / ONE_DAY)

      // at the cap: the pool's normal fee (no revert), quote == swap, and an undiscounted swap does not count
      expect(await preview()).toBe(POOL_FEE)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, POOL_FEE)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, POOL_FEE)
      expect(await swapsToday(caller)).toBe(2n)
      // a fresh quote agrees with the capped swap too
      const pool = await dex.getPool({ args: { poolId: gatedPool } })
      expect(await quote(gatedPool, 0n, 1_000_000n, caller)).toBe(expectedOut(1_000_000n, pool.reserveA, pool.reserveB, POOL_FEE))

      // the cap is per pass: another pass holder still gets the discount
      const other = await newImpactPassHolder()
      await expectSwapAtFee(other.user, gatedPool, 1_000_000n, 50n)
      expect(await swapsToday(other.caller)).toBe(1n)
      expect(await swapsToday(caller)).toBe(2n)

      // re-measuring keeps the count, and the pass cannot be closed today (close + reopen would reset it)
      const refreshed = await refresh(caller, MEASURE_IMPACT, user)
      expect(refreshed.daySwaps).toBe(2n)
      expect(refreshed.swapDay).toBe(pass.swapDay)
      expect(await preview()).toBe(POOL_FEE)
      await expectContractError(closePass(caller, user), 'errGfdy')

      // raising the cap applies to today's count at once
      await setDailyCap(3n)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, 50n)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, POOL_FEE)
      expect(await swapsToday(caller)).toBe(3n)

      // 0 = unlimited (still counted)
      await setDailyCap(0n)
      expect(await preview()).toBe(50n)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, 50n)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, 50n)
      expect(await swapsToday(caller)).toBe(5n)

      // lowering the cap below today's count stops the discount
      await setDailyCap(2n)
      await expectSwapAtFee(user, gatedPool, 1_000_000n, POOL_FEE)
      expect(await swapsToday(caller)).toBe(5n)

      // a pass that made no discounted swap today closes as before
      const idle = await newImpactPassHolder()
      await closePass(idle.caller, idle.user)
      expect((await hook.getPass({ args: { key: idle.caller } })).validUntil).toBe(0n)
      expect(await swapsToday(idle.caller)).toBe(0n)
    } finally {
      await setDailyCap(DEFAULT_MAX_DISCOUNTED_SWAPS_PER_DAY)
    }
  })

  /**
   * Principal resolution (docs/principal-resolution/PHASE-0-SPEC.md §6.12) with real, never-registered ARC-58
   * wallets. `dao2` (MockMirrorDAO) mirrors the main DAO but names the real AbstractedAccountFactory as
   * `AkitaAppList.wallet` (so its wallets are genuine) and the main DAO wallet as admin. Replaces the
   * registry-era T-8/T-8b/T-9/T-15/ACC-01 cases: identity now comes from the hint, never the EscrowFactory.
   */
  describe('principal resolution (§6.12): hinted passes and swaps with real ARC-58 wallets', () => {
    const previousMbr = process.env.WALLET_MBR_APP_ID
    const previousPopulate = Config.populateAppCallResources
    const maxFee = microAlgo(200_000)
    let accountFactory: WalletFactorySDK
    let dao2: bigint
    let hook2: GatedFeeHookClient
    let pool2: bigint
    let plugin: MockGatedFeePluginClient
    let dexPlugin: PluginDexPluginClient
    /** admin of every wallet below (signs the window groups) */
    let owner: TransactionSignerAccount
    /** Wx: external controlled address `holder` (a one-year 10 ALGO lock: power 9), escrow 'e' at WxE */
    let Wx: WalletSDK
    let holder: TransactionSignerAccount
    let WxE: string
    /** Wd: default wallet (controlled address = its own app address, impact 800), escrow 'e' at WdE */
    let Wd: WalletSDK
    let WdE: string

    const addr = (w: WalletSDK) => w.client.appAddress.toString()

    /** [W.arc58_rekeyToPlugin(app, Global, escrow), ...calls, W.arc58_verifyAuthAddress, carriers]; returns the calls' ABI returns */
    const inWindow = async (wallet: WalletSDK, calls: AppCallMethodCall[], escrow = '', app = plugin.appId, carriers = 0) => {
      const group = algorand.newGroup()
      group.addAppCallMethodCall(
        await wallet.client.params.arc58RekeyToPlugin({
          sender: owner.addr,
          signer: owner.signer,
          args: { plugin: app, type: CallerType.Global, escrow, methodOffsets: [], fundsRequest: [] },
          maxFee,
        }),
      )
      for (const call of calls) group.addAppCallMethodCall(call)
      group.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ sender: owner.addr, signer: owner.signer, args: {}, maxFee }))
      for (let i = 0; i < carriers; i++) {
        group.addAppCallMethodCall(await dexPlugin.params.opUp({ sender: owner.addr, signer: owner.signer, args: {}, note: `carrier ${i}`, maxFee }))
      }
      const result = await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
      return result.returns!.slice(1, 1 + calls.length).map((r) => r.returnValue)
    }

    const asPass = (value: unknown) => {
      const [power, impactScore, gates, validUntil, funder, swapDay, daySwaps] = value as [bigint, bigint, bigint, bigint, string, bigint, bigint]
      return { power, impact: impactScore, gates, validUntil, funder, swapDay, daySwaps }
    }
    const pluginArgs = { sender: () => owner.addr, signer: () => owner.signer }
    const pOpen = (w: WalletSDK, key: string, measure: bigint) =>
      plugin.params.openPass({ sender: pluginArgs.sender(), signer: pluginArgs.signer(), args: { wallet: w.appId, rekeyBack: true, key, measure, gateArgs: [] }, maxFee })
    const pRefresh = (w: WalletSDK, key: string, measure: bigint) =>
      plugin.params.refresh({ sender: pluginArgs.sender(), signer: pluginArgs.signer(), args: { wallet: w.appId, rekeyBack: true, key, measure, gateArgs: [] }, maxFee })
    const pClose = (w: WalletSDK, key: string) =>
      plugin.params.closePass({ sender: pluginArgs.sender(), signer: pluginArgs.signer(), args: { wallet: w.appId, rekeyBack: true, key }, maxFee })
    const pFromGate = (w: WalletSDK, key: string) =>
      plugin.params.refreshFromGate({
        sender: pluginArgs.sender(),
        signer: pluginArgs.signer(),
        args: { wallet: w.appId, rekeyBack: true, key, slot: 0n, gateId, args: [NO_DATA] },
        maxFee,
      })
    /** PluginDexPlugin swap of `amountIn` ALGO → TKA on pool2, inside `w`'s window (escrow '' = default grant) */
    const pluginSwap = async (w: WalletSDK, amountIn: bigint, minAmountOut: bigint, escrow = '') =>
      inWindow(
        w,
        [
          await dexPlugin.params.swap({
            sender: owner.addr,
            signer: owner.signer,
            args: { wallet: w.appId, rekeyBack: true, poolId: pool2, assetIn: 0n, amountIn, minAmountOut, data: NO_DATA },
            maxFee,
          }),
        ],
        escrow,
        dexPlugin.appId,
        1,
      )
    const quote2 = async (swapper: string, wallet: bigint, amountIn = 1_000_000n) =>
      (await dex.send.quote({ args: { poolId: pool2, assetIn: 0n, amountIn, swapper, data: NO_DATA, wallet }, ...send })).return!
    const tkaOf = async (address: string) => (await algorand.asset.getAccountInformation(address, tka)).balance

    /** a plugin swap from `w`'s window is priced at `feeBps`; the client quote (swapper, wallet) predicts it exactly */
    const expectPluginSwapAtFee = async (w: WalletSDK, S: string, escrow: string, quoteSwapper: string, feeBps: bigint) => {
      const amountIn = 1_000_000n
      const before = await dex.getPool({ args: { poolId: pool2 } })
      const quoted = await quote2(quoteSwapper, w.appId, amountIn)
      expect(quoted).toBe(expectedOut(amountIn, before.reserveA, before.reserveB, feeBps))
      const out0 = await tkaOf(S).catch(() => 0n)
      await pluginSwap(w, amountIn, quoted, escrow)
      expect((await tkaOf(S)) - out0).toBe(quoted)
      const after = await dex.getPool({ args: { poolId: pool2 } })
      const lpFee = (amountIn * feeBps) / 10_000n
      expect(after.protocolFeesA - before.protocolFeesA).toBe((lpFee * PROTOCOL_FEE_BPS) / 10_000n)
      // S was handed back to the wallet: a default S is un-rekeyed (or rekeyed to W for external C), an escrow to W
      const auth = (await algorand.account.getInformation(S)).authAddr?.toString()
      expect(auth === undefined || auth === addr(w)).toBe(true)
      await assertEscrowIdentity(algorand, dex, pool2)
    }

    beforeAll(async () => {
      const { appClient: mbrApp } = await algorand.client
        .getTypedAppFactory(AbstractedAccountMbrFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
        .send.create.bare()
      process.env.WALLET_MBR_APP_ID = mbrApp.appId.toString()
      Config.configure({ populateAppCallResources: true })

      accountFactory = await deployWalletFactoryAsDao()
      dao2 = (
        await algorand.client
          .getTypedAppFactory(MockMirrorDaoFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { source: daoAppId, walletFactory: accountFactory.appId, daoWallet: daoWalletAppId } })
      ).appClient.appId
      hook2 = (
        await algorand.client
          .getTypedAppFactory(GatedFeeHookFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { dex: dex.appId, akitaDao: dao2, passTtl: 0n } })
      ).appClient
      await hook2.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
      await dex.send.setHookApproval({ args: { hook: hook2.appId, perms: DYNAMIC_FEE }, ...send })
      // the mirror DAO's admin wallet is the main DAO wallet (signed by admin)
      await hook2.send.setGateSlots({ sender: daoWallet.addr, signer: daoWallet.signer, args: { slots: [gateId] }, ...send })
      pool2 = await newPool([hookInstall({ app: hook2.appId, points: GATED_POINTS, perms: DYNAMIC_FEE, funding: 17_300n + 12_800n * 4n, initData: encodeSchedule(MAIN_SCHEDULE) })])

      plugin = (
        await algorand.client
          .getTypedAppFactory(MockGatedFeePluginFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { hook: hook2.appId, akitaDao: dao2 } })
      ).appClient
      await plugin.appClient.fundAppAccount({ amount: microAlgo(200_000n) })
      dexPlugin = (
        await algorand.client
          .getTypedAppFactory(PluginDexPluginFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { version: 'test', dex: dex.appId } })
      ).appClient

      owner = await newAccount(200)
      holder = await newAccount()
      await lockStake(holder, 10_000_000n, (await blockTimestamp(algorand)) + ONE_YEAR - ONE_DAY)
      // SG-04: the holder rekeys itself to the factory inside the creation group (controlledSigner)
      Wx = await newUnregisteredWallet({
        walletFactory: accountFactory,
        sender: owner.addr,
        signer: owner.signer,
        nickname: 'gated wx',
        controlledAddress: holder.addr.toString(),
        controlledSigner: holder.signer,
        fund: (20).algo(),
      })
      Wd = await newUnregisteredWallet({ walletFactory: accountFactory, sender: owner.addr, signer: owner.signer, nickname: 'gated wd', fund: (20).algo() })
      const raw = { sender: owner.addr, signer: owner.signer }
      for (const w of [Wx, Wd]) {
        for (const app of [plugin.appId, dexPlugin.appId]) {
          await addRawPlugin(w, { plugin: app }, raw)
          await addRawPlugin(w, { plugin: app, escrow: 'e' }, raw)
        }
      }
      WxE = (await Wx.client.state.box.escrows.value('e'))!.address
      WdE = (await Wd.client.state.box.escrows.value('e'))!.address
      for (const escrow of [WxE, WdE]) await algorand.send.payment({ sender: admin.addr, receiver: escrow, amount: microAlgo(10_000_000n) })
      await impact.send.setImpact({ args: { account: addr(Wd), impact: 800n }, ...send })
    }, 300_000)

    afterAll(() => {
      if (previousMbr === undefined) delete process.env.WALLET_MBR_APP_ID
      else process.env.WALLET_MBR_APP_ID = previousMbr
      Config.configure({ populateAppCallResources: previousPopulate })
    })

    test('setup: genuine for the mirror DAO only, never registered; MockMirrorDAO mirrors the main DAO', async () => {
      const info = await algorand.client.algod.getApplicationByID(Wx.appId).do()
      expect(info.params?.creator.toString()).toBe(accountFactory.client.appAddress.toString())
      expect((await algorand.account.getInformation(holder.addr)).authAddr?.toString()).toBe(addr(Wx))
      await assertUnregistered(escrowFactory, [addr(Wx), WxE, addr(Wd), WdE, holder.addr])
      expect(await hook2.getGateSlots()).toEqual([gateId])
    })

    test('P2-DEX-02: the owner opens, refreshes (default window, escrow window, gate) and closes its pass through a plugin window with a hint', async () => {
      const key = holder.addr.toString()
      // default window of Wx: S = C = holder; the plugin forwards windowHint(Wx); S pays the MBR (funder)
      const [opened] = await inWindow(Wx, [await pOpen(Wx, key, MEASURE_POWER)])
      expect(asPass(opened)).toMatchObject({ power: 9n, gates: 0n, funder: key })
      // escrow window of Wx: S = WxE, principal still holder (plugin arm, auth(holder) == Wx.address)
      const [refreshed] = await inWindow(Wx, [await pRefresh(Wx, key, MEASURE_POWER)], 'e')
      expect(asPass(refreshed)).toMatchObject({ power: 9n, funder: key })
      // Gate.mustCheckFor(gateCtx(pluginPrincipal)) + refreshFromGate in one inner group: ctx = (holder, Wx, WxE)
      const [fromGate] = await inWindow(Wx, [await pFromGate(Wx, key)], 'e')
      expect(asPass(fromGate).gates).toBe(1n)
      expect((await hook2.getPass({ args: { key } })).gates).toBe(1n)
      // nobody else may touch the live pass: not a stranger, not the wallet's admin acting as itself
      for (const who of [stranger, owner]) {
        await expectContractError(
          hook2.send.refresh({ sender: who.addr, signer: who.signer, args: { key, measure: MEASURE_POWER, gateArgs: [], wallet: 0n }, ...send }),
          'errGfau',
        )
        await expectContractError(hook2.send.closePass({ sender: who.addr, signer: who.signer, args: { key, wallet: 0n }, ...send }), 'errGfau')
      }
      // close from the default window: the MBR goes back to the funder (holder)
      const hookBefore = (await algorand.account.getInformation(hook2.appAddress)).balance.microAlgo
      const holderBefore = (await algorand.account.getInformation(holder.addr)).balance.microAlgo
      await inWindow(Wx, [await pClose(Wx, key)])
      expect((await hook2.getPass({ args: { key } })).validUntil).toBe(0n)
      expect(hookBefore - (await algorand.account.getInformation(hook2.appAddress)).balance.microAlgo).toBe(PASS_MBR)
      expect((await algorand.account.getInformation(holder.addr)).balance.microAlgo - holderBefore).toBe(PASS_MBR)
      await assertUnregistered(escrowFactory, [addr(Wx), WxE, holder.addr])
    })

    test('P2-DEX-01 (window): a plugin window cannot open a pass for any key but the window\'s principal', async () => {
      // Wx's principal is holder: not its own app address, not its escrow
      await expectContractError(inWindow(Wx, [await pOpen(Wx, addr(Wx), MEASURE_POWER)]), 'errGfau')
      await expectContractError(inWindow(Wx, [await pOpen(Wx, WxE, MEASURE_POWER)], 'e'), 'errGfau')
      // Wd cannot open one for Wx's principal, nor for a third party
      await expectContractError(inWindow(Wd, [await pOpen(Wd, holder.addr.toString(), MEASURE_POWER)]), 'errGfau')
      await expectContractError(inWindow(Wd, [await pOpen(Wd, trader.addr.toString(), MEASURE_POWER)], 'e'), 'errGfau')
      for (const key of [addr(Wx), WxE, holder.addr.toString(), trader.addr.toString()]) {
        expect((await hook2.getPass({ args: { key } })).validUntil).toBe(0n)
      }
    })

    test('BeforeSwap (T-15 rewrite): plugin swaps from default and escrow windows use the principal\'s one pass; quote(swapper, W) == swap', async () => {
      await ensureDayMargin()
      // Wx (external C): principal holder in both windows
      await inWindow(Wx, [await pOpen(Wx, holder.addr.toString(), MEASURE_POWER)])
      await expectPluginSwapAtFee(Wx, holder.addr.toString(), '', holder.addr.toString(), 50n)
      await expectPluginSwapAtFee(Wx, WxE, 'e', WxE, 50n)
      // one pass and one daily count across the wallet's escrows
      expect(await hook2.getDiscountedSwapsToday({ args: { key: holder.addr.toString() } })).toBe(2n)
      expect((await hook2.getPass({ args: { key: WxE } })).validUntil).toBe(0n)

      // Wd (default wallet): the pass is keyed by Wd.address; the default window has S == C, the escrow window S = WdE
      const [wdPass] = await inWindow(Wd, [await pOpen(Wd, addr(Wd), MEASURE_IMPACT)])
      expect(asPass(wdPass)).toMatchObject({ impact: 800n, funder: addr(Wd) })
      await expectPluginSwapAtFee(Wd, addr(Wd), '', addr(Wd), 50n)
      await expectPluginSwapAtFee(Wd, WdE, 'e', WdE, 50n)
      expect(await hook2.getDiscountedSwapsToday({ args: { key: addr(Wd) } })).toBe(2n)
      // neither the wallets' admin nor the plugin has a pass: the discount can only come from the hinted principal
      for (const key of [owner.addr.toString(), dexPlugin.appAddress.toString(), WdE]) {
        expect(await hook2.previewFee({ args: { poolId: pool2, key, feeBps: POOL_FEE } })).toBe(POOL_FEE)
      }
      // a top-level swap that names Wd as its hint is not Wd acting: errHtop (genuine wallet, no caller app)
      await expectContractError(swap(owner, pool2, 0n, 1_000_000n, ALGORAND_ZERO_ADDRESS_STRING, Wd.appId), 'errHtop')
      await assertUnregistered(escrowFactory, [addr(Wx), WxE, addr(Wd), WdE])
    })

    /**
     * Review fix (IMPLEMENTATION-LOG, plugin-dex review fixes, deviation 1). PluginDexPlugin always forwards
     * windowHint(wallet). Before the fix, any wallet that is not a wallet of the hook's own factory F reverted
     * every plugin swap into a GatedFee pool (errHnwl), while the quote for the same wallet succeeded.
     * Now such a hint, inside an app call, is priced as hint 0: key = the Vault's authenticated Txn.sender (S).
     */
    test('plugin swap into a GatedFee pool for a wallet that is not of the hook\'s factory: priced as hint 0 (S), never reverts, never prices the claimed identity', async () => {
      await ensureDayMargin()
      const amountIn = 1_000_000n
      const pluginSwapParams = (wallet: bigint, sender: TransactionSignerAccount, minAmountOut: bigint) =>
        dexPlugin.params.swap({
          sender: sender.addr,
          signer: sender.signer,
          args: { wallet, rekeyBack: true, poolId: gatedPool, assetIn: 0n, amountIn, minAmountOut, data: NO_DATA },
          maxFee,
        })
      const fullOut = async () => {
        const pool = await dex.getPool({ args: { poolId: gatedPool } })
        return expectedOut(amountIn, pool.reserveA, pool.reserveB, POOL_FEE)
      }

      // (a) a genuine Akita wallet of ANOTHER factory: Wd is created by the real AbstractedAccountFactory, while the
      // main hook's DAO names MockWalletFactory. Wd's default window: S = Wd.address, which has no pass on `hook`.
      const wdFull = await fullOut()
      expect(await quote(gatedPool, 0n, amountIn, addr(Wd), admin, Wd.appId)).toBe(wdFull)
      const wdOut0 = await tkaOf(addr(Wd)).catch(() => 0n)
      await inWindow(Wd, [await pluginSwapParams(Wd.appId, owner, wdFull)], '', dexPlugin.appId, 1)
      expect((await tkaOf(addr(Wd))) - wdOut0).toBe(wdFull)
      expect(await swapsToday(addr(Wd))).toBe(0n)

      // (b) a third-party ARC-58 wallet stand-in (test-only raw TEAL, created by an EOA, never by a factory) that
      // claims a pass holder as its controlled address and A as its spending account. A is rekeyed to the plugin.
      const claimed = await newImpactPassHolder()
      expect(await hook.previewFee({ args: { poolId: gatedPool, key: claimed.caller, feeBps: POOL_FEE } })).toBe(50n)
      const A = await newAccount()
      const attacker = await newAccount()
      const { appId: thirdPartyWallet } = await algorand.send.appCreate({
        sender: attacker.addr,
        signer: attacker.signer,
        approvalProgram: [
          '#pragma version 10',
          'txn ApplicationID',
          'bnz done',
          'byte "spending_address"',
          'txna ApplicationArgs 0',
          'app_global_put',
          'byte "controlled_address"',
          'txna ApplicationArgs 1',
          'app_global_put',
          'done:',
          'int 1',
        ].join('\n'),
        clearStateProgram: '#pragma version 10\nint 1',
        schema: { globalInts: 0, globalByteSlices: 2, localInts: 0, localByteSlices: 0 },
        args: [A.addr.publicKey, claimed.user.addr.publicKey],
      })
      await algorand.send.payment({ sender: A.addr, signer: A.signer, receiver: A.addr, amount: microAlgo(0), rekeyTo: dexPlugin.appAddress })

      // the quote path (thirdPartyPrincipal) and the plugin swap agree: S = A, full fee
      const aFull = await fullOut()
      expect(await quote(gatedPool, 0n, amountIn, A.addr.toString(), admin, thirdPartyWallet)).toBe(aFull)
      const aOut0 = await tkaOf(A.addr.toString())
      const claimedSwaps0 = await swapsToday(claimed.caller)
      const group = algorand.newGroup().addAppCallMethodCall(await pluginSwapParams(thirdPartyWallet, attacker, aFull))
      for (let i = 0; i < 2; i++) {
        group.addAppCallMethodCall(await dexPlugin.params.opUp({ sender: attacker.addr, signer: attacker.signer, args: {}, note: `carrier ${i}`, maxFee }))
      }
      await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true })
      expect((await tkaOf(A.addr.toString())) - aOut0).toBe(aFull)
      // the claimed controlled address's pass was neither used nor counted; A was handed back to the stand-in
      expect(await swapsToday(claimed.caller)).toBe(claimedSwaps0)
      expect(await swapsToday(A.addr.toString())).toBe(0n)
      expect((await algorand.account.getInformation(A.addr)).authAddr?.toString()).toBe(getApplicationAddress(thirdPartyWallet).toString())

      // a top-level hint stays strict (T-8): the same non-factory hint on a direct swap reverts
      await expectContractError(swap(trader, gatedPool, 0n, amountIn, ALGORAND_ZERO_ADDRESS_STRING, thirdPartyWallet), 'errHnwl')
      await assertEscrowIdentity(algorand, dex, gatedPool)
    })

    test('P2-DEX-03 (+ ACC-01 UpdateApplication): a Quote from app X with a forged wallet (spending = controlled = victim) and an arbitrary swapper never prices the victim', async () => {
      const victim = holder.addr.toString()
      const pass = await hook2.getPass({ args: { key: victim } })
      if (pass.validUntil === 0n) await inWindow(Wx, [await pOpen(Wx, victim, MEASURE_POWER)])
      const pool = await dex.getPool({ args: { poolId: pool2 } })
      const full = expectedOut(1_000_000n, pool.reserveA, pool.reserveB, POOL_FEE)
      const discounted = expectedOut(1_000_000n, pool.reserveA, pool.reserveB, 50n)

      // the attacker installs MockForgedWallet into its own genuine wallet and claims the victim
      const attacker = await newAccount()
      const w = await newUnregisteredWallet({ walletFactory: accountFactory, sender: attacker.addr, signer: attacker.signer, nickname: 'forger', fund: (2).algo() })
      await algorand.send.appUpdateMethodCall({
        sender: attacker.addr,
        signer: attacker.signer,
        appId: w.appId,
        method: w.client.appClient.getABIMethod('update'),
        args: ['forged'],
        approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
      })
      const Wf = algorand.client.getTypedAppClientById(MockForgedWalletClient, { appId: w.appId, defaultSender: attacker.addr, defaultSigner: attacker.signer })
      const key = (k: string) => new TextEncoder().encode(k)
      await Wf.send.setBytes({ args: { key: key('spending_address'), value: holder.addr.publicKey } })
      await Wf.send.setBytes({ args: { key: key('controlled_address'), value: holder.addr.publicKey } })
      const info = await algorand.client.algod.getApplicationByID(Wf.appId).do()
      expect(info.params?.creator.toString()).toBe(accountFactory.client.appAddress.toString())

      const A = await newAccount()
      await algorand.send.payment({ sender: A.addr, signer: A.signer, receiver: A.addr, amount: microAlgo(0), rekeyTo: Wf.appAddress })
      const random = await newAccount()
      const quoteAs = async (swapper: string, wallet: bigint) =>
        (await plugin.send.quoteAs({ args: { dex: dex.appId, poolId: pool2, assetIn: 0n, amountIn: 1_000_000n, swapper, wallet }, ...send })).return!
      for (const swapper of [Wf.appAddress.toString(), A.addr.toString(), random.addr.toString()]) {
        // app X (callerApp != 0): a ctx resolver fed swapper would take the plugin arm; thirdPartyPrincipal never does
        expect(await quoteAs(swapper, Wf.appId)).toBe(full)
        // the same at top level
        expect(await quote2(swapper, Wf.appId)).toBe(full)
      }
      // control: a quote previews any key it is asked about (by design), with or without a hint
      expect(await quoteAs(victim, 0n)).toBe(discounted)
      // the forged hint cannot bind a swap or a pass to the victim at top level
      await expectContractError(swap(attacker, pool2, 0n, 1_000_000n, ALGORAND_ZERO_ADDRESS_STRING, Wf.appId), 'errHtop')
      await expectContractError(
        hook2.send.openPass({
          sender: attacker.addr,
          signer: attacker.signer,
          args: {
            mbr: algorand.createTransaction.payment({ sender: attacker.addr, signer: attacker.signer, receiver: hook2.appAddress, amount: microAlgo(PASS_MBR) }),
            key: Wf.appAddress.toString(),
            measure: MEASURE_POWER,
            gateArgs: [],
            wallet: Wf.appId,
          },
          ...send,
        }),
        'errHtop',
      )
      // the victim's pass is untouched
      expect((await hook2.getPass({ args: { key: victim } })).validUntil).toBeGreaterThan(0n)
    })

    /**
     * Review fix: the PRODUCTION pass plugin (arc58/plugins/gated-fee-pass, GatedFeePassPlugin). The key is never
     * caller-supplied (derived from pluginPrincipal), the hook is pinned at create, and every call forwards
     * windowHint(wallet). Wp: external controlled address pHolder (one-year 10 ALGO lock: power 9), escrow 'e'.
     */
    test('GatedFeePassPlugin (production): open, refresh, refreshFromGate and close the principal\'s pass from default and escrow windows; the pass prices plugin swaps', async () => {
      await ensureDayMargin()
      const passPlugin = (
        await algorand.client
          .getTypedAppFactory(GatedFeePassPluginFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { version: 'test', hook: hook2.appId } })
      ).appClient
      expect(await passPlugin.state.global.akitaDao()).toBe(dao2)
      expect(await passPlugin.state.global.hook()).toBe(hook2.appId)
      expect(passPlugin.appClient.appSpec.methods.find((m) => m.name === 'openPass')!.args.map((a) => a.name)).toEqual(['wallet', 'rekeyBack', 'measure', 'gateArgs'])

      const pHolder = await newAccount()
      await lockStake(pHolder, 10_000_000n, (await blockTimestamp(algorand)) + ONE_YEAR - ONE_DAY)
      const Wp = await newUnregisteredWallet({
        walletFactory: accountFactory,
        sender: owner.addr,
        signer: owner.signer,
        nickname: 'gated wp',
        controlledAddress: pHolder.addr.toString(),
        controlledSigner: pHolder.signer,
        fund: (5).algo(),
      })
      const raw = { sender: owner.addr, signer: owner.signer }
      for (const app of [passPlugin.appId, dexPlugin.appId]) {
        await addRawPlugin(Wp, { plugin: app }, raw)
        await addRawPlugin(Wp, { plugin: app, escrow: 'e' }, raw)
      }
      const WpE = (await Wp.client.state.box.escrows.value('e'))!.address
      await algorand.send.payment({ sender: admin.addr, receiver: WpE, amount: microAlgo(10_000_000n) })
      const key = pHolder.addr.toString()

      const p = {
        open: (measure: bigint) =>
          passPlugin.params.openPass({ sender: owner.addr, signer: owner.signer, args: { wallet: Wp.appId, rekeyBack: true, measure, gateArgs: [] }, maxFee }),
        refresh: (measure: bigint) =>
          passPlugin.params.refresh({ sender: owner.addr, signer: owner.signer, args: { wallet: Wp.appId, rekeyBack: true, measure, gateArgs: [] }, maxFee }),
        fromGate: (gate: bigint) =>
          passPlugin.params.refreshFromGate({ sender: owner.addr, signer: owner.signer, args: { wallet: Wp.appId, rekeyBack: true, slot: 0n, gateId: gate, args: [NO_DATA] }, maxFee }),
        close: () => passPlugin.params.closePass({ sender: owner.addr, signer: owner.signer, args: { wallet: Wp.appId, rekeyBack: true }, maxFee }),
      }

      // outside a window the plugin does not hold S: errNath (no top-level path to someone's pass)
      await expectContractError(passPlugin.send.openPass({ args: { wallet: Wp.appId, rekeyBack: true, measure: MEASURE_POWER, gateArgs: [] }, ...send }), 'errNath')

      // default window: S = C = pHolder pays the MBR; the key is the principal pHolder (never caller-chosen)
      const [opened] = await inWindow(Wp, [await p.open(MEASURE_POWER)], '', passPlugin.appId)
      expect(asPass(opened)).toMatchObject({ power: 9n, gates: 0n, funder: key })
      // escrow window: S = WpE, same principal and pass
      const [refreshed] = await inWindow(Wp, [await p.refresh(MEASURE_POWER)], 'e', passPlugin.appId)
      expect(asPass(refreshed)).toMatchObject({ power: 9n, funder: key })
      // a wrong gate id for the slot is rejected by the hook; the slot's gate sets the bit. The wrong gate must
      // exist and pass for the principal (an identical staking-power gate under another id): an id with no gate
      // reverts inside the Gate (errNgat) before the hook ever sees the gate txn
      const otherGateId = (
        await gateSdk.register({
          args: [{ type: 'staking_power', appId: spgAppId, layer: 0n, logicalOperator: LogicalOperator.None, op: Operator.GreaterThanOrEqualTo, asset: 0n, power: 1n }],
        })
      ).return!
      expect(otherGateId).not.toBe(gateId)
      await expectContractError(inWindow(Wp, [await p.fromGate(otherGateId)], 'e', passPlugin.appId), 'errGfgt')
      const [fromGate] = await inWindow(Wp, [await p.fromGate(gateId)], 'e', passPlugin.appId)
      expect(asPass(fromGate).gates).toBe(1n)
      expect((await hook2.getPass({ args: { key: WpE } })).validUntil).toBe(0n)

      // close (no discounted swap today): the MBR goes back to the funder pHolder
      const holderBefore = (await algorand.account.getInformation(pHolder.addr)).balance.microAlgo
      await inWindow(Wp, [await p.close()], '', passPlugin.appId)
      expect((await hook2.getPass({ args: { key } })).validUntil).toBe(0n)
      // the default window's fees are paid by `owner`, so pHolder's balance moves by exactly the refund
      expect((await algorand.account.getInformation(pHolder.addr)).balance.microAlgo - holderBefore).toBe(PASS_MBR)

      // reopen from the escrow window: the escrow funds it, the key is still the principal
      const [reopened] = await inWindow(Wp, [await p.open(MEASURE_POWER)], 'e', passPlugin.appId)
      expect(asPass(reopened)).toMatchObject({ power: 9n, funder: WpE })
      // the pass prices plugin swaps of the wallet (default window, S = pHolder; escrow window, S = WpE)
      await expectPluginSwapAtFee(Wp, key, '', key, 50n)
      await expectPluginSwapAtFee(Wp, WpE, 'e', WpE, 50n)
      expect(await hook2.getDiscountedSwapsToday({ args: { key } })).toBe(2n)
      // a pass with discounted swaps today cannot be closed until the next UTC day
      await expectContractError(inWindow(Wp, [await p.close()], 'e', passPlugin.appId), 'errGfdy')
      await assertUnregistered(escrowFactory, [addr(Wp), WpE, key])
    })

    test('GatedFeePassPlugin (production): pinned to a hook whose DAO names another factory, a wallet is not genuine (errHnwl); create needs a GatedFeeHook (errGpHk)', async () => {
      // `hook` (main DAO) names MockWalletFactory; Wd is a wallet of the real AbstractedAccountFactory
      const mainPlugin = (
        await algorand.client
          .getTypedAppFactory(GatedFeePassPluginFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { version: 'test', hook: hook.appId } })
      ).appClient
      await addRawPlugin(Wd, { plugin: mainPlugin.appId }, { sender: owner.addr, signer: owner.signer })
      const open = await mainPlugin.params.openPass({ sender: owner.addr, signer: owner.signer, args: { wallet: Wd.appId, rekeyBack: true, measure: MEASURE_IMPACT, gateArgs: [] }, maxFee })
      await expectContractError(inWindow(Wd, [open], '', mainPlugin.appId), 'errHnwl')
      expect((await hook.getPass({ args: { key: addr(Wd) } })).validUntil).toBe(0n)
      // PluginDexPlugin has no `akita_dao` global: not a GatedFeeHook
      await expectContractError(
        algorand.client
          .getTypedAppFactory(GatedFeePassPluginFactory, { defaultSender: admin.addr, defaultSigner: admin.signer })
          .send.create.create({ args: { version: 'test', hook: dexPlugin.appId } }),
        'errGpHk',
      )
    })
  })

  test('measurements: opcode cost of a gated quote vs an un-gated quote', async () => {
    const cost = async (poolId: bigint, swapper: string) => {
      const result = await dex
        .newGroup()
        .quote({ args: { poolId, assetIn: 0n, amountIn: 1_000_000n, swapper, data: NO_DATA, wallet: 0n }, staticFee: microAlgo(10_000) })
        .simulate({ allowUnnamedResources: true, skipSignatures: true })
      return result.simulateResponse.txnGroups[0].appBudgetConsumed ?? 0
    }
    const plain = await cost(plainPool, trader.addr.toString())
    const noPass = await cost(gatedPool, stranger.addr.toString())
    const withPass = await cost(gatedPool, trader.addr.toString())
    console.log(`[gated-fee] quote opcodes: un-gated ${plain}, gated without pass ${noPass}, gated with pass ${withPass}`)
    expect(withPass).toBeGreaterThan(plain)
  })

  test('T-4: after the TTL the pass is ignored, and anyone can close it with the MBR refunded to the funder', async () => {
    const staker = await newAccount()
    await lockStake(staker, 10_000_000n, (await blockTimestamp(algorand)) + ONE_YEAR - ONE_DAY)
    await hook.send.setPassTtl({ sender: daoWallet.addr, signer: daoWallet.signer, args: { ttl: 3_600n }, ...send })
    try {
      const spender = staker.addr.toString()
      const pass = await openPass(staker, MEASURE_POWER, stranger)
      expect(pass.validUntil - (await blockTimestamp(algorand))).toBeLessThanOrEqual(3_600n)
      expect(await hook.previewFee({ args: { poolId: gatedPool, key: spender, feeBps: POOL_FEE } })).toBe(50n)
      await expectContractError(closePass(spender), 'errGfau')

      await new TimeWarp(algorand).timeWarp(3_700n)
      expect(await hook.previewFee({ args: { poolId: gatedPool, key: spender, feeBps: POOL_FEE } })).toBe(POOL_FEE)
      await expectSwapAtFee(staker, gatedPool, 1_000_000n, POOL_FEE)

      const funderBefore = (await algorand.account.getInformation(stranger.addr)).balance.microAlgo
      await closePass(spender)
      const funderAfter = (await algorand.account.getInformation(stranger.addr)).balance.microAlgo
      expect(funderAfter - funderBefore).toBe(PASS_MBR)
      expect((await hook.getPass({ args: { key: spender } })).validUntil).toBe(0n)
    } finally {
      await hook.send.setPassTtl({ sender: daoWallet.addr, signer: daoWallet.signer, args: { ttl: ONE_DAY }, ...send })
    }
  })

  test('T-17 (#18): the daily count resets on the next UTC day; a capped pass can be closed from then (time warp: keep last)', async () => {
    const a = await newImpactPassHolder()
    const b = await newImpactPassHolder()
    await setDailyCap(1n)
    try {
      await ensureDayMargin()
      for (const { user } of [a, b]) {
        await expectSwapAtFee(user, gatedPool, 1_000_000n, 50n)
        await expectSwapAtFee(user, gatedPool, 1_000_000n, POOL_FEE)
      }
      const yesterday = await hook.getPass({ args: { key: a.caller } })
      expect(yesterday.daySwaps).toBe(1n)
      await expectContractError(closePass(b.caller, b.user), 'errGfdy')

      // into the next UTC day
      const now = await blockTimestamp(algorand)
      await new TimeWarp(algorand).timeWarp(ONE_DAY - (now % ONE_DAY) + 60n)
      // ≥: other suites warping the shared LocalNet clock concurrently may move it further
      expect((await blockTimestamp(algorand)) / ONE_DAY).toBeGreaterThanOrEqual(yesterday.swapDay + 1n)
      expect(await swapsToday(a.caller)).toBe(0n)

      // a: the pass may have expired in the warp; refresh keeps the (stale) counter and renews it
      const refreshed = await refresh(a.caller, MEASURE_IMPACT, a.user)
      expect(refreshed.swapDay).toBe(yesterday.swapDay)
      expect(refreshed.daySwaps).toBe(1n)
      await expectSwapAtFee(a.user, gatedPool, 1_000_000n, 50n)
      const today = await hook.getPass({ args: { key: a.caller } })
      expect(today.swapDay).toBeGreaterThan(yesterday.swapDay)
      expect(today.daySwaps).toBe(1n)
      await expectSwapAtFee(a.user, gatedPool, 1_000_000n, POOL_FEE)

      // b: no discounted swap today ⇒ closable; the funder (b) gets the MBR back
      const before = (await algorand.account.getInformation(b.user.addr)).balance.microAlgo
      const result = await closePass(b.caller, b.user)
      const fees = result.transactions.reduce((sum, txn) => sum + txn.fee, 0n)
      const after = (await algorand.account.getInformation(b.user.addr)).balance.microAlgo
      expect(after - before).toBe(PASS_MBR - fees)
    } finally {
      await setDailyCap(DEFAULT_MAX_DISCOUNTED_SWAPS_PER_DAY)
    }
  })
})
