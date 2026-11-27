# Guild deployment runbook

## Build and verification

From the repository root:

```sh
npm run build -w smart_contracts
npm run build -w @akta/sdk
npm test -w @akta/sdk
npm test -w smart_contracts
npm run check-types -w smart_contracts
```

Run only one contract test suite against a LocalNet at a time. Separate Vitest
processes share its timestamp offset and debug trace directory, so overlapping
runs can invalidate timing assertions and overwrite error traces.

Record the source revision, compiled program hashes and sizes, network,
creator, both factory IDs, DAO and validator IDs, treasury wallet factory,
staking/subscription dependencies, revenue escrow, and creation fee. Compare
uploaded bytes with the reviewed artifacts. A consensus name alone does not
identify reviewed code.

Guild kernels, registered consensus programs, and the wallet factory require
AVM 13 / consensus v42. Consensus approval programs must match the AVM 13 clear
program supplied by the factory's creation template. Confirm
support on the target network, including program growth on updates and usage
fees. The test suite runs on LocalNet; a passing simulation is not a public
network deployment. Public-network actions require separate explicit approval.

## Existing wallet and DAO migration

1. Upgrade the wallet factory to the four-chunk, dynamic-page implementation
   before loading a wallet program larger than 8 KiB.
   Supply its compiled `clearProgram` together with the approval program in
   `UpdateAkitaDAOPluginSDK.updateApp`; both programs must use the same AVM
   version. The SDK includes that configuration in the voted atomic group.
2. Load the reviewed wallet program through its atomic boxed-program workflow.
   If using the DAO update plugin, fund its temporary `bc` box for the actual
   program length.
   Read `walletUpdateMbr(wallet)` and fund the factory for the page growth of
   every wallet being upgraded. Updating through its creator factory preserves
   the existing global schema and reserves any extra pages there.
3. Upgrade the DAO treasury wallet with its existing authorized factory update
   path. Execution records retain `(groups, firstValid, lastValid)`; this release
   does not add fields to that record. The wallet MBR helper quotes 23,700
   microAlgos plus 12,800 per group hash. Publish generated clients and the SDK
   matching the reviewed contracts.
4. Deploy the matching DAO proposal validator, update its pointer, and upgrade
   the DAO through the existing governance process. Upgrade scripts and clients
   must match the deployed ABI.
5. Initialize and verify `guild_fees` through DAO governance if it is absent.
   Updating code alone does not create missing global state. Read back the
   intended `guild_fees.createFee` before deploying the Guild factory.

The DAO/Guild execution path uses the four-argument `arc58_addExecutionKey` and
`arc58_getNamedPluginKey`. Before approving an execution, review its transaction
groups off-chain, recompute their IDs, and verify that they match the proposal's
declared plugin and escrow. The wallet enforces the approved group IDs and
validity rounds when executing.

Escrow boxes have already been migrated to `(id, address, locked)`. The current
wallet does not carry the old escrow migration entrypoint or migration tooling.

## Deploy both factories

Start with the deployment script's dry run:

```sh
npm run deploy:guild-factory -w smart_contracts -- \
  --network testnet \
  --version <version> \
  --revenue-escrow-app <app-id> \
  --revenue-escrow-name rev_guilds \
  --dry-run
```

After reviewing the network, sender, hashes, and funding, the approved run:

1. Deploys the consensus factory.
2. Registers `fixed-signers`, `locked-token`, and `subscription` atomically per
   program using standard signing. Registration is permissionless and names
   are first-come, immutable; verify all three before publishing the IDs. If a
   name was occupied by unexpected code, abandon that factory deployment.
3. Deploys the Guild factory with the consensus factory's immutable ID.
4. Uploads the DAO-managed `guild` kernel into the Guild factory.

The uploader is shared with the LocalNet tests. Each program uses one payment,
one initialization, and the required contiguous 2,000-byte load calls. It does
not require a custom raw signer or a single oversized ABI argument.

## Smoke tests and activation

Mint one Guild for each official policy with the actual target-network
dependencies. The DAO app list must name the wallet factory before minting.
Configure its consensus, have the Guild create its treasury with `setup()`,
verify the Guild is its admin, and activate. Invalid or unattainable policy
settings must fail before activation.

Exercise proposing, voting, finalizing, executing, and storage cleanup. Verify
unapproved wallet groups, changed upgrade groups, replayed executions, wrong Guild
plugin targets, duplicate votes, and unauthorized configuration all fail.
For fixed signers, change membership while another ballot is open and verify
old/new ballot power independently. Test the chosen locked-stake expiration
and subscription eligibility boundaries with the real dependency contracts.

Delayed execution preparation currently simulates using the wallet admin as
sender. Keep sufficient spendable ALGO on the Guild for the simulation fee caps
as well as the separately funded treasury wallet. The eventual signer pays the
actual outer transaction fees.

Deploy the shared Guild plugin (Guild ID zero) if needed. It creates Guilds
and can also act in any Guild its factory created, so a grant for it reaches
all of them. Deploy and install a distinct Guild-specific plugin where
participation must stay inside one Guild, then grant each delegation only the
intended instance and methods. Existing factory-wide Guild
plugins do not gain isolation merely because new instances are deployed;
remove or revoke those old delegations during migration.

## Upgrade and rollback boundaries

Existing Guilds and consensus applications remain paired with their original
counterparts. This release changes fixed-signer storage and factory interfaces;
deploy fresh pairs rather than assuming an old pair can be upgraded in place.
Consensus program registrations cannot be overwritten. Register corrected
options under new names and deploy a new pair when consensus must change.

An active Guild kernel upgrade must pass its own governance and commit the
exact update transaction group. Changing the factory's boxed kernel affects
future Guilds only. Stop new creation from a bad kernel until the DAO-managed
factory program is corrected. Historical membership storage is retained and
funded; monitor that growth when planning frequent membership changes.
