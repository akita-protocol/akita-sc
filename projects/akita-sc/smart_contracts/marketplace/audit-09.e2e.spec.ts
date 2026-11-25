import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { sendPrepared } from 'akita-sdk'
import { AkitaDaoSDK, ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { MetaSDK, MerkleTree, SchemaPart } from 'akita-sdk/meta'
import { SDKClient } from 'akita-sdk/types'
import { CallerType } from 'akita-sdk/wallet'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { expectContractError } from '../../tests/utils/errors'
import { MarketplaceClient } from '../artifacts/marketplace/MarketplaceClient'

/**
 * Regression tests for the fixes to the 2026-11-25 audit of the Marketplace (09):
 *
 * - MKT-01  a prize is opted in by the factory alone (`optInPrize`), so listing a new NFT does not
 *           depend on the DAO revenue escrow's payout cycle and costs one opt-in.
 * - MKT-03  the hinted `list` takes the highest creator royalty the seller accepts.
 * - MKT-05  a price whose shares cannot fit inside it is refused when it is set, not at the sale.
 * - MKT-06  a unit of the payment asset sent to a listing cannot block its delist.
 * - MKT-07  a marketplace fee that an unfunded address cannot receive goes to the DAO escrow.
 *
 * And for the cross-system audit (13): XSY-03, a sale pays the DAO escrow the Marketplace names when it
 * settles, so a listing follows the DAO pointing the Marketplace at another escrow.
 *
 * The ids are the audit's own; the "Audit regressions" block of marketplace.e2e.spec.ts uses the ids
 * of an earlier review.
 */

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const ZERO_ADDRESS = ALGORAND_ZERO_ADDRESS_STRING
const COLLECTION = 'audit-09-collection'
const THIRTY_DAYS = 86_400n * 30n

/** Eight big-endian bytes carried in the registry's string value; every byte must stay below 0x80. */
const royaltyValue = (value: bigint) => {
  const bytes = Array.from({ length: 8 }, (_, i) => Number((value >> BigInt(8 * (7 - i))) & 0xffn))
  if (bytes.some((b) => b >= 0x80)) throw new Error(`royalty ${value} does not survive UTF-8`)
  return String.fromCharCode(...bytes)
}

async function proposeAndExecute<TClient extends SDKClient>(dao: AkitaDaoSDK, actions: ProposalAction<TClient>[]): Promise<bigint> {
  const info = await dao.proposalCost({ actions })
  await dao.client.appClient.fundAppAccount({ amount: info.total.microAlgo() })
  const { return: proposalId } = await dao.newProposal({ actions })
  if (proposalId === undefined) throw new Error('Failed to create proposal')
  await dao.executeProposal({ proposalId })
  return proposalId
}

describe('Marketplace: audit 09 fixes', () => {
  let algorand: algokit.AlgorandClient
  let universe: AkitaUniverse
  let deployer: TransactionSignerAccount
  let creator: TransactionSignerAccount
  let seller: TransactionSignerAccount
  let buyer: TransactionSignerAccount
  /** the creator's collection: one registry root over four NFTs, all held by the seller */
  let nfts: bigint[]
  let tree: MerkleTree<[bigint]>
  let meta: MetaSDK
  let escrow: string
  let market: MarketplaceClient

  const now = async () => {
    const status = await algorand.client.algod.status().do()
    return BigInt((await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp)
  }
  const balance = async (address: string | { toString(): string }) =>
    BigInt((await algorand.client.algod.accountInformation(address.toString()).do()).amount)
  const holding = async (address: string | { toString(): string }, asset: bigint) =>
    (await algorand.account.getInformation(address.toString())).assets?.find((a) => a.assetId === asset)
  const setRoyalty = (value: bigint) => meta.addData({ name: COLLECTION, key: 'royalty', value: royaltyValue(value) })
  const proofOf = (nft: bigint) => tree.getProof(nfts.indexOf(nft))

  /** `list` as the SDK sends it for the seller, priced in ALGO unless `paymentAsset` is given. */
  const list = async (nft: bigint, price: bigint, options: { name?: string; proof?: Uint8Array[]; maxCreatorRoyalty?: bigint; paymentAsset?: bigint; marketplace?: string } = {}) =>
    universe.marketplace.list({
      sender: seller.addr,
      signer: seller.signer,
      isPrizeBox: false,
      asset: nft,
      amount: 1n,
      name: options.name ?? '',
      proof: options.proof ?? [],
      maxCreatorRoyalty: options.maxCreatorRoyalty,
      price,
      paymentAsset: options.paymentAsset ?? 0n,
      expiration: (await now()) + THIRTY_DAYS,
      reservedFor: ZERO_ADDRESS,
      gateId: 0n,
      marketplace: options.marketplace ?? seller.addr.toString(),
    })
  const purchase = (listingAppId: bigint) =>
    universe.marketplace.purchase({ sender: buyer.addr, signer: buyer.signer, listingAppId, marketplace: buyer.addr.toString() })
  const mint = async (from: TransactionSignerAccount) =>
    BigInt((await algorand.send.assetCreate({ sender: from.addr, signer: from.signer, total: 1n, decimals: 0, assetName: 'Audit NFT', unitName: 'ANFT' })).confirmation.assetIndex!)

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    const account = (algos: number) => fixture.context.generateAccount({ initialFunds: algokit.microAlgos(algos * 1_000_000) })
    deployer = await account(2_000)
    creator = await account(1_000)
    seller = await account(1_000)
    buyer = await account(1_000)
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    await algorand.account.ensureFunded(universe.marketplace.client.appAddress, dispenser.addr, (100).algo())
    escrow = (await universe.dao.wallet.getEscrows()).get('rev_marketplace')!.address.toString()
    market = algorand.client.getTypedAppClientById(MarketplaceClient, {
      appId: universe.marketplace.client.appId,
      defaultSender: seller.addr,
      defaultSigner: seller.signer,
    })

    // The creator's collection, registered under one root with a 10% royalty, then sold to the seller.
    nfts = [await mint(creator), await mint(creator), await mint(creator), await mint(creator)]
    tree = MerkleTree.of(nfts.map((nft) => [nft] as [bigint]), [SchemaPart.Uint64])
    meta = new MetaSDK({
      algorand,
      factoryParams: { appId: universe.metaMerkles.appId, defaultSender: creator.addr, defaultSigner: creator.signer },
    })
    await meta.addRoot({ name: COLLECTION, root: tree.root, type: 1n })
    await setRoyalty(10_000n)
    for (const nft of nfts) {
      await algorand.send.assetOptIn({ sender: seller.addr, signer: seller.signer, assetId: nft })
      await algorand.send.assetTransfer({ sender: creator.addr, signer: creator.signer, assetId: nft, amount: 1n, receiver: seller.addr })
      await algorand.send.assetOptIn({ sender: buyer.addr, signer: buyer.signer, assetId: nft })
    }
  }, 600_000)

  test('MKT-03: a royalty raised above what the seller accepted reverts the listing; at the agreed royalty it goes through', async () => {
    const nft = nfts[0]
    // The seller was shown 10%. The creator raises the record to the cap before the listing lands.
    await setRoyalty(65_536n)
    await expectContractError(list(nft, 100_000_000n, { name: COLLECTION, proof: proofOf(nft), maxCreatorRoyalty: 10_000n }), 'errRamx')
    expect((await holding(seller.addr, nft))?.amount).toBe(1n)

    // A seller that accepts the cap lists at it.
    const atCap = await list(nft, 100_000_000n, { name: COLLECTION, proof: proofOf(nft), maxCreatorRoyalty: 50_000n })
    expect((await atCap.state()).creatorRoyalty).toBe(50_000n)
    await universe.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: atCap.client.appId })

    // Back at 10%, the bound the seller gave is met exactly.
    await setRoyalty(10_000n)
    const listing = await list(nft, 100_000_000n, { name: COLLECTION, proof: proofOf(nft), maxCreatorRoyalty: 10_000n })
    expect((await listing.state()).creatorRoyalty).toBe(10_000n)
    await universe.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: listing.client.appId })
    expect((await holding(seller.addr, nft))?.amount).toBe(1n)

    // Without a proof the listing pays the protocol default, and a bound below it is still honoured.
    await expectContractError(list(nft, 100_000_000n, { maxCreatorRoyalty: 4_999n }), 'errRamx')
    const byDefault = await list(nft, 100_000_000n, { maxCreatorRoyalty: 5_000n })
    expect((await byDefault.state()).creatorRoyalty).toBe(5_000n)
    await universe.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: byDefault.client.appId })
  }, 480_000)

  test('MKT-05: a price whose shares cannot fit inside it is refused at list and at changePrice', async () => {
    const nft = nfts[0]
    await setRoyalty(65_536n) // the 50% cap
    // 4 units owe 2 (creator) + 1 (protocol) + 1 + 1 (both marketplaces) = 5
    await expectContractError(list(nft, 4n, { name: COLLECTION, proof: proofOf(nft), maxCreatorRoyalty: 50_000n }), 'errPrlo')
    expect((await holding(seller.addr, nft))?.amount).toBe(1n)

    const listing = await list(nft, 5n, { name: COLLECTION, proof: proofOf(nft), maxCreatorRoyalty: 50_000n })
    await expectContractError(listing.changePrice({ sender: seller.addr, signer: seller.signer, price: 4n }), 'errPrlo')
    expect((await listing.state()).price).toBe(5n)
    // 5 = 2 + 1 + 2 settles, with nothing left for the seller
    await purchase(listing.client.appId)
    expect((await holding(buyer.addr, nft))?.amount).toBe(1n)
    await setRoyalty(10_000n)

    // The lowest price still lists at the default royalty: 4 = 1 + 1 + 2.
    const lowest = await list(nfts[1], 4n)
    expect((await lowest.state()).price).toBe(4n)
    await universe.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: lowest.client.appId })
  }, 480_000)

  test('MKT-06: a unit of the payment asset sent to a listing does not block its delist', async () => {
    const nft = nfts[1]
    const pay = BigInt((await algorand.send.assetCreate({ sender: deployer.addr, signer: deployer.signer, total: 1_000_000n, decimals: 0, assetName: 'Audit pay', unitName: 'APAY' })).confirmation.assetIndex!)
    // the seller never opts into the payment asset
    const listing = await list(nft, 1_000n, { paymentAsset: pay })
    await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId: pay, amount: 1n, receiver: listing.client.appAddress })
    const creatorBefore = (await holding(deployer.addr, pay))!.amount

    await universe.marketplace.delist({ sender: seller.addr, signer: seller.signer, appId: listing.client.appId })

    expect((await holding(seller.addr, nft))?.amount).toBe(1n)
    expect(await holding(seller.addr, pay)).toBeUndefined()
    // the unit nobody could take went back to the payment asset's creator
    expect((await holding(deployer.addr, pay))!.amount - creatorBefore).toBe(1n)
    await expect(algorand.client.algod.getApplicationByID(Number(listing.client.appId)).do()).rejects.toThrow()
  }, 480_000)

  test('MKT-07: a fee an unfunded marketplace address cannot receive goes to the DAO escrow, and the sale settles', async () => {
    // A control sale with a funded listing-side marketplace shows what that side is paid.
    const funded = algorand.account.random()
    await algorand.account.ensureFunded(funded.addr, deployer.addr, algokit.microAlgos(1_000_000))
    const control = await list(nfts[1], 1_000_000n, { marketplace: funded.addr.toString() })
    const fundedBefore = await balance(funded.addr)
    await purchase(control.client.appId)
    const fee = (await balance(funded.addr)) - fundedBefore
    expect(fee).toBeGreaterThan(0n)
    // far below the minimum balance of an account, so an unfunded address cannot take it
    expect(fee).toBeLessThan(100_000n)

    const empty = algorand.account.random().addr.toString()
    const listing = await list(nfts[2], 1_000_000n, { marketplace: empty })
    const escrowBefore = await balance(escrow)
    await purchase(listing.client.appId)

    expect((await holding(buyer.addr, nfts[2]))?.amount).toBe(1n)
    expect(await balance(empty)).toBe(0n)
    // the escrow received the protocol fee and the fee the empty address could not take
    expect((await balance(escrow)) - escrowBefore).toBeGreaterThan(fee)
  }, 480_000)

  // From here on the revenue escrow's payout cycle is left open.
  test('MKT-01: with the payout cycle open, a new NFT is still opted in and listed, for one opt-in', async () => {
    const attacker = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(50_000_000) })
    await universe.dao.wallet.usePlugin({
      sender: attacker.addr.toString(),
      signer: attacker.signer,
      callerType: CallerType.Global,
      escrow: 'rev_marketplace',
      calls: [universe.revenueManagerPlugin.startEscrowDisbursement({ sender: attacker.addr.toString(), signer: attacker.signer })],
    })

    // The route that also opts the revenue escrow in needs an idle escrow.
    const blocked = await mint(seller)
    await expectContractError(universe.marketplace.optIn({ sender: seller.addr, signer: seller.signer, asset: blocked }), 'errEnid')

    // optInPrize takes exactly one asset opt-in, and touches the factory alone.
    const payment = (amount: bigint) =>
      algorand.createTransaction.payment({ sender: seller.addr, receiver: market.appAddress, amount: algokit.microAlgos(amount) })
    await expectContractError(
      market.send.optInPrize({ args: { payment: await payment(200_000n), asset: blocked }, extraFee: algokit.microAlgos(1_000) }),
      'errIpay',
    )
    const minBefore = (await algorand.account.getInformation(market.appAddress)).minBalance.microAlgo
    await market.send.optInPrize({ args: { payment: await payment(100_000n), asset: blocked }, extraFee: algokit.microAlgos(1_000) })
    expect(await holding(market.appAddress, blocked)).toBeDefined()
    expect(await holding(escrow, blocked)).toBeUndefined()
    expect((await algorand.account.getInformation(market.appAddress)).minBalance.microAlgo - minBefore).toBe(100_000n)

    // And the SDK's list does it on its own for an NFT the factory has never seen.
    const fresh = await mint(seller)
    const quoted = await universe.marketplace.quoteListCost({ prize: fresh, paymentAsset: 0n })
    const sellerBefore = await balance(seller.addr)
    const listing = await list(fresh, 5_000_000n)
    expect(listing.client.appId).toBeGreaterThan(0n)
    expect(await holding(escrow, fresh)).toBeUndefined()
    expect((await holding(listing.client.appAddress, fresh))?.amount).toBe(1n)
    // the seller paid the listing cost and one opt-in (plus fees), not the five the escrow route charges
    const spent = sellerBefore - (await balance(seller.addr))
    expect(spent).toBeGreaterThanOrEqual(quoted + 100_000n)
    expect(spent).toBeLessThan(quoted + 200_000n)
  }, 480_000)

  // Last of all: this test points the Marketplace at another revenue escrow.
  test('audit 13 XSY-03: a sale pays the escrow the Marketplace names when it settles, not the one of the listing\'s creation', async () => {
    const sender = deployer.addr.toString()
    const signer = deployer.signer
    const dao = new AkitaDaoSDK({ algorand, factoryParams: { appId: universe.dao.appId, defaultSender: sender, defaultSigner: signer } })
    await dao.getWallet()
    const wallet = dao.wallet
    await dao.client.appClient.fundAppAccount({ amount: algokit.microAlgos(1_000_000) })

    // Listed while the Marketplace names `rev_marketplace`: that is the escrow the listing stores.
    const nft = await mint(seller)
    await algorand.send.assetOptIn({ sender: buyer.addr, signer: buyer.signer, assetId: nft })
    const listing = await list(nft, 10_000_000n)

    // The DAO creates another escrow ...
    const NEXT = 'rev_market_next'
    const escrowMbr = await wallet.getMbr({ escrow: NEXT, methodCount: 0n, plugin: '', groups: 0n })
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgos(escrowMbr.newEscrowMintCost + 1_000_000n) })
    await proposeAndExecute(dao, [{ type: ProposalActionEnum.NewEscrow, escrow: NEXT, address: ZERO_ADDRESS }])
    const next = await wallet.getEscrow(NEXT)
    const nextAddress = algosdk.getApplicationAddress(next.id).toString()
    // (an escrow must hold its own minimum balance before it can be paid a fee smaller than that)
    const short = 100_000n - (await balance(nextAddress))
    if (short > 0n) await algorand.send.payment({ sender: deployer.addr, signer: deployer.signer, receiver: nextAddress, amount: algokit.microAlgos(short) })

    // ... and points the Marketplace at it through the update plugin, approved by an UpgradeApp proposal.
    const marketId = universe.marketplace.client.appId
    const execution = await wallet.build.usePlugin({
      sender, signer, lease: `mkt_escrow_${Date.now() % 1_000_000}`, windowSize: 2000n, callerType: CallerType.Global,
      calls: [universe.updatePlugin.updateAkitaDaoEscrowForApp({ sender, signer, appId: marketId, newEscrow: { name: NEXT, app: next.id } })],
    })
    const walletMbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(execution.windows.length) })
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgos(walletMbr.plugins + walletMbr.executions + 2_000_000n) })
    await proposeAndExecute(dao, [{
      type: ProposalActionEnum.UpgradeApp, app: marketId,
      executionKey: execution.lease, groups: execution.ids,
      firstValid: execution.firstValid, lastValid: execution.lastValid,
    }])
    for (const window of execution.windows) await sendPrepared(window, algorand.client.algod)
    const configured = await market.state.global.akitaDaoEscrow()
    expect(configured?.name).toBe(NEXT)
    expect(configured?.app).toBe(next.id)

    // The sale of the listing made before the change pays the escrow the Marketplace names now.
    const oldBefore = await balance(escrow)
    const nextBefore = await balance(nextAddress)
    await purchase(listing.client.appId)
    expect((await holding(buyer.addr, nft))?.amount).toBe(1n)
    expect(await balance(escrow)).toBe(oldBefore)
    expect((await balance(nextAddress)) - nextBefore).toBeGreaterThan(0n)
  }, 480_000)
})
