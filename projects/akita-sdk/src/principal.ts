/**
 * Off-chain mirror of the principal-resolution standard
 * (docs/principal-resolution/STANDARD.md, PHASE-0-SPEC.md §3.1-§3.6).
 *
 * The on-chain source of truth is `projects/akita-sc/smart_contracts/utils/principal.ts`. This
 * module answers the same questions off chain, for two jobs:
 *
 * 1. **Prediction.** It predicts the principal a target computes, for example the gate subject of a
 *    direct call or the referrer that a cost quote charges for. A prediction is advice only.
 *    The contract decides, so never use a prediction as an authorization.
 * 2. **Resource seeding.** It names the exact resources the on-chain helper reads (§3.6). Use
 *    `seedAccessResources` (`akita-sdk/simulate/access-list`) to put them on the group before the
 *    preparer packs Access lists. The preparer also discovers them by simulation. A seed matters
 *    only where simulation is not the source of resources, or where a caller wants a fixed placement.
 *
 * Every chain read goes through a `PrincipalChainReader`. Use `algodPrincipalReader(algod)` against
 * a node, or a stub in unit tests. The mirror reproduces the AVM's panics: a wallet global stored
 * as a uint64 under a bytes key makes `len` fail on chain, and it throws `PrincipalPanicError` here.
 */
import algosdk, { Address, getApplicationAddress } from 'algosdk';

/** ARC-58 wallet global keys (= arc58/account/constants.ts). */
export const PRINCIPAL_KEY_CONTROLLED = 'controlled_address';
export const PRINCIPAL_KEY_SPENDING = 'spending_address';
export const PRINCIPAL_KEY_REFERRER = 'referrer';

/** Error codes raised by `utils/principal.ts` (also in `COMMON_ERROR_MESSAGES`). */
export const PrincipalErrorCode = {
  /** W != 0 and not created by the wallet factory (or does not exist). */
  NotWallet: 'errHnwl',
  /** W != 0 on a top-level call (callerApplicationId == 0). */
  TopLevel: 'errHtop',
  /** Neither a direct wallet call nor a plugin window that holds the sender. */
  NotBound: 'errHnbd',
  /** Third-party write: W does not own the account at rest. */
  NotOwner: 'errHnow',
  /** Malformed controlled_address. */
  BadWallet: 'errIwlt',
  /** The calling plugin does not hold the wallet's spending account. */
  PluginNotAuth: 'errNath',
} as const;
export type PrincipalErrorCode = (typeof PrincipalErrorCode)[keyof typeof PrincipalErrorCode];

/** The zero address as a string. */
export const ZERO_ADDRESS = Address.zeroAddress().toString();

/** Same fields as the on-chain `Principal`. Addresses are base32 strings, ids are bigints. */
export interface Principal {
  /** verified W, or 0n */
  wallet: bigint;
  /** identity to use: origin when live, else spender */
  principal: string;
  /** W.controlled_address when live, else the zero address */
  origin: string;
  /** the evaluated sender */
  spender: string;
  /** W.referrer (zero when W == 0, unset or malformed). Self-asserted: never a trust anchor. */
  referrer: string;
  /** true: plugin-window arm; false: direct arm or W == 0 */
  viaPlugin: boolean;
}

/** The verified context a target forwards to `Gate.mustCheckFor`. */
export interface GateCtx {
  principal: string;
  wallet: bigint;
  spender: string;
}

/** ARC-4 type of `GateCtx`: a static 72-byte tuple. */
export const GATE_CTX_ABI_TYPE = '(address,uint64,address)';

/** ARC-4 signature of Gate v2 `mustCheckFor` (= utils/functions.ts `GateMustCheckForAbiMethod`). */
export const GATE_MUST_CHECK_FOR_SIGNATURE = 'mustCheckFor((address,uint64,address),uint64,byte[][])void';

/** A global value as the AVM sees it. `undefined` means the key does not exist. */
export type PrincipalGlobalValue =
  | { type: 'bytes'; value: Uint8Array }
  | { type: 'uint'; value: bigint }
  | undefined;

/** The three chain reads the standard uses (AppCreator, a wallet global, AuthAddr). */
export interface PrincipalChainReader {
  /** Creator address of `appId`, or `undefined` if the app does not exist. */
  appCreator(appId: bigint): Promise<string | undefined>;
  /** Global `key` of `appId` (`undefined` when the key or the app does not exist). */
  appGlobal(appId: bigint, key: string): Promise<PrincipalGlobalValue>;
  /** Auth address of `address`; the zero address when not rekeyed or not funded. */
  authAddr(address: string): Promise<string>;
}

/** Thrown where the AVM would fail with an opcode error (a type mismatch, not a logged code). */
export class PrincipalPanicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrincipalPanicError';
  }
}

/** Thrown by the strict variants with the code the contract logs. */
export class PrincipalResolutionError extends Error {
  readonly code: PrincipalErrorCode;
  constructor(code: PrincipalErrorCode, message: string) {
    super(`${code}: ${message}`);
    this.name = 'PrincipalResolutionError';
    this.code = code;
  }
}

function addressString(address: string | Address): string {
  return typeof address === 'string' ? address : address.toString();
}

/** Address of app `appId` (`sha512_256("appID" ‖ itob(appId))`). */
export function appAddress(appId: bigint | number): string {
  return getApplicationAddress(BigInt(appId)).toString();
}

function plainPrincipal(sender: string): Principal {
  return { wallet: 0n, principal: sender, origin: ZERO_ADDRESS, spender: sender, referrer: ZERO_ADDRESS, viaPlugin: false };
}

/**
 * Read a 32-byte address global the way the contract does:
 * `undefined` when missing or not 32 bytes; a panic when it is a uint64.
 */
async function addressGlobal(reader: PrincipalChainReader, appId: bigint, key: string): Promise<string | undefined> {
  const value = await reader.appGlobal(appId, key);
  if (value === undefined) return undefined;
  if (value.type === 'uint') {
    throw new PrincipalPanicError(`app ${appId} stores a uint64 under the bytes key '${key}' (len would fail on chain)`);
  }
  return value.value.length === 32 ? new Address(value.value).toString() : undefined;
}

/** creator(W) == appAddress(walletFactory). False for 0, for a missing app and for any other creator. */
export async function isGenuineWallet(reader: PrincipalChainReader, wallet: bigint, walletFactory: bigint): Promise<boolean> {
  if (wallet === 0n || walletFactory === 0n) return false;
  const creator = await reader.appCreator(wallet);
  return creator !== undefined && creator === appAddress(walletFactory);
}

/** Internal: live control of `controlled` by `wallet`, relative to `spender` (spec §2). */
async function walletControlsLive(reader: PrincipalChainReader, wallet: bigint, controlled: string, spender: string): Promise<boolean> {
  if (controlled === spender) return true;
  if ((await reader.appCreator(wallet)) === undefined) return false;
  const walletAddress = appAddress(wallet);
  if (controlled === walletAddress) return (await reader.authAddr(walletAddress)) === ZERO_ADDRESS;
  return (await reader.authAddr(controlled)) === walletAddress;
}

/** The call context the on-chain resolver observes. */
export interface PrincipalCallContext {
  /** The pinned wallet factory id (`AkitaAppList.wallet`). Never derive it from `W`. */
  walletFactory: bigint;
  /** The wallet hint the call passes (0n = plain account). */
  hint: bigint;
  /** `Txn.sender` of the target call. */
  sender: string | Address;
  /** `Global.callerApplicationId` of the target call (0n for a top-level call). */
  callerApp: bigint;
  /** `Global.callerApplicationAddress`. Defaults to `appAddress(callerApp)`, or zero at top level. */
  callerAddr?: string | Address;
  /**
   * Override for `W.spending_address`. Use it to predict a call made inside a window that is not
   * open yet: outside a window the wallet stores the zero address there.
   */
  spendingOverride?: string | Address;
  /** true: throw like `resolvePrincipal`; false: fall back to plain like `tryResolvePrincipal`. */
  strict: boolean;
}

/**
 * Mirror of the internal `resolvePrincipalCtx` (spec §3.1). It answers both `resolvePrincipal`
 * (strict) and `tryResolvePrincipal` (non-strict) for a context you describe.
 */
export async function predictPrincipal(reader: PrincipalChainReader, context: PrincipalCallContext): Promise<Principal> {
  const { walletFactory, hint, callerApp, strict } = context;
  const sender = addressString(context.sender);
  const callerAddr = context.callerAddr !== undefined
    ? addressString(context.callerAddr)
    : callerApp === 0n ? ZERO_ADDRESS : appAddress(callerApp);

  const fail = (code: PrincipalErrorCode, message: string): Principal => {
    if (strict) throw new PrincipalResolutionError(code, message);
    return plainPrincipal(sender);
  };

  if (hint === 0n) return plainPrincipal(sender);
  if (!(await isGenuineWallet(reader, hint, walletFactory))) {
    return fail(PrincipalErrorCode.NotWallet, `app ${hint} is not a wallet created by factory ${walletFactory}`);
  }
  if (callerApp === 0n) return fail(PrincipalErrorCode.TopLevel, 'a wallet hint needs an app caller');

  let viaPlugin = false;
  if (callerApp !== hint) {
    const spending = context.spendingOverride !== undefined
      ? addressString(context.spendingOverride)
      : await addressGlobal(reader, hint, PRINCIPAL_KEY_SPENDING);
    if (!(spending !== undefined && spending === sender && sender !== callerAddr)) {
      return fail(PrincipalErrorCode.NotBound, `wallet ${hint} does not hold ${sender} for caller ${callerApp}`);
    }
    viaPlugin = true;
  }

  const controlled = await addressGlobal(reader, hint, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === undefined) return fail(PrincipalErrorCode.BadWallet, `wallet ${hint} has no 32-byte controlled_address`);
  const live = await walletControlsLive(reader, hint, controlled, sender);
  const referrer = (await addressGlobal(reader, hint, PRINCIPAL_KEY_REFERRER)) ?? ZERO_ADDRESS;

  return {
    wallet: hint,
    principal: live ? controlled : sender,
    origin: live ? controlled : ZERO_ADDRESS,
    spender: sender,
    referrer,
    viaPlugin,
  };
}

/**
 * The principal a target computes when a plugin calls it from inside `wallet`'s window, with
 * `windowHint(wallet)` as the hint and `spender` (the window's spending account) as `Txn.sender`.
 * Works before the window opens: it substitutes `spending_address = spender`.
 */
export async function predictWindowPrincipal(
  reader: PrincipalChainReader,
  walletFactory: bigint,
  wallet: bigint,
  spender: string | Address,
  plugin: bigint,
): Promise<Principal> {
  return predictPrincipal(reader, {
    walletFactory,
    hint: wallet,
    sender: spender,
    callerApp: plugin,
    spendingOverride: spender,
    strict: true,
  });
}

/** Mirror of `quoteReferrer`: genuine W => W.referrer, else zero. */
export async function quoteReferrer(reader: PrincipalChainReader, walletFactory: bigint, hint: bigint): Promise<string> {
  if (!(await isGenuineWallet(reader, hint, walletFactory))) return ZERO_ADDRESS;
  return (await addressGlobal(reader, hint, PRINCIPAL_KEY_REFERRER)) ?? ZERO_ADDRESS;
}

/** Mirror of `ownsAtRest`: genuine(W) && ((A == W.address && auth(W.address) == 0) || auth(A) == W.address). */
export async function ownsAtRest(reader: PrincipalChainReader, walletFactory: bigint, wallet: bigint, account: string | Address): Promise<boolean> {
  if (!(await isGenuineWallet(reader, wallet, walletFactory))) return false;
  const target = addressString(account);
  const walletAddress = appAddress(wallet);
  if (target === walletAddress) return (await reader.authAddr(walletAddress)) === ZERO_ADDRESS;
  return (await reader.authAddr(target)) === walletAddress;
}

/** Mirror of `atRestPrincipal` (stored-pair re-check; reads no wallet globals). */
export async function atRestPrincipal(
  reader: PrincipalChainReader,
  walletFactory: bigint,
  account: string | Address,
  wallet: bigint,
  stored: string | Address,
): Promise<string> {
  const target = addressString(account);
  const storedAddress = addressString(stored);
  if (storedAddress === target) return target;
  if (!(await ownsAtRest(reader, walletFactory, wallet, target))) return target;
  const walletAddress = appAddress(wallet);
  if (storedAddress === walletAddress) {
    return (await reader.authAddr(walletAddress)) === ZERO_ADDRESS ? storedAddress : target;
  }
  return (await reader.authAddr(storedAddress)) === walletAddress ? storedAddress : target;
}

/** Mirror of `thirdPartyPrincipal` (QUOTE-ONLY: reads W.controlled_address). */
export async function thirdPartyPrincipal(
  reader: PrincipalChainReader,
  walletFactory: bigint,
  account: string | Address,
  wallet: bigint,
): Promise<string> {
  const target = addressString(account);
  if (!(await ownsAtRest(reader, walletFactory, wallet, target))) return target;
  const controlled = await addressGlobal(reader, wallet, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === undefined) return target;
  return (await walletControlsLive(reader, wallet, controlled, target)) ? controlled : target;
}

/** Mirror of `functions.ts` `tipWallet` (`tipWalletFor`): the creator's wallet if it still owns and controls, else 0n. */
export async function tipWallet(reader: PrincipalChainReader, walletFactory: bigint, creator: string | Address, stored: bigint): Promise<bigint> {
  const target = addressString(creator);
  if (stored === 0n || !(await ownsAtRest(reader, walletFactory, stored, target))) return 0n;
  const controlled = await addressGlobal(reader, stored, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === undefined) return 0n;
  return (await walletControlsLive(reader, stored, controlled, target)) ? stored : 0n;
}

/** `{ principal, wallet, spender }` of a resolved principal. */
export function gateCtx(p: Principal): GateCtx {
  return { principal: p.principal, wallet: p.wallet, spender: p.spender };
}

/** Mirror of `ctxOwns`: account == ctx.principal || account == ctx.spender || ownsAtRest(ctx.wallet, account). */
export async function ctxOwns(reader: PrincipalChainReader, walletFactory: bigint, ctx: GateCtx, account: string | Address): Promise<boolean> {
  const target = addressString(account);
  if (target === ctx.principal || target === ctx.spender) return true;
  return ctx.wallet !== 0n && ownsAtRest(reader, walletFactory, ctx.wallet, target);
}

/** The hint a plugin forwards from inside `wallet`'s window: exactly the wallet's id (§3.8 rule 6). */
export function windowHint(wallet: bigint | number): bigint {
  return BigInt(wallet);
}

/** ARC-4 encoding of a `GateCtx` (72 bytes): the `appArgs(1)` that `gateCheckCtx` asserts. */
export function encodeGateCtx(ctx: GateCtx): Uint8Array {
  return algosdk.ABIType.from(GATE_CTX_ABI_TYPE).encode([ctx.principal, ctx.wallet, ctx.spender]);
}

/** The ABI method of Gate v2 `mustCheckFor`, for building the gate txn of a direct call. */
export function gateMustCheckForMethod(): algosdk.ABIMethod {
  return algosdk.ABIMethod.fromSignature(GATE_MUST_CHECK_FOR_SIGNATURE);
}

// RESOURCES (spec §3.6) ----------------------------------------------------------------------------

/** One Access-list resource, in the form `TransactionComposer` and the preparer accept. */
export type PrincipalResourceReference = algosdk.TransactionResourceReference;

function accountRef(address: string): PrincipalResourceReference {
  return { address: Address.fromString(address) };
}

function dedupe(references: PrincipalResourceReference[]): PrincipalResourceReference[] {
  const seen = new Set<string>();
  return references.filter((reference) => {
    const key = reference.address ? `d:${reference.address.toString()}` : `p:${reference.appIndex}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Resources `resolvePrincipal` reads for a hinted call whose state you already know (spec §3.6):
 *
 * - `P(W)` whenever `W != 0`;
 * - nothing more when `controlled == spender` (the shortcut needs no AuthAddr read);
 * - `A(W.address)` when `controlled == W.address` and `spender != controlled`
 *   (an escrow window of a default wallet, the common case);
 * - `A(controlled)` when `controlled` is external and `spender != controlled`
 *   (an escrow window of an external-controlled wallet).
 *
 * The DAO and the factory need nothing: the DAO is already present and the factory address is hashed.
 */
export function principalResources({ wallet, controlled, spender }: {
  wallet: bigint;
  controlled: string | Address;
  spender: string | Address;
}): PrincipalResourceReference[] {
  if (wallet === 0n) return [];
  const references: PrincipalResourceReference[] = [{ appIndex: wallet }];
  const controlledAddress = addressString(controlled);
  if (controlledAddress === addressString(spender) || controlledAddress === ZERO_ADDRESS) return references;
  const walletAddress = appAddress(wallet);
  references.push(accountRef(controlledAddress === walletAddress ? walletAddress : controlledAddress));
  return dedupe(references);
}

/**
 * Resources of an at-rest re-check (`ownsAtRest`, `atRestPrincipal`, `ctxOwns`): `P(W)`, `A(account)`,
 * plus `A(stored)` or `A(W.address)` when a stored principal is given.
 */
export function atRestResources({ wallet, account, stored }: {
  wallet: bigint;
  account: string | Address;
  stored?: string | Address;
}): PrincipalResourceReference[] {
  if (wallet === 0n) return [];
  const walletAddress = appAddress(wallet);
  const references: PrincipalResourceReference[] = [{ appIndex: wallet }, accountRef(addressString(account))];
  if (addressString(account) === walletAddress) references.push(accountRef(walletAddress));
  if (stored !== undefined && addressString(stored) !== addressString(account)) references.push(accountRef(addressString(stored)));
  return dedupe(references);
}

/**
 * `principalResources` for a plugin window of `wallet` whose spending account is `spender`. It reads
 * `W.controlled_address` through `reader`.
 */
export async function windowPrincipalResources(
  reader: PrincipalChainReader,
  wallet: bigint,
  spender: string | Address,
): Promise<PrincipalResourceReference[]> {
  if (wallet === 0n) return [];
  const controlled = await addressGlobal(reader, wallet, PRINCIPAL_KEY_CONTROLLED);
  if (controlled === undefined) return [{ appIndex: wallet }];
  return principalResources({ wallet, controlled, spender });
}

// ALGOD READER --------------------------------------------------------------------------------------

function isNotFound(error: unknown): boolean {
  const status = (error as { status?: number; response?: { status?: number } })?.status
    ?? (error as { response?: { status?: number } })?.response?.status;
  return status === 404 || /application does not exist|404/i.test(String((error as Error)?.message ?? ''));
}

/**
 * `PrincipalChainReader` backed by algod. Reads are cached for the reader's lifetime, so create a
 * new reader for each prediction that must see fresh state.
 */
export function algodPrincipalReader(algod: algosdk.Algodv2): PrincipalChainReader {
  const apps = new Map<string, Promise<algosdk.modelsv2.Application | undefined>>();
  const auths = new Map<string, Promise<string>>();

  const app = (appId: bigint) => {
    const key = appId.toString();
    if (!apps.has(key)) {
      apps.set(key, algod.getApplicationByID(appId).do().catch((error: unknown) => {
        if (isNotFound(error)) return undefined;
        throw error;
      }));
    }
    return apps.get(key)!;
  };

  return {
    async appCreator(appId) {
      const info = await app(appId);
      return info?.params?.creator ? addressString(info.params.creator) : undefined;
    },
    async appGlobal(appId, key) {
      const info = await app(appId);
      const wanted = new TextEncoder().encode(key);
      const entry = info?.params?.globalState?.find(({ key: entryKey }) =>
        entryKey.length === wanted.length && entryKey.every((byte, index) => byte === wanted[index]));
      if (!entry) return undefined;
      return entry.value.type === 1
        ? { type: 'bytes', value: entry.value.bytes }
        : { type: 'uint', value: BigInt(entry.value.uint) };
    },
    async authAddr(address) {
      if (!auths.has(address)) {
        auths.set(address, algod.accountInformation(address).exclude('all').do().then(
          (info) => (info.authAddr ? addressString(info.authAddr) : ZERO_ADDRESS),
          (error: unknown) => {
            if (isNotFound(error)) return ZERO_ADDRESS;
            throw error;
          },
        ));
      }
      return auths.get(address)!;
    },
  };
}
