#!/usr/bin/env bash
#
# The Akita contracts 2.0.0 rollout as one run on one network: the steps of
# docs/rollout/MAINNET-ROLLOUT.md that have commands, B1 to H6, in the runbook's order.
#
# Do not start this file. Start one of the two that name the network, and read its top for how
# a run goes:
#
#   scripts/rollout-mainnet.sh              MainNet
#   scripts/rollout-testnet-rehearsal.sh    the TestNet rehearsal
#
# Every command below is the runbook's own line for MainNet, copied as written, so the runbook
# and this file can be read side by side. For TestNet the runbook's differences are applied
# (its step A4): -n testnet for -n mainnet, step A4a first, no Haystack router plugin in G2, no
# G2b, and TestNet's USDC and AKTA named in G3b. D1a, G4 and I2 are done by hand and have no
# command here; I1 is not part of this rollout.
#
# tests/rollout-runner.test.ts holds this file to the runbook line for line, holds its TestNet
# form to the commands the rehearsal of 2026-11-25 ran, and runs both networks end to end
# against stub commands. When a runbook command changes, change it here; the test names the line.

set -uo pipefail

NETWORK="${ROLLOUT_NETWORK:-}"
ENTRY="${ROLLOUT_ENTRY:-$0}"
case "$NETWORK" in
  mainnet) COMMIT_VAR=ROLLOUT_COMMIT; RECORD=mainnet; RUN_NAME="MainNet rollout"; NET_NAME=MainNet ;;
  testnet) COMMIT_VAR=REHEARSAL_COMMIT; RECORD=rehearsal; RUN_NAME="TestNet rehearsal"; NET_NAME=TestNet ;;
  *)
    echo "Start scripts/rollout-mainnet.sh or scripts/rollout-testnet-rehearsal.sh, which name the network. Nothing was run." >&2
    exit 2
    ;;
esac

REPO="${AKITA_SC_REPO:-$(git rev-parse --show-toplevel 2>/dev/null)}"
if [ -z "$REPO" ]; then echo "Run this from inside the akita-sc checkout. Nothing was run." >&2; exit 1; fi
eval "EXPECT_COMMIT=\${$COMMIT_VAR:-}"

known() { case " $2 " in *" $1 "*) return 0 ;; esac; return 1; }

# A4a gives TestNet's DAO wallet what MainNet's has. G2b withdraws credits only MainNet's Rewards v1 holds.
STEPS=""
for STEP in A4a B1 B2 B3 B3a B3b C1 C2 C3 C4 D1 D2 E1 E2a E2 E3 E4 E5 E6 E6a E7 F0 F1 F2 G1 G2 G2a G2b G3 G3a G3b H1 H1a H2 H5 H6; do
  if [ "$NETWORK" = mainnet ] && [ "$STEP" = A4a ]; then continue; fi
  if [ "$NETWORK" = testnet ] && [ "$STEP" = G2b ]; then continue; fi
  STEPS="${STEPS:+$STEPS }$STEP"
done

MODE=run
ONLY=""
UNTIL=""
ASSUME_YES=no
PUBLIC_NODE=no
ALLOW_CHANGES=no
TARGET=""
while [ $# -gt 0 ]; do
  case "$1" in
    --list) MODE=list ;;
    --only) ONLY="${2:-}"; shift ;;
    --until) UNTIL="${2:-}"; shift ;;
    --retry) MODE=retry; TARGET="${2:-}"; shift ;;
    --mark-done) MODE=mark; TARGET="${2:-}"; shift ;;
    --yes) ASSUME_YES=yes ;;
    --public-node) PUBLIC_NODE=yes ;;
    --allow-local-changes) ALLOW_CHANGES=yes ;;
    -h|--help) sed -n '2,/^$/p' "$ENTRY" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
  shift
done
if [ "$NETWORK" = mainnet ] && [ "$ASSUME_YES" = yes ]; then
  echo "--yes is for the rehearsal. A MainNet run always asks before its first command. Nothing was run." >&2
  exit 2
fi

# Set while the release is being changed. A run would send programs that are about to be replaced.
HOLD_REASON=""
if [ -n "$HOLD_REASON" ] && [ "$MODE" != list ]; then
  echo "On hold: $HOLD_REASON" >&2
  echo "Nothing was run." >&2
  exit 1
fi

if [ -n "$ONLY" ] && ! known "$ONLY" "$STEPS"; then echo "No step named $ONLY on $NET_NAME. Steps: $STEPS" >&2; exit 2; fi
if [ -n "$UNTIL" ] && ! known "$UNTIL" "$STEPS"; then echo "No step named $UNTIL on $NET_NAME. Steps: $STEPS" >&2; exit 2; fi

cd "$REPO/projects/akita-sc" || { echo "Cannot find $REPO/projects/akita-sc" >&2; exit 1; }
DONE="receipts/$RECORD-done.txt"
HOLD="receipts/$RECORD-hold.txt"
LOGS="receipts/$RECORD-logs"

is_done() { [ -f "$DONE" ] && grep -qxF "$1" "$DONE"; }
is_held() { [ -f "$HOLD" ] && grep -qxF "$1" "$HOLD"; }
release_hold() { # id
  grep -vxF "$1" "$HOLD" >"$HOLD.tmp" || true
  mv "$HOLD.tmp" "$HOLD"
}

# A runbook line in this network's form. The runbook names the network as -n or --network.
for_network() {
  local line="$1"
  if [ "$NETWORK" = testnet ]; then
    line="${line//-n mainnet/-n testnet}"
    line="${line//--network mainnet/--network testnet}"
  fi
  printf '%s' "$line"
}

# The steps are read twice. The first reading only notes which commands this network records as
# done (RECORDED), so a step knows its own commands before it starts. The second runs or lists.
PASS=collect
RECORDED=""
CURRENT=""
SKIP_STEP=no
FINISHED=no
RAN_IN_STEP=no

begin_step() { # id, title
  if [ "$PASS" = collect ]; then
    CURRENT=""
    if known "$1" "$STEPS"; then CURRENT="$1"; fi
    return
  fi
  SKIP_STEP=no
  RAN_IN_STEP=no
  if ! known "$1" "$STEPS"; then SKIP_STEP=yes; return; fi
  if [ "$FINISHED" = yes ]; then SKIP_STEP=yes; return; fi
  if [ -n "$ONLY" ] && [ "$ONLY" != "$1" ]; then SKIP_STEP=yes; return; fi
  if [ "$MODE" = run ]; then
    local id all=yes
    for id in $RECORDED; do
      case "$id" in "$1#"*) is_done "$id" || all=no ;; esac
    done
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
  npm run -s rollout:status -- --network "$NETWORK" >"$log" 2>&1 || { echo "    (the status tracker failed; see $log)"; return 0; }
  echo "    Tracker after $1: $(grep -c '^  ✓' "$log") done, $(grep -c '^  →' "$log") ready, $(grep -c '^  ·' "$log") waiting on earlier steps"
}

end_step() { # id
  if [ "$PASS" = collect ]; then CURRENT=""; return; fi
  if [ "$SKIP_STEP" = yes ]; then return; fi
  if [ "$MODE" = run ] && [ "$RAN_IN_STEP" = yes ]; then status_summary "$1"; fi
  if [ -n "$UNTIL" ] && [ "$UNTIL" = "$1" ]; then FINISHED=yes; fi
}

run_cmd() { # step, index, kind (dry|send|check|build), guard id or -, once or -, the runbook's line
  local step="$1" idx="$2" kind="$3" guard="$4" once="$5" cmd
  local id="$step#$idx"
  if [ "$PASS" = collect ]; then
    if [ "$CURRENT" = "$step" ] && [ "$kind" != dry ]; then RECORDED="${RECORDED:+$RECORDED }$id"; fi
    return
  fi
  if [ "$SKIP_STEP" = yes ]; then return; fi
  cmd="$(for_network "$6")"

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
    echo "If it created nothing, run:              bash $ENTRY --retry '$id'"
    echo "If it created the app and you recorded its id, run:  bash $ENTRY --mark-done '$id'"
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

only_on() { # network, then run_cmd's arguments: a command only that network has
  if [ "$NETWORK" != "$1" ]; then return; fi
  shift
  run_cmd "$@"
}

need_value() { # variable, what it holds: an address the owner supplies
  if [ "$PASS" = collect ] || [ "$SKIP_STEP" = yes ] || [ "$MODE" != run ]; then return; fi
  local value
  eval "value=\${$1:-}"
  if [ "${#value}" -ne 58 ]; then
    echo
    echo "STOPPED before this step: $1 is not set. It is $2."
    echo "Start again with it:  $1=<address> $COMMIT_VAR=$EXPECT_COMMIT bash $ENTRY"
    exit 1
  fi
  export "$1=$value"
}

set_from() { # variable, the runbook's read-only command that prints the value alone
  if [ "$PASS" = collect ] || [ "$SKIP_STEP" = yes ]; then return; fi
  local read_cmd value
  read_cmd="$(for_network "$2")"
  if [ "$MODE" = list ]; then
    printf '  [read] export %s=$(%s)\n' "$1" "$read_cmd"
    return
  fi
  value="$(bash -c "$read_cmd" 2>>"$LOGS/rollout-id.log")"
  case "$value" in
    ''|*[!0-9A-Z]*)
      echo
      echo "STOPPED: could not read $1. Nothing after it was run."
      echo "  $read_cmd"
      echo "Its messages are in projects/akita-sc/$LOGS/rollout-id.log"
      exit 1
      ;;
  esac
  export "$1=$value"
  echo "    $1=$value"
}

all_steps() {
  begin_step A4a 'Give TestNet'"'"'s DAO wallet MainNet'"'"'s escrows and grants (TestNet only, before B1)'
  run_cmd A4a 1 dry A4a#2 - 'npm run rollout:testnet-parity -- -n testnet --dry-run --sender "$CREATOR"'
  run_cmd A4a 2 send - - 'npm run rollout:testnet-parity -- -n testnet --confirm'
  run_cmd A4a 3 check - - 'npm run rollout:testnet-parity -- -n testnet --dry-run --sender "$CREATOR"'
  end_step A4a

  begin_step B1 'Phase 2a: install the new UpdateAkitaDAOPlugin'
  run_cmd B1 1 dry B1#2 - 'npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd B1 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2a-update-plugin.ts -n mainnet -v "$V" --manifest receipts/phase2a.json --fund-sponsor --register --confirm'
  run_cmd B1 3 build - - '(cd ../akita-sdk && npm run build)'
  end_step B1

  begin_step B2 'Deploy the validator and upgrade the DAO'
  run_cmd B2 1 dry B2#2 - 'npm run update:dao -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd B2 2 send - - 'npm run update:dao -- -n mainnet -v "$V"'
  run_cmd B2 3 send - - 'npm run deploy:dao-plugin -- -n mainnet -v "$V" --manifest receipts/dao-plugin.json --register'
  run_cmd B2 4 build - - '(cd ../akita-sdk && npm run build)'
  end_step B2

  begin_step B3 'Set guild_fees'
  run_cmd B3 1 dry B3#2 - 'npm run update:guild-creation-cost -- -n mainnet --cost 200000000 --dry-run --sender "$CREATOR"'
  run_cmd B3 2 send - - 'npm run update:guild-creation-cost -- -n mainnet --cost 200000000'
  end_step B3

  begin_step B3a 'Set the staking pool, auction and raffle creation fees'
  run_cmd B3a 1 dry B3a#2 - 'npm run update:creation-fees -- -n mainnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --dry-run --sender "$CREATOR"'
  run_cmd B3a 2 send - - 'npm run update:creation-fees -- -n mainnet --staking-pool 100000000 --auction 50000000 --raffle 50000000 --confirm'
  end_step B3a

  begin_step B3b 'Set the revenue split to 80/5/15'
  run_cmd B3b 1 dry B3b#2 - 'npm run update:revenue-splits -- -n mainnet --split rec_krby=80,rec_mod=5,rec_gov=15 --dry-run --sender "$CREATOR"'
  run_cmd B3b 2 send - - 'npm run update:revenue-splits -- -n mainnet --split rec_krby=80,rec_mod=5,rec_gov=15 --confirm'
  end_step B3b

  begin_step C1 'Deploy Gate v2 and every sub-gate'
  run_cmd C1 1 dry C1#2 - 'npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --dry-run --sender "$CREATOR"'
  run_cmd C1 2 send - - 'npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --manifest-dir receipts/gates'
  end_step C1

  begin_step C2 'Allowlist every sub-gate'
  run_cmd C2 1 dry C2#2 - 'npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n mainnet --manifest-dir receipts/gates --dry-run --sender "$CREATOR"'
  run_cmd C2 2 send - - 'npx ts-node --transpile-only scripts/allowlist-sub-gates.ts -n mainnet --manifest-dir receipts/gates'
  end_step C2

  begin_step C3 'Seal Gate imports'
  run_cmd C3 1 dry C3#2 - 'npm run seal:gate-imports -- -n mainnet --manifest-dir receipts/gates --dry-run --sender "$CREATOR"'
  run_cmd C3 2 send - - 'npm run seal:gate-imports -- -n mainnet --manifest-dir receipts/gates'
  end_step C3

  begin_step C4 'Point aal.gate at Gate v2'
  run_cmd C4 1 send - - 'npm run deploy:gates -- -n mainnet -v "$V" --contracts gate,akitaReferrer,asset,merkleAddress,merkleAsset,nfd,nfdRoot,poll,socialActivity,socialFollowerCount,socialFollowerIndex,socialImpact,socialModerator,moderatorActivity,governanceParticipation,stakingAmount,stakingPower,subscription,subscriptionStreak --legacy-cutoff 1 --manifest-dir receipts/gates --register'
  run_cmd C4 2 build - - '(cd ../akita-sdk && npm run build)'
  end_step C4

  begin_step D1 'Upgrade Staking in place'
  run_cmd D1 1 dry D1#2 - 'npm run update:staking -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd D1 2 send - - 'npm run update:staking -- -n mainnet -v "$V"'
  end_step D1

  begin_step D2 'Deploy Rewards v2 and repoint aal.rewards'
  run_cmd D2 1 dry D2#2 - 'npm run deploy:rewards -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd D2 2 send - - 'npm run deploy:rewards -- -n mainnet -v "$V" --manifest receipts/rewards.json'
  run_cmd D2 3 dry D2#4 - 'npm run rewards:opt-in -- -n mainnet --manifest receipts/rewards.json --dry-run'
  run_cmd D2 4 send - - 'npm run rewards:opt-in -- -n mainnet --manifest receipts/rewards.json'
  run_cmd D2 5 send - - 'npm run deploy:rewards -- -n mainnet -v "$V" --manifest receipts/rewards.json --register'
  run_cmd D2 6 build - - '(cd ../akita-sdk && npm run build)'
  end_step D2

  begin_step E1 'Social family'
  run_cmd E1 1 dry E1#3 - 'npm run check:social-legacy-prefixes -- -n mainnet'
  run_cmd E1 2 dry E1#3 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AkitaSocial,AkitaSocialGraph --dry-run --sender "$CREATOR"'
  run_cmd E1 3 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AkitaSocial,AkitaSocialGraph --confirm'
  run_cmd E1 4 dry E1#5 - 'npm run update:social -- -n mainnet -v "$V" --contracts socialImpact,socialModeration --dry-run --sender "$CREATOR"'
  run_cmd E1 5 send - - 'npm run update:social -- -n mainnet -v "$V" --contracts socialImpact,socialModeration'
  end_step E1

  begin_step E2a 'Top the Subscriptions app up to the service storage reserve (runs before E2)'
  run_cmd E2a 1 dry E2a#2 - 'npm run fund:subscription-reserve -- -n mainnet --dry-run'
  run_cmd E2a 2 send - - 'npm run fund:subscription-reserve -- -n mainnet --confirm'
  end_step E2a

  begin_step E2 Subscriptions
  run_cmd E2 1 dry E2#3 - 'npm run fund:subscription-reserve -- -n mainnet --dry-run'
  run_cmd E2 2 dry E2#3 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Subscriptions --dry-run --sender "$CREATOR"'
  run_cmd E2 3 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Subscriptions --confirm'
  end_step E2

  begin_step E3 'Marketplace + Listing'
  run_cmd E3 1 dry E3#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Marketplace --dry-run --sender "$CREATOR"'
  run_cmd E3 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target Marketplace --confirm'
  end_step E3

  begin_step E4 'Auction and Raffle factories'
  run_cmd E4 1 dry E4#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AuctionFactory,RaffleFactory --dry-run --sender "$CREATOR"'
  run_cmd E4 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AuctionFactory,RaffleFactory --confirm'
  end_step E4

  begin_step E5 'StakingPoolFactory + StakingPool'
  run_cmd E5 1 dry E5#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target StakingPoolFactory --dry-run --sender "$CREATOR"'
  run_cmd E5 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target StakingPoolFactory --confirm'
  end_step E5

  begin_step E6 'Poll, PrizeBox, HyperSwap'
  run_cmd E6 1 dry E6#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target PollFactory --dry-run --sender "$CREATOR"'
  run_cmd E6 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target PollFactory --manifest-dir receipts/phase2 --register --confirm'
  run_cmd E6 3 dry E6#4 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target HyperSwap --dry-run --sender "$CREATOR"'
  run_cmd E6 4 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target HyperSwap --manifest-dir receipts/phase2 --register --confirm'
  run_cmd E6 5 build - - '(cd ../akita-sdk && npm run build)'
  run_cmd E6 6 dry E6#7 - 'npm run update:prize-box -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd E6 7 send - - 'npm run update:prize-box -- -n mainnet -v "$V"'
  end_step E6

  begin_step E6a 'Give the empty service accounts their minimum balance'
  run_cmd E6a 1 dry E6a#2 - 'npm run fund:service-accounts -- -n mainnet --dry-run --sender "$CREATOR"'
  run_cmd E6a 2 send - - 'npm run fund:service-accounts -- -n mainnet --confirm'
  end_step E6a

  begin_step E7 'Wallet factory + wallet child (atomic) (one-way)'
  run_cmd E7 1 dry E7#2 - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AbstractedAccountFactory --dry-run --sender "$CREATOR"'
  run_cmd E7 2 send - - 'npx ts-node --transpile-only scripts/principal-phase2-upgrade-targets.ts -n mainnet -v "$V" --target AbstractedAccountFactory --confirm'
  end_step E7

  begin_step F0 'New storage quote helper for wallets'
  run_cmd F0 1 dry F0#2 - 'npm run deploy:wallet-mbr -- -n mainnet --dry-run --sender "$CREATOR"'
  run_cmd F0 2 send - - 'npm run deploy:wallet-mbr -- -n mainnet --register'
  run_cmd F0 3 build - - '(cd ../akita-sdk && npm run build)'
  end_step F0

  begin_step F1 'Upgrade the DAO wallet (one-way)'
  run_cmd F1 1 dry F1#2 - 'npm run update:dao-wallet -- -n mainnet --dry-run --sender "$CREATOR"'
  run_cmd F1 2 send - - 'npm run update:dao-wallet -- -n mainnet'
  end_step F1

  begin_step F2 'Sweep the 72 user wallets'
  run_cmd F2 1 dry F2#2 - 'npm run update:automatic-wallets -- -n mainnet --dry-run'
  run_cmd F2 2 send - - 'npm run update:automatic-wallets -- -n mainnet --skip-current'
  end_step F2

  begin_step G1 'Phase 3 plugins'
  run_cmd G1 1 dry G1#2 - 'npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -v "$V" --swap --add-new-methods --dry-run --sender "$CREATOR"'
  run_cmd G1 2 send - - 'npx ts-node --transpile-only scripts/principal-phase3-plugins.ts -n mainnet -v "$V" --manifest-dir receipts/phase3 --swap --add-new-methods --register --confirm'
  run_cmd G1 3 build - - '(cd ../akita-sdk && npm run build)'
  end_step G1

  begin_step G2 'Every other live plugin'
  run_cmd G2 1 send - - 'npm run deploy:gate-plugin -- -n mainnet -v "$V" --manifest receipts/gate-plugin.json --register'
  run_cmd G2 2 send - once 'npm run deploy:staking-plugin -- -n mainnet -v "$V"'
  run_cmd G2 3 send - once 'npm run deploy:rewards-plugin -- -n mainnet -v "$V"'
  run_cmd G2 4 send - once 'npm run deploy:optin-plugin -- -n mainnet'
  run_cmd G2 5 send - once 'npm run deploy:self-optin-plugin -- -n mainnet'
  run_cmd G2 6 send - once 'npm run deploy:asa-manager-plugin -- -n mainnet'
  only_on mainnet G2 6a send - once 'npm run deploy:haystack-router-plugin -- -n mainnet -v "$V"'
  run_cmd G2 7 send - once 'npm run deploy:nfd-plugin -- -n mainnet'
  run_cmd G2 8 build - - '(cd ../akita-sdk && npm run build)'
  run_cmd G2 9 dry G2#10 - 'npm run update:dao-wallet-plugins -- -n mainnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --dry-run --sender "$CREATOR"'
  run_cmd G2 10 send - - 'npm run update:dao-wallet-plugins -- -n mainnet --add-method rewardsPlugin:reclaimRewards,claimLegacyRewards,reclaimLegacyRewards --confirm-update'
  end_step G2


  begin_step G2a 'Set the heartbeat manager'
  need_value HEARTBEAT_MANAGER 'the heartbeat manager, an account the backend holds for this one job'
  run_cmd G2a 1 dry G2a#2 - 'npm run staking:set-heartbeat-manager -- -n mainnet --manager "$HEARTBEAT_MANAGER" --dry-run'
  run_cmd G2a 2 send - - 'npm run staking:set-heartbeat-manager -- -n mainnet --manager "$HEARTBEAT_MANAGER"'
  end_step G2a

  begin_step G2b "Withdraw the stickers escrow's storage credits from Rewards v1"
  run_cmd G2b 1 dry G2b#2 - 'npm run rewards:withdraw-v1-credits -- -n mainnet --dry-run --sender "$CREATOR"'
  run_cmd G2b 2 send - - 'npm run rewards:withdraw-v1-credits -- -n mainnet --execute'
  end_step G2b

  begin_step G3 'RevenueManagerPlugin'
  run_cmd G3 1 dry G3#2 - 'npm run deploy:revenue-manager-plugin -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd G3 2 send - once 'npm run deploy:revenue-manager-plugin -- -n mainnet -v "$V"'
  run_cmd G3 3 build - - '(cd ../akita-sdk && npm run build)'
  end_step G3

  begin_step G3a 'Register rev_nfd with the RevenueManager'
  need_value REV_NFD_SOURCE 'the account allowed to opt rev_nfd in to an asset'
  run_cmd G3a 1 dry G3a#2 - 'npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source "$REV_NFD_SOURCE" --dry-run'
  run_cmd G3a 2 send - - 'npm run register:revenue-escrow -- -n mainnet --escrow rev_nfd --source "$REV_NFD_SOURCE" --confirm'
  end_step G3a

  begin_step G3b 'Opt the split receivers in to the assets the revenue escrows pay out'
  only_on mainnet G3b 1 dry G3b#2 - 'npm run opt-in:revenue-receivers -- -n mainnet --dry-run --sender "$CREATOR"'
  only_on mainnet G3b 2 send - - 'npm run opt-in:revenue-receivers -- -n mainnet --confirm'
  # TestNet's revenue escrows hold neither USDC nor AKTA, so the rehearsal names both (runbook, G3b).
  only_on testnet G3b 1 dry G3b#2 - 'npm run opt-in:revenue-receivers -- -n testnet --asset 10458941,752884771 --dry-run --sender "$CREATOR"'
  only_on testnet G3b 2 send - - 'npm run opt-in:revenue-receivers -- -n testnet --asset 10458941,752884771 --confirm'
  end_step G3b

  begin_step H1 'Meta, MetaPlugin, PayPlugin and the rev_meta escrow'
  run_cmd H1 1 dry H1#2 - 'npm run deploy:meta -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd H1 2 send - - 'npm run deploy:meta -- -n mainnet -v "$V" --manifest receipts/meta.json --register'
  run_cmd H1 3 build - - '(cd ../akita-sdk && npm run build)'
  set_from META 'npm run -s rollout:id -- -n mainnet --app meta'
  set_from META_ADDRESS 'npm run -s rollout:id -- -n mainnet --app meta --address'
  run_cmd H1 6 send - - 'npm run deploy:meta-plugin -- -n mainnet -v "$V" --config "{\"registry\":\"$META\"}" --manifest receipts/meta-plugin.json --register'
  run_cmd H1 7 build - - '(cd ../akita-sdk && npm run build)'
  run_cmd H1 8 dry H1#9 - 'npm run set:policy-writer -- -n mainnet --dry-run --sender "$CREATOR"'
  run_cmd H1 9 send - - 'npm run set:policy-writer -- -n mainnet --confirm'
  run_cmd H1 10 dry H1#11 - 'npm run install:policy-writer-grant -- -n mainnet --dry-run'
  run_cmd H1 11 send - - 'npm run install:policy-writer-grant -- -n mainnet --confirm'
  run_cmd H1 12 send - - 'npm run deploy:pay-plugin -- -n mainnet -v "$V" --config "{\"registry\":\"$META\"}" --manifest receipts/pay-plugin.json --register'
  run_cmd H1 13 build - - '(cd ../akita-sdk && npm run build)'
  run_cmd H1 14 dry H1#15 - 'npm run update:dao-wallet-plugins -- -n mainnet --dry-run --sender "$CREATOR"'
  run_cmd H1 15 send - - 'npm run update:dao-wallet-plugins -- -n mainnet --confirm-update'
  run_cmd H1 16 send - - 'npm run create:dao-escrow -- -n mainnet --escrow rev_meta --execute'
  run_cmd H1 17 dry H1#18 - 'npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --dry-run'
  run_cmd H1 18 send - - 'npm run update:app-dao-escrow -- -n mainnet --app meta --escrow rev_meta --confirm'
  run_cmd H1 19 dry H1#20 - 'npm run register:revenue-escrow -- -n mainnet --escrow rev_meta --source "$META_ADDRESS" --dry-run'
  run_cmd H1 20 send - - 'npm run register:revenue-escrow -- -n mainnet --escrow rev_meta --source "$META_ADDRESS" --confirm'
  run_cmd H1 21 build - - '(cd ../akita-sdk && npm run build)'
  end_step H1

  begin_step H1a 'Collectible Variations registry'
  run_cmd H1a 1 dry H1a#2 - 'npm run deploy:collectible-variations -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd H1a 2 send - - 'npm run deploy:collectible-variations -- -n mainnet -v "$V" --manifest receipts/collectible-variations.json --reserve-type-zero --register'
  run_cmd H1a 3 build - - '(cd ../akita-sdk && npm run build)'
  end_step H1a

  # --confirm-mainnet is the runbook's flag for MainNet; on TestNet the script does not ask for it and ignores it.
  begin_step H2 'Guilds'
  run_cmd H2 1 send - - 'npm run create:dao-escrow -- -n mainnet --escrow rev_guilds --execute'
  set_from REV_GUILDS_APP 'npm run -s rollout:id -- -n mainnet --escrow rev_guilds'
  run_cmd H2 3 dry H2#4 - 'npm run deploy:guild-factory -- -n mainnet -v "$V" --revenue-escrow-app "$REV_GUILDS_APP" --revenue-escrow-name rev_guilds --dry-run --sender "$CREATOR"'
  run_cmd H2 4 send - - 'npm run deploy:guild-factory -- -n mainnet -v "$V" --revenue-escrow-app "$REV_GUILDS_APP" --revenue-escrow-name rev_guilds --manifest receipts/guild-factory.json --register --confirm-mainnet'
  run_cmd H2 5 build - - '(cd ../akita-sdk && npm run build)'
  set_from GUILD_FACTORY 'npm run -s rollout:id -- -n mainnet --app guildFactory'
  set_from GUILD_FACTORY_ADDRESS 'npm run -s rollout:id -- -n mainnet --app guildFactory --address'
  run_cmd H2 8 send - - 'npm run deploy:guild-plugin -- -n mainnet -v "$V" --config "{\"factory\":\"$GUILD_FACTORY\",\"guild\":\"0\"}" --manifest receipts/guild-plugin.json --register'
  run_cmd H2 9 dry H2#10 - 'npm run register:revenue-escrow -- -n mainnet --escrow rev_guilds --source "$GUILD_FACTORY_ADDRESS" --dry-run'
  run_cmd H2 10 send - - 'npm run register:revenue-escrow -- -n mainnet --escrow rev_guilds --source "$GUILD_FACTORY_ADDRESS" --confirm'
  run_cmd H2 11 build - - '(cd ../akita-sdk && npm run build)'
  end_step H2

  begin_step H5 'Wallet balance reader'
  run_cmd H5 1 dry H5#2 - 'npm run deploy:wallet-balance-reader -- -n mainnet -v "$V" --dry-run --sender "$CREATOR"'
  run_cmd H5 2 send - - 'npm run deploy:wallet-balance-reader -- -n mainnet -v "$V" --manifest receipts/wallet-balance-reader.json --register'
  run_cmd H5 3 build - - '(cd ../akita-sdk && npm run build)'
  end_step H5

  begin_step H6 'Labs revenue payout (rec_krby)'
  need_value LABS_ADDRESS 'the Akita Labs address, the one receiver of rec_krby payouts'
  run_cmd H6 1 dry H6#2 - 'npm run install:pay-policy-grant -- -n mainnet --escrow rec_krby --recipient "$LABS_ADDRESS" --dry-run'
  run_cmd H6 2 send - - 'npm run install:pay-policy-grant -- -n mainnet --escrow rec_krby --recipient "$LABS_ADDRESS" --confirm'
  end_step H6

}

all_steps
PASS=run

if [ "$MODE" = retry ] || [ "$MODE" = mark ]; then
  if ! known "$TARGET" "$RECORDED"; then echo "No command named '$TARGET' on $NET_NAME. Use the id printed when it stopped, such as G2#4." >&2; exit 2; fi
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
    echo "Name the commit to deploy from: $COMMIT_VAR=<commit> bash $ENTRY" >&2
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

  if [ "$NETWORK" = mainnet ]; then
    # The rehearsal's receipts: a step that finds a receipt resumes from it (runbook, A4).
    if [ -e receipts/rehearsal-done.txt ] || [ -e receipts/rehearsal-logs ]; then
      echo "projects/akita-sc/receipts still holds the TestNet rehearsal's receipts, and a step that finds a receipt resumes from it." >&2
      echo "Keep them apart first:  mv projects/akita-sc/receipts projects/akita-sc/receipts-testnet" >&2
      echo "Nothing was run." >&2
      exit 1
    fi
    # The contracts, the scripts and the SDK source have to be the commit's. --register writes networks.ts.
    if ! TREE="$(git -C "$REPO" status --porcelain --untracked-files=no -- projects/akita-sc/smart_contracts projects/akita-sc/scripts projects/akita-sc/release projects/akita-sc/package.json projects/akita-sdk/src projects/akita-sdk/package.json package.json package-lock.json)"; then
      echo "Could not read which files of the checkout differ from the commit. Nothing was run." >&2
      exit 1
    fi
    CHANGED="$(printf '%s\n' "$TREE" | grep -v ' projects/akita-sdk/src/networks\.ts$' | grep -v '^$' || true)"
    if [ -n "$CHANGED" ] && [ "$ALLOW_CHANGES" != yes ]; then
      echo "These files differ from commit $HEAD_NOW:" >&2
      echo "$CHANGED" >&2
      echo "MainNet runs the commit's contracts and scripts. Restore them, or commit and name the new commit." >&2
      echo "To run them as they are, start again with --allow-local-changes. Nothing was run." >&2
      exit 1
    fi
    # The owner's rule for MainNet (2026-11-25): the public endpoints slowed the rehearsal.
    if [ -z "${NODELY_API_KEY:-}" ] && [ "$PUBLIC_NODE" != yes ]; then
      echo "NODELY_API_KEY is not set, so every command would use the public endpoints, which limit requests." >&2
      echo "Set it without showing it:  read -rs NODELY_API_KEY && export NODELY_API_KEY" >&2
      echo "and name its plan if it is not boost:  export NODELY_PLAN=unlimited" >&2
      echo "To use the public endpoints anyway, start again with --public-node. Nothing was run." >&2
      exit 1
    fi
    # The programs about to be sent are the ones the release manifest pins (DEC-5).
    if ! npm run -s release:manifest:check; then
      echo "The built programs differ from release/manifest.json. Nothing was run." >&2
      exit 1
    fi
  fi

  if [ -z "${DEPLOYER_MNEMONIC:-}" ] && [ -z "${MNEMONIC:-}" ]; then
    printf 'The DAO creator key is not in this shell. Paste it and press Enter (it is not shown): '
    read -rs DEPLOYER_MNEMONIC
    echo
    export DEPLOYER_MNEMONIC
    if [ -z "$DEPLOYER_MNEMONIC" ]; then echo "No key given. Nothing was run." >&2; exit 1; fi
  fi

  export V=2.0.0
  mkdir -p receipts/gates receipts/phase2 receipts/phase3 "$LOGS"

  echo "Reading $NET_NAME..."
  CREATOR="$(npm run -s rollout:status -- --network "$NETWORK" 2>/dev/null | sed -n 's/^DAO creator: //p' | head -n 1)"
  export CREATOR
  if [ "${#CREATOR}" -ne 58 ]; then
    echo "Could not read the DAO creator from $NET_NAME (got '${CREATOR}'). Nothing was run." >&2
    exit 1
  fi
  echo "$NET_NAME DAO creator: $CREATOR"
  echo "Commit: $HEAD_NOW, release label $V, Node $(node -v)"

  if [ "$ASSUME_YES" != yes ]; then
    echo
    echo "This signs and sends the $RUN_NAME with the DAO creator's key."
    if [ -n "$ONLY" ]; then echo "Step: $ONLY"; else echo "Steps: $STEPS${UNTIL:+ (stopping after $UNTIL)}"; fi
    if [ "$NETWORK" = mainnet ]; then
      echo "Two things are done by hand before it (runbook A5 and D1a):"
      echo "  - The DAO creator holds enough ALGO for the whole run."
      echo "  - The sellers of the 2 live Listings were asked to settle or delist. After D2, a sale of"
      echo "    theirs that needs a Rewards disbursement reverts."
    fi
    printf 'Type %s to start: ' "$NETWORK"
    read -r ANSWER
    if [ "$ANSWER" != "$NETWORK" ]; then echo "Not started."; exit 1; fi
  fi
  # Which commit each start ran from (DEC-5: deploy from one recorded commit).
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) $HEAD_NOW" >>"receipts/$RECORD-commits.txt"
fi

all_steps

if [ "$MODE" = run ]; then
  echo
  if [ -n "$ONLY" ]; then
    echo "Step $ONLY is finished."
  elif [ -n "$UNTIL" ]; then
    echo "Finished through $UNTIL."
  elif [ "$NETWORK" = mainnet ]; then
    echo "B1 to H6 are finished. What is left is by hand: G4 (the SDK switches), then I2 (commit, push and tag). I1 only when the DAO launches."
  else
    echo "A4a to H6 are finished. What is left is by hand: G4 (the SDK switches), and I1 only when the DAO launches."
  fi
fi
