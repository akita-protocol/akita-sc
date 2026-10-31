# AkitaRouterPlugin: the composed router as an ARC-58 plugin

**Covers:** feature (4) — router plugin, venue adapters (Tinyman v2 first), on-chain hook-aware
quoting, split execution. Touches (3) (backrun hooks reuse the adapter ABI) and (5) (gated
hooks need the swapper's identity).

**Status:** research and design only. No existing source file was changed and nothing in this
document has been compiled or run. Venue facts (Tinyman v2, Pact) are taken from the sibling
track `research/venues.md`, which verified them on LocalNet; PluginDex v2 interfaces are from
`research/design-vault.md`. Where this spec and those docs differ, §13 says so.

Sources read: `arc58/account/contract.algo.ts` (`arc58_rekeyToPlugin`, `assertValidGroup`,
`txnRekeysBack`, `arc58_verifyAuthAddress`, `getAuthAddress`), `projects/akita-plugin/*`,
`utils/functions.ts` (`getSpendingAccount`, `rekeyAddress`, `rekeyBackIfNecessary`,
`getWalletID`/`getOrigin`), `arc58/plugins/haystack-router/*` (+ e2e spec),
`arc58/plugins/test-proxy-rekey`, `arc58/plugins/staking` (abiCall with txn args as the spending
account), `tests/fixtures/abstracted-account.ts`, `tests/fixtures/plugins/{haystack-router,
test-proxy-rekey}.ts`, `tests/wallet-build-usePlugin.e2e.spec.ts`, `akita-sdk/src/wallet/index.ts`
(`prepareUsePlugin`, `usePlugin`, `addPlugin`), `akita-sdk/src/types.ts` (`PluginSDKReturn`),
`plugin-dex/*`, `escrow/contract.algo.ts`, the `akita-arc58-plugin-dev` skill, and the
PuyaTs 1.3.1 type definitions listed in Appendix A.

---

## 0. TL;DR

> **Outdated in parts (as built):** v1 is SANDBOX only (DIRECT reverts, FINAL-SPEC §10 A30), inner txns are pooled at 256 per group (FINAL-SPEC §1), and measured costs are in `../ARCHITECTURE.md` §11.

- **Router = one immutable, adminless ARC-58 plugin** (`AkitaRouterPlugin`). Every swap is one
  outer plugin call that does all of its work in inner transactions while it holds the flash-rekeyed
  spending account `S`. The wallet's `assertValidGroup` only inspects *outer* transactions, so
  this satisfies it by construction (§2, verified against source line by line).
- **Native legs** (PluginDex): inner group `[pay|axfer → pool[0] escrow, appl PluginDex.swapRoute]`.
  The app call is **sent as `S`**, so hooks see the user's wallet as `ctx.caller` (needed by gated
  pools, feature 5). Quotes are sent as `S` too, for the same reason.
- **External legs**: one account-agnostic **VenueAdapter** ABI (`akitaVenueSwap` + `akitaVenueQuote`,
  §4.3) with flash-rekey + `returnTo`. Two custody policies, same ABI:
  - **SANDBOX (default)**: the router's own **leg escrow `E`** (a child `Escrow` app rekeyed to the
    router, exactly like a PluginDex pool escrow) is what gets flash-rekeyed to the adapter. The
    adapter never touches the user's account, so the balance guard is *complete*. Cost: +2 inner txns
    per external leg, and one shared 0.1 ALGO opt-in per asset.
  - **DIRECT (opt-in)**: `S` itself is flash-rekeyed to the adapter, as sketched in ARCHITECTURE §5.
    It is cheaper and preserves identity at the venue. The guard only covers `assetIn`, `assetOut` and
    ALGO, so it needs a registry flag *and* a per-call flag (§6).
- **Approvals** live in a tiny **`VenueRegistry`** app (admin = DAO wallet). Each entry pins the
  adapter's `Application.version`. Entries are global state, so the router and any hook can read them
  with `AppGlobal.getExBytes` and no inner call. That matters because a hook running inside a router
  swap **cannot call the router**, which is on the call stack.
- **Guards**: a per-segment custody guard (auth back, input spent ≤ amount, no ALGO leak), an
  aggregate guard (`Δin ≤ Σ amountIn`, `Δout ≥ minAmountOut`), and in `swapBest` a **quote
  promise**: each executed chunk must deliver ≥ its own on-chain quote, minus a tolerance.
- **Costs** (§8): 5 inner txns for one native hop, 12 for a native+Tinyman split, ≤ 42 for
  4-chunk best-of-3. A 3-transaction wallet group gives 48 inner slots. Depth ≤ 5 of 8. Fee ≈
  0.001 ALGO × (outer + inner txns), paid from the group's fee credit.
- **PluginDex asks** (§13): a non-reverting `tryQuote*` (no try/catch on the AVM), and an explicit
  `swapper` quote argument (already in design-vault §5.3).

---

## 1. The wallet group the router runs in

`WalletSDK.usePlugin` / `prepareUsePlugin` (akita-sdk `wallet/index.ts:110-300`) builds:

```
[0] wallet.arc58_rekeyToPlugin(router, callerType, escrow, methodOffsets, fundsRequest)   // S → rekeyed to router
[1] router.swap(wallet, rekeyBack=true, ...)                                              // the ONLY outer txn the router needs
[2] wallet.arc58_verifyAuthAddress()                                                      // asserts S.authAddress back to expected
[3..] optional carriers: router.opUp() with overflow resource refs (AFTER [2], see §2 rule R3)
```

`S` = `getSpendingAccount(wallet)` reads wallet global `spending_address`. That is:

- `controlledAddress` (normally the wallet app address) when the plugin is installed with escrow `''`
- the ARC-58 escrow's address when it is installed with a named escrow

Inside `[1]`, `S.authAddress == router.address`.

## 2. Wallet constraints vs the router (verified from source)

| # | Wallet rule (`arc58/account/contract.algo.ts`) | Router behaviour | OK? |
|---|---|---|---|
| R1 | `assertValidGroup` (l.484-555) scans **outer** txns `Txn.groupIndex+1 .. groupSize` via `gtxn`. It stops at the first `txnRekeysBack` (l.522). | Inner txns are invisible to `gtxn` in the wallet's frame. All swaps, rekeys and adapter calls are inner, so nothing the router does is inspected. | yes |
| R2 | Each outer appl in the window must have `appId == plugin` (l.531), `appId.version == 0` (l.533), NoOp (l.534), `numAppArgs > 1` and `btoi(appArgs(1)) == wallet` (l.537-538). | The router must **never be updated**: it is immutable and listed in `immutable-catalog.json` with `plugin: true`. Every plugin method takes `wallet: Application` as its first arg. PuyaTs encodes `Application` by value as uint64 (not `resourceEncoding: 'index'`), which is what l.538 expects. | yes |
| R3 | Rule R2 applies to *any* outer app call between `[0]` and the rekey-back. | **Op-up and resource carriers must sit after `[2]` (or before `[0]`).** A `PluginDex.opUp()` inside the window fails with `errCannotCallOtherAppsDuringRekey`. Group resource sharing (AVM v9+) still gives the router the carrier's refs. Test F4 pins this down. | yes, with the carrier rule |
| R4 | Method restrictions: each window appl consumes `methodOffsets[i]` and must match an allowed selector (l.544-548). | The router has two plugin methods (`swap`, `swapBest`). The SDK derives offsets from selectors (`prepareUsePlugin` l.183-200). Several router calls can share one window: earlier calls use `rekeyBack=false`, the last uses `true`. | yes |
| R5 | `arc58_verifyAuthAddress` (l.951) requires `S.authAddress == getAuthAddress()`: zero when `S` is the wallet app address, otherwise the wallet app address. | The router's final inner txn is `rekeyBackIfNecessary(rekeyBack, wallet)`, which rekeys `S → wallet.address`. Rekeying an account to its own address clears auth-addr (AcctAuthAddr reads as zero), which matches both cases. | yes |
| R6 | `useExecutionKey`: `Global.groupId` must be pre-registered (l.488-505). | Carriers are part of the group id. On-chain `swapBest` is what makes pre-signed, execution-key swaps (DCA, agents) useful: the route is chosen at execution time (§5.6). | yes |
| R7 | `coverFees` reimburses only `Txn.fee` of `[0]`, capped at (256+16)×minFee (l.1043-1056). | For reimbursed flows, the SDK puts the group's whole fee on `[0]`. Fee pooling makes the credit available to `[1]`'s inner txns. | yes |
| R8 | Reentrancy: the wallet app is not on the stack during `[1]` (it is a separate outer txn). | The router never needs to call the wallet. An adapter in DIRECT mode *could* (see §9, T7). | n/a |

Conclusion: the router's "everything in inner txns of one outer call" design is compatible with
ARC-58. The only extra rule is R3 (carriers outside the window).

## 3. Accounts and trust

| Account | What it is | Who controls it during a swap | Holds between txns |
|---|---|---|---|
| `S` | user's spending account (wallet address or ARC-58 escrow) | router; in DIRECT mode, briefly the adapter | user funds |
| `E` | router leg escrow (child `Escrow` app, created by the router, rekeyed to the router) | router; in SANDBOX mode, briefly the adapter | MBR and zero-balance opt-ins only (plus donated dust, which is never swept) |
| PluginDex pool escrows | per-pool reserves | PluginDex; briefly custody hooks | pool reserves |
| adapter app | venue glue, no funds | n/a | nothing, ideally |
| venue pool (e.g. a Tinyman lsig pool) | external liquidity | venue app | venue reserves |
| router app | executor | n/a | its own MBR, which covers `E`'s creation |

Trust roots: the **router code** (immutable, audited), **PluginDex** (immutable),
**VenueRegistry admin** (DAO), and each **adapter version** pinned by the registry.

## 4. Contracts and ABI

### 4.1 `AkitaRouterPlugin` (`smart_contracts/arc58/plugins/akita-router/contract.algo.ts`)

`@contract({ avmVersion: 13 })` (the repo already targets 13 in `meta`, `guilds`). Extends
`Contract` (per the plugin skill, not `Plugin`). Immutable: no update method.

```ts
// global state (all fixed at create, except legEscrow which init sets once)
version   = GlobalState<string>({ key: 'version' })
dex       = GlobalState<Application>({ key: 'dex' })        // PluginDex (immutable)
registry  = GlobalState<Application>({ key: 'registry' })   // VenueRegistry
legEscrow = GlobalState<Application>({ key: 'leg_escrow' }) // child Escrow app; 0 until init

@abimethod({ onCreate: 'require' })
create(version: string, dex: Application, registry: Application): void

/** once, permissionless: create E (compileArc4(Escrow)), fund min balance, rekey E to this app.
 *  Charges the measured cost (MBR delta + funding), refunds excess (same pattern as PluginDex.createPool). */
init(payment: gtxn.PaymentTxn): uint64

/** permissionless: opt E into assets; payment must cover n × Global.assetOptInMinBalance (excess refunded) */
optInLegEscrow(payment: gtxn.PaymentTxn, assets: uint64[]): void

/** no-op carrier for opcode budget + resource refs; placed AFTER arc58_verifyAuthAddress */
opUp(): void

// ---- plugin methods: (wallet, rekeyBack, ...) ----
swap(wallet: Application, rekeyBack: boolean, assetIn: uint64, assetOut: uint64,
     minAmountOut: uint64, flags: uint64, legs: Leg[]): uint64          // returns Δout(S)

swapBest(wallet: Application, rekeyBack: boolean, assetIn: uint64, assetOut: uint64,
         amountIn: uint64, minAmountOut: uint64, flags: uint64, chunks: uint64,
         toleranceBps: uint64, candidates: Segment[]): uint64          // returns Δout(S)
```

There are no read-only quote methods. Off-chain quoting simulates the whole wallet group, which is
exact because every quote is deterministic (§10).

### 4.2 Types (`akita-router/types.ts`)

```ts
export type Segment = {
  /** 0 = native PluginDex; otherwise an adapter app id approved in VenueRegistry */
  venue: uint64
  /** asset this segment outputs (the chain is validated by measurement, §5.4) */
  assetOut: uint64
  /** native only: PluginDex pool ids, 1..4 (PluginDex MaxRouteHops) */
  pools: uint64[]
  /** native only: escrow address of pools[0] (PluginDex validates it; zero for adapters) */
  escrow: Account
  /** native: opaque hook data forwarded to PluginDex; adapter: venueData */
  data: bytes
}

export type Leg = {
  amountIn: uint64
  /** per-leg floor (0 = only the aggregate minAmountOut applies) */
  minAmountOut: uint64
  /** 1..MaxSegments, executed in order; segment k's input is segment k-1's measured output */
  segments: Segment[]
}

export type AdapterInfo = {          // VenueRegistry value, 32 bytes
  version: uint64                    // pinned Application.version
  flags: uint64                      // AdapterEnabled | AdapterDirectCustody | AdapterExactQuote
  innerTxns: uint64                  // max inner txns one swap issues (SDK planning, sanity)
  opBudget: uint64                   // opcode budget to ensure before calling it
}

export type RouteEvent = { wallet: uint64, account: Account, assetIn: uint64, amountIn: uint64,
                           assetOut: uint64, amountOut: uint64, legs: uint64 }
export type LegEvent   = { leg: uint64, venue: uint64, holder: Account, assetIn: uint64, amountIn: uint64,
                           assetOut: uint64, amountOut: uint64 }
```

Constants: `MaxLegs = 4`, `MaxSegments = 3`, `MaxCandidates = 4`, `MaxChunks = 4`,
`FlagAllowDirect = 1`, `AdapterEnabled = 1`, `AdapterDirectCustody = 2`, `AdapterExactQuote = 4`,
`NativeSegmentBudget ≈ 800` (tune after measuring).

ABI size: a segment is about 70-110 bytes before `data`, so 4×3 segments fit the 2 KB
application-args limit with small `data`. That is the reason for the caps.

Errors (`errRt*`, 7-byte style like `errPd*`): `errRtCustody` (S not rekeyed to router),
`errRtRoute`, `errRtAdapter` (not approved / disabled), `errRtAdapterVer`, `errRtRekeyBack`,
`errRtOverspend`, `errRtAlgoLeak`, `errRtSlippage`, `errRtQuote`, `errRtDirect`, `errRtFunds`,
`errRtInit`, `errRtNoLiq`.

### 4.3 `VenueAdapter` interface (`smart_contracts/plugin-dex/venues/venue-adapter.ts`)

The argument order matches `venues.md` §4.3. The names are prefixed, mirroring `akitaDexHook`.

```ts
export class VenueAdapter extends Contract {
  /**
   * Exact-input swap of `amountIn` of `assetIn` held by `account` into `assetOut`, delivered to `account`.
   * PRE : account.authAddress == this app; returnTo == Global.callerApplicationAddress.
   * POST: the LAST inner txn rekeys `account` to `returnTo`; nothing leaves `account` except ≤ amountIn
   *       of assetIn; every inner txn uses fee 0 (group credit); output ≥ minAmountOut (else revert).
   * Returns the measured output (informational only; callers measure for themselves).
   */
  akitaVenueSwap(account: Account, assetIn: uint64, amountIn: uint64, assetOut: uint64,
                 minAmountOut: uint64, venueData: bytes, returnTo: Account): uint64 { return 0 }

  /**
   * Deterministic exact-input quote from venue state. Must equal akitaVenueSwap's output in the same state.
   * Never reverts for liquidity or lock conditions: it returns 0 ("leg unavailable"), because the AVM has no try/catch.
   */
  @abimethod({ readonly: true })
  akitaVenueQuote(assetIn: uint64, assetOut: uint64, amountIn: uint64, venueData: bytes): uint64 { return 0 }
}

/** shared adapter prologue */
export function requireVenueCustody(account: Account, returnTo: Account): void {
  loggedAssert(account.authAddress === Global.currentApplicationAddress, 'errVaCustody')
  loggedAssert(returnTo === Global.callerApplicationAddress, 'errVaReturnTo')
}
```

Why `returnTo == Global.callerApplicationAddress` is mandatory: custody can only flow back to the app
that granted it. The adapter holds no funds, so it can then be **permissionless**. Any approved
router, any backrun hook, or a future router version can use it without being allow-listed in the
adapter. Only the granting app's account is ever at risk, and the granting app checks the result.
`venues.md` proposes a caller allow-list instead; both checks can coexist (§13).

### 4.4 `VenueRegistry` (`smart_contracts/plugin-dex/venues/registry.algo.ts`)

```ts
@contract({ avmVersion: 13, stateTotals: { globalBytes: 64, globalUints: 0 } })
export class VenueRegistry extends Contract {
  admin = GlobalState<Account>({ key: 'admin' })              // DAO wallet address
  @abimethod({ onCreate: 'require' }) create(admin: Account): void
  setAdmin(admin: Account): void                              // admin only
  setAdapter(adapter: uint64, info: AdapterInfo): void        // admin only: op.AppGlobal.put(op.itob(adapter), encodeArc4(info))
  removeAdapter(adapter: uint64): void                        // admin only: op.AppGlobal.delete(op.itob(adapter))
  @abimethod({ readonly: true }) getAdapter(adapter: uint64): AdapterInfo
}

/** reader used by the router (and by any hook that calls adapters): zero inner txns */
export function readAdapter(registry: Application, adapter: uint64): AdapterInfo {
  const [raw, exists] = op.AppGlobal.getExBytes(registry, op.itob(adapter))
  loggedAssert(exists, errRtAdapter)
  const info = decodeArc4<AdapterInfo>(raw)
  loggedAssert((info.flags & AdapterEnabled) !== 0, errRtAdapter)
  loggedAssert(Application(adapter).version === info.version, errRtAdapterVer)
  return info
}
```

- Capacity: 63 adapters (64 byte-slice slots minus `admin`). Key 8 bytes + value 32 bytes fits the
  128-byte limit. Creator MBR ≈ 0.1 + 64 × 0.05 = 3.3 ALGO.
- **Version pin.** If an adapter is updated after approval, its `version` changes and every router
  call to it fails until the DAO re-approves it. Defence in depth: the router also sets
  `rejectVersion: info.version + 1` on the inner appl (itxn field exists in 1.3.1, AVM ≥ 12; same
  mechanism as design-vault §0).
- **Why a separate app and not router boxes:**
  - (a) the router stays adminless and immutable;
  - (b) global state can be read cross-app with no call, which matters because a hook inside a router
    swap cannot call the router (it is on the stack);
  - (c) several router versions can share it.

  Boxes plus AVM-13 `appForeignBoxReads` would also work, but nothing else in the repo relies on that
  yet.
- Approval flow: DAO proposal → DAO wallet calls `setAdapter`, the same pattern as
  `PluginDex.setHookApproval`. Checklist before approving:
  - immutable or version-pinned code
  - `requireVenueCustody` prologue present
  - every inner txn has fee 0
  - rekey back on the last inner txn
  - quote/swap exactness tests
  - documented `innerTxns` and `opBudget`

### 4.5 `TinymanV2Adapter` (`smart_contracts/plugin-dex/venues/tinyman-v2-adapter.algo.ts`)

Venue facts come from `venues.md` §1, which verified them on LocalNet.

- Mainnet app `1002541853`, testnet `148607000`.
- Pools are lsig accounts rekeyed to the app, and the pool address is **derivable on-chain**, so
  `venueData = ''`.
- Swap layout: `[pay|axfer account→pool, appl "swap","fixed-input",itob(minOut)]`, with
  `accounts=[pool]`, ASA-only `assets`, and input sender == appl sender. Output goes to `Txn.Sender`.
- Every swap asserts `lock == 0`.

```ts
export class TinymanV2Adapter extends Contract {
  tinyman = GlobalState<Application>({ key: 'tinyman' })
  @abimethod({ onCreate: 'require' }) create(tinyman: Application): void

  akitaVenueQuote(assetIn, assetOut, amountIn, venueData): uint64 {
    // pool = tmPoolAddress(tinyman, assetIn, assetOut)                (venues.md §1.3)
    // read via op.AppLocal.getExUint64(pool, tinyman, key): asset_1_id, *_reserves, total_fee_share,
    //   issued_pool_tokens, lock
    // return 0 if: !exists || lock != 0 || issued == 0 || R_in == 0 || R_out == 0 || totalFee == 0
    //   || q + 1 >= R_out
    // totalFee = divw(mulw(amountIn, feeShare), 10_000); swap = amountIn - totalFee
    // q = divw(mulw(R_in, R_out), R_in + swap); return R_out - (q + 1)
  }

  akitaVenueSwap(account, assetIn, amountIn, assetOut, minAmountOut, venueData, returnTo): uint64 {
    requireVenueCustody(account, returnTo)
    // pool derived as above; asserts the pair matches
    // before = holding(account, assetOut)
    // itxn.submitGroup(
    //   assetIn === 0 ? itxn.payment({ sender: account, receiver: pool, amount: amountIn })
    //                 : itxn.assetTransfer({ sender: account, assetReceiver: pool, xferAsset: assetIn, assetAmount: amountIn }),
    //   itxn.applicationCall({ sender: account, appId: tinyman,
    //       appArgs: [Bytes('swap'), Bytes('fixed-input'), op.itob(minAmountOut)],
    //       accounts: [pool], assets: [<non-zero pool assets only>], rekeyTo: returnTo }))   // handback rides on the appl
    // return holding(account, assetOut) - before
  }
}
```

Notes:

- The ALGO/ASA ternary must be written as two branches, because the two param types differ.
- Asset `0` must not go into the inner `assets` array (`venues.md` §1.5).
- Tinyman is v7, so it gets no group resource sharing. Its inner appl carries its own arrays, and the
  pool, its holdings and the `(pool, tinyman)` local must all be available at the top level (§8.4).
- Inner txns per swap: deposit + appl + Tinyman payout = **3**. `opBudget ≈ 400` for the adapter;
  Tinyman's swap fits in its own 700.

Pact is next (`venues.md` §3): it needs a trailing `pay 0 rekeyTo=returnTo` because Pact asserts
`RekeyTo == 0`, so 4 inners. `venueData = itob(poolApp)`, checked with `creator == factory`.

## 5. Execution algorithm

### 5.1 Entry and pre-pass (`swap`)

> **Outdated (as built):** there is no DIRECT resolution, and entry also requires `S ≠ E` and `flags == 0` (FINAL-SPEC §10 A30).

1. `S = getSpendingAccount(wallet)`. Assert `S.authAddress == Global.currentApplicationAddress`
   (`errRtCustody`). This blocks calls made outside a wallet window.
2. Validate shape:
   - `1 ≤ legs ≤ MaxLegs`, `1 ≤ segments ≤ MaxSegments`, `assetIn ≠ assetOut`
   - each leg's `amountIn > 0`; `Σ amountIn` computed overflow-safe
   - the last segment of each leg outputs `assetOut`
   - native segments have `1 ≤ pools ≤ 4` and a non-zero `escrow`
3. Resolve each adapter segment with `readAdapter` (enabled, version pinned). A DIRECT segment needs
   `(flags & FlagAllowDirect) && (info.flags & AdapterDirectCustody)`, otherwise it runs SANDBOX.
4. **Opt-ins happen before any snapshot**, so MBR changes never look like losses:
   - `S` into `assetOut` if needed: `axfer 0 S→S`, 0.1 ALGO MBR from `S`
   - `E` into every asset that passes through a SANDBOX segment: `pay S→E 100_000` + `axfer 0 E→E`
   - for DIRECT segments, `S` into each intermediate asset
5. Snapshot `S`: `in0 = holding(S, assetIn)`, `out0 = holding(S, assetOut)`, `algo0 = holding(S, 0)`,
   where `holding` is the PluginDex helper (ALGO = balance − minBalance). Assert
   `Σ amountIn ≤ in0` (`errRtFunds`).

### 5.2 Value cursor

Each leg carries a cursor `(holder, asset, amount)`, starting at `(S, assetIn, leg.amountIn)`. The
next segment's *recipient* is chosen so the value never makes an unnecessary hop:

- If the next segment is SANDBOX → `E`.
- If the next segment is native or DIRECT, or this is the last segment → `S`.
- Exception: a SANDBOX segment always delivers to `E`. A final sweep from `E` to `S` follows.

### 5.3 Native segment

```ts
ensureBudget(NativeSegmentBudget, OpUpFeeSource.GroupCredit)
const before = holding(recipient, seg.assetOut)
abiCall<typeof PluginDex.prototype.swapRoute>({
  appId: this.dex.value,
  sender: S,                                              // identity for hooks: ctx.caller == S
  args: [ asset === 0
            ? itxn.payment({ sender: holder, receiver: seg.escrow, amount })
            : itxn.assetTransfer({ sender: holder, assetReceiver: seg.escrow, xferAsset: asset, assetAmount: amount }),
          seg.pools, segMin, recipient, seg.data ],
})                                                        // two branches in real code (ALGO / ASA)
const got = holding(recipient, seg.assetOut) - before     // assert ≥ before
```

- PluginDex checks the deposit's receiver (it must be pool[0]'s escrow), `rekeyTo`, `closeTo` and the
  asset. It does not check the deposit's sender. The deposit can therefore come from `E` while the
  appl comes from `S`, which keeps the user's identity even when value sits in `E`.
- Hook `ctx.recipient` may be `E` on intermediate segments. Gated hooks (feature 5) must key on
  `ctx.caller`.
- PluginDex adds its own op-ups for hops 2..n (`ensureBudget(HopBudget)`). The router only covers
  its own overhead plus the first hop.

### 5.4 Adapter segment

> **Outdated (as built):** E's min balance must be unchanged, `in1 ≤ in0`, and the unspent refund requires S to be able to receive the input (partial-fill rule, FINAL-SPEC §10 A30).

```ts
const acct = direct ? S : E
if (holder !== acct) send(holder, acct, asset, amount)            // 0 or 1 inner
ensureBudget(info.opBudget, OpUpFeeSource.GroupCredit)
const in0 = holding(acct, asset), out0 = holding(acct, seg.assetOut), a0 = holding(acct, 0)
itxn.payment({ sender: acct, receiver: acct, amount: 0, rekeyTo: Application(seg.venue).address }).submit()
abiCall<typeof VenueAdapter.prototype.akitaVenueSwap>({
  appId: seg.venue, rejectVersion: info.version + 1,
  args: [acct, asset, amount, seg.assetOut, segMin, seg.data, Global.currentApplicationAddress],
})
loggedAssert(acct.authAddress === Global.currentApplicationAddress, errRtRekeyBack)
const in1 = holding(acct, asset), out1 = holding(acct, seg.assetOut), a1 = holding(acct, 0)
loggedAssert(in1 + amount >= in0, errRtOverspend)                  // spent ≤ amount (and never E's baseline)
loggedAssert(out1 >= out0, errRtSlippage); const got: uint64 = out1 - out0
if (asset !== 0 && seg.assetOut !== 0) loggedAssert(a1 >= a0, errRtAlgoLeak)  // no fees, no junk opt-ins
const unspent: uint64 = in1 - (in0 - amount)                       // > 0 only for partial-fill venues
// SANDBOX: refund `unspent` E→S. If this is the leg's last segment, sweep `got` E→S.
```

The chain is validated by measurement: if a segment produces a different asset than `seg.assetOut`,
`got == 0` and the next segment (amount 0) or the aggregate guard reverts.

### 5.5 Aggregate guard and handback

> **Outdated (as built):** the handback re-checks the wallet and rekeys the S cached at entry, not `rekeyBackIfNecessary` (FINAL-SPEC §10 A29).

```ts
const in1 = holding(S, assetIn), out1 = holding(S, assetOut), algo1 = holding(S, 0)
loggedAssert(in1 + totalIn >= in0, errRtOverspend)
loggedAssert(out1 >= out0 && out1 - out0 >= minAmountOut, errRtSlippage)
if (assetIn !== 0 && assetOut !== 0) loggedAssert(algo1 >= algo0, errRtAlgoLeak)
emit<RouteEvent>(...)
rekeyBackIfNecessary(rekeyBack, wallet)          // last inner txn: S → wallet
return out1 - out0
```

Optimization (later): attach `rekeyAddress(rekeyBack, wallet)` to the last inner txn sent *from `S`*
instead of a trailing 0-pay. Balance reads after the handback need no authority, so this saves 1
inner. In SANDBOX routes the last `S`-sent txn is usually the first deposit.

### 5.6 `swapBest`: on-chain best-of-N, greedy chunks

> **Outdated (as built):** native candidates are quoted with `PluginDex.tryQuoteRoute(swapper = S)`; a 0 skips the candidate (FINAL-SPEC §5 WP4 override 2, §10 A30).

Candidates are single segments `assetIn → assetOut`: native routes and/or adapters. The amount is
split into `chunks` equal parts (the last chunk takes the remainder). For each chunk:

```
for i in candidates:
    q[i] = native ? abiCall PluginDex.quoteRoute(pools, assetIn, amt)  sender: S   (v2: swapper = S)
                  : abiCall adapter.akitaVenueQuote(assetIn, assetOut, amt, data)
best = argmax q;  assert q[best] > 0 (errRtNoLiq)
segMin = q[best] - q[best] * toleranceBps / 10_000          // the quote promise
execute(candidates[best], amt, segMin)                      // §5.3 / §5.4; got ≥ segMin else errRtQuote
```

- Re-quoting every chunk is what makes greedy chunking approximate the optimal split for
  constant-product venues: each chunk goes to whichever venue has the best marginal output after the
  previous chunks moved prices. Error shrinks with `chunks`. An off-chain solver (exact CPMM split)
  can still beat it through `swap` with explicit legs.
- The **quote promise** turns "honest quotes" from a trust assumption into a check. An adapter that
  over-quotes to win selection reverts. Quotes are deterministic and executed immediately, so
  `toleranceBps = 0` should hold for PluginDex and Tinyman. A non-zero tolerance only exists for
  stateful hooks whose Quote and BeforeSwap legitimately differ.
- Quotes are sent **as `S`**, so caller-dependent Quote hooks (gated discounts) price exactly what the
  swap will pay.
- **No try/catch**: one candidate that reverts while quoting aborts the whole swap. Adapters return 0
  instead of reverting (§4.3). PluginDex v1 `quote` **reverts** on a paused pool or insufficient
  liquidity (`errPdpp`, `errPdil`), so the SDK must pre-filter native candidates by simulate, or
  PluginDex should gain `tryQuoteRoute` (§13).
- Main use case: **execution keys and agents**. The group is pre-signed, so the route cannot be
  recomputed off-chain at execution time. `swapBest` picks the venue at execution time inside a fixed
  group.

## 6. Guard coverage

> **Outdated (as built):** the DIRECT column is not built; `FlagAllowDirect` reverts with errRtDirect (FINAL-SPEC §10 A30).

| Threat | SANDBOX | DIRECT | Native |
|---|---|---|---|
| Adapter keeps custody / rekeys elsewhere | `errRtRekeyBack` | `errRtRekeyBack` | n/a (PluginDex never gets custody of `S`) |
| Takes more `assetIn` than the leg amount | `errRtOverspend` (also protects `E`'s baseline dust) | `errRtOverspend` | PluginDex takes exactly the deposit |
| Under-delivers `assetOut` | per-leg `minAmountOut` / quote promise / aggregate `minAmountOut` | same | same; PluginDex `minAmountOut` |
| Spends ALGO for fees or junk opt-ins (MBR) | `errRtAlgoLeak` on `E` (and `E` has ~0 spendable) | `errRtAlgoLeak` on `S` | n/a |
| Moves **other** assets, opts out or closes holdings, calls other apps as the account | **impossible**: `E` holds nothing else | **not covered** | n/a |
| Uses the account's identity elsewhere (votes, NFT transfers, wallet calls; §9 T7) | **impossible** | **not covered** | n/a |
| Sandwich inside the group (custody `BeforeSwap` hook, venue state moved earlier) | aggregate `minAmountOut`; the SDK never sends 0 | same | same |

DIRECT is therefore restricted to adapters with `AdapterDirectCustody` (stricter audit) **and**
a caller opt-in (`FlagAllowDirect`). It exists for venues that need the user's own account: venues
with per-user state, identity-based fee tiers, or a large inner-count saving on very long routes.

## 7. ALGO vs ASA, opt-ins, MBR

- **Asset id 0 = ALGO** everywhere, as in PluginDex.
  - Transfers go through one `send(sender, receiver, asset, amount)` helper (payment vs assetTransfer).
  - Native deposits need two `abiCall` branches, because the `txn` ABI arg maps to different itxn
    param types.
- **Spendable ALGO** = `balance − minBalance`. The router asserts up front:
  - for ALGO input: `Σ amountIn ≤ spendable(S)`, after the pre-pass opt-ins have raised `S`'s min
    balance
  - for ASA input: `Σ amountIn ≤ assetBalance(S)`, and opted in
- **`S` opt-in to `assetOut`:** automatic in the pre-pass (0.1 ALGO from `S`). For ARC-58 escrows
  the MBR comes from the escrow's ALGO. If the escrow has none, the owner pre-opts it with
  `arc58_optInEscrow` (paid by the controlled address) or adds ALGO to `fundsRequest`.
- **No intermediate opt-ins on `S` in SANDBOX routes.** Intermediates live in `E`, and native
  segments can deposit from `E` and deliver to `E`. DIRECT routes do need `S` opted into
  intermediates; those opt-ins stay (no auto opt-out).
- **`E` opt-ins:** one per asset, shared by all users forever.
  - The pre-pass pays inline from `S` (+2 inners, 0.1 ALGO, once per asset globally).
  - The DAO or anyone can pre-fund popular assets with `optInLegEscrow(payment, assets)`.
  - The SDK shows the inline cost in `expectedCost`.
- **Default-frozen ASAs or assets with clawback/freeze:** a frozen transfer reverts the whole
  group. Nothing special is needed.
- **Venue specifics:** ALGO is never put in an inner `assets` array for Tinyman. For Pact ALGO pools
  `0` *is* required, so `0` must appear in a top-level foreign-assets list (`venues.md` §3.5).

## 8. Resource accounting

### 8.1 Inner transactions per component

> **Outdated (as built):** inner txns are pooled at 256 per group (FINAL-SPEC §1, WP4 override 1); measured counts are in `../ARCHITECTURE.md` §11.3.

| Component | Inner txns |
|---|---|
| `arc58_rekeyToPlugin` | 1 (+1 per `fundsRequest` entry) |
| router rekey-back | 1 (0 with the §5.5 optimization) |
| `S` opt-in to `assetOut` (if missing) | 1 |
| `E` opt-in per new asset | 2 |
| native segment, H hops, no hooks | router 2 (deposit, appl) + PluginDex H−1 escrow hops + 0..H−1 op-ups + 1 payout = **H+2 .. 2H+1** |
| + per hook call at BeforeSwap/AfterSwap | +1 (HookFee: +1 payout; custody: +2 + hook's own) |
| Tinyman segment, SANDBOX | router: deposit S→E 1, rekey E 1, adapter appl 1, sweep 1 + adapter 3 = **7** (+1 if a refund is needed) |
| Tinyman segment, DIRECT | rekey S 1 + adapter appl 1 + adapter 3 = **5** |
| Pact segment | +1 over Tinyman (trailing handback pay) |
| quote: native candidate (H hops) | 1 + (0..H−1 op-ups) + Quote-hook calls |
| quote: adapter candidate | 1 |

### 8.2 Typical routes

> **Outdated (as built):** measured by router test G1/G2 (routes 1-5: 5/7/12/12/26 inners; route 6: 90): `../ARCHITECTURE.md` §11.3.

The pool is 16 × (outer app calls). The wallet group has 3, so 48 slots, hard max 256. Counts use
the upper bound for PluginDex op-ups.

| # | Route | Inner txns | Outer | Fee (µALGO, min fee) |
|---|---|---|---|---|
| 1 | ALGO→TKA, 1 native hop | 1 + 3 + 1 = **5** | 3 | 8,000 |
| 2 | ALGO→TKB, native 2 hops, ImpactFeeHook on both pools | 1 + (2+3+2) + 1 = **9** | 3 | 12,000 |
| 3 | Split 70 % native 1-hop + 30 % Tinyman SANDBOX | 1 + 3 + 7 + 1 = **12** (DIRECT: 10) | 3 | 15,000 |
| 4 | Chain ALGO→USDC (Tinyman SANDBOX) → USDC→AKTA (native 1 hop, deposit from E) | 1 + 6 + 3 + 1 = **11** | 3 | 14,000 |
| 5 | `swapBest`, 4 chunks × {native A, native B, Tinyman} | per chunk ≤ 3 quotes + 7 exec, so 4 × 10 + 2 = **≤ 42** (+4 first-time `E` opt-ins) | 3 + 1 carrier | ≤ 50,000 |
| 6 | 4 legs × native 4-hop, 2 hooks per pool at Before+After | 4 × (2+7+16) + 2 = **102** | 3 + 4 carriers (112 slots) | ~109,000 |
| — | (for comparison) PluginDex backrun via adapter inside a native hop | +8 per backrun (design-vault §5.1) | | |

### 8.3 Call depth (max 8; no reentry into an app on the stack)

| Path | Depth |
|---|---|
| router(0) → PluginDex(1) → hook(2) → hook's call, e.g. Gate.check(3) → sub-gate(4) | 4 |
| router(0) → PluginDex(1) → backrun hook(2) → adapter(3) → Tinyman(4) → payout txn | 4 (+payout) |
| router(0) → adapter(1) → Tinyman(2) | 2 |
| router(0) → PluginDex(1) → op-up(2); router(0) → op-up(1) | 2 |

Consequences of the reentry rule (also in design-vault §7.1):

- Hooks and backrun hooks cannot call the router or PluginDex.
- The registry must be readable without a call (§4.4).
- An adapter is never on the stack when another adapter or the router calls it.
- The wallet app is never on the stack.

### 8.4 Opcode budget

> **Outdated (as built):** measured budgets are in `../ARCHITECTURE.md` §11.2; the Vault tops itself up (FINAL-SPEC §10 A12, A14, A21).

The pooled budget is 700 × (outer app calls) + 700 × (inner app calls). Every adapter, Tinyman,
PluginDex, hook and quote call **adds** 700, so routes are mostly self-funding.

The estimates below are **unmeasured** and must be replaced by simulate's `appBudgetConsumed` in test
G1:

- wallet rekey ~700-1,000 (box reads + group loop)
- verify ~100
- router base ~500 (decoding `Leg[]` dominates), ~150-250 per native segment, ~300 per adapter
  segment
- PluginDex ~450-600 per hop (design-vault §5.2)
- Tinyman swap < 700 (`venues.md` §1.5)

Route 1: about 2,100-2,400 used of 2,800 pooled. That is tight, so `ensureBudget` before each segment
is a cheap safety net: it adds op-ups only when `Global.opcodeBudget` is short.

### 8.5 References (8 per txn, or access lists)

> **Outdated (as built):** every Vault call also needs box read quota for program bytes above 8,192 (FINAL-SPEC §10 A11); the akita-sdk access-list builder plans references and carriers (`../ARCHITECTURE.md` §12).

- Holdings and locals are shared across the group only if **both parts are available in the same
  top-level txn**. `venues.md` §4.5 verified that `(S, assetOut)` fails unless `S` is in the router
  call's `accounts`.
- Tinyman (v7) gets no sharing at all, so its inner appl carries its own arrays.
- Route 3 needs on the router call:
  - accounts `[S, E, tmPool]`
  - apps `[dex, pool-escrow app, tinyman, adapter, registry]`
  - assets `[TKA/USDC, …]`
  - box `p:<poolId>`

  That is 10-11 refs, more than 8. So:
  - use an **access list** (`accessReferences`, supported by algokit-utils 9.2.2 with explicit
    `holding`/`locals` entries; check the `MaxAppAccess` cap), or
  - move whole co-location groups onto an `opUp()` carrier *after* verify, for example
    `(tmPool, a1, a2, tinyman)` together. Never split a holding pair.
- The SDK computes refs **deterministically from the route**: every pool, escrow, venue and asset is
  known up front. ARCHITECTURE notes that `populateAppCallResources` regroups `swapRoute` incorrectly,
  so the SDK should not rely on it here.

## 9. Security analysis

> **Partly outdated (as built):** T9 is resolved by `tryQuoteRoute` (FINAL-SPEC §10 A30); a handback check was added (A29); T7/DIRECT stays open (`OPEN-DECISIONS.md`).

| # | Threat | Mitigation |
|---|---|---|
| T1 | Router called outside a wallet window, or for another wallet | `S.authAddress == router` at entry. Only the wallet's authorized caller can open a window, and every window appl must name that wallet (R2). |
| T2 | Malicious/updated adapter | DAO approval + version pin + `rejectVersion`. SANDBOX bounds the loss to the leg's own input, which the aggregate `minAmountOut` then catches. The SDK never sends `minAmountOut = 0`. |
| T3 | Admin abuse (registry) | The admin cannot touch funds. Worst case it approves a bad adapter, and users who route through it are still bounded by their own `minAmountOut`. It cannot affect native-only routes. |
| T4 | `E` drained or griefed | Only router code moves `E`. Sweeps and refunds use measured deltas only. Junk opt-ins cost the griefer 0.1 ALGO each and harm nobody. `E` is never closed or deleted (the router never calls `Escrow.delete`). |
| T5 | Shared `E` across users in one group | Execution is sequential and each segment returns `E` to its baseline before the next starts, so there is no cross-user bleed. |
| T6 | Lying quotes bias selection | Quote promise (`errRtQuote`). |
| T7 | **DIRECT custody escalation (observation, to verify before enabling DIRECT)** | While an adapter holds the wallet address `S`, it can send app calls *as the wallet address*. `resolveCallerType(Other, Txn.sender)` (l.376-380) then gives `caller = wallet address`, the same key `CallerTypeAdmin` uses. An inner `[arc58_rekeyToPlugin(adminScopedPlugin, type=0, escrow='x', [], []), plugin call, verify]` might open an **admin-scoped plugin window on a named escrow** without `_requireAdmin`. Windows on the main account fail, because the wallet cannot send from its own address while that address is rekeyed away. This applies to *any* plugin with custody of the wallet address, not only the router. SANDBOX avoids it entirely. Test E9 should prove or disprove it. If it is real, the wallet fix is to reject `type == Other && Txn.sender == Global.currentApplicationAddress`. |
| T8 | Hook identity spoofing in gated pools | `ctx.caller` is always `S`, because the router sends every PluginDex appl and quote as `S`. Hooks map `S` → origin with `getOrigin(escrowFactory, S)` (`utils/functions.ts`). |
| T9 | Liveness (a venue or pool paused or locked) | Explicit legs simply revert. In `swapBest`, adapters return 0. PluginDex v1 quotes revert, hence `tryQuoteRoute` (§13). |

## 10. SDK and client composition

> **Outdated (as built):** see `../ARCHITECTURE.md` §12 (akita-sdk access-list discovery at the real budget, Local State repair).

- **Fixture first, akita-sdk later.** Phase 1 tests use a local `AkitaRouterPluginSDK implements
  AkitaSDK<AkitaRouterPluginClient>` in `tests/fixtures/plugins/akita-router.ts`, the same shape as
  `TestProxyRekeyPluginSDK`. `swap(args)` and `swapBest(args)` return a `PluginSDKReturn`; `getTxns`
  returns `[{ type: 'methodCall', ...await client.params.swap({ args: { wallet, rekeyBack, … },
  accessReferences | *References }) }]`.
  - Moving the class into `akita-sdk/src/wallet/plugins` later needs an akita-sdk `npm run build`
    before contract tests, because tests import `dist`.
  - Set fee flags explicitly: `setSendParams` drops the defaults.
- **Quoting off-chain:** simulate the full wallet group with `minAmountOut = 0`. Output is exact
  because quotes are deterministic. Then `minAmountOut = out × (1 − slippageBps)`. For per-candidate
  numbers, simulate `PluginDex.quoteRoute` with **sender = `S`** and `akitaVenueQuote`.
- **Solver:** exact CPMM split for 2-3 venues, or fine-grained greedy, produces `legs`. Use
  `swapBest` when the group must be fixed in advance (execution keys).
- **Carriers:** after `wallet.prepareUsePlugin(...)`, append
  `router.params.opUp({ accessReferences: overflow })` to `group.composer()`. The haystack spec
  appends after verify the same way.
- **Coexistence with `haystack-router`:**
  - Haystack's routes are outer transactions with a signed payload, after verify. That is good for
    breadth.
  - The Akita router is atomic inside custody, hook-aware, includes PluginDex pools, and works with
    execution keys.
  - The SDK can quote both and pick.

## 11. E2E test plan

File: `smart_contracts/arc58/plugins/akita-router/akita-router.e2e.spec.ts`. Run with
`npx vitest run smart_contracts/arc58/plugins/akita-router`, then the full `npm test`.

### 11.1 Fixtures

`beforeAll` uses the same wallet infrastructure as `haystack-router/contract.e2e.spec.ts`:

```ts
const fixture = algorandFixture()
await fixture.newScope()
const { appClient: mbr } = await algorand.client.getTypedAppFactory(AbstractedAccountMbrFactory, {...}).send.create.bare()
process.env.WALLET_MBR_APP_ID = mbr.appId.toString()                       // restore in afterAll
const escrowFactory = await deployEscrowFactory({ fixture, sender, signer })
const dao = await deployAkitaDAO({ fixture, sender, signer, apps: { escrow: escrowFactory.appId } })
walletFactory = await deployAbstractedAccountFactory({ fixture, sender, signer,
  args: { akitaDao: dao.appId, escrowFactory: escrowFactory.appId } })
```

Then:

- **PluginDex + pools.** Move `createPool`, `addLiquidity` and `holding` out of
  `plugin-dex.e2e.spec.ts` into a new `tests/fixtures/plugin-dex.ts`. That is a new file; the existing
  spec is left alone. Pools: ALGO/TKA, TKA/TKB, ALGO/TKB (two pools, so `swapBest` has a choice), and
  one pool with `ImpactFeeHook`.
- **New `RecordingDexHook` mock** (BeforeSwap|Quote, records `ctx.caller` and `ctx.recipient`) on
  one pool, to assert identity.
- **Real Tinyman v2:** `tests/fixtures/external/tinyman-v2.ts` per `venues.md` §2. Vendored bytecode
  plus LICENSE, sha256 pinned. Bootstrap ALGO/USDC and USDC/TKA lsig pools and add initial
  liquidity. Prefer this over a PuyaTs mock: a v10+ mock gets resource sharing that the real v7 app
  does not.
- **Venues:**
  - `VenueRegistry` (admin = test account standing in for the DAO wallet)
  - `TinymanV2Adapter(tinyman)`
  - `MockVenueAdapter` (new, `smart_contracts/mocks/venue-adapter/contract.algo.ts`): an honest
    constant-product venue against its own reserves, plus evil modes `steal`, `keepRekey`,
    `rekeyElsewhere`, `underdeliver`, `overQuote`, `overspendBaseline`, `feeFromAccount`,
    `junkOptIn`, `moveOtherAsset`, `callWalletAsAccount`. It has an `UpdateApplication` method so
    the version pin can be tested.
  - `setAdapter(id, { version: 0, flags: Enabled[|Direct|ExactQuote], innerTxns, opBudget })`
- **Router:** `deployAkitaRouterPlugin({ dex, registry })`, then `init(payment)` and
  `optInLegEscrow(payment, [TKA])` (leaving USDC un-opted to exercise inline opt-in).

`beforeEach`:

```ts
wallet = await newWallet({ algorand, factoryParams: { appId: walletFactory.appId, defaultSender: sender, defaultSigner: signer },
                           readerAccount: sender, nickname: 'router test' })
await wallet.client.appClient.fundAppAccount({ amount: (50).algos() })
await wallet.addPlugin({ client: routerSdk, callerType: CallerType.Global })              // escrow ''
// a separate caller (not the spending account) signs; S = wallet.client.appAddress
```

Call pattern:

```ts
await wallet.usePlugin({ callerType: CallerType.Global, calls: [routerSdk.swap({ assetIn: 0n, assetOut: tka, minAmountOut, legs })] })
// with carriers:
const { group } = await wallet.prepareUsePlugin({ callerType: CallerType.Global, calls: [routerSdk.swapBest({...})] })
;(await group.composer()).addAppCallMethodCall(await routerSdk.client.params.opUp({ args: {}, accessReferences: overflow }))
await group.send()
```

Every test asserts afterwards:

- `wallet.client.appAddress` `authAddr` is undefined
- `E`'s holdings equal its pre-test baseline
- `S`'s balance deltas equal the expected values exactly

### 11.2 Cases

**A. Native**

1. ALGO→TKA, 1 hop. Output == `PluginDex.quote` simulated with sender `S`. `txIds.length == 3`.
2. 2-hop route == `quoteRoute`. `RecordingDexHook` saw `caller == S` and `recipient == S`.
3. TKA→ALGO works (ALGO out). Then ALGO→TKB with `S` not yet opted into TKB: the inline opt-in
   happens and `S`'s min balance rises by exactly 100,000. `S`'s ALGO otherwise changes only by the
   swap input, because fees come from the caller's outer txn.
4. Aggregate `minAmountOut = quote + 1` → `errRtSlippage`. Balances and auth are unchanged.

**B. Tinyman adapter**

1. SANDBOX ALGO→USDC: output == the TS Tinyman formula == `akitaVenueQuote`. `E` is back at its
   baseline. A `LegEvent` shows `holder == E`.
2. First use of an asset in `E` → inline opt-in (+2 inners, `S` pays 0.1 ALGO). A second swap doesn't
   repeat it.
3. DIRECT with registry flag and caller flag works, and uses 2 fewer inners. With only one of the two
   flags → `errRtDirect`.
4. USDC→ALGO (ALGO out) and the ASA/ASA pool (USDC/TKA) both work, with no asset 0 in the inner
   `assets` array.
5. Tinyman `lock` or empty pool → quote returns 0. An explicit leg reverts in the venue.

**C. Split and chain**

1. 70/30 native + Tinyman. Total == sum of per-leg simulated outputs. `minAmountOut = total + 1`
   reverts.
2. Chain ALGO→USDC (Tinyman) → USDC→TKA (native) **without `S` ever opted into USDC**. The native
   hook saw `caller == S` and `recipient == S` on the last segment.
3. Leg `minAmountOut` enforced independently of the aggregate.
4. Shape validation: too many legs or segments, `assetIn == assetOut`, a wrong final asset (measured
   0) → `errRtRoute` / `errRtSlippage`. `Σ amountIn > balance` → `errRtFunds`.

**D. `swapBest`**

1. Skew reserves so that Tinyman is best, then so that native pool B is best. The chosen venue matches
   (by `LegEvent`). Output == max of the quotes.
2. `chunks = 4` output equals a TS greedy simulation and is ≥ any single-venue route.
3. `MockVenueAdapter overQuote` → `errRtQuote`. With `toleranceBps` covering the lie it passes, which
   documents the tolerance semantics.
4. Paused native candidate → the swap reverts (documents the v1 limitation). It passes once the SDK
   filters the candidate out.

**E. Adversarial (`MockVenueAdapter` modes)**

1. `keepRekey`, `rekeyElsewhere` → `errRtRekeyBack`.
2. `overspendBaseline` (dust donated to `E` first) → `errRtOverspend`.
3. `underdeliver` vs leg min → `errRtSlippage`.
4. `feeFromAccount`, `junkOptIn` (both modes) → `errRtAlgoLeak` (or the venue fails on `E`'s ~0
   spendable).
5. `moveOtherAsset` in DIRECT moves a third ASA from `S` and is **not caught**. This test documents
   the DIRECT limit; the guard still passes.
6. Adapter not in the registry, disabled, or updated (version 1 vs pinned 0) → `errRtAdapter` /
   `errRtAdapterVer`.
7. Adapter called directly (top level) with `returnTo` ≠ caller → `errVaReturnTo`.
8. Router `swap` called without a wallet window → `errRtCustody`.
9. **T7 probe**: `callWalletAsAccount` in DIRECT, against a wallet that has an admin-scoped plugin on a
   named escrow. Assert the actual outcome and report it.

**F. Wallet integration**

1. Escrow profile: `addPlugin({ client, callerType: Global, escrow: 'swap', allowances: [{ asset: 0n,
   type: 'flat', amount: 5_000_000n }] })`, then `usePlugin({ escrow: 'swap', fundsRequest: [{ asset:
   0n, amount: 1_000_000n }], calls: [swap] })`. Output lands in the escrow. Over-allowance fails in
   the wallet.
2. Method restrictions: `methods: [{ name: routerSdk.swap(), cooldown: 0n }]` → `swapBest` is
   rejected by the wallet.
3. Two router calls in one window (first `rekeyBack=false`).
4. A carrier *inside* the window → `errCannotCallOtherAppsDuringRekey`. The same carrier after verify
   passes.
5. `wallet.build.usePlugin(...).expectedCost.totalAlgo` == actual ALGO cost, as in
   `wallet-build-usePlugin.e2e.spec.ts`'s proxy-rekey cost tests.

**G. Limits and measurement**

1. Simulate routes 1-5 from §8.2 and record the inner-txn count (recursive) and `appBudgetConsumed`.
   Assert inner counts equal the table, so regressions are caught. Log budgets so §8.4 can be
   replaced with real numbers.
2. Route 6 passes with 4 carriers and fails with too few (inner-pool exhaustion).

## 12. Implementation phases and files

> **Outdated (as built):** R1-R3 are built; the router is 3,790 B; the immutable-catalog entries are not added yet (`OPEN-DECISIONS.md`).

| Phase | Deliverable | Files (new) |
|---|---|---|
| R1 | Adapter ABI, registry, Tinyman adapter, real-Tinyman fixture, `MockVenueAdapter` | `plugin-dex/venues/{venue-adapter.ts, registry.algo.ts, tinyman-v2.ts (shared lib, venues.md §4.2), tinyman-v2-adapter.algo.ts}`, `mocks/venue-adapter/contract.algo.ts`, `tests/fixtures/external/tinyman-v2.ts` (+ vendored bytecode, LICENSE), `tests/fixtures/venues.ts` |
| R2 | Router `init`, `optInLegEscrow`, `opUp`, `swap` (native, SANDBOX, split, chain); tests A, B, C, E, F | `arc58/plugins/akita-router/{contract.algo.ts, types.ts, constants.ts, errors.ts, akita-router.e2e.spec.ts}`, `tests/fixtures/plugins/akita-router.ts`, `tests/fixtures/plugin-dex.ts`, `mocks/recording-dex-hook/` |
| R3 | `swapBest` + quote promise; tests D, G | same |
| R4 | DIRECT custody (after test E9 resolves T7) | same |
| R5 | akita-sdk plugin SDK + solver + resource planner; immutable deploys | `akita-sdk/src/wallet/plugins/akita-router.ts`; `scripts/lib/immutable-catalog.json` entries `AkitaRouterPlugin` (`plugin: true`), `VenueRegistry`, `TinymanV2Adapter`; deploy via `scripts/deploy-immutable.ts` |

Build with `npm run build`. `scripts/build-contracts.mjs` compiles everything under `smart_contracts/`,
so new directories are picked up. Finish each phase with the full `npm test`.

Program size: the router embeds `Escrow` (185 B) and has two large entrypoints. Estimate 3.5-5.5 KB,
under 8 KB with `extraProgramPages: 3`. Measure after R2.

## 13. Open decisions and cross-track notes

> **Outdated (as built):** items 2-5 are resolved in code (FINAL-SPEC §5 WP4 overrides, §10 A30); items 1, 6 and 7 are tracked in `OPEN-DECISIONS.md`.

1. **SANDBOX-only v1?** Recommended. Ship DIRECT in R4 only once T7 is resolved and at least one venue
   actually needs user identity.
2. **Adapter caller policy.** This spec uses `returnTo == callerApplicationAddress` (permissionless
   adapters). `venues.md` §4.3 uses a caller allow-list. Recommendation: keep the `returnTo` rule as
   mandatory; an allow-list, if wanted, should be read from `VenueRegistry` so it isn't duplicated
   per adapter.
3. **Method names.** `akitaVenueSwap` / `akitaVenueQuote` (this doc) vs `swap` / `quote`
   (`venues.md`). The argument order is already identical. Pick one before R1.
4. **Backrun hooks (feature 3).** `venues.md` recommends that the hook inline the venue library
   (`plugin-dex/venues/tinyman-v2.ts`) rather than call an adapter: −2 inners, −1 depth. Then the
   registry is router-only in practice. If a hook calls adapters instead, it reads `VenueRegistry`
   the same way (no call).
5. **PluginDex asks:**
   - (a) `tryQuote` / `tryQuoteRoute` that return 0 on paused / insufficient liquidity instead of
     reverting, so one candidate cannot abort `swapBest`;
   - (b) `quote(..., swapper)` (design-vault §5.3). Until then the router sends quotes as `S`;
   - (c) pin hook versions in approvals or installs (design-vault does this with `rejectVersion`).

   PluginDex is immutable, so these must land before it is deployed to MainNet.
6. **Router fee:** none in v1, since revenue accrues through the PluginDex protocol fee and hooks.
   If the DAO wants routing revenue, use `bps → DAO revenue escrow`, discounted by social impact via
   the existing `SwapFees.impactTaxMin/Max` + `impactRange(getUserImpact(...))`. That is feature 5's
   tooling. Note it would make the router depend on a DAO global, which is fine because it is
   read-only.
7. **Who pays `E` opt-ins:** inline by the first user (default), or a DAO pre-fund of the top N
   assets.

---

## Appendix A. PuyaTs 1.3.1 APIs this design relies on (checked in `node_modules/@algorandfoundation/algorand-typescript`)

- `arc4/c2c.d.ts`:
  - `abiCall<TMethod>(options)`. `AbiCallOptions` extends `itxn.ApplicationCallFields`, so
    `sender`, `rekeyTo`, `rejectVersion` and `fee` can be set.
  - `TypedApplicationArg` maps a `gtxn.Transaction` param to `itxn.ItxnParams`, so
    `itxn.payment(...)` / `itxn.assetTransfer(...)` can be passed as `swapRoute`'s `input`.
  - `compileArc4(Escrow)`, as PluginDex uses it.
- `itxn.d.ts`:
  - `itxn.payment`, `itxn.assetTransfer`, `itxn.applicationCall` (fields `sender`, `fee`, `rekeyTo`,
    `appArgs`, `accounts`, `assets`, `apps`, `rejectVersion`)
  - `itxn.submitGroup(...)`
  - `itxnCompose` (alternative)
- `reference.d.ts`: `Account.{balance, minBalance, authAddress, isOptedIn}`,
  `Application.{address, version, creator}`.
- `op.d.ts`:
  - `AppLocal.getExUint64(account, app, key)`; `AppGlobal.getExBytes(app, key)`, `put`, `delete`;
    `AssetHolding.assetBalance`
  - `mulw`, `divw`, `itob`, `btoi`; `Txn.accounts(i)`, `Txn.applicationArgs(i)`
  - `Global.{currentApplicationAddress, callerApplicationAddress, callerApplicationId,
    opcodeBudget, assetOptInMinBalance, zeroAddress}`
  - `AppParams.appVersion` (min AVM 12)
- `util.d.ts`: `ensureBudget(required, OpUpFeeSource.GroupCredit)`.
- `arc4/index.d.ts`: `decodeArc4`, `encodeArc4`, `methodSelector`. `arc-28.d.ts`: `emit`.
- `base-contract.d.ts`: `@contract({ avmVersion: 10|11|12|13, stateTotals: { globalBytes, … } })`.
- Wallet helpers: `getSpendingAccount`, `rekeyAddress`, `rekeyBackIfNecessary`
  (`smart_contracts/utils/functions.ts`; plugins in this repo import from there, not `@akta/plugin`).

## Appendix B. External facts used

- Tinyman v2 swap interface, formulas, pool derivation, v7 resource rules and LocalNet deployability:
  `research/venues.md` §1-2, verified there.
  - Upstream: <https://github.com/tinymanorg/tinyman-amm-contracts-v2> (`contracts/amm_approval.tl`),
    <https://docs.tinyman.org/v2-integration/protocol-methods/swap>,
    <https://github.com/tinymanorg/tinyman-py-sdk> (`tinyman/v2/swap.py`).
- AVM v9 resource sharing (holdings and locals need both parts in one top-level txn):
  <https://developer.algorand.org/articles/introducing-avm-9-group-resource-sharing/>
