# Akita-native hooks: gated fees and creator-token launches

Research and design only. No existing source was changed. This document covers
two Akita-native uses of PluginDex:

- **Part A, `GatedFeeHook`.** Swap-fee discounts for AKTA stakers and
  high-impact social users, built on the existing staking, impact and gate
  contracts.
- **Part B, creator-token launches.** A bonding curve, an anti-snipe fee, a
  creator tax and graduation into a normal pool.

Part C consolidates the core-DEX features both parts need. It has to be read
alongside the curve-module ("pool type") refactor being designed in parallel.

PuyaTs references were checked against
`node_modules/@algorandfoundation/algorand-typescript` **1.3.1**. The APIs used
in the sketches are `BoxMap.maybe/exists/delete` (`box.d.ts`), `Box`,
`Global.round`, `Global.latestTimestamp`, `Global.callerApplicationId`
(`op.d.ts:1161/1166/1196`), `op.AppGlobal.getExBytes`, `op.AppParams.appCreator`
(`op.d.ts:241/357`), `op.shr` (`op.d.ts:2358`),
`ensureBudget(n, OpUpFeeSource.GroupCredit)` (`util.d.ts:205`), `abiCall`, and
the existing helpers in `smart_contracts/utils/functions.ts`. The sketches are
illustrative and have not been compiled.

---

## 0. TL;DR

| Topic | Decision |
|---|---|
| Gated fee: hot path | Swaps and quotes never evaluate stake, impact or gates. They read a cached **FeePass** box keyed by the **spending account** (`ctx.caller`), plus the pool's fee schedule box. This costs 0 extra inner txns, 2 box refs and about 200 opcodes. |
| Gated fee: refreshing a pass | `refresh(spender, …)` runs off the hot path. It resolves the origin with the DAO's escrow factory **plus the ACC-01 wallet-creator check**. It then measures AKTA lock power (through the pass expiry), the social impact score, and up to 8 DAO-defined gate slots through the main `Gate`, and stores the results with a TTL. |
| Quote = swap | Holds by construction. Both read the same pass with the same key and the same `latestTimestamp`. The one requirement is that the quote's `Txn.sender` is the trader's spending account. A core `quote(…, trader)` parameter is recommended so contracts that are not the trader can quote too. |
| Launch: curve | A **virtual-reserve CPMM (VCPMM)** pool type with virtual offsets on both sides, as pump.fun does. It needs core support: virtual offsets, a floor on real reserves, single-sided initialization, and LP that is locked while the offsets are active. |
| Launch: graduation | **In-place graduation** (recommended). A permissionless `graduate(poolId)` retires the virtual offsets once `realReserveA ≥ threshold`, tops up the token side from a graduation reserve held in the escrow so the price stays continuous, and burns the excess. The pool becomes a plain CPMM with **permanently locked** launch LP. The alternative is migrating to a new pool (§B7.2). A custody hook cannot do the migration (§B7.3). |
| Launch: hooks | `AntiSnipeFeeHook` (DynamicFee; fee decays exponentially or linearly in rounds from the start round). `LaunchTaxHook` is a multi-tenant `SwapTaxHook` v2 with a buy/sell tax per pool and per-pool accrual. `GatedFeeHook` is optional. Recommended stack order: `[GatedFee, AntiSnipe, LaunchTax]`. |
| Core asks | F1 VCPMM, F2 locked initial LP, F3 no LP operations while offsets are active, F4 graduate, F5 a per-pool dynamic-fee cap above 10%, **F6 hook init data and funding at `createPool`**, F7 `quote(…, trader)`. Optional: F8 output-side hook fee for a sell tax paid in ALGO, F9 fee claim on locked LP, F10 pool close/delist. |
| Already-known issue | Origin resolution through `EscrowFactory` can be spoofed (audit **ACC-01**, `audits/full-2026-10-02/fix-account.md`). `GatedFeeHook` must use the fixed `getWalletIDUsingAkitaDAO`, which checks that the wallet was created by the DAO's wallet factory, or inline that check. Without it, anyone can claim a whale's discount. |

---

## 1. Constraints from the current DEX (read from `contract.algo.ts`)

- **`ctx.caller` is `Txn.sender` of the DEX app call** (`context()`, line 396).
  - In `swapRoute`, every hop gets the same caller.
  - In `quote` and `quoteRoute`, the caller is whoever sent the quote call (`quoteCore`, line 481).
  - `recipient` can differ from the caller. A discount should key on who pays (`caller`), not on who receives.
- **What a hook can see.** Hooks are called by an inner `abiCall` from the DEX (`runHooks`, line 345). Inside a hook:
  - `gtxn` sees the **inner** group, not the user's outer group. The repo's usual "gate txn in the same group" pattern (`gateCheck` / `softGateCheck` in `utils/functions.ts:219-256`, used by `Auction.gatedBid` and `StakingPool.gatedEnter`) therefore cannot be used from a hook.
  - The DEX is on the call stack, so the hook cannot call it. Any read of DEX state has to come through `ctx`.
  - A hook can read other apps' **global** state (`app_global_get_ex`) and **local** state (`app_local_get_ex`) without an inner call. It **cannot read their boxes**. Staking stakes, impact metadata, gate registries and escrow-factory mappings are all in boxes, so each read is an inner app call.
- **Fee bounds.**
  - The DEX caps a `DynamicFee` result at `MaxFeeBps = 1_000` (10%, `runHooks` line 364).
  - It caps the sum of hook fees at `pool.maxHookFeeBps ≤ 10%`.
  - Anti-snipe needs a higher per-pool cap (F5).
- **Hook stacks and pool data.**
  - Hook stacks are immutable per pool and each hook app is approved once by the admin. A hook that serves many pools has to keep **per-pool configuration in its own boxes**.
  - `createPool` calls `AfterInitialize` with `data = ''` (line 694), so today a pool creator cannot pass that configuration in (F6).
- **AVM limits that matter.**
  - Inner call depth is 8.
  - A group can hold 256 inner txns, pooled, with at most 16 per app call.
  - Each inner app call adds 700 to the pooled opcode budget.
  - The 8 resource-reference limit per txn can be eased with group sharing or access lists.

---

# Part A: `GatedFeeHook`

## A1. Goals

- Discount the swap fee of a pool for traders who:
  - (a) hold AKTA **lock-staking power**, and/or
  - (b) have a high **social impact** score, and/or
  - (c) pass any existing **Akita gate**, such as a subscription, an NFD, the AKC NFT, or a composite AND/OR gate.
- Count stakers and high-impact users when they trade from their **ARC-58 wallet**, including through the router plugin or a plugin escrow, not only from an EOA.
- Keep the swap and quote path cheap and deterministic, so the quote and the swap give the same fee.
- Approve the hook **once** (`setHookApproval(hook, DynamicFee)`) and let any pool use it with its own schedule.

## A2. Who is the trader? Caller semantics by entry path

| Entry path | `Txn.sender` at the DEX = `ctx.caller` | Whose stake or impact should count |
|---|---|---|
| EOA calls `swap` directly | EOA | EOA |
| ARC-58 wallet, plugin without escrow (router plugin, test-proxy-rekey style) | the wallet's `spendingAddress` = `controlledAddress`, normally the wallet **app address** | the wallet (`controlled_address`) |
| ARC-58 wallet, plugin with a named escrow | the **escrow app address** | the owning wallet's `controlled_address` |
| Router plugin calling `quote` from its own app address | router plugin app address | nobody, so the quote would show no discount (see A7) |
| Third-party contract (aggregator) calling the DEX from its own address | aggregator address | the aggregator (see the laundering note in A10) |
| `swapRoute` | same caller on every hop | same |

Across Akita, the identity used for gates, staking and impact is the wallet's
`controlled_address`, which the repo calls "origin". `Auction.gatedBid`,
`StakingPool.gatedEnter` and `StakingPool.gateCheck` all compute
`origin = originOr(getWalletIDUsingAkitaDAO(dao, sender), sender)`.

## A3. Origin resolution: exact functions and app ids

> **Outdated (as built):** a wallet-creator check is not enough; the origin is trusted only under real control (FINAL-SPEC §10 A32, `hooks/shared/origin.ts`).

```
spender ──EscrowFactory.get(spender)──▶ bytes(8) = itob(walletAppId) | '' (16-byte-prefix key)
walletAppId ──appCreator == Application(AkitaAppList.wallet).address ?──▶ genuine wallet (ACC-01 fix)
wallet ──app_global_get_ex(wallet, 'controlled_address')──▶ origin
```

| Value | Source (all reachable from the hook's stored `akitaDAO`) |
|---|---|
| escrow factory id | `getOtherAppList(dao).escrow` = DAO global `oal` → `OtherAppList.escrow` |
| wallet factory id (ACC-01 check) | `getAkitaAppList(dao).wallet` = DAO global `aal` → `AkitaAppList.wallet` |
| staking app | `getAkitaAppList(dao).staking` |
| main gate | `getAkitaAppList(dao).gate` |
| impact app | `getAkitaSocialAppList(dao).impact` = DAO global `sal` |
| AKTA asset | `getAkitaAssets(dao).akta` = DAO global `akita_assets`. On LocalNet `deployAkitaDAO` sets it to `0`, which means ALGO. |
| DAO admin (hook config) | `getDAOARC58Wallet(dao).address` = DAO global `wallet` |

**Use these helpers:** `getWalletIDUsingAkitaDAO` and then `originOr`.
**Do not use** `getOrigin(escrowFactory, address)`. It returns `Txn.sender` when
there is no wallet, and inside the hook `Txn.sender` is whoever sent the
refresh, not the spender.

> **Prerequisite, ACC-01.** In today's `functions.ts`, any app can call
> `EscrowFactory.register(pay, 0)` on itself and publish
> `controlled_address = <whale>`. The hook would then hand that app the
> whale's discount.
>
> The audit fix adds `op.AppParams.appCreator(id) ==
> Application(getAkitaAppList(dao).wallet).address` inside
> `getWalletIDUsingAkitaDAO`. `GatedFeeHook` must be built against the fixed
> helper, or inline the same check (`isAkitaWallet` in `@akta/plugin`). It also
> needs a regression test (A12, T-9).
>
> Escrow mappings are safe once the wallet id is genuine.
> `EscrowFactory.register(pay, escrowId)` requires the escrow's `creator`
> global to equal the calling app, so only a wallet can map its own escrows.

## A4. Why the swap path must not evaluate stake, impact or gates

| Read | Inner calls (nested) | Notes |
|---|---|---|
| Origin: `EscrowFactory.get` | 1 | 1 box ref (16-byte key) plus the factory, wallet and wallet-factory apps |
| AKTA lock power: `Staking.getInfo` (`getStakingPowerThrough`) | 1 | stake box ref |
| Impact: `AkitaSocialImpact.getUserImpact` | 1, then 2 to 4 nested: `AkitaSocial.getSocialImpactInputs`, `Staking.getAppWeightedStake`, `Subscriptions.getSubscription`, `NFD.readField` when an NFD is linked | the heaviest read; about 6 to 10 apps, boxes and assets across the group |
| Gate: `Gate.check(origin, id, args)` | 1, plus about 2 per filter (sub-gate, then its data source) | `Gate.evaluate` calls `ensureBudget(100·n)` itself |

The hook runs once at `BeforeSwap` and once at `Quote`, and once per hop on
every gated pool in a route. Running these reads inline would cost about 3 to
12 inner txns and more than 10 resource refs per hop. It would also lean on the
router's inner-txn and depth budget (wallet → router → DEX → hook → impact →
social is already depth 4).

**Conclusion:** measure off the hot path, cache with a TTL, and read the cache
on the hot path.

## A5. Design: a FeePass cache keyed by spending account

### A5.1 State

```ts
// hook app boxes
passes    = BoxMap<Account, FeePass>({ keyPrefix: 'p' })   // key = spending account (ctx.caller)
schedules = BoxMap<uint64, FeeSchedule>({ keyPrefix: 's' }) // key = DEX pool id
gateSlots = Box<uint64[]>({ key: 'g' })                     // <= 8 gate ids, DAO-managed

// globals
dex: Application        // canonical PluginDex (requireDexCaller)
akitaDAO: Application
passTtl: uint64         // seconds, default 86_400
defaultSchedule: Box<FeeSchedule> ('d')  // copied into a pool at AfterInitialize when no init data is given

type FeePass = {
  power: uint64       // AKTA lock power, measured so the lock outlives validUntil
  impact: uint64      // AkitaSocialImpact score (1..1000)
  gates: uint64       // bit i set ⇔ Gate.check(origin, gateSlots[i], args_i) passed
  validUntil: uint64  // unix seconds (Global.latestTimestamp + passTtl at refresh)
  funder: Account     // paid the box MBR; refunded on close
}

type FeeTier = {
  minPower: uint64
  minImpact: uint64
  gateMask: uint64    // every bit in the mask must be set in pass.gates
  discountBps: uint64 // discount on the running fee, <= schedule.maxDiscountBps
}

type FeeSchedule = {
  floorFeeBps: uint64          // a discount never takes the fee below this (or below the incoming fee if lower)
  maxDiscountBps: uint64       // hard cap, <= 9_000
  impactMaxDiscountBps: uint64 // optional continuous part: impact·this/1000 (Akita's impactRange idea)
  tiers: FeeTier[]             // <= 4, first match wins, sorted by discount descending
}
```

**Why key by the spending account and not by origin?**

- The hot path then needs no origin resolution at all: one box read by
  `ctx.caller`, which the quote reproduces trivially.
- Origin resolution happens once, at refresh.
- A wallet that trades from several spending accounts (main address and plugin
  escrows) holds one pass per account. The router plugin can refresh the pass
  for the spending account it is about to use.

**MBR.**

- Pass box: `2_500 + 400·(33 + 64) = 41_300 µALGO`, paid by the funder and refunded on close.
- Schedule box (4 tiers, about 140 bytes ARC-4): `≈ 2_500 + 400·(9 + 140) ≈ 62_100 µALGO`, funded through F6.

### A5.2 Measuring (`refresh`)

```ts
/** Create a pass (pays MBR) */
openPass(mbr: gtxn.PaymentTxn, spender: Account, measure: uint64, gateArgs: bytes[][]): FeePass
/** Re-measure an existing pass */
refresh(spender: Account, measure: uint64, gateArgs: bytes[][]): FeePass
/** Measure gate slot `slot` from an outer-group Gate.mustCheck txn instead of an inner Gate.check (top-level only) */
refreshFromGate(gateTxn: gtxn.ApplicationCallTxn, spender: Account, slot: uint64): FeePass
/** Delete a pass; anyone after expiry, the spender or funder at any time; refunds funder */
closePass(spender: Account): void
```

`measure` is a bitmask: `MeasurePower = 1`, `MeasureImpact = 2`,
`MeasureGates = 4`. Fields that are not measured are written as `0`, so a pass
is always one consistent snapshot. Clients choose a mask to keep resources
lean; for example, a pool with only power tiers needs only `MeasurePower`.

Sketch:

```ts
private measure(spender: Account, measure: uint64, gateArgs: bytes[][], funder: Account): FeePass {
  const dao = this.akitaDAO.value
  ensureBudget(MeasureBudget, OpUpFeeSource.GroupCredit)

  // origin (ACC-01-fixed helper: non-genuine wallets resolve to Application(0))
  const wallet = getWalletIDUsingAkitaDAO(dao, spender)
  const origin = originOr(wallet, spender)
  const validUntil: uint64 = Global.latestTimestamp + this.passTtl.value

  let power: uint64 = 0
  if ((measure & MeasurePower) !== 0) {
    // 0 unless the lock expires after validUntil: an unlockable stake can never ride a live pass
    power = getStakingPowerThrough(getAkitaAppList(dao).staking, origin, getAkitaAssets(dao).akta, validUntil)
  }

  let impact: uint64 = 0
  if ((measure & MeasureImpact) !== 0) {
    impact = getUserImpact(dao, origin)
  }

  let gates: uint64 = 0
  if ((measure & MeasureGates) !== 0) {
    const slots = clone(this.gateSlots.value)
    loggedAssert(gateArgs.length === slots.length, 'errGfArgs')
    for (let i: uint64 = 0; i < slots.length; i += 1) {
      if (slots[i] !== 0 && gateCall(dao, origin, slots[i], gateArgs[i])) {
        gates = gates | op.shl(1, i)
      }
    }
  }

  return { power, impact, gates, validUntil, funder }
}
```

**Who may refresh** (this prevents downgrade griefing):

- A deterministic measure, such as power, impact or a gate without args,
  returns the same value whoever sends it.
- A gate that takes caller-supplied args, such as a merkle proof, can be
  "refreshed" with empty args by a third party. That would clear a user's bit.
- So `refresh` of a **live** pass requires `Txn.sender ∈ {spender,
  pass.funder}`. Anyone may refresh, re-open or close an **expired** pass.
- A wallet's spending account can send `refresh` through its plugin, because
  the account is rekeyed to the plugin.

**Conservative staking power.** `getStakingPowerThrough(…, validUntil)`
returns 0 when the lock ends before the pass does. Power decays linearly with
the remaining lock days, so the cached value overstates true power by at most
`amount·ttlDays/365`. With a 1-day TTL that error is negligible. If tier edges
need to be exact, compute power at `validUntil` instead
(`remaining = expiration − validUntil`); it is a two-line variant.

**`refreshFromGate`.**

- Reuses the repo's `gateCheck(gateTxn, dao, origin, gateSlots[slot])` pattern:
  `Gate.mustCheck(origin, id, args)` in the same **outer** group.
- No inner gate call is needed, and the gate's opcode budget comes from its
  own txn.
- It only works when `refresh` itself is a top-level txn.
- It **sets** one bit on a live pass without extending `validUntil`, so a stale
  bit can never outlive the pass.

### A5.3 Pricing (hot path)

The hook subscribes to `BeforeSwap | Quote`, plus `AfterInitialize` when F6 is
available. Its only permission is `DynamicFee`.

```ts
akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
  requireDexCaller(this.dex.value)
  if (ctx.point === HookPointAfterInitialize) {
    this.initSchedule(ctx.poolId, ctx.data)   // F6 data, or copy defaultSchedule
    return passResult()
  }

  const [pass, hasPass] = this.passes(ctx.caller).maybe()
  if (!hasPass || pass.validUntil < Global.latestTimestamp) return passResult()
  const [sched, hasSched] = this.schedules(ctx.poolId).maybe()
  if (!hasSched) return passResult()

  let discount: uint64 = 0
  for (let i: uint64 = 0; i < sched.tiers.length; i += 1) {
    const t = clone(sched.tiers[i])
    if (pass.power >= t.minPower && pass.impact >= t.minImpact && (pass.gates & t.gateMask) === t.gateMask) {
      discount = t.discountBps
      break
    }
  }
  const curve: uint64 = op.divw(...op.mulw(pass.impact > 1000 ? 1000 : pass.impact, sched.impactMaxDiscountBps), 1000)
  if (curve > discount) discount = curve
  if (discount > sched.maxDiscountBps) discount = sched.maxDiscountBps
  if (discount === 0) return passResult()

  let fee: uint64 = ctx.feeBps - op.divw(...op.mulw(ctx.feeBps, discount), BpsDivisor)
  const floor: uint64 = sched.floorFeeBps < ctx.feeBps ? sched.floorFeeBps : ctx.feeBps
  if (fee < floor) fee = floor
  return { flags: HookResultSetFee, feeBps: fee, hookFee: 0 }
}
```

Properties:

- **The hook can only lower the running fee** (`fee ≤ ctx.feeBps`). It cannot
  be used to raise fees, so it is LP-safe apart from the discount the pool
  creator chose, which is visible and immutable per pool.
- **Composition is by stack order.**
  - It discounts whatever the earlier hooks set (`ctx.feeBps`).
  - Put it **before** fee-raising hooks whose floor must hold, such as
    `AntiSnipeFeeHook`, which takes `max(ctx.feeBps, decay)`.
  - Put it **after** `ImpactFeeHook` if the discount should apply to the
    impact-adjusted fee.
- **The protocol fee follows.** The DEX's protocol share is a percentage of the
  LP fee, so the DAO's cut shrinks proportionally. That is intentional and
  matches the "stakers pay less" framing. If the DAO wants discounts to come
  only from the LP portion, that needs a core change; not proposed.

**Schedule source and mutability.**

- **With F6:** the schedule is decoded from `ctx.data` at `AfterInitialize`,
  validated, and written once. It is immutable.
- **Without F6:** `configurePool(poolId, schedule)` is callable only by
  `PluginDex.getPool(poolId).creator`, read with an inner `abiCall`. This works
  because `configurePool` is not on the DEX call stack. It is allowed only
  while `lpSupply == 0`, so LPs always see the schedule before they deposit.
- **DAO-mutable parts:** `gateSlots` (which gate each bit means), `passTtl` and
  `defaultSchedule`, which applies only to future pools. The DAO already holds
  equivalent power, since it approves hooks and pauses pools.

### A5.4 Example schedule

Tiers are first-match. An "or" is expressed as two tiers with the same discount.

| Tier | Condition | Discount |
|---|---|---|
| 1 | power ≥ 1,000,000 AKTA·(remainingDays/365) | 50% |
| 2 | impact ≥ 800 | 50% |
| 3 | power ≥ 250,000 **and** gate slot 0 (Akita subscriber) | 30% |
| 4 | impact ≥ 500 | 15% |
| (continuous) | `impactMaxDiscountBps = 1_000` gives impact·10%/1000 | ≤ 10% |

Note on units: staking power is in AKTA base units, weighted by remaining lock
time (`getStakingPowerThrough`). Impact is on the 1..1000 scale (`MAX_IMPACT`).

## A6. Costs

| Path | Inner txns | Opcodes (estimate) | Resources | Depth |
|---|---|---|---|---|
| `BeforeSwap` / `Quote` | 0 beyond the DEX → hook call | about 200 (ctx decode, 2 box reads, ≤4 tier checks) | 2 box refs on the hook app (`'p'+caller`, `'s'+poolId`) | DEX+1 |
| `refresh` with power only | 2 (factory get, staking getInfo) | about 400 | DAO, factory (+16-byte box), wallet, wallet factory, staking (+stake box) | 1 |
| `refresh` with impact | +1, then 3 to 4 nested | about 1,500 or more (op-up) | +impact, social, subscriptions, NFD, AKTA asset and holding, related boxes | 4 |
| `refresh` with gates | +1 per slot, about 2 per filter | `Gate` op-ups | +gate, gate registry box, sub-gates and their registries | 4 |

On resource refs: simulate-based `populateAppCallResources` handles `refresh`.
For the hot path, the 2 box refs have to be attached to the outer swap or route
txn. `ARCHITECTURE.md` already notes that algokit's auto-population regroups
`swapRoute` incorrectly, so the router or SDK should add these refs explicitly
(`boxReferences: [{appId: gatedHook, name: 'p'+caller}, …]`).

## A7. Quote consistency

- `BeforeSwap` and `Quote` run the same code over the same pass, keyed by
  `ctx.caller`, at the same `latestTimestamp` when they share a group or block.
  The fee is therefore identical.
- Nothing is written on the swap path, so a quote followed by a swap in the
  same group agrees. The optional volume cap in A10 adds a write at
  `BeforeSwap`; a later quote then correctly reflects the *next* swap.
- **The single requirement is that the quote's sender is the trader's spending account.**
  - **Off-chain** `simulate`: set `sender = spending account`. Simulate does not need signatures.
  - **The router plugin** holds the rekeyed spending account during execution, so it can send `quote` as an inner app call with `sender: spendingAccount`.
  - **Any other contract** cannot. **F7** adds `trader: Account` to `quote` and `quoteRoute`, with zero meaning `Txn.sender`, and passes it as `ctx.caller`. This is safe because `Quote` is side-effect-free and custody is never granted there. Coordinate with the router track.

## A8. ABI summary

```
create(dex: uint64, akitaDAO: uint64, passTtl: uint64)                      // onCreate
akitaDexHook(dex: uint64, hookIndex: uint64, ctx: HookContext): HookResult
openPass(mbr: pay, spender: address, measure: uint64, gateArgs: byte[][][]): FeePass
refresh(spender: address, measure: uint64, gateArgs: byte[][][]): FeePass
refreshFromGate(gateTxn: appl, spender: address, slot: uint64): FeePass
closePass(spender: address): void
configurePool(poolId: uint64, schedule: FeeSchedule): void                 // only without F6
setGateSlots(slots: uint64[]): void                                         // DAO wallet only
setPassTtl(ttl: uint64): void                                               // DAO wallet only, bounded [1h, 7d]
setDefaultSchedule(schedule: FeeSchedule): void                             // DAO wallet only
@readonly getPass(spender) / getSchedule(poolId) / previewFee(poolId, caller, feeBps)
```

The approval is `setHookApproval(gatedHook, HookPermDynamicFee)`. Pools
install it as `{app, points: BeforeSwap|Quote|AfterInitialize, perms:
DynamicFee}`. `validateHooks` already forces `Quote` whenever a pricing
permission is combined with `BeforeSwap`.

The code is immutable: no update method, like the existing hooks. Only the
configuration listed above can be changed.

## A9. DAO and SDK wiring

- **Deploy** with `akitaDAO` = the DAO app and `dex` = PluginDex. Fund the app
  account with base MBR, plus `defaultSchedule` MBR if per-pool funding (F6) is
  not available.
- **DAO proposal:** `setHookApproval(gatedHook, DynamicFee)` from the DAO
  wallet, which is the PluginDex admin.
- **Gate slots:** register gates through `Gate.register` using the existing
  sub-gates, for example `StakingPowerGate (op ≥, akta, P)`,
  `SocialImpactGate (≥, I)`, `SubscriptionGate` or `AssetGate (AKC)`. Then
  `setGateSlots([...ids])`. Note: gate v2 ids start at 2^32 (fix plan SG-A),
  which is fine for `uint64`.
- **SDK:**
  - `ensureFeePass(spender)` checks `getPass` and appends
    `openPass`/`refresh` when the pass is missing or expires within N seconds.
  - The router and swap builders add the two box refs.

## A10. Security analysis

| Risk | Status |
|---|---|
| **Origin spoofing** (a fake wallet app claiming a whale's `controlled_address`) | Closed by the ACC-01 wallet-creator check (A3). A required test. |
| **Stale advantage** (a stake unlocks, or impact drops, after refresh) | Bounded by the TTL. A lock must outlive `validUntil` (`getStakingPowerThrough`). Impact can drop through lost subscription, negative votes or sold AKTA, at most until the TTL ends. Default TTL is 1 day. |
| **Flash measures** | Lock power cannot be flashed. Impact's staking part needs soft-stake weighted age, also not flashable. Impact's *held AKTA* part (≤ 50/1000) **can** be flashed by buying AKTA, refreshing and selling. Set impact tiers with that 50-point slack in mind. |
| **Discount laundering** (a high-tier account runs a public swap proxy, or a `CallerTypeGlobal` plugin, and resells its discount) | Inherent to identity-based discounts. Optional mitigation: `maxDiscountedSwapsPerDay` in the pass. `BeforeSwap` increments a counter; `Quote` reads it and gives no discount past the cap. It is count-based because hooks cannot price amounts across assets. Default off. |
| **Griefing** (refresh with bad args, junk passes) | Live passes can only be refreshed by the spender or funder. A junk pass costs its creator MBR, and the spender can always refresh it. |
| **Liveness** | The hot path never reverts on missing state; it passes instead. A malformed schedule is rejected at init. A paused pool still offers `emergencyRemoveLiquidity`. |
| **Fee raising** | Impossible: `fee ≤ ctx.feeBps`. |
| **Admin power** | The DAO can redefine gate slots and the TTL. It cannot change any pool's schedule or discount caps. |

## A11. Open questions for Kyle

> **Moved:** tracked in `OPEN-DECISIONS.md` (the defaults are implemented).

1. **Origin = wallet `controlled_address`**, consistent with gates elsewhere. Stakes or impact held by a wallet *escrow* then do not count. OK?
2. **TTL default.** 1 day (frequent refreshes, tight) or 7 days (cheaper, looser)?
3. **Discount scope.** Should it come out of the LP fee only, or LP fee plus protocol share (current behaviour)?
4. **Laundering.** Ship the volume cap in v1?

## A12. Test plan (`plugin-dex/hooks/gated-fee.e2e.spec.ts`)

Fixtures, following `gates/staking-power-gate.e2e.spec.ts`:

1. **Staking and gates.** Deploy `Staking` with `akitaDao 0` and call `init`.
   Deploy `EscrowFactory` (`tests/fixtures/escrow.ts`). Deploy `Gate`
   (`tests/fixtures/gates/gate.ts`, `akitaDao 0`; `check` never reads the DAO).
2. **Impact.** Use a `MockSocialImpact` test contract (new, under
   `plugin-dex/tests/`) exposing `getUserImpact(address)uint64` with a setter.
   `getUserImpact` is called through the DAO's `sal.impact`, so the mock is
   ABI-compatible. The real `AkitaSocialImpact` needs the whole social stack;
   it gets one smoke test via `buildAkitaUniverse`.
3. **DAO.** `deployAkitaDAO({ apps: { staking, gate, escrow, impact: mockImpact, wallet: walletFactoryOrMock } })`.
   `akta = 0`, so lock-stake **ALGO** (asset 0) exactly as the staking-power
   gate test does.
4. **Sub-gate.** `deployStakingPowerGate({ akitaDao: dao })`, then
   `Gate.register` a filter, then `setGateSlots([id])`.
5. **Wallet stand-in.**
   - The origin path needs an app that `register`s in the factory and has a
     `controlled_address` global. Use a `MockWallet` test app (new) that is
     **created by a `MockWalletFactory`** whose id is set as `AkitaAppList.wallet`.
   - Add a second, **foreign** `MockWallet` that is not created by the factory,
     for the spoofing test.
   - The `MockWallet.swap(...)` method calls PluginDex from its own address, so
     `ctx.caller` is the wallet address.
   - One integration test uses a real ARC-58 wallet with `test-proxy-rekey`
     through `buildAkitaUniverse` once the router plugin exists.
6. **Time.** `TimeWarp.timeWarp(seconds)` from `tests/utils/time.ts` handles
   TTL expiry.

Cases:

| # | Case | Expected |
|---|---|---|
| T-1 | No pass | fee = pool fee; quote == swap |
| T-2 | EOA with lock power ≥ tier, `openPass(MeasurePower)` | discounted fee; `quote(trader)` == `swap`; LP fee math matches `expectedOut` with the discounted bps |
| T-3 | Lock expires before `now + TTL` | power = 0, no discount |
| T-4 | TTL elapsed (`timeWarp`) | no discount; anyone can `closePass`, and MBR is refunded to the funder |
| T-5 | Live pass, third party calls `refresh` | rejected (`errGfAuth`); spender and funder are allowed |
| T-6 | Impact tier (mock = 800) | 50% tier; continuous curve below a tier |
| T-7 | Gate slot tier (staking-power gate) | the bit is set by `refresh` and by `refreshFromGate` (outer `Gate.mustCheck`) |
| T-8 | `MockWallet` (genuine) trading, power held by its `controlled_address` | discount applies via the origin |
| T-9 | **Foreign `MockWallet`** registered in the factory with `controlled_address = staker` | origin falls back to the foreign wallet itself, no discount (ACC-01 regression) |
| T-10 | Stack `[ImpactFee, GatedFee]` vs `[GatedFee, AntiSnipe]` | ordering semantics as specified |
| T-11 | Discount never raises the fee; floor respected; `maxDiscountBps` cap | — |
| T-12 | `swapRoute` across a gated and an un-gated pool | `quoteRoute(…, trader)` == route output |

---

# Part B: creator-token launch

## B1. Phases

```
launch ──▶ BONDING (VCPMM pool, virtual offsets, LP locked, single-sided)
             │  anti-snipe fee decays from startRound
             │  creator tax (LaunchTaxHook) on every swap
             │  realReserveALGO >= graduationThreshold
             ▼
          graduate(poolId)  [permissionless; frontend appends it to the crossing swap; keeper bounty]
             │  top up the token side from the graduation reserve so price is continuous,
             │  burn the excess, retire the virtual offsets
             ▼
          NORMAL (same pool id, plain CPMM, locked launch LP stays locked forever,
                  open LP adds/removes, same hook stack (anti-snipe long since decayed))
```

## B2. Bonding-curve math (VCPMM)

> **Outdated (as built):** graduation uses `target = ceil(r_q·e_t/e_q)` and books the quote surplus as protocol fees (FINAL-SPEC §10 A16, A17).

Notation:

- Real reserves `rA` (ALGO) and `rB` (token).
- Virtual offsets `vA`, `vB`.
- Effective reserves `eA = rA + vA`, `eB = rB + vB`.
- Invariant `k = eA·eB`.
- Swaps use today's `swapMath` on `(eIn, eOut)`, with one extra rule:
  **`amountOut < rOut` (the real reserve)**.

Launch parameters:

- Total supply `T`; curve allocation `S` (initial `rB`).
- Graduation reserve `M = T − S` (plus an optional creator vesting allocation,
  outside this math).
- `rA₀ = 0`.

Facts, ignoring fees:

- Initial price `P₀ = vA/(S+vB)` ALGO per token.
- All of `S` is sold when `rB = 0`, which gives `rA_max = vA·S/vB` and final
  price `P_f = (rA_max+vA)/vB`. The price multiple is `((S+vB)/vB)²`.
- Tokens needed for a continuous price at graduation:
  `d = (rA·vB − rB·vA)/(rA+vA)`. This is increasing in `rA` and decreasing in `rB`.
- At `rB = 0` it equals `S·vB/(S+vB)`, independent of `vA`. Choosing
  `M = S·vB/(S+vB)` makes the graduation reserve exactly sufficient, which is
  pump.fun's design.

A pump.fun-shaped worked example in ALGO (`T = 1e9`, `S = 793.1M`,
`vB = 279.9M`, `vA = 10,000 ALGO`):

| | Value |
|---|---|
| M = S·vB/(S+vB) | 206.886M (use 206.9M) |
| P₀ / initial mcap | 9.32e-6 ALGO / 9,320 ALGO |
| rA_max / final mcap | 28,335 ALGO / 136,960 ALGO (14.7×) |
| Threshold G = 0.98·rA_max | 27,768 ALGO, with rB ≈ 4.20M left on the curve |
| d at G | 204.68M; excess burned 2.22M; post-graduation price = curve price at G = 1.3294e-4 ALGO/token, so mcap 132,941 ALGO |

**Fees and wash trading** push the state above the fee-less curve. For a fixed
`rA` that only lowers `d`, but they can let `rA` exceed `rA_max`. Graduation
therefore **enforces exact price continuity whichever side is short**:

- If `d ≤ M`, deposit `d` tokens and burn `M − d`.
- If `d > M`, deposit all of `M` and move the surplus ALGO
  `rA − (rB+M)·eA/eB` out of reserves to the treasury.

Either way the post-graduation price equals the last curve price, so a
graduation trigger cannot be sandwiched for a price jump. Precision: everything
is computed with `mulw/divw` (`eA·eB` reaches about 1e25, beyond 64 bits).
Round `d` up and the ALGO surplus down, against the caller.

## B3. Why today's core cannot do this

| Requirement | Today |
|---|---|
| Price from virtual reserves | `swapMath` uses real reserves only |
| Token-only initial deposit | `addLiquidity` requires both deposits > 0 (`readDeposit`) and mints `sqrt(a·b)` |
| LP that cannot be pulled (rug-proof) | LP is always transferred to the depositor |
| Anti-snipe fees of 30 to 90% | `DynamicFee ≤ MaxFeeBps` (10%) globally |
| Per-pool hook configuration (tax owner, decay parameters, schedule) with a multi-tenant hook | `AfterInitialize` receives `data = ''`, and hooks cannot be funded for boxes or opt-ins |
| Tax only on buys, or sell tax paid in ALGO | `HookFee` is on input only, at `BeforeSwap` |
| Graduation/migration | No primitive. A custody hook cannot do it (§B7.3). |

## B4. Core features required (input to the curve-module refactor)

> **Outdated (as built):** F1-F8 are built as amended (F2 subtracts no MinimumLiquidity and keeps M in `lockedA/B`; F4 per FINAL-SPEC §10 A16-A18); F9 and F10 are not built.

| ID | Feature | Design | Priority |
|---|---|---|---|
| **F1** | **VCPMM pool type** | Per-pool `virtualA`, `virtualB` (immutable except F4). Pricing uses effective reserves, and outputs are bounded by real reserves. The custody k-guard checks `(rA'+vA)(rB'+vB) ≥ (rA+vA)(rB+vB)`; `applyDelta` already enforces real ≥ 0. `HookContext.reserveIn/Out` should carry the **effective** reserves, which `ImpactFeeHook`-style hooks price against; add real reserves as extra fields if hooks need them. In the curve-module refactor this is either "CPMM with optional offsets" or its own module whose `invariant()` and `maxOut()` the guard calls. | Must |
| **F2** | **Locked single-sided initialization** | `initializeLaunch(deposit, poolId, graduationDeposit)`, creator only, `lpSupply == 0`, VCPMM only. Requires `eA·eB > 0` from the offsets. Mints `L₀ = sqrt(eA·eB)`, of which `MinimumLiquidity` is burned as today and **the rest is never transferred** (`PoolInfo.lockedLp += L₀ − MinimumLiquidity`, held by the DEX app). `graduationDeposit` (M tokens) stays in the escrow **outside reserves** (`PoolInfo.graduationReserveB`) and is protected by the same booking as protocol fees. | Must |
| **F3** | **No LP operations while offsets are active** | `addLiquidity` and `removeLiquidity` revert while `virtualA \| virtualB ≠ 0`. This is a core rule, not a hook: pro-rata LP math against virtual reserves is undefined when `rA = 0`, and safety must not depend on the hook configuration. Paused-pool `emergencyRemoveLiquidity` is also blocked, since no transferable LP exists. | Must |
| **F4** | **`graduate(poolId)`** | Permissionless. Requires `rA ≥ pool.graduationThreshold`. Computes `d` (B2), moves `min(d, M)` into reserves, burns the token excess (see below) or moves the ALGO surplus to the treasury, sets offsets to 0, emits `GraduationEvent`. After this the pool is a plain CPMM; `lockedLp` remains locked forever. Idempotent: it reverts if the offsets are already 0. | Must |
| **F5** | **Per-pool fee cap** | `PoolInfo.maxDynamicFeeBps` (default `MaxFeeBps`, VCPMM pools up to 9_000), chosen at creation and checked in `runHooks` instead of the global constant. | Must for anti-snipe |
| **F6** | **Hook init data and funding** | `createPool(…, hookInit: {data: bytes, funding: uint64}[])`, aligned with `hooks`. Before `AfterInitialize`, the DEX pays `funding` µALGO from the creation payment to each hook app and passes `data` as `ctx.data`. `required` includes the sum of the funding. This lets **multi-tenant hooks** (Gated, AntiSnipe, LaunchTax) set per-pool configuration once, with no admin approval per creator. | Must (strongly recommended for Part A as well) |
| **F7** | **`quote(poolId, assetIn, amountIn, trader)`** and `quoteRoute(…, trader)` | `trader == zero` means `Txn.sender`. | Should |
| F8 | Output-side hook fee | `HookResult.outFeeBps` returned at `BeforeSwap`/`Quote`. The DEX takes it from `amountOut` after the math and pays the hook in `assetOut`. This allows a sell tax paid in ALGO, and quotes stay exact. | Could |
| F9 | Fee claim on locked LP | Uniswap-v2 `_mintFee` style. Track `kLast` for the locked position; let `pool.feeRecipient` (set at creation, for example the creator) withdraw the `1 − sqrt(kLast/k)` share of the locked LP's value. This is the creator's ongoing income without unlocking principal. | Could |
| F10 | Close/delist | Remove a pool from `pairPools` and mark it closed, so on-chain routers do not quote a dead pool and revert. Needed only for the migrate alternative (B7.2). | Could |

**Burning.** Algorand has no ASA burn for a supply the creator does not hold.
Options:

- Send to the ARC-54 burn address, if the DAO adopts one.
- Keep the excess in the escrow as `burnedB`, outside reserves. Custody
  bookkeeping already protects funds outside reserves.
- Since `LaunchManager` mints the ASA with no manager, freeze or clawback
  (B6), both are irreversible.

Recommendation: the ARC-54 address when configured, otherwise retain the excess
as `burnedB`.

**Size budget.** PluginDex is about 5.7 KB of 8 KB, and the curve refactor
competes for the same space.

| Feature | Estimate |
|---|---|
| F1 (offsets in math and guard) | 0.15 to 0.25 KB |
| F2 | 0.25 KB |
| F3 | 0.05 KB |
| F4 | 0.35 KB |
| F5 | 0.03 KB |
| F6 | 0.15 KB |
| F7 | 0.03 KB |

The total is about 1.0 to 1.1 KB, which fits only if the curve refactor stays
lean. If it does not fit, F4 can move into an external `LaunchManager` (option
B7.2), which keeps F1 to F3, F5 and F6 in core.

## B5. Launch hooks

All launch hooks are **multi-tenant**: approved once and configured per pool
through F6 `ctx.data` at `AfterInitialize`.

### B5.1 `AntiSnipeFeeHook`

> **Outdated (as built):** FirstLiquidity starts at the first AfterAddLiquidity (no lpSupply test), and an unstarted clock starts at the first BeforeSwap (FINAL-SPEC §10 A35).

- **Permission:** `DynamicFee`. **Points:** `AfterInitialize | BeforeSwap | Quote`, plus `AfterAddLiquidity` for `StartMode.FirstLiquidity`.
- **Per-pool box:**
  `SnipeConfig { startRound, startFeeBps, endFeeBps, mode (Linear | Exponential), duration | halfLife, startMode (Creation | FirstLiquidity), exempt: Account }`.
  - With `startMode = Creation`, `startRound = Global.round` at `AfterInitialize`.
  - With `FirstLiquidity`, it is set at the first `AfterAddLiquidity` where `ctx.lpSupply == ctx.lpAmount + MinimumLiquidity`. This suits ordinary pools created before they are funded.
- **Fee:** `e = Global.round − startRound`.
  - *Linear:* `fee = end + (start−end)·(D−e)/D` for `e < D`, otherwise `end`.
  - *Exponential:* `x₀ = op.shr(start−end, e/H)`, then `fee = end + x₀ − x₀·(e mod H)/(2H)`, a linear interpolation inside each half-life. This is cheap, monotone and stays bounded.
  - It returns `SetFee` with **`max(ctx.feeBps, fee)`**. The hook never lowers a fee, so placing it after `GatedFeeHook` keeps the anti-snipe floor intact.
  - **Exemption:** `ctx.caller == exempt && e == 0` passes. `exempt` is the `LaunchManager`, which lets the disclosed dev buy in the launch group (B6) skip the fee.
- **Where the fee goes:** to **reserves** as an LP fee, not to the creator.
  - A fee paid to the creator would let the creator snipe their own launch for free.
  - During bonding, reserve fees deepen the pool and are locked forever (the launch LP is locked). They therefore benefit every holder.
  - The protocol share (`protocolFeeBps`) applies, which is DAO revenue from snipers.
- **Example:** `start 50%`, `end 1%`, `H = 4 rounds` gives r0 50%, r4 25.5%,
  r8 13.25%, r20 ≈ 2.5%, r40 ≈ 1.04% (about 2 minutes at 2.8 s per round).
- **Determinism:** depends only on `Global.round`, so a quote and a swap in the
  same group agree. Requires **F5** (`maxDynamicFeeBps ≥ startFeeBps`).
- **Snipers in the same round:** a buy that lands in the launch round gets
  `e = 0`, which is the maximum fee. Algorand has no fee-priority ordering, so
  this is the best snipers can do.

### B5.2 `LaunchTaxHook` (`SwapTaxHook` v2, multi-tenant)

> **Outdated (as built):** sell tax is HookFeeOut paid in the quote asset with AfterSwap accrual, and the hook opts into the quote asset only (FINAL-SPEC §5 WP5b; `../ARCHITECTURE.md` §9).

- **Permission:** `HookFee`. **Points:** `AfterInitialize | BeforeSwap | Quote`.
- **Per-pool box:** `TaxConfig { owner, quoteAsset, buyTaxBps, sellTaxBps, untilRound, accruedQuote, accruedToken }`.
  - `buy` means `assetIn == quoteAsset`.
  - `untilRound = 0` means forever. Otherwise the tax sunsets, a common fair-launch norm.
- **`BeforeSwap`:** returns `hookFee = amountIn·taxBps` and accrues the amount
  to the pool's balance. **`Quote`:** returns the same fee without accruing.
- **`claim(poolId)`:** owner only. Pays out the accrued balances.
- **`AfterInitialize`:** **opts the hook into the token**, paid for by F6
  funding. Without the opt-in, every sell would revert, because the DEX pays
  hook fees in `assetIn`.
- **Caps:** `buyTaxBps, sellTaxBps ≤ pool.maxHookFeeBps ≤ 10%` (DEX-enforced),
  and the hook enforces its own `≤ 5%`.
- **Sells:** default `sellTaxBps = 0`, a buy-only tax paid in ALGO, so the
  creator never accumulates tokens to dump. A sell tax paid in ALGO needs **F8**.
- **Relation to today's `SwapTaxHook`:** one instance per owner with a global
  `owner`. That would need a DAO approval per creator, which does not scale for
  permissionless launches. Keep it for bespoke pools.

### B5.3 Optional: `GatedFeeHook` on launch pools

It discounts the base and post-decay fee for AKTA stakers and high-impact
users, which gives Akita-native traders an edge on launches. Order:
`[GatedFee, AntiSnipe, LaunchTax]`. The gated hook discounts the base fee, then
anti-snipe applies its floor; the tax is independent.

**Inner txns per launch-pool swap:**

- `BeforeSwap`: 3 hook calls, 1 tax payout, plus the swap payout, so about 5.
- `Quote`: 3.

This is well within 16 per call and leaves room in a router group.

## B6. `LaunchManager` (a new app, not a hook)

> **Outdated (as built):** two-phase `createToken`/`launch` with fee and bounty caps, and `graduate` also collects protocol fees (FINAL-SPEC §10 A36). The dev buy (step 5) is built in `launch` with a DAO cap on tokens out (bps of S, ≤ 10%), DAO-bounded vesting and a never-expiring Rewards disbursement; the fee and bounty are paid before the pool is created (FINAL-SPEC §10 A36.1).

`LaunchManager` is the pool creator and controller of every launch. It is
immutable, and the DAO sets its fees.

```
launch(payment, p: LaunchParams): { asset, poolId }
  LaunchParams = { name, unitName, url, totalSupply, curveBps, virtualAlgo, virtualTokenBps,
                   graduationThresholdBps (of rA_max), feeBps, antiSnipe: SnipeConfig,
                   tax: { buyTaxBps, sellTaxBps, untilRound }, gated: boolean,
                   devBuyAlgo (<= cap), devVestSeconds }
  1. mint ASA: total T, decimals 6, manager/reserve/freeze/clawback = zero (fair launch, no rug via ASA admin)
  2. validate params: M >= S·vB/(S+vB), G <= rA_max, devBuy <= cap (e.g. 5% of S at P0)
  3. PluginDex.createPool(pay, ALGO(0), asset, feeBps, maxHookFeeBps = tax cap, hooks = [Gated?, AntiSnipe, LaunchTax],
                          poolType = VCPMM{vA, vB, G, maxDynamicFeeBps = antiSnipe.startFeeBps},
                          hookInit = [schedule?, snipeCfg{exempt = LaunchManager}, taxCfg{owner = creator}])
  4. PluginDex.initializeLaunch(axfer S, poolId, axfer M)          // F2: LP locked in the DEX
  5. optional dev buy: PluginDex.swap(pay devBuyAlgo) in the same round (AntiSnipe exempts LaunchManager at e == 0);
     the tokens go to the creator through Rewards.createInstantAsaDisbursement with timeToUnlock = now + devVestSeconds
     (an existing Akita vesting primitive; see utils/functions.ts createInstantDisbursement)
  6. collect the DAO launch fee (DAO fee config) and store a bounty deposit for graduate()
  7. record Launch { creator, asset, poolId, bounty } and emit LaunchEvent
graduate(launchId): calls PluginDex.graduate(poolId); pays the bounty to Txn.sender if the call succeeded
```

**Call depth and inner-txn count for `launch`:**

- Depth: `LaunchManager`(0) → DEX `createPool`(1) → escrow create, rekey and
  hook `AfterInitialize`(2) → the hook's opt-in(3).
- Inner txns:
  - ASA create: 1.
  - `createPool`: about 9, plus 1 per hook and 1 funding payment per hook.
  - `initializeLaunch`: about 3.
  - Dev buy: about 6.
  - Fee and bounty: about 2.
- That is about 25 to 30, pooled. The `LaunchManager` call needs fee credit,
  for example `coverAppCallInnerTransactionFees`.

**Trust.** With F2, F3 and F4 in core, the safety of a launch **does not depend
on `LaunchManager`**:

- The LP is locked by the DEX.
- No LP operations are possible during bonding.
- Graduation is permissionless.
- Anyone can create a VCPMM pool directly. The worst a hostile creator can do
  is never top up M, in which case the pool stays a bonding curve whose buyers
  can always sell back, because the real ALGO is held by the escrow.

`LaunchManager` adds the fair-launch ASA, parameter validation, vesting, fees
and the bounty.

## B7. Graduation: who triggers it and how liquidity moves

### B7.1 In-place (recommended)

> **Outdated (as built):** the token excess stays locked and the quote surplus goes to protocol fees, not straight to the treasury (FINAL-SPEC §10 A16, A17, A36).

- **Trigger:**
  - Primary: frontends and the router append `graduate(poolId)` to any swap
    whose quote crosses `G`.
  - Fallback: anyone, through `LaunchManager.graduate` for the bounty.
  - An `AfterSwap` hook **cannot** trigger graduation, because the DEX is on the
    call stack and re-entry is forbidden.
- **Liquidity movement:** none. The graduation reserve is already in the
  escrow. `graduate` re-books it into reserves (`rB += min(d, M)`), burns the
  excess or moves the ALGO surplus to the treasury, and zeroes the offsets.
- **LP:** `lockedLp` stays locked in the DEX forever. After graduation, outside
  LPs add pro-rata, as in a standard CPMM.
- **Between crossing and graduation:** trading continues on the curve, and the
  continuity rule in B2 keeps graduation fair whenever it happens. Halting
  trading at `G` is not needed.
- **Advantages over migrating:**
  - The pool id, `pairPools` entry, escrow, hook stack, LP asset and router
    state all stay the same.
  - No second escrow MBR.
  - No window during which liquidity is in transit.

### B7.2 Alternative: migrate to a new pool

Use this only if the curve refactor makes pool types immutable or core size is
too tight for F4.

1. `LaunchManager` must hold **transferable** LP. F2 is then replaced by
   "VCPMM pools may only be created by admin-approved controllers". Without
   that rule, a creator-held LP is a rug.
2. `graduate`, top-level:
   - `removeLiquidity(all)` from the bonding pool (F3 exempts the controller).
   - `createPool(CPMM, …)`.
   - `addLiquidity` at the curve price, depositing `rA` and `d` tokens from M
     and burning the rest.
   - Lock the new LP: hold it forever with no withdraw path, or send it to the
     DEX app address, where it rejoins unissued supply but stays counted in
     `lpSupply`, so it is economically burned.
3. The old pool keeps the `MinimumLiquidity` dust and must be **closed/delisted
   (F10)** so on-chain routers enumerating `pairPools` do not revert on its
   quote.

Cost: 2 escrows, about 2× the MBR, a router migration, and trust in an approved
controller.

### B7.3 Why a custody hook cannot do the migration

- The DEX books every balance change made under custody against reserves.
  Moving reserves to another escrow is a reserve loss, so it fails
  `errCustodyInvariant`.
- The hook cannot call `createPool` or `addLiquidity`, because PluginDex is on
  the call stack (no re-entry).
- Funds that arrive in another pool's escrow are not credited to that pool's
  reserves except through `addLiquidity`, or through custody on *that* pool.

### B7.4 Option C, noted for the DLMM track

A launch can instead be **single-sided token liquidity in DLMM bins** above the
start price, locked: Meteora-style launch pools.

- With this approach there is no graduation and no virtual reserves. ALGO
  accumulates in lower bins as people buy.
- Trade-offs: bin math and the UX differ from pump.fun-style launches (there is
  no "graduated" moment). Anti-snipe and tax hooks are unchanged.
- Worth revisiting once the bin pool type exists. VCPMM is simpler for v1.

## B8. Security analysis (launch)

| Vector | Mitigation |
|---|---|
| Creator pulls liquidity (rug) | F2 (LP never issued) and F3 (no remove during bonding). After graduation the launch LP is still locked. |
| ASA admin rug (clawback, freeze, re-config) | `LaunchManager` mints with zero manager, freeze, clawback and reserve. A direct VCPMM creator using their own ASA is visible on-chain, and the UI should warn. |
| Creator self-snipe | Anti-snipe fees go to reserves, not to the creator. The dev buy is capped, disclosed, in the launch group and vested. |
| Tax recipient dumps tokens | Buy-only tax by default (paid in ALGO). A sell tax paid in ALGO needs F8. |
| Selling tokens that were never on the curve (from M or dev allocations) | Output is bounded by the real reserve (F1). M sits outside reserves until graduation, and dev tokens are vested. |
| Graduation sandwich or price jump | Exact price continuity: the excess side is burned, or sent to the treasury. |
| Graduation never happens | Permissionless, with a bounty and frontend auto-append. Before graduation the pool is still fully tradable. |
| Dead pool breaks on-chain routers | In-place graduation keeps the pool alive. Under migration, F10 delists. |
| Hook liveness (tax hook not opted in, so sells revert) | The opt-in happens at `AfterInitialize`, funded by F6. A test covers it. |
| Fee cap abuse (a 90% fee forever) | `AntiSnipeFeeHook` enforces `endFeeBps ≤ 1_000` and a bounded decay (`duration` or `64·H ≤ maxRounds`). The DEX enforces the per-pool `maxDynamicFeeBps` chosen at creation. |
| Custody hooks on launch pools | `LaunchManager` never installs custody hooks. A directly created VCPMM pool with custody is still protected by the generalized k-guard (F1). |

## B9. Test plan (`plugin-dex/launch.e2e.spec.ts`, after F1 to F6 land)

The setup reuses the PluginDex spec: `algorandFixture`, `TimeWarp` for rounds,
and test ASAs. A full `LaunchManager` test needs `deployAkitaDAO` for fees and
`Rewards` for vesting; tests 1 to 9 do not.

1. VCPMM: `quote == swap` on effective reserves. A buy is limited by the real
   token reserve; selling tokens that were never bought reverts on the real ALGO
   floor.
2. `initializeLaunch`:
   - It mints exactly `sqrt(vA·(S+vB))`.
   - The LP balance of the creator stays 0, and `lockedLp` is recorded.
   - M is held outside reserves (escrow balance = reserves + protocol fees + M).
3. `addLiquidity` and `removeLiquidity` revert during bonding.
4. The custody k-guard uses effective reserves. A mock custody hook trading at
   the curve price passes; a worse price fails.
5. Anti-snipe:
   - Fee values at r0, r4, r8 and r40 match the formula (`warpForwardRounds`).
   - The quote equals the swap in the same group.
   - The exempt caller pays 0 extra at e = 0 only.
   - It never lowers a fee set earlier in the stack.
6. LaunchTax:
   - The buy tax accrues to the pool's box in ALGO and the sell tax is 0.
   - A sell succeeds, because the hook is opted in.
   - `claim` works for the owner only.
   - `untilRound` sunset.
7. Graduation:
   - It reverts below `G`.
   - At `G` it computes `d`, books reserves and burns the excess.
   - Price before equals price after (to 1e-9 relative).
   - The offsets are 0, and a second call reverts.
   - The fee-inflated state (wash-trading loop) takes the `d > M` branch: the
     ALGO surplus goes to the treasury and the price stays continuous.
8. After graduation: an outside LP adds and removes pro-rata, `lockedLp` is
   still unremovable, and swaps match the plain-CPMM `expectedOut`.
9. F6:
   - Each hook receives its `funding` and `data`.
   - `createPool` charges the DEX MBR change plus the escrow funding plus the
     sum of the funding.
   - A hook that rejects bad init data reverts pool creation.
10. `LaunchManager.launch`:
    - Fair-launch ASA flags.
    - Parameter validation (M, G, dev cap).
    - Dev buy vested through Rewards.
    - Bounty paid on `graduate`.

---

# Part C: consolidated core asks and dependencies

> **Outdated (as built):** F1-F8 are built (FINAL-SPEC §4, §10); F9 and F10 are not; the ACC-01 fix is inlined in `hooks/shared/origin.ts` (A32), not in `utils/functions.ts`.

| ID | Needed by | Must/Should/Could | Touches |
|---|---|---|---|
| F1 VCPMM offsets + real-reserve output bound + effective-reserve guard | Launch | Must | curve module (parallel track) |
| F2 Locked single-sided init + graduation reserve outside reserves | Launch | Must | createPool/initialize, `PoolInfo` |
| F3 No LP operations while offsets are active | Launch | Must | add/remove liquidity |
| F4 `graduate` with exact price continuity | Launch | Must (or B7.2) | curve module |
| F5 `maxDynamicFeeBps` per pool | Anti-snipe | Must | `runHooks`, `PoolInfo` |
| F6 `hookInit[] {data, funding}` at createPool | Multi-tenant hooks (Gated, AntiSnipe, LaunchTax) | Must | `createPool`, `AfterInitialize` ctx |
| F7 `trader` arg on `quote`/`quoteRoute` | GatedFee, router | Should | quote paths |
| F8 Output-side hook fee | Sell tax paid in ALGO | Could | `swapCore`, `quoteCore`, `HookResult` |
| F9 Fee claim on locked LP | Creator income | Could | new method |
| F10 Close/delist | B7.2 only | Could | `pairPools` |

Non-core prerequisite: the **ACC-01 origin fix** in `utils/functions.ts`
(`getWalletIDUsingAkitaDAO` wallet-creator check, and the auth-address check
in `originOr` from fix plan SG-F) has to land before `GatedFeeHook` is built,
because the hook inlines that helper at compile time.

New apps, all immutable code:

| App | Kind | Permission | Points |
|---|---|---|---|
| `GatedFeeHook` | hook, multi-tenant | DynamicFee | AfterInitialize, BeforeSwap, Quote |
| `AntiSnipeFeeHook` | hook, multi-tenant | DynamicFee | AfterInitialize, (AfterAddLiquidity), BeforeSwap, Quote |
| `LaunchTaxHook` | hook, multi-tenant | HookFee | AfterInitialize, BeforeSwap, Quote |
| `LaunchManager` | pool creator/controller | — | — |
| Test-only: `MockSocialImpact`, `MockWallet`, `MockWalletFactory` | tests | — | — |
