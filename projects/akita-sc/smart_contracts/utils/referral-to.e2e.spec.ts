/**
 * Principal resolution, Phase 1: registry-free referral helpers (PHASE-0-SPEC §3.3, §6 conventions).
 *
 * `referralFeeTo(dao, referrer, asset)` and `sendReferralPaymentTo(dao, referrer, asset, amount)` take
 * the referrer directly (the verified principal's `referrer`, or a creation-time stored referrer).
 * They must keep the economics of the registry twins `legacyReferralFeeFor` / `legacySendReferralPaymentFor`
 * for the same referrer, so that Phase 2 targets can switch without changing any quote. Referrers may
 * be any address (binding invariant): an EOA referrer with no Akita wallet is paid.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import type { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { newWallet, WalletSDK } from 'akita-sdk/wallet'
import { RewardsSDK } from 'akita-sdk/rewards'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import { MockReferralProbeClient, MockReferralProbeFactory } from '../artifacts/mocks/referral-probe/MockReferralProbeClient'
import { TimeWarp } from '../../tests/utils/time'
import { errDisbursementNotExpired, errReclaimTargetNotOptedIn } from '../rewards/errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING
/**
 * MinDisbursementsMBR + UserAllocationMBR (rewards/constants.ts, v2): one single-allocation ALGO
 * disbursement whose record holds the reclaimTo field (v1 charged 41,700 + 25,300).
 */
const REFERRAL_MBR = 54_500n + 25_300n
/** utils/constants THIRTY_DAYS: how long a referrer has to claim before the cut can be swept. */
const THIRTY_DAYS = 2_592_000n
const SEND = { coverAppCallInnerTransactionFees: true, maxFee: microAlgo(20_000) } as const

type Info = { leftover: bigint; referralMbr: bigint }
const asInfo = (value: unknown): Info => {
  if (Array.isArray(value)) return { leftover: BigInt(value[0]), referralMbr: BigInt(value[1]) }
  const v = value as Info
  return { leftover: BigInt(v.leftover), referralMbr: BigInt(v.referralMbr) }
}

describe('Registry-free referral helpers (Phase 1)', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let user: TransactionSignerAccount
  let referrer: TransactionSignerAccount
  let universe: AkitaUniverse
  let probe: MockReferralProbeClient
  let wallet: WalletSDK
  let rewards: RewardsSDK
  let escrow: TransactionSignerAccount
  let keeper: TransactionSignerAccount

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    const dispenser = await algorand.account.dispenserFromEnvironment()
    deployer = await fixture.context.generateAccount({ initialFunds: (2_500).algo() })
    user = await fixture.context.generateAccount({ initialFunds: (100).algo() })
    referrer = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    // stands in for the paying service's DAO escrow (the reclaim target)
    escrow = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    keeper = await fixture.context.generateAccount({ initialFunds: (1).algo() })
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2_500).algo())

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} })
    rewards = new RewardsSDK({
      algorand,
      factoryParams: { appId: universe.rewards.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    })

    probe = (await algorand.client.getTypedAppFactory(MockReferralProbeFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    }).send.create.create({ args: { akitaDao: universe.dao.appId } })).appClient
    await probe.appClient.fundAppAccount({ amount: (20).algo() })

    // A REGISTERED genuine wallet whose referrer is `referrer`: the legacy twins find it through the registry.
    wallet = await newWallet({
      algorand,
      factoryParams: { appId: universe.walletFactory.appId, defaultSender: user.addr, defaultSigner: user.signer },
      sender: user.addr,
      signer: user.signer,
      nickname: 'referred',
      referrer: referrer.addr.toString(),
      register: true,
    })
  })

  test('R01 referralFeeTo: zero referrer costs nothing; any referrer costs one referral disbursement, like the legacy twin', async () => {
    expect(await probe.feeTo({ args: { referrer: ZERO, asset: 0n } })).toBe(0n)
    const fee = await probe.feeTo({ args: { referrer: referrer.addr.toString(), asset: 0n } })
    expect(fee).toBe(REFERRAL_MBR)
    // the legacy twin reads the registry with one inner EscrowFactory.get (fee 0): the simulated call pays it
    expect(await probe.legacyFeeFor({ args: { account: wallet.client.appAddress.toString(), asset: 0n }, extraFee: microAlgo(1_000) })).toBe(fee)
    // the quote path resolves the same referrer from the hint, without the registry
    expect(await probe.quote({ args: { wallet: wallet.client.appId } })).toBe(referrer.addr.toString())
    expect(await probe.feeTo({ args: { referrer: await probe.quote({ args: { wallet: wallet.client.appId } }), asset: 0n } })).toBe(fee)
  })

  test('R02 sendReferralPaymentTo with the zero referrer pays nothing', async () => {
    const before = (await algorand.account.getInformation(probe.appAddress)).balance.microAlgo
    const info = asInfo((await probe.send.payTo({ args: { referrer: ZERO, amount: 1_000_000n, reclaimTo: escrow.addr.toString() }, ...SEND })).return)
    expect(info).toEqual({ leftover: 1_000_000n, referralMbr: 0n })
    const after = (await algorand.account.getInformation(probe.appAddress)).balance.microAlgo
    expect(after).toBe(before)
  })

  test('R03 sendReferralPaymentTo has the economics of legacySendReferralPaymentFor for the same referrer', async () => {
    const amount = 1_000_000n
    const fresh = asInfo((await probe.send.payTo({ args: { referrer: referrer.addr.toString(), amount, reclaimTo: escrow.addr.toString() }, ...SEND })).return)
    const legacy = asInfo((await probe.send.payLegacyFor({ args: { account: wallet.client.appAddress.toString(), amount, reclaimTo: escrow.addr.toString() }, ...SEND })).return)
    expect(fresh).toEqual(legacy)
    expect(fresh.referralMbr).toBe(REFERRAL_MBR)
    expect(fresh.leftover).toBeLessThan(amount)
    expect(amount - fresh.leftover).toBeGreaterThanOrEqual(1n)
  })

  test('R04 the minimum cut is 1 µALGO', async () => {
    const info = asInfo((await probe.send.payTo({ args: { referrer: referrer.addr.toString(), amount: 1n, reclaimTo: escrow.addr.toString() }, ...SEND })).return)
    expect(info).toEqual({ leftover: 0n, referralMbr: REFERRAL_MBR })
  })

  test('R05 referrers need not be Akita wallets; the legacy twin pays nothing for an unregistered payer', async () => {
    const outsider = algosdk.generateAccount().addr.toString()
    const fresh = asInfo((await probe.send.payTo({ args: { referrer: outsider, amount: 500_000n, reclaimTo: escrow.addr.toString() }, ...SEND })).return)
    expect(fresh.referralMbr).toBe(REFERRAL_MBR)
    expect(fresh.leftover).toBeLessThan(500_000n)
    // registry semantics: an account with no registered wallet has no referrer
    const legacy = asInfo((await probe.send.payLegacyFor({ args: { account: outsider, amount: 500_000n, reclaimTo: escrow.addr.toString() }, ...SEND })).return)
    expect(legacy).toEqual({ leftover: 500_000n, referralMbr: 0n })
  })
  describe('unclaimed referral cuts are swept to the paying service after 30 days', () => {
    const balance = async (address: string | algosdk.Address) => (await algorand.account.getInformation(address)).balance.microAlgo
    const timeWarp = () => new TimeWarp(algorand)
    const blockTime = async (round: bigint) => BigInt((await algorand.client.algod.block(round).do()).block.header.timestamp)

    /** pays a referral cut through the probe; returns the disbursement it created and the cut */
    const payReferral = async (send: () => Promise<{ return?: unknown; confirmation: { confirmedRound?: bigint } }>, amount: bigint) => {
      const { disbursementId: id } = await rewards.getState()
      const result = await send()
      const info = asInfo(result.return)
      expect(info.referralMbr).toBeGreaterThanOrEqual(REFERRAL_MBR)
      return { id, cut: amount - info.leftover, paidAt: await blockTime(result.confirmation.confirmedRound!) }
    }
    const payAlgo = (to: string, amount: bigint) => payReferral(
      () => probe.send.payTo({ args: { referrer: to, amount, reclaimTo: escrow.addr.toString() }, ...SEND }), amount)

    test('R06 the referrer can claim within 30 days; afterwards the empty disbursement is closed into the escrow', async () => {
      const { id, cut, paidAt } = await payAlgo(referrer.addr.toString(), 2_000_000n)
      const disbursement = await rewards.getDisbursement({ id })
      expect(disbursement.expiration).toBe(paidAt + THIRTY_DAYS)
      expect(await rewards.getReclaimTarget({ id })).toBe(escrow.addr.toString())

      await timeWarp().timeWarp(THIRTY_DAYS - 86_400n)
      const before = await balance(referrer.addr)
      await rewards.claimRewards({ sender: referrer.addr, signer: referrer.signer, rewards: [{ id, asset: 0n }] })
      expect(await balance(referrer.addr) - before).toBe(cut - 2_000n)
      await expect(rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id }))
        .rejects.toThrow(errDisbursementNotExpired)

      await timeWarp().timeWarp(2n * 86_400n)
      const escrowBefore = await balance(escrow.addr)
      await rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id })
      expect(await balance(escrow.addr) - escrowBefore).toBe(REFERRAL_MBR)
      await expect(rewards.getDisbursement({ id })).rejects.toThrow('not found')
    })

    test('R07 an unclaimed ALGO cut is swept to the escrow by an unrelated account, with its MBR', async () => {
      const outsider = algosdk.generateAccount().addr.toString()
      const { id, cut } = await payAlgo(outsider, 3_000_000n)
      await expect(rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id }))
        .rejects.toThrow(errDisbursementNotExpired)

      await timeWarp().timeWarp(THIRTY_DAYS + 60n)
      const escrowBefore = await balance(escrow.addr)
      const rewardsBefore = await balance(rewards.client.appAddress)
      await rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id })
      expect(await balance(escrow.addr) - escrowBefore).toBe(cut + REFERRAL_MBR)
      expect(rewardsBefore - await balance(rewards.client.appAddress)).toBe(cut + REFERRAL_MBR)
    })

    test('R08 an ASA cut is not swept to an escrow that is not opted in; once it opts in, it is', async () => {
      const { assetId: created } = await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000_000_000n, decimals: 0, assetName: 'Referral ASA', unitName: 'RFA',
      })
      const assetId = BigInt(created)
      await probe.send.optInAsset({ args: { asset: assetId }, ...SEND })
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, assetId, amount: 1_000_000n, receiver: probe.appAddress })
      const outsider = algosdk.generateAccount().addr.toString()
      const { id, cut } = await payReferral(() => probe.send.payAsaTo({
        args: { referrer: outsider, asset: assetId, amount: 1_000_000n, reclaimTo: escrow.addr.toString() }, ...SEND,
      }), 1_000_000n)
      expect(cut).toBeGreaterThan(0n)

      await timeWarp().timeWarp(THIRTY_DAYS + 60n)
      await expect(rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id }))
        .rejects.toThrow(errReclaimTargetNotOptedIn)

      await algorand.send.assetOptIn({ sender: escrow.addr, signer: escrow.signer, assetId })
      const escrowBefore = await balance(escrow.addr)
      await rewards.sweepExpired({ sender: keeper.addr, signer: keeper.signer, id })
      expect((await algorand.asset.getAccountInformation(escrow.addr, assetId)).balance).toBe(cut)
      expect(await balance(escrow.addr) - escrowBefore).toBe(REFERRAL_MBR)
    })
  })
})
