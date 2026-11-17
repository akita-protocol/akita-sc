# Akita MainNet Rollout: runbook

Generated 2026-10-10 from the rollout report data. Every contract change in the frozen 2026-10-05 tree, ordered so no live caller ever hits a callee that cannot serve it. The DAO is still in Draft, so each creator proposal executes at once; the whole rollout runs before initialize().

Check progress at any point (read-only):

```bash
npm run rollout:status -- --network mainnet
```

Every MainNet write needs explicit approval of network, sender and action. Run each command with `--dry-run` first.

## Update 2026-11-10

The tree is no longer the frozen 2026-10-05 tree. Since this runbook was generated:

- The readiness audit fixes C1 to C7 and C10 to C17 are in, each batch as its own commit. AkitaRouterPlugin, VenueRegistry and TinymanV2Adapter are removed; swap and swapRoute are back on PluginDexPlugin.
- The build uses stock puya-ts 1.3.1 (puya 5.10.1) from the lockfile. A clean install and whole-tree build on Linux reproduces every committed artifact and generated client byte for byte (A1).
- `projects/akita-sc/release/manifest.json` pinned all 185 programs on this date (155 since the Plugin DEX was parked, see the next update). It replaces the spec §9.8 table and `manifest.py` (A1, A2).
- The work was committed locally on `feat/plugin-dex-v2`. It is not pushed and not tagged (DEC-5).
- Steps the fixes changed: G2 (the seven plugins once listed as compiler-only), H1 (Meta revenue escrow), H4 (two-step admin handover, now with PluginDexAdminPlugin as the 14th contract; parked 2026-11-11) and H7 (SocialClaim, new).
- Program sizes below were updated from the manifest where they changed. No sponsorship amount changed (B1 dry run on MainNet, 2026-11-10).
- `deploy:immutable --config` takes the path of a JSON file. Where H1, H2 and H6 show the JSON inline, write it to a file and pass the path; an inline value fails before anything is sent.

## Update 2026-11-11

Kyle's decisions of 2026-11-11 change the plan in four places:

- **The Plugin DEX is parked.** PluginDex v2 and everything that belongs to it (the Vault, BinEngine, the hooks, LaunchManager, PluginDexPlugin, GatedFeePassPlugin, PluginDexAdminPlugin, the SDK module, the deploy and handover scripts, the tests, the docs and the DEX-only audit files) stays on branch `feat/plugin-dex-v2` and is not in this tree. Step H4, DEC-2, the DEX part of DEC-6, gap G15 and the `rev_dexchange` escrow are parked with it. This tree cannot deploy any part of it: the immutable catalog has no DEX entry (`tests/migration-dry-run.test.ts`). To bring it back, revert the two commits that parked it ("Park the Plugin DEX" and its build output) on a branch of this one.
- **Deploy first, push after (DEC-5).** The rollout runs from the local commits on `release/mainnet-rollout`. The push and the tag follow the deployment, together with the SDK changes that point at the new apps and ABI methods (step I2).
- **Every live plugin rotates (audit R9).** The rule is: rotate a plugin whenever its code changed. All 23 live plugin programs differ from this build, so all 23 rotate (table in G2). The apps prompt each wallet to update.
- **SocialClaim referrer (audit C5).** Whoever pays to create a recipient's wallet is its referrer. The contract already works this way, and `social-claim.e2e.spec.ts` now asserts it. H7 is held only for the attestor and manager keys.

Also changed:

- `release/manifest.json` pins 155 programs (85 deployable, 70 test-only; the manifest marked Arc58AgentRevoker, a test helper, as deployable until 2026-11-16). Taking the DEX out removed 30 programs and changed none: every remaining approval and clear hash equals the one in the 185-program manifest.
- The LocalNet mock Haystack router (`smart_contracts/mocks/haystack-router-localnet`) routes over Tinyman v2 pools only. It no longer needs a relay key or a Vault.

## Update 2026-11-15

The Guild fee asset is in the tree: a Guild may charge its proposal fees in an asset instead of ALGO. The second audit pass covered it on 2026-11-14 (C18 to C21); the decisions of 2026-11-15 are in `projects/akita-sc/audits/readiness-2026-11-09-decisions.md`.

- **Five programs differ from the release commit.** Guild (10,349 to 12,136 bytes), GuildPlugin (3,993 to 5,238 bytes, 2 extra pages instead of 1) and the three consensus programs, each 12 bytes smaller because fee settings lost their ceiling (C18): FixedSignerGuildConsensus 4,886 (5,424 since the direct plugin use of 2026-11-16), LockedTokenGuildConsensus 3,282, SubscriptionGuildConsensus 4,687. `release/manifest.json` is regenerated; the other 150 programs are unchanged.
- **H2 keeps its order and commands.** No Guild app is live on TestNet or MainNet (the SDK's Guild app ids are 0 on both), so nothing is migrated, and the scripts size each upload from the program itself.
- **ABI.** Guild gained `setFeeAsset`, `newProposalWithFeeAsset`, `editProposalWithFeeAsset`, `sweepFeeTokens`, `feeAssetCost`, `sweepableFeeTokens` and action 85 (set fee asset); `proposalCost` also returns `feeAsset`. GuildPlugin gained `setFeeAsset`, `newProposalWithFeeAsset` and `editProposalWithFeeAsset`. Build clients against the new SDK.
- **Storage.** A proposal box costs 6,400 µALGO more (base 51,300, was 44,900). Charging in an asset costs 209,300 µALGO once: two opt-ins and a 9,300 reserve box (109,300 while the Guild has no wallet).
- **Fee settings have no ceiling** (was 1,000,000). They are counted in base units of the asset charged and are not converted when the asset changes.

## Update 2026-11-15: anyone may pay storage and fees

A grouped payment that covers storage or a fee no longer has to come from the caller, and a storage deposit goes back to whoever paid it. The rules, costs and exceptions are in `projects/akita-sc/audits/readiness-2026-11-09-decisions.md` ("Third pass").

- **25 more programs differ from the release commit** (28 in all, with the three consensus programs above; 23 and 26 before the empty-account fix C27 of 2026-11-16 added AssetGate and the balance reader). Deployable: AkitaDAO 10,765 B (was 10,421), Guild 12,534 (12,436 before the two install rule changes of 2026-11-15 and 2026-11-16), GuildFactory 2,012, GuildConsensusFactory 1,399, GuildPlugin 5,247 (5,564 since the direct plugin use of 2026-11-16), SocialClaim 2,697 (2,765 before each gift stored its payer, C23 and C26 of 2026-11-16), Auction 8,522, Raffle 8,158, EscrowFactory 1,416, HyperSwap 3,986 (3,936 before the closed payer fix C22 of the fourth pass), Meta 4,436, Poll 2,349, PollFactory 4,339 (4,159 before the poll author fix C24 of 2026-11-16), Rewards 5,243, AkitaSocial 11,499, AkitaSocialGraph 2,609, AkitaSocialImpact 3,160, StakingPool 13,272, Staking 7,302 (7,306 before C27), Subscriptions 10,468 (10,801 since the featured service of 2026-11-16), AssetGate 712 (710 before C27) and AbstractedAccountBalanceReader 283 (284 before C27). Test-only: MockHyperSwap, MockLegacyVoteDAO and MockSharedHelpers. `release/manifest.json` is regenerated.
- **Pages.** Subscriptions needs 5 extra pages, one more than planned: E2 grows it from 3 to 5 and the DAO wallet sponsors 3,528,000 µA for it (was 3,428,000). Phase 2 sponsorship is 7,056,000 µA (AkitaSocial 3,528,000 and Subscriptions 3,528,000), and 10.65 ALGO with the DAO's own growth. Guild needs 6 extra pages; GuildFactory creates every Guild with 7. PollFactory needs 2 and the live app has 3. No other live app crosses a page.
- **Upload groups.** PollFactory's update takes one more upload transaction (three chunks, was two). Every other group keeps its size, StakingPoolFactory at exactly 16.
- **Staking and pools.** Staking gains `reclaimAppStake(address,uint64)void` and keeps every method it had. The new StakingPool child calls it instead of `releaseAppStake`, so D1 (Staking) still comes before E5 (StakingPoolFactory), and the runner refuses E5 until the Staking at aal.staking routes the new method.
- **ABI.** No method changed its signature. Calls that used to fail because the payment came from someone else now succeed when that payment also carries 28,500 µALGO for the payer record (`PAYER_RECORD_MBR` in the SDK), which comes back with the deposit. Guild proposals name their payer in the proposal itself and take no extra payment.
- **Storage.** A Guild proposal box costs 25,600 µALGO more (base 76,900, was 51,300): it holds who paid the ALGO and who paid the fee tokens.
- **Box references.** Every call that returns a deposit also looks for a payer record, so it needs one more box reference per record, sponsored or not. The SDK finds references by simulation. A hand-built group must add them, and a batch refund (`Poll.deleteBoxes`, `AkitaDAO.deleteProposalVotes`, `Raffle.refundMBR`, `Auction.refundMBR`, Guild vote cleanup) fits fewer records per call.
- **Clients.** The SDK methods still pay from the caller. A paymaster builds the payment itself until the SDK methods take a payer.

## Update 2026-11-16: the open points of the fourth pass are closed

Two programs changed after the fourth pass. Each closes a point that pass left open. The record is in `projects/akita-sc/audits/readiness-2026-11-09-decisions.md` ("Fifth pass").

- **PollFactory is 4,339 bytes (was 4,159), C24.** The caller of `new` is the poll's author: the account the poll records, and the only one that may clear its votes. Anyone may pay for the poll. A payer that is not the author adds 28,500 µALGO, is remembered by the factory under the poll's id, and gets the deposit and that amount back from `deletePoll`. Before, a sponsored poll recorded its sponsor, and only the sponsor could clear the votes. The Poll child program is unchanged (2,349 bytes), and so are `newPollCost`, every method signature and the state schema. A poll created before the upgrade has no payer record and is refunded to the account it records, as before.
- **Guild is 12,534 bytes (was 12,494), C25.** A proposal that installs a plugin with `defaultToEscrow` and no escrow name is refused when it is drafted. The wallet would refuse it at execution, so it could pass a vote and never execute.
- **Nothing in the sequence changes.** PollFactory still needs 2 extra pages (the live app has 3) and three upload chunks, so E6 runs as written. Guild still needs 6 extra pages and GuildFactory still creates every Guild with 7, so H2 runs as written.
- **Box references.** `PollFactory.deletePoll` looks for a payer record, sponsored or not, so it needs one more box reference on the factory. The SDK's `deletePoll` finds it by simulation. A hand-built call must add it.
- **Manifest.** `release/manifest.json` was regenerated from a whole-tree build. It differed from the manifest of 2026-11-15 in these two entries only. The next update changes four more.
- **SocialClaim was unchanged at this point.** Its payer rule (C23) was decided later the same day and the program changed. See the next update.
- **Live state re-read 2026-11-16** with `rollout:status` (read-only) on MainNet and on TestNet: no step of this rollout is done on either network. 12 steps are ready, 27 wait on earlier steps, and the DAO is in Draft on both. The TestNet rehearsal (A4) has not been run.

## Update 2026-11-16 (second): SocialClaim stores each gift's payer, and empty accounts read as zero

Four programs changed after the update above. The record is in `projects/akita-sc/audits/readiness-2026-11-09-decisions.md` ("Sixth pass").

- **SocialClaim is 2,697 bytes (was 2,765), C23 and C26.** Decided 2026-11-16: every gift box stores the account that paid its storage deposit, and the deposit always returns to that account. A gift box costs 41,300 µALGO (was 28,500). The subject entry is still 18,900 µALGO and is never returned. SocialClaim writes no payer record any more, and a payer that is not the caller pays nothing extra. `getGift` returns a third field, `payer`. When the payer's account is empty the deposit goes to the wallet that sent the gift, then to the gift wallet. C26: the check for an empty account failed the call instead of answering, so a payer that closed its account blocked the refund and the prune of its gift. Fixed. SocialClaim has never been deployed, so nothing live changes, and H7 is still held only for the keys.
- **Who gets the deposit with the SDK.** `sendToAnyone` and `topUp` pay the storage from the account that sends the group. That account gets the deposit back, not the sponsor wallet.
- **Staking is 7,302 bytes (was 7,306), C27.** It read an ALGO balance in a way that fails for an account that holds nothing. A holder of an ALGO soft stake who closed the account outright could not be checkpointed, and the stake kept the age it had built up. An empty account now reads as zero: the checkpoints, the heartbeat and `softCheck` answer for it. No method and no schema changed, and D1 runs as written.
- **AssetGate is 712 bytes (was 710), C27.** The same read. An ALGO gate failed for an empty account instead of comparing a balance of zero. The asset sub-gate cannot be patched. It was already one of the eight sub-gates DEC-4 recommends to deploy again at C1. A live asset sub-gate kept in place would not carry this fix.
- **AbstractedAccountBalanceReader is 283 bytes (was 284), C27.** The same read. It failed for an address that holds nothing instead of returning zero. It cannot be patched and is deployed new at H5.
- **Nothing in the sequence changes.** No step is added, moved or resized.
- **Manifest.** `release/manifest.json` is regenerated from a whole-tree build. It differs from the manifest of the update above in these four entries only. 28 programs differ from the release commit.

## Update 2026-11-16 (third): a deciding signer's direct plugin use, and editable highlights with a featured service

Four programs changed after the update above, for two additions the owner asked for on the evening of 2026-11-16. The record is in `projects/akita-sc/audits/readiness-2026-11-09-decisions.md` ("Seventh pass").

- **FixedSignerGuildConsensus is 5,424 bytes (was 4,886).** New method `usePlugin(uint64,string,uint64[],(uint64,uint64)[],byte[][][])void`. A signer whose own weight meets the threshold uses a plugin the Guild's wallet granted to the consensus app, in one send and with no proposal. The consensus app is the named caller of that grant, so the route does nothing until a Guild installs a plugin with its consensus app's address as the caller. The wallet's own checks on the grant still hold: the wallet named in each call, the rekey back, method restrictions, cooldown and escrow allowance. The Guild's vote settings, the proposal fee and the proposal record do not apply to such a use (C29, the design). ALGO the consensus app gains during a use is forwarded to the Guild app, where `sweep` sends it on to the treasury (C28). The program cannot be patched once it is registered at H2. It still needs 2 extra pages and three upload chunks.
- **GuildPlugin is 5,564 bytes (was 5,247).** New method `usePluginAsSigner`, the wallet-side entry to the route. It works from the creation-only plugin (guild = 0) for every Guild of the factory. Still 2 extra pages.
- **Limits of the route.** It carries only plugin methods that take no transaction arguments, and the SDK has no helper yet to encode the calls. A Guild with locked-token or subscription consensus has no such route: the call fails there.
- **Subscriptions is 10,801 bytes (was 10,468).** New methods `updateServiceHighlight`, `setFeaturedService`, `clearFeaturedService` and the read-only `getFeaturedService`. A creator edits a service's highlight label and colour at any time, and names one of their services as featured. The featured id is in a new box per creator (prefix `f`) that costs 18,900 µALGO once and comes back on clear to whoever paid it. A payer that is not the creator adds 28,500 µALGO for the payer record. Moving the featured service later takes a payment of 0 µALGO in the group. No existing method, box or struct changed. The four services on MainNet (app 3569556497, read 2026-11-16) decode under the unchanged layout, so their highlights can be edited as soon as E2 has run.
- **E2 keeps its pages, sponsorship and group size.** Subscriptions still needs 5 extra pages and six upload chunks, and the DAO wallet still sponsors 3,528,000 µA. 1,483 B of headroom is left (was 1,816).
- **SubscriptionsPlugin is 4,794 bytes (was 4,461).** It mirrors the three new write methods. Still 2 extra pages, deployed new at G1. The G1 readiness check reads the calls from the plugin's program, so it refuses the plugin until the Subscriptions at E2 routes the new methods.
- **For the apps.** A featured service that is shut down later stays recorded until its creator moves or clears it, so a reader checks the service's status. `highlightMessage` is not range-checked, as in `newService`.
- **Nothing in the sequence changes.** No step is added, moved or resized.
- **Manifest.** `release/manifest.json` is regenerated from a whole-tree build. It differs from the manifest of the update above in these four entries only. 29 programs differ from the release commit: SubscriptionsPlugin is the new one.

## Update 2026-11-16 (fourth): a caller may remove its own grant, and the revocation check

One deployable program changed after the update above: the wallet. The record is in `projects/akita-sc/audits/readiness-2026-11-09-decisions.md` ("Eighth pass").

- **AbstractedAccount is 8,160 bytes (was 8,139).** Two changes to who may remove a plugin grant, both in `arc58_removePlugin` and the check behind it.
- **A caller may remove its own grant** (asked for by the owner 2026-11-16). `arc58_removePlugin(plugin, caller, escrow)` also accepts the account named as `caller` in that grant. It is for an agent that shuts down: it frees the storage its grants hold in users' wallets, 38,900 µALGO per grant plus 8,000 per method restriction and 400 per byte of escrow name. The storage returns to the wallet, never to the caller. A grant open to anyone and an admin grant have no such caller. The removal updates `last_change` and leaves `last_user_interaction` alone. An alias, an escrow and its allowances stay until the admin removes them.
- **C30, low, fixed.** With no revocation app (id 0, the state of every wallet the live factory made) the revocation check compared the sender with the wallet's own address, because app id 0 resolves to the app that asks. A plugin can send as that address inside a main-account window, so it could remove any plugin grant, alias or allowance of that wallet. The check now compares the app that calls the wallet, where it compared the sender, and no app can call itself. The live wallet program (1.0.1, read 2026-11-16 on the DAO wallet 3569559153) has the same check. F1 and F2 replace it.
- **No method, schema or page count changed.** The wallet still needs 3 extra pages, with 28 B of headroom (was 49). E7 still uploads five chunks, and F1 and F2 run as written with no growth cost. Four pages is the most a program can have, so a later wallet change has to fit in those 28 bytes or free space first.
- **Test-only programs.** Arc58AgentProbePlugin (291 B, was 184) gained the hostile case the new tests use, and MockBigWallet (10,579 B, was 10,558) inherits the wallet.
- **Manifest.** `release/manifest.json` is regenerated from a whole-tree build. It differs from the manifest of the update above in these three entries, and Arc58AgentRevoker is now marked test-only: 85 programs are deployable and 70 are test-only. Nothing deploys the revoker; the manifest's naming rule had missed it. 32 programs differ from the release commit, and the wallet is the new deployable one.
- **SDK.** `wallet.removePlugin` takes any sender, so a caller uses it as it is. The text for `errOarp` now names the caller.

## Live state (read 2026-10-10)

- MainNet DAO 3569556034 is in Draft (initialized = 0, version 0.0.3). Only the creator proposes; proposals store as Approved and execute immediately.
- No live program changed since the Oct 4–5 fixtures (last change: proposal 170, Staking, 2026-08-22). The compat suite and ABI guard are current.
- Every aal / sal / pal / oal pointer equals networks.ts. TestNet programs match MainNet for every rollout target, so a TestNet rehearsal is valid.
- DAO wallet 3569559153 has 43.37 ALGO free; page-growth sponsorship needs 10.55 ALGO (DAO 3.59, Subscriptions 3.43, AkitaSocial 3.53).
- 73 live wallets (incl. the DAO wallet), all on program f59520de, all automatic-update. 2 Listings, 6 Polls, 37 escrows. 0 Auctions, Raffles, Pools, PrizeBoxes.

Re-read 2026-11-10 at round 66,834,699 (read-only):

- The DAO is still in Draft (version 0.0.3). `rollout:status` shows no step done on MainNet or on TestNet.
- All 40 programs in `tests/compat/fixtures` are unchanged on MainNet: 35 apps and the 5 child programs held in factory boxes.
- MainNet, TestNet and LocalNet run the same consensus protocol on go-algorand 5.0.5, so a program that can be created on LocalNet can be created on MainNet.
- DAO wallet 3569559153 still has 43.37 ALGO free. The B1 dry run reports 6,956,000 µA of Phase 2 sponsorship (AkitaSocial 3,528,000 and Subscriptions 3,428,000) and no shortfall.
- AkitaSocial has 7.54 ALGO free (K4). AkitaSocialModeration, PrizeBoxFactory and HyperSwap still hold 0 µA.
- Not re-read: the wallet, Listing, Poll and escrow counts, and whether TestNet programs still match MainNet.

## Decisions to close first

### DEC-1. How do wallets claim Rewards v1 allocations after aal.rewards moves to v2?

**Resolved 2026-10-11 (Kyle approved the contract change).** The tree RewardsPlugin adds `claimLegacyRewards` and `reclaimLegacyRewards`. They mirror `claimRewards` and `reclaimRewards` but call the `legacyRewards` app pinned at create, and refuse when it is 0 (errRwap). The existing methods keep their ABI and still call aal.rewards. v1 and v2 have the same claim/reclaim signatures. The SDK routes v1 claims through the legacy methods (`getDisbursementsAcrossDeployments(..., { currentAppId })` marks each deployment `legacy`; `RewardsPluginSDK.claimRewardsFrom`). Test: `arc58/plugins/rewards/rewards.e2e.spec.ts` DEC-1, against the deployed v1 bytes.

Background: v1 holds 22 open disbursements and 179 allocations (16,000 AKTA + 171 sticker units). EOAs can still claim directly from v1. Rejected options were a rewardsApp argument on the existing methods, delaying the repoint, and leaving wallet-held v1 allocations unclaimable.

### DEC-2. PluginDex #14a (bins per-position floor)

**Parked 2026-11-11 with the Plugin DEX.** It only concerns BinEngine, which is not in this tree. The question and its options are on branch `feat/plugin-dex-v2`.

### DEC-3. Meta data and the aal.metaMerkles pointer

Blocks: H1. MetaMerkles 3569558010 has no update route, so Meta is a new app. Merkle sub-gates, HyperSwap, StakingPool and royalties() read aal.metaMerkles at call time. Repointing before the roots move into Meta drops every stored root.

- Deploy Meta now; repoint only after a root migration (recommended).
- Keep MetaMerkles as the pointer indefinitely and use Meta only for the new record store.

### DEC-4. Which sub-gates get new app ids

Blocks: C1. 8 sub-gates changed behavior (AkitaReferrer, Asset, NFD, NFDRoot, SocialFollowerCount, StakingAmount, Subscription, SubscriptionStreak). 8 changed only error codes (MerkleAddress, MerkleAsset, Poll, SocialActivity, SocialFollowerIndex, SocialImpact, SocialModerator, StakingPower). The live compiler-only ones route every method Gate v2 calls (check, cost, register, getEntry).

- Redeploy the 8 changed, allowlist the 8 live ones on Gate v2 (recommended, matches the plugin policy).
- Redeploy all 16 for uniform versions.

Since 2026-11-16 the Asset sub-gate in the tree also reads an empty account's ALGO balance as zero (audit C27). Both options deploy it again, so both carry the fix.

### DEC-5. Commit, deploy, then push and tag

Every MainNet push must come from one pinned, whole-tree build.

**Decided 2026-11-11 (Kyle): deploy first, push after.** The contracts are deployed and updated from the local commits. The push and the tag come afterwards, so that the same push carries the SDK changes that point at the new app ids and ABI methods (step I2).

What this order needs, because nothing is on GitHub while the rollout runs:

- Deploy from one recorded commit of `release/mainnet-rollout`. Write its hash into the first receipt, and run `npm run release:manifest:check` before each stage: it proves the bytes about to be pushed are the bytes the manifest pins.
- CI has not run on this tree (the workflow only runs on a push). A1 is the same set of steps run by hand; repeat it on the deploy commit.
- Until the push the only copy of the release is one laptop. Keep a second copy before stage B, for example `git bundle create akita-release.bundle --all` stored somewhere else.
- The repo is public, so the push also publishes `audits/`, including findings accepted as risks. Decide that before I2.

### DEC-6. Independent audit of the immutable new contracts

**Parked 2026-11-11 with the Plugin DEX.** The independent audit was recommended for PluginDex v2, before H4. Stages B to H ship on the internal reviews and the 2026-11-09 readiness audit. The contracts in this rollout that cannot be patched after deploy are Gate v2 and the sub-gates, Rewards v2, the Phase 2a Update plugin, SocialClaim and every rotated or new plugin. Upgradeable apps can be fixed later through the DAO.

## Sequence

Every command below is complete: run it as written, from `projects/akita-sc`, in the shell that step A0 sets up. A value in `<angle brackets>` is the only thing to fill in. `tests/rollout-runbook.test.ts` reads these blocks and fails when a command names a script, a flag, a contract, a target or a tracker step that does not exist.

Rules that hold for every step:

- **One version label.** `$V` is set once in A0 and passed to every command. A receipt records the label, so a rerun with another label is refused. The label must differ from the live wallet version 1.0.1, or F2 skips every wallet.
- **Plan before sending.** A line with `--dry-run` sends nothing. It simulates as `--sender "$CREATOR"`, the DAO creator, because only that account can send the rollout's proposals before `initialize()`.
- **Rebuild the SDK after every `--register`.** `--register` writes the new app id into `akita-sdk/src/networks.ts`; the scripts read the built SDK. The rebuild line is part of each block.
- **Check progress** with `npm run rollout:status -- --network mainnet` after each step. It also prints the DAO creator.
- For TestNet, replace `-n mainnet` with `-n testnet`, and take app ids from the TestNet half of `networks.ts`.

### Stage A: Release gate

Off-chain. Nothing is sent.

#### A0. Set up the shell

- **What:** One shell for the whole rollout: Node 24, the key in the environment, the version label, the DAO creator and the receipt folders.
- **Why here:** The scripts read the key from `DEPLOYER_MNEMONIC`, so it never appears in a command line or in the shell history. `read -rs` does not echo it.
- **Requires:** none. **Script:** plain shell.
- `2.0.0` is a suggestion. Version labels are free text; live apps carry 0.0.2, 0.0.3, 1.0.0 and 1.0.1 today.
- `CREATOR` is read from the chain by the tracker. `echo "$CREATOR"` should print one address, the one whose key was entered above.

```bash
nvm use
cd projects/akita-sc
read -rs DEPLOYER_MNEMONIC && export DEPLOYER_MNEMONIC
export V=2.0.0
export CREATOR=$(npm run -s rollout:status -- --network mainnet | sed -n 's/^DAO creator: //p')
mkdir -p receipts/gates receipts/phase2 receipts/phase3
```

#### A1. Re-verify the release tree (done on the local commits; repeat on the deploy commit and on the tag)

- **What:** Install from the lockfile, rebuild the whole tree, check that the build output and the release manifest did not change, and run the full suite on LocalNet.
- **Why here:** Every later step pushes these exact bytes. A single-file build changes router order, so only a whole-tree build counts (spec §9.3).
- **Requires:** none. **Script:** ready: `release:manifest:check` compares every program under `smart_contracts/artifacts` with `release/manifest.json`. The CI workflow (`.github/workflows/akita-sc-ci.yaml`) runs the same steps on every push.
- Done 2026-11-10 on a clean clone of the committed tree (Linux, Node 24): after `npm ci` and both builds, every artifact, generated client and SDK bundle was unchanged. The full suite then passed on LocalNet in six shards: 163 files, 2,596 tests, 2,589 passed, none failed (2 skipped, 5 todo), and it left the tree unchanged.
- Repeated 2026-11-11 on the tree without the Plugin DEX: the whole-tree build changed no remaining program, the SDK unit tests passed (49 files, 495 tests), and the full suite passed on LocalNet in six shards: 141 files, 2,224 tests, 2,217 passed, none failed (2 skipped, 5 todo), and it left the tree unchanged.
- Repeated 2026-11-16 on the working tree that holds the Guild fee asset work, the payer change and the fixes C18 to C25, none of it committed yet: the whole-tree build matches the regenerated manifest (155 programs), the SDK unit tests passed (49 files, 495 tests), and the full suite passed on LocalNet in six shards: 145 files, 2,272 tests, 2,265 passed, none failed (2 skipped, 5 todo), and it left the build output unchanged. Repeated again the same day after SocialClaim, Staking, AssetGate and the balance reader changed (audit C23, C26, C27): the whole-tree build matches the regenerated manifest (155 programs), the SDK's 496 unit tests passed, and the full suite passed: 146 files, 2,277 tests, 2,270 passed, none failed (2 skipped, 5 todo), again leaving the build output unchanged. Repeat it on the deploy commit.
- Use Node 24 (`nvm use` reads `.nvmrc`). A shell that defaults to an older Node fails the engine check.
- Only `projects/akita-sdk/dist/*.map` may differ after a rebuild: tsup writes the absolute build path into each source map.

```bash
(cd ../.. && npm ci)
npm run build
(cd ../akita-sdk && npm run build)
git status --short
npm run release:manifest:check
npm test
```

#### A2. Commit and pin hashes (the tag follows the deployment)

- **What:** Commit the tree and record approval hashes for every app the rollout touches, including the ride-along apps (Staking, HyperSwap, PollFactory, PrizeBoxFactory, Impact, Moderation, validator, Rewards v2, Meta).
- **Why here:** Pinned hashes make a later diff against MainNet meaningful. The tag is made in I2, after the deployment (DEC-5).
- **Requires:** A1. **Script:** ready: `npm run release:manifest` writes `release/manifest.json`; `tests/release-manifest.test.ts` fails when the artifacts drift from it. The push and the tag are manual and come after the deployment (DEC-5, I2).
- Committed locally 2026-11-10; the Plugin DEX was taken out on 2026-11-11. The manifest pins the approval and clear hash, the size and the extra pages of all 155 programs (85 deployable, 70 test-only), so the ride-along apps are pinned too.
- After an intended rebuild, regenerate the manifest and commit it with the artifacts. Its diff is the list of programs whose bytes changed.
- Still to do before stage B: record the commit the rollout deploys from and keep a second copy of the repository (DEC-5).

```bash
npm run release:manifest
git rev-parse HEAD
git bundle create akita-release.bundle --all
```

#### A3. Close the blocking decisions

- **What:** Answer DEC-1 (v1 Rewards claims) and DEC-4 (sub-gate set) before their stages. DEC-3 gates only stage H. DEC-2 and DEC-6 are parked with the Plugin DEX.
- **Why here:** DEC-1 blocks the aal.rewards repoint, and that blocks the StakingPoolFactory upgrade (ROLLOUT-1).
- **Requires:** none. **Script:** manual.

#### A4. Rehearse B → I on TestNet

- **What:** Run every stage on TestNet with the same scripts, checking progress with rollout:status --network testnet after each step.
- **Why here:** TestNet runs the same programs as MainNet for every target, so the ABI guard and the K1 binding run against real deployed bytes. LocalNet runs the tree, so its ABI diff is empty.
- **Requires:** A2. **Script:** new: rollout-status.ts written today.
- TestNet has only the DAO wallet, so it cannot rehearse the 72-wallet sweep or live-child compat.
- TestNet PollFactory is unfunded; fund it before the Poll step.
- MainNet haystackRouter #2 and nfd #3 have no TestNet twin.

```bash
npm run rollout:status -- --network testnet
```

#### A5. Fund the accounts the steps draw on

- **What:** Top up the deployer, and confirm the DAO wallet holds the page-growth sponsorship.
- **Why here:** A step that runs short mid-group wastes a proposal window.
- **Requires:** none. **Script:** manual.
- DAO wallet: 10.65 ALGO sponsorship (has 43.37 free). It was 10.55 before Subscriptions took a sixth page on 2026-11-15.
- StakingPoolFactory box growth +1.842 ALGO and AuctionFactory +14,800 µA; the Phase 2 runner pays both.
- AkitaSocialModeration, PrizeBoxFactory and HyperSwap hold 0 µA today.

### Stage B: Upgrade path and DAO

The new Update plugin first; then the DAO upgrades itself through it.

#### B1. Phase 2a: install the new UpdateAkitaDAOPlugin

- **What:** Deploy the page-growing Update plugin and run ONE proposal: UpdateFields pal (update = new; optin and revenueManager unchanged), AddPlugin new (global, execution key), RemovePlugin old 3569559689. Then record the id and rebuild the SDK.
- **Why here:** The live plugin pushes at most 3 chunks and never grows pages, so it can push neither the DAO (10,765 B) nor AkitaSocial or Subscriptions. Every target accepts updates only from pal.update, so role and grant move together.
- **Requires:** A2. **Script:** ready.
- **Tracked by rollout:status as** `phase2a`.
- The pal write replaces the whole struct: it must carry optin 3569560490 and revenueManager 3642325118.
- The live validator caps proposal settings power at 1,000; the AddPlugin settings must fit.
- Until B2 lands, every Update-plugin group carries the K1 proposal note. runUpdate now adds it automatically (fixed today).

```bash
npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet -v "$V" --manifest receipts/phase2a.json --fund-sponsor --register --confirm
(cd ../akita-sdk && npm run build)
```

#### B2. Deploy the validator and upgrade the DAO

- **What:** update:dao deploys the tree AkitaDAOProposalValidator, repoints oal.daoProposalValidator, then upgrades the DAO through the Phase 2 runner (pages 4 → 6, schema kept).
- **Why here:** Reclaim, ChangeAdmin, guild_fees, cancelProposal and the bootstrap-key guard exist only in the tree DAO and validator. Doing it first also closes the DAO-01/02/03 weaknesses before anything else rides on the DAO.
- **Requires:** B1. **Script:** ready.
- **Tracked by rollout:status as** `dao`.
- Keep the DAO in Draft (ROLLOUT-8): while Draft only the creator proposes, which keeps the K1 read safe.
- The DAO wallet sponsors 3,592,500 µA of page growth (5 extra pages since the 2026-10-12 time-weighted votes; was 3,492,500 at 4).
- Time-weighted votes (2026-10-12, audit DAO-04 option 4B): approve / reject / abstain tally power in base units (2026-10-13), amount x min(days left, 365) / 365 (0 with under a week left; a lock must outlast the vote). A voter with 0 power cannot vote (errNpow), and a re-vote after power fell to 0 is refused, so the cast vote stands. Quorum counts the locked amount (base units) that voted against the amount locked at submit, so aged locks with full turnout reach quorum. Proposals voted before the upgrade (no tally box) still compare their recorded power with live locked stake.
- Vote box v2: new receipts are `'w'` + proposal id + voter → (type, power, weight), 25,700 µA. Legacy `'v'` receipts are replaced on a re-vote and refunded at 22,500 by deleteProposalVotes.
- Participation record: `'r'` + voter → (lastVotedTs, lastProposalID, votes), 25,300 µA paid with the first vote, never deleted. Read through `getGovernanceParticipation` (GovernanceParticipationGate, revenue payouts).
- Lockstep: the deployed AkitaDAOPlugin pays 22,500 per vote and reverts on the upgraded DAO. Deploy the tree AkitaDAOPlugin and rebuild the SDK (`akita-sdk/dao` quotes the exact deposit) in the same window as this upgrade; F-stage plugin rotation must not lag for the DAO plugin.
- Proposal power thresholds are base units from B2 on (2026-10-13; `utils/defaults.ts` is 600/300/200 tokens x 1e6). Every `power` the live DAO already stores (the nine `*_ps` proposal settings globals and each global execution-key plugin's DAO settings) is in whole token-years and reads 1e6 times lower after B2. Thresholds are not enforced while the DAO is in Draft. The globals are rescaled in I1 (`dao:rescale-power`); a plugin's settings are rescaled when its grant is swapped in G1, G2 or G3, because the swap copies them. The new validator caps `power` at 1e15.
- The last two lines deploy and record the tree AkitaDAOPlugin for the lockstep above. The DAO wallet holds no grant of it, so there is nothing to swap.
- From here on, each bootstrap UpgradeApp/ExecutePlugin window must end within 10,000 rounds of executeProposal.

```bash
npm run update:dao -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run update:dao -- -n mainnet -v "$V"
npm run deploy:dao-plugin -- -n mainnet -v "$V" --manifest receipts/dao-plugin.json --register
(cd ../akita-sdk && npm run build)
```

#### B3. Set guild_fees

- **What:** UpdateFields guild_fees with the guild creation fee.
- **Why here:** Code upgrades do not create missing globals. GuildFactory reverts errGuildFactoryGuildFeesUnset without it, and only the tree validator accepts the field.
- **Requires:** B2. **Script:** ready.
- **Tracked by rollout:status as** `guild-fees`.
- Can wait until just before H2.

```bash
npm run update:guild-creation-cost -- -n mainnet --cost <microAlgos> --dry-run --sender "$CREATOR"
npm run update:guild-creation-cost -- -n mainnet --cost <microAlgos>
```

### Stage C: Gate v2

Six Phase 2 targets call Gate.checkFor / mustCheckFor, which Gate v1 does not route.

#### C1. Deploy Gate v2 and the changed sub-gates

- **What:** Deploy Gate v2 (legacyCutoff 1: v1 never registered a gate) and the sub-gates chosen in DEC-4, each with a receipt.
- **Why here:** Gate v1 and every sub-gate are immutable, so the fixes ship as new apps. Nothing needs importing (v1 gate_cursor = 1).
- **Requires:** A3. **Script:** fixed: Type error fixed today.

```bash
npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,nfd,nfdRoot,socialFollowerCount,stakingAmount,subscription,subscriptionStreak,moderatorActivity,governanceParticipation --legacy-cutoff 1 --dry-run --sender "$CREATOR"
npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,nfd,nfdRoot,socialFollowerCount,stakingAmount,subscription,subscriptionStreak,moderatorActivity,governanceParticipation --legacy-cutoff 1 --manifest-dir receipts/gates
```

- ModeratorActivityGate (new, 2026-10-12, Kyle approved): "at least N counted moderation actions in the current 7-day epoch (plus the previous one)". Deploy it here: after C3 only a DAO proposal can allowlist it. Its checks fail until E1 upgrades AkitaSocialModeration (`moderatorActivity`).
- GovernanceParticipationGate (new, 2026-10-12, Kyle approved): "at least minVotes distinct DAO proposals voted on, the last within withinSeconds (0: any time)". Deploy it here, before C3 sealImports, for the same reason. It reads `AkitaDAO.getGovernanceParticipation`, so its checks fail until B2.

#### C2. Allowlist every sub-gate

- **What:** As the Gate creator, allowlist the new sub-gates (context-aware flag for AkitaReferrer, Subscription, SubscriptionStreak, ModeratorActivityGate, GovernanceParticipationGate) and the kept live ones.
- **Why here:** After the seal only the DAO wallet can change the allowlist, and no DAO action calls setSubGate directly.
- **Requires:** C1. **Script:** ready. Between C1 and C4 the SDK still names Gate v1, so both this step and C3 take Gate v2's id from its receipt in `--manifest-dir` (fixed 2026-11-16; `--gate <id>` overrides it).
- Never flag a live (old) sub-gate as context-aware: Gate v2 would fail every context check that uses it (C15).
- `--sub-gates` lists the eight live sub-gates that are kept (DEC-4), with their MainNet ids.

```bash
npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n mainnet --manifest-dir receipts/gates --sub-gates MerkleAddressGate=3569558615,MerkleAssetGate=3569558603,PollGate=3569558607,SocialActivityGate=3569558616,SocialFollowerIndexGate=3569558605,SocialImpactGate=3569558618,SocialModeratorGate=3569558617,StakingPowerGate=3642975628 --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n mainnet --manifest-dir receipts/gates --sub-gates MerkleAddressGate=3569558615,MerkleAssetGate=3569558603,PollGate=3569558607,SocialActivityGate=3569558616,SocialFollowerIndexGate=3569558605,SocialImpactGate=3569558618,SocialModeratorGate=3569558617,StakingPowerGate=3642975628
```

#### C3. Seal Gate imports

- **What:** Call sealImports, which hands allowlist control to the DAO wallet.
- **Why here:** Ends the creator's migration window. The script refuses while any expected sub-gate is not allowlisted.
- **Requires:** C2. **Script:** new: seal-gate-imports.ts written today (gap G5).

```bash
npm run seal:gate-imports -- -n mainnet --manifest-dir receipts/gates --sub-gates MerkleAddressGate=3569558615,MerkleAssetGate=3569558603,PollGate=3569558607,SocialActivityGate=3569558616,SocialFollowerIndexGate=3569558605,SocialImpactGate=3569558618,SocialModeratorGate=3569558617,StakingPowerGate=3642975628 --dry-run --sender "$CREATOR"
npm run seal:gate-imports -- -n mainnet --manifest-dir receipts/gates --sub-gates MerkleAddressGate=3569558615,MerkleAssetGate=3569558603,PollGate=3569558607,SocialActivityGate=3569558616,SocialFollowerIndexGate=3569558605,SocialImpactGate=3569558618,SocialModeratorGate=3569558617,StakingPowerGate=3642975628
```

#### C4. Point aal.gate at Gate v2

- **What:** Guarded UpdateFields aal (gate = v2; every other field unchanged), and the SDK ids of Gate v2 and of every sub-gate deployed in C1. The command is C1's with `--register`: each receipt resumes at its registration, and nothing is deployed twice.
- **Why here:** Phase 2 now refuses AkitaSocial, Subscriptions, Marketplace, StakingPoolFactory, AuctionFactory and RaffleFactory until aal.gate routes checkFor/mustCheckFor (encoded today).
- **Requires:** C3, B2. **Script:** ready.
- **Tracked by rollout:status as** `gate`.
- The live GatePlugin is pinned to Gate v1 and keeps registering there silently; rotate it in G2.

```bash
npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,nfd,nfdRoot,socialFollowerCount,stakingAmount,subscription,subscriptionStreak,moderatorActivity,governanceParticipation --legacy-cutoff 1 --manifest-dir receipts/gates --register
(cd ../akita-sdk && npm run build)
```

### Stage D: Staking and Rewards v2

The new StakingPool child calls Staking.reclaimAppStake and Rewards.closeDisbursement.

#### D1. Upgrade Staking in place

- **What:** UpgradeApp on Staking 3642366153 (7,302 B, fits its pages, schema unchanged; 7,306 B before the empty-account fix C27 of 2026-11-16). It adds `reclaimAppStake(address,uint64)void`, which the new StakingPool child calls when an entry leaves a SOFT pool; `releaseAppStake` stays for the StakingPlugin and for owners of commitments to deleted pools.
- **Why here:** Hard prerequisite of the StakingPool child (ROLLOUT-1) and of the new StakingPlugin. The tree Staking still routes all 36 live selectors.
- **Requires:** B1. **Script:** fixed: runUpdate now binds groups to the proposal (gap G2); without that fix it reverts between B1 and B2.
- **Tracked by rollout:status as** `staking`.
- The live Staking program matches no commit; its routes were read from the deployed bytes.
- Afterwards the DAO wallet must call setHeartbeatManager before heartbeats work.

```bash
npm run update:staking -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run update:staking -- -n mainnet -v "$V"
```

**D1 follow-up: set the heartbeat manager.** Script: `staking:set-heartbeat-manager` (`scripts/set-heartbeat-manager.ts`). Run it after D1 and after the tree StakingPlugin is deployed; its commands are step G2a.

1. It refuses unless Staking (`aal.staking`) routes `setHeartbeatManager`, and the StakingPlugin (`--staking-plugin`, default: SDK `stakingPlugin`) runs the tree artifact for this DAO.
2. AddPlugin: a StakingPlugin grant on the DAO wallet. Global caller, execution key, methods `[setHeartbeatManager]` only, with the DAO's upgrade-class proposal settings.
3. ExecutePlugin: one group that calls `setHeartbeatManager(manager)`. The script sends it, reads `heartbeat_manager_address` back from Staking, and clears the used bootstrap key.
4. RemovePlugin removes the grant. `--keep-grant` keeps it for later manager changes; each change still needs its own ExecutePlugin proposal.

It needs the DAO creator's key and a DAO that is not initialized. A re-run with the same manager does nothing. Tracked by rollout:status as `heartbeat`; `initialize` requires it.

#### D1a. Ask the 2 live Listing sellers to settle or delist

- **What:** The 2 live Listings (3643990817, 3691743616) cannot settle a sale that needs a Rewards disbursement after D2: they pay Rewards v1's 67,000 µA per disbursement and Rewards v2 takes exactly 79,800. Ask their sellers to settle or delist before D2, or accept that those sales revert.
- **Why here:** It must happen before aal.rewards moves to v2.
- **Requires:** none. **Script:** manual.
- These rev-absent children never pay a seller referral; their only Rewards call is the prize disbursement to a buyer who is not opted in to the prize. A buyer who opts in first can still buy, and a delist still works (compat test "Rewards v2: an old child disbursing the prize…").

#### D2. Deploy Rewards v2 and repoint aal.rewards

- **What:** Create Rewards v2 with a receipt, opt it into the distributed ASAs, then a guarded UpdateFields aal (rewards = v2).
- **Why here:** Rewards v1 has no update route and carries audit C-1. Every service resolves Rewards through aal.rewards at call time.
- **Requires:** A3, B2, D1a. **Script:** ready: deploy:rewards (receipt and guarded cutover) and, since 2026-11-16, `rewards:opt-in`, which opts the new app in to every asset the old one holds. The cutover is refused while one is missing: a disbursement in an asset the new app does not hold reverts, for every service at once.
- **Tracked by rollout:status as** `rewards`, `rewards-opt-ins`.
- DEC-1 is resolved; rotate the RewardsPlugin in G2 right after this step.
- Rewards v2 stores the reclaim target as a `reclaimTo` field of each disbursement record (zero address = not sweepable) and adds the permissionless `sweepExpired`. After expiration, anyone can send the unclaimed allocations, their box MBR and the emptied disbursement's MBR to the reclaim target.
- The field makes every disbursement box 32 B larger: the disbursement MBR is 54,500 µA (v1: 41,700), so one single-allocation disbursement costs 79,800 (v1: 67,000). The old `createInstantDisbursement` / `createInstantAsaDisbursement` selectors and `createAsaDisbursementFromGroup` record `reclaimTo` = zero but charge the new MBR.
- The multi-step `createDisbursement` also takes `reclaimTo` (Kyle, 2026-10-11): `createDisbursement(pay,string,uint64,uint64,string,address)uint64` (0x65e49643) records it, so a batched disbursement (create, `createUserAllocations` / `createAsaUserAllocations`, `finalizeDisbursement`) is sweepable after expiration. The old 5-arg selector (0x1c9ebbdb) stays and records zero at the same MBR. `editDisbursement` never changes `reclaimTo`.
- Accepted break (Kyle, 2026-10-11): a deployed caller that pays the v1 amount reverts at Rewards v2 (errIpma). That covers the 2 live Listings (D1a) and every deployed service until its stage-E upgrade: AkitaSocial, Subscriptions and Marketplace referrals, plus AuctionFactory, RaffleFactory, StakingPoolFactory and wallet-factory payouts until E4, E5 and E7.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- From E1 on, upgraded services pay referrals through the new overloads: the referrer has 30 days to claim, then the cut can be swept to the service's DAO escrow. The Phase 2 runner refuses those targets until aal.rewards routes the overloads.
- Finish or abort open pool rounds while aal.rewards is still v1 (none exist on MainNet).
- networks.ts keeps v1 as `rewardsV1` (3569556095) so v1 allocations stay readable; `--register` fills that key from the receipt only where it is still 0n.

```bash
npm run deploy:rewards -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run deploy:rewards -- -n mainnet -v "$V" --manifest receipts/rewards.json
npm run rewards:opt-in -- -n mainnet --manifest receipts/rewards.json --dry-run
npm run rewards:opt-in -- -n mainnet --manifest receipts/rewards.json
npm run deploy:rewards -- -n mainnet -v "$V" --manifest receipts/rewards.json --register
(cd ../akita-sdk && npm run build)
```

### Stage E: Service upgrades

Phase 2 singletons with their children, plus the ride-along upgrades.

#### E1. Social family

- **What:** Phase 2 AkitaSocial (pages 4 → 6) and AkitaSocialGraph; ride-along AkitaSocialImpact and AkitaSocialModeration through update:social.
- **Why here:** Hinted social methods back the Phase 3 social plugin. The four live social plugins keep working through pinned legacy terms (K4).
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:AkitaSocial`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- K4: from this moment until Phase 4, monitor AkitaSocial's free balance (7.64 ALGO today) and top it up.
- Do not rerun register-social-extensions.ts; it is not idempotent and arc53_collection is already registered.
- DAO wallet sponsors 3,528,000 µA.
- Moderator activity fix (Kyle approved 2026-10-12): the upgraded AkitaSocialModeration writes `lastActive` on every successful moderation action (the live app never wrote it, so every SocialModeratorGate "active since" check saw 0). It also counts state-changing actions per moderator per 7-day epoch in a new `'k'` box (25,300 µA) and adds the readonly `moderatorActivity` (read by ModeratorActivityGate, C1). `addModerator` now creates `'d'` and `'k'` together and `removeModerator` deletes both, so each moderator holds 44,200 µA of the Moderation app's own balance, released back to that balance on removal; flag, unflag and content-flag actions allocate nothing. The ABI is additive, the `'d'` box layout is unchanged, and the deployed SocialModeratorGate keeps working. The live app has 0 moderators and 0 µA: before the first addModerator proposal, fund it with 100,000 µA (account minimum) + 44,200 µA per moderator + 18,900 µA per concurrent ban.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AkitaSocial,AkitaSocialGraph --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AkitaSocial,AkitaSocialGraph --confirm
npm run update:social -- -n mainnet -v "$V" --contracts socialImpact,socialModeration --dry-run --sender "$CREATOR"
npm run update:social -- -n mainnet -v "$V" --contracts socialImpact,socialModeration
```

#### E2. Subscriptions

- **What:** Phase 2 Subscriptions (pages 4 → 6: the program is 10,801 B since the featured service of 2026-11-16, and was 10,468 B with the payer records of 2026-11-15).
- **Why here:** Hinted subscribe paths back the new SubscriptionsPlugin and the subscription guild consensus.
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:Subscriptions`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- DAO wallet sponsors 3,528,000 µA (3,428,000 while the program still fitted 4 extra pages). 1,483 B of headroom left in 5 extra pages.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Subscriptions --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Subscriptions --confirm
```

#### E3. Marketplace + Listing

- **What:** Phase 2 Marketplace with the rev-3 Listing child in one group.
- **Why here:** The 2 live Listings route every method the new Marketplace calls; new listings get seller referrals.
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:Marketplace`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- K8: keep ≥ 500,000 µA + 189,600 µA per open legacy-paid listing free in the Marketplace (176,800 for a prize box; 1,905,400 free covers 7). The float is the 164,000 creator MBR plus 12,800 for each disbursement the deployed plugin quotes at the v1 MBR (prize + referral; referral only for a prize box).

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Marketplace --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Marketplace --confirm
```

#### E4. Auction and Raffle factories

- **What:** Phase 2 AuctionFactory + Auction child and RaffleFactory + Raffle child.
- **Why here:** Both children call Gate.mustCheckFor. RaffleFactory drops the deployed newRaffle / newPrizeBoxRaffle (K6, accepted).
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:AuctionFactory`.
- K6 lockstep: ship the SDK release the same day; the HEAD SDK cannot create raffles on the new factory.
- The old AuctionPlugin underpays bids on new children by 800 µA; rotate it in G1 soon after.
- Auction child is 8,522 B: +0.1 ALGO MBR per auction.
- Raffle child is 8,158 B, one upload chunk more than before the audit fixes, so the RaffleFactory group is 14 transactions (the limit is 16). It has 30 B left in its four pages: `auction/principal-abi.test.ts` fails if it takes a fifth.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AuctionFactory,RaffleFactory --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AuctionFactory,RaffleFactory --confirm
```

#### E5. StakingPoolFactory + StakingPool

- **What:** Phase 2 StakingPoolFactory with the 13,272 B child (exactly 16 txns).
- **Why here:** The runner refuses this target until Staking, Rewards v2 and Gate v2 are live; all three are hard callee dependencies.
- **Requires:** D1, D2, C4, B1. **Script:** fixed: Gate dependency added today; the Rewards dependency now also covers the referral reclaim overloads.
- **Tracked by rollout:status as** `p2:StakingPoolFactory`.
- New pools cost 3 more pages (+300,000 µA) and ~447 µA fee surcharge; static quotes in other frontends go stale.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target StakingPoolFactory --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target StakingPoolFactory --confirm
```

#### E6. Poll, PrizeBox, HyperSwap

- **What:** PollFactory and HyperSwap through Phase 2 --target with their plugin lockstep; PrizeBoxFactory through update:prize-box.
- **Why here:** PollFactory now charges every Poll page: the new PollPlugin quotes newPollCost, so its grant swaps BEFORE the upgrade. HyperSwap removes the old accept: its plugin swaps right AFTER.
- **Requires:** B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:PollFactory`.
- HyperSwap has never had an offer, so the accept removal strands nothing.
- Polls created before the upgrade keep working: they have no payer record, and `deletePoll` refunds the account they record, as before (C24).
- PrizeBoxFactory holds 0 µA today; mint may never have worked on MainNet.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target PollFactory --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target PollFactory --manifest-dir receipts/phase2 --register --confirm
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target HyperSwap --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target HyperSwap --manifest-dir receipts/phase2 --register --confirm
(cd ../akita-sdk && npm run build)
npm run update:prize-box -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run update:prize-box -- -n mainnet -v "$V"
```

#### E7. Wallet factory + wallet child (atomic) (one-way)

- **What:** Phase 2 AbstractedAccountFactory and the AVM 13 AbstractedAccount child in ONE group.
- **Why here:** The tree factory creates only the 11-argument AVM 13 wallet; the live factory cannot create it. Splitting them stops all wallet creation (ACCT-3).
- **Requires:** D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:AbstractedAccountFactory`.
- K2 lockstep: ship the SDK release and every wallet-creating frontend/backend in the same hour.
- From this moment anyone can push the AVM 13 wallet into any automatic wallet, the DAO wallet included. Run F right after.
- Never change aal.wallet: every principal check pins wallet genuineness to it.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AbstractedAccountFactory --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AbstractedAccountFactory --confirm
```

### Stage F: Wallets

AVM 13 is one-way; do it deliberately right after E7.

#### F1. Upgrade the DAO wallet (one-way)

- **What:** UpdateWallet proposal: the factory pushes the staged wallet into the DAO wallet.
- **Why here:** The tree DAO and validator call arc58_getNamedPluginKey for RemoveNamedPlugin; the live wallet does not route it.
- **Requires:** E7. **Script:** ready.
- **Tracked by rollout:status as** `dao-wallet`.
- Spec §9.5 step 4 puts this before Phase 2; that cannot run (ROLLOUT-5). This order is the executable one.

```bash
npm run update:dao-wallet -- -n mainnet --dry-run --sender "$CREATOR"
npm run update:dao-wallet -- -n mainnet
```

#### F2. Sweep the 72 user wallets

- **What:** Push the tree wallet into every automatic-update wallet.
- **Why here:** R-STALE (the stale escrow registry) closes per wallet only when it runs the new program.
- **Requires:** E7. **Script:** ready.
- Resumable with --skip-current. Wallet stays at 4 pages (approval 8,160 B since the caller removal rule of 2026-11-16, 28 B of headroom), so no growth cost.

```bash
npm run update:automatic-wallets -- -n mainnet --dry-run
npm run update:automatic-wallets -- -n mainnet --skip-current
```

### Stage G: Plugin rotation

Each new plugin waits for the service version it calls.

#### G1. Phase 3 plugins

- **What:** Deploy AkitaSocialPlugin, SubscriptionsPlugin, StakingPoolPlugin, AuctionPlugin v3, RafflePlugin v3, MarketplacePlugin (and WelcomePlugin), swap the DAO wallet grants with policy kept, add setMetaWallet to restricted social grants, register the ids.
- **Why here:** assertPhase3Ready refuses any plugin whose service, child or Gate cannot serve it yet.
- **Requires:** E1, E2, E3, E4, E5, C4. **Script:** ready.
- **Tracked by rollout:status as** `plugin:socialPlugin`.
- `--add-new-methods` adds setMetaWallet to method-restricted social grants. The DAO wallet holds no method-restricted raffle or auction grant on MainNet or TestNet (read 2026-11-16), so gap G9 does not apply to this rollout.
- The swap also moves the DAO wallet's two grants of the older social plugin 3569562087, and rescales the proposal threshold of every grant it copies (see B2).

```bash
npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -v "$V" --swap --add-new-methods --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -v "$V" --manifest-dir receipts/phase3 --swap --add-new-methods --register --confirm
(cd ../akita-sdk && npm run build)
```

#### G2. Every other live plugin

- **What:** Rotate StakingPlugin (after D1), RewardsPlugin (after D2; pins legacyRewards), GatePlugin (after C4), AkitaDAOPlugin (after B2), NFDPlugin (MISC-1 price caps), HaystackRouterPlugin (MISC-2), and the seven whose only source change is the C1 and C2 fix: OptInPlugin, PayPlugin, PaySiloPlugin, PaySiloFactoryPlugin, SelfOptInPlugin, AsaManagerPlugin and DualStakePlugin.
- **Why here:** Each fixes a live issue or calls a method only the new service has. The rule (Kyle, 2026-11-11, closing audit R9) is to rotate every plugin whose code changed at all; the apps prompt each wallet to move to the new version.
- **Requires:** D1, D2, C4, B2. **Script:** ready. Five plugins deploy through the receipt-keeping catalog (`deploy:immutable` aliases). The other eight have their own older scripts, which keep no receipt and record the new id themselves (G11): if one is interrupted after it created the app, record the id it printed by hand instead of running it again.
- **Tracked by rollout:status as** `plugin:stakingPlugin` (one step per plugin, `plugin:<key>`).
- RewardsPlugin: create it with `legacyRewards` = v1 (3569556095). It adds `claimLegacyRewards` and `reclaimLegacyRewards` (DEC-1). When its DAO and backend grants on the `stickers` escrow move to the new plugin, add `reclaimRewards`, `claimLegacyRewards` and `reclaimLegacyRewards` to their method lists; method-restricted grants do not pick up new methods on their own.
- RewardsPlugin grants on the `stickers`, `rec_mod` and `rec_gov` escrows must list the new 8-arg `createDisbursement(uint64,bool,string,uint64,uint64,string,uint64,address)uint64` (0x2946dd1d), which passes `reclaimTo` (2026-10-11). The 7-arg selector (0x3aae182b) records no reclaim target. `RewardsPluginSDK.createDisbursement()` with no args, and the plugin migration of the old 0x08c25eff grant, list both.
- OptIn, Pay, PaySilo, PaySiloFactory, SelfOptIn, AsaManager and DualStake were compiler-only changes when this runbook was first written. The audit fix for C1 and C2 (2026-11-09) changed their behavior: each now refuses a wallet whose spending account it does not control. The live versions keep C2 (what is exposed is the plugin account's spare ALGO and a reclaim nuisance) until each wallet has moved.
- OptInPlugin is also `pal.optin`, which 67 wallets granted (count read 2026-10-10). Deploy and record the new version so the apps prompt for it, and repoint `pal.optin` only after those wallets have moved; read the count again first.
- A rotation is a new app id. `--register` appends it to the plugin's history in `networks.ts` (`MAINNET_PLUGIN_DEPLOYMENTS`), which is what the apps read to offer the update. The old app stays on chain and keeps working for wallets that have not moved.

All 23 live plugins and the step that rotates each. Every one differs from this build (MainNet programs read 2026-11-11, compared with the compiled approval program of each artifact):

| Plugin (SDK key) | Live app | Rotated in |
|---|---|---|
| `updatePlugin` | 3569559689 | B1 |
| `pollPlugin` | 3569561749 | E6 (before the PollFactory upgrade) |
| `hyperSwapPlugin` | 3569561068 | E6 (right after the HyperSwap upgrade) |
| `socialPlugin` | 3643581007 | G1 |
| `subscriptionsPlugin` | 3569561107 | G1 |
| `stakingPoolPlugin` | 3642438287 | G1 |
| `auctionPlugin` | 3569561141 | G1 |
| `rafflePlugin` | 3569561863 | G1 |
| `marketplacePlugin` | 3569561455 | G1 |
| `stakingPlugin` | 3642392585 | G2 |
| `rewardsPlugin` | 3569561963 | G2 |
| `gatePlugin` | 3569561367 | G2 |
| `daoPlugin` | 3569561215 | G2 (in the B2 window, see B2) |
| `nfdPlugin` | 3572944055 | G2 |
| `haystackRouterPlugin` | 3579545659 | G2 |
| `optinPlugin` | 3569560490 | G2 |
| `payPlugin` | 3569560828 | G2 |
| `paySiloPlugin` | 3569561570 | G2 |
| `paySiloFactoryPlugin` | 3569561636 | G2 |
| `selfOptinPlugin` | 3644027143 | G2 |
| `asaManagerPlugin` | 3605315701 | G2 |
| `dualStakePlugin` | 3569561317 | G2 |
| `revenueManagerPlugin` | 3642325118 | G3 |

One command per plugin, then one grant swap for all of them:

- `deploy:pay-silo-plugin` creates the registered instance with the recipient the live one has (read 2026-11-16: the DAO creator's address on both networks). The Labs instance is a separate deploy in H6.
- `deploy:rewards-plugin` pins `legacyRewards` to Rewards v1 on MainNet by default; elsewhere pass `--legacy-rewards <id>`.
- `deploy:nfd-plugin` takes no version and has no dry run. `deploy:haystack-router-plugin` has MainNet defaults only (there is no TestNet twin).
- `deploy:dual-stake-plugin` needs the DualStake registry app id. The live plugin was created with registry 0 on both networks (read 2026-11-16), so it has never been able to act. Deploy the new one once the registry id is known; until then leave it out and name `plugin:dualStakePlugin` in `--allow-pending` at I1.
- `update:dao-wallet-plugins` plans first and prints every grant it will replace, with its methods. `--add-method` adds the three new RewardsPlugin methods to its method-restricted grants (today one, on `stickers`).

```bash
npm run deploy:gate-plugin -- -n mainnet -v "$V" --manifest receipts/gate-plugin.json --register
npm run deploy:pay-plugin -- -n mainnet -v "$V" --manifest receipts/pay-plugin.json --register
npm run deploy:pay-silo-plugin -- -n mainnet -v "$V" --config '{"recipient":"<recipient of the live PaySiloPlugin>"}' --manifest receipts/pay-silo-plugin.json --register
npm run deploy:pay-silo-factory-plugin -- -n mainnet -v "$V" --manifest receipts/pay-silo-factory-plugin.json --register
npm run deploy:staking-plugin -- -n mainnet -v "$V"
npm run deploy:rewards-plugin -- -n mainnet -v "$V"
npm run deploy:optin-plugin -- -n mainnet
npm run deploy:self-optin-plugin -- -n mainnet
npm run deploy:asa-manager-plugin -- -n mainnet
npm run deploy:haystack-router-plugin -- -n mainnet -v "$V"
npm run deploy:nfd-plugin -- -n mainnet
npm run deploy:dual-stake-plugin -- -n mainnet -v "$V" --registry <DualStake registry app id>
(cd ../akita-sdk && npm run build)
npm run update:dao-wallet-plugins -- -n mainnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --dry-run --sender "$CREATOR"
npm run update:dao-wallet-plugins -- -n mainnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --confirm-update
```

#### G2a. Set the heartbeat manager

- **What:** The D1 follow-up: the DAO wallet sets Staking's heartbeat manager through a narrow StakingPlugin grant.
- **Why here:** It needs the upgraded Staking (D1) and the tree StakingPlugin (G2).
- **Requires:** D1, G2. **Script:** ready (see D1).
- **Tracked by rollout:status as** `heartbeat`.

```bash
npm run staking:set-heartbeat-manager -- -n mainnet --manager <heartbeat manager address> --dry-run
npm run staking:set-heartbeat-manager -- -n mainnet --manager <heartbeat manager address>
```

#### G3. RevenueManagerPlugin

- **What:** One proposal: repoint pal.revenueManager, swap all 11 DAO wallet grants (optIn kept at method index 0), migrate the plugin's escrow/split/asset state.
- **Why here:** Every fee generator rekeys a DAO escrow to pal.revenueManager with method offset 0; a split move breaks fee collection everywhere. The live version lacks the P-1 fix.
- **Requires:** B2. **Script:** ready.
- **Tracked by rollout:status as** `plugin:revenueManagerPlugin`.
- **Then enable the split keeper** (akita-backend `server/revenue_split.go`). Before G3 the escrow grants stop at processEscrowAllocation, so the keeper refuses every escrow; a read-only dry run on 2026-10-12 found all 9 blocked on the missing finalize grant. After G3, make sure pal.revenueManager is listed in `RevenueManagerPluginAppIDs` (`server/contract_networks.go`), confirm a dry run logs `would_start`, then set `REVENUE_SPLIT_ENABLED=true`. It runs at 23:30, 23:40 and 23:50 UTC, before the 00:10 revenue distribution.

```bash
npm run deploy:revenue-manager-plugin -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run deploy:revenue-manager-plugin -- -n mainnet -v "$V"
(cd ../akita-sdk && npm run build)
```

#### G3a. Register the unsplit revenue escrows with the RevenueManager

- **What:** Register each revenue escrow the RevenueManager does not know yet as a receive escrow whose splits reference the DAO's `revenue_splits` (`newReceiveEscrowWithRef`, through the RevenueManager's execution-key grant, one DAO proposal each). Then give each escrow the same global grant as the other 9 (optIn, start, process, finalize, with optIn at method offset 0).
  - `rev_nfd`: holds 553.40 ALGO of NFD sale proceeds (read 2026-10-11). Register right after G3, so the split keeper splits it.
  - `rev_guilds`: created in H2 (renamed from `guild_revenue`, Kyle 2026-10-12). Register right after H2.
  - The Akita Dexchange revenue escrow `rev_dexchange` (named 2026-10-12) is parked with the Plugin DEX. Do not create it in this rollout.
- **Why here:** An escrow that is not registered is never split, so its fees never reach the buckets. The keeper only cycles registered escrows.
- **Requires:** G3 (the new RevenueManager and its grants). **Script:** new 2026-11-16: `register:revenue-escrow` (`scripts/register-revenue-escrow.ts`). One proposal registers the escrow and adds the grant; it reads both back, and a rerun does only what is missing. It refuses a source that differs from a recorded one.
- **Tracked by rollout:status as** `revenue-escrows`: done when every `rev_*` escrow of the DAO wallet is registered and has the grant. `initialize` waits for it.
- `--source` is the account allowed to opt the escrow in to an asset. For the nine registered escrows it is the address of the app that fills the escrow (read 2026-11-16), so use the Meta app's address for `rev_meta` and the GuildFactory's for `rev_guilds`. Nothing fills `rev_nfd` from an app; its only caller today is the operator account that holds its NFD and RevenueManager grants.

```bash
npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source <rev_nfd source address> --dry-run
npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source <rev_nfd source address> --confirm
```

#### G4. SDK release with the network switches on

- **What:** Set REGISTRY_WRITES_STOPPED.mainnet and SOCIAL_HINTED_TARGETS.mainnet to true, record every new id, publish the SDK.
- **Why here:** K4 asks for the social flip right after Phase 2; registry writes stop once every consumer resolves principals by hint.
- **Requires:** E1, G1. **Script:** manual.
- **Tracked by rollout:status as** `sdk-flags`.
- Inventory off-chain registry readers first.
- By hand: in `projects/akita-sdk/src/networks.ts` set `REGISTRY_WRITES_STOPPED.mainnet` and `SOCIAL_HINTED_TARGETS.mainnet` to `true`, then rebuild. Publishing the package comes with I2, after the tag.

```bash
(cd ../akita-sdk && npm run build)
npm run rollout:status -- --network mainnet
```

### Stage H: New products

Independent of each other; each after its prerequisites.

#### H1. Meta (+ MetaPlugin)

- **What:** Deploy Meta and MetaPlugin with receipts. Leave aal.metaMerkles alone until the roots are migrated (DEC-3).
- **Why here:** MetaMerkles has no update route; repointing early drops every stored root.
- **Requires:** B2. **Script:** ready: deploy:meta writes a resumable receipt and `--register` records the `meta` SDK key (G6 closed); deploy:meta-plugin records `metaPlugin`. Neither touches aal.metaMerkles. update:meta requires --meta-app-id and refuses MetaMerkles (ROLLOUT-6).
- **Revenue escrow (audit C7):** Meta keeps each type fee, less the storage it pays for, as owed to the DAO. `collectTypeFees()` sends what is owed to the DAO escrow Meta is pointed at; anyone can call it, and it fails with errEscrowDoesNotExist until the escrow is set. After the deploy:
  1. Create the escrow `rev_meta` on the DAO wallet.
  2. One DAO proposal: the Update plugin's `updateAkitaDaoEscrowForApp(meta, { name: rev_meta, app: <escrow app id> })`. Script since 2026-11-16: `update:app-dao-escrow` (gap G14 closed). It reads the app's escrow back and clears the bootstrap key it used.
  3. Register `rev_meta` with the RevenueManager like the other unsplit escrows (G3a).
- Until step 2, type fees wait in the Meta app. Nothing is lost, and nothing else in Meta depends on the escrow.
- **Tracked by rollout:status as** `meta`, `meta-plugin`, `meta-escrow`.

```bash
npm run deploy:meta -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run deploy:meta -- -n mainnet -v "$V" --manifest receipts/meta.json --register
(cd ../akita-sdk && npm run build)
npm run deploy:meta-plugin -- -n mainnet -v "$V" --config '{"registry":"<Meta app id>"}' --manifest receipts/meta-plugin.json --register
npm run create:dao-escrow -- -n mainnet --escrow rev_meta --execute
npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --dry-run
npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --confirm
npm run register:revenue-escrow -- -n mainnet --escrow rev_meta --source <Meta app address> --dry-run
npm run register:revenue-escrow -- -n mainnet --escrow rev_meta --source <Meta app address> --confirm
(cd ../akita-sdk && npm run build)
```

#### H2. Guilds

- **What:** Create the DAO guild-fee escrow, deploy GuildConsensusFactory, register the three consensus programs, deploy GuildFactory, upload the Guild kernel, then a creation-only GuildPlugin.
- **Why here:** Guild calls the 11-argument newAccount (K2) and the factory needs guild_fees. Consensus names are first-come and permissionless; verify each before publishing ids.
- **Requires:** E7, B3. **Script:** ready (G7 closed): deploy:guild-factory refuses before any write unless aal.wallet routes the 11-argument newAccount and the DAO has guild_fees. It keeps a resumable receipt (a rerun skips created apps and uploaded programs), reads every consensus name back and refuses a name holding another program, then `--register` records `guildConsensusFactory` and `guildFactory`. deploy:guild-plugin `--register` records `guildPlugin` only for the creation-only plugin (guild = 0).
- A refused consensus name cannot be fixed on that factory: abandon its receipt and deploy a new one.
- GUILD_DEPLOYMENT.md §'Existing wallet and DAO migration' describes a removed dynamic-page factory; ignore that part.

- **Tracked by rollout:status as** `guild-consensus`, `guild-factory`, `guild-plugin`.

```bash
npm run create:dao-escrow -- -n mainnet --escrow rev_guilds --execute
npm run deploy:guild-factory -- -n mainnet -v "$V" --revenue-escrow-app <rev_guilds escrow app id> --revenue-escrow-name rev_guilds --dry-run --sender "$CREATOR"
npm run deploy:guild-factory -- -n mainnet -v "$V" --revenue-escrow-app <rev_guilds escrow app id> --revenue-escrow-name rev_guilds --manifest receipts/guild-factory.json --register --confirm-mainnet
(cd ../akita-sdk && npm run build)
npm run deploy:guild-plugin -- -n mainnet -v "$V" --config '{"factory":"<GuildFactory app id>","guild":"0"}' --manifest receipts/guild-plugin.json --register
npm run register:revenue-escrow -- -n mainnet --escrow rev_guilds --source <GuildFactory app address> --dry-run
npm run register:revenue-escrow -- -n mainnet --escrow rev_guilds --source <GuildFactory app address> --confirm
(cd ../akita-sdk && npm run build)
```

#### H3. WelcomePlugin

- **What:** Deploy WelcomePlugin (Phase 3 catalog).
- **Why here:** It calls the 11-argument newAccount; before E7 every wallet it creates reverts.
- **Requires:** E7. **Script:** ready. G1 deploys and records it with the other Phase 3 plugins, so there is nothing to run here. Deployed alone it would be `--plugin WelcomePlugin` on the G1 command.
- **Tracked by rollout:status as** `welcome-plugin`.

#### H4. PluginDex v2 stack (parked)

**Parked 2026-11-11 (Kyle).** The Plugin DEX is not part of this rollout and not in this tree. The step, its scripts (`deploy:plugin-dex`, `activate:plugin-dex`, `accept:plugin-dex-admin`), the admin handover notes and the open questions that belong to it (DEC-2, the independent audit, pausing by proposal or through a guardian grant, the LaunchManager policy) are on branch `feat/plugin-dex-v2`. The step number is kept so the other steps keep theirs.

#### H5. Wallet balance reader

- **What:** Deploy the balance reader with a receipt and record its id. (This step used to name an AssetInboxPlugin too. No such contract or script exists in this tree; the asset inbox is the ARC-59 router 2449590623, which is live and not ours to deploy.)
- **Why here:** No dependencies.
- **Requires:** none. **Script:** ready.
- **Tracked by rollout:status as** `balance-reader`.
- The balance reader is 283 bytes since 2026-11-16 (audit C27): an address that holds nothing reads as zero instead of failing the call. It cannot be patched after the deploy.

```bash
npm run deploy:wallet-balance-reader -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run deploy:wallet-balance-reader -- -n mainnet -v "$V" --manifest receipts/wallet-balance-reader.json --register
(cd ../akita-sdk && npm run build)
```

#### H6. Labs revenue pay silo (`rec_krby`)

- **What:** Deploy a PaySiloPlugin pinned to the Akita Labs LLC address, then install it on the DAO wallet scoped to the `rec_krby` escrow with only the `pay` method.
- **Why here:** `rec_krby` is a DAO-wallet escrow that receives the 40% Labs bucket. The pay silo's recipient is fixed at creation, so the grant can be callable by anyone (or by a backend keeper): every payment can only reach Labs.
- **Requires:** B2 (AddPlugin on the upgraded DAO). **Script:** deploy ready (`deploy:pay-silo-plugin`); the grant since 2026-11-16: `install:pay-silo-grant` (`scripts/install-pay-silo-grant.ts`). It refuses unless the app runs the tree PaySiloPlugin and pays the address restated with `--recipient`, installs the grant with `pay` only, and reads it back.
- **Tracked by rollout:status as** `labs-pay-silo`.
- This instance is deployed without `--register`: the registered `paySiloPlugin` is the one from G2. If Akita Labs LLC should receive at the address the G2 instance pays, skip the deploy and pass that instance's id to `--plugin`.
- `rec_krby` is a locked escrow. A lock stops opt-ins and allowance changes, not a grant or a payment.

```bash
npm run deploy:pay-silo-plugin -- -n mainnet -v "$V" --config '{"recipient":"<Akita Labs LLC address>"}' --manifest receipts/pay-silo-labs.json
npm run install:pay-silo-grant -- -n mainnet --plugin <Labs PaySiloPlugin app id> --escrow rec_krby --recipient <Akita Labs LLC address> --dry-run
npm run install:pay-silo-grant -- -n mainnet --plugin <Labs PaySiloPlugin app id> --escrow rec_krby --recipient <Akita Labs LLC address> --confirm
```

#### H7. SocialClaim (held)

- **What:** Deploy SocialClaim, the admin of send-to-anyone wallets until a platform identity claims them. Constructor: the WelcomePlugin app id, the PayPlugin app id, the attestor public key (32 bytes) and the manager address.
- **Why here:** It creates wallets through WelcomePlugin, so it needs E7 and H3. It is immutable: the two plugin ids are fixed at create.
- **Requires:** H3. **Script:** ready since 2026-11-10: SocialClaim is in the immutable catalog, `--register` records the `socialClaim` SDK key and fills its README row (audit R7). Test: `tests/release-deployments.test.ts`.
- **Referrer (audit C5, decided 2026-11-11):** the sender who pays to create a recipient's wallet is that wallet's referrer, and stays so after later gifts from other senders and after the claim. That is the incentive to send first. Nothing in the program changed. Test: `social-claim.e2e.spec.ts`.
- **Held until one thing is decided:** who holds the attestor key and who the manager is. The attestor can bind any handle to any wallet, and the manager can replace the attestor. The manager should not be a hot key.
- **Payer rule (audit C23, decided 2026-11-16).** Every gift box stores the account that paid for its storage, 41,300 µALGO a box, and returns the deposit to that account when the gift is refunded, dropped or pruned. Anyone may pay and every payer pays the same. With the SDK the account that sends the group pays, so that account is refunded, not the sponsor wallet. A payer whose account is empty by then forfeits the deposit to the wallet that sent the gift. Nothing can change after the deploy.
- The deploy tooling does not verify the two plugin ids on chain. Check each against its receipt first.
- **Tracked by rollout:status as** `social-claim`. While it is held, name `social-claim` in `--allow-pending` at I1; after `initialize()` it is still a plain deploy, with no proposal.
- The constructor arguments go in a file, `social-claim.json`: `{"welcome":"<WelcomePlugin app id>","pay":"<PayPlugin app id>","attestor":[<32 numbers>],"manager":"<address>"}`. `--config` also takes the same JSON inline.

```bash
npm run deploy:immutable -- -n mainnet -v "$V" --contract SocialClaim --config social-claim.json --dry-run --sender "$CREATOR"
npm run deploy:immutable -- -n mainnet -v "$V" --contract SocialClaim --config social-claim.json --manifest receipts/social-claim.json --register
(cd ../akita-sdk && npm run build)
```

### Stage I: Launch the DAO

No script supports a voting DAO end to end, so everything above runs first.

#### I1. Rescale thresholds, review grants, clear bootstrap keys, initialize (one-way)

- **What:** Rewrite the nine proposal thresholds in base units. List and keep the pre-launch grants (they are a feature), revoke weak pal.update grants and leftover execution keys, clearBootstrapKeys. Then initialize().
- **Why here:** initialize() refuses while any bootstrap execution key is tracked. After it, ChangeAdmin works and every later change needs a vote.
- **Requires:** B2, F1, G4. **Script:** new 2026-11-16: `dao:rescale-power` and `dao:initialize`; `revoke-dao-bootstrap-grants.ts` as before.
- **Tracked by rollout:status as** `power`, `initialize`.
- Expired proposal #107 stays inert; 19 expired execution boxes hold ~420k µA.
- `dao:rescale-power` rewrites each `*_ps` global whose power is still in whole tokens (x 1e6; see B2), keeps every other setting, and reads each back. It refuses a value neither unit explains (above 1,000 and below 1,000,000). The plugin settings were rescaled by the grant swaps; the tracker's `power` step names any that were not. The Update plugin's own settings are never read (the DAO drives it through UpgradeApp only) and are left as they are.
- `dao:initialize` reads the same steps as `rollout:status` and refuses while one is not done. A step left for a vote on purpose is named with `--allow-pending <id,id>`, for example `social-claim` while H7 is held. Five steps cannot be named: `phase2a`, `dao`, `validator`, `dao-wallet` and `power`. It plans unless `--confirm-initialize` is given.

```bash
npm run rollout:status -- --network mainnet
npm run dao:rescale-power -- -n mainnet --dry-run
npm run dao:rescale-power -- -n mainnet --confirm-rescale
npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --confirm-revoke
npm run dao:initialize -- -n mainnet --dry-run
npm run dao:initialize -- -n mainnet --confirm-initialize
```

#### I2. Push and tag the release

- **What:** Once the contracts are deployed and updated: check that `networks.ts` and the README carry every new app id (`--register` wrote them as each step ran), rebuild the SDK, commit, push `release/mainnet-rollout`, and tag the release.
- **Why here:** DEC-5: the push comes after the deployment so it carries the SDK that points at the new apps and ABI methods. The apps are rebuilt against that SDK.
- **Requires:** stages B to H as far as they are run. **Script:** manual.
- Decide first whether `audits/` is published with the push (the repo is public).
- The contract CI workflow runs for the first time on this push. Repeat A1 on a clean checkout of the tag.
- Publish the SDK only after the tag, so the published package and the tag are the same tree.

```bash
npm run release:manifest:check
(cd ../akita-sdk && npm run build)
git push -u origin release/mainnet-rollout
git tag -s <release tag>
git push origin <release tag>
```

### Stage J: After launch

Monitoring until Phase 4.

#### J1. Monitor and plan Phase 4

- **What:** Watch AkitaSocial free balance (K4), Marketplace float (K8) and legacy-selector traffic. Delete the legacy shims (Phase 4) after 30 days without legacy traffic and at least 60 days after Phase 3.
- **Why here:** The shims keep old plugins and SDKs working during the transition; each is a small standing cost.
- **Requires:** I1. **Script:** gap: K4/K8 monitors are manual (G13).

**Operational: sweep expired referrals.** From E1 on, every referral cut is an instant disbursement that expires after 30 days with the paying service's DAO escrow as its reclaim target. Nothing sweeps it automatically. Run a keeper or backend job, for example daily:

1. List sweepable disbursements with `RewardsSDK.getSweepableDisbursementIds()` (reclaim target set and expiration passed).
2. For each, call `RewardsSDK.sweepExpired({ id })`. Any funded account can send it; it pays one inner-transaction fee per ASA allocation plus one.
3. If a sweep reverts with errRcoi, opt that DAO escrow into the asset, then sweep again.

Also sweep a disbursement whose referrer already claimed: the sweep closes it and returns its MBR (79,800 µA per ALGO referral) to the escrow.

## Script changes made 2026-10-10

- `scripts/script-base.ts` (fixed): runUpdate binds every Update-plugin group to the proposal it will get when the DAO lacks isUpgradeLease (gap G2). A resume rebuilds in the DAO's current binding first, then the other, so proposals made before Phase 2a or before the DAO upgrade still resume (ROLLOUT-4).
- `scripts/utils.ts` (fixed): proposeAndExecute refuses to execute a proposal whose id differs from the one the groups were bound to.
- `scripts/lib/principal-rollout.ts` (fixed): The six Phase 2 targets with hinted gated paths declare Gate v2 at aal.gate as a dependency (ROLLOUT-7, spec §9.5 step 5).
- `scripts/deploy-rewards-v2.ts` (fixed): Funded through algorand.send.payment instead of a fundAppAccount the typed client lacks (it crashed after creating the app).
- `scripts/update-meta.ts` (fixed): Requires --meta-app-id and refuses the immutable MetaMerkles id (ROLLOUT-6).
- `scripts/deploy-gates.ts` (fixed): Type error on the constructor config.
- `scripts/seal-gate-imports.ts` (new): Seals Gate v2 imports only after every expected sub-gate is allowlisted; idempotent; verifies on chain (gap G5).
- `scripts/rollout-status.ts` (new): Read-only tracker: checks every step against live chain state and prints done / ready / blocked (npm run rollout:status).
- `package.json` (fixed): Added rollout:status and seal:gate-imports; removed install:dao-haystack-claim-plugin (pointed at a missing file).
- `scripts/deploy-guild-factory.ts`, `scripts/deploy-meta.ts` (fixed): resumable receipts through `scripts/lib/deployment-receipt.ts`; Guild pre-flight guards and consensus read-back in `scripts/lib/guild-deployment.ts` (G6, G7).
- `akita-sdk/src/networks.ts`, `README.md`, `scripts/lib/immutable-catalog.json`, `scripts/lib/immutable-deployment.ts` (fixed): optional SDK keys for the release contracts; deploy:immutable `--register` records them, keeps Rewards v1 as `rewardsV1`, and records GuildPlugin only for guild = 0 (G8). Tests: `tests/release-deployments.test.ts`, `tests/release-deployments.e2e.spec.ts`.
- `tests` (fixed): rollout.test, update-execution-lease and update-resume assert the new behavior; a vitest globalSetup funds the LocalNet zero address.

## Script changes made 2026-10-11

- `scripts/lib/principal-rollout.ts` (fixed): every Phase 2 target that pays referrals (AkitaSocial, Subscriptions, Marketplace, StakingPoolFactory, AuctionFactory, RaffleFactory, AbstractedAccountFactory) declares Rewards v2 at aal.rewards as a dependency, so the runner refuses to push it before D2. Test: rollout.test "every Phase 2 target that pays referrals waits for Rewards v2".

## Script changes made 2026-11-16

Every command of the Sequence was checked against the script it runs. What would have failed, and what changed:

- `docs/rollout/MAINNET-ROLLOUT.md` (fixed): every command block is now complete and exact. Faults removed: G1 passed `--add-method`, which the Phase 3 script does not read (the flag is `--add-new-methods`), so setMetaWallet would not have been added; C4 lacked `--legacy-cutoff` and stopped before doing anything; C4 registered only the Gate, so the SDK would never have learned the ten new sub-gates; H5 ran `deploy:asset-inbox-plugin`, which does not exist; G2's single generic command fits five plugins of thirteen; the grant swap lacked `--confirm-update` and would only have planned; D1 and G3 carried version labels below or equal to the live ones; several steps were abbreviated with "…".
- `tests/rollout-runbook.test.ts` (new): reads the Sequence and fails on a command that names a missing npm script or file, a flag its script does not read, an unknown contract, target or plugin, or a tracker step that does not exist.
- `scripts/deploy-immutable.ts` (fixed): `--config` takes inline JSON as well as a file. Inline JSON, which H1, H2 and H6 use, was read as a file name and failed.
- `scripts/allowlist-sub-gates.ts`, `scripts/seal-gate-imports.ts`, `scripts/lib/ctx-sub-gates.ts` (fixed): Gate v2's id comes from its receipt in `--manifest-dir`. The default was the SDK's gate, which is Gate v1 until C4.
- `scripts/opt-in-rewards-assets.ts`, `scripts/lib/rewards-opt-ins.ts` (new, `rewards:opt-in`): D2's opt-ins. `deploy:rewards --register` now refuses the cutover while the new app lacks an asset the old one holds (`--allow-missing-opt-ins` overrides it for retired assets).
- `scripts/rescale-proposal-power.ts`, `scripts/lib/proposal-power.ts`, `scripts/lib/power-units.ts` (new, `dao:rescale-power`): I1's threshold rescale. `scripts/lib/dao-wallet-plugin-migration.ts` and `scripts/deploy-revenue-manager-plugin.ts` (fixed) rescale a plugin's threshold as a grant swap copies it, once the DAO is upgraded.
- `scripts/initialize-dao.ts`, `scripts/lib/dao-launch.ts` (new, `dao:initialize`): I1's launch, refused while a tracked step is unfinished and not named.
- `scripts/update-app-dao-escrow.ts`, `scripts/register-revenue-escrow.ts`, `scripts/install-pay-silo-grant.ts`, `scripts/lib/dao-escrow-steps.ts` (new): H1 step 2 (gap G14), G3a and H6's grant.
- `scripts/rollout-status.ts`, `scripts/lib/rollout-steps.ts` (changed): the steps moved to a library that `dao:initialize` also reads. New steps: `rewards-opt-ins`, `revenue-escrows`, `meta`, `meta-plugin`, `meta-escrow`, `guild-consensus`, `guild-factory`, `guild-plugin`, `welcome-plugin`, `balance-reader`, `social-claim`, `labs-pay-silo`, `power`, and the seven plugins of G2 that were not tracked. Prerequisites now follow the runbook order. It prints the DAO creator.
- Tests: `tests/rollout-steps.e2e.spec.ts` runs the rescale, the grant-swap rescale, the launch check and the three escrow steps on LocalNet, ending with a real payment through the pay silo; `tests/migration-scripts.e2e.spec.ts` runs the refused cutover, the opt-ins and the resumed cutover; `tests/ctx-sub-gates.test.ts` and `tests/migration-dry-run.test.ts` cover the receipt lookup and inline `--config`.

Read from MainNet and TestNet on 2026-11-16, read-only: the DAO is in Draft with no tracked bootstrap key; nine `*_ps` globals hold 600, 300 or 200; five plugin settings boxes hold 600 or 300, each with a live DAO wallet grant; `rev_nfd` is the only `rev_*` escrow the RevenueManager does not know; `rec_krby` exists; the DualStake plugin's registry is 0.

Every `--dry-run` and `rollout:status` line of the Sequence was then run against MainNet and against TestNet, read-only and with no key, simulating as the DAO creator. On both networks each line either printed its plan or stopped with a refusal that names the step it waits for: C2 and C3 (Gate v2 has no receipt before C1), `rewards:opt-in` (no receipt before D2's deploy), G2a (Staking is not updated before D1), G3a, H1, H2 and H6's escrow steps (the DAO is not upgraded before B2), `update:app-dao-escrow` (Meta is not recorded before H1's deploy), `deploy:guild-factory` (the wallet factory is not updated before E7) and `dao:initialize` (it lists every unfinished step). The E-stage dry runs print the dependencies they wait for (Gate v2, Rewards v2, Staking) and plan nothing.

## Open script gaps

- **G3.** No script drives a voting DAO end to end (no finalizeProposal). Moot if every stage finishes before initialize().
- **G4.** Parked with the Plugin DEX (it was closed there by `activate:plugin-dex`).
- **G6.** Closed: deploy:meta writes a resumable receipt and records `meta` on `--register`.
- **G7.** Closed: deploy:guild-factory has a resumable receipt, the K2 and guild_fees pre-flight refusals, and a read-back of every consensus name before the ids are recorded.
- **G8.** Closed: networks.ts has 11 optional keys (25 before the Plugin DEX keys were parked; 0n until `--register` records them; LocalNet ids come from .env.localnet), including `rewardsV1`. The new plugins are plain app keys, not plugin-history entries, so getPluginUpdate does not track them until a second version ships.
- **G9.** Phase 3 --add-new-methods covers only socialPlugin:setMetaWallet; restricted raffle/auction grants would need `update:dao-wallet-plugins --add-method`. The DAO wallet holds none today, so this does not affect the rollout.
- **G11.** Eight plugin deploy scripts (staking, rewards, optin, self-optin, asa-manager, dual-stake, haystack-router, nfd) keep no receipt, so they cannot resume. See G2.
- **G13.** K4/K8 balance monitors and the SDK flag flips are manual.
- **HB.** Closed: `staking:set-heartbeat-manager` (see D1).
- **G14.** Closed 2026-11-16: `update:app-dao-escrow` sends `updateAkitaDaoEscrowForApp` for any fee generator (H1).
- **G17.** No dry run can show a step whose prerequisite is not on chain yet, so the Sequence as a whole is proven only by running it. That is the TestNet rehearsal (A4).
- **G15.** Parked with the Plugin DEX: PluginDexAdminPlugin and `accept:plugin-dex-admin` are on branch `feat/plugin-dex-v2`, built and tested but not reviewed.
- **G16.** `npm run check-types` reports 12 errors, all in test files; CI does not gate on it yet. The contract CI workflow was rewritten on 2026-11-10 and has not run on GitHub yet, because nothing has been pushed (it first runs in I2).

