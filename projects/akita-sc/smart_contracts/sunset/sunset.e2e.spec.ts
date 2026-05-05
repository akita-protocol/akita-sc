import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { TransactionSignerAccount, Address } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, describe, expect, test } from 'vitest';
import { deploySunsetContract } from '../../tests/fixtures/sunset';
import { SunsetContractClient } from '../artifacts/sunset/SunsetContractClient';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

/**
 * Direct tests for `SunsetContract` — the teardown bytecode that gets pushed
 * into soon-to-be-deleted Akita contracts via the DAO's update plugin.
 *
 * The contract exposes four methods:
 *   - `delete(closeRemainderTo)`  (DeleteApplication OC, auth-gated)
 *   - `deleteBoxes(boxes)`        (NoOp, no auth — ops are self-scoped)
 *   - `closeOut(closes)`          (NoOp, auth-gated)
 *   - `deleteAssets(assets)`      (NoOp, auth-gated)
 *
 * Auth accepts either:
 *   - `Global.creatorAddress`  — whoever created the app
 *   - `TMPL_SUNSET_CALLER`     — an address baked in at compile time
 *
 * These tests exercise the bare contract (no ARC-58 wallet, no DAO), so the
 * creator branch is the deployer and the template-var branch is whatever we
 * pin `SUNSET_CALLER` to when we call `factory.deploy` via `deploySunsetContract`.
 *
 * Non-empty `closeOut` / `deleteAssets` scenarios are covered by the plugin
 * and integration suites, since getting a freshly-deployed sunset contract to
 * hold ASAs (or manage them) requires an opt-in path the contract doesn't
 * expose.
 */
describe('SunsetContract (direct)', () => {
  let deployer: Address & TransactionSignerAccount;
  let sunsetCaller: Address & TransactionSignerAccount;
  let stranger: Address & TransactionSignerAccount;
  let algorand: ReturnType<typeof algokit.AlgorandClient.fromConfig>;

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    const dispenser = await algorand.account.dispenserFromEnvironment();

    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(1_000_000_000) });
    sunsetCaller = await ctx.generateAccount({ initialFunds: algokit.microAlgos(1_000_000_000) });
    stranger = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });

    await algorand.account.ensureFunded(deployer.addr, dispenser, (1000).algo());
    await algorand.account.ensureFunded(sunsetCaller.addr, dispenser, (1000).algo());
    await algorand.account.ensureFunded(stranger.addr, dispenser, (500).algo());
  });

  /**
   * Fresh sunset contract per test to avoid state coupling — the `delete`
   * tests consume the contract, and the auth-failure tests can leave assets
   * in an awkward state for the next test.
   */
  const freshSunset = async (): Promise<SunsetContractClient> => {
    return deploySunsetContract({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      sunsetCaller: sunsetCaller.addr.toString(),
    });
  };

  describe('delete', () => {
    test('creator can delete and close remainder to a recipient', async () => {
      const client = await freshSunset();
      const recipient = await fixture.context.generateAccount({
        initialFunds: algokit.microAlgos(100_000),
      });
      const recipientBalanceBefore = await algorand.account.getInformation(recipient.addr);

      const result = await client.send.delete.delete({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { closeRemainderTo: recipient.addr.toString() },
        // Inner payment for the close-remainder, plus outer: two fees total.
        maxFee: algokit.microAlgo(10_000),
        coverAppCallInnerTransactionFees: true,
      });

      expect(result.confirmations?.[0]?.confirmedRound).toBeGreaterThan(0n);

      // The app account is drained via closeRemainderTo; the recipient's
      // balance should have grown by (original MBR-funded balance - inner fee).
      const recipientBalanceAfter = await algorand.account.getInformation(recipient.addr);
      expect(recipientBalanceAfter.balance.microAlgos).toBeGreaterThan(
        recipientBalanceBefore.balance.microAlgos,
      );
    });

    test('baked-in SUNSET_CALLER can delete', async () => {
      const client = await freshSunset();
      const recipient = await fixture.context.generateAccount({
        initialFunds: algokit.microAlgos(100_000),
      });

      await client.send.delete.delete({
        sender: sunsetCaller.addr,
        signer: sunsetCaller.signer,
        args: { closeRemainderTo: recipient.addr.toString() },
        maxFee: algokit.microAlgo(10_000),
        coverAppCallInnerTransactionFees: true,
      });

      // If we got here the auth branch accepted sunsetCaller — the test
      // succeeds by not throwing. Confirm the app was actually deleted by
      // trying to read its app info.
      await expect(
        algorand.app.getById(client.appId),
      ).rejects.toThrow();
    });

    test('unauthorized sender cannot delete', async () => {
      const client = await freshSunset();
      await expect(
        client.send.delete.delete({
          sender: stranger.addr,
          signer: stranger.signer,
          args: { closeRemainderTo: stranger.addr.toString() },
          maxFee: algokit.microAlgo(10_000),
          coverAppCallInnerTransactionFees: true,
        }),
      ).rejects.toThrow();
    });
  });

  describe('deleteBoxes', () => {
    // `deleteBoxes` has no auth on purpose: `op.Box.delete` only acts on the
    // contract's own boxes, and any MBR reclaimed sits in the app account
    // until the auth-gated `delete` closes it out. That's what we exercise
    // here — an empty-batch call is a safe smoke test that the method is
    // wired up and accepts its args.
    test('accepts an empty batch without error', async () => {
      const client = await freshSunset();
      const result = await client.send.deleteBoxes({
        sender: stranger.addr,
        signer: stranger.signer,
        args: { boxes: [] },
      });
      expect(result.confirmations?.[0]?.confirmedRound).toBeGreaterThan(0n);
    });

    test('accepts a batch of non-existent box names as a no-op', async () => {
      // `op.Box.delete` returns false on a miss — it doesn't throw — so a
      // batch of nonexistent names is a safe drain-nothing op. Useful to
      // confirm the loop bounds + args encoding work end-to-end.
      const client = await freshSunset();
      const boxes = [new TextEncoder().encode('nope-one'), new TextEncoder().encode('nope-two')];
      const result = await client.send.deleteBoxes({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { boxes },
        // Each nonexistent box still shows up as a BoxRef the app touches,
        // so let algokit populate it from the simulate resources.
        populateAppCallResources: true,
      });
      expect(result.confirmations?.[0]?.confirmedRound).toBeGreaterThan(0n);
    });
  });

  describe('closeOut', () => {
    test('authorized caller accepts an empty batch', async () => {
      const client = await freshSunset();
      const result = await client.send.closeOut({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { closes: [] },
      });
      expect(result.confirmations?.[0]?.confirmedRound).toBeGreaterThan(0n);
    });

    test('SUNSET_CALLER accepts an empty batch', async () => {
      const client = await freshSunset();
      const result = await client.send.closeOut({
        sender: sunsetCaller.addr,
        signer: sunsetCaller.signer,
        args: { closes: [] },
      });
      expect(result.confirmations?.[0]?.confirmedRound).toBeGreaterThan(0n);
    });

    test('unauthorized sender is rejected even with an empty batch', async () => {
      const client = await freshSunset();
      await expect(
        client.send.closeOut({
          sender: stranger.addr,
          signer: stranger.signer,
          args: { closes: [] },
        }),
      ).rejects.toThrow();
    });
  });

  describe('deleteAssets', () => {
    test('authorized caller accepts an empty batch', async () => {
      const client = await freshSunset();
      const result = await client.send.deleteAssets({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { assets: [] },
      });
      expect(result.confirmations?.[0]?.confirmedRound).toBeGreaterThan(0n);
    });

    test('unauthorized sender is rejected even with an empty batch', async () => {
      const client = await freshSunset();
      await expect(
        client.send.deleteAssets({
          sender: stranger.addr,
          signer: stranger.signer,
          args: { assets: [] },
        }),
      ).rejects.toThrow();
    });

    test('destroys an asset whose manager is the sunset app', async () => {
      // Create an ASA whose manager is the sunset app. The destroy rule
      // ("all units at the creator") is satisfied because we mint total=1
      // and leave it held by the creator (deployer); the destroy inner-txn
      // fired by the sunset contract only needs to be signed by the asset's
      // manager, which is exactly the app we're about to call.
      const client = await freshSunset();
      const { assetId } = await algorand.send.assetCreate({
        sender: deployer.addr,
        signer: deployer.signer,
        total: 1n,
        decimals: 0,
        defaultFrozen: false,
        unitName: 'SUN',
        assetName: 'Sunset Test',
        manager: client.appAddress.toString(),
        reserve: client.appAddress.toString(),
      });

      // Move the single unit into the creator's account via the usual
      // creator → creator path — on localnet the creator already holds all
      // units at mint time, so nothing else is needed before destroy.
      const info = await algorand.app.getById(client.appId);
      expect(info.appAddress.toString()).toBeTruthy();

      const result = await client.send.deleteAssets({
        sender: deployer.addr,
        signer: deployer.signer,
        args: { assets: [assetId] },
        maxFee: algokit.microAlgo(10_000),
        coverAppCallInnerTransactionFees: true,
      });
      expect(result.confirmations?.[0]?.confirmedRound).toBeGreaterThan(0n);

      // Asset no longer exists — algod returns a 404 for the info lookup.
      await expect(algorand.asset.getById(assetId)).rejects.toThrow();
    });
  });
});
