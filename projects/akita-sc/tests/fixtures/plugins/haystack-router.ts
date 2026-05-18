import { setCurrentNetwork } from 'akita-sdk';
import { HaystackRouterPluginSDK } from 'akita-sdk/wallet';
import { HaystackRouterPluginFactory } from '../../../smart_contracts/artifacts/arc58/plugins/haystack-router/HaystackRouterPluginClient';
import { FixtureAndAccount } from '../../types';

type DeployParams = FixtureAndAccount & {
  args: {
    router: bigint;
    routerMethod: Uint8Array;
    referrer: string;
    referrerTreasury: bigint;
  }
}

export const deployHaystackRouterPlugin = async ({
  fixture,
  sender,
  signer,
  args: { router, routerMethod, referrer, referrerTreasury },
}: DeployParams): Promise<HaystackRouterPluginSDK> => {
  setCurrentNetwork('localnet');

  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(HaystackRouterPluginFactory, {
    defaultSender: sender,
    defaultSigner: signer,
  });

  const { appClient: client } = await factory.send.create.create({
    args: {
      router,
      routerMethod,
      referrer,
      referrerTreasury,
    }
  });

  console.log('HaystackRouterPlugin deployed with appId:', client.appId);

  return new HaystackRouterPluginSDK({
    algorand,
    factoryParams: { appId: client.appId },
  });
};
