import { microAlgo } from '@algorandfoundation/algokit-utils'
import { setCurrentNetwork } from 'akita-sdk';
import { SubscriptionsSDK } from 'akita-sdk/subscriptions';
import { SubscriptionsArgs, SubscriptionsFactory } from '../../smart_contracts/artifacts/subscriptions/SubscriptionsClient';
import { FixtureAndAccount } from '../types';

type CreateArgs = SubscriptionsArgs["obj"]['create(string,uint64,(string,uint64))void']
type DeployParams = FixtureAndAccount & { args: Partial<CreateArgs> }

export const deploySubscriptions = async ({
  fixture,
  sender,
  signer,
  args: {
    akitaDao = 0n,
    version = '0.0.1',
    akitaDaoEscrow,
  }
}: DeployParams): Promise<SubscriptionsSDK> => {
  // Ensure network is set for SDK initialization (fixtures are always localnet)
  setCurrentNetwork('localnet');
  
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    SubscriptionsFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  if (akitaDaoEscrow === undefined) {
    throw new Error('akitaDaoEscrow is required to deploy Subscriptions')
  }

  const { appClient: client } = await factory.send.create.create({
    // Subscriptions grew past 10 KB with the payer records (2026-11-15); 5 extra pages = 12 KB.
    // Upgrades can grow pages further through the DAO update plugin.
    extraProgramPages: 5,
    // > 8 KB programs pay a small per-byte fee on top of the min fee
    extraFee: microAlgo(1_000),
    args: {
      akitaDao,
      akitaDaoEscrow,
      version,
    }
  })

  return new SubscriptionsSDK({
    algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: sender,
      defaultSigner: signer
    }
  });
};