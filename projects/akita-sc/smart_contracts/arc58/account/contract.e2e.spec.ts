import { expectContractError } from '../../../tests/utils/errors';
import { algo, Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { AppCallMethodCall } from '@algorandfoundation/algokit-utils/types/composer';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AkitaDaoSDK } from 'akita-sdk/dao';
import { AsaManagerPluginSDK, isDripAllowance, isFlatAllowance, isWindowAllowance, newWallet, OptInPluginSDK, PayPluginSDK, WalletFactorySDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { sendPrepared } from 'akita-sdk';
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import { buildAkitaUniverse } from '../../../tests/fixtures/dao';
import { deployAsaManagerPlugin } from '../../../tests/fixtures/plugins/asa-manager';
import { deployOptInPlugin } from '../../../tests/fixtures/plugins/optin';
import { deployPayPlugin } from '../../../tests/fixtures/plugins/pay';
import { TimeWarp } from '../../../tests/utils/time';
import { errAdminOnly, errAllowanceExceeded, errCannotCallOtherAppsDuringRekey, errExecutionKeyNotFound, errExecutionNotReady, errGroupNotFound, errMalformedOffsets, errMethodOnCooldown, errPluginDoesNotExist, errPluginExpired, errPluginOnCooldown } from './errors';

// newAccount still pre-funds ARC58WalletIDsByAccountsMbr (Phase 4 removes it). Only the legacy
// register() spends it, and newWallet no longer registers (principal resolution, Phase 3), so every
// wallet here holds exactly this much above its minimum balance before the test funds it.
const REGISTRATION_PREFUND = 12_100n
// The same ARC58WalletIDsByAccountsMbr is part of mbr.newEscrowMintCost for every new escrow. addPlugin
// no longer registers the escrow (registerEscrow defaults to false), so after a test funds
// newEscrowMintCost and creates the escrow, the wallet keeps a second, unused REGISTRATION_PREFUND.

describe('ARC58 Plugin Permissions', () => {
  const localnet = algorandFixture();

  let dao: AkitaDaoSDK;
  /** the wallet factory contract sdk */
  let walletFactory: WalletFactorySDK;
  /** the wallet sdk */
  let wallet: WalletSDK;

  /** the pay plugin sdk */
  let payPluginSdk: PayPluginSDK;
  /** the optin plugin sdk */
  let optinPluginSdk: OptInPluginSDK;
  /** the asa manager plugin sdk */
  let asaManagerPluginSdk: AsaManagerPluginSDK;

  let timeWarp: TimeWarp;

  beforeAll(async () => {
    Config.configure({
      debug: true,
      // traceAll: true,
    })
    registerDebugEventHandlers()

    await localnet.newScope();
    const { algorand, context: { testAccount } } = localnet
    const sender = testAccount.toString()
    const signer = testAccount.signer

    timeWarp = new TimeWarp(algorand);

    ({ dao, walletFactory } = await buildAkitaUniverse({
      fixture: localnet,
      sender,
      signer,
      apps: {}
    }));

    payPluginSdk = await deployPayPlugin({ fixture: localnet, sender, signer });
    optinPluginSdk = await deployOptInPlugin({ fixture: localnet, sender, signer });
    asaManagerPluginSdk = await deployAsaManagerPlugin({ fixture: localnet, sender, signer });
  })

  beforeEach(async () => {
    await localnet.newScope()
    const { algorand, context: { testAccount } } = localnet
    const sender = testAccount.toString()
    const signer = testAccount.signer

    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

    wallet = await newWallet({
      factoryParams: {
        appId: walletFactory.appId,
        defaultSender: sender,
        defaultSigner: signer
      },
      readerAccount: sender,
      algorand,
      nickname: 'test_wallet',
    })
  })

  describe('Global Scope', () => {
    test('both are valid, global is used', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })

      const paymentAmount = 1_000_000n
      const fundAmount = (mbr.plugins * 2n) + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Other, caller: sender });
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
        ]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      // expect last used to be updated on the global plugin
      // const globalPluginInfo = wallet.plugins.get(`${payPluginSdk.appId}${ALGORAND_ZERO_ADDRESS_STRING}`)!;
      const globalPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId })!;
      expect(globalPluginInfo).toBeDefined();
      expect(globalPluginInfo!.lastCalled).toBeGreaterThan(0n);

      // expect last used to not be updated on the sender plugin
      const localPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId, caller: sender })!;
      expect(localPluginInfo).toBeDefined();
      expect(localPluginInfo.lastCalled).toBe(0n);
    })

    test('global valid, global is used', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
        ]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      // expect last used to be updated on the global plugin
      const globalPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId })!;
      expect(globalPluginInfo).toBeDefined();
      expect(globalPluginInfo!.lastCalled).toBeGreaterThan(0n);
    })
  })

  describe('Plugin Restrictions', () => {
    test('canCall ignores cooldown for a fresh plugin', async () => {
      const { context: { testAccount } } = localnet
      const sender = testAccount.toString()

      const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })

      await wallet.client.appClient.fundAppAccount({
        amount: mbr.plugins.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        cooldown: 100n,
        useRounds: true
      })

      const result = await wallet.client.send.arc58CanCall({
        args: {
          plugin: payPluginSdk.appId,
          type: CallerType.Global,
          address: sender,
          escrow: '',
          method: payPluginSdk.pay()().selectors[0],
        }
      })

      expect(result.return).toBe(true)
    })

    test('global does not exist, sender valid', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()
      const signer = testAccount.signer

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({ client: payPluginSdk, caller: sender, callerType: CallerType.Other });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      await wallet.usePlugin({
        sender,
        signer,
        calls: [
          payPluginSdk.pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
        ]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      // expect last used to not be updated on the sender plugin
      const localPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId, caller: sender })!;
      expect(localPluginInfo).toBeDefined();
      expect(localPluginInfo.lastCalled).toBeGreaterThan(0n);
    })

    test('plugins on cooldown', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        cooldown: 100n,
        useRounds: true, // Use round-based cooldown for more reliable testing
      });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
        ]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      // expect last used to be updated on the global plugin
      const globalPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId })!;
      expect(globalPluginInfo).toBeDefined();
      expect(globalPluginInfo!.lastCalled).toBeGreaterThan(0n);

      // Re-fund wallet so the second call can proceed far enough to hit cooldown check
      await wallet.client.appClient.fundAppAccount({
        amount: paymentAmount.microAlgo()
      })

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          callerType: CallerType.Global,
          calls: [
            payPluginSdk.pay({
              payments: [{
                receiver: sender,
                amount: paymentAmount,
                asset: 0,
              }]
            })
          ]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errPluginOnCooldown);
    })

    test('neither sender nor global plugin exists', async () => {
      const { context: { testAccount } } = localnet
      const sender = testAccount.toString()

      // drop down below our wallet sdk
      // otherwise it short circuits & errors early

      const group = wallet.client.newGroup()

      group.arc58RekeyToPlugin({
        args: {
          plugin: payPluginSdk.appId,
          type: CallerType.Global,
          escrow: '',
          methodOffsets: [],
          fundsRequest: []
        },
        extraFee: microAlgo(1_000n),
      });

      const composer = await group.composer()

      const payPluginTxn = (
        await payPluginSdk
          .pay({
            payments: [{
              receiver: sender,
              amount: 0,
              asset: 0,
            }]
          })
          .call('') // unnecesary because we're using the default controlled account
          .getTxns({ wallet: wallet.client.appId })
      ) as AppCallMethodCall[]

      composer.addAppCallMethodCall(payPluginTxn[0])

      group.arc58VerifyAuthAddress()

      let error = 'no error thrown'
      try {
        await group.send();
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errPluginDoesNotExist);
    })

    test('plugins expired', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        lastValid: 0n,
      });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      await wallet.getPlugins();
      console.log(wallet.plugins.get({ plugin: payPluginSdk.appId })!);

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          callerType: CallerType.Global,
          calls: [
            payPluginSdk.pay({
              payments: [{
                receiver: sender,
                amount: paymentAmount,
                asset: 0,
              }]
            })
          ]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errPluginExpired);
    })

    test('wrong app call in sandwich', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })

      const paymentAmount = 1_000_000n
      const fundAmount = (mbr.plugins * 2n) + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global });
      await wallet.addPlugin({ client: asaManagerPluginSdk, callerType: CallerType.Global });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      // drop down below our wallet sdk
      // we need to use the direct call because
      // the wallet sdk short circuits
      // to avoid unnecessary network calls

      const group = wallet.client.newGroup()

      group.arc58RekeyToPlugin({
        args: {
          plugin: payPluginSdk.appId,
          type: CallerType.Global,
          escrow: '',
          methodOffsets: [],
          fundsRequest: []
        },
        extraFee: microAlgo(1_000n),
      });

      const composer = await group.composer()

      const payPluginTxn = (
        await payPluginSdk
          .pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
          .call('') // unnecesary because we're using the default controlled account
          .getTxns({ wallet: wallet.client.appId })
      ) as AppCallMethodCall[]


      composer.addAppCallMethodCall(payPluginTxn[0])

      const assaMintTxn = (
        await asaManagerPluginSdk
          .mint({
            assets: [{
              assetName: 'Test Akita',
              unitName: 'TAKTA',
              total: 1_000_000_000_000n,
              decimals: 6n,
              manager: wallet.client.appAddress.toString(),
              reserve: wallet.client.appAddress.toString(),
              freeze: ALGORAND_ZERO_ADDRESS_STRING,
              clawback: ALGORAND_ZERO_ADDRESS_STRING,
              defaultFrozen: false,
              url: 'https://akita.community',
            }]
          })
          .call('') // unnecesary because we're using the default controlled account
          .getTxns({ wallet: wallet.client.appId })
      ) as AppCallMethodCall[]

      composer.addAppCallMethodCall(assaMintTxn[0])

      group.arc58VerifyAuthAddress()

      let error = 'no error thrown'
      try {
        await group.send();
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errCannotCallOtherAppsDuringRekey);
    })
  })

  describe('Method Restrictions', () => {
    test('global does not exist, sender valid, method allowed', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({
        escrow: '',
        methodCount: 1n,
        plugin: '',
        groups: 0n
      })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        caller: sender,
        methods: [
          { name: payPluginSdk.pay(), cooldown: 0n },
        ]
      });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      await wallet.usePlugin({
        calls: [
          payPluginSdk.pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
        ]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      // expect last used to not be updated on the sender plugin
      const localPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId, caller: sender })!;
      expect(localPluginInfo).toBeDefined();
      expect(localPluginInfo.lastCalled).toBeGreaterThan(0n);
    })

    test('methods on cooldown', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({
        escrow: '',
        methodCount: 1n,
        plugin: '',
        groups: 0n
      })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        caller: sender,
        useRounds: true, // Use round-based cooldown for more reliable testing
        methods: [
          { name: payPluginSdk.pay(), cooldown: 100n },
        ]
      });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      await wallet.usePlugin({
        calls: [
          payPluginSdk.pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
        ]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      // expect last used to not be updated on the sender plugin
      const localPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId, caller: sender })!;
      expect(localPluginInfo).toBeDefined();
      expect(localPluginInfo.lastCalled).toBeGreaterThan(0n);

      // Re-fund wallet so the second call can proceed far enough to hit cooldown check
      await wallet.client.appClient.fundAppAccount({
        amount: paymentAmount.microAlgo()
      })

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          calls: [
            payPluginSdk.pay({
              payments: [{
                receiver: sender,
                amount: paymentAmount,
                asset: 0,
              }]
            })
          ]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errMethodOnCooldown);
    })

    test('methods on cooldown, single group', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({
        escrow: '',
        methodCount: 1n,
        plugin: '',
        groups: 0n
      })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        caller: sender,
        methods: [
          { name: payPluginSdk.pay(), cooldown: 1n },
        ]
      });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          calls: [
            payPluginSdk.pay({
              payments: [{
                receiver: sender,
                amount: paymentAmount,
                asset: 0,
              }]
            }),
            // The same method again with another amount: a node refuses a group that repeats a
            // transaction byte for byte before it evaluates anything, so the two calls must differ.
            payPluginSdk.pay({
              payments: [{
                receiver: sender,
                amount: paymentAmount + 1n,
                asset: 0,
              }]
            })
          ]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errMethodOnCooldown);
    })

    test('malformed methodOffsets', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 1n, plugin: '', groups: 0n })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        methods: [
          { name: payPluginSdk.pay(), cooldown: 0n },
        ]
      });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + paymentAmount)

      // drop down below our wallet sdk
      // we need to use the direct call because
      // the wallet sdk short circuits
      // to avoid unnecessary network calls

      const group = wallet.client.newGroup()

      group.arc58RekeyToPlugin({
        args: {
          plugin: payPluginSdk.appId,
          type: CallerType.Global,
          escrow: '',
          methodOffsets: [],
          fundsRequest: []
        },
        extraFee: microAlgo(1_000n),
      });

      const composer = await group.composer()

      const payPluginTxn = (
        await payPluginSdk
          .pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
          .call('') // unnecesary because we're using the default controlled account
          .getTxns({ wallet: wallet.client.appId })
      ) as AppCallMethodCall[]

      composer.addAppCallMethodCall(payPluginTxn[0])

      group.arc58VerifyAuthAddress()

      let error = 'no error thrown'
      try {
        await group.send();
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errMalformedOffsets);
    })
  })

  describe('Allowances', () => {
    test('allowance - flat', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      const escrow = 'flat_allowance'
      let mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      const asset = 0n
      const allowed = 10_000_000n
      const amount = 6_000_000n
      const fundAmount = (
        allowed +
        mbr.plugins +
        mbr.newEscrowMintCost +
        mbr.allowances
      )

      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(fundAmount)
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        escrow,
        allowances: [{
          type: 'flat',
          asset,
          amount: allowed
        }]
      });

      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + (2n * REGISTRATION_PREFUND) + allowed)

      await wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{ receiver: sender, amount, asset }]
          })
        ],
        fundsRequest: [{ amount, asset }]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + (2n * REGISTRATION_PREFUND) + (allowed - amount))

      // expect last used to be updated on the global plugin
      const globalPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId, escrow })!;
      expect(globalPluginInfo).toBeDefined();
      expect(globalPluginInfo!.lastCalled).toBeGreaterThan(0n);

      const allowanceInfo = wallet.allowances.get({ asset, escrow })!;
      expect(allowanceInfo).toBeDefined();

      if (!isFlatAllowance(allowanceInfo)) {
        throw new Error('Expected allowance to be flat');
      }

      expect(allowanceInfo?.spent).toEqual(amount);

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          escrow,
          callerType: CallerType.Global,
          calls: [
            payPluginSdk.pay({
              payments: [{ receiver: sender, amount, asset }]
            })
          ],
          fundsRequest: [{ amount, asset }]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errAllowanceExceeded);
    })

    test('allowance - window', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      const escrow = 'window_allowance'
      let mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      const asset = 0n
      const allowed = 10_000_000n
      const amount = 6_000_000n
      const fundAmount = (
        (allowed * 2n) +
        mbr.plugins +
        mbr.newEscrowMintCost +
        mbr.allowances
      )

      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(fundAmount)
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        escrow,
        allowances: [{
          type: 'window',
          asset,
          amount: allowed,
          interval: 100n,
          useRounds: true
        }]
      });

      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + (2n * REGISTRATION_PREFUND) + (allowed * 2n))

      await wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{ receiver: sender, amount, asset }]
          })
        ],
        fundsRequest: [{ amount, asset }]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + (2n * REGISTRATION_PREFUND) + ((allowed * 2n) - amount))

      // expect last used to be updated on the global plugin
      const globalPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId, escrow })!;
      expect(globalPluginInfo).toBeDefined();
      expect(globalPluginInfo!.lastCalled).toBeGreaterThan(0n);

      let allowanceInfo = wallet.allowances.get({ asset, escrow })!;
      expect(allowanceInfo).toBeDefined();

      if (!isWindowAllowance(allowanceInfo)) {
        throw new Error('Expected allowance to be window');
      }

      expect(allowanceInfo.spent).toEqual(amount);

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          escrow,
          callerType: CallerType.Global,
          calls: [
            payPluginSdk.pay({
              payments: [{ receiver: sender, amount, asset }]
            })
          ],
          fundsRequest: [{ amount, asset }]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errAllowanceExceeded);

      await timeWarp.warpForwardRounds(101n);

      await wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{ receiver: sender, amount, asset }]
          })
        ],
        fundsRequest: [{ amount, asset }]
      })

      allowanceInfo = wallet.allowances.get({ asset, escrow })!;
      expect(allowanceInfo).toBeDefined();

      if (!isWindowAllowance(allowanceInfo)) {
        throw new Error('Expected allowance to be window');
      }

      expect(allowanceInfo.spent).toEqual(amount);
    })

    test('allowance - drip', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      const escrow = 'drip_allowance'
      let mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND)

      const asset = 0n
      const max = 10_000_000n
      const amount = 6_000_000n
      const fundAmount = (
        (max * 2n) +
        mbr.plugins +
        mbr.newEscrowMintCost +
        mbr.allowances
      )

      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo(fundAmount)
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        escrow,
        allowances: [{
          type: 'drip',
          asset,
          rate: 1_000_000n,
          interval: 10n,
          max,
          useRounds: true
        }]
      });

      const initialAllowanceInfo = await wallet.getAllowance({ asset, escrow })
      if (!isDripAllowance(initialAllowanceInfo)) {
        throw new Error('Expected allowance to be drip')
      }

      // A drip starts with a full bucket, but its accrual clock starts at the
      // allowance's creation epoch rather than accidentally at epoch zero.
      expect(initialAllowanceInfo.lastLeftover).toEqual(max)
      expect(initialAllowanceInfo.last).toEqual(initialAllowanceInfo.start)
      expect(initialAllowanceInfo.last).toBeGreaterThan(0n)

      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + (2n * REGISTRATION_PREFUND) + (max * 2n))

      await wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{ receiver: sender, amount, asset }]
          })
        ],
        fundsRequest: [{ amount, asset }]
      })

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + (2n * REGISTRATION_PREFUND) + ((max * 2n) - amount))

      // expect last used to be updated on the global plugin
      const globalPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId, escrow })!;
      expect(globalPluginInfo).toBeDefined();
      expect(globalPluginInfo!.lastCalled).toBeGreaterThan(0n);

      let allowanceInfo = wallet.allowances.get({ asset, escrow })!;
      expect(allowanceInfo).toBeDefined();

      if (!isDripAllowance(allowanceInfo)) {
        throw new Error('Expected allowance to be drip');
      }

      expect(allowanceInfo.lastLeftover).toEqual(max - amount);

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          escrow,
          callerType: CallerType.Global,
          calls: [
            payPluginSdk.pay({
              payments: [{ receiver: sender, amount, asset }]
            })
          ],
          fundsRequest: [{ amount, asset }]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errAllowanceExceeded);

      // ACC-03: `last` is the accrual anchor. It only advances by whole intervals, so the
      // partial interval before a spend keeps accruing (it used to be discarded).
      expect((allowanceInfo.last - allowanceInfo.start) % allowanceInfo.interval).toEqual(0n)
      const anchorAfterFirstSpend = allowanceInfo.last

      await timeWarp.warpForwardRounds(20n);

      // The next spend lands in the next round. Expected availability from the anchor:
      const nextRound = async () => BigInt((await algorand.client.algod.status().do()).lastRound) + 1n
      const dripAvailable = (leftover: bigint, anchor: bigint, round: bigint, info: { interval: bigint; rate: bigint }) => {
        const accrued = leftover + ((round - anchor) / info.interval) * info.rate
        return accrued > max ? max : accrued
      }

      let round = await nextRound()
      const availableAtSecondSpend = dripAvailable(max - amount, anchorAfterFirstSpend, round, allowanceInfo)
      // at least the two whole intervals of the 20 warped rounds came back
      expect(availableAtSecondSpend).toBeGreaterThanOrEqual(amount)

      await wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{ receiver: sender, amount, asset }]
          })
        ],
        fundsRequest: [{ amount, asset }]
      })

      allowanceInfo = wallet.allowances.get({ asset, escrow })!;
      expect(allowanceInfo).toBeDefined();

      if (!isDripAllowance(allowanceInfo)) {
        throw new Error('Expected allowance to be drip');
      }

      expect(allowanceInfo.lastLeftover).toEqual(availableAtSecondSpend - amount);
      expect(allowanceInfo.last).toEqual(
        anchorAfterFirstSpend + ((round - anchorAfterFirstSpend) / allowanceInfo.interval) * allowanceInfo.interval
      )

      await timeWarp.warpForwardRounds(40n);

      // Asking for more than has accrued still fails
      round = await nextRound()
      const availableNow = dripAvailable(allowanceInfo.lastLeftover, allowanceInfo.last, round, allowanceInfo)
      error = 'no error thrown'
      try {
        await wallet.usePlugin({
          escrow,
          callerType: CallerType.Global,
          calls: [
            payPluginSdk.pay({
              payments: [{ receiver: sender, amount: availableNow + 1n, asset }]
            })
          ],
          fundsRequest: [{ amount: availableNow + 1n, asset }]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errAllowanceExceeded);

      await timeWarp.warpForwardRounds(60n);

      await wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{ receiver: sender, amount: 1_000_000n, asset }]
          })
        ],
        fundsRequest: [{ amount: 1_000_000n, asset }]
      })

      allowanceInfo = wallet.allowances.get({ asset, escrow })!;
      expect(allowanceInfo).toBeDefined();

      if (!isDripAllowance(allowanceInfo)) {
        throw new Error('Expected allowance to be drip');
      }

      expect(allowanceInfo.lastLeftover).toEqual(max - 1_000_000n);
    })

    test('allowance - drip keeps partial interval progress across spends', async () => {
      const { algorand, context: { testAccount } } = localnet
      const sender = testAccount.toString()

      const escrow = 'drip_carry'
      const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })

      const asset = 0n
      const rate = 1_000_000n
      const interval = 10n
      const max = 10_000_000n

      await wallet.client.appClient.fundAppAccount({
        amount: microAlgo((max * 2n) + mbr.plugins + mbr.newEscrowMintCost + mbr.allowances)
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        escrow,
        allowances: [{ type: 'drip', asset, rate, interval, max, useRounds: true }]
      });

      const spend = (amount: bigint) => wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [payPluginSdk.pay({ payments: [{ receiver: sender, amount, asset }] })],
        fundsRequest: [{ amount, asset }]
      })

      // Drain the full bucket. ACC-03: the accrual anchor stays on the allowance's interval grid
      // (start + k * interval); it never jumps to the spend round.
      await spend(max)
      let info = await wallet.getAllowance({ asset, escrow })
      if (!isDripAllowance(info)) throw new Error('Expected allowance to be drip')
      expect(info.lastLeftover).toEqual(0n)
      const anchor = info.last
      expect((anchor - info.start) % interval).toEqual(0n)

      // Spend 1.5 intervals after the anchor: one interval accrued, the half interval must carry
      // over. The next spend lands in the round after the current one.
      const drainRound = BigInt((await algorand.client.algod.status().do()).lastRound)
      await timeWarp.warpForwardRounds(anchor + 15n - drainRound - 1n)
      await spend(rate)

      const spendRound = BigInt((await algorand.client.algod.status().do()).lastRound)
      const elapsed = spendRound - anchor
      expect(elapsed % interval).not.toEqual(0n)

      info = await wallet.getAllowance({ asset, escrow })
      if (!isDripAllowance(info)) throw new Error('Expected allowance to be drip')
      // The anchor moves by whole intervals only, not to the spend round.
      expect(info.last).toEqual(anchor + ((elapsed / interval) * interval))
      expect(info.lastLeftover).toEqual(((elapsed / interval) * rate) - rate)

      // Less than a full interval after the last spend, but a full interval after the
      // anchor: another drip is available. Dropping the partial interval would fail here.
      await timeWarp.warpForwardRounds(4n)
      await spend(rate)

      info = await wallet.getAllowance({ asset, escrow })
      if (!isDripAllowance(info)) throw new Error('Expected allowance to be drip')
      expect(info.lastLeftover).toEqual(0n)
    })

    test('rejects unknown allowance types and zero-length intervals without creating boxes', async () => {
      const { algorand } = localnet
      const escrow = 'invalid_allowance'
      const mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n })

      await wallet.client.appClient.fundAppAccount({
        // Include enough balance for one allowance box so an accidentally
        // accepted tuple cannot fail later for unrelated MBR funding.
        amount: microAlgo(mbr.plugins + mbr.newEscrowMintCost + mbr.allowances)
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        escrow,
      })

      const before = await algorand.account.getInformation(wallet.client.appAddress)
      const allowancesBefore = await wallet.client.state.box.allowances.getMap()

      await expect(
        wallet.client.send.arc58AddAllowances({
          args: { escrow, allowances: [[91n, 99n, 1n, 0n, 1n, true]] },
        })
      ).rejects.toThrow(/assert failed|Runtime error/)

      await expect(
        wallet.client.send.arc58AddAllowances({
          args: { escrow, allowances: [[92n, 2n, 1n, 0n, 0n, true]] },
        })
      ).rejects.toThrow(/assert failed|Runtime error/)

      await expect(
        wallet.client.send.arc58AddAllowances({
          args: { escrow, allowances: [[93n, 3n, 1n, 10n, 0n, true]] },
        })
      ).rejects.toThrow(/assert failed|Runtime error/)

      const after = await algorand.account.getInformation(wallet.client.appAddress)
      expect(after.balance.microAlgos).toEqual(before.balance.microAlgos)
      expect(after.minBalance.microAlgos).toEqual(before.minBalance.microAlgos)
      expect(await wallet.client.state.box.allowances.getMap()).toEqual(allowancesBefore)
    })
  })

  describe('Execution Keys', () => {
    test('execution keys enforce admin authorization, group hashes, validity, and one-time consumption', async () => {
      const { algorand } = localnet
      const submitter = algorand.account.random()
      const dispenser = await algorand.account.dispenserFromEnvironment()
      await algorand.account.ensureFunded(submitter, dispenser.addr, algo(4))
      await wallet.client.appClient.fundAppAccount({ amount: microAlgo(2_000_000n) })
      await wallet.addPlugin({ client: payPluginSdk, callerType: CallerType.Global, useExecutionKey: true, useRounds: true })
      const execution = await wallet.build.usePlugin({
        sender: submitter.toString(), signer: submitter.signer, lease: 'execution_checks', windowSize: 1000n,
        callerType: CallerType.Global,
        calls: [payPluginSdk.pay({ payments: [{ receiver: submitter.toString(), amount: 1n, asset: 0 }] })],
      })
      const { lease, ids: groups, firstValid, lastValid } = execution
      const args = { lease, groups, firstValid, lastValid }
      const before = await algorand.account.getInformation(wallet.client.appAddress)
      const beforeBoxes = (await algorand.client.algod.getApplicationBoxes(wallet.appId).do()).boxes.length
      expect(await wallet.client.arc58GetExecutions({ args: { leases: [lease] } })).toEqual([[[], 0n, 0n]])
      const executionMbr = (await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: BigInt(groups.length) })).executions
      expect(executionMbr).toBe(23_700n + 12_800n * BigInt(groups.length))
      await expectContractError(wallet.addExecutionKey({
        ...args, sender: submitter.toString(), signer: submitter.signer,
      }), errAdminOnly)
      await expectContractError(wallet.addExecutionKey({ ...args, groups: [] }), errExecutionNotReady)
      await expectContractError(wallet.addExecutionKey({ ...args, firstValid: lastValid + 1n }), errExecutionNotReady)
      expect((await wallet.client.state.box.executions.getMap()).size).toBe(0)

      const wrongGroups = [new Uint8Array(32).fill(123)]
      await wallet.addExecutionKey({ ...args, groups: wrongGroups })
      await expectContractError(sendPrepared(execution.windows[0], algorand.client.algod), errGroupNotFound)
      expect((await wallet.getExecution(lease)).groups).toEqual(wrongGroups)
      await wallet.removeExecutionKey({ lease })

      await wallet.addExecutionKey({ ...args, firstValid: lastValid + 1n, lastValid: lastValid + 1000n })
      await expectContractError(sendPrepared(execution.windows[0], algorand.client.algod), errExecutionNotReady)
      await wallet.removeExecutionKey({ lease })

      await wallet.group().addExecutionKey(args).send()
      const installed = await algorand.account.getInformation(wallet.client.appAddress)
      expect(installed.minBalance.microAlgos - before.minBalance.microAlgos).toBe(executionMbr)
      expect((await algorand.client.algod.getApplicationBoxes(wallet.appId).do()).boxes.length).toBe(beforeBoxes + 1)
      const box = await algorand.client.algod.getApplicationBoxByName(wallet.appId, new Uint8Array([120, ...lease])).do()
      expect(box.value.length).toBe(20 + 32 * groups.length)
      expect(await wallet.getExecution(lease)).toEqual({ groups, firstValid, lastValid })
      expect(await wallet.client.arc58GetExecutions({ args: { leases: [lease] } })).toEqual([[groups, firstValid, lastValid]])
      await sendPrepared(execution.windows[0], algorand.client.algod)
      expect((await wallet.client.state.box.executions.getMap()).size).toBe(0)
      expect((await algorand.account.getInformation(wallet.client.appAddress)).minBalance.microAlgos).toBe(before.minBalance.microAlgos)
      await expect(sendPrepared(execution.windows[0], algorand.client.algod)).rejects.toThrow()

      // Anyone can clean up an expired key, releasing the complete record's MBR.
      await wallet.client.send.arc58AddExecutionKey({ args: { ...args, firstValid: 1n, lastValid: 2n } })
      await wallet.removeExecutionKey({ lease, sender: submitter.toString(), signer: submitter.signer })
      expect((await wallet.client.state.box.executions.getMap()).size).toBe(0)
      expect((await algorand.account.getInformation(wallet.client.appAddress)).minBalance.microAlgos).toBe(before.minBalance.microAlgos)
    })

    test('execution key - valid', async () => {
      const { algorand } = localnet
      const dispenser = await algorand.account.dispenserFromEnvironment();

      const senderAcc = algorand.account.random()
      const sender = senderAcc.toString()
      const signer = senderAcc.signer

      await algorand.account.ensureFunded(sender, dispenser.addr, algo(4));

      let mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 2n })

      const paymentAmount = 1_000_000n
      const fundAmount = mbr.plugins + mbr.executions + paymentAmount

      await wallet.client.appClient.fundAppAccount({
        amount: fundAmount.microAlgo()
      })

      await wallet.addPlugin({
        client: payPluginSdk,
        callerType: CallerType.Global,
        useExecutionKey: true,
        useRounds: true
      });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + (paymentAmount + mbr.executions))

      let error = 'no error thrown'
      try {
        await wallet.usePlugin({
          sender,
          signer,
          callerType: CallerType.Global,
          calls: [
            payPluginSdk.pay({
              payments: [{
                receiver: sender,
                amount: paymentAmount,
                asset: 0,
              }]
            })
          ]
        })
      } catch (e: any) {
        error = e.message;
      }

      expect(error).toContain(errExecutionKeyNotFound);

      const { lease, firstValid, lastValid, ids: groups, windows } = await wallet.build.usePlugin({
        sender,
        signer,
        lease: 'my_lease',
        windowSize: 2000n,
        callerType: CallerType.Global,
        calls: [
          payPluginSdk.pay({
            payments: [{
              receiver: sender,
              amount: paymentAmount,
              asset: 0,
            }]
          })
        ]
      })

      const beforeExecution = await algorand.account.getInformation(wallet.client.appAddress)
      await wallet.addExecutionKey({ lease, groups, firstValid, lastValid });
      const afterExecution = await algorand.account.getInformation(wallet.client.appAddress)
      expect(afterExecution.balance.microAlgos).toEqual(beforeExecution.balance.microAlgos)
      expect(afterExecution.minBalance.microAlgos - beforeExecution.minBalance.microAlgos).toEqual(mbr.executions)

      const oneGroupMbr = (await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 1n })).executions
      const groupGrowthMbr = mbr.executions - oneGroupMbr
      await wallet.group().addExecutionKey({ lease, groups: [groups[0]], firstValid, lastValid }).send()
      const afterExtension = await algorand.account.getInformation(wallet.client.appAddress)
      expect(afterExtension.balance.microAlgos).toEqual(afterExecution.balance.microAlgos)
      expect(afterExtension.minBalance.microAlgos - afterExecution.minBalance.microAlgos).toEqual(groupGrowthMbr)

      await sendPrepared(windows[0], wallet.client.algorand.client.algod)

      // expect the payment was successful
      walletInfo = await algorand.account.getInformation(wallet.client.appAddress)
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND + mbr.executions)

      // manually refresh our cache
      await wallet.getPlugins();

      // expect last used to be updated on the global plugin
      const globalPluginInfo = wallet.plugins.get({ plugin: payPluginSdk.appId })!;
      expect(globalPluginInfo).toBeDefined();
      expect(globalPluginInfo!.lastCalled).toBeGreaterThan(0n);

      // Explicit removal releases the same exact box MBR as consumption.
      const beforeReAdd = await algorand.account.getInformation(wallet.client.appAddress)
      const executionsBeforeReAdd = await wallet.client.state.box.executions.getMap()
      await wallet.addExecutionKey({ lease, groups, firstValid, lastValid })
      const afterReAdd = await algorand.account.getInformation(wallet.client.appAddress)
      expect(afterReAdd.minBalance.microAlgos - beforeReAdd.minBalance.microAlgos).toEqual(mbr.executions)

      await wallet.removeExecutionKey({ lease })
      const afterRemove = await algorand.account.getInformation(wallet.client.appAddress)
      expect(afterRemove.balance.microAlgos).toEqual(afterReAdd.balance.microAlgos)
      expect(afterRemove.minBalance.microAlgos).toEqual(beforeReAdd.minBalance.microAlgos)
      expect((await wallet.client.state.box.executions.getMap()).size).toBe(executionsBeforeReAdd.size)
    })
  })
})
