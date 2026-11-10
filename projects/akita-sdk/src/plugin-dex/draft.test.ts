import { describe, expect, it } from 'vitest';
import { AntiSnipe, HookPoint } from './constants';
import { availableHooks, buildPoolDraft, lifecycleSlots, permissionLabels, validateDeclaredHookFees, type PoolDraft } from './draft';

const appIds = { binEngine: 50n, antiSnipeFeeHook: 10n, launchTaxHook: 11n, impactFeeHook: 12n };
const owner = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ';

const launchDraft = (overrides: Partial<PoolDraft> = {}): PoolDraft => ({
  assetA: 5n,
  assetB: 0n,
  curve: 'constantProduct',
  feeBps: 30n,
  hooks: [
    {
      kind: 'antiSnipeFee',
      init: { startFeeBps: 5_000n, endFeeBps: 30n, decayMode: AntiSnipe.DecayLinear, decayRounds: 100n, startMode: AntiSnipe.StartCreation },
    },
    { kind: 'launchTax', init: { owner, quoteAsset: 0n, buyTaxBps: 100n, sellTaxBps: 200n, untilRound: 0n } },
  ],
  ...overrides,
});

describe('buildPoolDraft', () => {
  it('builds a valid launch pool and sizes the hook fee cap from the tax', () => {
    const built = buildPoolDraft(launchDraft({ maxFeeBps: 9_000n }), appIds);
    expect(built.issues).toEqual([]);
    expect(built.config.maxHookFeeBps).toBe(200n);
    expect(built.hooks.map((h) => h.app)).toEqual([10n, 11n]);
    expect(built.hooks[1].points & HookPoint.AfterSwap).toBe(HookPoint.AfterSwap);
  });

  it('reports hooks that are not deployed and DAO approvals that are missing', () => {
    const built = buildPoolDraft(launchDraft({ hooks: [{ kind: 'swapTax' }, { kind: 'impactFee' }] }), appIds, new Map());
    expect(built.issues.some((i) => i.index === 0 && /not deployed/.test(i.message))).toBe(true);
    expect(built.issues.some((i) => /not approved/.test(i.message))).toBe(true);
  });

  // Readiness audit 2026-11-09, C15: the Vault refuses a pool where a declared launch tax shares the
  // hook fee cap with a fee-charging hook that does not declare.
  it('AUD-C15 flags a fee-charging hook beside a launch tax, and leaves either one alone', () => {
    const ids = { ...appIds, swapTaxHook: 13n };
    const together = buildPoolDraft(launchDraft({ maxFeeBps: 9_000n, hooks: [...launchDraft().hooks, { kind: 'swapTax' }] }), ids);
    expect(together.issues.filter((i) => /cannot share a pool with a launch tax/.test(i.message))).toEqual([
      { index: 2, message: 'Swap tax cannot share a pool with a launch tax: both charge a hook fee against the same cap' },
    ]);
    // the order does not matter
    const first = buildPoolDraft(launchDraft({ maxFeeBps: 9_000n, hooks: [{ kind: 'swapTax' }, ...launchDraft().hooks] }), ids);
    expect(first.issues.filter((i) => /launch tax/.test(i.message)).map((i) => i.index)).toEqual([0]);

    // hooks that set the LP fee (anti-snipe, impact fee) are not hook fees and stay allowed beside the tax
    expect(buildPoolDraft(launchDraft({ maxFeeBps: 9_000n, hooks: [...launchDraft().hooks, { kind: 'impactFee' }] }), ids).issues).toEqual([]);
    // the swap tax without a launch tax is fine
    expect(buildPoolDraft(launchDraft({ hooks: [{ kind: 'swapTax' }] }), ids).issues.some((i) => /launch tax/.test(i.message))).toBe(false);

    expect(validateDeclaredHookFees(launchDraft().hooks)).toEqual([]);
    expect(validateDeclaredHookFees([{ kind: 'swapTax' }, launchDraft().hooks[1]]).map((i) => i.index)).toEqual([0]);
    // a launch tax of zero declares nothing
    expect(validateDeclaredHookFees([{ kind: 'swapTax' }, { kind: 'launchTax', init: { owner, quoteAsset: 0n, buyTaxBps: 0n, sellTaxBps: 0n, untilRound: 0n } }])).toEqual([]);
  });

  it('carries hook-specific validation with the hook index', () => {
    const draft = launchDraft();
    const built = buildPoolDraft(draft, appIds);
    // anti-snipe start fee 5000 is above the default 1000 bps fee cap
    expect(built.issues.some((i) => i.index === 0)).toBe(true);
  });

  it('encodes a bins pool against the engine and inverts a flipped price', () => {
    const forward = buildPoolDraft(
      { assetA: 1n, assetB: 2n, curve: 'bins', feeBps: 25n, hooks: [], bins: { binStep: 25n, price: 4, decimalsB: 6 } },
      appIds,
    );
    const flipped = buildPoolDraft(
      { assetA: 2n, assetB: 1n, curve: 'bins', feeBps: 25n, hooks: [], bins: { binStep: 25n, price: 0.25, decimalsB: 6 } },
      appIds,
    );
    expect(forward.issues).toEqual([]);
    expect(forward.config.curve).toBe(50n);
    expect(flipped.config.curveArgs).toEqual(forward.config.curveArgs);
  });

  it('turns bad init data into an issue instead of throwing', () => {
    const built = buildPoolDraft(
      launchDraft({ hooks: [{ kind: 'launchTax', init: { owner: 'nope', quoteAsset: 0n, buyTaxBps: 1n, sellTaxBps: 0n, untilRound: 0n } }] }),
      appIds,
    );
    expect(built.issues.some((i) => i.index === 0)).toBe(true);
  });

  it('lists follow-up steps for hooks that need them', () => {
    const built = buildPoolDraft(launchDraft({ hooks: [{ kind: 'volatilityFee' }] }), { volatilityFeeHook: 9n });
    expect(built.afterCreate).toEqual([{ kind: 'volatilityFee', step: 'volatilityInitPool' }]);
  });
});

describe('lifecycle helpers', () => {
  it('lays hooks out by point in lifecycle order', () => {
    const slots = lifecycleSlots([{ points: HookPoint.BeforeSwap | HookPoint.Quote }, { points: HookPoint.AfterInitialize | HookPoint.BeforeSwap }]);
    expect(slots[0]).toEqual({ point: 'AfterInitialize', hooks: [1] });
    expect(slots.find((s) => s.point === 'BeforeSwap')?.hooks).toEqual([0, 1]);
  });

  it('names permissions and filters the catalogue by deployment', () => {
    expect(permissionLabels(3n)).toEqual(['Holds pool funds', 'Sets the swap fee']);
    expect(availableHooks(appIds).map((h) => h.kind).sort()).toEqual(['antiSnipeFee', 'impactFee', 'launchTax']);
  });
});
