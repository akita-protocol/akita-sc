import * as algokit from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { beforeAll, describe, expect, test } from 'vitest';
import { deploySunsetContract, deployWalletFactorySunset } from '../../tests/fixtures/sunset';
import { WalletFactorySunsetContractClient } from '../artifacts/sunset/WalletFactorySunsetContractClient';

algokit.Config.configure({ populateAppCallResources: true });

const fixture = algorandFixture();

/**
 * F1: `WalletFactorySunsetContract` is installed over the live wallet factory,
 * which is the creator of every wallet. Every entry point must therefore be
 * restricted to the factory creator or `SUNSET_CALLER`; otherwise anyone could
 * pass `SunsetContract.auth()` on a wallet (as its creator) and pick where its
 * funds are closed to.
 */
describe('WalletFactorySunsetContract caller gate', () => {
  let deployer: TransactionSignerAccount;
  let sunsetCaller: TransactionSignerAccount;
  let stranger: TransactionSignerAccount;
  let algorand: ReturnType<typeof algokit.AlgorandClient.fromConfig>;

  const fee = { maxFee: algokit.microAlgo(20_000), coverAppCallInnerTransactionFees: true };

  beforeAll(async () => {
    await fixture.newScope();
    algorand = fixture.context.algorand;
    const ctx = fixture.context;
    deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) });
    sunsetCaller = await ctx.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) });
    stranger = await ctx.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) });
  });

  const freshFactorySunset = () => deployWalletFactorySunset({
    fixture,
    sender: deployer.addr,
    signer: deployer.signer,
    sunsetCaller: sunsetCaller.addr.toString(),
  });

  /** A wallet stand-in that, like a real wallet, accepts its creator (the factory) as caller. */
  const walletOwnedBy = async (factory: WalletFactorySunsetContractClient) => deploySunsetContract({
    fixture,
    sender: deployer.addr,
    signer: deployer.signer,
    sunsetCaller: factory.appAddress.toString(),
  });

  test('rejects a stranger on every entry point', async () => {
    const factory = await freshFactorySunset();
    const wallet = await walletOwnedBy(factory);
    const as = { sender: stranger.addr, signer: stranger.signer, ...fee };
    const walletId = wallet.appId;

    const attempts = [
      () => factory.send.updateWallet({ ...as, args: { wallet: walletId } }),
      () => factory.send.deleteWalletBoxes({ ...as, args: { wallet: walletId, boxes: [] } }),
      () => factory.send.closeOutWallet({ ...as, args: { wallet: walletId, closes: [] } }),
      () => factory.send.deleteWalletAssets({ ...as, args: { wallet: walletId, assets: [] } }),
      () => factory.send.deleteWalletEscrows({ ...as, args: { wallet: walletId, escrowFactory: walletId, escrowIds: [] } }),
      () => factory.send.deleteWallet({ ...as, args: { wallet: walletId, closeRemainderTo: stranger.addr.toString() } }),
      () => factory.send.deleteBoxedContract({ ...as, args: [] }),
      () => factory.send.deleteBoxes({ ...as, args: { boxes: [] } }),
      () => factory.send.closeOut({ ...as, args: { closes: [] } }),
      () => factory.send.deleteAssets({ ...as, args: { assets: [] } }),
      () => factory.send.delete.delete({ ...as, args: { closeRemainderTo: stranger.addr.toString() } }),
    ];
    for (const attempt of attempts) {
      await expect(attempt()).rejects.toThrow(/errNdao/);
    }

    // Both apps survived with their balances intact.
    await expect(algorand.app.getById(factory.appId)).resolves.toBeDefined();
    await expect(algorand.app.getById(walletId)).resolves.toBeDefined();
  });

  test('a stranger cannot route a wallet close-out to themselves through the factory', async () => {
    const factory = await freshFactorySunset();
    const wallet = await walletOwnedBy(factory);
    const walletBefore = await algorand.account.getInformation(wallet.appAddress);

    await expect(factory.send.deleteWallet({
      sender: stranger.addr,
      signer: stranger.signer,
      args: { wallet: wallet.appId, closeRemainderTo: stranger.addr.toString() },
      ...fee,
    })).rejects.toThrow(/errNdao/);

    const walletAfter = await algorand.account.getInformation(wallet.appAddress);
    expect(walletAfter.balance.microAlgos).toBe(walletBefore.balance.microAlgos);
  });

  test('the creator and SUNSET_CALLER pass the gate', async () => {
    const factory = await freshFactorySunset();

    for (const caller of [deployer, sunsetCaller]) {
      const as = { sender: caller.addr, signer: caller.signer, ...fee };
      await factory.send.deleteBoxes({ ...as, args: { boxes: [] } });
      await factory.send.closeOut({ ...as, args: { closes: [] } });
      await factory.send.deleteAssets({ ...as, args: { assets: [] } });
      await factory.send.deleteBoxedContract({ ...as, args: [] });
    }

    // Authorized wallet teardown still works end to end: the factory's inner
    // call is accepted by the wallet because the factory is its creator.
    const wallet = await walletOwnedBy(factory);
    const recipient = await fixture.context.generateAccount({ initialFunds: algokit.microAlgos(100_000) });
    const recipientBefore = await algorand.account.getInformation(recipient.addr);
    await factory.send.deleteWallet({
      sender: sunsetCaller.addr,
      signer: sunsetCaller.signer,
      args: { wallet: wallet.appId, closeRemainderTo: recipient.addr.toString() },
      ...fee,
    });
    await expect(algorand.app.getById(wallet.appId)).rejects.toThrow();
    const recipientAfter = await algorand.account.getInformation(recipient.addr);
    expect(recipientAfter.balance.microAlgos).toBeGreaterThan(recipientBefore.balance.microAlgos);

    await factory.send.delete.delete({
      sender: sunsetCaller.addr,
      signer: sunsetCaller.signer,
      args: { closeRemainderTo: recipient.addr.toString() },
      ...fee,
    });
    await expect(algorand.app.getById(factory.appId)).rejects.toThrow();
  });
});
