import { describe, expect, test, vi } from 'vitest';
import { APP_SPEC, StakingPluginClient } from '../../generated/StakingPluginClient';
import { StakingPluginSDK } from './staking';

const SENDER = 'B4NOFTMLUTGTTPBY5NHLW3EHQPB5XCW3BHYDQFMX5XDT2A6Q24Z2HK2WRQ';
const ADDRESS = 'RJZ3KL24OFSFNU6NKOJVGO65VSLHVGIT6TOMN2XKMRQEX3BGE7KWWXKCUQ';

describe('StakingPluginSDK ABI parity', () => {
  test('exposes every wallet-routed plugin method', () => {
    const walletMethodNames = APP_SPEC.methods
      .filter(({ args }) => args[0]?.name === 'wallet' && args[1]?.name === 'rekeyBack')
      .map(({ name }) => name);

    expect(walletMethodNames).not.toHaveLength(0);
    expect(walletMethodNames.filter((name) => typeof StakingPluginSDK.prototype[name as keyof StakingPluginSDK] !== 'function'))
      .toEqual([]);
  });

  test('builds a createHeartbeat plugin call', async () => {
    const selector = new Uint8Array([1, 2, 3, 4]);
    const createHeartbeat = vi.fn().mockResolvedValue({ appId: 7n });
    const sdk = Object.create(StakingPluginSDK.prototype) as StakingPluginSDK;
    const signer = vi.fn();

    sdk.client = {
      appId: 42n,
      appClient: {
        getABIMethod: vi.fn().mockReturnValue({ getSelector: () => selector }),
      },
      params: { createHeartbeat },
    } as unknown as StakingPluginClient;
    sdk.sendParams = { sender: SENDER, signer };

    const call = sdk.createHeartbeat({ address: ADDRESS, asset: 123n });
    const hook = call();
    const txns = await hook.getTxns({ wallet: 99n });

    expect(hook.appId).toBe(42n);
    expect(hook.selectors).toEqual([selector]);
    expect(createHeartbeat).toHaveBeenCalledWith({
      sender: SENDER,
      signer,
      args: {
        wallet: 99n,
        rekeyBack: true,
        address: ADDRESS,
        asset: 123n,
      },
    });
    expect(txns).toEqual([{ type: 'methodCall', appId: 7n }]);
  });
});
