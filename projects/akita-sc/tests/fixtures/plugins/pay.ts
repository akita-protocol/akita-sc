

import { PayPluginSDK } from 'akita-sdk/wallet';
import { PayPluginFactory } from '../../../smart_contracts/artifacts/arc58/plugins/pay/PayPluginClient';
import { FixtureAndAccount } from '../../types';
import { MetaFactory } from '../../../smart_contracts/artifacts/meta/MetaClient';
import { MockUnlimitedPayPluginFactory } from '../../../smart_contracts/artifacts/mocks/unlimited-pay-plugin/MockUnlimitedPayPluginClient';

type DeployParams = FixtureAndAccount & {
  /**
   * Meta registry that holds grant policies. Without one, the plugin points at a new empty Meta, so
   * every grant reads "no policy" (and a global grant without an execution key is refused).
   */
  registry?: bigint
}

export const deployPayPlugin = async ({ fixture, sender, signer, registry }: DeployParams): Promise<PayPluginSDK> => {
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    PayPluginFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  if (registry === undefined) {
    // An empty Meta (no DAO) stands in: it allows foreign box reads and holds no policies.
    const { appClient: meta } = await algorand.client.getTypedAppFactory(MetaFactory, { defaultSender: sender, defaultSigner: signer })
      .send.create.create({ args: { version: 'pay-test', akitaDao: 0n } })
    registry = meta.appId
  }
  // Always a new app: `deploy` would return an earlier PayPlugin of this creator, with that app's registry.
  const { appClient: client } = await factory.send.create.create({ args: { registry } })

  console.log('PayPlugin deployed with appId:', client.appId);

  return new PayPluginSDK({
    algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: sender,
      defaultSigner: signer,
    },
  });
};

/**
 * A payment plugin with PayPlugin's `pay` ABI and no grant policies (MockUnlimitedPayPlugin), for wallet
 * tests that need a global grant that moves funds. Returned as a PayPluginSDK, which only calls `pay`.
 */
export const deployTestPayPlugin = async ({ fixture, sender, signer }: FixtureAndAccount): Promise<PayPluginSDK> => {
  const { algorand } = fixture.context;
  const factory = algorand.client.getTypedAppFactory(MockUnlimitedPayPluginFactory, { defaultSender: sender, defaultSigner: signer })
  const { appClient: client } = await factory.send.create.bare()
  return new PayPluginSDK({ algorand, factoryParams: { appId: client.appId, defaultSender: sender, defaultSigner: signer } });
};
