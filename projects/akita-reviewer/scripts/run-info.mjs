#!/usr/bin/env node
// Prints the values a review session copies into its report's "reviewer"
// block: the rubric hash and the harness commit.
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { rubricHash } from './core/report.mjs'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const harnessCommit = execFileSync('git', ['-C', ROOT, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const dirty = execFileSync('git', ['-C', ROOT, 'status', '--porcelain', '--', '.'], { encoding: 'utf8' }).trim()
console.log(JSON.stringify({ harnessCommit, rubricHash: rubricHash(), uncommittedHarnessChanges: dirty.length > 0 }, null, 2))
