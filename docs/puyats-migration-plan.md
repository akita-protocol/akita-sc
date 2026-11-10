# PuyaTs upgrade and deployment plan

Updated 2026-09-12 against the existing working tree at HEAD `e7f174ee`.

**Status: missing deployment and child-update routes implemented; public release still needs a live inventory and governance rehearsal.** No public transaction has been submitted. Run this plan independently for each selected network, using explicit network and signing account. The working tree contains extensive pre-existing contract and SDK changes; this is not proven to be a compiler-only release.

## Decisions from the follow-up

- **Keep the existing EscrowFactory and account factory separate.** The registry merge and the account factory’s AVM 13 program-upload/child-deployment changes have been rolled back. Preserve DAO `oal.escrow`, `aal.wallet`, and wallet/factory `escrow_factory` IDs. Existing escrow accounts remain in place.
- **Rewards: deploy a replacement and retain the old app while its rewards remain.** No bulk state migration is planned. The MainNet escrow inventory found 22 outstanding disbursements created by `stickers`, with 179 allocation boxes; preserve their original app/IDs and the old creator's credit/reclaim rights. Clients must read both deployments and route allocations/claims to the originating app ID.
- **Retain all existing escrow addresses.** The [MainNet escrow inventory](mainnet-escrow-migration.md) covers 37 children in three wallets, 39 asset opt-ins and 36 scoped plugin grants. No account replacement, asset transfer, name rebinding, or migration-driven plugin reinstall is planned. Plugin deployment rotation for the compiler release remains separate.
- **Gates are unused.** Deploy the main Gate and selected subgates; no gate-definition migration is currently required. Verify the unused assumption before public cutover.
- **Guilds are not deployed.** Use the fresh guild/consensus-factory deployment route when ready. There is no existing guild or consensus migration in this rollout.
- **No clear-state business logic is used.** The earlier recommendation to treat missing compiled clear bytes as a standalone blocker was overstated. Retain the established inert clear-program behavior; the update plugin supplies its stored clear bytes. Inspect/verify that configuration, but do not add clear-state logic just to make compiler hashes match.

## Build evidence and offline inventory

Pinned PuyaTs / Algorand TypeScript are `1.3.1`, Puya backend `5.10.1`, client generator `6.0.1`, AlgoKit Utils `9.2.2`, installed algosdk `3.7.0`. The rebuilt inventory contains 84 application artifacts: 22 expose update handlers and 62 do not. Helpers, child templates and terminal programs are included, so 62 is not a deployment count. Against HEAD, 71 program pairs changed, 10 lack a baseline, and 3 are unchanged. HEAD is not a live-chain baseline.

The rollback build passes. AbstractedAccount has 7,738 approval bytes plus 4 clear bytes, fitting the restored factory's four-page allocation. Its AVM 13 target remains unchanged. The account factory has 3,199 approval bytes plus 4 clear bytes and uses its original compiler-default AVM 11 target. There is no new SubAccount artifact. Meta and Guild's separate AVM 13 work remains in the inventory. Two passkey LogicSig artifacts need separate address/integration checks.

Refresh the inventory from the repository root:

```sh
node projects/akita-sc/scripts/plan-puyats-migration.mjs > docs/puyats-migration-inventory.json
```

This is offline: artifacts, scripts and Git only. It does not load signing accounts or write to a chain. Its success is not a release-readiness verdict.

## Deployment and update matrix

The currently deployed program determines actual upgradability and authorization. Confirm these intended routes against each live ID.

| Contract / family | Route | Required follow-through |
| --- | --- | --- |
| AkitaDAO | `update:dao` | New validator or explicit `--validator-app-id`, `oal.daoProposalValidator`, then DAO update; `--dao-only` for deliberate separate stage |
| AbstractedAccountFactory | `update:account-factory` or `update:wallet-factory --update-factory` | Verify factory code and child template independently |
| Wallet template | `update:wallet-factory` | Verify boxed `bc` and child version; existing wallets are unchanged |
| DAO wallet | `update:dao-wallet` | Dedicated DAO UpdateWallet proposal after compatible factory/template transition |
| Other wallets | `update:automatic-wallets` | Mixed-child discovery now validates `factory_app`, creator, and wallet state; honor allowed/automatic/admin policy; manual cases remain separate |
| AbstractedAccountMBR | Compare, then `deploy:wallet-mbr` if needed | Currently unchanged; avoid unnecessary deployment. Existing script prints ID; SDK `walletMbr` publication is separate |
| AbstractedAccountBalanceReader | `deploy:wallet-balance-reader` | Receipt ID supplied explicitly to consumers; deployment uses the same one-integer schema override as its existing tests |
| EscrowFactory / existing Escrows | Retain existing factory and all 37 inventoried children | Keep names, app IDs, addresses, balances, grants and DAO discovery unchanged |
| Staking | `update:staking` | Preserve staking/lock state; `deploy:staking` is a different migration |
| Subscriptions | `update:subscriptions` | Preserve services, balances, subscriptions, passes and payout configuration |
| Social + Graph + Impact + Moderation | `update:social --contracts social,socialGraph,socialImpact,socialModeration` | Default is Social only; verify extension registration |
| HyperSwap | `update:hyper-swap` | Preserve outstanding swaps; verify the live program accepts update |
| Rewards | `deploy:rewards` | Retain old app; deploy clients reading both before `--register` changes `aal.rewards` |
| Gate + all 16 subgates | `deploy:gates` | Selected deployment, one receipt each; `--register` publishes SDK IDs and changes main Gate pointer |
| Meta | `deploy:meta` | Explicit receipt ID; does not automatically overwrite legacy `metaMerkles`. Compatibility/data migration needs its own decision |
| PluginDex | `deploy:plugin-dex` | Explicit admin and consumer configuration; determine whether an old deployment/pools exist |
| GuildFactory + GuildConsensusFactory | `deploy:guild-factory` | Fresh pair; upload Guild plus all three consensus templates; preserve output IDs for client configuration |

| Factory | Template route | Existing child route |
| --- | --- | --- |
| AuctionFactory | `update:auction` updates parent and boxed Auction | `update:auction-children` |
| RaffleFactory | `update:raffle` updates parent and boxed Raffle | `update:raffle-children` |
| StakingPoolFactory | `update:staking-pool` updates parent and boxed pool | `update:staking-pool-children` |
| Marketplace | `update:marketplace` updates parent and boxed Listing | Existing Listings immutable; retain settlement support |
| PollFactory | `update:poll`, child embedded | Existing Polls immutable; retain voting/results |
| PrizeBoxFactory | `update:prize-box`, child embedded | Existing PrizeBoxes immutable; preserve custody/use |
| Wallet factory | `update:wallet-factory` | DAO-wallet/automatic/manual policy paths above |
| Guild factories | Fresh deployment uploads named programs | No existing instances in scope |

`update:auction-factory` updates only its parent. Parent+template operations in `runUpdate` are one atomic execution group. Multiple `windows` represent alternative validity periods for that same operation, not sequential batches. Check the 16-transaction limit and schema/page compatibility before increasing program sizes.

Immutable plugins now have commands for DAO, Gate, HyperSwap, Pay, PaySilo, PaySiloFactory, Poll, AssetInbox, Guild, Meta, and optional Sunset, in addition to the previously covered plugin families. All plugin deployments still require appropriate wallet grants; deployment alone does not install a plugin. `update:dao-wallet-plugins` preserves caller, escrow, method restrictions and permission settings for supported historical plugin families. Named aliases and new families without canonical catalog keys require explicit configuration. Update, opt-in and revenue-manager plugins also need their DAO PAL entries reconciled.

## New command reference

Run commands from `projects/akita-sc`. These examples are templates, not authorization to send public transactions.

```sh
npm run deploy:pay-plugin -- --network testnet --dry-run --version RELEASE_VERSION
npm run deploy:rewards -- --network testnet --version RELEASE_VERSION --manifest RELEASE_DIR/rewards.json
npm run deploy:rewards -- --network testnet --version RELEASE_VERSION --manifest RELEASE_DIR/rewards.json --register
npm run deploy:gates -- --network testnet --contracts gate,asset,nfdRoot,subscriptionStreak --version RELEASE_VERSION --manifest-dir RELEASE_DIR --register
npm run update:auction-children -- --network testnet --factory-id FACTORY_ID --app-ids CHILD_ID --version RELEASE_VERSION --dry-run
npm run update:raffle-children -- --network testnet --factory-id FACTORY_ID --all --version RELEASE_VERSION
npm run update:staking-pool-children -- --network testnet --factory-id FACTORY_ID --app-ids CHILD_ID --proposal-id PROPOSAL_ID --version RELEASE_VERSION
```

The scripts retain the project's existing signing configuration. Never put secrets in receipts or checked-in command files. New deployment and child runners require an explicit `--network`. `--dao-app-id` supports an explicit DAO override, including LocalNet. `--sender` supplies a read-only dry-run address; it does not select a signing account.

`deploy:immutable --contract NAME` is the common allowlisted runner. Dedicated aliases:

- `deploy:dao-plugin`, `deploy:gate-plugin`, `deploy:hyper-swap-plugin`, `deploy:pay-plugin`, `deploy:pay-silo-plugin`, `deploy:pay-silo-factory-plugin`, `deploy:poll-plugin`.
- `deploy:asset-inbox-plugin`, `deploy:guild-plugin`, `deploy:meta-plugin`, `deploy:sunset-plugin`.
- `deploy:rewards`, `deploy:meta`, `deploy:plugin-dex`, `deploy:wallet-balance-reader`.

Use `--config constructor.json` for additional constructor arguments, with exact ARC-56 argument names. IDs should be decimal strings. Version, `akitaDAO`, `daoAppID`, and admin default from the selected context. Version/DAO overrides in the JSON must match `--version`/`--dao-app-id`, preventing mismatched deployment metadata or DAO registration. Examples:

| Contract | Additional config |
| --- | --- |
| GatePlugin | `{ "gateAppID": "NEW_GATE_ID" }` |
| PaySiloPlugin | `{ "recipient": "ALGORAND_ADDRESS" }` |
| PollPluginContract | `{ "factory": "POLL_FACTORY_ID" }` |
| AssetInboxPlugin | `{ "router": "ARC59_ROUTER_ID" }` |
| GuildPlugin | `{ "factory": "GUILD_FACTORY_ID", "guild": "0" }` for creation-only, or a real Guild created by that factory |
| MetaPlugin | `{ "registry": "META_ID", "namespace": "profile", "keys": ["name"] }` |
| PluginDex | `{ "admin": "ALGORAND_ADDRESS" }` when different from sender |

Constructor values are ABI-encoded before writes. Contract-specific constraints are additionally checked by transaction simulation. The balance-reader artifact currently reserves zero integer slots despite storing the DAO app ID; the deployer explicitly reserves one integer and one byte slice, matching the existing regression test, without changing contract source.

### Deployment receipts and registration

Each new deployment requires `--manifest FILE`. The receipt records network/genesis, sender, DAO, candidate artifact/program hashes, constructor arguments, previous app ID (read from the live DAO for Rewards/Gate, otherwise the SDK catalog), and the created app ID/transaction ID. It writes creation intent before sending, then saves chain success before funding or registration. Re-running an identical completed receipt reuses the app, verifies creator and both deployed program hashes, and completes later steps.

If interruption leaves a `creating` receipt without an app ID, the script refuses to redeploy automatically. Reconcile the creation transaction on chain before repairing that receipt; absence of a returned ID is not proof that creation failed. This is a per-deployment receipt, not a complete release orchestrator or general transaction recovery system. Use one sender per receipt; the default LocalNet CLI fixture creates a new account on each invocation, so repeated CLI invocations there cannot resume the same receipt without a stable signing configuration.

Funding supplies base account balance. `--register` updates supported SDK/README entries and plugin histories. For Rewards and Gate it also guards the expected old DAO pointer, proposes the change, and verifies the new pointer. A stale DAO pointer stops the cutover. The metadata helpers edit SDK source; run `npm run build` in `projects/akita-sdk` before subsequent scripts import the updated network IDs/history from its distribution. Metadata errors leave the created ID in the receipt for resumption. DAO registration also records proposal intent and the returned proposal ID before execution. After a governance wait or interruption, it resumes that same proposal and rejects a full-list snapshot that would overwrite other changed DAO pointers. If a proposal creation outcome is unknown, it stops for reconciliation instead of creating a duplicate.

BalanceReader, AssetInboxPlugin, GuildPlugin, Meta, MetaPlugin, PluginDex, and SunsetPlugin have no canonical SDK network key in the current project. Their IDs are recorded in receipts and must be configured explicitly in consumers; `--register` does not invent a catalog entry. Meta is intentionally not auto-mapped onto the legacy `metaMerkles` key.

### Existing child updates

Select `--app-ids` or explicit `--all`, and a parent `--factory-id`; run separately for every retained factory generation. Discovery paginates the indexer and excludes deleted apps. The runner checks all selected IDs against live algod creator, DAO binding and schema before the first upgrade. Apps already matching approval bytes and requested version are skipped. The standard runner verifies approval bytes and version after submission. Resume an existing proposal with exactly one child ID and `--proposal-id`.

Indexer lag can hide children, including recent creations. Reconcile creator inventory to a known round before marking a generation complete. Source metadata cannot prove an old deployed program accepts the update; the actual governance/plugin execution is simulated before submission.

### Rewards coexistence

`getDisbursementsAcrossDeployments` from `akita-sdk/rewards` accepts current and retained RewardsSDK clients from the same network. It keeps disbursements grouped by app ID and returns the originating client for subsequent allocation reads/claims. Duplicate app IDs are deduplicated; a failed legacy read is propagated, not reported as an empty balance. Keep identity as `(network, rewardsAppId, disbursementId)` throughout the UI and claim flow.

The deployment receipt preserves the previous Rewards app ID. Wire current and retained IDs into frontend/indexer configuration before switching `aal.rewards`. That consumer release is still required: adding the SDK helper does not update another repository's screens. RewardsPlugin resolves `aal.rewards` on each call, so merely retaining an old plugin does not pin old claims to the old Rewards app. Test the direct originating-client route with real remaining reward types before cutover.

## Dry-run correction

The initial inventory found 15 conditional guards: 14 deployment scripts plus the stickers escrow opt-in script. With a mnemonic present, or on LocalNet, those guards did not stop execution. A run could create apps, pay fees, fund accounts, send opt-ins/proposals, and update SDK/README deployment metadata and sibling selector/config files. Shared context setup also funded a LocalNet fixture before the script guard.

Those guards are now unconditional. Dry-run setup uses a signer that throws and does not create/fund a fixture. Shared updates return after compilation and skip selector publication, proposals, funding and submission. New deployment dry runs validate arguments and print sizes/configuration without writing receipts or deployment metadata. Some specialized dry runs still perform read-only network preflight; compilation/planning is not proof that a public transaction will succeed.

## Remaining release prerequisites

1. Select network and signing account, freeze reviewed sources/lockfile/artifacts, and snapshot live IDs, schemas, program hashes, extra pages, balances, DAO fields, wallet grants/policies and factory templates. Classify every actual app as unchanged/update/new/retain/blocked.
2. Rehearse the current deployed DAO/wallet ABI transition, validator, upgrade-plugin rotation, factory templates, DAO wallet and children against equivalent old state. The current LocalNet suite exercises current source fixtures, not a public ledger snapshot.
3. Resolve initialized governance lifecycle. Existing `proposeAndExecute` assumes immediate execution; an initialized DAO may need submit/vote/finalize/wait stages. Do not interpret an unexecuted proposal as an applied upgrade, or re-create it blindly.
4. Replace `deploy:update-plugin`'s PAL-change/remove-old/install-new sequence with a reviewed atomic or recoverable transition before using it for this rollout. Preserve every scoped grant and selector restriction.
5. The shared updater now rejects a mismatched PAL/SDK update-plugin ID or missing global wallet grant. Rehearse method restrictions, execution policy and rekey state too. General app-list updates still allow arbitrary fields; the new automatic Rewards/Gate path validates its supported fields and old values.
6. Preflight paths for SDK/README/sibling selector publication and record confirmed IDs before publication errors. Existing scripts outside the new runner do not all have durable receipts.
7. Verify boxed template bytes and child versions after factory updates, factory box-growth funding, application page capacity, and atomic group size. The shared runner now provides wallet/admin simulation headroom and upload-box funding; this is not a general schema migration.
8. Verify the restored separate-factory behavior, existing escrow registration and the wallet factory's original two-chunk creation/update path. Keep wallet bytecode within that path's existing capacity; the discarded merge's page-growth helper is no longer available.

## Factory rollback scope

The owner withdrew the escrow registry/factory consolidation and the account factory's AVM 13 upload/child-deployment expansion. The checkout again uses the standalone EscrowFactory for creation, registry lookup and lifecycle operations. The account factory no longer creates SubAccount children or hosts a full-address registry. The canonical contract rename, merged-factory consumers, merged-registry tests, and generated SubAccount artifacts were removed with that implementation.

Account-factory deployment/update again uses two program chunks, three reserved extra pages at creation and the original creation-cost calculation. Dynamic page growth and `walletUpdateMbr` were removed. The wallet's AVM target, plugin-version checks, execution-key changes, error-code cleanup, compiler/dependency upgrade, Meta and Guild work, and deployment-script fixes are preserved.

The regular-address registration gap remains an unresolved issue in the separate legacy registry. Keeping existing escrow accounts does not fix that gap. There is no `oal.escrow` cutover or merged-registry backfill in this release.

## Ordered rollout

1. Freeze/build and capture live inventory and governance state. Confirm no Gate/Guild migration is needed and identify remaining legacy Rewards obligations.
2. Prepare replacement plugins/helpers/services with receipts. Rebuild the SDK after recording new IDs so subsequent scripts load current deployment history. Deploy the fresh guild pair only if included in the release. Keep EscrowFactory.
3. Complete a reviewed upgrade-plugin and validator transition. Update AkitaDAO using compatible existing wallet/DAO ABIs.
4. Update the ARC-58 factory and boxed wallet template using the restored upload/child-deployment path. Preserve the EscrowFactory discovery pointer and disabled/admin-only wallet update policies. Update the DAO wallet and eligible existing wallets.
5. Update singleton services and factory parents/templates. Upgrade existing Auction/Raffle/StakingPool instances separately for every factory generation. Retain immutable Listing/Poll/PrizeBox identities.
6. Deploy client support for both Rewards generations; then change `aal.rewards` and publish current/retained IDs. Deploy unused Gates/subgates and register selected IDs. Resolve Meta compatibility before any legacy registry cutover.
7. Migrate wallet plugin grants and PAL fields with their original restrictions. Publish SDK/frontend/indexer configuration; reconcile observed bytes, versions, DAO pointers, balances and post-upgrade behavior to the release manifest.
8. Verify existing escrow addresses and grants remain usable. Keep old Rewards creator rights and existing settlement references. No escrow-address migration or deletion is part of this rollout.

DAO pointer map: `aal` contains staking, rewards, pool, prizeBox, subscriptions, gate, auction, hyperSwap, raffle, metaMerkles, marketplace, wallet (factory); `sal` contains social/graph/impact/moderation; `pal` contains optin/revenueManager/update; `oal` contains escrow/poll/daoProposalValidator and external dependencies. The DAO's wallet global is separate from `aal.wallet`. Preserve external fields and unchanged references.

## AVM 13 changes to evaluate separately

The protocol supports 16,384 bytes combined approval plus clear with up to seven extra 2,048-byte pages, and 16,384 combined argument bytes including ABI overhead. Larger transactions incur additional fees. AVM byte values still require chunk-aware code. These are protocol capabilities, not automatic changes to Akita APIs. [Costs and constraints](https://dev.algorand.co/concepts/smart-contracts/costs-constraints/), [go-algorand 5.0](https://github.com/algorand/go-algorand/releases/tag/v5.0.0-stable).

Before using >8 KB contracts: update the immutable update-plugin implementation for more than two 4,096-byte chunks, verify page/schema handling and MBR sponsor, then deploy/rotate it. Review wallet factory page reservations, boxed uploads, 2032/2026/2000-byte chunk constants, SDK transaction sizing/fees, hardware/external signers, and group limits. Keep the current conservative chunk transport until separately tested. Boundary tests should cover 4,096/8,192/16,384-byte programs, total ABI argument limits, malformed/reordered chunks, fees, MBR growth and old-wallet compatibility. No AVM-size contract changes are included in the script work.

## Validation before the factory rollback

New focused tests cover all 32 allowlisted immutable deployments, receipt resumption and mismatch rejection, constructor errors, guarded Rewards/Gate DAO cutovers, all three existing child families, state preservation, child creator rejection, and paginated discovery. Dry-run regression runs the affected scripts against an unavailable local node with deliberately invalid signing input. SDK tests cover both Rewards generations and read failures.

Earlier validation on 2026-09-12 (superseded for the restored factory code by the rollback checks below):

- `npm test` in `projects/akita-sc`: **77 files passed; 1,128 tests passed, 5 existing TODOs**, in 1,161.04 seconds. Includes all 37 migration deployment/update tests and 5 dry-run regressions.
- `npm test` in `projects/akita-sdk`: **28 files and 245 tests passed**.
- `npm run check-types` in `projects/akita-sc` and `npm run build` in `projects/akita-sdk`: passed.
- Refreshed offline inventory: 84 artifacts, zero unreviewed routes and zero conditional dry-run guards. Scoped `git diff --check`: passed.

An earlier full test attempt was stopped after discovering that the separate subAccounts task was simultaneously testing against the same LocalNet. Those suites share the network clock. The final complete run above had exclusive LocalNet use and passed. The original planning pass also reproduced all 110 artifacts in an isolated contract build; this follow-up does not modify contract source. These results do not replace live deployment inventory or initialized-governance rehearsal.

## Rollback validation

The earlier merged-factory validation is historical and does not validate this rollback. The source was restored from the saved pre-integration files, preserving subsequent camelCase error-code changes. The account factory's separate AVM 13 expansion was then reversed.

- Full contract build and final wallet/factory/mock rebuild: passed; generated clients and SDK distribution regenerated.
- `npm run check-types` in `projects/akita-sc`: passed.
- `npm test` in `projects/akita-sdk`: 28 files, 244 tests passed.
- All 113 saved MainNet wallet boxes decode identically against the restored ABI; 37 accounts, 39 asset opt-ins and 36 scoped grants reconcile. The raw snapshot SHA-256 is unchanged.
- Twenty restored source files match the saved pre-integration content with current error naming. The account factory matches the original flow with current error naming. Compiler dependencies, shared deployment runner, update plugin, Meta and Guild sources remain unchanged.
- The first full contract run exposed a rollback dependency in the factory mock: its AVM 13 target prevented a round-trip back to the restored AVM 11 factory. The run was stopped, the mock target restored, artifacts/SDK rebuilt, and all 14 DAO upgrade tests passed. The final full contract `npm test -- --silent` passed: **76 files, 1,119 tests passed, 5 existing TODOs**, in 1,133.39 seconds. This includes all 37 migration-script tests and five dry-run regressions.

No public-network transaction or deployment was performed. A local backup of the pre-rollback working changes is retained at `/tmp/akita-undo-factory-avm13-20260912/`.

