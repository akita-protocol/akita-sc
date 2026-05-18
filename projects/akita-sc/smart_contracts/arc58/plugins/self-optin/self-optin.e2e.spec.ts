import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { Address, SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import algosdk from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { CallerType, newWallet, SelfOptInPluginSDK, WalletSDK } from 'akita-sdk/wallet';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { ERR_ALREADY_OPTED_IN } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

const createAsset = async ({
  algorand,
  sender,
  signer,
  assetName,
}: {
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  sender: string;
  signer: algosdk.TransactionSigner;
  assetName: string;
}) => {
  const result = await algorand.send.assetCreate({
    sender,
    signer,
    total: 1_000_000n,
    decimals: 0,
    defaultFrozen: false,
    assetName,
    unitName: 'SELF',
  });

  return BigInt(result.confirmation.assetId!);
};

describe('Self opt-in plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let selfOptInPluginSdk: SelfOptInPluginSDK;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser, (500).algo());

    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });

    selfOptInPluginSdk = akitaUniverse.selfOptInPlugin;
  });

  beforeEach(async () => {
    await fixture.newScope();

    wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: akitaUniverse.walletFactory.appId,
        defaultSender: user.addr,
        defaultSigner: user.signer,
      },
      sender: user.addr,
      signer: user.signer,
      nickname: 'Self OptIn Test Wallet',
    });

    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({
      amount: algokit.microAlgo(mbr.plugins + 1_000_000n),
    });
    await wallet.addPlugin({ client: selfOptInPluginSdk, callerType: CallerType.Global });
  });

  describe('optIn', () => {
    test('opts the wallet into one asset without an external MBR payment', async () => {
      const assetId = await createAsset({
        algorand,
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        assetName: 'Self OptIn Single',
      });

      const before = await algorand.account.getInformation(wallet.client.appAddress);
      expect(before.assets?.some((asset) => asset.assetId === assetId)).toBe(false);

      const results = await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [selfOptInPluginSdk.optIn({ assets: [assetId] })],
      });

      const after = await algorand.account.getInformation(wallet.client.appAddress);
      const holding = after.assets?.find((asset) => asset.assetId === assetId);

      expect(results.txIds.length).toBeGreaterThan(0);
      expect(holding?.amount).toBe(0n);
      expect(after.minBalance.microAlgos - before.minBalance.microAlgos).toBe(100_000n);
    });

    test('opts the wallet into multiple assets in one plugin call', async () => {
      const firstAssetId = await createAsset({
        algorand,
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        assetName: 'Self OptIn Multi A',
      });
      const secondAssetId = await createAsset({
        algorand,
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        assetName: 'Self OptIn Multi B',
      });

      const before = await algorand.account.getInformation(wallet.client.appAddress);

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [selfOptInPluginSdk.optIn({ assets: [firstAssetId, secondAssetId] })],
      });

      const after = await algorand.account.getInformation(wallet.client.appAddress);
      expect(after.assets?.find((asset) => asset.assetId === firstAssetId)?.amount).toBe(0n);
      expect(after.assets?.find((asset) => asset.assetId === secondAssetId)?.amount).toBe(0n);
      expect(after.minBalance.microAlgos - before.minBalance.microAlgos).toBe(200_000n);
    });

    test('rejects an asset the wallet is already opted into', async () => {
      const assetId = await createAsset({
        algorand,
        sender: deployer.addr.toString(),
        signer: deployer.signer,
        assetName: 'Self OptIn Duplicate',
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [selfOptInPluginSdk.optIn({ assets: [assetId] })],
      });

      await expect(
        wallet.usePlugin({
          callerType: CallerType.Global,
          calls: [selfOptInPluginSdk.optIn({ assets: [assetId] })],
        })
      ).rejects.toThrow(ERR_ALREADY_OPTED_IN);
    });
  });
});
