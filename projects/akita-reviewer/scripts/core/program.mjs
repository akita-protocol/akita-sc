// Program hashing and algod access. No dependencies: Node 22+ fetch and crypto.
import { createHash } from 'node:crypto'

export function sha256Hex(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

/**
 * The identity of one exact program, as the design proposal defines it:
 * programHash = sha256(sha256(approval) || sha256(clear)).
 */
export function programHashes(approval, clear) {
  const approvalDigest = createHash('sha256').update(approval).digest()
  const clearDigest = createHash('sha256').update(clear).digest()
  return {
    approvalHash: approvalDigest.toString('hex'),
    clearHash: clearDigest.toString('hex'),
    programHash: sha256Hex(Buffer.concat([approvalDigest, clearDigest])),
  }
}

function algodHeaders(token) {
  return token ? { 'X-Algo-API-Token': token } : {}
}

/** Fetches an application and decodes its programs. */
export async function fetchApplication({ algod, token, appId }) {
  const base = algod.replace(/\/+$/, '')
  const [appResponse, statusResponse] = await Promise.all([
    fetch(`${base}/v2/applications/${appId}`, { headers: algodHeaders(token) }),
    fetch(`${base}/v2/status`, { headers: algodHeaders(token) }),
  ])
  if (appResponse.status === 404) return { appId, deleted: true }
  if (!appResponse.ok) throw new Error(`algod ${appResponse.status} for app ${appId}`)
  if (!statusResponse.ok) throw new Error(`algod ${statusResponse.status} for status`)
  const app = await appResponse.json()
  const status = await statusResponse.json()
  const params = app.params
  const approval = Buffer.from(params['approval-program'], 'base64')
  const clear = Buffer.from(params['clear-state-program'], 'base64')
  return {
    appId,
    deleted: false,
    round: status['last-round'],
    creator: params.creator,
    extraPages: params['extra-program-pages'] ?? 0,
    version: params.version ?? null,
    approval,
    clear,
    ...programHashes(approval, clear),
  }
}

/**
 * Disassembles a program through algod's /v2/teal/disassemble. Public nodes
 * usually disable this developer endpoint; AlgoKit LocalNet enables it.
 */
export async function disassemble({ algod, token, program }) {
  const base = algod.replace(/\/+$/, '')
  const response = await fetch(`${base}/v2/teal/disassemble`, {
    method: 'POST',
    headers: { ...algodHeaders(token), 'Content-Type': 'application/x-binary' },
    body: program,
  })
  if (!response.ok) throw new Error(`disassemble failed: algod ${response.status}`)
  return (await response.json()).result
}
