import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, SocialPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('Social plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let socialPluginSdk: SocialPluginSDK;

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

    // Get the plugin SDK and add it to the wallet once
    socialPluginSdk = akitaUniverse.socialPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    // Over-fund the wallet so it can cover:
    //   - initMeta: MetaMBR (45_300) + ImpactMetaMBR (31_700) = 77_000
    //   - follow: FollowsMBR (31_700)
    //   - inner-txn fees
    // 5 ALGO headroom is comfortable slack on all of these combined.
    await wallet.client.appClient.fundAppAccount({
      amount: algokit.microAlgo(mbr.plugins + 5_000_000n),
    });
    await wallet.addPlugin({
      client: socialPluginSdk,
      callerType: CallerType.Global,
    });
  });

  beforeEach(fixture.newScope);

  describe('SocialPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(socialPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('follows another user via plugin and records the edge on the social graph', async () => {
      // Exercise the plugin end-to-end:
      //  (1) initialize meta for the wallet via the plugin (required before any
      //      social graph action)
      //  (2) initialize meta for a freshly-generated target account (direct
      //      base-contract call; no plugin needed)
      //  (3) invoke `follow` via `wallet.usePlugin` — the plugin sends an inner
      //      payment for FollowsMBR to the graph contract and forwards to
      //      `abiCall<typeof AkitaSocialGraph.prototype.follow>`
      //  (4) read back through `social.isFollowing` on the base Social SDK and
      //      assert the edge exists.

      const walletAppAddr = wallet.client.appAddress.toString();

      // ---- (1) initMeta for the wallet, through the plugin ----
      // The base contract keys meta boxes by `Txn.sender`, and the plugin uses
      // the wallet's app address as sender. So this creates meta for the
      // wallet app account itself.
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          socialPluginSdk.initMeta({
            user: walletAppAddr,
            automated: false,
            subscriptionIndex: 0n,
            nfd: 0n,
            akitaNft: 0n,
          }),
        ],
      });

      // ---- (2) initMeta for a freshly-generated target account ----
      // The follow target must also have a meta record, or `getMeta` inside
      // the graph's follow path reverts on a missing-box read.
      const target = await fixture.context.generateAccount({
        initialFunds: algokit.microAlgos(5_000_000),
      });
      await akitaUniverse.social.initMeta({
        sender: target.addr.toString(),
        signer: target.signer,
        user: target.addr.toString(),
      });

      // Sanity: not following yet.
      const isFollowingBefore = await akitaUniverse.social.isFollowing({
        follower: walletAppAddr,
        user: target.addr.toString(),
      });
      expect(isFollowingBefore).toBe(false);

      // ---- (3) follow target via plugin ----
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          socialPluginSdk.follow({
            address: target.addr.toString(),
          }),
        ],
      });

      // ---- (4) verify through the base Social SDK ----
      const isFollowingAfter = await akitaUniverse.social.isFollowing({
        follower: walletAppAddr,
        user: target.addr.toString(),
      });
      expect(isFollowingAfter).toBe(true);
    });
  });
});
