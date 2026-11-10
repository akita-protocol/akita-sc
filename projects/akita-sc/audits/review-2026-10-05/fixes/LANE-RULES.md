# Fix lanes: shared rules (2026-10-05 production review)

Authorization: on 2026-10-05 Kyle said "lets fix all of them" about the findings in
`projects/akita-sc/audits/review-2026-10-05/`. That is approval to change contract code for the findings
assigned to your lane, with the recommended fix in the finding (report-data.json `fix`, and the full
write-up in `<SLICE>.md`). Scope is Critical, High and Medium findings plus the listed decisions. Low/Info
findings are OUT of scope unless your brief names them.

## Where you work

- Edit the MAIN working tree directly: /Users/kylebreeding/akita/akita-sc. Other lanes edit it at the
  same time. Edit ONLY the files your brief owns. Never revert, reformat or "clean up" anything else.
- Shared files (utils/*, utils/base-contracts/*, any errors.ts, tests/fixtures/*, projects/akita-plugin,
  projects/akita-sdk/src/index.ts and other SDK modules you don't own): change only additively and
  minimally (new error constants, new helpers). Never rename or delete existing exports. List every
  shared-file change in your report.
- Never commit, never push, never touch TestNet or MainNet. Read-only MainNet queries are fine.
- If a tool call is denied by the permission system, stop that item and report it. Don't work around it.

## How you work

1. Read AGENTS.md (repo root). Never write PuyaTs from memory: check
   `projects/akita-sc/node_modules/@algorandfoundation/algorand-typescript/*.d.ts`. Load the
   `algorand-typescript` skill; for plugins also `akita-arc58-plugin-dev`.
2. Read your findings in `projects/akita-sc/audits/review-2026-10-05/<SLICE>.md` and the coordinator's
   `VERIFIED.md` notes. Re-confirm each bug in code before you change it.
3. For each finding: write a regression test that reproduces the scenario first (it must fail or
   demonstrate the bug on the old code when that is practical), then make the smallest fix, then show
   the test passes. Keep every existing test green. If an existing test asserted the insecure behaviour,
   update it and say so.
4. Fix the root cause the finding names. Don't add unrelated refactors, comments that narrate, or
   defensive code beyond the fix.
5. Program size: limit is 16 KB at AVM 13 for new apps. For apps already on MainNet, note any change in
   approval size, page count or global/local schema in your report (an update cannot grow the schema).
6. Plugins and new apps are immutable once deployed; ABI changes there are free. For apps already on
   MainNet (see ROLLOUT.md "Live app compatibility table"), keep every existing ABI selector unless your
   brief says otherwise.

## Builds and tests (serialised: the tree is shared)

Lock script: `L=/private/tmp/claude-501/-Users-kylebreeding-akita-akita-sc/f514af5c-b599-49f3-8bbe-ad2f6361f590/scratchpad/fix/with-lock.sh`

- Build only your roots, always under the build lock, from projects/akita-sc:
  `$L build <lane> node scripts/build-contracts.mjs <root> [<root>...]`
  (roots are paths relative to smart_contracts, e.g. `auction raffle arc58/plugins/auction`).
- If you changed projects/akita-sdk/src, rebuild the SDK under the same lock (tests import its dist):
  `$L build <lane> bash -c 'cd /Users/kylebreeding/akita/akita-sc/projects/akita-sdk && npm run build'`
- Every vitest run that touches LocalNet goes through the LocalNet lock, from projects/akita-sc:
  `$L localnet <lane> npx vitest run <spec files>`
  Pure unit tests (no LocalNet) may run without the lock. Keep lock hold times short; never build
  inside the LocalNet lock. Run your family's specs plus specs that import contracts you changed.
  Do not run the full suite; the coordinator runs it after all lanes finish.
- If another lane's half-finished edit breaks your build, wait a few minutes and retry; don't edit
  their files. If it persists, report it.

## Deliverable

Write `/private/tmp/claude-501/-Users-kylebreeding-akita-akita-sc/f514af5c-b599-49f3-8bbe-ad2f6361f590/scratchpad/fix/lane-<lane>-report.md`:
- each finding: done / partial / not done, with what changed and why (file:line)
- regression test names and where they live; whether each failed before the fix
- files changed (shared files flagged)
- tests run and results (exact counts)
- size/schema/ABI changes for apps already on MainNet
- rollout steps the fix adds or changes

Final message: short. Per finding one line (ID, done/partial/not done), test counts, report path.
