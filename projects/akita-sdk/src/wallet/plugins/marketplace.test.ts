import { ABIMethod } from 'algosdk';
import { describe, expect, test, vi } from 'vitest';
import { APP_SPEC, MarketplacePluginClient } from '../../generated/MarketplacePluginClient';
import {
  MARKETPLACE_PLUGIN_LEGACY_PURCHASE,
  MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS,
  MarketplacePluginSDK,
} from './marketplace';

/**
 * Principal resolution review fix (IMPLEMENTATION-LOG, marketplace review fixes): the working-tree
 * MarketplacePlugin `purchase` gained `maxPrice` (audit MKT-02), so its selector differs from every
 * deployed plugin. The SDK picks the ABI by plugin app id so it can still buy through the live plugin.
 */

const SENDER = 'B4NOFTMLUTGTTPBY5NHLW3EHQPB5XCW3BHYDQFMX5XDT2A6Q24Z2HK2WRQ';
const MARKET = 'RJZ3KL24OFSFNU6NKOJVGO65VSLHVGIT6TOMN2XKMRQEX3BGE7KWWXKCUQ';
const CURRENT_PURCHASE = 'purchase(uint64,bool,uint64,address,uint64,byte[][])void';
/** selector table of the deployed MarketplacePlugin 3569561455 (its `pushbytess` route table) */
const DEPLOYED_SELECTORS = ['dea7cd9d', '360c8a2f', '269e4bb0', '4d96ba44', '59466ef2', '33e92c94', '854dede0'];

const hex = (selector: Uint8Array) => Buffer.from(selector).toString('hex');
const signatures = APP_SPEC.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`);

function pluginSdk(appId: bigint, price: bigint, legacyPurchaseAbi?: boolean) {
  const purchase = vi.fn().mockResolvedValue({ appId, method: ABIMethod.fromSignature(CURRENT_PURCHASE) });
  const getGlobalState = vi.fn().mockResolvedValue({ price: { value: price } });
  const sdk = Object.create(MarketplacePluginSDK.prototype) as MarketplacePluginSDK;
  const signer = vi.fn();
  sdk.client = {
    appId,
    appClient: { getABIMethod: vi.fn().mockReturnValue(ABIMethod.fromSignature(CURRENT_PURCHASE)) },
    params: { purchase },
  } as unknown as MarketplacePluginClient;
  sdk.sendParams = { sender: SENDER, signer };
  sdk.algorand = { app: { getGlobalState } } as never;
  sdk.legacyPurchaseAbi = legacyPurchaseAbi;
  return { sdk, purchase, getGlobalState, signer };
}

describe('MarketplacePluginSDK purchase ABI by plugin generation', () => {
  test('only purchase changed: the other deployed selectors are still routed by the new plugin', () => {
    const current = signatures.map((s) => hex(ABIMethod.fromSignature(s).getSelector()));
    expect(hex(MARKETPLACE_PLUGIN_LEGACY_PURCHASE.getSelector())).toBe('269e4bb0');
    expect(hex(ABIMethod.fromSignature(CURRENT_PURCHASE).getSelector())).toBe('703f18ca');
    expect(signatures).toContain(CURRENT_PURCHASE);
    expect(current).not.toContain('269e4bb0');
    for (const selector of DEPLOYED_SELECTORS.filter((s) => s !== '269e4bb0')) {
      expect(current).toContain(selector);
    }
  });

  test('every recorded deployed generation uses the legacy purchase ABI', () => {
    expect([...MARKETPLACE_PLUGIN_LEGACY_PURCHASE_APP_IDS].sort()).toEqual([751968424n, 763128885n, 3368399474n, 3569561455n].sort());
  });

  test('the live MainNet plugin (3569561455): legacy selector and legacy call, no maxPrice argument', async () => {
    const { sdk, purchase, signer } = pluginSdk(3569561455n, 2_000_000n);
    expect(sdk.usesLegacyPurchaseAbi()).toBe(true);
    expect(sdk.purchase()().selectors.map(hex)).toEqual(['269e4bb0']);

    const hook = sdk.purchase({ appId: 77n, marketplace: MARKET, maxPrice: 2_000_000n, args: [] })();
    expect(hook.selectors.map(hex)).toEqual(['269e4bb0']);
    const [txn] = await hook.getTxns({ wallet: 99n });
    expect(purchase).not.toHaveBeenCalled();
    expect(txn).toMatchObject({ type: 'methodCall', sender: SENDER, signer, appId: 3569561455n, args: [99n, true, 77n, MARKET, []] });
    expect((txn as { method: ABIMethod }).method.getSignature()).toBe('purchase(uint64,bool,uint64,address,byte[][])void');
  });

  test('legacy ABI: the SDK refuses a listing priced above maxPrice before signing (errPamx)', async () => {
    const { sdk, getGlobalState } = pluginSdk(3569561455n, 2_500_000n);
    const hook = sdk.purchase({ appId: 77n, marketplace: MARKET, maxPrice: 2_000_000n, args: [] })();
    await expect(hook.getTxns({ wallet: 99n })).rejects.toThrow(/errPamx/);
    expect(getGlobalState).toHaveBeenCalledWith(77n);
  });

  test('a new plugin id: current selector, maxPrice passed through, no client-side price read', async () => {
    const { sdk, purchase, getGlobalState } = pluginSdk(5_000n, 9_999_999n);
    expect(sdk.usesLegacyPurchaseAbi()).toBe(false);
    const hook = sdk.purchase({ appId: 77n, marketplace: MARKET, maxPrice: 2_000_000n, args: [], rekeyBack: false })();
    expect(hook.selectors.map(hex)).toEqual(['703f18ca']);
    await hook.getTxns({ wallet: 99n });
    expect(getGlobalState).not.toHaveBeenCalled();
    expect(purchase).toHaveBeenCalledWith(expect.objectContaining({
      args: expect.objectContaining({ wallet: 99n, rekeyBack: false, appId: 77n, marketplace: MARKET, maxPrice: 2_000_000n, args: [] }),
    }));
  });

  test('legacyPurchaseAbi overrides the id lookup (a deployed program reinstalled under a new id)', () => {
    expect(pluginSdk(5_000n, 1n, true).sdk.usesLegacyPurchaseAbi()).toBe(true);
    expect(pluginSdk(3569561455n, 1n, false).sdk.usesLegacyPurchaseAbi()).toBe(false);
  });
});
