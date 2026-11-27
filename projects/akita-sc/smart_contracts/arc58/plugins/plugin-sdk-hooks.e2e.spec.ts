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
  appClient: { getABIMethod(name: string): { getSelector(): Uint8Array; getSignature(): string } };
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
 * Plugin methods with no hook of their own name, and how a wallet reaches each one instead. Every other
 * method a wallet calls must have a hook of its own name (audit 13, XSY-04). Each claim is checked:
 *
 * - `sentBy`: the named hook lists this method among the selectors it sends, when it is called with
 *   `args` (or with none, the form a method-restricted grant is built from). A method a hook sends only
 *   for some arguments is not in the no-arguments list, so a method-restricted Update grant has to name
 *   `setClearProgram` and `updateAppWithSchema` itself; the DAO's Update grant has no method list.
 * - `legacyNameOf`: an on-chain alias of a method that has a hook. The SDK never sends the alias, so
 *   what is checked is that the method it stands for has a hook and takes the same arguments.
 */
type HookAlias =
  | { sentBy: string; args?: Record<string, unknown>; why: string }
  | { legacyNameOf: string; why: string };

/** What `updateApp` needs besides the arguments that pick its steps. Nothing here is sent. */
const UPDATE_APP_ARGS = { appId: 1n, version: '0', data: new Uint8Array(1) };

const HOOK_ALIASES: Record<string, Record<string, HookAlias>> = {
  auctionPlugin: {
    deleteApplication: {
      legacyNameOf: 'deleteAuctionApp',
      why: 'the v1 ABI name, kept on chain for method lists made against it; it only forwards',
    },
  },
  updatePlugin: {
    initBoxedContract: { sentBy: 'updateApp', why: 'a step of updateApp and of updateFactoryChildContract' },
    loadBoxedContract: { sentBy: 'updateApp', why: 'a step of updateApp and of updateFactoryChildContract' },
    setClearProgram: {
      sentBy: 'updateApp',
      args: { ...UPDATE_APP_ARGS, clearProgram: new Uint8Array([0x0b]) },
      why: 'the first step of updateApp when a clear program is passed',
    },
    updateAppWithSchema: {
      sentBy: 'updateApp',
      args: { ...UPDATE_APP_ARGS, globalNumUint: 1n },
      why: 'the last step of updateApp, in place of updateApp, for a target whose schema grows',
    },
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
    const hex = (selector: Uint8Array) => Buffer.from(selector).toString('hex');
    const missing: string[] = [];
    for (const pluginCase of pluginCases) {
      const sdk = pluginCase.sdk as unknown as Record<string, (args?: unknown) => () => { selectors: Uint8Array[] }>;
      const abi = (method: string) => clientOf(pluginCase.sdk).appClient.getABIMethod(method);
      const methods = walletAbiMethods(pluginCase.sdk);
      expect(methods, `${pluginCase.name} should have methods a wallet calls`).not.toHaveLength(0);
      const aliases = HOOK_ALIASES[pluginCase.name] ?? {};
      for (const method of methods) {
        if (typeof sdk[method] === 'function') continue;
        // a method with no hook of its own is allowed only where the alias table says how it is
        // reached, and that claim holds
        const alias = aliases[method];
        let reached = false;
        if (alias !== undefined && 'sentBy' in alias) {
          const hook = alias.args === undefined
            ? sdk[alias.sentBy]()
            : sdk[alias.sentBy]({ sender: deployer.addr.toString(), signer: deployer.signer, ...alias.args });
          reached = hook().selectors.map(hex).includes(hex(abi(method).getSelector()));
        } else if (alias !== undefined) {
          const argsOf = (name: string) => abi(name).getSignature().slice(name.length);
          reached = typeof sdk[alias.legacyNameOf] === 'function' && argsOf(method) === argsOf(alias.legacyNameOf);
        }
        if (!reached) missing.push(`${pluginCase.name}.${method}`);
      }
    }
    expect(missing).toEqual([]);

    // The alias table holds nothing stale: every entry names a method the plugin still has and the
    // SDK still has no hook for.
    for (const pluginCase of pluginCases) {
      const methods = walletAbiMethods(pluginCase.sdk);
      for (const method of Object.keys(HOOK_ALIASES[pluginCase.name] ?? {})) {
        expect(methods, `${pluginCase.name}.${method} is in the alias table`).toContain(method);
        expect(typeof (pluginCase.sdk as unknown as Record<string, unknown>)[method], `${pluginCase.name}.${method} has no hook of its own`).not.toBe('function');
      }
    }
    expect(Object.keys(HOOK_ALIASES).every((name) => pluginCases.some((c) => c.name === name))).toBe(true);
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
