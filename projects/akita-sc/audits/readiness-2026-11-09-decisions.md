# Readiness audit 2026-11-09: decisions and accepted risks

Owner decisions on the code findings of the 2026-11-09 readiness audit: C1 to C9, recorded on
2026-11-09, and C10 to C17, recorded on 2026-11-10. C18 to C21 come from the second pass of
2026-11-14 over the Guild fee asset and were decided on 2026-11-15; they have their own section at
the end. Findings marked "accepted" are known, were weighed and are not to be fixed in the
contracts; reviewers should not report them again unless the facts below change.

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
| C5 (storage) | SocialClaim storage was prefunded by Akita and could be used up by cheap calls. | `bind` and `contribute` take a storage payment from the sender: 18,900 µALGO for a new subject entry (kept) and 28,500 µALGO for each new gift entry (returned to the sender's wallet when the gift is refunded or pruned). The app needs only its own 0.1 ALGO. Since the sixth pass (C23, 2026-11-16) a gift entry costs 41,300 µALGO and is returned to the account that paid it. |
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

## Second pass, 2026-11-14: the Guild fee asset

The second pass covered the Guild fee asset: a Guild may charge its proposal fees in an asset
instead of ALGO. It raised C18 to C21, and the owner decided them on 2026-11-15.

| ID | Finding | Decision | What changed, or what keeps it in check |
|---|---|---|---|
| C18 | No fee setting could exceed 1,000,000. The number was meant as one ALGO, but a fee is counted in base units of whatever the Guild charges in, so the ceiling was also 1 AKTA or 1 USDC. | Fixed: a fee has no ceiling below uint64. | `MAX_GUILD_PROPOSAL_FEE` is gone and `validateSettings` (`guilds/consensus/base.ts`) no longer bounds `fee`. The three consensus programs change bytecode. Tests: `guild-actions.e2e.spec.ts` (the largest uint64 is accepted directly, a fee above the old ceiling by proposal), `fee-asset.e2e.spec.ts` (a fee of 5,000 whole tokens is charged and forwarded). |
| C19 | A fee asset with a freeze address lets that address stop the Guild's proposals. A freeze on the treasury stops submissions; a freeze on the Guild stops submissions, new proposals and draft refunds until it is lifted. | Accepted. | Which asset to charge in is the Guild's choice and its risk. ALGO fees and assets without a freeze address are not affected (AKTA has none and can never get one). `fee-asset.e2e.spec.ts` pins the behaviour. |
| C20 | A proposal that creates the Guild's wallet, approved while fees were in ALGO, cannot execute once a later proposal sets a fee asset first: its reserve does not cover the new wallet's opt-in. | Accepted, no contract change. | The Guild cancels the proposal and proposes again. A Guild that knows its fee asset sets it at creation, before any proposal exists: the creator's `setFeeAsset` while the Guild is a draft, or a `setFeeAssetAction` among the `actions` of the one-call `createGuild`. `plugins/guild/guild-fee-asset.e2e.spec.ts` covers both; `fee-asset.e2e.spec.ts` pins the failure and the way out. |
| C21 | `sweepFeeTokens`, a Guild without a wallet and three more fee asset paths had no test. | Tests added. | `guilds/tests/fee-asset.e2e.spec.ts`: fees wait in a Guild without a wallet and `sweepFeeTokens` forwards them once a voted wallet exists; a large fee; the C19 and C20 behaviour; a proposer who left the asset forfeits the token refund to the treasury and still gets the ALGO back. `sweepFeeTokens` has no GuildPlugin method and no SDK wrapper; anyone may call it on the Guild directly once the Guild is active. |

What the removed ceiling (C18) means in practice:

- A Guild can vote a fee that nobody can pay, and a proposal whose fees add up past uint64 cannot
  even be priced. The settings actions (80 to 85, 100 and 110) share one settings record, so an
  unpayable fee there closes every settings change, including the one that would lower it. The
  way back is a proposal class that is still affordable, in the end an upgrade of the Guild.
  `guild-actions.e2e.spec.ts` pins this.
- Fee numbers are not converted when the fee asset changes. A Guild that moves from ALGO to an
  asset, or between assets with different decimals, sets its fees for the new asset itself.

Seen while testing C20, older than the fee asset work and left as it is: the one-call `createGuild`
pays the full `proposalCost.mbr` for its `actions`. That includes the ballot storage (45,000 µALGO
with fixed signers), which a draft's instant proposal never uses. The amount stays in the new Guild
as free balance, and `sweep()` sends it to the Guild's treasury.

## Third pass, 2026-11-15: payments from someone other than the caller

The owner's own review of the Guild contracts found that the program registry required the storage
payment to come from the caller. A scan found the same check on 66 grouped payments and asset
transfers in 20 contract files. It came from the October audit's fix plan, whose reason was that a
refund goes to the caller, so the caller should be the one who paid.

Decided on 2026-11-15: remove the check from storage and fee payments, and return a storage deposit
to whoever paid it, in every contract. Akita plans paymaster services, and they must work on every
service.

### What changed

| | Before | Now |
|---|---|---|
| Who may send a grouped payment for storage or a fee | The caller only (`errIpms`). | Anyone. 48 of the 66 checks are gone. A contract that refused a payment which closes out or rekeys its sender still refuses it. |
| Who gets a storage deposit back | The caller, or the record's owner. | Whoever paid it. |
| A transfer that is only value (a deposit into an escrow, a purchase price, a swap leg, tickets or a bid in an asset) | The caller only. | Unchanged: 18 checks stay. Taking value from a third party's transfer on the caller's word is the clawback and griefing surface the October fixes closed. |

### How a payer is remembered

When the payment's sender is not the caller, the contract writes a payer record: a box named `$`
plus the SHA-256 of the record's own box name, holding the payer's address. The helpers are in
`smart_contracts/utils/functions.ts` under "SPONSORED STORAGE" (`sponsorCost`, `recordPayer`,
`payerOf`, `releaseDeposit`).

- The payer record costs 28,500 µALGO (`PayerRecordMBR`, `PAYER_RECORD_MBR` in the SDK). The sponsor
  adds it to the payment, which stays exact, and gets it back with the deposit.
- A caller who pays for themself stores nothing and pays what they paid before. Records that exist
  on MainNet today have no payer record and refund to their owner as before. Nothing is migrated.
- The owner still decides when a record is released. The refund then goes to the payer.
- A payer whose account has closed, when the refund is too small to open it again, forfeits the
  refund to the record's owner. In a Guild it goes to the Guild's treasury, as every Guild refund
  that cannot be delivered does. A refund never fails because of the payer.
- Plugins pay from the wallet's own spending account, which is also the caller, so wallet flows
  store no payer record.

Guild is not deployed, so a Guild proposal names its payers in the proposal itself (`payer` for the
ALGO, `feeTokenPayer` for a fee asset) and a sponsor pays nothing extra. The proposal box costs
25,600 µALGO more for everyone (base 76,900, was 51,300). Guild votes use the payer record.

### Rules that follow from it

| Rule | Where | Why |
|---|---|---|
| One account funds a prepaid record. A top-up from anyone else is refused (`errIpyr`, in Guild `errGpyr`). | Guild proposals (ALGO and fee tokens each have their own payer), AkitaDAO proposals, Meta records, Rewards disbursement credits, and all of one entrant's entries in a staking pool. | The record holds one balance and one refund address. Two payers would need a ledger per record. |
| A payment that carries value and storage together belongs to the caller for the value and to the payer for the storage. | An ALGO stake, an ALGO subscription and its escrow, raffle tickets and auction bids in ALGO, an instant ALGO disbursement, a pool reward's budget, the ALGO leg of a HyperSwap offer. | The value becomes a stake, a bid or a balance that only the owner can take back. A paymaster sponsors these by paying the value too, or by sponsoring the asset form, where the storage payment is separate. |
| A sponsored record cannot be topped up by its owner. | Same records as the first rule. | The owner releases it and creates it again to take over paying. |

The second rule replaces one October decision. HS-03 bound the ALGO leg of a HyperSwap offer to the
participant, because a sponsor loses the principal when the offer is cancelled: the principal
returns to the participant and only the hash storage to the payer. That is now the stated rule for
every payment of this kind, and no longer a refusal. The asset leg's transfer stays bound to the
participant and is never a clawback. `tests/meta-consumers.e2e.spec.ts` (HS-03) pins both.

A deposit stays locked until its record is released. The owner, or the contract's own cleanup,
decides when; a sponsor cannot pull it back. A paymaster therefore needs its own limits on how much
it locks per user, and on the value it adds to a payment that carries value.

### Where the deposit goes now

| Contract | Records with a payer | Returned by |
|---|---|---|
| Guild | Proposals (in the proposal), vote receipts | `deleteProposal`, the settlement when a proposal is rejected, cancelled or executed, `cleanupProposalConsensus` |
| AkitaDAO | Proposals, vote receipts | `deleteProposal`, `editProposal` (a cheaper edit), `deleteProposalVotes` |
| Poll | Votes | `deleteBoxes` |
| AkitaSocial | Vote records, reaction records, the author's own vote on a new post | `editVote` when it removes the vote, `deleteReaction` |
| AkitaSocialGraph | Follows, blocks | `unfollow`, `unblock` |
| Subscriptions | Subscriptions, blocks | `unsubscribe` (the escrow still goes to the subscriber), `unblock` |
| Rewards v2 | Disbursements: the box, the credits and each allocation's storage | `withdrawMbrCredits`, `closeDisbursement`, `sweepExpired` |
| Staking | Direct stakes of every type | `withdraw`, `closeSoftStake`, `closeHeartbeat` |
| StakingPool | An entrant's entries, a reward's boxes | `removeEntry`, `closeReward` |
| Raffle, Auction | Entries, bids | `refundMBR` |
| Meta | Roots, data, records | `deleteRoot`, `deleteData`, `removeRecord`, and a shrinking `setRecord` |
| SocialClaim | Gift boxes. Since the sixth pass (C23) the payer is stored in the gift box itself, for every gift, and SocialClaim writes no payer record. | `refund`, `prune`, a dropped gift |
| PollFactory (since the fifth pass, C24) | A poll's creation deposit | `deletePoll` |

Three refunds changed for callers who sponsor nothing:

- **Rewards `sweepExpired`** sends the unclaimed rewards to the reclaim target as before, and the
  storage to the account that funded the disbursement. Before, the storage also went to the reclaim
  target. They are the same account unless a disbursement was sponsored.
- **StakingPool `removeEntry`** on a SOFT pool pays one refund from the pool. Before, the pool paid
  its part and Staking paid the commitment's 34,900 µALGO separately. The pool now takes that back
  from Staking through the new `Staking.reclaimAppStake(address, asset)` and pays the total.
- **AkitaDAO `voteProposal`** returns anything paid above the cost to the payment's sender.

### Not covered, on purpose

| Case | What happens |
|---|---|
| Storage that is never refunded: a service box, the first-use list boxes, a referral's storage, a paywall, the SocialClaim subject entry, the DAO participation record, gate registrations | Anyone may pay. Nothing comes back to anyone, so no payer is recorded and a sponsor pays no extra. |
| `Subscriptions.adoptPrincipal` | A team-run backfill. Its storage joins the subscription's deposit. |
| Impact `commitStakingImpact` | The deposit is never released. |
| EscrowFactory | The payer is always the calling wallet, which is already the one refunded. |
| A pool creator's `optIn`, and free ALGO left at pool `delete` | Goes to the pool's creator. |
| HyperSwap, and the raffle, auction, staking pool, marketplace and prize box factories | They already stored the payment's sender as the funder. The poll factory did too, until the fifth pass (C24). |

### Costs and limits to know

- A paymaster has 28,500 µALGO per sponsored record tied up until the record is released, on top of
  the deposit. SocialClaim is the exception since the sixth pass (C23): it keeps no payer record,
  and a gift box costs every payer 41,300 µALGO.
- Every call that returns a deposit looks for a payer record, whether one exists or not, and needs
  one more box reference per record. A transaction holds eight, shared across its group. Batch
  refunds fit fewer records per call. `Raffle.refundMBR` and `Auction.refundMBR` reserve more
  opcode budget per record (200 and 160, were 120 and 80).
- Subscriptions is 10,468 bytes and needs a sixth page (5 extra, planned 4). The DAO wallet sponsors
  100,000 µALGO more at E2. `tests/fixtures/subscriptions.ts` creates it with 5 extra pages and
  `subscriptions/principal-shims.test.ts` pins the six-page limit.
- Raffle was refactored to stay inside four pages (8,158 bytes of 8,188). Its two entry paths share
  one storage check and one entry writer; behaviour is the same.
- Staking has a new method, so the new StakingPool child needs the upgraded Staking first. The
  rollout already orders them that way and the Phase 2 runner refuses the other order.
- The SDK exports the constant and the two error messages. Its methods still build the payment from
  the caller. A paymaster builds the payment itself until the methods take a payer.

### Tests

- `utils/shared-helpers.e2e.spec.ts`: the two payment checks, and a payer record through its whole
  life, including a closed payer and a refund large enough to re-open one.
- `arc58/guilds/tests/sponsored-payments.e2e.spec.ts` and one case in `fee-asset.e2e.spec.ts`: a
  sponsored draft, top-up, rejected and executed proposal, vote, new Guild, program upload, and a
  draft whose ALGO and fee tokens both come from a sponsor.
- One or more sponsor cases in the spec of each contract in the table above: the bare deposit from
  another account is refused, the deposit plus the payer record is accepted, and the release pays
  the sponsor and not the owner.
- The full suite on the final state: 144 files, 2,260 tests, 2,253 passed, none failed, 2 skipped,
  5 todo. A first run had two failures, both tests that still pinned the old rule: the HyperSwap
  sponsor refusal (HS-03) and a five-page limit on Subscriptions. Both were updated and their shards
  run again.
- Added after that run, for the record kinds that had no sponsor case of their own: a heartbeat
  stake (`staking/staking.e2e.spec.ts`), a reaction (`social/social.e2e.spec.ts`), and a Merkle root
  with its data (`meta/contract.e2e.spec.ts`). The three spec files pass with them (77, 136 and 46
  passing tests, none failing). No contract code changed after the full run.
- The type check shows the 12 errors it showed before, all in test files. The SDK's 495 unit tests
  pass. `npm run release:manifest:check` passes against the regenerated manifest (155 programs).
- The contracts and the SDK were rebuilt in the owner's checkout after the files were copied in, and
  the manifest check passes there too (155 programs).

## Fourth pass, 2026-11-15: a second review of the payer change

The owner asked for another pass the same evening. It covered the payer change of the third pass,
which nobody but its author had reviewed, and the plugin rule check the owner added to the Guild
contract after that change was delivered.

### What was checked

- Every changed contract, read as a diff against the 59 files the change replaced.
- A payer record cannot be forged. No contract that keeps payer records has a box prefix `$`, and
  the one map there with an empty prefix (Poll votes) has 32-byte names against the payer record's
  33.
- A payer record is written only where a record is created and its sponsor charged, and every place
  that deletes a record releases its payer record.
- Every release names the record's true owner and the amount that record holds.
- What is deployed keeps working. The methods, stored structures and state schema of the 16 programs
  outside Guild that the change touches were compared with the release commit: the only difference is
  the new `Staking.reclaimAppStake`. The 67 wallet plugin calls that carry a payment or a transfer
  send both from the wallet's spending account, so no plugin becomes a sponsor by accident. The SDK
  finds box references by simulation, so the extra reference needs no client change.
- The refund loops at the batch size the desktop app uses, eight records per call.

Nothing was found that forges a payer record, gets one without paying for it, leaves one behind,
redirects a refund or collects one twice.

### Findings

| # | Finding | State |
|---|---|---|
| C22 | HyperSwap pays a storage deposit back to its payer with no fallback. A payer whose account has closed makes that payment fail, and with it the leaf's payout, a cancelled leaf's withdrawal, or a participant's cleanup. | Fixed in this pass. |
| C23 | SocialClaim remembers a gift's payer only when the payer is not the account that sends the call. | Decided by the owner on 2026-11-16: store the payer in every gift and always refund that account. Built in the sixth pass. |
| C24 | A poll treats the account that paid for it as its creator. For a sponsored poll only the sponsor can clear the votes. | Fixed in the fifth pass, 2026-11-16. |
| C25 | The Guild's new plugin rule check covers three of the wallet's four fixed install rules. | Fixed in the fifth pass, 2026-11-16. |

**C22, HyperSwap.** A leaf's storage deposit is 34,900 µALGO and so is a participant's, both below
the 100,000 µALGO a closed account needs to be opened again. The contract paid each
back to the stored payer unconditionally. A participant could fund its leaf from a throwaway
account, close that account, take the other party's leaf with `disburseFrom`, and leave its own leaf
impossible to pay out. A partly paid swap cannot be cancelled, so the other party's only way out was
to send 0.1 ALGO to the closed account, which belongs to the participant that closed it. The same
closed account blocked the participant cleanup and, through it, the offeror's own deposit.

This was already possible for an asset leaf, for `accept` and for `offer`, whose storage payments
took any sender before the payer change. Opening the ALGO leaf to any payer (third pass) extended it
to ALGO leaves, and let a sponsor that goes away block the participant's own `withdraw`. The third
pass also said that a refund never fails because of the payer. That was true of payer records and
not of HyperSwap, which keeps its own.

Fixed: `refundStorage(payor, owner, amount)` pays the payer when it can take the payment, otherwise
the participant the record belongs to (the leaf's funder, the withdrawing caller, the participant
being cleaned up), and leaves the deposit in the contract when neither can. The offer deposit in
`cleanupOffer` is unchanged: at 150,100 µALGO it is above the minimum balance, so it opens a closed
account again and cannot fail for this reason. HyperSwap grows from 3,936 to 3,986 bytes. It has never had an offer on
MainNet and is upgraded at E6 as planned. Two tests in `tests/meta-consumers.e2e.spec.ts`
(AUD-C22) failed on the old program with "balance 34900 below min 100000" and pass on the new one.

**C23, SocialClaim.** `bind` and `contribute` charge and record a sponsor when the storage payment's
sender differs from the caller. Without a payer record the gift box's 28,500 µALGO goes to the
wallet that sent the gift, as it did before the payer change. So a sponsor that pays from its own
account while the user's key sends the call gets its deposit back, and a service that both sends
the call and pays is treated as the user: its deposit goes to the user's wallet when the gift is
refunded, dropped or pruned. Nothing is lost by a paymaster that pays from one account and never
sends the call from it, which fee pooling makes easy. SocialClaim can never be patched once it is
deployed, so the rule has to be chosen first. The alternative is to store the payer in every gift
box and always refund that account: 12,800 µALGO more deposit per gift for everyone, a new shape for
`getGift`, and a self-paid deposit returns to the key that paid it and not to the wallet. Suggested:
keep the contract as it is and state the rule for paymasters.

The owner chose the alternative on 2026-11-16. It is built in the sixth pass, below.

**C24, Poll.** A poll stores one account, `funder`, taken from the sender of the factory payment,
and `deleteBoxes` lets only that account clear the votes (C17). The factory took that payment from
anyone before the payer change, so this is not new, but C17 is what turned the funder into an
authority. For a sponsored poll the author cannot clear the votes, the sponsor can, and each voter's
15,300 µALGO comes back only when the sponsor does it. Fixed in the fifth pass, in the factory and
not in the poll (see "Fifth pass" below). The fix first suggested here, keeping the author beside
the funder in the poll's own global value, was dropped: it changes the shape of a value that
clients decode, and polls created before it would no longer read the same way.

**C25, the Guild's plugin rule check.** `validatePluginSettings` now refuses, when a proposal is
drafted, three installs the wallet would refuse at execution: self delegation with an open caller,
an execution key with a named caller, and `coverFees` with an open caller. Each matches the wallet's
`_addPlugin` exactly. The wallet has a fourth fixed rule that is not mirrored: `defaultToEscrow`
with an empty `escrow` (`errEscrowRequiredToBeSetAsDefault`). Such a proposal still passes a vote
and can never execute. One line closes it:
`loggedAssert(!(plugin.defaultToEscrow && plugin.escrow === ''), errGuildInvalidAction)`. The
wallet's two remaining refusals depend on what is installed at execution time (the plugin key or the
name already exists) and cannot be decided when a proposal is drafted. The owner's new spec
`guild-install-validation.e2e.spec.ts` covers two of the three rules; self delegation with an open
caller has no case yet. The line and the two missing cases were added in the fifth pass.

### Notes for a paymaster

- In a failed raffle with asset tickets, and for a losing bid in an asset, an entrant or bidder who
  has left the asset is paid through a Rewards disbursement, and its cost comes out of the storage
  being released (TRADE-5). When the storage was sponsored, the cost comes out of the sponsor's
  refund, up to all of it. The entrant gains nothing by it.
- SocialClaim: until the sixth pass, pay from an account that does not send the call (C23). Since
  then every payer is refunded, whoever sends the call.
- Poll: until the fifth pass the sponsor of a poll was the only account that could clear its votes
  (C24). Since then the author clears them and the sponsor only gets the deposit back.

### Build and manifest

- With the fix and the owner's Guild check, a full build differs from the manifest of the third
  pass in three programs: HyperSwap (3,986 bytes), MockHyperSwap, and Guild (12,494 bytes, was
  12,436, the owner's change). `release/manifest.json` was regenerated from that build and changes
  in those three entries only. It records the Guild program as the owner's check stood at 22:06 UTC
  on 2026-11-15, so regenerate it after any further contract change.
- The rebuilt HyperSwap and MockHyperSwap artifacts and their two generated SDK clients were copied
  into the owner's checkout with the sources (12 files). Every other generated file there, 1,237 of
  them, already matched this build byte for byte. The SDK's `dist` was not rebuilt: run the SDK
  build before the rollout, as the runbook's preflight already says.
- `npm run build:guilds` on its own wrote AbstractedAccountFactory with the same instructions in a
  different order: same size, different hash. The full build restores the manifest's bytes. Take the
  manifest, and anything that is deployed, from a full build only.

### Tests

- Proof first: the two AUD-C22 tests were run against the program of the third pass and failed at
  the refund to the closed account.
- After a full build with the fix and the owner's Guild files: `tests/meta-consumers.e2e.spec.ts` 26
  tests, the two HyperSwap spec files and `plugin-sdk-hooks` 9 tests, Raffle 36, Auction 40, and the
  19 Guild spec files 115 tests, the owner's new file among them. All pass.
- New in Raffle and Auction: eight sponsored entries, and eight sponsored bids, are refunded by one
  `refundMBR(8)` call, the batch the desktop app sends.
- The other programs are byte-identical to the ones the full suite of the third pass ran against, so
  that run stands for them. The type check shows the same 12 errors as before.

## Fifth pass, 2026-11-16: closing the open points

The owner asked that the work be made ready for MainNet. This pass closes C24 and C25, leaves C23
with the owner, and repeats the release gate (runbook A1) on the result.

### C24, Poll: fixed in the factory

`PollFactory.new` now treats its caller as the poll's author and takes the payment from anyone.

- The poll records `{ account: the caller, amount: newPollCost() }` as its `funder`. Before, it
  recorded the sender of the payment. `Poll.deleteBoxes` still lets only `funder.account` clear the
  votes, which is now always the author.
- A payer that is not the author pays `newPollCost() + PayerRecordMBR` (28,500 µALGO more) and is
  remembered in the factory, in a payer record keyed by the new poll's app id. The author's own
  payment is `newPollCost()`, as before, and writes nothing.
- `deletePoll` releases that record and refunds the payer the deposit and the record's storage.
  With no record it refunds the account the poll records. A sponsor's refund is always above the
  minimum balance (a poll's deposit is about 1.06 ALGO), so a sponsor that closed its account is
  opened again by it and is never skipped.
- The payment must be a plain one now: no close-out and no rekey (`assertPlainPayment`), the rule
  every other payment in the payer change follows.

What did not change: the Poll child program (2,349 bytes; only comments differ in its source), the
`FunderInfo` shape, `newPollCost`, every method signature and both state schemas. PollPlugin is
unaffected: it pays and calls from the wallet's spending account, so it is never a sponsor.

Polls that already exist keep working. They have no payer record, so `deletePoll` refunds the
account they record, and `deleteBoxes` is still that account's call. That includes any poll that was
sponsored before the upgrade: its sponsor stays its creator.

Costs: PollFactory grows from 4,159 to 4,339 bytes. It still needs 2 extra pages (the live app has
3) and three upload chunks, so step E6 is unchanged. `deletePoll` looks for the payer record,
sponsored or not, and needs one more box reference on the factory. The SDK's `deletePoll` finds it
by simulation.

For a paymaster: a sponsored poll's deposit comes back when the poll is deleted, and a poll with
votes can only be deleted after its author has cleared them. The author decides when. That is the
general rule of the third pass (a sponsor cannot pull a deposit back), and for a poll the amount is
about 1.06 ALGO plus the 28,500 µALGO record.

### C25, the Guild's plugin rule check: fixed

One line in `validatePluginSettings`:
`loggedAssert(!(plugin.defaultToEscrow && plugin.escrow === ''), errGuildInvalidAction)`. The
check now mirrors all four of the wallet's fixed install rules. No other Guild rule refuses an
empty escrow name, so the new test case exercises this line and nothing else. Guild grows from
12,494 to 12,534 bytes and still needs 6 extra pages.

In the owner's test files: `addPluginAction` in `test-helpers.ts` takes two more optional
arguments (`defaultToEscrow`, `delegationType`), and `guild-install-validation.e2e.spec.ts` has a
second test for the two cases that had none: self delegation with an open caller, and a default
escrow with no escrow named. It also checks that both settings are accepted with a named caller and
a named escrow.

### C23, SocialClaim: unchanged, the owner's decision

The contract is as it was. The choice was put to the owner on 2026-11-16 with "keep it and state
the rule for paymasters" as the suggested option. It has to be confirmed before step H7, because
SocialClaim can never be patched. Nothing else in the rollout depends on it.

The owner answered later the same day: always refund the account that paid. See the sixth pass.

### Build and manifest

- A whole-tree build differs from the manifest of the fourth pass in two programs: Guild (12,534
  bytes) and PollFactory (4,339 bytes). `release/manifest.json` was regenerated from that build and
  changes in those two entries only. The check passes for 155 programs.
- 18 generated files changed: the artifacts and SDK clients of Guild, Poll and PollFactory. Poll's
  changed in their comments and descriptions only; its program bytes are the same.
- A single-folder build of `smart_contracts/poll` fails on unrelated imports, and the
  `build:poll` script in `package.json` is stale. Use the whole-tree build.

### Tests

- Proof first: the three AUD-C24 tests were run against the factory of the fourth pass. The first
  failed because that factory accepted a sponsor's bare payment and recorded the sponsor, and the
  third failed because it refused a payment that carries the payer record. The second, a poll its
  author pays for, passes on both programs, as it should.
- `poll/poll.e2e.spec.ts`: 26 tests pass, three of them new. A sponsor's bare deposit is refused
  and a rekeying payment is refused. With the payer record paid, the poll records its author, the
  sponsor cannot clear the votes and the author can, anyone can delete the finished poll, and the
  sponsor gets the deposit and the record's storage back. The factory ends with the balance and
  the boxes it started with.
- The full suite on the final state, six shards on LocalNet: 145 files, 2,272 tests, 2,265 passed,
  none failed, 2 skipped, 5 todo. It left every generated file unchanged.
- The SDK was rebuilt and its unit tests pass (49 files, 495 tests). The type check shows the same
  12 errors as before, all in test files.
- The contracts and the SDK were rebuilt in the owner's checkout after the 27 changed files were
  copied in. That build, on macOS, reproduces the one tested here byte for byte: all 1,249 generated
  files and the SDK bundle. The manifest check passes there for 155 programs and the SDK's unit
  tests pass there.
- Live state, read with `rollout:status` on 2026-11-16 (read-only): on MainNet and on TestNet no
  step of this rollout is done. 12 steps are ready, 27 wait on earlier steps, and the DAO is in
  Draft on both. The TestNet rehearsal (runbook A4) has not been run.

### What is left before the first MainNet step

Nothing in the contract code. What remains is the owner's:

1. Confirm C23, the SocialClaim payer rule (needed before H7 only). Decided and built later the
   same day, see the sixth pass.
2. Commit the tree. The fee asset work, the payer change and the fixes C18 to C25 are all
   uncommitted on `release/mainnet-rollout`. The commit is what the rollout deploys from.
3. Repeat A1 on that commit and keep a second copy of the repository (A2).
4. Rehearse stages B to I on TestNet from that commit (A4).
5. The runbook's own open decisions: DEC-4 (which sub-gates get new app ids) before stage C, DEC-3
   (the Meta pointer) before H1, who holds the SocialClaim attestor and manager keys before H7, and
   whether `audits/` is published with the push (I2).

## Sixth pass, 2026-11-16: SocialClaim stores each gift's payer, and the empty-account reads

On 2026-11-16 the owner decided C23: always refund the account that paid. This pass builds that,
and fixes a fault its new tests uncovered, first in SocialClaim (C26) and then in three more
programs that read an account's balance the same way (C27).

### C23, SocialClaim: every gift box stores its payer

- `Gift` is now `{ amount, expiry, payer }`. `bind` and `contribute` record the sender of the
  storage payment as the payer of the gift box that payment creates.
- Every payer pays the same: 18,900 µALGO for a new subject entry (kept, as before) and 41,300
  µALGO for a new gift box (2,500 + 400 × (49 + 48); it was 28,500). SocialClaim no longer writes
  a payer record, and a payer that is not the caller no longer pays the 28,500 µALGO for one. A
  sponsored gift box locks 41,300 µALGO where it locked 57,000.
- A top-up of a box that exists takes a zero payment, from anyone, and the box keeps the payer it
  has.
- `refund`, a dropped gift and `prune` return the box's 41,300 µALGO to its payer. When the payer's
  account is empty, which 41,300 µALGO cannot open again, the deposit goes to the wallet that sent
  the gift, then to the gift wallet, and else stays in the app. A deposit cannot make a refund, a
  drop or a prune fail.
- `getGift` returns `(uint64,uint64,address)`. No other method signature changed, the events are
  the same and the state schema is the same. SocialClaim is 2,697 bytes (it was 2,765).
- With the SDK, `sendToAnyone` and `topUp` build the storage payment from the account that sends
  the group. That account is the payer and gets the deposit back. Before, a deposit the sender
  paid went to the sponsor wallet. `SOCIAL_CLAIM_GIFT_MBR` is `41_300n`, and `getGift` and
  `listGifts` return `payer`.
- `refund` and `prune` no longer look for a payer record (one box reference fewer) and need the
  payer's account available instead. The SDK finds it by simulation.
- SocialClaim has never been deployed, so no gift box of the old shape exists anywhere. No code in
  the desktop app, the mobile app or the backend reads a gift yet.

The note for paymasters in the fourth pass ("pay from an account that does not send the call") no
longer applies: whoever pays is refunded.

### C26, SocialClaim: the empty-account check failed instead of answering

`canReceive` read `receiver.balance`. That read compiles to `acct_params_get AcctBalance` followed
by an assert that the account is funded, so for an account that holds nothing the whole call
fails. That is the one case the check exists to answer. The fallback after it could never be
reached for an empty account.

- In the program as first written, only the sending wallet's and the gift wallet's accounts went
  through the check. A factory wallet's account always holds its minimum balance, so the fault
  could not be reached.
- The payer change of the third pass sent a sponsor's account through it. From then on a sponsor
  that closed its account made the refund and the prune of that gift fail until someone funded the
  sponsor's account again. A prune that fails also fails a claim group it was appended to, which
  is the portal's flow, although the claim alone still went through. C23 as first built here would
  have made that true of every payer.
- Fix: the ALGO case uses the shared `canReceiveAlgo` (`op.AcctParams.acctBalance`, which answers
  instead of failing), the helper Raffle, Auction, the Guild and the payer helpers already use.
- Proof: the new test "a payer that closed its account" failed on the first C23 build at
  `acct_params_get AcctBalance; assert`, and passes with the fix.
- Why earlier passes missed it: the SocialClaim tests of the third and fourth pass had no case with
  a closed payer, and the review read `receiver.balance > 0` as a comparison that answers.

### C27, the same read in Staking, the asset sub-gate and the balance reader

Every other place where a contract reads the ALGO balance of an account it does not control was
then checked. Three had the same read:

| Program | Where | Effect of an account that holds nothing |
|---|---|---|
| Staking | `getHeld`, used by `checkpointSoftStake`, `checkpointAppSoftStake`, `createHeartbeat`, the soft stake clamp and the weighted stake readers, and `softCheck` | Every one of them failed. A holder of an ALGO soft stake who closed the account outright could not be checkpointed, so the stake kept the age it had built up while the funds were somewhere else, and counted in full again once the account was funded. A holder who left 0.1 ALGO behind could be checkpointed, so closing the account was the way around the checkpoint. While the account was empty the reads failed too, so nothing was gained during the gap itself. |
| AssetGate (sub-gate, cannot be patched) | `assetGate`, asset 0 | The check failed instead of comparing a balance of zero. It always denied, also for a gate that an empty account should pass (below an amount, or not equal). |
| AbstractedAccountBalanceReader (cannot be patched) | `balance`, asset 0 | The read failed for an address that holds nothing instead of returning zero. |

- Fix, the same in all three: read the balance with `AcctParams.acctBalance`, which returns zero
  for an account that holds nothing. Staking is 7,302 bytes (was 7,306), AssetGate 712 (was 710),
  the balance reader 283 (was 284). No method signature and no schema changed.
- Staking's own account reads, and reads of the caller's balance (`Txn.sender.balance` in Staking
  and StakingPool), are left as they are: an empty caller fails there, which denies.
- Proof: three new tests failed on the programs of the fifth pass with "account funded" and pass
  on the new ones. `staking.e2e.spec.ts` "AUD-C27": a soft stake whose holder closed the account
  checks as a shortfall, anyone can checkpoint it, and funding the account again does not bring
  the stake or its age back. `gates/asset-gate-algo.e2e.spec.ts` (new file): an empty account is
  checked as a balance of zero. `balance-reader.e2e.spec.ts`: an empty address reads as zero.
- Not checked: whether the Staking program that is live on MainNet today has the same read. It
  matches no commit. The upgrade at D1 installs the fixed program either way.
- Rollout: nothing in the sequence changes. Staking is upgraded at D1 and still fits its pages.
  The asset sub-gate was already among the eight that DEC-4 recommends to deploy again at C1; a
  live asset sub-gate kept in place would not carry this fix. The balance reader is deployed new
  at H5.

### Build and manifest

- A whole-tree build differs from the manifest of the fifth pass in four programs: SocialClaim
  (2,697 bytes), Staking (7,302), AssetGate (712) and AbstractedAccountBalanceReader (283).
  `release/manifest.json` was regenerated and changes in those four entries only. The check passes
  for 155 programs. 28 programs now differ from the release commit (26 before): AssetGate and the
  balance reader are the two new ones.
- 24 generated files changed: the artifacts and clients of those four programs.

### Tests

- `social-claim.e2e.spec.ts`: 18 tests pass, three of them new and five changed. The box records
  the account that paid, also through the ABI's `getGift`. A payer that is not the sender pays
  exactly the deposit, one µALGO more or less is refused. A top-up keeps the box's payer whoever
  sends the empty payment. On refund the gift returns to the sending wallet and the deposit to
  the payer. A first gift someone else pays for, claimed with prune, returns each box's deposit
  to its own payer. A payer that closed its account: the deposit goes to the sending wallet, on
  refund and on prune.
- Staking, the gates, the balance reader, the StakingPlugin and SocialClaim together: 13 files,
  224 tests, all pass.
- SDK: rebuilt, 496 unit tests pass (one new: the deposit constant against the box size). The type
  check shows the same 12 errors as before, all in test files. `tests/release-deployments.test.ts`
  and `tests/migration-scripts.e2e.spec.ts`: 57 tests pass.
- The full suite on the final state, six shards on LocalNet: 146 files, 2,277 tests, 2,270 passed,
  none failed, 2 skipped, 5 todo. It left every generated file unchanged. That is one file and
  five tests more than the fifth pass: the new asset gate file, and the new tests in SocialClaim
  (three, with one removed), Staking and the balance reader.
- The contracts and the SDK were rebuilt in the owner's checkout after the 38 changed files were
  copied in. That build, on macOS, reproduces the one tested here byte for byte: all 1,249 generated
  files and the SDK bundle. The manifest check passes there for 155 programs and the SDK's 496 unit
  tests pass there.

### What is left before the first MainNet step

Nothing in the contract code that this review knows of. What remains is the owner's:

1. The deploy commit. On 2026-11-16 the tree of the fifth pass was committed in the owner's
   checkout on the branch `wip/akita-sc-snapshot-2026-11-16` (d7fb61ee, parent 41e63bc9), at the
   owner's request. The 39 files of this pass and the rebuilt SDK bundle are the commit after it on
   that branch. `release/mainnet-rollout` is still at 41e63bc9, and nothing is pushed or tagged.
   The commit the rollout deploys from, on the release branch, is still to be made.
2. Repeat A1 on the deploy commit and keep a second copy of the repository (A2).
3. Rehearse stages B to I on TestNet from that commit (A4).
4. The runbook's own open decisions: DEC-4 (which sub-gates get new app ids) before stage C, DEC-3
   (the Meta pointer) before H1, who holds the SocialClaim attestor and manager keys before H7, and
   whether `audits/` is published with the push (I2).

This pass, like the ones before it, is one reviewer's work. C26 and C27 were found by a test
written for another change, after four review passes had read the same lines. The contracts that
can never be patched go out on this review and the test suite.

## Seventh pass, 2026-11-16: two additions before the rehearsal

After the release gate passed on 638c6f2e the owner asked for two contract changes and put both in
this release: a one-send plugin route for a deciding signer of a fixed-signer Guild, and
creator-edited highlights with a featured service in Subscriptions. Each was built as its own pull
request against the work branch (#12 and #13) and reviewed here as a diff against 638c6f2e. Four
programs change. Like the passes before it, this is one reviewer's work.

### The direct plugin use of a deciding signer

- What it is. `FixedSignerGuildConsensus.usePlugin(plugin, escrow, methodOffsets, fundsRequest,
  calls)`: a signer whose own weight meets the threshold uses a plugin that the Guild's wallet
  granted to the consensus app, in one send and with no proposal. The consensus app calls
  `arc58_rekeyToPlugin` on the Guild's wallet as the named caller, sends each plugin call itself,
  and ends with `arc58_verifyAuthAddress`. `GuildPlugin.usePluginAsSigner` is the wallet-side
  entry. The owner chose this design and chose to ship it in this release.
- Who can use it. A draft Guild is refused. The caller's own weight must meet the threshold at
  that moment, so a signer below it, a removed signer and a non-signer are refused, and raising
  the threshold above a signer's weight closes the route for that signer. The wallet is read from
  the Guild's own state and is never an argument.
- What a deciding signer can do with it. Only what the grant allows. The wallet enforces, as for
  any named caller: each plugin call names the Guild's wallet as its first argument, the group
  hands the wallet back, method restrictions, cooldown and escrow allowance. A named grant cannot
  use an execution key. The Guild never installs a plugin with admin or reclaim rights. A fee
  reimbursement (`coverFees`) is not paid to a caller that is an app. A plugin cannot call back
  into the consensus app, because the AVM forbids re-entry.
- **C28 (low), fixed in the pull request.** The consensus app is the sender of the plugin calls,
  so a plugin that pays its caller left ALGO in the consensus app, and no method could move it
  out. `usePlugin` now compares the app's balance before and after the use and forwards any gain
  to the Guild app, where `sweep` sends it to the treasury.
- **C29, the design, recorded so nobody is surprised by it.** The route asks one question: does
  this signer's weight meet the threshold. The Guild's vote settings for the plugin, the proposal
  fee and the proposal record do not apply to a plugin granted to the consensus app. Whoever can
  change the threshold, the weights or the signers decides who can use such a grant alone. A Guild
  that wants a vote or a record for a plugin does not grant it to its consensus app.
- A nit, fixed: `GuildPlugin.sweep` had lost its description in the app spec.
- Limits. The route carries only plugin methods that take no transaction arguments, and the SDK
  has no helper yet to encode `calls`. Locked-token and subscription consensus have no such
  method, so `usePluginAsSigner` fails for those Guilds.
- The consensus programs cannot be patched once registered, so this method goes out on this
  review and its tests.

### Subscriptions: editable highlights and a featured service

- What it is. `updateServiceHighlight(id, highlightMessage, highlightColor)` rewrites the two
  fixed fields of one of the caller's services, in any status. `setFeaturedService(payment, id)`
  records one of the caller's services, which must exist and not be shut down, in a new box per
  creator (prefix `f`). `clearFeaturedService()` deletes it. `getFeaturedService(address)` returns
  the id, or 0. SubscriptionsPlugin mirrors the three write methods and pays the storage from the
  wallet's spending account.
- Authorization. Every write is keyed by the caller's address: the service box and the featured
  box are both found under `Txn.sender`, so nobody can touch another creator's.
- Storage. The `Service` struct, the service boxes and every existing method are unchanged. Read
  on MainNet 2026-11-16 (app 3569556497): 13 boxes, none with prefix `f` or `$`, and all four
  service boxes decode under the unchanged layout (a fixed head of 117 bytes, the highlight at byte
  113). After E2 the new method edits those live services in place.
- Costs. The featured box costs 18,900 µALGO, once. Anyone may pay it: a payer that is not the
  creator adds 28,500 µALGO for the payer record, and both come back on clear to whoever paid. If
  that account is closed they go to the creator. Moving the featured service later takes a payment
  of exactly 0 µALGO, from anyone, and leaves the first payer in place. A storage payment that
  closes out or rekeys its sender is refused.
- No fault found. Three points for the apps, none of them a contract change. The featured id is
  not cleared when that service is shut down later, so a reader checks the service's status.
  Every later `setFeaturedService` still needs the 0 µALGO payment in the group. `highlightMessage`
  is not range-checked, as in `newService`.

### Build and manifest

- The two pull requests conflict only in the SDK bundle (`projects/akita-sdk/dist`, 26 files with
  hashed names). Merged, with the bundle rebuilt, a whole-tree build from the lockfile reproduces
  every committed artifact.
- Four programs differ from 638c6f2e: FixedSignerGuildConsensus 5,424 bytes (was 4,886),
  GuildPlugin 5,564 (5,247), Subscriptions 10,801 (10,468) and SubscriptionsPlugin 4,794 (4,461).
  No page count changes: 2, 2, 5 and 2 extra pages. `release/manifest.json` changes in those four
  entries only and the check passes for 155 programs. 29 programs now differ from the release
  commit (28 before): SubscriptionsPlugin is the new one.
- The rollout keeps its steps, page counts, sponsorship and upload groups. The runbook has the
  figures ("Update 2026-11-16 (third)").

### Tests

- `guild-sole-signer.e2e.spec.ts`, 9 tests, from the pull request: the configuration change, the
  vote and the capped budget in one group, the direct use, and its refusals.
- `guild-sole-signer-audit.e2e.spec.ts`, 9 tests written for this pass: a call that names another
  wallet, a use that does not hand the wallet back, method restrictions, a cooldown across
  signers, a removed grant, a removed signer, the consensus app's balance with fee reimbursement,
  a draft Guild, and ALGO sent to the consensus app reaching the treasury through `sweep`.
- `featured.e2e.spec.ts`, 11 tests, from the pull request, and `featured-audit.e2e.spec.ts`, 5
  tests written for this pass: a sponsor that closed its account, a later set paid by someone
  else, a storage payment with close-out or rekey, a highlight edit on a service with a description
  of the maximum length, and a featured service shut down later.
- The Guild, wallet, Pay, Subscriptions and plugin files together on the merged tree: 45 files,
  520 tests, 519 passed, none failed, 1 skipped (it needs the backend).
- SDK: rebuilt, 496 unit tests pass. The type check shows the same 12 errors as before, all in
  test files.
- The full suite and the release gate (A1) are repeated on the commit that holds both changes.
  Their result is recorded with the deploy commit, not here.

### What is left before the first MainNet step

1. The deploy commit. 638c6f2e is no longer it. The commit that holds both changes replaces it
   once A1 passes there and the owner moves `release/mainnet-rollout` to it.
2. Rehearse stages B to I on TestNet from that commit (A4).
3. The runbook's own open decisions, unchanged: DEC-4 before stage C, DEC-3 before H1, who holds
   the SocialClaim attestor and manager keys before H7, and whether `audits/` is published with
   the push (I2).

## Eighth pass, 2026-11-16: a caller may remove its own grant

After the seventh pass the owner asked for one more change in this release: the account named as a
grant's caller can remove that grant. The case is an agent that Akita runs. When its user points
the agent's NFD away, the agent is shut down, and the grants users gave it are useless and hold
storage in their wallets. The owner also said the revocation app is not needed until the plugin
system opens to others, so none is built here. The change is in the wallet program and one new
fault in the existing check came out of testing it (C30). This pass wrote the change and reviewed
it: nobody else has read it.

### The rule

- `arc58_removePlugin(plugin, caller, escrow)` accepts a third sender next to the admin and the
  revocation app: the account named as `caller` in that grant.
- Two kinds of grant have no such caller. An admin-type grant is stored under the wallet's own
  address, and a plugin that holds the main account can send as that address, so that address
  never counts. A grant open to anyone is stored under the zero address, which cannot send.
- The storage goes back to the wallet, never to the caller. A wallet whose controlled address is a
  separate account refunds with an inner payment of fee 0, so the sender covers that fee.
- A caller's own removal sets `lastChange` and leaves `lastUserInteraction` alone. That also holds
  when one of the wallet's own keys is the named caller and removes its grant this way. Nothing
  on-chain reads either value.
- `arc58_removeNamedPlugin` and `arc58_removeAllowances` keep their check: the admin or the
  revocation app. A caller that removes its own grant leaves the grant's alias, its escrow and the
  escrow's allowances for the admin. `arc58_removeNamedPlugin` already accepts an alias whose grant
  is gone (ACC-05), so the admin can clear it.
- Why it is not a plugin method. The owner's first wording was a method on every plugin. The
  wallet does not accept a plugin's address for a removal, so such a method does nothing, and a
  forwarder named as a wallet's revocation app lets anyone strip that wallet's plugins (ACCT-9).
  The plugin package's README now says so.

### What was checked

- An open window gives nobody this route. A top-level call to the wallet inside a window is
  refused. An inner call sent as the wallet's own address is the excluded case above. A plugin
  that is itself the named caller of a grant can remove that one grant, which is the rule.
  `arc58_verifyAuthAddress` does not read the grant, so a caller app that removes its own grant
  inside its own window still closes the window.
- An account that names itself on a grant it does not hold fails with `errNplg` and changes
  nothing.
- A grant with method restrictions, with an escrow, or past its expiry is removed like any other,
  and the wallet's minimum balance returns to its value before the grant.
- Guild. The fixed-signer plugin route (seventh pass) never calls a removal. The Guild's own
  record of a grant exists only for grants open to anyone, which have no caller. A proposal to
  remove an unnamed grant whose caller has already removed it fails at the wallet with `errNplg`:
  there is nothing left to remove.
- DAO. `bootstrapGrants` is a list for readers and no check uses it. If a bootstrap grantee
  removes its own unnamed grant, that entry stays, because the DAO's removal fails at the wallet
  before the entry is deleted. For a named grant the DAO removes by name, which succeeds and
  deletes the entry.

### C30 (low), fixed here

- The fault. `canRevoke()` compared the sender with the address of the wallet's revocation app.
  With no revocation app the id is 0, and the AVM resolves app 0 to the calling program, so the
  comparison was with the wallet's own address. A plugin that holds a main-account window can send
  as that address. On such a wallet it passed as the revocation app and could remove any plugin
  grant, alias or allowance.
- Who is affected. Every wallet with no revocation app, which is every wallet the live factory
  made: its `revocation` is 0 (app 3569556257, read on MainNet 2026-11-16). The live wallet
  program 1.0.1 has the same check (the DAO wallet 3569559153, same read).
- Why low. It removes and cannot add, and a plugin with a main-account window already controls the
  main account for that window. No plugin in this tree calls a wallet removal from inside a
  window: only the Guild and the DAO call them, as admin of their own wallets. It matters once
  plugins from others exist.
- The fix. `canRevoke()` compares the app that calls the wallet with the revocation app, where it
  compared the sender. No app can call itself, so with id 0 nobody passes. The check is the same
  size as before. A revocation app passes as it did, because it calls the wallet itself. One
  difference: an account that only sends as the revocation app's address, without that app being
  the caller, no longer passes. That takes the revocation app's own account rekeyed to someone
  else, and nothing here does that.
- The evidence. The fifth test in `self-revocation.e2e.spec.ts` sets the revocation app to 0 and
  has a plugin attempt the removal from inside its window. It passed the check before the fix and
  is refused after it. A wallet with a revocation app still accepts that app:
  `agent-delegation.e2e.spec.ts`, "configured emergency app removes a Global grant for every
  caller", passes on the new check.
- Live wallets keep the old check until F1 and F2 replace the program.

### Size, build and manifest

- AbstractedAccount is 8,160 bytes (was 8,139): the rule is 21 bytes and the C30 fix none. A first
  form of the fix, which refused the wallet's own address as sender, cost 12 bytes and was
  replaced for that reason. The limit for a program is 4 pages, 8,192 bytes with the clear
  program, so 28 bytes are left. The live program is 8,186. A later wallet change has to fit in
  28 bytes or free some first.
- No method, schema or page count changes. A whole-tree build changes three programs: the wallet
  and two that never deploy, Arc58AgentProbePlugin (291 bytes, was 184: a method that attempts
  the removal from inside a window) and MockBigWallet (10,579, was 10,558: it inherits the wallet).
- `release/manifest.json`: those three entries change, and Arc58AgentRevoker is now marked as never
  deployed, which the naming rule had missed. 155 programs, 85 that deploy and 70 that never do.
  32 programs differ from the release commit, 27 of them programs that deploy: the wallet is the
  new one.
- The rollout keeps its steps, page counts and upload groups. The runbook has the figures ("Update
  2026-11-16 (fourth)").
- SDK. `wallet.removePlugin` already takes any sender, so no method was added. The text for
  `errOarp` names the third sender.

### Tests

- `self-revocation.e2e.spec.ts`, 5 tests written for this pass: the named caller removes its grant
  and the storage returns; restrictions, an escrow and expiry do not block it; a caller cannot
  remove another caller's grant, a grant open to anyone or an admin grant; a plugin cannot remove
  an admin grant by sending as the wallet's account; and the C30 case.
- The wallet, agent, Guild and plugin files (`smart_contracts/arc58/account`, `arc58/guilds`,
  `arc58/plugins`) with the rule and the first form of the C30 fix: 71 files, 653 tests, 652
  passed, none failed, 1 skipped (it needs the backend). Then the wallet files, the Guild test on a
  real wallet and the Guild plugin files again on the final build, with the final form of the fix:
  20 files, 217 tests, 216 passed, none failed, the same 1 skipped.
- SDK: rebuilt, 496 unit tests pass. The type check shows the same 12 errors as before, all in
  test files.
- The full suite and the release gate (A1) are repeated on the commit that holds this change.
  Their result is recorded with the deploy commit, not here.

### What is left before the first MainNet step

1. The deploy commit. The gate passed on 740ec90f, which does not hold this change. The commit
   that does replaces it once A1 passes there and the owner moves `release/mainnet-rollout` to it.
2. Rehearse stages B to I on TestNet from that commit (A4).
3. The runbook's own open decisions, unchanged: DEC-4 before stage C, DEC-3 before H1, who holds
   the SocialClaim attestor and manager keys before H7, and whether `audits/` is published with
   the push (I2).
