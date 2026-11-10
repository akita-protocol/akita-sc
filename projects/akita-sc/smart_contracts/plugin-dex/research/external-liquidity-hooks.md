# External liquidity through fill hooks

Status: design, 2026-10-31. Decided by krby: the swapper gets the benefit, the mechanism is a hook,
Tinyman v2 and Pact first, and new venues come as new hooks with no Vault upgrade.

## 1. What it does

A **fill hook** completes part of a swap at an outside venue. At BeforeSwap it takes custody of the pool
escrow, which already holds the swapper's input. It sells part of that input at its venue, and the venue's
output lands in the escrow. The pool fills the rest of the input on its own curve. The swapper receives the
pool's output plus the venue's output.

The fill is the swapper's money in transit. It is never booked to the pool: reserves, `lpSupply` and k
are untouched by it.

## 2. Vault changes

1. **Permission `HookPermFill` (32).** Admin-approved and version-pinned like every hook. It implies
   custody. It is valid only on native constant-product pools (`createPool` refuses it on curve pools in
   v1), and only at BeforeSwap and Quote.
2. **`HookResult` gains `fillIn` and `fillOut`.** At Quote (no custody) the hook reports its plan: `fillIn`
   units of the input to the venue, for at least `fillOut` units of the output. At BeforeSwap the hook
   reports the same plan and executes it under custody. The interface is not deployed, so the change is
   free.
3. **Guard (BeforeSwap custody call of a fill hook).** The Vault measures the escrow before and after the
   call:
   - the input asset fell by exactly the reported `fillIn`, and `fillIn ≤` the input still unfilled
     (after hook fees and earlier fills);
   - the output asset rose by at least the reported `fillOut`, and `fillOut > 0` when `fillIn > 0`;
   - nothing else changed: no receipt units, no change to the escrow's minimum balance (no opt-ins or
     close-outs), and the escrow is rekeyed back to the Vault.

   A fill hook can therefore only spend the swapper's input and only add output. It can never touch the
   reserves. The measured `fillOut` (not the reported one) is credited to the swapper.
4. **Swap and quote.** After the BeforeSwap stack, the pool curve runs on `net − ΣfillIn`. The swapper
   gets `curveOut + ΣfillOut`, minus any HookFeeOut. The Vault also computes the pool-only output for the
   whole `net` and requires `curveOut + ΣfillOut ≥ poolOnly`. That makes "the swapper never gets less than
   the pool alone" a Vault guarantee, not a hook promise. The quote path does the same with the reported
   plan, so quote equals swap within a block.
5. **Optional fill fee.** A per-pool `fillFeeBps` (default 0, capped at 50 bps), taken from `ΣfillOut`
   and added to the output-side reserve as a gain for LPs. It is set at creation and frozen like the other
   fees.

## 3. How a fill hook chooses the split

Deterministically, on chain, from state the hook can read: the pool's effective reserves and fee in the
hook context, and the venue's reserves and fee. For two constant-product pools, the best split equalizes
the two marginal output prices. It has a closed form (a quadratic in `x`, solved with integer `sqrt`). The
hook rounds `x` down and keeps the fill only if the combined output beats the pool alone by at least one
unit. Otherwise it reports `fillIn = 0` and does not ask for custody (lazy custody), so a no-gain swap
costs one plain hook call.

No caller-supplied split: the quote and the swap compute the same split from the same state, and the
Vault's pool-only check bounds any hook error.

## 4. Venues

- **Tinyman v2:** reuse `venues/tinyman-v2.ts` (`tmPoolAddress`, `tmReadPool`, `tmFixedInputOut`,
  `tmSwapAs`), already used by the backrun hook.
- **Pact (constant product v201):** a new `venues/pact-v201.ts` library with the same shape (`pactReadPool`
  from global state, `pactFixedInputOut` with the fee on output, `pactSwapAs` with a deposit, the `SWAP`
  appl and a trailing `pay 0 rekeyTo`). A Pact pool is accepted only when its creator is the configured Pact
  factory and its approval-program hash matches the pinned v201 hash.
- **Registration:** each fill hook has a DAO admin that registers, per Plugin DEX pool, the venue pool to
  use (Tinyman: derived on chain from the pair; Pact: the pool app id). This mirrors BackrunArbHook.
- **New venues:** a new fill hook implements `akitaDexHook` with `HookPermFill`. The Vault needs no change,
  and the DAO approves the hook as usual.

## 5. Failure handling

- A fill hook never reverts a swap on its own. A missing, locked, paused or empty venue, or a fill with no
  gain, returns `fillIn = 0`, and the pool fills the whole swap.
- Within one group the plan is deterministic, so the execution matches the plan. If a venue still fails
  during execution, the whole swap reverts atomically. Nothing partial is booked.
- A malicious or broken fill hook cannot take funds (guard §2.3), but it can make swaps on its pools revert.
  The response is the existing pause-and-exit runbook.

## 6. Quotes, routes and the router

- `quote`, `quoteRoute` and `tryQuoteRoute` run Quote hooks, so they include fills.
- `swapRoute` runs each hop's full hook stack, so every hop can fill externally.
- AkitaRouterPlugin's native segments call the Vault, so router swaps get fills too. The router's own
  adapter segments stay available for cross-venue routes, and do not double-use liquidity a fill hook took.

## 7. Budget per swap (estimates to confirm by measurement)

| Item | Tinyman | Pact |
|---|---|---|
| Inner txns under the Vault (hook call, custody rekey, venue group) | 1 + 1 + 3 | 1 + 1 + 4 |
| Call depth (Vault → hook → venue → payout) | 4 | 4 |
| Extra references | AMM app, pool account, 2 assets | pool app, 2 assets |
| Hook opcodes (split math + quote) | about 400, op-ups from group credit | about 400 |

Under the router, depth is 5, within the AVM limit of 8.

## 8. Tests

- A better venue price: the swapper gets more than the pool alone, the split matches a model, and quote
  equals swap.
- No gain: no fill and no custody.
- A failing or malicious venue or hook: the pool alone, or a revert with nothing booked. Guard refusals for
  overspending input, taking reserves, touching another asset, changing the minimum balance, and keeping
  the escrow.
- Reserves and k unchanged by fills; the fill fee booked to LPs.
- The randomized invariant run with fill hooks installed and venue prices moving.
- LocalNet venues: the vendored Tinyman v2 fixture, and a faithful PuyaTs mock of Pact v201. The Pact
  testbed TEAL has no license, so we do not vendor it. The mock reproduces its global-state keys, swap
  arguments, deposit shape, rekey checks and fee-on-output math.

## 9. Constraints from the 2026-10-31 audit

The audit fixes (`audits/plugin-dex-audit-2026-10-31.md`) changed the custody path that a fill hook uses.
Build on them as follows.

- **Minimum balance (A-L5).** Every custody call on an ASA/ASA pool already fails if the escrow's minimum
  balance falls. The fill guard in §2.3 is stricter (no change at all), so keep it. On an ASA/ASA pool,
  the escrow's ALGO is not a pool asset, and no reserve check sees it. Add "the escrow's ALGO balance did
  not fall" to the §2.3 guard, so a fill hook cannot pay venue fees from the escrow.
- **Log budget (A-L4).** Each custody call logs one `CustodyEvent` (pool, hook, point, two signed deltas;
  no reserves). A swap through 8 custody hooks now logs 848 of the 1,024 bytes one app call allows. If
  fills get their own event, or `CustodyEvent` gains fill fields, measure the 8-hook case again. Logs from
  the venue's own app call do not count toward the Vault's limit.
- **Rekey target (I-17).** A fill hook rekeys the escrow back to the Vault app ID it stored at creation,
  never to an ID passed in a call. The Vault still asserts the rekey-back. This is defence in depth, as in
  ConsensusKeyregHook.
- **References (§7).** A fill adds venue references to a swap that may already carry several hooks.
  algokit's `populateAppCallResources` then runs out of room on the swap and fails with "No more
  transactions below reference limit". Put an op-up call first in the group to carry the extra
  references, as the `swapExplicit` helper in `core-v2.e2e.spec.ts` does.
