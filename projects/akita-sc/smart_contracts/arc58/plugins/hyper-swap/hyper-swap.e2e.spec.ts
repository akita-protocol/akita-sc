import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { HyperSwapPluginSDK, newWallet, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('HyperSwap plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let hyperSwapPluginSdk: HyperSwapPluginSDK;

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

    // Get plugin SDK and add it to the wallet once
    hyperSwapPluginSdk = akitaUniverse.hyperSwapPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    // Fund the wallet with plugin MBR + ~0.5 ALGO headroom. The offer flow
    // requires the plugin to forward an inner payment of
    // `offers + participants + 2 * (mm.root + mm.data)` microAlgos (~222_200)
    // to the base HyperSwap contract, so 500_000 is comfortable slack.
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 500_000n) });
    await wallet.addPlugin({ client: hyperSwapPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(fixture.newScope);

  describe('HyperSwapPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(hyperSwapPluginSdk.appId).toBeGreaterThan(0n);
    });

    // Full `offer` plugin flow is not exercised here because the base
    // HyperSwap contract forwards the root to MetaMerkles.addRoot using
    // `String(root)` as the name, but addRoot asserts `Bytes(name).length <= 31`
    // (ERR:NTL = ERR_NAME_TOO_LONG). A 32-byte root yields a 32-byte name,
    // which trips that assertion on any random root. The base hyper-swap
    // e2e spec (smart_contracts/hyper-swap/hyper-swap.e2e.spec.ts) stubs
    // the offer/accept/escrow/disburse/cancel/withdraw flows with test.todo
    // for the same reason — none of the offer paths are reachable until the
    // base contract encodes a short name for addRoot. The plugin cannot be
    // tested further until that upstream issue is resolved, since every
    // other plugin method (accept, escrow, disburse, cancel, withdraw)
    // requires an existing offer.
    test.todo('creates a hyper-swap offer via plugin (blocked: ERR_NAME_TOO_LONG in base HyperSwap.offer)');
    test.todo('accepts an offer as participant via plugin');
    test.todo('escrows ALGO into an offer leaf via plugin');
    test.todo('cancels an active offer via plugin');
  });
});
