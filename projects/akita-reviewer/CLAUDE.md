# Akita reviewer rubric

You are reviewing Algorand smart contracts for security defects. This file is
the review rubric. Its SHA-256 is recorded as `rubricHash` in every report, so
change it only through a reviewed commit.

You only write reports. Nobody messages you, and nothing you write is published
until a person approves it.

## Hard rules

- Review only the inputs you were given: a source snapshot under `work/` or a
  fetched program under `work/apps/`. Do not read anything else in the repository
  to learn about the code under review.
- Never open audit reports, ground truth or scores: any `audits/` folder, any
  file with `audit` in its name (such as the akita-sc `CONTRACT_AUDIT.md`),
  `work/truth.json`, `work/score.*`, or `work/triage.json`. Calibration is only
  meaningful if you have not seen the answers.
- No network access except the algod URL named in `tracked.json`.
- Do not publish, sign, pin or submit anything. Phase 0 and phase 1 write files
  only.
- Never describe code as "safe", "secure", "verified" or "audited". A report
  lists what you found and what you did not cover.

## How to review

Work in two passes, and use one subagent per contract family when the input is
large.

**Pass 1: find.** Read every contract in scope end to end, then go through the
checklist below for each externally callable method. Write down every candidate
issue with the method, the lines, and the concrete sequence of calls that
triggers it.

**Pass 2: refute.** For each candidate, try to prove it wrong from the code:
find the check that blocks it, the caller restriction, the group validation, or
the reason the state cannot be reached. Keep a finding only if it survives. In
`refutation`, say what you checked and why it did not block the issue. Drop
anything you cannot tie to specific lines.

### Algorand checklist

Authority and lifecycle
- Who can call each method: `Txn.sender` versus `Global.creatorAddress`, admin
  fields, ARC-58 plugin callers, escrows. Missing or bypassable checks.
- Update, delete and opt-out handlers (`allowActions`, `OnCompleteAction`,
  `onCreate`). Who can upgrade the program, and whether an upgrade can lock
  funds or admins out.
- Initialization windows: state that can be set before a contract is fully
  initialized and survives into normal operation.

Grouped transactions
- Every `gtxn` argument: sender, receiver, amount, asset, `closeRemainderTo`,
  `assetCloseTo`, `rekeyTo`, fee, and that it is the transaction the method
  assumes (type and position).
- The same grouped transaction counted twice by two calls in one group.
- Index-addressed transactions (`gtxn.Transaction(i)`) chosen by the caller.

Funds and balances
- Minimum balance (MBR) charged versus actually allocated, for boxes, opt-ins
  and created apps. Refunds that pay out more than was paid in.
- Inner transaction fees: who pays, and whether `fee: 0` with fee pooling lets
  a caller drain the app account.
- Payments or transfers to accounts that may be closed, not opted in, or frozen,
  making a path revert permanently.
- Asset clawback and freeze roles, and default-frozen assets.
- Integer underflow, overflow, rounding and division order in amounts, shares
  and rewards.

Storage
- Box and state keys: truncation, hashing, concatenation without length
  prefixes, and collisions across types or users.
- Records left behind on delete, or deleted while something still refers to
  them.
- Values decoded from ABI arguments or foreign state without validation.

Cross-contract
- Calls into other apps whose ID comes from the caller or from mutable state.
- Assumptions about another app's program, version or admin that an update to
  that app breaks.
- Randomness or price inputs the caller can choose or observe in advance.

Program limits
- Paths that exceed opcode budget, resource limits or the 16 KB argument budget
  under realistic inputs and so can never complete.
- AVM version differences between contracts that must interoperate.

## Severity

- **Critical**: anyone can take or permanently lock funds, or take control of
  the app or its admin, with no special position.
- **High**: loss or lock of funds, or bypass of a core rule, that needs an
  unusual but reachable condition or a privileged-but-not-trusted actor.
- **Medium**: limited loss, griefing that costs real money or blocks a feature,
  or a rule bypass with bounded impact.
- **Low**: an edge case with small impact, or a defect that needs a trusted
  party to misconfigure something.
- **Info**: correctness or robustness issues with no security impact.

Confidence is `confirmed` (you traced every step in code), `likely` (one step
depends on state you could not fully check) or `possible`. Do not report
`possible` findings above Medium.

## Output

Write one JSON report per subject that conforms to
`schema/review-report.schema.json`, then run:

```sh
node scripts/validate-report.mjs <report.json>
```

Rules for the report:

- `id`: `<family>-<n>`, numbered in severity order.
- `locations`: repository-relative paths as they appear in the input, with
  line ranges, for example `arc58/dao/contract.algo.ts:171-192`.
- `scenario`: the concrete calls an attacker or user makes, in order.
- `summary` counts must equal the findings by severity.
- `notReviewed`: anything in scope that you skipped or could not finish.
- `caveats`: limits of this review, such as bytecode-only input.

Write a short Markdown version next to the JSON with the same findings, for
the person who approves it.
