import { GateSDK, setCurrentNetwork } from 'akita-sdk';
import { GateFactory } from '../../smart_contracts/artifacts/gates/GateClient';
import { allowlistSubGates } from './gates/gate';
import { FixtureAndAccount } from '../types';

export type DeployGateParams = FixtureAndAccount & {
    args: {
        version: string;
        akitaDao: bigint;
        /** Gate v1 cursor for a legacy import (0 = fresh network, no imports) */
        legacyCutoff?: bigint;
    };
    /** sub-gate app ids to allowlist right away */
    subGates?: bigint[];
};

export const deployGate = async ({
    fixture,
    sender,
    signer,
    args,
    subGates = [],
}: DeployGateParams): Promise<GateSDK> => {
    // Ensure network is set for SDK initialization (fixtures are always localnet)
    setCurrentNetwork('localnet');
    
    const { algorand } = fixture.context;

    const factory = algorand.client.getTypedAppFactory(GateFactory, {
        defaultSender: sender,
        defaultSigner: signer,
    });

    const results = await factory.send.create.create({
        args: {
            version: args.version,
            akitaDao: args.akitaDao,
            legacyCutoff: args.legacyCutoff ?? 0n,
        },
    });

    const client = results.appClient;
    await client.appClient.fundAppAccount({ amount: (100_000).microAlgos() });
    await allowlistSubGates(client, subGates);

    return new GateSDK({
        algorand,
        factoryParams: {
            appId: client.appId,
            defaultSender: sender,
            defaultSigner: signer,
        },
        gateRegistry: {},
    });
};
