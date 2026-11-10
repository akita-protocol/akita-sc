import { setCurrentNetwork } from 'akita-sdk';
import { RewardsPluginSDK } from 'akita-sdk/wallet';
import { RewardsPluginFactory } from '../../../smart_contracts/artifacts/arc58/plugins/rewards/RewardsPluginClient';
import { FixtureAndAccount } from '../../types';

type DeployParams = FixtureAndAccount & {
  args: {
    akitaDao: bigint;
    version: string;
    /** previous Rewards app the plugin may recover credits from (0 = none) */
    legacyRewards?: bigint;
    /** ARC-59 ASA inbox router the inbox methods call (0 = none) */
    inboxRouter?: bigint;
  }
}

export const deployRewardsPlugin = async ({ fixture, sender, signer, args: { akitaDao, version, legacyRewards = 0n, inboxRouter = 0n } }: DeployParams): Promise<RewardsPluginSDK> => {
  // Ensure network is set for SDK initialization (fixtures are always localnet)
  setCurrentNetwork('localnet');
  
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    RewardsPluginFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  const { appClient: client } = await factory.send.create.create({
    args: {
      akitaDao,
      version,
      legacyRewards,
      inboxRouter,
    }
  })

  console.log('RewardsPlugin deployed with appId:', client.appId);

  return new RewardsPluginSDK({
    algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: sender,
      defaultSigner: signer,
    },
  });
};
