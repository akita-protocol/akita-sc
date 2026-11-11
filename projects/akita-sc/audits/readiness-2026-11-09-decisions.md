# Readiness audit 2026-11-09: decisions and accepted risks

Owner decisions on the code findings of the 2026-11-09 readiness audit: C1 to C9, recorded on
2026-11-09, and C10 to C17, recorded on 2026-11-10. Findings marked "accepted" are known, were
weighed and are not to be fixed in the contracts; reviewers should not report them again unless the
facts below change.

## Decisions of 2026-11-11

The owner's answers to the six questions left open after the fixes:

1. **Push and tag:** after the contracts are deployed and updated, so the same push carries the SDK
   changes that point at the new apps and ABI methods. Until then the work stays in local commits.
2. **Plugin DEX:** on hold. PluginDex v2 and everything that belongs to it moved to its own branch
   (`feat/plugin-dex-v2`) and is not in this tree. The rows below for C10, C15 and C16 concern code
   that lives on that branch; their fixes went with it.
3. **Pausing a pool by proposal or through a guardian grant:** parked with the Plugin DEX.
4. **SocialClaim referrer (C5, third part):** yes, by design. Whoever pays to create a recipient's
   wallet is that wallet's referrer; that is the incentive to send first. The contract already
   works this way (`WelcomePlugin.sendToAnyone` names the sender as referrer) and nothing changed
   in the program. `social-claim.e2e.spec.ts` asserts that the first sender is the referrer and
   stays so after a later sender's gift and after the claim.
5. **Independent audit:** parked with the Plugin DEX, which is what it was recommended for.
6. **Live plugins (R9):** rotate every plugin whose code changed at all; the apps prompt each
   wallet to update. All 23 live MainNet plugin programs differ from this build (read
   2026-11-11), so all 23 rotate. The list is in `docs/rollout/MAINNET-ROLLOUT.md`, step G2.

## Fixed

| ID | Finding | What changed |
|---|---|---|
| C1, C2 | Plugins trusted the spending address of any app passed as `wallet`, so a fake wallet could point a plugin at its own account. | 16 plugin contracts read `getControlledSpendingAccount`, which asserts the account is rekeyed to the plugin right now (`errNath`). `AkitaDAOPlugin.voteProposal` reads participation for the wallet's account. Guard test `arc58/plugins/controlled-spending.test.ts`, attack test `arc58/plugins/spoofed-wallet.e2e.spec.ts`. |
| C3 | GuildPlugin paid whatever the Guild app quoted at execution. | Every paying GuildPlugin method takes `maxCost`, the cost quoted when the call was built (for an approved group, at proposal time), and fails with `errGcle` when the cost at execution is higher. The SDK fills it from the Guild's own cost readers. `createGuild` cannot be quoted ahead of time because part of its cost is storage in a Guild that does not exist yet; pass `maxCost` explicitly to bound it. |
| C5 (storage) | SocialClaim storage was prefunded by Akita and could be used up by cheap calls. | `bind` and `contribute` take a storage payment from the sender: 18,900 µALGO for a new subject entry (kept) and 28,500 µALGO for each new gift entry (returned to the sender's wallet when the gift is refunded or pruned). The app needs only its own 0.1 ALGO. |
| C6 | One closed account stopped the refund loops of Raffle, Auction and Poll. | The loops skip an ALGO payment the receiver cannot take (closed account, amount below the minimum balance). The skipped amount leaves with the child's account at deletion: it goes into the funder's storage refund up to the funder's recorded deposit, and anything above that stays in the factory. `Auction.refundBid` on its own still fails instead of skipping, so a single refund is never dropped. |
| C7 | The 100 ALGO Meta type fee had no way out of the app. | Meta counts each fee, less the type's storage, in `type_fees`. `collectTypeFees()` (anyone may call it) sends the amount to the revenue escrow the DAO names with `updateAkitaDAOEscrow`. |
| C10 (admin) | Admin handover was one step on the Vault, LaunchManager, BackrunArbHook and ConsensusKeyregHook, so a wrong or unusable address locked every admin function. | `setAdmin` is gone from all four. (VenueRegistry had the same flaw; it was removed with the AkitaRouterPlugin on 2026-11-10.) `proposeAdmin(account)` names the successor and changes nothing; `acceptAdmin()` must be sent by the successor. Proposing again replaces the pending successor, and proposing the zero address cancels. `activate-plugin-dex.ts` proposes the handover and reports each acceptance as awaiting instead of handing over. Test `plugin-dex/admin-handover.e2e.spec.ts`. |
| C10 (dust bins) | At the engine's floor (`minBinShares = 2^32`, one Y base unit) a bins pool can be seeded with near-free dust bins that force large swaps to be split. | The SDK's `defaultBinPoolParams(activeId, decimalsY, overrides)` takes the Y token's decimals as a required argument and defaults the floor to one whole Y token per bin. `encodeBinInitArgs` refuses a value below the engine floor. A creator can still choose a lower floor on purpose; the engine's own floor is unchanged. |
| C10 (events) | `CustodyEvent` lost `reserveA` and `reserveB` after the internal review, and nothing tied the event shapes to what integrators read. | `INTEGRATION.md` §4.4 lists all six Vault events with their ARC-28 selectors, and `plugin-dex/events.test.ts` pins that table and the compiled Vault to each other. No indexer or SDK event decoder exists in any Akita repository yet, so there was nothing else to bring in line. |
| C11 | A HyperSwap accept was only safe when the client had checked the full leaf list against the offer. | The SDK's `accept` takes the offer's `leaves` and `participants` instead of ready-made terms, reads the offer and refuses to build the call unless the lists reproduce its roots and counts and the offer is still open. The wallet plugin's `accept` takes the same lists. The contract's `errTermsMismatch` check stays as the backstop. |
| C12 | `update-wallet-creation-cost.ts` set the wallet creation fee to 1,000,000 ALGO when `--cost` was left out. | The script has no default. It stops before connecting unless the fee is given exactly once, with `--cost` (microAlgos) or `--cost-algo` (whole Algos), as a whole number. Test `tests/wallet-creation-cost.test.ts`. |
| C13 | Subscription consensus counted any subscription that was paid up at the moment of the vote, so accounts could subscribe after a proposal opened and carry it. | Each ballot records when it opened. A subscription has power on a ballot only if its current run of unbroken payments began at least one full interval before the ballot opened. Proposing is not affected. The ballot's snapshot box grew, so `SubscriptionSnapshotMBR` is 12,500 µALGO (was 9,300). The SDK exports `subscriptionVotingOpensAt` and `isSubscriptionSeasoned` for the app. |
| C14 | `SocialActivityGate` failed the whole call for a user with no profile, which also broke an OR with another gate. | The gate calls `getMetaExists` first and answers false, as `SocialFollowerCountGate` does. |
| C15 | A pool made directly on the Vault could install `LaunchTaxHook` with a tax it had no permission or no fee room for: buys worked and every sell reverted. | The hook declares its buy and sell tax in the result of `afterInitialize`, and the Vault checks them there against the granted permissions (`errPdhm`) and the pool's `maxHookFeeBps` (`errPdhf`). Such a pool can no longer be created. Nothing is charged at that point. Found while fixing: two approved hooks that each fit the cap could still exceed it together on sells only (SwapTaxHook's flat 1% plus a 5% sell tax under a 5% cap; reproduced). So when any hook declares, `createPool` also requires every hook installed with `HookFee` or `HookFeeOut` to declare (`errPdhm`) and the cap to cover the declared worst cases added up (`errPdhf`). SwapTaxHook does not declare, so it cannot share a pool with a launch tax. The SDK's pool draft reports that combination before signing (`validateDeclaredHookFees`). |
| C17 | Anyone could delete a finished poll's vote boxes, so a poll gate stopped passing at a time nobody controlled. | `Poll.deleteBoxes` is for the poll's creator only (`errNcre`). `PollGate` also answers false, instead of failing, when the app it points at was deleted or was not made by the PollFactory. `PollFactory.deletePoll` stays open to anyone but needs every box gone first, so it too waits for the creator. |

## Rollout work these fixes add

- **C7:** the DAO creates a revenue escrow for Meta (`rev_meta`, with the same revenue-manager grant
  and split as the other `rev_*` escrows) and points Meta at it with the update plugin's
  `updateAkitaDaoEscrowForApp`. Until then type fees wait in the app and `collectTypeFees` fails
  with `errNesc`.
- **C3, C5:** GuildPlugin's seven paying methods and SocialClaim's `bind` and `contribute` changed
  their ABI. Clients must be rebuilt against the new SDK. A SocialClaim gift group is now
  `[rekeyToPlugin, plugin call, verifyAuthAddress, storage payment, bind or contribute]`.
- **C1, C2, C6:** the plugin programs and the Raffle, Auction and Poll child programs change
  bytecode. Plugins rotate app ids; children are pushed through their factories.
- **C10 (admin):** the handover to the DAO finishes only when the DAO wallet itself sends
  `acceptAdmin()` to each of the four apps. No plugin in this tree can make the DAO wallet call a
  Plugin DEX admin method, so today the DAO wallet could neither accept nor, once admin, pause a
  pool, approve a hook or change a fee. Build and install that plugin before the handover; until
  the DAO accepts, the deployer stays admin and keeps the pause. Rerun `activate-plugin-dex.ts` to
  see what is still awaiting acceptance.
- **C10 (SDK), C11:** two SDK calls changed shape. `defaultBinPoolParams` takes the Y decimals as
  its second argument, and HyperSwap `accept` takes `leaves` and `participants` in place of `terms`.
- **C13:** new members cannot vote on ballots opened during their first paid interval, and a
  brand-new subscription guild cannot pass a ballot opened in its first interval. The app should
  show when a subscription starts to count (`subscriptionVotingOpensAt`). Ballot quotes rise by
  3,200 µALGO, returned at cleanup as before.
- **C15:** a pool that installs `LaunchTaxHook` must grant `HookFee` for a buy tax and `HookFeeOut`
  for a sell tax and set `maxHookFeeBps` at or above each. LaunchManager and the SDK's
  `launchTaxInstall` already do. A taxed launch pool cannot also carry SwapTaxHook. If that
  combination is wanted, SwapTaxHook has to declare its rate at `afterInitialize` (a small change,
  not made here) and the pool's cap has to cover both. The app should still not list a pool whose
  sell quote reverts: the Vault now refuses the shapes found so far, not every shape a future hook
  could make.
- **C17:** vote deposits (15,300 µALGO each) now come back when the creator cleans up, not when any
  passer-by does. Polls created before the new child program is pushed keep the old behaviour. A
  gate on a poll holds for as long as the creator leaves the boxes in place.
- **C10, C13, C14, C15, C17:** the Vault, LaunchManager, BackrunArbHook,
  ConsensusKeyregHook, LaunchTaxHook, the subscription consensus, SocialActivityGate, PollGate and
  the Poll child program change bytecode. Regenerate the release manifest after the build. The
  Poll child is pushed through its factory; the gates get new app ids.

## Accepted

| ID | Risk | Why it is accepted | What keeps it in check |
|---|---|---|---|
| C4 | DAO execution keys are not bound to a plugin (DAO-03 option 3B was not built), so per-plugin execute thresholds are advisory among plugins that use execution keys, other than the Update plugin. | What a prepared group will do cannot be verified on chain. | The app checks the prepared group behind an execution key during the proposal's voting stage and shows voters what it will run. |
| C5 (attestor) | One ed25519 attestor key can claim every pending SocialClaim gift wallet. | By design, as the trade-off for a simple claim flow. | Akita holds the new wallets and hands each one over when the recipient proves they own the social account. |
| C8 | A designated caller with cooldown 0 can spend up to 272 minimum fees per window through wallet `coverFees`. | Small, bounded and only open to a caller the wallet owner designated. | The bound itself. |
| C9 | Referrers are self-asserted, so referring yourself is a discount, and each referral payment is its own Rewards disbursement paid for by the referred user. | No fix found that does not give up decentralisation, self-custody or convenience. | Nothing further; treated as a discount. |
| C16 | A `GatedFeeHook` fee pass caches the holder's impact score for 1 hour to 7 days, and up to 100 of the 1,000 points come from AKTA and Akita NFTs held when it is measured, so the same tokens can be moved through several accounts to lift each pass. | Held balances are a small part of the score, and moving them costs a transaction per account, which is activity for AKTA. | The staking part of the score cannot be moved this way. The Impact contract is upgradeable, so held balances can be taken out of the score later if this is abused. |

## Still open from the same audit

C5's third part (whether binding a handle first should make the binder the referrer of the
recipient's wallet) was decided on 2026-11-11: it should, see above. Who holds the SocialClaim
attestor key and who its manager is remains to be decided before SocialClaim is deployed. For C13 the owner chose, on 2026-11-10, the stricter of
the two rules the audit offered (one full paid interval before the ballot opened) over the looser
one (any subscription that started before the ballot opened). C10's remaining part, that launch
pools have no emergency exit, was accepted earlier as A-L1 and is unchanged.
