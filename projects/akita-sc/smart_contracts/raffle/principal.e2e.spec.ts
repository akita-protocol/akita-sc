import { Config, microAlgo, type AlgorandClient } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import type { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer'
import algosdk, { ABIMethod, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { RaffleSDK, raffleDirectGateCtx } from 'akita-sdk/raffle'
import { RAFFLE_PLUGIN_NEW_RAFFLE, RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES } from 'akita-sdk/wallet'
import { CallerType, newWallet, WalletSDK } from 'akita-sdk/wallet'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { addRawPlugin, assertUnregistered, newUnregisteredWallet } from '../../tests/fixtures/unregistered-wallet'
import { TimeWarp } from '../../tests/utils/time'
import { RafflePluginClient, RafflePluginFactory } from '../artifacts/arc58/plugins/raffle/RafflePluginClient'
import { RaffleClient } from '../artifacts/raffle/RaffleClient'
import { RaffleFactoryClient } from '../artifacts/raffle/RaffleFactoryClient'
import { MockRandomnessBeaconFactory } from '../artifacts/utils/types/MockRandomnessBeaconClient'
import { DEPLOYED_NEW_PRIZE_BOX_RAFFLE, DEPLOYED_NEW_RAFFLE, deployedRaffleCost, deployLegacyRaffleFactory } from './compat/deployed'

/**
 * Raffle principal resolution (docs/principal-resolution/PHASE-0-SPEC.md §6.8, §7.2, §7.5).
 *
 * - The factory verifies the seller's wallet hint and stores `seller_referrer`; `claimRafflePrize` pays it.
 *   The factory has NO legacy creation shims (Kyle decision K6, 2026-10-04): the DEPLOYED creation selectors
 *   (no `minEntries`, no hint) are not routed, so a deployed-era caller fails with `err` and creates nothing.
 * - P2-RAF-01: the old-ABI gated methods work on a new child. Every gated entry point calls a private
 *   `xImpl(..., gated)`; the outer-selector compares are gone, so the ungated methods still refuse gated
 *   raffles (`errBmgn`) and the shims are not rejected.
 * - Hinted gated methods pin `Gate.mustCheckFor(ctx)`; the v3 plugin also serves DEPLOYED children (no
 *   `seller_referrer`), which gate on `Txn.sender` (P2-REF-02).
 */

Config.configure({ populateAppCallResources: true })

const ONE_DAY = 86_400n
const FEE = microAlgo(40_000)
const EMPTY_ARG = new Uint8Array()

describe('Raffle principal resolution (§6.8)', () => {
  const fixture = algorandFixture()

  let algorand: AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  let gate: GateSDK
  let plugin: RafflePluginClient
  let timeWarp: TimeWarp

  let R1: string
  let R2: string
  let Wd: WalletSDK
  let Wo: WalletSDK
  let Wr: WalletSDK
  let gateR1: bigint
  let gateAll: bigint

  const send = (a: TransactionSignerAccount) => ({ sender: a.addr, signer: a.signer })

  const blockTimestamp = async (): Promise<bigint> => {
    const status = await algorand.client.algod.status().do()
    return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp)
  }

  const createdApps = async (creator: string): Promise<Set<bigint>> => {
    const info = await algorand.client.algod.accountInformation(creator).do()
    return new Set((info.createdApps ?? []).map((app) => BigInt(app.id)))
  }

  const newestApp = async (creator: string, before: Set<bigint>): Promise<bigint> => {
    const id = [...(await createdApps(creator))].find((app) => !before.has(app))
    expect(id).toBeDefined()
    return id!
  }

  const sellerReferrerOf = async (appId: bigint): Promise<string | undefined> => {
    const state = await algorand.app.getGlobalState(appId)
    const value = state['seller_referrer']
    return value && 'valueRaw' in value ? algosdk.encodeAddress(value.valueRaw) : undefined
  }

  const raffleSdk = (appId: bigint) => new RaffleSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })

  /** [wallet.arc58_rekeyToPlugin(pluginId, escrow), ...calls, wallet.arc58_verifyAuthAddress] (a global grant) */
  async function inWindow(wallet: WalletSDK, pluginId: bigint, calls: AppCallMethodCall[], escrow = ''): Promise<void> {
    const group = algorand.newGroup()
    group.addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({
      ...send(deployer),
      args: { plugin: pluginId, type: CallerType.Global, escrow, methodOffsets: [], fundsRequest: [] },
      extraFee: microAlgo(2_000),
    }))
    for (const call of calls) group.addAppCallMethodCall(call)
    group.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ ...send(deployer), args: {} }))
    await group.send({ populateAppCallResources: true })
  }

  /** opts a raffle factory into `asset` (the first call also opts the DAO escrow and splits in) */
  async function factoryOptIn(appId: bigint, asset: bigint): Promise<void> {
    const client = algorand.client.getTypedAppClientById(RaffleFactoryClient, { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer })
    const cost = await client.optInCost({ args: { asset } })
    const group = client.newGroup()
    group.optIn({
      ...send(deployer),
      args: { payment: await algorand.createTransaction.payment({ ...send(deployer), receiver: client.appAddress, amount: microAlgo(cost) }), asset },
      maxFee: microAlgo(50_000),
    })
    group.opUp({ ...send(deployer), args: {}, maxFee: microAlgo(50_000) })
    await group.send({ coverAppCallInnerTransactionFees: true })
  }

  async function prizeFor(holder?: WalletSDK): Promise<bigint> {
    const { assetId } = await algorand.send.assetCreate({ ...send(deployer), total: 10n, decimals: 0, assetName: 'Principal Raffle Prize', unitName: 'PRP' })
    const prize = BigInt(assetId!)
    await factoryOptIn(universe.raffleFactory.appId, prize)
    if (holder) {
      await holder.usePlugin({ ...send(deployer), callerType: CallerType.Global, consolidateFees: true, calls: [universe.optInPlugin.optIn({ assets: [prize] })] })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: prize, amount: 1n, receiver: holder.client.appAddress })
    }
    return prize
  }

  /** a live ALGO-ticket raffle created directly by the deployer (hinted creation, wallet 0) */
  async function eoaRaffle(gateId: bigint, ticketAsset = 0n): Promise<RaffleSDK> {
    const prize = await prizeFor()
    const now = await blockTimestamp()
    return universe.raffleFactory.newRaffle({
      ...send(deployer), prizeAsset: prize, prizeAmount: 1n, ticketAsset, startTimestamp: now, endTimestamp: now + ONE_DAY,
      minTickets: 1_000_000n, maxTickets: 100_000_000n, gateId, marketplace: deployer.addr.toString(), name: '', proof: [], weightsListCount: 4n,
    })
  }

  async function walletWith(referrer: string, register: boolean, nickname: string): Promise<WalletSDK> {
    const w = register
      ? await newWallet({
        algorand,
        factoryParams: { appId: universe.walletFactory.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
        ...send(deployer), nickname, referrer, register: true,
      })
      : await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(deployer), referrer, nickname })
    await algorand.send.payment({ ...send(deployer), receiver: w.client.appAddress, amount: (200).algo() })
    await w.addPlugin({ ...send(deployer), client: universe.optInPlugin, callerType: CallerType.Global })
    await w.addPlugin({ ...send(deployer), client: universe.rafflePlugin, callerType: CallerType.Global })
    return w
  }

  const v3Enter = (w: WalletSDK, appId: bigint, amount: bigint, via = plugin) => via.params.enter({
    ...send(deployer),
    args: { wallet: w.client.appId, rekeyBack: true, appId, amount, marketplace: deployer.addr.toString(), args: [EMPTY_ARG] },
    extraFee: FEE,
  })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    timeWarp = new TimeWarp(algorand)
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (10).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (5_000).algo())

    const { appClient: beacon } = await algorand.client.getTypedAppFactory(MockRandomnessBeaconFactory, {
      defaultSender: deployer.addr, defaultSigner: deployer.signer,
    }).send.create.bare()
    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: { vrfBeacon: beacon.appId } })
    await algorand.account.ensureFunded(universe.raffleFactory.client.appAddress, dispenser.addr, (100).algo())

    plugin = algorand.client.getTypedAppClientById(RafflePluginClient, {
      appId: universe.rafflePlugin.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer,
    })
    gate = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      gateRegistry: { asset: universe.subgates.assetGate.appId, akita_referrer: universe.subgates.akitaReferrerGate.appId },
    })

    R1 = (await fixture.context.generateAccount({ initialFunds: (1).algo() })).addr.toString()
    R2 = (await fixture.context.generateAccount({ initialFunds: (1).algo() })).addr.toString()
    gateR1 = (await gate.register({
      ...send(deployer),
      args: [{ type: 'akita_referrer', appId: universe.subgates.akitaReferrerGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, referrer: R1 }],
    })).return!
    gateAll = (await gate.register({
      ...send(deployer),
      args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: 0n, op: Operator.GreaterThanOrEqualTo, value: 0n }],
    })).return!

    Wd = await walletWith(R1, false, 'raffle-wd')
    Wo = await walletWith(R2, false, 'raffle-wo')
    Wr = await walletWith(R2, true, 'raffle-wr')
  })

  describe('creation: seller_referrer', () => {
    test('§6.8: the v3 plugin hints its window; the factory stores the verified referrer (no registry anywhere)', async () => {
      const prize = await prizeFor(Wd)
      const factory = universe.raffleFactory.client.appAddress.toString()
      const before = await createdApps(factory)
      const now = await blockTimestamp()
      await Wd.usePlugin({
        ...send(deployer),
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [universe.rafflePlugin.newRaffle({
          prizeId: prize, prizeAmount: 1n, ticketAssetId: 0n, startTimestamp: now, endTimestamp: now + ONE_DAY,
          minTickets: 1_000_000n, maxTickets: 100_000_000n, minEntries: 0n, gateId: 0n,
          marketplace: deployer.addr.toString(), name: '', proof: [], weightsListCount: 4n,
        })],
      })
      const appId = await newestApp(factory, before)
      expect(await sellerReferrerOf(appId)).toBe(R1)
      expect(await raffleSdk(appId).sellerReferrer()).toBe(R1)
      expect((await raffleSdk(appId).state()).seller).toBe(Wd.client.appAddress.toString())
      await assertUnregistered(universe.escrowFactory, [Wd.client.appAddress])
    })

    test('a direct (EOA) creation stores the zero address; a wallet hint at top level reverts (errHtop)', async () => {
      const raffle = await eoaRaffle(0n)
      expect(await sellerReferrerOf(raffle.client.appId)).toBe(ALGORAND_ZERO_ADDRESS_STRING)
      expect(await raffle.usesPrincipalAbi()).toBe(true)

      const prize = await prizeFor()
      const now = await blockTimestamp()
      await expect(universe.raffleFactory.newRaffle({
        ...send(deployer), prizeAsset: prize, prizeAmount: 1n, ticketAsset: 0n, startTimestamp: now, endTimestamp: now + ONE_DAY,
        minTickets: 1n, maxTickets: 10n, gateId: 0n, marketplace: deployer.addr.toString(), name: '', proof: [], weightsListCount: 4n,
        wallet: Wd.client.appId,
      })).rejects.toThrow(/errHtop/)
    })

    test('K6: the DEPLOYED creation selectors have no route on the new factory (err opcode); nothing is created', async () => {
      const prize = await prizeFor()
      const factory = universe.raffleFactory.client.appAddress.toString()
      const before = await createdApps(factory)
      // even the exact current quote does not help: the failure is the missing route, not the amount
      const cost = await universe.raffleFactory.cost({ prizeId: prize, weightsListCount: 4n })
      const now = await blockTimestamp()
      await expect(algorand.send.appCallMethodCall({
        ...send(deployer),
        appId: universe.raffleFactory.appId,
        method: ABIMethod.fromSignature(DEPLOYED_NEW_RAFFLE),
        args: [
          await algorand.createTransaction.payment({ ...send(deployer), receiver: factory, amount: microAlgo(cost) }),
          await algorand.createTransaction.assetTransfer({ ...send(deployer), receiver: factory, assetId: prize, amount: 1n }),
          0n, now, now + ONE_DAY, 1_000_000n, 100_000_000n, 0n, deployer.addr.toString(), '', [], 4n,
        ],
        extraFee: FEE,
      })).rejects.toThrow(/err opcode executed/)
      // the deployed prize-box selector: the router rejects it before any argument is read
      await expect(algorand.send.appCall({
        ...send(deployer),
        appId: universe.raffleFactory.appId,
        args: [ABIMethod.fromSignature(DEPLOYED_NEW_PRIZE_BOX_RAFFLE).getSelector()],
      })).rejects.toThrow(/err opcode executed/)
      expect(await createdApps(factory)).toEqual(before)
    })
  })

  describe('P2-RAF-01: old-ABI gated methods on a new child', () => {
    test('legacy gatedEnter and gatedAdd pass (no errBmgn); the subject is the registry origin (an EOA: itself)', async () => {
      const raffle = await eoaRaffle(gateAll)
      const entrant = await fixture.context.generateAccount({ initialFunds: (30).algo() })
      const { entries, entriesByAddress } = await raffle.mbr()
      const mustCheck = (caller: string) => gate.build.mustCheck({ ...send(entrant), caller, gateId: gateAll, args: [{ type: 'asset' }] })
      const pay = async (amount: bigint) => algorand.createTransaction.payment({ ...send(entrant), receiver: raffle.client.appAddress, amount: microAlgo(amount) })

      // a gate txn for another caller is rejected by the shim (it still checks the registry subject)
      const other = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      await expect(raffle.client.send.gatedEnterApplPayAddressVoid({
        ...send(entrant), args: { gateTxn: await mustCheck(other.addr.toString()), payment: await pay(2_000_000n + entries + entriesByAddress), marketplace: deployer.addr.toString() }, extraFee: FEE,
      })).rejects.toThrow(/errFgte/)

      await raffle.client.send.gatedEnterApplPayAddressVoid({
        ...send(entrant), args: { gateTxn: await mustCheck(entrant.addr.toString()), payment: await pay(2_000_000n + entries + entriesByAddress), marketplace: deployer.addr.toString() }, extraFee: FEE,
      })
      await raffle.client.send.gatedAddApplPayVoid({
        ...send(entrant), args: { gateTxn: await mustCheck(entrant.addr.toString()), payment: await pay(1_000_000n) }, extraFee: FEE,
      })
      expect(await raffle.isEntered({ address: entrant.addr.toString() })).toBe(true)
      expect((await raffle.state()).ticketCount).toBe(3_000_000n)
    })

    test('legacy gatedEnterAsa and gatedAddAsa pass on an ASA-ticket child', async () => {
      const { assetId } = await algorand.send.assetCreate({ ...send(deployer), total: 1_000_000_000n, decimals: 0, assetName: 'Ticket', unitName: 'TKT' })
      const ticket = BigInt(assetId!)
      await factoryOptIn(universe.raffleFactory.appId, ticket)
      const raffle = await eoaRaffle(gateAll, ticket)
      const entrant = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      await algorand.send.assetOptIn({ ...send(entrant), assetId: ticket })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: ticket, amount: 10_000_000n, receiver: entrant.addr })
      const { entries, entriesByAddress } = await raffle.mbr()
      const mustCheck = () => gate.build.mustCheck({ ...send(entrant), caller: entrant.addr.toString(), gateId: gateAll, args: [{ type: 'asset' }] })
      const xfer = async (amount: bigint) => algorand.createTransaction.assetTransfer({ ...send(entrant), receiver: raffle.client.appAddress, assetId: ticket, amount })

      await raffle.client.send.gatedEnterAsaApplPayAxferAddressVoid({
        ...send(entrant),
        args: {
          gateTxn: await mustCheck(),
          payment: await algorand.createTransaction.payment({ ...send(entrant), receiver: raffle.client.appAddress, amount: microAlgo(entries + entriesByAddress) }),
          assetXfer: await xfer(2_000_000n),
          marketplace: deployer.addr.toString(),
        },
        extraFee: FEE,
      })
      await raffle.client.send.gatedAddAsaApplAxferVoid({ ...send(entrant), args: { gateTxn: await mustCheck(), assetXfer: await xfer(1_000_000n) }, extraFee: FEE })
      expect((await raffle.state()).ticketCount).toBe(3_000_000n)
    })

    test('the ungated methods still refuse a gated raffle (errBmgn)', async () => {
      const raffle = await eoaRaffle(gateAll)
      const entrant = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      await expect(raffle.enter({ ...send(entrant), amount: 1_000_000n, marketplace: deployer.addr.toString() })).rejects.toThrow(/errBmgn/)
    })
  })

  describe('hinted gated methods (principal ABI)', () => {
    test('the v3 plugin enters and adds with Gate.mustCheckFor(window ctx): referred by R1 passes, others fail', async () => {
      const raffle = await eoaRaffle(gateR1)
      await inWindow(Wd, plugin.appId, [await v3Enter(Wd, raffle.client.appId, 2_000_000n)])
      await inWindow(Wd, plugin.appId, [await plugin.params.add({
        ...send(deployer),
        args: { wallet: Wd.client.appId, rekeyBack: true, appId: raffle.client.appId, amount: 1_000_000n, args: [EMPTY_ARG] },
        extraFee: FEE,
      })])
      expect((await raffle.getEntryWithTicketsByAddress({ address: Wd.client.appAddress.toString() })).ticketCount).toBe(3_000_000n)
      await expect(inWindow(Wo, plugin.appId, [await v3Enter(Wo, raffle.client.appId, 2_000_000n)])).rejects.toThrow(/errFgte/)
      await assertUnregistered(universe.escrowFactory, [Wd.client.appAddress])
    })

    test('direct hinted entry: only the verified context passes the target (P2-GATE-03 at the target)', async () => {
      const raffle = await eoaRaffle(gateAll)
      const entrant = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const other = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const gateTxn = (principal: string) =>
        gate.build.mustCheckFor({ ...send(entrant), ctx: raffleDirectGateCtx(principal), gateId: gateAll, args: [{ type: 'asset' }] })

      await expect(raffle.enter({ ...send(entrant), amount: 1_000_000n, marketplace: deployer.addr.toString(), gateTxn: await gateTxn(other.addr.toString()) }))
        .rejects.toThrow(/errFgte/)
      await raffle.enter({ ...send(entrant), amount: 1_000_000n, marketplace: deployer.addr.toString(), gateTxn: await gateTxn(entrant.addr.toString()) })
      await raffle.add({ ...send(entrant), amount: 500_000n, gateTxn: await gateTxn(entrant.addr.toString()) })
      expect((await raffle.state()).ticketCount).toBe(1_500_000n)
    })
  })

  describe('S != C: gated entries from escrow windows and external controlled addresses (v3 plugin)', () => {
    /**
     * The gate is an asset gate on BADGE (plain sub-gate: it evaluates ctx.principal). Only principals hold
     * BADGE; no spending escrow does, except Ne's (the negative case). So a pass proves the gate saw the
     * principal C, and Wn's failure proves it never saw the spender S.
     *
     * - Wb: default wallet (R1); named escrow 'e' = Eb (E4: S = Eb, principal = Wb.address via auth(Wb.address) == 0)
     * - Wx: external controlled C (holds BADGE, rekeyed to Wx.address); default window S = C; escrow 'e' = Ex
     *   (S = Ex, principal = C via auth(C) == Wx.address)
     * - Wn: default wallet WITHOUT BADGE; its escrow 'e' = Ne holds BADGE
     */
    let badge: bigint
    let ticket: bigint
    let gateBadge: bigint
    let Wb: WalletSDK
    let Wx: WalletSDK
    let Wn: WalletSDK
    let C: string
    let Eb: string
    let Ex: string
    let Ne: string

    const escrowOf = async (w: WalletSDK, name: string) => (await w.client.state.box.escrows.value(name))!.address
    const hasBadge = async (account: string) =>
      algorand.asset.getAccountInformation(account, badge).then((h) => h.balance > 0n, () => false)

    const v3EnterArgs = (w: WalletSDK, appId: bigint, amount: bigint) => plugin.params.enter({
      ...send(deployer),
      args: { wallet: w.client.appId, rekeyBack: true, appId, amount, marketplace: deployer.addr.toString(), args: [EMPTY_ARG] },
      extraFee: FEE,
    })
    const v3AddArgs = (w: WalletSDK, appId: bigint, amount: bigint) => plugin.params.add({
      ...send(deployer),
      args: { wallet: w.client.appId, rekeyBack: true, appId, amount, args: [EMPTY_ARG] },
      extraFee: FEE,
    })

    /** global grants of the raffle and opt-in plugins on `w`'s escrow 'e'; funds and opts the escrow into `assets` */
    async function escrowE(w: WalletSDK, assets: bigint[]): Promise<string> {
      await w.addPlugin({ ...send(deployer), client: universe.rafflePlugin, callerType: CallerType.Global, escrow: 'e' })
      await w.addPlugin({ ...send(deployer), client: universe.optInPlugin, callerType: CallerType.Global, escrow: 'e' })
      const E = await escrowOf(w, 'e')
      await algorand.send.payment({ ...send(deployer), receiver: E, amount: (30).algo() })
      if (assets.length > 0) {
        await w.usePlugin({ ...send(deployer), callerType: CallerType.Global, escrow: 'e', consolidateFees: true, calls: [universe.optInPlugin.optIn({ assets })] })
      }
      return E
    }

    beforeAll(async () => {
      const mk = async (name: string) => BigInt((await algorand.send.assetCreate({ ...send(deployer), total: 1_000_000_000n, decimals: 0, assetName: name, unitName: name.slice(0, 4).toUpperCase() })).assetId!)
      badge = await mk('Badge')
      ticket = await mk('Ticket')
      await factoryOptIn(universe.raffleFactory.appId, ticket)
      gateBadge = (await gate.register({
        ...send(deployer),
        args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: badge, op: Operator.GreaterThanOrEqualTo, value: 1n }],
      })).return!

      Wb = await walletWith(R1, false, 'raffle-sc-b')
      await Wb.usePlugin({ ...send(deployer), callerType: CallerType.Global, consolidateFees: true, calls: [universe.optInPlugin.optIn({ assets: [badge] })] })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: badge, amount: 1n, receiver: Wb.client.appAddress })
      Eb = await escrowE(Wb, [ticket])
      await algorand.send.assetTransfer({ ...send(deployer), assetId: ticket, amount: 10_000_000n, receiver: Eb })

      // external C: opted in and holding BADGE before the factory rekeys it to Wx.address (SG-04 controlledSigner path)
      const c = await fixture.context.generateAccount({ initialFunds: (40).algo() })
      C = c.addr.toString()
      await algorand.send.assetOptIn({ ...send(c), assetId: badge })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: badge, amount: 1n, receiver: C })
      Wx = await newUnregisteredWallet({
        walletFactory: universe.walletFactory, ...send(deployer), referrer: R1, nickname: 'raffle-sc-x',
        controlledAddress: C, controlledSigner: c.signer, fund: (2).algo(),
      })
      await Wx.addPlugin({ ...send(deployer), client: universe.rafflePlugin, callerType: CallerType.Global })
      Ex = await escrowE(Wx, [])

      Wn = await walletWith(R1, false, 'raffle-sc-n')
      Ne = await escrowE(Wn, [badge])
      await algorand.send.assetTransfer({ ...send(deployer), assetId: badge, amount: 1n, receiver: Ne })

      for (const [account, holds] of [[Wb.client.appAddress.toString(), true], [C, true], [Eb, false], [Ex, false], [Wn.client.appAddress.toString(), false], [Ne, true]] as const) {
        expect(await hasBadge(account), account).toBe(holds)
      }
    })

    test('E4: a named-escrow window enters and adds; the gate saw principal Wb.address (the escrow holds no badge)', async () => {
      const raffle = await eoaRaffle(gateBadge)
      await inWindow(Wb, plugin.appId, [await v3EnterArgs(Wb, raffle.client.appId, 2_000_000n)], 'e')
      await inWindow(Wb, plugin.appId, [await v3AddArgs(Wb, raffle.client.appId, 1_000_000n)], 'e')
      // state stays keyed by the spender (Q5): the escrow holds the entry
      expect((await raffle.getEntryWithTicketsByAddress({ address: Eb })).ticketCount).toBe(3_000_000n)
      expect(await raffle.isEntered({ address: Wb.client.appAddress.toString() })).toBe(false)
      await assertUnregistered(universe.escrowFactory, [Wb.client.appAddress, Eb])
    })

    test('E4 + ASA tickets: hinted gatedEnterAsa / gatedAddAsa from the escrow window', async () => {
      const raffle = await eoaRaffle(gateBadge, ticket)
      const before = (await algorand.asset.getAccountInformation(Eb, ticket)).balance
      await inWindow(Wb, plugin.appId, [await v3EnterArgs(Wb, raffle.client.appId, 2_000_000n)], 'e')
      await inWindow(Wb, plugin.appId, [await v3AddArgs(Wb, raffle.client.appId, 1_000_000n)], 'e')
      expect((await raffle.getEntryWithTicketsByAddress({ address: Eb })).ticketCount).toBe(3_000_000n)
      expect(before - (await algorand.asset.getAccountInformation(Eb, ticket)).balance).toBe(3_000_000n)
    })

    test('external C: the default window (S = C) and the escrow window (S = Ex, principal C) both pass the badge gate', async () => {
      const raffle = await eoaRaffle(gateBadge)
      await inWindow(Wx, plugin.appId, [await v3EnterArgs(Wx, raffle.client.appId, 1_000_000n)])
      await inWindow(Wx, plugin.appId, [await v3EnterArgs(Wx, raffle.client.appId, 2_000_000n)], 'e')
      expect((await raffle.getEntryWithTicketsByAddress({ address: C })).ticketCount).toBe(1_000_000n)
      expect((await raffle.getEntryWithTicketsByAddress({ address: Ex })).ticketCount).toBe(2_000_000n)
      await assertUnregistered(universe.escrowFactory, [Wx.client.appAddress, C, Ex])
    })

    test('the gate never sees the spender: Wn\'s escrow holds the badge, Wn.address does not → errFgte', async () => {
      const raffle = await eoaRaffle(gateBadge)
      await expect(inWindow(Wn, plugin.appId, [await v3EnterArgs(Wn, raffle.client.appId, 1_000_000n)], 'e')).rejects.toThrow(/errFgte/)
    })
  })

  describe('P2-GATE-03 at the target: every ctx field is pinned', () => {
    test('a ctx with the right principal but a different wallet, or a different spender, fails (errFgte)', async () => {
      const raffle = await eoaRaffle(gateAll)
      const entrant = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const other = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const me = entrant.addr.toString()
      const gateTxn = (ctx: { principal: string; wallet: bigint; spender: string }) =>
        gate.build.mustCheckFor({ ...send(entrant), ctx, gateId: gateAll, args: [{ type: 'asset' }] })
      const enter = async (ctx: { principal: string; wallet: bigint; spender: string }) =>
        raffle.enter({ ...send(entrant), amount: 1_000_000n, marketplace: deployer.addr.toString(), gateTxn: await gateTxn(ctx) })

      await expect(enter({ principal: me, wallet: Wd.client.appId, spender: me })).rejects.toThrow(/errFgte/)
      await expect(enter({ principal: me, wallet: 0n, spender: other.addr.toString() })).rejects.toThrow(/errFgte/)
      await enter(raffleDirectGateCtx(me))
      expect(await raffle.isEntered({ address: me })).toBe(true)
      await expect(raffle.add({ ...send(entrant), amount: 500_000n, gateTxn: await gateTxn({ principal: me, wallet: Wd.client.appId, spender: me }) }))
        .rejects.toThrow(/errFgte/)
      await raffle.add({ ...send(entrant), amount: 500_000n, gateTxn: await gateTxn(raffleDirectGateCtx(me)) })
      expect((await raffle.state()).ticketCount).toBe(1_500_000n)
    })
  })

  describe('§6.11 / §7.3: a grant restricted to the DEPLOYED newRaffle selector carries over to the v3 plugin', () => {
    test('the deployed 14-argument newRaffle passes the restriction (minEntries = 0); the minEntries overload does not', async () => {
      const w = await newUnregisteredWallet({ walletFactory: universe.walletFactory, ...send(deployer), referrer: R1, nickname: 'raffle-restricted' })
      await algorand.send.payment({ ...send(deployer), receiver: w.client.appAddress, amount: (200).algo() })
      await w.addPlugin({ ...send(deployer), client: universe.optInPlugin, callerType: CallerType.Global })
      // the selector a pre-Phase-3 grant of MainNet RafflePlugin 3569561863 holds
      const deployedSelector = ABIMethod.fromSignature(RAFFLE_PLUGIN_NEW_RAFFLE).getSelector()
      await w.addPlugin({ ...send(deployer), client: universe.rafflePlugin, callerType: CallerType.Global, methods: [{ name: [deployedSelector], cooldown: 0n }] })
      const prize = await prizeFor(w)
      const factory = universe.raffleFactory.client.appAddress.toString()
      const before = await createdApps(factory)
      const now = await blockTimestamp()
      const params = {
        prizeId: prize, prizeAmount: 1n, ticketAssetId: 0n, startTimestamp: now, endTimestamp: now + ONE_DAY,
        minTickets: 1_000_000n, maxTickets: 100_000_000n, gateId: 0n, marketplace: deployer.addr.toString(), name: '', proof: [], weightsListCount: 4n,
      }
      await expect(w.usePlugin({ ...send(deployer), callerType: CallerType.Global, consolidateFees: true, calls: [universe.rafflePlugin.newRaffle({ ...params, minEntries: 2n })] }))
        .rejects.toThrow(/selector does not match any allowed method/)
      await w.usePlugin({ ...send(deployer), callerType: CallerType.Global, consolidateFees: true, calls: [universe.rafflePlugin.newRaffle(params)] })
      const appId = await newestApp(factory, before)
      expect(await sellerReferrerOf(appId)).toBe(R1)
      expect((await raffleSdk(appId).state()).minEntries).toBe(0n)
      expect(ABIMethod.fromSignature(RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES).getSelector()).not.toEqual(deployedSelector)
    })
  })

  describe('settlement pays seller_referrer', () => {
    test('claimRafflePrize pays the creation-time referrer of the seller, whoever settles', async () => {
      const prize = await prizeFor(Wd)
      const factory = universe.raffleFactory.client.appAddress.toString()
      const before = await createdApps(factory)
      const now = await blockTimestamp()
      await Wd.usePlugin({
        ...send(deployer),
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [universe.rafflePlugin.newRaffle({
          prizeId: prize, prizeAmount: 1n, ticketAssetId: 0n, startTimestamp: now, endTimestamp: now + 3_600n,
          minTickets: 1_000_000n, maxTickets: 100_000_000n, minEntries: 0n, gateId: 0n,
          marketplace: deployer.addr.toString(), name: '', proof: [], weightsListCount: 4n,
        })],
      })
      const raffle = raffleSdk(await newestApp(factory, before))
      const [p1, p2] = [await fixture.context.generateAccount({ initialFunds: (30).algo() }), await fixture.context.generateAccount({ initialFunds: (30).algo() })]
      for (const p of [p1, p2]) await algorand.send.assetOptIn({ ...send(p), assetId: prize })
      await raffle.enter({ ...send(p1), amount: 5_000_000n, marketplace: deployer.addr.toString() })
      await raffle.enter({ ...send(p2), amount: 10_000_000n, marketplace: deployer.addr.toString() })

      await timeWarp.timeWarp(3_700n)
      await raffle.raffle(send(deployer))
      await timeWarp.roundWarp(await raffle.drawReadyRound())
      await raffle.raffle(send(deployer))
      for (let i = 0; i < 10 && (await raffle.state()).winner === ALGORAND_ZERO_ADDRESS_STRING; i++) {
        await raffle.findWinner({ ...send(deployer), iterationAmount: 16n })
      }

      const rewards = algosdk.getApplicationAddress(universe.rewards.appId)
      const rewardsBefore = (await algorand.client.algod.accountInformation(rewards).do()).amount
      const settler = await fixture.context.generateAccount({ initialFunds: (2).algo() })
      await raffle.claimPrize(send(settler))
      expect((await raffle.state()).prizeClaimed).toBe(true)
      expect((await algorand.client.algod.accountInformation(rewards).do()).amount).toBeGreaterThan(rewardsBefore)
    })
  })

  describe('P2-REF-02: the v3 plugin on a DEPLOYED child', () => {
    test('a deployed raffle (no seller_referrer, gates on Txn.sender) is entered through the legacy ABI', async () => {
      const escrow = (await universe.raffleFactory.client.state.global.akitaDaoEscrow())!
      const legacy = await deployLegacyRaffleFactory({ algorand, ...send(deployer), dao: universe.dao.appId, daoEscrow: { name: escrow.name, app: escrow.app } })
      const { appClient: v3 } = await algorand.client.getTypedAppFactory(RafflePluginFactory, {
        defaultSender: deployer.addr, defaultSigner: deployer.signer,
      }).send.create.create({ args: { version: 'v3', factory: legacy.appId } }) // pages from the program size (2 extra since the creation overloads)
      await addRawPlugin(Wr, { plugin: v3.appId }, send(deployer))

      // the DAO escrow already holds `prize` (prizeFor opts it in through the universe factory)
      const prize = await prizeFor()
      await factoryOptIn(legacy.appId, prize)
      const fees = (await universe.dao.client.state.global.nftFees())!
      const rewards = algosdk.getApplicationAddress(universe.rewards.appId)
      const rewardsHolds = await algorand.asset.getAccountInformation(rewards, prize).then(() => true, () => false)
      const cost = deployedRaffleCost({ raffleCreationFee: fees.raffleCreationFee, weightsListCount: 4n, prizeRewardsOptInCost: rewardsHolds ? 0n : 100_000n })
      const now = await blockTimestamp()
      const created = await legacy.app.send.call({
        ...send(deployer),
        method: DEPLOYED_NEW_RAFFLE,
        args: [
          await algorand.createTransaction.payment({ ...send(deployer), receiver: algosdk.getApplicationAddress(legacy.appId), amount: microAlgo(cost) }),
          await algorand.createTransaction.assetTransfer({ ...send(deployer), receiver: algosdk.getApplicationAddress(legacy.appId), assetId: prize, amount: 1n }),
          0n, now, now + ONE_DAY, 1_000_000n, 100_000_000n, gateAll, deployer.addr.toString(), '', [], 4n,
        ],
        extraFee: FEE,
      })
      const appId = BigInt(created.return as bigint)
      expect(await sellerReferrerOf(appId)).toBeUndefined()

      await inWindow(Wr, v3.appId, [await v3Enter(Wr, appId, 2_000_000n, v3)])
      const entered = await algorand.client.getTypedAppClientById(RaffleClient, { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer })
        .state.box.entriesByAddress.value(Wr.client.appAddress.toString())
      expect(entered).toBeDefined()
    })
  })
})
