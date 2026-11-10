import { ABIMethod } from 'algosdk';
import { describe, expect, test, vi } from 'vitest';
import { RewardsPluginClient } from '../../generated/RewardsPluginClient';
import { RewardsPluginSDK } from './rewards';

const SENDER = 'B4NOFTMLUTGTTPBY5NHLW3EHQPB5XCW3BHYDQFMX5XDT2A6Q24Z2HK2WRQ';
const RECIPIENT = 'RJZ3KL24OFSFNU6NKOJVGO65VSLHVGIT6TOMN2XKMRQEX3BGE7KWWXKCUQ';

const ALGO_SIGNATURE =
  'createInstantDisbursement(uint64,bool,uint64,uint64,(address,uint64)[],uint64)uint64';
const ASA_SIGNATURE =
  'createInstantAsaDisbursement(uint64,bool,uint64,uint64,uint64,(address,uint64)[],uint64)uint64';

function selectorHex(selector: Uint8Array): string {
  return Buffer.from(selector).toString('hex');
}

describe('RewardsPluginSDK instant disbursements', () => {
  test('uses the expected ARC-58 selectors', () => {
    expect(selectorHex(ABIMethod.fromSignature(ALGO_SIGNATURE).getSelector())).toBe('0bcc7546');
    expect(selectorHex(ABIMethod.fromSignature(ASA_SIGNATURE).getSelector())).toBe('2b44919d');
  });

  test('builds an ALGO instant call and derives the exact allocation sum', async () => {
    const selector = ABIMethod.fromSignature(ALGO_SIGNATURE).getSelector();
    const createInstantDisbursement = vi.fn().mockResolvedValue({ appId: 7n });
    const sdk = Object.create(RewardsPluginSDK.prototype) as RewardsPluginSDK;
    const signer = vi.fn();

    sdk.client = {
      appId: 42n,
      appClient: {
        getABIMethod: vi.fn().mockReturnValue({ getSelector: () => selector }),
      },
      params: { createInstantDisbursement },
    } as unknown as RewardsPluginClient;
    sdk.sendParams = { sender: SENDER, signer };

    const hook = sdk.createInstantDisbursement({
      timeToUnlock: 123n,
      expiration: 456n,
      allocations: [[RECIPIENT, 10n], [SENDER, 15n]],
    })();
    const txns = await hook.getTxns({ wallet: 99n });

    expect(hook.selectors).toEqual([selector]);
    expect(createInstantDisbursement).toHaveBeenCalledWith({
      sender: SENDER,
      signer,
      args: {
        wallet: 99n,
        rekeyBack: true,
        timeToUnlock: 123n,
        expiration: 456n,
        allocations: [[RECIPIENT, 10n], [SENDER, 15n]],
        sum: 25n,
      },
    });
    expect(txns).toEqual([{ type: 'methodCall', appId: 7n }]);
  });

  test('builds an ASA instant call with asset ID and explicit rekey behavior', async () => {
    const selector = ABIMethod.fromSignature(ASA_SIGNATURE).getSelector();
    const createInstantAsaDisbursement = vi.fn().mockResolvedValue({ appId: 8n });
    const sdk = Object.create(RewardsPluginSDK.prototype) as RewardsPluginSDK;
    const signer = vi.fn();

    sdk.client = {
      appId: 42n,
      appClient: {
        getABIMethod: vi.fn().mockReturnValue({ getSelector: () => selector }),
      },
      params: { createInstantAsaDisbursement },
    } as unknown as RewardsPluginClient;
    sdk.sendParams = { sender: SENDER, signer };

    const hook = sdk.createInstantAsaDisbursement({
      assetId: 1234n,
      timeToUnlock: 0n,
      expiration: 789n,
      allocations: [[RECIPIENT, 40n], [SENDER, 2n]],
      rekeyBack: false,
    })();
    const txns = await hook.getTxns({ wallet: 100n });

    expect(hook.selectors).toEqual([selector]);
    expect(createInstantAsaDisbursement).toHaveBeenCalledWith({
      sender: SENDER,
      signer,
      args: {
        wallet: 100n,
        rekeyBack: false,
        assetId: 1234n,
        timeToUnlock: 0n,
        expiration: 789n,
        allocations: [[RECIPIENT, 40n], [SENDER, 2n]],
        sum: 42n,
      },
    });
    expect(txns).toEqual([{ type: 'methodCall', appId: 8n }]);
  });
});

describe('RewardsPluginSDK legacy Rewards routing', () => {
  const sdkWith = (params: Record<string, unknown>) => {
    const sdk = Object.create(RewardsPluginSDK.prototype) as RewardsPluginSDK;
    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: (name: string) => ({ getSelector: () => new TextEncoder().encode(name) }) },
      params,
    } as unknown as RewardsPluginClient;
    sdk.sendParams = { sender: SENDER, signer: vi.fn() };
    return sdk;
  };

  test('claimRewardsFrom sends legacy deployments to claimLegacyRewards and the current one to claimRewards', async () => {
    const claimRewards = vi.fn().mockResolvedValue({ appId: 1n });
    const claimLegacyRewards = vi.fn().mockResolvedValue({ appId: 2n });
    const sdk = sdkWith({ claimRewards, claimLegacyRewards });
    const rewards: [bigint, bigint][] = [[5n, 0n]];

    const legacy = sdk.claimRewardsFrom({ legacy: true }, { rewards })();
    expect(legacy.selectors).toEqual([new TextEncoder().encode('claimLegacyRewards')]);
    expect(await legacy.getTxns({ wallet: 9n })).toEqual([{ type: 'methodCall', appId: 2n }]);
    expect(claimLegacyRewards).toHaveBeenCalledWith(expect.objectContaining({ args: { wallet: 9n, rekeyBack: true, rewards } }));

    const current = sdk.claimRewardsFrom({ legacy: false }, { rewards })();
    expect(current.selectors).toEqual([new TextEncoder().encode('claimRewards')]);
    expect(await current.getTxns({ wallet: 9n })).toEqual([{ type: 'methodCall', appId: 1n }]);
    expect(claimRewards).toHaveBeenCalledTimes(1);
  });

  test('reclaimLegacyRewards builds the legacy reclaim with the wallet and rekey flag', async () => {
    const reclaimLegacyRewards = vi.fn().mockResolvedValue({ appId: 3n });
    const sdk = sdkWith({ reclaimLegacyRewards });
    const hook = sdk.reclaimLegacyRewards({ id: 4n, reclaims: [[RECIPIENT, 0n]], rekeyBack: false })();
    expect(await hook.getTxns({ wallet: 11n })).toEqual([{ type: 'methodCall', appId: 3n }]);
    expect(reclaimLegacyRewards).toHaveBeenCalledWith(expect.objectContaining({
      args: { wallet: 11n, rekeyBack: false, id: 4n, reclaims: [[RECIPIENT, 0n]] },
    }));
  });
});
