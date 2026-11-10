# Plugin DEX production review (2026-10-31)

Scope: Plugin DEX v2 as committed on `feat/plugin-dex-v2` (8cd26bc8): the Vault
(`smart_contracts/plugin-dex/contract.algo.ts`), the bins curve engine, the hooks, the launch manager, the
venue registry and Tinyman adapter, `AkitaRouterPlugin` and `PluginDexPlugin`.

Method: a line review of each contract, plus new randomized invariant tests that run against the real
contracts on LocalNet. A finding counts only when a test reproduces it or the code reading is unambiguous.
Each fixed finding has a test that fails on the old code.

Status: review complete. The full test suite run is recorded at the end.

## Summary

| ID | Severity | Area | Finding | Status |
|----|----------|------|---------|--------|
| M-1 | Medium | Vault | An `addLiquidity` off the pool ratio on a two-ASA hookless pool runs out of opcode budget | Fixed |
| L-1 | Low | Vault | An issuer clawback from a pool escrow blocks normal removes, adds and syncs until the admin pauses the pool | Documented (test); app warning and runbook added |
| I-1 | Info | Router, SDK | Backrun pools need the swapper to pre-pay fees for up to 11 extra inner transactions | Documented |
| I-2 | Info | SDK | Two-ASA removes and fee sweeps need more than 8 references in one call | Check in the app run |
| I-3 | Info | Vault | An approved hook that starts reverting blocks swaps on pools that use it | By design: pause plus emergency exit |
| I-4 | Info | Vault | No deadline argument on swaps | By design: the transaction's last valid round |
| I-5 | Info | Router | DIRECT custody mode is not built (flag reverts) | Recommend keeping it off; see below |

No Critical or High findings.

## Findings

### M-1 (Medium): off-ratio adds on two-ASA hookless pools revert

`addCore` refunds the unused part of a deposit from the escrow. On a hookless pool the Vault never tops up
its budget, so the whole add must fit one app call (700 opcodes). An exact-ratio add uses 671. An off-ratio
add on a pool of two ASAs adds one ASA refund (an inner asset transfer) and ends just past 700 with
"dynamic cost budget exceeded". ALGO pairs fit, because their refund is a cheaper payment.

Impact: on any two-ASA hookless pool, every add that is not in the exact pool ratio reverts, unless the
caller adds op-up budget. Wallets and the SDK do not, so users could not add liquidity. No funds at risk.

Reproduction: `invariants.e2e.spec.ts` "adds off the pool ratio on a two-ASA hookless pool succeed".
It failed with "dynamic cost budget exceeded" at the method's return.

Fix: the Vault ensures `RefundBudget` (300) from the group's fee credit before an add that refunds. An
exact-ratio add still uses no op-ups, as the existing budget test checks.

### L-1 (Low): an issuer clawback from the escrow blocks normal exits until a pause

An ASA with a clawback address (Algorand USDC has one) can be clawed out of a pool's escrow. The booked
reserves then exceed what the escrow holds. Every inline sync fails the custody invariant (`errPdki`), so
`sync`, `addLiquidity` and the normal `removeLiquidity` all revert. Swaps do not sync and keep running on
the stale book. LPs can still leave once the admin pauses the pool: `emergencyRemoveLiquidity` skips the
sync and pays the booked pro-rata. A freeze of the escrow's holding would block every transfer, including
the emergency exit, until the issuer unfreezes it.

Reproduction: `invariants.e2e.spec.ts` "an issuer clawback from the escrow blocks removes and syncs until
the admin pauses; the emergency exit then pays LPs".

Recommendation (not implemented; it changes the custody invariant):
1. Keep the strict invariant. A shortfall means value left the pool, and booking it silently would hide a
   custody bug.
2. Show a warning in the pool-creation and add-liquidity screens when an asset has a clawback or freeze
   address.
3. Add "pause the pool" to the operations runbook for a clawback event, so LPs can exit.

### I-1: backrun pools need a fee buffer

When a swap on a backrun pool triggers the arbitrage, the group needs fee credit for up to
`BackrunMaxExtraInners` (11) more inner transactions, or the swap fails. The router and the SDK must
pre-pay that on pools with BackrunArbHook. The router spec's "WP3 (13)" test covers a router swap that
runs a backrun.

### I-2: reference limits for two-ASA pools

A two-ASA `removeLiquidity` or `collectProtocolFees` needs more account, asset and app references than one
call holds when resources come from algokit's default population. The specs put an `opUp()` reference
carrier first. The Akita SDK populates access lists instead, and that is checked end to end in the app
run on LocalNet.

### I-3: hook liveness

A hook is pinned by version and cannot change its code. But an approved hook that depends on outside
state could start reverting, and then every swap on the pools that use it fails. The admin can pause such
a pool, which opens `emergencyRemoveLiquidity`. That exit runs no hooks, curves or valuators.

### I-5: router DIRECT mode

`FlagAllowDirect` is reserved and reverts (`errRtDirect`). DIRECT would let an adapter hold the wallet's
own address during a swap, saving 2 inner transactions per adapter segment. The design notes (router.md
T7) record an open escalation. While an adapter holds the wallet address, it can call the wallet as that
address and might open an admin-scoped plugin window on a named escrow. Closing that needs a wallet
contract change: reject `type == Other && Txn.sender == the wallet's own address`. Recommendation: ship
v1 SANDBOX-only and build DIRECT only after the wallet fix and its probe test (E9). The three router
`test.todo` entries (B3, E5, E9) are the DIRECT tests and stay as markers.

## Decisions on the open policy items (krby approved all recommendations, 2026-10-31)

Implemented:
- **Receipt ASAs with clawback or freeze:** `createPool` refuses them (errPdex). The external-positions
  test "(OPEN-DECISIONS #6)" now expects the Vault's refusal instead of relying on the valuator.
- **Clip ceiling:** `MaxClipBpsPerDay` is 1,000. The external-positions tests use 1,000 with tenfold
  warps, so they check the same moves.
- **Dust bins:** the SDK pool draft already defaults `minBinShares` to one whole Y token. The RN app now
  splits a bins swap that cannot fill in one call into 2-4 chunks through `AkitaRouterPlugin.swapBest`, with
  the expected output simulated as consecutive swaps.
- **Bins fee cap, A25 valuation, empty-bin donation:** kept as built and documented in ARCHITECTURE.md §13.
- **L-1 follow-ups:** the RN DEX screens warn about pool assets with clawback or freeze, and
  `plugin-dex/RUNBOOK.md` covers pausing a pool.

The original recommendations, for reference:

- **Dust bins vs maxBinsPerSwap:** require a meaningful `minBinShares` at pool creation, with the SDK
  defaulting to one whole Y token per new bin. Also have the router split large trades into slices of
  at most `maxBinsPerSwap` moves.
- **Bins 10% per-bin fee cap:** keep the cap. Document that custody and hook fees are separate, and that
  the pool's `maxFeeBps` still bounds the total a hook can set.
- **Receipt ASAs with clawback or freeze:** refuse them as external-slot receipts at `createPool`. A
  clawback on a receipt lets its issuer take LP value without the custody guard seeing a trade.
- **A25 valuation under a binding clip:** keep the conservative valuation already in `custodyCall`. Units
  leave at max(v, r') and enter at min(v, r'). Also lower `MaxClipBpsPerDay` to 1,000.
- **Donation parked in an empty bin:** accept it and document it in the LP docs. It only happens while
  one side of the book is empty.

## Areas reviewed

### Vault: native constant product (complete)

- Swap output is floor(effectiveIn · eOut / (eIn + effectiveIn)) on effective reserves. The output
  rounds down, so k never decreases. The LP fee is floor(net · feeBps / 10,000). Rounding the fee down
  gives the swapper less than one base unit per swap, which is standard. The protocol share is a floor of
  the LP fee, and it leaves the reserves.
- Output is bounded by the real liquid reserve (`out < reserveOut − external`), so virtual and external
  value is never paid out.
- Slippage: `minAmountOut` is checked on the final output of `swap` and `swapRoute`. There is no deadline
  argument; the transaction's last valid round is the deadline.
- Deposits (`readDeposit`): rekeys, close-outs and clawback transfers are refused. Each ABI transaction
  argument is consumed by one call.
- Add: the first deposit mints sqrt(a·b) − 1,000 and locks 1,000 forever, so the first depositor cannot
  inflate the share price cheaply. Later adds mint on the scarcer side, round down, and refund the other
  side rounded up in the pool's favour. A surplus (donation) is synced into reserves before minting, so a
  donation cannot be captured by a just-in-time LP. `minted > 0` and `minLpOut` are enforced.
- Remove: pro-rata of the liquid reserves, rounded down. Native pools sync and revalue first.
  `minAmountA`/`minAmountB` are enforced.
- Launch pools: `initializeLaunch` is creator-only and runs once. `graduate` keeps the spot price
  continuous and locks the starting LP forever. No LP operations run while bonding.
- Admin powers: set the admin, the protocol fee (capped at 50% of the LP fee) and the treasury; approve or
  revoke hooks, curves and valuators for future pools only; pause a pool; write down an external slot of a
  paused pool. No admin path moves pool funds. Pausing opens `emergencyRemoveLiquidity`, which skips hooks,
  sync, valuators and curves. The Vault has no update or delete method, so it is immutable.
- Randomized test: 300 seeded swaps, adds, removes, donations and syncs over three LPs (with a protocol fee)
  check after every step that the escrow covers reserves plus protocol fees, LP supply equals what is held
  plus the locked minimum, and one LP share never loses value. They also check that quotes equal swaps,
  that swaps match the exact model, that every LP can leave at the end, and that protocol fees sweep
  exactly. All hold.

### Vault: hook stacks and custody (complete)

- Hooks are admin-approved with a permission ceiling, pinned to their version (`rejectVersion`), and
  limited to 8 per pool and one HookFeeOut hook. A hook that can change what a swap pays must also answer
  quotes.
- A fee set by a hook is capped at the pool's `maxFeeBps`. Hook fees are capped at `maxHookFeeBps` of the
  input (at most 10%), and only at BeforeSwap or Quote.
- Custody: the escrow is flash-rekeyed to the hook and must be rekeyed back (`errPdmr`). Balance changes
  are measured, not trusted. A pure loss is refused. A mixed change must keep the fee-adjusted k (native)
  or the value floor at the pre-call price (curves), and a loss may only come out of liquid LP funds.
  Closing the escrow fails the rekey-back check. Opting the escrow into assets shows up as an ALGO loss.
- Externals: receipt balance changes are allowed only for the slot's own hook, valued conservatively and
  capped per slot.

### Bins engine (complete)

- Swap: fees round up on the swap's aggregate, each bin's output is capped at its reserve, and the
  protocol share rounds up. Quote and Swap share one loop.
- Add: a first add into a bin sizes shares from its value and requires `minBinShares`. A co-add takes the
  smaller share count, rounds down, and charges amounts rounded up. The composition rule is enforced.
- Remove: owner-only, rounds down, and sweeps a dust remainder instead of leaving it.
- Existing coverage: a 500-step randomized test through the Vault against an exact model, with byte-level
  state comparison, plus price-table, rounding and range tests. No findings.

### Hooks (complete)

- ConsensusKeyregHook: only the pool's operator can switch the escrow online or offline. The go-online
  fee is pre-donated, so the pool's ALGO is unchanged. Every path rekeys back.
- BackrunArbHook: the plan step never reverts. Execution is bounded by the Vault's custody guard, so a
  manipulated Tinyman price cannot make LPs lose. The surplus stays with LPs (no tip). See I-1 for fees.
- Fee hooks (impact, volatility, gated, anti-snipe, launch tax, swap tax): the Vault caps what each can
  set or take. Their liveness depends on staying approved and non-reverting (I-3).
- LaunchManager: launched tokens have no manager, freeze or clawback. Fee and bounty are capped by the
  caller's `maxLaunchFee`/`maxBounty`. The dev buy is capped at 10% of the curve supply and vested in
  Rewards. Settlement cannot be blocked, and the starting LP stays locked.

### Router and wrapper (complete)

- AkitaRouterPlugin: entry requires the wallet's spending account to be rekeyed to the router and not to
  be the leg escrow. Output only goes to the spending account. `minAmountOut` is checked on the total
  output. Input spend is bounded by the stated amount. ASA-to-ASA routes cannot cost ALGO. Adapters run
  sandboxed on the leg escrow with balance, opt-in and minimum-balance checks. The handback rekeys the
  account checked at entry, not a re-read.
- PluginDexPlugin: no material finding (readiness pass of 2026-10-30): spoofed wallets fail, every path
  rekeys back, grants do not change, and pool inputs come from the Vault.

## Deployment readiness

Order (scripts/deploy-immutable.ts prints it): PluginDex, BinEngine, the 8 hooks, VenueRegistry,
TinymanV2Adapter, AkitaRouterPlugin, LaunchManager, GatedFeePassPlugin. Each step records a receipt. Then
`scripts/activate-plugin-dex.ts --receipts <dir> --policy <json>` makes the curve and hook approvals,
`setAdapter`, `AkitaRouterPlugin.init` and the LaunchManager setup, and hands every admin to the DAO
wallet. Once the DAO wallet is admin, the remaining calls are printed for a DAO proposal.

- PluginDexPlugin is deployed separately with the plugin scripts.
- The SDK network maps need the new IDs: `pluginDex`, `akitaRouterPlugin`, `pluginDexPlugin`.
- LaunchManager's dev buy needs the DAO on Rewards v2 (`aal.rewards`).
- The Vault approval program is 14,110 B. Creating it uses the large-program rule (write budget from
  empty box references and a higher fee). MainNet runs the same protocol version as LocalNet, where it
  deploys today. TestNet is on the newer version MainNet is scheduled to adopt.
- TestNet dry run (`deploy-immutable --contract PluginDex -n testnet --dry-run`): plans the create with
  no writes.
- Not yet tracked in git: `scripts/deploy-immutable.ts`, `scripts/lib/immutable-deployment.ts` and the
  SDK's `plugin-dex` module.
