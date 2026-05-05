import { microAlgo, algo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, describe, expect, test } from 'vitest';
import { sendPrepared } from 'akita-sdk';
import { ProposalActionEnum } from 'akita-sdk/dao';
import { CallerType } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { SunsetContractClient, SunsetContractFactory } from '../artifacts/sunset/SunsetContractClient';
import { bootstrapDaoTestContext, proposeAndExecute, type DaoTestContext } from '../arc58/dao/tests/utils';

const fixture = algorandFixture();

/**
 * Integration test for the full sunset lifecycle.
 *
 * Proves the end-to-end teardown flow that the redeployment plan relies on:
 *   1. A live DAO-owned upgradable contract (the auction factory) is updated
 *      in-place via the DAO's `UpdateAkitaDAO` plugin to `SunsetContract`
 *      bytecode — with `TMPL_SUNSET_CALLER` baked in at compile time.
 *   2. The now-sunsetted app is torn down via the `SunsetContract`'s
 *      `delete(address)void` abimethod, draining any residual balance to a
 *      recipient (the intended destination in production is a new DAO escrow).
 *
 * Suites A and B cover the contract's direct behavior and the plugin wrapper,
 * respectively. This suite's unique job is to prove that the DAO's update
 * mechanism can produce a functioning `SunsetContract` at a pre-existing
 * appId — i.e., that template-var substitution survives the upgrade path and
 * the auth check works post-swap.
 */
describe('Sunset lifecycle (DAO upgrade → SunsetContract → delete)', () => {
  let context: DaoTestContext;

  beforeAll(async () => {
    context = await bootstrapDaoTestContext({ fixture, useFullSetup: true });
  });

  test('DAO updates AuctionFactory to SunsetContract and then deletes it', async () => {
    const { fixture, dao, sender, signer, daoUpdatePluginSdk, auctionFactory } = context;
    const { algorand } = fixture.context;

    expect(daoUpdatePluginSdk).toBeDefined();
    expect(auctionFactory).toBeDefined();

    const wallet = dao.wallet;
    const daoUpdateSdk = daoUpdatePluginSdk!;
    const targetAppId = auctionFactory!.appId;

    // --- Setup: fund the sender so there's headroom for proposal + upgrade fees.
    const dispenser = await algorand.account.dispenserFromEnvironment();
    await algorand.account.ensureFunded(sender, dispenser, algo(50));

    // --- Phase 1: compile SunsetContract with SUNSET_CALLER pinned to the
    //             test sender. After the upgrade, the sender can directly act
    //             as the template-var branch of auth regardless of who
    //             Global.creatorAddress resolves to post-swap.
    //
    // NOTE: `AppFactory.compile()` doesn't inherit the constructor's
    // `deployTimeParams` — it only uses params passed explicitly to `compile`.
    // Pass them here so the substitution happens before algod compiles the
    // TEAL (otherwise algod sees the literal `TMPL_SUNSET_CALLER` token and
    // rejects the program).
    const sunsetFactory = new SunsetContractFactory({
      algorand,
      defaultSender: sender,
      defaultSigner: signer,
    });
    const compiledSunset = await sunsetFactory.appFactory.compile({
      deployTimeParams: {
        // AlgoKit encodes string template values as UTF-8 bytes; for address-
        // typed template vars we need the raw 32-byte public key so it matches
        // `txn Sender` byte-for-byte in TEAL.
        SUNSET_CALLER: algosdk.decodeAddress(sender).publicKey,
      },
    });

    // --- Phase 2: fund the DAO wallet for plugin MBR, build the update
    //             execution, re-fund for the actual group, then propose +
    //             execute the upgrade and send the prepared group.
    const preFundMbr = await wallet.getMbr({
      escrow: '',
      methodCount: 0n,
      plugin: '',
      groups: 4n,
    });
    await wallet.client.appClient.fundAppAccount({
      amount: microAlgo(preFundMbr.plugins + preFundMbr.executions + 2_000_000n),
    });

    const shortTimestamp = Date.now() % 1_000_000;
    const execution = await wallet.build.usePlugin({
      sender,
      signer,
      lease: `af_sunset_${shortTimestamp}`,
      windowSize: 2000n,
      callerType: CallerType.Global,
      calls: [
        daoUpdateSdk.updateApp({
          sender,
          signer,
          appId: targetAppId,
          version: '1.0.0-sunset',
          data: compiledSunset.approvalProgram,
        }),
      ],
    });

    const groupMbr = await wallet.getMbr({
      escrow: '',
      methodCount: 0n,
      plugin: '',
      groups: BigInt(execution.windows.length),
    });
    await wallet.client.appClient.fundAppAccount({
      amount: microAlgo(groupMbr.plugins + groupMbr.executions + 1_000_000n),
    });

    await proposeAndExecute(dao, [{
      type: ProposalActionEnum.UpgradeApp,
      app: targetAppId,
      executionKey: execution.lease,
      groups: execution.ids,
      firstValid: execution.firstValid,
      lastValid: execution.lastValid,
    }]);
    await sendPrepared(execution.windows[0], wallet.client.algorand.client.algod);

    // --- Phase 3: confirm the upgrade landed — the target app should still
    //             exist, and calling SunsetContract's `delete` abimethod on
    //             its appId should now succeed. If the old AuctionFactory
    //             approval was still live, this call would 404 on the method
    //             selector or fail its own auth.
    const infoAfterUpgrade = await algorand.app.getById(targetAppId);
    expect(infoAfterUpgrade.appAddress.toString()).toBeTruthy();

    const sunsettedTarget = new SunsetContractClient({
      algorand,
      appId: targetAppId,
      defaultSender: sender,
      defaultSigner: signer,
    });

    // An app can't be deleted (via closeRemainderTo) while it still has
    // boxes, so first sweep whatever AuctionFactory left behind. This is
    // exactly what the production teardown plan calls for: `deleteBoxes`
    // the residual state, then `delete` to drain the app account.
    const residualBoxes = await algorand.app.getBoxNames(targetAppId);
    if (residualBoxes.length > 0) {
      await sunsettedTarget.send.deleteBoxes({
        sender,
        signer,
        args: { boxes: residualBoxes.map((b) => b.nameRaw) },
        // Each box reference counts against the call's resource budget; let
        // algokit populate them from the simulate resources.
        populateAppCallResources: true,
      });

      // Sanity check: boxes are gone.
      const boxesAfterSweep = await algorand.app.getBoxNames(targetAppId);
      expect(boxesAfterSweep.length).toBe(0);
    }

    const recipient = await fixture.context.generateAccount({
      initialFunds: microAlgo(100_000),
    });
    const recipientBalanceBefore = await algorand.account.getInformation(recipient.addr);

    // --- Phase 4: tear down the sunsetted app. The sender is the pinned
    //             TMPL_SUNSET_CALLER, so the auth check passes via the
    //             template-var branch regardless of the original creator.
    await sunsettedTarget.send.delete.delete({
      sender,
      signer,
      args: { closeRemainderTo: recipient.addr.toString() },
      // Outer app call + inner close-remainder payment → cover both fees.
      maxFee: microAlgo(10_000n),
      coverAppCallInnerTransactionFees: true,
    });

    // --- Assertions: the app is gone, and its residual balance flowed to
    //             the recipient.
    await expect(algorand.app.getById(targetAppId)).rejects.toThrow();

    const recipientBalanceAfter = await algorand.account.getInformation(recipient.addr);
    expect(recipientBalanceAfter.balance.microAlgos).toBeGreaterThan(
      recipientBalanceBefore.balance.microAlgos,
    );
  });
});
