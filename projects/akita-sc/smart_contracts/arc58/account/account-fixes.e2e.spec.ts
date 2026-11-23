/**
 * Regression tests for the 2026-10-02 account-family fixes:
 * ACC-02 (coverFees), ACC-03 (drip), ACC-05 (plugin MBR refunds), ACC-06 (co-admin keys),
 * ACC-08 (base factory bytecode init) and ACC-10a (admin != controlled address).
 * ACC-04 lives in reclaim.e2e.spec.ts, ACC-07 in escrow.e2e.spec.ts, ACC-09 in keys/passkey.e2e.spec.ts.
 */
import { Config, microAlgo } from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { CallerType, isDripAllowance, NewEscrowFeeAmount, newWallet, PayPluginSDK, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { AkitaUniverse, buildAkitaUniverse } from '../../../tests/fixtures/dao'
import { deployTestPayPlugin as deployPayPlugin } from '../../../tests/fixtures/plugins/pay'
import { expectContractError } from '../../../tests/utils/errors'
import { TimeWarp } from '../../../tests/utils/time'
import { MockAdminPluginClient, MockAdminPluginFactory } from '../../artifacts/mocks/admin-plugin/MockAdminPluginClient'
import { MockInnerWalletCallerFactory } from '../../artifacts/mocks/inner-wallet-caller/MockInnerWalletCallerClient'
import { errNotAkitaDao } from '../../errors'
import { errAdminCannotBeControlled, errAdminOnly, errAllowanceExceeded, errControlledAddressNotProven, errCoverFeesRequiresCaller, errNotAWallet } from './errors'
import { MockFakeUpdatableWalletFactory } from '../../artifacts/mocks/fake-updatable-wallet/MockFakeUpdatableWalletClient'

Config.configure({ populateAppCallResources: true })

const MAX_UINT64 = 18_446_744_073_709_551_615n
const ZERO = ALGORAND_ZERO_ADDRESS_STRING

describe('Account fixes (ACC-02/03/05/06/08/10a)', () => {
  const localnet = algorandFixture()
  let universe: AkitaUniverse
  let walletFactory: WalletFactorySDK
  let payPluginSdk: PayPluginSDK
  let timeWarp: TimeWarp
  let wallet: WalletSDK
  let sender: string
  let signer: TransactionSignerAccount['signer']

  beforeAll(async () => {
    await localnet.newScope()
    const { algorand, context: { testAccount } } = localnet
    sender = testAccount.toString()
    signer = testAccount.signer
    timeWarp = new TimeWarp(algorand)
    universe = await buildAkitaUniverse({ fixture: localnet, sender, signer, apps: {} })
    walletFactory = universe.walletFactory
    payPluginSdk = await deployPayPlugin({ fixture: localnet, sender, signer })
  })

  beforeEach(async () => {
    await localnet.newScope()
    const { algorand, context: { testAccount } } = localnet
    sender = testAccount.toString()
    signer = testAccount.signer
    const dispenser = await algorand.account.dispenserFromEnvironment()
    await algorand.account.ensureFunded(sender, dispenser.addr, (200).algos())
    wallet = await newWallet({
      factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: signer },
      readerAccount: sender,
      algorand,
      nickname: 'fixes_wallet',
    })
  })

  const balance = async (address: string) =>
    (await localnet.context.algorand.account.getInformation(address)).balance.microAlgos

  /** A wallet whose controlled address is an external account (so MBR moves are real payments). */
  const externalWallet = async () => {
    const { algorand, context: { generateAccount } } = localnet
    const external = await generateAccount({ initialFunds: (10).algos() })
    // SG-04: the SDK puts the external account's rekey to the factory in the creation group
    const w = await newWallet({
      factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: signer },
      readerAccount: sender,
      algorand,
      nickname: 'external_fixes',
      controlledAddress: external.addr.toString(),
      controlledSigner: external.signer,
    })
    return { w, external: external.addr.toString() }
  }

  const rawAddPluginArgs = (overrides: Record<string, unknown>) => ({
    plugin: payPluginSdk.appId,
    caller: sender,
    escrow: '',
    admin: false,
    delegationType: 0,
    lastValid: MAX_UINT64,
    cooldown: 0n,
    methods: [] as [Uint8Array, bigint][],
    useRounds: false,
    useExecutionKey: false,
    coverFees: false,
    canReclaim: false,
    defaultToEscrow: false,
    ...overrides,
  })

  describe('ACC-02 coverFees', () => {
    test('a grant anyone can call cannot cover fees, by either install method', async () => {
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins * 4n) })

      await expectContractError(
        wallet.client.send.arc58AddPlugin({ args: rawAddPluginArgs({ caller: ZERO, coverFees: true }) }),
        errCoverFeesRequiresCaller,
      )
      await expectContractError(
        wallet.client.send.arc58AddNamedPlugin({ args: { name: 'open_fees', ...rawAddPluginArgs({ caller: ZERO, coverFees: true }) } }),
        errCoverFeesRequiresCaller,
      )
      // a specific caller may have fee cover, and an open grant may exist without it
      await wallet.client.send.arc58AddPlugin({ args: rawAddPluginArgs({ coverFees: true }) })
      await wallet.client.send.arc58AddPlugin({ args: rawAddPluginArgs({ caller: ZERO }) })
    })

    test('a direct call on a caller-specific grant is reimbursed', async () => {
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins + 5_000_000n) })
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Other, caller: sender, coverFees: true })

      const senderBefore = await balance(sender)
      const walletBefore = await balance(wallet.client.appAddress.toString())
      await wallet.usePlugin({
        consolidateFees: true,
        calls: [payPluginSdk.pay({ payments: [{ receiver: sender, amount: 1_000n, asset: 0 }] })],
      })
      // all group fees sit on the rekey call and are reimbursed: the caller nets exactly the payment
      expect(await balance(sender) - senderBefore).toBe(1_000n)
      expect(walletBefore - await balance(wallet.client.appAddress.toString())).toBeGreaterThan(1_000n)
    })

    test('an inner-group call is not reimbursed (no fee amplification)', async () => {
      const { algorand } = localnet
      const callerFactory = algorand.client.getTypedAppFactory(MockInnerWalletCallerFactory, { defaultSender: sender, defaultSigner: signer })
      const { appClient: innerCaller } = await callerFactory.send.create.bare()
      await innerCaller.appClient.fundAppAccount({ amount: (2).algos() })

      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins + 1_000_000n) })
      await wallet.addPlugin({
        client: payPluginSdk, callerType: CallerType.Other, caller: innerCaller.appAddress.toString(),
        coverFees: true,
      })

      const walletBefore = await balance(wallet.client.appAddress.toString())
      await innerCaller.send.useGrant({
        args: { wallet: wallet.appId, payPlugin: payPluginSdk.appId, rekeyFee: 200_000n },
        extraFee: microAlgo(5_000n),
      })
      // before ACC-02 the wallet paid the 200_000 µALGO inner fee back to the caller app
      expect(await balance(wallet.client.appAddress.toString())).toBe(walletBefore)
    })
  })

  describe('ACC-03 drip allowance', () => {
    const setupDrip = async (escrow: string, rate: bigint, max: bigint, interval: bigint, fund: bigint) => {
      const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })
      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(fund + mbr.plugins + mbr.newEscrowMintCost + mbr.allowances),
      })
      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        escrow,
        allowances: [{ type: 'drip', asset: 0n, rate, interval, max, useRounds: true }],
      })
    }

    const spend = (escrow: string, amount: bigint) => wallet.usePlugin({
      escrow,
      callerType: CallerType.Global,
      calls: [payPluginSdk.pay({ payments: [{ receiver: sender, amount, asset: 0 }] })],
      fundsRequest: [{ amount, asset: 0n }],
    })

    test('frequent zero-amount requests no longer erase accrual', async () => {
      const escrow = 'drip_grief'
      await setupDrip(escrow, 1_000_000n, 10_000_000n, 10n, 20_000_000n)
      await spend(escrow, 10_000_000n) // empty the bucket

      // A third party pokes the allowance every 6 rounds (< one interval) with a 0 request.
      for (let i = 0; i < 5; i++) {
        await timeWarp.warpForwardRounds(5n)
        await spend(escrow, 0n)
      }
      // ~30 rounds passed: at least 3 whole intervals accrued. Before ACC-03 this was 0.
      await spend(escrow, 3_000_000n)
      const info = await wallet.getAllowance({ asset: 0n, escrow })
      if (!isDripAllowance(info)) throw new Error('expected drip')
      expect((info.last - info.start) % info.interval).toBe(0n)
    })

    test('accrual saturates at max instead of overflowing', async () => {
      const escrow = 'drip_big'
      // rate * intervals overflows uint64 after 16 intervals
      await setupDrip(escrow, 1n << 60n, 1n << 62n, 1n, 1_000_000n)
      await timeWarp.warpForwardRounds(20n)
      await spend(escrow, 1n)
      const info = await wallet.getAllowance({ asset: 0n, escrow })
      if (!isDripAllowance(info)) throw new Error('expected drip')
      expect(info.lastLeftover).toBe((1n << 62n) - 1n)
      // and a request above max still fails
      await expectContractError(spend(escrow, (1n << 62n) + 1n), errAllowanceExceeded)
    })
  })

  describe('ACC-05 plugin MBR refunds', () => {
    test('removePlugin refunds the grant MBR to an external controlled address', async () => {
      const { w, external } = await externalWallet()
      const before = await balance(external)
      await w.addPlugin({
        client: payPluginSdk, callerType: CallerType.Other, caller: sender,
        methods: [{ name: [new Uint8Array([1, 2, 3, 4]), new Uint8Array([5, 6, 7, 8])], cooldown: 0n }],
      })
      expect(await balance(external)).toBeLessThan(before)
      await w.removePlugin({ plugin: payPluginSdk.appId, caller: sender, escrow: '' })
      expect(await balance(external)).toBe(before)
    })

    test('a named alias can be removed after its grant was removed', async () => {
      const { w, external } = await externalWallet()
      const before = await balance(external)
      await w.addPlugin({ client: payPluginSdk, callerType: CallerType.Other, caller: sender, name: 'pay_alias' })
      await w.removePlugin({ plugin: payPluginSdk.appId, caller: sender, escrow: '' })
      await w.removeNamedPlugin({ name: 'pay_alias' })
      expect(await balance(external)).toBe(before)
      // the name is free again
      await w.addPlugin({ client: payPluginSdk, callerType: CallerType.Other, caller: sender, name: 'pay_alias' })
    })

    // 2026-10-04 review: every MBR move to/from an external controlled address is an inner payment, so
    // the outer call carries one extra min fee for it. Fee coverage is switched off so the SDK's own
    // extraFee is all the group pays: before the fix addAllowances/removeAllowances (and newEscrow,
    // add/removeExecutionKey) failed with "fee too small" here. Exact amounts: no surplus either.
    test('MBR-moving calls carry exactly one min fee per inner MBR payment/refund (fee coverage off)', async () => {
      const { w, external } = await externalWallet()
      w.setSendParams({ sender, signer, populateAppCallResources: true, coverAppCallInnerTransactionFees: false })
      const escrow = 'mbr_fee'
      const lease = new Uint8Array(32).fill(7)
      const mbr = await w.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 1n })
      const step = async (fn: () => Promise<unknown>) => {
        const [s0, e0] = [await balance(sender), await balance(external)]
        await fn()
        return { fee: s0 - await balance(sender), external: await balance(external) - e0 }
      }

      // minted escrow: factory path (NewEscrowFeeAmount) + the escrow-box payment from the controlled address
      const minted = await step(() => w.newEscrow({ escrow, address: ZERO }))
      expect(minted.fee).toBe(1_000n + NewEscrowFeeAmount + 1_000n)
      // newEscrowMintCost also counts the 12,100 µA legacy registration MBR, which newEscrow does not pay
      expect(minted.external).toBe(-(mbr.newEscrowMintCost - 12_100n))

      const added = await step(() => w.addAllowances({ escrow, allowances: [{ type: 'flat', asset: 0n, amount: 1_000n }] }))
      expect(added).toEqual({ fee: 2_000n, external: -mbr.allowances })
      const removed = await step(() => w.removeAllowances({ escrow, assets: [0n] }))
      expect(removed).toEqual({ fee: 2_000n, external: mbr.allowances })

      const keyAdded = await step(() => w.addExecutionKey({ lease, groups: [lease], firstValid: 1n, lastValid: 2n }))
      expect(keyAdded).toEqual({ fee: 2_000n, external: -mbr.executions })
      const keyRemoved = await step(() => w.removeExecutionKey({ lease }))
      expect(keyRemoved).toEqual({ fee: 2_000n, external: mbr.executions })

      // the group composer applies the same rule
      const grouped = await step(() => w.group()
        .addAllowances({ escrow, allowances: [{ type: 'flat', asset: 0n, amount: 1_000n }] })
        .removeAllowances({ escrow, assets: [0n] })
        .send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: false }))
      expect(grouped).toEqual({ fee: 4_000n, external: 0n })
    })
  })

  describe('ACC-06 co-admin keys', () => {
    test('assignDomain with an empty domain revokes a co-admin key and refunds its MBR', async () => {
      const { w, external } = await externalWallet()
      const { generateAccount } = localnet.context
      const coAdmin = await generateAccount({ initialFunds: (1).algos() })
      const domain = await w.client.state.global.domain()
      expect(domain).not.toBe('')

      const before = await balance(external)
      await w.client.send.assignDomain({ args: { caller: coAdmin.addr.toString(), domain: domain! }, extraFee: microAlgo(1_000n) })
      await w.client.send.setNickname({ sender: coAdmin.addr, signer: coAdmin.signer, args: { nickname: 'by co-admin' } })

      await w.removeDomainKey({ address: coAdmin.addr.toString() })
      expect(await balance(external)).toBe(before)
      await expectContractError(
        w.client.send.setNickname({ sender: coAdmin.addr, signer: coAdmin.signer, args: { nickname: 'revoked' } }),
        errAdminOnly,
      )
    })

    test('an admin-plugin admin change (recovery) disables every co-admin key', async () => {
      const { algorand, context: { generateAccount } } = localnet
      const coAdmin = await generateAccount({ initialFunds: (1).algos() })
      const newAdmin = await generateAccount({ initialFunds: (1).algos() })
      const domain = (await wallet.client.state.global.domain())!
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: domain, groups: 0n })
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins + mbr.domainKeys + 1_000_000n) })
      await wallet.client.send.assignDomain({ args: { caller: coAdmin.addr.toString(), domain } })

      const adminPluginFactory = algorand.client.getTypedAppFactory(MockAdminPluginFactory, { defaultSender: sender, defaultSigner: signer })
      const { appClient: adminPlugin } = await adminPluginFactory.send.create.bare()
      await wallet.client.send.arc58AddPlugin({ args: rawAddPluginArgs({ plugin: adminPlugin.appId, admin: true }) })

      await recoverWith(adminPlugin, newAdmin.addr.toString())

      expect(await wallet.client.state.global.admin()).toBe(newAdmin.addr.toString())
      expect(await wallet.client.state.global.domain()).toBe('')
      await expectContractError(
        wallet.client.send.setNickname({ sender: coAdmin.addr, signer: coAdmin.signer, args: { nickname: 'stale co-admin' } }),
        errAdminOnly,
      )
      // the new admin can deliberately re-enable keys bound to a domain
      await wallet.client.send.setDomain({ sender: newAdmin.addr, signer: newAdmin.signer, args: { domain } })
      await wallet.client.send.setNickname({ sender: coAdmin.addr, signer: coAdmin.signer, args: { nickname: 're-enabled' } })
    })

    const recoverWith = async (adminPlugin: MockAdminPluginClient, newAdmin: string) => {
      const { algorand } = localnet
      const group = algorand.newGroup()
      group.addAppCallMethodCall(await wallet.client.params.arc58RekeyToPlugin({
        args: { plugin: adminPlugin.appId, type: CallerType.Other, escrow: '', methodOffsets: [], fundsRequest: [] },
        extraFee: microAlgo(1_000n),
      }))
      group.addAppCallMethodCall(await adminPlugin.params.changeAdmin({
        args: { wallet: wallet.appId, rekeyBack: true, newAdmin },
        extraFee: microAlgo(2_000n),
      }))
      group.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ args: {} }))
      await group.send({ populateAppCallResources: true })
    }
  })

  describe('ACC-10a', () => {
    test('the admin can not be set to the controlled address', async () => {
      await expectContractError(
        wallet.changeAdmin({ newAdmin: wallet.client.appAddress.toString() }),
        errAdminCannotBeControlled,
      )
    })
  })

  describe('ACC-08 base factory bytecode init', () => {
    test('the deployer can no longer (re)initialise child bytecode once the DAO wallet exists', async () => {
      // universe factories were seeded by the deployer before DAO setup; the DAO wallet now exists
      await expectContractError(
        universe.raffleFactory.client.send.initBoxedContract({ args: { version: 'evil', size: 1n } }),
        errNotAkitaDao,
      )
    })
  })

  describe('SG-04 external controlled address proof', () => {
    test('an account rekeyed to the factory in an earlier group can not be wrapped by someone else', async () => {
      const { algorand, context: { generateAccount } } = localnet
      const victim = await generateAccount({ initialFunds: (2).algos() })
      // a stale rekey to the factory (separate group)
      await algorand.send.payment({
        sender: victim.addr, signer: victim.signer, receiver: victim.addr, amount: microAlgo(0n),
        rekeyTo: walletFactory.client.appAddress,
      })

      // an attacker tries to create a wallet around it, with themselves as admin
      const attacker = await generateAccount({ initialFunds: (20).algos() })
      const cost = await walletFactory.cost()
      const payment = await algorand.createTransaction.payment({
        sender: attacker.addr, receiver: walletFactory.client.appAddress, amount: microAlgo(cost),
      })
      await expectContractError(
        walletFactory.client.send.newAccount({
          sender: attacker.addr,
          signer: attacker.signer,
          args: {
            payment,
            controlledAddress: victim.addr.toString(),
            admin: attacker.addr.toString(),
            nickname: 'hijack',
            referrer: ZERO,
            salt: new Uint8Array(32),
            bio: '',
            automaticUpdates: true,
            extraFunding: 0n,
            assets: [],
            plugins: [],
          },
          maxFee: microAlgo(272_000n),
          coverAppCallInnerTransactionFees: true,
        }),
        errControlledAddressNotProven,
      )
    })

    test('the in-group rekey made by the controlled account is accepted', async () => {
      const { w, external } = await externalWallet()
      expect(await w.client.state.global.controlledAddress()).toBe(external)
      const info = await localnet.context.algorand.account.getInformation(external)
      expect(info.authAddr?.toString()).toBe(w.client.appAddress.toString())
    })
  })

  describe('ACC-08 updateWallet target check', () => {
    test('the factory refuses to push wallet code into an app it did not create', async () => {
      const { algorand } = localnet
      const fakeFactory = algorand.client.getTypedAppFactory(MockFakeUpdatableWalletFactory, { defaultSender: sender, defaultSigner: signer })
      const { appClient: fake } = await fakeFactory.send.create.create({ args: {} })
      await expectContractError(
        walletFactory.client.send.updateWallet({ sender, signer, args: { wallet: fake.appId }, extraFee: microAlgo(1_000n) }),
        errNotAWallet,
      )
      // the fake app is untouched
      expect((await fake.send.ping({ args: {} })).return).toBe(7n)
    })

    test('a factory-created wallet can still be updated', async () => {
      // the inner update carries the wallet program; above 8,192 bytes it costs more than one minimum fee,
      // so the client sizes the fee, under a ceiling
      await walletFactory.client.send.updateWallet({
        sender, signer, args: { wallet: wallet.appId }, coverAppCallInnerTransactionFees: true, maxFee: microAlgo(10_000n),
      })
      await wallet.setNickname({ nickname: 'after update' })
      expect(await wallet.client.state.global.nickname()).toBe('after update')
    })
  })
})
