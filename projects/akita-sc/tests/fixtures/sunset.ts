import { microAlgo } from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { SunsetPluginSDK } from 'akita-sdk/wallet';
import {
  SunsetContractClient,
  SunsetContractFactory,
} from '../../smart_contracts/artifacts/sunset/SunsetContractClient';
import { SunsetPluginFactory } from '../../smart_contracts/artifacts/arc58/plugins/sunset/SunsetPluginClient';
import { FixtureAndAccount } from '../types';

/**
 * Parameters for {@link deploySunsetContract}. The `sunsetCaller` address is
 * substituted into the `TMPL_SUNSET_CALLER` template variable at compile time
 * and then checked on each auth-gated method against `Txn.sender`. Any address
 * is valid here — the contract also accepts `Global.creatorAddress` as a
 * second allowed caller, so tests can drive it from the deployer as well.
 */
export type DeploySunsetContractParams = FixtureAndAccount & {
  /** The address substituted into the `TMPL_SUNSET_CALLER` template variable. */
  sunsetCaller: string;
};

/**
 * Deploys a fresh {@link SunsetContractClient} with `SUNSET_CALLER` pinned to
 * `sunsetCaller`. The returned client is pre-funded with the minimum balance
 * so it can hold assets / emit inner transactions during teardown tests.
 *
 * Uses `factory.send.create.bare()` rather than `factory.deploy()` because the
 * direct/plugin test suites repeatedly deploy fresh instances in the same
 * localnet scope — `factory.deploy` resolves apps by creator+appName and caches
 * the lookup, so a second call after the first instance has been `delete`d
 * 404s. A bare create sidesteps the cache and always mints a brand-new app.
 */
export const deploySunsetContract = async ({
  fixture,
  sender,
  signer,
  sunsetCaller,
}: DeploySunsetContractParams): Promise<SunsetContractClient> => {
  const { algorand } = fixture.context;

  // `SUNSET_CALLER` is an `address`-typed template var that gets byte-compared
  // against `Txn.sender` in TEAL. AlgoKit encodes string-typed template values
  // as UTF-8 bytes, which would embed the 58-char base32 address verbatim and
  // never match a 32-byte sender. Decode to the raw public key so the template
  // substitutes as `0x<32-byte-hex>` and matches `txn Sender`.
  const factory = algorand.client.getTypedAppFactory(SunsetContractFactory, {
    defaultSender: sender,
    defaultSigner: signer,
    deployTimeParams: {
      SUNSET_CALLER: algosdk.decodeAddress(sunsetCaller).publicKey,
    },
  });

  const { appClient: client } = await factory.send.create.bare();

  // Fund the contract account so it can opt into assets / pay inner-txn fees
  // during sunset tests. Matches the escrow fixture's pre-funding pattern.
  await client.appClient.fundAppAccount({ amount: microAlgo(1_000_000) });

  return client;
};

/**
 * Deploys the ARC-58 sunset plugin and wraps it in the {@link SunsetPluginSDK}
 * exported from `akita-sdk/wallet`. Mirrors the convention used by the other
 * plugin fixtures (`pay`, `update-akita-dao`, etc.): the factory carries the
 * deployer's defaults only for the install call, and the returned SDK is
 * constructed with `factoryParams: { appId }` — callers pass `sender`/`signer`
 * per method invocation.
 */
export const deploySunsetPlugin = async ({
  fixture,
  sender,
  signer,
}: FixtureAndAccount): Promise<SunsetPluginSDK> => {
  const { algorand } = fixture.context;

  const factory = algorand.client.getTypedAppFactory(SunsetPluginFactory, {
    defaultSender: sender,
    defaultSigner: signer,
  });

  const { appClient: client } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  });

  return new SunsetPluginSDK({ algorand, factoryParams: { appId: client.appId } });
};
