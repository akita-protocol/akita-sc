/**
 * Principal resolution, Phase 2: Marketplace + Listing rev 3 (docs/principal-resolution/PHASE-0-SPEC.md
 * §6.7, §7.2, §7.5).
 *
 * - The hinted `list` / `listPrizeBox` verify the caller's wallet hint (`principalOf`) and fix the
 *   principal's referrer on the rev-3 child as `seller_referrer`. Settlement pays the referral cut there,
 *   with no EscrowFactory read, so registry-free (never registered) wallets earn their referrer a cut.
 * - The hinted `gatedPurchase(Asa)` assert `Gate.mustCheckFor(ctx)` with ctx = the buyer's verified
 *   `(principal, wallet, spender)` (`gateCheckCtx`). The legacy shims keep the registry-origin
 *   `Gate.mustCheck(origin)`.
 * - The legacy `list` / `listPrizeBox` shims (deployed selectors) create rev-3 children with the
 *   creation-time registry referrer and also accept the deployed plugin's pre-audit ALGO payment. The
 *   factory floats the difference, records it on the child (`factory_float`) and takes it back at
 *   settlement or delist before the seller's refund, so consumed settlement MBR is always the seller's.
 *
 * The deployed-bytecode compatibility checks (old plugin, old children) are in `compat.e2e.spec.ts`.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates'
import {
  directGateCtx,
  LEGACY_LISTING_CREATE_MBR,
  LISTING_CREATE_MBR,
  ListingSDK,
  MARKETPLACE_HINTED_METHODS,
  MARKETPLACE_LEGACY_METHODS,
} from 'akita-sdk/marketplace'
import { CallerType, MarketplacePluginSDK, newWallet, WalletSDK } from 'akita-sdk/wallet'
import algosdk, { Address, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { assertUnregistered, newUnregisteredWallet } from '../../tests/fixtures/unregistered-wallet'
import { expectContractError } from '../../tests/utils/errors'
import { ListingRevision } from './constants'

algokit.Config.configure({ populateAppCallResources: true })

/** Rewards v2 disbursement box (54,500, holds reclaimTo) minus the v1 box the deployed quote bakes in (41,700) */
const V2_DISBURSEMENT_INCREASE = 54_500n - 41_700n
/** what the factory floats for a legacy-paid (pre-audit quote) ASA listing: the creator MBR gap and the v2 increase on the prize and referral disbursements */
const LEGACY_FLOAT = LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR + 2n * V2_DISBURSEMENT_INCREASE
/** a legacy-paid prize box quotes one disbursement (the referral) */
const LEGACY_PRIZE_BOX_FLOAT = LISTING_CREATE_MBR - LEGACY_LISTING_CREATE_MBR + V2_DISBURSEMENT_INCREASE

const fixture = algorandFixture()
const ONE_DAY = 86_400n
const ZERO = ALGORAND_ZERO_ADDRESS_STRING
const SEND = { coverAppCallInnerTransactionFees: true, populateAppCallResources: true } as const
const uniq = (tag: string) => `${tag}-${Date.now()}-${Math.random()}`

describe('Marketplace principal resolution (§6.7)', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  /** owns the wallets; also a plain EOA seller/buyer */
  let user: TransactionSignerAccount
  let buyer: TransactionSignerAccount
  /** referrer of the unregistered wallet Wu (an EOA: referrers need not be Akita wallets) */
  let referrerU: TransactionSignerAccount
  /** referrer of the registered wallet Wr */
  let referrerR: TransactionSignerAccount
  /** NEVER registered in the EscrowFactory; referrer referrerU */
  let Wu: WalletSDK
  /** registered (SDK newWallet); referrer referrerR */
  let Wr: WalletSDK
  /** buyer wallet, never registered, referrer referrerU */
  let Wb: WalletSDK
  let plugin: MarketplacePluginSDK
  let gates: GateSDK
  let asset: bigint
  let gateAsset: bigint

  const marketplace = () => universe.marketplace

  /** spendable ALGO: balance above the minimum balance */
  const freeBalance = async (address: string | Address): Promise<bigint> => {
    const info = await algorand.client.algod.accountInformation(address.toString()).do()
    return BigInt(info.amount) - BigInt(info.minBalance)
  }

  const appExists = async (appId: bigint): Promise<boolean> => {
    try {
      await algorand.client.algod.getApplicationByID(appId).do()
      return true
    } catch {
      return false
    }
  }

  const now = async (): Promise<bigint> => {
    const status = await algorand.client.algod.status().do()
    const block = await algorand.client.algod.block(status.lastRound).do()
    return BigInt(block.block.header.timestamp)
  }

  /**
   * Sum of the Rewards allocations held for `address` in `assetId` (box 'u' ‖ address ‖ itob(asset) ‖ itob(id)).
   * The referral cut is paid as a Rewards instant disbursement, so this is where a referrer's cut lands.
   */
  const allocationsFor = async (address: string, assetId = 0n): Promise<bigint> => {
    const prefix = Buffer.concat([Buffer.from('u'), Buffer.from(algosdk.decodeAddress(address).publicKey), Buffer.from(algosdk.encodeUint64(assetId))])
    let sum = 0n
    for (const box of await algorand.app.getBoxNames(universe.rewards.appId)) {
      const name = Buffer.from(box.nameRaw)
      if (name.length === prefix.length + 8 && name.subarray(0, prefix.length).equals(prefix)) {
        sum += algosdk.decodeUint64(await algorand.app.getBoxValue(universe.rewards.appId, box.nameRaw), 'bigint')
      }
    }
    return sum
  }

  const installPlugins = async (wallet: WalletSDK, owner: TransactionSignerAccount) => {
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins * 2n + 100_000_000n), sender: owner.addr, signer: owner.signer })
    await wallet.addPlugin({ client: universe.optInPlugin, callerType: CallerType.Global, sender: owner.addr, signer: owner.signer })
    await wallet.addPlugin({ client: plugin, callerType: CallerType.Admin, sender: owner.addr, signer: owner.signer })
    await wallet.usePlugin({
      sender: owner.addr,
      signer: owner.signer,
      callerType: CallerType.Global,
      calls: [universe.optInPlugin.optIn({ assets: [asset, gateAsset] })],
    })
  }

  /** List `asset` through the NEW plugin from `wallet` (hint = windowHint(wallet)); returns the listing id. */
  const pluginList = async (wallet: WalletSDK, owner: TransactionSignerAccount, price: bigint, gateId = 0n): Promise<bigint> => {
    const before = new Set(await createdApps())
    await wallet.usePlugin({
      sender: owner.addr,
      signer: owner.signer,
      callerType: CallerType.Admin,
      calls: [plugin.list({
        asset,
        assetAmount: 1n,
        price,
        paymentAsset: 0n,
        expiration: (await now()) + ONE_DAY * 30n,
        reservedFor: ZERO,
        gateId,
        marketplace: ZERO,
        name: '',
        proof: [],
      })],
    })
    const created = (await createdApps()).filter((id) => !before.has(id))
    expect(created).toHaveLength(1)
    return created[0]
  }

  const createdApps = async (): Promise<bigint[]> => {
    const info = await algorand.client.algod.accountInformation(marketplace().client.appAddress.toString()).do()
    return (info.createdApps ?? []).map((app) => BigInt(app.id))
  }

  const pluginPurchase = (wallet: WalletSDK, owner: TransactionSignerAccount, appId: bigint, maxPrice: bigint, args: Uint8Array[] = []) =>
    wallet.usePlugin({
      sender: owner.addr,
      signer: owner.signer,
      callerType: CallerType.Admin,
      calls: [plugin.purchase({ appId, marketplace: ZERO, maxPrice, args })],
    })

  const state = (appId: bigint) => marketplace().getListing({ appId }).state()

  /** a direct (EOA) ALGO listing payment + asset transfer, for raw factory calls */
  const directListTxns = async (seller: TransactionSignerAccount, amount: bigint) => ({
    payment: {
      txn: await algorand.createTransaction.payment({ note: uniq('pay'), sender: seller.addr, receiver: marketplace().client.appAddress, amount: microAlgo(amount) }),
      signer: seller.signer,
    },
    assetXfer: {
      txn: await algorand.createTransaction.assetTransfer({ note: uniq('xfer'), sender: seller.addr, receiver: marketplace().client.appAddress, assetId: asset, amount: 1n }),
      signer: seller.signer,
    },
  })

  const listArgs = async (seller: TransactionSignerAccount, amount: bigint) => ({
    ...(await directListTxns(seller, amount)),
    price: 1_000_000n,
    paymentAsset: 0n,
    expiration: (await now()) + ONE_DAY,
    reservedFor: ZERO,
    gateId: 0n,
    marketplace: seller.addr.toString(),
    name: '',
    proof: [] as Uint8Array[],
  })

  /** created listing id from a typed-composer send result (its `returns` are the decoded values) */
  const returnedId = (result: { returns: readonly unknown[] }): bigint => {
    const last = result.returns.at(-1) as bigint | { returnValue?: unknown } | undefined
    const value = typeof last === 'bigint' ? last : last?.returnValue
    expect(typeof value).toBe('bigint')
    return value as bigint
  }

  /** SDK listing (it adds the factory/escrow opt-ins the group needs), then delist: warms up opt-ins */
  const warmUp = async (paymentAsset: bigint) => {
    const listing = await marketplace().list({
      sender: user.addr, signer: user.signer, asset, amount: 1n, name: '', proof: [],
      price: 1_000_000n, paymentAsset, expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n,
      marketplace: user.addr.toString(),
    })
    await marketplace().delist({ sender: user.addr, signer: user.signer, appId: listing.client.appId })
  }

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (2_000).algo() })
    user = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    buyer = await fixture.context.generateAccount({ initialFunds: (500).algo() })
    referrerU = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    referrerR = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    plugin = universe.marketplacePlugin

    const create = async (name: string) => BigInt((await algorand.send.assetCreate({
      sender: deployer.addr, signer: deployer.signer, total: 1_000_000n, decimals: 0, assetName: name, unitName: name.slice(0, 8),
    })).confirmation.assetIndex!)
    asset = await create('PRtest')
    gateAsset = await create('PRgate')

    // the factory hosts the legacy-payment float (runbook: DAO top-up)
    await algorand.account.ensureFunded(marketplace().client.appAddress, dispenser.addr, (20).algo())

    Wu = await newUnregisteredWallet({ walletFactory: universe.walletFactory, sender: user.addr, signer: user.signer, referrer: referrerU.addr.toString(), nickname: 'mkt-wu' })
    Wb = await newUnregisteredWallet({ walletFactory: universe.walletFactory, sender: buyer.addr, signer: buyer.signer, referrer: referrerU.addr.toString(), nickname: 'mkt-wb' })
    Wr = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
      sender: user.addr,
      signer: user.signer,
      nickname: 'mkt-wr',
      referrer: referrerR.addr.toString(),
      // Wr is the REGISTERED wallet (M-02 / legacy shims compare against the registry); newWallet registers only on request
      register: true,
    })
    await installPlugins(Wu, user)
    await installPlugins(Wb, buyer)
    await installPlugins(Wr, user)

    for (const account of [user, buyer]) {
      await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: asset })
      await algorand.send.assetOptIn({ sender: account.addr, signer: account.signer, assetId: gateAsset })
    }
    for (const receiver of [Wu.client.appAddress, Wr.client.appAddress, user.addr]) {
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: asset, amount: 20n, receiver })
    }
    // the gate asset: held by the buyers only
    for (const receiver of [Wb.client.appAddress, buyer.addr]) {
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: gateAsset, amount: 5n, receiver })
    }
    // opt the factory (and the DAO escrow) into the prize and into gateAsset as a payment asset
    await warmUp(0n)
    await warmUp(gateAsset)

    gates = new GateSDK({
      algorand,
      factoryParams: { appId: universe.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
      gateRegistry: { asset: universe.subgates.assetGate.appId, akita_referrer: universe.subgates.akitaReferrerGate.appId },
    })
    await universe.gate.client.appClient.fundAppAccount({ amount: microAlgo(2_000_000), sender: deployer.addr, signer: deployer.signer })
  })

  describe('listing creation fixes the seller referrer', () => {
    test('M-01 new plugin, never-registered wallet: rev 3, seller_referrer = the verified referrer, paid at settlement', async () => {
      const listingId = await pluginList(Wu, user, 2_000_000n)
      const listing = await state(listingId)
      expect(listing.rev).toBe(BigInt(ListingRevision))
      expect(listing.rev).toBe(3n)
      expect(listing.seller).toBe(Wu.client.appAddress.toString())
      expect(listing.sellerReferrer).toBe(referrerU.addr.toString())

      const before = await allocationsFor(referrerU.addr.toString())
      await pluginPurchase(Wb, buyer, listingId, 2_000_000n)
      expect(await appExists(listingId)).toBe(false)
      // the cut went to the creation-time referrer (an EOA), with no registry entry anywhere
      expect(await allocationsFor(referrerU.addr.toString())).toBeGreaterThan(before)
      await assertUnregistered(universe.escrowFactory, [Wu.client.appAddress, Wb.client.appAddress])
    })

    test('M-02 new plugin, registered wallet: the hint gives the same referrer the registry would', async () => {
      const listingId = await pluginList(Wr, user, 1_500_000n)
      expect((await state(listingId)).sellerReferrer).toBe(referrerR.addr.toString())
      const before = await allocationsFor(referrerR.addr.toString())
      await pluginPurchase(Wb, buyer, listingId, 1_500_000n)
      expect(await allocationsFor(referrerR.addr.toString())).toBeGreaterThan(before)
    })

    test('M-03 direct EOA seller (hint 0): seller_referrer is zero and settlement pays no referral', async () => {
      const listing = await marketplace().list({
        sender: user.addr, signer: user.signer, asset, amount: 1n, name: '', proof: [],
        price: 1_000_000n, paymentAsset: 0n, expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n,
        marketplace: user.addr.toString(),
      })
      const s = await listing.state()
      expect(s.rev).toBe(3n)
      expect(s.seller).toBe(user.addr.toString())
      expect(s.sellerReferrer).toBe(ZERO)
      await marketplace().delist({ sender: user.addr, signer: user.signer, appId: listing.client.appId })
    })

    test('M-04 a direct call with a wallet hint reverts: genuine wallet → errHtop, non-wallet app → errHnwl', async () => {
      const base = {
        sender: user.addr, signer: user.signer, asset, amount: 1n, name: '', proof: [] as Uint8Array[],
        price: 1_000_000n, paymentAsset: 0n, expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n,
        marketplace: user.addr.toString(),
      }
      await expectContractError(marketplace().list({ ...base, wallet: Wu.client.appId }), 'errHtop')
      await expectContractError(marketplace().list({ ...base, wallet: universe.gate.appId }), 'errHnwl')
    })

    test('M-05 legacy list shim (deployed selector): rev-3 child, seller_referrer = registry referrer (zero for an EOA)', async () => {
      const cost = await marketplace().quoteListCost({ prize: asset })
      const result = await marketplace().client.newGroup()
        .listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64({ sender: user.addr, signer: user.signer, args: await listArgs(user, cost), maxFee: microAlgo(2_000_000) })
        .send(SEND)
      const listingId = returnedId(result)
      const s = await state(listingId)
      expect(s.rev).toBe(3n)
      expect(s.sellerReferrer).toBe(ZERO)
      await marketplace().delist({ sender: user.addr, signer: user.signer, appId: listingId })
    })
  })

  describe('legacy payment (deployed MarketplacePlugin 3569561455 / pre-audit SDK)', () => {
    test('M-06 the legacy shim accepts the pre-audit ALGO payment; the factory floats the gap and gets it back on delist', async () => {
      const factory = marketplace().client.appAddress
      const cost = await marketplace().quoteListCost({ prize: asset })
      const legacyAmount = cost - LEGACY_FLOAT
      const gap = LEGACY_FLOAT
      expect(gap).toBe(189_600n)

      const freeBefore = await freeBalance(factory)
      const result = await marketplace().client.newGroup()
        .listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64({ sender: user.addr, signer: user.signer, args: await listArgs(user, legacyAmount), maxFee: microAlgo(2_000_000) })
        .send(SEND)
      const listingId = returnedId(result)
      expect(await freeBalance(factory)).toBe(freeBefore - gap)
      expect((await state(listingId)).factoryFloat).toBe(gap)

      // delist consumes nothing: the factory takes its float back and the seller gets what they paid
      await marketplace().delist({ sender: user.addr, signer: user.signer, appId: listingId })
      expect(await appExists(listingId)).toBe(false)
      expect(await freeBalance(factory)).toBe(freeBefore)
    })

    test('M-07 the legacy payment is rejected by the hinted list, and for ASA-priced listings on the shim (errIpay)', async () => {
      const cost = await marketplace().quoteListCost({ prize: asset })
      const legacyAmount = cost - LEGACY_FLOAT
      await expectContractError(
        marketplace().client.newGroup()
          .listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64({
            sender: user.addr, signer: user.signer, args: { ...(await listArgs(user, legacyAmount)), wallet: 0n }, maxFee: microAlgo(2_000_000),
          })
          .send(SEND),
        'errIpay',
      )
      // ASA-priced (payment asset = gateAsset; beforeAll opted the factory and escrow in)
      const asaCost = await marketplace().quoteListCost({ prize: asset, paymentAsset: gateAsset })
      await expectContractError(
        marketplace().client.newGroup()
          .listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64({
            sender: user.addr, signer: user.signer,
            args: { ...(await listArgs(user, asaCost - LEGACY_FLOAT)), paymentAsset: gateAsset },
            maxFee: microAlgo(2_000_000),
          })
          .send(SEND),
        'errIpay',
      )
    })

    test('M-08 legacy listPrizeBox shim accepts the pre-audit ALGO payment too', async () => {
      await algorand.account.ensureFunded(universe.prizeBoxFactory.client.appAddress, (await algorand.account.dispenserFromEnvironment()).addr, (10).algo())
      const box = await universe.prizeBoxFactory.mint({ sender: user.addr, signer: user.signer, owner: user.addr.toString() })
      const cost = await marketplace().quoteListCost({ isPrizeBox: true })
      const factory = marketplace().client.appAddress
      const freeBefore = await freeBalance(factory)
      const transferTxn = (await box.client.createTransaction.transfer({ sender: user.addr, signer: user.signer, args: { newOwner: factory.toString() } })).transactions[0]
      expect(LEGACY_PRIZE_BOX_FLOAT).toBe(176_800n)
      const payment = await algorand.createTransaction.payment({ note: uniq('pb'), sender: user.addr, receiver: factory, amount: microAlgo(cost - LEGACY_PRIZE_BOX_FLOAT) })
      const result = await marketplace().client.newGroup()
        .listPrizeBoxApplPayUint64Uint64Uint64AddressUint64AddressUint64({
          sender: user.addr, signer: user.signer,
          args: {
            prizeBoxTransferTxn: { txn: transferTxn, signer: user.signer },
            payment: { txn: payment, signer: user.signer },
            price: 1_000_000n, paymentAsset: 0n, expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n, marketplace: user.addr.toString(),
          },
          maxFee: microAlgo(2_000_000),
        })
        .send(SEND)
      const listingId = returnedId(result)
      expect((await state(listingId)).rev).toBe(3n)
      expect((await state(listingId)).factoryFloat).toBe(LEGACY_PRIZE_BOX_FLOAT)
      expect(await freeBalance(factory)).toBe(freeBefore - LEGACY_PRIZE_BOX_FLOAT)
      await marketplace().delist({ sender: user.addr, signer: user.signer, appId: listingId })
      expect(await freeBalance(factory)).toBe(freeBefore)
    })

    test('M-14 a legacy-paid SALE that consumes settlement MBR leaves the factory whole (the seller bears it)', async () => {
      // fresh prize: the buyer is not opted in and neither is Rewards, so settlement consumes one prize
      // disbursement + the Rewards opt-in (79,800 + 100,000). Before the fix the factory paid
      // min(consumed, float) on every such sale and anyone could repeat it.
      const fresh = BigInt((await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 10n, decimals: 0, assetName: 'PRfresh', unitName: 'PRF',
      })).confirmation.assetIndex!)
      await algorand.send.assetOptIn({ sender: user.addr, signer: user.signer, assetId: fresh })
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: fresh, amount: 2n, receiver: user.addr })
      // SDK list + delist opts the factory into `fresh` (the raw shim call below cannot)
      const warm = await marketplace().list({
        sender: user.addr, signer: user.signer, asset: fresh, amount: 1n, name: '', proof: [],
        price: 1_000_000n, paymentAsset: 0n, expiration: (await now()) + ONE_DAY, reservedFor: ZERO, gateId: 0n, marketplace: user.addr.toString(),
      })
      await marketplace().delist({ sender: user.addr, signer: user.signer, appId: warm.client.appId })

      const factory = marketplace().client.appAddress
      const cost = await marketplace().quoteListCost({ prize: fresh })
      const float = LEGACY_FLOAT
      const freeBefore = await freeBalance(factory)
      const result = await marketplace().client.newGroup()
        .listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64({
          sender: user.addr, signer: user.signer,
          args: {
            ...(await listArgs(user, cost - float)),
            assetXfer: {
              txn: await algorand.createTransaction.assetTransfer({ note: uniq('xfer'), sender: user.addr, receiver: factory, assetId: fresh, amount: 1n }),
              signer: user.signer,
            },
          },
          maxFee: microAlgo(2_000_000),
        })
        .send(SEND)
      const listingId = returnedId(result)
      expect((await state(listingId)).factoryFloat).toBe(float)
      expect(await freeBalance(factory)).toBe(freeBefore - float)

      await marketplace().purchase({ sender: buyer.addr, signer: buyer.signer, listingAppId: listingId, marketplace: buyer.addr.toString() })
      expect(await appExists(listingId)).toBe(false)
      // the buyer is not opted in: the prize went to its Rewards inbox
      expect(await allocationsFor(buyer.addr.toString(), fresh)).toBe(1n)
      expect(await freeBalance(factory)).toBe(freeBefore)
    })
  })

  describe('gated purchase subject = the verified context (gateCheckCtx)', () => {
    let referrerGate: bigint
    let assetGate: bigint

    beforeAll(async () => {
      referrerGate = (await gates.register({
        sender: deployer.addr,
        signer: deployer.signer,
        args: [{ type: 'akita_referrer', appId: universe.subgates.akitaReferrerGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, referrer: referrerU.addr.toString() }],
      })).return!
      assetGate = (await gates.register({
        sender: deployer.addr,
        signer: deployer.signer,
        args: [{ type: 'asset', appId: universe.subgates.assetGate.appId, layer: 0n, logicalOperator: LogicalOperator.None, asset: gateAsset, op: Operator.GreaterThanOrEqualTo, value: 1n }],
      })).return!
    })

    test('M-09 new plugin from a never-registered wallet passes a context-aware referrer gate (Gate.mustCheckFor)', async () => {
      const listingId = await pluginList(Wr, user, 1_000_000n, referrerGate)
      // akita_referrer under checkFor ignores the arg bytes and reads ctx.wallet
      await pluginPurchase(Wb, buyer, listingId, 1_000_000n, [algosdk.encodeUint64(0)])
      expect(await appExists(listingId)).toBe(false)
      await assertUnregistered(universe.escrowFactory, [Wb.client.appAddress])
    })

    test('M-10 a wallet referred by someone else fails the same gate', async () => {
      const listingId = await pluginList(Wu, user, 1_000_000n, referrerGate)
      // Wr's referrer is referrerR, not referrerU
      await expectContractError(pluginPurchase(Wr, user, listingId, 1_000_000n, [algosdk.encodeUint64(0)]), 'errFgte')
      await Wu.usePlugin({ sender: user.addr, signer: user.signer, callerType: CallerType.Admin, calls: [plugin.delist({ appId: listingId })] })
    })

    test('M-11 direct buyer: hinted gatedPurchase with mustCheckFor((buyer, 0, buyer)) passes; the SDK builds it', async () => {
      const listingId = await pluginList(Wr, user, 1_000_000n, assetGate)
      const gateTxn = await gates.build.mustCheckFor({ sender: buyer.addr, signer: buyer.signer, ctx: directGateCtx(buyer.addr), gateId: assetGate, args: [{ type: 'asset' }] })
      await marketplace().purchase({ sender: buyer.addr, signer: buyer.signer, listingAppId: listingId, marketplace: ZERO, gateTxn })
      expect(await appExists(listingId)).toBe(false)
    })

    test('M-12 P2-GATE-03 at the marketplace: a gate txn whose ctx is not the buyer\'s own verified ctx is rejected (errFgte)', async () => {
      const listingId = await pluginList(Wr, user, 1_000_000n, assetGate)
      const purchaseWith = async (gateTxn: Awaited<ReturnType<GateSDK['build']['mustCheckFor']>>, legacy = false) => {
        const payment = { txn: await algorand.createTransaction.payment({ note: uniq('buy'), sender: buyer.addr, receiver: marketplace().client.appAddress, amount: microAlgo(1_000_000) }), signer: buyer.signer }
        const group = marketplace().client.newGroup()
        const composer = legacy
          ? group.gatedPurchasePayApplUint64AddressVoid({ sender: buyer.addr, signer: buyer.signer, args: { payment, gateTxn, appId: listingId, marketplace: ZERO }, maxFee: microAlgo(200_000) })
          : group.gatedPurchasePayApplUint64AddressUint64Void({ sender: buyer.addr, signer: buyer.signer, args: { payment, gateTxn, appId: listingId, marketplace: ZERO, wallet: 0n }, maxFee: microAlgo(200_000) })
        return composer.send(SEND)
      }
      const forCtx = (ctx: { principal: string; wallet: bigint; spender: string }) =>
        gates.build.mustCheckFor({ sender: buyer.addr, signer: buyer.signer, ctx, gateId: assetGate, args: [{ type: 'asset' }] })
      const own = directGateCtx(buyer.addr)

      // the Gate passes each of these (the asset sub-gate sees ctx.principal = buyer), the target does not
      await expectContractError(purchaseWith(await forCtx({ ...own, wallet: Wb.client.appId })), 'errFgte')
      await expectContractError(purchaseWith(await forCtx({ ...own, spender: user.addr.toString() })), 'errFgte')
      // a legacy mustCheck txn does not satisfy the hinted method, nor a mustCheckFor txn the legacy shim
      const legacyGateTxn = await gates.build.mustCheck({ sender: buyer.addr, signer: buyer.signer, caller: buyer.addr.toString(), gateId: assetGate, args: [{ type: 'asset' }] })
      await expectContractError(purchaseWith(legacyGateTxn), 'errFgte')
      await expectContractError(purchaseWith(await forCtx(own), true), 'errFgte')

      // the legacy shim with the legacy gate txn (registry origin of an EOA = itself) still works
      await purchaseWith(await gates.build.mustCheck({ sender: buyer.addr, signer: buyer.signer, caller: buyer.addr.toString(), gateId: assetGate, args: [{ type: 'asset' }] }), true)
      expect(await appExists(listingId)).toBe(false)
    })

    test('M-13 hinted gatedPurchase with a hint the buyer does not hold reverts at resolution (errHtop)', async () => {
      const listingId = await pluginList(Wr, user, 1_000_000n, assetGate)
      const gateTxn = await gates.build.mustCheckFor({ sender: buyer.addr, signer: buyer.signer, ctx: directGateCtx(buyer.addr), gateId: assetGate, args: [{ type: 'asset' }] })
      await expectContractError(
        marketplace().purchase({ sender: buyer.addr, signer: buyer.signer, listingAppId: listingId, marketplace: ZERO, gateTxn, wallet: Wb.client.appId }),
        'errHtop',
      )
      await Wr.usePlugin({ sender: user.addr, signer: user.signer, callerType: CallerType.Admin, calls: [plugin.delist({ appId: listingId })] })
    })
  })

  test('P2-ABI-01: the typed client exposes both overloads of every changed method', () => {
    const sigs = marketplace().client.appClient.appSpec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)
    for (const name of Object.keys(MARKETPLACE_HINTED_METHODS) as (keyof typeof MARKETPLACE_HINTED_METHODS)[]) {
      expect(sigs).toContain(MARKETPLACE_HINTED_METHODS[name])
      expect(sigs).toContain(MARKETPLACE_LEGACY_METHODS[name])
    }
    const client = marketplace().client.send
    expect(typeof client.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64Uint64).toBe('function')
    expect(typeof client.listPayAxferUint64Uint64Uint64AddressUint64AddressStringByte_32Uint64).toBe('function')
    expect(typeof client.gatedPurchasePayApplUint64AddressUint64Void).toBe('function')
    expect(typeof client.gatedPurchasePayApplUint64AddressVoid).toBe('function')
    expect(ListingSDK).toBeDefined()
  })
})
