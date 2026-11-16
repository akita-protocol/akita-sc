# Rollout order: additions from the 2026-10-05 review

These steps add to PHASE-0-SPEC.md §9.5. Each one is now enforced by a script, so an out-of-order run
stops before it sends anything. Findings: `projects/akita-sc/audits/review-2026-10-05/` (ACCT, ROLLOUT, MISC).

## Before Phase 2 StakingPoolFactory (ROLLOUT-1)

The new StakingPool child calls `Staking.reclaimAppStake`, `Rewards.closeDisbursement` and `Gate.checkFor`.
The deployed Staking (3642366153), Rewards v1 (3569556095) and Gate v1 (3569558504) do not route them.

1. Upgrade Staking (`npm run update:staking`).
2. Deploy Rewards v2 with a receipt (`npm run deploy:rewards -- --manifest <file>`), opt it into the payout
   ASAs, then rerun with `--register` to repoint `aal.rewards` (guarded DAO proposal).
3. Point `aal.gate` at Gate v2 (see the full order in `docs/rollout/MAINNET-ROLLOUT.md`, stage C).
4. Run Phase 2 `--target StakingPoolFactory`.

The Phase 2 runner reads `aal.staking`, `aal.rewards` and `aal.gate` and refuses the target while any live
program lacks a method that the new child or factory calls. Since 2026-10-10 AkitaSocial, Subscriptions,
Marketplace, AuctionFactory and RaffleFactory also wait for Gate v2 (their hinted gated paths call
`Gate.mustCheckFor`).

## AbstractedAccountFactory and the wallet child (ACCT-3, ROLLOUT-3)

- The factory upgrade and the AbstractedAccount child always land in one execution group.
- `--skip-wallet-child` is removed. `--split-children` is refused for this target.
- `update:wallet-factory` without `--update-factory` pushes only the child. It refuses while the live
  factory cannot create the new wallet (the deployed factory has the old create selector and an AVM 11
  clear program).
- `update:account-factory` upgrades the factory and the child together.
- There is no canary that ships the factory without the wallet. The ROLLOUT-5 suggestion to use
  `--skip-wallet-child` for that is dropped.
- AVM 13 is one-way. Once the DAO wallet runs the tree wallet, every later program for it (sunset
  included) must be AVM 13 or higher.

## Ride-along upgrades that break a deployed plugin (ROLLOUT-2, MISC-6)

Both targets are selected with `--target` only (never by default) and go through the Phase 2 ABI guard.
The run deploys the new plugin version (`--manifest-dir`, or `--lockstep-deployed Name=id`) and swaps
the DAO wallet grants in the same run. Pass `--register` so that the SDK registry gets the new id and
`getPluginUpdate` flags the old grants in user wallets.

| Target | Script | Breaks | Grant swap |
|---|---|---|---|
| HyperSwap | `update:hyper-swap` or `--target HyperSwap` | deployed HyperSwapPlugin `accept` (removal accepted as decision ROLLOUT-2, 2026-10-05) | right after the upgrade (the new plugin calls the new `accept`) |
| PollFactory | `update:poll` or `--target PollFactory` | deployed PollPlugin poll creation (it pays one program page; the factory now charges two) | before the upgrade (the new plugin reads `newPollCost`, so it works on both factories) |

On a voting DAO the upgrade is only proposed. The runner then prints the Phase 3 command that swaps the
remaining grants after the upgrade executes.

## Generic update scripts (ROLLOUT-3)

`runUpdate` (`scripts/script-base.ts`) refuses every app the Phase 2 runner upgrades: the eight Phase 2
singletons, the DAO, HyperSwap and PollFactory. Use `principal-phase2-upgrade-targets.ts --target <Name>`.
`update:dao` runs its DAO upgrade through the Phase 2 runner. `runUpdate` also refuses to stage a child
into a factory that does not carry the child's create selector and clear program.

## Sunset (ACCT-1, ACCT-2)

- SunsetContract, WalletFactorySunsetContract and the update stub compile at AVM 13.
- The sunset child (`bc`) and the wallet factory swap land in one execution group. No block has
  SunsetContract staged under the permissionless `updateWallet`.
- The DAO wallet sunset is simulated with every step after it, first while the DAO is still live, and
  again right before the push. The DAO wallet is sunset and deleted before the DAO app.
- ACCT-6 is still open: `deleteWalletEscrows` cannot delete a wallet escrow. While the DAO wallet owns
  escrows, `execute-deployer-sunset.ts` stops at its first simulation. That is after the wallet factory
  swap, but before the DAO becomes SunsetContract and before the DAO wallet push.
