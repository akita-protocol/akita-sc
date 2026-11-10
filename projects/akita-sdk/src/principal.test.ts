import algosdk, { Address } from 'algosdk';
import { describe, expect, test } from 'vitest';
import {
  algodPrincipalReader,
  appAddress,
  atRestPrincipal,
  atRestResources,
  ctxOwns,
  encodeGateCtx,
  gateCtx,
  gateMustCheckForMethod,
  isGenuineWallet,
  ownsAtRest,
  predictPrincipal,
  predictWindowPrincipal,
  principalResources,
  PrincipalErrorCode,
  PrincipalPanicError,
  PrincipalResolutionError,
  quoteReferrer,
  thirdPartyPrincipal,
  tipWallet,
  windowHint,
  windowPrincipalResources,
  ZERO_ADDRESS,
  type PrincipalChainReader,
  type PrincipalGlobalValue,
} from './principal';

const FACTORY = 1_000n;
const ROGUE_FACTORY = 2_000n;
const addr = (fill: number) => new Address(new Uint8Array(32).fill(fill)).toString();
const bytes = (address: string): PrincipalGlobalValue => ({ type: 'bytes', value: Address.fromString(address).publicKey });

type AppState = { creator: string; globals: Record<string, PrincipalGlobalValue> };

/** A tiny in-memory chain: apps (creator + globals) and auth addresses. */
function chain(apps: Record<string, AppState>, auth: Record<string, string> = {}): PrincipalChainReader {
  return {
    appCreator: async (appId) => apps[appId.toString()]?.creator,
    appGlobal: async (appId, key) => apps[appId.toString()]?.globals[key],
    authAddr: async (address) => auth[address] ?? ZERO_ADDRESS,
  };
}

// Wallets: Wd (default: C == Wd.address), Wx (external controlled Cx rekeyed to Wx), fake (rogue creator)
const WD = 10n;
const WX = 11n;
const FAKE = 12n;
const PLUGIN = 50n;
const R1 = addr(0xa1);
const R2 = addr(0xa2);
const CX = addr(0xc1);
const ESCROW = addr(0xe1);
const EOA = addr(0x01);
const wdAddress = appAddress(WD);
const wxAddress = appAddress(WX);

function universe(overrides: { auth?: Record<string, string>; wd?: Record<string, PrincipalGlobalValue> } = {}) {
  return chain(
    {
      [WD.toString()]: {
        creator: appAddress(FACTORY),
        globals: { controlled_address: bytes(wdAddress), spending_address: bytes(ZERO_ADDRESS), referrer: bytes(R1), ...overrides.wd },
      },
      [WX.toString()]: {
        creator: appAddress(FACTORY),
        globals: { controlled_address: bytes(CX), spending_address: bytes(ZERO_ADDRESS), referrer: bytes(R2) },
      },
      [FAKE.toString()]: {
        creator: appAddress(ROGUE_FACTORY),
        globals: { controlled_address: bytes(EOA), spending_address: bytes(EOA), referrer: bytes(R2) },
      },
    },
    { [CX]: wxAddress, [ESCROW]: wdAddress, ...overrides.auth },
  );
}

describe('principal mirror: resolvePrincipal / tryResolvePrincipal', () => {
  test('hint 0 is the plain sender (E1)', async () => {
    const p = await predictPrincipal(universe(), { walletFactory: FACTORY, hint: 0n, sender: EOA, callerApp: 0n, strict: true });
    expect(p).toEqual({ wallet: 0n, principal: EOA, origin: ZERO_ADDRESS, spender: EOA, referrer: ZERO_ADDRESS, viaPlugin: false });
  });

  test('a non-genuine or missing wallet reverts with errHnwl, or falls back when not strict (E13)', async () => {
    for (const hint of [FAKE, 999n]) {
      await expect(predictPrincipal(universe(), { walletFactory: FACTORY, hint, sender: EOA, callerApp: PLUGIN, strict: true }))
        .rejects.toMatchObject({ code: PrincipalErrorCode.NotWallet });
      const fallback = await predictPrincipal(universe(), { walletFactory: FACTORY, hint, sender: EOA, callerApp: PLUGIN, strict: false });
      expect(fallback.wallet).toBe(0n);
      expect(fallback.principal).toBe(EOA);
    }
  });

  test('a hint on a top-level call reverts with errHtop', async () => {
    await expect(predictPrincipal(universe(), { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: 0n, strict: true }))
      .rejects.toBeInstanceOf(PrincipalResolutionError);
    await expect(predictPrincipal(universe(), { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: 0n, strict: true }))
      .rejects.toMatchObject({ code: PrincipalErrorCode.TopLevel });
  });

  test('the plugin arm needs spending_address == sender and sender != caller address (E10, E11)', async () => {
    // outside a window spending_address is zero
    await expect(predictPrincipal(universe(), { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: PLUGIN, strict: true }))
      .rejects.toMatchObject({ code: PrincipalErrorCode.NotBound });
    // the plugin sending as itself
    const asSelf = universe({ wd: { spending_address: bytes(appAddress(PLUGIN)) } });
    await expect(predictPrincipal(asSelf, { walletFactory: FACTORY, hint: WD, sender: appAddress(PLUGIN), callerApp: PLUGIN, strict: true }))
      .rejects.toMatchObject({ code: PrincipalErrorCode.NotBound });
  });

  test('default window of Wd resolves to Wd.address with its referrer (E2)', async () => {
    const reader = universe({ wd: { spending_address: bytes(wdAddress) } });
    const p = await predictPrincipal(reader, { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: PLUGIN, strict: true });
    expect(p).toEqual({ wallet: WD, principal: wdAddress, origin: wdAddress, spender: wdAddress, referrer: R1, viaPlugin: true });
  });

  test('escrow window of Wd resolves to Wd.address while Wd.address is not rekeyed (E4, E7)', async () => {
    const reader = universe({ wd: { spending_address: bytes(ESCROW) } });
    const live = await predictPrincipal(reader, { walletFactory: FACTORY, hint: WD, sender: ESCROW, callerApp: PLUGIN, strict: true });
    expect(live.principal).toBe(wdAddress);
    const rekeyedAway = universe({ wd: { spending_address: bytes(ESCROW) }, auth: { [wdAddress]: EOA } });
    const stale = await predictPrincipal(rekeyedAway, { walletFactory: FACTORY, hint: WD, sender: ESCROW, callerApp: PLUGIN, strict: true });
    expect(stale).toMatchObject({ principal: ESCROW, origin: ZERO_ADDRESS, referrer: R1 });
  });

  test('external controlled Cx counts only while rekeyed to Wx (E3, E6)', async () => {
    const reader = universe();
    const live = await predictWindowPrincipal(reader, FACTORY, WX, ESCROW, PLUGIN);
    expect(live).toMatchObject({ principal: CX, origin: CX, referrer: R2, viaPlugin: true });
    const away = universe({ auth: { [CX]: EOA } });
    const stale = await predictWindowPrincipal(away, FACTORY, WX, ESCROW, PLUGIN);
    expect(stale).toMatchObject({ principal: ESCROW, origin: ZERO_ADDRESS, referrer: R2 });
    // default window: S == C (shortcut, no auth read)
    const shortcut = await predictWindowPrincipal(away, FACTORY, WX, CX, PLUGIN);
    expect(shortcut.principal).toBe(CX);
  });

  test('the direct arm (callerApp == W) never reads spending_address', async () => {
    const reader = universe({ wd: { spending_address: { type: 'uint', value: 7n } } });
    const p = await predictPrincipal(reader, { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: WD, strict: true });
    expect(p).toMatchObject({ principal: wdAddress, viaPlugin: false });
  });

  test('malformed globals: missing controlled -> errIwlt, uint64 controlled -> panic, short referrer -> zero (E20)', async () => {
    const missing = universe({ wd: { spending_address: bytes(wdAddress), controlled_address: undefined } });
    await expect(predictPrincipal(missing, { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: PLUGIN, strict: true }))
      .rejects.toMatchObject({ code: PrincipalErrorCode.BadWallet });
    const typed = universe({ wd: { spending_address: bytes(wdAddress), controlled_address: { type: 'uint', value: 7n } } });
    await expect(predictPrincipal(typed, { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: PLUGIN, strict: false }))
      .rejects.toBeInstanceOf(PrincipalPanicError);
    const short = universe({ wd: { spending_address: bytes(wdAddress), referrer: { type: 'bytes', value: new Uint8Array(31) } } });
    const p = await predictPrincipal(short, { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: PLUGIN, strict: true });
    expect(p.referrer).toBe(ZERO_ADDRESS);
  });

  test('a forged controlled_address never names a victim that is not rekeyed to W (E16)', async () => {
    const victim = addr(0x77);
    const reader = universe({ wd: { spending_address: bytes(wdAddress), controlled_address: bytes(victim) } });
    const p = await predictPrincipal(reader, { walletFactory: FACTORY, hint: WD, sender: wdAddress, callerApp: PLUGIN, strict: true });
    expect(p.principal).toBe(wdAddress);
    expect(p.origin).toBe(ZERO_ADDRESS);
  });

  test('genuineness is pinned to the given factory (E26)', async () => {
    expect(await isGenuineWallet(universe(), WD, FACTORY)).toBe(true);
    expect(await isGenuineWallet(universe(), FAKE, FACTORY)).toBe(false);
    expect(await isGenuineWallet(universe(), FAKE, ROGUE_FACTORY)).toBe(true);
    expect(await isGenuineWallet(universe(), WD, 0n)).toBe(false);
  });
});

describe('principal mirror: quotes and at-rest checks', () => {
  test('quoteReferrer (E19)', async () => {
    const reader = universe();
    expect(await quoteReferrer(reader, FACTORY, 0n)).toBe(ZERO_ADDRESS);
    expect(await quoteReferrer(reader, FACTORY, WD)).toBe(R1);
    expect(await quoteReferrer(reader, FACTORY, WX)).toBe(R2);
    expect(await quoteReferrer(reader, FACTORY, FAKE)).toBe(ZERO_ADDRESS);
    expect(await quoteReferrer(reader, FACTORY, 999n)).toBe(ZERO_ADDRESS);
  });

  test('ownsAtRest has no spending_address clause and drops rekeyed accounts (T28 rows)', async () => {
    const reader = universe({ wd: { spending_address: bytes(EOA) } });
    expect(await ownsAtRest(reader, FACTORY, WD, wdAddress)).toBe(true);
    expect(await ownsAtRest(reader, FACTORY, WD, ESCROW)).toBe(true);
    expect(await ownsAtRest(reader, FACTORY, WX, CX)).toBe(true);
    expect(await ownsAtRest(reader, FACTORY, WD, EOA)).toBe(false);
    expect(await ownsAtRest(reader, FACTORY, FAKE, EOA)).toBe(false);
    const midWindow = universe({ auth: { [ESCROW]: appAddress(PLUGIN) } });
    expect(await ownsAtRest(midWindow, FACTORY, WD, ESCROW)).toBe(false);
  });

  test('atRestPrincipal re-checks a stored pair without reading globals (E24)', async () => {
    const reader = universe({ wd: { controlled_address: { type: 'uint', value: 7n } } });
    expect(await atRestPrincipal(reader, FACTORY, ESCROW, WD, wdAddress)).toBe(wdAddress);
    expect(await atRestPrincipal(reader, FACTORY, ESCROW, WD, ESCROW)).toBe(ESCROW);
    expect(await atRestPrincipal(reader, FACTORY, EOA, WD, wdAddress)).toBe(EOA);
    expect(await atRestPrincipal(reader, FACTORY, ESCROW, 999n, wdAddress)).toBe(ESCROW);
    const rekeyed = universe({ auth: { [wdAddress]: EOA } });
    expect(await atRestPrincipal(rekeyed, FACTORY, ESCROW, WD, wdAddress)).toBe(ESCROW);
    expect(await atRestPrincipal(universe(), FACTORY, ESCROW, WX, CX)).toBe(ESCROW);
  });

  test('thirdPartyPrincipal reads controlled_address (quote-only)', async () => {
    expect(await thirdPartyPrincipal(universe(), FACTORY, ESCROW, WD)).toBe(wdAddress);
    expect(await thirdPartyPrincipal(universe(), FACTORY, CX, WX)).toBe(CX);
    expect(await thirdPartyPrincipal(universe(), FACTORY, EOA, WD)).toBe(EOA);
    const typed = universe({ wd: { controlled_address: { type: 'uint', value: 7n } } });
    await expect(thirdPartyPrincipal(typed, FACTORY, ESCROW, WD)).rejects.toBeInstanceOf(PrincipalPanicError);
  });

  test('ctxOwns uses the forwarded context (T38-T40)', async () => {
    const ctx = gateCtx(await predictWindowPrincipal(universe(), FACTORY, WD, wdAddress, PLUGIN));
    expect(ctx).toEqual({ principal: wdAddress, wallet: WD, spender: wdAddress });
    expect(await ctxOwns(universe(), FACTORY, ctx, wdAddress)).toBe(true);
    expect(await ctxOwns(universe(), FACTORY, ctx, ESCROW)).toBe(true);
    expect(await ctxOwns(universe(), FACTORY, ctx, CX)).toBe(false);
    expect(await ctxOwns(universe(), FACTORY, { principal: EOA, wallet: 0n, spender: EOA }, ESCROW)).toBe(false);
  });

  test('tipWallet (T48 rows)', async () => {
    expect(await tipWallet(universe(), FACTORY, wdAddress, WD)).toBe(WD);
    expect(await tipWallet(universe(), FACTORY, ESCROW, WD)).toBe(WD);
    expect(await tipWallet(universe(), FACTORY, CX, WX)).toBe(WX);
    expect(await tipWallet(universe(), FACTORY, EOA, WD)).toBe(0n);
    expect(await tipWallet(universe(), FACTORY, wdAddress, 0n)).toBe(0n);
    expect(await tipWallet(universe(), FACTORY, EOA, FAKE)).toBe(0n);
    expect(await tipWallet(universe({ auth: { [CX]: EOA } }), FACTORY, CX, WX)).toBe(0n);
  });

  test('windowHint is the wallet id', () => {
    expect(windowHint(42)).toBe(42n);
  });
});

describe('principal mirror: gate context encoding', () => {
  test('encodeGateCtx is the 72-byte (address,uint64,address) tuple', () => {
    const encoded = encodeGateCtx({ principal: wdAddress, wallet: WD, spender: ESCROW });
    expect(encoded).toHaveLength(72);
    expect(encoded.slice(0, 32)).toEqual(Address.fromString(wdAddress).publicKey);
    expect(algosdk.decodeUint64(encoded.slice(32, 40), 'bigint')).toBe(WD);
    expect(encoded.slice(40)).toEqual(Address.fromString(ESCROW).publicKey);
  });

  test('gateMustCheckForMethod matches utils/functions.ts GateMustCheckForAbiMethod', () => {
    const method = gateMustCheckForMethod();
    expect(method.getSignature()).toBe('mustCheckFor((address,uint64,address),uint64,byte[][])void');
    expect(method.getSelector()).toHaveLength(4);
  });
});

describe('principal mirror: resources (spec §3.6)', () => {
  test('principalResources per window shape', () => {
    // default window of a default wallet: S == C == W.address
    expect(principalResources({ wallet: WD, controlled: wdAddress, spender: wdAddress })).toEqual([{ appIndex: WD }]);
    // escrow window of a default wallet: A(W.address)
    expect(principalResources({ wallet: WD, controlled: wdAddress, spender: ESCROW }))
      .toEqual([{ appIndex: WD }, { address: Address.fromString(wdAddress) }]);
    // escrow window of an external-controlled wallet: A(C)
    expect(principalResources({ wallet: WX, controlled: CX, spender: ESCROW }))
      .toEqual([{ appIndex: WX }, { address: Address.fromString(CX) }]);
    // default window of an external-controlled wallet: S == C
    expect(principalResources({ wallet: WX, controlled: CX, spender: CX })).toEqual([{ appIndex: WX }]);
    expect(principalResources({ wallet: 0n, controlled: CX, spender: EOA })).toEqual([]);
  });

  test('atRestResources', () => {
    expect(atRestResources({ wallet: WD, account: ESCROW, stored: wdAddress }))
      .toEqual([{ appIndex: WD }, { address: Address.fromString(ESCROW) }, { address: Address.fromString(wdAddress) }]);
    expect(atRestResources({ wallet: WD, account: wdAddress }))
      .toEqual([{ appIndex: WD }, { address: Address.fromString(wdAddress) }]);
  });

  test('windowPrincipalResources reads controlled_address', async () => {
    expect(await windowPrincipalResources(universe(), WX, ESCROW))
      .toEqual([{ appIndex: WX }, { address: Address.fromString(CX) }]);
    expect(await windowPrincipalResources(universe({ wd: { controlled_address: undefined } }), WD, ESCROW))
      .toEqual([{ appIndex: WD }]);
  });
});

describe('algodPrincipalReader', () => {
  const key = (text: string) => new TextEncoder().encode(text);
  const fakeAlgod = {
    calls: 0,
    getApplicationByID(appId: bigint) {
      return {
        do: async () => {
          fakeAlgod.calls += 1;
          if (appId !== WD) throw Object.assign(new Error('application does not exist'), { status: 404 });
          return {
            params: {
              creator: Address.fromString(appAddress(FACTORY)),
              globalState: [
                { key: key('controlled_address'), value: { type: 1, bytes: Address.fromString(wdAddress).publicKey, uint: 0n } },
                { key: key('rekey_index'), value: { type: 2, bytes: new Uint8Array(), uint: 3n } },
              ],
            },
          };
        },
      };
    },
    accountInformation(address: string) {
      return {
        exclude: () => ({
          do: async () => (address === ESCROW ? { authAddr: Address.fromString(wdAddress) } : {}),
        }),
      };
    },
  };

  test('reads creator, typed globals and auth, caching app reads', async () => {
    const reader = algodPrincipalReader(fakeAlgod as unknown as algosdk.Algodv2);
    expect(await reader.appCreator(WD)).toBe(appAddress(FACTORY));
    expect(await reader.appCreator(999n)).toBeUndefined();
    expect(await reader.appGlobal(WD, 'controlled_address')).toEqual(bytes(wdAddress));
    expect(await reader.appGlobal(WD, 'rekey_index')).toEqual({ type: 'uint', value: 3n });
    expect(await reader.appGlobal(WD, 'referrer')).toBeUndefined();
    expect(await reader.authAddr(ESCROW)).toBe(wdAddress);
    expect(await reader.authAddr(EOA)).toBe(ZERO_ADDRESS);
    expect(fakeAlgod.calls).toBe(2);
    expect(await ownsAtRest(reader, FACTORY, WD, ESCROW)).toBe(true);
  });
});
