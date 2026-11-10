# Lane stake report (STAKE-1 to STAKE-4)

Paths are under `projects/akita-sc/smart_contracts/` unless stated. Nothing committed or pushed. No TestNet or MainNet writes (MainNet reads only).

## Findings

### STAKE-1 (High): done

- Fix: one open round per pool. `startDisbursement` now calls `assertNoOpenRound()` (`staking-pool/contract.algo.ts:1542`).
- Why this option: it is the smallest change that restores the invariant H-4 already depends on. While a round is open, nothing may change `disqualified`. `createPoolEntries`, `removeEntry`, `check` and `gateCheck` already freeze on `activeRounds > 0`. The only remaining writer was a second reward's preparation (`processPreparationPhase` -> `checkByID` / heartbeat branch). With one round per pool, the qualified set and the shuffle ranges are fixed from the end of preparation until the round closes. A per-round snapshot (bitmap or epoch) would need new boxes, MBR and a change in every allocation loop. Never persisting a disqualification would also need per-round state, because allocation reads `entry.disqualified` to skip entries.
- Cost: rewards of one pool now run one after another. A stuck round (for example a VRF outage) blocks the pool's other rewards until the creator or the DAO calls `abortRound`. The `activeRounds` counter stays (layout unchanged); it is now 0 or 1.
- Existing test changed: `should isolate royalties across concurrent reward disbursements` asserted that two rounds could be open at once (the insecure behaviour). It is now `should isolate royalties across consecutive reward disbursements (one open round per pool)`. It asserts `errRoundOpen` on the second start, then runs the two rounds in sequence with the same royalty and allocation checks.

### STAKE-2 (High): done

- HARD: a stake counts in a round only if it is unchanged since before the round started: `info.lastUpdate < reward.lastDisbursementTimestamp` (`staking-pool/contract.algo.ts:722`). `startDisbursement` already stores the round start in `lastDisbursementTimestamp`, so no new state. Staking already exposes `lastUpdate` through `getInfo`; a HARD stake's `lastUpdate` moves on create and on every top-up, and `withdraw` deletes the box. So every entry that counts had its own escrowed balance at round start. No Staking change was needed (Staking 7,010 B, ABI and schema unchanged).
- `checkByID` and `getStakeValue` take the round start (`:686`, `:741`); the public `check` passes 0, which skips the freshness rule outside rounds.
- LOCK is not affected (a lock cannot leave before expiry, and expired locks already fail, L-3). HEARTBEAT is not affected (manager-sampled average).
- SOFT: `validateReward` rejects Percentage and Shuffle in SOFT pools with new `errSoftValueWeighted` (`errSvwt`) (`staking-pool/contract.algo.ts:906-915`). Flat and Even stay allowed.
- Behaviour to document:
  - A HARD entrant that tops up or re-creates its stake after `startDisbursement` and before its own batch is disqualified, and the flag persists like every other disqualification (exit with `removeEntry`, which refunds the MBR, and re-enter).
  - Residual risk, by design: in a SOFT pool, one balance can still back several Flat/Even heads across batches (each head needs `minimumStakeAmount` at its check moment). Value-sensitive pools should use LOCK, HEARTBEAT or (now) HARD.

### STAKE-3 (Medium): done

- `usedMbrCredits` removed from the v2 `DisbursementDetails` (`rewards/types.ts`). Credits held by boxes are `allocations * UserAllocationMBR`, which the old field always equalled.
- `useMbrCredit` only spends credits. `refundAllocationMbr` adds one `UserAllocationMBR` per deleted box (`rewards/contract.algo.ts:97-105`). `closeDisbursement` checks `allocations === 0` (`:595`). The four struct literals lost the field.
- The empty box is now 9 B key + 89 B value = 2,500 + 400 * 98 = 41,700, so `MinDisbursementsMBR` is exact again. The constant is unchanged and now documented (`rewards/constants.ts`). Live auction, raffle and listing children keep paying exactly 41,700.
- Readers checked: `rewards/*` (updated), `staking-pool` (`createRewards` uses the constant, now exact), `utils/functions.ts` (constant only, no field read), SDK (see below), `plugin-dex/launch` (see "Other lanes").
- SDK: the generated client decodes only the v2 layout, but MainNet v1 boxes still carry the field. `RewardsSDK.getDisbursement(s)` now read the raw box and decode either layout via new `decodeDisbursementDetails` (the title offset is the head size: 85 in v2, 93 in v1) (`projects/akita-sdk/src/rewards/index.ts`). `getDisbursementsAcrossDeployments` keeps working across v1 and v2.

### STAKE-4 (Medium, decision: add the paths): done

- `RewardsPlugin` (`arc58/plugins/rewards/contract.algo.ts`):
  - `create(version, akitaDAO, legacyRewards)` stores `legacy_rewards` (`:19-26`).
  - New `withdrawMbrCredits(wallet, rekeyBack, rewardsApp, id, amount)` and `closeDisbursement(wallet, rekeyBack, rewardsApp, id)` (`:259-298`).
  - `assertKnownRewards`: `rewardsApp != 0` and it equals the registry's `akitaAppList.rewards` or the create-pinned `legacy_rewards`, else `errInvalidRewardsApp` (`errRwap`) (`:29-35`, new `arc58/plugins/rewards/errors.ts`).
- Why create-pinned and not a DAO setter: the plugin is not updatable (`AkitaBaseContract`), so the pin can never be redirected. A setter would add a new DAO-wallet entry point and a governance step before first use. The registry branch already trusts the DAO for the current app; the pin adds exactly one fixed app (MainNet v1 3569556095), so the plugin never becomes a "call any app as the wallet" gadget for delegated callers.
- v1 has `withdrawMbrCredits(uint64,uint64)void` (same selector, checked against the v1 source at 7fbaa0b8) but no `closeDisbursement`, so v1 recovery uses `withdrawMbrCredits` only.
- New script `projects/akita-sc/scripts/withdraw-rewards-v1-mbr-credits.ts` (logic in new `projects/akita-sc/scripts/lib/rewards-credit-withdrawal.ts`):
  - Read-only by default (prints the plan and both proposals); `--execute` sends.
  - Lists disbursements on the Rewards app created by the escrow with `mbrCredits > 0` (MainNet: escrow `stickers` = I3SHCU7Z..., app 3569571360, rekeyed to DAO wallet 3569559153; checked read-only).
  - Proposal 1: `ToggleEscrowLock` (if locked) + `AddPlugin` granting the caller only `withdrawMbrCredits` on the escrow. Then batched `withdrawMbrCredits` calls (credits land on the escrow). Proposal 2: `RemovePlugin` + re-lock.
  - Refuses to run if the plugin cannot reach the Rewards app (neither pinned nor registry).
  - Ran only on LocalNet: dry run against a test universe (DAO 959837, plugin 961162) printed the plan and both proposals. The execute path is covered end to end by an e2e test (below).
- `scripts/deploy-rewards-plugin.ts` passes the new create arg: `--legacy-rewards <id>`, default 3569556095 on mainnet, 0 elsewhere.

## Regression tests

| Test | File | Before fix |
|---|---|---|
| STAKE-1: a second reward round cannot open while another round is open | `staking-pool/staking-pool.e2e.spec.ts` | failed: `promise resolved "undefined" instead of rejecting` |
| should isolate royalties across consecutive reward disbursements (one open round per pool) (updated) | same | failed: same |
| STAKE-2: a HARD stake (re)created after the round started does not count | same | failed: `expected 2n to be 1n` (both sybils counted) |
| STAKE-2: SOFT pools reject stake-weighted rewards; head-count rewards stay allowed | same | failed: `promise resolved "undefined" instead of rejecting` |
| STAKE-3: a Rewards app funded with only its minimum balance stays solvent through instant disbursements, claims and closes | `rewards/rewards.e2e.spec.ts` | failed: `balance 268000 below min 270200` (the 3,200 gap, minus the 1,000 allocation) |
| STAKE-4: recovers credits and box MBR from the current Rewards app and, after a switch, from the pinned legacy one only | `arc58/plugins/rewards/rewards.e2e.spec.ts` | not runnable before (methods did not exist) |
| STAKE-4: the DAO recovers a locked escrow's credits through a temporary grant (withdraw-rewards-v1-mbr-credits flow) | same | not runnable before (methods did not exist) |
| decodeDisbursementDetails reads the v2 / v1 layout (2 tests) | `projects/akita-sdk/src/rewards/decode.test.ts` | new SDK function |

`rewards/rewards.e2e.spec.ts` helper `getMbrCredits` now derives `used` from `allocations * userAllocations` (the field is gone); the existing `used` assertions are unchanged and pass.

## Files changed

Owned:
- `staking-pool/contract.algo.ts`, `staking-pool/errors.ts` (+`errSoftValueWeighted`), `staking-pool/staking-pool.e2e.spec.ts`
- `rewards/contract.algo.ts`, `rewards/types.ts`, `rewards/constants.ts` (comment only), `rewards/rewards.e2e.spec.ts`
- `arc58/plugins/rewards/contract.algo.ts`, `arc58/plugins/rewards/errors.ts` (new), `arc58/plugins/rewards/rewards.e2e.spec.ts`
- `projects/akita-sdk/src/rewards/index.ts`, `rewards/errors.ts` (+`RWAP`), `rewards/decode.test.ts` (new), `staking-pool/errors.ts` (+`SVWT`)
- `projects/akita-sc/scripts/withdraw-rewards-v1-mbr-credits.ts` (new), `projects/akita-sc/scripts/lib/rewards-credit-withdrawal.ts` (new)

Shared (additive only):
- `projects/akita-sc/tests/fixtures/plugins/rewards.ts`: optional `legacyRewards` arg, default `0n`.
- `projects/akita-sdk/src/wallet/plugins/rewards.ts`: new `withdrawMbrCredits` and `closeDisbursement` builders.
- `projects/akita-sc/scripts/deploy-rewards-plugin.ts` (not owned; required by the RewardsPlugin `create` ABI change): `--legacy-rewards` flag passed to `create`.

Not changed: `staking/**`, `arc58/plugins/staking-pool/**`, `arc58/plugins/staking/**`, `utils/*`.

## Tests run

- Pre-fix (old artifacts): 5 new/updated regression tests failed as listed (plus the HARD test re-run after fixing the test's own `expiration` argument: `expected 2n to be 1n`).
- After the fix, `staking-pool/staking-pool.e2e.spec.ts` + `rewards/rewards.e2e.spec.ts` + `arc58/plugins/rewards/rewards.e2e.spec.ts`: 3 files, 171 passed, 0 failed.
- After the fix, dependent specs (`arc58/plugins/staking-pool`, `staking-pool/principal`, `staking-pool/compat.test`, `utils/referral-to`, `arc58/plugins/welcome`, `plugin-dex/launch/launch-hooks`, `tests/compat/compat`, `arc58/account/factory`, `staking/staking`): 9 files, 217 passed, 5 failed, 6 skipped. The 5 failures are in `launch-hooks` (expected; see "Other lanes"). `tests/compat/compat.e2e.spec.ts` D fails in its `beforeAll` with `read budget exceeded (10267 > 10240)` while upgrading the wallet factory through the DAO; this lane touched no wallet/factory code.
- SDK unit: `src/rewards` + `src/staking-pool`: 3 files, 19 passed. `tests/logged-error-codes.test.ts`: 2 passed.
- Final run after the last plugin rebuild (`rewardsApp != 0` check), verbose reporter: `staking-pool/staking-pool.e2e.spec.ts` + `rewards/rewards.e2e.spec.ts` + `arc58/plugins/rewards/rewards.e2e.spec.ts` + `arc58/plugins/staking-pool/staking-pool.e2e.spec.ts`: 4 files, 180 passed, 0 failed. All 7 STAKE regression tests listed above pass. (Two earlier attempts could not start: `buildAkitaUniverse` failed in `deployAuctionFactory`, `balance 3380100 below min 3394900`, until the trade lane updated `tests/fixtures/auction.ts` at 12:14.)
- SDK build: `tsup` (JS) succeeded; the `tsc` declaration step fails only in `src/wallet/plugins/nfd.ts` (another lane's in-flight NFD plugin ABI change).

## Size / schema / ABI for MainNet apps

- StakingPool child: 12,660 B -> 12,763 B (+103 B). No children exist on MainNet; still under 16 KB; same 13 uints / 10 bytes schema. No ABI change.
- StakingPoolFactory: 3,960 B, unchanged ABI and schema.
- Staking (live 3642366153): not changed (7,010 B).
- Rewards v2: 4,266 B, not yet on MainNet (registry still points at v1). Box layout changed (89 B value). No ABI selector change (the struct is not an ABI argument; it only appears in box reads).
- RewardsPlugin: new deploy (1,856 B). `create` selector changed (third arg `legacyRewards: uint64`), global schema 2 uints / 1 byte (+1 uint `legacy_rewards`). Two new methods. Existing method selectors unchanged.

## Rollout steps added or changed

1. Deploy the new RewardsPlugin with `--legacy-rewards 3569556095` (mainnet default).
2. Dry-run `scripts/withdraw-rewards-v1-mbr-credits.ts -n mainnet --rewards-plugin <new id> --sender <operator>`; check the plan (about 145 disbursements, about 21.33 ALGO). Then run with `-m ... --execute`. Do this before the v1 drain risk grows and before or after the v2 switch (the pin keeps v1 reachable).
3. Deploy Rewards v2 from this tree (exact 41,700 box MBR; `deploy-rewards-v2.ts` 100,000 µA funding is now sufficient), opt it into pool, referral and Welcome assets, then switch the registry.
4. Staking pools: rewards of a pool now run one at a time; operators/cranks must finish or abort a round before starting the next reward. SOFT pools accept only Flat/Even rewards. HARD entrants should not top up during a round.
5. SDK consumers: `RewardsSDK.getDisbursement(s)` decodes v1 and v2 boxes; `DisbursementDetails` no longer has `usedMbrCredits`.

## Other lanes (action needed, not edited)

- `plugin-dex/launch/launch-hooks.e2e.spec.ts` (5 failures) hard-codes the old Rewards bug: `REWARDS_TOP_UP = 3_200n` and `used: d.usedMbrCredits`. `LaunchManager.devBuy` already measures the shortfall and now tops up 0, as its own comment anticipates (`plugin-dex/launch/launch-manager.algo.ts:66-71`). The spec needs `REWARDS_TOP_UP = 0n` (and the payments lists without the 3,200 entry, and the "underpaid" case re-sized), and `used` derived as `allocations * 25_300n`.
