import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, describe, expect, test } from 'vitest';
import { CallerType, newWallet, WalletSDK } from 'akita-sdk/wallet';
import { AkitaUniverse, buildAkitaUniverse } from '../../../../tests/fixtures/dao';

/**
 * SG-01 regression: creating an ASA service from a referred wallet must pay the referral
 * cut of the (ALGO) creation fee in ALGO, never out of the ASA escrowed for subscribers.
 */

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();
const EMPTY_CID = new Uint8Array(36).fill(120);

describe('Subscriptions plugin (audit SG-01)', () => {
  let deployer: TransactionSignerAccount;
  let user: TransactionSignerAccount;
  let referrer: TransactionSignerAccount;
  let universe: AkitaUniverse;
  let wallet: WalletSDK;

  beforeAll(async () => {
    await fixture.newScope();
    const { algorand } = fixture.context;
    const dispenser = await algorand.account.dispenserFromEnvironment();

    deployer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) });
    user = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) });
    referrer = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(1_000_000) });
    await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo());

    universe = await buildAkitaUniverse({ fixture, sender: deployer.addr, signer: deployer.signer, apps: {} });

    wallet = await newWallet({
      algorand,
      factoryParams: {
        appId: universe.walletFactory.appId,
        defaultSender: user.addr,
        defaultSigner: user.signer,
      },
      sender: user.addr,
      signer: user.signer,
      nickname: 'Referred Wallet',
      referrer: referrer.addr.toString(),
    });

    const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
    await wallet.client.appClient.fundAppAccount({ amount: algokit.microAlgo(mbr.plugins + 10_000_000n) });
    await wallet.addPlugin({ client: universe.subscriptionsPlugin, callerType: CallerType.Admin });
    await algorand.send.payment({
      sender: dispenser.addr,
      signer: dispenser.signer,
      receiver: universe.subscriptionsPlugin.client.appAddress,
      amount: algokit.microAlgo(10_000_000n),
    });
  });

  test('ASA service creation leaves the escrowed ASA untouched', async () => {
    const { algorand } = fixture.context;
    const akta = universe.aktaAssetId;
    const subscriptionsApp = universe.subscriptions.client.appAddress.toString();

    await algorand.send.payment({
      sender: deployer.addr,
      signer: deployer.signer,
      receiver: subscriptionsApp,
      amount: algokit.microAlgo(1_000_000n),
    });

    if (!(await universe.subscriptions.isOptedInToAsset(akta))) {
      await universe.subscriptions.optIn({ sender: deployer.addr.toString(), signer: deployer.signer, asset: akta });
    }

    // stand-in for AKTA escrowed by subscribers
    await algorand.send.assetTransfer({
      sender: deployer.addr,
      signer: deployer.signer,
      receiver: subscriptionsApp,
      assetId: akta,
      amount: 50_000_000n,
    });

    // the wallet pays the 100 ALGO creation fee
    await algorand.send.payment({
      sender: deployer.addr,
      signer: deployer.signer,
      receiver: wallet.client.appAddress,
      amount: algokit.microAlgo(150_000_000n),
    });

    const holding = async () => (await algorand.asset.getAccountInformation(subscriptionsApp, akta)).balance;
    const before = await holding();

    await wallet.usePlugin({
      callerType: CallerType.Admin,
      calls: [
        ...universe.subscriptionsPlugin.newServiceWithDescription({
          interval: 60n,
          asset: akta,
          amount: 1_000_000n,
          passes: 0n,
          gate: 0n,
          payoutAddress: user.addr.toString(),
          title: 'Referred ASA service',
          description: 'SG-01',
          bannerImage: EMPTY_CID,
          highlightMessage: 0,
          highlightColor: new Uint8Array([1, 2, 3]),
        }),
      ],
    });

    const serviceId = (await universe.subscriptions.getServiceList({ address: wallet.client.appAddress.toString() })) - 1n;
    const service = await universe.subscriptions.getService({ address: wallet.client.appAddress.toString(), id: Number(serviceId) });
    expect(service.asset).toBe(akta);

    // was: 20% of the 100 ALGO fee (20_000_000 base units) left as an AKTA referral
    expect(await holding()).toBe(before);
  });
});
