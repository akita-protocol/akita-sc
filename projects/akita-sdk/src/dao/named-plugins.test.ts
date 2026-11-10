import { ABIType } from 'algosdk';
import { describe, expect, test, vi } from 'vitest';
import { AkitaDaoSDK, ProposalActionEnum } from '.';
import { APP_SPEC, type AkitaDaoTypesClient } from '../generated/AkitaDAOTypesClient';
import type { WalletSDK } from '../wallet';

const CALLER = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ';

const setup = () => {
  const sdk = Object.create(AkitaDaoSDK.prototype) as AkitaDaoSDK;
  const lookup = vi.fn().mockResolvedValue({ plugin: 42n, caller: CALLER, escrow: 'treasury' });
  const proposalCost = vi.fn().mockResolvedValue({ total: 1n });
  sdk.sendParams = { sender: CALLER, signer: vi.fn() };
  sdk.readerAccount = CALLER;
  sdk.wallet = {
    namedPlugins: new Map([['payments', { plugin: 99n, caller: CALLER, escrow: '' }]]),
    client: { arc58GetNamedPluginKey: lookup },
  } as unknown as WalletSDK;
  sdk.typeClient = { appClient: { appSpec: APP_SPEC } } as unknown as AkitaDaoTypesClient;
  sdk.client = { proposalCost } as unknown as typeof sdk.client;
  return { sdk, lookup, proposalCost };
};

describe('DAO named plugin removal', () => {
  test('encodes the current on-chain alias instead of trusting cached metadata', async () => {
    const { sdk, lookup, proposalCost } = setup();
    await sdk.proposalCost({ actions: [{ type: ProposalActionEnum.RemoveNamedPlugin, name: 'payments' }] });
    expect(lookup).toHaveBeenCalledWith({ args: { name: 'payments' } });
    const [type, data] = proposalCost.mock.calls[0][0].args.actions[0];
    expect(type).toBe(ProposalActionEnum.RemoveNamedPlugin);
    expect(ABIType.from('(string,uint64,address,string)').decode(data)).toEqual(['payments', 42n, CALLER, 'treasury']);
  });

  test('propagates a failed alias lookup before creating a proposal payload', async () => {
    const { sdk, lookup, proposalCost } = setup();
    lookup.mockRejectedValue(new Error('Node unavailable'));
    await expect(sdk.proposalCost({ actions: [{ type: ProposalActionEnum.RemoveNamedPlugin, name: 'payments' }] }))
      .rejects.toThrow('Node unavailable');
    expect(proposalCost).not.toHaveBeenCalled();
  });
});
