# Lane plugins report (MISC-1, MISC-2, MISC-S1, GUILD-1)

All paths are under `projects/akita-sc/smart_contracts` unless noted.

## Findings

### MISC-1 (High): NFD `purchase` has no buyer bound. Done.

- `arc58/plugins/nfd/contract.algo.ts:248-262`: `purchase(wallet, rekeyBack, appId, maxPrice)`. The plugin reads `i.sellamt` once, asserts `saleAmount <= maxPrice` (`errPriceAboveMax` = `errNpmx`), and pays that amount.
- New error in `arc58/plugins/nfd/errors.ts` (`errPriceAboveMax = 'errNpmx'`, unique in the repo).
- SDK: `projects/akita-sdk/src/wallet/plugins/nfd.ts` arg types now use the new signatures, so `nfdPlugin.purchase({ appId, maxPrice })` requires `maxPrice` (TypeScript enforces it). There are no other callers of NFD `purchase` in scripts, SDK or tests.

### MISC-S1 (suspicion): `autoRenew` price taken from the NFD. Done (caller cap added). Root-owner manipulation not observed.

What I found (read-only MainNet simulate of `getRenewPrice()`, 2026-10-05):

| NFD | Kind | Parent `i.segmentPriceUsd` / locked | `getRenewPrice` |
|---|---|---|---|
| tmnp.puffins.algo 3730680159 | segment | 500 / unlocked | 39,450,000 µA |
| football.ddao.algo 3717340438 | segment | 500 / unlocked | 39,450,000 µA |
| bot.corvid.algo 3714696559 | segment | none / locked | 39,450,000 µA |
| puffins.algo 772000693 | root | | 47,340,000 µA |
| ddao.algo 3214491066 | root | | 94,680,000 µA |

- Segment renewals cost the same for all three segments, whatever the parent's segment price or lock state. So the renewal price is not set by the root owner in these samples. That is evidence against S-1 as written, not a proof for every NFD version.
- The price is not fixed by the registry either. The NFD app computes it at call time from a USD price and the ALGO/USD oracle (root prices differ by name length). It moves with the oracle and with any NFD contract upgrade.
- Fix: `renew(wallet, rekeyBack, appId, years, maxPrice)` asserts `price * years <= maxPrice` (`contract.algo.ts:402-415`). `autoRenew(wallet, rekeyBack, appId, maxPrice)` asserts `price <= maxPrice` (`:435-464`). Same `errNpmx` error.
- Limit: `maxPrice` is caller-supplied. It protects the caller against a price change between signing and execution. With an execution-key grant the owner approves the exact group, so the owner fixes the cap. With a Global or agent grant, the caller picks the cap, so it does not limit a hostile keeper. An owner-configured cap (per-wallet box in the plugin) would close that. I did not build it because the brief asked for a caller cap and the root-owner path was not observed.

### MISC-2 (Medium): one Haystack router input reimbursed by several swap calls. Done.

- `arc58/plugins/haystack-router/contract.algo.ts:109-112`: `findFundingTxnIndex` stops its forward scan at the next top-level call to this plugin. Each swap call can claim only inputs between itself and the next call to the plugin. Those ranges never overlap, so one input funds at most one swap, in one window or across windows. Two swaps with their own inputs in one group still work.
- Program 827 bytes (new app, no schema change).

### GUILD-1 (Medium, decision: no automatic updates). Done.

- `arc58/guilds/core/contract.algo.ts:836-837`: `createWallet` passes `automaticUpdates = false` to `newAccount`. The factory's `updateWallet` now requires `Txn.sender == admin == Guild`, which only the Guild's `UpdateWallet` action satisfies.
- No guild test relied on automatic updates. `scripts/update-automatic-wallets.ts` reads each wallet's settings, so new Guild treasuries are simply skipped.
- Guild approval 10,244 bytes (new app).

## Regression tests

| Test | File | Failed on old code? |
|---|---|---|
| `NFD plugin caller price bounds (MISC-1, MISC-S1) > purchase rejects a seller price raised above maxPrice and pays exactly the listed price at the bound` | `arc58/plugins/nfd/auto-renew.e2e.spec.ts` | Not runnable on old code (the old ABI has no bound to pass). The scenario is the old behaviour: a raised `i.sellamt` was paid in full. |
| `... > autoRenew rejects an NFD renewal quote raised above maxPrice` | same | Same (new arg). |
| `... > renew bounds the total price for all years` | same | Same (new arg). |
| `Haystack temporary-account funding > reimburses one router input at most once across swap calls in one rekey window` | `arc58/plugins/haystack-router/contract.e2e.spec.ts` | Yes. On the old build the double-claim group succeeded ("Expected contract error errIhfd"). |
| `... in two rekey windows` | same | Yes, same. |
| `... > the manual window builder funds a single swap` (control for the helper above) | same | Passed on old code, as it should. |
| `Guild production ARC-58 wallet integration > re-deploys the wallet program through its factory only on governance approval` (stranger `updateWallet` reverts `errAdmn`, then the governed `UpdateWallet` succeeds) | `arc58/guilds/tests/real-wallet.e2e.spec.ts` | Yes. On the old build the stranger's update succeeded ("Expected contract error errAdmn"). |

Test support: `arc58/plugins/nfd/auto-renew-mock.algo.ts` `Arc58NfdInstanceMock` gained `i.sellamt`, `setSaleAmount`, `purchase(pay)` and `purchase_count`. `auto-renew.e2e.spec.ts` gained a `method` grant option and a shared `invokePluginWindow` helper. The Haystack spec builds its double-claim groups by hand with distinct notes, because identical swap calls would otherwise be duplicate transactions.

Existing tests updated for the new ABI (not for insecure behaviour): every `autoRenew`/`renew` call in `nfd.e2e.spec.ts` and `auto-renew.e2e.spec.ts` now passes `maxPrice`, and the `autoRenew` arg-type assertion is now `['uint64','bool','uint64','uint64']`.

## Files changed

- `arc58/plugins/nfd/contract.algo.ts`, `errors.ts`, `auto-renew-mock.algo.ts`, `auto-renew.e2e.spec.ts`, `nfd.e2e.spec.ts`
- `arc58/plugins/haystack-router/contract.algo.ts`, `contract.e2e.spec.ts`
- `arc58/guilds/core/contract.algo.ts` (one argument plus a one-line comment), `arc58/guilds/tests/real-wallet.e2e.spec.ts`
- `projects/akita-sdk/src/wallet/plugins/nfd.ts` (owned SDK module; type keys only)
- Generated by the build: `artifacts/arc58/plugins/nfd/*`, `artifacts/arc58/plugins/haystack-router/*`, `artifacts/arc58/guilds/**`, `projects/akita-sdk/src/generated/{NFDPluginClient,HaystackRouterPluginClient,Guild*}.ts`, SDK `dist`.
- Shared files: none changed. `tests/compat/fixtures/signature-catalog.json` still lists the old NFD selectors (`purchase(uint64,bool,uint64)void`, `autoRenew(uint64,bool,uint64)void`). It maps live MainNet programs, so I left it alone.

## Tests run (LocalNet, under the lock)

- `arc58/plugins/nfd/auto-renew.e2e.spec.ts`: 25/25 passed.
- `arc58/plugins/haystack-router/contract.e2e.spec.ts`: 13/13 passed.
- `arc58/plugins/nfd/nfd.e2e.spec.ts`: the `NFD plugin auto-renew safety` block passed 6/6. The `NFD plugin contract` block (5 tests) did not run: its `beforeAll` (`buildAkitaUniverse` → `deployAuctionFactory`, `tests/fixtures/auction.ts:92`) failed with "balance 3380100 below min 3394900". The auction contract was being edited by another lane at the time (auction/contract.algo.ts modified 11:52).
- `arc58/guilds/tests/*` + `arc58/plugins/guild/guild.e2e.spec.ts`: 12 files, 80/80 passed.
- `npx tsc -p tsconfig.test.json`: no errors in any file I touched. SDK `npm run build` succeeded.

- Retry after the auction lane settled: `nfd.e2e.spec.ts` 11/11 and `arc58/plugins/plugin-sdk-hooks.e2e.spec.ts` 2/2 passed. The earlier `beforeAll` failure came from the other lane's in-flight auction edit, not from this lane.
- Totals: 25 + 13 + 11 + 2 + 80 = 131 tests run, 131 passed.

## Size / schema / ABI for apps already on MainNet

None. NFDPlugin v2, HaystackRouterPlugin v2 and Guild are new or immutable apps. ABI changes: NFDPlugin `purchase`, `renew` and `autoRenew` each gain a trailing `maxPrice: uint64` (new selectors). Haystack and Guild ABIs are unchanged.

## Rollout steps added or changed

1. Deploy NFDPlugin v2 from this build. Any grant that lists `autoRenew`, `renew` or `purchase` by selector must be (re)created against the new selectors. Clients and keepers must pass `maxPrice` (keepers: the current `getRenewPrice` quote plus a tolerance they choose).
2. Deploy HaystackRouterPlugin v2 from this build (it was already a new app ID).
3. Deploy the Guild template from this build. Guild treasuries created by it are not auto-updated by `update-automatic-wallets.ts`. Their wallet upgrades go through a Guild `UpdateWallet` proposal. Guilds created earlier keep `automatic = true`, and no Guild action can change that.
