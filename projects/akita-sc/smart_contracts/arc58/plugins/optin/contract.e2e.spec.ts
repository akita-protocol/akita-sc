import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AsaManagerPluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, getApplicationAddress} from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { expectContractError } from '../../../../tests/utils/errors';
import { errAlreadyOptedIn } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

// newAccount still pre-funds ARC58WalletIDsByAccountsMbr (Phase 4 removes it). Only the legacy register()
// spends it, and newWallet no longer registers on LocalNet (REGISTRY_WRITES_STOPPED), so the wallet holds
// exactly this much above its minimum balance. See arc58/account/contract.e2e.spec.ts.
const REGISTRATION_PREFUND = 12_100n

describe('Optin plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let asaMintSdk: AsaManagerPluginSDK;

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

    // Use AsaManager plugin from universe
    asaMintSdk = akitaUniverse.asaManagerPlugin;
  });

  beforeEach(fixture.newScope);

  describe('Optin', () => {
    test('optin OK', async () => {
      const escrow = 'mint_account';
      let mbr = await wallet.getMbr({ escrow, methodCount: 0n, plugin: '', groups: 0n });

      let walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + REGISTRATION_PREFUND);

      const fundAmount = mbr.plugins + mbr.newEscrowMintCost;

      await wallet.client.appClient.fundAppAccount({
        amount: algokit.microAlgo(fundAmount)
      });

      await wallet.addPlugin({
        client: asaMintSdk,
        callerType: CallerType.Admin,
        escrow,
      });

      walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      // newEscrowMintCost also pre-funds the escrow's registration, which addPlugin no longer spends.
      expect(walletInfo.balance.microAlgos).toEqual(walletInfo.minBalance.microAlgos + 2n * REGISTRATION_PREFUND);

      const escrowInfo = await wallet.getEscrow(escrow);
      const escrowAddress = getApplicationAddress(escrowInfo.id).toString();

      const results = await wallet.usePlugin({
        escrow,
        callerType: CallerType.Admin,
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

      const balanceBeforeDuplicate = walletInfo.balance.microAlgos;
      await expectContractError(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [optinSdk.optIn({ assets: [takta] })]
      }), errAlreadyOptedIn);

      walletInfo = await algorand.account.getInformation(wallet.client.appAddress);
      expect(walletInfo.assets?.some(({ assetId }) => assetId === takta)).toBe(true);
      expect(walletInfo.balance.microAlgos).toBe(balanceBeforeDuplicate);
      expect(walletInfo.authAddr).toBeUndefined();
    });
  });
});
