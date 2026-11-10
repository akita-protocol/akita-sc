import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import { ABIMethod, getApplicationAddress } from 'algosdk';
import { describe, expect, test, vi } from 'vitest';
import { APP_SPEC, RafflePluginClient } from '../../generated/RafflePluginClient';
import {
  RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE,
  RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES,
  RAFFLE_PLUGIN_NEW_RAFFLE,
  RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES,
  RafflePluginSDK,
} from './raffle';

/**
 * Principal resolution review fix (IMPLEMENTATION-LOG, auction/raffle review fixes): RafflePlugin v3
 * keeps the DEPLOYED `newRaffle` / `newPrizeBoxRaffle` signatures (MainNet 3569561863, no
 * `minEntries`) and adds the `minEntries` form as a second overload. The SDK hook sends the deployed
 * form unless `minEntries > 0`, and a selector-only hook carries both selectors.
 */

const SENDER = getApplicationAddress(1n).toString();
const MARKET = getApplicationAddress(2n).toString();
const hex = (selector: Uint8Array) => Buffer.from(selector).toString('hex');
const sel = (signature: string) => hex(ABIMethod.fromSignature(signature).getSelector());
const signatures = APP_SPEC.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`);

function pluginSdk(appId = 4_242n) {
  const signer = vi.fn();
  const client = new RafflePluginClient({ appId, algorand: AlgorandClient.defaultLocalNet(), defaultSender: SENDER, defaultSigner: signer });
  const sdk = Object.create(RafflePluginSDK.prototype) as RafflePluginSDK;
  sdk.client = client;
  sdk.sendParams = { sender: SENDER, signer };
  return { sdk, signer };
}

const raffleArgs = {
  prizeId: 11n, prizeAmount: 1n, ticketAssetId: 0n, startTimestamp: 100n, endTimestamp: 200n,
  minTickets: 1n, maxTickets: 10n, gateId: 0n, marketplace: MARKET, name: 'r', proof: [], weightsListCount: 1n,
};
const prizeBoxArgs = {
  prizeBox: 12n, ticketAssetId: 0n, startTimestamp: 100n, endTimestamp: 200n,
  minTickets: 1n, maxTickets: 10n, gateId: 0n, marketplace: MARKET, weightsListCount: 1n,
};

describe('RafflePluginSDK newRaffle / newPrizeBoxRaffle overloads', () => {
  test('the generated client has both forms of each creation method', () => {
    for (const s of [RAFFLE_PLUGIN_NEW_RAFFLE, RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES, RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE, RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES]) {
      expect(signatures).toContain(s);
    }
  });

  test('selector-only hooks carry both selectors (method restrictions allow either form)', () => {
    const { sdk } = pluginSdk();
    expect(sdk.newRaffle()().selectors.map(hex)).toEqual([sel(RAFFLE_PLUGIN_NEW_RAFFLE), sel(RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES)]);
    expect(sdk.newPrizeBoxRaffle()().selectors.map(hex)).toEqual([sel(RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE), sel(RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES)]);
  });

  test('no minEntries (or 0): the deployed signature, so the call also works on the live plugin', async () => {
    const { sdk } = pluginSdk();
    for (const hook of [sdk.newRaffle(raffleArgs)(), sdk.newRaffle({ ...raffleArgs, minEntries: 0n })()]) {
      expect(hook.selectors.map(hex)).toEqual([sel(RAFFLE_PLUGIN_NEW_RAFFLE)]);
      const [txn] = await hook.getTxns({ wallet: 99n });
      expect((txn as { method: ABIMethod }).method.getSignature()).toBe(RAFFLE_PLUGIN_NEW_RAFFLE);
      expect((txn as { args: unknown[] }).args.slice(0, 3)).toEqual([99n, true, 11n]);
      expect((txn as { args: unknown[] }).args).toHaveLength(14);
    }
    const [box] = await sdk.newPrizeBoxRaffle(prizeBoxArgs)().getTxns({ wallet: 99n });
    expect((box as { method: ABIMethod }).method.getSignature()).toBe(RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE);
  });

  test('minEntries > 0: the minEntries overload, with minEntries in its slot', async () => {
    const { sdk } = pluginSdk();
    const hook = sdk.newRaffle({ ...raffleArgs, minEntries: 3n, rekeyBack: false })();
    expect(hook.selectors.map(hex)).toEqual([sel(RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES)]);
    const [txn] = await hook.getTxns({ wallet: 99n });
    expect((txn as { method: ABIMethod }).method.getSignature()).toBe(RAFFLE_PLUGIN_NEW_RAFFLE_MIN_ENTRIES);
    const args = (txn as { args: unknown[] }).args;
    expect(args).toHaveLength(15);
    expect(args[1]).toBe(false);
    expect(args[9]).toBe(3n); // wallet, rekeyBack, prizeID, prizeAmount, ticketAsset, start, end, minTickets, maxTickets, minEntries
    const [box] = await sdk.newPrizeBoxRaffle({ ...prizeBoxArgs, minEntries: 2n })().getTxns({ wallet: 99n });
    expect((box as { method: ABIMethod }).method.getSignature()).toBe(RAFFLE_PLUGIN_NEW_PRIZE_BOX_RAFFLE_MIN_ENTRIES);
    expect((box as { args: unknown[] }).args[8]).toBe(2n);
  });
});
