# Plugin DEX adversarial audit (2026-10-31)

Scope: Akita Dexchange (Plugin DEX v2) at `a8d904ef` on `feat/plugin-dex-v2`: the Vault
(`smart_contracts/plugin-dex/contract.algo.ts`), the bins engine, the 8 hooks, LaunchManager, VenueRegistry,
TinymanV2Adapter, `AkitaRouterPlugin`, `PluginDexPlugin` and `GatedFeePassPlugin`.

Method: five independent read-only auditors, one per area. Each got the attack surface and the list of
known findings, but not the conclusions of the same-day production review
([plugin-dex-review-2026-10-31.md](plugin-dex-review-2026-10-31.md)). Each auditor tried to disprove its own
findings before reporting. Then every Low was checked again against the code. No LocalNet tests were run.
The bins model test (`bins-model.test.ts`, 9/9) was the only test run.

Result: **no Critical, High or Medium findings.** No path was found by which a hook, curve, valuator, admin
or outside caller can take LP funds, protocol fees, locked launch funds or in-flight swap amounts. There are
7 Lows (liveness, griefing, small creator- or DAO-funded amounts) and 25 Info items.

## Summary

| ID | Severity | Area | Finding | Status |
|----|----------|------|---------|--------|
| A-L1 | Low | Vault | A launch pool has no emergency exit, so a hook that depends on outside apps can stop it forever | Accepted, documented |
| A-L2 | Low | ConsensusKeyreg | The operator can burn the hook's fee tank by 2 ALGO per offline/online cycle | Accepted, documented |
| A-L3 | Low | AntiSnipe | Anyone can start the snipe-fee clock with a dust add before the creator seeds | Accepted, documented |
| A-L4 | Low | Vault | The 1,024-byte log limit makes heavy custody stacks and multi-hop routes revert | Fixed |
| A-L5 | Low | Vault | On ASA/ASA pools a custody hook can close an empty holding and take its 0.1 ALGO MBR | Fixed |
| A-L6 | Low | LaunchManager | The creator can take back the graduation bounty | Fixed |
| A-L7 | Low | Bins | A donation parked in an empty bin can be stranded, which locks that chunk's MBR | Accepted (already documented) |

## Low findings

### A-L1: a launch pool has no emergency exit

Where: `contract.algo.ts:1316` (`readLpTransfer` refuses while bonding), `:1970-1980`
(`emergencyRemoveLiquidity` needs an LP transfer), `:1822`/`:1850` (all seed LP is `lockedLp`).

A normal pool survives a broken hook: the admin pauses it and LPs leave through `emergencyRemoveLiquidity`.
A launch pool has no LP outside the lock, so that exit does not exist. Token buyers can recover quote only by
swapping. If a hook on the pool starts to revert, every swap reverts, and the quote and tokens in the pool stay
there for good. This holds after graduation too, because the LP stays locked.

Scope (checked): hooks have no update or delete handler, so the DAO cannot break a hook by upgrading it.
LaunchManager's own stack (AntiSnipe, LaunchTax) makes no outside calls, and LaunchTax pays its owner only on
`claim`. The risk is a launch pool that a creator sets up with a hook that reads outside apps, such as GatedFee.

Fix: an admin-only, paused-only `clearHooks(poolId)` for launch pools, or allow only hooks without outside
dependencies on launch pools.

### A-L2: ConsensusKeyreg can burn the fee tank

Where: `hooks/consensus-keyreg.algo.ts:111-115` (`onlineFee`), `:144-167`.

An offline keyreg clears `IncentiveEligible`. The next online keyreg then pays the 2 ALGO go-online fee from
the hook's tank. The operator can repeat poke(offline) and poke(online) and burn 2 ALGO each cycle. The custody
guard sees a net ALGO change of 0 (+2 from the tank, −2 fee). LP funds are not touched, and the operator is
appointed by the admin.

Fix: store `lastOnlineRound` per pool and require a minimum gap, or make the operator pay the go-online fee.

### A-L3: anyone can start the AntiSnipe clock

Where: `hooks/anti-snipe-fee.algo.ts:130-136`; `contract.algo.ts:1430`, `:1517`.

In `SnipeStartFirstLiquidity` mode the clock starts at the pool's first AfterAddLiquidity, with no check on the
caller. If a creator calls `createPool` and seeds in a later transaction, an attacker can add dust in between.
The snipe fee then decays before real liquidity arrives. LaunchManager pools are not affected, because
`initializeLaunch` is creator-only.

Fix: start the clock only when `ctx.caller` is the pool creator (store it at AfterInitialize). Otherwise the
SDK must create and seed in one group.

### A-L4: the log limit bounds custody-heavy stacks and routes

Where: `contract.algo.ts:815` (`CustodyEvent`), `:1251` (`SwapEvent`), `:666` (`validateHooks` caps count only).

An app call can log at most 1,024 bytes. `CustodyEvent` is 62 bytes and `SwapEvent` is 100 bytes. One swap on
a pool with 8 custody hooks at BeforeSwap and AfterSwap logs 16 × 62 + 100 = 1,092 bytes and reverts. A
`swapRoute` logs every hop in one frame, so three hops through pools with 3 such hooks each also pass the limit.
No funds are at risk, but such a pool cannot be swapped.

Fix: drop `reserveA`/`reserveB` from `CustodyEvent` (it falls to 46 bytes, and 16 × 46 + 100 = 836), or
reject such stacks at `createPool`.

### A-L5: ASA/ASA escrow MBR can be freed by a custody hook

Where: `contract.algo.ts:337-343` (`holding`), `:737-747` (custody snapshot), `:766`.

On a pool with two ASAs the guard measures A, B and slot receipts, but not ALGO. A custody hook can close a
holding with a zero balance (a receipt slot, or A/B before first liquidity). This lowers the escrow's MBR by
0.1 ALGO, and the hook pays the freed ALGO to itself. The holding is then dead. This costs at most 0.1 ALGO of
creator-funded MBR per holding and needs an admin-approved custody hook. On ALGO pools the same action counts
as a donation.

Fix: for non-ALGO pools, snapshot `escrow.minBalance` before the call and require it unchanged after.

### A-L6: the creator can take back the graduation bounty

Where: `launch/launch-manager.algo.ts:612-616`.

`LaunchManager.graduate` pays the bounty to the caller only while the pool is still bonding. If the group first
calls `Vault.graduate` directly, `bonding` reads false and the bounty goes back to the creator. A creator can
do this to keep their own bounty, and a third party can do it to deny a bounty hunter the reward. No one else's
funds move, and graduation still happens.

Fix: pay the caller whenever this call settles the launch.

### A-L7: a parked donation can be stranded in the bins engine

Where: `curves/bins/engine.algo.ts:597-610` (donation parked in an empty active bin), `:541-558` and `:654-670`
(traversal visits occupied bins only), `:233` (`closeChunk`).

A donation parked in an empty active bin does not set the bin's occupancy bit. After the active bin moves away,
swaps and Settle skip it. The amount stays in the reserves, but nothing can trade it, and `closeChunk` refuses
that chunk until an LP opens a position over the bin. The books stay consistent. A 1-unit donation is enough.

Fix: mark a parked bin as occupied with zero supply. Add already handles that case.

## Info

Vault
- I-1. A pool with LP supply 0 but nonzero reserves (a custody hook donates at AfterInitialize, or a stray
  transfer is synced before the first add) gives those reserves to the first depositor (`:1467`, `:1479`).
- I-2. Virtual offsets are not capped. A creator who sets an offset near 2^64 lets a small donation make the
  pool's swaps and `graduate` overflow (`:388`, `:1185`). Cap offsets below 2^63.
- I-3. `setAdmin` is one-step. `setProtocolFee` accepts a treasury that has not opted into pool assets, which
  makes `collectProtocolFees` revert until the treasury is fixed (`:1544`, `:1549`).
- I-4. A protocol increase of the base min balance would stop adds, removes and syncs on ALGO pools until a
  pause (`:337`, `:1131`).
- I-5. The hooked `removeLiquidity` still runs on paused pools (`:1953`). Funds stay guarded. Consider
  refusing it while paused, so the paused state means "emergency exit only".
- I-6. Receipts with `defaultFrozen = true` and no freeze address are accepted. The slot can then never
  receive units (`:1083`).
- I-7. A lazy-custody hook's first, non-custody call runs before the snapshot. Anything it sends in is an
  unbookable donation (`:874-878`).
- I-8. `receipt === lpAsset` is not rejected (`:1072-1081`). This is safe while no approved valuator prices a
  pool's own LP token.
- I-9. The quote methods are `readonly` but make inner calls. They rely on hooks and curves never writing at
  Quote.
- I-10. Docs: the same-day review says hooks are "limited to 4 per pool". The code allows 8
  (`constants.ts:72`, `MaxHooksPerPool = 8`), as ARCHITECTURE.md says.

Bins
- I-11. Settle cannot be split, so a custody hook's loss that has to cross more than `maxBinsPerSwap` bins
  reverts (`engine.algo.ts:653`). No production hook runs custody on bins pools, because BackrunArb refuses curve
  pools (`backrun-arb.algo.ts:184`). Keep this in mind before approving a custody hook for curve pools.
- I-12. `btoi` on a quotient wider than 8 bytes reverts instead of capping when a bin's reserve is above about
  2^62 (`:514`, `:516`).
- I-13. The per-bin protocol share rounds up (`:523`), while `research/bins.md` says floor. The header comment
  says up. Update the doc.
- I-14. `result()` reads the step-table box on every op, not only on a sweep, as the docs say (`:1012`).
- I-15. The `closePosition` refund fails when the owner's account is unfunded (`:222`).

Hooks
- I-16. Underfunded F6 installs: GatedFee `initSchedule` and AntiSnipe `initialize` do not check that the
  install funding covers the box MBR, so a `funding: 0` pool uses the hook's spare ALGO. VolatilityFee
  `initPool` already checks this.
- I-17. ConsensusKeyreg rekeys to the `dex` argument instead of `this.dex.value` (`:140`, `:160`, `:165`).
  This is safe today because the caller is bound to the stored ID.
- I-18. GatedFee `closePass` fails when the funder's account was closed (`gated-fee.algo.ts:351`).
- I-19. AntiSnipe quotes understate the fee at e = 0 when the quoter passes the exempt address. Swaps use the
  real sender.
- I-20. ConsensusKeyreg `getPoolKeys` panics on a missing box (readonly).
- I-21. A LaunchTax install with a sell tax but no AfterSwap point never accrues the sell tax. That ALGO
  becomes hook slack (documented).

Router, launch and plugin
- I-22. A `Global` install of `AkitaRouterPlugin` or `PluginDexPlugin` without an allowance escrow lets any
  caller route or LP the account's funds at `minAmountOut = 0`. This is how ARC-58 works, but the SDK and app
  should refuse such installs.
- I-23. The router's own inner transactions do not set `fee: 0`. An under-pooled group then shows
  `errRtOverspend`/`errRtAlgoLeak` instead of a fee error.
- I-24. LaunchManager `launch()` underflows (`:500`) if the app's 0.1 ALGO base MBR was never funded. Add
  that to the deploy script.
- I-25. `reclaimDevBuyMbr` forwards donated Rewards credits to the creator. Leg-escrow opt-ins are permanent
  (each one is paid by its requester).

## Checked and found sound

- Swap math, rounding direction, first mint (1,000 locked), later mints, removes and protocol fees all round in
  the pool's favour. Swap output is capped below liquid reserves, so virtual, external, locked and fee funds
  cannot be paid out. Graduation keeps the price continuous.
- Deposits: rekeys, close-outs and clawback senders are refused. The receiver must be that pool's escrow, and
  one deposit cannot be consumed twice.
- Custody: rekey-back is asserted before any booking. A rekey to a third party, a rekey to self or a close-out
  fails. Both-negative and pure-loss deltas are refused. The k check (native) and value floor (curves) hold,
  and a loss can only come from `reserve − external`.
- Reentrancy: the AVM refuses calls back into an app on the stack, so no component can re-enter the Vault.
- Version pinning: every hook, curve, valuator and adapter call passes `rejectVersion = pinned + 1`. No hook
  has an update or delete handler.
- Admin: pause only opens exits. Approvals affect future pools only. Write-downs only move toward the valuator.
  The admin cannot move pool funds directly or through a frozen hook stack.
- Bins: the price table, byte-math widths, fee slack carry, composition rule, share inflation, position
  ownership, box keys, MBR flow and Vault/engine reserve equality all check out.
- Hooks: every entry point checks `requireDexCaller` against the stored Vault ID. Volatility, impact,
  swap-tax, gated identity, pass accounting, launch-tax accrual and BackrunArb planning were checked.
  BackrunArb profit stays with LPs.
- Router: entry requires the spending account to be rekeyed to the router. Output is measured as a balance
  change on the spending account. Input is bounded. Adapters are sandboxed with balance, opt-in and MBR checks.
  The Tinyman pool address is derived on chain.
- LaunchManager: launched ASAs have no manager, freeze or clawback. Fee and bounty are capped by the caller's
  maximums. The dev buy is capped and vested. Settlement cannot be blocked.
- PluginDexPlugin: every path rekeys back, and pool inputs come from `Vault.getPool`, never from the caller.

## Remediation (2026-10-31, krby asked for the worthwhile fixes)

Fixed in contract code. Each fix has a test that fails on the old code (checked by building the old
contracts and running the test against them):

| ID | Change | Test |
|----|--------|------|
| A-L4 | `CustodyEvent` drops `reserveA`/`reserveB` (62 → 46 B; the reserves are in `SwapEvent`) | core-v2 "8 eager custody hooks … fit the 1,024 B log limit" (old: `program logs too large. 1100 bytes`) |
| A-L5 | `custodyCall` requires the escrow's min balance not to fall on ASA/ASA pools (errPdki) | core-v2 "a custody hook that closes an empty escrow holding … fails with errPdki" |
| A-L6 | `LaunchManager.graduate` always pays the bounty to the caller | launch-hooks "graduate after a direct Vault graduation pays the bounty to the caller" |
| I-2 | `createPool` requires each launch offset plus its asset's maximum (ASA total, or 10^16 µALGO) to fit a uint64 (errPdlb) | launch "launch config validation" |
| I-6 | `createPool` refuses receipts that are frozen by default (errPdex) | external "(OPEN-DECISIONS #6)" |
| I-17 | ConsensusKeyreg rekeys to its stored Vault ID, not the argument | existing consensus-keyreg spec |

The Vault approval program grew from 14,142 B to 14,227 B (gate 15,000 B; same 2 KB read-quota step).

Docs: ARCHITECTURE.md (custody step 6 and 7, launch offsets, receipts, LaunchManager.graduate, and the
accepted limits A-L1, A-L2, A-L3 and I-11), the same-day review (8 hooks per pool, I-10) and
`research/bins.md` (protocol share rounds up, I-13).

Accepted without a code change, with the reason:
- A-L1: hooks cannot be updated, and LaunchManager's own hooks make no outside calls. A fix needs a new
  admin power over live pools, which goes against "no one can change a live pool's rules".
- A-L2: the operator is admin-appointed and gains nothing; the admin can replace the operator and keep the
  tank small. A rate limit would change the hook's storage layout.
- A-L3: a complete fix also needs the first-swap fallback changed, which the hook cannot do without seeing
  its install points. Creating and seeding in one group avoids it, as LaunchManager does.
- A-L7: covered by the accepted empty-bin donation rule; a fix in the bins engine costs more risk than the
  griefing it prevents.
- I-16 (hook install funding): AntiSnipe holds no reserved ALGO, and a GatedFee check would need a ledger
  of reserved funds. The DAO should fund GatedFee's admin boxes in the same group as the admin call.
- The other Info items are hardening or docs for the app and SDK, with no fund impact.

Test fixes for failures that already happened at HEAD: four specs called `poke` or `collectProtocolFees` as
one transaction, which now needs more than 8 references ("No more transactions below reference limit").
Their helpers now put an `opUp` reference carrier first, as other specs do.

App check (2026-11-02): the Akita Hyperspace LocalNet redeploy runs the fixed builds. The approval
programs of the Vault (785903), LaunchManager (785954) and ConsensusKeyregHook (785941) are byte-identical
to the fixed artifacts. The app's simulator run on them passed: swaps on a hooked pool and a bins pool,
pool creation, adding and removing liquidity, a best-price swap and a two-hop route. No ABI method
changed. Only the `CustodyEvent` fields changed, and neither the app nor the backend decodes that event.
The fill-hook design note (`research/external-liquidity-hooks.md` §9) lists what these fixes require of a
fill hook.

## Recommended before MainNet (original list)

1. A-L4: shrink `CustodyEvent` or validate log bytes at `createPool`. This is a contract change to the
   immutable Vault, so do it before the deploy.
2. A-L5: require the escrow's min balance unchanged across custody on non-ALGO pools (Vault, same reason).
3. A-L1: decide between `clearHooks` for paused launch pools and a launch-pool hook allowlist (Vault).
4. A-L2, A-L3, A-L6: small hook and LaunchManager fixes. These apps are immutable too, so fix them before
   deploy or accept them in writing.
5. I-22, I-24: SDK and deploy-script guards; no contract change.

See the remediation section above for what was changed.
