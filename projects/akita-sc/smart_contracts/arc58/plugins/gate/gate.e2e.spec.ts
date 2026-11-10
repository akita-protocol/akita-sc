import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { GatePluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { LogicalOperator, Operator } from 'akita-sdk/gates';
import algosdk from 'algosdk';
import { ABIType } from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { deployGatePlugin } from '../../../../tests/fixtures/plugins/gate';
import { errInvalidLayer } from '../../../gates/errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

/** Gate v2 issues ids from 2^32 (ids below are reserved for legacy imports) */
const FIRST_GATE_V2_ID = 4_294_967_296n;

describe('Gate plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let gatePluginSdk: GatePluginSDK;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser.addr, (500).algo());

    // Build the full Akita DAO universe
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });
    for (const receiver of [
      akitaUniverse.gate.client.appAddress,
      akitaUniverse.subgates.assetGate.client.appAddress,
    ]) {
      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver,
        amount: algokit.microAlgo(1_000_000n),
      });
    }

    // Create a user wallet for testing
    wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: akitaUniverse.walletFactory.appId,
        defaultSender: user.addr,
        defaultSigner: user.signer,
      },
      sender: user.addr,
      signer: user.signer,
      nickname: 'Test Wallet',
    });

    // Deploy a test-local plugin; it resolves the Gate app from the DAO registry.
    gatePluginSdk = await deployGatePlugin({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      args: { akitaDao: akitaUniverse.dao.appId },
    });
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 100_000n) });
    await wallet.addPlugin({ client: gatePluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  const walletAddresses = async () => new Set([
    wallet.client.appAddress.toString(),
    await wallet.client.state.global.controlledAddress(),
    await wallet.client.state.global.spendingAddress(),
  ]);

  const fundWallet = async (amount = 100_000_000n) => {
    for (const address of await walletAddresses()) {
      if (!address) continue;
      await algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: address,
        amount: algokit.microAlgo(amount),
      });
    }
  };

  const assetGateArgs = () => ABIType.from('(uint64,uint8,uint64)').encode([
    akitaUniverse.aktaAssetId,
    Operator.GreaterThanOrEqualTo,
    0n,
  ]);

  describe('GatePlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(gatePluginSdk.appId).toBeGreaterThan(0n);
    });

    test('register creates a gate registry entry through the wallet plugin path', async () => {
      await fundWallet();

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          gatePluginSdk.register({
            sender: user.addr,
            signer: user.signer,
            filters: [[0n, akitaUniverse.subgates.assetGate.appId, LogicalOperator.None]],
            args: [assetGateArgs()],
          }),
        ],
      });

      const size = await akitaUniverse.gate.client.send.size({
        sender: user.addr,
        signer: user.signer,
        args: { gateId: FIRST_GATE_V2_ID },
      });
      expect(size.return).toBe(1n);

      const gate = await akitaUniverse.gate.client.send.getGate({
        sender: user.addr,
        signer: user.signer,
        extraFee: algokit.microAlgo(1_000n),
        args: { gateId: FIRST_GATE_V2_ID },
      });
      expect(gate.return).toHaveLength(1);
    });

    test('register rejects invalid filter layer ordering', async () => {
      await fundWallet();

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          gatePluginSdk.register({
            sender: user.addr,
            signer: user.signer,
            filters: [
              [1n, akitaUniverse.subgates.assetGate.appId, LogicalOperator.And],
              [0n, akitaUniverse.subgates.assetGate.appId, LogicalOperator.None],
            ],
            args: [assetGateArgs(), assetGateArgs()],
          }),
        ],
      })).rejects.toThrow(errInvalidLayer);
    });
  });
});
