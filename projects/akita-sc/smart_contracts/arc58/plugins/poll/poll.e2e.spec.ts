import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, PollPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { PollSDK, PollTypeEnum } from 'akita-sdk/poll';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { TimeWarp } from '../../../../tests/utils/time';
import { ERR_CREATOR_NOT_POLL_FACTORY } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const ONE_DAY = 86_400n;

const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status();
  const block = await algorand.client.algod.block(status.lastRound);
  return BigInt(block.block.header.timestamp);
};

describe('Poll plugin contract', () => {
  let deployer: Address & TransactionSignerAccount;
  let user: Address & TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient;
  let wallet: WalletSDK;
  let pollPluginSdk: PollPluginSDK;
  let timeWarp: TimeWarp;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    dispenser = await algorand.account.dispenserFromEnvironment();
    timeWarp = new TimeWarp(algorand);
    await timeWarp.resetTimeWarp();

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
    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: akitaUniverse.pollFactory.client.appAddress,
      amount: algokit.microAlgo(10_000_000n),
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
    pollPluginSdk = akitaUniverse.pollPlugin;
    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins) });
    await wallet.addPlugin({ client: pollPluginSdk, callerType: CallerType.Global });
  });

  beforeEach(async () => {
    await fixture.newScope();
    await timeWarp.resetTimeWarp();
  });

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

  const createPluginPoll = async ({
    question = 'Which plugin path should be tested?',
    options = ['Create', 'Vote', 'Cleanup'],
  }: {
    question?: string;
    options?: string[];
  } = {}): Promise<PollSDK> => {
    await fundWallet();

    const results = await wallet.usePlugin({
      callerType: CallerType.Global,
      calls: [
        pollPluginSdk.new({
          type: PollTypeEnum.SingleChoice,
          endTime: await getBlockTimestamp(algorand) + ONE_DAY,
          maxSelected: 1n,
          question,
          options,
          gateId: 0n,
        }),
      ],
    });

    const pollAppId = BigInt(results.returns[1]);
    expect(pollAppId).toBeGreaterThan(0n);

    return akitaUniverse.pollFactory.get({ appId: pollAppId });
  };

  describe('PollPlugin SDK', () => {
    test('plugin can be added to wallet', async () => {
      // Verify the plugin was successfully added
      const plugins = await wallet.getPlugins();
      expect(plugins.size).toBe(1);
      expect(pollPluginSdk.appId).toBeGreaterThan(0n);
    });

    test('new creates a poll through the wallet plugin path', async () => {
      const poll = await createPluginPoll({
        question: 'Favorite plugin test?',
        options: ['Smoke', 'Behavior', 'Regression'],
      });

      const state = await poll.state();
      expect(state.type).toBe(PollTypeEnum.SingleChoice);
      expect(state.question).toBe('Favorite plugin test?');
      expect(state.optionCount).toBe(3n);
      expect(await poll.getOptions()).toEqual(['Smoke', 'Behavior', 'Regression']);
    });

    test('vote records a wallet vote and updates poll counts', async () => {
      const poll = await createPluginPoll();

      await fundWallet();
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          pollPluginSdk.vote({
            pollAppId: poll.appId,
            votes: [1n],
            args: [],
          }),
        ],
      });

      const controlledAddress = await wallet.client.state.global.controlledAddress();
      expect(await poll.hasVoted({ user: controlledAddress })).toBe(true);
      expect(await poll.getVoteCounts()).toEqual([0n, 1n, 0n]);
    });

    test('deleteBoxes clears wallet vote boxes after the poll ends', async () => {
      const poll = await createPluginPoll({ question: 'Cleanup poll?' });

      await fundWallet();
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          pollPluginSdk.vote({
            pollAppId: poll.appId,
            votes: [0n],
            args: [],
          }),
        ],
      });

      await timeWarp.timeWarp(ONE_DAY + 10n);

      const controlledAddress = await wallet.client.state.global.controlledAddress();
      await wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          pollPluginSdk.deleteBoxes({
            pollAppId: poll.appId,
            addresses: [controlledAddress],
          }),
        ],
      });

      const state = await poll.state();
      expect(state.boxCount).toBe(0n);
      expect(await poll.hasVoted({ user: controlledAddress })).toBe(false);
    });

    test('vote and deleteBoxes reject apps that were not created by the poll factory', async () => {
      await fundWallet();

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          pollPluginSdk.vote({
            pollAppId: wallet.client.appId,
            votes: [0n],
            args: [],
          }),
        ],
      })).rejects.toThrow(ERR_CREATOR_NOT_POLL_FACTORY);

      await expect(wallet.usePlugin({
        callerType: CallerType.Global,
        calls: [
          pollPluginSdk.deleteBoxes({
            pollAppId: wallet.client.appId,
            addresses: [user.addr.toString()],
          }),
        ],
      })).rejects.toThrow(ERR_CREATOR_NOT_POLL_FACTORY);
    });
  });
});
