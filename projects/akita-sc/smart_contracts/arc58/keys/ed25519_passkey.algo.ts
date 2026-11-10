import { assert, bytes, LogicSig, op, TemplateVar } from "@algorandfoundation/algorand-typescript"
import { base64Decode, ed25519verifyBare, Global, sha256, Txn } from "@algorandfoundation/algorand-typescript/op"
import { PASSKEY_FLAGS_OFFSET, PASSKEY_REQUIRED_FLAGS, PASSKEY_RPID_HASH_LENGTH } from "./constants"

const PK = TemplateVar<bytes<32>>('PK')
/** sha256 of the relying-party ID this credential is bound to (WebAuthn `rpIdHash`). */
const RPID_HASH = TemplateVar<bytes<32>>('RPID_HASH')

export class Ed25519Passkey extends LogicSig {

    program() {
        const authData = op.arg(0)
        const cdOne = op.arg(1)
        const cdTwo = op.arg(2)
        const cdThree = op.arg(3)
        const sig = op.arg(4).toFixed({ length: 64 })

        // ACC-09: the assertion must come from this relying party, with user presence AND
        // user verification (A-6).
        assert(authData.slice(0, PASSKEY_RPID_HASH_LENGTH) === RPID_HASH)
        assert((op.getByte(authData, PASSKEY_FLAGS_OFFSET) & PASSKEY_REQUIRED_FLAGS) === PASSKEY_REQUIRED_FLAGS)

        // ACC-09: WebAuthn EdDSA signs `authenticatorData || sha256(clientDataJSON)` directly
        // (no pre-hash, no "ProgData" prefix), so verify with ed25519verify_bare.
        const message = authData.concat(sha256(cdOne.concat(cdTwo).concat(cdThree)))

        if (Global.groupSize > 1) {
            assert(Global.groupId === base64Decode(op.Base64.URLEncoding, cdTwo))
        } else {
            assert(Txn.txId === base64Decode(op.Base64.URLEncoding, cdTwo))
        }

        return ed25519verifyBare(message, sig, PK)
    }
}
