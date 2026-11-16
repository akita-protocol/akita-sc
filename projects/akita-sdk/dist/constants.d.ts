import { SendParams } from "@algorandfoundation/algokit-utils/types/transaction";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
export declare const DEFAULT_READER: string;
export declare const emptySigner: import("algosdk").TransactionSigner;
export declare const DEFAULT_SEND_PARAMS: SendParams & {
    maxFee: AlgoAmount;
};
/**
 * What a payer other than the caller adds to a refundable storage payment, in µALGO. The contract
 * keeps a payer record beside the stored record (box `'$' + sha256(record box key)`, 32-byte payer
 * address) and returns the deposit and this amount to that payer when the record is released.
 * Calls that pay for themselves add nothing.
 */
export declare const PAYER_RECORD_MBR = 28500n;
export declare const MAX_UINT64: bigint;
