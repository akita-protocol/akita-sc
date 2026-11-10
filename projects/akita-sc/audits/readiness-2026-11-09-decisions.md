# Readiness audit 2026-11-09: decisions and accepted risks

Owner decisions on the code findings of the 2026-11-09 readiness audit (C1 to C9), recorded on
2026-11-09. Findings marked "accepted" are known, were weighed and are not to be fixed in the
contracts; reviewers should not report them again unless the facts below change.

## Fixed

| ID | Finding | What changed |
|---|---|---|
| C1, C2 | Plugins trusted the spending address of any app passed as `wallet`, so a fake wallet could point a plugin at its own account. | 16 plugin contracts read `getControlledSpendingAccount`, which asserts the account is rekeyed to the plugin right now (`errNath`). `AkitaDAOPlugin.voteProposal` reads participation for the wallet's account. Guard test `arc58/plugins/controlled-spending.test.ts`, attack test `arc58/plugins/spoofed-wallet.e2e.spec.ts`. |
| C3 | GuildPlugin paid whatever the Guild app quoted at execution. | Every paying GuildPlugin method takes `maxCost`, the cost quoted when the call was built (for an approved group, at proposal time), and fails with `errGcle` when the cost at execution is higher. The SDK fills it from the Guild's own cost readers. `createGuild` cannot be quoted ahead of time because part of its cost is storage in a Guild that does not exist yet; pass `maxCost` explicitly to bound it. |
| C5 (storage) | SocialClaim storage was prefunded by Akita and could be used up by cheap calls. | `bind` and `contribute` take a storage payment from the sender: 18,900 µALGO for a new subject entry (kept) and 28,500 µALGO for each new gift entry (returned to the sender's wallet when the gift is refunded or pruned). The app needs only its own 0.1 ALGO. |
| C6 | One closed account stopped the refund loops of Raffle, Auction and Poll. | The loops skip an ALGO payment the receiver cannot take (closed account, amount below the minimum balance). The skipped amount leaves with the child's account at deletion: it goes into the funder's storage refund up to the funder's recorded deposit, and anything above that stays in the factory. `Auction.refundBid` on its own still fails instead of skipping, so a single refund is never dropped. |
| C7 | The 100 ALGO Meta type fee had no way out of the app. | Meta counts each fee, less the type's storage, in `type_fees`. `collectTypeFees()` (anyone may call it) sends the amount to the revenue escrow the DAO names with `updateAkitaDAOEscrow`. |

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

## Accepted

| ID | Risk | Why it is accepted | What keeps it in check |
|---|---|---|---|
| C4 | DAO execution keys are not bound to a plugin (DAO-03 option 3B was not built), so per-plugin execute thresholds are advisory among plugins that use execution keys, other than the Update plugin. | What a prepared group will do cannot be verified on chain. | The app checks the prepared group behind an execution key during the proposal's voting stage and shows voters what it will run. |
| C5 (attestor) | One ed25519 attestor key can claim every pending SocialClaim gift wallet. | By design, as the trade-off for a simple claim flow. | Akita holds the new wallets and hands each one over when the recipient proves they own the social account. |
| C8 | A designated caller with cooldown 0 can spend up to 272 minimum fees per window through wallet `coverFees`. | Small, bounded and only open to a caller the wallet owner designated. | The bound itself. |
| C9 | Referrers are self-asserted, so referring yourself is a discount, and each referral payment is its own Rewards disbursement paid for by the referred user. | No fix found that does not give up decentralisation, self-custody or convenience. | Nothing further; treated as a discount. |

## Still open from the same audit

C5's third part (whether binding a handle first should make the binder the referrer of the
recipient's wallet) and C10 to C17 have no decision yet.
