/**
 * Facts read from a program's TEAL disassembly (`goal clerk compile -D`, which runs offline). The
 * compatibility suite uses them instead of trusting any ARC-56 file: the router table IS the deployed ABI,
 * and the 4-byte constants that are not routes are the selectors the program calls (inner app calls).
 *
 * Pure functions plus one optional `goal` invocation; no network.
 */
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

export type ProgramFacts = {
  /** sha256 of the approval program the facts were derived from */
  fromSha256: string
  /** TEAL version (`#pragma version`) */
  version: number
  /** selectors (hex, 8 chars) the ARC-4 router matches on ApplicationArgs[0] */
  routes: string[]
  /** routes reachable only at creation (ApplicationID == 0) */
  createRoutes: string[]
  /** 4-byte constants that are neither routes nor the ARC-4 return prefix: candidate outbound selectors */
  calls: string[]
  /** every integer constant (intcblock, pushint, pushints), as decimal strings, sorted ascending */
  ints: string[]
  /** printable byte constants (global/box keys, error codes, notes), sorted */
  strings: string[]
}

export const ARC4_RETURN_PREFIX = '151f7c75'

export const sha256Hex = (bytes: Uint8Array): string => createHash('sha256').update(bytes).digest('hex')

const isPrintable = (bytes: Buffer): boolean => bytes.length >= 2 && [...bytes].every((b) => b >= 0x20 && b < 0x7f)

/** Splits the operands of a byte-constant instruction (`0x..` hex or `"..."` strings, comments dropped). */
function byteOperands(rest: string): Buffer[] {
  const out: Buffer[] = []
  const withoutComment = rest.replace(/\s\/\/.*$/, '')
  const re = /0x([0-9a-fA-F]*)|"((?:[^"\\]|\\.)*)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(withoutComment)) !== null) {
    if (m[1] !== undefined) out.push(Buffer.from(m[1], 'hex'))
    else out.push(Buffer.from(JSON.parse(`"${m[2]}"`), 'utf8'))
  }
  return out
}

/**
 * Derives the facts from a TEAL disassembly. Router detection follows the puya pattern
 * (`pushbytes(s) …; txna ApplicationArgs 0; match …`) and the older `txna ApplicationArgs 0; pushbytes X; ==`
 * / `pushbytes X; txna ApplicationArgs 0; ==` comparisons. Byte constants referenced through
 * `bytec_N` / `bytec N` resolve against the `bytecblock`.
 */
export function factsFromTeal(teal: string, approvalSha256: string): ProgramFacts {
  const lines = teal.split('\n').map((l) => l.trim()).filter((l) => l.length > 0 && !l.startsWith('//'))
  let version = 0
  const intcblock: bigint[] = []
  const bytecblock: Buffer[] = []
  const ints = new Set<bigint>()
  const allBytes: Buffer[] = []
  const routes = new Set<string>()
  const createRoutes = new Set<string>()

  // instructions as [op, operands]
  const instrs = lines
    .filter((l) => !l.endsWith(':'))
    .map((l) => {
      const space = l.indexOf(' ')
      return space < 0 ? { op: l, rest: '' } : { op: l.slice(0, space), rest: l.slice(space + 1) }
    })

  /** byte constants pushed by one instruction (resolving bytec refs) */
  const pushedBytes = (i: number): Buffer[] => {
    const { op, rest } = instrs[i] ?? { op: '', rest: '' }
    if (op === 'pushbytes' || op === 'pushbytess' || op === 'byte') return byteOperands(rest)
    const ref = /^bytec_(\d)$/.exec(op)
    if (ref) return bytecblock[Number(ref[1])] ? [bytecblock[Number(ref[1])]] : []
    if (op === 'bytec') return bytecblock[Number(rest.split(/\s/)[0])] ? [bytecblock[Number(rest.split(/\s/)[0])]] : []
    return []
  }

  // labels: index of the first instruction after each label line
  const labelAt = new Map<string, number>()
  {
    let idx = 0
    for (const l of lines) {
      if (l.endsWith(':')) labelAt.set(l.slice(0, -1), idx)
      else idx++
    }
  }

  for (let i = 0; i < instrs.length; i++) {
    const { op, rest } = instrs[i]
    if (op === '#pragma') version = Number(rest.replace('version', '').trim())
    else if (op === 'intcblock') for (const v of rest.split(/\s+/).filter(Boolean)) { intcblock.push(BigInt(v)); ints.add(BigInt(v)) }
    else if (op === 'pushint') ints.add(BigInt(rest.split(/\s/)[0]))
    else if (op === 'pushints') for (const v of rest.replace(/\s\/\/.*$/, '').split(/\s+/).filter(Boolean)) ints.add(BigInt(v))
    else if (op === 'bytecblock') for (const b of byteOperands(rest)) { bytecblock.push(b); allBytes.push(b) }
    else if (op === 'pushbytes' || op === 'pushbytess' || op === 'byte') allBytes.push(...byteOperands(rest))
  }

  const isArg0 = (i: number) => instrs[i]?.op === 'txna' && instrs[i].rest.replace(/\s\/\/.*$/, '').trim() === 'ApplicationArgs 0'

  /** routes matched from instruction index `i` (txna ApplicationArgs 0) */
  const routesAt = (i: number): Buffer[] => {
    if (instrs[i + 1]?.op === 'match') {
      // `match` takes as many constants as it has labels; puya may push them with several instructions
      // (e.g. `pushbytess a b c; bytec 6; txna ApplicationArgs 0; match l1 l2 l3 l4`)
      const labels = instrs[i + 1].rest.replace(/\s\/\/.*$/, '').split(/\s+/).filter(Boolean).length
      const out: Buffer[] = []
      for (let j = i - 1; j >= 0 && out.length < labels; j--) {
        const pushed = pushedBytes(j)
        if (pushed.length === 0) break
        out.unshift(...pushed)
      }
      return out
    }
    if (instrs[i + 1]?.op && pushedBytes(i + 1).length === 1 && instrs[i + 2]?.op === '==') return pushedBytes(i + 1)
    if (pushedBytes(i - 1).length === 1 && instrs[i + 1]?.op === '==') return pushedBytes(i - 1)
    return []
  }

  for (let i = 0; i < instrs.length; i++) {
    if (!isArg0(i)) continue
    for (const b of routesAt(i)) if (b.length === 4) routes.add(b.toString('hex'))
  }

  // creation routes: `txn ApplicationID; bz L` → the first router match after L
  for (let i = 0; i < instrs.length - 1; i++) {
    if (!(instrs[i].op === 'txn' && instrs[i].rest.startsWith('ApplicationID') && instrs[i + 1].op === 'bz')) continue
    const target = labelAt.get(instrs[i + 1].rest.split(/\s/)[0])
    if (target === undefined) continue
    for (let j = target; j < Math.min(target + 12, instrs.length); j++) {
      if (!isArg0(j)) continue
      for (const b of routesAt(j)) if (b.length === 4) createRoutes.add(b.toString('hex'))
      break
    }
  }

  const calls = new Set<string>()
  const strings = new Set<string>()
  for (const b of allBytes) {
    const hex = b.toString('hex')
    if (b.length === 4 && !routes.has(hex) && hex !== ARC4_RETURN_PREFIX) calls.add(hex)
    if (isPrintable(b)) strings.add(b.toString('utf8'))
  }

  return {
    fromSha256: approvalSha256,
    version,
    routes: [...routes].sort(),
    createRoutes: [...createRoutes].sort(),
    calls: [...calls].sort(),
    ints: [...ints].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).map(String),
    strings: [...strings].sort(),
  }
}

/** True when `goal` is on PATH (the disassembler runs offline). */
export function goalAvailable(): boolean {
  const r = spawnSync('goal', ['--version'], { encoding: 'utf8' })
  return r.status === 0
}

/** Disassembles `program` with `goal clerk compile -D` (offline). Throws when goal is missing. */
export function disassemble(program: Uint8Array): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'akita-compat-'))
  try {
    const file = path.join(dir, 'program.bin')
    writeFileSync(file, program)
    const r = spawnSync('goal', ['clerk', 'compile', '-D', file], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    if (r.status !== 0) throw new Error(`goal clerk compile -D failed: ${r.stderr || r.stdout}`)
    return r.stdout
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function programFacts(program: Uint8Array): ProgramFacts {
  return factsFromTeal(disassemble(program), sha256Hex(program))
}
