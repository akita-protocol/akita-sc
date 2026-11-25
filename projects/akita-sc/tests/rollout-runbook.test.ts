/**
 * docs/rollout/MAINNET-ROLLOUT.md is run by hand, one command per step. The scripts read their flags with
 * `args.includes(...)`, so a flag a script does not know is dropped without an error, and the step then does
 * less than the runbook says. This test reads every command in the runbook's Sequence and fails when one
 * names an npm script or a file that does not exist, a flag its script never reads, or a contract, target or
 * plugin its script does not know. It also checks that every step the runbook says `rollout:status` tracks
 * is a step of that tracker, and that no command passes the key on the command line. The file that runs
 * these commands, scripts/rollout-run.sh, is held to them by tests/rollout-runner.test.ts.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import catalog from '../scripts/lib/immutable-catalog.json'
import { LOCKSTEP_PLUGINS, PHASE2_DAO_TARGET, PHASE2_RIDE_ALONG_TARGETS, PHASE2_TARGETS, PHASE3_PLUGINS } from '../scripts/lib/principal-rollout'

const project = path.resolve(__dirname, '..')
const runbookPath = path.resolve(project, '../../docs/rollout/MAINNET-ROLLOUT.md')
const npmScripts = JSON.parse(readFileSync(path.join(project, 'package.json'), 'utf8')).scripts as Record<string, string>

type Command = { step: string; line: string; alias?: string; script?: string; args: string[] }

/** Split a shell line into words, keeping quoted text together. */
function words(line: string): string[] {
  const out: string[] = []
  for (const m of line.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)) out.push(m[1] ?? m[2] ?? m[3])
  return out
}

/** Lines of a step's bash blocks that are shell housekeeping, not a rollout script. */
const plainShell = /^(#|git |nvm use$|cd projects\/akita-sc$|read -rs DEPLOYER_MNEMONIC && export DEPLOYER_MNEMONIC$|read -rs NODELY_API_KEY && export NODELY_API_KEY$|export NODELY_PLAN=(boost|unlimited|enterprise)$|export [A-Z_]+=|mkdir -p receipts\/|npm test$|\(cd \.\.\/\.\. && npm ci\)$|\(cd \.\.\/akita-sdk && npm run build\)$)/

function readCommands(): { commands: Command[]; other: { step: string; line: string }[]; tracked: string[] } {
  const text = readFileSync(runbookPath, 'utf8')
  const sequence = text.slice(text.indexOf('\n## Sequence'), text.indexOf('\n## Script changes made'))
  const commands: Command[] = []
  const other: { step: string; line: string }[] = []
  // A step may name several tracker ids; every backticked `id` or `prefix:name` in the line's first clause is checked.
  const tracked = [...sequence.matchAll(/\*\*Tracked by rollout:status as\*\* ([^\n]*)/g)]
    .flatMap((m) => [...m[1].split(/\. |: | \(/)[0].matchAll(/`([a-z][a-z0-9-]*(?::[A-Za-z0-9]+)?)`/g)].map((id) => id[1]))
  for (const section of sequence.split('\n#### ').slice(1)) {
    const step = section.slice(0, section.indexOf('\n')).split('.')[0]
    for (const block of section.matchAll(/```bash\n([\s\S]*?)```/g)) {
      for (const raw of block[1].split('\n')) {
        const line = raw.trim()
        if (!line || plainShell.test(line)) continue
        const w = words(line)
        if (w[0] === 'npm' && w[1] === 'run') {
          const alias = w[2]
          const rest = w.slice(3)
          const own = rest[0] === '--' ? rest.slice(1) : rest
          const expanded = words(npmScripts[alias] ?? '')
          const at = expanded.findIndex((x) => /^scripts\/.+\.ts$/.test(x))
          commands.push({ step, line, alias, script: at < 0 ? undefined : expanded[at], args: [...(at < 0 ? [] : expanded.slice(at + 1)), ...own] })
        } else if (w[0] === 'npx' && w[1] === 'ts-node') {
          const at = w.findIndex((x) => /^scripts\/.+\.ts$/.test(x))
          commands.push({ step, line, script: at < 0 ? undefined : w[at], args: at < 0 ? [] : w.slice(at + 1) })
        } else {
          other.push({ step, line })
        }
      }
    }
  }
  return { commands, other, tracked }
}

/** Every flag `file` reads, by its quoted literal: its own, script-base's shared ones, and those of the scripts/lib files it imports. */
function knownFlags(script: string): Set<string> {
  const flags = new Set<string>()
  const scan = (file: string) => {
    const source = readFileSync(file, 'utf8')
    for (const m of source.matchAll(/['"](--[a-z][a-z0-9-]*|-[a-z])['"]/g)) flags.add(m[1])
    return source
  }
  const file = path.join(project, script)
  const source = scan(file)
  for (const m of source.matchAll(/from '(\.\/[\w./-]+)'/g)) {
    const imported = path.join(path.dirname(file), `${m[1]}.ts`)
    if (existsSync(imported) && (m[1] === './script-base' || m[1].startsWith('./lib/'))) scan(imported)
  }
  return flags
}

const { commands, other, tracked } = readCommands()

describe('rollout runbook commands', () => {
  test('the Sequence holds commands to check', () => {
    expect(commands.length).toBeGreaterThan(40)
  })

  test('every line of a command block is a rollout script or plain shell', () => {
    expect(other).toEqual([])
  })

  test('every npm script and script file exists', () => {
    const missing = commands.flatMap((c) => [
      ...(c.alias && !npmScripts[c.alias] ? [`${c.step}: npm run ${c.alias} is not in package.json`] : []),
      ...(c.script && !existsSync(path.join(project, c.script)) ? [`${c.step}: ${c.script} does not exist`] : []),
    ])
    expect(missing).toEqual([])
  })

  test('every flag is one its script reads', () => {
    const unknown: string[] = []
    for (const c of commands) {
      if (!c.script || !existsSync(path.join(project, c.script))) continue
      const flags = knownFlags(c.script)
      for (const arg of c.args) {
        if (/^--?[a-z]/.test(arg) && !flags.has(arg)) unknown.push(`${c.step}: ${c.script} does not read ${arg}`)
      }
    }
    expect(unknown).toEqual([])
  })

  test('every contract, target and plugin named is one its script knows', () => {
    const phase2 = [...PHASE2_TARGETS, ...PHASE2_RIDE_ALONG_TARGETS, PHASE2_DAO_TARGET].map((t) => t.name)
    const phase3 = [...PHASE3_PLUGINS, ...LOCKSTEP_PLUGINS].map((p) => p.catalog)
    const known: Record<string, Record<string, readonly string[]>> = {
      'scripts/deploy-immutable.ts': { '--contract': Object.keys(catalog) },
      'scripts/principal-phase2-upgrade-targets.ts': { '--target': phase2 },
      'scripts/principal-phase3-plugins.ts': { '--plugin': phase3 },
    }
    const wrong: string[] = []
    for (const c of commands) {
      const lists = c.script ? known[c.script] : undefined
      if (!lists) continue
      c.args.forEach((arg, i) => {
        const allowed = lists[arg]
        if (!allowed) return
        for (const name of (c.args[i + 1] ?? '').split(',')) {
          if (!allowed.includes(name)) wrong.push(`${c.step}: ${c.script} ${arg} ${name} is not a known name`)
        }
      })
    }
    expect(wrong).toEqual([])
  })

  test('no command passes the key or an abbreviation', () => {
    // The key comes from DEPLOYER_MNEMONIC and the node key from NODELY_API_KEY (step A0), read by the
    // scripts themselves: no command line names either, by flag or by variable. "…" used to stand for
    // the rest of a command.
    const secret = /\$\{?[A-Z_]*(MNEMONIC|KEY|SECRET|TOKEN|PASSWORD)/
    const bad = commands.filter((c) => ['-m', '--mnemonic', '-t', '--token'].some((flag) => c.args.includes(flag)) || c.line.includes('…') || secret.test(c.line))
    expect(bad.map((c) => `${c.step}: ${c.line}`)).toEqual([])
  })

  test('every script that takes a version label is given the release label', () => {
    // A script that stores `options.version` writes the default "1.0.0" when -v is left out.
    const missing = commands.filter((c) => {
      if (!c.script || !existsSync(path.join(project, c.script)) || c.args.includes('-v')) return false
      const source = readFileSync(path.join(project, c.script), 'utf8')
      return /options\.version|runUpdate\(|runPhase2Cli\(|deployImmutable\(/.test(source)
    })
    expect(missing.map((c) => `${c.step}: ${c.line}`)).toEqual([])
  })

  /**
   * The steps after G2 used to name ids and addresses in angle brackets, to be filled in from receipts by
   * hand. Each is now a variable: set once in A0, or read by rollout:id from what an earlier step recorded.
   * (tests/rollout-runner.test.ts holds the file that runs these commands to them, line for line.)
   */
  test('no command types an id by hand, and every variable a command uses is set', () => {
    const runbook = readFileSync(runbookPath, 'utf8')
    const reads = [...runbook.matchAll(/^export ([A-Z_]+)=\$\((.+)\)$/gm)].filter(([, name]) => name !== 'CREATOR')
    expect(reads.map(([, name]) => name)).toEqual(['META', 'META_ADDRESS', 'REV_GUILDS_APP', 'GUILD_FACTORY', 'GUILD_FACTORY_ADDRESS'])
    for (const [, , cmd] of reads) expect(cmd).toMatch(/^npm run -s rollout:id -- -n mainnet (--app [A-Za-z]+( --address)?|--escrow [a-z_]+)$/)
    expect(npmScripts['rollout:id']).toBe('ts-node --transpile-only scripts/rollout-id.ts')
    // the three addresses the owner supplies
    for (const name of ['HEARTBEAT_MANAGER', 'REV_NFD_SOURCE', 'LABS_ADDRESS']) expect(runbook).toMatch(new RegExp(`^export ${name}=<`, 'm'))
    // A command that still names a value in angle brackets would have to be edited before it is run.
    const typed = commands.filter((c) => /<[^>]+>/.test(c.line)).map((c) => `${c.step}: ${c.line}`)
    expect(typed.filter((line) => !/^(H7|I1)\b/.test(line))).toEqual([])
    // every variable a command uses is set in A0, read by rollout:id, or the key
    const set = new Set([...runbook.matchAll(/^export ([A-Z_]+)=/gm)].map((m) => m[1]))
    const used = new Set(commands.flatMap((c) => [...c.line.matchAll(/\$\{?([A-Z_]+)/g)].map((m) => m[1])))
    expect([...used].filter((name) => !set.has(name))).toEqual([])
  })

  test('every step the runbook says is tracked is a step of rollout:status', () => {
    expect(tracked.length).toBeGreaterThan(20)
    const tracker = readFileSync(path.join(project, 'scripts/lib/rollout-steps.ts'), 'utf8')
    const untracked = tracked.filter((id) => {
      const [prefix, name] = id.split(':')
      // `p2:`, `ride:` and `plugin:` ids are built from the target and plugin lists the tracker loops over
      if (name) return !(tracker.includes(`\`${prefix}:\${`) && (tracker.includes(`'${name}'`) || [...PHASE2_TARGETS, ...PHASE2_RIDE_ALONG_TARGETS].some((t) => t.name === name)))
      // plain steps are declared as `id: '<id>'`, the stage-H products as rows that start with `['<id>', `
      return !tracker.includes(`id: '${id}'`) && !tracker.includes(`['${id}', `)
    })
    expect(untracked).toEqual([])
  })
})
