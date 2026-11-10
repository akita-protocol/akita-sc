import { describe, expect, test, vi } from 'vitest';
import { getDisbursementsAcrossDeployments, RewardsSDK } from './index';

describe('Rewards deployment coexistence', () => {
  test('retains overlapping disbursement IDs and their originating client; deduplicates deployments', async () => {
    const old = { appId: 10n, getDisbursements: vi.fn().mockResolvedValue(new Map([[1n, { old: true }]])) } as unknown as RewardsSDK;
    const current = { appId: 20n, getDisbursements: vi.fn().mockResolvedValue(new Map([[1n, { old: false }]])) } as unknown as RewardsSDK;
    const result = await getDisbursementsAcrossDeployments([current, old, old]);
    expect(result.map(r => r.appId)).toEqual([20n, 10n]);
    expect(result[1].client).toBe(old);
    expect(result[0].disbursements.get(1n)).toEqual({ old: false });
    expect(result[1].disbursements.get(1n)).toEqual({ old: true });
    expect(old.getDisbursements).toHaveBeenCalledTimes(1);
  });
  test('marks every deployment other than the current one as legacy, so wallet claims route to claimLegacyRewards', async () => {
    const old = { appId: 10n, getDisbursements: vi.fn().mockResolvedValue(new Map()) } as unknown as RewardsSDK;
    const current = { appId: 20n, getDisbursements: vi.fn().mockResolvedValue(new Map()) } as unknown as RewardsSDK;
    const routed = await getDisbursementsAcrossDeployments([current, old], { currentAppId: 20n });
    expect(routed.map(r => [r.appId, r.legacy])).toEqual([[20n, false], [10n, true]]);
    const unrouted = await getDisbursementsAcrossDeployments([current, old]);
    expect(unrouted.map(r => r.legacy)).toEqual([false, false]);
  });
  test('propagates legacy read failures and rejects unresolved IDs', async () => {
    await expect(getDisbursementsAcrossDeployments([{ appId: 0n } as RewardsSDK])).rejects.toThrow('positive');
    const client = { appId: 10n, getDisbursements: vi.fn().mockRejectedValue(new Error('Indexer unavailable')) } as unknown as RewardsSDK;
    await expect(getDisbursementsAcrossDeployments([client])).rejects.toThrow('Indexer unavailable');
    await expect(getDisbursementsAcrossDeployments([
      { appId: 10n, network: 'mainnet' } as RewardsSDK,
      { appId: 10n, network: 'testnet' } as RewardsSDK,
    ])).rejects.toThrow('same network');
  });
});
