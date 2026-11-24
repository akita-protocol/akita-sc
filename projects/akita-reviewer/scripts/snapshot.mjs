#!/usr/bin/env node
// Copies the contract source at one commit into work/snapshots/<commit>/ for a
// blind review: contracts and shared code only, with no tests, Markdown,
// generated artifacts or mocks, so the reviewer cannot read earlier findings or
// regression tests that name them.
//
//   node scripts/snapshot.mjs --commit e7f174ee [--repo ../..]
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { normalizePath } from './core/locations.mjs'
import { sha256Hex } from './core/program.mjs'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const { values } = parseArgs({
  options: {
    commit: { type: 'string' },
    repo: { type: 'string', default: resolve(ROOT, '../..') },
    out: { type: 'string' },
  },
})
if (!values.commit) {
  console.error('usage: snapshot.mjs --commit <sha> [--repo <akita-sc checkout>] [--out <dir>]')
  process.exit(2)
}

const commit = execFileSync('git', ['-C', values.repo, 'rev-parse', '--verify', `${values.commit}^{commit}`], { encoding: 'utf8' }).trim()
const out = resolve(values.out ?? join(ROOT, 'work/snapshots', commit.slice(0, 12)))
rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

const SOURCES = ['projects/akita-sc/smart_contracts', 'projects/akita-plugin']
const present = SOURCES.filter((path) => {
  try {
    execFileSync('git', ['-C', values.repo, 'cat-file', '-e', `${commit}:${path}`], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
})
const archive = execFileSync('git', ['-C', values.repo, 'archive', '--format=tar', commit, ...present], { maxBuffer: 1 << 30 })
execFileSync('tar', ['-x', '-C', out], { input: archive })

const DROP_DIRS = new Set(['artifacts', 'mocks', 'node_modules', '__tests__'])
const KEEP = (name) => /\.(algo\.)?ts$/.test(name) && !/\.(spec|test)\.ts$/.test(name)

function prune(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      if (DROP_DIRS.has(name) || /test/i.test(name)) rmSync(path, { recursive: true, force: true })
      else prune(path)
    } else if (!KEEP(name) || /audit/i.test(name)) {
      rmSync(path)
    }
  }
}
prune(out)

const files = []
function list(dir) {
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) list(path)
    else if (name !== 'manifest.json') {
      const repoRelative = relative(out, path)
      files.push({ path: repoRelative, key: normalizePath(repoRelative), sha256: sha256Hex(readFileSync(path)) })
    }
  }
}
list(out)
writeFileSync(join(out, 'manifest.json'), JSON.stringify({ commit, sources: present, files }, null, 2) + '\n')
console.log(`snapshot ${commit.slice(0, 12)}: ${files.length} files in ${relative(process.cwd(), out) || out}`)
