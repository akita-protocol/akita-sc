# Full contract security audit — 2026-10-02

Read-only review of every contract family in `projects/akita-sc/smart_contracts`
(plus `projects/akita-plugin`) against the working tree at `e7f174ee` + uncommitted
changes. Ten reviewers ran in parallel, one per family; each finding was traced
through the code. Items marked **✔ re-verified** were independently re-checked
against source while consolidating. Nothing was built, edited, or sent on-chain.

Per-family reports (full exploit scenarios, suggested fixes, "checked and OK" lists):

| Family | Report |
|---|---|
| ARC-58 account, escrow, base contracts, plugin lib | [audit-account.md](audit-account.md) |
| DAO, validator, DAO + update plugins | [audit-dao.md](audit-dao.md) |
| Guilds | [audit-guilds.md](audit-guilds.md) |
| Staking, Staking Pool, Rewards | [audit-staking.md](audit-staking.md) |
| Social (4 apps + plugin) | [audit-social.md](audit-social.md) |
| Subscriptions, Gate + 16 sub-gates | [audit-subs-gates.md](audit-subs-gates.md) |
| Marketplace, PrizeBox, PluginDex | [audit-marketplace.md](audit-marketplace.md) |
| Auction, Raffle | [audit-auction-raffle.md](audit-auction-raffle.md) |
| Meta, HyperSwap, Poll | [audit-meta-swap-poll.md](audit-meta-swap-poll.md) |
| Remaining plugins, Sunset | [audit-plugins-sunset.md](audit-plugins-sunset.md) |

## 1. CONTRACT_AUDIT.md does not reflect the code

`CONTRACT_AUDIT.md` (2026-07-14) lists a remediation matrix as done. For most
families the fixes are **not present** in the working tree, HEAD, any local or
remote branch, any worktree, or the `refs/t3/checkpoints/*` refs (verified by
searching all refs for the Listing `purchaseAsa` decorator fix; the per-family
diffs vs HEAD are error-constant renames only). Missing:

- Marketplace (ASA purchase `NoOp`, opt-in overfunding, sender binding, price floor), PrizeBox (dup opt-in, funder records)
- Staking (init, heartbeat manager, ALGO heartbeat, type validation, MBR refunds/close paths)
- Rewards (finalize guard, expiration 0, instant-batch validation, `closeDisbursement`)
- Subscriptions (sender/clawback binding, subscriber as gate subject, ALGO referral on creation, pass cleanup key, service MBR)
- Gates (operator/structure validation, NFD slicing)
- Auction / Raffle (raffle-pool exclusion of winner, self-outbid, zero-fee bypass, escrow receiver, raffle bounds + cancel, factory refund separation)
- Social sender binding, Escrow factory refund/binding, HyperSwap funding binding, Poll enum + factory refund, DAO vote-deposit funder/refunds, Sunset factory auth
- Staking Pool fixes **are** present.

Treat `CONTRACT_AUDIT.md` as a spec of intended behavior, not a record of fixes.
If that July remediation exists somewhere else (another machine, a lost worktree),
recovering it would close a large share of the findings below.

## 2. Mainnet exposure

Per `reports/mainnet-app-versions-2026-09-11.md`, the following affected apps are
live: rewards (update counter 0), hyperSwap, social / socialGraph / socialImpact,
subscriptions, marketplace, auctionFactory, raffleFactory, pollFactory,
prizeBoxFactory, stakingPoolFactory, escrowFactory, walletFactory, dao, gates,
revenueManagerPlugin. **Not yet checked: whether the deployed bytecode contains
each bug.** Before anything else, confirm C-1 (Rewards) and C-3 (HyperSwap)
against the live programs and current app balances.

## 3. Findings by severity

IDs refer to the per-family reports.

### Critical

| ID | Area | Finding | Location |
|---|---|---|---|
| C-1 ✔ | Rewards | `createAsaDisbursementFromGroup` reads payment/asset transfers by caller-chosen group index with no uniqueness — N calls reuse one deposit, minting N× MBR credit (withdrawable) and N× allocations. Drains every other user's rewards and MBR. | `rewards/contract.algo.ts:260-327`, `:124-135` |
| C-2 ✔ | Sunset | `WalletFactorySunsetContract` has no auth on any method; once the wallet factory runs it, anyone can `deleteWallet(dao, attacker)`, `delete(attacker)`, or push sunset code to any auto-update wallet and drain it. Exposure starts when `SunsetContract` is put in the live factory's `bc` box. | `sunset/wallet-factory.algo.ts:42-131`; `arc58/account/factory.algo.ts:299-307` |
| C-3 ✔ | HyperSwap | `disburse` hashes the leaf with `Txn.sender` (only the funder can release it), and `cancel` is allowed in DISBURSING after expiry → the last party withholds its leaf, cancels, withdraws, and keeps both sides. | `hyper-swap/contract.algo.ts:357-367`, `:462-466`, `:504-566` |

### High

| ID | Area | Finding | Location |
|---|---|---|---|
| ACC-01 / SG-04 ✔ | Protocol-wide | Origin spoofing: any app can `EscrowFactory.register(pay, 0)` itself; `getOriginAccount` trusts its `controlled_address`. Gates are evaluated on a victim's address for an attacker's action (auction bids, marketplace, subscriptions, staking pools). | `escrow/factory.algo.ts:78-101`; `utils/functions.ts:142-206` |
| S-01 ✔ | Social | `votelist`/`reactionlist` keyed by 16-byte ref prefix; `editVote`/`deleteReaction` act on caller's full ref → unlimited vote/impact/reaction manipulation, self-upvote. | `social/contract.algo.ts:22-24, 484-487, 928-961, 992-1009` |
| S-02 ✔ | Social | `initMeta` creates meta for any `user` (regression vs HEAD) → victims permanently `automated` (cannot vote/follow); enables S-03. | `social/contract.algo.ts:1025-1095` |
| S-03 | Social | 16-byte follow keys + fake meta → follower-gate bypass and unbounded follower-count decrement. | `social/graph.algo.ts:47-91, 171-207` |
| MKT-01 ✔ | Marketplace | `purchaseAsa` decorator compiles to `NoOp`; listing never deleted but factory refunds full deposit → ~0.76 ALGO/sale drained; loopable. | `marketplace/listing.algo.ts:376-399`; `marketplace.algo.ts:368-436` |
| MKT-02 | Marketplace plugin | Pays current listing price with no max-price bound; seller can front-run with `changePrice`. | `arc58/plugins/marketplace/contract.algo.ts:243-352` |
| HS-02 | HyperSwap | Offeror can under-declare leaves so offer reaches DISBURSING without offeror funding; unbounded expiration locks counterparties. | `hyper-swap/contract.algo.ts:94-159, 262-268, 340-345` |
| DAO-01 ✔ | DAO | Pre-init creator proposals are stored Approved, never expire, can't be deleted → staged `ChangeAdmin`/`UpgradeApp` executable later. (Check mainnet for any unexecuted pre-init proposals.) | `arc58/dao/contract.algo.ts:171-192, 839-847, 994-1081` |
| SG-01 | Subscriptions | ASA service creation pays the ALGO-denominated referral in units of the service ASA, out of pooled subscriber escrow. | `subscriptions/contract.algo.ts:538`; plugin `:141-167` |
| SG-02 | Subscriptions | `streakCheck` increments on every call → streak inflation (streak gate, impact). | `subscriptions/contract.algo.ts:145-163, 1009` |
| SG-03 | Gates | Subscription / streak gates ignore `serviceID` → dust donation passes for decades. | `gates/sub-gates/subscription*/contract.algo.ts` |
| SG-07 | Gates | NFD-root gate skips root check for root-level NFDs and suffix-matches without `.` delimiter. | `gates/sub-gates/nfd-root/contract.algo.ts:40-53` |
| H-1 | Staking Pool | `checkpointAppSoftStake` is permissionless with any app id → SOFT pool entries stay valid with zero holdings. | `staking/contract.algo.ts:690-705`; `staking-pool/contract.algo.ts:534-541` |
| H-2 | Staking Pool | Reward weight not tied to real stake (NONE pools unchecked, heartbeat flash balance, self-minted assets); 2^64-1 quantity overflow blocks pool. | `staking-pool/contract.algo.ts:743-803` |
| H-3 | Staking Pool | Two entries for one address (normal for NFT pools) → second Rewards allocation reverts, round never completes. | `staking-pool/contract.algo.ts:332-476`; `rewards/contract.algo.ts:207,242` |
| H-4 | Staking Pool | Sign-ups during allocation are unfunded → round reverts or overpays. | `staking-pool/contract.algo.ts:294-426` |
| H-5 | Staking Pool | Permissionless `gateCheck` with caller-supplied args disqualifies gated entrants. | `staking-pool/contract.algo.ts:1130-1140` |
| H-6 | Staking Pool | Shuffle cursor not persisted, `iterationAmount -= i` underflow, same-seed redraw, seed known before ranges fixed. | `staking-pool/contract.algo.ts:438-520, 1024-1063` |
| AR-01 ✔ | Auction / Raffle | Draw round set to `Global.round - 8` on first permissionless `raffle()` call → seed already public; caller times the call to win. | `auction/contract.algo.ts:753-781`; `raffle/contract.algo.ts:525-551` |
| AR-02 | Auction | `weightedBidTotal` includes highest bidder but `findWinner` skips it → no winner, no redraw, everything locked. | `auction/contract.algo.ts:149-170, 775-815` |
| AR-03 | Auction | Raffle pool counts the winning bid's fee (not retained) → last loser refund fails. | `auction/contract.algo.ts:463-507, 877-941` |
| AR-04 | Auction | No-bid auction: `claimPrize` reads missing `bids(0)`; no cancel after start → prize locked. | `auction/contract.algo.ts:626-630, 877-883` |
| AR-05 | Auction | Delete can never succeed (re-closes closed ASA; zero-fee never sets `rafflePrizeClaimed`). | `auction/contract.algo.ts:592-604`; `factory.algo.ts:323-337` |
| AR-06 ✔ | Auction | ASA protocol fee sent to DAO app address after checking the escrow's opt-in → `claimPrize` reverts for ASA bids. | `auction/contract.algo.ts:320-334` |
| AR-07 | Raffle | 0/1 tickets → `pcg64Random` asserts; no cancel path or bounds validation → prize + ≥52 ALGO MBR locked. | `raffle/contract.algo.ts:545-551` |
| AR-08 | Raffle | >4096 entries: chunked winner search loses position → wrong/steerable winner or underflow lock. | `raffle/contract.algo.ts:177-192, 588-589` |
| AR-09 | Raffle | Delete closes nothing yet factory refunds full `totalMBR` incl. forwarded fee → drains factory pool. | `raffle/factory.algo.ts:94-127, 291-303` |

### Medium

| ID | Area | Finding |
|---|---|---|
| DAO-02 | DAO | UpdateFields (60%) can rewrite UpgradeApp thresholds, `staking`, validator, update plugin. |
| DAO-03 | DAO | UpgradeApp class is advisory: a low-threshold ExecutePlugin key can carry an upgrade group. |
| DAO-04 | DAO | Quorum denominator (raw locked) vs numerator (time-decayed power) → quorum unreachable as locks age; self-deadlocking. |
| DAO-05 | DAO / Staking | AKTA/BONES creator can change max lock duration unbounded → inflate or zero governance power. |
| ACC-02 | Account | `coverFees` reimburses caller-set fee up to 0.272 ALGO per rekey window. |
| ACC-03 | Account | Drip allowance resets `last = now` (zero-amount requests freeze refill); overflow after long idle. |
| ACC-04 | Account | Global plugin keys let anyone `pluginReclaim` / `pluginOptInEscrow` (SDK defaults `canReclaim: true`). |
| PL-01 | Poll | Factory refunds 0.1 ALGO forwarded to child that is never closed back; permissionless delete → drain. |
| S-04 | Social | Wall gate (`addressGateID`) bypass via `RefTypePost` reply/react on an address box. |
| S-05 | Social | MBR constants undercharge several paths; referral payouts on votes/reactions not charged → app drains. |
| SG-05 | Subscriptions | Gated trigger checks the keeper, not the subscriber. |
| SG-06 | Gates | `Gate.evaluate` nesting/operator precedence wrong; unknown operators drop results. |
| SG-08 / SG-09 | Subscriptions | Pass box keyed by service on unsubscribe; pass MBR overcharged; service MBR far too low. |
| SG-10 | Gates | Staking-amount gate trusts stale SOFT records. |
| MKT-03 | Marketplace | Factory refunds stored `totalMBR` incl. MBR forwarded/spent elsewhere → pool drain. |
| MKT-06 | Marketplace | Listed quantity never stored/checked → clawback-holding seller empties listing. |
| PD-02 | PluginDex | Permissionless pools with arbitrary hooks share one DEX account (latent). **Resolved by the PluginDex v2 rewrite (2026-10-03): per-pool escrows, custody guard, version-pinned approved hooks.** |
| M-1..M-5 | Staking / Rewards | Empty/single-staker rounds stuck; heartbeat never updates; soft stake checked only at read; rewards claim-before-finalize and expiration-0 inversion; pool funds unrecoverable. |
| F2 / F3 | Revenue Manager | Anyone can fill RM's balance with undeletable boxes; one receiver can freeze a cycle forever (no abort). |
| F4 | NFD plugin | `autoRenew` doesn't check NFD ownership (Likely). |
| AR-10, AR-11, AR-13 | Auction / Raffle | Referral front-run on permissionless claims; prize asset = bid asset traps funds; factory refund includes Rewards MBR. |

### Low / Info

See the per-family reports. Notable: DAO plugin governance path broken (DAO-06),
DAO rejected proposals undeletable and stuck-in-Voting cases (DAO-08/09),
two DAO settings unchangeable (DAO-10), plugins not using `controls()` (F5),
`SunsetContract.deleteBoxes` unauthenticated (F6), Poll type check is a range (PL-02),
HyperSwap funding not sender-bound (HS-03), passkey logicsigs can't verify real
WebAuthn and skip rpIdHash/flags (ACC-09), co-admin passkeys survive admin changes
(ACC-06), Guild liveness L-1..L-3 (unreachable proposal settings, refunds to closed
accounts, locked-token dependence on asset creator), PrizeBox PB-01/PB-02, Social
plugin `editReply` byte range, SocialFollowerCountGate calls a private method.

## 4. Clean areas

Guilds (no Critical/High/Medium; Sept remediation holds), Meta / MetaPlugin,
ARC-58 rekey window and admin-plugin binding, execution keys, flat/window
allowance math, Haystack router pinning, UpdateAkitaDAO plugin, wallet factory
`newAccount` accounting, staking hard/lock withdrawal, DAO proposal lifecycle and
codec agreement, inner-txn fees (0 everywhere checked).

## 5. Suggested order of work

1. Confirm C-1 and C-3 against live mainnet bytecode and balances; decide on pausing/upgrading Rewards and HyperSwap.
2. Do not proceed with any sunset step until C-2 is fixed.
3. Fix origin spoofing (ACC-01) — one change in `utils/functions.ts` / escrow registration closes gate bypasses protocol-wide.
4. Social S-01..S-03 (live, cheap to exploit).
5. Locate or redo the July remediation (Marketplace, Auction, Raffle, Staking, Rewards, Subscriptions, Gates).
6. Staking Pool, DAO governance-design items, then Medium/Low.

No contract changes have been made. Each fix needs explicit approval.
