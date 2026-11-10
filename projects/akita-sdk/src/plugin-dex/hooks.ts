import { ABIType, Address } from 'algosdk';
import type { NetworkAppIds } from '../networks';
import {
  AntiSnipe,
  BACKRUN_MAX_EXTRA_INNERS,
  GatedFee,
  HOOK_FLAGS_ALL,
  HOOK_POINT_ALL,
  HOOK_PERM_ALL,
  HookFlag,
  HookPerm,
  HookPoint,
  HookPointName,
  HOOK_POINT_ORDER,
  LAZY_CUSTODY_MIN_EXTRA_INNERS,
  LaunchTax,
  MAX_FEE_BPS,
  MAX_HOOK_FEE_BPS,
  MAX_HOOKS_PER_POOL,
  MAX_POOL_FEE_CAP_BPS,
  MIN_TXN_FEE,
  PRICING_PERMS,
} from './constants';

/** HookInstall as the generated client encodes it: [app, points, perms, flags, funding, initData] */
export type HookInstallTuple = [bigint, bigint, bigint, bigint, bigint, Uint8Array];

export type HookInstall = {
  app: bigint;
  points: bigint;
  perms: bigint;
  flags?: bigint;
  /** µALGO the Vault forwards to the hook at AfterInitialize (F6), paid inside createPool */
  funding?: bigint;
  initData?: Uint8Array;
};

export const hookInstallTuple = ({
  app,
  points,
  perms,
  flags = 0n,
  funding = 0n,
  initData = new Uint8Array(),
}: HookInstall): HookInstallTuple => [app, points, perms, flags, funding, initData];

/** Pool settings a hook stack is checked against (the matching PoolConfig fields) */
export type HookPoolLimits = {
  maxFeeBps: bigint;
  maxHookFeeBps: bigint;
};

// CATALOGUE -----------------------------------------------------------------------------------------

export type HookKind =
  | 'impactFee'
  | 'swapTax'
  | 'volatilityFee'
  | 'backrunArb'
  | 'gatedFee'
  | 'antiSnipeFee'
  | 'launchTax'
  | 'consensusKeyreg';

export type HookCatalogueEntry = {
  kind: HookKind;
  /** NetworkAppIds key of the shared, DAO-approved deployment */
  appIdKey: keyof NetworkAppIds;
  name: string;
  description: string;
  /** points the hook needs; the UI may add `optionalPoints` */
  points: bigint;
  optionalPoints?: bigint;
  perms: bigint;
  flags: bigint;
  /** the hook reads per-pool config from initData at AfterInitialize */
  takesInitData: boolean;
  /** a follow-up call is needed after createPool before the hook is live */
  afterCreate?: 'volatilityInitPool' | 'backrunRegisterPool' | 'consensusSetKeys';
};

/** The hooks the Akita DAO ships, with the install each one expects */
export const HOOK_CATALOGUE: Record<HookKind, HookCatalogueEntry> = {
  impactFee: {
    kind: 'impactFee',
    appIdKey: 'impactFeeHook',
    name: 'Impact fee',
    description: 'Raises the swap fee with the price impact of the trade.',
    points: HookPoint.BeforeSwap | HookPoint.Quote,
    perms: HookPerm.DynamicFee,
    flags: 0n,
    takesInitData: false,
  },
  swapTax: {
    kind: 'swapTax',
    appIdKey: 'swapTaxHook',
    name: 'Swap tax',
    description: 'Takes a fixed tax on every swap input in the taxed pair, paid to the hook owner.',
    points: HookPoint.BeforeSwap | HookPoint.Quote,
    perms: HookPerm.HookFee,
    flags: 0n,
    takesInitData: false,
  },
  volatilityFee: {
    kind: 'volatilityFee',
    appIdKey: 'volatilityFeeHook',
    name: 'Volatility fee',
    description: 'Raises the fee while the price is moving and decays it back when the market calms.',
    points: HookPoint.BeforeSwap | HookPoint.AfterSwap | HookPoint.Quote | HookPoint.Poke,
    perms: HookPerm.DynamicFee,
    flags: 0n,
    takesInitData: false,
    afterCreate: 'volatilityInitPool',
  },
  backrunArb: {
    kind: 'backrunArb',
    appIdKey: 'backrunArbHook',
    name: 'Backrun arbitrage',
    description: 'After each swap, closes price gaps against an outside venue and keeps the profit for LPs.',
    points: HookPoint.AfterSwap | HookPoint.Poke,
    perms: HookPerm.Custody,
    flags: HookFlag.LazyCustody,
    takesInitData: false,
    afterCreate: 'backrunRegisterPool',
  },
  gatedFee: {
    kind: 'gatedFee',
    appIdKey: 'gatedFeeHook',
    name: 'Gated fee discount',
    description: 'Discounts the fee for swappers holding a fee pass (staking power, impact or gates).',
    points: HookPoint.AfterInitialize | HookPoint.BeforeSwap | HookPoint.Quote,
    perms: HookPerm.DynamicFee,
    flags: 0n,
    takesInitData: true,
  },
  antiSnipeFee: {
    kind: 'antiSnipeFee',
    appIdKey: 'antiSnipeFeeHook',
    name: 'Anti-snipe fee',
    description: 'Starts with a high fee that decays over a set number of rounds after launch.',
    points: HookPoint.AfterInitialize | HookPoint.BeforeSwap | HookPoint.Quote,
    optionalPoints: HookPoint.AfterAddLiquidity,
    perms: HookPerm.DynamicFee,
    flags: 0n,
    takesInitData: true,
  },
  launchTax: {
    kind: 'launchTax',
    appIdKey: 'launchTaxHook',
    name: 'Launch tax',
    description: 'Taxes buys and sells in the quote asset until a set round, paid to the owner.',
    points: HookPoint.AfterInitialize | HookPoint.BeforeSwap | HookPoint.Quote,
    optionalPoints: HookPoint.AfterSwap,
    perms: HookPerm.HookFee | HookPerm.HookFeeOut,
    flags: 0n,
    takesInitData: true,
  },
  consensusKeyreg: {
    kind: 'consensusKeyreg',
    appIdKey: 'consensusKeyregHook',
    name: 'Consensus participation',
    description: "Lets an operator register the pool escrow's ALGO for consensus rewards.",
    points: HookPoint.Poke,
    perms: HookPerm.Custody,
    flags: HookFlag.LazyCustody,
    takesInitData: false,
    afterCreate: 'consensusSetKeys',
  },
};

// INIT DATA ------------------------------------------------------------------------------------------

const snipeInitType = ABIType.from('(uint64,uint64,uint64,uint64,uint64,address)');
const taxInitType = ABIType.from('(address,uint64,uint64,uint64,uint64)');
const feeScheduleType = ABIType.from('(uint64,uint64,uint64,(uint64,uint64,uint64,uint64)[])');

export type AntiSnipeInit = {
  startFeeBps: bigint;
  endFeeBps: bigint;
  /** AntiSnipe.DecayLinear | AntiSnipe.DecayExponential */
  decayMode: bigint;
  decayRounds: bigint;
  /** AntiSnipe.StartCreation | AntiSnipe.StartFirstLiquidity (the latter needs AfterAddLiquidity) */
  startMode: bigint;
  /** zero address, or the pool creator */
  exempt?: string;
};

export function encodeAntiSnipeInit(init: AntiSnipeInit): Uint8Array {
  return snipeInitType.encode([
    init.startFeeBps,
    init.endFeeBps,
    init.decayMode,
    init.decayRounds,
    init.startMode,
    init.exempt ?? Address.zeroAddress().toString(),
  ]);
}

export type LaunchTaxInit = {
  /** receives the accrued tax through `claim` */
  owner: string;
  /** the pool side every tax is paid in */
  quoteAsset: bigint;
  buyTaxBps: bigint;
  sellTaxBps: bigint;
  /** 0 = forever */
  untilRound: bigint;
};

export function encodeLaunchTaxInit(init: LaunchTaxInit): Uint8Array {
  return taxInitType.encode([init.owner, init.quoteAsset, init.buyTaxBps, init.sellTaxBps, init.untilRound]);
}

export type GatedFeeTier = {
  minPower: bigint;
  minImpact: bigint;
  /** every bit must be set in the pass's gates */
  gateMask: bigint;
  discountBps: bigint;
};

export type GatedFeeSchedule = {
  floorFeeBps: bigint;
  maxDiscountBps: bigint;
  impactMaxDiscountBps: bigint;
  tiers: GatedFeeTier[];
};

/** `undefined` installs with empty initData, which copies the DAO's default schedule */
export function encodeGatedFeeSchedule(schedule?: GatedFeeSchedule): Uint8Array {
  if (schedule === undefined) return new Uint8Array();
  return feeScheduleType.encode([
    schedule.floorFeeBps,
    schedule.maxDiscountBps,
    schedule.impactMaxDiscountBps,
    schedule.tiers.map((t) => [t.minPower, t.minImpact, t.gateMask, t.discountBps]),
  ]);
}

// FUNDING --------------------------------------------------------------------------------------------

export const antiSnipeFunding = (): bigint => AntiSnipe.Funding;

/** pass `quoteAssetIsNew` false when the hook already holds the ASA (another pool paid the opt-in and total box) */
export const launchTaxFunding = (quoteAsset: bigint, quoteAssetIsNew = true): bigint =>
  quoteAsset === 0n || !quoteAssetIsNew
    ? LaunchTax.ConfigBoxMbr
    : LaunchTax.ConfigBoxMbr + LaunchTax.AssetOptInMbr + LaunchTax.TotalBoxMbr;

/** tiers = the schedule's tier count; for an empty initData pass the DAO default's tier count */
export const gatedFeeFunding = (tiers: number): bigint =>
  GatedFee.ScheduleMbrBase + GatedFee.ScheduleMbrPerTier * BigInt(tiers);

// BUILDERS -------------------------------------------------------------------------------------------

export function antiSnipeInstall(app: bigint, init: AntiSnipeInit): HookInstall {
  const entry = HOOK_CATALOGUE.antiSnipeFee;
  const points =
    init.startMode === AntiSnipe.StartFirstLiquidity ? entry.points | HookPoint.AfterAddLiquidity : entry.points;
  return { app, points, perms: entry.perms, flags: 0n, funding: antiSnipeFunding(), initData: encodeAntiSnipeInit(init) };
}

export function launchTaxInstall(app: bigint, init: LaunchTaxInit, quoteAssetIsNew = true): HookInstall {
  const entry = HOOK_CATALOGUE.launchTax;
  let perms = 0n;
  let points = entry.points;
  if (init.buyTaxBps > 0n) perms |= HookPerm.HookFee;
  if (init.sellTaxBps > 0n) {
    perms |= HookPerm.HookFeeOut;
    points |= HookPoint.AfterSwap;
  }
  return {
    app,
    points,
    perms,
    flags: 0n,
    funding: launchTaxFunding(init.quoteAsset, quoteAssetIsNew),
    initData: encodeLaunchTaxInit(init),
  };
}

/** `defaultTiers` is the tier count of the DAO's default schedule, used only when `schedule` is undefined */
export function gatedFeeInstall(app: bigint, schedule?: GatedFeeSchedule, defaultTiers: number = GatedFee.MaxTiers): HookInstall {
  const entry = HOOK_CATALOGUE.gatedFee;
  return {
    app,
    points: entry.points,
    perms: entry.perms,
    flags: 0n,
    funding: gatedFeeFunding(schedule ? schedule.tiers.length : defaultTiers),
    initData: encodeGatedFeeSchedule(schedule),
  };
}

/** Install a catalogue hook that takes no initData with its default points, perms and flags */
export function catalogueInstall(kind: HookKind, app: bigint, extraPoints = 0n): HookInstall {
  const entry = HOOK_CATALOGUE[kind];
  if (entry.takesInitData) throw new Error(`${entry.name} needs initData: use its own install builder`);
  return { app, points: entry.points | extraPoints, perms: entry.perms, flags: entry.flags };
}

// VALIDATION -----------------------------------------------------------------------------------------

export type HookStackIssue = { index?: number; message: string };

/**
 * Mirrors PluginDex.validateHooks and the createPool fee checks, so a UI can explain a bad stack before
 * the user signs. `approvals` maps hook app id → approved perms; missing entries are reported.
 */
export function validateHookStack(
  hooks: HookInstall[],
  pool: HookPoolLimits & { feeBps?: bigint; custodyFeeBps?: bigint },
  approvals?: Map<bigint, bigint>,
): HookStackIssue[] {
  const issues: HookStackIssue[] = [];
  if (pool.feeBps !== undefined && (pool.feeBps > pool.maxFeeBps || pool.feeBps > MAX_FEE_BPS)) {
    issues.push({ message: `Base fee must be at most ${MAX_FEE_BPS} bps and at most the fee cap` });
  }
  if (pool.maxFeeBps > MAX_POOL_FEE_CAP_BPS) {
    issues.push({ message: `Fee cap must be at most ${MAX_POOL_FEE_CAP_BPS} bps` });
  }
  if (pool.custodyFeeBps !== undefined && pool.custodyFeeBps > pool.maxFeeBps) {
    issues.push({ message: 'Custody fee must be at most the fee cap' });
  }
  if (pool.maxHookFeeBps > MAX_HOOK_FEE_BPS) {
    issues.push({ message: `Hook fee cap must be at most ${MAX_HOOK_FEE_BPS} bps` });
  }
  if (hooks.length > MAX_HOOKS_PER_POOL) {
    issues.push({ message: `A pool takes at most ${MAX_HOOKS_PER_POOL} hooks` });
  }

  let feeOutHooks = 0;
  const seen = new Set<bigint>();
  hooks.forEach((hook, index) => {
    const flags = hook.flags ?? 0n;
    if (hook.points === 0n || (hook.points | HOOK_POINT_ALL) !== HOOK_POINT_ALL) {
      issues.push({ index, message: 'Pick at least one valid lifecycle point' });
    }
    if ((hook.perms | HOOK_PERM_ALL) !== HOOK_PERM_ALL || (flags | HOOK_FLAGS_ALL) !== HOOK_FLAGS_ALL) {
      issues.push({ index, message: 'Unknown permission or flag bits' });
    }
    if (approvals) {
      const approved = approvals.get(hook.app);
      if (approved === undefined) issues.push({ index, message: `Hook ${hook.app} is not approved by the DAO` });
      else if ((hook.perms | approved) !== approved) {
        issues.push({ index, message: 'Asks for permissions the DAO has not approved for this hook' });
      }
    }
    const custody = (hook.perms & HookPerm.Custody) !== 0n;
    if (!custody && ((flags & HookFlag.LazyCustody) !== 0n || (hook.perms & HookPerm.External) !== 0n)) {
      issues.push({ index, message: 'Lazy custody and External need the Custody permission' });
    }
    if ((hook.perms & PRICING_PERMS) !== 0n && (hook.points & HookPoint.BeforeSwap) !== 0n && (hook.points & HookPoint.Quote) === 0n) {
      issues.push({ index, message: 'A hook that prices swaps must also answer quotes' });
    }
    if ((hook.perms & HookPerm.HookFeeOut) !== 0n) feeOutHooks += 1;
    if (seen.has(hook.app)) issues.push({ index, message: 'The same hook is installed twice' });
    seen.add(hook.app);
  });
  if (feeOutHooks > 1) issues.push({ message: 'Only one hook may take a fee on the swap output' });
  return issues;
}

/** Hook-specific checks for the builders' init data against the pool settings */
export function validateAntiSnipe(init: AntiSnipeInit, pool: HookPoolLimits): HookStackIssue[] {
  const issues: HookStackIssue[] = [];
  if (init.startFeeBps > AntiSnipe.MaxStartFeeBps) issues.push({ message: `Start fee must be at most ${AntiSnipe.MaxStartFeeBps} bps` });
  if (init.endFeeBps > AntiSnipe.MaxEndFeeBps) issues.push({ message: `End fee must be at most ${AntiSnipe.MaxEndFeeBps} bps` });
  if (init.endFeeBps > init.startFeeBps) issues.push({ message: 'End fee must not exceed the start fee' });
  if (init.decayRounds === 0n || init.decayRounds > AntiSnipe.MaxDecayRounds) {
    issues.push({ message: `Decay must last 1 to ${AntiSnipe.MaxDecayRounds} rounds` });
  }
  if (pool.maxFeeBps < init.startFeeBps) issues.push({ message: 'Raise the pool fee cap to at least the start fee' });
  return issues;
}

export function validateLaunchTax(init: LaunchTaxInit, pool: HookPoolLimits): HookStackIssue[] {
  const issues: HookStackIssue[] = [];
  if (init.buyTaxBps > LaunchTax.MaxTaxBps || init.sellTaxBps > LaunchTax.MaxTaxBps) {
    issues.push({ message: `Taxes must be at most ${LaunchTax.MaxTaxBps} bps` });
  }
  if (init.buyTaxBps === 0n && init.sellTaxBps === 0n) issues.push({ message: 'Set a buy or a sell tax' });
  const max = init.buyTaxBps > init.sellTaxBps ? init.buyTaxBps : init.sellTaxBps;
  if (pool.maxHookFeeBps < max) issues.push({ message: 'Raise the pool hook fee cap to at least the highest tax' });
  return issues;
}

export function validateGatedFeeSchedule(schedule: GatedFeeSchedule): HookStackIssue[] {
  const issues: HookStackIssue[] = [];
  if (schedule.tiers.length > GatedFee.MaxTiers) issues.push({ message: `At most ${GatedFee.MaxTiers} tiers` });
  if (schedule.maxDiscountBps > GatedFee.MaxDiscountCapBps) issues.push({ message: `Max discount must be at most ${GatedFee.MaxDiscountCapBps} bps` });
  if (schedule.impactMaxDiscountBps > schedule.maxDiscountBps) issues.push({ message: 'Impact discount must not exceed the max discount' });
  schedule.tiers.forEach((t, index) => {
    if (t.discountBps === 0n || t.discountBps > schedule.maxDiscountBps) {
      issues.push({ index, message: 'Tier discount must be above 0 and at most the max discount' });
    }
    if (t.gateMask > 255n) issues.push({ index, message: 'Gate mask must fit 8 gate slots' });
  });
  return issues;
}

// HELPERS --------------------------------------------------------------------------------------------

/** Total F6 funding the stack adds to the createPool payment */
export const hookFunding = (hooks: HookInstall[]): bigint => hooks.reduce((sum, h) => sum + (h.funding ?? 0n), 0n);

/** OR of every install's points: the pool's `hookPoints` */
export const stackPoints = (hooks: HookInstall[]): bigint => hooks.reduce((acc, h) => acc | h.points, 0n);

/**
 * Extra µALGO a swap through this pool should add to its fee budget (ARCHITECTURE §12.1 rule 1): 11 min fees
 * for a backrun hook, 2 for any other lazy-custody hook, 0 otherwise.
 */
export function swapFeeBuffer(hooks: Array<Pick<HookInstall, 'app' | 'perms' | 'flags'>>, backrunApp?: bigint): bigint {
  let inners = 0n;
  for (const h of hooks) {
    if (backrunApp !== undefined && h.app === backrunApp) inners += BACKRUN_MAX_EXTRA_INNERS;
    else if (((h.flags ?? 0n) & HookFlag.LazyCustody) !== 0n) inners += LAZY_CUSTODY_MIN_EXTRA_INNERS;
  }
  return inners * MIN_TXN_FEE;
}

/** Names of the lifecycle points set in a bitmask, in pool-lifecycle order */
export const pointNames = (points: bigint): HookPointName[] =>
  HOOK_POINT_ORDER.filter((name) => (points & HookPoint[name]) !== 0n);
