/**
 * Wave 0 shared helpers (utils/functions.ts, utils/programs.ts, utils/base-contracts/factory.ts)
 * exercised directly through the test-only MockSharedHelpers harness.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk from 'algosdk'
import { beforeAll, describe, expect, test } from 'vitest'
import { MockFakeWalletFactory } from '../artifacts/mocks/fake-wallet/MockFakeWalletClient'
import { MockSharedHelpersClient, MockSharedHelpersFactory } from '../artifacts/mocks/shared-helpers/MockSharedHelpersClient'
import {
  errClawbackForbidden,
  errCloseForbidden,
  errInvalidAsset,
  errInvalidAssetAmount,
  errInvalidPaymentAmount,
  errInvalidPaymentReceiver,
  errInvalidPaymentSender,
  errPluginNotAuthAddr,
  errProgramTooLarge,
  errRekeyForbidden,
} from './errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()
const ZERO = algosdk.ALGORAND_ZERO_ADDRESS_STRING

describe('Wave 0 shared helpers', () => {
  let algorand: algokit.AlgorandClient
  let deployer: TransactionSignerAccount
  let alice: TransactionSignerAccount
  let bob: TransactionSignerAccount
  let helpers: MockSharedHelpersClient

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    deployer = await fixture.context.generateAccount({ initialFunds: (100).algo() })
    alice = await fixture.context.generateAccount({ initialFunds: (20).algo() })
    bob = await fixture.context.generateAccount({ initialFunds: (20).algo() })

    const factory = algorand.client.getTypedAppFactory(MockSharedHelpersFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    })
    helpers = (await factory.send.create.bare()).appClient
    await helpers.appClient.fundAppAccount({ amount: (5).algo() })
  })

  const pay = (from: TransactionSignerAccount, extra: Partial<Parameters<typeof algorand.createTransaction.payment>[0]> = {}) =>
    algorand.createTransaction.payment({
      sender: from.addr,
      signer: from.signer,
      receiver: helpers.appAddress,
      amount: microAlgo(1_000),
      ...extra,
    })

  describe('assertBoundPayment / assertSafePayment', () => {
    test('accepts an exact plain payment', async () => {
      await helpers.send.checkPayment({
        sender: alice.addr,
        signer: alice.signer,
        args: { payment: pay(alice), sender: alice.addr.toString(), receiver: helpers.appAddress.toString(), amount: 1_000n },
      })
      await helpers.send.checkSafePayment({
        sender: alice.addr,
        signer: alice.signer,
        args: { payment: pay(alice), sender: alice.addr.toString() },
      })
    })

    test('rejects the wrong sender, receiver or amount', async () => {
      await expect(helpers.send.checkPayment({
        sender: alice.addr, signer: alice.signer,
        args: { payment: pay(alice), sender: bob.addr.toString(), receiver: helpers.appAddress.toString(), amount: 1_000n },
      })).rejects.toThrow(new RegExp(errInvalidPaymentSender))
      await expect(helpers.send.checkPayment({
        sender: alice.addr, signer: alice.signer,
        args: { payment: pay(alice), sender: alice.addr.toString(), receiver: bob.addr.toString(), amount: 1_000n },
      })).rejects.toThrow(new RegExp(errInvalidPaymentReceiver))
      await expect(helpers.send.checkPayment({
        sender: alice.addr, signer: alice.signer,
        args: { payment: pay(alice), sender: alice.addr.toString(), receiver: helpers.appAddress.toString(), amount: 999n },
      })).rejects.toThrow(new RegExp(errInvalidPaymentAmount))
    })

    test('rejects close-out and rekey', async () => {
      const victim = await fixture.context.generateAccount({ initialFunds: (2).algo() })
      // The app call is sent by alice so the close-out does not leave its sender unable to pay fees.
      await expect(helpers.send.checkSafePayment({
        sender: alice.addr, signer: alice.signer,
        args: { payment: pay(victim, { closeRemainderTo: bob.addr }), sender: victim.addr.toString() },
      })).rejects.toThrow(new RegExp(errCloseForbidden))
      await expect(helpers.send.checkSafePayment({
        sender: alice.addr, signer: alice.signer,
        args: { payment: pay(victim, { rekeyTo: bob.addr }), sender: victim.addr.toString() },
      })).rejects.toThrow(new RegExp(errRekeyForbidden))
      // the failed groups left the account untouched
      const info = await algorand.account.getInformation(victim.addr)
      expect(info.authAddr).toBeUndefined()
    })
  })

  describe('assertPlainPayment / assertExactPayment (payments anyone may send)', () => {
    test('accept an exact plain payment from an account other than the caller', async () => {
      await helpers.send.checkPlainPayment({
        sender: alice.addr, signer: alice.signer,
        args: { payment: { txn: await pay(bob), signer: bob.signer } },
      })
      await helpers.send.checkExactPayment({
        sender: alice.addr, signer: alice.signer,
        args: { payment: { txn: await pay(bob), signer: bob.signer }, receiver: helpers.appAddress.toString(), amount: 1_000n },
      })
    })

    test('reject the wrong receiver or amount, a close-out and a rekey', async () => {
      const exact = (payment: ReturnType<typeof pay>, receiver = helpers.appAddress.toString(), amount = 1_000n) =>
        helpers.send.checkExactPayment({ sender: alice.addr, signer: alice.signer, args: { payment, receiver, amount } })
      await expect(exact(pay(bob), bob.addr.toString())).rejects.toThrow(new RegExp(errInvalidPaymentReceiver))
      await expect(exact(pay(bob), helpers.appAddress.toString(), 999n)).rejects.toThrow(new RegExp(errInvalidPaymentAmount))
      await expect(exact(pay(bob, { closeRemainderTo: alice.addr }))).rejects.toThrow(new RegExp(errCloseForbidden))
      await expect(exact(pay(bob, { rekeyTo: alice.addr }))).rejects.toThrow(new RegExp(errRekeyForbidden))
      await expect(helpers.send.checkPlainPayment({
        sender: alice.addr, signer: alice.signer, args: { payment: pay(bob, { rekeyTo: alice.addr }) },
      })).rejects.toThrow(new RegExp(errRekeyForbidden))
    })
  })

  describe('payer records (sponsorCost / recordPayer / payerOf / releaseDeposit)', () => {
    const PAYER_RECORD_MBR = 28_500n
    const DEPOSIT = 15_300n
    let n = 0
    const newRecord = () => new TextEncoder().encode(`record-${Date.now()}-${n++}-`.padEnd(64, 'x'))
    const balance = async (address: string | algosdk.Address) => (await algorand.account.getInformation(address)).balance.microAlgos
    const minBalance = async () => (await algorand.account.getInformation(helpers.appAddress)).minBalance.microAlgos
    const hold = async (owner: TransactionSignerAccount, payer: TransactionSignerAccount, record: Uint8Array, paid: bigint, amount = DEPOSIT) =>
      helpers.send.hold({
        sender: owner.addr, signer: owner.signer,
        args: { payment: { txn: await pay(payer, { amount: microAlgo(paid) }), signer: payer.signer }, record, amount },
      })
    const release = (caller: TransactionSignerAccount, record: Uint8Array, owner: TransactionSignerAccount, amount = DEPOSIT) =>
      helpers.send.release({
        sender: caller.addr, signer: caller.signer,
        args: { record, owner: owner.addr.toString(), amount },
        extraFee: microAlgo(1_000),
      })
    const heldBy = async (record: Uint8Array, owner: TransactionSignerAccount) =>
      (await helpers.send.heldBy({ args: { record, owner: owner.addr.toString() } })).return

    test('a caller who pays for themselves stores nothing extra and is refunded the deposit', async () => {
      const record = newRecord()
      const minBefore = await minBalance()
      await hold(alice, alice, record, DEPOSIT)
      // no payer record: the app's minimum balance did not move
      expect(await minBalance()).toBe(minBefore)
      expect(await heldBy(record, alice)).toBe(alice.addr.toString())

      const before = await balance(alice.addr)
      const { return: receiver } = await release(bob, record, alice)
      expect(receiver).toBe(alice.addr.toString())
      expect((await balance(alice.addr)) - before).toBe(DEPOSIT)
    })

    test('another payer funds its payer record, is remembered, and gets both back', async () => {
      const record = newRecord()
      // the deposit alone is not enough from another payer
      await expect(hold(alice, bob, record, DEPOSIT)).rejects.toThrow(new RegExp(errInvalidPaymentAmount))

      const minBefore = await minBalance()
      await hold(alice, bob, record, DEPOSIT + PAYER_RECORD_MBR)
      // the payer record costs exactly what the payer added
      expect((await minBalance()) - minBefore).toBe(PAYER_RECORD_MBR)
      expect(await heldBy(record, alice)).toBe(bob.addr.toString())

      const payerBefore = await balance(bob.addr)
      const ownerBefore = await balance(alice.addr)
      const { return: receiver } = await release(deployer, record, alice)
      expect(receiver).toBe(bob.addr.toString())
      expect((await balance(bob.addr)) - payerBefore).toBe(DEPOSIT + PAYER_RECORD_MBR)
      expect(await balance(alice.addr)).toBe(ownerBefore)
      // the payer record is gone with the release
      expect(await minBalance()).toBe(minBefore)
      expect(await heldBy(record, alice)).toBe(alice.addr.toString())
    })

    test('a payer whose account closed forfeits a small refund to the owner; a refund that re-opens the account is paid', async () => {
      const close = (account: TransactionSignerAccount) => algorand.send.payment({
        sender: account.addr, signer: account.signer, receiver: deployer.addr, amount: microAlgo(0), closeRemainderTo: deployer.addr,
      })

      const small = newRecord()
      const leaver = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      await hold(alice, leaver, small, DEPOSIT + PAYER_RECORD_MBR)
      await close(leaver)
      const ownerBefore = await balance(alice.addr)
      const { return: receiver } = await release(deployer, small, alice)
      // 43,800 µALGO cannot open an empty account, so the owner receives all of it
      expect(receiver).toBe(alice.addr.toString())
      expect((await balance(alice.addr)) - ownerBefore).toBe(DEPOSIT + PAYER_RECORD_MBR)
      expect(await balance(leaver.addr)).toBe(0n)

      const large = newRecord()
      const returner = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      await hold(alice, returner, large, 100_000n + PAYER_RECORD_MBR, 100_000n)
      await close(returner)
      const { return: paid } = await release(deployer, large, alice, 100_000n)
      expect(paid).toBe(returner.addr.toString())
      expect(await balance(returner.addr)).toBe(100_000n + PAYER_RECORD_MBR)
    })
  })

  describe('assertBoundAssetTransfer / assertSafeAssetTransfer', () => {
    let assetId: bigint

    beforeAll(async () => {
      // deployer is the clawback; alice holds the asset
      assetId = (await algorand.send.assetCreate({
        sender: deployer.addr, signer: deployer.signer, total: 1_000n, decimals: 0,
        assetName: 'Wave0', unitName: 'W0', clawback: deployer.addr,
      })).assetId
      for (const acct of [alice, bob]) {
        await algorand.send.assetOptIn({ sender: acct.addr, signer: acct.signer, assetId })
      }
      await algorand.send.assetTransfer({ sender: deployer.addr, signer: deployer.signer, receiver: alice.addr, assetId, amount: 100n })
    })

    const xfer = (from: TransactionSignerAccount, extra: Record<string, unknown> = {}) =>
      algorand.createTransaction.assetTransfer({
        sender: from.addr, signer: from.signer, receiver: bob.addr, assetId, amount: 5n, ...extra,
      })

    test('accepts an exact plain transfer', async () => {
      await helpers.send.checkAssetTransfer({
        sender: alice.addr, signer: alice.signer,
        args: { xfer: xfer(alice), sender: alice.addr.toString(), receiver: bob.addr.toString(), asset: assetId, amount: 5n },
      })
    })

    test('rejects wrong asset, amount and sender', async () => {
      await expect(helpers.send.checkAssetTransfer({
        sender: alice.addr, signer: alice.signer,
        args: { xfer: xfer(alice), sender: alice.addr.toString(), receiver: bob.addr.toString(), asset: assetId + 1n, amount: 5n },
      })).rejects.toThrow(new RegExp(errInvalidAsset))
      await expect(helpers.send.checkAssetTransfer({
        sender: alice.addr, signer: alice.signer,
        args: { xfer: xfer(alice), sender: alice.addr.toString(), receiver: bob.addr.toString(), asset: assetId, amount: 6n },
      })).rejects.toThrow(new RegExp(errInvalidAssetAmount))
      await expect(helpers.send.checkSafeAssetTransfer({
        sender: alice.addr, signer: alice.signer,
        args: { xfer: xfer(alice), sender: bob.addr.toString() },
      })).rejects.toThrow(new RegExp(errInvalidPaymentSender))
    })

    test('rejects clawback-sourced transfers', async () => {
      // deployer (clawback) pulls from alice: txn.sender is the deployer, assetSender is alice
      await expect(helpers.send.checkSafeAssetTransfer({
        sender: deployer.addr, signer: deployer.signer,
        args: { xfer: xfer(deployer, { clawbackTarget: alice.addr }), sender: deployer.addr.toString() },
      })).rejects.toThrow(new RegExp(errClawbackForbidden))
    })

    test('rejects assetCloseTo', async () => {
      await expect(helpers.send.checkSafeAssetTransfer({
        sender: alice.addr, signer: alice.signer,
        args: { xfer: xfer(alice, { closeAssetTo: bob.addr }), sender: alice.addr.toString() },
      })).rejects.toThrow(new RegExp(errCloseForbidden))
    })
  })

  describe('getControlledSpendingAccount', () => {
    test('rejects a wallet whose spending address is not rekeyed to the caller (spoofed wallet)', async () => {
      const fakeFactory = algorand.client.getTypedAppFactory(MockFakeWalletFactory, {
        defaultSender: deployer.addr, defaultSigner: deployer.signer,
      })
      // Spoof: spending address = the helper app's own (never rekeyed) account
      const { appClient: fake } = await fakeFactory.send.create.create({
        args: { controlledAddress: alice.addr.toString(), referrer: ZERO, spendingAddress: helpers.appAddress.toString() },
      })
      await expect(helpers.send.controlledSpending({ args: { wallet: fake.appId } }))
        .rejects.toThrow(new RegExp(errPluginNotAuthAddr))
    })

    test('returns the spending account when it is rekeyed to the caller', async () => {
      const spender = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      await algorand.send.payment({ sender: spender.addr, signer: spender.signer, receiver: spender.addr, amount: microAlgo(0), rekeyTo: helpers.appAddress })
      const fakeFactory = algorand.client.getTypedAppFactory(MockFakeWalletFactory, {
        defaultSender: deployer.addr, defaultSigner: deployer.signer,
      })
      const { appClient: fake } = await fakeFactory.send.create.create({
        args: { controlledAddress: alice.addr.toString(), referrer: ZERO, spendingAddress: spender.addr.toString() },
      })
      const result = await helpers.send.controlledSpending({ args: { wallet: fake.appId } })
      expect(result.return).toBe(spender.addr.toString())
    })
  })

  describe('programExtraPages', () => {
    test('derives extra pages from size with a floor, and caps at 8 pages', async () => {
      const extra = async (a: bigint, c: bigint, min: bigint) =>
        (await helpers.send.extraPages({ args: { approvalSize: a, clearSize: c, minExtraPages: min } })).return
      expect(await extra(100n, 4n, 0n)).toBe(0n)
      expect(await extra(100n, 4n, 3n)).toBe(3n)       // legacy floor for factory children
      expect(await extra(8_000n, 4n, 0n)).toBe(3n)
      expect(await extra(9_000n, 4n, 3n)).toBe(4n)     // > 8 KB grows past the legacy 3
      expect(await extra(16_380n, 4n, 0n)).toBe(7n)
      await expect(helpers.send.extraPages({ args: { approvalSize: 16_385n, clearSize: 0n, minExtraPages: 0n } }))
        .rejects.toThrow(new RegExp(errProgramTooLarge))
    })
  })

  describe('releasedRefund (factory refundReleased)', () => {
    const spawnChild = async (funding: bigint) => {
      const result = await helpers.send.spawn({ args: { funding }, extraFee: microAlgo(2_000) })
      return result.return!
    }

    test('refunds the child balance plus released creator MBR', async () => {
      const child = await spawnChild(250_000n)
      const receiver = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const before = (await algorand.account.getInformation(receiver.addr)).balance.microAlgos
      const appBefore = (await algorand.account.getInformation(helpers.appAddress)).balance.microAlgos

      const { return: refund } = await helpers.send.reap({
        args: { child, recorded: 10_000_000n, receiver: receiver.addr.toString() },
        extraFee: microAlgo(3_000),
      })

      // child closed 250_000 back; deleting it released the 100_000 base page MBR
      expect(refund).toBe(350_000n)
      const after = (await algorand.account.getInformation(receiver.addr)).balance.microAlgos
      expect(after - before).toBe(350_000n)
      // the harness received the 250_000 close and paid out exactly that plus the 100_000 of
      // min-balance the deletion freed: its spendable balance (balance - minBalance) is unchanged
      const appAfterInfo = await algorand.account.getInformation(helpers.appAddress)
      expect(appBefore - appAfterInfo.balance.microAlgos).toBe(100_000n)
    })

    test('caps the refund at the recorded deposit', async () => {
      const child = await spawnChild(250_000n)
      const receiver = await fixture.context.generateAccount({ initialFunds: (1).algo() })
      const { return: refund } = await helpers.send.reap({
        args: { child, recorded: 120_000n, receiver: receiver.addr.toString() },
        extraFee: microAlgo(3_000),
      })
      expect(refund).toBe(120_000n)
    })
  })
})
