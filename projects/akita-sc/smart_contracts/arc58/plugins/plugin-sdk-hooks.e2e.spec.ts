import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { Address, SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import algosdk from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest';
import { SunsetPluginSDK } from 'akita-sdk/wallet';
import { AkitaUniverse, buildAkitaUniverse } from '../../../tests/fixtures/dao';
import { SunsetPluginFactory } from '../../artifacts/arc58/plugins/sunset/SunsetPluginClient';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

type PluginCase = {
  name: string;
  sdk: Record<string, unknown>;
};

const getSdkMethods = (sdk: Record<string, unknown>) => {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(sdk))
    .filter((name) => name !== 'constructor')
    .filter((name) => name !== 'newServiceWithDescription')
    .filter((name) => typeof sdk[name] === 'function')
    .sort();
};

describe('ARC58 plugin SDK hooks', () => {
  let deployer: Address & TransactionSignerAccount;
  let dispenser: algosdk.Address & TransactionSignerAccount & { account: SigningAccount };
  let akitaUniverse: AkitaUniverse;
  let pluginCases: PluginCase[];

  beforeAll(async () => {
    await fixture.newScope();
    const { algorand } = fixture.context;
    dispenser = await algorand.account.dispenserFromEnvironment();
    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    await algorand.account.ensureFunded(deployer.addr, dispenser, (2000).algo());

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

    pluginCases = [
      { name: 'asaMintPlugin', sdk: akitaUniverse.asaMintPlugin },
      { name: 'auctionPlugin', sdk: akitaUniverse.auctionPlugin },
      { name: 'daoPlugin', sdk: akitaUniverse.daoPlugin },
      { name: 'dualStakePlugin', sdk: akitaUniverse.dualStakePlugin },
      { name: 'gatePlugin', sdk: akitaUniverse.gatePlugin },
      { name: 'hyperSwapPlugin', sdk: akitaUniverse.hyperSwapPlugin },
      { name: 'marketplacePlugin', sdk: akitaUniverse.marketplacePlugin },
      { name: 'nfdPlugin', sdk: akitaUniverse.nfdPlugin },
      { name: 'optInPlugin', sdk: akitaUniverse.optInPlugin },
      { name: 'payPlugin', sdk: akitaUniverse.payPlugin },
      { name: 'paySiloFactoryPlugin', sdk: akitaUniverse.paySiloFactoryPlugin },
      { name: 'paySiloPlugin', sdk: akitaUniverse.paySiloPlugin },
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
    ];
  });

  test('every production plugin SDK method exposes a usable no-args hook', () => {
    const assertions: string[] = [];

    for (const pluginCase of pluginCases) {
      const methods = getSdkMethods(pluginCase.sdk);
      expect(methods, `${pluginCase.name} should expose plugin methods`).not.toHaveLength(0);

      for (const method of methods) {
        const hookFactory = pluginCase.sdk[method] as () => unknown;
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

  test('subscriptions newServiceWithDescription helper returns the expected hook sequence', () => {
    const hooks = akitaUniverse.subscriptionsPlugin.newServiceWithDescription({
      interval: 60n,
      asset: 0n,
      amount: 100_000n,
      passes: 0n,
      gateId: 0n,
      payoutAddress: deployer.addr.toString(),
      title: 'Smoke Test Service',
      description: 'This description is chunked through initDescription and loadDescription.',
      bannerImage: new Uint8Array(36).fill(120),
      highlightMessage: 0,
      highlightColor: '#AABBCC',
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
