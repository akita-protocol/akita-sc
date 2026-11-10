import algosdk from 'algosdk'

export type P256Coordinates = { publicKeyX: string; publicKeyY: string }

export type PasskeyAssertion = {
  authenticatorData: Uint8Array
  clientDataJSON: Uint8Array
  signature: Uint8Array
  credentialId: string
}

export interface TealCompiler {
  compile(source: string | Uint8Array): { do(): Promise<{ result: string }> }
}

const PASSKEY_TEAL_TEMPLATE = `#pragma version 11
b route_logic
route_logic:
arg 5
dup
len
pushint 32
==
assert
arg 4
dup
len
pushint 32
==
assert
arg_3
arg_2
arg_1
arg_0
callsub logic
pushint 1
return
logic:
proto 6 0
byte 0x
dup
frame_dig -2
frame_dig -3
concat
frame_dig -4
concat
sha256
frame_bury 0
frame_dig -1
frame_dig 0
concat
sha256
frame_bury 1
global GroupSize
pushint 1
>
bz if0_else
global GroupID
frame_dig -3
base64_decode URLEncoding
==
assert
b if0_end
if0_else:
txn TxID
frame_dig -3
base64_decode URLEncoding
==
assert
if0_end:
frame_dig 1
frame_dig -5
frame_dig -6
pushbytes TMPL_X
pushbytes TMPL_Y
ecdsa_verify Secp256r1
assert
retsub`

function normalizeCoordinate(value: string, name: string): string {
  const coordinate = value.startsWith('0x') ? value.slice(2) : value
  if (!/^[0-9a-fA-F]{64}$/.test(coordinate)) throw new Error(`Invalid P-256 ${name} coordinate`)
  return coordinate.toLowerCase()
}

function decodeBase64(value: string): Uint8Array {
  const binary = atob(value)
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

function toBase64Url(value: Uint8Array): string {
  let binary = ''
  for (const byte of value) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function getP256PasskeyTeal({ publicKeyX, publicKeyY }: P256Coordinates): string {
  const x = normalizeCoordinate(publicKeyX, 'X')
  const y = normalizeCoordinate(publicKeyY, 'Y')
  return PASSKEY_TEAL_TEMPLATE.replace('TMPL_X', `0x${x}`).replace('TMPL_Y', `0x${y}`)
}

export function extractP256PublicKeyCoordinates(publicKey: Uint8Array): P256Coordinates {
  let point: Uint8Array | undefined
  if (publicKey.length === 65 && publicKey[0] === 0x04) {
    point = publicKey
  } else {
    for (let index = 0; index <= publicKey.length - 65; index++) {
      if (publicKey[index] === 0x04) {
        const candidate = publicKey.slice(index, index + 65)
        if (candidate.length === 65) point = candidate
      }
    }
  }
  if (!point) throw new Error('Unable to find an uncompressed P-256 public key')
  const hex = (value: Uint8Array) => Array.from(value, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return { publicKeyX: hex(point.slice(1, 33)), publicKeyY: hex(point.slice(33, 65)) }
}

export async function compileP256PasskeyLogicSig(
  compiler: TealCompiler,
  coordinates: P256Coordinates,
): Promise<algosdk.LogicSig> {
  const result = await compiler.compile(getP256PasskeyTeal(coordinates)).do()
  return new algosdk.LogicSig(decodeBase64(result.result))
}

export function getP256PasskeyCaller(logicSig: algosdk.LogicSig): string {
  return logicSig.address().toString()
}

function parseDerLength(value: Uint8Array, offset: number): { length: number; next: number } {
  const first = value[offset]
  if (first === undefined) throw new Error('Invalid DER signature length')
  if ((first & 0x80) === 0) return { length: first, next: offset + 1 }
  const bytes = first & 0x7f
  if (bytes === 0 || bytes > 2 || offset + bytes >= value.length) {
    throw new Error('Unsupported DER signature length')
  }
  let length = 0
  for (let index = 0; index < bytes; index++) length = (length << 8) | value[offset + 1 + index]
  return { length, next: offset + 1 + bytes }
}

export function parseP256DerSignature(signature: Uint8Array): { r: Uint8Array; s: Uint8Array } {
  if (signature[0] !== 0x30) throw new Error('Invalid DER signature sequence')
  const sequence = parseDerLength(signature, 1)
  if (sequence.next + sequence.length !== signature.length) throw new Error('Invalid DER signature size')

  let offset = sequence.next
  const readInteger = (name: string): Uint8Array => {
    if (signature[offset++] !== 0x02) throw new Error(`Invalid DER signature ${name}`)
    const encodedLength = parseDerLength(signature, offset)
    offset = encodedLength.next
    const end = offset + encodedLength.length
    if (end > signature.length || encodedLength.length === 0) throw new Error(`Invalid DER signature ${name} length`)
    let integer = signature.slice(offset, end)
    offset = end
    if (integer[0] === 0) integer = integer.slice(1)
    if (integer.length > 32) throw new Error(`Invalid DER signature ${name} size`)
    const padded = new Uint8Array(32)
    padded.set(integer, 32 - integer.length)
    return padded
  }

  const r = readInteger('R')
  const s = readInteger('S')
  if (offset !== signature.length) throw new Error('Invalid trailing DER signature data')
  return { r, s }
}

export function createP256PasskeyLogicSigArgs(
  assertion: PasskeyAssertion,
  challengeBase64Url: string,
): Uint8Array[] {
  const clientData = new TextDecoder().decode(assertion.clientDataJSON)
  const challengeIndex = clientData.indexOf(challengeBase64Url)
  if (challengeIndex < 0 || clientData.indexOf(challengeBase64Url, challengeIndex + 1) >= 0) {
    throw new Error('Passkey challenge is missing or ambiguous in clientDataJSON')
  }
  const { r, s } = parseP256DerSignature(assertion.signature)
  const encode = (value: string) => new TextEncoder().encode(value)
  return [
    assertion.authenticatorData,
    encode(clientData.slice(0, challengeIndex)),
    encode(challengeBase64Url),
    encode(clientData.slice(challengeIndex + challengeBase64Url.length)),
    r,
    s,
  ]
}

export function getPasskeyTransactionChallenge(transaction: algosdk.Transaction, grouped: boolean): string {
  if (grouped) {
    if (!transaction.group) throw new Error('Grouped transaction is missing its group ID')
    return toBase64Url(transaction.group)
  }
  return toBase64Url(transaction.rawTxID())
}

export function signTransactionsWithP256Passkey(params: {
  transactions: algosdk.Transaction[]
  indexesToSign: number[]
  logicSig: algosdk.LogicSig
  assertion: PasskeyAssertion
}): Uint8Array[] {
  if (params.indexesToSign.length === 0) return []
  const grouped = params.transactions.length > 1
  const challenge = getPasskeyTransactionChallenge(params.transactions[params.indexesToSign[0]], grouped)
  const signedLogicSig = new algosdk.LogicSig(
    params.logicSig.logic,
    createP256PasskeyLogicSigArgs(params.assertion, challenge),
  )
  return params.indexesToSign.map((index) =>
    algosdk.signLogicSigTransactionObject(params.transactions[index], signedLogicSig).blob,
  )
}
