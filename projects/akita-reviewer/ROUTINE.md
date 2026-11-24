# Claude desktop tasks

Paste these prompts into Claude desktop tasks. Give each task access to your
akita-sc checkout (paths below assume `~/akita/akita-sc`). Every task writes
files under `projects/akita-reviewer/work/` only, which git ignores.

Keep reviewing and scoring in separate tasks. A session that has seen the audit
findings must not review, or the calibration means nothing.

## 1. Calibration review (run by hand, once per rubric change)

```text
Work in ~/akita/akita-sc/projects/akita-reviewer and follow its CLAUDE.md exactly.

1. Run `node scripts/snapshot.mjs --commit e7f174ee`. Note the snapshot folder it prints.
2. Run `node scripts/run-info.mjs` and keep harnessCommit and rubricHash. If it
   reports uncommitted harness changes, stop and tell me.
3. Read calibration/families.json. For each family, start one subagent. Give it
   CLAUDE.md, the family's paths inside the snapshot folder, and nothing else.
   Each subagent reviews its family in two passes and writes
   work/reviews/<YYYY-MM-DD>/<family id>.json and .md, with subject.kind
   "source", subject.commit "e7f174ee", subject.family and subject.paths set to
   the family's id and paths, and reviewer.model set to the model you are
   running as.
4. Run `node scripts/validate-report.mjs work/reviews/<date>/*.json` and fix any
   report that fails.
5. Do not open work/truth.json, any audits folder, or any score file.
6. Reply with the number of findings per family and severity, and any family
   you could not finish.
```

## 2. Calibration score (run by hand, after a review)

```text
Work in ~/akita/akita-sc/projects/akita-reviewer.

1. Run `node scripts/extract-truth.mjs --audits ../akita-sc/audits`.
2. Run `node scripts/score.mjs --snapshot work/snapshots/<folder> --reports work/reviews/<date>`.
3. Show me work/score.md: critical-plus-high recall for each audit, the missed
   critical and high findings, and the findings that need triage.
```

Triage the "Needs triage" list into `work/triage.json`:

```json
{ "dao-3": "valid", "dao-5": "false-positive" }
```

Run the score task again to get precision.

## 3. Watch tracked apps (phase 1, once calibration passes)

Fill `tracked.json` with TestNet app IDs first. Schedule hourly.

```text
Work in ~/akita/akita-sc/projects/akita-reviewer and follow its CLAUDE.md exactly.

1. Run `node scripts/check-changes.mjs`. If "changed" is empty, stop and say
   nothing changed.
2. For each changed app, run `node scripts/fetch-app.mjs --network <network> --app <id>`.
   Add `--disassemble http://localhost:4001` when AlgoKit LocalNet is running.
3. Review each app in its own subagent with CLAUDE.md and its work/apps folder.
   Write work/reviews/apps/<network>-<id>-<programHash first 12>.json and .md,
   with subject.kind "bytecode" and the hashes from app.json.
4. Validate every report. Do not publish anything and do not record the apps
   as reviewed.
5. Reply with one line per app: name, counts by severity, and the report path.
```

After you approve a report, mark the app reviewed at its live hash:

```sh
node scripts/check-changes.mjs --record testnet:<appId>
```
