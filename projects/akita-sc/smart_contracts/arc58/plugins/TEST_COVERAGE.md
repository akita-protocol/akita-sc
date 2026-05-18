# ARC58 Plugin Test Coverage

This inventory tracks the production ARC58 plugin surface and the current fundamental coverage status.

## Broad Coverage Added

`plugin-sdk-hooks.e2e.spec.ts` deploys the Akita universe and verifies every production plugin SDK method exposes a valid ARC58 hook:

- 23 production plugin SDKs
- 113 no-args hook methods
- `SubscriptionsPluginSDK.newServiceWithDescription` helper sequence

This catches missing/invalid selectors and broken hook factories across the whole plugin SDK surface.

## Behavior Coverage Gaps

The table below is a conservative source scan: a method is marked as a gap when its plugin-local e2e spec does not directly reference that method name. Some behavior may be exercised indirectly through shared fixtures or higher-level flows, but these should still get explicit method-level assertions.

| Plugin | Contract methods needing explicit behavior tests |
| --- | --- |
| `asa-mint` | None found |
| `auction` | `new`, `listPrizeBox`, `clearWeightsBoxes`, `deleteAuctionApp`, `bid`, `refundBid`, `claimPrize`, `claimRafflePrize`, `raffle`, `findWinner`, `deleteApplication`, `cancel` |
| `dao` | `setup`, `newProposal`, `editProposal`, `submitProposal`, `voteProposal`, `finalizeProposal`, `executeProposal` |
| `dual-stake` | `mint` success path, `redeem` success path |
| `gate` | None found |
| `hyper-swap` | None found |
| `marketplace` | None |
| `nfd` | `deleteFields`, `updateFields`, `offerForSale`, `cancelSale`, `postOffer`, `purchase`, `updateHash`, `contractLock`, `segmentLock`, `vaultOptInLock`, `vaultOptIn`, `vaultSend`, `renew`, `setPrimaryAddress` |
| `optin` | None found |
| `pay` | None found |
| `pay-silo` | None found |
| `poll` | None found |
| `raffle` | `newRaffle`, `newPrizeBoxRaffle`, `enter`, `raffle`, `findWinner`, `claimRafflePrize`, `deleteRaffleApplication` |
| `revenue-manager` | None |
| `rewards` | `createDisbursement`, `editDisbursement`, `createUserAllocations`, `createAsaUserAllocations`, `finalizeDisbursement`, `claimRewards`, `reclaimRewards` |
| `self-optin` | None found |
| `social` | `post`, `editPost`, `gatedReply`, `reply`, `gatedEditReply`, `editReply`, `vote`, `editVote`, `gatedReact`, `react`, `deleteReaction`, `gatedFollow`, `unfollow`, `block`, `unblock`, `addModerator`, `removeModerator`, `ban`, `flagPost`, `unflagPost`, `unban`, `addAction`, `removeAction`, `updateMeta`, `updateSubscriptionStateModifier`, `registerRefType` |
| `staking` | `createHeartbeat` |
| `staking-pool` | None |
| `subscriptions` | None found |
| `sunset` | None found |
| `update-akita-dao` | `setClearProgram`, `initBoxedContract`, `loadBoxedContract`, `deleteBoxedContract`, `updateApp`, `updateAkitaDaoAppIDForApp`, `updateAkitaDaoEscrowForApp`, `updateRevocation` |

## Test Standard

Each method should have at least:

- one successful wallet `usePlugin` path or direct plugin call when wallet use is not applicable
- one negative assertion for the method's primary guard
- observable state, balance, box, app, or transaction result assertions
