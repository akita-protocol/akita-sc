/** Roundness matches Akita's renderer: 0 is circular, 1 is square. */
export interface ReceiveQrStyleV1 {
    version: 1;
    background: string;
    foreground: "auto" | string;
    moduleRoundness: number;
    finderRoundness: number;
    showAvatar: boolean;
}
export type AccountImageReferenceV1 = {
    version: 1;
    source: {
        type: "uri";
        uri: string;
        sha256?: string;
    } | {
        type: "asset";
        assetId: string;
    } | {
        type: "account";
        address: string;
    };
};
export declare function isReceiveQrStyleV1(value: unknown): value is ReceiveQrStyleV1;
export declare function isAccountImageReferenceV1(value: unknown): value is AccountImageReferenceV1;
export declare const parseReceiveQrStyle: (data: Uint8Array) => ReceiveQrStyleV1 | undefined;
export declare const parseAccountImageReference: (data: Uint8Array) => AccountImageReferenceV1 | undefined;
export declare function encodeReceiveQrStyle(value: ReceiveQrStyleV1): Uint8Array;
export declare function encodeAccountImageReference(value: AccountImageReferenceV1): Uint8Array;
