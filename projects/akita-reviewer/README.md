# akita-reviewer

The harness for Akita's automated security reviewer, phase 0: calibration.

Before the reviewer says anything public about an app, we measure it against
the audits Akita already has. It reviews the contracts as they stood at
`e7f174ee`, blind. The scorer then compares its findings with the 2026-10-02
audit and the 2026-10-05 review of that same code.

Nothing here signs, pins or publishes. Publishing to Meta and IPFS arrives in
phase 1, behind your approval.

## What is here

| Path | Purpose |
| --- | --- |
| `CLAUDE.md` | The review rubric every review session follows. Its SHA-256 goes into each report. |
| `ROUTINE.md` | Prompts for the Claude desktop tasks: calibration review, scoring, and watching tracked apps |
| `schema/review-report.schema.json` | The report format (`akita.review-report.v1`) |
| `calibration/families.json` | The contract families reviewed at `e7f174ee`, one subagent each |
| `tracked.json` | Apps to watch, per network, with their algod endpoints (empty until phase 1) |
| `scripts/snapshot.mjs` | Copies contract source at a commit into `work/snapshots/`, without tests, docs, artifacts or mocks |
| `scripts/run-info.mjs` | Prints the harness commit and rubric hash for a report |
| `scripts/validate-report.mjs` | Checks reports against the schema and the rubric's rules |
| `scripts/extract-truth.mjs` | Turns an audits folder into `work/truth.json` |
| `scripts/score.mjs` | Recall and precision per audit, missed findings, and a triage list |
| `scripts/fetch-app.mjs` | Fetches a live app's programs and hashes them, with optional TEAL disassembly |
| `scripts/check-changes.mjs` | Lists tracked apps whose program hash changed since the last approved review |

`work/` holds everything a run produces and is not committed.

## Requirements

Node 22 or later, and git. There are no npm dependencies, so nothing needs
installing.

## Calibration

```sh
cd projects/akita-reviewer
node scripts/snapshot.mjs --commit e7f174ee
# review: run task 1 in ROUTINE.md
node scripts/extract-truth.mjs --audits ../akita-sc/audits
node scripts/score.mjs --snapshot work/snapshots/e7f174eeb0a4 --reports work/reviews/<date>
```

The snapshot holds 213 files across nine families. Against it, the scorer
counts these audit findings in scope:

| Audit | In scope | Critical + high in scope |
| --- | --- | --- |
| full-2026-10-02 | 108 of 116 | 32 |
| review-2026-10-05 | 70 of 113 | 8 |

Findings are out of scope when their primary file is not in the snapshot. That
covers code that was uncommitted when the audits ran (guilds, Meta, DEX hooks,
the Akita router) and deploy scripts. Both audits read `e7f174ee` plus
uncommitted changes, so a few in-scope findings may describe lines that differ
slightly from the snapshot.

### How matching works

A review finding matches an audit finding when both cite the same file, and
their line ranges come within 30 lines of each other or their titles share
enough words. Each finding matches at most once, best pairs first. The score
reports severity disagreements, but they do not prevent a match.

Recall is automatic. Precision is not: an unmatched review finding can be a
false positive or a real issue the audits missed. The scorer lists those
findings under "Needs triage". Mark them in `work/triage.json` and score again.

### What "good enough" means

You decide the gate for phase 1. A reasonable starting bar:

- At least 60% critical-plus-high recall on the 2026-10-02 audit.
- At least 70% precision after triage.
- No invented critical findings.

## Program identity

`fetch-app.mjs` and `check-changes.mjs` hash programs the way the design
proposal defines:

```
programHash = sha256(sha256(approvalProgram) || sha256(clearProgram))
```

A review is valid only for the hash it records. Any app update makes it stale.

Public algod endpoints usually turn off `/v2/teal/disassemble`. Pass
`--disassemble http://localhost:4001` with AlgoKit LocalNet running to get TEAL.

## Tests

```sh
node --test projects/akita-reviewer/test/*.test.mjs
```
