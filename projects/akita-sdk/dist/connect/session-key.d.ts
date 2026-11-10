import algosdk from 'algosdk';
/**
 * The live session key caller: a version 1, threshold 2 multisig of the
 * page's key followed by the server's key. Both sides recompute it from the
 * two addresses, so the order is part of the protocol.
 */
export declare function getSessionKeyMultisig(browserKey: string, serverKey: string): {
    params: algosdk.MultisigMetadata;
    address: string;
};
