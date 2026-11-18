import { Config, microAlgo, type AlgorandClient } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import type { AppClient } from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AuctionSDK, directGateCtx } from 'akita-sdk/auction'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import { CallerType, newWallet, WalletSDK } from 'akita-sdk/wallet'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { addRawPlugin, assertUnregistered, newUnregisteredWallet } from '../../tests/fixtures/unregistered-wallet'
import { TimeWarp } from '../../tests/utils/time'
import { AuctionPluginClient, AuctionPluginFactory } from '../artifacts/arc58/plugins/auction/AuctionPluginClient'
import { AuctionClient } from '../artifacts/auction/AuctionClient'
import type { AuctionFactoryClient } from '../artifacts/auction/AuctionFactoryClient'
import { MockLegacyNftCallerClient, MockLegacyNftCallerFactory } from '../artifacts/auction/mocks/MockLegacyNftCallerClient'
import { deployLegacyAuctionFactory, deployLegacyAuctionPlugin } from './compat/deployed'

/**
 * Auction principal resolution (docs/principal-resolution/PHASE-0-SPEC.md §6.6, §7.2, §7.5).
 *
 * - The factory verifies the seller's wallet hint at creation and stores `seller_referrer` in the child;
 *   settlement pays it (no registry read). The legacy creation shims resolve it from the registry, once,
 *   at creation (P2-REF-01).
 * - Gated bids: the hinted `gatedBid`/`gatedBidAsa` pin `Gate.mustCheckFor(ctx)` to the verified context;
 *   the legacy shims keep `Gate.mustCheck(registry origin)`.
 * - Mixed generations (P2-REF-02): the DEPLOYED AuctionPlugin (MainNet bytecode, `compat/deployed`) bids on
 *   a new child through the legacy shim, and the v3 plugin bids on a DEPLOYED child through the legacy ABI.
 */

Config.configure({ populateAppCallResources: true })

const ONE_DAY = 86_400n
const FEE = microAlgo(40_000)
const EMPTY_ARG = new Uint8Array()

describe('Auction principal resolution (§6.6)', () => {
  const fixture = algorandFixture()

  let algorand: AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  let gate: GateSDK
  let plugin: AuctionPluginClient
  let legacyCaller: MockLegacyNftCallerClient

  let R1: string
  let R2: string
  /** unregistered default wallet, referrer R1, v3 auction plugin */
  let Wd: WalletSDK
  /** unregistered default wallet, referrer R2, v3 auction plugin */
  let Wo: WalletSDK
  /** registered (legacy registry) default wallet, referrer R2: old-ABI callers */
  let Wr: WalletSDK

  /** AkitaReferrerGate for R1 (context-aware: ctx.wallet must be referred by R1) */
  let gateR1: bigint
  /** asset gate that passes for any account (ALGO balance >= 0) */
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

  const rewardsBalance = async (): Promise<bigint> =>
    (await algorand.client.algod.accountInformation(algosdk.getApplicationAddress(universe.rewards.appId)).do()).amount

  /** the DAO's `rev_auction` escrow, where the factory sends the auction creation fee (C33) */
  const auctionEscrowBalance = async (): Promise<bigint> => {
    const escrow = await universe.dao.wallet.getEscrow('rev_auction')
    return (await algorand.client.algod.accountInformation(algosdk.getApplicationAddress(escrow.id)).do()).amount
  }

  const auctionCreationFee = async (): Promise<bigint> => (await universe.dao.client.state.global.nftFees())!.auctionCreationFee

  const auctionClient = (appId: bigint) =>
    algorand.client.getTypedAppClientById(AuctionClient, { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer })

  const sellerReferrerOf = async (appId: bigint): Promise<string | undefined> => {
    const state = await algorand.app.getGlobalState(appId)
    const value = state['seller_referrer']
    return value && 'valueRaw' in value ? algosdk.encodeAddress(value.valueRaw) : undefined
  }

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

  /** a fresh 1-unit ASA prize held by `holder` (a wallet address; opted in through the opt-in plugin) */
  async function prizeFor(holder?: WalletSDK): Promise<bigint> {
    const { assetId } = await algorand.send.assetCreate({ ...send(deployer), total: 10n, decimals: 0, assetName: 'Principal Prize', unitName: 'PPZ' })
    const prize = BigInt(assetId!)
    // pre-opts the DAO escrow and splits in, so any factory's later optIn is a plain self opt-in
    await universe.auctionFactory.optIn({ ...send(deployer), asset: prize })
    if (holder) {
      await holder.usePlugin({ ...send(deployer), callerType: CallerType.Global, consolidateFees: true, calls: [universe.optInPlugin.optIn({ assets: [prize] })] })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: prize, amount: 1n, receiver: holder.client.appAddress })
    }
    return prize
  }

  /** a live auction (ALGO bids unless `bidAssetId`) created directly by the deployer (hinted creation, wallet 0) */
  async function eoaAuction(gateId: bigint, startingBid = 1_000_000n, bidAssetId = 0n): Promise<AuctionSDK> {
    const prize = await prizeFor()
    const now = await blockTimestamp()
    return universe.auctionFactory.newAuction({
      ...send(deployer), isPrizeBox: false, prizeAsset: prize, prizeAmount: 1n, name: '', proof: [],
      bidAssetId, bidFee: 0n, startingBid, bidMinimumIncrease: 100_000n,
      startTimestamp: now, endTimestamp: now + 7n * ONE_DAY, gateId, marketplace: deployer.addr.toString(), weightsListCount: 0n,
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
    await algorand.send.payment({ ...send(deployer), receiver: w.client.appAddress, amount: (60).algo() })
    await w.addPlugin({ ...send(deployer), client: universe.optInPlugin, callerType: CallerType.Global })
    await w.addPlugin({ ...send(deployer), client: universe.auctionPlugin, callerType: CallerType.Global })
    return w
  }

  const v3Bid = (w: WalletSDK, appId: bigint, amount: bigint, via = plugin) => via.params.bid({
    ...send(deployer),
    args: { wallet: w.client.appId, rekeyBack: true, appId, amount, args: [EMPTY_ARG], marketplace: deployer.addr.toString() },
    extraFee: FEE,
  })

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (10).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (3_000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    await algorand.account.ensureFunded(universe.auctionFactory.client.appAddress, dispenser.addr, (100).algo())

    plugin = algorand.client.getTypedAppClientById(AuctionPluginClient, {
      appId: universe.auctionPlugin.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer,
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

    Wd = await walletWith(R1, false, 'auction-wd')
    Wo = await walletWith(R2, false, 'auction-wo')
    Wr = await walletWith(R2, true, 'auction-wr')

    const { appClient } = await algorand.client.getTypedAppFactory(MockLegacyNftCallerFactory, {
      defaultSender: deployer.addr, defaultSigner: deployer.signer,
    }).send.create.bare()
    legacyCaller = appClient
    await addRawPlugin(Wr, { plugin: legacyCaller.appId }, send(deployer))
  })

  describe('creation: seller_referrer', () => {
    test('§6.6: the v3 plugin hints its window; the factory stores the verified referrer (no registry anywhere)', async () => {
      const prize = await prizeFor(Wd)
      const factory = universe.auctionFactory.client.appAddress.toString()
      const before = await createdApps(factory)
      const now = await blockTimestamp()
      await Wd.usePlugin({
        ...send(deployer),
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [universe.auctionPlugin.new({
          prizeId: prize, prizeAmount: 1n, name: '', proof: [], bidAssetId: 0n, bidFee: 0n, startingBid: 1_000_000n,
          bidMinimumIncrease: 100_000n, startTimestamp: now, endtimestamp: now + ONE_DAY, gateId: 0n,
          marketplace: deployer.addr.toString(), weightsListCount: 0n,
        })],
      })
      const appId = await newestApp(factory, before)
      expect(await sellerReferrerOf(appId)).toBe(R1)
      const state = await new AuctionSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } }).state()
      expect(state.seller).toBe(Wd.client.appAddress.toString())
      expect(state.sellerReferrer).toBe(R1)
      await assertUnregistered(universe.escrowFactory, [Wd.client.appAddress])
    })

    test('a direct (EOA) creation stores the zero address; a wallet hint at top level reverts (errHtop / errHnwl)', async () => {
      const auction = await eoaAuction(0n)
      expect(await sellerReferrerOf(auction.client.appId)).toBe(ALGORAND_ZERO_ADDRESS_STRING)
      expect(await auction.usesPrincipalAbi()).toBe(true)

      const prize = await prizeFor()
      const now = await blockTimestamp()
      const create = (wallet: bigint) => universe.auctionFactory.newAuction({
        ...send(deployer), isPrizeBox: false, prizeAsset: prize, prizeAmount: 1n, name: '', proof: [],
        bidAssetId: 0n, bidFee: 0n, startingBid: 1_000_000n, bidMinimumIncrease: 100_000n,
        startTimestamp: now, endTimestamp: now + ONE_DAY, gateId: 0n, marketplace: deployer.addr.toString(), weightsListCount: 0n, wallet,
      })
      await expect(create(Wd.client.appId)).rejects.toThrow(/errHtop/)
      await expect(create(universe.gate.appId)).rejects.toThrow(/errHnwl/)
    })

    test('P2-REF-01: an old-ABI caller from a registered wallet stores the creation-time registry referrer', async () => {
      const prize = await prizeFor(Wr)
      const factory = universe.auctionFactory.client.appAddress.toString()
      const before = await createdApps(factory)
      const escrowBefore = await auctionEscrowBalance()
      const now = await blockTimestamp()
      await inWindow(Wr, legacyCaller.appId, [await legacyCaller.params.newAuction({
        ...send(deployer),
        args: { wallet: Wr.client.appId, rekeyBack: true, factory: universe.auctionFactory.appId, prizeId: prize, startTimestamp: now, endTimestamp: now + ONE_DAY, marketplace: deployer.addr.toString() },
        extraFee: FEE,
      })])
      const appId = await newestApp(factory, before)
      expect(await sellerReferrerOf(appId)).toBe(R2)
      // C33: an old-ABI caller that pays the factory's quote pays the creation fee with it
      expect(await auctionEscrowBalance() - escrowBefore).toBe(await auctionCreationFee())
    })

    test('P2-REF-01: a direct old-ABI creation by an EOA (no registry wallet) stores the zero address', async () => {
      const prize = await prizeFor()
      const factory: AuctionFactoryClient = universe.auctionFactory.client
      const cost = await factory.newAuctionCost({ args: { isPrizeBox: false, bidAssetId: 0n, prizeAssetId: prize, weightsListCount: 0n } })
      const fee = await auctionCreationFee()
      const escrowBefore = await auctionEscrowBalance()
      const now = await blockTimestamp()
      const create = async (amount: bigint) => factory.send.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64({
        ...send(deployer),
        args: {
          payment: await algorand.createTransaction.payment({ ...send(deployer), receiver: factory.appAddress, amount: microAlgo(amount), note: `legacy-${amount}` }),
          assetXfer: await algorand.createTransaction.assetTransfer({ ...send(deployer), receiver: factory.appAddress, assetId: prize, amount: 1n, note: `legacy-${amount}` }),
          name: '', proof: [], bidAssetId: 0n, bidFee: 0n, startingBid: 1_000_000n, bidMinimumIncrease: 100_000n,
          startTimestamp: now, endTimestamp: now + ONE_DAY, gateId: 0n, marketplace: deployer.addr.toString(), weightsListCount: 0n,
        },
        extraFee: FEE,
      })
      // C33: the old-ABI selector charges the creation fee as well: the storage cost alone is refused
      expect(fee).toBeGreaterThan(0n)
      await expect(create(cost - fee)).rejects.toThrow(/errIpay/)
      const { return: appId } = await create(cost)
      expect(await sellerReferrerOf(appId!)).toBe(ALGORAND_ZERO_ADDRESS_STRING)
      expect(await auctionEscrowBalance() - escrowBefore).toBe(fee)
    })
  })

  describe('gated bids on a principal-ABI child', () => {
    test('the v3 plugin sends Gate.mustCheckFor with the window context: a wallet referred by R1 passes (no registry)', async () => {
      const auction = await eoaAuction(gateR1)
      await inWindow(Wd, plugin.appId, [await v3Bid(Wd, auction.client.appId, 1_000_000n)])
      expect(await auction.hasBid({ address: Wd.client.appAddress.toString() })).toBe(true)
      await assertUnregistered(universe.escrowFactory, [Wd.client.appAddress])
    })

    test('a wallet referred by someone else fails the gate (errFgte)', async () => {
      const auction = await eoaAuction(gateR1)
      await expect(inWindow(Wo, plugin.appId, [await v3Bid(Wo, auction.client.appId, 1_000_000n)])).rejects.toThrow(/errFgte/)
    })

    test('direct hinted bid: the target accepts only the context it verified (P2-GATE-03 at the target)', async () => {
      const auction = await eoaAuction(gateAll)
      const bidder = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      const other = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const gateTxn = (ctx: ReturnType<typeof directGateCtx>) =>
        gate.build.mustCheckFor({ ...send(bidder), ctx, gateId: gateAll, args: [{ type: 'asset' }] })

      // a context naming another principal: the Gate passes it, the target's gateCheckCtx does not
      await expect(auction.bid({
        ...send(bidder), amount: 1_000_000n, marketplace: deployer.addr.toString(),
        gateTxn: await gateTxn(directGateCtx(other.addr.toString())),
      })).rejects.toThrow(/errFgte/)
      // a wallet hint on a top-level call
      await expect(auction.bid({
        ...send(bidder), amount: 1_000_000n, marketplace: deployer.addr.toString(), wallet: Wd.client.appId,
        gateTxn: await gateTxn({ principal: bidder.addr.toString(), wallet: Wd.client.appId, spender: bidder.addr.toString() }),
      })).rejects.toThrow(/errHtop/)

      await auction.bid({
        ...send(bidder), amount: 1_000_000n, marketplace: deployer.addr.toString(),
        gateTxn: await gateTxn(directGateCtx(bidder.addr.toString())),
      })
      expect(await auction.hasBid({ address: bidder.addr.toString() })).toBe(true)
    })

    test('legacy gatedBid shim on a new child: Gate.mustCheck with the registry subject (an EOA: itself)', async () => {
      const auction = await eoaAuction(gateAll)
      const bidder = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      const other = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const { bids, bidsByAddress } = await auction.mbr()
      const legacyBid = async (caller: string) => auction.client.send.gatedBidPayApplAddressVoid({
        ...send(bidder),
        args: {
          payment: await algorand.createTransaction.payment({ ...send(bidder), receiver: auction.client.appAddress, amount: microAlgo(1_000_000n + bids + bidsByAddress) }),
          gateTxn: await gate.build.mustCheck({ ...send(bidder), caller, gateId: gateAll, args: [{ type: 'asset' }] }),
          marketplace: deployer.addr.toString(),
        },
        extraFee: FEE,
      })
      await expect(legacyBid(other.addr.toString())).rejects.toThrow(/errFgte/)
      await legacyBid(bidder.addr.toString())
      expect(await auction.hasBid({ address: bidder.addr.toString() })).toBe(true)
    })
  })

  describe('S != C: gated bids from escrow windows and external controlled addresses (v3 plugin)', () => {
    /**
     * The gate is an asset gate on BADGE (plain sub-gate: it evaluates ctx.principal). Only principals hold
     * BADGE; no spending escrow does, except Ne's (the negative case). A pass proves the gate saw the
     * principal C; Wn's failure proves it never saw the spender S. Every pass also proves that the plugin's
     * pluginPrincipalOf ctx (before the RekeyTo) byte-matches the target's principalOf ctx (after it).
     *
     * - Wb: default wallet (R1); named escrow 'e' = Eb (E4: S = Eb, principal = Wb.address)
     * - Wx: external controlled C (holds BADGE, rekeyed to Wx.address); default window S = C; escrow 'e' = Ex
     * - Wn: default wallet WITHOUT BADGE; its escrow 'e' = Ne holds BADGE
     */
    let badge: bigint
    let bidToken: bigint
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

    /** global grants of the auction and opt-in plugins on `w`'s escrow 'e'; funds and opts the escrow into `assets` */
    async function escrowE(w: WalletSDK, assets: bigint[]): Promise<string> {
      await w.addPlugin({ ...send(deployer), client: universe.auctionPlugin, callerType: CallerType.Global, escrow: 'e' })
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
      bidToken = await mk('BidToken')
      await universe.auctionFactory.optIn({ ...send(deployer), asset: bidToken })
      gateBadge = (await gate.register({
        ...send(deployer),
        args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: badge, op: Operator.GreaterThanOrEqualTo, value: 1n }],
      })).return!

      Wb = await walletWith(R1, false, 'auction-sc-b')
      await Wb.usePlugin({ ...send(deployer), callerType: CallerType.Global, consolidateFees: true, calls: [universe.optInPlugin.optIn({ assets: [badge] })] })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: badge, amount: 1n, receiver: Wb.client.appAddress })
      Eb = await escrowE(Wb, [bidToken])
      await algorand.send.assetTransfer({ ...send(deployer), assetId: bidToken, amount: 10_000_000n, receiver: Eb })

      // external C: opted in and holding BADGE before the factory rekeys it to Wx.address (SG-04 controlledSigner path)
      const c = await fixture.context.generateAccount({ initialFunds: (40).algo() })
      C = c.addr.toString()
      await algorand.send.assetOptIn({ ...send(c), assetId: badge })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: badge, amount: 1n, receiver: C })
      Wx = await newUnregisteredWallet({
        walletFactory: universe.walletFactory, ...send(deployer), referrer: R1, nickname: 'auction-sc-x',
        controlledAddress: C, controlledSigner: c.signer, fund: (2).algo(),
      })
      await Wx.addPlugin({ ...send(deployer), client: universe.auctionPlugin, callerType: CallerType.Global })
      Ex = await escrowE(Wx, [])

      Wn = await walletWith(R1, false, 'auction-sc-n')
      Ne = await escrowE(Wn, [badge])
      await algorand.send.assetTransfer({ ...send(deployer), assetId: badge, amount: 1n, receiver: Ne })

      for (const [account, holds] of [[Wb.client.appAddress.toString(), true], [C, true], [Eb, false], [Ex, false], [Wn.client.appAddress.toString(), false], [Ne, true]] as const) {
        expect(await hasBadge(account), account).toBe(holds)
      }
    })

    test('E4: a named-escrow window bids; the gate saw principal Wb.address (the escrow holds no badge)', async () => {
      const auction = await eoaAuction(gateBadge)
      await inWindow(Wb, plugin.appId, [await v3Bid(Wb, auction.client.appId, 1_000_000n)], 'e')
      // state stays keyed by the spender (Q5)
      expect(await auction.hasBid({ address: Eb })).toBe(true)
      expect(await auction.hasBid({ address: Wb.client.appAddress.toString() })).toBe(false)
      await assertUnregistered(universe.escrowFactory, [Wb.client.appAddress, Eb])
    })

    test('E4 + ASA bids: the hinted gatedBidAsa from the escrow window', async () => {
      const auction = await eoaAuction(gateBadge, 1_000_000n, bidToken)
      const before = (await algorand.asset.getAccountInformation(Eb, bidToken)).balance
      await inWindow(Wb, plugin.appId, [await v3Bid(Wb, auction.client.appId, 1_000_000n)], 'e')
      expect(await auction.hasBid({ address: Eb })).toBe(true)
      expect(before - (await algorand.asset.getAccountInformation(Eb, bidToken)).balance).toBe(1_000_000n)
    })

    test('external C: the default window (S = C) and the escrow window (S = Ex, principal C) both pass the badge gate', async () => {
      const first = await eoaAuction(gateBadge)
      await inWindow(Wx, plugin.appId, [await v3Bid(Wx, first.client.appId, 1_000_000n)])
      expect(await first.hasBid({ address: C })).toBe(true)
      const second = await eoaAuction(gateBadge)
      await inWindow(Wx, plugin.appId, [await v3Bid(Wx, second.client.appId, 1_000_000n)], 'e')
      expect(await second.hasBid({ address: Ex })).toBe(true)
      await assertUnregistered(universe.escrowFactory, [Wx.client.appAddress, C, Ex])
    })

    test('the gate never sees the spender: Wn\'s escrow holds the badge, Wn.address does not → errFgte', async () => {
      const auction = await eoaAuction(gateBadge)
      await expect(inWindow(Wn, plugin.appId, [await v3Bid(Wn, auction.client.appId, 1_000_000n)], 'e')).rejects.toThrow(/errFgte/)
    })

    test('legacy gatedBidAsa shim on a new child: Gate.mustCheck with the registry subject (an EOA: itself)', async () => {
      const auction = await eoaAuction(gateAll, 1_000_000n, bidToken)
      const bidder = await fixture.context.generateAccount({ initialFunds: (10).algo() })
      const other = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      await algorand.send.assetOptIn({ ...send(bidder), assetId: bidToken })
      await algorand.send.assetTransfer({ ...send(deployer), assetId: bidToken, amount: 5_000_000n, receiver: bidder.addr })
      const { bids, bidsByAddress } = await auction.mbr()
      const legacyBidAsa = async (caller: string, amount: bigint) => auction.client.send.gatedBidAsaPayAxferApplAddressVoid({
        ...send(bidder),
        args: {
          payment: await algorand.createTransaction.payment({ ...send(bidder), receiver: auction.client.appAddress, amount: microAlgo(bids + bidsByAddress) }),
          assetXfer: await algorand.createTransaction.assetTransfer({ ...send(bidder), receiver: auction.client.appAddress, assetId: bidToken, amount }),
          gateTxn: await gate.build.mustCheck({ ...send(bidder), caller, gateId: gateAll, args: [{ type: 'asset' }] }),
          marketplace: deployer.addr.toString(),
        },
        extraFee: FEE,
      })
      await expect(legacyBidAsa(other.addr.toString(), 1_000_000n)).rejects.toThrow(/errFgte/)
      await legacyBidAsa(bidder.addr.toString(), 1_000_000n)
      expect(await auction.hasBid({ address: bidder.addr.toString() })).toBe(true)
    })
  })

  describe('P2-GATE-03 at the target: every ctx field is pinned', () => {
    test('a ctx with the right principal but a different wallet, or a different spender, fails (errFgte)', async () => {
      const auction = await eoaAuction(gateAll)
      const bidder = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      const other = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const me = bidder.addr.toString()
      const bid = async (ctx: ReturnType<typeof directGateCtx>) => auction.bid({
        ...send(bidder), amount: 1_000_000n, marketplace: deployer.addr.toString(),
        gateTxn: await gate.build.mustCheckFor({ ...send(bidder), ctx, gateId: gateAll, args: [{ type: 'asset' }] }),
      })
      await expect(bid({ principal: me, wallet: Wd.client.appId, spender: me })).rejects.toThrow(/errFgte/)
      await expect(bid({ principal: me, wallet: 0n, spender: other.addr.toString() })).rejects.toThrow(/errFgte/)
      await bid(directGateCtx(me))
      expect(await auction.hasBid({ address: me })).toBe(true)
    })
  })

  describe('settlement pays seller_referrer', () => {
    test('a sale created through the v3 plugin pays the creation-time referrer, whoever settles', async () => {
      const prize = await prizeFor(Wd)
      const factory = universe.auctionFactory.client.appAddress.toString()
      const before = await createdApps(factory)
      const now = await blockTimestamp()
      await Wd.usePlugin({
        ...send(deployer),
        callerType: CallerType.Global,
        consolidateFees: true,
        calls: [universe.auctionPlugin.new({
          prizeId: prize, prizeAmount: 1n, name: '', proof: [], bidAssetId: 0n, bidFee: 0n, startingBid: 5_000_000n,
          bidMinimumIncrease: 100_000n, startTimestamp: now, endtimestamp: now + ONE_DAY, gateId: 0n,
          marketplace: deployer.addr.toString(), weightsListCount: 0n,
        })],
      })
      const appId = await newestApp(factory, before)
      const auction = new AuctionSDK({ algorand, factoryParams: { appId, defaultSender: deployer.addr, defaultSigner: deployer.signer } })

      const bidder = await fixture.context.generateAccount({ initialFunds: (20).algo() })
      await algorand.send.assetOptIn({ ...send(bidder), assetId: prize })
      await auction.bid({ ...send(bidder), amount: 5_000_000n, marketplace: deployer.addr.toString() })
      await new TimeWarp(algorand).timeWarp(2n * ONE_DAY)

      const rewardsBefore = await rewardsBalance()
      // a third party (no wallet) settles: the referral still goes to the seller's stored referrer
      const settler = await fixture.context.generateAccount({ initialFunds: (2).algo() })
      await auction.claimPrize(send(settler))
      expect((await auction.state()).prizeClaimed).toBe(true)
      expect(await rewardsBalance()).toBeGreaterThan(rewardsBefore)
      await assertUnregistered(universe.escrowFactory, [Wd.client.appAddress])
    })
  })

  describe('P2-REF-02: mixed generations', () => {
    let deployedPlugin: AppClient

    beforeAll(async () => {
      deployedPlugin = await deployLegacyAuctionPlugin(algorand, universe.auctionFactory.appId, universe.dao.appId, send(deployer))
      await addRawPlugin(Wr, { plugin: deployedPlugin.appId }, send(deployer))
    })

    test('the DEPLOYED AuctionPlugin bids on a new child through the legacy gatedBid shim (registry origin)', async () => {
      const auction = await eoaAuction(gateAll)
      // the deployed plugin quotes the deployed child's box MBR (800 µA lower), so it over-bids by 1,000
      await inWindow(Wr, deployedPlugin.appId, [await deployedPlugin.params.call({
        method: 'bid(uint64,bool,uint64,uint64,byte[][],address)void',
        args: [Wr.client.appId, true, auction.client.appId, 1_001_000n, [EMPTY_ARG], deployer.addr.toString()],
        ...send(deployer),
        extraFee: FEE,
      })])
      expect(await auction.hasBid({ address: Wr.client.appAddress.toString() })).toBe(true)
    })

    test('the v3 plugin bids on a DEPLOYED child (no seller_referrer) through the legacy ABI', async () => {
      const escrow = (await universe.auctionFactory.client.state.global.akitaDaoEscrow())!
      const legacyFactory = await deployLegacyAuctionFactory({
        algorand, ...send(deployer), dao: universe.dao.appId, daoEscrow: { name: escrow.name, app: escrow.app },
      })
      // a v3 plugin instance pinned to the deployed factory (on MainNet the factory is upgraded in place)
      const { appClient: v3 } = await algorand.client.getTypedAppFactory(AuctionPluginFactory, {
        defaultSender: deployer.addr, defaultSigner: deployer.signer,
      }).send.create.create({ args: { version: 'v3', factory: legacyFactory.appId, akitaDao: universe.dao.appId }, extraProgramPages: 1 })
      await addRawPlugin(Wr, { plugin: v3.appId }, send(deployer))

      const prize = await prizeFor()
      const optInCost = await legacyFactory.optInCost({ args: { asset: prize } })
      await legacyFactory.send.optIn({
        ...send(deployer),
        args: { payment: await algorand.createTransaction.payment({ ...send(deployer), receiver: legacyFactory.appAddress, amount: microAlgo(optInCost) }), asset: prize },
        extraFee: FEE,
      })
      const cost = await legacyFactory.newAuctionCost({ args: { isPrizeBox: false, bidAssetId: 0n, prizeAssetId: prize, weightsListCount: 0n } })
      const now = await blockTimestamp()
      const { return: appId } = await legacyFactory.send.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64({
        ...send(deployer),
        args: {
          payment: await algorand.createTransaction.payment({ ...send(deployer), receiver: legacyFactory.appAddress, amount: microAlgo(cost) }),
          assetXfer: await algorand.createTransaction.assetTransfer({ ...send(deployer), receiver: legacyFactory.appAddress, assetId: prize, amount: 1n }),
          name: '', proof: [], bidAssetId: 0n, bidFee: 0n, startingBid: 1_000_000n, bidMinimumIncrease: 100_000n,
          startTimestamp: now, endTimestamp: now + ONE_DAY, gateId: gateAll, marketplace: deployer.addr.toString(), weightsListCount: 0n,
        },
        extraFee: FEE,
      })
      expect(await sellerReferrerOf(appId!)).toBeUndefined()

      // the deployed child gates on originOr(registry(S)) = Wr.address; the v3 plugin sends Gate.mustCheck with it
      await inWindow(Wr, v3.appId, [await v3.params.bid({
        ...send(deployer),
        args: { wallet: Wr.client.appId, rekeyBack: true, appId: appId!, amount: 1_001_000n, args: [EMPTY_ARG], marketplace: deployer.addr.toString() },
        extraFee: FEE,
      })])
      expect(await auctionClient(appId!).hasBid({ args: { address: Wr.client.appAddress.toString() } })).toBe(true)
    })
  })
})
