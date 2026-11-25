#!/usr/bin/env bash
#
# TestNet rehearsal of the Akita contracts 2.0.0 rollout: steps A4a to H6.
#
# Every command below is copied from docs/rollout/MAINNET-ROLLOUT.md, with the runbook's own
# TestNet differences applied: testnet for mainnet, and no Haystack router plugin in G2. D1a is a
# manual MainNet step and has no command. Since 2026-11-25 stage C deploys Gate v2 and all 18
# sub-gates again (DEC-4), so C2 and C3 name no live sub-gate. When the runbook's commands for
# these steps change, this file has to be made again from them.
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
# Each command's output is kept under receipts/rehearsal-logs.
#
# Seven plugin deploys, six in G2 and the one in G3, keep no receipt, so a second run of one
# could create a second app. If one of them fails, the next start refuses it until you say which
# it is:
#
#   --retry 'G2#4'       it created nothing: run it again
#   --mark-done 'G2#4'   it created the app and its id is recorded
#
# The steps after G2 (added 2026-11-25) type no id by hand: each id a step needs is read with
# rollout:id from what the step before it recorded. They need the three addresses the owner
# supplies, given the way the runbook's A0 names them:
#
#   HEARTBEAT_MANAGER=<address> REV_NFD_SOURCE=<address> LABS_ADDRESS=<address> \
#     REHEARSAL_COMMIT=<commit> bash projects/akita-sc/scripts/rollout-testnet-rehearsal.sh
#
# G2a needs the first, G3a the second and H6 the third. Without one, the run stops before the
# step that needs it, with everything before it done. G3b names TestNet's USDC and AKTA with
# --asset, because TestNet's revenue escrows hold neither (runbook, G3b).
#
# Not in this file: G2b, which TestNet has nothing to do for; G4, an edit by hand; and I1, which
# is not part of a rehearsal that keeps the TestNet DAO in Draft.

set -uo pipefail

REPO="${AKITA_SC_REPO:-$(git rev-parse --show-toplevel 2>/dev/null)}"
if [ -z "$REPO" ]; then echo "Run this from inside the akita-sc checkout. Nothing was run." >&2; exit 1; fi
EXPECT_COMMIT="${REHEARSAL_COMMIT:-}"
STEPS="A4a B1 B2 B3 B3a B3b C1 C2 C3 C4 D1 D2 E1 E2a E2 E3 E4 E5 E6 E6a E7 F0 F1 F2 G1 G2 G2a G3 G3a G3b H1 H1a H2 H5 H6"
COMMAND_IDS="A4a#2 A4a#3 B1#2 B1#3 B2#2 B2#3 B2#4 B3#2 B3a#2 B3b#2 C1#2 C2#2 C3#2 C4#1 C4#2 D1#2 D2#2 D2#4 D2#5 D2#6 E1#3 E1#5 E2a#2 E2#3 E3#2 E4#2 E5#2 E6#2 E6#4 E6#5 E6#7 E6a#2 E7#2 F0#2 F0#3 F1#2 F2#2 G1#2 G1#3 G2#1 G2#2 G2#3 G2#4 G2#5 G2#6 G2#7 G2#8 G2#10 G2a#2 G3#2 G3#3 G3a#2 G3b#2 H1#2 H1#3 H1#6 H1#7 H1#9 H1#11 H1#12 H1#13 H1#15 H1#16 H1#18 H1#20 H1#21 H1a#2 H1a#3 H2#1 H2#4 H2#5 H2#8 H2#10 H2#11 H5#2 H5#3 H6#2"

MODE=run
ONLY=""
UNTIL=""
ASSUME_YES=no
TARGET=""
while [ $# -gt 0 ]; do
  case "$1" in
    --list) MODE=list ;;
    --only) ONLY="${2:-}"; shift ;;
    --until) UNTIL="${2:-}"; shift ;;
    --retry) MODE=retry; TARGET="${2:-}"; shift ;;
    --mark-done) MODE=mark; TARGET="${2:-}"; shift ;;
    --yes) ASSUME_YES=yes ;;
    -h|--help) sed -n '2,/^$/p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
  shift
done

# Set while the release is being changed. A run would send programs that are about to be replaced.
HOLD_REASON=""
if [ -n "$HOLD_REASON" ] && [ "$MODE" != list ]; then
  echo "On hold: $HOLD_REASON" >&2
  echo "Nothing was run." >&2
  exit 1
fi

known() { case " $2 " in *" $1 "*) return 0 ;; esac; return 1; }
if [ -n "$ONLY" ] && ! known "$ONLY" "$STEPS"; then echo "No step named $ONLY. Steps: $STEPS" >&2; exit 2; fi
if [ -n "$UNTIL" ] && ! known "$UNTIL" "$STEPS"; then echo "No step named $UNTIL. Steps: $STEPS" >&2; exit 2; fi

cd "$REPO/projects/akita-sc" || { echo "Cannot find $REPO/projects/akita-sc" >&2; exit 1; }
DONE="receipts/rehearsal-done.txt"
HOLD="receipts/rehearsal-hold.txt"
LOGS="receipts/rehearsal-logs"

is_done() { [ -f "$DONE" ] && grep -qxF "$1" "$DONE"; }
is_held() { [ -f "$HOLD" ] && grep -qxF "$1" "$HOLD"; }
release_hold() { # id
  grep -vxF "$1" "$HOLD" >"$HOLD.tmp" || true
  mv "$HOLD.tmp" "$HOLD"
}

if [ "$MODE" = retry ] || [ "$MODE" = mark ]; then
  if ! known "$TARGET" "$COMMAND_IDS"; then echo "No command named '$TARGET'. Use the id printed when it stopped, such as G2#4." >&2; exit 2; fi
  if ! is_held "$TARGET"; then echo "$TARGET is not waiting on an answer. Nothing was changed."; exit 1; fi
  release_hold "$TARGET"
  if [ "$MODE" = mark ]; then
    echo "$TARGET" >>"$DONE"
    echo "$TARGET is marked done and will not run again."
  else
    echo "$TARGET will run again at the next start."
  fi
  exit 0
fi

if [ "$MODE" = run ]; then
  HEAD_NOW="$(git rev-parse HEAD)"
  if [ "${#EXPECT_COMMIT}" -lt 7 ]; then
    echo "Name the commit to deploy from: REHEARSAL_COMMIT=<commit> bash $0" >&2
    echo "This checkout is at $HEAD_NOW. Nothing was run." >&2
    exit 1
  fi
  case "$HEAD_NOW" in
    "$EXPECT_COMMIT"*) ;;
    *)
      echo "This checkout is at $HEAD_NOW, not the commit to deploy from ($EXPECT_COMMIT). Nothing was run." >&2
      exit 1
      ;;
  esac

  case "$(node -v 2>/dev/null)" in
    v24.*) ;;
    *)
      if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
        # nvm reads .nvmrc from the repository root above this folder.
        set +u
        # shellcheck disable=SC1090
        . "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
        nvm use >/dev/null 2>&1 || nvm use 24 >/dev/null 2>&1 || true
        set -u
      fi
      ;;
  esac
  case "$(node -v 2>/dev/null)" in
    v24.*) ;;
    *) echo "Node 24 is needed and this shell has $(node -v 2>/dev/null || echo none). Run 'nvm use' in $REPO first. Nothing was run." >&2; exit 1 ;;
  esac

  if [ -z "${DEPLOYER_MNEMONIC:-}" ] && [ -z "${MNEMONIC:-}" ]; then
    printf 'The DAO creator key is not in this shell. Paste it and press Enter (it is not shown): '
    read -rs DEPLOYER_MNEMONIC
    echo
    export DEPLOYER_MNEMONIC
    if [ -z "$DEPLOYER_MNEMONIC" ]; then echo "No key given. Nothing was run." >&2; exit 1; fi
  fi

  export V=2.0.0
  mkdir -p receipts/gates receipts/phase2 receipts/phase3 "$LOGS"

  echo "Reading TestNet..."
  CREATOR="$(npm run -s rollout:status -- --network testnet 2>/dev/null | sed -n 's/^DAO creator: //p' | head -n 1)"
  export CREATOR
  if [ "${#CREATOR}" -ne 58 ]; then
    echo "Could not read the DAO creator from TestNet (got '${CREATOR}'). Nothing was run." >&2
    exit 1
  fi
  echo "TestNet DAO creator: $CREATOR"
  echo "Commit: $HEAD_NOW, release label $V, Node $(node -v)"

  if [ "$ASSUME_YES" != yes ]; then
    echo
    echo "This signs and sends the TestNet rehearsal with the DAO creator's key."
    if [ -n "$ONLY" ]; then echo "Step: $ONLY"; else echo "Steps: $STEPS${UNTIL:+ (stopping after $UNTIL)}"; fi
    printf 'Type testnet to start: '
    read -r ANSWER
    if [ "$ANSWER" != testnet ]; then echo "Not started."; exit 1; fi
  fi
fi

SKIP_STEP=no
FINISHED=no
RAN_IN_STEP=no

begin_step() { # id, title, the ids of the step's recorded commands
  SKIP_STEP=no
  RAN_IN_STEP=no
  if [ "$FINISHED" = yes ]; then SKIP_STEP=yes; return; fi
  if [ -n "$ONLY" ] && [ "$ONLY" != "$1" ]; then SKIP_STEP=yes; return; fi
  if [ "$MODE" = run ]; then
    local id all=yes
    for id in $3; do is_done "$id" || all=no; done
    if [ "$all" = yes ]; then
      echo
      echo "=== $1. $2: already done"
      SKIP_STEP=yes
      if [ -n "$UNTIL" ] && [ "$UNTIL" = "$1" ]; then FINISHED=yes; fi
      return
    fi
  fi
  echo
  echo "=== $1. $2"
}

status_summary() { # step id
  local log
  log="$LOGS/$(date +%Y%m%dT%H%M%S)-$1-status.log"
  npm run -s rollout:status -- --network testnet >"$log" 2>&1 || { echo "    (the status tracker failed; see $log)"; return 0; }
  echo "    Tracker after $1: $(grep -c '^  ✓' "$log") done, $(grep -c '^  →' "$log") ready, $(grep -c '^  ·' "$log") waiting on earlier steps"
}

end_step() { # id
  if [ "$SKIP_STEP" = yes ]; then return; fi
  if [ "$MODE" = run ] && [ "$RAN_IN_STEP" = yes ]; then status_summary "$1"; fi
  if [ -n "$UNTIL" ] && [ "$UNTIL" = "$1" ]; then FINISHED=yes; fi
}

run_cmd() { # step, index, kind (dry|send|check|build), guard id or -, once or -, command
  local step="$1" idx="$2" kind="$3" guard="$4" once="$5" cmd="$6"
  local id="$step#$idx"
  if [ "$SKIP_STEP" = yes ]; then return; fi

  local state="to do"
  if [ "$kind" = dry ]; then
    if is_done "$guard"; then state="done"; fi
  elif is_done "$id"; then
    state="done"
  elif is_held "$id"; then
    state="stopped part-way"
  fi

  if [ "$MODE" = list ]; then
    printf '  [%s] %s  %s\n' "$state" "$id" "$cmd"
    return
  fi
  if [ "$state" = "done" ]; then
    echo "  already done: $id"
    return
  fi
  if [ "$state" = "stopped part-way" ]; then
    echo
    echo "STOPPED before $id: it failed last time, and it keeps no receipt."
    echo "  $cmd"
    echo "If it created nothing, run:              bash $0 --retry '$id'"
    echo "If it created the app and you recorded its id, run:  bash $0 --mark-done '$id'"
    exit 1
  fi

  local log rc
  log="$LOGS/$(date +%Y%m%dT%H%M%S)-$step-$idx.log"
  echo
  echo "--- $id ($kind): $cmd"
  RAN_IN_STEP=yes
  bash -c "$cmd" 2>&1 | tee "$log"
  rc="${PIPESTATUS[0]}"
  if [ "$rc" -ne 0 ]; then
    echo
    echo "STOPPED at $id: the command above ended with code $rc. Nothing after it was run."
    echo "Its output is in projects/akita-sc/$log"
    if [ "$once" = once ]; then
      echo "$id" >>"$HOLD"
      echo "This deploy keeps no receipt, so a second run could create a second app."
      echo "Check whether it printed a new app id. The next start will ask which it was."
    elif [ "$kind" = dry ] || [ "$kind" = check ]; then
      echo "That was a dry run, so it sent nothing."
    elif [ "$kind" = send ]; then
      echo "It may have sent part of its work. Look at the output before starting again."
    fi
    exit "$rc"
  fi
  if [ "$kind" != dry ]; then echo "$id" >>"$DONE"; fi
}

need_value() { # variable, what it holds: an address the owner supplies
  if [ "$SKIP_STEP" = yes ] || [ "$MODE" != run ]; then return; fi
  local value
  eval "value=\${$1:-}"
  if [ "${#value}" -ne 58 ]; then
    echo
    echo "STOPPED before this step: $1 is not set. It is $2."
    echo "Start again with it:  $1=<address> REHEARSAL_COMMIT=$EXPECT_COMMIT bash $0"
    exit 1
  fi
  export "$1=$value"
}

set_from() { # variable, read-only command that prints the value alone
  if [ "$SKIP_STEP" = yes ]; then return; fi
  if [ "$MODE" = list ]; then
    printf '  [read] export %s=$(%s)\n' "$1" "$2"
    return
  fi
  local value
  value="$(bash -c "$2" 2>>"$LOGS/rollout-id.log")"
  case "$value" in
    ''|*[!0-9A-Z]*)
      echo
      echo "STOPPED: could not read $1. Nothing after it was run."
      echo "  $2"
      echo "Its messages are in projects/akita-sc/$LOGS/rollout-id.log"
      exit 1
      ;;
  esac
  export "$1=$value"
  echo "    $1=$value"
}

begin_step A4a 'Give TestNet'"'"'s DAO wallet MainNet'"'"'s escrows and grants (TestNet only, before B1)' 'A4a#2 A4a#3'
run_cmd A4a 1 dry A4a#2 - 'npm run rollout:testnet-parity -- -n testnet --dry-run --sender "$CREATOR"'
run_cmd A4a 2 send - - 'npm run rollout:testnet-parity -- -n testnet --confirm'
run_cmd A4a 3 check - - 'npm run rollout:testnet-parity -- -n testnet --dry-run --sender "$CREATOR"'
end_step A4a

begin_step B1 'Phase 2a: install the new UpdateAkitaDAOPlugin' 'B1#2 B1#3'
run_cmd B1 1 dry B1#2 - 'npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd B1 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n testnet -v "$V" --manifest receipts/phase2a.json --fund-sponsor --register --confirm'
run_cmd B1 3 build - - '(cd ../akita-sdk && npm run build)'
end_step B1

begin_step B2 'Deploy the validator and upgrade the DAO' 'B2#2 B2#3 B2#4'
run_cmd B2 1 dry B2#2 - 'npm run update:dao -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd B2 2 send - - 'npm run update:dao -- -n testnet -v "$V"'
run_cmd B2 3 send - - 'npm run deploy:dao-plugin -- -n testnet -v "$V" --manifest receipts/dao-plugin.json --register'
run_cmd B2 4 build - - '(cd ../akita-sdk && npm run build)'
end_step B2

begin_step B3 'Set guild_fees' 'B3#2'
run_cmd B3 1 dry B3#2 - 'npm run update:guild-creation-cost -- -n testnet --cost 200000000 --dry-run --sender "$CREATOR"'
run_cmd B3 2 send - - 'npm run update:guild-creation-cost -- -n testnet --cost 200000000'
end_step B3

begin_step B3a 'Set the staking pool, auction and raffle creation fees' 'B3a#2'
run_cmd B3a 1 dry B3a#2 - 'npm run update:creation-fees -- -n testnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --dry-run --sender "$CREATOR"'
run_cmd B3a 2 send - - 'npm run update:creation-fees -- -n testnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --confirm'
end_step B3a

begin_step B3b 'Set the revenue split to 80/5/15' 'B3b#2'
run_cmd B3b 1 dry B3b#2 - 'npm run update:revenue-splits -- -n testnet --split rec_krby=80,rec_mod=5,rec_gov=15 --dry-run --sender "$CREATOR"'
run_cmd B3b 2 send - - 'npm run update:revenue-splits -- -n testnet --split rec_krby=80,rec_mod=5,rec_gov=15 --confirm'
end_step B3b

begin_step C1 'Deploy Gate v2 and every sub-gate' 'C1#2'
run_cmd C1 1 dry C1#2 - 'npm run deploy:gates -- -n testnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --dry-run --sender "$CREATOR"'
run_cmd C1 2 send - - 'npm run deploy:gates -- -n testnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --manifest-dir receipts/gates'
end_step C1

begin_step C2 'Allowlist every sub-gate' 'C2#2'
run_cmd C2 1 dry C2#2 - 'npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n testnet --manifest-dir receipts/gates --dry-run --sender "$CREATOR"'
run_cmd C2 2 send - - 'npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n testnet --manifest-dir receipts/gates'
end_step C2

begin_step C3 'Seal Gate imports' 'C3#2'
run_cmd C3 1 dry C3#2 - 'npm run seal:gate-imports -- -n testnet --manifest-dir receipts/gates --dry-run --sender "$CREATOR"'
run_cmd C3 2 send - - 'npm run seal:gate-imports -- -n testnet --manifest-dir receipts/gates'
end_step C3

begin_step C4 'Point aal.gate at Gate v2' 'C4#1 C4#2'
run_cmd C4 1 send - - 'npm run deploy:gates -- -n testnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --manifest-dir receipts/gates --register'
run_cmd C4 2 build - - '(cd ../akita-sdk && npm run build)'
end_step C4

begin_step D1 'Upgrade Staking in place' 'D1#2'
run_cmd D1 1 dry D1#2 - 'npm run update:staking -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd D1 2 send - - 'npm run update:staking -- -n testnet -v "$V"'
end_step D1

begin_step D2 'Deploy Rewards v2 and repoint aal.rewards' 'D2#2 D2#4 D2#5 D2#6'
run_cmd D2 1 dry D2#2 - 'npm run deploy:rewards -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd D2 2 send - - 'npm run deploy:rewards -- -n testnet -v "$V" --manifest receipts/rewards.json'
run_cmd D2 3 dry D2#4 - 'npm run rewards:opt-in -- -n testnet --manifest receipts/rewards.json --dry-run'
run_cmd D2 4 send - - 'npm run rewards:opt-in -- -n testnet --manifest receipts/rewards.json'
run_cmd D2 5 send - - 'npm run deploy:rewards -- -n testnet -v "$V" --manifest receipts/rewards.json --register'
run_cmd D2 6 build - - '(cd ../akita-sdk && npm run build)'
end_step D2

begin_step E1 'Social family' 'E1#3 E1#5'
run_cmd E1 1 dry E1#3 - 'npm run check:social-legacy-prefixes -- -n testnet'
run_cmd E1 2 dry E1#3 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target AkitaSocial,AkitaSocialGraph --dry-run --sender "$CREATOR"'
run_cmd E1 3 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target AkitaSocial,AkitaSocialGraph --confirm'
run_cmd E1 4 dry E1#5 - 'npm run update:social -- -n testnet -v "$V" --contracts socialImpact,socialModeration --dry-run --sender "$CREATOR"'
run_cmd E1 5 send - - 'npm run update:social -- -n testnet -v "$V" --contracts socialImpact,socialModeration'
end_step E1

begin_step E2a 'Top the Subscriptions app up to the service storage reserve (runs before E2)' 'E2a#2'
run_cmd E2a 1 dry E2a#2 - 'npm run fund:subscription-reserve -- -n testnet --dry-run'
run_cmd E2a 2 send - - 'npm run fund:subscription-reserve -- -n testnet --confirm'
end_step E2a

begin_step E2 Subscriptions 'E2#3'
run_cmd E2 1 dry E2#3 - 'npm run fund:subscription-reserve -- -n testnet --dry-run'
run_cmd E2 2 dry E2#3 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target Subscriptions --dry-run --sender "$CREATOR"'
run_cmd E2 3 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target Subscriptions --confirm'
end_step E2

begin_step E3 'Marketplace + Listing' 'E3#2'
run_cmd E3 1 dry E3#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target Marketplace --dry-run --sender "$CREATOR"'
run_cmd E3 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target Marketplace --confirm'
end_step E3

begin_step E4 'Auction and Raffle factories' 'E4#2'
run_cmd E4 1 dry E4#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target AuctionFactory,RaffleFactory --dry-run --sender "$CREATOR"'
run_cmd E4 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target AuctionFactory,RaffleFactory --confirm'
end_step E4

begin_step E5 'StakingPoolFactory + StakingPool' 'E5#2'
run_cmd E5 1 dry E5#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target StakingPoolFactory --dry-run --sender "$CREATOR"'
run_cmd E5 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target StakingPoolFactory --confirm'
end_step E5

begin_step E6 'Poll, PrizeBox, HyperSwap' 'E6#2 E6#4 E6#5 E6#7'
run_cmd E6 1 dry E6#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target PollFactory --dry-run --sender "$CREATOR"'
run_cmd E6 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target PollFactory --manifest-dir receipts/phase2 --register --confirm'
run_cmd E6 3 dry E6#4 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target HyperSwap --dry-run --sender "$CREATOR"'
run_cmd E6 4 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target HyperSwap --manifest-dir receipts/phase2 --register --confirm'
run_cmd E6 5 build - - '(cd ../akita-sdk && npm run build)'
run_cmd E6 6 dry E6#7 - 'npm run update:prize-box -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd E6 7 send - - 'npm run update:prize-box -- -n testnet -v "$V"'
end_step E6

begin_step E6a 'Give the empty service accounts their minimum balance' 'E6a#2'
run_cmd E6a 1 dry E6a#2 - 'npm run fund:service-accounts -- -n testnet --dry-run --sender "$CREATOR"'
run_cmd E6a 2 send - - 'npm run fund:service-accounts -- -n testnet --confirm'
end_step E6a

begin_step E7 'Wallet factory + wallet child (atomic) (one-way)' 'E7#2'
run_cmd E7 1 dry E7#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target AbstractedAccountFactory --dry-run --sender "$CREATOR"'
run_cmd E7 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n testnet -v "$V" --target AbstractedAccountFactory --confirm'
end_step E7

begin_step F0 'New storage quote helper for wallets' 'F0#2 F0#3'
run_cmd F0 1 dry F0#2 - 'npm run deploy:wallet-mbr -- -n testnet --dry-run --sender "$CREATOR"'
run_cmd F0 2 send - - 'npm run deploy:wallet-mbr -- -n testnet --register'
run_cmd F0 3 build - - '(cd ../akita-sdk && npm run build)'
end_step F0

begin_step F1 'Upgrade the DAO wallet (one-way)' 'F1#2'
run_cmd F1 1 dry F1#2 - 'npm run update:dao-wallet -- -n testnet --dry-run --sender "$CREATOR"'
run_cmd F1 2 send - - 'npm run update:dao-wallet -- -n testnet'
end_step F1

begin_step F2 'Sweep the 72 user wallets' 'F2#2'
run_cmd F2 1 dry F2#2 - 'npm run update:automatic-wallets -- -n testnet --dry-run'
run_cmd F2 2 send - - 'npm run update:automatic-wallets -- -n testnet --skip-current'
end_step F2

begin_step G1 'Phase 3 plugins' 'G1#2 G1#3'
run_cmd G1 1 dry G1#2 - 'npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n testnet -v "$V" --swap --add-new-methods --dry-run --sender "$CREATOR"'
run_cmd G1 2 send - - 'npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n testnet -v "$V" --manifest-dir receipts/phase3 --swap --add-new-methods --register --confirm'
run_cmd G1 3 build - - '(cd ../akita-sdk && npm run build)'
end_step G1

begin_step G2 'Every other live plugin' 'G2#1 G2#2 G2#3 G2#4 G2#5 G2#6 G2#7 G2#8 G2#10'
run_cmd G2 1 send - - 'npm run deploy:gate-plugin -- -n testnet -v "$V" --manifest receipts/gate-plugin.json --register'
run_cmd G2 2 send - once 'npm run deploy:staking-plugin -- -n testnet -v "$V"'
run_cmd G2 3 send - once 'npm run deploy:rewards-plugin -- -n testnet -v "$V"'
run_cmd G2 4 send - once 'npm run deploy:optin-plugin -- -n testnet'
run_cmd G2 5 send - once 'npm run deploy:self-optin-plugin -- -n testnet'
run_cmd G2 6 send - once 'npm run deploy:asa-manager-plugin -- -n testnet'
run_cmd G2 7 send - once 'npm run deploy:nfd-plugin -- -n testnet'
run_cmd G2 8 build - - '(cd ../akita-sdk && npm run build)'
run_cmd G2 9 dry G2#10 - 'npm run update:dao-wallet-plugins -- -n testnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --dry-run --sender "$CREATOR"'
run_cmd G2 10 send - - 'npm run update:dao-wallet-plugins -- -n testnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --confirm-update'
end_step G2

# --- The steps after G2. They take the owner's three addresses from the shell (see the top). ---

begin_step G2a 'Set the heartbeat manager' 'G2a#2'
need_value HEARTBEAT_MANAGER 'the heartbeat manager, an account the backend holds for this one job'
run_cmd G2a 1 dry G2a#2 - 'npm run staking:set-heartbeat-manager -- -n testnet --manager "$HEARTBEAT_MANAGER" --dry-run'
run_cmd G2a 2 send - - 'npm run staking:set-heartbeat-manager -- -n testnet --manager "$HEARTBEAT_MANAGER"'
end_step G2a

begin_step G3 'RevenueManagerPlugin' 'G3#2 G3#3'
run_cmd G3 1 dry G3#2 - 'npm run deploy:revenue-manager-plugin -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd G3 2 send - once 'npm run deploy:revenue-manager-plugin -- -n testnet -v "$V"'
run_cmd G3 3 build - - '(cd ../akita-sdk && npm run build)'
end_step G3

begin_step G3a 'Register rev_nfd with the RevenueManager' 'G3a#2'
need_value REV_NFD_SOURCE 'the account allowed to opt rev_nfd in to an asset'
run_cmd G3a 1 dry G3a#2 - 'npm run register:revenue-escrow -- -n testnet --escrow rev_nfd --source "$REV_NFD_SOURCE" --dry-run'
run_cmd G3a 2 send - - 'npm run register:revenue-escrow -- -n testnet --escrow rev_nfd --source "$REV_NFD_SOURCE" --confirm'
end_step G3a

begin_step G3b 'Opt the split receivers in to the assets the revenue escrows pay out' 'G3b#2'
run_cmd G3b 1 dry G3b#2 - 'npm run opt-in:revenue-receivers -- -n testnet --asset 10458941,752884771 --dry-run --sender "$CREATOR"'
run_cmd G3b 2 send - - 'npm run opt-in:revenue-receivers -- -n testnet --asset 10458941,752884771 --confirm'
end_step G3b

begin_step H1 'Meta, MetaPlugin, PayPlugin and the rev_meta escrow' 'H1#2 H1#3 H1#6 H1#7 H1#9 H1#11 H1#12 H1#13 H1#15 H1#16 H1#18 H1#20 H1#21'
run_cmd H1 1 dry H1#2 - 'npm run deploy:meta -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd H1 2 send - - 'npm run deploy:meta -- -n testnet -v "$V" --manifest receipts/meta.json --register'
run_cmd H1 3 build - - '(cd ../akita-sdk && npm run build)'
set_from META 'npm run -s rollout:id -- -n testnet --app meta'
set_from META_ADDRESS 'npm run -s rollout:id -- -n testnet --app meta --address'
run_cmd H1 6 send - - 'npm run deploy:meta-plugin -- -n testnet -v "$V" --config "{\"registry\":\"$META\"}" --manifest receipts/meta-plugin.json --register'
run_cmd H1 7 build - - '(cd ../akita-sdk && npm run build)'
run_cmd H1 8 dry H1#9 - 'npm run set:policy-writer -- -n testnet --dry-run --sender "$CREATOR"'
run_cmd H1 9 send - - 'npm run set:policy-writer -- -n testnet --confirm'
run_cmd H1 10 dry H1#11 - 'npm run install:policy-writer-grant -- -n testnet --dry-run'
run_cmd H1 11 send - - 'npm run install:policy-writer-grant -- -n testnet --confirm'
run_cmd H1 12 send - - 'npm run deploy:pay-plugin -- -n testnet -v "$V" --config "{\"registry\":\"$META\"}" --manifest receipts/pay-plugin.json --register'
run_cmd H1 13 build - - '(cd ../akita-sdk && npm run build)'
run_cmd H1 14 dry H1#15 - 'npm run update:dao-wallet-plugins -- -n testnet --dry-run --sender "$CREATOR"'
run_cmd H1 15 send - - 'npm run update:dao-wallet-plugins -- -n testnet --confirm-update'
run_cmd H1 16 send - - 'npm run create:dao-escrow -- -n testnet --escrow rev_meta --execute'
run_cmd H1 17 dry H1#18 - 'npm run update:app-dao-escrow -- -n testnet --app meta --escrow rev_meta --dry-run'
run_cmd H1 18 send - - 'npm run update:app-dao-escrow -- -n testnet --app meta --escrow rev_meta --confirm'
run_cmd H1 19 dry H1#20 - 'npm run register:revenue-escrow -- -n testnet --escrow rev_meta --source "$META_ADDRESS" --dry-run'
run_cmd H1 20 send - - 'npm run register:revenue-escrow -- -n testnet --escrow rev_meta --source "$META_ADDRESS" --confirm'
run_cmd H1 21 build - - '(cd ../akita-sdk && npm run build)'
end_step H1

begin_step H1a 'Collectible Variations registry' 'H1a#2 H1a#3'
run_cmd H1a 1 dry H1a#2 - 'npm run deploy:collectible-variations -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd H1a 2 send - - 'npm run deploy:collectible-variations -- -n testnet -v "$V" --manifest receipts/collectible-variations.json --reserve-type-zero --register'
run_cmd H1a 3 build - - '(cd ../akita-sdk && npm run build)'
end_step H1a

# --confirm-mainnet is the runbook's flag for MainNet; on TestNet the script does not ask for it and ignores it.
begin_step H2 'Guilds' 'H2#1 H2#4 H2#5 H2#8 H2#10 H2#11'
run_cmd H2 1 send - - 'npm run create:dao-escrow -- -n testnet --escrow rev_guilds --execute'
set_from REV_GUILDS_APP 'npm run -s rollout:id -- -n testnet --escrow rev_guilds'
run_cmd H2 3 dry H2#4 - 'npm run deploy:guild-factory -- -n testnet -v "$V" --revenue-escrow-app "$REV_GUILDS_APP" --revenue-escrow-name rev_guilds --dry-run --sender "$CREATOR"'
run_cmd H2 4 send - - 'npm run deploy:guild-factory -- -n testnet -v "$V" --revenue-escrow-app "$REV_GUILDS_APP" --revenue-escrow-name rev_guilds --manifest receipts/guild-factory.json --register --confirm-mainnet'
run_cmd H2 5 build - - '(cd ../akita-sdk && npm run build)'
set_from GUILD_FACTORY 'npm run -s rollout:id -- -n testnet --app guildFactory'
set_from GUILD_FACTORY_ADDRESS 'npm run -s rollout:id -- -n testnet --app guildFactory --address'
run_cmd H2 8 send - - 'npm run deploy:guild-plugin -- -n testnet -v "$V" --config "{\"factory\":\"$GUILD_FACTORY\",\"guild\":\"0\"}" --manifest receipts/guild-plugin.json --register'
run_cmd H2 9 dry H2#10 - 'npm run register:revenue-escrow -- -n testnet --escrow rev_guilds --source "$GUILD_FACTORY_ADDRESS" --dry-run'
run_cmd H2 10 send - - 'npm run register:revenue-escrow -- -n testnet --escrow rev_guilds --source "$GUILD_FACTORY_ADDRESS" --confirm'
run_cmd H2 11 build - - '(cd ../akita-sdk && npm run build)'
end_step H2

begin_step H5 'Wallet balance reader' 'H5#2 H5#3'
run_cmd H5 1 dry H5#2 - 'npm run deploy:wallet-balance-reader -- -n testnet -v "$V" --dry-run --sender "$CREATOR"'
run_cmd H5 2 send - - 'npm run deploy:wallet-balance-reader -- -n testnet -v "$V" --manifest receipts/wallet-balance-reader.json --register'
run_cmd H5 3 build - - '(cd ../akita-sdk && npm run build)'
end_step H5

begin_step H6 'Labs revenue payout (rec_krby)' 'H6#2'
need_value LABS_ADDRESS 'the Akita Labs address, the one receiver of rec_krby payouts'
run_cmd H6 1 dry H6#2 - 'npm run install:pay-policy-grant -- -n testnet --escrow rec_krby --recipient "$LABS_ADDRESS" --dry-run'
run_cmd H6 2 send - - 'npm run install:pay-policy-grant -- -n testnet --escrow rec_krby --recipient "$LABS_ADDRESS" --confirm'
end_step H6

if [ "$MODE" = run ]; then
  echo
  if [ -n "$ONLY" ]; then
    echo "Step $ONLY is finished."
  elif [ -n "$UNTIL" ]; then
    echo "Finished through $UNTIL."
  else
    echo "A4a to H6 are finished. What is left is by hand: G4 (the SDK switches), and I1 only when the DAO launches."
  fi
fi
