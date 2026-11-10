# Lane report: trade (2026-10-05)

Paths are relative to `projects/akita-sc/smart_contracts/` unless stated otherwise. Nothing was committed, pushed or sent to TestNet/MainNet.

## Findings

| ID | Status | Change |
|---|---|---|
| TRADE-1 (High) | done | `arc58/plugins/auction/contract.algo.ts:497-509`. The TS method is now `legacyDeleteApplication` with `@abimethod({ name: 'deleteApplication', allowActions: 'NoOp' })`. Selector stays `0xbedfc93b` (`deleteApplication(uint64,bool,uint64)void`); compiled call actions changed from `[DeleteApplication]` to `[NoOp]`. `utils/functions.ts getControlledSpendingAccount` is unchanged. |
| TRADE-2 (High) | done | `auction/factory.algo.ts:123-127` (ASA path `newAuctionImpl`) and `raffle/factory.algo.ts:254-257` (`newRaffle`): assert `clawback == zero && freeze == zero` on the prize ASA, error `errPszb` (`errPrizeSeizable`, added to `auction/errors.ts` and `raffle/errors.ts`). Nothing new stored. Prize-box paths keep the PrizeBox clawback check (freeze there is L-7, out of scope). |
| TRADE-3 (Medium) | done | Constants (`auction/constants.ts:80-89`, `raffle/constants.ts:49-58`): `BEACON_ROUND_INTERVAL = 8`, `BEACON_LAG_ROUNDS = 4` (was 8), `BEACON_MAX_WAIT_ROUNDS = 1_000`, `DRAW_DELAY_ROUNDS = 8`. New `commitDrawRound()` (`auction/contract.algo.ts:781-784`, `raffle/contract.algo.ts:792-795`) commits to `ceil8(round + 8)`. On an empty read, `loggedAssert(round >= raffleRound + MAX_WAIT, errBnrd)` (`auction:826`, `raffle:837`), so an early empty read reverts and changes nothing; only after 1,000 rounds does it bump `vrfFailureCount` and re-commit (to a multiple of 8). SDK `AUCTION_BEACON_LAG_ROUNDS` / `RAFFLE_BEACON_LAG_ROUNDS` 8n → 4n (`akita-sdk/src/auction/index.ts:26`, `raffle/index.ts:28`), so `drawReadyRound()` = `raffleRound + 4`. Mock beacon: added `submitLag` state + `setSubmitLag(lag)` (`utils/types/mock-randomness-beacon.algo.ts`). Needed: the old mock answered every round at once and could not reproduce the residue-1 stall. With lag > 0 it answers round r only once `Global.round >= ceil8(r) + lag`, the MainNet beacon's observed behaviour. Default 0 keeps every existing test's behaviour. |
| TRADE-4 (Medium) | done | `auction/factory.algo.ts:44-52` `validateRaffleConfig`: `bidFee == 0` now requires `weightsListCount == 0` (`errWnbf`, `errWeightsNeedBidFee`). `newAuctionCost` has no `bidFee` argument (selector kept), so the assert form was used rather than conditional charging. |
| TRADE-5 (Medium) | done | Auction: `sendBidAssetOrDisburse` now handles ALGO (plain send) and returns the disbursement MBR cost (`auction/contract.algo.ts:317-335`). `refundBid` logic split into `markRefunded` (`:760-779`); public `refundBid` still sends directly (so a standalone refund cannot drain the settlement disbursement budget before settlement). `refundMBR` refunds through `sendBidAssetOrDisburse` (`:912-918`) and deducts the disbursement cost from that bidder's released box MBR (`:934-942`). `claimRafflePrize` pays the loser-raffle winner through `sendBidAssetOrDisburse` (`:988`). Raffle: `sendTicketsOrDisburse` handles ALGO and returns the cost (`raffle/contract.algo.ts:267-289`); failed-raffle `refundMBR` uses it and deducts the cost from the released entry MBR (`:477-494`). Residual (Low, by design): if the cost exceeds the released MBR (raffle entry 50,600 µA < 67,000 µA; a repeat auction bid 35,300 µA) the shortfall comes from the child's leftover disbursement budget; if that is empty, anyone can unblock by sending ALGO to the child (same class as the report's ALGO variant). |
| TRADE-6 (Medium) | done | `marketplace/listing.algo.ts:128-130`: `>=` instead of `===`. The close-out already sends any donation to the buyer. The 2 live MainNet listings (3643990817, 3691743616) keep their deployed code (rev-absent, no amount check at all); only new listings get this. |

TRADE-1 audit of other plugins: after the build, a scan of all 34 `artifacts/arc58/plugins/**/*.arc56.json` found no method whose call actions include anything other than `NoOp`, and no bare call actions. Source grep found no other plugin method named `deleteApplication` / `updateApplication` / `closeOutOfApplication` / `optInToApplication` / `clearState*`. Before the fix the only hit was AuctionPlugin `deleteApplication` → `[DeleteApplication]`.

## Regression tests

All 10 failed on the pre-fix contracts (run with the new mock artifact; note the shared SDK dist had already been rebuilt by other lanes with my `drawReadyRound` change, see below).

| Test | File | Pre-fix result |
|---|---|---|
| TRADE-1: the plugin cannot be deleted through its deleteApplication method, even with a spoofed wallet | `arc58/plugins/auction/auction.e2e.spec.ts` | failed: the DeleteApplication call succeeded (`promise resolved 'deleted'`), i.e. the full fake-wallet attack deleted the plugin. Post-fix it reverts, the plugin still exists, and the same call as NoOp still routes the seller's deletion through the factory. |
| TRADE-2 (auction) / TRADE-2 (raffle): the factory rejects a prize ASA that has a clawback or freeze address | `auction/auction.e2e.spec.ts`, `raffle/raffle.e2e.spec.ts` | failed: creation succeeded |
| TRADE-3: the draw commits to a stored beacon round and completes at the first allowed reveal (auction) | `auction/auction.e2e.spec.ts` | failed: `raffleRound % 8` was 1 (commit forced into a round ≡ 1 mod 8, mock lag 2) |
| TRADE-3 (raffle, two tests): commit to stored round + early empty read changes nothing; first allowed reveal succeeds under MainNet timing | `raffle/raffle.e2e.spec.ts` | failed: `raffleRound % 8` was 1; the second failed with `errNetm` at the reveal |
| TRADE-4: a zero-fee auction cannot be charged for weights boxes | `auction/auction.e2e.spec.ts` | failed: creation succeeded |
| TRADE-5 (auction): a bidder that opted out of the bid asset blocks neither refunds, the raffle prize nor deletion | `auction/auction.e2e.spec.ts` | failed, but at the draw step (`errNetm`: old contract lag 8 vs the already-rebuilt SDK lag 4), before reaching the opt-out step. Not a clean demonstration of the opt-out block. |
| TRADE-5 (raffle): failed ASA-ticket raffle with an opted-out entrant | `raffle/raffle.e2e.spec.ts` | failed: `receiver error: must optin` in `refundMBR` (the reported block) |
| TRADE-6: a donated unit does not make a fungible listing unsellable | `marketplace/marketplace.e2e.spec.ts` | failed: `errPchg` on purchase |

Existing tests updated:
- `auction/auction.e2e.spec.ts` AR-01 test asserted the insecure behaviour (an empty read at `drawReadyRound` re-commits). It now asserts the empty read reverts with `errBnrd` and keeps `raffleRound` and `vrfFailureCount = 0`, then warps to `raffleRound + 1,000` and asserts the re-commit (count 1, multiple of 8, in the future). The `createAuction` helper gained `prizeAsset` / `weightsListCount` options.
- `raffle/raffle.e2e.spec.ts` `createRaffle` helper gained `prizeAsset`.
- `auction/principal-abi.test.ts`: the "Auction child fits 4 pages / 8,192 B" pin now allows 5 pages for Auction (Raffle still ≤ 8,192); the RaffleFactory size/sha pin was re-pinned to the whole-tree compile of the new source (3,794 B, sha256 `48d78be8da3782c34b407c92080a466e3182ebe5db10a3245de645e1d9dff1ae`).
- `tests/migration-scripts.e2e.spec.ts` (shared): the auction case created a zero-fee auction with `weightsListCount: 4` (the TRADE-4 input). It now passes `weightsListCount: 0n` for the auction only.

## Files changed

Owned:
- `arc58/plugins/auction/contract.algo.ts`, `arc58/plugins/auction/auction.e2e.spec.ts`
- `auction/factory.algo.ts`, `auction/contract.algo.ts`, `auction/constants.ts`, `auction/errors.ts`, `auction/auction.e2e.spec.ts`, `auction/principal-abi.test.ts`
- `raffle/factory.algo.ts`, `raffle/contract.algo.ts`, `raffle/constants.ts`, `raffle/errors.ts`, `raffle/raffle.e2e.spec.ts`
- `marketplace/listing.algo.ts`, `marketplace/marketplace.e2e.spec.ts`
- `utils/types/mock-randomness-beacon.algo.ts`
- SDK: `akita-sdk/src/auction/index.ts`, `akita-sdk/src/auction/errors.ts` (PSZB, WNBF, BNRD messages), `akita-sdk/src/raffle/index.ts`, `akita-sdk/src/raffle/errors.ts` (PSZB, BNRD)
- Artifacts rebuilt for roots `auction raffle marketplace arc58/plugins/auction arc58/plugins/raffle` and `utils/types/mock-randomness-beacon.algo.ts`; the build script regenerated every typed client from the artifacts. SDK dist rebuilt.

Shared (flagged):
- `tests/fixtures/auction.ts`: funds the AuctionFactory `bc` box from the real child size, `max(3,280,100, 2,500 + 400 × (2 + size))` µA. Required: with the 8,229 B child, every `buildAkitaUniverse` failed in `deployAuctionFactory` (`balance 3380100 below min 3394900`). This briefly broke other lanes' universe builds between my artifact build and this fix (the stake lane report notes it, resolved 12:14).
- `tests/migration-scripts.e2e.spec.ts`: see above.
- No change to `utils/*`, `utils/functions.ts`, `projects/akita-plugin` or SDK `index.ts`.

## Tests run

- Pre-fix: 4 e2e files, `-t TRADE`: 10 failed / 87 skipped (all 10 regression tests failed, reasons above). A first attempt OOM-crashed vitest while printing a resolved SDK object; the `rejects` assertions now map the resolved value to a string.
- Post-fix e2e (LocalNet lock), 15 files: `auction/auction`, `auction/principal`, `raffle/raffle`, `raffle/principal`, `marketplace/marketplace`, `marketplace/principal`, `marketplace/compat`, `arc58/plugins/auction`, `arc58/plugins/raffle`, `tests/compat/compat`, `tests/migration-scripts`, `staking-pool/staking-pool` (uses the mock beacon), `arc58/plugins/plugin-sdk-hooks`, `arc58/plugins/update-akita-dao/rollout`, `sunset/sunset-integration`: 364 passed, 1 failed, 6 skipped (371).
  - The 1 failure was `migration-scripts` (zero-fee auction with weights, TRADE-4). After the test fix: `tests/migration-scripts.e2e.spec.ts` 60/60 passed.
  - The 6 skipped are `tests/compat/compat.e2e.spec.ts` section D, whose `beforeAll` fails with `read budget exceeded (10267 > 10240)` while upgrading the WalletFactory through the DAO. Not this lane: no wallet/factory code touched; the stake lane reports the same failure.
- Unit (no LocalNet): `auction/principal-abi`, `marketplace/compat-static`, `raffle/winner-search`, `tests/compat/compat-static`, `update-akita-dao/rollout.test`, `staking-pool/compat.test`: 206 passed, 1 failed. The failure is the RaffleFactory sha pin: the installed artifact comes from a root build (sha `f830d5cd…`), the pin is the whole-tree compile (`48d78be8…`); same 3,794 B. It passes once the coordinator's whole-tree build installs the artifacts (if other lanes' shared `utils` edits change the bytes again, re-pin from that build). `tests/logged-error-codes.test.ts` 2/2. SDK unit `src/auction src/raffle src/marketplace` 29/29. `tsc -p tsconfig.test.json` and SDK `tsc` report no errors in the edited files.

## Size / schema / ABI for apps on MainNet

| App | Approval before → after | Pages | Schema | ABI |
|---|---|---|---|---|
| AuctionFactory 3569557408 | 4,719 → 4,781 B | needs 2 (live 3) | 8/56 unchanged | no selector change |
| RaffleFactory 3569557743 | 3,751 → 3,794 B | needs 2 (live 3) | 8/56 unchanged | no selector change |
| Marketplace 3569557584 | 5,656 → 5,656 B (factory bytes unchanged) | unchanged | unchanged | none |
| Auction child (bc box) | 8,153 → 8,229 B (+4 clear) | **5 pages (was 4)** | 25/11 unchanged | none |
| Raffle child (bc box) | 7,945 → 8,015 B | 4 | 23/10 unchanged | none |
| Listing child (bc box) | 3,137 → 3,137 B (bytes changed) | 2 | 13/7 unchanged | none |
| AuctionPlugin (not deployed, v3) | 3,827 → 3,809 B | | 2/1 | `deleteApplication` now NoOp, same selector |

`bc` box growth from the MainNet boxes (400 µA/B, free balances from the review inventory):
- AuctionFactory: 7,300 → 8,229 B, +929 B = 371,600 µA; free balance 356,800 µA. **Short by 14,800 µA: fund the AuctionFactory before the update proposal** (the review's figure was 341,200 µA for 8,153 B).
- RaffleFactory: 6,589 → 8,015 B, +1,426 B = 570,400 µA; free 641,200 µA → 70,800 µA left.
- Marketplace (Listing): 3,011 → 3,137 B, 50,400 µA, as in the review.

## Rollout steps added or changed

1. Fund AuctionFactory 3569557408 with at least 14,800 µA (plus margin) before the proposal that pushes the Auction child.
2. Every new auction costs +100,000 µA child MBR (5th program page). `newAuctionCost` and the factory's size-derived `childExtraPages` include it automatically and the deletion refund returns it. Static quotes (deployed AuctionPlugin 3569561141, third-party SDKs) are off by that amount; the deployed plugin is already broken for new children (I-2).
3. The Auction child push is 8,229 B. Inferred from `scripts/lib/principal-rollout.ts` `childSegmentTxns`: 1 + 5 loads + 1 = 7 txns, with the 5-txn AuctionFactory app segment and the 2 wrap txns = 14 ≤ 16, so it stays one atomic group. Not exercised: confirm the rollout lane pushes children with the new Update plugin, since `LEGACY_UPDATE_PLUGIN_MAX_APPROVAL = 8_192` caps what the deployed plugin can push.
4. Deploy AuctionPlugin v3 only from this build (immutable; TRADE-1). Method restrictions keep selector `0xbedfc93b`.
5. SDK lockstep for the draw: the new SDK's `drawReadyRound()` is `raffleRound + 4`. An old SDK (`+8`) still works against new children, just 4 rounds late. The new SDK against old-code children would reveal too early (`errNetm`); MainNet has no Auction/Raffle children.
6. The 2 live legacy Listings keep their code; TRADE-6 applies to listings created after the Marketplace `bc` push.
7. The RaffleFactory pin in `auction/principal-abi.test.ts` changed (3,751 → 3,794 B, new sha). Spec §9.2 and IMPLEMENTATION-LOG carry the old pin and need the same update (not this lane's files). Phase 2 must propose bytes from a whole-tree build.
8. Beacon assumptions baked into the constants: the MainNet beacon stores multiples of 8 and submits about 2 rounds later (review: last 40 submits all at +2). Lag 4 leaves 2 rounds of margin; MAX_WAIT 1,000 sits inside the ~1,512-round window. If the beacon's submit delay ever exceeds 4 rounds, reveals revert with `errBnrd` until it lands (no state change), they do not stall.
