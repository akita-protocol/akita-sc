import { EscrowFactoryClient, EscrowFactoryFactory } from '../../smart_contracts/artifacts/escrow/EscrowFactoryClient'
import { FixtureAndAccount } from '../types';

export const deployEscrowFactory = async ({ fixture, sender, signer }: FixtureAndAccount): Promise<EscrowFactoryClient> => {
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    EscrowFactoryFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  const { appClient: client } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
    // Reserve max program pages up front — extra_program_pages is immutable
    // after creation, so we pre-pay MBR to leave room for future upgrades.
    createParams: { extraProgramPages: 3 },
  })

  await client.appClient.fundAppAccount({ amount: (100_000).microAlgos() });

  return client;
};