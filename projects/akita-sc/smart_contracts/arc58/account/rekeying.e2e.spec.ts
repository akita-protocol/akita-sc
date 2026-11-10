import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, PayPluginSDK, WalletFactorySDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import { deployAbstractedAccountFactory } from '../../../tests/fixtures/abstracted-account';
import { deployAkitaDAO } from '../../../tests/fixtures/dao';
import { deployEscrowFactory } from '../../../tests/fixtures/escrow';
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay';
import { TimeWarp } from '../../../tests/utils/time';
import { expectContractError } from '../../../tests/utils/errors';
import { errAdminOnly, errMissingRekeyBack } from './errors';

describe('ARC58 Rekeying', () => {
  const localnet = algorandFixture();

  /** the wallet factory contract sdk */
  let walletFactory: WalletFactorySDK;
  /** the wallet sdk */
  let wallet: WalletSDK;
  /** the pay plugin sdk */
  let payPluginSdk: PayPluginSDK;
  /** time-warp helper for deterministic timestamp assertions */
  let timeWarp: TimeWarp;

  beforeAll(async () => {
    Config.configure({
      debug: true,
      // traceAll: true,
    });
    registerDebugEventHandlers();

    await localnet.newScope();
    const { algorand, context: { testAccount } } = localnet;
    const sender = testAccount.toString();
    const signer = testAccount.signer;

    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    timeWarp = new TimeWarp(algorand);

    const dao = await deployAkitaDAO({
      fixture: localnet,
      sender,
      signer,
      apps: {},
    });

    const escrowFactory = await deployEscrowFactory({
      fixture: localnet,
      sender,
      signer,
    });

    walletFactory = await deployAbstractedAccountFactory({
      fixture: localnet,
      sender,
      signer,
      args: {
        akitaDao: dao.appId,
        escrowFactory: escrowFactory.appId,
      },
    });

    // Deploy pay plugin for rekey-to-plugin tests
    payPluginSdk = await deployPayPlugin({ fixture: localnet, sender, signer });
  });

  beforeEach(async () => {
    await localnet.newScope();
    const { algorand, context: { testAccount } } = localnet;
    const sender = testAccount.toString();
    const signer = testAccount.signer;

    timeWarp = new TimeWarp(algorand);

    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    wallet = await newWallet({
      factoryParams: {
        appId: walletFactory.appId,
        defaultSender: sender,
        defaultSigner: signer,
      },
      readerAccount: sender,
      algorand,
      nickname: 'test_wallet',
    });

    // Fund the wallet with some ALGO
    await wallet.client.appClient.fundAppAccount({
      amount: (5).algos(),
    });
  });

  describe('Admin Rekeying', () => {
    test('admin can flash rekey to EOA and back', async () => {
      const { algorand, context: { testAccount } } = localnet;
      const sender = testAccount.toString();
      const signer = testAccount.signer;

      // v10: use algorand.createTransaction.payment (not algosdk.makePaymentTxn...)
      // so the composer receives a v10 Transaction with .txId() method.
      const paymentTxn = await algorand.createTransaction.payment({
        sender: wallet.client.appAddress.toString(),
        receiver: sender,
        amount: microAlgo(100_000),
        staticFee: microAlgo(1_000),
        rekeyTo: wallet.client.appAddress.toString(), // rekey back to app
      });

      // Flash rekey: rekey to admin, do something, rekey back
      await wallet.client
        .newGroup()
        // Step 1: rekey to admin EOA
        .arc58RekeyTo({
          sender,
          extraFee: microAlgo(1_000),
          args: {
            address: sender,
            flash: true,
          },
        })
        // Step 2: make a payment from the wallet (now controlled by admin)
        .addTransaction(paymentTxn, testAccount.signer)
        .send();

      // Verify wallet is still functional (rekeyed back correctly)
      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo.authAddr?.toString()).toBe(undefined); // authAddr is undefined when rekeyed to self
    });

    test('admin flash rekey fails without rekey back', async () => {
      const { algorand, context: { testAccount } } = localnet;
      const sender = testAccount.toString();
      const signer = testAccount.signer;

      // v10: build a v10 Transaction via algorand.createTransaction.payment
      const paymentTxn = await algorand.createTransaction.payment({
        sender: wallet.client.appAddress.toString(),
        receiver: sender,
        amount: microAlgo(100_000),
        staticFee: microAlgo(1_000),
        // Missing rekeyTo back to app!
      });

      let error = 'no error thrown';
      try {
        await wallet.client
          .newGroup()
          // Step 1: rekey to admin EOA with flash=true
          .arc58RekeyTo({
            sender,
            extraFee: microAlgo(1_000),
            args: {
              address: sender,
              flash: true,
            },
          })
          // Step 2: make a payment WITHOUT rekeying back
          .addTransaction(paymentTxn, testAccount.signer)
          .send();
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errMissingRekeyBack);
    });

    test('admin can permanent rekey to EOA (non-flash)', async () => {
      const { algorand, context: { testAccount } } = localnet;
      const sender = testAccount.toString();

      // Permanent rekey: rekey without flash flag
      await wallet.client.send.arc58RekeyTo({
        sender,
        extraFee: microAlgo(1_000),
        args: {
          address: sender,
          flash: false, // Not a flash rekey
        },
      });

      // Verify wallet is now rekeyed to the admin
      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo.authAddr?.toString()).toBe(sender);
    });
  });

  describe('Non-Admin Rekeying', () => {
    test('non-admin cannot rekey', async () => {
      const { algorand, context: { generateAccount } } = localnet;

      // Create a non-admin account
      const nonAdmin = await generateAccount({ initialFunds: (10).algos() });

      await expectContractError(wallet.client.send.arc58RekeyTo({
        sender: nonAdmin.toString(),
        signer: nonAdmin.signer,
        args: {
          address: nonAdmin.toString(),
          flash: false,
        },
      }), errAdminOnly);
    });
  });

  describe('Rekey to Plugin', () => {
    test('can rekey to plugin and execute', async () => {
      const { algorand, context: { testAccount, generateAccount } } = localnet;
      const sender = testAccount.toString();
      const signer = testAccount.signer;

      // Add the pay plugin to the wallet
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) });

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
      });

      // Create a receiver account
      const receiver = await generateAccount({ initialFunds: (1).algos() });
      const receiverInfoBefore = await algorand.account.getInformation(receiver.toString());

      const paymentAmount = 500_000n;

      // Use the plugin (internally rekeys to plugin, executes, rekeys back)
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [
              {
                receiver: receiver.toString(),
                asset: 0n,
                amount: paymentAmount,
              },
            ],
          }),
        ],
      });

      // Verify payment was made
      const receiverInfoAfter = await algorand.account.getInformation(receiver.toString());
      expect(receiverInfoAfter.balance.microAlgos - receiverInfoBefore.balance.microAlgos).toBe(paymentAmount);

      // Verify wallet is still rekeyed to itself (plugin rekeyed back)
      const walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo.authAddr?.toString()).toBe(undefined);
    });

    test('plugin must rekey back after execution', async () => {
      const { algorand, context: { testAccount } } = localnet;
      const sender = testAccount.toString();
      const signer = testAccount.signer;

      // Add the pay plugin to the wallet
      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins) });

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
      });

      // Try to rekey to plugin without verifying auth address after
      // This should fail because the verification call is missing
      const group = wallet.client.newGroup();
      group.arc58RekeyToPlugin({
        args: {
          plugin: payPluginSdk.appId,
          type: CallerType.Global,
          escrow: '',
          methodOffsets: [],
          fundsRequest: [],
        },
        extraFee: microAlgo(1_000),
      });

      // Missing: plugin call and arc58VerifyAuthAddress.
      await expectContractError(group.send(), errMissingRekeyBack);
    });
  });

  describe('Wallet State After Rekeying', () => {
    // NB: we don't test "lastUserInteraction after a *permanent* rekey" because the wallet
    // app address is no longer controlled by the app's own logic once rekeyed to an EOA,
    // so subsequent state reads of the wallet are not a meaningful check of contract
    // behavior. The flash-rekey test below covers the assertion we actually care about.

    test('flash rekey updates lastUserInteraction', async () => {
      const { algorand, context: { testAccount } } = localnet;
      const sender = testAccount.toString();

      const stateBefore = await wallet.client.state.global.getAll();
      const lastInteractionBefore = stateBefore.lastUserInteraction ?? 0n;

      // Advance the chain time so the next block is guaranteed to have a strictly
      // greater timestamp than the one stored in stateBefore. Without this, localnet
      // can produce the next block in the same second and the assertion degenerates
      // to "did not decrease" — which a no-op contract would also satisfy.
      await timeWarp.timeWarp(2n);

      // v10: use algorand.createTransaction.payment to build a v10 Transaction
      // that the composer can handle (algosdk.makePaymentTxnWithSuggestedParamsFromObject
      // returns an algosdk v3 Transaction with .txID() — incompatible with v10 composer's
      // .txId() call).
      const rekeyBackTxn = await algorand.createTransaction.payment({
        sender: wallet.client.appAddress.toString(),
        receiver: sender,
        amount: microAlgo(0),
        staticFee: microAlgo(1_000),
        rekeyTo: wallet.client.appAddress.toString(),
      });

      // Flash rekey and back
      await wallet.client
        .newGroup()
        .arc58RekeyTo({
          sender,
          extraFee: microAlgo(1_000),
          args: {
            address: sender,
            flash: true,
          },
        })
        .addTransaction(rekeyBackTxn, testAccount.signer)
        .send();

      const stateAfter = await wallet.client.state.global.getAll();
      const lastInteractionAfter = stateAfter.lastUserInteraction ?? 0n;

      // Strict >: requires the contract to have actively updated the field.
      expect(lastInteractionAfter).toBeGreaterThan(lastInteractionBefore);
    });
  });
  // Q2 / R-STALE (principal-resolution spec §4.3, §8 Q2, T25/T13/T44). A plugin window closes ONLY
  // through this wallet's arc58_verifyAuthAddress (which clears spending_address/current_plugin). The
  // old shortcut, "the controlled address rekeys itself back", left both stale, so the plugin kept
  // passing as the window holder (and could spend the escrow) in later groups.
  describe('Q2: windows close only through arc58_verifyAuthAddress', () => {
    const ESCROW = 'q2'

    /** install the pay plugin on escrow ESCROW (global caller) and return the escrow address */
    const installEscrowPlugin = async () => {
      const mbr = await wallet.getMbr({ escrow: ESCROW, methodCount: 0n, plugin: '', groups: 0n });
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.plugins + mbr.newEscrowMintCost + 1_000_000n) });
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, escrow: ESCROW });
      const escrow = await wallet.getEscrow(ESCROW)
      // keep the escrow above its min balance for the 0-amount plugin payment
      await localnet.algorand.send.payment({
        sender: localnet.context.testAccount.toString(),
        signer: localnet.context.testAccount.signer,
        receiver: escrow.address,
        amount: microAlgo(200_000),
      })
      return escrow.address.toString()
    }

    /** [W.arc58_rekeyToPlugin(pay, Global, ESCROW)] queued on a fresh wallet group */
    const rekeyToEscrowPlugin = (group: ReturnType<typeof wallet.client.newGroup>, sender: string) =>
      group.arc58RekeyToPlugin({
        sender,
        args: { plugin: payPluginSdk.appId, type: CallerType.Global, escrow: ESCROW, methodOffsets: [], fundsRequest: [] },
        extraFee: microAlgo(1_000),
      })

    const payCall = async (sender: string, rekeyBack: boolean) => payPluginSdk.client.params.pay({
      sender,
      args: { wallet: wallet.appId, rekeyBack, payments: [[sender, 0n, 0n]] },
      extraFee: microAlgo(1_000),
    })

    test('positive control: an escrow window closed by verifyAuthAddress passes and clears spending_address', async () => {
      const sender = localnet.context.testAccount.toString()
      const escrowAddress = await installEscrowPlugin()

      const group = wallet.client.newGroup()
      rekeyToEscrowPlugin(group, sender)
      const composer = await group.composer()
      composer.addAppCallMethodCall(await payCall(sender, true))
      composer.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ sender, args: {} }))
      await composer.send({ populateAppCallResources: true })

      expect(await wallet.client.state.global.spendingAddress()).toBe(ALGORAND_ZERO_ADDRESS_STRING)
      const escrowInfo = await localnet.algorand.account.getInformation(escrowAddress)
      expect(escrowInfo.authAddr?.toString()).toBe(wallet.client.appAddress.toString())
    })

    test('construction (a): an escrow window ended by the controlled-address shortcut fails (errNrkb)', async () => {
      const sender = localnet.context.testAccount.toString()
      const signer = localnet.context.testAccount.signer
      const escrowAddress = await installEscrowPlugin()

      // the admin hands the controlled address (W.address) to an EOA it holds
      await wallet.client.send.arc58RekeyTo({ sender, extraFee: microAlgo(1_000), args: { address: sender, flash: false } })

      const shortcut = await localnet.algorand.createTransaction.payment({
        sender: wallet.client.appAddress.toString(),
        receiver: wallet.client.appAddress.toString(),
        amount: microAlgo(0),
        staticFee: microAlgo(1_000),
        rekeyTo: wallet.client.appAddress.toString(),
      })

      const group = wallet.client.newGroup()
      rekeyToEscrowPlugin(group, sender)
      const composer = await group.composer()
      composer.addAppCallMethodCall(await payCall(sender, false))
      composer.addTransaction(shortcut, signer)
      await expectContractError(composer.send({ populateAppCallResources: true }), errMissingRekeyBack)

      // nothing stuck: the escrow is still with the wallet and no window state was written
      const escrowInfo = await localnet.algorand.account.getInformation(escrowAddress)
      expect(escrowInfo.authAddr?.toString()).toBe(wallet.client.appAddress.toString())
      expect(await wallet.client.state.global.spendingAddress()).toBe(ALGORAND_ZERO_ADDRESS_STRING)

      // E7: escrow windows still work while W.address is rekeyed away, when closed properly
      const ok = wallet.client.newGroup()
      rekeyToEscrowPlugin(ok, sender)
      const okComposer = await ok.composer()
      okComposer.addAppCallMethodCall(await payCall(sender, true))
      okComposer.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ sender, args: {} }))
      await okComposer.send({ populateAppCallResources: true })
      expect(await wallet.client.state.global.spendingAddress()).toBe(ALGORAND_ZERO_ADDRESS_STRING)
    })

    test('construction (b): one admin group [flash rekeyTo, escrow window, shortcut return] fails (errNrkb)', async () => {
      const sender = localnet.context.testAccount.toString()
      const signer = localnet.context.testAccount.signer
      await installEscrowPlugin()

      // the last txn satisfies the flash return; before Q2 it also closed the escrow window (stale state)
      const flashReturn = await localnet.algorand.createTransaction.payment({
        sender: wallet.client.appAddress.toString(),
        receiver: wallet.client.appAddress.toString(),
        amount: microAlgo(0),
        staticFee: microAlgo(1_000),
        rekeyTo: wallet.client.appAddress.toString(),
      })

      const group = wallet.client.newGroup()
      group.arc58RekeyTo({ sender, extraFee: microAlgo(1_000), args: { address: sender, flash: true } })
      rekeyToEscrowPlugin(group, sender)
      const composer = await group.composer()
      composer.addAppCallMethodCall(await payCall(sender, false))
      composer.addTransaction(flashReturn, signer)
      await expectContractError(composer.send({ populateAppCallResources: true }), errMissingRekeyBack)

      expect((await localnet.algorand.account.getInformation(wallet.client.appAddress)).authAddr).toBeUndefined()
    })

    test('a verifyAuthAddress that closes an escrow window is not a flash return (errNrkb)', async () => {
      const sender = localnet.context.testAccount.toString()
      await installEscrowPlugin()

      // before Q2 this passed with flash=true and left the controlled address with the EOA
      const group = wallet.client.newGroup()
      group.arc58RekeyTo({ sender, extraFee: microAlgo(1_000), args: { address: sender, flash: true } })
      rekeyToEscrowPlugin(group, sender)
      const composer = await group.composer()
      composer.addAppCallMethodCall(await payCall(sender, true))
      composer.addAppCallMethodCall(await wallet.client.params.arc58VerifyAuthAddress({ sender, args: {} }))
      await expectContractError(composer.send({ populateAppCallResources: true }), errMissingRekeyBack)

      expect((await localnet.algorand.account.getInformation(wallet.client.appAddress)).authAddr).toBeUndefined()
    })

    test('T13/T44 regression: a flash rekey returned by the controlled address still passes', async () => {
      const sender = localnet.context.testAccount.toString()
      const signer = localnet.context.testAccount.signer

      const flashReturn = await localnet.algorand.createTransaction.payment({
        sender: wallet.client.appAddress.toString(),
        receiver: wallet.client.appAddress.toString(),
        amount: microAlgo(0),
        staticFee: microAlgo(1_000),
        rekeyTo: wallet.client.appAddress.toString(),
      })
      await wallet.client
        .newGroup()
        .arc58RekeyTo({ sender, extraFee: microAlgo(1_000), args: { address: sender, flash: true } })
        .addTransaction(flashReturn, signer)
        .send()

      expect((await localnet.algorand.account.getInformation(wallet.client.appAddress)).authAddr).toBeUndefined()
    })
  })
});
