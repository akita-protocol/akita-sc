#!/usr/bin/env bash
#
# The Akita contracts 2.0.0 rollout on MainNet: steps B1 to H6, in the runbook's order.
#
# The steps and their commands are in scripts/rollout-run.sh, which this file starts for
# MainNet. Every command is the runbook's own line (docs/rollout/MAINNET-ROLLOUT.md), and the
# TestNet rehearsal ran the same file. The DAO stays in Draft: I1 is not part of this rollout.
#
# Before the first start, by hand:
#
#   - Keep the rehearsal's receipts apart:  mv projects/akita-sc/receipts projects/akita-sc/receipts-testnet
#   - Fund the DAO creator for the whole run (runbook, A5).
#   - Ask the sellers of the 2 live Listings to settle or delist (runbook, D1a).
#   - Put the node key in the shell without showing it, and name its plan if it is not boost:
#       read -rs NODELY_API_KEY && export NODELY_API_KEY
#       export NODELY_PLAN=unlimited
#
# Then run it yourself, from inside the akita-sc checkout. Name the commit to deploy from, which
# is the commit the rehearsal finished on, and the three addresses the owner supplies:
#
#   HEARTBEAT_MANAGER=<address> REV_NFD_SOURCE=<address> LABS_ADDRESS=<address> \
#     ROLLOUT_COMMIT=<commit> bash projects/akita-sc/scripts/rollout-mainnet.sh
#
# It signs and sends with the DAO creator's key, which it takes from DEPLOYER_MNEMONIC (or
# MNEMONIC) in your shell, and asks for it without showing it if neither is set. It never prints
# the key or the node key and writes neither anywhere.
#
# Before it asks for anything it checks, and refuses to start otherwise, that:
#
#   - the checkout is at the commit you named, and the contracts, the scripts and the SDK source
#     are that commit's (networks.ts aside, which --register writes);
#   - receipts holds no TestNet rehearsal;
#   - NODELY_API_KEY is set (--public-node goes without it);
#   - the built programs are the ones release/manifest.json pins.
#
# It then asks you to type mainnet, and runs every step that is not done yet, in order. Each
# send has its dry run first.
#
#   (no option)    every step that is not done yet, in order
#   --list         the steps, and which commands are done
#   --until B3b    stop after a step, to go stage by stage
#   --only B1      one step
#
# It stops at the first command that fails and runs nothing after it. A second start carries on
# from there: finished commands are listed in receipts/mainnet-done.txt and are not run again.
# Each command's output is kept under receipts/mainnet-logs, and each start adds the commit it
# ran from to receipts/mainnet-commits.txt.
#
# Eight plugin deploys, seven in G2 and the one in G3, keep no receipt, so a second run of one
# could create a second app. If one of them fails, the next start refuses it until you say which
# it is:
#
#   --retry 'G2#4'       it created nothing: run it again
#   --mark-done 'G2#4'   it created the app and its id is recorded
#
# G2a needs HEARTBEAT_MANAGER, G3a REV_NFD_SOURCE and H6 LABS_ADDRESS. Without one, the run
# stops before the step that needs it, with everything before it done.
#
# Not run by this file, and done by hand after it: G4 (the SDK switches) and I2 (commit, push
# and tag).

ROLLOUT_NETWORK=mainnet ROLLOUT_ENTRY="$0" exec bash "$(dirname "$0")/rollout-run.sh" "$@"
