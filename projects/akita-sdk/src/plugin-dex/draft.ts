import type { NetworkAppIds } from '../networks';
import type { PoolConfig } from '../generated/PluginDexClient';
import {
  BINS_CREATE_CURVE_MBR,
  binIdForPrice,
  defaultBinPoolParams,
  encodeBinInitArgs,
} from './bins';
import { HOOK_POINT_ORDER, HookPerm, HookPoint, type HookPointName } from './constants';
import {
  antiSnipeInstall,
  catalogueInstall,
  gatedFeeInstall,
  HOOK_CATALOGUE,
  launchTaxInstall,
  validateAntiSnipe,
  validateGatedFeeSchedule,
  validateHookStack,
  validateLaunchTax,
  type AntiSnipeInit,
  type GatedFeeSchedule,
  type HookCatalogueEntry,
  type HookInstall,
  type HookKind,
  type HookStackIssue,
  type LaunchTaxInit,
} from './hooks';

/**
 * A pool as a create-pool form holds it, before it is turned into the Vault's PoolConfig and hook
 * installs. Kept free of any UI framework so the app and desktop wizards share one model.
 */

export type PoolCurveKind = 'constantProduct' | 'bins';

type PlainHookKind = Exclude<HookKind, 'antiSnipeFee' | 'launchTax' | 'gatedFee'>;

const HOOK_FEE_PERMS = HookPerm.HookFee | HookPerm.HookFeeOut;

/**
 * Mirrors the Vault's createPool check (readiness audit 2026-11-09, C15). A launch tax above zero is
 * declared to the Vault when the pool is created. Every hook fee of a swap counts against the pool's one
 * hook fee cap, so the Vault then refuses the pool if another hook installed with a hook-fee permission
 * does not declare its own maximum (errPdhm). Of the catalogue hooks only the launch tax declares, so
 * a taxed launch pool cannot also carry another fee-charging hook such as the swap tax.
 *
 * `installs` are the built installs in the same order as `hooks` (the permissions as they will be
 * sent); without them the catalogue's default permissions are used.
 */
export function validateDeclaredHookFees(hooks: HookDraft[], installs?: HookInstall[]): HookStackIssue[] {
  const declares = (hook: HookDraft) => hook.kind === 'launchTax' && (hook.init.buyTaxBps > 0n || hook.init.sellTaxBps > 0n);
  if (!hooks.some(declares)) return [];
  const issues: HookStackIssue[] = [];
  hooks.forEach((hook, index) => {
    if (declares(hook)) return;
    const perms = installs ? installs[index].perms : HOOK_CATALOGUE[hook.kind].perms;
    if ((perms & HOOK_FEE_PERMS) !== 0n) {
      issues.push({ index, message: `${HOOK_CATALOGUE[hook.kind].name} cannot share a pool with a launch tax: both charge a hook fee against the same cap` });
    }
  });
  return issues;
}

export type HookDraft =
  | { kind: 'antiSnipeFee'; init: AntiSnipeInit }
  | { kind: 'launchTax'; init: LaunchTaxInit; quoteAssetIsNew?: boolean }
  | { kind: 'gatedFee'; schedule?: GatedFeeSchedule; defaultTiers?: number }
  | { kind: PlainHookKind; extraPoints?: bigint };

export type BinsDraft = {
  binStep: bigint;
  /** starting price, in base units of B per base unit of A as the user ordered the pair */
  price: number;
  /** decimals of the pool's B side (in Vault order), for the dust floor */
  decimalsB: number;
};

export type PoolDraft = {
  assetA: bigint;
  assetB: bigint;
  curve: PoolCurveKind;
  feeBps: bigint;
  /** defaults to 1000 bps */
  maxFeeBps?: bigint;
  /** defaults to the largest tax a hook in the stack can take, else 0 */
  maxHookFeeBps?: bigint;
  bins?: BinsDraft;
  /** in install order: hooks run in this order at every point they share */
  hooks: HookDraft[];
};

export type BuiltPoolDraft = {
  config: PoolConfig;
  hooks: HookInstall[];
  issues: HookStackIssue[];
  /** follow-up calls needed after createPool, by hook */
  afterCreate: Array<{ kind: HookKind; step: NonNullable<HookCatalogueEntry['afterCreate']> }>;
};

const EMPTY = new Uint8Array();

/** The deployment of a catalogue hook on this network, or 0 when it is not deployed */
export const hookAppId = (kind: HookKind, appIds: Partial<NetworkAppIds>): bigint =>
  (appIds[HOOK_CATALOGUE[kind].appIdKey] as bigint | undefined) ?? 0n;

/** Catalogue hooks deployed on this network */
export const availableHooks = (appIds: Partial<NetworkAppIds>): HookCatalogueEntry[] =>
  Object.values(HOOK_CATALOGUE).filter((entry) => hookAppId(entry.kind, appIds) > 0n);

export function hookDraftInstall(draft: HookDraft, app: bigint): HookInstall {
  switch (draft.kind) {
    case 'antiSnipeFee':
      return antiSnipeInstall(app, draft.init);
    case 'launchTax':
      return launchTaxInstall(app, draft.init, draft.quoteAssetIsNew);
    case 'gatedFee':
      return gatedFeeInstall(app, draft.schedule, draft.defaultTiers);
    default:
      return catalogueInstall(draft.kind, app, draft.extraPoints ?? 0n);
  }
}

function hookFeeCap(hooks: HookDraft[]): bigint {
  let cap = 0n;
  for (const hook of hooks) {
    if (hook.kind === 'launchTax') {
      const tax = hook.init.buyTaxBps > hook.init.sellTaxBps ? hook.init.buyTaxBps : hook.init.sellTaxBps;
      if (tax > cap) cap = tax;
    }
  }
  return cap;
}

/**
 * Turn a draft into createPool's config and hooks, with every problem the Vault would reject it for.
 * `approvals` (hook app → approved perms, from `getHookApprovals`) adds the DAO approval checks.
 */
export function buildPoolDraft(
  draft: PoolDraft,
  appIds: Partial<NetworkAppIds>,
  approvals?: Map<bigint, bigint>,
): BuiltPoolDraft {
  const issues: HookStackIssue[] = [];
  if (draft.assetA === draft.assetB) issues.push({ message: 'Pick two different assets' });
  const maxFeeBps = draft.maxFeeBps ?? 1_000n;
  const maxHookFeeBps = draft.maxHookFeeBps ?? hookFeeCap(draft.hooks);

  let config: PoolConfig = {
    curve: 0n,
    feeBps: draft.feeBps,
    maxFeeBps,
    custodyFeeBps: draft.feeBps,
    maxHookFeeBps,
    virtualA: 0n,
    virtualB: 0n,
    graduationThreshold: 0n,
    quoteIsA: false,
    curveMbr: 0n,
    curveArgs: EMPTY,
  };

  if (draft.curve === 'bins') {
    const engine = appIds.binEngine ?? 0n;
    if (engine === 0n) issues.push({ message: 'Bins pools are not available on this network' });
    if (!draft.bins) issues.push({ message: 'Set a bin step and a starting price' });
    else if (!(draft.bins.price > 0)) issues.push({ message: 'The starting price must be above zero' });
    else {
      // the engine prices B per A in Vault order (A < B); invert when the user's order is flipped
      const price = draft.assetA < draft.assetB ? draft.bins.price : 1 / draft.bins.price;
      const params = defaultBinPoolParams(binIdForPrice(draft.bins.binStep, price), draft.bins.decimalsB, {
        binStep: draft.bins.binStep,
      });
      config = { ...config, curve: engine, curveMbr: BINS_CREATE_CURVE_MBR, curveArgs: encodeBinInitArgs(params) };
    }
  }

  const hooks: HookInstall[] = [];
  draft.hooks.forEach((hook, index) => {
    const app = hookAppId(hook.kind, appIds);
    if (app === 0n) {
      issues.push({ index, message: `${HOOK_CATALOGUE[hook.kind].name} is not deployed on this network` });
      return;
    }
    try {
      hooks.push(hookDraftInstall(hook, app));
    } catch (error) {
      // bad init data, such as an invalid owner address
      issues.push({ index, message: error instanceof Error ? error.message : 'Invalid hook settings' });
      return;
    }
    const limits = { maxFeeBps, maxHookFeeBps };
    const own =
      hook.kind === 'antiSnipeFee'
        ? validateAntiSnipe(hook.init, limits)
        : hook.kind === 'launchTax'
          ? validateLaunchTax(hook.init, limits)
          : hook.kind === 'gatedFee' && hook.schedule
            ? validateGatedFeeSchedule(hook.schedule)
            : [];
    issues.push(...own.map((issue) => ({ ...issue, index })));
  });
  issues.push(...validateHookStack(hooks, { feeBps: draft.feeBps, maxFeeBps, maxHookFeeBps, custodyFeeBps: draft.feeBps }, approvals));
  issues.push(...validateDeclaredHookFees(draft.hooks, hooks.length === draft.hooks.length ? hooks : undefined));

  const afterCreate = draft.hooks.flatMap((hook) => {
    const step = HOOK_CATALOGUE[hook.kind].afterCreate;
    return step ? [{ kind: hook.kind, step }] : [];
  });
  return { config, hooks, issues, afterCreate };
}

export type LifecycleSlot = {
  point: HookPointName;
  /** indexes into the draft's hooks, in the order they run at this point */
  hooks: number[];
};

/** The stack laid out by lifecycle point, in the order a pool goes through them */
export function lifecycleSlots(hooks: Array<Pick<HookInstall, 'points'>>): LifecycleSlot[] {
  return HOOK_POINT_ORDER.map((point) => ({
    point,
    hooks: hooks.flatMap((hook, index) => ((hook.points & HookPoint[point]) !== 0n ? [index] : [])),
  }));
}

/** Plain-language names for the lifecycle points */
export const HOOK_POINT_LABELS: Record<HookPointName, string> = {
  AfterInitialize: 'Pool created',
  BeforeAddLiquidity: 'Before deposit',
  AfterAddLiquidity: 'After deposit',
  BeforeRemoveLiquidity: 'Before withdrawal',
  AfterRemoveLiquidity: 'After withdrawal',
  BeforeSwap: 'Before swap',
  AfterSwap: 'After swap',
  Quote: 'Price quote',
  Poke: 'Maintenance',
};

/** Plain-language names for what a hook may do */
export function permissionLabels(perms: bigint): string[] {
  const out: string[] = [];
  if (perms & HookPerm.Custody) out.push('Holds pool funds');
  if (perms & HookPerm.DynamicFee) out.push('Sets the swap fee');
  if (perms & HookPerm.HookFee) out.push('Takes a fee on swap input');
  if (perms & HookPerm.HookFeeOut) out.push('Takes a fee on swap output');
  if (perms & HookPerm.External) out.push('Moves funds to outside venues');
  return out;
}
