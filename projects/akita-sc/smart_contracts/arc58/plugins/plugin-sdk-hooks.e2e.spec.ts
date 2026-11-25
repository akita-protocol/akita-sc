import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { Address } from 'algosdk';
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import algosdk from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest';
import { newMetaPlugin, SunsetPluginSDK, WelcomePluginSDK } from 'akita-sdk/wallet';
import { AkitaUniverse, buildAkitaUniverse } from '../../../tests/fixtures/dao';
import { SunsetPluginFactory } from '../../artifacts/arc58/plugins/sunset/SunsetPluginClient';
import { WelcomePluginFactory } from '../../artifacts/arc58/plugins/welcome/WelcomePluginClient';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

type PluginCase = {
  name: string;
  sdk: object;
};

type AbiMethod = { name?: string; args?: Array<{ name?: string }> };

const clientOf = (sdk: object) => (sdk as unknown as Record<string, unknown>).client as {
  appSpec?: { methods?: AbiMethod[] };
  appClient: { getABIMethod(name: string): { getSelector(): Uint8Array } };
};

const abiMethods = (sdk: object): AbiMethod[] => clientOf(sdk)?.appSpec?.methods ?? [];

const getSdkMethods = (sdk: object) => {
  const sdkRecord = sdk as unknown as Record<string, unknown>;
  const abiMethodNames = new Set(abiMethods(sdk).flatMap(({ name }) => name === undefined ? [] : [name]));

  return Object.getOwnPropertyNames(Object.getPrototypeOf(sdk))
    .filter((name) => name !== 'constructor')
    .filter((name) => abiMethodNames.has(name))
    .filter((name) => typeof sdkRecord[name] === 'function')
    .sort();
};

/**
 * The methods a wallet reaches through this plugin: the ones whose first argument is the wallet.
 * A plugin's own `create` takes no wallet.
 */
const walletAbiMethods = (sdk: object) => abiMethods(sdk)
  .flatMap(({ name, args }) => name !== undefined && args?.[0]?.name === 'wallet' ? [name] : [])
  .sort();

/**
 * Plugin methods a wallet reaches under another name, with the reason. Every other method a wallet
 * calls must have a hook of its own name (audit 13, XSY-04).
 */
const HOOK_ALIASES: Record<string, Record<string, string>> = {
  auctionPlugin: { deleteApplication: 'legacy ABI name of deleteAuction, kept for deployed grants' },
  updatePlugin: {
    setClearProgram: 'a step of updateApp',
    initBoxedContract: 'a step of updateApp and of updateFactoryChildContract',
    loadBoxedContract: 'a step of updateApp and of updateFactoryChildContract',
    updateAppWithSchema: 'updateApp sends it for a target whose schema grows',
  },
};

describe('ARC58 plugin SDK hooks', () => {
  let deployer: TransactionSignerAccount;
  let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & { account: SigningAccount };
  let akitaUniverse: AkitaUniverse;
  let pluginCases: PluginCase[];

  beforeAll(async () => {
    await fixture.newScope();
    const { algorand } = fixture.context;
    dispenser = await algorand.account.dispenserFromEnvironment();
    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());

    akitaUniverse = await buildAkitaUniverse({
      fixture,
      sender: deployer.addr,
      signer: deployer.signer,
      apps: {},
    });

    const sunsetFactory = algorand.client.getTypedAppFactory(SunsetPluginFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    });
    const { appClient: sunsetClient } = await sunsetFactory.deploy({
      onUpdate: 'append',
      onSchemaBreak: 'append',
      suppressLog: true,
    });
    const sunsetPlugin = new SunsetPluginSDK({
      algorand,
      factoryParams: { appId: sunsetClient.appId },
    });

    // The plugins the parity test used to leave out (audit 13, XSY-04). GuildPlugin needs a Guild and
    // its factory, which this universe does not deploy; its hooks have their own unit test
    // (akita-sdk/src/wallet/plugins/guild.test.ts).
    const metaPlugin = await newMetaPlugin({
      algorand,
      sender: deployer.addr.toString(),
      signer: deployer.signer,
      registry: akitaUniverse.metaMerkles.appId,
    });
    const welcomeFactory = algorand.client.getTypedAppFactory(WelcomePluginFactory, {
      defaultSender: deployer.addr,
      defaultSigner: deployer.signer,
    });
    const { appClient: welcomeClient } = await welcomeFactory.send.create.create({
      args: { factory: akitaUniverse.walletFactory.appId },
    });
    const welcomePlugin = new WelcomePluginSDK({
      algorand,
      factoryParams: { appId: welcomeClient.appId, defaultSender: deployer.addr, defaultSigner: deployer.signer },
    });

    pluginCases = [
      { name: 'asaManagerPlugin', sdk: akitaUniverse.asaManagerPlugin },
      { name: 'auctionPlugin', sdk: akitaUniverse.auctionPlugin },
      { name: 'daoPlugin', sdk: akitaUniverse.daoPlugin },
      { name: 'dualStakePlugin', sdk: akitaUniverse.dualStakePlugin },
      { name: 'gatePlugin', sdk: akitaUniverse.gatePlugin },
      { name: 'haystackRouterPlugin', sdk: akitaUniverse.haystackRouterPlugin },
      { name: 'hyperSwapPlugin', sdk: akitaUniverse.hyperSwapPlugin },
      { name: 'marketplacePlugin', sdk: akitaUniverse.marketplacePlugin },
      { name: 'nfdPlugin', sdk: akitaUniverse.nfdPlugin },
      { name: 'optInPlugin', sdk: akitaUniverse.optInPlugin },
      { name: 'payPlugin', sdk: akitaUniverse.payPlugin },
      { name: 'pollPlugin', sdk: akitaUniverse.pollPlugin },
      { name: 'rafflePlugin', sdk: akitaUniverse.rafflePlugin },
      { name: 'revenueManagerPlugin', sdk: akitaUniverse.revenueManagerPlugin },
      { name: 'rewardsPlugin', sdk: akitaUniverse.rewardsPlugin },
      { name: 'selfOptInPlugin', sdk: akitaUniverse.selfOptInPlugin },
      { name: 'socialPlugin', sdk: akitaUniverse.socialPlugin },
      { name: 'stakingPlugin', sdk: akitaUniverse.stakingPlugin },
      { name: 'stakingPoolPlugin', sdk: akitaUniverse.stakingPoolPlugin },
      { name: 'subscriptionsPlugin', sdk: akitaUniverse.subscriptionsPlugin },
      { name: 'sunsetPlugin', sdk: sunsetPlugin },
      { name: 'updatePlugin', sdk: akitaUniverse.updatePlugin },
      { name: 'metaPlugin', sdk: metaPlugin },
      { name: 'welcomePlugin', sdk: welcomePlugin },
    ];
  });

  test('every production plugin SDK method exposes a usable no-args hook', () => {
    const assertions: string[] = [];

    for (const pluginCase of pluginCases) {
      const methods = getSdkMethods(pluginCase.sdk);
      expect(methods, `${pluginCase.name} should expose plugin methods`).not.toHaveLength(0);

      for (const method of methods) {
        const hookFactory = (pluginCase.sdk as unknown as Record<string, unknown>)[method] as () => unknown;
        const hook = hookFactory.call(pluginCase.sdk);
        expect(typeof hook, `${pluginCase.name}.${method}() should return a hook`).toBe('function');

        const result = (hook as () => { appId: bigint; selectors: Uint8Array[]; getTxns: unknown })();
        expect(result.appId, `${pluginCase.name}.${method}() hook appId`).toBeGreaterThan(0n);
        expect(Array.isArray(result.selectors), `${pluginCase.name}.${method}() selectors`).toBe(true);
        expect(result.selectors.length, `${pluginCase.name}.${method}() selector count`).toBeGreaterThan(0);
        expect(typeof result.getTxns, `${pluginCase.name}.${method}() getTxns`).toBe('function');

        for (const selector of result.selectors) {
          expect(selector, `${pluginCase.name}.${method}() selector type`).toBeInstanceOf(Uint8Array);
          expect(selector.length, `${pluginCase.name}.${method}() selector length`).toBe(4);
        }

        assertions.push(`${pluginCase.name}.${method}`);
      }
    }

    expect(assertions.length).toBeGreaterThanOrEqual(pluginCases.length);
  });

  test('audit 13 XSY-04: every plugin method a wallet calls is reachable through the SDK', () => {
    // The test above drives from the SDK, so a plugin method with no hook cannot fail it, and a wallet
    // simply cannot reach that method. This one drives from the ABI.
    const missing: string[] = [];
    for (const pluginCase of pluginCases) {
      const methods = walletAbiMethods(pluginCase.sdk);
      expect(methods, `${pluginCase.name} should have methods a wallet calls`).not.toHaveLength(0);
      const aliases = HOOK_ALIASES[pluginCase.name] ?? {};
      // the selectors the no-args hooks of this SDK restrict a grant to
      const covered = new Set(getSdkMethods(pluginCase.sdk).flatMap((name) => {
        const hook = ((pluginCase.sdk as unknown as Record<string, unknown>)[name] as () => () => { selectors: Uint8Array[] })();
        return hook().selectors.map((selector) => Buffer.from(selector).toString('hex'));
      }));
      for (const method of methods) {
        if (typeof (pluginCase.sdk as unknown as Record<string, unknown>)[method] === 'function') continue;
        // a method with no hook of its own is allowed only where a listed hook of another name sends it
        const selector = Buffer.from(clientOf(pluginCase.sdk).appClient.getABIMethod(method).getSelector()).toString('hex');
        if (!(method in aliases) || !covered.has(selector)) missing.push(`${pluginCase.name}.${method}`);
      }
    }
    expect(missing).toEqual([]);
  });

  test('subscriptions newServiceWithDescription helper returns the expected hook sequence', () => {
    const hooks = akitaUniverse.subscriptionsPlugin.newServiceWithDescription({
      interval: 60n,
      asset: 0n,
      amount: 100_000n,
      passes: 0n,
      gate: 0n,
      payoutAddress: deployer.addr.toString(),
      title: 'Smoke Test Service',
      description: 'This description is chunked through initDescription and loadDescription.',
      bannerImage: new Uint8Array(36).fill(120),
      highlightMessage: 0,
      highlightColor: new Uint8Array([0xAA, 0xBB, 0xCC]),
    });

    expect(hooks).toHaveLength(3);

    for (const [index, hook] of hooks.entries()) {
      expect(typeof hook, `newServiceWithDescription hook ${index}`).toBe('function');
      const result = hook();
      expect(result.appId).toBe(akitaUniverse.subscriptionsPlugin.appId);
      expect(result.selectors).toHaveLength(1);
      expect(result.selectors[0]).toBeInstanceOf(Uint8Array);
      expect(result.selectors[0].length).toBe(4);
      expect(typeof result.getTxns).toBe('function');
    }
  });
});
