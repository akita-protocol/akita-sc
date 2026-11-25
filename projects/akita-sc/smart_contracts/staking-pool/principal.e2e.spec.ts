import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk, { ABIType } from 'algosdk'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { sendPrepared } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { LogicalOperator } from 'akita-sdk/gates'
import {
  STAKING_POOL_ENTRY_BY_ADDRESS_MBR,
  STAKING_POOL_PRINCIPALS_MBR,
  StakingPoolSDK,
  stakingPoolEntryMbr,
} from 'akita-sdk/staking-pool'
import { SDKClient } from 'akita-sdk/types'
import { CallerType, newWallet, StakingPoolPluginSDK, WalletSDK } from 'akita-sdk/wallet'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { TimeWarp } from '../../tests/utils/time'
import { APP_SPEC as ForgedWalletSpec, MockForgedWalletClient } from '../artifacts/mocks/forged-wallet/MockForgedWalletClient'
import { MockEchoSubGateFactory } from '../artifacts/mocks/gate/MockEchoSubGateClient'
import { StakingPoolFactory as StakingPoolAppFactory } from '../artifacts/staking-pool/StakingPoolClient'
import { errHintNotWallet, errHintTopLevel } from '../utils/errors'
import {
  DEPLOYED_STAKING_POOL_CHILD,
  DEPLOYED_STAKING_POOL_PLUGIN,
  DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026,
} from './compat/mainnet-programs'
import { errFailedGate, errInvalidPayment, errNotEnoughFunds } from './errors'

/**
 * StakingPool principal resolution (docs/principal-resolution/PHASE-0-SPEC.md §6.5, §7.2, §7.5;
 * Q11 stored pair, Q14 exact entry MBR).
 *
 * Gate subjects are proved with `MockEchoSubGate`: a context-aware echo passes only when the filter
 * args equal `encode(ctx)` it received (`checkFor`), a plain echo only when they equal the caller
 * (`check`). A third-party `gateCheck` re-evaluates the entry's STORED args, so it passes exactly when
 * the subject it re-derives from the stored pair equals the one verified at entry.
 *
 * Deployed plugin generations (MainNet 3642438287 July 2026, 3569562283 May 2026) and the deployed
 * child (factory 3569556570 box `bc`) run from their MainNet bytecode (`compat/mainnet-programs.ts`).
 */

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
const ZERO_KEY = { address: ZERO, name: '' }
const NONE_POOL = 0
const ctxType = ABIType.from('(address,uint64,address)')
type Ctx = { principal: string; wallet: bigint; spender: string }
const encodeCtx = (c: Ctx): Uint8Array => ctxType.encode([c.principal, c.wallet, c.spender])
const addressBytes = (a: string): Uint8Array => algosdk.decodeAddress(a).publicKey
const UNIQUES_MBR = 18_900n
const FLAT_ENTRY_MBR = 25_300n + 25_300n
const ONE_DAY = 86_400n
const DISTRIBUTION_FLAT = 20
/** maxFee for gate txns built with the raw generated client (the SDK's GateSDK.build sets one by default). */
const GATE_TXN_MAX_FEE = microAlgo(20_000)

async function proposeAndExecute<TClient extends SDKClient>(dao: AkitaDaoSDK, actions: ProposalAction<TClient>[]): Promise<bigint> {
  const info = await dao.proposalCost({ actions })
  await dao.client.appClient.fundAppAccount({ amount: info.total.microAlgo() })
  const { return: proposalId } = await dao.newProposal({ actions })
  if (proposalId === undefined) throw new Error('Failed to create proposal')
  await dao.executeProposal({ proposalId })
  return proposalId
}

describe('StakingPool principal resolution (§6.5)', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  let user: TransactionSignerAccount
  let dispenser: TransactionSignerAccount
  let timeWarp: TimeWarp

  /** default wallet (C = W.address), unregistered; the plugin is granted globally and on escrow 'e' */
  let Wd: WalletSDK
  let Ed: string
  let plugin: StakingPoolPluginSDK

  let ECHO_CTX: bigint
  let ECHO_PLAIN: bigint
  let gateCtxId: bigint
  let gatePlainId: bigint

  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })
  const addr = (w: WalletSDK) => w.client.appAddress.toString()
  const minBalance = async (address: string) => (await algorand.account.getInformation(address)).minBalance.microAlgos
  const balance = async (address: string) => (await algorand.account.getInformation(address)).balance.microAlgos
  const blockTimestamp = async () => {
    const status = await algorand.client.algod.status().do()
    const block = await algorand.client.algod.block(status.lastRound).do()
    return BigInt(block.block.header.timestamp)
  }

  const deployEcho = async (): Promise<bigint> => {
    const factory = algorand.client.getTypedAppFactory(MockEchoSubGateFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
    const { appClient } = await factory.send.create.bare()
    await appClient.appClient.fundAppAccount({ amount: microAlgo(100_000) })
    return appClient.appId
  }

  const registerGate = async (subGate: bigint): Promise<bigint> => {
    const gate = universe.gate.client
    const filters: [bigint, bigint, number][] = [[0n, subGate, LogicalOperator.None]]
    const args = [new Uint8Array()]
    const { return: cost } = await gate.send.cost({ ...send(deployer), args: { filters, args }, extraFee: microAlgo(8_000) })
    const payment = await algorand.createTransaction.payment({ sender: deployer.addr, receiver: gate.appAddress, amount: microAlgo(cost ?? 0n) })
    const { return: id } = await gate.send.register({ ...send(deployer), args: { payment, filters, args }, extraFee: microAlgo(16_000) })
    return id!
  }

  /** A pool created directly through the factory (wallet hint 0) and opened for sign-ups now. */
  const livePool = async (gateId: bigint, endIn = ONE_DAY): Promise<StakingPoolSDK> => {
    const pool = await universe.stakingPoolFactory.new({
      ...send(deployer),
      title: `principal pool ${gateId}`,
      type: NONE_POOL,
      marketplace: deployer.addr.toString(),
      stakeKey: ZERO_KEY,
      minimumStakeAmount: 0n,
      allowLateSignups: true,
      gateId,
      maxEntries: 0n,
    })
    await algorand.send.payment({ ...send(deployer), receiver: pool.client.appAddress, amount: microAlgo(1_000_000) })
    await pool.finalize({ ...send(deployer), signupTimestamp: 0n, startTimestamp: 0n, endTimestamp: (await blockTimestamp()) + endIn })
    return pool
  }

  const entryOf = async (pool: StakingPoolSDK, address: string, asset = 0n) => {
    const id = await pool.client.state.box.entriesByAddress.value({ address, asset })
    return (await pool.client.state.box.entries.value(id!))!
  }

  const gateCheckBy = async (pool: StakingPoolSDK, address: string, asset = 0n) =>
    pool.gateCheck({ ...send(deployer), address, asset })

  const enterVia = async (wallet: WalletSDK, client: StakingPoolPluginSDK, pool: StakingPoolSDK, args: Uint8Array[], escrow = '') =>
    wallet.usePlugin({
      ...send(user),
      callerType: CallerType.Global,
      ...(escrow ? { escrow } : {}),
      calls: [client.enter({ appId: pool.appId, entries: [[0n, 1n, []]], args })],
    })

  const escrowAddress = async (wallet: WalletSDK, name: string): Promise<string> => {
    const escrow = (await wallet.client.state.box.escrows.value(name))!
    return escrow.address && escrow.address !== ZERO ? escrow.address : algosdk.getApplicationAddress(escrow.id).toString()
  }

  const newUserWallet = async (nickname: string, register = false, referrer?: string): Promise<WalletSDK> => {
    const wallet = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
      ...send(user),
      nickname,
      ...(referrer ? { referrer } : {}),
      register,
    } as Parameters<typeof newWallet>[0])
    await algorand.send.payment({ ...send(dispenser), receiver: wallet.client.appAddress, amount: microAlgo(20_000_000) })
    return wallet
  }

  /** Runs one deployed plugin program on LocalNet, bound to the universe factory and DAO. */
  const deployLegacyPlugin = async (snapshot: typeof DEPLOYED_STAKING_POOL_PLUGIN | typeof DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026) => {
    const created = await algorand.send.appCreateMethodCall({
      ...send(deployer),
      approvalProgram: Buffer.from(snapshot.approval, 'base64'),
      clearStateProgram: Buffer.from(snapshot.clear, 'base64'),
      schema: { globalInts: snapshot.globalInts, globalByteSlices: snapshot.globalByteSlices, localInts: 0, localByteSlices: 0 },
      method: universe.stakingPoolPlugin.client.appClient.getABIMethod('create'),
      args: [`mainnet-${snapshot.appId}`, universe.stakingPoolFactory.appId, universe.dao.appId],
    })
    return new StakingPoolPluginSDK({
      algorand,
      factoryParams: { appId: created.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })
  }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: microAlgo(2_000_000_000) })
    user = await fixture.context.generateAccount({ initialFunds: microAlgo(1_000_000_000) })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())
    timeWarp = new TimeWarp(algorand)

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    plugin = universe.stakingPoolPlugin

    // echo sub-gates on the universe Gate (its creator manages the allowlist before imports are sealed)
    ECHO_CTX = await deployEcho()
    ECHO_PLAIN = await deployEcho()
    await universe.gate.client.appClient.fundAppAccount({ ...send(deployer), amount: microAlgo(2_000_000) })
    await universe.gate.client.send.setSubGate({ ...send(deployer), args: { app: ECHO_CTX, allowed: true, ctxAware: true } })
    await universe.gate.client.send.setSubGate({ ...send(deployer), args: { app: ECHO_PLAIN, allowed: true, ctxAware: false } })
    gateCtxId = await registerGate(ECHO_CTX)
    gatePlainId = await registerGate(ECHO_PLAIN)

    Wd = await newUserWallet('Wd')
    await Wd.addPlugin({ ...send(user), client: plugin, callerType: CallerType.Global })
    await Wd.addPlugin({ ...send(user), client: plugin, callerType: CallerType.Global, escrow: 'e' })
    Ed = await escrowAddress(Wd, 'e')
    await algorand.send.payment({ ...send(dispenser), receiver: Ed, amount: microAlgo(5_000_000) })
  })

  describe('child marker and SDK selection', () => {
    test('new children carry pv = 1 and the SDK selects the hinted ABI', async () => {
      const pool = await livePool(0n)
      expect(await pool.client.state.global.principalVersion()).toBe(1n)
      expect(await pool.isHintedPool()).toBe(true)
      // algokit-utils reports the schema as a JS number
      const schema = (await algorand.app.getById(pool.appId)).globalInts
      expect(Number(schema)).toBe(13)
    })
  })

  describe('hinted gatedEnter (plugin windows)', () => {
    test('P2-STK-01 / P2-STK-04: default window: exact quote = exact charge (Q14 + 31,700 pair), stored pair, refund on removal', async () => {
      const pool = await livePool(gateCtxId, 300n)
      const ctx: Ctx = { principal: addr(Wd), wallet: Wd.appId, spender: addr(Wd) }
      const args = [encodeCtx(ctx)]

      const quote = await pool.enterCost({ address: addr(Wd), assets: [0n], args, wallet: Wd.appId })
      // 72-byte ctx arg: entries box 2,500 + 400 * (60 + 2 + 2 + 2 + 72) = 57,700 (not the flat 25,300)
      expect(stakingPoolEntryMbr(args)).toBe(57_700n)
      expect(quote).toBe(stakingPoolEntryMbr(args) + STAKING_POOL_ENTRY_BY_ADDRESS_MBR + UNIQUES_MBR + STAKING_POOL_PRINCIPALS_MBR)
      // without a hint the pair is not charged
      expect(await pool.enterCost({ address: addr(Wd), assets: [0n], args, wallet: 0n }))
        .toBe(quote - STAKING_POOL_PRINCIPALS_MBR)

      const poolMinBefore = await minBalance(pool.client.appAddress.toString())
      const walletBefore = await balance(addr(Wd))
      await enterVia(Wd, plugin, pool, args)
      // the box MBR the entry created is exactly what the entrant paid (no pool subsidy)
      expect((await minBalance(pool.client.appAddress.toString())) - poolMinBefore).toBe(quote)
      expect(walletBefore - (await balance(addr(Wd)))).toBe(quote)

      expect(await pool.getStoredPrincipal({ address: addr(Wd) })).toEqual({ wallet: Wd.appId, principal: addr(Wd) })
      const entry = await entryOf(pool, addr(Wd))
      expect(entry.legacyCharged).toBe(false)
      expect(entry.disqualified).toBe(false)

      // H-5: anyone re-runs the gate with the stored args; the stored pair re-derives the same ctx
      await gateCheckBy(pool, addr(Wd))
      expect((await entryOf(pool, addr(Wd))).disqualified).toBe(false)

      // after the end anyone removes the entry; the entrant gets back exactly what it paid
      await timeWarp.timeWarp(400n)
      const refundBefore = await balance(addr(Wd))
      await pool.removeEntry({ ...send(deployer), address: addr(Wd), asset: 0n })
      expect((await balance(addr(Wd))) - refundBefore).toBe(quote)
      expect(await minBalance(pool.client.appAddress.toString())).toBe(poolMinBefore)
      expect(await pool.getStoredPrincipal({ address: addr(Wd) })).toEqual({ wallet: 0n, principal: addr(Wd) })
    })

    test('escrow window: subject is W.address with spender E; a third party cannot disqualify E (stored pair)', async () => {
      const pool = await livePool(gateCtxId)
      const ctx: Ctx = { principal: addr(Wd), wallet: Wd.appId, spender: Ed }
      await enterVia(Wd, plugin, pool, [encodeCtx(ctx)], 'e')

      expect(await pool.getStoredPrincipal({ address: Ed })).toEqual({ wallet: Wd.appId, principal: addr(Wd) })
      await gateCheckBy(pool, Ed)
      expect((await entryOf(pool, Ed)).disqualified).toBe(false)
      // no registry was needed anywhere: neither the wallet nor its escrow is registered
      expect(await universe.escrowFactory.exists({ args: { address: Ed } })).toBe(false)
    })

    test('the subject the plugin presents must be the verified principal: an escrow window cannot pass a spender-subject gate arg', async () => {
      const pool = await livePool(gateCtxId)
      // args claim ctx = (E, 0, E): the Gate evaluates the plugin's real ctx (W.address, W, E) and fails
      const wrong: Ctx = { principal: Ed, wallet: 0n, spender: Ed }
      await expect(enterVia(Wd, plugin, pool, [encodeCtx(wrong)], 'e')).rejects.toThrow(/errFgte|assert failed|logic eval error/)
    })

    test('P2-STK-03: a forged entrant wallet cannot block gateCheck; deleting it disqualifies, never panics', async () => {
      const forger = await newUserWallet('forger')
      await forger.addPlugin({ ...send(user), client: plugin, callerType: CallerType.Global })
      const pool = await livePool(gateCtxId)
      const ctx: Ctx = { principal: addr(forger), wallet: forger.appId, spender: addr(forger) }
      await enterVia(forger, plugin, pool, [encodeCtx(ctx)])

      // the admin installs MockForgedWallet into the genuine wallet and corrupts its globals
      await algorand.send.appUpdateMethodCall({
        ...send(user),
        appId: forger.appId,
        method: forger.client.appClient.getABIMethod('update'),
        args: ['forged'],
        approvalProgram: Buffer.from(ForgedWalletSpec.byteCode!.approval, 'base64'),
        clearStateProgram: Buffer.from(ForgedWalletSpec.byteCode!.clear, 'base64'),
      })
      const forged = algorand.client.getTypedAppClientById(MockForgedWalletClient, {
        appId: forger.appId, defaultSender: user.addr, defaultSigner: user.signer,
      })
      await forged.send.setUint({ args: { key: Buffer.from('controlled_address'), value: 7n } })
      await forged.send.del({ args: { key: Buffer.from('referrer') } })
      await forged.send.setBytes({ args: { key: Buffer.from('spending_address'), value: new Uint8Array(31) } })

      // no wallet global is read: no panic, and the subject is unchanged (still owned at rest)
      await gateCheckBy(pool, addr(forger))
      expect((await entryOf(pool, addr(forger))).disqualified).toBe(false)

      // the wallet is deleted: the pair no longer verifies, the gate fails, the entry is disqualified
      await forged.send.delete.destroy({ args: {} })
      await gateCheckBy(pool, addr(forger))
      expect((await entryOf(pool, addr(forger))).disqualified).toBe(true)
    })
  })

  describe('hinted gatedEnter (direct calls)', () => {
    const mustCheckFor = async (pool: StakingPoolSDK, sender: TransactionSignerAccount, ctx: Ctx, args: Uint8Array[]) =>
      universe.gate.client.params.mustCheckFor({
        ...send(sender),
        args: { ctx, gateId: (await pool.getState()).gateId, args },
        // the Gate calls the sub-gate (one inner txn): fee coverage may raise this txn's fee up to maxFee
        maxFee: GATE_TXN_MAX_FEE,
      })

    test('an EOA acting as itself (hint 0) enters with ctx (S, 0, S); no pair is stored', async () => {
      const pool = await livePool(gateCtxId)
      const eoa = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const ctx: Ctx = { principal: eoa.addr.toString(), wallet: 0n, spender: eoa.addr.toString() }
      const gateTxn = await mustCheckFor(pool, eoa, ctx, [encodeCtx(ctx)])
      await pool.enter({ ...send(eoa), entries: [{ asset: 0n, amount: 1n }], gateTxn, wallet: 0n })
      expect(await pool.getStoredPrincipal({ address: eoa.addr.toString() })).toEqual({ wallet: 0n, principal: eoa.addr.toString() })
      await gateCheckBy(pool, eoa.addr.toString())
      expect((await entryOf(pool, eoa.addr.toString())).disqualified).toBe(false)
    })

    test('a wallet hint on a top-level call reverts (errHtop); a non-wallet hint reverts (errHnwl)', async () => {
      const pool = await livePool(gateCtxId)
      const eoa = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const ctx: Ctx = { principal: eoa.addr.toString(), wallet: Wd.appId, spender: eoa.addr.toString() }
      const gateTxn = await mustCheckFor(pool, eoa, ctx, [encodeCtx(ctx)])
      await expect(pool.enter({ ...send(eoa), entries: [{ asset: 0n, amount: 1n }], gateTxn, wallet: Wd.appId }))
        .rejects.toThrow(new RegExp(errHintTopLevel))
      const fake: Ctx = { ...ctx, wallet: ECHO_PLAIN }
      const fakeTxn = await mustCheckFor(pool, eoa, fake, [encodeCtx(fake)])
      await expect(pool.enter({ ...send(eoa), entries: [{ asset: 0n, amount: 1n }], gateTxn: fakeTxn, wallet: ECHO_PLAIN }))
        .rejects.toThrow(new RegExp(errHintNotWallet))
    })

    test('P2-GATE-03: a mustCheckFor ctx that differs from the resolved principal is rejected (errFgte)', async () => {
      const pool = await livePool(gateCtxId)
      const eoa = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      // the Gate itself passes (echo of the claimed ctx), but the target resolves (eoa, 0, eoa)
      const claimed: Ctx = { principal: addr(Wd), wallet: 0n, spender: eoa.addr.toString() }
      const gateTxn = await mustCheckFor(pool, eoa, claimed, [encodeCtx(claimed)])
      await expect(pool.enter({ ...send(eoa), entries: [{ asset: 0n, amount: 1n }], gateTxn, wallet: 0n }))
        .rejects.toThrow(new RegExp(errFailedGate))
    })
  })

  describe('ungated enter (Q14)', () => {
    test('charges the exact MBR, accepts the flat MBR older plugins hard-code, and refunds each as charged', async () => {
      const pool = await livePool(0n, 300n)
      const exactUser = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const flatUser = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const oddUser = await fixture.context.generateAccount({ initialFunds: (10).algo() })

      const exact = await pool.enterCost({ address: exactUser.addr.toString(), assets: [0n] })
      expect(exact).toBe(27_300n + 22_100n + UNIQUES_MBR)
      // the legacy quote of an ungated pool is the same exact charge
      expect(await pool.enterCost({ address: exactUser.addr.toString(), assets: [0n], legacy: true })).toBe(exact)

      const enterPaying = async (who: TransactionSignerAccount, amount: bigint) => {
        const payment = await algorand.createTransaction.payment({ sender: who.addr, receiver: pool.client.appAddress, amount: microAlgo(amount) })
        return pool.client.send.enter({ ...send(who), args: { payment, entries: [[0n, 1n, []]] }, extraFee: microAlgo(4_000) })
      }
      await enterPaying(exactUser, exact)
      await enterPaying(flatUser, FLAT_ENTRY_MBR + UNIQUES_MBR)
      await expect(enterPaying(oddUser, exact + 1n)).rejects.toThrow(new RegExp(errInvalidPayment))

      expect((await entryOf(pool, exactUser.addr.toString())).legacyCharged).toBe(false)
      expect((await entryOf(pool, flatUser.addr.toString())).legacyCharged).toBe(true)

      await timeWarp.timeWarp(400n)
      for (const [who, paid] of [[exactUser, exact], [flatUser, FLAT_ENTRY_MBR + UNIQUES_MBR]] as const) {
        const before = await balance(who.addr.toString())
        await pool.removeEntry({ ...send(deployer), address: who.addr.toString(), asset: 0n })
        expect((await balance(who.addr.toString())) - before).toBe(paid)
      }
    })
  })

  describe('StakingPoolFactory newPool / newPoolCost (hinted + legacy shims)', () => {
    test('newPoolCost(wallet) adds the referral MBR only for a wallet with a referrer; the plugin pays it exactly', async () => {
      const referrer = (await fixture.context.generateAccount({ initialFunds: (1).algo() })).addr.toString()
      const referred = await newUserWallet('referred', false, referrer)
      await referred.addPlugin({ ...send(user), client: plugin, callerType: CallerType.Global })
      // the pool costs the DAO creation fee plus the child MBR (about 51.7 ALGO): more than newUserWallet funds
      await algorand.send.payment({ ...send(dispenser), receiver: addr(referred), amount: microAlgo(60_000_000) })

      const plain = await universe.stakingPoolFactory.cost({ wallet: 0n })
      const withReferrer = await universe.stakingPoolFactory.cost({ wallet: referred.appId })
      const noReferrer = await universe.stakingPoolFactory.cost({ wallet: Wd.appId })
      expect(noReferrer).toBe(plain)
      expect(withReferrer).toBeGreaterThanOrEqual(plain)
      // a non-wallet hint quotes like no hint (quotes never revert for non-wallets)
      expect(await universe.stakingPoolFactory.cost({ wallet: ECHO_PLAIN })).toBe(plain)

      // the plugin quotes newPoolCost(windowHint) and pays it: the exact-payment check passes
      await referred.usePlugin({
        ...send(user),
        callerType: CallerType.Global,
        calls: [plugin.newPool({
          title: 'referred pool', type: NONE_POOL, marketplace: addr(referred), stakeKey: ZERO_KEY,
          minimumStakeAmount: 0n, allowLateSignups: true, gateId: 0n, maxEntries: 0n,
        })],
      })
    })

    test('legacy shims newPool(9 args) / newPoolCost() still create current (pv) children', async () => {
      const factory = universe.stakingPoolFactory
      // the legacy quote reads the EscrowFactory registry of Txn.sender (one inner call): the simulated call pays its fee
      const legacyCost = await factory.client.newPoolCostUint64({ ...send(deployer), args: {}, extraFee: microAlgo(1_000) })
      const payment = await algorand.createTransaction.payment({ sender: deployer.addr, receiver: factory.client.appAddress, amount: microAlgo(legacyCost) })
      const { return: appId } = await factory.client.send.newPoolPayStringUint8AddressAddressStringUint64BoolUint64Uint64Uint64({
        ...send(deployer),
        args: {
          payment, title: 'legacy shim pool', type: NONE_POOL, marketplace: deployer.addr.toString(), stakeKey: ZERO_KEY,
          minimumStakeAmount: 0n, allowLateSignups: true, gateId: 0n, maxEntries: 0n,
        },
        extraFee: microAlgo(20_000),
      })
      const pool = factory.get({ appId: appId! })
      expect(await pool.client.state.global.principalVersion()).toBe(1n)
    })
  })

  describe('deployed plugin generations on new children (P2-CMP-01, P2-REF-02)', () => {
    let julyPlugin: StakingPoolPluginSDK
    let mayPlugin: StakingPoolPluginSDK
    /** registered wallet (legacy registry semantics), escrow 'e' registered too */
    let Wr: WalletSDK
    let Er: string

    beforeAll(async () => {
      julyPlugin = await deployLegacyPlugin(DEPLOYED_STAKING_POOL_PLUGIN)
      mayPlugin = await deployLegacyPlugin(DEPLOYED_STAKING_POOL_PLUGIN_MAY_2026)
      Wr = await newUserWallet('Wr', true)
      await Wr.addPlugin({ ...send(user), client: julyPlugin, callerType: CallerType.Global, escrow: 'e', registerEscrow: true })
      await Wr.addPlugin({ ...send(user), client: mayPlugin, callerType: CallerType.Global, escrow: 'm', registerEscrow: true })
      Er = await escrowAddress(Wr, 'e')
      await algorand.send.payment({ ...send(dispenser), receiver: Er, amount: microAlgo(5_000_000) })
      await algorand.send.payment({ ...send(dispenser), receiver: await escrowAddress(Wr, 'm'), amount: microAlgo(5_000_000) })
    })

    test('P2-STK-02: the July plugin enters a new pool from an escrow window; the shim stores the registry pair, so a third party cannot disqualify', async () => {
      const pool = await livePool(gatePlainId, 300n)
      // the deployed plugin presents the raw controlled address (= Wr.address) to Gate.mustCheck
      await enterVia(Wr, julyPlugin, pool, [addressBytes(addr(Wr))], 'e')

      expect(await pool.getStoredPrincipal({ address: Er })).toEqual({ wallet: Wr.appId, principal: addr(Wr) })
      const entry = await entryOf(pool, Er)
      expect(entry.legacyCharged).toBe(true)

      // Gate.checkFor gives the plain echo check(ctx.principal = Wr.address): the stored args match.
      // Without the pair the subject would be E and the entrant would be disqualified (R11).
      await gateCheckBy(pool, Er)
      expect((await entryOf(pool, Er)).disqualified).toBe(false)

      // refunded as charged: flat entry MBR + uniques + the pair
      await timeWarp.timeWarp(400n)
      const before = await balance(Er)
      await pool.removeEntry({ ...send(deployer), address: Er, asset: 0n })
      expect((await balance(Er)) - before).toBe(FLAT_ENTRY_MBR + UNIQUES_MBR + STAKING_POOL_PRINCIPALS_MBR)
    })

    test('the July plugin enters an ungated new pool at the exact quote', async () => {
      const pool = await livePool(0n)
      await enterVia(Wr, julyPlugin, pool, [], 'e')
      expect((await entryOf(pool, Er)).legacyCharged).toBe(false)
    })

    test('the May plugin (hard-coded flat MBR, no quote) still enters new pools; gated entries store no pair', async () => {
      const Em = await escrowAddress(Wr, 'm')
      const ungated = await livePool(0n)
      await enterVia(Wr, mayPlugin, ungated, [], 'm')
      expect((await entryOf(ungated, Em)).legacyCharged).toBe(true)

      const gated = await livePool(gatePlainId)
      await enterVia(Wr, mayPlugin, gated, [addressBytes(addr(Wr))], 'm')
      expect((await entryOf(gated, Em)).legacyCharged).toBe(true)
      expect(await gated.getStoredPrincipal({ address: Em })).toEqual({ wallet: 0n, principal: Em })
    })

    test('R11 (May plugin, no pair): a third party cannot disqualify the escrow entry; gateCheck falls back to the registry wallet that owns it at rest', async () => {
      const Em = await escrowAddress(Wr, 'm')
      const pool = await livePool(gatePlainId)
      // the shim checked the registry subject Wr.address (a default wallet's controlled address)
      await enterVia(Wr, mayPlugin, pool, [addressBytes(addr(Wr))], 'm')
      expect(await pool.getStoredPrincipal({ address: Em })).toEqual({ wallet: 0n, principal: Em })
      expect((await entryOf(pool, Em)).legacyCharged).toBe(true)

      // without the fallback the subject would be Em and the stored args (Wr.address) would fail
      await gateCheckBy(pool, Em)
      expect((await entryOf(pool, Em)).disqualified).toBe(false)
    })

    test('a legacy-shim entrant with no registry wallet is still re-checked as itself (the fallback needs a wallet that owns it at rest)', async () => {
      // a plain account enters through the legacy shim as itself, then a third party re-checks it
      const pool = await livePool(gatePlainId)
      const eoa = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const gateTxn = await universe.gate.client.params.mustCheck({
        ...send(eoa),
        args: { caller: eoa.addr.toString(), gateId: gatePlainId, args: [addressBytes(eoa.addr.toString())] },
        maxFee: GATE_TXN_MAX_FEE,
      })
      await pool.enter({ ...send(eoa), entries: [{ asset: 0n, amount: 1n }], gateTxn })
      expect((await entryOf(pool, eoa.addr.toString())).legacyCharged).toBe(true)
      await gateCheckBy(pool, eoa.addr.toString())
      expect((await entryOf(pool, eoa.addr.toString())).disqualified).toBe(false)
      expect(await pool.getStoredPrincipal({ address: eoa.addr.toString() })).toEqual({ wallet: 0n, principal: eoa.addr.toString() })
    })
  })

  describe('legacy gatedEnter shim and reward reserves (Q14)', () => {
    test('a flat-charged legacy entry whose gate args cost more than the flat MBR cannot use ALGO reserved for rewards', async () => {
      // a fresh child holds exactly its minimum balance: after the reward, every ALGO above it is reserved
      const pool = await universe.stakingPoolFactory.new({
        ...send(deployer),
        title: 'reserved pool',
        type: NONE_POOL,
        marketplace: deployer.addr.toString(),
        stakeKey: ZERO_KEY,
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: gatePlainId,
        maxEntries: 0n,
      })
      const budget = 2_000_000n
      const rewardCost = await pool.getAddRewardCost({ winnerCount: 0n, asset: 0n })
      const rewardPayment = await algorand.createTransaction.payment({
        sender: deployer.addr, receiver: pool.client.appAddress, amount: microAlgo(rewardCost + budget),
      })
      await pool.client.send.addReward({
        ...send(deployer),
        args: {
          payment: rewardPayment,
          reward: { asset: 0n, distribution: DISTRIBUTION_FLAT, rate: 100_000n, expiration: 7n * ONE_DAY, interval: ONE_DAY, winnerCount: 0n },
        },
      })
      await pool.finalize({ ...send(deployer), signupTimestamp: 0n, startTimestamp: 0n, endTimestamp: (await blockTimestamp()) + ONE_DAY })
      expect(await pool.getRewardBudget(1n)).toBe(budget)

      // 32-byte gate arg: entries box 2,500 + 400 * (60 + 38) = 41,700; exact pair 63,800 vs flat 50,600
      const args = [addressBytes(user.addr.toString())]
      const shortfall = stakingPoolEntryMbr(args) + STAKING_POOL_ENTRY_BY_ADDRESS_MBR - FLAT_ENTRY_MBR
      expect(shortfall).toBe(13_200n)
      expect(await pool.getFreeFunds(0n)).toBeLessThan(shortfall)

      const legacyEnter = async () => {
        const gateTxn = await universe.gate.client.params.mustCheck({
          ...send(user),
          args: { caller: user.addr.toString(), gateId: gatePlainId, args },
          maxFee: GATE_TXN_MAX_FEE,
        })
        // the SDK sends a mustCheck gate txn to the legacy shim and pays the legacy (flat) quote
        await pool.enter({ ...send(user), entries: [{ asset: 0n, amount: 1n }], gateTxn })
      }
      await expect(legacyEnter()).rejects.toThrow(new RegExp(errNotEnoughFunds))
      expect(await pool.isEntered({ address: user.addr.toString() })).toBe(false)

      // with free ALGO to cover the shortfall the same legacy entry succeeds and the reserve stays covered
      await algorand.send.payment({ ...send(deployer), receiver: pool.client.appAddress, amount: microAlgo(shortfall) })
      await legacyEnter()
      expect((await entryOf(pool, user.addr.toString())).legacyCharged).toBe(true)
      const poolAddress = pool.client.appAddress.toString()
      expect((await balance(poolAddress)) - (await minBalance(poolAddress))).toBeGreaterThanOrEqual(budget)
      expect(await pool.getRewardBudget(1n)).toBe(budget)
    })

    test('the hinted path pays the exact charge, so long gate args need no free ALGO', async () => {
      const pool = await universe.stakingPoolFactory.new({
        ...send(deployer),
        title: 'exact-charge pool',
        type: NONE_POOL,
        marketplace: deployer.addr.toString(),
        stakeKey: ZERO_KEY,
        minimumStakeAmount: 0n,
        allowLateSignups: true,
        gateId: gatePlainId,
        maxEntries: 0n,
      })
      await pool.finalize({ ...send(deployer), signupTimestamp: 0n, startTimestamp: 0n, endTimestamp: (await blockTimestamp()) + ONE_DAY })
      expect(await pool.getFreeFunds(0n)).toBe(0n)
      const eoa = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const ctx: Ctx = { principal: eoa.addr.toString(), wallet: 0n, spender: eoa.addr.toString() }
      const gateTxn = await universe.gate.client.params.mustCheckFor({
        ...send(eoa),
        args: { ctx, gateId: gatePlainId, args: [addressBytes(eoa.addr.toString())] },
        maxFee: GATE_TXN_MAX_FEE,
      })
      await pool.enter({ ...send(eoa), entries: [{ asset: 0n, amount: 1n }], gateTxn, wallet: 0n })
      expect((await entryOf(pool, eoa.addr.toString())).legacyCharged).toBe(false)
    })
  })

  describe('new plugin on an old child (P2-REF-02)', () => {
    let restore = async () => {}

    /** Push `program` as the universe factory's child through the DAO (update plugin + proposal). */
    const pushChild = async (program: Uint8Array, version: string) => {
      const sender = deployer.addr.toString()
      const signer = deployer.signer
      const dao = new AkitaDaoSDK({ algorand, factoryParams: { appId: universe.dao.appId, defaultSender: sender, defaultSigner: signer } })
      await dao.getWallet()
      const daoWallet = dao.wallet
      await dao.client.appClient.fundAppAccount({ amount: microAlgo(1_000_000n) })
      const programMbr = 2_500n + 400n * (2n + BigInt(program.length))
      await algorand.account.ensureFunded(universe.updatePlugin.client.appAddress, dispenser.addr, microAlgo(programMbr))
      await universe.stakingPoolFactory.client.appClient.fundAppAccount({ amount: microAlgo(programMbr) })
      const execution = await daoWallet.build.usePlugin({
        sender, signer, lease: `spool_${version}_${Date.now() % 1_000_000}`, windowSize: 2000n, callerType: CallerType.Global,
        calls: [universe.updatePlugin.updateFactoryChildContract({
          sender, signer, factoryAppId: universe.stakingPoolFactory.appId, version, data: program,
        })],
      })
      const walletMbr = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
      await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(walletMbr.plugins + walletMbr.executions + 2_000_000n) })
      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.UpgradeApp, app: universe.stakingPoolFactory.appId,
        executionKey: execution.lease, groups: execution.ids,
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      }])
      for (const window of execution.windows) await sendPrepared(window, algorand.client.algod)
    }

    afterAll(async () => restore())

    test('the new plugin uses the legacy ABI (enterCost/gatedEnter, Gate.mustCheck, registry subject) on a child without pv', async () => {
      const current = await algorand.client.getTypedAppFactory(StakingPoolAppFactory, { defaultSender: deployer.addr, defaultSigner: deployer.signer })
        .appFactory.compile()
      await pushChild(Buffer.from(DEPLOYED_STAKING_POOL_CHILD.approval, 'base64'), 'mainnet-child')
      restore = async () => pushChild(current.approvalProgram, 'current-child')

      const oldUngated = await livePool(0n)
      const oldGated = await livePool(gatePlainId)
      expect(await oldGated.client.state.global.principalVersion().catch(() => undefined)).toBeUndefined()
      expect(await oldGated.isHintedPool()).toBe(false)

      // ungated: legacy enterCost + enter, default window of an unregistered wallet
      await enterVia(Wd, plugin, oldUngated, [])
      expect(await oldUngated.isEntered({ address: addr(Wd) })).toBe(true)

      // gated, escrow window of an unregistered wallet: the old child's registry subject is E itself
      await enterVia(Wd, plugin, oldGated, [addressBytes(Ed)], 'e')
      expect(await oldGated.isEntered({ address: Ed })).toBe(true)

      await restore()
      restore = async () => {}
      expect(await (await livePool(0n)).isHintedPool()).toBe(true)
    })
  })
})
