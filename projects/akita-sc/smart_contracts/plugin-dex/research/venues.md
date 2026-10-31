# External venues: Tinyman v2 and Pact

**Covers:** the router venue adapters (feature 4) and the AfterSwap backrun custody hook (feature 3).

**Status:** research and design only. No existing source file was changed.

Everything marked **[verified]** was checked on 2026-10-02 in one of three ways:

- against mainnet state (algonode),
- by compiling with the repo's toolchain (puya-ts 1.3.1 / puya 5.10.1),
- by running a scratch LocalNet script (algod 5.0.1, `dockernet-v1`). It deployed both venues, made swaps directly, and made swaps from a PuyaTs probe contract acting on a flash-rekeyed account.

The scratch files live outside the repo. The probe contract source is in section 6.

---

## 0. TL;DR

| | Tinyman v2 | Pact (constant product, factory v201) |
|---|---|---|
| Topology | one AMM app; each pool is a **logicsig account rekeyed to the app** | **one app per pool**; reserves sit in the app account |
| Pool state | **local state** of the pool account in the AMM app | **global state** of the pool app |
| Swap call | `appArgs = ["swap", "fixed-input", itob(minOut)]`, `accounts = [pool]`, `assets = [asset_1, asset_2]` | `appArgs = ["SWAP", itob(minOut)]`, `assets = [primary, secondary]` |
| Input | pay/axfer to the pool at `GroupIndex-1`, **sender must equal the appl sender** | pay/axfer to the pool app address at `GroupIndex-1` (sender **not** checked) |
| Output | inner transfer to `Txn.Sender` | inner transfer to `Txn.Sender` |
| Fee | `total_fee_share` bps **on input** (per pool; default 30, ALGO/USDC = 36 today); 1/`protocol_fee_ratio` of it goes to the protocol | `FEE_BPS` **on output**; `PACT_FEE_BPS` (≤ FEE/2) of the gross goes to the treasury |
| Inner txns | fixed-input 1, fixed-output ≤ 2. All `Fee: 0`, so the caller pools fees (appl fee 2000) | 1 inner (appl fee 2000) |
| Rekey checks | **none** on the swap txns | `txn RekeyTo == 0` on the appl **and** the deposit |
| AVM version | approval v7, so **no group resource sharing**. Refs must sit in its own arrays | approval v8, same limitation |
| Upgradeable | **no** (Update/Delete fail). Mainnet bytecode equals the repo build **[verified]** | pools: no update path in v201 |
| On-chain pool discovery | **yes**: address = `sha512_256("Program" ‖ template(appId, a1, a2))` **[verified on-chain]** | **no**: the registry lives in factory boxes, which another app cannot read. Verify `app.creator == factory` instead |
| LocalNet | **deployable 1:1**. The official bytecode is public (BUSL-1.1, which became GPL-2.0+ on 2026-01-01) **[verified]** | **deployable 1:1**. The TEAL is public in `pactfi/algorand-testbed` and compiles to the exact mainnet bytes **[verified]**, but the repo has **no license** |

**Recommendation: target Tinyman v2 first.** The adapter can execute as a flash-rekeyed account. It sends a 2-transaction inner group from that account, `[pay|axfer → pool, appl swap]`, and puts `rekeyTo = returnTo` on the Tinyman appl. **[verified]**: output equals the on-chain quote to the micro-unit, and the account is handed back in the same inner group. Details are in section 4.

---

## 1. Tinyman v2 AMM

### 1.1 Sources and identity

- Contracts (Tealish source, annotated TEAL, compiled bytecode, protocol spec PDF): <https://github.com/tinymanorg/tinyman-amm-contracts-v2>
  - Approval source: <https://raw.githubusercontent.com/tinymanorg/tinyman-amm-contracts-v2/main/contracts/amm_approval.tl>
  - Approval TEAL (v7): <https://raw.githubusercontent.com/tinymanorg/tinyman-amm-contracts-v2/main/contracts/build/amm_approval.teal>
  - **Approval bytecode** (7,731 bytes): <https://raw.githubusercontent.com/tinymanorg/tinyman-amm-contracts-v2/main/contracts/build/amm_approval.teal.tok>
    `sha256 = dd63834ddcd51013ec0a22142497ad4c6d74e421e6c79149422c243346691f56`
  - Clear program: `contracts/build/amm_clear_state.teal` (v7 `exit(1)`). Bytecode `07 81 01 43`.
  - Pool logicsig template: <https://raw.githubusercontent.com/tinymanorg/tinyman-amm-contracts-v2/main/contracts/build/pool_template.teal> and `pool_template.teal.tok` (47 bytes, `sha256 = bf33a6b7c81d4cf3613c0521002d0376994bb0a32704168be6559cf7536651d8`).
  - Tests that show every group shape (algojig): `tests/core.py`, `tests/tests_swap.py`, `tests/tests_bootstrap.py`, and `tests/tests_swap_proxy.py`. The last one has **a contract doing an inner-group swap**, which is the exact adapter pattern.
  - Audit: Runtime Verification (linked from the repo README).
- Python SDK: <https://github.com/tinymanorg/tinyman-py-sdk> (`tinyman/v2/{constants,contracts,bootstrap,swap,formulas,pools}.py`). JS SDK: <https://github.com/tinymanorg/tinyman-js-sdk>.
- App IDs (from `tinyman/v2/constants.py`):
  - mainnet `1002541853` (address `XSKED5VKZZCSYNDWXZJI65JM2HP7HZFJWCOBIMOONKHTK5UVKENBNVDEYM`)
  - testnet `148607000`
- **[verified]** The mainnet app's approval program is **byte-identical** to `amm_approval.teal.tok`. Clear is `07810143`. Schema: global 0 uint / 3 bytes, local 12 uint / 2 bytes, `extra-program-pages = 3`.
- Immutability: `OnCompletion` `UpdateApplication` and `DeleteApplication` go to `fail`, so the interface below is permanent. The fee roles (`fee_setter`, `fee_collector`, `fee_manager`) can still change `total_fee_share` and `protocol_fee_ratio` per pool, so **always read fees from state**.
- License: BUSL-1.1, Change Date **2026-01-01**, Change License GPL-2.0-or-later. Today (2026-10-02) the code is GPL-2.0+. Even under BUSL, non-production use (LocalNet tests) was allowed. Vendoring the bytecode as a **test fixture** is fine. Keep the LICENSE notice next to it.
- Tinyman also runs its own multi-hop "swap router" apps (`tinyman/swap_router/constants.py`: mainnet V1 `1083651166`, V2 `2614712672`, V3 `3422861405`). We do not need them. Our router composes pools itself.

### 1.2 Account model

- **AMM app** (validator): global state `fee_setter`, `fee_collector`, `fee_manager` (bytes). It is the creator of every LP token and needs a funded app account (100k base + 100k headroom for the `increase_cost_budget` self-deleting app creation).
- **Pool account** = logicsig address. At bootstrap it opts into the AMM app (its local state *is* the pool) and **rekeys to the AMM app address**. After that, every movement of pool funds is an AMM inner transaction with `Sender = pool`.
  - **[verified]** Mainnet ALGO/USDC pool `2PIFZW53RHCSFSYMCFUBW4XOCXOMB7XOYQSQ6KGT3KVGJTL4HM6COZRNMM` has `auth-addr` = the AMM app address.
- LP token: created by the app with total `2^64-1`, decimals 6, unit `TMPOOL2`, name `"TinymanPool2.0 {u1}-{u2}"`, reserve = pool, and metadata hash = `itob(asset_1_id) ‖ itob(asset_2_id) ‖ zero16`. The whole supply sits in the pool. Issued = held outside the pool.
- **Asset ordering:** `asset_1_id > asset_2_id`, enforced at bootstrap. ALGO (0) is therefore always `asset_2`. This is the **opposite** of Pact (primary < secondary) and of PluginDex (`assetA` = lower id).

### 1.3 Pool address derivation

The template is 47 bytes:

```
06 80 18 <24 bytes> 81 00 5b 35 00 34 00 31 18 12 44 31 19 81 01 12 44 81 01 43
          [3..11)  = itob(validator_app_id)
          [11..19) = itob(asset_1_id)   (larger id)
          [19..27) = itob(asset_2_id)   (smaller id, 0 for ALGO)
pool = sha512_256("Program" ‖ program)
```

Base64 of the zeroed template, from the SDK: `BoAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQBbNQA0ADEYEkQxGYEBEkSBAUM=`.

The logicsig itself only allows an `OptIn` to that exact app id. The app's `bootstrap` re-derives the address and asserts `Txn.Sender == sha512_256("Program" ‖ program)`. **Any account that has Tinyman local state is therefore a genuine pool for exactly that pair.**

On-chain derivation in PuyaTs (compiled with puya-ts 1.3.1; on LocalNet the result equals the off-chain address **[verified]**):

```ts
const TM_POOL_PREFIX = Bytes.fromHex('068018')
const TM_POOL_SUFFIX = Bytes.fromHex('81005b3500340031181244311981011244810143')
function tinymanPoolAddress(tinyman: Application, assetA: uint64, assetB: uint64): bytes {
  const a1: uint64 = assetA > assetB ? assetA : assetB
  const a2: uint64 = assetA > assetB ? assetB : assetA
  const program = op.concat(op.concat(op.concat(op.concat(TM_POOL_PREFIX, op.itob(tinyman.id)), op.itob(a1)), op.itob(a2)), TM_POOL_SUFFIX)
  return op.sha512_256(op.concat(Bytes('Program'), program))
}
```

This lets an adapter **validate a caller-supplied pool, or derive it from (assetIn, assetOut)**, with no registry. It costs about 45 for `sha512_256` plus a few concats.

### 1.4 State keys (pool account's local state in the AMM app)

Schema: 12 uints + 2 byte slices.

| key | type | meaning |
|---|---|---|
| `asset_1_id` | uint | larger asset id |
| `asset_2_id` | uint | smaller asset id (0 = ALGO) |
| `pool_token_asset_id` | uint | LP ASA |
| `asset_1_reserves`, `asset_2_reserves` | uint | **reserves used by the curve**. Not equal to the balance: the balance also includes protocol fees, donations, and the ALGO min balance |
| `issued_pool_tokens` | uint | LP supply outside the pool, including 1,000 locked |
| `total_fee_share` | uint | swap fee in bps (1..100). Default 30 |
| `protocol_fee_ratio` | uint | protocol gets `total_fee / ratio` (3..10). Default 6 |
| `asset_1_protocol_fees`, `asset_2_protocol_fees` | uint | accrued protocol fees, held in the pool, outside reserves |
| `lock` | uint | 1 between `flash_swap` and `verify_flash_swap` in the same group. **Every swap asserts `lock == 0`** |
| `cumulative_price_update_timestamp` | uint | last oracle update (`Global.LatestTimestamp`) |
| `asset_1_cumulative_price`, `asset_2_cumulative_price` | bytes | Uniswap-v2 style cumulative price, **scaled by 2^64**, big-endian, variable length (biguint). `asset_1_cumulative_price += (r2 << 64) * Δt / r1` |

The cumulative prices are an **external TWAP** that the volatility fee hook (feature 3) could read: sample twice, then `(c_t1 - c_t0) / (t1 - t0) / 2^64` is the TWAP of asset_1 in asset_2. They update only on swap, flash ops, add, and remove.

Live example **[verified]**, mainnet ALGO/USDC on 2026-10-02:

- `asset_1_id=31566704` (USDC), `asset_2_id=0`
- `asset_1_reserves=886,866,793,011`, `asset_2_reserves=6,965,756,591,175`
- `total_fee_share=36`, `protocol_fee_ratio=4`, `lock=0`
- pool min balance 842,000

PuyaTs read pattern. The `(pool, tinymanApp)` local pair must be available (see 4.5).

```ts
const [r1, exists] = op.AppLocal.getExUint64(pool, tinyman, Bytes('asset_1_reserves'))
```

### 1.5 Swap: exact interface

Group (top-level, or an **inner group** with the same layout; `Gtxn` indexes the inner group when it is invoked from one):

```
[N-1] input  : pay   { snd: U, rcv: pool, amt: in }                        (ALGO in)
               axfer { snd: U, arcv: pool, xaid: assetIn, aamt: in }       (ASA in)
[N]   appl   : { snd: U, apid: TINYMAN, apan: NoOp,
                 apaa: ["swap", "fixed-input" | "fixed-output", itob(minOut | exactOut)],
                 apat: [pool],                      // Txn.Accounts[1] MUST be the pool
                 apas: [asset_1_id, asset_2_id],    // see the note on asset 0 below
                 fee: 2000 (fixed-input) | 3000 (fixed-output) }
```

What the program checks in `block swap`:

- `app_local_get(1, "lock") == 0`
- input txn at `Txn.GroupIndex - 1`:
  - `Pay`: `Receiver == pool`, input asset = 0
  - `Axfer`: `AssetReceiver == pool`, input asset = `XferAsset`
  - any other type: error
- `Gtxn[N-1].Sender == Txn.Sender`
- input amount > 0
- the input asset is one of the pair
- `fixed-input`:
  - `total_fee = in * total_fee_share / 10000`, **must be > 0**
  - `swap_amount = in - total_fee`
  - `out = R_out - (floor(R_in * R_out / (R_in + swap_amount)) + 1)`
  - asserts `out > 0` and `out >= minOut`
- `fixed-output`:
  - `out = arg2`
  - `swap_amount = floor(R_in * R_out / (R_out - out)) + 1 - R_in`
  - `total_fee = floor(swap_amount * 10000 / (10000 - fee_share)) - swap_amount`, must be > 0
  - asserts `in >= swap_amount + total_fee`
  - **refunds change** to `Txn.Sender` (extra inner)
- reserves:
  - `R_in += swap_amount + poolers_fee`
  - `R_out -= out`
  - `protocol_fees_in += total_fee / protocol_fee_ratio`
  - k check `R_in_old * R_out_old <= (R_in' - poolers_fee) * R_out'`
- **output: inner transfer `pool → Txn.Sender`, `Fee: 0`**
- logs: ASCII `"<name> %i" ‖ itob(value)` for `input_asset_id`, `input_amount`, `swap_amount`, `change`, `output_asset_id`, `output_amount`, `poolers_fee_amount`, `protocol_fee_amount`, `total_fee_amount`
- **No `RekeyTo` check** on either transaction, and no check on the appl's `OnCompletion` beyond the switch, so it must be NoOp.

Fee requirements: every Tinyman inner transaction sets `Fee: 0`. The group's fee credit must cover them: fixed-input means 1 inner, fixed-output means 1 or 2. Credit can come from **any** transaction in the outer group, including other inner transactions, because fee pooling spans all depths. Tinyman's own proxy test pays 5,000 on the top-level proxy call: proxy + 2 inner-group txns + Tinyman payout + final proxy transfer.

Opcode budget: `swap` fits in a single 700 budget. Only `add_liquidity` and single-asset `remove_liquidity` op-up, using a self-deleting app create.

Note on `apas` and asset 0: `swap` never reads `Txn.Assets`. The array is only there so the v7 program can access the `(pool, asset)` holding for the payout transfer. For ALGO pairs, **pass only the ASA**. From an inner transaction, putting asset id `0` into `Assets` fails with `unavailable Asset 0` unless 0 is listed in some top-level transaction's foreign assets **[verified]**.

### 1.6 Quote formulas, also usable on-chain

Fixed input (exact, **[verified]**: equals both the on-chain swap output and the PuyaTs `mulw`/`divw` implementation):

```
total_fee   = floor(in * fee_share / 10_000)        // 0 ⇒ the swap REVERTS (min input = ceil(10_000 / fee_share))
swap_amount = in - total_fee
out         = R_out - (floor(R_in * R_out / (R_in + swap_amount)) + 1)   // 0 ⇒ REVERTS
```

PuyaTs (128-bit safe: `R_in * R_out` overflows uint64 on real pools, for example 8.9e11 × 7.0e12):

```ts
const [hi, lo] = op.mulw(rIn, rOut)
const out: uint64 = rOut - (op.divw(hi, lo, rIn + swapAmount) + 1)
```

`divw` panics if the quotient does not fit in uint64. Here the quotient is ≤ `R_out`, so it is safe.

Revert conditions the adapter's `quote` must map to "leg unavailable" (return 0). The AVM has no try/catch, so a router must never pick a leg that reverts:

- `lock != 0`
- `issued_pool_tokens == 0` (empty pool)
- `total_fee == 0` (dust input)
- `out == 0`
- `R_out` or `R_in` is 0
- input asset not in the pair

### 1.7 Other methods (arg layouts, for fixtures and future custody uses)

Every method uses `apat = [pool]` (`Txn.Accounts[1]`) and `NoOp`, except `bootstrap` (`OptIn` from the pool logicsig).

| method | group shape | args | inners → appl fee |
|---|---|---|---|
| `bootstrap` | `[pay U→pool (min balance + 100k + fee)]`, then `appl OptIn` sent **by pool (lsig)** with `apas=[a1,a2]` and `rekeyTo = app address` | `["bootstrap"]` | ALGO pair 5 → **6000**; ASA pair 6 → **7000** |
| `add_initial_liquidity` | `axfer a1 → pool`, `pay/axfer a2 → pool`, appl with `apas=[lp]` | `["add_initial_liquidity"]` | 1 → 2000. Mints `sqrt(a1*a2) - 1000` (must be > 0) |
| `add_liquidity` | flexible: `[a1, a2, appl]`; single: `[aX, appl]` | `["add_liquidity", "flexible"\|"single", itob(minLp)]` | 2 (op-up + LP) → 3000 |
| `remove_liquidity` | `axfer lp → pool`, appl with `apas=[a1,a2]` (both) or `[aX]` (single) | `["remove_liquidity", itob(min1), itob(min2)]` | both: 2 → 3000; single: op-up + 1 → 3000 |
| `flash_loan` / `verify_flash_loan` | `appl(flash_loan) … repay txns … appl(verify)` | `["flash_loan", itob(indexDiff), itob(amt1), itob(amt2)]` / `["verify_flash_loan", itob(indexDiff)]` | fee is `fee_share` on the borrowed amount |
| `flash_swap` / `verify_flash_swap` | `appl(flash_swap) … pay-back … appl(verify)`; sets `lock=1` in between | same layout as above | k-checked like a swap |
| `claim_fees`, `claim_extra`, `set_fee`, `set_fee_*` | admin and maintenance | | |

`set_fee` takes `["set_fee", itob(total_fee_share), itob(protocol_fee_ratio)]` from `fee_setter`, with `apat=[pool]`.

Minimum balance:

- ASA/ALGO pool: `MIN_POOL_BALANCE_ASA_ALGO_PAIR = 300_000 + 100_000 + 28_500*12 + 50_000*2 = 842_000` **[verified]**
- ASA/ASA pool: 942,000

Bootstrap must also bring 100,000 that the pool forwards to the app for the LP ASA's min balance, plus the appl fee. The SDK computes `required_algo = minBalance + appCallFee + 100_000`.

Other bootstrap rules:

- both ASAs need `total >= 1_000_000`
- `asset_params_get(AssetUnitName)` must report the asset exists (an empty unit name is fine)

### 1.8 AVM notes specific to Tinyman

- **The v7 approval gets no group resource sharing** (sharing applies to v9+ callers only). The inner appl that calls Tinyman must therefore carry its own refs:
  - `accounts: [pool]`, and the pool must be first, because the program reads `Txn.Accounts[1]`
  - `assets: [nonzero pool assets]`
  - **No access lists** (`txn.Access`) on the Tinyman call: the program indexes `Txn.Accounts`.
- The output goes to `Txn.Sender`. That is the account we want credited (the spending account or the pool escrow), so the appl **must be sent by that account**, which is allowed when it is rekeyed to our app.
- An inner app call needs callee version ≥ 4. v7 is fine. ([AVM docs](https://dev.algorand.co/concepts/smart-contracts/avm/))
- Program versions: approval v7 needs clear v7 (version sync applies from v6 on). Use `07 81 01 43`.

---

## 2. Deploying a faithful Tinyman v2 on LocalNet

**Answer: yes, 1:1 with mainnet bytecode. [verified end-to-end on LocalNet]**

The scratch run did all of the following and passed every assertion:

- create the app
- bootstrap an ALGO/ASA pool
- add initial liquidity
- direct fixed-input swap: output 493,579,017 equal to the formula, payout to `Txn.Sender`
- on-chain pool-address derivation
- on-chain quote
- flash-rekeyed inner-group swap from a PuyaTs app

### 2.1 Proposed fixture (`tests/fixtures/external/tinyman-v2.ts`; nothing is written there by this research step)

Vendor the bytecode. Do not fetch it at test time: CI should not depend on GitHub. Two options:

- `tests/fixtures/external/tinyman-v2/amm_approval.teal.tok` (7,731 B) plus `LICENSE`, or
- a base64 constant in the TS fixture.

Pin `sha256 = dd63834d…691f56` in the fixture and assert it at load. Constants:

```ts
export const TM_CLEAR = Uint8Array.from([0x07, 0x81, 0x01, 0x43])
export const TM_POOL_TEMPLATE_B64 = 'BoAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQBbNQA0ADEYEkQxGYEBEkSBAUM='
export const TM_SCHEMA = { globalInts: 0, globalBytes: 3, localInts: 12, localBytes: 2, extraPages: 3 }
export const TM_MIN_POOL_BALANCE = { algoPair: 842_000, asaPair: 942_000 }
```

### 2.2 Steps (algosdk v3 + algokit-utils 9.2.2, both already in the repo; this is the code that ran)

1. **Create the app** (sender: any funded LocalNet account; that account becomes `fee_setter`, `fee_collector` and `fee_manager`):

   ```ts
   makeApplicationCreateTxnFromObject({ sender, approvalProgram: TM_APPROVAL, clearProgram: TM_CLEAR,
     numGlobalInts: 0, numGlobalByteSlices: 3, numLocalInts: 12, numLocalByteSlices: 2, extraPages: 3,
     onComplete: NoOpOC, suggestedParams })
   ```

2. **Fund the app account** with `200_000` µALGO.

3. **Derive the pool logicsig.** Copy the template and write `itob(appId)` at offset 3, `itob(max(a,b))` at 11, and `itob(min(a,b))` at 19. Then `new LogicSigAccount(program)` and `pool = lsig.address()`.

4. **Bootstrap** (atomic group):
   - `pay sender → pool, amount = MIN_POOL_BALANCE + bootstrapFee + 100_000`
   - `appl OptIn { sender: pool, appIndex: tmApp, appArgs: ["bootstrap"], foreignAssets: [a1, a2], rekeyTo: tmAppAddress, fee: 6000 (ALGO pair) / 7000 (ASA pair) }`, signed with `signLogicSigTransactionObject(txn, lsig)`

   Check afterwards (**[verified]**): `pool.authAddr == tmAppAddress`, `pool.minBalance == 842_000` for an ALGO pair, and local state `total_fee_share=30`, `protocol_fee_ratio=6`.

5. **Opt the LP provider into `pool_token_asset_id`** (read it from local state).

6. **Add initial liquidity** (atomic):
   - `axfer a1 → pool`
   - `pay|axfer a2 → pool`
   - `appl NoOp { appArgs: ["add_initial_liquidity"], accounts: [pool], foreignAssets: [lp], fee: 2000 }`

7. **Swap** (as in 1.5): `pay|axfer in → pool`, then `appl { appArgs: ["swap", "fixed-input", itob(minOut)], accounts: [pool], foreignAssets: [a1, a2], fee: 2000 }`.

   For a direct top-level call, listing `0` in `foreignAssets` for an ALGO pair is fine. That is what the SDK does.

8. *(Optional)* Change fees with `set_fee` from the creator: `["set_fee", itob(fee_share 1..100), itob(ratio 3..10)]` with `accounts: [pool]`. Tests use it to match a mainnet pool's 36 bps.

Gotchas found while running it:

- Build the Tinyman transactions with **explicit foreign arrays**: `populateAppCallResources: false`, no `accessReferences`.
- Use a **separate caller account** for anything that runs while the test's "spending account" is rekeyed. A rekeyed EOA cannot sign the next transaction in the same group with its own key. ARC-58 already separates the caller from `controlledAddress`.
- PuyaTs encodes `Account` arguments as ABI `address` and `Application` arguments as `uint64`, not as reference types. Refs therefore never come for free: pass them in `accountReferences`, `appReferences` and `assetReferences`, or populate them via simulate.

---

## 3. Pact

### 3.1 Sources and identity

- SDKs (MIT): <https://github.com/pactfi/pact-py-sdk> (`pactsdk/pool.py`, `pool_state.py`, `swap.py`, `constant_product_calculator.py`, `factories/*`) and <https://github.com/pactfi/pact-js-sdk>.
- Contract TEAL (used by Pact's own CI): <https://github.com/pactfi/algorand-testbed> (branch `master`)
  - <https://raw.githubusercontent.com/pactfi/algorand-testbed/master/contracts/constant_product.teal> is the current factory pool, `VERSION 201`, `#pragma version 8`
  - `constant_product_v_1.teal` (legacy v5, with templated `{primary_asset_id}` etc.), `constant_product_v_2.teal`, `stableswap.teal`, `nft_constant_product.teal`, `factory_constant_product.teal`
  - deploy script: `scripts/deploy.py`
- **[verified]** `constant_product.teal` compiled on LocalNet algod is **byte-identical** to mainnet pool app `1072948743`: 2,080 bytes, `sha256 = 3aa2df6cbdae36ff158d10c07c339150e3200972a8b5e1b2160b11839a979b99`. Mainnet clear is `08810143`.
- The legacy v1 pools (TEAL v5, for example ALGO/USDC `620995314`) **do not** byte-match the testbed v1 source once the templates are filled: same length, 69 bytes differ. **Treat legacy pools as unverified and out of scope for the first adapter.** Note that a meaningful share of Pact liquidity may still be in legacy pools.
- **License: the testbed repo has no LICENSE file**, so all rights are reserved by default. Using its TEAL for local tests is a gray area. Options:
  - (a) ask Pact,
  - (b) pull the deployed bytecode from mainnet at fixture-build time (it is still their code),
  - (c) use a faithful PuyaTs mock (section 5).
- Factory IDs (from `pactsdk/config.py`):
  - mainnet constant-product factory `1072843805` (address `E5QGPA7LWVAVUADJFSZ6TLKRT6LYINNNQGQFVCPNTBHJM7I2HRYGSJBEMM`)
  - mainnet NFT constant-product factory `1076423760`
  - testnet constant-product factory `166540424`
- Factory registry: a box on the factory app. The name is `abi uint64[4] (primary, secondary, fee_bps, version)` and the value is `itob(poolAppId)`. A contract **cannot read another app's boxes**. On-chain authenticity is therefore `pool.creator == factoryAddress`, optionally plus `sha256(pool.approvalProgram) == PACT_V201_HASH`. The 2,080 B program fits under 4,096 B, so `Application.approvalProgram` can be read whole.

### 3.2 Global state (v201)

Schema on mainnet: 7 uints + 4 byte slices. The testbed deploy script allocates 9/4, which also works.

| key | type | meaning |
|---|---|---|
| `A`, `B` | uint | primary / secondary reserves |
| `L` | uint | LP supply |
| `LTID` | uint | LP asset id (created by `CLT`) |
| `FEE_BPS` | uint | total fee on **output** |
| `PACT_FEE_BPS` | uint | treasury share of the gross output (≤ FEE_BPS/2) |
| `VERSION` | uint | 201 |
| `CONFIG` | bytes(24) | `itob(primary) ‖ itob(secondary) ‖ itob(fee_bps)`. Older pools only have this, not `FEE_BPS` |
| `CONTRACT_NAME` | bytes | `"PACT AMM"` (`"[SI] PACT AMM"` = stableswap, `"PACT AMM [NFT]"`) |
| `ADMIN`, `TREASURY` | bytes(32) | addresses |

`primary < secondary` (asserted at create), so ALGO is always `primary = 0`.

### 3.3 SWAP

```
[N-1] deposit: pay   { rcv: poolAppAddress, rekey: 0, close: 0 }        (primary = ALGO)
               axfer { arcv: poolAppAddress, xaid ∈ {primary, secondary}, rekey: 0, aclose: 0 }
[N]   appl     { apid: pool, NoOp, apaa: ["SWAP", itob(minOut)], apas: [primary, secondary] (≤ 3; if 3, the 3rd = LTID),
                 rekey: 0 (asserted), fee: 2000 }
```

- The global gate on every call is `txn RekeyTo == 0 && Assets[0] == primary && Assets[1] == secondary && NumAssets <= 3`. **`Assets[0]` must be literally `0` for ALGO pools.**
- The deposit's **sender is not checked**. Output goes to `Txn.Sender` (`SendToCaller`, `Fee: 0`).
- Math (fee on output, all floor):

  ```
  gross    = floor(in * R_out / (R_in + in))
  pact_fee = floor(gross * PACT_FEE_BPS / 10000)
  out      = floor(gross * (10000 - FEE_BPS) / 10000)
  ```

  It asserts `out >= minOut` through uint underflow (`out - minOut; pop`). It does **not** assert `out > 0`.
- Reserves: `R_out -= out + pact_fee`, `R_in += in`.

**[verified]** The direct swap output (493,564,355) equals the formula, and a PuyaTs on-chain `pactQuote` equals the formula.

### 3.4 LocalNet deploy (v201) **[verified]**

1. `ApplicationCreate`:
   - approval = algod-compiled `constant_product.teal`, clear = `08 81 01 43`
   - global schema 7 uint / 4 bytes, local 0/0, `extraPages: 1`
   - `foreignAssets: [primary, secondary]`
   - `appArgs: [itob(fee_bps), itob(pact_fee_bps), admin(32B), treasury(32B)]`
   - constraints: `fee_bps < 10000`, `pact_fee_bps <= fee_bps/2`
2. Fund the app account: 300,000 (ALGO pool) or 400,000 (ASA/ASA).
3. `appl ["CLT"]` from the **creator** (asserts `CreatorAddress`), `foreignAssets: [primary, secondary]`, fee 2000. This creates the LP (`PLP`).
4. `appl ["OPTIN"]` with `foreignAssets: [primary, secondary]`, fee 3000.
5. LP provider opts into `LTID`. Then the group: deposit primary, deposit secondary, `appl ["ADDLIQ", itob(minLp)]` with `foreignAssets: [primary, secondary, LTID]`, fee 3000. The initial deposit needs `sqrt(a*b) - 1000 > 0`.

### 3.5 Pact-specific adapter constraints

- `rekeyTo` must be zero on both the deposit and the appl. **Hand the account back with a trailing `pay 0 rekeyTo=returnTo`** in the same inner group. **[verified]**: inner shape `pay, appl[+1 inner], pay`.
- For ALGO pools the inner appl needs `assets: [0, asa]`. This works **only if asset 0 is listed in some top-level transaction's foreign assets** (the router call). **[verified]**: without it the inner call fails with `unavailable Asset 0 during assignment`.

---

## 4. Recommendation and adapter execution design

### 4.1 Why Tinyman v2 first

1. **Immutable, audited, verifiable.** Mainnet bytecode equals the public build, and the swap ABI can never change.
2. **On-chain discovery without a registry.** The pool address is a pure function of `(app, a1, a2)`, so the router can find the Tinyman pool for any pair by itself. Pact needs an off-chain lookup plus a creator check.
3. **Faithful LocalNet e2e with clean licensing** (GPL-2.0+ now). Pact's TEAL has no license.
4. **Cheapest handback.** No rekey checks means the handback rides on the swap appl: 2 inners per leg plus 1 venue payout. Pact needs a 3rd inner.
5. **Deepest common liquidity** for the ALGO and ASA pairs Akita cares about, plus an on-chain TWAP that feature 3 can reuse.

### 4.2 Executing as a flash-rekeyed account (ARC-58 spending account)

Outer group (user or agent; a separate caller signs the plugin call):

```
[0] wallet.arc58_rekeyToPlugin(router, type, escrow, methodOffsets, fundsRequest)
       → spending account (controlledAddress or escrow) rekeyed to router.address
[1] router.swap(wallet, rekeyBack=true, legs[], minOutTotal, …)     // the only plugin method in the group
       refs (same txn, see 4.5): accounts [spending, tmPool…], apps [tinyman, adapters…], assets [in, out, mids…]
[2] wallet.arc58_verifyAuthAddress()                                  // satisfies the wallet's assertRekeysBack
```

Inside `router.swap`, for each external leg (the adapter variant described in ARCHITECTURE.md §5):

```
router (depth 0)
 ├─ itxn pay 0 { snd: spending, rcv: spending, rekeyTo: adapter.address }
 ├─ itxn appl adapter.swap(spending, assetIn, amountIn, assetOut, minOut, venueData, returnTo=router.address)
 │    adapter (depth 1): asserts Global.callerApplicationId == router (approved router), spending.authAddress == adapter
 │     └─ itxn GROUP
 │          [0] pay|axfer { snd: spending, rcv: tmPool, amt: amountIn }
 │          [1] appl { snd: spending, apid: TINYMAN, apaa: ["swap","fixed-input",itob(minOut)],
 │                     apat: [tmPool], apas: [nonzero assets], rekeyTo: returnTo }   ← handback rides here
 │                Tinyman (depth 2) → itxn axfer|pay { snd: tmPool, rcv: spending, amt: out }
 └─ router asserts spending.authAddress == router.address
       Δin(spending) ≥ −amountIn, Δout(spending) ≥ minOut   (same guard pattern as the DEX k-guard)
… after all legs: router asserts Σout ≥ minOutTotal, then rekeys spending → wallet (rekeyAddress(rekeyBack, wallet))
```

**[verified]** I compiled this pattern with puya-ts 1.3.1 and ran it on LocalNet, using one app as both router and adapter. The test account was rekeyed to the probe and the probe sent the inner group `[pay(spending), appl(spending, rekeyTo=spending)]`. Results:

- returned output 958,466,344, equal to the on-chain quote
- `auth-addr` cleared afterwards

For Pact the inner group is `[deposit, appl SWAP, pay 0 rekeyTo=returnTo]`, also **[verified]**.

**Alternative (recommended for the backrun hook): an inlined venue library.** Put the venue code in a shared PuyaTs module, for example `smart_contracts/plugin-dex/venues/tinyman-v2.ts` with `tmPoolAddress`, `tmQuoteIn` and `tmSwapAs(account, …, rekeyTo)`, and import it from both the adapter contract and the backrun hook. Callers that already hold the account (the backrun hook holds the pool escrow) then skip the extra flash-rekey hop. That saves 2 inners and one depth level.

Keep **adapters as separate apps for the router** so each venue can be upgraded and approved on its own, as in ARCHITECTURE.md. PluginDex is immutable, so nothing venue-specific should live in it.

### 4.3 Adapter interface sketch (PuyaTs ABI; Account→`address`, Application→`uint64`)

```ts
// read-only, deterministic; 0 = leg not executable (never revert)
quote(assetIn: uint64, assetOut: uint64, amountIn: uint64, venueData: bytes): uint64
// executes as `account` (rekeyed to this adapter); must hand `account` back to `returnTo` in its last inner txn
swap(account: Account, assetIn: uint64, amountIn: uint64, assetOut: uint64, minOut: uint64,
     venueData: bytes, returnTo: Account): uint64
```

For Tinyman, `venueData` is empty: the pool is derived. For Pact it is `itob(poolAppId)`, checked with `creator == factory`.

The adapter also asserts:

- caller app ∈ {approved router, approved hook}
- `account.authAddress == Global.currentApplicationAddress` at entry
- `assetIn != assetOut`
- that the derived or verified pool matches the pair

### 4.4 Inner transactions, fees and depth per external leg

| step | Tinyman leg | Pact leg |
|---|---|---|
| router: rekey to adapter + adapter call | 2 | 2 |
| adapter inner group | 2 (deposit, appl+handback) | 3 (deposit, appl, handback pay) |
| venue payout | 1 | 1 |
| **total inners** | **5** | **6** |
| deepest app call | router 0 → adapter 1 → venue 2 (payout is a txn at depth 2) | same |

With the inlined library (no adapter hop), a Tinyman leg costs 3 inners.

All inners use `fee: 0`. The outer caller overpays: `fee ≈ (outer txns + Σ inners) × minFee`. With `coverFees` on the wallet plugin, ARC-58 reimburses the caller up to `(MAX_INNER + MAX_OUTER) × minFee`.

The inner-transaction pool is 16 per top-level app call, at most 256. The 3-transaction outer group gives 48, which is enough for about 8 Tinyman legs. Longer routes add `PluginDex.opUp()` or other no-op app calls to the group.

### 4.5 Resource checklist (failures hit during verification)

1. **`(spending, assetOut)` holding:** the router or adapter reads `assetBalance(spending, assetOut)`. Under v9 group sharing, a holding is shared only if **both** parts are available in the **same top-level transaction** (pre-v9 rule). The spending account being the sender of `[0]` does not count. Put `spending` in the router call's `accounts`. **[verified]** Without it the call failed with `unavailable Holding`.
2. **`(tmPool, tinyman)` local pair** for quotes: put both in the same top-level transaction (router call `accounts` + `apps`), or list the local explicitly with access lists.
3. **Tinyman's own inner appl** must carry `accounts: [pool]` and `assets: [nonzero]`, because v7 does not share. Each one must be available to the adapter, which the top-level refs make true.
4. **Asset 0** only for Pact ALGO pools. It must appear in some top-level `foreignAssets`.
5. Our own v10+ calls may use access lists (algokit-utils 9.2.2 `accessReferences`). The **Tinyman and Pact calls are inner and use legacy arrays**, which is fine. When access lists are used at top level, list holdings and locals explicitly: they are no longer implied by their parts.
6. 8 refs per transaction: a long route spreads refs over extra no-op app calls in the outer group. Account refs from any top-level transaction are shared with v9+ callers, but holdings and locals must be co-located (items 1 and 2).

### 4.6 Backrun custody hook against an external venue

The PluginDex custody hook holds the **pool escrow** (rekeyed to the hook). It calls the venue library with `account = escrow` and `rekeyTo = dex.address` on the last transaction. The DEX then books the deltas and enforces k ≥ k₀.

Mechanics:

- Tinyman pays out to `Txn.Sender = escrow`. The escrow already holds both pool assets, so no opt-in is needed.
- Fees: escrow-sent inners must use `fee: 0`. A non-zero fee spends escrow ALGO. In ALGO pools that is booked as a reserve loss. In ASA pools the escrow sits exactly at its min balance, so the fee fails.
  - Either the swapper's outer group pre-pays, or the hook adds a fee-carrying `pay 0` from **its own app account** to its inner group. Fee credit pools across inner transactions.
- Depth: `DEX(0) → hook(1) → Tinyman(2) → payout`. The hook must not call the router plugin; it needs the wallet context. Inline the library instead.

Optimal arbitrage size against a constant-product venue (closed form, computable on-chain with `op.bsqrt` on `biguint`):

- The hook sells Δx of X from our pool to the venue for Δy.
- Our pool has reserves `(x₁, y₁)`. The k-guard needs `Δy ≥ x₁y₁/(x₁-Δx) - y₁`.
- The venue has reserves `(x₂, y₂)` of the same `(X, Y)` (so `x₂` is the venue's input-side reserve) and fee factor γ:
  - Tinyman (fee on input): `Δy = γΔx·y₂/(x₂+γΔx)`, with `γ = 1 - fee_share/10⁴`.
  - Pact (fee on output): `Δy = γ'Δx·y₂/(x₂+Δx)`, with `γ' = 1 - FEE_BPS/10⁴`.
- LP surplus is maximized at:

  ```
  Tinyman: Δx* = ( x₁·√(γx₂y₂) − x₂·√(x₁y₁) ) / ( √(γx₂y₂) + γ·√(x₁y₁) )
  Pact:    Δx* = ( x₁·√(γ'x₂y₂) − x₂·√(x₁y₁) ) / ( √(γ'x₂y₂) + √(x₁y₁) )
  ```

- Trade only if `Δx* > 0`, that is, when the venue's post-fee marginal price `γ·y₂/x₂` exceeds `y₁/x₁`. Otherwise run the mirror case selling Y.
- Use `minOut = ceil(x₁y₁/(x₁-Δx*)) - y₁ + 1` on the venue call, so a stale venue reverts in the venue rather than in the k-guard.
- Everything above the k-requirement stays in the reserves, so the profit goes to LPs, which is the stated goal.
- Do this only at `AfterSwap`. `Quote` must stay side-effect free, and the hook must not subscribe to `Quote` for the arbitrage.

### 4.7 Quote determinism and MEV

The adapter `quote` reads venue state at execution time. Earlier transactions in the same group (or a sandwich in the same block) can move it. The router's aggregate `minOutTotal` and the per-leg `minOut` passed to the venue are the protection.

Re-quote inside `swap` (it is cheap) and pass that value as Tinyman's `minOut`. A leg that degrades then reverts in the venue with a clear cause.

---

## 5. Faithful-mock fallback (if vendoring is rejected)

- **Tinyman:** no mock is needed. The real bytecode is public and licensed. If one were required anyway, a PuyaTs mock is **not faithful** in the ways that matter:
  - a PuyaTs approval is v10+, so it gets group resource sharing that Tinyman does not have
  - the logicsig pool account must be a real lsig rekeyed to the app; a mock app account would break pool derivation
  - Use the real bytecode.
- **Pact:** a PuyaTs mock app per pool. It must:
  - use global keys `A`, `B`, `L`, `LTID`, `FEE_BPS`, `PACT_FEE_BPS`, `VERSION`, and `CONFIG` (24 B), with `CONTRACT_NAME="PACT AMM"`
  - accept `["SWAP", itob(min)]` with the deposit at `GroupIndex-1`
  - assert `RekeyTo == 0` on both transactions, plus `Assets[0]==primary`, `Assets[1]==secondary` and `NumAssets<=3`
  - use the same floor math (`mulw`/`divw`), pay to `Txn.Sender`, and use `Fee: 0`

  Risks: mock-only behavior. A v10 program sees shared resources, so a missing ref that would fail on mainnet passes in tests. Rounding edge cases are another risk. Mitigate by running the adapter suite once against the algod-compiled testbed TEAL in a non-CI job.

---

## 6. Probe contract used for verification (scratch, not added to the repo)

Kept here because `npm run build` compiles every `*.algo.ts` under `smart_contracts/`. Compiled with puya-ts 1.3.1.

```ts
import { Account, Application, Bytes, bytes, Contract, itxn, op, uint64 } from '@algorandfoundation/algorand-typescript'
const TM_POOL_PREFIX = Bytes.fromHex('068018')
const TM_POOL_SUFFIX = Bytes.fromHex('81005b3500340031181244311981011244810143')
export class VenueProbe extends Contract {
  tmPoolAddress(tinyman: Application, assetA: uint64, assetB: uint64): bytes { /* as in 1.3 */ }
  tmQuote(tinyman: Application, pool: Account, assetIn: uint64, amountIn: uint64): uint64 {
    const [a1] = op.AppLocal.getExUint64(pool, tinyman, Bytes('asset_1_id'))
    const [r1] = op.AppLocal.getExUint64(pool, tinyman, Bytes('asset_1_reserves'))
    const [r2] = op.AppLocal.getExUint64(pool, tinyman, Bytes('asset_2_reserves'))
    const [feeShare] = op.AppLocal.getExUint64(pool, tinyman, Bytes('total_fee_share'))
    const rIn: uint64 = assetIn === a1 ? r1 : r2
    const rOut: uint64 = assetIn === a1 ? r2 : r1
    const swapAmount: uint64 = amountIn - (amountIn * feeShare) / 10_000
    const [hi, lo] = op.mulw(rIn, rOut)
    return rOut - (op.divw(hi, lo, rIn + swapAmount) + 1)
  }
  tmSwapAlgoIn(account: Account, tinyman: Application, pool: Account, assetOut: uint64,
               amountIn: uint64, minOut: uint64, returnTo: Account): uint64 {
    const [before] = op.AssetHolding.assetBalance(account, assetOut)
    itxn.submitGroup(
      itxn.payment({ sender: account, receiver: pool, amount: amountIn }),
      itxn.applicationCall({ sender: account, appId: tinyman,
        appArgs: [Bytes('swap'), Bytes('fixed-input'), op.itob(minOut)],
        accounts: [pool], assets: [assetOut], rekeyTo: returnTo }),
    )
    const [after] = op.AssetHolding.assetBalance(account, assetOut)
    return after - before
  }
  pactSwapAlgoIn(account: Account, pact: Application, assetOut: uint64, amountIn: uint64,
                 minOut: uint64, returnTo: Account): uint64 {
    const [before] = op.AssetHolding.assetBalance(account, assetOut)
    itxn.submitGroup(
      itxn.payment({ sender: account, receiver: pact.address, amount: amountIn }),
      itxn.applicationCall({ sender: account, appId: pact, appArgs: [Bytes('SWAP'), op.itob(minOut)], assets: [0, assetOut] }),
      itxn.payment({ sender: account, receiver: account, amount: 0, rekeyTo: returnTo }),
    )
    const [after] = op.AssetHolding.assetBalance(account, assetOut)
    return after - before
  }
}
```

PuyaTs APIs used, all checked in `node_modules/@algorandfoundation/algorand-typescript@1.3.1`:

- `itxn.submitGroup`, `itxn.payment`, `itxn.applicationCall` (fields `accounts`, `assets`, `apps`, `rekeyTo`; `rejectVersion` also exists)
- `op.AppLocal.getExUint64(account, app, key)`, `op.AppGlobal.getExUint64` and `getExBytes`
- `op.AssetHolding.assetBalance`
- `op.mulw`, `op.divw`, `op.sha512_256`, `op.concat`, `op.extractUint64`, `op.bsqrt(biguint)`
- `Bytes.fromHex`
- `Application.{approvalProgram, creator, address, version}`
- `Account.authAddress`

LocalNet results:

| check | result |
|---|---|
| Tinyman bootstrap: local state, auth-addr = app, min balance 842,000 | PASS |
| Tinyman add_initial_liquidity / direct swap = formula | PASS (493,579,017) |
| on-chain `tmPoolAddress` = off-chain lsig address | PASS |
| on-chain `tmQuote` = formula | PASS (958,466,344) |
| flash-rekeyed inner-group Tinyman swap = quote, account handed back | PASS (inner shape `pay(user), appl(user)[+1 inner]`) |
| Pact v201 compiled hash = mainnet `1072948743` | PASS |
| Pact ADDLIQ / direct SWAP = formula | PASS (493,564,355) |
| on-chain `pactQuote` = formula | PASS (958,401,350) |
| flash-rekeyed inner-group Pact swap + trailing handback | PASS (`pay, appl[+1 inner], pay`), once asset 0 was in the top-level refs |

## 7. Open questions and risks

- **Tinyman fee changes:** `fee_setter` can change `total_fee_share` per pool (1–100 bps) at any time. Always read it, never cache it.
- **`lock`:** a `flash_swap` earlier in the same group makes every swap revert until `verify_flash_swap`. The adapter quote returns 0 when `lock != 0`.
- **Pact legacy pools** (pre-factory, TEAL v5) are unverified. Possible liquidity gap.
- **Pact licensing** for vendored TEAL is unresolved (no LICENSE).
- **Access lists:** when a top-level call uses `txn.Access`, holdings and locals must be listed explicitly. Check that algokit's `populateAppCallResources` in 9.2.2 co-locates holding and local pairs for the router call. ARCHITECTURE.md already notes that it regroups `swapRoute` wrongly. Plan on explicit refs in the SDK.
- **Haystack** is already integrated as an off-chain-routed aggregator plugin (`arc58/plugins/haystack-router`). The on-chain router complements it with hook-aware, deterministic quotes and Akita pools.
