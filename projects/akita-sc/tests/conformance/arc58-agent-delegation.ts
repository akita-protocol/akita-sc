import { describe, expect, test } from 'vitest'

export const ARC58_CALLER_TYPE = {
  Other: 0n,
  Global: 1n,
  Admin: 2n,
} as const

/** The first value outside ARC-58's defined caller-type range. */
export const ARC58_INVALID_CALLER_TYPE = 3n

export type Arc58DelegationScope = { readonly kind: 'main' } | { readonly kind: 'named'; readonly name: string }

export type Arc58DelegationScopeKind = Arc58DelegationScope['kind']

/**
 * The permission-bearing dimensions of one ARC-58 plugin request.
 *
 * The adapter is responsible for translating these values into its concrete
 * wallet SDK or ADP request. `caller` is the account that submits the request,
 * not a caller address that may be chosen independently of the transaction
 * sender.
 */
export interface Arc58AgentDelegationRequest<TCaller = unknown, TPlugin = unknown, TMethod = unknown> {
  readonly caller: TCaller
  readonly callerType: bigint
  readonly plugin: TPlugin
  readonly method: TMethod
  readonly scope: Arc58DelegationScope
}

export type Arc58AgentDelegationDimension = 'caller' | 'callerType' | 'plugin' | 'method' | 'scope'

export type Arc58AgentDelegationMutationId =
  | 'caller-identity'
  | 'caller-type-global'
  | 'caller-type-admin'
  | 'caller-type-invalid'
  | 'plugin'
  | 'method'
  | 'scope-main-to-named'
  | 'scope-named-to-main'

/** Values known not to have the baseline permission in a fresh scenario. */
export interface Arc58AgentDelegationMutationValues<TCaller = unknown, TPlugin = unknown, TMethod = unknown> {
  readonly caller: TCaller
  readonly plugin: TPlugin
  readonly method: TMethod
  readonly scope: Arc58DelegationScope
}

/** One single-dimension mutation applied to an otherwise valid request. */
export interface Arc58AgentDelegationMutation<TCaller = unknown, TPlugin = unknown, TMethod = unknown> {
  readonly id: Arc58AgentDelegationMutationId
  readonly title: string
  readonly dimension: Arc58AgentDelegationDimension
  readonly baselineScope: Arc58DelegationScopeKind
  readonly apply: (
    request: Arc58AgentDelegationRequest<TCaller, TPlugin, TMethod>,
    values: Arc58AgentDelegationMutationValues<TCaller, TPlugin, TMethod>,
  ) => Arc58AgentDelegationRequest<TCaller, TPlugin, TMethod>
}

export interface Arc58AgentDelegationScenario<
  TContext = unknown,
  TCaller = unknown,
  TPlugin = unknown,
  TMethod = unknown,
> {
  /** Opaque deployment-specific state passed back to every driver operation. */
  readonly context: TContext
  /** A request whose exact permission has been installed for this scenario. */
  readonly baseline: Arc58AgentDelegationRequest<TCaller, TPlugin, TMethod>
  /** Distinct, unpermitted values used by the conformance mutation table. */
  readonly mutationValues: Arc58AgentDelegationMutationValues<TCaller, TPlugin, TMethod>
}

/**
 * A detached authority observation for every spending account in the scenario.
 * `restored` must only be true when the main account and all named accounts have
 * their expected resting auth addresses.
 */
export interface Arc58AuthorityObservation<TAuthority = unknown> {
  readonly restored: boolean
  readonly state: TAuthority
}

/**
 * Adapter contract for running this suite against Akita or another ARC-58/ADP
 * wallet implementation.
 *
 * Each call to `createScenario` must return a fresh wallet with only the exact
 * baseline permission installed. The baseline caller is a non-admin agent and
 * uses CallerType.Other. The alternate caller is also non-admin. A main-scope
 * scenario must provide an unpermitted named scope, and a named-scope scenario
 * must provide an unpermitted main scope.
 *
 * `preflight` must normalize a rejected read-only query (for example, an invalid
 * caller enum) to `false`. `snapshot` must return a detached, deterministic view
 * of all observable on-chain state that a failed call could affect, including
 * balances, permission cooldown state, allowances, execution keys, and transient
 * rekey state. Authority is checked separately and must cover both main and named
 * spending accounts.
 */
export interface Arc58AgentDelegationConformanceDriver<
  TContext = unknown,
  TCaller = unknown,
  TPlugin = unknown,
  TMethod = unknown,
  TState = unknown,
  TAuthority = unknown,
> {
  readonly name?: string
  readonly timeoutMs?: number
  readonly createScenario: (options: {
    readonly scope: Arc58DelegationScopeKind
  }) => Promise<Arc58AgentDelegationScenario<TContext, TCaller, TPlugin, TMethod>>
  readonly preflight: (
    context: TContext,
    request: Arc58AgentDelegationRequest<TCaller, TPlugin, TMethod>,
  ) => Promise<boolean>
  readonly invoke: (
    context: TContext,
    request: Arc58AgentDelegationRequest<TCaller, TPlugin, TMethod>,
  ) => Promise<unknown>
  readonly snapshot: (context: TContext) => Promise<TState>
  readonly authority: (context: TContext) => Promise<Arc58AuthorityObservation<TAuthority>>
}

const REQUEST_DIMENSIONS: readonly Arc58AgentDelegationDimension[] = [
  'caller',
  'callerType',
  'plugin',
  'method',
  'scope',
]

export function createArc58AgentDelegationMutations<TCaller, TPlugin, TMethod>(): readonly Arc58AgentDelegationMutation<
  TCaller,
  TPlugin,
  TMethod
>[] {
  return [
    {
      id: 'caller-identity',
      title: 'safe-denies a changed caller identity',
      dimension: 'caller',
      baselineScope: 'main',
      apply: (request, values) => ({ ...request, caller: values.caller }),
    },
    {
      id: 'caller-type-global',
      title: 'safe-denies changing caller type from Other to Global',
      dimension: 'callerType',
      baselineScope: 'main',
      apply: (request) => ({ ...request, callerType: ARC58_CALLER_TYPE.Global }),
    },
    {
      id: 'caller-type-admin',
      title: 'safe-denies changing caller type from Other to Admin',
      dimension: 'callerType',
      baselineScope: 'main',
      apply: (request) => ({ ...request, callerType: ARC58_CALLER_TYPE.Admin }),
    },
    {
      id: 'caller-type-invalid',
      title: 'safe-denies an invalid caller type',
      dimension: 'callerType',
      baselineScope: 'main',
      apply: (request) => ({ ...request, callerType: ARC58_INVALID_CALLER_TYPE }),
    },
    {
      id: 'plugin',
      title: 'safe-denies a changed plugin',
      dimension: 'plugin',
      baselineScope: 'main',
      apply: (request, values) => ({ ...request, plugin: values.plugin }),
    },
    {
      id: 'method',
      title: 'safe-denies a changed method',
      dimension: 'method',
      baselineScope: 'main',
      apply: (request, values) => ({ ...request, method: values.method }),
    },
    {
      id: 'scope-main-to-named',
      title: 'safe-denies changing main-account authority to a named subaccount',
      dimension: 'scope',
      baselineScope: 'main',
      apply: (request, values) => ({ ...request, scope: values.scope }),
    },
    {
      id: 'scope-named-to-main',
      title: 'safe-denies changing named-subaccount authority to the main account',
      dimension: 'scope',
      baselineScope: 'named',
      apply: (request, values) => ({ ...request, scope: values.scope }),
    },
  ]
}

function expectSingleDimensionMutation<TCaller, TPlugin, TMethod>(
  baseline: Arc58AgentDelegationRequest<TCaller, TPlugin, TMethod>,
  mutated: Arc58AgentDelegationRequest<TCaller, TPlugin, TMethod>,
  changedDimension: Arc58AgentDelegationDimension,
): void {
  for (const dimension of REQUEST_DIMENSIONS) {
    if (dimension === changedDimension) {
      expect(mutated[dimension]).not.toStrictEqual(baseline[dimension])
    } else {
      expect(mutated[dimension]).toStrictEqual(baseline[dimension])
    }
  }
}

function expectScenarioShape<TContext, TCaller, TPlugin, TMethod>(
  scenario: Arc58AgentDelegationScenario<TContext, TCaller, TPlugin, TMethod>,
  scope: Arc58DelegationScopeKind,
): void {
  expect(scenario.baseline.callerType).toBe(ARC58_CALLER_TYPE.Other)
  expect(scenario.baseline.scope.kind).toBe(scope)
  expect(scenario.mutationValues.scope.kind).not.toBe(scope)

  if (scenario.baseline.scope.kind === 'named') {
    expect(scenario.baseline.scope.name.length).toBeGreaterThan(0)
  }
  if (scenario.mutationValues.scope.kind === 'named') {
    expect(scenario.mutationValues.scope.name.length).toBeGreaterThan(0)
  }
}

/** Register the adapter-neutral ARC-58 agent delegation conformance suite. */
export function registerArc58AgentDelegationConformanceSuite<TContext, TCaller, TPlugin, TMethod, TState, TAuthority>(
  driver: Arc58AgentDelegationConformanceDriver<TContext, TCaller, TPlugin, TMethod, TState, TAuthority>,
): void {
  const timeoutMs = driver.timeoutMs ?? 120_000
  const mutations = createArc58AgentDelegationMutations<TCaller, TPlugin, TMethod>()
  const baselineCases = [
    ['main account', 'main'],
    ['named subaccount', 'named'],
  ] as const

  describe(driver.name ?? 'ARC-58 agent delegation conformance', () => {
    test.each(baselineCases)(
      'allows the exact baseline request for the %s',
      async (_label, scope) => {
        const scenario = await driver.createScenario({ scope })
        expectScenarioShape(scenario, scope)

        const authorityBefore = await driver.authority(scenario.context)
        expect(authorityBefore.restored).toBe(true)
        expect(await driver.preflight(scenario.context, scenario.baseline)).toBe(true)

        await driver.invoke(scenario.context, scenario.baseline)

        const authorityAfter = await driver.authority(scenario.context)
        expect(authorityAfter.restored).toBe(true)
        expect(authorityAfter.state).toStrictEqual(authorityBefore.state)
      },
      timeoutMs,
    )

    test.each(mutations.map((mutation) => [mutation.title, mutation] as const))(
      '%s',
      async (_title, mutation) => {
        const scenario = await driver.createScenario({ scope: mutation.baselineScope })
        expectScenarioShape(scenario, mutation.baselineScope)

        const request = mutation.apply(scenario.baseline, scenario.mutationValues)
        expectSingleDimensionMutation(scenario.baseline, request, mutation.dimension)

        const stateBefore = await driver.snapshot(scenario.context)
        const authorityBefore = await driver.authority(scenario.context)
        expect(authorityBefore.restored).toBe(true)

        expect(await driver.preflight(scenario.context, request)).toBe(false)
        expect(await driver.snapshot(scenario.context)).toStrictEqual(stateBefore)
        expect(await driver.authority(scenario.context)).toStrictEqual(authorityBefore)

        await expect(driver.invoke(scenario.context, request)).rejects.toBeDefined()

        expect(await driver.snapshot(scenario.context)).toStrictEqual(stateBefore)
        const authorityAfter = await driver.authority(scenario.context)
        expect(authorityAfter.restored).toBe(true)
        expect(authorityAfter.state).toStrictEqual(authorityBefore.state)
      },
      timeoutMs,
    )
  })
}
