# PayoutConverter: design spec

- **Status:** design draft, no contract code. Written 2026-10-11 for Kyle's review. **Revised 2026-11-10:** AkitaRouterPlugin, its venue adapters and its leg escrow were removed, and Akita swaps everything through Haystack. Conversions now swap through Haystack via `HaystackRouterPlugin` (D2, section 3.4). Parts of the original single-call design do not survive that change; each one is marked **Open (Haystack)** and collected in section 11, items 10 and 12-20. Nothing marked open has a decided answer yet.
- **Scope:** one new immutable ARC-58 plugin (`PayoutConverterPlugin`), its grant shape, and the backend keeper job that calls it.
- **Reads:** paths are relative to `projects/akita-sc/smart_contracts/` unless they start with `projects/`, `docs/` or `akita-backend/`. Every `file:line` was read on 2026-10-11. Several of those files have uncommitted edits by other agents, so line numbers can drift.

## 0. Decisions at a glance

| # | Decision | Why (short) | Section |
|---|----------|-------------|---------|
| D1 | One plugin call claims each batch and one plugin call settles it; the Haystack swap runs between them in its own wallet window (section 3.2). One batch = one claimed asset. **Open (Haystack):** the original single `claimAndConvert` call cannot hold a Haystack swap, and how the claim and settle calls bind to each other is not decided (11.12, 11.13). | A per-asset batch makes the balance delta attributable to one asset. | 3 |
| D2 | The swap goes through **Haystack via `HaystackRouterPlugin` (HRP)**. The keeper quotes on Haystack's API (fixed input = the claimed delta), HRP funds Haystack's per-swap temp account from `S` with exactly that amount, Haystack's route pays the output to `S`, the keeper pays every fee, and `minOut` comes from the quote less the slippage. HRP is called in its **own** wallet window, top level, right before Haystack's route. | AkitaRouterPlugin is gone and Akita uses Haystack for all swaps. HRP reads Haystack's route from the outer group (`arc58/plugins/haystack-router/contract.algo.ts:66-108`), so it cannot run as an inner call of this plugin. | 3.4 |
| D3 | The price guard compares the measured fill with a **reference price from the canonical Tinyman v2 ALGO pools** (X/ALGO and ALGO/P), read at execution time. It does not read the pools of the chosen route. | A guard on the chosen route's own spot price passes a route through a skewed pool that the attacker created. Tinyman has exactly one pool per pair (`plugin-dex/hooks/shared/tinyman-v2.ts:56-74`), so the reference cannot be chosen by the caller. | 4 |
| D4 | Group isolation: the plugin rejects any top-level transaction in the group that is not an app call to the wallet or to the plugin. **Open (Haystack):** a Haystack swap puts the keeper's funding payment, Haystack's temp-account transactions and Haystack's route at top level, so this rule as written rejects every conversion. Which transactions to admit, and whether a sandwich can hide inside Haystack's route, is not decided (11.14). | It stops a same-group sandwich around the conversion. The spot guard cannot stop that by itself. | 3.3, 4.6 |
| D5 | v1 refuses global-caller grants. Opening to any caller needs a v2 with a TWAP reference. | A spot reference does not stop a cross-group sandwich. Opening needs a per-wallet re-grant anyway, which is the same user action as moving to v2. | 4.8, 11 |
| D6 | Settings live in a box on the plugin, keyed by wallet app id. Only `setSettings` writes it, and only inside the wallet's **admin-caller** window. | "Writable only by the wallet itself." The keeper grant can never write it, even if its method list is wrong. | 2.2, 5 |
| D7 | The plugin opts `S` in to a claimed asset only when needed, and closes out only the assets that **this conversion** opted in (in the settle call). The wallet pays the 0.1 ALGO opt-in MBR, and gets it back in the same group. | The wallet's opt-in set stays as the user left it. | 3.6 |
| D8 | The fill must use the whole claimed delta. Partial fills revert. Haystack quotes are fixed-input and HRP funds exactly the quoted amount. | "Swap exactly that delta." It keeps close-out simple and the balance sheet exact. | 3.5 |
| D9 | The keeper pays all fees: the pooled fees of the wallet windows, and the payment that funds Haystack's temp account (its MBR, opt-in and the route's fees). The grant does not use `coverFees`. | The wallet never pays for a call it did not sign. | 3.7, 5 |
| D10 | Immutable, adminless, AVM 13, no update method. | The wallet accepts only plugins with `Application.version == 0` (`arc58/account/contract.algo.ts:552-553`). | 2.1 |

## 1. Goal and non-goals

### Goal

1. A wallet owner opts in once. After that, the keeper claims the owner's Rewards v2 (and v1) payouts every day and converts each claimed asset into the owner's preferred asset.
2. The plugin can move only what the call just claimed. It cannot touch any other holding of the wallet.
3. The plugin refuses a fill worse than the owner's slippage limit, whatever `minOut` the caller passes.
4. The direct path stays. An opted-in owner can still claim raw assets with `RewardsPlugin.claimRewards` (`arc58/plugins/rewards/contract.algo.ts:265-278`).

### Non-goals

- No change to Rewards, RewardsPlugin, HaystackRouterPlugin or the wallet contract.
- No on-chain choice of which disbursements qualify. Rewards does not enable foreign box reads, so the plugin cannot read a disbursement's creator or expiration (`rewards/contract.algo.ts:80-86` are local BoxMaps; foreign reads need `AppParamsSet.appForeignBoxReads`, see `meta/contract.algo.ts:188-192`). Qualification is keeper policy.
- No conversion fee and no keeper reward in v1.
- No open (global) caller in v1 (D5).
- No on-chain route choice. The keeper quotes Haystack off-chain and Haystack builds the route.

## 2. Data shapes

### 2.1 Contract and global state

`@contract({ avmVersion: 13 })`, `extends Contract` (not `AkitaBaseContract`, which is upgradeable). Precedent: PluginDexPlugin (`arc58/plugins/plugin-dex/contract.algo.ts`).

| Key | Type | Set | Meaning |
|-----|------|-----|---------|
| `version` | string | create | semantic version string |
| `akita_dao` | uint64 | create | DAO app. Source of `aal.rewards` and `aal.wallet` at call time (`utils/functions.ts:111-114`, `arc58/dao/types.ts:234-247`) |
| `haystack_plugin` | uint64 | create | HaystackRouterPlugin app id. **Open (Haystack):** HRP is not adminless-immutable in the same sense (it pins Haystack's router app, method and referrer at create), so a Haystack router upgrade means a new HRP and a new plugin version (11.17) |
| `tinyman` | uint64 | create | Tinyman v2 AMM app id (the reference oracle) |
| `legacy_rewards` | uint64 | create | Rewards v1 app id, 0 = none. Same pattern as `RewardsPlugin.legacyRewards` (`arc58/plugins/rewards/contract.algo.ts:20-27`) |
| `min_ref_algo` | uint64 | create | minimum ALGO reserve (µALGO) of each reference pool |

The DAO is trusted to name the current Rewards app, as for every Akita service (`docs/rollout/MAINNET-ROLLOUT.md:257`). The HRP and Tinyman ids are pinned: a new HRP needs a new plugin version.

### 2.2 Settings box

```ts
export type PayoutSettings = {
  /** asset the wallet receives; 0 = ALGO */
  preferredAsset: uint64
  /** max total cost vs the reference mid price, fees and impact included; 1..MaxSlippageBps */
  maxSlippageBps: uint64
  /** min reference value (preferredAsset base units) of what one call converts; 0 = none */
  minBatchValue: uint64
  /** NoRouteLeaveUnclaimed (0) | NoRouteClaimAsIs (1) */
  noRouteMode: uint64
}
settings = BoxMap<uint64 /* wallet app id */, PayoutSettings>({ keyPrefix: 's' })
```

- Key: `'s' ‖ itob(walletId)`, 9 bytes. Value: static tuple, 32 bytes.
- MBR: 2,500 + 400 × (9 + 32) = **18,900 µALGO**. `S` pays it to the plugin on the first write. `clearSettings` refunds it to `S`.
- Box exists = the wallet is opted in. There is no separate "enabled" flag.

### 2.3 Call types

The batch no longer carries route legs: Haystack builds the route off-chain, and the plugin only needs to know whether the batch swaps.

```ts
export type ConvertBatch = {
  /** the asset every claim in this batch pays; distinct across batches */
  asset: uint64
  /** disbursement ids on the current Rewards app (aal.rewards) */
  claims: uint64[]
  /** disbursement ids on legacy_rewards (v1) */
  legacyClaims: uint64[]
  /** the caller's own floor; the guard floor applies independently (section 4) */
  minAmountOut: uint64
  /** swap this batch through Haystack (false = claim as-is, `noRouteMode` permitting) */
  swap: boolean
}
```

The plugin builds each `ClaimDetails { id, asset }` (`rewards/types.ts:55-60`) from `claims[i]` and `batch.asset`. A caller cannot name a different asset for a claim.

### 2.4 Methods (ARC-4)

`Application` arguments encode as `uint64`. The wallet checks that `appArgs(1)` is its own id with `btoi` (`arc58/account/contract.algo.ts:555-558`).

| Method | ARC-4 signature | Who calls |
|--------|-----------------|-----------|
| `create(version, akitaDAO, haystackPlugin, tinyman, legacyRewards, minRefAlgo)` | `create(string,uint64,uint64,uint64,uint64,uint64)void`, `onCreate: 'require'` | deployer |
| `setSettings(wallet, rekeyBack, settings)` | `setSettings(uint64,bool,(uint64,uint64,uint64,uint64))void` | wallet admin, inside an admin-caller window |
| `clearSettings(wallet, rekeyBack)` | `clearSettings(uint64,bool)void` | wallet admin, inside an admin-caller window |
| `claimAndConvert(wallet, rekeyBack, batches)` | **Open (Haystack):** no longer one method. A claim call (opt-in, snapshot, claim, measure) and a settle call (measure the output, guard, close out, reconcile) around the HRP window; names and signatures not decided (11.12) | keeper, inside keeper-caller windows |
| `opUp()` | `opUp()void` | keeper; opcode-budget and reference carrier, placed **after** `arc58_verifyAuthAddress` |
| `getSettings(wallet)` | `getSettings(uint64)(uint64,uint64,uint64,uint64)`, readonly | keeper, UI |
| `referenceOut(assetIn, amountIn, assetOut)` | `referenceOut(uint64,uint64,uint64)uint64`, readonly | keeper, UI. Returns the section 4 reference value, 0 = unpriceable |

The settle call returns the total amount of `preferredAsset` that `S` received (swap outputs plus claims of the preferred asset itself).

### 2.5 Events (ARC-28)

```ts
export type ConvertEvent = {
  wallet: uint64
  account: Account      // S
  assetIn: uint64       // batch.asset
  claimed: uint64       // measured claim delta
  converted: uint64     // amount swapped (0 or claimed)
  assetOut: uint64      // preferredAsset
  amountOut: uint64     // measured output to S (claimed, when assetIn == assetOut)
  referenceOut: uint64  // reference value of `converted`
  closedOut: boolean
}

export type SettingsEvent = {
  wallet: uint64
  preferredAsset: uint64
  maxSlippageBps: uint64
  minBatchValue: uint64
  noRouteMode: uint64
  cleared: boolean
}
```

One `ConvertEvent` per batch, emitted by the settle call. HRP emits no event of its own; Haystack's route logs belong to Haystack. Indexers attribute conversions by `ConvertEvent.wallet`.

### 2.6 Error codes

Convention: ARC-65 `loggedAssert` payloads of 7 characters with an `err` prefix (`rewards/errors.ts:1-10`, `utils/errors.ts:1-14`). Domain prefix `Pc`, same shape as HRP's `errIh..` (`arc58/plugins/haystack-router/errors.ts`). Add the human-readable map to `projects/akita-sdk/src` in the same change. Reuse shared codes where they exist.

| Constant | Value | Meaning |
|----------|-------|---------|
| `errPluginNotAuthAddr` (shared) | `errNath` | `S` is not rekeyed to this plugin (`utils/errors.ts:30`) |
| `errInvalidWallet` (shared) | `errIwlt` | wallet is not a genuine Akita wallet |
| `errPcAdmin` | `errPcad` | settings write outside an admin-caller window, or with an escrow |
| `errPcGlobal` | `errPcgl` | window opened through a global-caller grant (D5) |
| `errPcGroup` | `errPcgr` | not top level, or a foreign transaction in the group (D4) |
| `errPcSettings` | `errPcst` | invalid settings field |
| `errPcNoSettings` | `errPcns` | the wallet has no settings box |
| `errPcBatch` | `errPcbt` | malformed batch: limits, duplicate asset, empty claims, a swap on a preferred-asset batch |
| `errPcNothing` | `errPcnc` | a batch claimed nothing (delta 0) |
| `errPcNoRoute` | `errPcnr` | `swap == false` while `noRouteMode == NoRouteLeaveUnclaimed` |
| `errPcPreferred` | `errPcpf` | `S` is not opted in to the preferred asset |
| `errPcRef` | `errPcrf` | no valid reference price (pool missing, locked, empty or below `min_ref_algo`) |
| `errPcPrice` | `errPcpx` | fill below the guard floor, or floor is 0 |
| `errPcMinBatch` | `errPcmb` | converted reference value below `minBatchValue` |
| `errPcBalance` | `errPcbl` | the `S` balance sheet does not reconcile (section 3.5) |
| `errPcSettle` | `errPcse` | **Open (Haystack):** a settle call with no matching claim (or a claim with no settle) in the group; exact binding rule not decided (11.12) |

### 2.7 Constants

| Name | Value | Basis |
|------|-------|-------|
| `MaxBatches` | 6 | resource budget, section 3.8. **Open (Haystack):** one HRP swap fills a group (section 3.8), so the per-group batch count with a swap may be 1 (11.13) |
| `MaxClaimsPerCall` | 16 | `claims` + `legacyClaims` over all batches, section 3.8 |
| `MaxSlippageBps` | 1,000 | hard cap of 10%. A Haystack route pays its venues' fees plus Haystack's own fee (the `fee bps` in the route terms, `arc58/plugins/haystack-router/contract.algo.ts:36-40`); routes above the cap are refused by design |
| `NoRouteLeaveUnclaimed` / `NoRouteClaimAsIs` | 0 / 1 | settings enum |
| `BpsDivisor` | 10,000 | |

## 3. Claim, swap, settle

### 3.1 How an ARC-58 plugin call works here

1. The keeper calls `W.arc58_rekeyToPlugin(PC, ...)`. The wallet checks the grant, sets `spending_address` and `current_plugin`, and rekeys `S` to the plugin (`arc58/account/contract.algo.ts:1052-1119`). With an empty escrow, `S` is the wallet's controlled address (`:1067-1075`).
2. Every app call after it, up to `arc58_verifyAuthAddress`, must target the plugin, must be NoOp, and must carry `W` as `appArgs(1)`. The wallet checks the method restriction and cooldown for each one (`:536-572`).
3. `arc58_verifyAuthAddress` requires `S` to be rekeyed back to the wallet, then clears the window (`:992-997`).
4. Plugin rules: first argument `wallet`, second `rekeyBack`, and the last inner transaction rekeys `S` back when `rekeyBack` is true (`projects/akita-plugin/base.algo.ts:8-23`).

A grant with a cooldown allows **one** plugin call per window: the second call sees `lastCalled == now` and fails the cooldown check (`arc58/account/contract.algo.ts:460-470`, `:560-570`). So carriers that call `PC.opUp` go **after** `arc58_verifyAuthAddress`, the same placement the wallet's method restriction forces on every plugin.

### 3.2 Group layout

The Haystack swap needs its own HRP window followed by Haystack's route at top level, so one conversion spans three wallet windows. This is the shape HRP forces; **whether all three fit one group is open (11.13)**:

```
[a]  W.arc58_rekeyToPlugin(PC, ...)      PC.claim(W, rekeyBack=true, batch)      W.arc58_verifyAuthAddress()
       opt-in X if needed, snapshot S and the reference reserves, claim, measure delta

[b]  W.arc58_rekeyToPlugin(HRP, ...)     HRP.swap(W, rekeyBack=true, X, delta, P, minOut)   W.arc58_verifyAuthAddress()
     keeper: pay keeper→temp (temp's MBR, opt-in, and every route fee)
     temp:   axfer temp→temp 0 X (opt-in, when X != ALGO)
     Haystack route (up to 9 txns): temp's input to Haystack's router app, venue calls, finalize(beneficiary = S, referrer)
       HRP funds temp with exactly `delta` of X from S and rekeys S back to W (`arc58/plugins/haystack-router/contract.algo.ts:149-213`)

[c]  W.arc58_rekeyToPlugin(PC, ...)      PC.settle(W, rekeyBack=true)            W.arc58_verifyAuthAddress()
       measure P received, price guard, close out X if [a] opted in, reconcile, ConvertEvent
```

`[3..15] PC.opUp()` carriers, placed after a window's `arc58_verifyAuthAddress`, still carry references and opcode budget for `[a]` and `[c]`.

### 3.3 Steps

Entry checks (all before any inner transaction):

1. `Global.callerApplicationId == 0` (top level), else `errPcGroup`. The group scan below needs the outer group. (Applies to both the claim and the settle call.)
2. `F = getAkitaAppList(akitaDAO).wallet`. `isGenuineWallet(wallet.id, F)` (`utils/principal.ts:101-107`), else `errInvalidWallet`. Rule 4 of the principal standard: the factory comes from the DAO, never from `W` (`docs/principal-resolution/STANDARD.md:315-326`).
3. `S = getControlledSpendingAccount(wallet)` (`utils/functions.ts:398-401`): `S` must be rekeyed to the plugin, else `errNath`. Keep this `S` for the whole call. Do not read it again for the hand-back.
4. Decode `W.current_plugin` as `PluginKey { plugin, caller, escrow }` (`utils/functions.ts:404-414`, `arc58/account/types.ts:71-78`). Require `plugin == this app` and `escrow == ""` (else `errPcAdmin`), and `caller != zeroAddress` (else `errPcGlobal`).
5. Group isolation: for every `i` in `0 .. Global.groupSize - 1`, require `gtxn[i]` to be an app call with `appId ∈ { W, this app }`, else `errPcGroup`. **Open (Haystack):** the group now also holds the HRP window, the keeper's temp funding, temp's opt-in and Haystack's route (11.14).
6. Load settings for `wallet.id`, else `errPcNoSettings`. Let `P = settings.preferredAsset`. If `P != 0`, require `S` opted in to `P`, else `errPcPreferred`.
7. Validate shape: `1 ≤ batches.length ≤ MaxBatches`; assets distinct; each batch has `claims.length + legacyClaims.length ≥ 1`; total claims `≤ MaxClaimsPerCall`; `legacyClaims` non-empty only when `legacy_rewards != 0`; `asset == P` implies `swap == false`. Any failure: `errPcBatch`.
8. Snapshot. Record `S`'s raw balances of every batch asset, of `P`, and of ALGO (`balance`, not spendable). For each batch with `swap`, read and store the reference reserves (section 4.2). A missing reference fails with `errPcRef` here, before anything moves. **Open (Haystack):** the snapshot must survive from the claim call to the settle call (scratch space does not cross app calls of different windows; a box or global does), 11.12.

Per batch, in the order given:

9. **Opt in.** `wasOptedIn = (X == 0) || S.isOptedIn(X)`. If not, submit `axfer S→S 0 X`, fee 0. Same as PluginDexPlugin's `ensureOptIn` (`arc58/plugins/plugin-dex/contract.algo.ts`).
10. **Claim.** `before = raw(S, X)`. If `claims` is non-empty, `abiCall Rewards.claimRewards(ClaimDetails[])` with `sender: S`, `appId: aal.rewards` (same as `arc58/plugins/rewards/contract.algo.ts:265-278`). Then the same against `legacy_rewards` (same as `:297-311`). Rewards keys each allocation by `Txn.sender` and pays `Txn.sender` (`rewards/contract.algo.ts:568-572`, `:583-600`), so only `S`'s own allocations can pay out.
11. **Measure.** `delta = raw(S, X) - before`. Require `delta > 0`, else `errPcNothing`. All inner fees from `S` are 0, so for ALGO the raw delta is exactly the claimed amount.
12. **Branch.**
    - `X == P`: no swap. Add `delta` to the output total.
    - `swap == false`: require `noRouteMode == NoRouteClaimAsIs`, else `errPcNoRoute`. Keep `X` in `S`.
    - otherwise: compute `ref = referenceOut(X → P, delta)` from the step 8 snapshot and `floor` (section 4.3). Require `floor > 0`, else `errPcPrice`. The swap of exactly `delta` happens in window `[b]` (step 13).
13. **Swap through Haystack (D2, section 3.4).** Not a step of this plugin any more: window `[b]` runs `HRP.swap(W, true, X, delta, P, minOut)` with `minOut = max(floor, batch.minAmountOut, the quote less slippage)`, and Haystack's route. In the settle call: `out = raw(S, P) - rawBefore(S, P)`; require `out ≥ floor`, else `errPcPrice`. **Open (Haystack):** whether the settle call checks that `[b]` swapped exactly `delta` of `X` (and nothing else), or relies on the balance sheet alone (11.15).
14. **Close out.** If `!wasOptedIn && X != P && raw(S, X) == 0`, submit `axfer S→creator 0 X closeTo=creator`, fee 0. Precedent: `arc58/plugins/self-optin/contract.algo.ts:25-46`.
15. **Reconcile the batch** (section 3.5) and emit `ConvertEvent`.

After the last batch:

16. If any batch swapped, require `Σ ref ≥ settings.minBatchValue`, else `errPcMinBatch`.
17. Reconcile `P` and ALGO (section 3.5).
18. If `rekeyBack`, submit `pay S→S 0 rekeyTo=W.address` as the last inner transaction. If `rekeyBack` is false, the plugin leaves `S` rekeyed to itself, as every Akita plugin does.

### 3.4 The Haystack swap (D2)

What HRP does (`arc58/plugins/haystack-router/contract.algo.ts`):

- `swap(wallet, rekeyBack, asset, amount, outputAsset, minOutputAmount)` takes `S = getControlledSpendingAccount(wallet)`, so it runs inside an HRP window of `W` (`:197-213`).
- It finds the one top-level input to Haystack's router app after its own call: a payment or asset transfer of exactly `amount` of `asset`, with no close, clawback or rekey (`:111-147`). Its sender is Haystack's temp account.
- It requires a later top-level call to Haystack's pinned router app and method whose terms name `asset` in and `outputAsset` out, `minAmountOut == minOutputAmount`, beneficiary `S`, and the pinned referrer (`:66-108`).
- It then sends `amount` of `asset` from `S` to the temp account and rekeys `S` back to `W` (`:149-189`).

So `S` never leaves the wallet's control. HRP never holds it after its own call, and Haystack's venues trade from Haystack's temp account, never from `S`. The old router facade, the `spending_address` global and the rule-6 deviation are gone.

The keeper builds `[b]` like the mobile app does (`akita-rn/src/services/haystackPluginSwap.ts`): quote `fixed-input` with `maxGroupSize = 9`, rewrite the route's wallet transactions to the temp account, and fund temp with one keeper payment that carries its MBR, opt-in and every route fee.

**Consequences, all open (Haystack):**

- Haystack's venues see Haystack's temp account, not `S`, and no wallet hint. A GatedFeeHook pass of the wallet's principal no longer applies to the conversion (11.16).
- Plugin DEX pools are only on the route if Haystack lists them (11.18).
- The swap depends on Haystack's off-chain API; on LocalNet only the mock router exists (11.19).

### 3.5 The S balance sheet

This is the structural proof of "touch nothing else". The plugin issues transactions from `S` of only three kinds: 0-amount opt-in, 0-amount close-out and 0-amount rekey. In window `[b]`, HRP sends exactly `delta` of `X` from `S` to Haystack's temp account (`arc58/plugins/haystack-router/contract.algo.ts:149-189`). The plugin names no other asset in any transaction. **Open (Haystack):** the keeper's HRP grant is a separate grant, and nothing in the plugin limits what the keeper swaps through it (11.15). Then it checks the result on raw balances:

| Asset | Required at the end |
|-------|---------------------|
| batch asset `X`, swapped | `raw(S, X) == before` (claimed, then fully swapped; D8) |
| batch asset `X`, claim as-is | `raw(S, X) == before + delta` |
| `P` | `raw(S, P) == raw0(S, P) + Σ out + Σ delta(batches with X == P)` |
| ALGO, when no batch asset and not `P` | `raw(S, 0) == raw0(S, 0)` |
| ALGO as `X` or as `P` | covered by the rows above |

Any mismatch reverts with `errPcBalance`. Opt-ins and close-outs change `minBalance`, not `balance`, so they do not disturb the ALGO row. A partial fill leaves `raw(S, X) > before` and fails the first row (D8).

Two facts make the deltas attributable: batch assets are distinct (step 7), and `P` appears only as an output or as a preferred-asset batch.

### 3.6 Opt-in and MBR

| Item | Amount | Who pays | When it comes back |
|------|--------|----------|-------------------|
| `S` opt-in to a claimed ASA | 100,000 µALGO (MBR, locked in `S`) | wallet | close-out at step 14 of the same batch |
| `S` opt-in to `P` | 100,000 µALGO | wallet | when the user opts out; done in `setSettings` |
| settings box | 18,900 µALGO | wallet (`S` → plugin) | `clearSettings` |
| Haystack temp account MBR and opt-in | 100,000 µALGO, plus 100,000 µALGO per ASA input | keeper, in the funding payment of window `[b]` | **Open (Haystack):** depends on how Haystack's route closes the temp account (11.20) |

Rules:

- Batches run one at a time and each closes its own opt-in. So the peak extra MBR in `S` is 0.1 ALGO. The wallet needs at least 100,000 µALGO spendable when any batch needs an opt-in. The keeper checks this first.
- `setSettings` opts `S` in to `P` when needed, so the user pays that MBR in their own signed action, not in a keeper call.

### 3.7 Fee budget

- Every inner transaction has fee 0. The keeper pays `(outer + inner) × minFee` on the first transaction of each window, and Haystack's route fees through the temp funding payment.
- Per batch, the plugin adds: opt-in 0-1, claim calls 1-2, payouts 1 per claim, rekey 1 per window, close-out 0-1. HRP adds 1 inner (the temp funding transfer, carrying the rekey back).
- Haystack route sizes and fees are not measured yet; the old router counts no longer apply. The keeper takes the exact count from simulate (section 6). **Open (Haystack):** a per-wallet daily cost estimate needs measured Haystack routes (11.13).

### 3.8 Limits (AVM 13)

| Limit | Value | Effect here |
|-------|-------|-------------|
| inner transactions | 256 per group, pooled (`plugin-dex/research/FINAL-SPEC.md:48`) | not binding |
| opcode budget | 700 per app call, pooled; each inner app call adds 700 (`FINAL-SPEC.md:49`) | carriers cover it |
| group size | 16 | **binding.** One HRP swap already takes 16: its window 3, the temp account's 4 (funding, opt-in and its route transactions), and up to 9 route transactions (`akita-rn/src/services/haystackPluginSwap.ts:29-30`). A claim window and a settle window (3 each) do not fit beside it. **Open (Haystack), 11.13** |
| references | 8 per transaction, shared across the group | about 128 for a full group. This is the binding limit |
| app args | 2,048 bytes total (`plugin-dex/types.ts:170`) | a 6-batch call with 1 leg each and 16 claims is about 1 KB |

Reference count per batch (estimate): `X` (1), two Rewards boxes per claim (`'d'+id` and `'u'+address+asset+id`, `rewards/contract.algo.ts:80-86`), reference pools (1-2 accounts), and the creator for the close-out (1). Shared once per group: `W`, plugin, Rewards, legacy Rewards, DAO, HRP, Tinyman app, `P`. Haystack's route carries its own references. `MaxBatches = 6` and `MaxClaimsPerCall = 16` are starting caps for claims; with swaps the group size binds first (above).

A wallet with more pending work than one call holds gets the rest in later calls. The keeper grant's cooldown sets the spacing (section 5).

## 4. Price guard

### 4.1 What the guard bounds

The guard bounds the **total cost** of a conversion (LP fees, hook fees, price impact and route quality) against a mid price that the caller cannot choose. It is independent of `batch.minAmountOut`. The keeper's `minAmountOut` is an extra floor, never a replacement.

### 4.2 Reference price

The reference always goes through ALGO, using the one canonical Tinyman v2 pool per pair:

- `pool(A) = tmPoolAddress(tinyman, A, 0)` for `A != 0` (`plugin-dex/hooks/shared/tinyman-v2.ts:56-74`). In that pool `asset_1 = A` and `asset_2 = 0` (ALGO is always `asset_2`, `:13-14`).
- `tmReadPool(pool, tinyman)` reads the local state without any inner call and never reverts (`:76-104`; keys in `plugin-dex/research/venues.md:105-115`).
- A reference pool is valid when `exists`, `lock == 0`, `reserve1 > 0`, and `reserve2 ≥ min_ref_algo`. Otherwise the batch has no reference: `errPcRef`.

Per batch, at step 8 (before any claim or swap in the call), store `(Rx, RaX)` for `pool(X)` when `X != 0`, and `(RaP, Rp)` for `pool(P)` when `P != 0`. Then:

```
toAlgo(x)   = X == 0 ? x : mulDiv(x, RaX, Rx)          // ALGO per X, floor
fromAlgo(a) = P == 0 ? a : mulDiv(a, Rp, RaP)          // P per ALGO, floor
ref(x)      = fromAlgo(toAlgo(x))
floor(x)    = mulDivUp(ref(x), BpsDivisor - maxSlippageBps, BpsDivisor)
```

`mulDiv` and `mulDivUp` are the PluginDex math helpers (`plugin-dex/math.ts:7-17`). A quotient above 2^64 reverts; no real payout reaches that.

**Why "via ALGO" always.** It is uniform (one depth rule in µALGO), it is the deepest hub on Algorand, and a direct X/P pool would be a second, possibly thinner, oracle. Arbitrage keeps the via-ALGO mid within one fee of a direct mid.

**Why snapshot at the start of the call.** Batch 1's own swap can move a pool that batch 2's reference uses. With the snapshot, our own earlier impact counts against batch 2's slippage instead of moving its reference. This is the conservative choice.

### 4.3 Spot versus execution, fees, rounding

- `ref(x)` is a **mid** (fee-free spot) value. The measured `out` is the **execution** value: it includes every fee and the impact of the whole route.
- So `maxSlippageBps` must cover fees. A via-ALGO route pays two LP fees: Tinyman's `total_fee_share` is 1-100 bps, default 30 (`plugin-dex/research/venues.md:110`). Recommended default 100 bps; the UI should warn below 75 bps.
- Rounding: both spot steps floor (the reference rounds down, at most 1 unit of ALGO and 1 unit of `P`). The floor rounds **up** (`mulDivUp`), so the guard never accepts less than the exact bound of the rounded reference. For dust, the relative error can be large. `floor > 0` and `minBatchValue` exclude dust.

### 4.4 Multi-hop routes and splits

The guard is route-agnostic. It compares the batch's **aggregate** measured output with one reference value. It does not care which venues, splits or hops Haystack's route used. This removes per-hop price products and any reads of the route's own pools, which the plugin could not see anyway: Haystack's route runs outside the plugin's calls.

### 4.5 Rejected: guard on the chosen route's own pools

The first sketch read each route pool's spot at execution and compared the fill with it. It fails one attack: someone creates a pool X/P on any venue Haystack routes through, with reserves skewed 10x against the user, deep enough that impact is small, and the route uses it. Spot and fill agree, so the guard passes, and the attacker buys X cheaply. A caller cannot create a second Tinyman pool for a pair, so the canonical-pool reference closes this.

### 4.6 Threat model

| Actor and attack | What stops it | Residual |
|------------------|---------------|----------|
| Keeper bug: `minOut = 0`, wrong route, tiny pool | reference guard (independent of route and `minOut`) | none beyond `maxSlippageBps` |
| Keeper bug or attacker: swap a holding that was not claimed | HRP funds exactly the quoted `amount`; balance sheet (3.5) | **Open (Haystack):** the keeper's HRP grant can swap any holding of `S` outside a conversion (11.15) |
| Claim someone else's allocation | Rewards keys by `Txn.sender = S` (`rewards/contract.algo.ts:568-572`) | none |
| Pool creator: skewed pool | canonical Tinyman reference (4.5) | none |
| Same-group sandwich `[push, convert, unwind]` | group isolation (D4) | **Open (Haystack):** D4 must admit Haystack's route (11.14) |
| Front-run in an earlier group or block (cross-group sandwich) | **not stopped by the guard.** The keeper's off-chain `minOut` from an independent price, the cost of moving a pool of at least `min_ref_algo`, and small daily amounts limit it | loss up to the manipulation size plus `maxSlippageBps`. Phase 2 TWAP (4.8) |
| Sustained multi-block manipulation of a reference pool | not stopped by spot | same; TWAP raises the cost |
| Malicious venue or hook in Haystack's route | venues trade from Haystack's temp account, never from `S`; HRP checks the route's terms (output asset, `minOut`, beneficiary `S`, referrer); balance sheet | none for holdings; fill quality still bounded by the guard |
| Fake wallet app | `isGenuineWallet`, `S` must be rekeyed to the plugin | none |
| DAO repoints `aal.rewards` to a hostile app | the callee cannot spend from `S` (it is not `S`'s auth address); anything it sends to `S` is just swapped | none for holdings |
| Compromised keeper key | everything above; grants are revocable; key rotation without re-grant (section 5) | cross-group sandwich of every opted-in wallet in one block, bounded as above. Monitor `ConvertEvent.amountOut / referenceOut` |

Algorand note (inferred, not measured): there is no public priority-fee auction for block position. A front-runner must see the keeper's group in the transaction pool and get ordered before it in the same block. This is harder than on Ethereum, but it is not impossible, so the design does not depend on it.

### 4.7 What the guard does not do

- It does not make the reference mid fair. It makes the fill close to the mid **at execution**.
- It does not price assets with no valid Tinyman ALGO pool. Those assets follow `noRouteMode`.
- It refuses fair but expensive routes (high hook fees). That is intended.

### 4.8 Phase 2: TWAP reference (v2, required before global callers)

Tinyman v2 pools keep Uniswap-v2 style cumulative prices, scaled by 2^64, in local state (`asset_1_cumulative_price`, `asset_2_cumulative_price`, `cumulative_price_update_timestamp`; `plugin-dex/research/venues.md:114-117`). A swap updates the accumulator with the reserves from **before** it, weighted by the elapsed time. So a same-block manipulation adds zero weight.

v2 sketch:

1. Store one observation box per reference pool: `(cumulative, timestamp)`. Every call refreshes it; a permissionless `observe(pools)` refreshes it too.
2. Reference = TWAP over `[t_obs, t_pool_update]`, with a minimum window (for example 1 hour) and a maximum age (for example 48 hours).
3. Guard on the TWAP, plus a spot-vs-TWAP deviation cap so that a stale TWAP does not accept a bad spot.

This is out of v1 scope (D5). The v1 reads the same pools, so the keeper and tests carry over.

## 5. Grants and discovery

### 5.1 Two grants per wallet

Both are created by the wallet admin with `arc58_addPlugin` (`arc58/account/contract.algo.ts:1273-1304`), in the install group.

| Field (`arc58/account/types.ts:147-161`) | Keeper grant | Admin grant |
|------------------------------------------|--------------|-------------|
| `plugin` | PayoutConverter | PayoutConverter |
| `caller` | keeper address | wallet app address (opened with `type = 2`, CallerTypeAdmin, `arc58/account/contract.algo.ts:394-402`) |
| `escrow` | `""` (`S` = controlled address, where allocations are paid) | `""` |
| `admin` | false | false |
| `delegationType` | 0 (Other): keeper calls are not user interaction | 1 (Self) |
| `lastValid` | 2^64 - 1 (revocable at any time) | 2^64 - 1 |
| `cooldown` | 3,600 s (one call per window; hourly retries possible) | 0 |
| `methods` | `[{ claimAndConvert, cooldown 0 }]` | `[{ setSettings, 0 }, { clearSettings, 0 }]` |
| `useRounds` | false | false |
| `useExecutionKey` | false: execution keys require a global caller (`:1193-1199`) and pre-registered group ids, which a daily keeper cannot provide | false |
| `coverFees` | false (D9) | false |
| `canReclaim` | false (no escrow) | false |
| `defaultToEscrow` | false | false |

Defense in depth for settings: the method list already keeps the keeper out of `setSettings`. The plugin also requires `current_plugin.caller == wallet.address` (admin-caller window) and `escrow == ""`, else `errPcAdmin`.

### 5.2 setSettings and clearSettings

`setSettings`:

1. Same entry checks as steps 2-4 of section 3.3, but require `caller == wallet.address`.
2. Validate: `P == 0` or the asset exists and is not default-frozen; `1 ≤ maxSlippageBps ≤ MaxSlippageBps`; `noRouteMode ∈ {0, 1}`. Else `errPcSettings`.
3. On the first write, pay the box MBR `S → plugin` (exact amount), fee 0.
4. If `P != 0` and `S` is not opted in to `P`, opt in.
5. Write the box, emit `SettingsEvent`, rekey back.

`clearSettings` deletes the box, refunds 18,900 µALGO from the plugin to `S`, emits `SettingsEvent { cleared: true }`, and rekeys back. It does not opt out of `P`.

### 5.3 Install flow (one group, signed by the admin)

```
[0] W.arc58_addPlugin(keeper grant)
[1] W.arc58_addPlugin(admin grant)
[2] W.arc58_rekeyToPlugin(PC, type=2, "", [0], [])
[3] PC.setSettings(W, true, settings)
[4] W.arc58_verifyAuthAddress()
```

Opt-out: one group with `clearSettings` in an admin window, then `arc58_removePlugin` for both grants.

### 5.4 Keeper key rotation

Grants pin the keeper **address**. A new address would need every wallet to re-grant. So the keeper address is a dedicated account whose signing key the team rotates with an Algorand rekey of that account. The address in every grant stays valid.

### 5.5 Discovery

1. List the plugin's boxes with `GetApplicationBoxes(PC)` and keep keys `'s' ‖ u64` (same pattern as the sweep's box listing, `akita-backend/server/rewards_sweep.go:406-439`).
2. For each wallet id: read `controlled_address` from the wallet's globals, and check that the keeper grant box exists on the wallet. The key is `'p' ‖ abi((uint64,address,string))(PC, keeper, "")` (builder: `akita-backend/server/sticker_pack_rewards.go:724-741`). Decode it for `lastValid` and the method offset (decoder: `akita-backend/server/lifecycle_executor.go:745-796`).
3. A wallet with settings but no valid keeper grant is skipped and flagged for the UI.

## 6. Keeper flow

It fits the existing jobs in `akita-backend/server`. The daily distribution runs at `CRON_TZ=UTC 10 0 * * *` (00:10 UTC, after the indexer-freshness check; see `cron.go`), and it creates one disbursement per bucket, per asset, per day, with `reclaimTo` = the bucket escrow and a 90-day default expiry (`revenue_distribution.go:660-664`; plan and env vars as surveyed). The sweep runs `@hourly` (`cron.go:89`).

1. **Schedule.** `CRON_TZ=UTC 30 1 * * *` for the main pass, plus an hourly pass that retries wallets not yet done for the period. Skip a wallet while the revenue job still has an unfinished disbursement for the period.
2. **Lock.** In-process `TryLock`, plus MySQL `GET_LOCK("akita:payout_conversion", 0)` through `acquireMySQLNamedLock` (`revenue_distribution.go:1060-1082`).
3. **Signer.** Service label `payout_converter`, key from 1Password. On LocalNet, a mnemonic env var. Same as the sweeper (surveyed: `rewards_sweep.go:356-386`).
4. **Discover** wallets (section 5.5).
5. **Allocations.** From the Rewards v2 and v1 box listings, keep the `'u'` boxes whose address is the wallet's `S`. Keep only qualifying disbursements: by default, DAO revenue disbursements (note `"Akita DAO revenue <period> <escrow> asset <id>"`, creator = a bucket escrow). Drop locked or expired ones.
6. **Batch** per wallet: one batch per asset, assets with no route last. Respect `MaxBatches` and `MaxClaimsPerCall`; leftovers wait for the next call.
7. **Quote** each swapped batch:
   1. `ref` from the same Tinyman reads (or the readonly `referenceOut`). Skip the whole call when `Σ ref < minBatchValue`.
   2. A Haystack quote: `newQuote({ address: S, fromASAID: X, toASAID: P, amount: delta, type: "fixed-input", optIn: false, maxGroupSize: 9 })`, with the referrer HRP pins.
   3. `minAmountOut = max(floor, quote × (1 - keeperToleranceBps))`. HRP requires the route's terms to carry exactly this value. Also compare `ref` with an independent off-chain price. On a divergence above a threshold, skip that asset and alert (this is the cross-group-manipulation tripwire).
8. **Pre-flight.** `S` spendable ≥ 100,000 µALGO when an opt-in is needed. `S` opted in to `P`. The keeper holds enough ALGO to fund Haystack's temp account.
9. **Simulate first.** `SimulateTransaction` with `AllowEmptySignatures` and unnamed-resource discovery. Place the discovered references on carriers. Set the fee from the simulated inner count. Re-simulate the final group. Pattern: `rewards_sweep.go:666-677`.
10. **Send.** Record a pending intent with `lastValid` first. Then sign, send and wait for confirmation (pattern: the revenue job's intent-then-send flow, as surveyed).
11. **Record.** Tables `payout_conversion_runs (period, wallet_app_id, status, txid, last_valid, attempts, last_error)` and `payout_conversion_batches (period, wallet_app_id, asset_id, claimed, converted, amount_out, reference_out)`. Fill the second from `ConvertEvent` logs.

### 6.1 Failure handling

| Signal | Action |
|--------|--------|
| `errPcPrice`, a Haystack `minOut` failure or `errIhmo`, `errPcRef` on a batch | drop that batch, retry the rest this hour. After 3 failed days for the asset, apply `noRouteMode`: an as-is batch, or leave it to expire |
| `errPcMinBatch` | wait; amounts accumulate across days |
| `errPcNoSettings`, missing or expired grant, `errPcPreferred` | mark the wallet inactive until its settings box or grant changes; notify the user |
| opt-in MBR shortfall (pre-flight) | skip the wallet, notify the user |
| `errAlne` (allocation gone) | the user claimed manually; refresh the allocation list |
| send timeout | wait past `last_valid`, re-read allocations, rebuild. Claims delete allocation boxes, so a duplicate send fails in simulate |
| keeper offline | nothing is lost until expiry. The user can still claim manually. After expiry, the hourly sweep returns unclaimed funds to the bucket (`rewards/contract.algo.ts:656-697`) |

**Idempotency.** The keeper converges from chain state on every run: it rebuilds the work list from allocation boxes, and a claimed allocation no longer exists. The DB only tracks intent and history.

## 7. Interactions

### 7.1 Principal resolution

- The plugin needs no principal. Settings key = wallet app id, verified genuine. Rewards uses `Txn.sender`, which is `S`.
- No hint is forwarded to any venue: Haystack trades from its temp account (3.4). The old rule-6 deviation is gone.
- The plugin and HRP hold no standing custody, so the E25 case in the standard does not apply (`docs/principal-resolution/STANDARD.md:247`).

### 7.2 Plugin versioning and `getPluginUpdate`

- Add a `payoutConverterPlugin` key to the SDK's plugin deployment table. `getPluginUpdate(network, installedId)` then reports the newer version (`projects/akita-sdk/src/networks.ts:815-847`).
- Upgrade = new app plus grant swap, in one admin-signed group: `clearSettings` on the old plugin (refund), `arc58_removePlugin` for both old grants, `arc58_addPlugin` for both new grants, and `setSettings` on the new plugin. The UI copies the old settings off-chain.
- A new HRP or a new Tinyman deployment also needs a new plugin version (pinned ids).

### 7.3 Rewards v1 (`claimLegacyRewards`)

- v1 and v2 share the claim signature `claimRewards((uint64,uint64)[])void` (`docs/rollout/MAINNET-ROLLOUT.md:25`; `arc58/plugins/rewards/contract.algo.ts:297-311` calls the v1 app with the v2 ABI).
- The plugin pins `legacy_rewards` at create and claims v1 ids through `batch.legacyClaims`. A v1 and a v2 claim of the same asset go in one batch, so one delta covers both.
- v1 pays `Txn.sender` like v2. This is inferred from the shared ABI. Test H5 confirms it against the deployed v1 bytes.

## 8. Failure modes and edge cases

| Case | Behavior |
|------|----------|
| No reference pool, or below `min_ref_algo` | `errPcRef`. The keeper sends that asset as-is (`ClaimAsIs`) or skips it (`LeaveUnclaimed`, so it expires to the bucket) |
| Illiquid route (guard fails) | `errPcPrice`. Same handling after 3 days |
| Partial fill | `errPcBalance` (D8). Haystack quotes are fixed-input |
| Asset frozen for `S`, or default-frozen | the Rewards payout to `S` fails, so the call reverts. The keeper excludes the asset and the user claims manually after unfreeze. `setSettings` refuses a default-frozen `P` |
| Clawback during the call | only an app reachable in the route could do it; the balance sheet reverts the call |
| `X == P` | claim only, no swap, no close-out |
| `S` not opted in to `P` (user opted out after setup) | `errPcPreferred`; the keeper notifies the user |
| ALGO as `X` | raw delta works because inner fees from `S` are 0; HRP pays temp from spendable ALGO, which grew by `delta` |
| `P == ALGO` | output measured on raw ALGO; the balance sheet covers it |
| Rounding dust | `floor > 0` and `minBatchValue`; a fixed-input Haystack route spends the whole input, so no residual |
| User claims manually between quote and send | simulate fails with `errAlne`; the keeper rebuilds |
| User changes settings between quote and send | the route's output asset is no longer `P`: the settle call's guard or reconcile fails; the keeper re-quotes |
| Min batch never reached in 90 days | the allocation expires to the bucket. The UI warns when `minBatchValue` exceeds about 30 days of typical payout |
| Keeper offline | see 6.1 |
| Plugin upgrade | 7.2. Old and new versions can run side by side; each has its own settings box and grants |

## 9. Test plan

New spec: `arc58/plugins/payout-converter/payout-converter.e2e.spec.ts`, plus a unit test for the math. Run the full `npm test` inside `with-localnet-lock.sh` (LocalNet is shared across sessions). Rebuild the SDK dist before e2e, because the tests import it.

### 9.1 Unit

- **U1** `ref(x)` matches a TypeScript bigint model for random reserves, for X or P = ALGO, and both directions.
- **U2** `floor` rounds up; `floor == 0` for dust; `MaxSlippageBps` bound.
- **U3** worst-case claim-call app-args size ≤ 2,048 B at the caps.

### 9.2 E2E: happy paths

- **H1** ASA → USDC through Haystack (LocalNet mock router, `mocks/haystack-router-localnet`), `S` not opted in: opt-in, claim, swap, close-out. `S`'s `minBalance` is back to its start. `ConvertEvent` fields are exact. `S` is rekeyed to `W` after every window.
- **H2** three batches (ASA, ASA, ALGO) → AKTA, one Haystack swap each (11.13 decides how many groups); peak extra MBR 0.1 ALGO.
- **H3** `X == P`: claim only.
- **H4** `ClaimAsIs` with `swap == false`: `X` stays opted in and held.
- **H5** v1 and v2 claims of the same asset in one batch, against the deployed v1 bytes (same fixture as the DEC-1 test).
- **H6** a split Haystack route (mock router, two venues).
- **H7** removed: a GatedFeeHook pass no longer applies through Haystack (11.16).
- **H8** `setSettings` first write charges exactly 18,900 µALGO and opts in to `P`; `clearSettings` refunds exactly.

### 9.3 E2E: adversarial

- **A1** `S` holds 1,000 of `X` before the call; the HRP window swaps `delta + 1`: the settle call fails `errPcBalance` (or the binding check of 11.15). `S` still holds 1,000.
- **A2** a route whose finalize names another beneficiary or output asset: HRP rejects it (`errIhra`, `errIhoa`).
- **A3** `minAmountOut = 0` through a skewed pool X/P that the mock Haystack routes through: `errPcPrice`.
- **A4** a group with a Tinyman swap before the window: `errPcGroup`. The same swap in a carrier position after the window: `errPcGroup`.
- **A5** characterization: manipulate the reference pool in a **previous** group; the conversion passes at the manipulated mid within `maxSlippageBps`. This test documents the residual in 4.6.
- **A6** a claim of a disbursement where `S` has no allocation: `errAlne`. A claim of another address's allocation id: `errAlne`.
- **A7** `setSettings` through the keeper grant: rejected by the wallet's method check; with a grant that lists it: `errPcAdmin`. Through a fake wallet app: `errInvalidWallet`.
- **A8** a global-caller grant: `errPcGlobal`.
- **A9** a fake wallet whose `spending_address` points at the plugin's own account: `errNath`.
- **A10** duplicate asset across batches; 7 batches; 17 claims; `swap` on an `X == P` batch: all `errPcBatch`.
- **A11** a settle call with no claim call in the group, and a claim with no settle: `errPcSettle` (11.12).
- **A12** `S` opted out of `P`: `errPcPreferred`.
- **A13** `swap == false` with `LeaveUnclaimed`: `errPcNoRoute`.
- **A14** below `minBatchValue`: `errPcMinBatch`.
- **A15** a mock route that fills only part of the input: `errPcBalance`.
- **A16** after every revert above: `S` is rekeyed to `W`, and no allocation box was deleted.
- **A17** removed (the router facade is gone).
- **A18** a second keeper call within the cooldown: rejected by the wallet.
- **A19** a `PC.opUp` carrier inside the window: rejected by the wallet's method restriction.

### 9.4 Limits

- **L1** the largest claim that fits beside one Haystack swap, and the largest Haystack route that fits beside the claim and settle windows (11.13). Log inners, op-ups, `appBudgetConsumed` and references. Pin the counts.
- **L2** program size, approval plus clear, with a size gate.

## 10. Alternatives considered

### 10.1 Product alternatives

**A. Claim-time swap in the wallet UI.** The user signs a group at claim time: one window for `RewardsPlugin.claimRewards` and one for HaystackRouterPlugin.
- For: no keeper, no new contract, no grant.
- Against: the user must act every day. The product asks for automatic conversion.
- Verdict: worth shipping as a UI feature for users who did not opt in. It does not replace this plugin.

**B. DAO batch conversion before distribution.** The revenue job converts the bucket's assets before it creates disbursements.
- For: one large trade per asset per day, so far lower fees in total.
- Against:
  - It forces one asset on everyone, but the decided default is raw assets.
  - A per-preference variant (convert only the share of users who prefer USDC) moves execution and sandwich risk onto the treasury, with one large and predictable daily trade.
  - It needs HaystackRouterPlugin grants on the bucket escrows and still gives no auto-claim.
- Verdict: rejected for v1. Revisit when per-wallet fees become material at scale.

### 10.2 Swap composition alternatives (D2)

The 2026-10-11 options (C1-C4 and the router facade) all assumed AkitaRouterPlugin and are void now that it is removed. With Haystack-only routing:

| Option | For | Against | Verdict |
|--------|-----|---------|---------|
| Call Haystack's router from inside the plugin as inner transactions | one call | not possible: Haystack's route is built off-chain and signed by Haystack's temp account at top level | rejected |
| Claim, HRP window plus route, and settle in one group (section 3.2) | atomic: the guard sees the whole conversion | does not fit 16 transactions with a 9-transaction route (3.8) | **open (11.13)** |
| Claim in one group, swap and settle in later groups | fits | not atomic: claimed assets sit in `S` between groups, and the guard and balance sheet no longer cover one conversion end to end | **open (11.13)** |

### 10.3 Guard alternatives (D3)

| Option | Verdict |
|--------|---------|
| Spot of the chosen route's pools | rejected (4.5) |
| Keeper-signed reference price checked on-chain | trusts the keeper key, which is the main compromise target; rejected |
| TWAP in v1 | needs observation upkeep and a fallback for young observations; kept for v2 (4.8) |
| **Canonical Tinyman ALGO-pool spot (chosen)** | no inner calls, caller-independent, same pools as the v2 TWAP |

## 11. Open questions for Kyle

Each has a recommended default. The spec above assumes the default.

1. **Refuse global-caller grants in v1?** Default: **yes** (D5). Opening needs a per-wallet re-grant anyway, and the spot reference does not stop a cross-group sandwich. Ship the TWAP v2 when opening.
2. **`min_ref_algo` value.** Default: **10,000 ALGO** per reference pool. Before deploy, measure the AKTA/ALGO and USDC/ALGO Tinyman pools. An asset whose pool is thinner cannot be converted and follows `noRouteMode`.
3. **Which allocations does the keeper convert?** Default: **DAO revenue disbursements only.** Referral payouts and other Rewards allocations stay manual. The contract cannot tell them apart, so this is keeper policy.
4. **Who pays fees?** Default: **the keeper, funded by the DAO, no conversion fee.** The estimate is about 0.05 ALGO per wallet per day (3.7). Revisit if many wallets opt in.
5. **Defaults for new users.** Default: `maxSlippageBps = 100`, `minBatchValue` = about 5 USD in `P`, `noRouteMode = LeaveUnclaimed`.
6. **Dust that never reaches `minBatchValue`.** Default: **let it expire** to the bucket after 90 days. The plugin cannot read expirations, so there is no on-chain "convert anyway near expiry". The UI warns.
7. **Partial fills.** Default: **refuse** (D8).
8. **Keeper grant cooldown.** Default: **3,600 s.** A longer cooldown, such as 20 h, adds little: a call can convert only what it claims.
9. **Keeper key rotation.** Default: **a stable keeper address with a rekeyed signing key** (5.4).
10. **Router facade and rule 6.** Void: AkitaRouterPlugin is removed and the facade with it (3.4).
11. **Rollout order.** Default: deploy after Rewards v2, HaystackRouterPlugin and the RewardsPlugin rotation (`docs/rollout/MAINNET-ROLLOUT.md:254-260`), TestNet first, keeper in dry-run mode for one week (simulate only, log `referenceOut` against fills).

The items below came with the move to Haystack-only routing (2026-11-10). None has a default yet.

12. **Method shape.** `claimAndConvert` cannot hold a Haystack swap. How do a claim call and a settle call bind to each other: the same group with a group-index check, a per-wallet pending box written by the claim and consumed by the settle, or something else? Where does the step 8 snapshot live between them?
13. **One group or several.** One HRP swap already fills 16 transactions (3.8). Options: cap Haystack's route lower (`maxGroupSize` below 9) so claim and settle fit beside it, which narrows routes; or split the conversion over several groups and give up atomicity (10.2). Either way, how many assets per day per wallet, and what does it cost?
14. **Group isolation with Haystack (D4).** The group must admit the keeper's temp funding, temp's opt-in and Haystack's route. Can the plugin recognize those (Haystack router app and method pinned in HRP, the temp account named by the finalize call) without admitting a sandwich, and can a sandwich hide inside a route Haystack builds?
15. **The keeper's HRP grant.** A conversion needs an HRP grant for the keeper too. That grant lets the keeper swap any holding of `S` through Haystack, outside any conversion, which breaks goal 2 ("touch nothing else") unless something limits it: the settle call checking that the HRP window swapped exactly `delta` of `X`, an allowance on the grant, or an HRP variant.
16. **Fee pass.** Haystack's venues see Haystack's temp account and no wallet hint, so a GatedFeeHook pass of the wallet's principal no longer applies to conversions. Accept, or route differently for passholders?
17. **Pinned Haystack ids.** HRP pins Haystack's router app, method and referrer at create. A Haystack router upgrade means a new HRP, and with the pinned `haystack_plugin` a new PayoutConverter version too. Pin HRP, or read it from the DAO's app list?
18. **Plugin DEX liquidity.** Conversions reach Plugin DEX pools only if Haystack lists Plugin DEX as a venue (INTEGRATION.md). Is that a launch dependency?
19. **Haystack availability.** The keeper depends on Haystack's off-chain API; when it is down, conversions stop and allocations wait until expiry. LocalNet tests run only against the mock router. Is that enough for v1, and what is the TestNet story?
20. **Temp account funding.** What happens to the ALGO the keeper sends to Haystack's temp account (MBR, opt-in) after the route: closed back to the keeper, or spent? This sets the real per-conversion cost.
