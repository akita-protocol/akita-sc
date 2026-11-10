# MainNet escrow inventory — existing accounts retained

Observed **2026-09-12 23:09:37–23:10:05 UTC**, rounds **64,986,740–64,986,750**, using the MainNet algod/indexer endpoints returned by VibeKit. This is a sequence of public reads, not a single-round ledger snapshot. No transaction was submitted and no signing account was loaded.

Scope: all applications created by the **currently configured legacy EscrowFactory `3569555755`**, including deleted applications in the paginated search. The start/end creator inventories agree: **37 applications, all currently live**, owned by three wallets. This does not assert that every older factory from an earlier Akita deployment has been enumerated.

| Wallet | Wallet app ID | Escrows | Asset opt-ins | Existing scoped grants | ALGO in escrows |
| --- | ---: | ---: | ---: | ---: | ---: |
| Akita DAO | 3569559153 | 22 | 28 | 16 | 1,050.820735 |
| krby | 3570353317 | 14 | 11 | 20 | 56.2146 |
| AkitaTheCity | 3606269654 | 1 | 0 | 0 | 0.1 |
| **Total** | | **37** | **39** | **36** | **1,107.135335** |

The 39 opt-ins contain **35 nonzero positions across 19 distinct ASAs**. Every escrow's live signing authority matches its recorded wallet. All membership values are already the current 41-byte shape; this inventory requires no 9→41-byte box conversion. Twelve DAO escrows are locked. None of the 37 accounts has local application opt-ins or created assets, and none holds an ASA creator/manager/reserve/freeze/clawback role among the inventoried assets. All inventoried holdings are unfrozen.

Escrow custody totals include **1 billion BONES**, **9,921,931.798472 AKTA**, **299 USDC**, and 9,928 base units of each of the 13 sticker assets. All addresses, ASA IDs, opt-ins and holdings remain in place.

The three regular-address members—DAO `akta_creator`, DAO `collections`, and krby `OG`—are outside this factory-child inventory. Their identities and grants must stay intact. The snapshot preserves all **73** wallet grants; only 36 point to the inventoried factory children. The broader compiler release may separately replace plugin apps used by the other grants.

## Current decision

Keep all 37 existing escrow accounts. The owner withdrew the account-factory/EscrowFactory registry merge and the account factory's AVM 13 upload/child-deployment changes. Both factories retain their separate responsibilities and existing IDs. DAO `oal.escrow` stays at EscrowFactory `3569555755`; `aal.wallet` stays at account factory `3569556257`.

No replacement child creation, asset transfer, replacement opt-in, member renaming, address reclassification, merged-registry backfill, or escrow deletion is planned. Keep each membership's existing app ID, address, lock and name. Current fee generators and stored plugin permissions use those app IDs; do not zero them merely to describe an escrow as a regular account.

The earlier relocation plan, its funding estimate and its deletion/name-rebinding prerequisites are superseded. The locked tombstone was a choice in the withdrawn merged-wallet implementation to prevent stale grants from applying to a reused name; it is not a protocol requirement. No name deletion/recreation is needed here.

The legacy registry's regular-address registration gap remains unresolved after this rollback. Existing escrow custody and references are preserved without depending on that fix.

## Retained dependencies

- The three DAO subscription service payout addresses remain valid. `agent:x.agent` keeps both subscriber records and their history.
- Immutable Listings `3643990817` and `3691743616` retain their fee target; `agent:x.agent` remains the latter's seller. No migration-driven delist/relist is needed.
- `stickers` keeps creator authority for the old Rewards app `3569556095`: 22 outstanding disbursements and 179 allocations holding 16,000 AKTA plus 171 sticker base units. These funds are inside Rewards, separate from the escrow holdings. Keep dual-deployment Rewards clients and route claims to their originating app.
- The old Rewards creator has 20.9737 ALGO of available MBR credits and 4.5287 ALGO backing allocations. Credit recovery through the old creator is separate work, not funding required for an escrow migration.
- All eight recorded fee-generator `(name, appId)` targets and the `rec_krby`/`rec_mod`/`rec_gov` split destinations stay unchanged.
- RevenueManager replacement for the compiler release still needs its own nine receive configurations and six managed-asset records preserved. Retaining addresses does not automatically move plugin-owned state to a new plugin app.
- `rev_nfd` has 553.404914 ALGO and plugin grants but no receive configuration in the current or three inspected historical RevenueManager apps. This remains a separate configuration finding; it does not require replacing the escrow.

## Existing plugin grants

| Plugin deployment | Scoped installations |
| --- | ---: |
| RevenueManager 3642325118 | 10 |
| SelfOptIn 3644027143 | 12 |
| SelfOptIn 3569560545 | 2 |
| OptIn 3569560490 | 3 |
| Pay 3569560828 | 3 |
| Subscriptions 3569561107 | 2 |
| Auction 3569561141 | 1 |
| Marketplace 3569561455 | 1 |
| Rewards 3569561963 | 1 |
| NFD 3572944055 | 1 |

The 36 scoped grants remain attached to the existing names and app IDs. The compiler release may separately replace plugin deployments, requiring grant rotation and plugin-state handling with all existing permission restrictions preserved. No reinstall is required merely because an account was created by EscrowFactory.

## Review artifacts and refresh

- `mainnet-escrow-migration-plan.json`: retained identities, exact asset amounts and grant permissions, live dependency records, and the source snapshot hash. This is a read-only planning artifact, not an executable transaction manifest.
- `mainnet-escrow-migration-snapshot-2026-09-12.json`: unchanged original evidence, including source responses, wallet/plugin boxes and request rounds.
- `projects/akita-sc/scripts/inventory-mainnet-escrows.mjs`: GET-only collector, updated to the restored `EscrowInfo` artifact name. Its historical snapshot record label `subAccount` remains unchanged for compatibility.

```sh
node projects/akita-sc/scripts/inventory-mainnet-escrows.mjs \
  --network mainnet --output /tmp/mainnet-escrows-preflight.json
```

Before the compiler rollout, refresh the inventory, check owner authority, balances, locks and grants, then verify those same identities after wallet and plugin updates. Scope covers the currently configured factory; older factory generations and every third-party integration are not exhaustively enumerated.

## Per-escrow inventory

Amounts below are decimal-adjusted for each asset. Full asset IDs, raw units, addresses and grant permissions are in the JSON plan.

### Akita DAO — wallet 3569559153

| Name | App ID | ALGO | Asset positions | Plugin grants | Locked |
| --- | ---: | ---: | --- | ---: | --- |
| rev_wallet | 3569560223 | 0.1 | — | 1 | Yes |
| rev_haystack | 3569560967 | 0.1 | — | 1 | Yes |
| rec_krby | 3569562434 | 0.1 | — | 1 | Yes |
| rec_mod | 3569562713 | 0.1 | — | 1 | Yes |
| rec_gov | 3569563200 | 0.1 | — | 1 | Yes |
| rev_auction | 3569564097 | 0.1 | — | 1 | Yes |
| rev_marketplace | 3569564836 | 3.886 | AKC0360 0; AOG0361 0; AOG4782 0 | 1 | Yes |
| rev_raffle | 3569565681 | 0.1 | — | 1 | Yes |
| rev_social | 3569566288 | 0.2 | AKTA 13,572.402723 | 1 | Yes |
| rev_subscriptions | 3569567427 | 400.9 | USDC 299; AKTA 8 | 1 | Yes |
| rev_pool | 3569568655 | 0.1 | — | 1 | Yes |
| rev_poll | 3569569619 | 0.1 | — | 1 | Yes |
| stickers | 3569571360 | 89.929821 | AKTA 858,651.395749; DOGHRT 0.9928; GRUMP 0.9928; LAUGH 0.9928; SAD 0.9928; VIBING 0.9928; WINK 0.9928; WORRY 0.9928; ARTIST 0.9928; DIAMND 0.9928; HOLDER 0.9928; PAWHRT 0.9928; SIR 0.9928; THMBS 0.9928 | 2 | No |
| bones_dau | 3569573983 | 0.2 | BONES 200,000,000 | 0 | No |
| bones_gov | 3569574392 | 0.2 | BONES 200,000,000 | 0 | No |
| bones_public | 3569574919 | 0.2 | BONES 150,000,000 | 0 | No |
| bones_liquidity | 3569575314 | 0.2 | BONES 50,000,000 | 0 | No |
| bones_akta | 3569576084 | 0.2 | BONES 100,000,000 | 0 | No |
| bones_nft | 3569576567 | 0.2 | BONES 100,000,000 | 0 | No |
| bones_team | 3569579006 | 0.2 | BONES 100,000,000 | 0 | No |
| bones_event | 3569579934 | 0.2 | BONES 100,000,000 | 0 | No |
| rev_nfd | 3605321297 | 553.404914 | — | 2 | No |

### krby — wallet 3570353317

| Name | App ID | ALGO | Asset positions | Plugin grants | Locked |
| --- | ---: | ---: | --- | ---: | --- |
| Savings | 3570685003 | 22.734 | — | 0 | No |
| Jess | 3581629188 | 1.095 | AKTA 1,000,000 | 1 | No |
| Erin | 3581629639 | 1.195 | AKTA 1,000,000 | 1 | No |
| Reagan | 3581629766 | 1.195 | AKTA 1,000,000 | 1 | No |
| Mom | 3581629909 | 1.095 | AKTA 1,000,000 | 1 | No |
| Dad | 3581630068 | 1.095 | AKTA 1,000,000 | 1 | No |
| Kadin | 3581630172 | 1.095 | AKTA 1,000,000 | 1 | No |
| Kelly | 3581630293 | 1.095 | AKTA 1,000,000 | 1 | No |
| Rylee | 3625469775 | 1.095 | AKTA 1,000,000 | 1 | No |
| Dave | 3625472977 | 1.095 | AKTA 1,000,000 | 1 | No |
| agent:x.agent | 3663125094 | 5.1256 | AKTA 49,700; AKC0360 0 | 7 | No |
| agent:d.agent | 3679862114 | 9.1 | — | 2 | No |
| agent:t.agent | 3680087213 | 9.1 | — | 2 | No |
| agent:qt314 | 3689816353 | 0.1 | — | 0 | No |

### AkitaTheCity — wallet 3606269654

| Name | App ID | ALGO | Asset positions | Plugin grants | Locked |
| --- | ---: | ---: | --- | ---: | --- |
| AkitaTheCity | 3606276599 | 0.1 | — | 0 | No |


## Validation

The original collector completed 763 GET requests and reconciled all 37 memberships and all 179 Rewards allocations. A second complete collection at rounds 64,986,883–64,986,893 confirmed unchanged balances, authority, holdings and dependency state. The original raw snapshot is preserved. No public transaction was submitted.

The prior 1,144-test run validated the subsequently withdrawn merged implementation. Rollback verification passed: contract/SDK builds, TypeScript checks, 244 SDK tests, and the full contract suite (76 files, 1,119 tests passed, 5 existing TODOs). All 113 saved wallet boxes decode identically against the restored ABI. Details and the corrected factory-mock dependency are recorded in `puyats-migration-plan.md`.
