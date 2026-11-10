import { assert, bytes, LogicSig, op, TemplateVar } from '@algorandfoundation/algorand-typescript'
import { base64Decode, ecdsaVerify, Global, sha256, Txn } from '@algorandfoundation/algorand-typescript/op'
import { PASSKEY_FLAGS_OFFSET, PASSKEY_REQUIRED_FLAGS, PASSKEY_RPID_HASH_LENGTH } from './constants'

const X = TemplateVar<bytes<32>>('X')
const Y = TemplateVar<bytes<32>>('Y')
/** sha256 of the relying-party ID this credential is bound to (WebAuthn `rpIdHash`). */
const RPID_HASH = TemplateVar<bytes<32>>('RPID_HASH')

export class Secp256r1Passkey extends LogicSig {

    program() {
        const authData = op.arg(0)
        const cdOne = op.arg(1)
        const cdTwo = op.arg(2)
        const cdThree = op.arg(3)
        // ES256 signature components, passed as arg 4 = r and arg 5 = s
        const sigR = op.arg(4).toFixed({ length: 32 })
        const sigS = op.arg(5).toFixed({ length: 32 })

        // ACC-09: the assertion must come from this relying party, with user presence AND
        // user verification (A-6).
        assert(authData.slice(0, PASSKEY_RPID_HASH_LENGTH) === RPID_HASH)
        assert((op.getByte(authData, PASSKEY_FLAGS_OFFSET) & PASSKEY_REQUIRED_FLAGS) === PASSKEY_REQUIRED_FLAGS)

        // ES256 signs sha256(authenticatorData || sha256(clientDataJSON)).
        const h = sha256(authData.concat(sha256(cdOne.concat(cdTwo).concat(cdThree))))

        if (Global.groupSize > 1) {
            assert(Global.groupId === base64Decode(op.Base64.URLEncoding, cdTwo))
        } else {
            assert(Txn.txId === base64Decode(op.Base64.URLEncoding, cdTwo))
        }

        return ecdsaVerify(op.Ecdsa.Secp256r1, h, sigR, sigS, X, Y)
    }
}
