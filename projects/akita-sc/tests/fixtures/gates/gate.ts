import { GateRegistryConfig, GateSDK, GateType, isCtxAwareGateType } from 'akita-sdk/gates';
import { GateArgs, GateClient, GateFactory } from '../../../smart_contracts/artifacts/gates/GateClient';
import { FixtureAndAccount } from '../../types';
import {
  ALLOWLIST_BOX_MBR_BOUND,
  type Arc56Like,
  gateSupportsCtxFlag,
  isCtxAwareSpec,
  SET_SUB_GATE_CTX_SIGNATURE,
  setSubGateCall,
} from '../../../scripts/lib/ctx-sub-gates';

type CreateArgs = GateArgs["obj"]["create(string,uint64,uint64)void"]
type DeployParams = FixtureAndAccount & {
  args: Partial<CreateArgs>
  gateRegistry?: GateRegistryConfig
  /** extra sub-gate app ids to allowlist (every id in `gateRegistry` is allowlisted automatically) */
  subGates?: bigint[]
}

type AbiSpecHolder = { appClient: { appSpec: Pick<Arc56Like, 'methods'> } }

/** True if the Gate exposes `setSubGate(app, allowed, ctxAware)` (Gate v2 with `mustCheckFor`). */
export const gateSupportsCtxSubGates = (client: AbiSpecHolder): boolean => gateSupportsCtxFlag(client.appClient.appSpec)

/** True if a sub-gate implements the context-aware `checkFor(ctx, id, args)` (spec §6.9). */
export const isCtxAwareSubGate = (client: AbiSpecHolder): boolean => isCtxAwareSpec(client.appClient.appSpec)

/**
 * Allowlist sub-gate apps on a Gate v2 (creator-only until imports are sealed). Each
 * allowlist box costs 6_100 µALGO of the gate's balance, so the gate is topped up first.
 *
 * `ctxAware` lists the sub-gates the Gate must call through `checkFor(ctx, ...)` instead of
 * `check(ctx.principal, ...)`. A Gate without `setSubGate(uint64,bool,bool)` cannot flag them, so a
 * non-empty `ctxAware` throws there instead of silently allowlisting them as plain sub-gates.
 */
export const allowlistSubGates = async (client: GateClient, subGates: bigint[], ctxAware: bigint[] = []): Promise<void> => {
  const unique = [...new Set([...subGates, ...ctxAware].filter((id) => id > 0n))]
  if (unique.length === 0) return
  const flagged = new Set(ctxAware)
  const withFlag = gateSupportsCtxSubGates(client)
  if (!withFlag && flagged.size > 0) {
    throw new Error(`Gate ${client.appId} has no ${SET_SUB_GATE_CTX_SIGNATURE}; cannot allowlist context-aware sub-gates ${[...flagged].join(', ')}`)
  }
  // 6_100 µALGO per flag-less box; a box holding the flag costs up to ALLOWLIST_BOX_MBR_BOUND
  const perBox = withFlag ? Number(ALLOWLIST_BOX_MBR_BOUND) : 6_100
  await client.appClient.fundAppAccount({ amount: (perBox * unique.length).microAlgos() })
  for (const app of unique) {
    await client.appClient.send.call(setSubGateCall(client.appClient.appSpec as Arc56Like, app, true, flagged.has(app)))
  }
}

export const deployGate = async ({
  fixture,
  sender,
  signer,
  args: {
    akitaDao = 0n,
    version = '0.0.1',
    legacyCutoff = 0n,
  },
  gateRegistry = {},
  subGates = [],
}: DeployParams): Promise<GateSDK> => {
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    GateFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  const { appClient: client } = await factory.send.create.create({
    args: {
      akitaDao,
      version,
      legacyCutoff,
    }
  })

  await client.appClient.fundAppAccount({ amount: (100_000).microAlgos() });

  const registryEntries = Object.entries(gateRegistry).filter((entry): entry is [string, bigint] => entry[1] !== undefined)
  // sub-gate types with checkFor (subscription, subscription_streak, akita_referrer) are flagged context-aware
  await allowlistSubGates(
    client,
    [...registryEntries.map(([, id]) => id), ...subGates],
    registryEntries.filter(([type]) => isCtxAwareGateType(type as GateType)).map(([, id]) => id),
  )

  return new GateSDK({
    algorand,
    factoryParams: {
      appId: client.appId,
      defaultSender: sender,
      defaultSigner: signer,
    },
    gateRegistry
  });
};

/** Deploy just the Gate contract client (without SDK wrapper) */
export const deployGateClient = async ({
  fixture,
  sender,
  signer,
  args: {
    akitaDao = 0n,
    version = '0.0.1',
    legacyCutoff = 0n,
  },
  subGates = [],
  ctxSubGates = [],
}: FixtureAndAccount & { args: Partial<CreateArgs>, subGates?: bigint[], /** allowlisted with ctxAware = true */ ctxSubGates?: bigint[] }): Promise<GateClient> => {
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(
    GateFactory,
    {
      defaultSender: sender,
      defaultSigner: signer,
    }
  )

  const { appClient: client } = await factory.send.create.create({
    args: {
      akitaDao,
      version,
      legacyCutoff,
    }
  })

  await client.appClient.fundAppAccount({ amount: (100_000).microAlgos() });
  await allowlistSubGates(client, subGates, ctxSubGates)

  return client;
};
