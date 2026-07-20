import { AsaManagerPluginSDK } from 'akita-sdk/wallet';
import { AsaManagerPluginFactory } from '../../../smart_contracts/artifacts/arc58/plugins/asa-manager/AsaManagerPluginClient';
import { FixtureAndAccount } from '../../types';

type DeployParams = FixtureAndAccount

export const deployAsaManagerPlugin = async ({ fixture, sender, signer }: DeployParams): Promise<AsaManagerPluginSDK> => {
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    AsaManagerPluginFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  const { appClient: client } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  })

  console.log('AsaManagerPlugin deployed with appId:', client.appId);

  return new AsaManagerPluginSDK({
    algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: sender,
      defaultSigner: signer,
    },
  });
};
