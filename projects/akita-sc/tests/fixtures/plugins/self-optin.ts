import { SelfOptInPluginSDK } from 'akita-sdk/wallet';
import { SelfOptInPluginFactory } from '../../../smart_contracts/artifacts/arc58/plugins/self-optin/SelfOptInPluginClient';
import { FixtureAndAccount } from '../../types';

type DeployParams = FixtureAndAccount

export const deploySelfOptInPlugin = async ({ fixture, sender, signer }: DeployParams): Promise<SelfOptInPluginSDK> => {
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    SelfOptInPluginFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  const { appClient: client } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  })

  console.log('SelfOptInPlugin deployed with appId:', client.appId);

  return new SelfOptInPluginSDK({ algorand, factoryParams: { appId: client.appId } });
};
