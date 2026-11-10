import { setCurrentNetwork } from 'akita-sdk';
import { GatePluginSDK } from 'akita-sdk/wallet';
import { GatePluginFactory } from '../../../smart_contracts/artifacts/arc58/plugins/gate/GatePluginClient';
import { FixtureAndAccount } from '../../types';

type DeployParams = FixtureAndAccount & {
  args?: {
    /** DAO app id; the plugin resolves the Gate app from the DAO registry */
    akitaDao?: bigint;
    version?: string;
  }
}

export const deployGatePlugin = async ({ fixture, sender, signer, args }: DeployParams): Promise<GatePluginSDK> => {
  // Ensure network is set for SDK initialization (fixtures are always localnet)
  setCurrentNetwork('localnet');
  
  const { algorand } = fixture.context;

  const factoryClient = algorand.client.getTypedAppFactory(
    GatePluginFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  const { appClient: client } = await factoryClient.send.create.create({
    args: {
      akitaDao: args?.akitaDao ?? 0n,
      version: args?.version ?? '0.0.2',
    }
  })

  console.log('GatePlugin deployed with appId:', client.appId);

  return new GatePluginSDK({
    algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: sender,
      defaultSigner: signer,
    },
  });
};
