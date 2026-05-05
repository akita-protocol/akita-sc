import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaMintPluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress} from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('Optin plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let asaMintSdk: AsaMintPluginSDK;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser, (500).algo());

    // Build the full Akita DAO universe
    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });

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

    // Use AsaMint plugin from universe
    asaMintSdk = akitaUniverse.asaMintPlugin;
  });

  beforeEach(fixture.newScope);

  describe('Optin', () => {
    test('optin OK', async () => {
      const escrow = 'mint_account';
      let mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos);

      const fundAmount = mbr.plugins + mbr.newEscrowMintCost;

      await wallet.client.appClient.fundAppAccount({
        amount: algokit.microAlgo(fundAmount)
      });

      await wallet.addPlugin({
        client: asaMintSdk,
        callerType: CallerType.Global,
        escrow,
      });

      walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos);

      const escrowInfo = await wallet.getEscrow(escrow);
      const escrowAddress = getApplicationAddress(escrowInfo.id).toString();

      const results = await wallet.usePlugin({
        escrow,
        callerType: CallerType.Global,
        calls: [
          asaMintSdk.mint({
            assets: [{
              assetName: 'Test Akita',
              unitName: 'TAKTA',
              total: 1_000_000_000_000n,
              decimals: 6n,
              manager: escrowAddress,
              reserve: escrowAddress,
              freeze: ALGORAND_ZERO_ADDRESS_STRING,
              clawback: ALGORAND_ZERO_ADDRESS_STRING,
              defaultFrozen: false,
              url: 'https://akita.community',
            }]
          }),
        ]
      });

      const takta = results.returns[1][0];
      console.log('created asset:', takta);

      const optinSdk = akitaUniverse.optInPlugin;

      mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });

      await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins) });

      await wallet.addPlugin({ client: optinSdk, callerType: CallerType.Global });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [optinSdk.optIn({ assets: [takta] })]
      });

      expect(results.txIds.length).toBe(4);

      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(2);

      walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo?.assets?.length).toBe(1);
    });
  });
});
