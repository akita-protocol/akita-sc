import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { newWallet, PollPluginSDK, WalletSDK, CallerType } from 'akita-sdk/wallet';
import { PollSDK, PollTypeEnum } from 'akita-sdk/poll';
import { GateSDK, LogicalOperator, Operator } from 'akita-sdk/gates';
import algosdk from 'algosdk';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';
import { TimeWarp } from '../../../../tests/utils/time';
import { errCreatorNotPollFactory } from './errors';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const ONE_DAY = 86_400n;

const getBlockTimestamp = async (
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient,
): Promise<bigint> => {
  const status = await algorand.client.algod.status().do();
  const block = await algorand.client.algod.block(status.lastRound).do();
  return BigInt(block.block.header.timestamp);
};

describe('Poll plugin contract', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let akitaUniverse: AkitaUniverse;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
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

    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());
    await algorand.account.ensureFunded(user.addr, dispenser.addr, (500).algo());

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
    await wallet.addPlugin({ client: pollPluginSdk, callerType: CallerType.Admin });
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
      callerType: CallerType.Admin,
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
        callerType: CallerType.Admin,
        calls: [
          pollPluginSdk.vote({
            pollAppId: poll.appId,
            votes: [1n],
            args: [],
          }),
        ],
      });

      const controlledAddress = (await wallet.client.state.global.controlledAddress())!;
      expect(await poll.hasVoted({ user: controlledAddress })).toBe(true);
      expect(await poll.getVoteCounts()).toEqual([0n, 1n, 0n]);
    });

    test('deleteBoxes clears wallet vote boxes after the poll ends', async () => {
      const poll = await createPluginPoll({ question: 'Cleanup poll?' });

      await fundWallet();
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          pollPluginSdk.vote({
            pollAppId: poll.appId,
            votes: [0n],
            args: [],
          }),
        ],
      });

      await timeWarp.timeWarp(ONE_DAY + 10n);

      const controlledAddress = (await wallet.client.state.global.controlledAddress())!;
      await wallet.usePlugin({
        callerType: CallerType.Admin,
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

    test('a gated vote from an escrow-scoped grant gates the escrow that votes', async () => {
      // Gate: social impact >= 1, which every address meets (the impact floor is 1).
      const impactGate = akitaUniverse.subgates.socialImpactGate;
      const gateSdk = new GateSDK({
        algorand,
        factoryParams: { appId: akitaUniverse.gate.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
        gateRegistry: { social_impact: impactGate.appId },
      });
      for (const address of [gateSdk.client.appAddress, impactGate.client.appAddress]) {
        await algorand.send.payment({ sender: dispenser.addr, signer: dispenser.signer, receiver: address, amount: algokit.microAlgo(1_000_000n) });
      }
      // Encode OperatorAndValue (uint8 op, uint64 value) directly: GateSDK's social_impact register
      // shape name does not resolve in this checkout (gates-family SDK issue, reported separately).
      const filters: [bigint, bigint, bigint][] = [[0n, impactGate.appId, BigInt(LogicalOperator.None)]];
      const gateArgs = [new Uint8Array([Operator.GreaterThanOrEqualTo, ...algosdk.encodeUint64(1n)])];
      const registrationCost = await gateSdk.cost({ filters, args: gateArgs });
      const { return: gateId } = await gateSdk.client.send.register({
        coverAppCallInnerTransactionFees: true,
        maxFee: algokit.microAlgo(50_000),
        args: {
          payment: algorand.createTransaction.payment({
            sender: deployer.addr, receiver: gateSdk.client.appAddress, amount: algokit.microAlgo(registrationCost),
          }),
          filters,
          args: gateArgs,
        },
      });
      const poll = await akitaUniverse.pollFactory.new({
        sender: deployer.addr,
        signer: deployer.signer,
        type: PollTypeEnum.SingleChoice,
        endTime: await getBlockTimestamp(algorand) + ONE_DAY,
        maxSelected: 1n,
        question: 'Gated escrow vote?',
        options: ['Yes', 'No'],
        gateId: gateId!,
      });

      await fundWallet();
      await wallet.addPlugin({
        client: pollPluginSdk,
        callerType: CallerType.Admin,
        escrow: 'voter',
        allowances: [{ asset: 0n, type: 'flat', amount: 2_000_000n }],
      });
      await wallet.usePlugin({
        callerType: CallerType.Admin,
        escrow: 'voter',
        fundsRequest: [{ asset: 0n, amount: 1_000_000n }],
        calls: [pollPluginSdk.vote({ pollAppId: poll.appId, votes: [0n], args: [new Uint8Array()] })],
      });

      // The vote is recorded and gated under the escrow (the spending account), not the controlled address.
      const escrow = (await wallet.getEscrow('voter')).address;
      expect(await poll.hasVoted({ user: escrow.toString() })).toBe(true);
      expect(await poll.getVoteCounts()).toEqual([1n, 0n]);
    });

    test('vote and deleteBoxes reject apps that were not created by the poll factory', async () => {
      await fundWallet();

      await expect(wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          pollPluginSdk.vote({
            pollAppId: wallet.client.appId,
            votes: [0n],
            args: [],
          }),
        ],
      })).rejects.toThrow(errCreatorNotPollFactory);

      await expect(wallet.usePlugin({
        callerType: CallerType.Admin,
        calls: [
          pollPluginSdk.deleteBoxes({
            pollAppId: wallet.client.appId,
            addresses: [user.addr.toString()],
          }),
        ],
      })).rejects.toThrow(errCreatorNotPollFactory);
    });
  });
});
