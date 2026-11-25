import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, SocialPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { RefType } from 'akita-sdk/social';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { errPluginNotAuthAddr } from '../../../utils/errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

describe('Social plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
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

    // Get the plugin SDK and add it to the wallet once. The self-opt-in plugin
    // lets the wallet hold AKTA for staking-impact commitment coverage.
    socialPluginSdk = akitaUniverse.socialPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    // Over-fund the wallet so it can cover:
    //   - both plugin records
    //   - initMeta: MetaMBR (45_300) + ImpactMetaMBR (31_700) = 77_000
    //   - follow: FollowsMBR (31_700)
    //   - AKTA opt-in and staking-impact commitment MBR
    //   - inner-txn fees
    // 5 ALGO headroom is comfortable slack on all of these combined.
    await wallet.client.appClient.fundAppAccount({
      amount: algokit.microAlgo(mbr.plugins * 2n + 5_000_000n),
    });
    await wallet.addPlugin({
      client: socialPluginSdk,
      callerType: CallerType.Global,
    });
    await wallet.addPlugin({
      client: akitaUniverse.selfOptInPlugin,
      callerType: CallerType.Global,
    });
  });

  beforeEach(fixture.newScope);

  describe('SocialPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(2);
      expect(socialPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('creates and updates the wallet social-impact staking commitment', async () => {
      const asset = akitaUniverse.aktaAssetId;
      const initialAmount = 1_000_000n;
      const additionalAmount = 500_000n;
      const walletAddress = wallet.client.appAddress.toString();

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [akitaUniverse.selfOptInPlugin.optIn({ assets: [asset] })],
      });

      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: walletAddress,
        assetId: asset,
        amount: initialAmount + additionalAmount,
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          socialPluginSdk.commitStakingImpact({
            amount: initialAmount,
            inheritRoot: false,
          }),
        ],
      });

      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          socialPluginSdk.commitStakingImpact({
            amount: additionalAmount,
            inheritRoot: false,
          }),
        ],
      });

      const appStake = await akitaUniverse.staking.getAppWeightedStake({
        app: akitaUniverse.social.impactAppId,
        address: walletAddress,
        asset,
        acceptInherited: false,
      });
      expect(appStake.amount).toBe(initialAmount + additionalAmount);
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

    test('votes, replies, and reacts to a zero-creator reference without attempting a creator tip', async () => {
      const zeroCreatorWallet = await newWallet({
        algorand,
        factoryParams: {
          appId: akitaUniverse.walletFactory.appId,
          defaultSender: user.addr,
          defaultSigner: user.signer,
        },
        sender: user.addr,
        signer: user.signer,
        nickname: 'Zero Creator Vote Wallet',
      });
      const walletAddress = zeroCreatorWallet.client.appAddress.toString();
      const asset = akitaUniverse.aktaAssetId;
      const mbr = await zeroCreatorWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });

      await zeroCreatorWallet.client.appClient.fundAppAccount({
        amount: algokit.microAlgo(mbr.plugins * 2n + 5_000_000n),
      });
      await zeroCreatorWallet.addPlugin({ client: socialPluginSdk, callerType: CallerType.Global });
      await zeroCreatorWallet.addPlugin({
        client: akitaUniverse.selfOptInPlugin,
        callerType: CallerType.Global,
      });
      await zeroCreatorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [akitaUniverse.selfOptInPlugin.optIn({ assets: [asset] })],
      });
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: walletAddress,
        assetId: asset,
        amount: 50_000_000n,
      });
      await zeroCreatorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          socialPluginSdk.initMeta({
            user: walletAddress,
            automated: false,
            subscriptionIndex: 0n,
            nfd: 0n,
            akitaNft: 0n,
          }),
        ],
      });

      const ref = new Uint8Array(32);
      const escrow = await akitaUniverse.social.socialClient.state.global.akitaDaoEscrow();
      expect(escrow).toBeDefined();
      const escrowAddress = algosdk.getApplicationAddress(escrow!.app).toString();
      const escrowBefore = await algorand.account.getInformation(escrowAddress);
      const escrowBalanceBefore = escrowBefore.assets?.find(({ assetId }) => assetId === asset)?.amount ?? 0n;
      const { reactFee } = await akitaUniverse.social.getSocialFees();

      await zeroCreatorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [socialPluginSdk.vote({ ref, type: RefType.Address, isUp: true })],
      });

      const vote = await akitaUniverse.social.getVote({ account: walletAddress, ref });
      expect(vote.isUp).toBe(true);
      expect(vote.impact).toBeGreaterThan(0n);

      const status = await algorand.client.algod.status().do();
      const timestamp = (await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp;
      await zeroCreatorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          socialPluginSdk.reply({
            timestamp,
            nonce: new Uint8Array(24).fill(1),
            cid: new Uint8Array(36).fill(2),
            ref,
            type: RefType.Address,
            gateId: 0n,
            usePayWall: false,
            payWallId: 0n,
            creatorFlags: 0n,
          }),
        ],
      });

      await zeroCreatorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [socialPluginSdk.react({ ref, type: RefType.Address, nft: asset })],
      });

      const reactionExists = await akitaUniverse.social.socialClient.getReactionExists({
        args: { ref, nft: asset },
      });
      expect(reactionExists).toBe(true);

      const escrowAfter = await algorand.account.getInformation(escrowAddress);
      const escrowBalanceAfter = escrowAfter.assets?.find(({ assetId }) => assetId === asset)?.amount ?? 0n;
      expect(escrowBalanceAfter - escrowBalanceBefore).toBe(reactFee * 3n);
    });

    test('a referred wallet posts, edits its post, replies and edits the reply through the plugin', async () => {
      // S-10a/b: the plugin read a reply's parent from the CID bytes and under-quoted the
      // edit / referral MBR, so edits (and any post by a wallet with a referrer) reverted.
      const editorWallet = await newWallet({
        algorand,
        factoryParams: {
          appId: akitaUniverse.walletFactory.appId,
          defaultSender: user.addr,
          defaultSigner: user.signer,
        },
        sender: user.addr,
        signer: user.signer,
        nickname: 'Editor Wallet',
        referrer: deployer.addr.toString(),
      });
      const walletAddress = editorWallet.client.appAddress.toString();
      const asset = akitaUniverse.aktaAssetId;
      const social = akitaUniverse.social;
      const { postFee, reactFee } = await social.getSocialFees();

      const mbr = await editorWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
      await editorWallet.client.appClient.fundAppAccount({
        amount: algokit.microAlgo(mbr.plugins * 2n + 10_000_000n),
      });
      await editorWallet.addPlugin({ client: socialPluginSdk, callerType: CallerType.Global });
      await editorWallet.addPlugin({ client: akitaUniverse.selfOptInPlugin, callerType: CallerType.Global });
      await editorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [akitaUniverse.selfOptInPlugin.optIn({ assets: [asset] })],
      });
      await algorand.send.assetTransfer({
        sender: deployer.addr,
        signer: deployer.signer,
        receiver: walletAddress,
        assetId: asset,
        amount: postFee * 2n + reactFee * 2n,
      });
      await editorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [socialPluginSdk.initMeta({ user: walletAddress, automated: false, subscriptionIndex: 0n, nfd: 0n, akitaNft: 0n })],
      });

      const chainTime = async () => {
        const status = await algorand.client.algod.status().do();
        return (await algorand.client.algod.block(status.lastRound).do()).block.header.timestamp;
      };

      // post
      const postNonce = new Uint8Array(24).fill(7);
      const postCid = new Uint8Array(36).fill(3);
      const postTs = await chainTime();
      await editorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [socialPluginSdk.post({ timestamp: postTs, nonce: postNonce, cid: postCid, gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n })],
      });
      const postKey = social.computePostKey(walletAddress, postTs, postNonce);
      expect((await social.getPost({ ref: postKey })).creator).toBe(walletAddress);

      // edit the post
      const editCid = new Uint8Array(36).fill(4);
      await editorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [socialPluginSdk.editPost({ cid: editCid, amendment: postKey, creatorFlags: 0n })],
      });
      const editKey = social.computeEditKey(walletAddress, postKey, editCid);
      expect(Number((await social.getPost({ ref: editKey })).postType)).toBe(2);

      // reply to the post
      const replyNonce = new Uint8Array(24).fill(8);
      const replyCid = new Uint8Array(36).fill(5);
      const replyTs = await chainTime();
      await editorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [socialPluginSdk.reply({
          timestamp: replyTs, nonce: replyNonce, cid: replyCid, ref: postKey, type: RefType.Post,
          gateId: 0n, usePayWall: false, payWallId: 0n, creatorFlags: 0n,
        })],
      });
      const replyKey = social.computePostKey(walletAddress, replyTs, replyNonce);

      // edit the reply
      const replyEditCid = new Uint8Array(36).fill(6);
      await editorWallet.usePlugin({
        callerType: CallerType.Global,
        calls: [socialPluginSdk.editReply({ cid: replyEditCid, amendment: replyKey, creatorFlags: 0n })],
      });
      const replyEdit = await social.getPost({ ref: social.computeEditKey(walletAddress, replyKey, replyEditCid) });
      expect(Number(replyEdit.postType)).toBe(3);
      // EditReply ref: CID + parentRef + originalKey
      expect(Buffer.from(replyEdit.ref.slice(36, 68))).toEqual(Buffer.from(postKey));
    });

    test('rejects plugin calls for a wallet whose spending account is not rekeyed to the plugin', async () => {
      // F5: without the auth-address check a spoofed `wallet` could make the plugin spend from
      // any account that is not currently delegated to it.
      await expect(socialPluginSdk.client.send.follow({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { wallet: wallet.client.appId, rekeyBack: false, address: deployer.addr.toString() },
        populateAppCallResources: true,
        coverAppCallInnerTransactionFees: true,
        maxFee: algokit.microAlgo(20_000),
      })).rejects.toThrow(new RegExp(errPluginNotAuthAddr));
    });
  });
});
