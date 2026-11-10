import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import { ABIMethod, getApplicationAddress } from 'algosdk';
import { describe, expect, test, vi } from 'vitest';
import { AkitaSocialPluginClient } from '../../generated/AkitaSocialPluginClient';
import { SocialPluginSDK } from './social';

/**
 * Principal resolution, Phase 3 (spec §6.11, P2-SOC-03): the new social plugin adds
 * `setMetaWallet(uint64,bool)void`. The SDK wrapper sends only the wallet and rekeyBack; the plugin
 * forwards `windowHint(wallet)` to AkitaSocial, so there is no caller-chosen hint.
 */

const SENDER = getApplicationAddress(1n).toString();
const SET_META_WALLET = 'setMetaWallet(uint64,bool)void';
const hex = (selector: Uint8Array) => Buffer.from(selector).toString('hex');

function pluginSdk(appId = 4_243n) {
  const signer = vi.fn();
  const client = new AkitaSocialPluginClient({ appId, algorand: AlgorandClient.defaultLocalNet(), defaultSender: SENDER, defaultSigner: signer });
  const sdk = Object.create(SocialPluginSDK.prototype) as SocialPluginSDK;
  sdk.client = client;
  sdk.sendParams = { sender: SENDER, signer };
  return sdk;
}

describe('SocialPluginSDK.setMetaWallet', () => {
  test('a selector-only hook carries the setMetaWallet selector (for method-restricted grants)', () => {
    const sdk = pluginSdk();
    expect(sdk.setMetaWallet()().selectors.map(hex)).toEqual([hex(ABIMethod.fromSignature(SET_META_WALLET).getSelector())]);
  });

  test('the call passes only (wallet, rekeyBack); rekeyBack defaults to true', async () => {
    const sdk = pluginSdk();
    const [txn] = await sdk.setMetaWallet({})().getTxns({ wallet: 99n });
    expect((txn as { method: ABIMethod }).method.getSignature()).toBe(SET_META_WALLET);
    expect((txn as { args: unknown[] }).args).toEqual([99n, true]);
    const [noRekey] = await sdk.setMetaWallet({ rekeyBack: false })().getTxns({ wallet: 99n });
    expect((noRekey as { args: unknown[] }).args).toEqual([99n, false]);
  });
});
