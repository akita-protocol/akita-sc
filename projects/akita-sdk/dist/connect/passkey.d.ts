import algosdk from 'algosdk';
export type P256Coordinates = {
    publicKeyX: string;
    publicKeyY: string;
};
export type PasskeyAssertion = {
    authenticatorData: Uint8Array;
    clientDataJSON: Uint8Array;
    signature: Uint8Array;
    credentialId: string;
};
export interface TealCompiler {
    compile(source: string | Uint8Array): {
        do(): Promise<{
            result: string;
        }>;
    };
}
export declare function getP256PasskeyTeal({ publicKeyX, publicKeyY }: P256Coordinates): string;
export declare function extractP256PublicKeyCoordinates(publicKey: Uint8Array): P256Coordinates;
export declare function compileP256PasskeyLogicSig(compiler: TealCompiler, coordinates: P256Coordinates): Promise<algosdk.LogicSig>;
export declare function getP256PasskeyCaller(logicSig: algosdk.LogicSig): string;
export declare function parseP256DerSignature(signature: Uint8Array): {
    r: Uint8Array;
    s: Uint8Array;
};
export declare function createP256PasskeyLogicSigArgs(assertion: PasskeyAssertion, challengeBase64Url: string): Uint8Array[];
export declare function getPasskeyTransactionChallenge(transaction: algosdk.Transaction, grouped: boolean): string;
export declare function signTransactionsWithP256Passkey(params: {
    transactions: algosdk.Transaction[];
    indexesToSign: number[];
    logicSig: algosdk.LogicSig;
    assertion: PasskeyAssertion;
}): Uint8Array[];
