#!/usr/bin/env bash
#
# TestNet rehearsal of the Akita contracts 2.0.0 rollout: steps A4a to H6.
#
# The steps and their commands are in scripts/rollout-run.sh, which this file starts for
# TestNet. They are the runbook's own lines (docs/rollout/MAINNET-ROLLOUT.md) with the runbook's
# TestNet differences applied: -n testnet for -n mainnet, A4a first, no Haystack router plugin
# in G2, no G2b, and TestNet's USDC and AKTA named in G3b. scripts/rollout-mainnet.sh starts the
# same file for MainNet, so MainNet runs the lines the rehearsal ran.
#
# Run it yourself, from inside the akita-sc checkout, and name the commit to deploy from. It
# refuses any other commit:
#
#   REHEARSAL_COMMIT=<commit> bash projects/akita-sc/scripts/rollout-testnet-rehearsal.sh
#
# It signs and sends with the DAO creator's key, which it takes from DEPLOYER_MNEMONIC (or
# MNEMONIC) in your shell, and asks for it without showing it if neither is set. It never prints
# the key and writes it nowhere.
#
#   (no option)    every step that is not done yet, in order
#   --list         the steps, and which commands are done
#   --until C4     stop after a step
#   --only B1      one step
#   --yes          do not ask before the first command
#
# It stops at the first command that fails and runs nothing after it. A second start carries on
# from there: finished commands are listed in receipts/rehearsal-done.txt and are not run again.
# Each command's output is kept under receipts/rehearsal-logs, and each start adds the commit it
# ran from to receipts/rehearsal-commits.txt.
#
# Seven plugin deploys, six in G2 and the one in G3, keep no receipt, so a second run of one
# could create a second app. If one of them fails, the next start refuses it until you say which
# it is:
#
#   --retry 'G2#4'       it created nothing: run it again
#   --mark-done 'G2#4'   it created the app and its id is recorded
#
# The steps after G2 type no id by hand: each id a step needs is read with rollout:id from what
# the step before it recorded. They need the three addresses the owner supplies, given the way
# the runbook's A0 names them:
#
#   HEARTBEAT_MANAGER=<address> REV_NFD_SOURCE=<address> LABS_ADDRESS=<address> \
#     REHEARSAL_COMMIT=<commit> bash projects/akita-sc/scripts/rollout-testnet-rehearsal.sh
#
# G2a needs the first, G3a the second and H6 the third. Without one, the run stops before the
# step that needs it, with everything before it done.
#
# Not run by this file: G4, an edit by hand; and I1, which is not part of a rehearsal that keeps
# the TestNet DAO in Draft.

ROLLOUT_NETWORK=testnet ROLLOUT_ENTRY="$0" exec bash "$(dirname "$0")/rollout-run.sh" "$@"
