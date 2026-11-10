/**
 * ACC-09 / A-6 regression: the passkey logic signatures verify real WebAuthn-shaped assertions,
 * bind them to the relying party (rpIdHash) and require user presence + user verification.
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import algosdk from 'algosdk'
import { createHash, generateKeyPairSync, KeyObject, sign } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeAll, describe, expect, test } from 'vitest'

const fixture = algorandFixture()
const RP_ID = 'akita.community'
const FLAG_UP = 0x01
const FLAG_UV = 0x04

const sha256 = (data: Uint8Array) => new Uint8Array(createHash('sha256').update(data).digest())
const b64url = (data: Uint8Array) => Buffer.from(data).toString('base64url')
const fromB64url = (s: string) => new Uint8Array(Buffer.from(s, 'base64url'))
const concat = (...parts: Uint8Array[]) => new Uint8Array(Buffer.concat(parts.map((p) => Buffer.from(p))))

const here = path.dirname(fileURLToPath(import.meta.url))
const tealPath = (name: string) => path.join(here, '../../artifacts/arc58/keys', `${name}.teal`)

type KeyKind = 'ed25519' | 'p256'

describe('Passkey logic signatures (ACC-09)', () => {
  let algorand: algokit.AlgorandClient
  let funder: TransactionSignerAccount

  beforeAll(async () => {
    await fixture.newScope()
    algorand = fixture.context.algorand
    funder = await fixture.context.generateAccount({ initialFunds: (20).algo() })
  })

  const compile = async (kind: KeyKind, publicKey: KeyObject, rpIdHash: Uint8Array) => {
    const jwk = publicKey.export({ format: 'jwk' }) as { x: string; y?: string }
    const params: Record<string, Uint8Array> = { RPID_HASH: rpIdHash }
    if (kind === 'ed25519') {
      params.PK = fromB64url(jwk.x)
    } else {
      params.X = fromB64url(jwk.x)
      params.Y = fromB64url(jwk.y!)
    }
    const teal = readFileSync(tealPath(kind === 'ed25519' ? 'Ed25519Passkey' : 'Secp256r1Passkey'), 'utf8')
    const compiled = await algorand.app.compileTealTemplate(teal, params)
    return compiled.compiledBase64ToBytes
  }

  /**
   * Build [lsig payment, funder payment], sign the passkey assertion over the group id and send.
   * `tamper` lets a test alter the authenticator data / challenge before signing.
   */
  const sendWithPasskey = async (kind: KeyKind, opts: {
    rpIdHashInLsig?: Uint8Array
    rpIdHashInAssertion?: Uint8Array
    flags?: number
    challengeOverride?: Uint8Array
  } = {}) => {
    const { privateKey, publicKey } = kind === 'ed25519'
      ? generateKeyPairSync('ed25519')
      : generateKeyPairSync('ec', { namedCurve: 'prime256v1' })
    const rpIdHash = sha256(new TextEncoder().encode(RP_ID))
    const program = await compile(kind, publicKey, opts.rpIdHashInLsig ?? rpIdHash)
    const lsigAddress = new algosdk.LogicSigAccount(program).address()

    await algorand.send.payment({ sender: funder.addr, signer: funder.signer, receiver: lsigAddress, amount: (1).algo() })

    const sp = await algorand.client.algod.getTransactionParams().do()
    const lsigTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: lsigAddress, receiver: lsigAddress, amount: 0, suggestedParams: { ...sp, fee: 0n, flatFee: true },
    })
    const funderTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: funder.addr, receiver: funder.addr, amount: 0, suggestedParams: { ...sp, fee: 2_000n, flatFee: true },
    })
    algosdk.assignGroupID([lsigTxn, funderTxn])
    const groupId = lsigTxn.group!

    const authData = concat(
      opts.rpIdHashInAssertion ?? rpIdHash,
      new Uint8Array([opts.flags ?? (FLAG_UP | FLAG_UV)]),
      new Uint8Array([0, 0, 0, 1]),
    )
    const challenge = b64url(opts.challengeOverride ?? groupId)
    const cdOne = new TextEncoder().encode('{"type":"webauthn.get","challenge":"')
    const cdTwo = new TextEncoder().encode(challenge)
    const cdThree = new TextEncoder().encode(`","origin":"https://${RP_ID}","crossOrigin":false}`)
    const clientDataHash = sha256(concat(cdOne, cdTwo, cdThree))
    const signedMessage = concat(authData, clientDataHash)

    let args: Uint8Array[]
    if (kind === 'ed25519') {
      // WebAuthn EdDSA signs authenticatorData || clientDataHash directly
      args = [authData, cdOne, cdTwo, cdThree, new Uint8Array(sign(null, signedMessage, privateKey))]
    } else {
      // WebAuthn ES256 signs sha256(authenticatorData || clientDataHash); raw r || s
      const sig = new Uint8Array(sign('sha256', signedMessage, { key: privateKey, dsaEncoding: 'ieee-p1363' }))
      args = [authData, cdOne, cdTwo, cdThree, sig.slice(0, 32), sig.slice(32)]
    }

    const lsig = new algosdk.LogicSigAccount(program, args)
    const signedLsig = algosdk.signLogicSigTransactionObject(lsigTxn, lsig).blob
    const [signedFunder] = await funder.signer([funderTxn], [0])
    const { txid } = await algorand.client.algod.sendRawTransaction([signedLsig, signedFunder]).do()
    await algosdk.waitForConfirmation(algorand.client.algod, txid, 5)
  }

  for (const kind of ['ed25519', 'p256'] as KeyKind[]) {
    describe(kind, () => {
      test('accepts a user-verified assertion over the group id', async () => {
        await sendWithPasskey(kind)
      })

      test('rejects an assertion for a different relying party', async () => {
        const otherRp = sha256(new TextEncoder().encode('evil.example'))
        await expect(sendWithPasskey(kind, { rpIdHashInAssertion: otherRp })).rejects.toThrow(/rejected by logic|logic eval error/i)
      })

      test('rejects user presence without user verification (A-6)', async () => {
        await expect(sendWithPasskey(kind, { flags: FLAG_UP })).rejects.toThrow(/rejected by logic|logic eval error/i)
      })

      test('rejects an assertion whose challenge is not this group', async () => {
        await expect(sendWithPasskey(kind, { challengeOverride: new Uint8Array(32).fill(7) }))
          .rejects.toThrow(/rejected by logic|logic eval error/i)
      })
    })
  }
})
