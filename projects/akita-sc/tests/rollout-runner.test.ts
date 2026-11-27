/**
 * The rollout is run by one file, scripts/rollout-run.sh, started for MainNet by rollout-mainnet.sh and
 * for the TestNet rehearsal by rollout-testnet-rehearsal.sh. It signs with the DAO creator's key, so what
 * it sends has to be exactly what the runbook says and what the rehearsal ran.
 *
 * - On MainNet its commands are the runbook's code blocks, line for line and in order, for every step it
 *   runs, and every runbook step with commands that it does not run is named here with its reason.
 * - On TestNet its commands are the ones the rehearsal of 2026-11-25 ran (the fixture), and they differ
 *   from MainNet's only in the ways the runbook's step A4 lists.
 * - Both are then run end to end against stub commands: the order sent, picking up after a stop, the
 *   deploys that keep no receipt, the three addresses, MainNet's checks before the first command, and
 *   that neither key is printed or written.
 */
import { spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, describe, expect, test } from 'vitest'

const project = path.resolve(__dirname, '..')
const runbookPath = path.resolve(project, '../../docs/rollout/MAINNET-ROLLOUT.md')
const fixturePath = path.join(__dirname, 'fixtures/rollout-runner/testnet-rehearsal-commands.txt')
const STARTER = {
  mainnet: path.join(project, 'scripts/rollout-mainnet.sh'),
  testnet: path.join(project, 'scripts/rollout-testnet-rehearsal.sh'),
}
type Network = keyof typeof STARTER

const CREATOR = 'R2MOGXW7CILK33VEET2F2DN5ENGNWGSKXG3I4U5KGP7I26TZTHDVOP6BLE'
const APP_ADDRESS = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ'
const HEAD = 'abc1234def5678abc1234def5678abc1234def56'
const KEY = 'stub creator key that must never be shown'
const NODE_KEY = 'stub-node-key-that-must-never-be-shown'
const ADDRESSES = {
  HEARTBEAT_MANAGER: 'HEARTBEATHEARTBEATHEARTBEATHEARTBEATHEARTBEATHEARTBEATHEAR',
  REV_NFD_SOURCE: 'NFDSOURCENFDSOURCENFDSOURCENFDSOURCENFDSOURCENFDSOURCENFDS',
  LABS_ADDRESS: 'LABSADDRESSLABSADDRESSLABSADDRESSLABSADDRESSLABSADDRESSLAB',
}
/** What each variable of a command holds in a stub run. */
const VALUES: Record<string, string> = {
  V: '2.0.0', CREATOR, ...ADDRESSES,
  META: '123456', META_ADDRESS: APP_ADDRESS, REV_GUILDS_APP: '123456', GUILD_FACTORY: '123456', GUILD_FACTORY_ADDRESS: APP_ADDRESS,
}

const temp: string[] = []
afterAll(() => { for (const dir of temp) rmSync(dir, { recursive: true, force: true }) })

/** A stand-in checkout with stub npm, npx, git and node in front of the real ones. Nothing reaches a network. */
function sandbox() {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'rollout-runner-'))
  temp.push(dir)
  const bin = path.join(dir, 'bin')
  const sc = path.join(dir, 'repo/projects/akita-sc')
  const calls = path.join(dir, 'calls.log')
  mkdirSync(bin)
  mkdirSync(sc, { recursive: true })
  mkdirSync(path.join(dir, 'repo/projects/akita-sdk'), { recursive: true })
  const stub = (name: string, body: string) => {
    writeFileSync(path.join(bin, name), `#!/usr/bin/env bash\n${body}\n`)
    chmodSync(path.join(bin, name), 0o755)
  }
  const fail = 'if [ -n "${STUB_FAIL:-}" ]; then case "$*" in *"$STUB_FAIL"*) echo "stub failure"; exit 3 ;; esac; fi'
  stub('npm', [
    'printf \'npm %s\\n\' "$*" >>"$STUB_CALLS"',
    'case "$*" in',
    '  "run -s rollout:status -- --network "*) printf \'DAO creator: %s\\n  ✓ one\\n  → two\\n\' "$STUB_CREATOR" ;;',
    '  "run -s rollout:id -- "*" --address") echo "$STUB_APP_ADDRESS" ;;',
    '  "run -s rollout:id -- "*) echo 123456 ;;',
    '  "run -s release:manifest:check") if [ -n "${STUB_MANIFEST_DIFFERS:-}" ]; then echo "manifest differs"; exit 1; fi; echo "manifest ok" ;;',
    '  *) echo "stub ok" ;;',
    'esac',
    fail,
  ].join('\n'))
  stub('npx', ['printf \'npx %s\\n\' "$*" >>"$STUB_CALLS"', 'echo "stub ok"', fail].join('\n'))
  stub('git', [
    'case "$*" in',
    '  "rev-parse HEAD") echo "$STUB_HEAD" ;;',
    '  "rev-parse --show-toplevel") echo "$AKITA_SC_REPO" ;;',
    '  *" status --porcelain "*) if [ -n "${STUB_GIT_STATUS_FAILS:-}" ]; then exit 1; fi; printf \'%s\' "${STUB_GIT_STATUS:-}" ;;',
    '  *) echo "git stub: unexpected $*" >&2; exit 1 ;;',
    'esac',
  ].join('\n'))
  stub('node', 'echo v24.0.0')

  const base = {
    PATH: `${bin}:${process.env.PATH}`, HOME: dir, AKITA_SC_REPO: path.join(dir, 'repo'),
    STUB_CALLS: calls, STUB_CREATOR: CREATOR, STUB_APP_ADDRESS: APP_ADDRESS, STUB_HEAD: HEAD,
  }
  const ready: Record<Network, Record<string, string>> = {
    mainnet: { ROLLOUT_COMMIT: HEAD.slice(0, 8), DEPLOYER_MNEMONIC: KEY, NODELY_API_KEY: NODE_KEY, ...ADDRESSES },
    testnet: { REHEARSAL_COMMIT: HEAD.slice(0, 8), DEPLOYER_MNEMONIC: KEY, ...ADDRESSES },
  }
  return {
    sc,
    /** Start a network's file. `env` adds to, and with `undefined` takes from, what a complete start has. */
    run(network: Network, args: string[] = [], env: Record<string, string | undefined> = {}, typed = `${network}\n`) {
      const full: Record<string, string> = { ...base, ...ready[network] }
      for (const [name, value] of Object.entries(env)) { if (value === undefined) delete full[name]; else full[name] = value }
      const result = spawnSync('bash', [STARTER[network], ...args], { env: full, input: typed, encoding: 'utf8' })
      return { status: result.status, out: `${result.stdout}${result.stderr}` }
    },
    /** Every npm and npx call so far, without the runner's own reads of the tracker and the manifest. */
    sent(): string[] {
      if (!existsSync(calls)) return []
      return readFileSync(calls, 'utf8').split('\n').filter((line) => line && !/^npm run -s (rollout:status|release:manifest:check)\b/.test(line))
    },
    forget() { rmSync(calls, { force: true }) },
    file(name: string) { const at = path.join(sc, name); return existsSync(at) ? readFileSync(at, 'utf8') : '' },
    /** Everything the runs wrote under receipts, to search for a key. */
    written(): string {
      const read = (at: string): string => readdirSync(at, { withFileTypes: true })
        .map((entry) => (entry.isDirectory() ? read(path.join(at, entry.name)) : readFileSync(path.join(at, entry.name), 'utf8'))).join('\n')
      return read(path.join(sc, 'receipts')) + (existsSync(calls) ? readFileSync(calls, 'utf8') : '')
    },
  }
}

type Listed = { step: string; id?: string; text: string }

/** What `--list` prints: each step's commands, and the ids it reads, in this network's form. */
function listing(network: Network): Listed[] {
  const box = sandbox()
  const { status, out } = box.run(network, ['--list'])
  expect(status).toBe(0)
  const lines: Listed[] = []
  let step = ''
  for (const line of out.split('\n')) {
    const head = /^=== ([A-Z][0-9]+[a-z]?)\. /.exec(line)
    const command = /^ {2}\[to do\] (\S+#\S+) {2}(.+)$/.exec(line)
    const read = /^ {2}\[read\] (export [A-Z_]+=\$\(.+\))$/.exec(line)
    if (head) step = head[1]
    else if (command) lines.push({ step, id: command[1], text: command[2] })
    else if (read) lines.push({ step, text: read[1] })
    else expect(line).toBe('')
  }
  return lines
}

/** The runbook's code blocks by step: every line that is not a comment, without the note written after it. */
function runbookBlocks(): Map<string, string[]> {
  const text = readFileSync(runbookPath, 'utf8')
  const sequence = text.slice(text.indexOf('\n## Sequence'), text.indexOf('\n## Script changes made'))
  const blocks = new Map<string, string[]>()
  for (const section of sequence.split('\n#### ').slice(1)) {
    const step = section.slice(0, section.indexOf('\n')).split('.')[0]
    const lines = [...section.matchAll(/```bash\n([\s\S]*?)```/g)]
      .flatMap((block) => block[1].split('\n').map((line) => line.trim().replace(/\s+#.*$/, '')))
      .filter((line) => line && !line.startsWith('#'))
    if (lines.length) blocks.set(step, lines)
  }
  return blocks
}

const steps = (lines: Listed[]) => [...new Set(lines.map((line) => line.step))]
const of = (lines: Listed[], step: string) => lines.filter((line) => line.step === step).map((line) => line.text)

/** The npm or npx call a listed line makes once the shell has put the values in. */
function call(text: string): string {
  if (text === '(cd ../akita-sdk && npm run build)') return 'npm run build'
  const read = /^export [A-Z_]+=\$\((.+)\)$/.exec(text)
  const line = read ? read[1] : text
  let out = ''
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '\\' && line[i + 1] === '"') { out += '"'; i++ } else if (line[i] === '"') continue
    else if (line[i] === '$') {
      const name = /^[A-Z_]+/.exec(line.slice(i + 1))![0]
      if (!(name in VALUES)) throw new Error(`${text} uses $${name}, which no step sets`)
      out += VALUES[name]
      i += name.length
    } else out += line[i]
  }
  return out
}

describe('the rollout runner', () => {
  const mainnet = listing('mainnet')
  const testnet = listing('testnet')
  const runbook = runbookBlocks()

  test('on MainNet it runs the runbook, line for line', () => {
    expect(mainnet.length).toBeGreaterThan(120)
    for (const step of steps(mainnet)) expect({ step, lines: of(mainnet, step) }).toEqual({ step, lines: runbook.get(step) })
    // The steps with commands that it leaves to a person, and why.
    const left = [...runbook.keys()].filter((step) => !steps(mainnet).includes(step))
    expect(left).toEqual([
      'A0', // the shell: the runner sets the label, reads the creator and takes the keys and addresses from the shell
      'A1', // the release tree is verified by CI on the commit; the runner runs its manifest check before it starts
      'A2', // committing and bundling come before a run
      'A4', // the TestNet tracker line
      'A4a', // TestNet only
      'G4', // an edit by hand, after the readers of the registry are counted
      'H7', // SocialClaim is not in this release
      'I1', // the DAO launch is not part of this rollout
      'I2', // commit, push and tag
    ])
    // and in the runbook's order
    const order = [...runbook.keys()]
    order.splice(order.indexOf('E2a'), 1)
    order.splice(order.indexOf('E2'), 0, 'E2a') // E2a is written after E2 and runs before it, as its heading says
    expect(readFileSync(runbookPath, 'utf8')).toMatch(/\n#### E2a\. [^\n]*\(before E2\)/)
    expect(order.filter((step) => steps(mainnet).includes(step))).toEqual(steps(mainnet))
  })

  test('on TestNet it runs what the rehearsal ran', () => {
    const shown = ['']
    for (const step of steps(testnet)) {
      shown.push(`=== ${step}`)
      for (const line of testnet.filter((l) => l.step === step)) shown.push(line.id ? `  ${line.id}  ${line.text}` : `  [read] ${line.text}`)
      shown.push('')
    }
    const rehearsed = readFileSync(fixturePath, 'utf8').split('\n').map((line) => line.replace(/^(=== [A-Z][0-9]+[a-z]?)\. .*$/, '$1'))
    expect(shown.join('\n')).toBe(rehearsed.join('\n'))
  })

  test('TestNet differs from MainNet only where the runbook says it does', () => {
    // Runbook A4: -n testnet for -n mainnet; A4a first; no Haystack router plugin; nothing for G2b to withdraw;
    // and G3b names TestNet's USDC and AKTA. (--confirm-mainnet is sent on both and ignored on TestNet.)
    const expected = [
      ...runbook.get('A4a')!,
      ...mainnet
        .filter((line) => line.step !== 'G2b' && !line.text.includes('deploy:haystack-router-plugin'))
        .map((line) => line.text.replace(/-n mainnet/g, '-n testnet'))
        .map((text) => (text.includes('opt-in:revenue-receivers') ? text.replace('-n testnet', '-n testnet --asset 10458941,752884771') : text)),
    ]
    expect(testnet.map((line) => line.text)).toEqual(expected)
    expect(mainnet.some((line) => line.text.includes('testnet'))).toBe(false)
    expect(testnet.filter((line) => line.text.includes('mainnet')).map((line) => line.id)).toEqual(['H2#4']) // --confirm-mainnet
    expect(readFileSync(runbookPath, 'utf8')).toContain('The commands differ from the MainNet ones in five places only.')
  })

  test('a MainNet run sends every command once, in order, and a second start sends nothing', () => {
    const box = sandbox()
    const first = box.run('mainnet')
    expect(first.out).toContain('B1 to H6 are finished.')
    expect(first.status).toBe(0)
    expect(box.sent()).toEqual(mainnet.map((line) => call(line.text)))
    // neither key is shown or written
    for (const secret of [KEY, NODE_KEY]) {
      expect(first.out).not.toContain(secret)
      expect(box.written()).not.toContain(secret)
    }
    expect(box.file('receipts/mainnet-commits.txt')).toMatch(new RegExp(`^\\S+Z ${HEAD}\\n$`))
    expect(box.file('receipts/rehearsal-done.txt')).toBe('')

    box.forget()
    const second = box.run('mainnet')
    expect(second.status).toBe(0)
    expect(box.sent()).toEqual([])
    for (const step of steps(mainnet)) expect(second.out).toMatch(new RegExp(`=== ${step}\\. [^\\n]*: already done`))
  })

  test('a TestNet run stopped after G2 carries on with G2a to H6', () => {
    const box = sandbox()
    const first = box.run('testnet', ['--until', 'G2', '--yes'])
    expect(first.status).toBe(0)
    expect(first.out).toContain('Finished through G2.')
    const upToG2 = testnet.slice(0, testnet.findIndex((line) => line.step === 'G2a'))
    expect(box.sent()).toEqual(upToG2.map((line) => call(line.text)))

    box.forget()
    const second = box.run('testnet')
    expect(second.out).toContain('A4a to H6 are finished.')
    expect(second.status).toBe(0)
    expect(box.sent()).toEqual(testnet.slice(upToG2.length).map((line) => call(line.text)))
    expect(box.file('receipts/mainnet-done.txt')).toBe('')
    for (const secret of [KEY]) expect(second.out + box.written()).not.toContain(secret)
  })

  test('one step, and a wrong word at the start', () => {
    const box = sandbox()
    const refused = box.run('mainnet', [], {}, 'yes\n')
    expect(refused.out).toContain('Not started.')
    expect(refused.status).toBe(1)
    expect(box.sent()).toEqual([])
    const one = box.run('mainnet', ['--only', 'B3'])
    expect(one.status).toBe(0)
    expect(box.sent()).toEqual(of(mainnet, 'B3').map(call))
    expect(box.run('mainnet', ['--only', 'A4a']).out).toContain('No step named A4a on MainNet')
    expect(box.run('testnet', ['--only', 'G2b']).out).toContain('No step named G2b on TestNet')
  })

  test('a command that fails stops the run, and the next start picks up at it', () => {
    const box = sandbox()
    const failed = box.run('mainnet', [], { STUB_FAIL: '--manifest receipts/phase2a.json' }) // B1#2, a send
    expect(failed.status).toBe(3)
    expect(failed.out).toContain('STOPPED at B1#2')
    expect(failed.out).toContain('It may have sent part of its work.')
    expect(box.sent()).toEqual(of(mainnet, 'B1').slice(0, 2).map(call))
    expect(box.file('receipts/mainnet-done.txt')).toBe('')

    box.forget()
    const again = box.run('mainnet')
    expect(again.status).toBe(0)
    expect(box.sent()).toEqual(mainnet.map((line) => call(line.text))) // B1's dry run first, again
  })

  test('a deploy that keeps no receipt is not run twice without an answer', () => {
    const box = sandbox()
    const haystack = mainnet.find((line) => line.text.includes('deploy:haystack-router-plugin'))!
    expect(haystack.id).toBe('G2#6a')
    const failed = box.run('mainnet', [], { STUB_FAIL: 'deploy:haystack-router-plugin' })
    expect(failed.status).toBe(3)
    expect(failed.out).toContain('STOPPED at G2#6a')
    expect(failed.out).toContain('This deploy keeps no receipt')
    const before = mainnet.slice(0, mainnet.indexOf(haystack) + 1).map((line) => call(line.text))
    expect(box.sent()).toEqual(before)

    const held = box.run('mainnet')
    expect(held.status).toBe(1)
    expect(held.out).toContain('STOPPED before G2#6a')
    expect(held.out).toContain(`--mark-done 'G2#6a'`)
    expect(box.sent()).toEqual(before) // nothing more was sent

    expect(box.run('mainnet', ['--mark-done', 'G2#10']).out).toContain('G2#10 is not waiting on an answer')
    expect(box.run('mainnet', ['--mark-done', 'G2#9']).out).toContain(`No command named 'G2#9' on MainNet`) // a dry run is never recorded
    expect(box.run('mainnet', ['--mark-done', 'G9#1']).out).toContain(`No command named 'G9#1' on MainNet`)
    expect(box.run('mainnet', ['--mark-done', 'G2#6a']).out).toContain('G2#6a is marked done')
    const rest = box.run('mainnet')
    expect(rest.status).toBe(0)
    expect(box.sent()).toEqual(mainnet.map((line) => call(line.text))) // the Haystack deploy once, the rest after it

    // --retry runs it again
    const other = sandbox()
    other.run('mainnet', [], { STUB_FAIL: 'deploy:haystack-router-plugin' })
    expect(other.run('mainnet', ['--retry', 'G2#6a']).out).toContain('G2#6a will run again')
    other.forget()
    expect(other.run('mainnet').status).toBe(0)
    expect(other.sent()[0]).toBe(call(haystack.text))
  })

  test('a step waits for the address it needs', () => {
    const needs: [string, string][] = [['HEARTBEAT_MANAGER', 'G2a'], ['REV_NFD_SOURCE', 'G3a'], ['LABS_ADDRESS', 'H6']]
    for (const [name, step] of needs) {
      const box = sandbox()
      const stopped = box.run('mainnet', [], { [name]: undefined })
      expect(stopped.status).toBe(1)
      expect(stopped.out).toContain(`STOPPED before this step: ${name} is not set.`)
      expect(box.sent()).toEqual(mainnet.slice(0, mainnet.findIndex((line) => line.step === step)).map((line) => call(line.text)))
      // and the commands that use it come only in or after that step
      const first = mainnet.findIndex((line) => line.text.includes(`$${name}`))
      expect(mainnet[first].step).toBe(step)
      box.forget()
      expect(box.run('mainnet').status).toBe(0)
      expect(box.sent()).toEqual(mainnet.slice(mainnet.findIndex((line) => line.step === step)).map((line) => call(line.text)))
    }
  })

  test('MainNet refuses to start until its checks pass, and sends nothing', () => {
    const refusals: [string, string[], Record<string, string | undefined>, string][] = [
      ['no commit named', [], { ROLLOUT_COMMIT: undefined }, 'Name the commit to deploy from: ROLLOUT_COMMIT=<commit>'],
      ['the rehearsal\'s variable', [], { ROLLOUT_COMMIT: undefined, REHEARSAL_COMMIT: HEAD.slice(0, 8) }, 'Name the commit to deploy from: ROLLOUT_COMMIT=<commit>'],
      ['another commit', [], { ROLLOUT_COMMIT: 'fffffff' }, 'not the commit to deploy from (fffffff)'],
      ['--yes', ['--yes'], {}, 'A MainNet run always asks'],
      ['a changed script', [], { STUB_GIT_STATUS: ' M projects/akita-sc/scripts/script-base.ts\n M projects/akita-sdk/src/networks.ts\n' }, ' M projects/akita-sc/scripts/script-base.ts'],
      ['a checkout whose state cannot be read', [], { STUB_GIT_STATUS_FAILS: 'yes' }, 'Could not read which files of the checkout differ'],
      ['no node key', [], { NODELY_API_KEY: undefined }, 'NODELY_API_KEY is not set'],
      ['programs that differ from the manifest', [], { STUB_MANIFEST_DIFFERS: 'yes' }, 'The built programs differ from release/manifest.json'],
    ]
    for (const [, args, env, message] of refusals) {
      const box = sandbox()
      const refused = box.run('mainnet', args, env)
      expect(refused.out).toContain(message)
      expect(refused.out).toContain('Nothing was run.')
      expect(refused.status).not.toBe(0)
      expect(box.sent()).toEqual([])
      expect(refused.out).not.toContain('networks.ts') // the one file --register writes is never the reason
    }
    // the rehearsal's receipts still in place
    const box = sandbox()
    mkdirSync(path.join(box.sc, 'receipts'), { recursive: true })
    writeFileSync(path.join(box.sc, 'receipts/rehearsal-done.txt'), 'A4a#2\n')
    const refused = box.run('mainnet')
    expect(refused.out).toContain('mv projects/akita-sc/receipts projects/akita-sc/receipts-testnet')
    expect(refused.status).toBe(1)
    expect(box.sent()).toEqual([])
    // and TestNet still lists and runs from them
    expect(box.run('testnet', ['--only', 'B3', '--yes']).status).toBe(0)
  })

  test('what MainNet allows on request, and what TestNet never asks for', () => {
    const changed = { STUB_GIT_STATUS: ' M projects/akita-sc/scripts/script-base.ts\n' }
    const allowed = sandbox()
    expect(allowed.run('mainnet', ['--allow-local-changes', '--only', 'B3'], changed).status).toBe(0)
    const registered = sandbox()
    expect(registered.run('mainnet', ['--only', 'B3'], { STUB_GIT_STATUS: ' M projects/akita-sdk/src/networks.ts\n' }).status).toBe(0)
    const open = sandbox()
    expect(open.run('mainnet', ['--public-node', '--only', 'B3'], { NODELY_API_KEY: undefined }).status).toBe(0)
    // the rehearsal has none of MainNet's checks
    const rehearsal = sandbox()
    const run = rehearsal.run('testnet', ['--only', 'B3', '--yes'], { ...changed, STUB_MANIFEST_DIFFERS: 'yes' })
    expect(run.status).toBe(0)
    expect(rehearsal.sent().some((line) => line.includes('release:manifest:check'))).toBe(false)
    // and neither network starts from the shared file itself
    const direct = spawnSync('bash', [path.join(project, 'scripts/rollout-run.sh'), '--list'], { encoding: 'utf8', env: { PATH: process.env.PATH ?? '' } })
    expect(direct.status).toBe(2)
    expect(direct.stderr).toContain('Start scripts/rollout-mainnet.sh or scripts/rollout-testnet-rehearsal.sh')
  })
})
