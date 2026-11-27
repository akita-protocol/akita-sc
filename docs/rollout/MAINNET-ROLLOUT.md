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

The Guild fee asset is in the tree: a Guild may charge its proposal fees in an asset instead of ALGO. The second audit pass covered it on 2026-11-14 (C18 to C21); the decisions of 2026-11-15 are in the audit's decision record (kept outside this repository since 2026-11-17).

- **Five programs differ from the release commit.** Guild (10,349 to 12,136 bytes), GuildPlugin (3,993 to 5,238 bytes, 2 extra pages instead of 1) and the three consensus programs, each 12 bytes smaller because fee settings lost their ceiling (C18): FixedSignerGuildConsensus 4,886 (5,424 since the direct plugin use of 2026-11-16), LockedTokenGuildConsensus 3,282, SubscriptionGuildConsensus 4,687. `release/manifest.json` is regenerated; the other 150 programs are unchanged.
- **H2 keeps its order and commands.** No Guild app is live on TestNet or MainNet (the SDK's Guild app ids are 0 on both), so nothing is migrated, and the scripts size each upload from the program itself.
- **ABI.** Guild gained `setFeeAsset`, `newProposalWithFeeAsset`, `editProposalWithFeeAsset`, `sweepFeeTokens`, `feeAssetCost`, `sweepableFeeTokens` and action 85 (set fee asset); `proposalCost` also returns `feeAsset`. GuildPlugin gained `setFeeAsset`, `newProposalWithFeeAsset` and `editProposalWithFeeAsset`. Build clients against the new SDK.
- **Storage.** A proposal box costs 6,400 µALGO more (base 51,300, was 44,900). Charging in an asset costs 209,300 µALGO once: two opt-ins and a 9,300 reserve box (109,300 while the Guild has no wallet).
- **Fee settings have no ceiling** (was 1,000,000). They are counted in base units of the asset charged and are not converted when the asset changes.

## Update 2026-11-15: anyone may pay storage and fees

A grouped payment that covers storage or a fee no longer has to come from the caller, and a storage deposit goes back to whoever paid it. The rules, costs and exceptions are in the audit's decision record (kept outside this repository since 2026-11-17) ("Third pass").

- **25 more programs differ from the release commit** (28 in all, with the three consensus programs above; 23 and 26 before the empty-account fix C27 of 2026-11-16 added AssetGate and the balance reader). Deployable: AkitaDAO 10,765 B (was 10,421), Guild 12,534 (12,436 before the two install rule changes of 2026-11-15 and 2026-11-16), GuildFactory 2,012, GuildConsensusFactory 1,399, GuildPlugin 5,247 (5,564 since the direct plugin use of 2026-11-16), SocialClaim 2,697 (2,765 before each gift stored its payer, C23 and C26 of 2026-11-16), Auction 8,522, Raffle 8,158, EscrowFactory 1,416, HyperSwap 3,986 (3,936 before the closed payer fix C22 of the fourth pass), Meta 4,436, Poll 2,349, PollFactory 4,339 (4,159 before the poll author fix C24 of 2026-11-16), Rewards 5,243, AkitaSocial 11,499, AkitaSocialGraph 2,609, AkitaSocialImpact 3,160, StakingPool 13,272, Staking 7,302 (7,306 before C27), Subscriptions 10,468 (10,801 since the featured service of 2026-11-16), AssetGate 712 (710 before C27) and AbstractedAccountBalanceReader 283 (284 before C27). Test-only: MockHyperSwap, MockLegacyVoteDAO and MockSharedHelpers. `release/manifest.json` is regenerated.
- **Pages.** Subscriptions needs 5 extra pages, one more than planned: E2 grows it from 3 to 5 and the DAO wallet sponsors 3,528,000 µA for it (was 3,428,000). Phase 2 sponsorship is 7,056,000 µA (AkitaSocial 3,528,000 and Subscriptions 3,528,000), and 10.65 ALGO with the DAO's own growth. Guild needs 6 extra pages; GuildFactory creates every Guild with 7. PollFactory needs 2 and the live app has 3. No other live app crosses a page.
- **Upload groups.** PollFactory's update takes one more upload transaction (three chunks, was two). Every other group keeps its size, StakingPoolFactory at exactly 16.
- **Staking and pools.** Staking gains `reclaimAppStake(address,uint64)void` and keeps every method it had. The new StakingPool child calls it instead of `releaseAppStake`, so D1 (Staking) still comes before E5 (StakingPoolFactory), and the runner refuses E5 until the Staking at aal.staking routes the new method.
- **ABI.** No method changed its signature. Calls that used to fail because the payment came from someone else now succeed when that payment also carries 28,500 µALGO for the payer record (`PAYER_RECORD_MBR` in the SDK), which comes back with the deposit. Guild proposals name their payer in the proposal itself and take no extra payment.
- **Storage.** A Guild proposal box costs 25,600 µALGO more (base 76,900, was 51,300): it holds who paid the ALGO and who paid the fee tokens.
- **Box references.** Every call that returns a deposit also looks for a payer record, so it needs one more box reference per record, sponsored or not. The SDK finds references by simulation. A hand-built group must add them, and a batch refund (`Poll.deleteBoxes`, `AkitaDAO.deleteProposalVotes`, `Raffle.refundMBR`, `Auction.refundMBR`, Guild vote cleanup) fits fewer records per call.
- **Clients.** The SDK methods still pay from the caller. A paymaster builds the payment itself until the SDK methods take a payer.

## Update 2026-11-16: the open points of the fourth pass are closed

Two programs changed after the fourth pass. Each closes a point that pass left open. The record is in the audit's decision record (kept outside this repository since 2026-11-17) ("Fifth pass").

- **PollFactory is 4,339 bytes (was 4,159), C24.** The caller of `new` is the poll's author: the account the poll records, and the only one that may clear its votes. Anyone may pay for the poll. A payer that is not the author adds 28,500 µALGO, is remembered by the factory under the poll's id, and gets the deposit and that amount back from `deletePoll`. Before, a sponsored poll recorded its sponsor, and only the sponsor could clear the votes. The Poll child program is unchanged (2,349 bytes), and so are `newPollCost`, every method signature and the state schema. A poll created before the upgrade has no payer record and is refunded to the account it records, as before.
- **Guild is 12,534 bytes (was 12,494), C25.** A proposal that installs a plugin with `defaultToEscrow` and no escrow name is refused when it is drafted. The wallet would refuse it at execution, so it could pass a vote and never execute.
- **Nothing in the sequence changes.** PollFactory still needs 2 extra pages (the live app has 3) and three upload chunks, so E6 runs as written. Guild still needs 6 extra pages and GuildFactory still creates every Guild with 7, so H2 runs as written.
- **Box references.** `PollFactory.deletePoll` looks for a payer record, sponsored or not, so it needs one more box reference on the factory. The SDK's `deletePoll` finds it by simulation. A hand-built call must add it.
- **Manifest.** `release/manifest.json` was regenerated from a whole-tree build. It differed from the manifest of 2026-11-15 in these two entries only. The next update changes four more.
- **SocialClaim was unchanged at this point.** Its payer rule (C23) was decided later the same day and the program changed. See the next update.
- **Live state re-read 2026-11-16** with `rollout:status` (read-only) on MainNet and on TestNet: no step of this rollout is done on either network. 12 steps are ready, 27 wait on earlier steps, and the DAO is in Draft on both. The TestNet rehearsal (A4) has not been run.

## Update 2026-11-16 (second): SocialClaim stores each gift's payer, and empty accounts read as zero

Four programs changed after the update above. The record is in the audit's decision record (kept outside this repository since 2026-11-17) ("Sixth pass").

- **SocialClaim is 2,697 bytes (was 2,765), C23 and C26.** Decided 2026-11-16: every gift box stores the account that paid its storage deposit, and the deposit always returns to that account. A gift box costs 41,300 µALGO (was 28,500). The subject entry is still 18,900 µALGO and is never returned. SocialClaim writes no payer record any more, and a payer that is not the caller pays nothing extra. `getGift` returns a third field, `payer`. When the payer's account is empty the deposit goes to the wallet that sent the gift, then to the gift wallet. C26: the check for an empty account failed the call instead of answering, so a payer that closed its account blocked the refund and the prune of its gift. Fixed. SocialClaim has never been deployed, so nothing live changes, and H7 is still held only for the keys.
- **Who gets the deposit with the SDK.** `sendToAnyone` and `topUp` pay the storage from the account that sends the group. That account gets the deposit back, not the sponsor wallet.
- **Staking is 7,302 bytes (was 7,306), C27.** It read an ALGO balance in a way that fails for an account that holds nothing. A holder of an ALGO soft stake who closed the account outright could not be checkpointed, and the stake kept the age it had built up. An empty account now reads as zero: the checkpoints, the heartbeat and `softCheck` answer for it. No method and no schema changed, and D1 runs as written.
- **AssetGate is 712 bytes (was 710), C27.** The same read. An ALGO gate failed for an empty account instead of comparing a balance of zero. The asset sub-gate cannot be patched. It was already one of the eight sub-gates DEC-4 recommends to deploy again at C1. A live asset sub-gate kept in place would not carry this fix.
- **AbstractedAccountBalanceReader is 283 bytes (was 284), C27.** The same read. It failed for an address that holds nothing instead of returning zero. It cannot be patched and is deployed new at H5.
- **Nothing in the sequence changes.** No step is added, moved or resized.
- **Manifest.** `release/manifest.json` is regenerated from a whole-tree build. It differs from the manifest of the update above in these four entries only. 28 programs differ from the release commit.

## Update 2026-11-16 (third): a deciding signer's direct plugin use, and editable highlights with a featured service

Four programs changed after the update above, for two additions the owner asked for on the evening of 2026-11-16. The record is in the audit's decision record (kept outside this repository since 2026-11-17) ("Seventh pass").

- **FixedSignerGuildConsensus is 5,424 bytes (was 4,886).** New method `usePlugin(uint64,string,uint64[],(uint64,uint64)[],byte[][][])void`. A signer whose own weight meets the threshold uses a plugin the Guild's wallet granted to the consensus app, in one send and with no proposal. The consensus app is the named caller of that grant, so the route does nothing until a Guild installs a plugin with its consensus app's address as the caller. The wallet's own checks on the grant still hold: the wallet named in each call, the rekey back, method restrictions, cooldown and escrow allowance. The Guild's vote settings, the proposal fee and the proposal record do not apply to such a use (C29, the design). ALGO the consensus app gains during a use is forwarded to the Guild app, where `sweep` sends it on to the treasury (C28). The program cannot be patched once it is registered at H2. It still needs 2 extra pages and three upload chunks.
- **GuildPlugin is 5,564 bytes (was 5,247).** New method `usePluginAsSigner`, the wallet-side entry to the route. It works from the shared plugin (guild = 0) for every Guild of the factory, like every other method of that instance (audit 05, GLD-02: the instance is not creation-only). Still 2 extra pages.
- **Limits of the route.** It carries only plugin methods that take no transaction arguments, and the SDK has no helper yet to encode the calls. A Guild with locked-token or subscription consensus has no such route: the call fails there.
- **Subscriptions is 10,801 bytes (was 10,468).** New methods `updateServiceHighlight`, `setFeaturedService`, `clearFeaturedService` and the read-only `getFeaturedService`. A creator edits a service's highlight label and colour at any time, and names one of their services as featured. The featured id is in a new box per creator (prefix `f`) that costs 18,900 µALGO once and comes back on clear to whoever paid it. A payer that is not the creator adds 28,500 µALGO for the payer record. Moving the featured service later takes a payment of 0 µALGO in the group. No existing method, box or struct changed. The four services on MainNet (app 3569556497, read 2026-11-16) decode under the unchanged layout, so their highlights can be edited as soon as E2 has run.
- **E2 keeps its pages, sponsorship and group size.** Subscriptions still needs 5 extra pages and six upload chunks, and the DAO wallet still sponsors 3,528,000 µA. 1,483 B of headroom is left (was 1,816).
- **SubscriptionsPlugin is 4,794 bytes (was 4,461).** It mirrors the three new write methods. Still 2 extra pages, deployed new at G1. The G1 readiness check reads the calls from the plugin's program, so it refuses the plugin until the Subscriptions at E2 routes the new methods.
- **For the apps.** A featured service that is shut down later stays recorded until its creator moves or clears it, so a reader checks the service's status. `highlightMessage` is not range-checked, as in `newService`.
- **Nothing in the sequence changes.** No step is added, moved or resized.
- **Manifest.** `release/manifest.json` is regenerated from a whole-tree build. It differs from the manifest of the update above in these four entries only. 29 programs differ from the release commit: SubscriptionsPlugin is the new one.

## Update 2026-11-16 (fourth): a caller may remove its own grant, and the revocation check

One deployable program changed after the update above: the wallet. The record is in the audit's decision record (kept outside this repository since 2026-11-17) ("Eighth pass").

- **AbstractedAccount is 8,160 bytes (was 8,139).** Two changes to who may remove a plugin grant, both in `arc58_removePlugin` and the check behind it.
- **A caller may remove its own grant** (asked for by the owner 2026-11-16). `arc58_removePlugin(plugin, caller, escrow)` also accepts the account named as `caller` in that grant. It is for an agent that shuts down: it frees the storage its grants hold in users' wallets, 38,900 µALGO per grant plus 8,000 per method restriction and 400 per byte of escrow name. The storage returns to the wallet, never to the caller. A grant open to anyone and an admin grant have no such caller. The removal updates `last_change` and leaves `last_user_interaction` alone. An alias, an escrow and its allowances stay until the admin removes them.
- **C30, low, fixed.** With no revocation app (id 0, the state of every wallet the live factory made) the revocation check compared the sender with the wallet's own address, because app id 0 resolves to the app that asks. A plugin can send as that address inside a main-account window, so it could remove any plugin grant, alias or allowance of that wallet. The check now compares the app that calls the wallet, where it compared the sender, and no app can call itself. The live wallet program (1.0.1, read 2026-11-16 on the DAO wallet 3569559153) has the same check. F1 and F2 replace it.
- **No method, schema or page count changed.** The wallet still needs 3 extra pages, with 28 B of headroom (was 49). E7 still uploads five chunks, and F1 and F2 run as written with no growth cost. Every live wallet has four pages, so a later wallet change has to fit in those 28 bytes, free space first, or grow the wallet to a fifth page (corrected 2026-11-20: four pages is not the protocol's limit).
- **Test-only programs.** Arc58AgentProbePlugin (291 B, was 184) gained the hostile case the new tests use, and MockBigWallet (10,579 B, was 10,558) inherits the wallet.
- **Manifest.** `release/manifest.json` is regenerated from a whole-tree build. It differs from the manifest of the update above in these three entries, and Arc58AgentRevoker is now marked test-only: 85 programs are deployable and 70 are test-only. Nothing deploys the revoker; the manifest's naming rule had missed it. 32 programs differ from the release commit, and the wallet is the new deployable one.
- **SDK.** `wallet.removePlugin` takes any sender, so a caller uses it as it is. The text for `errOarp` now names the caller.

## Update 2026-11-17: TestNet compared with MainNet, and one command for both

The owner said TestNet goes first, and asked whether the two networks have drifted. Both were read the same day, read-only: every app the SDK registry names, the DAO's settings, the DAO wallet's grants and escrows, each factory's child, and each app's account. The figures are under Live state, and what they mean for the rehearsal is in A4.

- **The programs have not drifted where the rollout touches them.** 61 of the 63 registry names that point at an Akita app on both networks point at byte-identical programs, and the five factory children match. The two that differ, `nfdPlugin` and `haystackRouterPlugin`, are replaced by G2.
- **TestNet holds almost no user state.** No user wallet, Listing, Poll or Rewards v1 disbursement exists there. As TestNet stands, the rehearsal never upgrades an app that holds records written by the old programs.
- **`deploy:rewards-plugin` and `withdraw-rewards-v1-mbr-credits.ts` read Rewards v1 from the SDK registry.** `rewardsV1` is 3569556095 on MainNet and 763128244 on TestNet, so the same command pins the right app on both. Before, TestNet needed `--legacy-rewards` and `--rewards`, and a deploy without the flag pinned nothing. MainNet's value is unchanged. `deploy:rewards-plugin` prints the app it pins, in a dry run too.
- **`deploy:haystack-router-plugin` stops on TestNet.** It holds router and treasury ids for MainNet only. On TestNet the plugin is left out and named in `--allow-pending` at I1.
- **The DAO creator has 7.63 ALGO free on MainNet** (61.10 held, 53.47 minimum balance). It pays for every new app. A5 now names it.
- **A step was missing: G2b, the Rewards v1 credit withdrawal.** The 2026-10-05 review wrote the script (STAKE-4) and asked for the step, and the runbook never carried it. 21.30 ALGO of the `stickers` escrow's credits sit on Rewards v1 on MainNet, across 125 disbursements, and the two proposals that recover them execute at once only before `initialize()`. It is now step G2b, the tracker step `rewards-v1-credits` (60 steps in all), and `npm run rewards:withdraw-v1-credits`.

## Update 2026-11-17 (second): the DAOs' setup compared, a parity step for TestNet, and values settled

The owner said the drift that matters is not in the programs. It is in how each DAO is configured and what is installed on its wallet. Both setups were read again the same day, read-only: every box of the DAO, the DAO wallet, the RevenueManager and the EscrowFactory, what each escrow holds, and what each of the DAO's proposals did (170 on MainNet, 164 on TestNet). The figures are under Live state.

- **The DAO's own configuration matches.** Every setting, fee table, proposal threshold, plugin settings box and app pointer is the same, apart from `otherAppList.akitaNfd` (TestNet has no Akita NFD app).
- **The DAO wallet's grants and escrows do not.** MainNet has nine grants TestNet lacks, TestNet has two MainNet lacks, MainNet has the account escrows `akta_creator` and `collections`, and `stickers` is unlocked only on MainNet. The 19 grants both hold have identical terms.
- **New step A4a reconciles that on TestNet** before the rehearsal, at the owner's request: `npm run rollout:testnet-parity`. One command for the rollout then covers both networks, with the differences A4 already lists.
- **What stays different on purpose:** `akitaNfd`, the Haystack router and `rev_haystack`'s source account (TestNet has neither app), the NFD plugin's program until G2, and what the escrows hold.
- **The release label is `2.0.0`** (owner, 2026-11-17).
- **DualStakePlugin is left out of the release** unless the owner chooses the fix. The registry was looked up (MainNet app 2933409454), and the look-up showed that the plugin's pool check cannot pass for any real pool. See G2.
- **The guild creation fee is 200 ALGO.** The owner's first figure was 100,000 AKTA, which the factory cannot charge: it takes the fee in ALGO, as every other creation fee is taken. The owner kept it in ALGO. See B3.
- **Three more creation fees change, in new step B3a:** a staking pool from 50 to 100 ALGO, a raffle from 10 to 50, and an auction from 10 to 50 (owner, 2026-11-17). Writing the step found an SDK fault: no proposal that changes `nft_fees` could be built. It is fixed.
- **AuctionFactory now charges the auction creation fee** (owner, 2026-11-17; C33). The factory live today never has, so auctions cost storage only until E4 upgrades it. One contract program changes for this, AuctionFactory's. See B3a and E4.
- **Manifest.** `release/manifest.json` is regenerated from a whole-tree build. It differs from the manifest before it in one entry only: AuctionFactory's approval program, 4,781 to 4,861 bytes. Its interface is unchanged: the same 18 methods with the same signatures. 33 programs differ from the release commit, and AuctionFactory is the new one.
- **Still open:** the DualStake choice. The owner gave the three addresses on 2026-11-25: the heartbeat manager (G2a), the `rev_nfd` source (G3a) and the Akita Labs LLC address (H6). Since 2026-11-21 no pay silo is deployed, so H6 is the only recipient asked for.
- **The audit records left the repository** on 2026-11-17 by the owner's decision, because the repository is public. They are kept privately. Where this runbook cites a pass of the audit, the record is there.

## Update 2026-11-18: the revenue split becomes 80/5/15, and its receivers opt in

The owner set the split of every revenue source to Labs 80%, moderators 5%, governance 15%, from 40/20/40. Both networks were read the same day, read-only.

- **One table sets it for every source.** The DAO stores one table, `revenue_splits`. All nine revenue escrows the RevenueManager cycles hold a reference to it and read it at each allocation. One UpdateFields proposal therefore changes every source, and no contract program changes. It is new step B3b.
- **No program caps a receiver's share.** The owner recalled a ceiling on the Labs share. This release's contracts hold none: the RevenueManager only requires the percentages to total 100%. The DAO program live on MainNet today creates and executes the 80/5/15 proposal in simulation as the creator, and a table that gives `rec_krby` 100% as well. An "Invalid krby percentage" error and a 40% default once sat in the SDK's type and default files, and no contract program in this repository's history read them.
- **No split has been paid on MainNet yet.** Every revenue escrow's last payout is 0. The first payout divides everything an escrow has built up, at the shares stored then, so B3b comes before the split keeper is enabled (G3).
- **The three receivers hold no asset.** `rec_krby`, `rec_mod` and `rec_gov` each hold 0.1 ALGO and nothing else. A payout skips an asset share whose receiver has not opted in to the asset, so as things stand no USDC or AKTA would reach any of them. New step G3b opts them in.
- **A lock does not stop an opt-in made through a plugin grant.** The three receivers are locked and each carries an open OptInPlugin grant. H6 said a lock stops opt-ins. It stops the wallet's own opt-in and allowance calls. H6 is corrected.
- **Neither step is tracked by `rollout:status`.** For each, the plan is the check.

## Update 2026-11-18 (second): a last pass over every contract

All 85 deployable programs were read once more at the deploy commit, each one against the contracts it calls, and both networks were read the same day, read-only. Two programs change, and one step is new.

- **StakingPoolPlugin is 2,698 bytes (was 2,597).** `addReward` now asks the pool what a reward costs. Two things were wrong, and both reproduce on LocalNet.
  - An asset reward on a pool that did not hold the asset yet always failed. The plugin read the factory's DAO escrow as a number, and the value is a name with an app id, so the call stopped there. It also worked out the pool's opt-in payment by itself, and the pool requires the exact amount it quotes. The plugin live on MainNet and TestNet has the same fault. The plugin now pays what the pool's `optInCost` returns.
  - An ALGO reward was funded short. This release's pool keeps a budget for every reward and takes the storage of its budget boxes out of the payment: 18,600 µALGO for a pool's first ALGO reward and 9,300 for each later one. The plugin paid the reward box only, so a reward of 1 ALGO a round funded with 1 ALGO held 0.9814 and could not pay its first round. A round that opens without its budget stays open, and entries, checks and removals are frozen until the pool's creator adds to the budget or aborts the round. The plugin now adds what the pool's `addRewardCost` returns, for ALGO and for asset rewards.
  - No funds were at risk in either case. Neither network has a pool: the StakingPoolFactory has created none that still exists.
- **AuctionFactory is 4,890 bytes (was 4,861).** A prize box auction with an asset as its bid asset is refused while the factory does not hold that asset, as an asset auction already is. A cancel or a delete closes the auction's bid asset to the factory, so such an auction could do neither until someone opted the factory in. AuctionPlugin v3 opts the factory in first and is not affected.
- **Neither change alters an interface or a page count.** The whole-tree build changes these two programs only, and `release/manifest.json` differs in those two entries.
- **Three live apps hold no ALGO, and no step funded them.** HyperSwap, PrizeBoxFactory and AkitaSocialModeration hold 0 on MainNet; on TestNet PollFactory does too. They charge a caller exactly the storage a call adds, so with an empty account every offer, mint and poll fails with a balance below the minimum. AkitaSocialModeration charges nothing and pays for its boxes itself, so it could not record a moderator. New step E6a sends what is short, 1.3 ALGO on MainNet and 1.4 on TestNet. Every app this rollout creates is funded by the script that creates it.
- **Still open, not a fault.** The StakingPoolPlugin has no method for the pool's other creator calls: `assignBudget`, `withdrawReward`, `closeReward`, `endPool`, `closeOutAsset`, `abortRound` and a standalone `optIn`. A wallet that created a pool through the plugin makes those calls as itself.
- **Checked and unchanged.** Every deployable program fits the 8 pages and the 64 global keys the protocol allows (AkitaDAO, AkitaSocial and Subscriptions use all 64 keys). No other program reads another app's stored value in the wrong shape.

## Update 2026-11-19: SocialClaim is left out of this release

The owner decided on 2026-11-19 that SocialClaim is not part of release 2.0.0.

- **H7 is skipped.** Nothing is deployed for it, and the SDK's `socialClaim` id stays 0 on both networks. No other step depends on it. WelcomePlugin (H3) and PayPlugin (G2; H1 since 2026-11-21) are deployed as before.
- **I1 names it.** `dao:initialize` refuses while a tracked step is not done, so its commands now carry `--allow-pending plugin:dualStakePlugin,social-claim`.
- **The program stays in the tree.** SocialClaim is still built, tested and pinned in `release/manifest.json` (155 programs), and its SDK module is unchanged. No contract program changes with this update.
- **A later deploy covers new gifts only.** `bind` records a wallet in the group that creates it, with SocialClaim as that wallet's admin. A wallet that WelcomePlugin created with another admin cannot be brought under SocialClaim afterwards.

## Update 2026-11-20: an escrow can be deleted, by a wallet's admin, the DAO or a guild

Six deployable programs change, the wallet takes a fifth program page, and the sequence gains a step. The owner asked for it on 2026-11-20.

- **Programs.** AbstractedAccount is 8,743 bytes (was 8,160) with the new method `arc58_deleteEscrow(string)void`. AbstractedAccountMBR is 308 (was 304). AkitaDAO is 10,823 (was 10,765), AkitaDAOProposalValidator 3,682 (was 3,633), AkitaDAOTypes 962 (was 924) and Guild 12,586 (was 12,534): each gains the proposal action `DeleteEscrow` (type 73).
- **What a delete does.** It closes the escrow's account out to the controlled address, has the EscrowFactory delete the escrow app, and deletes the wallet's record and count of the escrow. The wallet gets back all the ALGO the escrow held, its 0.1 ALGO minimum included, the 150,000 µALGO the factory held for the app, the 12,100 the factory held for its record, and the storage of the wallet's two boxes. An escrow the factory has no record of is put on record by the same call, which costs nothing in the end.
- **Why the wallet closes the account itself.** An escrow's account is rekeyed to its wallet, so the escrow's own app cannot spend from it and the factory's delete fails on it. Once the wallet has closed the account the rekey is gone, and the factory's delete goes through. The EscrowFactory on MainNet (3569555755) cannot be updated, and it keeps whatever an escrow still held when it closed. Closing the account first leaves it nothing to keep. This is tested against that program and against the program of the 37 escrows it has made.
- **What a delete refuses.** The wallet counts, per escrow, the plugin grants and the allowances that name it. A grant that uses the escrow by default is counted too. `arc58_deleteEscrow` fails with `errEuse` while the count is above zero, so every plugin has to be removed and every allowance too, though all of it may happen earlier in the same group. The escrow must also be unlocked and hold no asset: an account that holds an asset cannot be closed, so each asset is closed out with `arc58_reclaim` first.
- **One group.** The SDK's `wallet.deleteEscrow` reads what the chain lists for the escrow and builds the removals of its plugins and allowances, the close-out of its assets and the delete into one group, the delete last. Sixteen transactions fit a group. A longer removal is sent as several groups in order, and the delete is in the last one.
- **The DAO and a guild.** `DeleteEscrow` uses the proposal settings of `ToggleEscrowLock` and `Reclaim`. One proposal holds the `RemovePlugin`, `RemoveNamedPlugin`, `RemoveAllowances` and `Reclaim` actions and then `DeleteEscrow`; `dao.deleteEscrowActions` and the guild SDK's `deleteEscrowActions` build that list. The DAO's `proposalActionLimit` is 5 by default, so an escrow with more to remove takes more than one proposal, with `DeleteEscrow` in the last. The action calls `arc58_deleteEscrow` on the wallet, which a wallet on the deployed program does not have, so a `DeleteEscrow` proposal reverts until the DAO wallet is updated in F1. The wallet factory creates a guild's wallet, so that wallet has the method once the factory has staged the tree wallet in E7.
- **Escrows made before this version are not counted.** That is all 37 on MainNet. The wallet makes the count with a new escrow, so it has none for these and cannot refuse their delete. The SDK and the proposal builders still remove everything the chain lists for the escrow in the same group. A direct call can leave a grant behind, which no longer works and can be removed, or an allowance, which can be removed and would otherwise apply again to a new escrow of the same name.
- **Why the count is kept under the escrow's name.** The app id of a new escrow is not known when the call that creates it is built, so a box named after that id could not be listed by the call. A test builds the calls, lets other transactions land, and then sends them.
- **Storage.** A new escrow costs 6,100 µALGO plus 400 per byte of its name more than before, for the count. A grant that uses an escrow by default costs 20,500 µALGO plus 400 per byte of the escrow's name more, for the name it stores, and gets it back when the grant is removed. The address of a deleted escrow that the factory made is under nobody's control: ALGO sent there afterwards is lost. An asset cannot be sent there, because the address can never opt in again.
- **A new helper app (F0).** The SDK asks the immutable AbstractedAccountMBR what a wallet's boxes cost. The deployed helper (MainNet 3642282698, TestNet 767110471) runs the 304-byte program and does not know the count. F0 deploys the tree's and points `walletMbr` at it. Its method and return type are unchanged, so an SDK reads either helper. Neither quotes the extra cost of a grant that uses an escrow by default: the SDK's `defaultEscrowGrantMbr` gives it, and the three rollout scripts that install such grants add it.
- **The fifth page.** Every live wallet has four pages: 73 on MainNet, the DAO wallet among them, and 1 on TestNet (read 2026-11-20). The factory grows a wallet's pages when it updates it. The factory sends the update and it created the wallet, so its minimum balance rises by 100,000 µALGO per wallet and it pays nothing out; the wallet's own account and its boxes are untouched. This is measured on a wallet that runs the MainNet program (`tests/compat`). `updateWallet` takes no payment and the factory has 1,121 µALGO free on MainNet, 800 on TestNet. F1 and F2 therefore read what the factory lacks and pay it from the sender before they update anything: 7.3 ALGO for MainNet's 73 wallets, 0.1 ALGO on TestNet.
- **What a wallet above four pages costs its callers.** The node charges a program's bytes above 8,192 to the group's box read budget, once for each such app the group touches. For this wallet that is 730 bytes: 8,918 of approval program and 4 of clear program (562 before the audit fixes of 2026-11-25). A group that calls a wallet, or only lists one as an app reference, therefore needs at least one box reference. It may be empty, and it adds 2,048 bytes of budget, which a box the group already names counts toward. A group that names no box is refused with `read budget exceeded (730 > 0)` before it runs. The SDK finds the reference by simulation and puts it on the same transaction at no extra fee. A hand-built call to a wallet must add it. The mobile and desktop apps had one, the hosted agent controller proof (`arc58_getAdmin()address`), and the backend accepted that proof only without a box reference; all three change with this release (akita-rn 267, akita-desktop 88, akita-backend 30), and the backend goes out before the apps. The transaction that creates or updates a wallet also costs more, because it carries the program: 56 µALGO more when measured at 8,743 bytes, so an update cost 2,056 µALGO in fees, about 2,231 at 8,918 bytes, and a caller that passes a fixed 2,000 fails. The SDK's wallet creation and steps F1 and F2 let the client size the fee. Both rules are measured on LocalNet, which runs the consensus version MainNet and TestNet run (read 2026-11-20), and `admin.e2e.spec.ts` holds the test. They apply to a wallet from the moment it is updated: F1 for the DAO wallet, F2 for the others.
- **New wallets.** From E7 on a wallet is created with five pages and costs 0.1 ALGO more. The factory's `cost` quotes it. Reading the staged wallet from the factory's box now takes five box entries where it took four.
- **An escrow that is an outside account.** An escrow can be an ordinary account rekeyed to the wallet and registered with `arc58_newEscrow(name, address)`. Its record has no app id and the factory has no part in it. A delete closes the account out to the controlled address and removes the record and the count, with nothing sent to the factory. Closing the account ends its rekey, so the address is its own key's again, where a factory escrow's address is under nobody's control. The network closes no account that holds an asset, is opted in to an app, or created an asset or an app that still exists. The SDK reads that from the chain, names the reason and sends nothing. The DAO wallet on MainNet has two such escrows (read 2026-11-20). `akta_creator` created three assets that exist, AKTA among them, and `collections` created 6,005 and is opted in to 25 apps, so neither can be deleted. Do not register one account under two names: the first delete closes it, and the wallet can then not delete the second record.
- **Apps warn before a delete.** What becomes of an escrow's address cannot be undone and differs with the kind of escrow. The SDK's `getEscrowTeardown` returns it as `warnings`, one for a factory escrow (`address-under-nobodys-control`) and one for an outside account (`address-returns-to-its-key`). An app that offers the delete, or puts it into a DAO or Guild proposal, shows them in the confirmation itself before the person confirms. The owner asked for this on 2026-11-20. No app offers the delete yet.
- **Do not delete an escrow that a revenue split pays.** The revenue manager refuses to pay a split whose receiver escrow is gone. Change the splits first.
- **Do not delete a revenue escrow a fee generator still names** (audit 13, XSY-03). Marketplace, Listing, the auction and raffle factories and their children, Subscriptions, PollFactory and HyperSwap each send the protocol's cut to the escrow the DAO registered under their own name (`rev_marketplace`, `rev_auctions`, `rev_subscriptions` and the rest). A Listing reads that name from its Marketplace as it settles, so repointing the Marketplace moves the next sale's fee and no live listing has to be touched; what it does not do is survive a delete. The address of a deleted factory escrow is under nobody's control, and the ALGO leg of the fee does not fail when it cannot reach an escrow, so the cut of every sale after the delete would be sent there and lost, while the asset leg reverts the sale. So register the replacement, point the generator at it with `update:app-dao-escrow`, and only then delete the old escrow. A dry run of that command prints the escrow the app reads today.
- **One test changed for the node.** `methods on cooldown, single group` sent the same call twice. algod 5.1.1 refuses a group that repeats a transaction before it evaluates it, so the second call now pays another amount. The wallet's cooldown rule is unchanged.
- **Manifest.** `release/manifest.json` is regenerated. It differs in the six programs above and in two test-only ones that inherit them: MockBigWallet (11,162 B, was 10,579) and MockLegacyVoteDAO (11,054 B, was 10,996).

## Update 2026-11-20 (second): the plugins take their wallet helpers from the plugin package

No step of the sequence changes. Nine plugin programs get other bytes at the same size, and each of the nine is deployed as a new app in this rollout. The owner asked for it on 2026-11-20.

- **What changed.** The 29 plugin contracts import `getSpendingAccount`, `getControlledSpendingAccount`, `getOriginAccount`, `rekeyAddress` and `rekeyBackIfNecessary` from `@akita-protocol/plugin/functions`, the package third parties build plugins on. They imported them from `smart_contracts/utils/functions` before. The copies there stay for the contracts that are not plugins and for the test mocks.
- **The package's helper was brought to the tree's first.** The package's `getOriginAccount` returned whatever an app held under `controlled_address`. The tree's fails with `errIwlt` unless the key holds 32 bytes, and the package's now does the same. Without that, RevenueManagerPlugin and StakingPoolPlugin would have lost the check.
- **Programs.** AuctionPlugin (3,809 bytes), MarketplacePlugin (2,677), RafflePlugin (4,300), RevenueManagerPlugin (4,987), AkitaSocialPlugin (8,174), StakingPoolPlugin (2,698), SubscriptionsPlugin (4,794), UpdateAkitaDAOPlugin (2,809) and WelcomePlugin (1,310) have other bytes and the size they had. Each holds the same routines and the same constants as before. The compiler lays the routines out in another order, and in AuctionPlugin and StakingPoolPlugin two constants swap slots in the constant block. Every other program is byte-identical, the 20 other plugins included.
- **Rollout.** B1 deploys UpdateAkitaDAOPlugin, G1 the seven Phase 3 plugins and G3 RevenueManagerPlugin, each as a new app from the tree. They deploy the new bytes with no change to a command.
- **Package names.** The packages are `@akita-protocol/plugin` and `@akita-protocol/sdk`, as on `main`. They were `@akta/plugin` and `@akta/sdk`. Run `npm ci` once after pulling, so the workspace links carry the new names. Version 1.2.0 of the plugin package is not published. The commit from `main` also brings the workflow that publishes a package when a tag named `sdk-v<version>` or `plugin-v<version>` is pushed (step I2).
- **Build output.** A TEAL comment names a source outside `projects/akita-sc` by a path relative to that project (`../../node_modules/@akita-protocol/plugin/functions.ts`), so a build writes the same files in any checkout.
- **Manifest.** `release/manifest.json` is regenerated. The nine hashes above move.

## Update 2026-11-21: a grant can carry a policy, PayPlugin reads one, and the pay silos are deprecated

Three steps of the sequence change: G2, H1 and H6. The owner asked for it on 2026-11-21.

- **Grant policies.** A wallet can store a policy for one grant of a plugin. It is a Meta record that only MetaPlugin, Meta's registered policy writer, writes, and only in a window the wallet's admin approved. A plugin reads the policy of the grant it runs under. H1 registers the writer and gives the DAO wallet its policy writer grant.
- **PayPlugin reads a policy.** A grant with a policy pays only the receivers and the assets the policy lists. A grant without one pays as before, with one exception: a global grant that needs no execution key pays nothing until it has a policy. An execution by the wallet's own admin is never limited. PayPlugin is created with Meta's app id, which cannot change afterwards, so its deploy moves from G2 to H1.
- **Pay silos are deprecated.** A pay silo fixed its receiver in a program. A PayPlugin grant with a policy does the same job with no app of its own. Neither pay silo plugin is deployed or rotated in this rollout, and H6 pays the Labs share through PayPlugin. The live apps stay on chain, unused.
- **Read from MainNet and TestNet on 2026-11-21, read-only.** The DAO wallet holds no grant of either pay silo plugin. Its one PayPlugin grant is global, on no escrow, with an execution key, so it moves to the new PayPlugin without a policy. `rec_krby` is locked, holds its minimum of 0.1 ALGO and no asset, and carries one grant, the open OptInPlugin grant.
- **The wallet asks for its admin when a caller resolves to its own address.** `arc58_rekeyToPlugin` with caller type Other, sent from the wallet's own address, named the admin grant without the admin check. Only a plugin that held the wallet's account in its own window could send that call. The wallet now applies the admin check, and MetaPlugin and PayPlugin each read the caller type from the window's rekey call as well.
- **Programs.** Against the build of 2026-11-20: AbstractedAccount is 8,750 bytes (8,743 before), Meta 5,209 (4,436), MetaPlugin 4,075 (3,749) and PayPlugin 1,854 (298). The wallet keeps its five pages.
- **Manifest.** `release/manifest.json` lists 157 programs. MockPolicyForger and MockUnlimitedPayPlugin are new test programs.
- **Not run on a public network.** The new commands were run on LocalNet only. Their dry runs need Meta on chain, which H1 creates (G17).

## Update 2026-11-24: the DAO can hold the inference network's fees

No step of the sequence changes. The owner asked for it on 2026-11-24.

- **A new DAO field.** AkitaDAO gains the global field `inference_fees`. It holds `chargePercentage`, the DAO's share of an inference charge in hundredths of a percent, and `providerBond`, the AKTA a provider bonds to join. Only an UpdateFields proposal writes it. AkitaDAOProposalValidator accepts the field and checks its shape, as it does for the other fee fields. Neither program caps the share.
- **Nothing in this release reads it.** The inference network that will read it is not part of this release, and no step here writes the field. A code upgrade does not create a global, so after B2 the field is absent until a proposal writes it.
- **It fits the live DAOs.** The DAO's declared storage does not change. Both live DAOs have 59 byte slots allocated and use 24 (read from MainNet and TestNet on 2026-11-24).
- **Programs.** Against the build of 2026-11-21: AkitaDAO is 10,856 bytes (10,823 before) and AkitaDAOProposalValidator 3,704 (3,682). The DAO keeps its six pages, so B2's page growth and its sponsorship are unchanged. The test program MockLegacyVoteDAO changes with the DAO. No other program's bytes change.
- **Manifest.** `release/manifest.json` still lists 155 programs. Three entries change.
- **SDK.** `AkitaDaoSDK` builds the UpdateFields action for `inference_fees`. A value left out keeps what the DAO stores, or 0 while the field is absent.
- **Not run on a public network.** The DAO's proposal test sets the field on LocalNet.

## Update 2026-11-24: the inference network, after the rollout (proposed)

The owner asked on 2026-11-24 for Akita's own inference network before TestNet, paid per request the way ZeroSignal's escrow works, with the fee set by the DAO like other services. The DAO's `inference_fees` field is in the release (see the note above); the network that reads it is not. Design: [Akita inference network: contract design](https://claude.ai/artifact/Ep1Fyh9NpfhDYKmvdmV7Je).

- **Two new programs.** `InferenceNetwork` (`smart_contracts/inference`) holds providers and their AKTA bonds, and per-request tickets. For each request the caller (the member's app, or the key that runs their routines) opens a ticket through `InferencePlugin` (`arc58/plugins/inference`) that locks the request's max price from the member's escrow. The provider serves without waiting, settles the ticket at the actual cost less the DAO's `chargePercentage`, and the rest comes back; an unsettled ticket is refunded after the settle window. A provider that overcharges is frozen and slashed (to a receiver the DAO names). The bond minimum is the DAO's `providerBond`. Only Akita wallets open tickets, so the website and routines use delegated grants and nobody signs per request. Every ticket records the wallet's controlled address and the wallet id, whichever delegated key opened it, and the opened and settled events carry them. Sponsor pools carry usage included with a subscription: a sponsor (Akita) funds a pool for one subscription service, and each payment of a subscription to that service gives the subscription `perPayment` until the next payment. The subscriber's own keys open tickets paid from it through `InferencePlugin.openPooled`, or the pool's allocator (Akita's backend) opens them for a subscriber, and what a ticket does not spend goes back to the pool and the subscription's allowance. A lapsed or shut down subscription gets nothing.
- **The DAO runs it (owner, 2026-11-24: "should be DAO based just like everything else").** The DAO's wallet is always the network's admin. Its proposals cannot call an app directly, so, as for Staking's heartbeat manager or MetaPlugin's policy writer, it administers the network through pass-through methods on `InferencePlugin` (`setSettings`, `setPaymentAsset`, `setProviderStatus`, `slash`, `setAdmin`): the DAO's wallet holds a global InferencePlugin grant that needs an execution key, at the app upgrade thresholds, and each change is one ExecutePlugin proposal. No new program. The deployer is a bootstrap admin only until `--hand-to-dao` gives that up.
- **Its fees go to a DAO revenue escrow (owner, 2026-11-24: "we need to setup a rev escrow on the DAO for the inference networks earnings").** InferenceNetwork is a fee generator like the others: `sweepFees` pays the escrow the DAO names with `updateAkitaDAOEscrow`, `rev_inference`, where the revenue split and the RevenueManager apply. There is no treasury address. Until the DAO names it, fees stay in the app.
- **A provider caught overcharging is frozen and slashed.** A Frozen provider (status 5) can neither settle nor unbond, so its open tickets are refunded in full when their windows end. A pool pays only the providers its sponsor lists. A subscriber opening a pool ticket pays its storage deposit (82,900 microAlgos, refunded when it closes). A refund to an account that can no longer receive (a deleted escrow) goes to the wallet's own account instead. Registration cannot open while `providerBond` is 0.
- **Steps after H1, tracked by rollout:status as `inference-network`, `inference-plugin`, `inference-admin-grant` (step 2), `inference-escrow` (step 3), `inference-handover` (step 4) and `inference-fees` (step 5), read from the chain (not in release 2.0.0: name them in `--allow-pending` at I1).** All need the DAO creator's key while the DAO is not initialized; after `initialize()` each proposal is a vote.
  1. `npm run deploy:inference -- -n testnet --claimer <address> --payout <address> --manifest receipts/inference.json --register --confirm`. It first checks that Meta takes policies from the recorded MetaPlugin and that the payout is opted in to USDC. Its receipt lets a failed run resume without creating a second app, and every later step is skipped once the chain shows it done. It creates both apps, opts the network in to AKTA and USDC, sets a one-hour settle window and closed registration, accepts ALGO and USDC, and registers and activates Akita as provider 1. Then rebuild the SDK.
  2. `npm run install:inference-admin-grant -- -n testnet --confirm`: one AddPlugin proposal gives the DAO's wallet its InferencePlugin grant, and the script reads it back.
  3. The revenue escrow, as for `rev_meta`: `npm run create:dao-escrow -- -n testnet --escrow rev_inference --execute`, then `npm run update:app-dao-escrow -- -n testnet --app inferenceNetwork --escrow rev_inference --confirm`, then G3a's `npm run register:revenue-escrow -- -n testnet --escrow rev_inference --source <InferenceNetwork app address> --confirm` (the network is the source allowed to opt it in).
  4. The command of step 1 again, with `--hand-to-dao`: it opts `rev_inference` and the split's receivers in to USDC through the RevenueManager (`optInDaoEscrow`, paid by the sender), then gives up the bootstrap admin. It refuses `--hand-to-dao` until the DAO's wallet holds the grant of step 2. G3b's `opt-in:revenue-receivers` covers any receiver still missing USDC.
  5. The fee and bond: `npm run update:inference-fees -- -n testnet --charge-percentage 500 --provider-bond <AKTA base units> --confirm`, one UpdateFields proposal for `inference_fees` that the script reads back. A value left out keeps what the DAO stores. The owner chose on 2026-11-24 `chargePercentage` 500 (5%) and a `providerBond` of about $250 in AKTA base units (6 decimals), converted at the AKTA price on the day of the proposal. The script takes the bond as a number and fetches no price. Before sending, check the MainNet AKTA (523683256) price from two sources and use a bond that falls between them:
     - Vestige: `https://indexer.vestige.fi/assets/price?asset_ids=523683256&network_id=0&denominating_asset_id=31566704` (price in USDC)
     - Tinyman: `https://mainnet.analytics.tinyman.org/api/v1/assets/523683256/` (`price_in_usd`)
     The bond is `250 / price × 10^6`.
  Without `--confirm` each prints its plan. Step 1 reads the Meta id for InferencePlugin from the SDK, so it runs after H1.
- **Manifest.** `release/manifest.json` lists 163 programs: the 159 of the release (with Collectible Variations, below) and four for inference, the two new programs and test-only mocks of the DAO and of Subscriptions.
- **Where a closed ticket's money goes.** The rest of the lock goes back to the payer. When the payer can no longer receive it (an escrow the wallet deleted, a closed outside account, an account that left the asset, or a holding the asset's freeze address froze), it goes to the ticket's principal, the wallet's controlled address. When neither can, it goes to the network's fees. The storage deposit goes back to the account that paid it (the principal for a pool ticket), else to the principal, else into the global `deposits`, which `sweepFees(0)` pays to `rev_inference` with the ALGO fees. `sweepFees(0)` reads ALGO's payment-asset box, which step 1 creates and nothing deletes (disallowing ALGO only clears its flag), so keep ALGO registered. A member therefore cannot make a settle fail, and a settle names at most 8 references (`inferenceSettleReferences` in the SDK lists them; the backend reads the principal from the ticket box). A frozen payout account is the provider's own problem: its settles fail until it is unfrozen.
- **Upgrades.** InferencePlugin cannot be updated and is built against the network's ticket box size and `open` signature. A network upgrade that changes either means a new InferencePlugin and a new grant on every member's wallet.
- **Request ids.** A ticket id can be opened again once its ticket is settled or refunded, so the provider treats each request id as single use on its own side (akita-backend derives it from the reservation).
- **Run on TestNet (2026-11-27).** Steps 1 to 5 ran on TestNet from the DAO creator's key: InferenceNetwork 777489805 and InferencePlugin 777489958 (provider 1 is Akita, active), the `rev_inference` escrow app 777490033, and DAO proposals 226 (admin grant), 227 (`rev_inference` created), 228 (the network's fees pointed at it), 229 (registered with the RevenueManager) and 230 (`inference_fees` = 500 and 1679147151726, which is $250 at $0.00014885 per AKTA; Vestige $0.00014924 and Tinyman $0.00014830 at sending). `rollout:status -n testnet` shows all six inference rows done. Not yet on MainNet.
- **Before 2026-11-27, LocalNet only.** Run on LocalNet only: 23 InferenceNetwork tests (6 of them for sponsor pools, and 2 that settle while the member's account is closed or its holding frozen), 9 InferencePlugin tests (one refuses the admin pass-throughs to a delegated grant), settles built from the SDK's `inferenceSettleReferences` alone for a plain ticket, a ticket whose escrow was deleted and a subscriber's USDC pool ticket, 3 tests on the full universe that run the admin calls, `rev_inference` and an upgrade through DAO proposals, the DAO proposal tests (including `inference_fees`) and the wider DAO suite.

## Update 2026-11-24 (second): Collectible Variations joins stage H

One step is added: H1a, after the Meta deploy. No existing step changes and none is renumbered. The owner asked for it on 2026-11-24.

- **Reversed on 2026-11-25:** this entry first held the registry to TestNet for 2.0.0, because its methods carried placeholder names for an ARC number. The owner set the ARC aside and the methods now have plain names, so H1a runs on MainNet with the rest of stage H. See the 2026-11-25 entry.

- **A new immutable contract.** `CollectibleVariations` (smart_contracts/collectible-variations) is the Collectible Variations registry: per-asset variations (images, render bundles, data, links) written by admitted writers, a main image pinned by the creator or the holder, creator policies per asset (`p`) or per ASA manager (`P`), holder grants (`g`), and purge after an asset is destroyed. It is a singleton that accepts no update or delete. Every box is paid by the account that owns it and refunded to it.
- **It depends on Meta only.** A `meta` writer set is a Merkle root that the registry itself owns in Meta, under the "collectible writer list" tree type, and checks with Meta.verify. Meta's app id and that type id are fixed at create. The registry needs no DAO proposal and no app-list slot.
- **Programs.** CollectibleVariations is 8,022 bytes with three extra pages. The LocalNet mocks MockSmartAsa, MockAdmitDelegate, MockRegistryCaller and MockOddDelegate are added for its tests. No other program's bytes change.
- **Manifest.** `release/manifest.json` gains four entries (159 programs; MockOddDelegate is a bare program with no app spec and is not listed). The 155 existing entries are unchanged.
- **SDK.** `akita-sdk/collectible-variations` adds `CollectibleVariationsSDK` (measures each call's deposit by simulating it once, then sends the payment and the call), the box codecs, and the writer-list tree helpers. `networks.ts` gains the optional key `collectibleVariations`.
- **Not run on a public network.** The deploy script and its receipt resume were run on LocalNet only.

## Update 2026-11-25: the thirteen readiness audits are answered

Thirteen independent audits were read over the release tree, one per system, and their fixes are in. No step of the sequence is added or renumbered except E2a, the Subscriptions storage top-up below. 32 deployable programs get new bytes; every one of them is already deployed fresh by a step of this rollout, so no step is added for them either. The owner answered the open questions on 2026-11-25; where an answer kept the behaviour, the finding is recorded as accepted and nothing changed.

- **What the fixes cover.** The wallet and its factory (WAL-01 to WAL-08), gifting (GFT-04), DAO governance and revenue payouts (DAO-01, DAO-03, DAO-04, DAO-06, DAO-07, DAO-09, DAO-10), staking pools (STK-02, STK-03, STK-04, STK-07, STK-08, STK-10), guilds and subscriptions (the signer-threshold lockout bound, upgrade commitments checked at drafting, renewals gated on the subscriber), auctions and raffles (AUC-02, AUC-03, the entrant caps), social (the tipper-paid opt-in, reserved ref shapes, bans that reach a wallet's escrows, the votes box quoted when missing, the wall gate, the ban rules), the marketplace and HyperSwap (audit 09, including the royalty cap), gates (GAT-02, GAT-04), the external adapters (EXT-02, EXT-03, EXT-04, EXT-06) and the cross-system pass (XSY-03, XSY-04, XSY-05, SOC-13).
- **The caps the owner asked to remove are gone.** A raffle no longer caps its entrants and a fee auction no longer caps its bidders: both now open a weights box as the entries arrive and grow it one slot at a time, so nothing is reserved at creation and a seller no longer locks 13.1 ALGO per reserved box. An entry or a first bid pays a flat 12,500 µALGO for its slot, refundable, which `mbr()` carries, so the plugins and the SDK quote it unchanged.
- **An ASA bid and an ASA raffle entry hold 79,800 µALGO** instead of 35,300, the cost of the Rewards disbursement that refunds them if the bidder has quit the asset. ALGO bids and entries are unchanged, and all of it is refundable.
- **A grant that anyone may use is not refused.** The first batch made every plugin refuse a global grant with no method list; the owner said no on 2026-11-25, and it was reverted (`03cc0732`). Clients install a method list by default and warn when a grant has none (akita-rn, akita-desktop). Execution keys not tied to a plugin, the shared Guild plugin grant, the passkey checks, gate standing passed between accounts, the single `PayPlugin` grant with no policy, freezable prizes and the operator key's standing grants are all accepted as they are.
- **A voted proposal expires** 45 days after its voting period ends (`ProposalExecutionWindow`, `errPrex`; DAO-09, the owner's number). After that its proposer can only cancel and delete it. Nothing in this rollout holds a proposal that long, but do not create the stage G or H proposals before the step that executes them is ready.
- **`initialize()` refuses while AKTA, BONES or the staking app is unset** (`errGnrd`; DAO-10), because nobody could propose afterwards. `initialize-dao.ts` checks all three before I1 and warns when the staking app reports no locked AKTA.
- **`MarketplacePlugin.list` takes one more argument.** Its selector is now `list(uint64,bool,uint64,uint64,uint64,uint64,uint64,address,uint64,address,string,byte[32][],uint64)uint64`, with `maxCreatorRoyalty` last. A method-restricted grant that names the old selector, and any keeper or hand-built call, must take the new one. `purchase` and `listPrizeBox` are unchanged.
- **Do not update a live pre-2.0.0 Auction, Raffle or StakingPool child in place.** The new children declare another schema (the auction and raffle children drop the `w_totals` global, the pool adds `live_entries`) and keep their weights in boxes where the old ones used globals. The factories stage the new program for new children only, which is what E4 and E5 do; let the live ones finish under their own program. The SDK's readers decode both layouts.
- **An execution group needs box-read headroom.** algod sizes a group's box read budget from the boxes that exist when it simulates, and an execution key's box and an UpgradeApp proposal's DAO boxes are written after the group is built. A group whose reads ended just under a 2,048 B step was accepted in simulation and refused at send with `read budget exceeded`; the RaffleFactory group did, at 22,514 B against 22,528 B of budget. `wallet.build.usePlugin` now seeds an all-zero box reference as headroom, always for the execution key box and for `pendingBoxBytes` the caller names, and the rollout runner, `runUpdate` and the sunset builder pass the bytes an UpgradeApp proposal writes. A resumed rollout rebuilds a recorded group by trying the other headroom counts until the recorded group id comes back, so a resume after this change still matches a group built before it.
- **Programs.** Old → new bytes, with the step that deploys each. No program changes its page count, so no sponsored MBR in the sequence changes.

| Program | Bytes | Step |
|---|---|---|
| AkitaReferrerGate | 816 → 803 | C1 |
| MerkleAddressGate | 697 → 696 | C1 |
| MerkleAssetGate | 769 (new bytes) | C1 |
| AkitaDAO | 10,856 → 10,866 | B2 |
| AkitaDAOProposalValidator | 3,704 → 4,073 | B2, before the DAO |
| AkitaSocial | 11,499 → 11,693 | E1 |
| AkitaSocialModeration | 1,477 → 1,525 | E1 (ride-along) |
| Subscriptions | 10,801 → 10,818 | E2 |
| Marketplace | 5,665 → 5,753 | E3 |
| Listing | 3,203 → 3,326 | E3 (child) |
| AuctionFactory | 4,890 → 4,867 | E4 |
| Auction | 8,522 → 8,521 | E4 (child) |
| RaffleFactory | 3,794 → 3,751 | E4 |
| Raffle | 8,158 → 8,151 | E4 (child) |
| StakingPoolFactory | 4,006 → 3,972 | E5 |
| StakingPool | 13,272 → 13,472 | E5 (child) |
| PollFactory | 4,339 → 4,305 | E6 |
| HyperSwap | 3,986 → 4,056 | E6 |
| PrizeBoxFactory | 2,184 → 2,150 | E6 (ride-along) |
| AbstractedAccountFactory | 3,536 → 3,618 | E7 |
| AbstractedAccount | 8,750 → 8,918 | E7 (child), F1, F2 |
| AbstractedAccountMBR | 308 → 312 | F0 |
| AkitaSocialPlugin | 8,174 → 7,821 | G1 |
| MarketplacePlugin | 2,677 → 2,650 | G1 |
| AuctionPlugin | 3,809 (new bytes) | G1 |
| RafflePlugin | 4,300 (new bytes) | G1 |
| SelfOptInPlugin | 431 → 428 | G2 |
| NFDPlugin | 2,956 → 3,073 | G2 |
| HaystackRouterPlugin | 892 → 932 | G2 |
| RevenueManagerPlugin | 4,987 → 5,218 | G3 |
| Guild | 12,586 → 12,943 | H2 |
| FixedSignerGuildConsensus | 5,424 → 5,523 | H2 |

- **Test-only programs.** MockBigWallet 11,169 → 11,337, MockHyperSwap 4,008 → 4,078, MockLegacyVoteDAO 11,087 → 11,097, MockNfdRegistry 130 → 635 (it now refuses a RekeyTo and quotes a link cost, like the live registry), MockHaystackRouter 350 → 363 (the live router's terms layout), and MockWindowReclaim is new. None is deployed by this rollout. On LocalNet and TestNet, redeploy the mock Haystack router (`deploy:mock-haystack`) before rehearsing a swap: the plugin now reads the route terms in the live router's layout and the old mock emits the old one.
- **Two new checks before a step, both read-only.** `check:social-legacy-prefixes` before E1 (SOC-13) and `fund:subscription-reserve` before E2 (SUB-02, step E2a). `rollout:status` gains the step `subscription-reserve`, and `p2:Subscriptions` requires it.
- **One command for MainNet (2026-11-25).** The owner asked for the MainNet rollout as one script, like the rehearsal. The rehearsal's runner became `scripts/rollout-run.sh`, which holds the runbook's MainNet lines as written, and two files start it for a network: `rollout-mainnet.sh` and `rollout-testnet-rehearsal.sh`. The TestNet commands are made from the MainNet lines by the five differences of A4, and a fixture holds them to the commands the rehearsal ran: the new file lists, sends and prints for TestNet exactly what the file the rehearsal used did. A MainNet run adds what TestNet has no use for: G2b and the Haystack router plugin, and five checks before its first command (the commit, the tree, the receipts, the node key, the release manifest). D1a, G4 and I2 stay by hand. `tests/rollout-runner.test.ts` runs both networks end to end against stub commands: the order sent, picking up after a stop, the deploys that keep no receipt, the three addresses, each refusal, and that neither key is printed or written.
- **A gate import cutoff is checked against the chain** (XSY-05). `deploy-gates.ts` reads the registered gate's `gate_cursor` and refuses a `--legacy-cutoff` that is not it, naming the value to pass, so a new Gate v2 cannot be sealed with a cutoff that would leave legacy standing readable or unreachable. `allowlist-sub-gates.ts` now also refuses any app whose program is not the current artifact of the sub-gate it names, and `seal-gate-imports.ts` refuses to seal while a sub-gate of the tree has no receipt.
- **A listing pays the escrow its Marketplace names** (XSY-03), read at settlement instead of at creation, so repointing the Marketplace with `update:app-dao-escrow` moves the next sale's fee and no live listing has to be touched. The same step's warning about deleting a revenue escrow now covers the fee generators.
- **Every plugin method a wallet calls is reachable through the SDK** (XSY-04): `RewardsPlugin.editDisbursement` and `UpdateAkitaDAOPlugin.updateRevocation` were callable on chain and had no SDK hook. `updateRevocation` takes the factory app id. A test walks every plugin's ABI against the SDK's hooks, so a method added later cannot be missed. Three methods have no hook of their own name and are reached another way, each checked by that test: `AuctionPlugin.deleteApplication` is the v1 name of `deleteAuctionApp` and only forwards to it, and `UpdateAkitaDAOPlugin.setClearProgram` and `updateAppWithSchema` are steps `updateApp` sends when it is given a clear program or a larger schema.
- **Left open for the owner.** The creator-royalty findings (a fix is drafted, the owner asked for it if it is clean), SOC-05 (how one AKTA balance backs the staking part of many accounts' impact score), a price ceiling for public NFD auto-renew of segment names, and the DualStakePlugin fix (EXT-07, which is the pool check G2 already describes and the same fix). That plugin stays out of release 2.0.0 until the owner picks it, and I1 names it in `--allow-pending`.
- **Manifest.** `release/manifest.json` is regenerated: 160 programs: the 32 above, five mocks and one new mock.
- **Held AKTA and Akita NFTs count in vote weights and the tip tax again** (S-06, reverted on the owner's decision of 2026-11-25, after the audits). Since 2026-11-10 the tree had left both out of the score AkitaSocial reads for a vote's weight and for the tax on a tip, because a held balance can be passed between accounts and counts for each one that holds it when it is read. The owner accepts that: holding counts wherever the score is read, as on the deployed AkitaSocialImpact, and as gates and fee discounts already read it. One more program changes, AkitaSocialImpact 3,160 → 3,146 bytes, in E1 as a ride-along, and its manifest entry with it. No step, argument or payment changes.
- **The rollout does not launch the DAO** (the owner, 2026-11-25, after the audits). The sequence ends at I2, the push and tag, with the MainNet DAO in Draft. I1 (the threshold rescale, the grant clean-up, `clearBootstrapKeys` and `initialize()`) is kept as the launch procedure and run later, on the owner's call. No step of stages B to H changes: each already ran with the DAO in Draft. Wherever a step says to name something in `--allow-pending` at I1, that still holds for the day I1 is run.
- **Collectible Variations has plain method names and goes to MainNet** (the owner, 2026-11-25, after the audits). The ARC is set aside for now, so the registry is a regular contract. Its 14 methods drop the `arcTBD_` placeholder and take their handlers' names: `writeVariation`, `deleteVariation`, `pinMainCreator`, `pinMainHolder`, `unpinMainCreator`, `unpinMainHolder`, `setAssetPolicy`, `setManagerPolicy`, `deleteAssetPolicy`, `deleteManagerPolicy`, `setGrant`, `deleteGrant`, `purge` and `getMain`. The callback a delegate app answers is `admit(uint64,address,byte[],address)bool`. Arguments, return values, boxes and logic are unchanged: against the previous build the approval program differs only in the 15 method selectors and is still 8,022 bytes. MockAdmitDelegate changes the same way. No other program's bytes change; the manifest still lists 160 programs. The SDK's `CollectibleVariationsSDK` keeps its own method names and calls the new ones. With the names settled, the MainNet hold of 2026-11-25 is lifted: H1a runs on MainNet after H1 (200 ALGO of Meta type fees, see H1a) and `collectible-variations` is no longer named in `--allow-pending` at I1.
- **TestNet rehearsal, first stop: B2 (2026-11-25).** A4a and B1 ran, and `update:dao` deployed the validator and repointed the DAO, then stopped with `Wallet not initialized` before funding the DAO upgrade. Nothing was half-sent: the stop came before any payment or proposal of the upgrade. Cause: the Phase 2 runner read the DAO wallet through the SDK getter that throws until `getWallet()` has resolved, and nothing on that path resolved it. The LocalNet suite resolves the wallet in its setup and a dry run returns before the send path, so only the command line could hit it, on every target of the Phase 2 runner (B2 and the stage E upgrades; D1 goes through `runUpdate`, which resolves the wallet first). Fixed in three places: the runner asks for the wallet where it uses it; `setupContext` resolves it before a script that sends does anything (a failure there stops the script before it sends); and `update:dao` reuses the validator the DAO already points to when it runs the tree program, so the same command carries on. Scripts only: no program and no manifest entry changes.
- **TestNet rehearsal, A4a to G2 done (2026-11-25).** The runner finished every step from A4a to G2 on TestNet from commit `c89509be`. Read back the same day with the registry the run recorded: every tracked check of stages B to G is done except the three that are meant to wait (the Haystack router plugin, which TestNet leaves out; DualStakePlugin, which is held; RevenueManagerPlugin, which is G3) and the heartbeat manager (G2a). The DAO is still in Draft. Each later step was then planned on TestNet before it was run. One refused: G3b read `pal.optin`, which G2 leaves on the old OptInPlugin while it moves the receivers' grants to the new one. The step now reads the plugin from the receivers' grants (see G3b). The node key (A0) was added the same day, after the public endpoints slowed the run.
- **No id is typed by hand (2026-11-25).** The steps after G2 named their ids and addresses in angle brackets, to be filled in from receipts. They now use variables: the three addresses the owner supplies are set once in A0, and an id that a step creates is read by `rollout:id` (`scripts/rollout-id.ts`), which prints the app id the SDK records under a key, that app's address, or the app id of a DAO wallet escrow, and prints nothing when the value is not there. The TestNet runner gained the steps after G2, G2a to H6, built from the same lines, so the rehearsal runs the commands MainNet will. It takes the three addresses from the shell under the names A0 gives them and stops before the step that needs one that is not set. `tests/rollout-runbook.test.ts` holds the two together and refuses a command that still names a value in angle brackets. Found on the way: a dry run of G3a without `--sender` reported an existing escrow as missing, because the escrow lookup was a simulated call that a node refuses from an empty sender; the lookup now reads the wallet's boxes.
- **TestNet rehearsal finished: A4a to H6 (2026-11-25).** The runner finished G2a to H6 on TestNet from commit `7cdb6074`, with the three addresses of A0; A4a to G2 had run from `c89509be`. Read back the same day with the registry the run recorded: every tracked check of stages B to H is done except the four that are meant to wait: the Haystack router plugin (TestNet has no router), DualStakePlugin (held), SocialClaim (not in 2.0.0) and the SDK switches (G4, by hand). Stage I is not part of this rollout, and the DAO is still in Draft. The dry run of each step from G2a to H6 then found nothing left to do: the heartbeat manager is the address given, all 12 `rev_*` escrows are registered with the new RevenueManagerPlugin, Meta takes policies only from MetaPlugin, and `rec_krby` pays only the Labs address. Three MainNet commands had nothing to act on there, so MainNet is their first run: F2's sweep of the user wallets, G2b, and the Haystack plugin deploy (A4). The run's cost to the creator is in A5.
- **MainNet rollout finished: B1 to H6 (2026-11-26).** The runner finished B1 to H6 on MainNet from commit `cd1e5b05`. One command stopped on the way: C2 lost its connection to the node after three of its eighteen `setSubGate` calls, and the next start sent the other fifteen. Read back the same day with the registry the run wrote: every tracked check of stages B to H is done except the two that are meant to wait (DualStakePlugin, held, and SocialClaim, not in 2.0.0); each of the 77 registered apps runs the program the release manifest pins or is one that is meant to stay; every versioned app reports 2.0.0 and names the DAO; the DAO wallet's 33 grants and 26 escrows match TestNet's one for one; and the dry run of each step finds nothing left to do. The three commands that had nothing to act on in the rehearsal ran here for the first time: F2 found 73 user wallets and all report 2.0.0, G2b left no credit on Rewards v1, and the Haystack plugin runs the tree program. Stage I is not part of this rollout, and the DAO is still in Draft. The run took 271 ALGO from the creator (461.1 held before, 190.1 after).
- **G4 done on both networks (2026-11-26).** `REGISTRY_WRITES_STOPPED` and `SOCIAL_HINTED_TARGETS` are `true` for TestNet and MainNet, in the commit that records the ids `--register` wrote on both. That commit also sets `daoProposalValidator` in `networks.ts` and the README to the validator B2 deployed (777354623 on TestNet, 3783316415 on MainNet): B2 repoints the DAO and does not write that key, and nothing reads it, since the SDK asks the DAO. Tests that pinned the state before the rollout pin the new one: the two switches (`src/social/index.test.ts`, `src/wallet/principal-phase3.test.ts`), the latest NFD plugin (`src/networks.test.ts`) and the Guild factory id (`tests/release-deployments.test.ts`). Each switch keeps a test of its off position. What is left is I2.
- **Main is merged in, and the SDK is 2.0.0 (2026-11-26).** `main` had seven commits the release branch never took. They are merged: the release's side is kept where it already carried the change (the `@akita-protocol` scope and the publish workflow), main's rewrite of the Lora App Lab import is taken with the release's edits on top, and main's inference PaySilo deploy script is left out because PaySilo was removed on 2026-11-21. `main` can now be fast-forwarded to the release. The SDK package is version 2.0.0 (the owner, 2026-11-26): 1.5.0-canary.2 was already on npm. The built `dist/` does not carry the version, so it is unchanged.

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

Re-read 2026-11-17, MainNet against TestNet (read-only, no key):

- 61 of the 63 registry names that point at an Akita app on both networks point at byte-identical programs (`rewards` and `rewardsV1` name the same app). The children held by the wallet, Listing, StakingPool, Auction and Raffle factories match. `nfdPlugin` is 2,886 B on MainNet and 2,152 B on TestNet, where its registry is 0. `haystackRouterPlugin` is 588 B on MainNet (router 3172554435) and 1,514 B on TestNet (router 0).
- The DAO's settings match apart from `proposalId` (171 and 165) and `otherAppList.akitaNfd` (765902356 on MainNet, 0 on TestNet, where no Akita NFD app exists). The five plugin settings boxes and the named plugins match. Both DAOs are in Draft with the same creator.
- The DAO wallet holds 28 grants and 24 escrows on MainNet, 21 and 22 on TestNet. Only MainNet has the account escrows `akta_creator` and `collections` (plain accounts rekeyed to the wallet, escrow id 0), each with an `nfdPlugin` grant for the operator; `nfdPlugin` and `asaManagerPlugin` grants for the operator on the main account; two grants of an older `selfOptinPlugin`; and a second grant of the older `socialPlugin`. TestNet's `asaManagerPlugin` grant is on an older revision. The `rewardsPlugin` grant on `stickers` names E3H5NB… on MainNet and the DAO creator on TestNet. `stickers` is unlocked on MainNet and locked on TestNet; every other lock matches.
- The wallet factory has created 73 apps on MainNet and 1 on TestNet, the DAO wallet. Rewards v1 holds 147 disbursements in 312 boxes on MainNet and none on TestNet. MainNet has 2 Listings and 6 Polls, TestNet none. AkitaSocial holds 1,836 boxes on MainNet and 1 on TestNet, the graph 229 and 0, Impact 59 and 3, Staking 11 and 1, Subscriptions 13 and 4.
- The DAO creator holds 61.10 ALGO on MainNet, 53.47 of it minimum balance for 81 created apps, so 7.63 is free. On TestNet it holds 3,720.80. TestNet's PollFactory holds 0.
- `rollout:status` showed the same 59 steps in the same state on both networks: none done. With the step added the same day (`rewards-v1-credits`) it shows 60: none done on MainNet, and that one done on TestNet, where there is nothing to withdraw.
- Not read: the contents of each app's boxes (they were counted), and the backend's and the apps' configuration for each network.

Re-read 2026-11-17 (second), the setup of the two DAOs (read-only, no key; box contents decoded this time):

- DAO wallet grants: MainNet 28, TestNet 21. Only on MainNet (9): `asaManagerPlugin` (third deployment, 3605315701) for the creator and for the operator on the main account; `nfdPlugin` for the operator on the main account, on `akta_creator` and on `collections`; `rewardsPlugin` on `stickers` for E3H5NB…; `selfOptinPlugin` (first deployment) for the creator on `stickers`, one method, and for the operator on the main account; `socialPlugin` (second deployment) for the operator on the main account. Only on TestNet (2): `asaManagerPlugin` (second deployment, 763128820) for the creator; `rewardsPlugin` on `stickers` for the creator. No allowance and no named plugin on either wallet.
- Escrows: `akta_creator` holds 45.4 ALGO and 4 assets, `collections` 2,627.6 ALGO, 6,009 assets and 25 app opt-ins. Other holdings differ with use: `rev_nfd` 553.4 ALGO on MainNet and 0.1 on TestNet, `rev_subscriptions` 400.9 and 300.5, `rev_marketplace` 3.9 and 0.1, `stickers` 89.9 ALGO with 14 assets and 1.4 with 13, the DAO wallet 47.2 ALGO with 17 assets and 19.8 with 14.
- RevenueManager: the same nine `rev_*` escrows are registered on both with the same flags, each with a split that refers to the DAO's `revenue_splits`. Only `rev_haystack`'s source differs: an account on MainNet, the zero address on TestNet. `rev_nfd` is registered on neither.
- EscrowFactory: 85 boxes on MainNet, 1 on TestNet. That is use (73 wallets against the DAO wallet alone), not setup.
- Proposals: the two histories line up except for these. Proposal 63 names a different stickers caller. Only MainNet ran: 105 (unlock `stickers`), 106 (the creator's `selfOptinPlugin` grant on `stickers`), 107 and 108 (wallet factory upgrades), 109 to 115 (the operator's grants), 117 (`asaManagerPlugin` moved to its third deployment), 118 (an Impact upgrade), 119 and 123 (`wallet_fees`), 168 and 169 (the account escrows and their grants). Only TestNet ran: 138 to 147 (an interim RevenueManager, since replaced) and 163 (a second `aal` write). What is left of those differences today is the grants, the two account escrows, the `stickers` lock, `akitaNfd`, `rev_haystack`'s source, and the two plugin apps G2 replaces.
- MainNet's dualSTAKE registry is app 2933409454: 38 boxes, 19 of them pool records. The account that created the registry created all 19 pools. The registry app's own account has created none. TestNet has no app with that id.
- Not read: the names of the assets the DAO wallet holds, and the backend's and the apps' configuration for each network.

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

**Decided 2026-11-25 (the owner: "Deploy all again"): every sub-gate is deployed again.** C1 deploys all 18 (the 16 live ones and the two new ones of 2026-10-12), C2 allowlists what C1's receipts name, and no `--sub-gates` list of live app ids is passed any more. Every gate then runs the audited program of this release, and the allowlist holds nothing older.

Background: 8 sub-gates changed behavior (AkitaReferrer, Asset, NFD, NFDRoot, SocialFollowerCount, StakingAmount, Subscription, SubscriptionStreak) and 8 changed only error codes (MerkleAddress, MerkleAsset, Poll, SocialActivity, SocialFollowerIndex, SocialImpact, SocialModerator, StakingPower). The audit of the gates then changed two of the second group: MerkleAddressGate and MerkleAssetGate accept the short proofs of small lists (GAT-04), which the live ones refuse. The Asset sub-gate also reads an empty account's ALGO balance as zero (audit C27), and AkitaReferrerGate no longer fails on a wallet whose `referrer` is not an address (GAT-02).

What a new app id costs: a gate that names a sub-gate by app id must be registered again. Nothing on MainNet does: Gate v1 has registered no gate at all (`gate_cursor` 1), so there is nothing to carry over.

### DEC-5. Commit, deploy, then push and tag

Every MainNet push must come from one pinned, whole-tree build.

**Decided 2026-11-11 (Kyle): deploy first, push after.** The contracts are deployed and updated from the local commits. The push and the tag come afterwards, so that the same push carries the SDK changes that point at the new app ids and ABI methods (step I2).

What this order needs, because nothing is on GitHub while the rollout runs:

- Deploy from one recorded commit of `release/mainnet-rollout`. Write its hash into the first receipt, and run `npm run release:manifest:check` before each stage: it proves the bytes about to be pushed are the bytes the manifest pins.
- CI has not run on this tree (the workflow only runs on a push). A1 is the same set of steps run by hand; repeat it on the deploy commit.
- Until the push the only copy of the release is one laptop. Keep a second copy before stage B, for example `git bundle create akita-release.bundle --all` stored somewhere else.
- The repo is public. The owner decided on 2026-11-17 that the audit records are not part of it: the `audits/` folder was removed and is kept privately.

### DEC-6. Independent audit of the immutable new contracts

**Parked 2026-11-11 with the Plugin DEX.** The independent audit was recommended for PluginDex v2, before H4. Stages B to H ship on the internal reviews and the 2026-11-09 readiness audit. The contracts in this rollout that cannot be patched after deploy are Gate v2 and the sub-gates, Rewards v2, the Phase 2a Update plugin and every rotated or new plugin. SocialClaim was one of them until it was left out on 2026-11-19. Upgradeable apps can be fixed later through the DAO.

## Sequence

Every command below is complete: run it as written, from `projects/akita-sc`, in the shell that step A0 sets up. A value in `<angle brackets>` is the only thing to fill in. `tests/rollout-runbook.test.ts` reads these blocks and fails when a command names a script, a flag, a contract, a target or a tracker step that does not exist.

**One command runs B1 to H6.** `scripts/rollout-mainnet.sh` runs every step below that has commands, in order, each line as it is written here. `scripts/rollout-testnet-rehearsal.sh` runs the same steps for the rehearsal (A4). Both start `scripts/rollout-run.sh`, which holds the lines, and `tests/rollout-runner.test.ts` fails when a line there differs from its block here. The steps can still be run by hand, one block at a time.

```bash
HEARTBEAT_MANAGER=<address> REV_NFD_SOURCE=<address> LABS_ADDRESS=<address> \
  ROLLOUT_COMMIT=<commit> bash projects/akita-sc/scripts/rollout-mainnet.sh
```

- **By hand before it:** rename the rehearsal's `receipts` folder (A4), fund the DAO creator (A5), ask the two Listing sellers (D1a), and put the node key in the shell (A0). It takes the DAO creator's key from the shell, or asks for it without showing it.
- **What it checks before its first command,** refusing to start otherwise: the checkout is at the commit named; the contracts, the scripts and the SDK source are that commit's (`networks.ts` aside, which `--register` writes); `receipts` holds no rehearsal; `NODELY_API_KEY` is set (`--public-node` goes without it); and the built programs are the ones `release/manifest.json` pins (DEC-5). It then asks for the word `mainnet`.
- **How it runs:** each send has its dry run first. It stops at the first command that fails and runs nothing after it; the next start carries on from there, because finished commands are listed in `receipts/mainnet-done.txt`. A plugin deploy that keeps no receipt (G2, G3) is not run a second time until you say whether the first created its app. `--until <step>` stops after a step, to go stage by stage; `--list` shows what is done.
- **By hand after it:** G4 and I2. I1 is not part of this rollout.

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
- `2.0.0` is the release label (the owner confirmed it on 2026-11-17). Version labels are free text; live apps carry 0.0.2, 0.0.3, 1.0.0 and 1.0.1 today.
- `CREATOR` is read from the chain by the tracker. `echo "$CREATOR"` should print one address, the one whose key was entered above.
- **The three addresses the owner supplies** are set here once and used by name: `HEARTBEAT_MANAGER` (G2a), `REV_NFD_SOURCE` (G3a) and `LABS_ADDRESS` (H6). Ids that a step creates are not typed either: the step that needs one reads it with `rollout:id`, from what the earlier step recorded (`--app <key>`, with `--address` for the app's address) or from the DAO wallet (`--escrow <name>`). `rollout:id` prints nothing when the value is not there yet, so the variable stays empty and the command that uses it refuses. `echo` a variable to see it.
- **The node key.** The public endpoints limit requests by address, and the TestNet rehearsal of 2026-11-25 was slowed by it. With `NODELY_API_KEY` set, every command of this runbook sends its requests to Nodely with the key; `read -rs` keeps it out of the shell history, and a command line never carries it. `NODELY_PLAN` names the plan the key belongs to, because a key is honoured only on its plan's hosts: `boost` (the default) is the public `nodely.dev` hosts, `unlimited` and `enterprise` are the `nodely.io` hosts. Each command prints a `Node:` line that names the host in use and says whether a key is sent; it never prints the key. Leave both unset to use the public endpoints. LocalNet ignores them.

```bash
nvm use
cd projects/akita-sc
read -rs DEPLOYER_MNEMONIC && export DEPLOYER_MNEMONIC
read -rs NODELY_API_KEY && export NODELY_API_KEY
export NODELY_PLAN=boost
export V=2.0.0
export CREATOR=$(npm run -s rollout:status -- --network mainnet | sed -n 's/^DAO creator: //p')
export HEARTBEAT_MANAGER=<heartbeat manager address>
export REV_NFD_SOURCE=<rev_nfd source address>
export LABS_ADDRESS=<Akita Labs LLC address>
mkdir -p receipts/gates receipts/phase2 receipts/phase3
```

#### A1. Re-verify the release tree (done on the local commits; repeat on the deploy commit and on the tag)

- **What:** Install from the lockfile, rebuild the whole tree, check that the build output and the release manifest did not change, and run the full suite on LocalNet.
- **Why here:** Every later step pushes these exact bytes. A single-file build changes router order, so only a whole-tree build counts (spec §9.3).
- **Requires:** none. **Script:** ready: `release:manifest:check` compares every program under `smart_contracts/artifacts` with `release/manifest.json`. The CI workflow (`.github/workflows/akita-sc-ci.yaml`) runs the same steps on every push.
- Done 2026-11-10 on a clean clone of the committed tree (Linux, Node 24): after `npm ci` and both builds, every artifact, generated client and SDK bundle was unchanged. The full suite then passed on LocalNet in six shards: 163 files, 2,596 tests, 2,589 passed, none failed (2 skipped, 5 todo), and it left the tree unchanged.
- Repeated 2026-11-11 on the tree without the Plugin DEX: the whole-tree build changed no remaining program, the SDK unit tests passed (49 files, 495 tests), and the full suite passed on LocalNet in six shards: 141 files, 2,224 tests, 2,217 passed, none failed (2 skipped, 5 todo), and it left the tree unchanged.
- Repeated 2026-11-16 on the working tree that holds the Guild fee asset work, the payer change and the fixes C18 to C25, none of it committed yet: the whole-tree build matches the regenerated manifest (155 programs), the SDK unit tests passed (49 files, 495 tests), and the full suite passed on LocalNet in six shards: 145 files, 2,272 tests, 2,265 passed, none failed (2 skipped, 5 todo), and it left the build output unchanged. Repeated again the same day after SocialClaim, Staking, AssetGate and the balance reader changed (audit C23, C26, C27): the whole-tree build matches the regenerated manifest (155 programs), the SDK's 496 unit tests passed, and the full suite passed: 146 files, 2,277 tests, 2,270 passed, none failed (2 skipped, 5 todo), again leaving the build output unchanged. Repeat it on the deploy commit.
- Repeated 2026-11-17 on a clean clone of commit 0a8d1b3, which makes AuctionFactory charge the auction creation fee (C33): after `npm ci` and both builds, every artifact, generated client and SDK bundle was unchanged, the manifest matched all 155 programs, and the SDK unit tests passed (50 files, 499 tests). The full suite then passed on LocalNet in six shards: 157 files, 2,367 tests, 2,360 passed, none failed (2 skipped, 5 todo), and it left the tree unchanged apart from the SDK source maps.
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

- **What:** Run every stage on TestNet with the same scripts, checking progress with rollout:status --network testnet after each step. Start with A4a, which gives TestNet's DAO wallet the escrows and grants MainNet's has.
- **Why here:** TestNet runs the same programs as MainNet for every target (re-read 2026-11-17; the two plugins that differ are replaced by G2), so the ABI guard and the K1 binding run against real deployed bytes. LocalNet runs the tree, so its ABI diff is empty.
- **Requires:** A2. **Script:** new: rollout-status.ts written today.
- **The commands differ from the MainNet ones in five places only.** `scripts/rollout-testnet-rehearsal.sh` applies them to the MainNet lines, so the rehearsal runs what MainNet will.
  - `-n testnet` for `-n mainnet`, and `--network testnet` for the tracker.
  - C2 and C3 no longer name live sub-gates by app id on either network: DEC-4 deploys all 18 again, so their receipts are the whole set (changed 2026-11-25; the TestNet ids the rehearsal used to pass are in the history of this file).
  - `deploy:haystack-router-plugin` stops on TestNet, for want of a router id. Skip it there and add `plugin:haystackRouterPlugin` to `--allow-pending` at I1.
  - `deploy:guild-factory` takes `--confirm-mainnet` on MainNet only.
  - G3b takes `--asset 10458941,752884771` on TestNet, where the revenue escrows hold neither USDC nor AKTA.
- `deploy:rewards-plugin`, `deploy:nfd-plugin`, `rewards:opt-in` and `rewards:withdraw-v1-credits` pick each network's own apps by themselves.
- **What TestNet cannot show as it stands** (state read 2026-11-17, see Live state):
  - F2 finds no wallet to sweep: the factory has created only the DAO wallet.
  - No Listing, Poll or Rewards v1 disbursement exists, so the live children, the legacy claims (DEC-1) and the v1 credit withdrawal (G2b) act on nothing.
  - After A4a the DAO wallet holds MainNet's 28 grants and 24 escrows, so the grant swap runs over the same list. Two things stay different. The account escrows `akta_creator` and `collections` are empty stand-ins on TestNet; MainNet's are accounts with holdings. And the three `nfdPlugin` grants sit on TestNet's older NFD plugin until G2 replaces it. Without A4a the wallet lacks the two account escrows and nine of MainNet's grants.
  - There is no Haystack router and no Akita NFD app, so the swap path and the Akita NFD reads are not exercised.
- **State to make first** (suggested 2026-11-17; the owner decides). TestNet runs the old programs today, so records made on it now are of the kind MainNet holds. Before B1: two or three wallets through the factory, one with automatic updates off; an open Listing; a Poll; a few posts and a follow; a subscription; a staking lock; and one Rewards v1 disbursement with an unclaimed allocation.
- TestNet PollFactory holds 0 ALGO. Its upgrade plans without funding (dry run 2026-11-17). E6a funds it.
- **Keep the rehearsal's receipts apart.** The steps write their receipts under `receipts`, and a step that finds a receipt resumes from it. After the rehearsal, rename the folder to `receipts-testnet` before MainNet's A0 makes a new one. `rollout-mainnet.sh` refuses to start while the rehearsal's files are there.
- **Measure the cost.** Note the DAO creator's balance before B1 and after I1. The difference sizes the MainNet top-up in A5. Done for the rehearsal of 2026-11-25, which stopped at H6: the figures are in A5.
- I1 on TestNet ends the creator's control of the TestNet DAO as it does on MainNet, and every later change there needs a vote. Stop before I1 to keep the TestNet DAO in Draft.

```bash
npm run rollout:status -- --network testnet
```

#### A4a. Give TestNet's DAO wallet MainNet's escrows and grants (TestNet only, before B1)

- **What:** One run reads MainNet's DAO wallet, read-only, and changes TestNet's until both hold the same escrows, escrow locks and plugin grants. The changes are DAO proposals that the creator executes at once. As read on 2026-11-17 the plan registers the account escrows `akta_creator` and `collections`, unlocks `stickers`, adds nine grants and removes the two grants only TestNet has: three proposals of 5, 5 and 4 actions.
- **Why here:** The owner asked for it on 2026-11-17. G2's grant swap (`update:dao-wallet-plugins`) reads the live grants and replaces each one, so on a wallet with MainNet's grants the rehearsal swaps what MainNet will swap. Run it before B1, while both networks still run the same plugin programs: the run matches each MainNet plugin app to a TestNet app by program.
- **Requires:** the TestNet DAO in Draft, and the DAO creator's key. **Script:** new 2026-11-17: `rollout:testnet-parity` (`scripts/testnet-dao-parity.ts`; the rules are in `scripts/lib/dao-wallet-parity.ts`). It refuses any target but TestNet. MainNet is only read, in dry-run mode, which never holds the key.
- **Not tracked by `rollout:status`.** Its own plan is the check: after the run, the dry run prints "Nothing to change", and the run itself fails unless a re-read shows that.
- **How a plugin app is matched.** A MainNet grant names a MainNet app. The run grants the newest TestNet deployment of the same plugin that runs the same program; the SDK registry lists every deployment on both networks. Where no TestNet app runs that program it takes TestNet's latest, and only when the MainNet grant is on MainNet's latest. Today that is the NFD plugin alone: MainNet redeployed it and TestNet's is the older program. G2 replaces it on both. `--plugin <mainnet app>=<testnet app>` names a match by hand.
- **The two account escrows.** On MainNet `akta_creator` and `collections` are ordinary accounts, rekeyed to the DAO wallet, with holdings. TestNet has no such accounts, so the run makes a stand-in for each: a new account that the creator funds with 0.2 ALGO and that rekeys itself to the TestNet DAO wallet in the same group. Its key is discarded. `--stand-in <escrow>=<address>` registers an account you rekeyed yourself instead.
- **Callers are carried by address.** The `rewardsPlugin` grant on `stickers` goes to E3H5NB…, the account that holds it on MainNet. If TestNet's sticker rewards are sent from another account, pass `--caller <mainnet address>=<testnet address>`.
- **TestNet's own grants go.** Two grants exist only on TestNet: an older `asaManagerPlugin` for the creator, and `rewardsPlugin` on `stickers` for the creator. The run removes them. `--keep-extra` leaves them.
- **What it never does.** It never touches the grant of the Update plugin that holds `pal.update`; B1 replaces that one. It stops, changing nothing, on an admin grant, a grant that expires at a round, an escrow that is an app on one network and an account on the other, or a plugin app it cannot match.
- **What it does not carry:** allowances and named plugins (neither wallet holds any; the plan reports them if that changes), what each escrow holds, the DAO's `otherAppList.akitaNfd`, and the source account of `rev_haystack`. TestNet has no Akita NFD app and no Haystack router to point those at.
- **Order inside the run.** The DAO checks every action against the wallet as it is when the proposal is created. The lock of an escrow the run creates, and the new terms of a grant it replaces, therefore go in a later proposal than the action they depend on, and each proposal executes before the next is created. Today's plan has neither case.
- **Cost** (dry run 2026-11-17): 445,500 µA of new DAO wallet storage, which the wallet holds; 0.4 ALGO for the two stand-ins; 1.15 ALGO of proposal storage on the DAO, which the run tops up from the creator if the DAO is short.
- Tested by `tests/dao-wallet-parity.test.ts` (the plan, against both wallets as read on 2026-11-17) and `tests/dao-wallet-parity.e2e.spec.ts` (LocalNet: real proposals, a stand-in, a replaced grant, and a second run that does nothing).

```bash
npm run rollout:testnet-parity -- -n testnet --dry-run --sender "$CREATOR"
npm run rollout:testnet-parity -- -n testnet --confirm
npm run rollout:testnet-parity -- -n testnet --dry-run --sender "$CREATOR"
```

#### A5. Fund the accounts the steps draw on

- **What:** Top up the deployer, and confirm the DAO wallet holds the page-growth sponsorship.
- **Why here:** A step that runs short mid-group wastes a proposal window.
- **Requires:** none. **Script:** manual.
- DAO creator (the deployer): 7.63 ALGO free on MainNet (61.10 held, 53.47 minimum balance; read 2026-11-17). It creates every new app, and each one raises its minimum balance. Top it up before B1 by what the TestNet rehearsal spent (A4), with margin.
  - **Measured on the rehearsal (2026-11-25, from the TestNet indexer):** B1 to H6 took 266.5 ALGO from the creator in payments and fees. 200 of it is H1a's two Meta type fees, which Meta owes to the DAO. The rest went to the DAO app (19.2), the new Update plugin (8.8), six factories (25.6 between the two guild factories and the staking pool, wallet, auction and raffle factories) and the new apps' own balances; fees were 1.1. The 49 apps it created hold another 19.6 ALGO of its minimum balance. A4a, which MainNet does not run, cost 0.45 more.
  - **For MainNet** add the 7.3 ALGO of the wallet pages (below) and the Haystack plugin, which TestNet does not deploy: about 295 ALGO in all, against 7.63 free (read again 2026-11-25). Send more than that, since MainNet's apps hold other balances than TestNet's. A run that comes up short stops at that command and carries on from it once the account is funded.
- DAO wallet: 10.65 ALGO sponsorship (has 43.37 free). It was 10.55 before Subscriptions took a sixth page on 2026-11-15.
- Wallet factory (3569556257): 7.3 ALGO for the fifth program page of its 73 wallets, 0.1 ALGO each. It has 1,121 µALGO free (read 2026-11-20). F1 and F2 pay it from the deployer as they run, so the deployer's top-up includes it. F0 creates one more app, which holds 0.1 ALGO of the deployer's balance.
- StakingPoolFactory box growth +1.842 ALGO and AuctionFactory +14,800 µA; the Phase 2 runner pays both.
- AkitaSocialModeration, PrizeBoxFactory and HyperSwap hold 0 µA today. E6a sends them 1.3 ALGO in all.

### Stage B: Upgrade path and DAO

The new Update plugin first; then the DAO upgrades itself through it.

#### B1. Phase 2a: install the new UpdateAkitaDAOPlugin

- **What:** Deploy the page-growing Update plugin and run ONE proposal: UpdateFields pal (update = new; optin and revenueManager unchanged), AddPlugin new (global, execution key), RemovePlugin old 3569559689. Then record the id and rebuild the SDK.
- **Why here:** The live plugin pushes at most 3 chunks and never grows pages, so it can push neither the DAO (10,866 B) nor AkitaSocial or Subscriptions. Every target accepts updates only from pal.update, so role and grant move together.
- **Requires:** A2. **Script:** ready.
- **Tracked by rollout:status as** `phase2a`.
- The pal write replaces the whole struct: it must carry optin 3569560490 and revenueManager 3642325118.
- The live validator caps proposal settings power at 1,000; the AddPlugin settings must fit.
- Until B2 lands, every Update-plugin group carries the K1 proposal note. runUpdate now adds it automatically (fixed today).
- **The Update grant has no method list, and has to stay that way through Phase 2.** Every Phase 2 upgrade sends `setClearProgram`, and a target whose schema grows is upgraded with `updateAppWithSchema`. B1 copies the old grant's method list to the new plugin as it is, and the SDK's `updateApp()` selector list (the form a method-restricted grant is built from) names neither method. Both live grants are global, use an execution key and name no method (MainNet wallet grant of plugin 3569559689, TestNet 763128671, read 2026-11-25), so nothing has to change. If the B1 dry run ever prints a method count other than `methods=0 -> 0` for the Update grant, stop: add `setClearProgram` and `updateAppWithSchema` to the list before any Phase 2 step.
- **The plugin's staging box holds whatever it last uploaded.** Every program goes into one box (`bc`) on the plugin's own account, which each Phase 2 run resizes and the runner tops the plugin up for: 2,500 + 400 µALGO per byte. The largest in this release is the StakingPool child at 13,472 B, so 5,392,100 µALGO, and the deployer pays it. That ALGO stays in the plugin's account as minimum balance after the last update, because nothing in the sequence calls `deleteBoxedContract`; call it from the DAO wallet after G3 if the balance is wanted back, and expect the next release to pay it again.

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
- The validator's shape check is a length check, not a per-field one: a value of the right length always decodes (audit 04, DAO-04). What is refused is a value of the wrong length, and the one field it looks inside is `oal.daoProposalValidator`, which may not be 0.
- Time-weighted votes (2026-10-12, audit DAO-04 option 4B): approve / reject / abstain tally power in base units (2026-10-13), amount x min(days left, 365) / 365 (0 with under a week left; a lock must outlast the vote). A voter with 0 power cannot vote (errNpow), and a re-vote after power fell to 0 is refused, so the cast vote stands. Quorum counts the locked amount (base units) that voted against the amount locked at submit, so aged locks with full turnout reach quorum. Proposals voted before the upgrade (no tally box) still compare their recorded power with live locked stake.
- Vote box v2: new receipts are `'w'` + proposal id + voter → (type, power, weight), 25,700 µA. Legacy `'v'` receipts are replaced on a re-vote and refunded at 22,500 by deleteProposalVotes.
- Participation record: `'r'` + voter → (lastVotedTs, lastProposalID, votes), 25,300 µA paid with the first vote, never deleted. Read through `getGovernanceParticipation` (GovernanceParticipationGate, revenue payouts).
- Lockstep: the deployed AkitaDAOPlugin pays 22,500 per vote and reverts on the upgraded DAO. Deploy the tree AkitaDAOPlugin and rebuild the SDK (`akita-sdk/dao` quotes the exact deposit) in the same window as this upgrade; F-stage plugin rotation must not lag for the DAO plugin.
- Proposal power thresholds are base units from B2 on (2026-10-13; `utils/defaults.ts` is 600/300/200 tokens x 1e6). Every `power` the live DAO already stores (the nine `*_ps` proposal settings globals and each global execution-key plugin's DAO settings) is in whole token-years and reads 1e6 times lower after B2. Thresholds are not enforced while the DAO is in Draft. The globals are rescaled in I1 (`dao:rescale-power`); a plugin's settings are rescaled when its grant is swapped in G1, G2 or G3, because the swap copies them. The new validator caps `power` at 1e15.
- The last two lines deploy and record the tree AkitaDAOPlugin for the lockstep above. The DAO wallet holds no grant of it, so there is nothing to swap.
- From here on, each bootstrap UpgradeApp/ExecutePlugin window must end within 10,000 rounds of executeProposal.
- **Safe to start again.** If `update:dao` stops after the pointer update and before the DAO upgrade, run the same command again. It finds that the DAO already points to a validator running the tree program, deploys no second one, and goes on to the upgrade. A stop after the proposal is resumed with `--dao-only --proposal-id <id>`.
- **The validator goes in before the DAO, and that order holds for every release that adds a field.** The validator checks each `UpdateFields` value by its encoded length (`aal` 96 B, `sal` 32, `pal` 24, `oal` 56, and one case per fee field), so a release that adds a slot to a list or a fee field must install the new validator first: the DAO would otherwise refuse the proposal that writes it, and a DAO whose list is longer than the deployed readers expect fails every reader at once. `update:dao` does them in this order. 2.0.0 adds the fee field `inference_fees` and changes no list length (audit 13, XSY-06).

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
- `--cost` is in microAlgos: GuildFactory takes the creation fee as an ALGO payment and forwards it to the DAO's escrow, as every other creation fee in the protocol is taken. The owner first named 100,000 AKTA and, told that the factory cannot charge AKTA, chose to keep the fee in ALGO and set it to **200 ALGO**, 200000000 microAlgos (2026-11-17). For scale: at the reserves of the Tinyman AKTA/ALGO pool read that day, 100,000 AKTA was about 205 ALGO. The creation fees live today are 100 ALGO for a subscription service, 50 for a staking pool, 10 each for an auction and a raffle, and 0 for a wallet; B3a changes three of them. The DAO can change the fee later by proposal.

```bash
npm run update:guild-creation-cost -- -n mainnet --cost 200000000 --dry-run --sender "$CREATOR"
npm run update:guild-creation-cost -- -n mainnet --cost 200000000
```

#### B3a. Set the staking pool, auction and raffle creation fees

- **What:** One proposal with two UpdateFields actions: `staking_fees.creationFee` from 50 to 100 ALGO, and in `nft_fees` both `auctionCreationFee` and `raffleCreationFee` from 10 to 50 ALGO. The owner set the three amounts on 2026-11-17. UpdateFields replaces a whole struct, so the script writes the other 15 members back as it read them and compares every member afterwards.
- **Why here:** In Draft the creator's proposal executes at once. After `initialize()` a fee change needs a vote. Both networks hold the same fees today (read 2026-11-17), so the same command fits both.
- **Requires:** B2. **Script:** new 2026-11-17: `update:creation-fees` (`scripts/update-creation-fees.ts`; the rules are in `scripts/lib/creation-fees.ts`). It plans unless `--confirm` is given. Each amount is in microAlgos, and a fee left out is not changed.
- **Not tracked by `rollout:status`.** The plan is the check: after the run, the dry run prints "Nothing to change".
- **The staking pool and raffle fees take effect with the proposal.** StakingPoolFactory and RaffleFactory read their fee from the DAO on every call and add it to the payment that creates a pool or a raffle. The DAO wallet still creates pools without the fee.
- **The auction fee takes effect at E4.** The AuctionFactory live today has never read `auctionCreationFee`: creating an auction costs storage only, whatever the DAO stores. The owner decided on 2026-11-17 that the factory charges it, and this release's AuctionFactory does (C33): it adds the fee to the cost it quotes, takes it on all four creation methods and sends it to the `rev_auction` escrow, as RaffleFactory does with its fee. So between this step and E4 the 50 ALGO is stored and not charged, and from E4 on every new auction pays it.
- **An SDK fault this step ran into:** the SDK encoded `nft_fees` with a struct name the DAO does not have (`NftFees` for `NFTFees`), so no proposal that changes `nft_fees` could be built. It is fixed in `akita-sdk/src/dao/index.ts`, and the built SDK the scripts read is rebuilt in the same commit.
- Tested by `tests/creation-fees.test.ts` (the plan, against the fees both DAOs hold), `tests/creation-fees.e2e.spec.ts` (LocalNet: after the proposal the factories quote 50 ALGO more for a pool and 40 more each for a raffle and an auction) and `akita-sdk/src/dao/update-fields.test.ts` (the encoding).

```bash
npm run update:creation-fees -- -n mainnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --dry-run --sender "$CREATOR"
npm run update:creation-fees -- -n mainnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --confirm
```

#### B3b. Set the revenue split to 80/5/15

- **What:** One proposal with one UpdateFields action that rewrites the DAO's `revenue_splits`: `rec_krby` (Labs) from 40% to 80%, `rec_mod` (moderators) from 20% to 5%, `rec_gov` (governance) from 40% to 15%. The owner set the shares on 2026-11-18. The receivers and their order stay as they are.
- **Why here:** In Draft the creator's proposal executes at once. After `initialize()` a change of the split needs a vote. Both networks hold the same table and the same nine revenue escrows that read it (read 2026-11-18), so the same command fits both.
- **Requires:** B2. **Script:** new 2026-11-18: `update:revenue-splits` (`scripts/update-revenue-splits.ts`; the rules are in `scripts/lib/revenue-splits.ts`). It plans unless `--confirm` is given, and reads the table back after the proposal.
- **Not tracked by `rollout:status`.** The plan is the check: after the run, the dry run prints "Nothing to change".
- **It applies to every source at once.** The nine registered revenue escrows hold a reference to this table, and the RevenueManager reads it at each allocation. An escrow registered later by G3a (`rev_nfd`, `rev_guilds`, `rev_meta`) reads it too. The plan lists the escrows that read the table, and names any that holds a split of its own.
- **It takes effect at the next payout.** A payout divides what a revenue escrow holds when it runs. No split has been paid on MainNet (every escrow's last payout is 0, read 2026-11-18), so the first payout after G3 divides everything built up so far at 80/5/15. Until this step runs, a payout cycle started through an escrow's open grant would divide ALGO at 40/20/40.
- **No program caps a share.** The RevenueManager requires at most ten entries whose percentages total 100%, and nothing more. The dry run simulates the proposal's creation and execution as the creator against the DAO program live at that moment, and stops if the DAO would reject it.
- **What the step refuses:** shares that do not total 100%, a share of 0, a receiver that is not in the table today or one left out, a stored table that holds a flat or remainder entry, and a change while a payout cycle is open on an escrow that reads the table. The table is read at each allocation, so a cycle open across the change would pay part at the old shares.
- **The last entry takes the rounding remainder** of each payout. That is `rec_gov`, before and after.
- **To undo it,** run the same command with the old shares: `--split rec_krby=40,rec_mod=20,rec_gov=40`.
- Planned on MainNet and on TestNet on 2026-11-18, read-only: three shares change, nine revenue escrows read the table, the proposal costs the creator no fee and the DAO holds the storage, and the simulation passes on both.
- Tested by `tests/revenue-splits.test.ts` (the plan, against the table MainNet holds, down to the stored bytes) and `tests/revenue-splits.e2e.spec.ts` (LocalNet: a payout divides 40/20/40 before the proposal, and two other revenue escrows divide 80/5/15 after it; the change is refused while a cycle is open, and the same step moves the table back).

```bash
npm run update:revenue-splits -- -n mainnet --split rec_krby=80,rec_mod=5,rec_gov=15 --dry-run --sender "$CREATOR"
npm run update:revenue-splits -- -n mainnet --split rec_krby=80,rec_mod=5,rec_gov=15 --confirm
```

### Stage C: Gate v2

Six Phase 2 targets call Gate.checkFor / mustCheckFor, which Gate v1 does not route.

#### C1. Deploy Gate v2 and every sub-gate

- **What:** Deploy Gate v2 (legacyCutoff 1: v1 never registered a gate) and all 18 sub-gates (DEC-4), each with a receipt.
- **Why here:** Gate v1 and every sub-gate are immutable, so the fixes ship as new apps. Nothing needs importing (v1 gate_cursor = 1).
- **Requires:** A3. **Script:** fixed: the deploy checks the cutoff against Gate v1's live cursor (2026-11-25, audit 13 XSY-05). It refuses `--legacy-cutoff 1` if anyone has registered a gate on v1 in the meantime, and names the value to pass instead; the check runs until the Gate's receipt names its app, after which the create cannot change. The cutoff cannot be changed afterwards, and a v1 id at or above it can never be imported.

```bash
npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --dry-run --sender "$CREATOR"
npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --manifest-dir receipts/gates
```

- ModeratorActivityGate (new, 2026-10-12, Kyle approved): "at least N counted moderation actions in the current 7-day epoch (plus the previous one)". Deploy it here: after C3 only a DAO proposal can allowlist it. Its checks fail until E1 upgrades AkitaSocialModeration (`moderatorActivity`).
- GovernanceParticipationGate (new, 2026-10-12, Kyle approved): "at least minVotes distinct DAO proposals voted on, the last within withinSeconds (0: any time)". Deploy it here, before C3 sealImports, for the same reason. It reads `AkitaDAO.getGovernanceParticipation`, so its checks fail until B2.

#### C2. Allowlist every sub-gate

- **What:** As the Gate creator, allowlist the 18 sub-gates C1 deployed (context-aware flag for AkitaReferrer, Subscription, SubscriptionStreak, ModeratorActivityGate, GovernanceParticipationGate).
- **Why here:** After the seal only the DAO wallet can change the allowlist, and no DAO action calls setSubGate directly.
- **Requires:** C1. **Script:** ready. Between C1 and C4 the SDK still names Gate v1, so both this step and C3 take Gate v2's id from its receipt in `--manifest-dir` (fixed 2026-11-16; `--gate <id>` overrides it).
- Every sub-gate must run the current artifact of its name: since 2026-11-25 the script refuses any other program, with or without a receipt (audit 13). The allowlist is what makes a program trusted by every gate that names it, and after the seal only a DAO proposal can take an entry out.
- No `--sub-gates` list of live app ids is passed any more: DEC-4 deploys every sub-gate again, so the receipts in `--manifest-dir` are the whole set.

```bash
npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n mainnet --manifest-dir receipts/gates --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n mainnet --manifest-dir receipts/gates
```

#### C3. Seal Gate imports

- **What:** Call sealImports, which hands allowlist control to the DAO wallet.
- **Why here:** Ends the creator's migration window. The script refuses while any expected sub-gate is not allowlisted.
- **Requires:** C2. **Script:** new: seal-gate-imports.ts written today (gap G5). Since 2026-11-25 it also refuses while any sub-gate of the tree has no receipt in `--manifest-dir` (or is named with `--sub-gates`): one left out here could afterwards be added only by a DAO proposal.

```bash
npm run seal:gate-imports -- -n mainnet --manifest-dir receipts/gates --dry-run --sender "$CREATOR"
npm run seal:gate-imports -- -n mainnet --manifest-dir receipts/gates
```

#### C4. Point aal.gate at Gate v2

- **What:** Guarded UpdateFields aal (gate = v2; every other field unchanged), and the SDK ids of Gate v2 and of every sub-gate deployed in C1. The command is C1's with `--register`: each receipt resumes at its registration, and nothing is deployed twice.
- **Why here:** Phase 2 now refuses AkitaSocial, Subscriptions, Marketplace, StakingPoolFactory, AuctionFactory and RaffleFactory until aal.gate routes checkFor/mustCheckFor (encoded today).
- **Requires:** C3, B2. **Script:** ready.
- **Tracked by rollout:status as** `gate`.
- The live GatePlugin is pinned to Gate v1 and keeps registering there silently; rotate it in G2.

```bash
npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --manifest-dir receipts/gates --register
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
- Before the upgrade, run the SOC-13 check (audit 08). A vote or reaction made on the deployed program is stored under the first 16 bytes of its ref; the upgraded program accepts such an entry only against a ref whose post existed before the cutoff, which stops a look-alike minted afterwards but cannot tell apart two pre-cutoff refs that share those 16 bytes. The check lists the live `posts` boxes at one round and refuses the upgrade if any pair does. It sends nothing, needs no key, and takes about a second per thousand posts.
- Moderator activity fix (Kyle approved 2026-10-12): the upgraded AkitaSocialModeration writes `lastActive` on every successful moderation action (the live app never wrote it, so every SocialModeratorGate "active since" check saw 0). It also counts state-changing actions per moderator per 7-day epoch in a new `'k'` box (25,300 µA) and adds the readonly `moderatorActivity` (read by ModeratorActivityGate, C1). `addModerator` now creates `'d'` and `'k'` together and `removeModerator` deletes both, so each moderator holds 44,200 µA of the Moderation app's own balance, released back to that balance on removal; flag, unflag and content-flag actions allocate nothing. The ABI is additive, the `'d'` box layout is unchanged, and the deployed SocialModeratorGate keeps working. The live app has 0 moderators and 0 µA: before the first addModerator proposal, fund it with 100,000 µA (account minimum) + 44,200 µA per moderator + 18,900 µA per concurrent ban.

```bash
npm run check:social-legacy-prefixes -- -n mainnet
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AkitaSocial,AkitaSocialGraph --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AkitaSocial,AkitaSocialGraph --confirm
npm run update:social -- -n mainnet -v "$V" --contracts socialImpact,socialModeration --dry-run --sender "$CREATOR"
npm run update:social -- -n mainnet -v "$V" --contracts socialImpact,socialModeration
```

#### E2. Subscriptions

- **What:** Phase 2 Subscriptions (pages 4 → 6: the program is 10,818 B with the audit fixes of 2026-11-25, 10,801 B since the featured service of 2026-11-16, and was 10,468 B with the payer records of 2026-11-15).
- **Why here:** Hinted subscribe paths back the new SubscriptionsPlugin and the subscription guild consensus.
- **Requires:** C4, D2, B1, **and E2a below**. **Script:** ready.
- **Tracked by rollout:status as** `p2:Subscriptions`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- DAO wallet sponsors 3,528,000 µA (3,428,000 while the program still fitted 4 extra pages). 1,470 B of headroom left in 5 extra pages.
- Do not run this before E2a. The upgraded program charges the whole service reserve at creation and takes nothing in `setServiceDetails` / `setServiceMedia`, so a service created before the upgrade can grow its text to the maximum for free, out of the app's own balance, which is where subscribers' escrowed ALGO sits (audit 07, SUB-02).

```bash
npm run fund:subscription-reserve -- -n mainnet --dry-run   # must print "nothing to send"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Subscriptions --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Subscriptions --confirm
```

#### E2a. Top the Subscriptions app up to the service storage reserve (before E2)

- **What:** One plain payment to the Subscriptions app, of what the services that already exist could still take in storage, over and above the ALGO its subscribers hold in escrow. When the audit read MainNet that was 4,718,400 µA of reserve for four 451-byte service boxes against 3,434,000 µA of free balance, so 1,284,400 µA to send. The script works the numbers out from the chain each time; send what it prints, not this figure.
- **Why here:** The deployed program charges 62,500 µA for a service box that starts at 168 B and may grow to 3,441 B. The upgraded program charges the whole `ServicesMBR` (1,378,900 µA) at creation instead, so its two setters are free, and a pre-upgrade service pays nothing for that growth. Every byte raises the app's minimum balance, which is paid out of the free balance holding subscribers' escrowed ALGO. One merchant enlarging their service text could therefore block every withdrawal, unsubscribe and ALGO renewal until the text was shrunk again (audit 07, SUB-02).
- **Requires:** none. Any funded account can send it, and it can run days before E2. **Script:** ready: `fund:subscription-reserve` plans without `--confirm`, sends only the shortfall and reads the balances back. A rerun sends nothing.
- **Tracked by rollout:status as** `subscription-reserve`.
- The check is `(balance − minimum balance) ≥ Σ ALGO escrow + Σ (ServicesMBR − MBR of each service box)`. It counts only subscriptions whose escrow asset is 0; an ASA escrow does not draw on the balance.
- Rerun the dry run right before E2 and make sure it prints "nothing to send". A service created or enlarged between the top-up and the upgrade changes the number.
- From the upgrade on, a new service pays its own reserve, so this step is needed once and never again.

```bash
npm run fund:subscription-reserve -- -n mainnet --dry-run
npm run fund:subscription-reserve -- -n mainnet --confirm
```

#### E3. Marketplace + Listing

- **What:** Phase 2 Marketplace with the rev-3 Listing child in one group.
- **Why here:** The 2 live Listings route every method the new Marketplace calls; new listings get seller referrals.
- **Requires:** C4, D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:Marketplace`.
- Run E1–E3 immediately after D2: until each service upgrades, its referral payouts revert at Rewards v2.
- K8: keep ≥ 500,000 µA + 189,600 µA per open legacy-paid listing free in the Marketplace (176,800 for a prize box; 1,905,400 free covers 7). The float is the 164,000 creator MBR plus 12,800 for each disbursement the deployed plugin quotes at the v1 MBR (prize + referral; referral only for a prize box).
- **From this step a prize opt-in no longer touches the revenue escrow** (audit 09, MKT-01): the factory opts itself in to the asset being sold, so listing an NFT no longer waits for the DAO revenue escrow's payout cycle to be idle. A new *payment* asset still takes the full route through that escrow, which only the escrow's registered source may ask for. This app id is that source for `rev_marketplace` and the upgrade does not change it, so nothing has to be re-registered here. If a later release ever deploys the Marketplace as a new app, register the new app as the source (`register:revenue-escrow --source`) before its first listing in a new payment asset.
- **A listing settles to the escrow its Marketplace names at that moment** (audit 13, XSY-03), not the one it was created under, so `update:app-dao-escrow` on the Marketplace moves the next sale's fee and the live Listings need no change.

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
- From this step on AuctionFactory charges the DAO's auction creation fee (C33; 50 ALGO after B3a, 10 ALGO if B3a has not run). `newAuctionCost` includes it, and the SDK and AuctionPlugin v3 pay what `newAuctionCost` quotes. A caller that works the cost out itself is short by the fee and is refused (`errIpay`). Creation sends one more inner payment, so a caller that sets a fixed fee needs 1,000 µA more.
- Auction child is 8,521 B: +0.1 ALGO MBR per auction.
- **The live children keep their own program.** The factories stage the new child for new auctions and raffles only. Do not push the new program into an auction or raffle that already exists: the new children declare another schema (no `w_totals` global) and keep their weights in boxes the old ones kept in globals, so the new code would misread them. Let the live ones finish, and read them with the SDK, which decodes both layouts.
- Raffle child is 8,151 B, one upload chunk more than before the audit fixes, so the RaffleFactory group is 14 transactions (the limit is 16). It has 37 B left in its four pages: `auction/principal-abi.test.ts` fails if it takes a fifth.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AuctionFactory,RaffleFactory --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AuctionFactory,RaffleFactory --confirm
```

#### E5. StakingPoolFactory + StakingPool

- **What:** Phase 2 StakingPoolFactory with the 13,472 B child (exactly 16 txns: seven upload chunks of 2,026 B, as at 13,272 B).
- **Why here:** The runner refuses this target until Staking, Rewards v2 and Gate v2 are live; all three are hard callee dependencies.
- **Requires:** D1, D2, C4, B1. **Script:** fixed: Gate dependency added today; the Rewards dependency now also covers the referral reclaim overloads.
- **Tracked by rollout:status as** `p2:StakingPoolFactory`.
- New pools cost 3 more pages (+300,000 µA) and ~447 µA fee surcharge; static quotes in other frontends go stale.
- **The live pools keep their own program.** The factory stages the new child for new pools only. Do not push the new program into a pool that already exists: it declares one more global uint (`live_entries`, STK-04) and counts a round's eligible stake differently (STK-02), so the new code would misread an open round.

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
- PrizeBoxFactory holds 0 µA today, so a mint cannot succeed on MainNet until E6a funds it. The same holds for HyperSwap offers.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target PollFactory --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target PollFactory --manifest-dir receipts/phase2 --register --confirm
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target HyperSwap --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target HyperSwap --manifest-dir receipts/phase2 --register --confirm
(cd ../akita-sdk && npm run build)
npm run update:prize-box -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run update:prize-box -- -n mainnet -v "$V"
```

#### E6a. Give the empty service accounts their minimum balance

- **What:** One plain payment to each service app whose account is short: 0.1 ALGO to HyperSwap and to PrizeBoxFactory, and 1.1 ALGO to AkitaSocialModeration, which is its 0.1 ALGO minimum and a float of 1 ALGO. That is 1.3 ALGO on MainNet. On TestNet PollFactory is empty too, so 1.4 ALGO there (both planned 2026-11-18).
- **Why here:** HyperSwap, PrizeBoxFactory and PollFactory charge a caller exactly the storage a call adds. The account's own 0.1 ALGO minimum is not part of that charge, so while the account is empty every offer, mint and poll fails with a balance below the minimum. AkitaSocialModeration takes no payment: it pays for its moderator, ban, action and activity boxes from its own balance. All three hold 0 on MainNet today.
- **Requires:** none. Any funded account can send it, before or after the upgrades. **Script:** ready: `fund:service-accounts` plans without `--confirm`, sends only what is short and reads the balances back. A rerun sends nothing.
- **Tracked by rollout:status as** `service-accounts`.
- The float pays for about forty moderation boxes: 18,900 µA for a moderator or a ban and 25,300 µA for a moderator's activity record. `--moderation-float` sets another amount in µALGO. The tracker shows the free balance, and reads the step as not done again once less than 44,200 µA is free. Watch it with K4 and K8.

```bash
npm run fund:service-accounts -- -n mainnet --dry-run --sender "$CREATOR"
npm run fund:service-accounts -- -n mainnet --confirm
```

#### E7. Wallet factory + wallet child (atomic) (one-way)

- **What:** Phase 2 AbstractedAccountFactory and the AVM 13 AbstractedAccount child in ONE group.
- **Why here:** The tree factory creates only the 11-argument AVM 13 wallet; the live factory cannot create it. Splitting them stops all wallet creation (ACCT-3).
- **Requires:** D2, B1. **Script:** ready.
- **Tracked by rollout:status as** `p2:AbstractedAccountFactory`.
- K2 lockstep: ship the SDK release and every wallet-creating frontend/backend in the same hour.
- From this moment anyone can push the AVM 13 wallet into any automatic wallet, the DAO wallet included. Run F right after.
- Never change aal.wallet: every principal check pins wallet genuineness to it.
- The child is 8,918 B (8,750 B before the audit fixes of 2026-11-25, 8,743 B on 2026-11-20): five upload chunks as before, in the one group. The factory's child box grows by 732 B, 292,800 µALGO, which the runner pays. A wallet created from here on has five program pages and costs 0.1 ALGO more; the factory's `cost` quotes it.
- Until F1 and F2 have funded the factory, a push into a four-page wallet fails: the factory cannot hold the fifth page.

```bash
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AbstractedAccountFactory --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AbstractedAccountFactory --confirm
```

### Stage F: Wallets

AVM 13 is one-way; do it deliberately right after E7.

#### F0. New storage quote helper for wallets

- **What:** Deploy the tree's AbstractedAccountMBR and point the SDK's `walletMbr` at it.
- **Why here:** The helper cannot be updated. The deployed one does not know the count a new escrow stores since 2026-11-20 (6,100 µALGO plus 400 per byte of the name), so on an updated wallet it quotes a new escrow too low, and the rollout's own scripts fund the DAO wallet from that quote.
- **Requires:** none. Any funded account can deploy it. **Script:** ready. A run that finds the SDK's helper on the tree program deploys nothing.
- **Tracked by rollout:status as** `wallet-mbr`.
- The old helper (3642282698) stays on chain for SDK versions that name it. On a wallet that is not updated yet the new helper quotes a new escrow too high by the count's cost, which is harmless. The SDK with the new id ships in the K2 lockstep.

```bash
npm run deploy:wallet-mbr -- -n mainnet --dry-run --sender "$CREATOR"
npm run deploy:wallet-mbr -- -n mainnet --register
(cd ../akita-sdk && npm run build)
```

#### F1. Upgrade the DAO wallet (one-way)

- **What:** UpdateWallet proposal: the factory pushes the staged wallet into the DAO wallet.
- **Why here:** The tree DAO and validator call arc58_getNamedPluginKey for RemoveNamedPlugin; the live wallet does not route it.
- **Requires:** E7. **Script:** ready.
- **Tracked by rollout:status as** `dao-wallet`.
- Spec §9.5 step 4 puts this before Phase 2; that cannot run (ROLLOUT-5). This order is the executable one.
- The DAO wallet gains a fifth program page. The script reads what the wallet factory lacks for it, 100,000 µALGO, prints it, and pays it from the sender before the proposal. The dry run prints the amount and pays nothing.

```bash
npm run update:dao-wallet -- -n mainnet --dry-run --sender "$CREATOR"
npm run update:dao-wallet -- -n mainnet
```

#### F2. Sweep the 72 user wallets

- **What:** Push the tree wallet into every automatic-update wallet.
- **Why here:** R-STALE (the stale escrow registry) closes per wallet only when it runs the new program.
- **Requires:** E7. **Script:** ready.
- Resumable with --skip-current. A rerun pays the factory only what is still short.
- Each wallet gains a fifth program page, which raises the wallet factory's minimum balance by 100,000 µALGO. The script reads the staged program and every wallet's pages, prints what the factory lacks, and pays it from the sender before the first update: 7.2 ALGO for the 72 wallets left after F1. It covers the wallets it does not update too, so a wallet whose admin updates it later does not fail. `--targets-only` covers this run's wallets alone.
- One update costs about 2,100 µALGO in fees.

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
- **The MarketplacePlugin's `list` selector changes with this release** (audit 09, MKT-03): `maxCreatorRoyalty` is a new last argument, the highest creator royalty the seller accepts, read when the call lands. A method-restricted grant that names the old selector stops routing `list`, so swap such a grant with this step rather than keeping it. The SDK sends the deployed ABI for the plugin ids that still route the old one, as it already does for `purchase`, and a backend or keeper that builds the call by hand needs the new selector and a royalty bound. `purchase` and `listPrizeBox` are unchanged.

```bash
npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -v "$V" --swap --add-new-methods --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -v "$V" --manifest-dir receipts/phase3 --swap --add-new-methods --register --confirm
(cd ../akita-sdk && npm run build)
```

#### G2. Every other live plugin

- **What:** Rotate StakingPlugin (after D1), RewardsPlugin (after D2; pins legacyRewards), GatePlugin (after C4), AkitaDAOPlugin (after B2), NFDPlugin (MISC-1 price caps), HaystackRouterPlugin (MISC-2), and the four whose only source change is the C1 and C2 fix: OptInPlugin, SelfOptInPlugin, AsaManagerPlugin and DualStakePlugin. PayPlugin is rotated in H1, because it is created with Meta's app id. PaySiloPlugin and PaySiloFactoryPlugin are not rotated: release 2.0.0 deprecates them (H6).
- **Why here:** Each fixes a live issue or calls a method only the new service has. The rule (Kyle, 2026-11-11, closing audit R9) is to rotate every plugin whose code changed at all; the apps prompt each wallet to move to the new version.
- **Requires:** D1, D2, C4, B2. **Script:** ready. Five plugins deploy through the receipt-keeping catalog (`deploy:immutable` aliases). The other eight have their own older scripts, which keep no receipt and record the new id themselves (G11): if one is interrupted after it created the app, record the id it printed by hand instead of running it again.
- **Tracked by rollout:status as** `plugin:stakingPlugin` (one step per plugin, `plugin:<key>`).
- RewardsPlugin: create it with `legacyRewards` = v1 (3569556095). It adds `claimLegacyRewards` and `reclaimLegacyRewards` (DEC-1). When its DAO and backend grants on the `stickers` escrow move to the new plugin, add `reclaimRewards`, `claimLegacyRewards` and `reclaimLegacyRewards` to their method lists; method-restricted grants do not pick up new methods on their own.
- RewardsPlugin grants on the `stickers`, `rec_mod` and `rec_gov` escrows must list the new 8-arg `createDisbursement(uint64,bool,string,uint64,uint64,string,uint64,address)uint64` (0x2946dd1d), which passes `reclaimTo` (2026-10-11). The 7-arg selector (0x3aae182b) records no reclaim target. `RewardsPluginSDK.createDisbursement()` with no args, and the plugin migration of the old 0x08c25eff grant, list both.
- OptIn, Pay, PaySilo, PaySiloFactory, SelfOptIn, AsaManager and DualStake were compiler-only changes when this runbook was first written. The audit fix for C1 and C2 (2026-11-09) changed their behavior: each now refuses a wallet whose spending account it does not control. The live versions keep C2 (what is exposed is the plugin account's spare ALGO and a reclaim nuisance) until each wallet has moved. The two live pay silo plugins get no new version, so they keep it.
- OptInPlugin is also `pal.optin`, which 67 wallets granted (count read 2026-10-10). Deploy and record the new version so the apps prompt for it, and repoint `pal.optin` only after those wallets have moved; read the count again first.
- A rotation is a new app id. `--register` appends it to the plugin's history in `networks.ts` (`MAINNET_PLUGIN_DEPLOYMENTS`), which is what the apps read to offer the update. The old app stays on chain and keeps working for wallets that have not moved.

All 23 live plugins and the step that rotates each (the two pay silo plugins are deprecated and stay as they are). Every one differs from this build (MainNet programs read 2026-11-11, compared with the compiled approval program of each artifact):

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
| `payPlugin` | 3569560828 | H1 (after Meta) |
| `paySiloPlugin` | 3569561570 | not rotated: deprecated (H6) |
| `paySiloFactoryPlugin` | 3569561636 | not rotated: deprecated (H6) |
| `selfOptinPlugin` | 3644027143 | G2 |
| `asaManagerPlugin` | 3605315701 | G2 |
| `dualStakePlugin` | 3569561317 | G2 |
| `revenueManagerPlugin` | 3642325118 | G3 |

One command per plugin, then one grant swap for all of them:

- PayPlugin is not deployed here. It is created with Meta's app id as its registry, so H1 deploys it after Meta and swaps the DAO wallet's PayPlugin grant there.
- No pay silo is deployed. The DAO wallet holds no grant of either pay silo plugin on MainNet or TestNet (read 2026-11-21), so nothing is swapped or removed for them.
- `deploy:rewards-plugin` pins `legacyRewards` to the network's Rewards v1 as the SDK registry names it (`rewardsV1`: 3569556095 on MainNet, 763128244 on TestNet) and prints it first, in a dry run too. `--legacy-rewards <id>` overrides it.
- `deploy:nfd-plugin` takes no version and has no dry run. It picks the network's NFD registry by itself (760937186 on MainNet, 84366825 on TestNet).
- `deploy:haystack-router-plugin` holds router and treasury ids for MainNet only and stops on TestNet (see A4). On MainNet it creates the plugin for router 3757715482, the v4 router the new plugin was written for; the live plugin names router 3172554435.
- **DualStakePlugin is left out** (2026-11-17; the owner's choice between this and a fix is open). MainNet's dualSTAKE registry is app 2933409454; TestNet has none. The plugin accepts a pool only when the registry app's own account created it. All 19 pools the registry lists were created by another account, the one that created the registry itself, and the registry app's account has created no app. So the tree plugin refuses every real pool whatever registry id it is given. The live plugin was created with registry 0 on both networks and has never acted either. The fix is a contract change: compare the pool's creator with the registry's creator. Until it is made and audited, no `deploy:dual-stake-plugin` line runs, the SDK keeps naming the live plugin (the DAO wallet holds no grant of it on either network), and I1 names `plugin:dualStakePlugin` in `--allow-pending`.
- `update:dao-wallet-plugins` plans first and prints every grant it will replace, with its methods. `--add-method` adds the three new RewardsPlugin methods to its method-restricted grants (today one, on `stickers`).

```bash
npm run deploy:gate-plugin -- -n mainnet -v "$V" --manifest receipts/gate-plugin.json --register
npm run deploy:staking-plugin -- -n mainnet -v "$V"
npm run deploy:rewards-plugin -- -n mainnet -v "$V"
npm run deploy:optin-plugin -- -n mainnet
npm run deploy:self-optin-plugin -- -n mainnet
npm run deploy:asa-manager-plugin -- -n mainnet
npm run deploy:haystack-router-plugin -- -n mainnet -v "$V"
npm run deploy:nfd-plugin -- -n mainnet
(cd ../akita-sdk && npm run build)
npm run update:dao-wallet-plugins -- -n mainnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --dry-run --sender "$CREATOR"
npm run update:dao-wallet-plugins -- -n mainnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --confirm-update
```

#### G2a. Set the heartbeat manager

- **What:** The D1 follow-up: the DAO wallet sets Staking's heartbeat manager through a narrow StakingPlugin grant.
- **Why here:** It needs the upgraded Staking (D1) and the tree StakingPlugin (G2).
- **Requires:** D1, G2. **Script:** ready (see D1).
- **Tracked by rollout:status as** `heartbeat`.
- The manager is an account the owner's backend holds for this one job. The owner creates it and gives the address (asked 2026-11-17, given 2026-11-25).

```bash
npm run staking:set-heartbeat-manager -- -n mainnet --manager "$HEARTBEAT_MANAGER" --dry-run
npm run staking:set-heartbeat-manager -- -n mainnet --manager "$HEARTBEAT_MANAGER"
```

#### G2b. Withdraw the stickers escrow's storage credits from Rewards v1

- **What:** The DAO wallet's `stickers` escrow paid the storage of the Welcome disbursements on Rewards v1. What was released sits on v1 as credits that only the escrow can withdraw: 21.30 ALGO across 125 disbursements on MainNet (read 2026-11-17). The script grants the sender `withdrawMbrCredits` on the escrow through the new RewardsPlugin, withdraws every credit to the escrow, and removes the grant (review 2026-10-05, STAKE-4).
- **Why here:** It needs the new RewardsPlugin (G2), which reaches v1 through the app pinned at its creation. Its two proposals execute at once only while the DAO is in Draft; after I1 each needs a vote. The review asked for it before the v1 drain risk grows. This step was missing from the runbook until 2026-11-17.
- **Requires:** G2 (the new RewardsPlugin, registered, and the SDK rebuilt). **Script:** ready.
- **Tracked by rollout:status as** `rewards-v1-credits`. `dao:initialize` refuses while credits remain, unless the step is named in `--allow-pending`.
- The script takes the Rewards app and the RewardsPlugin from the SDK registry. It refuses a RewardsPlugin deployed before `withdrawMbrCredits` existed, so the plan line stops until G2's deploy is done, and it refuses a sender who already holds a grant of the plugin on the escrow, because the run adds a grant under the same key and then removes that key.
- TestNet's Rewards v1 holds no disbursement, so on TestNet the step is done from the start and the rehearsal does not exercise it unless a disbursement is made there first (A4). The flow is covered on LocalNet by the STAKE-4 tests in `arc58/plugins/rewards/rewards.e2e.spec.ts`.

```bash
npm run rewards:withdraw-v1-credits -- -n mainnet --dry-run --sender "$CREATOR"
npm run rewards:withdraw-v1-credits -- -n mainnet --execute
```

#### G3. RevenueManagerPlugin

- **What:** One proposal: repoint pal.revenueManager, swap all 11 DAO wallet grants (optIn kept at method index 0), migrate the plugin's escrow/split/asset state.
- **Why here:** Every fee generator rekeys a DAO escrow to pal.revenueManager with method offset 0; a split move breaks fee collection everywhere. The live version lacks the P-1 fix.
- **Requires:** B2. **Script:** ready.
- **Tracked by rollout:status as** `plugin:revenueManagerPlugin`.
- **Then enable the split keeper** (akita-backend `server/revenue_split.go`). Before G3 the escrow grants stop at processEscrowAllocation, so the keeper refuses every escrow; a read-only dry run on 2026-10-12 found all 9 blocked on the missing finalize grant. After G3, make sure pal.revenueManager is listed in `RevenueManagerPluginAppIDs` (`server/contract_networks.go`), confirm a dry run logs `would_start`, then set `REVENUE_SPLIT_ENABLED=true`. It runs at 23:30, 23:40 and 23:50 UTC, before the 00:10 revenue distribution.
- **Enable the keeper only after B3b and G3b.** The first payout divides everything the escrows have built up, at the shares stored then, and it skips an asset share whose receiver has not opted in to the asset.
- **Fund the new plugin and keep it funded** (audit 04, DAO-05, accepted as a cost to watch). The plugin pays for its own boxes out of its own balance: 16,900 µALGO, permanently, for each asset tracked on an escrow, and 18,900 µALGO while an asset is being processed. A caller that registers an asset through a fee generator's public `optIn` pays the escrow's opt-in, not the box. So when the plugin runs out of free balance, new-asset opt-ins revert at every fee generator and every payout cycle reverts, until someone sends it ALGO. The live plugin held 1.0 ALGO with 0.2484 free (read for audit 04): about 14 registrations. Send the new plugin 2 ALGO right after G3 and watch its free balance with K8; `removeManagedAsset` (new in this release) lets a DAO proposal drop a junk asset from an idle escrow and get its box back.

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
- `--source` is the account allowed to opt the escrow in to an asset. For the nine registered escrows it is the address of the app that fills the escrow (read 2026-11-16), so use the Meta app's address for `rev_meta` and the GuildFactory's for `rev_guilds`. Nothing fills `rev_nfd` from an app; its only caller today is the operator account that holds its NFD and RevenueManager grants. Suggested for `rev_nfd` on 2026-11-17: that operator account. The owner agreed on 2026-11-25, and noted that NFD proceeds arrive in ALGO only, so the source has no asset to opt the escrow in to today.

```bash
npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source "$REV_NFD_SOURCE" --dry-run
npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source "$REV_NFD_SOURCE" --confirm
```

#### G3b. Opt the split's receivers in to the assets the revenue escrows hold

- **What:** Opt `rec_krby`, `rec_mod` and `rec_gov` in to every asset a revenue escrow is registered to pay out and holds a balance of. On MainNet that is USDC (31566704) and AKTA (523683256): six opt-ins (read 2026-11-18). None of the three holds any asset today.
- **Why here:** A payout sends each receiver its ALGO whatever it holds. It skips an asset share whose receiver has not opted in to the asset and leaves that share in the revenue escrow, and the next payout divides what was left again. A receiver that has not opted in therefore loses its share to the ones that have, cycle after cycle, and with none opted in no asset is paid at all. So all three opt in together, before the split keeper is enabled. `rev_subscriptions` holds 398.50 USDC and `rev_social` 14,720.81 AKTA (read 2026-11-17).
- **Requires:** nothing on chain: each receiver carries an open OptInPlugin grant on both networks today. Run it after G3a and before the keeper is enabled. **Script:** new 2026-11-18: `opt-in:revenue-receivers` (`scripts/opt-in-revenue-receivers.ts`; the rules are in `scripts/lib/revenue-receiver-opt-ins.ts`). It plans unless `--confirm` is given, skips what a receiver already holds, and reads the holdings back.
- **Not tracked by `rollout:status`.** The plan is the check: after the run, the dry run prints "Nothing to do".
- **Which OptInPlugin.** The step acts through the OptInPlugin the receivers' open grants name. G2 moves every DAO wallet grant to the new OptInPlugin and leaves `pal.optin` on the old one, so from G2 on the two differ, and the plan says so. Until 2026-11-25 the step read `pal.optin` alone and refused after G2 with "holds no global grant"; a dry run on TestNet after the rehearsal's G2 found it.
- **Any funded account can send it.** The grants are open to every caller. The sender pays 0.1 ALGO of minimum balance for each opt-in, which the receiver then holds: 0.6 ALGO on MainNet, plus fees. The dry run simulates each group as `--sender` against the programs live at that moment.
- **The receivers are locked, and that does not stop it.** A lock stops the wallet's own opt-in and allowance calls. The OptInPlugin acts on the escrow through the wallet's plugin rekey, which a lock does not guard.
- **An asset that no revenue escrow holds is left out.** Three single-unit NFTs are registered on `rev_marketplace` on MainNet and it holds none of them, so they need no opt-in. `--asset <id[,id]>` opts the receivers in to an asset ahead of its first payment.
- **Run it again when a revenue escrow is first paid in a new asset.** The plan names what each receiver lacks.
- **On TestNet** the revenue escrows hold neither USDC nor AKTA, so the plain command finds nothing to do. To rehearse the step there, name the two assets: `--asset 10458941,752884771`.
- Planned on MainNet and on TestNet on 2026-11-18, read-only: six opt-ins in three groups on each (TestNet with `--asset`), and every group passes in simulation. Planned again on TestNet on 2026-11-25, after G2 there: the same six opt-ins pass in simulation through the new OptInPlugin.
- Tested by `tests/revenue-splits.e2e.spec.ts` (LocalNet: an account with no role opts the three locked receivers in, they stay locked, and 1,000,003 units of an asset then divide 800,002, 50,000 and 150,001).

```bash
npm run opt-in:revenue-receivers -- -n mainnet --dry-run --sender "$CREATOR"
npm run opt-in:revenue-receivers -- -n mainnet --confirm
```

#### G4. SDK release with the network switches on

- **What:** Set REGISTRY_WRITES_STOPPED.mainnet and SOCIAL_HINTED_TARGETS.mainnet to true, record every new id, publish the SDK.
- **Why here:** K4 asks for the social flip right after Phase 2; registry writes stop once every consumer resolves principals by hint.
- **Requires:** E1, G1. **Script:** manual.
- **Tracked by rollout:status as** `sdk-flags`.
- Inventory off-chain registry readers first.
- By hand: in `projects/akita-sdk/src/networks.ts` set `REGISTRY_WRITES_STOPPED.mainnet` and `SOCIAL_HINTED_TARGETS.mainnet` to `true`, then rebuild. Publishing the package comes with I2, after the tag.
- The same edit moves tests that pin the switches and the registry: `src/social/index.test.ts`, `src/wallet/principal-phase3.test.ts` and `src/networks.test.ts` in the SDK, and `tests/release-deployments.test.ts`. Set `daoProposalValidator` in `networks.ts` and the README to the validator the DAO names, which B2 does not record.
- Done for TestNet and MainNet on 2026-11-26 (see the update log).

```bash
(cd ../akita-sdk && npm run build)
npm run rollout:status -- --network mainnet
```

### Stage H: New products

Independent of each other; each after its prerequisites.

#### H1. Meta (+ MetaPlugin, PayPlugin)

- **What:** Deploy Meta and MetaPlugin with receipts, then the PayPlugin that reads its policies from that Meta. Leave aal.metaMerkles alone until the roots are migrated (DEC-3).
- **Why here:** MetaMerkles has no update route; repointing early drops every stored root.
- **Requires:** B2. **Script:** ready: deploy:meta writes a resumable receipt and `--register` records the `meta` SDK key (G6 closed); deploy:meta-plugin records `metaPlugin`. Neither touches aal.metaMerkles. update:meta requires --meta-app-id and refuses MetaMerkles (ROLLOUT-6).
- **Revenue escrow (audit C7):** Meta keeps each type fee, less the storage it pays for, as owed to the DAO. `collectTypeFees()` sends what is owed to the DAO escrow Meta is pointed at; anyone can call it, and it fails with errEscrowDoesNotExist until the escrow is set. After the deploy:
  1. Create the escrow `rev_meta` on the DAO wallet.
  2. One DAO proposal: the Update plugin's `updateAkitaDaoEscrowForApp(meta, { name: rev_meta, app: <escrow app id> })`. Script since 2026-11-16: `update:app-dao-escrow` (gap G14 closed). It reads the app's escrow back and clears the bootstrap key it used.
  3. Register `rev_meta` with the RevenueManager like the other unsplit escrows (G3a).
- Until step 2, type fees wait in the Meta app. Nothing is lost, and nothing else in Meta depends on the escrow.
- **Grant policies:** right after deploy:meta-plugin, `set:policy-writer` registers MetaPlugin as Meta's only policy writer. The creator can set it once while it is unset; after that only the DAO wallet can change it. Until it is set no wallet can store a grant policy, so a plugin that reads one (PayPlugin on rec_krby, H6) refuses every delegated call. The DAO writes a policy through a global MetaPlugin grant with an execution key: AddPlugin (`useExecutionKey`), then one ExecutePlugin proposal for the configurePolicy group.
- **The DAO's policy writer grant:** `install:policy-writer-grant` gives the DAO wallet MetaPlugin as a global grant on no escrow that needs an execution key, at the DAO's app upgrade thresholds. It stays installed. Every policy the DAO writes, now or after launch, is then one ExecutePlugin proposal that registers one group; without the grant a policy change after launch needs an AddPlugin vote first. The script refuses while Meta's policy writer is not the recorded MetaPlugin, and refuses to reuse a grant that needs no execution key.
- **PayPlugin:** it is created with Meta's app id as its `registry` and reads every grant's policy from that app. The id cannot change afterwards and `deploy:pay-plugin` cannot check it, so the command takes it from the Meta this step recorded (`$META`, read by `rollout:id`); compare it with the Meta app id in `receipts/meta.json`. `rollout:status` and H6 refuse a PayPlugin whose registry is not the recorded Meta. `update:dao-wallet-plugins` then moves the DAO wallet's own PayPlugin grant, which needs an execution key and so needs no policy. It is the grant swap of G2, run again: it replaces only the grants that still point at an old version.
- **The backend's inference billing settings:** akita-backend's pay-as-you-go inference billing collects through this PayPlugin and a policy on each member's grant (akita-backend pull request 31). Its `AKITA_INFERENCE_BILLING` entry for a network takes `payPluginAppId`, `metaAppId` and `metaPluginAppId` from this step's receipts, and `payPluginApprovalSha256` from `arc58/plugins/pay/PayPlugin` in `release/manifest.json`. At startup the backend checks the program hash, PayPlugin's `registry` and Meta's `policy_writer` against them, so set the entry only after `set:policy-writer` and `deploy:pay-plugin` here. An entry that still has the pay silo keys is refused.
- **Tracked by rollout:status as** `meta`, `meta-plugin`, `meta-policy-writer`, `dao-policy-writer`, `plugin:payPlugin`, `meta-escrow`.

```bash
npm run deploy:meta -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run deploy:meta -- -n mainnet -v "$V" --manifest receipts/meta.json --register
(cd ../akita-sdk && npm run build)
export META=$(npm run -s rollout:id -- -n mainnet --app meta)
export META_ADDRESS=$(npm run -s rollout:id -- -n mainnet --app meta --address)
npm run deploy:meta-plugin -- -n mainnet -v "$V" --config "{\"registry\":\"$META\"}" --manifest receipts/meta-plugin.json --register
(cd ../akita-sdk && npm run build)
npm run set:policy-writer -- -n mainnet --dry-run --sender "$CREATOR"
npm run set:policy-writer -- -n mainnet --confirm
npm run install:policy-writer-grant -- -n mainnet --dry-run
npm run install:policy-writer-grant -- -n mainnet --confirm
npm run deploy:pay-plugin -- -n mainnet -v "$V" --config "{\"registry\":\"$META\"}" --manifest receipts/pay-plugin.json --register
(cd ../akita-sdk && npm run build)
npm run update:dao-wallet-plugins -- -n mainnet --dry-run --sender "$CREATOR"
npm run update:dao-wallet-plugins -- -n mainnet --confirm-update
npm run create:dao-escrow -- -n mainnet --escrow rev_meta --execute
npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --dry-run
npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --confirm
npm run register:revenue-escrow -- -n mainnet --escrow rev_meta --source "$META_ADDRESS" --dry-run
npm run register:revenue-escrow -- -n mainnet --escrow rev_meta --source "$META_ADDRESS" --confirm
(cd ../akita-sdk && npm run build)
```

#### H1a. Collectible Variations registry

- **Names are permanent:** the app can never be updated, so the method names it is created with stay for good. They are plain names (`writeVariation`, `getMain`, `purge` and so on; the delegate callback is `admit(uint64,address,byte[],address)bool`). The owner set the ARC aside on 2026-11-25, which lifted the earlier MainNet hold. The program deployed on MainNet must be the one rehearsed on TestNet: compare its hash with `release/manifest.json` (H1a's receipt records it).
- **What:** Deploy the Collectible Variations registry bound to the Meta of H1, with a receipt, and record its id.
- **Why here:** It is created with Meta's app id and the id of Meta's "collectible writer list" tree type, and neither can change afterwards.
- **Requires:** H1 (Meta deployed and recorded as `meta`). Nothing else: no DAO proposal, no app-list slot, no plugin grant. **Script:** ready: `deploy:collectible-variations` writes a resumable receipt and `--register` records the `collectibleVariations` SDK key.
- **Signer:** the deployer (`DEPLOYER_MNEMONIC`). The registry has no admin; whoever creates it holds no power over it.
- **The writer-list type:** the script reuses Meta's type named `Collectible writer list` with schema `(address)` when one exists. Otherwise it calls Meta's `addType`, which costs the fixed 100 ALGO type fee (Meta owes it to the DAO, less the type's storage; see H1). Meta numbers types from 0 and its verify treats type 0 as any type, so on a Meta with no types yet the script refuses unless `--reserve-type-zero` is passed. That flag first adds a placeholder type 0 named `Unspecified`, another 100 ALGO. Meta is new in 2.0.0, so this step always meets a Meta with no types: budget **200 ALGO** of type fees, about 0.49 ALGO locked in the deployer's minimum balance for the app (three extra pages, three global uints), and the 0.1 ALGO funding. The dry run says which of these the run will do.
- **If the run stops after addType:** the receipt records `addTypeSubmitted` (and `typeZeroSubmitted`) before each addType is sent. A rerun finds a confirmed type by name and continues. If the script stops with `addType was submitted but Meta … has no "Collectible writer list" type yet`, look up the deployer's last transactions to Meta. If the addType did not confirm, set `addTypeSubmitted` to `false` in the receipt and rerun. Never delete the receipt to get past it, or a second 100 ALGO type is added.
- **Funding:** the script funds the registry's own 0.1 ALGO minimum balance. Every box after that is paid by its owner.
- **Tracked by rollout:status as** `collectible-variations`. It is not a launch prerequisite: if it is not deployed before I1, name it in `--allow-pending`.

```bash
npm run deploy:collectible-variations -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"
npm run deploy:collectible-variations -- -n mainnet -v "$V" --manifest receipts/collectible-variations.json --reserve-type-zero --register
(cd ../akita-sdk && npm run build)
```

#### H2. Guilds

- **What:** Create the DAO guild-fee escrow, deploy GuildConsensusFactory, register the three consensus programs, deploy GuildFactory, upload the Guild kernel, then the shared GuildPlugin (guild = 0).
- **Why here:** Guild calls the 11-argument newAccount (K2) and the factory needs guild_fees. Consensus names are first-come and permissionless; verify each before publishing ids.
- **Requires:** E7, B3. **Script:** ready (G7 closed): deploy:guild-factory refuses before any write unless aal.wallet routes the 11-argument newAccount and the DAO has guild_fees. It keeps a resumable receipt (a rerun skips created apps and uploaded programs), reads every consensus name back and refuses a name holding another program, then `--register` records `guildConsensusFactory` and `guildFactory`. deploy:guild-plugin `--register` records `guildPlugin` only for the shared plugin (guild = 0).
- A refused consensus name cannot be fixed on that factory: abandon its receipt and deploy a new one.
- GUILD_DEPLOYMENT.md §'Existing wallet and DAO migration' describes a removed dynamic-page factory; ignore that part.

- **Tracked by rollout:status as** `guild-consensus`, `guild-factory`, `guild-plugin`.

```bash
npm run create:dao-escrow -- -n mainnet --escrow rev_guilds --execute
export REV_GUILDS_APP=$(npm run -s rollout:id -- -n mainnet --escrow rev_guilds)
npm run deploy:guild-factory -- -n mainnet -v "$V" --revenue-escrow-app "$REV_GUILDS_APP" --revenue-escrow-name rev_guilds --dry-run --sender "$CREATOR"
npm run deploy:guild-factory -- -n mainnet -v "$V" --revenue-escrow-app "$REV_GUILDS_APP" --revenue-escrow-name rev_guilds --manifest receipts/guild-factory.json --register --confirm-mainnet
(cd ../akita-sdk && npm run build)
export GUILD_FACTORY=$(npm run -s rollout:id -- -n mainnet --app guildFactory)
export GUILD_FACTORY_ADDRESS=$(npm run -s rollout:id -- -n mainnet --app guildFactory --address)
npm run deploy:guild-plugin -- -n mainnet -v "$V" --config "{\"factory\":\"$GUILD_FACTORY\",\"guild\":\"0\"}" --manifest receipts/guild-plugin.json --register
npm run register:revenue-escrow -- -n mainnet --escrow rev_guilds --source "$GUILD_FACTORY_ADDRESS" --dry-run
npm run register:revenue-escrow -- -n mainnet --escrow rev_guilds --source "$GUILD_FACTORY_ADDRESS" --confirm
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

#### H6. Labs revenue payout (`rec_krby`)

- **What:** Install the PayPlugin of H1 on the DAO wallet as a global grant on the `rec_krby` escrow with only the `pay` method, then write the grant's policy: one receiver, the Akita Labs LLC address, and the assets it may be paid in.
- **Why here:** `rec_krby` is a DAO-wallet escrow that receives the Labs share of every payout: 80% after B3b, 40% before it. The policy lists the only receiver, so the grant can be callable by anyone (or by a backend keeper): every payment can only reach Labs. PayPlugin reads the policy from Meta on every call.
- **Requires:** H1 (Meta, its policy writer, the DAO wallet's policy writer grant, and the PayPlugin created with that Meta). **Script:** ready since 2026-11-21: `install:pay-policy-grant` (`scripts/install-pay-policy-grant.ts`). It refuses unless the recorded PayPlugin runs the tree program and reads its policies from the recorded Meta. It installs the grant with `pay` only, writes the policy through the policy writer grant, and reads both back. Two proposals. Test: `tests/rollout-grant-policies.e2e.spec.ts`, which ends in real payments.
- **Tracked by rollout:status as** `labs-pay-policy`. The row prints the receiver the stored policy lists: compare it with the Akita Labs LLC address.
- **Between the two proposals the grant pays nothing.** PayPlugin refuses a global grant that needs no execution key until it has a policy. A run that stops after the first proposal leaves a grant that cannot pay, and a rerun writes the policy.
- **Assets.** A policy lists the only assets the grant may send, at most 8. Left to itself the script lists ALGO, the network's AKTA and USDC, and whatever the escrow holds on that day. `--assets 0,<id>,...` states them instead. An asset that is not listed stays in the escrow until a proposal changes the policy. A pay silo sent any asset.
- **Another receiver or another asset later** is the same command with the new values: one ExecutePlugin proposal through the policy writer grant. After `initialize()` it is a vote at the thresholds of an app upgrade.
- **Pay silos are deprecated in release 2.0.0** (owner, 2026-11-21). PaySiloPlugin and PaySiloFactoryPlugin are not deployed or rotated. The live ones (3569561570 and 3569561636 on MainNet) stay on chain, unused.
- `rec_krby` is a locked escrow. A lock stops the wallet's own opt-in and allowance calls. It does not stop a grant, a payment, or an opt-in made through the escrow's OptInPlugin grant (G3b).
- PayPlugin sends an asset only to an address that holds it. The Akita Labs LLC address must be opted in to USDC and AKTA before a payment in either. The script says so when it is not.

```bash
npm run install:pay-policy-grant -- -n mainnet --escrow rec_krby --recipient "$LABS_ADDRESS" --dry-run
npm run install:pay-policy-grant -- -n mainnet --escrow rec_krby --recipient "$LABS_ADDRESS" --confirm
```

#### H7. SocialClaim (not in this release)

- **Not in release 2.0.0 (owner, 2026-11-19).** Skip this step, and name `social-claim` in `--allow-pending` at I1. The rest of this step describes a later deploy.
- **What:** Deploy SocialClaim, the admin of send-to-anyone wallets until a platform identity claims them. Constructor: the WelcomePlugin app id, the PayPlugin app id, the attestor public key (32 bytes) and the manager address.
- **Why here:** It creates wallets through WelcomePlugin, so it needs E7 and H3. It is immutable: the two plugin ids are fixed at create.
- **Requires:** H3. **Script:** ready since 2026-11-10: SocialClaim is in the immutable catalog, `--register` records the `socialClaim` SDK key and fills its README row (audit R7). Test: `tests/release-deployments.test.ts`.
- **Referrer (audit C5, decided 2026-11-11):** the sender who pays to create a recipient's wallet is that wallet's referrer, and stays so after later gifts from other senders and after the claim. That is the incentive to send first. Nothing in the program changed. Test: `social-claim.e2e.spec.ts`.
- **To decide before a later deploy:** who holds the attestor key and who the manager is. The attestor can bind any handle to any wallet, and the manager can replace the attestor. The manager should not be a hot key.
- **Payer rule (audit C23, decided 2026-11-16).** Every gift box stores the account that paid for its storage, 41,300 µALGO a box, and returns the deposit to that account when the gift is refunded, dropped or pruned. Anyone may pay and every payer pays the same. With the SDK the account that sends the group pays, so that account is refunded, not the sponsor wallet. A payer whose account is empty by then forfeits the deposit to the wallet that sent the gift. Nothing can change after the deploy.
- The deploy tooling does not verify the two plugin ids on chain. Check each against its receipt first.
- **Tracked by rollout:status as** `social-claim`. While it is not deployed, name `social-claim` in `--allow-pending` at I1; after `initialize()` it is still a plain deploy, with no proposal.
- The constructor arguments go in a file, `social-claim.json`: `{"welcome":"<WelcomePlugin app id>","pay":"<PayPlugin app id>","attestor":[<32 numbers>],"manager":"<address>"}`. `--config` also takes the same JSON inline.

```bash
npm run deploy:immutable -- -n mainnet -v "$V" --contract SocialClaim --config social-claim.json --dry-run --sender "$CREATOR"
npm run deploy:immutable -- -n mainnet -v "$V" --contract SocialClaim --config social-claim.json --manifest receipts/social-claim.json --register
(cd ../akita-sdk && npm run build)
```

### Stage I: Launch the DAO

**The 2.0.0 rollout does not launch the DAO (the owner, 2026-11-25).** It ends at I2, with the MainNet DAO still in Draft, as TestNet's is. I1 is not run with the rollout. It stays here as the launch procedure for the day the owner calls it; until then the creator keeps sending the DAO's proposals, each of which executes at once. Nothing in stages B to H needs an initialized DAO. The proposal thresholds stay as they are until I1, which is safe because thresholds are not enforced in Draft (B2), and `dao:initialize` refuses to run before `dao:rescale-power` has.

No script supports a voting DAO end to end, so whenever I1 is run, everything above runs first.

#### I1. Rescale thresholds, review grants, clear bootstrap keys, initialize (one-way)

- **What:** Rewrite the nine proposal thresholds in base units. List and keep the pre-launch grants (they are a feature), revoke weak pal.update grants and leftover execution keys, clearBootstrapKeys. Then initialize().
- **Why here:** initialize() refuses while any bootstrap execution key is tracked. After it, ChangeAdmin works and every later change needs a vote.
- **Requires:** B2, F1, G4. **Script:** new 2026-11-16: `dao:rescale-power` and `dao:initialize`; `revoke-dao-bootstrap-grants.ts` as before.
- **Tracked by rollout:status as** `power`, `initialize`.
- Expired proposal #107 stays inert; 19 expired execution boxes hold ~420k µA.
- `dao:rescale-power` rewrites each `*_ps` global whose power is still in whole tokens (x 1e6; see B2), keeps every other setting, and reads each back. It refuses a value neither unit explains (above 1,000 and below 1,000,000). The plugin settings were rescaled by the grant swaps; the tracker's `power` step names any that were not. The Update plugin's own settings are never read (the DAO drives it through UpgradeApp only) and are left as they are.
- The commands name `plugin:dualStakePlugin` in `--allow-pending` because G2 leaves that plugin out. Drop it if the plugin is fixed and deployed first. They name `social-claim` because H7 is not in this release (owner, 2026-11-19).
- `dao:initialize` reads the same steps as `rollout:status` and refuses while one is not done. A step left for a vote on purpose is named with `--allow-pending <id,id>`, as `social-claim` is while H7 is left out. Five steps cannot be named: `phase2a`, `dao`, `validator`, `dao-wallet` and `power`. It plans unless `--confirm-initialize` is given.

```bash
npm run rollout:status -- --network mainnet
npm run dao:rescale-power -- -n mainnet --dry-run
npm run dao:rescale-power -- -n mainnet --confirm-rescale
npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --dry-run --sender "$CREATOR"
npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --confirm-revoke
npm run dao:initialize -- -n mainnet --allow-pending plugin:dualStakePlugin,social-claim --dry-run
npm run dao:initialize -- -n mainnet --allow-pending plugin:dualStakePlugin,social-claim --confirm-initialize
```

#### I2. Push and tag the release

- **What:** Once the contracts are deployed and updated: check that `networks.ts` and the README carry every new app id (`--register` wrote them as each step ran), rebuild the SDK, commit, push `release/mainnet-rollout`, and tag the release.
- **Why here:** DEC-5: the push comes after the deployment so it carries the SDK that points at the new apps and ABI methods. The apps are rebuilt against that SDK.
- **Requires:** stages B to H as far as they are run. **Script:** manual.
- The audit records are not part of the push: the `audits/` folder was removed on 2026-11-17.
- The contract CI workflow runs for the first time on this push. Repeat A1 on a clean checkout of the tag.
- Publish the SDK only after the tag, so the published package and the tag are the same tree.
- Since 2026-11-26 the commit to tag is on the work branch: it carries the registry and README that `--register` wrote on both networks, the G4 switches and the rebuilt SDK, so the checkout that ran the rollout has nothing left to commit. Move it to that commit before tagging.
- A pushed tag named `sdk-v<version>` or `plugin-v<version>` makes `.github/workflows/publish.yml` publish that package to npm. Give the release tag another name, and push one of those two only to publish.
- The SDK is 2.0.0, so `sdk-v2.0.0` publishes it. It becomes the default on npm in place of 1.4.12. The plugin package is 1.2.0 and npm has 1.0.0; `plugin-v1.2.0` publishes it.
- The release contains `main` since 2026-11-26, so the last push below moves `main` forward without a merge. If `main` only takes pull requests, open one from `release/mainnet-rollout`; it has no conflicts.

```bash
npm run release:manifest:check
(cd ../akita-sdk && npm run build)
git push -u origin release/mainnet-rollout
git tag -s <release tag>
git push origin <release tag>
git push origin release/mainnet-rollout:main
```

### Stage J: After launch

Monitoring until Phase 4. It starts when stage G is done and does not wait for I1: the legacy shims, the AkitaSocial balance and the Marketplace float need watching from the upgrades on, whether or not the DAO has launched.

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

## Script changes made 2026-11-18

- `scripts/update-revenue-splits.ts`, `scripts/lib/revenue-splits.ts` (new, `update:revenue-splits`): B3b. It rewrites the shares of the DAO's `revenue_splits` through one proposal, simulates the proposal in a dry run, and reads the table back.
- `scripts/opt-in-revenue-receivers.ts`, `scripts/lib/revenue-receiver-opt-ins.ts` (new, `opt-in:revenue-receivers`): G3b. It opts the receivers of the table in to the assets the revenue escrows hold, through each receiver's open OptInPlugin grant.
- Tests: `tests/revenue-splits.test.ts` and `tests/revenue-splits.e2e.spec.ts`.
- No contract program changes, and `release/manifest.json` is unchanged.

## Script changes made 2026-11-18 (second)

- `scripts/fund-service-accounts.ts`, `scripts/lib/service-account-funding.ts` (new, `fund:service-accounts`): E6a. It reads the accounts of HyperSwap, PrizeBoxFactory, PollFactory and AkitaSocialModeration and sends each what it is short of its minimum balance, plus the moderation float.
- `scripts/lib/rollout-steps.ts`: `rollout:status` tracks the new step as `service-accounts`, so `dao:initialize` refuses to launch while one of the four accounts cannot work.
- Tests: `tests/service-account-funding.e2e.spec.ts`; two more reward tests in `smart_contracts/arc58/plugins/staking-pool/staking-pool.e2e.spec.ts`; one more prize box test in `smart_contracts/auction/auction.e2e.spec.ts`.
- Two contract programs change, StakingPoolPlugin and AuctionFactory, and `release/manifest.json` with them.

## Script changes made 2026-11-20

- `scripts/lib/wallet-page-growth.ts` (new): reads the staged wallet program, each wallet's program pages and the wallet factory's free balance, and says what the factory lacks before wallets grow a page.
- `scripts/update-dao-wallet.ts` (F1) and `scripts/update-automatic-wallets.ts` (F2): print that plan, and pay the factory what it lacks from the sender before the first update. A dry run pays nothing. F2 gains `--targets-only`.
- `scripts/deploy-wallet-mbr.ts` (F0): deploys nothing when the SDK's helper already runs the tree program; `--register` writes the new id into `networks.ts` and the README.
- `scripts/lib/rollout-steps.ts`: `rollout:status` tracks F0 as `wallet-mbr`.
- `scripts/lib/dao-wallet-parity.ts`, `scripts/lib/dao-wallet-plugin-migration.ts`, `scripts/deploy-revenue-manager-plugin.ts`: a grant that uses an escrow by default is funded with the storage of the name it now stores (the SDK's `defaultEscrowGrantMbr`).
- Tests: `tests/wallet-page-growth.test.ts`; `tests/compat/compat.e2e.spec.ts` updates a wallet on the MainNet program with the call F2 sends, and deletes an escrow made before the update; `smart_contracts/arc58/account/delete-escrow.e2e.spec.ts`; the DAO's and the Guild's proposal tests.

## Script changes made 2026-11-21

- `scripts/set-policy-writer.ts` (new, `set:policy-writer`): H1. It registers the recorded MetaPlugin as Meta's policy writer.
- `scripts/install-policy-writer-grant.ts`, `scripts/install-pay-policy-grant.ts`, `scripts/lib/grant-policy-steps.ts` (new, `install:policy-writer-grant` and `install:pay-policy-grant`): H1's policy writer grant on the DAO wallet, and H6. Each plans without `--confirm`, reads back what it wrote, and does only what is missing on a rerun.
- `scripts/lib/rollout-steps.ts`: new steps `meta-policy-writer`, `dao-policy-writer` and `labs-pay-policy`. `plugin:payPlugin` moves to stage H and is done only when the recorded PayPlugin reads its policies from the recorded Meta. `labs-pay-silo`, `plugin:paySiloPlugin` and `plugin:paySiloFactoryPlugin` are gone.
- `scripts/install-pay-silo-grant.ts` and the `deploy:pay-silo-*` commands: no step runs them any more. They leave with the pay silo code.
- Removed later on 2026-11-21 (pay silo removal, on top of this change): the PaySiloPlugin and PaySiloFactoryPlugin programs and artifacts, their SDK classes, generated clients and network map keys (`paySiloPlugin`, `paySiloFactoryPlugin`, `PAY_SILO_*` environment names), their catalog entries, `scripts/install-pay-silo-grant.ts`, `installPaySiloGrant`, the `build:paysiloplugin`, `deploy:pay-silo-*` and `install:pay-silo-grant` commands, and their tests and fixtures. The README lists the deployed ids under *Deprecated plugins*.
- Tests: `tests/rollout-grant-policies.e2e.spec.ts` runs the policy writer grant, a policy written by proposal and H6 on LocalNet, ending in payments that only the listed receiver gets; `tests/meta-policy-forger.e2e.spec.ts`; `smart_contracts/arc58/plugins/pay/pay-policy.e2e.spec.ts` and `pay-policy-dao.e2e.spec.ts`.
- Two tests that warp 1,000 rounds, in `smart_contracts/staking-pool/staking-pool.e2e.spec.ts` and `smart_contracts/auction/auction.e2e.spec.ts`, get a timeout of 300 seconds. Each sends about 1,000 payments one after another and passed the default 120 seconds on a busy CI runner.
- `scripts/deploy-localnet-v2.ts` (LocalNet only): after it deploys MetaPlugin it names it as Meta's grant policy writer, and a rerun does the same on a universe that lacks one. Until now a LocalNet built by `deploy:universe` and `deploy:localnet-v2` had no policy writer, so no wallet there could store a grant policy and the apps could not try a PayPlugin policy. On MainNet this is H1's `set:policy-writer`.
- `smart_contracts/arc58/plugins/pay/backend-inference-billing-setup.e2e.spec.ts` (new, LocalNet only, skipped unless `AKITA_BACKEND_INFERENCE_BILLING_SETUP` names a file to write): on a fresh wallet it installs what a member's app installs for inference billing, a PayPlugin grant on the `inference` escrow for a billing key, an ALGO allowance and the grant's policy, and writes the file that akita-backend's `TestInferenceBillingSettlesOnLocalNet` reads. That test then collects charges through the grant and checks that the chain refuses a receiver the policy does not list.

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
- **G16.** `npm run check-types` reports 12 errors, all in test files; CI does not gate on it yet. The contract CI workflow (`.github/workflows/akita-sc-ci.yaml`) does run on the release branch: it was dispatched on every commit of the audit fix batch of 2026-11-25 (runs 96 to 106), and each run is a reproducible build of the whole tree against `release/manifest.json` plus the suite in six shards, about twenty minutes. A push does not start it, so dispatch it by hand, and never while a run you need is still going: a new dispatch cancels the one in progress.

